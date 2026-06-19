/* ════════════════════════════════════════════
   DIMS PREVIEW — 3D terrain preview
   ════════════════════════════════════════════ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { LatLonBounds, LatLon } from '../types';

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;

let cachedKey = '';
let cachedElev: { grid: Float32Array; minE: number; elevRange: number; bounds: LatLonBounds } | null = null;
let cachedTexture: THREE.CanvasTexture | null = null;
let cachedMask: THREE.CanvasTexture | null = null;
let cachedZoneKey = '';
let cachedFeatures: OSMEl[] = [];
let cachedFeaturesKey = '';

// Color slots 1-6 (Bambu-style filament colors)
export const colorSlots: Record<number, string> = {
  1: '#c0af88',  // Terrain nu + Façade
  2: '#e4eee8',  // Neige et glace
  3: '#8ab858',  // Végétation basse
  4: '#3a6828',  // Végétation dense
  5: '#4a88c0',  // Plans d'eau + Voies navigables
  6: '#ff4500',  // Marqueurs / GPX
};

// Layer visibility
export const layerVisible: Record<string, boolean> = {
  veg_low: true, veg_dense: true, wetland: true,
  snow: true, water: true, waterways: true,
};

// Mesh references for live color updates
let terrainMeshRef: THREE.Mesh | null = null;
let facadeMeshRefs: THREE.Mesh[] = [];
let dimsCanvas: HTMLCanvasElement | null = null;

const PREVIEW_GRID = 128;
const TEX_SIZE = 1024; // high-res for precise zone boundaries

interface OSMEl {
  type: 'way' | 'relation' | string;
  tags?: Record<string, string>;
  geometry?: GeoPoint[];
  members?: OSMMember[];
}
interface OSMMember {
  type: string;
  role: string;
  geometry?: GeoPoint[];
}
interface GeoPoint { lat: number; lon: number }

let sceneObjs: THREE.Object3D[] = [];
const lblAnchors: { id: string; v: THREE.Vector3 }[] = [];

/* ══════════════════════════════════════════════
   RENDERER INIT
══════════════════════════════════════════════ */
export function initDimsRenderer(viewEl: HTMLElement): void {
  // Find canvas once (it might have been moved between tabs)
  if (!dimsCanvas) {
    dimsCanvas = document.getElementById('dims-canvas') as HTMLCanvasElement;
  }
  // Move canvas to this container if needed
  if (dimsCanvas && !viewEl.contains(dimsCanvas)) {
    viewEl.appendChild(dimsCanvas);
  }

  const W = viewEl.clientWidth || 800;
  const H = viewEl.clientHeight || 600;

  if (renderer) {
    renderer.setSize(W, H, false);
    camera!.aspect = W / H;
    camera!.updateProjectionMatrix();
    return;
  }

  renderer = new THREE.WebGLRenderer({ canvas: dimsCanvas!, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H, false);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080c14);

  camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100000);
  controls = new OrbitControls(camera, dimsCanvas!);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;

  scene.add(new THREE.AmbientLight(0xffffff, 0.80));
  const sun = new THREE.DirectionalLight(0xffffff, 0.60);
  sun.position.set(1.5, 3, 2);
  scene.add(sun);

  const loop = () => {
    requestAnimationFrame(loop);
    controls!.update();
    renderer!.render(scene!, camera!);
    tickLabels();
  };
  loop();

  // Resize based on canvas parent (works after canvas moves)
  new ResizeObserver(() => {
    const parent = dimsCanvas!.parentElement;
    if (!parent) return;
    const W2 = parent.clientWidth, H2 = parent.clientHeight;
    if (!W2 || !H2) return;
    camera!.aspect = W2 / H2;
    camera!.updateProjectionMatrix();
    renderer!.setSize(W2, H2, false);
  }).observe(dimsCanvas!);
}

/** Move the 3D canvas to another container (tab switch) */
export function reattachDimsCanvas(viewEl: HTMLElement): void {
  if (!dimsCanvas) return;
  if (!viewEl.contains(dimsCanvas)) viewEl.appendChild(dimsCanvas);
  if (!renderer || !camera) return;
  const W = viewEl.clientWidth || 800;
  const H = viewEl.clientHeight || 600;
  renderer.setSize(W, H, false);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
}

