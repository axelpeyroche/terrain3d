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
let cachedRoadsKey = '';
let lastZonePoly: Array<[number, number]> | null = null;
let lastWorkGrid: Float32Array | null = null;

// Color slots 1-7 (Bambu-style filament colors)
export const colorSlots: Record<number, string> = {
  1: '#c0af88',  // Terrain nu + Façade
  2: '#e4eee8',  // Neige et glace
  3: '#8ab858',  // Végétation basse
  4: '#3a6828',  // Végétation dense
  5: '#4a88c0',  // Plans d'eau + Voies navigables
  6: '#ff4500',  // Marqueurs / GPX
  7: '#b8b8b8',  // Bâtiments
  8: '#262626',  // Routes
};

// Layer visibility
export const layerVisible: Record<string, boolean> = {
  veg_low: true, veg_dense: true, wetland: true,
  snow: true, water: true, waterways: true,
  gpx: true, gpx_line: true,
  river_polygons: true, barren: true,
  buildings: true,
  roads: true,
};

// Per-layer slot assignment overrides (layerId → slot number)
export const layerSlotOverrides: Record<string, number> = {};

// GPX line params (exposed for live updates)
export let gpxLineThickness   = 1.0; // multiples of wall width (0.42 mm)
export let gpxLineHeightOffset = 1;  // multiples of layer height (0.20 mm)

// User-placed markers (persist across rebuildScene)
let markerNextId = 0;
interface MarkerData {
  id: number; latFrac: number; lonFrac: number;
  shape: string; visible: boolean;
  diameterMult: number; rotDeg: number; flatTop: boolean; heightOffMult: number;
}
const placedMarkersData: MarkerData[] = [];
let markerMeshRefs: THREE.Object3D[] = [];
let buildingMeshRefs: THREE.Mesh[] = [];
let zoneMeshRefs: THREE.Mesh[] = [];
const markerMeshToId = new Map<THREE.Object3D, number>();
let selectedMarkerId = -1;

// Placement mode
let placementActive = false;
let pendingShape    = '';

// Last scene dims (needed to re-project markers after rebuild)
let lastW = 200, lastD = 200, lastBaseH = 2, lastElevScale = 1;

// Water body params
export let waterHeightOffset = -1;   // layers (negative = sinks below surface)
export let waterHydroFlatten = false;
export const waterFeaturesEnabled: Record<string, boolean> = {
  water_ocean: true, water_lake: true, water_pond: true,
  water_reservoir: true, water_wastewater: true, water_human: true, water_other: true,
};

// Waterway line params
export let waterwayLineWidth    = 1.0;   // multiplier on base stroke width
export let waterwayHeightOffset = -1;    // layers
export const waterwayFeaturesEnabled: Record<string, boolean> = {
  rivers: true, streams_named: true, streams_unnamed: true,
  river_polygons: true, canals: true, canal_polygons: true,
};

// Per-layer land cover feature states (each layer has independent feature toggles)
const LC_ALL_FALSE: Record<string, boolean> = {
  lc_forest: false, lc_forest_detailed: false,
  lc_scrub: false, lc_shrub: false,
  lc_grass: false, lc_grass_detailed: false, lc_crop: false, lc_moss: false,
  lc_wetland: false, lc_wetland_detailed: false, lc_mangrove: false,
  lc_barren: false, lc_desert: false, lc_sand: false, lc_rock: false,
  lc_snow: false, lc_glacier: false, lc_urban: false,
};
export const layerLCFeatures: Record<string, Record<string, boolean>> = {
  veg_dense:  { ...LC_ALL_FALSE, lc_forest: true, lc_forest_detailed: true, lc_shrub: true, lc_wetland: true, lc_wetland_detailed: true, lc_mangrove: true },
  veg_low:    { ...LC_ALL_FALSE, lc_scrub: true, lc_grass: true, lc_grass_detailed: true, lc_crop: true, lc_moss: true },
  wetland_lc: { ...LC_ALL_FALSE, lc_wetland: true, lc_wetland_detailed: true, lc_mangrove: true },
  snow_lc:    { ...LC_ALL_FALSE, lc_snow: true, lc_glacier: true },
  barren_lc:  { ...LC_ALL_FALSE, lc_barren: true, lc_desert: true, lc_sand: true, lc_rock: true, lc_urban: true },
};
export const layerLCHeightOffset: Record<string, number> = {
  veg_dense: 0, veg_low: 0, wetland_lc: 0, snow_lc: 0, barren_lc: 0,
};

// Buildings state
export let buildingFloorHeightMm = 0.20;
export let buildingHeightScale   = 1.0;
export let buildingSizeScale     = 1.0;
export let buildingMinHeightMm   = 0.60;
export let buildingMinSizeM2     = 1.0;
let cachedBuildings: OSMEl[] = [];
let cachedBuildingsKey = '';
export function setBuildingFloorHeight(h: number): void   { buildingFloorHeightMm = h; }
export function setBuildingHeightScale(v: number): void   { buildingHeightScale = v; }
export function setBuildingSizeScale(v: number): void     { buildingSizeScale = v; }
export function setBuildingMinHeight(v: number): void     { buildingMinHeightMm = v; }
export function setBuildingMinSize(v: number): void       { buildingMinSizeM2 = v; }

// Roads state
export let roadHeightMm    = 0.0;
export let roadMinWidthMm  = 0.5;
export let roadWidthMult   = 1.0;
export let roadStyle: 'raised' | 'recessed' = 'raised';
let cachedRoads: { hwType: string; geom: GeoPoint[] }[] = [];
let roadMeshGroup: THREE.Group | null = null;
export function setRoadHeight(v: number): void    { roadHeightMm   = v; }
export function setRoadMinWidth(v: number): void  { roadMinWidthMm = v; }
export function setRoadWidthMult(v: number): void { roadWidthMult  = v; }
export function setRoadStyle(s: 'raised' | 'recessed'): void { roadStyle = s; }
export function setLCFeatureEnabled(layerId: string, key: string, enabled: boolean): void {
  if (!layerLCFeatures[layerId]) return;
  layerLCFeatures[layerId][key] = enabled;
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
}
export function setLCHeightOffset(layerId: string, offset: number): void {
  layerLCHeightOffset[layerId] = offset;
}

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
const TEX_SIZE = 3072; // high-res for precise zone boundaries

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
  renderer.localClippingEnabled = true;

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
      lastW, lastD, lastElevScale, cachedRoads, cachedBuildings,
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
  // Update building colors
  const bldSlot = layerSlotOverrides['buildings'] ?? 7;
  const bldCol = new THREE.Color(colorSlots[bldSlot] ?? '#b8b8b8');
  for (const m of buildingMeshRefs) {
    (m.material as THREE.MeshLambertMaterial).color.set(bldCol);
  }
  // Update road colors
  const roadSlot = layerSlotOverrides['roads'] ?? 8;
  const roadCol = new THREE.Color(colorSlots[roadSlot] ?? '#262626');
  roadMeshGroup?.traverse(child => {
    const mat = (child as THREE.Mesh).material as THREE.MeshLambertMaterial;
    if (mat?.color) mat.color.set(roadCol);
  });
  // Update zone fill mesh colors
  for (const m of zoneMeshRefs) {
    const lid = (m as any).__zoneLayerId as string;
    const layer = ZONE_LAYERS.find(l => l.id === lid);
    if (!layer) continue;
    const slot = layerSlotOverrides[lid] ?? layer.slot;
    (m.material as THREE.MeshBasicMaterial).color.set(colorSlots[slot] ?? '#888');
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
  } else if (id === 'buildings') {
    for (const m of buildingMeshRefs) m.visible = visible;
    // also update texture footprints
    if (cachedElev) {
      if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
      cachedTexture = buildMapTexture(
        cachedElev.bounds, cachedElev.grid, PREVIEW_GRID,
        cachedElev.minE, cachedElev.elevRange, cachedFeatures,
        lastW, lastD, lastElevScale, cachedRoads, cachedBuildings,
      );
      if (terrainMeshRef) { (terrainMeshRef.material as THREE.MeshLambertMaterial).map = cachedTexture; (terrainMeshRef.material as THREE.MeshLambertMaterial).needsUpdate = true; }
    }
  } else if (id === 'roads') {
    if (roadMeshGroup) roadMeshGroup.visible = visible;
    // also update texture road lines
    if (cachedElev) {
      if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
      cachedTexture = buildMapTexture(
        cachedElev.bounds, cachedElev.grid, PREVIEW_GRID,
        cachedElev.minE, cachedElev.elevRange, cachedFeatures,
        lastW, lastD, lastElevScale, cachedRoads, cachedBuildings,
      );
      if (terrainMeshRef) { (terrainMeshRef.material as THREE.MeshLambertMaterial).map = cachedTexture; (terrainMeshRef.material as THREE.MeshLambertMaterial).needsUpdate = true; }
    }
  } else {
    // all OSM layers (zones + waterways) — rebuild texture
    if (cachedElev) {
      if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
      cachedTexture = buildMapTexture(
        cachedElev.bounds, cachedElev.grid, PREVIEW_GRID,
        cachedElev.minE, cachedElev.elevRange, cachedFeatures,
        lastW, lastD, lastElevScale, cachedRoads, cachedBuildings,
      );
      if (terrainMeshRef) {
        const mat = terrainMeshRef.material as THREE.MeshLambertMaterial;
        mat.map = cachedTexture;
        mat.needsUpdate = true;
      }
    }
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
    const md: MarkerData = { id, latFrac, lonFrac, shape: pendingShape, visible: true, diameterMult: 10, rotDeg: 0, flatTop: true, heightOffMult: 0 };
    placedMarkersData.push(md);
    spawnMarkerMeshFrom(md, placedMarkersData.length - 1);
    placedId = id;
  }
  cancelMarkerPlacement();
  return placedId;
}
export function getPlacedMarkers(): Array<{ id: number; shape: string; visible: boolean; diameterMult: number; rotDeg: number; flatTop: boolean; heightOffMult: number }> {
  return placedMarkersData.map(m => ({ id: m.id, shape: m.shape, visible: m.visible, diameterMult: m.diameterMult, rotDeg: m.rotDeg, flatTop: m.flatTop, heightOffMult: m.heightOffMult }));
}
export function getSelectedMarkerId(): number { return selectedMarkerId; }
export function selectMarker(id: number): void { selectedMarkerId = id; }
export function deselectMarker(): void { selectedMarkerId = -1; }

