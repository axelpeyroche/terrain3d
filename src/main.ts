/* ════════════════════════════════════════════
   MAIN — Application entry point
   ════════════════════════════════════════════ */

import './style.css';
import 'leaflet/dist/leaflet.css';
import { injectUI, setProgress, showProgress, showModal, switchTab } from './ui/panel';
import { initMap } from './map/leafletMap';
import { ensureThree } from './scene/setup';
import { applyGeometry } from './scene/build';
import { fetchOvertureFeatures } from './features/overture';
import { exportSTL } from './export/stl';
import { export3MF } from './export/3mf';
import { state, getSettings } from './state';
import { initDimsRenderer, buildDimsPreview, rebuildScene, type DimSettings } from './scene/dimsPreview';
import type {
  TerrainWorkerInput, GeometryWorkerInput,
  TerrainResult, GeometryResult,
} from './types';

const MIN_SURF = 0.05;

/* ═══════════════════════════════════════════
   WORKERS
   ═══════════════════════════════════════════ */
function makeTerrainWorker() {
  return new Worker(new URL('./workers/terrain.worker.ts', import.meta.url), { type: 'module' });
}
function makeGeometryWorker() {
  return new Worker(new URL('./workers/geometry.worker.ts', import.meta.url), { type: 'module' });
}

/* ═══════════════════════════════════════════
   GENERATION PIPELINE
   ═══════════════════════════════════════════ */
async function generate() {
  if (!state.bounds) { showModal('ZONE MANQUANTE', 'Dessinez d\'abord une zone sur l\'onglet "Sélection de la zone".'); return; }
  if (state.generating) return;
  state.generating = true;

  const btn    = document.getElementById('btn-gen')    as HTMLButtonElement;
  const stlBtn = document.getElementById('btn-stl')    as HTMLButtonElement;
  const expBtn = document.getElementById('btn-export') as HTMLButtonElement;
  btn.disabled = true; stlBtn.disabled = true; expBtn.disabled = true;
  document.getElementById('empty3d')!.classList.add('h');
  showProgress(true);

  try {
    const canvas = document.getElementById('c3d') as HTMLCanvasElement;
    await ensureThree(canvas);

    const st = getSettings();
    const { bounds, wMm, dMm } = state;
    const { minLat, maxLat, minLon, maxLon } = bounds!;
    const cLat = (minLat + maxLat) / 2, cLon = (minLon + maxLon) / 2;
    const realW = (maxLon - minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
    state.mmPerMeter = wMm / realW;
    state.BASE_H = st.baseH;

    // ── ÉTAPE 1 : Terrain ──
    setProgress(5, 'ÉLÉVATION', 'Téléchargement des tuiles d\'altitude…');
    const GRID = st.terrainRes;

    const terrainResult = await new Promise<TerrainResult>((resolve, reject) => {
      const w = makeTerrainWorker();
      w.onmessage = (e: MessageEvent) => {
        if (e.data.type === 'PROGRESS') setProgress(5 + e.data.pct * 0.2, 'ÉLÉVATION', 'Altitude…');
        else if (e.data.type === 'TERRAIN_READY') { w.terminate(); resolve(e.data); }
        else if (e.data.type === 'ERROR') { w.terminate(); reject(new Error(e.data.message)); }
      };
      w.onerror = err => { w.terminate(); reject(err); };
      const msg: TerrainWorkerInput = { type: 'BUILD_TERRAIN', bounds: bounds!, GRID, elevZoom: st.elevZoom };
      w.postMessage(msg);
    });

    state.elevGrid = terrainResult.elevGrid;
    state.GRID = terrainResult.GRID;
    state.minE = terrainResult.minE;
    state.elevRange = terrainResult.elevRange;

    const latDiff = maxLat - minLat;
    const realH = latDiff * 111320;
    const avgLen = Math.max(realW, realH);
    const maxModelDim = Math.max(wMm, dMm);
    const rawScaleMm = (terrainResult.elevRange / avgLen) * maxModelDim * st.exag;
    state.elevScaleMm = Math.max(1, Math.min(maxModelDim * 0.5, rawScaleMm));

    if (st.smooth > 0) gaussianSmooth(state.elevGrid, GRID, st.smooth);

    // ── ÉTAPE 2 : Overture ──
    setProgress(30, 'DONNÉES', 'Chargement des données cartographiques…');
    const features = await fetchOvertureFeatures(bounds!, pct => {
      setProgress(30 + pct * 0.3, 'DONNÉES', 'Données carto…');
    });

    // ── ÉTAPE 3 : Geometry ──
    setProgress(60, 'GÉOMÉTRIE', 'Génération des géométries 3D…');
    const geoResult = await new Promise<GeometryResult>((resolve, reject) => {
      const w = makeGeometryWorker();
      w.onmessage = (e: MessageEvent) => {
        if (e.data.type === 'GEO_PROGRESS') setProgress(60 + e.data.pct * 0.35, 'GÉOMÉTRIE', `${e.data.step}…`);
        else if (e.data.type === 'GEOMETRY_READY') { w.terminate(); resolve(e.data); }
        else if (e.data.type === 'ERROR') { w.terminate(); reject(new Error(e.data.message)); }
      };
      w.onerror = err => { w.terminate(); reject(err); };
      const msg: GeometryWorkerInput = {
        type: 'BUILD_GEOMETRY',
        elevGrid: state.elevGrid!, GRID: state.GRID, wMm, dMm,
        BASE_H: state.BASE_H, MIN_SURF, elevScaleMm: state.elevScaleMm,
        minE: state.minE, elevRange: state.elevRange,
        features, gpxPoints: state.gpxPoints,
        bounds: bounds!, settings: st,
        zoneType: state.zoneType, zonePts: state.zonePts,
        mmPerMeter: state.mmPerMeter,
      };
      w.postMessage(msg);
    });

    // ── ÉTAPE 4 : Scène ──
    setProgress(95, 'SCÈNE', 'Construction de la scène 3D…');
    applyGeometry(geoResult);

    setProgress(100, 'TERMINÉ', 'Modèle 3D prêt.');
    state.generated = true;
    state.generating = false;

    setTimeout(() => {
      showProgress(false);
      document.getElementById('hint3d')!.style.display = 'block';
      updateRenderInfo(terrainResult.minE, terrainResult.maxE, state.elevScaleMm, wMm, dMm);
      stlBtn.disabled = false;
      expBtn.disabled = false;
    }, 600);

  } catch (err) {
    state.generating = false;
    showProgress(false);
    showModal('ERREUR', String(err));
    console.error(err);
  } finally {
    btn.disabled = false;
  }
}

function gaussianSmooth(grid: Float32Array, GRID: number, passes: number) {
  const tmp = new Float32Array(grid.length);
  for (let p = 0; p < passes; p++) {
    for (let r = 0; r < GRID; r++) {
      for (let c = 0; c < GRID; c++) {
        let s = 0, n = 0;
        for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
          const r2 = r + dr, c2 = c + dc;
          if (r2 >= 0 && r2 < GRID && c2 >= 0 && c2 < GRID) { s += grid[r2 * GRID + c2]; n++; }
        }
        tmp[r * GRID + c] = s / n;
      }
    }
    grid.set(tmp);
  }
}

