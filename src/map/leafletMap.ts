/* ════════════════════════════════════════════
   LEAFLET MAP — carte 2D, outils de dessin custom, GPX, géocodage
   Système de dessin sans plugin Leaflet.draw (handlers natifs).
   ════════════════════════════════════════════ */

import L from 'leaflet';
import { state } from '../state';

/* ── Objets carte ── */
let map: L.Map;
let zoneLayer: L.Polygon | null = null;
let gpxLayer: L.Polyline | null = null;
let searchMarker: L.CircleMarker | null = null;

/* ── État de dessin ── */
let drawMode: string | null = null;
let drawPt1: L.LatLng | null = null;
let polyPts: L.LatLng[] = [];
let tracePts: L.LatLng[] = [];
let prevPoly: L.Polygon | L.Polyline | null = null;
let firstPolyMarker: L.CircleMarker | null = null;
let _clickTimer: ReturnType<typeof setTimeout> | null = null;

const HINTS: Record<string, string> = {
  rect:  'Cliquez 1er coin puis coin opposé',
  sq:    'Cliquez 1er coin (carré automatique)',
  circ:  'Cliquez centre puis glissez pour le rayon',
  hex:   'Cliquez centre puis glissez pour le rayon',
  poly:  'Cliquez pour ajouter des points — rejoignez le 1er point pour fermer',
  trace: 'Cliquez pour ajouter des points — double-clic pour terminer',
};

/* ════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════ */
export function initMap(): void {
  const osmL = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '© OSM',
  });
  const satL = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    { maxZoom: 19, attribution: '© Esri' },
  );
  const ignL = L.tileLayer(
    'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
    '&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png' +
    '&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}',
    { maxZoom: 19, attribution: '© IGN' },
  );

  map = L.map('map', { center: [48.8584, 2.2945], zoom: 15, zoomControl: false, layers: [osmL] });
  L.control.zoom({ position: 'topright' }).addTo(map);
  L.control.layers({ 'OSM': osmL, 'Satellite': satL, 'IGN': ignL }, {}, { position: 'topright' }).addTo(map);

  new ResizeObserver(() => map.invalidateSize()).observe(document.getElementById('mp')!);
  setTimeout(() => map.invalidateSize(), 300);

  setupDrawButtons();
  setupGPX();
  setupSearch();
  setupMapEvents();
}

/* ════════════════════════════════════════════
   GEOMETRY HELPERS
   ════════════════════════════════════════════ */
function mkRect(a: L.LatLng, b: L.LatLng): [number, number][] {
  return [[a.lat, a.lng], [a.lat, b.lng], [b.lat, b.lng], [b.lat, a.lng]];
}

function mkSq(a: L.LatLng, b: L.LatLng): [number, number][] {
  const cLat = (a.lat + b.lat) / 2;
  const mLat = Math.abs(b.lat - a.lat) * 111320;
  const mLon = Math.abs(b.lng - a.lng) * 111320 * Math.cos(cLat * Math.PI / 180);
  const dm = Math.min(mLat, mLon);
  const nLat = dm / 111320;
  const nLon = dm / (111320 * Math.cos(cLat * Math.PI / 180));
  const minLat = Math.min(a.lat, b.lat), minLon = Math.min(a.lng, b.lng);
  return [
    [minLat, minLon], [minLat, minLon + nLon],
    [minLat + nLat, minLon + nLon], [minLat + nLat, minLon],
  ];
}

function mkCirc(c: L.LatLng, e: L.LatLng, n = 80): [number, number][] {
  const R = c.distanceTo(e);
  return Array.from({ length: n }, (_, i) => {
    const a = i / n * Math.PI * 2;
    return [
      c.lat + R * Math.cos(a) / 111320,
      c.lng + R * Math.sin(a) / (111320 * Math.cos(c.lat * Math.PI / 180)),
    ] as [number, number];
  });
}

function mkHex(c: L.LatLng, e: L.LatLng): [number, number][] {
  const R = c.distanceTo(e);
  return Array.from({ length: 6 }, (_, i) => {
    const a = i / 6 * Math.PI * 2 - Math.PI / 6;
    return [
      c.lat + R * Math.cos(a) / 111320,
      c.lng + R * Math.sin(a) / (111320 * Math.cos(c.lat * Math.PI / 180)),
    ] as [number, number];
  });
}