/** Raycast to pick a placed marker; returns its id or -1 */
export function pickMarkerAtCanvas(clientX: number, clientY: number): number {
  if (!scene || !camera || !dimsCanvas || markerMeshRefs.length === 0) return -1;
  const rect = dimsCanvas.getBoundingClientRect();
  const ndcX =  ((clientX - rect.left) / rect.width)  * 2 - 1;
  const ndcY = -((clientY - rect.top)  / rect.height) * 2 + 1;
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(ndcX, ndcY), camera);
  const hits = raycaster.intersectObjects(markerMeshRefs, true);
  if (!hits.length) return -1;
  // walk up to find the root mesh in markerMeshRefs
  let obj: THREE.Object3D | null = hits[0].object;
  while (obj) {
    const id = markerMeshToId.get(obj);
    if (id !== undefined) return id;
    obj = obj.parent;
  }
  return -1;
}

export function updateMarker(id: number, params: Partial<Pick<MarkerData, 'shape' | 'diameterMult' | 'rotDeg' | 'flatTop' | 'heightOffMult' | 'visible'>>): void {
  const idx = placedMarkersData.findIndex(m => m.id === id);
  if (idx < 0) return;
  Object.assign(placedMarkersData[idx], params);
  // Rebuild the mesh
  const oldMesh = markerMeshRefs[idx];
  if (oldMesh) {
    markerMeshToId.delete(oldMesh);
    scene?.remove(oldMesh);
    const si = sceneObjs.indexOf(oldMesh);
    if (si >= 0) sceneObjs.splice(si, 1);
    markerMeshRefs.splice(idx, 1);
  }
  // Re-insert at same position
  const md = placedMarkersData[idx];
  spawnMarkerMeshFrom(md, idx);
}

export function setMarkerVisible(id: number, visible: boolean): void {
  updateMarker(id, { visible });
}
export function deleteMarker(id: number): void {
  const idx = placedMarkersData.findIndex(m => m.id === id);
  if (idx < 0) return;
  placedMarkersData.splice(idx, 1);
  const mesh = markerMeshRefs.splice(idx, 1)[0];
  if (mesh) {
    markerMeshToId.delete(mesh);
    scene?.remove(mesh);
    const si = sceneObjs.indexOf(mesh);
    if (si >= 0) sceneObjs.splice(si, 1);
  }
  if (selectedMarkerId === id) selectedMarkerId = -1;
}
export function clearUserMarkers(): void {
  placedMarkersData.length = 0;
  for (const g of markerMeshRefs) {
    markerMeshToId.delete(g);
    scene?.remove(g);
    const si = sceneObjs.indexOf(g);
    if (si >= 0) sceneObjs.splice(si, 1);
  }
  markerMeshRefs = [];
  selectedMarkerId = -1;
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
  }

  // Fetch terrain features, buildings, and highways independently so each can fail
  // without blocking the others. Terrain + buildings run in parallel; highways after.
  const fetchNeeds = {
    features: key !== cachedFeaturesKey,
    buildings: key !== cachedBuildingsKey,
  };

  if (fetchNeeds.features || fetchNeeds.buildings) {
    onProgress(30, 'Chargement des données géographiques…');
    const { zoneFeatures, buildings, roads } = await fetchAllOSMFeatures(bounds);
    // Update caches if fetch returned any data (empty = failure or genuinely empty area)
    if (zoneFeatures.length > 0 || buildings.length > 0 || roads.length > 0) {
      cachedFeaturesKey = key;
      cachedBuildingsKey = key;
      cachedRoadsKey = key;
      if (zoneFeatures.length > 0) {
        cachedFeatures = zoneFeatures;
        if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
      }
      cachedBuildings = buildings;
      cachedRoads = roads;
    }
  }

  if (!cachedTexture && cachedElev) {
    onProgress(70, 'Génération de la texture…');
    const { wMm: tW, dMm: tD, exag: tEx } = settings;
    const rb0 = bounds;
    const cLat0 = (rb0.minLat + rb0.maxLat) / 2;
    const avgLen0 = Math.max(
      (rb0.maxLon - rb0.minLon) * Math.cos(cLat0 * Math.PI / 180) * 111320,
      (rb0.maxLat - rb0.minLat) * 111320,
    );
    const maxDim0 = Math.max(tW, tD);
    const esc0 = Math.max(1, Math.min(maxDim0 * 0.5, (cachedElev.elevRange / avgLen0) * maxDim0 * tEx));
    cachedTexture = buildMapTexture(
      bounds, cachedElev.grid, PREVIEW_GRID,
      cachedElev.minE, cachedElev.elevRange, cachedFeatures,
      tW, tD, esc0, cachedRoads, cachedBuildings,
    );
  } else if (!needFetch) {
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
  if (!scene || !camera || !controls || !cachedElev) return;
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

  // Rebuild texture if invalidated (water feature toggle, color change, etc.)
  if (!cachedTexture) {
    cachedTexture = buildMapTexture(rb, grid, PREVIEW_GRID, minE, elevRange, cachedFeatures, wMm, dMm, elevScaleMm, cachedRoads, cachedBuildings);
  }
  const totalH = baseH + elevScaleMm;

  const G = PREVIEW_GRID;
  const modelPts = zonePtsToModel(zonePts, zoneType, rb, wMm, dMm);
  lastZonePoly = modelPts;
  const facadeW = Math.max(1, facadeWidthMm);

  terrainMeshRef = null;
  baseMeshRef = null;
  facadeMeshRefs = [];
  gpxLineMeshRef = null;
  lineMeshGroup = null;
  markerMeshRefs = [];
  buildingMeshRefs = [];
  zoneMeshRefs = [];
  roadMeshGroup = null;

  // Set scene dims early so rebuildRoadMeshes / rebuildLineMeshes can use them
  lastW = wMm; lastD = dMm; lastBaseH = baseH; lastElevScale = elevScaleMm;

  // Apply water height offset + hydro-flatten to the elevation grid
  const layH = 0.20;
  const workGrid = applyWaterToGrid(grid, G, rb, cachedFeatures, elevRange, elevScaleMm, layH);
  lastWorkGrid = workGrid;

  // ── Terrain ───────────────────────────────────────────
  {
    const geo = new THREE.PlaneGeometry(wMm, dMm, G - 1, G - 1);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, baseH + ((workGrid[i] - minE) / elevRange) * elevScaleMm);
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
    const ln = buildGpxLine(gpxPoints, rb, wMm, dMm, workGrid, G, minE, elevRange, baseH, elevScaleMm);
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
  markerMeshToId.clear();
  for (let i = 0; i < placedMarkersData.length; i++) {
    spawnMarkerMeshFrom(placedMarkersData[i], i);
  }

  // ── Line features overlay ─────────────────────────────
  rebuildLineMeshes();

  // ── Roads ────────────────────────────────────────────
  try { rebuildRoadMeshes(); } catch (e) { console.warn('rebuildRoadMeshes failed:', e); }

  // ── Buildings ─────────────────────────────────────────
  if (cachedBuildings.length > 0) {
    const visible = layerVisible['buildings'] ?? true;
    for (const m of buildBuildingMeshes(
      cachedBuildings, rb, workGrid, G, minE, elevRange, wMm, dMm, baseH, elevScaleMm,
    )) {
      m.visible = visible;
      buildingMeshRefs.push(m);
      add(m);
    }
  }

  // ── Camera ────────────────────────────────────────────
  const diag = Math.sqrt(wMm * wMm + dMm * dMm);
  {
    // Always anchor rotation center to map center; reset camera on first load only
    const tgt = new THREE.Vector3(0, totalH * 0.3, 0);
    if (controls.target.lengthSq() < 0.1) {
      camera!.position.set(wMm * 0.7, totalH + diag * 0.44, dMm * 0.92);
      camera!.lookAt(tgt);
    }
    controls!.target.copy(tgt); controls!.update();
  }
}

