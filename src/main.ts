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
import { initDimsRenderer, buildDimsPreview, rebuildScene, resetDimsCamera, reattachDimsCanvas, updateColorSlots, setLayerVisible, colorSlots, type DimSettings } from './scene/dimsPreview';
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
    document.getElementById('tab-colors-btn')?.removeAttribute('disabled');
    resetDimsCamera(); // zone changed → reset 3D view on next open
  } else {
    footer.classList.remove('visible');
    document.getElementById('tab-params-btn')?.setAttribute('disabled', '');
    document.getElementById('tab-colors-btn')?.setAttribute('disabled', '');
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
  const b = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked ?? false;
  return {
    wMm:          n('dp-w',    state.wMm || 200),
    dMm:          n('dp-d',    state.dMm || 200),
    baseH:        n('dp-base', 5),
    exag:         n('dp-exag', 1),
    flatFacade:   b('dp-flat'),
    facadeWidthMm: n('dp-walls', 2),  // used as mm in preview
    gpxPoints:    state.gpxPoints,
    zoneType:     state.zoneType,
    zonePts:      state.zonePts,
    bounds:       state.bounds,
  };
}

function syncDimsInputsFromState(): void {
  const setVal = (id: string, v: number) => {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el) el.value = String(Math.round(v));
  };

  if (!state.bounds) return;

  // Compute print size from geographic aspect ratio, max 200 mm
  const { minLat, maxLat, minLon, maxLon } = state.bounds;
  const cLat = (minLat + maxLat) / 2;
  const realW = (maxLon - minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const realH = (maxLat - minLat) * 111320;
  const MAX = 200;
  const ratio = realW / realH;
  const wMm = ratio >= 1 ? MAX : Math.max(10, Math.round(MAX * ratio));
  const dMm = ratio < 1 ? MAX : Math.max(10, Math.round(MAX / ratio));

  state.wMm = wMm;
  state.dMm = dMm;
  setVal('dp-w', wMm);
  setVal('dp-d', dMm);
}

function updateDimsHints(): void {
  const baseH  = Number((document.getElementById('dp-base')  as HTMLInputElement)?.value ?? 5) || 5;
  const walls  = Number((document.getElementById('dp-walls') as HTMLInputElement)?.value ?? 2) || 2;
  const layerH = Number((document.getElementById('ps-layer-h') as HTMLInputElement)?.value ?? 0.20) || 0.20;
  const wallW  = Number((document.getElementById('ps-wall-w')  as HTMLInputElement)?.value ?? 0.42) || 0.42;
  const layersEl = document.getElementById('dp-layers-hint');
  const wallMmEl = document.getElementById('dp-wall-mm');
  if (layersEl) layersEl.textContent = `${Math.round(baseH / layerH)} couches`;
  if (wallMmEl) wallMmEl.textContent = `${(walls * wallW).toFixed(2)} mm`;
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

  requestAnimationFrame(() => {
    const viewEl = document.getElementById('dims-view')!;
    if (!dimsRendererReady) {
      dimsRendererReady = true;
      initDimsRenderer(viewEl);
      triggerDimsBuild();
    } else {
      initDimsRenderer(viewEl); // moves canvas back + resizes
      triggerDimsBuild();
    }
  });
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
    if (tab === 'colors') onColorsTabOpen();
    if (tab === 'render') {
      const canvas = document.getElementById('c3d') as HTMLCanvasElement;
      if (canvas) ensureThree(canvas);
    }
  });
});

/* ── Bouton "Couleurs" (onglet 2 → 3) ── */
document.getElementById('btn-next-colors')?.addEventListener('click', () => {
  document.getElementById('tab-colors-btn')?.removeAttribute('disabled');
  switchTab('colors');
  onColorsTabOpen();
});

/* ── Bouton "Générer" (onglet 3 → 4) ── */
document.getElementById('btn-next-render')?.addEventListener('click', () => {
  document.getElementById('tab-render-btn')?.removeAttribute('disabled');
  switchTab('render');
  const canvas = document.getElementById('c3d') as HTMLCanvasElement;
  if (canvas) ensureThree(canvas);
  generate();
});

