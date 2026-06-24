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
  towers: true,
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
let lastGpxPoints: LatLon[] = [];

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
let cachedBuildingParts: OSMEl[] = [];
let cachedTowers: OSMEl[] = [];
let towerMeshRefs: THREE.Object3D[] = [];
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
  type: 'way' | 'relation' | 'node' | string;
  tags?: Record<string, string>;
  geometry?: GeoPoint[];
  members?: OSMMember[];
  lat?: number;   // for node elements
  lon?: number;   // for node elements
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
      if (printPreviewActive) buildPrintPreview();
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
      if (printPreviewActive) buildPrintPreview();
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
      if (printPreviewActive) buildPrintPreview();
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
    const { zoneFeatures, buildings, buildingParts, towers, roads } = await fetchAllOSMFeatures(bounds);
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
      cachedBuildingParts = buildingParts;
      cachedTowers = towers;
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
  lastGpxPoints = gpxPoints;

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

  // ── Monuments paramétriques (Tour Eiffel) ────────────
  // Détecté par nom ; on rend un modèle fidèle et on supprime les building:part
  // et la tour générique qui chevaucheraient (évite le doublon géométrique).
  const cLatM = (rb.minLat + rb.maxLat) / 2;
  const lonScaleM = Math.cos(cLatM * Math.PI / 180);
  const mmPerMrebuild = wMm / ((rb.maxLon - rb.minLon) * lonScaleM * 111320);
  let eiffelSuppress: { cx: number; cz: number; rMm: number } | null = null;
  towerMeshRefs = [];
  {
    const eiffel = findNamedMonument('eiffel');
    if (eiffel) {
      const lonFrac = (eiffel.lon - rb.minLon) / (rb.maxLon - rb.minLon);
      const latFrac = (eiffel.lat - rb.minLat) / (rb.maxLat - rb.minLat);
      if (lonFrac >= 0 && lonFrac <= 1 && latFrac >= 0 && latFrac <= 1) {
        const cx = (lonFrac - 0.5) * wMm;
        const cz = (0.5 - latFrac) * dMm;
        if (!lastZonePoly || pointInZone(cx, cz, lastZonePoly)) {
          const elev = sampleElev(workGrid, G, lonFrac, 1 - latFrac);
          const baseZ = baseH + ((elev - minE) / elevRange) * elevScaleMm;
          const prisms = eiffelPrisms(cx, cz, baseZ, mmPerMrebuild);
          const positions: number[] = [], indices: number[] = [];
          for (const p of prisms) prismToThree(p, positions, indices);
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
          geo.setIndex(indices);
          geo.computeVertexNormals();
          const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(colorSlots[layerSlotOverrides['buildings'] ?? 7] ?? '#888888') });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.visible = layerVisible['towers'] ?? true;
          towerMeshRefs.push(mesh);
          add(mesh);
          eiffelSuppress = { cx, cz, rMm: 90 * mmPerMrebuild };
        }
      }
    }
  }

  // ── Building parts (autres monuments 3D : building:part) ────
  if (cachedBuildingParts.length > 0) {
    const visible = layerVisible['buildings'] ?? true;
    for (const m of buildBuildingPartMeshes(
      cachedBuildingParts, rb, workGrid, G, minE, elevRange, wMm, dMm, baseH, elevScaleMm, eiffelSuppress,
    )) {
      m.visible = visible;
      buildingMeshRefs.push(m);
      add(m);
    }
  }

  // ── Towers / landmarks génériques ───────────────────
  if (cachedTowers.length > 0) {
    const visible = layerVisible['towers'] ?? true;
    for (const m of buildTowerMeshes(
      cachedTowers, rb, workGrid, G, minE, elevRange, wMm, dMm, baseH, elevScaleMm, eiffelSuppress,
    )) {
      m.visible = visible;
      towerMeshRefs.push(m);
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
  buildingParts: OSMEl[];
  towers: OSMEl[];
  roads: { hwType: string; geom: GeoPoint[] }[];
}> {
  const empty = { zoneFeatures: [], buildings: [], buildingParts: [], towers: [], roads: [] };
  const { minLat, minLon, maxLat, maxLon } = bounds;
  const bb = `(${minLat},${minLon},${maxLat},${maxLon})`;
  const HW = 'motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street';
  const query = `[out:json][timeout:60][maxsize:536870912];
(
  way["natural"="water"]${bb};
  relation["natural"="water"]${bb};
  way["waterway"="riverbank"]${bb};
  relation["waterway"="riverbank"]${bb};
  way["waterway"~"^(river|canal|stream|ditch)$"]${bb};
  way["landuse"="reservoir"]${bb};
  relation["landuse"="reservoir"]${bb};
  way["landuse"="basin"]${bb};
  way["leisure"~"^(park|garden|pitch|sports_centre)$"]${bb};
  relation["leisure"~"^(park|garden)$"]${bb};
  way["landuse"~"^(park|recreation_ground|village_green|allotments)$"]${bb};
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
  way["building:part"]${bb};
  relation["building:part"]["type"="multipolygon"]${bb};
  way["highway"~"^(${HW})$"]${bb};
  node["man_made"="tower"]${bb};
  way["man_made"="tower"]${bb};
  relation["man_made"="tower"]${bb};
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
    const buildingParts: OSMEl[] = [];
    const towers: OSMEl[] = [];
    const roads: { hwType: string; geom: GeoPoint[] }[] = [];
    for (const el of elements) {
      const tags = el.tags;
      if (!tags) continue;
      if (tags.highway && el.type === 'way' && (el.geometry?.length ?? 0) >= 2) {
        roads.push({ hwType: tags.highway, geom: el.geometry! });
      } else if (tags['man_made'] === 'tower') {
        towers.push(el);
      } else if (tags['building:part']) {
        buildingParts.push(el);
      } else if (tags.building) {
        buildings.push(el);
      } else {
        zoneFeatures.push(el);
      }
    }
    return { zoneFeatures, buildings, buildingParts, towers, roads };
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

    const heightM = parseFloat(el.tags?.['height'] ?? '0');
    const levels = parseFloat(el.tags?.['building:levels'] ?? '0') || 0;
    const mmPerM = wMm / ((maxLon - minLon) * lonScale * 111320);
    const heightMm = heightM > 0
      ? Math.max(buildingMinHeightMm, heightM * mmPerM * buildingHeightScale)
      : Math.max(buildingMinHeightMm, (levels > 0 ? levels : 2) * buildingFloorHeightMm * buildingHeightScale);

    // Centroid in geo coords for elevation sampling
    let sumLon = 0, sumLat = 0;
    for (const p of outer) { sumLon += p.lon; sumLat += p.lat; }
    const cLonFrac = (sumLon / outer.length - minLon) / (maxLon - minLon);
    const cLatFrac = (sumLat / outer.length - minLat) / (maxLat - minLat);

    // Centroid in model coords (for size scaling)
    const cSx = cLonFrac * wMm - wMm / 2;
    const cSy = cLatFrac * dMm - dMm / 2;

    // Skip buildings where too many vertices fall outside the zone polygon
    if (lastZonePoly) {
      let inCount = 0;
      for (const p of outer) {
        const vx = (p.lon - minLon) / (maxLon - minLon) * wMm - wMm / 2;
        const vz = (0.5 - (p.lat - minLat) / (maxLat - minLat)) * dMm;
        if (pointInZone(vx, vz, lastZonePoly)) inCount++;
      }
      if (inCount < outer.length) continue;
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
   MONUMENTS PARAMÉTRIQUES (modèles fidèles)
   Géométrie partagée entre l'aperçu THREE.js et l'export 3MF.
══════════════════════════════════════════════ */

// Un prisme = base[4] + sommet[4] (coins XY en mm) entre deux hauteurs Z.
// Convention : x = sceneX (mm), y = sceneZ/profondeur (mm), z = hauteur (mm).
interface MonPrism { b: [number, number][]; t: [number, number][]; zb: number; zt: number; }

/** Tour Eiffel paramétrique : 4 pieds évasés (arches) + 2 plateformes + corps fuselé + flèche. */
function eiffelPrisms(cx: number, cy: number, baseZ: number, M: number): MonPrism[] {
  const prisms: MonPrism[] = [];
  // Carré centré sur (offX, offY) métres, demi-côté half mètres → 4 coins CCW vus de dessus.
  const sq = (offX: number, offY: number, half: number): [number, number][] => [
    [cx + (offX - half) * M, cy + (offY - half) * M],
    [cx + (offX + half) * M, cy + (offY - half) * M],
    [cx + (offX + half) * M, cy + (offY + half) * M],
    [cx + (offX - half) * M, cy + (offY + half) * M],
  ];
  const Z = (m: number) => baseZ + m * M;
  const corners: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

  // Étage 1 — 4 pieds : pied au sol (écart 50 m, côté 14 m) convergeant vers la 1re plateforme (écart 18 m, côté 9 m)
  for (const [sx, sy] of corners) {
    prisms.push({ b: sq(sx * 50, sy * 50, 7), t: sq(sx * 18, sy * 18, 4.5), zb: Z(0), zt: Z(57) });
  }
  // 1re plateforme (dalle carrée pleine, ~65 m de côté)
  prisms.push({ b: sq(0, 0, 33), t: sq(0, 0, 33), zb: Z(57), zt: Z(62) });
  // Étage 2 — 4 montants : écart 16 m → 9 m
  for (const [sx, sy] of corners) {
    prisms.push({ b: sq(sx * 16, sy * 16, 5), t: sq(sx * 9, sy * 9, 3), zb: Z(62), zt: Z(115) });
  }
  // 2e plateforme (~34 m de côté)
  prisms.push({ b: sq(0, 0, 17), t: sq(0, 0, 17), zb: Z(115), zt: Z(119) });
  // Corps fuselé (tube carré qui se rétrécit)
  prisms.push({ b: sq(0, 0, 10), t: sq(0, 0, 2.2), zb: Z(119), zt: Z(276) });
  // Flèche / antenne
  prisms.push({ b: sq(0, 0, 2.2), t: sq(0, 0, 0.4), zb: Z(276), zt: Z(330) });
  return prisms;
}

/** Émet un prisme en THREE.js (scène : x, y=hauteur, z=profondeur). */
function prismToThree(p: MonPrism, positions: number[], indices: number[]): void {
  const base = positions.length / 3;
  for (const [x, y] of p.b) positions.push(x, p.zb, y);
  for (const [x, y] of p.t) positions.push(x, p.zt, y);
  const quads = [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
  for (const [a, b, c, d] of quads) {
    indices.push(base + a, base + b, base + c, base + a, base + c, base + d);
  }
}

/** Émet un prisme en 3MF (Z-up : x=sceneX, y=sceneZ, z=hauteur). Renvoie XML avec indices locaux 0-7. */
function prismTo3MF(p: MonPrism): { vx: string; nv: number } {
  let vx = '';
  for (const [x, y] of p.b) vx += `<vertex x="${x.toFixed(3)}" y="${y.toFixed(3)}" z="${p.zb.toFixed(3)}"/>`;
  for (const [x, y] of p.t) vx += `<vertex x="${x.toFixed(3)}" y="${y.toFixed(3)}" z="${p.zt.toFixed(3)}"/>`;
  return { vx, nv: 8 };
}

const PRISM_QUADS = [[0, 3, 2, 1], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];

/** Cherche un monument nommé (ex. "eiffel") parmi tours/bâtiments/parties, renvoie son centre géo. */
function findNamedMonument(needle: string): { lon: number; lat: number } | null {
  const scan = (els: OSMEl[]): { lon: number; lat: number } | null => {
    for (const el of els) {
      const nm = (el.tags?.['name'] ?? el.tags?.['name:fr'] ?? el.tags?.['name:en'] ?? '').toLowerCase();
      if (!nm.includes(needle)) continue;
      if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) return { lon: el.lon, lat: el.lat };
      const polys = getOsmPolygons(el);
      if (polys.length && polys[0].length) {
        let sl = 0, sla = 0;
        for (const p of polys[0]) { sl += p.lon; sla += p.lat; }
        return { lon: sl / polys[0].length, lat: sla / polys[0].length };
      }
    }
    return null;
  };
  return scan(cachedTowers) ?? scan(cachedBuildings) ?? scan(cachedBuildingParts);
}

function buildBuildingPartMeshes(
  parts: OSMEl[],
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  wMm: number, dMm: number,
  baseH: number, elevScaleMm: number,
  suppress?: { cx: number; cz: number; rMm: number } | null,
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
  const mmPerM = wMm / ((maxLon - minLon) * lonScale * 111320);

  for (const el of parts) {
    const polys = getOsmPolygons(el);
    if (!polys.length) continue;
    const outer = polys[0];
    if (outer.length < 3) continue;

    const heightM = parseFloat(el.tags?.['height'] ?? '3');
    const minHeightM = parseFloat(el.tags?.['min_height'] ?? '0');
    const heightMm = Math.max(0.1, (heightM - minHeightM) * mmPerM * buildingHeightScale);

    let sumLon = 0, sumLat = 0;
    for (const p of outer) { sumLon += p.lon; sumLat += p.lat; }
    const cLonFrac = (sumLon / outer.length - minLon) / (maxLon - minLon);
    const cLatFrac = (sumLat / outer.length - minLat) / (maxLat - minLat);
    const cSx = (cLonFrac - 0.5) * wMm;
    const cSy = (cLatFrac - 0.5) * dMm;

    // Supprimer les parts couvertes par un monument paramétrique (ex. Tour Eiffel)
    if (suppress) {
      const cz = (0.5 - cLatFrac) * dMm;
      if ((cSx - suppress.cx) ** 2 + (cz - suppress.cz) ** 2 < suppress.rMm ** 2) continue;
    }

    if (lastZonePoly) {
      let inCount = 0;
      for (const p of outer) {
        const vx = (p.lon - minLon) / (maxLon - minLon) * wMm - wMm / 2;
        const vz = (0.5 - (p.lat - minLat) / (maxLat - minLat)) * dMm;
        if (pointInZone(vx, vz, lastZonePoly)) inCount++;
      }
      if (inCount < outer.length) continue;
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
    const yBase = baseH + ((elev - minE) / elevRange) * elevScaleMm + minHeightM * mmPerM * buildingHeightScale;

    const geo = new THREE.ExtrudeGeometry(shape, { depth: heightMm, bevelEnabled: false });
    geo.rotateX(-Math.PI / 2);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.y = yBase;
    meshes.push(mesh);
  }
  return meshes;
}

/* ══════════════════════════════════════════════
   LANDMARK TOWERS (man_made=tower génériques — Eiffel géré séparément)
══════════════════════════════════════════════ */

function buildTowerMeshes(
  towers: OSMEl[],
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  wMm: number, dMm: number,
  baseH: number, elevScaleMm: number,
  suppress?: { cx: number; cz: number; rMm: number } | null,
): THREE.Object3D[] {
  const { minLat, maxLat, minLon, maxLon } = bounds;
  const cLat = (minLat + maxLat) / 2;
  const lonScale = Math.cos(cLat * Math.PI / 180);
  const mmPerM = wMm / ((maxLon - minLon) * lonScale * 111320);
  const color = new THREE.Color(colorSlots[layerSlotOverrides['buildings'] ?? 7] ?? '#888888');
  const mat = new THREE.MeshLambertMaterial({ color });
  const result: THREE.Object3D[] = [];

  for (const el of towers) {
    if (!el.tags) continue;

    // Determine center coordinates
    let cLonFrac: number, cLatFrac: number;
    if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
      cLonFrac = (el.lon - minLon) / (maxLon - minLon);
      cLatFrac = (el.lat - minLat) / (maxLat - minLat);
    } else {
      const polys = getOsmPolygons(el);
      if (!polys.length) continue;
      const outer = polys[0];
      if (!outer.length) continue;
      let sLon = 0, sLat = 0;
      for (const p of outer) { sLon += p.lon; sLat += p.lat; }
      cLonFrac = (sLon / outer.length - minLon) / (maxLon - minLon);
      cLatFrac = (sLat / outer.length - minLat) / (maxLat - minLat);
    }
    if (cLonFrac < 0 || cLonFrac > 1 || cLatFrac < 0 || cLatFrac > 1) continue;

    const cx = (cLonFrac - 0.5) * wMm;
    const cz = (0.5 - cLatFrac) * dMm;
    if (lastZonePoly && !pointInZone(cx, cz, lastZonePoly)) continue;

    // La Tour Eiffel (et tout monument paramétrique) est rendue séparément : on saute
    // la tour générique nommée Eiffel et celles couvertes par le modèle paramétrique.
    const name = (el.tags['name'] ?? el.tags['name:fr'] ?? '').toLowerCase();
    if (name.includes('eiffel')) continue;
    if (suppress && (cx - suppress.cx) ** 2 + (cz - suppress.cz) ** 2 < suppress.rMm ** 2) continue;

    const elev = sampleElev(grid, G, cLonFrac, 1 - cLatFrac);
    const yBase = baseH + ((elev - minE) / elevRange) * elevScaleMm;

    // Tour générique : cylindre légèrement fuselé
    const heightM = parseFloat(el.tags['height'] ?? '30');
    const tH = Math.max(2, heightM * mmPerM);
    const r0 = Math.max(0.5, tH * 0.04);
    const r1 = r0 * 0.4;
    const geo = new THREE.CylinderGeometry(r1, r0, tH, 6);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(cx, yBase + tH / 2, cz);
    result.push(mesh);
  }
  return result;
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
  { id: 'parks', match: t => t.leisure === 'park' || t.leisure === 'garden' || t.leisure === 'pitch' || t.landuse === 'recreation_ground' || t.landuse === 'village_green' || t.landuse === 'allotments', slot: 3, fill: true },
  { id: 'water',          match: t => t.natural === 'water' && (() => { const c = classifyWaterFeature(t); return c === 'water_canal' ? waterwayFeaturesEnabled['canal_polygons'] !== false : waterFeaturesEnabled[c] !== false; })(), slot: 5, fill: true },
  { id: 'reservoir',      match: t => t.landuse === 'reservoir' || t.landuse === 'basin', slot: 5, fill: true },
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

  // Step 1 — couleur de base neutre : terrain nu sur tout le canvas.
  // Les zones OSM (Step 2) peindront leurs couleurs spécifiques par-dessus.
  // Sans hillshade, mélanger élévation + zones OSM créait des conflits de couleurs.
  ctx.fillStyle = colorSlots[layerSlotOverrides['base'] ?? 1] ?? '#c0af88';
  ctx.fillRect(0, 0, S, S);

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

  // Step 2b — zone boundary strokes for crisp, vectorized zone edges
  for (const layer of ZONE_LAYERS) {
    if (!layer.fill) continue;
    if (!layerVisible[layer.id]) continue;
    const layerEls = features.filter(el => {
      if (!el.tags || !layer.match(el.tags)) return false;
      if (minAreaM2 > 0) return computeFeatureAreaM2(el, lonScale) >= minAreaM2;
      return true;
    });
    if (!layerEls.length) continue;
    const effectiveSlot = layerSlotOverrides[layer.id] ?? layer.slot;
    const baseHex = colorSlots[effectiveSlot] ?? '#888';
    // Darker shade of zone color for contour lines
    const bc = parseInt(baseHex.replace('#', ''), 16);
    const r2 = Math.round(((bc >> 16) & 0xff) * 0.65);
    const g2 = Math.round(((bc >> 8)  & 0xff) * 0.65);
    const b2 = Math.round(( bc        & 0xff) * 0.65);
    const strokeCol = `rgb(${r2},${g2},${b2})`;
    ctx.beginPath();
    for (const el of layerEls) traceGeometry(ctx, el, bounds, S);
    ctx.strokeStyle = strokeCol;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  // Step 3 — routes — road lines painted on shaded terrain (texture pass, before waterways)
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
      const lw = (ww === 'river' ? 7 : ww === 'canal' ? 6 : ww === 'stream' ? 5 : 4) * waterwayLineWidth;
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
   InstancedMesh de colonnes (voxels) : chaque colonne de la grille
   va du plan de base jusqu'à la hauteur quantifiée au pas de couche.
   La couleur de chaque colonne est échantillonnée depuis la texture
   de zones baked (zones OSM + hillshade).
══════════════════════════════════════════════ */
let printPreviewGroup: THREE.Group | null = null;
let printPreviewActive = false;

/** Supersampling 4× de la texture baked.
 *  Pour chaque case de la grille de sortie, on examine tous les sous-pixels
 *  haute résolution : si l'un d'eux est bleu dominant (cours d'eau), on
 *  utilise sa couleur plutôt que la moyenne — cela préserve les traits fins.
 *  Doit être appelé AVANT clearPrintPreview. */
function sampleTexturePixels(vgrid: number): Uint8ClampedArray | null {
  if (!cachedTexture) return null;
  try {
    const SS   = 4;
    const bigN = Math.min(vgrid * SS, 2048);
    const step = bigN / vgrid;

    const cv = document.createElement('canvas');
    cv.width = cv.height = bigN;
    const ctx = cv.getContext('2d')!;
    ctx.drawImage(cachedTexture.image as CanvasImageSource, 0, 0, bigN, bigN);
    const big = ctx.getImageData(0, 0, bigN, bigN).data;

    // Couleur de base
    const baseHexRaw = colorSlots[layerSlotOverrides['base'] ?? 1] ?? '#c0af88';
    const baseC = parseInt(baseHexRaw.replace('#', ''), 16);
    const bR = (baseC >> 16) & 0xff, bG = (baseC >> 8) & 0xff, bB = baseC & 0xff;
    // Couleur route : exclue de la moyenne et de la détection spéciale
    // (les routes sont rendues comme tubes de surface, pas comme voxels colorés)
    const roadHex = colorSlots[layerSlotOverrides['roads'] ?? 8] ?? '#262626';
    const roadC2 = parseInt(roadHex.replace('#', ''), 16);
    const roR = (roadC2 >> 16) & 0xff, roG = (roadC2 >> 8) & 0xff, roB = roadC2 & 0xff;

    const result = new Uint8ClampedArray(vgrid * vgrid * 4);
    for (let vj = 0; vj < vgrid; vj++) {
      const y0 = Math.floor(vj * step);
      const y1 = Math.min(Math.ceil((vj + 1) * step), bigN);
      for (let vi = 0; vi < vgrid; vi++) {
        const x0 = Math.floor(vi * step);
        const x1 = Math.min(Math.ceil((vi + 1) * step), bigN);
        let sumR = 0, sumG = 0, sumB = 0, n = 0;
        let wR = 0, wG = 0, wB = 0, hasWater = false;
        let spR = 0, spG = 0, spB = 0, spBestD = 0;
        for (let sy = y0; sy < y1; sy++) {
          for (let sx = x0; sx < x1; sx++) {
            const pi = (sy * bigN + sx) * 4;
            const r = big[pi], g = big[pi+1], b = big[pi+2];
            // Ignorer les pixels de couleur route (rendus séparément comme tubes)
            if ((r-roR)**2 + (g-roG)**2 + (b-roB)**2 < 1500) continue;
            sumR += r; sumG += g; sumB += b; n++;
            if (!hasWater && b > r + 25 && b > g + 25 && b > 70) {
              wR = r; wG = g; wB = b; hasWater = true;
            }
            if (!hasWater) {
              const d = (r - bR) ** 2 + (g - bG) ** 2 + (b - bB) ** 2;
              if (d > 600 && d > spBestD) { spBestD = d; spR = r; spG = g; spB = b; }
            }
          }
        }
        if (n === 0) { sumR = bR; sumG = bG; sumB = bB; n = 1; } // voxel entièrement route
        const out = (vj * vgrid + vi) * 4;
        const useR = hasWater ? wR : spBestD > 0 ? spR : sumR / n;
        const useG = hasWater ? wG : spBestD > 0 ? spG : sumG / n;
        const useB = hasWater ? wB : spBestD > 0 ? spB : sumB / n;
        result[out] = useR; result[out+1] = useG; result[out+2] = useB; result[out+3] = 255;
      }
    }

    // Dilatation eau uniquement (2 passes) : comble les lacunes de cours d'eau fins
    // en diagonale. Les routes/zones gardent leur taille réelle (pas de dilatation
    // générale pour éviter de les épaissir artificiellement dans l'aperçu).
    const waterMask = new Uint8Array(vgrid * vgrid);
    for (let i = 0; i < vgrid * vgrid; i++) {
      const b = result[i*4+2], r = result[i*4], g = result[i*4+1];
      if (b > r + 25 && b > g + 25 && b > 70) waterMask[i] = 1;
    }
    const dirs: [number, number][] = [[-1,0],[1,0],[0,-1],[0,1]];
    // 1 passe : suffit pour combler les lacunes diagonales dans les cours d'eau fins.
    // 2 passes causeraient des débordements de 2 voxels sur les berges.
    // IMPORTANT : on accumule dans toAdd et on l'applique APRÈS la passe,
    // pour éviter le flood-fill (expansion en cascade dans la même passe).
    for (let pass = 0; pass < 1; pass++) {
      const toAdd = new Uint8Array(vgrid * vgrid);
      for (let vj = 0; vj < vgrid; vj++) {
        for (let vi = 0; vi < vgrid; vi++) {
          if (!waterMask[vj * vgrid + vi]) continue;
          const src = (vj * vgrid + vi) * 4;
          for (const [dj, di] of dirs) {
            const nj = vj + dj, ni = vi + di;
            if (nj < 0 || nj >= vgrid || ni < 0 || ni >= vgrid || waterMask[nj * vgrid + ni]) continue;
            const no = (nj * vgrid + ni) * 4;
            // Ne dilater que dans les pixels non-route (la végétation est OK)
            const tR = result[no], tG = result[no+1], tB = result[no+2];
            if ((tR-roR)**2 + (tG-roG)**2 + (tB-roB)**2 < 1500) continue;
            result[no] = result[src]; result[no+1] = result[src+1]; result[no+2] = result[src+2];
            toAdd[nj * vgrid + ni] = 1;
          }
        }
      }
      for (let i = 0; i < vgrid * vgrid; i++) if (toAdd[i]) waterMask[i] = 1;
    }
    return result;
  } catch {
    return null;
  }
}

/** Construit les routes de l'aperçu comme des tubes sur la surface du terrain (identique au GPX). */
function buildRoadPreviewLines(
  roads: { hwType: string; geom: GeoPoint[] }[],
  bounds: LatLonBounds,
  wMm: number, dMm: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number, baseH: number, elevScaleMm: number,
): THREE.Group {
  const group = new THREE.Group();
  const roadSlot = layerSlotOverrides['roads'] ?? 8;
  const col = colorSlots[roadSlot] ?? '#262626';
  const radius = 0.21;
  const yLift = radius + 0.05;
  const mat = new THREE.MeshLambertMaterial({ color: col });

  for (const road of roads) {
    if (!road.geom || road.geom.length < 2) continue;
    const rawPts: THREE.Vector3[] = road.geom.map(p => {
      const u = Math.max(0.0005, Math.min(0.9995, (p.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)));
      const v = Math.max(0.0005, Math.min(0.9995, (p.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)));
      const x = (u - 0.5) * wMm, z = (0.5 - v) * dMm;
      return new THREE.Vector3(x, sampleTerrainY(x, z, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm, yLift), z);
    });

    const DENSIFY_MM = 2.0;
    const pts: THREE.Vector3[] = [rawPts[0]];
    for (let i = 0; i < rawPts.length - 1; i++) {
      const a = rawPts[i], b = rawPts[i + 1];
      const dx = b.x - a.x, dz = b.z - a.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const steps = Math.max(1, Math.floor(dist / DENSIFY_MM));
      for (let j = 1; j <= steps; j++) {
        const t = j / steps;
        const mx = a.x + dx * t, mz = a.z + dz * t;
        const my = sampleTerrainY(mx, mz, wMm, dMm, grid, G, minE, elevRange, baseH, elevScaleMm, yLift);
        const np = new THREE.Vector3(mx, my, mz);
        if (np.distanceTo(pts[pts.length - 1]) >= 0.1) pts.push(np);
      }
    }
    if (pts.length < 2) continue;

    try {
      const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal');
      const nSeg = Math.min(200, pts.length * 3);
      const tube = new THREE.TubeGeometry(curve, nSeg, radius, 5, false);
      group.add(new THREE.Mesh(tube, mat));
    } catch { /* skip degenerate curves */ }
  }
  return group;
}

export function buildPrintPreview(layerHeightMm = 0.20): void {
  if (!scene || !terrainMeshRef || !cachedElev) return;

  const lh       = Math.max(0.01, layerHeightMm);
  const wMm      = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;
  const { minE, elevRange } = cachedElev;
  const G        = PREVIEW_GRID;
  const workGrid = lastWorkGrid ?? cachedElev.grid;

  // Résolution dynamique : ~0.33 mm par case, plafonné à 700 pour le détail
  const VGRID  = Math.min(700, Math.max(150, Math.round(Math.max(wMm, dMm) / 0.33)));
  const voxelW = wMm / VGRID;
  const voxelD = dMm / VGRID;

  // Lecture pixels AVANT de modifier la scène : si drawImage échoue on utilise
  // une couleur par défaut mais les voxels s'affichent quand même.
  const pixels = sampleTexturePixels(VGRID);
  const defCol = new THREE.Color(colorSlots[layerSlotOverrides['veg_low'] ?? 3] ?? '#8ab858');

  clearPrintPreview();
  printPreviewActive = true;

  const count  = VGRID * VGRID;
  // Colonnes jointives (1.0) : pas de bords gris entre cases de même hauteur,
  // les marches de couches restent visibles aux transitions de hauteur.
  const boxGeo = new THREE.BoxGeometry(voxelW, 1, voxelD);
  const mat    = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const iMesh  = new THREE.InstancedMesh(boxGeo, mat, count);

  const dummy = new THREE.Object3D();
  const col   = new THREE.Color();

  for (let vj = 0, idx = 0; vj < VGRID; vj++) {
    for (let vi = 0; vi < VGRID; vi++, idx++) {
      const u  = (vi + 0.5) / VGRID;
      const v  = (vj + 0.5) / VGRID;
      const cx = (u - 0.5) * wMm;
      const cz = (0.5 - v) * dMm;

      if (lastZonePoly && !pointInZone(cx, cz, lastZonePoly)) {
        dummy.scale.setScalar(0);
        dummy.position.set(cx, baseH, cz);
        dummy.updateMatrix();
        iMesh.setMatrixAt(idx, dummy.matrix);
        dummy.scale.setScalar(1);
        continue;
      }

      const elev = sampleElev(workGrid, G, u, 1 - v);
      let yRaw = ((elev - minE) / elevRange) * elevScaleMm;

      let pr = 0, pg = 0, pb = 0, isWater = false;
      if (pixels) {
        const pi = ((VGRID - 1 - vj) * VGRID + vi) * 4;
        pr = pixels[pi]; pg = pixels[pi + 1]; pb = pixels[pi + 2];
        isWater = pb > pr + 25 && pb > pg + 25 && pb > 70;

        // Eau → aplatir à l'élévation min des voisins bleus pour éviter les rives bleues
        if (isWater) {
          for (const [dj, di] of [[-1,0],[1,0],[0,-1],[0,1]] as [number,number][]) {
            const nj = vj + dj, ni = vi + di;
            if (nj < 0 || nj >= VGRID || ni < 0 || ni >= VGRID) continue;
            const npi = ((VGRID - 1 - nj) * VGRID + ni) * 4;
            const nb = pixels[npi + 2], nr = pixels[npi], ng = pixels[npi + 1];
            if (nb > nr + 25 && nb > ng + 25 && nb > 70) {
              const nu = (ni + 0.5) / VGRID, nv = (nj + 0.5) / VGRID;
              yRaw = Math.min(yRaw, ((sampleElev(workGrid, G, nu, 1 - nv) - minE) / elevRange) * elevScaleMm);
            }
          }
        }
      }
      const yQ = Math.max(lh, Math.ceil(yRaw / lh) * lh - (isWater ? 2 * lh : 0));

      dummy.position.set(cx, baseH + yQ / 2, cz);
      dummy.scale.set(1, yQ, 1);
      dummy.updateMatrix();
      iMesh.setMatrixAt(idx, dummy.matrix);

      if (pixels && !isWater) {
        // Hillshade depuis le gradient d'élévation local (soleil NW, azimuth 315°)
        const du = 1.0 / VGRID;
        const ex = sampleElev(workGrid, G, Math.min(0.9999, u + du), 1 - v);
        const ez = sampleElev(workGrid, G, u, 1 - Math.min(0.9999, v + du));
        const sx = (ex - elev) * elevScaleMm / elevRange / (wMm / VGRID);
        const sz = (ez - elev) * elevScaleMm / elevRange / (dMm / VGRID);
        const hs = Math.max(0.70, Math.min(1.30, 1.0 + sx * 0.5 - sz * 0.35));
        col.setRGB(Math.min(1, pr / 255 * hs), Math.min(1, pg / 255 * hs), Math.min(1, pb / 255 * hs));
      } else if (pixels) {
        col.setRGB(pr / 255, pg / 255, pb / 255);
      } else {
        col.copy(defCol);
      }
      iMesh.setColorAt(idx, col);
    }
  }

  iMesh.instanceMatrix.needsUpdate = true;
  if (iMesh.instanceColor) iMesh.instanceColor.needsUpdate = true;

  printPreviewGroup = new THREE.Group();
  printPreviewGroup.add(iMesh);

  // Routes comme tubes sur la surface (identique à la trace GPX)
  if ((layerVisible['roads'] ?? true) && cachedRoads.length > 0 && cachedElev) {
    const rb = cachedElev.bounds;
    const roadLines = buildRoadPreviewLines(
      cachedRoads, rb, wMm, dMm, workGrid, G, minE, elevRange, baseH, elevScaleMm,
    );
    printPreviewGroup.add(roadLines);
  }

  scene.add(printPreviewGroup);
  sceneObjs.push(printPreviewGroup);

  terrainMeshRef.visible = false;
  for (const m of zoneMeshRefs) m.visible = false;
  if (roadMeshGroup) roadMeshGroup.visible = false;
  if (lineMeshGroup) lineMeshGroup.visible = false;
}

/**
 * Construit une carte de slots à la résolution VGRID×VGRID pour l'export 3MF.
 * Contrairement à sampleTexturePixels (qui réduit la texture visuelle et perd les
 * traits fins), buildSlotMap dessine directement à l'échelle voxel : routes et cours
 * d'eau font 2-4 pixels = 2-4 voxels, garantissant leur détection par nearestSlot.
 */
function buildSlotMap(VGRID: number): Uint8ClampedArray | null {
  if (!cachedElev) return null;
  const { bounds } = cachedElev;
  const S = VGRID;
  const cv = document.createElement('canvas');
  cv.width = cv.height = S;
  const ctx = cv.getContext('2d', { willReadFrequently: true })!;

  // Couleur de base
  ctx.fillStyle = colorSlots[layerSlotOverrides['base'] ?? 1] ?? '#c0af88';
  ctx.fillRect(0, 0, S, S);

  // Zones OSM (polygones remplis)
  for (const layer of ZONE_LAYERS) {
    if (!layer.fill || !layerVisible[layer.id]) continue;
    const layerEls = (cachedFeatures ?? []).filter(el => el.tags && layer.match(el.tags));
    if (!layerEls.length) continue;
    const col = colorSlots[layerSlotOverrides[layer.id] ?? layer.slot] ?? '#888';
    ctx.fillStyle = col;
    ctx.beginPath();
    for (const el of layerEls) traceGeometry(ctx, el, bounds, S);
    ctx.fill('evenodd');
  }

  // Bâtiments (empreintes polygonales)
  if ((layerVisible['buildings'] ?? true) && cachedBuildings.length > 0) {
    ctx.fillStyle = colorSlots[layerSlotOverrides['buildings'] ?? 7] ?? '#b8b8b8';
    ctx.beginPath();
    for (const el of cachedBuildings) {
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

  // Cours d'eau (lignes 1-2 px = 1-2 voxels ; dilatation ci-dessous complète à 3 voxels)
  for (const layer of ZONE_LAYERS) {
    if (layer.fill || !(layerVisible[layer.id] ?? true)) continue;
    const layerEls = (cachedFeatures ?? []).filter(el => el.tags && layer.match(el.tags));
    if (!layerEls.length) continue;
    const col = colorSlots[layerSlotOverrides[layer.id] ?? layer.slot] ?? '#888';
    for (const el of layerEls) {
      if (!el.tags) continue;
      const ww = el.tags.waterway ?? '';
      const lw = ww === 'river' ? 2 : 1;
      ctx.beginPath();
      traceGeometry(ctx, el, bounds, S);
      ctx.strokeStyle = col; ctx.lineWidth = lw;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    }
  }

  // Routes (lignes 3 px pour bien dépasser le seuil nearestSlot)
  if ((layerVisible['roads'] ?? true) && cachedRoads.length > 0) {
    ctx.strokeStyle = colorSlots[layerSlotOverrides['roads'] ?? 8] ?? '#262626';
    ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const road of cachedRoads) {
      ctx.beginPath();
      let first = true;
      for (const p of road.geom) {
        const cx = (p.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * S;
        const cy = (1 - (p.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * S;
        if (first) { ctx.moveTo(cx, cy); first = false; } else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }
  }

  // Trace GPX (slot 6, rouge) — dessiné en dernier pour dominer
  if ((layerVisible['gpx'] ?? true) && lastGpxPoints.length >= 2) {
    ctx.strokeStyle = colorSlots[layerSlotOverrides['gpx'] ?? 6] ?? '#ff4500';
    ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let i = 0; i < lastGpxPoints.length; i++) {
      const gp = lastGpxPoints[i];
      const cx = (gp.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * S;
      const cy = (1 - (gp.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * S;
      if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
    }
    ctx.stroke();
  }

  // Dilatation 1-ring : les traits fins (1-2 px) s'étendent à leurs voisins
  const raw = ctx.getImageData(0, 0, S, S).data;
  const bC = parseInt((colorSlots[layerSlotOverrides['base'] ?? 1] ?? '#c0af88').replace('#', ''), 16);
  const bR = (bC >> 16) & 0xff, bG = (bC >> 8) & 0xff, bB = bC & 0xff;
  const result = new Uint8ClampedArray(raw);
  const mask = new Uint8Array(S * S);
  for (let i = 0; i < S * S; i++) {
    const d = (raw[i*4]-bR)**2 + (raw[i*4+1]-bG)**2 + (raw[i*4+2]-bB)**2;
    if (d > 400) mask[i] = 1;
  }
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    if (!mask[y*S+x]) continue;
    const src = (y*S+x)*4;
    for (const [dy, dx] of [[-1,0],[1,0],[0,-1],[0,1]] as [number,number][]) {
      const ny = y+dy, nx = x+dx;
      if (ny < 0 || ny >= S || nx < 0 || nx >= S || mask[ny*S+nx]) continue;
      const no = (ny*S+nx)*4;
      result[no] = raw[src]; result[no+1] = raw[src+1]; result[no+2] = raw[src+2];
    }
  }
  return result;
}

/* ══════════════════════════════════════════════
   EXPORT 3MF — depuis l'aperçu dims preview
   Base + façades (THREE.js mesh) + terrain en voxels
   colorés groupés par slot de filament.
══════════════════════════════════════════════ */
export async function exportDimsPreview3MF(filename?: string): Promise<void> {
  if (!cachedElev || !cachedTexture) {
    alert('Ouvrez d\'abord l\'onglet "Aperçu" pour générer la prévisualisation.'); return;
  }

  const lh = 0.20;
  const wMm = lastW, dMm = lastD, baseH = lastBaseH, elevScaleMm = lastElevScale;
  const { minE, elevRange } = cachedElev;
  const G = PREVIEW_GRID;
  const workGrid = lastWorkGrid ?? cachedElev.grid;
  // ~0.67 mm/case pour un rendu fidèle à l'aperçu, max 300 colonnes
  const VGRID = Math.min(300, Math.max(80, Math.round(Math.max(wMm, dMm) / 0.67)));
  const vW = wMm / VGRID, vD = dMm / VGRID;

  // buildSlotMap dessine à la résolution VGRID avec des lignes épaisses (3px = 3 voxels).
  // Bien plus précis que sampleTexturePixels qui réduit la texture visuelle et perd les traits fins.
  const pixels = buildSlotMap(VGRID);

  function nearestSlot(r: number, g: number, b: number): number {
    let best = 1, bd = Infinity;
    for (const [k, hex] of Object.entries(colorSlots)) {
      const c = new THREE.Color(hex);
      const d = (c.r - r / 255) ** 2 + (c.g - g / 255) ** 2 + (c.b - b / 255) ** 2;
      if (d < bd) { bd = d; best = Number(k); }
    }
    return best;
  }

  // Première passe : construction de la grille complète
  interface CellData { slot: number; h: number; }
  const allCells = new Map<string, CellData>();
  const bySlot = new Map<number, Map<string, number>>();  // slot → (key → hauteur)

  for (let vj = 0; vj < VGRID; vj++) {
    for (let vi = 0; vi < VGRID; vi++) {
      const u = (vi + 0.5) / VGRID, v = (vj + 0.5) / VGRID;
      const cx = (u - 0.5) * wMm, cz = (0.5 - v) * dMm;
      if (lastZonePoly && !pointInZone(cx, cz, lastZonePoly)) continue;
      const elev = sampleElev(workGrid, G, u, 1 - v);
      const yRaw = ((elev - minE) / elevRange) * elevScaleMm;
      const pif = ((VGRID - 1 - vj) * VGRID + vi) * 4;
      let slot = 1;
      if (pixels) {
        const pr = pixels[pif], pg = pixels[pif + 1], pb = pixels[pif + 2];
        slot = nearestSlot(pr, pg, pb);
      }
      const yQ = Math.max(lh, Math.ceil(yRaw / lh) * lh);
      const key = `${vi},${vj}`;
      allCells.set(key, { slot, h: yQ });
      if (!bySlot.has(slot)) bySlot.set(slot, new Map());
      bySlot.get(slot)!.set(key, yQ);
    }
  }

  // Maillage manifold : 1 solide watertight par slot, sans faces internes.
  // Chaque colonne va du plateau (z=0) au sommet (z=baseH+h).
  // Parois latérales uniquement aux frontières de slot ou aux marches de hauteur.
  // Ordre de winding vérifié pour normales sortantes (règle de la main droite, 3MF Z-up).
  function buildSlotMesh(slot: number, slotCells: Map<string, number>): { vx: string; tr: string } {
    let vx = '', tr = '';
    let vc = 0;

    // quad(a,b,c,d) → tri(a,b,c) + tri(a,c,d)
    function quad(
      ax: number, ay: number, az: number,
      bx: number, by: number, bz: number,
      cx: number, cy: number, cz: number,
      dx: number, dy: number, dz: number
    ) {
      vx += `<vertex x="${ax.toFixed(3)}" y="${ay.toFixed(3)}" z="${az.toFixed(3)}"/>` +
            `<vertex x="${bx.toFixed(3)}" y="${by.toFixed(3)}" z="${bz.toFixed(3)}"/>` +
            `<vertex x="${cx.toFixed(3)}" y="${cy.toFixed(3)}" z="${cz.toFixed(3)}"/>` +
            `<vertex x="${dx.toFixed(3)}" y="${dy.toFixed(3)}" z="${dz.toFixed(3)}"/>`;
      tr += `<triangle v1="${vc}" v2="${vc+1}" v3="${vc+2}"/>` +
            `<triangle v1="${vc}" v2="${vc+2}" v3="${vc+3}"/>`;
      vc += 4;
    }

    for (const [key, h] of slotCells) {
      const [vi, vj] = key.split(',').map(Number);
      const u = (vi + 0.5) / VGRID, vc_v = (vj + 0.5) / VGRID;
      const cx = (u - 0.5) * wMm, czv = (0.5 - vc_v) * dMm;
      // 3MF Z-up : x=sceneX, y=sceneZ, z=sceneY(hauteur)
      const x0 = cx - vW / 2, x1 = cx + vW / 2;
      const y0 = czv - vD / 2, y1 = czv + vD / 2;
      // Les colonnes de terrain commencent AU-DESSUS de la plaque de base
      const zBot = baseH, zTop = baseH + h;

      // Face supérieure (+Z)
      quad(x0,y0,zTop, x1,y0,zTop, x1,y1,zTop, x0,y1,zTop);
      // Face inférieure (-Z)
      quad(x0,y1,zBot, x1,y1,zBot, x1,y0,zBot, x0,y0,zBot);

      // Voisin +X (vi+1, vj)
      const nx = allCells.get(`${vi+1},${vj}`);
      if (!nx || nx.slot !== slot) {
        quad(x1,y0,zBot, x1,y1,zBot, x1,y1,zTop, x1,y0,zTop);
      } else if (nx.h < h) {
        const zS = baseH + nx.h;
        quad(x1,y0,zS, x1,y1,zS, x1,y1,zTop, x1,y0,zTop);
      }

      // Voisin -X (vi-1, vj)
      const px = allCells.get(`${vi-1},${vj}`);
      if (!px || px.slot !== slot) {
        quad(x0,y1,zBot, x0,y0,zBot, x0,y0,zTop, x0,y1,zTop);
      } else if (px.h < h) {
        const zS = baseH + px.h;
        quad(x0,y1,zS, x0,y0,zS, x0,y0,zTop, x0,y1,zTop);
      }

      // Voisin +Y (vj-1, cz croissant)
      const py = allCells.get(`${vi},${vj-1}`);
      if (!py || py.slot !== slot) {
        quad(x1,y1,zBot, x0,y1,zBot, x0,y1,zTop, x1,y1,zTop);
      } else if (py.h < h) {
        const zS = baseH + py.h;
        quad(x1,y1,zS, x0,y1,zS, x0,y1,zTop, x1,y1,zTop);
      }

      // Voisin -Y (vj+1, cz décroissant)
      const ny = allCells.get(`${vi},${vj+1}`);
      if (!ny || ny.slot !== slot) {
        quad(x0,y0,zBot, x1,y0,zBot, x1,y0,zTop, x0,y0,zTop);
      } else if (ny.h < h) {
        const zS = baseH + ny.h;
        quad(x0,y0,zS, x1,y0,zS, x1,y0,zTop, x0,y0,zTop);
      }
    }
    return { vx, tr };
  }

  if (!bySlot.size) { alert('Aucune donnée à exporter.'); return; }

  interface Obj3 { id: number; slot: number; name: string; col: string; vx: string; tr: string; }
  const objects: Obj3[] = [];
  let oid = 1;

  // Plaque de base : boîte plate couvrant toute l'empreinte, Z=0→baseH, slot 1
  {
    const x0 = -wMm / 2, x1 = wMm / 2, y0 = -dMm / 2, y1 = dMm / 2;
    const bH = baseH;
    let vx = '', tr = '', vc = 0;
    function bq(ax: number, ay: number, az: number, bx: number, by: number, bz: number,
                cx: number, cy: number, cz: number, dx: number, dy: number, dz: number) {
      vx += `<vertex x="${ax.toFixed(3)}" y="${ay.toFixed(3)}" z="${az.toFixed(3)}"/>` +
            `<vertex x="${bx.toFixed(3)}" y="${by.toFixed(3)}" z="${bz.toFixed(3)}"/>` +
            `<vertex x="${cx.toFixed(3)}" y="${cy.toFixed(3)}" z="${cz.toFixed(3)}"/>` +
            `<vertex x="${dx.toFixed(3)}" y="${dy.toFixed(3)}" z="${dz.toFixed(3)}"/>`;
      tr += `<triangle v1="${vc}" v2="${vc+1}" v3="${vc+2}"/><triangle v1="${vc}" v2="${vc+2}" v3="${vc+3}"/>`;
      vc += 4;
    }
    bq(x0,y0,bH, x1,y0,bH, x1,y1,bH, x0,y1,bH);  // top  +Z
    bq(x0,y1,0,  x1,y1,0,  x1,y0,0,  x0,y0,0);    // bot  -Z
    bq(x1,y0,0,  x1,y1,0,  x1,y1,bH, x1,y0,bH);   // +X
    bq(x0,y1,0,  x0,y0,0,  x0,y0,bH, x0,y1,bH);   // -X
    bq(x1,y1,0,  x0,y1,0,  x0,y1,bH, x1,y1,bH);   // +Y
    bq(x0,y0,0,  x1,y0,0,  x1,y0,bH, x0,y0,bH);   // -Y
    const baseSlot = layerSlotOverrides['base'] ?? 1;
    const baseCol = (colorSlots[baseSlot] ?? '#c0af88').replace('#', '');
    objects.push({ id: oid++, slot: baseSlot, name: 'base_plate', col: baseCol, vx, tr });
  }

  const SLOT_NAMES: Record<number, string> = {
    1: 'terrain_nu', 2: 'neige', 3: 'vegetation_basse', 4: 'vegetation_dense',
    5: 'eau', 6: 'gpx', 7: 'batiments', 8: 'routes',
  };
  for (const [slot, slotCells] of bySlot) {
    if (slotCells.size < 5) continue; // ignore pixels isolés (bruit de correspondance couleur)
    const { vx, tr } = buildSlotMesh(slot, slotCells);
    const name = SLOT_NAMES[slot] ?? `couche_${slot}`;
    if (tr) objects.push({ id: oid++, slot, name, col: (colorSlots[slot] ?? '#888888').replace('#', ''), vx, tr });
  }

  // ── Monuments 3D dans le 3MF ──
  if (cachedElev) {
    const { minLat: bMinLat, maxLat: bMaxLat, minLon: bMinLon, maxLon: bMaxLon } = cachedElev.bounds;
    const cLat3 = (bMinLat + bMaxLat) / 2;
    const lonScale3 = Math.cos(cLat3 * Math.PI / 180);
    const mmPerM3 = wMm / ((bMaxLon - bMinLon) * lonScale3 * 111320);
    const monSlot = layerSlotOverrides['buildings'] ?? 7;
    const monCol = (colorSlots[monSlot] ?? '#888888').replace('#', '');

    // Émet un ensemble de prismes en XML 3MF (indices locaux par prisme, décalés).
    function prismsTo3MF(prisms: MonPrism[]): { vx: string; tr: string } {
      let vx = '', tr = '', base = 0;
      for (const p of prisms) {
        const { vx: pvx, nv } = prismTo3MF(p);
        vx += pvx;
        for (const [a, b, c, d] of PRISM_QUADS) {
          tr += `<triangle v1="${base + a}" v2="${base + b}" v3="${base + c}"/>` +
                `<triangle v1="${base + a}" v2="${base + c}" v3="${base + d}"/>`;
        }
        base += nv;
      }
      return { vx, tr };
    }

    // ── Tour Eiffel paramétrique ──
    let eiffelSup3: { cx: number; cz: number; rMm: number } | null = null;
    const eiffel3 = findNamedMonument('eiffel');
    if (eiffel3) {
      const lonFrac = (eiffel3.lon - bMinLon) / (bMaxLon - bMinLon);
      const latFrac = (eiffel3.lat - bMinLat) / (bMaxLat - bMinLat);
      if (lonFrac >= 0 && lonFrac <= 1 && latFrac >= 0 && latFrac <= 1) {
        const cx = (lonFrac - 0.5) * wMm;
        const cz = (0.5 - latFrac) * dMm;
        if (!lastZonePoly || pointInZone(cx, cz, lastZonePoly)) {
          const elev = sampleElev(workGrid, G, lonFrac, 1 - latFrac);
          const baseZ = baseH + ((elev - minE) / elevRange) * elevScaleMm;
          const { vx, tr } = prismsTo3MF(eiffelPrisms(cx, cz, baseZ, mmPerM3));
          if (tr) objects.push({ id: oid++, slot: monSlot, name: 'tour_eiffel', col: monCol, vx, tr });
          eiffelSup3 = { cx, cz, rMm: 90 * mmPerM3 };
        }
      }
    }

    // ── Autres monuments : building:part extrudés (prisme par polygone) ──
    if (cachedBuildingParts.length > 0) {
      let pvx = '', ptr = '', pbase = 0;
      for (const el of cachedBuildingParts) {
        const polys = getOsmPolygons(el);
        if (!polys.length) continue;
        const outer = polys[0];
        if (outer.length < 3) continue;

        // Centre + suppression Eiffel
        let sLon = 0, sLat = 0;
        for (const p of outer) { sLon += p.lon; sLat += p.lat; }
        const cLonF = (sLon / outer.length - bMinLon) / (bMaxLon - bMinLon);
        const cLatF = (sLat / outer.length - bMinLat) / (bMaxLat - bMinLat);
        const pcx = (cLonF - 0.5) * wMm, pcz = (0.5 - cLatF) * dMm;
        if (eiffelSup3 && (pcx - eiffelSup3.cx) ** 2 + (pcz - eiffelSup3.cz) ** 2 < eiffelSup3.rMm ** 2) continue;

        // Tous les sommets dans la zone
        let allIn = true;
        const ring: [number, number][] = [];
        for (const p of outer) {
          const vx = (p.lon - bMinLon) / (bMaxLon - bMinLon) * wMm - wMm / 2;
          const vz = (0.5 - (p.lat - bMinLat) / (bMaxLat - bMinLat)) * dMm;
          ring.push([vx, vz]);
          if (lastZonePoly && !pointInZone(vx, vz, lastZonePoly)) allIn = false;
        }
        if (!allIn) continue;

        const heightM = parseFloat(el.tags?.['height'] ?? '6');
        const minHeightM = parseFloat(el.tags?.['min_height'] ?? '0');
        const elevP = sampleElev(workGrid, G, cLonF, 1 - cLatF);
        const zGround = baseH + ((elevP - minE) / elevRange) * elevScaleMm;
        const zBot = zGround + minHeightM * mmPerM3 * buildingHeightScale;
        const zTop = zBot + Math.max(0.2, (heightM - minHeightM) * mmPerM3 * buildingHeightScale);

        // Prisme polygonal : n sommets bas + n sommets haut, murs + capuchons en éventail
        const n = ring.length;
        for (const [x, y] of ring) pvx += `<vertex x="${x.toFixed(3)}" y="${y.toFixed(3)}" z="${zBot.toFixed(3)}"/>`;
        for (const [x, y] of ring) pvx += `<vertex x="${x.toFixed(3)}" y="${y.toFixed(3)}" z="${zTop.toFixed(3)}"/>`;
        for (let i = 0; i < n; i++) {
          const j = (i + 1) % n;
          // mur (i, j, n+j, n+i)
          ptr += `<triangle v1="${pbase + i}" v2="${pbase + j}" v3="${pbase + n + j}"/>` +
                 `<triangle v1="${pbase + i}" v2="${pbase + n + j}" v3="${pbase + n + i}"/>`;
        }
        for (let i = 1; i < n - 1; i++) {
          // toit (éventail depuis sommet 0)
          ptr += `<triangle v1="${pbase + n}" v2="${pbase + n + i}" v3="${pbase + n + i + 1}"/>`;
          // sol (éventail inversé)
          ptr += `<triangle v1="${pbase}" v2="${pbase + i + 1}" v3="${pbase + i}"/>`;
        }
        pbase += 2 * n;
      }
      if (ptr) objects.push({ id: oid++, slot: monSlot, name: 'monuments_detail', col: monCol, vx: pvx, tr: ptr });
    }

    // ── Tours génériques (man_made=tower, hors Eiffel) ──
    if (cachedTowers.length > 0) {
      function addFrustum3MF(fcx: number, fcy: number, zBot: number, r0: number, r1: number, fh: number, segs: number): { vx: string; tr: string } {
        let fvx = '', ftr = '';
        const zTop = zBot + fh;
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          fvx += `<vertex x="${(fcx + r0 * Math.cos(a)).toFixed(3)}" y="${(fcy + r0 * Math.sin(a)).toFixed(3)}" z="${zBot.toFixed(3)}"/>`;
        }
        for (let i = 0; i < segs; i++) {
          const a = (i / segs) * Math.PI * 2;
          fvx += `<vertex x="${(fcx + r1 * Math.cos(a)).toFixed(3)}" y="${(fcy + r1 * Math.sin(a)).toFixed(3)}" z="${zTop.toFixed(3)}"/>`;
        }
        fvx += `<vertex x="${fcx.toFixed(3)}" y="${fcy.toFixed(3)}" z="${zBot.toFixed(3)}"/>`;
        fvx += `<vertex x="${fcx.toFixed(3)}" y="${fcy.toFixed(3)}" z="${zTop.toFixed(3)}"/>`;
        const botC = segs * 2, topC = segs * 2 + 1;
        for (let i = 0; i < segs; i++) {
          const nn = (i + 1) % segs;
          ftr += `<triangle v1="${i}" v2="${nn}" v3="${segs + nn}"/>`;
          ftr += `<triangle v1="${i}" v2="${segs + nn}" v3="${segs + i}"/>`;
          ftr += `<triangle v1="${botC}" v2="${nn}" v3="${i}"/>`;
          ftr += `<triangle v1="${topC}" v2="${segs + i}" v3="${segs + nn}"/>`;
        }
        return { vx: fvx, tr: ftr };
      }

      for (const el of cachedTowers) {
        if (!el.tags) continue;
        const tName = (el.tags['name'] ?? el.tags['name:fr'] ?? '').toLowerCase();
        if (tName.includes('eiffel')) continue; // géré par le modèle paramétrique
        let cLonFrac3: number, cLatFrac3: number;
        if (el.type === 'node' && el.lat !== undefined && el.lon !== undefined) {
          cLonFrac3 = (el.lon - bMinLon) / (bMaxLon - bMinLon);
          cLatFrac3 = (el.lat - bMinLat) / (bMaxLat - bMinLat);
        } else {
          const polys3 = getOsmPolygons(el);
          if (!polys3.length) continue;
          const outer3 = polys3[0];
          if (!outer3.length) continue;
          let sLon3 = 0, sLat3 = 0;
          for (const p of outer3) { sLon3 += p.lon; sLat3 += p.lat; }
          cLonFrac3 = (sLon3 / outer3.length - bMinLon) / (bMaxLon - bMinLon);
          cLatFrac3 = (sLat3 / outer3.length - bMinLat) / (bMaxLat - bMinLat);
        }
        if (cLonFrac3 < 0 || cLonFrac3 > 1 || cLatFrac3 < 0 || cLatFrac3 > 1) continue;

        const tcx = (cLonFrac3 - 0.5) * wMm;
        const tcy = (0.5 - cLatFrac3) * dMm;
        if (lastZonePoly && !pointInZone(tcx, tcy, lastZonePoly)) continue;
        if (eiffelSup3 && (tcx - eiffelSup3.cx) ** 2 + (tcy - eiffelSup3.cz) ** 2 < eiffelSup3.rMm ** 2) continue;

        const elev3 = sampleElev(workGrid, G, cLonFrac3, 1 - cLatFrac3);
        const yBase3 = baseH + ((elev3 - minE) / elevRange) * elevScaleMm;
        const heightM3 = parseFloat(el.tags['height'] ?? '30');
        const tH3 = Math.max(2, heightM3 * mmPerM3);
        const r0 = Math.max(0.5, tH3 * 0.04);
        const r1 = r0 * 0.4;
        const { vx, tr } = addFrustum3MF(tcx, tcy, yBase3, r0, r1, tH3, 6);
        if (tr) objects.push({ id: oid++, slot: monSlot, name: `tower_${oid}`, col: monCol, vx, tr });
      }
    }
  }

  // ── Façades : 4 murs périmètre + fond, Z=0 → baseH+maxH ──
  {
    const maxTerrainH = allCells.size > 0
      ? Array.from(allCells.values()).reduce((m, c) => Math.max(m, c.h), 0)
      : elevScaleMm;
    const totalH = baseH + maxTerrainH;
    const x0 = -wMm / 2, x1 = wMm / 2, y0 = -dMm / 2, y1 = dMm / 2;
    let vx = '', tr = '', fvc = 0;
    function fq(
      ax: number, ay: number, az: number, bx: number, by: number, bz: number,
      cx: number, cy: number, cz: number, dx: number, dy: number, dz: number,
    ) {
      vx += `<vertex x="${ax.toFixed(3)}" y="${ay.toFixed(3)}" z="${az.toFixed(3)}"/>` +
            `<vertex x="${bx.toFixed(3)}" y="${by.toFixed(3)}" z="${bz.toFixed(3)}"/>` +
            `<vertex x="${cx.toFixed(3)}" y="${cy.toFixed(3)}" z="${cz.toFixed(3)}"/>` +
            `<vertex x="${dx.toFixed(3)}" y="${dy.toFixed(3)}" z="${dz.toFixed(3)}"/>`;
      tr += `<triangle v1="${fvc}" v2="${fvc+1}" v3="${fvc+2}"/>` +
            `<triangle v1="${fvc}" v2="${fvc+2}" v3="${fvc+3}"/>`;
      fvc += 4;
    }
    fq(x1,y1,0,  x0,y1,0,  x0,y1,totalH, x1,y1,totalH); // Nord  +Y
    fq(x0,y0,0,  x1,y0,0,  x1,y0,totalH, x0,y0,totalH); // Sud   -Y
    fq(x1,y0,0,  x1,y1,0,  x1,y1,totalH, x1,y0,totalH); // Est   +X
    fq(x0,y1,0,  x0,y0,0,  x0,y0,totalH, x0,y1,totalH); // Ouest -X
    fq(x0,y1,0,  x1,y1,0,  x1,y0,0,  x0,y0,0);           // Fond  -Z
    const facSlot = layerSlotOverrides['facade'] ?? 1;
    const facCol = (colorSlots[facSlot] ?? '#c0af88').replace('#', '');
    objects.push({ id: oid++, slot: facSlot, name: 'facade', col: facCol, vx, tr });
  }

  if (!objects.length) { alert('Aucun maillage à exporter.'); return; }

  // ── Format Bambu Studio : une assemblée parent contenant tous les composants ──
  // Reproduit la structure du fichier de référence : un seul <item> dans <build>,
  // chaque couche = un <component> dans l'assemblée, avec <part> dans model_settings.config.
  const assemblyId = oid; // id suivant le dernier slot

  // Couleurs par matériau pour prévisualisation
  const matGroups = objects.map(o =>
    `<basematerials id="${o.id + 1000}"><base name="${o.name}" displaycolor="#${o.col}"/></basematerials>`
  ).join('\n');

  // Maillages individuels par couche
  const resObjs = objects.map(o =>
    `<object id="${o.id}" type="model" name="${o.name}" pid="${o.id + 1000}" pindex="0">` +
    `<mesh><vertices>${o.vx}</vertices><triangles>${o.tr}</triangles></mesh>` +
    `</object>`
  ).join('\n');

  // Objet assemblée : groupe tous les composants en un seul objet Bambu
  const components = objects.map(o =>
    `<component objectid="${o.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`
  ).join('');
  const assemblyObj = `<object id="${assemblyId}" type="model" name="Terrain3D">` +
    `<components>${components}</components></object>`;

  // Un seul item dans le build = un seul modèle dans Bambu Studio
  const buildItems = `<item objectid="${assemblyId}" transform="1 0 0 0 1 0 0 0 1 0 0 0" printable="1" identify_id="1"/>`;

  // model_settings.config : <object> parent + <part> par couche avec extruder
  const config = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<config>',
    `  <object id="${assemblyId}" name="Terrain3D">`,
    `    <metadata key="name" value="Terrain3D"/>`,
    `    <metadata key="extruder" value="1"/>`,
    ...objects.map(o =>
      `    <part id="${o.id}" subtype="normal_part">` +
      `<metadata key="name" value="${o.name}"/>` +
      `<metadata key="extruder" value="${o.slot}"/>` +
      `</part>`
    ),
    '  </object>',
    '</config>',
  ].join('\n');

  const model = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    '  <metadata name="Title">Terrain3D</metadata>',
    '  <resources>', matGroups, resObjs, assemblyObj, '  </resources>',
    '  <build>', buildItems, '  </build>',
    '</model>',
  ].join('\n');

  const rels = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    '  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',
    '  <Relationship Target="/metadata/model_settings.config" Id="rel1" Type="http://schemas.bambulab.com/package/2021/bambu-model-settings"/>',
    '</Relationships>',
  ].join('\n');

  const ct = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
    '  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
    '  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',
    '  <Override PartName="/metadata/model_settings.config" ContentType="application/xml"/>',
    '</Types>',
  ].join('\n');

  const { default: JSZip } = await import('jszip');
  const zip = new JSZip();
  zip.file('[Content_Types].xml', ct);
  zip.folder('_rels')!.file('.rels', rels);
  zip.folder('3D')!.file('3dmodel.model', model);
  zip.folder('metadata')!.file('model_settings.config', config);
  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename ?? `Terrain3D_${Date.now()}.3mf`;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

export function clearPrintPreview(): void {
  if (!scene) return;
  if (printPreviewGroup) {
    scene.remove(printPreviewGroup);
    const si = sceneObjs.indexOf(printPreviewGroup);
    if (si >= 0) sceneObjs.splice(si, 1);
    printPreviewGroup.traverse(c => {
      const m = c as THREE.Mesh;
      m.geometry?.dispose();
      if (Array.isArray(m.material)) m.material.forEach(mt => mt.dispose());
      else (m.material as THREE.Material | undefined)?.dispose();
    });
    printPreviewGroup = null;
  }
  printPreviewActive = false;
  if (terrainMeshRef) terrainMeshRef.visible = true;
  for (const m of zoneMeshRefs) m.visible = layerVisible[(m as any).__zoneLayerId] ?? true;
  if (roadMeshGroup) roadMeshGroup.visible = layerVisible['roads'] ?? true;
  if (lineMeshGroup) lineMeshGroup.visible = true;
}

export function isPrintPreviewActive(): boolean { return printPreviewActive; }
