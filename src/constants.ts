/* ════════════════════════════════════════════
   CONSTANTES — Terrain3D
   ════════════════════════════════════════════ */

/** Socle minimal au-dessus du terrain (mm) — évite le z-fighting */
export const MIN_SURF = 0.05;

/** Hauteurs relatives au terrain (mm) */
export const H_LAND   = 0;
export const H_ROCK   = 0.15;
export const H_WATER  = 0.60;
export const H_GRASS  = 0.30;
export const H_PARK   = 0.35;
export const H_FOREST = 0.40;
export const H_PED    = 0.40;
export const H_ROAD   = 0.80;

/** Couleurs par défaut */
export const COL_LAND   = '#f0ede8';
export const COL_ROCK   = '#c0bbb5';
export const COL_GRASS  = '#0fe300';
export const COL_FOREST = '#0fe300';
export const COL_PARK   = '#0fe300';
export const COL_FARM   = '#0fe300';
export const COL_PED    = '#262626';

/** Classes de routes Overture → largeur réelle (mètres) */
export const ROAD_W_M: Record<string, number> = {
  motorway: 14, trunk: 12, primary: 10, secondary: 8, tertiary: 7,
  residential: 5, living_street: 4, unclassified: 5, service: 3, track: 3,
  pedestrian: 5, footway: 2, cycleway: 2.5, path: 1.5, steps: 2,
};

/** Largeur minimale imprimable (mm) par classe */
export const ROAD_W_MIN: Record<string, number> = {
  motorway: 0.8, trunk: 0.7, primary: 0.6, secondary: 0.5, tertiary: 0.4,
  residential: 0.3, living_street: 0.3, unclassified: 0.3, service: 0.25, track: 0.25,
  pedestrian: 0.3, footway: 0.2, cycleway: 0.25, path: 0.15, steps: 0.2,
};

/** Classes véhicules */
export const VEHICLE_CLASSES = new Set([
  'motorway', 'motorway_link', 'trunk', 'trunk_link',
  'primary', 'primary_link', 'secondary', 'secondary_link',
  'tertiary', 'tertiary_link', 'residential', 'living_street',
  'unclassified', 'service', 'track',
]);

/** Classes piétons */
export const PED_CLASSES = new Set([
  'pedestrian', 'footway', 'cycleway', 'path', 'steps',
]);

/** URL tuiles Overture PMTiles 2026-05-20 */
export const OVERTURE_BASE = 'https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0';

/** Élévation : transition vers la couleur roche */
export const ROCK_LO = 0.62;
export const ROCK_HI = 0.82;

/** SINK des polygones extrudés dans le terrain (mm) */
export const POLY_SINK = 1.5;
