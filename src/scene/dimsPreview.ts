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
  gpx: true, gpx_line: true,
};

// Per-layer slot assignment overrides (layerId → slot number)
export const layerSlotOverrides: Record<string, number> = {};

// GPX line params (exposed for live updates)
export let gpxLineThickness   = 1.0; // multiples of wall width (0.42 mm)
export let gpxLineHeightOffset = 1;  // multiples of layer height (0.20 mm)

// User-placed markers (persist across rebuildScene)
let markerNextId = 0;
const placedMarkersData: Array<{ id: number; latFrac: number; lonFrac: number; shape: string; visible: boolean }> = [];
let markerMeshRefs: THREE.Object3D[] = [];

// Placement mode
let placementActive = false;
let pendingShape    = '';

// Last scene dims (needed to re-project markers after rebuild)
let lastW = 200, lastD = 200, lastBaseH = 2, lastElevScale = 1;

// Line layer OSM data (roads, rails, routes)
const lineLayerData: Record<string, GeoPoint[][]> = {};
export const lineLayerEnabled: Record<string, boolean> = {};
let lineMeshGroup: THREE.Object3D | null = null;
let cachedLineBoundsKey = '';

// Mesh references for live color updates
let terrainMeshRef: THREE.Mesh | null = null;
let baseMeshRef: THREE.Mesh | null = null;
let facadeMeshRefs: THREE.Mesh[] = [];
let gpxLineMeshRef: THREE.Object3D | null = null;
let dimsCanvas: HTMLCanvasElement | null = null;
let dimsTargetEl: HTMLElement | null = null;
let dimsResizeObs: ResizeObserver | null = null;
let dimsWantsVisible = false; // true when a 3D tab is active and canvas should be shown

const PREVIEW_GRID = 256;
const TEX_SIZE = 2048; // high-res for precise zone boundaries

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
   Canvas stays fixed in the DOM; JS positions it over the target element.
══════════════════════════════════════════════ */

/** Returns true when the rect was valid and styles were applied */
function applyCanvasRect(): boolean {
  if (!dimsCanvas || !dimsTargetEl) return false;
  const rect = dimsTargetEl.getBoundingClientRect();
  if (!rect.width || !rect.height) return false;
  dimsCanvas.style.left   = `${rect.left}px`;
  dimsCanvas.style.top    = `${rect.top}px`;
  dimsCanvas.style.width  = `${rect.width}px`;
  dimsCanvas.style.height = `${rect.height}px`;
  if (renderer) {
    renderer.setSize(rect.width, rect.height, false);
    camera!.aspect = rect.width / rect.height;
    camera!.updateProjectionMatrix();
  }
  return true;
}

/** Called by ResizeObserver / window resize */
function onTargetResize(): void {
  if (!dimsCanvas || !dimsWantsVisible) return;
  const ok = applyCanvasRect();
  // If the canvas was hidden because initial rect was 0, show it now that dimensions are valid
  if (ok && dimsCanvas.style.display === 'none') dimsCanvas.style.display = 'block';
}

export function initDimsRenderer(viewEl: HTMLElement): void {
  if (!dimsCanvas) {
    dimsCanvas = document.getElementById('dims-canvas') as HTMLCanvasElement;
  }

  // Swap ResizeObserver to track the new target element
  if (dimsTargetEl !== viewEl) {
    if (dimsResizeObs && dimsTargetEl) dimsResizeObs.unobserve(dimsTargetEl);
    dimsTargetEl = viewEl;
    if (!dimsResizeObs) {
      dimsResizeObs = new ResizeObserver(onTargetResize);
      window.addEventListener('resize', onTargetResize);
    }
    dimsResizeObs.observe(viewEl);
  }

  // Signal intent to show — ResizeObserver will reveal canvas when dimensions become valid
  dimsWantsVisible = true;
  if (applyCanvasRect() && dimsCanvas) dimsCanvas.style.display = 'block';

  if (renderer) return;  // already initialised — position was already applied above

  const rect = viewEl.getBoundingClientRect();
  const W = rect.width || 800, H = rect.height || 600;

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
}

