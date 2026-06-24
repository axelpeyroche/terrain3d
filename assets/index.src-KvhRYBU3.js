(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();function mm(){document.getElementById("app").innerHTML=`

<!-- ══ TOPBAR ══════════════════════════════════════════ -->
<header id="tb">
  <div class="logo">TERRAIN<span>3D</span></div>

  <nav id="tab-nav">
    <button class="tab-btn active" data-tab="zone">
      <span class="tab-num">1</span>
      <span class="tab-lbl">Sélection de la zone</span>
    </button>
    <button class="tab-btn" data-tab="params" id="tab-params-btn" disabled>
      <span class="tab-num">2</span>
      <span class="tab-lbl">Dimensions</span>
    </button>
    <button class="tab-btn" data-tab="colors" id="tab-colors-btn" disabled>
      <span class="tab-num">3</span>
      <span class="tab-lbl">Couleurs</span>
    </button>
    <button class="tab-btn" data-tab="apercu" id="tab-apercu-btn" disabled>
      <span class="tab-num">4</span>
      <span class="tab-lbl">Aperçu</span>
    </button>
  </nav>
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

      </div>

      <!-- Carte Leaflet -->
      <div id="map"></div>

      <!-- Contrôles flottants de zone (position mise à jour par JS) -->
      <div id="zone-controls">
        <button class="zc-btn" id="zc-move" title="Déplacer la zone">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M10 2v16M2 10h16M10 5L7 2M10 5l3-3M10 15l-3 3M10 15l3 3M5 10l-3-3M5 10l-3 3M15 10l3-3M15 10l3 3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="zc-btn" id="zc-zoom-in" title="Agrandir la zone">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M13 3h4v4M3 13v4h4M17 3l-6 6M3 17l6-6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="zc-btn" id="zc-zoom-out" title="Réduire la zone">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M7 13L3 17M17 3l-4 4M3 13h4v4M13 3v4h4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="zc-sep"></div>
        <button class="zc-btn zc-danger" id="zc-delete" title="Supprimer la zone">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8">
            <polyline points="2,5 18,5"/><path d="M7,5V3h6v2"/>
            <rect x="4" y="5" width="12" height="12" rx="1.5"/>
          </svg>
        </button>
      </div>

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

  <!-- ── ONGLET 2 : DIMENSIONS ─────────────────────────── -->
  <section id="panel-params" class="panel">

    <!-- 3D canvas area -->
    <div id="dims-view">

      <!-- HTML labels projected from 3D -->
      <div id="dims-labels">
        <div class="dl" id="dl-width"></div>
        <div class="dl" id="dl-depth"></div>
        <div class="dl" id="dl-height"></div>
      </div>

      <!-- Loading overlay -->
      <div id="dims-loading">
        <div class="dims-spin"></div>
        <div id="dims-load-msg">Initialisation…</div>
      </div>
    </div>

    <!-- Settings panel (right) -->
    <div id="dims-panel">

      <div class="dp-header">
        <button class="dp-dl-btn" id="dp-dl-btn" title="Exporter STL rapide">⬇</button>
      </div>

      <!-- Taille -->
      <div class="dp-sec open" id="dps-taille">
        <div class="dp-sh">
          <span class="dp-sn">Taille</span>
          <svg class="dp-arr" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="dp-sb">
          <div class="dp-row2">
            <div class="dp-field">
              <label>Largeur (mm)</label>
              <input type="number" id="dp-w" value="200" min="50" max="600" step="10">
            </div>
            <div class="dp-field">
              <label>Longueur (mm)</label>
              <input type="number" id="dp-d" value="200" min="50" max="600" step="10">
            </div>
          </div>
        </div>
      </div>

      <!-- Hauteur -->
      <div class="dp-sec open" id="dps-hauteur">
        <div class="dp-sh">
          <span class="dp-sn">Hauteur</span>
          <svg class="dp-arr" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="dp-sb">
          <div class="dp-total">Total : <strong id="dp-total-val">~26</strong> mm <span class="dp-info-icon" title="Hauteur totale du modèle imprimé">ℹ</span></div>
          <div class="dp-breakdown">Carte : <span id="dp-map-h">~21</span> mm · Fond : <span id="dp-base-h-disp">5</span> mm</div>
          <label class="dp-lbl">Exagération verticale <span class="dp-info-icon" title="Multiplie le relief pour le rendre plus visible">ℹ</span></label>
          <input type="number" id="dp-exag" value="1" step="0.5" min="0.1" max="10" class="dp-input">
          <label class="dp-lbl">Épaisseur du fond (mm) <span class="dp-info-icon" title="Socle plein sous le terrain">ℹ</span></label>
          <div class="dp-row-hint">
            <input type="number" id="dp-base" value="2" step="1" min="1" max="30" class="dp-input">
            <span class="dp-hint" id="dp-layers-hint">25 couches</span>
          </div>
        </div>
      </div>

      <!-- Façade -->
      <div class="dp-sec" id="dps-facade">
        <div class="dp-sh">
          <span class="dp-sn">Façade <span class="dp-info-icon" title="Options pour les faces latérales">ℹ</span></span>
          <svg class="dp-arr" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div class="dp-sb dp-sb-collapsed">
          <label class="dp-check">
            <input type="checkbox" id="dp-flat">
            Aplatir la façade <span class="dp-info-icon" title="Rendre les faces latérales parfaitement plates">ℹ</span>
          </label>
          <label class="dp-lbl">Largeur de la façade (nombre de murs) <span class="dp-info-icon" title="Épaisseur des parois latérales">ℹ</span></label>
          <div class="dp-row-hint">
            <input type="number" id="dp-walls" value="1" step="1" min="0" max="10" class="dp-input">
            <span class="dp-hint" id="dp-wall-mm">0.84 mm</span>
          </div>
        </div>
      </div>

      <!-- Nav -->
      <div class="dp-nav">
        <button class="btn-back" id="btn-back-zone">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 4l-6 6 6 6"/></svg>
          Zone
        </button>
        <button id="btn-next-colors" class="btn-next">
          Couleurs
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4l6 6-6 6"/></svg>
        </button>
      </div>

      <!-- Hidden legacy inputs so getSettings() still works -->
      <div id="params-hidden">
        <input type="color"    id="c-base"    value="#eeebe6">
        <select id="t-res"><option value="128" selected>128</option><option value="56">56</option><option value="96">96</option><option value="256">256</option></select>
        <input type="number"   id="t-smooth"  value="1">
        <input type="number"   id="t-zoom"    value="15">
        <input type="checkbox" id="water-on"  checked>
        <input type="color"    id="water-col" value="#3399ff">
        <input type="checkbox" id="grass-on"  checked>
        <input type="checkbox" id="road-on"   checked>
        <input type="color"    id="road-col"  value="#262626">
        <input type="checkbox" id="build-on"  checked>
        <input type="color"    id="build-col" value="#9090a0">
        <input type="number"   id="build-hs"  value="1.0">
        <input type="color"    id="gpx-col"   value="#ff4500">
        <input type="number"   id="gpx-h"     value="1.2">
        <input type="number"   id="gpx-mw"    value="1.5">
        <input type="number"   id="gpx-tw"    value="3.0">
      </div>

    </div>
  </section>

  <!-- ── ONGLET 3 : COULEURS ──────────────────────────── -->
  <section id="panel-colors" class="panel">
    <div id="colors-wrap">

      <!-- ── Panneau gauche ─────────────────────────── -->
      <div id="colors-panel">

        <div id="cp-main">
      <!-- Toolbar -->
        <div class="cp-toolbar">
          <span class="cp-main-title">Couleurs</span>
          <button class="cp-nozzle-btn" id="btn-print-settings" title="Paramètres d'impression">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M6 3h12l2 6H4L6 3z"/>
              <path d="M4 9v3a2 2 0 002 2h12a2 2 0 002-2V9"/>
              <rect x="9" y="14" width="6" height="7" rx="1"/>
            </svg>
          </button>
        </div>

        <!-- Modèle préréglé -->
        <div class="cp-sec cp-model-sec">
          <div class="cp-sec-header">
            <span class="cp-sec-title">Modèle</span>
            <button class="cp-icon-btn" id="cp-model-add" title="Enregistrer comme modèle">+</button>
          </div>
          <div class="cp-model-row">
            <div class="cp-dd-wrap" id="cp-model-dd-wrap">
              <button class="cp-dd-trigger" id="cp-dd-trigger">
                <span id="cp-dd-label">Couleurs</span>
                <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
              </button>
              <div class="cp-dd-menu" id="cp-dd-menu">
                <div class="cp-dd-group">Défaut</div>
                <div class="cp-dd-item" data-preset="vide">Vide</div>
                <div class="cp-dd-item cp-dd-active" data-preset="couleurs">
                  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6l3 3 5-5"/></svg>
                  Couleurs
                </div>
                <div class="cp-dd-sep"></div>
                <div class="cp-dd-group">Mes modèles</div>
                <div class="cp-dd-empty">Aucun modèle personnalisé pour le moment</div>
              </div>
            </div>
            <button id="cp-apply" class="cp-apply-btn">Appliquer</button>
          </div>
        </div>

        <!-- Couleurs (slots 1-6) -->
        <div class="cp-sec">
          <div class="cp-sec-header">
            <span class="cp-sec-title">Couleurs</span>
            <div class="cp-sec-actions">
              <button class="cp-icon-btn" id="cp-col-minus" title="Supprimer une couleur">−</button>
              <button class="cp-icon-btn" id="cp-col-plus"  title="Ajouter une couleur">+</button>
            </div>
          </div>
          <div class="cp-swatches" id="cp-swatches">
            <label class="cp-swatch" data-slot="1" title="Terrain nu / Façade">
              <input type="color" class="cp-color-input" data-slot="1" value="#c0af88">
              <div class="cp-sw-inner"><span class="cp-sw-num">1</span></div>
            </label>
            <label class="cp-swatch" data-slot="2" title="Neige et glace">
              <input type="color" class="cp-color-input" data-slot="2" value="#e4eee8">
              <div class="cp-sw-inner"><span class="cp-sw-num">2</span></div>
            </label>
            <label class="cp-swatch" data-slot="3" title="Végétation basse">
              <input type="color" class="cp-color-input" data-slot="3" value="#8ab858">
              <div class="cp-sw-inner"><span class="cp-sw-num">3</span></div>
            </label>
            <label class="cp-swatch" data-slot="4" title="Végétation dense">
              <input type="color" class="cp-color-input" data-slot="4" value="#3a6828">
              <div class="cp-sw-inner"><span class="cp-sw-num">4</span></div>
            </label>
            <label class="cp-swatch" data-slot="5" title="Plans d'eau">
              <input type="color" class="cp-color-input" data-slot="5" value="#4a88c0">
              <div class="cp-sw-inner"><span class="cp-sw-num">5</span></div>
            </label>
            <label class="cp-swatch" data-slot="6" title="Marqueurs / GPX">
              <input type="color" class="cp-color-input" data-slot="6" value="#ff4500">
              <div class="cp-sw-inner"><span class="cp-sw-num">6</span></div>
            </label>
            <label class="cp-swatch" data-slot="7" title="Bâtiments">
              <input type="color" class="cp-color-input" data-slot="7" value="#b8b8b8">
              <div class="cp-sw-inner"><span class="cp-sw-num">7</span></div>
            </label>
            <label class="cp-swatch" data-slot="8" title="Routes">
              <input type="color" class="cp-color-input" data-slot="8" value="#262626">
              <div class="cp-sw-inner"><span class="cp-sw-num">8</span></div>
            </label>
          </div>
        </div>

        <!-- Couches -->
        <div class="cp-sec cp-sec-grow">
          <div class="cp-sec-header">
            <span class="cp-sec-title">Couches</span>
            <button class="cp-icon-btn" id="cp-add-layer-btn" title="Ajouter une couche">+</button>
          </div>
          <div class="cp-layers">

            <div class="cp-layer cp-layer-nav" data-layer="gpx" data-type="markers">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="6" style="background:#ff4500">6</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="4" cy="12" r="2"/><circle cx="12" cy="4" r="2"/><line x1="4" y1="12" x2="12" y2="4"/></svg>
              <span class="cp-layer-name">Marqueurs 1</span>
              <button class="cp-eye" data-layer="gpx" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="gpx_line" data-type="lines">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="6" style="background:#ff4500">6</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,12 6,6 10,9 14,4"/></svg>
              <span class="cp-layer-name">Lignes 1</span>
              <button class="cp-eye" data-layer="gpx_line" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="roads" data-type="roads">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="8" style="background:#262626; color:#fff">8</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M2 13 Q8 9 14 13"/>
                <path d="M2 10 Q8 6 14 10"/>
              </svg>
              <span class="cp-layer-name">Routes</span>
              <button class="cp-eye active" data-layer="roads" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="buildings" data-type="buildings">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="7" style="background:#b8b8b8; color:#333">7</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="6" width="10" height="8" rx="0.5"/>
                <polyline points="1,7 8,2 15,7"/>
              </svg>
              <span class="cp-layer-name">Bâtiments</span>
              <button class="cp-eye active" data-layer="buildings" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="water" data-type="water">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="5" style="background:#4a88c0">5</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10 Q4 7 6 10 Q8 13 10 10 Q12 7 14 10"/></svg>
              <span class="cp-layer-name">Plans d'eau 1</span>
              <button class="cp-eye active" data-layer="water" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="waterways" data-type="waterways">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="5" style="background:#4a88c0">5</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 8 Q5 5 8 8 Q11 11 14 8" stroke-dasharray="2 1"/></svg>
              <span class="cp-layer-name">Voies navigables</span>
              <button class="cp-eye active" data-layer="waterways" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="veg_dense" data-type="veg_dense">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="4" style="background:#3a6828">4</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="8,2 14,10 2,10"/><line x1="8" y1="10" x2="8" y2="14"/></svg>
              <span class="cp-layer-name">Végétation dense</span>
              <button class="cp-eye active" data-layer="veg_dense" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="veg_low" data-type="veg_low">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="3" style="background:#8ab858">3</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="8,3 13,11 3,11"/><line x1="8" y1="11" x2="8" y2="14"/></svg>
              <span class="cp-layer-name">Végétation basse</span>
              <button class="cp-eye active" data-layer="veg_low" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="snow" data-type="snow_lc">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="2" style="background:#e4eee8; border:1px solid #aaa; color:#555">2</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="8,2 10,7 15,7 11,10 13,15 8,12 3,15 5,10 1,7 6,7"/></svg>
              <span class="cp-layer-name">Neige et glace</span>
              <button class="cp-eye active" data-layer="snow" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <div class="cp-layer cp-layer-nav" data-layer="terrain" data-type="barren_lc">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="1" style="background:#c0af88">1</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1,13 6,5 10,9 13,4 15,13"/></svg>
              <span class="cp-layer-name">Terrain nu</span>
              <button class="cp-eye active" data-layer="barren" title="Visibilité">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>
              </button>
              <button class="cp-del" title="Supprimer">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>
              </button>
            </div>

            <!-- Couches fixes (base + façade) -->
            <div class="cp-layer cp-layer-fixed" data-layer="base">
              <span class="cp-drag"></span>
              <div class="cp-sw-mini cp-sw-editable" data-slot="1" style="background:#c0af88" title="Changer la couleur">1</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="8" width="12" height="6" rx="1"/></svg>
              <span class="cp-layer-name">Base</span>
            </div>

            <div class="cp-layer cp-layer-fixed" data-layer="facade">
              <span class="cp-drag"></span>
              <div class="cp-sw-mini cp-sw-editable" data-slot="1" style="background:#c0af88" title="Changer la couleur">1</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="12" height="12" rx="1" fill="none"/><rect x="2" y="2" width="2" height="12"/><rect x="12" y="2" width="2" height="12"/></svg>
              <span class="cp-layer-name">Façade</span>
            </div>

          </div><!-- /.cp-layers -->
        </div><!-- /.cp-sec -->

        <!-- Filtre de taille -->
        <div class="cp-sec cp-filter-sec">
          <div class="cp-sec-header">
            <span class="cp-sec-title">Filtre de taille des caractéristiques</span>
            <button class="cp-icon-btn cp-info-btn" title="Filtrer les petits éléments cartographiques">i</button>
          </div>
          <input type="range" id="cp-filter" class="cp-slider" min="0" max="100" value="50">
        </div>

      </div><!-- /#cp-main -->

      <!-- Navigation (toujours visible) -->
      <div class="dp-nav cp-nav-fixed">
        <button class="btn-back" id="btn-back-dims">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 4l-6 6 6 6"/></svg>
          Dimensions
        </button>
      </div>

      </div><!-- /#colors-panel -->

      <!-- ── Panneau détail couche (colonne droite, glisse depuis le panneau) ── -->
      <div id="cp-layer-detail">
        <div class="ldp-header">
          <button class="ldp-back-btn" id="ldp-back" title="Fermer">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 3l-6 5 6 5"/></svg>
          </button>
          <svg id="ldp-icon" class="ldp-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"></svg>
          <span id="ldp-title">Couche</span>
        </div>
        <div id="ldp-content" class="ldp-content"></div>
      </div>

      <!-- ── Vue 3D (canvas partagé avec tab 2) ─────── -->
      <div id="colors-3d-area">
        <div id="colors-loading" class="hidden">
          <div class="dims-spin"></div>
          <span>Chargement…</span>
        </div>
      </div>

    </div><!-- /#colors-wrap -->

    <!-- Bouton Aperçu : fixé en bas à droite de la page, visible uniquement sur cet onglet -->
    <button class="btn-next cp-apercu-fixed" id="btn-next-apercu">
      Aperçu
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4l6 6-6 6"/></svg>
    </button>

  </section>

  <!-- ── ONGLET 4 : APERÇU ─────────────────────────── -->
  <section id="panel-apercu" class="panel">
    <div id="apercu-wrap">
      <div id="apercu-3d-area">
        <div id="apercu-loading" class="hidden">
          <div class="dims-spin"></div>
          <span>Chargement…</span>
        </div>
      </div>
      <div class="apercu-nav">
        <button class="btn-back" id="btn-back-colors">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 4l-6 6 6 6"/></svg>
          Couleurs
        </button>
        <button class="btn-next" id="btn-next-render">
          Générer
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4l6 6-6 6"/></svg>
        </button>
      </div>
    </div>
  </section>

  <!-- ── DIALOGUE PARAMÈTRES D'IMPRESSION ──────────── -->
  <div id="print-settings-overlay" class="ps-overlay hidden">
    <div class="ps-dialog">
      <div class="ps-header">
        <span class="ps-title">Paramètres d'impression</span>
        <div class="ps-header-actions">
          <button class="ps-icon-btn" id="ps-reset" title="Réinitialiser">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 8a5 5 0 105-5H5M5 1v4h4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button class="ps-icon-btn" id="ps-save" title="Enregistrer">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="2" width="12" height="12" rx="1.5"/><rect x="5" y="2" width="6" height="4"/><rect x="4" y="9" width="8" height="5" rx="0.5"/></svg>
          </button>
          <button class="ps-icon-btn ps-close-btn" id="ps-close" title="Fermer">✕</button>
        </div>
      </div>

      <div class="ps-body">
        <select id="ps-nozzle" class="cp-select">
          <option value="0.4">Buse 0.4 mm</option>
          <option value="0.2">Buse 0.2 mm</option>
          <option value="0.6">Buse 0.6 mm</option>
          <option value="0.8">Buse 0.8 mm</option>
        </select>

        <div class="ps-field">
          <div class="ps-field-header">
            <label for="ps-layer-h">Hauteur de couche (mm)</label>
          </div>
          <div class="ps-range-row">
            <input type="range" id="ps-layer-h" min="0.05" max="0.35" step="0.05" value="0.20" class="cp-slider">
            <span class="ps-val" id="ps-layer-h-val">0.20</span>
            <span class="ps-ref">(0.20 mm)</span>
          </div>
        </div>

        <div class="ps-field">
          <div class="ps-field-header">
            <label for="ps-wall-w">Largeur de ligne de mur (mm)</label>
            <button class="cp-icon-btn cp-info-btn" title="Largeur des lignes de périmètre">i</button>
          </div>
          <div class="ps-range-row">
            <input type="range" id="ps-wall-w" min="0.2" max="1.0" step="0.02" value="0.42" class="cp-slider">
            <span class="ps-val" id="ps-wall-w-val">0.42</span>
            <span class="ps-ref">(0.42 mm)</span>
          </div>
        </div>
      </div>

      <div class="ps-footer">
        <button class="btn-gen-f" id="ps-confirm">Confirmer</button>
      </div>
    </div>
  </div>


</main>

<!-- Shared 3D canvas — positioned via JS (position:fixed) over the active 3D area -->
<canvas id="dims-canvas"></canvas>

<!-- MODAL -->
<div id="modal">
  <div id="mbox">
    <div id="mtit"></div>
    <div id="mmsg"></div>
    <button class="btn-gen-f" onclick="document.getElementById('modal').style.display='none'">OK</button>
  </div>
</div>
`}function Es(s){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===s)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${s}`))}window.ts=s=>{document.getElementById(`sb-${s}`)?.classList.toggle("h"),document.getElementById(`ca-${s}`)?.classList.toggle("o")};window.ev=s=>{s.stopPropagation()};var gm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _m(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var _c={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(s,t){(function(e,n){n(t)})(gm,function(e){var n="1.9.4";function r(i){var o,u,p,x;for(u=1,p=arguments.length;u<p;u++){x=arguments[u];for(o in x)i[o]=x[o]}return i}var a=Object.create||function(){function i(){}return function(o){return i.prototype=o,new i}}();function l(i,o){var u=Array.prototype.slice;if(i.bind)return i.bind.apply(i,u.call(arguments,1));var p=u.call(arguments,2);return function(){return i.apply(o,p.length?p.concat(u.call(arguments)):arguments)}}var c=0;function h(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,o,u){var p,x,P,H;return H=function(){p=!1,x&&(P.apply(u,x),x=!1)},P=function(){p?x=arguments:(i.apply(u,arguments),setTimeout(H,o),p=!0)},P}function f(i,o,u){var p=o[1],x=o[0],P=p-x;return i===p&&u?i:((i-x)%P+P)%P+x}function g(){return!1}function m(i,o){if(o===!1)return i;var u=Math.pow(10,o===void 0?6:o);return Math.round(i*u)/u}function _(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function M(i){return _(i).split(/\s+/)}function w(i,o){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?a(i.options):{});for(var u in o)i.options[u]=o[u];return i.options}function v(i,o,u){var p=[];for(var x in i)p.push(encodeURIComponent(u?x.toUpperCase():x)+"="+encodeURIComponent(i[x]));return(!o||o.indexOf("?")===-1?"?":"&")+p.join("&")}var y=/\{ *([\w_ -]+) *\}/g;function D(i,o){return i.replace(y,function(u,p){var x=o[p];if(x===void 0)throw new Error("No value provided for variable "+u);return typeof x=="function"&&(x=x(o)),x})}var b=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function A(i,o){for(var u=0;u<i.length;u++)if(i[u]===o)return u;return-1}var k="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function I(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var R=0;function U(i){var o=+new Date,u=Math.max(0,16-(o-R));return R=o+u,window.setTimeout(i,u)}var C=window.requestAnimationFrame||I("RequestAnimationFrame")||U,E=window.cancelAnimationFrame||I("CancelAnimationFrame")||I("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function B(i,o,u){if(u&&C===U)i.call(o);else return C.call(window,l(i,o))}function X(i){i&&E.call(window,i)}var F={__proto__:null,extend:r,create:a,bind:l,get lastId(){return c},stamp:h,throttle:d,wrapNum:f,falseFn:g,formatNum:m,trim:_,splitWords:M,setOptions:w,getParamString:v,template:D,isArray:b,indexOf:A,emptyImageUrl:k,requestFn:C,cancelFn:E,requestAnimFrame:B,cancelAnimFrame:X};function W(){}W.extend=function(i){var o=function(){w(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},u=o.__super__=this.prototype,p=a(u);p.constructor=o,o.prototype=p;for(var x in this)Object.prototype.hasOwnProperty.call(this,x)&&x!=="prototype"&&x!=="__super__"&&(o[x]=this[x]);return i.statics&&r(o,i.statics),i.includes&&(Q(i.includes),r.apply(null,[p].concat(i.includes))),r(p,i),delete p.statics,delete p.includes,p.options&&(p.options=u.options?a(u.options):{},r(p.options,i.options)),p._initHooks=[],p.callInitHooks=function(){if(!this._initHooksCalled){u.callInitHooks&&u.callInitHooks.call(this),this._initHooksCalled=!0;for(var P=0,H=p._initHooks.length;P<H;P++)p._initHooks[P].call(this)}},o},W.include=function(i){var o=this.prototype.options;return r(this.prototype,i),i.options&&(this.prototype.options=o,this.mergeOptions(i.options)),this},W.mergeOptions=function(i){return r(this.prototype.options,i),this},W.addInitHook=function(i){var o=Array.prototype.slice.call(arguments,1),u=typeof i=="function"?i:function(){this[i].apply(this,o)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(u),this};function Q(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=b(i)?i:[i];for(var o=0;o<i.length;o++)i[o]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var Y={on:function(i,o,u){if(typeof i=="object")for(var p in i)this._on(p,i[p],o);else{i=M(i);for(var x=0,P=i.length;x<P;x++)this._on(i[x],o,u)}return this},off:function(i,o,u){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var p in i)this._off(p,i[p],o);else{i=M(i);for(var x=arguments.length===1,P=0,H=i.length;P<H;P++)x?this._off(i[P]):this._off(i[P],o,u)}return this},_on:function(i,o,u,p){if(typeof o!="function"){console.warn("wrong listener type: "+typeof o);return}if(this._listens(i,o,u)===!1){u===this&&(u=void 0);var x={fn:o,ctx:u};p&&(x.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(x)}},_off:function(i,o,u){var p,x,P;if(this._events&&(p=this._events[i],!!p)){if(arguments.length===1){if(this._firingCount)for(x=0,P=p.length;x<P;x++)p[x].fn=g;delete this._events[i];return}if(typeof o!="function"){console.warn("wrong listener type: "+typeof o);return}var H=this._listens(i,o,u);if(H!==!1){var J=p[H];this._firingCount&&(J.fn=g,this._events[i]=p=p.slice()),p.splice(H,1)}}},fire:function(i,o,u){if(!this.listens(i,u))return this;var p=r({},o,{type:i,target:this,sourceTarget:o&&o.sourceTarget||this});if(this._events){var x=this._events[i];if(x){this._firingCount=this._firingCount+1||1;for(var P=0,H=x.length;P<H;P++){var J=x[P],nt=J.fn;J.once&&this.off(i,nt,J.ctx),nt.call(J.ctx||this,p)}this._firingCount--}}return u&&this._propagateEvent(p),this},listens:function(i,o,u,p){typeof i!="string"&&console.warn('"string" type argument expected');var x=o;typeof o!="function"&&(p=!!o,x=void 0,u=void 0);var P=this._events&&this._events[i];if(P&&P.length&&this._listens(i,x,u)!==!1)return!0;if(p){for(var H in this._eventParents)if(this._eventParents[H].listens(i,o,u,p))return!0}return!1},_listens:function(i,o,u){if(!this._events)return!1;var p=this._events[i]||[];if(!o)return!!p.length;u===this&&(u=void 0);for(var x=0,P=p.length;x<P;x++)if(p[x].fn===o&&p[x].ctx===u)return x;return!1},once:function(i,o,u){if(typeof i=="object")for(var p in i)this._on(p,i[p],o,!0);else{i=M(i);for(var x=0,P=i.length;x<P;x++)this._on(i[x],o,u,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[h(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[h(i)],this},_propagateEvent:function(i){for(var o in this._eventParents)this._eventParents[o].fire(i.type,r({layer:i.target,propagatedFrom:i.target},i),!0)}};Y.addEventListener=Y.on,Y.removeEventListener=Y.clearAllEventListeners=Y.off,Y.addOneTimeEventListener=Y.once,Y.fireEvent=Y.fire,Y.hasEventListeners=Y.listens;var ft=W.extend(Y);function z(i,o,u){this.x=u?Math.round(i):i,this.y=u?Math.round(o):o}var ct=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};z.prototype={clone:function(){return new z(this.x,this.y)},add:function(i){return this.clone()._add(G(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(G(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new z(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new z(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=ct(this.x),this.y=ct(this.y),this},distanceTo:function(i){i=G(i);var o=i.x-this.x,u=i.y-this.y;return Math.sqrt(o*o+u*u)},equals:function(i){return i=G(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=G(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+m(this.x)+", "+m(this.y)+")"}};function G(i,o,u){return i instanceof z?i:b(i)?new z(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new z(i.x,i.y):new z(i,o,u)}function st(i,o){if(i)for(var u=o?[i,o]:i,p=0,x=u.length;p<x;p++)this.extend(u[p])}st.prototype={extend:function(i){var o,u;if(!i)return this;if(i instanceof z||typeof i[0]=="number"||"x"in i)o=u=G(i);else if(i=yt(i),o=i.min,u=i.max,!o||!u)return this;return!this.min&&!this.max?(this.min=o.clone(),this.max=u.clone()):(this.min.x=Math.min(o.x,this.min.x),this.max.x=Math.max(u.x,this.max.x),this.min.y=Math.min(o.y,this.min.y),this.max.y=Math.max(u.y,this.max.y)),this},getCenter:function(i){return G((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return G(this.min.x,this.max.y)},getTopRight:function(){return G(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var o,u;return typeof i[0]=="number"||i instanceof z?i=G(i):i=yt(i),i instanceof st?(o=i.min,u=i.max):o=u=i,o.x>=this.min.x&&u.x<=this.max.x&&o.y>=this.min.y&&u.y<=this.max.y},intersects:function(i){i=yt(i);var o=this.min,u=this.max,p=i.min,x=i.max,P=x.x>=o.x&&p.x<=u.x,H=x.y>=o.y&&p.y<=u.y;return P&&H},overlaps:function(i){i=yt(i);var o=this.min,u=this.max,p=i.min,x=i.max,P=x.x>o.x&&p.x<u.x,H=x.y>o.y&&p.y<u.y;return P&&H},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var o=this.min,u=this.max,p=Math.abs(o.x-u.x)*i,x=Math.abs(o.y-u.y)*i;return yt(G(o.x-p,o.y-x),G(u.x+p,u.y+x))},equals:function(i){return i?(i=yt(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function yt(i,o){return!i||i instanceof st?i:new st(i,o)}function bt(i,o){if(i)for(var u=o?[i,o]:i,p=0,x=u.length;p<x;p++)this.extend(u[p])}bt.prototype={extend:function(i){var o=this._southWest,u=this._northEast,p,x;if(i instanceof K)p=i,x=i;else if(i instanceof bt){if(p=i._southWest,x=i._northEast,!p||!x)return this}else return i?this.extend(ut(i)||Z(i)):this;return!o&&!u?(this._southWest=new K(p.lat,p.lng),this._northEast=new K(x.lat,x.lng)):(o.lat=Math.min(p.lat,o.lat),o.lng=Math.min(p.lng,o.lng),u.lat=Math.max(x.lat,u.lat),u.lng=Math.max(x.lng,u.lng)),this},pad:function(i){var o=this._southWest,u=this._northEast,p=Math.abs(o.lat-u.lat)*i,x=Math.abs(o.lng-u.lng)*i;return new bt(new K(o.lat-p,o.lng-x),new K(u.lat+p,u.lng+x))},getCenter:function(){return new K((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new K(this.getNorth(),this.getWest())},getSouthEast:function(){return new K(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof K||"lat"in i?i=ut(i):i=Z(i);var o=this._southWest,u=this._northEast,p,x;return i instanceof bt?(p=i.getSouthWest(),x=i.getNorthEast()):p=x=i,p.lat>=o.lat&&x.lat<=u.lat&&p.lng>=o.lng&&x.lng<=u.lng},intersects:function(i){i=Z(i);var o=this._southWest,u=this._northEast,p=i.getSouthWest(),x=i.getNorthEast(),P=x.lat>=o.lat&&p.lat<=u.lat,H=x.lng>=o.lng&&p.lng<=u.lng;return P&&H},overlaps:function(i){i=Z(i);var o=this._southWest,u=this._northEast,p=i.getSouthWest(),x=i.getNorthEast(),P=x.lat>o.lat&&p.lat<u.lat,H=x.lng>o.lng&&p.lng<u.lng;return P&&H},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,o){return i?(i=Z(i),this._southWest.equals(i.getSouthWest(),o)&&this._northEast.equals(i.getNorthEast(),o)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function Z(i,o){return i instanceof bt?i:new bt(i,o)}function K(i,o,u){if(isNaN(i)||isNaN(o))throw new Error("Invalid LatLng object: ("+i+", "+o+")");this.lat=+i,this.lng=+o,u!==void 0&&(this.alt=+u)}K.prototype={equals:function(i,o){if(!i)return!1;i=ut(i);var u=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return u<=(o===void 0?1e-9:o)},toString:function(i){return"LatLng("+m(this.lat,i)+", "+m(this.lng,i)+")"},distanceTo:function(i){return St.distance(this,ut(i))},wrap:function(){return St.wrapLatLng(this)},toBounds:function(i){var o=180*i/40075017,u=o/Math.cos(Math.PI/180*this.lat);return Z([this.lat-o,this.lng-u],[this.lat+o,this.lng+u])},clone:function(){return new K(this.lat,this.lng,this.alt)}};function ut(i,o,u){return i instanceof K?i:b(i)&&typeof i[0]!="object"?i.length===3?new K(i[0],i[1],i[2]):i.length===2?new K(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new K(i.lat,"lng"in i?i.lng:i.lon,i.alt):o===void 0?null:new K(i,o,u)}var _t={latLngToPoint:function(i,o){var u=this.projection.project(i),p=this.scale(o);return this.transformation._transform(u,p)},pointToLatLng:function(i,o){var u=this.scale(o),p=this.transformation.untransform(i,u);return this.projection.unproject(p)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var o=this.projection.bounds,u=this.scale(i),p=this.transformation.transform(o.min,u),x=this.transformation.transform(o.max,u);return new st(p,x)},infinite:!1,wrapLatLng:function(i){var o=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,u=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,p=i.alt;return new K(u,o,p)},wrapLatLngBounds:function(i){var o=i.getCenter(),u=this.wrapLatLng(o),p=o.lat-u.lat,x=o.lng-u.lng;if(p===0&&x===0)return i;var P=i.getSouthWest(),H=i.getNorthEast(),J=new K(P.lat-p,P.lng-x),nt=new K(H.lat-p,H.lng-x);return new bt(J,nt)}},St=r({},_t,{wrapLng:[-180,180],R:6371e3,distance:function(i,o){var u=Math.PI/180,p=i.lat*u,x=o.lat*u,P=Math.sin((o.lat-i.lat)*u/2),H=Math.sin((o.lng-i.lng)*u/2),J=P*P+Math.cos(p)*Math.cos(x)*H*H,nt=2*Math.atan2(Math.sqrt(J),Math.sqrt(1-J));return this.R*nt}}),At=6378137,It={R:At,MAX_LATITUDE:85.0511287798,project:function(i){var o=Math.PI/180,u=this.MAX_LATITUDE,p=Math.max(Math.min(u,i.lat),-u),x=Math.sin(p*o);return new z(this.R*i.lng*o,this.R*Math.log((1+x)/(1-x))/2)},unproject:function(i){var o=180/Math.PI;return new K((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*o,i.x*o/this.R)},bounds:function(){var i=At*Math.PI;return new st([-i,-i],[i,i])}()};function q(i,o,u,p){if(b(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=o,this._c=u,this._d=p}q.prototype={transform:function(i,o){return this._transform(i.clone(),o)},_transform:function(i,o){return o=o||1,i.x=o*(this._a*i.x+this._b),i.y=o*(this._c*i.y+this._d),i},untransform:function(i,o){return o=o||1,new z((i.x/o-this._b)/this._a,(i.y/o-this._d)/this._c)}};function at(i,o,u,p){return new q(i,o,u,p)}var ht=r({},St,{code:"EPSG:3857",projection:It,transformation:function(){var i=.5/(Math.PI*It.R);return at(i,.5,-i,.5)}()}),gt=r({},ht,{code:"EPSG:900913"});function dt(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function pt(i,o){var u="",p,x,P,H,J,nt;for(p=0,P=i.length;p<P;p++){for(J=i[p],x=0,H=J.length;x<H;x++)nt=J[x],u+=(x?"L":"M")+nt.x+" "+nt.y;u+=o?Ht.svg?"z":"x":""}return u||"M0 0"}var N=document.documentElement.style,T="ActiveXObject"in window,$=T&&!document.addEventListener,rt="msLaunchUri"in navigator&&!("documentMode"in document),lt=qe("webkit"),vt=qe("android"),kt=qe("android 2")||qe("android 3"),xt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),zt=vt&&qe("Google")&&xt<537&&!("AudioNode"in window),Wt=!!window.opera,Et=!rt&&qe("chrome"),Ct=qe("gecko")&&!lt&&!Wt&&!T,qt=!Et&&qe("safari"),Ot=qe("phantom"),Ut="OTransition"in N,le=navigator.platform.indexOf("Win")===0,ce=T&&"transition"in N,fe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!kt,de="MozPerspective"in N,ge=!window.L_DISABLE_3D&&(ce||fe||de)&&!Ut&&!Ot,Ft=typeof orientation<"u"||qe("mobile"),S=Ft&&lt,tt=Ft&&fe,mt=!window.PointerEvent&&window.MSPointerEvent,Tt=!!(window.PointerEvent||mt),Dt="ontouchstart"in window||!!window.TouchEvent,he=!window.L_NO_TOUCH&&(Dt||Tt),ae=Ft&&Wt,be=Ft&&Ct,Fe=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,ye=function(){var i=!1;try{var o=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",g,o),window.removeEventListener("testPassiveEventSupport",g,o)}catch{}return i}(),Ne=function(){return!!document.createElement("canvas").getContext}(),Pe=!!(document.createElementNS&&dt("svg").createSVGRect),hn=!!Pe&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),vn=!Pe&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var o=i.firstChild;return o.style.behavior="url(#default#VML)",o&&typeof o.adj=="object"}catch{return!1}}(),ni=navigator.platform.indexOf("Mac")===0,Ui=navigator.platform.indexOf("Linux")===0;function qe(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Ht={ie:T,ielt9:$,edge:rt,webkit:lt,android:vt,android23:kt,androidStock:zt,opera:Wt,chrome:Et,gecko:Ct,safari:qt,phantom:Ot,opera12:Ut,win:le,ie3d:ce,webkit3d:fe,gecko3d:de,any3d:ge,mobile:Ft,mobileWebkit:S,mobileWebkit3d:tt,msPointer:mt,pointer:Tt,touch:he,touchNative:Dt,mobileOpera:ae,mobileGecko:be,retina:Fe,passiveEvents:ye,canvas:Ne,svg:Pe,vml:vn,inlineSvg:hn,mac:ni,linux:Ui},ns=Ht.msPointer?"MSPointerDown":"pointerdown",Rr=Ht.msPointer?"MSPointerMove":"pointermove",Ir=Ht.msPointer?"MSPointerUp":"pointerup",Lo=Ht.msPointer?"MSPointerCancel":"pointercancel",Dr={touchstart:ns,touchmove:Rr,touchend:Ir,touchcancel:Lo},Po={touchstart:ee,touchmove:Xt,touchend:Xt,touchcancel:Xt},O={},j=!1;function it(i,o,u){return o==="touchstart"&&Zt(),Po[o]?(u=Po[o].bind(this,u),i.addEventListener(Dr[o],u,!1),u):(console.warn("wrong event specified:",o),g)}function ot(i,o,u){if(!Dr[o]){console.warn("wrong event specified:",o);return}i.removeEventListener(Dr[o],u,!1)}function et(i){O[i.pointerId]=i}function Pt(i){O[i.pointerId]&&(O[i.pointerId]=i)}function Vt(i){delete O[i.pointerId]}function Zt(){j||(document.addEventListener(ns,et,!0),document.addEventListener(Rr,Pt,!0),document.addEventListener(Ir,Vt,!0),document.addEventListener(Lo,Vt,!0),j=!0)}function Xt(i,o){if(o.pointerType!==(o.MSPOINTER_TYPE_MOUSE||"mouse")){o.touches=[];for(var u in O)o.touches.push(O[u]);o.changedTouches=[o],i(o)}}function ee(i,o){o.MSPOINTER_TYPE_TOUCH&&o.pointerType===o.MSPOINTER_TYPE_TOUCH&&en(o),Xt(i,o)}function Qt(i){var o={},u,p;for(p in i)u=i[p],o[p]=u&&u.bind?u.bind(i):u;return i=o,o.type="dblclick",o.detail=2,o.isTrusted=!1,o._simulated=!0,o}var ne=200;function Re(i,o){i.addEventListener("dblclick",o);var u=0,p;function x(P){if(P.detail!==1){p=P.detail;return}if(!(P.pointerType==="mouse"||P.sourceCapabilities&&!P.sourceCapabilities.firesTouchEvents)){var H=cu(P);if(!(H.some(function(nt){return nt instanceof HTMLLabelElement&&nt.attributes.for})&&!H.some(function(nt){return nt instanceof HTMLInputElement||nt instanceof HTMLSelectElement}))){var J=Date.now();J-u<=ne?(p++,p===2&&o(Qt(P))):p=1,u=J}}}return i.addEventListener("click",x),{dblclick:o,simDblclick:x}}function dn(i,o){i.removeEventListener("dblclick",o.dblclick),i.removeEventListener("click",o.simDblclick)}var Oe=Ro(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),fn=Ro(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),we=fn==="webkitTransition"||fn==="OTransition"?fn+"End":"transitionend";function ie(i){return typeof i=="string"?document.getElementById(i):i}function yi(i,o){var u=i.style[o]||i.currentStyle&&i.currentStyle[o];if((!u||u==="auto")&&document.defaultView){var p=document.defaultView.getComputedStyle(i,null);u=p?p[o]:null}return u==="auto"?null:u}function Gt(i,o,u){var p=document.createElement(i);return p.className=o||"",u&&u.appendChild(p),p}function _e(i){var o=i.parentNode;o&&o.removeChild(i)}function is(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Nn(i){var o=i.parentNode;o&&o.lastChild!==i&&o.appendChild(i)}function ii(i){var o=i.parentNode;o&&o.firstChild!==i&&o.insertBefore(i,o.firstChild)}function Be(i,o){if(i.classList!==void 0)return i.classList.contains(o);var u=ki(i);return u.length>0&&new RegExp("(^|\\s)"+o+"(\\s|$)").test(u)}function $t(i,o){if(i.classList!==void 0)for(var u=M(o),p=0,x=u.length;p<x;p++)i.classList.add(u[p]);else if(!Be(i,o)){var P=ki(i);on(i,(P?P+" ":"")+o)}}function Ee(i,o){i.classList!==void 0?i.classList.remove(o):on(i,_((" "+ki(i)+" ").replace(" "+o+" "," ")))}function on(i,o){i.className.baseVal===void 0?i.className=o:i.className.baseVal=o}function ki(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function yn(i,o){"opacity"in i.style?i.style.opacity=o:"filter"in i.style&&Co(i,o)}function Co(i,o){var u=!1,p="DXImageTransform.Microsoft.Alpha";try{u=i.filters.item(p)}catch{if(o===1)return}o=Math.round(o*100),u?(u.Enabled=o!==100,u.Opacity=o):i.style.filter+=" progid:"+p+"(opacity="+o+")"}function Ro(i){for(var o=document.documentElement.style,u=0;u<i.length;u++)if(i[u]in o)return i[u];return!1}function ss(i,o,u){var p=o||new z(0,0);i.style[Oe]=(Ht.ie3d?"translate("+p.x+"px,"+p.y+"px)":"translate3d("+p.x+"px,"+p.y+"px,0)")+(u?" scale("+u+")":"")}function ze(i,o){i._leaflet_pos=o,Ht.any3d?ss(i,o):(i.style.left=o.x+"px",i.style.top=o.y+"px")}function rs(i){return i._leaflet_pos||new z(0,0)}var Nr,Or,cl;if("onselectstart"in document)Nr=function(){se(window,"selectstart",en)},Or=function(){Se(window,"selectstart",en)};else{var Ur=Ro(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Nr=function(){if(Ur){var i=document.documentElement.style;cl=i[Ur],i[Ur]="none"}},Or=function(){Ur&&(document.documentElement.style[Ur]=cl,cl=void 0)}}function ul(){se(window,"dragstart",en)}function hl(){Se(window,"dragstart",en)}var Io,dl;function fl(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(Do(),Io=i,dl=i.style.outlineStyle,i.style.outlineStyle="none",se(window,"keydown",Do))}function Do(){Io&&(Io.style.outlineStyle=dl,Io=void 0,dl=void 0,Se(window,"keydown",Do))}function au(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function pl(i){var o=i.getBoundingClientRect();return{x:o.width/i.offsetWidth||1,y:o.height/i.offsetHeight||1,boundingClientRect:o}}var Mp={__proto__:null,TRANSFORM:Oe,TRANSITION:fn,TRANSITION_END:we,get:ie,getStyle:yi,create:Gt,remove:_e,empty:is,toFront:Nn,toBack:ii,hasClass:Be,addClass:$t,removeClass:Ee,setClass:on,getClass:ki,setOpacity:yn,testProp:Ro,setTransform:ss,setPosition:ze,getPosition:rs,get disableTextSelection(){return Nr},get enableTextSelection(){return Or},disableImageDrag:ul,enableImageDrag:hl,preventOutline:fl,restoreOutline:Do,getSizedParentNode:au,getScale:pl};function se(i,o,u,p){if(o&&typeof o=="object")for(var x in o)gl(i,x,o[x],u);else{o=M(o);for(var P=0,H=o.length;P<H;P++)gl(i,o[P],u,p)}return this}var si="_leaflet_events";function Se(i,o,u,p){if(arguments.length===1)lu(i),delete i[si];else if(o&&typeof o=="object")for(var x in o)_l(i,x,o[x],u);else if(o=M(o),arguments.length===2)lu(i,function(J){return A(o,J)!==-1});else for(var P=0,H=o.length;P<H;P++)_l(i,o[P],u,p);return this}function lu(i,o){for(var u in i[si]){var p=u.split(/\d/)[0];(!o||o(p))&&_l(i,p,null,null,u)}}var ml={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function gl(i,o,u,p){var x=o+h(u)+(p?"_"+h(p):"");if(i[si]&&i[si][x])return this;var P=function(J){return u.call(p||i,J||window.event)},H=P;!Ht.touchNative&&Ht.pointer&&o.indexOf("touch")===0?P=it(i,o,P):Ht.touch&&o==="dblclick"?P=Re(i,P):"addEventListener"in i?o==="touchstart"||o==="touchmove"||o==="wheel"||o==="mousewheel"?i.addEventListener(ml[o]||o,P,Ht.passiveEvents?{passive:!1}:!1):o==="mouseenter"||o==="mouseleave"?(P=function(J){J=J||window.event,yl(i,J)&&H(J)},i.addEventListener(ml[o],P,!1)):i.addEventListener(o,H,!1):i.attachEvent("on"+o,P),i[si]=i[si]||{},i[si][x]=P}function _l(i,o,u,p,x){x=x||o+h(u)+(p?"_"+h(p):"");var P=i[si]&&i[si][x];if(!P)return this;!Ht.touchNative&&Ht.pointer&&o.indexOf("touch")===0?ot(i,o,P):Ht.touch&&o==="dblclick"?dn(i,P):"removeEventListener"in i?i.removeEventListener(ml[o]||o,P,!1):i.detachEvent("on"+o,P),i[si][x]=null}function os(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function vl(i){return gl(i,"wheel",os),this}function kr(i){return se(i,"mousedown touchstart dblclick contextmenu",os),i._leaflet_disable_click=!0,this}function en(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function as(i){return en(i),os(i),this}function cu(i){if(i.composedPath)return i.composedPath();for(var o=[],u=i.target;u;)o.push(u),u=u.parentNode;return o}function uu(i,o){if(!o)return new z(i.clientX,i.clientY);var u=pl(o),p=u.boundingClientRect;return new z((i.clientX-p.left)/u.x-o.clientLeft,(i.clientY-p.top)/u.y-o.clientTop)}var bp=Ht.linux&&Ht.chrome?window.devicePixelRatio:Ht.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function hu(i){return Ht.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/bp:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function yl(i,o){var u=o.relatedTarget;if(!u)return!0;try{for(;u&&u!==i;)u=u.parentNode}catch{return!1}return u!==i}var wp={__proto__:null,on:se,off:Se,stopPropagation:os,disableScrollPropagation:vl,disableClickPropagation:kr,preventDefault:en,stop:as,getPropagationPath:cu,getMousePosition:uu,getWheelDelta:hu,isExternalTarget:yl,addListener:se,removeListener:Se},du=ft.extend({run:function(i,o,u,p){this.stop(),this._el=i,this._inProgress=!0,this._duration=u||.25,this._easeOutPower=1/Math.max(p||.5,.2),this._startPos=rs(i),this._offset=o.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=B(this._animate,this),this._step()},_step:function(i){var o=+new Date-this._startTime,u=this._duration*1e3;o<u?this._runFrame(this._easeOut(o/u),i):(this._runFrame(1),this._complete())},_runFrame:function(i,o){var u=this._startPos.add(this._offset.multiplyBy(i));o&&u._round(),ze(this._el,u),this.fire("step")},_complete:function(){X(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),me=ft.extend({options:{crs:ht,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,o){o=w(this,o),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),o.maxBounds&&this.setMaxBounds(o.maxBounds),o.zoom!==void 0&&(this._zoom=this._limitZoom(o.zoom)),o.center&&o.zoom!==void 0&&this.setView(ut(o.center),o.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=fn&&Ht.any3d&&!Ht.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),se(this._proxy,we,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,o,u){if(o=o===void 0?this._zoom:this._limitZoom(o),i=this._limitCenter(ut(i),o,this.options.maxBounds),u=u||{},this._stop(),this._loaded&&!u.reset&&u!==!0){u.animate!==void 0&&(u.zoom=r({animate:u.animate},u.zoom),u.pan=r({animate:u.animate,duration:u.duration},u.pan));var p=this._zoom!==o?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,o,u.zoom):this._tryAnimatedPan(i,u.pan);if(p)return clearTimeout(this._sizeTimer),this}return this._resetView(i,o,u.pan&&u.pan.noMoveStart),this},setZoom:function(i,o){return this._loaded?this.setView(this.getCenter(),i,{zoom:o}):(this._zoom=i,this)},zoomIn:function(i,o){return i=i||(Ht.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,o)},zoomOut:function(i,o){return i=i||(Ht.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,o)},setZoomAround:function(i,o,u){var p=this.getZoomScale(o),x=this.getSize().divideBy(2),P=i instanceof z?i:this.latLngToContainerPoint(i),H=P.subtract(x).multiplyBy(1-1/p),J=this.containerPointToLatLng(x.add(H));return this.setView(J,o,{zoom:u})},_getBoundsCenterZoom:function(i,o){o=o||{},i=i.getBounds?i.getBounds():Z(i);var u=G(o.paddingTopLeft||o.padding||[0,0]),p=G(o.paddingBottomRight||o.padding||[0,0]),x=this.getBoundsZoom(i,!1,u.add(p));if(x=typeof o.maxZoom=="number"?Math.min(o.maxZoom,x):x,x===1/0)return{center:i.getCenter(),zoom:x};var P=p.subtract(u).divideBy(2),H=this.project(i.getSouthWest(),x),J=this.project(i.getNorthEast(),x),nt=this.unproject(H.add(J).divideBy(2).add(P),x);return{center:nt,zoom:x}},fitBounds:function(i,o){if(i=Z(i),!i.isValid())throw new Error("Bounds are not valid.");var u=this._getBoundsCenterZoom(i,o);return this.setView(u.center,u.zoom,o)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,o){return this.setView(i,this._zoom,{pan:o})},panBy:function(i,o){if(i=G(i).round(),o=o||{},!i.x&&!i.y)return this.fire("moveend");if(o.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new du,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),o.noMoveStart||this.fire("movestart"),o.animate!==!1){$t(this._mapPane,"leaflet-pan-anim");var u=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,u,o.duration||.25,o.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,o,u){if(u=u||{},u.animate===!1||!Ht.any3d)return this.setView(i,o,u);this._stop();var p=this.project(this.getCenter()),x=this.project(i),P=this.getSize(),H=this._zoom;i=ut(i),o=o===void 0?H:o;var J=Math.max(P.x,P.y),nt=J*this.getZoomScale(H,o),Mt=x.distanceTo(p)||1,Rt=1.42,Yt=Rt*Rt;function ue(He){var Zo=He?-1:1,hm=He?nt:J,dm=nt*nt-J*J+Zo*Yt*Yt*Mt*Mt,fm=2*hm*Yt*Mt,Cl=dm/fm,Xu=Math.sqrt(Cl*Cl+1)-Cl,pm=Xu<1e-9?-18:Math.log(Xu);return pm}function pn(He){return(Math.exp(He)-Math.exp(-He))/2}function $e(He){return(Math.exp(He)+Math.exp(-He))/2}function Un(He){return pn(He)/$e(He)}var xn=ue(0);function Ns(He){return J*($e(xn)/$e(xn+Rt*He))}function am(He){return J*($e(xn)*Un(xn+Rt*He)-pn(xn))/Yt}function lm(He){return 1-Math.pow(1-He,1.5)}var cm=Date.now(),Wu=(ue(1)-xn)/Rt,um=u.duration?1e3*u.duration:1e3*Wu*.8;function Zu(){var He=(Date.now()-cm)/um,Zo=lm(He)*Wu;He<=1?(this._flyToFrame=B(Zu,this),this._move(this.unproject(p.add(x.subtract(p).multiplyBy(am(Zo)/Mt)),H),this.getScaleZoom(J/Ns(Zo),H),{flyTo:!0})):this._move(i,o)._moveEnd(!0)}return this._moveStart(!0,u.noMoveStart),Zu.call(this),this},flyToBounds:function(i,o){var u=this._getBoundsCenterZoom(i,o);return this.flyTo(u.center,u.zoom,o)},setMaxBounds:function(i){return i=Z(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var o=this.options.minZoom;return this.options.minZoom=i,this._loaded&&o!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var o=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&o!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,o){this._enforcingBounds=!0;var u=this.getCenter(),p=this._limitCenter(u,this._zoom,Z(i));return u.equals(p)||this.panTo(p,o),this._enforcingBounds=!1,this},panInside:function(i,o){o=o||{};var u=G(o.paddingTopLeft||o.padding||[0,0]),p=G(o.paddingBottomRight||o.padding||[0,0]),x=this.project(this.getCenter()),P=this.project(i),H=this.getPixelBounds(),J=yt([H.min.add(u),H.max.subtract(p)]),nt=J.getSize();if(!J.contains(P)){this._enforcingBounds=!0;var Mt=P.subtract(J.getCenter()),Rt=J.extend(P).getSize().subtract(nt);x.x+=Mt.x<0?-Rt.x:Rt.x,x.y+=Mt.y<0?-Rt.y:Rt.y,this.panTo(this.unproject(x),o),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=r({animate:!1,pan:!0},i===!0?{animate:!0}:i);var o=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var u=this.getSize(),p=o.divideBy(2).round(),x=u.divideBy(2).round(),P=p.subtract(x);return!P.x&&!P.y?this:(i.animate&&i.pan?this.panBy(P):(i.pan&&this._rawPanBy(P),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:o,newSize:u}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=r({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var o=l(this._handleGeolocationResponse,this),u=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(o,u,i):navigator.geolocation.getCurrentPosition(o,u,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var o=i.code,u=i.message||(o===1?"permission denied":o===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:o,message:"Geolocation error: "+u+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var o=i.coords.latitude,u=i.coords.longitude,p=new K(o,u),x=p.toBounds(i.coords.accuracy*2),P=this._locateOptions;if(P.setView){var H=this.getBoundsZoom(x);this.setView(p,P.maxZoom?Math.min(H,P.maxZoom):H)}var J={latlng:p,bounds:x,timestamp:i.timestamp};for(var nt in i.coords)typeof i.coords[nt]=="number"&&(J[nt]=i.coords[nt]);this.fire("locationfound",J)}},addHandler:function(i,o){if(!o)return this;var u=this[i]=new o(this);return this._handlers.push(u),this.options[i]&&u.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),_e(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(X(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)_e(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,o){var u="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),p=Gt("div",u,o||this._mapPane);return i&&(this._panes[i]=p),p},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),o=this.unproject(i.getBottomLeft()),u=this.unproject(i.getTopRight());return new bt(o,u)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,o,u){i=Z(i),u=G(u||[0,0]);var p=this.getZoom()||0,x=this.getMinZoom(),P=this.getMaxZoom(),H=i.getNorthWest(),J=i.getSouthEast(),nt=this.getSize().subtract(u),Mt=yt(this.project(J,p),this.project(H,p)).getSize(),Rt=Ht.any3d?this.options.zoomSnap:1,Yt=nt.x/Mt.x,ue=nt.y/Mt.y,pn=o?Math.max(Yt,ue):Math.min(Yt,ue);return p=this.getScaleZoom(pn,p),Rt&&(p=Math.round(p/(Rt/100))*(Rt/100),p=o?Math.ceil(p/Rt)*Rt:Math.floor(p/Rt)*Rt),Math.max(x,Math.min(P,p))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new z(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,o){var u=this._getTopLeftPoint(i,o);return new st(u,u.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,o){var u=this.options.crs;return o=o===void 0?this._zoom:o,u.scale(i)/u.scale(o)},getScaleZoom:function(i,o){var u=this.options.crs;o=o===void 0?this._zoom:o;var p=u.zoom(i*u.scale(o));return isNaN(p)?1/0:p},project:function(i,o){return o=o===void 0?this._zoom:o,this.options.crs.latLngToPoint(ut(i),o)},unproject:function(i,o){return o=o===void 0?this._zoom:o,this.options.crs.pointToLatLng(G(i),o)},layerPointToLatLng:function(i){var o=G(i).add(this.getPixelOrigin());return this.unproject(o)},latLngToLayerPoint:function(i){var o=this.project(ut(i))._round();return o._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(ut(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(Z(i))},distance:function(i,o){return this.options.crs.distance(ut(i),ut(o))},containerPointToLayerPoint:function(i){return G(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return G(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var o=this.containerPointToLayerPoint(G(i));return this.layerPointToLatLng(o)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(ut(i)))},mouseEventToContainerPoint:function(i){return uu(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var o=this._container=ie(i);if(o){if(o._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");se(o,"scroll",this._onScroll,this),this._containerId=h(o)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Ht.any3d,$t(i,"leaflet-container"+(Ht.touch?" leaflet-touch":"")+(Ht.retina?" leaflet-retina":"")+(Ht.ielt9?" leaflet-oldie":"")+(Ht.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var o=yi(i,"position");o!=="absolute"&&o!=="relative"&&o!=="fixed"&&o!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),ze(this._mapPane,new z(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||($t(i.markerPane,"leaflet-zoom-hide"),$t(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,o,u){ze(this._mapPane,new z(0,0));var p=!this._loaded;this._loaded=!0,o=this._limitZoom(o),this.fire("viewprereset");var x=this._zoom!==o;this._moveStart(x,u)._move(i,o)._moveEnd(x),this.fire("viewreset"),p&&this.fire("load")},_moveStart:function(i,o){return i&&this.fire("zoomstart"),o||this.fire("movestart"),this},_move:function(i,o,u,p){o===void 0&&(o=this._zoom);var x=this._zoom!==o;return this._zoom=o,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),p?u&&u.pinch&&this.fire("zoom",u):((x||u&&u.pinch)&&this.fire("zoom",u),this.fire("move",u)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return X(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){ze(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[h(this._container)]=this;var o=i?Se:se;o(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&o(window,"resize",this._onResize,this),Ht.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){X(this._resizeRequest),this._resizeRequest=B(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,o){for(var u=[],p,x=o==="mouseout"||o==="mouseover",P=i.target||i.srcElement,H=!1;P;){if(p=this._targets[h(P)],p&&(o==="click"||o==="preclick")&&this._draggableMoved(p)){H=!0;break}if(p&&p.listens(o,!0)&&(x&&!yl(P,i)||(u.push(p),x))||P===this._container)break;P=P.parentNode}return!u.length&&!H&&!x&&this.listens(o,!0)&&(u=[this]),u},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var o=i.target||i.srcElement;if(!(!this._loaded||o._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(o))){var u=i.type;u==="mousedown"&&fl(o),this._fireDOMEvent(i,u)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,o,u){if(i.type==="click"){var p=r({},i);p.type="preclick",this._fireDOMEvent(p,p.type,u)}var x=this._findEventTargets(i,o);if(u){for(var P=[],H=0;H<u.length;H++)u[H].listens(o,!0)&&P.push(u[H]);x=P.concat(x)}if(x.length){o==="contextmenu"&&en(i);var J=x[0],nt={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var Mt=J.getLatLng&&(!J._radius||J._radius<=10);nt.containerPoint=Mt?this.latLngToContainerPoint(J.getLatLng()):this.mouseEventToContainerPoint(i),nt.layerPoint=this.containerPointToLayerPoint(nt.containerPoint),nt.latlng=Mt?J.getLatLng():this.layerPointToLatLng(nt.layerPoint)}for(H=0;H<x.length;H++)if(x[H].fire(o,nt,!0),nt.originalEvent._stopped||x[H].options.bubblingMouseEvents===!1&&A(this._mouseEvents,o)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,o=this._handlers.length;i<o;i++)this._handlers[i].disable()},whenReady:function(i,o){return this._loaded?i.call(o||this,{target:this}):this.on("load",i,o),this},_getMapPanePos:function(){return rs(this._mapPane)||new z(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,o){var u=i&&o!==void 0?this._getNewPixelOrigin(i,o):this.getPixelOrigin();return u.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,o){var u=this.getSize()._divideBy(2);return this.project(i,o)._subtract(u)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,o,u){var p=this._getNewPixelOrigin(u,o);return this.project(i,o)._subtract(p)},_latLngBoundsToNewLayerBounds:function(i,o,u){var p=this._getNewPixelOrigin(u,o);return yt([this.project(i.getSouthWest(),o)._subtract(p),this.project(i.getNorthWest(),o)._subtract(p),this.project(i.getSouthEast(),o)._subtract(p),this.project(i.getNorthEast(),o)._subtract(p)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,o,u){if(!u)return i;var p=this.project(i,o),x=this.getSize().divideBy(2),P=new st(p.subtract(x),p.add(x)),H=this._getBoundsOffset(P,u,o);return Math.abs(H.x)<=1&&Math.abs(H.y)<=1?i:this.unproject(p.add(H),o)},_limitOffset:function(i,o){if(!o)return i;var u=this.getPixelBounds(),p=new st(u.min.add(i),u.max.add(i));return i.add(this._getBoundsOffset(p,o))},_getBoundsOffset:function(i,o,u){var p=yt(this.project(o.getNorthEast(),u),this.project(o.getSouthWest(),u)),x=p.min.subtract(i.min),P=p.max.subtract(i.max),H=this._rebound(x.x,-P.x),J=this._rebound(x.y,-P.y);return new z(H,J)},_rebound:function(i,o){return i+o>0?Math.round(i-o)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(o))},_limitZoom:function(i){var o=this.getMinZoom(),u=this.getMaxZoom(),p=Ht.any3d?this.options.zoomSnap:1;return p&&(i=Math.round(i/p)*p),Math.max(o,Math.min(u,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Ee(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,o){var u=this._getCenterOffset(i)._trunc();return(o&&o.animate)!==!0&&!this.getSize().contains(u)?!1:(this.panBy(u,o),!0)},_createAnimProxy:function(){var i=this._proxy=Gt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(o){var u=Oe,p=this._proxy.style[u];ss(this._proxy,this.project(o.center,o.zoom),this.getZoomScale(o.zoom,1)),p===this._proxy.style[u]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){_e(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),o=this.getZoom();ss(this._proxy,this.project(i,o),this.getZoomScale(o,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,o,u){if(this._animatingZoom)return!0;if(u=u||{},!this._zoomAnimated||u.animate===!1||this._nothingToAnimate()||Math.abs(o-this._zoom)>this.options.zoomAnimationThreshold)return!1;var p=this.getZoomScale(o),x=this._getCenterOffset(i)._divideBy(1-1/p);return u.animate!==!0&&!this.getSize().contains(x)?!1:(B(function(){this._moveStart(!0,u.noMoveStart||!1)._animateZoom(i,o,!0)},this),!0)},_animateZoom:function(i,o,u,p){this._mapPane&&(u&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=o,$t(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:o,noUpdate:p}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Ee(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Sp(i,o){return new me(i,o)}var Wn=W.extend({options:{position:"topright"},initialize:function(i){w(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var o=this._map;return o&&o.removeControl(this),this.options.position=i,o&&o.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var o=this._container=this.onAdd(i),u=this.getPosition(),p=i._controlCorners[u];return $t(o,"leaflet-control"),u.indexOf("bottom")!==-1?p.insertBefore(o,p.firstChild):p.appendChild(o),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(_e(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),Fr=function(i){return new Wn(i)};me.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},o="leaflet-",u=this._controlContainer=Gt("div",o+"control-container",this._container);function p(x,P){var H=o+x+" "+o+P;i[x+P]=Gt("div",H,u)}p("top","left"),p("top","right"),p("bottom","left"),p("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)_e(this._controlCorners[i]);_e(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var fu=Wn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,o,u,p){return u<p?-1:p<u?1:0}},initialize:function(i,o,u){w(this,u),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var p in i)this._addLayer(i[p],p);for(p in o)this._addLayer(o[p],p,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var o=0;o<this._layers.length;o++)this._layers[o].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return Wn.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,o){return this._addLayer(i,o),this._map?this._update():this},addOverlay:function(i,o){return this._addLayer(i,o,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var o=this._getLayer(h(i));return o&&this._layers.splice(this._layers.indexOf(o),1),this._map?this._update():this},expand:function(){$t(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?($t(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):Ee(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Ee(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",o=this._container=Gt("div",i),u=this.options.collapsed;o.setAttribute("aria-haspopup",!0),kr(o),vl(o);var p=this._section=Gt("section",i+"-list");u&&(this._map.on("click",this.collapse,this),se(o,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var x=this._layersLink=Gt("a",i+"-toggle",o);x.href="#",x.title="Layers",x.setAttribute("role","button"),se(x,{keydown:function(P){P.keyCode===13&&this._expandSafely()},click:function(P){en(P),this._expandSafely()}},this),u||this.expand(),this._baseLayersList=Gt("div",i+"-base",p),this._separator=Gt("div",i+"-separator",p),this._overlaysList=Gt("div",i+"-overlays",p),o.appendChild(p)},_getLayer:function(i){for(var o=0;o<this._layers.length;o++)if(this._layers[o]&&h(this._layers[o].layer)===i)return this._layers[o]},_addLayer:function(i,o,u){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:o,overlay:u}),this.options.sortLayers&&this._layers.sort(l(function(p,x){return this.options.sortFunction(p.layer,x.layer,p.name,x.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;is(this._baseLayersList),is(this._overlaysList),this._layerControlInputs=[];var i,o,u,p,x=0;for(u=0;u<this._layers.length;u++)p=this._layers[u],this._addItem(p),o=o||p.overlay,i=i||!p.overlay,x+=p.overlay?0:1;return this.options.hideSingleBase&&(i=i&&x>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=o&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var o=this._getLayer(h(i.target)),u=o.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;u&&this._map.fire(u,o)},_createRadioElement:function(i,o){var u='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(o?' checked="checked"':"")+"/>",p=document.createElement("div");return p.innerHTML=u,p.firstChild},_addItem:function(i){var o=document.createElement("label"),u=this._map.hasLayer(i.layer),p;i.overlay?(p=document.createElement("input"),p.type="checkbox",p.className="leaflet-control-layers-selector",p.defaultChecked=u):p=this._createRadioElement("leaflet-base-layers_"+h(this),u),this._layerControlInputs.push(p),p.layerId=h(i.layer),se(p,"click",this._onInputClick,this);var x=document.createElement("span");x.innerHTML=" "+i.name;var P=document.createElement("span");o.appendChild(P),P.appendChild(p),P.appendChild(x);var H=i.overlay?this._overlaysList:this._baseLayersList;return H.appendChild(o),this._checkDisabledLayers(),o},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,o,u,p=[],x=[];this._handlingClick=!0;for(var P=i.length-1;P>=0;P--)o=i[P],u=this._getLayer(o.layerId).layer,o.checked?p.push(u):o.checked||x.push(u);for(P=0;P<x.length;P++)this._map.hasLayer(x[P])&&this._map.removeLayer(x[P]);for(P=0;P<p.length;P++)this._map.hasLayer(p[P])||this._map.addLayer(p[P]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,o,u,p=this._map.getZoom(),x=i.length-1;x>=0;x--)o=i[x],u=this._getLayer(o.layerId).layer,o.disabled=u.options.minZoom!==void 0&&p<u.options.minZoom||u.options.maxZoom!==void 0&&p>u.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,se(i,"click",en),this.expand();var o=this;setTimeout(function(){Se(i,"click",en),o._preventClick=!1})}}),Ep=function(i,o,u){return new fu(i,o,u)},xl=Wn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var o="leaflet-control-zoom",u=Gt("div",o+" leaflet-bar"),p=this.options;return this._zoomInButton=this._createButton(p.zoomInText,p.zoomInTitle,o+"-in",u,this._zoomIn),this._zoomOutButton=this._createButton(p.zoomOutText,p.zoomOutTitle,o+"-out",u,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),u},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,o,u,p,x){var P=Gt("a",u,p);return P.innerHTML=i,P.href="#",P.title=o,P.setAttribute("role","button"),P.setAttribute("aria-label",o),kr(P),se(P,"click",as),se(P,"click",x,this),se(P,"click",this._refocusOnMap,this),P},_updateDisabled:function(){var i=this._map,o="leaflet-disabled";Ee(this._zoomInButton,o),Ee(this._zoomOutButton,o),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&($t(this._zoomOutButton,o),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&($t(this._zoomInButton,o),this._zoomInButton.setAttribute("aria-disabled","true"))}});me.mergeOptions({zoomControl:!0}),me.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new xl,this.addControl(this.zoomControl))});var Tp=function(i){return new xl(i)},pu=Wn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var o="leaflet-control-scale",u=Gt("div",o),p=this.options;return this._addScales(p,o+"-line",u),i.on(p.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),u},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,o,u){i.metric&&(this._mScale=Gt("div",o,u)),i.imperial&&(this._iScale=Gt("div",o,u))},_update:function(){var i=this._map,o=i.getSize().y/2,u=i.distance(i.containerPointToLatLng([0,o]),i.containerPointToLatLng([this.options.maxWidth,o]));this._updateScales(u)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var o=this._getRoundNum(i),u=o<1e3?o+" m":o/1e3+" km";this._updateScale(this._mScale,u,o/i)},_updateImperial:function(i){var o=i*3.2808399,u,p,x;o>5280?(u=o/5280,p=this._getRoundNum(u),this._updateScale(this._iScale,p+" mi",p/u)):(x=this._getRoundNum(o),this._updateScale(this._iScale,x+" ft",x/o))},_updateScale:function(i,o,u){i.style.width=Math.round(this.options.maxWidth*u)+"px",i.innerHTML=o},_getRoundNum:function(i){var o=Math.pow(10,(Math.floor(i)+"").length-1),u=i/o;return u=u>=10?10:u>=5?5:u>=3?3:u>=2?2:1,o*u}}),Ap=function(i){return new pu(i)},Lp='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Ml=Wn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Ht.inlineSvg?Lp+" ":"")+"Leaflet</a>"},initialize:function(i){w(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Gt("div","leaflet-control-attribution"),kr(this._container);for(var o in i._layers)i._layers[o].getAttribution&&this.addAttribution(i._layers[o].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var o in this._attributions)this._attributions[o]&&i.push(o);var u=[];this.options.prefix&&u.push(this.options.prefix),i.length&&u.push(i.join(", ")),this._container.innerHTML=u.join(' <span aria-hidden="true">|</span> ')}}});me.mergeOptions({attributionControl:!0}),me.addInitHook(function(){this.options.attributionControl&&new Ml().addTo(this)});var Pp=function(i){return new Ml(i)};Wn.Layers=fu,Wn.Zoom=xl,Wn.Scale=pu,Wn.Attribution=Ml,Fr.layers=Ep,Fr.zoom=Tp,Fr.scale=Ap,Fr.attribution=Pp;var ri=W.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});ri.addTo=function(i,o){return i.addHandler(o,this),this};var Cp={Events:Y},mu=Ht.touch?"touchstart mousedown":"mousedown",Fi=ft.extend({options:{clickTolerance:3},initialize:function(i,o,u,p){w(this,p),this._element=i,this._dragStartTarget=o||i,this._preventOutline=u},enable:function(){this._enabled||(se(this._dragStartTarget,mu,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Fi._dragging===this&&this.finishDrag(!0),Se(this._dragStartTarget,mu,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!Be(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){Fi._dragging===this&&this.finishDrag();return}if(!(Fi._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(Fi._dragging=this,this._preventOutline&&fl(this._element),ul(),Nr(),!this._moving)){this.fire("down");var o=i.touches?i.touches[0]:i,u=au(this._element);this._startPoint=new z(o.clientX,o.clientY),this._startPos=rs(this._element),this._parentScale=pl(u);var p=i.type==="mousedown";se(document,p?"mousemove":"touchmove",this._onMove,this),se(document,p?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var o=i.touches&&i.touches.length===1?i.touches[0]:i,u=new z(o.clientX,o.clientY)._subtract(this._startPoint);!u.x&&!u.y||Math.abs(u.x)+Math.abs(u.y)<this.options.clickTolerance||(u.x/=this._parentScale.x,u.y/=this._parentScale.y,en(i),this._moved||(this.fire("dragstart"),this._moved=!0,$t(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),$t(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(u),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),ze(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){Ee(document.body,"leaflet-dragging"),this._lastTarget&&(Ee(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Se(document,"mousemove touchmove",this._onMove,this),Se(document,"mouseup touchend touchcancel",this._onUp,this),hl(),Or();var o=this._moved&&this._moving;this._moving=!1,Fi._dragging=!1,o&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function gu(i,o,u){var p,x=[1,4,2,8],P,H,J,nt,Mt,Rt,Yt,ue;for(P=0,Rt=i.length;P<Rt;P++)i[P]._code=ls(i[P],o);for(J=0;J<4;J++){for(Yt=x[J],p=[],P=0,Rt=i.length,H=Rt-1;P<Rt;H=P++)nt=i[P],Mt=i[H],nt._code&Yt?Mt._code&Yt||(ue=No(Mt,nt,Yt,o,u),ue._code=ls(ue,o),p.push(ue)):(Mt._code&Yt&&(ue=No(Mt,nt,Yt,o,u),ue._code=ls(ue,o),p.push(ue)),p.push(nt));i=p}return i}function _u(i,o){var u,p,x,P,H,J,nt,Mt,Rt;if(!i||i.length===0)throw new Error("latlngs not passed");On(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Yt=ut([0,0]),ue=Z(i),pn=ue.getNorthWest().distanceTo(ue.getSouthWest())*ue.getNorthEast().distanceTo(ue.getNorthWest());pn<1700&&(Yt=bl(i));var $e=i.length,Un=[];for(u=0;u<$e;u++){var xn=ut(i[u]);Un.push(o.project(ut([xn.lat-Yt.lat,xn.lng-Yt.lng])))}for(J=nt=Mt=0,u=0,p=$e-1;u<$e;p=u++)x=Un[u],P=Un[p],H=x.y*P.x-P.y*x.x,nt+=(x.x+P.x)*H,Mt+=(x.y+P.y)*H,J+=H*3;J===0?Rt=Un[0]:Rt=[nt/J,Mt/J];var Ns=o.unproject(G(Rt));return ut([Ns.lat+Yt.lat,Ns.lng+Yt.lng])}function bl(i){for(var o=0,u=0,p=0,x=0;x<i.length;x++){var P=ut(i[x]);o+=P.lat,u+=P.lng,p++}return ut([o/p,u/p])}var Rp={__proto__:null,clipPolygon:gu,polygonCenter:_u,centroid:bl};function vu(i,o){if(!o||!i.length)return i.slice();var u=o*o;return i=Np(i,u),i=Dp(i,u),i}function yu(i,o,u){return Math.sqrt(Br(i,o,u,!0))}function Ip(i,o,u){return Br(i,o,u)}function Dp(i,o){var u=i.length,p=typeof Uint8Array<"u"?Uint8Array:Array,x=new p(u);x[0]=x[u-1]=1,wl(i,x,o,0,u-1);var P,H=[];for(P=0;P<u;P++)x[P]&&H.push(i[P]);return H}function wl(i,o,u,p,x){var P=0,H,J,nt;for(J=p+1;J<=x-1;J++)nt=Br(i[J],i[p],i[x],!0),nt>P&&(H=J,P=nt);P>u&&(o[H]=1,wl(i,o,u,p,H),wl(i,o,u,H,x))}function Np(i,o){for(var u=[i[0]],p=1,x=0,P=i.length;p<P;p++)Op(i[p],i[x])>o&&(u.push(i[p]),x=p);return x<P-1&&u.push(i[P-1]),u}var xu;function Mu(i,o,u,p,x){var P=p?xu:ls(i,u),H=ls(o,u),J,nt,Mt;for(xu=H;;){if(!(P|H))return[i,o];if(P&H)return!1;J=P||H,nt=No(i,o,J,u,x),Mt=ls(nt,u),J===P?(i=nt,P=Mt):(o=nt,H=Mt)}}function No(i,o,u,p,x){var P=o.x-i.x,H=o.y-i.y,J=p.min,nt=p.max,Mt,Rt;return u&8?(Mt=i.x+P*(nt.y-i.y)/H,Rt=nt.y):u&4?(Mt=i.x+P*(J.y-i.y)/H,Rt=J.y):u&2?(Mt=nt.x,Rt=i.y+H*(nt.x-i.x)/P):u&1&&(Mt=J.x,Rt=i.y+H*(J.x-i.x)/P),new z(Mt,Rt,x)}function ls(i,o){var u=0;return i.x<o.min.x?u|=1:i.x>o.max.x&&(u|=2),i.y<o.min.y?u|=4:i.y>o.max.y&&(u|=8),u}function Op(i,o){var u=o.x-i.x,p=o.y-i.y;return u*u+p*p}function Br(i,o,u,p){var x=o.x,P=o.y,H=u.x-x,J=u.y-P,nt=H*H+J*J,Mt;return nt>0&&(Mt=((i.x-x)*H+(i.y-P)*J)/nt,Mt>1?(x=u.x,P=u.y):Mt>0&&(x+=H*Mt,P+=J*Mt)),H=i.x-x,J=i.y-P,p?H*H+J*J:new z(x,P)}function On(i){return!b(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function bu(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),On(i)}function wu(i,o){var u,p,x,P,H,J,nt,Mt;if(!i||i.length===0)throw new Error("latlngs not passed");On(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Rt=ut([0,0]),Yt=Z(i),ue=Yt.getNorthWest().distanceTo(Yt.getSouthWest())*Yt.getNorthEast().distanceTo(Yt.getNorthWest());ue<1700&&(Rt=bl(i));var pn=i.length,$e=[];for(u=0;u<pn;u++){var Un=ut(i[u]);$e.push(o.project(ut([Un.lat-Rt.lat,Un.lng-Rt.lng])))}for(u=0,p=0;u<pn-1;u++)p+=$e[u].distanceTo($e[u+1])/2;if(p===0)Mt=$e[0];else for(u=0,P=0;u<pn-1;u++)if(H=$e[u],J=$e[u+1],x=H.distanceTo(J),P+=x,P>p){nt=(P-p)/x,Mt=[J.x-nt*(J.x-H.x),J.y-nt*(J.y-H.y)];break}var xn=o.unproject(G(Mt));return ut([xn.lat+Rt.lat,xn.lng+Rt.lng])}var Up={__proto__:null,simplify:vu,pointToSegmentDistance:yu,closestPointOnSegment:Ip,clipSegment:Mu,_getEdgeIntersection:No,_getBitCode:ls,_sqClosestPointOnSegment:Br,isFlat:On,_flat:bu,polylineCenter:wu},Sl={project:function(i){return new z(i.lng,i.lat)},unproject:function(i){return new K(i.y,i.x)},bounds:new st([-180,-90],[180,90])},El={R:6378137,R_MINOR:6356752314245179e-9,bounds:new st([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var o=Math.PI/180,u=this.R,p=i.lat*o,x=this.R_MINOR/u,P=Math.sqrt(1-x*x),H=P*Math.sin(p),J=Math.tan(Math.PI/4-p/2)/Math.pow((1-H)/(1+H),P/2);return p=-u*Math.log(Math.max(J,1e-10)),new z(i.lng*o*u,p)},unproject:function(i){for(var o=180/Math.PI,u=this.R,p=this.R_MINOR/u,x=Math.sqrt(1-p*p),P=Math.exp(-i.y/u),H=Math.PI/2-2*Math.atan(P),J=0,nt=.1,Mt;J<15&&Math.abs(nt)>1e-7;J++)Mt=x*Math.sin(H),Mt=Math.pow((1-Mt)/(1+Mt),x/2),nt=Math.PI/2-2*Math.atan(P*Mt)-H,H+=nt;return new K(H*o,i.x*o/u)}},kp={__proto__:null,LonLat:Sl,Mercator:El,SphericalMercator:It},Fp=r({},St,{code:"EPSG:3395",projection:El,transformation:function(){var i=.5/(Math.PI*El.R);return at(i,.5,-i,.5)}()}),Su=r({},St,{code:"EPSG:4326",projection:Sl,transformation:at(1/180,1,-1/180,.5)}),Bp=r({},_t,{projection:Sl,transformation:at(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,o){var u=o.lng-i.lng,p=o.lat-i.lat;return Math.sqrt(u*u+p*p)},infinite:!0});_t.Earth=St,_t.EPSG3395=Fp,_t.EPSG3857=ht,_t.EPSG900913=gt,_t.EPSG4326=Su,_t.Simple=Bp;var Zn=ft.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[h(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[h(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var o=i.target;if(o.hasLayer(this)){if(this._map=o,this._zoomAnimated=o._zoomAnimated,this.getEvents){var u=this.getEvents();o.on(u,this),this.once("remove",function(){o.off(u,this)},this)}this.onAdd(o),this.fire("add"),o.fire("layeradd",{layer:this})}}});me.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var o=h(i);return this._layers[o]?this:(this._layers[o]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var o=h(i);return this._layers[o]?(this._loaded&&i.onRemove(this),delete this._layers[o],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return h(i)in this._layers},eachLayer:function(i,o){for(var u in this._layers)i.call(o,this._layers[u]);return this},_addLayers:function(i){i=i?b(i)?i:[i]:[];for(var o=0,u=i.length;o<u;o++)this.addLayer(i[o])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[h(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var o=h(i);this._zoomBoundLayers[o]&&(delete this._zoomBoundLayers[o],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,o=-1/0,u=this._getZoomSpan();for(var p in this._zoomBoundLayers){var x=this._zoomBoundLayers[p].options;i=x.minZoom===void 0?i:Math.min(i,x.minZoom),o=x.maxZoom===void 0?o:Math.max(o,x.maxZoom)}this._layersMaxZoom=o===-1/0?void 0:o,this._layersMinZoom=i===1/0?void 0:i,u!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Ps=Zn.extend({initialize:function(i,o){w(this,o),this._layers={};var u,p;if(i)for(u=0,p=i.length;u<p;u++)this.addLayer(i[u])},addLayer:function(i){var o=this.getLayerId(i);return this._layers[o]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var o=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[o]&&this._map.removeLayer(this._layers[o]),delete this._layers[o],this},hasLayer:function(i){var o=typeof i=="number"?i:this.getLayerId(i);return o in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var o=Array.prototype.slice.call(arguments,1),u,p;for(u in this._layers)p=this._layers[u],p[i]&&p[i].apply(p,o);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,o){for(var u in this._layers)i.call(o,this._layers[u]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return h(i)}}),zp=function(i,o){return new Ps(i,o)},xi=Ps.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),Ps.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),Ps.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new bt;for(var o in this._layers){var u=this._layers[o];i.extend(u.getBounds?u.getBounds():u.getLatLng())}return i}}),Hp=function(i,o){return new xi(i,o)},Cs=W.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){w(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,o){var u=this._getIconUrl(i);if(!u){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var p=this._createImg(u,o&&o.tagName==="IMG"?o:null);return this._setIconStyles(p,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(p.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),p},_setIconStyles:function(i,o){var u=this.options,p=u[o+"Size"];typeof p=="number"&&(p=[p,p]);var x=G(p),P=G(o==="shadow"&&u.shadowAnchor||u.iconAnchor||x&&x.divideBy(2,!0));i.className="leaflet-marker-"+o+" "+(u.className||""),P&&(i.style.marginLeft=-P.x+"px",i.style.marginTop=-P.y+"px"),x&&(i.style.width=x.x+"px",i.style.height=x.y+"px")},_createImg:function(i,o){return o=o||document.createElement("img"),o.src=i,o},_getIconUrl:function(i){return Ht.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function Vp(i){return new Cs(i)}var zr=Cs.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof zr.imagePath!="string"&&(zr.imagePath=this._detectIconPath()),(this.options.imagePath||zr.imagePath)+Cs.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var o=function(u,p,x){var P=p.exec(u);return P&&P[x]};return i=o(i,/^url\((['"])?(.+)\1\)$/,2),i&&o(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Gt("div","leaflet-default-icon-path",document.body),o=yi(i,"background-image")||yi(i,"backgroundImage");if(document.body.removeChild(i),o=this._stripUrl(o),o)return o;var u=document.querySelector('link[href$="leaflet.css"]');return u?u.href.substring(0,u.href.length-11-1):""}}),Eu=ri.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new Fi(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),$t(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Ee(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var o=this._marker,u=o._map,p=this._marker.options.autoPanSpeed,x=this._marker.options.autoPanPadding,P=rs(o._icon),H=u.getPixelBounds(),J=u.getPixelOrigin(),nt=yt(H.min._subtract(J).add(x),H.max._subtract(J).subtract(x));if(!nt.contains(P)){var Mt=G((Math.max(nt.max.x,P.x)-nt.max.x)/(H.max.x-nt.max.x)-(Math.min(nt.min.x,P.x)-nt.min.x)/(H.min.x-nt.min.x),(Math.max(nt.max.y,P.y)-nt.max.y)/(H.max.y-nt.max.y)-(Math.min(nt.min.y,P.y)-nt.min.y)/(H.min.y-nt.min.y)).multiplyBy(p);u.panBy(Mt,{animate:!1}),this._draggable._newPos._add(Mt),this._draggable._startPos._add(Mt),ze(o._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=B(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(X(this._panRequest),this._panRequest=B(this._adjustPan.bind(this,i)))},_onDrag:function(i){var o=this._marker,u=o._shadow,p=rs(o._icon),x=o._map.layerPointToLatLng(p);u&&ze(u,p),o._latlng=x,i.latlng=x,i.oldLatLng=this._oldLatLng,o.fire("move",i).fire("drag",i)},_onDragEnd:function(i){X(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),Oo=Zn.extend({options:{icon:new zr,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,o){w(this,o),this._latlng=ut(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var o=this._latlng;return this._latlng=ut(i),this.update(),this.fire("move",{oldLatLng:o,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,o="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),u=i.icon.createIcon(this._icon),p=!1;u!==this._icon&&(this._icon&&this._removeIcon(),p=!0,i.title&&(u.title=i.title),u.tagName==="IMG"&&(u.alt=i.alt||"")),$t(u,o),i.keyboard&&(u.tabIndex="0",u.setAttribute("role","button")),this._icon=u,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&se(u,"focus",this._panOnFocus,this);var x=i.icon.createShadow(this._shadow),P=!1;x!==this._shadow&&(this._removeShadow(),P=!0),x&&($t(x,o),x.alt=""),this._shadow=x,i.opacity<1&&this._updateOpacity(),p&&this.getPane().appendChild(this._icon),this._initInteraction(),x&&P&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Se(this._icon,"focus",this._panOnFocus,this),_e(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&_e(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&ze(this._icon,i),this._shadow&&ze(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(o)},_initInteraction:function(){if(this.options.interactive&&($t(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Eu)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Eu(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&yn(this._icon,i),this._shadow&&yn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var o=this.options.icon.options,u=o.iconSize?G(o.iconSize):G(0,0),p=o.iconAnchor?G(o.iconAnchor):G(0,0);i.panInside(this._latlng,{paddingTopLeft:p,paddingBottomRight:u.subtract(p)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Gp(i,o){return new Oo(i,o)}var Bi=Zn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return w(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Uo=Bi.extend({options:{fill:!0,radius:10},initialize:function(i,o){w(this,o),this._latlng=ut(i),this._radius=this.options.radius},setLatLng:function(i){var o=this._latlng;return this._latlng=ut(i),this.redraw(),this.fire("move",{oldLatLng:o,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var o=i&&i.radius||this._radius;return Bi.prototype.setStyle.call(this,i),this.setRadius(o),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,o=this._radiusY||i,u=this._clickTolerance(),p=[i+u,o+u];this._pxBounds=new st(this._point.subtract(p),this._point.add(p))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Wp(i,o){return new Uo(i,o)}var Tl=Uo.extend({initialize:function(i,o,u){if(typeof o=="number"&&(o=r({},u,{radius:o})),w(this,o),this._latlng=ut(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new bt(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:Bi.prototype.setStyle,_project:function(){var i=this._latlng.lng,o=this._latlng.lat,u=this._map,p=u.options.crs;if(p.distance===St.distance){var x=Math.PI/180,P=this._mRadius/St.R/x,H=u.project([o+P,i]),J=u.project([o-P,i]),nt=H.add(J).divideBy(2),Mt=u.unproject(nt).lat,Rt=Math.acos((Math.cos(P*x)-Math.sin(o*x)*Math.sin(Mt*x))/(Math.cos(o*x)*Math.cos(Mt*x)))/x;(isNaN(Rt)||Rt===0)&&(Rt=P/Math.cos(Math.PI/180*o)),this._point=nt.subtract(u.getPixelOrigin()),this._radius=isNaN(Rt)?0:nt.x-u.project([Mt,i-Rt]).x,this._radiusY=nt.y-H.y}else{var Yt=p.unproject(p.project(this._latlng).subtract([this._mRadius,0]));this._point=u.latLngToLayerPoint(this._latlng),this._radius=this._point.x-u.latLngToLayerPoint(Yt).x}this._updateBounds()}});function Zp(i,o,u){return new Tl(i,o,u)}var Mi=Bi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,o){w(this,o),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var o=1/0,u=null,p=Br,x,P,H=0,J=this._parts.length;H<J;H++)for(var nt=this._parts[H],Mt=1,Rt=nt.length;Mt<Rt;Mt++){x=nt[Mt-1],P=nt[Mt];var Yt=p(i,x,P,!0);Yt<o&&(o=Yt,u=p(i,x,P))}return u&&(u.distance=Math.sqrt(o)),u},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return wu(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,o){return o=o||this._defaultShape(),i=ut(i),o.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new bt,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return On(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var o=[],u=On(i),p=0,x=i.length;p<x;p++)u?(o[p]=ut(i[p]),this._bounds.extend(o[p])):o[p]=this._convertLatLngs(i[p]);return o},_project:function(){var i=new st;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),o=new z(i,i);this._rawPxBounds&&(this._pxBounds=new st([this._rawPxBounds.min.subtract(o),this._rawPxBounds.max.add(o)]))},_projectLatlngs:function(i,o,u){var p=i[0]instanceof K,x=i.length,P,H;if(p){for(H=[],P=0;P<x;P++)H[P]=this._map.latLngToLayerPoint(i[P]),u.extend(H[P]);o.push(H)}else for(P=0;P<x;P++)this._projectLatlngs(i[P],o,u)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var o=this._parts,u,p,x,P,H,J,nt;for(u=0,x=0,P=this._rings.length;u<P;u++)for(nt=this._rings[u],p=0,H=nt.length;p<H-1;p++)J=Mu(nt[p],nt[p+1],i,p,!0),J&&(o[x]=o[x]||[],o[x].push(J[0]),(J[1]!==nt[p+1]||p===H-2)&&(o[x].push(J[1]),x++))}},_simplifyPoints:function(){for(var i=this._parts,o=this.options.smoothFactor,u=0,p=i.length;u<p;u++)i[u]=vu(i[u],o)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,o){var u,p,x,P,H,J,nt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(u=0,P=this._parts.length;u<P;u++)for(J=this._parts[u],p=0,H=J.length,x=H-1;p<H;x=p++)if(!(!o&&p===0)&&yu(i,J[x],J[p])<=nt)return!0;return!1}});function Xp(i,o){return new Mi(i,o)}Mi._flat=bu;var Rs=Mi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return _u(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var o=Mi.prototype._convertLatLngs.call(this,i),u=o.length;return u>=2&&o[0]instanceof K&&o[0].equals(o[u-1])&&o.pop(),o},_setLatLngs:function(i){Mi.prototype._setLatLngs.call(this,i),On(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return On(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,o=this.options.weight,u=new z(o,o);if(i=new st(i.min.subtract(u),i.max.add(u)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var p=0,x=this._rings.length,P;p<x;p++)P=gu(this._rings[p],i,!0),P.length&&this._parts.push(P)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var o=!1,u,p,x,P,H,J,nt,Mt;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(P=0,nt=this._parts.length;P<nt;P++)for(u=this._parts[P],H=0,Mt=u.length,J=Mt-1;H<Mt;J=H++)p=u[H],x=u[J],p.y>i.y!=x.y>i.y&&i.x<(x.x-p.x)*(i.y-p.y)/(x.y-p.y)+p.x&&(o=!o);return o||Mi.prototype._containsPoint.call(this,i,!0)}});function qp(i,o){return new Rs(i,o)}var bi=xi.extend({initialize:function(i,o){w(this,o),this._layers={},i&&this.addData(i)},addData:function(i){var o=b(i)?i:i.features,u,p,x;if(o){for(u=0,p=o.length;u<p;u++)x=o[u],(x.geometries||x.geometry||x.features||x.coordinates)&&this.addData(x);return this}var P=this.options;if(P.filter&&!P.filter(i))return this;var H=ko(i,P);return H?(H.feature=zo(i),H.defaultOptions=H.options,this.resetStyle(H),P.onEachFeature&&P.onEachFeature(i,H),this.addLayer(H)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=r({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(o){this._setLayerStyle(o,i)},this)},_setLayerStyle:function(i,o){i.setStyle&&(typeof o=="function"&&(o=o(i.feature)),i.setStyle(o))}});function ko(i,o){var u=i.type==="Feature"?i.geometry:i,p=u?u.coordinates:null,x=[],P=o&&o.pointToLayer,H=o&&o.coordsToLatLng||Al,J,nt,Mt,Rt;if(!p&&!u)return null;switch(u.type){case"Point":return J=H(p),Tu(P,i,J,o);case"MultiPoint":for(Mt=0,Rt=p.length;Mt<Rt;Mt++)J=H(p[Mt]),x.push(Tu(P,i,J,o));return new xi(x);case"LineString":case"MultiLineString":return nt=Fo(p,u.type==="LineString"?0:1,H),new Mi(nt,o);case"Polygon":case"MultiPolygon":return nt=Fo(p,u.type==="Polygon"?1:2,H),new Rs(nt,o);case"GeometryCollection":for(Mt=0,Rt=u.geometries.length;Mt<Rt;Mt++){var Yt=ko({geometry:u.geometries[Mt],type:"Feature",properties:i.properties},o);Yt&&x.push(Yt)}return new xi(x);case"FeatureCollection":for(Mt=0,Rt=u.features.length;Mt<Rt;Mt++){var ue=ko(u.features[Mt],o);ue&&x.push(ue)}return new xi(x);default:throw new Error("Invalid GeoJSON object.")}}function Tu(i,o,u,p){return i?i(o,u):new Oo(u,p&&p.markersInheritOptions&&p)}function Al(i){return new K(i[1],i[0],i[2])}function Fo(i,o,u){for(var p=[],x=0,P=i.length,H;x<P;x++)H=o?Fo(i[x],o-1,u):(u||Al)(i[x]),p.push(H);return p}function Ll(i,o){return i=ut(i),i.alt!==void 0?[m(i.lng,o),m(i.lat,o),m(i.alt,o)]:[m(i.lng,o),m(i.lat,o)]}function Bo(i,o,u,p){for(var x=[],P=0,H=i.length;P<H;P++)x.push(o?Bo(i[P],On(i[P])?0:o-1,u,p):Ll(i[P],p));return!o&&u&&x.length>0&&x.push(x[0].slice()),x}function Is(i,o){return i.feature?r({},i.feature,{geometry:o}):zo(o)}function zo(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var Pl={toGeoJSON:function(i){return Is(this,{type:"Point",coordinates:Ll(this.getLatLng(),i)})}};Oo.include(Pl),Tl.include(Pl),Uo.include(Pl),Mi.include({toGeoJSON:function(i){var o=!On(this._latlngs),u=Bo(this._latlngs,o?1:0,!1,i);return Is(this,{type:(o?"Multi":"")+"LineString",coordinates:u})}}),Rs.include({toGeoJSON:function(i){var o=!On(this._latlngs),u=o&&!On(this._latlngs[0]),p=Bo(this._latlngs,u?2:o?1:0,!0,i);return o||(p=[p]),Is(this,{type:(u?"Multi":"")+"Polygon",coordinates:p})}}),Ps.include({toMultiPoint:function(i){var o=[];return this.eachLayer(function(u){o.push(u.toGeoJSON(i).geometry.coordinates)}),Is(this,{type:"MultiPoint",coordinates:o})},toGeoJSON:function(i){var o=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(o==="MultiPoint")return this.toMultiPoint(i);var u=o==="GeometryCollection",p=[];return this.eachLayer(function(x){if(x.toGeoJSON){var P=x.toGeoJSON(i);if(u)p.push(P.geometry);else{var H=zo(P);H.type==="FeatureCollection"?p.push.apply(p,H.features):p.push(H)}}}),u?Is(this,{geometries:p,type:"GeometryCollection"}):{type:"FeatureCollection",features:p}}});function Au(i,o){return new bi(i,o)}var $p=Au,Ho=Zn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,o,u){this._url=i,this._bounds=Z(o),w(this,u)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&($t(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){_e(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&Nn(this._image),this},bringToBack:function(){return this._map&&ii(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=Z(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",o=this._image=i?this._url:Gt("img");if($t(o,"leaflet-image-layer"),this._zoomAnimated&&$t(o,"leaflet-zoom-animated"),this.options.className&&$t(o,this.options.className),o.onselectstart=g,o.onmousemove=g,o.onload=l(this.fire,this,"load"),o.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(o.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=o.src;return}o.src=this._url,o.alt=this.options.alt},_animateZoom:function(i){var o=this._map.getZoomScale(i.zoom),u=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;ss(this._image,u,o)},_reset:function(){var i=this._image,o=new st(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),u=o.getSize();ze(i,o.min),i.style.width=u.x+"px",i.style.height=u.y+"px"},_updateOpacity:function(){yn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),Yp=function(i,o,u){return new Ho(i,o,u)},Lu=Ho.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",o=this._image=i?this._url:Gt("video");if($t(o,"leaflet-image-layer"),this._zoomAnimated&&$t(o,"leaflet-zoom-animated"),this.options.className&&$t(o,this.options.className),o.onselectstart=g,o.onmousemove=g,o.onloadeddata=l(this.fire,this,"load"),i){for(var u=o.getElementsByTagName("source"),p=[],x=0;x<u.length;x++)p.push(u[x].src);this._url=u.length>0?p:[o.src];return}b(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(o.style,"objectFit")&&(o.style.objectFit="fill"),o.autoplay=!!this.options.autoplay,o.loop=!!this.options.loop,o.muted=!!this.options.muted,o.playsInline=!!this.options.playsInline;for(var P=0;P<this._url.length;P++){var H=Gt("source");H.src=this._url[P],o.appendChild(H)}}});function jp(i,o,u){return new Lu(i,o,u)}var Pu=Ho.extend({_initImage:function(){var i=this._image=this._url;$t(i,"leaflet-image-layer"),this._zoomAnimated&&$t(i,"leaflet-zoom-animated"),this.options.className&&$t(i,this.options.className),i.onselectstart=g,i.onmousemove=g}});function Kp(i,o,u){return new Pu(i,o,u)}var oi=Zn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,o){i&&(i instanceof K||b(i))?(this._latlng=ut(i),w(this,o)):(w(this,i),this._source=o),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&yn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&yn(this._container,1),this.bringToFront(),this.options.interactive&&($t(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(yn(this._container,0),this._removeTimeout=setTimeout(l(_e,void 0,this._container),200)):_e(this._container),this.options.interactive&&(Ee(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=ut(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Nn(this._container),this},bringToBack:function(){return this._map&&ii(this._container),this},_prepareOpen:function(i){var o=this._source;if(!o._map)return!1;if(o instanceof xi){o=null;var u=this._source._layers;for(var p in u)if(u[p]._map){o=u[p];break}if(!o)return!1;this._source=o}if(!i)if(o.getCenter)i=o.getCenter();else if(o.getLatLng)i=o.getLatLng();else if(o.getBounds)i=o.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,o=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof o=="string")i.innerHTML=o;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(o)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),o=G(this.options.offset),u=this._getAnchor();this._zoomAnimated?ze(this._container,i.add(u)):o=o.add(i).add(u);var p=this._containerBottom=-o.y,x=this._containerLeft=-Math.round(this._containerWidth/2)+o.x;this._container.style.bottom=p+"px",this._container.style.left=x+"px"}},_getAnchor:function(){return[0,0]}});me.include({_initOverlay:function(i,o,u,p){var x=o;return x instanceof i||(x=new i(p).setContent(o)),u&&x.setLatLng(u),x}}),Zn.include({_initOverlay:function(i,o,u,p){var x=u;return x instanceof i?(w(x,p),x._source=this):(x=o&&!p?o:new i(p,this),x.setContent(u)),x}});var Vo=oi.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,oi.prototype.openOn.call(this,i)},onAdd:function(i){oi.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Bi||this._source.on("preclick",os))},onRemove:function(i){oi.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Bi||this._source.off("preclick",os))},getEvents:function(){var i=oi.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",o=this._container=Gt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),u=this._wrapper=Gt("div",i+"-content-wrapper",o);if(this._contentNode=Gt("div",i+"-content",u),kr(o),vl(this._contentNode),se(o,"contextmenu",os),this._tipContainer=Gt("div",i+"-tip-container",o),this._tip=Gt("div",i+"-tip",this._tipContainer),this.options.closeButton){var p=this._closeButton=Gt("a",i+"-close-button",o);p.setAttribute("role","button"),p.setAttribute("aria-label","Close popup"),p.href="#close",p.innerHTML='<span aria-hidden="true">&#215;</span>',se(p,"click",function(x){en(x),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,o=i.style;o.width="",o.whiteSpace="nowrap";var u=i.offsetWidth;u=Math.min(u,this.options.maxWidth),u=Math.max(u,this.options.minWidth),o.width=u+1+"px",o.whiteSpace="",o.height="";var p=i.offsetHeight,x=this.options.maxHeight,P="leaflet-popup-scrolled";x&&p>x?(o.height=x+"px",$t(i,P)):Ee(i,P),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),u=this._getAnchor();ze(this._container,o.add(u))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,o=parseInt(yi(this._container,"marginBottom"),10)||0,u=this._container.offsetHeight+o,p=this._containerWidth,x=new z(this._containerLeft,-u-this._containerBottom);x._add(rs(this._container));var P=i.layerPointToContainerPoint(x),H=G(this.options.autoPanPadding),J=G(this.options.autoPanPaddingTopLeft||H),nt=G(this.options.autoPanPaddingBottomRight||H),Mt=i.getSize(),Rt=0,Yt=0;P.x+p+nt.x>Mt.x&&(Rt=P.x+p-Mt.x+nt.x),P.x-Rt-J.x<0&&(Rt=P.x-J.x),P.y+u+nt.y>Mt.y&&(Yt=P.y+u-Mt.y+nt.y),P.y-Yt-J.y<0&&(Yt=P.y-J.y),(Rt||Yt)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([Rt,Yt]))}},_getAnchor:function(){return G(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Jp=function(i,o){return new Vo(i,o)};me.mergeOptions({closePopupOnClick:!0}),me.include({openPopup:function(i,o,u){return this._initOverlay(Vo,i,o,u).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),Zn.include({bindPopup:function(i,o){return this._popup=this._initOverlay(Vo,this._popup,i,o),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof xi||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){as(i);var o=i.layer||i.target;if(this._popup._source===o&&!(o instanceof Bi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=o,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var Go=oi.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){oi.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){oi.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=oi.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",o=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Gt("div",o),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var o,u,p=this._map,x=this._container,P=p.latLngToContainerPoint(p.getCenter()),H=p.layerPointToContainerPoint(i),J=this.options.direction,nt=x.offsetWidth,Mt=x.offsetHeight,Rt=G(this.options.offset),Yt=this._getAnchor();J==="top"?(o=nt/2,u=Mt):J==="bottom"?(o=nt/2,u=0):J==="center"?(o=nt/2,u=Mt/2):J==="right"?(o=0,u=Mt/2):J==="left"?(o=nt,u=Mt/2):H.x<P.x?(J="right",o=0,u=Mt/2):(J="left",o=nt+(Rt.x+Yt.x)*2,u=Mt/2),i=i.subtract(G(o,u,!0)).add(Rt).add(Yt),Ee(x,"leaflet-tooltip-right"),Ee(x,"leaflet-tooltip-left"),Ee(x,"leaflet-tooltip-top"),Ee(x,"leaflet-tooltip-bottom"),$t(x,"leaflet-tooltip-"+J),ze(x,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&yn(this._container,i)},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(o)},_getAnchor:function(){return G(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Qp=function(i,o){return new Go(i,o)};me.include({openTooltip:function(i,o,u){return this._initOverlay(Go,i,o,u).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),Zn.include({bindTooltip:function(i,o){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Go,this._tooltip,i,o),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var o=i?"off":"on",u={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?u.add=this._openTooltip:(u.mouseover=this._openTooltip,u.mouseout=this.closeTooltip,u.click=this._openTooltip,this._map?this._addFocusListeners():u.add=this._addFocusListeners),this._tooltip.options.sticky&&(u.mousemove=this._moveTooltip),this[o](u),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof xi||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var o=typeof i.getElement=="function"&&i.getElement();o&&(se(o,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),se(o,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var o=typeof i.getElement=="function"&&i.getElement();o&&o.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var o=this;this._map.once("moveend",function(){o._openOnceFlag=!1,o._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var o=i.latlng,u,p;this._tooltip.options.sticky&&i.originalEvent&&(u=this._map.mouseEventToContainerPoint(i.originalEvent),p=this._map.containerPointToLayerPoint(u),o=this._map.layerPointToLatLng(p)),this._tooltip.setLatLng(o)}});var Cu=Cs.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var o=i&&i.tagName==="DIV"?i:document.createElement("div"),u=this.options;if(u.html instanceof Element?(is(o),o.appendChild(u.html)):o.innerHTML=u.html!==!1?u.html:"",u.bgPos){var p=G(u.bgPos);o.style.backgroundPosition=-p.x+"px "+-p.y+"px"}return this._setIconStyles(o,"icon"),o},createShadow:function(){return null}});function tm(i){return new Cu(i)}Cs.Default=zr;var Hr=Zn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Ht.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){w(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),_e(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Nn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ii(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof z?i:new z(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var o=this.getPane().children,u=-i(-1/0,1/0),p=0,x=o.length,P;p<x;p++)P=o[p].style.zIndex,o[p]!==this._container&&P&&(u=i(u,+P));isFinite(u)&&(this.options.zIndex=u+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Ht.ielt9){yn(this._container,this.options.opacity);var i=+new Date,o=!1,u=!1;for(var p in this._tiles){var x=this._tiles[p];if(!(!x.current||!x.loaded)){var P=Math.min(1,(i-x.loaded)/200);yn(x.el,P),P<1?o=!0:(x.active?u=!0:this._onOpaqueTile(x),x.active=!0)}}u&&!this._noPrune&&this._pruneTiles(),o&&(X(this._fadeFrame),this._fadeFrame=B(this._updateOpacity,this))}},_onOpaqueTile:g,_initContainer:function(){this._container||(this._container=Gt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,o=this.options.maxZoom;if(i!==void 0){for(var u in this._levels)u=Number(u),this._levels[u].el.children.length||u===i?(this._levels[u].el.style.zIndex=o-Math.abs(i-u),this._onUpdateLevel(u)):(_e(this._levels[u].el),this._removeTilesAtZoom(u),this._onRemoveLevel(u),delete this._levels[u]);var p=this._levels[i],x=this._map;return p||(p=this._levels[i]={},p.el=Gt("div","leaflet-tile-container leaflet-zoom-animated",this._container),p.el.style.zIndex=o,p.origin=x.project(x.unproject(x.getPixelOrigin()),i).round(),p.zoom=i,this._setZoomTransform(p,x.getCenter(),x.getZoom()),g(p.el.offsetWidth),this._onCreateLevel(p)),this._level=p,p}},_onUpdateLevel:g,_onRemoveLevel:g,_onCreateLevel:g,_pruneTiles:function(){if(this._map){var i,o,u=this._map.getZoom();if(u>this.options.maxZoom||u<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)o=this._tiles[i],o.retain=o.current;for(i in this._tiles)if(o=this._tiles[i],o.current&&!o.active){var p=o.coords;this._retainParent(p.x,p.y,p.z,p.z-5)||this._retainChildren(p.x,p.y,p.z,p.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var o in this._tiles)this._tiles[o].coords.z===i&&this._removeTile(o)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)_e(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,o,u,p){var x=Math.floor(i/2),P=Math.floor(o/2),H=u-1,J=new z(+x,+P);J.z=+H;var nt=this._tileCoordsToKey(J),Mt=this._tiles[nt];return Mt&&Mt.active?(Mt.retain=!0,!0):(Mt&&Mt.loaded&&(Mt.retain=!0),H>p?this._retainParent(x,P,H,p):!1)},_retainChildren:function(i,o,u,p){for(var x=2*i;x<2*i+2;x++)for(var P=2*o;P<2*o+2;P++){var H=new z(x,P);H.z=u+1;var J=this._tileCoordsToKey(H),nt=this._tiles[J];if(nt&&nt.active){nt.retain=!0;continue}else nt&&nt.loaded&&(nt.retain=!0);u+1<p&&this._retainChildren(x,P,u+1,p)}},_resetView:function(i){var o=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),o,o)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var o=this.options;return o.minNativeZoom!==void 0&&i<o.minNativeZoom?o.minNativeZoom:o.maxNativeZoom!==void 0&&o.maxNativeZoom<i?o.maxNativeZoom:i},_setView:function(i,o,u,p){var x=Math.round(o);this.options.maxZoom!==void 0&&x>this.options.maxZoom||this.options.minZoom!==void 0&&x<this.options.minZoom?x=void 0:x=this._clampZoom(x);var P=this.options.updateWhenZooming&&x!==this._tileZoom;(!p||P)&&(this._tileZoom=x,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),x!==void 0&&this._update(i),u||this._pruneTiles(),this._noPrune=!!u),this._setZoomTransforms(i,o)},_setZoomTransforms:function(i,o){for(var u in this._levels)this._setZoomTransform(this._levels[u],i,o)},_setZoomTransform:function(i,o,u){var p=this._map.getZoomScale(u,i.zoom),x=i.origin.multiplyBy(p).subtract(this._map._getNewPixelOrigin(o,u)).round();Ht.any3d?ss(i.el,x,p):ze(i.el,x)},_resetGrid:function(){var i=this._map,o=i.options.crs,u=this._tileSize=this.getTileSize(),p=this._tileZoom,x=this._map.getPixelWorldBounds(this._tileZoom);x&&(this._globalTileRange=this._pxBoundsToTileRange(x)),this._wrapX=o.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,o.wrapLng[0]],p).x/u.x),Math.ceil(i.project([0,o.wrapLng[1]],p).x/u.y)],this._wrapY=o.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([o.wrapLat[0],0],p).y/u.x),Math.ceil(i.project([o.wrapLat[1],0],p).y/u.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var o=this._map,u=o._animatingZoom?Math.max(o._animateToZoom,o.getZoom()):o.getZoom(),p=o.getZoomScale(u,this._tileZoom),x=o.project(i,this._tileZoom).floor(),P=o.getSize().divideBy(p*2);return new st(x.subtract(P),x.add(P))},_update:function(i){var o=this._map;if(o){var u=this._clampZoom(o.getZoom());if(i===void 0&&(i=o.getCenter()),this._tileZoom!==void 0){var p=this._getTiledPixelBounds(i),x=this._pxBoundsToTileRange(p),P=x.getCenter(),H=[],J=this.options.keepBuffer,nt=new st(x.getBottomLeft().subtract([J,-J]),x.getTopRight().add([J,-J]));if(!(isFinite(x.min.x)&&isFinite(x.min.y)&&isFinite(x.max.x)&&isFinite(x.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Mt in this._tiles){var Rt=this._tiles[Mt].coords;(Rt.z!==this._tileZoom||!nt.contains(new z(Rt.x,Rt.y)))&&(this._tiles[Mt].current=!1)}if(Math.abs(u-this._tileZoom)>1){this._setView(i,u);return}for(var Yt=x.min.y;Yt<=x.max.y;Yt++)for(var ue=x.min.x;ue<=x.max.x;ue++){var pn=new z(ue,Yt);if(pn.z=this._tileZoom,!!this._isValidTile(pn)){var $e=this._tiles[this._tileCoordsToKey(pn)];$e?$e.current=!0:H.push(pn)}}if(H.sort(function(xn,Ns){return xn.distanceTo(P)-Ns.distanceTo(P)}),H.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Un=document.createDocumentFragment();for(ue=0;ue<H.length;ue++)this._addTile(H[ue],Un);this._level.el.appendChild(Un)}}}},_isValidTile:function(i){var o=this._map.options.crs;if(!o.infinite){var u=this._globalTileRange;if(!o.wrapLng&&(i.x<u.min.x||i.x>u.max.x)||!o.wrapLat&&(i.y<u.min.y||i.y>u.max.y))return!1}if(!this.options.bounds)return!0;var p=this._tileCoordsToBounds(i);return Z(this.options.bounds).overlaps(p)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var o=this._map,u=this.getTileSize(),p=i.scaleBy(u),x=p.add(u),P=o.unproject(p,i.z),H=o.unproject(x,i.z);return[P,H]},_tileCoordsToBounds:function(i){var o=this._tileCoordsToNwSe(i),u=new bt(o[0],o[1]);return this.options.noWrap||(u=this._map.wrapLatLngBounds(u)),u},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var o=i.split(":"),u=new z(+o[0],+o[1]);return u.z=+o[2],u},_removeTile:function(i){var o=this._tiles[i];o&&(_e(o.el),delete this._tiles[i],this.fire("tileunload",{tile:o.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){$t(i,"leaflet-tile");var o=this.getTileSize();i.style.width=o.x+"px",i.style.height=o.y+"px",i.onselectstart=g,i.onmousemove=g,Ht.ielt9&&this.options.opacity<1&&yn(i,this.options.opacity)},_addTile:function(i,o){var u=this._getTilePos(i),p=this._tileCoordsToKey(i),x=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(x),this.createTile.length<2&&B(l(this._tileReady,this,i,null,x)),ze(x,u),this._tiles[p]={el:x,coords:i,current:!0},o.appendChild(x),this.fire("tileloadstart",{tile:x,coords:i})},_tileReady:function(i,o,u){o&&this.fire("tileerror",{error:o,tile:u,coords:i});var p=this._tileCoordsToKey(i);u=this._tiles[p],u&&(u.loaded=+new Date,this._map._fadeAnimated?(yn(u.el,0),X(this._fadeFrame),this._fadeFrame=B(this._updateOpacity,this)):(u.active=!0,this._pruneTiles()),o||($t(u.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:u.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Ht.ielt9||!this._map._fadeAnimated?B(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var o=new z(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return o.z=i.z,o},_pxBoundsToTileRange:function(i){var o=this.getTileSize();return new st(i.min.unscaleBy(o).floor(),i.max.unscaleBy(o).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function em(i){return new Hr(i)}var Ds=Hr.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,o){this._url=i,o=w(this,o),o.detectRetina&&Ht.retina&&o.maxZoom>0?(o.tileSize=Math.floor(o.tileSize/2),o.zoomReverse?(o.zoomOffset--,o.minZoom=Math.min(o.maxZoom,o.minZoom+1)):(o.zoomOffset++,o.maxZoom=Math.max(o.minZoom,o.maxZoom-1)),o.minZoom=Math.max(0,o.minZoom)):o.zoomReverse?o.minZoom=Math.min(o.maxZoom,o.minZoom):o.maxZoom=Math.max(o.minZoom,o.maxZoom),typeof o.subdomains=="string"&&(o.subdomains=o.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,o){return this._url===i&&o===void 0&&(o=!0),this._url=i,o||this.redraw(),this},createTile:function(i,o){var u=document.createElement("img");return se(u,"load",l(this._tileOnLoad,this,o,u)),se(u,"error",l(this._tileOnError,this,o,u)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(u.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(u.referrerPolicy=this.options.referrerPolicy),u.alt="",u.src=this.getTileUrl(i),u},getTileUrl:function(i){var o={r:Ht.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var u=this._globalTileRange.max.y-i.y;this.options.tms&&(o.y=u),o["-y"]=u}return D(this._url,r(o,this.options))},_tileOnLoad:function(i,o){Ht.ielt9?setTimeout(l(i,this,null,o),0):i(null,o)},_tileOnError:function(i,o,u){var p=this.options.errorTileUrl;p&&o.getAttribute("src")!==p&&(o.src=p),i(u,o)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,o=this.options.maxZoom,u=this.options.zoomReverse,p=this.options.zoomOffset;return u&&(i=o-i),i+p},_getSubdomain:function(i){var o=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[o]},_abortLoading:function(){var i,o;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(o=this._tiles[i].el,o.onload=g,o.onerror=g,!o.complete)){o.src=k;var u=this._tiles[i].coords;_e(o),delete this._tiles[i],this.fire("tileabort",{tile:o,coords:u})}},_removeTile:function(i){var o=this._tiles[i];if(o)return o.el.setAttribute("src",k),Hr.prototype._removeTile.call(this,i)},_tileReady:function(i,o,u){if(!(!this._map||u&&u.getAttribute("src")===k))return Hr.prototype._tileReady.call(this,i,o,u)}});function Ru(i,o){return new Ds(i,o)}var Iu=Ds.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,o){this._url=i;var u=r({},this.defaultWmsParams);for(var p in o)p in this.options||(u[p]=o[p]);o=w(this,o);var x=o.detectRetina&&Ht.retina?2:1,P=this.getTileSize();u.width=P.x*x,u.height=P.y*x,this.wmsParams=u},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var o=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[o]=this._crs.code,Ds.prototype.onAdd.call(this,i)},getTileUrl:function(i){var o=this._tileCoordsToNwSe(i),u=this._crs,p=yt(u.project(o[0]),u.project(o[1])),x=p.min,P=p.max,H=(this._wmsVersion>=1.3&&this._crs===Su?[x.y,x.x,P.y,P.x]:[x.x,x.y,P.x,P.y]).join(","),J=Ds.prototype.getTileUrl.call(this,i);return J+v(this.wmsParams,J,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+H},setParams:function(i,o){return r(this.wmsParams,i),o||this.redraw(),this}});function nm(i,o){return new Iu(i,o)}Ds.WMS=Iu,Ru.wms=nm;var wi=Zn.extend({options:{padding:.1},initialize:function(i){w(this,i),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),$t(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,o){var u=this._map.getZoomScale(o,this._zoom),p=this._map.getSize().multiplyBy(.5+this.options.padding),x=this._map.project(this._center,o),P=p.multiplyBy(-u).add(x).subtract(this._map._getNewPixelOrigin(i,o));Ht.any3d?ss(this._container,P,u):ze(this._container,P)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,o=this._map.getSize(),u=this._map.containerPointToLayerPoint(o.multiplyBy(-i)).round();this._bounds=new st(u,u.add(o.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Du=wi.extend({options:{tolerance:0},getEvents:function(){var i=wi.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){wi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");se(i,"mousemove",this._onMouseMove,this),se(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),se(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){X(this._redrawRequest),delete this._ctx,_e(this._container),Se(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var o in this._layers)i=this._layers[o],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){wi.prototype._update.call(this);var i=this._bounds,o=this._container,u=i.getSize(),p=Ht.retina?2:1;ze(o,i.min),o.width=p*u.x,o.height=p*u.y,o.style.width=u.x+"px",o.style.height=u.y+"px",Ht.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){wi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[h(i)]=i;var o=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=o),this._drawLast=o,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var o=i._order,u=o.next,p=o.prev;u?u.prev=p:this._drawLast=p,p?p.next=u:this._drawFirst=u,delete i._order,delete this._layers[h(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var o=i.options.dashArray.split(/[, ]+/),u=[],p,x;for(x=0;x<o.length;x++){if(p=Number(o[x]),isNaN(p))return;u.push(p)}i.options._dashArray=u}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||B(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var o=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new st,this._redrawBounds.extend(i._pxBounds.min.subtract([o,o])),this._redrawBounds.extend(i._pxBounds.max.add([o,o]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var o=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,o.x,o.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,o=this._redrawBounds;if(this._ctx.save(),o){var u=o.getSize();this._ctx.beginPath(),this._ctx.rect(o.min.x,o.min.y,u.x,u.y),this._ctx.clip()}this._drawing=!0;for(var p=this._drawFirst;p;p=p.next)i=p.layer,(!o||i._pxBounds&&i._pxBounds.intersects(o))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,o){if(this._drawing){var u,p,x,P,H=i._parts,J=H.length,nt=this._ctx;if(J){for(nt.beginPath(),u=0;u<J;u++){for(p=0,x=H[u].length;p<x;p++)P=H[u][p],nt[p?"lineTo":"moveTo"](P.x,P.y);o&&nt.closePath()}this._fillStroke(nt,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var o=i._point,u=this._ctx,p=Math.max(Math.round(i._radius),1),x=(Math.max(Math.round(i._radiusY),1)||p)/p;x!==1&&(u.save(),u.scale(1,x)),u.beginPath(),u.arc(o.x,o.y/x,p,0,Math.PI*2,!1),x!==1&&u.restore(),this._fillStroke(u,i)}},_fillStroke:function(i,o){var u=o.options;u.fill&&(i.globalAlpha=u.fillOpacity,i.fillStyle=u.fillColor||u.color,i.fill(u.fillRule||"evenodd")),u.stroke&&u.weight!==0&&(i.setLineDash&&i.setLineDash(o.options&&o.options._dashArray||[]),i.globalAlpha=u.opacity,i.lineWidth=u.weight,i.strokeStyle=u.color,i.lineCap=u.lineCap,i.lineJoin=u.lineJoin,i.stroke())},_onClick:function(i){for(var o=this._map.mouseEventToLayerPoint(i),u,p,x=this._drawFirst;x;x=x.next)u=x.layer,u.options.interactive&&u._containsPoint(o)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(u))&&(p=u);this._fireEvent(p?[p]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var o=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,o)}},_handleMouseOut:function(i){var o=this._hoveredLayer;o&&(Ee(this._container,"leaflet-interactive"),this._fireEvent([o],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,o){if(!this._mouseHoverThrottled){for(var u,p,x=this._drawFirst;x;x=x.next)u=x.layer,u.options.interactive&&u._containsPoint(o)&&(p=u);p!==this._hoveredLayer&&(this._handleMouseOut(i),p&&($t(this._container,"leaflet-interactive"),this._fireEvent([p],i,"mouseover"),this._hoveredLayer=p)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,o,u){this._map._fireDOMEvent(o,u||o.type,i)},_bringToFront:function(i){var o=i._order;if(o){var u=o.next,p=o.prev;if(u)u.prev=p;else return;p?p.next=u:u&&(this._drawFirst=u),o.prev=this._drawLast,this._drawLast.next=o,o.next=null,this._drawLast=o,this._requestRedraw(i)}},_bringToBack:function(i){var o=i._order;if(o){var u=o.next,p=o.prev;if(p)p.next=u;else return;u?u.prev=p:p&&(this._drawLast=p),o.prev=null,o.next=this._drawFirst,this._drawFirst.prev=o,this._drawFirst=o,this._requestRedraw(i)}}});function Nu(i){return Ht.canvas?new Du(i):null}var Vr=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),im={_initContainer:function(){this._container=Gt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(wi.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var o=i._container=Vr("shape");$t(o,"leaflet-vml-shape "+(this.options.className||"")),o.coordsize="1 1",i._path=Vr("path"),o.appendChild(i._path),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){var o=i._container;this._container.appendChild(o),i.options.interactive&&i.addInteractiveTarget(o)},_removePath:function(i){var o=i._container;_e(o),i.removeInteractiveTarget(o),delete this._layers[h(i)]},_updateStyle:function(i){var o=i._stroke,u=i._fill,p=i.options,x=i._container;x.stroked=!!p.stroke,x.filled=!!p.fill,p.stroke?(o||(o=i._stroke=Vr("stroke")),x.appendChild(o),o.weight=p.weight+"px",o.color=p.color,o.opacity=p.opacity,p.dashArray?o.dashStyle=b(p.dashArray)?p.dashArray.join(" "):p.dashArray.replace(/( *, *)/g," "):o.dashStyle="",o.endcap=p.lineCap.replace("butt","flat"),o.joinstyle=p.lineJoin):o&&(x.removeChild(o),i._stroke=null),p.fill?(u||(u=i._fill=Vr("fill")),x.appendChild(u),u.color=p.fillColor||p.color,u.opacity=p.fillOpacity):u&&(x.removeChild(u),i._fill=null)},_updateCircle:function(i){var o=i._point.round(),u=Math.round(i._radius),p=Math.round(i._radiusY||u);this._setPath(i,i._empty()?"M0 0":"AL "+o.x+","+o.y+" "+u+","+p+" 0,"+65535*360)},_setPath:function(i,o){i._path.v=o},_bringToFront:function(i){Nn(i._container)},_bringToBack:function(i){ii(i._container)}},Wo=Ht.vml?Vr:dt,Gr=wi.extend({_initContainer:function(){this._container=Wo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Wo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){_e(this._container),Se(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){wi.prototype._update.call(this);var i=this._bounds,o=i.getSize(),u=this._container;(!this._svgSize||!this._svgSize.equals(o))&&(this._svgSize=o,u.setAttribute("width",o.x),u.setAttribute("height",o.y)),ze(u,i.min),u.setAttribute("viewBox",[i.min.x,i.min.y,o.x,o.y].join(" ")),this.fire("update")}},_initPath:function(i){var o=i._path=Wo("path");i.options.className&&$t(o,i.options.className),i.options.interactive&&$t(o,"leaflet-interactive"),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){_e(i._path),i.removeInteractiveTarget(i._path),delete this._layers[h(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var o=i._path,u=i.options;o&&(u.stroke?(o.setAttribute("stroke",u.color),o.setAttribute("stroke-opacity",u.opacity),o.setAttribute("stroke-width",u.weight),o.setAttribute("stroke-linecap",u.lineCap),o.setAttribute("stroke-linejoin",u.lineJoin),u.dashArray?o.setAttribute("stroke-dasharray",u.dashArray):o.removeAttribute("stroke-dasharray"),u.dashOffset?o.setAttribute("stroke-dashoffset",u.dashOffset):o.removeAttribute("stroke-dashoffset")):o.setAttribute("stroke","none"),u.fill?(o.setAttribute("fill",u.fillColor||u.color),o.setAttribute("fill-opacity",u.fillOpacity),o.setAttribute("fill-rule",u.fillRule||"evenodd")):o.setAttribute("fill","none"))},_updatePoly:function(i,o){this._setPath(i,pt(i._parts,o))},_updateCircle:function(i){var o=i._point,u=Math.max(Math.round(i._radius),1),p=Math.max(Math.round(i._radiusY),1)||u,x="a"+u+","+p+" 0 1,0 ",P=i._empty()?"M0 0":"M"+(o.x-u)+","+o.y+x+u*2+",0 "+x+-u*2+",0 ";this._setPath(i,P)},_setPath:function(i,o){i._path.setAttribute("d",o)},_bringToFront:function(i){Nn(i._path)},_bringToBack:function(i){ii(i._path)}});Ht.vml&&Gr.include(im);function Ou(i){return Ht.svg||Ht.vml?new Gr(i):null}me.include({getRenderer:function(i){var o=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return o||(o=this._renderer=this._createRenderer()),this.hasLayer(o)||this.addLayer(o),o},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var o=this._paneRenderers[i];return o===void 0&&(o=this._createRenderer({pane:i}),this._paneRenderers[i]=o),o},_createRenderer:function(i){return this.options.preferCanvas&&Nu(i)||Ou(i)}});var Uu=Rs.extend({initialize:function(i,o){Rs.prototype.initialize.call(this,this._boundsToLatLngs(i),o)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=Z(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function sm(i,o){return new Uu(i,o)}Gr.create=Wo,Gr.pointsToPath=pt,bi.geometryToLayer=ko,bi.coordsToLatLng=Al,bi.coordsToLatLngs=Fo,bi.latLngToCoords=Ll,bi.latLngsToCoords=Bo,bi.getFeature=Is,bi.asFeature=zo,me.mergeOptions({boxZoom:!0});var ku=ri.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){se(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Se(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){_e(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Nr(),ul(),this._startPoint=this._map.mouseEventToContainerPoint(i),se(document,{contextmenu:as,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Gt("div","leaflet-zoom-box",this._container),$t(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var o=new st(this._point,this._startPoint),u=o.getSize();ze(this._box,o.min),this._box.style.width=u.x+"px",this._box.style.height=u.y+"px"},_finish:function(){this._moved&&(_e(this._box),Ee(this._container,"leaflet-crosshair")),Or(),hl(),Se(document,{contextmenu:as,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var o=new bt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(o).fire("boxzoomend",{boxZoomBounds:o})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});me.addInitHook("addHandler","boxZoom",ku),me.mergeOptions({doubleClickZoom:!0});var Fu=ri.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var o=this._map,u=o.getZoom(),p=o.options.zoomDelta,x=i.originalEvent.shiftKey?u-p:u+p;o.options.doubleClickZoom==="center"?o.setZoom(x):o.setZoomAround(i.containerPoint,x)}});me.addInitHook("addHandler","doubleClickZoom",Fu),me.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var Bu=ri.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new Fi(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}$t(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Ee(this._map._container,"leaflet-grab"),Ee(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var o=Z(this._map.options.maxBounds);this._offsetLimit=yt(this._map.latLngToContainerPoint(o.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(o.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var o=this._lastTime=+new Date,u=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(u),this._times.push(o),this._prunePositions(o)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),o=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=o.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,o){return i-(i-o)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),o=this._offsetLimit;i.x<o.min.x&&(i.x=this._viscousLimit(i.x,o.min.x)),i.y<o.min.y&&(i.y=this._viscousLimit(i.y,o.min.y)),i.x>o.max.x&&(i.x=this._viscousLimit(i.x,o.max.x)),i.y>o.max.y&&(i.y=this._viscousLimit(i.y,o.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,o=Math.round(i/2),u=this._initialWorldOffset,p=this._draggable._newPos.x,x=(p-o+u)%i+o-u,P=(p+o+u)%i-o-u,H=Math.abs(x+u)<Math.abs(P+u)?x:P;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=H},_onDragEnd:function(i){var o=this._map,u=o.options,p=!u.inertia||i.noInertia||this._times.length<2;if(o.fire("dragend",i),p)o.fire("moveend");else{this._prunePositions(+new Date);var x=this._lastPos.subtract(this._positions[0]),P=(this._lastTime-this._times[0])/1e3,H=u.easeLinearity,J=x.multiplyBy(H/P),nt=J.distanceTo([0,0]),Mt=Math.min(u.inertiaMaxSpeed,nt),Rt=J.multiplyBy(Mt/nt),Yt=Mt/(u.inertiaDeceleration*H),ue=Rt.multiplyBy(-Yt/2).round();!ue.x&&!ue.y?o.fire("moveend"):(ue=o._limitOffset(ue,o.options.maxBounds),B(function(){o.panBy(ue,{duration:Yt,easeLinearity:H,noMoveStart:!0,animate:!0})}))}}});me.addInitHook("addHandler","dragging",Bu),me.mergeOptions({keyboard:!0,keyboardPanDelta:80});var zu=ri.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),se(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Se(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,o=document.documentElement,u=i.scrollTop||o.scrollTop,p=i.scrollLeft||o.scrollLeft;this._map._container.focus(),window.scrollTo(p,u)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var o=this._panKeys={},u=this.keyCodes,p,x;for(p=0,x=u.left.length;p<x;p++)o[u.left[p]]=[-1*i,0];for(p=0,x=u.right.length;p<x;p++)o[u.right[p]]=[i,0];for(p=0,x=u.down.length;p<x;p++)o[u.down[p]]=[0,i];for(p=0,x=u.up.length;p<x;p++)o[u.up[p]]=[0,-1*i]},_setZoomDelta:function(i){var o=this._zoomKeys={},u=this.keyCodes,p,x;for(p=0,x=u.zoomIn.length;p<x;p++)o[u.zoomIn[p]]=i;for(p=0,x=u.zoomOut.length;p<x;p++)o[u.zoomOut[p]]=-i},_addHooks:function(){se(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Se(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var o=i.keyCode,u=this._map,p;if(o in this._panKeys){if(!u._panAnim||!u._panAnim._inProgress)if(p=this._panKeys[o],i.shiftKey&&(p=G(p).multiplyBy(3)),u.options.maxBounds&&(p=u._limitOffset(G(p),u.options.maxBounds)),u.options.worldCopyJump){var x=u.wrapLatLng(u.unproject(u.project(u.getCenter()).add(p)));u.panTo(x)}else u.panBy(p)}else if(o in this._zoomKeys)u.setZoom(u.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[o]);else if(o===27&&u._popup&&u._popup.options.closeOnEscapeKey)u.closePopup();else return;as(i)}}});me.addInitHook("addHandler","keyboard",zu),me.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Hu=ri.extend({addHooks:function(){se(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Se(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var o=hu(i),u=this._map.options.wheelDebounceTime;this._delta+=o,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var p=Math.max(u-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),p),as(i)},_performZoom:function(){var i=this._map,o=i.getZoom(),u=this._map.options.zoomSnap||0;i._stop();var p=this._delta/(this._map.options.wheelPxPerZoomLevel*4),x=4*Math.log(2/(1+Math.exp(-Math.abs(p))))/Math.LN2,P=u?Math.ceil(x/u)*u:x,H=i._limitZoom(o+(this._delta>0?P:-P))-o;this._delta=0,this._startTime=null,H&&(i.options.scrollWheelZoom==="center"?i.setZoom(o+H):i.setZoomAround(this._lastMousePos,o+H))}});me.addInitHook("addHandler","scrollWheelZoom",Hu);var rm=600;me.mergeOptions({tapHold:Ht.touchNative&&Ht.safari&&Ht.mobile,tapTolerance:15});var Vu=ri.extend({addHooks:function(){se(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Se(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var o=i.touches[0];this._startPos=this._newPos=new z(o.clientX,o.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(se(document,"touchend",en),se(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",o))},this),rm),se(document,"touchend touchcancel contextmenu",this._cancel,this),se(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){Se(document,"touchend",en),Se(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),Se(document,"touchend touchcancel contextmenu",this._cancel,this),Se(document,"touchmove",this._onMove,this)},_onMove:function(i){var o=i.touches[0];this._newPos=new z(o.clientX,o.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,o){var u=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:o.screenX,screenY:o.screenY,clientX:o.clientX,clientY:o.clientY});u._simulated=!0,o.target.dispatchEvent(u)}});me.addInitHook("addHandler","tapHold",Vu),me.mergeOptions({touchZoom:Ht.touch,bounceAtZoomLimits:!0});var Gu=ri.extend({addHooks:function(){$t(this._map._container,"leaflet-touch-zoom"),se(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Ee(this._map._container,"leaflet-touch-zoom"),Se(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var o=this._map;if(!(!i.touches||i.touches.length!==2||o._animatingZoom||this._zooming)){var u=o.mouseEventToContainerPoint(i.touches[0]),p=o.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=o.getSize()._divideBy(2),this._startLatLng=o.containerPointToLatLng(this._centerPoint),o.options.touchZoom!=="center"&&(this._pinchStartLatLng=o.containerPointToLatLng(u.add(p)._divideBy(2))),this._startDist=u.distanceTo(p),this._startZoom=o.getZoom(),this._moved=!1,this._zooming=!0,o._stop(),se(document,"touchmove",this._onTouchMove,this),se(document,"touchend touchcancel",this._onTouchEnd,this),en(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var o=this._map,u=o.mouseEventToContainerPoint(i.touches[0]),p=o.mouseEventToContainerPoint(i.touches[1]),x=u.distanceTo(p)/this._startDist;if(this._zoom=o.getScaleZoom(x,this._startZoom),!o.options.bounceAtZoomLimits&&(this._zoom<o.getMinZoom()&&x<1||this._zoom>o.getMaxZoom()&&x>1)&&(this._zoom=o._limitZoom(this._zoom)),o.options.touchZoom==="center"){if(this._center=this._startLatLng,x===1)return}else{var P=u._add(p)._divideBy(2)._subtract(this._centerPoint);if(x===1&&P.x===0&&P.y===0)return;this._center=o.unproject(o.project(this._pinchStartLatLng,this._zoom).subtract(P),this._zoom)}this._moved||(o._moveStart(!0,!1),this._moved=!0),X(this._animRequest);var H=l(o._move,o,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=B(H,this,!0),en(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,X(this._animRequest),Se(document,"touchmove",this._onTouchMove,this),Se(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});me.addInitHook("addHandler","touchZoom",Gu),me.BoxZoom=ku,me.DoubleClickZoom=Fu,me.Drag=Bu,me.Keyboard=zu,me.ScrollWheelZoom=Hu,me.TapHold=Vu,me.TouchZoom=Gu,e.Bounds=st,e.Browser=Ht,e.CRS=_t,e.Canvas=Du,e.Circle=Tl,e.CircleMarker=Uo,e.Class=W,e.Control=Wn,e.DivIcon=Cu,e.DivOverlay=oi,e.DomEvent=wp,e.DomUtil=Mp,e.Draggable=Fi,e.Evented=ft,e.FeatureGroup=xi,e.GeoJSON=bi,e.GridLayer=Hr,e.Handler=ri,e.Icon=Cs,e.ImageOverlay=Ho,e.LatLng=K,e.LatLngBounds=bt,e.Layer=Zn,e.LayerGroup=Ps,e.LineUtil=Up,e.Map=me,e.Marker=Oo,e.Mixin=Cp,e.Path=Bi,e.Point=z,e.PolyUtil=Rp,e.Polygon=Rs,e.Polyline=Mi,e.Popup=Vo,e.PosAnimation=du,e.Projection=kp,e.Rectangle=Uu,e.Renderer=wi,e.SVG=Gr,e.SVGOverlay=Pu,e.TileLayer=Ds,e.Tooltip=Go,e.Transformation=q,e.Util=F,e.VideoOverlay=Lu,e.bind=l,e.bounds=yt,e.canvas=Nu,e.circle=Zp,e.circleMarker=Wp,e.control=Fr,e.divIcon=tm,e.extend=r,e.featureGroup=Hp,e.geoJSON=Au,e.geoJson=$p,e.gridLayer=em,e.icon=Vp,e.imageOverlay=Yp,e.latLng=ut,e.latLngBounds=Z,e.layerGroup=zp,e.map=Sp,e.marker=Gp,e.point=G,e.polygon=qp,e.polyline=Xp,e.popup=Jp,e.rectangle=sm,e.setOptions=w,e.stamp=h,e.svg=Ou,e.svgOverlay=Kp,e.tileLayer=Ru,e.tooltip=Qp,e.transformation=at,e.version=n,e.videoOverlay=jp;var om=window.L;e.noConflict=function(){return window.L=om,this},window.L=e})})(_c,_c.exports);var vm=_c.exports;const Ae=_m(vm),Nt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};let Mo=null,Bt,Je=null,Cn=null,Ri=null,ke=null,Ue=null,Fn=[],nn=[],je=null,gn=null,Wr=null,or="none",Os=[];const ym={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function xm(s){s&&(Mo=s);const t=Ae.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Ae.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Ae.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),r=Ae.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),a=Ae.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Bt=Ae.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Ae.control.zoom({position:"topright"}).addTo(Bt),Ae.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:r,Voyager:a,"IGN (France)":n},{},{position:"topright"}).addTo(Bt),new ResizeObserver(()=>Bt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Bt.invalidateSize(),300),Tm(),wm(),Am(),Lm(),Em()}function qu(s,t){return[[s.lat,s.lng],[s.lat,t.lng],[t.lat,t.lng],[t.lat,s.lng]]}function $u(s,t){const e=(s.lat+t.lat)/2,n=Math.abs(t.lat-s.lat)*111320,r=Math.abs(t.lng-s.lng)*111320*Math.cos(e*Math.PI/180),a=Math.min(n,r),l=a/111320,c=a/(111320*Math.cos(e*Math.PI/180)),h=Math.min(s.lat,t.lat),d=Math.min(s.lng,t.lng);return[[h,d],[h,d+c],[h+l,d+c],[h+l,d]]}function Yu(s,t,e=80){const n=s.distanceTo(t);return Array.from({length:e},(r,a)=>{const l=a/e*Math.PI*2;return[s.lat+n*Math.cos(l)/111320,s.lng+n*Math.sin(l)/(111320*Math.cos(s.lat*Math.PI/180))]})}function ju(s,t){const e=s.distanceTo(t);return Array.from({length:6},(n,r)=>{const a=r/6*Math.PI*2-Math.PI/6;return[s.lat+e*Math.cos(a)/111320,s.lng+e*Math.sin(a)/(111320*Math.cos(s.lat*Math.PI/180))]})}function tf(s){ke&&ke!==s&&(Ue=null,Fn=[],nn=[],je&&(Bt.removeLayer(je),je=null),gn&&(Bt.removeLayer(gn),gn=null)),ke=s,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===s)}),Bt.getContainer().classList.toggle("dm",!!s);const t=document.getElementById("dch");t.style.display=s?"block":"none",s&&(t.textContent=ym[s]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=s==="trace"?"block":"none",s!=="trace"&&(e.textContent="0 points tracés"),!s){const n=document.getElementById("snap");n&&(n.style.display="none")}}function Ta(s=!0){je&&(Bt.removeLayer(je),je=null),gn&&(Bt.removeLayer(gn),gn=null),Ue=null,Fn=[],nn=[],s&&tf(null)}function Aa(s,t){return t?Bt.latLngToContainerPoint(s).distanceTo(Bt.latLngToContainerPoint(t)):9999}function Ku(s){const t=[];Fn.length>2&&t.push(Fn[0]),nn.length>2&&t.push(nn[0]),Ri&&t.push(Ri.getLatLng());let e=null,n=9999;for(const r of t){const a=Aa(s,r);a<18&&a<n&&(n=a,e=r)}return e}function Mm(s,t){const e=document.getElementById("snap");if(!e)return;if(!t||Aa(s,t)>18){e.style.display="none";return}const n=Bt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function bm(){document.getElementById("zone-controls")?.classList.add("visible"),vc()}function ef(){document.getElementById("zone-controls")?.classList.remove("visible"),nf("none")}function vc(){if(!Nt.bounds)return;const s=document.getElementById("zone-controls");if(!s)return;const t=Ae.latLng(Nt.bounds.maxLat,Nt.bounds.maxLon),e=Bt.latLngToContainerPoint(t),n=40;s.style.left=e.x+10+"px",s.style.top=Math.max(10,e.y-n/2)+"px"}function nf(s){or==="move"&&s!=="move"&&(Bt.dragging.enable(),Bt.getContainer().style.cursor=""),or=s,document.getElementById("zc-move")?.classList.toggle("active",s==="move"),s==="move"&&(Bt.dragging.disable(),Bt.getContainer().style.cursor="grab")}function sf(s){Je&&(Bt.removeLayer(Je),Je=null),Je=Ae.polygon(s,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Bt);const t=s.map(h=>h[0]),e=s.map(h=>h[1]);Nt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(Nt.bounds.minLat+Nt.bounds.maxLat)/2,r=(Nt.bounds.maxLon-Nt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,a=(Nt.bounds.maxLat-Nt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(a,r);Nt.wMm=Math.round(r*c),Nt.dMm=Math.round(a*c),Mo?.()}function Ju(s){if(!Nt.zonePts)return;const t=Nt.zonePts.map(l=>l[0]),e=Nt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,r=(Math.min(...e)+Math.max(...e))/2,a=Nt.zonePts.map(([l,c])=>[n+(l-n)*s,r+(c-r)*s]);Nt.zonePts=a,sf(a)}function wm(){document.getElementById("zc-delete")?.addEventListener("click",()=>{Je&&(Bt.removeLayer(Je),Je=null),Nt.bounds=null,Nt.zonePts=null,ef(),Mo?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>Ju(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>Ju(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{nf(or==="move"?"none":"move")});let s=null;Bt.getContainer().addEventListener("mousedown",t=>{or!=="move"||!Nt.zonePts||(s={x:t.clientX,y:t.clientY},Os=Nt.zonePts.map(e=>[e[0],e[1]]),Bt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(or!=="move"||!s||!Os.length)return;const e=Bt.getContainer().getBoundingClientRect(),n=Bt.containerPointToLatLng(Ae.point(s.x-e.left,s.y-e.top)),r=Bt.containerPointToLatLng(Ae.point(t.clientX-e.left,t.clientY-e.top)),a=r.lat-n.lat,l=r.lng-n.lng,c=Os.map(([h,d])=>[h+a,d+l]);Je&&(Bt.removeLayer(Je),Je=null),Je=Ae.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Bt)}),document.addEventListener("mouseup",t=>{if(or!=="move"||!s||!Os.length)return;const e=Bt.getContainer().getBoundingClientRect(),n=Bt.containerPointToLatLng(Ae.point(s.x-e.left,s.y-e.top)),r=Bt.containerPointToLatLng(Ae.point(t.clientX-e.left,t.clientY-e.top)),a=r.lat-n.lat,l=r.lng-n.lng,c=Os.map(([h,d])=>[h+a,d+l]);s=null,Os=[],Nt.zonePts=c,sf(c),vc(),Bt.getContainer().style.cursor="grab"}),Bt.on("move zoom moveend zoomend",vc)}function Zr(s,t){Je&&(Bt.removeLayer(Je),Je=null),Je=Ae.polygon(s,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Bt);const e=s.map(d=>d[0]),n=s.map(d=>d[1]);Nt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},Nt.zonePts=s,Nt.zoneType=t;const r=(Nt.bounds.minLat+Nt.bounds.maxLat)/2,a=(Nt.bounds.maxLon-Nt.bounds.minLon)*Math.cos(r*Math.PI/180)*111320,l=(Nt.bounds.maxLat-Nt.bounds.minLat)*111320,h=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,a);Nt.realW=a,Nt.realH=l,Nt.wMm=Math.round(a*h),Nt.dMm=Math.round(l*h),Mo?.(),bm(),Ta()}function Sm(){Cn&&(Bt.removeLayer(Cn),Cn=null),!(nn.length<2)&&(Cn=Ae.polyline(nn,{color:"#ff0000",weight:4,opacity:.9}).addTo(Bt))}function Qu(s){const t=document.getElementById("snap");if(t&&(t.style.display="none"),gn&&(Bt.removeLayer(gn),gn=null),s.length<2){Ta();return}Nt.gpxPoints=s.map(n=>({lat:n.lat,lon:n.lng})),rf(),of(`✏️ ${s.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),Ta()}function rf(){Cn&&(Bt.removeLayer(Cn),Cn=null),!(Nt.gpxPoints.length<2)&&(Cn=Ae.polyline(Nt.gpxPoints.map(s=>[s.lat,s.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Bt))}function of(s){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=s,t.style.display="block")}function Em(){Bt.on("mousemove",s=>{if(!ke)return;const t=s.latlng,e=Ku(t);Mm(t,e??Ue);const n=e??t;if((ke==="rect"||ke==="sq")&&Ue){const r=ke==="sq"?$u(Ue,n):qu(Ue,n);je?je.setLatLngs(r):je=Ae.polygon(r,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Bt)}else if((ke==="circ"||ke==="hex")&&Ue){const r=ke==="circ"?Yu(Ue,n):ju(Ue,n);je?je.setLatLngs(r):je=Ae.polygon(r,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Bt)}else if(ke==="poly"&&Fn.length>0){const r=[...Fn,n];je?je.setLatLngs(r):je=Ae.polyline(r,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Bt)}else if(ke==="trace"&&nn.length>0){const r=[...nn,n];je?je.setLatLngs(r):je=Ae.polyline(r,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Bt)}}),Bt.on("click",s=>{if(!ke)return;const t=s.latlng,e=Ku(t),n=e??t;if(ke==="rect"){if(!Ue){Ue=n;return}Zr(qu(Ue,n),"rect")}else if(ke==="sq"){if(!Ue){Ue=n;return}Zr($u(Ue,n),"rect")}else if(ke==="circ"){if(!Ue){Ue=n;return}Zr(Yu(Ue,n),"circ")}else if(ke==="hex"){if(!Ue){Ue=n;return}Zr(ju(Ue,n),"hex")}else if(ke==="poly"){if(Fn.length>2&&Aa(t,Fn[0])<18){Zr(Fn.map(r=>[r.lat,r.lng]),"poly");return}Fn.push(n),Fn.length===1&&(gn&&Bt.removeLayer(gn),gn=Ae.circleMarker(Fn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Bt))}else ke==="trace"&&(Wr&&clearTimeout(Wr),Wr=setTimeout(()=>{if(nn.length>2&&Aa(t,nn[0])<18){Qu(nn);return}nn.push(e??t);const r=nn.length,a=document.getElementById("gpx-ctr");a&&(a.textContent=`${r} point${r>1?"s":""} tracé${r>1?"s":""}`),r===1&&(gn&&Bt.removeLayer(gn),gn=Ae.circleMarker(nn[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Bt)),Sm()},220))}),Bt.on("dblclick",s=>{ke==="trace"&&nn.length>=2&&(Wr&&clearTimeout(Wr),Qu(nn),s.originalEvent.preventDefault())})}function Tm(){["rect","sq","circ","hex","poly","trace"].forEach(s=>{document.getElementById("db-"+s)?.addEventListener("click",()=>{tf(ke===s?null:s)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{Ta(),Je&&(Bt.removeLayer(Je),Je=null),Cn&&(Bt.removeLayer(Cn),Cn=null),Ri&&(Bt.removeLayer(Ri),Ri=null),Nt.bounds=null,Nt.zonePts=null,Nt.gpxPoints=[],nn=[],ef();const s=document.getElementById("gpx-badge");s&&(s.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),Mo?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!Nt.bounds)return;const s=Nt.bounds;Bt.fitBounds([[s.minLat,s.minLon],[s.maxLat,s.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!Nt.gpxPoints.length)return;const s=Nt.gpxPoints.map(e=>e.lat),t=Nt.gpxPoints.map(e=>e.lon);Bt.fitBounds([[Math.min(...s),Math.min(...t)],[Math.max(...s),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function Am(){document.getElementById("gpx-file")?.addEventListener("change",function(){const s=this.files?.[0];if(!s)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),r=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!r.length)return;const a=r.map(h=>({lat:parseFloat(h.getAttribute("lat")),lon:parseFloat(h.getAttribute("lon"))})).filter(h=>!isNaN(h.lat)&&!isNaN(h.lon));if(!a.length)return;Nt.gpxPoints=a,rf(),Cn&&Bt.fitBounds(Cn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let h=1;h<a.length;h++){const f=(a[h].lat-a[h-1].lat)*Math.PI/180,g=(a[h].lon-a[h-1].lon)*Math.PI/180,m=Math.sin(f/2)**2+Math.cos(a[h-1].lat*Math.PI/180)*Math.cos(a[h].lat*Math.PI/180)*Math.sin(g/2)**2;l+=6371*2*Math.atan2(Math.sqrt(m),Math.sqrt(1-m))}of(`📍 ${a.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(s)})}let th;function Lm(){const s=document.getElementById("srch-input"),t=document.getElementById("srch-drop");s?.addEventListener("input",function(){clearTimeout(th);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(th=setTimeout(()=>Pm(e),120))}),s?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function Pm(s){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(s)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((r,a)=>`
      <div class="srch-item" data-i="${a}" data-lat="${r.lat}" data-lon="${r.lon}" data-bb="${r.boundingbox.join(",")}">
        <div class="srch-name">${r.display_name.split(",")[0]}</div>
        <div class="srch-addr">${r.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(r=>{r.addEventListener("mousedown",function(a){a.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),h=this.dataset.bb.split(",").map(Number);Ri&&(Bt.removeLayer(Ri),Ri=null),Ri=Ae.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Bt),Bt.fitBounds([[h[0],h[2]],[h[1],h[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=r.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zc="163",Us={ROTATE:0,DOLLY:1,PAN:2},ks={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Cm=0,eh=1,Rm=2,af=1,Im=2,Ci=3,Qi=0,Tn=1,Hn=2,ji=0,hr=1,nh=2,ih=3,sh=4,Dm=5,gs=100,Nm=101,Om=102,Um=103,km=104,Fm=200,Bm=201,zm=202,Hm=203,yc=204,xc=205,Vm=206,Gm=207,Wm=208,Zm=209,Xm=210,qm=211,$m=212,Ym=213,jm=214,Km=0,Jm=1,Qm=2,La=3,tg=4,eg=5,ng=6,ig=7,Hc=0,sg=1,rg=2,Ki=0,og=1,ag=2,lg=3,cg=4,ug=5,hg=6,dg=7,lf=300,vr=301,yr=302,Mc=303,bc=304,Ya=306,wc=1e3,vs=1001,Sc=1002,En=1003,fg=1004,Xo=1005,Yn=1006,Rl=1007,ys=1008,Ji=1009,pg=1010,mg=1011,cf=1012,uf=1013,xr=1014,Ii=1015,Pa=1016,hf=1017,df=1018,bo=1020,gg=35902,_g=1021,vg=1022,di=1023,yg=1024,xg=1025,dr=1026,po=1027,ff=1028,pf=1029,Mg=1030,mf=1031,gf=1033,Il=33776,Dl=33777,Nl=33778,Ol=33779,rh=35840,oh=35841,ah=35842,lh=35843,_f=36196,ch=37492,uh=37496,hh=37808,dh=37809,fh=37810,ph=37811,mh=37812,gh=37813,_h=37814,vh=37815,yh=37816,xh=37817,Mh=37818,bh=37819,wh=37820,Sh=37821,Ul=36492,Eh=36494,Th=36495,bg=36283,Ah=36284,Lh=36285,Ph=36286,wg=3200,Sg=3201,vf=0,Eg=1,qi="",ai="srgb",es="srgb-linear",Vc="display-p3",ja="display-p3-linear",Ca="linear",Te="srgb",Ra="rec709",Ia="p3",Fs=7680,Ch=519,Tg=512,Ag=513,Lg=514,yf=515,Pg=516,Cg=517,Rg=518,Ig=519,Rh=35044,Ih="300 es",Di=2e3,Da=2001;class Ts{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let a=0,l=r.length;a<l;a++)r[a].call(this,t);t.target=null}}}const an=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],so=Math.PI/180,Ec=180/Math.PI;function Er(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(an[s&255]+an[s>>8&255]+an[s>>16&255]+an[s>>24&255]+"-"+an[t&255]+an[t>>8&255]+"-"+an[t>>16&15|64]+an[t>>24&255]+"-"+an[e&63|128]+an[e>>8&255]+"-"+an[e>>16&255]+an[e>>24&255]+an[n&255]+an[n>>8&255]+an[n>>16&255]+an[n>>24&255]).toLowerCase()}function sn(s,t,e){return Math.max(t,Math.min(e,s))}function Dg(s,t){return(s%t+t)%t}function kl(s,t,e){return(1-e)*s+e*t}function Xr(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Mn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Ng={DEG2RAD:so};class wt{constructor(t=0,e=0){wt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(sn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),a=this.x-t.x,l=this.y-t.y;return this.x=a*n-l*r+t.x,this.y=a*r+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class oe{constructor(t,e,n,r,a,l,c,h,d){oe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,l,c,h,d)}set(t,e,n,r,a,l,c,h,d){const f=this.elements;return f[0]=t,f[1]=r,f[2]=c,f[3]=e,f[4]=a,f[5]=h,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,l=n[0],c=n[3],h=n[6],d=n[1],f=n[4],g=n[7],m=n[2],_=n[5],M=n[8],w=r[0],v=r[3],y=r[6],D=r[1],b=r[4],A=r[7],k=r[2],I=r[5],R=r[8];return a[0]=l*w+c*D+h*k,a[3]=l*v+c*b+h*I,a[6]=l*y+c*A+h*R,a[1]=d*w+f*D+g*k,a[4]=d*v+f*b+g*I,a[7]=d*y+f*A+g*R,a[2]=m*w+_*D+M*k,a[5]=m*v+_*b+M*I,a[8]=m*y+_*A+M*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*a*f+n*c*h+r*a*d-r*l*h}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],g=f*l-c*d,m=c*h-f*a,_=d*a-l*h,M=e*g+n*m+r*_;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/M;return t[0]=g*w,t[1]=(r*d-f*n)*w,t[2]=(c*n-r*l)*w,t[3]=m*w,t[4]=(f*e-r*h)*w,t[5]=(r*a-c*e)*w,t[6]=_*w,t[7]=(n*h-d*e)*w,t[8]=(l*e-n*a)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,a,l,c){const h=Math.cos(a),d=Math.sin(a);return this.set(n*h,n*d,-n*(h*l+d*c)+l+t,-r*d,r*h,-r*(-d*l+h*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Fl.makeScale(t,e)),this}rotate(t){return this.premultiply(Fl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fl=new oe;function xf(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Na(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Og(){const s=Na("canvas");return s.style.display="block",s}const Dh={};function Ug(s){s in Dh||(Dh[s]=!0,console.warn(s))}const Nh=new oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Oh=new oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),qo={[es]:{transfer:Ca,primaries:Ra,toReference:s=>s,fromReference:s=>s},[ai]:{transfer:Te,primaries:Ra,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ja]:{transfer:Ca,primaries:Ia,toReference:s=>s.applyMatrix3(Oh),fromReference:s=>s.applyMatrix3(Nh)},[Vc]:{transfer:Te,primaries:Ia,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Oh),fromReference:s=>s.applyMatrix3(Nh).convertLinearToSRGB()}},kg=new Set([es,ja]),xe={enabled:!0,_workingColorSpace:es,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!kg.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=qo[t].toReference,r=qo[e].fromReference;return r(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return qo[s].primaries},getTransfer:function(s){return s===qi?Ca:qo[s].transfer}};function fr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Bl(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Bs;class Fg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Bs===void 0&&(Bs=Na("canvas")),Bs.width=t.width,Bs.height=t.height;const n=Bs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Bs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Na("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),a=r.data;for(let l=0;l<a.length;l++)a[l]=fr(a[l]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(fr(e[n]/255)*255):e[n]=fr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Bg=0;class Mf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=Er(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let l=0,c=r.length;l<c;l++)r[l].isDataTexture?a.push(zl(r[l].image)):a.push(zl(r[l]))}else a=zl(r);n.url=a}return e||(t.images[this.uuid]=n),n}}function zl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Fg.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zg=0;class cn extends Ts{constructor(t=cn.DEFAULT_IMAGE,e=cn.DEFAULT_MAPPING,n=vs,r=vs,a=Yn,l=ys,c=di,h=Ji,d=cn.DEFAULT_ANISOTROPY,f=qi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=Er(),this.name="",this.source=new Mf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=h,this.offset=new wt(0,0),this.repeat=new wt(1,1),this.center=new wt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wc:t.x=t.x-Math.floor(t.x);break;case vs:t.x=t.x<0?0:1;break;case Sc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wc:t.y=t.y-Math.floor(t.y);break;case vs:t.y=t.y<0?0:1;break;case Sc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=lf;cn.DEFAULT_ANISOTROPY=1;class Qe{constructor(t=0,e=0,n=0,r=1){Qe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*r+l[12]*a,this.y=l[1]*e+l[5]*n+l[9]*r+l[13]*a,this.z=l[2]*e+l[6]*n+l[10]*r+l[14]*a,this.w=l[3]*e+l[7]*n+l[11]*r+l[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,a;const h=t.elements,d=h[0],f=h[4],g=h[8],m=h[1],_=h[5],M=h[9],w=h[2],v=h[6],y=h[10];if(Math.abs(f-m)<.01&&Math.abs(g-w)<.01&&Math.abs(M-v)<.01){if(Math.abs(f+m)<.1&&Math.abs(g+w)<.1&&Math.abs(M+v)<.1&&Math.abs(d+_+y-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(d+1)/2,A=(_+1)/2,k=(y+1)/2,I=(f+m)/4,R=(g+w)/4,U=(M+v)/4;return b>A&&b>k?b<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(b),r=I/n,a=R/n):A>k?A<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(A),n=I/r,a=U/r):k<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(k),n=R/a,r=U/a),this.set(n,r,a,e),this}let D=Math.sqrt((v-M)*(v-M)+(g-w)*(g-w)+(m-f)*(m-f));return Math.abs(D)<.001&&(D=1),this.x=(v-M)/D,this.y=(g-w)/D,this.z=(m-f)/D,this.w=Math.acos((d+_+y-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Hg extends Ts{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Qe(0,0,t,e),this.scissorTest=!1,this.viewport=new Qe(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const a=new cn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=a.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Mf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ms extends Hg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class bf extends cn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=En,this.minFilter=En,this.wrapR=vs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vg extends cn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=En,this.minFilter=En,this.wrapR=vs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bs{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,a,l,c){let h=n[r+0],d=n[r+1],f=n[r+2],g=n[r+3];const m=a[l+0],_=a[l+1],M=a[l+2],w=a[l+3];if(c===0){t[e+0]=h,t[e+1]=d,t[e+2]=f,t[e+3]=g;return}if(c===1){t[e+0]=m,t[e+1]=_,t[e+2]=M,t[e+3]=w;return}if(g!==w||h!==m||d!==_||f!==M){let v=1-c;const y=h*m+d*_+f*M+g*w,D=y>=0?1:-1,b=1-y*y;if(b>Number.EPSILON){const k=Math.sqrt(b),I=Math.atan2(k,y*D);v=Math.sin(v*I)/k,c=Math.sin(c*I)/k}const A=c*D;if(h=h*v+m*A,d=d*v+_*A,f=f*v+M*A,g=g*v+w*A,v===1-c){const k=1/Math.sqrt(h*h+d*d+f*f+g*g);h*=k,d*=k,f*=k,g*=k}}t[e]=h,t[e+1]=d,t[e+2]=f,t[e+3]=g}static multiplyQuaternionsFlat(t,e,n,r,a,l){const c=n[r],h=n[r+1],d=n[r+2],f=n[r+3],g=a[l],m=a[l+1],_=a[l+2],M=a[l+3];return t[e]=c*M+f*g+h*_-d*m,t[e+1]=h*M+f*m+d*g-c*_,t[e+2]=d*M+f*_+c*m-h*g,t[e+3]=f*M-c*g-h*m-d*_,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,a=t._z,l=t._order,c=Math.cos,h=Math.sin,d=c(n/2),f=c(r/2),g=c(a/2),m=h(n/2),_=h(r/2),M=h(a/2);switch(l){case"XYZ":this._x=m*f*g+d*_*M,this._y=d*_*g-m*f*M,this._z=d*f*M+m*_*g,this._w=d*f*g-m*_*M;break;case"YXZ":this._x=m*f*g+d*_*M,this._y=d*_*g-m*f*M,this._z=d*f*M-m*_*g,this._w=d*f*g+m*_*M;break;case"ZXY":this._x=m*f*g-d*_*M,this._y=d*_*g+m*f*M,this._z=d*f*M+m*_*g,this._w=d*f*g-m*_*M;break;case"ZYX":this._x=m*f*g-d*_*M,this._y=d*_*g+m*f*M,this._z=d*f*M-m*_*g,this._w=d*f*g+m*_*M;break;case"YZX":this._x=m*f*g+d*_*M,this._y=d*_*g+m*f*M,this._z=d*f*M-m*_*g,this._w=d*f*g-m*_*M;break;case"XZY":this._x=m*f*g-d*_*M,this._y=d*_*g-m*f*M,this._z=d*f*M+m*_*g,this._w=d*f*g+m*_*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],a=e[8],l=e[1],c=e[5],h=e[9],d=e[2],f=e[6],g=e[10],m=n+c+g;if(m>0){const _=.5/Math.sqrt(m+1);this._w=.25/_,this._x=(f-h)*_,this._y=(a-d)*_,this._z=(l-r)*_}else if(n>c&&n>g){const _=2*Math.sqrt(1+n-c-g);this._w=(f-h)/_,this._x=.25*_,this._y=(r+l)/_,this._z=(a+d)/_}else if(c>g){const _=2*Math.sqrt(1+c-n-g);this._w=(a-d)/_,this._x=(r+l)/_,this._y=.25*_,this._z=(h+f)/_}else{const _=2*Math.sqrt(1+g-n-c);this._w=(l-r)/_,this._x=(a+d)/_,this._y=(h+f)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(sn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,a=t._z,l=t._w,c=e._x,h=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+r*d-a*h,this._y=r*f+l*h+a*c-n*d,this._z=a*f+l*d+n*h-r*c,this._w=l*f-n*c-r*h-a*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,a=this._z,l=this._w;let c=l*t._w+n*t._x+r*t._y+a*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=r,this._z=a,this;const h=1-c*c;if(h<=Number.EPSILON){const _=1-e;return this._w=_*l+e*this._w,this._x=_*n+e*this._x,this._y=_*r+e*this._y,this._z=_*a+e*this._z,this.normalize(),this}const d=Math.sqrt(h),f=Math.atan2(d,c),g=Math.sin((1-e)*f)/d,m=Math.sin(e*f)/d;return this._w=l*g+this._w*m,this._x=n*g+this._x*m,this._y=r*g+this._y*m,this._z=a*g+this._z*m,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,n=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Uh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Uh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*r,this.y=a[1]*e+a[4]*n+a[7]*r,this.z=a[2]*e+a[5]*n+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=t.elements,l=1/(a[3]*e+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*r+a[12])*l,this.y=(a[1]*e+a[5]*n+a[9]*r+a[13])*l,this.z=(a[2]*e+a[6]*n+a[10]*r+a[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,a=t.x,l=t.y,c=t.z,h=t.w,d=2*(l*r-c*n),f=2*(c*e-a*r),g=2*(a*n-l*e);return this.x=e+h*d+l*g-c*f,this.y=n+h*f+c*d-a*g,this.z=r+h*g+a*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r,this.y=a[1]*e+a[5]*n+a[9]*r,this.z=a[2]*e+a[6]*n+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,a=t.z,l=e.x,c=e.y,h=e.z;return this.x=r*h-a*c,this.y=a*l-n*h,this.z=n*c-r*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Hl.copy(this).projectOnVector(t),this.sub(Hl)}reflect(t){return this.sub(Hl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(sn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hl=new V,Uh=new bs;class As{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Xn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Xn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Xn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=a.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,Xn):Xn.fromBufferAttribute(a,l),Xn.applyMatrix4(t.matrixWorld),this.expandByPoint(Xn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$o.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$o.copy(n.boundingBox)),$o.applyMatrix4(t.matrixWorld),this.union($o)}const r=t.children;for(let a=0,l=r.length;a<l;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Xn),Xn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(qr),Yo.subVectors(this.max,qr),zs.subVectors(t.a,qr),Hs.subVectors(t.b,qr),Vs.subVectors(t.c,qr),zi.subVectors(Hs,zs),Hi.subVectors(Vs,Hs),cs.subVectors(zs,Vs);let e=[0,-zi.z,zi.y,0,-Hi.z,Hi.y,0,-cs.z,cs.y,zi.z,0,-zi.x,Hi.z,0,-Hi.x,cs.z,0,-cs.x,-zi.y,zi.x,0,-Hi.y,Hi.x,0,-cs.y,cs.x,0];return!Vl(e,zs,Hs,Vs,Yo)||(e=[1,0,0,0,1,0,0,0,1],!Vl(e,zs,Hs,Vs,Yo))?!1:(jo.crossVectors(zi,Hi),e=[jo.x,jo.y,jo.z],Vl(e,zs,Hs,Vs,Yo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Si=[new V,new V,new V,new V,new V,new V,new V,new V],Xn=new V,$o=new As,zs=new V,Hs=new V,Vs=new V,zi=new V,Hi=new V,cs=new V,qr=new V,Yo=new V,jo=new V,us=new V;function Vl(s,t,e,n,r){for(let a=0,l=s.length-3;a<=l;a+=3){us.fromArray(s,a);const c=r.x*Math.abs(us.x)+r.y*Math.abs(us.y)+r.z*Math.abs(us.z),h=t.dot(us),d=e.dot(us),f=n.dot(us);if(Math.max(-Math.max(h,d,f),Math.min(h,d,f))>c)return!1}return!0}const Gg=new As,$r=new V,Gl=new V;class Tr{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Gg.setFromPoints(t).getCenter(n);let r=0;for(let a=0,l=t.length;a<l;a++)r=Math.max(r,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$r.subVectors(t,this.center);const e=$r.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector($r,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Gl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($r.copy(t.center).add(Gl)),this.expandByPoint($r.copy(t.center).sub(Gl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ei=new V,Wl=new V,Ko=new V,Vi=new V,Zl=new V,Jo=new V,Xl=new V;class Ka{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ei.copy(this.origin).addScaledVector(this.direction,e),Ei.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Wl.copy(t).add(e).multiplyScalar(.5),Ko.copy(e).sub(t).normalize(),Vi.copy(this.origin).sub(Wl);const a=t.distanceTo(e)*.5,l=-this.direction.dot(Ko),c=Vi.dot(this.direction),h=-Vi.dot(Ko),d=Vi.lengthSq(),f=Math.abs(1-l*l);let g,m,_,M;if(f>0)if(g=l*h-c,m=l*c-h,M=a*f,g>=0)if(m>=-M)if(m<=M){const w=1/f;g*=w,m*=w,_=g*(g+l*m+2*c)+m*(l*g+m+2*h)+d}else m=a,g=Math.max(0,-(l*m+c)),_=-g*g+m*(m+2*h)+d;else m=-a,g=Math.max(0,-(l*m+c)),_=-g*g+m*(m+2*h)+d;else m<=-M?(g=Math.max(0,-(-l*a+c)),m=g>0?-a:Math.min(Math.max(-a,-h),a),_=-g*g+m*(m+2*h)+d):m<=M?(g=0,m=Math.min(Math.max(-a,-h),a),_=m*(m+2*h)+d):(g=Math.max(0,-(l*a+c)),m=g>0?a:Math.min(Math.max(-a,-h),a),_=-g*g+m*(m+2*h)+d);else m=l>0?-a:a,g=Math.max(0,-(l*m+c)),_=-g*g+m*(m+2*h)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,g),r&&r.copy(Wl).addScaledVector(Ko,m),_}intersectSphere(t,e){Ei.subVectors(t.center,this.origin);const n=Ei.dot(this.direction),r=Ei.dot(Ei)-n*n,a=t.radius*t.radius;if(r>a)return null;const l=Math.sqrt(a-r),c=n-l,h=n+l;return h<0?null:c<0?this.at(h,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,a,l,c,h;const d=1/this.direction.x,f=1/this.direction.y,g=1/this.direction.z,m=this.origin;return d>=0?(n=(t.min.x-m.x)*d,r=(t.max.x-m.x)*d):(n=(t.max.x-m.x)*d,r=(t.min.x-m.x)*d),f>=0?(a=(t.min.y-m.y)*f,l=(t.max.y-m.y)*f):(a=(t.max.y-m.y)*f,l=(t.min.y-m.y)*f),n>l||a>r||((a>n||isNaN(n))&&(n=a),(l<r||isNaN(r))&&(r=l),g>=0?(c=(t.min.z-m.z)*g,h=(t.max.z-m.z)*g):(c=(t.max.z-m.z)*g,h=(t.min.z-m.z)*g),n>h||c>r)||((c>n||n!==n)&&(n=c),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Ei)!==null}intersectTriangle(t,e,n,r,a){Zl.subVectors(e,t),Jo.subVectors(n,t),Xl.crossVectors(Zl,Jo);let l=this.direction.dot(Xl),c;if(l>0){if(r)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Vi.subVectors(this.origin,t);const h=c*this.direction.dot(Jo.crossVectors(Vi,Jo));if(h<0)return null;const d=c*this.direction.dot(Zl.cross(Vi));if(d<0||h+d>l)return null;const f=-c*Vi.dot(Xl);return f<0?null:this.at(f/l,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Me{constructor(t,e,n,r,a,l,c,h,d,f,g,m,_,M,w,v){Me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,l,c,h,d,f,g,m,_,M,w,v)}set(t,e,n,r,a,l,c,h,d,f,g,m,_,M,w,v){const y=this.elements;return y[0]=t,y[4]=e,y[8]=n,y[12]=r,y[1]=a,y[5]=l,y[9]=c,y[13]=h,y[2]=d,y[6]=f,y[10]=g,y[14]=m,y[3]=_,y[7]=M,y[11]=w,y[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Gs.setFromMatrixColumn(t,0).length(),a=1/Gs.setFromMatrixColumn(t,1).length(),l=1/Gs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,a=t.z,l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r),f=Math.cos(a),g=Math.sin(a);if(t.order==="XYZ"){const m=l*f,_=l*g,M=c*f,w=c*g;e[0]=h*f,e[4]=-h*g,e[8]=d,e[1]=_+M*d,e[5]=m-w*d,e[9]=-c*h,e[2]=w-m*d,e[6]=M+_*d,e[10]=l*h}else if(t.order==="YXZ"){const m=h*f,_=h*g,M=d*f,w=d*g;e[0]=m+w*c,e[4]=M*c-_,e[8]=l*d,e[1]=l*g,e[5]=l*f,e[9]=-c,e[2]=_*c-M,e[6]=w+m*c,e[10]=l*h}else if(t.order==="ZXY"){const m=h*f,_=h*g,M=d*f,w=d*g;e[0]=m-w*c,e[4]=-l*g,e[8]=M+_*c,e[1]=_+M*c,e[5]=l*f,e[9]=w-m*c,e[2]=-l*d,e[6]=c,e[10]=l*h}else if(t.order==="ZYX"){const m=l*f,_=l*g,M=c*f,w=c*g;e[0]=h*f,e[4]=M*d-_,e[8]=m*d+w,e[1]=h*g,e[5]=w*d+m,e[9]=_*d-M,e[2]=-d,e[6]=c*h,e[10]=l*h}else if(t.order==="YZX"){const m=l*h,_=l*d,M=c*h,w=c*d;e[0]=h*f,e[4]=w-m*g,e[8]=M*g+_,e[1]=g,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=_*g+M,e[10]=m-w*g}else if(t.order==="XZY"){const m=l*h,_=l*d,M=c*h,w=c*d;e[0]=h*f,e[4]=-g,e[8]=d*f,e[1]=m*g+w,e[5]=l*f,e[9]=_*g-M,e[2]=M*g-_,e[6]=c*f,e[10]=w*g+m}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wg,t,Zg)}lookAt(t,e,n){const r=this.elements;return An.subVectors(t,e),An.lengthSq()===0&&(An.z=1),An.normalize(),Gi.crossVectors(n,An),Gi.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Gi.crossVectors(n,An)),Gi.normalize(),Qo.crossVectors(An,Gi),r[0]=Gi.x,r[4]=Qo.x,r[8]=An.x,r[1]=Gi.y,r[5]=Qo.y,r[9]=An.y,r[2]=Gi.z,r[6]=Qo.z,r[10]=An.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,l=n[0],c=n[4],h=n[8],d=n[12],f=n[1],g=n[5],m=n[9],_=n[13],M=n[2],w=n[6],v=n[10],y=n[14],D=n[3],b=n[7],A=n[11],k=n[15],I=r[0],R=r[4],U=r[8],C=r[12],E=r[1],B=r[5],X=r[9],F=r[13],W=r[2],Q=r[6],Y=r[10],ft=r[14],z=r[3],ct=r[7],G=r[11],st=r[15];return a[0]=l*I+c*E+h*W+d*z,a[4]=l*R+c*B+h*Q+d*ct,a[8]=l*U+c*X+h*Y+d*G,a[12]=l*C+c*F+h*ft+d*st,a[1]=f*I+g*E+m*W+_*z,a[5]=f*R+g*B+m*Q+_*ct,a[9]=f*U+g*X+m*Y+_*G,a[13]=f*C+g*F+m*ft+_*st,a[2]=M*I+w*E+v*W+y*z,a[6]=M*R+w*B+v*Q+y*ct,a[10]=M*U+w*X+v*Y+y*G,a[14]=M*C+w*F+v*ft+y*st,a[3]=D*I+b*E+A*W+k*z,a[7]=D*R+b*B+A*Q+k*ct,a[11]=D*U+b*X+A*Y+k*G,a[15]=D*C+b*F+A*ft+k*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],a=t[12],l=t[1],c=t[5],h=t[9],d=t[13],f=t[2],g=t[6],m=t[10],_=t[14],M=t[3],w=t[7],v=t[11],y=t[15];return M*(+a*h*g-r*d*g-a*c*m+n*d*m+r*c*_-n*h*_)+w*(+e*h*_-e*d*m+a*l*m-r*l*_+r*d*f-a*h*f)+v*(+e*d*g-e*c*_-a*l*g+n*l*_+a*c*f-n*d*f)+y*(-r*c*f-e*h*g+e*c*m+r*l*g-n*l*m+n*h*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],g=t[9],m=t[10],_=t[11],M=t[12],w=t[13],v=t[14],y=t[15],D=g*v*d-w*m*d+w*h*_-c*v*_-g*h*y+c*m*y,b=M*m*d-f*v*d-M*h*_+l*v*_+f*h*y-l*m*y,A=f*w*d-M*g*d+M*c*_-l*w*_-f*c*y+l*g*y,k=M*g*h-f*w*h-M*c*m+l*w*m+f*c*v-l*g*v,I=e*D+n*b+r*A+a*k;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/I;return t[0]=D*R,t[1]=(w*m*a-g*v*a-w*r*_+n*v*_+g*r*y-n*m*y)*R,t[2]=(c*v*a-w*h*a+w*r*d-n*v*d-c*r*y+n*h*y)*R,t[3]=(g*h*a-c*m*a-g*r*d+n*m*d+c*r*_-n*h*_)*R,t[4]=b*R,t[5]=(f*v*a-M*m*a+M*r*_-e*v*_-f*r*y+e*m*y)*R,t[6]=(M*h*a-l*v*a-M*r*d+e*v*d+l*r*y-e*h*y)*R,t[7]=(l*m*a-f*h*a+f*r*d-e*m*d-l*r*_+e*h*_)*R,t[8]=A*R,t[9]=(M*g*a-f*w*a-M*n*_+e*w*_+f*n*y-e*g*y)*R,t[10]=(l*w*a-M*c*a+M*n*d-e*w*d-l*n*y+e*c*y)*R,t[11]=(f*c*a-l*g*a-f*n*d+e*g*d+l*n*_-e*c*_)*R,t[12]=k*R,t[13]=(f*w*r-M*g*r+M*n*m-e*w*m-f*n*v+e*g*v)*R,t[14]=(M*c*r-l*w*r-M*n*h+e*w*h+l*n*v-e*c*v)*R,t[15]=(l*g*r-f*c*r+f*n*h-e*g*h-l*n*m+e*c*m)*R,this}scale(t){const e=this.elements,n=t.x,r=t.y,a=t.z;return e[0]*=n,e[4]*=r,e[8]*=a,e[1]*=n,e[5]*=r,e[9]*=a,e[2]*=n,e[6]*=r,e[10]*=a,e[3]*=n,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),a=1-n,l=t.x,c=t.y,h=t.z,d=a*l,f=a*c;return this.set(d*l+n,d*c-r*h,d*h+r*c,0,d*c+r*h,f*c+n,f*h-r*l,0,d*h-r*c,f*h+r*l,a*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,a,l){return this.set(1,n,a,0,t,1,l,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,a=e._x,l=e._y,c=e._z,h=e._w,d=a+a,f=l+l,g=c+c,m=a*d,_=a*f,M=a*g,w=l*f,v=l*g,y=c*g,D=h*d,b=h*f,A=h*g,k=n.x,I=n.y,R=n.z;return r[0]=(1-(w+y))*k,r[1]=(_+A)*k,r[2]=(M-b)*k,r[3]=0,r[4]=(_-A)*I,r[5]=(1-(m+y))*I,r[6]=(v+D)*I,r[7]=0,r[8]=(M+b)*R,r[9]=(v-D)*R,r[10]=(1-(m+w))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let a=Gs.set(r[0],r[1],r[2]).length();const l=Gs.set(r[4],r[5],r[6]).length(),c=Gs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],qn.copy(this);const d=1/a,f=1/l,g=1/c;return qn.elements[0]*=d,qn.elements[1]*=d,qn.elements[2]*=d,qn.elements[4]*=f,qn.elements[5]*=f,qn.elements[6]*=f,qn.elements[8]*=g,qn.elements[9]*=g,qn.elements[10]*=g,e.setFromRotationMatrix(qn),n.x=a,n.y=l,n.z=c,this}makePerspective(t,e,n,r,a,l,c=Di){const h=this.elements,d=2*a/(e-t),f=2*a/(n-r),g=(e+t)/(e-t),m=(n+r)/(n-r);let _,M;if(c===Di)_=-(l+a)/(l-a),M=-2*l*a/(l-a);else if(c===Da)_=-l/(l-a),M=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=d,h[4]=0,h[8]=g,h[12]=0,h[1]=0,h[5]=f,h[9]=m,h[13]=0,h[2]=0,h[6]=0,h[10]=_,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,r,a,l,c=Di){const h=this.elements,d=1/(e-t),f=1/(n-r),g=1/(l-a),m=(e+t)*d,_=(n+r)*f;let M,w;if(c===Di)M=(l+a)*g,w=-2*g;else if(c===Da)M=a*g,w=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=2*d,h[4]=0,h[8]=0,h[12]=-m,h[1]=0,h[5]=2*f,h[9]=0,h[13]=-_,h[2]=0,h[6]=0,h[10]=w,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Gs=new V,qn=new Me,Wg=new V(0,0,0),Zg=new V(1,1,1),Gi=new V,Qo=new V,An=new V,kh=new Me,Fh=new bs;class _i{constructor(t=0,e=0,n=0,r=_i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,a=r[0],l=r[4],c=r[8],h=r[1],d=r[5],f=r[9],g=r[2],m=r[6],_=r[10];switch(e){case"XYZ":this._y=Math.asin(sn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,_),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(m,d),this._z=0);break;case"YXZ":this._x=Math.asin(-sn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,_),this._z=Math.atan2(h,d)):(this._y=Math.atan2(-g,a),this._z=0);break;case"ZXY":this._x=Math.asin(sn(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-g,_),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(h,a));break;case"ZYX":this._y=Math.asin(-sn(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(m,_),this._z=Math.atan2(h,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(sn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-g,a)):(this._x=0,this._y=Math.atan2(c,_));break;case"XZY":this._z=Math.asin(-sn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(m,d),this._y=Math.atan2(c,a)):(this._x=Math.atan2(-f,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return kh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fh.setFromEuler(this),this.setFromQuaternion(Fh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_i.DEFAULT_ORDER="XYZ";class Gc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Xg=0;const Bh=new V,Ws=new bs,Ti=new Me,ta=new V,Yr=new V,qg=new V,$g=new bs,zh=new V(1,0,0),Hh=new V(0,1,0),Vh=new V(0,0,1),Gh={type:"added"},Yg={type:"removed"},Zs={type:"childadded",child:null},ql={type:"childremoved",child:null};class tn extends Ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=Er(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const t=new V,e=new _i,n=new bs,r=new V(1,1,1);function a(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Me},normalMatrix:{value:new oe}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.multiply(Ws),this}rotateOnWorldAxis(t,e){return Ws.setFromAxisAngle(t,e),this.quaternion.premultiply(Ws),this}rotateX(t){return this.rotateOnAxis(zh,t)}rotateY(t){return this.rotateOnAxis(Hh,t)}rotateZ(t){return this.rotateOnAxis(Vh,t)}translateOnAxis(t,e){return Bh.copy(t).applyQuaternion(this.quaternion),this.position.add(Bh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(zh,t)}translateY(t){return this.translateOnAxis(Hh,t)}translateZ(t){return this.translateOnAxis(Vh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ta.copy(t):ta.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(Yr,ta,this.up):Ti.lookAt(ta,Yr,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),Ws.setFromRotationMatrix(Ti),this.quaternion.premultiply(Ws.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gh),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yg),ql.child=t,this.dispatchEvent(ql),ql.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gh),Zs.child=t,this.dispatchEvent(Zs),Zs.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yr,t,qg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yr,$g,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const a=e[n];(a.matrixWorldAutoUpdate===!0||t===!0)&&a.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++){const c=r[a];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(c,h){return c[h.uuid]===void 0&&(c[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const h=c.shapes;if(Array.isArray(h))for(let d=0,f=h.length;d<f;d++){const g=h[d];a(t.shapes,g)}else a(t.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let h=0,d=this.material.length;h<d;h++)c.push(a(t.materials,this.material[h]));r.material=c}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const h=this.animations[c];r.animations.push(a(t.animations,h))}}if(e){const c=l(t.geometries),h=l(t.materials),d=l(t.textures),f=l(t.images),g=l(t.shapes),m=l(t.skeletons),_=l(t.animations),M=l(t.nodes);c.length>0&&(n.geometries=c),h.length>0&&(n.materials=h),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),g.length>0&&(n.shapes=g),m.length>0&&(n.skeletons=m),_.length>0&&(n.animations=_),M.length>0&&(n.nodes=M)}return n.object=r,n;function l(c){const h=[];for(const d in c){const f=c[d];delete f.metadata,h.push(f)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}tn.DEFAULT_UP=new V(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $n=new V,Ai=new V,$l=new V,Li=new V,Xs=new V,qs=new V,Wh=new V,Yl=new V,jl=new V,Kl=new V;class jn{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),$n.subVectors(t,e),r.cross($n);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,n,r,a){$n.subVectors(r,e),Ai.subVectors(n,e),$l.subVectors(t,e);const l=$n.dot($n),c=$n.dot(Ai),h=$n.dot($l),d=Ai.dot(Ai),f=Ai.dot($l),g=l*d-c*c;if(g===0)return a.set(0,0,0),null;const m=1/g,_=(d*h-c*f)*m,M=(l*f-c*h)*m;return a.set(1-_-M,M,_)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Li)===null?!1:Li.x>=0&&Li.y>=0&&Li.x+Li.y<=1}static getInterpolation(t,e,n,r,a,l,c,h){return this.getBarycoord(t,e,n,r,Li)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(a,Li.x),h.addScaledVector(l,Li.y),h.addScaledVector(c,Li.z),h)}static isFrontFacing(t,e,n,r){return $n.subVectors(n,e),Ai.subVectors(t,e),$n.cross(Ai).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $n.subVectors(this.c,this.b),Ai.subVectors(this.a,this.b),$n.cross(Ai).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return jn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return jn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,a){return jn.getInterpolation(t,this.a,this.b,this.c,e,n,r,a)}containsPoint(t){return jn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return jn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,a=this.c;let l,c;Xs.subVectors(r,n),qs.subVectors(a,n),Yl.subVectors(t,n);const h=Xs.dot(Yl),d=qs.dot(Yl);if(h<=0&&d<=0)return e.copy(n);jl.subVectors(t,r);const f=Xs.dot(jl),g=qs.dot(jl);if(f>=0&&g<=f)return e.copy(r);const m=h*g-f*d;if(m<=0&&h>=0&&f<=0)return l=h/(h-f),e.copy(n).addScaledVector(Xs,l);Kl.subVectors(t,a);const _=Xs.dot(Kl),M=qs.dot(Kl);if(M>=0&&_<=M)return e.copy(a);const w=_*d-h*M;if(w<=0&&d>=0&&M<=0)return c=d/(d-M),e.copy(n).addScaledVector(qs,c);const v=f*M-_*g;if(v<=0&&g-f>=0&&_-M>=0)return Wh.subVectors(a,r),c=(g-f)/(g-f+(_-M)),e.copy(r).addScaledVector(Wh,c);const y=1/(v+w+m);return l=w*y,c=m*y,e.copy(n).addScaledVector(Xs,l).addScaledVector(qs,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const wf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wi={h:0,s:0,l:0},ea={h:0,s:0,l:0};function Jl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class te{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=xe.workingColorSpace){return this.r=t,this.g=e,this.b=n,xe.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=xe.workingColorSpace){if(t=Dg(t,1),e=sn(e,0,1),n=sn(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,l=2*n-a;this.r=Jl(l,a,t+1/3),this.g=Jl(l,a,t),this.b=Jl(l,a,t-1/3)}return xe.toWorkingColorSpace(this,r),this}setStyle(t,e=ai){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const l=r[1],c=r[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ai){const n=wf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fr(t.r),this.g=fr(t.g),this.b=fr(t.b),this}copyLinearToSRGB(t){return this.r=Bl(t.r),this.g=Bl(t.g),this.b=Bl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ai){return xe.fromWorkingColorSpace(ln.copy(this),t),Math.round(sn(ln.r*255,0,255))*65536+Math.round(sn(ln.g*255,0,255))*256+Math.round(sn(ln.b*255,0,255))}getHexString(t=ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.fromWorkingColorSpace(ln.copy(this),e);const n=ln.r,r=ln.g,a=ln.b,l=Math.max(n,r,a),c=Math.min(n,r,a);let h,d;const f=(c+l)/2;if(c===l)h=0,d=0;else{const g=l-c;switch(d=f<=.5?g/(l+c):g/(2-l-c),l){case n:h=(r-a)/g+(r<a?6:0);break;case r:h=(a-n)/g+2;break;case a:h=(n-r)/g+4;break}h/=6}return t.h=h,t.s=d,t.l=f,t}getRGB(t,e=xe.workingColorSpace){return xe.fromWorkingColorSpace(ln.copy(this),e),t.r=ln.r,t.g=ln.g,t.b=ln.b,t}getStyle(t=ai){xe.fromWorkingColorSpace(ln.copy(this),t);const e=ln.r,n=ln.g,r=ln.b;return t!==ai?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Wi),this.setHSL(Wi.h+t,Wi.s+e,Wi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wi),t.getHSL(ea);const n=kl(Wi.h,ea.h,e),r=kl(Wi.s,ea.s,e),a=kl(Wi.l,ea.l,e);return this.setHSL(n,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*r,this.g=a[1]*e+a[4]*n+a[7]*r,this.b=a[2]*e+a[5]*n+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ln=new te;te.NAMES=wf;let jg=0;class Ar extends Ts{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=Er(),this.name="",this.type="Material",this.blending=hr,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=xc,this.blendEquation=gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new te(0,0,0),this.blendAlpha=0,this.depthFunc=La,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ch,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fs,this.stencilZFail=Fs,this.stencilZPass=Fs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hr&&(n.blending=this.blending),this.side!==Qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yc&&(n.blendSrc=this.blendSrc),this.blendDst!==xc&&(n.blendDst=this.blendDst),this.blendEquation!==gs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==La&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ch&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Fs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Fs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}if(e){const a=r(t.textures),l=r(t.images);a.length>0&&(n.textures=a),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Sf extends Ar{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ve=new V,na=new wt;class Jn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Ug("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)na.fromBufferAttribute(this,e),na.applyMatrix3(t),this.setXY(e,na.x,na.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Mn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Mn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Mn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Mn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Mn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Mn(e,this.array),n=Mn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Mn(e,this.array),n=Mn(n,this.array),r=Mn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,a){return t*=this.itemSize,this.normalized&&(e=Mn(e,this.array),n=Mn(n,this.array),r=Mn(r,this.array),a=Mn(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Rh&&(t.usage=this.usage),t}}class Ef extends Jn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Tf extends Jn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class We extends Jn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kg=0;const kn=new Me,Ql=new tn,$s=new V,Ln=new As,jr=new As,Ye=new V;class un extends Ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=Er(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xf(t)?Tf:Ef)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new oe().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return kn.makeRotationFromQuaternion(t),this.applyMatrix4(kn),this}rotateX(t){return kn.makeRotationX(t),this.applyMatrix4(kn),this}rotateY(t){return kn.makeRotationY(t),this.applyMatrix4(kn),this}rotateZ(t){return kn.makeRotationZ(t),this.applyMatrix4(kn),this}translate(t,e,n){return kn.makeTranslation(t,e,n),this.applyMatrix4(kn),this}scale(t,e,n){return kn.makeScale(t,e,n),this.applyMatrix4(kn),this}lookAt(t){return Ql.lookAt(t),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($s).negate(),this.translate($s.x,$s.y,$s.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];e.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new We(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new As);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const a=e[n];Ln.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Ln.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Ln.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Ln.min),this.boundingBox.expandByPoint(Ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tr);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const n=this.boundingSphere.center;if(Ln.setFromBufferAttribute(t),e)for(let a=0,l=e.length;a<l;a++){const c=e[a];jr.setFromBufferAttribute(c),this.morphTargetsRelative?(Ye.addVectors(Ln.min,jr.min),Ln.expandByPoint(Ye),Ye.addVectors(Ln.max,jr.max),Ln.expandByPoint(Ye)):(Ln.expandByPoint(jr.min),Ln.expandByPoint(jr.max))}Ln.getCenter(n);let r=0;for(let a=0,l=t.count;a<l;a++)Ye.fromBufferAttribute(t,a),r=Math.max(r,n.distanceToSquared(Ye));if(e)for(let a=0,l=e.length;a<l;a++){const c=e[a],h=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)Ye.fromBufferAttribute(c,d),h&&($s.fromBufferAttribute(t,d),Ye.add($s)),r=Math.max(r,n.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jn(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],h=[];for(let U=0;U<n.count;U++)c[U]=new V,h[U]=new V;const d=new V,f=new V,g=new V,m=new wt,_=new wt,M=new wt,w=new V,v=new V;function y(U,C,E){d.fromBufferAttribute(n,U),f.fromBufferAttribute(n,C),g.fromBufferAttribute(n,E),m.fromBufferAttribute(a,U),_.fromBufferAttribute(a,C),M.fromBufferAttribute(a,E),f.sub(d),g.sub(d),_.sub(m),M.sub(m);const B=1/(_.x*M.y-M.x*_.y);isFinite(B)&&(w.copy(f).multiplyScalar(M.y).addScaledVector(g,-_.y).multiplyScalar(B),v.copy(g).multiplyScalar(_.x).addScaledVector(f,-M.x).multiplyScalar(B),c[U].add(w),c[C].add(w),c[E].add(w),h[U].add(v),h[C].add(v),h[E].add(v))}let D=this.groups;D.length===0&&(D=[{start:0,count:t.count}]);for(let U=0,C=D.length;U<C;++U){const E=D[U],B=E.start,X=E.count;for(let F=B,W=B+X;F<W;F+=3)y(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const b=new V,A=new V,k=new V,I=new V;function R(U){k.fromBufferAttribute(r,U),I.copy(k);const C=c[U];b.copy(C),b.sub(k.multiplyScalar(k.dot(C))).normalize(),A.crossVectors(I,C);const B=A.dot(h[U])<0?-1:1;l.setXYZW(U,b.x,b.y,b.z,B)}for(let U=0,C=D.length;U<C;++U){const E=D[U],B=E.start,X=E.count;for(let F=B,W=B+X;F<W;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let m=0,_=n.count;m<_;m++)n.setXYZ(m,0,0,0);const r=new V,a=new V,l=new V,c=new V,h=new V,d=new V,f=new V,g=new V;if(t)for(let m=0,_=t.count;m<_;m+=3){const M=t.getX(m+0),w=t.getX(m+1),v=t.getX(m+2);r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,w),l.fromBufferAttribute(e,v),f.subVectors(l,a),g.subVectors(r,a),f.cross(g),c.fromBufferAttribute(n,M),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,v),c.add(f),h.add(f),d.add(f),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(w,h.x,h.y,h.z),n.setXYZ(v,d.x,d.y,d.z)}else for(let m=0,_=e.count;m<_;m+=3)r.fromBufferAttribute(e,m+0),a.fromBufferAttribute(e,m+1),l.fromBufferAttribute(e,m+2),f.subVectors(l,a),g.subVectors(r,a),f.cross(g),n.setXYZ(m+0,f.x,f.y,f.z),n.setXYZ(m+1,f.x,f.y,f.z),n.setXYZ(m+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(c,h){const d=c.array,f=c.itemSize,g=c.normalized,m=new d.constructor(h.length*f);let _=0,M=0;for(let w=0,v=h.length;w<v;w++){c.isInterleavedBufferAttribute?_=h[w]*c.data.stride+c.offset:_=h[w]*f;for(let y=0;y<f;y++)m[M++]=d[_++]}return new Jn(m,f,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new un,n=this.index.array,r=this.attributes;for(const c in r){const h=r[c],d=t(h,n);e.setAttribute(c,d)}const a=this.morphAttributes;for(const c in a){const h=[],d=a[c];for(let f=0,g=d.length;f<g;f++){const m=d[f],_=t(m,n);h.push(_)}e.morphAttributes[c]=h}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,h=l.length;c<h;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const d in h)h[d]!==void 0&&(t[d]=h[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const d=n[h];t.data.attributes[h]=d.toJSON(t.data)}const r={};let a=!1;for(const h in this.morphAttributes){const d=this.morphAttributes[h],f=[];for(let g=0,m=d.length;g<m;g++){const _=d[g];f.push(_.toJSON(t.data))}f.length>0&&(r[h]=f,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const d in r){const f=r[d];this.setAttribute(d,f.clone(e))}const a=t.morphAttributes;for(const d in a){const f=[],g=a[d];for(let m=0,_=g.length;m<_;m++)f.push(g[m].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const g=l[d];this.addGroup(g.start,g.count,g.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zh=new Me,hs=new Ka,ia=new Tr,Xh=new V,Ys=new V,js=new V,Ks=new V,tc=new V,sa=new V,ra=new wt,oa=new wt,aa=new wt,qh=new V,$h=new V,Yh=new V,la=new V,ca=new V;class De extends tn{constructor(t=new un,e=new Sf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const c=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const c=this.morphTargetInfluences;if(a&&c){sa.set(0,0,0);for(let h=0,d=a.length;h<d;h++){const f=c[h],g=a[h];f!==0&&(tc.fromBufferAttribute(g,t),l?sa.addScaledVector(tc,f):sa.addScaledVector(tc.sub(e),f))}e.add(sa)}return e}raycast(t,e){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ia.copy(n.boundingSphere),ia.applyMatrix4(a),hs.copy(t.ray).recast(t.near),!(ia.containsPoint(hs.origin)===!1&&(hs.intersectSphere(ia,Xh)===null||hs.origin.distanceToSquared(Xh)>(t.far-t.near)**2))&&(Zh.copy(a).invert(),hs.copy(t.ray).applyMatrix4(Zh),!(n.boundingBox!==null&&hs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hs)))}_computeIntersections(t,e,n){let r;const a=this.geometry,l=this.material,c=a.index,h=a.attributes.position,d=a.attributes.uv,f=a.attributes.uv1,g=a.attributes.normal,m=a.groups,_=a.drawRange;if(c!==null)if(Array.isArray(l))for(let M=0,w=m.length;M<w;M++){const v=m[M],y=l[v.materialIndex],D=Math.max(v.start,_.start),b=Math.min(c.count,Math.min(v.start+v.count,_.start+_.count));for(let A=D,k=b;A<k;A+=3){const I=c.getX(A),R=c.getX(A+1),U=c.getX(A+2);r=ua(this,y,t,n,d,f,g,I,R,U),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=v.materialIndex,e.push(r))}}else{const M=Math.max(0,_.start),w=Math.min(c.count,_.start+_.count);for(let v=M,y=w;v<y;v+=3){const D=c.getX(v),b=c.getX(v+1),A=c.getX(v+2);r=ua(this,l,t,n,d,f,g,D,b,A),r&&(r.faceIndex=Math.floor(v/3),e.push(r))}}else if(h!==void 0)if(Array.isArray(l))for(let M=0,w=m.length;M<w;M++){const v=m[M],y=l[v.materialIndex],D=Math.max(v.start,_.start),b=Math.min(h.count,Math.min(v.start+v.count,_.start+_.count));for(let A=D,k=b;A<k;A+=3){const I=A,R=A+1,U=A+2;r=ua(this,y,t,n,d,f,g,I,R,U),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=v.materialIndex,e.push(r))}}else{const M=Math.max(0,_.start),w=Math.min(h.count,_.start+_.count);for(let v=M,y=w;v<y;v+=3){const D=v,b=v+1,A=v+2;r=ua(this,l,t,n,d,f,g,D,b,A),r&&(r.faceIndex=Math.floor(v/3),e.push(r))}}}}function Jg(s,t,e,n,r,a,l,c){let h;if(t.side===Tn?h=n.intersectTriangle(l,a,r,!0,c):h=n.intersectTriangle(r,a,l,t.side===Qi,c),h===null)return null;ca.copy(c),ca.applyMatrix4(s.matrixWorld);const d=e.ray.origin.distanceTo(ca);return d<e.near||d>e.far?null:{distance:d,point:ca.clone(),object:s}}function ua(s,t,e,n,r,a,l,c,h,d){s.getVertexPosition(c,Ys),s.getVertexPosition(h,js),s.getVertexPosition(d,Ks);const f=Jg(s,t,e,n,Ys,js,Ks,la);if(f){r&&(ra.fromBufferAttribute(r,c),oa.fromBufferAttribute(r,h),aa.fromBufferAttribute(r,d),f.uv=jn.getInterpolation(la,Ys,js,Ks,ra,oa,aa,new wt)),a&&(ra.fromBufferAttribute(a,c),oa.fromBufferAttribute(a,h),aa.fromBufferAttribute(a,d),f.uv1=jn.getInterpolation(la,Ys,js,Ks,ra,oa,aa,new wt)),l&&(qh.fromBufferAttribute(l,c),$h.fromBufferAttribute(l,h),Yh.fromBufferAttribute(l,d),f.normal=jn.getInterpolation(la,Ys,js,Ks,qh,$h,Yh,new V),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const g={a:c,b:h,c:d,normal:new V,materialIndex:0};jn.getNormal(Ys,js,Ks,g.normal),f.face=g}return f}class Oi extends un{constructor(t=1,e=1,n=1,r=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:a,depthSegments:l};const c=this;r=Math.floor(r),a=Math.floor(a),l=Math.floor(l);const h=[],d=[],f=[],g=[];let m=0,_=0;M("z","y","x",-1,-1,n,e,t,l,a,0),M("z","y","x",1,-1,n,e,-t,l,a,1),M("x","z","y",1,1,t,n,e,r,l,2),M("x","z","y",1,-1,t,n,-e,r,l,3),M("x","y","z",1,-1,t,e,n,r,a,4),M("x","y","z",-1,-1,t,e,-n,r,a,5),this.setIndex(h),this.setAttribute("position",new We(d,3)),this.setAttribute("normal",new We(f,3)),this.setAttribute("uv",new We(g,2));function M(w,v,y,D,b,A,k,I,R,U,C){const E=A/R,B=k/U,X=A/2,F=k/2,W=I/2,Q=R+1,Y=U+1;let ft=0,z=0;const ct=new V;for(let G=0;G<Y;G++){const st=G*B-F;for(let yt=0;yt<Q;yt++){const bt=yt*E-X;ct[w]=bt*D,ct[v]=st*b,ct[y]=W,d.push(ct.x,ct.y,ct.z),ct[w]=0,ct[v]=0,ct[y]=I>0?1:-1,f.push(ct.x,ct.y,ct.z),g.push(yt/R),g.push(1-G/U),ft+=1}}for(let G=0;G<U;G++)for(let st=0;st<R;st++){const yt=m+st+Q*G,bt=m+st+Q*(G+1),Z=m+(st+1)+Q*(G+1),K=m+(st+1)+Q*G;h.push(yt,bt,K),h.push(bt,Z,K),z+=6}c.addGroup(_,z,C),_+=z,m+=ft}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Mr(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const r=s[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function mn(s){const t={};for(let e=0;e<s.length;e++){const n=Mr(s[e]);for(const r in n)t[r]=n[r]}return t}function Qg(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Af(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:xe.workingColorSpace}const t_={clone:Mr,merge:mn};var e_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ts extends Ar{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=e_,this.fragmentShader=n_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Mr(t.uniforms),this.uniformsGroups=Qg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const l=this.uniforms[r].value;l&&l.isTexture?e.uniforms[r]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[r]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[r]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[r]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[r]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[r]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[r]={type:"m4",value:l.toArray()}:e.uniforms[r]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lf extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Di}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zi=new V,jh=new wt,Kh=new wt;class Bn extends Lf{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ec*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(so*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ec*2*Math.atan(Math.tan(so*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z)}getViewSize(t,e){return this.getViewBounds(t,jh,Kh),e.subVectors(Kh,jh)}setViewOffset(t,e,n,r,a,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(so*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,a=-.5*r;const l=this.view;if(this.view!==null&&this.view.enabled){const h=l.fullWidth,d=l.fullHeight;a+=l.offsetX*r/h,e-=l.offsetY*n/d,r*=l.width/h,n*=l.height/d}const c=this.filmOffset;c!==0&&(a+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Js=-90,Qs=1;class i_ extends tn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bn(Js,Qs,t,e);r.layers=this.layers,this.add(r);const a=new Bn(Js,Qs,t,e);a.layers=this.layers,this.add(a);const l=new Bn(Js,Qs,t,e);l.layers=this.layers,this.add(l);const c=new Bn(Js,Qs,t,e);c.layers=this.layers,this.add(c);const h=new Bn(Js,Qs,t,e);h.layers=this.layers,this.add(h);const d=new Bn(Js,Qs,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,a,l,c,h]=e;for(const d of e)this.remove(d);if(t===Di)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Da)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,l,c,h,d,f]=this.children,g=t.getRenderTarget(),m=t.getActiveCubeFace(),_=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,a),t.setRenderTarget(n,1,r),t.render(e,l),t.setRenderTarget(n,2,r),t.render(e,c),t.setRenderTarget(n,3,r),t.render(e,h),t.setRenderTarget(n,4,r),t.render(e,d),n.texture.generateMipmaps=w,t.setRenderTarget(n,5,r),t.render(e,f),t.setRenderTarget(g,m,_),t.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class Pf extends cn{constructor(t,e,n,r,a,l,c,h,d,f){t=t!==void 0?t:[],e=e!==void 0?e:vr,super(t,e,n,r,a,l,c,h,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class s_ extends Ms{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Pf(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Yn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Oi(5,5,5),a=new ts({name:"CubemapFromEquirect",uniforms:Mr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tn,blending:ji});a.uniforms.tEquirect.value=e;const l=new De(r,a),c=e.minFilter;return e.minFilter===ys&&(e.minFilter=Yn),new i_(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,r){const a=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,r);t.setRenderTarget(a)}}const ec=new V,r_=new V,o_=new oe;class zn{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=ec.subVectors(n,e).cross(r_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ec),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||o_.getNormalMatrix(t),r=this.coplanarPoint(ec).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ds=new Tr,ha=new V;class Wc{constructor(t=new zn,e=new zn,n=new zn,r=new zn,a=new zn,l=new zn){this.planes=[t,e,n,r,a,l]}set(t,e,n,r,a,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(r),c[4].copy(a),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Di){const n=this.planes,r=t.elements,a=r[0],l=r[1],c=r[2],h=r[3],d=r[4],f=r[5],g=r[6],m=r[7],_=r[8],M=r[9],w=r[10],v=r[11],y=r[12],D=r[13],b=r[14],A=r[15];if(n[0].setComponents(h-a,m-d,v-_,A-y).normalize(),n[1].setComponents(h+a,m+d,v+_,A+y).normalize(),n[2].setComponents(h+l,m+f,v+M,A+D).normalize(),n[3].setComponents(h-l,m-f,v-M,A-D).normalize(),n[4].setComponents(h-c,m-g,v-w,A-b).normalize(),e===Di)n[5].setComponents(h+c,m+g,v+w,A+b).normalize();else if(e===Da)n[5].setComponents(c,g,w,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ds.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ds.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ds)}intersectsSprite(t){return ds.center.set(0,0,0),ds.radius=.7071067811865476,ds.applyMatrix4(t.matrixWorld),this.intersectsSphere(ds)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(ha.x=r.normal.x>0?t.max.x:t.min.x,ha.y=r.normal.y>0?t.max.y:t.min.y,ha.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ha)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cf(){let s=null,t=!1,e=null,n=null;function r(a,l){e(a,l),n=s.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(r),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){s=a}}}function a_(s){const t=new WeakMap;function e(c,h){const d=c.array,f=c.usage,g=d.byteLength,m=s.createBuffer();s.bindBuffer(h,m),s.bufferData(h,d,f),c.onUploadCallback();let _;if(d instanceof Float32Array)_=s.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?_=s.HALF_FLOAT:_=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=s.SHORT;else if(d instanceof Uint32Array)_=s.UNSIGNED_INT;else if(d instanceof Int32Array)_=s.INT;else if(d instanceof Int8Array)_=s.BYTE;else if(d instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:m,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:g}}function n(c,h,d){const f=h.array,g=h._updateRange,m=h.updateRanges;if(s.bindBuffer(d,c),g.count===-1&&m.length===0&&s.bufferSubData(d,0,f),m.length!==0){for(let _=0,M=m.length;_<M;_++){const w=m[_];s.bufferSubData(d,w.start*f.BYTES_PER_ELEMENT,f,w.start,w.count)}h.clearUpdateRanges()}g.count!==-1&&(s.bufferSubData(d,g.offset*f.BYTES_PER_ELEMENT,f,g.offset,g.count),g.count=-1),h.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=t.get(c);h&&(s.deleteBuffer(h.buffer),t.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,h),d.version=c.version}}return{get:r,remove:a,update:l}}class wo extends un{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const a=t/2,l=e/2,c=Math.floor(n),h=Math.floor(r),d=c+1,f=h+1,g=t/c,m=e/h,_=[],M=[],w=[],v=[];for(let y=0;y<f;y++){const D=y*m-l;for(let b=0;b<d;b++){const A=b*g-a;M.push(A,-D,0),w.push(0,0,1),v.push(b/c),v.push(1-y/h)}}for(let y=0;y<h;y++)for(let D=0;D<c;D++){const b=D+d*y,A=D+d*(y+1),k=D+1+d*(y+1),I=D+1+d*y;_.push(b,A,I),_.push(A,k,I)}this.setIndex(_),this.setAttribute("position",new We(M,3)),this.setAttribute("normal",new We(w,3)),this.setAttribute("uv",new We(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wo(t.width,t.height,t.widthSegments,t.heightSegments)}}var l_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,u_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,h_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,d_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,f_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,p_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,m_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,g_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,__=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,v_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,y_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,x_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,M_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,b_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,w_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,E_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,T_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,A_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,L_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,P_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,C_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,R_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,I_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,D_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,N_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,O_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,U_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,k_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,F_="gl_FragColor = linearToOutputTexel( gl_FragColor );",B_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,z_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,H_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,V_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,G_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,W_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Z_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,X_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Y_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,j_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,K_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,J_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Q_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,tv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ev=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,sv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,rv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ov=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,av=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,uv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_v=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Mv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,wv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Sv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Ev=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Tv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Av=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Rv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Iv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Dv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ov=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Uv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Fv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Hv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Gv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,Zv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Xv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,qv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$v=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,jv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Kv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,t0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,e0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	float startCompression = 0.8 - 0.04;
	float desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min(color.r, min(color.g, color.b));
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max(color.r, max(color.g, color.b));
	if (peak < startCompression) return color;
	float d = 1. - startCompression;
	float newPeak = 1. - d * d / (peak + d - startCompression);
	color *= newPeak / peak;
	float g = 1. - 1. / (desaturation * (peak - newPeak) + 1.);
	return mix(color, newPeak * vec3(1, 1, 1), g);
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,n0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,i0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,r0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,o0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,a0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const l0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,c0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,m0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,g0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,_0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,y0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,x0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,M0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,E0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,A0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,P0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,C0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,D0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,O0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,k0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,F0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,z0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,H0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,re={alphahash_fragment:l_,alphahash_pars_fragment:c_,alphamap_fragment:u_,alphamap_pars_fragment:h_,alphatest_fragment:d_,alphatest_pars_fragment:f_,aomap_fragment:p_,aomap_pars_fragment:m_,batching_pars_vertex:g_,batching_vertex:__,begin_vertex:v_,beginnormal_vertex:y_,bsdfs:x_,iridescence_fragment:M_,bumpmap_pars_fragment:b_,clipping_planes_fragment:w_,clipping_planes_pars_fragment:S_,clipping_planes_pars_vertex:E_,clipping_planes_vertex:T_,color_fragment:A_,color_pars_fragment:L_,color_pars_vertex:P_,color_vertex:C_,common:R_,cube_uv_reflection_fragment:I_,defaultnormal_vertex:D_,displacementmap_pars_vertex:N_,displacementmap_vertex:O_,emissivemap_fragment:U_,emissivemap_pars_fragment:k_,colorspace_fragment:F_,colorspace_pars_fragment:B_,envmap_fragment:z_,envmap_common_pars_fragment:H_,envmap_pars_fragment:V_,envmap_pars_vertex:G_,envmap_physical_pars_fragment:ev,envmap_vertex:W_,fog_vertex:Z_,fog_pars_vertex:X_,fog_fragment:q_,fog_pars_fragment:$_,gradientmap_pars_fragment:Y_,lightmap_fragment:j_,lightmap_pars_fragment:K_,lights_lambert_fragment:J_,lights_lambert_pars_fragment:Q_,lights_pars_begin:tv,lights_toon_fragment:nv,lights_toon_pars_fragment:iv,lights_phong_fragment:sv,lights_phong_pars_fragment:rv,lights_physical_fragment:ov,lights_physical_pars_fragment:av,lights_fragment_begin:lv,lights_fragment_maps:cv,lights_fragment_end:uv,logdepthbuf_fragment:hv,logdepthbuf_pars_fragment:dv,logdepthbuf_pars_vertex:fv,logdepthbuf_vertex:pv,map_fragment:mv,map_pars_fragment:gv,map_particle_fragment:_v,map_particle_pars_fragment:vv,metalnessmap_fragment:yv,metalnessmap_pars_fragment:xv,morphinstance_vertex:Mv,morphcolor_vertex:bv,morphnormal_vertex:wv,morphtarget_pars_vertex:Sv,morphtarget_vertex:Ev,normal_fragment_begin:Tv,normal_fragment_maps:Av,normal_pars_fragment:Lv,normal_pars_vertex:Pv,normal_vertex:Cv,normalmap_pars_fragment:Rv,clearcoat_normal_fragment_begin:Iv,clearcoat_normal_fragment_maps:Dv,clearcoat_pars_fragment:Nv,iridescence_pars_fragment:Ov,opaque_fragment:Uv,packing:kv,premultiplied_alpha_fragment:Fv,project_vertex:Bv,dithering_fragment:zv,dithering_pars_fragment:Hv,roughnessmap_fragment:Vv,roughnessmap_pars_fragment:Gv,shadowmap_pars_fragment:Wv,shadowmap_pars_vertex:Zv,shadowmap_vertex:Xv,shadowmask_pars_fragment:qv,skinbase_vertex:$v,skinning_pars_vertex:Yv,skinning_vertex:jv,skinnormal_vertex:Kv,specularmap_fragment:Jv,specularmap_pars_fragment:Qv,tonemapping_fragment:t0,tonemapping_pars_fragment:e0,transmission_fragment:n0,transmission_pars_fragment:i0,uv_pars_fragment:s0,uv_pars_vertex:r0,uv_vertex:o0,worldpos_vertex:a0,background_vert:l0,background_frag:c0,backgroundCube_vert:u0,backgroundCube_frag:h0,cube_vert:d0,cube_frag:f0,depth_vert:p0,depth_frag:m0,distanceRGBA_vert:g0,distanceRGBA_frag:_0,equirect_vert:v0,equirect_frag:y0,linedashed_vert:x0,linedashed_frag:M0,meshbasic_vert:b0,meshbasic_frag:w0,meshlambert_vert:S0,meshlambert_frag:E0,meshmatcap_vert:T0,meshmatcap_frag:A0,meshnormal_vert:L0,meshnormal_frag:P0,meshphong_vert:C0,meshphong_frag:R0,meshphysical_vert:I0,meshphysical_frag:D0,meshtoon_vert:N0,meshtoon_frag:O0,points_vert:U0,points_frag:k0,shadow_vert:F0,shadow_frag:B0,sprite_vert:z0,sprite_frag:H0},Lt={common:{diffuse:{value:new te(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new oe}},envmap:{envMap:{value:null},envMapRotation:{value:new oe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new oe},normalScale:{value:new wt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new te(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new te(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0},uvTransform:{value:new oe}},sprite:{diffuse:{value:new te(16777215)},opacity:{value:1},center:{value:new wt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}}},li={basic:{uniforms:mn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:re.meshbasic_vert,fragmentShader:re.meshbasic_frag},lambert:{uniforms:mn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new te(0)}}]),vertexShader:re.meshlambert_vert,fragmentShader:re.meshlambert_frag},phong:{uniforms:mn([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new te(0)},specular:{value:new te(1118481)},shininess:{value:30}}]),vertexShader:re.meshphong_vert,fragmentShader:re.meshphong_frag},standard:{uniforms:mn([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new te(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag},toon:{uniforms:mn([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new te(0)}}]),vertexShader:re.meshtoon_vert,fragmentShader:re.meshtoon_frag},matcap:{uniforms:mn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:re.meshmatcap_vert,fragmentShader:re.meshmatcap_frag},points:{uniforms:mn([Lt.points,Lt.fog]),vertexShader:re.points_vert,fragmentShader:re.points_frag},dashed:{uniforms:mn([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:re.linedashed_vert,fragmentShader:re.linedashed_frag},depth:{uniforms:mn([Lt.common,Lt.displacementmap]),vertexShader:re.depth_vert,fragmentShader:re.depth_frag},normal:{uniforms:mn([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:re.meshnormal_vert,fragmentShader:re.meshnormal_frag},sprite:{uniforms:mn([Lt.sprite,Lt.fog]),vertexShader:re.sprite_vert,fragmentShader:re.sprite_frag},background:{uniforms:{uvTransform:{value:new oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:re.background_vert,fragmentShader:re.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new oe}},vertexShader:re.backgroundCube_vert,fragmentShader:re.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:re.cube_vert,fragmentShader:re.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:re.equirect_vert,fragmentShader:re.equirect_frag},distanceRGBA:{uniforms:mn([Lt.common,Lt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:re.distanceRGBA_vert,fragmentShader:re.distanceRGBA_frag},shadow:{uniforms:mn([Lt.lights,Lt.fog,{color:{value:new te(0)},opacity:{value:1}}]),vertexShader:re.shadow_vert,fragmentShader:re.shadow_frag}};li.physical={uniforms:mn([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new oe},clearcoatNormalScale:{value:new wt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new oe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new oe},sheen:{value:0},sheenColor:{value:new te(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new oe},transmissionSamplerSize:{value:new wt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new oe},attenuationDistance:{value:0},attenuationColor:{value:new te(0)},specularColor:{value:new te(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new oe},anisotropyVector:{value:new wt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new oe}}]),vertexShader:re.meshphysical_vert,fragmentShader:re.meshphysical_frag};const da={r:0,b:0,g:0},fs=new _i,V0=new Me;function G0(s,t,e,n,r,a,l){const c=new te(0);let h=a===!0?0:1,d,f,g=null,m=0,_=null;function M(v,y){let D=!1,b=y.isScene===!0?y.background:null;b&&b.isTexture&&(b=(y.backgroundBlurriness>0?e:t).get(b)),b===null?w(c,h):b&&b.isColor&&(w(b,1),D=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,l):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(s.autoClear||D)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Ya)?(f===void 0&&(f=new De(new Oi(1,1,1),new ts({name:"BackgroundCubeMaterial",uniforms:Mr(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(k,I,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),fs.copy(y.backgroundRotation),fs.x*=-1,fs.y*=-1,fs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(fs.y*=-1,fs.z*=-1),f.material.uniforms.envMap.value=b,f.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(V0.makeRotationFromEuler(fs)),f.material.toneMapped=xe.getTransfer(b.colorSpace)!==Te,(g!==b||m!==b.version||_!==s.toneMapping)&&(f.material.needsUpdate=!0,g=b,m=b.version,_=s.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null)):b&&b.isTexture&&(d===void 0&&(d=new De(new wo(2,2),new ts({name:"BackgroundMaterial",uniforms:Mr(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=b,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.toneMapped=xe.getTransfer(b.colorSpace)!==Te,b.matrixAutoUpdate===!0&&b.updateMatrix(),d.material.uniforms.uvTransform.value.copy(b.matrix),(g!==b||m!==b.version||_!==s.toneMapping)&&(d.material.needsUpdate=!0,g=b,m=b.version,_=s.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null))}function w(v,y){v.getRGB(da,Af(s)),n.buffers.color.setClear(da.r,da.g,da.b,y,l)}return{getClearColor:function(){return c},setClearColor:function(v,y=1){c.set(v),h=y,w(c,h)},getClearAlpha:function(){return h},setClearAlpha:function(v){h=v,w(c,h)},render:M}}function W0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},r=m(null);let a=r,l=!1;function c(E,B,X,F,W){let Q=!1;const Y=g(F,X,B);a!==Y&&(a=Y,d(a.object)),Q=_(E,F,X,W),Q&&M(E,F,X,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(Q||l)&&(l=!1,A(E,B,X,F),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function h(){return s.createVertexArray()}function d(E){return s.bindVertexArray(E)}function f(E){return s.deleteVertexArray(E)}function g(E,B,X){const F=X.wireframe===!0;let W=n[E.id];W===void 0&&(W={},n[E.id]=W);let Q=W[B.id];Q===void 0&&(Q={},W[B.id]=Q);let Y=Q[F];return Y===void 0&&(Y=m(h()),Q[F]=Y),Y}function m(E){const B=[],X=[],F=[];for(let W=0;W<e;W++)B[W]=0,X[W]=0,F[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:X,attributeDivisors:F,object:E,attributes:{},index:null}}function _(E,B,X,F){const W=a.attributes,Q=B.attributes;let Y=0;const ft=X.getAttributes();for(const z in ft)if(ft[z].location>=0){const G=W[z];let st=Q[z];if(st===void 0&&(z==="instanceMatrix"&&E.instanceMatrix&&(st=E.instanceMatrix),z==="instanceColor"&&E.instanceColor&&(st=E.instanceColor)),G===void 0||G.attribute!==st||st&&G.data!==st.data)return!0;Y++}return a.attributesNum!==Y||a.index!==F}function M(E,B,X,F){const W={},Q=B.attributes;let Y=0;const ft=X.getAttributes();for(const z in ft)if(ft[z].location>=0){let G=Q[z];G===void 0&&(z==="instanceMatrix"&&E.instanceMatrix&&(G=E.instanceMatrix),z==="instanceColor"&&E.instanceColor&&(G=E.instanceColor));const st={};st.attribute=G,G&&G.data&&(st.data=G.data),W[z]=st,Y++}a.attributes=W,a.attributesNum=Y,a.index=F}function w(){const E=a.newAttributes;for(let B=0,X=E.length;B<X;B++)E[B]=0}function v(E){y(E,0)}function y(E,B){const X=a.newAttributes,F=a.enabledAttributes,W=a.attributeDivisors;X[E]=1,F[E]===0&&(s.enableVertexAttribArray(E),F[E]=1),W[E]!==B&&(s.vertexAttribDivisor(E,B),W[E]=B)}function D(){const E=a.newAttributes,B=a.enabledAttributes;for(let X=0,F=B.length;X<F;X++)B[X]!==E[X]&&(s.disableVertexAttribArray(X),B[X]=0)}function b(E,B,X,F,W,Q,Y){Y===!0?s.vertexAttribIPointer(E,B,X,W,Q):s.vertexAttribPointer(E,B,X,F,W,Q)}function A(E,B,X,F){w();const W=F.attributes,Q=X.getAttributes(),Y=B.defaultAttributeValues;for(const ft in Q){const z=Q[ft];if(z.location>=0){let ct=W[ft];if(ct===void 0&&(ft==="instanceMatrix"&&E.instanceMatrix&&(ct=E.instanceMatrix),ft==="instanceColor"&&E.instanceColor&&(ct=E.instanceColor)),ct!==void 0){const G=ct.normalized,st=ct.itemSize,yt=t.get(ct);if(yt===void 0)continue;const bt=yt.buffer,Z=yt.type,K=yt.bytesPerElement,ut=Z===s.INT||Z===s.UNSIGNED_INT||ct.gpuType===uf;if(ct.isInterleavedBufferAttribute){const _t=ct.data,St=_t.stride,At=ct.offset;if(_t.isInstancedInterleavedBuffer){for(let It=0;It<z.locationSize;It++)y(z.location+It,_t.meshPerAttribute);E.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let It=0;It<z.locationSize;It++)v(z.location+It);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let It=0;It<z.locationSize;It++)b(z.location+It,st/z.locationSize,Z,G,St*K,(At+st/z.locationSize*It)*K,ut)}else{if(ct.isInstancedBufferAttribute){for(let _t=0;_t<z.locationSize;_t++)y(z.location+_t,ct.meshPerAttribute);E.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let _t=0;_t<z.locationSize;_t++)v(z.location+_t);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let _t=0;_t<z.locationSize;_t++)b(z.location+_t,st/z.locationSize,Z,G,st*K,st/z.locationSize*_t*K,ut)}}else if(Y!==void 0){const G=Y[ft];if(G!==void 0)switch(G.length){case 2:s.vertexAttrib2fv(z.location,G);break;case 3:s.vertexAttrib3fv(z.location,G);break;case 4:s.vertexAttrib4fv(z.location,G);break;default:s.vertexAttrib1fv(z.location,G)}}}}D()}function k(){U();for(const E in n){const B=n[E];for(const X in B){const F=B[X];for(const W in F)f(F[W].object),delete F[W];delete B[X]}delete n[E]}}function I(E){if(n[E.id]===void 0)return;const B=n[E.id];for(const X in B){const F=B[X];for(const W in F)f(F[W].object),delete F[W];delete B[X]}delete n[E.id]}function R(E){for(const B in n){const X=n[B];if(X[E.id]===void 0)continue;const F=X[E.id];for(const W in F)f(F[W].object),delete F[W];delete X[E.id]}}function U(){C(),l=!0,a!==r&&(a=r,d(a.object))}function C(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:U,resetDefaultState:C,dispose:k,releaseStatesOfGeometry:I,releaseStatesOfProgram:R,initAttributes:w,enableAttribute:v,disableUnusedAttributes:D}}function Z0(s,t,e){let n;function r(h){n=h}function a(h,d){s.drawArrays(n,h,d),e.update(d,n,1)}function l(h,d,f){f!==0&&(s.drawArraysInstanced(n,h,d,f),e.update(d,n,f))}function c(h,d,f){if(f===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<f;m++)this.render(h[m],d[m]);else{g.multiDrawArraysWEBGL(n,h,0,d,0,f);let m=0;for(let _=0;_<f;_++)m+=d[_];e.update(m,n,1)}}this.setMode=r,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function X0(s,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=a(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,D=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,precision:l,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:m,maxAttributes:_,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:v,vertexTextures:y,maxSamples:D}}function q0(s){const t=this;let e=null,n=0,r=!1,a=!1;const l=new zn,c=new oe,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(g,m){const _=g.length!==0||m||n!==0||r;return r=m,n=g.length,_},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(g,m){e=f(g,m,0)},this.setState=function(g,m,_){const M=g.clippingPlanes,w=g.clipIntersection,v=g.clipShadows,y=s.get(g);if(!r||M===null||M.length===0||a&&!v)a?f(null):d();else{const D=a?0:n,b=D*4;let A=y.clippingState||null;h.value=A,A=f(M,m,b,_);for(let k=0;k!==b;++k)A[k]=e[k];y.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=D}};function d(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(g,m,_,M){const w=g!==null?g.length:0;let v=null;if(w!==0){if(v=h.value,M!==!0||v===null){const y=_+w*4,D=m.matrixWorldInverse;c.getNormalMatrix(D),(v===null||v.length<y)&&(v=new Float32Array(y));for(let b=0,A=_;b!==w;++b,A+=4)l.copy(g[b]).applyMatrix4(D,c),l.normal.toArray(v,A),v[A+3]=l.constant}h.value=v,h.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,v}}function $0(s){let t=new WeakMap;function e(l,c){return c===Mc?l.mapping=vr:c===bc&&(l.mapping=yr),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===Mc||c===bc)if(t.has(l)){const h=t.get(l).texture;return e(h,l.mapping)}else{const h=l.image;if(h&&h.height>0){const d=new s_(h.height);return d.fromEquirectangularTexture(s,l),t.set(l,d),l.addEventListener("dispose",r),e(d.texture,l.mapping)}else return null}}return l}function r(l){const c=l.target;c.removeEventListener("dispose",r);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class Rf extends Lf{constructor(t=-1,e=1,n=1,r=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-t,l=n+t,c=r+e,h=r-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,c-=f*this.view.offsetY,h=c-f*this.view.height}this.projectionMatrix.makeOrthographic(a,l,c,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ar=4,Jh=[.125,.215,.35,.446,.526,.582],_s=20,nc=new Rf,Qh=new te;let ic=null,sc=0,rc=0,oc=!1;const ms=(1+Math.sqrt(5))/2,tr=1/ms,td=[new V(1,1,1),new V(-1,1,1),new V(1,1,-1),new V(-1,1,-1),new V(0,ms,tr),new V(0,ms,-tr),new V(tr,0,ms),new V(-tr,0,ms),new V(ms,tr,0),new V(-ms,tr,0)];class ed{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){ic=this._renderer.getRenderTarget(),sc=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=id(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ic,sc,rc),this._renderer.xr.enabled=oc,t.scissorTest=!1,fa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===vr||t.mapping===yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ic=this._renderer.getRenderTarget(),sc=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),oc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Yn,minFilter:Yn,generateMipmaps:!1,type:Pa,format:di,colorSpace:es,depthBuffer:!1},r=nd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=nd(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Y0(a)),this._blurMaterial=j0(a,t,e)}return r}_compileMaterial(t){const e=new De(this._lodPlanes[0],t);this._renderer.compile(e,nc)}_sceneToCubeUV(t,e,n,r){const c=new Bn(90,1,e,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,g=f.autoClear,m=f.toneMapping;f.getClearColor(Qh),f.toneMapping=Ki,f.autoClear=!1;const _=new Sf({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1}),M=new De(new Oi,_);let w=!1;const v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,w=!0):(_.color.copy(Qh),w=!0);for(let y=0;y<6;y++){const D=y%3;D===0?(c.up.set(0,h[y],0),c.lookAt(d[y],0,0)):D===1?(c.up.set(0,0,h[y]),c.lookAt(0,d[y],0)):(c.up.set(0,h[y],0),c.lookAt(0,0,d[y]));const b=this._cubeSize;fa(r,D*b,y>2?b:0,b,b),f.setRenderTarget(r),w&&f.render(M,c),f.render(t,c)}M.geometry.dispose(),M.material.dispose(),f.toneMapping=m,f.autoClear=g,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===vr||t.mapping===yr;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=id());const a=r?this._cubemapMaterial:this._equirectMaterial,l=new De(this._lodPlanes[0],a),c=a.uniforms;c.envMap.value=t;const h=this._cubeSize;fa(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(l,nc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=td[(r-1)%td.length];this._blur(t,r-1,r,a,l)}e.autoClear=n}_blur(t,e,n,r,a){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,r,"latitudinal",a),this._halfBlur(l,t,n,n,r,"longitudinal",a)}_halfBlur(t,e,n,r,a,l,c){const h=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,g=new De(this._lodPlanes[r],d),m=d.uniforms,_=this._sizeLods[n]-1,M=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*_s-1),w=a/M,v=isFinite(a)?1+Math.floor(f*w):_s;v>_s&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${_s}`);const y=[];let D=0;for(let R=0;R<_s;++R){const U=R/w,C=Math.exp(-U*U/2);y.push(C),R===0?D+=C:R<v&&(D+=2*C)}for(let R=0;R<y.length;R++)y[R]=y[R]/D;m.envMap.value=t.texture,m.samples.value=v,m.weights.value=y,m.latitudinal.value=l==="latitudinal",c&&(m.poleAxis.value=c);const{_lodMax:b}=this;m.dTheta.value=M,m.mipInt.value=b-n;const A=this._sizeLods[r],k=3*A*(r>b-ar?r-b+ar:0),I=4*(this._cubeSize-A);fa(e,k,I,3*A,2*A),h.setRenderTarget(e),h.render(g,nc)}}function Y0(s){const t=[],e=[],n=[];let r=s;const a=s-ar+1+Jh.length;for(let l=0;l<a;l++){const c=Math.pow(2,r);e.push(c);let h=1/c;l>s-ar?h=Jh[l-s+ar-1]:l===0&&(h=0),n.push(h);const d=1/(c-2),f=-d,g=1+d,m=[f,f,g,f,g,g,f,f,g,g,f,g],_=6,M=6,w=3,v=2,y=1,D=new Float32Array(w*M*_),b=new Float32Array(v*M*_),A=new Float32Array(y*M*_);for(let I=0;I<_;I++){const R=I%3*2/3-1,U=I>2?0:-1,C=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];D.set(C,w*M*I),b.set(m,v*M*I);const E=[I,I,I,I,I,I];A.set(E,y*M*I)}const k=new un;k.setAttribute("position",new Jn(D,w)),k.setAttribute("uv",new Jn(b,v)),k.setAttribute("faceIndex",new Jn(A,y)),t.push(k),r>ar&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function nd(s,t,e){const n=new Ms(s,t,e);return n.texture.mapping=Ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function fa(s,t,e,n,r){s.viewport.set(t,e,n,r),s.scissor.set(t,e,n,r)}function j0(s,t,e){const n=new Float32Array(_s),r=new V(0,1,0);return new ts({name:"SphericalGaussianBlur",defines:{n:_s,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function id(){return new ts({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function sd(){return new ts({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Zc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function K0(s){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const h=c.mapping,d=h===Mc||h===bc,f=h===vr||h===yr;if(d||f){let g=t.get(c);const m=g!==void 0?g.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==m)return e===null&&(e=new ed(s)),g=d?e.fromEquirectangular(c,g):e.fromCubemap(c,g),g.texture.pmremVersion=c.pmremVersion,t.set(c,g),g.texture;if(g!==void 0)return g.texture;{const _=c.image;return d&&_&&_.height>0||f&&_&&r(_)?(e===null&&(e=new ed(s)),g=d?e.fromEquirectangular(c):e.fromCubemap(c),g.texture.pmremVersion=c.pmremVersion,t.set(c,g),c.addEventListener("dispose",a),g.texture):null}}}return c}function r(c){let h=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&h++;return h===d}function a(c){const h=c.target;h.removeEventListener("dispose",a);const d=t.get(h);d!==void 0&&(t.delete(h),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function J0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=s.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function Q0(s,t,e,n){const r={},a=new WeakMap;function l(g){const m=g.target;m.index!==null&&t.remove(m.index);for(const M in m.attributes)t.remove(m.attributes[M]);for(const M in m.morphAttributes){const w=m.morphAttributes[M];for(let v=0,y=w.length;v<y;v++)t.remove(w[v])}m.removeEventListener("dispose",l),delete r[m.id];const _=a.get(m);_&&(t.remove(_),a.delete(m)),n.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,e.memory.geometries--}function c(g,m){return r[m.id]===!0||(m.addEventListener("dispose",l),r[m.id]=!0,e.memory.geometries++),m}function h(g){const m=g.attributes;for(const M in m)t.update(m[M],s.ARRAY_BUFFER);const _=g.morphAttributes;for(const M in _){const w=_[M];for(let v=0,y=w.length;v<y;v++)t.update(w[v],s.ARRAY_BUFFER)}}function d(g){const m=[],_=g.index,M=g.attributes.position;let w=0;if(_!==null){const D=_.array;w=_.version;for(let b=0,A=D.length;b<A;b+=3){const k=D[b+0],I=D[b+1],R=D[b+2];m.push(k,I,I,R,R,k)}}else if(M!==void 0){const D=M.array;w=M.version;for(let b=0,A=D.length/3-1;b<A;b+=3){const k=b+0,I=b+1,R=b+2;m.push(k,I,I,R,R,k)}}else return;const v=new(xf(m)?Tf:Ef)(m,1);v.version=w;const y=a.get(g);y&&t.remove(y),a.set(g,v)}function f(g){const m=a.get(g);if(m){const _=g.index;_!==null&&m.version<_.version&&d(g)}else d(g);return a.get(g)}return{get:c,update:h,getWireframeAttribute:f}}function ty(s,t,e){let n;function r(g){n=g}let a,l;function c(g){a=g.type,l=g.bytesPerElement}function h(g,m){s.drawElements(n,m,a,g*l),e.update(m,n,1)}function d(g,m,_){_!==0&&(s.drawElementsInstanced(n,m,a,g*l,_),e.update(m,n,_))}function f(g,m,_){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let w=0;w<_;w++)this.render(g[w]/l,m[w]);else{M.multiDrawElementsWEBGL(n,m,0,a,g,0,_);let w=0;for(let v=0;v<_;v++)w+=m[v];e.update(w,n,1)}}this.setMode=r,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function ey(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,l,c){switch(e.calls++,l){case s.TRIANGLES:e.triangles+=c*(a/3);break;case s.LINES:e.lines+=c*(a/2);break;case s.LINE_STRIP:e.lines+=c*(a-1);break;case s.LINE_LOOP:e.lines+=c*a;break;case s.POINTS:e.points+=c*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function ny(s,t,e){const n=new WeakMap,r=new Qe;function a(l,c,h){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,g=f!==void 0?f.length:0;let m=n.get(c);if(m===void 0||m.count!==g){let C=function(){R.dispose(),n.delete(c),c.removeEventListener("dispose",C)};m!==void 0&&m.texture.dispose();const _=c.morphAttributes.position!==void 0,M=c.morphAttributes.normal!==void 0,w=c.morphAttributes.color!==void 0,v=c.morphAttributes.position||[],y=c.morphAttributes.normal||[],D=c.morphAttributes.color||[];let b=0;_===!0&&(b=1),M===!0&&(b=2),w===!0&&(b=3);let A=c.attributes.position.count*b,k=1;A>t.maxTextureSize&&(k=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const I=new Float32Array(A*k*4*g),R=new bf(I,A,k,g);R.type=Ii,R.needsUpdate=!0;const U=b*4;for(let E=0;E<g;E++){const B=v[E],X=y[E],F=D[E],W=A*k*4*E;for(let Q=0;Q<B.count;Q++){const Y=Q*U;_===!0&&(r.fromBufferAttribute(B,Q),I[W+Y+0]=r.x,I[W+Y+1]=r.y,I[W+Y+2]=r.z,I[W+Y+3]=0),M===!0&&(r.fromBufferAttribute(X,Q),I[W+Y+4]=r.x,I[W+Y+5]=r.y,I[W+Y+6]=r.z,I[W+Y+7]=0),w===!0&&(r.fromBufferAttribute(F,Q),I[W+Y+8]=r.x,I[W+Y+9]=r.y,I[W+Y+10]=r.z,I[W+Y+11]=F.itemSize===4?r.w:1)}}m={count:g,texture:R,size:new wt(A,k)},n.set(c,m),c.addEventListener("dispose",C)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",l.morphTexture,e);else{let _=0;for(let w=0;w<d.length;w++)_+=d[w];const M=c.morphTargetsRelative?1:1-_;h.getUniforms().setValue(s,"morphTargetBaseInfluence",M),h.getUniforms().setValue(s,"morphTargetInfluences",d)}h.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}return{update:a}}function iy(s,t,e,n){let r=new WeakMap;function a(h){const d=n.render.frame,f=h.geometry,g=t.get(h,f);if(r.get(g)!==d&&(t.update(g),r.set(g,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),r.get(h)!==d&&(e.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,s.ARRAY_BUFFER),r.set(h,d))),h.isSkinnedMesh){const m=h.skeleton;r.get(m)!==d&&(m.update(),r.set(m,d))}return g}function l(){r=new WeakMap}function c(h){const d=h.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:l}}class If extends cn{constructor(t,e,n,r,a,l,c,h,d,f){if(f=f!==void 0?f:dr,f!==dr&&f!==po)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===dr&&(n=xr),n===void 0&&f===po&&(n=bo),super(null,r,a,l,c,h,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:En,this.minFilter=h!==void 0?h:En,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Df=new cn,Nf=new If(1,1);Nf.compareFunction=yf;const Of=new bf,Uf=new Vg,kf=new Pf,rd=[],od=[],ad=new Float32Array(16),ld=new Float32Array(9),cd=new Float32Array(4);function Lr(s,t,e){const n=s[0];if(n<=0||n>0)return s;const r=t*e;let a=rd[r];if(a===void 0&&(a=new Float32Array(r),rd[r]=a),t!==0){n.toArray(a,0);for(let l=1,c=0;l!==t;++l)c+=e,s[l].toArray(a,c)}return a}function Ze(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Xe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ja(s,t){let e=od[t];e===void 0&&(e=new Int32Array(t),od[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function sy(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ry(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;s.uniform2fv(this.addr,t),Xe(e,t)}}function oy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;s.uniform3fv(this.addr,t),Xe(e,t)}}function ay(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;s.uniform4fv(this.addr,t),Xe(e,t)}}function ly(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(Ze(e,n))return;cd.set(n),s.uniformMatrix2fv(this.addr,!1,cd),Xe(e,n)}}function cy(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(Ze(e,n))return;ld.set(n),s.uniformMatrix3fv(this.addr,!1,ld),Xe(e,n)}}function uy(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(Ze(e,n))return;ad.set(n),s.uniformMatrix4fv(this.addr,!1,ad),Xe(e,n)}}function hy(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function dy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;s.uniform2iv(this.addr,t),Xe(e,t)}}function fy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;s.uniform3iv(this.addr,t),Xe(e,t)}}function py(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;s.uniform4iv(this.addr,t),Xe(e,t)}}function my(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function gy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;s.uniform2uiv(this.addr,t),Xe(e,t)}}function _y(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;s.uniform3uiv(this.addr,t),Xe(e,t)}}function vy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;s.uniform4uiv(this.addr,t),Xe(e,t)}}function yy(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r);const a=this.type===s.SAMPLER_2D_SHADOW?Nf:Df;e.setTexture2D(t||a,r)}function xy(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Uf,r)}function My(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||kf,r)}function by(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Of,r)}function wy(s){switch(s){case 5126:return sy;case 35664:return ry;case 35665:return oy;case 35666:return ay;case 35674:return ly;case 35675:return cy;case 35676:return uy;case 5124:case 35670:return hy;case 35667:case 35671:return dy;case 35668:case 35672:return fy;case 35669:case 35673:return py;case 5125:return my;case 36294:return gy;case 36295:return _y;case 36296:return vy;case 35678:case 36198:case 36298:case 36306:case 35682:return yy;case 35679:case 36299:case 36307:return xy;case 35680:case 36300:case 36308:case 36293:return My;case 36289:case 36303:case 36311:case 36292:return by}}function Sy(s,t){s.uniform1fv(this.addr,t)}function Ey(s,t){const e=Lr(t,this.size,2);s.uniform2fv(this.addr,e)}function Ty(s,t){const e=Lr(t,this.size,3);s.uniform3fv(this.addr,e)}function Ay(s,t){const e=Lr(t,this.size,4);s.uniform4fv(this.addr,e)}function Ly(s,t){const e=Lr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Py(s,t){const e=Lr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Cy(s,t){const e=Lr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Ry(s,t){s.uniform1iv(this.addr,t)}function Iy(s,t){s.uniform2iv(this.addr,t)}function Dy(s,t){s.uniform3iv(this.addr,t)}function Ny(s,t){s.uniform4iv(this.addr,t)}function Oy(s,t){s.uniform1uiv(this.addr,t)}function Uy(s,t){s.uniform2uiv(this.addr,t)}function ky(s,t){s.uniform3uiv(this.addr,t)}function Fy(s,t){s.uniform4uiv(this.addr,t)}function By(s,t,e){const n=this.cache,r=t.length,a=Ja(e,r);Ze(n,a)||(s.uniform1iv(this.addr,a),Xe(n,a));for(let l=0;l!==r;++l)e.setTexture2D(t[l]||Df,a[l])}function zy(s,t,e){const n=this.cache,r=t.length,a=Ja(e,r);Ze(n,a)||(s.uniform1iv(this.addr,a),Xe(n,a));for(let l=0;l!==r;++l)e.setTexture3D(t[l]||Uf,a[l])}function Hy(s,t,e){const n=this.cache,r=t.length,a=Ja(e,r);Ze(n,a)||(s.uniform1iv(this.addr,a),Xe(n,a));for(let l=0;l!==r;++l)e.setTextureCube(t[l]||kf,a[l])}function Vy(s,t,e){const n=this.cache,r=t.length,a=Ja(e,r);Ze(n,a)||(s.uniform1iv(this.addr,a),Xe(n,a));for(let l=0;l!==r;++l)e.setTexture2DArray(t[l]||Of,a[l])}function Gy(s){switch(s){case 5126:return Sy;case 35664:return Ey;case 35665:return Ty;case 35666:return Ay;case 35674:return Ly;case 35675:return Py;case 35676:return Cy;case 5124:case 35670:return Ry;case 35667:case 35671:return Iy;case 35668:case 35672:return Dy;case 35669:case 35673:return Ny;case 5125:return Oy;case 36294:return Uy;case 36295:return ky;case 36296:return Fy;case 35678:case 36198:case 36298:case 36306:case 35682:return By;case 35679:case 36299:case 36307:return zy;case 35680:case 36300:case 36308:case 36293:return Hy;case 36289:case 36303:case 36311:case 36292:return Vy}}class Wy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wy(e.type)}}class Zy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gy(e.type)}}class Xy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let a=0,l=r.length;a!==l;++a){const c=r[a];c.setValue(t,e[c.id],n)}}}const ac=/(\w+)(\])?(\[|\.)?/g;function ud(s,t){s.seq.push(t),s.map[t.id]=t}function qy(s,t,e){const n=s.name,r=n.length;for(ac.lastIndex=0;;){const a=ac.exec(n),l=ac.lastIndex;let c=a[1];const h=a[2]==="]",d=a[3];if(h&&(c=c|0),d===void 0||d==="["&&l+2===r){ud(e,d===void 0?new Wy(c,s,t):new Zy(c,s,t));break}else{let g=e.map[c];g===void 0&&(g=new Xy(c),ud(e,g)),e=g}}}class wa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=t.getActiveUniform(e,r),l=t.getUniformLocation(e,a.name);qy(a,l,this)}}setValue(t,e,n,r){const a=this.map[e];a!==void 0&&a.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let a=0,l=e.length;a!==l;++a){const c=e[a],h=n[c.id];h.needsUpdate!==!1&&c.setValue(t,h.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,a=t.length;r!==a;++r){const l=t[r];l.id in e&&n.push(l)}return n}}function hd(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const $y=37297;let Yy=0;function jy(s,t){const e=s.split(`
`),n=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let l=r;l<a;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function Ky(s){const t=xe.getPrimaries(xe.workingColorSpace),e=xe.getPrimaries(s);let n;switch(t===e?n="":t===Ia&&e===Ra?n="LinearDisplayP3ToLinearSRGB":t===Ra&&e===Ia&&(n="LinearSRGBToLinearDisplayP3"),s){case es:case ja:return[n,"LinearTransferOETF"];case ai:case Vc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function dd(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=s.getShaderInfoLog(t).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+jy(s.getShaderSource(t),l)}else return r}function Jy(s,t){const e=Ky(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Qy(s,t){let e;switch(t){case og:e="Linear";break;case ag:e="Reinhard";break;case lg:e="OptimizedCineon";break;case cg:e="ACESFilmic";break;case hg:e="AgX";break;case dg:e="Neutral";break;case ug:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function tx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(no).join(`
`)}function ex(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function nx(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=s.getActiveAttrib(t,r),l=a.name;let c=1;a.type===s.FLOAT_MAT2&&(c=2),a.type===s.FLOAT_MAT3&&(c=3),a.type===s.FLOAT_MAT4&&(c=4),e[l]={type:a.type,location:s.getAttribLocation(t,l),locationSize:c}}return e}function no(s){return s!==""}function fd(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function pd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function Tc(s){return s.replace(ix,rx)}const sx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function rx(s,t){let e=re[t];if(e===void 0){const n=sx.get(t);if(n!==void 0)e=re[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Tc(e)}const ox=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function md(s){return s.replace(ox,ax)}function ax(s,t,e,n){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function gd(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function lx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===af?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Im?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ci&&(t="SHADOWMAP_TYPE_VSM"),t}function cx(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case vr:case yr:t="ENVMAP_TYPE_CUBE";break;case Ya:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ux(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case yr:t="ENVMAP_MODE_REFRACTION";break}return t}function hx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Hc:t="ENVMAP_BLENDING_MULTIPLY";break;case sg:t="ENVMAP_BLENDING_MIX";break;case rg:t="ENVMAP_BLENDING_ADD";break}return t}function dx(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function fx(s,t,e,n){const r=s.getContext(),a=e.defines;let l=e.vertexShader,c=e.fragmentShader;const h=lx(e),d=cx(e),f=ux(e),g=hx(e),m=dx(e),_=tx(e),M=ex(a),w=r.createProgram();let v,y,D=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(no).join(`
`),v.length>0&&(v+=`
`),y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(no).join(`
`),y.length>0&&(y+=`
`)):(v=[gd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(no).join(`
`),y=[gd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+g:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ki?"#define TONE_MAPPING":"",e.toneMapping!==Ki?re.tonemapping_pars_fragment:"",e.toneMapping!==Ki?Qy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",re.colorspace_pars_fragment,Jy("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(no).join(`
`)),l=Tc(l),l=fd(l,e),l=pd(l,e),c=Tc(c),c=fd(c,e),c=pd(c,e),l=md(l),c=md(c),e.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,v=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,y=["#define varying in",e.glslVersion===Ih?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ih?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const b=D+v+l,A=D+y+c,k=hd(r,r.VERTEX_SHADER,b),I=hd(r,r.FRAGMENT_SHADER,A);r.attachShader(w,k),r.attachShader(w,I),e.index0AttributeName!==void 0?r.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function R(B){if(s.debug.checkShaderErrors){const X=r.getProgramInfoLog(w).trim(),F=r.getShaderInfoLog(k).trim(),W=r.getShaderInfoLog(I).trim();let Q=!0,Y=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(r,w,k,I);else{const ft=dd(r,k,"vertex"),z=dd(r,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+X+`
`+ft+`
`+z)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(F===""||W==="")&&(Y=!1);Y&&(B.diagnostics={runnable:Q,programLog:X,vertexShader:{log:F,prefix:v},fragmentShader:{log:W,prefix:y}})}r.deleteShader(k),r.deleteShader(I),U=new wa(r,w),C=nx(r,w)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let C;this.getAttributes=function(){return C===void 0&&R(this),C};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(w,$y)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yy++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=k,this.fragmentShader=I,this}let px=0;class mx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(r)===!1&&(l.add(r),r.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new gx(t),e.set(t,n)),n}}class gx{constructor(t){this.id=px++,this.code=t,this.usedTimes=0}}function _x(s,t,e,n,r,a,l){const c=new Gc,h=new mx,d=new Set,f=[],g=r.logarithmicDepthBuffer,m=r.vertexTextures;let _=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(C){return d.add(C),C===0?"uv":`uv${C}`}function v(C,E,B,X,F){const W=X.fog,Q=F.geometry,Y=C.isMeshStandardMaterial?X.environment:null,ft=(C.isMeshStandardMaterial?e:t).get(C.envMap||Y),z=ft&&ft.mapping===Ya?ft.image.height:null,ct=M[C.type];C.precision!==null&&(_=r.getMaxPrecision(C.precision),_!==C.precision&&console.warn("THREE.WebGLProgram.getParameters:",C.precision,"not supported, using",_,"instead."));const G=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,st=G!==void 0?G.length:0;let yt=0;Q.morphAttributes.position!==void 0&&(yt=1),Q.morphAttributes.normal!==void 0&&(yt=2),Q.morphAttributes.color!==void 0&&(yt=3);let bt,Z,K,ut;if(ct){const Fe=li[ct];bt=Fe.vertexShader,Z=Fe.fragmentShader}else bt=C.vertexShader,Z=C.fragmentShader,h.update(C),K=h.getVertexShaderID(C),ut=h.getFragmentShaderID(C);const _t=s.getRenderTarget(),St=F.isInstancedMesh===!0,At=F.isBatchedMesh===!0,It=!!C.map,q=!!C.matcap,at=!!ft,ht=!!C.aoMap,gt=!!C.lightMap,dt=!!C.bumpMap,pt=!!C.normalMap,N=!!C.displacementMap,T=!!C.emissiveMap,$=!!C.metalnessMap,rt=!!C.roughnessMap,lt=C.anisotropy>0,vt=C.clearcoat>0,kt=C.iridescence>0,xt=C.sheen>0,zt=C.transmission>0,Wt=lt&&!!C.anisotropyMap,Et=vt&&!!C.clearcoatMap,Ct=vt&&!!C.clearcoatNormalMap,qt=vt&&!!C.clearcoatRoughnessMap,Ot=kt&&!!C.iridescenceMap,Ut=kt&&!!C.iridescenceThicknessMap,le=xt&&!!C.sheenColorMap,ce=xt&&!!C.sheenRoughnessMap,fe=!!C.specularMap,de=!!C.specularColorMap,ge=!!C.specularIntensityMap,Ft=zt&&!!C.transmissionMap,S=zt&&!!C.thicknessMap,tt=!!C.gradientMap,mt=!!C.alphaMap,Tt=C.alphaTest>0,Dt=!!C.alphaHash,he=!!C.extensions;let ae=Ki;C.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(ae=s.toneMapping);const be={shaderID:ct,shaderType:C.type,shaderName:C.name,vertexShader:bt,fragmentShader:Z,defines:C.defines,customVertexShaderID:K,customFragmentShaderID:ut,isRawShaderMaterial:C.isRawShaderMaterial===!0,glslVersion:C.glslVersion,precision:_,batching:At,instancing:St,instancingColor:St&&F.instanceColor!==null,instancingMorph:St&&F.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:_t===null?s.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:es,alphaToCoverage:!!C.alphaToCoverage,map:It,matcap:q,envMap:at,envMapMode:at&&ft.mapping,envMapCubeUVHeight:z,aoMap:ht,lightMap:gt,bumpMap:dt,normalMap:pt,displacementMap:m&&N,emissiveMap:T,normalMapObjectSpace:pt&&C.normalMapType===Eg,normalMapTangentSpace:pt&&C.normalMapType===vf,metalnessMap:$,roughnessMap:rt,anisotropy:lt,anisotropyMap:Wt,clearcoat:vt,clearcoatMap:Et,clearcoatNormalMap:Ct,clearcoatRoughnessMap:qt,iridescence:kt,iridescenceMap:Ot,iridescenceThicknessMap:Ut,sheen:xt,sheenColorMap:le,sheenRoughnessMap:ce,specularMap:fe,specularColorMap:de,specularIntensityMap:ge,transmission:zt,transmissionMap:Ft,thicknessMap:S,gradientMap:tt,opaque:C.transparent===!1&&C.blending===hr&&C.alphaToCoverage===!1,alphaMap:mt,alphaTest:Tt,alphaHash:Dt,combine:C.combine,mapUv:It&&w(C.map.channel),aoMapUv:ht&&w(C.aoMap.channel),lightMapUv:gt&&w(C.lightMap.channel),bumpMapUv:dt&&w(C.bumpMap.channel),normalMapUv:pt&&w(C.normalMap.channel),displacementMapUv:N&&w(C.displacementMap.channel),emissiveMapUv:T&&w(C.emissiveMap.channel),metalnessMapUv:$&&w(C.metalnessMap.channel),roughnessMapUv:rt&&w(C.roughnessMap.channel),anisotropyMapUv:Wt&&w(C.anisotropyMap.channel),clearcoatMapUv:Et&&w(C.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&w(C.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qt&&w(C.clearcoatRoughnessMap.channel),iridescenceMapUv:Ot&&w(C.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&w(C.iridescenceThicknessMap.channel),sheenColorMapUv:le&&w(C.sheenColorMap.channel),sheenRoughnessMapUv:ce&&w(C.sheenRoughnessMap.channel),specularMapUv:fe&&w(C.specularMap.channel),specularColorMapUv:de&&w(C.specularColorMap.channel),specularIntensityMapUv:ge&&w(C.specularIntensityMap.channel),transmissionMapUv:Ft&&w(C.transmissionMap.channel),thicknessMapUv:S&&w(C.thicknessMap.channel),alphaMapUv:mt&&w(C.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(pt||lt),vertexColors:C.vertexColors,vertexAlphas:C.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Q.attributes.uv&&(It||mt),fog:!!W,useFog:C.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:C.flatShading===!0,sizeAttenuation:C.sizeAttenuation===!0,logarithmicDepthBuffer:g,skinning:F.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:yt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:C.dithering,shadowMapEnabled:s.shadowMap.enabled&&B.length>0,shadowMapType:s.shadowMap.type,toneMapping:ae,useLegacyLights:s._useLegacyLights,decodeVideoTexture:It&&C.map.isVideoTexture===!0&&xe.getTransfer(C.map.colorSpace)===Te,premultipliedAlpha:C.premultipliedAlpha,doubleSided:C.side===Hn,flipSided:C.side===Tn,useDepthPacking:C.depthPacking>=0,depthPacking:C.depthPacking||0,index0AttributeName:C.index0AttributeName,extensionClipCullDistance:he&&C.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:he&&C.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:C.customProgramCacheKey()};return be.vertexUv1s=d.has(1),be.vertexUv2s=d.has(2),be.vertexUv3s=d.has(3),d.clear(),be}function y(C){const E=[];if(C.shaderID?E.push(C.shaderID):(E.push(C.customVertexShaderID),E.push(C.customFragmentShaderID)),C.defines!==void 0)for(const B in C.defines)E.push(B),E.push(C.defines[B]);return C.isRawShaderMaterial===!1&&(D(E,C),b(E,C),E.push(s.outputColorSpace)),E.push(C.customProgramCacheKey),E.join()}function D(C,E){C.push(E.precision),C.push(E.outputColorSpace),C.push(E.envMapMode),C.push(E.envMapCubeUVHeight),C.push(E.mapUv),C.push(E.alphaMapUv),C.push(E.lightMapUv),C.push(E.aoMapUv),C.push(E.bumpMapUv),C.push(E.normalMapUv),C.push(E.displacementMapUv),C.push(E.emissiveMapUv),C.push(E.metalnessMapUv),C.push(E.roughnessMapUv),C.push(E.anisotropyMapUv),C.push(E.clearcoatMapUv),C.push(E.clearcoatNormalMapUv),C.push(E.clearcoatRoughnessMapUv),C.push(E.iridescenceMapUv),C.push(E.iridescenceThicknessMapUv),C.push(E.sheenColorMapUv),C.push(E.sheenRoughnessMapUv),C.push(E.specularMapUv),C.push(E.specularColorMapUv),C.push(E.specularIntensityMapUv),C.push(E.transmissionMapUv),C.push(E.thicknessMapUv),C.push(E.combine),C.push(E.fogExp2),C.push(E.sizeAttenuation),C.push(E.morphTargetsCount),C.push(E.morphAttributeCount),C.push(E.numDirLights),C.push(E.numPointLights),C.push(E.numSpotLights),C.push(E.numSpotLightMaps),C.push(E.numHemiLights),C.push(E.numRectAreaLights),C.push(E.numDirLightShadows),C.push(E.numPointLightShadows),C.push(E.numSpotLightShadows),C.push(E.numSpotLightShadowsWithMaps),C.push(E.numLightProbes),C.push(E.shadowMapType),C.push(E.toneMapping),C.push(E.numClippingPlanes),C.push(E.numClipIntersection),C.push(E.depthPacking)}function b(C,E){c.disableAll(),E.supportsVertexTextures&&c.enable(0),E.instancing&&c.enable(1),E.instancingColor&&c.enable(2),E.instancingMorph&&c.enable(3),E.matcap&&c.enable(4),E.envMap&&c.enable(5),E.normalMapObjectSpace&&c.enable(6),E.normalMapTangentSpace&&c.enable(7),E.clearcoat&&c.enable(8),E.iridescence&&c.enable(9),E.alphaTest&&c.enable(10),E.vertexColors&&c.enable(11),E.vertexAlphas&&c.enable(12),E.vertexUv1s&&c.enable(13),E.vertexUv2s&&c.enable(14),E.vertexUv3s&&c.enable(15),E.vertexTangents&&c.enable(16),E.anisotropy&&c.enable(17),E.alphaHash&&c.enable(18),E.batching&&c.enable(19),C.push(c.mask),c.disableAll(),E.fog&&c.enable(0),E.useFog&&c.enable(1),E.flatShading&&c.enable(2),E.logarithmicDepthBuffer&&c.enable(3),E.skinning&&c.enable(4),E.morphTargets&&c.enable(5),E.morphNormals&&c.enable(6),E.morphColors&&c.enable(7),E.premultipliedAlpha&&c.enable(8),E.shadowMapEnabled&&c.enable(9),E.useLegacyLights&&c.enable(10),E.doubleSided&&c.enable(11),E.flipSided&&c.enable(12),E.useDepthPacking&&c.enable(13),E.dithering&&c.enable(14),E.transmission&&c.enable(15),E.sheen&&c.enable(16),E.opaque&&c.enable(17),E.pointsUvs&&c.enable(18),E.decodeVideoTexture&&c.enable(19),E.alphaToCoverage&&c.enable(20),C.push(c.mask)}function A(C){const E=M[C.type];let B;if(E){const X=li[E];B=t_.clone(X.uniforms)}else B=C.uniforms;return B}function k(C,E){let B;for(let X=0,F=f.length;X<F;X++){const W=f[X];if(W.cacheKey===E){B=W,++B.usedTimes;break}}return B===void 0&&(B=new fx(s,E,C,a),f.push(B)),B}function I(C){if(--C.usedTimes===0){const E=f.indexOf(C);f[E]=f[f.length-1],f.pop(),C.destroy()}}function R(C){h.remove(C)}function U(){h.dispose()}return{getParameters:v,getProgramCacheKey:y,getUniforms:A,acquireProgram:k,releaseProgram:I,releaseShaderCache:R,programs:f,dispose:U}}function vx(){let s=new WeakMap;function t(a){let l=s.get(a);return l===void 0&&(l={},s.set(a,l)),l}function e(a){s.delete(a)}function n(a,l,c){s.get(a)[l]=c}function r(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function yx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function _d(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function vd(){const s=[];let t=0;const e=[],n=[],r=[];function a(){t=0,e.length=0,n.length=0,r.length=0}function l(g,m,_,M,w,v){let y=s[t];return y===void 0?(y={id:g.id,object:g,geometry:m,material:_,groupOrder:M,renderOrder:g.renderOrder,z:w,group:v},s[t]=y):(y.id=g.id,y.object=g,y.geometry=m,y.material=_,y.groupOrder=M,y.renderOrder=g.renderOrder,y.z=w,y.group=v),t++,y}function c(g,m,_,M,w,v){const y=l(g,m,_,M,w,v);_.transmission>0?n.push(y):_.transparent===!0?r.push(y):e.push(y)}function h(g,m,_,M,w,v){const y=l(g,m,_,M,w,v);_.transmission>0?n.unshift(y):_.transparent===!0?r.unshift(y):e.unshift(y)}function d(g,m){e.length>1&&e.sort(g||yx),n.length>1&&n.sort(m||_d),r.length>1&&r.sort(m||_d)}function f(){for(let g=t,m=s.length;g<m;g++){const _=s[g];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:r,init:a,push:c,unshift:h,finish:f,sort:d}}function xx(){let s=new WeakMap;function t(n,r){const a=s.get(n);let l;return a===void 0?(l=new vd,s.set(n,[l])):r>=a.length?(l=new vd,a.push(l)):l=a[r],l}function e(){s=new WeakMap}return{get:t,dispose:e}}function Mx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new te};break;case"SpotLight":e={position:new V,direction:new V,color:new te,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new te,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new te,groundColor:new te};break;case"RectAreaLight":e={color:new te,position:new V,halfWidth:new V,halfHeight:new V};break}return s[t.id]=e,e}}}function bx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new wt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let wx=0;function Sx(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Ex(s){const t=new Mx,e=bx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new V);const r=new V,a=new Me,l=new Me;function c(d,f){let g=0,m=0,_=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let M=0,w=0,v=0,y=0,D=0,b=0,A=0,k=0,I=0,R=0,U=0;d.sort(Sx);const C=f===!0?Math.PI:1;for(let B=0,X=d.length;B<X;B++){const F=d[B],W=F.color,Q=F.intensity,Y=F.distance,ft=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)g+=W.r*Q*C,m+=W.g*Q*C,_+=W.b*Q*C;else if(F.isLightProbe){for(let z=0;z<9;z++)n.probe[z].addScaledVector(F.sh.coefficients[z],Q);U++}else if(F.isDirectionalLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity*C),F.castShadow){const ct=F.shadow,G=e.get(F);G.shadowBias=ct.bias,G.shadowNormalBias=ct.normalBias,G.shadowRadius=ct.radius,G.shadowMapSize=ct.mapSize,n.directionalShadow[M]=G,n.directionalShadowMap[M]=ft,n.directionalShadowMatrix[M]=F.shadow.matrix,b++}n.directional[M]=z,M++}else if(F.isSpotLight){const z=t.get(F);z.position.setFromMatrixPosition(F.matrixWorld),z.color.copy(W).multiplyScalar(Q*C),z.distance=Y,z.coneCos=Math.cos(F.angle),z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),z.decay=F.decay,n.spot[v]=z;const ct=F.shadow;if(F.map&&(n.spotLightMap[I]=F.map,I++,ct.updateMatrices(F),F.castShadow&&R++),n.spotLightMatrix[v]=ct.matrix,F.castShadow){const G=e.get(F);G.shadowBias=ct.bias,G.shadowNormalBias=ct.normalBias,G.shadowRadius=ct.radius,G.shadowMapSize=ct.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=ft,k++}v++}else if(F.isRectAreaLight){const z=t.get(F);z.color.copy(W).multiplyScalar(Q),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),n.rectArea[y]=z,y++}else if(F.isPointLight){const z=t.get(F);if(z.color.copy(F.color).multiplyScalar(F.intensity*C),z.distance=F.distance,z.decay=F.decay,F.castShadow){const ct=F.shadow,G=e.get(F);G.shadowBias=ct.bias,G.shadowNormalBias=ct.normalBias,G.shadowRadius=ct.radius,G.shadowMapSize=ct.mapSize,G.shadowCameraNear=ct.camera.near,G.shadowCameraFar=ct.camera.far,n.pointShadow[w]=G,n.pointShadowMap[w]=ft,n.pointShadowMatrix[w]=F.shadow.matrix,A++}n.point[w]=z,w++}else if(F.isHemisphereLight){const z=t.get(F);z.skyColor.copy(F.color).multiplyScalar(Q*C),z.groundColor.copy(F.groundColor).multiplyScalar(Q*C),n.hemi[D]=z,D++}}y>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Lt.LTC_FLOAT_1,n.rectAreaLTC2=Lt.LTC_FLOAT_2):(n.rectAreaLTC1=Lt.LTC_HALF_1,n.rectAreaLTC2=Lt.LTC_HALF_2)),n.ambient[0]=g,n.ambient[1]=m,n.ambient[2]=_;const E=n.hash;(E.directionalLength!==M||E.pointLength!==w||E.spotLength!==v||E.rectAreaLength!==y||E.hemiLength!==D||E.numDirectionalShadows!==b||E.numPointShadows!==A||E.numSpotShadows!==k||E.numSpotMaps!==I||E.numLightProbes!==U)&&(n.directional.length=M,n.spot.length=v,n.rectArea.length=y,n.point.length=w,n.hemi.length=D,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=k,n.spotShadowMap.length=k,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=k+I-R,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=U,E.directionalLength=M,E.pointLength=w,E.spotLength=v,E.rectAreaLength=y,E.hemiLength=D,E.numDirectionalShadows=b,E.numPointShadows=A,E.numSpotShadows=k,E.numSpotMaps=I,E.numLightProbes=U,n.version=wx++)}function h(d,f){let g=0,m=0,_=0,M=0,w=0;const v=f.matrixWorldInverse;for(let y=0,D=d.length;y<D;y++){const b=d[y];if(b.isDirectionalLight){const A=n.directional[g];A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(v),g++}else if(b.isSpotLight){const A=n.spot[_];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(v),A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(v),_++}else if(b.isRectAreaLight){const A=n.rectArea[M];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(v),l.identity(),a.copy(b.matrixWorld),a.premultiply(v),l.extractRotation(a),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(l),A.halfHeight.applyMatrix4(l),M++}else if(b.isPointLight){const A=n.point[m];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(v),m++}else if(b.isHemisphereLight){const A=n.hemi[w];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(v),w++}}}return{setup:c,setupView:h,state:n}}function yd(s){const t=new Ex(s),e=[],n=[];function r(){e.length=0,n.length=0}function a(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function h(f){t.setupView(e,f)}return{init:r,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:h,pushLight:a,pushShadow:l}}function Tx(s){let t=new WeakMap;function e(r,a=0){const l=t.get(r);let c;return l===void 0?(c=new yd(s),t.set(r,[c])):a>=l.length?(c=new yd(s),l.push(c)):c=l[a],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class Ax extends Ar{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Lx extends Ar{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Px=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Rx(s,t,e){let n=new Wc;const r=new wt,a=new wt,l=new Qe,c=new Ax({depthPacking:Sg}),h=new Lx,d={},f=e.maxTextureSize,g={[Qi]:Tn,[Tn]:Qi,[Hn]:Hn},m=new ts({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new wt},radius:{value:4}},vertexShader:Px,fragmentShader:Cx}),_=m.clone();_.defines.HORIZONTAL_PASS=1;const M=new un;M.setAttribute("position",new Jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new De(M,m),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=af;let y=this.type;this.render=function(I,R,U){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||I.length===0)return;const C=s.getRenderTarget(),E=s.getActiveCubeFace(),B=s.getActiveMipmapLevel(),X=s.state;X.setBlending(ji),X.buffers.color.setClear(1,1,1,1),X.buffers.depth.setTest(!0),X.setScissorTest(!1);const F=y!==Ci&&this.type===Ci,W=y===Ci&&this.type!==Ci;for(let Q=0,Y=I.length;Q<Y;Q++){const ft=I[Q],z=ft.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",ft,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const ct=z.getFrameExtents();if(r.multiply(ct),a.copy(z.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(a.x=Math.floor(f/ct.x),r.x=a.x*ct.x,z.mapSize.x=a.x),r.y>f&&(a.y=Math.floor(f/ct.y),r.y=a.y*ct.y,z.mapSize.y=a.y)),z.map===null||F===!0||W===!0){const st=this.type!==Ci?{minFilter:En,magFilter:En}:{};z.map!==null&&z.map.dispose(),z.map=new Ms(r.x,r.y,st),z.map.texture.name=ft.name+".shadowMap",z.camera.updateProjectionMatrix()}s.setRenderTarget(z.map),s.clear();const G=z.getViewportCount();for(let st=0;st<G;st++){const yt=z.getViewport(st);l.set(a.x*yt.x,a.y*yt.y,a.x*yt.z,a.y*yt.w),X.viewport(l),z.updateMatrices(ft,st),n=z.getFrustum(),A(R,U,z.camera,ft,this.type)}z.isPointLightShadow!==!0&&this.type===Ci&&D(z,U),z.needsUpdate=!1}y=this.type,v.needsUpdate=!1,s.setRenderTarget(C,E,B)};function D(I,R){const U=t.update(w);m.defines.VSM_SAMPLES!==I.blurSamples&&(m.defines.VSM_SAMPLES=I.blurSamples,_.defines.VSM_SAMPLES=I.blurSamples,m.needsUpdate=!0,_.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Ms(r.x,r.y)),m.uniforms.shadow_pass.value=I.map.texture,m.uniforms.resolution.value=I.mapSize,m.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(R,null,U,m,w,null),_.uniforms.shadow_pass.value=I.mapPass.texture,_.uniforms.resolution.value=I.mapSize,_.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(R,null,U,_,w,null)}function b(I,R,U,C){let E=null;const B=U.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(B!==void 0)E=B;else if(E=U.isPointLight===!0?h:c,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const X=E.uuid,F=R.uuid;let W=d[X];W===void 0&&(W={},d[X]=W);let Q=W[F];Q===void 0&&(Q=E.clone(),W[F]=Q,R.addEventListener("dispose",k)),E=Q}if(E.visible=R.visible,E.wireframe=R.wireframe,C===Ci?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:g[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const X=s.properties.get(E);X.light=U}return E}function A(I,R,U,C,E){if(I.visible===!1)return;if(I.layers.test(R.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&E===Ci)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,I.matrixWorld);const F=t.update(I),W=I.material;if(Array.isArray(W)){const Q=F.groups;for(let Y=0,ft=Q.length;Y<ft;Y++){const z=Q[Y],ct=W[z.materialIndex];if(ct&&ct.visible){const G=b(I,ct,C,E);I.onBeforeShadow(s,I,R,U,F,G,z),s.renderBufferDirect(U,null,F,G,I,z),I.onAfterShadow(s,I,R,U,F,G,z)}}}else if(W.visible){const Q=b(I,W,C,E);I.onBeforeShadow(s,I,R,U,F,Q,null),s.renderBufferDirect(U,null,F,Q,I,null),I.onAfterShadow(s,I,R,U,F,Q,null)}}const X=I.children;for(let F=0,W=X.length;F<W;F++)A(X[F],R,U,C,E)}function k(I){I.target.removeEventListener("dispose",k);for(const U in d){const C=d[U],E=I.target.uuid;E in C&&(C[E].dispose(),delete C[E])}}}function Ix(s){function t(){let S=!1;const tt=new Qe;let mt=null;const Tt=new Qe(0,0,0,0);return{setMask:function(Dt){mt!==Dt&&!S&&(s.colorMask(Dt,Dt,Dt,Dt),mt=Dt)},setLocked:function(Dt){S=Dt},setClear:function(Dt,he,ae,be,Fe){Fe===!0&&(Dt*=be,he*=be,ae*=be),tt.set(Dt,he,ae,be),Tt.equals(tt)===!1&&(s.clearColor(Dt,he,ae,be),Tt.copy(tt))},reset:function(){S=!1,mt=null,Tt.set(-1,0,0,0)}}}function e(){let S=!1,tt=null,mt=null,Tt=null;return{setTest:function(Dt){Dt?ut(s.DEPTH_TEST):_t(s.DEPTH_TEST)},setMask:function(Dt){tt!==Dt&&!S&&(s.depthMask(Dt),tt=Dt)},setFunc:function(Dt){if(mt!==Dt){switch(Dt){case Km:s.depthFunc(s.NEVER);break;case Jm:s.depthFunc(s.ALWAYS);break;case Qm:s.depthFunc(s.LESS);break;case La:s.depthFunc(s.LEQUAL);break;case tg:s.depthFunc(s.EQUAL);break;case eg:s.depthFunc(s.GEQUAL);break;case ng:s.depthFunc(s.GREATER);break;case ig:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}mt=Dt}},setLocked:function(Dt){S=Dt},setClear:function(Dt){Tt!==Dt&&(s.clearDepth(Dt),Tt=Dt)},reset:function(){S=!1,tt=null,mt=null,Tt=null}}}function n(){let S=!1,tt=null,mt=null,Tt=null,Dt=null,he=null,ae=null,be=null,Fe=null;return{setTest:function(ye){S||(ye?ut(s.STENCIL_TEST):_t(s.STENCIL_TEST))},setMask:function(ye){tt!==ye&&!S&&(s.stencilMask(ye),tt=ye)},setFunc:function(ye,Ne,Pe){(mt!==ye||Tt!==Ne||Dt!==Pe)&&(s.stencilFunc(ye,Ne,Pe),mt=ye,Tt=Ne,Dt=Pe)},setOp:function(ye,Ne,Pe){(he!==ye||ae!==Ne||be!==Pe)&&(s.stencilOp(ye,Ne,Pe),he=ye,ae=Ne,be=Pe)},setLocked:function(ye){S=ye},setClear:function(ye){Fe!==ye&&(s.clearStencil(ye),Fe=ye)},reset:function(){S=!1,tt=null,mt=null,Tt=null,Dt=null,he=null,ae=null,be=null,Fe=null}}}const r=new t,a=new e,l=new n,c=new WeakMap,h=new WeakMap;let d={},f={},g=new WeakMap,m=[],_=null,M=!1,w=null,v=null,y=null,D=null,b=null,A=null,k=null,I=new te(0,0,0),R=0,U=!1,C=null,E=null,B=null,X=null,F=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,Y=0;const ft=s.getParameter(s.VERSION);ft.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(ft)[1]),Q=Y>=1):ft.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(ft)[1]),Q=Y>=2);let z=null,ct={};const G=s.getParameter(s.SCISSOR_BOX),st=s.getParameter(s.VIEWPORT),yt=new Qe().fromArray(G),bt=new Qe().fromArray(st);function Z(S,tt,mt,Tt){const Dt=new Uint8Array(4),he=s.createTexture();s.bindTexture(S,he),s.texParameteri(S,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(S,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ae=0;ae<mt;ae++)S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY?s.texImage3D(tt,0,s.RGBA,1,1,Tt,0,s.RGBA,s.UNSIGNED_BYTE,Dt):s.texImage2D(tt+ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Dt);return he}const K={};K[s.TEXTURE_2D]=Z(s.TEXTURE_2D,s.TEXTURE_2D,1),K[s.TEXTURE_CUBE_MAP]=Z(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[s.TEXTURE_2D_ARRAY]=Z(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),K[s.TEXTURE_3D]=Z(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),ut(s.DEPTH_TEST),a.setFunc(La),dt(!1),pt(eh),ut(s.CULL_FACE),ht(ji);function ut(S){d[S]!==!0&&(s.enable(S),d[S]=!0)}function _t(S){d[S]!==!1&&(s.disable(S),d[S]=!1)}function St(S,tt){return f[S]!==tt?(s.bindFramebuffer(S,tt),f[S]=tt,S===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=tt),S===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=tt),!0):!1}function At(S,tt){let mt=m,Tt=!1;if(S){mt=g.get(tt),mt===void 0&&(mt=[],g.set(tt,mt));const Dt=S.textures;if(mt.length!==Dt.length||mt[0]!==s.COLOR_ATTACHMENT0){for(let he=0,ae=Dt.length;he<ae;he++)mt[he]=s.COLOR_ATTACHMENT0+he;mt.length=Dt.length,Tt=!0}}else mt[0]!==s.BACK&&(mt[0]=s.BACK,Tt=!0);Tt&&s.drawBuffers(mt)}function It(S){return _!==S?(s.useProgram(S),_=S,!0):!1}const q={[gs]:s.FUNC_ADD,[Nm]:s.FUNC_SUBTRACT,[Om]:s.FUNC_REVERSE_SUBTRACT};q[Um]=s.MIN,q[km]=s.MAX;const at={[Fm]:s.ZERO,[Bm]:s.ONE,[zm]:s.SRC_COLOR,[yc]:s.SRC_ALPHA,[Xm]:s.SRC_ALPHA_SATURATE,[Wm]:s.DST_COLOR,[Vm]:s.DST_ALPHA,[Hm]:s.ONE_MINUS_SRC_COLOR,[xc]:s.ONE_MINUS_SRC_ALPHA,[Zm]:s.ONE_MINUS_DST_COLOR,[Gm]:s.ONE_MINUS_DST_ALPHA,[qm]:s.CONSTANT_COLOR,[$m]:s.ONE_MINUS_CONSTANT_COLOR,[Ym]:s.CONSTANT_ALPHA,[jm]:s.ONE_MINUS_CONSTANT_ALPHA};function ht(S,tt,mt,Tt,Dt,he,ae,be,Fe,ye){if(S===ji){M===!0&&(_t(s.BLEND),M=!1);return}if(M===!1&&(ut(s.BLEND),M=!0),S!==Dm){if(S!==w||ye!==U){if((v!==gs||b!==gs)&&(s.blendEquation(s.FUNC_ADD),v=gs,b=gs),ye)switch(S){case hr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nh:s.blendFunc(s.ONE,s.ONE);break;case ih:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case sh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case hr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case nh:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case ih:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case sh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}y=null,D=null,A=null,k=null,I.set(0,0,0),R=0,w=S,U=ye}return}Dt=Dt||tt,he=he||mt,ae=ae||Tt,(tt!==v||Dt!==b)&&(s.blendEquationSeparate(q[tt],q[Dt]),v=tt,b=Dt),(mt!==y||Tt!==D||he!==A||ae!==k)&&(s.blendFuncSeparate(at[mt],at[Tt],at[he],at[ae]),y=mt,D=Tt,A=he,k=ae),(be.equals(I)===!1||Fe!==R)&&(s.blendColor(be.r,be.g,be.b,Fe),I.copy(be),R=Fe),w=S,U=!1}function gt(S,tt){S.side===Hn?_t(s.CULL_FACE):ut(s.CULL_FACE);let mt=S.side===Tn;tt&&(mt=!mt),dt(mt),S.blending===hr&&S.transparent===!1?ht(ji):ht(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),a.setFunc(S.depthFunc),a.setTest(S.depthTest),a.setMask(S.depthWrite),r.setMask(S.colorWrite);const Tt=S.stencilWrite;l.setTest(Tt),Tt&&(l.setMask(S.stencilWriteMask),l.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),l.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),T(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?ut(s.SAMPLE_ALPHA_TO_COVERAGE):_t(s.SAMPLE_ALPHA_TO_COVERAGE)}function dt(S){C!==S&&(S?s.frontFace(s.CW):s.frontFace(s.CCW),C=S)}function pt(S){S!==Cm?(ut(s.CULL_FACE),S!==E&&(S===eh?s.cullFace(s.BACK):S===Rm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):_t(s.CULL_FACE),E=S}function N(S){S!==B&&(Q&&s.lineWidth(S),B=S)}function T(S,tt,mt){S?(ut(s.POLYGON_OFFSET_FILL),(X!==tt||F!==mt)&&(s.polygonOffset(tt,mt),X=tt,F=mt)):_t(s.POLYGON_OFFSET_FILL)}function $(S){S?ut(s.SCISSOR_TEST):_t(s.SCISSOR_TEST)}function rt(S){S===void 0&&(S=s.TEXTURE0+W-1),z!==S&&(s.activeTexture(S),z=S)}function lt(S,tt,mt){mt===void 0&&(z===null?mt=s.TEXTURE0+W-1:mt=z);let Tt=ct[mt];Tt===void 0&&(Tt={type:void 0,texture:void 0},ct[mt]=Tt),(Tt.type!==S||Tt.texture!==tt)&&(z!==mt&&(s.activeTexture(mt),z=mt),s.bindTexture(S,tt||K[S]),Tt.type=S,Tt.texture=tt)}function vt(){const S=ct[z];S!==void 0&&S.type!==void 0&&(s.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function kt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function xt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function zt(){try{s.texSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Wt(){try{s.texSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Et(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ct(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function qt(){try{s.texStorage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ot(){try{s.texStorage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ut(){try{s.texImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function le(){try{s.texImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ce(S){yt.equals(S)===!1&&(s.scissor(S.x,S.y,S.z,S.w),yt.copy(S))}function fe(S){bt.equals(S)===!1&&(s.viewport(S.x,S.y,S.z,S.w),bt.copy(S))}function de(S,tt){let mt=h.get(tt);mt===void 0&&(mt=new WeakMap,h.set(tt,mt));let Tt=mt.get(S);Tt===void 0&&(Tt=s.getUniformBlockIndex(tt,S.name),mt.set(S,Tt))}function ge(S,tt){const Tt=h.get(tt).get(S);c.get(tt)!==Tt&&(s.uniformBlockBinding(tt,Tt,S.__bindingPointIndex),c.set(tt,Tt))}function Ft(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},z=null,ct={},f={},g=new WeakMap,m=[],_=null,M=!1,w=null,v=null,y=null,D=null,b=null,A=null,k=null,I=new te(0,0,0),R=0,U=!1,C=null,E=null,B=null,X=null,F=null,yt.set(0,0,s.canvas.width,s.canvas.height),bt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:ut,disable:_t,bindFramebuffer:St,drawBuffers:At,useProgram:It,setBlending:ht,setMaterial:gt,setFlipSided:dt,setCullFace:pt,setLineWidth:N,setPolygonOffset:T,setScissorTest:$,activeTexture:rt,bindTexture:lt,unbindTexture:vt,compressedTexImage2D:kt,compressedTexImage3D:xt,texImage2D:Ut,texImage3D:le,updateUBOMapping:de,uniformBlockBinding:ge,texStorage2D:qt,texStorage3D:Ot,texSubImage2D:zt,texSubImage3D:Wt,compressedTexSubImage2D:Et,compressedTexSubImage3D:Ct,scissor:ce,viewport:fe,reset:Ft}}function Dx(s,t,e,n,r,a,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new wt,f=new WeakMap;let g;const m=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(N,T){return _?new OffscreenCanvas(N,T):Na("canvas")}function w(N,T,$){let rt=1;const lt=pt(N);if((lt.width>$||lt.height>$)&&(rt=$/Math.max(lt.width,lt.height)),rt<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const vt=Math.floor(rt*lt.width),kt=Math.floor(rt*lt.height);g===void 0&&(g=M(vt,kt));const xt=T?M(vt,kt):g;return xt.width=vt,xt.height=kt,xt.getContext("2d").drawImage(N,0,0,vt,kt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+vt+"x"+kt+")."),xt}else return"data"in N&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),N;return N}function v(N){return N.generateMipmaps&&N.minFilter!==En&&N.minFilter!==Yn}function y(N){s.generateMipmap(N)}function D(N,T,$,rt,lt=!1){if(N!==null){if(s[N]!==void 0)return s[N];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let vt=T;if(T===s.RED&&($===s.FLOAT&&(vt=s.R32F),$===s.HALF_FLOAT&&(vt=s.R16F),$===s.UNSIGNED_BYTE&&(vt=s.R8)),T===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(vt=s.R8UI),$===s.UNSIGNED_SHORT&&(vt=s.R16UI),$===s.UNSIGNED_INT&&(vt=s.R32UI),$===s.BYTE&&(vt=s.R8I),$===s.SHORT&&(vt=s.R16I),$===s.INT&&(vt=s.R32I)),T===s.RG&&($===s.FLOAT&&(vt=s.RG32F),$===s.HALF_FLOAT&&(vt=s.RG16F),$===s.UNSIGNED_BYTE&&(vt=s.RG8)),T===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(vt=s.RG8UI),$===s.UNSIGNED_SHORT&&(vt=s.RG16UI),$===s.UNSIGNED_INT&&(vt=s.RG32UI),$===s.BYTE&&(vt=s.RG8I),$===s.SHORT&&(vt=s.RG16I),$===s.INT&&(vt=s.RG32I)),T===s.RGB&&$===s.UNSIGNED_INT_5_9_9_9_REV&&(vt=s.RGB9_E5),T===s.RGBA){const kt=lt?Ca:xe.getTransfer(rt);$===s.FLOAT&&(vt=s.RGBA32F),$===s.HALF_FLOAT&&(vt=s.RGBA16F),$===s.UNSIGNED_BYTE&&(vt=kt===Te?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(vt=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(vt=s.RGB5_A1)}return(vt===s.R16F||vt===s.R32F||vt===s.RG16F||vt===s.RG32F||vt===s.RGBA16F||vt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),vt}function b(N,T){return v(N)===!0||N.isFramebufferTexture&&N.minFilter!==En&&N.minFilter!==Yn?Math.log2(Math.max(T.width,T.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?T.mipmaps.length:1}function A(N){const T=N.target;T.removeEventListener("dispose",A),I(T),T.isVideoTexture&&f.delete(T)}function k(N){const T=N.target;T.removeEventListener("dispose",k),U(T)}function I(N){const T=n.get(N);if(T.__webglInit===void 0)return;const $=N.source,rt=m.get($);if(rt){const lt=rt[T.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&R(N),Object.keys(rt).length===0&&m.delete($)}n.remove(N)}function R(N){const T=n.get(N);s.deleteTexture(T.__webglTexture);const $=N.source,rt=m.get($);delete rt[T.__cacheKey],l.memory.textures--}function U(N){const T=n.get(N);if(N.depthTexture&&N.depthTexture.dispose(),N.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(T.__webglFramebuffer[rt]))for(let lt=0;lt<T.__webglFramebuffer[rt].length;lt++)s.deleteFramebuffer(T.__webglFramebuffer[rt][lt]);else s.deleteFramebuffer(T.__webglFramebuffer[rt]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[rt])}else{if(Array.isArray(T.__webglFramebuffer))for(let rt=0;rt<T.__webglFramebuffer.length;rt++)s.deleteFramebuffer(T.__webglFramebuffer[rt]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let rt=0;rt<T.__webglColorRenderbuffer.length;rt++)T.__webglColorRenderbuffer[rt]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[rt]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const $=N.textures;for(let rt=0,lt=$.length;rt<lt;rt++){const vt=n.get($[rt]);vt.__webglTexture&&(s.deleteTexture(vt.__webglTexture),l.memory.textures--),n.remove($[rt])}n.remove(N)}let C=0;function E(){C=0}function B(){const N=C;return N>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+r.maxTextures),C+=1,N}function X(N){const T=[];return T.push(N.wrapS),T.push(N.wrapT),T.push(N.wrapR||0),T.push(N.magFilter),T.push(N.minFilter),T.push(N.anisotropy),T.push(N.internalFormat),T.push(N.format),T.push(N.type),T.push(N.generateMipmaps),T.push(N.premultiplyAlpha),T.push(N.flipY),T.push(N.unpackAlignment),T.push(N.colorSpace),T.join()}function F(N,T){const $=n.get(N);if(N.isVideoTexture&&gt(N),N.isRenderTargetTexture===!1&&N.version>0&&$.__version!==N.version){const rt=N.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{yt($,N,T);return}}e.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+T)}function W(N,T){const $=n.get(N);if(N.version>0&&$.__version!==N.version){yt($,N,T);return}e.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+T)}function Q(N,T){const $=n.get(N);if(N.version>0&&$.__version!==N.version){yt($,N,T);return}e.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+T)}function Y(N,T){const $=n.get(N);if(N.version>0&&$.__version!==N.version){bt($,N,T);return}e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+T)}const ft={[wc]:s.REPEAT,[vs]:s.CLAMP_TO_EDGE,[Sc]:s.MIRRORED_REPEAT},z={[En]:s.NEAREST,[fg]:s.NEAREST_MIPMAP_NEAREST,[Xo]:s.NEAREST_MIPMAP_LINEAR,[Yn]:s.LINEAR,[Rl]:s.LINEAR_MIPMAP_NEAREST,[ys]:s.LINEAR_MIPMAP_LINEAR},ct={[Tg]:s.NEVER,[Ig]:s.ALWAYS,[Ag]:s.LESS,[yf]:s.LEQUAL,[Lg]:s.EQUAL,[Rg]:s.GEQUAL,[Pg]:s.GREATER,[Cg]:s.NOTEQUAL};function G(N,T){if(T.type===Ii&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Yn||T.magFilter===Rl||T.magFilter===Xo||T.magFilter===ys||T.minFilter===Yn||T.minFilter===Rl||T.minFilter===Xo||T.minFilter===ys)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(N,s.TEXTURE_WRAP_S,ft[T.wrapS]),s.texParameteri(N,s.TEXTURE_WRAP_T,ft[T.wrapT]),(N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY)&&s.texParameteri(N,s.TEXTURE_WRAP_R,ft[T.wrapR]),s.texParameteri(N,s.TEXTURE_MAG_FILTER,z[T.magFilter]),s.texParameteri(N,s.TEXTURE_MIN_FILTER,z[T.minFilter]),T.compareFunction&&(s.texParameteri(N,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(N,s.TEXTURE_COMPARE_FUNC,ct[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===En||T.minFilter!==Xo&&T.minFilter!==ys||T.type===Ii&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const $=t.get("EXT_texture_filter_anisotropic");s.texParameterf(N,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function st(N,T){let $=!1;N.__webglInit===void 0&&(N.__webglInit=!0,T.addEventListener("dispose",A));const rt=T.source;let lt=m.get(rt);lt===void 0&&(lt={},m.set(rt,lt));const vt=X(T);if(vt!==N.__cacheKey){lt[vt]===void 0&&(lt[vt]={texture:s.createTexture(),usedTimes:0},l.memory.textures++,$=!0),lt[vt].usedTimes++;const kt=lt[N.__cacheKey];kt!==void 0&&(lt[N.__cacheKey].usedTimes--,kt.usedTimes===0&&R(T)),N.__cacheKey=vt,N.__webglTexture=lt[vt].texture}return $}function yt(N,T,$){let rt=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(rt=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(rt=s.TEXTURE_3D);const lt=st(N,T),vt=T.source;e.bindTexture(rt,N.__webglTexture,s.TEXTURE0+$);const kt=n.get(vt);if(vt.version!==kt.__version||lt===!0){e.activeTexture(s.TEXTURE0+$);const xt=xe.getPrimaries(xe.workingColorSpace),zt=T.colorSpace===qi?null:xe.getPrimaries(T.colorSpace),Wt=T.colorSpace===qi||xt===zt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let Et=w(T.image,!1,r.maxTextureSize);Et=dt(T,Et);const Ct=a.convert(T.format,T.colorSpace),qt=a.convert(T.type);let Ot=D(T.internalFormat,Ct,qt,T.colorSpace,T.isVideoTexture);G(rt,T);let Ut;const le=T.mipmaps,ce=T.isVideoTexture!==!0&&Ot!==_f,fe=kt.__version===void 0||lt===!0,de=vt.dataReady,ge=b(T,Et);if(T.isDepthTexture)Ot=s.DEPTH_COMPONENT16,T.type===Ii?Ot=s.DEPTH_COMPONENT32F:T.type===xr?Ot=s.DEPTH_COMPONENT24:T.type===bo&&(Ot=s.DEPTH24_STENCIL8),fe&&(ce?e.texStorage2D(s.TEXTURE_2D,1,Ot,Et.width,Et.height):e.texImage2D(s.TEXTURE_2D,0,Ot,Et.width,Et.height,0,Ct,qt,null));else if(T.isDataTexture)if(le.length>0){ce&&fe&&e.texStorage2D(s.TEXTURE_2D,ge,Ot,le[0].width,le[0].height);for(let Ft=0,S=le.length;Ft<S;Ft++)Ut=le[Ft],ce?de&&e.texSubImage2D(s.TEXTURE_2D,Ft,0,0,Ut.width,Ut.height,Ct,qt,Ut.data):e.texImage2D(s.TEXTURE_2D,Ft,Ot,Ut.width,Ut.height,0,Ct,qt,Ut.data);T.generateMipmaps=!1}else ce?(fe&&e.texStorage2D(s.TEXTURE_2D,ge,Ot,Et.width,Et.height),de&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Et.width,Et.height,Ct,qt,Et.data)):e.texImage2D(s.TEXTURE_2D,0,Ot,Et.width,Et.height,0,Ct,qt,Et.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){ce&&fe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ge,Ot,le[0].width,le[0].height,Et.depth);for(let Ft=0,S=le.length;Ft<S;Ft++)Ut=le[Ft],T.format!==di?Ct!==null?ce?de&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Ft,0,0,0,Ut.width,Ut.height,Et.depth,Ct,Ut.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Ft,Ot,Ut.width,Ut.height,Et.depth,0,Ut.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?de&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Ft,0,0,0,Ut.width,Ut.height,Et.depth,Ct,qt,Ut.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Ft,Ot,Ut.width,Ut.height,Et.depth,0,Ct,qt,Ut.data)}else{ce&&fe&&e.texStorage2D(s.TEXTURE_2D,ge,Ot,le[0].width,le[0].height);for(let Ft=0,S=le.length;Ft<S;Ft++)Ut=le[Ft],T.format!==di?Ct!==null?ce?de&&e.compressedTexSubImage2D(s.TEXTURE_2D,Ft,0,0,Ut.width,Ut.height,Ct,Ut.data):e.compressedTexImage2D(s.TEXTURE_2D,Ft,Ot,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ce?de&&e.texSubImage2D(s.TEXTURE_2D,Ft,0,0,Ut.width,Ut.height,Ct,qt,Ut.data):e.texImage2D(s.TEXTURE_2D,Ft,Ot,Ut.width,Ut.height,0,Ct,qt,Ut.data)}else if(T.isDataArrayTexture)ce?(fe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ge,Ot,Et.width,Et.height,Et.depth),de&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,Ct,qt,Et.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Ot,Et.width,Et.height,Et.depth,0,Ct,qt,Et.data);else if(T.isData3DTexture)ce?(fe&&e.texStorage3D(s.TEXTURE_3D,ge,Ot,Et.width,Et.height,Et.depth),de&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,Ct,qt,Et.data)):e.texImage3D(s.TEXTURE_3D,0,Ot,Et.width,Et.height,Et.depth,0,Ct,qt,Et.data);else if(T.isFramebufferTexture){if(fe)if(ce)e.texStorage2D(s.TEXTURE_2D,ge,Ot,Et.width,Et.height);else{let Ft=Et.width,S=Et.height;for(let tt=0;tt<ge;tt++)e.texImage2D(s.TEXTURE_2D,tt,Ot,Ft,S,0,Ct,qt,null),Ft>>=1,S>>=1}}else if(le.length>0){if(ce&&fe){const Ft=pt(le[0]);e.texStorage2D(s.TEXTURE_2D,ge,Ot,Ft.width,Ft.height)}for(let Ft=0,S=le.length;Ft<S;Ft++)Ut=le[Ft],ce?de&&e.texSubImage2D(s.TEXTURE_2D,Ft,0,0,Ct,qt,Ut):e.texImage2D(s.TEXTURE_2D,Ft,Ot,Ct,qt,Ut);T.generateMipmaps=!1}else if(ce){if(fe){const Ft=pt(Et);e.texStorage2D(s.TEXTURE_2D,ge,Ot,Ft.width,Ft.height)}de&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Ct,qt,Et)}else e.texImage2D(s.TEXTURE_2D,0,Ot,Ct,qt,Et);v(T)&&y(rt),kt.__version=vt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function bt(N,T,$){if(T.image.length!==6)return;const rt=st(N,T),lt=T.source;e.bindTexture(s.TEXTURE_CUBE_MAP,N.__webglTexture,s.TEXTURE0+$);const vt=n.get(lt);if(lt.version!==vt.__version||rt===!0){e.activeTexture(s.TEXTURE0+$);const kt=xe.getPrimaries(xe.workingColorSpace),xt=T.colorSpace===qi?null:xe.getPrimaries(T.colorSpace),zt=T.colorSpace===qi||kt===xt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);const Wt=T.isCompressedTexture||T.image[0].isCompressedTexture,Et=T.image[0]&&T.image[0].isDataTexture,Ct=[];for(let S=0;S<6;S++)!Wt&&!Et?Ct[S]=w(T.image[S],!0,r.maxCubemapSize):Ct[S]=Et?T.image[S].image:T.image[S],Ct[S]=dt(T,Ct[S]);const qt=Ct[0],Ot=a.convert(T.format,T.colorSpace),Ut=a.convert(T.type),le=D(T.internalFormat,Ot,Ut,T.colorSpace),ce=T.isVideoTexture!==!0,fe=vt.__version===void 0||rt===!0,de=lt.dataReady;let ge=b(T,qt);G(s.TEXTURE_CUBE_MAP,T);let Ft;if(Wt){ce&&fe&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ge,le,qt.width,qt.height);for(let S=0;S<6;S++){Ft=Ct[S].mipmaps;for(let tt=0;tt<Ft.length;tt++){const mt=Ft[tt];T.format!==di?Ot!==null?ce?de&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt,0,0,mt.width,mt.height,Ot,mt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt,le,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ce?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt,0,0,mt.width,mt.height,Ot,Ut,mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt,le,mt.width,mt.height,0,Ot,Ut,mt.data)}}}else{if(Ft=T.mipmaps,ce&&fe){Ft.length>0&&ge++;const S=pt(Ct[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ge,le,S.width,S.height)}for(let S=0;S<6;S++)if(Et){ce?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Ct[S].width,Ct[S].height,Ot,Ut,Ct[S].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,le,Ct[S].width,Ct[S].height,0,Ot,Ut,Ct[S].data);for(let tt=0;tt<Ft.length;tt++){const Tt=Ft[tt].image[S].image;ce?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt+1,0,0,Tt.width,Tt.height,Ot,Ut,Tt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt+1,le,Tt.width,Tt.height,0,Ot,Ut,Tt.data)}}else{ce?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Ot,Ut,Ct[S]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,le,Ot,Ut,Ct[S]);for(let tt=0;tt<Ft.length;tt++){const mt=Ft[tt];ce?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt+1,0,0,Ot,Ut,mt.image[S]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,tt+1,le,Ot,Ut,mt.image[S])}}}v(T)&&y(s.TEXTURE_CUBE_MAP),vt.__version=lt.version,T.onUpdate&&T.onUpdate(T)}N.__version=T.version}function Z(N,T,$,rt,lt,vt){const kt=a.convert($.format,$.colorSpace),xt=a.convert($.type),zt=D($.internalFormat,kt,xt,$.colorSpace);if(!n.get(T).__hasExternalTextures){const Et=Math.max(1,T.width>>vt),Ct=Math.max(1,T.height>>vt);lt===s.TEXTURE_3D||lt===s.TEXTURE_2D_ARRAY?e.texImage3D(lt,vt,zt,Et,Ct,T.depth,0,kt,xt,null):e.texImage2D(lt,vt,zt,Et,Ct,0,kt,xt,null)}e.bindFramebuffer(s.FRAMEBUFFER,N),ht(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,rt,lt,n.get($).__webglTexture,0,at(T)):(lt===s.TEXTURE_2D||lt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,rt,lt,n.get($).__webglTexture,vt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function K(N,T,$){if(s.bindRenderbuffer(s.RENDERBUFFER,N),T.depthBuffer&&!T.stencilBuffer){let rt=s.DEPTH_COMPONENT24;if($||ht(T)){const lt=T.depthTexture;lt&&lt.isDepthTexture&&(lt.type===Ii?rt=s.DEPTH_COMPONENT32F:lt.type===xr&&(rt=s.DEPTH_COMPONENT24));const vt=at(T);ht(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,vt,rt,T.width,T.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,vt,rt,T.width,T.height)}else s.renderbufferStorage(s.RENDERBUFFER,rt,T.width,T.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,N)}else if(T.depthBuffer&&T.stencilBuffer){const rt=at(T);$&&ht(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,s.DEPTH24_STENCIL8,T.width,T.height):ht(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt,s.DEPTH24_STENCIL8,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,N)}else{const rt=T.textures;for(let lt=0;lt<rt.length;lt++){const vt=rt[lt],kt=a.convert(vt.format,vt.colorSpace),xt=a.convert(vt.type),zt=D(vt.internalFormat,kt,xt,vt.colorSpace),Wt=at(T);$&&ht(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt,zt,T.width,T.height):ht(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt,zt,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,zt,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ut(N,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,N),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),F(T.depthTexture,0);const rt=n.get(T.depthTexture).__webglTexture,lt=at(T);if(T.depthTexture.format===dr)ht(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,rt,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,rt,0);else if(T.depthTexture.format===po)ht(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,rt,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function _t(N){const T=n.get(N),$=N.isWebGLCubeRenderTarget===!0;if(N.depthTexture&&!T.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");ut(T.__webglFramebuffer,N)}else if($){T.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[rt]),T.__webglDepthbuffer[rt]=s.createRenderbuffer(),K(T.__webglDepthbuffer[rt],N,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=s.createRenderbuffer(),K(T.__webglDepthbuffer,N,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function St(N,T,$){const rt=n.get(N);T!==void 0&&Z(rt.__webglFramebuffer,N,N.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&_t(N)}function At(N){const T=N.texture,$=n.get(N),rt=n.get(T);N.addEventListener("dispose",k);const lt=N.textures,vt=N.isWebGLCubeRenderTarget===!0,kt=lt.length>1;if(kt||(rt.__webglTexture===void 0&&(rt.__webglTexture=s.createTexture()),rt.__version=T.version,l.memory.textures++),vt){$.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(T.mipmaps&&T.mipmaps.length>0){$.__webglFramebuffer[xt]=[];for(let zt=0;zt<T.mipmaps.length;zt++)$.__webglFramebuffer[xt][zt]=s.createFramebuffer()}else $.__webglFramebuffer[xt]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){$.__webglFramebuffer=[];for(let xt=0;xt<T.mipmaps.length;xt++)$.__webglFramebuffer[xt]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(kt)for(let xt=0,zt=lt.length;xt<zt;xt++){const Wt=n.get(lt[xt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=s.createTexture(),l.memory.textures++)}if(N.samples>0&&ht(N)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let xt=0;xt<lt.length;xt++){const zt=lt[xt];$.__webglColorRenderbuffer[xt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[xt]);const Wt=a.convert(zt.format,zt.colorSpace),Et=a.convert(zt.type),Ct=D(zt.internalFormat,Wt,Et,zt.colorSpace,N.isXRRenderTarget===!0),qt=at(N);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,Ct,N.width,N.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+xt,s.RENDERBUFFER,$.__webglColorRenderbuffer[xt])}s.bindRenderbuffer(s.RENDERBUFFER,null),N.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),K($.__webglDepthRenderbuffer,N,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(vt){e.bindTexture(s.TEXTURE_CUBE_MAP,rt.__webglTexture),G(s.TEXTURE_CUBE_MAP,T);for(let xt=0;xt<6;xt++)if(T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Z($.__webglFramebuffer[xt][zt],N,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,zt);else Z($.__webglFramebuffer[xt],N,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);v(T)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(kt){for(let xt=0,zt=lt.length;xt<zt;xt++){const Wt=lt[xt],Et=n.get(Wt);e.bindTexture(s.TEXTURE_2D,Et.__webglTexture),G(s.TEXTURE_2D,Wt),Z($.__webglFramebuffer,N,Wt,s.COLOR_ATTACHMENT0+xt,s.TEXTURE_2D,0),v(Wt)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let xt=s.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(xt=N.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(xt,rt.__webglTexture),G(xt,T),T.mipmaps&&T.mipmaps.length>0)for(let zt=0;zt<T.mipmaps.length;zt++)Z($.__webglFramebuffer[zt],N,T,s.COLOR_ATTACHMENT0,xt,zt);else Z($.__webglFramebuffer,N,T,s.COLOR_ATTACHMENT0,xt,0);v(T)&&y(xt),e.unbindTexture()}N.depthBuffer&&_t(N)}function It(N){const T=N.textures;for(let $=0,rt=T.length;$<rt;$++){const lt=T[$];if(v(lt)){const vt=N.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,kt=n.get(lt).__webglTexture;e.bindTexture(vt,kt),y(vt),e.unbindTexture()}}}function q(N){if(N.samples>0&&ht(N)===!1){const T=N.textures,$=N.width,rt=N.height;let lt=s.COLOR_BUFFER_BIT;const vt=[],kt=N.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,xt=n.get(N),zt=T.length>1;if(zt)for(let Wt=0;Wt<T.length;Wt++)e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,xt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglFramebuffer);for(let Wt=0;Wt<T.length;Wt++){vt.push(s.COLOR_ATTACHMENT0+Wt),N.depthBuffer&&vt.push(kt);const Et=xt.__ignoreDepthValues!==void 0?xt.__ignoreDepthValues:!1;if(Et===!1&&(N.depthBuffer&&(lt|=s.DEPTH_BUFFER_BIT),N.stencilBuffer&&xt.__isTransmissionRenderTarget!==!0&&(lt|=s.STENCIL_BUFFER_BIT)),zt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,xt.__webglColorRenderbuffer[Wt]),Et===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[kt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[kt])),zt){const Ct=n.get(T[Wt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ct,0)}s.blitFramebuffer(0,0,$,rt,0,0,$,rt,lt,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,vt)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),zt)for(let Wt=0;Wt<T.length;Wt++){e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.RENDERBUFFER,xt.__webglColorRenderbuffer[Wt]);const Et=n.get(T[Wt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,xt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.TEXTURE_2D,Et,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,xt.__webglMultisampledFramebuffer)}}function at(N){return Math.min(r.maxSamples,N.samples)}function ht(N){const T=n.get(N);return N.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function gt(N){const T=l.render.frame;f.get(N)!==T&&(f.set(N,T),N.update())}function dt(N,T){const $=N.colorSpace,rt=N.format,lt=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||$!==es&&$!==qi&&(xe.getTransfer($)===Te?(rt!==di||lt!==Ji)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),T}function pt(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(d.width=N.naturalWidth||N.width,d.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(d.width=N.displayWidth,d.height=N.displayHeight):(d.width=N.width,d.height=N.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=E,this.setTexture2D=F,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=Y,this.rebindTextures=St,this.setupRenderTarget=At,this.updateRenderTargetMipmap=It,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=Z,this.useMultisampledRTT=ht}function Nx(s,t){function e(n,r=qi){let a;const l=xe.getTransfer(r);if(n===Ji)return s.UNSIGNED_BYTE;if(n===hf)return s.UNSIGNED_SHORT_4_4_4_4;if(n===df)return s.UNSIGNED_SHORT_5_5_5_1;if(n===gg)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===pg)return s.BYTE;if(n===mg)return s.SHORT;if(n===cf)return s.UNSIGNED_SHORT;if(n===uf)return s.INT;if(n===xr)return s.UNSIGNED_INT;if(n===Ii)return s.FLOAT;if(n===Pa)return s.HALF_FLOAT;if(n===_g)return s.ALPHA;if(n===vg)return s.RGB;if(n===di)return s.RGBA;if(n===yg)return s.LUMINANCE;if(n===xg)return s.LUMINANCE_ALPHA;if(n===dr)return s.DEPTH_COMPONENT;if(n===po)return s.DEPTH_STENCIL;if(n===ff)return s.RED;if(n===pf)return s.RED_INTEGER;if(n===Mg)return s.RG;if(n===mf)return s.RG_INTEGER;if(n===gf)return s.RGBA_INTEGER;if(n===Il||n===Dl||n===Nl||n===Ol)if(l===Te)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Il)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ol)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Il)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ol)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rh||n===oh||n===ah||n===lh)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===rh)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ah)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_f)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===ch||n===uh)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===ch)return l===Te?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===uh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hh||n===dh||n===fh||n===ph||n===mh||n===gh||n===_h||n===vh||n===yh||n===xh||n===Mh||n===bh||n===wh||n===Sh)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===hh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ph)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===mh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===gh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===_h)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Mh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===bh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===wh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ul||n===Eh||n===Th)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===Ul)return l===Te?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Th)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bg||n===Ah||n===Lh||n===Ph)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===Ul)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Ah)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ph)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bo?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Ox extends Bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ni extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ux={type:"move"};class lc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ni,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ni,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ni,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,a=null,l=null;const c=this._targetRay,h=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const w of t.hand.values()){const v=e.getJointPose(w,n),y=this._getHandJoint(d,w);v!==null&&(y.matrix.fromArray(v.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=v.radius),y.visible=v!==null}const f=d.joints["index-finger-tip"],g=d.joints["thumb-tip"],m=f.position.distanceTo(g.position),_=.02,M=.005;d.inputState.pinching&&m>_+M?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&m<=_-M&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(h.matrix.fromArray(a.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,a.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(a.linearVelocity)):h.hasLinearVelocity=!1,a.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(a.angularVelocity)):h.hasAngularVelocity=!1));c!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Ux)))}return c!==null&&(c.visible=r!==null),h!==null&&(h.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ni;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const kx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Bx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new cn,a=t.properties.get(r);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,r=new ts({vertexShader:kx,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new De(new wo(20,20),r)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class zx extends Ts{constructor(t,e){super();const n=this;let r=null,a=1,l=null,c="local-floor",h=1,d=null,f=null,g=null,m=null,_=null,M=null;const w=new Bx,v=e.getContextAttributes();let y=null,D=null;const b=[],A=[],k=new wt;let I=null;const R=new Bn;R.layers.enable(1),R.viewport=new Qe;const U=new Bn;U.layers.enable(2),U.viewport=new Qe;const C=[R,U],E=new Ox;E.layers.enable(1),E.layers.enable(2);let B=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let K=b[Z];return K===void 0&&(K=new lc,b[Z]=K),K.getTargetRaySpace()},this.getControllerGrip=function(Z){let K=b[Z];return K===void 0&&(K=new lc,b[Z]=K),K.getGripSpace()},this.getHand=function(Z){let K=b[Z];return K===void 0&&(K=new lc,b[Z]=K),K.getHandSpace()};function F(Z){const K=A.indexOf(Z.inputSource);if(K===-1)return;const ut=b[K];ut!==void 0&&(ut.update(Z.inputSource,Z.frame,d||l),ut.dispatchEvent({type:Z.type,data:Z.inputSource}))}function W(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",Q);for(let Z=0;Z<b.length;Z++){const K=A[Z];K!==null&&(A[Z]=null,b[Z].disconnect(K))}B=null,X=null,w.reset(),t.setRenderTarget(y),_=null,m=null,g=null,r=null,D=null,bt.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){c=Z,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(Z){d=Z},this.getBaseLayer=function(){return m!==null?m:_},this.getBinding=function(){return g},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(Z){if(r=Z,r!==null){if(y=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",W),r.addEventListener("inputsourceschange",Q),v.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(k),r.renderState.layers===void 0){const K={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(r,e,K),r.updateRenderState({baseLayer:_}),t.setPixelRatio(1),t.setSize(_.framebufferWidth,_.framebufferHeight,!1),D=new Ms(_.framebufferWidth,_.framebufferHeight,{format:di,type:Ji,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let K=null,ut=null,_t=null;v.depth&&(_t=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,K=v.stencil?po:dr,ut=v.stencil?bo:xr);const St={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:a};g=new XRWebGLBinding(r,e),m=g.createProjectionLayer(St),r.updateRenderState({layers:[m]}),t.setPixelRatio(1),t.setSize(m.textureWidth,m.textureHeight,!1),D=new Ms(m.textureWidth,m.textureHeight,{format:di,type:Ji,depthTexture:new If(m.textureWidth,m.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const At=t.properties.get(D);At.__ignoreDepthValues=m.ignoreDepthValues}D.isXRRenderTarget=!0,this.setFoveation(h),d=null,l=await r.requestReferenceSpace(c),bt.setContext(r),bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function Q(Z){for(let K=0;K<Z.removed.length;K++){const ut=Z.removed[K],_t=A.indexOf(ut);_t>=0&&(A[_t]=null,b[_t].disconnect(ut))}for(let K=0;K<Z.added.length;K++){const ut=Z.added[K];let _t=A.indexOf(ut);if(_t===-1){for(let At=0;At<b.length;At++)if(At>=A.length){A.push(ut),_t=At;break}else if(A[At]===null){A[At]=ut,_t=At;break}if(_t===-1)break}const St=b[_t];St&&St.connect(ut)}}const Y=new V,ft=new V;function z(Z,K,ut){Y.setFromMatrixPosition(K.matrixWorld),ft.setFromMatrixPosition(ut.matrixWorld);const _t=Y.distanceTo(ft),St=K.projectionMatrix.elements,At=ut.projectionMatrix.elements,It=St[14]/(St[10]-1),q=St[14]/(St[10]+1),at=(St[9]+1)/St[5],ht=(St[9]-1)/St[5],gt=(St[8]-1)/St[0],dt=(At[8]+1)/At[0],pt=It*gt,N=It*dt,T=_t/(-gt+dt),$=T*-gt;K.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX($),Z.translateZ(T),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert();const rt=It+T,lt=q+T,vt=pt-$,kt=N+(_t-$),xt=at*q/lt*rt,zt=ht*q/lt*rt;Z.projectionMatrix.makePerspective(vt,kt,xt,zt,rt,lt),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}function ct(Z,K){K===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(K.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(r===null)return;w.texture!==null&&(Z.near=w.depthNear,Z.far=w.depthFar),E.near=U.near=R.near=Z.near,E.far=U.far=R.far=Z.far,(B!==E.near||X!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),B=E.near,X=E.far,R.near=B,R.far=X,U.near=B,U.far=X,R.updateProjectionMatrix(),U.updateProjectionMatrix(),Z.updateProjectionMatrix());const K=Z.parent,ut=E.cameras;ct(E,K);for(let _t=0;_t<ut.length;_t++)ct(ut[_t],K);ut.length===2?z(E,R,U):E.projectionMatrix.copy(R.projectionMatrix),G(Z,E,K)};function G(Z,K,ut){ut===null?Z.matrix.copy(K.matrixWorld):(Z.matrix.copy(ut.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(K.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(K.projectionMatrix),Z.projectionMatrixInverse.copy(K.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Ec*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(m===null&&_===null))return h},this.setFoveation=function(Z){h=Z,m!==null&&(m.fixedFoveation=Z),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Z)},this.hasDepthSensing=function(){return w.texture!==null};let st=null;function yt(Z,K){if(f=K.getViewerPose(d||l),M=K,f!==null){const ut=f.views;_!==null&&(t.setRenderTargetFramebuffer(D,_.framebuffer),t.setRenderTarget(D));let _t=!1;ut.length!==E.cameras.length&&(E.cameras.length=0,_t=!0);for(let At=0;At<ut.length;At++){const It=ut[At];let q=null;if(_!==null)q=_.getViewport(It);else{const ht=g.getViewSubImage(m,It);q=ht.viewport,At===0&&(t.setRenderTargetTextures(D,ht.colorTexture,m.ignoreDepthValues?void 0:ht.depthStencilTexture),t.setRenderTarget(D))}let at=C[At];at===void 0&&(at=new Bn,at.layers.enable(At),at.viewport=new Qe,C[At]=at),at.matrix.fromArray(It.transform.matrix),at.matrix.decompose(at.position,at.quaternion,at.scale),at.projectionMatrix.fromArray(It.projectionMatrix),at.projectionMatrixInverse.copy(at.projectionMatrix).invert(),at.viewport.set(q.x,q.y,q.width,q.height),At===0&&(E.matrix.copy(at.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),_t===!0&&E.cameras.push(at)}const St=r.enabledFeatures;if(St&&St.includes("depth-sensing")){const At=g.getDepthInformation(ut[0]);At&&At.isValid&&At.texture&&w.init(t,At,r.renderState)}}for(let ut=0;ut<b.length;ut++){const _t=A[ut],St=b[ut];_t!==null&&St!==void 0&&St.update(_t,K,d||l)}w.render(t,E),st&&st(Z,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),M=null}const bt=new Cf;bt.setAnimationLoop(yt),this.setAnimationLoop=function(Z){st=Z},this.dispose=function(){}}}const ps=new _i,Hx=new Me;function Vx(s,t){function e(v,y){v.matrixAutoUpdate===!0&&v.updateMatrix(),y.value.copy(v.matrix)}function n(v,y){y.color.getRGB(v.fogColor.value,Af(s)),y.isFog?(v.fogNear.value=y.near,v.fogFar.value=y.far):y.isFogExp2&&(v.fogDensity.value=y.density)}function r(v,y,D,b,A){y.isMeshBasicMaterial||y.isMeshLambertMaterial?a(v,y):y.isMeshToonMaterial?(a(v,y),g(v,y)):y.isMeshPhongMaterial?(a(v,y),f(v,y)):y.isMeshStandardMaterial?(a(v,y),m(v,y),y.isMeshPhysicalMaterial&&_(v,y,A)):y.isMeshMatcapMaterial?(a(v,y),M(v,y)):y.isMeshDepthMaterial?a(v,y):y.isMeshDistanceMaterial?(a(v,y),w(v,y)):y.isMeshNormalMaterial?a(v,y):y.isLineBasicMaterial?(l(v,y),y.isLineDashedMaterial&&c(v,y)):y.isPointsMaterial?h(v,y,D,b):y.isSpriteMaterial?d(v,y):y.isShadowMaterial?(v.color.value.copy(y.color),v.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function a(v,y){v.opacity.value=y.opacity,y.color&&v.diffuse.value.copy(y.color),y.emissive&&v.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(v.map.value=y.map,e(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,e(y.alphaMap,v.alphaMapTransform)),y.bumpMap&&(v.bumpMap.value=y.bumpMap,e(y.bumpMap,v.bumpMapTransform),v.bumpScale.value=y.bumpScale,y.side===Tn&&(v.bumpScale.value*=-1)),y.normalMap&&(v.normalMap.value=y.normalMap,e(y.normalMap,v.normalMapTransform),v.normalScale.value.copy(y.normalScale),y.side===Tn&&v.normalScale.value.negate()),y.displacementMap&&(v.displacementMap.value=y.displacementMap,e(y.displacementMap,v.displacementMapTransform),v.displacementScale.value=y.displacementScale,v.displacementBias.value=y.displacementBias),y.emissiveMap&&(v.emissiveMap.value=y.emissiveMap,e(y.emissiveMap,v.emissiveMapTransform)),y.specularMap&&(v.specularMap.value=y.specularMap,e(y.specularMap,v.specularMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest);const D=t.get(y),b=D.envMap,A=D.envMapRotation;if(b&&(v.envMap.value=b,ps.copy(A),ps.x*=-1,ps.y*=-1,ps.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ps.y*=-1,ps.z*=-1),v.envMapRotation.value.setFromMatrix4(Hx.makeRotationFromEuler(ps)),v.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=y.reflectivity,v.ior.value=y.ior,v.refractionRatio.value=y.refractionRatio),y.lightMap){v.lightMap.value=y.lightMap;const k=s._useLegacyLights===!0?Math.PI:1;v.lightMapIntensity.value=y.lightMapIntensity*k,e(y.lightMap,v.lightMapTransform)}y.aoMap&&(v.aoMap.value=y.aoMap,v.aoMapIntensity.value=y.aoMapIntensity,e(y.aoMap,v.aoMapTransform))}function l(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,y.map&&(v.map.value=y.map,e(y.map,v.mapTransform))}function c(v,y){v.dashSize.value=y.dashSize,v.totalSize.value=y.dashSize+y.gapSize,v.scale.value=y.scale}function h(v,y,D,b){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.size.value=y.size*D,v.scale.value=b*.5,y.map&&(v.map.value=y.map,e(y.map,v.uvTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,e(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function d(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.rotation.value=y.rotation,y.map&&(v.map.value=y.map,e(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,e(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function f(v,y){v.specular.value.copy(y.specular),v.shininess.value=Math.max(y.shininess,1e-4)}function g(v,y){y.gradientMap&&(v.gradientMap.value=y.gradientMap)}function m(v,y){v.metalness.value=y.metalness,y.metalnessMap&&(v.metalnessMap.value=y.metalnessMap,e(y.metalnessMap,v.metalnessMapTransform)),v.roughness.value=y.roughness,y.roughnessMap&&(v.roughnessMap.value=y.roughnessMap,e(y.roughnessMap,v.roughnessMapTransform)),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)}function _(v,y,D){v.ior.value=y.ior,y.sheen>0&&(v.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),v.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(v.sheenColorMap.value=y.sheenColorMap,e(y.sheenColorMap,v.sheenColorMapTransform)),y.sheenRoughnessMap&&(v.sheenRoughnessMap.value=y.sheenRoughnessMap,e(y.sheenRoughnessMap,v.sheenRoughnessMapTransform))),y.clearcoat>0&&(v.clearcoat.value=y.clearcoat,v.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(v.clearcoatMap.value=y.clearcoatMap,e(y.clearcoatMap,v.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,e(y.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(v.clearcoatNormalMap.value=y.clearcoatNormalMap,e(y.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===Tn&&v.clearcoatNormalScale.value.negate())),y.iridescence>0&&(v.iridescence.value=y.iridescence,v.iridescenceIOR.value=y.iridescenceIOR,v.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(v.iridescenceMap.value=y.iridescenceMap,e(y.iridescenceMap,v.iridescenceMapTransform)),y.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=y.iridescenceThicknessMap,e(y.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),y.transmission>0&&(v.transmission.value=y.transmission,v.transmissionSamplerMap.value=D.texture,v.transmissionSamplerSize.value.set(D.width,D.height),y.transmissionMap&&(v.transmissionMap.value=y.transmissionMap,e(y.transmissionMap,v.transmissionMapTransform)),v.thickness.value=y.thickness,y.thicknessMap&&(v.thicknessMap.value=y.thicknessMap,e(y.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=y.attenuationDistance,v.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(v.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(v.anisotropyMap.value=y.anisotropyMap,e(y.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=y.specularIntensity,v.specularColor.value.copy(y.specularColor),y.specularColorMap&&(v.specularColorMap.value=y.specularColorMap,e(y.specularColorMap,v.specularColorMapTransform)),y.specularIntensityMap&&(v.specularIntensityMap.value=y.specularIntensityMap,e(y.specularIntensityMap,v.specularIntensityMapTransform))}function M(v,y){y.matcap&&(v.matcap.value=y.matcap)}function w(v,y){const D=t.get(y).light;v.referencePosition.value.setFromMatrixPosition(D.matrixWorld),v.nearDistance.value=D.shadow.camera.near,v.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function Gx(s,t,e,n){let r={},a={},l=[];const c=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(D,b){const A=b.program;n.uniformBlockBinding(D,A)}function d(D,b){let A=r[D.id];A===void 0&&(M(D),A=f(D),r[D.id]=A,D.addEventListener("dispose",v));const k=b.program;n.updateUBOMapping(D,k);const I=t.render.frame;a[D.id]!==I&&(m(D),a[D.id]=I)}function f(D){const b=g();D.__bindingPointIndex=b;const A=s.createBuffer(),k=D.__size,I=D.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,k,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,A),A}function g(){for(let D=0;D<c;D++)if(l.indexOf(D)===-1)return l.push(D),D;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(D){const b=r[D.id],A=D.uniforms,k=D.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let I=0,R=A.length;I<R;I++){const U=Array.isArray(A[I])?A[I]:[A[I]];for(let C=0,E=U.length;C<E;C++){const B=U[C];if(_(B,I,C,k)===!0){const X=B.__offset,F=Array.isArray(B.value)?B.value:[B.value];let W=0;for(let Q=0;Q<F.length;Q++){const Y=F[Q],ft=w(Y);typeof Y=="number"||typeof Y=="boolean"?(B.__data[0]=Y,s.bufferSubData(s.UNIFORM_BUFFER,X+W,B.__data)):Y.isMatrix3?(B.__data[0]=Y.elements[0],B.__data[1]=Y.elements[1],B.__data[2]=Y.elements[2],B.__data[3]=0,B.__data[4]=Y.elements[3],B.__data[5]=Y.elements[4],B.__data[6]=Y.elements[5],B.__data[7]=0,B.__data[8]=Y.elements[6],B.__data[9]=Y.elements[7],B.__data[10]=Y.elements[8],B.__data[11]=0):(Y.toArray(B.__data,W),W+=ft.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,X,B.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function _(D,b,A,k){const I=D.value,R=b+"_"+A;if(k[R]===void 0)return typeof I=="number"||typeof I=="boolean"?k[R]=I:k[R]=I.clone(),!0;{const U=k[R];if(typeof I=="number"||typeof I=="boolean"){if(U!==I)return k[R]=I,!0}else if(U.equals(I)===!1)return U.copy(I),!0}return!1}function M(D){const b=D.uniforms;let A=0;const k=16;for(let R=0,U=b.length;R<U;R++){const C=Array.isArray(b[R])?b[R]:[b[R]];for(let E=0,B=C.length;E<B;E++){const X=C[E],F=Array.isArray(X.value)?X.value:[X.value];for(let W=0,Q=F.length;W<Q;W++){const Y=F[W],ft=w(Y),z=A%k;z!==0&&k-z<ft.boundary&&(A+=k-z),X.__data=new Float32Array(ft.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=A,A+=ft.storage}}}const I=A%k;return I>0&&(A+=k-I),D.__size=A,D.__cache={},this}function w(D){const b={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(b.boundary=4,b.storage=4):D.isVector2?(b.boundary=8,b.storage=8):D.isVector3||D.isColor?(b.boundary=16,b.storage=12):D.isVector4?(b.boundary=16,b.storage=16):D.isMatrix3?(b.boundary=48,b.storage=48):D.isMatrix4?(b.boundary=64,b.storage=64):D.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",D),b}function v(D){const b=D.target;b.removeEventListener("dispose",v);const A=l.indexOf(b.__bindingPointIndex);l.splice(A,1),s.deleteBuffer(r[b.id]),delete r[b.id],delete a[b.id]}function y(){for(const D in r)s.deleteBuffer(r[D]);l=[],r={},a={}}return{bind:h,update:d,dispose:y}}class Wx{constructor(t={}){const{canvas:e=Og(),context:n=null,depth:r=!0,stencil:a=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:g=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=l;const _=new Uint32Array(4),M=new Int32Array(4);let w=null,v=null;const y=[],D=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ai,this._useLegacyLights=!1,this.toneMapping=Ki,this.toneMappingExposure=1;const b=this;let A=!1,k=0,I=0,R=null,U=-1,C=null;const E=new Qe,B=new Qe;let X=null;const F=new te(0);let W=0,Q=e.width,Y=e.height,ft=1,z=null,ct=null;const G=new Qe(0,0,Q,Y),st=new Qe(0,0,Q,Y);let yt=!1;const bt=new Wc;let Z=!1,K=!1;const ut=new Me,_t=new wt,St=new V,At={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function It(){return R===null?ft:1}let q=n;function at(O,j){const it=e.getContext(O,j);return it!==null?it:null}try{const O={alpha:!0,depth:r,stencil:a,antialias:c,premultipliedAlpha:h,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:g};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${zc}`),e.addEventListener("webglcontextlost",tt,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",Tt,!1),q===null){const j="webgl2";if(q=at(j,O),q===null)throw at(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(O){throw console.error("THREE.WebGLRenderer: "+O.message),O}let ht,gt,dt,pt,N,T,$,rt,lt,vt,kt,xt,zt,Wt,Et,Ct,qt,Ot,Ut,le,ce,fe,de,ge;function Ft(){ht=new J0(q),ht.init(),gt=new X0(q,ht,t),fe=new Nx(q,ht),dt=new Ix(q),pt=new ey(q),N=new vx,T=new Dx(q,ht,dt,N,gt,fe,pt),$=new $0(b),rt=new K0(b),lt=new a_(q),de=new W0(q,lt),vt=new Q0(q,lt,pt,de),kt=new iy(q,vt,lt,pt),Ut=new ny(q,gt,T),Ct=new q0(N),xt=new _x(b,$,rt,ht,gt,de,Ct),zt=new Vx(b,N),Wt=new xx,Et=new Tx(ht),Ot=new G0(b,$,rt,dt,kt,m,h),qt=new Rx(b,kt,gt),ge=new Gx(q,pt,gt,dt),le=new Z0(q,ht,pt),ce=new ty(q,ht,pt),pt.programs=xt.programs,b.capabilities=gt,b.extensions=ht,b.properties=N,b.renderLists=Wt,b.shadowMap=qt,b.state=dt,b.info=pt}Ft();const S=new zx(b,q);this.xr=S,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const O=ht.get("WEBGL_lose_context");O&&O.loseContext()},this.forceContextRestore=function(){const O=ht.get("WEBGL_lose_context");O&&O.restoreContext()},this.getPixelRatio=function(){return ft},this.setPixelRatio=function(O){O!==void 0&&(ft=O,this.setSize(Q,Y,!1))},this.getSize=function(O){return O.set(Q,Y)},this.setSize=function(O,j,it=!0){if(S.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Q=O,Y=j,e.width=Math.floor(O*ft),e.height=Math.floor(j*ft),it===!0&&(e.style.width=O+"px",e.style.height=j+"px"),this.setViewport(0,0,O,j)},this.getDrawingBufferSize=function(O){return O.set(Q*ft,Y*ft).floor()},this.setDrawingBufferSize=function(O,j,it){Q=O,Y=j,ft=it,e.width=Math.floor(O*it),e.height=Math.floor(j*it),this.setViewport(0,0,O,j)},this.getCurrentViewport=function(O){return O.copy(E)},this.getViewport=function(O){return O.copy(G)},this.setViewport=function(O,j,it,ot){O.isVector4?G.set(O.x,O.y,O.z,O.w):G.set(O,j,it,ot),dt.viewport(E.copy(G).multiplyScalar(ft).round())},this.getScissor=function(O){return O.copy(st)},this.setScissor=function(O,j,it,ot){O.isVector4?st.set(O.x,O.y,O.z,O.w):st.set(O,j,it,ot),dt.scissor(B.copy(st).multiplyScalar(ft).round())},this.getScissorTest=function(){return yt},this.setScissorTest=function(O){dt.setScissorTest(yt=O)},this.setOpaqueSort=function(O){z=O},this.setTransparentSort=function(O){ct=O},this.getClearColor=function(O){return O.copy(Ot.getClearColor())},this.setClearColor=function(){Ot.setClearColor.apply(Ot,arguments)},this.getClearAlpha=function(){return Ot.getClearAlpha()},this.setClearAlpha=function(){Ot.setClearAlpha.apply(Ot,arguments)},this.clear=function(O=!0,j=!0,it=!0){let ot=0;if(O){let et=!1;if(R!==null){const Pt=R.texture.format;et=Pt===gf||Pt===mf||Pt===pf}if(et){const Pt=R.texture.type,Vt=Pt===Ji||Pt===xr||Pt===cf||Pt===bo||Pt===hf||Pt===df,Zt=Ot.getClearColor(),Xt=Ot.getClearAlpha(),ee=Zt.r,Qt=Zt.g,ne=Zt.b;Vt?(_[0]=ee,_[1]=Qt,_[2]=ne,_[3]=Xt,q.clearBufferuiv(q.COLOR,0,_)):(M[0]=ee,M[1]=Qt,M[2]=ne,M[3]=Xt,q.clearBufferiv(q.COLOR,0,M))}else ot|=q.COLOR_BUFFER_BIT}j&&(ot|=q.DEPTH_BUFFER_BIT),it&&(ot|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q.clear(ot)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",tt,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",Tt,!1),Wt.dispose(),Et.dispose(),N.dispose(),$.dispose(),rt.dispose(),kt.dispose(),de.dispose(),ge.dispose(),xt.dispose(),S.dispose(),S.removeEventListener("sessionstart",Ne),S.removeEventListener("sessionend",Pe),hn.stop()};function tt(O){O.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const O=pt.autoReset,j=qt.enabled,it=qt.autoUpdate,ot=qt.needsUpdate,et=qt.type;Ft(),pt.autoReset=O,qt.enabled=j,qt.autoUpdate=it,qt.needsUpdate=ot,qt.type=et}function Tt(O){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",O.statusMessage)}function Dt(O){const j=O.target;j.removeEventListener("dispose",Dt),he(j)}function he(O){ae(O),N.remove(O)}function ae(O){const j=N.get(O).programs;j!==void 0&&(j.forEach(function(it){xt.releaseProgram(it)}),O.isShaderMaterial&&xt.releaseShaderCache(O))}this.renderBufferDirect=function(O,j,it,ot,et,Pt){j===null&&(j=At);const Vt=et.isMesh&&et.matrixWorld.determinant()<0,Zt=Lo(O,j,it,ot,et);dt.setMaterial(ot,Vt);let Xt=it.index,ee=1;if(ot.wireframe===!0){if(Xt=vt.getWireframeAttribute(it),Xt===void 0)return;ee=2}const Qt=it.drawRange,ne=it.attributes.position;let Re=Qt.start*ee,dn=(Qt.start+Qt.count)*ee;Pt!==null&&(Re=Math.max(Re,Pt.start*ee),dn=Math.min(dn,(Pt.start+Pt.count)*ee)),Xt!==null?(Re=Math.max(Re,0),dn=Math.min(dn,Xt.count)):ne!=null&&(Re=Math.max(Re,0),dn=Math.min(dn,ne.count));const Oe=dn-Re;if(Oe<0||Oe===1/0)return;de.setup(et,ot,Zt,it,Xt);let fn,we=le;if(Xt!==null&&(fn=lt.get(Xt),we=ce,we.setIndex(fn)),et.isMesh)ot.wireframe===!0?(dt.setLineWidth(ot.wireframeLinewidth*It()),we.setMode(q.LINES)):we.setMode(q.TRIANGLES);else if(et.isLine){let ie=ot.linewidth;ie===void 0&&(ie=1),dt.setLineWidth(ie*It()),et.isLineSegments?we.setMode(q.LINES):et.isLineLoop?we.setMode(q.LINE_LOOP):we.setMode(q.LINE_STRIP)}else et.isPoints?we.setMode(q.POINTS):et.isSprite&&we.setMode(q.TRIANGLES);if(et.isBatchedMesh)we.renderMultiDraw(et._multiDrawStarts,et._multiDrawCounts,et._multiDrawCount);else if(et.isInstancedMesh)we.renderInstances(Re,Oe,et.count);else if(it.isInstancedBufferGeometry){const ie=it._maxInstanceCount!==void 0?it._maxInstanceCount:1/0,yi=Math.min(it.instanceCount,ie);we.renderInstances(Re,Oe,yi)}else we.render(Re,Oe)};function be(O,j,it){O.transparent===!0&&O.side===Hn&&O.forceSinglePass===!1?(O.side=Tn,O.needsUpdate=!0,ns(O,j,it),O.side=Qi,O.needsUpdate=!0,ns(O,j,it),O.side=Hn):ns(O,j,it)}this.compile=function(O,j,it=null){it===null&&(it=O),v=Et.get(it),v.init(),D.push(v),it.traverseVisible(function(et){et.isLight&&et.layers.test(j.layers)&&(v.pushLight(et),et.castShadow&&v.pushShadow(et))}),O!==it&&O.traverseVisible(function(et){et.isLight&&et.layers.test(j.layers)&&(v.pushLight(et),et.castShadow&&v.pushShadow(et))}),v.setupLights(b._useLegacyLights);const ot=new Set;return O.traverse(function(et){const Pt=et.material;if(Pt)if(Array.isArray(Pt))for(let Vt=0;Vt<Pt.length;Vt++){const Zt=Pt[Vt];be(Zt,it,et),ot.add(Zt)}else be(Pt,it,et),ot.add(Pt)}),D.pop(),v=null,ot},this.compileAsync=function(O,j,it=null){const ot=this.compile(O,j,it);return new Promise(et=>{function Pt(){if(ot.forEach(function(Vt){N.get(Vt).currentProgram.isReady()&&ot.delete(Vt)}),ot.size===0){et(O);return}setTimeout(Pt,10)}ht.get("KHR_parallel_shader_compile")!==null?Pt():setTimeout(Pt,10)})};let Fe=null;function ye(O){Fe&&Fe(O)}function Ne(){hn.stop()}function Pe(){hn.start()}const hn=new Cf;hn.setAnimationLoop(ye),typeof self<"u"&&hn.setContext(self),this.setAnimationLoop=function(O){Fe=O,S.setAnimationLoop(O),O===null?hn.stop():hn.start()},S.addEventListener("sessionstart",Ne),S.addEventListener("sessionend",Pe),this.render=function(O,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),S.enabled===!0&&S.isPresenting===!0&&(S.cameraAutoUpdate===!0&&S.updateCamera(j),j=S.getCamera()),O.isScene===!0&&O.onBeforeRender(b,O,j,R),v=Et.get(O,D.length),v.init(),D.push(v),ut.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),bt.setFromProjectionMatrix(ut),K=this.localClippingEnabled,Z=Ct.init(this.clippingPlanes,K),w=Wt.get(O,y.length),w.init(),y.push(w),vn(O,j,0,b.sortObjects),w.finish(),b.sortObjects===!0&&w.sort(z,ct),this.info.render.frame++,Z===!0&&Ct.beginShadows();const it=v.state.shadowsArray;if(qt.render(it,O,j),Z===!0&&Ct.endShadows(),this.info.autoReset===!0&&this.info.reset(),(S.enabled===!1||S.isPresenting===!1||S.hasDepthSensing()===!1)&&Ot.render(w,O),v.setupLights(b._useLegacyLights),j.isArrayCamera){const ot=j.cameras;for(let et=0,Pt=ot.length;et<Pt;et++){const Vt=ot[et];ni(w,O,Vt,Vt.viewport)}}else ni(w,O,j);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),O.isScene===!0&&O.onAfterRender(b,O,j),de.resetDefaultState(),U=-1,C=null,D.pop(),D.length>0?v=D[D.length-1]:v=null,y.pop(),y.length>0?w=y[y.length-1]:w=null};function vn(O,j,it,ot){if(O.visible===!1)return;if(O.layers.test(j.layers)){if(O.isGroup)it=O.renderOrder;else if(O.isLOD)O.autoUpdate===!0&&O.update(j);else if(O.isLight)v.pushLight(O),O.castShadow&&v.pushShadow(O);else if(O.isSprite){if(!O.frustumCulled||bt.intersectsSprite(O)){ot&&St.setFromMatrixPosition(O.matrixWorld).applyMatrix4(ut);const Vt=kt.update(O),Zt=O.material;Zt.visible&&w.push(O,Vt,Zt,it,St.z,null)}}else if((O.isMesh||O.isLine||O.isPoints)&&(!O.frustumCulled||bt.intersectsObject(O))){const Vt=kt.update(O),Zt=O.material;if(ot&&(O.boundingSphere!==void 0?(O.boundingSphere===null&&O.computeBoundingSphere(),St.copy(O.boundingSphere.center)):(Vt.boundingSphere===null&&Vt.computeBoundingSphere(),St.copy(Vt.boundingSphere.center)),St.applyMatrix4(O.matrixWorld).applyMatrix4(ut)),Array.isArray(Zt)){const Xt=Vt.groups;for(let ee=0,Qt=Xt.length;ee<Qt;ee++){const ne=Xt[ee],Re=Zt[ne.materialIndex];Re&&Re.visible&&w.push(O,Vt,Re,it,St.z,ne)}}else Zt.visible&&w.push(O,Vt,Zt,it,St.z,null)}}const Pt=O.children;for(let Vt=0,Zt=Pt.length;Vt<Zt;Vt++)vn(Pt[Vt],j,it,ot)}function ni(O,j,it,ot){const et=O.opaque,Pt=O.transmissive,Vt=O.transparent;v.setupLightsView(it),Z===!0&&Ct.setGlobalState(b.clippingPlanes,it),Pt.length>0&&Ui(et,Pt,j,it),ot&&dt.viewport(E.copy(ot)),et.length>0&&qe(et,j,it),Pt.length>0&&qe(Pt,j,it),Vt.length>0&&qe(Vt,j,it),dt.buffers.depth.setTest(!0),dt.buffers.depth.setMask(!0),dt.buffers.color.setMask(!0),dt.setPolygonOffset(!1)}function Ui(O,j,it,ot){if((it.isScene===!0?it.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget===null){v.state.transmissionRenderTarget=new Ms(1,1,{generateMipmaps:!0,type:ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float")?Pa:Ji,minFilter:ys,samples:4,stencilBuffer:a});const ee=N.get(v.state.transmissionRenderTarget);ee.__isTransmissionRenderTarget=!0}const Pt=v.state.transmissionRenderTarget;b.getDrawingBufferSize(_t),Pt.setSize(_t.x,_t.y);const Vt=b.getRenderTarget();b.setRenderTarget(Pt),b.getClearColor(F),W=b.getClearAlpha(),W<1&&b.setClearColor(16777215,.5),b.clear();const Zt=b.toneMapping;b.toneMapping=Ki,qe(O,it,ot),T.updateMultisampleRenderTarget(Pt),T.updateRenderTargetMipmap(Pt);let Xt=!1;for(let ee=0,Qt=j.length;ee<Qt;ee++){const ne=j[ee],Re=ne.object,dn=ne.geometry,Oe=ne.material,fn=ne.group;if(Oe.side===Hn&&Re.layers.test(ot.layers)){const we=Oe.side;Oe.side=Tn,Oe.needsUpdate=!0,Ht(Re,it,ot,dn,Oe,fn),Oe.side=we,Oe.needsUpdate=!0,Xt=!0}}Xt===!0&&(T.updateMultisampleRenderTarget(Pt),T.updateRenderTargetMipmap(Pt)),b.setRenderTarget(Vt),b.setClearColor(F,W),b.toneMapping=Zt}function qe(O,j,it){const ot=j.isScene===!0?j.overrideMaterial:null;for(let et=0,Pt=O.length;et<Pt;et++){const Vt=O[et],Zt=Vt.object,Xt=Vt.geometry,ee=ot===null?Vt.material:ot,Qt=Vt.group;Zt.layers.test(it.layers)&&Ht(Zt,j,it,Xt,ee,Qt)}}function Ht(O,j,it,ot,et,Pt){O.onBeforeRender(b,j,it,ot,et,Pt),O.modelViewMatrix.multiplyMatrices(it.matrixWorldInverse,O.matrixWorld),O.normalMatrix.getNormalMatrix(O.modelViewMatrix),et.onBeforeRender(b,j,it,ot,O,Pt),et.transparent===!0&&et.side===Hn&&et.forceSinglePass===!1?(et.side=Tn,et.needsUpdate=!0,b.renderBufferDirect(it,j,ot,et,O,Pt),et.side=Qi,et.needsUpdate=!0,b.renderBufferDirect(it,j,ot,et,O,Pt),et.side=Hn):b.renderBufferDirect(it,j,ot,et,O,Pt),O.onAfterRender(b,j,it,ot,et,Pt)}function ns(O,j,it){j.isScene!==!0&&(j=At);const ot=N.get(O),et=v.state.lights,Pt=v.state.shadowsArray,Vt=et.state.version,Zt=xt.getParameters(O,et.state,Pt,j,it),Xt=xt.getProgramCacheKey(Zt);let ee=ot.programs;ot.environment=O.isMeshStandardMaterial?j.environment:null,ot.fog=j.fog,ot.envMap=(O.isMeshStandardMaterial?rt:$).get(O.envMap||ot.environment),ot.envMapRotation=ot.environment!==null&&O.envMap===null?j.environmentRotation:O.envMapRotation,ee===void 0&&(O.addEventListener("dispose",Dt),ee=new Map,ot.programs=ee);let Qt=ee.get(Xt);if(Qt!==void 0){if(ot.currentProgram===Qt&&ot.lightsStateVersion===Vt)return Ir(O,Zt),Qt}else Zt.uniforms=xt.getUniforms(O),O.onBuild(it,Zt,b),O.onBeforeCompile(Zt,b),Qt=xt.acquireProgram(Zt,Xt),ee.set(Xt,Qt),ot.uniforms=Zt.uniforms;const ne=ot.uniforms;return(!O.isShaderMaterial&&!O.isRawShaderMaterial||O.clipping===!0)&&(ne.clippingPlanes=Ct.uniform),Ir(O,Zt),ot.needsLights=Po(O),ot.lightsStateVersion=Vt,ot.needsLights&&(ne.ambientLightColor.value=et.state.ambient,ne.lightProbe.value=et.state.probe,ne.directionalLights.value=et.state.directional,ne.directionalLightShadows.value=et.state.directionalShadow,ne.spotLights.value=et.state.spot,ne.spotLightShadows.value=et.state.spotShadow,ne.rectAreaLights.value=et.state.rectArea,ne.ltc_1.value=et.state.rectAreaLTC1,ne.ltc_2.value=et.state.rectAreaLTC2,ne.pointLights.value=et.state.point,ne.pointLightShadows.value=et.state.pointShadow,ne.hemisphereLights.value=et.state.hemi,ne.directionalShadowMap.value=et.state.directionalShadowMap,ne.directionalShadowMatrix.value=et.state.directionalShadowMatrix,ne.spotShadowMap.value=et.state.spotShadowMap,ne.spotLightMatrix.value=et.state.spotLightMatrix,ne.spotLightMap.value=et.state.spotLightMap,ne.pointShadowMap.value=et.state.pointShadowMap,ne.pointShadowMatrix.value=et.state.pointShadowMatrix),ot.currentProgram=Qt,ot.uniformsList=null,Qt}function Rr(O){if(O.uniformsList===null){const j=O.currentProgram.getUniforms();O.uniformsList=wa.seqWithValue(j.seq,O.uniforms)}return O.uniformsList}function Ir(O,j){const it=N.get(O);it.outputColorSpace=j.outputColorSpace,it.batching=j.batching,it.instancing=j.instancing,it.instancingColor=j.instancingColor,it.instancingMorph=j.instancingMorph,it.skinning=j.skinning,it.morphTargets=j.morphTargets,it.morphNormals=j.morphNormals,it.morphColors=j.morphColors,it.morphTargetsCount=j.morphTargetsCount,it.numClippingPlanes=j.numClippingPlanes,it.numIntersection=j.numClipIntersection,it.vertexAlphas=j.vertexAlphas,it.vertexTangents=j.vertexTangents,it.toneMapping=j.toneMapping}function Lo(O,j,it,ot,et){j.isScene!==!0&&(j=At),T.resetTextureUnits();const Pt=j.fog,Vt=ot.isMeshStandardMaterial?j.environment:null,Zt=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:es,Xt=(ot.isMeshStandardMaterial?rt:$).get(ot.envMap||Vt),ee=ot.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,Qt=!!it.attributes.tangent&&(!!ot.normalMap||ot.anisotropy>0),ne=!!it.morphAttributes.position,Re=!!it.morphAttributes.normal,dn=!!it.morphAttributes.color;let Oe=Ki;ot.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Oe=b.toneMapping);const fn=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,we=fn!==void 0?fn.length:0,ie=N.get(ot),yi=v.state.lights;if(Z===!0&&(K===!0||O!==C)){const on=O===C&&ot.id===U;Ct.setState(ot,O,on)}let Gt=!1;ot.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==yi.state.version||ie.outputColorSpace!==Zt||et.isBatchedMesh&&ie.batching===!1||!et.isBatchedMesh&&ie.batching===!0||et.isInstancedMesh&&ie.instancing===!1||!et.isInstancedMesh&&ie.instancing===!0||et.isSkinnedMesh&&ie.skinning===!1||!et.isSkinnedMesh&&ie.skinning===!0||et.isInstancedMesh&&ie.instancingColor===!0&&et.instanceColor===null||et.isInstancedMesh&&ie.instancingColor===!1&&et.instanceColor!==null||et.isInstancedMesh&&ie.instancingMorph===!0&&et.morphTexture===null||et.isInstancedMesh&&ie.instancingMorph===!1&&et.morphTexture!==null||ie.envMap!==Xt||ot.fog===!0&&ie.fog!==Pt||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==Ct.numPlanes||ie.numIntersection!==Ct.numIntersection)||ie.vertexAlphas!==ee||ie.vertexTangents!==Qt||ie.morphTargets!==ne||ie.morphNormals!==Re||ie.morphColors!==dn||ie.toneMapping!==Oe||ie.morphTargetsCount!==we)&&(Gt=!0):(Gt=!0,ie.__version=ot.version);let _e=ie.currentProgram;Gt===!0&&(_e=ns(ot,j,et));let is=!1,Nn=!1,ii=!1;const Be=_e.getUniforms(),$t=ie.uniforms;if(dt.useProgram(_e.program)&&(is=!0,Nn=!0,ii=!0),ot.id!==U&&(U=ot.id,Nn=!0),is||C!==O){Be.setValue(q,"projectionMatrix",O.projectionMatrix),Be.setValue(q,"viewMatrix",O.matrixWorldInverse);const on=Be.map.cameraPosition;on!==void 0&&on.setValue(q,St.setFromMatrixPosition(O.matrixWorld)),gt.logarithmicDepthBuffer&&Be.setValue(q,"logDepthBufFC",2/(Math.log(O.far+1)/Math.LN2)),(ot.isMeshPhongMaterial||ot.isMeshToonMaterial||ot.isMeshLambertMaterial||ot.isMeshBasicMaterial||ot.isMeshStandardMaterial||ot.isShaderMaterial)&&Be.setValue(q,"isOrthographic",O.isOrthographicCamera===!0),C!==O&&(C=O,Nn=!0,ii=!0)}if(et.isSkinnedMesh){Be.setOptional(q,et,"bindMatrix"),Be.setOptional(q,et,"bindMatrixInverse");const on=et.skeleton;on&&(on.boneTexture===null&&on.computeBoneTexture(),Be.setValue(q,"boneTexture",on.boneTexture,T))}et.isBatchedMesh&&(Be.setOptional(q,et,"batchingTexture"),Be.setValue(q,"batchingTexture",et._matricesTexture,T));const Ee=it.morphAttributes;if((Ee.position!==void 0||Ee.normal!==void 0||Ee.color!==void 0)&&Ut.update(et,it,_e),(Nn||ie.receiveShadow!==et.receiveShadow)&&(ie.receiveShadow=et.receiveShadow,Be.setValue(q,"receiveShadow",et.receiveShadow)),ot.isMeshGouraudMaterial&&ot.envMap!==null&&($t.envMap.value=Xt,$t.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),ot.isMeshStandardMaterial&&ot.envMap===null&&j.environment!==null&&($t.envMapIntensity.value=j.environmentIntensity),Nn&&(Be.setValue(q,"toneMappingExposure",b.toneMappingExposure),ie.needsLights&&Dr($t,ii),Pt&&ot.fog===!0&&zt.refreshFogUniforms($t,Pt),zt.refreshMaterialUniforms($t,ot,ft,Y,v.state.transmissionRenderTarget),wa.upload(q,Rr(ie),$t,T)),ot.isShaderMaterial&&ot.uniformsNeedUpdate===!0&&(wa.upload(q,Rr(ie),$t,T),ot.uniformsNeedUpdate=!1),ot.isSpriteMaterial&&Be.setValue(q,"center",et.center),Be.setValue(q,"modelViewMatrix",et.modelViewMatrix),Be.setValue(q,"normalMatrix",et.normalMatrix),Be.setValue(q,"modelMatrix",et.matrixWorld),ot.isShaderMaterial||ot.isRawShaderMaterial){const on=ot.uniformsGroups;for(let ki=0,yn=on.length;ki<yn;ki++){const Co=on[ki];ge.update(Co,_e),ge.bind(Co,_e)}}return _e}function Dr(O,j){O.ambientLightColor.needsUpdate=j,O.lightProbe.needsUpdate=j,O.directionalLights.needsUpdate=j,O.directionalLightShadows.needsUpdate=j,O.pointLights.needsUpdate=j,O.pointLightShadows.needsUpdate=j,O.spotLights.needsUpdate=j,O.spotLightShadows.needsUpdate=j,O.rectAreaLights.needsUpdate=j,O.hemisphereLights.needsUpdate=j}function Po(O){return O.isMeshLambertMaterial||O.isMeshToonMaterial||O.isMeshPhongMaterial||O.isMeshStandardMaterial||O.isShadowMaterial||O.isShaderMaterial&&O.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(O,j,it){N.get(O.texture).__webglTexture=j,N.get(O.depthTexture).__webglTexture=it;const ot=N.get(O);ot.__hasExternalTextures=!0,ot.__autoAllocateDepthBuffer=it===void 0,ot.__autoAllocateDepthBuffer||ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ot.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(O,j){const it=N.get(O);it.__webglFramebuffer=j,it.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(O,j=0,it=0){R=O,k=j,I=it;let ot=!0,et=null,Pt=!1,Vt=!1;if(O){const Xt=N.get(O);Xt.__useDefaultFramebuffer!==void 0?(dt.bindFramebuffer(q.FRAMEBUFFER,null),ot=!1):Xt.__webglFramebuffer===void 0?T.setupRenderTarget(O):Xt.__hasExternalTextures&&T.rebindTextures(O,N.get(O.texture).__webglTexture,N.get(O.depthTexture).__webglTexture);const ee=O.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Vt=!0);const Qt=N.get(O).__webglFramebuffer;O.isWebGLCubeRenderTarget?(Array.isArray(Qt[j])?et=Qt[j][it]:et=Qt[j],Pt=!0):O.samples>0&&T.useMultisampledRTT(O)===!1?et=N.get(O).__webglMultisampledFramebuffer:Array.isArray(Qt)?et=Qt[it]:et=Qt,E.copy(O.viewport),B.copy(O.scissor),X=O.scissorTest}else E.copy(G).multiplyScalar(ft).floor(),B.copy(st).multiplyScalar(ft).floor(),X=yt;if(dt.bindFramebuffer(q.FRAMEBUFFER,et)&&ot&&dt.drawBuffers(O,et),dt.viewport(E),dt.scissor(B),dt.setScissorTest(X),Pt){const Xt=N.get(O.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+j,Xt.__webglTexture,it)}else if(Vt){const Xt=N.get(O.texture),ee=j||0;q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,Xt.__webglTexture,it||0,ee)}U=-1},this.readRenderTargetPixels=function(O,j,it,ot,et,Pt,Vt){if(!(O&&O.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Zt=N.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Vt!==void 0&&(Zt=Zt[Vt]),Zt){dt.bindFramebuffer(q.FRAMEBUFFER,Zt);try{const Xt=O.texture,ee=Xt.format,Qt=Xt.type;if(ee!==di&&fe.convert(ee)!==q.getParameter(q.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ne=Qt===Pa&&(ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float"));if(Qt!==Ji&&fe.convert(Qt)!==q.getParameter(q.IMPLEMENTATION_COLOR_READ_TYPE)&&Qt!==Ii&&!ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=O.width-ot&&it>=0&&it<=O.height-et&&q.readPixels(j,it,ot,et,fe.convert(ee),fe.convert(Qt),Pt)}finally{const Xt=R!==null?N.get(R).__webglFramebuffer:null;dt.bindFramebuffer(q.FRAMEBUFFER,Xt)}}},this.copyFramebufferToTexture=function(O,j,it=0){const ot=Math.pow(2,-it),et=Math.floor(j.image.width*ot),Pt=Math.floor(j.image.height*ot);T.setTexture2D(j,0),q.copyTexSubImage2D(q.TEXTURE_2D,it,0,0,O.x,O.y,et,Pt),dt.unbindTexture()},this.copyTextureToTexture=function(O,j,it,ot=0){const et=j.image.width,Pt=j.image.height,Vt=fe.convert(it.format),Zt=fe.convert(it.type);T.setTexture2D(it,0),q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,it.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,it.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,it.unpackAlignment),j.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,ot,O.x,O.y,et,Pt,Vt,Zt,j.image.data):j.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,ot,O.x,O.y,j.mipmaps[0].width,j.mipmaps[0].height,Vt,j.mipmaps[0].data):q.texSubImage2D(q.TEXTURE_2D,ot,O.x,O.y,Vt,Zt,j.image),ot===0&&it.generateMipmaps&&q.generateMipmap(q.TEXTURE_2D),dt.unbindTexture()},this.copyTextureToTexture3D=function(O,j,it,ot,et=0){const Pt=Math.round(O.max.x-O.min.x),Vt=Math.round(O.max.y-O.min.y),Zt=O.max.z-O.min.z+1,Xt=fe.convert(ot.format),ee=fe.convert(ot.type);let Qt;if(ot.isData3DTexture)T.setTexture3D(ot,0),Qt=q.TEXTURE_3D;else if(ot.isDataArrayTexture||ot.isCompressedArrayTexture)T.setTexture2DArray(ot,0),Qt=q.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}q.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,ot.flipY),q.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ot.premultiplyAlpha),q.pixelStorei(q.UNPACK_ALIGNMENT,ot.unpackAlignment);const ne=q.getParameter(q.UNPACK_ROW_LENGTH),Re=q.getParameter(q.UNPACK_IMAGE_HEIGHT),dn=q.getParameter(q.UNPACK_SKIP_PIXELS),Oe=q.getParameter(q.UNPACK_SKIP_ROWS),fn=q.getParameter(q.UNPACK_SKIP_IMAGES),we=it.isCompressedTexture?it.mipmaps[et]:it.image;q.pixelStorei(q.UNPACK_ROW_LENGTH,we.width),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,we.height),q.pixelStorei(q.UNPACK_SKIP_PIXELS,O.min.x),q.pixelStorei(q.UNPACK_SKIP_ROWS,O.min.y),q.pixelStorei(q.UNPACK_SKIP_IMAGES,O.min.z),it.isDataTexture||it.isData3DTexture?q.texSubImage3D(Qt,et,j.x,j.y,j.z,Pt,Vt,Zt,Xt,ee,we.data):ot.isCompressedArrayTexture?q.compressedTexSubImage3D(Qt,et,j.x,j.y,j.z,Pt,Vt,Zt,Xt,we.data):q.texSubImage3D(Qt,et,j.x,j.y,j.z,Pt,Vt,Zt,Xt,ee,we),q.pixelStorei(q.UNPACK_ROW_LENGTH,ne),q.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Re),q.pixelStorei(q.UNPACK_SKIP_PIXELS,dn),q.pixelStorei(q.UNPACK_SKIP_ROWS,Oe),q.pixelStorei(q.UNPACK_SKIP_IMAGES,fn),et===0&&ot.generateMipmaps&&q.generateMipmap(Qt),dt.unbindTexture()},this.initTexture=function(O){O.isCubeTexture?T.setTextureCube(O,0):O.isData3DTexture?T.setTexture3D(O,0):O.isDataArrayTexture||O.isCompressedArrayTexture?T.setTexture2DArray(O,0):T.setTexture2D(O,0),dt.unbindTexture()},this.resetState=function(){k=0,I=0,R=null,dt.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Vc?"display-p3":"srgb",e.unpackColorSpace=xe.workingColorSpace===ja?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Zx extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Xx extends cn{constructor(t=null,e=1,n=1,r,a,l,c,h,d=En,f=En,g,m){super(null,l,c,h,d,f,r,a,g,m),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class xd extends Jn{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const er=new Me,Md=new Me,pa=[],bd=new As,qx=new Me,Kr=new De,Jr=new Tr;class $x extends De{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new xd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,qx)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new As),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,er),bd.copy(t.boundingBox).applyMatrix4(er),this.boundingBox.union(bd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Tr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,er),Jr.copy(t.boundingSphere).applyMatrix4(er),this.boundingSphere.union(Jr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,a=n.length+1,l=t*a+1;for(let c=0;c<n.length;c++)n[c]=r[l+c]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(Kr.geometry=this.geometry,Kr.material=this.material,Kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(n),t.ray.intersectsSphere(Jr)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,er),Md.multiplyMatrices(n,er),Kr.matrixWorld=Md,Kr.raycast(t,pa);for(let l=0,c=pa.length;l<c;l++){const h=pa[l];h.instanceId=a,h.object=this,e.push(h)}pa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new xd(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Xx(new Float32Array(r*this.count),r,this.count,ff,Ii));const a=this.morphTexture.source.data.data;let l=0;for(let d=0;d<n.length;d++)l+=n[d];const c=this.geometry.morphTargetsRelative?1:1-l,h=r*t;a[h]=c,a.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Qa extends Ar{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new te(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const wd=new V,Sd=new V,Ed=new Me,cc=new Ka,ma=new Tr;class Xc extends tn{constructor(t=new un,e=new Qa){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,a=e.count;r<a;r++)wd.fromBufferAttribute(e,r-1),Sd.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=wd.distanceTo(Sd);t.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,a=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),ma.radius+=a,t.ray.intersectsSphere(ma)===!1)return;Ed.copy(r).invert(),cc.copy(t.ray).applyMatrix4(Ed);const c=a/((this.scale.x+this.scale.y+this.scale.z)/3),h=c*c,d=new V,f=new V,g=new V,m=new V,_=this.isLineSegments?2:1,M=n.index,v=n.attributes.position;if(M!==null){const y=Math.max(0,l.start),D=Math.min(M.count,l.start+l.count);for(let b=y,A=D-1;b<A;b+=_){const k=M.getX(b),I=M.getX(b+1);if(d.fromBufferAttribute(v,k),f.fromBufferAttribute(v,I),cc.distanceSqToSegment(d,f,m,g)>h)continue;m.applyMatrix4(this.matrixWorld);const U=t.ray.origin.distanceTo(m);U<t.near||U>t.far||e.push({distance:U,point:g.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const y=Math.max(0,l.start),D=Math.min(v.count,l.start+l.count);for(let b=y,A=D-1;b<A;b+=_){if(d.fromBufferAttribute(v,b),f.fromBufferAttribute(v,b+1),cc.distanceSqToSegment(d,f,m,g)>h)continue;m.applyMatrix4(this.matrixWorld);const I=t.ray.origin.distanceTo(m);I<t.near||I>t.far||e.push({distance:I,point:g.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const c=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}}}}const Td=new V,Ad=new V;class Yx extends Xc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,a=e.count;r<a;r+=2)Td.fromBufferAttribute(e,r),Ad.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Td.distanceTo(Ad);t.setAttribute("lineDistance",new We(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ff extends cn{constructor(t,e,n,r,a,l,c,h,d){super(t,e,n,r,a,l,c,h,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class vi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),a=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),a+=n.distanceTo(r),e.push(a),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const a=n.length;let l;e?l=e:l=t*n[a-1];let c=0,h=a-1,d;for(;c<=h;)if(r=Math.floor(c+(h-c)/2),d=n[r]-l,d<0)c=r+1;else if(d>0)h=r-1;else{h=r;break}if(r=h,n[r]===l)return r/(a-1);const f=n[r],m=n[r+1]-f,_=(l-f)/m;return(r+_)/(a-1)}getTangent(t,e){let r=t-1e-4,a=t+1e-4;r<0&&(r=0),a>1&&(a=1);const l=this.getPoint(r),c=this.getPoint(a),h=e||(l.isVector2?new wt:new V);return h.copy(c).sub(l).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new V,r=[],a=[],l=[],c=new V,h=new Me;for(let _=0;_<=t;_++){const M=_/t;r[_]=this.getTangentAt(M,new V)}a[0]=new V,l[0]=new V;let d=Number.MAX_VALUE;const f=Math.abs(r[0].x),g=Math.abs(r[0].y),m=Math.abs(r[0].z);f<=d&&(d=f,n.set(1,0,0)),g<=d&&(d=g,n.set(0,1,0)),m<=d&&n.set(0,0,1),c.crossVectors(r[0],n).normalize(),a[0].crossVectors(r[0],c),l[0].crossVectors(r[0],a[0]);for(let _=1;_<=t;_++){if(a[_]=a[_-1].clone(),l[_]=l[_-1].clone(),c.crossVectors(r[_-1],r[_]),c.length()>Number.EPSILON){c.normalize();const M=Math.acos(sn(r[_-1].dot(r[_]),-1,1));a[_].applyMatrix4(h.makeRotationAxis(c,M))}l[_].crossVectors(r[_],a[_])}if(e===!0){let _=Math.acos(sn(a[0].dot(a[t]),-1,1));_/=t,r[0].dot(c.crossVectors(a[0],a[t]))>0&&(_=-_);for(let M=1;M<=t;M++)a[M].applyMatrix4(h.makeRotationAxis(r[M],_*M)),l[M].crossVectors(r[M],a[M])}return{tangents:r,normals:a,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class qc extends vi{constructor(t=0,e=0,n=1,r=1,a=0,l=Math.PI*2,c=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=l,this.aClockwise=c,this.aRotation=h}getPoint(t,e=new wt){const n=e,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const l=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(l?a=0:a=r),this.aClockwise===!0&&!l&&(a===r?a=-r:a=a-r);const c=this.aStartAngle+t*a;let h=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),g=Math.sin(this.aRotation),m=h-this.aX,_=d-this.aY;h=m*f-_*g+this.aX,d=m*g+_*f+this.aY}return n.set(h,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class jx extends qc{constructor(t,e,n,r,a,l){super(t,e,n,n,r,a,l),this.isArcCurve=!0,this.type="ArcCurve"}}function $c(){let s=0,t=0,e=0,n=0;function r(a,l,c,h){s=a,t=c,e=-3*a+3*l-2*c-h,n=2*a-2*l+c+h}return{initCatmullRom:function(a,l,c,h,d){r(l,c,d*(c-a),d*(h-l))},initNonuniformCatmullRom:function(a,l,c,h,d,f,g){let m=(l-a)/d-(c-a)/(d+f)+(c-l)/f,_=(c-l)/f-(h-l)/(f+g)+(h-c)/g;m*=f,_*=f,r(l,c,m,_)},calc:function(a){const l=a*a,c=l*a;return s+t*a+e*l+n*c}}}const ga=new V,uc=new $c,hc=new $c,dc=new $c;class Oa extends vi{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new V){const n=e,r=this.points,a=r.length,l=(a-(this.closed?0:1))*t;let c=Math.floor(l),h=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/a)+1)*a:h===0&&c===a-1&&(c=a-2,h=1);let d,f;this.closed||c>0?d=r[(c-1)%a]:(ga.subVectors(r[0],r[1]).add(r[0]),d=ga);const g=r[c%a],m=r[(c+1)%a];if(this.closed||c+2<a?f=r[(c+2)%a]:(ga.subVectors(r[a-1],r[a-2]).add(r[a-1]),f=ga),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let M=Math.pow(d.distanceToSquared(g),_),w=Math.pow(g.distanceToSquared(m),_),v=Math.pow(m.distanceToSquared(f),_);w<1e-4&&(w=1),M<1e-4&&(M=w),v<1e-4&&(v=w),uc.initNonuniformCatmullRom(d.x,g.x,m.x,f.x,M,w,v),hc.initNonuniformCatmullRom(d.y,g.y,m.y,f.y,M,w,v),dc.initNonuniformCatmullRom(d.z,g.z,m.z,f.z,M,w,v)}else this.curveType==="catmullrom"&&(uc.initCatmullRom(d.x,g.x,m.x,f.x,this.tension),hc.initCatmullRom(d.y,g.y,m.y,f.y,this.tension),dc.initCatmullRom(d.z,g.z,m.z,f.z,this.tension));return n.set(uc.calc(h),hc.calc(h),dc.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new V().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Ld(s,t,e,n,r){const a=(n-t)*.5,l=(r-e)*.5,c=s*s,h=s*c;return(2*e-2*n+a+l)*h+(-3*e+3*n-2*a-l)*c+a*s+e}function Kx(s,t){const e=1-s;return e*e*t}function Jx(s,t){return 2*(1-s)*s*t}function Qx(s,t){return s*s*t}function ro(s,t,e,n){return Kx(s,t)+Jx(s,e)+Qx(s,n)}function tM(s,t){const e=1-s;return e*e*e*t}function eM(s,t){const e=1-s;return 3*e*e*s*t}function nM(s,t){return 3*(1-s)*s*s*t}function iM(s,t){return s*s*s*t}function oo(s,t,e,n,r){return tM(s,t)+eM(s,e)+nM(s,n)+iM(s,r)}class Bf extends vi{constructor(t=new wt,e=new wt,n=new wt,r=new wt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new wt){const n=e,r=this.v0,a=this.v1,l=this.v2,c=this.v3;return n.set(oo(t,r.x,a.x,l.x,c.x),oo(t,r.y,a.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sM extends vi{constructor(t=new V,e=new V,n=new V,r=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new V){const n=e,r=this.v0,a=this.v1,l=this.v2,c=this.v3;return n.set(oo(t,r.x,a.x,l.x,c.x),oo(t,r.y,a.y,l.y,c.y),oo(t,r.z,a.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zf extends vi{constructor(t=new wt,e=new wt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new wt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new wt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rM extends vi{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hf extends vi{constructor(t=new wt,e=new wt,n=new wt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new wt){const n=e,r=this.v0,a=this.v1,l=this.v2;return n.set(ro(t,r.x,a.x,l.x),ro(t,r.y,a.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vf extends vi{constructor(t=new V,e=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new V){const n=e,r=this.v0,a=this.v1,l=this.v2;return n.set(ro(t,r.x,a.x,l.x),ro(t,r.y,a.y,l.y),ro(t,r.z,a.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gf extends vi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new wt){const n=e,r=this.points,a=(r.length-1)*t,l=Math.floor(a),c=a-l,h=r[l===0?l:l-1],d=r[l],f=r[l>r.length-2?r.length-1:l+1],g=r[l>r.length-3?r.length-1:l+2];return n.set(Ld(c,h.x,d.x,f.x,g.x),Ld(c,h.y,d.y,f.y,g.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new wt().fromArray(r))}return this}}var Ua=Object.freeze({__proto__:null,ArcCurve:jx,CatmullRomCurve3:Oa,CubicBezierCurve:Bf,CubicBezierCurve3:sM,EllipseCurve:qc,LineCurve:zf,LineCurve3:rM,QuadraticBezierCurve:Hf,QuadraticBezierCurve3:Vf,SplineCurve:Gf});class oM extends vi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ua[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let a=0;for(;a<r.length;){if(r[a]>=n){const l=r[a]-n,c=this.curves[a],h=c.getLength(),d=h===0?0:1-l/h;return c.getPointAt(d,e)}a++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,a=this.curves;r<a.length;r++){const l=a[r],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,h=l.getPoints(c);for(let d=0;d<h.length;d++){const f=h[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Ua[r.type]().fromJSON(r))}return this}}class Pd extends oM{constructor(t){super(),this.type="Path",this.currentPoint=new wt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new zf(this.currentPoint.clone(),new wt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const a=new Hf(this.currentPoint.clone(),new wt(t,e),new wt(n,r));return this.curves.push(a),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,a,l){const c=new Bf(this.currentPoint.clone(),new wt(t,e),new wt(n,r),new wt(a,l));return this.curves.push(c),this.currentPoint.set(a,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Gf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+c,e+h,n,r,a,l),this}absarc(t,e,n,r,a,l){return this.absellipse(t,e,n,n,r,a,l),this}ellipse(t,e,n,r,a,l,c,h){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,r,a,l,c,h),this}absellipse(t,e,n,r,a,l,c,h){const d=new qc(t,e,n,r,a,l,c,h);if(this.curves.length>0){const g=d.getPoint(0);g.equals(this.currentPoint)||this.lineTo(g.x,g.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ao extends un{constructor(t=1,e=1,n=1,r=32,a=1,l=!1,c=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:a,openEnded:l,thetaStart:c,thetaLength:h};const d=this;r=Math.floor(r),a=Math.floor(a);const f=[],g=[],m=[],_=[];let M=0;const w=[],v=n/2;let y=0;D(),l===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(f),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(m,3)),this.setAttribute("uv",new We(_,2));function D(){const A=new V,k=new V;let I=0;const R=(e-t)/n;for(let U=0;U<=a;U++){const C=[],E=U/a,B=E*(e-t)+t;for(let X=0;X<=r;X++){const F=X/r,W=F*h+c,Q=Math.sin(W),Y=Math.cos(W);k.x=B*Q,k.y=-E*n+v,k.z=B*Y,g.push(k.x,k.y,k.z),A.set(Q,R,Y).normalize(),m.push(A.x,A.y,A.z),_.push(F,1-E),C.push(M++)}w.push(C)}for(let U=0;U<r;U++)for(let C=0;C<a;C++){const E=w[C][U],B=w[C+1][U],X=w[C+1][U+1],F=w[C][U+1];f.push(E,B,F),f.push(B,X,F),I+=6}d.addGroup(y,I,0),y+=I}function b(A){const k=M,I=new wt,R=new V;let U=0;const C=A===!0?t:e,E=A===!0?1:-1;for(let X=1;X<=r;X++)g.push(0,v*E,0),m.push(0,E,0),_.push(.5,.5),M++;const B=M;for(let X=0;X<=r;X++){const W=X/r*h+c,Q=Math.cos(W),Y=Math.sin(W);R.x=C*Y,R.y=v*E,R.z=C*Q,g.push(R.x,R.y,R.z),m.push(0,E,0),I.x=Q*.5+.5,I.y=Y*.5*E+.5,_.push(I.x,I.y),M++}for(let X=0;X<r;X++){const F=k+X,W=B+X;A===!0?f.push(W,W+1,F):f.push(W+1,W,F),U+=3}d.addGroup(y,U,A===!0?1:2),y+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ao(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const _a=new V,va=new V,fc=new V,ya=new jn;class aM extends un{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),a=Math.cos(so*e),l=t.getIndex(),c=t.getAttribute("position"),h=l?l.count:c.count,d=[0,0,0],f=["a","b","c"],g=new Array(3),m={},_=[];for(let M=0;M<h;M+=3){l?(d[0]=l.getX(M),d[1]=l.getX(M+1),d[2]=l.getX(M+2)):(d[0]=M,d[1]=M+1,d[2]=M+2);const{a:w,b:v,c:y}=ya;if(w.fromBufferAttribute(c,d[0]),v.fromBufferAttribute(c,d[1]),y.fromBufferAttribute(c,d[2]),ya.getNormal(fc),g[0]=`${Math.round(w.x*r)},${Math.round(w.y*r)},${Math.round(w.z*r)}`,g[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,g[2]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let D=0;D<3;D++){const b=(D+1)%3,A=g[D],k=g[b],I=ya[f[D]],R=ya[f[b]],U=`${A}_${k}`,C=`${k}_${A}`;C in m&&m[C]?(fc.dot(m[C].normal)<=a&&(_.push(I.x,I.y,I.z),_.push(R.x,R.y,R.z)),m[C]=null):U in m||(m[U]={index0:d[D],index1:d[b],normal:fc.clone()})}}for(const M in m)if(m[M]){const{index0:w,index1:v}=m[M];_a.fromBufferAttribute(c,w),va.fromBufferAttribute(c,v),_.push(_a.x,_a.y,_a.z),_.push(va.x,va.y,va.z)}this.setAttribute("position",new We(_,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class tl extends Pd{constructor(t){super(t),this.uuid=Er(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Pd().fromJSON(r))}return this}}const lM={triangulate:function(s,t,e=2){const n=t&&t.length,r=n?t[0]*e:s.length;let a=Wf(s,0,r,e,!0);const l=[];if(!a||a.next===a.prev)return l;let c,h,d,f,g,m,_;if(n&&(a=fM(s,t,a,e)),s.length>80*e){c=d=s[0],h=f=s[1];for(let M=e;M<r;M+=e)g=s[M],m=s[M+1],g<c&&(c=g),m<h&&(h=m),g>d&&(d=g),m>f&&(f=m);_=Math.max(d-c,f-h),_=_!==0?32767/_:0}return mo(a,l,e,c,h,_,0),l}};function Wf(s,t,e,n,r){let a,l;if(r===SM(s,t,e,n)>0)for(a=t;a<e;a+=n)l=Cd(a,s[a],s[a+1],l);else for(a=e-n;a>=t;a-=n)l=Cd(a,s[a],s[a+1],l);return l&&el(l,l.next)&&(_o(l),l=l.next),l}function ws(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(el(e,e.next)||Ie(e.prev,e,e.next)===0)){if(_o(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function mo(s,t,e,n,r,a,l){if(!s)return;!l&&a&&vM(s,n,r,a);let c=s,h,d;for(;s.prev!==s.next;){if(h=s.prev,d=s.next,a?uM(s,n,r,a):cM(s)){t.push(h.i/e|0),t.push(s.i/e|0),t.push(d.i/e|0),_o(s),s=d.next,c=d.next;continue}if(s=d,s===c){l?l===1?(s=hM(ws(s),t,e),mo(s,t,e,n,r,a,2)):l===2&&dM(s,t,e,n,r,a):mo(ws(s),t,e,n,r,a,1);break}}}function cM(s){const t=s.prev,e=s,n=s.next;if(Ie(t,e,n)>=0)return!1;const r=t.x,a=e.x,l=n.x,c=t.y,h=e.y,d=n.y,f=r<a?r<l?r:l:a<l?a:l,g=c<h?c<d?c:d:h<d?h:d,m=r>a?r>l?r:l:a>l?a:l,_=c>h?c>d?c:d:h>d?h:d;let M=n.next;for(;M!==t;){if(M.x>=f&&M.x<=m&&M.y>=g&&M.y<=_&&lr(r,c,a,h,l,d,M.x,M.y)&&Ie(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function uM(s,t,e,n){const r=s.prev,a=s,l=s.next;if(Ie(r,a,l)>=0)return!1;const c=r.x,h=a.x,d=l.x,f=r.y,g=a.y,m=l.y,_=c<h?c<d?c:d:h<d?h:d,M=f<g?f<m?f:m:g<m?g:m,w=c>h?c>d?c:d:h>d?h:d,v=f>g?f>m?f:m:g>m?g:m,y=Ac(_,M,t,e,n),D=Ac(w,v,t,e,n);let b=s.prevZ,A=s.nextZ;for(;b&&b.z>=y&&A&&A.z<=D;){if(b.x>=_&&b.x<=w&&b.y>=M&&b.y<=v&&b!==r&&b!==l&&lr(c,f,h,g,d,m,b.x,b.y)&&Ie(b.prev,b,b.next)>=0||(b=b.prevZ,A.x>=_&&A.x<=w&&A.y>=M&&A.y<=v&&A!==r&&A!==l&&lr(c,f,h,g,d,m,A.x,A.y)&&Ie(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;b&&b.z>=y;){if(b.x>=_&&b.x<=w&&b.y>=M&&b.y<=v&&b!==r&&b!==l&&lr(c,f,h,g,d,m,b.x,b.y)&&Ie(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;A&&A.z<=D;){if(A.x>=_&&A.x<=w&&A.y>=M&&A.y<=v&&A!==r&&A!==l&&lr(c,f,h,g,d,m,A.x,A.y)&&Ie(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function hM(s,t,e){let n=s;do{const r=n.prev,a=n.next.next;!el(r,a)&&Zf(r,n,n.next,a)&&go(r,a)&&go(a,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(a.i/e|0),_o(n),_o(n.next),n=s=a),n=n.next}while(n!==s);return ws(n)}function dM(s,t,e,n,r,a){let l=s;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&MM(l,c)){let h=Xf(l,c);l=ws(l,l.next),h=ws(h,h.next),mo(l,t,e,n,r,a,0),mo(h,t,e,n,r,a,0);return}c=c.next}l=l.next}while(l!==s)}function fM(s,t,e,n){const r=[];let a,l,c,h,d;for(a=0,l=t.length;a<l;a++)c=t[a]*n,h=a<l-1?t[a+1]*n:s.length,d=Wf(s,c,h,n,!1),d===d.next&&(d.steiner=!0),r.push(xM(d));for(r.sort(pM),a=0;a<r.length;a++)e=mM(r[a],e);return e}function pM(s,t){return s.x-t.x}function mM(s,t){const e=gM(s,t);if(!e)return t;const n=Xf(e,s);return ws(n,n.next),ws(e,e.next)}function gM(s,t){let e=t,n=-1/0,r;const a=s.x,l=s.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const m=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(m<=a&&m>n&&(n=m,r=e.x<e.next.x?e:e.next,m===a))return r}e=e.next}while(e!==t);if(!r)return null;const c=r,h=r.x,d=r.y;let f=1/0,g;e=r;do a>=e.x&&e.x>=h&&a!==e.x&&lr(l<d?a:n,l,h,d,l<d?n:a,l,e.x,e.y)&&(g=Math.abs(l-e.y)/(a-e.x),go(e,s)&&(g<f||g===f&&(e.x>r.x||e.x===r.x&&_M(r,e)))&&(r=e,f=g)),e=e.next;while(e!==c);return r}function _M(s,t){return Ie(s.prev,s,t.prev)<0&&Ie(t.next,s,s.next)<0}function vM(s,t,e,n){let r=s;do r.z===0&&(r.z=Ac(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==s);r.prevZ.nextZ=null,r.prevZ=null,yM(r)}function yM(s){let t,e,n,r,a,l,c,h,d=1;do{for(e=s,s=null,a=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(h=d;c>0||h>0&&n;)c!==0&&(h===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,c--):(r=n,n=n.nextZ,h--),a?a.nextZ=r:s=r,r.prevZ=a,a=r;e=n}a.nextZ=null,d*=2}while(l>1);return s}function Ac(s,t,e,n,r){return s=(s-e)*r|0,t=(t-n)*r|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function xM(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function lr(s,t,e,n,r,a,l,c){return(r-l)*(t-c)>=(s-l)*(a-c)&&(s-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(a-c)>=(r-l)*(n-c)}function MM(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!bM(s,t)&&(go(s,t)&&go(t,s)&&wM(s,t)&&(Ie(s.prev,s,t.prev)||Ie(s,t.prev,t))||el(s,t)&&Ie(s.prev,s,s.next)>0&&Ie(t.prev,t,t.next)>0)}function Ie(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function el(s,t){return s.x===t.x&&s.y===t.y}function Zf(s,t,e,n){const r=Ma(Ie(s,t,e)),a=Ma(Ie(s,t,n)),l=Ma(Ie(e,n,s)),c=Ma(Ie(e,n,t));return!!(r!==a&&l!==c||r===0&&xa(s,e,t)||a===0&&xa(s,n,t)||l===0&&xa(e,s,n)||c===0&&xa(e,t,n))}function xa(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ma(s){return s>0?1:s<0?-1:0}function bM(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Zf(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function go(s,t){return Ie(s.prev,s,s.next)<0?Ie(s,t,s.next)>=0&&Ie(s,s.prev,t)>=0:Ie(s,t,s.prev)<0||Ie(s,s.next,t)<0}function wM(s,t){let e=s,n=!1;const r=(s.x+t.x)/2,a=(s.y+t.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&r<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Xf(s,t){const e=new Lc(s.i,s.x,s.y),n=new Lc(t.i,t.x,t.y),r=s.next,a=t.prev;return s.next=t,t.prev=s,e.next=r,r.prev=e,n.next=e,e.prev=n,a.next=n,n.prev=a,n}function Cd(s,t,e,n){const r=new Lc(s,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function _o(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Lc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function SM(s,t,e,n){let r=0;for(let a=t,l=e-n;a<e;a+=n)r+=(s[l]-s[a])*(s[a+1]+s[l+1]),l=a;return r}class lo{static area(t){const e=t.length;let n=0;for(let r=e-1,a=0;a<e;r=a++)n+=t[r].x*t[a].y-t[a].x*t[r].y;return n*.5}static isClockWise(t){return lo.area(t)<0}static triangulateShape(t,e){const n=[],r=[],a=[];Rd(t),Id(n,t);let l=t.length;e.forEach(Rd);for(let h=0;h<e.length;h++)r.push(l),l+=e[h].length,Id(n,e[h]);const c=lM.triangulate(n,r);for(let h=0;h<c.length;h+=3)a.push(c.slice(h,h+3));return a}}function Rd(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Id(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class So extends un{constructor(t=new tl([new wt(.5,.5),new wt(-.5,.5),new wt(-.5,-.5),new wt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],a=[];for(let c=0,h=t.length;c<h;c++){const d=t[c];l(d)}this.setAttribute("position",new We(r,3)),this.setAttribute("uv",new We(a,2)),this.computeVertexNormals();function l(c){const h=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,g=e.depth!==void 0?e.depth:1;let m=e.bevelEnabled!==void 0?e.bevelEnabled:!0,_=e.bevelThickness!==void 0?e.bevelThickness:.2,M=e.bevelSize!==void 0?e.bevelSize:_-.1,w=e.bevelOffset!==void 0?e.bevelOffset:0,v=e.bevelSegments!==void 0?e.bevelSegments:3;const y=e.extrudePath,D=e.UVGenerator!==void 0?e.UVGenerator:EM;let b,A=!1,k,I,R,U;y&&(b=y.getSpacedPoints(f),A=!0,m=!1,k=y.computeFrenetFrames(f,!1),I=new V,R=new V,U=new V),m||(v=0,_=0,M=0,w=0);const C=c.extractPoints(d);let E=C.shape;const B=C.holes;if(!lo.isClockWise(E)){E=E.reverse();for(let at=0,ht=B.length;at<ht;at++){const gt=B[at];lo.isClockWise(gt)&&(B[at]=gt.reverse())}}const F=lo.triangulateShape(E,B),W=E;for(let at=0,ht=B.length;at<ht;at++){const gt=B[at];E=E.concat(gt)}function Q(at,ht,gt){return ht||console.error("THREE.ExtrudeGeometry: vec does not exist"),at.clone().addScaledVector(ht,gt)}const Y=E.length,ft=F.length;function z(at,ht,gt){let dt,pt,N;const T=at.x-ht.x,$=at.y-ht.y,rt=gt.x-at.x,lt=gt.y-at.y,vt=T*T+$*$,kt=T*lt-$*rt;if(Math.abs(kt)>Number.EPSILON){const xt=Math.sqrt(vt),zt=Math.sqrt(rt*rt+lt*lt),Wt=ht.x-$/xt,Et=ht.y+T/xt,Ct=gt.x-lt/zt,qt=gt.y+rt/zt,Ot=((Ct-Wt)*lt-(qt-Et)*rt)/(T*lt-$*rt);dt=Wt+T*Ot-at.x,pt=Et+$*Ot-at.y;const Ut=dt*dt+pt*pt;if(Ut<=2)return new wt(dt,pt);N=Math.sqrt(Ut/2)}else{let xt=!1;T>Number.EPSILON?rt>Number.EPSILON&&(xt=!0):T<-Number.EPSILON?rt<-Number.EPSILON&&(xt=!0):Math.sign($)===Math.sign(lt)&&(xt=!0),xt?(dt=-$,pt=T,N=Math.sqrt(vt)):(dt=T,pt=$,N=Math.sqrt(vt/2))}return new wt(dt/N,pt/N)}const ct=[];for(let at=0,ht=W.length,gt=ht-1,dt=at+1;at<ht;at++,gt++,dt++)gt===ht&&(gt=0),dt===ht&&(dt=0),ct[at]=z(W[at],W[gt],W[dt]);const G=[];let st,yt=ct.concat();for(let at=0,ht=B.length;at<ht;at++){const gt=B[at];st=[];for(let dt=0,pt=gt.length,N=pt-1,T=dt+1;dt<pt;dt++,N++,T++)N===pt&&(N=0),T===pt&&(T=0),st[dt]=z(gt[dt],gt[N],gt[T]);G.push(st),yt=yt.concat(st)}for(let at=0;at<v;at++){const ht=at/v,gt=_*Math.cos(ht*Math.PI/2),dt=M*Math.sin(ht*Math.PI/2)+w;for(let pt=0,N=W.length;pt<N;pt++){const T=Q(W[pt],ct[pt],dt);_t(T.x,T.y,-gt)}for(let pt=0,N=B.length;pt<N;pt++){const T=B[pt];st=G[pt];for(let $=0,rt=T.length;$<rt;$++){const lt=Q(T[$],st[$],dt);_t(lt.x,lt.y,-gt)}}}const bt=M+w;for(let at=0;at<Y;at++){const ht=m?Q(E[at],yt[at],bt):E[at];A?(R.copy(k.normals[0]).multiplyScalar(ht.x),I.copy(k.binormals[0]).multiplyScalar(ht.y),U.copy(b[0]).add(R).add(I),_t(U.x,U.y,U.z)):_t(ht.x,ht.y,0)}for(let at=1;at<=f;at++)for(let ht=0;ht<Y;ht++){const gt=m?Q(E[ht],yt[ht],bt):E[ht];A?(R.copy(k.normals[at]).multiplyScalar(gt.x),I.copy(k.binormals[at]).multiplyScalar(gt.y),U.copy(b[at]).add(R).add(I),_t(U.x,U.y,U.z)):_t(gt.x,gt.y,g/f*at)}for(let at=v-1;at>=0;at--){const ht=at/v,gt=_*Math.cos(ht*Math.PI/2),dt=M*Math.sin(ht*Math.PI/2)+w;for(let pt=0,N=W.length;pt<N;pt++){const T=Q(W[pt],ct[pt],dt);_t(T.x,T.y,g+gt)}for(let pt=0,N=B.length;pt<N;pt++){const T=B[pt];st=G[pt];for(let $=0,rt=T.length;$<rt;$++){const lt=Q(T[$],st[$],dt);A?_t(lt.x,lt.y+b[f-1].y,b[f-1].x+gt):_t(lt.x,lt.y,g+gt)}}}Z(),K();function Z(){const at=r.length/3;if(m){let ht=0,gt=Y*ht;for(let dt=0;dt<ft;dt++){const pt=F[dt];St(pt[2]+gt,pt[1]+gt,pt[0]+gt)}ht=f+v*2,gt=Y*ht;for(let dt=0;dt<ft;dt++){const pt=F[dt];St(pt[0]+gt,pt[1]+gt,pt[2]+gt)}}else{for(let ht=0;ht<ft;ht++){const gt=F[ht];St(gt[2],gt[1],gt[0])}for(let ht=0;ht<ft;ht++){const gt=F[ht];St(gt[0]+Y*f,gt[1]+Y*f,gt[2]+Y*f)}}n.addGroup(at,r.length/3-at,0)}function K(){const at=r.length/3;let ht=0;ut(W,ht),ht+=W.length;for(let gt=0,dt=B.length;gt<dt;gt++){const pt=B[gt];ut(pt,ht),ht+=pt.length}n.addGroup(at,r.length/3-at,1)}function ut(at,ht){let gt=at.length;for(;--gt>=0;){const dt=gt;let pt=gt-1;pt<0&&(pt=at.length-1);for(let N=0,T=f+v*2;N<T;N++){const $=Y*N,rt=Y*(N+1),lt=ht+dt+$,vt=ht+pt+$,kt=ht+pt+rt,xt=ht+dt+rt;At(lt,vt,kt,xt)}}}function _t(at,ht,gt){h.push(at),h.push(ht),h.push(gt)}function St(at,ht,gt){It(at),It(ht),It(gt);const dt=r.length/3,pt=D.generateTopUV(n,r,dt-3,dt-2,dt-1);q(pt[0]),q(pt[1]),q(pt[2])}function At(at,ht,gt,dt){It(at),It(ht),It(dt),It(ht),It(gt),It(dt);const pt=r.length/3,N=D.generateSideWallUV(n,r,pt-6,pt-3,pt-2,pt-1);q(N[0]),q(N[1]),q(N[3]),q(N[1]),q(N[2]),q(N[3])}function It(at){r.push(h[at*3+0]),r.push(h[at*3+1]),r.push(h[at*3+2])}function q(at){a.push(at.x),a.push(at.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return TM(e,n,t)}static fromJSON(t,e){const n=[];for(let a=0,l=t.shapes.length;a<l;a++){const c=e[t.shapes[a]];n.push(c)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Ua[r.type]().fromJSON(r)),new So(n,t.options)}}const EM={generateTopUV:function(s,t,e,n,r){const a=t[e*3],l=t[e*3+1],c=t[n*3],h=t[n*3+1],d=t[r*3],f=t[r*3+1];return[new wt(a,l),new wt(c,h),new wt(d,f)]},generateSideWallUV:function(s,t,e,n,r,a){const l=t[e*3],c=t[e*3+1],h=t[e*3+2],d=t[n*3],f=t[n*3+1],g=t[n*3+2],m=t[r*3],_=t[r*3+1],M=t[r*3+2],w=t[a*3],v=t[a*3+1],y=t[a*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new wt(l,1-h),new wt(d,1-g),new wt(m,1-M),new wt(w,1-y)]:[new wt(c,1-h),new wt(f,1-g),new wt(_,1-M),new wt(v,1-y)]}};function TM(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,r=s.length;n<r;n++){const a=s[n];e.shapes.push(a.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class nl extends un{constructor(t=new Vf(new V(-1,-1,0),new V(-1,1,0),new V(1,1,0)),e=64,n=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:a};const l=t.computeFrenetFrames(e,a);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const c=new V,h=new V,d=new wt;let f=new V;const g=[],m=[],_=[],M=[];w(),this.setIndex(M),this.setAttribute("position",new We(g,3)),this.setAttribute("normal",new We(m,3)),this.setAttribute("uv",new We(_,2));function w(){for(let b=0;b<e;b++)v(b);v(a===!1?e:0),D(),y()}function v(b){f=t.getPointAt(b/e,f);const A=l.normals[b],k=l.binormals[b];for(let I=0;I<=r;I++){const R=I/r*Math.PI*2,U=Math.sin(R),C=-Math.cos(R);h.x=C*A.x+U*k.x,h.y=C*A.y+U*k.y,h.z=C*A.z+U*k.z,h.normalize(),m.push(h.x,h.y,h.z),c.x=f.x+n*h.x,c.y=f.y+n*h.y,c.z=f.z+n*h.z,g.push(c.x,c.y,c.z)}}function y(){for(let b=1;b<=e;b++)for(let A=1;A<=r;A++){const k=(r+1)*(b-1)+(A-1),I=(r+1)*b+(A-1),R=(r+1)*b+A,U=(r+1)*(b-1)+A;M.push(k,I,U),M.push(I,R,U)}}function D(){for(let b=0;b<=e;b++)for(let A=0;A<=r;A++)d.x=b/e,d.y=A/r,_.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new nl(new Ua[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class pi extends Ar{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new te(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new te(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=vf,this.normalScale=new wt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=Hc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qf extends tn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new te(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const pc=new Me,Dd=new V,Nd=new V;class AM{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new wt(512,512),this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wc,this._frameExtents=new wt(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Dd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Dd),Nd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nd),e.updateMatrixWorld(),pc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class LM extends AM{constructor(){super(new Rf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class PM extends qf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new LM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class CM extends qf{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Od=new Me;class $f{constructor(t,e,n=0,r=1/0){this.ray=new Ka(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new Gc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Od.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Od),this}intersectObject(t,e=!0,n=[]){return Pc(t,this,n,e),n.sort(Ud),n}intersectObjects(t,e=!0,n=[]){for(let r=0,a=t.length;r<a;r++)Pc(t[r],this,n,e);return n.sort(Ud),n}}function Ud(s,t){return s.distance-t.distance}function Pc(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const r=s.children;for(let a=0,l=r.length;a<l;a++)Pc(r[a],t,e,!0)}}class kd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(sn(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zc);const Fd={type:"change"},mc={type:"start"},Bd={type:"end"},ba=new Ka,zd=new zn,RM=Math.cos(70*Ng.DEG2RAD);class IM extends Ts{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Us.ROTATE,MIDDLE:Us.DOLLY,RIGHT:Us.PAN},this.touches={ONE:ks.ROTATE,TWO:ks.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Ct),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ct),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Fd),n.update(),a=r.NONE},this.update=function(){const S=new V,tt=new bs().setFromUnitVectors(t.up,new V(0,1,0)),mt=tt.clone().invert(),Tt=new V,Dt=new bs,he=new V,ae=2*Math.PI;return function(Fe=null){const ye=n.object.position;S.copy(ye).sub(n.target),S.applyQuaternion(tt),c.setFromVector3(S),n.autoRotate&&a===r.NONE&&X(E(Fe)),n.enableDamping?(c.theta+=h.theta*n.dampingFactor,c.phi+=h.phi*n.dampingFactor):(c.theta+=h.theta,c.phi+=h.phi);let Ne=n.minAzimuthAngle,Pe=n.maxAzimuthAngle;isFinite(Ne)&&isFinite(Pe)&&(Ne<-Math.PI?Ne+=ae:Ne>Math.PI&&(Ne-=ae),Pe<-Math.PI?Pe+=ae:Pe>Math.PI&&(Pe-=ae),Ne<=Pe?c.theta=Math.max(Ne,Math.min(Pe,c.theta)):c.theta=c.theta>(Ne+Pe)/2?Math.max(Ne,c.theta):Math.min(Pe,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let hn=!1;if(n.zoomToCursor&&I||n.object.isOrthographicCamera)c.radius=G(c.radius);else{const vn=c.radius;c.radius=G(c.radius*d),hn=vn!=c.radius}if(S.setFromSpherical(c),S.applyQuaternion(mt),ye.copy(n.target).add(S),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&I){let vn=null;if(n.object.isPerspectiveCamera){const ni=S.length();vn=G(ni*d);const Ui=ni-vn;n.object.position.addScaledVector(A,Ui),n.object.updateMatrixWorld(),hn=!!Ui}else if(n.object.isOrthographicCamera){const ni=new V(k.x,k.y,0);ni.unproject(n.object);const Ui=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),hn=Ui!==n.object.zoom;const qe=new V(k.x,k.y,0);qe.unproject(n.object),n.object.position.sub(qe).add(ni),n.object.updateMatrixWorld(),vn=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;vn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(vn).add(n.object.position):(ba.origin.copy(n.object.position),ba.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ba.direction))<RM?t.lookAt(n.target):(zd.setFromNormalAndCoplanarPoint(n.object.up,n.target),ba.intersectPlane(zd,n.target))))}else if(n.object.isOrthographicCamera){const vn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),vn!==n.object.zoom&&(n.object.updateProjectionMatrix(),hn=!0)}return d=1,I=!1,hn||Tt.distanceToSquared(n.object.position)>l||8*(1-Dt.dot(n.object.quaternion))>l||he.distanceToSquared(n.target)>l?(n.dispatchEvent(Fd),Tt.copy(n.object.position),Dt.copy(n.object.quaternion),he.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ut),n.domElement.removeEventListener("pointerdown",$),n.domElement.removeEventListener("pointercancel",lt),n.domElement.removeEventListener("wheel",xt),n.domElement.removeEventListener("pointermove",rt),n.domElement.removeEventListener("pointerup",lt),n.domElement.getRootNode().removeEventListener("keydown",Wt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ct),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=r.NONE;const l=1e-6,c=new kd,h=new kd;let d=1;const f=new V,g=new wt,m=new wt,_=new wt,M=new wt,w=new wt,v=new wt,y=new wt,D=new wt,b=new wt,A=new V,k=new wt;let I=!1;const R=[],U={};let C=!1;function E(S){return S!==null?2*Math.PI/60*n.autoRotateSpeed*S:2*Math.PI/60/60*n.autoRotateSpeed}function B(S){const tt=Math.abs(S*.01);return Math.pow(.95,n.zoomSpeed*tt)}function X(S){h.theta-=S}function F(S){h.phi-=S}const W=function(){const S=new V;return function(mt,Tt){S.setFromMatrixColumn(Tt,0),S.multiplyScalar(-mt),f.add(S)}}(),Q=function(){const S=new V;return function(mt,Tt){n.screenSpacePanning===!0?S.setFromMatrixColumn(Tt,1):(S.setFromMatrixColumn(Tt,0),S.crossVectors(n.object.up,S)),S.multiplyScalar(mt),f.add(S)}}(),Y=function(){const S=new V;return function(mt,Tt){const Dt=n.domElement;if(n.object.isPerspectiveCamera){const he=n.object.position;S.copy(he).sub(n.target);let ae=S.length();ae*=Math.tan(n.object.fov/2*Math.PI/180),W(2*mt*ae/Dt.clientHeight,n.object.matrix),Q(2*Tt*ae/Dt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(W(mt*(n.object.right-n.object.left)/n.object.zoom/Dt.clientWidth,n.object.matrix),Q(Tt*(n.object.top-n.object.bottom)/n.object.zoom/Dt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ft(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function z(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function ct(S,tt){if(!n.zoomToCursor)return;I=!0;const mt=n.domElement.getBoundingClientRect(),Tt=S-mt.left,Dt=tt-mt.top,he=mt.width,ae=mt.height;k.x=Tt/he*2-1,k.y=-(Dt/ae)*2+1,A.set(k.x,k.y,1).unproject(n.object).sub(n.object.position).normalize()}function G(S){return Math.max(n.minDistance,Math.min(n.maxDistance,S))}function st(S){g.set(S.clientX,S.clientY)}function yt(S){ct(S.clientX,S.clientX),y.set(S.clientX,S.clientY)}function bt(S){M.set(S.clientX,S.clientY)}function Z(S){m.set(S.clientX,S.clientY),_.subVectors(m,g).multiplyScalar(n.rotateSpeed);const tt=n.domElement;X(2*Math.PI*_.x/tt.clientHeight),F(2*Math.PI*_.y/tt.clientHeight),g.copy(m),n.update()}function K(S){D.set(S.clientX,S.clientY),b.subVectors(D,y),b.y>0?ft(B(b.y)):b.y<0&&z(B(b.y)),y.copy(D),n.update()}function ut(S){w.set(S.clientX,S.clientY),v.subVectors(w,M).multiplyScalar(n.panSpeed),Y(v.x,v.y),M.copy(w),n.update()}function _t(S){ct(S.clientX,S.clientY),S.deltaY<0?z(B(S.deltaY)):S.deltaY>0&&ft(B(S.deltaY)),n.update()}function St(S){let tt=!1;switch(S.code){case n.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(0,n.keyPanSpeed),tt=!0;break;case n.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(0,-n.keyPanSpeed),tt=!0;break;case n.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?X(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(n.keyPanSpeed,0),tt=!0;break;case n.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?X(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Y(-n.keyPanSpeed,0),tt=!0;break}tt&&(S.preventDefault(),n.update())}function At(S){if(R.length===1)g.set(S.pageX,S.pageY);else{const tt=ge(S),mt=.5*(S.pageX+tt.x),Tt=.5*(S.pageY+tt.y);g.set(mt,Tt)}}function It(S){if(R.length===1)M.set(S.pageX,S.pageY);else{const tt=ge(S),mt=.5*(S.pageX+tt.x),Tt=.5*(S.pageY+tt.y);M.set(mt,Tt)}}function q(S){const tt=ge(S),mt=S.pageX-tt.x,Tt=S.pageY-tt.y,Dt=Math.sqrt(mt*mt+Tt*Tt);y.set(0,Dt)}function at(S){n.enableZoom&&q(S),n.enablePan&&It(S)}function ht(S){n.enableZoom&&q(S),n.enableRotate&&At(S)}function gt(S){if(R.length==1)m.set(S.pageX,S.pageY);else{const mt=ge(S),Tt=.5*(S.pageX+mt.x),Dt=.5*(S.pageY+mt.y);m.set(Tt,Dt)}_.subVectors(m,g).multiplyScalar(n.rotateSpeed);const tt=n.domElement;X(2*Math.PI*_.x/tt.clientHeight),F(2*Math.PI*_.y/tt.clientHeight),g.copy(m)}function dt(S){if(R.length===1)w.set(S.pageX,S.pageY);else{const tt=ge(S),mt=.5*(S.pageX+tt.x),Tt=.5*(S.pageY+tt.y);w.set(mt,Tt)}v.subVectors(w,M).multiplyScalar(n.panSpeed),Y(v.x,v.y),M.copy(w)}function pt(S){const tt=ge(S),mt=S.pageX-tt.x,Tt=S.pageY-tt.y,Dt=Math.sqrt(mt*mt+Tt*Tt);D.set(0,Dt),b.set(0,Math.pow(D.y/y.y,n.zoomSpeed)),ft(b.y),y.copy(D);const he=(S.pageX+tt.x)*.5,ae=(S.pageY+tt.y)*.5;ct(he,ae)}function N(S){n.enableZoom&&pt(S),n.enablePan&&dt(S)}function T(S){n.enableZoom&&pt(S),n.enableRotate&&gt(S)}function $(S){n.enabled!==!1&&(R.length===0&&(n.domElement.setPointerCapture(S.pointerId),n.domElement.addEventListener("pointermove",rt),n.domElement.addEventListener("pointerup",lt)),!fe(S)&&(le(S),S.pointerType==="touch"?qt(S):vt(S)))}function rt(S){n.enabled!==!1&&(S.pointerType==="touch"?Ot(S):kt(S))}function lt(S){switch(ce(S),R.length){case 0:n.domElement.releasePointerCapture(S.pointerId),n.domElement.removeEventListener("pointermove",rt),n.domElement.removeEventListener("pointerup",lt),n.dispatchEvent(Bd),a=r.NONE;break;case 1:const tt=R[0],mt=U[tt];qt({pointerId:tt,pageX:mt.x,pageY:mt.y});break}}function vt(S){let tt;switch(S.button){case 0:tt=n.mouseButtons.LEFT;break;case 1:tt=n.mouseButtons.MIDDLE;break;case 2:tt=n.mouseButtons.RIGHT;break;default:tt=-1}switch(tt){case Us.DOLLY:if(n.enableZoom===!1)return;yt(S),a=r.DOLLY;break;case Us.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enablePan===!1)return;bt(S),a=r.PAN}else{if(n.enableRotate===!1)return;st(S),a=r.ROTATE}break;case Us.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enableRotate===!1)return;st(S),a=r.ROTATE}else{if(n.enablePan===!1)return;bt(S),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(mc)}function kt(S){switch(a){case r.ROTATE:if(n.enableRotate===!1)return;Z(S);break;case r.DOLLY:if(n.enableZoom===!1)return;K(S);break;case r.PAN:if(n.enablePan===!1)return;ut(S);break}}function xt(S){n.enabled===!1||n.enableZoom===!1||a!==r.NONE||(S.preventDefault(),n.dispatchEvent(mc),_t(zt(S)),n.dispatchEvent(Bd))}function zt(S){const tt=S.deltaMode,mt={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(tt){case 1:mt.deltaY*=16;break;case 2:mt.deltaY*=100;break}return S.ctrlKey&&!C&&(mt.deltaY*=10),mt}function Wt(S){S.key==="Control"&&(C=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(S){S.key==="Control"&&(C=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function Ct(S){n.enabled===!1||n.enablePan===!1||St(S)}function qt(S){switch(de(S),R.length){case 1:switch(n.touches.ONE){case ks.ROTATE:if(n.enableRotate===!1)return;At(S),a=r.TOUCH_ROTATE;break;case ks.PAN:if(n.enablePan===!1)return;It(S),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(n.touches.TWO){case ks.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;at(S),a=r.TOUCH_DOLLY_PAN;break;case ks.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ht(S),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(mc)}function Ot(S){switch(de(S),a){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;gt(S),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;dt(S),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;N(S),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;T(S),n.update();break;default:a=r.NONE}}function Ut(S){n.enabled!==!1&&S.preventDefault()}function le(S){R.push(S.pointerId)}function ce(S){delete U[S.pointerId];for(let tt=0;tt<R.length;tt++)if(R[tt]==S.pointerId){R.splice(tt,1);return}}function fe(S){for(let tt=0;tt<R.length;tt++)if(R[tt]==S.pointerId)return!0;return!1}function de(S){let tt=U[S.pointerId];tt===void 0&&(tt=new wt,U[S.pointerId]=tt),tt.set(S.pageX,S.pageY)}function ge(S){const tt=S.pointerId===R[0]?R[1]:R[0];return U[tt]}n.domElement.addEventListener("contextmenu",Ut),n.domElement.addEventListener("pointerdown",$),n.domElement.addEventListener("pointercancel",lt),n.domElement.addEventListener("wheel",xt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Wt,{passive:!0,capture:!0}),this.update()}}var Eo=Uint8Array,Yf=Uint16Array,DM=Int32Array,NM=new Eo([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),OM=new Eo([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),jf=function(s,t){for(var e=new Yf(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var r=new DM(e[30]),n=1;n<30;++n)for(var a=e[n];a<e[n+1];++a)r[a]=a-e[n]<<5|n;return{b:e,r}},Kf=jf(NM,2),UM=Kf.b,kM=Kf.r;UM[28]=258,kM[258]=28;jf(OM,0);var FM=new Yf(32768);for(ve=0;ve<32768;++ve)Pi=(ve&43690)>>1|(ve&21845)<<1,Pi=(Pi&52428)>>2|(Pi&13107)<<2,Pi=(Pi&61680)>>4|(Pi&3855)<<4,FM[ve]=((Pi&65280)>>8|(Pi&255)<<8)>>1;var Pi,ve,il=new Eo(288);for(ve=0;ve<144;++ve)il[ve]=8;var ve;for(ve=144;ve<256;++ve)il[ve]=9;var ve;for(ve=256;ve<280;++ve)il[ve]=7;var ve;for(ve=280;ve<288;++ve)il[ve]=8;var ve,BM=new Eo(32);for(ve=0;ve<32;++ve)BM[ve]=5;var ve,zM=new Eo(0),HM=typeof TextDecoder<"u"&&new TextDecoder,VM=0;try{HM.decode(zM,{stream:!0}),VM=1}catch{}const GM="modulepreload",WM=function(s){return"/"+s},Hd={},ZM=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=Promise.allSettled(e.map(h=>{if(h=WM(h),h in Hd)return;Hd[h]=!0;const d=h.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const g=document.createElement("link");if(g.rel=d?"stylesheet":GM,d||(g.as="script"),g.crossOrigin="",g.href=h,c&&g.setAttribute("nonce",c),document.head.appendChild(g),d)return new Promise((m,_)=>{g.addEventListener("load",m),g.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return r.then(l=>{for(const c of l||[])c.status==="rejected"&&a(c.reason);return t().catch(a)})};let Sn=null,Le=null,_n=null,Kn=null,Vd="",Jt=null,jt=null,ci=null,Cc="",mi=[],Gd="",Dn=null,sl=null;const Kt={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500",7:"#b8b8b8",8:"#262626"},Ge={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0,river_polygons:!0,barren:!0,buildings:!0,roads:!0,towers:!0},pe={};let Rc=1,Jf=1,XM=0;const gi=[];let Qn=[],ka=[],rl=[];const To=new Map;let vo=-1,ol=!1,Yc="",Vn=200,Gn=200,Ss=2,ti=1,Sa=[],yo=-1,Fa=!1;const al={water_ocean:!0,water_lake:!0,water_pond:!0,water_reservoir:!0,water_wastewater:!0,water_human:!0,water_other:!0};let co=1,Ic=-1;const Yi={rivers:!0,streams_named:!0,streams_unnamed:!0,river_polygons:!0,canals:!0,canal_polygons:!0},Qr={lc_forest:!1,lc_forest_detailed:!1,lc_scrub:!1,lc_shrub:!1,lc_grass:!1,lc_grass_detailed:!1,lc_crop:!1,lc_moss:!1,lc_wetland:!1,lc_wetland_detailed:!1,lc_mangrove:!1,lc_barren:!1,lc_desert:!1,lc_sand:!1,lc_rock:!1,lc_snow:!1,lc_glacier:!1,lc_urban:!1},$i={veg_dense:{...Qr,lc_forest:!0,lc_forest_detailed:!0,lc_shrub:!0,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},veg_low:{...Qr,lc_scrub:!0,lc_grass:!0,lc_grass_detailed:!0,lc_crop:!0,lc_moss:!0},wetland_lc:{...Qr,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},snow_lc:{...Qr,lc_snow:!0,lc_glacier:!0},barren_lc:{...Qr,lc_barren:!0,lc_desert:!0,lc_sand:!0,lc_rock:!0,lc_urban:!0}},Qf={veg_dense:0,veg_low:0,wetland_lc:0,snow_lc:0,barren_lc:0};let qM=.2,Ba=1,za=1,Ha=.6,Va=1,ei=[],Dc=[],Wd=[],Zd="";function $M(s){Ba=s}function YM(s){za=s}function jM(s){Ha=s}function KM(s){Va=s}let Ga=0,jc=.5,ll=1,Kc="raised",Rn=[],Pn=null;function JM(s){Ga=s}function QM(s){jc=s}function tb(s){ll=s}function eb(s){Kc=s}function Xd(s,t,e){$i[s]&&($i[s][t]=e,jt&&(jt.dispose(),jt=null))}function nb(s,t){Qf[s]=t}const rr={},Wa={};let ui=null,qd="",Ke=null,Za=null,Nc=[],xs=null,Ce=null,cr=null,to=null,Jc=!1;const In=256,ib=3072;let rn=[];const ur=[];function tp(){if(!Ce||!cr)return!1;const s=cr.getBoundingClientRect();return!s.width||!s.height?!1:(Ce.style.left=`${s.left}px`,Ce.style.top=`${s.top}px`,Ce.style.width=`${s.width}px`,Ce.style.height=`${s.height}px`,Sn&&(Sn.setSize(s.width,s.height,!1),_n.aspect=s.width/s.height,_n.updateProjectionMatrix()),!0)}function $d(){if(!Ce||!Jc)return;tp()&&Ce.style.display==="none"&&(Ce.style.display="block")}function br(s){if(Ce||(Ce=document.getElementById("dims-canvas")),cr!==s&&(to&&cr&&to.unobserve(cr),cr=s,to||(to=new ResizeObserver($d),window.addEventListener("resize",$d)),to.observe(s)),Jc=!0,tp()&&Ce&&(Ce.style.display="block"),Sn)return;const t=s.getBoundingClientRect(),e=t.width||800,n=t.height||600;Sn=new Wx({canvas:Ce,antialias:!0}),Sn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Sn.setSize(e,n,!1),Sn.localClippingEnabled=!0,Le=new Zx,Le.background=new te(527380),_n=new Bn(42,e/n,.1,1e5),Kn=new IM(_n,Ce),Kn.enableDamping=!0,Kn.dampingFactor=.06,Le.add(new CM(16777215,.8));const r=new PM(16777215,.6);r.position.set(1.5,3,2),Le.add(r);const a=()=>{requestAnimationFrame(a),Kn.update(),Sn.render(Le,_n),kb()};a()}function ep(){Jc=!1,Ce&&(Ce.style.display="none")}function Pr(s){if(Object.assign(Kt,s),Jt&&(jt&&(jt.dispose(),jt=null),jt=mr(Jt.bounds,Jt.grid,In,Jt.minE,Jt.elevRange,mi,Vn,Gn,ti,Rn,ei),Ke)){const f=Ke.material;f.map=jt,f.needsUpdate=!0}const t=pe.base??1;Za&&Za.material.color.set(Kt[t]??Kt[1]);const e=pe.facade??1,n=new te(Kt[e]??Kt[1]);for(const f of Nc)f.material.color.set(n);if(xs){const f=pe.gpx_line??6,g=Kt[f]??"#ff4500";xs.traverse(m=>{const _=m.material;_?.color&&_.color.set(g)}),xs.visible=Ge.gpx_line??!0}const r=pe.gpx??6,a=Kt[r]??"#ff4500";for(const f of Qn)f.traverse(g=>{const m=g.material;m?.color&&m.color.set(a)});const l=pe.buildings??7,c=new te(Kt[l]??"#b8b8b8");for(const f of ka)f.material.color.set(c);const h=pe.roads??8,d=new te(Kt[h]??"#262626");Pn?.traverse(f=>{const g=f.material;g?.color&&g.color.set(d)});for(const f of rl){const g=f.__zoneLayerId,m=pr.find(M=>M.id===g);if(!m)continue;const _=pe[g]??m.slot;f.material.color.set(Kt[_]??"#888")}}function sb(s,t){pe[s]=t,Pr({})}function np(s,t){if(Ge[s]=t,s==="gpx_line")xs&&(xs.visible=t);else if(s==="gpx")for(const e of Qn)e.visible=t;else if(s==="buildings"){for(const e of ka)e.visible=t;Jt&&(jt&&(jt.dispose(),jt=null),jt=mr(Jt.bounds,Jt.grid,In,Jt.minE,Jt.elevRange,mi,Vn,Gn,ti,Rn,ei),Ke&&(Ke.material.map=jt,Ke.material.needsUpdate=!0),fo&&Ea())}else if(s==="roads")Pn&&(Pn.visible=t),Jt&&(jt&&(jt.dispose(),jt=null),jt=mr(Jt.bounds,Jt.grid,In,Jt.minE,Jt.elevRange,mi,Vn,Gn,ti,Rn,ei),Ke&&(Ke.material.map=jt,Ke.material.needsUpdate=!0),fo&&Ea());else if(Jt){if(jt&&(jt.dispose(),jt=null),jt=mr(Jt.bounds,Jt.grid,In,Jt.minE,Jt.elevRange,mi,Vn,Gn,ti,Rn,ei),Ke){const e=Ke.material;e.map=jt,e.needsUpdate=!0}fo&&Ea()}}function rb(s,t){Rc=s,Jf=t}function ob(s){ol=!0,Yc=s,Ce&&(Ce.style.cursor="crosshair")}function ip(){ol=!1,Yc="",Ce&&(Ce.style.cursor="")}function sp(){return ol}function ab(s,t){if(!ol||!Le||!_n||!Ke||!Ce)return-1;const e=Ce.getBoundingClientRect(),n=(s-e.left)/e.width*2-1,r=-((t-e.top)/e.height)*2+1,a=new $f;a.setFromCamera(new wt(n,r),_n);const l=a.intersectObject(Ke);let c=-1;if(l.length>0){const h=l[0].point,d=.5-h.z/Gn,f=.5+h.x/Vn,g=XM++,m={id:g,latFrac:d,lonFrac:f,shape:Yc,visible:!0,diameterMult:10,rotDeg:0,flatTop:!0,heightOffMult:0};gi.push(m),tu(m,gi.length-1),c=g}return ip(),c}function Oc(){return gi.map(s=>({id:s.id,shape:s.shape,visible:s.visible,diameterMult:s.diameterMult,rotDeg:s.rotDeg,flatTop:s.flatTop,heightOffMult:s.heightOffMult}))}function Uc(){return vo}function rp(s){vo=s}function lb(){vo=-1}function cb(s,t){if(!Le||!_n||!Ce||Qn.length===0)return-1;const e=Ce.getBoundingClientRect(),n=(s-e.left)/e.width*2-1,r=-((t-e.top)/e.height)*2+1,a=new $f;a.setFromCamera(new wt(n,r),_n);const l=a.intersectObjects(Qn,!0);if(!l.length)return-1;let c=l[0].object;for(;c;){const h=To.get(c);if(h!==void 0)return h;c=c.parent}return-1}function kc(s,t){const e=gi.findIndex(a=>a.id===s);if(e<0)return;Object.assign(gi[e],t);const n=Qn[e];if(n){To.delete(n),Le?.remove(n);const a=rn.indexOf(n);a>=0&&rn.splice(a,1),Qn.splice(e,1)}const r=gi[e];tu(r,e)}function ub(s,t){kc(s,{visible:t})}function hb(s){const t=gi.findIndex(n=>n.id===s);if(t<0)return;gi.splice(t,1);const e=Qn.splice(t,1)[0];if(e){To.delete(e),Le?.remove(e);const n=rn.indexOf(e);n>=0&&rn.splice(n,1)}vo===s&&(vo=-1)}async function db(s,t,e){if(!Le||!_n||!Kn||!Sn)return;const n=`${s.minLat}|${s.maxLat}|${s.minLon}|${s.maxLon}`,r=n!==Vd;r&&(Vd=n,Jt=null,jt&&(jt.dispose(),jt=null),e(5,"Téléchargement des altitudes…"),Jt=await Ob(s));const a={features:n!==Gd,buildings:n!==Zd};if(a.features||a.buildings){e(30,"Chargement des données géographiques…");const{zoneFeatures:c,buildings:h,towers:d,roads:f}=await pb(s);(c.length>0||h.length>0||f.length>0)&&(Gd=n,Zd=n,c.length>0&&(mi=c,jt&&(jt.dispose(),jt=null)),ei=h,Dc=d,Rn=f)}if(!jt&&Jt){e(70,"Génération de la texture…");const{wMm:c,dMm:h,exag:d}=t,f=s,g=(f.minLat+f.maxLat)/2,m=Math.max((f.maxLon-f.minLon)*Math.cos(g*Math.PI/180)*111320,(f.maxLat-f.minLat)*111320),_=Math.max(c,h),M=Math.max(1,Math.min(_*.5,Jt.elevRange/m*_*d));jt=mr(s,Jt.grid,In,Jt.minE,Jt.elevRange,mi,c,h,M,Rn,ei)}else r||e(50,"Reconstruction…");const l=JSON.stringify(t.zonePts);(l!==Cc||!ci)&&(Cc=l,ci&&(ci.dispose(),ci=null),ci=Sb(t.zonePts,t.zoneType,s)),e(88,"Construction de la scène 3D…"),bn(t),e(100,"")}function bn(s){if(!Le||!_n||!Kn||!Jt)return;Ub();const{wMm:t,dMm:e,baseH:n,exag:r,flatFacade:a,facadeWidthMm:l,gpxPoints:c,zoneType:h,zonePts:d,bounds:f}=s,{grid:g,minE:m,elevRange:_}=Jt,M=f??Jt.bounds;Sa=c;const w=(M.minLat+M.maxLat)/2,v=(M.maxLon-M.minLon)*Math.cos(w*Math.PI/180)*111320,y=(M.maxLat-M.minLat)*111320,D=Math.max(v,y),b=Math.max(t,e),A=Math.max(1,Math.min(b*.5,_/D*b*r));jt||(jt=mr(M,g,In,m,_,mi,t,e,A,Rn,ei));const k=n+A,I=In,R=Eb(d,h,M,t,e);Dn=R;const U=Math.max(1,l);Ke=null,Za=null,Nc=[],xs=null,ui=null,Qn=[],ka=[],rl=[],Pn=null,Vn=t,Gn=e,Ss=n,ti=A;const E=wb(g,I,M,mi,_,A,.2);sl=E;{const z=new wo(t,e,I-1,I-1);z.rotateX(-Math.PI/2);const ct=z.attributes.position;for(let st=0;st<ct.count;st++)ct.setY(st,n+(E[st]-m)/_*A);ct.needsUpdate=!0,z.computeVertexNormals();const G=new De(z,new pi({map:jt,alphaMap:ci??void 0,transparent:!!ci}));Ke=G,Xi(G)}const B=pe.base??1,X=new te(Kt[B]??Kt[1]),F=new De(Tb(R,h,t,e,n,U),new pi({color:X,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));Za=F,Xi(F);const W=pe.facade??1,Q=new te(Kt[W]??Kt[1]),Y=new pi({color:Q,side:Hn});for(const z of Ab(R,h,t,e,U,a,k,g,I,m,_,n,A))z.material=Y,Nc.push(z),Xi(z);if(c.length>=2){const z=Nb(c,M,t,e,E,I,m,_,n,A);z&&(z.visible=Ge.gpx_line??!0,xs=z,Xi(z))}{const z=new Yx(new aM(new Oi(t+U*2,k,e+U*2)),new Qa({color:16718362}));z.position.y=k/2,Xi(z)}ur.length=0,ur.push({id:"dl-width",v:new V(0,2,e/2+U+14)}),ur.push({id:"dl-depth",v:new V(t/2+U+14,k*.1,0)}),ur.push({id:"dl-height",v:new V(-t/2-U-12,k/2,e/2+8)}),nr("dl-width",`${t} mm`),nr("dl-depth",`${e} mm`),nr("dl-height",`~${Math.round(k*10)/10} mm`),nr("dp-total-val",`~${Math.round(k*10)/10}`),nr("dp-map-h",`~${Math.round(A*10)/10}`),nr("dp-base-h-disp",`${n}`),Vn=t,Gn=e,Ss=n,ti=A,To.clear();for(let z=0;z<gi.length;z++)tu(gi[z],z);Qc();try{Fc()}catch(z){console.warn("rebuildRoadMeshes failed:",z)}if(ei.length>0){const z=Ge.buildings??!0;for(const ct of mb(ei,M,E,I,m,_,t,e,n,A))ct.visible=z,ka.push(ct),Xi(ct)}if(Wd=[],Dc.length>0){const z=Ge.towers??!0;for(const ct of gb(Dc,M,E,I,m,_,t,e,n,A))ct.visible=z,Wd.push(ct),Xi(ct)}const ft=Math.sqrt(t*t+e*e);{const z=new V(0,k*.3,0);Kn.target.lengthSq()<.1&&(_n.position.set(t*.7,k+ft*.44,e*.92),_n.lookAt(z)),Kn.target.copy(z),Kn.update()}}function fb(){Kn&&Kn.target.set(0,0,0),jt&&(jt.dispose(),jt=null),ci&&(ci.dispose(),ci=null),Cc=""}async function pb(s){const t={zoneFeatures:[],buildings:[],towers:[],roads:[]},{minLat:e,minLon:n,maxLat:r,maxLon:a}=s,l=`(${e},${n},${r},${a})`,h=`[out:json][timeout:60][maxsize:536870912];
(
  way["natural"="water"]${l};
  relation["natural"="water"]${l};
  way["waterway"="riverbank"]${l};
  relation["waterway"="riverbank"]${l};
  way["waterway"~"^(river|canal|stream|ditch)$"]${l};
  way["landuse"="reservoir"]${l};
  relation["landuse"="reservoir"]${l};
  way["landuse"="basin"]${l};
  way["natural"="wood"]${l};
  relation["natural"="wood"]${l};
  way["landuse"="forest"]${l};
  relation["landuse"="forest"]${l};
  way["natural"="scrub"]${l};
  way["natural"="heath"]${l};
  way["natural"="fell"]${l};
  way["natural"="moor"]${l};
  way["natural"="grassland"]${l};
  way["landuse"~"^(meadow|grass|farmland)$"]${l};
  way["natural"="glacier"]${l};
  relation["natural"="glacier"]${l};
  way["natural"="snow"]${l};
  way["natural"="bare_rock"]${l};
  way["natural"="scree"]${l};
  way["natural"="sand"]${l};
  way["natural"="wetland"]${l};
  way["natural"="mud"]${l};
  way["building"]${l};
  relation["building"]["type"="multipolygon"]${l};
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street)$"]${l};
  node["man_made"="tower"]${l};
  way["man_made"="tower"]${l};
  relation["man_made"="tower"]${l};
);
out geom qt;`,d=new AbortController,f=setTimeout(()=>d.abort(),58e3);try{const g=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(h)}`,{signal:d.signal});if(clearTimeout(f),!g.ok)return t;const m=(await g.json()).elements??[],_=[],M=[],w=[],v=[];for(const y of m){const D=y.tags;D&&(D.highway&&y.type==="way"&&(y.geometry?.length??0)>=2?v.push({hwType:D.highway,geom:y.geometry}):D.man_made==="tower"?w.push(y):D.building?M.push(y):_.push(y))}return{zoneFeatures:_,buildings:M,towers:w,roads:v}}catch{return clearTimeout(f),t}}function Cr(s,t,e){let n=!1;const r=e.length;for(let a=0,l=r-1;a<r;l=a++){const c=e[a][0],h=e[a][1],d=e[l][0],f=e[l][1];h>t!=f>t&&s<(d-c)*(t-h)/(f-h)+c&&(n=!n)}return n}function mb(s,t,e,n,r,a,l,c,h,d){const{minLat:f,maxLat:g,minLon:m,maxLon:_}=t,M=new te(Kt[pe.buildings??7]??"#888888"),w=[new zn(new V(-1,0,0),l/2),new zn(new V(1,0,0),l/2),new zn(new V(0,0,-1),c/2),new zn(new V(0,0,1),c/2)],v=new pi({color:M,clippingPlanes:w}),y=[],D=(f+g)/2,b=Math.cos(D*Math.PI/180);for(const A of s){const k=Ao(A);if(!k.length)continue;const I=k[0];if(I.length<3||Va>0&&Bc(A,b)<Va)continue;const R=parseFloat(A.tags?.height??"0"),U=parseFloat(A.tags?.["building:levels"]??"0")||0,C=l/((_-m)*b*111320),E=R>0?Math.max(Ha,R*C*Ba):Math.max(Ha,(U>0?U:2)*qM*Ba);let B=0,X=0;for(const yt of I)B+=yt.lon,X+=yt.lat;const F=(B/I.length-m)/(_-m),W=(X/I.length-f)/(g-f),Q=F*l-l/2,Y=W*c-c/2;if(Dn){let yt=0;for(const bt of I){const Z=(bt.lon-m)/(_-m)*l-l/2,K=(.5-(bt.lat-f)/(g-f))*c;Cr(Z,K,Dn)&&yt++}if(yt/I.length<.6)continue}const ft=new tl;for(let yt=0;yt<I.length;yt++){const bt=(I[yt].lon-m)/(_-m),Z=(I[yt].lat-f)/(g-f),K=Q+(bt*l-l/2-Q)*za,ut=Y+(Z*c-c/2-Y)*za;yt===0?ft.moveTo(K,ut):ft.lineTo(K,ut)}ft.closePath();const z=fi(e,n,F,1-W),ct=h+(z-r)/a*d,G=new So(ft,{depth:E,bevelEnabled:!1});G.rotateX(-Math.PI/2);const st=new De(G,v);st.position.y=ct,y.push(st)}return y}function gb(s,t,e,n,r,a,l,c,h,d){const{minLat:f,maxLat:g,minLon:m,maxLon:_}=t,M=(f+g)/2,w=Math.cos(M*Math.PI/180),v=l/((_-m)*w*111320),y=new te(Kt[pe.buildings??7]??"#888888"),D=new pi({color:y}),b=[];for(const A of s){if(!A.tags)continue;let k,I;if(A.type==="node"&&A.lat!==void 0&&A.lon!==void 0)k=(A.lon-m)/(_-m),I=(A.lat-f)/(g-f);else{const F=Ao(A);if(!F.length)continue;const W=F[0];if(!W.length)continue;let Q=0,Y=0;for(const ft of W)Q+=ft.lon,Y+=ft.lat;k=(Q/W.length-m)/(_-m),I=(Y/W.length-f)/(g-f)}if(k<0||k>1||I<0||I>1)continue;const R=(k-.5)*l,U=(.5-I)*c;if(Dn&&!Cr(R,U,Dn))continue;const C=fi(e,n,k,1-I),E=h+(C-r)/a*d,B=(A.tags.name??A.tags["name:fr"]??"").toLowerCase();if(B.includes("eiffel")||B.includes("tour eiffel")){const F=[{r0:62.5*v,r1:30*v,h:57*v},{r0:30*v,r1:18*v,h:59*v},{r0:18*v,r1:3*v,h:160*v},{r0:3*v,r1:.3*v,h:54*v}],W=new Ni;let Q=0;for(const z of F){const ct=new ao(z.r1,z.r0,z.h,8),G=new De(ct,D);G.position.set(R,E+Q+z.h/2,U),W.add(G),Q+=z.h}const Y=[57*v,116*v],ft=[30*v,18*v];for(let z=0;z<Y.length;z++){const ct=new ao(ft[z]*1.05,ft[z]*1.05,2*v,8),G=new De(ct,D);G.position.set(R,E+Y[z],U),W.add(G)}b.push(W)}else{const F=parseFloat(A.tags.height??"30"),W=Math.max(2,F*v),Q=Math.max(.5,W*.04),Y=Q*.4,ft=new ao(Y,Q,W,6),z=new De(ft,D);z.position.set(R,E+W/2,U),b.push(z)}}return b}function op(s){return s==="motorway"||s==="motorway_link"?10:s==="trunk"||s==="trunk_link"?8:s==="primary"||s==="primary_link"?6:s==="secondary"||s==="secondary_link"?5:s==="tertiary"||s==="tertiary_link"?4:3.5}function _b(s,t,e,n,r,a,l,c,h,d,f,g){const{minLat:m,maxLat:_,minLon:M,maxLon:w}=n,v=(R,U)=>{const C=Math.max(0,Math.min(1,R/h+.5)),E=Math.max(0,Math.min(1,.5-U/d)),B=fi(r,a,C,1-E);return f+(B-l)/c*g+e},y=[];for(const R of s){const U=(R.lon-M)/(w-M),C=(R.lat-m)/(_-m);if(U<-.02||U>1.02||C<-.02||C>1.02)continue;const E=(U-.5)*h,B=(.5-C)*d;Dn&&!Cr(E,B,Dn)||y.push(new V(E,v(E,B),B))}if(y.length<2)return null;const D=1.5,b=[y[0]];for(let R=1;R<y.length;R++){const U=y[R-1],C=y[R],E=C.x-U.x,B=C.z-U.z,X=Math.sqrt(E*E+B*B),F=Math.max(1,Math.round(X/D));for(let W=1;W<=F;W++){const Q=W/F,Y=U.x+E*Q,ft=U.z+B*Q;b.push(new V(Y,v(Y,ft),ft))}}const A=[],k=[];for(let R=0;R<b.length;R++){const U=b[Math.max(0,R-1)],C=b[Math.min(b.length-1,R+1)],E=C.x-U.x,B=C.z-U.z,X=Math.sqrt(E*E+B*B);if(X<1e-9)A.push(b[R].x,b[R].y,b[R].z),A.push(b[R].x,b[R].y,b[R].z);else{const F=-B/X*t,W=E/X*t;A.push(b[R].x-F,b[R].y,b[R].z-W),A.push(b[R].x+F,b[R].y,b[R].z+W)}if(R>0){const F=(R-1)*2;k.push(F,F+2,F+1,F+1,F+2,F+3)}}if(A.length<12)return null;const I=new un;return I.setAttribute("position",new We(A,3)),I.setIndex(k),I.computeVertexNormals(),I}function Fc(){if(Pn){Le?.remove(Pn);const y=rn.indexOf(Pn);y>=0&&rn.splice(y,1),Pn=null}if(!Jt||!Le||!Rn.length)return;const{minE:s,elevRange:t,bounds:e}=Jt,n=sl??Jt.grid,r=In,a=Vn,l=Gn,c=Ss,h=ti,d=(e.minLat+e.maxLat)/2,f=(e.maxLon-e.minLon)*Math.cos(d*Math.PI/180)*111320,g=a/f,m=pe.roads??8,_=new te(Kt[m]??"#262626"),M=new pi({color:_,side:Hn,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),w=Kc==="raised"?Ga:-Ga,v=new Ni;for(const y of Rn){if(Dn){const k=e;if(!y.geom.some(R=>{const U=(R.lon-k.minLon)/(k.maxLon-k.minLon)*a-a/2,C=(.5-(R.lat-k.minLat)/(k.maxLat-k.minLat))*l;return Cr(U,C,Dn)}))continue}const D=op(y.hwType)*g*ll,b=Math.max(jc,D)/2,A=_b(y.geom,b,w,e,n,r,s,t,a,l,c,h);A&&v.add(new De(A,M))}v.children.length>0&&(v.visible=Ge.roads??!0,Le.add(v),rn.push(v),Pn=v)}function vb(s,t){yo=s,Fa=t}function yb(s,t){al[s]=t,jt&&(jt.dispose(),jt=null)}function xb(s,t){co=s,Ic=t,jt&&(jt.dispose(),jt=null)}function Yd(s,t){Yi[s]=t,jt&&(jt.dispose(),jt=null)}function ap(s){const t=s.water??"";return["ocean","sea","bay","strait"].includes(t)?"water_ocean":t==="canal"?"water_canal":t==="lake"||!t&&s.natural==="water"?"water_lake":t==="pond"?"water_pond":t==="reservoir"||s.landuse==="reservoir"?"water_reservoir":t==="wastewater"?"water_wastewater":["basin","dock","reflecting_pool","swimming_pool","moat"].includes(t)?"water_human":"water_other"}function Mb(s){const t=s.waterway??"";return t==="river"?Yi.rivers!==!1:t==="canal"?Yi.canals!==!1:t==="stream"||t==="ditch"?(s.name?Yi.streams_named:Yi.streams_unnamed)!==!1:!0}function bb(s,t,e){let n=!1;for(let r=0,a=e.length-1;r<e.length;a=r++){const l=e[r].lat,c=e[r].lon,h=e[a].lat,d=e[a].lon;l>s!=h>s&&t<(d-c)*(s-l)/(h-l)+c&&(n=!n)}return n}function Ao(s){return s.type==="way"&&s.geometry?[s.geometry]:s.type==="relation"&&s.members?s.members.filter(t=>t.role==="outer"&&t.geometry).map(t=>t.geometry):[]}function wb(s,t,e,n,r,a,l){if(!Fa&&yo===0)return s;const c=new Float32Array(s),h=e.maxLat-e.minLat,d=e.maxLon-e.minLon,f=r>0&&a>0?l/a*r:0;for(const g of n)if(!(!g.tags||!(g.tags.natural==="water"||g.tags.waterway==="riverbank"))&&al[ap(g.tags)]!==!1)for(const _ of Ao(g)){if(_.length<3)continue;let M=1/0,w=-1/0,v=1/0,y=-1/0;for(const U of _)U.lat<M&&(M=U.lat),U.lat>w&&(w=U.lat),U.lon<v&&(v=U.lon),U.lon>y&&(y=U.lon);const D=Math.max(0,Math.floor((e.maxLat-w)/h*(t-1))),b=Math.min(t-1,Math.ceil((e.maxLat-M)/h*(t-1))),A=Math.max(0,Math.floor((v-e.minLon)/d*(t-1))),k=Math.min(t-1,Math.ceil((y-e.minLon)/d*(t-1))),I=[];let R=1/0;for(let U=D;U<=b;U++){const C=e.maxLat-U/(t-1)*h;for(let E=A;E<=k;E++)if(bb(C,e.minLon+E/(t-1)*d,_)){const B=U*t+E;I.push(B),c[B]<R&&(R=c[B])}}for(const U of I)Fa&&(c[U]=R),c[U]+=yo*f}return c}function eo(s,t){return s.natural==="wood"?t.lc_forest_detailed===!0:s.landuse==="forest"?t.lc_forest===!0:s.natural==="grassland"||s.landuse==="grass"?t.lc_grass===!0:s.landuse==="meadow"?t.lc_grass_detailed===!0:s.landuse==="farmland"?t.lc_crop===!0:s.natural==="fell"||s.natural==="moor"?t.lc_moss===!0:s.natural==="heath"?t.lc_shrub===!0:s.natural==="scrub"?t.lc_scrub===!0:s.natural==="wetland"?s.wetland==="mangrove"?t.lc_mangrove===!0:t.lc_wetland===!0:s.natural==="mud"?t.lc_wetland_detailed===!0:s.natural==="glacier"?t.lc_glacier===!0:s.natural==="snow"?t.lc_snow===!0:s.natural==="bare_rock"?t.lc_rock===!0:s.natural==="scree"?t.lc_barren===!0:s.natural==="sand"?t.lc_sand===!0||t.lc_desert===!0:!1}const pr=[{id:"veg_low",match:s=>eo(s,$i.veg_low??{}),slot:3,fill:!0},{id:"veg_dense",match:s=>eo(s,$i.veg_dense??{}),slot:4,fill:!0},{id:"wetland",match:s=>eo(s,$i.wetland_lc??{}),slot:3,fill:!0},{id:"snow",match:s=>eo(s,$i.snow_lc??{}),slot:2,fill:!0},{id:"barren",match:s=>eo(s,$i.barren_lc??{}),slot:1,fill:!0},{id:"water",match:s=>s.natural==="water"&&(()=>{const t=ap(s);return t==="water_canal"?Yi.canal_polygons!==!1:al[t]!==!1})(),slot:5,fill:!0},{id:"reservoir",match:s=>s.landuse==="reservoir"||s.landuse==="basin",slot:5,fill:!0},{id:"river_polygons",match:s=>s.waterway==="riverbank"&&Yi.river_polygons!==!1,slot:5,fill:!0},{id:"waterways",match:s=>!!s.waterway&&s.waterway!=="riverbank"&&Mb(s),slot:5,fill:!1}];function Bc(s,t){const e=n=>{if(n.length<3)return 0;let r=0;for(let a=0,l=n.length-1;a<n.length;l=a++)r+=(n[l].lon+n[a].lon)*(n[l].lat-n[a].lat);return Math.abs(r)/2*(t*111320)*111320};return s.type==="way"&&s.geometry?e(s.geometry):s.type==="relation"&&s.members?s.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,r)=>n+e(r.geometry),0):0}function mr(s,t,e,n,r,a,l,c,h,d,f){const g=ib,m=document.createElement("canvas");m.width=m.height=g;const _=m.getContext("2d");_.fillStyle=Kt[pe.base??1]??"#c0af88",_.fillRect(0,0,g,g);const M=document.getElementById("cp-filter"),w=M?Number(M.value):100,v=Math.cos((s.minLat+s.maxLat)/2*Math.PI/180),y=(s.maxLon-s.minLon)*v*111320*(s.maxLat-s.minLat)*111320,D=Math.pow(1-w/100,2)*.02*y;for(const A of pr){if(!Ge[A.id])continue;const k=a.filter(U=>!U.tags||!A.match(U.tags)?!1:A.fill&&D>0?Bc(U,v)>=D:!0);if(!k.length)continue;const I=pe[A.id]??A.slot,R=Kt[I]??"#888";if(A.fill){_.beginPath();for(const U of k)uo(_,U,s,g);_.fillStyle=R,_.fill("evenodd")}}for(const A of pr){if(!A.fill||!Ge[A.id])continue;const k=a.filter(F=>!F.tags||!A.match(F.tags)?!1:D>0?Bc(F,v)>=D:!0);if(!k.length)continue;const I=pe[A.id]??A.slot,R=Kt[I]??"#888",U=parseInt(R.replace("#",""),16),C=Math.round((U>>16&255)*.65),E=Math.round((U>>8&255)*.65),B=Math.round((U&255)*.65),X=`rgb(${C},${E},${B})`;_.beginPath();for(const F of k)uo(_,F,s,g);_.strokeStyle=X,_.lineWidth=2.5,_.lineJoin="round",_.stroke()}if((Ge.roads??!0)&&d.length>0){const A=pe.roads??8,k=Kt[A]??"#262626",I=(s.minLat+s.maxLat)/2,R=Math.cos(I*Math.PI/180),U=(s.maxLon-s.minLon)*R*111320,C=g/U;_.lineCap="round",_.lineJoin="round";for(const E of d){const B=op(E.hwType)*C*ll,X=Math.max(4,B);_.beginPath();let F=!0;for(const W of E.geom){const Q=(W.lon-s.minLon)/(s.maxLon-s.minLon)*g,Y=(1-(W.lat-s.minLat)/(s.maxLat-s.minLat))*g;F?(_.moveTo(Q,Y),F=!1):_.lineTo(Q,Y)}_.strokeStyle=k,_.lineWidth=X,_.stroke()}}if((Ge.buildings??!0)&&f.length>0){const A=pe.buildings??7,k=Kt[A]??"#b8b8b8";_.fillStyle=k,_.beginPath();for(const I of f){const R=Ao(I);if(!R.length)continue;const U=R[0];if(!(U.length<3)){for(let C=0;C<U.length;C++){const E=(U[C].lon-s.minLon)/(s.maxLon-s.minLon)*g,B=(1-(U[C].lat-s.minLat)/(s.maxLat-s.minLat))*g;C===0?_.moveTo(E,B):_.lineTo(E,B)}_.closePath()}}_.fill("nonzero")}for(const A of pr){if(A.fill||!Ge[A.id])continue;const k=a.filter(U=>U.tags&&A.match(U.tags));if(!k.length)continue;const I=pe[A.id]??A.slot,R=Kt[I]??"#888";for(const U of k){if(!U.tags)continue;const C=U.tags.waterway??"",E=(C==="river"?7:C==="canal"?6:C==="stream"?5:4)*co;_.beginPath(),uo(_,U,s,g),_.strokeStyle=R,_.lineWidth=E,_.lineCap="round",_.lineJoin="round",_.stroke()}}const b=new Ff(m);return Sn&&(b.anisotropy=Sn.capabilities.getMaxAnisotropy()),b}function uo(s,t,e,n){const r=a=>{if(!(!a||a.length<2))for(let l=0;l<a.length;l++){const c=(a[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,h=(1-(a[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?s.moveTo(c,h):s.lineTo(c,h)}};if(t.type==="way"&&t.geometry)r(t.geometry);else if(t.type==="relation"&&t.members)for(const a of t.members)(a.role==="outer"||a.role==="inner")&&a.geometry&&r(a.geometry)}function Sb(s,t,e,n,r){if(!s||s.length<3||t==="rect"||t==="sq")return null;const a=512,l=document.createElement("canvas");l.width=l.height=a;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,a,a),c.fillStyle="white",c.beginPath();for(let h=0;h<s.length;h++){const[d,f]=s[h],g=(f-e.minLon)/(e.maxLon-e.minLon)*a,m=(1-(d-e.minLat)/(e.maxLat-e.minLat))*a;h===0?c.moveTo(g,m):c.lineTo(g,m)}return c.closePath(),c.fill(),new Ff(l)}function Eb(s,t,e,n,r){return!s||s.length<3||t==="rect"||t==="sq"?[[-n/2,-r/2],[n/2,-r/2],[n/2,r/2],[-n/2,r/2]]:s.map(([a,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(a-e.minLat)/(e.maxLat-e.minLat))*r-r/2])}function Tb(s,t,e,n,r,a){if(t==="rect"||t==="sq"){const h=new Oi(e+a*2,r,n+a*2);return h.translate(0,r/2,0),h}const l=new tl;if(t==="circ"){const h=e/2+a,d=n/2+a;for(let f=0;f<=64;f++){const g=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(g)*h,Math.sin(g)*d):l.lineTo(Math.cos(g)*h,Math.sin(g)*d)}}else{l.moveTo(s[0][0],s[0][1]);for(let h=1;h<s.length;h++)l.lineTo(s[h][0],s[h][1]);l.closePath()}const c=new So(l,{depth:r,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function Ab(s,t,e,n,r,a,l,c,h,d,f,g,m){const _=(w,v)=>{const y=Math.max(0,Math.min(1,(w+e/2)/e)),D=Math.max(0,Math.min(1,(v+n/2)/n)),b=y*(h-1),A=D*(h-1),k=Math.min(h-2,Math.floor(b)),I=Math.min(h-2,Math.floor(A)),R=b-k,U=A-I,C=c[I*h+k]*(1-R)*(1-U)+c[I*h+k+1]*R*(1-U)+c[(I+1)*h+k]*(1-R)*U+c[(I+1)*h+k+1]*R*U;return g+(C-d)/f*m};return t==="rect"||t==="sq"?a?Lb(e,n,r,l):Pb(e,n,r,h,c,d,f,g,m):Cb(s,r,a?()=>l:_)}function Lb(s,t,e,n){const r=(a,l,c,h,d)=>{const f=new De(new Oi(a,l,c));return f.position.set(h,l/2,d),f};return[r(s+e*2,n,e,0,t/2+e/2),r(s+e*2,n,e,0,-t/2-e/2),r(e,n,t,s/2+e/2,0),r(e,n,t,-s/2-e/2,0)]}function Pb(s,t,e,n,r,a,l,c,h){const d=(D,b)=>c+(r[b*n+D]-a)/l*h,f=Math.min(n-1,64),g=D=>Math.round(D/f*(n-1)),m=d(0,n-1),_=d(n-1,n-1),M=d(0,0),w=d(n-1,0),v=[[-s/2-e,t/2,m],...Array.from({length:f+1},(D,b)=>{const A=g(b);return[-s/2+A/(n-1)*s,t/2,d(A,n-1)]}),[s/2+e,t/2,_]],y=[[s/2+e,-t/2,w],...Array.from({length:f+1},(D,b)=>{const A=g(b);return[s/2-A/(n-1)*s,-t/2,d(n-1-A,0)]}),[-s/2-e,-t/2,M]];return[io(v,[0,0,1],e),io(y,[0,0,-1],e),io(Array.from({length:f+1},(D,b)=>{const A=g(b);return[s/2,t/2-A/(n-1)*t,d(n-1,n-1-A)]}),[1,0,0],e),io(Array.from({length:f+1},(D,b)=>{const A=g(b);return[-s/2,-t/2+A/(n-1)*t,d(0,A)]}),[-1,0,0],e)]}function Cb(s,t,e){const n=[],r=s.length;for(let a=0;a<r;a++){const[l,c]=s[a],[h,d]=s[(a+1)%r],f=h-l,g=d-c,m=Math.sqrt(f*f+g*g);if(m<.5)continue;const _=g/m,M=-f/m,w=Math.max(2,Math.round(m/3)),v=[];for(let y=0;y<=w;y++){const D=y/w,b=l+f*D,A=c+g*D;v.push([b,A,e(b,A)])}n.push(io(v,[_,0,M],t))}return n}function io(s,t,e){const n=s.length,[r,,a]=t,l=[],c=[];for(const[_,M,w]of s)l.push(_+r*e,0,M+a*e),l.push(_+r*e,w,M+a*e);for(const[_,M,w]of s)l.push(_,0,M),l.push(_,w,M);for(const[_,M,w]of s)l.push(_+r*e,w,M+a*e),l.push(_,w,M);for(const[_,M]of s)l.push(_+r*e,0,M+a*e),l.push(_,0,M);const h=0,d=n*2,f=n*4,g=n*6;for(let _=0;_<n-1;_++){const M=_*2;c.push(h+M,h+M+2,h+M+1,h+M+1,h+M+2,h+M+3),c.push(d+M,d+M+1,d+M+2,d+M+1,d+M+3,d+M+2),c.push(f+M,f+M+1,f+M+2,f+M+1,f+M+3,f+M+2),c.push(g+M,g+M+2,g+M+1,g+M+1,g+M+2,g+M+3)}const m=new un;return m.setAttribute("position",new We(l,3)),m.setIndex(c),m.computeVertexNormals(),new De(m)}async function Rb(s){const t=`${s.minLat}|${s.maxLat}|${s.minLon}|${s.maxLon}`;if(t===qd)return;const e=`(${s.minLat},${s.minLon},${s.maxLat},${s.maxLon})`,n=`[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${e};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${e};
  way["piste:type"]${e};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${e};
);
out geom;`,r=new AbortController,a=setTimeout(()=>r.abort(),45e3);let l;try{const h=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(n)}`,{signal:r.signal});clearTimeout(a),l=await h.json()}catch(h){throw clearTimeout(a),h}for(const h of Object.keys(rr))delete rr[h];const c=(h,d)=>{rr[h]||(rr[h]=[]),rr[h].push(d)};for(const h of l.elements)if(h.type==="way"){const d=h.tags??{},f=h.geometry??[];if(f.length<2)continue;if(d.highway){const m={motorway:"road_motorway",motorway_link:"road_motorway",trunk:"road_trunk",trunk_link:"road_trunk",primary:"road_primary",primary_link:"road_primary",secondary:"road_secondary",secondary_link:"road_secondary",tertiary:"road_tertiary",tertiary_link:"road_tertiary",unclassified:"road_unclassified",living_street:"street_living",residential:"street_residential"}[d.highway];m&&c(m,f)}d.railway&&c({narrow_gauge:"rail_narrow",rail:"rail_standard",light_rail:"rail_light",funicular:"rail_funicular",monorail:"rail_monorail",tram:"rail_tram",subway:"rail_subway"}[d.railway]??"rail_unknown",f),d["piste:type"]&&c({easy:"piste_easy",novice:"piste_novice",intermediate:"piste_intermediate",advanced:"piste_advanced",expert:"piste_expert",freeride:"piste_freeride"}[d["piste:difficulty"]??""]??"piste_other",f)}else if(h.type==="relation"){const d=h.tags??{},f=d.route??"",g=d.network??"",m=(h.members??[]).filter(v=>v.type==="way"&&(v.geometry?.length??0)>=2).map(v=>v.geometry);if(!m.length)continue;const M={hiking:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},foot:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},bicycle:{icn:"cycling_icn",ncn:"cycling_ncn",rcn:"cycling_rcn",lcn:"cycling_lcn"},mtb:{"":"mtb_local"},horse:{ihwn:"equestrian_iwn",nhwn:"equestrian_nwn",rhwn:"equestrian_rwn",lhwn:"equestrian_lwn"}}[f];if(!M)continue;let w;if(f==="mtb"){const v=d["mtb:scale"]??"";w=v?`mtb_${v}`:"mtb_local"}else w=M[g]??Object.values(M).at(-1);for(const v of m)c(w,v)}qd=t,Qc()}function jd(s,t){Wa[s]=t,Qc()}function Qc(){if(ui){Le?.remove(ui);const f=rn.indexOf(ui);f>=0&&rn.splice(f,1),ui=null}if(!Jt||!Le)return;const{grid:s,minE:t,elevRange:e,bounds:n}=Jt,r=In,a=Vn,l=Gn,c=Ss,h=ti,d=new Ni;for(const[f,g]of Object.entries(rr)){if(Wa[f]===!1)continue;const m=Ib(f),_=new Qa({color:m});for(const M of g){const w=[];for(const v of M){const y=(v.lon-n.minLon)/(n.maxLon-n.minLon),D=(v.lat-n.minLat)/(n.maxLat-n.minLat);if(y<0||y>1||D<0||D>1)continue;const b=(y-.5)*a,A=(.5-D)*l,k=y*(r-1),I=(1-D)*(r-1),R=Math.min(r-2,Math.floor(k)),U=Math.min(r-2,Math.floor(I)),C=k-R,E=I-U,B=s[U*r+R]*(1-C)*(1-E)+s[U*r+R+1]*C*(1-E)+s[(U+1)*r+R]*(1-C)*E+s[(U+1)*r+R+1]*C*E;w.push(new V(b,c+(B-t)/e*h+.6,A))}w.length>=2&&d.add(new Xc(new un().setFromPoints(w),_))}}d.children.length>0&&(Le.add(d),rn.push(d),ui=d)}function Ib(s){return s.startsWith("road_motorway")?14820122:s.startsWith("road_trunk")?15041054:s.startsWith("road_primary")?16110375:s.startsWith("road_secondary")?13951528:s.startsWith("road_tertiary")?11184810:s.startsWith("road_")?13421772:s.startsWith("street_")?14540253:s.startsWith("rail_")?5592439:s.startsWith("hiking_")?16737792:s.startsWith("cycling_")?26316:s.startsWith("mtb_")?8930304:s.startsWith("equestrian_")?10053171:s.startsWith("piste_easy")?43775:s.startsWith("piste_novice")?52292:s.startsWith("piste_intermediate")?13378082:s.startsWith("piste_")?2236962:8947848}function Db(s,t){const e=new tl;switch(s){case"square":e.moveTo(-t,-t),e.lineTo(t,-t),e.lineTo(t,t),e.lineTo(-t,t),e.closePath();break;case"diamond":e.moveTo(0,-t),e.lineTo(t*.72,0),e.lineTo(0,t),e.lineTo(-t*.72,0),e.closePath();break;case"triangle":e.moveTo(0,t),e.lineTo(t*.866,-t*.5),e.lineTo(-t*.866,-t*.5),e.closePath();break;case"cross":{const n=t*.32;e.moveTo(-n,-t),e.lineTo(n,-t),e.lineTo(n,-n),e.lineTo(t,-n),e.lineTo(t,n),e.lineTo(n,n),e.lineTo(n,t),e.lineTo(-n,t),e.lineTo(-n,n),e.lineTo(-t,n),e.lineTo(-t,-n),e.lineTo(-n,-n),e.closePath();break}case"heart":{e.moveTo(0,-t*.25),e.bezierCurveTo(-t*.05,-t*.55,-t,-t*.55,-t,t*.1),e.bezierCurveTo(-t,t*.65,-t*.45,t*.88,0,t),e.bezierCurveTo(t*.45,t*.88,t,t*.65,t,t*.1),e.bezierCurveTo(t,-t*.55,t*.05,-t*.55,0,-t*.25),e.closePath();break}case"star":{const n=t,r=t*.42;for(let a=0;a<10;a++){const l=a*Math.PI/5-Math.PI/2,c=a%2===0?n:r,h=Math.cos(l)*c,d=Math.sin(l)*c;a===0?e.moveTo(h,d):e.lineTo(h,d)}e.closePath();break}default:e.absarc(0,0,t,0,Math.PI*2,!1);break}return e}function fi(s,t,e,n){const r=Math.max(0,Math.min(t-2,e*(t-1))),a=Math.max(0,Math.min(t-2,n*(t-1))),l=Math.floor(r),c=Math.floor(a),h=r-l,d=a-c;return s[c*t+l]*(1-h)*(1-d)+s[c*t+l+1]*h*(1-d)+s[(c+1)*t+l]*(1-h)*d+s[(c+1)*t+l+1]*h*d}function tu(s,t){if(!Jt||!Le)return;const{grid:e,minE:n,elevRange:r}=Jt,a=In,l=Vn,c=Gn,h=Ss,d=ti,f=.42,g=.2,m=s.diameterMult*f/2,_=.5,M=s.heightOffMult*g,w=s.lonFrac,v=1-s.latFrac,y=(w-.5)*l,D=(.5-(1-v))*c;let b;if(s.flatTop){let E=-1/0;const B=8;for(let X=0;X<=B;X++)for(let F=0;F<=B;F++){const W=X/B,Q=F/B,Y=w+(W-.5)*(m*2)/l,ft=v+(Q-.5)*(m*2)/c,z=Math.max(0,Math.min(1,Y)),ct=Math.max(0,Math.min(1,ft)),G=fi(e,a,z,ct);G>E&&(E=G)}b=h+(E-n)/r*d}else{const E=fi(e,a,w,v);b=h+(E-n)/r*d}const A=pe.gpx??6,k=Kt[A]??"#ff4500",I=new pi({color:k,side:Hn}),R=Db(s.shape,m),U=new So(R,{depth:_,bevelEnabled:!1});U.rotateX(-Math.PI/2),s.rotDeg!==0&&U.rotateY(s.rotDeg*Math.PI/180);const C=new De(U,I);C.position.set(y,b+M,D),C.visible=s.visible&&(Ge.gpx??!0),To.set(C,s.id),t>=Qn.length?(Xi(C),Qn.push(C)):(Le.add(C),rn.push(C),Qn.splice(t,0,C))}function ho(s,t,e,n,r,a,l,c,h,d,f){const g=Math.max(0,Math.min(1,s/e+.5)),m=Math.max(0,Math.min(1,.5-t/n)),_=g*(a-1),M=(1-m)*(a-1),w=Math.min(a-2,Math.floor(_)),v=Math.min(a-2,Math.floor(M)),y=_-w,D=M-v,b=r[v*a+w]*(1-y)*(1-D)+r[v*a+w+1]*y*(1-D)+r[(v+1)*a+w]*(1-y)*D+r[(v+1)*a+w+1]*y*D;return h+(b-l)/c*d+f}function Nb(s,t,e,n,r,a,l,c,h,d){const g=Rc*.21+.05+Jf*.2,m=[];for(const D of s){const b=Math.max(5e-4,Math.min(.9995,(D.lon-t.minLon)/(t.maxLon-t.minLon))),A=Math.max(5e-4,Math.min(.9995,(D.lat-t.minLat)/(t.maxLat-t.minLat))),k=(b-.5)*e,I=(.5-A)*n;m.push(new V(k,ho(k,I,e,n,r,a,l,c,h,d,g),I))}if(m.length<2)return null;const _=1,M=[m[0]];for(let D=0;D<m.length-1;D++){const b=m[D],A=m[D+1],k=A.x-b.x,I=A.z-b.z,R=Math.sqrt(k*k+I*I),U=Math.max(1,Math.floor(R/_));for(let C=1;C<=U;C++){const E=C/U,B=b.x+k*E,X=b.z+I*E,F=ho(B,X,e,n,r,a,l,c,h,d,g),W=new V(B,F,X);W.distanceTo(M[M.length-1])>=.08&&M.push(W)}}if(M.length<2)return null;const w=pe.gpx_line??6,v=Kt[w]??"#ff4500",y=Rc*.21;if(y>=.1){const D=new Oa(M,!1,"centripetal"),b=Math.min(2e3,Math.max(80,M.length*5)),A=D.getSpacedPoints(b);for(const I of A){const R=ho(I.x,I.z,e,n,r,a,l,c,h,d,g-y);I.y<R&&(I.y=R)}const k=new nl(new Oa(A,!1,"centripetal"),b,y,8,!1);return new De(k,new pi({color:v}))}return new Xc(new un().setFromPoints(M),new Qa({color:v}))}async function Ob(s){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=r=>{r.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:r.data.elevGrid,minE:r.data.minE,elevRange:r.data.elevRange,bounds:s})):r.data.type==="ERROR"&&(n.terminate(),e(new Error(r.data.message)))},n.onerror=r=>{n.terminate(),e(r)},n.postMessage({type:"BUILD_TERRAIN",bounds:s,GRID:In,elevZoom:12})})}function Xi(s){Le.add(s),rn.push(s)}function nr(s,t){const e=document.getElementById(s);e&&(e.textContent=t)}function Ub(){rn.forEach(s=>{Le.remove(s),s.geometry?.dispose()}),rn=[],ur.length=0}function kb(){if(!_n||!Sn)return;const s=Sn.domElement.clientWidth,t=Sn.domElement.clientHeight;if(!(!s||!t))for(const{id:e,v:n}of ur){const r=document.getElementById(e);if(!r)continue;const a=n.clone().project(_n);if(a.z>1){r.style.opacity="0";continue}r.style.opacity="1",r.style.left=`${(a.x+1)/2*s}px`,r.style.top=`${-(a.y-1)/2*t}px`}}let hi=null,fo=!1;function Fb(s){if(!jt)return null;try{const e=Math.min(s*4,2048),n=e/s,r=document.createElement("canvas");r.width=r.height=e;const a=r.getContext("2d");a.drawImage(jt.image,0,0,e,e);const l=a.getImageData(0,0,e,e).data,c=Kt[pe.base??1]??"#c0af88",h=parseInt(c.replace("#",""),16),d=h>>16&255,f=h>>8&255,g=h&255,m=Kt[pe.roads??8]??"#262626",_=parseInt(m.replace("#",""),16),M=_>>16&255,w=_>>8&255,v=_&255,y=new Uint8ClampedArray(s*s*4);for(let A=0;A<s;A++){const k=Math.floor(A*n),I=Math.min(Math.ceil((A+1)*n),e);for(let R=0;R<s;R++){const U=Math.floor(R*n),C=Math.min(Math.ceil((R+1)*n),e);let E=0,B=0,X=0,F=0,W=0,Q=0,Y=0,ft=!1,z=0,ct=0,G=0,st=0;for(let ut=k;ut<I;ut++)for(let _t=U;_t<C;_t++){const St=(ut*e+_t)*4,At=l[St],It=l[St+1],q=l[St+2];if(!((At-M)**2+(It-w)**2+(q-v)**2<1500)&&(E+=At,B+=It,X+=q,F++,!ft&&q>At+25&&q>It+25&&q>70&&(W=At,Q=It,Y=q,ft=!0),!ft)){const at=(At-d)**2+(It-f)**2+(q-g)**2;at>600&&at>st&&(st=at,z=At,ct=It,G=q)}}F===0&&(E=d,B=f,X=g,F=1);const yt=(A*s+R)*4,bt=ft?W:st>0?z:E/F,Z=ft?Q:st>0?ct:B/F,K=ft?Y:st>0?G:X/F;y[yt]=bt,y[yt+1]=Z,y[yt+2]=K,y[yt+3]=255}}const D=new Uint8Array(s*s);for(let A=0;A<s*s;A++){const k=y[A*4+2],I=y[A*4],R=y[A*4+1];k>I+25&&k>R+25&&k>70&&(D[A]=1)}const b=[[-1,0],[1,0],[0,-1],[0,1]];for(let A=0;A<1;A++){const k=new Uint8Array(s*s);for(let I=0;I<s;I++)for(let R=0;R<s;R++){if(!D[I*s+R])continue;const U=(I*s+R)*4;for(const[C,E]of b){const B=I+C,X=R+E;if(B<0||B>=s||X<0||X>=s||D[B*s+X])continue;const F=(B*s+X)*4,W=y[F],Q=y[F+1],Y=y[F+2];(W-M)**2+(Q-w)**2+(Y-v)**2<1500||(y[F]=y[U],y[F+1]=y[U+1],y[F+2]=y[U+2],k[B*s+X]=1)}}for(let I=0;I<s*s;I++)k[I]&&(D[I]=1)}return y}catch{return null}}function Bb(s,t,e,n,r,a,l,c,h,d){const f=new Ni,g=pe.roads??8,m=Kt[g]??"#262626",_=.21,M=_+.05,w=new pi({color:m});for(const v of s){if(!v.geom||v.geom.length<2)continue;const y=v.geom.map(A=>{const k=Math.max(5e-4,Math.min(.9995,(A.lon-t.minLon)/(t.maxLon-t.minLon))),I=Math.max(5e-4,Math.min(.9995,(A.lat-t.minLat)/(t.maxLat-t.minLat))),R=(k-.5)*e,U=(.5-I)*n;return new V(R,ho(R,U,e,n,r,a,l,c,h,d,M),U)}),D=2,b=[y[0]];for(let A=0;A<y.length-1;A++){const k=y[A],I=y[A+1],R=I.x-k.x,U=I.z-k.z,C=Math.sqrt(R*R+U*U),E=Math.max(1,Math.floor(C/D));for(let B=1;B<=E;B++){const X=B/E,F=k.x+R*X,W=k.z+U*X,Q=ho(F,W,e,n,r,a,l,c,h,d,M),Y=new V(F,Q,W);Y.distanceTo(b[b.length-1])>=.1&&b.push(Y)}}if(!(b.length<2))try{const A=new Oa(b,!1,"centripetal"),k=Math.min(200,b.length*3),I=new nl(A,k,_,5,!1);f.add(new De(I,w))}catch{}}return f}function Ea(s=.2){if(!Le||!Ke||!Jt)return;const t=Math.max(.01,s),e=Vn,n=Gn,r=Ss,a=ti,{minE:l,elevRange:c}=Jt,h=In,d=sl??Jt.grid,f=Math.min(700,Math.max(150,Math.round(Math.max(e,n)/.33))),g=e/f,m=n/f,_=Fb(f),M=new te(Kt[pe.veg_low??3]??"#8ab858");xo(),fo=!0;const w=f*f,v=new Oi(g,1,m),y=new pi({color:16777215}),D=new $x(v,y,w),b=new tn,A=new te;for(let k=0,I=0;k<f;k++)for(let R=0;R<f;R++,I++){const U=(R+.5)/f,C=(k+.5)/f,E=(U-.5)*e,B=(.5-C)*n;if(Dn&&!Cr(E,B,Dn)){b.scale.setScalar(0),b.position.set(E,r,B),b.updateMatrix(),D.setMatrixAt(I,b.matrix),b.scale.setScalar(1);continue}const X=fi(d,h,U,1-C);let F=(X-l)/c*a,W=0,Q=0,Y=0,ft=!1;if(_){const ct=((f-1-k)*f+R)*4;if(W=_[ct],Q=_[ct+1],Y=_[ct+2],ft=Y>W+25&&Y>Q+25&&Y>70,ft)for(const[G,st]of[[-1,0],[1,0],[0,-1],[0,1]]){const yt=k+G,bt=R+st;if(yt<0||yt>=f||bt<0||bt>=f)continue;const Z=((f-1-yt)*f+bt)*4,K=_[Z+2],ut=_[Z],_t=_[Z+1];if(K>ut+25&&K>_t+25&&K>70){const St=(bt+.5)/f,At=(yt+.5)/f;F=Math.min(F,(fi(d,h,St,1-At)-l)/c*a)}}}const z=Math.max(t,Math.ceil(F/t)*t-(ft?2*t:0));if(b.position.set(E,r+z/2,B),b.scale.set(1,z,1),b.updateMatrix(),D.setMatrixAt(I,b.matrix),_&&!ft){const ct=1/f,G=fi(d,h,Math.min(.9999,U+ct),1-C),st=fi(d,h,U,1-Math.min(.9999,C+ct)),yt=(G-X)*a/c/(e/f),bt=(st-X)*a/c/(n/f),Z=Math.max(.7,Math.min(1.3,1+yt*.5-bt*.35));A.setRGB(Math.min(1,W/255*Z),Math.min(1,Q/255*Z),Math.min(1,Y/255*Z))}else _?A.setRGB(W/255,Q/255,Y/255):A.copy(M);D.setColorAt(I,A)}if(D.instanceMatrix.needsUpdate=!0,D.instanceColor&&(D.instanceColor.needsUpdate=!0),hi=new Ni,hi.add(D),(Ge.roads??!0)&&Rn.length>0&&Jt){const k=Jt.bounds,I=Bb(Rn,k,e,n,d,h,l,c,r,a);hi.add(I)}Le.add(hi),rn.push(hi),Ke.visible=!1;for(const k of rl)k.visible=!1;Pn&&(Pn.visible=!1),ui&&(ui.visible=!1)}function zb(s){if(!Jt)return null;const{bounds:t}=Jt,e=s,n=document.createElement("canvas");n.width=n.height=e;const r=n.getContext("2d",{willReadFrequently:!0});r.fillStyle=Kt[pe.base??1]??"#c0af88",r.fillRect(0,0,e,e);for(const m of pr){if(!m.fill||!Ge[m.id])continue;const _=(mi??[]).filter(w=>w.tags&&m.match(w.tags));if(!_.length)continue;const M=Kt[pe[m.id]??m.slot]??"#888";r.fillStyle=M,r.beginPath();for(const w of _)uo(r,w,t,e);r.fill("evenodd")}if((Ge.buildings??!0)&&ei.length>0){r.fillStyle=Kt[pe.buildings??7]??"#b8b8b8",r.beginPath();for(const m of ei){const _=Ao(m);if(!_.length)continue;const M=_[0];if(!(M.length<3)){for(let w=0;w<M.length;w++){const v=(M[w].lon-t.minLon)/(t.maxLon-t.minLon)*e,y=(1-(M[w].lat-t.minLat)/(t.maxLat-t.minLat))*e;w===0?r.moveTo(v,y):r.lineTo(v,y)}r.closePath()}}r.fill("nonzero")}for(const m of pr){if(m.fill||!(Ge[m.id]??!0))continue;const _=(mi??[]).filter(w=>w.tags&&m.match(w.tags));if(!_.length)continue;const M=Kt[pe[m.id]??m.slot]??"#888";for(const w of _){if(!w.tags)continue;const y=(w.tags.waterway??"")==="river"?2:1;r.beginPath(),uo(r,w,t,e),r.strokeStyle=M,r.lineWidth=y,r.lineCap="round",r.lineJoin="round",r.stroke()}}if((Ge.roads??!0)&&Rn.length>0){r.strokeStyle=Kt[pe.roads??8]??"#262626",r.lineWidth=3,r.lineCap="round",r.lineJoin="round";for(const m of Rn){r.beginPath();let _=!0;for(const M of m.geom){const w=(M.lon-t.minLon)/(t.maxLon-t.minLon)*e,v=(1-(M.lat-t.minLat)/(t.maxLat-t.minLat))*e;_?(r.moveTo(w,v),_=!1):r.lineTo(w,v)}r.stroke()}}if((Ge.gpx??!0)&&Sa.length>=2){r.strokeStyle=Kt[pe.gpx??6]??"#ff4500",r.lineWidth=4,r.lineCap="round",r.lineJoin="round",r.beginPath();for(let m=0;m<Sa.length;m++){const _=Sa[m],M=(_.lon-t.minLon)/(t.maxLon-t.minLon)*e,w=(1-(_.lat-t.minLat)/(t.maxLat-t.minLat))*e;m===0?r.moveTo(M,w):r.lineTo(M,w)}r.stroke()}const a=r.getImageData(0,0,e,e).data,l=parseInt((Kt[pe.base??1]??"#c0af88").replace("#",""),16),c=l>>16&255,h=l>>8&255,d=l&255,f=new Uint8ClampedArray(a),g=new Uint8Array(e*e);for(let m=0;m<e*e;m++)(a[m*4]-c)**2+(a[m*4+1]-h)**2+(a[m*4+2]-d)**2>400&&(g[m]=1);for(let m=0;m<e;m++)for(let _=0;_<e;_++){if(!g[m*e+_])continue;const M=(m*e+_)*4;for(const[w,v]of[[-1,0],[1,0],[0,-1],[0,1]]){const y=m+w,D=_+v;if(y<0||y>=e||D<0||D>=e||g[y*e+D])continue;const b=(y*e+D)*4;f[b]=a[M],f[b+1]=a[M+1],f[b+2]=a[M+2]}}return f}async function Hb(s){if(!Jt||!jt){alert(`Ouvrez d'abord l'onglet "Aperçu" pour générer la prévisualisation.`);return}const t=.2,e=Vn,n=Gn,r=Ss,a=ti,{minE:l,elevRange:c}=Jt,h=In,d=sl??Jt.grid,f=Math.min(300,Math.max(80,Math.round(Math.max(e,n)/.67))),g=e/f,m=n/f,_=zb(f);function M(G,st,yt){let bt=1,Z=1/0;for(const[K,ut]of Object.entries(Kt)){const _t=new te(ut),St=(_t.r-G/255)**2+(_t.g-st/255)**2+(_t.b-yt/255)**2;St<Z&&(Z=St,bt=Number(K))}return bt}const w=new Map,v=new Map;for(let G=0;G<f;G++)for(let st=0;st<f;st++){const yt=(st+.5)/f,bt=(G+.5)/f,Z=(yt-.5)*e,K=(.5-bt)*n;if(Dn&&!Cr(Z,K,Dn))continue;const _t=(fi(d,h,yt,1-bt)-l)/c*a,St=((f-1-G)*f+st)*4;let At=1;if(_){const at=_[St],ht=_[St+1],gt=_[St+2];At=M(at,ht,gt)}const It=Math.max(t,Math.ceil(_t/t)*t),q=`${st},${G}`;w.set(q,{slot:At,h:It}),v.has(At)||v.set(At,new Map),v.get(At).set(q,It)}function y(G,st){let yt="",bt="",Z=0;function K(ut,_t,St,At,It,q,at,ht,gt,dt,pt,N){yt+=`<vertex x="${ut.toFixed(3)}" y="${_t.toFixed(3)}" z="${St.toFixed(3)}"/><vertex x="${At.toFixed(3)}" y="${It.toFixed(3)}" z="${q.toFixed(3)}"/><vertex x="${at.toFixed(3)}" y="${ht.toFixed(3)}" z="${gt.toFixed(3)}"/><vertex x="${dt.toFixed(3)}" y="${pt.toFixed(3)}" z="${N.toFixed(3)}"/>`,bt+=`<triangle v1="${Z}" v2="${Z+1}" v3="${Z+2}"/><triangle v1="${Z}" v2="${Z+2}" v3="${Z+3}"/>`,Z+=4}for(const[ut,_t]of st){const[St,At]=ut.split(",").map(Number),It=(St+.5)/f,q=(At+.5)/f,at=(It-.5)*e,ht=(.5-q)*n,gt=at-g/2,dt=at+g/2,pt=ht-m/2,N=ht+m/2,T=r,$=r+_t;K(gt,pt,$,dt,pt,$,dt,N,$,gt,N,$),K(gt,N,T,dt,N,T,dt,pt,T,gt,pt,T);const rt=w.get(`${St+1},${At}`);if(!rt||rt.slot!==G)K(dt,pt,T,dt,N,T,dt,N,$,dt,pt,$);else if(rt.h<_t){const xt=r+rt.h;K(dt,pt,xt,dt,N,xt,dt,N,$,dt,pt,$)}const lt=w.get(`${St-1},${At}`);if(!lt||lt.slot!==G)K(gt,N,T,gt,pt,T,gt,pt,$,gt,N,$);else if(lt.h<_t){const xt=r+lt.h;K(gt,N,xt,gt,pt,xt,gt,pt,$,gt,N,$)}const vt=w.get(`${St},${At-1}`);if(!vt||vt.slot!==G)K(dt,N,T,gt,N,T,gt,N,$,dt,N,$);else if(vt.h<_t){const xt=r+vt.h;K(dt,N,xt,gt,N,xt,gt,N,$,dt,N,$)}const kt=w.get(`${St},${At+1}`);if(!kt||kt.slot!==G)K(gt,pt,T,dt,pt,T,dt,pt,$,gt,pt,$);else if(kt.h<_t){const xt=r+kt.h;K(gt,pt,xt,dt,pt,xt,dt,pt,$,gt,pt,$)}}return{vx:yt,tr:bt}}if(!v.size){alert("Aucune donnée à exporter.");return}const D=[];let b=1;{let G=function(q,at,ht,gt,dt,pt,N,T,$,rt,lt,vt){ut+=`<vertex x="${q.toFixed(3)}" y="${at.toFixed(3)}" z="${ht.toFixed(3)}"/><vertex x="${gt.toFixed(3)}" y="${dt.toFixed(3)}" z="${pt.toFixed(3)}"/><vertex x="${N.toFixed(3)}" y="${T.toFixed(3)}" z="${$.toFixed(3)}"/><vertex x="${rt.toFixed(3)}" y="${lt.toFixed(3)}" z="${vt.toFixed(3)}"/>`,_t+=`<triangle v1="${St}" v2="${St+1}" v3="${St+2}"/><triangle v1="${St}" v2="${St+2}" v3="${St+3}"/>`,St+=4};const st=-e/2,yt=e/2,bt=-n/2,Z=n/2,K=r;let ut="",_t="",St=0;G(st,bt,K,yt,bt,K,yt,Z,K,st,Z,K),G(st,Z,0,yt,Z,0,yt,bt,0,st,bt,0),G(yt,bt,0,yt,Z,0,yt,Z,K,yt,bt,K),G(st,Z,0,st,bt,0,st,bt,K,st,Z,K),G(yt,Z,0,st,Z,0,st,Z,K,yt,Z,K),G(st,bt,0,yt,bt,0,yt,bt,K,st,bt,K);const At=pe.base??1,It=(Kt[At]??"#c0af88").replace("#","");D.push({id:b++,slot:At,name:"base_plate",col:It,vx:ut,tr:_t})}const A={1:"terrain_nu",2:"neige",3:"vegetation_basse",4:"vegetation_dense",5:"eau",6:"gpx",7:"batiments",8:"routes"};for(const[G,st]of v){if(st.size<5)continue;const{vx:yt,tr:bt}=y(G,st),Z=A[G]??`couche_${G}`;bt&&D.push({id:b++,slot:G,name:Z,col:(Kt[G]??"#888888").replace("#",""),vx:yt,tr:bt})}{let G=function(at,ht,gt,dt,pt,N,T,$,rt,lt,vt,kt){_t+=`<vertex x="${at.toFixed(3)}" y="${ht.toFixed(3)}" z="${gt.toFixed(3)}"/><vertex x="${dt.toFixed(3)}" y="${pt.toFixed(3)}" z="${N.toFixed(3)}"/><vertex x="${T.toFixed(3)}" y="${$.toFixed(3)}" z="${rt.toFixed(3)}"/><vertex x="${lt.toFixed(3)}" y="${vt.toFixed(3)}" z="${kt.toFixed(3)}"/>`,St+=`<triangle v1="${At}" v2="${At+1}" v3="${At+2}"/><triangle v1="${At}" v2="${At+2}" v3="${At+3}"/>`,At+=4};const st=w.size>0?Array.from(w.values()).reduce((at,ht)=>Math.max(at,ht.h),0):a,yt=r+st,bt=-e/2,Z=e/2,K=-n/2,ut=n/2;let _t="",St="",At=0;G(Z,ut,0,bt,ut,0,bt,ut,yt,Z,ut,yt),G(bt,K,0,Z,K,0,Z,K,yt,bt,K,yt),G(Z,K,0,Z,ut,0,Z,ut,yt,Z,K,yt),G(bt,ut,0,bt,K,0,bt,K,yt,bt,ut,yt),G(bt,ut,0,Z,ut,0,Z,K,0,bt,K,0);const It=pe.facade??1,q=(Kt[It]??"#c0af88").replace("#","");D.push({id:b++,slot:It,name:"facade",col:q,vx:_t,tr:St})}if(!D.length){alert("Aucun maillage à exporter.");return}const k=b,I=D.map(G=>`<basematerials id="${G.id+1e3}"><base name="${G.name}" displaycolor="#${G.col}"/></basematerials>`).join(`
`),R=D.map(G=>`<object id="${G.id}" type="model" name="${G.name}" pid="${G.id+1e3}" pindex="0"><mesh><vertices>${G.vx}</vertices><triangles>${G.tr}</triangles></mesh></object>`).join(`
`),U=D.map(G=>`<component objectid="${G.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(""),C=`<object id="${k}" type="model" name="Terrain3D"><components>${U}</components></object>`,E=`<item objectid="${k}" transform="1 0 0 0 1 0 0 0 1 0 0 0" printable="1" identify_id="1"/>`,B=['<?xml version="1.0" encoding="UTF-8"?>',"<config>",`  <object id="${k}" name="Terrain3D">`,'    <metadata key="name" value="Terrain3D"/>','    <metadata key="extruder" value="1"/>',...D.map(G=>`    <part id="${G.id}" subtype="normal_part"><metadata key="name" value="${G.name}"/><metadata key="extruder" value="${G.slot}"/></part>`),"  </object>","</config>"].join(`
`),X=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",I,R,C,"  </resources>","  <build>",E,"  </build>","</model>"].join(`
`),F=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>','  <Relationship Target="/metadata/model_settings.config" Id="rel1" Type="http://schemas.bambulab.com/package/2021/bambu-model-settings"/>',"</Relationships>"].join(`
`),W=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>','  <Override PartName="/metadata/model_settings.config" ContentType="application/xml"/>',"</Types>"].join(`
`),{default:Q}=await ZM(async()=>{const{default:G}=await import("./jszip.min-3NSyKGSB.js").then(st=>st.j);return{default:G}},[]),Y=new Q;Y.file("[Content_Types].xml",W),Y.folder("_rels").file(".rels",F),Y.folder("3D").file("3dmodel.model",X),Y.folder("metadata").file("model_settings.config",B);const ft=await Y.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),z=URL.createObjectURL(ft),ct=document.createElement("a");ct.href=z,ct.download=s??`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(ct),ct.click(),document.body.removeChild(ct),URL.revokeObjectURL(z)}function xo(){if(Le){if(hi){Le.remove(hi);const s=rn.indexOf(hi);s>=0&&rn.splice(s,1),hi.traverse(t=>{const e=t;e.geometry?.dispose(),Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):e.material?.dispose()}),hi=null}fo=!1,Ke&&(Ke.visible=!0);for(const s of rl)s.visible=Ge[s.__zoneLayerId]??!0;Pn&&(Pn.visible=Ge.roads??!0),ui&&(ui.visible=!0)}}function Vb(){const s=document.getElementById("zone-footer");s&&(Nt.bounds?(s.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),fb()):(s.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-apercu-btn")?.setAttribute("disabled","")))}let wr=!1,gc=!1,Sr="";function wn(){const s=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:s("dp-w",Nt.wMm||200),dMm:s("dp-d",Nt.dMm||200),baseH:s("dp-base",5),exag:s("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:s("dp-walls",2),gpxPoints:Nt.gpxPoints,zoneType:Nt.zoneType,zonePts:Nt.zonePts,bounds:Nt.bounds}}function eu(){const s=(m,_)=>{const M=document.getElementById(m);M&&(M.value=String(Math.round(_)))};if(!Nt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:r}=Nt.bounds,a=(t+e)/2,l=(r-n)*Math.cos(a*Math.PI/180)*111320,c=(e-t)*111320,h=200,d=l/c,f=d>=1?h:Math.max(10,Math.round(h*d)),g=d<1?h:Math.max(10,Math.round(h/d));Nt.wMm=f,Nt.dMm=g,s("dp-w",f),s("dp-d",g)}function Ls(){const s=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,r=document.getElementById("dp-layers-hint"),a=document.getElementById("dp-wall-mm");r&&(r.textContent=`${Math.round(s/e)} couches`),a&&(a.textContent=`${(t*n).toFixed(2)} mm`)}async function Xa(){if(!Nt.bounds||gc)return;gc=!0;const s=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");s.classList.remove("hidden");try{await db(Nt.bounds,wn(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{s.classList.add("hidden"),gc=!1}}function nu(){Nt.bounds&&(eu(),Ls(),requestAnimationFrame(()=>{const s=document.getElementById("dims-view");wr?(br(s),Xa()):(wr=!0,br(s),Xa())}))}window.dpToggle=s=>{document.getElementById(s)?.classList.toggle("open")};mm();xm(Vb);document.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const t=s.dataset.tab;!t||s.disabled||(Sr=t,Es(t),t==="params"?(xo(),nu()):t==="colors"?(xo(),iu()):t==="apercu"?up():ep())})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),Es("colors"),iu()});document.getElementById("btn-next-apercu")?.addEventListener("click",()=>{document.getElementById("tab-apercu-btn")?.removeAttribute("disabled"),Es("apercu"),up()});document.getElementById("btn-next-render")?.addEventListener("click",async()=>{const s=document.getElementById("btn-next-render");s.querySelector("span");const t=s.innerHTML;s.disabled=!0,s.innerHTML='<span style="display:flex;align-items:center;gap:6px"><svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><circle cx="10" cy="10" r="7" stroke-dasharray="22 22" stroke-linecap="round"/></svg>Génération…</span>';try{await Hb(`Terrain3D_${Date.now()}.3mf`)}finally{s.disabled=!1,s.innerHTML=t}});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{Sr="zone",ep(),Es("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{Sr="params",Es("params"),nu()});document.getElementById("btn-back-colors")?.addEventListener("click",()=>{Sr="colors",xo(),Es("colors"),iu()});document.querySelectorAll(".dp-sh").forEach(s=>{s.addEventListener("click",()=>{s.closest(".dp-sec")?.classList.toggle("open")})});let Kd;const Gb=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];Gb.forEach(s=>{document.getElementById(s)?.addEventListener("input",()=>{Ls();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(Nt.wMm=t),e>0&&(Nt.dMm=e),clearTimeout(Kd),Kd=setTimeout(()=>bn(wn()),500)})});document.getElementById("dp-walls")?.addEventListener("input",Ls);document.getElementById("dp-flat")?.addEventListener("change",()=>{bn(wn())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>void 0);document.getElementById("btn-next-tab")?.addEventListener("click",()=>{Nt.bounds&&(Es("params"),nu())});let Jd;document.querySelectorAll("#params-col input, #params-col select").forEach(s=>{s.addEventListener("change",()=>{clearTimeout(Jd),Jd=setTimeout(()=>{},700)}),s.addEventListener("input",()=>{if(s.type==="range"){const t=document.getElementById(`${s.id}-v`);t&&(t.textContent=s.value)}})});function lp(s){document.getElementById(s)?.classList.remove("hidden")}function cp(s){document.getElementById(s)?.classList.add("hidden")}function iu(){Nt.bounds&&(eu(),requestAnimationFrame(async()=>{const s=document.getElementById("colors-3d-area");lp("colors-loading"),wr?(br(s),await new Promise(t=>requestAnimationFrame(()=>t())),bn(wn())):(wr=!0,br(s),await Xa()),cp("colors-loading"),Xb()}))}function Wb(){return Number(document.getElementById("ps-layer-h")?.value??.2)}function Zb(){Ea(Wb());const s=document.getElementById("btn-print-preview");if(s){s.classList.add("active");const t=s.querySelector("span");t&&(t.textContent="Aperçu lisse")}}function up(){Nt.bounds&&(Sr="apercu",eu(),requestAnimationFrame(async()=>{const s=document.getElementById("apercu-3d-area");lp("apercu-loading"),xo(),wr?(br(s),await new Promise(t=>requestAnimationFrame(()=>t())),bn(wn())):(wr=!0,br(s),await Xa()),cp("apercu-loading"),Sr==="apercu"&&Zb()}))}function Xb(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(s=>{const t=Number(s.dataset.slot);Kt[t]&&(s.style.background=Kt[t])}),document.querySelectorAll(".cp-sw-inner").forEach(s=>{const e=s.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(s.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(s=>{const t=Number(s.dataset.slot);s.addEventListener("input",()=>{const n=s.value,r=s.nextElementSibling;r&&(r.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(a=>{a.style.background=n}),Pr({[t]:n})});const e=s.nextElementSibling;e&&(e.style.background=s.value)});function qb(s,t){Pr({[s]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${s}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${s}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let ir=null;function $b(s,t){ir&&(ir.remove(),ir=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(Kt).map(Number).sort((c,h)=>c-h),r=pe[s]??Number(t.dataset.slot)??1;n.forEach(c=>{const h=document.createElement("div");h.className="cp-slot-pick-item"+(c===r?" active":""),h.style.setProperty("--sw",Kt[c]??"#888"),h.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,h.addEventListener("click",d=>{d.stopPropagation(),sb(s,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=Kt[c]??"#888",e.remove(),ir=null}),e.appendChild(h)}),document.body.appendChild(e),ir=e;const a=t.getBoundingClientRect();e.style.left=`${a.left}px`,e.style.top=`${a.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),ir=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const n=s.closest(".cp-layer")?.dataset.layer??"";n&&$b(n,s)})});let sr=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(sr){sr.remove(),sr=null;return}const s=Math.max(...Object.keys(Kt).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,sr=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),sr=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const r=e.value;Kt[s]=r;const a=document.createElement("label");a.className="cp-swatch",a.dataset.slot=String(s),a.title=`Couleur ${s}`,a.innerHTML=`<input type="color" class="cp-color-input" data-slot="${s}" value="${r}"><div class="cp-sw-inner" style="background:${r}"><span class="cp-sw-num">${s}</span></div>`,a.querySelector(".cp-color-input").addEventListener("input",function(){qb(s,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(a),t.remove(),sr=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete Kt[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{Pr({})});document.querySelectorAll(".cp-eye").forEach(s=>{const t=s.dataset.layer;t&&s.addEventListener("click",()=>{s.classList.toggle("hidden-layer");const e=!s.classList.contains("hidden-layer");np(t,e)})});const hp={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const s=document.getElementById("cp-preset").value,t=hp[s];t&&(Pr(t),Object.entries(t).forEach(([e,n])=>{const r=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(r){r.value=n;const a=r.nextElementSibling;a&&(a.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const Yb=document.getElementById("cp-dd-trigger"),su=document.getElementById("cp-dd-menu");Yb?.addEventListener("click",s=>{s.stopPropagation(),su?.classList.toggle("open")});document.addEventListener("click",()=>su?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const e=s.dataset.preset??"",n=s.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),s.classList.add("cp-dd-active");const r=document.getElementById("cp-dd-label");r&&(r.textContent=n),su?.classList.remove("open");const a=hp[e];a&&(Pr(a),jb(a))})});function jb(s){Object.entries(s).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const r=n.nextElementSibling;r&&(r.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);s[e]&&(t.style.background=s[e])})}const ru=document.getElementById("cp-layer-detail"),dp=document.getElementById("ldp-title"),fp=document.getElementById("ldp-icon"),pp=document.getElementById("ldp-content");function Kb(s,t,e){dp.textContent=t,fp.innerHTML=e,pp.innerHTML=tw(s),ru.classList.add("open"),lw(s)}function mp(){ru.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",mp);document.querySelectorAll(".cp-layer-nav").forEach(s=>{s.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=s.dataset.type??"land_cover",n=s.querySelector(".cp-layer-name")?.textContent??"Couche",r=s.querySelector(".cp-layer-ico")?.innerHTML??"";Kb(e,n,r)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{dp.textContent="Nouvelle couche",fp.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',pp.innerHTML=aw(),ru.classList.add("open"),cw()});function Jb(){const s=Kc==="raised";return`
  <div class="ldp-section">
    <div class="ldp-row">
      <label class="ldp-label">Road Style</label>
      <div class="ldp-row-right" style="display:flex;gap:4px">
        <button class="ldp-style-btn${s?" active":""}" data-style="raised">Raised</button>
        <button class="ldp-style-btn${s?"":" active"}" data-style="recessed">Recessed</button>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Road Height</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-h" min="0" max="20" step="0.05" value="${Ga.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Minimum Road Width</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-minw" min="0.1" max="10" step="0.05" value="${jc.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Road Width Multiplier</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-mult" min="0.1" max="10" step="0.05" value="${ll.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">x</span>
      </div>
    </div>
  </div>`}function Qb(){const s=Ba.toFixed(2),t=za.toFixed(2),e=Ha.toFixed(2),n=Va.toFixed(2);return`
  <div class="ldp-section">
    <div class="ldp-row">
      <label class="ldp-label">Building height scale</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-bld-hscale" min="0.1" max="20" step="0.05" value="${s}" style="width:72px">
        <span style="margin-left:4px">x</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Building size scale</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-bld-szscale" min="0.1" max="20" step="0.05" value="${t}" style="width:72px">
        <span style="margin-left:4px">x</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Minimum building height</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-bld-minh" min="0" max="20" step="0.05" value="${e}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Hide buildings smaller than</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-bld-minsz" min="0" max="10000" step="0.5" value="${n}" style="width:72px">
        <span style="margin-left:4px">m²</span>
      </div>
    </div>
  </div>`}function tw(s){return s==="markers"?iw():s==="lines"?rw():s==="water"?nw():s==="waterways"?ew():["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(s)?ow(s):s==="roads"?Jb():s==="buildings"?Qb():""}function ew(){const s=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=(co*s).toFixed(2),n=(Ic*t).toFixed(2),r=Yi;return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Largeur (nb. de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Épaisseur des lignes comme multiple de la largeur de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-ww-width" class="cp-slider" min="1" max="10" step="0.5" value="${co}">
        <input type="number" class="ldp-num" id="ldp-ww-width-n" value="${co}" step="0.5">
        <span class="ldp-unit" id="ldp-ww-width-mm">( ${e} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-ww-offset" value="${Ic}" step="1">
        <span class="ldp-unit" id="ldp-ww-offset-mm">( ${n} mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="rivers"${r.rivers!==!1?" checked":""}> Rivières</label>
    <div class="ldp-ww-stream-group">
      <label class="ldp-check-row"><input type="checkbox" id="ldp-ww-streams" class="ldp-ww-feat" data-key="streams"${r.streams_named!==!1||r.streams_unnamed!==!1?" checked":""}> Ruisseaux</label>
      <div class="ldp-ww-stream-subs" style="padding-left:18px">
        <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="streams_named"${r.streams_named!==!1?" checked":""}> Nommés</label>
        <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="streams_unnamed"${r.streams_unnamed!==!1?" checked":""}> Sans nom</label>
      </div>
    </div>
    <label class="ldp-check-row">
      <input type="checkbox" class="ldp-ww-feat" data-key="river_polygons"${r.river_polygons!==!1?" checked":""}>
      Polygones rivières (expérimental)
      <button class="cp-icon-btn cp-info-btn" title="Peut donner des résultats étranges pour le décalage de hauteur en zone montagneuse">i</button>
    </label>
    <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="canals"${r.canals!==!1?" checked":""}> Canaux</label>
    <label class="ldp-check-row">
      <input type="checkbox" class="ldp-ww-feat" data-key="canal_polygons"${r.canal_polygons!==!1?" checked":""}>
      Polygones canaux (expérimental)
      <button class="cp-icon-btn cp-info-btn" title="Peut donner des résultats étranges pour le décalage de hauteur en zone montagneuse">i</button>
    </label>
  </div>`}function nw(){const s=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,t=(yo*s).toFixed(2),n=[{key:"water_ocean",label:"Océans"},{key:"water_lake",label:"Lacs"},{key:"water_pond",label:"Étangs"},{key:"water_reservoir",label:"Réservoirs"},{key:"water_wastewater",label:"Eaux usées"},{key:"water_human",label:"Artificiel"},{key:"water_other",label:"Autre"}].map(r=>`<label class="ldp-check-row"><input type="checkbox" class="ldp-water-feat" data-key="${r.key}"${al[r.key]!==!1?" checked":""}> ${r.label}</label>`).join("");return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-water-offset" value="${yo}" step="1">
        <span class="ldp-unit" id="ldp-water-offset-mm">( ${t} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <label class="ldp-check-row">
        <input type="checkbox" id="ldp-water-hydro"${Fa?" checked":""}>
        <span>Hydro-Flatten</span>
        <button class="cp-icon-btn cp-info-btn" title="Force une élévation plate pour toutes les étendues d'eau">i</button>
      </label>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    ${n}
  </div>`}function iw(){return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-label">Forme</div>
      <div class="ldp-shape-grid">${[{id:"circle",label:"Rond",svg:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>'},{id:"square",label:"Carré",svg:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>'},{id:"diamond",label:"Losange",svg:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>'},{id:"triangle",label:"Triangle",svg:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>'},{id:"cross",label:"Croix",svg:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>'},{id:"heart",label:"Cœur",svg:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>'},{id:"star",label:"Étoile",svg:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'}].map((e,n)=>`<button class="ldp-shape-btn${n===4?" active":""}" data-shape="${e.id}" title="${e.label}"><svg viewBox="0 0 16 16">${e.svg}</svg></button>`).join("")}</div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Diamètre (nb. de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Diamètre du marqueur comme multiple de la largeur de ligne de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-marker-size" class="cp-slider" min="1" max="20" value="10">
        <input type="number" class="ldp-num" id="ldp-marker-size-n" value="10.0" step="0.5">
        <span class="ldp-unit" id="ldp-marker-mm">( 4.20 mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Rotation (°)</div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-marker-rot" class="cp-slider" min="0" max="360" value="0">
        <input type="number" class="ldp-num" id="ldp-marker-rot-n" value="0" step="1">
      </div>
    </div>
    <div class="ldp-field">
      <label class="ldp-check-row">
        <input type="checkbox" id="ldp-marker-flat" checked>
        <span>Plateau plat</span>
        <button class="cp-icon-btn cp-info-btn" title="Surface plate au sommet au lieu de suivre le terrain">i</button>
      </label>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Valeur positive = élève au-dessus de la surface">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-marker-offset" value="0" step="1" min="-20">
        <span class="ldp-unit" id="ldp-offset-mm">( 0.00 mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Marqueurs placés</span></div>
    <div id="ldp-marker-list" class="ldp-marker-list"><div class="ldp-empty">Aucun marqueur placé</div></div>
  </div>`}const sw=[{label:"Itinéraires de randonnée",cats:[{key:"hiking_iwn",label:"International"},{key:"hiking_nwn",label:"National"},{key:"hiking_rwn",label:"Régional"},{key:"hiking_lwn",label:"Local"}]},{label:"Itinéraires cyclables",cats:[{key:"cycling_icn",label:"International"},{key:"cycling_ncn",label:"National"},{key:"cycling_rcn",label:"Régional"},{key:"cycling_lcn",label:"Local"}]},{label:"Parcours de VTT",cats:[{key:"mtb_0",label:"International"},{key:"mtb_1",label:"National"},{key:"mtb_2",label:"Régional"},{key:"mtb_local",label:"Local"}]},{label:"Itinéraires équestres",cats:[{key:"equestrian_iwn",label:"International"},{key:"equestrian_nwn",label:"National"},{key:"equestrian_rwn",label:"Régional"},{key:"equestrian_lwn",label:"Local"}]},{label:"Sports d'hiver",cats:[{key:"piste_easy",label:"Facile"},{key:"piste_novice",label:"Novice"},{key:"piste_intermediate",label:"Intermédiaire"},{key:"piste_advanced",label:"Avancé"},{key:"piste_expert",label:"Expert"},{key:"piste_freeride",label:"Freeride"},{key:"piste_other",label:"Autre difficulté"},{key:"piste_none",label:"Sans difficulté"}]},{label:"Routes",cats:[{key:"road_motorway",label:"Autoroute"},{key:"road_trunk",label:"Voie express"},{key:"road_primary",label:"Route nationale"},{key:"road_secondary",label:"Route départementale"},{key:"road_tertiary",label:"Voie tertiaire"},{key:"road_unclassified",label:"Non classifiée"}]},{label:"Rues",cats:[{key:"street_living",label:"Zone de rencontre"},{key:"street_residential",label:"Rue résidentielle"}]},{label:"Rails",cats:[{key:"rail_narrow",label:"Voie étroite"},{key:"rail_standard",label:"Voie standard"},{key:"rail_unknown",label:"Inconnue"},{key:"rail_funicular",label:"Funiculaire"},{key:"rail_light",label:"Tramway rapide"},{key:"rail_monorail",label:"Monorail"},{key:"rail_tram",label:"Tramway"},{key:"rail_subway",label:"Métro"}]}];function rw(){const s='<svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg>';return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Largeur (nombre de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Épaisseur de la ligne en nombre de murs">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-line-w" class="cp-slider" min="1" max="10" value="1">
        <input type="number" class="ldp-num" id="ldp-line-w-n" value="1.0" step="0.5">
        <span class="ldp-unit">( 0,42 mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nombre de calques)</span>
        <button class="cp-icon-btn cp-info-btn" title="Décalage vertical en nombre de couches">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-line-offset" value="1" step="1" min="0">
        <span class="ldp-unit">( 0,20 mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    <div id="ldp-line-groups">${sw.map(e=>{const n=e.cats.every(a=>Wa[a.key]===!0),r=e.cats.map(a=>{const l=Wa[a.key]===!0;return`<label class="ldp-sub-row"><input type="checkbox" class="ldp-line-sub" data-linecat="${a.key}"${l?" checked":""}> ${a.label}</label>`}).join("");return`
    <div class="ldp-line-group">
      <div class="ldp-line-group-header">
        <input type="checkbox" class="ldp-line-group-chk" data-group="${e.label}"${n?" checked":""}>
        <span class="ldp-group-label">${e.label}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories">${s}</button>
      </div>
      <div class="ldp-line-subs">${r}</div>
    </div>`}).join("")}</div>
    <div id="ldp-line-status" class="ldp-line-status"></div>
  </div>`}function ow(s){const t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=Qf[s]??0,n=(e*t).toFixed(2),r=$i[s]??{},a=(c,h,d)=>{const f=d.filter(M=>r[M.key]===!0).length,g=f===d.length,m=f>0,_=d.map(M=>`<label class="ldp-check-row ldp-lc-sub"><input type="checkbox" class="ldp-lc-feat" data-key="${M.key}"${r[M.key]===!0?" checked":""}> ${M.label}</label>`).join("");return`
    <div class="ldp-lc-group">
      <div class="ldp-lc-group-header">
        <input type="checkbox" class="ldp-lc-group-chk" data-group="${c}"${g?" checked":m?' data-indeterminate="1"':""}>
        <span class="ldp-group-label">${h}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories"><svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg></button>
      </div>
      <div class="ldp-line-subs">${_}</div>
    </div>`},l=[a("forests","Forêts",[{key:"lc_forest",label:"Forêt"},{key:"lc_forest_detailed",label:"Forêt (Détaillée)"}]),a("shrubs","Arbustes",[{key:"lc_scrub",label:"Lande"},{key:"lc_shrub",label:"Buisson"}]),a("fields","Champs",[{key:"lc_grass",label:"Prairie"},{key:"lc_grass_detailed",label:"Prairie (Détaillée)"},{key:"lc_crop",label:"Culture"},{key:"lc_moss",label:"Mousse"}]),a("wetlands","Zones humides",[{key:"lc_wetland",label:"Zone humide"},{key:"lc_wetland_detailed",label:"Zone humide (Détaillée)"},{key:"lc_mangrove",label:"Mangrove"}]),a("barren","Terrain nu",[{key:"lc_barren",label:"Terrain nu"},{key:"lc_desert",label:"Désert"},{key:"lc_sand",label:"Sable"},{key:"lc_rock",label:"Roche"}]),a("ice","Glace",[{key:"lc_snow",label:"Glace & Neige"},{key:"lc_glacier",label:"Glacier"}]),`<label class="ldp-check-row"><input type="checkbox" class="ldp-lc-feat" data-key="lc_urban"${r.lc_urban===!0?" checked":""}> Urbain</label>`].join("");return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-lc-offset" value="${e}" step="1">
        <span class="ldp-unit" id="ldp-lc-offset-mm">( ${n} mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    ${l}
  </div>`}function aw(){return`
  <div class="ldp-sec">
    <div class="ldp-field" style="padding-top:10px">
      <div class="ldp-field-label">Type</div>
      <select class="ldp-select" id="ldp-new-type">
        <option value="land_cover">Couverture terrestre</option>
        <option value="lines">Lignes</option>
        <option value="markers">Marqueurs</option>
        <option value="water">Plans d'eau</option>
        <option value="waterways">Voies navigables</option>
      </select>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Nom</div>
      <input type="text" class="ldp-input" id="ldp-new-name" placeholder="Couverture terrestre">
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Couleur</div>
      <div class="ldp-color-slot" id="ldp-new-color" data-slot="1" style="background:#c0af88">1</div>
    </div>
    <button class="btn-gen-f ldp-add-btn" id="ldp-confirm-add">Ajouter un calque</button>
  </div>`}function lw(s){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(s==="markers"){const n=document.getElementById("ldp-marker-size"),r=document.getElementById("ldp-marker-size-n"),a=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),c=document.getElementById("ldp-marker-rot-n"),h=document.getElementById("ldp-marker-offset"),d=document.getElementById("ldp-offset-mm"),f=()=>{a&&(a.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},g=()=>{d&&(d.textContent=`( ${(Number(h.value||0)*e).toFixed(2)} mm )`)},m=()=>{const _=Uc();_<0||kc(_,{diameterMult:Number(n?.value??10)||10,rotDeg:Number(l?.value??0),flatTop:document.getElementById("ldp-marker-flat")?.checked??!0,heightOffMult:Number(h?.value??0)})};n?.addEventListener("input",()=>{r&&(r.value=Number(n.value).toFixed(1)),f(),m()}),r?.addEventListener("input",()=>{n&&(n.value=r.value),f(),m()}),l?.addEventListener("input",()=>{c&&(c.value=l.value),m()}),c?.addEventListener("input",()=>{l&&(l.value=c.value),m()}),h?.addEventListener("input",()=>{g(),m()}),document.getElementById("ldp-marker-flat")?.addEventListener("change",m),f(),g(),_r(),document.querySelectorAll(".ldp-shape-btn").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(v=>v.classList.remove("active")),_.classList.add("active");const M=_.dataset.shape??"circle",w=Uc();w>=0?kc(w,{shape:M}):(ob(M),ou(!0))})})}if(s==="lines"){const n=document.getElementById("ldp-line-w"),r=document.getElementById("ldp-line-w-n"),a=document.getElementById("ldp-line-offset"),l=()=>{const d=Math.max(.1,Number(n?.value??1)||1),f=Number(a?.value??1)||1;rb(d,f);const g=wn();g&&bn(g)};n?.addEventListener("input",()=>{r&&(r.value=Number(n.value).toFixed(1)),l()}),r?.addEventListener("input",()=>{n&&(n.value=r.value),l()}),a?.addEventListener("input",l);const c=d=>d.closest(".ldp-line-group")?.classList.toggle("open");document.querySelectorAll(".ldp-chev-btn").forEach(d=>d.addEventListener("click",()=>c(d))),document.querySelectorAll(".ldp-group-label").forEach(d=>d.addEventListener("click",()=>c(d)));const h=()=>{if(!Nt.bounds)return;const d=document.getElementById("ldp-line-status");d&&(d.textContent="Chargement des données…"),Rb(Nt.bounds).then(()=>{d&&(d.textContent="")}).catch(()=>{d&&(d.textContent="Erreur de chargement.")})};document.querySelectorAll(".ldp-line-sub").forEach(d=>{d.addEventListener("change",()=>{jd(d.dataset.linecat,d.checked),d.checked&&h();const f=d.closest(".ldp-line-group"),g=f?.querySelector(".ldp-line-group-chk");if(g){const m=f.querySelectorAll(".ldp-line-sub");g.checked=Array.from(m).every(_=>_.checked),g.indeterminate=!g.checked&&Array.from(m).some(_=>_.checked)}})}),document.querySelectorAll(".ldp-line-group-chk").forEach(d=>{d.addEventListener("change",()=>{d.closest(".ldp-line-group")?.querySelectorAll(".ldp-line-sub").forEach(g=>{g.checked=d.checked,jd(g.dataset.linecat,d.checked)}),d.checked&&h()})})}if(["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(s)){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,r=document.getElementById("ldp-lc-offset"),a=document.getElementById("ldp-lc-offset-mm");r?.addEventListener("input",()=>{const c=Number(r.value??0);a&&(a.textContent=`( ${(c*n).toFixed(2)} mm )`),nb(s,c)}),document.querySelectorAll(".ldp-lc-group-chk").forEach(c=>{c.dataset.indeterminate&&(c.indeterminate=!0),c.addEventListener("change",()=>{c.closest(".ldp-lc-group")?.querySelectorAll(".ldp-lc-feat").forEach(f=>{f.checked=c.checked,Xd(s,f.dataset.key,c.checked)});const d=wn();d&&bn(d)})});const l=c=>c.closest(".ldp-lc-group")?.classList.toggle("open");document.querySelectorAll(".ldp-lc-group .ldp-chev-btn").forEach(c=>c.addEventListener("click",()=>l(c))),document.querySelectorAll(".ldp-lc-group .ldp-group-label").forEach(c=>c.addEventListener("click",()=>l(c))),document.querySelectorAll(".ldp-lc-feat").forEach(c=>{c.addEventListener("change",()=>{Xd(s,c.dataset.key,c.checked);const h=c.closest(".ldp-lc-group"),d=h?.querySelector(".ldp-lc-group-chk");if(d){const g=Array.from(h.querySelectorAll(".ldp-lc-feat"));d.checked=g.every(m=>m.checked),d.indeterminate=!d.checked&&g.some(m=>m.checked)}const f=wn();f&&bn(f)})})}if(s==="roads"){const n=(r,a)=>{const l=document.getElementById(r);l?.addEventListener("change",()=>{a(Number(l.value)),Fc()})};n("ldp-road-h",JM),n("ldp-road-minw",QM),n("ldp-road-mult",tb),document.querySelectorAll(".ldp-style-btn").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".ldp-style-btn").forEach(a=>a.classList.remove("active")),r.classList.add("active"),eb(r.dataset.style),Fc()})})}if(s==="buildings"){const n=(r,a,l)=>{const c=document.getElementById(r),h=document.getElementById(r+"-val");c?.addEventListener("input",()=>{const d=Number(c.value);h&&(h.textContent=a(d)),l(d);const f=wn();f&&bn(f)})};n("ldp-bld-hscale",r=>`${r.toFixed(2)}x`,$M),n("ldp-bld-szscale",r=>`${r.toFixed(2)}x`,YM),n("ldp-bld-minh",r=>`${r.toFixed(2)} mm`,jM),n("ldp-bld-minsz",r=>`${r.toFixed(2)} m²`,KM)}if(s==="water"){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,r=document.getElementById("ldp-water-offset"),a=document.getElementById("ldp-water-offset-mm"),l=document.getElementById("ldp-water-hydro"),c=()=>{const h=Number(r?.value??-1),d=l?.checked??!1;a&&(a.textContent=`( ${(h*n).toFixed(2)} mm )`),vb(h,d);const f=wn();f&&bn(f)};r?.addEventListener("input",c),l?.addEventListener("change",c),document.querySelectorAll(".ldp-water-feat").forEach(h=>{h.addEventListener("change",()=>{yb(h.dataset.key,h.checked);const d=wn();d&&bn(d)})})}if(s==="waterways"){const n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,r=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,a=document.getElementById("ldp-ww-width"),l=document.getElementById("ldp-ww-width-n"),c=document.getElementById("ldp-ww-width-mm"),h=document.getElementById("ldp-ww-offset"),d=document.getElementById("ldp-ww-offset-mm"),f=()=>{const m=Math.max(.1,Number(l?.value??1)||1),_=Number(h?.value??-1);c&&(c.textContent=`( ${(m*n).toFixed(2)} mm )`),d&&(d.textContent=`( ${(_*r).toFixed(2)} mm )`),xb(m,_);const M=wn();M&&bn(M)};a?.addEventListener("input",()=>{l&&(l.value=Number(a.value).toFixed(1)),f()}),l?.addEventListener("input",()=>{a&&(a.value=l.value),f()}),h?.addEventListener("input",f);const g=document.getElementById("ldp-ww-streams");g?.addEventListener("change",()=>{document.querySelectorAll('.ldp-ww-feat[data-key="streams_named"], .ldp-ww-feat[data-key="streams_unnamed"]').forEach(_=>{_.checked=g.checked,Yd(_.dataset.key,g.checked)});const m=wn();m&&bn(m)}),document.querySelectorAll(".ldp-ww-feat").forEach(m=>{m.id!=="ldp-ww-streams"&&m.addEventListener("change",()=>{if(Yd(m.dataset.key,m.checked),(m.dataset.key==="streams_named"||m.dataset.key==="streams_unnamed")&&g){const M=document.querySelector('.ldp-ww-feat[data-key="streams_named"]')?.checked??!1,w=document.querySelector('.ldp-ww-feat[data-key="streams_unnamed"]')?.checked??!1;g.checked=M||w,g.indeterminate=M!==w}const _=wn();_&&bn(_)})})}}function cw(){document.getElementById("ldp-new-type")?.addEventListener("change",s=>{const t=s.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",mp),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const s=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=s[(s.indexOf(t)+1)%s.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=Kt[e]??"#888"})}const gr=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{gr.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{gr.classList.add("hidden")});gr?.addEventListener("click",s=>{s.target===gr&&gr.classList.add("hidden")});const qa=document.getElementById("ps-layer-h"),$a=document.getElementById("ps-wall-w"),gp=document.getElementById("ps-layer-h-val"),_p=document.getElementById("ps-wall-w-val");qa?.addEventListener("input",()=>{gp.textContent=Number(qa.value).toFixed(2),Ls()});$a?.addEventListener("input",()=>{_p.textContent=Number($a.value).toFixed(2),Ls()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{gr.classList.add("hidden"),Ls()});document.getElementById("ps-reset")?.addEventListener("click",()=>{qa&&(qa.value="0.20",gp.textContent="0.20"),$a&&($a.value="0.42",_p.textContent="0.42"),Ls()});function ou(s){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=s?"block":"none"}let vp=0,yp=0;document.getElementById("dims-canvas")?.addEventListener("pointerdown",s=>{vp=s.clientX,yp=s.clientY});document.getElementById("dims-canvas")?.addEventListener("click",s=>{const t=s.clientX-vp,e=s.clientY-yp;if(!(t*t+e*e>=25))if(sp())ab(s.clientX,s.clientY)>=0&&(ou(!1),_r());else{const n=cb(s.clientX,s.clientY);if(n>=0){rp(n),_r();const a=Oc().find(l=>l.id===n);a&&xp(a)}else lb()}});document.addEventListener("keydown",s=>{s.key==="Escape"&&sp()&&(ip(),ou(!1))});const uw={circle:"Rond",square:"Carré",diamond:"Losange",triangle:"Triangle",cross:"Croix",heart:"Cœur",star:"Étoile"},Qd={circle:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>',square:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>',diamond:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>',triangle:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>',cross:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>',heart:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>',star:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'},hw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>',dw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>';function _r(){const s=document.getElementById("ldp-marker-list");if(!s)return;const t=Oc(),e=Uc();if(!t.length){s.innerHTML='<div class="ldp-empty">Aucun marqueur placé</div>';return}s.innerHTML=t.map(n=>`
    <div class="ldp-marker-row${n.id===e?" selected":""}" data-marker-id="${n.id}">
      <svg class="ldp-marker-ico" viewBox="0 0 16 16">${Qd[n.shape]??Qd.circle}</svg>
      <span class="ldp-marker-lbl">${uw[n.shape]??n.shape}</span>
      <button class="cp-eye ldp-m-eye${n.visible?" active":""}" data-mid="${n.id}" title="Visibilité">${hw}</button>
      <button class="cp-del ldp-m-del" data-mid="${n.id}" title="Supprimer">${dw}</button>
    </div>`).join(""),s.querySelectorAll(".ldp-marker-row").forEach(n=>{n.addEventListener("click",r=>{if(r.target.closest(".cp-eye, .cp-del"))return;const a=Number(n.dataset.markerId);rp(a),_r();const l=Oc().find(c=>c.id===a);l&&xp(l)})}),s.querySelectorAll(".ldp-m-eye").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation();const a=Number(n.dataset.mid),l=!n.classList.contains("active");ub(a,l),_r()})}),s.querySelectorAll(".ldp-m-del").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation(),hb(Number(n.dataset.mid)),_r()})})}function xp(s){document.querySelectorAll(".ldp-shape-btn").forEach(g=>g.classList.remove("active")),document.querySelector(`.ldp-shape-btn[data-shape="${s.shape}"]`)?.classList.add("active");const t=document.getElementById("ldp-marker-size"),e=document.getElementById("ldp-marker-size-n");t&&(t.value=String(s.diameterMult)),e&&(e.value=String(s.diameterMult));const n=document.getElementById("ldp-marker-rot"),r=document.getElementById("ldp-marker-rot-n");n&&(n.value=String(s.rotDeg)),r&&(r.value=String(s.rotDeg));const a=document.getElementById("ldp-marker-flat");a&&(a.checked=s.flatTop);const l=document.getElementById("ldp-marker-offset");l&&(l.value=String(s.heightOffMult));const c=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,h=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,d=document.getElementById("ldp-marker-mm"),f=document.getElementById("ldp-offset-mm");d&&(d.textContent=`( ${(s.diameterMult*c).toFixed(2)} mm )`),f&&(f.textContent=`( ${(s.heightOffMult*h).toFixed(2)} mm )`)}document.querySelectorAll(".cp-del:not(.ldp-m-del)").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const e=s.closest(".cp-layer");if(!e)return;const n=e.dataset.layer;n&&np(n,!1),e.remove()})});export{gm as c,_m as g};
