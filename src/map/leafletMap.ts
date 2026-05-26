/* ════════════════════════════════════════════
   LEAFLET MAP — 2D map setup, drawing tools, GPX, geocoding
   ════════════════════════════════════════════ */

import L from 'leaflet';
import 'leaflet-draw';
import { state } from '../state';
import type { LatLon } from '../types';

let map: L.Map;
let drawLayer: L.FeatureGroup;
let gpxLayer: L.FeatureGroup;
let activeDrawer: L.Draw.Feature | null = null;
let traceMode = false;
let tracePoints: LatLon[] = [];

export function initMap(): L.Map {
  map = L.map('map', {
    center: [45.5, 6.5],
    zoom: 12,
    zoomControl: false,
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map);

  L.control.zoom({ position: 'bottomright' }).addTo(map);

  drawLayer = new L.FeatureGroup().addTo(map);
  gpxLayer  = new L.FeatureGroup().addTo(map);

  setupDrawButtons();
  setupGPX();
  setupSearch();
  setupClear();

  return map;
}

/* ── Drawing tools ── */
const STYLE: L.PathOptions = {
  color: '#00d8ff', weight: 2, fillColor: '#00d8ff', fillOpacity: 0.08,
};

function stopDraw() {
  if (activeDrawer) { (activeDrawer as any).disable?.(); activeDrawer = null; }
  traceMode = false;
  map.off('click', onTraceClick);
  document.querySelectorAll('.dbtn').forEach(b => b.classList.remove('act'));
  map.getContainer().classList.remove('dm');
}

function startDraw(drawer: L.Draw.Feature, btnId: string) {
  stopDraw();
  activeDrawer = drawer;
  (drawer as any).enable();
  document.getElementById(btnId)?.classList.add('act');
  map.getContainer().classList.add('dm');

  map.once('draw:created', (e: L.DrawEvents.Created) => {
    drawLayer.clearLayers();
    drawLayer.addLayer(e.layer);
    extractBounds(e.layer, e.layerType);
    stopDraw();
  });
}

function extractBounds(layer: L.Layer, type: string) {
  let bounds: L.LatLngBounds | null = null;

  if (layer instanceof L.Circle) {
    const c = (layer as L.Circle).getLatLng(), r = (layer as L.Circle).getRadius();
    bounds = L.latLngBounds(
      [c.lat - r / 111320, c.lng - r / (111320 * Math.cos(c.lat * Math.PI / 180))],
      [c.lat + r / 111320, c.lng + r / (111320 * Math.cos(c.lat * Math.PI / 180))],
    );
    state.zoneType = 'circ';
    state.zonePts = null;
  } else if (layer instanceof L.Polygon) {
    const latlngs = (layer as L.Polygon).getLatLngs()[0] as L.LatLng[];
    bounds = (layer as L.Polygon).getBounds();
    state.zonePts = latlngs.map(ll => [ll.lat, ll.lng] as [number, number]);
    state.zoneType = type === 'rectangle' ? 'rect' : 'poly';
  }

  if (!bounds) return;
  state.bounds = {
    minLat: bounds.getSouth(), maxLat: bounds.getNorth(),
    minLon: bounds.getWest(),  maxLon: bounds.getEast(),
  };
  updateDimensions();
}

function updateDimensions() {
  const st = state;
  if (!st.bounds) return;
  const { minLat, maxLat, minLon, maxLon } = st.bounds;
  const cLat = (minLat + maxLat) / 2;
  const realW = (maxLon - minLon) * Math.cos(cLat * Math.PI / 180) * 111320;
  const realH = (maxLat - minLat) * 111320;
  const maxDim = Number((document.getElementById('t-maxdim') as HTMLInputElement)?.value || 150);
  const sc = maxDim / Math.max(realH, realW);
  st.realW = realW; st.realH = realH;
  st.wMm = Math.round(realW * sc);
  st.dMm = Math.round(realH * sc);
}

function btn(id: string) { return document.getElementById(id) as HTMLButtonElement; }

function setupDrawButtons() {
  btn('db-rect').onclick = () => {
    startDraw(new (L.Draw as any).Rectangle(map, { shapeOptions: STYLE }), 'db-rect');
  };
  btn('db-sq').onclick = () => {
    startDraw(new (L.Draw as any).Rectangle(map, {
      shapeOptions: STYLE, showArea: false,
      metric: true, repeatMode: false,
    }), 'db-sq');
  };
  btn('db-circ').onclick = () => {
    state.zoneType = 'circ';
    startDraw(new (L.Draw as any).Circle(map, { shapeOptions: STYLE }), 'db-circ');
  };
  btn('db-hex').onclick = () => {
    // Hexagone : on utilise un rectangle et on change le type
    state.zoneType = 'hex';
    startDraw(new (L.Draw as any).Rectangle(map, { shapeOptions: STYLE }), 'db-hex');
    map.once('draw:created', () => { state.zoneType = 'hex'; });
  };
  btn('db-poly').onclick = () => {
    startDraw(new (L.Draw as any).Polygon(map, { shapeOptions: STYLE }), 'db-poly');
  };
}

/* ── GPX ── */
function setupGPX() {
  const fileInput = document.getElementById('gpx-file') as HTMLInputElement;
  fileInput.onchange = () => {
    const f = fileInput.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = e => {
      const xml = new DOMParser().parseFromString(e.target!.result as string, 'text/xml');
      const pts = Array.from(xml.querySelectorAll('trkpt')).map(n => ({
        lat: parseFloat(n.getAttribute('lat')!),
        lon: parseFloat(n.getAttribute('lon')!),
      })).filter(p => isFinite(p.lat) && isFinite(p.lon));
      if (!pts.length) return;
      state.gpxPoints = pts;
      renderGPXLayer();
      const ctr = document.getElementById('gpx-ctr')!;
      ctr.style.display = 'block';
      ctr.textContent = `${pts.length} points GPX`;
    };
    reader.readAsText(f);
  };

  btn('db-trace').onclick = () => {
    if (traceMode) { stopDraw(); return; }
    stopDraw();
    traceMode = true;
    tracePoints = [];
    document.getElementById('db-trace')?.classList.add('act');
    map.getContainer().classList.add('dm');
    map.on('click', onTraceClick);
  };

  btn('db-cgpx').onclick = () => {
    if (!state.gpxPoints.length) return;
    const lats = state.gpxPoints.map(p => p.lat);
    const lons = state.gpxPoints.map(p => p.lon);
    map.fitBounds([[Math.min(...lats), Math.min(...lons)], [Math.max(...lats), Math.max(...lons)]]);
  };
}

function onTraceClick(e: L.LeafletMouseEvent) {
  tracePoints.push({ lat: e.latlng.lat, lon: e.latlng.lng });
  state.gpxPoints = [...tracePoints];
  renderGPXLayer();
  const ctr = document.getElementById('gpx-ctr')!;
  ctr.style.display = 'block';
  ctr.textContent = `${tracePoints.length} points tracés`;
}

function renderGPXLayer() {
  gpxLayer.clearLayers();
  if (state.gpxPoints.length < 2) return;
  const latlngs = state.gpxPoints.map(p => [p.lat, p.lon] as [number, number]);
  L.polyline(latlngs, { color: '#ff4500', weight: 3, opacity: 0.8 }).addTo(gpxLayer);
  document.getElementById('db-cgpx')!.style.display = 'block';
}

/* ── Clear ── */
function setupClear() {
  btn('db-clear').onclick = () => {
    drawLayer.clearLayers();
    gpxLayer.clearLayers();
    state.bounds = null;
    state.zonePts = null;
    state.gpxPoints = [];
    state.generated = false;
    stopDraw();
    const ctr = document.getElementById('gpx-ctr')!;
    ctr.style.display = 'none';
    document.getElementById('db-cgpx')!.style.display = 'none';
  };
}

/* ── Nominatim geocoding ── */
let _searchTimeout: ReturnType<typeof setTimeout>;
function setupSearch() {
  const inp = document.getElementById('srch-input') as HTMLInputElement;
  const drop = document.getElementById('srch-drop') as HTMLDivElement;

  inp.oninput = () => {
    clearTimeout(_searchTimeout);
    const q = inp.value.trim();
    if (q.length < 3) { drop.style.display = 'none'; return; }
    _searchTimeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5`,
          { headers: { 'Accept-Language': 'fr' } },
        );
        const data = await res.json() as Array<{ display_name: string; lat: string; lon: string }>;
        drop.innerHTML = data.map((r, i) =>
          `<div class="srch-item" data-i="${i}">
            <div class="srch-name">${r.display_name.split(',')[0]}</div>
            <div class="srch-addr">${r.display_name.split(',').slice(1, 3).join(',')}</div>
          </div>`,
        ).join('');
        drop.style.display = data.length ? 'block' : 'none';
        drop.querySelectorAll('.srch-item').forEach((el, i) => {
          (el as HTMLElement).onclick = () => {
            const r = data[i];
            map.setView([parseFloat(r.lat), parseFloat(r.lon)], 13);
            drop.style.display = 'none';
            inp.value = r.display_name.split(',')[0];
          };
        });
      } catch { drop.style.display = 'none'; }
    }, 400);
  };

  inp.onblur = () => setTimeout(() => { drop.style.display = 'none'; }, 200);
}