/** Update one or more color slots and live-refresh the 3D preview */
export function updateColorSlots(slots: Partial<Record<number, string>>): void {
  Object.assign(colorSlots, slots);
  // Rebuild map texture with new colors
  if (cachedElev) {
    if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
    cachedTexture = buildMapTexture(
      cachedElev.bounds, cachedElev.grid, PREVIEW_GRID,
      cachedElev.minE, cachedElev.elevRange, cachedFeatures,
    );
    if (terrainMeshRef) {
      const mat = terrainMeshRef.material as THREE.MeshLambertMaterial;
      mat.map = cachedTexture;
      mat.needsUpdate = true;
    }
  }
  // Update facade/base color from slot 1
  const fColor = new THREE.Color(colorSlots[1]);
  for (const m of facadeMeshRefs) {
    (m.material as THREE.MeshLambertMaterial).color.set(fColor);
  }
}

/** Toggle visibility of an OSM layer and rebuild texture */
export function setLayerVisible(id: string, visible: boolean): void {
  layerVisible[id] = visible;
  updateColorSlots({});  // trigger texture rebuild
}

/* ══════════════════════════════════════════════
   PUBLIC TYPES
══════════════════════════════════════════════ */
export interface DimSettings {
  wMm: number; dMm: number; baseH: number; exag: number;
  flatFacade: boolean; facadeWidthMm: number;
  gpxPoints: LatLon[];
  zoneType: string;
  zonePts: [number, number][] | null;
  bounds: LatLonBounds | null;
}

/* ══════════════════════════════════════════════
   MAIN BUILD
══════════════════════════════════════════════ */
export async function buildDimsPreview(
  bounds: LatLonBounds,
  settings: DimSettings,
  onProgress: (pct: number, msg: string) => void,
): Promise<void> {
  if (!scene || !camera || !controls || !renderer) return;

  const key = `${bounds.minLat}|${bounds.maxLat}|${bounds.minLon}|${bounds.maxLon}`;
  const needFetch = key !== cachedKey;

  if (needFetch) {
    cachedKey = key;
    cachedElev = null;
    if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }

    onProgress(5, 'Téléchargement des altitudes…');
    cachedElev = await loadElevation(bounds);

    onProgress(35, 'Chargement des données géographiques…');
    if (key !== cachedFeaturesKey) {
      cachedFeaturesKey = key;
      cachedFeatures = await fetchTerrainFeatures(bounds);
    }

    onProgress(70, 'Génération de la texture…');
    cachedTexture = buildMapTexture(
      bounds, cachedElev.grid, PREVIEW_GRID,
      cachedElev.minE, cachedElev.elevRange, cachedFeatures,
    );
  } else {
    onProgress(50, 'Reconstruction…');
  }

  const zoneKey = JSON.stringify(settings.zonePts);
  if (zoneKey !== cachedZoneKey || !cachedMask) {
    cachedZoneKey = zoneKey;
    if (cachedMask) { cachedMask.dispose(); cachedMask = null; }
    cachedMask = buildZoneMask(settings.zonePts, settings.zoneType, bounds, settings.wMm, settings.dMm);
  }

  onProgress(88, 'Construction de la scène 3D…');
  rebuildScene(settings);
  onProgress(100, '');
}

