/* ════════════════════════════════════════════
   GEOMETRY WORKER — All geometry math without Three.js
   Runs in a Web Worker. Uses earcut for triangulation.
   Returns raw Float32Array / Uint32Array for each layer.
   ════════════════════════════════════════════ */

import earcut from 'earcut';
import type {
  GeometryWorkerInput, GeometryResult, LayerGeo,
  OvertureFeature, LatLon, Settings,
} from '../types';
import {
  MIN_SURF, H_LAND, H_ROCK, H_WATER, H_GRASS, H_PARK, H_FOREST, H_PED, H_ROAD,
  COL_LAND, COL_ROCK, ROAD_W_M, ROAD_W_MIN, VEHICLE_CLASSES, PED_CLASSES,
  ROCK_LO, ROCK_HI, POLY_SINK,
} from '../constants';

/* ═══ State partagé (reçu du thread principal) ════════════════════════════ */
let G: GeometryWorkerInput;

/* ─── Helpers de couleur ─── */
function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16 & 0xff) / 255, (v >> 8 & 0xff) / 255, (v & 0xff) / 255];
}

/* ─── Coordonnées locales ─── */
function toLocal(lat: number, lon: number) {
  const { bounds, wMm, dMm } = G;
  const cLat = (bounds.minLat + bounds.maxLat) / 2;
  const cLon = (bounds.minLon + bounds.maxLon) / 2;
  const la2mm = dMm / (bounds.maxLat - bounds.minLat);
  const lo2mm = wMm / (bounds.maxLon - bounds.minLon);
  return { x: (lon - cLon) * lo2mm, z: -(lat - cLat) * la2mm };
}

/* ─── Zone membership ─── */
function inZone(x: number, z: number): boolean {
  const W = G.wMm / 2, D = G.dMm / 2;
  if (G.zoneType === 'circ') return (x / W) ** 2 + (z / D) ** 2 <= 1.01;
  if (G.zoneType === 'hex') {
    const ax = Math.abs(x / W), az = Math.abs(z / D);
    return ax <= 1 && az <= 1 && ax + az <= 1.42;
  }
  return x >= -W - 0.1 && x <= W + 0.1 && z >= -D - 0.1 && z <= D + 0.1;
}

/* ─── Échantillonnage terrain ─── */
function sampleY(x: number, z: number): number {
  const { elevGrid, GRID, wMm, dMm, minE, elevRange, BASE_H, elevScaleMm } = G;
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
  const n = Math.max(0, Math.min(1, (e - minE) / Math.max(0.001, elevRange)));
  return BASE_H + n * elevScaleMm;
}

/* ─── Calcul des normales ─── */
function computeNormals(pos: Float32Array, idx: Uint32Array): Float32Array {
  const normals = new Float32Array(pos.length);
  for (let i = 0; i < idx.length; i += 3) {
    const ia = idx[i] * 3, ib = idx[i + 1] * 3, ic = idx[i + 2] * 3;
    const ax = pos[ib] - pos[ia], ay = pos[ib + 1] - pos[ia + 1], az = pos[ib + 2] - pos[ia + 2];
    const bx = pos[ic] - pos[ia], by = pos[ic + 1] - pos[ia + 1], bz = pos[ic + 2] - pos[ia + 2];
    const nx = ay * bz - az * by, ny = az * bx - ax * bz, nz = ax * by - ay * bx;
    for (const vi of [ia, ib, ic]) {
      normals[vi] += nx; normals[vi + 1] += ny; normals[vi + 2] += nz;
    }
  }
  for (let i = 0; i < normals.length; i += 3) {
    const l = Math.sqrt(normals[i] ** 2 + normals[i + 1] ** 2 + normals[i + 2] ** 2) || 1;
    normals[i] /= l; normals[i + 1] /= l; normals[i + 2] /= l;
  }
  return normals;
}