/** Hide the shared canvas (call when switching away from a 3D tab) */
export function detachDimsCanvas(): void {
  dimsWantsVisible = false;
  if (dimsCanvas) dimsCanvas.style.display = 'none';
}

/** @deprecated use initDimsRenderer — kept to avoid breaking any lingering calls */
export function reattachDimsCanvas(viewEl: HTMLElement): void { initDimsRenderer(viewEl); }

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
  // Update base and facade colors via their respective slot overrides
  const baseSlot = layerSlotOverrides['base'] ?? 1;
  if (baseMeshRef) {
    (baseMeshRef.material as THREE.MeshLambertMaterial).color.set(colorSlots[baseSlot] ?? colorSlots[1]);
  }
  const facadeSlot = layerSlotOverrides['facade'] ?? 1;
  const facadeColor = new THREE.Color(colorSlots[facadeSlot] ?? colorSlots[1]);
  for (const m of facadeMeshRefs) {
    (m.material as THREE.MeshLambertMaterial).color.set(facadeColor);
  }
  // Update GPX line color and visibility
  if (gpxLineMeshRef) {
    const gpxSlot = layerSlotOverrides['gpx_line'] ?? 6;
    const gpxCol = colorSlots[gpxSlot] ?? '#ff4500';
    gpxLineMeshRef.traverse(child => {
      const mat = (child as THREE.Mesh).material as any;
      if (mat?.color) mat.color.set(gpxCol);
    });
    gpxLineMeshRef.visible = layerVisible['gpx_line'] ?? true;
  }
  // Update user marker colors
  const markerSlot = layerSlotOverrides['gpx'] ?? 6;
  const markerCol = colorSlots[markerSlot] ?? '#ff4500';
  for (const g of markerMeshRefs) {
    g.traverse(child => {
      const mat = (child as THREE.Mesh).material as any;
      if (mat?.color) mat.color.set(markerCol);
    });
  }
}

/** Assign a layer to a different color slot and immediately refresh the 3D preview */
export function setLayerSlot(layerId: string, slot: number): void {
  layerSlotOverrides[layerId] = slot;
  updateColorSlots({});
}

/** Toggle visibility of a layer; GPX layers update meshes directly, OSM layers rebuild the texture */
export function setLayerVisible(id: string, visible: boolean): void {
  layerVisible[id] = visible;
  if (id === 'gpx_line') {
    if (gpxLineMeshRef) gpxLineMeshRef.visible = visible;
  } else if (id === 'gpx') {
    for (const g of markerMeshRefs) g.visible = visible;
  } else {
    updateColorSlots({});
  }
}

/** Set GPX line display params and mark for rebuild */
export function setGpxLineParams(thickness: number, heightOffset: number): void {
  gpxLineThickness    = thickness;
  gpxLineHeightOffset = heightOffset;
}

/** Marker placement mode — controls stay enabled so the user can still pan/rotate; placement fires on genuine click (no drag) */
export function startMarkerPlacement(shape: string): void {
  placementActive = true;
  pendingShape    = shape;
  if (dimsCanvas) dimsCanvas.style.cursor = 'crosshair';
}
export function cancelMarkerPlacement(): void {
  placementActive = false;
  pendingShape    = '';
  if (dimsCanvas) dimsCanvas.style.cursor = '';
}
export function isPlacementActive(): boolean { return placementActive; }