/* ══════════════════════════════════════════════
   REBUILD SCENE
══════════════════════════════════════════════ */
export function rebuildScene(s: DimSettings): void {
  if (!scene || !camera || !controls || !cachedElev || !cachedTexture) return;
  clearScene();

  const { wMm, dMm, baseH, exag, flatFacade, facadeWidthMm, gpxPoints, zoneType, zonePts, bounds } = s;
  const { grid, minE, elevRange } = cachedElev;
  const rb = bounds ?? cachedElev.bounds;

  const cLat = (rb.minLat + rb.maxLat) / 2;
  const realW = (rb.maxLon - rb.minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const realH = (rb.maxLat - rb.minLat) * 111320;
  const avgLen = Math.max(realW, realH);
  const maxModelDim = Math.max(wMm, dMm);
  const elevScaleMm = Math.max(1, Math.min(maxModelDim * 0.5, (elevRange / avgLen) * maxModelDim * exag));
  const totalH = baseH + elevScaleMm;

  const G = PREVIEW_GRID;
  const modelPts = zonePtsToModel(zonePts, zoneType, rb, wMm, dMm);
  const facadeW = Math.max(1, facadeWidthMm);

  terrainMeshRef = null;
  facadeMeshRefs = [];

  // ── Terrain ───────────────────────────────────────────
  {
    const geo = new THREE.PlaneGeometry(wMm, dMm, G - 1, G - 1);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, baseH + ((grid[i] - minE) / elevRange) * elevScaleMm);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    const tm = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({
      map: cachedTexture,
      alphaMap: cachedMask ?? undefined,
      transparent: !!cachedMask,
    }));
    terrainMeshRef = tm;
    add(tm);
  }

  // ── Base ──────────────────────────────────────────────
  const baseColor = new THREE.Color(colorSlots[1]);
  const baseMesh = new THREE.Mesh(
    buildBaseGeo(modelPts, zoneType, wMm, dMm, baseH, facadeW),
    new THREE.MeshLambertMaterial({ color: baseColor }),
  );
  facadeMeshRefs.push(baseMesh);
  add(baseMesh);

  // ── Facades ───────────────────────────────────────────
  const facadeMat = new THREE.MeshLambertMaterial({ color: baseColor, side: THREE.DoubleSide });
  for (const m of buildFacades(modelPts, zoneType, wMm, dMm, facadeW, flatFacade, totalH, grid, G, minE, elevRange, baseH, elevScaleMm)) {
    m.material = facadeMat;
    facadeMeshRefs.push(m);
    add(m);
  }

  // ── GPX ───────────────────────────────────────────────
  if (gpxPoints.length >= 2) {
    const ln = buildGpxLine(gpxPoints, rb, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm);
    if (ln) add(ln);
  }

  // ── Bounding box ─────────────────────────────────────
  {
    const bb = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(wMm + facadeW * 2, totalH, dMm + facadeW * 2)),
      new THREE.LineBasicMaterial({ color: 0xff1a1a }),
    );
    bb.position.y = totalH / 2;
    add(bb);
  }

  // ── Labels ────────────────────────────────────────────
  lblAnchors.length = 0;
  lblAnchors.push({ id: 'dl-width',  v: new THREE.Vector3(0, 2, dMm / 2 + facadeW + 14) });
  lblAnchors.push({ id: 'dl-depth',  v: new THREE.Vector3(wMm / 2 + facadeW + 14, totalH * 0.1, 0) });
  lblAnchors.push({ id: 'dl-height', v: new THREE.Vector3(-wMm / 2 - facadeW - 12, totalH / 2, dMm / 2 + 8) });
  txt('dl-width',       `${wMm} mm`);
  txt('dl-depth',       `${dMm} mm`);
  txt('dl-height',      `~${Math.round(totalH * 10) / 10} mm`);
  txt('dp-total-val',   `~${Math.round(totalH * 10) / 10}`);
  txt('dp-map-h',       `~${Math.round(elevScaleMm * 10) / 10}`);
  txt('dp-base-h-disp', `${baseH}`);

  // ── Camera ────────────────────────────────────────────
  const diag = Math.sqrt(wMm * wMm + dMm * dMm);
  if (controls.target.lengthSq() < 0.1) {
    camera!.position.set(wMm * 0.7, totalH + diag * 0.44, dMm * 0.92);
    const tgt = new THREE.Vector3(0, totalH * 0.2, 0);
    camera!.lookAt(tgt); controls!.target.copy(tgt); controls!.update();
  }
}

export function resetDimsCamera(): void {
  if (controls) controls.target.set(0, 0, 0);
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
  if (cachedMask) { cachedMask.dispose(); cachedMask = null; }
  cachedZoneKey = '';
}

