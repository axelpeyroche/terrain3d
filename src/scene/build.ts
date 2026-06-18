/* ════════════════════════════════════════════
   SCENE BUILD — geometry worker output → Three.js meshes
   + Landmarks (monuments mondiaux)
   ════════════════════════════════════════════ */

import * as THREE from 'three';
import { state, getSettings } from '../state';
import { clearTG } from './setup';
import type { GeometryResult, LayerGeo } from '../types';
import {
  COL_LAND, COL_ROCK, COL_GRASS, COL_FOREST, COL_PARK, COL_FARM, COL_PED,
} from '../constants';

/* ── Échantillonnage terrain (main thread) ── */
function sampleAt(x: number, z: number): number {
  const { elevGrid, GRID, wMm, dMm, minE, elevRange, elevScaleMm, BASE_H } = state;
  if (!elevGrid || !GRID) return BASE_H;
  const fc = (x + wMm / 2) / wMm * (GRID - 1);
  const fr = (z + dMm / 2) / dMm * (GRID - 1);
  const c0 = Math.max(0, Math.min(GRID - 2, Math.floor(fc)));
  const r0 = Math.max(0, Math.min(GRID - 2, Math.floor(fr)));
  const tc = fc - c0, tr = fr - r0;
  const e00 = elevGrid[r0 * GRID + c0] ?? minE;
  const e10 = elevGrid[r0 * GRID + c0 + 1] ?? minE;
  const e01 = elevGrid[(r0 + 1) * GRID + c0] ?? minE;
  const e11 = elevGrid[(r0 + 1) * GRID + c0 + 1] ?? minE;
  const e = e00 * (1 - tc) * (1 - tr) + e10 * tc * (1 - tr) + e01 * (1 - tc) * tr + e11 * tc * tr;
  return BASE_H + Math.max(0, Math.min(1, (e - minE) / Math.max(0.001, elevRange))) * elevScaleMm;
}

/* ── Conversion d'un LayerGeo en Mesh ── */
function layerToMesh(layer: LayerGeo, mat: THREE.Material, name: string): THREE.Mesh | null {
  if (!layer.positions.length || !layer.indices.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(layer.positions, 3));
  if (layer.colors) geo.setAttribute('color', new THREE.BufferAttribute(layer.colors, 3));
  geo.setIndex(new THREE.BufferAttribute(layer.indices, 1));
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.name = name;
  return m;
}

/* ════════════════════════════════════════════
   APPLY GEOMETRY
   ════════════════════════════════════════════ */
export function applyGeometry(result: GeometryResult): void {
  if (!state.tg) return;
  clearTG();
  const st = getSettings();
  const tg = state.tg;

  function add(layer: LayerGeo, mat: THREE.Material, name: string, pof = -8) {
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = pof;
    mat.polygonOffsetUnits = pof;
    const m = layerToMesh(layer, mat, name);
    if (m) tg.add(m);
  }

  const std = (col: string, rough = 0.95, flat = false) =>
    new THREE.MeshStandardMaterial({ color: new THREE.Color(col), roughness: rough, metalness: 0, flatShading: flat });

  /* ── TERRAIN ── */
  {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.92, metalness: 0, flatShading: true, side: THREE.DoubleSide,
      polygonOffset: true, polygonOffsetFactor: 20, polygonOffsetUnits: 20,
    });
    const m = layerToMesh(result.TERRAIN, mat, 'TERRAIN');
    if (m) tg.add(m);
  }

  /* ── SOCLE ── */
  {
    const sh = buildBaseShape(state.wMm, state.dMm, state.zoneType);
    if (sh) {
      const geo = new THREE.ExtrudeGeometry(sh, { depth: state.BASE_H, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: new THREE.Color(st.cBase), roughness: 0.55 }));
      m.name = 'BASE';
      tg.add(m);
    }
  }

  /* ── PAROIS LATÉRALES ── */
  buildSideWalls(st.cBase);

  /* ── GROUND FILL ── */
  if (result.GROUND.positions.length) {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.95, metalness: 0, flatShading: true,
      polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1,
    });
    const m = layerToMesh(result.GROUND, mat, 'GROUND');
    if (m) tg.add(m);
  }

  /* ── COUCHES OVERTURE ── */
  if (st.grassOn) {
    add(result.LAND,   std(COL_LAND),   'LAND',   -2);
    add(result.ROCK,   std(COL_ROCK),   'ROCK',   -3);
    add(result.FARM,   std(COL_FARM),   'FARM',   -4);
    add(result.GRASS,  std(COL_GRASS),  'GRASS',  -5);
    add(result.PARKS,  std(COL_PARK),   'PARKS',  -6);
    add(result.FOREST, std(COL_FOREST), 'FOREST', -7);
  }
  if (st.waterOn) {
    const wMat = std(st.waterCol, 0.10);
    wMat.side = THREE.DoubleSide;
    add(result.WATER, wMat, 'WATER', -8);
  }
  if (st.roadsOn) {
    add(result.PED, std(COL_PED, 0.9), 'PEDEST', -9);
    const rMat = std(st.roadCol, 0.85);
    rMat.side = THREE.DoubleSide;
    add(result.ROADS, rMat, 'ROADS', -10);
  }
  if (st.buildOn) {
    add(result.BUILDINGS, std(st.buildCol, 0.7), 'BUILDINGS', -14);
  }

  /* ── GPX ── */
  if (result.GPX.positions.length) {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(st.gpxCol), roughness: 0.3, metalness: 0.1,
      polygonOffset: true, polygonOffsetFactor: -30, polygonOffsetUnits: -30,
    });
    const m = layerToMesh(result.GPX, mat, 'GPX');
    if (m) tg.add(m);
  }

  /* ── LANDMARKS ── */
  buildLandmarks();
}

