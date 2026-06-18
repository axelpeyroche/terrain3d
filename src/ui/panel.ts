/* ════════════════════════════════════════════
   UI PANEL — injection HTML + helpers progress/modal
   ════════════════════════════════════════════ */

export function injectUI(): void {
  document.getElementById('app')!.innerHTML = `

<!-- TOPBAR -->
<div id="tb">
  <div class="logo">TERRAIN<span>3D</span></div>
  <div class="mleft" style="display:flex;gap:8px;align-items:center">
    <button class="btn-stl" id="btn-stl" disabled title="Exporter STL (mono-couleur)">⬇ STL</button>
    <button class="btn-exp" id="btn-export" disabled>💾 Exporter .3MF (AMS)</button>
  </div>
</div>

<!-- WORKSPACE -->
<div id="ws">

<!-- MAP -->
<div id="mp">
  <div id="map"></div>
  <div id="snap"></div>
  <div id="dch"></div>
  <div id="gpx-badge"></div>

  <!-- Barre de recherche -->
  <div id="srch-wrap">
    <input type="text" id="srch-input" placeholder="🔍 Rechercher un lieu...">
    <div id="srch-drop"></div>
  </div>

  <!-- Panneau outils dessin -->
  <div id="dt">
    <h4>🗺 Zone &amp; Tracé</h4>
    <div class="dg">Zone d'impression</div>
    <button class="dbtn" id="db-rect"><span class="ico">▭</span>Rectangle</button>
    <button class="dbtn" id="db-sq"><span class="ico">■</span>Carré</button>
    <button class="dbtn" id="db-circ"><span class="ico">◯</span>Rond</button>
    <button class="dbtn" id="db-hex"><span class="ico">⬡</span>Hexagone</button>
    <button class="dbtn" id="db-poly"><span class="ico">⬟</span>Polygone</button>
    <hr class="ds">
    <div class="dg">Trace GPX</div>
    <label class="filebtn on" id="gpx-lbl" for="gpx-file">📂 Importer .gpx</label>
    <input type="file" id="gpx-file" accept=".gpx">
    <button class="dbtn" id="db-trace"><span class="ico">✏️</span>Tracer GPX</button>
    <div id="gpx-ctr" style="display:none">0 points tracés</div>
    <button class="dbtn" id="db-cgpx" style="display:none"><span class="ico">⊕</span>Centrer GPX</button>
    <hr class="ds">
    <button class="dbtn red" id="db-clear"><span class="ico">🗑</span>Tout effacer</button>
  </div>

  <!-- Bouton centrer zone -->
  <div id="bot-wrap" style="display:none">
    <button class="bbtn bbtn-cyan" id="btn-czone">📍 Centrer zone</button>
  </div>
</div>

<!-- 3D VIEWER -->
<div id="vp">
  <canvas id="c3d"></canvas>
  <div id="gen-wrap">
    <button class="btn-gen-f" id="btn-gen">▶ Générer le Terrain 3D</button>
  </div>
  <div id="empty3d">
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.3">
      <polygon points="32,5 58,52 6,52"/>
      <polygon points="32,5 44,30 20,30" fill="currentColor" opacity=".15"/>
    </svg>
    <p>APERÇU 3D<br>Dessinez une zone sur la carte<br>puis cliquez sur Générer</p>
  </div>
  <div id="prog">
    <div id="pc">
      <div id="ps">INIT</div>
      <div id="pl">Préparation...</div>
      <div id="pt"><div id="pb"></div></div>
      <div id="pp">0%</div>
    </div>
  </div>
  <div id="hint3d">🖱 Gauche=Rotation · Molette=Zoom · Droite=Déplacer</div>
  <div id="elev"></div>
</div>

<!-- SETTINGS -->
<div id="sp">
  <div id="sp-hd">⚙ Paramètres 3D</div>
  <div id="sp-bd">

    <div class="sec">
      <div class="sh" onclick="ts('topo')"><span class="si">🏔️</span><span class="sn">Terrain</span><span class="sc o" id="ca-topo">▼</span></div>
      <div class="sb" id="sb-topo">
        <div class="r"><label>Couleur</label><input type="color" id="c-base" value="#eeebe6"></div>
        <div class="r"><label>Résolution</label>
          <select id="t-res">
            <option value="56">Rapide (56²)</option>
            <option value="96">Normale (96²)</option>
            <option value="128" selected>Haute (128²)</option>
            <option value="256">Max (256²)</option>
          </select>
        </div>
        <div class="r"><label>Relief ×</label><input type="number" id="t-exag" value="2" step="0.5" min="0.5" max="10"></div>
        <div class="r"><label>Lissage</label><input type="range" id="t-smooth" min="0" max="10" step="1" value="1"><span class="rv" id="t-smooth-v">1</span></div>
        <div class="r"><label>Socle</label><input type="number" id="t-base-h" value="3" step="1" min="1"><span>mm</span></div>
        <div class="r"><label>Taille modèle</label><input type="number" id="t-maxdim" value="150" step="10" min="50" max="400"><span>mm</span></div>
        <input type="hidden" id="t-zoom" value="15">
      </div>
    </div>

    <div class="sec">
      <div class="sh" onclick="ts('water')">
        <span class="si">💧</span><span class="sn">Eau</span>
        <input type="checkbox" id="water-on" checked onclick="ev(event)">
        <span class="sc o" id="ca-water">▼</span>
      </div>
      <div class="sb h" id="sb-water">
        <div class="r"><label>Couleur</label><input type="color" id="water-col" value="#3399ff"></div>
      </div>
    </div>

    <div class="sec">
      <div class="sh" onclick="ts('grass')">
        <span class="si">🌿</span><span class="sn">Parcs / Végétation</span>
        <input type="checkbox" id="grass-on" checked onclick="ev(event)">
        <span class="sc o" id="ca-grass">▼</span>
      </div>
      <div class="sb h" id="sb-grass"></div>
    </div>

    <div class="sec">
      <div class="sh" onclick="ts('road')">
        <span class="si">🛣️</span><span class="sn">Routes</span>
        <input type="checkbox" id="road-on" checked onclick="ev(event)">
        <span class="sc o" id="ca-road">▼</span>
      </div>
      <div class="sb h" id="sb-road">
        <div class="r"><label>Couleur</label><input type="color" id="road-col" value="#262626"></div>
      </div>
    </div>

    <div class="sec">
      <div class="sh" onclick="ts('build')">
        <span class="si">🏢</span><span class="sn">Bâtiments</span>
        <input type="checkbox" id="build-on" checked onclick="ev(event)">
        <span class="sc o" id="ca-build">▼</span>
      </div>
      <div class="sb h" id="sb-build">
        <div class="r"><label>Couleur</label><input type="color" id="build-col" value="#9090a0"></div>
        <div class="r"><label>Hauteur ×</label><input type="number" id="build-hs" value="1.0" step="0.1" min="0.1" max="5"></div>
      </div>
    </div>

    <div class="sec">
      <div class="sh" onclick="ts('gpx')"><span class="si">🏃</span><span class="sn">Trace GPX</span><span class="sc o" id="ca-gpx">▼</span></div>
      <div class="sb h" id="sb-gpx">
        <div class="r"><label>Couleur</label><input type="color" id="gpx-col" value="#ff4500"></div>
        <div class="r"><label>Hauteur</label><input type="number" id="gpx-h" value="1.2" step="0.1" min="0.5" max="5"><span>mm</span></div>
        <div class="r"><label>Larg. mini</label><input type="number" id="gpx-mw" value="1.5" step="0.1" min="0.5"><span>mm</span></div>
        <div class="r"><label>Larg. réelle</label><input type="number" id="gpx-tw" value="3.0" step="0.5" min="0.5"><span>m</span></div>
      </div>
    </div>

  </div><!-- /sp-bd -->
</div><!-- /sp -->
</div><!-- /ws -->

<!-- MODAL -->
<div id="modal">
  <div id="mbox">
    <div id="mtit"></div>
    <div id="mmsg"></div>
    <button class="btn-gen-f" id="btn-mc" onclick="document.getElementById('modal').style.display='none'">OK</button>
  </div>
</div>
`;
}

/* ── Progress bar ── */
export function setProgress(pct: number, step: string, label: string): void {
  const el = (id: string) => document.getElementById(id);
  const ps = el('ps'); if (ps) ps.textContent = step;
  const pl = el('pl'); if (pl) pl.textContent = label;
  const pb = el('pb'); if (pb) (pb as HTMLElement).style.width = `${pct}%`;
  const pp = el('pp'); if (pp) pp.textContent = `${Math.round(pct)}%`;
}

export function showProgress(show: boolean): void {
  const el = document.getElementById('prog');
  if (el) el.style.display = show ? 'flex' : 'none';
}

export function showModal(title: string, msg: string): void {
  const modal = document.getElementById('modal')!;
  document.getElementById('mtit')!.textContent = title;
  document.getElementById('mmsg')!.textContent = msg;
  modal.style.display = 'flex';
}

/* ── Section toggle (appelé depuis les onclick HTML) ── */
(window as any).ts = (id: string) => {
  document.getElementById(`sb-${id}`)?.classList.toggle('h');
  document.getElementById(`ca-${id}`)?.classList.toggle('o');
};

(window as any).ev = (e: Event) => { e.stopPropagation(); };