/* ══════════════════════════════════════════════
   OSM TERRAIN FEATURES (Overpass)
   Fetches: water, forest, scrub, grassland, glacier, bare rock, wetland
══════════════════════════════════════════════ */
async function fetchTerrainFeatures(bounds: LatLonBounds): Promise<OSMEl[]> {
  const { minLat, minLon, maxLat, maxLon } = bounds;
  const bb = `(${minLat},${minLon},${maxLat},${maxLon})`;
  const query = `[out:json][timeout:28];
(
  way["natural"="water"]${bb};
  relation["natural"="water"]${bb};
  way["waterway"="riverbank"]${bb};
  way["waterway"~"^(river|canal|stream|ditch)$"]${bb};
  way["natural"="wood"]${bb};
  relation["natural"="wood"]${bb};
  way["landuse"="forest"]${bb};
  relation["landuse"="forest"]${bb};
  way["natural"="scrub"]${bb};
  way["natural"="heath"]${bb};
  way["natural"="fell"]${bb};
  way["natural"="moor"]${bb};
  way["natural"="grassland"]${bb};
  way["landuse"~"^(meadow|grass|farmland)$"]${bb};
  way["natural"="glacier"]${bb};
  relation["natural"="glacier"]${bb};
  way["natural"="snow"]${bb};
  way["natural"="bare_rock"]${bb};
  way["natural"="scree"]${bb};
  way["natural"="sand"]${bb};
  way["natural"="wetland"]${bb};
  way["natural"="mud"]${bb};
);
out geom;`;

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 22000);
  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      { signal: ctrl.signal },
    );
    clearTimeout(t);
    return ((await res.json()).elements ?? []) as OSMEl[];
  } catch {
    clearTimeout(t);
    return [];
  }
}

/* ══════════════════════════════════════════════
   MAP TEXTURE: layered OSM terrain zones
══════════════════════════════════════════════ */

// Zone definitions: drawn bottom-to-top. Colors driven by colorSlots.
const ZONE_LAYERS: Array<{
  id: string;
  match: (tags: Record<string, string>) => boolean;
  slot: number;
  fill: boolean;
}> = [
  { id: 'veg_low',   match: t => t.natural === 'grassland' || t.landuse === 'meadow' || t.landuse === 'grass' || t.landuse === 'farmland' || t.natural === 'fell' || t.natural === 'moor' || t.natural === 'heath' || t.natural === 'scrub', slot: 3, fill: true },
  { id: 'veg_dense', match: t => t.natural === 'wood' || t.landuse === 'forest', slot: 4, fill: true },
  { id: 'wetland',   match: t => t.natural === 'wetland' || t.natural === 'mud',  slot: 3, fill: true },
  { id: 'snow',      match: t => t.natural === 'glacier' || t.natural === 'snow', slot: 2, fill: true },
  { id: 'water',     match: t => t.natural === 'water' || t.waterway === 'riverbank', slot: 5, fill: true },
  { id: 'waterways', match: t => !!t.waterway && t.waterway !== 'riverbank',          slot: 5, fill: false },
];

function buildMapTexture(
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  features: OSMEl[],
): THREE.CanvasTexture {
  const S = TEX_SIZE;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d')!;

  // Step 1 — hypsometric elevation base (always present, provides fallback coloring)
  const id = ctx.createImageData(S, S);
  const d = id.data;
  for (let row = 0; row < S; row++) {
    for (let col = 0; col < S; col++) {
      const gx = col / (S - 1) * (G - 1);
      const gy = row / (S - 1) * (G - 1);
      const gi = Math.min(G - 2, Math.floor(gx));
      const gj = Math.min(G - 2, Math.floor(gy));
      const fx = gx - gi, fy = gy - gj;
      const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
              + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
      const t = Math.max(0, Math.min(1, (e - minE) / elevRange));
      const [r, g, b] = hypso(t);
      const pi = (row * S + col) * 4;
      d[pi] = r; d[pi+1] = g; d[pi+2] = b; d[pi+3] = 255;
    }
  }
  ctx.putImageData(id, 0, 0);

  // Step 2 — draw each OSM layer in order
  for (const layer of ZONE_LAYERS) {
    if (!layerVisible[layer.id]) continue;
    const layerEls = features.filter(el => el.tags && layer.match(el.tags));
    if (!layerEls.length) continue;

    const col = colorSlots[layer.slot] ?? '#888';

    if (layer.fill) {
      ctx.beginPath();
      for (const el of layerEls) traceGeometry(ctx, el, bounds, S);
      ctx.fillStyle = col;
      ctx.fill('evenodd');
    } else {
      // Waterway lines — dynamic width by type
      for (const el of layerEls) {
        if (!el.tags) continue;
        const ww = el.tags.waterway ?? '';
        const lw = ww === 'river' ? 7 : ww === 'canal' ? 5 : ww === 'stream' ? 2.5 : 1.5;
        ctx.beginPath();
        traceGeometry(ctx, el, bounds, S);
        ctx.strokeStyle = col;
        ctx.lineWidth = lw;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }
    }
  }

  return new THREE.CanvasTexture(cv);
}

