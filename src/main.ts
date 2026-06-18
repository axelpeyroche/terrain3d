/* ════════════════════════════════════════════
   MAIN — Application entry point
   Orchestrates: Leaflet map, Workers, Three.js scene, STL export
   ════════════════════════════════════════════ */

import './style.css';
import { injectUI, setProgress, showProgress, showModal } from './ui/panel';
import { initMap } from './map/leafletMap';
import { ensureThree } from './scene/setup';
import { applyGeometry } from './scene/build';
import { fetchOvertureFeatures } from './features/overture';
import { exportSTL } from './export/stl';
import { export3MF } from './export/3mf';
import { state, getSettings } from './state';
import type {
  TerrainWorkerInput, GeometryWorkerInput,
  TerrainResult, GeometryResult,
} from './types';

const MIN_SURF = 0.05;

/* ═══════════════════════════════════════════
   WORKERS
   ═══════════════════════════════════════════ */
function makeTerrainWorker() {
  return new Worker(
    new URL('./workers/terrain.worker.ts', import.meta.url),
    { type: 'module' },
  );
}
function makeGeometryWorker() {
  return new Worker(
    new URL('./workers/geometry.worker.ts', import.meta.url),
    { type: 'module' },
  );
}

/* ═══════════════════════════════════════════
   GENERATION PIPELINE
   ═══════════════════════════════════════════ */
async function generate() {
  if (!state.bounds) { showModal('ZONE MANQUANTE', 'Dessinez d\'abord une zone sur la carte.'); return; }
  if (state.generating) return;
  state.generating = true;

  const btn = document.getElementById('btn-gen') as HTMLButtonElement;
  const stlBtn = document.getElementById('btn-stl') as HTMLButtonElement;
  const expBtn = document.getElementById('btn-export') as HTMLButtonElement;
  btn.disabled = true;
  stlBtn.disabled = true;
  expBtn.disabled = true;
  document.getElementById('empty3d')!.classList.add('h');
  showProgress(true);

  try {
    const canvas = document.getElementById('c3d') as HTMLCanvasElement;
    await ensureThree(canvas);

    const st = getSettings();
    const { bounds, wMm, dMm } = state;

    // Dimensions du modèle
    const { minLat, maxLat, minLon, maxLon } = bounds!;
    const cLat = (minLat + maxLat) / 2, cLon = (minLon + maxLon) / 2;
    const realW = (maxLon - minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
    state.mmPerMeter = wMm / realW;
    state.BASE_H = st.baseH;

    // ── ÉTAPE 1 : Terrain elevation (Web Worker) ──────────────
    setProgress(5, 'ÉLÉVATION', 'Téléchargement des tuiles d\'altitude…');
    const GRID = st.terrainRes;

    const terrainResult = await new Promise<TerrainResult>((resolve, reject) => {
      const w = makeTerrainWorker();
      w.onmessage = (e: MessageEvent) => {
        const { type } = e.data;
        if (type === 'PROGRESS') {
          setProgress(5 + e.data.pct * 0.2, 'ÉLÉVATION', 'Téléchargement des tuiles d\'altitude…');
        } else if (type === 'TERRAIN_READY') {
          w.terminate();
          resolve(e.data as TerrainResult);
        } else if (type === 'ERROR') {
          w.terminate(); reject(new Error(e.data.message));
        }
      };
      w.onerror = err => { w.terminate(); reject(err); };
      const msg: TerrainWorkerInput = { type: 'BUILD_TERRAIN', bounds: bounds!, GRID, elevZoom: st.elevZoom };
      w.postMessage(msg);
    });

    // Stocker dans le state
    state.elevGrid   = terrainResult.elevGrid;
    state.GRID       = terrainResult.GRID;
    state.minE       = terrainResult.minE;
    state.elevRange  = terrainResult.elevRange;

    // Calcul de l'échelle d'élévation (mm)
    const latDiff = maxLat - minLat, lonDiff = maxLon - minLon;
    const realH = latDiff * 111320;
    const avgLen = Math.max(realW, realH);
    const maxModelDim = Math.max(wMm, dMm);
    const rawScaleMm = (terrainResult.elevRange / avgLen) * maxModelDim * st.exag;
    state.elevScaleMm = Math.max(1, Math.min(maxModelDim * 0.5, rawScaleMm));

    // Lissage de la grille d'élévation
    if (st.smooth > 0) gaussianSmooth(state.elevGrid, GRID, st.smooth);

    // ── ÉTAPE 2 : Overture features (main thread, PMTiles) ──────
    setProgress(30, 'DONNÉES', 'Chargement des données cartographiques…');
    const features = await fetchOvertureFeatures(bounds!, pct => {
      setProgress(30 + pct * 0.3, 'DONNÉES', 'Chargement des données cartographiques…');
    });

    // ── ÉTAPE 3 : Geometry (Web Worker) ─────────────────────────
    setProgress(60, 'GÉOMÉTRIE', 'Génération des géométries 3D…');
    const geoResult = await new Promise<GeometryResult>((resolve, reject) => {
      const w = makeGeometryWorker();
      w.onmessage = (e: MessageEvent) => {
        const { type } = e.data;
        if (type === 'GEO_PROGRESS') {
          setProgress(60 + e.data.pct * 0.35, 'GÉOMÉTRIE', `${e.data.step}…`);
        } else if (type === 'GEOMETRY_READY') {
          w.terminate();
          resolve(e.data as GeometryResult);
        } else if (type === 'ERROR') {
          w.terminate(); reject(new Error(e.data.message));
        }
      };
      w.onerror = err => { w.terminate(); reject(err); };

      const msg: GeometryWorkerInput = {
        type: 'BUILD_GEOMETRY',
        elevGrid: state.elevGrid!,
        GRID: state.GRID,
        wMm, dMm,
        BASE_H: state.BASE_H,
        MIN_SURF,
        elevScaleMm: state.elevScaleMm,
        minE: state.minE,
        elevRange: state.elevRange,
        features,
        gpxPoints: state.gpxPoints,
        bounds: bounds!,
        settings: st,
        zoneType: state.zoneType,
        zonePts: state.zonePts,
        mmPerMeter: state.mmPerMeter,
      };
      // On copie plutôt que transférer pour garder state.elevGrid valide (side walls)
      w.postMessage(msg);
    });

    // ── ÉTAPE 4 : Appliquer la géométrie sur le thread principal ──
    setProgress(95, 'SCÈNE', 'Construction de la scène 3D…');
    applyGeometry(geoResult);

    setProgress(100, 'TERMINÉ', 'Modèle 3D prêt.');
    state.generated = true;
    state.generating = false;

    setTimeout(() => {
      showProgress(false);
      document.getElementById('hint3d')!.style.display = 'block';
      document.getElementById('elev')!.style.display = 'block';
      stlBtn.disabled = false;
      expBtn.disabled = false;
    }, 600);

    updateElevInfo(terrainResult.minE, terrainResult.maxE, state.elevScaleMm, wMm, dMm);

  } catch (err) {
    state.generating = false;
    showProgress(false);
    showModal('ERREUR', String(err));
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}

/* ─── Gaussian smoothing ─── */
function gaussianSmooth(grid: Float32Array, GRID: number, passes: number) {
  const tmp = new Float32Array(grid.length);
  for (let p = 0; p < passes; p++) {
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        let s = 0, n = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const r2 = r + dr, c2 = c + dc;
            if (r2 >= 0 && r2 < GRID && c2 >= 0 && c2 < GRID) {
              s += grid[r2 * GRID + c2]; n++;
            }
          }
        }
        tmp[r * GRID + c] = s / n;
      }
    }
    grid.set(tmp);
  }
}