/* ─── Merge de plusieurs géométries ─── */
function mergeGeos(
  geos: Array<{ verts: number[]; tris: number[] }>,
): LayerGeo {
  let tv = 0, ti = 0;
  for (const g of geos) { tv += g.verts.length; ti += g.tris.length; }
  if (!tv) return { positions: new Float32Array(0), indices: new Uint32Array(0) };
  const pos = new Float32Array(tv);
  const idx = new Uint32Array(ti);
  let vo = 0, io = 0;
  for (const g of geos) {
    pos.set(g.verts, vo);
    const base = vo / 3;
    for (let i = 0; i < g.tris.length; i++) idx[io + i] = g.tris[i] + base;
    vo += g.verts.length; io += g.tris.length;
  }
  return { positions: pos, indices: idx };
}

/* ════════════════════════════════════════════
   TERRAIN MESH
   ════════════════════════════════════════════ */
function buildTerrainMesh(): LayerGeo {
  const { GRID, wMm, dMm, BASE_H, elevScaleMm, minE, elevRange, elevGrid } = G;
  const W = wMm, D = dMm;

  // Grille GRID×GRID
  const count = GRID * GRID;
  const pos = new Float32Array(count * 3);
  const colArr = new Float32Array(count * 3);
  const [lr, lg, lb] = hexToRgb(COL_LAND);
  const [rr, rg, rb] = hexToRgb(COL_ROCK);
  const isIn: boolean[] = [];

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const i = row * GRID + col;
      const x = -W / 2 + (col / (GRID - 1)) * W;
      const z = -D / 2 + (row / (GRID - 1)) * D;
      const inside = inZone(x, z);
      isIn.push(inside);
      const e = elevGrid ? (elevGrid[i] ?? minE) : minE;
      const n = Math.max(0, Math.min(1, (e - minE) / Math.max(0.001, elevRange)));
      const y = inside ? BASE_H + MIN_SURF + n * elevScaleMm : BASE_H;
      pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
      // Vertex color
      let cr: number, cg: number, cb: number;
      if (!inside || n < ROCK_LO) { cr = lr; cg = lg; cb = lb; }
      else if (n >= ROCK_HI) { cr = rr; cg = rg; cb = rb; }
      else {
        const t = (n - ROCK_LO) / (ROCK_HI - ROCK_LO);
        cr = lr + (rr - lr) * t; cg = lg + (rg - lg) * t; cb = lb + (rb - lb) * t;
      }
      colArr[i * 3] = cr; colArr[i * 3 + 1] = cg; colArr[i * 3 + 2] = cb;
    }
  }

  // Indices
  const rawIdx: number[] = [];
  for (let row = 0; row < GRID - 1; row++) {
    for (let col = 0; col < GRID - 1; col++) {
      const a = row * GRID + col, b = a + 1, c = a + GRID, d = c + 1;
      if (isIn[a] || isIn[b] || isIn[c]) rawIdx.push(a, b, c);
      if (isIn[b] || isIn[d] || isIn[c]) rawIdx.push(b, d, c);
    }
  }

  // Pour zone circulaire : projeter les sommets hors zone sur le bord
  if (G.zoneType === 'circ') {
    const R = W / 2;
    for (let i = 0; i < isIn.length; i++) {
      if (!isIn[i]) {
        const x = pos[i * 3], z = pos[i * 3 + 2];
        const r = Math.sqrt(x * x + z * z) || 0.001;
        pos[i * 3] = x / r * R; pos[i * 3 + 2] = z / r * R;
      }
    }
  }

  const indices = new Uint32Array(rawIdx);
  return { positions: pos, indices, colors: colArr };
}

/* ════════════════════════════════════════════
   GROUND FILL (maillage fin, vertex colors)
   ════════════════════════════════════════════ */
