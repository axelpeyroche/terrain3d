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
      <span class="tab-lbl">Dimensions</span>
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

    <!-- Carte plein écran -->
    <div id="zone-map">

      <!-- Barre de recherche (haut centre) -->
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

      <!-- Boîte à outils flottante (gauche) -->
      <div id="zone-tools">
        <div class="zt-section-label">Forme</div>

        <button class="zt-btn active" id="db-rect" title="Rectangle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="2" y="6" width="20" height="12" rx="1.5"/>
          </svg>
          <span>Rectangle</span>
        </button>

        <button class="zt-btn" id="db-sq" title="Carré">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="4" y="4" width="16" height="16" rx="1.5"/>
          </svg>
          <span>Carré</span>
        </button>

        <button class="zt-btn" id="db-circ" title="Rond">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="9"/>
          </svg>
          <span>Rond</span>
        </button>

        <button class="zt-btn" id="db-hex" title="Hexagone">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polygon points="12,2 21,7 21,17 12,22 3,17 3,7"/>
          </svg>
          <span>Hexagone</span>
        </button>

        <button class="zt-btn" id="db-poly" title="Polygone libre">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polygon points="12,2 22,9 18,21 6,21 2,9"/>
          </svg>
          <span>Polygone</span>
        </button>

        <div class="zt-sep"></div>
        <div class="zt-section-label">GPX</div>

        <label class="zt-btn zt-gpx" for="gpx-file" title="Importer un fichier GPX">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>Importer</span>
        </label>
        <input type="file" id="gpx-file" accept=".gpx">

        <button class="zt-btn" id="db-trace" title="Tracer manuellement">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="3,20 8,12 13,16 18,6 21,9" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Tracer</span>
        </button>

        <button class="zt-btn zt-secondary" id="db-cgpx" style="display:none" title="Centrer la trace">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="8"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
          </svg>
          <span>Centrer</span>
        </button>

        <div id="gpx-badge"></div>
        <div id="gpx-ctr" style="display:none">0 pts</div>

        <div class="zt-sep"></div>

        <button class="zt-btn zt-danger" id="db-clear" title="Tout effacer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="3,6 21,6"/><path d="M8,6V4h8v2"/><rect x="5" y="6" width="14" height="14" rx="2"/>
            <line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/>
          </svg>
          <span>Effacer</span>
        </button>

        <!-- Contrôles de zone (apparaissent quand zone définie) -->
        <div id="zone-controls" style="display:none">
          <div class="zt-sep"></div>
          <div class="zt-section-label">Zone active</div>

          <button class="zt-btn zt-danger" id="zc-delete" title="Supprimer la zone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <polyline points="3,6 21,6"/><path d="M8,6V4h8v2"/>
              <rect x="5" y="6" width="14" height="14" rx="2"/>
            </svg>
            <span>Supprimer</span>
          </button>

          <button class="zt-btn" id="zc-resize" title="Redimensionner · Molette souris">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Taille</span>
          </button>

          <button class="zt-btn" id="zc-move" title="Déplacer la zone">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2v20M2 12h20M12 6l-3-3M12 6l3-3M12 18l-3 3M12 18l3 3M6 12l-3-3M6 12l-3 3M18 12l3-3M18 12l3 3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Déplacer</span>
          </button>
        </div>
      </div>

      <!-- Carte Leaflet -->
      <div id="map"></div>

      <!-- Overlays dessin -->
      <div id="snap"></div>
      <div id="dch"></div>

      <!-- Footer — bouton vers onglet suivant (sans dimensions) -->
      <div id="zone-footer">
        <div id="zone-info">
          <svg viewBox="0 0 16 16" fill="#10b981"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.7 5.7l-4 4a1 1 0 01-1.4 0l-2-2a1 1 0 011.4-1.4L7 8.6l3.3-3.3a1 1 0 011.4 1.4z"/></svg>
          Zone définie
        </div>
        <button id="btn-next-tab" class="btn-next">
          Dimensions
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
