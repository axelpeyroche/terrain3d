/* ════════════════════════════════════════════
   OVERTURE PMTiles — Feature fetching
   Runs on the main thread (PMTiles is async/range-request based)
   ════════════════════════════════════════════ */

import { PMTiles, Protocol } from 'pmtiles';
import type { OvertureFeature, LatLonBounds, LatLon } from '../types';
import { OVERTURE_BASE } from '../constants';

// Registre des fichiers PMTiles ouverts (cache)
const pmCache = new Map<string, PMTiles>();

function getPM(path: string): PMTiles {
  if (!pmCache.has(path)) pmCache.set(path, new PMTiles(path));
  return pmCache.get(path)!;
}

/** Parse MVT binary → OvertureFeature[] (implémentation manuelle du protobuf MVT) */
function parseMVT(buf: ArrayBuffer, layerFilter?: string): OvertureFeature[] {
  // Protobuf parser minimal pour MVT
  const features: OvertureFeature[] = [];
  let pos = 0;
  const bytes = new Uint8Array(buf);

  function readVarint(): number {
    let v = 0, shift = 0;
    while (pos < bytes.length) {
      const b = bytes[pos++];
      v |= (b & 0x7f) << shift;
      if (!(b & 0x80)) break;
      shift += 7;
    }
    return v;
  }

  function readTag() {
    if (pos >= bytes.length) return null;
    const tag = readVarint();
    return { field: tag >> 3, wire: tag & 0x7 };
  }

  function skipField(wire: number) {
    if (wire === 0) readVarint();
    else if (wire === 2) {
      const len = readVarint(); pos += len;
    } else if (wire === 5) pos += 4;
    else if (wire === 1) pos += 8;
  }

  function readString(): string {
    const len = readVarint();
    const bytes2 = new Uint8Array(buf, pos, len);
    pos += len;
    return new TextDecoder().decode(bytes2);
  }

  // Parser simplifié — lit la structure top-level (layers) du MVT
  while (pos < bytes.length) {
    const t = readTag();
    if (!t) break;
    if (t.field === 3 && t.wire === 2) {
      // Layer
      const layerLen = readVarint();
      const layerEnd = pos + layerLen;
      let layerName = '';
      const keys: string[] = [];
      const values: Array<string | number | boolean | null> = [];
      const rawFeats: Array<{ type: number; tags: number[]; geom: number[] }> = [];
      let extent = 4096;

      while (pos < layerEnd) {
        const t2 = readTag();
        if (!t2) break;
        if (t2.field === 1 && t2.wire === 2) layerName = readString();
        else if (t2.field === 3 && t2.wire === 2) keys.push(readString());
        else if (t2.field === 4 && t2.wire === 2) {
          const vlen = readVarint(), vend = pos + vlen;
          while (pos < vend) {
            const vt = readTag();
            if (!vt) break;
            if (vt.wire === 2) {
              const slen = readVarint(); const sv = new Uint8Array(buf, pos, slen); pos += slen;
              values.push(new TextDecoder().decode(sv));
            } else if (vt.field === 5 && vt.wire === 0) values.push(readVarint() !== 0);
            else if (vt.field === 6 && vt.wire === 0) values.push(readVarint());
            else if (vt.field === 7 && vt.wire === 0) values.push(readVarint());
            else skipField(vt.wire);
          }
        } else if (t2.field === 5 && t2.wire === 0) extent = readVarint();
        else if (t2.field === 2 && t2.wire === 2) {
          const flen = readVarint(), fend = pos + flen;
          let fType = 0;
          const fTags: number[] = [];
          const fGeom: number[] = [];
          while (pos < fend) {
            const ft = readTag();
            if (!ft) break;
            if (ft.field === 3 && ft.wire === 0) fType = readVarint();
            else if (ft.field === 2 && ft.wire === 2) {
              const tlen = readVarint(), tend = pos + tlen;
              while (pos < tend) fTags.push(readVarint());
            } else if (ft.field === 4 && ft.wire === 2) {
              const glen = readVarint(), gend = pos + glen;
              while (pos < gend) fGeom.push(readVarint());
            } else skipField(ft.wire);
          }
          rawFeats.push({ type: fType, tags: fTags, geom: fGeom });
        } else skipField(t2.wire);
      }
      pos = layerEnd;

      if (layerFilter && layerFilter !== layerName) continue;

      // Décoder les features
      for (const rf of rawFeats) {
        const props: Record<string, string | number | boolean | null> = {};
        for (let i = 0; i < rf.tags.length - 1; i += 2) {
          props[keys[rf.tags[i]]] = values[rf.tags[i + 1]] ?? null;
        }
        // Décoder la géométrie MVT
        const rings: LatLon[][] = [];
        let cx = 0, cy = 0;
        let ring: LatLon[] = [];
        let cmd = 0, repeat = 0;
        let gi = 0;
        while (gi < rf.geom.length) {
          if (repeat === 0) {
            const cmdInt = rf.geom[gi++];
            cmd = cmdInt & 0x7; repeat = cmdInt >> 3;
          }
          if (cmd === 1 || cmd === 2) {
            if (cmd === 1 && ring.length >= 2) { rings.push(ring); ring = []; }
            const dx = zigzag(rf.geom[gi++]), dy = zigzag(rf.geom[gi++]);
            cx += dx; cy += dy;
            ring.push({ lat: cy, lon: cx }); // coords in tile space — converted later
            repeat--;
          } else if (cmd === 7) { // ClosePath
            if (ring.length >= 2) { rings.push(ring); ring = []; }
            repeat--;
          } else { gi++; repeat--; }
        }
        if (ring.length >= 2) rings.push(ring);
        features.push({ layer: layerName, type: rf.type, properties: props, rings });
      }
    } else skipField(t.wire);
  }
  return features;
}