function buildGroundFill(): LayerGeo {
  const { wMm, dMm, BASE_H, elevScaleMm } = G;
  const W = wMm / 2, D = dMm / 2;
  const STEP = Math.max(1.0, Math.min(4.0, wMm / 60));
  const xN = Math.ceil(wMm / STEP) + 1;
  const zN = Math.ceil(dMm / STEP) + 1;
  const [lr, lg, lb] = hexToRgb(COL_LAND);
  const [rr, rg, rb] = hexToRgb(COL_ROCK);

  const verts: number[] = [], colors: number[] = [];
  const grid = new Int32Array(xN * zN).fill(-1);

  for (let zi = 0; zi < zN; zi++) {
    for (let xi = 0; xi < xN; xi++) {
      const x = -W + (xi / (xN - 1)) * wMm;
      const z = -D + (zi / (zN - 1)) * dMm;
      if (!inZone(x, z)) continue;
      const vi = verts.length / 3;
      grid[zi * xN + xi] = vi;
      const y = sampleY(x, z) + H_LAND;
      verts.push(x, y, z);
      const ratio = elevScaleMm > 0 ? Math.max(0, Math.min(1, (y - BASE_H) / elevScaleMm)) : 0;
      let cr: number, cg: number, cb: number;
      if (ratio >= ROCK_HI) { cr = rr; cg = rg; cb = rb; }
      else if (ratio >= ROCK_LO) {
        const t = (ratio - ROCK_LO) / (ROCK_HI - ROCK_LO);
        cr = lr + (rr - lr) * t; cg = lg + (rg - lg) * t; cb = lb + (rb - lb) * t;
      } else { cr = lr; cg = lg; cb = lb; }
      colors.push(cr, cg, cb);
    }
  }
  if (!verts.length) return { positions: new Float32Array(0), indices: new Uint32Array(0) };

  const tris: number[] = [];
  for (let zi = 0; zi < zN - 1; zi++) {
    for (let xi = 0; xi < xN - 1; xi++) {
      const a = grid[zi * xN + xi], b = grid[zi * xN + xi + 1];
      const c = grid[(zi + 1) * xN + xi], d = grid[(zi + 1) * xN + xi + 1];
      if (a >= 0 && b >= 0 && c >= 0) tris.push(a, b, c);
      if (b >= 0 && d >= 0 && c >= 0) tris.push(b, d, c);
    }
  }
  return {
    positions: new Float32Array(verts),
    indices: new Uint32Array(tris),
    colors: new Float32Array(colors),
  };
}

/* ════════════════════════════════════════════
   CLIPPING
   ════════════════════════════════════════════ */
function interpPt(
  a: { x: number; z: number },
  b: { x: number; z: number },
  t: number,
) { return { x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t }; }

function boundaryPt(a: { x: number; z: number }, b: { x: number; z: number }) {
  const W = G.wMm / 2, D = G.dMm / 2;
  if (G.zoneType === 'circ' || G.zoneType === 'hex') {
    // Bisect jusqu'au bord
    let lo = 0, hi = 1;
    for (let k = 0; k < 16; k++) {
      const m = (lo + hi) / 2;
      const p = interpPt(a, b, m);
      inZone(p.x, p.z) ? lo = m : hi = m;
    }
    return interpPt(a, b, (lo + hi) / 2);
  }
  // Rect : Liang-Barsky
  const dx = b.x - a.x, dz = b.z - a.z;
  let tEnter = 0, tExit = 1;
  const check = (p: number, q: number) => {
    if (Math.abs(p) < 1e-10) return q >= 0;
    const t = q / p;
    if (p < 0) { if (t > tEnter) tEnter = t; } else { if (t < tExit) tExit = t; }
    return tEnter <= tExit;
  };
  if (!check(-dx, a.x - (-W))) return interpPt(a, b, 0.5);
  if (!check(dx, W - a.x)) return interpPt(a, b, 0.5);
  if (!check(-dz, a.z - (-D))) return interpPt(a, b, 0.5);
  if (!check(dz, D - a.z)) return interpPt(a, b, 0.5);
  return interpPt(a, b, inZone(a.x, a.z) ? tExit : tEnter);
}