/* ─── Elevation info display ─── */
function updateElevInfo(minE: number, maxE: number, scaleMm: number, wMm: number, dMm: number) {
  const el = document.getElementById('elev');
  if (!el) return;
  el.innerHTML = `
    <span class="ev">${Math.round(minE)}</span>–<span class="ev">${Math.round(maxE)}</span> m alt.<br>
    Relief: <span class="ev">${scaleMm.toFixed(1)}</span> mm<br>
    Zone: <span class="ev">${wMm}×${dMm}</span> mm
  `;
}

/* ─── Debounced rebuild ─── */
let _dbt: ReturnType<typeof setTimeout>;
function debouncedRebuild() {
  clearTimeout(_dbt);
  _dbt = setTimeout(() => {
    if (state.generated && state.tg) generate();
  }, 700);
}

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */
injectUI();
initMap();

document.getElementById('btn-gen')!.addEventListener('click', generate);

document.getElementById('btn-stl')!.addEventListener('click', () => {
  exportSTL('terrain3d.stl');
});

document.getElementById('btn-export')!.addEventListener('click', () => {
  export3MF();
});

// Rebuild auto sur changement de paramètre
document.querySelectorAll('#sp input, #sp select').forEach(el => {
  el.addEventListener('change', debouncedRebuild);
  el.addEventListener('input', () => {
    // Mise à jour des labels live (sliders)
    if ((el as HTMLInputElement).type === 'range') {
      const id = el.id;
      const valEl = document.getElementById(`${id}-v`);
      if (valEl) valEl.textContent = (el as HTMLInputElement).value;
    }
  });
});