/** Trace element geometry into the current canvas path (supports ways + relations) */
function traceGeometry(
  ctx: CanvasRenderingContext2D,
  el: OSMEl,
  bounds: LatLonBounds,
  S: number,
): void {
  const drawPts = (pts: GeoPoint[]) => {
    if (!pts || pts.length < 2) return;
    for (let i = 0; i < pts.length; i++) {
      const cx = (pts[i].lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * S;
      const cy = (1 - (pts[i].lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * S;
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    }
    ctx.closePath();
  };

  if (el.type === 'way' && el.geometry) {
    drawPts(el.geometry);
  } else if (el.type === 'relation' && el.members) {
    for (const m of el.members) {
      if (m.role === 'outer' && m.geometry) drawPts(m.geometry);
    }
  }
}

/* ══════════════════════════════════════════════
   ALPHA MASK
══════════════════════════════════════════════ */
function buildZoneMask(
  zonePts: [number, number][] | null, zoneType: string,
  bounds: LatLonBounds, wMm: number, dMm: number,
): THREE.CanvasTexture | null {
  if (!zonePts || zonePts.length < 3 || zoneType === 'rect' || zoneType === 'sq') return null;
  const S = 512;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = 'black'; ctx.fillRect(0, 0, S, S);
  ctx.fillStyle = 'white'; ctx.beginPath();
  for (let i = 0; i < zonePts.length; i++) {
    const [lat, lon] = zonePts[i];
    const cx = (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * S;
    const cy = (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * S;
    if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
  }
  ctx.closePath(); ctx.fill();
  return new THREE.CanvasTexture(cv);
}

/* ══════════════════════════════════════════════
   ZONE POINTS → MODEL SPACE
══════════════════════════════════════════════ */
function zonePtsToModel(
  zonePts: [number, number][] | null, zoneType: string,
  bounds: LatLonBounds, wMm: number, dMm: number,
): Array<[number, number]> {
  if (!zonePts || zonePts.length < 3 || zoneType === 'rect' || zoneType === 'sq') {
    return [[-wMm/2,-dMm/2],[wMm/2,-dMm/2],[wMm/2,dMm/2],[-wMm/2,dMm/2]];
  }
  return zonePts.map(([lat, lon]): [number, number] => [
    (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * wMm - wMm / 2,
    (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * dMm - dMm / 2,
  ]);
}

/* ══════════════════════════════════════════════
   BASE GEOMETRY
══════════════════════════════════════════════ */
function buildBaseGeo(
  modelPts: Array<[number, number]>, zoneType: string,
  wMm: number, dMm: number, baseH: number, facadeW: number,
): THREE.BufferGeometry {
  if (zoneType === 'rect' || zoneType === 'sq') {
    const geo = new THREE.BoxGeometry(wMm + facadeW * 2, baseH, dMm + facadeW * 2);
    geo.translate(0, baseH / 2, 0);
    return geo;
  }
  const shape = new THREE.Shape();
  if (zoneType === 'circ') {
    const rx = wMm / 2 + facadeW, rz = dMm / 2 + facadeW;
    for (let i = 0; i <= 64; i++) {
      const a = i / 64 * Math.PI * 2;
      if (i === 0) shape.moveTo(Math.cos(a)*rx, Math.sin(a)*rz);
      else         shape.lineTo(Math.cos(a)*rx, Math.sin(a)*rz);
    }
  } else {
    shape.moveTo(modelPts[0][0], modelPts[0][1]);
    for (let i = 1; i < modelPts.length; i++) shape.lineTo(modelPts[i][0], modelPts[i][1]);
    shape.closePath();
  }
  const geo = new THREE.ExtrudeGeometry(shape, { depth: baseH, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/* ══════════════════════════════════════════════
   FACADES
══════════════════════════════════════════════ */
function buildFacades(
  modelPts: Array<[number, number]>, zoneType: string,
  wMm: number, dMm: number, facadeW: number,
  flatFacade: boolean, totalH: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number, baseH: number, elevScaleMm: number,
): THREE.Mesh[] {
  const terrainAt = (x: number, z: number): number => {
    const u = Math.max(0, Math.min(1, (x + wMm/2) / wMm));
    const v = Math.max(0, Math.min(1, (z + dMm/2) / dMm));
    const gx = u*(G-1), gy = v*(G-1);
    const gi = Math.min(G-2, Math.floor(gx)), gj = Math.min(G-2, Math.floor(gy));
    const fx = gx-gi, fy = gy-gj;
    const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
            + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
    return baseH + ((e-minE)/elevRange)*elevScaleMm;
  };

  if (zoneType === 'rect' || zoneType === 'sq') {
    return flatFacade
      ? buildFlatRectFacades(wMm, dMm, facadeW, totalH)
      : buildProfileRectFacades(wMm, dMm, facadeW, G, grid, minE, elevRange, baseH, elevScaleMm);
  }
  const elevAt = flatFacade ? () => totalH : terrainAt;
  return buildPolygonFacades(modelPts, facadeW, elevAt);
}

function buildFlatRectFacades(wMm: number, dMm: number, facadeW: number, totalH: number): THREE.Mesh[] {
  const box = (w: number, h: number, dp: number, x: number, z: number) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, dp));
    m.position.set(x, h / 2, z); return m;
  };
  return [
    box(wMm + facadeW*2, totalH, facadeW, 0,              dMm/2 + facadeW/2),
    box(wMm + facadeW*2, totalH, facadeW, 0,             -dMm/2 - facadeW/2),
    box(facadeW,         totalH, dMm,     wMm/2 + facadeW/2, 0),
    box(facadeW,         totalH, dMm,    -wMm/2 - facadeW/2, 0),
  ];
}

function buildProfileRectFacades(
  wMm: number, dMm: number, facadeW: number,
  G: number, grid: Float32Array, minE: number, elevRange: number,
  baseH: number, elevScaleMm: number,
): THREE.Mesh[] {
  const h = (ix: number, iy: number) =>
    baseH + ((grid[iy*G + ix] - minE) / elevRange) * elevScaleMm;
  // Corner heights
  const hSW = h(0, G-1), hSE = h(G-1, G-1);
  const hNW = h(0, 0),   hNE = h(G-1, 0);
  // South/north walls extended by facadeW on each side to fill corners
  const southPts: [number,number,number][] = [
    [-wMm/2 - facadeW, dMm/2, hSW],
    ...Array.from({length:G}, (_,i) => [-wMm/2+i/(G-1)*wMm, dMm/2, h(i,G-1)] as [number,number,number]),
    [ wMm/2 + facadeW, dMm/2, hSE],
  ];
  const northPts: [number,number,number][] = [
    [ wMm/2 + facadeW, -dMm/2, hNE],
    ...Array.from({length:G}, (_,i) => [wMm/2-i/(G-1)*wMm, -dMm/2, h(G-1-i, 0)] as [number,number,number]),
    [-wMm/2 - facadeW, -dMm/2, hNW],
  ];
  return [
    buildEdgeWall(southPts, [0,0,1], facadeW),
    buildEdgeWall(northPts, [0,0,-1], facadeW),
    buildEdgeWall(Array.from({length:G},(_,j)=>[ wMm/2, dMm/2-j/(G-1)*dMm, h(G-1,G-1-j)] as [number,number,number]), [1,0,0],  facadeW),
    buildEdgeWall(Array.from({length:G},(_,j)=>[-wMm/2,-dMm/2+j/(G-1)*dMm, h(0,j)] as [number,number,number]),       [-1,0,0], facadeW),
  ];
}

function buildPolygonFacades(
  modelPts: Array<[number, number]>, facadeW: number,
  elevAt: (x: number, z: number) => number,
): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];
  const n = modelPts.length;
  for (let i = 0; i < n; i++) {
    const [ax, az] = modelPts[i], [bx, bz] = modelPts[(i+1)%n];
    const dx = bx-ax, dz = bz-az, len = Math.sqrt(dx*dx+dz*dz);
    if (len < 0.5) continue;
    const nx = dz/len, nz = -dx/len;
    const S2 = Math.max(2, Math.round(len/3));
    const profile: [number, number, number][] = [];
    for (let k = 0; k <= S2; k++) {
      const t = k/S2;
      const px = ax+dx*t, pz = az+dz*t;
      profile.push([px, pz, elevAt(px, pz)]);
    }
    meshes.push(buildEdgeWall(profile, [nx,0,nz], facadeW));
  }
  return meshes;
}

function buildEdgeWall(
  profile: [number, number, number][],
  outward: [number, number, number],
  facadeW: number,
): THREE.Mesh {
  const n = profile.length;
  const [nx,,nz] = outward;
  const verts: number[] = [];
  const idx: number[] = [];

  // Each group: n*2 vertices (bottom+top pair per profile point)
  for (const [x, z, y] of profile) {  // outer
    verts.push(x+nx*facadeW, 0, z+nz*facadeW);
    verts.push(x+nx*facadeW, y, z+nz*facadeW);
  }
  for (const [x, z, y] of profile) {  // inner
    verts.push(x, 0, z); verts.push(x, y, z);
  }
  for (const [x, z, y] of profile) {  // top cap
    verts.push(x+nx*facadeW, y, z+nz*facadeW); verts.push(x, y, z);
  }
  for (const [x, z] of profile) {     // bottom cap
    verts.push(x+nx*facadeW, 0, z+nz*facadeW); verts.push(x, 0, z);
  }

  const O=0, I=n*2, T=n*4, B=n*6;
  for (let i = 0; i < n-1; i++) {
    const k = i*2;
    idx.push(O+k,O+k+2,O+k+1, O+k+1,O+k+2,O+k+3);
    idx.push(I+k,I+k+1,I+k+2, I+k+1,I+k+3,I+k+2);
    idx.push(T+k,T+k+1,T+k+2, T+k+1,T+k+3,T+k+2);
    idx.push(B+k,B+k+2,B+k+1, B+k+1,B+k+2,B+k+3);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo);
}

/* ══════════════════════════════════════════════
   GPX TRACE
══════════════════════════════════════════════ */
function buildGpxLine(
  pts: LatLon[], bounds: LatLonBounds,
  wMm: number, dMm: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number, baseH: number, elevScaleMm: number,
): THREE.Line | null {
  const verts: THREE.Vector3[] = [];
  for (const pt of pts) {
    const u = (pt.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon);
    const v = (pt.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
    if (u < 0 || u > 1 || v < 0 || v > 1) continue;
    const x = (u-0.5)*wMm, z = (0.5-v)*dMm;
    const gx = u*(G-1), gv = (1-v)*(G-1);
    const gi = Math.min(G-2, Math.floor(gx)), gj = Math.min(G-2, Math.floor(gv));
    const fx = gx-gi, fy = gv-gj;
    const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
            + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
    verts.push(new THREE.Vector3(x, baseH+((e-minE)/elevRange)*elevScaleMm+1, z));
  }
  if (verts.length < 2) return null;
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(verts),
    new THREE.LineBasicMaterial({ color: 0xff4500 }),
  );
}

/* ══════════════════════════════════════════════
   HYPSOMETRIC COLORING
══════════════════════════════════════════════ */
type RGB = [number, number, number];
function lerp3(a: RGB, b: RGB, t: number): RGB {
  return [Math.round(a[0]+(b[0]-a[0])*t), Math.round(a[1]+(b[1]-a[1])*t), Math.round(a[2]+(b[2]-a[2])*t)];
}
function hexToRgb(hex: string): RGB {
  const c = parseInt(hex.replace('#', ''), 16);
  return [(c >> 16) & 0xff, (c >> 8) & 0xff, c & 0xff];
}

function hypso(t: number): RGB {
  // Fixed naturalistic stops (variation visible même sans données OSM)
  // tinted 40% toward slot 1 (Terrain nu) so the user's color choice has an effect
  const [sr, sg, sb] = hexToRgb(colorSlots[1]);
  const base: [number, RGB][] = [
    [0.00, [0x78, 0x8c, 0x5c]],  // bas: vert sombre
    [0.18, [0x9a, 0x98, 0x68]],  // plaine: olive
    [0.38, [0xb0, 0xa0, 0x72]],  // transition: beige-vert
    [0.58, [0xb8, 0xa8, 0x78]],  // mi-hauteur: beige
    [0.74, [0xaa, 0x96, 0x70]],  // rocheux: brun
    [0.88, [0xb4, 0xa8, 0x90]],  // haute altitude: gris-beige
    [1.00, [0xd8, 0xd0, 0xc0]],  // sommets: quasi blanc
  ];
  // Blend 60% natural + 40% slot 1 tint
  const stops: [number, RGB][] = base.map(([pos, [r, g, b]]) => [
    pos,
    [Math.round(r*0.6 + sr*0.4), Math.round(g*0.6 + sg*0.4), Math.round(b*0.6 + sb*0.4)] as RGB,
  ]);
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const f = (t-stops[i-1][0]) / (stops[i][0]-stops[i-1][0]);
      return lerp3(stops[i-1][1], stops[i][1], f);
    }
  }
  return stops[stops.length-1][1];
}

/* ══════════════════════════════════════════════
   ELEVATION WORKER
══════════════════════════════════════════════ */
async function loadElevation(bounds: LatLonBounds) {
  return new Promise<{ grid: Float32Array; minE: number; elevRange: number; bounds: LatLonBounds }>(
    (resolve, reject) => {
      const w = new Worker(new URL('../workers/terrain.worker.ts', import.meta.url), { type: 'module' });
      w.onmessage = (e) => {
        if (e.data.type === 'TERRAIN_READY') {
          w.terminate();
          resolve({ grid: e.data.elevGrid, minE: e.data.minE, elevRange: e.data.elevRange, bounds });
        } else if (e.data.type === 'ERROR') {
          w.terminate(); reject(new Error(e.data.message));
        }
      };
      w.onerror = err => { w.terminate(); reject(err); };
      w.postMessage({ type: 'BUILD_TERRAIN', bounds, GRID: PREVIEW_GRID, elevZoom: 12 });
    },
  );
}

/* ══════════════════════════════════════════════
   SCENE UTILS
══════════════════════════════════════════════ */
function add(o: THREE.Object3D): void { scene!.add(o); sceneObjs.push(o); }
function txt(id: string, t: string): void { const el = document.getElementById(id); if (el) el.textContent = t; }
function clearScene(): void {
  sceneObjs.forEach(o => { scene!.remove(o); (o as THREE.Mesh).geometry?.dispose(); });
  sceneObjs = []; lblAnchors.length = 0;
}
function tickLabels(): void {
  if (!camera || !renderer) return;
  const W = renderer.domElement.clientWidth, H = renderer.domElement.clientHeight;
  if (!W || !H) return;
  for (const { id, v } of lblAnchors) {
    const el = document.getElementById(id);
    if (!el) continue;
    const p = v.clone().project(camera);
    if (p.z > 1) { el.style.opacity = '0'; continue; }
    el.style.opacity = '1';
    el.style.left = `${(p.x+1)/2*W}px`;
    el.style.top  = `${-(p.y-1)/2*H}px`;
  }
}