/** Poly clipping — Sutherland-Hodgman adapté à la zone */
function clipPoly(pts: Array<{ x: number; z: number }>) {
  if (pts.length < 3) return [];
  const W = G.wMm / 2, D = G.dMm / 2;
  function clipEdge(
    pts2: typeof pts,
    isIn2: (p: { x: number; z: number }) => boolean,
    intersect: (a: { x: number; z: number }, b: { x: number; z: number }) => { x: number; z: number },
  ) {
    const out: typeof pts = [];
    const n = pts2.length;
    for (let i = 0; i < n; i++) {
      const a = pts2[(i - 1 + n) % n], b = pts2[i];
      const aIn = isIn2(a), bIn = isIn2(b);
      if (bIn) { if (!aIn) out.push(intersect(a, b)); out.push(b); }
      else if (aIn) out.push(intersect(a, b));
    }
    return out;
  }
  if (G.zoneType === 'circ' || G.zoneType === 'hex') {
    return clipEdge(pts, p => inZone(p.x, p.z), boundaryPt);
  }
  let r = clipEdge(pts, p => p.x >= -W, (a, b) => {
    const t = (-W - a.x) / (b.x - a.x); return interpPt(a, b, t);
  });
  r = clipEdge(r, p => p.x <= W, (a, b) => {
    const t = (W - a.x) / (b.x - a.x); return interpPt(a, b, t);
  });
  r = clipEdge(r, p => p.z >= -D, (a, b) => {
    const t = (-D - a.z) / (b.z - a.z); return interpPt(a, b, t);
  });
  r = clipEdge(r, p => p.z <= D, (a, b) => {
    const t = (D - a.z) / (b.z - a.z); return interpPt(a, b, t);
  });
  return r;
}

/** Line clipping → segments contigus séparés */
function clipLineToSegments(pts: Array<{ x: number; z: number }>) {
  const segs: typeof pts[] = [];
  let cur: typeof pts = [];
  function flush() { if (cur.length >= 2) segs.push(cur); cur = []; }
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], inside = inZone(p.x, p.z);
    if (i === 0) { if (inside) cur = [p]; continue; }
    const prev = pts[i - 1], prevIn = inZone(prev.x, prev.z);
    if (prevIn && inside) cur.push(p);
    else if (prevIn && !inside) { cur.push(boundaryPt(prev, p)); flush(); }
    else if (!prevIn && inside) { cur = [boundaryPt(prev, p), p]; }
  }
  flush();
  return segs;
}

/* ════════════════════════════════════════════
   RIBBON (routes, rivières, GPX)
   ════════════════════════════════════════════ */
function drapeSegment(seg: Array<{ x: number; z: number }>) {
  const { wMm, dMm, GRID } = G;
  const STEP = Math.max(wMm, dMm) / (GRID - 1) * 1.2;
  const out: Array<{ x: number; y: number; z: number }> = [];
  for (let i = 0; i < seg.length; i++) {
    const p = seg[i];
    out.push({ x: p.x, y: sampleY(p.x, p.z), z: p.z });
    if (i < seg.length - 1) {
      const b = seg[i + 1];
      const dx = b.x - p.x, dz = b.z - p.z, dist = Math.hypot(dx, dz);
      const nSteps = Math.min(8, Math.floor(dist / STEP));
      for (let k = 1; k < nSteps; k++) {
        const f = k / nSteps, mx = p.x + dx * f, mz = p.z + dz * f;
        out.push({ x: mx, y: sampleY(mx, mz), z: mz });
      }
    }
  }
  return out;
}

