/* ════════════════════════════════════════════
   DIMS PREVIEW — 3D terrain preview for the Dimensions tab
   ════════════════════════════════════════════ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { LatLonBounds } from '../types';

let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let controls: OrbitControls | null = null;

// Cached elevation data (avoid refetch when only settings change)
let cachedKey = '';
let cachedElev: {
  grid: Float32Array; minE: number; elevRange: number; bounds: LatLonBounds;
} | null = null;
let cachedTexture: THREE.CanvasTexture | null = null;

const PREVIEW_GRID = 64;

// Scene objects to dispose on rebuild
let sceneObjs: THREE.Object3D[] = [];

// Label anchors updated on rebuild
const lblAnchors: { id: string; v: THREE.Vector3 }[] = [];

/* ── Init renderer (called once on first tab open) ────── */
export function initDimsRenderer(viewEl: HTMLElement): void {
  const canvas = viewEl.querySelector<HTMLCanvasElement>('#dims-canvas')!;

  if (renderer) {
    const W = viewEl.clientWidth || 800;
    const H = viewEl.clientHeight || 600;
    renderer.setSize(W, H, false);
    camera!.aspect = W / H;
    camera!.updateProjectionMatrix();
    return;
  }

  const W = viewEl.clientWidth || 800;
  const H = viewEl.clientHeight || 600;

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H, false);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06080e);

  camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100000);

  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;

  scene.add(new THREE.AmbientLight(0xffffff, 0.65));
  const sun = new THREE.DirectionalLight(0xffffff, 1.05);
  sun.position.set(1.5, 3, 2.5);
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

/* ── Build / rebuild the 3D scene ─────────────────────── */
export interface DimSettings {
  wMm: number; dMm: number; baseH: number; exag: number;
}

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

    onProgress(45, 'Chargement de la texture satellite…');
    try {
      cachedTexture = await loadSatTexture(bounds);
    } catch {
      cachedTexture = makeFallbackTexture();
    }
  } else {
    onProgress(50, 'Reconstruction…');
  }

  onProgress(80, 'Construction de la scène 3D…');
  rebuildScene(settings);
  onProgress(100, '');
}