/* ════════════════════════════════════════════
   MODE DESSIN
   ════════════════════════════════════════════ */
function setMode(m: string | null): void {
  if (drawMode && drawMode !== m) {
    drawPt1 = null; polyPts = []; tracePts = [];
    if (prevPoly) { map.removeLayer(prevPoly); prevPoly = null; }
    if (firstPolyMarker) { map.removeLayer(firstPolyMarker); firstPolyMarker = null; }
  }
  drawMode = m;
  ['rect', 'sq', 'circ', 'hex', 'poly', 'trace'].forEach(k => {
    document.getElementById('db-' + k)?.classList.toggle('act', k === m);
  });
  map.getContainer().classList.toggle('dm', !!m);
  const dch = document.getElementById('dch')!;
  dch.style.display = m ? 'block' : 'none';
  if (m) dch.textContent = HINTS[m] ?? '';
  const gpxCtr = document.getElementById('gpx-ctr')!;
  gpxCtr.style.display = m === 'trace' ? 'block' : 'none';
  if (m !== 'trace') gpxCtr.textContent = '0 points tracés';
  if (!m) { const s = document.getElementById('snap'); if (s) s.style.display = 'none'; }
}

function resetDraw(rm = true): void {
  if (prevPoly) { map.removeLayer(prevPoly); prevPoly = null; }
  if (firstPolyMarker) { map.removeLayer(firstPolyMarker); firstPolyMarker = null; }
  drawPt1 = null; polyPts = []; tracePts = [];
  if (rm) setMode(null);
}

/* ── Snap ── */
function snapPx(ll: L.LatLng, target: L.LatLng | null): number {
  if (!target) return 9999;
  return map.latLngToContainerPoint(ll).distanceTo(map.latLngToContainerPoint(target));
}

function closestSnap(ll: L.LatLng): L.LatLng | null {
  const targets: L.LatLng[] = [];
  if (polyPts.length > 2) targets.push(polyPts[0]);
  if (tracePts.length > 2) targets.push(tracePts[0]);
  if (searchMarker) targets.push(searchMarker.getLatLng());
  let best: L.LatLng | null = null, bd = 9999;
  for (const t of targets) {
    const d = snapPx(ll, t);
    if (d < 18 && d < bd) { bd = d; best = t; }
  }
  return best;
}

function updateSnapDot(ll: L.LatLng, target: L.LatLng | null): void {
  const s = document.getElementById('snap');
  if (!s) return;
  if (!target || snapPx(ll, target) > 18) { s.style.display = 'none'; return; }
  const p = map.latLngToContainerPoint(target);
  s.style.display = 'block';
  s.style.left = p.x + 'px';
  s.style.top = p.y + 'px';
}

/* ════════════════════════════════════════════
   FINALISATION DE ZONE
   ════════════════════════════════════════════ */