/** Raycast canvas click → place marker on terrain surface; returns placed marker id or -1 */
export function handleCanvasClick(clientX: number, clientY: number): number {
  if (!placementActive || !scene || !camera || !terrainMeshRef || !dimsCanvas) return -1;
  const rect = dimsCanvas.getBoundingClientRect();
  const ndcX =  ((clientX - rect.left) / rect.width)  * 2 - 1;
  const ndcY = -((clientY - rect.top)  / rect.height) * 2 + 1;
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
  const hits = raycaster.intersectObject(terrainMeshRef);
  let placedId = -1;
  if (hits.length > 0) {
    const pt = hits[0].point;
    const latFrac = 0.5 - pt.z / lastD;
    const lonFrac = 0.5 + pt.x / lastW;
    const id = markerNextId++;
    placedMarkersData.push({ id, latFrac, lonFrac, shape: pendingShape, visible: true });
    spawnMarkerMesh(latFrac, lonFrac, pendingShape);
    placedId = id;
  }
  cancelMarkerPlacement();
  return placedId;
}
export function getPlacedMarkers(): Array<{ id: number; shape: string; visible: boolean }> {
  return placedMarkersData.map(m => ({ id: m.id, shape: m.shape, visible: m.visible }));
}
export function setMarkerVisible(id: number, visible: boolean): void {
  const idx = placedMarkersData.findIndex(m => m.id === id);
  if (idx < 0) return;
  placedMarkersData[idx].visible = visible;
  if (markerMeshRefs[idx]) markerMeshRefs[idx].visible = visible;
}
export function deleteMarker(id: number): void {
  const idx = placedMarkersData.findIndex(m => m.id === id);
  if (idx < 0) return;
  placedMarkersData.splice(idx, 1);
  const mesh = markerMeshRefs.splice(idx, 1)[0];
  if (mesh) {
    scene?.remove(mesh);
    const si = sceneObjs.indexOf(mesh);
    if (si >= 0) sceneObjs.splice(si, 1);
  }
}
export function clearUserMarkers(): void {
  placedMarkersData.length = 0;
  for (const g of markerMeshRefs) {
    scene?.remove(g);
    const si = sceneObjs.indexOf(g);
    if (si >= 0) sceneObjs.splice(si, 1);
  }
  markerMeshRefs = [];
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
  baseMeshRef = null;
  facadeMeshRefs = [];
  gpxLineMeshRef = null;
  lineMeshGroup = null;
  markerMeshRefs = [];

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
  const baseSlot = layerSlotOverrides['base'] ?? 1;
  const baseColor = new THREE.Color(colorSlots[baseSlot] ?? colorSlots[1]);
  const bm = new THREE.Mesh(
    buildBaseGeo(modelPts, zoneType, wMm, dMm, baseH, facadeW),
    new THREE.MeshLambertMaterial({
      color: baseColor,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    }),
  );
  baseMeshRef = bm;
  add(bm);

  // ── Facades ───────────────────────────────────────────
  const facadeSlot = layerSlotOverrides['facade'] ?? 1;
  const facadeColor = new THREE.Color(colorSlots[facadeSlot] ?? colorSlots[1]);
  const facadeMat = new THREE.MeshLambertMaterial({ color: facadeColor, side: THREE.DoubleSide });
  for (const m of buildFacades(modelPts, zoneType, wMm, dMm, facadeW, flatFacade, totalH, grid, G, minE, elevRange, baseH, elevScaleMm)) {
    m.material = facadeMat;
    facadeMeshRefs.push(m);
    add(m);
  }

  // ── GPX ───────────────────────────────────────────────
  if (gpxPoints.length >= 2) {
    const ln = buildGpxLine(gpxPoints, rb, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm);
    if (ln) {
      ln.visible = layerVisible['gpx_line'] ?? true;
      gpxLineMeshRef = ln;
      add(ln);
    }
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

  // ── Placed markers ────────────────────────────────────
  lastW = wMm; lastD = dMm; lastBaseH = baseH; lastElevScale = elevScaleMm;
  for (const md of placedMarkersData) {
    spawnMarkerMesh(md.latFrac, md.lonFrac, md.shape);
    // restore individual visibility state
    const mesh = markerMeshRefs[markerMeshRefs.length - 1];
    if (mesh) mesh.visible = md.visible;
  }

  // ── Line features overlay ─────────────────────────────
  rebuildLineMeshes();

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

function computeFeatureAreaM2(el: OSMEl, lonScale: number): number {
  const shoelace = (pts: GeoPoint[]) => {
    if (pts.length < 3) return 0;
    let area = 0;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      area += (pts[j].lon + pts[i].lon) * (pts[j].lat - pts[i].lat);
    }
    return Math.abs(area) / 2 * (lonScale * 111320) * 111320;
  };
  if (el.type === 'way' && el.geometry) return shoelace(el.geometry);
  if (el.type === 'relation' && el.members) {
    return el.members
      .filter(m => m.role === 'outer' && m.geometry)
      .reduce((s, m) => s + shoelace(m.geometry!), 0);
  }
  return 0;
}

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

  // Step 2 — draw each OSM layer in order, filtered by size slider
  const filterSlider = document.getElementById('cp-filter') as HTMLInputElement | null;
  const filterVal = filterSlider ? Number(filterSlider.value) : 100; // 0=strict, 100=all
  const lonScale = Math.cos((bounds.minLat + bounds.maxLat) / 2 * Math.PI / 180);
  const boundsAreaM2 = (bounds.maxLon - bounds.minLon) * lonScale * 111320
                     * (bounds.maxLat - bounds.minLat) * 111320;
  // At slider=0: keep only features ≥ 2% of bounds area. At slider=100: keep all.
  const minAreaM2 = Math.pow(1 - filterVal / 100, 2) * 0.02 * boundsAreaM2;

  for (const layer of ZONE_LAYERS) {
    if (!layerVisible[layer.id]) continue;
    const layerEls = features.filter(el => {
      if (!el.tags || !layer.match(el.tags)) return false;
      if (!layer.fill || minAreaM2 <= 0) return true; // don't filter lines by area
      return computeFeatureAreaM2(el, lonScale) >= minAreaM2;
    });
    if (!layerEls.length) continue;

    const effectiveSlot = layerSlotOverrides[layer.id] ?? layer.slot;
    const col = colorSlots[effectiveSlot] ?? '#888';

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
  // Subsample to at most 64 segments to avoid "comb" artifact from 256 thin panels
  const SEG = Math.min(G - 1, 64);
  const si = (k: number) => Math.round(k / SEG * (G - 1)); // sample index in [0,G-1]

  const hSW = h(0, G-1), hSE = h(G-1, G-1);
  const hNW = h(0, 0),   hNE = h(G-1, 0);

  const southPts: [number,number,number][] = [
    [-wMm/2 - facadeW, dMm/2, hSW],
    ...Array.from({length: SEG + 1}, (_, k) => { const i = si(k); return [-wMm/2+i/(G-1)*wMm, dMm/2, h(i, G-1)] as [number,number,number]; }),
    [ wMm/2 + facadeW, dMm/2, hSE],
  ];
  const northPts: [number,number,number][] = [
    [ wMm/2 + facadeW, -dMm/2, hNE],
    ...Array.from({length: SEG + 1}, (_, k) => { const i = si(k); return [wMm/2-i/(G-1)*wMm, -dMm/2, h(G-1-i, 0)] as [number,number,number]; }),
    [-wMm/2 - facadeW, -dMm/2, hNW],
  ];
  return [
    buildEdgeWall(southPts, [0,0,1], facadeW),
    buildEdgeWall(northPts, [0,0,-1], facadeW),
    buildEdgeWall(Array.from({length: SEG + 1}, (_, k) => { const j = si(k); return [ wMm/2, dMm/2-j/(G-1)*dMm, h(G-1, G-1-j)] as [number,number,number]; }), [1,0,0],  facadeW),
    buildEdgeWall(Array.from({length: SEG + 1}, (_, k) => { const j = si(k); return [-wMm/2,-dMm/2+j/(G-1)*dMm, h(0, j)] as [number,number,number]; }),         [-1,0,0], facadeW),
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
/* ══════════════════════════════════════════════
   LINE LAYER (roads, rails, routes)
══════════════════════════════════════════════ */
export async function fetchAndStoreLineFeatures(bounds: LatLonBounds): Promise<void> {
  const key = `${bounds.minLat}|${bounds.maxLat}|${bounds.minLon}|${bounds.maxLon}`;
  if (key === cachedLineBoundsKey) return;

  const bb = `(${bounds.minLat},${bounds.minLon},${bounds.maxLat},${bounds.maxLon})`;
  const query = `[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${bb};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${bb};
  way["piste:type"]${bb};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${bb};
);
out geom;`;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 45000);
  let data: { elements: Array<{ type: string; tags?: Record<string,string>; geometry?: GeoPoint[]; members?: OSMMember[] }> };
  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      { signal: ctrl.signal },
    );
    clearTimeout(timer);
    data = await res.json();
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }

  // Clear previous data
  for (const k of Object.keys(lineLayerData)) delete lineLayerData[k];

  const push = (cat: string, coords: GeoPoint[]) => {
    if (!lineLayerData[cat]) lineLayerData[cat] = [];
    lineLayerData[cat].push(coords);
  };

  for (const el of data.elements) {
    if (el.type === 'way') {
      const tags = el.tags ?? {};
      const geom = el.geometry ?? [];
      if (geom.length < 2) continue;

      if (tags.highway) {
        const hw: Record<string,string> = {
          motorway:'road_motorway', motorway_link:'road_motorway',
          trunk:'road_trunk', trunk_link:'road_trunk',
          primary:'road_primary', primary_link:'road_primary',
          secondary:'road_secondary', secondary_link:'road_secondary',
          tertiary:'road_tertiary', tertiary_link:'road_tertiary',
          unclassified:'road_unclassified',
          living_street:'street_living',
          residential:'street_residential',
        };
        const cat = hw[tags.highway];
        if (cat) push(cat, geom);
      }
      if (tags.railway) {
        const rw: Record<string,string> = {
          narrow_gauge:'rail_narrow', rail:'rail_standard',
          light_rail:'rail_light', funicular:'rail_funicular',
          monorail:'rail_monorail', tram:'rail_tram', subway:'rail_subway',
        };
        push(rw[tags.railway] ?? 'rail_unknown', geom);
      }
      if (tags['piste:type']) {
        const dm: Record<string,string> = {
          easy:'piste_easy', novice:'piste_novice', intermediate:'piste_intermediate',
          advanced:'piste_advanced', expert:'piste_expert', freeride:'piste_freeride',
        };
        push(dm[tags['piste:difficulty'] ?? ''] ?? 'piste_other', geom);
      }
    } else if (el.type === 'relation') {
      const tags = el.tags ?? {};
      const route = tags.route ?? '';
      const net   = tags.network ?? '';
      const segs  = (el.members ?? []).filter(m => m.type === 'way' && (m.geometry?.length ?? 0) >= 2).map(m => m.geometry!);
      if (!segs.length) continue;

      const routeNetMap: Record<string, Record<string,string>> = {
        hiking: { iwn:'hiking_iwn', nwn:'hiking_nwn', rwn:'hiking_rwn', lwn:'hiking_lwn' },
        foot:   { iwn:'hiking_iwn', nwn:'hiking_nwn', rwn:'hiking_rwn', lwn:'hiking_lwn' },
        bicycle:{ icn:'cycling_icn', ncn:'cycling_ncn', rcn:'cycling_rcn', lcn:'cycling_lcn' },
        mtb:    { '':'mtb_local' },
        horse:  { ihwn:'equestrian_iwn', nhwn:'equestrian_nwn', rhwn:'equestrian_rwn', lhwn:'equestrian_lwn' },
      };
      const netMap = routeNetMap[route];
      if (!netMap) continue;

      let cat: string;
      if (route === 'mtb') {
        const scale = tags['mtb:scale'] ?? '';
        cat = scale ? `mtb_${scale}` : 'mtb_local';
      } else {
        cat = netMap[net] ?? Object.values(netMap).at(-1)!;
      }
      for (const seg of segs) push(cat, seg);
    }
  }

  cachedLineBoundsKey = key;
  rebuildLineMeshes();
}

