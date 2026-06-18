/* ════════════════════════════════════════════
   DIMS PREVIEW — 3D terrain preview for the Dimensions tab
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

const PREVIEW_GRID = 128;
const TILE_ZOOM = 12;
const TILE_SZ = 256;

let sceneObjs: THREE.Object3D[] = [];
const lblAnchors: { id: string; v: THREE.Vector3 }[] = [];

/* ══════════════════════════════════════════════
   RENDERER INIT
══════════════════════════════════════════════ */
export function initDimsRenderer(viewEl: HTMLElement): void {
  const canvas = viewEl.querySelector<HTMLCanvasElement>('#dims-canvas')!;
  const W = viewEl.clientWidth || 800;
  const H = viewEl.clientHeight || 600;

  if (renderer) {
    renderer.setSize(W, H, false);
    camera!.aspect = W / H;
    camera!.updateProjectionMatrix();
    return;
  }

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H, false);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x080c14);

  camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100000);

  controls = new OrbitControls(camera, canvas);
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

  new ResizeObserver(() => {
    const W = viewEl.clientWidth, H = viewEl.clientHeight;
    if (!W || !H) return;
    camera!.aspect = W / H;
    camera!.updateProjectionMatrix();
    renderer!.setSize(W, H, false);
  }).observe(viewEl);
}

/* ══════════════════════════════════════════════
   PUBLIC TYPES
══════════════════════════════════════════════ */
export interface DimSettings {
  wMm: number; dMm: number; baseH: number; exag: number;
  flatFacade: boolean; facadeWidthMm: number;
  gpxPoints: LatLon[];
  zoneType: string;
  zonePts: [number, number][] | null; // [lat, lon][]
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

    onProgress(40, 'Chargement de la carte…');
    cachedTexture = await buildMapTexture(
      bounds, cachedElev.grid, PREVIEW_GRID, cachedElev.minE, cachedElev.elevRange,
    );
  } else {
    onProgress(50, 'Reconstruction…');
  }

  // Zone mask: rebuild when zone shape changes
  const zoneKey = JSON.stringify(settings.zonePts);
  if (zoneKey !== cachedZoneKey || !cachedMask) {
    cachedZoneKey = zoneKey;
    if (cachedMask) { cachedMask.dispose(); cachedMask = null; }
    cachedMask = buildZoneMask(settings.zonePts, settings.zoneType, bounds, settings.wMm, settings.dMm);
  }

  onProgress(85, 'Construction de la scène 3D…');
  rebuildScene(settings);
  onProgress(100, '');
}