function mkRibbonGeo(
  pts3: Array<{ x: number; y: number; z: number }>,
  width: number,
  depth: number,
): { verts: number[]; tris: number[] } | null {
  // Déduplification
  const MIN_PT = Math.max(0.05, width * 0.10);
  const filt = [pts3[0]];
  for (let i = 1; i < pts3.length; i++) {
    const p = pts3[i], q = filt[filt.length - 1];
    if (Math.hypot(p.x - q.x, p.z - q.z) >= MIN_PT) filt.push(p);
  }
  if (filt.length < 2) return null;

  const hw = width / 2, n = filt.length;
  const verts: number[] = [];
  const tris: number[] = [];

  function segN(p: { x: number; z: number }, q: { x: number; z: number }) {
    const dx = q.x - p.x, dz = q.z - p.z, l = Math.sqrt(dx * dx + dz * dz);
    return l < 1e-8 ? { x: 1, z: 0 } : { x: -dz / l, z: dx / l };
  }

  for (let i = 0; i < n; i++) {
    let nx: number, nz: number;
    if (n < 3 || i === 0) { const s = segN(filt[0], filt[1]); nx = s.x; nz = s.z; }
    else if (i === n - 1) { const s = segN(filt[n - 2], filt[n - 1]); nx = s.x; nz = s.z; }
    else {
      const s1 = segN(filt[i - 1], filt[i]), s2 = segN(filt[i], filt[i + 1]);
      const mx = s1.x + s2.x, mz = s1.z + s2.z, ml = Math.sqrt(mx * mx + mz * mz);
      if (ml < 0.01) { nx = s2.x; nz = s2.z; }
      else {
        const dot = (mx / ml) * s2.x + (mz / ml) * s2.z;
        const scale = Math.min(3.0, 1 / Math.max(0.35, dot));
        nx = mx / ml * scale; nz = mz / ml * scale;
      }
    }
    const p = filt[i], y = p.y, b = p.y - depth;
    verts.push(
      p.x - nx * hw, y, p.z - nz * hw,
      p.x + nx * hw, y, p.z + nz * hw,
      p.x - nx * hw, b, p.z - nz * hw,
      p.x + nx * hw, b, p.z + nz * hw,
    );
  }

  for (let i = 0; i < n - 1; i++) {
    const a = i * 4, b2 = (i + 1) * 4;
    tris.push(a, b2, b2 + 1, a, b2 + 1, a + 1);
    tris.push(a + 2, b2 + 3, b2 + 2, a + 2, a + 3, b2 + 3);
    tris.push(a, a + 2, b2 + 2, a, b2 + 2, b2);
    tris.push(a + 1, b2 + 1, b2 + 3, a + 1, b2 + 3, a + 3);
  }
  // Capuchons
  tris.push(0, 2, 3, 0, 3, 1);
  const e = (n - 1) * 4;
  tris.push(e, e + 1, e + 3, e, e + 3, e + 2);
  return { verts, tris };
}

/* ════════════════════════════════════════════
   POLYGON EXTRUSION terrain-following
   ════════════════════════════════════════════ */
function extrudeTerrain(
  pts: Array<{ x: number; z: number }>,
  h: number,
): { verts: number[]; tris: number[] } | null {
  if (pts.length < 3) return null;
  try {
    // Subdiviser les grandes arêtes
    const { wMm, dMm, GRID } = G;
    const PSUB = Math.max(wMm, dMm) / (GRID - 1) * 2.5;
    const dense: Array<{ x: number; z: number }> = [];
    for (let i = 0; i < pts.length; i++) {
      dense.push(pts[i]);
      const nx = pts[(i + 1) % pts.length];
      const dx = nx.x - pts[i].x, dz = nx.z - pts[i].z;
      const dist = Math.hypot(dx, dz);
      const ns = Math.min(5, Math.floor(dist / PSUB));
      for (let k = 1; k < ns; k++) {
        const f = k / ns;
        dense.push({ x: pts[i].x + dx * f, z: pts[i].z + dz * f });
      }
    }
    // Déduplification
    const deduped: typeof dense = [dense[0]];
    for (let i = 1; i < dense.length; i++) {
      const pv = deduped[deduped.length - 1], p = dense[i];
      if (Math.hypot(p.x - pv.x, p.z - pv.z) > 0.01) deduped.push(p);
    }
    if (deduped.length < 3) return null;

    const n = deduped.length;
    const flatCoords: number[] = [];
    for (const p of deduped) { flatCoords.push(p.x, -p.z); }
    const triIdx = earcut(flatCoords);
    if (!triIdx.length) return null;

    const verts: number[] = [];
    for (let i = 0; i < n; i++) {
      const y = sampleY(deduped[i].x, deduped[i].z);
      verts.push(deduped[i].x, y + h, deduped[i].z);       // top
    }
    for (let i = 0; i < n; i++) {
      const y = sampleY(deduped[i].x, deduped[i].z);
      verts.push(deduped[i].x, y - POLY_SINK, deduped[i].z); // bottom
    }

    const tris: number[] = [];
    // Top face
    for (let i = 0; i < triIdx.length; i += 3) tris.push(triIdx[i], triIdx[i + 1], triIdx[i + 2]);
    // Bottom face (flipped)
    for (let i = 0; i < triIdx.length; i += 3) tris.push(n + triIdx[i + 2], n + triIdx[i + 1], n + triIdx[i]);
    // Side walls
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      tris.push(i, n + i, n + j, i, n + j, j);
    }
    return { verts, tris };
  } catch { return null; }
}