export function setLineCategoryEnabled(cat: string, enabled: boolean): void {
  lineLayerEnabled[cat] = enabled;
  rebuildLineMeshes();
}

function rebuildLineMeshes(): void {
  if (lineMeshGroup) {
    scene?.remove(lineMeshGroup);
    const si = sceneObjs.indexOf(lineMeshGroup);
    if (si >= 0) sceneObjs.splice(si, 1);
    lineMeshGroup = null;
  }
  if (!cachedElev || !scene) return;

  const { grid, minE, elevRange, bounds } = cachedElev;
  const G = PREVIEW_GRID;
  const wMm = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;

  const group = new THREE.Group();

  for (const [cat, segments] of Object.entries(lineLayerData)) {
    if (lineLayerEnabled[cat] === false) continue;
    const col = lineCatColor(cat);
    const mat = new THREE.LineBasicMaterial({ color: col });

    for (const geom of segments) {
      const verts: THREE.Vector3[] = [];
      for (const pt of geom) {
        const u = (pt.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon);
        const v = (pt.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
        if (u < 0 || u > 1 || v < 0 || v > 1) continue;
        const x = (u - 0.5) * wMm, z = (0.5 - v) * dMm;
        const gx = u*(G-1), gv = (1-v)*(G-1);
        const gi = Math.min(G-2, Math.floor(gx)), gj = Math.min(G-2, Math.floor(gv));
        const fx = gx-gi, fy = gv-gj;
        const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
                + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
        verts.push(new THREE.Vector3(x, baseH + ((e - minE) / elevRange) * elevScaleMm + 0.6, z));
      }
      if (verts.length >= 2) {
        group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(verts), mat));
      }
    }
  }

  if (group.children.length > 0) {
    scene.add(group); sceneObjs.push(group); lineMeshGroup = group;
  }
}

