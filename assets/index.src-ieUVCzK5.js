(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();function xm(){document.getElementById("app").innerHTML=`

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
`}function Ls(s){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===s)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${s}`))}window.ts=s=>{document.getElementById(`sb-${s}`)?.classList.toggle("h"),document.getElementById(`ca-${s}`)?.classList.toggle("o")};window.ev=s=>{s.stopPropagation()};var Mm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function bm(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var yc={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(s,t){(function(e,n){n(t)})(Mm,function(e){var n="1.9.4";function r(i){var o,u,p,M;for(u=1,p=arguments.length;u<p;u++){M=arguments[u];for(o in M)i[o]=M[o]}return i}var a=Object.create||function(){function i(){}return function(o){return i.prototype=o,new i}}();function l(i,o){var u=Array.prototype.slice;if(i.bind)return i.bind.apply(i,u.call(arguments,1));var p=u.call(arguments,2);return function(){return i.apply(o,p.length?p.concat(u.call(arguments)):arguments)}}var c=0;function h(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,o,u){var p,M,C,z;return z=function(){p=!1,M&&(C.apply(u,M),M=!1)},C=function(){p?M=arguments:(i.apply(u,arguments),setTimeout(z,o),p=!0)},C}function f(i,o,u){var p=o[1],M=o[0],C=p-M;return i===p&&u?i:((i-M)%C+C)%C+M}function m(){return!1}function g(i,o){if(o===!1)return i;var u=Math.pow(10,o===void 0?6:o);return Math.round(i*u)/u}function _(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function x(i){return _(i).split(/\s+/)}function w(i,o){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?a(i.options):{});for(var u in o)i.options[u]=o[u];return i.options}function y(i,o,u){var p=[];for(var M in i)p.push(encodeURIComponent(u?M.toUpperCase():M)+"="+encodeURIComponent(i[M]));return(!o||o.indexOf("?")===-1?"?":"&")+p.join("&")}var v=/\{ *([\w_ -]+) *\}/g;function N(i,o){return i.replace(v,function(u,p){var M=o[p];if(M===void 0)throw new Error("No value provided for variable "+u);return typeof M=="function"&&(M=M(o)),M})}var b=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function A(i,o){for(var u=0;u<i.length;u++)if(i[u]===o)return u;return-1}var k="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function I(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var R=0;function U(i){var o=+new Date,u=Math.max(0,16-(o-R));return R=o+u,window.setTimeout(i,u)}var P=window.requestAnimationFrame||I("RequestAnimationFrame")||U,E=window.cancelAnimationFrame||I("CancelAnimationFrame")||I("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function B(i,o,u){if(u&&P===U)i.call(o);else return P.call(window,l(i,o))}function q(i){i&&E.call(window,i)}var F={__proto__:null,extend:r,create:a,bind:l,get lastId(){return c},stamp:h,throttle:d,wrapNum:f,falseFn:m,formatNum:g,trim:_,splitWords:x,setOptions:w,getParamString:y,template:N,isArray:b,indexOf:A,emptyImageUrl:k,requestFn:P,cancelFn:E,requestAnimFrame:B,cancelAnimFrame:q};function X(){}X.extend=function(i){var o=function(){w(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},u=o.__super__=this.prototype,p=a(u);p.constructor=o,o.prototype=p;for(var M in this)Object.prototype.hasOwnProperty.call(this,M)&&M!=="prototype"&&M!=="__super__"&&(o[M]=this[M]);return i.statics&&r(o,i.statics),i.includes&&(et(i.includes),r.apply(null,[p].concat(i.includes))),r(p,i),delete p.statics,delete p.includes,p.options&&(p.options=u.options?a(u.options):{},r(p.options,i.options)),p._initHooks=[],p.callInitHooks=function(){if(!this._initHooksCalled){u.callInitHooks&&u.callInitHooks.call(this),this._initHooksCalled=!0;for(var C=0,z=p._initHooks.length;C<z;C++)p._initHooks[C].call(this)}},o},X.include=function(i){var o=this.prototype.options;return r(this.prototype,i),i.options&&(this.prototype.options=o,this.mergeOptions(i.options)),this},X.mergeOptions=function(i){return r(this.prototype.options,i),this},X.addInitHook=function(i){var o=Array.prototype.slice.call(arguments,1),u=typeof i=="function"?i:function(){this[i].apply(this,o)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(u),this};function et(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=b(i)?i:[i];for(var o=0;o<i.length;o++)i[o]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var K={on:function(i,o,u){if(typeof i=="object")for(var p in i)this._on(p,i[p],o);else{i=x(i);for(var M=0,C=i.length;M<C;M++)this._on(i[M],o,u)}return this},off:function(i,o,u){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var p in i)this._off(p,i[p],o);else{i=x(i);for(var M=arguments.length===1,C=0,z=i.length;C<z;C++)M?this._off(i[C]):this._off(i[C],o,u)}return this},_on:function(i,o,u,p){if(typeof o!="function"){console.warn("wrong listener type: "+typeof o);return}if(this._listens(i,o,u)===!1){u===this&&(u=void 0);var M={fn:o,ctx:u};p&&(M.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(M)}},_off:function(i,o,u){var p,M,C;if(this._events&&(p=this._events[i],!!p)){if(arguments.length===1){if(this._firingCount)for(M=0,C=p.length;M<C;M++)p[M].fn=m;delete this._events[i];return}if(typeof o!="function"){console.warn("wrong listener type: "+typeof o);return}var z=this._listens(i,o,u);if(z!==!1){var Q=p[z];this._firingCount&&(Q.fn=m,this._events[i]=p=p.slice()),p.splice(z,1)}}},fire:function(i,o,u){if(!this.listens(i,u))return this;var p=r({},o,{type:i,target:this,sourceTarget:o&&o.sourceTarget||this});if(this._events){var M=this._events[i];if(M){this._firingCount=this._firingCount+1||1;for(var C=0,z=M.length;C<z;C++){var Q=M[C],ht=Q.fn;Q.once&&this.off(i,ht,Q.ctx),ht.call(Q.ctx||this,p)}this._firingCount--}}return u&&this._propagateEvent(p),this},listens:function(i,o,u,p){typeof i!="string"&&console.warn('"string" type argument expected');var M=o;typeof o!="function"&&(p=!!o,M=void 0,u=void 0);var C=this._events&&this._events[i];if(C&&C.length&&this._listens(i,M,u)!==!1)return!0;if(p){for(var z in this._eventParents)if(this._eventParents[z].listens(i,o,u,p))return!0}return!1},_listens:function(i,o,u){if(!this._events)return!1;var p=this._events[i]||[];if(!o)return!!p.length;u===this&&(u=void 0);for(var M=0,C=p.length;M<C;M++)if(p[M].fn===o&&p[M].ctx===u)return M;return!1},once:function(i,o,u){if(typeof i=="object")for(var p in i)this._on(p,i[p],o,!0);else{i=x(i);for(var M=0,C=i.length;M<C;M++)this._on(i[M],o,u,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[h(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[h(i)],this},_propagateEvent:function(i){for(var o in this._eventParents)this._eventParents[o].fire(i.type,r({layer:i.target,propagatedFrom:i.target},i),!0)}};K.addEventListener=K.on,K.removeEventListener=K.clearAllEventListeners=K.off,K.addOneTimeEventListener=K.once,K.fireEvent=K.fire,K.hasEventListeners=K.listens;var Mt=X.extend(K);function Z(i,o,u){this.x=u?Math.round(i):i,this.y=u?Math.round(o):o}var vt=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};Z.prototype={clone:function(){return new Z(this.x,this.y)},add:function(i){return this.clone()._add(G(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(G(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new Z(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new Z(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=vt(this.x),this.y=vt(this.y),this},distanceTo:function(i){i=G(i);var o=i.x-this.x,u=i.y-this.y;return Math.sqrt(o*o+u*u)},equals:function(i){return i=G(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=G(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+g(this.x)+", "+g(this.y)+")"}};function G(i,o,u){return i instanceof Z?i:b(i)?new Z(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new Z(i.x,i.y):new Z(i,o,u)}function nt(i,o){if(i)for(var u=o?[i,o]:i,p=0,M=u.length;p<M;p++)this.extend(u[p])}nt.prototype={extend:function(i){var o,u;if(!i)return this;if(i instanceof Z||typeof i[0]=="number"||"x"in i)o=u=G(i);else if(i=J(i),o=i.min,u=i.max,!o||!u)return this;return!this.min&&!this.max?(this.min=o.clone(),this.max=u.clone()):(this.min.x=Math.min(o.x,this.min.x),this.max.x=Math.max(u.x,this.max.x),this.min.y=Math.min(o.y,this.min.y),this.max.y=Math.max(u.y,this.max.y)),this},getCenter:function(i){return G((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return G(this.min.x,this.max.y)},getTopRight:function(){return G(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var o,u;return typeof i[0]=="number"||i instanceof Z?i=G(i):i=J(i),i instanceof nt?(o=i.min,u=i.max):o=u=i,o.x>=this.min.x&&u.x<=this.max.x&&o.y>=this.min.y&&u.y<=this.max.y},intersects:function(i){i=J(i);var o=this.min,u=this.max,p=i.min,M=i.max,C=M.x>=o.x&&p.x<=u.x,z=M.y>=o.y&&p.y<=u.y;return C&&z},overlaps:function(i){i=J(i);var o=this.min,u=this.max,p=i.min,M=i.max,C=M.x>o.x&&p.x<u.x,z=M.y>o.y&&p.y<u.y;return C&&z},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var o=this.min,u=this.max,p=Math.abs(o.x-u.x)*i,M=Math.abs(o.y-u.y)*i;return J(G(o.x-p,o.y-M),G(u.x+p,u.y+M))},equals:function(i){return i?(i=J(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function J(i,o){return!i||i instanceof nt?i:new nt(i,o)}function at(i,o){if(i)for(var u=o?[i,o]:i,p=0,M=u.length;p<M;p++)this.extend(u[p])}at.prototype={extend:function(i){var o=this._southWest,u=this._northEast,p,M;if(i instanceof Y)p=i,M=i;else if(i instanceof at){if(p=i._southWest,M=i._northEast,!p||!M)return this}else return i?this.extend(dt(i)||V(i)):this;return!o&&!u?(this._southWest=new Y(p.lat,p.lng),this._northEast=new Y(M.lat,M.lng)):(o.lat=Math.min(p.lat,o.lat),o.lng=Math.min(p.lng,o.lng),u.lat=Math.max(M.lat,u.lat),u.lng=Math.max(M.lng,u.lng)),this},pad:function(i){var o=this._southWest,u=this._northEast,p=Math.abs(o.lat-u.lat)*i,M=Math.abs(o.lng-u.lng)*i;return new at(new Y(o.lat-p,o.lng-M),new Y(u.lat+p,u.lng+M))},getCenter:function(){return new Y((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new Y(this.getNorth(),this.getWest())},getSouthEast:function(){return new Y(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof Y||"lat"in i?i=dt(i):i=V(i);var o=this._southWest,u=this._northEast,p,M;return i instanceof at?(p=i.getSouthWest(),M=i.getNorthEast()):p=M=i,p.lat>=o.lat&&M.lat<=u.lat&&p.lng>=o.lng&&M.lng<=u.lng},intersects:function(i){i=V(i);var o=this._southWest,u=this._northEast,p=i.getSouthWest(),M=i.getNorthEast(),C=M.lat>=o.lat&&p.lat<=u.lat,z=M.lng>=o.lng&&p.lng<=u.lng;return C&&z},overlaps:function(i){i=V(i);var o=this._southWest,u=this._northEast,p=i.getSouthWest(),M=i.getNorthEast(),C=M.lat>o.lat&&p.lat<u.lat,z=M.lng>o.lng&&p.lng<u.lng;return C&&z},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,o){return i?(i=V(i),this._southWest.equals(i.getSouthWest(),o)&&this._northEast.equals(i.getNorthEast(),o)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function V(i,o){return i instanceof at?i:new at(i,o)}function Y(i,o,u){if(isNaN(i)||isNaN(o))throw new Error("Invalid LatLng object: ("+i+", "+o+")");this.lat=+i,this.lng=+o,u!==void 0&&(this.alt=+u)}Y.prototype={equals:function(i,o){if(!i)return!1;i=dt(i);var u=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return u<=(o===void 0?1e-9:o)},toString:function(i){return"LatLng("+g(this.lat,i)+", "+g(this.lng,i)+")"},distanceTo:function(i){return wt.distance(this,dt(i))},wrap:function(){return wt.wrapLatLng(this)},toBounds:function(i){var o=180*i/40075017,u=o/Math.cos(Math.PI/180*this.lat);return V([this.lat-o,this.lng-u],[this.lat+o,this.lng+u])},clone:function(){return new Y(this.lat,this.lng,this.alt)}};function dt(i,o,u){return i instanceof Y?i:b(i)&&typeof i[0]!="object"?i.length===3?new Y(i[0],i[1],i[2]):i.length===2?new Y(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new Y(i.lat,"lng"in i?i.lng:i.lon,i.alt):o===void 0?null:new Y(i,o,u)}var gt={latLngToPoint:function(i,o){var u=this.projection.project(i),p=this.scale(o);return this.transformation._transform(u,p)},pointToLatLng:function(i,o){var u=this.scale(o),p=this.transformation.untransform(i,u);return this.projection.unproject(p)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var o=this.projection.bounds,u=this.scale(i),p=this.transformation.transform(o.min,u),M=this.transformation.transform(o.max,u);return new nt(p,M)},infinite:!1,wrapLatLng:function(i){var o=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,u=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,p=i.alt;return new Y(u,o,p)},wrapLatLngBounds:function(i){var o=i.getCenter(),u=this.wrapLatLng(o),p=o.lat-u.lat,M=o.lng-u.lng;if(p===0&&M===0)return i;var C=i.getSouthWest(),z=i.getNorthEast(),Q=new Y(C.lat-p,C.lng-M),ht=new Y(z.lat-p,z.lng-M);return new at(Q,ht)}},wt=r({},gt,{wrapLng:[-180,180],R:6371e3,distance:function(i,o){var u=Math.PI/180,p=i.lat*u,M=o.lat*u,C=Math.sin((o.lat-i.lat)*u/2),z=Math.sin((o.lng-i.lng)*u/2),Q=C*C+Math.cos(p)*Math.cos(M)*z*z,ht=2*Math.atan2(Math.sqrt(Q),Math.sqrt(1-Q));return this.R*ht}}),Tt=6378137,Pt={R:Tt,MAX_LATITUDE:85.0511287798,project:function(i){var o=Math.PI/180,u=this.MAX_LATITUDE,p=Math.max(Math.min(u,i.lat),-u),M=Math.sin(p*o);return new Z(this.R*i.lng*o,this.R*Math.log((1+M)/(1-M))/2)},unproject:function(i){var o=180/Math.PI;return new Y((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*o,i.x*o/this.R)},bounds:function(){var i=Tt*Math.PI;return new nt([-i,-i],[i,i])}()};function $(i,o,u,p){if(b(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=o,this._c=u,this._d=p}$.prototype={transform:function(i,o){return this._transform(i.clone(),o)},_transform:function(i,o){return o=o||1,i.x=o*(this._a*i.x+this._b),i.y=o*(this._c*i.y+this._d),i},untransform:function(i,o){return o=o||1,new Z((i.x/o-this._b)/this._a,(i.y/o-this._d)/this._c)}};function st(i,o,u,p){return new $(i,o,u,p)}var tt=r({},wt,{code:"EPSG:3857",projection:Pt,transformation:function(){var i=.5/(Math.PI*Pt.R);return st(i,.5,-i,.5)}()}),ot=r({},tt,{code:"EPSG:900913"});function rt(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function mt(i,o){var u="",p,M,C,z,Q,ht;for(p=0,C=i.length;p<C;p++){for(Q=i[p],M=0,z=Q.length;M<z;M++)ht=Q[M],u+=(M?"L":"M")+ht.x+" "+ht.y;u+=o?Gt.svg?"z":"x":""}return u||"M0 0"}var D=document.documentElement.style,T="ActiveXObject"in window,W=T&&!document.addEventListener,it="msLaunchUri"in navigator&&!("documentMode"in document),ct=$e("webkit"),_t=$e("android"),Ot=$e("android 2")||$e("android 3"),yt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),At=_t&&$e("Google")&&yt<537&&!("AudioNode"in window),It=!!window.opera,St=!it&&$e("chrome"),Ct=$e("gecko")&&!ct&&!It&&!T,Xt=!St&&$e("safari"),Nt=$e("phantom"),Ut="OTransition"in D,jt=navigator.platform.indexOf("Win")===0,zt=T&&"transition"in D,ee="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!Ot,ue="MozPerspective"in D,ge=!window.L_DISABLE_3D&&(zt||ee||ue)&&!Ut&&!Nt,Ht=typeof orientation<"u"||$e("mobile"),S=Ht&&ct,lt=Ht&&ee,xt=!window.PointerEvent&&window.MSPointerEvent,Lt=!!(window.PointerEvent||xt),Ft="ontouchstart"in window||!!window.TouchEvent,pe=!window.L_NO_TOUCH&&(Ft||Lt),he=Ht&&It,be=Ht&&Ct,He=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,ye=function(){var i=!1;try{var o=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",m,o),window.removeEventListener("testPassiveEventSupport",m,o)}catch{}return i}(),Oe=function(){return!!document.createElement("canvas").getContext}(),Pe=!!(document.createElementNS&&rt("svg").createSVGRect),fn=!!Pe&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),Mn=!Pe&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var o=i.firstChild;return o.style.behavior="url(#default#VML)",o&&typeof o.adj=="object"}catch{return!1}}(),ri=navigator.platform.indexOf("Mac")===0,Fi=navigator.platform.indexOf("Linux")===0;function $e(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Gt={ie:T,ielt9:W,edge:it,webkit:ct,android:_t,android23:Ot,androidStock:At,opera:It,chrome:St,gecko:Ct,safari:Xt,phantom:Nt,opera12:Ut,win:jt,ie3d:zt,webkit3d:ee,gecko3d:ue,any3d:ge,mobile:Ht,mobileWebkit:S,mobileWebkit3d:lt,msPointer:xt,pointer:Lt,touch:pe,touchNative:Ft,mobileOpera:he,mobileGecko:be,retina:He,passiveEvents:ye,canvas:Oe,svg:Pe,vml:Mn,inlineSvg:fn,mac:ri,linux:Fi},rs=Gt.msPointer?"MSPointerDown":"pointerdown",kr=Gt.msPointer?"MSPointerMove":"pointermove",Fr=Gt.msPointer?"MSPointerUp":"pointerup",Do=Gt.msPointer?"MSPointerCancel":"pointercancel",Br={touchstart:rs,touchmove:kr,touchend:Fr,touchcancel:Do},No={touchstart:se,touchmove:Yt,touchend:Yt,touchcancel:Yt},O={},j=!1;function ft(i,o,u){return o==="touchstart"&&$t(),No[o]?(u=No[o].bind(this,u),i.addEventListener(Br[o],u,!1),u):(console.warn("wrong event specified:",o),m)}function pt(i,o,u){if(!Br[o]){console.warn("wrong event specified:",o);return}i.removeEventListener(Br[o],u,!1)}function ut(i){O[i.pointerId]=i}function Dt(i){O[i.pointerId]&&(O[i.pointerId]=i)}function Wt(i){delete O[i.pointerId]}function $t(){j||(document.addEventListener(rs,ut,!0),document.addEventListener(kr,Dt,!0),document.addEventListener(Fr,Wt,!0),document.addEventListener(Do,Wt,!0),j=!0)}function Yt(i,o){if(o.pointerType!==(o.MSPOINTER_TYPE_MOUSE||"mouse")){o.touches=[];for(var u in O)o.touches.push(O[u]);o.changedTouches=[o],i(o)}}function se(i,o){o.MSPOINTER_TYPE_TOUCH&&o.pointerType===o.MSPOINTER_TYPE_TOUCH&&nn(o),Yt(i,o)}function ie(i){var o={},u,p;for(p in i)u=i[p],o[p]=u&&u.bind?u.bind(i):u;return i=o,o.type="dblclick",o.detail=2,o.isTrusted=!1,o._simulated=!0,o}var re=200;function Re(i,o){i.addEventListener("dblclick",o);var u=0,p;function M(C){if(C.detail!==1){p=C.detail;return}if(!(C.pointerType==="mouse"||C.sourceCapabilities&&!C.sourceCapabilities.firesTouchEvents)){var z=hu(C);if(!(z.some(function(ht){return ht instanceof HTMLLabelElement&&ht.attributes.for})&&!z.some(function(ht){return ht instanceof HTMLInputElement||ht instanceof HTMLSelectElement}))){var Q=Date.now();Q-u<=re?(p++,p===2&&o(ie(C))):p=1,u=Q}}}return i.addEventListener("click",M),{dblclick:o,simDblclick:M}}function pn(i,o){i.removeEventListener("dblclick",o.dblclick),i.removeEventListener("click",o.simDblclick)}var Ue=Uo(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),mn=Uo(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),we=mn==="webkitTransition"||mn==="OTransition"?mn+"End":"transitionend";function oe(i){return typeof i=="string"?document.getElementById(i):i}function Mi(i,o){var u=i.style[o]||i.currentStyle&&i.currentStyle[o];if((!u||u==="auto")&&document.defaultView){var p=document.defaultView.getComputedStyle(i,null);u=p?p[o]:null}return u==="auto"?null:u}function Zt(i,o,u){var p=document.createElement(i);return p.className=o||"",u&&u.appendChild(p),p}function _e(i){var o=i.parentNode;o&&o.removeChild(i)}function os(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Un(i){var o=i.parentNode;o&&o.lastChild!==i&&o.appendChild(i)}function oi(i){var o=i.parentNode;o&&o.firstChild!==i&&o.insertBefore(i,o.firstChild)}function Ve(i,o){if(i.classList!==void 0)return i.classList.contains(o);var u=Bi(i);return u.length>0&&new RegExp("(^|\\s)"+o+"(\\s|$)").test(u)}function Kt(i,o){if(i.classList!==void 0)for(var u=x(o),p=0,M=u.length;p<M;p++)i.classList.add(u[p]);else if(!Ve(i,o)){var C=Bi(i);ln(i,(C?C+" ":"")+o)}}function Ee(i,o){i.classList!==void 0?i.classList.remove(o):ln(i,_((" "+Bi(i)+" ").replace(" "+o+" "," ")))}function ln(i,o){i.className.baseVal===void 0?i.className=o:i.className.baseVal=o}function Bi(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function bn(i,o){"opacity"in i.style?i.style.opacity=o:"filter"in i.style&&Oo(i,o)}function Oo(i,o){var u=!1,p="DXImageTransform.Microsoft.Alpha";try{u=i.filters.item(p)}catch{if(o===1)return}o=Math.round(o*100),u?(u.Enabled=o!==100,u.Opacity=o):i.style.filter+=" progid:"+p+"(opacity="+o+")"}function Uo(i){for(var o=document.documentElement.style,u=0;u<i.length;u++)if(i[u]in o)return i[u];return!1}function as(i,o,u){var p=o||new Z(0,0);i.style[Ue]=(Gt.ie3d?"translate("+p.x+"px,"+p.y+"px)":"translate3d("+p.x+"px,"+p.y+"px,0)")+(u?" scale("+u+")":"")}function Ge(i,o){i._leaflet_pos=o,Gt.any3d?as(i,o):(i.style.left=o.x+"px",i.style.top=o.y+"px")}function ls(i){return i._leaflet_pos||new Z(0,0)}var zr,Hr,ul;if("onselectstart"in document)zr=function(){ae(window,"selectstart",nn)},Hr=function(){Se(window,"selectstart",nn)};else{var Vr=Uo(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);zr=function(){if(Vr){var i=document.documentElement.style;ul=i[Vr],i[Vr]="none"}},Hr=function(){Vr&&(document.documentElement.style[Vr]=ul,ul=void 0)}}function hl(){ae(window,"dragstart",nn)}function dl(){Se(window,"dragstart",nn)}var ko,fl;function pl(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(Fo(),ko=i,fl=i.style.outlineStyle,i.style.outlineStyle="none",ae(window,"keydown",Fo))}function Fo(){ko&&(ko.style.outlineStyle=fl,ko=void 0,fl=void 0,Se(window,"keydown",Fo))}function cu(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function ml(i){var o=i.getBoundingClientRect();return{x:o.width/i.offsetWidth||1,y:o.height/i.offsetHeight||1,boundingClientRect:o}}var Tp={__proto__:null,TRANSFORM:Ue,TRANSITION:mn,TRANSITION_END:we,get:oe,getStyle:Mi,create:Zt,remove:_e,empty:os,toFront:Un,toBack:oi,hasClass:Ve,addClass:Kt,removeClass:Ee,setClass:ln,getClass:Bi,setOpacity:bn,testProp:Uo,setTransform:as,setPosition:Ge,getPosition:ls,get disableTextSelection(){return zr},get enableTextSelection(){return Hr},disableImageDrag:hl,enableImageDrag:dl,preventOutline:pl,restoreOutline:Fo,getSizedParentNode:cu,getScale:ml};function ae(i,o,u,p){if(o&&typeof o=="object")for(var M in o)_l(i,M,o[M],u);else{o=x(o);for(var C=0,z=o.length;C<z;C++)_l(i,o[C],u,p)}return this}var ai="_leaflet_events";function Se(i,o,u,p){if(arguments.length===1)uu(i),delete i[ai];else if(o&&typeof o=="object")for(var M in o)vl(i,M,o[M],u);else if(o=x(o),arguments.length===2)uu(i,function(Q){return A(o,Q)!==-1});else for(var C=0,z=o.length;C<z;C++)vl(i,o[C],u,p);return this}function uu(i,o){for(var u in i[ai]){var p=u.split(/\d/)[0];(!o||o(p))&&vl(i,p,null,null,u)}}var gl={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function _l(i,o,u,p){var M=o+h(u)+(p?"_"+h(p):"");if(i[ai]&&i[ai][M])return this;var C=function(Q){return u.call(p||i,Q||window.event)},z=C;!Gt.touchNative&&Gt.pointer&&o.indexOf("touch")===0?C=ft(i,o,C):Gt.touch&&o==="dblclick"?C=Re(i,C):"addEventListener"in i?o==="touchstart"||o==="touchmove"||o==="wheel"||o==="mousewheel"?i.addEventListener(gl[o]||o,C,Gt.passiveEvents?{passive:!1}:!1):o==="mouseenter"||o==="mouseleave"?(C=function(Q){Q=Q||window.event,xl(i,Q)&&z(Q)},i.addEventListener(gl[o],C,!1)):i.addEventListener(o,z,!1):i.attachEvent("on"+o,C),i[ai]=i[ai]||{},i[ai][M]=C}function vl(i,o,u,p,M){M=M||o+h(u)+(p?"_"+h(p):"");var C=i[ai]&&i[ai][M];if(!C)return this;!Gt.touchNative&&Gt.pointer&&o.indexOf("touch")===0?pt(i,o,C):Gt.touch&&o==="dblclick"?pn(i,C):"removeEventListener"in i?i.removeEventListener(gl[o]||o,C,!1):i.detachEvent("on"+o,C),i[ai][M]=null}function cs(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function yl(i){return _l(i,"wheel",cs),this}function Gr(i){return ae(i,"mousedown touchstart dblclick contextmenu",cs),i._leaflet_disable_click=!0,this}function nn(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function us(i){return nn(i),cs(i),this}function hu(i){if(i.composedPath)return i.composedPath();for(var o=[],u=i.target;u;)o.push(u),u=u.parentNode;return o}function du(i,o){if(!o)return new Z(i.clientX,i.clientY);var u=ml(o),p=u.boundingClientRect;return new Z((i.clientX-p.left)/u.x-o.clientLeft,(i.clientY-p.top)/u.y-o.clientTop)}var Ap=Gt.linux&&Gt.chrome?window.devicePixelRatio:Gt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function fu(i){return Gt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/Ap:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function xl(i,o){var u=o.relatedTarget;if(!u)return!0;try{for(;u&&u!==i;)u=u.parentNode}catch{return!1}return u!==i}var Lp={__proto__:null,on:ae,off:Se,stopPropagation:cs,disableScrollPropagation:yl,disableClickPropagation:Gr,preventDefault:nn,stop:us,getPropagationPath:hu,getMousePosition:du,getWheelDelta:fu,isExternalTarget:xl,addListener:ae,removeListener:Se},pu=Mt.extend({run:function(i,o,u,p){this.stop(),this._el=i,this._inProgress=!0,this._duration=u||.25,this._easeOutPower=1/Math.max(p||.5,.2),this._startPos=ls(i),this._offset=o.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=B(this._animate,this),this._step()},_step:function(i){var o=+new Date-this._startTime,u=this._duration*1e3;o<u?this._runFrame(this._easeOut(o/u),i):(this._runFrame(1),this._complete())},_runFrame:function(i,o){var u=this._startPos.add(this._offset.multiplyBy(i));o&&u._round(),Ge(this._el,u),this.fire("step")},_complete:function(){q(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),me=Mt.extend({options:{crs:tt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,o){o=w(this,o),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),o.maxBounds&&this.setMaxBounds(o.maxBounds),o.zoom!==void 0&&(this._zoom=this._limitZoom(o.zoom)),o.center&&o.zoom!==void 0&&this.setView(dt(o.center),o.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=mn&&Gt.any3d&&!Gt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),ae(this._proxy,we,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,o,u){if(o=o===void 0?this._zoom:this._limitZoom(o),i=this._limitCenter(dt(i),o,this.options.maxBounds),u=u||{},this._stop(),this._loaded&&!u.reset&&u!==!0){u.animate!==void 0&&(u.zoom=r({animate:u.animate},u.zoom),u.pan=r({animate:u.animate,duration:u.duration},u.pan));var p=this._zoom!==o?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,o,u.zoom):this._tryAnimatedPan(i,u.pan);if(p)return clearTimeout(this._sizeTimer),this}return this._resetView(i,o,u.pan&&u.pan.noMoveStart),this},setZoom:function(i,o){return this._loaded?this.setView(this.getCenter(),i,{zoom:o}):(this._zoom=i,this)},zoomIn:function(i,o){return i=i||(Gt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,o)},zoomOut:function(i,o){return i=i||(Gt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,o)},setZoomAround:function(i,o,u){var p=this.getZoomScale(o),M=this.getSize().divideBy(2),C=i instanceof Z?i:this.latLngToContainerPoint(i),z=C.subtract(M).multiplyBy(1-1/p),Q=this.containerPointToLatLng(M.add(z));return this.setView(Q,o,{zoom:u})},_getBoundsCenterZoom:function(i,o){o=o||{},i=i.getBounds?i.getBounds():V(i);var u=G(o.paddingTopLeft||o.padding||[0,0]),p=G(o.paddingBottomRight||o.padding||[0,0]),M=this.getBoundsZoom(i,!1,u.add(p));if(M=typeof o.maxZoom=="number"?Math.min(o.maxZoom,M):M,M===1/0)return{center:i.getCenter(),zoom:M};var C=p.subtract(u).divideBy(2),z=this.project(i.getSouthWest(),M),Q=this.project(i.getNorthEast(),M),ht=this.unproject(z.add(Q).divideBy(2).add(C),M);return{center:ht,zoom:M}},fitBounds:function(i,o){if(i=V(i),!i.isValid())throw new Error("Bounds are not valid.");var u=this._getBoundsCenterZoom(i,o);return this.setView(u.center,u.zoom,o)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,o){return this.setView(i,this._zoom,{pan:o})},panBy:function(i,o){if(i=G(i).round(),o=o||{},!i.x&&!i.y)return this.fire("moveend");if(o.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new pu,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),o.noMoveStart||this.fire("movestart"),o.animate!==!1){Kt(this._mapPane,"leaflet-pan-anim");var u=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,u,o.duration||.25,o.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,o,u){if(u=u||{},u.animate===!1||!Gt.any3d)return this.setView(i,o,u);this._stop();var p=this.project(this.getCenter()),M=this.project(i),C=this.getSize(),z=this._zoom;i=dt(i),o=o===void 0?z:o;var Q=Math.max(C.x,C.y),ht=Q*this.getZoomScale(z,o),bt=M.distanceTo(p)||1,kt=1.42,Jt=kt*kt;function de(We){var jo=We?-1:1,gm=We?ht:Q,_m=ht*ht-Q*Q+jo*Jt*Jt*bt*bt,vm=2*gm*Jt*bt,Rl=_m/vm,$u=Math.sqrt(Rl*Rl+1)-Rl,ym=$u<1e-9?-18:Math.log($u);return ym}function gn(We){return(Math.exp(We)-Math.exp(-We))/2}function Ye(We){return(Math.exp(We)+Math.exp(-We))/2}function Fn(We){return gn(We)/Ye(We)}var wn=de(0);function ks(We){return Q*(Ye(wn)/Ye(wn+kt*We))}function dm(We){return Q*(Ye(wn)*Fn(wn+kt*We)-gn(wn))/Jt}function fm(We){return 1-Math.pow(1-We,1.5)}var pm=Date.now(),Xu=(de(1)-wn)/kt,mm=u.duration?1e3*u.duration:1e3*Xu*.8;function qu(){var We=(Date.now()-pm)/mm,jo=fm(We)*Xu;We<=1?(this._flyToFrame=B(qu,this),this._move(this.unproject(p.add(M.subtract(p).multiplyBy(dm(jo)/bt)),z),this.getScaleZoom(Q/ks(jo),z),{flyTo:!0})):this._move(i,o)._moveEnd(!0)}return this._moveStart(!0,u.noMoveStart),qu.call(this),this},flyToBounds:function(i,o){var u=this._getBoundsCenterZoom(i,o);return this.flyTo(u.center,u.zoom,o)},setMaxBounds:function(i){return i=V(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var o=this.options.minZoom;return this.options.minZoom=i,this._loaded&&o!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var o=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&o!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,o){this._enforcingBounds=!0;var u=this.getCenter(),p=this._limitCenter(u,this._zoom,V(i));return u.equals(p)||this.panTo(p,o),this._enforcingBounds=!1,this},panInside:function(i,o){o=o||{};var u=G(o.paddingTopLeft||o.padding||[0,0]),p=G(o.paddingBottomRight||o.padding||[0,0]),M=this.project(this.getCenter()),C=this.project(i),z=this.getPixelBounds(),Q=J([z.min.add(u),z.max.subtract(p)]),ht=Q.getSize();if(!Q.contains(C)){this._enforcingBounds=!0;var bt=C.subtract(Q.getCenter()),kt=Q.extend(C).getSize().subtract(ht);M.x+=bt.x<0?-kt.x:kt.x,M.y+=bt.y<0?-kt.y:kt.y,this.panTo(this.unproject(M),o),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=r({animate:!1,pan:!0},i===!0?{animate:!0}:i);var o=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var u=this.getSize(),p=o.divideBy(2).round(),M=u.divideBy(2).round(),C=p.subtract(M);return!C.x&&!C.y?this:(i.animate&&i.pan?this.panBy(C):(i.pan&&this._rawPanBy(C),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:o,newSize:u}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=r({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var o=l(this._handleGeolocationResponse,this),u=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(o,u,i):navigator.geolocation.getCurrentPosition(o,u,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var o=i.code,u=i.message||(o===1?"permission denied":o===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:o,message:"Geolocation error: "+u+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var o=i.coords.latitude,u=i.coords.longitude,p=new Y(o,u),M=p.toBounds(i.coords.accuracy*2),C=this._locateOptions;if(C.setView){var z=this.getBoundsZoom(M);this.setView(p,C.maxZoom?Math.min(z,C.maxZoom):z)}var Q={latlng:p,bounds:M,timestamp:i.timestamp};for(var ht in i.coords)typeof i.coords[ht]=="number"&&(Q[ht]=i.coords[ht]);this.fire("locationfound",Q)}},addHandler:function(i,o){if(!o)return this;var u=this[i]=new o(this);return this._handlers.push(u),this.options[i]&&u.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),_e(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(q(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)_e(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,o){var u="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),p=Zt("div",u,o||this._mapPane);return i&&(this._panes[i]=p),p},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),o=this.unproject(i.getBottomLeft()),u=this.unproject(i.getTopRight());return new at(o,u)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,o,u){i=V(i),u=G(u||[0,0]);var p=this.getZoom()||0,M=this.getMinZoom(),C=this.getMaxZoom(),z=i.getNorthWest(),Q=i.getSouthEast(),ht=this.getSize().subtract(u),bt=J(this.project(Q,p),this.project(z,p)).getSize(),kt=Gt.any3d?this.options.zoomSnap:1,Jt=ht.x/bt.x,de=ht.y/bt.y,gn=o?Math.max(Jt,de):Math.min(Jt,de);return p=this.getScaleZoom(gn,p),kt&&(p=Math.round(p/(kt/100))*(kt/100),p=o?Math.ceil(p/kt)*kt:Math.floor(p/kt)*kt),Math.max(M,Math.min(C,p))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new Z(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,o){var u=this._getTopLeftPoint(i,o);return new nt(u,u.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,o){var u=this.options.crs;return o=o===void 0?this._zoom:o,u.scale(i)/u.scale(o)},getScaleZoom:function(i,o){var u=this.options.crs;o=o===void 0?this._zoom:o;var p=u.zoom(i*u.scale(o));return isNaN(p)?1/0:p},project:function(i,o){return o=o===void 0?this._zoom:o,this.options.crs.latLngToPoint(dt(i),o)},unproject:function(i,o){return o=o===void 0?this._zoom:o,this.options.crs.pointToLatLng(G(i),o)},layerPointToLatLng:function(i){var o=G(i).add(this.getPixelOrigin());return this.unproject(o)},latLngToLayerPoint:function(i){var o=this.project(dt(i))._round();return o._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(dt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(V(i))},distance:function(i,o){return this.options.crs.distance(dt(i),dt(o))},containerPointToLayerPoint:function(i){return G(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return G(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var o=this.containerPointToLayerPoint(G(i));return this.layerPointToLatLng(o)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(dt(i)))},mouseEventToContainerPoint:function(i){return du(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var o=this._container=oe(i);if(o){if(o._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");ae(o,"scroll",this._onScroll,this),this._containerId=h(o)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Gt.any3d,Kt(i,"leaflet-container"+(Gt.touch?" leaflet-touch":"")+(Gt.retina?" leaflet-retina":"")+(Gt.ielt9?" leaflet-oldie":"")+(Gt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var o=Mi(i,"position");o!=="absolute"&&o!=="relative"&&o!=="fixed"&&o!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Ge(this._mapPane,new Z(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Kt(i.markerPane,"leaflet-zoom-hide"),Kt(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,o,u){Ge(this._mapPane,new Z(0,0));var p=!this._loaded;this._loaded=!0,o=this._limitZoom(o),this.fire("viewprereset");var M=this._zoom!==o;this._moveStart(M,u)._move(i,o)._moveEnd(M),this.fire("viewreset"),p&&this.fire("load")},_moveStart:function(i,o){return i&&this.fire("zoomstart"),o||this.fire("movestart"),this},_move:function(i,o,u,p){o===void 0&&(o=this._zoom);var M=this._zoom!==o;return this._zoom=o,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),p?u&&u.pinch&&this.fire("zoom",u):((M||u&&u.pinch)&&this.fire("zoom",u),this.fire("move",u)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return q(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){Ge(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[h(this._container)]=this;var o=i?Se:ae;o(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&o(window,"resize",this._onResize,this),Gt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){q(this._resizeRequest),this._resizeRequest=B(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,o){for(var u=[],p,M=o==="mouseout"||o==="mouseover",C=i.target||i.srcElement,z=!1;C;){if(p=this._targets[h(C)],p&&(o==="click"||o==="preclick")&&this._draggableMoved(p)){z=!0;break}if(p&&p.listens(o,!0)&&(M&&!xl(C,i)||(u.push(p),M))||C===this._container)break;C=C.parentNode}return!u.length&&!z&&!M&&this.listens(o,!0)&&(u=[this]),u},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var o=i.target||i.srcElement;if(!(!this._loaded||o._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(o))){var u=i.type;u==="mousedown"&&pl(o),this._fireDOMEvent(i,u)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,o,u){if(i.type==="click"){var p=r({},i);p.type="preclick",this._fireDOMEvent(p,p.type,u)}var M=this._findEventTargets(i,o);if(u){for(var C=[],z=0;z<u.length;z++)u[z].listens(o,!0)&&C.push(u[z]);M=C.concat(M)}if(M.length){o==="contextmenu"&&nn(i);var Q=M[0],ht={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var bt=Q.getLatLng&&(!Q._radius||Q._radius<=10);ht.containerPoint=bt?this.latLngToContainerPoint(Q.getLatLng()):this.mouseEventToContainerPoint(i),ht.layerPoint=this.containerPointToLayerPoint(ht.containerPoint),ht.latlng=bt?Q.getLatLng():this.layerPointToLatLng(ht.layerPoint)}for(z=0;z<M.length;z++)if(M[z].fire(o,ht,!0),ht.originalEvent._stopped||M[z].options.bubblingMouseEvents===!1&&A(this._mouseEvents,o)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,o=this._handlers.length;i<o;i++)this._handlers[i].disable()},whenReady:function(i,o){return this._loaded?i.call(o||this,{target:this}):this.on("load",i,o),this},_getMapPanePos:function(){return ls(this._mapPane)||new Z(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,o){var u=i&&o!==void 0?this._getNewPixelOrigin(i,o):this.getPixelOrigin();return u.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,o){var u=this.getSize()._divideBy(2);return this.project(i,o)._subtract(u)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,o,u){var p=this._getNewPixelOrigin(u,o);return this.project(i,o)._subtract(p)},_latLngBoundsToNewLayerBounds:function(i,o,u){var p=this._getNewPixelOrigin(u,o);return J([this.project(i.getSouthWest(),o)._subtract(p),this.project(i.getNorthWest(),o)._subtract(p),this.project(i.getSouthEast(),o)._subtract(p),this.project(i.getNorthEast(),o)._subtract(p)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,o,u){if(!u)return i;var p=this.project(i,o),M=this.getSize().divideBy(2),C=new nt(p.subtract(M),p.add(M)),z=this._getBoundsOffset(C,u,o);return Math.abs(z.x)<=1&&Math.abs(z.y)<=1?i:this.unproject(p.add(z),o)},_limitOffset:function(i,o){if(!o)return i;var u=this.getPixelBounds(),p=new nt(u.min.add(i),u.max.add(i));return i.add(this._getBoundsOffset(p,o))},_getBoundsOffset:function(i,o,u){var p=J(this.project(o.getNorthEast(),u),this.project(o.getSouthWest(),u)),M=p.min.subtract(i.min),C=p.max.subtract(i.max),z=this._rebound(M.x,-C.x),Q=this._rebound(M.y,-C.y);return new Z(z,Q)},_rebound:function(i,o){return i+o>0?Math.round(i-o)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(o))},_limitZoom:function(i){var o=this.getMinZoom(),u=this.getMaxZoom(),p=Gt.any3d?this.options.zoomSnap:1;return p&&(i=Math.round(i/p)*p),Math.max(o,Math.min(u,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Ee(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,o){var u=this._getCenterOffset(i)._trunc();return(o&&o.animate)!==!0&&!this.getSize().contains(u)?!1:(this.panBy(u,o),!0)},_createAnimProxy:function(){var i=this._proxy=Zt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(o){var u=Ue,p=this._proxy.style[u];as(this._proxy,this.project(o.center,o.zoom),this.getZoomScale(o.zoom,1)),p===this._proxy.style[u]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){_e(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),o=this.getZoom();as(this._proxy,this.project(i,o),this.getZoomScale(o,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,o,u){if(this._animatingZoom)return!0;if(u=u||{},!this._zoomAnimated||u.animate===!1||this._nothingToAnimate()||Math.abs(o-this._zoom)>this.options.zoomAnimationThreshold)return!1;var p=this.getZoomScale(o),M=this._getCenterOffset(i)._divideBy(1-1/p);return u.animate!==!0&&!this.getSize().contains(M)?!1:(B(function(){this._moveStart(!0,u.noMoveStart||!1)._animateZoom(i,o,!0)},this),!0)},_animateZoom:function(i,o,u,p){this._mapPane&&(u&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=o,Kt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:o,noUpdate:p}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Ee(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Pp(i,o){return new me(i,o)}var qn=X.extend({options:{position:"topright"},initialize:function(i){w(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var o=this._map;return o&&o.removeControl(this),this.options.position=i,o&&o.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var o=this._container=this.onAdd(i),u=this.getPosition(),p=i._controlCorners[u];return Kt(o,"leaflet-control"),u.indexOf("bottom")!==-1?p.insertBefore(o,p.firstChild):p.appendChild(o),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(_e(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),Wr=function(i){return new qn(i)};me.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},o="leaflet-",u=this._controlContainer=Zt("div",o+"control-container",this._container);function p(M,C){var z=o+M+" "+o+C;i[M+C]=Zt("div",z,u)}p("top","left"),p("top","right"),p("bottom","left"),p("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)_e(this._controlCorners[i]);_e(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var mu=qn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,o,u,p){return u<p?-1:p<u?1:0}},initialize:function(i,o,u){w(this,u),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var p in i)this._addLayer(i[p],p);for(p in o)this._addLayer(o[p],p,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var o=0;o<this._layers.length;o++)this._layers[o].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return qn.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,o){return this._addLayer(i,o),this._map?this._update():this},addOverlay:function(i,o){return this._addLayer(i,o,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var o=this._getLayer(h(i));return o&&this._layers.splice(this._layers.indexOf(o),1),this._map?this._update():this},expand:function(){Kt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?(Kt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):Ee(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Ee(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",o=this._container=Zt("div",i),u=this.options.collapsed;o.setAttribute("aria-haspopup",!0),Gr(o),yl(o);var p=this._section=Zt("section",i+"-list");u&&(this._map.on("click",this.collapse,this),ae(o,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var M=this._layersLink=Zt("a",i+"-toggle",o);M.href="#",M.title="Layers",M.setAttribute("role","button"),ae(M,{keydown:function(C){C.keyCode===13&&this._expandSafely()},click:function(C){nn(C),this._expandSafely()}},this),u||this.expand(),this._baseLayersList=Zt("div",i+"-base",p),this._separator=Zt("div",i+"-separator",p),this._overlaysList=Zt("div",i+"-overlays",p),o.appendChild(p)},_getLayer:function(i){for(var o=0;o<this._layers.length;o++)if(this._layers[o]&&h(this._layers[o].layer)===i)return this._layers[o]},_addLayer:function(i,o,u){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:o,overlay:u}),this.options.sortLayers&&this._layers.sort(l(function(p,M){return this.options.sortFunction(p.layer,M.layer,p.name,M.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;os(this._baseLayersList),os(this._overlaysList),this._layerControlInputs=[];var i,o,u,p,M=0;for(u=0;u<this._layers.length;u++)p=this._layers[u],this._addItem(p),o=o||p.overlay,i=i||!p.overlay,M+=p.overlay?0:1;return this.options.hideSingleBase&&(i=i&&M>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=o&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var o=this._getLayer(h(i.target)),u=o.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;u&&this._map.fire(u,o)},_createRadioElement:function(i,o){var u='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(o?' checked="checked"':"")+"/>",p=document.createElement("div");return p.innerHTML=u,p.firstChild},_addItem:function(i){var o=document.createElement("label"),u=this._map.hasLayer(i.layer),p;i.overlay?(p=document.createElement("input"),p.type="checkbox",p.className="leaflet-control-layers-selector",p.defaultChecked=u):p=this._createRadioElement("leaflet-base-layers_"+h(this),u),this._layerControlInputs.push(p),p.layerId=h(i.layer),ae(p,"click",this._onInputClick,this);var M=document.createElement("span");M.innerHTML=" "+i.name;var C=document.createElement("span");o.appendChild(C),C.appendChild(p),C.appendChild(M);var z=i.overlay?this._overlaysList:this._baseLayersList;return z.appendChild(o),this._checkDisabledLayers(),o},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,o,u,p=[],M=[];this._handlingClick=!0;for(var C=i.length-1;C>=0;C--)o=i[C],u=this._getLayer(o.layerId).layer,o.checked?p.push(u):o.checked||M.push(u);for(C=0;C<M.length;C++)this._map.hasLayer(M[C])&&this._map.removeLayer(M[C]);for(C=0;C<p.length;C++)this._map.hasLayer(p[C])||this._map.addLayer(p[C]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,o,u,p=this._map.getZoom(),M=i.length-1;M>=0;M--)o=i[M],u=this._getLayer(o.layerId).layer,o.disabled=u.options.minZoom!==void 0&&p<u.options.minZoom||u.options.maxZoom!==void 0&&p>u.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,ae(i,"click",nn),this.expand();var o=this;setTimeout(function(){Se(i,"click",nn),o._preventClick=!1})}}),Cp=function(i,o,u){return new mu(i,o,u)},Ml=qn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var o="leaflet-control-zoom",u=Zt("div",o+" leaflet-bar"),p=this.options;return this._zoomInButton=this._createButton(p.zoomInText,p.zoomInTitle,o+"-in",u,this._zoomIn),this._zoomOutButton=this._createButton(p.zoomOutText,p.zoomOutTitle,o+"-out",u,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),u},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,o,u,p,M){var C=Zt("a",u,p);return C.innerHTML=i,C.href="#",C.title=o,C.setAttribute("role","button"),C.setAttribute("aria-label",o),Gr(C),ae(C,"click",us),ae(C,"click",M,this),ae(C,"click",this._refocusOnMap,this),C},_updateDisabled:function(){var i=this._map,o="leaflet-disabled";Ee(this._zoomInButton,o),Ee(this._zoomOutButton,o),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&(Kt(this._zoomOutButton,o),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&(Kt(this._zoomInButton,o),this._zoomInButton.setAttribute("aria-disabled","true"))}});me.mergeOptions({zoomControl:!0}),me.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ml,this.addControl(this.zoomControl))});var Rp=function(i){return new Ml(i)},gu=qn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var o="leaflet-control-scale",u=Zt("div",o),p=this.options;return this._addScales(p,o+"-line",u),i.on(p.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),u},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,o,u){i.metric&&(this._mScale=Zt("div",o,u)),i.imperial&&(this._iScale=Zt("div",o,u))},_update:function(){var i=this._map,o=i.getSize().y/2,u=i.distance(i.containerPointToLatLng([0,o]),i.containerPointToLatLng([this.options.maxWidth,o]));this._updateScales(u)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var o=this._getRoundNum(i),u=o<1e3?o+" m":o/1e3+" km";this._updateScale(this._mScale,u,o/i)},_updateImperial:function(i){var o=i*3.2808399,u,p,M;o>5280?(u=o/5280,p=this._getRoundNum(u),this._updateScale(this._iScale,p+" mi",p/u)):(M=this._getRoundNum(o),this._updateScale(this._iScale,M+" ft",M/o))},_updateScale:function(i,o,u){i.style.width=Math.round(this.options.maxWidth*u)+"px",i.innerHTML=o},_getRoundNum:function(i){var o=Math.pow(10,(Math.floor(i)+"").length-1),u=i/o;return u=u>=10?10:u>=5?5:u>=3?3:u>=2?2:1,o*u}}),Ip=function(i){return new gu(i)},Dp='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',bl=qn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Gt.inlineSvg?Dp+" ":"")+"Leaflet</a>"},initialize:function(i){w(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Zt("div","leaflet-control-attribution"),Gr(this._container);for(var o in i._layers)i._layers[o].getAttribution&&this.addAttribution(i._layers[o].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var o in this._attributions)this._attributions[o]&&i.push(o);var u=[];this.options.prefix&&u.push(this.options.prefix),i.length&&u.push(i.join(", ")),this._container.innerHTML=u.join(' <span aria-hidden="true">|</span> ')}}});me.mergeOptions({attributionControl:!0}),me.addInitHook(function(){this.options.attributionControl&&new bl().addTo(this)});var Np=function(i){return new bl(i)};qn.Layers=mu,qn.Zoom=Ml,qn.Scale=gu,qn.Attribution=bl,Wr.layers=Cp,Wr.zoom=Rp,Wr.scale=Ip,Wr.attribution=Np;var li=X.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});li.addTo=function(i,o){return i.addHandler(o,this),this};var Op={Events:K},_u=Gt.touch?"touchstart mousedown":"mousedown",zi=Mt.extend({options:{clickTolerance:3},initialize:function(i,o,u,p){w(this,p),this._element=i,this._dragStartTarget=o||i,this._preventOutline=u},enable:function(){this._enabled||(ae(this._dragStartTarget,_u,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(zi._dragging===this&&this.finishDrag(!0),Se(this._dragStartTarget,_u,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!Ve(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){zi._dragging===this&&this.finishDrag();return}if(!(zi._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(zi._dragging=this,this._preventOutline&&pl(this._element),hl(),zr(),!this._moving)){this.fire("down");var o=i.touches?i.touches[0]:i,u=cu(this._element);this._startPoint=new Z(o.clientX,o.clientY),this._startPos=ls(this._element),this._parentScale=ml(u);var p=i.type==="mousedown";ae(document,p?"mousemove":"touchmove",this._onMove,this),ae(document,p?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var o=i.touches&&i.touches.length===1?i.touches[0]:i,u=new Z(o.clientX,o.clientY)._subtract(this._startPoint);!u.x&&!u.y||Math.abs(u.x)+Math.abs(u.y)<this.options.clickTolerance||(u.x/=this._parentScale.x,u.y/=this._parentScale.y,nn(i),this._moved||(this.fire("dragstart"),this._moved=!0,Kt(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Kt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(u),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),Ge(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){Ee(document.body,"leaflet-dragging"),this._lastTarget&&(Ee(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Se(document,"mousemove touchmove",this._onMove,this),Se(document,"mouseup touchend touchcancel",this._onUp,this),dl(),Hr();var o=this._moved&&this._moving;this._moving=!1,zi._dragging=!1,o&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function vu(i,o,u){var p,M=[1,4,2,8],C,z,Q,ht,bt,kt,Jt,de;for(C=0,kt=i.length;C<kt;C++)i[C]._code=hs(i[C],o);for(Q=0;Q<4;Q++){for(Jt=M[Q],p=[],C=0,kt=i.length,z=kt-1;C<kt;z=C++)ht=i[C],bt=i[z],ht._code&Jt?bt._code&Jt||(de=Bo(bt,ht,Jt,o,u),de._code=hs(de,o),p.push(de)):(bt._code&Jt&&(de=Bo(bt,ht,Jt,o,u),de._code=hs(de,o),p.push(de)),p.push(ht));i=p}return i}function yu(i,o){var u,p,M,C,z,Q,ht,bt,kt;if(!i||i.length===0)throw new Error("latlngs not passed");kn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Jt=dt([0,0]),de=V(i),gn=de.getNorthWest().distanceTo(de.getSouthWest())*de.getNorthEast().distanceTo(de.getNorthWest());gn<1700&&(Jt=wl(i));var Ye=i.length,Fn=[];for(u=0;u<Ye;u++){var wn=dt(i[u]);Fn.push(o.project(dt([wn.lat-Jt.lat,wn.lng-Jt.lng])))}for(Q=ht=bt=0,u=0,p=Ye-1;u<Ye;p=u++)M=Fn[u],C=Fn[p],z=M.y*C.x-C.y*M.x,ht+=(M.x+C.x)*z,bt+=(M.y+C.y)*z,Q+=z*3;Q===0?kt=Fn[0]:kt=[ht/Q,bt/Q];var ks=o.unproject(G(kt));return dt([ks.lat+Jt.lat,ks.lng+Jt.lng])}function wl(i){for(var o=0,u=0,p=0,M=0;M<i.length;M++){var C=dt(i[M]);o+=C.lat,u+=C.lng,p++}return dt([o/p,u/p])}var Up={__proto__:null,clipPolygon:vu,polygonCenter:yu,centroid:wl};function xu(i,o){if(!o||!i.length)return i.slice();var u=o*o;return i=Bp(i,u),i=Fp(i,u),i}function Mu(i,o,u){return Math.sqrt(Zr(i,o,u,!0))}function kp(i,o,u){return Zr(i,o,u)}function Fp(i,o){var u=i.length,p=typeof Uint8Array<"u"?Uint8Array:Array,M=new p(u);M[0]=M[u-1]=1,Sl(i,M,o,0,u-1);var C,z=[];for(C=0;C<u;C++)M[C]&&z.push(i[C]);return z}function Sl(i,o,u,p,M){var C=0,z,Q,ht;for(Q=p+1;Q<=M-1;Q++)ht=Zr(i[Q],i[p],i[M],!0),ht>C&&(z=Q,C=ht);C>u&&(o[z]=1,Sl(i,o,u,p,z),Sl(i,o,u,z,M))}function Bp(i,o){for(var u=[i[0]],p=1,M=0,C=i.length;p<C;p++)zp(i[p],i[M])>o&&(u.push(i[p]),M=p);return M<C-1&&u.push(i[C-1]),u}var bu;function wu(i,o,u,p,M){var C=p?bu:hs(i,u),z=hs(o,u),Q,ht,bt;for(bu=z;;){if(!(C|z))return[i,o];if(C&z)return!1;Q=C||z,ht=Bo(i,o,Q,u,M),bt=hs(ht,u),Q===C?(i=ht,C=bt):(o=ht,z=bt)}}function Bo(i,o,u,p,M){var C=o.x-i.x,z=o.y-i.y,Q=p.min,ht=p.max,bt,kt;return u&8?(bt=i.x+C*(ht.y-i.y)/z,kt=ht.y):u&4?(bt=i.x+C*(Q.y-i.y)/z,kt=Q.y):u&2?(bt=ht.x,kt=i.y+z*(ht.x-i.x)/C):u&1&&(bt=Q.x,kt=i.y+z*(Q.x-i.x)/C),new Z(bt,kt,M)}function hs(i,o){var u=0;return i.x<o.min.x?u|=1:i.x>o.max.x&&(u|=2),i.y<o.min.y?u|=4:i.y>o.max.y&&(u|=8),u}function zp(i,o){var u=o.x-i.x,p=o.y-i.y;return u*u+p*p}function Zr(i,o,u,p){var M=o.x,C=o.y,z=u.x-M,Q=u.y-C,ht=z*z+Q*Q,bt;return ht>0&&(bt=((i.x-M)*z+(i.y-C)*Q)/ht,bt>1?(M=u.x,C=u.y):bt>0&&(M+=z*bt,C+=Q*bt)),z=i.x-M,Q=i.y-C,p?z*z+Q*Q:new Z(M,C)}function kn(i){return!b(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function Su(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),kn(i)}function Eu(i,o){var u,p,M,C,z,Q,ht,bt;if(!i||i.length===0)throw new Error("latlngs not passed");kn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var kt=dt([0,0]),Jt=V(i),de=Jt.getNorthWest().distanceTo(Jt.getSouthWest())*Jt.getNorthEast().distanceTo(Jt.getNorthWest());de<1700&&(kt=wl(i));var gn=i.length,Ye=[];for(u=0;u<gn;u++){var Fn=dt(i[u]);Ye.push(o.project(dt([Fn.lat-kt.lat,Fn.lng-kt.lng])))}for(u=0,p=0;u<gn-1;u++)p+=Ye[u].distanceTo(Ye[u+1])/2;if(p===0)bt=Ye[0];else for(u=0,C=0;u<gn-1;u++)if(z=Ye[u],Q=Ye[u+1],M=z.distanceTo(Q),C+=M,C>p){ht=(C-p)/M,bt=[Q.x-ht*(Q.x-z.x),Q.y-ht*(Q.y-z.y)];break}var wn=o.unproject(G(bt));return dt([wn.lat+kt.lat,wn.lng+kt.lng])}var Hp={__proto__:null,simplify:xu,pointToSegmentDistance:Mu,closestPointOnSegment:kp,clipSegment:wu,_getEdgeIntersection:Bo,_getBitCode:hs,_sqClosestPointOnSegment:Zr,isFlat:kn,_flat:Su,polylineCenter:Eu},El={project:function(i){return new Z(i.lng,i.lat)},unproject:function(i){return new Y(i.y,i.x)},bounds:new nt([-180,-90],[180,90])},Tl={R:6378137,R_MINOR:6356752314245179e-9,bounds:new nt([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var o=Math.PI/180,u=this.R,p=i.lat*o,M=this.R_MINOR/u,C=Math.sqrt(1-M*M),z=C*Math.sin(p),Q=Math.tan(Math.PI/4-p/2)/Math.pow((1-z)/(1+z),C/2);return p=-u*Math.log(Math.max(Q,1e-10)),new Z(i.lng*o*u,p)},unproject:function(i){for(var o=180/Math.PI,u=this.R,p=this.R_MINOR/u,M=Math.sqrt(1-p*p),C=Math.exp(-i.y/u),z=Math.PI/2-2*Math.atan(C),Q=0,ht=.1,bt;Q<15&&Math.abs(ht)>1e-7;Q++)bt=M*Math.sin(z),bt=Math.pow((1-bt)/(1+bt),M/2),ht=Math.PI/2-2*Math.atan(C*bt)-z,z+=ht;return new Y(z*o,i.x*o/u)}},Vp={__proto__:null,LonLat:El,Mercator:Tl,SphericalMercator:Pt},Gp=r({},wt,{code:"EPSG:3395",projection:Tl,transformation:function(){var i=.5/(Math.PI*Tl.R);return st(i,.5,-i,.5)}()}),Tu=r({},wt,{code:"EPSG:4326",projection:El,transformation:st(1/180,1,-1/180,.5)}),Wp=r({},gt,{projection:El,transformation:st(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,o){var u=o.lng-i.lng,p=o.lat-i.lat;return Math.sqrt(u*u+p*p)},infinite:!0});gt.Earth=wt,gt.EPSG3395=Gp,gt.EPSG3857=tt,gt.EPSG900913=ot,gt.EPSG4326=Tu,gt.Simple=Wp;var $n=Mt.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[h(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[h(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var o=i.target;if(o.hasLayer(this)){if(this._map=o,this._zoomAnimated=o._zoomAnimated,this.getEvents){var u=this.getEvents();o.on(u,this),this.once("remove",function(){o.off(u,this)},this)}this.onAdd(o),this.fire("add"),o.fire("layeradd",{layer:this})}}});me.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var o=h(i);return this._layers[o]?this:(this._layers[o]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var o=h(i);return this._layers[o]?(this._loaded&&i.onRemove(this),delete this._layers[o],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return h(i)in this._layers},eachLayer:function(i,o){for(var u in this._layers)i.call(o,this._layers[u]);return this},_addLayers:function(i){i=i?b(i)?i:[i]:[];for(var o=0,u=i.length;o<u;o++)this.addLayer(i[o])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[h(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var o=h(i);this._zoomBoundLayers[o]&&(delete this._zoomBoundLayers[o],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,o=-1/0,u=this._getZoomSpan();for(var p in this._zoomBoundLayers){var M=this._zoomBoundLayers[p].options;i=M.minZoom===void 0?i:Math.min(i,M.minZoom),o=M.maxZoom===void 0?o:Math.max(o,M.maxZoom)}this._layersMaxZoom=o===-1/0?void 0:o,this._layersMinZoom=i===1/0?void 0:i,u!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Is=$n.extend({initialize:function(i,o){w(this,o),this._layers={};var u,p;if(i)for(u=0,p=i.length;u<p;u++)this.addLayer(i[u])},addLayer:function(i){var o=this.getLayerId(i);return this._layers[o]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var o=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[o]&&this._map.removeLayer(this._layers[o]),delete this._layers[o],this},hasLayer:function(i){var o=typeof i=="number"?i:this.getLayerId(i);return o in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var o=Array.prototype.slice.call(arguments,1),u,p;for(u in this._layers)p=this._layers[u],p[i]&&p[i].apply(p,o);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,o){for(var u in this._layers)i.call(o,this._layers[u]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return h(i)}}),Zp=function(i,o){return new Is(i,o)},bi=Is.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),Is.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),Is.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new at;for(var o in this._layers){var u=this._layers[o];i.extend(u.getBounds?u.getBounds():u.getLatLng())}return i}}),Xp=function(i,o){return new bi(i,o)},Ds=X.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){w(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,o){var u=this._getIconUrl(i);if(!u){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var p=this._createImg(u,o&&o.tagName==="IMG"?o:null);return this._setIconStyles(p,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(p.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),p},_setIconStyles:function(i,o){var u=this.options,p=u[o+"Size"];typeof p=="number"&&(p=[p,p]);var M=G(p),C=G(o==="shadow"&&u.shadowAnchor||u.iconAnchor||M&&M.divideBy(2,!0));i.className="leaflet-marker-"+o+" "+(u.className||""),C&&(i.style.marginLeft=-C.x+"px",i.style.marginTop=-C.y+"px"),M&&(i.style.width=M.x+"px",i.style.height=M.y+"px")},_createImg:function(i,o){return o=o||document.createElement("img"),o.src=i,o},_getIconUrl:function(i){return Gt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function qp(i){return new Ds(i)}var Xr=Ds.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof Xr.imagePath!="string"&&(Xr.imagePath=this._detectIconPath()),(this.options.imagePath||Xr.imagePath)+Ds.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var o=function(u,p,M){var C=p.exec(u);return C&&C[M]};return i=o(i,/^url\((['"])?(.+)\1\)$/,2),i&&o(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Zt("div","leaflet-default-icon-path",document.body),o=Mi(i,"background-image")||Mi(i,"backgroundImage");if(document.body.removeChild(i),o=this._stripUrl(o),o)return o;var u=document.querySelector('link[href$="leaflet.css"]');return u?u.href.substring(0,u.href.length-11-1):""}}),Au=li.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new zi(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Kt(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Ee(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var o=this._marker,u=o._map,p=this._marker.options.autoPanSpeed,M=this._marker.options.autoPanPadding,C=ls(o._icon),z=u.getPixelBounds(),Q=u.getPixelOrigin(),ht=J(z.min._subtract(Q).add(M),z.max._subtract(Q).subtract(M));if(!ht.contains(C)){var bt=G((Math.max(ht.max.x,C.x)-ht.max.x)/(z.max.x-ht.max.x)-(Math.min(ht.min.x,C.x)-ht.min.x)/(z.min.x-ht.min.x),(Math.max(ht.max.y,C.y)-ht.max.y)/(z.max.y-ht.max.y)-(Math.min(ht.min.y,C.y)-ht.min.y)/(z.min.y-ht.min.y)).multiplyBy(p);u.panBy(bt,{animate:!1}),this._draggable._newPos._add(bt),this._draggable._startPos._add(bt),Ge(o._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=B(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(q(this._panRequest),this._panRequest=B(this._adjustPan.bind(this,i)))},_onDrag:function(i){var o=this._marker,u=o._shadow,p=ls(o._icon),M=o._map.layerPointToLatLng(p);u&&Ge(u,p),o._latlng=M,i.latlng=M,i.oldLatLng=this._oldLatLng,o.fire("move",i).fire("drag",i)},_onDragEnd:function(i){q(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),zo=$n.extend({options:{icon:new Xr,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,o){w(this,o),this._latlng=dt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var o=this._latlng;return this._latlng=dt(i),this.update(),this.fire("move",{oldLatLng:o,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,o="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),u=i.icon.createIcon(this._icon),p=!1;u!==this._icon&&(this._icon&&this._removeIcon(),p=!0,i.title&&(u.title=i.title),u.tagName==="IMG"&&(u.alt=i.alt||"")),Kt(u,o),i.keyboard&&(u.tabIndex="0",u.setAttribute("role","button")),this._icon=u,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&ae(u,"focus",this._panOnFocus,this);var M=i.icon.createShadow(this._shadow),C=!1;M!==this._shadow&&(this._removeShadow(),C=!0),M&&(Kt(M,o),M.alt=""),this._shadow=M,i.opacity<1&&this._updateOpacity(),p&&this.getPane().appendChild(this._icon),this._initInteraction(),M&&C&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Se(this._icon,"focus",this._panOnFocus,this),_e(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&_e(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&Ge(this._icon,i),this._shadow&&Ge(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(o)},_initInteraction:function(){if(this.options.interactive&&(Kt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Au)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Au(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&bn(this._icon,i),this._shadow&&bn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var o=this.options.icon.options,u=o.iconSize?G(o.iconSize):G(0,0),p=o.iconAnchor?G(o.iconAnchor):G(0,0);i.panInside(this._latlng,{paddingTopLeft:p,paddingBottomRight:u.subtract(p)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function $p(i,o){return new zo(i,o)}var Hi=$n.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return w(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Ho=Hi.extend({options:{fill:!0,radius:10},initialize:function(i,o){w(this,o),this._latlng=dt(i),this._radius=this.options.radius},setLatLng:function(i){var o=this._latlng;return this._latlng=dt(i),this.redraw(),this.fire("move",{oldLatLng:o,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var o=i&&i.radius||this._radius;return Hi.prototype.setStyle.call(this,i),this.setRadius(o),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,o=this._radiusY||i,u=this._clickTolerance(),p=[i+u,o+u];this._pxBounds=new nt(this._point.subtract(p),this._point.add(p))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Yp(i,o){return new Ho(i,o)}var Al=Ho.extend({initialize:function(i,o,u){if(typeof o=="number"&&(o=r({},u,{radius:o})),w(this,o),this._latlng=dt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new at(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:Hi.prototype.setStyle,_project:function(){var i=this._latlng.lng,o=this._latlng.lat,u=this._map,p=u.options.crs;if(p.distance===wt.distance){var M=Math.PI/180,C=this._mRadius/wt.R/M,z=u.project([o+C,i]),Q=u.project([o-C,i]),ht=z.add(Q).divideBy(2),bt=u.unproject(ht).lat,kt=Math.acos((Math.cos(C*M)-Math.sin(o*M)*Math.sin(bt*M))/(Math.cos(o*M)*Math.cos(bt*M)))/M;(isNaN(kt)||kt===0)&&(kt=C/Math.cos(Math.PI/180*o)),this._point=ht.subtract(u.getPixelOrigin()),this._radius=isNaN(kt)?0:ht.x-u.project([bt,i-kt]).x,this._radiusY=ht.y-z.y}else{var Jt=p.unproject(p.project(this._latlng).subtract([this._mRadius,0]));this._point=u.latLngToLayerPoint(this._latlng),this._radius=this._point.x-u.latLngToLayerPoint(Jt).x}this._updateBounds()}});function jp(i,o,u){return new Al(i,o,u)}var wi=Hi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,o){w(this,o),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var o=1/0,u=null,p=Zr,M,C,z=0,Q=this._parts.length;z<Q;z++)for(var ht=this._parts[z],bt=1,kt=ht.length;bt<kt;bt++){M=ht[bt-1],C=ht[bt];var Jt=p(i,M,C,!0);Jt<o&&(o=Jt,u=p(i,M,C))}return u&&(u.distance=Math.sqrt(o)),u},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Eu(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,o){return o=o||this._defaultShape(),i=dt(i),o.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new at,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return kn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var o=[],u=kn(i),p=0,M=i.length;p<M;p++)u?(o[p]=dt(i[p]),this._bounds.extend(o[p])):o[p]=this._convertLatLngs(i[p]);return o},_project:function(){var i=new nt;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),o=new Z(i,i);this._rawPxBounds&&(this._pxBounds=new nt([this._rawPxBounds.min.subtract(o),this._rawPxBounds.max.add(o)]))},_projectLatlngs:function(i,o,u){var p=i[0]instanceof Y,M=i.length,C,z;if(p){for(z=[],C=0;C<M;C++)z[C]=this._map.latLngToLayerPoint(i[C]),u.extend(z[C]);o.push(z)}else for(C=0;C<M;C++)this._projectLatlngs(i[C],o,u)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var o=this._parts,u,p,M,C,z,Q,ht;for(u=0,M=0,C=this._rings.length;u<C;u++)for(ht=this._rings[u],p=0,z=ht.length;p<z-1;p++)Q=wu(ht[p],ht[p+1],i,p,!0),Q&&(o[M]=o[M]||[],o[M].push(Q[0]),(Q[1]!==ht[p+1]||p===z-2)&&(o[M].push(Q[1]),M++))}},_simplifyPoints:function(){for(var i=this._parts,o=this.options.smoothFactor,u=0,p=i.length;u<p;u++)i[u]=xu(i[u],o)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,o){var u,p,M,C,z,Q,ht=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(u=0,C=this._parts.length;u<C;u++)for(Q=this._parts[u],p=0,z=Q.length,M=z-1;p<z;M=p++)if(!(!o&&p===0)&&Mu(i,Q[M],Q[p])<=ht)return!0;return!1}});function Kp(i,o){return new wi(i,o)}wi._flat=Su;var Ns=wi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return yu(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var o=wi.prototype._convertLatLngs.call(this,i),u=o.length;return u>=2&&o[0]instanceof Y&&o[0].equals(o[u-1])&&o.pop(),o},_setLatLngs:function(i){wi.prototype._setLatLngs.call(this,i),kn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return kn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,o=this.options.weight,u=new Z(o,o);if(i=new nt(i.min.subtract(u),i.max.add(u)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var p=0,M=this._rings.length,C;p<M;p++)C=vu(this._rings[p],i,!0),C.length&&this._parts.push(C)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var o=!1,u,p,M,C,z,Q,ht,bt;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(C=0,ht=this._parts.length;C<ht;C++)for(u=this._parts[C],z=0,bt=u.length,Q=bt-1;z<bt;Q=z++)p=u[z],M=u[Q],p.y>i.y!=M.y>i.y&&i.x<(M.x-p.x)*(i.y-p.y)/(M.y-p.y)+p.x&&(o=!o);return o||wi.prototype._containsPoint.call(this,i,!0)}});function Jp(i,o){return new Ns(i,o)}var Si=bi.extend({initialize:function(i,o){w(this,o),this._layers={},i&&this.addData(i)},addData:function(i){var o=b(i)?i:i.features,u,p,M;if(o){for(u=0,p=o.length;u<p;u++)M=o[u],(M.geometries||M.geometry||M.features||M.coordinates)&&this.addData(M);return this}var C=this.options;if(C.filter&&!C.filter(i))return this;var z=Vo(i,C);return z?(z.feature=Zo(i),z.defaultOptions=z.options,this.resetStyle(z),C.onEachFeature&&C.onEachFeature(i,z),this.addLayer(z)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=r({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(o){this._setLayerStyle(o,i)},this)},_setLayerStyle:function(i,o){i.setStyle&&(typeof o=="function"&&(o=o(i.feature)),i.setStyle(o))}});function Vo(i,o){var u=i.type==="Feature"?i.geometry:i,p=u?u.coordinates:null,M=[],C=o&&o.pointToLayer,z=o&&o.coordsToLatLng||Ll,Q,ht,bt,kt;if(!p&&!u)return null;switch(u.type){case"Point":return Q=z(p),Lu(C,i,Q,o);case"MultiPoint":for(bt=0,kt=p.length;bt<kt;bt++)Q=z(p[bt]),M.push(Lu(C,i,Q,o));return new bi(M);case"LineString":case"MultiLineString":return ht=Go(p,u.type==="LineString"?0:1,z),new wi(ht,o);case"Polygon":case"MultiPolygon":return ht=Go(p,u.type==="Polygon"?1:2,z),new Ns(ht,o);case"GeometryCollection":for(bt=0,kt=u.geometries.length;bt<kt;bt++){var Jt=Vo({geometry:u.geometries[bt],type:"Feature",properties:i.properties},o);Jt&&M.push(Jt)}return new bi(M);case"FeatureCollection":for(bt=0,kt=u.features.length;bt<kt;bt++){var de=Vo(u.features[bt],o);de&&M.push(de)}return new bi(M);default:throw new Error("Invalid GeoJSON object.")}}function Lu(i,o,u,p){return i?i(o,u):new zo(u,p&&p.markersInheritOptions&&p)}function Ll(i){return new Y(i[1],i[0],i[2])}function Go(i,o,u){for(var p=[],M=0,C=i.length,z;M<C;M++)z=o?Go(i[M],o-1,u):(u||Ll)(i[M]),p.push(z);return p}function Pl(i,o){return i=dt(i),i.alt!==void 0?[g(i.lng,o),g(i.lat,o),g(i.alt,o)]:[g(i.lng,o),g(i.lat,o)]}function Wo(i,o,u,p){for(var M=[],C=0,z=i.length;C<z;C++)M.push(o?Wo(i[C],kn(i[C])?0:o-1,u,p):Pl(i[C],p));return!o&&u&&M.length>0&&M.push(M[0].slice()),M}function Os(i,o){return i.feature?r({},i.feature,{geometry:o}):Zo(o)}function Zo(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var Cl={toGeoJSON:function(i){return Os(this,{type:"Point",coordinates:Pl(this.getLatLng(),i)})}};zo.include(Cl),Al.include(Cl),Ho.include(Cl),wi.include({toGeoJSON:function(i){var o=!kn(this._latlngs),u=Wo(this._latlngs,o?1:0,!1,i);return Os(this,{type:(o?"Multi":"")+"LineString",coordinates:u})}}),Ns.include({toGeoJSON:function(i){var o=!kn(this._latlngs),u=o&&!kn(this._latlngs[0]),p=Wo(this._latlngs,u?2:o?1:0,!0,i);return o||(p=[p]),Os(this,{type:(u?"Multi":"")+"Polygon",coordinates:p})}}),Is.include({toMultiPoint:function(i){var o=[];return this.eachLayer(function(u){o.push(u.toGeoJSON(i).geometry.coordinates)}),Os(this,{type:"MultiPoint",coordinates:o})},toGeoJSON:function(i){var o=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(o==="MultiPoint")return this.toMultiPoint(i);var u=o==="GeometryCollection",p=[];return this.eachLayer(function(M){if(M.toGeoJSON){var C=M.toGeoJSON(i);if(u)p.push(C.geometry);else{var z=Zo(C);z.type==="FeatureCollection"?p.push.apply(p,z.features):p.push(z)}}}),u?Os(this,{geometries:p,type:"GeometryCollection"}):{type:"FeatureCollection",features:p}}});function Pu(i,o){return new Si(i,o)}var Qp=Pu,Xo=$n.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,o,u){this._url=i,this._bounds=V(o),w(this,u)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Kt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){_e(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&Un(this._image),this},bringToBack:function(){return this._map&&oi(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=V(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",o=this._image=i?this._url:Zt("img");if(Kt(o,"leaflet-image-layer"),this._zoomAnimated&&Kt(o,"leaflet-zoom-animated"),this.options.className&&Kt(o,this.options.className),o.onselectstart=m,o.onmousemove=m,o.onload=l(this.fire,this,"load"),o.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(o.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=o.src;return}o.src=this._url,o.alt=this.options.alt},_animateZoom:function(i){var o=this._map.getZoomScale(i.zoom),u=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;as(this._image,u,o)},_reset:function(){var i=this._image,o=new nt(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),u=o.getSize();Ge(i,o.min),i.style.width=u.x+"px",i.style.height=u.y+"px"},_updateOpacity:function(){bn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),tm=function(i,o,u){return new Xo(i,o,u)},Cu=Xo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",o=this._image=i?this._url:Zt("video");if(Kt(o,"leaflet-image-layer"),this._zoomAnimated&&Kt(o,"leaflet-zoom-animated"),this.options.className&&Kt(o,this.options.className),o.onselectstart=m,o.onmousemove=m,o.onloadeddata=l(this.fire,this,"load"),i){for(var u=o.getElementsByTagName("source"),p=[],M=0;M<u.length;M++)p.push(u[M].src);this._url=u.length>0?p:[o.src];return}b(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(o.style,"objectFit")&&(o.style.objectFit="fill"),o.autoplay=!!this.options.autoplay,o.loop=!!this.options.loop,o.muted=!!this.options.muted,o.playsInline=!!this.options.playsInline;for(var C=0;C<this._url.length;C++){var z=Zt("source");z.src=this._url[C],o.appendChild(z)}}});function em(i,o,u){return new Cu(i,o,u)}var Ru=Xo.extend({_initImage:function(){var i=this._image=this._url;Kt(i,"leaflet-image-layer"),this._zoomAnimated&&Kt(i,"leaflet-zoom-animated"),this.options.className&&Kt(i,this.options.className),i.onselectstart=m,i.onmousemove=m}});function nm(i,o,u){return new Ru(i,o,u)}var ci=$n.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,o){i&&(i instanceof Y||b(i))?(this._latlng=dt(i),w(this,o)):(w(this,i),this._source=o),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&bn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&bn(this._container,1),this.bringToFront(),this.options.interactive&&(Kt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(bn(this._container,0),this._removeTimeout=setTimeout(l(_e,void 0,this._container),200)):_e(this._container),this.options.interactive&&(Ee(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=dt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Un(this._container),this},bringToBack:function(){return this._map&&oi(this._container),this},_prepareOpen:function(i){var o=this._source;if(!o._map)return!1;if(o instanceof bi){o=null;var u=this._source._layers;for(var p in u)if(u[p]._map){o=u[p];break}if(!o)return!1;this._source=o}if(!i)if(o.getCenter)i=o.getCenter();else if(o.getLatLng)i=o.getLatLng();else if(o.getBounds)i=o.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,o=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof o=="string")i.innerHTML=o;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(o)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),o=G(this.options.offset),u=this._getAnchor();this._zoomAnimated?Ge(this._container,i.add(u)):o=o.add(i).add(u);var p=this._containerBottom=-o.y,M=this._containerLeft=-Math.round(this._containerWidth/2)+o.x;this._container.style.bottom=p+"px",this._container.style.left=M+"px"}},_getAnchor:function(){return[0,0]}});me.include({_initOverlay:function(i,o,u,p){var M=o;return M instanceof i||(M=new i(p).setContent(o)),u&&M.setLatLng(u),M}}),$n.include({_initOverlay:function(i,o,u,p){var M=u;return M instanceof i?(w(M,p),M._source=this):(M=o&&!p?o:new i(p,this),M.setContent(u)),M}});var qo=ci.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,ci.prototype.openOn.call(this,i)},onAdd:function(i){ci.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Hi||this._source.on("preclick",cs))},onRemove:function(i){ci.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Hi||this._source.off("preclick",cs))},getEvents:function(){var i=ci.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",o=this._container=Zt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),u=this._wrapper=Zt("div",i+"-content-wrapper",o);if(this._contentNode=Zt("div",i+"-content",u),Gr(o),yl(this._contentNode),ae(o,"contextmenu",cs),this._tipContainer=Zt("div",i+"-tip-container",o),this._tip=Zt("div",i+"-tip",this._tipContainer),this.options.closeButton){var p=this._closeButton=Zt("a",i+"-close-button",o);p.setAttribute("role","button"),p.setAttribute("aria-label","Close popup"),p.href="#close",p.innerHTML='<span aria-hidden="true">&#215;</span>',ae(p,"click",function(M){nn(M),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,o=i.style;o.width="",o.whiteSpace="nowrap";var u=i.offsetWidth;u=Math.min(u,this.options.maxWidth),u=Math.max(u,this.options.minWidth),o.width=u+1+"px",o.whiteSpace="",o.height="";var p=i.offsetHeight,M=this.options.maxHeight,C="leaflet-popup-scrolled";M&&p>M?(o.height=M+"px",Kt(i,C)):Ee(i,C),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),u=this._getAnchor();Ge(this._container,o.add(u))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,o=parseInt(Mi(this._container,"marginBottom"),10)||0,u=this._container.offsetHeight+o,p=this._containerWidth,M=new Z(this._containerLeft,-u-this._containerBottom);M._add(ls(this._container));var C=i.layerPointToContainerPoint(M),z=G(this.options.autoPanPadding),Q=G(this.options.autoPanPaddingTopLeft||z),ht=G(this.options.autoPanPaddingBottomRight||z),bt=i.getSize(),kt=0,Jt=0;C.x+p+ht.x>bt.x&&(kt=C.x+p-bt.x+ht.x),C.x-kt-Q.x<0&&(kt=C.x-Q.x),C.y+u+ht.y>bt.y&&(Jt=C.y+u-bt.y+ht.y),C.y-Jt-Q.y<0&&(Jt=C.y-Q.y),(kt||Jt)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([kt,Jt]))}},_getAnchor:function(){return G(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),im=function(i,o){return new qo(i,o)};me.mergeOptions({closePopupOnClick:!0}),me.include({openPopup:function(i,o,u){return this._initOverlay(qo,i,o,u).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),$n.include({bindPopup:function(i,o){return this._popup=this._initOverlay(qo,this._popup,i,o),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof bi||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){us(i);var o=i.layer||i.target;if(this._popup._source===o&&!(o instanceof Hi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=o,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var $o=ci.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){ci.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){ci.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=ci.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",o=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Zt("div",o),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var o,u,p=this._map,M=this._container,C=p.latLngToContainerPoint(p.getCenter()),z=p.layerPointToContainerPoint(i),Q=this.options.direction,ht=M.offsetWidth,bt=M.offsetHeight,kt=G(this.options.offset),Jt=this._getAnchor();Q==="top"?(o=ht/2,u=bt):Q==="bottom"?(o=ht/2,u=0):Q==="center"?(o=ht/2,u=bt/2):Q==="right"?(o=0,u=bt/2):Q==="left"?(o=ht,u=bt/2):z.x<C.x?(Q="right",o=0,u=bt/2):(Q="left",o=ht+(kt.x+Jt.x)*2,u=bt/2),i=i.subtract(G(o,u,!0)).add(kt).add(Jt),Ee(M,"leaflet-tooltip-right"),Ee(M,"leaflet-tooltip-left"),Ee(M,"leaflet-tooltip-top"),Ee(M,"leaflet-tooltip-bottom"),Kt(M,"leaflet-tooltip-"+Q),Ge(M,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&bn(this._container,i)},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(o)},_getAnchor:function(){return G(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),sm=function(i,o){return new $o(i,o)};me.include({openTooltip:function(i,o,u){return this._initOverlay($o,i,o,u).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),$n.include({bindTooltip:function(i,o){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay($o,this._tooltip,i,o),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var o=i?"off":"on",u={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?u.add=this._openTooltip:(u.mouseover=this._openTooltip,u.mouseout=this.closeTooltip,u.click=this._openTooltip,this._map?this._addFocusListeners():u.add=this._addFocusListeners),this._tooltip.options.sticky&&(u.mousemove=this._moveTooltip),this[o](u),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof bi||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var o=typeof i.getElement=="function"&&i.getElement();o&&(ae(o,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),ae(o,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var o=typeof i.getElement=="function"&&i.getElement();o&&o.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var o=this;this._map.once("moveend",function(){o._openOnceFlag=!1,o._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var o=i.latlng,u,p;this._tooltip.options.sticky&&i.originalEvent&&(u=this._map.mouseEventToContainerPoint(i.originalEvent),p=this._map.containerPointToLayerPoint(u),o=this._map.layerPointToLatLng(p)),this._tooltip.setLatLng(o)}});var Iu=Ds.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var o=i&&i.tagName==="DIV"?i:document.createElement("div"),u=this.options;if(u.html instanceof Element?(os(o),o.appendChild(u.html)):o.innerHTML=u.html!==!1?u.html:"",u.bgPos){var p=G(u.bgPos);o.style.backgroundPosition=-p.x+"px "+-p.y+"px"}return this._setIconStyles(o,"icon"),o},createShadow:function(){return null}});function rm(i){return new Iu(i)}Ds.Default=Xr;var qr=$n.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Gt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){w(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),_e(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Un(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(oi(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof Z?i:new Z(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var o=this.getPane().children,u=-i(-1/0,1/0),p=0,M=o.length,C;p<M;p++)C=o[p].style.zIndex,o[p]!==this._container&&C&&(u=i(u,+C));isFinite(u)&&(this.options.zIndex=u+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Gt.ielt9){bn(this._container,this.options.opacity);var i=+new Date,o=!1,u=!1;for(var p in this._tiles){var M=this._tiles[p];if(!(!M.current||!M.loaded)){var C=Math.min(1,(i-M.loaded)/200);bn(M.el,C),C<1?o=!0:(M.active?u=!0:this._onOpaqueTile(M),M.active=!0)}}u&&!this._noPrune&&this._pruneTiles(),o&&(q(this._fadeFrame),this._fadeFrame=B(this._updateOpacity,this))}},_onOpaqueTile:m,_initContainer:function(){this._container||(this._container=Zt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,o=this.options.maxZoom;if(i!==void 0){for(var u in this._levels)u=Number(u),this._levels[u].el.children.length||u===i?(this._levels[u].el.style.zIndex=o-Math.abs(i-u),this._onUpdateLevel(u)):(_e(this._levels[u].el),this._removeTilesAtZoom(u),this._onRemoveLevel(u),delete this._levels[u]);var p=this._levels[i],M=this._map;return p||(p=this._levels[i]={},p.el=Zt("div","leaflet-tile-container leaflet-zoom-animated",this._container),p.el.style.zIndex=o,p.origin=M.project(M.unproject(M.getPixelOrigin()),i).round(),p.zoom=i,this._setZoomTransform(p,M.getCenter(),M.getZoom()),m(p.el.offsetWidth),this._onCreateLevel(p)),this._level=p,p}},_onUpdateLevel:m,_onRemoveLevel:m,_onCreateLevel:m,_pruneTiles:function(){if(this._map){var i,o,u=this._map.getZoom();if(u>this.options.maxZoom||u<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)o=this._tiles[i],o.retain=o.current;for(i in this._tiles)if(o=this._tiles[i],o.current&&!o.active){var p=o.coords;this._retainParent(p.x,p.y,p.z,p.z-5)||this._retainChildren(p.x,p.y,p.z,p.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var o in this._tiles)this._tiles[o].coords.z===i&&this._removeTile(o)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)_e(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,o,u,p){var M=Math.floor(i/2),C=Math.floor(o/2),z=u-1,Q=new Z(+M,+C);Q.z=+z;var ht=this._tileCoordsToKey(Q),bt=this._tiles[ht];return bt&&bt.active?(bt.retain=!0,!0):(bt&&bt.loaded&&(bt.retain=!0),z>p?this._retainParent(M,C,z,p):!1)},_retainChildren:function(i,o,u,p){for(var M=2*i;M<2*i+2;M++)for(var C=2*o;C<2*o+2;C++){var z=new Z(M,C);z.z=u+1;var Q=this._tileCoordsToKey(z),ht=this._tiles[Q];if(ht&&ht.active){ht.retain=!0;continue}else ht&&ht.loaded&&(ht.retain=!0);u+1<p&&this._retainChildren(M,C,u+1,p)}},_resetView:function(i){var o=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),o,o)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var o=this.options;return o.minNativeZoom!==void 0&&i<o.minNativeZoom?o.minNativeZoom:o.maxNativeZoom!==void 0&&o.maxNativeZoom<i?o.maxNativeZoom:i},_setView:function(i,o,u,p){var M=Math.round(o);this.options.maxZoom!==void 0&&M>this.options.maxZoom||this.options.minZoom!==void 0&&M<this.options.minZoom?M=void 0:M=this._clampZoom(M);var C=this.options.updateWhenZooming&&M!==this._tileZoom;(!p||C)&&(this._tileZoom=M,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),M!==void 0&&this._update(i),u||this._pruneTiles(),this._noPrune=!!u),this._setZoomTransforms(i,o)},_setZoomTransforms:function(i,o){for(var u in this._levels)this._setZoomTransform(this._levels[u],i,o)},_setZoomTransform:function(i,o,u){var p=this._map.getZoomScale(u,i.zoom),M=i.origin.multiplyBy(p).subtract(this._map._getNewPixelOrigin(o,u)).round();Gt.any3d?as(i.el,M,p):Ge(i.el,M)},_resetGrid:function(){var i=this._map,o=i.options.crs,u=this._tileSize=this.getTileSize(),p=this._tileZoom,M=this._map.getPixelWorldBounds(this._tileZoom);M&&(this._globalTileRange=this._pxBoundsToTileRange(M)),this._wrapX=o.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,o.wrapLng[0]],p).x/u.x),Math.ceil(i.project([0,o.wrapLng[1]],p).x/u.y)],this._wrapY=o.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([o.wrapLat[0],0],p).y/u.x),Math.ceil(i.project([o.wrapLat[1],0],p).y/u.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var o=this._map,u=o._animatingZoom?Math.max(o._animateToZoom,o.getZoom()):o.getZoom(),p=o.getZoomScale(u,this._tileZoom),M=o.project(i,this._tileZoom).floor(),C=o.getSize().divideBy(p*2);return new nt(M.subtract(C),M.add(C))},_update:function(i){var o=this._map;if(o){var u=this._clampZoom(o.getZoom());if(i===void 0&&(i=o.getCenter()),this._tileZoom!==void 0){var p=this._getTiledPixelBounds(i),M=this._pxBoundsToTileRange(p),C=M.getCenter(),z=[],Q=this.options.keepBuffer,ht=new nt(M.getBottomLeft().subtract([Q,-Q]),M.getTopRight().add([Q,-Q]));if(!(isFinite(M.min.x)&&isFinite(M.min.y)&&isFinite(M.max.x)&&isFinite(M.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var bt in this._tiles){var kt=this._tiles[bt].coords;(kt.z!==this._tileZoom||!ht.contains(new Z(kt.x,kt.y)))&&(this._tiles[bt].current=!1)}if(Math.abs(u-this._tileZoom)>1){this._setView(i,u);return}for(var Jt=M.min.y;Jt<=M.max.y;Jt++)for(var de=M.min.x;de<=M.max.x;de++){var gn=new Z(de,Jt);if(gn.z=this._tileZoom,!!this._isValidTile(gn)){var Ye=this._tiles[this._tileCoordsToKey(gn)];Ye?Ye.current=!0:z.push(gn)}}if(z.sort(function(wn,ks){return wn.distanceTo(C)-ks.distanceTo(C)}),z.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Fn=document.createDocumentFragment();for(de=0;de<z.length;de++)this._addTile(z[de],Fn);this._level.el.appendChild(Fn)}}}},_isValidTile:function(i){var o=this._map.options.crs;if(!o.infinite){var u=this._globalTileRange;if(!o.wrapLng&&(i.x<u.min.x||i.x>u.max.x)||!o.wrapLat&&(i.y<u.min.y||i.y>u.max.y))return!1}if(!this.options.bounds)return!0;var p=this._tileCoordsToBounds(i);return V(this.options.bounds).overlaps(p)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var o=this._map,u=this.getTileSize(),p=i.scaleBy(u),M=p.add(u),C=o.unproject(p,i.z),z=o.unproject(M,i.z);return[C,z]},_tileCoordsToBounds:function(i){var o=this._tileCoordsToNwSe(i),u=new at(o[0],o[1]);return this.options.noWrap||(u=this._map.wrapLatLngBounds(u)),u},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var o=i.split(":"),u=new Z(+o[0],+o[1]);return u.z=+o[2],u},_removeTile:function(i){var o=this._tiles[i];o&&(_e(o.el),delete this._tiles[i],this.fire("tileunload",{tile:o.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){Kt(i,"leaflet-tile");var o=this.getTileSize();i.style.width=o.x+"px",i.style.height=o.y+"px",i.onselectstart=m,i.onmousemove=m,Gt.ielt9&&this.options.opacity<1&&bn(i,this.options.opacity)},_addTile:function(i,o){var u=this._getTilePos(i),p=this._tileCoordsToKey(i),M=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(M),this.createTile.length<2&&B(l(this._tileReady,this,i,null,M)),Ge(M,u),this._tiles[p]={el:M,coords:i,current:!0},o.appendChild(M),this.fire("tileloadstart",{tile:M,coords:i})},_tileReady:function(i,o,u){o&&this.fire("tileerror",{error:o,tile:u,coords:i});var p=this._tileCoordsToKey(i);u=this._tiles[p],u&&(u.loaded=+new Date,this._map._fadeAnimated?(bn(u.el,0),q(this._fadeFrame),this._fadeFrame=B(this._updateOpacity,this)):(u.active=!0,this._pruneTiles()),o||(Kt(u.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:u.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Gt.ielt9||!this._map._fadeAnimated?B(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var o=new Z(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return o.z=i.z,o},_pxBoundsToTileRange:function(i){var o=this.getTileSize();return new nt(i.min.unscaleBy(o).floor(),i.max.unscaleBy(o).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function om(i){return new qr(i)}var Us=qr.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,o){this._url=i,o=w(this,o),o.detectRetina&&Gt.retina&&o.maxZoom>0?(o.tileSize=Math.floor(o.tileSize/2),o.zoomReverse?(o.zoomOffset--,o.minZoom=Math.min(o.maxZoom,o.minZoom+1)):(o.zoomOffset++,o.maxZoom=Math.max(o.minZoom,o.maxZoom-1)),o.minZoom=Math.max(0,o.minZoom)):o.zoomReverse?o.minZoom=Math.min(o.maxZoom,o.minZoom):o.maxZoom=Math.max(o.minZoom,o.maxZoom),typeof o.subdomains=="string"&&(o.subdomains=o.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,o){return this._url===i&&o===void 0&&(o=!0),this._url=i,o||this.redraw(),this},createTile:function(i,o){var u=document.createElement("img");return ae(u,"load",l(this._tileOnLoad,this,o,u)),ae(u,"error",l(this._tileOnError,this,o,u)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(u.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(u.referrerPolicy=this.options.referrerPolicy),u.alt="",u.src=this.getTileUrl(i),u},getTileUrl:function(i){var o={r:Gt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var u=this._globalTileRange.max.y-i.y;this.options.tms&&(o.y=u),o["-y"]=u}return N(this._url,r(o,this.options))},_tileOnLoad:function(i,o){Gt.ielt9?setTimeout(l(i,this,null,o),0):i(null,o)},_tileOnError:function(i,o,u){var p=this.options.errorTileUrl;p&&o.getAttribute("src")!==p&&(o.src=p),i(u,o)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,o=this.options.maxZoom,u=this.options.zoomReverse,p=this.options.zoomOffset;return u&&(i=o-i),i+p},_getSubdomain:function(i){var o=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[o]},_abortLoading:function(){var i,o;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(o=this._tiles[i].el,o.onload=m,o.onerror=m,!o.complete)){o.src=k;var u=this._tiles[i].coords;_e(o),delete this._tiles[i],this.fire("tileabort",{tile:o,coords:u})}},_removeTile:function(i){var o=this._tiles[i];if(o)return o.el.setAttribute("src",k),qr.prototype._removeTile.call(this,i)},_tileReady:function(i,o,u){if(!(!this._map||u&&u.getAttribute("src")===k))return qr.prototype._tileReady.call(this,i,o,u)}});function Du(i,o){return new Us(i,o)}var Nu=Us.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,o){this._url=i;var u=r({},this.defaultWmsParams);for(var p in o)p in this.options||(u[p]=o[p]);o=w(this,o);var M=o.detectRetina&&Gt.retina?2:1,C=this.getTileSize();u.width=C.x*M,u.height=C.y*M,this.wmsParams=u},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var o=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[o]=this._crs.code,Us.prototype.onAdd.call(this,i)},getTileUrl:function(i){var o=this._tileCoordsToNwSe(i),u=this._crs,p=J(u.project(o[0]),u.project(o[1])),M=p.min,C=p.max,z=(this._wmsVersion>=1.3&&this._crs===Tu?[M.y,M.x,C.y,C.x]:[M.x,M.y,C.x,C.y]).join(","),Q=Us.prototype.getTileUrl.call(this,i);return Q+y(this.wmsParams,Q,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+z},setParams:function(i,o){return r(this.wmsParams,i),o||this.redraw(),this}});function am(i,o){return new Nu(i,o)}Us.WMS=Nu,Du.wms=am;var Ei=$n.extend({options:{padding:.1},initialize:function(i){w(this,i),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Kt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,o){var u=this._map.getZoomScale(o,this._zoom),p=this._map.getSize().multiplyBy(.5+this.options.padding),M=this._map.project(this._center,o),C=p.multiplyBy(-u).add(M).subtract(this._map._getNewPixelOrigin(i,o));Gt.any3d?as(this._container,C,u):Ge(this._container,C)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,o=this._map.getSize(),u=this._map.containerPointToLayerPoint(o.multiplyBy(-i)).round();this._bounds=new nt(u,u.add(o.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Ou=Ei.extend({options:{tolerance:0},getEvents:function(){var i=Ei.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){Ei.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");ae(i,"mousemove",this._onMouseMove,this),ae(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),ae(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){q(this._redrawRequest),delete this._ctx,_e(this._container),Se(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var o in this._layers)i=this._layers[o],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Ei.prototype._update.call(this);var i=this._bounds,o=this._container,u=i.getSize(),p=Gt.retina?2:1;Ge(o,i.min),o.width=p*u.x,o.height=p*u.y,o.style.width=u.x+"px",o.style.height=u.y+"px",Gt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){Ei.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[h(i)]=i;var o=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=o),this._drawLast=o,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var o=i._order,u=o.next,p=o.prev;u?u.prev=p:this._drawLast=p,p?p.next=u:this._drawFirst=u,delete i._order,delete this._layers[h(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var o=i.options.dashArray.split(/[, ]+/),u=[],p,M;for(M=0;M<o.length;M++){if(p=Number(o[M]),isNaN(p))return;u.push(p)}i.options._dashArray=u}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||B(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var o=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new nt,this._redrawBounds.extend(i._pxBounds.min.subtract([o,o])),this._redrawBounds.extend(i._pxBounds.max.add([o,o]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var o=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,o.x,o.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,o=this._redrawBounds;if(this._ctx.save(),o){var u=o.getSize();this._ctx.beginPath(),this._ctx.rect(o.min.x,o.min.y,u.x,u.y),this._ctx.clip()}this._drawing=!0;for(var p=this._drawFirst;p;p=p.next)i=p.layer,(!o||i._pxBounds&&i._pxBounds.intersects(o))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,o){if(this._drawing){var u,p,M,C,z=i._parts,Q=z.length,ht=this._ctx;if(Q){for(ht.beginPath(),u=0;u<Q;u++){for(p=0,M=z[u].length;p<M;p++)C=z[u][p],ht[p?"lineTo":"moveTo"](C.x,C.y);o&&ht.closePath()}this._fillStroke(ht,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var o=i._point,u=this._ctx,p=Math.max(Math.round(i._radius),1),M=(Math.max(Math.round(i._radiusY),1)||p)/p;M!==1&&(u.save(),u.scale(1,M)),u.beginPath(),u.arc(o.x,o.y/M,p,0,Math.PI*2,!1),M!==1&&u.restore(),this._fillStroke(u,i)}},_fillStroke:function(i,o){var u=o.options;u.fill&&(i.globalAlpha=u.fillOpacity,i.fillStyle=u.fillColor||u.color,i.fill(u.fillRule||"evenodd")),u.stroke&&u.weight!==0&&(i.setLineDash&&i.setLineDash(o.options&&o.options._dashArray||[]),i.globalAlpha=u.opacity,i.lineWidth=u.weight,i.strokeStyle=u.color,i.lineCap=u.lineCap,i.lineJoin=u.lineJoin,i.stroke())},_onClick:function(i){for(var o=this._map.mouseEventToLayerPoint(i),u,p,M=this._drawFirst;M;M=M.next)u=M.layer,u.options.interactive&&u._containsPoint(o)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(u))&&(p=u);this._fireEvent(p?[p]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var o=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,o)}},_handleMouseOut:function(i){var o=this._hoveredLayer;o&&(Ee(this._container,"leaflet-interactive"),this._fireEvent([o],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,o){if(!this._mouseHoverThrottled){for(var u,p,M=this._drawFirst;M;M=M.next)u=M.layer,u.options.interactive&&u._containsPoint(o)&&(p=u);p!==this._hoveredLayer&&(this._handleMouseOut(i),p&&(Kt(this._container,"leaflet-interactive"),this._fireEvent([p],i,"mouseover"),this._hoveredLayer=p)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,o,u){this._map._fireDOMEvent(o,u||o.type,i)},_bringToFront:function(i){var o=i._order;if(o){var u=o.next,p=o.prev;if(u)u.prev=p;else return;p?p.next=u:u&&(this._drawFirst=u),o.prev=this._drawLast,this._drawLast.next=o,o.next=null,this._drawLast=o,this._requestRedraw(i)}},_bringToBack:function(i){var o=i._order;if(o){var u=o.next,p=o.prev;if(p)p.next=u;else return;u?u.prev=p:p&&(this._drawLast=p),o.prev=null,o.next=this._drawFirst,this._drawFirst.prev=o,this._drawFirst=o,this._requestRedraw(i)}}});function Uu(i){return Gt.canvas?new Ou(i):null}var $r=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),lm={_initContainer:function(){this._container=Zt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(Ei.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var o=i._container=$r("shape");Kt(o,"leaflet-vml-shape "+(this.options.className||"")),o.coordsize="1 1",i._path=$r("path"),o.appendChild(i._path),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){var o=i._container;this._container.appendChild(o),i.options.interactive&&i.addInteractiveTarget(o)},_removePath:function(i){var o=i._container;_e(o),i.removeInteractiveTarget(o),delete this._layers[h(i)]},_updateStyle:function(i){var o=i._stroke,u=i._fill,p=i.options,M=i._container;M.stroked=!!p.stroke,M.filled=!!p.fill,p.stroke?(o||(o=i._stroke=$r("stroke")),M.appendChild(o),o.weight=p.weight+"px",o.color=p.color,o.opacity=p.opacity,p.dashArray?o.dashStyle=b(p.dashArray)?p.dashArray.join(" "):p.dashArray.replace(/( *, *)/g," "):o.dashStyle="",o.endcap=p.lineCap.replace("butt","flat"),o.joinstyle=p.lineJoin):o&&(M.removeChild(o),i._stroke=null),p.fill?(u||(u=i._fill=$r("fill")),M.appendChild(u),u.color=p.fillColor||p.color,u.opacity=p.fillOpacity):u&&(M.removeChild(u),i._fill=null)},_updateCircle:function(i){var o=i._point.round(),u=Math.round(i._radius),p=Math.round(i._radiusY||u);this._setPath(i,i._empty()?"M0 0":"AL "+o.x+","+o.y+" "+u+","+p+" 0,"+65535*360)},_setPath:function(i,o){i._path.v=o},_bringToFront:function(i){Un(i._container)},_bringToBack:function(i){oi(i._container)}},Yo=Gt.vml?$r:rt,Yr=Ei.extend({_initContainer:function(){this._container=Yo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Yo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){_e(this._container),Se(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){Ei.prototype._update.call(this);var i=this._bounds,o=i.getSize(),u=this._container;(!this._svgSize||!this._svgSize.equals(o))&&(this._svgSize=o,u.setAttribute("width",o.x),u.setAttribute("height",o.y)),Ge(u,i.min),u.setAttribute("viewBox",[i.min.x,i.min.y,o.x,o.y].join(" ")),this.fire("update")}},_initPath:function(i){var o=i._path=Yo("path");i.options.className&&Kt(o,i.options.className),i.options.interactive&&Kt(o,"leaflet-interactive"),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){_e(i._path),i.removeInteractiveTarget(i._path),delete this._layers[h(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var o=i._path,u=i.options;o&&(u.stroke?(o.setAttribute("stroke",u.color),o.setAttribute("stroke-opacity",u.opacity),o.setAttribute("stroke-width",u.weight),o.setAttribute("stroke-linecap",u.lineCap),o.setAttribute("stroke-linejoin",u.lineJoin),u.dashArray?o.setAttribute("stroke-dasharray",u.dashArray):o.removeAttribute("stroke-dasharray"),u.dashOffset?o.setAttribute("stroke-dashoffset",u.dashOffset):o.removeAttribute("stroke-dashoffset")):o.setAttribute("stroke","none"),u.fill?(o.setAttribute("fill",u.fillColor||u.color),o.setAttribute("fill-opacity",u.fillOpacity),o.setAttribute("fill-rule",u.fillRule||"evenodd")):o.setAttribute("fill","none"))},_updatePoly:function(i,o){this._setPath(i,mt(i._parts,o))},_updateCircle:function(i){var o=i._point,u=Math.max(Math.round(i._radius),1),p=Math.max(Math.round(i._radiusY),1)||u,M="a"+u+","+p+" 0 1,0 ",C=i._empty()?"M0 0":"M"+(o.x-u)+","+o.y+M+u*2+",0 "+M+-u*2+",0 ";this._setPath(i,C)},_setPath:function(i,o){i._path.setAttribute("d",o)},_bringToFront:function(i){Un(i._path)},_bringToBack:function(i){oi(i._path)}});Gt.vml&&Yr.include(lm);function ku(i){return Gt.svg||Gt.vml?new Yr(i):null}me.include({getRenderer:function(i){var o=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return o||(o=this._renderer=this._createRenderer()),this.hasLayer(o)||this.addLayer(o),o},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var o=this._paneRenderers[i];return o===void 0&&(o=this._createRenderer({pane:i}),this._paneRenderers[i]=o),o},_createRenderer:function(i){return this.options.preferCanvas&&Uu(i)||ku(i)}});var Fu=Ns.extend({initialize:function(i,o){Ns.prototype.initialize.call(this,this._boundsToLatLngs(i),o)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=V(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function cm(i,o){return new Fu(i,o)}Yr.create=Yo,Yr.pointsToPath=mt,Si.geometryToLayer=Vo,Si.coordsToLatLng=Ll,Si.coordsToLatLngs=Go,Si.latLngToCoords=Pl,Si.latLngsToCoords=Wo,Si.getFeature=Os,Si.asFeature=Zo,me.mergeOptions({boxZoom:!0});var Bu=li.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){ae(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Se(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){_e(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),zr(),hl(),this._startPoint=this._map.mouseEventToContainerPoint(i),ae(document,{contextmenu:us,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Zt("div","leaflet-zoom-box",this._container),Kt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var o=new nt(this._point,this._startPoint),u=o.getSize();Ge(this._box,o.min),this._box.style.width=u.x+"px",this._box.style.height=u.y+"px"},_finish:function(){this._moved&&(_e(this._box),Ee(this._container,"leaflet-crosshair")),Hr(),dl(),Se(document,{contextmenu:us,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var o=new at(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(o).fire("boxzoomend",{boxZoomBounds:o})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});me.addInitHook("addHandler","boxZoom",Bu),me.mergeOptions({doubleClickZoom:!0});var zu=li.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var o=this._map,u=o.getZoom(),p=o.options.zoomDelta,M=i.originalEvent.shiftKey?u-p:u+p;o.options.doubleClickZoom==="center"?o.setZoom(M):o.setZoomAround(i.containerPoint,M)}});me.addInitHook("addHandler","doubleClickZoom",zu),me.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var Hu=li.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new zi(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}Kt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Ee(this._map._container,"leaflet-grab"),Ee(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var o=V(this._map.options.maxBounds);this._offsetLimit=J(this._map.latLngToContainerPoint(o.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(o.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var o=this._lastTime=+new Date,u=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(u),this._times.push(o),this._prunePositions(o)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),o=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=o.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,o){return i-(i-o)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),o=this._offsetLimit;i.x<o.min.x&&(i.x=this._viscousLimit(i.x,o.min.x)),i.y<o.min.y&&(i.y=this._viscousLimit(i.y,o.min.y)),i.x>o.max.x&&(i.x=this._viscousLimit(i.x,o.max.x)),i.y>o.max.y&&(i.y=this._viscousLimit(i.y,o.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,o=Math.round(i/2),u=this._initialWorldOffset,p=this._draggable._newPos.x,M=(p-o+u)%i+o-u,C=(p+o+u)%i-o-u,z=Math.abs(M+u)<Math.abs(C+u)?M:C;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=z},_onDragEnd:function(i){var o=this._map,u=o.options,p=!u.inertia||i.noInertia||this._times.length<2;if(o.fire("dragend",i),p)o.fire("moveend");else{this._prunePositions(+new Date);var M=this._lastPos.subtract(this._positions[0]),C=(this._lastTime-this._times[0])/1e3,z=u.easeLinearity,Q=M.multiplyBy(z/C),ht=Q.distanceTo([0,0]),bt=Math.min(u.inertiaMaxSpeed,ht),kt=Q.multiplyBy(bt/ht),Jt=bt/(u.inertiaDeceleration*z),de=kt.multiplyBy(-Jt/2).round();!de.x&&!de.y?o.fire("moveend"):(de=o._limitOffset(de,o.options.maxBounds),B(function(){o.panBy(de,{duration:Jt,easeLinearity:z,noMoveStart:!0,animate:!0})}))}}});me.addInitHook("addHandler","dragging",Hu),me.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Vu=li.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),ae(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Se(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,o=document.documentElement,u=i.scrollTop||o.scrollTop,p=i.scrollLeft||o.scrollLeft;this._map._container.focus(),window.scrollTo(p,u)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var o=this._panKeys={},u=this.keyCodes,p,M;for(p=0,M=u.left.length;p<M;p++)o[u.left[p]]=[-1*i,0];for(p=0,M=u.right.length;p<M;p++)o[u.right[p]]=[i,0];for(p=0,M=u.down.length;p<M;p++)o[u.down[p]]=[0,i];for(p=0,M=u.up.length;p<M;p++)o[u.up[p]]=[0,-1*i]},_setZoomDelta:function(i){var o=this._zoomKeys={},u=this.keyCodes,p,M;for(p=0,M=u.zoomIn.length;p<M;p++)o[u.zoomIn[p]]=i;for(p=0,M=u.zoomOut.length;p<M;p++)o[u.zoomOut[p]]=-i},_addHooks:function(){ae(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Se(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var o=i.keyCode,u=this._map,p;if(o in this._panKeys){if(!u._panAnim||!u._panAnim._inProgress)if(p=this._panKeys[o],i.shiftKey&&(p=G(p).multiplyBy(3)),u.options.maxBounds&&(p=u._limitOffset(G(p),u.options.maxBounds)),u.options.worldCopyJump){var M=u.wrapLatLng(u.unproject(u.project(u.getCenter()).add(p)));u.panTo(M)}else u.panBy(p)}else if(o in this._zoomKeys)u.setZoom(u.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[o]);else if(o===27&&u._popup&&u._popup.options.closeOnEscapeKey)u.closePopup();else return;us(i)}}});me.addInitHook("addHandler","keyboard",Vu),me.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Gu=li.extend({addHooks:function(){ae(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Se(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var o=fu(i),u=this._map.options.wheelDebounceTime;this._delta+=o,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var p=Math.max(u-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),p),us(i)},_performZoom:function(){var i=this._map,o=i.getZoom(),u=this._map.options.zoomSnap||0;i._stop();var p=this._delta/(this._map.options.wheelPxPerZoomLevel*4),M=4*Math.log(2/(1+Math.exp(-Math.abs(p))))/Math.LN2,C=u?Math.ceil(M/u)*u:M,z=i._limitZoom(o+(this._delta>0?C:-C))-o;this._delta=0,this._startTime=null,z&&(i.options.scrollWheelZoom==="center"?i.setZoom(o+z):i.setZoomAround(this._lastMousePos,o+z))}});me.addInitHook("addHandler","scrollWheelZoom",Gu);var um=600;me.mergeOptions({tapHold:Gt.touchNative&&Gt.safari&&Gt.mobile,tapTolerance:15});var Wu=li.extend({addHooks:function(){ae(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Se(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var o=i.touches[0];this._startPos=this._newPos=new Z(o.clientX,o.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(ae(document,"touchend",nn),ae(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",o))},this),um),ae(document,"touchend touchcancel contextmenu",this._cancel,this),ae(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){Se(document,"touchend",nn),Se(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),Se(document,"touchend touchcancel contextmenu",this._cancel,this),Se(document,"touchmove",this._onMove,this)},_onMove:function(i){var o=i.touches[0];this._newPos=new Z(o.clientX,o.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,o){var u=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:o.screenX,screenY:o.screenY,clientX:o.clientX,clientY:o.clientY});u._simulated=!0,o.target.dispatchEvent(u)}});me.addInitHook("addHandler","tapHold",Wu),me.mergeOptions({touchZoom:Gt.touch,bounceAtZoomLimits:!0});var Zu=li.extend({addHooks:function(){Kt(this._map._container,"leaflet-touch-zoom"),ae(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Ee(this._map._container,"leaflet-touch-zoom"),Se(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var o=this._map;if(!(!i.touches||i.touches.length!==2||o._animatingZoom||this._zooming)){var u=o.mouseEventToContainerPoint(i.touches[0]),p=o.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=o.getSize()._divideBy(2),this._startLatLng=o.containerPointToLatLng(this._centerPoint),o.options.touchZoom!=="center"&&(this._pinchStartLatLng=o.containerPointToLatLng(u.add(p)._divideBy(2))),this._startDist=u.distanceTo(p),this._startZoom=o.getZoom(),this._moved=!1,this._zooming=!0,o._stop(),ae(document,"touchmove",this._onTouchMove,this),ae(document,"touchend touchcancel",this._onTouchEnd,this),nn(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var o=this._map,u=o.mouseEventToContainerPoint(i.touches[0]),p=o.mouseEventToContainerPoint(i.touches[1]),M=u.distanceTo(p)/this._startDist;if(this._zoom=o.getScaleZoom(M,this._startZoom),!o.options.bounceAtZoomLimits&&(this._zoom<o.getMinZoom()&&M<1||this._zoom>o.getMaxZoom()&&M>1)&&(this._zoom=o._limitZoom(this._zoom)),o.options.touchZoom==="center"){if(this._center=this._startLatLng,M===1)return}else{var C=u._add(p)._divideBy(2)._subtract(this._centerPoint);if(M===1&&C.x===0&&C.y===0)return;this._center=o.unproject(o.project(this._pinchStartLatLng,this._zoom).subtract(C),this._zoom)}this._moved||(o._moveStart(!0,!1),this._moved=!0),q(this._animRequest);var z=l(o._move,o,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=B(z,this,!0),nn(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,q(this._animRequest),Se(document,"touchmove",this._onTouchMove,this),Se(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});me.addInitHook("addHandler","touchZoom",Zu),me.BoxZoom=Bu,me.DoubleClickZoom=zu,me.Drag=Hu,me.Keyboard=Vu,me.ScrollWheelZoom=Gu,me.TapHold=Wu,me.TouchZoom=Zu,e.Bounds=nt,e.Browser=Gt,e.CRS=gt,e.Canvas=Ou,e.Circle=Al,e.CircleMarker=Ho,e.Class=X,e.Control=qn,e.DivIcon=Iu,e.DivOverlay=ci,e.DomEvent=Lp,e.DomUtil=Tp,e.Draggable=zi,e.Evented=Mt,e.FeatureGroup=bi,e.GeoJSON=Si,e.GridLayer=qr,e.Handler=li,e.Icon=Ds,e.ImageOverlay=Xo,e.LatLng=Y,e.LatLngBounds=at,e.Layer=$n,e.LayerGroup=Is,e.LineUtil=Hp,e.Map=me,e.Marker=zo,e.Mixin=Op,e.Path=Hi,e.Point=Z,e.PolyUtil=Up,e.Polygon=Ns,e.Polyline=wi,e.Popup=qo,e.PosAnimation=pu,e.Projection=Vp,e.Rectangle=Fu,e.Renderer=Ei,e.SVG=Yr,e.SVGOverlay=Ru,e.TileLayer=Us,e.Tooltip=$o,e.Transformation=$,e.Util=F,e.VideoOverlay=Cu,e.bind=l,e.bounds=J,e.canvas=Uu,e.circle=jp,e.circleMarker=Yp,e.control=Wr,e.divIcon=rm,e.extend=r,e.featureGroup=Xp,e.geoJSON=Pu,e.geoJson=Qp,e.gridLayer=om,e.icon=qp,e.imageOverlay=tm,e.latLng=dt,e.latLngBounds=V,e.layerGroup=Zp,e.map=Pp,e.marker=$p,e.point=G,e.polygon=Jp,e.polyline=Kp,e.popup=im,e.rectangle=cm,e.setOptions=w,e.stamp=h,e.svg=ku,e.svgOverlay=nm,e.tileLayer=Du,e.tooltip=sm,e.transformation=st,e.version=n,e.videoOverlay=em;var hm=window.L;e.noConflict=function(){return window.L=hm,this},window.L=e})})(yc,yc.exports);var wm=yc.exports;const Ae=bm(wm),Bt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};let Ao=null,Vt,Qe=null,Dn=null,Di=null,Be=null,Fe=null,zn=[],sn=[],Ke=null,vn=null,jr=null,cr="none",Fs=[];const Sm={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function Em(s){s&&(Ao=s);const t=Ae.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Ae.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Ae.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),r=Ae.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),a=Ae.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Vt=Ae.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Ae.control.zoom({position:"topright"}).addTo(Vt),Ae.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:r,Voyager:a,"IGN (France)":n},{},{position:"topright"}).addTo(Vt),new ResizeObserver(()=>Vt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Vt.invalidateSize(),300),Rm(),Lm(),Im(),Dm(),Cm()}function Yu(s,t){return[[s.lat,s.lng],[s.lat,t.lng],[t.lat,t.lng],[t.lat,s.lng]]}function ju(s,t){const e=(s.lat+t.lat)/2,n=Math.abs(t.lat-s.lat)*111320,r=Math.abs(t.lng-s.lng)*111320*Math.cos(e*Math.PI/180),a=Math.min(n,r),l=a/111320,c=a/(111320*Math.cos(e*Math.PI/180)),h=Math.min(s.lat,t.lat),d=Math.min(s.lng,t.lng);return[[h,d],[h,d+c],[h+l,d+c],[h+l,d]]}function Ku(s,t,e=80){const n=s.distanceTo(t);return Array.from({length:e},(r,a)=>{const l=a/e*Math.PI*2;return[s.lat+n*Math.cos(l)/111320,s.lng+n*Math.sin(l)/(111320*Math.cos(s.lat*Math.PI/180))]})}function Ju(s,t){const e=s.distanceTo(t);return Array.from({length:6},(n,r)=>{const a=r/6*Math.PI*2-Math.PI/6;return[s.lat+e*Math.cos(a)/111320,s.lng+e*Math.sin(a)/(111320*Math.cos(s.lat*Math.PI/180))]})}function nf(s){Be&&Be!==s&&(Fe=null,zn=[],sn=[],Ke&&(Vt.removeLayer(Ke),Ke=null),vn&&(Vt.removeLayer(vn),vn=null)),Be=s,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===s)}),Vt.getContainer().classList.toggle("dm",!!s);const t=document.getElementById("dch");t.style.display=s?"block":"none",s&&(t.textContent=Sm[s]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=s==="trace"?"block":"none",s!=="trace"&&(e.textContent="0 points tracés"),!s){const n=document.getElementById("snap");n&&(n.style.display="none")}}function Ra(s=!0){Ke&&(Vt.removeLayer(Ke),Ke=null),vn&&(Vt.removeLayer(vn),vn=null),Fe=null,zn=[],sn=[],s&&nf(null)}function Ia(s,t){return t?Vt.latLngToContainerPoint(s).distanceTo(Vt.latLngToContainerPoint(t)):9999}function Qu(s){const t=[];zn.length>2&&t.push(zn[0]),sn.length>2&&t.push(sn[0]),Di&&t.push(Di.getLatLng());let e=null,n=9999;for(const r of t){const a=Ia(s,r);a<18&&a<n&&(n=a,e=r)}return e}function Tm(s,t){const e=document.getElementById("snap");if(!e)return;if(!t||Ia(s,t)>18){e.style.display="none";return}const n=Vt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function Am(){document.getElementById("zone-controls")?.classList.add("visible"),xc()}function sf(){document.getElementById("zone-controls")?.classList.remove("visible"),rf("none")}function xc(){if(!Bt.bounds)return;const s=document.getElementById("zone-controls");if(!s)return;const t=Ae.latLng(Bt.bounds.maxLat,Bt.bounds.maxLon),e=Vt.latLngToContainerPoint(t),n=40;s.style.left=e.x+10+"px",s.style.top=Math.max(10,e.y-n/2)+"px"}function rf(s){cr==="move"&&s!=="move"&&(Vt.dragging.enable(),Vt.getContainer().style.cursor=""),cr=s,document.getElementById("zc-move")?.classList.toggle("active",s==="move"),s==="move"&&(Vt.dragging.disable(),Vt.getContainer().style.cursor="grab")}function of(s){Qe&&(Vt.removeLayer(Qe),Qe=null),Qe=Ae.polygon(s,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Vt);const t=s.map(h=>h[0]),e=s.map(h=>h[1]);Bt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(Bt.bounds.minLat+Bt.bounds.maxLat)/2,r=(Bt.bounds.maxLon-Bt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,a=(Bt.bounds.maxLat-Bt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(a,r);Bt.wMm=Math.round(r*c),Bt.dMm=Math.round(a*c),Ao?.()}function th(s){if(!Bt.zonePts)return;const t=Bt.zonePts.map(l=>l[0]),e=Bt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,r=(Math.min(...e)+Math.max(...e))/2,a=Bt.zonePts.map(([l,c])=>[n+(l-n)*s,r+(c-r)*s]);Bt.zonePts=a,of(a)}function Lm(){document.getElementById("zc-delete")?.addEventListener("click",()=>{Qe&&(Vt.removeLayer(Qe),Qe=null),Bt.bounds=null,Bt.zonePts=null,sf(),Ao?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>th(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>th(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{rf(cr==="move"?"none":"move")});let s=null;Vt.getContainer().addEventListener("mousedown",t=>{cr!=="move"||!Bt.zonePts||(s={x:t.clientX,y:t.clientY},Fs=Bt.zonePts.map(e=>[e[0],e[1]]),Vt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(cr!=="move"||!s||!Fs.length)return;const e=Vt.getContainer().getBoundingClientRect(),n=Vt.containerPointToLatLng(Ae.point(s.x-e.left,s.y-e.top)),r=Vt.containerPointToLatLng(Ae.point(t.clientX-e.left,t.clientY-e.top)),a=r.lat-n.lat,l=r.lng-n.lng,c=Fs.map(([h,d])=>[h+a,d+l]);Qe&&(Vt.removeLayer(Qe),Qe=null),Qe=Ae.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Vt)}),document.addEventListener("mouseup",t=>{if(cr!=="move"||!s||!Fs.length)return;const e=Vt.getContainer().getBoundingClientRect(),n=Vt.containerPointToLatLng(Ae.point(s.x-e.left,s.y-e.top)),r=Vt.containerPointToLatLng(Ae.point(t.clientX-e.left,t.clientY-e.top)),a=r.lat-n.lat,l=r.lng-n.lng,c=Fs.map(([h,d])=>[h+a,d+l]);s=null,Fs=[],Bt.zonePts=c,of(c),xc(),Vt.getContainer().style.cursor="grab"}),Vt.on("move zoom moveend zoomend",xc)}function Kr(s,t){Qe&&(Vt.removeLayer(Qe),Qe=null),Qe=Ae.polygon(s,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Vt);const e=s.map(d=>d[0]),n=s.map(d=>d[1]);Bt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},Bt.zonePts=s,Bt.zoneType=t;const r=(Bt.bounds.minLat+Bt.bounds.maxLat)/2,a=(Bt.bounds.maxLon-Bt.bounds.minLon)*Math.cos(r*Math.PI/180)*111320,l=(Bt.bounds.maxLat-Bt.bounds.minLat)*111320,h=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,a);Bt.realW=a,Bt.realH=l,Bt.wMm=Math.round(a*h),Bt.dMm=Math.round(l*h),Ao?.(),Am(),Ra()}function Pm(){Dn&&(Vt.removeLayer(Dn),Dn=null),!(sn.length<2)&&(Dn=Ae.polyline(sn,{color:"#ff0000",weight:4,opacity:.9}).addTo(Vt))}function eh(s){const t=document.getElementById("snap");if(t&&(t.style.display="none"),vn&&(Vt.removeLayer(vn),vn=null),s.length<2){Ra();return}Bt.gpxPoints=s.map(n=>({lat:n.lat,lon:n.lng})),af(),lf(`✏️ ${s.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),Ra()}function af(){Dn&&(Vt.removeLayer(Dn),Dn=null),!(Bt.gpxPoints.length<2)&&(Dn=Ae.polyline(Bt.gpxPoints.map(s=>[s.lat,s.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Vt))}function lf(s){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=s,t.style.display="block")}function Cm(){Vt.on("mousemove",s=>{if(!Be)return;const t=s.latlng,e=Qu(t);Tm(t,e??Fe);const n=e??t;if((Be==="rect"||Be==="sq")&&Fe){const r=Be==="sq"?ju(Fe,n):Yu(Fe,n);Ke?Ke.setLatLngs(r):Ke=Ae.polygon(r,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Vt)}else if((Be==="circ"||Be==="hex")&&Fe){const r=Be==="circ"?Ku(Fe,n):Ju(Fe,n);Ke?Ke.setLatLngs(r):Ke=Ae.polygon(r,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Vt)}else if(Be==="poly"&&zn.length>0){const r=[...zn,n];Ke?Ke.setLatLngs(r):Ke=Ae.polyline(r,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Vt)}else if(Be==="trace"&&sn.length>0){const r=[...sn,n];Ke?Ke.setLatLngs(r):Ke=Ae.polyline(r,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Vt)}}),Vt.on("click",s=>{if(!Be)return;const t=s.latlng,e=Qu(t),n=e??t;if(Be==="rect"){if(!Fe){Fe=n;return}Kr(Yu(Fe,n),"rect")}else if(Be==="sq"){if(!Fe){Fe=n;return}Kr(ju(Fe,n),"rect")}else if(Be==="circ"){if(!Fe){Fe=n;return}Kr(Ku(Fe,n),"circ")}else if(Be==="hex"){if(!Fe){Fe=n;return}Kr(Ju(Fe,n),"hex")}else if(Be==="poly"){if(zn.length>2&&Ia(t,zn[0])<18){Kr(zn.map(r=>[r.lat,r.lng]),"poly");return}zn.push(n),zn.length===1&&(vn&&Vt.removeLayer(vn),vn=Ae.circleMarker(zn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Vt))}else Be==="trace"&&(jr&&clearTimeout(jr),jr=setTimeout(()=>{if(sn.length>2&&Ia(t,sn[0])<18){eh(sn);return}sn.push(e??t);const r=sn.length,a=document.getElementById("gpx-ctr");a&&(a.textContent=`${r} point${r>1?"s":""} tracé${r>1?"s":""}`),r===1&&(vn&&Vt.removeLayer(vn),vn=Ae.circleMarker(sn[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Vt)),Pm()},220))}),Vt.on("dblclick",s=>{Be==="trace"&&sn.length>=2&&(jr&&clearTimeout(jr),eh(sn),s.originalEvent.preventDefault())})}function Rm(){["rect","sq","circ","hex","poly","trace"].forEach(s=>{document.getElementById("db-"+s)?.addEventListener("click",()=>{nf(Be===s?null:s)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{Ra(),Qe&&(Vt.removeLayer(Qe),Qe=null),Dn&&(Vt.removeLayer(Dn),Dn=null),Di&&(Vt.removeLayer(Di),Di=null),Bt.bounds=null,Bt.zonePts=null,Bt.gpxPoints=[],sn=[],sf();const s=document.getElementById("gpx-badge");s&&(s.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),Ao?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!Bt.bounds)return;const s=Bt.bounds;Vt.fitBounds([[s.minLat,s.minLon],[s.maxLat,s.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!Bt.gpxPoints.length)return;const s=Bt.gpxPoints.map(e=>e.lat),t=Bt.gpxPoints.map(e=>e.lon);Vt.fitBounds([[Math.min(...s),Math.min(...t)],[Math.max(...s),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function Im(){document.getElementById("gpx-file")?.addEventListener("change",function(){const s=this.files?.[0];if(!s)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),r=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!r.length)return;const a=r.map(h=>({lat:parseFloat(h.getAttribute("lat")),lon:parseFloat(h.getAttribute("lon"))})).filter(h=>!isNaN(h.lat)&&!isNaN(h.lon));if(!a.length)return;Bt.gpxPoints=a,af(),Dn&&Vt.fitBounds(Dn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let h=1;h<a.length;h++){const f=(a[h].lat-a[h-1].lat)*Math.PI/180,m=(a[h].lon-a[h-1].lon)*Math.PI/180,g=Math.sin(f/2)**2+Math.cos(a[h-1].lat*Math.PI/180)*Math.cos(a[h].lat*Math.PI/180)*Math.sin(m/2)**2;l+=6371*2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g))}lf(`📍 ${a.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(s)})}let nh;function Dm(){const s=document.getElementById("srch-input"),t=document.getElementById("srch-drop");s?.addEventListener("input",function(){clearTimeout(nh);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(nh=setTimeout(()=>Nm(e),120))}),s?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function Nm(s){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(s)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((r,a)=>`
      <div class="srch-item" data-i="${a}" data-lat="${r.lat}" data-lon="${r.lon}" data-bb="${r.boundingbox.join(",")}">
        <div class="srch-name">${r.display_name.split(",")[0]}</div>
        <div class="srch-addr">${r.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(r=>{r.addEventListener("mousedown",function(a){a.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),h=this.dataset.bb.split(",").map(Number);Di&&(Vt.removeLayer(Di),Di=null),Di=Ae.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Vt),Vt.fitBounds([[h[0],h[2]],[h[1],h[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=r.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hc="163",Bs={ROTATE:0,DOLLY:1,PAN:2},zs={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Om=0,ih=1,Um=2,cf=1,km=2,Ii=3,es=0,Pn=1,Vn=2,Ji=0,pr=1,sh=2,rh=3,oh=4,Fm=5,ys=100,Bm=101,zm=102,Hm=103,Vm=104,Gm=200,Wm=201,Zm=202,Xm=203,Mc=204,bc=205,qm=206,$m=207,Ym=208,jm=209,Km=210,Jm=211,Qm=212,tg=213,eg=214,ng=0,ig=1,sg=2,Da=3,rg=4,og=5,ag=6,lg=7,Vc=0,cg=1,ug=2,Qi=0,hg=1,dg=2,fg=3,pg=4,mg=5,gg=6,_g=7,uf=300,Mr=301,br=302,wc=303,Sc=304,Ka=306,Ec=1e3,Ms=1001,Tc=1002,Ln=1003,vg=1004,Ko=1005,Jn=1006,Il=1007,bs=1008,ts=1009,yg=1010,xg=1011,hf=1012,df=1013,wr=1014,Ni=1015,Na=1016,ff=1017,pf=1018,Lo=1020,Mg=35902,bg=1021,wg=1022,gi=1023,Sg=1024,Eg=1025,mr=1026,xo=1027,mf=1028,gf=1029,Tg=1030,_f=1031,vf=1033,Dl=33776,Nl=33777,Ol=33778,Ul=33779,ah=35840,lh=35841,ch=35842,uh=35843,yf=36196,hh=37492,dh=37496,fh=37808,ph=37809,mh=37810,gh=37811,_h=37812,vh=37813,yh=37814,xh=37815,Mh=37816,bh=37817,wh=37818,Sh=37819,Eh=37820,Th=37821,kl=36492,Ah=36494,Lh=36495,Ag=36283,Ph=36284,Ch=36285,Rh=36286,Lg=3200,Pg=3201,xf=0,Cg=1,$i="",hi="srgb",ss="srgb-linear",Gc="display-p3",Ja="display-p3-linear",Oa="linear",Te="srgb",Ua="rec709",ka="p3",Hs=7680,Ih=519,Rg=512,Ig=513,Dg=514,Mf=515,Ng=516,Og=517,Ug=518,kg=519,Dh=35044,Nh="300 es",Oi=2e3,Fa=2001;class Ps{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let a=0,l=r.length;a<l;a++)r[a].call(this,t);t.target=null}}}const cn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],uo=Math.PI/180,Ac=180/Math.PI;function Rr(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(cn[s&255]+cn[s>>8&255]+cn[s>>16&255]+cn[s>>24&255]+"-"+cn[t&255]+cn[t>>8&255]+"-"+cn[t>>16&15|64]+cn[t>>24&255]+"-"+cn[e&63|128]+cn[e>>8&255]+"-"+cn[e>>16&255]+cn[e>>24&255]+cn[n&255]+cn[n>>8&255]+cn[n>>16&255]+cn[n>>24&255]).toLowerCase()}function rn(s,t,e){return Math.max(t,Math.min(e,s))}function Fg(s,t){return(s%t+t)%t}function Fl(s,t,e){return(1-e)*s+e*t}function Jr(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Sn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Bg={DEG2RAD:uo};class Et{constructor(t=0,e=0){Et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(rn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),a=this.x-t.x,l=this.y-t.y;return this.x=a*n-l*r+t.x,this.y=a*r+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,e,n,r,a,l,c,h,d){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,l,c,h,d)}set(t,e,n,r,a,l,c,h,d){const f=this.elements;return f[0]=t,f[1]=r,f[2]=c,f[3]=e,f[4]=a,f[5]=h,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,l=n[0],c=n[3],h=n[6],d=n[1],f=n[4],m=n[7],g=n[2],_=n[5],x=n[8],w=r[0],y=r[3],v=r[6],N=r[1],b=r[4],A=r[7],k=r[2],I=r[5],R=r[8];return a[0]=l*w+c*N+h*k,a[3]=l*y+c*b+h*I,a[6]=l*v+c*A+h*R,a[1]=d*w+f*N+m*k,a[4]=d*y+f*b+m*I,a[7]=d*v+f*A+m*R,a[2]=g*w+_*N+x*k,a[5]=g*y+_*b+x*I,a[8]=g*v+_*A+x*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*a*f+n*c*h+r*a*d-r*l*h}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],m=f*l-c*d,g=c*h-f*a,_=d*a-l*h,x=e*m+n*g+r*_;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/x;return t[0]=m*w,t[1]=(r*d-f*n)*w,t[2]=(c*n-r*l)*w,t[3]=g*w,t[4]=(f*e-r*h)*w,t[5]=(r*a-c*e)*w,t[6]=_*w,t[7]=(n*h-d*e)*w,t[8]=(l*e-n*a)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,a,l,c){const h=Math.cos(a),d=Math.sin(a);return this.set(n*h,n*d,-n*(h*l+d*c)+l+t,-r*d,r*h,-r*(-d*l+h*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Bl.makeScale(t,e)),this}rotate(t){return this.premultiply(Bl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bl=new ce;function bf(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ba(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function zg(){const s=Ba("canvas");return s.style.display="block",s}const Oh={};function Hg(s){s in Oh||(Oh[s]=!0,console.warn(s))}const Uh=new ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),kh=new ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Jo={[ss]:{transfer:Oa,primaries:Ua,toReference:s=>s,fromReference:s=>s},[hi]:{transfer:Te,primaries:Ua,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Ja]:{transfer:Oa,primaries:ka,toReference:s=>s.applyMatrix3(kh),fromReference:s=>s.applyMatrix3(Uh)},[Gc]:{transfer:Te,primaries:ka,toReference:s=>s.convertSRGBToLinear().applyMatrix3(kh),fromReference:s=>s.applyMatrix3(Uh).convertLinearToSRGB()}},Vg=new Set([ss,Ja]),xe={enabled:!0,_workingColorSpace:ss,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Vg.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Jo[t].toReference,r=Jo[e].fromReference;return r(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Jo[s].primaries},getTransfer:function(s){return s===$i?Oa:Jo[s].transfer}};function gr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function zl(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Vs;class Gg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vs===void 0&&(Vs=Ba("canvas")),Vs.width=t.width,Vs.height=t.height;const n=Vs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ba("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),a=r.data;for(let l=0;l<a.length;l++)a[l]=gr(a[l]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(gr(e[n]/255)*255):e[n]=gr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wg=0;class wf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Rr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let l=0,c=r.length;l<c;l++)r[l].isDataTexture?a.push(Hl(r[l].image)):a.push(Hl(r[l]))}else a=Hl(r);n.url=a}return e||(t.images[this.uuid]=n),n}}function Hl(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Gg.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Zg=0;class dn extends Ps{constructor(t=dn.DEFAULT_IMAGE,e=dn.DEFAULT_MAPPING,n=Ms,r=Ms,a=Jn,l=bs,c=gi,h=ts,d=dn.DEFAULT_ANISOTROPY,f=$i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=Rr(),this.name="",this.source=new wf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=h,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==uf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ec:t.x=t.x-Math.floor(t.x);break;case Ms:t.x=t.x<0?0:1;break;case Tc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ec:t.y=t.y-Math.floor(t.y);break;case Ms:t.y=t.y<0?0:1;break;case Tc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=uf;dn.DEFAULT_ANISOTROPY=1;class tn{constructor(t=0,e=0,n=0,r=1){tn.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*r+l[12]*a,this.y=l[1]*e+l[5]*n+l[9]*r+l[13]*a,this.z=l[2]*e+l[6]*n+l[10]*r+l[14]*a,this.w=l[3]*e+l[7]*n+l[11]*r+l[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,a;const h=t.elements,d=h[0],f=h[4],m=h[8],g=h[1],_=h[5],x=h[9],w=h[2],y=h[6],v=h[10];if(Math.abs(f-g)<.01&&Math.abs(m-w)<.01&&Math.abs(x-y)<.01){if(Math.abs(f+g)<.1&&Math.abs(m+w)<.1&&Math.abs(x+y)<.1&&Math.abs(d+_+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(d+1)/2,A=(_+1)/2,k=(v+1)/2,I=(f+g)/4,R=(m+w)/4,U=(x+y)/4;return b>A&&b>k?b<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(b),r=I/n,a=R/n):A>k?A<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(A),n=I/r,a=U/r):k<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(k),n=R/a,r=U/a),this.set(n,r,a,e),this}let N=Math.sqrt((y-x)*(y-x)+(m-w)*(m-w)+(g-f)*(g-f));return Math.abs(N)<.001&&(N=1),this.x=(y-x)/N,this.y=(m-w)/N,this.z=(g-f)/N,this.w=Math.acos((d+_+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xg extends Ps{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new tn(0,0,t,e),this.scissorTest=!1,this.viewport=new tn(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const a=new dn(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=a.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new wf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ss extends Xg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sf extends dn{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ms,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qg extends dn{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=Ms,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Es{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,a,l,c){let h=n[r+0],d=n[r+1],f=n[r+2],m=n[r+3];const g=a[l+0],_=a[l+1],x=a[l+2],w=a[l+3];if(c===0){t[e+0]=h,t[e+1]=d,t[e+2]=f,t[e+3]=m;return}if(c===1){t[e+0]=g,t[e+1]=_,t[e+2]=x,t[e+3]=w;return}if(m!==w||h!==g||d!==_||f!==x){let y=1-c;const v=h*g+d*_+f*x+m*w,N=v>=0?1:-1,b=1-v*v;if(b>Number.EPSILON){const k=Math.sqrt(b),I=Math.atan2(k,v*N);y=Math.sin(y*I)/k,c=Math.sin(c*I)/k}const A=c*N;if(h=h*y+g*A,d=d*y+_*A,f=f*y+x*A,m=m*y+w*A,y===1-c){const k=1/Math.sqrt(h*h+d*d+f*f+m*m);h*=k,d*=k,f*=k,m*=k}}t[e]=h,t[e+1]=d,t[e+2]=f,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,r,a,l){const c=n[r],h=n[r+1],d=n[r+2],f=n[r+3],m=a[l],g=a[l+1],_=a[l+2],x=a[l+3];return t[e]=c*x+f*m+h*_-d*g,t[e+1]=h*x+f*g+d*m-c*_,t[e+2]=d*x+f*_+c*g-h*m,t[e+3]=f*x-c*m-h*g-d*_,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,a=t._z,l=t._order,c=Math.cos,h=Math.sin,d=c(n/2),f=c(r/2),m=c(a/2),g=h(n/2),_=h(r/2),x=h(a/2);switch(l){case"XYZ":this._x=g*f*m+d*_*x,this._y=d*_*m-g*f*x,this._z=d*f*x+g*_*m,this._w=d*f*m-g*_*x;break;case"YXZ":this._x=g*f*m+d*_*x,this._y=d*_*m-g*f*x,this._z=d*f*x-g*_*m,this._w=d*f*m+g*_*x;break;case"ZXY":this._x=g*f*m-d*_*x,this._y=d*_*m+g*f*x,this._z=d*f*x+g*_*m,this._w=d*f*m-g*_*x;break;case"ZYX":this._x=g*f*m-d*_*x,this._y=d*_*m+g*f*x,this._z=d*f*x-g*_*m,this._w=d*f*m+g*_*x;break;case"YZX":this._x=g*f*m+d*_*x,this._y=d*_*m+g*f*x,this._z=d*f*x-g*_*m,this._w=d*f*m-g*_*x;break;case"XZY":this._x=g*f*m-d*_*x,this._y=d*_*m-g*f*x,this._z=d*f*x+g*_*m,this._w=d*f*m+g*_*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],a=e[8],l=e[1],c=e[5],h=e[9],d=e[2],f=e[6],m=e[10],g=n+c+m;if(g>0){const _=.5/Math.sqrt(g+1);this._w=.25/_,this._x=(f-h)*_,this._y=(a-d)*_,this._z=(l-r)*_}else if(n>c&&n>m){const _=2*Math.sqrt(1+n-c-m);this._w=(f-h)/_,this._x=.25*_,this._y=(r+l)/_,this._z=(a+d)/_}else if(c>m){const _=2*Math.sqrt(1+c-n-m);this._w=(a-d)/_,this._x=(r+l)/_,this._y=.25*_,this._z=(h+f)/_}else{const _=2*Math.sqrt(1+m-n-c);this._w=(l-r)/_,this._x=(a+d)/_,this._y=(h+f)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(rn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,a=t._z,l=t._w,c=e._x,h=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+r*d-a*h,this._y=r*f+l*h+a*c-n*d,this._z=a*f+l*d+n*h-r*c,this._w=l*f-n*c-r*h-a*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,a=this._z,l=this._w;let c=l*t._w+n*t._x+r*t._y+a*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=r,this._z=a,this;const h=1-c*c;if(h<=Number.EPSILON){const _=1-e;return this._w=_*l+e*this._w,this._x=_*n+e*this._x,this._y=_*r+e*this._y,this._z=_*a+e*this._z,this.normalize(),this}const d=Math.sqrt(h),f=Math.atan2(d,c),m=Math.sin((1-e)*f)/d,g=Math.sin(e*f)/d;return this._w=l*m+this._w*g,this._x=n*m+this._x*g,this._y=r*m+this._y*g,this._z=a*m+this._z*g,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(t=0,e=0,n=0){H.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*r,this.y=a[1]*e+a[4]*n+a[7]*r,this.z=a[2]*e+a[5]*n+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=t.elements,l=1/(a[3]*e+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*r+a[12])*l,this.y=(a[1]*e+a[5]*n+a[9]*r+a[13])*l,this.z=(a[2]*e+a[6]*n+a[10]*r+a[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,a=t.x,l=t.y,c=t.z,h=t.w,d=2*(l*r-c*n),f=2*(c*e-a*r),m=2*(a*n-l*e);return this.x=e+h*d+l*m-c*f,this.y=n+h*f+c*d-a*m,this.z=r+h*m+a*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r,this.y=a[1]*e+a[5]*n+a[9]*r,this.z=a[2]*e+a[6]*n+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,a=t.z,l=e.x,c=e.y,h=e.z;return this.x=r*h-a*c,this.y=a*l-n*h,this.z=n*c-r*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Vl.copy(this).projectOnVector(t),this.sub(Vl)}reflect(t){return this.sub(Vl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(rn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vl=new H,Fh=new Es;class Cs{constructor(t=new H(1/0,1/0,1/0),e=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Yn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Yn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Yn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=a.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,Yn):Yn.fromBufferAttribute(a,l),Yn.applyMatrix4(t.matrixWorld),this.expandByPoint(Yn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qo.copy(n.boundingBox)),Qo.applyMatrix4(t.matrixWorld),this.union(Qo)}const r=t.children;for(let a=0,l=r.length;a<l;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Yn),Yn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qr),ta.subVectors(this.max,Qr),Gs.subVectors(t.a,Qr),Ws.subVectors(t.b,Qr),Zs.subVectors(t.c,Qr),Vi.subVectors(Ws,Gs),Gi.subVectors(Zs,Ws),ds.subVectors(Gs,Zs);let e=[0,-Vi.z,Vi.y,0,-Gi.z,Gi.y,0,-ds.z,ds.y,Vi.z,0,-Vi.x,Gi.z,0,-Gi.x,ds.z,0,-ds.x,-Vi.y,Vi.x,0,-Gi.y,Gi.x,0,-ds.y,ds.x,0];return!Gl(e,Gs,Ws,Zs,ta)||(e=[1,0,0,0,1,0,0,0,1],!Gl(e,Gs,Ws,Zs,ta))?!1:(ea.crossVectors(Vi,Gi),e=[ea.x,ea.y,ea.z],Gl(e,Gs,Ws,Zs,ta))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Yn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Yn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ti=[new H,new H,new H,new H,new H,new H,new H,new H],Yn=new H,Qo=new Cs,Gs=new H,Ws=new H,Zs=new H,Vi=new H,Gi=new H,ds=new H,Qr=new H,ta=new H,ea=new H,fs=new H;function Gl(s,t,e,n,r){for(let a=0,l=s.length-3;a<=l;a+=3){fs.fromArray(s,a);const c=r.x*Math.abs(fs.x)+r.y*Math.abs(fs.y)+r.z*Math.abs(fs.z),h=t.dot(fs),d=e.dot(fs),f=n.dot(fs);if(Math.max(-Math.max(h,d,f),Math.min(h,d,f))>c)return!1}return!0}const $g=new Cs,to=new H,Wl=new H;class Ir{constructor(t=new H,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):$g.setFromPoints(t).getCenter(n);let r=0;for(let a=0,l=t.length;a<l;a++)r=Math.max(r,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;to.subVectors(t,this.center);const e=to.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(to,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(to.copy(t.center).add(Wl)),this.expandByPoint(to.copy(t.center).sub(Wl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ai=new H,Zl=new H,na=new H,Wi=new H,Xl=new H,ia=new H,ql=new H;class Qa{constructor(t=new H,e=new H(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.origin).addScaledVector(this.direction,e),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Zl.copy(t).add(e).multiplyScalar(.5),na.copy(e).sub(t).normalize(),Wi.copy(this.origin).sub(Zl);const a=t.distanceTo(e)*.5,l=-this.direction.dot(na),c=Wi.dot(this.direction),h=-Wi.dot(na),d=Wi.lengthSq(),f=Math.abs(1-l*l);let m,g,_,x;if(f>0)if(m=l*h-c,g=l*c-h,x=a*f,m>=0)if(g>=-x)if(g<=x){const w=1/f;m*=w,g*=w,_=m*(m+l*g+2*c)+g*(l*m+g+2*h)+d}else g=a,m=Math.max(0,-(l*g+c)),_=-m*m+g*(g+2*h)+d;else g=-a,m=Math.max(0,-(l*g+c)),_=-m*m+g*(g+2*h)+d;else g<=-x?(m=Math.max(0,-(-l*a+c)),g=m>0?-a:Math.min(Math.max(-a,-h),a),_=-m*m+g*(g+2*h)+d):g<=x?(m=0,g=Math.min(Math.max(-a,-h),a),_=g*(g+2*h)+d):(m=Math.max(0,-(l*a+c)),g=m>0?a:Math.min(Math.max(-a,-h),a),_=-m*m+g*(g+2*h)+d);else g=l>0?-a:a,m=Math.max(0,-(l*g+c)),_=-m*m+g*(g+2*h)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,m),r&&r.copy(Zl).addScaledVector(na,g),_}intersectSphere(t,e){Ai.subVectors(t.center,this.origin);const n=Ai.dot(this.direction),r=Ai.dot(Ai)-n*n,a=t.radius*t.radius;if(r>a)return null;const l=Math.sqrt(a-r),c=n-l,h=n+l;return h<0?null:c<0?this.at(h,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,a,l,c,h;const d=1/this.direction.x,f=1/this.direction.y,m=1/this.direction.z,g=this.origin;return d>=0?(n=(t.min.x-g.x)*d,r=(t.max.x-g.x)*d):(n=(t.max.x-g.x)*d,r=(t.min.x-g.x)*d),f>=0?(a=(t.min.y-g.y)*f,l=(t.max.y-g.y)*f):(a=(t.max.y-g.y)*f,l=(t.min.y-g.y)*f),n>l||a>r||((a>n||isNaN(n))&&(n=a),(l<r||isNaN(r))&&(r=l),m>=0?(c=(t.min.z-g.z)*m,h=(t.max.z-g.z)*m):(c=(t.max.z-g.z)*m,h=(t.min.z-g.z)*m),n>h||c>r)||((c>n||n!==n)&&(n=c),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,n,r,a){Xl.subVectors(e,t),ia.subVectors(n,t),ql.crossVectors(Xl,ia);let l=this.direction.dot(ql),c;if(l>0){if(r)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Wi.subVectors(this.origin,t);const h=c*this.direction.dot(ia.crossVectors(Wi,ia));if(h<0)return null;const d=c*this.direction.dot(Xl.cross(Wi));if(d<0||h+d>l)return null;const f=-c*Wi.dot(ql);return f<0?null:this.at(f/l,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Me{constructor(t,e,n,r,a,l,c,h,d,f,m,g,_,x,w,y){Me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,l,c,h,d,f,m,g,_,x,w,y)}set(t,e,n,r,a,l,c,h,d,f,m,g,_,x,w,y){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=r,v[1]=a,v[5]=l,v[9]=c,v[13]=h,v[2]=d,v[6]=f,v[10]=m,v[14]=g,v[3]=_,v[7]=x,v[11]=w,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Xs.setFromMatrixColumn(t,0).length(),a=1/Xs.setFromMatrixColumn(t,1).length(),l=1/Xs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,a=t.z,l=Math.cos(n),c=Math.sin(n),h=Math.cos(r),d=Math.sin(r),f=Math.cos(a),m=Math.sin(a);if(t.order==="XYZ"){const g=l*f,_=l*m,x=c*f,w=c*m;e[0]=h*f,e[4]=-h*m,e[8]=d,e[1]=_+x*d,e[5]=g-w*d,e[9]=-c*h,e[2]=w-g*d,e[6]=x+_*d,e[10]=l*h}else if(t.order==="YXZ"){const g=h*f,_=h*m,x=d*f,w=d*m;e[0]=g+w*c,e[4]=x*c-_,e[8]=l*d,e[1]=l*m,e[5]=l*f,e[9]=-c,e[2]=_*c-x,e[6]=w+g*c,e[10]=l*h}else if(t.order==="ZXY"){const g=h*f,_=h*m,x=d*f,w=d*m;e[0]=g-w*c,e[4]=-l*m,e[8]=x+_*c,e[1]=_+x*c,e[5]=l*f,e[9]=w-g*c,e[2]=-l*d,e[6]=c,e[10]=l*h}else if(t.order==="ZYX"){const g=l*f,_=l*m,x=c*f,w=c*m;e[0]=h*f,e[4]=x*d-_,e[8]=g*d+w,e[1]=h*m,e[5]=w*d+g,e[9]=_*d-x,e[2]=-d,e[6]=c*h,e[10]=l*h}else if(t.order==="YZX"){const g=l*h,_=l*d,x=c*h,w=c*d;e[0]=h*f,e[4]=w-g*m,e[8]=x*m+_,e[1]=m,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=_*m+x,e[10]=g-w*m}else if(t.order==="XZY"){const g=l*h,_=l*d,x=c*h,w=c*d;e[0]=h*f,e[4]=-m,e[8]=d*f,e[1]=g*m+w,e[5]=l*f,e[9]=_*m-x,e[2]=x*m-_,e[6]=c*f,e[10]=w*m+g}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Yg,t,jg)}lookAt(t,e,n){const r=this.elements;return Cn.subVectors(t,e),Cn.lengthSq()===0&&(Cn.z=1),Cn.normalize(),Zi.crossVectors(n,Cn),Zi.lengthSq()===0&&(Math.abs(n.z)===1?Cn.x+=1e-4:Cn.z+=1e-4,Cn.normalize(),Zi.crossVectors(n,Cn)),Zi.normalize(),sa.crossVectors(Cn,Zi),r[0]=Zi.x,r[4]=sa.x,r[8]=Cn.x,r[1]=Zi.y,r[5]=sa.y,r[9]=Cn.y,r[2]=Zi.z,r[6]=sa.z,r[10]=Cn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,l=n[0],c=n[4],h=n[8],d=n[12],f=n[1],m=n[5],g=n[9],_=n[13],x=n[2],w=n[6],y=n[10],v=n[14],N=n[3],b=n[7],A=n[11],k=n[15],I=r[0],R=r[4],U=r[8],P=r[12],E=r[1],B=r[5],q=r[9],F=r[13],X=r[2],et=r[6],K=r[10],Mt=r[14],Z=r[3],vt=r[7],G=r[11],nt=r[15];return a[0]=l*I+c*E+h*X+d*Z,a[4]=l*R+c*B+h*et+d*vt,a[8]=l*U+c*q+h*K+d*G,a[12]=l*P+c*F+h*Mt+d*nt,a[1]=f*I+m*E+g*X+_*Z,a[5]=f*R+m*B+g*et+_*vt,a[9]=f*U+m*q+g*K+_*G,a[13]=f*P+m*F+g*Mt+_*nt,a[2]=x*I+w*E+y*X+v*Z,a[6]=x*R+w*B+y*et+v*vt,a[10]=x*U+w*q+y*K+v*G,a[14]=x*P+w*F+y*Mt+v*nt,a[3]=N*I+b*E+A*X+k*Z,a[7]=N*R+b*B+A*et+k*vt,a[11]=N*U+b*q+A*K+k*G,a[15]=N*P+b*F+A*Mt+k*nt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],a=t[12],l=t[1],c=t[5],h=t[9],d=t[13],f=t[2],m=t[6],g=t[10],_=t[14],x=t[3],w=t[7],y=t[11],v=t[15];return x*(+a*h*m-r*d*m-a*c*g+n*d*g+r*c*_-n*h*_)+w*(+e*h*_-e*d*g+a*l*g-r*l*_+r*d*f-a*h*f)+y*(+e*d*m-e*c*_-a*l*m+n*l*_+a*c*f-n*d*f)+v*(-r*c*f-e*h*m+e*c*g+r*l*m-n*l*g+n*h*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],m=t[9],g=t[10],_=t[11],x=t[12],w=t[13],y=t[14],v=t[15],N=m*y*d-w*g*d+w*h*_-c*y*_-m*h*v+c*g*v,b=x*g*d-f*y*d-x*h*_+l*y*_+f*h*v-l*g*v,A=f*w*d-x*m*d+x*c*_-l*w*_-f*c*v+l*m*v,k=x*m*h-f*w*h-x*c*g+l*w*g+f*c*y-l*m*y,I=e*N+n*b+r*A+a*k;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/I;return t[0]=N*R,t[1]=(w*g*a-m*y*a-w*r*_+n*y*_+m*r*v-n*g*v)*R,t[2]=(c*y*a-w*h*a+w*r*d-n*y*d-c*r*v+n*h*v)*R,t[3]=(m*h*a-c*g*a-m*r*d+n*g*d+c*r*_-n*h*_)*R,t[4]=b*R,t[5]=(f*y*a-x*g*a+x*r*_-e*y*_-f*r*v+e*g*v)*R,t[6]=(x*h*a-l*y*a-x*r*d+e*y*d+l*r*v-e*h*v)*R,t[7]=(l*g*a-f*h*a+f*r*d-e*g*d-l*r*_+e*h*_)*R,t[8]=A*R,t[9]=(x*m*a-f*w*a-x*n*_+e*w*_+f*n*v-e*m*v)*R,t[10]=(l*w*a-x*c*a+x*n*d-e*w*d-l*n*v+e*c*v)*R,t[11]=(f*c*a-l*m*a-f*n*d+e*m*d+l*n*_-e*c*_)*R,t[12]=k*R,t[13]=(f*w*r-x*m*r+x*n*g-e*w*g-f*n*y+e*m*y)*R,t[14]=(x*c*r-l*w*r-x*n*h+e*w*h+l*n*y-e*c*y)*R,t[15]=(l*m*r-f*c*r+f*n*h-e*m*h-l*n*g+e*c*g)*R,this}scale(t){const e=this.elements,n=t.x,r=t.y,a=t.z;return e[0]*=n,e[4]*=r,e[8]*=a,e[1]*=n,e[5]*=r,e[9]*=a,e[2]*=n,e[6]*=r,e[10]*=a,e[3]*=n,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),a=1-n,l=t.x,c=t.y,h=t.z,d=a*l,f=a*c;return this.set(d*l+n,d*c-r*h,d*h+r*c,0,d*c+r*h,f*c+n,f*h-r*l,0,d*h-r*c,f*h+r*l,a*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,a,l){return this.set(1,n,a,0,t,1,l,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,a=e._x,l=e._y,c=e._z,h=e._w,d=a+a,f=l+l,m=c+c,g=a*d,_=a*f,x=a*m,w=l*f,y=l*m,v=c*m,N=h*d,b=h*f,A=h*m,k=n.x,I=n.y,R=n.z;return r[0]=(1-(w+v))*k,r[1]=(_+A)*k,r[2]=(x-b)*k,r[3]=0,r[4]=(_-A)*I,r[5]=(1-(g+v))*I,r[6]=(y+N)*I,r[7]=0,r[8]=(x+b)*R,r[9]=(y-N)*R,r[10]=(1-(g+w))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let a=Xs.set(r[0],r[1],r[2]).length();const l=Xs.set(r[4],r[5],r[6]).length(),c=Xs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],jn.copy(this);const d=1/a,f=1/l,m=1/c;return jn.elements[0]*=d,jn.elements[1]*=d,jn.elements[2]*=d,jn.elements[4]*=f,jn.elements[5]*=f,jn.elements[6]*=f,jn.elements[8]*=m,jn.elements[9]*=m,jn.elements[10]*=m,e.setFromRotationMatrix(jn),n.x=a,n.y=l,n.z=c,this}makePerspective(t,e,n,r,a,l,c=Oi){const h=this.elements,d=2*a/(e-t),f=2*a/(n-r),m=(e+t)/(e-t),g=(n+r)/(n-r);let _,x;if(c===Oi)_=-(l+a)/(l-a),x=-2*l*a/(l-a);else if(c===Fa)_=-l/(l-a),x=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=d,h[4]=0,h[8]=m,h[12]=0,h[1]=0,h[5]=f,h[9]=g,h[13]=0,h[2]=0,h[6]=0,h[10]=_,h[14]=x,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,r,a,l,c=Oi){const h=this.elements,d=1/(e-t),f=1/(n-r),m=1/(l-a),g=(e+t)*d,_=(n+r)*f;let x,w;if(c===Oi)x=(l+a)*m,w=-2*m;else if(c===Fa)x=a*m,w=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=2*d,h[4]=0,h[8]=0,h[12]=-g,h[1]=0,h[5]=2*f,h[9]=0,h[13]=-_,h[2]=0,h[6]=0,h[10]=w,h[14]=-x,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Xs=new H,jn=new Me,Yg=new H(0,0,0),jg=new H(1,1,1),Zi=new H,sa=new H,Cn=new H,Bh=new Me,zh=new Es;class yi{constructor(t=0,e=0,n=0,r=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,a=r[0],l=r[4],c=r[8],h=r[1],d=r[5],f=r[9],m=r[2],g=r[6],_=r[10];switch(e){case"XYZ":this._y=Math.asin(rn(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,_),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-rn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,_),this._z=Math.atan2(h,d)):(this._y=Math.atan2(-m,a),this._z=0);break;case"ZXY":this._x=Math.asin(rn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-m,_),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(h,a));break;case"ZYX":this._y=Math.asin(-rn(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(g,_),this._z=Math.atan2(h,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(rn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-m,a)):(this._x=0,this._y=Math.atan2(c,_));break;case"XZY":this._z=Math.asin(-rn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(c,a)):(this._x=Math.atan2(-f,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Bh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return zh.setFromEuler(this),this.setFromQuaternion(zh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class Wc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Kg=0;const Hh=new H,qs=new Es,Li=new Me,ra=new H,eo=new H,Jg=new H,Qg=new Es,Vh=new H(1,0,0),Gh=new H(0,1,0),Wh=new H(0,0,1),Zh={type:"added"},t_={type:"removed"},$s={type:"childadded",child:null},$l={type:"childremoved",child:null};class en extends Ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=Rr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=en.DEFAULT_UP.clone();const t=new H,e=new yi,n=new Es,r=new H(1,1,1);function a(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Me},normalMatrix:{value:new ce}}),this.matrix=new Me,this.matrixWorld=new Me,this.matrixAutoUpdate=en.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.multiply(qs),this}rotateOnWorldAxis(t,e){return qs.setFromAxisAngle(t,e),this.quaternion.premultiply(qs),this}rotateX(t){return this.rotateOnAxis(Vh,t)}rotateY(t){return this.rotateOnAxis(Gh,t)}rotateZ(t){return this.rotateOnAxis(Wh,t)}translateOnAxis(t,e){return Hh.copy(t).applyQuaternion(this.quaternion),this.position.add(Hh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Vh,t)}translateY(t){return this.translateOnAxis(Gh,t)}translateZ(t){return this.translateOnAxis(Wh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ra.copy(t):ra.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),eo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(eo,ra,this.up):Li.lookAt(ra,eo,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),qs.setFromRotationMatrix(Li),this.quaternion.premultiply(qs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zh),$s.child=t,this.dispatchEvent($s),$s.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(t_),$l.child=t,this.dispatchEvent($l),$l.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Li.multiply(t.parent.matrixWorld)),t.applyMatrix4(Li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zh),$s.child=t,this.dispatchEvent($s),$s.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,t,Jg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(eo,Qg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const a=e[n];(a.matrixWorldAutoUpdate===!0||t===!0)&&a.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++){const c=r[a];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(c,h){return c[h.uuid]===void 0&&(c[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const h=c.shapes;if(Array.isArray(h))for(let d=0,f=h.length;d<f;d++){const m=h[d];a(t.shapes,m)}else a(t.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let h=0,d=this.material.length;h<d;h++)c.push(a(t.materials,this.material[h]));r.material=c}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let c=0;c<this.children.length;c++)r.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let c=0;c<this.animations.length;c++){const h=this.animations[c];r.animations.push(a(t.animations,h))}}if(e){const c=l(t.geometries),h=l(t.materials),d=l(t.textures),f=l(t.images),m=l(t.shapes),g=l(t.skeletons),_=l(t.animations),x=l(t.nodes);c.length>0&&(n.geometries=c),h.length>0&&(n.materials=h),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),m.length>0&&(n.shapes=m),g.length>0&&(n.skeletons=g),_.length>0&&(n.animations=_),x.length>0&&(n.nodes=x)}return n.object=r,n;function l(c){const h=[];for(const d in c){const f=c[d];delete f.metadata,h.push(f)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}en.DEFAULT_UP=new H(0,1,0);en.DEFAULT_MATRIX_AUTO_UPDATE=!0;en.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Kn=new H,Pi=new H,Yl=new H,Ci=new H,Ys=new H,js=new H,Xh=new H,jl=new H,Kl=new H,Jl=new H;class Qn{constructor(t=new H,e=new H,n=new H){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Kn.subVectors(t,e),r.cross(Kn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,n,r,a){Kn.subVectors(r,e),Pi.subVectors(n,e),Yl.subVectors(t,e);const l=Kn.dot(Kn),c=Kn.dot(Pi),h=Kn.dot(Yl),d=Pi.dot(Pi),f=Pi.dot(Yl),m=l*d-c*c;if(m===0)return a.set(0,0,0),null;const g=1/m,_=(d*h-c*f)*g,x=(l*f-c*h)*g;return a.set(1-_-x,x,_)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,Ci)===null?!1:Ci.x>=0&&Ci.y>=0&&Ci.x+Ci.y<=1}static getInterpolation(t,e,n,r,a,l,c,h){return this.getBarycoord(t,e,n,r,Ci)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(a,Ci.x),h.addScaledVector(l,Ci.y),h.addScaledVector(c,Ci.z),h)}static isFrontFacing(t,e,n,r){return Kn.subVectors(n,e),Pi.subVectors(t,e),Kn.cross(Pi).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Kn.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),Kn.cross(Pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,a){return Qn.getInterpolation(t,this.a,this.b,this.c,e,n,r,a)}containsPoint(t){return Qn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,a=this.c;let l,c;Ys.subVectors(r,n),js.subVectors(a,n),jl.subVectors(t,n);const h=Ys.dot(jl),d=js.dot(jl);if(h<=0&&d<=0)return e.copy(n);Kl.subVectors(t,r);const f=Ys.dot(Kl),m=js.dot(Kl);if(f>=0&&m<=f)return e.copy(r);const g=h*m-f*d;if(g<=0&&h>=0&&f<=0)return l=h/(h-f),e.copy(n).addScaledVector(Ys,l);Jl.subVectors(t,a);const _=Ys.dot(Jl),x=js.dot(Jl);if(x>=0&&_<=x)return e.copy(a);const w=_*d-h*x;if(w<=0&&d>=0&&x<=0)return c=d/(d-x),e.copy(n).addScaledVector(js,c);const y=f*x-_*m;if(y<=0&&m-f>=0&&_-x>=0)return Xh.subVectors(a,r),c=(m-f)/(m-f+(_-x)),e.copy(r).addScaledVector(Xh,c);const v=1/(y+w+g);return l=w*v,c=g*v,e.copy(n).addScaledVector(Ys,l).addScaledVector(js,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ef={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},oa={h:0,s:0,l:0};function Ql(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ne{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=xe.workingColorSpace){return this.r=t,this.g=e,this.b=n,xe.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=xe.workingColorSpace){if(t=Fg(t,1),e=rn(e,0,1),n=rn(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,l=2*n-a;this.r=Ql(l,a,t+1/3),this.g=Ql(l,a,t),this.b=Ql(l,a,t-1/3)}return xe.toWorkingColorSpace(this,r),this}setStyle(t,e=hi){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const l=r[1],c=r[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hi){const n=Ef[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=gr(t.r),this.g=gr(t.g),this.b=gr(t.b),this}copyLinearToSRGB(t){return this.r=zl(t.r),this.g=zl(t.g),this.b=zl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hi){return xe.fromWorkingColorSpace(un.copy(this),t),Math.round(rn(un.r*255,0,255))*65536+Math.round(rn(un.g*255,0,255))*256+Math.round(rn(un.b*255,0,255))}getHexString(t=hi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.fromWorkingColorSpace(un.copy(this),e);const n=un.r,r=un.g,a=un.b,l=Math.max(n,r,a),c=Math.min(n,r,a);let h,d;const f=(c+l)/2;if(c===l)h=0,d=0;else{const m=l-c;switch(d=f<=.5?m/(l+c):m/(2-l-c),l){case n:h=(r-a)/m+(r<a?6:0);break;case r:h=(a-n)/m+2;break;case a:h=(n-r)/m+4;break}h/=6}return t.h=h,t.s=d,t.l=f,t}getRGB(t,e=xe.workingColorSpace){return xe.fromWorkingColorSpace(un.copy(this),e),t.r=un.r,t.g=un.g,t.b=un.b,t}getStyle(t=hi){xe.fromWorkingColorSpace(un.copy(this),t);const e=un.r,n=un.g,r=un.b;return t!==hi?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(Xi),this.setHSL(Xi.h+t,Xi.s+e,Xi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Xi),t.getHSL(oa);const n=Fl(Xi.h,oa.h,e),r=Fl(Xi.s,oa.s,e),a=Fl(Xi.l,oa.l,e);return this.setHSL(n,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*r,this.g=a[1]*e+a[4]*n+a[7]*r,this.b=a[2]*e+a[5]*n+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const un=new ne;ne.NAMES=Ef;let e_=0;class Dr extends Ps{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=Rr(),this.name="",this.type="Material",this.blending=pr,this.side=es,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mc,this.blendDst=bc,this.blendEquation=ys,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=Da,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hs,this.stencilZFail=Hs,this.stencilZPass=Hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==pr&&(n.blending=this.blending),this.side!==es&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Mc&&(n.blendSrc=this.blendSrc),this.blendDst!==bc&&(n.blendDst=this.blendDst),this.blendEquation!==ys&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Da&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hs&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hs&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hs&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}if(e){const a=r(t.textures),l=r(t.images);a.length>0&&(n.textures=a),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Tf extends Dr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ze=new H,aa=new Et;class ni{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Dh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Hg("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)aa.fromBufferAttribute(this,e),aa.applyMatrix3(t),this.setXY(e,aa.x,aa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix3(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.applyMatrix4(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.applyNormalMatrix(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ze.fromBufferAttribute(this,e),Ze.transformDirection(t),this.setXYZ(e,Ze.x,Ze.y,Ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Jr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Sn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Jr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Jr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Jr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Jr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Sn(e,this.array),n=Sn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=Sn(e,this.array),n=Sn(n,this.array),r=Sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,a){return t*=this.itemSize,this.normalized&&(e=Sn(e,this.array),n=Sn(n,this.array),r=Sn(r,this.array),a=Sn(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Dh&&(t.usage=this.usage),t}}class Af extends ni{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Lf extends ni{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ze extends ni{constructor(t,e,n){super(new Float32Array(t),e,n)}}let n_=0;const Bn=new Me,tc=new en,Ks=new H,Rn=new Cs,no=new Cs,je=new H;class an extends Ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:n_++}),this.uuid=Rr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bf(t)?Lf:Af)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new ce().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Bn.makeRotationFromQuaternion(t),this.applyMatrix4(Bn),this}rotateX(t){return Bn.makeRotationX(t),this.applyMatrix4(Bn),this}rotateY(t){return Bn.makeRotationY(t),this.applyMatrix4(Bn),this}rotateZ(t){return Bn.makeRotationZ(t),this.applyMatrix4(Bn),this}translate(t,e,n){return Bn.makeTranslation(t,e,n),this.applyMatrix4(Bn),this}scale(t,e,n){return Bn.makeScale(t,e,n),this.applyMatrix4(Bn),this}lookAt(t){return tc.lookAt(t),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ks).negate(),this.translate(Ks.x,Ks.y,Ks.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];e.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new ze(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const a=e[n];Rn.setFromBufferAttribute(a),this.morphTargetsRelative?(je.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(je),je.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(je)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ir);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(t){const n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(t),e)for(let a=0,l=e.length;a<l;a++){const c=e[a];no.setFromBufferAttribute(c),this.morphTargetsRelative?(je.addVectors(Rn.min,no.min),Rn.expandByPoint(je),je.addVectors(Rn.max,no.max),Rn.expandByPoint(je)):(Rn.expandByPoint(no.min),Rn.expandByPoint(no.max))}Rn.getCenter(n);let r=0;for(let a=0,l=t.count;a<l;a++)je.fromBufferAttribute(t,a),r=Math.max(r,n.distanceToSquared(je));if(e)for(let a=0,l=e.length;a<l;a++){const c=e[a],h=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)je.fromBufferAttribute(c,d),h&&(Ks.fromBufferAttribute(t,d),je.add(Ks)),r=Math.max(r,n.distanceToSquared(je))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ni(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],h=[];for(let U=0;U<n.count;U++)c[U]=new H,h[U]=new H;const d=new H,f=new H,m=new H,g=new Et,_=new Et,x=new Et,w=new H,y=new H;function v(U,P,E){d.fromBufferAttribute(n,U),f.fromBufferAttribute(n,P),m.fromBufferAttribute(n,E),g.fromBufferAttribute(a,U),_.fromBufferAttribute(a,P),x.fromBufferAttribute(a,E),f.sub(d),m.sub(d),_.sub(g),x.sub(g);const B=1/(_.x*x.y-x.x*_.y);isFinite(B)&&(w.copy(f).multiplyScalar(x.y).addScaledVector(m,-_.y).multiplyScalar(B),y.copy(m).multiplyScalar(_.x).addScaledVector(f,-x.x).multiplyScalar(B),c[U].add(w),c[P].add(w),c[E].add(w),h[U].add(y),h[P].add(y),h[E].add(y))}let N=this.groups;N.length===0&&(N=[{start:0,count:t.count}]);for(let U=0,P=N.length;U<P;++U){const E=N[U],B=E.start,q=E.count;for(let F=B,X=B+q;F<X;F+=3)v(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const b=new H,A=new H,k=new H,I=new H;function R(U){k.fromBufferAttribute(r,U),I.copy(k);const P=c[U];b.copy(P),b.sub(k.multiplyScalar(k.dot(P))).normalize(),A.crossVectors(I,P);const B=A.dot(h[U])<0?-1:1;l.setXYZW(U,b.x,b.y,b.z,B)}for(let U=0,P=N.length;U<P;++U){const E=N[U],B=E.start,q=E.count;for(let F=B,X=B+q;F<X;F+=3)R(t.getX(F+0)),R(t.getX(F+1)),R(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ni(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let g=0,_=n.count;g<_;g++)n.setXYZ(g,0,0,0);const r=new H,a=new H,l=new H,c=new H,h=new H,d=new H,f=new H,m=new H;if(t)for(let g=0,_=t.count;g<_;g+=3){const x=t.getX(g+0),w=t.getX(g+1),y=t.getX(g+2);r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,w),l.fromBufferAttribute(e,y),f.subVectors(l,a),m.subVectors(r,a),f.cross(m),c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),c.add(f),h.add(f),d.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(w,h.x,h.y,h.z),n.setXYZ(y,d.x,d.y,d.z)}else for(let g=0,_=e.count;g<_;g+=3)r.fromBufferAttribute(e,g+0),a.fromBufferAttribute(e,g+1),l.fromBufferAttribute(e,g+2),f.subVectors(l,a),m.subVectors(r,a),f.cross(m),n.setXYZ(g+0,f.x,f.y,f.z),n.setXYZ(g+1,f.x,f.y,f.z),n.setXYZ(g+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)je.fromBufferAttribute(t,e),je.normalize(),t.setXYZ(e,je.x,je.y,je.z)}toNonIndexed(){function t(c,h){const d=c.array,f=c.itemSize,m=c.normalized,g=new d.constructor(h.length*f);let _=0,x=0;for(let w=0,y=h.length;w<y;w++){c.isInterleavedBufferAttribute?_=h[w]*c.data.stride+c.offset:_=h[w]*f;for(let v=0;v<f;v++)g[x++]=d[_++]}return new ni(g,f,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new an,n=this.index.array,r=this.attributes;for(const c in r){const h=r[c],d=t(h,n);e.setAttribute(c,d)}const a=this.morphAttributes;for(const c in a){const h=[],d=a[c];for(let f=0,m=d.length;f<m;f++){const g=d[f],_=t(g,n);h.push(_)}e.morphAttributes[c]=h}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,h=l.length;c<h;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const d in h)h[d]!==void 0&&(t[d]=h[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const d=n[h];t.data.attributes[h]=d.toJSON(t.data)}const r={};let a=!1;for(const h in this.morphAttributes){const d=this.morphAttributes[h],f=[];for(let m=0,g=d.length;m<g;m++){const _=d[m];f.push(_.toJSON(t.data))}f.length>0&&(r[h]=f,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const d in r){const f=r[d];this.setAttribute(d,f.clone(e))}const a=t.morphAttributes;for(const d in a){const f=[],m=a[d];for(let g=0,_=m.length;g<_;g++)f.push(m[g].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const m=l[d];this.addGroup(m.start,m.count,m.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const qh=new Me,ps=new Qa,la=new Ir,$h=new H,Js=new H,Qs=new H,tr=new H,ec=new H,ca=new H,ua=new Et,ha=new Et,da=new Et,Yh=new H,jh=new H,Kh=new H,fa=new H,pa=new H;class Ne extends en{constructor(t=new an,e=new Tf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const c=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const c=this.morphTargetInfluences;if(a&&c){ca.set(0,0,0);for(let h=0,d=a.length;h<d;h++){const f=c[h],m=a[h];f!==0&&(ec.fromBufferAttribute(m,t),l?ca.addScaledVector(ec,f):ca.addScaledVector(ec.sub(e),f))}e.add(ca)}return e}raycast(t,e){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),la.copy(n.boundingSphere),la.applyMatrix4(a),ps.copy(t.ray).recast(t.near),!(la.containsPoint(ps.origin)===!1&&(ps.intersectSphere(la,$h)===null||ps.origin.distanceToSquared($h)>(t.far-t.near)**2))&&(qh.copy(a).invert(),ps.copy(t.ray).applyMatrix4(qh),!(n.boundingBox!==null&&ps.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ps)))}_computeIntersections(t,e,n){let r;const a=this.geometry,l=this.material,c=a.index,h=a.attributes.position,d=a.attributes.uv,f=a.attributes.uv1,m=a.attributes.normal,g=a.groups,_=a.drawRange;if(c!==null)if(Array.isArray(l))for(let x=0,w=g.length;x<w;x++){const y=g[x],v=l[y.materialIndex],N=Math.max(y.start,_.start),b=Math.min(c.count,Math.min(y.start+y.count,_.start+_.count));for(let A=N,k=b;A<k;A+=3){const I=c.getX(A),R=c.getX(A+1),U=c.getX(A+2);r=ma(this,v,t,n,d,f,m,I,R,U),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=y.materialIndex,e.push(r))}}else{const x=Math.max(0,_.start),w=Math.min(c.count,_.start+_.count);for(let y=x,v=w;y<v;y+=3){const N=c.getX(y),b=c.getX(y+1),A=c.getX(y+2);r=ma(this,l,t,n,d,f,m,N,b,A),r&&(r.faceIndex=Math.floor(y/3),e.push(r))}}else if(h!==void 0)if(Array.isArray(l))for(let x=0,w=g.length;x<w;x++){const y=g[x],v=l[y.materialIndex],N=Math.max(y.start,_.start),b=Math.min(h.count,Math.min(y.start+y.count,_.start+_.count));for(let A=N,k=b;A<k;A+=3){const I=A,R=A+1,U=A+2;r=ma(this,v,t,n,d,f,m,I,R,U),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=y.materialIndex,e.push(r))}}else{const x=Math.max(0,_.start),w=Math.min(h.count,_.start+_.count);for(let y=x,v=w;y<v;y+=3){const N=y,b=y+1,A=y+2;r=ma(this,l,t,n,d,f,m,N,b,A),r&&(r.faceIndex=Math.floor(y/3),e.push(r))}}}}function i_(s,t,e,n,r,a,l,c){let h;if(t.side===Pn?h=n.intersectTriangle(l,a,r,!0,c):h=n.intersectTriangle(r,a,l,t.side===es,c),h===null)return null;pa.copy(c),pa.applyMatrix4(s.matrixWorld);const d=e.ray.origin.distanceTo(pa);return d<e.near||d>e.far?null:{distance:d,point:pa.clone(),object:s}}function ma(s,t,e,n,r,a,l,c,h,d){s.getVertexPosition(c,Js),s.getVertexPosition(h,Qs),s.getVertexPosition(d,tr);const f=i_(s,t,e,n,Js,Qs,tr,fa);if(f){r&&(ua.fromBufferAttribute(r,c),ha.fromBufferAttribute(r,h),da.fromBufferAttribute(r,d),f.uv=Qn.getInterpolation(fa,Js,Qs,tr,ua,ha,da,new Et)),a&&(ua.fromBufferAttribute(a,c),ha.fromBufferAttribute(a,h),da.fromBufferAttribute(a,d),f.uv1=Qn.getInterpolation(fa,Js,Qs,tr,ua,ha,da,new Et)),l&&(Yh.fromBufferAttribute(l,c),jh.fromBufferAttribute(l,h),Kh.fromBufferAttribute(l,d),f.normal=Qn.getInterpolation(fa,Js,Qs,tr,Yh,jh,Kh,new H),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const m={a:c,b:h,c:d,normal:new H,materialIndex:0};Qn.getNormal(Js,Qs,tr,m.normal),f.face=m}return f}class ki extends an{constructor(t=1,e=1,n=1,r=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:a,depthSegments:l};const c=this;r=Math.floor(r),a=Math.floor(a),l=Math.floor(l);const h=[],d=[],f=[],m=[];let g=0,_=0;x("z","y","x",-1,-1,n,e,t,l,a,0),x("z","y","x",1,-1,n,e,-t,l,a,1),x("x","z","y",1,1,t,n,e,r,l,2),x("x","z","y",1,-1,t,n,-e,r,l,3),x("x","y","z",1,-1,t,e,n,r,a,4),x("x","y","z",-1,-1,t,e,-n,r,a,5),this.setIndex(h),this.setAttribute("position",new ze(d,3)),this.setAttribute("normal",new ze(f,3)),this.setAttribute("uv",new ze(m,2));function x(w,y,v,N,b,A,k,I,R,U,P){const E=A/R,B=k/U,q=A/2,F=k/2,X=I/2,et=R+1,K=U+1;let Mt=0,Z=0;const vt=new H;for(let G=0;G<K;G++){const nt=G*B-F;for(let J=0;J<et;J++){const at=J*E-q;vt[w]=at*N,vt[y]=nt*b,vt[v]=X,d.push(vt.x,vt.y,vt.z),vt[w]=0,vt[y]=0,vt[v]=I>0?1:-1,f.push(vt.x,vt.y,vt.z),m.push(J/R),m.push(1-G/U),Mt+=1}}for(let G=0;G<U;G++)for(let nt=0;nt<R;nt++){const J=g+nt+et*G,at=g+nt+et*(G+1),V=g+(nt+1)+et*(G+1),Y=g+(nt+1)+et*G;h.push(J,at,Y),h.push(at,V,Y),Z+=6}c.addGroup(_,Z,P),_+=Z,g+=Mt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ki(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Sr(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const r=s[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function _n(s){const t={};for(let e=0;e<s.length;e++){const n=Sr(s[e]);for(const r in n)t[r]=n[r]}return t}function s_(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Pf(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:xe.workingColorSpace}const r_={clone:Sr,merge:_n};var o_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,a_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ns extends Dr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=o_,this.fragmentShader=a_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Sr(t.uniforms),this.uniformsGroups=s_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const l=this.uniforms[r].value;l&&l.isTexture?e.uniforms[r]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[r]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[r]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[r]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[r]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[r]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[r]={type:"m4",value:l.toArray()}:e.uniforms[r]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Cf extends en{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Me,this.projectionMatrix=new Me,this.projectionMatrixInverse=new Me,this.coordinateSystem=Oi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qi=new H,Jh=new Et,Qh=new Et;class Hn extends Cf{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ac*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(uo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ac*2*Math.atan(Math.tan(uo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(qi.x,qi.y).multiplyScalar(-t/qi.z),qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qi.x,qi.y).multiplyScalar(-t/qi.z)}getViewSize(t,e){return this.getViewBounds(t,Jh,Qh),e.subVectors(Qh,Jh)}setViewOffset(t,e,n,r,a,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(uo*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,a=-.5*r;const l=this.view;if(this.view!==null&&this.view.enabled){const h=l.fullWidth,d=l.fullHeight;a+=l.offsetX*r/h,e-=l.offsetY*n/d,r*=l.width/h,n*=l.height/d}const c=this.filmOffset;c!==0&&(a+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const er=-90,nr=1;class l_ extends en{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Hn(er,nr,t,e);r.layers=this.layers,this.add(r);const a=new Hn(er,nr,t,e);a.layers=this.layers,this.add(a);const l=new Hn(er,nr,t,e);l.layers=this.layers,this.add(l);const c=new Hn(er,nr,t,e);c.layers=this.layers,this.add(c);const h=new Hn(er,nr,t,e);h.layers=this.layers,this.add(h);const d=new Hn(er,nr,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,a,l,c,h]=e;for(const d of e)this.remove(d);if(t===Oi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Fa)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,l,c,h,d,f]=this.children,m=t.getRenderTarget(),g=t.getActiveCubeFace(),_=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,a),t.setRenderTarget(n,1,r),t.render(e,l),t.setRenderTarget(n,2,r),t.render(e,c),t.setRenderTarget(n,3,r),t.render(e,h),t.setRenderTarget(n,4,r),t.render(e,d),n.texture.generateMipmaps=w,t.setRenderTarget(n,5,r),t.render(e,f),t.setRenderTarget(m,g,_),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Rf extends dn{constructor(t,e,n,r,a,l,c,h,d,f){t=t!==void 0?t:[],e=e!==void 0?e:Mr,super(t,e,n,r,a,l,c,h,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class c_ extends Ss{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new Rf(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Jn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new ki(5,5,5),a=new ns({name:"CubemapFromEquirect",uniforms:Sr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pn,blending:Ji});a.uniforms.tEquirect.value=e;const l=new Ne(r,a),c=e.minFilter;return e.minFilter===bs&&(e.minFilter=Jn),new l_(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,r){const a=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,r);t.setRenderTarget(a)}}const nc=new H,u_=new H,h_=new ce;class hn{constructor(t=new H(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=nc.subVectors(n,e).cross(u_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(nc),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||h_.getNormalMatrix(t),r=this.coplanarPoint(nc).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ms=new Ir,ga=new H;class Zc{constructor(t=new hn,e=new hn,n=new hn,r=new hn,a=new hn,l=new hn){this.planes=[t,e,n,r,a,l]}set(t,e,n,r,a,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(r),c[4].copy(a),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Oi){const n=this.planes,r=t.elements,a=r[0],l=r[1],c=r[2],h=r[3],d=r[4],f=r[5],m=r[6],g=r[7],_=r[8],x=r[9],w=r[10],y=r[11],v=r[12],N=r[13],b=r[14],A=r[15];if(n[0].setComponents(h-a,g-d,y-_,A-v).normalize(),n[1].setComponents(h+a,g+d,y+_,A+v).normalize(),n[2].setComponents(h+l,g+f,y+x,A+N).normalize(),n[3].setComponents(h-l,g-f,y-x,A-N).normalize(),n[4].setComponents(h-c,g-m,y-w,A-b).normalize(),e===Oi)n[5].setComponents(h+c,g+m,y+w,A+b).normalize();else if(e===Fa)n[5].setComponents(c,m,w,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ms.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ms)}intersectsSprite(t){return ms.center.set(0,0,0),ms.radius=.7071067811865476,ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(ms)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(ga.x=r.normal.x>0?t.max.x:t.min.x,ga.y=r.normal.y>0?t.max.y:t.min.y,ga.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ga)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function If(){let s=null,t=!1,e=null,n=null;function r(a,l){e(a,l),n=s.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(r),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){s=a}}}function d_(s){const t=new WeakMap;function e(c,h){const d=c.array,f=c.usage,m=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,f),c.onUploadCallback();let _;if(d instanceof Float32Array)_=s.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?_=s.HALF_FLOAT:_=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=s.SHORT;else if(d instanceof Uint32Array)_=s.UNSIGNED_INT;else if(d instanceof Int32Array)_=s.INT;else if(d instanceof Int8Array)_=s.BYTE;else if(d instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function n(c,h,d){const f=h.array,m=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,c),m.count===-1&&g.length===0&&s.bufferSubData(d,0,f),g.length!==0){for(let _=0,x=g.length;_<x;_++){const w=g[_];s.bufferSubData(d,w.start*f.BYTES_PER_ELEMENT,f,w.start,w.count)}h.clearUpdateRanges()}m.count!==-1&&(s.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count),m.count=-1),h.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=t.get(c);h&&(s.deleteBuffer(h.buffer),t.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,h),d.version=c.version}}return{get:r,remove:a,update:l}}class Po extends an{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const a=t/2,l=e/2,c=Math.floor(n),h=Math.floor(r),d=c+1,f=h+1,m=t/c,g=e/h,_=[],x=[],w=[],y=[];for(let v=0;v<f;v++){const N=v*g-l;for(let b=0;b<d;b++){const A=b*m-a;x.push(A,-N,0),w.push(0,0,1),y.push(b/c),y.push(1-v/h)}}for(let v=0;v<h;v++)for(let N=0;N<c;N++){const b=N+d*v,A=N+d*(v+1),k=N+1+d*(v+1),I=N+1+d*v;_.push(b,A,I),_.push(A,k,I)}this.setIndex(_),this.setAttribute("position",new ze(x,3)),this.setAttribute("normal",new ze(w,3)),this.setAttribute("uv",new ze(y,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Po(t.width,t.height,t.widthSegments,t.heightSegments)}}var f_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,p_=`#ifdef USE_ALPHAHASH
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
#endif`,m_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,g_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,__=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,v_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y_=`#ifdef USE_AOMAP
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
#endif`,x_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,M_=`#ifdef USE_BATCHING
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
#endif`,b_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,w_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,S_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,E_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,T_=`#ifdef USE_IRIDESCENCE
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
#endif`,A_=`#ifdef USE_BUMPMAP
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
#endif`,L_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,P_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,C_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,R_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,I_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,D_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,N_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,O_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,U_=`#define PI 3.141592653589793
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
} // validated`,k_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,F_=`vec3 transformedNormal = objectNormal;
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
#endif`,B_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,z_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,H_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,V_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,G_="gl_FragColor = linearToOutputTexel( gl_FragColor );",W_=`
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
}`,Z_=`#ifdef USE_ENVMAP
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
#endif`,X_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,q_=`#ifdef USE_ENVMAP
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
#endif`,$_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Y_=`#ifdef USE_ENVMAP
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
#endif`,j_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,K_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,J_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Q_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tv=`#ifdef USE_GRADIENTMAP
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
}`,ev=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,nv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,iv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rv=`uniform bool receiveShadow;
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
#endif`,ov=`#ifdef USE_ENVMAP
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
#endif`,av=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,uv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hv=`PhysicalMaterial material;
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
#endif`,dv=`struct PhysicalMaterial {
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
}`,fv=`
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
#endif`,pv=`#if defined( RE_IndirectDiffuse )
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
#endif`,mv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_v=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wv=`#if defined( USE_POINTS_UV )
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
#endif`,Sv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ev=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Av=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lv=`#ifdef USE_MORPHNORMALS
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
#endif`,Pv=`#ifdef USE_MORPHTARGETS
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
#endif`,Cv=`#ifdef USE_MORPHTARGETS
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
#endif`,Rv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Iv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ov=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Uv=`#ifdef USE_NORMALMAP
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
#endif`,kv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$v=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jv=`float getShadowMask() {
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
}`,Qv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,t0=`#ifdef USE_SKINNING
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
#endif`,e0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,n0=`#ifdef USE_SKINNING
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
#endif`,i0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,s0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,a0=`#ifdef USE_TRANSMISSION
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
#endif`,l0=`#ifdef USE_TRANSMISSION
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
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,p0=`uniform sampler2D t2D;
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
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`#include <common>
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
}`,x0=`#if DEPTH_PACKING == 3200
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
}`,M0=`#define DISTANCE
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
}`,b0=`#define DISTANCE
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
}`,w0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,S0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`uniform float scale;
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
}`,T0=`uniform vec3 diffuse;
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
}`,A0=`#include <common>
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
}`,L0=`uniform vec3 diffuse;
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
}`,P0=`#define LAMBERT
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
}`,C0=`#define LAMBERT
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
}`,R0=`#define MATCAP
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
}`,I0=`#define MATCAP
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
}`,D0=`#define NORMAL
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
}`,N0=`#define NORMAL
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
}`,O0=`#define PHONG
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
}`,U0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,F0=`#define STANDARD
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
}`,B0=`#define TOON
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
}`,z0=`#define TOON
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
}`,H0=`uniform float size;
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
}`,V0=`uniform vec3 diffuse;
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
}`,G0=`#include <common>
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
}`,W0=`uniform vec3 color;
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
}`,Z0=`uniform float rotation;
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
}`,X0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:f_,alphahash_pars_fragment:p_,alphamap_fragment:m_,alphamap_pars_fragment:g_,alphatest_fragment:__,alphatest_pars_fragment:v_,aomap_fragment:y_,aomap_pars_fragment:x_,batching_pars_vertex:M_,batching_vertex:b_,begin_vertex:w_,beginnormal_vertex:S_,bsdfs:E_,iridescence_fragment:T_,bumpmap_pars_fragment:A_,clipping_planes_fragment:L_,clipping_planes_pars_fragment:P_,clipping_planes_pars_vertex:C_,clipping_planes_vertex:R_,color_fragment:I_,color_pars_fragment:D_,color_pars_vertex:N_,color_vertex:O_,common:U_,cube_uv_reflection_fragment:k_,defaultnormal_vertex:F_,displacementmap_pars_vertex:B_,displacementmap_vertex:z_,emissivemap_fragment:H_,emissivemap_pars_fragment:V_,colorspace_fragment:G_,colorspace_pars_fragment:W_,envmap_fragment:Z_,envmap_common_pars_fragment:X_,envmap_pars_fragment:q_,envmap_pars_vertex:$_,envmap_physical_pars_fragment:ov,envmap_vertex:Y_,fog_vertex:j_,fog_pars_vertex:K_,fog_fragment:J_,fog_pars_fragment:Q_,gradientmap_pars_fragment:tv,lightmap_fragment:ev,lightmap_pars_fragment:nv,lights_lambert_fragment:iv,lights_lambert_pars_fragment:sv,lights_pars_begin:rv,lights_toon_fragment:av,lights_toon_pars_fragment:lv,lights_phong_fragment:cv,lights_phong_pars_fragment:uv,lights_physical_fragment:hv,lights_physical_pars_fragment:dv,lights_fragment_begin:fv,lights_fragment_maps:pv,lights_fragment_end:mv,logdepthbuf_fragment:gv,logdepthbuf_pars_fragment:_v,logdepthbuf_pars_vertex:vv,logdepthbuf_vertex:yv,map_fragment:xv,map_pars_fragment:Mv,map_particle_fragment:bv,map_particle_pars_fragment:wv,metalnessmap_fragment:Sv,metalnessmap_pars_fragment:Ev,morphinstance_vertex:Tv,morphcolor_vertex:Av,morphnormal_vertex:Lv,morphtarget_pars_vertex:Pv,morphtarget_vertex:Cv,normal_fragment_begin:Rv,normal_fragment_maps:Iv,normal_pars_fragment:Dv,normal_pars_vertex:Nv,normal_vertex:Ov,normalmap_pars_fragment:Uv,clearcoat_normal_fragment_begin:kv,clearcoat_normal_fragment_maps:Fv,clearcoat_pars_fragment:Bv,iridescence_pars_fragment:zv,opaque_fragment:Hv,packing:Vv,premultiplied_alpha_fragment:Gv,project_vertex:Wv,dithering_fragment:Zv,dithering_pars_fragment:Xv,roughnessmap_fragment:qv,roughnessmap_pars_fragment:$v,shadowmap_pars_fragment:Yv,shadowmap_pars_vertex:jv,shadowmap_vertex:Kv,shadowmask_pars_fragment:Jv,skinbase_vertex:Qv,skinning_pars_vertex:t0,skinning_vertex:e0,skinnormal_vertex:n0,specularmap_fragment:i0,specularmap_pars_fragment:s0,tonemapping_fragment:r0,tonemapping_pars_fragment:o0,transmission_fragment:a0,transmission_pars_fragment:l0,uv_pars_fragment:c0,uv_pars_vertex:u0,uv_vertex:h0,worldpos_vertex:d0,background_vert:f0,background_frag:p0,backgroundCube_vert:m0,backgroundCube_frag:g0,cube_vert:_0,cube_frag:v0,depth_vert:y0,depth_frag:x0,distanceRGBA_vert:M0,distanceRGBA_frag:b0,equirect_vert:w0,equirect_frag:S0,linedashed_vert:E0,linedashed_frag:T0,meshbasic_vert:A0,meshbasic_frag:L0,meshlambert_vert:P0,meshlambert_frag:C0,meshmatcap_vert:R0,meshmatcap_frag:I0,meshnormal_vert:D0,meshnormal_frag:N0,meshphong_vert:O0,meshphong_frag:U0,meshphysical_vert:k0,meshphysical_frag:F0,meshtoon_vert:B0,meshtoon_frag:z0,points_vert:H0,points_frag:V0,shadow_vert:G0,shadow_frag:W0,sprite_vert:Z0,sprite_frag:X0},Rt={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},di={basic:{uniforms:_n([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:_n([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new ne(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:_n([Rt.common,Rt.specularmap,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,Rt.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:_n([Rt.common,Rt.envmap,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.roughnessmap,Rt.metalnessmap,Rt.fog,Rt.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:_n([Rt.common,Rt.aomap,Rt.lightmap,Rt.emissivemap,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.gradientmap,Rt.fog,Rt.lights,{emissive:{value:new ne(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:_n([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,Rt.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:_n([Rt.points,Rt.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:_n([Rt.common,Rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:_n([Rt.common,Rt.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:_n([Rt.common,Rt.bumpmap,Rt.normalmap,Rt.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:_n([Rt.sprite,Rt.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:_n([Rt.common,Rt.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:_n([Rt.lights,Rt.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};di.physical={uniforms:_n([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const _a={r:0,b:0,g:0},gs=new yi,q0=new Me;function $0(s,t,e,n,r,a,l){const c=new ne(0);let h=a===!0?0:1,d,f,m=null,g=0,_=null;function x(y,v){let N=!1,b=v.isScene===!0?v.background:null;b&&b.isTexture&&(b=(v.backgroundBlurriness>0?e:t).get(b)),b===null?w(c,h):b&&b.isColor&&(w(b,1),N=!0);const A=s.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,l):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(s.autoClear||N)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Ka)?(f===void 0&&(f=new Ne(new ki(1,1,1),new ns({name:"BackgroundCubeMaterial",uniforms:Sr(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(k,I,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),gs.copy(v.backgroundRotation),gs.x*=-1,gs.y*=-1,gs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(gs.y*=-1,gs.z*=-1),f.material.uniforms.envMap.value=b,f.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(q0.makeRotationFromEuler(gs)),f.material.toneMapped=xe.getTransfer(b.colorSpace)!==Te,(m!==b||g!==b.version||_!==s.toneMapping)&&(f.material.needsUpdate=!0,m=b,g=b.version,_=s.toneMapping),f.layers.enableAll(),y.unshift(f,f.geometry,f.material,0,0,null)):b&&b.isTexture&&(d===void 0&&(d=new Ne(new Po(2,2),new ns({name:"BackgroundMaterial",uniforms:Sr(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:es,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=b,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.toneMapped=xe.getTransfer(b.colorSpace)!==Te,b.matrixAutoUpdate===!0&&b.updateMatrix(),d.material.uniforms.uvTransform.value.copy(b.matrix),(m!==b||g!==b.version||_!==s.toneMapping)&&(d.material.needsUpdate=!0,m=b,g=b.version,_=s.toneMapping),d.layers.enableAll(),y.unshift(d,d.geometry,d.material,0,0,null))}function w(y,v){y.getRGB(_a,Pf(s)),n.buffers.color.setClear(_a.r,_a.g,_a.b,v,l)}return{getClearColor:function(){return c},setClearColor:function(y,v=1){c.set(y),h=v,w(c,h)},getClearAlpha:function(){return h},setClearAlpha:function(y){h=y,w(c,h)},render:x}}function Y0(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},r=g(null);let a=r,l=!1;function c(E,B,q,F,X){let et=!1;const K=m(F,q,B);a!==K&&(a=K,d(a.object)),et=_(E,F,q,X),et&&x(E,F,q,X),X!==null&&t.update(X,s.ELEMENT_ARRAY_BUFFER),(et||l)&&(l=!1,A(E,B,q,F),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(X).buffer))}function h(){return s.createVertexArray()}function d(E){return s.bindVertexArray(E)}function f(E){return s.deleteVertexArray(E)}function m(E,B,q){const F=q.wireframe===!0;let X=n[E.id];X===void 0&&(X={},n[E.id]=X);let et=X[B.id];et===void 0&&(et={},X[B.id]=et);let K=et[F];return K===void 0&&(K=g(h()),et[F]=K),K}function g(E){const B=[],q=[],F=[];for(let X=0;X<e;X++)B[X]=0,q[X]=0,F[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:q,attributeDivisors:F,object:E,attributes:{},index:null}}function _(E,B,q,F){const X=a.attributes,et=B.attributes;let K=0;const Mt=q.getAttributes();for(const Z in Mt)if(Mt[Z].location>=0){const G=X[Z];let nt=et[Z];if(nt===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(nt=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(nt=E.instanceColor)),G===void 0||G.attribute!==nt||nt&&G.data!==nt.data)return!0;K++}return a.attributesNum!==K||a.index!==F}function x(E,B,q,F){const X={},et=B.attributes;let K=0;const Mt=q.getAttributes();for(const Z in Mt)if(Mt[Z].location>=0){let G=et[Z];G===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(G=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(G=E.instanceColor));const nt={};nt.attribute=G,G&&G.data&&(nt.data=G.data),X[Z]=nt,K++}a.attributes=X,a.attributesNum=K,a.index=F}function w(){const E=a.newAttributes;for(let B=0,q=E.length;B<q;B++)E[B]=0}function y(E){v(E,0)}function v(E,B){const q=a.newAttributes,F=a.enabledAttributes,X=a.attributeDivisors;q[E]=1,F[E]===0&&(s.enableVertexAttribArray(E),F[E]=1),X[E]!==B&&(s.vertexAttribDivisor(E,B),X[E]=B)}function N(){const E=a.newAttributes,B=a.enabledAttributes;for(let q=0,F=B.length;q<F;q++)B[q]!==E[q]&&(s.disableVertexAttribArray(q),B[q]=0)}function b(E,B,q,F,X,et,K){K===!0?s.vertexAttribIPointer(E,B,q,X,et):s.vertexAttribPointer(E,B,q,F,X,et)}function A(E,B,q,F){w();const X=F.attributes,et=q.getAttributes(),K=B.defaultAttributeValues;for(const Mt in et){const Z=et[Mt];if(Z.location>=0){let vt=X[Mt];if(vt===void 0&&(Mt==="instanceMatrix"&&E.instanceMatrix&&(vt=E.instanceMatrix),Mt==="instanceColor"&&E.instanceColor&&(vt=E.instanceColor)),vt!==void 0){const G=vt.normalized,nt=vt.itemSize,J=t.get(vt);if(J===void 0)continue;const at=J.buffer,V=J.type,Y=J.bytesPerElement,dt=V===s.INT||V===s.UNSIGNED_INT||vt.gpuType===df;if(vt.isInterleavedBufferAttribute){const gt=vt.data,wt=gt.stride,Tt=vt.offset;if(gt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<Z.locationSize;Pt++)v(Z.location+Pt,gt.meshPerAttribute);E.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=gt.meshPerAttribute*gt.count)}else for(let Pt=0;Pt<Z.locationSize;Pt++)y(Z.location+Pt);s.bindBuffer(s.ARRAY_BUFFER,at);for(let Pt=0;Pt<Z.locationSize;Pt++)b(Z.location+Pt,nt/Z.locationSize,V,G,wt*Y,(Tt+nt/Z.locationSize*Pt)*Y,dt)}else{if(vt.isInstancedBufferAttribute){for(let gt=0;gt<Z.locationSize;gt++)v(Z.location+gt,vt.meshPerAttribute);E.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let gt=0;gt<Z.locationSize;gt++)y(Z.location+gt);s.bindBuffer(s.ARRAY_BUFFER,at);for(let gt=0;gt<Z.locationSize;gt++)b(Z.location+gt,nt/Z.locationSize,V,G,nt*Y,nt/Z.locationSize*gt*Y,dt)}}else if(K!==void 0){const G=K[Mt];if(G!==void 0)switch(G.length){case 2:s.vertexAttrib2fv(Z.location,G);break;case 3:s.vertexAttrib3fv(Z.location,G);break;case 4:s.vertexAttrib4fv(Z.location,G);break;default:s.vertexAttrib1fv(Z.location,G)}}}}N()}function k(){U();for(const E in n){const B=n[E];for(const q in B){const F=B[q];for(const X in F)f(F[X].object),delete F[X];delete B[q]}delete n[E]}}function I(E){if(n[E.id]===void 0)return;const B=n[E.id];for(const q in B){const F=B[q];for(const X in F)f(F[X].object),delete F[X];delete B[q]}delete n[E.id]}function R(E){for(const B in n){const q=n[B];if(q[E.id]===void 0)continue;const F=q[E.id];for(const X in F)f(F[X].object),delete F[X];delete q[E.id]}}function U(){P(),l=!0,a!==r&&(a=r,d(a.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:c,reset:U,resetDefaultState:P,dispose:k,releaseStatesOfGeometry:I,releaseStatesOfProgram:R,initAttributes:w,enableAttribute:y,disableUnusedAttributes:N}}function j0(s,t,e){let n;function r(h){n=h}function a(h,d){s.drawArrays(n,h,d),e.update(d,n,1)}function l(h,d,f){f!==0&&(s.drawArraysInstanced(n,h,d,f),e.update(d,n,f))}function c(h,d,f){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(n,h,0,d,0,f);let g=0;for(let _=0;_<f;_++)g+=d[_];e.update(g,n,1)}}this.setMode=r,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function K0(s,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=a(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,N=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,precision:l,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:y,vertexTextures:v,maxSamples:N}}function J0(s){const t=this;let e=null,n=0,r=!1,a=!1;const l=new hn,c=new ce,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(m,g){const _=m.length!==0||g||n!==0||r;return r=g,n=m.length,_},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,g){e=f(m,g,0)},this.setState=function(m,g,_){const x=m.clippingPlanes,w=m.clipIntersection,y=m.clipShadows,v=s.get(m);if(!r||x===null||x.length===0||a&&!y)a?f(null):d();else{const N=a?0:n,b=N*4;let A=v.clippingState||null;h.value=A,A=f(x,g,b,_);for(let k=0;k!==b;++k)A[k]=e[k];v.clippingState=A,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=N}};function d(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(m,g,_,x){const w=m!==null?m.length:0;let y=null;if(w!==0){if(y=h.value,x!==!0||y===null){const v=_+w*4,N=g.matrixWorldInverse;c.getNormalMatrix(N),(y===null||y.length<v)&&(y=new Float32Array(v));for(let b=0,A=_;b!==w;++b,A+=4)l.copy(m[b]).applyMatrix4(N,c),l.normal.toArray(y,A),y[A+3]=l.constant}h.value=y,h.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,y}}function Q0(s){let t=new WeakMap;function e(l,c){return c===wc?l.mapping=Mr:c===Sc&&(l.mapping=br),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===wc||c===Sc)if(t.has(l)){const h=t.get(l).texture;return e(h,l.mapping)}else{const h=l.image;if(h&&h.height>0){const d=new c_(h.height);return d.fromEquirectangularTexture(s,l),t.set(l,d),l.addEventListener("dispose",r),e(d.texture,l.mapping)}else return null}}return l}function r(l){const c=l.target;c.removeEventListener("dispose",r);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class Df extends Cf{constructor(t=-1,e=1,n=1,r=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-t,l=n+t,c=r+e,h=r-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,c-=f*this.view.offsetY,h=c-f*this.view.height}this.projectionMatrix.makeOrthographic(a,l,c,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ur=4,td=[.125,.215,.35,.446,.526,.582],xs=20,ic=new Df,ed=new ne;let sc=null,rc=0,oc=0,ac=!1;const vs=(1+Math.sqrt(5))/2,ir=1/vs,nd=[new H(1,1,1),new H(-1,1,1),new H(1,1,-1),new H(-1,1,-1),new H(0,vs,ir),new H(0,vs,-ir),new H(ir,0,vs),new H(-ir,0,vs),new H(vs,ir,0),new H(-vs,ir,0)];class id{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=od(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sc,rc,oc),this._renderer.xr.enabled=ac,t.scissorTest=!1,va(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Mr||t.mapping===br?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sc=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Jn,minFilter:Jn,generateMipmaps:!1,type:Na,format:gi,colorSpace:ss,depthBuffer:!1},r=sd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sd(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ty(a)),this._blurMaterial=ey(a,t,e)}return r}_compileMaterial(t){const e=new Ne(this._lodPlanes[0],t);this._renderer.compile(e,ic)}_sceneToCubeUV(t,e,n,r){const c=new Hn(90,1,e,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,m=f.autoClear,g=f.toneMapping;f.getClearColor(ed),f.toneMapping=Qi,f.autoClear=!1;const _=new Tf({name:"PMREM.Background",side:Pn,depthWrite:!1,depthTest:!1}),x=new Ne(new ki,_);let w=!1;const y=t.background;y?y.isColor&&(_.color.copy(y),t.background=null,w=!0):(_.color.copy(ed),w=!0);for(let v=0;v<6;v++){const N=v%3;N===0?(c.up.set(0,h[v],0),c.lookAt(d[v],0,0)):N===1?(c.up.set(0,0,h[v]),c.lookAt(0,d[v],0)):(c.up.set(0,h[v],0),c.lookAt(0,0,d[v]));const b=this._cubeSize;va(r,N*b,v>2?b:0,b,b),f.setRenderTarget(r),w&&f.render(x,c),f.render(t,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=g,f.autoClear=m,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===Mr||t.mapping===br;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=od()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rd());const a=r?this._cubemapMaterial:this._equirectMaterial,l=new Ne(this._lodPlanes[0],a),c=a.uniforms;c.envMap.value=t;const h=this._cubeSize;va(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(l,ic)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=nd[(r-1)%nd.length];this._blur(t,r-1,r,a,l)}e.autoClear=n}_blur(t,e,n,r,a){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,r,"latitudinal",a),this._halfBlur(l,t,n,n,r,"longitudinal",a)}_halfBlur(t,e,n,r,a,l,c){const h=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,m=new Ne(this._lodPlanes[r],d),g=d.uniforms,_=this._sizeLods[n]-1,x=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*xs-1),w=a/x,y=isFinite(a)?1+Math.floor(f*w):xs;y>xs&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${y} samples when the maximum is set to ${xs}`);const v=[];let N=0;for(let R=0;R<xs;++R){const U=R/w,P=Math.exp(-U*U/2);v.push(P),R===0?N+=P:R<y&&(N+=2*P)}for(let R=0;R<v.length;R++)v[R]=v[R]/N;g.envMap.value=t.texture,g.samples.value=y,g.weights.value=v,g.latitudinal.value=l==="latitudinal",c&&(g.poleAxis.value=c);const{_lodMax:b}=this;g.dTheta.value=x,g.mipInt.value=b-n;const A=this._sizeLods[r],k=3*A*(r>b-ur?r-b+ur:0),I=4*(this._cubeSize-A);va(e,k,I,3*A,2*A),h.setRenderTarget(e),h.render(m,ic)}}function ty(s){const t=[],e=[],n=[];let r=s;const a=s-ur+1+td.length;for(let l=0;l<a;l++){const c=Math.pow(2,r);e.push(c);let h=1/c;l>s-ur?h=td[l-s+ur-1]:l===0&&(h=0),n.push(h);const d=1/(c-2),f=-d,m=1+d,g=[f,f,m,f,m,m,f,f,m,m,f,m],_=6,x=6,w=3,y=2,v=1,N=new Float32Array(w*x*_),b=new Float32Array(y*x*_),A=new Float32Array(v*x*_);for(let I=0;I<_;I++){const R=I%3*2/3-1,U=I>2?0:-1,P=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];N.set(P,w*x*I),b.set(g,y*x*I);const E=[I,I,I,I,I,I];A.set(E,v*x*I)}const k=new an;k.setAttribute("position",new ni(N,w)),k.setAttribute("uv",new ni(b,y)),k.setAttribute("faceIndex",new ni(A,v)),t.push(k),r>ur&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function sd(s,t,e){const n=new Ss(s,t,e);return n.texture.mapping=Ka,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function va(s,t,e,n,r){s.viewport.set(t,e,n,r),s.scissor.set(t,e,n,r)}function ey(s,t,e){const n=new Float32Array(xs),r=new H(0,1,0);return new ns({name:"SphericalGaussianBlur",defines:{n:xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Xc(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function rd(){return new ns({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xc(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function od(){return new ns({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Xc(){return`

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
	`}function ny(s){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const h=c.mapping,d=h===wc||h===Sc,f=h===Mr||h===br;if(d||f){let m=t.get(c);const g=m!==void 0?m.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==g)return e===null&&(e=new id(s)),m=d?e.fromEquirectangular(c,m):e.fromCubemap(c,m),m.texture.pmremVersion=c.pmremVersion,t.set(c,m),m.texture;if(m!==void 0)return m.texture;{const _=c.image;return d&&_&&_.height>0||f&&_&&r(_)?(e===null&&(e=new id(s)),m=d?e.fromEquirectangular(c):e.fromCubemap(c),m.texture.pmremVersion=c.pmremVersion,t.set(c,m),c.addEventListener("dispose",a),m.texture):null}}}return c}function r(c){let h=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&h++;return h===d}function a(c){const h=c.target;h.removeEventListener("dispose",a);const d=t.get(h);d!==void 0&&(t.delete(h),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function iy(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=s.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function sy(s,t,e,n){const r={},a=new WeakMap;function l(m){const g=m.target;g.index!==null&&t.remove(g.index);for(const x in g.attributes)t.remove(g.attributes[x]);for(const x in g.morphAttributes){const w=g.morphAttributes[x];for(let y=0,v=w.length;y<v;y++)t.remove(w[y])}g.removeEventListener("dispose",l),delete r[g.id];const _=a.get(g);_&&(t.remove(_),a.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(m,g){return r[g.id]===!0||(g.addEventListener("dispose",l),r[g.id]=!0,e.memory.geometries++),g}function h(m){const g=m.attributes;for(const x in g)t.update(g[x],s.ARRAY_BUFFER);const _=m.morphAttributes;for(const x in _){const w=_[x];for(let y=0,v=w.length;y<v;y++)t.update(w[y],s.ARRAY_BUFFER)}}function d(m){const g=[],_=m.index,x=m.attributes.position;let w=0;if(_!==null){const N=_.array;w=_.version;for(let b=0,A=N.length;b<A;b+=3){const k=N[b+0],I=N[b+1],R=N[b+2];g.push(k,I,I,R,R,k)}}else if(x!==void 0){const N=x.array;w=x.version;for(let b=0,A=N.length/3-1;b<A;b+=3){const k=b+0,I=b+1,R=b+2;g.push(k,I,I,R,R,k)}}else return;const y=new(bf(g)?Lf:Af)(g,1);y.version=w;const v=a.get(m);v&&t.remove(v),a.set(m,y)}function f(m){const g=a.get(m);if(g){const _=m.index;_!==null&&g.version<_.version&&d(m)}else d(m);return a.get(m)}return{get:c,update:h,getWireframeAttribute:f}}function ry(s,t,e){let n;function r(m){n=m}let a,l;function c(m){a=m.type,l=m.bytesPerElement}function h(m,g){s.drawElements(n,g,a,m*l),e.update(g,n,1)}function d(m,g,_){_!==0&&(s.drawElementsInstanced(n,g,a,m*l,_),e.update(g,n,_))}function f(m,g,_){if(_===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let w=0;w<_;w++)this.render(m[w]/l,g[w]);else{x.multiDrawElementsWEBGL(n,g,0,a,m,0,_);let w=0;for(let y=0;y<_;y++)w+=g[y];e.update(w,n,1)}}this.setMode=r,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function oy(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,l,c){switch(e.calls++,l){case s.TRIANGLES:e.triangles+=c*(a/3);break;case s.LINES:e.lines+=c*(a/2);break;case s.LINE_STRIP:e.lines+=c*(a-1);break;case s.LINE_LOOP:e.lines+=c*a;break;case s.POINTS:e.points+=c*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function ay(s,t,e){const n=new WeakMap,r=new tn;function a(l,c,h){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=f!==void 0?f.length:0;let g=n.get(c);if(g===void 0||g.count!==m){let P=function(){R.dispose(),n.delete(c),c.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const _=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,w=c.morphAttributes.color!==void 0,y=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],N=c.morphAttributes.color||[];let b=0;_===!0&&(b=1),x===!0&&(b=2),w===!0&&(b=3);let A=c.attributes.position.count*b,k=1;A>t.maxTextureSize&&(k=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const I=new Float32Array(A*k*4*m),R=new Sf(I,A,k,m);R.type=Ni,R.needsUpdate=!0;const U=b*4;for(let E=0;E<m;E++){const B=y[E],q=v[E],F=N[E],X=A*k*4*E;for(let et=0;et<B.count;et++){const K=et*U;_===!0&&(r.fromBufferAttribute(B,et),I[X+K+0]=r.x,I[X+K+1]=r.y,I[X+K+2]=r.z,I[X+K+3]=0),x===!0&&(r.fromBufferAttribute(q,et),I[X+K+4]=r.x,I[X+K+5]=r.y,I[X+K+6]=r.z,I[X+K+7]=0),w===!0&&(r.fromBufferAttribute(F,et),I[X+K+8]=r.x,I[X+K+9]=r.y,I[X+K+10]=r.z,I[X+K+11]=F.itemSize===4?r.w:1)}}g={count:m,texture:R,size:new Et(A,k)},n.set(c,g),c.addEventListener("dispose",P)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",l.morphTexture,e);else{let _=0;for(let w=0;w<d.length;w++)_+=d[w];const x=c.morphTargetsRelative?1:1-_;h.getUniforms().setValue(s,"morphTargetBaseInfluence",x),h.getUniforms().setValue(s,"morphTargetInfluences",d)}h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:a}}function ly(s,t,e,n){let r=new WeakMap;function a(h){const d=n.render.frame,f=h.geometry,m=t.get(h,f);if(r.get(m)!==d&&(t.update(m),r.set(m,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),r.get(h)!==d&&(e.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,s.ARRAY_BUFFER),r.set(h,d))),h.isSkinnedMesh){const g=h.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return m}function l(){r=new WeakMap}function c(h){const d=h.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:l}}class Nf extends dn{constructor(t,e,n,r,a,l,c,h,d,f){if(f=f!==void 0?f:mr,f!==mr&&f!==xo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===mr&&(n=wr),n===void 0&&f===xo&&(n=Lo),super(null,r,a,l,c,h,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Ln,this.minFilter=h!==void 0?h:Ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Of=new dn,Uf=new Nf(1,1);Uf.compareFunction=Mf;const kf=new Sf,Ff=new qg,Bf=new Rf,ad=[],ld=[],cd=new Float32Array(16),ud=new Float32Array(9),hd=new Float32Array(4);function Nr(s,t,e){const n=s[0];if(n<=0||n>0)return s;const r=t*e;let a=ad[r];if(a===void 0&&(a=new Float32Array(r),ad[r]=a),t!==0){n.toArray(a,0);for(let l=1,c=0;l!==t;++l)c+=e,s[l].toArray(a,c)}return a}function Xe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function qe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function tl(s,t){let e=ld[t];e===void 0&&(e=new Int32Array(t),ld[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function cy(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function uy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;s.uniform2fv(this.addr,t),qe(e,t)}}function hy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Xe(e,t))return;s.uniform3fv(this.addr,t),qe(e,t)}}function dy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;s.uniform4fv(this.addr,t),qe(e,t)}}function fy(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Xe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),qe(e,t)}else{if(Xe(e,n))return;hd.set(n),s.uniformMatrix2fv(this.addr,!1,hd),qe(e,n)}}function py(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Xe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),qe(e,t)}else{if(Xe(e,n))return;ud.set(n),s.uniformMatrix3fv(this.addr,!1,ud),qe(e,n)}}function my(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Xe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),qe(e,t)}else{if(Xe(e,n))return;cd.set(n),s.uniformMatrix4fv(this.addr,!1,cd),qe(e,n)}}function gy(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function _y(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;s.uniform2iv(this.addr,t),qe(e,t)}}function vy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;s.uniform3iv(this.addr,t),qe(e,t)}}function yy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;s.uniform4iv(this.addr,t),qe(e,t)}}function xy(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function My(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Xe(e,t))return;s.uniform2uiv(this.addr,t),qe(e,t)}}function by(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Xe(e,t))return;s.uniform3uiv(this.addr,t),qe(e,t)}}function wy(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Xe(e,t))return;s.uniform4uiv(this.addr,t),qe(e,t)}}function Sy(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r);const a=this.type===s.SAMPLER_2D_SHADOW?Uf:Of;e.setTexture2D(t||a,r)}function Ey(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Ff,r)}function Ty(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||Bf,r)}function Ay(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||kf,r)}function Ly(s){switch(s){case 5126:return cy;case 35664:return uy;case 35665:return hy;case 35666:return dy;case 35674:return fy;case 35675:return py;case 35676:return my;case 5124:case 35670:return gy;case 35667:case 35671:return _y;case 35668:case 35672:return vy;case 35669:case 35673:return yy;case 5125:return xy;case 36294:return My;case 36295:return by;case 36296:return wy;case 35678:case 36198:case 36298:case 36306:case 35682:return Sy;case 35679:case 36299:case 36307:return Ey;case 35680:case 36300:case 36308:case 36293:return Ty;case 36289:case 36303:case 36311:case 36292:return Ay}}function Py(s,t){s.uniform1fv(this.addr,t)}function Cy(s,t){const e=Nr(t,this.size,2);s.uniform2fv(this.addr,e)}function Ry(s,t){const e=Nr(t,this.size,3);s.uniform3fv(this.addr,e)}function Iy(s,t){const e=Nr(t,this.size,4);s.uniform4fv(this.addr,e)}function Dy(s,t){const e=Nr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ny(s,t){const e=Nr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Oy(s,t){const e=Nr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Uy(s,t){s.uniform1iv(this.addr,t)}function ky(s,t){s.uniform2iv(this.addr,t)}function Fy(s,t){s.uniform3iv(this.addr,t)}function By(s,t){s.uniform4iv(this.addr,t)}function zy(s,t){s.uniform1uiv(this.addr,t)}function Hy(s,t){s.uniform2uiv(this.addr,t)}function Vy(s,t){s.uniform3uiv(this.addr,t)}function Gy(s,t){s.uniform4uiv(this.addr,t)}function Wy(s,t,e){const n=this.cache,r=t.length,a=tl(e,r);Xe(n,a)||(s.uniform1iv(this.addr,a),qe(n,a));for(let l=0;l!==r;++l)e.setTexture2D(t[l]||Of,a[l])}function Zy(s,t,e){const n=this.cache,r=t.length,a=tl(e,r);Xe(n,a)||(s.uniform1iv(this.addr,a),qe(n,a));for(let l=0;l!==r;++l)e.setTexture3D(t[l]||Ff,a[l])}function Xy(s,t,e){const n=this.cache,r=t.length,a=tl(e,r);Xe(n,a)||(s.uniform1iv(this.addr,a),qe(n,a));for(let l=0;l!==r;++l)e.setTextureCube(t[l]||Bf,a[l])}function qy(s,t,e){const n=this.cache,r=t.length,a=tl(e,r);Xe(n,a)||(s.uniform1iv(this.addr,a),qe(n,a));for(let l=0;l!==r;++l)e.setTexture2DArray(t[l]||kf,a[l])}function $y(s){switch(s){case 5126:return Py;case 35664:return Cy;case 35665:return Ry;case 35666:return Iy;case 35674:return Dy;case 35675:return Ny;case 35676:return Oy;case 5124:case 35670:return Uy;case 35667:case 35671:return ky;case 35668:case 35672:return Fy;case 35669:case 35673:return By;case 5125:return zy;case 36294:return Hy;case 36295:return Vy;case 36296:return Gy;case 35678:case 36198:case 36298:case 36306:case 35682:return Wy;case 35679:case 36299:case 36307:return Zy;case 35680:case 36300:case 36308:case 36293:return Xy;case 36289:case 36303:case 36311:case 36292:return qy}}class Yy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Ly(e.type)}}class jy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=$y(e.type)}}class Ky{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let a=0,l=r.length;a!==l;++a){const c=r[a];c.setValue(t,e[c.id],n)}}}const lc=/(\w+)(\])?(\[|\.)?/g;function dd(s,t){s.seq.push(t),s.map[t.id]=t}function Jy(s,t,e){const n=s.name,r=n.length;for(lc.lastIndex=0;;){const a=lc.exec(n),l=lc.lastIndex;let c=a[1];const h=a[2]==="]",d=a[3];if(h&&(c=c|0),d===void 0||d==="["&&l+2===r){dd(e,d===void 0?new Yy(c,s,t):new jy(c,s,t));break}else{let m=e.map[c];m===void 0&&(m=new Ky(c),dd(e,m)),e=m}}}class La{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=t.getActiveUniform(e,r),l=t.getUniformLocation(e,a.name);Jy(a,l,this)}}setValue(t,e,n,r){const a=this.map[e];a!==void 0&&a.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let a=0,l=e.length;a!==l;++a){const c=e[a],h=n[c.id];h.needsUpdate!==!1&&c.setValue(t,h.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,a=t.length;r!==a;++r){const l=t[r];l.id in e&&n.push(l)}return n}}function fd(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Qy=37297;let tx=0;function ex(s,t){const e=s.split(`
`),n=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let l=r;l<a;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function nx(s){const t=xe.getPrimaries(xe.workingColorSpace),e=xe.getPrimaries(s);let n;switch(t===e?n="":t===ka&&e===Ua?n="LinearDisplayP3ToLinearSRGB":t===Ua&&e===ka&&(n="LinearSRGBToLinearDisplayP3"),s){case ss:case Ja:return[n,"LinearTransferOETF"];case hi:case Gc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function pd(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=s.getShaderInfoLog(t).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+ex(s.getShaderSource(t),l)}else return r}function ix(s,t){const e=nx(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function sx(s,t){let e;switch(t){case hg:e="Linear";break;case dg:e="Reinhard";break;case fg:e="OptimizedCineon";break;case pg:e="ACESFilmic";break;case gg:e="AgX";break;case _g:e="Neutral";break;case mg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function rx(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(lo).join(`
`)}function ox(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ax(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=s.getActiveAttrib(t,r),l=a.name;let c=1;a.type===s.FLOAT_MAT2&&(c=2),a.type===s.FLOAT_MAT3&&(c=3),a.type===s.FLOAT_MAT4&&(c=4),e[l]={type:a.type,location:s.getAttribLocation(t,l),locationSize:c}}return e}function lo(s){return s!==""}function md(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gd(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lx=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(s){return s.replace(lx,ux)}const cx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function ux(s,t){let e=le[t];if(e===void 0){const n=cx.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Lc(e)}const hx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _d(s){return s.replace(hx,dx)}function dx(s,t,e,n){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function vd(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function fx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===cf?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===km?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Ii&&(t="SHADOWMAP_TYPE_VSM"),t}function px(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Mr:case br:t="ENVMAP_TYPE_CUBE";break;case Ka:t="ENVMAP_TYPE_CUBE_UV";break}return t}function mx(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case br:t="ENVMAP_MODE_REFRACTION";break}return t}function gx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Vc:t="ENVMAP_BLENDING_MULTIPLY";break;case cg:t="ENVMAP_BLENDING_MIX";break;case ug:t="ENVMAP_BLENDING_ADD";break}return t}function _x(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function vx(s,t,e,n){const r=s.getContext(),a=e.defines;let l=e.vertexShader,c=e.fragmentShader;const h=fx(e),d=px(e),f=mx(e),m=gx(e),g=_x(e),_=rx(e),x=ox(a),w=r.createProgram();let y,v,N=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(lo).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(lo).join(`
`),v.length>0&&(v+=`
`)):(y=[vd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(lo).join(`
`),v=[vd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+m:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Qi?"#define TONE_MAPPING":"",e.toneMapping!==Qi?le.tonemapping_pars_fragment:"",e.toneMapping!==Qi?sx("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,ix("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(lo).join(`
`)),l=Lc(l),l=md(l,e),l=gd(l,e),c=Lc(c),c=md(c,e),c=gd(c,e),l=_d(l),c=_d(c),e.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,y=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",e.glslVersion===Nh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const b=N+y+l,A=N+v+c,k=fd(r,r.VERTEX_SHADER,b),I=fd(r,r.FRAGMENT_SHADER,A);r.attachShader(w,k),r.attachShader(w,I),e.index0AttributeName!==void 0?r.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function R(B){if(s.debug.checkShaderErrors){const q=r.getProgramInfoLog(w).trim(),F=r.getShaderInfoLog(k).trim(),X=r.getShaderInfoLog(I).trim();let et=!0,K=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(et=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(r,w,k,I);else{const Mt=pd(r,k,"vertex"),Z=pd(r,I,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+q+`
`+Mt+`
`+Z)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(F===""||X==="")&&(K=!1);K&&(B.diagnostics={runnable:et,programLog:q,vertexShader:{log:F,prefix:y},fragmentShader:{log:X,prefix:v}})}r.deleteShader(k),r.deleteShader(I),U=new La(r,w),P=ax(r,w)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let P;this.getAttributes=function(){return P===void 0&&R(this),P};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(w,Qy)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=tx++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=k,this.fragmentShader=I,this}let yx=0;class xx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(r)===!1&&(l.add(r),r.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Mx(t),e.set(t,n)),n}}class Mx{constructor(t){this.id=yx++,this.code=t,this.usedTimes=0}}function bx(s,t,e,n,r,a,l){const c=new Wc,h=new xx,d=new Set,f=[],m=r.logarithmicDepthBuffer,g=r.vertexTextures;let _=r.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(P){return d.add(P),P===0?"uv":`uv${P}`}function y(P,E,B,q,F){const X=q.fog,et=F.geometry,K=P.isMeshStandardMaterial?q.environment:null,Mt=(P.isMeshStandardMaterial?e:t).get(P.envMap||K),Z=Mt&&Mt.mapping===Ka?Mt.image.height:null,vt=x[P.type];P.precision!==null&&(_=r.getMaxPrecision(P.precision),_!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",_,"instead."));const G=et.morphAttributes.position||et.morphAttributes.normal||et.morphAttributes.color,nt=G!==void 0?G.length:0;let J=0;et.morphAttributes.position!==void 0&&(J=1),et.morphAttributes.normal!==void 0&&(J=2),et.morphAttributes.color!==void 0&&(J=3);let at,V,Y,dt;if(vt){const He=di[vt];at=He.vertexShader,V=He.fragmentShader}else at=P.vertexShader,V=P.fragmentShader,h.update(P),Y=h.getVertexShaderID(P),dt=h.getFragmentShaderID(P);const gt=s.getRenderTarget(),wt=F.isInstancedMesh===!0,Tt=F.isBatchedMesh===!0,Pt=!!P.map,$=!!P.matcap,st=!!Mt,tt=!!P.aoMap,ot=!!P.lightMap,rt=!!P.bumpMap,mt=!!P.normalMap,D=!!P.displacementMap,T=!!P.emissiveMap,W=!!P.metalnessMap,it=!!P.roughnessMap,ct=P.anisotropy>0,_t=P.clearcoat>0,Ot=P.iridescence>0,yt=P.sheen>0,At=P.transmission>0,It=ct&&!!P.anisotropyMap,St=_t&&!!P.clearcoatMap,Ct=_t&&!!P.clearcoatNormalMap,Xt=_t&&!!P.clearcoatRoughnessMap,Nt=Ot&&!!P.iridescenceMap,Ut=Ot&&!!P.iridescenceThicknessMap,jt=yt&&!!P.sheenColorMap,zt=yt&&!!P.sheenRoughnessMap,ee=!!P.specularMap,ue=!!P.specularColorMap,ge=!!P.specularIntensityMap,Ht=At&&!!P.transmissionMap,S=At&&!!P.thicknessMap,lt=!!P.gradientMap,xt=!!P.alphaMap,Lt=P.alphaTest>0,Ft=!!P.alphaHash,pe=!!P.extensions;let he=Qi;P.toneMapped&&(gt===null||gt.isXRRenderTarget===!0)&&(he=s.toneMapping);const be={shaderID:vt,shaderType:P.type,shaderName:P.name,vertexShader:at,fragmentShader:V,defines:P.defines,customVertexShaderID:Y,customFragmentShaderID:dt,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:_,batching:Tt,instancing:wt,instancingColor:wt&&F.instanceColor!==null,instancingMorph:wt&&F.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:gt===null?s.outputColorSpace:gt.isXRRenderTarget===!0?gt.texture.colorSpace:ss,alphaToCoverage:!!P.alphaToCoverage,map:Pt,matcap:$,envMap:st,envMapMode:st&&Mt.mapping,envMapCubeUVHeight:Z,aoMap:tt,lightMap:ot,bumpMap:rt,normalMap:mt,displacementMap:g&&D,emissiveMap:T,normalMapObjectSpace:mt&&P.normalMapType===Cg,normalMapTangentSpace:mt&&P.normalMapType===xf,metalnessMap:W,roughnessMap:it,anisotropy:ct,anisotropyMap:It,clearcoat:_t,clearcoatMap:St,clearcoatNormalMap:Ct,clearcoatRoughnessMap:Xt,iridescence:Ot,iridescenceMap:Nt,iridescenceThicknessMap:Ut,sheen:yt,sheenColorMap:jt,sheenRoughnessMap:zt,specularMap:ee,specularColorMap:ue,specularIntensityMap:ge,transmission:At,transmissionMap:Ht,thicknessMap:S,gradientMap:lt,opaque:P.transparent===!1&&P.blending===pr&&P.alphaToCoverage===!1,alphaMap:xt,alphaTest:Lt,alphaHash:Ft,combine:P.combine,mapUv:Pt&&w(P.map.channel),aoMapUv:tt&&w(P.aoMap.channel),lightMapUv:ot&&w(P.lightMap.channel),bumpMapUv:rt&&w(P.bumpMap.channel),normalMapUv:mt&&w(P.normalMap.channel),displacementMapUv:D&&w(P.displacementMap.channel),emissiveMapUv:T&&w(P.emissiveMap.channel),metalnessMapUv:W&&w(P.metalnessMap.channel),roughnessMapUv:it&&w(P.roughnessMap.channel),anisotropyMapUv:It&&w(P.anisotropyMap.channel),clearcoatMapUv:St&&w(P.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&w(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Xt&&w(P.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&w(P.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&w(P.iridescenceThicknessMap.channel),sheenColorMapUv:jt&&w(P.sheenColorMap.channel),sheenRoughnessMapUv:zt&&w(P.sheenRoughnessMap.channel),specularMapUv:ee&&w(P.specularMap.channel),specularColorMapUv:ue&&w(P.specularColorMap.channel),specularIntensityMapUv:ge&&w(P.specularIntensityMap.channel),transmissionMapUv:Ht&&w(P.transmissionMap.channel),thicknessMapUv:S&&w(P.thicknessMap.channel),alphaMapUv:xt&&w(P.alphaMap.channel),vertexTangents:!!et.attributes.tangent&&(mt||ct),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!et.attributes.color&&et.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!et.attributes.uv&&(Pt||xt),fog:!!X,useFog:P.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:F.isSkinnedMesh===!0,morphTargets:et.morphAttributes.position!==void 0,morphNormals:et.morphAttributes.normal!==void 0,morphColors:et.morphAttributes.color!==void 0,morphTargetsCount:nt,morphTextureStride:J,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&B.length>0,shadowMapType:s.shadowMap.type,toneMapping:he,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Pt&&P.map.isVideoTexture===!0&&xe.getTransfer(P.map.colorSpace)===Te,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Vn,flipSided:P.side===Pn,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:pe&&P.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:pe&&P.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return be.vertexUv1s=d.has(1),be.vertexUv2s=d.has(2),be.vertexUv3s=d.has(3),d.clear(),be}function v(P){const E=[];if(P.shaderID?E.push(P.shaderID):(E.push(P.customVertexShaderID),E.push(P.customFragmentShaderID)),P.defines!==void 0)for(const B in P.defines)E.push(B),E.push(P.defines[B]);return P.isRawShaderMaterial===!1&&(N(E,P),b(E,P),E.push(s.outputColorSpace)),E.push(P.customProgramCacheKey),E.join()}function N(P,E){P.push(E.precision),P.push(E.outputColorSpace),P.push(E.envMapMode),P.push(E.envMapCubeUVHeight),P.push(E.mapUv),P.push(E.alphaMapUv),P.push(E.lightMapUv),P.push(E.aoMapUv),P.push(E.bumpMapUv),P.push(E.normalMapUv),P.push(E.displacementMapUv),P.push(E.emissiveMapUv),P.push(E.metalnessMapUv),P.push(E.roughnessMapUv),P.push(E.anisotropyMapUv),P.push(E.clearcoatMapUv),P.push(E.clearcoatNormalMapUv),P.push(E.clearcoatRoughnessMapUv),P.push(E.iridescenceMapUv),P.push(E.iridescenceThicknessMapUv),P.push(E.sheenColorMapUv),P.push(E.sheenRoughnessMapUv),P.push(E.specularMapUv),P.push(E.specularColorMapUv),P.push(E.specularIntensityMapUv),P.push(E.transmissionMapUv),P.push(E.thicknessMapUv),P.push(E.combine),P.push(E.fogExp2),P.push(E.sizeAttenuation),P.push(E.morphTargetsCount),P.push(E.morphAttributeCount),P.push(E.numDirLights),P.push(E.numPointLights),P.push(E.numSpotLights),P.push(E.numSpotLightMaps),P.push(E.numHemiLights),P.push(E.numRectAreaLights),P.push(E.numDirLightShadows),P.push(E.numPointLightShadows),P.push(E.numSpotLightShadows),P.push(E.numSpotLightShadowsWithMaps),P.push(E.numLightProbes),P.push(E.shadowMapType),P.push(E.toneMapping),P.push(E.numClippingPlanes),P.push(E.numClipIntersection),P.push(E.depthPacking)}function b(P,E){c.disableAll(),E.supportsVertexTextures&&c.enable(0),E.instancing&&c.enable(1),E.instancingColor&&c.enable(2),E.instancingMorph&&c.enable(3),E.matcap&&c.enable(4),E.envMap&&c.enable(5),E.normalMapObjectSpace&&c.enable(6),E.normalMapTangentSpace&&c.enable(7),E.clearcoat&&c.enable(8),E.iridescence&&c.enable(9),E.alphaTest&&c.enable(10),E.vertexColors&&c.enable(11),E.vertexAlphas&&c.enable(12),E.vertexUv1s&&c.enable(13),E.vertexUv2s&&c.enable(14),E.vertexUv3s&&c.enable(15),E.vertexTangents&&c.enable(16),E.anisotropy&&c.enable(17),E.alphaHash&&c.enable(18),E.batching&&c.enable(19),P.push(c.mask),c.disableAll(),E.fog&&c.enable(0),E.useFog&&c.enable(1),E.flatShading&&c.enable(2),E.logarithmicDepthBuffer&&c.enable(3),E.skinning&&c.enable(4),E.morphTargets&&c.enable(5),E.morphNormals&&c.enable(6),E.morphColors&&c.enable(7),E.premultipliedAlpha&&c.enable(8),E.shadowMapEnabled&&c.enable(9),E.useLegacyLights&&c.enable(10),E.doubleSided&&c.enable(11),E.flipSided&&c.enable(12),E.useDepthPacking&&c.enable(13),E.dithering&&c.enable(14),E.transmission&&c.enable(15),E.sheen&&c.enable(16),E.opaque&&c.enable(17),E.pointsUvs&&c.enable(18),E.decodeVideoTexture&&c.enable(19),E.alphaToCoverage&&c.enable(20),P.push(c.mask)}function A(P){const E=x[P.type];let B;if(E){const q=di[E];B=r_.clone(q.uniforms)}else B=P.uniforms;return B}function k(P,E){let B;for(let q=0,F=f.length;q<F;q++){const X=f[q];if(X.cacheKey===E){B=X,++B.usedTimes;break}}return B===void 0&&(B=new vx(s,E,P,a),f.push(B)),B}function I(P){if(--P.usedTimes===0){const E=f.indexOf(P);f[E]=f[f.length-1],f.pop(),P.destroy()}}function R(P){h.remove(P)}function U(){h.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:A,acquireProgram:k,releaseProgram:I,releaseShaderCache:R,programs:f,dispose:U}}function wx(){let s=new WeakMap;function t(a){let l=s.get(a);return l===void 0&&(l={},s.set(a,l)),l}function e(a){s.delete(a)}function n(a,l,c){s.get(a)[l]=c}function r(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function Sx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function yd(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function xd(){const s=[];let t=0;const e=[],n=[],r=[];function a(){t=0,e.length=0,n.length=0,r.length=0}function l(m,g,_,x,w,y){let v=s[t];return v===void 0?(v={id:m.id,object:m,geometry:g,material:_,groupOrder:x,renderOrder:m.renderOrder,z:w,group:y},s[t]=v):(v.id=m.id,v.object=m,v.geometry=g,v.material=_,v.groupOrder=x,v.renderOrder=m.renderOrder,v.z=w,v.group=y),t++,v}function c(m,g,_,x,w,y){const v=l(m,g,_,x,w,y);_.transmission>0?n.push(v):_.transparent===!0?r.push(v):e.push(v)}function h(m,g,_,x,w,y){const v=l(m,g,_,x,w,y);_.transmission>0?n.unshift(v):_.transparent===!0?r.unshift(v):e.unshift(v)}function d(m,g){e.length>1&&e.sort(m||Sx),n.length>1&&n.sort(g||yd),r.length>1&&r.sort(g||yd)}function f(){for(let m=t,g=s.length;m<g;m++){const _=s[m];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:r,init:a,push:c,unshift:h,finish:f,sort:d}}function Ex(){let s=new WeakMap;function t(n,r){const a=s.get(n);let l;return a===void 0?(l=new xd,s.set(n,[l])):r>=a.length?(l=new xd,a.push(l)):l=a[r],l}function e(){s=new WeakMap}return{get:t,dispose:e}}function Tx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new H,color:new ne};break;case"SpotLight":e={position:new H,direction:new H,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new H,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new H,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new H,halfWidth:new H,halfHeight:new H};break}return s[t.id]=e,e}}}function Ax(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Lx=0;function Px(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Cx(s){const t=new Tx,e=Ax(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new H);const r=new H,a=new Me,l=new Me;function c(d,f){let m=0,g=0,_=0;for(let B=0;B<9;B++)n.probe[B].set(0,0,0);let x=0,w=0,y=0,v=0,N=0,b=0,A=0,k=0,I=0,R=0,U=0;d.sort(Px);const P=f===!0?Math.PI:1;for(let B=0,q=d.length;B<q;B++){const F=d[B],X=F.color,et=F.intensity,K=F.distance,Mt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)m+=X.r*et*P,g+=X.g*et*P,_+=X.b*et*P;else if(F.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(F.sh.coefficients[Z],et);U++}else if(F.isDirectionalLight){const Z=t.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity*P),F.castShadow){const vt=F.shadow,G=e.get(F);G.shadowBias=vt.bias,G.shadowNormalBias=vt.normalBias,G.shadowRadius=vt.radius,G.shadowMapSize=vt.mapSize,n.directionalShadow[x]=G,n.directionalShadowMap[x]=Mt,n.directionalShadowMatrix[x]=F.shadow.matrix,b++}n.directional[x]=Z,x++}else if(F.isSpotLight){const Z=t.get(F);Z.position.setFromMatrixPosition(F.matrixWorld),Z.color.copy(X).multiplyScalar(et*P),Z.distance=K,Z.coneCos=Math.cos(F.angle),Z.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),Z.decay=F.decay,n.spot[y]=Z;const vt=F.shadow;if(F.map&&(n.spotLightMap[I]=F.map,I++,vt.updateMatrices(F),F.castShadow&&R++),n.spotLightMatrix[y]=vt.matrix,F.castShadow){const G=e.get(F);G.shadowBias=vt.bias,G.shadowNormalBias=vt.normalBias,G.shadowRadius=vt.radius,G.shadowMapSize=vt.mapSize,n.spotShadow[y]=G,n.spotShadowMap[y]=Mt,k++}y++}else if(F.isRectAreaLight){const Z=t.get(F);Z.color.copy(X).multiplyScalar(et),Z.halfWidth.set(F.width*.5,0,0),Z.halfHeight.set(0,F.height*.5,0),n.rectArea[v]=Z,v++}else if(F.isPointLight){const Z=t.get(F);if(Z.color.copy(F.color).multiplyScalar(F.intensity*P),Z.distance=F.distance,Z.decay=F.decay,F.castShadow){const vt=F.shadow,G=e.get(F);G.shadowBias=vt.bias,G.shadowNormalBias=vt.normalBias,G.shadowRadius=vt.radius,G.shadowMapSize=vt.mapSize,G.shadowCameraNear=vt.camera.near,G.shadowCameraFar=vt.camera.far,n.pointShadow[w]=G,n.pointShadowMap[w]=Mt,n.pointShadowMatrix[w]=F.shadow.matrix,A++}n.point[w]=Z,w++}else if(F.isHemisphereLight){const Z=t.get(F);Z.skyColor.copy(F.color).multiplyScalar(et*P),Z.groundColor.copy(F.groundColor).multiplyScalar(et*P),n.hemi[N]=Z,N++}}v>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Rt.LTC_FLOAT_1,n.rectAreaLTC2=Rt.LTC_FLOAT_2):(n.rectAreaLTC1=Rt.LTC_HALF_1,n.rectAreaLTC2=Rt.LTC_HALF_2)),n.ambient[0]=m,n.ambient[1]=g,n.ambient[2]=_;const E=n.hash;(E.directionalLength!==x||E.pointLength!==w||E.spotLength!==y||E.rectAreaLength!==v||E.hemiLength!==N||E.numDirectionalShadows!==b||E.numPointShadows!==A||E.numSpotShadows!==k||E.numSpotMaps!==I||E.numLightProbes!==U)&&(n.directional.length=x,n.spot.length=y,n.rectArea.length=v,n.point.length=w,n.hemi.length=N,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=k,n.spotShadowMap.length=k,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=k+I-R,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=U,E.directionalLength=x,E.pointLength=w,E.spotLength=y,E.rectAreaLength=v,E.hemiLength=N,E.numDirectionalShadows=b,E.numPointShadows=A,E.numSpotShadows=k,E.numSpotMaps=I,E.numLightProbes=U,n.version=Lx++)}function h(d,f){let m=0,g=0,_=0,x=0,w=0;const y=f.matrixWorldInverse;for(let v=0,N=d.length;v<N;v++){const b=d[v];if(b.isDirectionalLight){const A=n.directional[m];A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(y),m++}else if(b.isSpotLight){const A=n.spot[_];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(y),A.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(y),_++}else if(b.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(y),l.identity(),a.copy(b.matrixWorld),a.premultiply(y),l.extractRotation(a),A.halfWidth.set(b.width*.5,0,0),A.halfHeight.set(0,b.height*.5,0),A.halfWidth.applyMatrix4(l),A.halfHeight.applyMatrix4(l),x++}else if(b.isPointLight){const A=n.point[g];A.position.setFromMatrixPosition(b.matrixWorld),A.position.applyMatrix4(y),g++}else if(b.isHemisphereLight){const A=n.hemi[w];A.direction.setFromMatrixPosition(b.matrixWorld),A.direction.transformDirection(y),w++}}}return{setup:c,setupView:h,state:n}}function Md(s){const t=new Cx(s),e=[],n=[];function r(){e.length=0,n.length=0}function a(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function h(f){t.setupView(e,f)}return{init:r,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:h,pushLight:a,pushShadow:l}}function Rx(s){let t=new WeakMap;function e(r,a=0){const l=t.get(r);let c;return l===void 0?(c=new Md(s),t.set(r,[c])):a>=l.length?(c=new Md(s),l.push(c)):c=l[a],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class Ix extends Dr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Lg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Dx extends Dr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Nx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ox=`uniform sampler2D shadow_pass;
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
}`;function Ux(s,t,e){let n=new Zc;const r=new Et,a=new Et,l=new tn,c=new Ix({depthPacking:Pg}),h=new Dx,d={},f=e.maxTextureSize,m={[es]:Pn,[Pn]:es,[Vn]:Vn},g=new ns({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:Nx,fragmentShader:Ox}),_=g.clone();_.defines.HORIZONTAL_PASS=1;const x=new an;x.setAttribute("position",new ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Ne(x,g),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cf;let v=this.type;this.render=function(I,R,U){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||I.length===0)return;const P=s.getRenderTarget(),E=s.getActiveCubeFace(),B=s.getActiveMipmapLevel(),q=s.state;q.setBlending(Ji),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const F=v!==Ii&&this.type===Ii,X=v===Ii&&this.type!==Ii;for(let et=0,K=I.length;et<K;et++){const Mt=I[et],Z=Mt.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",Mt,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;r.copy(Z.mapSize);const vt=Z.getFrameExtents();if(r.multiply(vt),a.copy(Z.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(a.x=Math.floor(f/vt.x),r.x=a.x*vt.x,Z.mapSize.x=a.x),r.y>f&&(a.y=Math.floor(f/vt.y),r.y=a.y*vt.y,Z.mapSize.y=a.y)),Z.map===null||F===!0||X===!0){const nt=this.type!==Ii?{minFilter:Ln,magFilter:Ln}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Ss(r.x,r.y,nt),Z.map.texture.name=Mt.name+".shadowMap",Z.camera.updateProjectionMatrix()}s.setRenderTarget(Z.map),s.clear();const G=Z.getViewportCount();for(let nt=0;nt<G;nt++){const J=Z.getViewport(nt);l.set(a.x*J.x,a.y*J.y,a.x*J.z,a.y*J.w),q.viewport(l),Z.updateMatrices(Mt,nt),n=Z.getFrustum(),A(R,U,Z.camera,Mt,this.type)}Z.isPointLightShadow!==!0&&this.type===Ii&&N(Z,U),Z.needsUpdate=!1}v=this.type,y.needsUpdate=!1,s.setRenderTarget(P,E,B)};function N(I,R){const U=t.update(w);g.defines.VSM_SAMPLES!==I.blurSamples&&(g.defines.VSM_SAMPLES=I.blurSamples,_.defines.VSM_SAMPLES=I.blurSamples,g.needsUpdate=!0,_.needsUpdate=!0),I.mapPass===null&&(I.mapPass=new Ss(r.x,r.y)),g.uniforms.shadow_pass.value=I.map.texture,g.uniforms.resolution.value=I.mapSize,g.uniforms.radius.value=I.radius,s.setRenderTarget(I.mapPass),s.clear(),s.renderBufferDirect(R,null,U,g,w,null),_.uniforms.shadow_pass.value=I.mapPass.texture,_.uniforms.resolution.value=I.mapSize,_.uniforms.radius.value=I.radius,s.setRenderTarget(I.map),s.clear(),s.renderBufferDirect(R,null,U,_,w,null)}function b(I,R,U,P){let E=null;const B=U.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(B!==void 0)E=B;else if(E=U.isPointLight===!0?h:c,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const q=E.uuid,F=R.uuid;let X=d[q];X===void 0&&(X={},d[q]=X);let et=X[F];et===void 0&&(et=E.clone(),X[F]=et,R.addEventListener("dispose",k)),E=et}if(E.visible=R.visible,E.wireframe=R.wireframe,P===Ii?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:m[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const q=s.properties.get(E);q.light=U}return E}function A(I,R,U,P,E){if(I.visible===!1)return;if(I.layers.test(R.layers)&&(I.isMesh||I.isLine||I.isPoints)&&(I.castShadow||I.receiveShadow&&E===Ii)&&(!I.frustumCulled||n.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,I.matrixWorld);const F=t.update(I),X=I.material;if(Array.isArray(X)){const et=F.groups;for(let K=0,Mt=et.length;K<Mt;K++){const Z=et[K],vt=X[Z.materialIndex];if(vt&&vt.visible){const G=b(I,vt,P,E);I.onBeforeShadow(s,I,R,U,F,G,Z),s.renderBufferDirect(U,null,F,G,I,Z),I.onAfterShadow(s,I,R,U,F,G,Z)}}}else if(X.visible){const et=b(I,X,P,E);I.onBeforeShadow(s,I,R,U,F,et,null),s.renderBufferDirect(U,null,F,et,I,null),I.onAfterShadow(s,I,R,U,F,et,null)}}const q=I.children;for(let F=0,X=q.length;F<X;F++)A(q[F],R,U,P,E)}function k(I){I.target.removeEventListener("dispose",k);for(const U in d){const P=d[U],E=I.target.uuid;E in P&&(P[E].dispose(),delete P[E])}}}function kx(s){function t(){let S=!1;const lt=new tn;let xt=null;const Lt=new tn(0,0,0,0);return{setMask:function(Ft){xt!==Ft&&!S&&(s.colorMask(Ft,Ft,Ft,Ft),xt=Ft)},setLocked:function(Ft){S=Ft},setClear:function(Ft,pe,he,be,He){He===!0&&(Ft*=be,pe*=be,he*=be),lt.set(Ft,pe,he,be),Lt.equals(lt)===!1&&(s.clearColor(Ft,pe,he,be),Lt.copy(lt))},reset:function(){S=!1,xt=null,Lt.set(-1,0,0,0)}}}function e(){let S=!1,lt=null,xt=null,Lt=null;return{setTest:function(Ft){Ft?dt(s.DEPTH_TEST):gt(s.DEPTH_TEST)},setMask:function(Ft){lt!==Ft&&!S&&(s.depthMask(Ft),lt=Ft)},setFunc:function(Ft){if(xt!==Ft){switch(Ft){case ng:s.depthFunc(s.NEVER);break;case ig:s.depthFunc(s.ALWAYS);break;case sg:s.depthFunc(s.LESS);break;case Da:s.depthFunc(s.LEQUAL);break;case rg:s.depthFunc(s.EQUAL);break;case og:s.depthFunc(s.GEQUAL);break;case ag:s.depthFunc(s.GREATER);break;case lg:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xt=Ft}},setLocked:function(Ft){S=Ft},setClear:function(Ft){Lt!==Ft&&(s.clearDepth(Ft),Lt=Ft)},reset:function(){S=!1,lt=null,xt=null,Lt=null}}}function n(){let S=!1,lt=null,xt=null,Lt=null,Ft=null,pe=null,he=null,be=null,He=null;return{setTest:function(ye){S||(ye?dt(s.STENCIL_TEST):gt(s.STENCIL_TEST))},setMask:function(ye){lt!==ye&&!S&&(s.stencilMask(ye),lt=ye)},setFunc:function(ye,Oe,Pe){(xt!==ye||Lt!==Oe||Ft!==Pe)&&(s.stencilFunc(ye,Oe,Pe),xt=ye,Lt=Oe,Ft=Pe)},setOp:function(ye,Oe,Pe){(pe!==ye||he!==Oe||be!==Pe)&&(s.stencilOp(ye,Oe,Pe),pe=ye,he=Oe,be=Pe)},setLocked:function(ye){S=ye},setClear:function(ye){He!==ye&&(s.clearStencil(ye),He=ye)},reset:function(){S=!1,lt=null,xt=null,Lt=null,Ft=null,pe=null,he=null,be=null,He=null}}}const r=new t,a=new e,l=new n,c=new WeakMap,h=new WeakMap;let d={},f={},m=new WeakMap,g=[],_=null,x=!1,w=null,y=null,v=null,N=null,b=null,A=null,k=null,I=new ne(0,0,0),R=0,U=!1,P=null,E=null,B=null,q=null,F=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let et=!1,K=0;const Mt=s.getParameter(s.VERSION);Mt.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Mt)[1]),et=K>=1):Mt.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Mt)[1]),et=K>=2);let Z=null,vt={};const G=s.getParameter(s.SCISSOR_BOX),nt=s.getParameter(s.VIEWPORT),J=new tn().fromArray(G),at=new tn().fromArray(nt);function V(S,lt,xt,Lt){const Ft=new Uint8Array(4),pe=s.createTexture();s.bindTexture(S,pe),s.texParameteri(S,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(S,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let he=0;he<xt;he++)S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY?s.texImage3D(lt,0,s.RGBA,1,1,Lt,0,s.RGBA,s.UNSIGNED_BYTE,Ft):s.texImage2D(lt+he,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ft);return pe}const Y={};Y[s.TEXTURE_2D]=V(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=V(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=V(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=V(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),dt(s.DEPTH_TEST),a.setFunc(Da),rt(!1),mt(ih),dt(s.CULL_FACE),tt(Ji);function dt(S){d[S]!==!0&&(s.enable(S),d[S]=!0)}function gt(S){d[S]!==!1&&(s.disable(S),d[S]=!1)}function wt(S,lt){return f[S]!==lt?(s.bindFramebuffer(S,lt),f[S]=lt,S===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=lt),S===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=lt),!0):!1}function Tt(S,lt){let xt=g,Lt=!1;if(S){xt=m.get(lt),xt===void 0&&(xt=[],m.set(lt,xt));const Ft=S.textures;if(xt.length!==Ft.length||xt[0]!==s.COLOR_ATTACHMENT0){for(let pe=0,he=Ft.length;pe<he;pe++)xt[pe]=s.COLOR_ATTACHMENT0+pe;xt.length=Ft.length,Lt=!0}}else xt[0]!==s.BACK&&(xt[0]=s.BACK,Lt=!0);Lt&&s.drawBuffers(xt)}function Pt(S){return _!==S?(s.useProgram(S),_=S,!0):!1}const $={[ys]:s.FUNC_ADD,[Bm]:s.FUNC_SUBTRACT,[zm]:s.FUNC_REVERSE_SUBTRACT};$[Hm]=s.MIN,$[Vm]=s.MAX;const st={[Gm]:s.ZERO,[Wm]:s.ONE,[Zm]:s.SRC_COLOR,[Mc]:s.SRC_ALPHA,[Km]:s.SRC_ALPHA_SATURATE,[Ym]:s.DST_COLOR,[qm]:s.DST_ALPHA,[Xm]:s.ONE_MINUS_SRC_COLOR,[bc]:s.ONE_MINUS_SRC_ALPHA,[jm]:s.ONE_MINUS_DST_COLOR,[$m]:s.ONE_MINUS_DST_ALPHA,[Jm]:s.CONSTANT_COLOR,[Qm]:s.ONE_MINUS_CONSTANT_COLOR,[tg]:s.CONSTANT_ALPHA,[eg]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(S,lt,xt,Lt,Ft,pe,he,be,He,ye){if(S===Ji){x===!0&&(gt(s.BLEND),x=!1);return}if(x===!1&&(dt(s.BLEND),x=!0),S!==Fm){if(S!==w||ye!==U){if((y!==ys||b!==ys)&&(s.blendEquation(s.FUNC_ADD),y=ys,b=ys),ye)switch(S){case pr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case sh:s.blendFunc(s.ONE,s.ONE);break;case rh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case oh:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case pr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case sh:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case rh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case oh:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}v=null,N=null,A=null,k=null,I.set(0,0,0),R=0,w=S,U=ye}return}Ft=Ft||lt,pe=pe||xt,he=he||Lt,(lt!==y||Ft!==b)&&(s.blendEquationSeparate($[lt],$[Ft]),y=lt,b=Ft),(xt!==v||Lt!==N||pe!==A||he!==k)&&(s.blendFuncSeparate(st[xt],st[Lt],st[pe],st[he]),v=xt,N=Lt,A=pe,k=he),(be.equals(I)===!1||He!==R)&&(s.blendColor(be.r,be.g,be.b,He),I.copy(be),R=He),w=S,U=!1}function ot(S,lt){S.side===Vn?gt(s.CULL_FACE):dt(s.CULL_FACE);let xt=S.side===Pn;lt&&(xt=!xt),rt(xt),S.blending===pr&&S.transparent===!1?tt(Ji):tt(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),a.setFunc(S.depthFunc),a.setTest(S.depthTest),a.setMask(S.depthWrite),r.setMask(S.colorWrite);const Lt=S.stencilWrite;l.setTest(Lt),Lt&&(l.setMask(S.stencilWriteMask),l.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),l.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),T(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?dt(s.SAMPLE_ALPHA_TO_COVERAGE):gt(s.SAMPLE_ALPHA_TO_COVERAGE)}function rt(S){P!==S&&(S?s.frontFace(s.CW):s.frontFace(s.CCW),P=S)}function mt(S){S!==Om?(dt(s.CULL_FACE),S!==E&&(S===ih?s.cullFace(s.BACK):S===Um?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):gt(s.CULL_FACE),E=S}function D(S){S!==B&&(et&&s.lineWidth(S),B=S)}function T(S,lt,xt){S?(dt(s.POLYGON_OFFSET_FILL),(q!==lt||F!==xt)&&(s.polygonOffset(lt,xt),q=lt,F=xt)):gt(s.POLYGON_OFFSET_FILL)}function W(S){S?dt(s.SCISSOR_TEST):gt(s.SCISSOR_TEST)}function it(S){S===void 0&&(S=s.TEXTURE0+X-1),Z!==S&&(s.activeTexture(S),Z=S)}function ct(S,lt,xt){xt===void 0&&(Z===null?xt=s.TEXTURE0+X-1:xt=Z);let Lt=vt[xt];Lt===void 0&&(Lt={type:void 0,texture:void 0},vt[xt]=Lt),(Lt.type!==S||Lt.texture!==lt)&&(Z!==xt&&(s.activeTexture(xt),Z=xt),s.bindTexture(S,lt||Y[S]),Lt.type=S,Lt.texture=lt)}function _t(){const S=vt[Z];S!==void 0&&S.type!==void 0&&(s.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function Ot(){try{s.compressedTexImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function yt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function At(){try{s.texSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function It(){try{s.texSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function St(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ct(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Xt(){try{s.texStorage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Nt(){try{s.texStorage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ut(){try{s.texImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function jt(){try{s.texImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function zt(S){J.equals(S)===!1&&(s.scissor(S.x,S.y,S.z,S.w),J.copy(S))}function ee(S){at.equals(S)===!1&&(s.viewport(S.x,S.y,S.z,S.w),at.copy(S))}function ue(S,lt){let xt=h.get(lt);xt===void 0&&(xt=new WeakMap,h.set(lt,xt));let Lt=xt.get(S);Lt===void 0&&(Lt=s.getUniformBlockIndex(lt,S.name),xt.set(S,Lt))}function ge(S,lt){const Lt=h.get(lt).get(S);c.get(lt)!==Lt&&(s.uniformBlockBinding(lt,Lt,S.__bindingPointIndex),c.set(lt,Lt))}function Ht(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},Z=null,vt={},f={},m=new WeakMap,g=[],_=null,x=!1,w=null,y=null,v=null,N=null,b=null,A=null,k=null,I=new ne(0,0,0),R=0,U=!1,P=null,E=null,B=null,q=null,F=null,J.set(0,0,s.canvas.width,s.canvas.height),at.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:dt,disable:gt,bindFramebuffer:wt,drawBuffers:Tt,useProgram:Pt,setBlending:tt,setMaterial:ot,setFlipSided:rt,setCullFace:mt,setLineWidth:D,setPolygonOffset:T,setScissorTest:W,activeTexture:it,bindTexture:ct,unbindTexture:_t,compressedTexImage2D:Ot,compressedTexImage3D:yt,texImage2D:Ut,texImage3D:jt,updateUBOMapping:ue,uniformBlockBinding:ge,texStorage2D:Xt,texStorage3D:Nt,texSubImage2D:At,texSubImage3D:It,compressedTexSubImage2D:St,compressedTexSubImage3D:Ct,scissor:zt,viewport:ee,reset:Ht}}function Fx(s,t,e,n,r,a,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Et,f=new WeakMap;let m;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(D,T){return _?new OffscreenCanvas(D,T):Ba("canvas")}function w(D,T,W){let it=1;const ct=mt(D);if((ct.width>W||ct.height>W)&&(it=W/Math.max(ct.width,ct.height)),it<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const _t=Math.floor(it*ct.width),Ot=Math.floor(it*ct.height);m===void 0&&(m=x(_t,Ot));const yt=T?x(_t,Ot):m;return yt.width=_t,yt.height=Ot,yt.getContext("2d").drawImage(D,0,0,_t,Ot),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ct.width+"x"+ct.height+") to ("+_t+"x"+Ot+")."),yt}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ct.width+"x"+ct.height+")."),D;return D}function y(D){return D.generateMipmaps&&D.minFilter!==Ln&&D.minFilter!==Jn}function v(D){s.generateMipmap(D)}function N(D,T,W,it,ct=!1){if(D!==null){if(s[D]!==void 0)return s[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let _t=T;if(T===s.RED&&(W===s.FLOAT&&(_t=s.R32F),W===s.HALF_FLOAT&&(_t=s.R16F),W===s.UNSIGNED_BYTE&&(_t=s.R8)),T===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(_t=s.R8UI),W===s.UNSIGNED_SHORT&&(_t=s.R16UI),W===s.UNSIGNED_INT&&(_t=s.R32UI),W===s.BYTE&&(_t=s.R8I),W===s.SHORT&&(_t=s.R16I),W===s.INT&&(_t=s.R32I)),T===s.RG&&(W===s.FLOAT&&(_t=s.RG32F),W===s.HALF_FLOAT&&(_t=s.RG16F),W===s.UNSIGNED_BYTE&&(_t=s.RG8)),T===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(_t=s.RG8UI),W===s.UNSIGNED_SHORT&&(_t=s.RG16UI),W===s.UNSIGNED_INT&&(_t=s.RG32UI),W===s.BYTE&&(_t=s.RG8I),W===s.SHORT&&(_t=s.RG16I),W===s.INT&&(_t=s.RG32I)),T===s.RGB&&W===s.UNSIGNED_INT_5_9_9_9_REV&&(_t=s.RGB9_E5),T===s.RGBA){const Ot=ct?Oa:xe.getTransfer(it);W===s.FLOAT&&(_t=s.RGBA32F),W===s.HALF_FLOAT&&(_t=s.RGBA16F),W===s.UNSIGNED_BYTE&&(_t=Ot===Te?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT_4_4_4_4&&(_t=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(_t=s.RGB5_A1)}return(_t===s.R16F||_t===s.R32F||_t===s.RG16F||_t===s.RG32F||_t===s.RGBA16F||_t===s.RGBA32F)&&t.get("EXT_color_buffer_float"),_t}function b(D,T){return y(D)===!0||D.isFramebufferTexture&&D.minFilter!==Ln&&D.minFilter!==Jn?Math.log2(Math.max(T.width,T.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?T.mipmaps.length:1}function A(D){const T=D.target;T.removeEventListener("dispose",A),I(T),T.isVideoTexture&&f.delete(T)}function k(D){const T=D.target;T.removeEventListener("dispose",k),U(T)}function I(D){const T=n.get(D);if(T.__webglInit===void 0)return;const W=D.source,it=g.get(W);if(it){const ct=it[T.__cacheKey];ct.usedTimes--,ct.usedTimes===0&&R(D),Object.keys(it).length===0&&g.delete(W)}n.remove(D)}function R(D){const T=n.get(D);s.deleteTexture(T.__webglTexture);const W=D.source,it=g.get(W);delete it[T.__cacheKey],l.memory.textures--}function U(D){const T=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(T.__webglFramebuffer[it]))for(let ct=0;ct<T.__webglFramebuffer[it].length;ct++)s.deleteFramebuffer(T.__webglFramebuffer[it][ct]);else s.deleteFramebuffer(T.__webglFramebuffer[it]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[it])}else{if(Array.isArray(T.__webglFramebuffer))for(let it=0;it<T.__webglFramebuffer.length;it++)s.deleteFramebuffer(T.__webglFramebuffer[it]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let it=0;it<T.__webglColorRenderbuffer.length;it++)T.__webglColorRenderbuffer[it]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[it]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const W=D.textures;for(let it=0,ct=W.length;it<ct;it++){const _t=n.get(W[it]);_t.__webglTexture&&(s.deleteTexture(_t.__webglTexture),l.memory.textures--),n.remove(W[it])}n.remove(D)}let P=0;function E(){P=0}function B(){const D=P;return D>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+r.maxTextures),P+=1,D}function q(D){const T=[];return T.push(D.wrapS),T.push(D.wrapT),T.push(D.wrapR||0),T.push(D.magFilter),T.push(D.minFilter),T.push(D.anisotropy),T.push(D.internalFormat),T.push(D.format),T.push(D.type),T.push(D.generateMipmaps),T.push(D.premultiplyAlpha),T.push(D.flipY),T.push(D.unpackAlignment),T.push(D.colorSpace),T.join()}function F(D,T){const W=n.get(D);if(D.isVideoTexture&&ot(D),D.isRenderTargetTexture===!1&&D.version>0&&W.__version!==D.version){const it=D.image;if(it===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(it.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{J(W,D,T);return}}e.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+T)}function X(D,T){const W=n.get(D);if(D.version>0&&W.__version!==D.version){J(W,D,T);return}e.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+T)}function et(D,T){const W=n.get(D);if(D.version>0&&W.__version!==D.version){J(W,D,T);return}e.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+T)}function K(D,T){const W=n.get(D);if(D.version>0&&W.__version!==D.version){at(W,D,T);return}e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+T)}const Mt={[Ec]:s.REPEAT,[Ms]:s.CLAMP_TO_EDGE,[Tc]:s.MIRRORED_REPEAT},Z={[Ln]:s.NEAREST,[vg]:s.NEAREST_MIPMAP_NEAREST,[Ko]:s.NEAREST_MIPMAP_LINEAR,[Jn]:s.LINEAR,[Il]:s.LINEAR_MIPMAP_NEAREST,[bs]:s.LINEAR_MIPMAP_LINEAR},vt={[Rg]:s.NEVER,[kg]:s.ALWAYS,[Ig]:s.LESS,[Mf]:s.LEQUAL,[Dg]:s.EQUAL,[Ug]:s.GEQUAL,[Ng]:s.GREATER,[Og]:s.NOTEQUAL};function G(D,T){if(T.type===Ni&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===Jn||T.magFilter===Il||T.magFilter===Ko||T.magFilter===bs||T.minFilter===Jn||T.minFilter===Il||T.minFilter===Ko||T.minFilter===bs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(D,s.TEXTURE_WRAP_S,Mt[T.wrapS]),s.texParameteri(D,s.TEXTURE_WRAP_T,Mt[T.wrapT]),(D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY)&&s.texParameteri(D,s.TEXTURE_WRAP_R,Mt[T.wrapR]),s.texParameteri(D,s.TEXTURE_MAG_FILTER,Z[T.magFilter]),s.texParameteri(D,s.TEXTURE_MIN_FILTER,Z[T.minFilter]),T.compareFunction&&(s.texParameteri(D,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(D,s.TEXTURE_COMPARE_FUNC,vt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===Ln||T.minFilter!==Ko&&T.minFilter!==bs||T.type===Ni&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const W=t.get("EXT_texture_filter_anisotropic");s.texParameterf(D,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function nt(D,T){let W=!1;D.__webglInit===void 0&&(D.__webglInit=!0,T.addEventListener("dispose",A));const it=T.source;let ct=g.get(it);ct===void 0&&(ct={},g.set(it,ct));const _t=q(T);if(_t!==D.__cacheKey){ct[_t]===void 0&&(ct[_t]={texture:s.createTexture(),usedTimes:0},l.memory.textures++,W=!0),ct[_t].usedTimes++;const Ot=ct[D.__cacheKey];Ot!==void 0&&(ct[D.__cacheKey].usedTimes--,Ot.usedTimes===0&&R(T)),D.__cacheKey=_t,D.__webglTexture=ct[_t].texture}return W}function J(D,T,W){let it=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(it=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(it=s.TEXTURE_3D);const ct=nt(D,T),_t=T.source;e.bindTexture(it,D.__webglTexture,s.TEXTURE0+W);const Ot=n.get(_t);if(_t.version!==Ot.__version||ct===!0){e.activeTexture(s.TEXTURE0+W);const yt=xe.getPrimaries(xe.workingColorSpace),At=T.colorSpace===$i?null:xe.getPrimaries(T.colorSpace),It=T.colorSpace===$i||yt===At?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let St=w(T.image,!1,r.maxTextureSize);St=rt(T,St);const Ct=a.convert(T.format,T.colorSpace),Xt=a.convert(T.type);let Nt=N(T.internalFormat,Ct,Xt,T.colorSpace,T.isVideoTexture);G(it,T);let Ut;const jt=T.mipmaps,zt=T.isVideoTexture!==!0&&Nt!==yf,ee=Ot.__version===void 0||ct===!0,ue=_t.dataReady,ge=b(T,St);if(T.isDepthTexture)Nt=s.DEPTH_COMPONENT16,T.type===Ni?Nt=s.DEPTH_COMPONENT32F:T.type===wr?Nt=s.DEPTH_COMPONENT24:T.type===Lo&&(Nt=s.DEPTH24_STENCIL8),ee&&(zt?e.texStorage2D(s.TEXTURE_2D,1,Nt,St.width,St.height):e.texImage2D(s.TEXTURE_2D,0,Nt,St.width,St.height,0,Ct,Xt,null));else if(T.isDataTexture)if(jt.length>0){zt&&ee&&e.texStorage2D(s.TEXTURE_2D,ge,Nt,jt[0].width,jt[0].height);for(let Ht=0,S=jt.length;Ht<S;Ht++)Ut=jt[Ht],zt?ue&&e.texSubImage2D(s.TEXTURE_2D,Ht,0,0,Ut.width,Ut.height,Ct,Xt,Ut.data):e.texImage2D(s.TEXTURE_2D,Ht,Nt,Ut.width,Ut.height,0,Ct,Xt,Ut.data);T.generateMipmaps=!1}else zt?(ee&&e.texStorage2D(s.TEXTURE_2D,ge,Nt,St.width,St.height),ue&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St.width,St.height,Ct,Xt,St.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,St.width,St.height,0,Ct,Xt,St.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){zt&&ee&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ge,Nt,jt[0].width,jt[0].height,St.depth);for(let Ht=0,S=jt.length;Ht<S;Ht++)Ut=jt[Ht],T.format!==gi?Ct!==null?zt?ue&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,Ht,0,0,0,Ut.width,Ut.height,St.depth,Ct,Ut.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,Ht,Nt,Ut.width,Ut.height,St.depth,0,Ut.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?ue&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,Ht,0,0,0,Ut.width,Ut.height,St.depth,Ct,Xt,Ut.data):e.texImage3D(s.TEXTURE_2D_ARRAY,Ht,Nt,Ut.width,Ut.height,St.depth,0,Ct,Xt,Ut.data)}else{zt&&ee&&e.texStorage2D(s.TEXTURE_2D,ge,Nt,jt[0].width,jt[0].height);for(let Ht=0,S=jt.length;Ht<S;Ht++)Ut=jt[Ht],T.format!==gi?Ct!==null?zt?ue&&e.compressedTexSubImage2D(s.TEXTURE_2D,Ht,0,0,Ut.width,Ut.height,Ct,Ut.data):e.compressedTexImage2D(s.TEXTURE_2D,Ht,Nt,Ut.width,Ut.height,0,Ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?ue&&e.texSubImage2D(s.TEXTURE_2D,Ht,0,0,Ut.width,Ut.height,Ct,Xt,Ut.data):e.texImage2D(s.TEXTURE_2D,Ht,Nt,Ut.width,Ut.height,0,Ct,Xt,Ut.data)}else if(T.isDataArrayTexture)zt?(ee&&e.texStorage3D(s.TEXTURE_2D_ARRAY,ge,Nt,St.width,St.height,St.depth),ue&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,St.width,St.height,St.depth,Ct,Xt,St.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,St.width,St.height,St.depth,0,Ct,Xt,St.data);else if(T.isData3DTexture)zt?(ee&&e.texStorage3D(s.TEXTURE_3D,ge,Nt,St.width,St.height,St.depth),ue&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,St.width,St.height,St.depth,Ct,Xt,St.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,St.width,St.height,St.depth,0,Ct,Xt,St.data);else if(T.isFramebufferTexture){if(ee)if(zt)e.texStorage2D(s.TEXTURE_2D,ge,Nt,St.width,St.height);else{let Ht=St.width,S=St.height;for(let lt=0;lt<ge;lt++)e.texImage2D(s.TEXTURE_2D,lt,Nt,Ht,S,0,Ct,Xt,null),Ht>>=1,S>>=1}}else if(jt.length>0){if(zt&&ee){const Ht=mt(jt[0]);e.texStorage2D(s.TEXTURE_2D,ge,Nt,Ht.width,Ht.height)}for(let Ht=0,S=jt.length;Ht<S;Ht++)Ut=jt[Ht],zt?ue&&e.texSubImage2D(s.TEXTURE_2D,Ht,0,0,Ct,Xt,Ut):e.texImage2D(s.TEXTURE_2D,Ht,Nt,Ct,Xt,Ut);T.generateMipmaps=!1}else if(zt){if(ee){const Ht=mt(St);e.texStorage2D(s.TEXTURE_2D,ge,Nt,Ht.width,Ht.height)}ue&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Ct,Xt,St)}else e.texImage2D(s.TEXTURE_2D,0,Nt,Ct,Xt,St);y(T)&&v(it),Ot.__version=_t.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function at(D,T,W){if(T.image.length!==6)return;const it=nt(D,T),ct=T.source;e.bindTexture(s.TEXTURE_CUBE_MAP,D.__webglTexture,s.TEXTURE0+W);const _t=n.get(ct);if(ct.version!==_t.__version||it===!0){e.activeTexture(s.TEXTURE0+W);const Ot=xe.getPrimaries(xe.workingColorSpace),yt=T.colorSpace===$i?null:xe.getPrimaries(T.colorSpace),At=T.colorSpace===$i||Ot===yt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);const It=T.isCompressedTexture||T.image[0].isCompressedTexture,St=T.image[0]&&T.image[0].isDataTexture,Ct=[];for(let S=0;S<6;S++)!It&&!St?Ct[S]=w(T.image[S],!0,r.maxCubemapSize):Ct[S]=St?T.image[S].image:T.image[S],Ct[S]=rt(T,Ct[S]);const Xt=Ct[0],Nt=a.convert(T.format,T.colorSpace),Ut=a.convert(T.type),jt=N(T.internalFormat,Nt,Ut,T.colorSpace),zt=T.isVideoTexture!==!0,ee=_t.__version===void 0||it===!0,ue=ct.dataReady;let ge=b(T,Xt);G(s.TEXTURE_CUBE_MAP,T);let Ht;if(It){zt&&ee&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ge,jt,Xt.width,Xt.height);for(let S=0;S<6;S++){Ht=Ct[S].mipmaps;for(let lt=0;lt<Ht.length;lt++){const xt=Ht[lt];T.format!==gi?Nt!==null?zt?ue&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt,0,0,xt.width,xt.height,Nt,xt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt,jt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?ue&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt,0,0,xt.width,xt.height,Nt,Ut,xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt,jt,xt.width,xt.height,0,Nt,Ut,xt.data)}}}else{if(Ht=T.mipmaps,zt&&ee){Ht.length>0&&ge++;const S=mt(Ct[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,ge,jt,S.width,S.height)}for(let S=0;S<6;S++)if(St){zt?ue&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Ct[S].width,Ct[S].height,Nt,Ut,Ct[S].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,jt,Ct[S].width,Ct[S].height,0,Nt,Ut,Ct[S].data);for(let lt=0;lt<Ht.length;lt++){const Lt=Ht[lt].image[S].image;zt?ue&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt+1,0,0,Lt.width,Lt.height,Nt,Ut,Lt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt+1,jt,Lt.width,Lt.height,0,Nt,Ut,Lt.data)}}else{zt?ue&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Nt,Ut,Ct[S]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,jt,Nt,Ut,Ct[S]);for(let lt=0;lt<Ht.length;lt++){const xt=Ht[lt];zt?ue&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt+1,0,0,Nt,Ut,xt.image[S]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,lt+1,jt,Nt,Ut,xt.image[S])}}}y(T)&&v(s.TEXTURE_CUBE_MAP),_t.__version=ct.version,T.onUpdate&&T.onUpdate(T)}D.__version=T.version}function V(D,T,W,it,ct,_t){const Ot=a.convert(W.format,W.colorSpace),yt=a.convert(W.type),At=N(W.internalFormat,Ot,yt,W.colorSpace);if(!n.get(T).__hasExternalTextures){const St=Math.max(1,T.width>>_t),Ct=Math.max(1,T.height>>_t);ct===s.TEXTURE_3D||ct===s.TEXTURE_2D_ARRAY?e.texImage3D(ct,_t,At,St,Ct,T.depth,0,Ot,yt,null):e.texImage2D(ct,_t,At,St,Ct,0,Ot,yt,null)}e.bindFramebuffer(s.FRAMEBUFFER,D),tt(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,it,ct,n.get(W).__webglTexture,0,st(T)):(ct===s.TEXTURE_2D||ct>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ct<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,it,ct,n.get(W).__webglTexture,_t),e.bindFramebuffer(s.FRAMEBUFFER,null)}function Y(D,T,W){if(s.bindRenderbuffer(s.RENDERBUFFER,D),T.depthBuffer&&!T.stencilBuffer){let it=s.DEPTH_COMPONENT24;if(W||tt(T)){const ct=T.depthTexture;ct&&ct.isDepthTexture&&(ct.type===Ni?it=s.DEPTH_COMPONENT32F:ct.type===wr&&(it=s.DEPTH_COMPONENT24));const _t=st(T);tt(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,_t,it,T.width,T.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,_t,it,T.width,T.height)}else s.renderbufferStorage(s.RENDERBUFFER,it,T.width,T.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,D)}else if(T.depthBuffer&&T.stencilBuffer){const it=st(T);W&&tt(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,it,s.DEPTH24_STENCIL8,T.width,T.height):tt(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,it,s.DEPTH24_STENCIL8,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,D)}else{const it=T.textures;for(let ct=0;ct<it.length;ct++){const _t=it[ct],Ot=a.convert(_t.format,_t.colorSpace),yt=a.convert(_t.type),At=N(_t.internalFormat,Ot,yt,_t.colorSpace),It=st(T);W&&tt(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,It,At,T.width,T.height):tt(T)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,It,At,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,At,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function dt(D,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,D),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),F(T.depthTexture,0);const it=n.get(T.depthTexture).__webglTexture,ct=st(T);if(T.depthTexture.format===mr)tt(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0,ct):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,it,0);else if(T.depthTexture.format===xo)tt(T)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0,ct):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,it,0);else throw new Error("Unknown depthTexture format")}function gt(D){const T=n.get(D),W=D.isWebGLCubeRenderTarget===!0;if(D.depthTexture&&!T.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");dt(T.__webglFramebuffer,D)}else if(W){T.__webglDepthbuffer=[];for(let it=0;it<6;it++)e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[it]),T.__webglDepthbuffer[it]=s.createRenderbuffer(),Y(T.__webglDepthbuffer[it],D,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=s.createRenderbuffer(),Y(T.__webglDepthbuffer,D,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function wt(D,T,W){const it=n.get(D);T!==void 0&&V(it.__webglFramebuffer,D,D.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&gt(D)}function Tt(D){const T=D.texture,W=n.get(D),it=n.get(T);D.addEventListener("dispose",k);const ct=D.textures,_t=D.isWebGLCubeRenderTarget===!0,Ot=ct.length>1;if(Ot||(it.__webglTexture===void 0&&(it.__webglTexture=s.createTexture()),it.__version=T.version,l.memory.textures++),_t){W.__webglFramebuffer=[];for(let yt=0;yt<6;yt++)if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer[yt]=[];for(let At=0;At<T.mipmaps.length;At++)W.__webglFramebuffer[yt][At]=s.createFramebuffer()}else W.__webglFramebuffer[yt]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){W.__webglFramebuffer=[];for(let yt=0;yt<T.mipmaps.length;yt++)W.__webglFramebuffer[yt]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(Ot)for(let yt=0,At=ct.length;yt<At;yt++){const It=n.get(ct[yt]);It.__webglTexture===void 0&&(It.__webglTexture=s.createTexture(),l.memory.textures++)}if(D.samples>0&&tt(D)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let yt=0;yt<ct.length;yt++){const At=ct[yt];W.__webglColorRenderbuffer[yt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[yt]);const It=a.convert(At.format,At.colorSpace),St=a.convert(At.type),Ct=N(At.internalFormat,It,St,At.colorSpace,D.isXRRenderTarget===!0),Xt=st(D);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt,Ct,D.width,D.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+yt,s.RENDERBUFFER,W.__webglColorRenderbuffer[yt])}s.bindRenderbuffer(s.RENDERBUFFER,null),D.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),Y(W.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(_t){e.bindTexture(s.TEXTURE_CUBE_MAP,it.__webglTexture),G(s.TEXTURE_CUBE_MAP,T);for(let yt=0;yt<6;yt++)if(T.mipmaps&&T.mipmaps.length>0)for(let At=0;At<T.mipmaps.length;At++)V(W.__webglFramebuffer[yt][At],D,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,At);else V(W.__webglFramebuffer[yt],D,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0);y(T)&&v(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ot){for(let yt=0,At=ct.length;yt<At;yt++){const It=ct[yt],St=n.get(It);e.bindTexture(s.TEXTURE_2D,St.__webglTexture),G(s.TEXTURE_2D,It),V(W.__webglFramebuffer,D,It,s.COLOR_ATTACHMENT0+yt,s.TEXTURE_2D,0),y(It)&&v(s.TEXTURE_2D)}e.unbindTexture()}else{let yt=s.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(yt=D.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(yt,it.__webglTexture),G(yt,T),T.mipmaps&&T.mipmaps.length>0)for(let At=0;At<T.mipmaps.length;At++)V(W.__webglFramebuffer[At],D,T,s.COLOR_ATTACHMENT0,yt,At);else V(W.__webglFramebuffer,D,T,s.COLOR_ATTACHMENT0,yt,0);y(T)&&v(yt),e.unbindTexture()}D.depthBuffer&&gt(D)}function Pt(D){const T=D.textures;for(let W=0,it=T.length;W<it;W++){const ct=T[W];if(y(ct)){const _t=D.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Ot=n.get(ct).__webglTexture;e.bindTexture(_t,Ot),v(_t),e.unbindTexture()}}}function $(D){if(D.samples>0&&tt(D)===!1){const T=D.textures,W=D.width,it=D.height;let ct=s.COLOR_BUFFER_BIT;const _t=[],Ot=D.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,yt=n.get(D),At=T.length>1;if(At)for(let It=0;It<T.length;It++)e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let It=0;It<T.length;It++){_t.push(s.COLOR_ATTACHMENT0+It),D.depthBuffer&&_t.push(Ot);const St=yt.__ignoreDepthValues!==void 0?yt.__ignoreDepthValues:!1;if(St===!1&&(D.depthBuffer&&(ct|=s.DEPTH_BUFFER_BIT),D.stencilBuffer&&yt.__isTransmissionRenderTarget!==!0&&(ct|=s.STENCIL_BUFFER_BIT)),At&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,yt.__webglColorRenderbuffer[It]),St===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Ot]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Ot])),At){const Ct=n.get(T[It]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ct,0)}s.blitFramebuffer(0,0,W,it,0,0,W,it,ct,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,_t)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),At)for(let It=0;It<T.length;It++){e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.RENDERBUFFER,yt.__webglColorRenderbuffer[It]);const St=n.get(T[It]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,yt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+It,s.TEXTURE_2D,St,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}}function st(D){return Math.min(r.maxSamples,D.samples)}function tt(D){const T=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ot(D){const T=l.render.frame;f.get(D)!==T&&(f.set(D,T),D.update())}function rt(D,T){const W=D.colorSpace,it=D.format,ct=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||W!==ss&&W!==$i&&(xe.getTransfer(W)===Te?(it!==gi||ct!==ts)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),T}function mt(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(d.width=D.naturalWidth||D.width,d.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(d.width=D.displayWidth,d.height=D.displayHeight):(d.width=D.width,d.height=D.height),d}this.allocateTextureUnit=B,this.resetTextureUnits=E,this.setTexture2D=F,this.setTexture2DArray=X,this.setTexture3D=et,this.setTextureCube=K,this.rebindTextures=wt,this.setupRenderTarget=Tt,this.updateRenderTargetMipmap=Pt,this.updateMultisampleRenderTarget=$,this.setupDepthRenderbuffer=gt,this.setupFrameBufferTexture=V,this.useMultisampledRTT=tt}function Bx(s,t){function e(n,r=$i){let a;const l=xe.getTransfer(r);if(n===ts)return s.UNSIGNED_BYTE;if(n===ff)return s.UNSIGNED_SHORT_4_4_4_4;if(n===pf)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Mg)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===yg)return s.BYTE;if(n===xg)return s.SHORT;if(n===hf)return s.UNSIGNED_SHORT;if(n===df)return s.INT;if(n===wr)return s.UNSIGNED_INT;if(n===Ni)return s.FLOAT;if(n===Na)return s.HALF_FLOAT;if(n===bg)return s.ALPHA;if(n===wg)return s.RGB;if(n===gi)return s.RGBA;if(n===Sg)return s.LUMINANCE;if(n===Eg)return s.LUMINANCE_ALPHA;if(n===mr)return s.DEPTH_COMPONENT;if(n===xo)return s.DEPTH_STENCIL;if(n===mf)return s.RED;if(n===gf)return s.RED_INTEGER;if(n===Tg)return s.RG;if(n===_f)return s.RG_INTEGER;if(n===vf)return s.RGBA_INTEGER;if(n===Dl||n===Nl||n===Ol||n===Ul)if(l===Te)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===Dl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Nl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ol)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ul)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===Dl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Nl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ol)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ul)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ah||n===lh||n===ch||n===uh)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===ah)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===lh)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ch)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===uh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===yf)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===hh||n===dh)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===hh)return l===Te?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===dh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fh||n===ph||n===mh||n===gh||n===_h||n===vh||n===yh||n===xh||n===Mh||n===bh||n===wh||n===Sh||n===Eh||n===Th)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===fh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ph)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===mh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===gh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===_h)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===yh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Mh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eh)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Th)return l===Te?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===kl||n===Ah||n===Lh)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===kl)return l===Te?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ah)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Lh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ag||n===Ph||n===Ch||n===Rh)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===kl)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Ph)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ch)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Rh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Lo?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class zx extends Hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ji extends en{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hx={type:"move"};class cc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ji,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ji,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ji,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,a=null,l=null;const c=this._targetRay,h=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const w of t.hand.values()){const y=e.getJointPose(w,n),v=this._getHandJoint(d,w);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const f=d.joints["index-finger-tip"],m=d.joints["thumb-tip"],g=f.position.distanceTo(m.position),_=.02,x=.005;d.inputState.pinching&&g>_+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=_-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(h.matrix.fromArray(a.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,a.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(a.linearVelocity)):h.hasLinearVelocity=!1,a.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(a.angularVelocity)):h.hasAngularVelocity=!1));c!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Hx)))}return c!==null&&(c.visible=r!==null),h!==null&&(h.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ji;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gx=`
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

}`;class Wx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new dn,a=t.properties.get(r);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,r=new ns({vertexShader:Vx,fragmentShader:Gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ne(new Po(20,20),r)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Zx extends Ps{constructor(t,e){super();const n=this;let r=null,a=1,l=null,c="local-floor",h=1,d=null,f=null,m=null,g=null,_=null,x=null;const w=new Wx,y=e.getContextAttributes();let v=null,N=null;const b=[],A=[],k=new Et;let I=null;const R=new Hn;R.layers.enable(1),R.viewport=new tn;const U=new Hn;U.layers.enable(2),U.viewport=new tn;const P=[R,U],E=new zx;E.layers.enable(1),E.layers.enable(2);let B=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let Y=b[V];return Y===void 0&&(Y=new cc,b[V]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(V){let Y=b[V];return Y===void 0&&(Y=new cc,b[V]=Y),Y.getGripSpace()},this.getHand=function(V){let Y=b[V];return Y===void 0&&(Y=new cc,b[V]=Y),Y.getHandSpace()};function F(V){const Y=A.indexOf(V.inputSource);if(Y===-1)return;const dt=b[Y];dt!==void 0&&(dt.update(V.inputSource,V.frame,d||l),dt.dispatchEvent({type:V.type,data:V.inputSource}))}function X(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",X),r.removeEventListener("inputsourceschange",et);for(let V=0;V<b.length;V++){const Y=A[V];Y!==null&&(A[V]=null,b[V].disconnect(Y))}B=null,q=null,w.reset(),t.setRenderTarget(v),_=null,g=null,m=null,r=null,N=null,at.stop(),n.isPresenting=!1,t.setPixelRatio(I),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){a=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){c=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(V){d=V},this.getBaseLayer=function(){return g!==null?g:_},this.getBinding=function(){return m},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(V){if(r=V,r!==null){if(v=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",X),r.addEventListener("inputsourceschange",et),y.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(k),r.renderState.layers===void 0){const Y={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(r,e,Y),r.updateRenderState({baseLayer:_}),t.setPixelRatio(1),t.setSize(_.framebufferWidth,_.framebufferHeight,!1),N=new Ss(_.framebufferWidth,_.framebufferHeight,{format:gi,type:ts,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil})}else{let Y=null,dt=null,gt=null;y.depth&&(gt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=y.stencil?xo:mr,dt=y.stencil?Lo:wr);const wt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:a};m=new XRWebGLBinding(r,e),g=m.createProjectionLayer(wt),r.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),N=new Ss(g.textureWidth,g.textureHeight,{format:gi,type:ts,depthTexture:new Nf(g.textureWidth,g.textureHeight,dt,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0});const Tt=t.properties.get(N);Tt.__ignoreDepthValues=g.ignoreDepthValues}N.isXRRenderTarget=!0,this.setFoveation(h),d=null,l=await r.requestReferenceSpace(c),at.setContext(r),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function et(V){for(let Y=0;Y<V.removed.length;Y++){const dt=V.removed[Y],gt=A.indexOf(dt);gt>=0&&(A[gt]=null,b[gt].disconnect(dt))}for(let Y=0;Y<V.added.length;Y++){const dt=V.added[Y];let gt=A.indexOf(dt);if(gt===-1){for(let Tt=0;Tt<b.length;Tt++)if(Tt>=A.length){A.push(dt),gt=Tt;break}else if(A[Tt]===null){A[Tt]=dt,gt=Tt;break}if(gt===-1)break}const wt=b[gt];wt&&wt.connect(dt)}}const K=new H,Mt=new H;function Z(V,Y,dt){K.setFromMatrixPosition(Y.matrixWorld),Mt.setFromMatrixPosition(dt.matrixWorld);const gt=K.distanceTo(Mt),wt=Y.projectionMatrix.elements,Tt=dt.projectionMatrix.elements,Pt=wt[14]/(wt[10]-1),$=wt[14]/(wt[10]+1),st=(wt[9]+1)/wt[5],tt=(wt[9]-1)/wt[5],ot=(wt[8]-1)/wt[0],rt=(Tt[8]+1)/Tt[0],mt=Pt*ot,D=Pt*rt,T=gt/(-ot+rt),W=T*-ot;Y.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(W),V.translateZ(T),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const it=Pt+T,ct=$+T,_t=mt-W,Ot=D+(gt-W),yt=st*$/ct*it,At=tt*$/ct*it;V.projectionMatrix.makePerspective(_t,Ot,yt,At,it,ct),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function vt(V,Y){Y===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(Y.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(r===null)return;w.texture!==null&&(V.near=w.depthNear,V.far=w.depthFar),E.near=U.near=R.near=V.near,E.far=U.far=R.far=V.far,(B!==E.near||q!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),B=E.near,q=E.far,R.near=B,R.far=q,U.near=B,U.far=q,R.updateProjectionMatrix(),U.updateProjectionMatrix(),V.updateProjectionMatrix());const Y=V.parent,dt=E.cameras;vt(E,Y);for(let gt=0;gt<dt.length;gt++)vt(dt[gt],Y);dt.length===2?Z(E,R,U):E.projectionMatrix.copy(R.projectionMatrix),G(V,E,Y)};function G(V,Y,dt){dt===null?V.matrix.copy(Y.matrixWorld):(V.matrix.copy(dt.matrixWorld),V.matrix.invert(),V.matrix.multiply(Y.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(Y.projectionMatrix),V.projectionMatrixInverse.copy(Y.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Ac*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(g===null&&_===null))return h},this.setFoveation=function(V){h=V,g!==null&&(g.fixedFoveation=V),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=V)},this.hasDepthSensing=function(){return w.texture!==null};let nt=null;function J(V,Y){if(f=Y.getViewerPose(d||l),x=Y,f!==null){const dt=f.views;_!==null&&(t.setRenderTargetFramebuffer(N,_.framebuffer),t.setRenderTarget(N));let gt=!1;dt.length!==E.cameras.length&&(E.cameras.length=0,gt=!0);for(let Tt=0;Tt<dt.length;Tt++){const Pt=dt[Tt];let $=null;if(_!==null)$=_.getViewport(Pt);else{const tt=m.getViewSubImage(g,Pt);$=tt.viewport,Tt===0&&(t.setRenderTargetTextures(N,tt.colorTexture,g.ignoreDepthValues?void 0:tt.depthStencilTexture),t.setRenderTarget(N))}let st=P[Tt];st===void 0&&(st=new Hn,st.layers.enable(Tt),st.viewport=new tn,P[Tt]=st),st.matrix.fromArray(Pt.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(Pt.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set($.x,$.y,$.width,$.height),Tt===0&&(E.matrix.copy(st.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),gt===!0&&E.cameras.push(st)}const wt=r.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Tt=m.getDepthInformation(dt[0]);Tt&&Tt.isValid&&Tt.texture&&w.init(t,Tt,r.renderState)}}for(let dt=0;dt<b.length;dt++){const gt=A[dt],wt=b[dt];gt!==null&&wt!==void 0&&wt.update(gt,Y,d||l)}w.render(t,E),nt&&nt(V,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),x=null}const at=new If;at.setAnimationLoop(J),this.setAnimationLoop=function(V){nt=V},this.dispose=function(){}}}const _s=new yi,Xx=new Me;function qx(s,t){function e(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function n(y,v){v.color.getRGB(y.fogColor.value,Pf(s)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function r(y,v,N,b,A){v.isMeshBasicMaterial||v.isMeshLambertMaterial?a(y,v):v.isMeshToonMaterial?(a(y,v),m(y,v)):v.isMeshPhongMaterial?(a(y,v),f(y,v)):v.isMeshStandardMaterial?(a(y,v),g(y,v),v.isMeshPhysicalMaterial&&_(y,v,A)):v.isMeshMatcapMaterial?(a(y,v),x(y,v)):v.isMeshDepthMaterial?a(y,v):v.isMeshDistanceMaterial?(a(y,v),w(y,v)):v.isMeshNormalMaterial?a(y,v):v.isLineBasicMaterial?(l(y,v),v.isLineDashedMaterial&&c(y,v)):v.isPointsMaterial?h(y,v,N,b):v.isSpriteMaterial?d(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function a(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,e(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,e(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,e(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===Pn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,e(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===Pn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,e(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,e(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const N=t.get(v),b=N.envMap,A=N.envMapRotation;if(b&&(y.envMap.value=b,_s.copy(A),_s.x*=-1,_s.y*=-1,_s.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(_s.y*=-1,_s.z*=-1),y.envMapRotation.value.setFromMatrix4(Xx.makeRotationFromEuler(_s)),y.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap){y.lightMap.value=v.lightMap;const k=s._useLegacyLights===!0?Math.PI:1;y.lightMapIntensity.value=v.lightMapIntensity*k,e(v.lightMap,y.lightMapTransform)}v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,y.aoMapTransform))}function l(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,e(v.map,y.mapTransform))}function c(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function h(y,v,N,b){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*N,y.scale.value=b*.5,v.map&&(y.map.value=v.map,e(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,e(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function d(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,e(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,e(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function f(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function m(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function g(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function _(y,v,N){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Pn&&y.clearcoatNormalScale.value.negate())),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=N.texture,y.transmissionSamplerSize.value.set(N.width,N.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,y.specularIntensityMapTransform))}function x(y,v){v.matcap&&(y.matcap.value=v.matcap)}function w(y,v){const N=t.get(v).light;y.referencePosition.value.setFromMatrixPosition(N.matrixWorld),y.nearDistance.value=N.shadow.camera.near,y.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function $x(s,t,e,n){let r={},a={},l=[];const c=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(N,b){const A=b.program;n.uniformBlockBinding(N,A)}function d(N,b){let A=r[N.id];A===void 0&&(x(N),A=f(N),r[N.id]=A,N.addEventListener("dispose",y));const k=b.program;n.updateUBOMapping(N,k);const I=t.render.frame;a[N.id]!==I&&(g(N),a[N.id]=I)}function f(N){const b=m();N.__bindingPointIndex=b;const A=s.createBuffer(),k=N.__size,I=N.usage;return s.bindBuffer(s.UNIFORM_BUFFER,A),s.bufferData(s.UNIFORM_BUFFER,k,I),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,A),A}function m(){for(let N=0;N<c;N++)if(l.indexOf(N)===-1)return l.push(N),N;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(N){const b=r[N.id],A=N.uniforms,k=N.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let I=0,R=A.length;I<R;I++){const U=Array.isArray(A[I])?A[I]:[A[I]];for(let P=0,E=U.length;P<E;P++){const B=U[P];if(_(B,I,P,k)===!0){const q=B.__offset,F=Array.isArray(B.value)?B.value:[B.value];let X=0;for(let et=0;et<F.length;et++){const K=F[et],Mt=w(K);typeof K=="number"||typeof K=="boolean"?(B.__data[0]=K,s.bufferSubData(s.UNIFORM_BUFFER,q+X,B.__data)):K.isMatrix3?(B.__data[0]=K.elements[0],B.__data[1]=K.elements[1],B.__data[2]=K.elements[2],B.__data[3]=0,B.__data[4]=K.elements[3],B.__data[5]=K.elements[4],B.__data[6]=K.elements[5],B.__data[7]=0,B.__data[8]=K.elements[6],B.__data[9]=K.elements[7],B.__data[10]=K.elements[8],B.__data[11]=0):(K.toArray(B.__data,X),X+=Mt.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,q,B.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function _(N,b,A,k){const I=N.value,R=b+"_"+A;if(k[R]===void 0)return typeof I=="number"||typeof I=="boolean"?k[R]=I:k[R]=I.clone(),!0;{const U=k[R];if(typeof I=="number"||typeof I=="boolean"){if(U!==I)return k[R]=I,!0}else if(U.equals(I)===!1)return U.copy(I),!0}return!1}function x(N){const b=N.uniforms;let A=0;const k=16;for(let R=0,U=b.length;R<U;R++){const P=Array.isArray(b[R])?b[R]:[b[R]];for(let E=0,B=P.length;E<B;E++){const q=P[E],F=Array.isArray(q.value)?q.value:[q.value];for(let X=0,et=F.length;X<et;X++){const K=F[X],Mt=w(K),Z=A%k;Z!==0&&k-Z<Mt.boundary&&(A+=k-Z),q.__data=new Float32Array(Mt.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=A,A+=Mt.storage}}}const I=A%k;return I>0&&(A+=k-I),N.__size=A,N.__cache={},this}function w(N){const b={boundary:0,storage:0};return typeof N=="number"||typeof N=="boolean"?(b.boundary=4,b.storage=4):N.isVector2?(b.boundary=8,b.storage=8):N.isVector3||N.isColor?(b.boundary=16,b.storage=12):N.isVector4?(b.boundary=16,b.storage=16):N.isMatrix3?(b.boundary=48,b.storage=48):N.isMatrix4?(b.boundary=64,b.storage=64):N.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",N),b}function y(N){const b=N.target;b.removeEventListener("dispose",y);const A=l.indexOf(b.__bindingPointIndex);l.splice(A,1),s.deleteBuffer(r[b.id]),delete r[b.id],delete a[b.id]}function v(){for(const N in r)s.deleteBuffer(r[N]);l=[],r={},a={}}return{bind:h,update:d,dispose:v}}class Yx{constructor(t={}){const{canvas:e=zg(),context:n=null,depth:r=!0,stencil:a=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:m=!1}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=l;const _=new Uint32Array(4),x=new Int32Array(4);let w=null,y=null;const v=[],N=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=hi,this._useLegacyLights=!1,this.toneMapping=Qi,this.toneMappingExposure=1;const b=this;let A=!1,k=0,I=0,R=null,U=-1,P=null;const E=new tn,B=new tn;let q=null;const F=new ne(0);let X=0,et=e.width,K=e.height,Mt=1,Z=null,vt=null;const G=new tn(0,0,et,K),nt=new tn(0,0,et,K);let J=!1;const at=new Zc;let V=!1,Y=!1;const dt=new Me,gt=new Et,wt=new H,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Pt(){return R===null?Mt:1}let $=n;function st(O,j){const ft=e.getContext(O,j);return ft!==null?ft:null}try{const O={alpha:!0,depth:r,stencil:a,antialias:c,premultipliedAlpha:h,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Hc}`),e.addEventListener("webglcontextlost",lt,!1),e.addEventListener("webglcontextrestored",xt,!1),e.addEventListener("webglcontextcreationerror",Lt,!1),$===null){const j="webgl2";if($=st(j,O),$===null)throw st(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(O){throw console.error("THREE.WebGLRenderer: "+O.message),O}let tt,ot,rt,mt,D,T,W,it,ct,_t,Ot,yt,At,It,St,Ct,Xt,Nt,Ut,jt,zt,ee,ue,ge;function Ht(){tt=new iy($),tt.init(),ot=new K0($,tt,t),ee=new Bx($,tt),rt=new kx($),mt=new oy($),D=new wx,T=new Fx($,tt,rt,D,ot,ee,mt),W=new Q0(b),it=new ny(b),ct=new d_($),ue=new Y0($,ct),_t=new sy($,ct,mt,ue),Ot=new ly($,_t,ct,mt),Ut=new ay($,ot,T),Ct=new J0(D),yt=new bx(b,W,it,tt,ot,ue,Ct),At=new qx(b,D),It=new Ex,St=new Rx(tt),Nt=new $0(b,W,it,rt,Ot,g,h),Xt=new Ux(b,Ot,ot),ge=new $x($,mt,ot,rt),jt=new j0($,tt,mt),zt=new ry($,tt,mt),mt.programs=yt.programs,b.capabilities=ot,b.extensions=tt,b.properties=D,b.renderLists=It,b.shadowMap=Xt,b.state=rt,b.info=mt}Ht();const S=new Zx(b,$);this.xr=S,this.getContext=function(){return $},this.getContextAttributes=function(){return $.getContextAttributes()},this.forceContextLoss=function(){const O=tt.get("WEBGL_lose_context");O&&O.loseContext()},this.forceContextRestore=function(){const O=tt.get("WEBGL_lose_context");O&&O.restoreContext()},this.getPixelRatio=function(){return Mt},this.setPixelRatio=function(O){O!==void 0&&(Mt=O,this.setSize(et,K,!1))},this.getSize=function(O){return O.set(et,K)},this.setSize=function(O,j,ft=!0){if(S.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}et=O,K=j,e.width=Math.floor(O*Mt),e.height=Math.floor(j*Mt),ft===!0&&(e.style.width=O+"px",e.style.height=j+"px"),this.setViewport(0,0,O,j)},this.getDrawingBufferSize=function(O){return O.set(et*Mt,K*Mt).floor()},this.setDrawingBufferSize=function(O,j,ft){et=O,K=j,Mt=ft,e.width=Math.floor(O*ft),e.height=Math.floor(j*ft),this.setViewport(0,0,O,j)},this.getCurrentViewport=function(O){return O.copy(E)},this.getViewport=function(O){return O.copy(G)},this.setViewport=function(O,j,ft,pt){O.isVector4?G.set(O.x,O.y,O.z,O.w):G.set(O,j,ft,pt),rt.viewport(E.copy(G).multiplyScalar(Mt).round())},this.getScissor=function(O){return O.copy(nt)},this.setScissor=function(O,j,ft,pt){O.isVector4?nt.set(O.x,O.y,O.z,O.w):nt.set(O,j,ft,pt),rt.scissor(B.copy(nt).multiplyScalar(Mt).round())},this.getScissorTest=function(){return J},this.setScissorTest=function(O){rt.setScissorTest(J=O)},this.setOpaqueSort=function(O){Z=O},this.setTransparentSort=function(O){vt=O},this.getClearColor=function(O){return O.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(O=!0,j=!0,ft=!0){let pt=0;if(O){let ut=!1;if(R!==null){const Dt=R.texture.format;ut=Dt===vf||Dt===_f||Dt===gf}if(ut){const Dt=R.texture.type,Wt=Dt===ts||Dt===wr||Dt===hf||Dt===Lo||Dt===ff||Dt===pf,$t=Nt.getClearColor(),Yt=Nt.getClearAlpha(),se=$t.r,ie=$t.g,re=$t.b;Wt?(_[0]=se,_[1]=ie,_[2]=re,_[3]=Yt,$.clearBufferuiv($.COLOR,0,_)):(x[0]=se,x[1]=ie,x[2]=re,x[3]=Yt,$.clearBufferiv($.COLOR,0,x))}else pt|=$.COLOR_BUFFER_BIT}j&&(pt|=$.DEPTH_BUFFER_BIT),ft&&(pt|=$.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$.clear(pt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",lt,!1),e.removeEventListener("webglcontextrestored",xt,!1),e.removeEventListener("webglcontextcreationerror",Lt,!1),It.dispose(),St.dispose(),D.dispose(),W.dispose(),it.dispose(),Ot.dispose(),ue.dispose(),ge.dispose(),yt.dispose(),S.dispose(),S.removeEventListener("sessionstart",Oe),S.removeEventListener("sessionend",Pe),fn.stop()};function lt(O){O.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function xt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const O=mt.autoReset,j=Xt.enabled,ft=Xt.autoUpdate,pt=Xt.needsUpdate,ut=Xt.type;Ht(),mt.autoReset=O,Xt.enabled=j,Xt.autoUpdate=ft,Xt.needsUpdate=pt,Xt.type=ut}function Lt(O){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",O.statusMessage)}function Ft(O){const j=O.target;j.removeEventListener("dispose",Ft),pe(j)}function pe(O){he(O),D.remove(O)}function he(O){const j=D.get(O).programs;j!==void 0&&(j.forEach(function(ft){yt.releaseProgram(ft)}),O.isShaderMaterial&&yt.releaseShaderCache(O))}this.renderBufferDirect=function(O,j,ft,pt,ut,Dt){j===null&&(j=Tt);const Wt=ut.isMesh&&ut.matrixWorld.determinant()<0,$t=Do(O,j,ft,pt,ut);rt.setMaterial(pt,Wt);let Yt=ft.index,se=1;if(pt.wireframe===!0){if(Yt=_t.getWireframeAttribute(ft),Yt===void 0)return;se=2}const ie=ft.drawRange,re=ft.attributes.position;let Re=ie.start*se,pn=(ie.start+ie.count)*se;Dt!==null&&(Re=Math.max(Re,Dt.start*se),pn=Math.min(pn,(Dt.start+Dt.count)*se)),Yt!==null?(Re=Math.max(Re,0),pn=Math.min(pn,Yt.count)):re!=null&&(Re=Math.max(Re,0),pn=Math.min(pn,re.count));const Ue=pn-Re;if(Ue<0||Ue===1/0)return;ue.setup(ut,pt,$t,ft,Yt);let mn,we=jt;if(Yt!==null&&(mn=ct.get(Yt),we=zt,we.setIndex(mn)),ut.isMesh)pt.wireframe===!0?(rt.setLineWidth(pt.wireframeLinewidth*Pt()),we.setMode($.LINES)):we.setMode($.TRIANGLES);else if(ut.isLine){let oe=pt.linewidth;oe===void 0&&(oe=1),rt.setLineWidth(oe*Pt()),ut.isLineSegments?we.setMode($.LINES):ut.isLineLoop?we.setMode($.LINE_LOOP):we.setMode($.LINE_STRIP)}else ut.isPoints?we.setMode($.POINTS):ut.isSprite&&we.setMode($.TRIANGLES);if(ut.isBatchedMesh)we.renderMultiDraw(ut._multiDrawStarts,ut._multiDrawCounts,ut._multiDrawCount);else if(ut.isInstancedMesh)we.renderInstances(Re,Ue,ut.count);else if(ft.isInstancedBufferGeometry){const oe=ft._maxInstanceCount!==void 0?ft._maxInstanceCount:1/0,Mi=Math.min(ft.instanceCount,oe);we.renderInstances(Re,Ue,Mi)}else we.render(Re,Ue)};function be(O,j,ft){O.transparent===!0&&O.side===Vn&&O.forceSinglePass===!1?(O.side=Pn,O.needsUpdate=!0,rs(O,j,ft),O.side=es,O.needsUpdate=!0,rs(O,j,ft),O.side=Vn):rs(O,j,ft)}this.compile=function(O,j,ft=null){ft===null&&(ft=O),y=St.get(ft),y.init(),N.push(y),ft.traverseVisible(function(ut){ut.isLight&&ut.layers.test(j.layers)&&(y.pushLight(ut),ut.castShadow&&y.pushShadow(ut))}),O!==ft&&O.traverseVisible(function(ut){ut.isLight&&ut.layers.test(j.layers)&&(y.pushLight(ut),ut.castShadow&&y.pushShadow(ut))}),y.setupLights(b._useLegacyLights);const pt=new Set;return O.traverse(function(ut){const Dt=ut.material;if(Dt)if(Array.isArray(Dt))for(let Wt=0;Wt<Dt.length;Wt++){const $t=Dt[Wt];be($t,ft,ut),pt.add($t)}else be(Dt,ft,ut),pt.add(Dt)}),N.pop(),y=null,pt},this.compileAsync=function(O,j,ft=null){const pt=this.compile(O,j,ft);return new Promise(ut=>{function Dt(){if(pt.forEach(function(Wt){D.get(Wt).currentProgram.isReady()&&pt.delete(Wt)}),pt.size===0){ut(O);return}setTimeout(Dt,10)}tt.get("KHR_parallel_shader_compile")!==null?Dt():setTimeout(Dt,10)})};let He=null;function ye(O){He&&He(O)}function Oe(){fn.stop()}function Pe(){fn.start()}const fn=new If;fn.setAnimationLoop(ye),typeof self<"u"&&fn.setContext(self),this.setAnimationLoop=function(O){He=O,S.setAnimationLoop(O),O===null?fn.stop():fn.start()},S.addEventListener("sessionstart",Oe),S.addEventListener("sessionend",Pe),this.render=function(O,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),S.enabled===!0&&S.isPresenting===!0&&(S.cameraAutoUpdate===!0&&S.updateCamera(j),j=S.getCamera()),O.isScene===!0&&O.onBeforeRender(b,O,j,R),y=St.get(O,N.length),y.init(),N.push(y),dt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),at.setFromProjectionMatrix(dt),Y=this.localClippingEnabled,V=Ct.init(this.clippingPlanes,Y),w=It.get(O,v.length),w.init(),v.push(w),Mn(O,j,0,b.sortObjects),w.finish(),b.sortObjects===!0&&w.sort(Z,vt),this.info.render.frame++,V===!0&&Ct.beginShadows();const ft=y.state.shadowsArray;if(Xt.render(ft,O,j),V===!0&&Ct.endShadows(),this.info.autoReset===!0&&this.info.reset(),(S.enabled===!1||S.isPresenting===!1||S.hasDepthSensing()===!1)&&Nt.render(w,O),y.setupLights(b._useLegacyLights),j.isArrayCamera){const pt=j.cameras;for(let ut=0,Dt=pt.length;ut<Dt;ut++){const Wt=pt[ut];ri(w,O,Wt,Wt.viewport)}}else ri(w,O,j);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),O.isScene===!0&&O.onAfterRender(b,O,j),ue.resetDefaultState(),U=-1,P=null,N.pop(),N.length>0?y=N[N.length-1]:y=null,v.pop(),v.length>0?w=v[v.length-1]:w=null};function Mn(O,j,ft,pt){if(O.visible===!1)return;if(O.layers.test(j.layers)){if(O.isGroup)ft=O.renderOrder;else if(O.isLOD)O.autoUpdate===!0&&O.update(j);else if(O.isLight)y.pushLight(O),O.castShadow&&y.pushShadow(O);else if(O.isSprite){if(!O.frustumCulled||at.intersectsSprite(O)){pt&&wt.setFromMatrixPosition(O.matrixWorld).applyMatrix4(dt);const Wt=Ot.update(O),$t=O.material;$t.visible&&w.push(O,Wt,$t,ft,wt.z,null)}}else if((O.isMesh||O.isLine||O.isPoints)&&(!O.frustumCulled||at.intersectsObject(O))){const Wt=Ot.update(O),$t=O.material;if(pt&&(O.boundingSphere!==void 0?(O.boundingSphere===null&&O.computeBoundingSphere(),wt.copy(O.boundingSphere.center)):(Wt.boundingSphere===null&&Wt.computeBoundingSphere(),wt.copy(Wt.boundingSphere.center)),wt.applyMatrix4(O.matrixWorld).applyMatrix4(dt)),Array.isArray($t)){const Yt=Wt.groups;for(let se=0,ie=Yt.length;se<ie;se++){const re=Yt[se],Re=$t[re.materialIndex];Re&&Re.visible&&w.push(O,Wt,Re,ft,wt.z,re)}}else $t.visible&&w.push(O,Wt,$t,ft,wt.z,null)}}const Dt=O.children;for(let Wt=0,$t=Dt.length;Wt<$t;Wt++)Mn(Dt[Wt],j,ft,pt)}function ri(O,j,ft,pt){const ut=O.opaque,Dt=O.transmissive,Wt=O.transparent;y.setupLightsView(ft),V===!0&&Ct.setGlobalState(b.clippingPlanes,ft),Dt.length>0&&Fi(ut,Dt,j,ft),pt&&rt.viewport(E.copy(pt)),ut.length>0&&$e(ut,j,ft),Dt.length>0&&$e(Dt,j,ft),Wt.length>0&&$e(Wt,j,ft),rt.buffers.depth.setTest(!0),rt.buffers.depth.setMask(!0),rt.buffers.color.setMask(!0),rt.setPolygonOffset(!1)}function Fi(O,j,ft,pt){if((ft.isScene===!0?ft.overrideMaterial:null)!==null)return;if(y.state.transmissionRenderTarget===null){y.state.transmissionRenderTarget=new Ss(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?Na:ts,minFilter:bs,samples:4,stencilBuffer:a});const se=D.get(y.state.transmissionRenderTarget);se.__isTransmissionRenderTarget=!0}const Dt=y.state.transmissionRenderTarget;b.getDrawingBufferSize(gt),Dt.setSize(gt.x,gt.y);const Wt=b.getRenderTarget();b.setRenderTarget(Dt),b.getClearColor(F),X=b.getClearAlpha(),X<1&&b.setClearColor(16777215,.5),b.clear();const $t=b.toneMapping;b.toneMapping=Qi,$e(O,ft,pt),T.updateMultisampleRenderTarget(Dt),T.updateRenderTargetMipmap(Dt);let Yt=!1;for(let se=0,ie=j.length;se<ie;se++){const re=j[se],Re=re.object,pn=re.geometry,Ue=re.material,mn=re.group;if(Ue.side===Vn&&Re.layers.test(pt.layers)){const we=Ue.side;Ue.side=Pn,Ue.needsUpdate=!0,Gt(Re,ft,pt,pn,Ue,mn),Ue.side=we,Ue.needsUpdate=!0,Yt=!0}}Yt===!0&&(T.updateMultisampleRenderTarget(Dt),T.updateRenderTargetMipmap(Dt)),b.setRenderTarget(Wt),b.setClearColor(F,X),b.toneMapping=$t}function $e(O,j,ft){const pt=j.isScene===!0?j.overrideMaterial:null;for(let ut=0,Dt=O.length;ut<Dt;ut++){const Wt=O[ut],$t=Wt.object,Yt=Wt.geometry,se=pt===null?Wt.material:pt,ie=Wt.group;$t.layers.test(ft.layers)&&Gt($t,j,ft,Yt,se,ie)}}function Gt(O,j,ft,pt,ut,Dt){O.onBeforeRender(b,j,ft,pt,ut,Dt),O.modelViewMatrix.multiplyMatrices(ft.matrixWorldInverse,O.matrixWorld),O.normalMatrix.getNormalMatrix(O.modelViewMatrix),ut.onBeforeRender(b,j,ft,pt,O,Dt),ut.transparent===!0&&ut.side===Vn&&ut.forceSinglePass===!1?(ut.side=Pn,ut.needsUpdate=!0,b.renderBufferDirect(ft,j,pt,ut,O,Dt),ut.side=es,ut.needsUpdate=!0,b.renderBufferDirect(ft,j,pt,ut,O,Dt),ut.side=Vn):b.renderBufferDirect(ft,j,pt,ut,O,Dt),O.onAfterRender(b,j,ft,pt,ut,Dt)}function rs(O,j,ft){j.isScene!==!0&&(j=Tt);const pt=D.get(O),ut=y.state.lights,Dt=y.state.shadowsArray,Wt=ut.state.version,$t=yt.getParameters(O,ut.state,Dt,j,ft),Yt=yt.getProgramCacheKey($t);let se=pt.programs;pt.environment=O.isMeshStandardMaterial?j.environment:null,pt.fog=j.fog,pt.envMap=(O.isMeshStandardMaterial?it:W).get(O.envMap||pt.environment),pt.envMapRotation=pt.environment!==null&&O.envMap===null?j.environmentRotation:O.envMapRotation,se===void 0&&(O.addEventListener("dispose",Ft),se=new Map,pt.programs=se);let ie=se.get(Yt);if(ie!==void 0){if(pt.currentProgram===ie&&pt.lightsStateVersion===Wt)return Fr(O,$t),ie}else $t.uniforms=yt.getUniforms(O),O.onBuild(ft,$t,b),O.onBeforeCompile($t,b),ie=yt.acquireProgram($t,Yt),se.set(Yt,ie),pt.uniforms=$t.uniforms;const re=pt.uniforms;return(!O.isShaderMaterial&&!O.isRawShaderMaterial||O.clipping===!0)&&(re.clippingPlanes=Ct.uniform),Fr(O,$t),pt.needsLights=No(O),pt.lightsStateVersion=Wt,pt.needsLights&&(re.ambientLightColor.value=ut.state.ambient,re.lightProbe.value=ut.state.probe,re.directionalLights.value=ut.state.directional,re.directionalLightShadows.value=ut.state.directionalShadow,re.spotLights.value=ut.state.spot,re.spotLightShadows.value=ut.state.spotShadow,re.rectAreaLights.value=ut.state.rectArea,re.ltc_1.value=ut.state.rectAreaLTC1,re.ltc_2.value=ut.state.rectAreaLTC2,re.pointLights.value=ut.state.point,re.pointLightShadows.value=ut.state.pointShadow,re.hemisphereLights.value=ut.state.hemi,re.directionalShadowMap.value=ut.state.directionalShadowMap,re.directionalShadowMatrix.value=ut.state.directionalShadowMatrix,re.spotShadowMap.value=ut.state.spotShadowMap,re.spotLightMatrix.value=ut.state.spotLightMatrix,re.spotLightMap.value=ut.state.spotLightMap,re.pointShadowMap.value=ut.state.pointShadowMap,re.pointShadowMatrix.value=ut.state.pointShadowMatrix),pt.currentProgram=ie,pt.uniformsList=null,ie}function kr(O){if(O.uniformsList===null){const j=O.currentProgram.getUniforms();O.uniformsList=La.seqWithValue(j.seq,O.uniforms)}return O.uniformsList}function Fr(O,j){const ft=D.get(O);ft.outputColorSpace=j.outputColorSpace,ft.batching=j.batching,ft.instancing=j.instancing,ft.instancingColor=j.instancingColor,ft.instancingMorph=j.instancingMorph,ft.skinning=j.skinning,ft.morphTargets=j.morphTargets,ft.morphNormals=j.morphNormals,ft.morphColors=j.morphColors,ft.morphTargetsCount=j.morphTargetsCount,ft.numClippingPlanes=j.numClippingPlanes,ft.numIntersection=j.numClipIntersection,ft.vertexAlphas=j.vertexAlphas,ft.vertexTangents=j.vertexTangents,ft.toneMapping=j.toneMapping}function Do(O,j,ft,pt,ut){j.isScene!==!0&&(j=Tt),T.resetTextureUnits();const Dt=j.fog,Wt=pt.isMeshStandardMaterial?j.environment:null,$t=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:ss,Yt=(pt.isMeshStandardMaterial?it:W).get(pt.envMap||Wt),se=pt.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,ie=!!ft.attributes.tangent&&(!!pt.normalMap||pt.anisotropy>0),re=!!ft.morphAttributes.position,Re=!!ft.morphAttributes.normal,pn=!!ft.morphAttributes.color;let Ue=Qi;pt.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ue=b.toneMapping);const mn=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,we=mn!==void 0?mn.length:0,oe=D.get(pt),Mi=y.state.lights;if(V===!0&&(Y===!0||O!==P)){const ln=O===P&&pt.id===U;Ct.setState(pt,O,ln)}let Zt=!1;pt.version===oe.__version?(oe.needsLights&&oe.lightsStateVersion!==Mi.state.version||oe.outputColorSpace!==$t||ut.isBatchedMesh&&oe.batching===!1||!ut.isBatchedMesh&&oe.batching===!0||ut.isInstancedMesh&&oe.instancing===!1||!ut.isInstancedMesh&&oe.instancing===!0||ut.isSkinnedMesh&&oe.skinning===!1||!ut.isSkinnedMesh&&oe.skinning===!0||ut.isInstancedMesh&&oe.instancingColor===!0&&ut.instanceColor===null||ut.isInstancedMesh&&oe.instancingColor===!1&&ut.instanceColor!==null||ut.isInstancedMesh&&oe.instancingMorph===!0&&ut.morphTexture===null||ut.isInstancedMesh&&oe.instancingMorph===!1&&ut.morphTexture!==null||oe.envMap!==Yt||pt.fog===!0&&oe.fog!==Dt||oe.numClippingPlanes!==void 0&&(oe.numClippingPlanes!==Ct.numPlanes||oe.numIntersection!==Ct.numIntersection)||oe.vertexAlphas!==se||oe.vertexTangents!==ie||oe.morphTargets!==re||oe.morphNormals!==Re||oe.morphColors!==pn||oe.toneMapping!==Ue||oe.morphTargetsCount!==we)&&(Zt=!0):(Zt=!0,oe.__version=pt.version);let _e=oe.currentProgram;Zt===!0&&(_e=rs(pt,j,ut));let os=!1,Un=!1,oi=!1;const Ve=_e.getUniforms(),Kt=oe.uniforms;if(rt.useProgram(_e.program)&&(os=!0,Un=!0,oi=!0),pt.id!==U&&(U=pt.id,Un=!0),os||P!==O){Ve.setValue($,"projectionMatrix",O.projectionMatrix),Ve.setValue($,"viewMatrix",O.matrixWorldInverse);const ln=Ve.map.cameraPosition;ln!==void 0&&ln.setValue($,wt.setFromMatrixPosition(O.matrixWorld)),ot.logarithmicDepthBuffer&&Ve.setValue($,"logDepthBufFC",2/(Math.log(O.far+1)/Math.LN2)),(pt.isMeshPhongMaterial||pt.isMeshToonMaterial||pt.isMeshLambertMaterial||pt.isMeshBasicMaterial||pt.isMeshStandardMaterial||pt.isShaderMaterial)&&Ve.setValue($,"isOrthographic",O.isOrthographicCamera===!0),P!==O&&(P=O,Un=!0,oi=!0)}if(ut.isSkinnedMesh){Ve.setOptional($,ut,"bindMatrix"),Ve.setOptional($,ut,"bindMatrixInverse");const ln=ut.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),Ve.setValue($,"boneTexture",ln.boneTexture,T))}ut.isBatchedMesh&&(Ve.setOptional($,ut,"batchingTexture"),Ve.setValue($,"batchingTexture",ut._matricesTexture,T));const Ee=ft.morphAttributes;if((Ee.position!==void 0||Ee.normal!==void 0||Ee.color!==void 0)&&Ut.update(ut,ft,_e),(Un||oe.receiveShadow!==ut.receiveShadow)&&(oe.receiveShadow=ut.receiveShadow,Ve.setValue($,"receiveShadow",ut.receiveShadow)),pt.isMeshGouraudMaterial&&pt.envMap!==null&&(Kt.envMap.value=Yt,Kt.flipEnvMap.value=Yt.isCubeTexture&&Yt.isRenderTargetTexture===!1?-1:1),pt.isMeshStandardMaterial&&pt.envMap===null&&j.environment!==null&&(Kt.envMapIntensity.value=j.environmentIntensity),Un&&(Ve.setValue($,"toneMappingExposure",b.toneMappingExposure),oe.needsLights&&Br(Kt,oi),Dt&&pt.fog===!0&&At.refreshFogUniforms(Kt,Dt),At.refreshMaterialUniforms(Kt,pt,Mt,K,y.state.transmissionRenderTarget),La.upload($,kr(oe),Kt,T)),pt.isShaderMaterial&&pt.uniformsNeedUpdate===!0&&(La.upload($,kr(oe),Kt,T),pt.uniformsNeedUpdate=!1),pt.isSpriteMaterial&&Ve.setValue($,"center",ut.center),Ve.setValue($,"modelViewMatrix",ut.modelViewMatrix),Ve.setValue($,"normalMatrix",ut.normalMatrix),Ve.setValue($,"modelMatrix",ut.matrixWorld),pt.isShaderMaterial||pt.isRawShaderMaterial){const ln=pt.uniformsGroups;for(let Bi=0,bn=ln.length;Bi<bn;Bi++){const Oo=ln[Bi];ge.update(Oo,_e),ge.bind(Oo,_e)}}return _e}function Br(O,j){O.ambientLightColor.needsUpdate=j,O.lightProbe.needsUpdate=j,O.directionalLights.needsUpdate=j,O.directionalLightShadows.needsUpdate=j,O.pointLights.needsUpdate=j,O.pointLightShadows.needsUpdate=j,O.spotLights.needsUpdate=j,O.spotLightShadows.needsUpdate=j,O.rectAreaLights.needsUpdate=j,O.hemisphereLights.needsUpdate=j}function No(O){return O.isMeshLambertMaterial||O.isMeshToonMaterial||O.isMeshPhongMaterial||O.isMeshStandardMaterial||O.isShadowMaterial||O.isShaderMaterial&&O.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(O,j,ft){D.get(O.texture).__webglTexture=j,D.get(O.depthTexture).__webglTexture=ft;const pt=D.get(O);pt.__hasExternalTextures=!0,pt.__autoAllocateDepthBuffer=ft===void 0,pt.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(O,j){const ft=D.get(O);ft.__webglFramebuffer=j,ft.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(O,j=0,ft=0){R=O,k=j,I=ft;let pt=!0,ut=null,Dt=!1,Wt=!1;if(O){const Yt=D.get(O);Yt.__useDefaultFramebuffer!==void 0?(rt.bindFramebuffer($.FRAMEBUFFER,null),pt=!1):Yt.__webglFramebuffer===void 0?T.setupRenderTarget(O):Yt.__hasExternalTextures&&T.rebindTextures(O,D.get(O.texture).__webglTexture,D.get(O.depthTexture).__webglTexture);const se=O.texture;(se.isData3DTexture||se.isDataArrayTexture||se.isCompressedArrayTexture)&&(Wt=!0);const ie=D.get(O).__webglFramebuffer;O.isWebGLCubeRenderTarget?(Array.isArray(ie[j])?ut=ie[j][ft]:ut=ie[j],Dt=!0):O.samples>0&&T.useMultisampledRTT(O)===!1?ut=D.get(O).__webglMultisampledFramebuffer:Array.isArray(ie)?ut=ie[ft]:ut=ie,E.copy(O.viewport),B.copy(O.scissor),q=O.scissorTest}else E.copy(G).multiplyScalar(Mt).floor(),B.copy(nt).multiplyScalar(Mt).floor(),q=J;if(rt.bindFramebuffer($.FRAMEBUFFER,ut)&&pt&&rt.drawBuffers(O,ut),rt.viewport(E),rt.scissor(B),rt.setScissorTest(q),Dt){const Yt=D.get(O.texture);$.framebufferTexture2D($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,$.TEXTURE_CUBE_MAP_POSITIVE_X+j,Yt.__webglTexture,ft)}else if(Wt){const Yt=D.get(O.texture),se=j||0;$.framebufferTextureLayer($.FRAMEBUFFER,$.COLOR_ATTACHMENT0,Yt.__webglTexture,ft||0,se)}U=-1},this.readRenderTargetPixels=function(O,j,ft,pt,ut,Dt,Wt){if(!(O&&O.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let $t=D.get(O).__webglFramebuffer;if(O.isWebGLCubeRenderTarget&&Wt!==void 0&&($t=$t[Wt]),$t){rt.bindFramebuffer($.FRAMEBUFFER,$t);try{const Yt=O.texture,se=Yt.format,ie=Yt.type;if(se!==gi&&ee.convert(se)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const re=ie===Na&&(tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float"));if(ie!==ts&&ee.convert(ie)!==$.getParameter($.IMPLEMENTATION_COLOR_READ_TYPE)&&ie!==Ni&&!re){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=O.width-pt&&ft>=0&&ft<=O.height-ut&&$.readPixels(j,ft,pt,ut,ee.convert(se),ee.convert(ie),Dt)}finally{const Yt=R!==null?D.get(R).__webglFramebuffer:null;rt.bindFramebuffer($.FRAMEBUFFER,Yt)}}},this.copyFramebufferToTexture=function(O,j,ft=0){const pt=Math.pow(2,-ft),ut=Math.floor(j.image.width*pt),Dt=Math.floor(j.image.height*pt);T.setTexture2D(j,0),$.copyTexSubImage2D($.TEXTURE_2D,ft,0,0,O.x,O.y,ut,Dt),rt.unbindTexture()},this.copyTextureToTexture=function(O,j,ft,pt=0){const ut=j.image.width,Dt=j.image.height,Wt=ee.convert(ft.format),$t=ee.convert(ft.type);T.setTexture2D(ft,0),$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,ft.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ft.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,ft.unpackAlignment),j.isDataTexture?$.texSubImage2D($.TEXTURE_2D,pt,O.x,O.y,ut,Dt,Wt,$t,j.image.data):j.isCompressedTexture?$.compressedTexSubImage2D($.TEXTURE_2D,pt,O.x,O.y,j.mipmaps[0].width,j.mipmaps[0].height,Wt,j.mipmaps[0].data):$.texSubImage2D($.TEXTURE_2D,pt,O.x,O.y,Wt,$t,j.image),pt===0&&ft.generateMipmaps&&$.generateMipmap($.TEXTURE_2D),rt.unbindTexture()},this.copyTextureToTexture3D=function(O,j,ft,pt,ut=0){const Dt=Math.round(O.max.x-O.min.x),Wt=Math.round(O.max.y-O.min.y),$t=O.max.z-O.min.z+1,Yt=ee.convert(pt.format),se=ee.convert(pt.type);let ie;if(pt.isData3DTexture)T.setTexture3D(pt,0),ie=$.TEXTURE_3D;else if(pt.isDataArrayTexture||pt.isCompressedArrayTexture)T.setTexture2DArray(pt,0),ie=$.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}$.pixelStorei($.UNPACK_FLIP_Y_WEBGL,pt.flipY),$.pixelStorei($.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pt.premultiplyAlpha),$.pixelStorei($.UNPACK_ALIGNMENT,pt.unpackAlignment);const re=$.getParameter($.UNPACK_ROW_LENGTH),Re=$.getParameter($.UNPACK_IMAGE_HEIGHT),pn=$.getParameter($.UNPACK_SKIP_PIXELS),Ue=$.getParameter($.UNPACK_SKIP_ROWS),mn=$.getParameter($.UNPACK_SKIP_IMAGES),we=ft.isCompressedTexture?ft.mipmaps[ut]:ft.image;$.pixelStorei($.UNPACK_ROW_LENGTH,we.width),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,we.height),$.pixelStorei($.UNPACK_SKIP_PIXELS,O.min.x),$.pixelStorei($.UNPACK_SKIP_ROWS,O.min.y),$.pixelStorei($.UNPACK_SKIP_IMAGES,O.min.z),ft.isDataTexture||ft.isData3DTexture?$.texSubImage3D(ie,ut,j.x,j.y,j.z,Dt,Wt,$t,Yt,se,we.data):pt.isCompressedArrayTexture?$.compressedTexSubImage3D(ie,ut,j.x,j.y,j.z,Dt,Wt,$t,Yt,we.data):$.texSubImage3D(ie,ut,j.x,j.y,j.z,Dt,Wt,$t,Yt,se,we),$.pixelStorei($.UNPACK_ROW_LENGTH,re),$.pixelStorei($.UNPACK_IMAGE_HEIGHT,Re),$.pixelStorei($.UNPACK_SKIP_PIXELS,pn),$.pixelStorei($.UNPACK_SKIP_ROWS,Ue),$.pixelStorei($.UNPACK_SKIP_IMAGES,mn),ut===0&&pt.generateMipmaps&&$.generateMipmap(ie),rt.unbindTexture()},this.initTexture=function(O){O.isCubeTexture?T.setTextureCube(O,0):O.isData3DTexture?T.setTexture3D(O,0):O.isDataArrayTexture||O.isCompressedArrayTexture?T.setTexture2DArray(O,0):T.setTexture2D(O,0),rt.unbindTexture()},this.resetState=function(){k=0,I=0,R=null,rt.reset(),ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Gc?"display-p3":"srgb",e.unpackColorSpace=xe.workingColorSpace===Ja?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class jx extends en{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Kx extends dn{constructor(t=null,e=1,n=1,r,a,l,c,h,d=Ln,f=Ln,m,g){super(null,l,c,h,d,f,r,a,m,g),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bd extends ni{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const sr=new Me,wd=new Me,ya=[],Sd=new Cs,Jx=new Me,io=new Ne,so=new Ir;class Qx extends Ne{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new bd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Jx)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Cs),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),Sd.copy(t.boundingBox).applyMatrix4(sr),this.boundingBox.union(Sd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ir),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,sr),so.copy(t.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(so)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,a=n.length+1,l=t*a+1;for(let c=0;c<n.length;c++)n[c]=r[l+c]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(io.geometry=this.geometry,io.material=this.material,io.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),so.copy(this.boundingSphere),so.applyMatrix4(n),t.ray.intersectsSphere(so)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,sr),wd.multiplyMatrices(n,sr),io.matrixWorld=wd,io.raycast(t,ya);for(let l=0,c=ya.length;l<c;l++){const h=ya[l];h.instanceId=a,h.object=this,e.push(h)}ya.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new bd(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Kx(new Float32Array(r*this.count),r,this.count,mf,Ni));const a=this.morphTexture.source.data.data;let l=0;for(let d=0;d<n.length;d++)l+=n[d];const c=this.geometry.morphTargetsRelative?1:1-l,h=r*t;a[h]=c,a.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class el extends Dr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ed=new H,Td=new H,Ad=new Me,uc=new Qa,xa=new Ir;class qc extends en{constructor(t=new an,e=new el){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,a=e.count;r<a;r++)Ed.fromBufferAttribute(e,r-1),Td.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=Ed.distanceTo(Td);t.setAttribute("lineDistance",new ze(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,a=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(r),xa.radius+=a,t.ray.intersectsSphere(xa)===!1)return;Ad.copy(r).invert(),uc.copy(t.ray).applyMatrix4(Ad);const c=a/((this.scale.x+this.scale.y+this.scale.z)/3),h=c*c,d=new H,f=new H,m=new H,g=new H,_=this.isLineSegments?2:1,x=n.index,y=n.attributes.position;if(x!==null){const v=Math.max(0,l.start),N=Math.min(x.count,l.start+l.count);for(let b=v,A=N-1;b<A;b+=_){const k=x.getX(b),I=x.getX(b+1);if(d.fromBufferAttribute(y,k),f.fromBufferAttribute(y,I),uc.distanceSqToSegment(d,f,g,m)>h)continue;g.applyMatrix4(this.matrixWorld);const U=t.ray.origin.distanceTo(g);U<t.near||U>t.far||e.push({distance:U,point:m.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,l.start),N=Math.min(y.count,l.start+l.count);for(let b=v,A=N-1;b<A;b+=_){if(d.fromBufferAttribute(y,b),f.fromBufferAttribute(y,b+1),uc.distanceSqToSegment(d,f,g,m)>h)continue;g.applyMatrix4(this.matrixWorld);const I=t.ray.origin.distanceTo(g);I<t.near||I>t.far||e.push({distance:I,point:m.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const c=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=a}}}}}const Ld=new H,Pd=new H;class tM extends qc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,a=e.count;r<a;r+=2)Ld.fromBufferAttribute(e,r),Pd.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+Ld.distanceTo(Pd);t.setAttribute("lineDistance",new ze(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class zf extends dn{constructor(t,e,n,r,a,l,c,h,d){super(t,e,n,r,a,l,c,h,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),a=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),a+=n.distanceTo(r),e.push(a),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const a=n.length;let l;e?l=e:l=t*n[a-1];let c=0,h=a-1,d;for(;c<=h;)if(r=Math.floor(c+(h-c)/2),d=n[r]-l,d<0)c=r+1;else if(d>0)h=r-1;else{h=r;break}if(r=h,n[r]===l)return r/(a-1);const f=n[r],g=n[r+1]-f,_=(l-f)/g;return(r+_)/(a-1)}getTangent(t,e){let r=t-1e-4,a=t+1e-4;r<0&&(r=0),a>1&&(a=1);const l=this.getPoint(r),c=this.getPoint(a),h=e||(l.isVector2?new Et:new H);return h.copy(c).sub(l).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new H,r=[],a=[],l=[],c=new H,h=new Me;for(let _=0;_<=t;_++){const x=_/t;r[_]=this.getTangentAt(x,new H)}a[0]=new H,l[0]=new H;let d=Number.MAX_VALUE;const f=Math.abs(r[0].x),m=Math.abs(r[0].y),g=Math.abs(r[0].z);f<=d&&(d=f,n.set(1,0,0)),m<=d&&(d=m,n.set(0,1,0)),g<=d&&n.set(0,0,1),c.crossVectors(r[0],n).normalize(),a[0].crossVectors(r[0],c),l[0].crossVectors(r[0],a[0]);for(let _=1;_<=t;_++){if(a[_]=a[_-1].clone(),l[_]=l[_-1].clone(),c.crossVectors(r[_-1],r[_]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(rn(r[_-1].dot(r[_]),-1,1));a[_].applyMatrix4(h.makeRotationAxis(c,x))}l[_].crossVectors(r[_],a[_])}if(e===!0){let _=Math.acos(rn(a[0].dot(a[t]),-1,1));_/=t,r[0].dot(c.crossVectors(a[0],a[t]))>0&&(_=-_);for(let x=1;x<=t;x++)a[x].applyMatrix4(h.makeRotationAxis(r[x],_*x)),l[x].crossVectors(r[x],a[x])}return{tangents:r,normals:a,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class $c extends xi{constructor(t=0,e=0,n=1,r=1,a=0,l=Math.PI*2,c=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=l,this.aClockwise=c,this.aRotation=h}getPoint(t,e=new Et){const n=e,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const l=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(l?a=0:a=r),this.aClockwise===!0&&!l&&(a===r?a=-r:a=a-r);const c=this.aStartAngle+t*a;let h=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),m=Math.sin(this.aRotation),g=h-this.aX,_=d-this.aY;h=g*f-_*m+this.aX,d=g*m+_*f+this.aY}return n.set(h,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class eM extends $c{constructor(t,e,n,r,a,l){super(t,e,n,n,r,a,l),this.isArcCurve=!0,this.type="ArcCurve"}}function Yc(){let s=0,t=0,e=0,n=0;function r(a,l,c,h){s=a,t=c,e=-3*a+3*l-2*c-h,n=2*a-2*l+c+h}return{initCatmullRom:function(a,l,c,h,d){r(l,c,d*(c-a),d*(h-l))},initNonuniformCatmullRom:function(a,l,c,h,d,f,m){let g=(l-a)/d-(c-a)/(d+f)+(c-l)/f,_=(c-l)/f-(h-l)/(f+m)+(h-c)/m;g*=f,_*=f,r(l,c,g,_)},calc:function(a){const l=a*a,c=l*a;return s+t*a+e*l+n*c}}}const Ma=new H,hc=new Yc,dc=new Yc,fc=new Yc;class za extends xi{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new H){const n=e,r=this.points,a=r.length,l=(a-(this.closed?0:1))*t;let c=Math.floor(l),h=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/a)+1)*a:h===0&&c===a-1&&(c=a-2,h=1);let d,f;this.closed||c>0?d=r[(c-1)%a]:(Ma.subVectors(r[0],r[1]).add(r[0]),d=Ma);const m=r[c%a],g=r[(c+1)%a];if(this.closed||c+2<a?f=r[(c+2)%a]:(Ma.subVectors(r[a-1],r[a-2]).add(r[a-1]),f=Ma),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let x=Math.pow(d.distanceToSquared(m),_),w=Math.pow(m.distanceToSquared(g),_),y=Math.pow(g.distanceToSquared(f),_);w<1e-4&&(w=1),x<1e-4&&(x=w),y<1e-4&&(y=w),hc.initNonuniformCatmullRom(d.x,m.x,g.x,f.x,x,w,y),dc.initNonuniformCatmullRom(d.y,m.y,g.y,f.y,x,w,y),fc.initNonuniformCatmullRom(d.z,m.z,g.z,f.z,x,w,y)}else this.curveType==="catmullrom"&&(hc.initCatmullRom(d.x,m.x,g.x,f.x,this.tension),dc.initCatmullRom(d.y,m.y,g.y,f.y,this.tension),fc.initCatmullRom(d.z,m.z,g.z,f.z,this.tension));return n.set(hc.calc(h),dc.calc(h),fc.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new H().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Cd(s,t,e,n,r){const a=(n-t)*.5,l=(r-e)*.5,c=s*s,h=s*c;return(2*e-2*n+a+l)*h+(-3*e+3*n-2*a-l)*c+a*s+e}function nM(s,t){const e=1-s;return e*e*t}function iM(s,t){return 2*(1-s)*s*t}function sM(s,t){return s*s*t}function ho(s,t,e,n){return nM(s,t)+iM(s,e)+sM(s,n)}function rM(s,t){const e=1-s;return e*e*e*t}function oM(s,t){const e=1-s;return 3*e*e*s*t}function aM(s,t){return 3*(1-s)*s*s*t}function lM(s,t){return s*s*s*t}function fo(s,t,e,n,r){return rM(s,t)+oM(s,e)+aM(s,n)+lM(s,r)}class Hf extends xi{constructor(t=new Et,e=new Et,n=new Et,r=new Et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new Et){const n=e,r=this.v0,a=this.v1,l=this.v2,c=this.v3;return n.set(fo(t,r.x,a.x,l.x,c.x),fo(t,r.y,a.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class cM extends xi{constructor(t=new H,e=new H,n=new H,r=new H){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new H){const n=e,r=this.v0,a=this.v1,l=this.v2,c=this.v3;return n.set(fo(t,r.x,a.x,l.x,c.x),fo(t,r.y,a.y,l.y,c.y),fo(t,r.z,a.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Vf extends xi{constructor(t=new Et,e=new Et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uM extends xi{constructor(t=new H,e=new H){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new H){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new H){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Gf extends xi{constructor(t=new Et,e=new Et,n=new Et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Et){const n=e,r=this.v0,a=this.v1,l=this.v2;return n.set(ho(t,r.x,a.x,l.x),ho(t,r.y,a.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wf extends xi{constructor(t=new H,e=new H,n=new H){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new H){const n=e,r=this.v0,a=this.v1,l=this.v2;return n.set(ho(t,r.x,a.x,l.x),ho(t,r.y,a.y,l.y),ho(t,r.z,a.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zf extends xi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Et){const n=e,r=this.points,a=(r.length-1)*t,l=Math.floor(a),c=a-l,h=r[l===0?l:l-1],d=r[l],f=r[l>r.length-2?r.length-1:l+1],m=r[l>r.length-3?r.length-1:l+2];return n.set(Cd(c,h.x,d.x,f.x,m.x),Cd(c,h.y,d.y,f.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new Et().fromArray(r))}return this}}var Ha=Object.freeze({__proto__:null,ArcCurve:eM,CatmullRomCurve3:za,CubicBezierCurve:Hf,CubicBezierCurve3:cM,EllipseCurve:$c,LineCurve:Vf,LineCurve3:uM,QuadraticBezierCurve:Gf,QuadraticBezierCurve3:Wf,SplineCurve:Zf});class hM extends xi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ha[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let a=0;for(;a<r.length;){if(r[a]>=n){const l=r[a]-n,c=this.curves[a],h=c.getLength(),d=h===0?0:1-l/h;return c.getPointAt(d,e)}a++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,a=this.curves;r<a.length;r++){const l=a[r],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,h=l.getPoints(c);for(let d=0;d<h.length;d++){const f=h[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Ha[r.type]().fromJSON(r))}return this}}class Rd extends hM{constructor(t){super(),this.type="Path",this.currentPoint=new Et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Vf(this.currentPoint.clone(),new Et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const a=new Gf(this.currentPoint.clone(),new Et(t,e),new Et(n,r));return this.curves.push(a),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,a,l){const c=new Hf(this.currentPoint.clone(),new Et(t,e),new Et(n,r),new Et(a,l));return this.curves.push(c),this.currentPoint.set(a,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Zf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+c,e+h,n,r,a,l),this}absarc(t,e,n,r,a,l){return this.absellipse(t,e,n,n,r,a,l),this}ellipse(t,e,n,r,a,l,c,h){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,r,a,l,c,h),this}absellipse(t,e,n,r,a,l,c,h){const d=new $c(t,e,n,r,a,l,c,h);if(this.curves.length>0){const m=d.getPoint(0);m.equals(this.currentPoint)||this.lineTo(m.x,m.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class jc extends an{constructor(t=1,e=1,n=1,r=32,a=1,l=!1,c=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:r,heightSegments:a,openEnded:l,thetaStart:c,thetaLength:h};const d=this;r=Math.floor(r),a=Math.floor(a);const f=[],m=[],g=[],_=[];let x=0;const w=[],y=n/2;let v=0;N(),l===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(f),this.setAttribute("position",new ze(m,3)),this.setAttribute("normal",new ze(g,3)),this.setAttribute("uv",new ze(_,2));function N(){const A=new H,k=new H;let I=0;const R=(e-t)/n;for(let U=0;U<=a;U++){const P=[],E=U/a,B=E*(e-t)+t;for(let q=0;q<=r;q++){const F=q/r,X=F*h+c,et=Math.sin(X),K=Math.cos(X);k.x=B*et,k.y=-E*n+y,k.z=B*K,m.push(k.x,k.y,k.z),A.set(et,R,K).normalize(),g.push(A.x,A.y,A.z),_.push(F,1-E),P.push(x++)}w.push(P)}for(let U=0;U<r;U++)for(let P=0;P<a;P++){const E=w[P][U],B=w[P+1][U],q=w[P+1][U+1],F=w[P][U+1];f.push(E,B,F),f.push(B,q,F),I+=6}d.addGroup(v,I,0),v+=I}function b(A){const k=x,I=new Et,R=new H;let U=0;const P=A===!0?t:e,E=A===!0?1:-1;for(let q=1;q<=r;q++)m.push(0,y*E,0),g.push(0,E,0),_.push(.5,.5),x++;const B=x;for(let q=0;q<=r;q++){const X=q/r*h+c,et=Math.cos(X),K=Math.sin(X);R.x=P*K,R.y=y*E,R.z=P*et,m.push(R.x,R.y,R.z),g.push(0,E,0),I.x=et*.5+.5,I.y=K*.5*E+.5,_.push(I.x,I.y),x++}for(let q=0;q<r;q++){const F=k+q,X=B+q;A===!0?f.push(X,X+1,F):f.push(X+1,X,F),U+=3}d.addGroup(v,U,A===!0?1:2),v+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const ba=new H,wa=new H,pc=new H,Sa=new Qn;class dM extends an{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),a=Math.cos(uo*e),l=t.getIndex(),c=t.getAttribute("position"),h=l?l.count:c.count,d=[0,0,0],f=["a","b","c"],m=new Array(3),g={},_=[];for(let x=0;x<h;x+=3){l?(d[0]=l.getX(x),d[1]=l.getX(x+1),d[2]=l.getX(x+2)):(d[0]=x,d[1]=x+1,d[2]=x+2);const{a:w,b:y,c:v}=Sa;if(w.fromBufferAttribute(c,d[0]),y.fromBufferAttribute(c,d[1]),v.fromBufferAttribute(c,d[2]),Sa.getNormal(pc),m[0]=`${Math.round(w.x*r)},${Math.round(w.y*r)},${Math.round(w.z*r)}`,m[1]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,m[2]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,!(m[0]===m[1]||m[1]===m[2]||m[2]===m[0]))for(let N=0;N<3;N++){const b=(N+1)%3,A=m[N],k=m[b],I=Sa[f[N]],R=Sa[f[b]],U=`${A}_${k}`,P=`${k}_${A}`;P in g&&g[P]?(pc.dot(g[P].normal)<=a&&(_.push(I.x,I.y,I.z),_.push(R.x,R.y,R.z)),g[P]=null):U in g||(g[U]={index0:d[N],index1:d[b],normal:pc.clone()})}}for(const x in g)if(g[x]){const{index0:w,index1:y}=g[x];ba.fromBufferAttribute(c,w),wa.fromBufferAttribute(c,y),_.push(ba.x,ba.y,ba.z),_.push(wa.x,wa.y,wa.z)}this.setAttribute("position",new ze(_,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Co extends Rd{constructor(t){super(t),this.uuid=Rr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Rd().fromJSON(r))}return this}}const fM={triangulate:function(s,t,e=2){const n=t&&t.length,r=n?t[0]*e:s.length;let a=Xf(s,0,r,e,!0);const l=[];if(!a||a.next===a.prev)return l;let c,h,d,f,m,g,_;if(n&&(a=vM(s,t,a,e)),s.length>80*e){c=d=s[0],h=f=s[1];for(let x=e;x<r;x+=e)m=s[x],g=s[x+1],m<c&&(c=m),g<h&&(h=g),m>d&&(d=m),g>f&&(f=g);_=Math.max(d-c,f-h),_=_!==0?32767/_:0}return Mo(a,l,e,c,h,_,0),l}};function Xf(s,t,e,n,r){let a,l;if(r===PM(s,t,e,n)>0)for(a=t;a<e;a+=n)l=Id(a,s[a],s[a+1],l);else for(a=e-n;a>=t;a-=n)l=Id(a,s[a],s[a+1],l);return l&&nl(l,l.next)&&(wo(l),l=l.next),l}function Ts(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(nl(e,e.next)||De(e.prev,e,e.next)===0)){if(wo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Mo(s,t,e,n,r,a,l){if(!s)return;!l&&a&&wM(s,n,r,a);let c=s,h,d;for(;s.prev!==s.next;){if(h=s.prev,d=s.next,a?mM(s,n,r,a):pM(s)){t.push(h.i/e|0),t.push(s.i/e|0),t.push(d.i/e|0),wo(s),s=d.next,c=d.next;continue}if(s=d,s===c){l?l===1?(s=gM(Ts(s),t,e),Mo(s,t,e,n,r,a,2)):l===2&&_M(s,t,e,n,r,a):Mo(Ts(s),t,e,n,r,a,1);break}}}function pM(s){const t=s.prev,e=s,n=s.next;if(De(t,e,n)>=0)return!1;const r=t.x,a=e.x,l=n.x,c=t.y,h=e.y,d=n.y,f=r<a?r<l?r:l:a<l?a:l,m=c<h?c<d?c:d:h<d?h:d,g=r>a?r>l?r:l:a>l?a:l,_=c>h?c>d?c:d:h>d?h:d;let x=n.next;for(;x!==t;){if(x.x>=f&&x.x<=g&&x.y>=m&&x.y<=_&&hr(r,c,a,h,l,d,x.x,x.y)&&De(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function mM(s,t,e,n){const r=s.prev,a=s,l=s.next;if(De(r,a,l)>=0)return!1;const c=r.x,h=a.x,d=l.x,f=r.y,m=a.y,g=l.y,_=c<h?c<d?c:d:h<d?h:d,x=f<m?f<g?f:g:m<g?m:g,w=c>h?c>d?c:d:h>d?h:d,y=f>m?f>g?f:g:m>g?m:g,v=Pc(_,x,t,e,n),N=Pc(w,y,t,e,n);let b=s.prevZ,A=s.nextZ;for(;b&&b.z>=v&&A&&A.z<=N;){if(b.x>=_&&b.x<=w&&b.y>=x&&b.y<=y&&b!==r&&b!==l&&hr(c,f,h,m,d,g,b.x,b.y)&&De(b.prev,b,b.next)>=0||(b=b.prevZ,A.x>=_&&A.x<=w&&A.y>=x&&A.y<=y&&A!==r&&A!==l&&hr(c,f,h,m,d,g,A.x,A.y)&&De(A.prev,A,A.next)>=0))return!1;A=A.nextZ}for(;b&&b.z>=v;){if(b.x>=_&&b.x<=w&&b.y>=x&&b.y<=y&&b!==r&&b!==l&&hr(c,f,h,m,d,g,b.x,b.y)&&De(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;A&&A.z<=N;){if(A.x>=_&&A.x<=w&&A.y>=x&&A.y<=y&&A!==r&&A!==l&&hr(c,f,h,m,d,g,A.x,A.y)&&De(A.prev,A,A.next)>=0)return!1;A=A.nextZ}return!0}function gM(s,t,e){let n=s;do{const r=n.prev,a=n.next.next;!nl(r,a)&&qf(r,n,n.next,a)&&bo(r,a)&&bo(a,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(a.i/e|0),wo(n),wo(n.next),n=s=a),n=n.next}while(n!==s);return Ts(n)}function _M(s,t,e,n,r,a){let l=s;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&TM(l,c)){let h=$f(l,c);l=Ts(l,l.next),h=Ts(h,h.next),Mo(l,t,e,n,r,a,0),Mo(h,t,e,n,r,a,0);return}c=c.next}l=l.next}while(l!==s)}function vM(s,t,e,n){const r=[];let a,l,c,h,d;for(a=0,l=t.length;a<l;a++)c=t[a]*n,h=a<l-1?t[a+1]*n:s.length,d=Xf(s,c,h,n,!1),d===d.next&&(d.steiner=!0),r.push(EM(d));for(r.sort(yM),a=0;a<r.length;a++)e=xM(r[a],e);return e}function yM(s,t){return s.x-t.x}function xM(s,t){const e=MM(s,t);if(!e)return t;const n=$f(e,s);return Ts(n,n.next),Ts(e,e.next)}function MM(s,t){let e=t,n=-1/0,r;const a=s.x,l=s.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const g=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(g<=a&&g>n&&(n=g,r=e.x<e.next.x?e:e.next,g===a))return r}e=e.next}while(e!==t);if(!r)return null;const c=r,h=r.x,d=r.y;let f=1/0,m;e=r;do a>=e.x&&e.x>=h&&a!==e.x&&hr(l<d?a:n,l,h,d,l<d?n:a,l,e.x,e.y)&&(m=Math.abs(l-e.y)/(a-e.x),bo(e,s)&&(m<f||m===f&&(e.x>r.x||e.x===r.x&&bM(r,e)))&&(r=e,f=m)),e=e.next;while(e!==c);return r}function bM(s,t){return De(s.prev,s,t.prev)<0&&De(t.next,s,s.next)<0}function wM(s,t,e,n){let r=s;do r.z===0&&(r.z=Pc(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==s);r.prevZ.nextZ=null,r.prevZ=null,SM(r)}function SM(s){let t,e,n,r,a,l,c,h,d=1;do{for(e=s,s=null,a=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(h=d;c>0||h>0&&n;)c!==0&&(h===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,c--):(r=n,n=n.nextZ,h--),a?a.nextZ=r:s=r,r.prevZ=a,a=r;e=n}a.nextZ=null,d*=2}while(l>1);return s}function Pc(s,t,e,n,r){return s=(s-e)*r|0,t=(t-n)*r|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function EM(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function hr(s,t,e,n,r,a,l,c){return(r-l)*(t-c)>=(s-l)*(a-c)&&(s-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(a-c)>=(r-l)*(n-c)}function TM(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!AM(s,t)&&(bo(s,t)&&bo(t,s)&&LM(s,t)&&(De(s.prev,s,t.prev)||De(s,t.prev,t))||nl(s,t)&&De(s.prev,s,s.next)>0&&De(t.prev,t,t.next)>0)}function De(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function nl(s,t){return s.x===t.x&&s.y===t.y}function qf(s,t,e,n){const r=Ta(De(s,t,e)),a=Ta(De(s,t,n)),l=Ta(De(e,n,s)),c=Ta(De(e,n,t));return!!(r!==a&&l!==c||r===0&&Ea(s,e,t)||a===0&&Ea(s,n,t)||l===0&&Ea(e,s,n)||c===0&&Ea(e,t,n))}function Ea(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ta(s){return s>0?1:s<0?-1:0}function AM(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&qf(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function bo(s,t){return De(s.prev,s,s.next)<0?De(s,t,s.next)>=0&&De(s,s.prev,t)>=0:De(s,t,s.prev)<0||De(s,s.next,t)<0}function LM(s,t){let e=s,n=!1;const r=(s.x+t.x)/2,a=(s.y+t.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&r<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function $f(s,t){const e=new Cc(s.i,s.x,s.y),n=new Cc(t.i,t.x,t.y),r=s.next,a=t.prev;return s.next=t,t.prev=s,e.next=r,r.prev=e,n.next=e,e.prev=n,a.next=n,n.prev=a,n}function Id(s,t,e,n){const r=new Cc(s,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function wo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Cc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function PM(s,t,e,n){let r=0;for(let a=t,l=e-n;a<e;a+=n)r+=(s[l]-s[a])*(s[a+1]+s[l+1]),l=a;return r}class po{static area(t){const e=t.length;let n=0;for(let r=e-1,a=0;a<e;r=a++)n+=t[r].x*t[a].y-t[a].x*t[r].y;return n*.5}static isClockWise(t){return po.area(t)<0}static triangulateShape(t,e){const n=[],r=[],a=[];Dd(t),Nd(n,t);let l=t.length;e.forEach(Dd);for(let h=0;h<e.length;h++)r.push(l),l+=e[h].length,Nd(n,e[h]);const c=fM.triangulate(n,r);for(let h=0;h<c.length;h+=3)a.push(c.slice(h,h+3));return a}}function Dd(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Nd(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Or extends an{constructor(t=new Co([new Et(.5,.5),new Et(-.5,.5),new Et(-.5,-.5),new Et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],a=[];for(let c=0,h=t.length;c<h;c++){const d=t[c];l(d)}this.setAttribute("position",new ze(r,3)),this.setAttribute("uv",new ze(a,2)),this.computeVertexNormals();function l(c){const h=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,m=e.depth!==void 0?e.depth:1;let g=e.bevelEnabled!==void 0?e.bevelEnabled:!0,_=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:_-.1,w=e.bevelOffset!==void 0?e.bevelOffset:0,y=e.bevelSegments!==void 0?e.bevelSegments:3;const v=e.extrudePath,N=e.UVGenerator!==void 0?e.UVGenerator:CM;let b,A=!1,k,I,R,U;v&&(b=v.getSpacedPoints(f),A=!0,g=!1,k=v.computeFrenetFrames(f,!1),I=new H,R=new H,U=new H),g||(y=0,_=0,x=0,w=0);const P=c.extractPoints(d);let E=P.shape;const B=P.holes;if(!po.isClockWise(E)){E=E.reverse();for(let st=0,tt=B.length;st<tt;st++){const ot=B[st];po.isClockWise(ot)&&(B[st]=ot.reverse())}}const F=po.triangulateShape(E,B),X=E;for(let st=0,tt=B.length;st<tt;st++){const ot=B[st];E=E.concat(ot)}function et(st,tt,ot){return tt||console.error("THREE.ExtrudeGeometry: vec does not exist"),st.clone().addScaledVector(tt,ot)}const K=E.length,Mt=F.length;function Z(st,tt,ot){let rt,mt,D;const T=st.x-tt.x,W=st.y-tt.y,it=ot.x-st.x,ct=ot.y-st.y,_t=T*T+W*W,Ot=T*ct-W*it;if(Math.abs(Ot)>Number.EPSILON){const yt=Math.sqrt(_t),At=Math.sqrt(it*it+ct*ct),It=tt.x-W/yt,St=tt.y+T/yt,Ct=ot.x-ct/At,Xt=ot.y+it/At,Nt=((Ct-It)*ct-(Xt-St)*it)/(T*ct-W*it);rt=It+T*Nt-st.x,mt=St+W*Nt-st.y;const Ut=rt*rt+mt*mt;if(Ut<=2)return new Et(rt,mt);D=Math.sqrt(Ut/2)}else{let yt=!1;T>Number.EPSILON?it>Number.EPSILON&&(yt=!0):T<-Number.EPSILON?it<-Number.EPSILON&&(yt=!0):Math.sign(W)===Math.sign(ct)&&(yt=!0),yt?(rt=-W,mt=T,D=Math.sqrt(_t)):(rt=T,mt=W,D=Math.sqrt(_t/2))}return new Et(rt/D,mt/D)}const vt=[];for(let st=0,tt=X.length,ot=tt-1,rt=st+1;st<tt;st++,ot++,rt++)ot===tt&&(ot=0),rt===tt&&(rt=0),vt[st]=Z(X[st],X[ot],X[rt]);const G=[];let nt,J=vt.concat();for(let st=0,tt=B.length;st<tt;st++){const ot=B[st];nt=[];for(let rt=0,mt=ot.length,D=mt-1,T=rt+1;rt<mt;rt++,D++,T++)D===mt&&(D=0),T===mt&&(T=0),nt[rt]=Z(ot[rt],ot[D],ot[T]);G.push(nt),J=J.concat(nt)}for(let st=0;st<y;st++){const tt=st/y,ot=_*Math.cos(tt*Math.PI/2),rt=x*Math.sin(tt*Math.PI/2)+w;for(let mt=0,D=X.length;mt<D;mt++){const T=et(X[mt],vt[mt],rt);gt(T.x,T.y,-ot)}for(let mt=0,D=B.length;mt<D;mt++){const T=B[mt];nt=G[mt];for(let W=0,it=T.length;W<it;W++){const ct=et(T[W],nt[W],rt);gt(ct.x,ct.y,-ot)}}}const at=x+w;for(let st=0;st<K;st++){const tt=g?et(E[st],J[st],at):E[st];A?(R.copy(k.normals[0]).multiplyScalar(tt.x),I.copy(k.binormals[0]).multiplyScalar(tt.y),U.copy(b[0]).add(R).add(I),gt(U.x,U.y,U.z)):gt(tt.x,tt.y,0)}for(let st=1;st<=f;st++)for(let tt=0;tt<K;tt++){const ot=g?et(E[tt],J[tt],at):E[tt];A?(R.copy(k.normals[st]).multiplyScalar(ot.x),I.copy(k.binormals[st]).multiplyScalar(ot.y),U.copy(b[st]).add(R).add(I),gt(U.x,U.y,U.z)):gt(ot.x,ot.y,m/f*st)}for(let st=y-1;st>=0;st--){const tt=st/y,ot=_*Math.cos(tt*Math.PI/2),rt=x*Math.sin(tt*Math.PI/2)+w;for(let mt=0,D=X.length;mt<D;mt++){const T=et(X[mt],vt[mt],rt);gt(T.x,T.y,m+ot)}for(let mt=0,D=B.length;mt<D;mt++){const T=B[mt];nt=G[mt];for(let W=0,it=T.length;W<it;W++){const ct=et(T[W],nt[W],rt);A?gt(ct.x,ct.y+b[f-1].y,b[f-1].x+ot):gt(ct.x,ct.y,m+ot)}}}V(),Y();function V(){const st=r.length/3;if(g){let tt=0,ot=K*tt;for(let rt=0;rt<Mt;rt++){const mt=F[rt];wt(mt[2]+ot,mt[1]+ot,mt[0]+ot)}tt=f+y*2,ot=K*tt;for(let rt=0;rt<Mt;rt++){const mt=F[rt];wt(mt[0]+ot,mt[1]+ot,mt[2]+ot)}}else{for(let tt=0;tt<Mt;tt++){const ot=F[tt];wt(ot[2],ot[1],ot[0])}for(let tt=0;tt<Mt;tt++){const ot=F[tt];wt(ot[0]+K*f,ot[1]+K*f,ot[2]+K*f)}}n.addGroup(st,r.length/3-st,0)}function Y(){const st=r.length/3;let tt=0;dt(X,tt),tt+=X.length;for(let ot=0,rt=B.length;ot<rt;ot++){const mt=B[ot];dt(mt,tt),tt+=mt.length}n.addGroup(st,r.length/3-st,1)}function dt(st,tt){let ot=st.length;for(;--ot>=0;){const rt=ot;let mt=ot-1;mt<0&&(mt=st.length-1);for(let D=0,T=f+y*2;D<T;D++){const W=K*D,it=K*(D+1),ct=tt+rt+W,_t=tt+mt+W,Ot=tt+mt+it,yt=tt+rt+it;Tt(ct,_t,Ot,yt)}}}function gt(st,tt,ot){h.push(st),h.push(tt),h.push(ot)}function wt(st,tt,ot){Pt(st),Pt(tt),Pt(ot);const rt=r.length/3,mt=N.generateTopUV(n,r,rt-3,rt-2,rt-1);$(mt[0]),$(mt[1]),$(mt[2])}function Tt(st,tt,ot,rt){Pt(st),Pt(tt),Pt(rt),Pt(tt),Pt(ot),Pt(rt);const mt=r.length/3,D=N.generateSideWallUV(n,r,mt-6,mt-3,mt-2,mt-1);$(D[0]),$(D[1]),$(D[3]),$(D[1]),$(D[2]),$(D[3])}function Pt(st){r.push(h[st*3+0]),r.push(h[st*3+1]),r.push(h[st*3+2])}function $(st){a.push(st.x),a.push(st.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return RM(e,n,t)}static fromJSON(t,e){const n=[];for(let a=0,l=t.shapes.length;a<l;a++){const c=e[t.shapes[a]];n.push(c)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Ha[r.type]().fromJSON(r)),new Or(n,t.options)}}const CM={generateTopUV:function(s,t,e,n,r){const a=t[e*3],l=t[e*3+1],c=t[n*3],h=t[n*3+1],d=t[r*3],f=t[r*3+1];return[new Et(a,l),new Et(c,h),new Et(d,f)]},generateSideWallUV:function(s,t,e,n,r,a){const l=t[e*3],c=t[e*3+1],h=t[e*3+2],d=t[n*3],f=t[n*3+1],m=t[n*3+2],g=t[r*3],_=t[r*3+1],x=t[r*3+2],w=t[a*3],y=t[a*3+1],v=t[a*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new Et(l,1-h),new Et(d,1-m),new Et(g,1-x),new Et(w,1-v)]:[new Et(c,1-h),new Et(f,1-m),new Et(_,1-x),new Et(y,1-v)]}};function RM(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,r=s.length;n<r;n++){const a=s[n];e.shapes.push(a.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class il extends an{constructor(t=new Wf(new H(-1,-1,0),new H(-1,1,0),new H(1,1,0)),e=64,n=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:a};const l=t.computeFrenetFrames(e,a);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const c=new H,h=new H,d=new Et;let f=new H;const m=[],g=[],_=[],x=[];w(),this.setIndex(x),this.setAttribute("position",new ze(m,3)),this.setAttribute("normal",new ze(g,3)),this.setAttribute("uv",new ze(_,2));function w(){for(let b=0;b<e;b++)y(b);y(a===!1?e:0),N(),v()}function y(b){f=t.getPointAt(b/e,f);const A=l.normals[b],k=l.binormals[b];for(let I=0;I<=r;I++){const R=I/r*Math.PI*2,U=Math.sin(R),P=-Math.cos(R);h.x=P*A.x+U*k.x,h.y=P*A.y+U*k.y,h.z=P*A.z+U*k.z,h.normalize(),g.push(h.x,h.y,h.z),c.x=f.x+n*h.x,c.y=f.y+n*h.y,c.z=f.z+n*h.z,m.push(c.x,c.y,c.z)}}function v(){for(let b=1;b<=e;b++)for(let A=1;A<=r;A++){const k=(r+1)*(b-1)+(A-1),I=(r+1)*b+(A-1),R=(r+1)*b+A,U=(r+1)*(b-1)+A;x.push(k,I,U),x.push(I,R,U)}}function N(){for(let b=0;b<=e;b++)for(let A=0;A<=r;A++)d.x=b/e,d.y=A/r,_.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new il(new Ha[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Gn extends Dr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xf,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Yf extends en{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const mc=new Me,Od=new H,Ud=new H;class IM{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.map=null,this.mapPass=null,this.matrix=new Me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Zc,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new tn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Od.setFromMatrixPosition(t.matrixWorld),e.position.copy(Od),Ud.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ud),e.updateMatrixWorld(),mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class DM extends IM{constructor(){super(new Df(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class NM extends Yf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(en.DEFAULT_UP),this.updateMatrix(),this.target=new en,this.shadow=new DM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class OM extends Yf{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const kd=new Me;class jf{constructor(t,e,n=0,r=1/0){this.ray=new Qa(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new Wc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return kd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kd),this}intersectObject(t,e=!0,n=[]){return Rc(t,this,n,e),n.sort(Fd),n}intersectObjects(t,e=!0,n=[]){for(let r=0,a=t.length;r<a;r++)Rc(t[r],this,n,e);return n.sort(Fd),n}}function Fd(s,t){return s.distance-t.distance}function Rc(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const r=s.children;for(let a=0,l=r.length;a<l;a++)Rc(r[a],t,e,!0)}}class Bd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(rn(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hc);const zd={type:"change"},gc={type:"start"},Hd={type:"end"},Aa=new Qa,Vd=new hn,UM=Math.cos(70*Bg.DEG2RAD);class kM extends Ps{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new H,this.cursor=new H,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Bs.ROTATE,MIDDLE:Bs.DOLLY,RIGHT:Bs.PAN},this.touches={ONE:zs.ROTATE,TWO:zs.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Ct),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ct),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(zd),n.update(),a=r.NONE},this.update=function(){const S=new H,lt=new Es().setFromUnitVectors(t.up,new H(0,1,0)),xt=lt.clone().invert(),Lt=new H,Ft=new Es,pe=new H,he=2*Math.PI;return function(He=null){const ye=n.object.position;S.copy(ye).sub(n.target),S.applyQuaternion(lt),c.setFromVector3(S),n.autoRotate&&a===r.NONE&&q(E(He)),n.enableDamping?(c.theta+=h.theta*n.dampingFactor,c.phi+=h.phi*n.dampingFactor):(c.theta+=h.theta,c.phi+=h.phi);let Oe=n.minAzimuthAngle,Pe=n.maxAzimuthAngle;isFinite(Oe)&&isFinite(Pe)&&(Oe<-Math.PI?Oe+=he:Oe>Math.PI&&(Oe-=he),Pe<-Math.PI?Pe+=he:Pe>Math.PI&&(Pe-=he),Oe<=Pe?c.theta=Math.max(Oe,Math.min(Pe,c.theta)):c.theta=c.theta>(Oe+Pe)/2?Math.max(Oe,c.theta):Math.min(Pe,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let fn=!1;if(n.zoomToCursor&&I||n.object.isOrthographicCamera)c.radius=G(c.radius);else{const Mn=c.radius;c.radius=G(c.radius*d),fn=Mn!=c.radius}if(S.setFromSpherical(c),S.applyQuaternion(xt),ye.copy(n.target).add(S),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&I){let Mn=null;if(n.object.isPerspectiveCamera){const ri=S.length();Mn=G(ri*d);const Fi=ri-Mn;n.object.position.addScaledVector(A,Fi),n.object.updateMatrixWorld(),fn=!!Fi}else if(n.object.isOrthographicCamera){const ri=new H(k.x,k.y,0);ri.unproject(n.object);const Fi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),fn=Fi!==n.object.zoom;const $e=new H(k.x,k.y,0);$e.unproject(n.object),n.object.position.sub($e).add(ri),n.object.updateMatrixWorld(),Mn=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;Mn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(Mn).add(n.object.position):(Aa.origin.copy(n.object.position),Aa.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Aa.direction))<UM?t.lookAt(n.target):(Vd.setFromNormalAndCoplanarPoint(n.object.up,n.target),Aa.intersectPlane(Vd,n.target))))}else if(n.object.isOrthographicCamera){const Mn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),Mn!==n.object.zoom&&(n.object.updateProjectionMatrix(),fn=!0)}return d=1,I=!1,fn||Lt.distanceToSquared(n.object.position)>l||8*(1-Ft.dot(n.object.quaternion))>l||pe.distanceToSquared(n.target)>l?(n.dispatchEvent(zd),Lt.copy(n.object.position),Ft.copy(n.object.quaternion),pe.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ut),n.domElement.removeEventListener("pointerdown",W),n.domElement.removeEventListener("pointercancel",ct),n.domElement.removeEventListener("wheel",yt),n.domElement.removeEventListener("pointermove",it),n.domElement.removeEventListener("pointerup",ct),n.domElement.getRootNode().removeEventListener("keydown",It,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ct),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=r.NONE;const l=1e-6,c=new Bd,h=new Bd;let d=1;const f=new H,m=new Et,g=new Et,_=new Et,x=new Et,w=new Et,y=new Et,v=new Et,N=new Et,b=new Et,A=new H,k=new Et;let I=!1;const R=[],U={};let P=!1;function E(S){return S!==null?2*Math.PI/60*n.autoRotateSpeed*S:2*Math.PI/60/60*n.autoRotateSpeed}function B(S){const lt=Math.abs(S*.01);return Math.pow(.95,n.zoomSpeed*lt)}function q(S){h.theta-=S}function F(S){h.phi-=S}const X=function(){const S=new H;return function(xt,Lt){S.setFromMatrixColumn(Lt,0),S.multiplyScalar(-xt),f.add(S)}}(),et=function(){const S=new H;return function(xt,Lt){n.screenSpacePanning===!0?S.setFromMatrixColumn(Lt,1):(S.setFromMatrixColumn(Lt,0),S.crossVectors(n.object.up,S)),S.multiplyScalar(xt),f.add(S)}}(),K=function(){const S=new H;return function(xt,Lt){const Ft=n.domElement;if(n.object.isPerspectiveCamera){const pe=n.object.position;S.copy(pe).sub(n.target);let he=S.length();he*=Math.tan(n.object.fov/2*Math.PI/180),X(2*xt*he/Ft.clientHeight,n.object.matrix),et(2*Lt*he/Ft.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(X(xt*(n.object.right-n.object.left)/n.object.zoom/Ft.clientWidth,n.object.matrix),et(Lt*(n.object.top-n.object.bottom)/n.object.zoom/Ft.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function Mt(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function vt(S,lt){if(!n.zoomToCursor)return;I=!0;const xt=n.domElement.getBoundingClientRect(),Lt=S-xt.left,Ft=lt-xt.top,pe=xt.width,he=xt.height;k.x=Lt/pe*2-1,k.y=-(Ft/he)*2+1,A.set(k.x,k.y,1).unproject(n.object).sub(n.object.position).normalize()}function G(S){return Math.max(n.minDistance,Math.min(n.maxDistance,S))}function nt(S){m.set(S.clientX,S.clientY)}function J(S){vt(S.clientX,S.clientX),v.set(S.clientX,S.clientY)}function at(S){x.set(S.clientX,S.clientY)}function V(S){g.set(S.clientX,S.clientY),_.subVectors(g,m).multiplyScalar(n.rotateSpeed);const lt=n.domElement;q(2*Math.PI*_.x/lt.clientHeight),F(2*Math.PI*_.y/lt.clientHeight),m.copy(g),n.update()}function Y(S){N.set(S.clientX,S.clientY),b.subVectors(N,v),b.y>0?Mt(B(b.y)):b.y<0&&Z(B(b.y)),v.copy(N),n.update()}function dt(S){w.set(S.clientX,S.clientY),y.subVectors(w,x).multiplyScalar(n.panSpeed),K(y.x,y.y),x.copy(w),n.update()}function gt(S){vt(S.clientX,S.clientY),S.deltaY<0?Z(B(S.deltaY)):S.deltaY>0&&Mt(B(S.deltaY)),n.update()}function wt(S){let lt=!1;switch(S.code){case n.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(0,n.keyPanSpeed),lt=!0;break;case n.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(0,-n.keyPanSpeed),lt=!0;break;case n.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?q(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(n.keyPanSpeed,0),lt=!0;break;case n.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?q(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(-n.keyPanSpeed,0),lt=!0;break}lt&&(S.preventDefault(),n.update())}function Tt(S){if(R.length===1)m.set(S.pageX,S.pageY);else{const lt=ge(S),xt=.5*(S.pageX+lt.x),Lt=.5*(S.pageY+lt.y);m.set(xt,Lt)}}function Pt(S){if(R.length===1)x.set(S.pageX,S.pageY);else{const lt=ge(S),xt=.5*(S.pageX+lt.x),Lt=.5*(S.pageY+lt.y);x.set(xt,Lt)}}function $(S){const lt=ge(S),xt=S.pageX-lt.x,Lt=S.pageY-lt.y,Ft=Math.sqrt(xt*xt+Lt*Lt);v.set(0,Ft)}function st(S){n.enableZoom&&$(S),n.enablePan&&Pt(S)}function tt(S){n.enableZoom&&$(S),n.enableRotate&&Tt(S)}function ot(S){if(R.length==1)g.set(S.pageX,S.pageY);else{const xt=ge(S),Lt=.5*(S.pageX+xt.x),Ft=.5*(S.pageY+xt.y);g.set(Lt,Ft)}_.subVectors(g,m).multiplyScalar(n.rotateSpeed);const lt=n.domElement;q(2*Math.PI*_.x/lt.clientHeight),F(2*Math.PI*_.y/lt.clientHeight),m.copy(g)}function rt(S){if(R.length===1)w.set(S.pageX,S.pageY);else{const lt=ge(S),xt=.5*(S.pageX+lt.x),Lt=.5*(S.pageY+lt.y);w.set(xt,Lt)}y.subVectors(w,x).multiplyScalar(n.panSpeed),K(y.x,y.y),x.copy(w)}function mt(S){const lt=ge(S),xt=S.pageX-lt.x,Lt=S.pageY-lt.y,Ft=Math.sqrt(xt*xt+Lt*Lt);N.set(0,Ft),b.set(0,Math.pow(N.y/v.y,n.zoomSpeed)),Mt(b.y),v.copy(N);const pe=(S.pageX+lt.x)*.5,he=(S.pageY+lt.y)*.5;vt(pe,he)}function D(S){n.enableZoom&&mt(S),n.enablePan&&rt(S)}function T(S){n.enableZoom&&mt(S),n.enableRotate&&ot(S)}function W(S){n.enabled!==!1&&(R.length===0&&(n.domElement.setPointerCapture(S.pointerId),n.domElement.addEventListener("pointermove",it),n.domElement.addEventListener("pointerup",ct)),!ee(S)&&(jt(S),S.pointerType==="touch"?Xt(S):_t(S)))}function it(S){n.enabled!==!1&&(S.pointerType==="touch"?Nt(S):Ot(S))}function ct(S){switch(zt(S),R.length){case 0:n.domElement.releasePointerCapture(S.pointerId),n.domElement.removeEventListener("pointermove",it),n.domElement.removeEventListener("pointerup",ct),n.dispatchEvent(Hd),a=r.NONE;break;case 1:const lt=R[0],xt=U[lt];Xt({pointerId:lt,pageX:xt.x,pageY:xt.y});break}}function _t(S){let lt;switch(S.button){case 0:lt=n.mouseButtons.LEFT;break;case 1:lt=n.mouseButtons.MIDDLE;break;case 2:lt=n.mouseButtons.RIGHT;break;default:lt=-1}switch(lt){case Bs.DOLLY:if(n.enableZoom===!1)return;J(S),a=r.DOLLY;break;case Bs.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enablePan===!1)return;at(S),a=r.PAN}else{if(n.enableRotate===!1)return;nt(S),a=r.ROTATE}break;case Bs.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enableRotate===!1)return;nt(S),a=r.ROTATE}else{if(n.enablePan===!1)return;at(S),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(gc)}function Ot(S){switch(a){case r.ROTATE:if(n.enableRotate===!1)return;V(S);break;case r.DOLLY:if(n.enableZoom===!1)return;Y(S);break;case r.PAN:if(n.enablePan===!1)return;dt(S);break}}function yt(S){n.enabled===!1||n.enableZoom===!1||a!==r.NONE||(S.preventDefault(),n.dispatchEvent(gc),gt(At(S)),n.dispatchEvent(Hd))}function At(S){const lt=S.deltaMode,xt={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(lt){case 1:xt.deltaY*=16;break;case 2:xt.deltaY*=100;break}return S.ctrlKey&&!P&&(xt.deltaY*=10),xt}function It(S){S.key==="Control"&&(P=!0,n.domElement.getRootNode().addEventListener("keyup",St,{passive:!0,capture:!0}))}function St(S){S.key==="Control"&&(P=!1,n.domElement.getRootNode().removeEventListener("keyup",St,{passive:!0,capture:!0}))}function Ct(S){n.enabled===!1||n.enablePan===!1||wt(S)}function Xt(S){switch(ue(S),R.length){case 1:switch(n.touches.ONE){case zs.ROTATE:if(n.enableRotate===!1)return;Tt(S),a=r.TOUCH_ROTATE;break;case zs.PAN:if(n.enablePan===!1)return;Pt(S),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(n.touches.TWO){case zs.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;st(S),a=r.TOUCH_DOLLY_PAN;break;case zs.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;tt(S),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(gc)}function Nt(S){switch(ue(S),a){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ot(S),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;rt(S),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;D(S),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;T(S),n.update();break;default:a=r.NONE}}function Ut(S){n.enabled!==!1&&S.preventDefault()}function jt(S){R.push(S.pointerId)}function zt(S){delete U[S.pointerId];for(let lt=0;lt<R.length;lt++)if(R[lt]==S.pointerId){R.splice(lt,1);return}}function ee(S){for(let lt=0;lt<R.length;lt++)if(R[lt]==S.pointerId)return!0;return!1}function ue(S){let lt=U[S.pointerId];lt===void 0&&(lt=new Et,U[S.pointerId]=lt),lt.set(S.pageX,S.pageY)}function ge(S){const lt=S.pointerId===R[0]?R[1]:R[0];return U[lt]}n.domElement.addEventListener("contextmenu",Ut),n.domElement.addEventListener("pointerdown",W),n.domElement.addEventListener("pointercancel",ct),n.domElement.addEventListener("wheel",yt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",It,{passive:!0,capture:!0}),this.update()}}var Ro=Uint8Array,Kf=Uint16Array,FM=Int32Array,BM=new Ro([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),zM=new Ro([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Jf=function(s,t){for(var e=new Kf(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var r=new FM(e[30]),n=1;n<30;++n)for(var a=e[n];a<e[n+1];++a)r[a]=a-e[n]<<5|n;return{b:e,r}},Qf=Jf(BM,2),HM=Qf.b,VM=Qf.r;HM[28]=258,VM[258]=28;Jf(zM,0);var GM=new Kf(32768);for(ve=0;ve<32768;++ve)Ri=(ve&43690)>>1|(ve&21845)<<1,Ri=(Ri&52428)>>2|(Ri&13107)<<2,Ri=(Ri&61680)>>4|(Ri&3855)<<4,GM[ve]=((Ri&65280)>>8|(Ri&255)<<8)>>1;var Ri,ve,sl=new Ro(288);for(ve=0;ve<144;++ve)sl[ve]=8;var ve;for(ve=144;ve<256;++ve)sl[ve]=9;var ve;for(ve=256;ve<280;++ve)sl[ve]=7;var ve;for(ve=280;ve<288;++ve)sl[ve]=8;var ve,WM=new Ro(32);for(ve=0;ve<32;++ve)WM[ve]=5;var ve,ZM=new Ro(0),XM=typeof TextDecoder<"u"&&new TextDecoder,qM=0;try{XM.decode(ZM,{stream:!0}),qM=1}catch{}const $M="modulepreload",YM=function(s){return"/"+s},Gd={},jM=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");r=Promise.allSettled(e.map(h=>{if(h=YM(h),h in Gd)return;Gd[h]=!0;const d=h.endsWith(".css"),f=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":$M,d||(m.as="script"),m.crossOrigin="",m.href=h,c&&m.setAttribute("nonce",c),document.head.appendChild(m),d)return new Promise((g,_)=>{m.addEventListener("load",g),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return r.then(l=>{for(const c of l||[])c.status==="rejected"&&a(c.reason);return t().catch(a)})};let An=null,Le=null,xn=null,ti=null,Wd="",Qt=null,te=null,fi=null,Ic="",_i=[],Zd="",Ie=null,rl=null;const qt={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500",7:"#b8b8b8",8:"#262626"},ke={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0,river_polygons:!0,barren:!0,parks:!0,reservoir:!0,buildings:!0,roads:!0,towers:!0},fe={};let Dc=1,tp=1,KM=0;const vi=[];let ii=[],mo=[],ol=[];const Io=new Map;let So=-1,al=!1,Kc="",Wn=200,Zn=200,As=2,si=1,Pa=[],Eo=-1,Va=!1;const ll={water_ocean:!0,water_lake:!0,water_pond:!0,water_reservoir:!0,water_wastewater:!0,water_human:!0,water_other:!0};let go=1,Nc=-1;const Ki={rivers:!0,streams_named:!0,streams_unnamed:!0,river_polygons:!0,canals:!0,canal_polygons:!0},ro={lc_forest:!1,lc_forest_detailed:!1,lc_scrub:!1,lc_shrub:!1,lc_grass:!1,lc_grass_detailed:!1,lc_crop:!1,lc_moss:!1,lc_wetland:!1,lc_wetland_detailed:!1,lc_mangrove:!1,lc_barren:!1,lc_desert:!1,lc_sand:!1,lc_rock:!1,lc_snow:!1,lc_glacier:!1,lc_urban:!1},Yi={veg_dense:{...ro,lc_forest:!0,lc_forest_detailed:!0,lc_shrub:!0,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},veg_low:{...ro,lc_scrub:!0,lc_grass:!0,lc_grass_detailed:!0,lc_crop:!0,lc_moss:!0},wetland_lc:{...ro,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},snow_lc:{...ro,lc_snow:!0,lc_glacier:!0},barren_lc:{...ro,lc_barren:!0,lc_desert:!0,lc_sand:!0,lc_rock:!0,lc_urban:!0}},ep={veg_dense:0,veg_low:0,wetland_lc:0,snow_lc:0,barren_lc:0};let JM=.2,is=1,Er=1,Ga=.6,Wa=1,Xn=[],Tr=[],Ar=[],_c=[],Xd="";function QM(s){is=s}function tb(s){Er=s}function eb(s){Ga=s}function nb(s){Wa=s}let Za=0,Jc=.5,cl=1,Qc="raised",Nn=[],In=null;function ib(s){Za=s}function sb(s){Jc=s}function rb(s){cl=s}function ob(s){Qc=s}function qd(s,t,e){Yi[s]&&(Yi[s][t]=e,te&&(te.dispose(),te=null))}function ab(s,t){ep[s]=t}const lr={},Xa={};let pi=null,$d="",Je=null,qa=null,Oc=[],ws=null,Ce=null,dr=null,oo=null,tu=!1;const On=256,lb=3072;let on=[];const fr=[];function np(){if(!Ce||!dr)return!1;const s=dr.getBoundingClientRect();return!s.width||!s.height?!1:(Ce.style.left=`${s.left}px`,Ce.style.top=`${s.top}px`,Ce.style.width=`${s.width}px`,Ce.style.height=`${s.height}px`,An&&(An.setSize(s.width,s.height,!1),xn.aspect=s.width/s.height,xn.updateProjectionMatrix()),!0)}function Yd(){if(!Ce||!tu)return;np()&&Ce.style.display==="none"&&(Ce.style.display="block")}function Lr(s){if(Ce||(Ce=document.getElementById("dims-canvas")),dr!==s&&(oo&&dr&&oo.unobserve(dr),dr=s,oo||(oo=new ResizeObserver(Yd),window.addEventListener("resize",Yd)),oo.observe(s)),tu=!0,np()&&Ce&&(Ce.style.display="block"),An)return;const t=s.getBoundingClientRect(),e=t.width||800,n=t.height||600;An=new Yx({canvas:Ce,antialias:!0}),An.setPixelRatio(Math.min(window.devicePixelRatio,2)),An.setSize(e,n,!1),An.localClippingEnabled=!0,Le=new jx,Le.background=new ne(527380),xn=new Hn(42,e/n,.1,1e5),ti=new kM(xn,Ce),ti.enableDamping=!0,ti.dampingFactor=.06,Le.add(new OM(16777215,.8));const r=new NM(16777215,.6);r.position.set(1.5,3,2),Le.add(r);const a=()=>{requestAnimationFrame(a),ti.update(),An.render(Le,xn),qb()};a()}function ip(){tu=!1,Ce&&(Ce.style.display="none")}function Ur(s){if(Object.assign(qt,s),Qt&&(te&&(te.dispose(),te=null),te=vr(Qt.bounds,Qt.grid,On,Qt.minE,Qt.elevRange,_i,Wn,Zn,si,Nn,Xn),Je)){const f=Je.material;f.map=te,f.needsUpdate=!0}const t=fe.base??1;qa&&qa.material.color.set(qt[t]??qt[1]);const e=fe.facade??1,n=new ne(qt[e]??qt[1]);for(const f of Oc)f.material.color.set(n);if(ws){const f=fe.gpx_line??6,m=qt[f]??"#ff4500";ws.traverse(g=>{const _=g.material;_?.color&&_.color.set(m)}),ws.visible=ke.gpx_line??!0}const r=fe.gpx??6,a=qt[r]??"#ff4500";for(const f of ii)f.traverse(m=>{const g=m.material;g?.color&&g.color.set(a)});const l=fe.buildings??7,c=new ne(qt[l]??"#b8b8b8");for(const f of mo)f.material.color.set(c);const h=fe.roads??8,d=new ne(qt[h]??"#262626");In?.traverse(f=>{const m=f.material;m?.color&&m.color.set(d)});for(const f of ol){const m=f.__zoneLayerId,g=_r.find(x=>x.id===m);if(!g)continue;const _=fe[m]??g.slot;f.material.color.set(qt[_]??"#888")}}function cb(s,t){fe[s]=t,Ur({})}function sp(s,t){if(ke[s]=t,s==="gpx_line")ws&&(ws.visible=t);else if(s==="gpx")for(const e of ii)e.visible=t;else if(s==="buildings"){for(const e of mo)e.visible=t;Qt&&(te&&(te.dispose(),te=null),te=vr(Qt.bounds,Qt.grid,On,Qt.minE,Qt.elevRange,_i,Wn,Zn,si,Nn,Xn),Je&&(Je.material.map=te,Je.material.needsUpdate=!0),yo&&Ca())}else if(s==="roads")In&&(In.visible=t),Qt&&(te&&(te.dispose(),te=null),te=vr(Qt.bounds,Qt.grid,On,Qt.minE,Qt.elevRange,_i,Wn,Zn,si,Nn,Xn),Je&&(Je.material.map=te,Je.material.needsUpdate=!0),yo&&Ca());else if(Qt){if(te&&(te.dispose(),te=null),te=vr(Qt.bounds,Qt.grid,On,Qt.minE,Qt.elevRange,_i,Wn,Zn,si,Nn,Xn),Je){const e=Je.material;e.map=te,e.needsUpdate=!0}yo&&Ca()}}function ub(s,t){Dc=s,tp=t}function hb(s){al=!0,Kc=s,Ce&&(Ce.style.cursor="crosshair")}function rp(){al=!1,Kc="",Ce&&(Ce.style.cursor="")}function op(){return al}function db(s,t){if(!al||!Le||!xn||!Je||!Ce)return-1;const e=Ce.getBoundingClientRect(),n=(s-e.left)/e.width*2-1,r=-((t-e.top)/e.height)*2+1,a=new jf;a.setFromCamera(new Et(n,r),xn);const l=a.intersectObject(Je);let c=-1;if(l.length>0){const h=l[0].point,d=.5-h.z/Zn,f=.5+h.x/Wn,m=KM++,g={id:m,latFrac:d,lonFrac:f,shape:Kc,visible:!0,diameterMult:10,rotDeg:0,flatTop:!0,heightOffMult:0};vi.push(g),nu(g,vi.length-1),c=m}return rp(),c}function Uc(){return vi.map(s=>({id:s.id,shape:s.shape,visible:s.visible,diameterMult:s.diameterMult,rotDeg:s.rotDeg,flatTop:s.flatTop,heightOffMult:s.heightOffMult}))}function kc(){return So}function ap(s){So=s}function fb(){So=-1}function pb(s,t){if(!Le||!xn||!Ce||ii.length===0)return-1;const e=Ce.getBoundingClientRect(),n=(s-e.left)/e.width*2-1,r=-((t-e.top)/e.height)*2+1,a=new jf;a.setFromCamera(new Et(n,r),xn);const l=a.intersectObjects(ii,!0);if(!l.length)return-1;let c=l[0].object;for(;c;){const h=Io.get(c);if(h!==void 0)return h;c=c.parent}return-1}function Fc(s,t){const e=vi.findIndex(a=>a.id===s);if(e<0)return;Object.assign(vi[e],t);const n=ii[e];if(n){Io.delete(n),Le?.remove(n);const a=on.indexOf(n);a>=0&&on.splice(a,1),ii.splice(e,1)}const r=vi[e];nu(r,e)}function mb(s,t){Fc(s,{visible:t})}function gb(s){const t=vi.findIndex(n=>n.id===s);if(t<0)return;vi.splice(t,1);const e=ii.splice(t,1)[0];if(e){Io.delete(e),Le?.remove(e);const n=on.indexOf(e);n>=0&&on.splice(n,1)}So===s&&(So=-1)}async function _b(s,t,e){if(!Le||!xn||!ti||!An)return;const n=`${s.minLat}|${s.maxLat}|${s.minLon}|${s.maxLon}`,r=n!==Wd;r&&(Wd=n,Qt=null,te&&(te.dispose(),te=null),e(5,"Téléchargement des altitudes…"),Qt=await Zb(s));const a={features:n!==Zd,buildings:n!==Xd};if(a.features||a.buildings){e(30,"Chargement des données géographiques…");const{zoneFeatures:c,buildings:h,buildingParts:d,towers:f,roads:m}=await xb(s);(c.length>0||h.length>0||m.length>0)&&(Zd=n,Xd=n,c.length>0&&(_i=c,te&&(te.dispose(),te=null)),Xn=h,Tr=d,Ar=f,Nn=m)}if(!te&&Qt){e(70,"Génération de la texture…");const{wMm:c,dMm:h,exag:d}=t,f=s,m=(f.minLat+f.maxLat)/2,g=Math.max((f.maxLon-f.minLon)*Math.cos(m*Math.PI/180)*111320,(f.maxLat-f.minLat)*111320),_=Math.max(c,h),x=Math.max(1,Math.min(_*.5,Qt.elevRange/g*_*d));te=vr(s,Qt.grid,On,Qt.minE,Qt.elevRange,_i,c,h,x,Nn,Xn)}else r||e(50,"Reconstruction…");const l=JSON.stringify(t.zonePts);(l!==Ic||!fi)&&(Ic=l,fi&&(fi.dispose(),fi=null),fi=Nb(t.zonePts,t.zoneType,s)),e(88,"Construction de la scène 3D…"),En(t),e(100,"")}function En(s){if(!Le||!xn||!ti||!Qt)return;Xb();const{wMm:t,dMm:e,baseH:n,exag:r,flatFacade:a,facadeWidthMm:l,gpxPoints:c,zoneType:h,zonePts:d,bounds:f}=s,{grid:m,minE:g,elevRange:_}=Qt,x=f??Qt.bounds;Pa=c;const w=(x.minLat+x.maxLat)/2,y=(x.maxLon-x.minLon)*Math.cos(w*Math.PI/180)*111320,v=(x.maxLat-x.minLat)*111320,N=Math.max(y,v),b=Math.max(t,e),A=Math.max(1,Math.min(b*.5,_/N*b*r));te||(te=vr(x,m,On,g,_,_i,t,e,A,Nn,Xn));const k=n+A,I=On,R=Ob(d,h,x,t,e);Ie=R;const U=Math.max(1,l);Je=null,qa=null,Oc=[],ws=null,pi=null,ii=[],mo=[],ol=[],In=null,Wn=t,Zn=e,As=n,si=A;const E=Db(m,I,x,_i,_,A,.2);rl=E;{const J=new Po(t,e,I-1,I-1);J.rotateX(-Math.PI/2);const at=J.attributes.position;for(let Y=0;Y<at.count;Y++)at.setY(Y,n+(E[Y]-g)/_*A);at.needsUpdate=!0,J.computeVertexNormals();const V=new Ne(J,new Gn({map:te,alphaMap:fi??void 0,transparent:!!fi}));Je=V,ui(V)}const B=fe.base??1,q=new ne(qt[B]??qt[1]),F=new Ne(Ub(R,h,t,e,n,U),new Gn({color:q,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));qa=F,ui(F);const X=fe.facade??1,et=new ne(qt[X]??qt[1]),K=new Gn({color:et,side:Vn});for(const J of kb(R,h,t,e,U,a,k,m,I,g,_,n,A))J.material=K,Oc.push(J),ui(J);if(c.length>=2){const J=Wb(c,x,t,e,E,I,g,_,n,A);J&&(J.visible=ke.gpx_line??!0,ws=J,ui(J))}{const J=new tM(new dM(new ki(t+U*2,k,e+U*2)),new el({color:16718362}));J.position.y=k/2,ui(J)}fr.length=0,fr.push({id:"dl-width",v:new H(0,2,e/2+U+14)}),fr.push({id:"dl-depth",v:new H(t/2+U+14,k*.1,0)}),fr.push({id:"dl-height",v:new H(-t/2-U-12,k/2,e/2+8)}),rr("dl-width",`${t} mm`),rr("dl-depth",`${e} mm`),rr("dl-height",`~${Math.round(k*10)/10} mm`),rr("dp-total-val",`~${Math.round(k*10)/10}`),rr("dp-map-h",`~${Math.round(A*10)/10}`),rr("dp-base-h-disp",`${n}`),Wn=t,Zn=e,As=n,si=A,Io.clear();for(let J=0;J<vi.length;J++)nu(vi[J],J);eu();try{Bc()}catch(J){console.warn("rebuildRoadMeshes failed:",J)}if(Xn.length>0){const J=ke.buildings??!0;for(const at of Mb(Xn,x,E,I,g,_,t,e,n,A))at.visible=J,mo.push(at),ui(at)}const Mt=(x.minLat+x.maxLat)/2,Z=Math.cos(Mt*Math.PI/180),vt=t/((x.maxLon-x.minLon)*Z*111320);let G=null;_c=[];{const J=up("eiffel");if(J){const at=(J.lon-x.minLon)/(x.maxLon-x.minLon),V=(J.lat-x.minLat)/(x.maxLat-x.minLat);if(at>=0&&at<=1&&V>=0&&V<=1){const Y=(at-.5)*t,dt=(.5-V)*e;if(!Ie||ei(Y,dt,Ie)){const gt=yn(E,I,at,1-V),wt=n+(gt-g)/_*A,Tt=cp(Y,dt,wt,vt),Pt=[],$=[];for(const rt of Tt)bb(rt,Pt,$);const st=new an;st.setAttribute("position",new ze(Pt,3)),st.setIndex($),st.computeVertexNormals();const tt=new Gn({color:new ne(qt[fe.buildings??7]??"#888888")}),ot=new Ne(st,tt);ot.visible=ke.towers??!0,_c.push(ot),ui(ot),G={cx:Y,cz:dt,rMm:90*vt}}}}}if(Tr.length>0){const J=ke.buildings??!0;for(const at of Eb(Tr,x,E,I,g,_,t,e,n,A,G))at.visible=J,mo.push(at),ui(at)}if(Ar.length>0){const J=ke.towers??!0;for(const at of Tb(Ar,x,E,I,g,_,t,e,n,A,G))at.visible=J,_c.push(at),ui(at)}const nt=Math.sqrt(t*t+e*e);{const J=new H(0,k*.3,0);ti.target.lengthSq()<.1&&(xn.position.set(t*.7,k+nt*.44,e*.92),xn.lookAt(J)),ti.target.copy(J),ti.update()}}function vb(){ti&&ti.target.set(0,0,0),te&&(te.dispose(),te=null),fi&&(fi.dispose(),fi=null),Ic=""}const lp=["https://overpass-api.de/api/interpreter","https://overpass.kumi.systems/api/interpreter","https://overpass.openstreetmap.fr/api/interpreter"];async function yb(s,t,e){const n=new AbortController,r=setTimeout(()=>n.abort(),e);try{const a=await fetch(`${s}?data=${encodeURIComponent(t)}`,{signal:n.signal});return clearTimeout(r),a.ok?(await a.json()).elements??[]:null}catch{return clearTimeout(r),null}}async function jd(s,t,e=lp){for(const n of e){const r=await yb(n,s,t);if(r!==null)return r}return[]}async function xb(s){const{minLat:t,minLon:e,maxLat:n,maxLon:r}=s,a=`(${t},${e},${n},${r})`,l="motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|residential|living_street",c="pedestrian|footway|path|cycleway|steps",h=`[out:json][timeout:60][maxsize:536870912];
(
  way["natural"="water"]${a};
  relation["natural"="water"]${a};
  way["waterway"="riverbank"]${a};
  relation["waterway"="riverbank"]${a};
  way["waterway"~"^(river|canal|stream|ditch)$"]${a};
  way["landuse"="reservoir"]${a};
  relation["landuse"="reservoir"]${a};
  way["landuse"="basin"]${a};
  way["leisure"~"^(park|garden|pitch|sports_centre)$"]${a};
  relation["leisure"~"^(park|garden)$"]${a};
  way["landuse"~"^(park|recreation_ground|village_green|allotments)$"]${a};
  way["natural"="wood"]${a};
  relation["natural"="wood"]${a};
  way["landuse"="forest"]${a};
  relation["landuse"="forest"]${a};
  way["natural"="scrub"]${a};
  way["natural"="heath"]${a};
  way["natural"="fell"]${a};
  way["natural"="moor"]${a};
  way["natural"="grassland"]${a};
  way["landuse"~"^(meadow|grass|farmland)$"]${a};
  way["natural"="glacier"]${a};
  relation["natural"="glacier"]${a};
  way["natural"="snow"]${a};
  way["natural"="bare_rock"]${a};
  way["natural"="scree"]${a};
  way["natural"="sand"]${a};
  way["natural"="wetland"]${a};
  way["natural"="mud"]${a};
  way["building"]${a};
  relation["building"]["type"="multipolygon"]${a};
  way["highway"~"^(${l})$"]${a};
  node["man_made"="tower"]${a};
  way["man_made"="tower"]${a};
);
out geom qt;`,d=`[out:json][timeout:40][maxsize:268435456];
(
  way["building:part"]["height"]${a};
  way["building:part"]["min_height"]${a};
  way["building:part"]["building:levels"]${a};
  relation["building:part"]["height"]["type"="multipolygon"]${a};
  way["highway"~"^(${c})$"]${a};
);
out geom qt;`,[f,m]=await Promise.all([jd(h,58e3),jd(d,42e3,[lp[0]])]),g=[],_=[],x=[],w=[],y=[];for(const v of f){const N=v.tags;N&&(N.highway&&v.type==="way"&&(v.geometry?.length??0)>=2?y.push({hwType:N.highway,geom:v.geometry}):N.man_made==="tower"?w.push(v):N.building?_.push(v):g.push(v))}for(const v of m)v.tags&&(v.tags["building:part"]?x.push(v):v.tags.highway&&v.type==="way"&&(v.geometry?.length??0)>=2&&y.push({hwType:v.tags.highway,geom:v.geometry}));return{zoneFeatures:g,buildings:_,buildingParts:x,towers:w,roads:y}}function ei(s,t,e){let n=!1;const r=e.length;for(let a=0,l=r-1;a<r;l=a++){const c=e[a][0],h=e[a][1],d=e[l][0],f=e[l][1];h>t!=f>t&&s<(d-c)*(t-h)/(f-h)+c&&(n=!n)}return n}function Mb(s,t,e,n,r,a,l,c,h,d){const{minLat:f,maxLat:m,minLon:g,maxLon:_}=t,x=new ne(qt[fe.buildings??7]??"#888888"),w=[new hn(new H(-1,0,0),l/2),new hn(new H(1,0,0),l/2),new hn(new H(0,0,-1),c/2),new hn(new H(0,0,1),c/2)],y=new Gn({color:x,clippingPlanes:w}),v=[],N=(f+m)/2,b=Math.cos(N*Math.PI/180);for(const A of s){const k=Ui(A);if(!k.length)continue;const I=k[0];if(I.length<3||Wa>0&&zc(A,b)<Wa)continue;const R=parseFloat(A.tags?.height??"0"),U=parseFloat(A.tags?.["building:levels"]??"0")||0,P=l/((_-g)*b*111320),E=R>0?Math.max(Ga,R*P*is):Math.max(Ga,(U>0?U:2)*JM*is);let B=0,q=0;for(const J of I)B+=J.lon,q+=J.lat;const F=(B/I.length-g)/(_-g),X=(q/I.length-f)/(m-f),et=F*l-l/2,K=X*c-c/2;if(Ie){let J=0;for(const at of I){const V=(at.lon-g)/(_-g)*l-l/2,Y=(.5-(at.lat-f)/(m-f))*c;ei(V,Y,Ie)&&J++}if(J<I.length)continue}const Mt=new Co;for(let J=0;J<I.length;J++){const at=(I[J].lon-g)/(_-g),V=(I[J].lat-f)/(m-f),Y=et+(at*l-l/2-et)*Er,dt=K+(V*c-c/2-K)*Er;J===0?Mt.moveTo(Y,dt):Mt.lineTo(Y,dt)}Mt.closePath();const Z=yn(e,n,F,1-X),vt=h+(Z-r)/a*d,G=new Or(Mt,{depth:E,bevelEnabled:!1});G.rotateX(-Math.PI/2);const nt=new Ne(G,y);nt.position.y=vt,v.push(nt)}return v}function cp(s,t,e,n){const r=[],l=(d,f,m)=>{const g=d*n,_=f*n,x=Math.max(m*n,.55);return[[s+g-x,t+_-x],[s+g+x,t+_-x],[s+g+x,t+_+x],[s+g-x,t+_+x]]},c=d=>e+d*n,h=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const[d,f]of h)r.push({b:l(d*46,f*46,9),t:l(d*19,f*19,5.5),zb:c(0),zt:c(57)});r.push({b:l(0,0,33),t:l(0,0,32),zb:c(57),zt:c(64)});for(const[d,f]of h)r.push({b:l(d*18,f*18,5.5),t:l(d*10,f*10,4),zb:c(64),zt:c(115)});return r.push({b:l(0,0,17),t:l(0,0,16),zb:c(115),zt:c(122)}),r.push({b:l(0,0,9),t:l(0,0,4),zb:c(122),zt:c(230)}),r.push({b:l(0,0,4),t:l(0,0,1.6),zb:c(230),zt:c(295)}),r.push({b:l(0,0,1.6),t:l(0,0,.5),zb:c(295),zt:c(324)}),r}function bb(s,t,e){const n=t.length/3;for(const[a,l]of s.b)t.push(a,s.zb,l);for(const[a,l]of s.t)t.push(a,s.zt,l);const r=[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];for(const[a,l,c,h]of r)e.push(n+a,n+l,n+c,n+a,n+c,n+h)}function wb(s){let t="";for(const[e,n]of s.b)t+=`<vertex x="${e.toFixed(3)}" y="${n.toFixed(3)}" z="${s.zb.toFixed(3)}"/>`;for(const[e,n]of s.t)t+=`<vertex x="${e.toFixed(3)}" y="${n.toFixed(3)}" z="${s.zt.toFixed(3)}"/>`;return{vx:t,nv:8}}const Sb=[[0,3,2,1],[4,5,6,7],[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7]];function up(s){const t=e=>{for(const n of e){if(!(n.tags?.name??n.tags?.["name:fr"]??n.tags?.["name:en"]??"").toLowerCase().includes(s))continue;if(n.type==="node"&&n.lat!==void 0&&n.lon!==void 0)return{lon:n.lon,lat:n.lat};const a=Ui(n);if(a.length&&a[0].length){let l=0,c=0;for(const h of a[0])l+=h.lon,c+=h.lat;return{lon:l/a[0].length,lat:c/a[0].length}}}return null};return t(Ar)??t(Xn)??t(Tr)}function Eb(s,t,e,n,r,a,l,c,h,d,f){const{minLat:m,maxLat:g,minLon:_,maxLon:x}=t,w=new ne(qt[fe.buildings??7]??"#888888"),y=[new hn(new H(-1,0,0),l/2),new hn(new H(1,0,0),l/2),new hn(new H(0,0,-1),c/2),new hn(new H(0,0,1),c/2)],v=new Gn({color:w,clippingPlanes:y}),N=[],b=(m+g)/2,A=Math.cos(b*Math.PI/180),k=l/((x-_)*A*111320);for(const I of s){const R=Ui(I);if(!R.length)continue;const U=R[0];if(U.length<3)continue;const P=parseFloat(I.tags?.height??"3"),E=parseFloat(I.tags?.min_height??"0"),B=Math.max(.1,(P-E)*k*is);let q=0,F=0;for(const at of U)q+=at.lon,F+=at.lat;const X=(q/U.length-_)/(x-_),et=(F/U.length-m)/(g-m),K=(X-.5)*l,Mt=(et-.5)*c;if(f){const at=(.5-et)*c;if((K-f.cx)**2+(at-f.cz)**2<f.rMm**2)continue}if(Ie){let at=0;for(const V of U){const Y=(V.lon-_)/(x-_)*l-l/2,dt=(.5-(V.lat-m)/(g-m))*c;ei(Y,dt,Ie)&&at++}if(at<U.length)continue}const Z=new Co;for(let at=0;at<U.length;at++){const V=(U[at].lon-_)/(x-_),Y=(U[at].lat-m)/(g-m),dt=K+(V*l-l/2-K)*Er,gt=Mt+(Y*c-c/2-Mt)*Er;at===0?Z.moveTo(dt,gt):Z.lineTo(dt,gt)}Z.closePath();const vt=yn(e,n,X,1-et),G=h+(vt-r)/a*d+E*k*is,nt=new Or(Z,{depth:B,bevelEnabled:!1});nt.rotateX(-Math.PI/2);const J=new Ne(nt,v);J.position.y=G,N.push(J)}return N}function Tb(s,t,e,n,r,a,l,c,h,d,f){const{minLat:m,maxLat:g,minLon:_,maxLon:x}=t,w=(m+g)/2,y=Math.cos(w*Math.PI/180),v=l/((x-_)*y*111320),N=new ne(qt[fe.buildings??7]??"#888888"),b=new Gn({color:N}),A=[];for(const k of s){if(!k.tags)continue;let I,R;if(k.type==="node"&&k.lat!==void 0&&k.lon!==void 0)I=(k.lon-_)/(x-_),R=(k.lat-m)/(g-m);else{const vt=Ui(k);if(!vt.length)continue;const G=vt[0];if(!G.length)continue;let nt=0,J=0;for(const at of G)nt+=at.lon,J+=at.lat;I=(nt/G.length-_)/(x-_),R=(J/G.length-m)/(g-m)}if(I<0||I>1||R<0||R>1)continue;const U=(I-.5)*l,P=(.5-R)*c;if(Ie&&!ei(U,P,Ie)||(k.tags.name??k.tags["name:fr"]??"").toLowerCase().includes("eiffel")||f&&(U-f.cx)**2+(P-f.cz)**2<f.rMm**2)continue;const B=yn(e,n,I,1-R),q=h+(B-r)/a*d,F=parseFloat(k.tags.height??"30"),X=Math.max(2,F*v),et=Math.max(.5,X*.04),K=et*.4,Mt=new jc(K,et,X,6),Z=new Ne(Mt,b);Z.position.set(U,q+X/2,P),A.push(Z)}return A}function hp(s){return s==="motorway"||s==="motorway_link"?10:s==="trunk"||s==="trunk_link"?8:s==="primary"||s==="primary_link"?6:s==="secondary"||s==="secondary_link"?5:s==="tertiary"||s==="tertiary_link"?4:s==="footway"||s==="path"||s==="cycleway"||s==="steps"||s==="service"||s==="pedestrian"?2:3.5}function Ab(s,t,e,n,r,a,l,c,h,d,f,m){const{minLat:g,maxLat:_,minLon:x,maxLon:w}=n,y=(R,U)=>{const P=Math.max(0,Math.min(1,R/h+.5)),E=Math.max(0,Math.min(1,.5-U/d)),B=yn(r,a,P,1-E);return f+(B-l)/c*m+e},v=[];for(const R of s){const U=(R.lon-x)/(w-x),P=(R.lat-g)/(_-g);if(U<-.02||U>1.02||P<-.02||P>1.02)continue;const E=(U-.5)*h,B=(.5-P)*d;Ie&&!ei(E,B,Ie)||v.push(new H(E,y(E,B),B))}if(v.length<2)return null;const N=1.5,b=[v[0]];for(let R=1;R<v.length;R++){const U=v[R-1],P=v[R],E=P.x-U.x,B=P.z-U.z,q=Math.sqrt(E*E+B*B),F=Math.max(1,Math.round(q/N));for(let X=1;X<=F;X++){const et=X/F,K=U.x+E*et,Mt=U.z+B*et;b.push(new H(K,y(K,Mt),Mt))}}const A=[],k=[];for(let R=0;R<b.length;R++){const U=b[Math.max(0,R-1)],P=b[Math.min(b.length-1,R+1)],E=P.x-U.x,B=P.z-U.z,q=Math.sqrt(E*E+B*B);if(q<1e-9)A.push(b[R].x,b[R].y,b[R].z),A.push(b[R].x,b[R].y,b[R].z);else{const F=-B/q*t,X=E/q*t;A.push(b[R].x-F,b[R].y,b[R].z-X),A.push(b[R].x+F,b[R].y,b[R].z+X)}if(R>0){const F=(R-1)*2;k.push(F,F+2,F+1,F+1,F+2,F+3)}}if(A.length<12)return null;const I=new an;return I.setAttribute("position",new ze(A,3)),I.setIndex(k),I.computeVertexNormals(),I}function Bc(){if(In){Le?.remove(In);const v=on.indexOf(In);v>=0&&on.splice(v,1),In=null}if(!Qt||!Le||!Nn.length)return;const{minE:s,elevRange:t,bounds:e}=Qt,n=rl??Qt.grid,r=On,a=Wn,l=Zn,c=As,h=si,d=(e.minLat+e.maxLat)/2,f=(e.maxLon-e.minLon)*Math.cos(d*Math.PI/180)*111320,m=a/f,g=fe.roads??8,_=new ne(qt[g]??"#262626"),x=new Gn({color:_,side:Vn,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),w=Qc==="raised"?Za:-Za,y=new ji;for(const v of Nn){if(Ie){const k=e;if(!v.geom.some(R=>{const U=(R.lon-k.minLon)/(k.maxLon-k.minLon)*a-a/2,P=(.5-(R.lat-k.minLat)/(k.maxLat-k.minLat))*l;return ei(U,P,Ie)}))continue}const N=hp(v.hwType)*m*cl,b=Math.max(Jc,N)/2,A=Ab(v.geom,b,w,e,n,r,s,t,a,l,c,h);A&&y.add(new Ne(A,x))}y.children.length>0&&(y.visible=ke.roads??!0,Le.add(y),on.push(y),In=y)}function Lb(s,t){Eo=s,Va=t}function Pb(s,t){ll[s]=t,te&&(te.dispose(),te=null)}function Cb(s,t){go=s,Nc=t,te&&(te.dispose(),te=null)}function Kd(s,t){Ki[s]=t,te&&(te.dispose(),te=null)}function dp(s){const t=s.water??"";return["ocean","sea","bay","strait"].includes(t)?"water_ocean":t==="canal"?"water_canal":t==="lake"||!t&&s.natural==="water"?"water_lake":t==="pond"?"water_pond":t==="reservoir"||s.landuse==="reservoir"?"water_reservoir":t==="wastewater"?"water_wastewater":["basin","dock","reflecting_pool","swimming_pool","moat"].includes(t)?"water_human":"water_other"}function Rb(s){const t=s.waterway??"";return t==="river"?Ki.rivers!==!1:t==="canal"?Ki.canals!==!1:t==="stream"||t==="ditch"?(s.name?Ki.streams_named:Ki.streams_unnamed)!==!1:!0}function Ib(s,t,e){let n=!1;for(let r=0,a=e.length-1;r<e.length;a=r++){const l=e[r].lat,c=e[r].lon,h=e[a].lat,d=e[a].lon;l>s!=h>s&&t<(d-c)*(s-l)/(h-l)+c&&(n=!n)}return n}function Ui(s){return s.type==="way"&&s.geometry?[s.geometry]:s.type==="relation"&&s.members?s.members.filter(t=>t.role==="outer"&&t.geometry).map(t=>t.geometry):[]}function Db(s,t,e,n,r,a,l){if(!Va&&Eo===0)return s;const c=new Float32Array(s),h=e.maxLat-e.minLat,d=e.maxLon-e.minLon,f=r>0&&a>0?l/a*r:0;for(const m of n)if(!(!m.tags||!(m.tags.natural==="water"||m.tags.waterway==="riverbank"))&&ll[dp(m.tags)]!==!1)for(const _ of Ui(m)){if(_.length<3)continue;let x=1/0,w=-1/0,y=1/0,v=-1/0;for(const U of _)U.lat<x&&(x=U.lat),U.lat>w&&(w=U.lat),U.lon<y&&(y=U.lon),U.lon>v&&(v=U.lon);const N=Math.max(0,Math.floor((e.maxLat-w)/h*(t-1))),b=Math.min(t-1,Math.ceil((e.maxLat-x)/h*(t-1))),A=Math.max(0,Math.floor((y-e.minLon)/d*(t-1))),k=Math.min(t-1,Math.ceil((v-e.minLon)/d*(t-1))),I=[];let R=1/0;for(let U=N;U<=b;U++){const P=e.maxLat-U/(t-1)*h;for(let E=A;E<=k;E++)if(Ib(P,e.minLon+E/(t-1)*d,_)){const B=U*t+E;I.push(B),c[B]<R&&(R=c[B])}}for(const U of I)Va&&(c[U]=R),c[U]+=Eo*f}return c}function ao(s,t){return s.natural==="wood"?t.lc_forest_detailed===!0:s.landuse==="forest"?t.lc_forest===!0:s.natural==="grassland"||s.landuse==="grass"?t.lc_grass===!0:s.landuse==="meadow"?t.lc_grass_detailed===!0:s.landuse==="farmland"?t.lc_crop===!0:s.natural==="fell"||s.natural==="moor"?t.lc_moss===!0:s.natural==="heath"?t.lc_shrub===!0:s.natural==="scrub"?t.lc_scrub===!0:s.natural==="wetland"?s.wetland==="mangrove"?t.lc_mangrove===!0:t.lc_wetland===!0:s.natural==="mud"?t.lc_wetland_detailed===!0:s.natural==="glacier"?t.lc_glacier===!0:s.natural==="snow"?t.lc_snow===!0:s.natural==="bare_rock"?t.lc_rock===!0:s.natural==="scree"?t.lc_barren===!0:s.natural==="sand"?t.lc_sand===!0||t.lc_desert===!0:!1}const _r=[{id:"veg_low",match:s=>ao(s,Yi.veg_low??{}),slot:3,fill:!0},{id:"veg_dense",match:s=>ao(s,Yi.veg_dense??{}),slot:4,fill:!0},{id:"wetland",match:s=>ao(s,Yi.wetland_lc??{}),slot:3,fill:!0},{id:"snow",match:s=>ao(s,Yi.snow_lc??{}),slot:2,fill:!0},{id:"barren",match:s=>ao(s,Yi.barren_lc??{}),slot:1,fill:!0},{id:"parks",match:s=>s.leisure==="park"||s.leisure==="garden"||s.leisure==="pitch"||s.landuse==="recreation_ground"||s.landuse==="village_green"||s.landuse==="allotments",slot:3,fill:!0},{id:"water",match:s=>s.natural==="water"&&(()=>{const t=dp(s);return t==="water_canal"?Ki.canal_polygons!==!1:ll[t]!==!1})(),slot:5,fill:!0},{id:"reservoir",match:s=>s.landuse==="reservoir"||s.landuse==="basin",slot:5,fill:!0},{id:"river_polygons",match:s=>s.waterway==="riverbank"&&Ki.river_polygons!==!1,slot:5,fill:!0},{id:"waterways",match:s=>!!s.waterway&&s.waterway!=="riverbank"&&Rb(s),slot:5,fill:!1}];function zc(s,t){const e=n=>{if(n.length<3)return 0;let r=0;for(let a=0,l=n.length-1;a<n.length;l=a++)r+=(n[l].lon+n[a].lon)*(n[l].lat-n[a].lat);return Math.abs(r)/2*(t*111320)*111320};return s.type==="way"&&s.geometry?e(s.geometry):s.type==="relation"&&s.members?s.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,r)=>n+e(r.geometry),0):0}function vr(s,t,e,n,r,a,l,c,h,d,f){const m=lb,g=document.createElement("canvas");g.width=g.height=m;const _=g.getContext("2d");_.fillStyle=qt[fe.base??1]??"#c0af88",_.fillRect(0,0,m,m);const x=document.getElementById("cp-filter"),w=x?Number(x.value):100,y=Math.cos((s.minLat+s.maxLat)/2*Math.PI/180),v=(s.maxLon-s.minLon)*y*111320*(s.maxLat-s.minLat)*111320,N=Math.pow(1-w/100,2)*.02*v;for(const A of _r){if(!ke[A.id])continue;const k=a.filter(U=>!U.tags||!A.match(U.tags)?!1:A.fill&&N>0&&A.slot!==5?zc(U,y)>=N:!0);if(!k.length)continue;const I=fe[A.id]??A.slot,R=qt[I]??"#888";if(A.fill){_.beginPath();for(const U of k)_o(_,U,s,m);_.fillStyle=R,_.fill("evenodd")}}for(const A of _r){if(!A.fill||!ke[A.id])continue;const k=a.filter(F=>!F.tags||!A.match(F.tags)?!1:N>0&&A.slot!==5?zc(F,y)>=N:!0);if(!k.length)continue;const I=fe[A.id]??A.slot,R=qt[I]??"#888",U=parseInt(R.replace("#",""),16),P=Math.round((U>>16&255)*.65),E=Math.round((U>>8&255)*.65),B=Math.round((U&255)*.65),q=`rgb(${P},${E},${B})`;_.beginPath();for(const F of k)_o(_,F,s,m);_.strokeStyle=q,_.lineWidth=2.5,_.lineJoin="round",_.stroke()}if((ke.roads??!0)&&d.length>0){const A=fe.roads??8,k=qt[A]??"#262626",I=(s.minLat+s.maxLat)/2,R=Math.cos(I*Math.PI/180),U=(s.maxLon-s.minLon)*R*111320,P=m/U;_.lineCap="round",_.lineJoin="round";for(const E of d){const B=hp(E.hwType)*P*cl,q=Math.max(4,B);_.beginPath();let F=!0;for(const X of E.geom){const et=(X.lon-s.minLon)/(s.maxLon-s.minLon)*m,K=(1-(X.lat-s.minLat)/(s.maxLat-s.minLat))*m;F?(_.moveTo(et,K),F=!1):_.lineTo(et,K)}_.strokeStyle=k,_.lineWidth=q,_.stroke()}}if((ke.buildings??!0)&&f.length>0){const A=fe.buildings??7,k=qt[A]??"#b8b8b8";_.fillStyle=k,_.beginPath();for(const I of f){const R=Ui(I);if(!R.length)continue;const U=R[0];if(!(U.length<3)){for(let P=0;P<U.length;P++){const E=(U[P].lon-s.minLon)/(s.maxLon-s.minLon)*m,B=(1-(U[P].lat-s.minLat)/(s.maxLat-s.minLat))*m;P===0?_.moveTo(E,B):_.lineTo(E,B)}_.closePath()}}_.fill("nonzero")}for(const A of _r){if(A.fill||!ke[A.id])continue;const k=a.filter(U=>U.tags&&A.match(U.tags));if(!k.length)continue;const I=fe[A.id]??A.slot,R=qt[I]??"#888";for(const U of k){if(!U.tags)continue;const P=U.tags.waterway??"",E=(P==="river"?7:P==="canal"?6:P==="stream"?5:4)*go;_.beginPath(),_o(_,U,s,m),_.strokeStyle=R,_.lineWidth=E,_.lineCap="round",_.lineJoin="round",_.stroke()}}const b=new zf(g);return An&&(b.anisotropy=An.capabilities.getMaxAnisotropy()),b}function _o(s,t,e,n){const r=a=>{if(!(!a||a.length<2))for(let l=0;l<a.length;l++){const c=(a[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,h=(1-(a[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?s.moveTo(c,h):s.lineTo(c,h)}};if(t.type==="way"&&t.geometry)r(t.geometry);else if(t.type==="relation"&&t.members)for(const a of t.members)(a.role==="outer"||a.role==="inner")&&a.geometry&&r(a.geometry)}function Nb(s,t,e,n,r){if(!s||s.length<3||t==="rect"||t==="sq")return null;const a=512,l=document.createElement("canvas");l.width=l.height=a;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,a,a),c.fillStyle="white",c.beginPath();for(let h=0;h<s.length;h++){const[d,f]=s[h],m=(f-e.minLon)/(e.maxLon-e.minLon)*a,g=(1-(d-e.minLat)/(e.maxLat-e.minLat))*a;h===0?c.moveTo(m,g):c.lineTo(m,g)}return c.closePath(),c.fill(),new zf(l)}function Ob(s,t,e,n,r){return!s||s.length<3||t==="rect"||t==="sq"?[[-n/2,-r/2],[n/2,-r/2],[n/2,r/2],[-n/2,r/2]]:s.map(([a,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(a-e.minLat)/(e.maxLat-e.minLat))*r-r/2])}function Ub(s,t,e,n,r,a){if(t==="rect"||t==="sq"){const h=new ki(e+a*2,r,n+a*2);return h.translate(0,r/2,0),h}const l=new Co;if(t==="circ"){const h=e/2+a,d=n/2+a;for(let f=0;f<=64;f++){const m=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(m)*h,Math.sin(m)*d):l.lineTo(Math.cos(m)*h,Math.sin(m)*d)}}else{l.moveTo(s[0][0],s[0][1]);for(let h=1;h<s.length;h++)l.lineTo(s[h][0],s[h][1]);l.closePath()}const c=new Or(l,{depth:r,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function kb(s,t,e,n,r,a,l,c,h,d,f,m,g){const _=(w,y)=>{const v=Math.max(0,Math.min(1,(w+e/2)/e)),N=Math.max(0,Math.min(1,(y+n/2)/n)),b=v*(h-1),A=N*(h-1),k=Math.min(h-2,Math.floor(b)),I=Math.min(h-2,Math.floor(A)),R=b-k,U=A-I,P=c[I*h+k]*(1-R)*(1-U)+c[I*h+k+1]*R*(1-U)+c[(I+1)*h+k]*(1-R)*U+c[(I+1)*h+k+1]*R*U;return m+(P-d)/f*g};return t==="rect"||t==="sq"?a?Fb(e,n,r,l):Bb(e,n,r,h,c,d,f,m,g):zb(s,r,a?()=>l:_)}function Fb(s,t,e,n){const r=(a,l,c,h,d)=>{const f=new Ne(new ki(a,l,c));return f.position.set(h,l/2,d),f};return[r(s+e*2,n,e,0,t/2+e/2),r(s+e*2,n,e,0,-t/2-e/2),r(e,n,t,s/2+e/2,0),r(e,n,t,-s/2-e/2,0)]}function Bb(s,t,e,n,r,a,l,c,h){const d=(N,b)=>c+(r[b*n+N]-a)/l*h,f=Math.min(n-1,64),m=N=>Math.round(N/f*(n-1)),g=d(0,n-1),_=d(n-1,n-1),x=d(0,0),w=d(n-1,0),y=[[-s/2-e,t/2,g],...Array.from({length:f+1},(N,b)=>{const A=m(b);return[-s/2+A/(n-1)*s,t/2,d(A,n-1)]}),[s/2+e,t/2,_]],v=[[s/2+e,-t/2,w],...Array.from({length:f+1},(N,b)=>{const A=m(b);return[s/2-A/(n-1)*s,-t/2,d(n-1-A,0)]}),[-s/2-e,-t/2,x]];return[co(y,[0,0,1],e),co(v,[0,0,-1],e),co(Array.from({length:f+1},(N,b)=>{const A=m(b);return[s/2,t/2-A/(n-1)*t,d(n-1,n-1-A)]}),[1,0,0],e),co(Array.from({length:f+1},(N,b)=>{const A=m(b);return[-s/2,-t/2+A/(n-1)*t,d(0,A)]}),[-1,0,0],e)]}function zb(s,t,e){const n=[],r=s.length;for(let a=0;a<r;a++){const[l,c]=s[a],[h,d]=s[(a+1)%r],f=h-l,m=d-c,g=Math.sqrt(f*f+m*m);if(g<.5)continue;const _=m/g,x=-f/g,w=Math.max(2,Math.round(g/3)),y=[];for(let v=0;v<=w;v++){const N=v/w,b=l+f*N,A=c+m*N;y.push([b,A,e(b,A)])}n.push(co(y,[_,0,x],t))}return n}function co(s,t,e){const n=s.length,[r,,a]=t,l=[],c=[];for(const[_,x,w]of s)l.push(_+r*e,0,x+a*e),l.push(_+r*e,w,x+a*e);for(const[_,x,w]of s)l.push(_,0,x),l.push(_,w,x);for(const[_,x,w]of s)l.push(_+r*e,w,x+a*e),l.push(_,w,x);for(const[_,x]of s)l.push(_+r*e,0,x+a*e),l.push(_,0,x);const h=0,d=n*2,f=n*4,m=n*6;for(let _=0;_<n-1;_++){const x=_*2;c.push(h+x,h+x+2,h+x+1,h+x+1,h+x+2,h+x+3),c.push(d+x,d+x+1,d+x+2,d+x+1,d+x+3,d+x+2),c.push(f+x,f+x+1,f+x+2,f+x+1,f+x+3,f+x+2),c.push(m+x,m+x+2,m+x+1,m+x+1,m+x+2,m+x+3)}const g=new an;return g.setAttribute("position",new ze(l,3)),g.setIndex(c),g.computeVertexNormals(),new Ne(g)}async function Hb(s){const t=`${s.minLat}|${s.maxLat}|${s.minLon}|${s.maxLon}`;if(t===$d)return;const e=`(${s.minLat},${s.minLon},${s.maxLat},${s.maxLon})`,n=`[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${e};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${e};
  way["piste:type"]${e};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${e};
);
out geom;`,r=new AbortController,a=setTimeout(()=>r.abort(),45e3);let l;try{const h=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(n)}`,{signal:r.signal});clearTimeout(a),l=await h.json()}catch(h){throw clearTimeout(a),h}for(const h of Object.keys(lr))delete lr[h];const c=(h,d)=>{lr[h]||(lr[h]=[]),lr[h].push(d)};for(const h of l.elements)if(h.type==="way"){const d=h.tags??{},f=h.geometry??[];if(f.length<2)continue;if(d.highway){const g={motorway:"road_motorway",motorway_link:"road_motorway",trunk:"road_trunk",trunk_link:"road_trunk",primary:"road_primary",primary_link:"road_primary",secondary:"road_secondary",secondary_link:"road_secondary",tertiary:"road_tertiary",tertiary_link:"road_tertiary",unclassified:"road_unclassified",living_street:"street_living",residential:"street_residential"}[d.highway];g&&c(g,f)}d.railway&&c({narrow_gauge:"rail_narrow",rail:"rail_standard",light_rail:"rail_light",funicular:"rail_funicular",monorail:"rail_monorail",tram:"rail_tram",subway:"rail_subway"}[d.railway]??"rail_unknown",f),d["piste:type"]&&c({easy:"piste_easy",novice:"piste_novice",intermediate:"piste_intermediate",advanced:"piste_advanced",expert:"piste_expert",freeride:"piste_freeride"}[d["piste:difficulty"]??""]??"piste_other",f)}else if(h.type==="relation"){const d=h.tags??{},f=d.route??"",m=d.network??"",g=(h.members??[]).filter(y=>y.type==="way"&&(y.geometry?.length??0)>=2).map(y=>y.geometry);if(!g.length)continue;const x={hiking:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},foot:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},bicycle:{icn:"cycling_icn",ncn:"cycling_ncn",rcn:"cycling_rcn",lcn:"cycling_lcn"},mtb:{"":"mtb_local"},horse:{ihwn:"equestrian_iwn",nhwn:"equestrian_nwn",rhwn:"equestrian_rwn",lhwn:"equestrian_lwn"}}[f];if(!x)continue;let w;if(f==="mtb"){const y=d["mtb:scale"]??"";w=y?`mtb_${y}`:"mtb_local"}else w=x[m]??Object.values(x).at(-1);for(const y of g)c(w,y)}$d=t,eu()}function Jd(s,t){Xa[s]=t,eu()}function eu(){if(pi){Le?.remove(pi);const f=on.indexOf(pi);f>=0&&on.splice(f,1),pi=null}if(!Qt||!Le)return;const{grid:s,minE:t,elevRange:e,bounds:n}=Qt,r=On,a=Wn,l=Zn,c=As,h=si,d=new ji;for(const[f,m]of Object.entries(lr)){if(Xa[f]===!1)continue;const g=Vb(f),_=new el({color:g});for(const x of m){const w=[];for(const y of x){const v=(y.lon-n.minLon)/(n.maxLon-n.minLon),N=(y.lat-n.minLat)/(n.maxLat-n.minLat);if(v<0||v>1||N<0||N>1)continue;const b=(v-.5)*a,A=(.5-N)*l,k=v*(r-1),I=(1-N)*(r-1),R=Math.min(r-2,Math.floor(k)),U=Math.min(r-2,Math.floor(I)),P=k-R,E=I-U,B=s[U*r+R]*(1-P)*(1-E)+s[U*r+R+1]*P*(1-E)+s[(U+1)*r+R]*(1-P)*E+s[(U+1)*r+R+1]*P*E;w.push(new H(b,c+(B-t)/e*h+.6,A))}w.length>=2&&d.add(new qc(new an().setFromPoints(w),_))}}d.children.length>0&&(Le.add(d),on.push(d),pi=d)}function Vb(s){return s.startsWith("road_motorway")?14820122:s.startsWith("road_trunk")?15041054:s.startsWith("road_primary")?16110375:s.startsWith("road_secondary")?13951528:s.startsWith("road_tertiary")?11184810:s.startsWith("road_")?13421772:s.startsWith("street_")?14540253:s.startsWith("rail_")?5592439:s.startsWith("hiking_")?16737792:s.startsWith("cycling_")?26316:s.startsWith("mtb_")?8930304:s.startsWith("equestrian_")?10053171:s.startsWith("piste_easy")?43775:s.startsWith("piste_novice")?52292:s.startsWith("piste_intermediate")?13378082:s.startsWith("piste_")?2236962:8947848}function Gb(s,t){const e=new Co;switch(s){case"square":e.moveTo(-t,-t),e.lineTo(t,-t),e.lineTo(t,t),e.lineTo(-t,t),e.closePath();break;case"diamond":e.moveTo(0,-t),e.lineTo(t*.72,0),e.lineTo(0,t),e.lineTo(-t*.72,0),e.closePath();break;case"triangle":e.moveTo(0,t),e.lineTo(t*.866,-t*.5),e.lineTo(-t*.866,-t*.5),e.closePath();break;case"cross":{const n=t*.32;e.moveTo(-n,-t),e.lineTo(n,-t),e.lineTo(n,-n),e.lineTo(t,-n),e.lineTo(t,n),e.lineTo(n,n),e.lineTo(n,t),e.lineTo(-n,t),e.lineTo(-n,n),e.lineTo(-t,n),e.lineTo(-t,-n),e.lineTo(-n,-n),e.closePath();break}case"heart":{e.moveTo(0,-t*.25),e.bezierCurveTo(-t*.05,-t*.55,-t,-t*.55,-t,t*.1),e.bezierCurveTo(-t,t*.65,-t*.45,t*.88,0,t),e.bezierCurveTo(t*.45,t*.88,t,t*.65,t,t*.1),e.bezierCurveTo(t,-t*.55,t*.05,-t*.55,0,-t*.25),e.closePath();break}case"star":{const n=t,r=t*.42;for(let a=0;a<10;a++){const l=a*Math.PI/5-Math.PI/2,c=a%2===0?n:r,h=Math.cos(l)*c,d=Math.sin(l)*c;a===0?e.moveTo(h,d):e.lineTo(h,d)}e.closePath();break}default:e.absarc(0,0,t,0,Math.PI*2,!1);break}return e}function yn(s,t,e,n){const r=Math.max(0,Math.min(t-2,e*(t-1))),a=Math.max(0,Math.min(t-2,n*(t-1))),l=Math.floor(r),c=Math.floor(a),h=r-l,d=a-c;return s[c*t+l]*(1-h)*(1-d)+s[c*t+l+1]*h*(1-d)+s[(c+1)*t+l]*(1-h)*d+s[(c+1)*t+l+1]*h*d}function nu(s,t){if(!Qt||!Le)return;const{grid:e,minE:n,elevRange:r}=Qt,a=On,l=Wn,c=Zn,h=As,d=si,f=.42,m=.2,g=s.diameterMult*f/2,_=.5,x=s.heightOffMult*m,w=s.lonFrac,y=1-s.latFrac,v=(w-.5)*l,N=(.5-(1-y))*c;let b;if(s.flatTop){let E=-1/0;const B=8;for(let q=0;q<=B;q++)for(let F=0;F<=B;F++){const X=q/B,et=F/B,K=w+(X-.5)*(g*2)/l,Mt=y+(et-.5)*(g*2)/c,Z=Math.max(0,Math.min(1,K)),vt=Math.max(0,Math.min(1,Mt)),G=yn(e,a,Z,vt);G>E&&(E=G)}b=h+(E-n)/r*d}else{const E=yn(e,a,w,y);b=h+(E-n)/r*d}const A=fe.gpx??6,k=qt[A]??"#ff4500",I=new Gn({color:k,side:Vn}),R=Gb(s.shape,g),U=new Or(R,{depth:_,bevelEnabled:!1});U.rotateX(-Math.PI/2),s.rotDeg!==0&&U.rotateY(s.rotDeg*Math.PI/180);const P=new Ne(U,I);P.position.set(v,b+x,N),P.visible=s.visible&&(ke.gpx??!0),Io.set(P,s.id),t>=ii.length?(ui(P),ii.push(P)):(Le.add(P),on.push(P),ii.splice(t,0,P))}function vo(s,t,e,n,r,a,l,c,h,d,f){const m=Math.max(0,Math.min(1,s/e+.5)),g=Math.max(0,Math.min(1,.5-t/n)),_=m*(a-1),x=(1-g)*(a-1),w=Math.min(a-2,Math.floor(_)),y=Math.min(a-2,Math.floor(x)),v=_-w,N=x-y,b=r[y*a+w]*(1-v)*(1-N)+r[y*a+w+1]*v*(1-N)+r[(y+1)*a+w]*(1-v)*N+r[(y+1)*a+w+1]*v*N;return h+(b-l)/c*d+f}function Wb(s,t,e,n,r,a,l,c,h,d){const m=Dc*.21+.05+tp*.2,g=[];for(const N of s){const b=Math.max(5e-4,Math.min(.9995,(N.lon-t.minLon)/(t.maxLon-t.minLon))),A=Math.max(5e-4,Math.min(.9995,(N.lat-t.minLat)/(t.maxLat-t.minLat))),k=(b-.5)*e,I=(.5-A)*n;g.push(new H(k,vo(k,I,e,n,r,a,l,c,h,d,m),I))}if(g.length<2)return null;const _=1,x=[g[0]];for(let N=0;N<g.length-1;N++){const b=g[N],A=g[N+1],k=A.x-b.x,I=A.z-b.z,R=Math.sqrt(k*k+I*I),U=Math.max(1,Math.floor(R/_));for(let P=1;P<=U;P++){const E=P/U,B=b.x+k*E,q=b.z+I*E,F=vo(B,q,e,n,r,a,l,c,h,d,m),X=new H(B,F,q);X.distanceTo(x[x.length-1])>=.08&&x.push(X)}}if(x.length<2)return null;const w=fe.gpx_line??6,y=qt[w]??"#ff4500",v=Dc*.21;if(v>=.1){const N=new za(x,!1,"centripetal"),b=Math.min(2e3,Math.max(80,x.length*5)),A=N.getSpacedPoints(b);for(const I of A){const R=vo(I.x,I.z,e,n,r,a,l,c,h,d,m-v);I.y<R&&(I.y=R)}const k=new il(new za(A,!1,"centripetal"),b,v,8,!1);return new Ne(k,new Gn({color:y}))}return new qc(new an().setFromPoints(x),new el({color:y}))}async function Zb(s){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=r=>{r.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:r.data.elevGrid,minE:r.data.minE,elevRange:r.data.elevRange,bounds:s})):r.data.type==="ERROR"&&(n.terminate(),e(new Error(r.data.message)))},n.onerror=r=>{n.terminate(),e(r)},n.postMessage({type:"BUILD_TERRAIN",bounds:s,GRID:On,elevZoom:12})})}function ui(s){Le.add(s),on.push(s)}function rr(s,t){const e=document.getElementById(s);e&&(e.textContent=t)}function Xb(){on.forEach(s=>{Le.remove(s),s.geometry?.dispose()}),on=[],fr.length=0}function qb(){if(!xn||!An)return;const s=An.domElement.clientWidth,t=An.domElement.clientHeight;if(!(!s||!t))for(const{id:e,v:n}of fr){const r=document.getElementById(e);if(!r)continue;const a=n.clone().project(xn);if(a.z>1){r.style.opacity="0";continue}r.style.opacity="1",r.style.left=`${(a.x+1)/2*s}px`,r.style.top=`${-(a.y-1)/2*t}px`}}let mi=null,yo=!1;function $b(s){if(!te)return null;try{const e=Math.min(s*4,2048),n=e/s,r=document.createElement("canvas");r.width=r.height=e;const a=r.getContext("2d");a.drawImage(te.image,0,0,e,e);const l=a.getImageData(0,0,e,e).data,c=qt[fe.base??1]??"#c0af88",h=parseInt(c.replace("#",""),16),d=h>>16&255,f=h>>8&255,m=h&255,g=qt[fe.roads??8]??"#262626",_=parseInt(g.replace("#",""),16),x=_>>16&255,w=_>>8&255,y=_&255,v=new Uint8ClampedArray(s*s*4);for(let A=0;A<s;A++){const k=Math.floor(A*n),I=Math.min(Math.ceil((A+1)*n),e);for(let R=0;R<s;R++){const U=Math.floor(R*n),P=Math.min(Math.ceil((R+1)*n),e);let E=0,B=0,q=0,F=0,X=0,et=0,K=0,Mt=!1,Z=0,vt=0,G=0,nt=0;for(let dt=k;dt<I;dt++)for(let gt=U;gt<P;gt++){const wt=(dt*e+gt)*4,Tt=l[wt],Pt=l[wt+1],$=l[wt+2];if(!((Tt-x)**2+(Pt-w)**2+($-y)**2<1500)&&(E+=Tt,B+=Pt,q+=$,F++,!Mt&&$>Tt+25&&$>Pt+25&&$>70&&(X=Tt,et=Pt,K=$,Mt=!0),!Mt)){const st=(Tt-d)**2+(Pt-f)**2+($-m)**2;st>600&&st>nt&&(nt=st,Z=Tt,vt=Pt,G=$)}}F===0&&(E=d,B=f,q=m,F=1);const J=(A*s+R)*4,at=Mt?X:nt>0?Z:E/F,V=Mt?et:nt>0?vt:B/F,Y=Mt?K:nt>0?G:q/F;v[J]=at,v[J+1]=V,v[J+2]=Y,v[J+3]=255}}const N=new Uint8Array(s*s);for(let A=0;A<s*s;A++){const k=v[A*4+2],I=v[A*4],R=v[A*4+1];k>I+25&&k>R+25&&k>70&&(N[A]=1)}const b=[[-1,0],[1,0],[0,-1],[0,1]];for(let A=0;A<1;A++){const k=new Uint8Array(s*s);for(let I=0;I<s;I++)for(let R=0;R<s;R++){if(!N[I*s+R])continue;const U=(I*s+R)*4;for(const[P,E]of b){const B=I+P,q=R+E;if(B<0||B>=s||q<0||q>=s||N[B*s+q])continue;const F=(B*s+q)*4,X=v[F],et=v[F+1],K=v[F+2];(X-x)**2+(et-w)**2+(K-y)**2<1500||(v[F]=v[U],v[F+1]=v[U+1],v[F+2]=v[U+2],k[B*s+q]=1)}}for(let I=0;I<s*s;I++)k[I]&&(N[I]=1)}return v}catch{return null}}function Yb(s,t,e,n,r,a,l,c,h,d){const f=new ji,m=fe.roads??8,g=qt[m]??"#262626",_=.21,x=_+.05,w=new Gn({color:g});for(const y of s){if(!y.geom||y.geom.length<2)continue;const v=y.geom.map(A=>{const k=Math.max(5e-4,Math.min(.9995,(A.lon-t.minLon)/(t.maxLon-t.minLon))),I=Math.max(5e-4,Math.min(.9995,(A.lat-t.minLat)/(t.maxLat-t.minLat))),R=(k-.5)*e,U=(.5-I)*n;return new H(R,vo(R,U,e,n,r,a,l,c,h,d,x),U)}),N=2,b=[v[0]];for(let A=0;A<v.length-1;A++){const k=v[A],I=v[A+1],R=I.x-k.x,U=I.z-k.z,P=Math.sqrt(R*R+U*U),E=Math.max(1,Math.floor(P/N));for(let B=1;B<=E;B++){const q=B/E,F=k.x+R*q,X=k.z+U*q,et=vo(F,X,e,n,r,a,l,c,h,d,x),K=new H(F,et,X);K.distanceTo(b[b.length-1])>=.1&&b.push(K)}}if(!(b.length<2))try{const A=new za(b,!1,"centripetal"),k=Math.min(200,b.length*3),I=new il(A,k,_,5,!1);f.add(new Ne(I,w))}catch{}}return f}function Ca(s=.2){if(!Le||!Je||!Qt)return;const t=Math.max(.01,s),e=Wn,n=Zn,r=As,a=si,{minE:l,elevRange:c}=Qt,h=On,d=rl??Qt.grid,f=Math.min(700,Math.max(150,Math.round(Math.max(e,n)/.33))),m=e/f,g=n/f,_=$b(f),x=new ne(qt[fe.veg_low??3]??"#8ab858");To(),yo=!0;const w=f*f,y=new ki(m,1,g),v=new Gn({color:16777215}),N=new Qx(y,v,w),b=new en,A=new ne;for(let k=0,I=0;k<f;k++)for(let R=0;R<f;R++,I++){const U=(R+.5)/f,P=(k+.5)/f,E=(U-.5)*e,B=(.5-P)*n;if(Ie&&!ei(E,B,Ie)){b.scale.setScalar(0),b.position.set(E,r,B),b.updateMatrix(),N.setMatrixAt(I,b.matrix),b.scale.setScalar(1);continue}const q=yn(d,h,U,1-P);let F=(q-l)/c*a,X=0,et=0,K=0,Mt=!1;if(_){const vt=((f-1-k)*f+R)*4;if(X=_[vt],et=_[vt+1],K=_[vt+2],Mt=K>X+25&&K>et+25&&K>70,Mt)for(const[G,nt]of[[-1,0],[1,0],[0,-1],[0,1]]){const J=k+G,at=R+nt;if(J<0||J>=f||at<0||at>=f)continue;const V=((f-1-J)*f+at)*4,Y=_[V+2],dt=_[V],gt=_[V+1];if(Y>dt+25&&Y>gt+25&&Y>70){const wt=(at+.5)/f,Tt=(J+.5)/f;F=Math.min(F,(yn(d,h,wt,1-Tt)-l)/c*a)}}}const Z=Math.max(t,Math.ceil(F/t)*t-(Mt?2*t:0));if(b.position.set(E,r+Z/2,B),b.scale.set(1,Z,1),b.updateMatrix(),N.setMatrixAt(I,b.matrix),_&&!Mt){const vt=1/f,G=yn(d,h,Math.min(.9999,U+vt),1-P),nt=yn(d,h,U,1-Math.min(.9999,P+vt)),J=(G-q)*a/c/(e/f),at=(nt-q)*a/c/(n/f),V=Math.max(.7,Math.min(1.3,1+J*.5-at*.35));A.setRGB(Math.min(1,X/255*V),Math.min(1,et/255*V),Math.min(1,K/255*V))}else _?A.setRGB(X/255,et/255,K/255):A.copy(x);N.setColorAt(I,A)}if(N.instanceMatrix.needsUpdate=!0,N.instanceColor&&(N.instanceColor.needsUpdate=!0),mi=new ji,mi.add(N),(ke.roads??!0)&&Nn.length>0&&Qt){const k=Qt.bounds,I=Yb(Nn,k,e,n,d,h,l,c,r,a);mi.add(I)}Le.add(mi),on.push(mi),Je.visible=!1;for(const k of ol)k.visible=!1;In&&(In.visible=!1),pi&&(pi.visible=!1)}function jb(s){if(!Qt)return null;const{bounds:t}=Qt,e=s,n=document.createElement("canvas");n.width=n.height=e;const r=n.getContext("2d",{willReadFrequently:!0});r.fillStyle=qt[fe.base??1]??"#c0af88",r.fillRect(0,0,e,e);for(const g of _r){if(!g.fill||!ke[g.id])continue;const _=(_i??[]).filter(w=>w.tags&&g.match(w.tags));if(!_.length)continue;const x=qt[fe[g.id]??g.slot]??"#888";r.fillStyle=x,r.beginPath();for(const w of _)_o(r,w,t,e);r.fill("evenodd")}if((ke.buildings??!0)&&Xn.length>0){r.fillStyle=qt[fe.buildings??7]??"#b8b8b8",r.beginPath();for(const g of Xn){const _=Ui(g);if(!_.length)continue;const x=_[0];if(!(x.length<3)){for(let w=0;w<x.length;w++){const y=(x[w].lon-t.minLon)/(t.maxLon-t.minLon)*e,v=(1-(x[w].lat-t.minLat)/(t.maxLat-t.minLat))*e;w===0?r.moveTo(y,v):r.lineTo(y,v)}r.closePath()}}r.fill("nonzero")}for(const g of _r){if(g.fill||!(ke[g.id]??!0))continue;const _=(_i??[]).filter(w=>w.tags&&g.match(w.tags));if(!_.length)continue;const x=qt[fe[g.id]??g.slot]??"#888";for(const w of _){if(!w.tags)continue;const v=(w.tags.waterway??"")==="river"?2:1;r.beginPath(),_o(r,w,t,e),r.strokeStyle=x,r.lineWidth=v,r.lineCap="round",r.lineJoin="round",r.stroke()}}if((ke.roads??!0)&&Nn.length>0){r.strokeStyle=qt[fe.roads??8]??"#262626",r.lineWidth=3,r.lineCap="round",r.lineJoin="round";for(const g of Nn){r.beginPath();let _=!0;for(const x of g.geom){const w=(x.lon-t.minLon)/(t.maxLon-t.minLon)*e,y=(1-(x.lat-t.minLat)/(t.maxLat-t.minLat))*e;_?(r.moveTo(w,y),_=!1):r.lineTo(w,y)}r.stroke()}}if((ke.gpx??!0)&&Pa.length>=2){r.strokeStyle=qt[fe.gpx??6]??"#ff4500",r.lineWidth=4,r.lineCap="round",r.lineJoin="round",r.beginPath();for(let g=0;g<Pa.length;g++){const _=Pa[g],x=(_.lon-t.minLon)/(t.maxLon-t.minLon)*e,w=(1-(_.lat-t.minLat)/(t.maxLat-t.minLat))*e;g===0?r.moveTo(x,w):r.lineTo(x,w)}r.stroke()}const a=r.getImageData(0,0,e,e).data,l=parseInt((qt[fe.base??1]??"#c0af88").replace("#",""),16),c=l>>16&255,h=l>>8&255,d=l&255,f=new Uint8ClampedArray(a),m=new Uint8Array(e*e);for(let g=0;g<e*e;g++)(a[g*4]-c)**2+(a[g*4+1]-h)**2+(a[g*4+2]-d)**2>400&&(m[g]=1);for(let g=0;g<e;g++)for(let _=0;_<e;_++){if(!m[g*e+_])continue;const x=(g*e+_)*4;for(const[w,y]of[[-1,0],[1,0],[0,-1],[0,1]]){const v=g+w,N=_+y;if(v<0||v>=e||N<0||N>=e||m[v*e+N])continue;const b=(v*e+N)*4;f[b]=a[x],f[b+1]=a[x+1],f[b+2]=a[x+2]}}return f}async function Kb(s){if(!Qt||!te){alert(`Ouvrez d'abord l'onglet "Aperçu" pour générer la prévisualisation.`);return}const t=.2,e=Wn,n=Zn,r=As,a=si,{minE:l,elevRange:c}=Qt,h=On,d=rl??Qt.grid,f=Math.min(300,Math.max(80,Math.round(Math.max(e,n)/.67))),m=e/f,g=n/f,_=jb(f);function x(G,nt,J){let at=1,V=1/0;for(const[Y,dt]of Object.entries(qt)){const gt=new ne(dt),wt=(gt.r-G/255)**2+(gt.g-nt/255)**2+(gt.b-J/255)**2;wt<V&&(V=wt,at=Number(Y))}return at}const w=new Map,y=new Map;for(let G=0;G<f;G++)for(let nt=0;nt<f;nt++){const J=(nt+.5)/f,at=(G+.5)/f,V=(J-.5)*e,Y=(.5-at)*n;if(Ie&&!ei(V,Y,Ie))continue;const gt=(yn(d,h,J,1-at)-l)/c*a,wt=((f-1-G)*f+nt)*4;let Tt=1;if(_){const st=_[wt],tt=_[wt+1],ot=_[wt+2];Tt=x(st,tt,ot)}const Pt=Math.max(t,Math.ceil(gt/t)*t),$=`${nt},${G}`;w.set($,{slot:Tt,h:Pt}),y.has(Tt)||y.set(Tt,new Map),y.get(Tt).set($,Pt)}function v(G,nt){let J="",at="",V=0;function Y(dt,gt,wt,Tt,Pt,$,st,tt,ot,rt,mt,D){J+=`<vertex x="${dt.toFixed(3)}" y="${gt.toFixed(3)}" z="${wt.toFixed(3)}"/><vertex x="${Tt.toFixed(3)}" y="${Pt.toFixed(3)}" z="${$.toFixed(3)}"/><vertex x="${st.toFixed(3)}" y="${tt.toFixed(3)}" z="${ot.toFixed(3)}"/><vertex x="${rt.toFixed(3)}" y="${mt.toFixed(3)}" z="${D.toFixed(3)}"/>`,at+=`<triangle v1="${V}" v2="${V+1}" v3="${V+2}"/><triangle v1="${V}" v2="${V+2}" v3="${V+3}"/>`,V+=4}for(const[dt,gt]of nt){const[wt,Tt]=dt.split(",").map(Number),Pt=(wt+.5)/f,$=(Tt+.5)/f,st=(Pt-.5)*e,tt=(.5-$)*n,ot=st-m/2,rt=st+m/2,mt=tt-g/2,D=tt+g/2,T=r,W=r+gt;Y(ot,mt,W,rt,mt,W,rt,D,W,ot,D,W),Y(ot,D,T,rt,D,T,rt,mt,T,ot,mt,T);const it=w.get(`${wt+1},${Tt}`);if(!it||it.slot!==G)Y(rt,mt,T,rt,D,T,rt,D,W,rt,mt,W);else if(it.h<gt){const yt=r+it.h;Y(rt,mt,yt,rt,D,yt,rt,D,W,rt,mt,W)}const ct=w.get(`${wt-1},${Tt}`);if(!ct||ct.slot!==G)Y(ot,D,T,ot,mt,T,ot,mt,W,ot,D,W);else if(ct.h<gt){const yt=r+ct.h;Y(ot,D,yt,ot,mt,yt,ot,mt,W,ot,D,W)}const _t=w.get(`${wt},${Tt-1}`);if(!_t||_t.slot!==G)Y(rt,D,T,ot,D,T,ot,D,W,rt,D,W);else if(_t.h<gt){const yt=r+_t.h;Y(rt,D,yt,ot,D,yt,ot,D,W,rt,D,W)}const Ot=w.get(`${wt},${Tt+1}`);if(!Ot||Ot.slot!==G)Y(ot,mt,T,rt,mt,T,rt,mt,W,ot,mt,W);else if(Ot.h<gt){const yt=r+Ot.h;Y(ot,mt,yt,rt,mt,yt,rt,mt,W,ot,mt,W)}}return{vx:J,tr:at}}if(!y.size){alert("Aucune donnée à exporter.");return}const N=[];let b=1;{let G=function($,st,tt,ot,rt,mt,D,T,W,it,ct,_t){dt+=`<vertex x="${$.toFixed(3)}" y="${st.toFixed(3)}" z="${tt.toFixed(3)}"/><vertex x="${ot.toFixed(3)}" y="${rt.toFixed(3)}" z="${mt.toFixed(3)}"/><vertex x="${D.toFixed(3)}" y="${T.toFixed(3)}" z="${W.toFixed(3)}"/><vertex x="${it.toFixed(3)}" y="${ct.toFixed(3)}" z="${_t.toFixed(3)}"/>`,gt+=`<triangle v1="${wt}" v2="${wt+1}" v3="${wt+2}"/><triangle v1="${wt}" v2="${wt+2}" v3="${wt+3}"/>`,wt+=4};const nt=-e/2,J=e/2,at=-n/2,V=n/2,Y=r;let dt="",gt="",wt=0;G(nt,at,Y,J,at,Y,J,V,Y,nt,V,Y),G(nt,V,0,J,V,0,J,at,0,nt,at,0),G(J,at,0,J,V,0,J,V,Y,J,at,Y),G(nt,V,0,nt,at,0,nt,at,Y,nt,V,Y),G(J,V,0,nt,V,0,nt,V,Y,J,V,Y),G(nt,at,0,J,at,0,J,at,Y,nt,at,Y);const Tt=fe.base??1,Pt=(qt[Tt]??"#c0af88").replace("#","");N.push({id:b++,slot:Tt,name:"base_plate",col:Pt,vx:dt,tr:gt})}const A={1:"terrain_nu",2:"neige",3:"vegetation_basse",4:"vegetation_dense",5:"eau",6:"gpx",7:"batiments",8:"routes"};for(const[G,nt]of y){if(nt.size<5)continue;const{vx:J,tr:at}=v(G,nt),V=A[G]??`couche_${G}`;at&&N.push({id:b++,slot:G,name:V,col:(qt[G]??"#888888").replace("#",""),vx:J,tr:at})}if(Qt){let G=function(st){let tt="",ot="",rt=0;for(const mt of st){const{vx:D,nv:T}=wb(mt);tt+=D;for(const[W,it,ct,_t]of Sb)ot+=`<triangle v1="${rt+W}" v2="${rt+it}" v3="${rt+ct}"/><triangle v1="${rt+W}" v2="${rt+ct}" v3="${rt+_t}"/>`;rt+=T}return{vx:tt,tr:ot}};const{minLat:nt,maxLat:J,minLon:at,maxLon:V}=Qt.bounds,Y=(nt+J)/2,dt=Math.cos(Y*Math.PI/180),gt=e/((V-at)*dt*111320),wt=fe.buildings??7,Tt=(qt[wt]??"#888888").replace("#","");let Pt=null;const $=up("eiffel");if($){const st=($.lon-at)/(V-at),tt=($.lat-nt)/(J-nt);if(st>=0&&st<=1&&tt>=0&&tt<=1){const ot=(st-.5)*e,rt=(.5-tt)*n;if(!Ie||ei(ot,rt,Ie)){const mt=yn(d,h,st,1-tt),D=r+(mt-l)/c*a,{vx:T,tr:W}=G(cp(ot,rt,D,gt));W&&N.push({id:b++,slot:wt,name:"tour_eiffel",col:Tt,vx:T,tr:W}),Pt={cx:ot,cz:rt,rMm:90*gt}}}}if(Tr.length>0){let st="",tt="",ot=0;for(const rt of Tr){const mt=Ui(rt);if(!mt.length)continue;const D=mt[0];if(D.length<3)continue;let T=0,W=0;for(const zt of D)T+=zt.lon,W+=zt.lat;const it=(T/D.length-at)/(V-at),ct=(W/D.length-nt)/(J-nt),_t=(it-.5)*e,Ot=(.5-ct)*n;if(Pt&&(_t-Pt.cx)**2+(Ot-Pt.cz)**2<Pt.rMm**2)continue;let yt=!0;const At=[];for(const zt of D){const ee=(zt.lon-at)/(V-at)*e-e/2,ue=(.5-(zt.lat-nt)/(J-nt))*n;At.push([ee,ue]),Ie&&!ei(ee,ue,Ie)&&(yt=!1)}if(!yt)continue;const It=parseFloat(rt.tags?.height??"6"),St=parseFloat(rt.tags?.min_height??"0"),Ct=yn(d,h,it,1-ct),Nt=r+(Ct-l)/c*a+St*gt*is,Ut=Nt+Math.max(.2,(It-St)*gt*is),jt=At.length;for(const[zt,ee]of At)st+=`<vertex x="${zt.toFixed(3)}" y="${ee.toFixed(3)}" z="${Nt.toFixed(3)}"/>`;for(const[zt,ee]of At)st+=`<vertex x="${zt.toFixed(3)}" y="${ee.toFixed(3)}" z="${Ut.toFixed(3)}"/>`;for(let zt=0;zt<jt;zt++){const ee=(zt+1)%jt;tt+=`<triangle v1="${ot+zt}" v2="${ot+ee}" v3="${ot+jt+ee}"/><triangle v1="${ot+zt}" v2="${ot+jt+ee}" v3="${ot+jt+zt}"/>`}for(let zt=1;zt<jt-1;zt++)tt+=`<triangle v1="${ot+jt}" v2="${ot+jt+zt}" v3="${ot+jt+zt+1}"/>`,tt+=`<triangle v1="${ot}" v2="${ot+zt+1}" v3="${ot+zt}"/>`;ot+=2*jt}tt&&N.push({id:b++,slot:wt,name:"monuments_detail",col:Tt,vx:st,tr:tt})}if(Ar.length>0){let st=function(tt,ot,rt,mt,D,T,W){let it="",ct="";const _t=rt+T;for(let At=0;At<W;At++){const It=At/W*Math.PI*2;it+=`<vertex x="${(tt+mt*Math.cos(It)).toFixed(3)}" y="${(ot+mt*Math.sin(It)).toFixed(3)}" z="${rt.toFixed(3)}"/>`}for(let At=0;At<W;At++){const It=At/W*Math.PI*2;it+=`<vertex x="${(tt+D*Math.cos(It)).toFixed(3)}" y="${(ot+D*Math.sin(It)).toFixed(3)}" z="${_t.toFixed(3)}"/>`}it+=`<vertex x="${tt.toFixed(3)}" y="${ot.toFixed(3)}" z="${rt.toFixed(3)}"/>`,it+=`<vertex x="${tt.toFixed(3)}" y="${ot.toFixed(3)}" z="${_t.toFixed(3)}"/>`;const Ot=W*2,yt=W*2+1;for(let At=0;At<W;At++){const It=(At+1)%W;ct+=`<triangle v1="${At}" v2="${It}" v3="${W+It}"/>`,ct+=`<triangle v1="${At}" v2="${W+It}" v3="${W+At}"/>`,ct+=`<triangle v1="${Ot}" v2="${It}" v3="${At}"/>`,ct+=`<triangle v1="${yt}" v2="${W+At}" v3="${W+It}"/>`}return{vx:it,tr:ct}};for(const tt of Ar){if(!tt.tags||(tt.tags.name??tt.tags["name:fr"]??"").toLowerCase().includes("eiffel"))continue;let rt,mt;if(tt.type==="node"&&tt.lat!==void 0&&tt.lon!==void 0)rt=(tt.lon-at)/(V-at),mt=(tt.lat-nt)/(J-nt);else{const St=Ui(tt);if(!St.length)continue;const Ct=St[0];if(!Ct.length)continue;let Xt=0,Nt=0;for(const Ut of Ct)Xt+=Ut.lon,Nt+=Ut.lat;rt=(Xt/Ct.length-at)/(V-at),mt=(Nt/Ct.length-nt)/(J-nt)}if(rt<0||rt>1||mt<0||mt>1)continue;const D=(rt-.5)*e,T=(.5-mt)*n;if(Ie&&!ei(D,T,Ie)||Pt&&(D-Pt.cx)**2+(T-Pt.cz)**2<Pt.rMm**2)continue;const W=yn(d,h,rt,1-mt),it=r+(W-l)/c*a,ct=parseFloat(tt.tags.height??"30"),_t=Math.max(2,ct*gt),Ot=Math.max(.5,_t*.04),yt=Ot*.4,{vx:At,tr:It}=st(D,T,it,Ot,yt,_t,6);It&&N.push({id:b++,slot:wt,name:`tower_${b}`,col:Tt,vx:At,tr:It})}}}{let G=function(st,tt,ot,rt,mt,D,T,W,it,ct,_t,Ot){gt+=`<vertex x="${st.toFixed(3)}" y="${tt.toFixed(3)}" z="${ot.toFixed(3)}"/><vertex x="${rt.toFixed(3)}" y="${mt.toFixed(3)}" z="${D.toFixed(3)}"/><vertex x="${T.toFixed(3)}" y="${W.toFixed(3)}" z="${it.toFixed(3)}"/><vertex x="${ct.toFixed(3)}" y="${_t.toFixed(3)}" z="${Ot.toFixed(3)}"/>`,wt+=`<triangle v1="${Tt}" v2="${Tt+1}" v3="${Tt+2}"/><triangle v1="${Tt}" v2="${Tt+2}" v3="${Tt+3}"/>`,Tt+=4};const nt=w.size>0?Array.from(w.values()).reduce((st,tt)=>Math.max(st,tt.h),0):a,J=r+nt,at=-e/2,V=e/2,Y=-n/2,dt=n/2;let gt="",wt="",Tt=0;G(V,dt,0,at,dt,0,at,dt,J,V,dt,J),G(at,Y,0,V,Y,0,V,Y,J,at,Y,J),G(V,Y,0,V,dt,0,V,dt,J,V,Y,J),G(at,dt,0,at,Y,0,at,Y,J,at,dt,J),G(at,dt,0,V,dt,0,V,Y,0,at,Y,0);const Pt=fe.facade??1,$=(qt[Pt]??"#c0af88").replace("#","");N.push({id:b++,slot:Pt,name:"facade",col:$,vx:gt,tr:wt})}if(!N.length){alert("Aucun maillage à exporter.");return}const k=b,I=N.map(G=>`<basematerials id="${G.id+1e3}"><base name="${G.name}" displaycolor="#${G.col}"/></basematerials>`).join(`
`),R=N.map(G=>`<object id="${G.id}" type="model" name="${G.name}" pid="${G.id+1e3}" pindex="0"><mesh><vertices>${G.vx}</vertices><triangles>${G.tr}</triangles></mesh></object>`).join(`
`),U=N.map(G=>`<component objectid="${G.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(""),P=`<object id="${k}" type="model" name="Terrain3D"><components>${U}</components></object>`,E=`<item objectid="${k}" transform="1 0 0 0 1 0 0 0 1 0 0 0" printable="1" identify_id="1"/>`,B=['<?xml version="1.0" encoding="UTF-8"?>',"<config>",`  <object id="${k}" name="Terrain3D">`,'    <metadata key="name" value="Terrain3D"/>','    <metadata key="extruder" value="1"/>',...N.map(G=>`    <part id="${G.id}" subtype="normal_part"><metadata key="name" value="${G.name}"/><metadata key="extruder" value="${G.slot}"/></part>`),"  </object>","</config>"].join(`
`),q=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",I,R,P,"  </resources>","  <build>",E,"  </build>","</model>"].join(`
`),F=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>','  <Relationship Target="/metadata/model_settings.config" Id="rel1" Type="http://schemas.bambulab.com/package/2021/bambu-model-settings"/>',"</Relationships>"].join(`
`),X=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>','  <Override PartName="/metadata/model_settings.config" ContentType="application/xml"/>',"</Types>"].join(`
`),{default:et}=await jM(async()=>{const{default:G}=await import("./jszip.min-Chlja_49.js").then(nt=>nt.j);return{default:G}},[]),K=new et;K.file("[Content_Types].xml",X),K.folder("_rels").file(".rels",F),K.folder("3D").file("3dmodel.model",q),K.folder("metadata").file("model_settings.config",B);const Mt=await K.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),Z=URL.createObjectURL(Mt),vt=document.createElement("a");vt.href=Z,vt.download=s??`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(vt),vt.click(),document.body.removeChild(vt),URL.revokeObjectURL(Z)}function To(){if(Le){if(mi){Le.remove(mi);const s=on.indexOf(mi);s>=0&&on.splice(s,1),mi.traverse(t=>{const e=t;e.geometry?.dispose(),Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):e.material?.dispose()}),mi=null}yo=!1,Je&&(Je.visible=!0);for(const s of ol)s.visible=ke[s.__zoneLayerId]??!0;In&&(In.visible=ke.roads??!0),pi&&(pi.visible=!0)}}function Jb(){const s=document.getElementById("zone-footer");s&&(Bt.bounds?(s.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),vb()):(s.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-apercu-btn")?.setAttribute("disabled","")))}let Pr=!1,vc=!1,Cr="";function Tn(){const s=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:s("dp-w",Bt.wMm||200),dMm:s("dp-d",Bt.dMm||200),baseH:s("dp-base",5),exag:s("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:s("dp-walls",2),gpxPoints:Bt.gpxPoints,zoneType:Bt.zoneType,zonePts:Bt.zonePts,bounds:Bt.bounds}}function iu(){const s=(g,_)=>{const x=document.getElementById(g);x&&(x.value=String(Math.round(_)))};if(!Bt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:r}=Bt.bounds,a=(t+e)/2,l=(r-n)*Math.cos(a*Math.PI/180)*111320,c=(e-t)*111320,h=200,d=l/c,f=d>=1?h:Math.max(10,Math.round(h*d)),m=d<1?h:Math.max(10,Math.round(h/d));Bt.wMm=f,Bt.dMm=m,s("dp-w",f),s("dp-d",m)}function Rs(){const s=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,r=document.getElementById("dp-layers-hint"),a=document.getElementById("dp-wall-mm");r&&(r.textContent=`${Math.round(s/e)} couches`),a&&(a.textContent=`${(t*n).toFixed(2)} mm`)}async function $a(){if(!Bt.bounds||vc)return;vc=!0;const s=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");s.classList.remove("hidden");try{await _b(Bt.bounds,Tn(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{s.classList.add("hidden"),vc=!1}}function su(){Bt.bounds&&(iu(),Rs(),requestAnimationFrame(()=>{const s=document.getElementById("dims-view");Pr?(Lr(s),$a()):(Pr=!0,Lr(s),$a())}))}window.dpToggle=s=>{document.getElementById(s)?.classList.toggle("open")};xm();Em(Jb);document.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const t=s.dataset.tab;!t||s.disabled||(Cr=t,Ls(t),t==="params"?(To(),su()):t==="colors"?(To(),ru()):t==="apercu"?mp():ip())})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),Ls("colors"),ru()});document.getElementById("btn-next-apercu")?.addEventListener("click",()=>{document.getElementById("tab-apercu-btn")?.removeAttribute("disabled"),Ls("apercu"),mp()});document.getElementById("btn-next-render")?.addEventListener("click",async()=>{const s=document.getElementById("btn-next-render");s.querySelector("span");const t=s.innerHTML;s.disabled=!0,s.innerHTML='<span style="display:flex;align-items:center;gap:6px"><svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><circle cx="10" cy="10" r="7" stroke-dasharray="22 22" stroke-linecap="round"/></svg>Génération…</span>';try{await Kb(`Terrain3D_${Date.now()}.3mf`)}finally{s.disabled=!1,s.innerHTML=t}});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{Cr="zone",ip(),Ls("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{Cr="params",Ls("params"),su()});document.getElementById("btn-back-colors")?.addEventListener("click",()=>{Cr="colors",To(),Ls("colors"),ru()});document.querySelectorAll(".dp-sh").forEach(s=>{s.addEventListener("click",()=>{s.closest(".dp-sec")?.classList.toggle("open")})});let Qd;const Qb=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];Qb.forEach(s=>{document.getElementById(s)?.addEventListener("input",()=>{Rs();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(Bt.wMm=t),e>0&&(Bt.dMm=e),clearTimeout(Qd),Qd=setTimeout(()=>En(Tn()),500)})});document.getElementById("dp-walls")?.addEventListener("input",Rs);document.getElementById("dp-flat")?.addEventListener("change",()=>{En(Tn())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>void 0);document.getElementById("btn-next-tab")?.addEventListener("click",()=>{Bt.bounds&&(Ls("params"),su())});let tf;document.querySelectorAll("#params-col input, #params-col select").forEach(s=>{s.addEventListener("change",()=>{clearTimeout(tf),tf=setTimeout(()=>{},700)}),s.addEventListener("input",()=>{if(s.type==="range"){const t=document.getElementById(`${s.id}-v`);t&&(t.textContent=s.value)}})});function fp(s){document.getElementById(s)?.classList.remove("hidden")}function pp(s){document.getElementById(s)?.classList.add("hidden")}function ru(){Bt.bounds&&(iu(),requestAnimationFrame(async()=>{const s=document.getElementById("colors-3d-area");fp("colors-loading"),Pr?(Lr(s),await new Promise(t=>requestAnimationFrame(()=>t())),En(Tn())):(Pr=!0,Lr(s),await $a()),pp("colors-loading"),nw()}))}function tw(){return Number(document.getElementById("ps-layer-h")?.value??.2)}function ew(){Ca(tw());const s=document.getElementById("btn-print-preview");if(s){s.classList.add("active");const t=s.querySelector("span");t&&(t.textContent="Aperçu lisse")}}function mp(){Bt.bounds&&(Cr="apercu",iu(),requestAnimationFrame(async()=>{const s=document.getElementById("apercu-3d-area");fp("apercu-loading"),To(),Pr?(Lr(s),await new Promise(t=>requestAnimationFrame(()=>t())),En(Tn())):(Pr=!0,Lr(s),await $a()),pp("apercu-loading"),Cr==="apercu"&&ew()}))}function nw(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(s=>{const t=Number(s.dataset.slot);qt[t]&&(s.style.background=qt[t])}),document.querySelectorAll(".cp-sw-inner").forEach(s=>{const e=s.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(s.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(s=>{const t=Number(s.dataset.slot);s.addEventListener("input",()=>{const n=s.value,r=s.nextElementSibling;r&&(r.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(a=>{a.style.background=n}),Ur({[t]:n})});const e=s.nextElementSibling;e&&(e.style.background=s.value)});function iw(s,t){Ur({[s]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${s}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${s}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let or=null;function sw(s,t){or&&(or.remove(),or=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(qt).map(Number).sort((c,h)=>c-h),r=fe[s]??Number(t.dataset.slot)??1;n.forEach(c=>{const h=document.createElement("div");h.className="cp-slot-pick-item"+(c===r?" active":""),h.style.setProperty("--sw",qt[c]??"#888"),h.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,h.addEventListener("click",d=>{d.stopPropagation(),cb(s,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=qt[c]??"#888",e.remove(),or=null}),e.appendChild(h)}),document.body.appendChild(e),or=e;const a=t.getBoundingClientRect();e.style.left=`${a.left}px`,e.style.top=`${a.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),or=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const n=s.closest(".cp-layer")?.dataset.layer??"";n&&sw(n,s)})});let ar=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(ar){ar.remove(),ar=null;return}const s=Math.max(...Object.keys(qt).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,ar=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),ar=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const r=e.value;qt[s]=r;const a=document.createElement("label");a.className="cp-swatch",a.dataset.slot=String(s),a.title=`Couleur ${s}`,a.innerHTML=`<input type="color" class="cp-color-input" data-slot="${s}" value="${r}"><div class="cp-sw-inner" style="background:${r}"><span class="cp-sw-num">${s}</span></div>`,a.querySelector(".cp-color-input").addEventListener("input",function(){iw(s,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(a),t.remove(),ar=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete qt[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{Ur({})});document.querySelectorAll(".cp-eye").forEach(s=>{const t=s.dataset.layer;t&&s.addEventListener("click",()=>{s.classList.toggle("hidden-layer");const e=!s.classList.contains("hidden-layer");sp(t,e)})});const gp={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const s=document.getElementById("cp-preset").value,t=gp[s];t&&(Ur(t),Object.entries(t).forEach(([e,n])=>{const r=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(r){r.value=n;const a=r.nextElementSibling;a&&(a.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const rw=document.getElementById("cp-dd-trigger"),ou=document.getElementById("cp-dd-menu");rw?.addEventListener("click",s=>{s.stopPropagation(),ou?.classList.toggle("open")});document.addEventListener("click",()=>ou?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const e=s.dataset.preset??"",n=s.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),s.classList.add("cp-dd-active");const r=document.getElementById("cp-dd-label");r&&(r.textContent=n),ou?.classList.remove("open");const a=gp[e];a&&(Ur(a),ow(a))})});function ow(s){Object.entries(s).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const r=n.nextElementSibling;r&&(r.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);s[e]&&(t.style.background=s[e])})}const au=document.getElementById("cp-layer-detail"),_p=document.getElementById("ldp-title"),vp=document.getElementById("ldp-icon"),yp=document.getElementById("ldp-content");function aw(s,t,e){_p.textContent=t,vp.innerHTML=e,yp.innerHTML=uw(s),au.classList.add("open"),vw(s)}function xp(){au.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",xp);document.querySelectorAll(".cp-layer-nav").forEach(s=>{s.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=s.dataset.type??"land_cover",n=s.querySelector(".cp-layer-name")?.textContent??"Couche",r=s.querySelector(".cp-layer-ico")?.innerHTML??"";aw(e,n,r)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{_p.textContent="Nouvelle couche",vp.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',yp.innerHTML=_w(),au.classList.add("open"),yw()});function lw(){const s=Qc==="raised";return`
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
        <input type="number" id="ldp-road-h" min="0" max="20" step="0.05" value="${Za.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Minimum Road Width</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-minw" min="0.1" max="10" step="0.05" value="${Jc.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Road Width Multiplier</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-mult" min="0.1" max="10" step="0.05" value="${cl.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">x</span>
      </div>
    </div>
  </div>`}function cw(){const s=is.toFixed(2),t=Er.toFixed(2),e=Ga.toFixed(2),n=Wa.toFixed(2);return`
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
  </div>`}function uw(s){return s==="markers"?fw():s==="lines"?mw():s==="water"?dw():s==="waterways"?hw():["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(s)?gw(s):s==="roads"?lw():s==="buildings"?cw():""}function hw(){const s=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=(go*s).toFixed(2),n=(Nc*t).toFixed(2),r=Ki;return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Largeur (nb. de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Épaisseur des lignes comme multiple de la largeur de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-ww-width" class="cp-slider" min="1" max="10" step="0.5" value="${go}">
        <input type="number" class="ldp-num" id="ldp-ww-width-n" value="${go}" step="0.5">
        <span class="ldp-unit" id="ldp-ww-width-mm">( ${e} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-ww-offset" value="${Nc}" step="1">
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
  </div>`}function dw(){const s=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,t=(Eo*s).toFixed(2),n=[{key:"water_ocean",label:"Océans"},{key:"water_lake",label:"Lacs"},{key:"water_pond",label:"Étangs"},{key:"water_reservoir",label:"Réservoirs"},{key:"water_wastewater",label:"Eaux usées"},{key:"water_human",label:"Artificiel"},{key:"water_other",label:"Autre"}].map(r=>`<label class="ldp-check-row"><input type="checkbox" class="ldp-water-feat" data-key="${r.key}"${ll[r.key]!==!1?" checked":""}> ${r.label}</label>`).join("");return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-water-offset" value="${Eo}" step="1">
        <span class="ldp-unit" id="ldp-water-offset-mm">( ${t} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <label class="ldp-check-row">
        <input type="checkbox" id="ldp-water-hydro"${Va?" checked":""}>
        <span>Hydro-Flatten</span>
        <button class="cp-icon-btn cp-info-btn" title="Force une élévation plate pour toutes les étendues d'eau">i</button>
      </label>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    ${n}
  </div>`}function fw(){return`
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
  </div>`}const pw=[{label:"Itinéraires de randonnée",cats:[{key:"hiking_iwn",label:"International"},{key:"hiking_nwn",label:"National"},{key:"hiking_rwn",label:"Régional"},{key:"hiking_lwn",label:"Local"}]},{label:"Itinéraires cyclables",cats:[{key:"cycling_icn",label:"International"},{key:"cycling_ncn",label:"National"},{key:"cycling_rcn",label:"Régional"},{key:"cycling_lcn",label:"Local"}]},{label:"Parcours de VTT",cats:[{key:"mtb_0",label:"International"},{key:"mtb_1",label:"National"},{key:"mtb_2",label:"Régional"},{key:"mtb_local",label:"Local"}]},{label:"Itinéraires équestres",cats:[{key:"equestrian_iwn",label:"International"},{key:"equestrian_nwn",label:"National"},{key:"equestrian_rwn",label:"Régional"},{key:"equestrian_lwn",label:"Local"}]},{label:"Sports d'hiver",cats:[{key:"piste_easy",label:"Facile"},{key:"piste_novice",label:"Novice"},{key:"piste_intermediate",label:"Intermédiaire"},{key:"piste_advanced",label:"Avancé"},{key:"piste_expert",label:"Expert"},{key:"piste_freeride",label:"Freeride"},{key:"piste_other",label:"Autre difficulté"},{key:"piste_none",label:"Sans difficulté"}]},{label:"Routes",cats:[{key:"road_motorway",label:"Autoroute"},{key:"road_trunk",label:"Voie express"},{key:"road_primary",label:"Route nationale"},{key:"road_secondary",label:"Route départementale"},{key:"road_tertiary",label:"Voie tertiaire"},{key:"road_unclassified",label:"Non classifiée"}]},{label:"Rues",cats:[{key:"street_living",label:"Zone de rencontre"},{key:"street_residential",label:"Rue résidentielle"}]},{label:"Rails",cats:[{key:"rail_narrow",label:"Voie étroite"},{key:"rail_standard",label:"Voie standard"},{key:"rail_unknown",label:"Inconnue"},{key:"rail_funicular",label:"Funiculaire"},{key:"rail_light",label:"Tramway rapide"},{key:"rail_monorail",label:"Monorail"},{key:"rail_tram",label:"Tramway"},{key:"rail_subway",label:"Métro"}]}];function mw(){const s='<svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg>';return`
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
    <div id="ldp-line-groups">${pw.map(e=>{const n=e.cats.every(a=>Xa[a.key]===!0),r=e.cats.map(a=>{const l=Xa[a.key]===!0;return`<label class="ldp-sub-row"><input type="checkbox" class="ldp-line-sub" data-linecat="${a.key}"${l?" checked":""}> ${a.label}</label>`}).join("");return`
    <div class="ldp-line-group">
      <div class="ldp-line-group-header">
        <input type="checkbox" class="ldp-line-group-chk" data-group="${e.label}"${n?" checked":""}>
        <span class="ldp-group-label">${e.label}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories">${s}</button>
      </div>
      <div class="ldp-line-subs">${r}</div>
    </div>`}).join("")}</div>
    <div id="ldp-line-status" class="ldp-line-status"></div>
  </div>`}function gw(s){const t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=ep[s]??0,n=(e*t).toFixed(2),r=Yi[s]??{},a=(c,h,d)=>{const f=d.filter(x=>r[x.key]===!0).length,m=f===d.length,g=f>0,_=d.map(x=>`<label class="ldp-check-row ldp-lc-sub"><input type="checkbox" class="ldp-lc-feat" data-key="${x.key}"${r[x.key]===!0?" checked":""}> ${x.label}</label>`).join("");return`
    <div class="ldp-lc-group">
      <div class="ldp-lc-group-header">
        <input type="checkbox" class="ldp-lc-group-chk" data-group="${c}"${m?" checked":g?' data-indeterminate="1"':""}>
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
  </div>`}function _w(){return`
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
  </div>`}function vw(s){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(s==="markers"){const n=document.getElementById("ldp-marker-size"),r=document.getElementById("ldp-marker-size-n"),a=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),c=document.getElementById("ldp-marker-rot-n"),h=document.getElementById("ldp-marker-offset"),d=document.getElementById("ldp-offset-mm"),f=()=>{a&&(a.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},m=()=>{d&&(d.textContent=`( ${(Number(h.value||0)*e).toFixed(2)} mm )`)},g=()=>{const _=kc();_<0||Fc(_,{diameterMult:Number(n?.value??10)||10,rotDeg:Number(l?.value??0),flatTop:document.getElementById("ldp-marker-flat")?.checked??!0,heightOffMult:Number(h?.value??0)})};n?.addEventListener("input",()=>{r&&(r.value=Number(n.value).toFixed(1)),f(),g()}),r?.addEventListener("input",()=>{n&&(n.value=r.value),f(),g()}),l?.addEventListener("input",()=>{c&&(c.value=l.value),g()}),c?.addEventListener("input",()=>{l&&(l.value=c.value),g()}),h?.addEventListener("input",()=>{m(),g()}),document.getElementById("ldp-marker-flat")?.addEventListener("change",g),f(),m(),xr(),document.querySelectorAll(".ldp-shape-btn").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(y=>y.classList.remove("active")),_.classList.add("active");const x=_.dataset.shape??"circle",w=kc();w>=0?Fc(w,{shape:x}):(hb(x),lu(!0))})})}if(s==="lines"){const n=document.getElementById("ldp-line-w"),r=document.getElementById("ldp-line-w-n"),a=document.getElementById("ldp-line-offset"),l=()=>{const d=Math.max(.1,Number(n?.value??1)||1),f=Number(a?.value??1)||1;ub(d,f);const m=Tn();m&&En(m)};n?.addEventListener("input",()=>{r&&(r.value=Number(n.value).toFixed(1)),l()}),r?.addEventListener("input",()=>{n&&(n.value=r.value),l()}),a?.addEventListener("input",l);const c=d=>d.closest(".ldp-line-group")?.classList.toggle("open");document.querySelectorAll(".ldp-chev-btn").forEach(d=>d.addEventListener("click",()=>c(d))),document.querySelectorAll(".ldp-group-label").forEach(d=>d.addEventListener("click",()=>c(d)));const h=()=>{if(!Bt.bounds)return;const d=document.getElementById("ldp-line-status");d&&(d.textContent="Chargement des données…"),Hb(Bt.bounds).then(()=>{d&&(d.textContent="")}).catch(()=>{d&&(d.textContent="Erreur de chargement.")})};document.querySelectorAll(".ldp-line-sub").forEach(d=>{d.addEventListener("change",()=>{Jd(d.dataset.linecat,d.checked),d.checked&&h();const f=d.closest(".ldp-line-group"),m=f?.querySelector(".ldp-line-group-chk");if(m){const g=f.querySelectorAll(".ldp-line-sub");m.checked=Array.from(g).every(_=>_.checked),m.indeterminate=!m.checked&&Array.from(g).some(_=>_.checked)}})}),document.querySelectorAll(".ldp-line-group-chk").forEach(d=>{d.addEventListener("change",()=>{d.closest(".ldp-line-group")?.querySelectorAll(".ldp-line-sub").forEach(m=>{m.checked=d.checked,Jd(m.dataset.linecat,d.checked)}),d.checked&&h()})})}if(["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(s)){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,r=document.getElementById("ldp-lc-offset"),a=document.getElementById("ldp-lc-offset-mm");r?.addEventListener("input",()=>{const c=Number(r.value??0);a&&(a.textContent=`( ${(c*n).toFixed(2)} mm )`),ab(s,c)}),document.querySelectorAll(".ldp-lc-group-chk").forEach(c=>{c.dataset.indeterminate&&(c.indeterminate=!0),c.addEventListener("change",()=>{c.closest(".ldp-lc-group")?.querySelectorAll(".ldp-lc-feat").forEach(f=>{f.checked=c.checked,qd(s,f.dataset.key,c.checked)});const d=Tn();d&&En(d)})});const l=c=>c.closest(".ldp-lc-group")?.classList.toggle("open");document.querySelectorAll(".ldp-lc-group .ldp-chev-btn").forEach(c=>c.addEventListener("click",()=>l(c))),document.querySelectorAll(".ldp-lc-group .ldp-group-label").forEach(c=>c.addEventListener("click",()=>l(c))),document.querySelectorAll(".ldp-lc-feat").forEach(c=>{c.addEventListener("change",()=>{qd(s,c.dataset.key,c.checked);const h=c.closest(".ldp-lc-group"),d=h?.querySelector(".ldp-lc-group-chk");if(d){const m=Array.from(h.querySelectorAll(".ldp-lc-feat"));d.checked=m.every(g=>g.checked),d.indeterminate=!d.checked&&m.some(g=>g.checked)}const f=Tn();f&&En(f)})})}if(s==="roads"){const n=(r,a)=>{const l=document.getElementById(r);l?.addEventListener("change",()=>{a(Number(l.value)),Bc()})};n("ldp-road-h",ib),n("ldp-road-minw",sb),n("ldp-road-mult",rb),document.querySelectorAll(".ldp-style-btn").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".ldp-style-btn").forEach(a=>a.classList.remove("active")),r.classList.add("active"),ob(r.dataset.style),Bc()})})}if(s==="buildings"){const n=(r,a,l)=>{const c=document.getElementById(r),h=document.getElementById(r+"-val");c?.addEventListener("input",()=>{const d=Number(c.value);h&&(h.textContent=a(d)),l(d);const f=Tn();f&&En(f)})};n("ldp-bld-hscale",r=>`${r.toFixed(2)}x`,QM),n("ldp-bld-szscale",r=>`${r.toFixed(2)}x`,tb),n("ldp-bld-minh",r=>`${r.toFixed(2)} mm`,eb),n("ldp-bld-minsz",r=>`${r.toFixed(2)} m²`,nb)}if(s==="water"){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,r=document.getElementById("ldp-water-offset"),a=document.getElementById("ldp-water-offset-mm"),l=document.getElementById("ldp-water-hydro"),c=()=>{const h=Number(r?.value??-1),d=l?.checked??!1;a&&(a.textContent=`( ${(h*n).toFixed(2)} mm )`),Lb(h,d);const f=Tn();f&&En(f)};r?.addEventListener("input",c),l?.addEventListener("change",c),document.querySelectorAll(".ldp-water-feat").forEach(h=>{h.addEventListener("change",()=>{Pb(h.dataset.key,h.checked);const d=Tn();d&&En(d)})})}if(s==="waterways"){const n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,r=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,a=document.getElementById("ldp-ww-width"),l=document.getElementById("ldp-ww-width-n"),c=document.getElementById("ldp-ww-width-mm"),h=document.getElementById("ldp-ww-offset"),d=document.getElementById("ldp-ww-offset-mm"),f=()=>{const g=Math.max(.1,Number(l?.value??1)||1),_=Number(h?.value??-1);c&&(c.textContent=`( ${(g*n).toFixed(2)} mm )`),d&&(d.textContent=`( ${(_*r).toFixed(2)} mm )`),Cb(g,_);const x=Tn();x&&En(x)};a?.addEventListener("input",()=>{l&&(l.value=Number(a.value).toFixed(1)),f()}),l?.addEventListener("input",()=>{a&&(a.value=l.value),f()}),h?.addEventListener("input",f);const m=document.getElementById("ldp-ww-streams");m?.addEventListener("change",()=>{document.querySelectorAll('.ldp-ww-feat[data-key="streams_named"], .ldp-ww-feat[data-key="streams_unnamed"]').forEach(_=>{_.checked=m.checked,Kd(_.dataset.key,m.checked)});const g=Tn();g&&En(g)}),document.querySelectorAll(".ldp-ww-feat").forEach(g=>{g.id!=="ldp-ww-streams"&&g.addEventListener("change",()=>{if(Kd(g.dataset.key,g.checked),(g.dataset.key==="streams_named"||g.dataset.key==="streams_unnamed")&&m){const x=document.querySelector('.ldp-ww-feat[data-key="streams_named"]')?.checked??!1,w=document.querySelector('.ldp-ww-feat[data-key="streams_unnamed"]')?.checked??!1;m.checked=x||w,m.indeterminate=x!==w}const _=Tn();_&&En(_)})})}}function yw(){document.getElementById("ldp-new-type")?.addEventListener("change",s=>{const t=s.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",xp),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const s=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=s[(s.indexOf(t)+1)%s.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=qt[e]??"#888"})}const yr=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{yr.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{yr.classList.add("hidden")});yr?.addEventListener("click",s=>{s.target===yr&&yr.classList.add("hidden")});const Ya=document.getElementById("ps-layer-h"),ja=document.getElementById("ps-wall-w"),Mp=document.getElementById("ps-layer-h-val"),bp=document.getElementById("ps-wall-w-val");Ya?.addEventListener("input",()=>{Mp.textContent=Number(Ya.value).toFixed(2),Rs()});ja?.addEventListener("input",()=>{bp.textContent=Number(ja.value).toFixed(2),Rs()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{yr.classList.add("hidden"),Rs()});document.getElementById("ps-reset")?.addEventListener("click",()=>{Ya&&(Ya.value="0.20",Mp.textContent="0.20"),ja&&(ja.value="0.42",bp.textContent="0.42"),Rs()});function lu(s){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=s?"block":"none"}let wp=0,Sp=0;document.getElementById("dims-canvas")?.addEventListener("pointerdown",s=>{wp=s.clientX,Sp=s.clientY});document.getElementById("dims-canvas")?.addEventListener("click",s=>{const t=s.clientX-wp,e=s.clientY-Sp;if(!(t*t+e*e>=25))if(op())db(s.clientX,s.clientY)>=0&&(lu(!1),xr());else{const n=pb(s.clientX,s.clientY);if(n>=0){ap(n),xr();const a=Uc().find(l=>l.id===n);a&&Ep(a)}else fb()}});document.addEventListener("keydown",s=>{s.key==="Escape"&&op()&&(rp(),lu(!1))});const xw={circle:"Rond",square:"Carré",diamond:"Losange",triangle:"Triangle",cross:"Croix",heart:"Cœur",star:"Étoile"},ef={circle:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>',square:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>',diamond:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>',triangle:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>',cross:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>',heart:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>',star:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'},Mw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>',bw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>';function xr(){const s=document.getElementById("ldp-marker-list");if(!s)return;const t=Uc(),e=kc();if(!t.length){s.innerHTML='<div class="ldp-empty">Aucun marqueur placé</div>';return}s.innerHTML=t.map(n=>`
    <div class="ldp-marker-row${n.id===e?" selected":""}" data-marker-id="${n.id}">
      <svg class="ldp-marker-ico" viewBox="0 0 16 16">${ef[n.shape]??ef.circle}</svg>
      <span class="ldp-marker-lbl">${xw[n.shape]??n.shape}</span>
      <button class="cp-eye ldp-m-eye${n.visible?" active":""}" data-mid="${n.id}" title="Visibilité">${Mw}</button>
      <button class="cp-del ldp-m-del" data-mid="${n.id}" title="Supprimer">${bw}</button>
    </div>`).join(""),s.querySelectorAll(".ldp-marker-row").forEach(n=>{n.addEventListener("click",r=>{if(r.target.closest(".cp-eye, .cp-del"))return;const a=Number(n.dataset.markerId);ap(a),xr();const l=Uc().find(c=>c.id===a);l&&Ep(l)})}),s.querySelectorAll(".ldp-m-eye").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation();const a=Number(n.dataset.mid),l=!n.classList.contains("active");mb(a,l),xr()})}),s.querySelectorAll(".ldp-m-del").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation(),gb(Number(n.dataset.mid)),xr()})})}function Ep(s){document.querySelectorAll(".ldp-shape-btn").forEach(m=>m.classList.remove("active")),document.querySelector(`.ldp-shape-btn[data-shape="${s.shape}"]`)?.classList.add("active");const t=document.getElementById("ldp-marker-size"),e=document.getElementById("ldp-marker-size-n");t&&(t.value=String(s.diameterMult)),e&&(e.value=String(s.diameterMult));const n=document.getElementById("ldp-marker-rot"),r=document.getElementById("ldp-marker-rot-n");n&&(n.value=String(s.rotDeg)),r&&(r.value=String(s.rotDeg));const a=document.getElementById("ldp-marker-flat");a&&(a.checked=s.flatTop);const l=document.getElementById("ldp-marker-offset");l&&(l.value=String(s.heightOffMult));const c=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,h=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,d=document.getElementById("ldp-marker-mm"),f=document.getElementById("ldp-offset-mm");d&&(d.textContent=`( ${(s.diameterMult*c).toFixed(2)} mm )`),f&&(f.textContent=`( ${(s.heightOffMult*h).toFixed(2)} mm )`)}document.querySelectorAll(".cp-del:not(.ldp-m-del)").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const e=s.closest(".cp-layer");if(!e)return;const n=e.dataset.layer;n&&sp(n,!1),e.remove()})});export{Mm as c,bm as g};