/* ════════════════════════════════════════════
   BUILDINGS (ExtrudeGeometry equivalent)
   ════════════════════════════════════════════ */
function extrudeBuilding(
  pts: Array<{ x: number; z: number }>,
  hMm: number,
): { verts: number[]; tris: number[] } | null {
  if (pts.length < 3) return null;
  try {
    const n = pts.length;
    const baseY = pts.reduce((mn, p) => Math.min(mn, sampleY(p.x, p.z)), Infinity);
    const flatCoords: number[] = [];
    for (const p of pts) flatCoords.push(p.x, -p.z);
    const triIdx = earcut(flatCoords);
    if (!triIdx.length) return null;

    const verts: number[] = [];
    for (const p of pts) verts.push(p.x, baseY, p.z);       // bottom
    for (const p of pts) verts.push(p.x, baseY + hMm, p.z); // top

    const tris: number[] = [];
    // Bottom (flipped)
    for (let i = 0; i < triIdx.length; i += 3) tris.push(triIdx[i + 2], triIdx[i + 1], triIdx[i]);
    // Top
    for (let i = 0; i < triIdx.length; i += 3) tris.push(n + triIdx[i], n + triIdx[i + 1], n + triIdx[i + 2]);
    // Sides
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      tris.push(i, j, n + j, i, n + j, n + i);
    }
    return { verts, tris };
  } catch { return null; }
}

/* ════════════════════════════════════════════
   GPX
   ════════════════════════════════════════════ */
function buildGPX(): LayerGeo {
  const { gpxPoints, settings, wMm, dMm, GRID } = G;
  if (!gpxPoints.length) return { positions: new Float32Array(0), indices: new Uint32Array(0) };

  const raw = gpxPoints.map(p => toLocal(p.lat, p.lon)).filter(p => isFinite(p.x) && isFinite(p.z));
  if (raw.length < 2) return { positions: new Float32Array(0), indices: new Uint32Array(0) };

  const W2 = 9, half = Math.floor(W2 / 2);
  const smoothed = raw.map((_, i) => {
    const s = Math.max(0, i - half), e2 = Math.min(raw.length - 1, i + half), cnt = e2 - s + 1;
    let sx = 0, sz = 0;
    for (let j = s; j <= e2; j++) { sx += raw[j].x; sz += raw[j].z; }
    const nx = sx / cnt, nz = sz / cnt;
    return { x: nx, y: sampleY(nx, nz) + settings.gpxH, z: nz };
  });

  const MIN_D = 0.05;
  const simp = [smoothed[0]];
  for (let i = 1; i < smoothed.length; i++) {
    const p = simp[simp.length - 1], q = smoothed[i];
    if (Math.hypot(q.x - p.x, q.z - p.z) >= MIN_D) simp.push(q);
  }
  if (simp[simp.length - 1] !== smoothed[smoothed.length - 1]) simp.push(smoothed[smoothed.length - 1]);
  if (simp.length < 2) return { positions: new Float32Array(0), indices: new Uint32Array(0) };

  const { mmPerMeter } = G;
  const tubeW = Math.max(settings.gpxMW, settings.gpxTW * mmPerMeter);
  const geo = mkRibbonGeo(simp, tubeW + 0.3, settings.gpxH + 0.3);
  if (!geo) return { positions: new Float32Array(0), indices: new Uint32Array(0) };
  return mergeGeos([geo]);
}

/* ════════════════════════════════════════════
   OVERTURE FEATURES
   ════════════════════════════════════════════ */