/* ── Boutons retour ── */
document.getElementById('btn-back-zone')?.addEventListener('click', () => switchTab('zone'));
document.getElementById('btn-back-dims')?.addEventListener('click', () => { switchTab('params'); onDimsTabOpen(); });
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
const dimsInputIds = ['dp-w', 'dp-d', 'dp-exag', 'dp-base', 'dp-walls'];
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

document.getElementById('dp-flat')?.addEventListener('change', () => {
  rebuildScene(getDimSettings());
});

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

/* ═══════════════════════════════════════════
   COLORS TAB
   ═══════════════════════════════════════════ */
function onColorsTabOpen(): void {
  if (!state.bounds) return;
  // rAF ensures panel is visible and sized before moving canvas
  requestAnimationFrame(() => {
    const area = document.getElementById('colors-3d-area')!;
    if (!dimsRendererReady) {
      dimsRendererReady = true;
      initDimsRenderer(area);
      triggerDimsBuild();
    } else {
      initDimsRenderer(area);  // moves canvas here and resizes
    }
    syncSwatchUI();
  });
}

function syncSwatchUI(): void {
  document.querySelectorAll<HTMLElement>('.cp-sw-mini[data-slot]').forEach(el => {
    const slot = Number(el.dataset.slot);
    if (colorSlots[slot]) el.style.background = colorSlots[slot];
  });
  document.querySelectorAll<HTMLElement>('.cp-sw-inner').forEach(el => {
    const label = el.closest<HTMLElement>('.cp-swatch');
    const input = label?.querySelector<HTMLInputElement>('input[type=color]');
    if (input) el.style.background = input.value;
  });
}

// Color picker inputs → live update
document.querySelectorAll<HTMLInputElement>('.cp-color-input').forEach(input => {
  const slot = Number(input.dataset.slot);
  // Set initial background of inner div
  input.addEventListener('input', () => {
    const col = input.value;
    const inner = input.nextElementSibling as HTMLElement;
    if (inner) inner.style.background = col;
    // Update all mini swatches for this slot
    document.querySelectorAll<HTMLElement>(`.cp-sw-mini[data-slot="${slot}"]`).forEach(el => {
      el.style.background = col;
    });
    // Rebuild 3D texture
    updateColorSlots({ [slot]: col });
  });
  // Init swatch background
  const inner = input.nextElementSibling as HTMLElement;
  if (inner) inner.style.background = input.value;
});

// Layer visibility toggle
document.querySelectorAll<HTMLButtonElement>('.cp-eye').forEach(btn => {
  const layerId = btn.dataset.layer;
  if (!layerId) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('hidden-layer');
    const visible = !btn.classList.contains('hidden-layer');
    setLayerVisible(layerId, visible);
  });
});

// Preset models
const PRESETS: Record<string, Record<number, string>> = {
  alpes:  { 1: '#c0af88', 2: '#e8ecf0', 3: '#8ab858', 4: '#3a6828', 5: '#4a88c0', 6: '#ff4500' },
  mono:   { 1: '#a0a090', 2: '#d8d8d8', 3: '#888878', 4: '#606050', 5: '#787878', 6: '#505050' },
  desert: { 1: '#d4a96a', 2: '#f0e8c8', 3: '#c8a858', 4: '#a07840', 5: '#5888a0', 6: '#c04820' },
};
document.getElementById('cp-apply')?.addEventListener('click', () => {
  const sel = (document.getElementById('cp-preset') as HTMLSelectElement).value;
  const preset = PRESETS[sel];
  if (!preset) return;
  updateColorSlots(preset);
  // Update picker inputs
  Object.entries(preset).forEach(([slot, col]) => {
    const input = document.querySelector<HTMLInputElement>(`.cp-color-input[data-slot="${slot}"]`);
    if (input) {
      input.value = col;
      const inner = input.nextElementSibling as HTMLElement;
      if (inner) inner.style.background = col;
    }
  });
  document.querySelectorAll<HTMLElement>('.cp-sw-mini[data-slot]').forEach(el => {
    const slot = Number(el.dataset.slot);
    if (preset[slot]) el.style.background = preset[slot];
  });
});