function finalizeZone(pts: [number, number][], zType: typeof state.zoneType): void {
  if (zoneLayer) { map.removeLayer(zoneLayer); zoneLayer = null; }
  zoneLayer = L.polygon(pts as any, {
    color: '#f43f5e', weight: 2.5, fillColor: '#f43f5e', fillOpacity: 0.08, dashArray: '6,4',
  }).addTo(map);

  const lats = pts.map(p => p[0]), lons = pts.map(p => p[1]);
  state.bounds = {
    minLat: Math.min(...lats), maxLat: Math.max(...lats),
    minLon: Math.min(...lons), maxLon: Math.max(...lons),
  };
  state.zonePts = pts;
  state.zoneType = zType;

  const cLat = (state.bounds.minLat + state.bounds.maxLat) / 2;
  const realW = (state.bounds.maxLon - state.bounds.minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const realH = (state.bounds.maxLat - state.bounds.minLat) * 111320;
  const maxDim = Number((document.getElementById('t-maxdim') as HTMLInputElement)?.value || 150);
  const sc = maxDim / Math.max(realH, realW);
  state.realW = realW; state.realH = realH;
  state.wMm = Math.round(realW * sc);
  state.dMm = Math.round(realH * sc);

  const bw = document.getElementById('bot-wrap');
  if (bw) bw.style.display = 'flex';
  resetDraw();
}

/* ════════════════════════════════════════════
   TRACE GPX MANUELLE
   ════════════════════════════════════════════ */
function updateTraceLayer(): void {
  if (gpxLayer) { map.removeLayer(gpxLayer); gpxLayer = null; }
  if (tracePts.length < 2) return;
  gpxLayer = L.polyline(tracePts, { color: '#ff0000', weight: 4, opacity: 0.9 }).addTo(map);
}

function finalizeTrace(pts: L.LatLng[]): void {
  const s = document.getElementById('snap'); if (s) s.style.display = 'none';
  if (firstPolyMarker) { map.removeLayer(firstPolyMarker); firstPolyMarker = null; }
  if (pts.length < 2) { resetDraw(); return; }
  state.gpxPoints = pts.map(p => ({ lat: p.lat, lon: p.lng }));
  updateGPXLayer();
  showGPXBadge(`✏️ ${pts.length} pts · tracé manuel`);
  const cg = document.getElementById('db-cgpx'); if (cg) cg.style.display = 'flex';
  resetDraw();
}

/* ════════════════════════════════════════════
   GPX LAYER
   ════════════════════════════════════════════ */
function updateGPXLayer(): void {
  if (gpxLayer) { map.removeLayer(gpxLayer); gpxLayer = null; }
  if (state.gpxPoints.length < 2) return;
  gpxLayer = L.polyline(
    state.gpxPoints.map(p => [p.lat, p.lon] as [number, number]),
    { color: '#f43f5e', weight: 3.5, opacity: 0.92 },
  ).addTo(map);
}

function showGPXBadge(html: string): void {
  const b = document.getElementById('gpx-badge');
  if (!b) return;
  b.innerHTML = html;
  b.style.display = 'block';
}

/* ════════════════════════════════════════════
   ÉVÉNEMENTS CARTE
   ════════════════════════════════════════════ */
function setupMapEvents(): void {
  map.on('mousemove', e => {
    if (!drawMode) return;
    const ll = e.latlng, snap = closestSnap(ll);
    updateSnapDot(ll, snap ?? drawPt1);
    const ell = snap ?? ll;

    if ((drawMode === 'rect' || drawMode === 'sq') && drawPt1) {
      const pts = drawMode === 'sq' ? mkSq(drawPt1, ell) : mkRect(drawPt1, ell);
      if (!prevPoly) prevPoly = L.polygon(pts as any, { color: '#f43f5e', weight: 2, fillOpacity: 0.1 }).addTo(map);
      else (prevPoly as L.Polygon).setLatLngs(pts as any);
    } else if ((drawMode === 'circ' || drawMode === 'hex') && drawPt1) {
      const pts = drawMode === 'circ' ? mkCirc(drawPt1, ell) : mkHex(drawPt1, ell);
      if (!prevPoly) prevPoly = L.polygon(pts as any, { color: '#00d8ff', weight: 2, fillOpacity: 0.1 }).addTo(map);
      else (prevPoly as L.Polygon).setLatLngs(pts as any);
    } else if (drawMode === 'poly' && polyPts.length > 0) {
      const all = [...polyPts, ell];
      if (!prevPoly) prevPoly = L.polyline(all, { color: '#f43f5e', weight: 2, dashArray: '5,4' }).addTo(map);
      else (prevPoly as L.Polyline).setLatLngs(all);
    } else if (drawMode === 'trace' && tracePts.length > 0) {
      const all = [...tracePts, ell];
      if (!prevPoly) prevPoly = L.polyline(all, { color: '#ff0000', weight: 3, dashArray: '4,3' }).addTo(map);
      else (prevPoly as L.Polyline).setLatLngs(all);
    }
  });

  map.on('click', e => {
    if (!drawMode) return;
    const ll = e.latlng, snap = closestSnap(ll), ell = snap ?? ll;

    if (drawMode === 'rect') {
      if (!drawPt1) { drawPt1 = ell; return; }
      finalizeZone(mkRect(drawPt1, ell), 'rect');
    } else if (drawMode === 'sq') {
      if (!drawPt1) { drawPt1 = ell; return; }
      finalizeZone(mkSq(drawPt1, ell), 'rect');
    } else if (drawMode === 'circ') {
      if (!drawPt1) { drawPt1 = ell; return; }
      finalizeZone(mkCirc(drawPt1, ell), 'circ');
    } else if (drawMode === 'hex') {
      if (!drawPt1) { drawPt1 = ell; return; }
      finalizeZone(mkHex(drawPt1, ell), 'hex');
    } else if (drawMode === 'poly') {
      if (polyPts.length > 2 && snapPx(ll, polyPts[0]) < 18) {
        finalizeZone(polyPts.map(p => [p.lat, p.lng] as [number, number]), 'poly');
        return;
      }
      polyPts.push(ell);
      if (polyPts.length === 1) {
        if (firstPolyMarker) map.removeLayer(firstPolyMarker);
        firstPolyMarker = L.circleMarker(polyPts[0], {
          radius: 7, fillColor: '#f43f5e', fillOpacity: 0.95, color: '#fff', weight: 2,
        }).addTo(map);
      }
    } else if (drawMode === 'trace') {
      if (_clickTimer) clearTimeout(_clickTimer);
      _clickTimer = setTimeout(() => {
        if (tracePts.length > 2 && snapPx(ll, tracePts[0]) < 18) {
          finalizeTrace(tracePts);
          return;
        }
        tracePts.push(snap ?? ll);
        const n = tracePts.length;
        const ctr = document.getElementById('gpx-ctr');
        if (ctr) ctr.textContent = `${n} point${n > 1 ? 's' : ''} tracé${n > 1 ? 's' : ''}`;
        if (n === 1) {
          if (firstPolyMarker) map.removeLayer(firstPolyMarker);
          firstPolyMarker = L.circleMarker(tracePts[0], {
            radius: 7, fillColor: '#ff0000', fillOpacity: 0.95, color: '#fff', weight: 2,
          }).addTo(map);
        }
        updateTraceLayer();
      }, 220);
    }
  });

  map.on('dblclick', e => {
    if (drawMode === 'trace' && tracePts.length >= 2) {
      if (_clickTimer) clearTimeout(_clickTimer);
      finalizeTrace(tracePts);
      e.originalEvent.preventDefault();
    }
  });
}

/* ════════════════════════════════════════════
   BOUTONS DE DESSIN
   ════════════════════════════════════════════ */
function setupDrawButtons(): void {
  ['rect', 'sq', 'circ', 'hex', 'poly', 'trace'].forEach(k => {
    document.getElementById('db-' + k)?.addEventListener('click', () => {
      setMode(drawMode === k ? null : k);
    });
  });

  document.getElementById('db-clear')?.addEventListener('click', () => {
    resetDraw();
    if (zoneLayer) { map.removeLayer(zoneLayer); zoneLayer = null; }
    if (gpxLayer) { map.removeLayer(gpxLayer); gpxLayer = null; }
    if (searchMarker) { map.removeLayer(searchMarker); searchMarker = null; }
    state.bounds = null; state.zonePts = null; state.gpxPoints = []; tracePts = [];
    const badge = document.getElementById('gpx-badge'); if (badge) badge.style.display = 'none';
    const cgpx = document.getElementById('db-cgpx'); if (cgpx) cgpx.style.display = 'none';
    const bw = document.getElementById('bot-wrap'); if (bw) bw.style.display = 'none';
    const snap = document.getElementById('snap'); if (snap) snap.style.display = 'none';
    const lbl = document.getElementById('gpx-lbl');
    if (lbl) { lbl.textContent = '📂 Importer .gpx'; lbl.classList.remove('on'); }
    const fi = document.getElementById('gpx-file') as HTMLInputElement;
    if (fi) fi.value = '';
  });

  document.getElementById('btn-czone')?.addEventListener('click', () => {
    if (!state.bounds) return;
    const b = state.bounds;
    map.fitBounds([[b.minLat, b.minLon], [b.maxLat, b.maxLon]], { padding: [80, 200], maxZoom: 14 });
  });

  document.getElementById('db-cgpx')?.addEventListener('click', () => {
    if (!state.gpxPoints.length) return;
    const la = state.gpxPoints.map(p => p.lat), lo = state.gpxPoints.map(p => p.lon);
    map.fitBounds(
      [[Math.min(...la), Math.min(...lo)], [Math.max(...la), Math.max(...lo)]],
      { paddingTopLeft: [180, 80], paddingBottomRight: [80, 80], maxZoom: 12 },
    );
  });
}

/* ════════════════════════════════════════════
   IMPORT GPX
   ════════════════════════════════════════════ */
function setupGPX(): void {
  document.getElementById('gpx-file')?.addEventListener('change', function (this: HTMLInputElement) {
    const f = this.files?.[0];
    if (!f) return;
    const rd = new FileReader();
    rd.onload = ev => {
      try {
        const xml = new DOMParser().parseFromString(ev.target!.result as string, 'text/xml');
        const nodes = [
          ...Array.from(xml.getElementsByTagName('trkpt')),
          ...Array.from(xml.getElementsByTagName('wpt')),
          ...Array.from(xml.getElementsByTagName('rtept')),
        ];
        if (!nodes.length) return;
        const pts = nodes
          .map(n => ({ lat: parseFloat(n.getAttribute('lat')!), lon: parseFloat(n.getAttribute('lon')!) }))
          .filter(p => !isNaN(p.lat) && !isNaN(p.lon));
        if (!pts.length) return;

        state.gpxPoints = pts;
        updateGPXLayer();
        if (!state.bounds && gpxLayer) {
          map.fitBounds(gpxLayer.getBounds(), { padding: [60, 60], maxZoom: 12 });
        }

        // Distance haversine
        let d = 0;
        for (let i = 1; i < pts.length; i++) {
          const R = 6371;
          const dLa = (pts[i].lat - pts[i - 1].lat) * Math.PI / 180;
          const dLo = (pts[i].lon - pts[i - 1].lon) * Math.PI / 180;
          const a = Math.sin(dLa / 2) ** 2 +
            Math.cos(pts[i - 1].lat * Math.PI / 180) * Math.cos(pts[i].lat * Math.PI / 180) *
            Math.sin(dLo / 2) ** 2;
          d += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        }

        showGPXBadge(`📍 ${pts.length.toLocaleString()} pts · ${d.toFixed(1)} km`);
        const lbl = document.getElementById('gpx-lbl');
        if (lbl) { lbl.textContent = '✓ ' + f.name.replace('.gpx', '').substring(0, 16); lbl.classList.add('on'); }
        const cgpx = document.getElementById('db-cgpx'); if (cgpx) cgpx.style.display = 'flex';
      } catch { /* ignore */ }
    };
    rd.readAsText(f);
  });
}

/* ════════════════════════════════════════════
   RECHERCHE NOMINATIM
   ════════════════════════════════════════════ */
let _srchDeb: ReturnType<typeof setTimeout>;

function setupSearch(): void {
  const inp = document.getElementById('srch-input') as HTMLInputElement;
  const drop = document.getElementById('srch-drop')!;
  inp?.addEventListener('input', function () {
    clearTimeout(_srchDeb);
    const q = this.value.trim();
    drop.style.display = 'none';
    if (q.length < 2) return;
    _srchDeb = setTimeout(() => doSearch(q), 120);
  });
  inp?.addEventListener('blur', () => setTimeout(() => { drop.style.display = 'none'; }, 200));
}

async function doSearch(q: string): Promise<void> {
  const drop = document.getElementById('srch-drop')!;
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=6&addressdetails=1`,
    );
    const d = await r.json() as Array<{
      display_name: string; lat: string; lon: string; boundingbox: string[];
    }>;
    if (!d.length) { drop.style.display = 'none'; return; }
    drop.innerHTML = d.map((x, i) => `
      <div class="srch-item" data-i="${i}" data-lat="${x.lat}" data-lon="${x.lon}" data-bb="${x.boundingbox.join(',')}">
        <div class="srch-name">${x.display_name.split(',')[0]}</div>
        <div class="srch-addr">${x.display_name.split(',').slice(1, 3).join(',')}</div>
      </div>`).join('');
    drop.style.display = 'block';
    drop.querySelectorAll('.srch-item').forEach(el => {
      (el as HTMLElement).addEventListener('mousedown', function (e) {
        e.preventDefault();
        const lat = parseFloat((this as HTMLElement).dataset.lat!);
        const lon = parseFloat((this as HTMLElement).dataset.lon!);
        const bb = (this as HTMLElement).dataset.bb!.split(',').map(Number);
        if (searchMarker) { map.removeLayer(searchMarker); searchMarker = null; }
        searchMarker = L.circleMarker([lat, lon], {
          radius: 8, fillColor: '#f43f5e', fillOpacity: 0.9, color: '#fff', weight: 2,
        }).addTo(map);
        map.fitBounds([[bb[0], bb[2]], [bb[1], bb[3]]], { padding: [60, 60], maxZoom: 16 });
        drop.style.display = 'none';
        (document.getElementById('srch-input') as HTMLInputElement).value =
          el.querySelector('.srch-name')!.textContent!;
      });
    });
  } catch { drop.style.display = 'none'; }
}