/* ════════════════════════════════════════════
   SOCLE
   ════════════════════════════════════════════ */
function buildBaseShape(wMm: number, dMm: number, zoneType: string): THREE.Shape | null {
  const sh = new THREE.Shape();
  if (zoneType === 'circ') {
    sh.ellipse(0, 0, wMm / 2, dMm / 2, 0, Math.PI * 2, false, 0);
  } else if (zoneType === 'hex') {
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 - Math.PI / 6;
      i === 0 ? sh.moveTo(wMm / 2 * Math.cos(a), wMm / 2 * Math.sin(a))
              : sh.lineTo(wMm / 2 * Math.cos(a), wMm / 2 * Math.sin(a));
    }
    sh.closePath();
  } else {
    sh.moveTo(-wMm / 2, -dMm / 2);
    sh.lineTo(wMm / 2, -dMm / 2);
    sh.lineTo(wMm / 2, dMm / 2);
    sh.lineTo(-wMm / 2, dMm / 2);
    sh.closePath();
  }
  return sh;
}

/* ════════════════════════════════════════════
   PAROIS LATÉRALES terrain-following
   ════════════════════════════════════════════ */
function buildSideWalls(cBase: string): void {
  if (!state.tg) return;
  const { wMm, dMm, BASE_H, zoneType } = state;
  const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(cBase), roughness: 0.55, side: THREE.DoubleSide });

  function edgePt(x: number, z: number) {
    return { x, z, topY: Math.max(BASE_H, sampleAt(x * 0.98, z * 0.98)) };
  }

  function makeWalls(pts: Array<{ x: number; z: number; topY: number }>) {
    const verts: number[] = [], idx: number[] = [];
    let vi = 0;
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2;
      const outward = mx * (b.z - a.z) - mz * (b.x - a.x);
      const [p1, p2] = outward >= 0 ? [a, b] : [b, a];
      verts.push(p1.x, p1.topY, p1.z, p2.x, p2.topY, p2.z, p2.x, 0, p2.z, p1.x, 0, p1.z);
      idx.push(vi, vi + 1, vi + 2, vi, vi + 2, vi + 3);
      vi += 4;
    }
    if (!verts.length) return;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, mat);
    m.name = 'WALLS';
    state.tg!.add(m);
  }

  if (zoneType === 'circ') {
    const N = 512, R = wMm / 2;
    makeWalls(Array.from({ length: N }, (_, i) => {
      const a = i / N * Math.PI * 2;
      return edgePt(R * Math.cos(a), R * Math.sin(a));
    }));
  } else if (zoneType === 'hex') {
    const R = wMm / 2;
    makeWalls(Array.from({ length: 6 }, (_, i) => {
      const a = i / 6 * Math.PI * 2 - Math.PI / 6;
      return edgePt(R * Math.cos(a), R * Math.sin(a));
    }));
  } else if (state.zonePts && state.zonePts.length >= 3 && state.bounds) {
    const { bounds } = state;
    const la2mm = dMm / (bounds.maxLat - bounds.minLat);
    const lo2mm = wMm / (bounds.maxLon - bounds.minLon);
    const cLat = (bounds.minLat + bounds.maxLat) / 2;
    const cLon = (bounds.minLon + bounds.maxLon) / 2;
    makeWalls(state.zonePts.map(([lat, lon]) => edgePt((lon - cLon) * lo2mm, -(lat - cLat) * la2mm)));
  } else {
    const x1 = -wMm / 2, x2 = wMm / 2, z1 = -dMm / 2, z2 = dMm / 2;
    makeWalls([edgePt(x1, z1), edgePt(x2, z1), edgePt(x2, z2), edgePt(x1, z2)]);
  }
}