/* ── Custom model dropdown ── */
const ddTrigger = document.getElementById('cp-dd-trigger');
const ddMenu    = document.getElementById('cp-dd-menu');
ddTrigger?.addEventListener('click', (e) => {
  e.stopPropagation();
  ddMenu?.classList.toggle('open');
});
document.addEventListener('click', () => ddMenu?.classList.remove('open'));
document.querySelectorAll<HTMLElement>('.cp-dd-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.stopPropagation();
    const preset = item.dataset.preset ?? '';
    const label = item.textContent?.trim().replace(/^✓\s*/, '') ?? '';
    document.querySelectorAll('.cp-dd-item').forEach(i => i.classList.remove('cp-dd-active'));
    item.classList.add('cp-dd-active');
    const ddLabel = document.getElementById('cp-dd-label');
    if (ddLabel) ddLabel.textContent = label;
    ddMenu?.classList.remove('open');
    // Apply preset if known
    const p = PRESETS[preset];
    if (p) { updateColorSlots(p); applyPresetToUI(p); }
  });
});

function applyPresetToUI(preset: Record<number, string>): void {
  Object.entries(preset).forEach(([slot, col]) => {
    const input = document.querySelector<HTMLInputElement>(`.cp-color-input[data-slot="${slot}"]`);
    if (input) {
      input.value = col;
      const inner = input.nextElementSibling as HTMLElement;
      if (inner) inner.style.background = col;
    }
  });
  document.querySelectorAll<HTMLElement>('.cp-sw-mini[data-slot]').forEach(el => {
    const s = Number(el.dataset.slot);
    if (preset[s]) el.style.background = preset[s];
  });
}

/* ── Layer detail navigation ── */
const cpMain   = document.getElementById('cp-main')!;
const cpDetail = document.getElementById('cp-detail')!;
const ldpTitle = document.getElementById('ldp-title')!;
const ldpIcon  = document.getElementById('ldp-icon')!;
const ldpContent = document.getElementById('ldp-content')!;

function showLayerDetail(layerId: string, layerType: string, layerName: string, iconSvgInner: string): void {
  ldpTitle.textContent = layerName;
  ldpIcon.innerHTML = iconSvgInner;
  ldpContent.innerHTML = buildLayerDetailHTML(layerType);
  cpMain.style.display = 'none';
  cpDetail.style.display = 'flex';
  wireDetailInputs(layerType);
}

function showLayerMain(): void {
  cpDetail.style.display = 'none';
  cpMain.style.display = 'flex';
}

document.getElementById('ldp-back')?.addEventListener('click', showLayerMain);

// Layer row clicks
document.querySelectorAll<HTMLElement>('.cp-layer-nav').forEach(row => {
  row.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('.cp-eye, .cp-del')) return; // don't navigate on eye/del
    const layerType = row.dataset.type ?? 'land_cover';
    const layerName = row.querySelector('.cp-layer-name')?.textContent ?? 'Couche';
    const iconSvg = row.querySelector('.cp-layer-ico')?.innerHTML ?? '';
    showLayerDetail(row.dataset.layer ?? '', layerType, layerName, iconSvg);
  });
});

// "+" add layer button
document.getElementById('cp-add-layer-btn')?.addEventListener('click', () => {
  ldpTitle.textContent = 'Nouvelle couche';
  ldpIcon.innerHTML = '<path d="M8 2v12M2 8h12" stroke-linecap="round"/>';
  ldpContent.innerHTML = buildNewLayerHTML();
  cpMain.style.display = 'none';
  cpDetail.style.display = 'flex';
  wireNewLayerInputs();
});

/* ── Layer detail HTML builders ── */
function buildLayerDetailHTML(type: string): string {
  if (type === 'markers') return buildMarkersHTML();
  if (type === 'lines')   return buildLinesHTML();
  return buildLandCoverHTML();
}