function updateRenderInfo(minE: number, maxE: number, scaleMm: number, wMm: number, dMm: number) {
  const el = document.getElementById('render-info');
  if (!el) return;
  el.innerHTML = `
    Alt. <span style="color:var(--cyan)">${Math.round(minE)}–${Math.round(maxE)}</span> m<br>
    Relief <span style="color:var(--cyan)">${scaleMm.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${wMm}×${dMm}</span> mm
  `;
}

/* ═══════════════════════════════════════════
   ZONE FOOTER — mise à jour quand zone définie
   ═══════════════════════════════════════════ */
export function updateZoneFooter(): void {
  const footer = document.getElementById('zone-footer');
  if (!footer) return;
  if (state.bounds) {
    footer.classList.add('visible');
    document.getElementById('tab-params-btn')?.removeAttribute('disabled');
  } else {
    footer.classList.remove('visible');
    document.getElementById('tab-params-btn')?.setAttribute('disabled', '');
    document.getElementById('tab-render-btn')?.setAttribute('disabled', '');
  }
}

/* ═══════════════════════════════════════════
   DIMENSIONS TAB
   ═══════════════════════════════════════════ */
let dimsRendererReady = false;
let dimsBuilding = false;

function getDimSettings(): DimSettings {
  const n = (id: string, def: number) => Number((document.getElementById(id) as HTMLInputElement)?.value ?? def) || def;
  return {
    wMm:   n('dp-w',    state.wMm   || 200),
    dMm:   n('dp-d',    state.dMm   || 200),
    baseH: n('dp-base', 5),
    exag:  n('dp-exag', 1),
  };
}

function syncDimsInputsFromState(): void {
  const setVal = (id: string, v: number) => {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) el.value = String(Math.round(v));
  };
  if (state.wMm > 0) setVal('dp-w', state.wMm);
  if (state.dMm > 0) setVal('dp-d', state.dMm);
}

function updateDimsHints(): void {
  const baseH = Number((document.getElementById('dp-base') as HTMLInputElement)?.value ?? 5) || 5;
  const walls = Number((document.getElementById('dp-walls') as HTMLInputElement)?.value ?? 2) || 2;
  const layersEl = document.getElementById('dp-layers-hint');
  const wallMmEl = document.getElementById('dp-wall-mm');
  if (layersEl) layersEl.textContent = `${Math.round(baseH / 0.2)} couches`;
  if (wallMmEl) wallMmEl.textContent = `${(walls * 0.42).toFixed(2)} mm`;
}