function lineCatColor(cat: string): number {
  if (cat.startsWith('road_motorway'))  return 0xe2231a;
  if (cat.startsWith('road_trunk'))     return 0xe5821e;
  if (cat.startsWith('road_primary'))   return 0xf5d327;
  if (cat.startsWith('road_secondary')) return 0xd4e228;
  if (cat.startsWith('road_tertiary'))  return 0xaaaaaa;
  if (cat.startsWith('road_'))          return 0xcccccc;
  if (cat.startsWith('street_'))        return 0xdddddd;
  if (cat.startsWith('rail_'))          return 0x555577;
  if (cat.startsWith('hiking_'))        return 0xff6600;
  if (cat.startsWith('cycling_'))       return 0x0066cc;
  if (cat.startsWith('mtb_'))           return 0x884400;
  if (cat.startsWith('equestrian_'))    return 0x996633;
  if (cat.startsWith('piste_easy'))     return 0x00aaff;
  if (cat.startsWith('piste_novice'))   return 0x00cc44;
  if (cat.startsWith('piste_intermediate')) return 0xcc2222;
  if (cat.startsWith('piste_'))         return 0x222222;
  return 0x888888;
}

/** Build a 3D marker mesh at fractional lat/lon position on current terrain */
function buildMarkerShape(shape: string, r: number): THREE.Shape {
  const s = new THREE.Shape();
  switch (shape) {
    case 'square':
      s.moveTo(-r, -r); s.lineTo(r, -r); s.lineTo(r, r); s.lineTo(-r, r); s.closePath();
      break;
    case 'diamond':
      s.moveTo(0, -r); s.lineTo(r * 0.72, 0); s.lineTo(0, r); s.lineTo(-r * 0.72, 0); s.closePath();
      break;
    case 'triangle':
      s.moveTo(0, r); s.lineTo(r * 0.866, -r * 0.5); s.lineTo(-r * 0.866, -r * 0.5); s.closePath();
      break;
    case 'cross': {
      const w = r * 0.32;
      s.moveTo(-w, -r); s.lineTo(w, -r); s.lineTo(w, -w);
      s.lineTo(r, -w); s.lineTo(r, w); s.lineTo(w, w);
      s.lineTo(w, r); s.lineTo(-w, r); s.lineTo(-w, w);
      s.lineTo(-r, w); s.lineTo(-r, -w); s.lineTo(-w, -w);
      s.closePath();
      break;
    }
    case 'heart': {
      s.moveTo(0, -r * 0.25);
      s.bezierCurveTo(-r * 0.05, -r * 0.55, -r, -r * 0.55, -r, r * 0.1);
      s.bezierCurveTo(-r, r * 0.65, -r * 0.45, r * 0.88, 0, r);
      s.bezierCurveTo(r * 0.45, r * 0.88, r, r * 0.65, r, r * 0.1);
      s.bezierCurveTo(r, -r * 0.55, r * 0.05, -r * 0.55, 0, -r * 0.25);
      s.closePath();
      break;
    }
    case 'star': {
      const outer = r, inner = r * 0.42;
      for (let i = 0; i < 10; i++) {
        const a = (i * Math.PI / 5) - Math.PI / 2;
        const rr = i % 2 === 0 ? outer : inner;
        const px = Math.cos(a) * rr, py = Math.sin(a) * rr;
        if (i === 0) s.moveTo(px, py); else s.lineTo(px, py);
      }
      s.closePath();
      break;
    }
    default: // circle
      s.absarc(0, 0, r, 0, Math.PI * 2, false);
      break;
  }
  return s;
}