function zigzag(n: number): number { return (n >> 1) ^ -(n & 1); }

/** Convertit les coordonnées tuile MVT → lat/lon */
function tileToLL(tx: number, ty: number, z: number, px: number, py: number, extent: number) {
  const n = 2 ** z;
  const lonFrac = (tx + px / extent) / n;
  const latFrac = (ty + py / extent) / n;
  const lon = lonFrac * 360 - 180;
  const lat = Math.atan(Math.sinh(Math.PI * (1 - 2 * latFrac))) * 180 / Math.PI;
  return { lat, lon };
}

/** Récupère les features Overture pour toutes les couches voulues */
export async function fetchOvertureFeatures(
  bounds: LatLonBounds,
  onProgress: (pct: number) => void,
): Promise<OvertureFeature[]> {
  const z14 = 14, z13 = 13;
  const layers: Array<{ path: string; z: number; name: string }> = [
    { path: `${OVERTURE_BASE}/buildings.pmtiles`,      z: z14, name: 'building'    },
    { path: `${OVERTURE_BASE}/transportation.pmtiles`, z: z14, name: 'segment'     },
    { path: `${OVERTURE_BASE}/base.pmtiles`,           z: z13, name: 'water'       },
    { path: `${OVERTURE_BASE}/base.pmtiles`,           z: z13, name: 'land'        },
    { path: `${OVERTURE_BASE}/land_cover.pmtiles`,     z: z13, name: 'land_cover'  },
    { path: `${OVERTURE_BASE}/land_use.pmtiles`,       z: z13, name: 'land_use'    },
  ];

  const allFeatures: OvertureFeature[] = [];
  let done = 0;

  for (const { path, z, name } of layers) {
    try {
      const pm = getPM(path);
      const ll2t = (lat: number, lon: number) => {
        const n = 2 ** z;
        const x = Math.floor((lon + 180) / 360 * n);
        const r = lat * Math.PI / 180;
        const y = Math.floor((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n);
        return { x, y };
      };
      const tMin = ll2t(bounds.maxLat, bounds.minLon);
      const tMax = ll2t(bounds.minLat, bounds.maxLon);
      const fetches: Promise<void>[] = [];

      for (let ty = tMin.y; ty <= tMax.y; ty++) {
        for (let tx = tMin.x; tx <= tMax.x; tx++) {
          fetches.push((async (tx2: number, ty2: number) => {
            try {
              const tile = await pm.getZxy(z, tx2, ty2);
              if (!tile) return;
              const parsed = parseMVT(tile.data, name);
              // Convertir coords tuile → lat/lon
              for (const feat of parsed) {
                for (const ring of feat.rings) {
                  for (const pt of ring) {
                    const ll = tileToLL(tx2, ty2, z, pt.lon, pt.lat, 4096);
                    pt.lat = ll.lat; pt.lon = ll.lon;
                  }
                }
                allFeatures.push(feat);
              }
            } catch { /* tile 404 normal */ }
          })(tx, ty));
        }
      }
      await Promise.all(fetches);
    } catch { /* layer unavailable */ }
    done++;
    onProgress(Math.round(done / layers.length * 100));
  }

  return allFeatures;
}
