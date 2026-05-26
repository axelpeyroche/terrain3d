/* ════════════════════════════════════════════
   SCENE BUILD — Converts geometry worker output → Three.js meshes
   ════════════════════════════════════════════ */

import * as THREE from 'three';
import { state, getSettings } from '../state';
import { clearTG } from './setup';
import type { GeometryResult, LayerGeo } from '../types';
import {
  COL_LAND, COL_ROCK, COL_GRASS, COL_FOREST, COL_PARK, COL_FARM, COL_PED,
} from '../constants';

/** Crée un Three.js Mesh depuis les arrays renvoyés par le geometry worker */
function layerToMesh(
  layer: LayerGeo,
  mat: THREE.Material,
  name: string,
): THREE.Mesh | null {
  if (!layer.positions.length || !layer.indices.length) return null;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(layer.positions, 3));
  if (layer.colors) {
    geo.setAttribute('color', new THREE.BufferAttribute(layer.colors, 3));
  }
  geo.setIndex(new THREE.BufferAttribute(layer.indices, 1));
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, mat);
  m.name = name;
  return m;
}

/** Construit la scène Three.js à partir du résultat du geometry worker */
export function applyGeometry(result: GeometryResult) {
  if (!state.tg) return;
  clearTG();
  const st = getSettings();
  const tg = state.tg;

  function add(layer: LayerGeo, mat: THREE.Material, name: string, pof = -8) {
    // PolygonOffset via material properties
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = pof;
    mat.polygonOffsetUnits = pof;
    const m = layerToMesh(layer, mat, name);
    if (m) tg.add(m);
  }

  const std = (col: string, rough = 0.95, flat = false, side = THREE.FrontSide) =>
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(col), roughness: rough, metalness: 0,
      flatShading: flat, side,
    });

  /* ── TERRAIN (vertex colors, flatShading, DoubleSide) ── */
  {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.92, metalness: 0,
      flatShading: true, side: THREE.DoubleSide,
    });
    mat.polygonOffset = true;
    mat.polygonOffsetFactor = 20;
    mat.polygonOffsetUnits = 20;
    const m = layerToMesh(result.TERRAIN, mat, 'TERRAIN');
    if (m) tg.add(m);
  }

  /* ── BASE (socle plein) ── */
  {
    const { wMm, dMm, BASE_H, zoneType } = state;
    const sh = buildBaseShape(wMm, dMm, zoneType);
    if (sh) {
      const geo = new THREE.ExtrudeGeometry(sh, { depth: BASE_H, bevelEnabled: false });
      geo.rotateX(-Math.PI / 2);
      const mat = new THREE.MeshStandardMaterial({ color: new THREE.Color(st.cBase), roughness: 0.55 });
      const m = new THREE.Mesh(geo, mat);
      m.name = 'BASE';
      tg.add(m);
    }
  }

  /* ── PAROIS LATÉRALES ── */
  buildSideWalls(st.cBase);

  /* ── GROUND FILL (vertex colors, flatShading) ── */
  if (result.GROUND.positions.length) {
    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.95, metalness: 0, flatShading: true,
    });
    mat.polygonOffset = true; mat.polygonOffsetFactor = -1; mat.polygonOffsetUnits = -1;
    const m = layerToMesh(result.GROUND, mat, 'GROUND');
    if (m) tg.add(m);
  }

  /* ── OVERTURE LAYERS ── */
  if (st.grassOn) {
    add(result.LAND,      std(COL_LAND),   'LAND',    -2);
    add(result.ROCK,      std(COL_ROCK),   'ROCK',    -3);
    add(result.FARM,      std(COL_FARM),   'FARM',    -4);
    add(result.GRASS,     std(COL_GRASS),  'GRASS',   -5);
    add(result.PARKS,     std(COL_PARK),   'PARKS',   -6);
    add(result.FOREST,    std(COL_FOREST), 'FOREST',  -7);
  }
  if (st.waterOn) {
    const wMat = std(st.waterCol, 0.10);
    wMat.side = THREE.DoubleSide;
    add(result.WATER, wMat, 'WATER', -8);
  }
  if (st.roadsOn) {
    add(result.PED,   std(COL_PED,  0.9), 'PEDEST', -9);
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
    });
    mat.polygonOffset = true; mat.polygonOffsetFactor = -30; mat.polygonOffsetUnits = -30;
    const m = layerToMesh(result.GPX, mat, 'GPX');
    if (m) tg.add(m);
  }
}