function buildOverture(): Partial<GeometryResult> {
  const { features, settings, mmPerMeter } = G;
  const landGs: Array<{ verts: number[]; tris: number[] }> = [];
  const rockGs: typeof landGs = [];
  const waterGs: typeof landGs = [];
  const parkGs: typeof landGs = [];
  const forestGs: typeof landGs = [];
  const grassGs: typeof landGs = [];
  const farmGs: typeof landGs = [];
  const pedGs: typeof landGs = [];
  const roadGs: typeof landGs = [];
  const buildGs: typeof landGs = [];

  function processRing(rings: LatLon[][]): Array<{ x: number; z: number }> {
    return rings[0].map(ll => toLocal(ll.lat, ll.lon));
  }

  for (const feat of features) {
    const { layer, type, properties: p, rings } = feat;
    if (!rings?.[0]?.length) continue;

    const outerRing = processRing(rings);
    const cx = outerRing.reduce((s, pt) => s + pt.x, 0) / outerRing.length;
    const cz = outerRing.reduce((s, pt) => s + pt.z, 0) / outerRing.length;
    if (!inZone(cx, cz) && !outerRing.some(pt => inZone(pt.x, pt.z))) continue;

    const isPoly = type === 3, isLine = type === 2;

    /* ── BUILDINGS ── */
    if (layer === 'building' && settings.buildOn && isPoly) {
      let hM = 5;
      if (p.height) hM = parseFloat(String(p.height)) || 5;
      else if (p.num_floors) hM = parseFloat(String(p.num_floors)) * 3.2;
      const hMm = Math.min(G.wMm * 0.10, Math.max(2.0, hM * mmPerMeter * settings.buildHS));
      const clipped = clipPoly(outerRing);
      if (clipped.length >= 3) {
        const geo = extrudeBuilding(clipped, hMm);
        if (geo) buildGs.push(geo);
      }
      continue;
    }

    /* ── ROADS ── */
    if (layer === 'segment' && settings.roadsOn && isLine) {
      if (p.subtype && p.subtype !== 'road') continue;
      const cls = String(p.class || 'residential');
      const realW = (ROAD_W_M[cls] || 4) * mmPerMeter;
      const wMm = Math.max(ROAD_W_MIN[cls] || 0.3, realW);

      for (const seg of clipLineToSegments(outerRing)) {
        const len = seg.reduce((s, pt, i) =>
          i === 0 ? 0 : s + Math.hypot(pt.x - seg[i - 1].x, pt.z - seg[i - 1].z), 0);
        if (len < 1.0) continue;
        const draped = drapeSegment(seg);
        if (PED_CLASSES.has(cls)) {
          const pts3 = draped.map(pt => ({ x: pt.x, y: pt.y + H_PED, z: pt.z }));
          const geo = mkRibbonGeo(pts3, wMm, H_PED + 0.3);
          if (geo) pedGs.push(geo);
        } else if (VEHICLE_CLASSES.has(cls)) {
          const pts3 = draped.map(pt => ({ x: pt.x, y: pt.y + H_ROAD, z: pt.z }));
          const geo = mkRibbonGeo(pts3, wMm, H_ROAD + 0.3);
          if (geo) roadGs.push(geo);
        }
      }
      continue;
    }

    /* ── WATER ── */
    if (layer === 'water' && settings.waterOn) {
      if (isPoly) {
        const clipped = clipPoly(outerRing);
        const geo = extrudeTerrain(clipped, H_WATER);
        if (geo) waterGs.push(geo);
      } else if (isLine) {
        const wMm2 = Math.max(0.5, 1.5 * mmPerMeter);
        for (const seg of clipLineToSegments(outerRing)) {
          const len = seg.reduce((s, pt, i) =>
            i === 0 ? 0 : s + Math.hypot(pt.x - seg[i - 1].x, pt.z - seg[i - 1].z), 0);
          if (len < 1.0) continue;
          const draped = drapeSegment(seg);
          const pts3 = draped.map(pt => ({ x: pt.x, y: pt.y + H_WATER, z: pt.z }));
          const geo = mkRibbonGeo(pts3, wMm2, H_WATER + 0.3);
          if (geo) waterGs.push(geo);
        }
      }
      continue;
    }

    if (!settings.grassOn) continue;

    /* ── LAND ── */
    if (layer === 'land' && isPoly) {
      const clipped = clipPoly(outerRing);
      const geo = extrudeTerrain(clipped, H_LAND);
      if (geo) landGs.push(geo);
    }

    /* ── LAND USE ── */
    else if (layer === 'land_use' && isPoly) {
      const sub = String(p.subtype || p.class || '').toLowerCase();
      const clipped = clipPoly(outerRing);
      if (!clipped.length) continue;
      if (/rock|scree|cliff|bare|quarry|talus|glacier|ice/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_ROCK); if (geo) rockGs.push(geo);
      } else if (/wood|forest/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_FOREST); if (geo) forestGs.push(geo);
      } else if (/park|urban_park|garden|nature|recreation|sport|golf|playground|pitch/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_PARK); if (geo) parkGs.push(geo);
      } else if (/grass|lawn|meadow|wetland|cemetery/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_GRASS); if (geo) grassGs.push(geo);
      } else if (/agriculture|farm|horticulture/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_GRASS); if (geo) farmGs.push(geo);
      } else {
        const geo = extrudeTerrain(clipped, H_LAND); if (geo) landGs.push(geo);
      }
    }

    /* ── LAND COVER ── */
    else if (layer === 'land_cover' && isPoly) {
      const sub = String(p.subtype || p.class || '').toLowerCase();
      const clipped = clipPoly(outerRing);
      if (!clipped.length) continue;
      if (/rock|scree|cliff|bare|talus|glacier|ice|snow/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_ROCK); if (geo) rockGs.push(geo);
      } else if (/tree|wood/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_FOREST); if (geo) forestGs.push(geo);
      } else if (/grass|scrub|moss/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_GRASS); if (geo) grassGs.push(geo);
      } else if (/crop/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_GRASS); if (geo) farmGs.push(geo);
      } else if (/sand|gravel|mud/.test(sub)) {
        const geo = extrudeTerrain(clipped, H_ROCK); if (geo) rockGs.push(geo);
      }
    }
  }

  return {
    LAND:      mergeGeos(landGs),
    ROCK:      mergeGeos(rockGs),
    WATER:     mergeGeos(waterGs),
    GRASS:     mergeGeos(grassGs),
    PARKS:     mergeGeos(parkGs),
    FOREST:    mergeGeos(forestGs),
    FARM:      mergeGeos(farmGs),
    PED:       mergeGeos(pedGs),
    ROADS:     mergeGeos(roadGs),
    BUILDINGS: mergeGeos(buildGs),
  };
}

