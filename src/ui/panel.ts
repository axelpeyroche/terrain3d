/* ════════════════════════════════════════════
   UI PANEL — Navigation par onglets
   ════════════════════════════════════════════ */

export function injectUI(): void {
  document.getElementById('app')!.innerHTML = `

<!-- ══ TOPBAR ══════════════════════════════════════════ -->
<header id="tb">
  <div class="logo">TERRAIN<span>3D</span></div>

  <nav id="tab-nav">
    <button class="tab-btn active" data-tab="zone">
      <span class="tab-num">1</span>
      <span class="tab-lbl">Sélection de la zone</span>
    </button>
    <button class="tab-btn" data-tab="params" id="tab-params-btn">
      <span class="tab-num">2</span>
      <span class="tab-lbl">Paramètres 3D</span>
    </button>
    <button class="tab-btn" data-tab="render" id="tab-render-btn">
      <span class="tab-num">3</span>
      <span class="tab-lbl">Générer &amp; Exporter</span>
    </button>
  </nav>

  <div id="tb-right">
    <button class="btn-stl" id="btn-stl" disabled title="Export STL mono-couleur">⬇ STL</button>
    <button class="btn-exp" id="btn-export" disabled>💾 Export .3MF</button>
  </div>
</header>

<!-- ══ PANELS ═══════════════════════════════════════════ -->
<main id="panels">

  <!-- ── ONGLET 1 : SÉLECTION DE LA ZONE ───────────────── -->
  <section id="panel-zone" class="panel active">

    <!-- Sidebar gauche -->
    <aside id="zone-sidebar">

      <div class="zs-block">
        <div class="zs-label">Forme d'impression</div>
        <div class="shape-list">

          <button class="shape-btn active" id="db-rect">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="4" y="10" width="32" height="20" rx="2"/>
            </svg>
            <span>Rectangle</span>
          </button>

          <button class="shape-btn" id="db-sq">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
              <rect x="8" y="8" width="24" height="24" rx="2"/>
            </svg>
            <span>Carré</span>
          </button>

          <button class="shape-btn" id="db-circ">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="20" cy="20" r="14"/>
            </svg>
            <span>Rond</span>
          </button>

          <button class="shape-btn" id="db-hex">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
              <polygon points="20,4 34,12 34,28 20,36 6,28 6,12"/>
            </svg>
            <span>Hexagone</span>
          </button>

          <button class="shape-btn" id="db-poly">
            <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
              <polygon points="20,4 36,14 30,34 10,34 4,14"/>
            </svg>
            <span>Polygone libre</span>
          </button>

        </div>
      </div>

      <div class="zs-block">
        <div class="zs-label">Trace GPX</div>
        <label class="gpx-import" for="gpx-file">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a1 1 0 00-1 1v6H5a1 1 0 000 2h4v6a1 1 0 002 0v-6h4a1 1 0 000-2h-4V3a1 1 0 00-1-1z"/></svg>
          Importer un fichier .gpx
        </label>
        <input type="file" id="gpx-file" accept=".gpx">

        <button class="shape-btn" id="db-trace">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
            <path d="M6 34 L14 18 L22 26 L30 10 L36 16" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="6" cy="34" r="2.5" fill="currentColor" stroke="none"/>
            <circle cx="36" cy="16" r="2.5" fill="currentColor" stroke="none"/>
          </svg>
          <span>Tracer manuellement</span>
        </button>

        <div id="gpx-badge"></div>
        <div id="gpx-ctr" style="display:none">0 points tracés</div>
        <button class="shape-btn secondary" id="db-cgpx" style="display:none">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
            <circle cx="20" cy="20" r="12"/>
            <line x1="20" y1="8" x2="20" y2="32"/>
            <line x1="8" y1="20" x2="32" y2="20"/>
          </svg>
          <span>Centrer la trace</span>
        </button>
      </div>

      <div class="zs-block zs-bottom">
        <button class="shape-btn danger" id="db-clear">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2">
            <polyline points="8,12 32,12"/>
            <path d="M16,12V8h8v4"/>
            <rect x="10" y="12" width="20" height="20" rx="2"/>
            <line x1="15" y1="18" x2="15" y2="28"/>
            <line x1="20" y1="18" x2="20" y2="28"/>
            <line x1="25" y1="18" x2="25" y2="28"/>
          </svg>
          <span>Tout effacer</span>
        </button>
      </div>

    </aside>

    <!-- Zone carte -->
    <div id="zone-map">

      <!-- Barre de recherche -->
      <div id="srch-wrap">
        <div id="srch-inner">
          <svg id="srch-ico" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="8.5" cy="8.5" r="5.5"/><path d="M15 15l-3-3"/>
          </svg>
          <input type="text" id="srch-input" placeholder="Rechercher un lieu, une ville, une adresse…" autocomplete="off">
          <button id="srch-clear" style="display:none">✕</button>
        </div>
        <div id="srch-drop"></div>
      </div>

      <!-- Carte Leaflet -->
      <div id="map"></div>

      <!-- Overlays dessin -->
      <div id="snap"></div>
      <div id="dch"></div>

      <!-- Footer zone définie -->
      <div id="zone-footer">
        <div id="zone-info">
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3z" opacity=".4"/><path d="M8 5a3 3 0 100 6A3 3 0 008 5z"/></svg>
          Zone sélectionnée : <strong id="zone-dims">—</strong>
        </div>
        <button id="btn-next-tab" class="btn-next">
          Paramètres 3D
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
        </button>
      </div>

    </div>
  </section>

  <!-- ── ONGLET 2 : PARAMÈTRES 3D ──────────────────────── -->
  <section id="panel-params" class="panel">
    <div id="params-wrap">

      <div id="params-col">

        <div class="sec">
          <div class="sh" onclick="ts('topo')"><span class="si">🏔️</span><span class="sn">Terrain</span><span class="sc o" id="ca-topo">▼</span></div>
          <div class="sb" id="sb-topo">
            <div class="r"><label>Couleur socle</label><input type="color" id="c-base" value="#eeebe6"></div>
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

      </div><!-- /params-col -->

      <div id="params-actions">
        <button class="btn-back" id="btn-back-zone">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
          Retour zone
        </button>
        <button id="btn-next-render" class="btn-next">
          Générer le terrain
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M7 4l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
        </button>
      </div>

    </div>
  </section>

  <!-- ── ONGLET 3 : GÉNÉRER & EXPORTER ─────────────────── -->
  <section id="panel-render" class="panel">
    <div id="render-wrap">

      <!-- Viewer 3D -->
      <div id="vp">
        <canvas id="c3d"></canvas>
        <div id="empty3d">
          <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.3">
            <polygon points="32,5 58,52 6,52"/>
            <polygon points="32,5 44,30 20,30" fill="currentColor" opacity=".15"/>
          </svg>
          <p>APERÇU 3D<br>Cliquez sur Générer pour créer le modèle</p>
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

      <!-- Panneau droit -->
      <div id="render-right">
        <button class="btn-back" id="btn-back-params">
          <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 4l-6 6 6 6" stroke="currentColor" stroke-width="2" fill="none"/></svg>
          Paramètres
        </button>
        <button class="btn-gen-f" id="btn-gen">▶ Générer le terrain 3D</button>
        <div id="export-section">
          <div class="export-label">Exporter le modèle</div>
          <button class="btn-exp" id="btn-export" disabled>💾 Export .3MF <small>(AMS multi-couleur)</small></button>
          <button class="btn-stl" id="btn-stl" disabled>⬇ Export STL <small>(mono-couleur)</small></button>
        </div>
        <div id="render-info"></div>
      </div>

    </div>
  </section>

</main>

<!-- MODAL -->
<div id="modal">
  <div id="mbox">
    <div id="mtit"></div>
    <div id="mmsg"></div>
    <button class="btn-gen-f" onclick="document.getElementById('modal').style.display='none'">OK</button>
  </div>
</div>
`;
}

/* ── Progress ── */
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

/* ── Tab switching ── */
export function switchTab(tab: string): void {
  document.querySelectorAll('.tab-btn').forEach(b =>
    b.classList.toggle('active', (b as HTMLElement).dataset.tab === tab));
  document.querySelectorAll('.panel').forEach(p =>
    p.classList.toggle('active', p.id === `panel-${tab}`));
}

/* ── Section toggle (onclick inline) ── */
(window as any).ts = (id: string) => {
  document.getElementById(`sb-${id}`)?.classList.toggle('h');
  document.getElementById(`ca-${id}`)?.classList.toggle('o');
};
(window as any).ev = (e: Event) => { e.stopPropagation(); };
