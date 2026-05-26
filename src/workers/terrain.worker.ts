/* ════════════════════════════════════════════
   TERRAIN WORKER — Elevation tile fetching & grid building
   Runs in a Web Worker — no DOM, no Three.js
   Uses OffscreenCanvas for PNG pixel decoding (Terrarium encoding)
   ════════════════════════════════════════════ */

import type { TerrainWorkerInput, TerrainResult, LatLonBounds } from '../types';

/* ── Tile math ── */
function ll2tile(lat: number, lon: number, z: number) {
  const n = 2 ** z;
  const x = Math.floor((lon + 180) / 360 * n);
  const r = lat * Math.PI / 180;
  const y = Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n);
  return { x, y };
}

function tile2ll(tx: number, ty: number, z: number) {
  const n = 2 ** z;
  const lon = tx / n * 360 - 180;
  const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * ty / n))) * 180 / Math.PI;
  return { lat, lon };
}

/** Décoder une tuile PNG Terrarium → Float32Array(256*256) d'altitudes */
async function decodeTile(url: string): Promise<Float32Array | null> {
  try {
    const resp = await fetch(url);
    if (!resp.ok) return null;
    const blob = await resp.blob();
    const bmp = await createImageBitmap(blob);
    const W = bmp.width, H = bmp.height;
    const canvas = new OffscreenCanvas(W, H);
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(bmp, 0, 0);
    const { data } = ctx.getImageData(0, 0, W, H);
    const elev = new Float32Array(W * H);
    for (let i = 0; i < W * H; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      elev[i] = r * 256 + g + b / 256 - 32768; // Terrarium formula
    }
    return elev;
  } catch {
    return null;
  }
}

/** Bilinear interpolation dans une grille de tuiles 256×256 */
function sampleTileGrid(
  tileData: Map<string, Float32Array>,
  txMin: number, tyMin: number,
  txMax: number, tyMax: number,
  z: number,
  lat: number, lon: number,
): number {
  const n = 2 ** z;
  const fx = (lon + 180) / 360 * n - txMin;
  const r = lat * Math.PI / 180;
  const fy = (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n - tyMin;
  const px = fx * 256, py = fy * 256;

  const x0 = Math.max(0, Math.floor(px)), y0 = Math.max(0, Math.floor(py));
  const tc = Math.floor(x0 / 256) + txMin, tr = Math.floor(y0 / 256) + tyMin;
  const key = `${tc}_${tr}`;
  const tile = tileData.get(key);
  if (!tile) return 0;

  const lx = x0 % 256, ly = y0 % 256;
  const lx1 = Math.min(255, lx + 1), ly1 = Math.min(255, ly + 1);
  const q = px - x0, p = py - y0;
  const e00 = tile[ly * 256 + lx], e10 = tile[ly * 256 + lx1];
  const e01 = tile[ly1 * 256 + lx], e11 = tile[ly1 * 256 + lx1];
  return e00 * (1 - q) * (1 - p) + e10 * q * (1 - p) + e01 * (1 - q) * p + e11 * q * p;
}

async function buildTerrainGrid(
  bounds: LatLonBounds,
  GRID: number,
  z: number,
): Promise<TerrainResult> {
  const { minLat, maxLat, minLon, maxLon } = bounds;

  // Tiles nécessaires
  const tlMin = ll2tile(maxLat, minLon, z);
  const tlMax = ll2tile(minLat, maxLon, z);
  const txMin = tlMin.x, tyMin = tlMin.y;
  const txMax = tlMax.x, tyMax = tlMax.y;

  // Fetch toutes les tuiles en parallèle
  const fetches: Promise<void>[] = [];
  const tileData = new Map<string, Float32Array>();
  const BASE_URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium';

  for (let ty = tyMin; ty <= tyMax; ty++) {
    for (let tx = txMin; tx <= txMax; tx++) {
      fetches.push(
        decodeTile(`${BASE_URL}/${z}/${tx}/${ty}.png`).then(data => {
          if (data) tileData.set(`${tx}_${ty}`, data);
        }),
      );
    }
  }
  await Promise.all(fetches);

  // Échantillonner GRID×GRID points sur la bounding box
  const elevGrid = new Float32Array(GRID * GRID);
  let minE = Infinity, maxE = -Infinity;

  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const lat = maxLat - (row / (GRID - 1)) * (maxLat - minLat);
      const lon = minLon + (col / (GRID - 1)) * (maxLon - minLon);
      const e = sampleTileGrid(tileData, txMin, tyMin, txMax, tyMax, z, lat, lon);
      elevGrid[row * GRID + col] = e;
      if (e < minE) minE = e;
      if (e > maxE) maxE = e;
    }
  }

  if (!isFinite(minE)) { minE = 0; maxE = 100; }
  const elevRange = maxE - minE || 1;

  return { elevGrid, GRID, minE, maxE, elevRange };
}

/* ── Message handler ── */
self.onmessage = async (e: MessageEvent<TerrainWorkerInput>) => {
  const { type, bounds, GRID, elevZoom } = e.data;
  if (type !== 'BUILD_TERRAIN') return;

  self.postMessage({ type: 'PROGRESS', step: 'TILES', pct: 10 });

  try {
    const result = await buildTerrainGrid(bounds, GRID, elevZoom);
    self.postMessage({ type: 'PROGRESS', step: 'GRID', pct: 90 });

    // Transfer le buffer pour éviter la copie
    self.postMessage(
      { type: 'TERRAIN_READY', ...result },
      [result.elevGrid.buffer],
    );
  } catch (err) {
    self.postMessage({ type: 'ERROR', message: String(err) });
  }
};