/* ══════════════════════════════════════════════
   REBUILD SCENE
══════════════════════════════════════════════ */
export function rebuildScene(s: DimSettings): void {
  if (!scene || !camera || !controls || !cachedElev || !cachedTexture) return;
  clearScene();

  const { wMm, dMm, baseH, exag, facadeWidthMm, gpxPoints, zoneType, zonePts, bounds } = s;
  const { grid, minE, elevRange } = cachedElev;
  const realBounds = bounds ?? cachedElev.bounds;

  // Elevation scale
  const cLat = (realBounds.minLat + realBounds.maxLat) / 2;
  const realW = (realBounds.maxLon - realBounds.minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const realH = (realBounds.maxLat - realBounds.minLat) * 111320;
  const avgLen = Math.max(realW, realH);
  const maxModelDim = Math.max(wMm, dMm);
  const elevScaleMm = Math.max(1, Math.min(maxModelDim * 0.5, (elevRange / avgLen) * maxModelDim * exag));
  const totalH = baseH + elevScaleMm;

  const modelPts = zonePtsToModel(zonePts, zoneType, realBounds, wMm, dMm);
  const facadeW = Math.max(1, facadeWidthMm);

  // ── Terrain mesh ──────────────────────────────────────
  {
    const geo = new THREE.PlaneGeometry(wMm, dMm, PREVIEW_GRID - 1, PREVIEW_GRID - 1);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, baseH + ((grid[i] - minE) / elevRange) * elevScaleMm);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();

    const mat = new THREE.MeshLambertMaterial({
      map: cachedTexture,
      alphaMap: cachedMask ?? undefined,
      transparent: !!cachedMask,
      side: THREE.FrontSide,
    });
    add(new THREE.Mesh(geo, mat));
  }

  // ── Base (zone-shaped) ───────────────────────────────
  const baseColor = 0xc8c2ba;
  {
    const baseGeo = buildBaseGeo(modelPts, zoneType, wMm, dMm, baseH);
    add(new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: baseColor })));
  }

  // ── Facades ───────────────────────────────────────────
  {
    const facadeMat = new THREE.MeshLambertMaterial({ color: baseColor, side: THREE.DoubleSide });
    const facadeMeshes = buildFacades(
      modelPts, zoneType, wMm, dMm, facadeW,
      grid, PREVIEW_GRID, minE, elevRange, baseH, elevScaleMm,
    );
    for (const m of facadeMeshes) { m.material = facadeMat; add(m); }
  }

  // ── GPX trace ─────────────────────────────────────────
  if (gpxPoints.length >= 2) {
    const ln = buildGpxLine(gpxPoints, realBounds, wMm, dMm, grid, PREVIEW_GRID, minE, elevRange, baseH, elevScaleMm);
    if (ln) add(ln);
  }

  // ── Bounding box ─────────────────────────────────────
  {
    const bbGeo = new THREE.EdgesGeometry(new THREE.BoxGeometry(
      wMm + facadeW * 2, totalH, dMm + facadeW * 2,
    ));
    const bb = new THREE.LineSegments(bbGeo, new THREE.LineBasicMaterial({ color: 0xff1a1a }));
    bb.position.y = totalH / 2;
    add(bb);
  }

  // ── Label anchors ─────────────────────────────────────
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

  // ── Camera (first build only) ─────────────────────────
  const diag = Math.sqrt(wMm * wMm + dMm * dMm);
  if (controls.target.lengthSq() < 0.1) {
    camera!.position.set(wMm * 0.7, totalH + diag * 0.44, dMm * 0.92);
    const tgt = new THREE.Vector3(0, totalH * 0.2, 0);
    camera!.lookAt(tgt);
    controls!.target.copy(tgt);
    controls!.update();
  }
}

export function resetDimsCamera(): void {
  if (controls) controls.target.set(0, 0, 0);
  if (cachedTexture) { cachedTexture.dispose(); cachedTexture = null; }
  if (cachedMask) { cachedMask.dispose(); cachedMask = null; }
  cachedZoneKey = '';
}

/* ══════════════════════════════════════════════
   MAP TEXTURE: elevation hypsometric + OpenTopoMap multiply blend
══════════════════════════════════════════════ */
async function buildMapTexture(
  bounds: LatLonBounds,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
): Promise<THREE.CanvasTexture> {
  const SIZE = 512;
  const cv = document.createElement('canvas');
  cv.width = cv.height = SIZE;
  const ctx = cv.getContext('2d')!;

  // Step 1 — hypsometric elevation base
  const id = ctx.createImageData(SIZE, SIZE);
  const d = id.data;
  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      const gx = col / (SIZE - 1) * (G - 1);
      const gy = row / (SIZE - 1) * (G - 1);
      const gi = Math.min(G - 2, Math.floor(gx));
      const gj = Math.min(G - 2, Math.floor(gy));
      const fx = gx - gi, fy = gy - gj;
      const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
              + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
      const t = Math.max(0, Math.min(1, (e - minE) / elevRange));
      const [r, g, b] = hypso(t);
      const pi = (row * SIZE + col) * 4;
      d[pi] = r; d[pi+1] = g; d[pi+2] = b; d[pi+3] = 255;
    }
  }
  ctx.putImageData(id, 0, 0);

  // Step 2 — OpenTopoMap tiles with multiply blend
  // Multiply: white (urban) × elevation → elevation (unchanged)
  //           blue (rivers) × elevation → blue accent
  //           green (forests) × elevation → green accent
  try {
    const nw = latLonToTile(bounds.maxLat, bounds.minLon, TILE_ZOOM);
    const se = latLonToTile(bounds.minLat, bounds.maxLon, TILE_ZOOM);
    const tw = se.x - nw.x + 1;
    const th = se.y - nw.y + 1;

    const tileCv = document.createElement('canvas');
    tileCv.width  = tw * TILE_SZ;
    tileCv.height = th * TILE_SZ;
    const tCtx = tileCv.getContext('2d')!;

    await Promise.all(
      Array.from({ length: tw * th }, (_, k) => {
        const i = k % tw, j = Math.floor(k / tw);
        return new Promise<void>(res => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload  = () => { tCtx.drawImage(img, i * TILE_SZ, j * TILE_SZ); res(); };
          img.onerror = () => res();
          img.src = `https://tile.opentopomap.org/${TILE_ZOOM}/${nw.x + i}/${nw.y + j}.png`;
        });
      }),
    );

    const nwLat = tile2lat(nw.y, TILE_ZOOM), nwLon = tile2lon(nw.x, TILE_ZOOM);
    const seLat = tile2lat(se.y + 1, TILE_ZOOM), seLon = tile2lon(se.x + 1, TILE_ZOOM);
    const tW = tileCv.width, tH = tileCv.height;

    const ox = (bounds.minLon - nwLon) / (seLon - nwLon) * tW;
    const oy = (nwLat - bounds.maxLat) / (nwLat - seLat) * tH;
    const sw = (bounds.maxLon - bounds.minLon) / (seLon - nwLon) * tW;
    const sh = (bounds.maxLat - bounds.minLat) / (nwLat - seLat) * tH;

    ctx.globalCompositeOperation = 'multiply';
    ctx.drawImage(tileCv, ox, oy, sw, sh, 0, 0, SIZE, SIZE);
    ctx.globalCompositeOperation = 'source-over';
  } catch {
    // Tile load failed — elevation-only texture already drawn
  }

  return new THREE.CanvasTexture(cv);
}