/* ── Rebuild geometry & materials without refetching ──── */
export function rebuildScene(s: DimSettings): void {
  if (!scene || !camera || !controls || !cachedElev) return;
  clearScene();

  const { wMm, dMm, baseH, exag } = s;
  const { grid, minE, elevRange, bounds } = cachedElev;

  // Elevation → mm, same formula as main generator
  const cLat = (bounds.minLat + bounds.maxLat) / 2;
  const realW = (bounds.maxLon - bounds.minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const realH_m = (bounds.maxLat - bounds.minLat) * 111320;
  const avgLen = Math.max(realW, realH_m);
  const maxModelDim = Math.max(wMm, dMm);
  const rawMm = (elevRange / avgLen) * maxModelDim * exag;
  const elevScaleMm = Math.max(1, Math.min(maxModelDim * 0.5, rawMm));
  const totalH = baseH + elevScaleMm;

  // Terrain (PlaneGeometry in XZ plane after rotateX)
  const geo = new THREE.PlaneGeometry(wMm, dMm, PREVIEW_GRID - 1, PREVIEW_GRID - 1);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setY(i, baseH + ((grid[i] - minE) / elevRange) * elevScaleMm);
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();

  const terrainMat = cachedTexture
    ? new THREE.MeshLambertMaterial({ map: cachedTexture })
    : new THREE.MeshLambertMaterial({ color: 0x5a8060 });
  add(new THREE.Mesh(geo, terrainMat));

  // Grey base
  const baseGeo = new THREE.BoxGeometry(wMm, baseH, dMm);
  const baseMesh = new THREE.Mesh(baseGeo, new THREE.MeshLambertMaterial({ color: 0xb0a898 }));
  baseMesh.position.y = baseH / 2;
  add(baseMesh);

  // Red bounding box wireframe
  const bbGeo = new THREE.BoxGeometry(wMm, totalH, dMm);
  const bbLines = new THREE.LineSegments(
    new THREE.EdgesGeometry(bbGeo),
    new THREE.LineBasicMaterial({ color: 0xff1a1a }),
  );
  bbLines.position.y = totalH / 2;
  add(bbLines);

  // Label 3D anchors
  lblAnchors.length = 0;
  lblAnchors.push({ id: 'dl-width',  v: new THREE.Vector3(0,            0,                dMm / 2 + 10) });
  lblAnchors.push({ id: 'dl-depth',  v: new THREE.Vector3(wMm / 2 + 10, totalH * 0.12,   0) });
  lblAnchors.push({ id: 'dl-height', v: new THREE.Vector3(-wMm / 2 - 8, totalH / 2,      dMm / 2 + 8) });

  // Update text content
  const totalR = Math.round(totalH * 10) / 10;
  const elevR  = Math.round(elevScaleMm * 10) / 10;
  txt('dl-width',       `${wMm} mm`);
  txt('dl-depth',       `${dMm} mm`);
  txt('dl-height',      `~${totalR} mm`);
  txt('dp-total-val',   `~${totalR}`);
  txt('dp-map-h',       `~${elevR}`);
  txt('dp-base-h-disp', `${baseH}`);

  // Camera positioning
  const diag = Math.sqrt(wMm * wMm + dMm * dMm);
  camera!.position.set(wMm * 0.72, totalH + diag * 0.42, dMm * 0.88);
  const target = new THREE.Vector3(0, totalH * 0.22, 0);
  camera!.lookAt(target);
  controls!.target.copy(target);
  controls!.update();
}

function add(o: THREE.Object3D): void { scene!.add(o); sceneObjs.push(o); }
function txt(id: string, t: string): void {
  const el = document.getElementById(id); if (el) el.textContent = t;
}

function clearScene(): void {
  sceneObjs.forEach(o => {
    scene!.remove(o);
    if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose();
  });
  sceneObjs = [];
  lblAnchors.length = 0;
}

function tickLabels(): void {
  if (!camera || !renderer) return;
  const W = renderer.domElement.clientWidth;
  const H = renderer.domElement.clientHeight;
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

/* ── Elevation worker ─────────────────────────────────── */
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
      w.postMessage({ type: 'BUILD_TERRAIN', bounds, GRID: PREVIEW_GRID, elevZoom: 10 });
    },
  );
}

/* ── Satellite tiles ──────────────────────────────────── */
function latLonToTile(lat: number, lon: number, z: number) {
  const n = 2 ** z;
  const lr = lat * Math.PI / 180;
  return {
    x: Math.max(0, Math.min(n - 1, Math.floor((lon + 180) / 360 * n))),
    y: Math.max(0, Math.min(n - 1, Math.floor((1 - Math.log(Math.tan(lr) + 1 / Math.cos(lr)) / Math.PI) / 2 * n))),
  };
}

async function loadSatTexture(bounds: LatLonBounds): Promise<THREE.CanvasTexture> {
  const Z = 11, TS = 256;
  const nw = latLonToTile(bounds.maxLat, bounds.minLon, Z);
  const se = latLonToTile(bounds.minLat, bounds.maxLon, Z);
  const tw = se.x - nw.x + 1, th = se.y - nw.y + 1;

  const cv = document.createElement('canvas');
  cv.width = tw * TS; cv.height = th * TS;
  const ctx = cv.getContext('2d')!;

  await Promise.all(
    Array.from({ length: tw }, (_, i) =>
      Array.from({ length: th }, (_, j) =>
        fetchTile(ctx, nw.x + i, nw.y + j, Z, i * TS, j * TS),
      )
    ).flat(),
  );

  return new THREE.CanvasTexture(cv);
}

function fetchTile(ctx: CanvasRenderingContext2D, tx: number, ty: number, z: number, dx: number, dy: number): Promise<void> {
  return new Promise(res => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload  = () => { ctx.drawImage(img, dx, dy, 256, 256); res(); };
    img.onerror = () => res();
    img.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${ty}/${tx}`;
  });
}

function makeFallbackTexture(): THREE.CanvasTexture {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 256;
  const ctx = cv.getContext('2d')!;
  const g = ctx.createLinearGradient(0, 0, 0, 256);
  g.addColorStop(0.0, '#3a6b42');
  g.addColorStop(0.5, '#6a5038');
  g.addColorStop(1.0, '#a8a49a');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(cv);
}