function buildMarkersHTML(): string {
  return `
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Paramètres</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Forme</div>
      <button class="ldp-form-btn">
        ✕ <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
      </button>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Taille (nombre de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Taille du marqueur en nombre de lignes de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-marker-size" class="cp-slider" min="1" max="20" value="10">
        <input type="number" class="ldp-num" id="ldp-marker-size-n" value="10.0" step="0.5">
        <span class="ldp-unit">( 4.20 mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Rotation (°)</div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-marker-rot" class="cp-slider" min="0" max="360" value="0">
        <input type="number" class="ldp-num" id="ldp-marker-rot-n" value="0" step="1">
      </div>
    </div>
    <div class="ldp-field">
      <label class="ldp-check-row">
        <input type="checkbox" id="ldp-marker-flat" checked>
        Plateau plat
        <button class="ldp-edit-btn" title="Modifier"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg></button>
        <button class="cp-icon-btn cp-info-btn" title="Aplatir le sommet du marqueur">i</button>
      </label>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nombre de calques)</span>
        <button class="cp-icon-btn cp-info-btn" title="Décalage vertical en nombre de couches d'impression">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-marker-offset" value="2" step="1" min="0">
        <span class="ldp-unit">( 0,40 mm )</span>
      </div>
    </div>
  </div>`;
}

function buildLinesHTML(): string {
  const lineTypes = [
    { key: 'hiking',    label: 'Itinéraires de randonnée', chevron: true },
    { key: 'cycling',   label: 'Itinéraires cyclables',    chevron: true },
    { key: 'mtb',       label: 'Parcours de VTT',          chevron: true },
    { key: 'horse',     label: 'Itinéraires équestres',    chevron: true },
    { key: 'winter',    label: 'Sports d\'hiver',          chevron: true },
    { key: 'motor',     label: 'Sports mécaniques',        chevron: false },
    { key: 'roads',     label: 'Routes',                   chevron: true },
    { key: 'streets',   label: 'Rues',                     chevron: true },
    { key: 'rails',     label: 'Rails',                    chevron: true },
    { key: 'paths',     label: 'Sentiers',                 chevron: false },
    { key: 'cycleways', label: 'Pistes cyclables',         chevron: false },
    { key: 'bridleway', label: 'Chemins de bride',         chevron: false },
    { key: 'trackways', label: 'Chemins ruraux',           chevron: false },
    { key: 'water',     label: 'Transport fluvial',        chevron: false },
  ];
  const checks = lineTypes.map(t => `
    <div class="ldp-check-item">
      <label><input type="checkbox" data-linetype="${t.key}"> ${t.label}</label>
      ${t.chevron ? `<span class="ldp-chevron"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg></span>` : ''}
    </div>`).join('');
  return `
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Paramètres</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Largeur (nombre de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Épaisseur de la ligne en nombre de murs">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-line-w" class="cp-slider" min="1" max="10" value="1">
        <input type="number" class="ldp-num" id="ldp-line-w-n" value="1.0" step="0.5">
        <span class="ldp-unit">( 0,42 mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nombre de calques)</span>
        <button class="cp-icon-btn cp-info-btn" title="Décalage vertical en nombre de couches">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-line-offset" value="1" step="1" min="0">
        <span class="ldp-unit">( 0,20 mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Caractéristiques</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-checkboxes">${checks}</div>
  </div>`;
}

function buildLandCoverHTML(): string {
  return `
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Paramètres</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nombre de calques)</span>
        <button class="cp-icon-btn cp-info-btn" title="Décalage vertical en nombre de couches">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-lc-offset" value="0" step="1" min="0">
        <span class="ldp-unit">( 0,00 mm )</span>
      </div>
    </div>
  </div>`;
}

function buildNewLayerHTML(): string {
  return `
  <div class="ldp-sec">
    <div class="ldp-field" style="padding-top:10px">
      <div class="ldp-field-label">Type</div>
      <select class="ldp-select" id="ldp-new-type">
        <option value="land_cover">Couverture terrestre</option>
        <option value="lines">Lignes</option>
        <option value="markers">Marqueurs</option>
        <option value="water">Plans d'eau</option>
        <option value="waterways">Voies navigables</option>
      </select>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Nom</div>
      <input type="text" class="ldp-input" id="ldp-new-name" placeholder="Couverture terrestre">
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Couleur</div>
      <div class="ldp-color-slot" id="ldp-new-color" data-slot="1" style="background:#c0af88">1</div>
    </div>
    <button class="btn-gen-f ldp-add-btn" id="ldp-confirm-add">Ajouter un calque</button>
  </div>`;
}