/* ══════════════════════════════════════════════
   ALPHA MASK — zone shape clipping
══════════════════════════════════════════════ */
function buildZoneMask(
  zonePts: [number, number][] | null,
  zoneType: string,
  bounds: LatLonBounds,
  wMm: number, dMm: number,
): THREE.CanvasTexture | null {
  if (!zonePts || zonePts.length < 3 || zoneType === 'rect' || zoneType === 'sq') return null;

  const SIZE = 512;
  const cv = document.createElement('canvas');
  cv.width = cv.height = SIZE;
  const ctx = cv.getContext('2d')!;
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, SIZE, SIZE);
  ctx.fillStyle = 'white';
  ctx.beginPath();

  for (let i = 0; i < zonePts.length; i++) {
    const [lat, lon] = zonePts[i];
    const cx = (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * SIZE;
    // Canvas top = North (maxLat), so invert lat axis
    const cy = (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * SIZE;
    if (i === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
  }
  ctx.closePath();
  ctx.fill();

  return new THREE.CanvasTexture(cv);
}

/* ══════════════════════════════════════════════
   ZONE POINTS → MODEL SPACE [x, z]
   North = -z, South = +z, West = -x, East = +x
══════════════════════════════════════════════ */
function zonePtsToModel(
  zonePts: [number, number][] | null,
  zoneType: string,
  bounds: LatLonBounds,
  wMm: number, dMm: number,
): Array<[number, number]> {
  if (!zonePts || zonePts.length < 3 || zoneType === 'rect' || zoneType === 'sq') {
    return [[-wMm/2, -dMm/2], [wMm/2, -dMm/2], [wMm/2, dMm/2], [-wMm/2, dMm/2]];
  }
  return zonePts.map(([lat, lon]): [number, number] => [
    (lon - bounds.minLon) / (bounds.maxLon - bounds.minLon) * wMm - wMm / 2,
    (1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * dMm - dMm / 2,
  ]);
}

/* ══════════════════════════════════════════════
   BASE GEOMETRY (zone shape, height = baseH)
══════════════════════════════════════════════ */
function buildBaseGeo(
  modelPts: Array<[number, number]>, zoneType: string,
  wMm: number, dMm: number, baseH: number,
): THREE.BufferGeometry {
  const shape = new THREE.Shape();

  if (zoneType === 'circ') {
    const rx = wMm / 2, rz = dMm / 2;
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

  // ExtrudeGeometry extrudes in +Z; rotateX(-PI/2) turns Z→Y, so extrusion becomes vertical
  const geo = new THREE.ExtrudeGeometry(shape, { depth: baseH, bevelEnabled: false });
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/* ══════════════════════════════════════════════
   FACADES — profile-following walls
══════════════════════════════════════════════ */
function buildFacades(
  modelPts: Array<[number, number]>,
  zoneType: string,
  wMm: number, dMm: number,
  facadeW: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  baseH: number, elevScaleMm: number,
): THREE.Mesh[] {
  const elevAt = (x: number, z: number): number => {
    const u = Math.max(0, Math.min(1, (x + wMm / 2) / wMm));
    const v = Math.max(0, Math.min(1, (z + dMm / 2) / dMm));
    const gx = u * (G - 1), gy = v * (G - 1);
    const gi = Math.min(G-2, Math.floor(gx)), gj = Math.min(G-2, Math.floor(gy));
    const fx = gx - gi, fy = gy - gj;
    const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
            + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
    return baseH + ((e - minE) / elevRange) * elevScaleMm;
  };

  if (zoneType === 'rect' || zoneType === 'sq') {
    return buildRectFacades(wMm, dMm, facadeW, G, grid, minE, elevRange, baseH, elevScaleMm);
  }
  return buildPolygonFacades(modelPts, facadeW, elevAt);
}

function buildRectFacades(
  wMm: number, dMm: number, facadeW: number,
  G: number, grid: Float32Array, minE: number, elevRange: number,
  baseH: number, elevScaleMm: number,
): THREE.Mesh[] {
  const h = (ix: number, iy: number) =>
    baseH + ((grid[iy * G + ix] - minE) / elevRange) * elevScaleMm;

  return [
    // South (front, z = +dMm/2), sampling bottom row (iy = G-1), left to right
    buildEdgeFacade(
      Array.from({ length: G }, (_, i) => [-wMm/2 + i/(G-1)*wMm, dMm/2,  h(i, G-1)]),
      [0, 0, 1], facadeW,
    ),
    // North (back, z = -dMm/2), right to left
    buildEdgeFacade(
      Array.from({ length: G }, (_, i) => [wMm/2 - i/(G-1)*wMm, -dMm/2, h(G-1-i, 0)]),
      [0, 0, -1], facadeW,
    ),
    // East (right, x = +wMm/2), back to front
    buildEdgeFacade(
      Array.from({ length: G }, (_, j) => [wMm/2,  dMm/2 - j/(G-1)*dMm, h(G-1, G-1-j)]),
      [1, 0, 0], facadeW,
    ),
    // West (left, x = -wMm/2), front to back
    buildEdgeFacade(
      Array.from({ length: G }, (_, j) => [-wMm/2, -dMm/2 + j/(G-1)*dMm, h(0, j)]),
      [-1, 0, 0], facadeW,
    ),
  ];
}

/**
 * Build one facade wall from a profile of top points [x, z, topY],
 * extruded outward by facadeW.
 */
function buildEdgeFacade(
  profile: [number, number, number][],
  outward: [number, number, number],
  facadeW: number,
): THREE.Mesh {
  const n = profile.length;
  const [nx, , nz] = outward;
  const verts: number[] = [];
  const idx: number[] = [];

  // 0..2n-1: outer face vertices (bottom + top)
  for (const [x, z, topY] of profile) {
    verts.push(x + nx*facadeW, 0,    z + nz*facadeW);
    verts.push(x + nx*facadeW, topY, z + nz*facadeW);
  }
  // 2n..4n-1: inner face vertices
  for (const [x, z, topY] of profile) {
    verts.push(x, 0,    z);
    verts.push(x, topY, z);
  }
  // 4n..6n-1: top cap
  for (const [x, z, topY] of profile) {
    verts.push(x + nx*facadeW, topY, z + nz*facadeW);
    verts.push(x,              topY, z);
  }
  // 6n..8n-1: bottom cap
  for (const [x, z] of profile) {
    verts.push(x + nx*facadeW, 0, z + nz*facadeW);
    verts.push(x,              0, z);
  }

  const O = 0, I = n*2, T = n*4, B = n*6;
  for (let i = 0; i < n - 1; i++) {
    const k = i * 2;
    idx.push(O+k, O+k+2, O+k+1,  O+k+1, O+k+2, O+k+3);   // outer
    idx.push(I+k, I+k+1, I+k+2,  I+k+1, I+k+3, I+k+2);   // inner
    idx.push(T+k, T+k+1, T+k+2,  T+k+1, T+k+3, T+k+2);   // top
    idx.push(B+k, B+k+2, B+k+1,  B+k+1, B+k+2, B+k+3);   // bottom
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  return new THREE.Mesh(geo);
}

function buildPolygonFacades(
  modelPts: Array<[number, number]>,
  facadeW: number,
  elevAt: (x: number, z: number) => number,
): THREE.Mesh[] {
  const meshes: THREE.Mesh[] = [];
  const n = modelPts.length;

  for (let i = 0; i < n; i++) {
    const [ax, az] = modelPts[i];
    const [bx, bz] = modelPts[(i + 1) % n];
    const dx = bx - ax, dz = bz - az;
    const len = Math.sqrt(dx*dx + dz*dz);
    if (len < 0.5) continue;

    // Outward normal (right of A→B direction)
    const nx = dz / len, nz = -dx / len;

    const SAMPLES = Math.max(2, Math.round(len / 3));
    const profile: [number, number, number][] = [];
    for (let k = 0; k <= SAMPLES; k++) {
      const t = k / SAMPLES;
      const px = ax + dx*t, pz = az + dz*t;
      profile.push([px, pz, elevAt(px, pz)]);
    }
    meshes.push(buildEdgeFacade(profile, [nx, 0, nz], facadeW));
  }
  return meshes;
}

/* ══════════════════════════════════════════════
   GPX TRACE
══════════════════════════════════════════════ */
function buildGpxLine(
  pts: LatLon[], bounds: LatLonBounds,
  wMm: number, dMm: number,
  grid: Float32Array, G: number,
  minE: number, elevRange: number,
  baseH: number, elevScaleMm: number,
): THREE.Line | null {
  const verts: THREE.Vector3[] = [];
  for (const pt of pts) {
    const u = (pt.lon - bounds.minLon) / (bounds.maxLon - bounds.minLon);
    const v = (pt.lat - bounds.minLat) / (bounds.maxLat - bounds.minLat);
    if (u < 0 || u > 1 || v < 0 || v > 1) continue;
    const x = (u - 0.5) * wMm;
    const z = (0.5 - v) * dMm;
    const gx = u*(G-1), gv = (1-v)*(G-1);
    const gi = Math.min(G-2, Math.floor(gx)), gj = Math.min(G-2, Math.floor(gv));
    const fx = gx-gi, fy = gv-gj;
    const e = grid[gj*G+gi]*(1-fx)*(1-fy) + grid[gj*G+gi+1]*fx*(1-fy)
            + grid[(gj+1)*G+gi]*(1-fx)*fy   + grid[(gj+1)*G+gi+1]*fx*fy;
    verts.push(new THREE.Vector3(x, baseH + ((e-minE)/elevRange)*elevScaleMm + 1, z));
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
function hypso(t: number): RGB {
  const stops: [number, RGB][] = [
    [0.00, [0x30, 0x88, 0xcc]],
    [0.06, [0x44, 0x9a, 0xb8]],
    [0.11, [0x50, 0x88, 0x40]],
    [0.28, [0x60, 0x98, 0x44]],
    [0.45, [0x78, 0x9e, 0x48]],
    [0.58, [0x96, 0x8e, 0x52]],
    [0.70, [0xa2, 0x80, 0x54]],
    [0.82, [0xa4, 0x94, 0x80]],
    [1.00, [0xf0, 0xee, 0xea]],
  ];
  for (let i = 1; i < stops.length; i++) {
    if (t <= stops[i][0]) {
      const f = (t - stops[i-1][0]) / (stops[i][0] - stops[i-1][0]);
      return lerp3(stops[i-1][1], stops[i][1], f);
    }
  }
  return stops[stops.length-1][1];
}

/* ══════════════════════════════════════════════
   TILE MATH
══════════════════════════════════════════════ */
function latLonToTile(lat: number, lon: number, z: number) {
  const n = 2 ** z;
  const latR = lat * Math.PI / 180;
  return {
    x: Math.floor((lon + 180) / 360 * n),
    y: Math.floor((1 - Math.log(Math.tan(latR) + 1 / Math.cos(latR)) / Math.PI) / 2 * n),
  };
}
function tile2lat(y: number, z: number): number {
  const n = Math.PI - 2 * Math.PI * y / (2 ** z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
}
function tile2lon(x: number, z: number): number {
  return x / (2 ** z) * 360 - 180;
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
  sceneObjs = [];
  lblAnchors.length = 0;
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
    el.style.left = ((p.x + 1) / 2 * W) + 'px';
    el.style.top  = (-(p.y - 1) / 2 * H) + 'px';
  }
}