/* ════════════════════════════════════════════
   LANDMARKS — ~40 monuments mondiaux
   ════════════════════════════════════════════ */
interface Landmark {
  n: string; lat: number; lon: number;
  rH: number; rW: number; rD: number;
  sh: string; c: string;
}

const LM: Landmark[] = [
  // FRANCE
  { n: 'Tour Eiffel',       lat: 48.8584,  lon: 2.2945,   rH: 330, rW: 125, rD: 125, sh: 'eiffel',    c: '#7a8c9a' },
  { n: 'Arc de Triomphe',   lat: 48.8738,  lon: 2.2950,   rH: 50,  rW: 45,  rD: 22,  sh: 'arch',      c: '#c8b89a' },
  { n: 'Notre-Dame',        lat: 48.8530,  lon: 2.3499,   rH: 69,  rW: 48,  rD: 128, sh: 'cathedral', c: '#b4a890' },
  { n: 'Sacré-Cœur',        lat: 48.8867,  lon: 2.3431,   rH: 83,  rW: 42,  rD: 55,  sh: 'dome',      c: '#f8f4ee' },
  { n: 'Panthéon',          lat: 48.8462,  lon: 2.3460,   rH: 83,  rW: 110, rD: 75,  sh: 'dome',      c: '#d8d0c0' },
  { n: 'Invalides',         lat: 48.8559,  lon: 2.3124,   rH: 107, rW: 60,  rD: 60,  sh: 'dome',      c: '#d4b820' },
  { n: 'Tour Montparnasse', lat: 48.8422,  lon: 2.3220,   rH: 210, rW: 50,  rD: 30,  sh: 'tower',     c: '#282828' },
  { n: 'Pyramide Louvre',   lat: 48.8606,  lon: 2.3376,   rH: 21,  rW: 35,  rD: 35,  sh: 'pyramid',   c: '#d4d8e0' },
  { n: 'Versailles',        lat: 48.8048,  lon: 2.1203,   rH: 30,  rW: 400, rD: 130, sh: 'rect',      c: '#f0e8c8' },
  // UK
  { n: 'Big Ben',           lat: 51.5007,  lon: -0.1246,  rH: 96,  rW: 15,  rD: 15,  sh: 'tower',     c: '#d4c878' },
  { n: 'London Eye',        lat: 51.5033,  lon: -0.1195,  rH: 135, rW: 120, rD: 12,  sh: 'wheel',     c: '#4080c0' },
  { n: 'St Pauls',          lat: 51.5138,  lon: -0.0984,  rH: 111, rW: 80,  rD: 175, sh: 'dome',      c: '#e0d8c8' },
  // USA
  { n: 'Empire State',      lat: 40.7484,  lon: -73.9857, rH: 443, rW: 57,  rD: 57,  sh: 'tower',     c: '#b0b0c0' },
  { n: 'One WTC',           lat: 40.7127,  lon: -74.0134, rH: 541, rW: 60,  rD: 60,  sh: 'tower',     c: '#c0d4e0' },
  { n: 'Statue of Liberty', lat: 40.6892,  lon: -74.0445, rH: 93,  rW: 14,  rD: 14,  sh: 'tower',     c: '#78a890' },
  { n: 'Capitol',           lat: 38.8897,  lon: -77.0089, rH: 88,  rW: 229, rD: 107, sh: 'dome',      c: '#f0f0f0' },
  { n: 'Space Needle',      lat: 47.6205,  lon: -122.3493,rH: 184, rW: 15,  rD: 15,  sh: 'tower',     c: '#808888' },
  { n: 'CN Tower',          lat: 43.6426,  lon: -79.3871, rH: 553, rW: 20,  rD: 20,  sh: 'tower',     c: '#808890' },
  // DUBAI
  { n: 'Burj Khalifa',      lat: 25.1972,  lon: 55.2744,  rH: 828, rW: 57,  rD: 57,  sh: 'burj',      c: '#c8d8e8' },
  { n: 'Burj Al Arab',      lat: 25.1411,  lon: 55.1853,  rH: 321, rW: 60,  rD: 25,  sh: 'sail',      c: '#f8f8f8' },
  // CHINA
  { n: 'Shanghai Tower',    lat: 31.2354,  lon: 121.5006, rH: 632, rW: 57,  rD: 57,  sh: 'burj',      c: '#d0e8f0' },
  // ITALIE
  { n: 'Colosseum',         lat: 41.8902,  lon: 12.4922,  rH: 48,  rW: 188, rD: 156, sh: 'colosseum', c: '#c8b89a' },
  { n: 'Tower of Pisa',     lat: 43.7229,  lon: 10.3966,  rH: 56,  rW: 15,  rD: 15,  sh: 'tower',     c: '#f0ede8' },
  { n: 'St Peters',         lat: 41.9022,  lon: 12.4539,  rH: 136, rW: 211, rD: 115, sh: 'dome',      c: '#f0ede8' },
  // ESPAGNE
  { n: 'Sagrada Família',   lat: 41.4036,  lon: 2.1744,   rH: 172, rW: 90,  rD: 60,  sh: 'cathedral', c: '#d4c8a0' },
  // ALLEMAGNE
  { n: 'Brandenburg Gate',  lat: 52.5163,  lon: 13.3777,  rH: 26,  rW: 65,  rD: 11,  sh: 'arch',      c: '#d4c8a0' },
  { n: 'Cologne Cathedral', lat: 50.9413,  lon: 6.9583,   rH: 157, rW: 86,  rD: 145, sh: 'cathedral', c: '#909090' },
  // GRÈCE
  { n: 'Parthenon',         lat: 37.9715,  lon: 23.7267,  rH: 13,  rW: 69,  rD: 30,  sh: 'rect',      c: '#e8d8b8' },
  // ÉGYPTE
  { n: 'Great Pyramid',     lat: 29.9792,  lon: 31.1342,  rH: 139, rW: 230, rD: 230, sh: 'pyramid',   c: '#d4c060' },
  // RUSSIE
  { n: 'St Basil',          lat: 55.7525,  lon: 37.6231,  rH: 65,  rW: 40,  rD: 40,  sh: 'onion',     c: '#c83030' },
  // AUSTRALIE
  { n: 'Sydney Opera',      lat: -33.8568, lon: 151.2153, rH: 65,  rW: 183, rD: 100, sh: 'dome',      c: '#f8f8f8' },
  // INDE
  { n: 'Taj Mahal',         lat: 27.1751,  lon: 78.0421,  rH: 73,  rW: 56,  rD: 56,  sh: 'dome',      c: '#f8f4ee' },
  { n: 'India Gate',        lat: 28.6129,  lon: 77.2295,  rH: 42,  rW: 10,  rD: 10,  sh: 'arch',      c: '#d4b870' },
  // JAPON
  { n: 'Tokyo Tower',       lat: 35.6585,  lon: 139.7454, rH: 333, rW: 20,  rD: 20,  sh: 'eiffel',    c: '#d04030' },
  { n: 'Tokyo Skytree',     lat: 35.7101,  lon: 139.8107, rH: 634, rW: 50,  rD: 50,  sh: 'burj',      c: '#7090c0' },
  // BRÉSIL
  { n: 'Christ Redeemer',   lat: -22.9519, lon: -43.2105, rH: 39,  rW: 10,  rD: 10,  sh: 'tower',     c: '#f0ede8' },
  // TURQUIE
  { n: 'Hagia Sophia',      lat: 41.0086,  lon: 28.9802,  rH: 55,  rW: 100, rD: 75,  sh: 'dome',      c: '#c8b898' },
  // MEXIQUE
  { n: 'Pyramid of Sun',    lat: 19.6921,  lon: -98.8445, rH: 71,  rW: 225, rD: 222, sh: 'pyramid',   c: '#c8b070' },
  // TCHÉQUIE
  { n: 'Prague Castle',     lat: 50.0905,  lon: 14.4003,  rH: 48,  rW: 570, rD: 130, sh: 'rect',      c: '#d8d0b8' },
];

