/* ════════════════════════════════════════════
   TYPES — Terrain3D
   ════════════════════════════════════════════ */

export type ZoneType = 'circ' | 'hex' | 'rect' | 'poly';

export interface LatLonBounds {
  minLat: number; maxLat: number;
  minLon: number; maxLon: number;
}

export interface LatLon { lat: number; lon: number; }

export interface Point2D { x: number; z: number; }
export interface Point3D { x: number; y: number; z: number; }

/** Feature brut Overture désérialisé */
export interface OvertureFeature {
  layer: string;
  type: number;          // 2=line 3=poly
  properties: Record<string, string | number | boolean | null>;
  rings: LatLon[][];     // rings[0] = outer ring
}

/** Paramètres de l'interface utilisateur */
export interface Settings {
  // Terrain
  cBase: string;
  terrainRes: number;
  exag: number;
  smooth: number;
  baseH: number;
  maxDim: number;
  elevZoom: number;
  // Eau
  waterOn: boolean;
  waterCol: string;
  // Végétation
  grassOn: boolean;
  // Routes
  roadsOn: boolean;
  roadCol: string;
  // Bâtiments
  buildOn: boolean;
  buildCol: string;
  buildHS: number;
  // GPX
  gpxCol: string;
  gpxH: number;
  gpxMW: number;
  gpxTW: number;
}

/** Résultat du terrain worker */
export interface TerrainResult {
  elevGrid: Float32Array;  // GRID × GRID
  GRID: number;
  minE: number;
  maxE: number;
  elevRange: number;
}

/** Un layer de géométrie renvoyé par le geometry worker */
export interface LayerGeo {
  positions: Float32Array;
  indices: Uint32Array;
  colors?: Float32Array;  // vertex colors (terrain & ground)
}

/** Résultat du geometry worker */
export interface GeometryResult {
  TERRAIN:   LayerGeo;
  GROUND:    LayerGeo;
  LAND:      LayerGeo;
  ROCK:      LayerGeo;
  WATER:     LayerGeo;
  GRASS:     LayerGeo;
  FOREST:    LayerGeo;
  PARKS:     LayerGeo;
  FARM:      LayerGeo;
  ROADS:     LayerGeo;
  PED:       LayerGeo;
  BUILDINGS: LayerGeo;
  GPX:       LayerGeo;
}

/** Message → terrain worker */
export interface TerrainWorkerInput {
  type: 'BUILD_TERRAIN';
  bounds: LatLonBounds;
  GRID: number;
  elevZoom: number;
}

/** Message → geometry worker */
export interface GeometryWorkerInput {
  type: 'BUILD_GEOMETRY';
  elevGrid: Float32Array;
  GRID: number;
  wMm: number;
  dMm: number;
  BASE_H: number;
  MIN_SURF: number;
  elevScaleMm: number;
  minE: number;
  elevRange: number;
  features: OvertureFeature[];
  gpxPoints: LatLon[];
  bounds: LatLonBounds;
  settings: Settings;
  zoneType: ZoneType;
  zonePts: [number, number][] | null;
  mmPerMeter: number;
}