/* ════════════════════════════════════════════
   MESSAGE HANDLER
   ════════════════════════════════════════════ */
const EMPTY: LayerGeo = { positions: new Float32Array(0), indices: new Uint32Array(0) };

self.onmessage = (e: MessageEvent<GeometryWorkerInput>) => {
  if (e.data.type !== 'BUILD_GEOMETRY') return;
  G = e.data;
  self.postMessage({ type: 'GEO_PROGRESS', step: 'TERRAIN', pct: 10 });

  const terrain = buildTerrainMesh();
  self.postMessage({ type: 'GEO_PROGRESS', step: 'GROUND', pct: 20 });

  const ground = buildGroundFill();
  self.postMessage({ type: 'GEO_PROGRESS', step: 'OVERTURE', pct: 30 });

  const overture = buildOverture();
  self.postMessage({ type: 'GEO_PROGRESS', step: 'GPX', pct: 85 });

  const gpx = buildGPX();

  const result: GeometryResult = {
    TERRAIN:   terrain,
    GROUND:    ground,
    LAND:      overture.LAND      ?? EMPTY,
    ROCK:      overture.ROCK      ?? EMPTY,
    WATER:     overture.WATER     ?? EMPTY,
    GRASS:     overture.GRASS     ?? EMPTY,
    FOREST:    overture.FOREST    ?? EMPTY,
    PARKS:     overture.PARKS     ?? EMPTY,
    FARM:      overture.FARM      ?? EMPTY,
    ROADS:     overture.ROADS     ?? EMPTY,
    PED:       overture.PED       ?? EMPTY,
    BUILDINGS: overture.BUILDINGS ?? EMPTY,
    GPX:       gpx,
  };

  // Transferables : tous les ArrayBuffers pour éviter la copie
  const transfers: ArrayBuffer[] = [];
  for (const layer of Object.values(result)) {
    transfers.push(layer.positions.buffer, layer.indices.buffer);
    if (layer.colors) transfers.push(layer.colors.buffer);
  }

  self.postMessage({ type: 'GEOMETRY_READY', ...result }, transfers);
};