function mergeBoxGeos(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [], indices: number[] = [];
  let offset = 0;
  for (const g of geos) {
    const p = g.attributes.position as THREE.BufferAttribute, idx = g.index;
    for (let i = 0; i < p.count; i++) positions.push(p.getX(i), p.getY(i), p.getZ(i));
    if (idx) for (let i = 0; i < idx.count; i++) indices.push(idx.getX(i) + offset);
    else for (let i = 0; i < p.count; i++) indices.push(i + offset);
    offset += p.count;
    g.dispose();
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  return g;
}

function mkLandmarkGeo(sh: string, w: number, h: number, d: number): THREE.BufferGeometry | null {
  const hw = w / 2, hd = d / 2;
  try {
    switch (sh) {
      case 'eiffel': {
        const pts = [
          new THREE.Vector2(hw,        0),
          new THREE.Vector2(hw * 0.82, h * 0.035),
          new THREE.Vector2(hw * 0.58, h * 0.08),
          new THREE.Vector2(hw * 0.32, h * 0.135),
          new THREE.Vector2(hw * 0.265,h * 0.165),
          new THREE.Vector2(hw * 0.285,h * 0.175),
          new THREE.Vector2(hw * 0.245,h * 0.188),
          new THREE.Vector2(hw * 0.18, h * 0.23),
          new THREE.Vector2(hw * 0.13, h * 0.33),
          new THREE.Vector2(hw * 0.115,h * 0.348),
          new THREE.Vector2(hw * 0.130,h * 0.358),
          new THREE.Vector2(hw * 0.110,h * 0.370),
          new THREE.Vector2(hw * 0.080,h * 0.43),
          new THREE.Vector2(hw * 0.048,h * 0.60),
          new THREE.Vector2(hw * 0.026,h * 0.83),
          new THREE.Vector2(hw * 0.010,h * 0.94),
          new THREE.Vector2(0,         h),
        ];
        const tower = new THREE.LatheGeometry(pts, 4);
        tower.rotateY(Math.PI / 4);
        const ring1 = new THREE.CylinderGeometry(hw * 0.32, hw * 0.32, h * 0.012, 16, 1, false);
        ring1.translate(0, h * 0.175, 0);
        const ring2 = new THREE.CylinderGeometry(hw * 0.145, hw * 0.145, h * 0.010, 16, 1, false);
        ring2.translate(0, h * 0.358, 0);
        return mergeBoxGeos([tower, ring1, ring2]);
      }
      case 'burj': {
        const pts = [
          new THREE.Vector2(hw,       0),
          new THREE.Vector2(hw * 0.80,h * 0.15),
          new THREE.Vector2(hw * 0.55,h * 0.40),
          new THREE.Vector2(hw * 0.25,h * 0.72),
          new THREE.Vector2(hw * 0.08,h * 0.90),
          new THREE.Vector2(hw * 0.02,h),
        ];
        return new THREE.LatheGeometry(pts, 12);
      }
      case 'dome': {
        const n = 12;
        const pts = Array.from({ length: n + 1 }, (_, i) => {
          const a = i / n * Math.PI / 2;
          return new THREE.Vector2(hw * Math.cos(a), h * 0.75 * Math.sin(a));
        });
        pts.push(new THREE.Vector2(hw * 0.9, 0), new THREE.Vector2(0, 0));
        return new THREE.LatheGeometry(pts, 16);
      }
      case 'onion': {
        const pts = [
          new THREE.Vector2(hw * 0.3,  0),
          new THREE.Vector2(hw * 0.55, h * 0.12),
          new THREE.Vector2(hw,        h * 0.40),
          new THREE.Vector2(hw * 0.55, h * 0.65),
          new THREE.Vector2(hw * 0.10, h * 0.85),
          new THREE.Vector2(hw * 0.04, h),
        ];
        return new THREE.LatheGeometry(pts, 12);
      }
      case 'tower': {
        const pts = [
          new THREE.Vector2(hw,       0),
          new THREE.Vector2(hw * 0.65,h * 0.20),
          new THREE.Vector2(hw * 0.30,h * 0.55),
          new THREE.Vector2(hw * 0.10,h * 0.80),
          new THREE.Vector2(hw * 0.03,h),
        ];
        return new THREE.LatheGeometry(pts, 8);
      }
      case 'pyramid': {
        const g = new THREE.ConeGeometry(hw * Math.SQRT2, h, 4);
        g.rotateY(Math.PI / 4);
        g.translate(0, h / 2, 0);
        return g;
      }
      case 'arch': {
        const pw = w * 0.22, ph = h * 0.78;
        const g1 = new THREE.BoxGeometry(pw, ph, d); g1.translate(-hw + pw / 2, ph / 2, 0);
        const g2 = new THREE.BoxGeometry(pw, ph, d); g2.translate(hw - pw / 2, ph / 2, 0);
        const g3 = new THREE.BoxGeometry(w, h * 0.22, d); g3.translate(0, h * 0.89, 0);
        return mergeBoxGeos([g1, g2, g3]);
      }
      case 'cathedral': {
        const bw = w * 0.55, bh = h * 0.65, tw = w * 0.14;
        const body = new THREE.BoxGeometry(bw, bh, d); body.translate(0, bh / 2, 0);
        const t1 = new THREE.BoxGeometry(tw, h, tw); t1.translate(-bw / 2 + tw / 2, h / 2, -hd + tw / 2);
        const t2 = new THREE.BoxGeometry(tw, h, tw); t2.translate(bw / 2 - tw / 2, h / 2, -hd + tw / 2);
        return mergeBoxGeos([body, t1, t2]);
      }
      case 'colosseum': {
        const rM = Math.max(hw, hd) * 0.85, rT = (Math.max(hw, hd) - Math.min(hw, hd) * 0.4) / 2;
        const g = new THREE.TorusGeometry(rM, Math.max(rT, 3), 8, 32);
        g.scale(1, h / (rM * 0.8), hd / hw);
        g.translate(0, h / 2, 0);
        return g;
      }
      case 'sail': {
        const pos = [-hw, 0, -hd, hw, 0, -hd, hw, 0, hd, -hw, 0, hd, 0, h, 0];
        const idx = [0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4, 0, 2, 1, 0, 3, 2];
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setIndex(idx);
        g.computeVertexNormals();
        return g;
      }
      case 'wheel': {
        const r = Math.min(hw, h / 2);
        const g = new THREE.TorusGeometry(r, r * 0.045, 6, 36);
        g.rotateY(Math.PI / 2);
        g.translate(0, r, 0);
        return g;
      }
      default: {
        const g = new THREE.BoxGeometry(w, h, d);
        g.translate(0, h / 2, 0);
        return g;
      }
    }
  } catch { return null; }
}

function buildLandmarks(): void {
  if (!state.tg || !state.bounds || !state.elevGrid) return;
  const { bounds, wMm, dMm, mmPerMeter } = state;
  const cLat = (bounds.minLat + bounds.maxLat) / 2;
  const cLon = (bounds.minLon + bounds.maxLon) / 2;
  const la2mm = dMm / (bounds.maxLat - bounds.minLat);
  const lo2mm = wMm / (bounds.maxLon - bounds.minLon);
  const margin = 0.01;
  let count = 0;

  for (const lm of LM) {
    if (lm.lat < bounds.minLat - margin || lm.lat > bounds.maxLat + margin) continue;
    if (lm.lon < bounds.minLon - margin || lm.lon > bounds.maxLon + margin) continue;
    const x = (lm.lon - cLon) * lo2mm;
    const z = -(lm.lat - cLat) * la2mm;
    const W2 = wMm / 2, D2 = dMm / 2;
    // Vérifier si dans la zone
    const inBounds = x >= -W2 - 1 && x <= W2 + 1 && z >= -D2 - 1 && z <= D2 + 1;
    if (!inBounds) continue;

    const baseY = sampleAt(x, z);
    const hMm = Math.min(wMm * 0.25, Math.max(5, lm.rH * mmPerMeter * 2));
    const wMmL = Math.min(wMm * 0.08, Math.max(1.5, lm.rW * mmPerMeter));
    const dMmL = Math.min(wMm * 0.08, Math.max(1.5, lm.rD * mmPerMeter));

    const geo = mkLandmarkGeo(lm.sh, wMmL, hMm, dMmL);
    if (!geo) continue;
    geo.translate(x, baseY, z);

    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
      color: new THREE.Color(lm.c), roughness: 0.7, metalness: 0.05, flatShading: true,
      polygonOffset: true, polygonOffsetFactor: -20, polygonOffsetUnits: -20,
    }));
    m.name = 'LM_' + lm.n;
    state.tg.add(m);
    count++;
  }
  if (count) console.log(`Landmarks: ${count} monument(s)`);
}