function spawnMarkerMesh(latFrac: number, lonFrac: number, shape: string): void {
  if (!cachedElev || !scene) return;
  const { grid, minE, elevRange } = cachedElev;
  const G = PREVIEW_GRID;
  const wMm = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;

  const u = lonFrac, v = 1 - latFrac;
  const x = (u - 0.5) * wMm, z = (0.5 - (1 - v)) * dMm;
  const gx = Math.max(0, Math.min(G-2, u * (G - 1)));
  const gv2 = Math.max(0, Math.min(G-2, v * (G - 1)));
  const gi = Math.floor(gx), gj = Math.floor(gv2);
  const fx = gx - gi, fy = gv2 - gj;
  const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
          + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
  const yBase = baseH + ((e - minE) / elevRange) * elevScaleMm;

  const r = 4.5; // radius in mm — lies flat on terrain
  const markerSlot = layerSlotOverrides['gpx'] ?? 6;
  const col = colorSlots[markerSlot] ?? '#ff4500';
  const mat = new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide });

  const shapeObj = buildMarkerShape(shape, r);
  const geo = new THREE.ExtrudeGeometry(shapeObj, { depth: 0.5, bevelEnabled: false });
  // ExtrudeGeometry extrudes along Z; rotate so it lies flat on the XZ terrain plane
  geo.rotateX(-Math.PI / 2);

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, yBase + 0.25, z);
  mesh.visible = layerVisible['gpx'] ?? true;

  add(mesh);
  markerMeshRefs.push(mesh);
}