async function triggerDimsBuild(): Promise<void> {
  if (!state.bounds || dimsBuilding) return;
  dimsBuilding = true;

  const loading = document.getElementById('dims-loading')!;
  const msg     = document.getElementById('dims-load-msg')!;
  loading.classList.remove('hidden');

  try {
    await buildDimsPreview(state.bounds, getDimSettings(), (pct, txt) => {
      msg.textContent = txt || `${pct}%`;
    });
  } catch (err) {
    console.error('Dims preview error:', err);
    msg.textContent = 'Erreur de chargement';
  } finally {
    loading.classList.add('hidden');
    dimsBuilding = false;
  }
}

function onDimsTabOpen(): void {
  if (!state.bounds) return;

  syncDimsInputsFromState();
  updateDimsHints();

  const viewEl = document.getElementById('dims-view')!;

  if (!dimsRendererReady) {
    dimsRendererReady = true;
    // Wait one frame for the panel to be visible and sized
    requestAnimationFrame(() => {
      initDimsRenderer(viewEl);
      triggerDimsBuild();
    });
  } else {
    initDimsRenderer(viewEl); // resize if needed
    triggerDimsBuild();
  }
}

// Accordion toggles for Dimensions panel
(window as any).dpToggle = (id: string) => {
  document.getElementById(id)?.classList.toggle('open');
};

/* ═══════════════════════════════════════════
   INIT
   ═══════════════════════════════════════════ */
injectUI();
initMap(updateZoneFooter);

/* ── Navigation onglets ── */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = (btn as HTMLElement).dataset.tab;
    if (!tab || (btn as HTMLButtonElement).disabled) return;
    switchTab(tab);
    if (tab === 'params') onDimsTabOpen();
    if (tab === 'render') {
      const canvas = document.getElementById('c3d') as HTMLCanvasElement;
      if (canvas) ensureThree(canvas);
    }
  });
});

/* ── Bouton "Générer le terrain" (onglet 2 → 3) ── */
document.getElementById('btn-next-render')?.addEventListener('click', () => {
  document.getElementById('tab-render-btn')?.removeAttribute('disabled');
  switchTab('render');
  const canvas = document.getElementById('c3d') as HTMLCanvasElement;
  if (canvas) ensureThree(canvas);
  generate();
});

/* ── Boutons retour ── */
document.getElementById('btn-back-zone')?.addEventListener('click', () => switchTab('zone'));
document.getElementById('btn-back-params')?.addEventListener('click', () => switchTab('params'));

/* ── Generate (onglet 3 manuel) ── */
document.getElementById('btn-gen')?.addEventListener('click', generate);

/* ── Export ── */
document.getElementById('btn-stl')?.addEventListener('click', () => exportSTL('terrain3d.stl'));
document.getElementById('btn-export')?.addEventListener('click', () => export3MF());

/* ── Accordion clicks for Dimensions panel ── */
document.querySelectorAll('.dp-sh').forEach(sh => {
  sh.addEventListener('click', () => {
    sh.closest('.dp-sec')?.classList.toggle('open');
  });
});

/* ── Dimensions inputs: update hints and rebuild preview ── */
let _dbDims: ReturnType<typeof setTimeout>;
const dimsInputIds = ['dp-w', 'dp-d', 'dp-exag', 'dp-base'];
dimsInputIds.forEach(id => {
  document.getElementById(id)?.addEventListener('input', () => {
    updateDimsHints();
    // Update state for wMm/dMm immediately
    const w = Number((document.getElementById('dp-w') as HTMLInputElement)?.value);
    const d = Number((document.getElementById('dp-d') as HTMLInputElement)?.value);
    if (w > 0) state.wMm = w;
    if (d > 0) state.dMm = d;
    // Debounced rebuild (no refetch needed — same bounds)
    clearTimeout(_dbDims);
    _dbDims = setTimeout(() => rebuildScene(getDimSettings()), 500);
  });
});

document.getElementById('dp-walls')?.addEventListener('input', updateDimsHints);

/* ── Quick export button in Dimensions panel ── */
document.getElementById('dp-dl-btn')?.addEventListener('click', () => {
  if (!state.generated) { showModal('INFO', 'Générez d\'abord le modèle 3D dans l\'onglet "Générer & Exporter".'); return; }
  exportSTL('terrain3d.stl');
});

/* ── Bouton "Paramètres 3D →" (onglet 1 → 2) ── */
document.getElementById('btn-next-tab')?.addEventListener('click', () => {
  if (state.bounds) { switchTab('params'); onDimsTabOpen(); }
});

/* ── Rebuild auto sur changement de paramètre (ancien panneau) ── */
let _dbt: ReturnType<typeof setTimeout>;
document.querySelectorAll('#params-col input, #params-col select').forEach(el => {
  el.addEventListener('change', () => {
    clearTimeout(_dbt);
    _dbt = setTimeout(() => { if (state.generated && state.tg) generate(); }, 700);
  });
  el.addEventListener('input', () => {
    if ((el as HTMLInputElement).type === 'range') {
      const valEl = document.getElementById(`${el.id}-v`);
      if (valEl) valEl.textContent = (el as HTMLInputElement).value;
    }
  });
});