/* ── Forme du socle ── */
function buildBaseShape(wMm: number, dMm: number, zoneType: string): THREE.Shape | null {
  const sh = new THREE.Shape();
  if (zoneType === 'circ') {
    sh.ellipse(0, 0, wMm / 2, dMm / 2, 0, Math.PI * 2, false, 0);
  } else if (zoneType === 'hex') {
    const R = wMm / 2;
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2 - Math.PI / 6;
      i === 0 ? sh.moveTo(R * Math.cos(a), R * Math.sin(a)) : sh.lineTo(R * Math.cos(a), R * Math.sin(a));
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

/* ── Parois latérales terrain-following ── */
function buildSideWalls(cBase: string) {
  if (!state.tg) return;
  const { wMm, dMm, elevGrid, GRID, BASE_H } = state;
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cBase), roughness: 0.55, side: THREE.DoubleSide,
  });

  function sampleEdge(x: number, z: number): number {
    if (!elevGrid || !GRID) return BASE_H;
    // Légèrement en retrait (×0.98) pour capturer la vraie hauteur du terrain au bord
    const xr = x * 0.98, zr = z * 0.98;
    const fc = (xr + wMm / 2) / wMm * (GRID - 1);
    const fr = (zr + dMm / 2) / dMm * (GRID - 1);
    const c0 = Math.max(0, Math.min(GRID - 2, Math.floor(fc)));
    const r0 = Math.max(0, Math.min(GRID - 2, Math.floor(fr)));
    const tc = fc - c0, tr = fr - r0;
    const { minE, elevRange, elevScaleMm } = state;
    const e00 = elevGrid[r0 * GRID + c0] ?? minE;
    const e10 = elevGrid[r0 * GRID + c0 + 1] ?? minE;
    const e01 = elevGrid[(r0 + 1) * GRID + c0] ?? minE;
    const e11 = elevGrid[(r0 + 1) * GRID + c0 + 1] ?? minE;
    const e = e00 * (1 - tc) * (1 - tr) + e10 * tc * (1 - tr) + e01 * (1 - tc) * tr + e11 * tc * tr;
    const n = Math.max(0, Math.min(1, (e - minE) / Math.max(0.001, elevRange)));
    return Math.max(BASE_H, BASE_H + n * elevScaleMm);
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
      const t1 = p1.topY, t2 = p2.topY;
      verts.push(p1.x, t1, p1.z, p2.x, t2, p2.z, p2.x, 0, p2.z, p1.x, 0, p1.z);
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

  const { zoneType } = state;
  if (zoneType === 'circ') {
    const N = 512, R = wMm / 2;
    makeWalls(Array.from({ length: N }, (_, i) => {
      const a = i / N * Math.PI * 2;
      const x = R * Math.cos(a), z = R * Math.sin(a);
      return { x, z, topY: sampleEdge(x, z) };
    }));
  } else if (zoneType === 'hex') {
    const R = wMm / 2;
    makeWalls(Array.from({ length: 6 }, (_, i) => {
      const a = i / 6 * Math.PI * 2 - Math.PI / 6;
      const x = R * Math.cos(a), z = R * Math.sin(a);
      return { x, z, topY: sampleEdge(x, z) };
    }));
  } else if (state.zonePts && state.zonePts.length >= 3) {
    const { bounds } = state;
    if (!bounds) return;
    const la2mm = dMm / (bounds.maxLat - bounds.minLat);
    const lo2mm = wMm / (bounds.maxLon - bounds.minLon);
    const cLat = (bounds.minLat + bounds.maxLat) / 2;
    const cLon = (bounds.minLon + bounds.maxLon) / 2;
    makeWalls(state.zonePts.map(([lat, lon]) => {
      const x = (lon - cLon) * lo2mm, z = -(lat - cLat) * la2mm;
      return { x, z, topY: sampleEdge(x, z) };
    }));
  } else {
    // Rect
    const x1 = -wMm / 2, x2 = wMm / 2, z1 = -dMm / 2, z2 = dMm / 2;
    makeWalls([
      { x: x1, z: z1, topY: sampleEdge(x1, z1) },
      { x: x2, z: z1, topY: sampleEdge(x2, z1) },
      { x: x2, z: z2, topY: sampleEdge(x2, z2) },
      { x: x1, z: z2, topY: sampleEdge(x1, z2) },
    ]);
  }
}