function buildGpxLine(
  pts: LatLon[], bounds: LatLonBounds,
  wMm: number, dMm: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number, baseH: number, elevScaleMm: number,
): THREE.Object3D | null {
  const verts: THREE.Vector3[] = [];
  for (const pt of pts) {
    // Clamp to bounds instead of skipping — avoids gaps when GPX extends slightly outside
    const u = Math.max(0.0005, Math.min(0.9995, (pt.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)));
    const v = Math.max(0.0005, Math.min(0.9995, (pt.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)));
    const x = (u - 0.5) * wMm, z = (0.5 - v) * dMm;
    const gx = u*(G-1), gv = (1-v)*(G-1);
    const gi = Math.min(G-2, Math.floor(gx)), gj = Math.min(G-2, Math.floor(gv));
    const fx = gx-gi, fy = gv-gj;
    const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
            + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
    const yLift = gpxLineHeightOffset * 0.2;
    const newPt = new THREE.Vector3(x, baseH + ((e - minE) / elevRange) * elevScaleMm + yLift, z);
    // Deduplicate very close points — prevents degenerate CatmullRomCurve3 tangents
    if (verts.length > 0 && newPt.distanceTo(verts[verts.length - 1]) < 0.08) continue;
    verts.push(newPt);
  }
  if (verts.length < 2) return null;

  const gpxSlot = layerSlotOverrides['gpx_line'] ?? 6;
  const col = colorSlots[gpxSlot] ?? '#ff4500';
  const tubRadius = gpxLineThickness * 0.21;

  if (tubRadius >= 0.1) {
    const curve = new THREE.CatmullRomCurve3(verts, false, 'centripetal');
    const segments = Math.min(1200, verts.length * 8);
    const geo = new THREE.TubeGeometry(curve, segments, tubRadius, 8, false);
    return new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ color: col }));
  }

  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(verts),
    new THREE.LineBasicMaterial({ color: col }),
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
  const terrainSlot = layerSlotOverrides['terrain'] ?? 1;
  const [r, g, b] = hexToRgb(colorSlots[terrainSlot] ?? colorSlots[1]);
  // Dark in valleys (×0.78), neutral at mid (×1.0), lighter at peaks (×1.22)
  const light = 0.78 + t * 0.44;
  return [
    Math.min(255, Math.round(r * light)),
    Math.min(255, Math.round(g * light)),
    Math.min(255, Math.round(b * light)),
  ];
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