export function resetDimsCamera(): void {
  if (controls) controls.target.set(0, 0, 0);
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
  if (cachedMask) { cachedMask.dispose(); cachedMask = null; }
  cachedZoneKey = '';
}

/* ══════════════════════════════════════════════
   SINGLE OSM FETCH — zones + buildings + routes en une requête
   Évite les rate-limits Overpass (max 2 concurrent) et les timeouts séquentiels.
══════════════════════════════════════════════ */
async function fetchAllOSMFeatures(bounds: LatLonBounds): Promise<{
  zoneFeatures: OSMEl[];
  buildings: OSMEl[];
  roads: { hwType: string; geom: GeoPoint[] }[];
}> {
  const empty = { zoneFeatures: [], buildings: [], roads: [] };
  const { minLat, minLon, maxLat, maxLon } = bounds;
  const bb = `(${minLat},${minLon},${maxLat},${maxLon})`;
  const HW = 'motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street';
  const query = `[out:json][timeout:60][maxsize:536870912];
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
  way["building"]${bb};
  relation["building"]["type"="multipolygon"]${bb};
  way["highway"~"^(${HW})$"]${bb};
);
out geom qt;`;

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 58000);
  try {
    const res = await fetch(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`,
      { signal: ctrl.signal },
    );
    clearTimeout(t);
    if (!res.ok) return empty;
    const elements: OSMEl[] = (await res.json()).elements ?? [];
    const zoneFeatures: OSMEl[] = [];
    const buildings: OSMEl[] = [];
    const roads: { hwType: string; geom: GeoPoint[] }[] = [];
    for (const el of elements) {
      const tags = el.tags;
      if (!tags) continue;
      if (tags.highway && el.type === 'way' && (el.geometry?.length ?? 0) >= 2) {
        roads.push({ hwType: tags.highway, geom: el.geometry! });
      } else if (tags.building) {
        buildings.push(el);
      } else {
        zoneFeatures.push(el);
      }
    }
    return { zoneFeatures, buildings, roads };
  } catch {
    clearTimeout(t);
    return empty;
  }
}

/** Ray-casting point-in-polygon test. poly is [[x,z]…] in model space (mm). */
function pointInZone(x: number, z: number, poly: Array<[number, number]>): boolean {
  let inside = false;
  const n = poly.length;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = poly[i][0], zi = poly[i][1];
    const xj = poly[j][0], zj = poly[j][1];
    if ((zi > z) !== (zj > z) && x < ((xj - xi) * (z - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

function buildBuildingMeshes(
  buildings: OSMEl[],
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  wMm: number, dMm: number,
  baseH: number, elevScaleMm: number,
): THREE.Mesh[] {
  const { minLat, maxLat, minLon, maxLon } = bounds;
  const color = new THREE.Color(colorSlots[layerSlotOverrides['buildings'] ?? 7] ?? '#888888');
  const clippingPlanes = [
    new THREE.Plane(new THREE.Vector3(-1, 0, 0), wMm / 2),
    new THREE.Plane(new THREE.Vector3(1, 0, 0), wMm / 2),
    new THREE.Plane(new THREE.Vector3(0, 0, -1), dMm / 2),
    new THREE.Plane(new THREE.Vector3(0, 0, 1), dMm / 2),
  ];
  const mat = new THREE.MeshLambertMaterial({ color, clippingPlanes });
  const meshes: THREE.Mesh[] = [];

  const cLat = (minLat + maxLat) / 2;
  const lonScale = Math.cos(cLat * Math.PI / 180);

  for (const el of buildings) {
    const polys = getOsmPolygons(el);
    if (!polys.length) continue;
    const outer = polys[0];
    if (outer.length < 3) continue;

    // Filter by real-world footprint area
    if (buildingMinSizeM2 > 0 && computeFeatureAreaM2(el, lonScale) < buildingMinSizeM2) continue;

    const levels = parseFloat(el.tags?.['building:levels'] ?? '2') || 2;
    const heightMm = Math.max(buildingMinHeightMm, levels * buildingFloorHeightMm * buildingHeightScale);

    // Centroid in geo coords for elevation sampling
    let sumLon = 0, sumLat = 0;
    for (const p of outer) { sumLon += p.lon; sumLat += p.lat; }
    const cLonFrac = (sumLon / outer.length - minLon) / (maxLon - minLon);
    const cLatFrac = (sumLat / outer.length - minLat) / (maxLat - minLat);

    // Centroid in model coords (for size scaling)
    const cSx = cLonFrac * wMm - wMm / 2;
    const cSy = cLatFrac * dMm - dMm / 2;

    // Skip buildings whose centroid falls outside the zone polygon
    if (lastZonePoly) {
      const cZx = cSx;
      const cZz = (0.5 - cLatFrac) * dMm;
      if (!pointInZone(cZx, cZz, lastZonePoly)) continue;
    }

    const shape = new THREE.Shape();
    for (let i = 0; i < outer.length; i++) {
      const lonFrac = (outer[i].lon - minLon) / (maxLon - minLon);
      const latFrac = (outer[i].lat - minLat) / (maxLat - minLat);
      const sx = cSx + (lonFrac * wMm - wMm / 2 - cSx) * buildingSizeScale;
      const sy = cSy + (latFrac * dMm - dMm / 2 - cSy) * buildingSizeScale;
      if (i === 0) shape.moveTo(sx, sy); else shape.lineTo(sx, sy);
    }
    shape.closePath();

    const elev = sampleElev(grid, G, cLonFrac, 1 - cLatFrac);
    const yBase = baseH + ((elev - minE) / elevRange) * elevScaleMm;

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: heightMm,
      bevelEnabled: false,
    });
    geo.rotateX(-Math.PI / 2);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = yBase;
    meshes.push(mesh);
  }
  return meshes;
}

/* ══════════════════════════════════════════════
   ROAD RIBBONS (built from cachedFeatures highway data)
══════════════════════════════════════════════ */

// Real-world lane widths (meters) per highway type
function roadRealWidthM(hwType: string): number {
  if (hwType === 'motorway' || hwType === 'motorway_link') return 10;
  if (hwType === 'trunk'    || hwType === 'trunk_link')    return 8;
  if (hwType === 'primary'  || hwType === 'primary_link')  return 6;
  if (hwType === 'secondary'|| hwType === 'secondary_link')return 5;
  if (hwType === 'tertiary' || hwType === 'tertiary_link') return 4;
  return 3.5; // residential, unclassified, living_street
}

function buildRoadRibbon(
  geom: GeoPoint[], halfW: number, heightOff: number,
  bounds: LatLonBounds, grid: Float32Array, G: number,
  minE: number, elevRange: number,
  wMm: number, dMm: number, baseH: number, elevScaleMm: number,
): THREE.BufferGeometry | null {
  const { minLat, maxLat, minLon, maxLon } = bounds;

  // Sample terrain Y at a model-space (x, z) point
  const terrainY = (x: number, z: number): number => {
    const u = Math.max(0, Math.min(1, x / wMm + 0.5));
    const vv = Math.max(0, Math.min(1, 0.5 - z / dMm));
    const e = sampleElev(grid, G, u, 1 - vv);
    return baseH + ((e - minE) / elevRange) * elevScaleMm + heightOff;
  };

  // Build anchor points from OSM nodes — skip points outside zone polygon
  const anchors: THREE.Vector3[] = [];
  for (const p of geom) {
    const u = (p.lon - minLon) / (maxLon - minLon);
    const v = (p.lat - minLat) / (maxLat - minLat);
    if (u < -0.02 || u > 1.02 || v < -0.02 || v > 1.02) continue;
    const x = (u - 0.5) * wMm;
    const z = (0.5 - v) * dMm;
    if (lastZonePoly && !pointInZone(x, z, lastZonePoly)) continue;
    anchors.push(new THREE.Vector3(x, terrainY(x, z), z));
  }
  if (anchors.length < 2) return null;

  // Densify: resample terrain elevation every STEP mm so the ribbon hugs the terrain
  const STEP = 1.5;
  const pts: THREE.Vector3[] = [anchors[0]];
  for (let i = 1; i < anchors.length; i++) {
    const a = anchors[i - 1], b = anchors[i];
    const dx = b.x - a.x, dz = b.z - a.z;
    const len = Math.sqrt(dx * dx + dz * dz);
    const n = Math.max(1, Math.round(len / STEP));
    for (let s = 1; s <= n; s++) {
      const t = s / n;
      const x = a.x + dx * t, z = a.z + dz * t;
      pts.push(new THREE.Vector3(x, terrainY(x, z), z));
    }
  }

  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 1)];
    const next = pts[Math.min(pts.length - 1, i + 1)];
    const tx = next.x - prev.x;
    const tz = next.z - prev.z;
    const tlen = Math.sqrt(tx * tx + tz * tz);
    if (tlen < 1e-9) {
      positions.push(pts[i].x, pts[i].y, pts[i].z);
      positions.push(pts[i].x, pts[i].y, pts[i].z);
    } else {
      const px = -tz / tlen * halfW;
      const pz =  tx / tlen * halfW;
      positions.push(pts[i].x - px, pts[i].y, pts[i].z - pz); // left
      positions.push(pts[i].x + px, pts[i].y, pts[i].z + pz); // right
    }
    if (i > 0) {
      const b = (i - 1) * 2;
      indices.push(b, b + 2, b + 1, b + 1, b + 2, b + 3);
    }
  }

  if (positions.length < 12) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export function rebuildRoadMeshes(): void {
  if (roadMeshGroup) {
    scene?.remove(roadMeshGroup);
    const si = sceneObjs.indexOf(roadMeshGroup);
    if (si >= 0) sceneObjs.splice(si, 1);
    roadMeshGroup = null;
  }
  if (!cachedElev || !scene || !cachedRoads.length) return;

  const { minE, elevRange, bounds } = cachedElev;
  const grid = lastWorkGrid ?? cachedElev.grid;
  const G = PREVIEW_GRID;
  const wMm = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;

  const cLat = (bounds.minLat + bounds.maxLat) / 2;
  const realW = (bounds.maxLon - bounds.minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const scaleMMperM = wMm / realW;

  const bldSlot = layerSlotOverrides['roads'] ?? 8;
  const col = new THREE.Color(colorSlots[bldSlot] ?? '#262626');
  const mat = new THREE.MeshLambertMaterial({
    color: col, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -4,
  });

  const heightOff = (roadStyle === 'raised' ? roadHeightMm : -roadHeightMm);
  const group = new THREE.Group();

  for (const road of cachedRoads) {
    // Skip road ribbons entirely outside the zone polygon
    if (lastZonePoly) {
      const rb2 = bounds;
      const hasPointInZone = road.geom.some(p => {
        const rx = (p.lon - rb2.minLon) / (rb2.maxLon - rb2.minLon) * wMm - wMm / 2;
        const rz = (0.5 - (p.lat - rb2.minLat) / (rb2.maxLat - rb2.minLat)) * dMm;
        return pointInZone(rx, rz, lastZonePoly!);
      });
      if (!hasPointInZone) continue;
    }
    const rawW = roadRealWidthM(road.hwType) * scaleMMperM * roadWidthMult;
    const halfW = Math.max(roadMinWidthMm, rawW) / 2;
    const geo = buildRoadRibbon(
      road.geom, halfW, heightOff,
      bounds, grid, G, minE, elevRange, wMm, dMm, baseH, elevScaleMm,
    );
    if (geo) group.add(new THREE.Mesh(geo, mat));
  }

  if (group.children.length > 0) {
    group.visible = layerVisible['roads'] ?? true;
    scene.add(group);
    sceneObjs.push(group);
    roadMeshGroup = group;
  }
}

/* ══════════════════════════════════════════════
   WATER BODY HELPERS
══════════════════════════════════════════════ */

export function setWaterParams(heightOffset: number, hydroFlatten: boolean): void {
  waterHeightOffset = heightOffset;
  waterHydroFlatten = hydroFlatten;
}
export function setWaterFeatureEnabled(key: string, enabled: boolean): void {
  waterFeaturesEnabled[key] = enabled;
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
}
export function setWaterwayParams(lineWidth: number, heightOffset: number): void {
  waterwayLineWidth    = lineWidth;
  waterwayHeightOffset = heightOffset;
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
}
export function setWaterwayFeatureEnabled(key: string, enabled: boolean): void {
  waterwayFeaturesEnabled[key] = enabled;
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
}

function classifyWaterFeature(tags: Record<string, string>): string {
  const w = tags.water ?? '';
  if (['ocean', 'sea', 'bay', 'strait'].includes(w)) return 'water_ocean';
  if (w === 'canal') return 'water_canal'; // controlled from waterways panel
  if (w === 'lake' || (!w && tags.natural === 'water')) return 'water_lake';
  if (w === 'pond') return 'water_pond';
  if (w === 'reservoir' || tags.landuse === 'reservoir') return 'water_reservoir';
  if (w === 'wastewater') return 'water_wastewater';
  if (['basin', 'dock', 'reflecting_pool', 'swimming_pool', 'moat'].includes(w)) return 'water_human';
  return 'water_other';
}

function isWaterwayEnabled(t: Record<string, string>): boolean {
  const ww = t.waterway ?? '';
  if (ww === 'river') return waterwayFeaturesEnabled['rivers'] !== false;
  if (ww === 'canal') return waterwayFeaturesEnabled['canals'] !== false;
  if (ww === 'stream' || ww === 'ditch') {
    return (t.name ? waterwayFeaturesEnabled['streams_named'] : waterwayFeaturesEnabled['streams_unnamed']) !== false;
  }
  return true;
}

function pointInPoly(lat: number, lon: number, poly: GeoPoint[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const yi = poly[i].lat, xi = poly[i].lon;
    const yj = poly[j].lat, xj = poly[j].lon;
    if ((yi > lat) !== (yj > lat) && lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)
      inside = !inside;
  }
  return inside;
}

function getOsmPolygons(el: OSMEl): GeoPoint[][] {
  if (el.type === 'way' && el.geometry) return [el.geometry];
  if (el.type === 'relation' && el.members)
    return el.members.filter(m => m.role === 'outer' && m.geometry).map(m => m.geometry!);
  return [];
}

function applyWaterToGrid(
  rawGrid: Float32Array, G: number, bounds: LatLonBounds,
  features: OSMEl[], elevRange: number, elevScaleMm: number, layH: number,
): Float32Array {
  if (!waterHydroFlatten && waterHeightOffset === 0) return rawGrid;
  const grid = new Float32Array(rawGrid);
  const latRange = bounds.maxLat - bounds.minLat;
  const lonRange = bounds.maxLon - bounds.minLon;
  const elevPerLayer = elevRange > 0 && elevScaleMm > 0 ? (layH / elevScaleMm) * elevRange : 0;

  for (const feat of features) {
    if (!feat.tags) continue;
    const isWater = feat.tags.natural === 'water' || feat.tags.waterway === 'riverbank';
    if (!isWater) continue;
    if (waterFeaturesEnabled[classifyWaterFeature(feat.tags)] === false) continue;

    for (const poly of getOsmPolygons(feat)) {
      if (poly.length < 3) continue;
      let bbMinLat = Infinity, bbMaxLat = -Infinity, bbMinLon = Infinity, bbMaxLon = -Infinity;
      for (const pt of poly) {
        if (pt.lat < bbMinLat) bbMinLat = pt.lat; if (pt.lat > bbMaxLat) bbMaxLat = pt.lat;
        if (pt.lon < bbMinLon) bbMinLon = pt.lon; if (pt.lon > bbMaxLon) bbMaxLon = pt.lon;
      }
      const jMin = Math.max(0, Math.floor((bounds.maxLat - bbMaxLat) / latRange * (G - 1)));
      const jMax = Math.min(G - 1, Math.ceil((bounds.maxLat - bbMinLat) / latRange * (G - 1)));
      const iMin = Math.max(0, Math.floor((bbMinLon - bounds.minLon) / lonRange * (G - 1)));
      const iMax = Math.min(G - 1, Math.ceil((bbMaxLon - bounds.minLon) / lonRange * (G - 1)));

      const cells: number[] = [];
      let minElev = Infinity;
      for (let j = jMin; j <= jMax; j++) {
        const lat = bounds.maxLat - (j / (G - 1)) * latRange;
        for (let i = iMin; i <= iMax; i++) {
          if (pointInPoly(lat, bounds.minLon + (i / (G - 1)) * lonRange, poly)) {
            const idx = j * G + i;
            cells.push(idx);
            if (grid[idx] < minElev) minElev = grid[idx];
          }
        }
      }
      for (const idx of cells) {
        if (waterHydroFlatten) grid[idx] = minElev;
        grid[idx] += waterHeightOffset * elevPerLayer;
      }
    }
  }
  return grid;
}

/* ══════════════════════════════════════════════
   MAP TEXTURE: layered OSM terrain zones
══════════════════════════════════════════════ */

function matchLCFeature(t: Record<string, string>, f: Record<string, boolean>): boolean {
  if (t.natural === 'wood')           return f['lc_forest_detailed'] === true;
  if (t.landuse === 'forest')         return f['lc_forest'] === true;
  if (t.natural === 'grassland' || t.landuse === 'grass') return f['lc_grass'] === true;
  if (t.landuse === 'meadow')         return f['lc_grass_detailed'] === true;
  if (t.landuse === 'farmland')       return f['lc_crop'] === true;
  if (t.natural === 'fell' || t.natural === 'moor') return f['lc_moss'] === true;
  if (t.natural === 'heath')          return f['lc_shrub'] === true;
  if (t.natural === 'scrub')          return f['lc_scrub'] === true;
  if (t.natural === 'wetland')        return t.wetland === 'mangrove' ? f['lc_mangrove'] === true : f['lc_wetland'] === true;
  if (t.natural === 'mud')            return f['lc_wetland_detailed'] === true;
  if (t.natural === 'glacier')        return f['lc_glacier'] === true;
  if (t.natural === 'snow')           return f['lc_snow'] === true;
  if (t.natural === 'bare_rock')      return f['lc_rock'] === true;
  if (t.natural === 'scree')          return f['lc_barren'] === true;
  if (t.natural === 'sand')           return f['lc_sand'] === true || f['lc_desert'] === true;
  return false;
}

// Zone definitions: drawn bottom-to-top. Colors driven by colorSlots.
const ZONE_LAYERS: Array<{
  id: string;
  match: (tags: Record<string, string>) => boolean;
  slot: number;
  fill: boolean;
}> = [
  { id: 'veg_low',   match: t => matchLCFeature(t, layerLCFeatures['veg_low']   ?? {}), slot: 3, fill: true },
  { id: 'veg_dense', match: t => matchLCFeature(t, layerLCFeatures['veg_dense']  ?? {}), slot: 4, fill: true },
  { id: 'wetland',   match: t => matchLCFeature(t, layerLCFeatures['wetland_lc'] ?? {}), slot: 3, fill: true },
  { id: 'snow',      match: t => matchLCFeature(t, layerLCFeatures['snow_lc']    ?? {}), slot: 2, fill: true },
  { id: 'barren',    match: t => matchLCFeature(t, layerLCFeatures['barren_lc']  ?? {}), slot: 1, fill: true },
  { id: 'water',          match: t => t.natural === 'water' && (() => { const c = classifyWaterFeature(t); return c === 'water_canal' ? waterwayFeaturesEnabled['canal_polygons'] !== false : waterFeaturesEnabled[c] !== false; })(), slot: 5, fill: true },
  { id: 'river_polygons', match: t => t.waterway === 'riverbank' && waterwayFeaturesEnabled['river_polygons'] !== false, slot: 5, fill: true },
  { id: 'waterways',      match: t => !!t.waterway && t.waterway !== 'riverbank' && isWaterwayEnabled(t), slot: 5, fill: false },
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

function buildZoneMeshes(
  features: OSMEl[],
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  wMm: number, dMm: number,
  baseH: number, elevScaleMm: number,
): THREE.Mesh[] {
  const { minLat, maxLat, minLon, maxLon } = bounds;
  const OFFSET_MM = 0.08; // physically above terrain → no polygonOffset needed
  const DENSIFY_MM = 6;

  const terrainY = (mx: number, mz: number): number => {
    const u = Math.max(0, Math.min(1, mx / wMm + 0.5));
    const vv = Math.max(0, Math.min(1, 0.5 - mz / dMm));
    const e = sampleElev(grid, G, u, 1 - vv);
    return baseH + ((e - minE) / elevRange) * elevScaleMm + OFFSET_MM;
  };

  const geoToV2 = (geom: GeoPoint[]): THREE.Vector2[] => {
    const raw: [number, number][] = geom.map(p => {
      const u = (p.lon - minLon) / (maxLon - minLon);
      const v = (p.lat - minLat) / (maxLat - minLat);
      return [(u - 0.5) * wMm, (0.5 - v) * dMm];
    });
    // Densify edges so interior triangles follow terrain
    const out: [number, number][] = [raw[0]];
    for (let i = 1; i < raw.length; i++) {
      const [ax, az] = raw[i - 1], [bx, bz] = raw[i];
      const len = Math.sqrt((bx - ax) ** 2 + (bz - az) ** 2);
      const n = Math.max(1, Math.round(len / DENSIFY_MM));
      for (let s = 1; s <= n; s++) {
        const t = s / n;
        out.push([ax + (bx - ax) * t, az + (bz - az) * t]);
      }
    }
    return out.map(([x, z]) => new THREE.Vector2(x, z));
  };

  const filterSlider = document.getElementById('cp-filter') as HTMLInputElement | null;
  const filterVal = filterSlider ? Number(filterSlider.value) : 100;
  const lonScale = Math.cos((bounds.minLat + bounds.maxLat) / 2 * Math.PI / 180);
  const boundsAreaM2 = (bounds.maxLon - bounds.minLon) * lonScale * 111320
                     * (bounds.maxLat - bounds.minLat) * 111320;
  const minAreaM2 = Math.pow(1 - filterVal / 100, 2) * 0.02 * boundsAreaM2;

  const meshes: THREE.Mesh[] = [];

  for (const layer of ZONE_LAYERS) {
    if (!layer.fill) continue;

    const effectiveSlot = layerSlotOverrides[layer.id] ?? layer.slot;
    const col = new THREE.Color(colorSlots[effectiveSlot] ?? '#888');
    const clippingPlanes = [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), wMm / 2),
      new THREE.Plane(new THREE.Vector3(1, 0, 0), wMm / 2),
      new THREE.Plane(new THREE.Vector3(0, 0, -1), dMm / 2),
      new THREE.Plane(new THREE.Vector3(0, 0, 1), dMm / 2),
    ];
    const mat = new THREE.MeshBasicMaterial({
      color: col,
      side: THREE.DoubleSide,
      clippingPlanes,
    });

    const layerEls = features.filter(el => {
      if (!el.tags || !layer.match(el.tags)) return false;
      if (minAreaM2 <= 0) return true;
      return computeFeatureAreaM2(el, lonScale) >= minAreaM2;
    });

    for (const el of layerEls) {
      try {
        const outerRings = getOsmPolygons(el);
        const innerGeoms = el.type === 'relation' && el.members
          ? el.members.filter(m => m.role === 'inner' && m.geometry).map(m => m.geometry!)
          : [];

        for (const outer of outerRings) {
          if (outer.length < 3) continue;
          const shape = new THREE.Shape(geoToV2(outer));
          for (const inner of innerGeoms) {
            if (inner.length >= 3) shape.holes.push(new THREE.Path(geoToV2(inner)));
          }
          const geo = new THREE.ShapeGeometry(shape);
          // Remap ShapeGeometry XY → model XZ with terrain Y
          const pos = geo.attributes.position as THREE.BufferAttribute;
          for (let i = 0; i < pos.count; i++) {
            const mx = pos.getX(i);
            const mz = pos.getY(i); // ShapeGeometry Y = model Z axis
            pos.setXYZ(i, mx, terrainY(mx, mz), mz);
          }
          pos.needsUpdate = true;
          const mesh = new THREE.Mesh(geo, mat);
          (mesh as any).__zoneLayerId = layer.id;
          mesh.visible = layerVisible[layer.id] ?? true;
          meshes.push(mesh);
        }
      } catch { /* skip malformed features */ }
    }
  }
  return meshes;
}

function buildMapTexture(
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  features: OSMEl[],
  wMm: number, dMm: number,
  elevScaleMm: number,
  roads: { hwType: string; geom: GeoPoint[] }[],
  buildings: OSMEl[],
): THREE.CanvasTexture {
  const S = TEX_SIZE;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d')!;

  // Step 1 — elevation-based base zones: low→veg_low, mid→veg_dense, high→barren
  // Rendered at grid resolution then upscaled (fast, fills gap areas without OSM data)
  {
    const cVegL = hexToRgb(colorSlots[layerSlotOverrides['veg_low']  ?? 3] ?? '#8ab858');
    const cVegD = hexToRgb(colorSlots[layerSlotOverrides['veg_dense'] ?? 4] ?? '#3a6828');
    const cBase = hexToRgb(colorSlots[layerSlotOverrides['base']      ?? 1] ?? '#c0af88');
    const snapCv = document.createElement('canvas');
    snapCv.width = G; snapCv.height = G;
    const snapCtx = snapCv.getContext('2d')!;
    const snapId = snapCtx.createImageData(G, G);
    const sd = snapId.data;
    for (let gj = 0; gj < G; gj++) {
      for (let gi = 0; gi < G; gi++) {
        const t = Math.max(0, Math.min(1, (grid[gj * G + gi] - minE) / (elevRange || 1)));
        const rgb = t < 0.4 ? lerp3(cVegL, cVegD, t / 0.4)
                  : t < 0.65 ? lerp3(cVegD, cBase, (t - 0.4) / 0.25)
                  : cBase;
        const pi = (gj * G + gi) * 4;
        sd[pi] = rgb[0]; sd[pi + 1] = rgb[1]; sd[pi + 2] = rgb[2]; sd[pi + 3] = 255;
      }
    }
    snapCtx.putImageData(snapId, 0, 0);
    ctx.drawImage(snapCv, 0, 0, S, S);
  }

  // Step 2 — draw all OSM zone fills + waterway lines in layer order
  const filterSlider = document.getElementById('cp-filter') as HTMLInputElement | null;
  const filterVal = filterSlider ? Number(filterSlider.value) : 100;
  const lonScale = Math.cos((bounds.minLat + bounds.maxLat) / 2 * Math.PI / 180);
  const boundsAreaM2 = (bounds.maxLon - bounds.minLon) * lonScale * 111320
                     * (bounds.maxLat - bounds.minLat) * 111320;
  const minAreaM2 = Math.pow(1 - filterVal / 100, 2) * 0.02 * boundsAreaM2;

  for (const layer of ZONE_LAYERS) {
    if (!layerVisible[layer.id]) continue;
    const layerEls = features.filter(el => {
      if (!el.tags || !layer.match(el.tags)) return false;
      if (layer.fill && minAreaM2 > 0) return computeFeatureAreaM2(el, lonScale) >= minAreaM2;
      return true;
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
      // Waterway lines drawn after hillshade (below — saved for pass 4)
    }
  }

  // Step 3 — hillshade pass: precompute per-grid-cell shade, then interpolate per pixel
  {
    const SX = wMm / (G - 1);
    const SZ = dMm / (G - 1);
    const EVS = elevScaleMm / (elevRange > 0 ? elevRange : 1);
    // Light from NW at 45° altitude (azimuth 315°)
    const LX = -0.5, LY = 0.7071, LZ = -0.5;

    const shadeGrid = new Float32Array(G * G);
    for (let gj = 0; gj < G; gj++) {
      for (let gi = 0; gi < G; gi++) {
        const giL = Math.max(0, gi - 1), giR = Math.min(G - 1, gi + 1);
        const gjU = Math.max(0, gj - 1), gjD = Math.min(G - 1, gj + 1);
        const dEdX = (grid[gj * G + giR] - grid[gj * G + giL]) / ((giR - giL) * SX);
        const dEdZ = (grid[gjD * G + gi] - grid[gjU * G + gi]) / ((gjD - gjU) * SZ);
        const sX = dEdX * EVS, sZ = dEdZ * EVS;
        const len = Math.sqrt(sX * sX + 1 + sZ * sZ);
        const dot = (-sX * LX + LY - sZ * LZ) / len;
        shadeGrid[gj * G + gi] = Math.max(0.35, Math.min(1.3, 0.45 + 0.85 * Math.max(0, dot)));
      }
    }

    const imgData = ctx.getImageData(0, 0, S, S);
    const d = imgData.data;
    for (let row = 0; row < S; row++) {
      for (let col = 0; col < S; col++) {
        const gx = col / (S - 1) * (G - 1);
        const gy = row / (S - 1) * (G - 1);
        const gi = Math.min(G - 2, Math.floor(gx));
        const gj = Math.min(G - 2, Math.floor(gy));
        const fx = gx - gi, fy = gy - gj;
        const shade = shadeGrid[gj*G+gi]*(1-fx)*(1-fy)
                    + shadeGrid[gj*G+gi+1]*fx*(1-fy)
                    + shadeGrid[(gj+1)*G+gi]*(1-fx)*fy
                    + shadeGrid[(gj+1)*G+gi+1]*fx*fy;
        const pi = (row * S + col) * 4;
        d[pi]   = d[pi]   * shade > 255 ? 255 : d[pi]   * shade;
        d[pi+1] = d[pi+1] * shade > 255 ? 255 : d[pi+1] * shade;
        d[pi+2] = d[pi+2] * shade > 255 ? 255 : d[pi+2] * shade;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  // Step 4a — road lines painted on shaded terrain (texture pass, before waterways)
  if ((layerVisible['roads'] ?? true) && roads.length > 0) {
    const roadSlot = layerSlotOverrides['roads'] ?? 8;
    const roadCol = colorSlots[roadSlot] ?? '#262626';
    const cLat = (bounds.minLat + bounds.maxLat) / 2;
    const lonScale = Math.cos(cLat * Math.PI / 180);
    const realW = (bounds.maxLon - bounds.minLon) * lonScale * 111320;
    const scaleTexPerM = S / realW;

    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const road of roads) {
      const baseW = roadRealWidthM(road.hwType) * scaleTexPerM * roadWidthMult;
      const lw = Math.max(4, baseW);
      ctx.beginPath();
      let first = true;
      for (const p of road.geom) {
        const cx = (p.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * S;
        const cy = (1 - (p.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * S;
        if (first) { ctx.moveTo(cx, cy); first = false; } else ctx.lineTo(cx, cy);
      }
      ctx.strokeStyle = roadCol;
      ctx.lineWidth = lw;
      ctx.stroke();
    }
  }

  // Step 4b — building footprints painted on terrain
  if ((layerVisible['buildings'] ?? true) && buildings.length > 0) {
    const bldSlot = layerSlotOverrides['buildings'] ?? 7;
    const bldCol = colorSlots[bldSlot] ?? '#b8b8b8';
    ctx.fillStyle = bldCol;
    ctx.beginPath();
    for (const el of buildings) {
      const polys = getOsmPolygons(el);
      if (!polys.length) continue;
      const outer = polys[0];
      if (outer.length < 3) continue;
      for (let i = 0; i < outer.length; i++) {
        const cx = (outer[i].lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * S;
        const cy = (1 - (outer[i].lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * S;
        if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
      }
      ctx.closePath();
    }
    ctx.fill('nonzero');
  }

  // Step 4c — waterway lines drawn on top of shaded terrain (crisp, unaffected by shade)
  for (const layer of ZONE_LAYERS) {
    if (layer.fill) continue;
    if (!layerVisible[layer.id]) continue;
    const layerEls = features.filter(el => el.tags && layer.match(el.tags));
    if (!layerEls.length) continue;
    const effectiveSlot = layerSlotOverrides[layer.id] ?? layer.slot;
    const col = colorSlots[effectiveSlot] ?? '#888';
    for (const el of layerEls) {
      if (!el.tags) continue;
      const ww = el.tags.waterway ?? '';
      const lw = (ww === 'river' ? 7 : ww === 'canal' ? 5 : ww === 'stream' ? 2.5 : 1.5) * waterwayLineWidth;
      ctx.beginPath();
      traceGeometry(ctx, el, bounds, S);
      ctx.strokeStyle = col;
      ctx.lineWidth = lw;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  }

  const tex = new THREE.CanvasTexture(cv);
  if (renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
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
    // No closePath() here: fill() closes implicitly; stroke() must NOT close (spurious return line on rivers)
  };

  if (el.type === 'way' && el.geometry) {
    drawPts(el.geometry);
  } else if (el.type === 'relation' && el.members) {
    for (const m of el.members) {
      if ((m.role === 'outer' || m.role === 'inner') && m.geometry) drawPts(m.geometry);
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

/** Sample terrain elevation at (u,v) with bilinear interpolation */
function sampleElev(grid: Float32Array, G: number, u: number, v: number): number {
  const gx = Math.max(0, Math.min(G-2, u * (G-1)));
  const gv = Math.max(0, Math.min(G-2, v * (G-1)));
  const gi = Math.floor(gx), gj = Math.floor(gv);
  const fx = gx-gi, fy = gv-gj;
  return grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
       + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
}

function spawnMarkerMeshFrom(md: MarkerData, insertIdx: number): void {
  if (!cachedElev || !scene) return;
  const { grid, minE, elevRange } = cachedElev;
  const G = PREVIEW_GRID;
  const wMm = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;

  const wallW = 0.42; // default wall width mm
  const layH  = 0.20; // default layer height mm
  const r = (md.diameterMult * wallW) / 2;
  const depth = 0.5;
  const heightOff = md.heightOffMult * layH;

  const u = md.lonFrac, v = 1 - md.latFrac;
  const x = (u - 0.5) * wMm, z = (0.5 - (1 - v)) * dMm;

  // When flatTop, find max elevation in the marker footprint so it sits above terrain
  let yBase: number;
  if (md.flatTop) {
    let maxE = -Infinity;
    const steps = 8;
    for (let si = 0; si <= steps; si++) {
      for (let sj = 0; sj <= steps; sj++) {
        const ru = si / steps, rv = sj / steps;
        const pu = u + (ru - 0.5) * (r * 2) / wMm;
        const pv = v + (rv - 0.5) * (r * 2) / dMm;
        const eu = Math.max(0, Math.min(1, pu)), ev = Math.max(0, Math.min(1, pv));
        const e = sampleElev(grid, G, eu, ev);
        if (e > maxE) maxE = e;
      }
    }
    yBase = baseH + ((maxE - minE) / elevRange) * elevScaleMm;
  } else {
    const e = sampleElev(grid, G, u, v);
    yBase = baseH + ((e - minE) / elevRange) * elevScaleMm;
  }

  const markerSlot = layerSlotOverrides['gpx'] ?? 6;
  const col = colorSlots[markerSlot] ?? '#ff4500';
  const mat = new THREE.MeshLambertMaterial({ color: col, side: THREE.DoubleSide });

  const shapeObj = buildMarkerShape(md.shape, r);
  const geo = new THREE.ExtrudeGeometry(shapeObj, { depth, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  if (md.rotDeg !== 0) geo.rotateY(md.rotDeg * Math.PI / 180);

  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(x, yBase + heightOff, z);
  mesh.visible = md.visible && (layerVisible['gpx'] ?? true);

  markerMeshToId.set(mesh, md.id);

  // Insert at the correct position in the arrays
  if (insertIdx >= markerMeshRefs.length) {
    add(mesh);
    markerMeshRefs.push(mesh);
  } else {
    scene!.add(mesh); sceneObjs.push(mesh);
    markerMeshRefs.splice(insertIdx, 0, mesh);
  }
}

// Keep old name as alias used in re-spawn loop
function spawnMarkerMesh(latFrac: number, lonFrac: number, shape: string): void {
  // Called from re-spawn loop in rebuildScene — data already in placedMarkersData
  // Nothing to do here; spawnMarkerMeshFrom is called directly
  void latFrac; void lonFrac; void shape;
}

function sampleTerrainY(
  x: number, z: number,
  wMm: number, dMm: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number, baseH: number, elevScaleMm: number,
  yLift: number,
): number {
  const u = Math.max(0, Math.min(1, x / wMm + 0.5));
  const v = Math.max(0, Math.min(1, 0.5 - z / dMm));
  const gx = u * (G - 1), gv = (1 - v) * (G - 1);
  const gi = Math.min(G - 2, Math.floor(gx)), gj = Math.min(G - 2, Math.floor(gv));
  const fx = gx - gi, fy = gv - gj;
  const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
          + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
  return baseH + ((e - minE) / elevRange) * elevScaleMm + yLift;
}

function buildGpxLine(
  pts: LatLon[], bounds: LatLonBounds,
  wMm: number, dMm: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number, baseH: number, elevScaleMm: number,
): THREE.Object3D | null {
  const tubRadiusEarly = gpxLineThickness * 0.21;
  const yLift = tubRadiusEarly + 0.05 + gpxLineHeightOffset * 0.2;
  const rawVerts: THREE.Vector3[] = [];
  for (const pt of pts) {
    const u = Math.max(0.0005, Math.min(0.9995, (pt.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)));
    const v = Math.max(0.0005, Math.min(0.9995, (pt.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)));
    const x = (u - 0.5) * wMm, z = (0.5 - v) * dMm;
    rawVerts.push(new THREE.Vector3(x, sampleTerrainY(x, z, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm, yLift), z));
  }
  if (rawVerts.length < 2) return null;

  // Densify: add intermediate terrain-sampled points every ~1mm to hug contours
  const DENSIFY_MM = 1.0;
  const verts: THREE.Vector3[] = [rawVerts[0]];
  for (let i = 0; i < rawVerts.length - 1; i++) {
    const a = rawVerts[i], b = rawVerts[i + 1];
    const dx = b.x - a.x, dz = b.z - a.z;
    const dist = Math.sqrt(dx * dx + dz * dz);
    const steps = Math.max(1, Math.floor(dist / DENSIFY_MM));
    for (let j = 1; j <= steps; j++) {
      const t = j / steps;
      const mx = a.x + dx * t, mz = a.z + dz * t;
      const my = sampleTerrainY(mx, mz, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm, yLift);
      const np = new THREE.Vector3(mx, my, mz);
      if (np.distanceTo(verts[verts.length - 1]) >= 0.08) verts.push(np);
    }
  }
  if (verts.length < 2) return null;

  const gpxSlot = layerSlotOverrides['gpx_line'] ?? 6;
  const col = colorSlots[gpxSlot] ?? '#ff4500';
  const tubRadius = gpxLineThickness * 0.21;

  if (tubRadius >= 0.1) {
    const rawCurve = new THREE.CatmullRomCurve3(verts, false, 'centripetal');
    const numUniform = Math.min(2000, Math.max(80, verts.length * 5));
    const uniformPts = rawCurve.getSpacedPoints(numUniform);
    // Clamp Y: spline smoothing can dip below terrain between control points
    for (const pt of uniformPts) {
      const minY = sampleTerrainY(pt.x, pt.z, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm, yLift - tubRadius);
      if (pt.y < minY) pt.y = minY;
    }
    const geo = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(uniformPts, false, 'centripetal'),
      numUniform, tubRadius, 8, false,
    );
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

/* ══════════════════════════════════════════════
   PRINT PREVIEW — aperçu impression FDM
   Génère un InstancedMesh de colonnes voxels qui reproduit
   l'effet staircase des couches d'impression 3D.
══════════════════════════════════════════════ */
let printPreviewGroup: THREE.Group | null = null;
let printPreviewActive = false;
const VOXEL_G = 120; // résolution XZ de la grille voxels (120×120 colonnes)

/** Canvas G×G avec couleurs de zone sans hillshade — pour colorer les voxels */
function buildVoxelColorCanvas(G: number): Uint8ClampedArray {
  if (!cachedElev) return new Uint8ClampedArray(G * G * 4);
  const { grid, minE, elevRange, bounds } = cachedElev;

  const cv = document.createElement('canvas');
  cv.width = G; cv.height = G;
  const ctx = cv.getContext('2d')!;

  // Étape 1 : base altimétrique (même logique que buildMapTexture Step 1)
  const cVegL = hexToRgb(colorSlots[layerSlotOverrides['veg_low']   ?? 3] ?? '#8ab858');
  const cVegD = hexToRgb(colorSlots[layerSlotOverrides['veg_dense']  ?? 4] ?? '#3a6828');
  const cBase = hexToRgb(colorSlots[layerSlotOverrides['base']       ?? 1] ?? '#c0af88');
  const snapId = ctx.createImageData(G, G);
  const sd = snapId.data;
  for (let gj = 0; gj < G; gj++) {
    for (let gi = 0; gi < G; gi++) {
      const elev = sampleElev(grid, PREVIEW_GRID, gi / (G - 1), gj / (G - 1));
      const t = Math.max(0, Math.min(1, (elev - minE) / (elevRange || 1)));
      const rgb = t < 0.4  ? lerp3(cVegL, cVegD, t / 0.4)
                : t < 0.65 ? lerp3(cVegD, cBase, (t - 0.4) / 0.25)
                : cBase;
      const pi = (gj * G + gi) * 4;
      sd[pi] = rgb[0]; sd[pi + 1] = rgb[1]; sd[pi + 2] = rgb[2]; sd[pi + 3] = 255;
    }
  }
  ctx.putImageData(snapId, 0, 0);

  // Étape 2 : remplissages de zones OSM
  const filterSlider = document.getElementById('cp-filter') as HTMLInputElement | null;
  const filterVal    = filterSlider ? Number(filterSlider.value) : 100;
  const lonScale     = Math.cos((bounds.minLat + bounds.maxLat) / 2 * Math.PI / 180);
  const boundsAreaM2 = (bounds.maxLon - bounds.minLon) * lonScale * 111320
                     * (bounds.maxLat - bounds.minLat) * 111320;
  const minAreaM2    = Math.pow(1 - filterVal / 100, 2) * 0.02 * boundsAreaM2;

  for (const layer of ZONE_LAYERS) {
    if (!layer.fill || !(layerVisible[layer.id] ?? true)) continue;
    const layerEls = cachedFeatures.filter(el => {
      if (!el.tags || !layer.match(el.tags)) return false;
      if (minAreaM2 > 0) return computeFeatureAreaM2(el, lonScale) >= minAreaM2;
      return true;
    });
    if (!layerEls.length) continue;
    const effectiveSlot = layerSlotOverrides[layer.id] ?? layer.slot;
    ctx.beginPath();
    for (const el of layerEls) traceGeometry(ctx, el, bounds, G);
    ctx.fillStyle = colorSlots[effectiveSlot] ?? '#888';
    ctx.fill('evenodd');
  }

  // Étape 3 : empreintes bâtiments
  if (layerVisible['buildings'] ?? true) {
    const bldSlot = layerSlotOverrides['buildings'] ?? 7;
    ctx.fillStyle = colorSlots[bldSlot] ?? '#b8b8b8';
    ctx.beginPath();
    for (const el of cachedBuildings) {
      const polys = getOsmPolygons(el);
      if (!polys.length) continue;
      const outer = polys[0];
      if (outer.length < 3) continue;
      for (let i = 0; i < outer.length; i++) {
        const cx = (outer[i].lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * G;
        const cy = (1 - (outer[i].lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * G;
        if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
      }
      ctx.closePath();
    }
    ctx.fill('nonzero');
  }

  // Étape 4 : lignes de routes
  if (layerVisible['roads'] ?? true) {
    const roadSlot = layerSlotOverrides['roads'] ?? 8;
    const lonSc    = Math.cos((bounds.minLat + bounds.maxLat) / 2 * Math.PI / 180);
    const realW    = (bounds.maxLon - bounds.minLon) * lonSc * 111320;
    const texScale = G / realW;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = colorSlots[roadSlot] ?? '#262626';
    for (const road of cachedRoads) {
      const lw = Math.max(1, roadRealWidthM(road.hwType) * texScale * roadWidthMult);
      ctx.beginPath();
      let first = true;
      for (const p of road.geom) {
        const cx = (p.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * G;
        const cy = (1 - (p.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * G;
        if (first) { ctx.moveTo(cx, cy); first = false; } else ctx.lineTo(cx, cy);
      }
      ctx.lineWidth = lw;
      ctx.stroke();
    }
  }

  // Étape 5 : voies d'eau (lignes)
  for (const layer of ZONE_LAYERS) {
    if (layer.fill || !(layerVisible[layer.id] ?? true)) continue;
    const layerEls = cachedFeatures.filter(el => el.tags && layer.match(el.tags));
    if (!layerEls.length) continue;
    const effectiveSlot = layerSlotOverrides[layer.id] ?? layer.slot;
    ctx.strokeStyle = colorSlots[effectiveSlot] ?? '#4a88c0';
    for (const el of layerEls) {
      if (!el.tags) continue;
      const ww = el.tags.waterway ?? '';
      ctx.beginPath();
      traceGeometry(ctx, el, bounds, G);
      ctx.lineWidth = (ww === 'river' ? 3 : ww === 'canal' ? 2 : 1) * waterwayLineWidth;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }

  return ctx.getImageData(0, 0, G, G).data;
}

export function buildPrintPreview(layerHeightMm = 0.20): void {
  if (!scene || !cachedElev || !lastWorkGrid) return;
  clearPrintPreview();
  printPreviewActive = true;

  const { minE, elevRange } = cachedElev;
  const grid     = lastWorkGrid;
  const wMm      = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;
  const lh       = Math.max(0.05, layerHeightMm);

  const colorPx  = buildVoxelColorCanvas(VOXEL_G);

  const cellW = wMm / VOXEL_G;
  const cellD = dMm / VOXEL_G;

  // BoxGeometry unitaire (Y=1) — on scale Y = hauteur réelle de chaque colonne
  const boxGeo  = new THREE.BoxGeometry(cellW * 0.96, 1, cellD * 0.96);
  const mat     = new THREE.MeshLambertMaterial();
  const instMesh = new THREE.InstancedMesh(boxGeo, mat, VOXEL_G * VOXEL_G);
  instMesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);

  const dummy  = new THREE.Object3D();
  const iColor = new THREE.Color();

  for (let gj = 0; gj < VOXEL_G; gj++) {
    for (let gi = 0; gi < VOXEL_G; gi++) {
      const idx = gj * VOXEL_G + gi;
      const u   = gi / (VOXEL_G - 1);
      const v   = gj / (VOXEL_G - 1);
      const x   = (u - 0.5) * wMm;
      const z   = (0.5 - v) * dMm;

      // Colonnes hors zone : invisible
      if (lastZonePoly && !pointInZone(x, z, lastZonePoly)) {
        dummy.position.set(x, -9999, z);
        dummy.scale.set(0.001, 0.001, 0.001);
        dummy.updateMatrix();
        instMesh.setMatrixAt(idx, dummy.matrix);
        iColor.setRGB(0, 0, 0);
        instMesh.setColorAt(idx, iColor);
        continue;
      }

      const elev   = sampleElev(grid, PREVIEW_GRID, u, v);
      const rawH   = Math.max(0, (elev - minE) / (elevRange || 1)) * elevScaleMm;
      // Quantification à la hauteur de couche → effet staircase FDM
      const steps  = Math.max(1, Math.round(rawH / lh));
      const colH   = steps * lh;

      dummy.position.set(x, baseH + colH / 2, z);
      dummy.scale.set(1, colH, 1);
      dummy.updateMatrix();
      instMesh.setMatrixAt(idx, dummy.matrix);

      const pi = idx * 4;
      iColor.setRGB(colorPx[pi] / 255, colorPx[pi + 1] / 255, colorPx[pi + 2] / 255);
      instMesh.setColorAt(idx, iColor);
    }
  }

  instMesh.instanceMatrix.needsUpdate = true;
  if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;

  printPreviewGroup = new THREE.Group();
  printPreviewGroup.add(instMesh);
  scene.add(printPreviewGroup);
  sceneObjs.push(printPreviewGroup);

  // Masquer le terrain lisse et les meshes flottants (zones, routes ruban, lignes)
  if (terrainMeshRef) terrainMeshRef.visible = false;
  for (const m of zoneMeshRefs) m.visible = false;
  if (roadMeshGroup) roadMeshGroup.visible = false;
  if (lineMeshGroup) lineMeshGroup.visible = false;
  // Base, façades, bâtiments et GPX restent visibles
}

export function clearPrintPreview(): void {
  if (!scene) return;
  if (printPreviewGroup) {
    scene.remove(printPreviewGroup);
    const si = sceneObjs.indexOf(printPreviewGroup);
    if (si >= 0) sceneObjs.splice(si, 1);
    printPreviewGroup.traverse(c => { (c as THREE.Mesh).geometry?.dispose(); });
    printPreviewGroup = null;
  }
  printPreviewActive = false;
  // Restaurer le terrain lisse
  if (terrainMeshRef) terrainMeshRef.visible = true;
  for (const m of zoneMeshRefs) m.visible = layerVisible[(m as any).__zoneLayerId] ?? true;
  if (roadMeshGroup) roadMeshGroup.visible = layerVisible['roads'] ?? true;
  if (lineMeshGroup) lineMeshGroup.visible = true;
}

export function isPrintPreviewActive(): boolean { return printPreviewActive; }
