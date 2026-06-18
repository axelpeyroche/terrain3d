/* ════════════════════════════════════════════
   STATE — Application state singleton
   ════════════════════════════════════════════ */

import type { LatLonBounds, ZoneType, Settings, LatLon } from './types';
import type * as THREE from 'three';
import type { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export interface AppState {
  // Zone sélectionnée
  bounds: LatLonBounds | null;
  zoneType: ZoneType;
  zonePts: [number, number][] | null;
  wMm: number;
  dMm: number;
  realW: number;
  realH: number;

  // GPX
  gpxPoints: LatLon[];

  // Génération
  generated: boolean;
  generating: boolean;

  // Cache terrain
  elevGrid: Float32Array | null;
  GRID: number;
  BASE_H: number;
  minE: number;
  elevRange: number;
  elevScaleMm: number;
  mmPerMeter: number;

  // Three.js (initialisés dans scene/setup.ts)
  renderer: THREE.WebGLRenderer | null;
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  controls: OrbitControls | null;
  tg: THREE.Group | null; // terrain group — tout y est attaché
}

export const state: AppState = {
  bounds: null,
  zoneType: 'rect',
  zonePts: null,
  wMm: 150,
  dMm: 150,
  realW: 0,
  realH: 0,

  gpxPoints: [],

  generated: false,
  generating: false,

  elevGrid: null,
  GRID: 128,
  BASE_H: 3,
  minE: 0,
  elevRange: 1,
  elevScaleMm: 20,
  mmPerMeter: 1,

  renderer: null,
  scene: null,
  camera: null,
  controls: null,
  tg: null,
};

/** Paramètres lus depuis le panneau UI */
export function getSettings(): Settings {
  const v = (id: string) => (document.getElementById(id) as HTMLInputElement)?.value ?? '';
  const b = (id: string) => (document.getElementById(id) as HTMLInputElement)?.checked ?? true;
  return {
    cBase:     v('c-base')      || '#eeebe6',
    terrainRes:Number(v('t-res'))  || 128,
    exag:      Number(v('dp-exag') || v('t-exag')) || 1,
    smooth:    Number(v('t-smooth'))|| 1,
    baseH:     Number(v('dp-base') || v('t-base-h'))|| 5,
    maxDim:    Number(v('t-maxdim'))|| 200,
    elevZoom:  Number(v('t-zoom')) || 15,
    waterOn:   b('water-on'),
    waterCol:  v('water-col')   || '#3399ff',
    grassOn:   b('grass-on'),
    roadsOn:   b('road-on'),
    roadCol:   v('road-col')    || '#262626',
    buildOn:   b('build-on'),
    buildCol:  v('build-col')   || '#9090a0',
    buildHS:   Number(v('build-hs'))|| 1.0,
    gpxCol:    v('gpx-col')     || '#ff4500',
    gpxH:      Number(v('gpx-h'))  || 1.2,
    gpxMW:     Number(v('gpx-mw')) || 1.5,
    gpxTW:     Number(v('gpx-tw')) || 3.0,
  };
}