function wireDetailInputs(type: string): void {
  const wallW = Number((document.getElementById('ps-wall-w') as HTMLInputElement)?.value ?? 0.42) || 0.42;
  const layH  = Number((document.getElementById('ps-layer-h') as HTMLInputElement)?.value ?? 0.20) || 0.20;

  if (type === 'markers') {
    const sz  = document.getElementById('ldp-marker-size')  as HTMLInputElement;
    const szN = document.getElementById('ldp-marker-size-n') as HTMLInputElement;
    const rt  = document.getElementById('ldp-marker-rot')   as HTMLInputElement;
    const rtN = document.getElementById('ldp-marker-rot-n') as HTMLInputElement;
    const off = document.getElementById('ldp-marker-offset') as HTMLInputElement;
    const syncSz = () => { const v=Number(sz.value); szN.value=v.toFixed(1); off.nextElementSibling && (off.nextElementSibling.textContent=`( ${(off.value==='') ? '0.00' : (Number(off.value)*layH).toFixed(2)} mm )`); };
    sz?.addEventListener('input', () => { szN.value = sz.value; syncSz(); });
    szN?.addEventListener('input', () => { if(sz) sz.value = szN.value; });
    rt?.addEventListener('input', () => { if(rtN) rtN.value = rt.value; });
    rtN?.addEventListener('input', () => { if(rt) rt.value = rtN.value; });
  }

  if (type === 'lines') {
    const lw  = document.getElementById('ldp-line-w')   as HTMLInputElement;
    const lwN = document.getElementById('ldp-line-w-n') as HTMLInputElement;
    lw?.addEventListener('input', () => { if(lwN) lwN.value = lw.value; });
    lwN?.addEventListener('input', () => { if(lw) lw.value = lwN.value; });
  }
}

function wireNewLayerInputs(): void {
  document.getElementById('ldp-new-type')?.addEventListener('change', (e) => {
    const t = (e.target as HTMLSelectElement).value;
    const nameInput = document.getElementById('ldp-new-name') as HTMLInputElement;
    const labels: Record<string, string> = {
      land_cover: 'Couverture terrestre', lines: 'Lignes', markers: 'Marqueurs',
      water: 'Plans d\'eau', waterways: 'Voies navigables',
    };
    if (nameInput) nameInput.placeholder = labels[t] ?? t;
  });
  document.getElementById('ldp-confirm-add')?.addEventListener('click', showLayerMain);
  document.getElementById('ldp-new-color')?.addEventListener('click', () => {
    const slots = [1,2,3,4,5,6];
    const current = Number((document.getElementById('ldp-new-color') as HTMLElement).dataset.slot ?? 1);
    const next = slots[(slots.indexOf(current) + 1) % slots.length];
    const el = document.getElementById('ldp-new-color')!;
    el.dataset.slot = String(next);
    el.textContent = String(next);
    el.style.background = colorSlots[next] ?? '#888';
  });
}

/* ── Print Settings dialog ── */
const psOverlay = document.getElementById('print-settings-overlay')!;
document.getElementById('btn-print-settings')?.addEventListener('click', () => {
  psOverlay.classList.remove('hidden');
});
document.getElementById('ps-close')?.addEventListener('click', () => {
  psOverlay.classList.add('hidden');
});
psOverlay?.addEventListener('click', (e) => {
  if (e.target === psOverlay) psOverlay.classList.add('hidden');
});

// Live slider value display
const psLayerH = document.getElementById('ps-layer-h') as HTMLInputElement;
const psWallW  = document.getElementById('ps-wall-w')  as HTMLInputElement;
const psLayerHVal = document.getElementById('ps-layer-h-val')!;
const psWallWVal  = document.getElementById('ps-wall-w-val')!;
psLayerH?.addEventListener('input', () => {
  psLayerHVal.textContent = Number(psLayerH.value).toFixed(2);
  updateDimsHints(); // recalculate layer count
});
psWallW?.addEventListener('input', () => {
  psWallWVal.textContent = Number(psWallW.value).toFixed(2);
  updateDimsHints(); // recalculate wall thickness
});

document.getElementById('ps-confirm')?.addEventListener('click', () => {
  psOverlay.classList.add('hidden');
  updateDimsHints();
});
document.getElementById('ps-reset')?.addEventListener('click', () => {
  if (psLayerH) { psLayerH.value = '0.20'; psLayerHVal.textContent = '0.20'; }
  if (psWallW)  { psWallW.value  = '0.42'; psWallWVal.textContent  = '0.42'; }
  updateDimsHints();
});
