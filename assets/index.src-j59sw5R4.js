(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=e(r);fetch(r.href,a)}})();function dm(){document.getElementById("app").innerHTML=`

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
`}function ws(s){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===s)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${s}`))}window.ts=s=>{document.getElementById(`sb-${s}`)?.classList.toggle("h"),document.getElementById(`ca-${s}`)?.classList.toggle("o")};window.ev=s=>{s.stopPropagation()};var fm=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function pm(s){return s&&s.__esModule&&Object.prototype.hasOwnProperty.call(s,"default")?s.default:s}var ac={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(s,t){(function(e,n){n(t)})(fm,function(e){var n="1.9.4";function r(i){var o,c,f,x;for(c=1,f=arguments.length;c<f;c++){x=arguments[c];for(o in x)i[o]=x[o]}return i}var a=Object.create||function(){function i(){}return function(o){return i.prototype=o,new i}}();function l(i,o){var c=Array.prototype.slice;if(i.bind)return i.bind.apply(i,c.call(arguments,1));var f=c.call(arguments,2);return function(){return i.apply(o,f.length?f.concat(c.call(arguments)):arguments)}}var u=0;function h(i){return"_leaflet_id"in i||(i._leaflet_id=++u),i._leaflet_id}function d(i,o,c){var f,x,A,H;return H=function(){f=!1,x&&(A.apply(c,x),x=!1)},A=function(){f?x=arguments:(i.apply(c,arguments),setTimeout(H,o),f=!0)},A}function p(i,o,c){var f=o[1],x=o[0],A=f-x;return i===f&&c?i:((i-x)%A+A)%A+x}function m(){return!1}function g(i,o){if(o===!1)return i;var c=Math.pow(10,o===void 0?6:o);return Math.round(i*c)/c}function _(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function M(i){return _(i).split(/\s+/)}function w(i,o){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?a(i.options):{});for(var c in o)i.options[c]=o[c];return i.options}function v(i,o,c){var f=[];for(var x in i)f.push(encodeURIComponent(c?x.toUpperCase():x)+"="+encodeURIComponent(i[x]));return(!o||o.indexOf("?")===-1?"?":"&")+f.join("&")}var y=/\{ *([\w_ -]+) *\}/g;function D(i,o){return i.replace(y,function(c,f){var x=o[f];if(x===void 0)throw new Error("No value provided for variable "+c);return typeof x=="function"&&(x=x(o)),x})}var b=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function C(i,o){for(var c=0;c<i.length;c++)if(i[c]===o)return c;return-1}var B="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function N(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var R=0;function U(i){var o=+new Date,c=Math.max(0,16-(o-R));return R=o+c,window.setTimeout(i,c)}var P=window.requestAnimationFrame||N("RequestAnimationFrame")||U,E=window.cancelAnimationFrame||N("CancelAnimationFrame")||N("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function z(i,o,c){if(c&&P===U)i.call(o);else return P.call(window,l(i,o))}function q(i){i&&E.call(window,i)}var k={__proto__:null,extend:r,create:a,bind:l,get lastId(){return u},stamp:h,throttle:d,wrapNum:p,falseFn:m,formatNum:g,trim:_,splitWords:M,setOptions:w,getParamString:v,template:D,isArray:b,indexOf:C,emptyImageUrl:B,requestFn:P,cancelFn:E,requestAnimFrame:z,cancelAnimFrame:q};function W(){}W.extend=function(i){var o=function(){w(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},c=o.__super__=this.prototype,f=a(c);f.constructor=o,o.prototype=f;for(var x in this)Object.prototype.hasOwnProperty.call(this,x)&&x!=="prototype"&&x!=="__super__"&&(o[x]=this[x]);return i.statics&&r(o,i.statics),i.includes&&(X(i.includes),r.apply(null,[f].concat(i.includes))),r(f,i),delete f.statics,delete f.includes,f.options&&(f.options=c.options?a(c.options):{},r(f.options,i.options)),f._initHooks=[],f.callInitHooks=function(){if(!this._initHooksCalled){c.callInitHooks&&c.callInitHooks.call(this),this._initHooksCalled=!0;for(var A=0,H=f._initHooks.length;A<H;A++)f._initHooks[A].call(this)}},o},W.include=function(i){var o=this.prototype.options;return r(this.prototype,i),i.options&&(this.prototype.options=o,this.mergeOptions(i.options)),this},W.mergeOptions=function(i){return r(this.prototype.options,i),this},W.addInitHook=function(i){var o=Array.prototype.slice.call(arguments,1),c=typeof i=="function"?i:function(){this[i].apply(this,o)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(c),this};function X(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=b(i)?i:[i];for(var o=0;o<i.length;o++)i[o]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var J={on:function(i,o,c){if(typeof i=="object")for(var f in i)this._on(f,i[f],o);else{i=M(i);for(var x=0,A=i.length;x<A;x++)this._on(i[x],o,c)}return this},off:function(i,o,c){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var f in i)this._off(f,i[f],o);else{i=M(i);for(var x=arguments.length===1,A=0,H=i.length;A<H;A++)x?this._off(i[A]):this._off(i[A],o,c)}return this},_on:function(i,o,c,f){if(typeof o!="function"){console.warn("wrong listener type: "+typeof o);return}if(this._listens(i,o,c)===!1){c===this&&(c=void 0);var x={fn:o,ctx:c};f&&(x.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(x)}},_off:function(i,o,c){var f,x,A;if(this._events&&(f=this._events[i],!!f)){if(arguments.length===1){if(this._firingCount)for(x=0,A=f.length;x<A;x++)f[x].fn=m;delete this._events[i];return}if(typeof o!="function"){console.warn("wrong listener type: "+typeof o);return}var H=this._listens(i,o,c);if(H!==!1){var j=f[H];this._firingCount&&(j.fn=m,this._events[i]=f=f.slice()),f.splice(H,1)}}},fire:function(i,o,c){if(!this.listens(i,c))return this;var f=r({},o,{type:i,target:this,sourceTarget:o&&o.sourceTarget||this});if(this._events){var x=this._events[i];if(x){this._firingCount=this._firingCount+1||1;for(var A=0,H=x.length;A<H;A++){var j=x[A],et=j.fn;j.once&&this.off(i,et,j.ctx),et.call(j.ctx||this,f)}this._firingCount--}}return c&&this._propagateEvent(f),this},listens:function(i,o,c,f){typeof i!="string"&&console.warn('"string" type argument expected');var x=o;typeof o!="function"&&(f=!!o,x=void 0,c=void 0);var A=this._events&&this._events[i];if(A&&A.length&&this._listens(i,x,c)!==!1)return!0;if(f){for(var H in this._eventParents)if(this._eventParents[H].listens(i,o,c,f))return!0}return!1},_listens:function(i,o,c){if(!this._events)return!1;var f=this._events[i]||[];if(!o)return!!f.length;c===this&&(c=void 0);for(var x=0,A=f.length;x<A;x++)if(f[x].fn===o&&f[x].ctx===c)return x;return!1},once:function(i,o,c){if(typeof i=="object")for(var f in i)this._on(f,i[f],o,!0);else{i=M(i);for(var x=0,A=i.length;x<A;x++)this._on(i[x],o,c,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[h(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[h(i)],this},_propagateEvent:function(i){for(var o in this._eventParents)this._eventParents[o].fire(i.type,r({layer:i.target,propagatedFrom:i.target},i),!0)}};J.addEventListener=J.on,J.removeEventListener=J.clearAllEventListeners=J.off,J.addOneTimeEventListener=J.once,J.fireEvent=J.fire,J.hasEventListeners=J.listens;var ht=W.extend(J);function F(i,o,c){this.x=c?Math.round(i):i,this.y=c?Math.round(o):o}var rt=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};F.prototype={clone:function(){return new F(this.x,this.y)},add:function(i){return this.clone()._add(Z(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(Z(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new F(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new F(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=rt(this.x),this.y=rt(this.y),this},distanceTo:function(i){i=Z(i);var o=i.x-this.x,c=i.y-this.y;return Math.sqrt(o*o+c*c)},equals:function(i){return i=Z(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=Z(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+g(this.x)+", "+g(this.y)+")"}};function Z(i,o,c){return i instanceof F?i:b(i)?new F(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new F(i.x,i.y):new F(i,o,c)}function dt(i,o){if(i)for(var c=o?[i,o]:i,f=0,x=c.length;f<x;f++)this.extend(c[f])}dt.prototype={extend:function(i){var o,c;if(!i)return this;if(i instanceof F||typeof i[0]=="number"||"x"in i)o=c=Z(i);else if(i=bt(i),o=i.min,c=i.max,!o||!c)return this;return!this.min&&!this.max?(this.min=o.clone(),this.max=c.clone()):(this.min.x=Math.min(o.x,this.min.x),this.max.x=Math.max(c.x,this.max.x),this.min.y=Math.min(o.y,this.min.y),this.max.y=Math.max(c.y,this.max.y)),this},getCenter:function(i){return Z((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return Z(this.min.x,this.max.y)},getTopRight:function(){return Z(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var o,c;return typeof i[0]=="number"||i instanceof F?i=Z(i):i=bt(i),i instanceof dt?(o=i.min,c=i.max):o=c=i,o.x>=this.min.x&&c.x<=this.max.x&&o.y>=this.min.y&&c.y<=this.max.y},intersects:function(i){i=bt(i);var o=this.min,c=this.max,f=i.min,x=i.max,A=x.x>=o.x&&f.x<=c.x,H=x.y>=o.y&&f.y<=c.y;return A&&H},overlaps:function(i){i=bt(i);var o=this.min,c=this.max,f=i.min,x=i.max,A=x.x>o.x&&f.x<c.x,H=x.y>o.y&&f.y<c.y;return A&&H},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var o=this.min,c=this.max,f=Math.abs(o.x-c.x)*i,x=Math.abs(o.y-c.y)*i;return bt(Z(o.x-f,o.y-x),Z(c.x+f,c.y+x))},equals:function(i){return i?(i=bt(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function bt(i,o){return!i||i instanceof dt?i:new dt(i,o)}function Dt(i,o){if(i)for(var c=o?[i,o]:i,f=0,x=c.length;f<x;f++)this.extend(c[f])}Dt.prototype={extend:function(i){var o=this._southWest,c=this._northEast,f,x;if(i instanceof ct)f=i,x=i;else if(i instanceof Dt){if(f=i._southWest,x=i._northEast,!f||!x)return this}else return i?this.extend(pt(i)||K(i)):this;return!o&&!c?(this._southWest=new ct(f.lat,f.lng),this._northEast=new ct(x.lat,x.lng)):(o.lat=Math.min(f.lat,o.lat),o.lng=Math.min(f.lng,o.lng),c.lat=Math.max(x.lat,c.lat),c.lng=Math.max(x.lng,c.lng)),this},pad:function(i){var o=this._southWest,c=this._northEast,f=Math.abs(o.lat-c.lat)*i,x=Math.abs(o.lng-c.lng)*i;return new Dt(new ct(o.lat-f,o.lng-x),new ct(c.lat+f,c.lng+x))},getCenter:function(){return new ct((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new ct(this.getNorth(),this.getWest())},getSouthEast:function(){return new ct(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof ct||"lat"in i?i=pt(i):i=K(i);var o=this._southWest,c=this._northEast,f,x;return i instanceof Dt?(f=i.getSouthWest(),x=i.getNorthEast()):f=x=i,f.lat>=o.lat&&x.lat<=c.lat&&f.lng>=o.lng&&x.lng<=c.lng},intersects:function(i){i=K(i);var o=this._southWest,c=this._northEast,f=i.getSouthWest(),x=i.getNorthEast(),A=x.lat>=o.lat&&f.lat<=c.lat,H=x.lng>=o.lng&&f.lng<=c.lng;return A&&H},overlaps:function(i){i=K(i);var o=this._southWest,c=this._northEast,f=i.getSouthWest(),x=i.getNorthEast(),A=x.lat>o.lat&&f.lat<c.lat,H=x.lng>o.lng&&f.lng<c.lng;return A&&H},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,o){return i?(i=K(i),this._southWest.equals(i.getSouthWest(),o)&&this._northEast.equals(i.getNorthEast(),o)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function K(i,o){return i instanceof Dt?i:new Dt(i,o)}function ct(i,o,c){if(isNaN(i)||isNaN(o))throw new Error("Invalid LatLng object: ("+i+", "+o+")");this.lat=+i,this.lng=+o,c!==void 0&&(this.alt=+c)}ct.prototype={equals:function(i,o){if(!i)return!1;i=pt(i);var c=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return c<=(o===void 0?1e-9:o)},toString:function(i){return"LatLng("+g(this.lat,i)+", "+g(this.lng,i)+")"},distanceTo:function(i){return Ut.distance(this,pt(i))},wrap:function(){return Ut.wrapLatLng(this)},toBounds:function(i){var o=180*i/40075017,c=o/Math.cos(Math.PI/180*this.lat);return K([this.lat-o,this.lng-c],[this.lat+o,this.lng+c])},clone:function(){return new ct(this.lat,this.lng,this.alt)}};function pt(i,o,c){return i instanceof ct?i:b(i)&&typeof i[0]!="object"?i.length===3?new ct(i[0],i[1],i[2]):i.length===2?new ct(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new ct(i.lat,"lng"in i?i.lng:i.lon,i.alt):o===void 0?null:new ct(i,o,c)}var yt={latLngToPoint:function(i,o){var c=this.projection.project(i),f=this.scale(o);return this.transformation._transform(c,f)},pointToLatLng:function(i,o){var c=this.scale(o),f=this.transformation.untransform(i,c);return this.projection.unproject(f)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var o=this.projection.bounds,c=this.scale(i),f=this.transformation.transform(o.min,c),x=this.transformation.transform(o.max,c);return new dt(f,x)},infinite:!1,wrapLatLng:function(i){var o=this.wrapLng?p(i.lng,this.wrapLng,!0):i.lng,c=this.wrapLat?p(i.lat,this.wrapLat,!0):i.lat,f=i.alt;return new ct(c,o,f)},wrapLatLngBounds:function(i){var o=i.getCenter(),c=this.wrapLatLng(o),f=o.lat-c.lat,x=o.lng-c.lng;if(f===0&&x===0)return i;var A=i.getSouthWest(),H=i.getNorthEast(),j=new ct(A.lat-f,A.lng-x),et=new ct(H.lat-f,H.lng-x);return new Dt(j,et)}},Ut=r({},yt,{wrapLng:[-180,180],R:6371e3,distance:function(i,o){var c=Math.PI/180,f=i.lat*c,x=o.lat*c,A=Math.sin((o.lat-i.lat)*c/2),H=Math.sin((o.lng-i.lng)*c/2),j=A*A+Math.cos(f)*Math.cos(x)*H*H,et=2*Math.atan2(Math.sqrt(j),Math.sqrt(1-j));return this.R*et}}),Lt=6378137,Et={R:Lt,MAX_LATITUDE:85.0511287798,project:function(i){var o=Math.PI/180,c=this.MAX_LATITUDE,f=Math.max(Math.min(c,i.lat),-c),x=Math.sin(f*o);return new F(this.R*i.lng*o,this.R*Math.log((1+x)/(1-x))/2)},unproject:function(i){var o=180/Math.PI;return new ct((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*o,i.x*o/this.R)},bounds:function(){var i=Lt*Math.PI;return new dt([-i,-i],[i,i])}()};function G(i,o,c,f){if(b(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=o,this._c=c,this._d=f}G.prototype={transform:function(i,o){return this._transform(i.clone(),o)},_transform:function(i,o){return o=o||1,i.x=o*(this._a*i.x+this._b),i.y=o*(this._c*i.y+this._d),i},untransform:function(i,o){return o=o||1,new F((i.x/o-this._b)/this._a,(i.y/o-this._d)/this._c)}};function it(i,o,c,f){return new G(i,o,c,f)}var ot=r({},Ut,{code:"EPSG:3857",projection:Et,transformation:function(){var i=.5/(Math.PI*Et.R);return it(i,.5,-i,.5)}()}),ft=r({},ot,{code:"EPSG:900913"});function vt(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function xt(i,o){var c="",f,x,A,H,j,et;for(f=0,A=i.length;f<A;f++){for(j=i[f],x=0,H=j.length;x<H;x++)et=j[x],c+=(x?"L":"M")+et.x+" "+et.y;c+=o?zt.svg?"z":"x":""}return c||"M0 0"}var O=document.documentElement.style,T="ActiveXObject"in window,$=T&&!document.addEventListener,at="msLaunchUri"in navigator&&!("documentMode"in document),lt=Ze("webkit"),mt=Ze("android"),Gt=Ze("android 2")||Ze("android 3"),_t=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),Ft=mt&&Ze("Google")&&_t<537&&!("AudioNode"in window),Wt=!!window.opera,St=!at&&Ze("chrome"),Pt=Ze("gecko")&&!lt&&!Wt&&!T,qt=!St&&Ze("safari"),Nt=Ze("phantom"),Ot="OTransition"in O,ae=navigator.platform.indexOf("Win")===0,le=T&&"transition"in O,fe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!Gt,de="MozPerspective"in O,me=!window.L_DISABLE_3D&&(le||fe||de)&&!Ot&&!Nt,kt=typeof orientation<"u"||Ze("mobile"),S=kt&&lt,Q=kt&&fe,ut=!window.PointerEvent&&window.MSPointerEvent,wt=!!(window.PointerEvent||ut),Rt="ontouchstart"in window||!!window.TouchEvent,ue=!window.L_NO_TOUCH&&(Rt||wt),oe=kt&&Wt,Me=kt&&Pt,ke=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,ve=function(){var i=!1;try{var o=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",m,o),window.removeEventListener("testPassiveEventSupport",m,o)}catch{}return i}(),De=function(){return!!document.createElement("canvas").getContext}(),Le=!!(document.createElementNS&&vt("svg").createSVGRect),cn=!!Le&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),_n=!Le&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var o=i.firstChild;return o.style.behavior="url(#default#VML)",o&&typeof o.adj=="object"}catch{return!1}}(),ti=navigator.platform.indexOf("Mac")===0,Ii=navigator.platform.indexOf("Linux")===0;function Ze(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var zt={ie:T,ielt9:$,edge:at,webkit:lt,android:mt,android23:Gt,androidStock:Ft,opera:Wt,chrome:St,gecko:Pt,safari:qt,phantom:Nt,opera12:Ot,win:ae,ie3d:le,webkit3d:fe,gecko3d:de,any3d:me,mobile:kt,mobileWebkit:S,mobileWebkit3d:Q,msPointer:ut,pointer:wt,touch:ue,touchNative:Rt,mobileOpera:oe,mobileGecko:Me,retina:ke,passiveEvents:ve,canvas:De,svg:Le,vml:_n,inlineSvg:cn,mac:ti,linux:Ii},Qi=zt.msPointer?"MSPointerDown":"pointerdown",Pr=zt.msPointer?"MSPointerMove":"pointermove",Cr=zt.msPointer?"MSPointerUp":"pointerup",bo=zt.msPointer?"MSPointerCancel":"pointercancel",Rr={touchstart:Qi,touchmove:Pr,touchend:Cr,touchcancel:bo},So={touchstart:Jt,touchmove:Xt,touchend:Xt,touchcancel:Xt},I={},Y=!1;function nt(i,o,c){return o==="touchstart"&&Zt(),So[o]?(c=So[o].bind(this,c),i.addEventListener(Rr[o],c,!1),c):(console.warn("wrong event specified:",o),m)}function st(i,o,c){if(!Rr[o]){console.warn("wrong event specified:",o);return}i.removeEventListener(Rr[o],c,!1)}function tt(i){I[i.pointerId]=i}function At(i){I[i.pointerId]&&(I[i.pointerId]=i)}function Ht(i){delete I[i.pointerId]}function Zt(){Y||(document.addEventListener(Qi,tt,!0),document.addEventListener(Pr,At,!0),document.addEventListener(Cr,Ht,!0),document.addEventListener(bo,Ht,!0),Y=!0)}function Xt(i,o){if(o.pointerType!==(o.MSPOINTER_TYPE_MOUSE||"mouse")){o.touches=[];for(var c in I)o.touches.push(I[c]);o.changedTouches=[o],i(o)}}function Jt(i,o){o.MSPOINTER_TYPE_TOUCH&&o.pointerType===o.MSPOINTER_TYPE_TOUCH&&Qe(o),Xt(i,o)}function Kt(i){var o={},c,f;for(f in i)c=i[f],o[f]=c&&c.bind?c.bind(i):c;return i=o,o.type="dblclick",o.detail=2,o.isTrusted=!1,o._simulated=!0,o}var Qt=200;function Ce(i,o){i.addEventListener("dblclick",o);var c=0,f;function x(A){if(A.detail!==1){f=A.detail;return}if(!(A.pointerType==="mouse"||A.sourceCapabilities&&!A.sourceCapabilities.firesTouchEvents)){var H=iu(A);if(!(H.some(function(et){return et instanceof HTMLLabelElement&&et.attributes.for})&&!H.some(function(et){return et instanceof HTMLInputElement||et instanceof HTMLSelectElement}))){var j=Date.now();j-c<=Qt?(f++,f===2&&o(Kt(A))):f=1,c=j}}}return i.addEventListener("click",x),{dblclick:o,simDblclick:x}}function un(i,o){i.removeEventListener("dblclick",o.dblclick),i.removeEventListener("click",o.simDblclick)}var Ne=Eo(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),hn=Eo(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),be=hn==="webkitTransition"||hn==="OTransition"?hn+"End":"transitionend";function te(i){return typeof i=="string"?document.getElementById(i):i}function fi(i,o){var c=i.style[o]||i.currentStyle&&i.currentStyle[o];if((!c||c==="auto")&&document.defaultView){var f=document.defaultView.getComputedStyle(i,null);c=f?f[o]:null}return c==="auto"?null:c}function Vt(i,o,c){var f=document.createElement(i);return f.className=o||"",c&&c.appendChild(f),f}function ge(i){var o=i.parentNode;o&&o.removeChild(i)}function ts(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Rn(i){var o=i.parentNode;o&&o.lastChild!==i&&o.appendChild(i)}function ei(i){var o=i.parentNode;o&&o.firstChild!==i&&o.insertBefore(i,o.firstChild)}function Be(i,o){if(i.classList!==void 0)return i.classList.contains(o);var c=Di(i);return c.length>0&&new RegExp("(^|\\s)"+o+"(\\s|$)").test(c)}function $t(i,o){if(i.classList!==void 0)for(var c=M(o),f=0,x=c.length;f<x;f++)i.classList.add(c[f]);else if(!Be(i,o)){var A=Di(i);rn(i,(A?A+" ":"")+o)}}function we(i,o){i.classList!==void 0?i.classList.remove(o):rn(i,_((" "+Di(i)+" ").replace(" "+o+" "," ")))}function rn(i,o){i.className.baseVal===void 0?i.className=o:i.className.baseVal=o}function Di(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function vn(i,o){"opacity"in i.style?i.style.opacity=o:"filter"in i.style&&wo(i,o)}function wo(i,o){var c=!1,f="DXImageTransform.Microsoft.Alpha";try{c=i.filters.item(f)}catch{if(o===1)return}o=Math.round(o*100),c?(c.Enabled=o!==100,c.Opacity=o):i.style.filter+=" progid:"+f+"(opacity="+o+")"}function Eo(i){for(var o=document.documentElement.style,c=0;c<i.length;c++)if(i[c]in o)return i[c];return!1}function es(i,o,c){var f=o||new F(0,0);i.style[Ne]=(zt.ie3d?"translate("+f.x+"px,"+f.y+"px)":"translate3d("+f.x+"px,"+f.y+"px,0)")+(c?" scale("+c+")":"")}function Fe(i,o){i._leaflet_pos=o,zt.any3d?es(i,o):(i.style.left=o.x+"px",i.style.top=o.y+"px")}function ns(i){return i._leaflet_pos||new F(0,0)}var Ir,Dr,Ka;if("onselectstart"in document)Ir=function(){ie(window,"selectstart",Qe)},Dr=function(){Se(window,"selectstart",Qe)};else{var Nr=Eo(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Ir=function(){if(Nr){var i=document.documentElement.style;Ka=i[Nr],i[Nr]="none"}},Dr=function(){Nr&&(document.documentElement.style[Nr]=Ka,Ka=void 0)}}function Ja(){ie(window,"dragstart",Qe)}function Qa(){Se(window,"dragstart",Qe)}var To,tl;function el(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(Ao(),To=i,tl=i.style.outlineStyle,i.style.outlineStyle="none",ie(window,"keydown",Ao))}function Ao(){To&&(To.style.outlineStyle=tl,To=void 0,tl=void 0,Se(window,"keydown",Ao))}function eu(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function nl(i){var o=i.getBoundingClientRect();return{x:o.width/i.offsetWidth||1,y:o.height/i.offsetHeight||1,boundingClientRect:o}}var vp={__proto__:null,TRANSFORM:Ne,TRANSITION:hn,TRANSITION_END:be,get:te,getStyle:fi,create:Vt,remove:ge,empty:ts,toFront:Rn,toBack:ei,hasClass:Be,addClass:$t,removeClass:we,setClass:rn,getClass:Di,setOpacity:vn,testProp:Eo,setTransform:es,setPosition:Fe,getPosition:ns,get disableTextSelection(){return Ir},get enableTextSelection(){return Dr},disableImageDrag:Ja,enableImageDrag:Qa,preventOutline:el,restoreOutline:Ao,getSizedParentNode:eu,getScale:nl};function ie(i,o,c,f){if(o&&typeof o=="object")for(var x in o)sl(i,x,o[x],c);else{o=M(o);for(var A=0,H=o.length;A<H;A++)sl(i,o[A],c,f)}return this}var ni="_leaflet_events";function Se(i,o,c,f){if(arguments.length===1)nu(i),delete i[ni];else if(o&&typeof o=="object")for(var x in o)rl(i,x,o[x],c);else if(o=M(o),arguments.length===2)nu(i,function(j){return C(o,j)!==-1});else for(var A=0,H=o.length;A<H;A++)rl(i,o[A],c,f);return this}function nu(i,o){for(var c in i[ni]){var f=c.split(/\d/)[0];(!o||o(f))&&rl(i,f,null,null,c)}}var il={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function sl(i,o,c,f){var x=o+h(c)+(f?"_"+h(f):"");if(i[ni]&&i[ni][x])return this;var A=function(j){return c.call(f||i,j||window.event)},H=A;!zt.touchNative&&zt.pointer&&o.indexOf("touch")===0?A=nt(i,o,A):zt.touch&&o==="dblclick"?A=Ce(i,A):"addEventListener"in i?o==="touchstart"||o==="touchmove"||o==="wheel"||o==="mousewheel"?i.addEventListener(il[o]||o,A,zt.passiveEvents?{passive:!1}:!1):o==="mouseenter"||o==="mouseleave"?(A=function(j){j=j||window.event,al(i,j)&&H(j)},i.addEventListener(il[o],A,!1)):i.addEventListener(o,H,!1):i.attachEvent("on"+o,A),i[ni]=i[ni]||{},i[ni][x]=A}function rl(i,o,c,f,x){x=x||o+h(c)+(f?"_"+h(f):"");var A=i[ni]&&i[ni][x];if(!A)return this;!zt.touchNative&&zt.pointer&&o.indexOf("touch")===0?st(i,o,A):zt.touch&&o==="dblclick"?un(i,A):"removeEventListener"in i?i.removeEventListener(il[o]||o,A,!1):i.detachEvent("on"+o,A),i[ni][x]=null}function is(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function ol(i){return sl(i,"wheel",is),this}function Or(i){return ie(i,"mousedown touchstart dblclick contextmenu",is),i._leaflet_disable_click=!0,this}function Qe(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function ss(i){return Qe(i),is(i),this}function iu(i){if(i.composedPath)return i.composedPath();for(var o=[],c=i.target;c;)o.push(c),c=c.parentNode;return o}function su(i,o){if(!o)return new F(i.clientX,i.clientY);var c=nl(o),f=c.boundingClientRect;return new F((i.clientX-f.left)/c.x-o.clientLeft,(i.clientY-f.top)/c.y-o.clientTop)}var yp=zt.linux&&zt.chrome?window.devicePixelRatio:zt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function ru(i){return zt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/yp:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function al(i,o){var c=o.relatedTarget;if(!c)return!0;try{for(;c&&c!==i;)c=c.parentNode}catch{return!1}return c!==i}var xp={__proto__:null,on:ie,off:Se,stopPropagation:is,disableScrollPropagation:ol,disableClickPropagation:Or,preventDefault:Qe,stop:ss,getPropagationPath:iu,getMousePosition:su,getWheelDelta:ru,isExternalTarget:al,addListener:ie,removeListener:Se},ou=ht.extend({run:function(i,o,c,f){this.stop(),this._el=i,this._inProgress=!0,this._duration=c||.25,this._easeOutPower=1/Math.max(f||.5,.2),this._startPos=ns(i),this._offset=o.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=z(this._animate,this),this._step()},_step:function(i){var o=+new Date-this._startTime,c=this._duration*1e3;o<c?this._runFrame(this._easeOut(o/c),i):(this._runFrame(1),this._complete())},_runFrame:function(i,o){var c=this._startPos.add(this._offset.multiplyBy(i));o&&c._round(),Fe(this._el,c),this.fire("step")},_complete:function(){q(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),pe=ht.extend({options:{crs:ot,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,o){o=w(this,o),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),o.maxBounds&&this.setMaxBounds(o.maxBounds),o.zoom!==void 0&&(this._zoom=this._limitZoom(o.zoom)),o.center&&o.zoom!==void 0&&this.setView(pt(o.center),o.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=hn&&zt.any3d&&!zt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),ie(this._proxy,be,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,o,c){if(o=o===void 0?this._zoom:this._limitZoom(o),i=this._limitCenter(pt(i),o,this.options.maxBounds),c=c||{},this._stop(),this._loaded&&!c.reset&&c!==!0){c.animate!==void 0&&(c.zoom=r({animate:c.animate},c.zoom),c.pan=r({animate:c.animate,duration:c.duration},c.pan));var f=this._zoom!==o?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,o,c.zoom):this._tryAnimatedPan(i,c.pan);if(f)return clearTimeout(this._sizeTimer),this}return this._resetView(i,o,c.pan&&c.pan.noMoveStart),this},setZoom:function(i,o){return this._loaded?this.setView(this.getCenter(),i,{zoom:o}):(this._zoom=i,this)},zoomIn:function(i,o){return i=i||(zt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,o)},zoomOut:function(i,o){return i=i||(zt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,o)},setZoomAround:function(i,o,c){var f=this.getZoomScale(o),x=this.getSize().divideBy(2),A=i instanceof F?i:this.latLngToContainerPoint(i),H=A.subtract(x).multiplyBy(1-1/f),j=this.containerPointToLatLng(x.add(H));return this.setView(j,o,{zoom:c})},_getBoundsCenterZoom:function(i,o){o=o||{},i=i.getBounds?i.getBounds():K(i);var c=Z(o.paddingTopLeft||o.padding||[0,0]),f=Z(o.paddingBottomRight||o.padding||[0,0]),x=this.getBoundsZoom(i,!1,c.add(f));if(x=typeof o.maxZoom=="number"?Math.min(o.maxZoom,x):x,x===1/0)return{center:i.getCenter(),zoom:x};var A=f.subtract(c).divideBy(2),H=this.project(i.getSouthWest(),x),j=this.project(i.getNorthEast(),x),et=this.unproject(H.add(j).divideBy(2).add(A),x);return{center:et,zoom:x}},fitBounds:function(i,o){if(i=K(i),!i.isValid())throw new Error("Bounds are not valid.");var c=this._getBoundsCenterZoom(i,o);return this.setView(c.center,c.zoom,o)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,o){return this.setView(i,this._zoom,{pan:o})},panBy:function(i,o){if(i=Z(i).round(),o=o||{},!i.x&&!i.y)return this.fire("moveend");if(o.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new ou,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),o.noMoveStart||this.fire("movestart"),o.animate!==!1){$t(this._mapPane,"leaflet-pan-anim");var c=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,c,o.duration||.25,o.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,o,c){if(c=c||{},c.animate===!1||!zt.any3d)return this.setView(i,o,c);this._stop();var f=this.project(this.getCenter()),x=this.project(i),A=this.getSize(),H=this._zoom;i=pt(i),o=o===void 0?H:o;var j=Math.max(A.x,A.y),et=j*this.getZoomScale(H,o),gt=x.distanceTo(f)||1,Ct=1.42,Yt=Ct*Ct;function ce(ze){var Fo=ze?-1:1,lm=ze?et:j,cm=et*et-j*j+Fo*Yt*Yt*gt*gt,um=2*lm*Yt*gt,vl=cm/um,zu=Math.sqrt(vl*vl+1)-vl,hm=zu<1e-9?-18:Math.log(zu);return hm}function dn(ze){return(Math.exp(ze)-Math.exp(-ze))/2}function Xe(ze){return(Math.exp(ze)+Math.exp(-ze))/2}function Dn(ze){return dn(ze)/Xe(ze)}var yn=ce(0);function Ds(ze){return j*(Xe(yn)/Xe(yn+Ct*ze))}function sm(ze){return j*(Xe(yn)*Dn(yn+Ct*ze)-dn(yn))/Yt}function rm(ze){return 1-Math.pow(1-ze,1.5)}var om=Date.now(),Bu=(ce(1)-yn)/Ct,am=c.duration?1e3*c.duration:1e3*Bu*.8;function Fu(){var ze=(Date.now()-om)/am,Fo=rm(ze)*Bu;ze<=1?(this._flyToFrame=z(Fu,this),this._move(this.unproject(f.add(x.subtract(f).multiplyBy(sm(Fo)/gt)),H),this.getScaleZoom(j/Ds(Fo),H),{flyTo:!0})):this._move(i,o)._moveEnd(!0)}return this._moveStart(!0,c.noMoveStart),Fu.call(this),this},flyToBounds:function(i,o){var c=this._getBoundsCenterZoom(i,o);return this.flyTo(c.center,c.zoom,o)},setMaxBounds:function(i){return i=K(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var o=this.options.minZoom;return this.options.minZoom=i,this._loaded&&o!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var o=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&o!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,o){this._enforcingBounds=!0;var c=this.getCenter(),f=this._limitCenter(c,this._zoom,K(i));return c.equals(f)||this.panTo(f,o),this._enforcingBounds=!1,this},panInside:function(i,o){o=o||{};var c=Z(o.paddingTopLeft||o.padding||[0,0]),f=Z(o.paddingBottomRight||o.padding||[0,0]),x=this.project(this.getCenter()),A=this.project(i),H=this.getPixelBounds(),j=bt([H.min.add(c),H.max.subtract(f)]),et=j.getSize();if(!j.contains(A)){this._enforcingBounds=!0;var gt=A.subtract(j.getCenter()),Ct=j.extend(A).getSize().subtract(et);x.x+=gt.x<0?-Ct.x:Ct.x,x.y+=gt.y<0?-Ct.y:Ct.y,this.panTo(this.unproject(x),o),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=r({animate:!1,pan:!0},i===!0?{animate:!0}:i);var o=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var c=this.getSize(),f=o.divideBy(2).round(),x=c.divideBy(2).round(),A=f.subtract(x);return!A.x&&!A.y?this:(i.animate&&i.pan?this.panBy(A):(i.pan&&this._rawPanBy(A),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:o,newSize:c}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=r({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var o=l(this._handleGeolocationResponse,this),c=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(o,c,i):navigator.geolocation.getCurrentPosition(o,c,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var o=i.code,c=i.message||(o===1?"permission denied":o===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:o,message:"Geolocation error: "+c+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var o=i.coords.latitude,c=i.coords.longitude,f=new ct(o,c),x=f.toBounds(i.coords.accuracy*2),A=this._locateOptions;if(A.setView){var H=this.getBoundsZoom(x);this.setView(f,A.maxZoom?Math.min(H,A.maxZoom):H)}var j={latlng:f,bounds:x,timestamp:i.timestamp};for(var et in i.coords)typeof i.coords[et]=="number"&&(j[et]=i.coords[et]);this.fire("locationfound",j)}},addHandler:function(i,o){if(!o)return this;var c=this[i]=new o(this);return this._handlers.push(c),this.options[i]&&c.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),ge(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(q(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)ge(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,o){var c="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),f=Vt("div",c,o||this._mapPane);return i&&(this._panes[i]=f),f},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),o=this.unproject(i.getBottomLeft()),c=this.unproject(i.getTopRight());return new Dt(o,c)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,o,c){i=K(i),c=Z(c||[0,0]);var f=this.getZoom()||0,x=this.getMinZoom(),A=this.getMaxZoom(),H=i.getNorthWest(),j=i.getSouthEast(),et=this.getSize().subtract(c),gt=bt(this.project(j,f),this.project(H,f)).getSize(),Ct=zt.any3d?this.options.zoomSnap:1,Yt=et.x/gt.x,ce=et.y/gt.y,dn=o?Math.max(Yt,ce):Math.min(Yt,ce);return f=this.getScaleZoom(dn,f),Ct&&(f=Math.round(f/(Ct/100))*(Ct/100),f=o?Math.ceil(f/Ct)*Ct:Math.floor(f/Ct)*Ct),Math.max(x,Math.min(A,f))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new F(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,o){var c=this._getTopLeftPoint(i,o);return new dt(c,c.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,o){var c=this.options.crs;return o=o===void 0?this._zoom:o,c.scale(i)/c.scale(o)},getScaleZoom:function(i,o){var c=this.options.crs;o=o===void 0?this._zoom:o;var f=c.zoom(i*c.scale(o));return isNaN(f)?1/0:f},project:function(i,o){return o=o===void 0?this._zoom:o,this.options.crs.latLngToPoint(pt(i),o)},unproject:function(i,o){return o=o===void 0?this._zoom:o,this.options.crs.pointToLatLng(Z(i),o)},layerPointToLatLng:function(i){var o=Z(i).add(this.getPixelOrigin());return this.unproject(o)},latLngToLayerPoint:function(i){var o=this.project(pt(i))._round();return o._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(pt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(K(i))},distance:function(i,o){return this.options.crs.distance(pt(i),pt(o))},containerPointToLayerPoint:function(i){return Z(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return Z(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var o=this.containerPointToLayerPoint(Z(i));return this.layerPointToLatLng(o)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(pt(i)))},mouseEventToContainerPoint:function(i){return su(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var o=this._container=te(i);if(o){if(o._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");ie(o,"scroll",this._onScroll,this),this._containerId=h(o)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&zt.any3d,$t(i,"leaflet-container"+(zt.touch?" leaflet-touch":"")+(zt.retina?" leaflet-retina":"")+(zt.ielt9?" leaflet-oldie":"")+(zt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var o=fi(i,"position");o!=="absolute"&&o!=="relative"&&o!=="fixed"&&o!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Fe(this._mapPane,new F(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||($t(i.markerPane,"leaflet-zoom-hide"),$t(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,o,c){Fe(this._mapPane,new F(0,0));var f=!this._loaded;this._loaded=!0,o=this._limitZoom(o),this.fire("viewprereset");var x=this._zoom!==o;this._moveStart(x,c)._move(i,o)._moveEnd(x),this.fire("viewreset"),f&&this.fire("load")},_moveStart:function(i,o){return i&&this.fire("zoomstart"),o||this.fire("movestart"),this},_move:function(i,o,c,f){o===void 0&&(o=this._zoom);var x=this._zoom!==o;return this._zoom=o,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),f?c&&c.pinch&&this.fire("zoom",c):((x||c&&c.pinch)&&this.fire("zoom",c),this.fire("move",c)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return q(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){Fe(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[h(this._container)]=this;var o=i?Se:ie;o(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&o(window,"resize",this._onResize,this),zt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){q(this._resizeRequest),this._resizeRequest=z(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,o){for(var c=[],f,x=o==="mouseout"||o==="mouseover",A=i.target||i.srcElement,H=!1;A;){if(f=this._targets[h(A)],f&&(o==="click"||o==="preclick")&&this._draggableMoved(f)){H=!0;break}if(f&&f.listens(o,!0)&&(x&&!al(A,i)||(c.push(f),x))||A===this._container)break;A=A.parentNode}return!c.length&&!H&&!x&&this.listens(o,!0)&&(c=[this]),c},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var o=i.target||i.srcElement;if(!(!this._loaded||o._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(o))){var c=i.type;c==="mousedown"&&el(o),this._fireDOMEvent(i,c)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,o,c){if(i.type==="click"){var f=r({},i);f.type="preclick",this._fireDOMEvent(f,f.type,c)}var x=this._findEventTargets(i,o);if(c){for(var A=[],H=0;H<c.length;H++)c[H].listens(o,!0)&&A.push(c[H]);x=A.concat(x)}if(x.length){o==="contextmenu"&&Qe(i);var j=x[0],et={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var gt=j.getLatLng&&(!j._radius||j._radius<=10);et.containerPoint=gt?this.latLngToContainerPoint(j.getLatLng()):this.mouseEventToContainerPoint(i),et.layerPoint=this.containerPointToLayerPoint(et.containerPoint),et.latlng=gt?j.getLatLng():this.layerPointToLatLng(et.layerPoint)}for(H=0;H<x.length;H++)if(x[H].fire(o,et,!0),et.originalEvent._stopped||x[H].options.bubblingMouseEvents===!1&&C(this._mouseEvents,o)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,o=this._handlers.length;i<o;i++)this._handlers[i].disable()},whenReady:function(i,o){return this._loaded?i.call(o||this,{target:this}):this.on("load",i,o),this},_getMapPanePos:function(){return ns(this._mapPane)||new F(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,o){var c=i&&o!==void 0?this._getNewPixelOrigin(i,o):this.getPixelOrigin();return c.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,o){var c=this.getSize()._divideBy(2);return this.project(i,o)._subtract(c)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,o,c){var f=this._getNewPixelOrigin(c,o);return this.project(i,o)._subtract(f)},_latLngBoundsToNewLayerBounds:function(i,o,c){var f=this._getNewPixelOrigin(c,o);return bt([this.project(i.getSouthWest(),o)._subtract(f),this.project(i.getNorthWest(),o)._subtract(f),this.project(i.getSouthEast(),o)._subtract(f),this.project(i.getNorthEast(),o)._subtract(f)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,o,c){if(!c)return i;var f=this.project(i,o),x=this.getSize().divideBy(2),A=new dt(f.subtract(x),f.add(x)),H=this._getBoundsOffset(A,c,o);return Math.abs(H.x)<=1&&Math.abs(H.y)<=1?i:this.unproject(f.add(H),o)},_limitOffset:function(i,o){if(!o)return i;var c=this.getPixelBounds(),f=new dt(c.min.add(i),c.max.add(i));return i.add(this._getBoundsOffset(f,o))},_getBoundsOffset:function(i,o,c){var f=bt(this.project(o.getNorthEast(),c),this.project(o.getSouthWest(),c)),x=f.min.subtract(i.min),A=f.max.subtract(i.max),H=this._rebound(x.x,-A.x),j=this._rebound(x.y,-A.y);return new F(H,j)},_rebound:function(i,o){return i+o>0?Math.round(i-o)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(o))},_limitZoom:function(i){var o=this.getMinZoom(),c=this.getMaxZoom(),f=zt.any3d?this.options.zoomSnap:1;return f&&(i=Math.round(i/f)*f),Math.max(o,Math.min(c,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){we(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,o){var c=this._getCenterOffset(i)._trunc();return(o&&o.animate)!==!0&&!this.getSize().contains(c)?!1:(this.panBy(c,o),!0)},_createAnimProxy:function(){var i=this._proxy=Vt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(o){var c=Ne,f=this._proxy.style[c];es(this._proxy,this.project(o.center,o.zoom),this.getZoomScale(o.zoom,1)),f===this._proxy.style[c]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ge(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),o=this.getZoom();es(this._proxy,this.project(i,o),this.getZoomScale(o,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,o,c){if(this._animatingZoom)return!0;if(c=c||{},!this._zoomAnimated||c.animate===!1||this._nothingToAnimate()||Math.abs(o-this._zoom)>this.options.zoomAnimationThreshold)return!1;var f=this.getZoomScale(o),x=this._getCenterOffset(i)._divideBy(1-1/f);return c.animate!==!0&&!this.getSize().contains(x)?!1:(z(function(){this._moveStart(!0,c.noMoveStart||!1)._animateZoom(i,o,!0)},this),!0)},_animateZoom:function(i,o,c,f){this._mapPane&&(c&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=o,$t(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:o,noUpdate:f}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&we(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Mp(i,o){return new pe(i,o)}var Vn=W.extend({options:{position:"topright"},initialize:function(i){w(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var o=this._map;return o&&o.removeControl(this),this.options.position=i,o&&o.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var o=this._container=this.onAdd(i),c=this.getPosition(),f=i._controlCorners[c];return $t(o,"leaflet-control"),c.indexOf("bottom")!==-1?f.insertBefore(o,f.firstChild):f.appendChild(o),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(ge(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),Ur=function(i){return new Vn(i)};pe.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},o="leaflet-",c=this._controlContainer=Vt("div",o+"control-container",this._container);function f(x,A){var H=o+x+" "+o+A;i[x+A]=Vt("div",H,c)}f("top","left"),f("top","right"),f("bottom","left"),f("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)ge(this._controlCorners[i]);ge(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var au=Vn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,o,c,f){return c<f?-1:f<c?1:0}},initialize:function(i,o,c){w(this,c),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var f in i)this._addLayer(i[f],f);for(f in o)this._addLayer(o[f],f,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var o=0;o<this._layers.length;o++)this._layers[o].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return Vn.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,o){return this._addLayer(i,o),this._map?this._update():this},addOverlay:function(i,o){return this._addLayer(i,o,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var o=this._getLayer(h(i));return o&&this._layers.splice(this._layers.indexOf(o),1),this._map?this._update():this},expand:function(){$t(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?($t(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):we(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return we(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",o=this._container=Vt("div",i),c=this.options.collapsed;o.setAttribute("aria-haspopup",!0),Or(o),ol(o);var f=this._section=Vt("section",i+"-list");c&&(this._map.on("click",this.collapse,this),ie(o,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var x=this._layersLink=Vt("a",i+"-toggle",o);x.href="#",x.title="Layers",x.setAttribute("role","button"),ie(x,{keydown:function(A){A.keyCode===13&&this._expandSafely()},click:function(A){Qe(A),this._expandSafely()}},this),c||this.expand(),this._baseLayersList=Vt("div",i+"-base",f),this._separator=Vt("div",i+"-separator",f),this._overlaysList=Vt("div",i+"-overlays",f),o.appendChild(f)},_getLayer:function(i){for(var o=0;o<this._layers.length;o++)if(this._layers[o]&&h(this._layers[o].layer)===i)return this._layers[o]},_addLayer:function(i,o,c){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:o,overlay:c}),this.options.sortLayers&&this._layers.sort(l(function(f,x){return this.options.sortFunction(f.layer,x.layer,f.name,x.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;ts(this._baseLayersList),ts(this._overlaysList),this._layerControlInputs=[];var i,o,c,f,x=0;for(c=0;c<this._layers.length;c++)f=this._layers[c],this._addItem(f),o=o||f.overlay,i=i||!f.overlay,x+=f.overlay?0:1;return this.options.hideSingleBase&&(i=i&&x>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=o&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var o=this._getLayer(h(i.target)),c=o.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;c&&this._map.fire(c,o)},_createRadioElement:function(i,o){var c='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(o?' checked="checked"':"")+"/>",f=document.createElement("div");return f.innerHTML=c,f.firstChild},_addItem:function(i){var o=document.createElement("label"),c=this._map.hasLayer(i.layer),f;i.overlay?(f=document.createElement("input"),f.type="checkbox",f.className="leaflet-control-layers-selector",f.defaultChecked=c):f=this._createRadioElement("leaflet-base-layers_"+h(this),c),this._layerControlInputs.push(f),f.layerId=h(i.layer),ie(f,"click",this._onInputClick,this);var x=document.createElement("span");x.innerHTML=" "+i.name;var A=document.createElement("span");o.appendChild(A),A.appendChild(f),A.appendChild(x);var H=i.overlay?this._overlaysList:this._baseLayersList;return H.appendChild(o),this._checkDisabledLayers(),o},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,o,c,f=[],x=[];this._handlingClick=!0;for(var A=i.length-1;A>=0;A--)o=i[A],c=this._getLayer(o.layerId).layer,o.checked?f.push(c):o.checked||x.push(c);for(A=0;A<x.length;A++)this._map.hasLayer(x[A])&&this._map.removeLayer(x[A]);for(A=0;A<f.length;A++)this._map.hasLayer(f[A])||this._map.addLayer(f[A]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,o,c,f=this._map.getZoom(),x=i.length-1;x>=0;x--)o=i[x],c=this._getLayer(o.layerId).layer,o.disabled=c.options.minZoom!==void 0&&f<c.options.minZoom||c.options.maxZoom!==void 0&&f>c.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,ie(i,"click",Qe),this.expand();var o=this;setTimeout(function(){Se(i,"click",Qe),o._preventClick=!1})}}),bp=function(i,o,c){return new au(i,o,c)},ll=Vn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var o="leaflet-control-zoom",c=Vt("div",o+" leaflet-bar"),f=this.options;return this._zoomInButton=this._createButton(f.zoomInText,f.zoomInTitle,o+"-in",c,this._zoomIn),this._zoomOutButton=this._createButton(f.zoomOutText,f.zoomOutTitle,o+"-out",c,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),c},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,o,c,f,x){var A=Vt("a",c,f);return A.innerHTML=i,A.href="#",A.title=o,A.setAttribute("role","button"),A.setAttribute("aria-label",o),Or(A),ie(A,"click",ss),ie(A,"click",x,this),ie(A,"click",this._refocusOnMap,this),A},_updateDisabled:function(){var i=this._map,o="leaflet-disabled";we(this._zoomInButton,o),we(this._zoomOutButton,o),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&($t(this._zoomOutButton,o),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&($t(this._zoomInButton,o),this._zoomInButton.setAttribute("aria-disabled","true"))}});pe.mergeOptions({zoomControl:!0}),pe.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new ll,this.addControl(this.zoomControl))});var Sp=function(i){return new ll(i)},lu=Vn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var o="leaflet-control-scale",c=Vt("div",o),f=this.options;return this._addScales(f,o+"-line",c),i.on(f.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),c},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,o,c){i.metric&&(this._mScale=Vt("div",o,c)),i.imperial&&(this._iScale=Vt("div",o,c))},_update:function(){var i=this._map,o=i.getSize().y/2,c=i.distance(i.containerPointToLatLng([0,o]),i.containerPointToLatLng([this.options.maxWidth,o]));this._updateScales(c)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var o=this._getRoundNum(i),c=o<1e3?o+" m":o/1e3+" km";this._updateScale(this._mScale,c,o/i)},_updateImperial:function(i){var o=i*3.2808399,c,f,x;o>5280?(c=o/5280,f=this._getRoundNum(c),this._updateScale(this._iScale,f+" mi",f/c)):(x=this._getRoundNum(o),this._updateScale(this._iScale,x+" ft",x/o))},_updateScale:function(i,o,c){i.style.width=Math.round(this.options.maxWidth*c)+"px",i.innerHTML=o},_getRoundNum:function(i){var o=Math.pow(10,(Math.floor(i)+"").length-1),c=i/o;return c=c>=10?10:c>=5?5:c>=3?3:c>=2?2:1,o*c}}),wp=function(i){return new lu(i)},Ep='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',cl=Vn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(zt.inlineSvg?Ep+" ":"")+"Leaflet</a>"},initialize:function(i){w(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Vt("div","leaflet-control-attribution"),Or(this._container);for(var o in i._layers)i._layers[o].getAttribution&&this.addAttribution(i._layers[o].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var o in this._attributions)this._attributions[o]&&i.push(o);var c=[];this.options.prefix&&c.push(this.options.prefix),i.length&&c.push(i.join(", ")),this._container.innerHTML=c.join(' <span aria-hidden="true">|</span> ')}}});pe.mergeOptions({attributionControl:!0}),pe.addInitHook(function(){this.options.attributionControl&&new cl().addTo(this)});var Tp=function(i){return new cl(i)};Vn.Layers=au,Vn.Zoom=ll,Vn.Scale=lu,Vn.Attribution=cl,Ur.layers=bp,Ur.zoom=Sp,Ur.scale=wp,Ur.attribution=Tp;var ii=W.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});ii.addTo=function(i,o){return i.addHandler(o,this),this};var Ap={Events:J},cu=zt.touch?"touchstart mousedown":"mousedown",Ni=ht.extend({options:{clickTolerance:3},initialize:function(i,o,c,f){w(this,f),this._element=i,this._dragStartTarget=o||i,this._preventOutline=c},enable:function(){this._enabled||(ie(this._dragStartTarget,cu,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Ni._dragging===this&&this.finishDrag(!0),Se(this._dragStartTarget,cu,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!Be(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){Ni._dragging===this&&this.finishDrag();return}if(!(Ni._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(Ni._dragging=this,this._preventOutline&&el(this._element),Ja(),Ir(),!this._moving)){this.fire("down");var o=i.touches?i.touches[0]:i,c=eu(this._element);this._startPoint=new F(o.clientX,o.clientY),this._startPos=ns(this._element),this._parentScale=nl(c);var f=i.type==="mousedown";ie(document,f?"mousemove":"touchmove",this._onMove,this),ie(document,f?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var o=i.touches&&i.touches.length===1?i.touches[0]:i,c=new F(o.clientX,o.clientY)._subtract(this._startPoint);!c.x&&!c.y||Math.abs(c.x)+Math.abs(c.y)<this.options.clickTolerance||(c.x/=this._parentScale.x,c.y/=this._parentScale.y,Qe(i),this._moved||(this.fire("dragstart"),this._moved=!0,$t(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),$t(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(c),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),Fe(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){we(document.body,"leaflet-dragging"),this._lastTarget&&(we(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Se(document,"mousemove touchmove",this._onMove,this),Se(document,"mouseup touchend touchcancel",this._onUp,this),Qa(),Dr();var o=this._moved&&this._moving;this._moving=!1,Ni._dragging=!1,o&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function uu(i,o,c){var f,x=[1,4,2,8],A,H,j,et,gt,Ct,Yt,ce;for(A=0,Ct=i.length;A<Ct;A++)i[A]._code=rs(i[A],o);for(j=0;j<4;j++){for(Yt=x[j],f=[],A=0,Ct=i.length,H=Ct-1;A<Ct;H=A++)et=i[A],gt=i[H],et._code&Yt?gt._code&Yt||(ce=Lo(gt,et,Yt,o,c),ce._code=rs(ce,o),f.push(ce)):(gt._code&Yt&&(ce=Lo(gt,et,Yt,o,c),ce._code=rs(ce,o),f.push(ce)),f.push(et));i=f}return i}function hu(i,o){var c,f,x,A,H,j,et,gt,Ct;if(!i||i.length===0)throw new Error("latlngs not passed");In(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Yt=pt([0,0]),ce=K(i),dn=ce.getNorthWest().distanceTo(ce.getSouthWest())*ce.getNorthEast().distanceTo(ce.getNorthWest());dn<1700&&(Yt=ul(i));var Xe=i.length,Dn=[];for(c=0;c<Xe;c++){var yn=pt(i[c]);Dn.push(o.project(pt([yn.lat-Yt.lat,yn.lng-Yt.lng])))}for(j=et=gt=0,c=0,f=Xe-1;c<Xe;f=c++)x=Dn[c],A=Dn[f],H=x.y*A.x-A.y*x.x,et+=(x.x+A.x)*H,gt+=(x.y+A.y)*H,j+=H*3;j===0?Ct=Dn[0]:Ct=[et/j,gt/j];var Ds=o.unproject(Z(Ct));return pt([Ds.lat+Yt.lat,Ds.lng+Yt.lng])}function ul(i){for(var o=0,c=0,f=0,x=0;x<i.length;x++){var A=pt(i[x]);o+=A.lat,c+=A.lng,f++}return pt([o/f,c/f])}var Lp={__proto__:null,clipPolygon:uu,polygonCenter:hu,centroid:ul};function du(i,o){if(!o||!i.length)return i.slice();var c=o*o;return i=Rp(i,c),i=Cp(i,c),i}function fu(i,o,c){return Math.sqrt(kr(i,o,c,!0))}function Pp(i,o,c){return kr(i,o,c)}function Cp(i,o){var c=i.length,f=typeof Uint8Array<"u"?Uint8Array:Array,x=new f(c);x[0]=x[c-1]=1,hl(i,x,o,0,c-1);var A,H=[];for(A=0;A<c;A++)x[A]&&H.push(i[A]);return H}function hl(i,o,c,f,x){var A=0,H,j,et;for(j=f+1;j<=x-1;j++)et=kr(i[j],i[f],i[x],!0),et>A&&(H=j,A=et);A>c&&(o[H]=1,hl(i,o,c,f,H),hl(i,o,c,H,x))}function Rp(i,o){for(var c=[i[0]],f=1,x=0,A=i.length;f<A;f++)Ip(i[f],i[x])>o&&(c.push(i[f]),x=f);return x<A-1&&c.push(i[A-1]),c}var pu;function mu(i,o,c,f,x){var A=f?pu:rs(i,c),H=rs(o,c),j,et,gt;for(pu=H;;){if(!(A|H))return[i,o];if(A&H)return!1;j=A||H,et=Lo(i,o,j,c,x),gt=rs(et,c),j===A?(i=et,A=gt):(o=et,H=gt)}}function Lo(i,o,c,f,x){var A=o.x-i.x,H=o.y-i.y,j=f.min,et=f.max,gt,Ct;return c&8?(gt=i.x+A*(et.y-i.y)/H,Ct=et.y):c&4?(gt=i.x+A*(j.y-i.y)/H,Ct=j.y):c&2?(gt=et.x,Ct=i.y+H*(et.x-i.x)/A):c&1&&(gt=j.x,Ct=i.y+H*(j.x-i.x)/A),new F(gt,Ct,x)}function rs(i,o){var c=0;return i.x<o.min.x?c|=1:i.x>o.max.x&&(c|=2),i.y<o.min.y?c|=4:i.y>o.max.y&&(c|=8),c}function Ip(i,o){var c=o.x-i.x,f=o.y-i.y;return c*c+f*f}function kr(i,o,c,f){var x=o.x,A=o.y,H=c.x-x,j=c.y-A,et=H*H+j*j,gt;return et>0&&(gt=((i.x-x)*H+(i.y-A)*j)/et,gt>1?(x=c.x,A=c.y):gt>0&&(x+=H*gt,A+=j*gt)),H=i.x-x,j=i.y-A,f?H*H+j*j:new F(x,A)}function In(i){return!b(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function gu(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),In(i)}function _u(i,o){var c,f,x,A,H,j,et,gt;if(!i||i.length===0)throw new Error("latlngs not passed");In(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Ct=pt([0,0]),Yt=K(i),ce=Yt.getNorthWest().distanceTo(Yt.getSouthWest())*Yt.getNorthEast().distanceTo(Yt.getNorthWest());ce<1700&&(Ct=ul(i));var dn=i.length,Xe=[];for(c=0;c<dn;c++){var Dn=pt(i[c]);Xe.push(o.project(pt([Dn.lat-Ct.lat,Dn.lng-Ct.lng])))}for(c=0,f=0;c<dn-1;c++)f+=Xe[c].distanceTo(Xe[c+1])/2;if(f===0)gt=Xe[0];else for(c=0,A=0;c<dn-1;c++)if(H=Xe[c],j=Xe[c+1],x=H.distanceTo(j),A+=x,A>f){et=(A-f)/x,gt=[j.x-et*(j.x-H.x),j.y-et*(j.y-H.y)];break}var yn=o.unproject(Z(gt));return pt([yn.lat+Ct.lat,yn.lng+Ct.lng])}var Dp={__proto__:null,simplify:du,pointToSegmentDistance:fu,closestPointOnSegment:Pp,clipSegment:mu,_getEdgeIntersection:Lo,_getBitCode:rs,_sqClosestPointOnSegment:kr,isFlat:In,_flat:gu,polylineCenter:_u},dl={project:function(i){return new F(i.lng,i.lat)},unproject:function(i){return new ct(i.y,i.x)},bounds:new dt([-180,-90],[180,90])},fl={R:6378137,R_MINOR:6356752314245179e-9,bounds:new dt([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var o=Math.PI/180,c=this.R,f=i.lat*o,x=this.R_MINOR/c,A=Math.sqrt(1-x*x),H=A*Math.sin(f),j=Math.tan(Math.PI/4-f/2)/Math.pow((1-H)/(1+H),A/2);return f=-c*Math.log(Math.max(j,1e-10)),new F(i.lng*o*c,f)},unproject:function(i){for(var o=180/Math.PI,c=this.R,f=this.R_MINOR/c,x=Math.sqrt(1-f*f),A=Math.exp(-i.y/c),H=Math.PI/2-2*Math.atan(A),j=0,et=.1,gt;j<15&&Math.abs(et)>1e-7;j++)gt=x*Math.sin(H),gt=Math.pow((1-gt)/(1+gt),x/2),et=Math.PI/2-2*Math.atan(A*gt)-H,H+=et;return new ct(H*o,i.x*o/c)}},Np={__proto__:null,LonLat:dl,Mercator:fl,SphericalMercator:Et},Op=r({},Ut,{code:"EPSG:3395",projection:fl,transformation:function(){var i=.5/(Math.PI*fl.R);return it(i,.5,-i,.5)}()}),vu=r({},Ut,{code:"EPSG:4326",projection:dl,transformation:it(1/180,1,-1/180,.5)}),Up=r({},yt,{projection:dl,transformation:it(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,o){var c=o.lng-i.lng,f=o.lat-i.lat;return Math.sqrt(c*c+f*f)},infinite:!0});yt.Earth=Ut,yt.EPSG3395=Op,yt.EPSG3857=ot,yt.EPSG900913=ft,yt.EPSG4326=vu,yt.Simple=Up;var Gn=ht.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[h(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[h(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var o=i.target;if(o.hasLayer(this)){if(this._map=o,this._zoomAnimated=o._zoomAnimated,this.getEvents){var c=this.getEvents();o.on(c,this),this.once("remove",function(){o.off(c,this)},this)}this.onAdd(o),this.fire("add"),o.fire("layeradd",{layer:this})}}});pe.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var o=h(i);return this._layers[o]?this:(this._layers[o]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var o=h(i);return this._layers[o]?(this._loaded&&i.onRemove(this),delete this._layers[o],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return h(i)in this._layers},eachLayer:function(i,o){for(var c in this._layers)i.call(o,this._layers[c]);return this},_addLayers:function(i){i=i?b(i)?i:[i]:[];for(var o=0,c=i.length;o<c;o++)this.addLayer(i[o])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[h(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var o=h(i);this._zoomBoundLayers[o]&&(delete this._zoomBoundLayers[o],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,o=-1/0,c=this._getZoomSpan();for(var f in this._zoomBoundLayers){var x=this._zoomBoundLayers[f].options;i=x.minZoom===void 0?i:Math.min(i,x.minZoom),o=x.maxZoom===void 0?o:Math.max(o,x.maxZoom)}this._layersMaxZoom=o===-1/0?void 0:o,this._layersMinZoom=i===1/0?void 0:i,c!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Ls=Gn.extend({initialize:function(i,o){w(this,o),this._layers={};var c,f;if(i)for(c=0,f=i.length;c<f;c++)this.addLayer(i[c])},addLayer:function(i){var o=this.getLayerId(i);return this._layers[o]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var o=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[o]&&this._map.removeLayer(this._layers[o]),delete this._layers[o],this},hasLayer:function(i){var o=typeof i=="number"?i:this.getLayerId(i);return o in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var o=Array.prototype.slice.call(arguments,1),c,f;for(c in this._layers)f=this._layers[c],f[i]&&f[i].apply(f,o);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,o){for(var c in this._layers)i.call(o,this._layers[c]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return h(i)}}),kp=function(i,o){return new Ls(i,o)},pi=Ls.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),Ls.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),Ls.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new Dt;for(var o in this._layers){var c=this._layers[o];i.extend(c.getBounds?c.getBounds():c.getLatLng())}return i}}),Bp=function(i,o){return new pi(i,o)},Ps=W.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){w(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,o){var c=this._getIconUrl(i);if(!c){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var f=this._createImg(c,o&&o.tagName==="IMG"?o:null);return this._setIconStyles(f,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(f.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),f},_setIconStyles:function(i,o){var c=this.options,f=c[o+"Size"];typeof f=="number"&&(f=[f,f]);var x=Z(f),A=Z(o==="shadow"&&c.shadowAnchor||c.iconAnchor||x&&x.divideBy(2,!0));i.className="leaflet-marker-"+o+" "+(c.className||""),A&&(i.style.marginLeft=-A.x+"px",i.style.marginTop=-A.y+"px"),x&&(i.style.width=x.x+"px",i.style.height=x.y+"px")},_createImg:function(i,o){return o=o||document.createElement("img"),o.src=i,o},_getIconUrl:function(i){return zt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function Fp(i){return new Ps(i)}var Br=Ps.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof Br.imagePath!="string"&&(Br.imagePath=this._detectIconPath()),(this.options.imagePath||Br.imagePath)+Ps.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var o=function(c,f,x){var A=f.exec(c);return A&&A[x]};return i=o(i,/^url\((['"])?(.+)\1\)$/,2),i&&o(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Vt("div","leaflet-default-icon-path",document.body),o=fi(i,"background-image")||fi(i,"backgroundImage");if(document.body.removeChild(i),o=this._stripUrl(o),o)return o;var c=document.querySelector('link[href$="leaflet.css"]');return c?c.href.substring(0,c.href.length-11-1):""}}),yu=ii.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new Ni(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),$t(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&we(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var o=this._marker,c=o._map,f=this._marker.options.autoPanSpeed,x=this._marker.options.autoPanPadding,A=ns(o._icon),H=c.getPixelBounds(),j=c.getPixelOrigin(),et=bt(H.min._subtract(j).add(x),H.max._subtract(j).subtract(x));if(!et.contains(A)){var gt=Z((Math.max(et.max.x,A.x)-et.max.x)/(H.max.x-et.max.x)-(Math.min(et.min.x,A.x)-et.min.x)/(H.min.x-et.min.x),(Math.max(et.max.y,A.y)-et.max.y)/(H.max.y-et.max.y)-(Math.min(et.min.y,A.y)-et.min.y)/(H.min.y-et.min.y)).multiplyBy(f);c.panBy(gt,{animate:!1}),this._draggable._newPos._add(gt),this._draggable._startPos._add(gt),Fe(o._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=z(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(q(this._panRequest),this._panRequest=z(this._adjustPan.bind(this,i)))},_onDrag:function(i){var o=this._marker,c=o._shadow,f=ns(o._icon),x=o._map.layerPointToLatLng(f);c&&Fe(c,f),o._latlng=x,i.latlng=x,i.oldLatLng=this._oldLatLng,o.fire("move",i).fire("drag",i)},_onDragEnd:function(i){q(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),Po=Gn.extend({options:{icon:new Br,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,o){w(this,o),this._latlng=pt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var o=this._latlng;return this._latlng=pt(i),this.update(),this.fire("move",{oldLatLng:o,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,o="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),c=i.icon.createIcon(this._icon),f=!1;c!==this._icon&&(this._icon&&this._removeIcon(),f=!0,i.title&&(c.title=i.title),c.tagName==="IMG"&&(c.alt=i.alt||"")),$t(c,o),i.keyboard&&(c.tabIndex="0",c.setAttribute("role","button")),this._icon=c,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&ie(c,"focus",this._panOnFocus,this);var x=i.icon.createShadow(this._shadow),A=!1;x!==this._shadow&&(this._removeShadow(),A=!0),x&&($t(x,o),x.alt=""),this._shadow=x,i.opacity<1&&this._updateOpacity(),f&&this.getPane().appendChild(this._icon),this._initInteraction(),x&&A&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Se(this._icon,"focus",this._panOnFocus,this),ge(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ge(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&Fe(this._icon,i),this._shadow&&Fe(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(o)},_initInteraction:function(){if(this.options.interactive&&($t(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),yu)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new yu(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&vn(this._icon,i),this._shadow&&vn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var o=this.options.icon.options,c=o.iconSize?Z(o.iconSize):Z(0,0),f=o.iconAnchor?Z(o.iconAnchor):Z(0,0);i.panInside(this._latlng,{paddingTopLeft:f,paddingBottomRight:c.subtract(f)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function zp(i,o){return new Po(i,o)}var Oi=Gn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return w(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Co=Oi.extend({options:{fill:!0,radius:10},initialize:function(i,o){w(this,o),this._latlng=pt(i),this._radius=this.options.radius},setLatLng:function(i){var o=this._latlng;return this._latlng=pt(i),this.redraw(),this.fire("move",{oldLatLng:o,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var o=i&&i.radius||this._radius;return Oi.prototype.setStyle.call(this,i),this.setRadius(o),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,o=this._radiusY||i,c=this._clickTolerance(),f=[i+c,o+c];this._pxBounds=new dt(this._point.subtract(f),this._point.add(f))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Hp(i,o){return new Co(i,o)}var pl=Co.extend({initialize:function(i,o,c){if(typeof o=="number"&&(o=r({},c,{radius:o})),w(this,o),this._latlng=pt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new Dt(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:Oi.prototype.setStyle,_project:function(){var i=this._latlng.lng,o=this._latlng.lat,c=this._map,f=c.options.crs;if(f.distance===Ut.distance){var x=Math.PI/180,A=this._mRadius/Ut.R/x,H=c.project([o+A,i]),j=c.project([o-A,i]),et=H.add(j).divideBy(2),gt=c.unproject(et).lat,Ct=Math.acos((Math.cos(A*x)-Math.sin(o*x)*Math.sin(gt*x))/(Math.cos(o*x)*Math.cos(gt*x)))/x;(isNaN(Ct)||Ct===0)&&(Ct=A/Math.cos(Math.PI/180*o)),this._point=et.subtract(c.getPixelOrigin()),this._radius=isNaN(Ct)?0:et.x-c.project([gt,i-Ct]).x,this._radiusY=et.y-H.y}else{var Yt=f.unproject(f.project(this._latlng).subtract([this._mRadius,0]));this._point=c.latLngToLayerPoint(this._latlng),this._radius=this._point.x-c.latLngToLayerPoint(Yt).x}this._updateBounds()}});function Vp(i,o,c){return new pl(i,o,c)}var mi=Oi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,o){w(this,o),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var o=1/0,c=null,f=kr,x,A,H=0,j=this._parts.length;H<j;H++)for(var et=this._parts[H],gt=1,Ct=et.length;gt<Ct;gt++){x=et[gt-1],A=et[gt];var Yt=f(i,x,A,!0);Yt<o&&(o=Yt,c=f(i,x,A))}return c&&(c.distance=Math.sqrt(o)),c},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return _u(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,o){return o=o||this._defaultShape(),i=pt(i),o.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new Dt,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return In(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var o=[],c=In(i),f=0,x=i.length;f<x;f++)c?(o[f]=pt(i[f]),this._bounds.extend(o[f])):o[f]=this._convertLatLngs(i[f]);return o},_project:function(){var i=new dt;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),o=new F(i,i);this._rawPxBounds&&(this._pxBounds=new dt([this._rawPxBounds.min.subtract(o),this._rawPxBounds.max.add(o)]))},_projectLatlngs:function(i,o,c){var f=i[0]instanceof ct,x=i.length,A,H;if(f){for(H=[],A=0;A<x;A++)H[A]=this._map.latLngToLayerPoint(i[A]),c.extend(H[A]);o.push(H)}else for(A=0;A<x;A++)this._projectLatlngs(i[A],o,c)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var o=this._parts,c,f,x,A,H,j,et;for(c=0,x=0,A=this._rings.length;c<A;c++)for(et=this._rings[c],f=0,H=et.length;f<H-1;f++)j=mu(et[f],et[f+1],i,f,!0),j&&(o[x]=o[x]||[],o[x].push(j[0]),(j[1]!==et[f+1]||f===H-2)&&(o[x].push(j[1]),x++))}},_simplifyPoints:function(){for(var i=this._parts,o=this.options.smoothFactor,c=0,f=i.length;c<f;c++)i[c]=du(i[c],o)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,o){var c,f,x,A,H,j,et=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(c=0,A=this._parts.length;c<A;c++)for(j=this._parts[c],f=0,H=j.length,x=H-1;f<H;x=f++)if(!(!o&&f===0)&&fu(i,j[x],j[f])<=et)return!0;return!1}});function Gp(i,o){return new mi(i,o)}mi._flat=gu;var Cs=mi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return hu(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var o=mi.prototype._convertLatLngs.call(this,i),c=o.length;return c>=2&&o[0]instanceof ct&&o[0].equals(o[c-1])&&o.pop(),o},_setLatLngs:function(i){mi.prototype._setLatLngs.call(this,i),In(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return In(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,o=this.options.weight,c=new F(o,o);if(i=new dt(i.min.subtract(c),i.max.add(c)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var f=0,x=this._rings.length,A;f<x;f++)A=uu(this._rings[f],i,!0),A.length&&this._parts.push(A)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var o=!1,c,f,x,A,H,j,et,gt;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(A=0,et=this._parts.length;A<et;A++)for(c=this._parts[A],H=0,gt=c.length,j=gt-1;H<gt;j=H++)f=c[H],x=c[j],f.y>i.y!=x.y>i.y&&i.x<(x.x-f.x)*(i.y-f.y)/(x.y-f.y)+f.x&&(o=!o);return o||mi.prototype._containsPoint.call(this,i,!0)}});function Wp(i,o){return new Cs(i,o)}var gi=pi.extend({initialize:function(i,o){w(this,o),this._layers={},i&&this.addData(i)},addData:function(i){var o=b(i)?i:i.features,c,f,x;if(o){for(c=0,f=o.length;c<f;c++)x=o[c],(x.geometries||x.geometry||x.features||x.coordinates)&&this.addData(x);return this}var A=this.options;if(A.filter&&!A.filter(i))return this;var H=Ro(i,A);return H?(H.feature=No(i),H.defaultOptions=H.options,this.resetStyle(H),A.onEachFeature&&A.onEachFeature(i,H),this.addLayer(H)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=r({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(o){this._setLayerStyle(o,i)},this)},_setLayerStyle:function(i,o){i.setStyle&&(typeof o=="function"&&(o=o(i.feature)),i.setStyle(o))}});function Ro(i,o){var c=i.type==="Feature"?i.geometry:i,f=c?c.coordinates:null,x=[],A=o&&o.pointToLayer,H=o&&o.coordsToLatLng||ml,j,et,gt,Ct;if(!f&&!c)return null;switch(c.type){case"Point":return j=H(f),xu(A,i,j,o);case"MultiPoint":for(gt=0,Ct=f.length;gt<Ct;gt++)j=H(f[gt]),x.push(xu(A,i,j,o));return new pi(x);case"LineString":case"MultiLineString":return et=Io(f,c.type==="LineString"?0:1,H),new mi(et,o);case"Polygon":case"MultiPolygon":return et=Io(f,c.type==="Polygon"?1:2,H),new Cs(et,o);case"GeometryCollection":for(gt=0,Ct=c.geometries.length;gt<Ct;gt++){var Yt=Ro({geometry:c.geometries[gt],type:"Feature",properties:i.properties},o);Yt&&x.push(Yt)}return new pi(x);case"FeatureCollection":for(gt=0,Ct=c.features.length;gt<Ct;gt++){var ce=Ro(c.features[gt],o);ce&&x.push(ce)}return new pi(x);default:throw new Error("Invalid GeoJSON object.")}}function xu(i,o,c,f){return i?i(o,c):new Po(c,f&&f.markersInheritOptions&&f)}function ml(i){return new ct(i[1],i[0],i[2])}function Io(i,o,c){for(var f=[],x=0,A=i.length,H;x<A;x++)H=o?Io(i[x],o-1,c):(c||ml)(i[x]),f.push(H);return f}function gl(i,o){return i=pt(i),i.alt!==void 0?[g(i.lng,o),g(i.lat,o),g(i.alt,o)]:[g(i.lng,o),g(i.lat,o)]}function Do(i,o,c,f){for(var x=[],A=0,H=i.length;A<H;A++)x.push(o?Do(i[A],In(i[A])?0:o-1,c,f):gl(i[A],f));return!o&&c&&x.length>0&&x.push(x[0].slice()),x}function Rs(i,o){return i.feature?r({},i.feature,{geometry:o}):No(o)}function No(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var _l={toGeoJSON:function(i){return Rs(this,{type:"Point",coordinates:gl(this.getLatLng(),i)})}};Po.include(_l),pl.include(_l),Co.include(_l),mi.include({toGeoJSON:function(i){var o=!In(this._latlngs),c=Do(this._latlngs,o?1:0,!1,i);return Rs(this,{type:(o?"Multi":"")+"LineString",coordinates:c})}}),Cs.include({toGeoJSON:function(i){var o=!In(this._latlngs),c=o&&!In(this._latlngs[0]),f=Do(this._latlngs,c?2:o?1:0,!0,i);return o||(f=[f]),Rs(this,{type:(c?"Multi":"")+"Polygon",coordinates:f})}}),Ls.include({toMultiPoint:function(i){var o=[];return this.eachLayer(function(c){o.push(c.toGeoJSON(i).geometry.coordinates)}),Rs(this,{type:"MultiPoint",coordinates:o})},toGeoJSON:function(i){var o=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(o==="MultiPoint")return this.toMultiPoint(i);var c=o==="GeometryCollection",f=[];return this.eachLayer(function(x){if(x.toGeoJSON){var A=x.toGeoJSON(i);if(c)f.push(A.geometry);else{var H=No(A);H.type==="FeatureCollection"?f.push.apply(f,H.features):f.push(H)}}}),c?Rs(this,{geometries:f,type:"GeometryCollection"}):{type:"FeatureCollection",features:f}}});function Mu(i,o){return new gi(i,o)}var Zp=Mu,Oo=Gn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,o,c){this._url=i,this._bounds=K(o),w(this,c)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&($t(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ge(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&Rn(this._image),this},bringToBack:function(){return this._map&&ei(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=K(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",o=this._image=i?this._url:Vt("img");if($t(o,"leaflet-image-layer"),this._zoomAnimated&&$t(o,"leaflet-zoom-animated"),this.options.className&&$t(o,this.options.className),o.onselectstart=m,o.onmousemove=m,o.onload=l(this.fire,this,"load"),o.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(o.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=o.src;return}o.src=this._url,o.alt=this.options.alt},_animateZoom:function(i){var o=this._map.getZoomScale(i.zoom),c=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;es(this._image,c,o)},_reset:function(){var i=this._image,o=new dt(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),c=o.getSize();Fe(i,o.min),i.style.width=c.x+"px",i.style.height=c.y+"px"},_updateOpacity:function(){vn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),Xp=function(i,o,c){return new Oo(i,o,c)},bu=Oo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",o=this._image=i?this._url:Vt("video");if($t(o,"leaflet-image-layer"),this._zoomAnimated&&$t(o,"leaflet-zoom-animated"),this.options.className&&$t(o,this.options.className),o.onselectstart=m,o.onmousemove=m,o.onloadeddata=l(this.fire,this,"load"),i){for(var c=o.getElementsByTagName("source"),f=[],x=0;x<c.length;x++)f.push(c[x].src);this._url=c.length>0?f:[o.src];return}b(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(o.style,"objectFit")&&(o.style.objectFit="fill"),o.autoplay=!!this.options.autoplay,o.loop=!!this.options.loop,o.muted=!!this.options.muted,o.playsInline=!!this.options.playsInline;for(var A=0;A<this._url.length;A++){var H=Vt("source");H.src=this._url[A],o.appendChild(H)}}});function qp(i,o,c){return new bu(i,o,c)}var Su=Oo.extend({_initImage:function(){var i=this._image=this._url;$t(i,"leaflet-image-layer"),this._zoomAnimated&&$t(i,"leaflet-zoom-animated"),this.options.className&&$t(i,this.options.className),i.onselectstart=m,i.onmousemove=m}});function $p(i,o,c){return new Su(i,o,c)}var si=Gn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,o){i&&(i instanceof ct||b(i))?(this._latlng=pt(i),w(this,o)):(w(this,i),this._source=o),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&vn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&vn(this._container,1),this.bringToFront(),this.options.interactive&&($t(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(vn(this._container,0),this._removeTimeout=setTimeout(l(ge,void 0,this._container),200)):ge(this._container),this.options.interactive&&(we(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=pt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Rn(this._container),this},bringToBack:function(){return this._map&&ei(this._container),this},_prepareOpen:function(i){var o=this._source;if(!o._map)return!1;if(o instanceof pi){o=null;var c=this._source._layers;for(var f in c)if(c[f]._map){o=c[f];break}if(!o)return!1;this._source=o}if(!i)if(o.getCenter)i=o.getCenter();else if(o.getLatLng)i=o.getLatLng();else if(o.getBounds)i=o.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,o=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof o=="string")i.innerHTML=o;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(o)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),o=Z(this.options.offset),c=this._getAnchor();this._zoomAnimated?Fe(this._container,i.add(c)):o=o.add(i).add(c);var f=this._containerBottom=-o.y,x=this._containerLeft=-Math.round(this._containerWidth/2)+o.x;this._container.style.bottom=f+"px",this._container.style.left=x+"px"}},_getAnchor:function(){return[0,0]}});pe.include({_initOverlay:function(i,o,c,f){var x=o;return x instanceof i||(x=new i(f).setContent(o)),c&&x.setLatLng(c),x}}),Gn.include({_initOverlay:function(i,o,c,f){var x=c;return x instanceof i?(w(x,f),x._source=this):(x=o&&!f?o:new i(f,this),x.setContent(c)),x}});var Uo=si.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,si.prototype.openOn.call(this,i)},onAdd:function(i){si.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Oi||this._source.on("preclick",is))},onRemove:function(i){si.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Oi||this._source.off("preclick",is))},getEvents:function(){var i=si.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",o=this._container=Vt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),c=this._wrapper=Vt("div",i+"-content-wrapper",o);if(this._contentNode=Vt("div",i+"-content",c),Or(o),ol(this._contentNode),ie(o,"contextmenu",is),this._tipContainer=Vt("div",i+"-tip-container",o),this._tip=Vt("div",i+"-tip",this._tipContainer),this.options.closeButton){var f=this._closeButton=Vt("a",i+"-close-button",o);f.setAttribute("role","button"),f.setAttribute("aria-label","Close popup"),f.href="#close",f.innerHTML='<span aria-hidden="true">&#215;</span>',ie(f,"click",function(x){Qe(x),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,o=i.style;o.width="",o.whiteSpace="nowrap";var c=i.offsetWidth;c=Math.min(c,this.options.maxWidth),c=Math.max(c,this.options.minWidth),o.width=c+1+"px",o.whiteSpace="",o.height="";var f=i.offsetHeight,x=this.options.maxHeight,A="leaflet-popup-scrolled";x&&f>x?(o.height=x+"px",$t(i,A)):we(i,A),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),c=this._getAnchor();Fe(this._container,o.add(c))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,o=parseInt(fi(this._container,"marginBottom"),10)||0,c=this._container.offsetHeight+o,f=this._containerWidth,x=new F(this._containerLeft,-c-this._containerBottom);x._add(ns(this._container));var A=i.layerPointToContainerPoint(x),H=Z(this.options.autoPanPadding),j=Z(this.options.autoPanPaddingTopLeft||H),et=Z(this.options.autoPanPaddingBottomRight||H),gt=i.getSize(),Ct=0,Yt=0;A.x+f+et.x>gt.x&&(Ct=A.x+f-gt.x+et.x),A.x-Ct-j.x<0&&(Ct=A.x-j.x),A.y+c+et.y>gt.y&&(Yt=A.y+c-gt.y+et.y),A.y-Yt-j.y<0&&(Yt=A.y-j.y),(Ct||Yt)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([Ct,Yt]))}},_getAnchor:function(){return Z(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Yp=function(i,o){return new Uo(i,o)};pe.mergeOptions({closePopupOnClick:!0}),pe.include({openPopup:function(i,o,c){return this._initOverlay(Uo,i,o,c).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),Gn.include({bindPopup:function(i,o){return this._popup=this._initOverlay(Uo,this._popup,i,o),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof pi||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){ss(i);var o=i.layer||i.target;if(this._popup._source===o&&!(o instanceof Oi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=o,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var ko=si.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){si.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){si.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=si.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",o=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Vt("div",o),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var o,c,f=this._map,x=this._container,A=f.latLngToContainerPoint(f.getCenter()),H=f.layerPointToContainerPoint(i),j=this.options.direction,et=x.offsetWidth,gt=x.offsetHeight,Ct=Z(this.options.offset),Yt=this._getAnchor();j==="top"?(o=et/2,c=gt):j==="bottom"?(o=et/2,c=0):j==="center"?(o=et/2,c=gt/2):j==="right"?(o=0,c=gt/2):j==="left"?(o=et,c=gt/2):H.x<A.x?(j="right",o=0,c=gt/2):(j="left",o=et+(Ct.x+Yt.x)*2,c=gt/2),i=i.subtract(Z(o,c,!0)).add(Ct).add(Yt),we(x,"leaflet-tooltip-right"),we(x,"leaflet-tooltip-left"),we(x,"leaflet-tooltip-top"),we(x,"leaflet-tooltip-bottom"),$t(x,"leaflet-tooltip-"+j),Fe(x,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&vn(this._container,i)},_animateZoom:function(i){var o=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(o)},_getAnchor:function(){return Z(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),jp=function(i,o){return new ko(i,o)};pe.include({openTooltip:function(i,o,c){return this._initOverlay(ko,i,o,c).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),Gn.include({bindTooltip:function(i,o){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(ko,this._tooltip,i,o),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var o=i?"off":"on",c={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?c.add=this._openTooltip:(c.mouseover=this._openTooltip,c.mouseout=this.closeTooltip,c.click=this._openTooltip,this._map?this._addFocusListeners():c.add=this._addFocusListeners),this._tooltip.options.sticky&&(c.mousemove=this._moveTooltip),this[o](c),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof pi||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var o=typeof i.getElement=="function"&&i.getElement();o&&(ie(o,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),ie(o,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var o=typeof i.getElement=="function"&&i.getElement();o&&o.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var o=this;this._map.once("moveend",function(){o._openOnceFlag=!1,o._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var o=i.latlng,c,f;this._tooltip.options.sticky&&i.originalEvent&&(c=this._map.mouseEventToContainerPoint(i.originalEvent),f=this._map.containerPointToLayerPoint(c),o=this._map.layerPointToLatLng(f)),this._tooltip.setLatLng(o)}});var wu=Ps.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var o=i&&i.tagName==="DIV"?i:document.createElement("div"),c=this.options;if(c.html instanceof Element?(ts(o),o.appendChild(c.html)):o.innerHTML=c.html!==!1?c.html:"",c.bgPos){var f=Z(c.bgPos);o.style.backgroundPosition=-f.x+"px "+-f.y+"px"}return this._setIconStyles(o,"icon"),o},createShadow:function(){return null}});function Kp(i){return new wu(i)}Ps.Default=Br;var Fr=Gn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:zt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){w(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),ge(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Rn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ei(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof F?i:new F(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var o=this.getPane().children,c=-i(-1/0,1/0),f=0,x=o.length,A;f<x;f++)A=o[f].style.zIndex,o[f]!==this._container&&A&&(c=i(c,+A));isFinite(c)&&(this.options.zIndex=c+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!zt.ielt9){vn(this._container,this.options.opacity);var i=+new Date,o=!1,c=!1;for(var f in this._tiles){var x=this._tiles[f];if(!(!x.current||!x.loaded)){var A=Math.min(1,(i-x.loaded)/200);vn(x.el,A),A<1?o=!0:(x.active?c=!0:this._onOpaqueTile(x),x.active=!0)}}c&&!this._noPrune&&this._pruneTiles(),o&&(q(this._fadeFrame),this._fadeFrame=z(this._updateOpacity,this))}},_onOpaqueTile:m,_initContainer:function(){this._container||(this._container=Vt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,o=this.options.maxZoom;if(i!==void 0){for(var c in this._levels)c=Number(c),this._levels[c].el.children.length||c===i?(this._levels[c].el.style.zIndex=o-Math.abs(i-c),this._onUpdateLevel(c)):(ge(this._levels[c].el),this._removeTilesAtZoom(c),this._onRemoveLevel(c),delete this._levels[c]);var f=this._levels[i],x=this._map;return f||(f=this._levels[i]={},f.el=Vt("div","leaflet-tile-container leaflet-zoom-animated",this._container),f.el.style.zIndex=o,f.origin=x.project(x.unproject(x.getPixelOrigin()),i).round(),f.zoom=i,this._setZoomTransform(f,x.getCenter(),x.getZoom()),m(f.el.offsetWidth),this._onCreateLevel(f)),this._level=f,f}},_onUpdateLevel:m,_onRemoveLevel:m,_onCreateLevel:m,_pruneTiles:function(){if(this._map){var i,o,c=this._map.getZoom();if(c>this.options.maxZoom||c<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)o=this._tiles[i],o.retain=o.current;for(i in this._tiles)if(o=this._tiles[i],o.current&&!o.active){var f=o.coords;this._retainParent(f.x,f.y,f.z,f.z-5)||this._retainChildren(f.x,f.y,f.z,f.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var o in this._tiles)this._tiles[o].coords.z===i&&this._removeTile(o)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)ge(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,o,c,f){var x=Math.floor(i/2),A=Math.floor(o/2),H=c-1,j=new F(+x,+A);j.z=+H;var et=this._tileCoordsToKey(j),gt=this._tiles[et];return gt&&gt.active?(gt.retain=!0,!0):(gt&&gt.loaded&&(gt.retain=!0),H>f?this._retainParent(x,A,H,f):!1)},_retainChildren:function(i,o,c,f){for(var x=2*i;x<2*i+2;x++)for(var A=2*o;A<2*o+2;A++){var H=new F(x,A);H.z=c+1;var j=this._tileCoordsToKey(H),et=this._tiles[j];if(et&&et.active){et.retain=!0;continue}else et&&et.loaded&&(et.retain=!0);c+1<f&&this._retainChildren(x,A,c+1,f)}},_resetView:function(i){var o=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),o,o)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var o=this.options;return o.minNativeZoom!==void 0&&i<o.minNativeZoom?o.minNativeZoom:o.maxNativeZoom!==void 0&&o.maxNativeZoom<i?o.maxNativeZoom:i},_setView:function(i,o,c,f){var x=Math.round(o);this.options.maxZoom!==void 0&&x>this.options.maxZoom||this.options.minZoom!==void 0&&x<this.options.minZoom?x=void 0:x=this._clampZoom(x);var A=this.options.updateWhenZooming&&x!==this._tileZoom;(!f||A)&&(this._tileZoom=x,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),x!==void 0&&this._update(i),c||this._pruneTiles(),this._noPrune=!!c),this._setZoomTransforms(i,o)},_setZoomTransforms:function(i,o){for(var c in this._levels)this._setZoomTransform(this._levels[c],i,o)},_setZoomTransform:function(i,o,c){var f=this._map.getZoomScale(c,i.zoom),x=i.origin.multiplyBy(f).subtract(this._map._getNewPixelOrigin(o,c)).round();zt.any3d?es(i.el,x,f):Fe(i.el,x)},_resetGrid:function(){var i=this._map,o=i.options.crs,c=this._tileSize=this.getTileSize(),f=this._tileZoom,x=this._map.getPixelWorldBounds(this._tileZoom);x&&(this._globalTileRange=this._pxBoundsToTileRange(x)),this._wrapX=o.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,o.wrapLng[0]],f).x/c.x),Math.ceil(i.project([0,o.wrapLng[1]],f).x/c.y)],this._wrapY=o.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([o.wrapLat[0],0],f).y/c.x),Math.ceil(i.project([o.wrapLat[1],0],f).y/c.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var o=this._map,c=o._animatingZoom?Math.max(o._animateToZoom,o.getZoom()):o.getZoom(),f=o.getZoomScale(c,this._tileZoom),x=o.project(i,this._tileZoom).floor(),A=o.getSize().divideBy(f*2);return new dt(x.subtract(A),x.add(A))},_update:function(i){var o=this._map;if(o){var c=this._clampZoom(o.getZoom());if(i===void 0&&(i=o.getCenter()),this._tileZoom!==void 0){var f=this._getTiledPixelBounds(i),x=this._pxBoundsToTileRange(f),A=x.getCenter(),H=[],j=this.options.keepBuffer,et=new dt(x.getBottomLeft().subtract([j,-j]),x.getTopRight().add([j,-j]));if(!(isFinite(x.min.x)&&isFinite(x.min.y)&&isFinite(x.max.x)&&isFinite(x.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var gt in this._tiles){var Ct=this._tiles[gt].coords;(Ct.z!==this._tileZoom||!et.contains(new F(Ct.x,Ct.y)))&&(this._tiles[gt].current=!1)}if(Math.abs(c-this._tileZoom)>1){this._setView(i,c);return}for(var Yt=x.min.y;Yt<=x.max.y;Yt++)for(var ce=x.min.x;ce<=x.max.x;ce++){var dn=new F(ce,Yt);if(dn.z=this._tileZoom,!!this._isValidTile(dn)){var Xe=this._tiles[this._tileCoordsToKey(dn)];Xe?Xe.current=!0:H.push(dn)}}if(H.sort(function(yn,Ds){return yn.distanceTo(A)-Ds.distanceTo(A)}),H.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Dn=document.createDocumentFragment();for(ce=0;ce<H.length;ce++)this._addTile(H[ce],Dn);this._level.el.appendChild(Dn)}}}},_isValidTile:function(i){var o=this._map.options.crs;if(!o.infinite){var c=this._globalTileRange;if(!o.wrapLng&&(i.x<c.min.x||i.x>c.max.x)||!o.wrapLat&&(i.y<c.min.y||i.y>c.max.y))return!1}if(!this.options.bounds)return!0;var f=this._tileCoordsToBounds(i);return K(this.options.bounds).overlaps(f)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var o=this._map,c=this.getTileSize(),f=i.scaleBy(c),x=f.add(c),A=o.unproject(f,i.z),H=o.unproject(x,i.z);return[A,H]},_tileCoordsToBounds:function(i){var o=this._tileCoordsToNwSe(i),c=new Dt(o[0],o[1]);return this.options.noWrap||(c=this._map.wrapLatLngBounds(c)),c},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var o=i.split(":"),c=new F(+o[0],+o[1]);return c.z=+o[2],c},_removeTile:function(i){var o=this._tiles[i];o&&(ge(o.el),delete this._tiles[i],this.fire("tileunload",{tile:o.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){$t(i,"leaflet-tile");var o=this.getTileSize();i.style.width=o.x+"px",i.style.height=o.y+"px",i.onselectstart=m,i.onmousemove=m,zt.ielt9&&this.options.opacity<1&&vn(i,this.options.opacity)},_addTile:function(i,o){var c=this._getTilePos(i),f=this._tileCoordsToKey(i),x=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(x),this.createTile.length<2&&z(l(this._tileReady,this,i,null,x)),Fe(x,c),this._tiles[f]={el:x,coords:i,current:!0},o.appendChild(x),this.fire("tileloadstart",{tile:x,coords:i})},_tileReady:function(i,o,c){o&&this.fire("tileerror",{error:o,tile:c,coords:i});var f=this._tileCoordsToKey(i);c=this._tiles[f],c&&(c.loaded=+new Date,this._map._fadeAnimated?(vn(c.el,0),q(this._fadeFrame),this._fadeFrame=z(this._updateOpacity,this)):(c.active=!0,this._pruneTiles()),o||($t(c.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:c.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),zt.ielt9||!this._map._fadeAnimated?z(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var o=new F(this._wrapX?p(i.x,this._wrapX):i.x,this._wrapY?p(i.y,this._wrapY):i.y);return o.z=i.z,o},_pxBoundsToTileRange:function(i){var o=this.getTileSize();return new dt(i.min.unscaleBy(o).floor(),i.max.unscaleBy(o).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function Jp(i){return new Fr(i)}var Is=Fr.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,o){this._url=i,o=w(this,o),o.detectRetina&&zt.retina&&o.maxZoom>0?(o.tileSize=Math.floor(o.tileSize/2),o.zoomReverse?(o.zoomOffset--,o.minZoom=Math.min(o.maxZoom,o.minZoom+1)):(o.zoomOffset++,o.maxZoom=Math.max(o.minZoom,o.maxZoom-1)),o.minZoom=Math.max(0,o.minZoom)):o.zoomReverse?o.minZoom=Math.min(o.maxZoom,o.minZoom):o.maxZoom=Math.max(o.minZoom,o.maxZoom),typeof o.subdomains=="string"&&(o.subdomains=o.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,o){return this._url===i&&o===void 0&&(o=!0),this._url=i,o||this.redraw(),this},createTile:function(i,o){var c=document.createElement("img");return ie(c,"load",l(this._tileOnLoad,this,o,c)),ie(c,"error",l(this._tileOnError,this,o,c)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(c.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(c.referrerPolicy=this.options.referrerPolicy),c.alt="",c.src=this.getTileUrl(i),c},getTileUrl:function(i){var o={r:zt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var c=this._globalTileRange.max.y-i.y;this.options.tms&&(o.y=c),o["-y"]=c}return D(this._url,r(o,this.options))},_tileOnLoad:function(i,o){zt.ielt9?setTimeout(l(i,this,null,o),0):i(null,o)},_tileOnError:function(i,o,c){var f=this.options.errorTileUrl;f&&o.getAttribute("src")!==f&&(o.src=f),i(c,o)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,o=this.options.maxZoom,c=this.options.zoomReverse,f=this.options.zoomOffset;return c&&(i=o-i),i+f},_getSubdomain:function(i){var o=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[o]},_abortLoading:function(){var i,o;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(o=this._tiles[i].el,o.onload=m,o.onerror=m,!o.complete)){o.src=B;var c=this._tiles[i].coords;ge(o),delete this._tiles[i],this.fire("tileabort",{tile:o,coords:c})}},_removeTile:function(i){var o=this._tiles[i];if(o)return o.el.setAttribute("src",B),Fr.prototype._removeTile.call(this,i)},_tileReady:function(i,o,c){if(!(!this._map||c&&c.getAttribute("src")===B))return Fr.prototype._tileReady.call(this,i,o,c)}});function Eu(i,o){return new Is(i,o)}var Tu=Is.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,o){this._url=i;var c=r({},this.defaultWmsParams);for(var f in o)f in this.options||(c[f]=o[f]);o=w(this,o);var x=o.detectRetina&&zt.retina?2:1,A=this.getTileSize();c.width=A.x*x,c.height=A.y*x,this.wmsParams=c},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var o=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[o]=this._crs.code,Is.prototype.onAdd.call(this,i)},getTileUrl:function(i){var o=this._tileCoordsToNwSe(i),c=this._crs,f=bt(c.project(o[0]),c.project(o[1])),x=f.min,A=f.max,H=(this._wmsVersion>=1.3&&this._crs===vu?[x.y,x.x,A.y,A.x]:[x.x,x.y,A.x,A.y]).join(","),j=Is.prototype.getTileUrl.call(this,i);return j+v(this.wmsParams,j,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+H},setParams:function(i,o){return r(this.wmsParams,i),o||this.redraw(),this}});function Qp(i,o){return new Tu(i,o)}Is.WMS=Tu,Eu.wms=Qp;var _i=Gn.extend({options:{padding:.1},initialize:function(i){w(this,i),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),$t(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,o){var c=this._map.getZoomScale(o,this._zoom),f=this._map.getSize().multiplyBy(.5+this.options.padding),x=this._map.project(this._center,o),A=f.multiplyBy(-c).add(x).subtract(this._map._getNewPixelOrigin(i,o));zt.any3d?es(this._container,A,c):Fe(this._container,A)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,o=this._map.getSize(),c=this._map.containerPointToLayerPoint(o.multiplyBy(-i)).round();this._bounds=new dt(c,c.add(o.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Au=_i.extend({options:{tolerance:0},getEvents:function(){var i=_i.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){_i.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");ie(i,"mousemove",this._onMouseMove,this),ie(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),ie(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){q(this._redrawRequest),delete this._ctx,ge(this._container),Se(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var o in this._layers)i=this._layers[o],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){_i.prototype._update.call(this);var i=this._bounds,o=this._container,c=i.getSize(),f=zt.retina?2:1;Fe(o,i.min),o.width=f*c.x,o.height=f*c.y,o.style.width=c.x+"px",o.style.height=c.y+"px",zt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){_i.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[h(i)]=i;var o=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=o),this._drawLast=o,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var o=i._order,c=o.next,f=o.prev;c?c.prev=f:this._drawLast=f,f?f.next=c:this._drawFirst=c,delete i._order,delete this._layers[h(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var o=i.options.dashArray.split(/[, ]+/),c=[],f,x;for(x=0;x<o.length;x++){if(f=Number(o[x]),isNaN(f))return;c.push(f)}i.options._dashArray=c}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||z(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var o=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new dt,this._redrawBounds.extend(i._pxBounds.min.subtract([o,o])),this._redrawBounds.extend(i._pxBounds.max.add([o,o]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var o=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,o.x,o.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,o=this._redrawBounds;if(this._ctx.save(),o){var c=o.getSize();this._ctx.beginPath(),this._ctx.rect(o.min.x,o.min.y,c.x,c.y),this._ctx.clip()}this._drawing=!0;for(var f=this._drawFirst;f;f=f.next)i=f.layer,(!o||i._pxBounds&&i._pxBounds.intersects(o))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,o){if(this._drawing){var c,f,x,A,H=i._parts,j=H.length,et=this._ctx;if(j){for(et.beginPath(),c=0;c<j;c++){for(f=0,x=H[c].length;f<x;f++)A=H[c][f],et[f?"lineTo":"moveTo"](A.x,A.y);o&&et.closePath()}this._fillStroke(et,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var o=i._point,c=this._ctx,f=Math.max(Math.round(i._radius),1),x=(Math.max(Math.round(i._radiusY),1)||f)/f;x!==1&&(c.save(),c.scale(1,x)),c.beginPath(),c.arc(o.x,o.y/x,f,0,Math.PI*2,!1),x!==1&&c.restore(),this._fillStroke(c,i)}},_fillStroke:function(i,o){var c=o.options;c.fill&&(i.globalAlpha=c.fillOpacity,i.fillStyle=c.fillColor||c.color,i.fill(c.fillRule||"evenodd")),c.stroke&&c.weight!==0&&(i.setLineDash&&i.setLineDash(o.options&&o.options._dashArray||[]),i.globalAlpha=c.opacity,i.lineWidth=c.weight,i.strokeStyle=c.color,i.lineCap=c.lineCap,i.lineJoin=c.lineJoin,i.stroke())},_onClick:function(i){for(var o=this._map.mouseEventToLayerPoint(i),c,f,x=this._drawFirst;x;x=x.next)c=x.layer,c.options.interactive&&c._containsPoint(o)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(c))&&(f=c);this._fireEvent(f?[f]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var o=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,o)}},_handleMouseOut:function(i){var o=this._hoveredLayer;o&&(we(this._container,"leaflet-interactive"),this._fireEvent([o],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,o){if(!this._mouseHoverThrottled){for(var c,f,x=this._drawFirst;x;x=x.next)c=x.layer,c.options.interactive&&c._containsPoint(o)&&(f=c);f!==this._hoveredLayer&&(this._handleMouseOut(i),f&&($t(this._container,"leaflet-interactive"),this._fireEvent([f],i,"mouseover"),this._hoveredLayer=f)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,o,c){this._map._fireDOMEvent(o,c||o.type,i)},_bringToFront:function(i){var o=i._order;if(o){var c=o.next,f=o.prev;if(c)c.prev=f;else return;f?f.next=c:c&&(this._drawFirst=c),o.prev=this._drawLast,this._drawLast.next=o,o.next=null,this._drawLast=o,this._requestRedraw(i)}},_bringToBack:function(i){var o=i._order;if(o){var c=o.next,f=o.prev;if(f)f.next=c;else return;c?c.prev=f:f&&(this._drawLast=f),o.prev=null,o.next=this._drawFirst,this._drawFirst.prev=o,this._drawFirst=o,this._requestRedraw(i)}}});function Lu(i){return zt.canvas?new Au(i):null}var zr=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),tm={_initContainer:function(){this._container=Vt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(_i.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var o=i._container=zr("shape");$t(o,"leaflet-vml-shape "+(this.options.className||"")),o.coordsize="1 1",i._path=zr("path"),o.appendChild(i._path),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){var o=i._container;this._container.appendChild(o),i.options.interactive&&i.addInteractiveTarget(o)},_removePath:function(i){var o=i._container;ge(o),i.removeInteractiveTarget(o),delete this._layers[h(i)]},_updateStyle:function(i){var o=i._stroke,c=i._fill,f=i.options,x=i._container;x.stroked=!!f.stroke,x.filled=!!f.fill,f.stroke?(o||(o=i._stroke=zr("stroke")),x.appendChild(o),o.weight=f.weight+"px",o.color=f.color,o.opacity=f.opacity,f.dashArray?o.dashStyle=b(f.dashArray)?f.dashArray.join(" "):f.dashArray.replace(/( *, *)/g," "):o.dashStyle="",o.endcap=f.lineCap.replace("butt","flat"),o.joinstyle=f.lineJoin):o&&(x.removeChild(o),i._stroke=null),f.fill?(c||(c=i._fill=zr("fill")),x.appendChild(c),c.color=f.fillColor||f.color,c.opacity=f.fillOpacity):c&&(x.removeChild(c),i._fill=null)},_updateCircle:function(i){var o=i._point.round(),c=Math.round(i._radius),f=Math.round(i._radiusY||c);this._setPath(i,i._empty()?"M0 0":"AL "+o.x+","+o.y+" "+c+","+f+" 0,"+65535*360)},_setPath:function(i,o){i._path.v=o},_bringToFront:function(i){Rn(i._container)},_bringToBack:function(i){ei(i._container)}},Bo=zt.vml?zr:vt,Hr=_i.extend({_initContainer:function(){this._container=Bo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Bo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ge(this._container),Se(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){_i.prototype._update.call(this);var i=this._bounds,o=i.getSize(),c=this._container;(!this._svgSize||!this._svgSize.equals(o))&&(this._svgSize=o,c.setAttribute("width",o.x),c.setAttribute("height",o.y)),Fe(c,i.min),c.setAttribute("viewBox",[i.min.x,i.min.y,o.x,o.y].join(" ")),this.fire("update")}},_initPath:function(i){var o=i._path=Bo("path");i.options.className&&$t(o,i.options.className),i.options.interactive&&$t(o,"leaflet-interactive"),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){ge(i._path),i.removeInteractiveTarget(i._path),delete this._layers[h(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var o=i._path,c=i.options;o&&(c.stroke?(o.setAttribute("stroke",c.color),o.setAttribute("stroke-opacity",c.opacity),o.setAttribute("stroke-width",c.weight),o.setAttribute("stroke-linecap",c.lineCap),o.setAttribute("stroke-linejoin",c.lineJoin),c.dashArray?o.setAttribute("stroke-dasharray",c.dashArray):o.removeAttribute("stroke-dasharray"),c.dashOffset?o.setAttribute("stroke-dashoffset",c.dashOffset):o.removeAttribute("stroke-dashoffset")):o.setAttribute("stroke","none"),c.fill?(o.setAttribute("fill",c.fillColor||c.color),o.setAttribute("fill-opacity",c.fillOpacity),o.setAttribute("fill-rule",c.fillRule||"evenodd")):o.setAttribute("fill","none"))},_updatePoly:function(i,o){this._setPath(i,xt(i._parts,o))},_updateCircle:function(i){var o=i._point,c=Math.max(Math.round(i._radius),1),f=Math.max(Math.round(i._radiusY),1)||c,x="a"+c+","+f+" 0 1,0 ",A=i._empty()?"M0 0":"M"+(o.x-c)+","+o.y+x+c*2+",0 "+x+-c*2+",0 ";this._setPath(i,A)},_setPath:function(i,o){i._path.setAttribute("d",o)},_bringToFront:function(i){Rn(i._path)},_bringToBack:function(i){ei(i._path)}});zt.vml&&Hr.include(tm);function Pu(i){return zt.svg||zt.vml?new Hr(i):null}pe.include({getRenderer:function(i){var o=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return o||(o=this._renderer=this._createRenderer()),this.hasLayer(o)||this.addLayer(o),o},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var o=this._paneRenderers[i];return o===void 0&&(o=this._createRenderer({pane:i}),this._paneRenderers[i]=o),o},_createRenderer:function(i){return this.options.preferCanvas&&Lu(i)||Pu(i)}});var Cu=Cs.extend({initialize:function(i,o){Cs.prototype.initialize.call(this,this._boundsToLatLngs(i),o)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=K(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function em(i,o){return new Cu(i,o)}Hr.create=Bo,Hr.pointsToPath=xt,gi.geometryToLayer=Ro,gi.coordsToLatLng=ml,gi.coordsToLatLngs=Io,gi.latLngToCoords=gl,gi.latLngsToCoords=Do,gi.getFeature=Rs,gi.asFeature=No,pe.mergeOptions({boxZoom:!0});var Ru=ii.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){ie(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Se(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ge(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Ir(),Ja(),this._startPoint=this._map.mouseEventToContainerPoint(i),ie(document,{contextmenu:ss,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Vt("div","leaflet-zoom-box",this._container),$t(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var o=new dt(this._point,this._startPoint),c=o.getSize();Fe(this._box,o.min),this._box.style.width=c.x+"px",this._box.style.height=c.y+"px"},_finish:function(){this._moved&&(ge(this._box),we(this._container,"leaflet-crosshair")),Dr(),Qa(),Se(document,{contextmenu:ss,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var o=new Dt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(o).fire("boxzoomend",{boxZoomBounds:o})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});pe.addInitHook("addHandler","boxZoom",Ru),pe.mergeOptions({doubleClickZoom:!0});var Iu=ii.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var o=this._map,c=o.getZoom(),f=o.options.zoomDelta,x=i.originalEvent.shiftKey?c-f:c+f;o.options.doubleClickZoom==="center"?o.setZoom(x):o.setZoomAround(i.containerPoint,x)}});pe.addInitHook("addHandler","doubleClickZoom",Iu),pe.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var Du=ii.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new Ni(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}$t(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){we(this._map._container,"leaflet-grab"),we(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var o=K(this._map.options.maxBounds);this._offsetLimit=bt(this._map.latLngToContainerPoint(o.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(o.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var o=this._lastTime=+new Date,c=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(c),this._times.push(o),this._prunePositions(o)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),o=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=o.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,o){return i-(i-o)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),o=this._offsetLimit;i.x<o.min.x&&(i.x=this._viscousLimit(i.x,o.min.x)),i.y<o.min.y&&(i.y=this._viscousLimit(i.y,o.min.y)),i.x>o.max.x&&(i.x=this._viscousLimit(i.x,o.max.x)),i.y>o.max.y&&(i.y=this._viscousLimit(i.y,o.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,o=Math.round(i/2),c=this._initialWorldOffset,f=this._draggable._newPos.x,x=(f-o+c)%i+o-c,A=(f+o+c)%i-o-c,H=Math.abs(x+c)<Math.abs(A+c)?x:A;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=H},_onDragEnd:function(i){var o=this._map,c=o.options,f=!c.inertia||i.noInertia||this._times.length<2;if(o.fire("dragend",i),f)o.fire("moveend");else{this._prunePositions(+new Date);var x=this._lastPos.subtract(this._positions[0]),A=(this._lastTime-this._times[0])/1e3,H=c.easeLinearity,j=x.multiplyBy(H/A),et=j.distanceTo([0,0]),gt=Math.min(c.inertiaMaxSpeed,et),Ct=j.multiplyBy(gt/et),Yt=gt/(c.inertiaDeceleration*H),ce=Ct.multiplyBy(-Yt/2).round();!ce.x&&!ce.y?o.fire("moveend"):(ce=o._limitOffset(ce,o.options.maxBounds),z(function(){o.panBy(ce,{duration:Yt,easeLinearity:H,noMoveStart:!0,animate:!0})}))}}});pe.addInitHook("addHandler","dragging",Du),pe.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Nu=ii.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),ie(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Se(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,o=document.documentElement,c=i.scrollTop||o.scrollTop,f=i.scrollLeft||o.scrollLeft;this._map._container.focus(),window.scrollTo(f,c)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var o=this._panKeys={},c=this.keyCodes,f,x;for(f=0,x=c.left.length;f<x;f++)o[c.left[f]]=[-1*i,0];for(f=0,x=c.right.length;f<x;f++)o[c.right[f]]=[i,0];for(f=0,x=c.down.length;f<x;f++)o[c.down[f]]=[0,i];for(f=0,x=c.up.length;f<x;f++)o[c.up[f]]=[0,-1*i]},_setZoomDelta:function(i){var o=this._zoomKeys={},c=this.keyCodes,f,x;for(f=0,x=c.zoomIn.length;f<x;f++)o[c.zoomIn[f]]=i;for(f=0,x=c.zoomOut.length;f<x;f++)o[c.zoomOut[f]]=-i},_addHooks:function(){ie(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Se(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var o=i.keyCode,c=this._map,f;if(o in this._panKeys){if(!c._panAnim||!c._panAnim._inProgress)if(f=this._panKeys[o],i.shiftKey&&(f=Z(f).multiplyBy(3)),c.options.maxBounds&&(f=c._limitOffset(Z(f),c.options.maxBounds)),c.options.worldCopyJump){var x=c.wrapLatLng(c.unproject(c.project(c.getCenter()).add(f)));c.panTo(x)}else c.panBy(f)}else if(o in this._zoomKeys)c.setZoom(c.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[o]);else if(o===27&&c._popup&&c._popup.options.closeOnEscapeKey)c.closePopup();else return;ss(i)}}});pe.addInitHook("addHandler","keyboard",Nu),pe.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Ou=ii.extend({addHooks:function(){ie(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Se(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var o=ru(i),c=this._map.options.wheelDebounceTime;this._delta+=o,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var f=Math.max(c-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),f),ss(i)},_performZoom:function(){var i=this._map,o=i.getZoom(),c=this._map.options.zoomSnap||0;i._stop();var f=this._delta/(this._map.options.wheelPxPerZoomLevel*4),x=4*Math.log(2/(1+Math.exp(-Math.abs(f))))/Math.LN2,A=c?Math.ceil(x/c)*c:x,H=i._limitZoom(o+(this._delta>0?A:-A))-o;this._delta=0,this._startTime=null,H&&(i.options.scrollWheelZoom==="center"?i.setZoom(o+H):i.setZoomAround(this._lastMousePos,o+H))}});pe.addInitHook("addHandler","scrollWheelZoom",Ou);var nm=600;pe.mergeOptions({tapHold:zt.touchNative&&zt.safari&&zt.mobile,tapTolerance:15});var Uu=ii.extend({addHooks:function(){ie(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Se(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var o=i.touches[0];this._startPos=this._newPos=new F(o.clientX,o.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(ie(document,"touchend",Qe),ie(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",o))},this),nm),ie(document,"touchend touchcancel contextmenu",this._cancel,this),ie(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){Se(document,"touchend",Qe),Se(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),Se(document,"touchend touchcancel contextmenu",this._cancel,this),Se(document,"touchmove",this._onMove,this)},_onMove:function(i){var o=i.touches[0];this._newPos=new F(o.clientX,o.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,o){var c=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:o.screenX,screenY:o.screenY,clientX:o.clientX,clientY:o.clientY});c._simulated=!0,o.target.dispatchEvent(c)}});pe.addInitHook("addHandler","tapHold",Uu),pe.mergeOptions({touchZoom:zt.touch,bounceAtZoomLimits:!0});var ku=ii.extend({addHooks:function(){$t(this._map._container,"leaflet-touch-zoom"),ie(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){we(this._map._container,"leaflet-touch-zoom"),Se(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var o=this._map;if(!(!i.touches||i.touches.length!==2||o._animatingZoom||this._zooming)){var c=o.mouseEventToContainerPoint(i.touches[0]),f=o.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=o.getSize()._divideBy(2),this._startLatLng=o.containerPointToLatLng(this._centerPoint),o.options.touchZoom!=="center"&&(this._pinchStartLatLng=o.containerPointToLatLng(c.add(f)._divideBy(2))),this._startDist=c.distanceTo(f),this._startZoom=o.getZoom(),this._moved=!1,this._zooming=!0,o._stop(),ie(document,"touchmove",this._onTouchMove,this),ie(document,"touchend touchcancel",this._onTouchEnd,this),Qe(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var o=this._map,c=o.mouseEventToContainerPoint(i.touches[0]),f=o.mouseEventToContainerPoint(i.touches[1]),x=c.distanceTo(f)/this._startDist;if(this._zoom=o.getScaleZoom(x,this._startZoom),!o.options.bounceAtZoomLimits&&(this._zoom<o.getMinZoom()&&x<1||this._zoom>o.getMaxZoom()&&x>1)&&(this._zoom=o._limitZoom(this._zoom)),o.options.touchZoom==="center"){if(this._center=this._startLatLng,x===1)return}else{var A=c._add(f)._divideBy(2)._subtract(this._centerPoint);if(x===1&&A.x===0&&A.y===0)return;this._center=o.unproject(o.project(this._pinchStartLatLng,this._zoom).subtract(A),this._zoom)}this._moved||(o._moveStart(!0,!1),this._moved=!0),q(this._animRequest);var H=l(o._move,o,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=z(H,this,!0),Qe(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,q(this._animRequest),Se(document,"touchmove",this._onTouchMove,this),Se(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});pe.addInitHook("addHandler","touchZoom",ku),pe.BoxZoom=Ru,pe.DoubleClickZoom=Iu,pe.Drag=Du,pe.Keyboard=Nu,pe.ScrollWheelZoom=Ou,pe.TapHold=Uu,pe.TouchZoom=ku,e.Bounds=dt,e.Browser=zt,e.CRS=yt,e.Canvas=Au,e.Circle=pl,e.CircleMarker=Co,e.Class=W,e.Control=Vn,e.DivIcon=wu,e.DivOverlay=si,e.DomEvent=xp,e.DomUtil=vp,e.Draggable=Ni,e.Evented=ht,e.FeatureGroup=pi,e.GeoJSON=gi,e.GridLayer=Fr,e.Handler=ii,e.Icon=Ps,e.ImageOverlay=Oo,e.LatLng=ct,e.LatLngBounds=Dt,e.Layer=Gn,e.LayerGroup=Ls,e.LineUtil=Dp,e.Map=pe,e.Marker=Po,e.Mixin=Ap,e.Path=Oi,e.Point=F,e.PolyUtil=Lp,e.Polygon=Cs,e.Polyline=mi,e.Popup=Uo,e.PosAnimation=ou,e.Projection=Np,e.Rectangle=Cu,e.Renderer=_i,e.SVG=Hr,e.SVGOverlay=Su,e.TileLayer=Is,e.Tooltip=ko,e.Transformation=G,e.Util=k,e.VideoOverlay=bu,e.bind=l,e.bounds=bt,e.canvas=Lu,e.circle=Vp,e.circleMarker=Hp,e.control=Ur,e.divIcon=Kp,e.extend=r,e.featureGroup=Bp,e.geoJSON=Mu,e.geoJson=Zp,e.gridLayer=Jp,e.icon=Fp,e.imageOverlay=Xp,e.latLng=pt,e.latLngBounds=K,e.layerGroup=kp,e.map=Mp,e.marker=zp,e.point=Z,e.polygon=Wp,e.polyline=Gp,e.popup=Yp,e.rectangle=em,e.setOptions=w,e.stamp=h,e.svg=Pu,e.svgOverlay=$p,e.tileLayer=Eu,e.tooltip=jp,e.transformation=it,e.version=n,e.videoOverlay=qp;var im=window.L;e.noConflict=function(){return window.L=im,this},window.L=e})})(ac,ac.exports);var mm=ac.exports;const Te=pm(mm),It={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};let mo=null,Bt,je=null,Pn=null,Ti=null,Ue=null,Oe=null,On=[],tn=[],$e=null,pn=null,Vr=null,rr="none",Ns=[];const gm={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function _m(s){s&&(mo=s);const t=Te.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Te.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Te.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),r=Te.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),a=Te.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Bt=Te.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Te.control.zoom({position:"topright"}).addTo(Bt),Te.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:r,Voyager:a,"IGN (France)":n},{},{position:"topright"}).addTo(Bt),new ResizeObserver(()=>Bt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Bt.invalidateSize(),300),Sm(),xm(),wm(),Em(),bm()}function Hu(s,t){return[[s.lat,s.lng],[s.lat,t.lng],[t.lat,t.lng],[t.lat,s.lng]]}function Vu(s,t){const e=(s.lat+t.lat)/2,n=Math.abs(t.lat-s.lat)*111320,r=Math.abs(t.lng-s.lng)*111320*Math.cos(e*Math.PI/180),a=Math.min(n,r),l=a/111320,u=a/(111320*Math.cos(e*Math.PI/180)),h=Math.min(s.lat,t.lat),d=Math.min(s.lng,t.lng);return[[h,d],[h,d+u],[h+l,d+u],[h+l,d]]}function Gu(s,t,e=80){const n=s.distanceTo(t);return Array.from({length:e},(r,a)=>{const l=a/e*Math.PI*2;return[s.lat+n*Math.cos(l)/111320,s.lng+n*Math.sin(l)/(111320*Math.cos(s.lat*Math.PI/180))]})}function Wu(s,t){const e=s.distanceTo(t);return Array.from({length:6},(n,r)=>{const a=r/6*Math.PI*2-Math.PI/6;return[s.lat+e*Math.cos(a)/111320,s.lng+e*Math.sin(a)/(111320*Math.cos(s.lat*Math.PI/180))]})}function Yd(s){Ue&&Ue!==s&&(Oe=null,On=[],tn=[],$e&&(Bt.removeLayer($e),$e=null),pn&&(Bt.removeLayer(pn),pn=null)),Ue=s,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===s)}),Bt.getContainer().classList.toggle("dm",!!s);const t=document.getElementById("dch");t.style.display=s?"block":"none",s&&(t.textContent=gm[s]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=s==="trace"?"block":"none",s!=="trace"&&(e.textContent="0 points tracés"),!s){const n=document.getElementById("snap");n&&(n.style.display="none")}}function va(s=!0){$e&&(Bt.removeLayer($e),$e=null),pn&&(Bt.removeLayer(pn),pn=null),Oe=null,On=[],tn=[],s&&Yd(null)}function ya(s,t){return t?Bt.latLngToContainerPoint(s).distanceTo(Bt.latLngToContainerPoint(t)):9999}function Zu(s){const t=[];On.length>2&&t.push(On[0]),tn.length>2&&t.push(tn[0]),Ti&&t.push(Ti.getLatLng());let e=null,n=9999;for(const r of t){const a=ya(s,r);a<18&&a<n&&(n=a,e=r)}return e}function vm(s,t){const e=document.getElementById("snap");if(!e)return;if(!t||ya(s,t)>18){e.style.display="none";return}const n=Bt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function ym(){document.getElementById("zone-controls")?.classList.add("visible"),lc()}function jd(){document.getElementById("zone-controls")?.classList.remove("visible"),Kd("none")}function lc(){if(!It.bounds)return;const s=document.getElementById("zone-controls");if(!s)return;const t=Te.latLng(It.bounds.maxLat,It.bounds.maxLon),e=Bt.latLngToContainerPoint(t),n=40;s.style.left=e.x+10+"px",s.style.top=Math.max(10,e.y-n/2)+"px"}function Kd(s){rr==="move"&&s!=="move"&&(Bt.dragging.enable(),Bt.getContainer().style.cursor=""),rr=s,document.getElementById("zc-move")?.classList.toggle("active",s==="move"),s==="move"&&(Bt.dragging.disable(),Bt.getContainer().style.cursor="grab")}function Jd(s){je&&(Bt.removeLayer(je),je=null),je=Te.polygon(s,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Bt);const t=s.map(h=>h[0]),e=s.map(h=>h[1]);It.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(It.bounds.minLat+It.bounds.maxLat)/2,r=(It.bounds.maxLon-It.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,a=(It.bounds.maxLat-It.bounds.minLat)*111320,u=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(a,r);It.wMm=Math.round(r*u),It.dMm=Math.round(a*u),mo?.()}function Xu(s){if(!It.zonePts)return;const t=It.zonePts.map(l=>l[0]),e=It.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,r=(Math.min(...e)+Math.max(...e))/2,a=It.zonePts.map(([l,u])=>[n+(l-n)*s,r+(u-r)*s]);It.zonePts=a,Jd(a)}function xm(){document.getElementById("zc-delete")?.addEventListener("click",()=>{je&&(Bt.removeLayer(je),je=null),It.bounds=null,It.zonePts=null,jd(),mo?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>Xu(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>Xu(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{Kd(rr==="move"?"none":"move")});let s=null;Bt.getContainer().addEventListener("mousedown",t=>{rr!=="move"||!It.zonePts||(s={x:t.clientX,y:t.clientY},Ns=It.zonePts.map(e=>[e[0],e[1]]),Bt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(rr!=="move"||!s||!Ns.length)return;const e=Bt.getContainer().getBoundingClientRect(),n=Bt.containerPointToLatLng(Te.point(s.x-e.left,s.y-e.top)),r=Bt.containerPointToLatLng(Te.point(t.clientX-e.left,t.clientY-e.top)),a=r.lat-n.lat,l=r.lng-n.lng,u=Ns.map(([h,d])=>[h+a,d+l]);je&&(Bt.removeLayer(je),je=null),je=Te.polygon(u,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Bt)}),document.addEventListener("mouseup",t=>{if(rr!=="move"||!s||!Ns.length)return;const e=Bt.getContainer().getBoundingClientRect(),n=Bt.containerPointToLatLng(Te.point(s.x-e.left,s.y-e.top)),r=Bt.containerPointToLatLng(Te.point(t.clientX-e.left,t.clientY-e.top)),a=r.lat-n.lat,l=r.lng-n.lng,u=Ns.map(([h,d])=>[h+a,d+l]);s=null,Ns=[],It.zonePts=u,Jd(u),lc(),Bt.getContainer().style.cursor="grab"}),Bt.on("move zoom moveend zoomend",lc)}function Gr(s,t){je&&(Bt.removeLayer(je),je=null),je=Te.polygon(s,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Bt);const e=s.map(d=>d[0]),n=s.map(d=>d[1]);It.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},It.zonePts=s,It.zoneType=t;const r=(It.bounds.minLat+It.bounds.maxLat)/2,a=(It.bounds.maxLon-It.bounds.minLon)*Math.cos(r*Math.PI/180)*111320,l=(It.bounds.maxLat-It.bounds.minLat)*111320,h=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,a);It.realW=a,It.realH=l,It.wMm=Math.round(a*h),It.dMm=Math.round(l*h),mo?.(),ym(),va()}function Mm(){Pn&&(Bt.removeLayer(Pn),Pn=null),!(tn.length<2)&&(Pn=Te.polyline(tn,{color:"#ff0000",weight:4,opacity:.9}).addTo(Bt))}function qu(s){const t=document.getElementById("snap");if(t&&(t.style.display="none"),pn&&(Bt.removeLayer(pn),pn=null),s.length<2){va();return}It.gpxPoints=s.map(n=>({lat:n.lat,lon:n.lng})),Qd(),tf(`✏️ ${s.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),va()}function Qd(){Pn&&(Bt.removeLayer(Pn),Pn=null),!(It.gpxPoints.length<2)&&(Pn=Te.polyline(It.gpxPoints.map(s=>[s.lat,s.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Bt))}function tf(s){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=s,t.style.display="block")}function bm(){Bt.on("mousemove",s=>{if(!Ue)return;const t=s.latlng,e=Zu(t);vm(t,e??Oe);const n=e??t;if((Ue==="rect"||Ue==="sq")&&Oe){const r=Ue==="sq"?Vu(Oe,n):Hu(Oe,n);$e?$e.setLatLngs(r):$e=Te.polygon(r,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Bt)}else if((Ue==="circ"||Ue==="hex")&&Oe){const r=Ue==="circ"?Gu(Oe,n):Wu(Oe,n);$e?$e.setLatLngs(r):$e=Te.polygon(r,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Bt)}else if(Ue==="poly"&&On.length>0){const r=[...On,n];$e?$e.setLatLngs(r):$e=Te.polyline(r,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Bt)}else if(Ue==="trace"&&tn.length>0){const r=[...tn,n];$e?$e.setLatLngs(r):$e=Te.polyline(r,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Bt)}}),Bt.on("click",s=>{if(!Ue)return;const t=s.latlng,e=Zu(t),n=e??t;if(Ue==="rect"){if(!Oe){Oe=n;return}Gr(Hu(Oe,n),"rect")}else if(Ue==="sq"){if(!Oe){Oe=n;return}Gr(Vu(Oe,n),"rect")}else if(Ue==="circ"){if(!Oe){Oe=n;return}Gr(Gu(Oe,n),"circ")}else if(Ue==="hex"){if(!Oe){Oe=n;return}Gr(Wu(Oe,n),"hex")}else if(Ue==="poly"){if(On.length>2&&ya(t,On[0])<18){Gr(On.map(r=>[r.lat,r.lng]),"poly");return}On.push(n),On.length===1&&(pn&&Bt.removeLayer(pn),pn=Te.circleMarker(On[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Bt))}else Ue==="trace"&&(Vr&&clearTimeout(Vr),Vr=setTimeout(()=>{if(tn.length>2&&ya(t,tn[0])<18){qu(tn);return}tn.push(e??t);const r=tn.length,a=document.getElementById("gpx-ctr");a&&(a.textContent=`${r} point${r>1?"s":""} tracé${r>1?"s":""}`),r===1&&(pn&&Bt.removeLayer(pn),pn=Te.circleMarker(tn[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Bt)),Mm()},220))}),Bt.on("dblclick",s=>{Ue==="trace"&&tn.length>=2&&(Vr&&clearTimeout(Vr),qu(tn),s.originalEvent.preventDefault())})}function Sm(){["rect","sq","circ","hex","poly","trace"].forEach(s=>{document.getElementById("db-"+s)?.addEventListener("click",()=>{Yd(Ue===s?null:s)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{va(),je&&(Bt.removeLayer(je),je=null),Pn&&(Bt.removeLayer(Pn),Pn=null),Ti&&(Bt.removeLayer(Ti),Ti=null),It.bounds=null,It.zonePts=null,It.gpxPoints=[],tn=[],jd();const s=document.getElementById("gpx-badge");s&&(s.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),mo?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!It.bounds)return;const s=It.bounds;Bt.fitBounds([[s.minLat,s.minLon],[s.maxLat,s.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!It.gpxPoints.length)return;const s=It.gpxPoints.map(e=>e.lat),t=It.gpxPoints.map(e=>e.lon);Bt.fitBounds([[Math.min(...s),Math.min(...t)],[Math.max(...s),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function wm(){document.getElementById("gpx-file")?.addEventListener("change",function(){const s=this.files?.[0];if(!s)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),r=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!r.length)return;const a=r.map(h=>({lat:parseFloat(h.getAttribute("lat")),lon:parseFloat(h.getAttribute("lon"))})).filter(h=>!isNaN(h.lat)&&!isNaN(h.lon));if(!a.length)return;It.gpxPoints=a,Qd(),Pn&&Bt.fitBounds(Pn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let h=1;h<a.length;h++){const p=(a[h].lat-a[h-1].lat)*Math.PI/180,m=(a[h].lon-a[h-1].lon)*Math.PI/180,g=Math.sin(p/2)**2+Math.cos(a[h-1].lat*Math.PI/180)*Math.cos(a[h].lat*Math.PI/180)*Math.sin(m/2)**2;l+=6371*2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g))}tf(`📍 ${a.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const u=document.getElementById("db-cgpx");u&&(u.style.display="flex")}catch{}},t.readAsText(s)})}let $u;function Em(){const s=document.getElementById("srch-input"),t=document.getElementById("srch-drop");s?.addEventListener("input",function(){clearTimeout($u);const e=this.value.trim();t.style.display="none",!(e.length<2)&&($u=setTimeout(()=>Tm(e),120))}),s?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function Tm(s){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(s)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((r,a)=>`
      <div class="srch-item" data-i="${a}" data-lat="${r.lat}" data-lon="${r.lon}" data-bb="${r.boundingbox.join(",")}">
        <div class="srch-name">${r.display_name.split(",")[0]}</div>
        <div class="srch-addr">${r.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(r=>{r.addEventListener("mousedown",function(a){a.preventDefault();const l=parseFloat(this.dataset.lat),u=parseFloat(this.dataset.lon),h=this.dataset.bb.split(",").map(Number);Ti&&(Bt.removeLayer(Ti),Ti=null),Ti=Te.circleMarker([l,u],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Bt),Bt.fitBounds([[h[0],h[2]],[h[1],h[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=r.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Cc="163",Os={ROTATE:0,DOLLY:1,PAN:2},Us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Am=0,Yu=1,Lm=2,ef=1,Pm=2,wi=3,ji=0,En=1,Bn=2,Zi=0,ur=1,ju=2,Ku=3,Ju=4,Cm=5,ps=100,Rm=101,Im=102,Dm=103,Nm=104,Om=200,Um=201,km=202,Bm=203,cc=204,uc=205,Fm=206,zm=207,Hm=208,Vm=209,Gm=210,Wm=211,Zm=212,Xm=213,qm=214,$m=0,Ym=1,jm=2,xa=3,Km=4,Jm=5,Qm=6,tg=7,Rc=0,eg=1,ng=2,Xi=0,ig=1,sg=2,rg=3,og=4,ag=5,lg=6,cg=7,nf=300,gr=301,_r=302,hc=303,dc=304,Ba=306,fc=1e3,gs=1001,pc=1002,wn=1003,ug=1004,zo=1005,qn=1006,yl=1007,_s=1008,qi=1009,hg=1010,dg=1011,sf=1012,rf=1013,vr=1014,Ai=1015,Ma=1016,of=1017,af=1018,go=1020,fg=35902,pg=1021,mg=1022,ci=1023,gg=1024,_g=1025,hr=1026,ao=1027,lf=1028,cf=1029,vg=1030,uf=1031,hf=1033,xl=33776,Ml=33777,bl=33778,Sl=33779,Qu=35840,th=35841,eh=35842,nh=35843,df=36196,ih=37492,sh=37496,rh=37808,oh=37809,ah=37810,lh=37811,ch=37812,uh=37813,hh=37814,dh=37815,fh=37816,ph=37817,mh=37818,gh=37819,_h=37820,vh=37821,wl=36492,yh=36494,xh=36495,yg=36283,Mh=36284,bh=36285,Sh=36286,xg=3200,Mg=3201,ff=0,bg=1,Vi="",ri="srgb",Ji="srgb-linear",Ic="display-p3",Fa="display-p3-linear",ba="linear",Ee="srgb",Sa="rec709",wa="p3",ks=7680,wh=519,Sg=512,wg=513,Eg=514,pf=515,Tg=516,Ag=517,Lg=518,Pg=519,Eh=35044,Th="300 es",Li=2e3,Ea=2001;class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const r=this._listeners[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const r=n.slice(0);for(let a=0,l=r.length;a<l;a++)r[a].call(this,t);t.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],no=Math.PI/180,mc=180/Math.PI;function wr(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[s&255]+on[s>>8&255]+on[s>>16&255]+on[s>>24&255]+"-"+on[t&255]+on[t>>8&255]+"-"+on[t>>16&15|64]+on[t>>24&255]+"-"+on[e&63|128]+on[e>>8&255]+"-"+on[e>>16&255]+on[e>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function en(s,t,e){return Math.max(t,Math.min(e,s))}function Cg(s,t){return(s%t+t)%t}function El(s,t,e){return(1-e)*s+e*t}function Wr(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function xn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Rg={DEG2RAD:no};class Mt{constructor(t=0,e=0){Mt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6],this.y=r[1]*e+r[4]*n+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(en(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),r=Math.sin(e),a=this.x-t.x,l=this.y-t.y;return this.x=a*n-l*r+t.x,this.y=a*r+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class re{constructor(t,e,n,r,a,l,u,h,d){re.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,l,u,h,d)}set(t,e,n,r,a,l,u,h,d){const p=this.elements;return p[0]=t,p[1]=r,p[2]=u,p[3]=e,p[4]=a,p[5]=h,p[6]=n,p[7]=l,p[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,l=n[0],u=n[3],h=n[6],d=n[1],p=n[4],m=n[7],g=n[2],_=n[5],M=n[8],w=r[0],v=r[3],y=r[6],D=r[1],b=r[4],C=r[7],B=r[2],N=r[5],R=r[8];return a[0]=l*w+u*D+h*B,a[3]=l*v+u*b+h*N,a[6]=l*y+u*C+h*R,a[1]=d*w+p*D+m*B,a[4]=d*v+p*b+m*N,a[7]=d*y+p*C+m*R,a[2]=g*w+_*D+M*B,a[5]=g*v+_*b+M*N,a[8]=g*y+_*C+M*R,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],u=t[5],h=t[6],d=t[7],p=t[8];return e*l*p-e*u*d-n*a*p+n*u*h+r*a*d-r*l*h}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],u=t[5],h=t[6],d=t[7],p=t[8],m=p*l-u*d,g=u*h-p*a,_=d*a-l*h,M=e*m+n*g+r*_;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/M;return t[0]=m*w,t[1]=(r*d-p*n)*w,t[2]=(u*n-r*l)*w,t[3]=g*w,t[4]=(p*e-r*h)*w,t[5]=(r*a-u*e)*w,t[6]=_*w,t[7]=(n*h-d*e)*w,t[8]=(l*e-n*a)*w,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,r,a,l,u){const h=Math.cos(a),d=Math.sin(a);return this.set(n*h,n*d,-n*(h*l+d*u)+l+t,-r*d,r*h,-r*(-d*l+h*u)+u+e,0,0,1),this}scale(t,e){return this.premultiply(Tl.makeScale(t,e)),this}rotate(t){return this.premultiply(Tl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Tl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<9;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Tl=new re;function mf(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Ta(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ig(){const s=Ta("canvas");return s.style.display="block",s}const Ah={};function Dg(s){s in Ah||(Ah[s]=!0,console.warn(s))}const Lh=new re().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Ph=new re().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ho={[Ji]:{transfer:ba,primaries:Sa,toReference:s=>s,fromReference:s=>s},[ri]:{transfer:Ee,primaries:Sa,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Fa]:{transfer:ba,primaries:wa,toReference:s=>s.applyMatrix3(Ph),fromReference:s=>s.applyMatrix3(Lh)},[Ic]:{transfer:Ee,primaries:wa,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Ph),fromReference:s=>s.applyMatrix3(Lh).convertLinearToSRGB()}},Ng=new Set([Ji,Fa]),ye={enabled:!0,_workingColorSpace:Ji,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Ng.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Ho[t].toReference,r=Ho[e].fromReference;return r(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Ho[s].primaries},getTransfer:function(s){return s===Vi?ba:Ho[s].transfer}};function dr(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Al(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Bs;class Og{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Bs===void 0&&(Bs=Ta("canvas")),Bs.width=t.width,Bs.height=t.height;const n=Bs.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Bs}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ta("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const r=n.getImageData(0,0,t.width,t.height),a=r.data;for(let l=0;l<a.length;l++)a[l]=dr(a[l]/255)*255;return n.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(dr(e[n]/255)*255):e[n]=dr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ug=0;class gf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ug++}),this.uuid=wr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let l=0,u=r.length;l<u;l++)r[l].isDataTexture?a.push(Ll(r[l].image)):a.push(Ll(r[l]))}else a=Ll(r);n.url=a}return e||(t.images[this.uuid]=n),n}}function Ll(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Og.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let kg=0;class ln extends Es{constructor(t=ln.DEFAULT_IMAGE,e=ln.DEFAULT_MAPPING,n=gs,r=gs,a=qn,l=_s,u=ci,h=qi,d=ln.DEFAULT_ANISOTROPY,p=Vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=wr(),this.name="",this.source=new gf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=l,this.anisotropy=d,this.format=u,this.internalFormat=null,this.type=h,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=p,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fc:t.x=t.x-Math.floor(t.x);break;case gs:t.x=t.x<0?0:1;break;case pc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fc:t.y=t.y-Math.floor(t.y);break;case gs:t.y=t.y<0?0:1;break;case pc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ln.DEFAULT_IMAGE=null;ln.DEFAULT_MAPPING=nf;ln.DEFAULT_ANISOTROPY=1;class Ke{constructor(t=0,e=0,n=0,r=1){Ke.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,r){return this.x=t,this.y=e,this.z=n,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*r+l[12]*a,this.y=l[1]*e+l[5]*n+l[9]*r+l[13]*a,this.z=l[2]*e+l[6]*n+l[10]*r+l[14]*a,this.w=l[3]*e+l[7]*n+l[11]*r+l[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,r,a;const h=t.elements,d=h[0],p=h[4],m=h[8],g=h[1],_=h[5],M=h[9],w=h[2],v=h[6],y=h[10];if(Math.abs(p-g)<.01&&Math.abs(m-w)<.01&&Math.abs(M-v)<.01){if(Math.abs(p+g)<.1&&Math.abs(m+w)<.1&&Math.abs(M+v)<.1&&Math.abs(d+_+y-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(d+1)/2,C=(_+1)/2,B=(y+1)/2,N=(p+g)/4,R=(m+w)/4,U=(M+v)/4;return b>C&&b>B?b<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(b),r=N/n,a=R/n):C>B?C<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(C),n=N/r,a=U/r):B<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(B),n=R/a,r=U/a),this.set(n,r,a,e),this}let D=Math.sqrt((v-M)*(v-M)+(m-w)*(m-w)+(g-p)*(g-p));return Math.abs(D)<.001&&(D=1),this.x=(v-M)/D,this.y=(m-w)/D,this.z=(g-p)/D,this.w=Math.acos((d+_+y-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bg extends Es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ke(0,0,t,e),this.scissorTest=!1,this.viewport=new Ke(0,0,t,e);const r={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const a=new ln(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let u=0;u<l;u++)this.textures[u]=a.clone(),this.textures[u].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,r=t.textures.length;n<r;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new gf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xs extends Bg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class _f extends ln{constructor(t=null,e=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fg extends ln{constructor(t=null,e=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:r},this.magFilter=wn,this.minFilter=wn,this.wrapR=gs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ms{constructor(t=0,e=0,n=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=r}static slerpFlat(t,e,n,r,a,l,u){let h=n[r+0],d=n[r+1],p=n[r+2],m=n[r+3];const g=a[l+0],_=a[l+1],M=a[l+2],w=a[l+3];if(u===0){t[e+0]=h,t[e+1]=d,t[e+2]=p,t[e+3]=m;return}if(u===1){t[e+0]=g,t[e+1]=_,t[e+2]=M,t[e+3]=w;return}if(m!==w||h!==g||d!==_||p!==M){let v=1-u;const y=h*g+d*_+p*M+m*w,D=y>=0?1:-1,b=1-y*y;if(b>Number.EPSILON){const B=Math.sqrt(b),N=Math.atan2(B,y*D);v=Math.sin(v*N)/B,u=Math.sin(u*N)/B}const C=u*D;if(h=h*v+g*C,d=d*v+_*C,p=p*v+M*C,m=m*v+w*C,v===1-u){const B=1/Math.sqrt(h*h+d*d+p*p+m*m);h*=B,d*=B,p*=B,m*=B}}t[e]=h,t[e+1]=d,t[e+2]=p,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,r,a,l){const u=n[r],h=n[r+1],d=n[r+2],p=n[r+3],m=a[l],g=a[l+1],_=a[l+2],M=a[l+3];return t[e]=u*M+p*m+h*_-d*g,t[e+1]=h*M+p*g+d*m-u*_,t[e+2]=d*M+p*_+u*g-h*m,t[e+3]=p*M-u*m-h*g-d*_,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,r){return this._x=t,this._y=e,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,r=t._y,a=t._z,l=t._order,u=Math.cos,h=Math.sin,d=u(n/2),p=u(r/2),m=u(a/2),g=h(n/2),_=h(r/2),M=h(a/2);switch(l){case"XYZ":this._x=g*p*m+d*_*M,this._y=d*_*m-g*p*M,this._z=d*p*M+g*_*m,this._w=d*p*m-g*_*M;break;case"YXZ":this._x=g*p*m+d*_*M,this._y=d*_*m-g*p*M,this._z=d*p*M-g*_*m,this._w=d*p*m+g*_*M;break;case"ZXY":this._x=g*p*m-d*_*M,this._y=d*_*m+g*p*M,this._z=d*p*M+g*_*m,this._w=d*p*m-g*_*M;break;case"ZYX":this._x=g*p*m-d*_*M,this._y=d*_*m+g*p*M,this._z=d*p*M-g*_*m,this._w=d*p*m+g*_*M;break;case"YZX":this._x=g*p*m+d*_*M,this._y=d*_*m+g*p*M,this._z=d*p*M-g*_*m,this._w=d*p*m-g*_*M;break;case"XZY":this._x=g*p*m-d*_*M,this._y=d*_*m-g*p*M,this._z=d*p*M+g*_*m,this._w=d*p*m+g*_*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,r=Math.sin(n);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],r=e[4],a=e[8],l=e[1],u=e[5],h=e[9],d=e[2],p=e[6],m=e[10],g=n+u+m;if(g>0){const _=.5/Math.sqrt(g+1);this._w=.25/_,this._x=(p-h)*_,this._y=(a-d)*_,this._z=(l-r)*_}else if(n>u&&n>m){const _=2*Math.sqrt(1+n-u-m);this._w=(p-h)/_,this._x=.25*_,this._y=(r+l)/_,this._z=(a+d)/_}else if(u>m){const _=2*Math.sqrt(1+u-n-m);this._w=(a-d)/_,this._x=(r+l)/_,this._y=.25*_,this._z=(h+p)/_}else{const _=2*Math.sqrt(1+m-n-u);this._w=(l-r)/_,this._x=(a+d)/_,this._y=(h+p)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(en(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const r=Math.min(1,e/n);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,r=t._y,a=t._z,l=t._w,u=e._x,h=e._y,d=e._z,p=e._w;return this._x=n*p+l*u+r*d-a*h,this._y=r*p+l*h+a*u-n*d,this._z=a*p+l*d+n*h-r*u,this._w=l*p-n*u-r*h-a*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,r=this._y,a=this._z,l=this._w;let u=l*t._w+n*t._x+r*t._y+a*t._z;if(u<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,u=-u):this.copy(t),u>=1)return this._w=l,this._x=n,this._y=r,this._z=a,this;const h=1-u*u;if(h<=Number.EPSILON){const _=1-e;return this._w=_*l+e*this._w,this._x=_*n+e*this._x,this._y=_*r+e*this._y,this._z=_*a+e*this._z,this.normalize(),this}const d=Math.sqrt(h),p=Math.atan2(d,u),m=Math.sin((1-e)*p)/d,g=Math.sin(e*p)/d;return this._w=l*m+this._w*g,this._x=n*m+this._x*g,this._y=r*m+this._y*g,this._z=a*m+this._z*g,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,e=0,n=0){V.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ch.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ch.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*r,this.y=a[1]*e+a[4]*n+a[7]*r,this.z=a[2]*e+a[5]*n+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,r=this.z,a=t.elements,l=1/(a[3]*e+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*r+a[12])*l,this.y=(a[1]*e+a[5]*n+a[9]*r+a[13])*l,this.z=(a[2]*e+a[6]*n+a[10]*r+a[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,r=this.z,a=t.x,l=t.y,u=t.z,h=t.w,d=2*(l*r-u*n),p=2*(u*e-a*r),m=2*(a*n-l*e);return this.x=e+h*d+l*m-u*p,this.y=n+h*p+u*d-a*m,this.z=r+h*m+a*p-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*r,this.y=a[1]*e+a[5]*n+a[9]*r,this.z=a[2]*e+a[6]*n+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,r=t.y,a=t.z,l=e.x,u=e.y,h=e.z;return this.x=r*h-a*u,this.y=a*l-n*h,this.z=n*u-r*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Pl.copy(this).projectOnVector(t),this.sub(Pl)}reflect(t){return this.sub(Pl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(en(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,r=this.z-t.z;return e*e+n*n+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const r=Math.sin(e)*t;return this.x=r*Math.sin(n),this.y=Math.cos(e)*t,this.z=r*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pl=new V,Ch=new Ms;class Ts{constructor(t=new V(1/0,1/0,1/0),e=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let l=0,u=a.count;l<u;l++)t.isMesh===!0?t.getVertexPosition(l,Wn):Wn.fromBufferAttribute(a,l),Wn.applyMatrix4(t.matrixWorld),this.expandByPoint(Wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vo.copy(n.boundingBox)),Vo.applyMatrix4(t.matrixWorld),this.union(Vo)}const r=t.children;for(let a=0,l=r.length;a<l;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Wn),Wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Zr),Go.subVectors(this.max,Zr),Fs.subVectors(t.a,Zr),zs.subVectors(t.b,Zr),Hs.subVectors(t.c,Zr),Ui.subVectors(zs,Fs),ki.subVectors(Hs,zs),os.subVectors(Fs,Hs);let e=[0,-Ui.z,Ui.y,0,-ki.z,ki.y,0,-os.z,os.y,Ui.z,0,-Ui.x,ki.z,0,-ki.x,os.z,0,-os.x,-Ui.y,Ui.x,0,-ki.y,ki.x,0,-os.y,os.x,0];return!Cl(e,Fs,zs,Hs,Go)||(e=[1,0,0,0,1,0,0,0,1],!Cl(e,Fs,zs,Hs,Go))?!1:(Wo.crossVectors(Ui,ki),e=[Wo.x,Wo.y,Wo.z],Cl(e,Fs,zs,Hs,Go))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(vi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),vi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),vi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),vi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),vi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),vi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),vi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),vi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(vi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const vi=[new V,new V,new V,new V,new V,new V,new V,new V],Wn=new V,Vo=new Ts,Fs=new V,zs=new V,Hs=new V,Ui=new V,ki=new V,os=new V,Zr=new V,Go=new V,Wo=new V,as=new V;function Cl(s,t,e,n,r){for(let a=0,l=s.length-3;a<=l;a+=3){as.fromArray(s,a);const u=r.x*Math.abs(as.x)+r.y*Math.abs(as.y)+r.z*Math.abs(as.z),h=t.dot(as),d=e.dot(as),p=n.dot(as);if(Math.max(-Math.max(h,d,p),Math.min(h,d,p))>u)return!1}return!0}const zg=new Ts,Xr=new V,Rl=new V;class Er{constructor(t=new V,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):zg.setFromPoints(t).getCenter(n);let r=0;for(let a=0,l=t.length;a<l;a++)r=Math.max(r,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xr.subVectors(t,this.center);const e=Xr.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),r=(n-this.radius)*.5;this.center.addScaledVector(Xr,r/n),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Rl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xr.copy(t.center).add(Rl)),this.expandByPoint(Xr.copy(t.center).sub(Rl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yi=new V,Il=new V,Zo=new V,Bi=new V,Dl=new V,Xo=new V,Nl=new V;class za{constructor(t=new V,e=new V(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,yi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=yi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(yi.copy(this.origin).addScaledVector(this.direction,e),yi.distanceToSquared(t))}distanceSqToSegment(t,e,n,r){Il.copy(t).add(e).multiplyScalar(.5),Zo.copy(e).sub(t).normalize(),Bi.copy(this.origin).sub(Il);const a=t.distanceTo(e)*.5,l=-this.direction.dot(Zo),u=Bi.dot(this.direction),h=-Bi.dot(Zo),d=Bi.lengthSq(),p=Math.abs(1-l*l);let m,g,_,M;if(p>0)if(m=l*h-u,g=l*u-h,M=a*p,m>=0)if(g>=-M)if(g<=M){const w=1/p;m*=w,g*=w,_=m*(m+l*g+2*u)+g*(l*m+g+2*h)+d}else g=a,m=Math.max(0,-(l*g+u)),_=-m*m+g*(g+2*h)+d;else g=-a,m=Math.max(0,-(l*g+u)),_=-m*m+g*(g+2*h)+d;else g<=-M?(m=Math.max(0,-(-l*a+u)),g=m>0?-a:Math.min(Math.max(-a,-h),a),_=-m*m+g*(g+2*h)+d):g<=M?(m=0,g=Math.min(Math.max(-a,-h),a),_=g*(g+2*h)+d):(m=Math.max(0,-(l*a+u)),g=m>0?a:Math.min(Math.max(-a,-h),a),_=-m*m+g*(g+2*h)+d);else g=l>0?-a:a,m=Math.max(0,-(l*g+u)),_=-m*m+g*(g+2*h)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,m),r&&r.copy(Il).addScaledVector(Zo,g),_}intersectSphere(t,e){yi.subVectors(t.center,this.origin);const n=yi.dot(this.direction),r=yi.dot(yi)-n*n,a=t.radius*t.radius;if(r>a)return null;const l=Math.sqrt(a-r),u=n-l,h=n+l;return h<0?null:u<0?this.at(h,e):this.at(u,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,r,a,l,u,h;const d=1/this.direction.x,p=1/this.direction.y,m=1/this.direction.z,g=this.origin;return d>=0?(n=(t.min.x-g.x)*d,r=(t.max.x-g.x)*d):(n=(t.max.x-g.x)*d,r=(t.min.x-g.x)*d),p>=0?(a=(t.min.y-g.y)*p,l=(t.max.y-g.y)*p):(a=(t.max.y-g.y)*p,l=(t.min.y-g.y)*p),n>l||a>r||((a>n||isNaN(n))&&(n=a),(l<r||isNaN(r))&&(r=l),m>=0?(u=(t.min.z-g.z)*m,h=(t.max.z-g.z)*m):(u=(t.max.z-g.z)*m,h=(t.min.z-g.z)*m),n>h||u>r)||((u>n||n!==n)&&(n=u),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,e)}intersectsBox(t){return this.intersectBox(t,yi)!==null}intersectTriangle(t,e,n,r,a){Dl.subVectors(e,t),Xo.subVectors(n,t),Nl.crossVectors(Dl,Xo);let l=this.direction.dot(Nl),u;if(l>0){if(r)return null;u=1}else if(l<0)u=-1,l=-l;else return null;Bi.subVectors(this.origin,t);const h=u*this.direction.dot(Xo.crossVectors(Bi,Xo));if(h<0)return null;const d=u*this.direction.dot(Dl.cross(Bi));if(d<0||h+d>l)return null;const p=-u*Bi.dot(Nl);return p<0?null:this.at(p/l,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,r,a,l,u,h,d,p,m,g,_,M,w,v){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,r,a,l,u,h,d,p,m,g,_,M,w,v)}set(t,e,n,r,a,l,u,h,d,p,m,g,_,M,w,v){const y=this.elements;return y[0]=t,y[4]=e,y[8]=n,y[12]=r,y[1]=a,y[5]=l,y[9]=u,y[13]=h,y[2]=d,y[6]=p,y[10]=m,y[14]=g,y[3]=_,y[7]=M,y[11]=w,y[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,r=1/Vs.setFromMatrixColumn(t,0).length(),a=1/Vs.setFromMatrixColumn(t,1).length(),l=1/Vs.setFromMatrixColumn(t,2).length();return e[0]=n[0]*r,e[1]=n[1]*r,e[2]=n[2]*r,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,r=t.y,a=t.z,l=Math.cos(n),u=Math.sin(n),h=Math.cos(r),d=Math.sin(r),p=Math.cos(a),m=Math.sin(a);if(t.order==="XYZ"){const g=l*p,_=l*m,M=u*p,w=u*m;e[0]=h*p,e[4]=-h*m,e[8]=d,e[1]=_+M*d,e[5]=g-w*d,e[9]=-u*h,e[2]=w-g*d,e[6]=M+_*d,e[10]=l*h}else if(t.order==="YXZ"){const g=h*p,_=h*m,M=d*p,w=d*m;e[0]=g+w*u,e[4]=M*u-_,e[8]=l*d,e[1]=l*m,e[5]=l*p,e[9]=-u,e[2]=_*u-M,e[6]=w+g*u,e[10]=l*h}else if(t.order==="ZXY"){const g=h*p,_=h*m,M=d*p,w=d*m;e[0]=g-w*u,e[4]=-l*m,e[8]=M+_*u,e[1]=_+M*u,e[5]=l*p,e[9]=w-g*u,e[2]=-l*d,e[6]=u,e[10]=l*h}else if(t.order==="ZYX"){const g=l*p,_=l*m,M=u*p,w=u*m;e[0]=h*p,e[4]=M*d-_,e[8]=g*d+w,e[1]=h*m,e[5]=w*d+g,e[9]=_*d-M,e[2]=-d,e[6]=u*h,e[10]=l*h}else if(t.order==="YZX"){const g=l*h,_=l*d,M=u*h,w=u*d;e[0]=h*p,e[4]=w-g*m,e[8]=M*m+_,e[1]=m,e[5]=l*p,e[9]=-u*p,e[2]=-d*p,e[6]=_*m+M,e[10]=g-w*m}else if(t.order==="XZY"){const g=l*h,_=l*d,M=u*h,w=u*d;e[0]=h*p,e[4]=-m,e[8]=d*p,e[1]=g*m+w,e[5]=l*p,e[9]=_*m-M,e[2]=M*m-_,e[6]=u*p,e[10]=w*m+g}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hg,t,Vg)}lookAt(t,e,n){const r=this.elements;return Tn.subVectors(t,e),Tn.lengthSq()===0&&(Tn.z=1),Tn.normalize(),Fi.crossVectors(n,Tn),Fi.lengthSq()===0&&(Math.abs(n.z)===1?Tn.x+=1e-4:Tn.z+=1e-4,Tn.normalize(),Fi.crossVectors(n,Tn)),Fi.normalize(),qo.crossVectors(Tn,Fi),r[0]=Fi.x,r[4]=qo.x,r[8]=Tn.x,r[1]=Fi.y,r[5]=qo.y,r[9]=Tn.y,r[2]=Fi.z,r[6]=qo.z,r[10]=Tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,r=e.elements,a=this.elements,l=n[0],u=n[4],h=n[8],d=n[12],p=n[1],m=n[5],g=n[9],_=n[13],M=n[2],w=n[6],v=n[10],y=n[14],D=n[3],b=n[7],C=n[11],B=n[15],N=r[0],R=r[4],U=r[8],P=r[12],E=r[1],z=r[5],q=r[9],k=r[13],W=r[2],X=r[6],J=r[10],ht=r[14],F=r[3],rt=r[7],Z=r[11],dt=r[15];return a[0]=l*N+u*E+h*W+d*F,a[4]=l*R+u*z+h*X+d*rt,a[8]=l*U+u*q+h*J+d*Z,a[12]=l*P+u*k+h*ht+d*dt,a[1]=p*N+m*E+g*W+_*F,a[5]=p*R+m*z+g*X+_*rt,a[9]=p*U+m*q+g*J+_*Z,a[13]=p*P+m*k+g*ht+_*dt,a[2]=M*N+w*E+v*W+y*F,a[6]=M*R+w*z+v*X+y*rt,a[10]=M*U+w*q+v*J+y*Z,a[14]=M*P+w*k+v*ht+y*dt,a[3]=D*N+b*E+C*W+B*F,a[7]=D*R+b*z+C*X+B*rt,a[11]=D*U+b*q+C*J+B*Z,a[15]=D*P+b*k+C*ht+B*dt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],r=t[8],a=t[12],l=t[1],u=t[5],h=t[9],d=t[13],p=t[2],m=t[6],g=t[10],_=t[14],M=t[3],w=t[7],v=t[11],y=t[15];return M*(+a*h*m-r*d*m-a*u*g+n*d*g+r*u*_-n*h*_)+w*(+e*h*_-e*d*g+a*l*g-r*l*_+r*d*p-a*h*p)+v*(+e*d*m-e*u*_-a*l*m+n*l*_+a*u*p-n*d*p)+y*(-r*u*p-e*h*m+e*u*g+r*l*m-n*l*g+n*h*p)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],r=t[2],a=t[3],l=t[4],u=t[5],h=t[6],d=t[7],p=t[8],m=t[9],g=t[10],_=t[11],M=t[12],w=t[13],v=t[14],y=t[15],D=m*v*d-w*g*d+w*h*_-u*v*_-m*h*y+u*g*y,b=M*g*d-p*v*d-M*h*_+l*v*_+p*h*y-l*g*y,C=p*w*d-M*m*d+M*u*_-l*w*_-p*u*y+l*m*y,B=M*m*h-p*w*h-M*u*g+l*w*g+p*u*v-l*m*v,N=e*D+n*b+r*C+a*B;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/N;return t[0]=D*R,t[1]=(w*g*a-m*v*a-w*r*_+n*v*_+m*r*y-n*g*y)*R,t[2]=(u*v*a-w*h*a+w*r*d-n*v*d-u*r*y+n*h*y)*R,t[3]=(m*h*a-u*g*a-m*r*d+n*g*d+u*r*_-n*h*_)*R,t[4]=b*R,t[5]=(p*v*a-M*g*a+M*r*_-e*v*_-p*r*y+e*g*y)*R,t[6]=(M*h*a-l*v*a-M*r*d+e*v*d+l*r*y-e*h*y)*R,t[7]=(l*g*a-p*h*a+p*r*d-e*g*d-l*r*_+e*h*_)*R,t[8]=C*R,t[9]=(M*m*a-p*w*a-M*n*_+e*w*_+p*n*y-e*m*y)*R,t[10]=(l*w*a-M*u*a+M*n*d-e*w*d-l*n*y+e*u*y)*R,t[11]=(p*u*a-l*m*a-p*n*d+e*m*d+l*n*_-e*u*_)*R,t[12]=B*R,t[13]=(p*w*r-M*m*r+M*n*g-e*w*g-p*n*v+e*m*v)*R,t[14]=(M*u*r-l*w*r-M*n*h+e*w*h+l*n*v-e*u*v)*R,t[15]=(l*m*r-p*u*r+p*n*h-e*m*h-l*n*g+e*u*g)*R,this}scale(t){const e=this.elements,n=t.x,r=t.y,a=t.z;return e[0]*=n,e[4]*=r,e[8]*=a,e[1]*=n,e[5]*=r,e[9]*=a,e[2]*=n,e[6]*=r,e[10]*=a,e[3]*=n,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,r))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),r=Math.sin(e),a=1-n,l=t.x,u=t.y,h=t.z,d=a*l,p=a*u;return this.set(d*l+n,d*u-r*h,d*h+r*u,0,d*u+r*h,p*u+n,p*h-r*l,0,d*h-r*u,p*h+r*l,a*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,r,a,l){return this.set(1,n,a,0,t,1,l,0,e,r,1,0,0,0,0,1),this}compose(t,e,n){const r=this.elements,a=e._x,l=e._y,u=e._z,h=e._w,d=a+a,p=l+l,m=u+u,g=a*d,_=a*p,M=a*m,w=l*p,v=l*m,y=u*m,D=h*d,b=h*p,C=h*m,B=n.x,N=n.y,R=n.z;return r[0]=(1-(w+y))*B,r[1]=(_+C)*B,r[2]=(M-b)*B,r[3]=0,r[4]=(_-C)*N,r[5]=(1-(g+y))*N,r[6]=(v+D)*N,r[7]=0,r[8]=(M+b)*R,r[9]=(v-D)*R,r[10]=(1-(g+w))*R,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,n){const r=this.elements;let a=Vs.set(r[0],r[1],r[2]).length();const l=Vs.set(r[4],r[5],r[6]).length(),u=Vs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],Zn.copy(this);const d=1/a,p=1/l,m=1/u;return Zn.elements[0]*=d,Zn.elements[1]*=d,Zn.elements[2]*=d,Zn.elements[4]*=p,Zn.elements[5]*=p,Zn.elements[6]*=p,Zn.elements[8]*=m,Zn.elements[9]*=m,Zn.elements[10]*=m,e.setFromRotationMatrix(Zn),n.x=a,n.y=l,n.z=u,this}makePerspective(t,e,n,r,a,l,u=Li){const h=this.elements,d=2*a/(e-t),p=2*a/(n-r),m=(e+t)/(e-t),g=(n+r)/(n-r);let _,M;if(u===Li)_=-(l+a)/(l-a),M=-2*l*a/(l-a);else if(u===Ea)_=-l/(l-a),M=-l*a/(l-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);return h[0]=d,h[4]=0,h[8]=m,h[12]=0,h[1]=0,h[5]=p,h[9]=g,h[13]=0,h[2]=0,h[6]=0,h[10]=_,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,r,a,l,u=Li){const h=this.elements,d=1/(e-t),p=1/(n-r),m=1/(l-a),g=(e+t)*d,_=(n+r)*p;let M,w;if(u===Li)M=(l+a)*m,w=-2*m;else if(u===Ea)M=a*m,w=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);return h[0]=2*d,h[4]=0,h[8]=0,h[12]=-g,h[1]=0,h[5]=2*p,h[9]=0,h[13]=-_,h[2]=0,h[6]=0,h[10]=w,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let r=0;r<16;r++)if(e[r]!==n[r])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Vs=new V,Zn=new xe,Hg=new V(0,0,0),Vg=new V(1,1,1),Fi=new V,qo=new V,Tn=new V,Rh=new xe,Ih=new Ms;class hi{constructor(t=0,e=0,n=0,r=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,r=this._order){return this._x=t,this._y=e,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const r=t.elements,a=r[0],l=r[4],u=r[8],h=r[1],d=r[5],p=r[9],m=r[2],g=r[6],_=r[10];switch(e){case"XYZ":this._y=Math.asin(en(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-p,_),this._z=Math.atan2(-l,a)):(this._x=Math.atan2(g,d),this._z=0);break;case"YXZ":this._x=Math.asin(-en(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(u,_),this._z=Math.atan2(h,d)):(this._y=Math.atan2(-m,a),this._z=0);break;case"ZXY":this._x=Math.asin(en(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-m,_),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(h,a));break;case"ZYX":this._y=Math.asin(-en(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(g,_),this._z=Math.atan2(h,a)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(en(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-p,d),this._y=Math.atan2(-m,a)):(this._x=0,this._y=Math.atan2(u,_));break;case"XZY":this._z=Math.asin(-en(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(g,d),this._y=Math.atan2(u,a)):(this._x=Math.atan2(-p,_),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Rh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Rh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ih.setFromEuler(this),this.setFromQuaternion(Ih,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class Dc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gg=0;const Dh=new V,Gs=new Ms,xi=new xe,$o=new V,qr=new V,Wg=new V,Zg=new Ms,Nh=new V(1,0,0),Oh=new V(0,1,0),Uh=new V(0,0,1),kh={type:"added"},Xg={type:"removed"},Ws={type:"childadded",child:null},Ol={type:"childremoved",child:null};class Je extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=wr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Je.DEFAULT_UP.clone();const t=new V,e=new hi,n=new Ms,r=new V(1,1,1);function a(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new xe},normalMatrix:{value:new re}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=Je.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Gs.setFromAxisAngle(t,e),this.quaternion.multiply(Gs),this}rotateOnWorldAxis(t,e){return Gs.setFromAxisAngle(t,e),this.quaternion.premultiply(Gs),this}rotateX(t){return this.rotateOnAxis(Nh,t)}rotateY(t){return this.rotateOnAxis(Oh,t)}rotateZ(t){return this.rotateOnAxis(Uh,t)}translateOnAxis(t,e){return Dh.copy(t).applyQuaternion(this.quaternion),this.position.add(Dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nh,t)}translateY(t){return this.translateOnAxis(Oh,t)}translateZ(t){return this.translateOnAxis(Uh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?$o.copy(t):$o.set(t,e,n);const r=this.parent;this.updateWorldMatrix(!0,!1),qr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xi.lookAt(qr,$o,this.up):xi.lookAt($o,qr,this.up),this.quaternion.setFromRotationMatrix(xi),r&&(xi.extractRotation(r.matrixWorld),Gs.setFromRotationMatrix(xi),this.quaternion.premultiply(Gs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kh),Ws.child=t,this.dispatchEvent(Ws),Ws.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xg),Ol.child=t,this.dispatchEvent(Ol),Ol.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xi.multiply(t.parent.matrixWorld)),t.applyMatrix4(xi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kh),Ws.child=t,this.dispatchEvent(Ws),Ws.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,r=this.children.length;n<r;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const r=this.children;for(let a=0,l=r.length;a<l;a++)r[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,t,Wg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(qr,Zg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,r=e.length;n<r;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,r=e.length;n<r;n++){const a=e[n];(a.matrixWorldAutoUpdate===!0||t===!0)&&a.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const r=this.children;for(let a=0,l=r.length;a<l;a++){const u=r[a];u.matrixWorldAutoUpdate===!0&&u.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),r.maxGeometryCount=this._maxGeometryCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(u,h){return u[h.uuid]===void 0&&(u[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const h=u.shapes;if(Array.isArray(h))for(let d=0,p=h.length;d<p;d++){const m=h[d];a(t.shapes,m)}else a(t.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let h=0,d=this.material.length;h<d;h++)u.push(a(t.materials,this.material[h]));r.material=u}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let u=0;u<this.children.length;u++)r.children.push(this.children[u].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let u=0;u<this.animations.length;u++){const h=this.animations[u];r.animations.push(a(t.animations,h))}}if(e){const u=l(t.geometries),h=l(t.materials),d=l(t.textures),p=l(t.images),m=l(t.shapes),g=l(t.skeletons),_=l(t.animations),M=l(t.nodes);u.length>0&&(n.geometries=u),h.length>0&&(n.materials=h),d.length>0&&(n.textures=d),p.length>0&&(n.images=p),m.length>0&&(n.shapes=m),g.length>0&&(n.skeletons=g),_.length>0&&(n.animations=_),M.length>0&&(n.nodes=M)}return n.object=r,n;function l(u){const h=[];for(const d in u){const p=u[d];delete p.metadata,h.push(p)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const r=t.children[n];this.add(r.clone())}return this}}Je.DEFAULT_UP=new V(0,1,0);Je.DEFAULT_MATRIX_AUTO_UPDATE=!0;Je.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xn=new V,Mi=new V,Ul=new V,bi=new V,Zs=new V,Xs=new V,Bh=new V,kl=new V,Bl=new V,Fl=new V;class $n{constructor(t=new V,e=new V,n=new V){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,r){r.subVectors(n,e),Xn.subVectors(t,e),r.cross(Xn);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,n,r,a){Xn.subVectors(r,e),Mi.subVectors(n,e),Ul.subVectors(t,e);const l=Xn.dot(Xn),u=Xn.dot(Mi),h=Xn.dot(Ul),d=Mi.dot(Mi),p=Mi.dot(Ul),m=l*d-u*u;if(m===0)return a.set(0,0,0),null;const g=1/m,_=(d*h-u*p)*g,M=(l*p-u*h)*g;return a.set(1-_-M,M,_)}static containsPoint(t,e,n,r){return this.getBarycoord(t,e,n,r,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getInterpolation(t,e,n,r,a,l,u,h){return this.getBarycoord(t,e,n,r,bi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(a,bi.x),h.addScaledVector(l,bi.y),h.addScaledVector(u,bi.z),h)}static isFrontFacing(t,e,n,r){return Xn.subVectors(n,e),Mi.subVectors(t,e),Xn.cross(Mi).dot(r)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,r){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,n,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Xn.cross(Mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return $n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,r,a){return $n.getInterpolation(t,this.a,this.b,this.c,e,n,r,a)}containsPoint(t){return $n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,r=this.b,a=this.c;let l,u;Zs.subVectors(r,n),Xs.subVectors(a,n),kl.subVectors(t,n);const h=Zs.dot(kl),d=Xs.dot(kl);if(h<=0&&d<=0)return e.copy(n);Bl.subVectors(t,r);const p=Zs.dot(Bl),m=Xs.dot(Bl);if(p>=0&&m<=p)return e.copy(r);const g=h*m-p*d;if(g<=0&&h>=0&&p<=0)return l=h/(h-p),e.copy(n).addScaledVector(Zs,l);Fl.subVectors(t,a);const _=Zs.dot(Fl),M=Xs.dot(Fl);if(M>=0&&_<=M)return e.copy(a);const w=_*d-h*M;if(w<=0&&d>=0&&M<=0)return u=d/(d-M),e.copy(n).addScaledVector(Xs,u);const v=p*M-_*m;if(v<=0&&m-p>=0&&_-M>=0)return Bh.subVectors(a,r),u=(m-p)/(m-p+(_-M)),e.copy(r).addScaledVector(Bh,u);const y=1/(v+w+g);return l=w*y,u=g*y,e.copy(n).addScaledVector(Zs,l).addScaledVector(Xs,u)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const vf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zi={h:0,s:0,l:0},Yo={h:0,s:0,l:0};function zl(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class ne{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ye.toWorkingColorSpace(this,e),this}setRGB(t,e,n,r=ye.workingColorSpace){return this.r=t,this.g=e,this.b=n,ye.toWorkingColorSpace(this,r),this}setHSL(t,e,n,r=ye.workingColorSpace){if(t=Cg(t,1),e=en(e,0,1),n=en(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,l=2*n-a;this.r=zl(l,a,t+1/3),this.g=zl(l,a,t),this.b=zl(l,a,t-1/3)}return ye.toWorkingColorSpace(this,r),this}setStyle(t,e=ri){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const l=r[1],u=r[2];switch(l){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],l=a.length;if(l===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ri){const n=vf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=dr(t.r),this.g=dr(t.g),this.b=dr(t.b),this}copyLinearToSRGB(t){return this.r=Al(t.r),this.g=Al(t.g),this.b=Al(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return ye.fromWorkingColorSpace(an.copy(this),t),Math.round(en(an.r*255,0,255))*65536+Math.round(en(an.g*255,0,255))*256+Math.round(en(an.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ye.workingColorSpace){ye.fromWorkingColorSpace(an.copy(this),e);const n=an.r,r=an.g,a=an.b,l=Math.max(n,r,a),u=Math.min(n,r,a);let h,d;const p=(u+l)/2;if(u===l)h=0,d=0;else{const m=l-u;switch(d=p<=.5?m/(l+u):m/(2-l-u),l){case n:h=(r-a)/m+(r<a?6:0);break;case r:h=(a-n)/m+2;break;case a:h=(n-r)/m+4;break}h/=6}return t.h=h,t.s=d,t.l=p,t}getRGB(t,e=ye.workingColorSpace){return ye.fromWorkingColorSpace(an.copy(this),e),t.r=an.r,t.g=an.g,t.b=an.b,t}getStyle(t=ri){ye.fromWorkingColorSpace(an.copy(this),t);const e=an.r,n=an.g,r=an.b;return t!==ri?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(t,e,n){return this.getHSL(zi),this.setHSL(zi.h+t,zi.s+e,zi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(zi),t.getHSL(Yo);const n=El(zi.h,Yo.h,e),r=El(zi.s,Yo.s,e),a=El(zi.l,Yo.l,e);return this.setHSL(n,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*r,this.g=a[1]*e+a[4]*n+a[7]*r,this.b=a[2]*e+a[5]*n+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new ne;ne.NAMES=vf;let qg=0;class Tr extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:qg++}),this.uuid=wr(),this.name="",this.type="Material",this.blending=ur,this.side=ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=cc,this.blendDst=uc,this.blendEquation=ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ne(0,0,0),this.blendAlpha=0,this.depthFunc=xa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ks,this.stencilZFail=ks,this.stencilZPass=ks,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ur&&(n.blending=this.blending),this.side!==ji&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==cc&&(n.blendSrc=this.blendSrc),this.blendDst!==uc&&(n.blendDst=this.blendDst),this.blendEquation!==ps&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==xa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==wh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ks&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ks&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ks&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(a){const l=[];for(const u in a){const h=a[u];delete h.metadata,l.push(h)}return l}if(e){const a=r(t.textures),l=r(t.images);a.length>0&&(n.textures=a),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const r=e.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class yf extends Tr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=Rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const He=new V,jo=new Mt;class jn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Eh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Dg("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[n+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)jo.fromBufferAttribute(this,e),jo.applyMatrix3(t),this.setXY(e,jo.x,jo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix3(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyMatrix4(t),this.setXYZ(e,He.x,He.y,He.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.applyNormalMatrix(t),this.setXYZ(e,He.x,He.y,He.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)He.fromBufferAttribute(this,e),He.transformDirection(t),this.setXYZ(e,He.x,He.y,He.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Wr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=xn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Wr(e,this.array)),e}setX(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Wr(e,this.array)),e}setY(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Wr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Wr(e,this.array)),e}setW(t,e){return this.normalized&&(e=xn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),n=xn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,r){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),n=xn(n,this.array),r=xn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this}setXYZW(t,e,n,r,a){return t*=this.itemSize,this.normalized&&(e=xn(e,this.array),n=xn(n,this.array),r=xn(r,this.array),a=xn(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Eh&&(t.usage=this.usage),t}}class xf extends jn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Mf extends jn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class nn extends jn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let $g=0;const Nn=new xe,Hl=new Je,qs=new V,An=new Ts,$r=new Ts,qe=new V;class gn extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=wr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(mf(t)?Mf:xf)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new re().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Nn.makeRotationFromQuaternion(t),this.applyMatrix4(Nn),this}rotateX(t){return Nn.makeRotationX(t),this.applyMatrix4(Nn),this}rotateY(t){return Nn.makeRotationY(t),this.applyMatrix4(Nn),this}rotateZ(t){return Nn.makeRotationZ(t),this.applyMatrix4(Nn),this}translate(t,e,n){return Nn.makeTranslation(t,e,n),this.applyMatrix4(Nn),this}scale(t,e,n){return Nn.makeScale(t,e,n),this.applyMatrix4(Nn),this}lookAt(t){return Hl.lookAt(t),Hl.updateMatrix(),this.applyMatrix4(Hl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qs).negate(),this.translate(qs.x,qs.y,qs.z),this}setFromPoints(t){const e=[];for(let n=0,r=t.length;n<r;n++){const a=t[n];e.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new nn(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ts);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,r=e.length;n<r;n++){const a=e[n];An.setFromBufferAttribute(a),this.morphTargetsRelative?(qe.addVectors(this.boundingBox.min,An.min),this.boundingBox.expandByPoint(qe),qe.addVectors(this.boundingBox.max,An.max),this.boundingBox.expandByPoint(qe)):(this.boundingBox.expandByPoint(An.min),this.boundingBox.expandByPoint(An.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Er);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const n=this.boundingSphere.center;if(An.setFromBufferAttribute(t),e)for(let a=0,l=e.length;a<l;a++){const u=e[a];$r.setFromBufferAttribute(u),this.morphTargetsRelative?(qe.addVectors(An.min,$r.min),An.expandByPoint(qe),qe.addVectors(An.max,$r.max),An.expandByPoint(qe)):(An.expandByPoint($r.min),An.expandByPoint($r.max))}An.getCenter(n);let r=0;for(let a=0,l=t.count;a<l;a++)qe.fromBufferAttribute(t,a),r=Math.max(r,n.distanceToSquared(qe));if(e)for(let a=0,l=e.length;a<l;a++){const u=e[a],h=this.morphTargetsRelative;for(let d=0,p=u.count;d<p;d++)qe.fromBufferAttribute(u,d),h&&(qs.fromBufferAttribute(t,d),qe.add(qs)),r=Math.max(r,n.distanceToSquared(qe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new jn(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),u=[],h=[];for(let U=0;U<n.count;U++)u[U]=new V,h[U]=new V;const d=new V,p=new V,m=new V,g=new Mt,_=new Mt,M=new Mt,w=new V,v=new V;function y(U,P,E){d.fromBufferAttribute(n,U),p.fromBufferAttribute(n,P),m.fromBufferAttribute(n,E),g.fromBufferAttribute(a,U),_.fromBufferAttribute(a,P),M.fromBufferAttribute(a,E),p.sub(d),m.sub(d),_.sub(g),M.sub(g);const z=1/(_.x*M.y-M.x*_.y);isFinite(z)&&(w.copy(p).multiplyScalar(M.y).addScaledVector(m,-_.y).multiplyScalar(z),v.copy(m).multiplyScalar(_.x).addScaledVector(p,-M.x).multiplyScalar(z),u[U].add(w),u[P].add(w),u[E].add(w),h[U].add(v),h[P].add(v),h[E].add(v))}let D=this.groups;D.length===0&&(D=[{start:0,count:t.count}]);for(let U=0,P=D.length;U<P;++U){const E=D[U],z=E.start,q=E.count;for(let k=z,W=z+q;k<W;k+=3)y(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const b=new V,C=new V,B=new V,N=new V;function R(U){B.fromBufferAttribute(r,U),N.copy(B);const P=u[U];b.copy(P),b.sub(B.multiplyScalar(B.dot(P))).normalize(),C.crossVectors(N,P);const z=C.dot(h[U])<0?-1:1;l.setXYZW(U,b.x,b.y,b.z,z)}for(let U=0,P=D.length;U<P;++U){const E=D[U],z=E.start,q=E.count;for(let k=z,W=z+q;k<W;k+=3)R(t.getX(k+0)),R(t.getX(k+1)),R(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new jn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let g=0,_=n.count;g<_;g++)n.setXYZ(g,0,0,0);const r=new V,a=new V,l=new V,u=new V,h=new V,d=new V,p=new V,m=new V;if(t)for(let g=0,_=t.count;g<_;g+=3){const M=t.getX(g+0),w=t.getX(g+1),v=t.getX(g+2);r.fromBufferAttribute(e,M),a.fromBufferAttribute(e,w),l.fromBufferAttribute(e,v),p.subVectors(l,a),m.subVectors(r,a),p.cross(m),u.fromBufferAttribute(n,M),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,v),u.add(p),h.add(p),d.add(p),n.setXYZ(M,u.x,u.y,u.z),n.setXYZ(w,h.x,h.y,h.z),n.setXYZ(v,d.x,d.y,d.z)}else for(let g=0,_=e.count;g<_;g+=3)r.fromBufferAttribute(e,g+0),a.fromBufferAttribute(e,g+1),l.fromBufferAttribute(e,g+2),p.subVectors(l,a),m.subVectors(r,a),p.cross(m),n.setXYZ(g+0,p.x,p.y,p.z),n.setXYZ(g+1,p.x,p.y,p.z),n.setXYZ(g+2,p.x,p.y,p.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)qe.fromBufferAttribute(t,e),qe.normalize(),t.setXYZ(e,qe.x,qe.y,qe.z)}toNonIndexed(){function t(u,h){const d=u.array,p=u.itemSize,m=u.normalized,g=new d.constructor(h.length*p);let _=0,M=0;for(let w=0,v=h.length;w<v;w++){u.isInterleavedBufferAttribute?_=h[w]*u.data.stride+u.offset:_=h[w]*p;for(let y=0;y<p;y++)g[M++]=d[_++]}return new jn(g,p,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new gn,n=this.index.array,r=this.attributes;for(const u in r){const h=r[u],d=t(h,n);e.setAttribute(u,d)}const a=this.morphAttributes;for(const u in a){const h=[],d=a[u];for(let p=0,m=d.length;p<m;p++){const g=d[p],_=t(g,n);h.push(_)}e.morphAttributes[u]=h}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let u=0,h=l.length;u<h;u++){const d=l[u];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const d in h)h[d]!==void 0&&(t[d]=h[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const d=n[h];t.data.attributes[h]=d.toJSON(t.data)}const r={};let a=!1;for(const h in this.morphAttributes){const d=this.morphAttributes[h],p=[];for(let m=0,g=d.length;m<g;m++){const _=d[m];p.push(_.toJSON(t.data))}p.length>0&&(r[h]=p,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const u=this.boundingSphere;return u!==null&&(t.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const r=t.attributes;for(const d in r){const p=r[d];this.setAttribute(d,p.clone(e))}const a=t.morphAttributes;for(const d in a){const p=[],m=a[d];for(let g=0,_=m.length;g<_;g++)p.push(m[g].clone(e));this.morphAttributes[d]=p}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,p=l.length;d<p;d++){const m=l[d];this.addGroup(m.start,m.count,m.materialIndex)}const u=t.boundingBox;u!==null&&(this.boundingBox=u.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fh=new xe,ls=new za,Ko=new Er,zh=new V,$s=new V,Ys=new V,js=new V,Vl=new V,Jo=new V,Qo=new Mt,ta=new Mt,ea=new Mt,Hh=new V,Vh=new V,Gh=new V,na=new V,ia=new V;class Ve extends Je{constructor(t=new gn,e=new yf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const u=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=a}}}}getVertexPosition(t,e){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(r,t);const u=this.morphTargetInfluences;if(a&&u){Jo.set(0,0,0);for(let h=0,d=a.length;h<d;h++){const p=u[h],m=a[h];p!==0&&(Vl.fromBufferAttribute(m,t),l?Jo.addScaledVector(Vl,p):Jo.addScaledVector(Vl.sub(e),p))}e.add(Jo)}return e}raycast(t,e){const n=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ko.copy(n.boundingSphere),Ko.applyMatrix4(a),ls.copy(t.ray).recast(t.near),!(Ko.containsPoint(ls.origin)===!1&&(ls.intersectSphere(Ko,zh)===null||ls.origin.distanceToSquared(zh)>(t.far-t.near)**2))&&(Fh.copy(a).invert(),ls.copy(t.ray).applyMatrix4(Fh),!(n.boundingBox!==null&&ls.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ls)))}_computeIntersections(t,e,n){let r;const a=this.geometry,l=this.material,u=a.index,h=a.attributes.position,d=a.attributes.uv,p=a.attributes.uv1,m=a.attributes.normal,g=a.groups,_=a.drawRange;if(u!==null)if(Array.isArray(l))for(let M=0,w=g.length;M<w;M++){const v=g[M],y=l[v.materialIndex],D=Math.max(v.start,_.start),b=Math.min(u.count,Math.min(v.start+v.count,_.start+_.count));for(let C=D,B=b;C<B;C+=3){const N=u.getX(C),R=u.getX(C+1),U=u.getX(C+2);r=sa(this,y,t,n,d,p,m,N,R,U),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=v.materialIndex,e.push(r))}}else{const M=Math.max(0,_.start),w=Math.min(u.count,_.start+_.count);for(let v=M,y=w;v<y;v+=3){const D=u.getX(v),b=u.getX(v+1),C=u.getX(v+2);r=sa(this,l,t,n,d,p,m,D,b,C),r&&(r.faceIndex=Math.floor(v/3),e.push(r))}}else if(h!==void 0)if(Array.isArray(l))for(let M=0,w=g.length;M<w;M++){const v=g[M],y=l[v.materialIndex],D=Math.max(v.start,_.start),b=Math.min(h.count,Math.min(v.start+v.count,_.start+_.count));for(let C=D,B=b;C<B;C+=3){const N=C,R=C+1,U=C+2;r=sa(this,y,t,n,d,p,m,N,R,U),r&&(r.faceIndex=Math.floor(C/3),r.face.materialIndex=v.materialIndex,e.push(r))}}else{const M=Math.max(0,_.start),w=Math.min(h.count,_.start+_.count);for(let v=M,y=w;v<y;v+=3){const D=v,b=v+1,C=v+2;r=sa(this,l,t,n,d,p,m,D,b,C),r&&(r.faceIndex=Math.floor(v/3),e.push(r))}}}}function Yg(s,t,e,n,r,a,l,u){let h;if(t.side===En?h=n.intersectTriangle(l,a,r,!0,u):h=n.intersectTriangle(r,a,l,t.side===ji,u),h===null)return null;ia.copy(u),ia.applyMatrix4(s.matrixWorld);const d=e.ray.origin.distanceTo(ia);return d<e.near||d>e.far?null:{distance:d,point:ia.clone(),object:s}}function sa(s,t,e,n,r,a,l,u,h,d){s.getVertexPosition(u,$s),s.getVertexPosition(h,Ys),s.getVertexPosition(d,js);const p=Yg(s,t,e,n,$s,Ys,js,na);if(p){r&&(Qo.fromBufferAttribute(r,u),ta.fromBufferAttribute(r,h),ea.fromBufferAttribute(r,d),p.uv=$n.getInterpolation(na,$s,Ys,js,Qo,ta,ea,new Mt)),a&&(Qo.fromBufferAttribute(a,u),ta.fromBufferAttribute(a,h),ea.fromBufferAttribute(a,d),p.uv1=$n.getInterpolation(na,$s,Ys,js,Qo,ta,ea,new Mt)),l&&(Hh.fromBufferAttribute(l,u),Vh.fromBufferAttribute(l,h),Gh.fromBufferAttribute(l,d),p.normal=$n.getInterpolation(na,$s,Ys,js,Hh,Vh,Gh,new V),p.normal.dot(n.direction)>0&&p.normal.multiplyScalar(-1));const m={a:u,b:h,c:d,normal:new V,materialIndex:0};$n.getNormal($s,Ys,js,m.normal),p.face=m}return p}class Ri extends gn{constructor(t=1,e=1,n=1,r=1,a=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:r,heightSegments:a,depthSegments:l};const u=this;r=Math.floor(r),a=Math.floor(a),l=Math.floor(l);const h=[],d=[],p=[],m=[];let g=0,_=0;M("z","y","x",-1,-1,n,e,t,l,a,0),M("z","y","x",1,-1,n,e,-t,l,a,1),M("x","z","y",1,1,t,n,e,r,l,2),M("x","z","y",1,-1,t,n,-e,r,l,3),M("x","y","z",1,-1,t,e,n,r,a,4),M("x","y","z",-1,-1,t,e,-n,r,a,5),this.setIndex(h),this.setAttribute("position",new nn(d,3)),this.setAttribute("normal",new nn(p,3)),this.setAttribute("uv",new nn(m,2));function M(w,v,y,D,b,C,B,N,R,U,P){const E=C/R,z=B/U,q=C/2,k=B/2,W=N/2,X=R+1,J=U+1;let ht=0,F=0;const rt=new V;for(let Z=0;Z<J;Z++){const dt=Z*z-k;for(let bt=0;bt<X;bt++){const Dt=bt*E-q;rt[w]=Dt*D,rt[v]=dt*b,rt[y]=W,d.push(rt.x,rt.y,rt.z),rt[w]=0,rt[v]=0,rt[y]=N>0?1:-1,p.push(rt.x,rt.y,rt.z),m.push(bt/R),m.push(1-Z/U),ht+=1}}for(let Z=0;Z<U;Z++)for(let dt=0;dt<R;dt++){const bt=g+dt+X*Z,Dt=g+dt+X*(Z+1),K=g+(dt+1)+X*(Z+1),ct=g+(dt+1)+X*Z;h.push(bt,Dt,ct),h.push(Dt,K,ct),F+=6}u.addGroup(_,F,P),_+=F,g+=ht}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ri(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function yr(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const r=s[e][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=r.clone():Array.isArray(r)?t[e][n]=r.slice():t[e][n]=r}}return t}function fn(s){const t={};for(let e=0;e<s.length;e++){const n=yr(s[e]);for(const r in n)t[r]=n[r]}return t}function jg(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function bf(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ye.workingColorSpace}const Kg={clone:yr,merge:fn};var Jg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ki extends Tr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jg,this.fragmentShader=Qg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yr(t.uniforms),this.uniformsGroups=jg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const l=this.uniforms[r].value;l&&l.isTexture?e.uniforms[r]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[r]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[r]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[r]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[r]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[r]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[r]={type:"m4",value:l.toArray()}:e.uniforms[r]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Sf extends Je{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Li}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Hi=new V,Wh=new Mt,Zh=new Mt;class Un extends Sf{constructor(t=50,e=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=mc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(no*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return mc*2*Math.atan(Math.tan(no*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Hi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z),Hi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hi.x,Hi.y).multiplyScalar(-t/Hi.z)}getViewSize(t,e){return this.getViewBounds(t,Wh,Zh),e.subVectors(Zh,Wh)}setViewOffset(t,e,n,r,a,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(no*.5*this.fov)/this.zoom,n=2*e,r=this.aspect*n,a=-.5*r;const l=this.view;if(this.view!==null&&this.view.enabled){const h=l.fullWidth,d=l.fullHeight;a+=l.offsetX*r/h,e-=l.offsetY*n/d,r*=l.width/h,n*=l.height/d}const u=this.filmOffset;u!==0&&(a+=t*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ks=-90,Js=1;class t_ extends Je{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Un(Ks,Js,t,e);r.layers=this.layers,this.add(r);const a=new Un(Ks,Js,t,e);a.layers=this.layers,this.add(a);const l=new Un(Ks,Js,t,e);l.layers=this.layers,this.add(l);const u=new Un(Ks,Js,t,e);u.layers=this.layers,this.add(u);const h=new Un(Ks,Js,t,e);h.layers=this.layers,this.add(h);const d=new Un(Ks,Js,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,r,a,l,u,h]=e;for(const d of e)this.remove(d);if(t===Li)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,l,u,h,d,p]=this.children,m=t.getRenderTarget(),g=t.getActiveCubeFace(),_=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const w=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,r),t.render(e,a),t.setRenderTarget(n,1,r),t.render(e,l),t.setRenderTarget(n,2,r),t.render(e,u),t.setRenderTarget(n,3,r),t.render(e,h),t.setRenderTarget(n,4,r),t.render(e,d),n.texture.generateMipmaps=w,t.setRenderTarget(n,5,r),t.render(e,p),t.setRenderTarget(m,g,_),t.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class wf extends ln{constructor(t,e,n,r,a,l,u,h,d,p){t=t!==void 0?t:[],e=e!==void 0?e:gr,super(t,e,n,r,a,l,u,h,d,p),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class e_ extends xs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},r=[n,n,n,n,n,n];this.texture=new wf(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:qn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ri(5,5,5),a=new Ki({name:"CubemapFromEquirect",uniforms:yr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:En,blending:Zi});a.uniforms.tEquirect.value=e;const l=new Ve(r,a),u=e.minFilter;return e.minFilter===_s&&(e.minFilter=qn),new t_(1,10,this).update(t,l),e.minFilter=u,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,r){const a=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,r);t.setRenderTarget(a)}}const Gl=new V,n_=new V,i_=new re;class kn{constructor(t=new V(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,r){return this.normal.set(t,e,n),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const r=Gl.subVectors(n,e).cross(n_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Gl),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||i_.getNormalMatrix(t),r=this.coplanarPoint(Gl).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const cs=new Er,ra=new V;class Nc{constructor(t=new kn,e=new kn,n=new kn,r=new kn,a=new kn,l=new kn){this.planes=[t,e,n,r,a,l]}set(t,e,n,r,a,l){const u=this.planes;return u[0].copy(t),u[1].copy(e),u[2].copy(n),u[3].copy(r),u[4].copy(a),u[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Li){const n=this.planes,r=t.elements,a=r[0],l=r[1],u=r[2],h=r[3],d=r[4],p=r[5],m=r[6],g=r[7],_=r[8],M=r[9],w=r[10],v=r[11],y=r[12],D=r[13],b=r[14],C=r[15];if(n[0].setComponents(h-a,g-d,v-_,C-y).normalize(),n[1].setComponents(h+a,g+d,v+_,C+y).normalize(),n[2].setComponents(h+l,g+p,v+M,C+D).normalize(),n[3].setComponents(h-l,g-p,v-M,C-D).normalize(),n[4].setComponents(h-u,g-m,v-w,C-b).normalize(),e===Li)n[5].setComponents(h+u,g+m,v+w,C+b).normalize();else if(e===Ea)n[5].setComponents(u,m,w,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),cs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),cs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(cs)}intersectsSprite(t){return cs.center.set(0,0,0),cs.radius=.7071067811865476,cs.applyMatrix4(t.matrixWorld),this.intersectsSphere(cs)}intersectsSphere(t){const e=this.planes,n=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const r=e[n];if(ra.x=r.normal.x>0?t.max.x:t.min.x,ra.y=r.normal.y>0?t.max.y:t.min.y,ra.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(ra)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ef(){let s=null,t=!1,e=null,n=null;function r(a,l){e(a,l),n=s.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(r),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){s=a}}}function s_(s){const t=new WeakMap;function e(u,h){const d=u.array,p=u.usage,m=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,p),u.onUploadCallback();let _;if(d instanceof Float32Array)_=s.FLOAT;else if(d instanceof Uint16Array)u.isFloat16BufferAttribute?_=s.HALF_FLOAT:_=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=s.SHORT;else if(d instanceof Uint32Array)_=s.UNSIGNED_INT;else if(d instanceof Int32Array)_=s.INT;else if(d instanceof Int8Array)_=s.BYTE;else if(d instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:u.version,size:m}}function n(u,h,d){const p=h.array,m=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,u),m.count===-1&&g.length===0&&s.bufferSubData(d,0,p),g.length!==0){for(let _=0,M=g.length;_<M;_++){const w=g[_];s.bufferSubData(d,w.start*p.BYTES_PER_ELEMENT,p,w.start,w.count)}h.clearUpdateRanges()}m.count!==-1&&(s.bufferSubData(d,m.offset*p.BYTES_PER_ELEMENT,p,m.offset,m.count),m.count=-1),h.onUploadCallback()}function r(u){return u.isInterleavedBufferAttribute&&(u=u.data),t.get(u)}function a(u){u.isInterleavedBufferAttribute&&(u=u.data);const h=t.get(u);h&&(s.deleteBuffer(h.buffer),t.delete(u))}function l(u,h){if(u.isGLBufferAttribute){const p=t.get(u);(!p||p.version<u.version)&&t.set(u,{buffer:u.buffer,type:u.type,bytesPerElement:u.elementSize,version:u.version});return}u.isInterleavedBufferAttribute&&(u=u.data);const d=t.get(u);if(d===void 0)t.set(u,e(u,h));else if(d.version<u.version){if(d.size!==u.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,u,h),d.version=u.version}}return{get:r,remove:a,update:l}}class _o extends gn{constructor(t=1,e=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:r};const a=t/2,l=e/2,u=Math.floor(n),h=Math.floor(r),d=u+1,p=h+1,m=t/u,g=e/h,_=[],M=[],w=[],v=[];for(let y=0;y<p;y++){const D=y*g-l;for(let b=0;b<d;b++){const C=b*m-a;M.push(C,-D,0),w.push(0,0,1),v.push(b/u),v.push(1-y/h)}}for(let y=0;y<h;y++)for(let D=0;D<u;D++){const b=D+d*y,C=D+d*(y+1),B=D+1+d*(y+1),N=D+1+d*y;_.push(b,C,N),_.push(C,B,N)}this.setIndex(_),this.setAttribute("position",new nn(M,3)),this.setAttribute("normal",new nn(w,3)),this.setAttribute("uv",new nn(v,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _o(t.width,t.height,t.widthSegments,t.heightSegments)}}var r_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,o_=`#ifdef USE_ALPHAHASH
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
#endif`,a_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,l_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,c_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,u_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,h_=`#ifdef USE_AOMAP
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
#endif`,d_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,f_=`#ifdef USE_BATCHING
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
#endif`,p_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,m_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,g_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,__=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,v_=`#ifdef USE_IRIDESCENCE
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
#endif`,y_=`#ifdef USE_BUMPMAP
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
#endif`,x_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,b_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,w_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,E_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,T_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,A_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,L_=`#define PI 3.141592653589793
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
} // validated`,P_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,C_=`vec3 transformedNormal = objectNormal;
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
#endif`,R_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,I_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,D_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,N_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,O_="gl_FragColor = linearToOutputTexel( gl_FragColor );",U_=`
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
}`,k_=`#ifdef USE_ENVMAP
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
#endif`,B_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,F_=`#ifdef USE_ENVMAP
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
#endif`,z_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,H_=`#ifdef USE_ENVMAP
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
#endif`,V_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,G_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,W_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Z_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,X_=`#ifdef USE_GRADIENTMAP
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
}`,q_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Y_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,j_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,K_=`uniform bool receiveShadow;
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
#endif`,J_=`#ifdef USE_ENVMAP
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
#endif`,Q_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ev=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iv=`PhysicalMaterial material;
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
#endif`,sv=`struct PhysicalMaterial {
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
}`,rv=`
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
#endif`,ov=`#if defined( RE_IndirectDiffuse )
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
#endif`,av=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,mv=`#if defined( USE_POINTS_UV )
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
#endif`,gv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_v=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xv=`#ifdef USE_MORPHNORMALS
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
#endif`,Mv=`#ifdef USE_MORPHTARGETS
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
#endif`,bv=`#ifdef USE_MORPHTARGETS
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
#endif`,Sv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,wv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ev=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Av=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Lv=`#ifdef USE_NORMALMAP
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
#endif`,Pv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Iv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Ov=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Uv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Bv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Wv=`float getShadowMask() {
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
}`,Zv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xv=`#ifdef USE_SKINNING
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
#endif`,qv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$v=`#ifdef USE_SKINNING
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
#endif`,Yv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qv=`#ifdef USE_TRANSMISSION
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
#endif`,ty=`#ifdef USE_TRANSMISSION
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
#endif`,ey=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ny=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,iy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ry=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,oy=`uniform sampler2D t2D;
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
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ly=`#ifdef ENVMAP_TYPE_CUBE
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
}`,cy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hy=`#include <common>
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
}`,dy=`#if DEPTH_PACKING == 3200
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
}`,fy=`#define DISTANCE
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
}`,py=`#define DISTANCE
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
}`,my=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,gy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_y=`uniform float scale;
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
}`,vy=`uniform vec3 diffuse;
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
}`,yy=`#include <common>
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
}`,xy=`uniform vec3 diffuse;
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
}`,My=`#define LAMBERT
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
}`,by=`#define LAMBERT
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
}`,Sy=`#define MATCAP
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
}`,wy=`#define MATCAP
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
}`,Ey=`#define NORMAL
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
}`,Ty=`#define NORMAL
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
}`,Ay=`#define PHONG
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
}`,Ly=`#define PHONG
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
}`,Py=`#define STANDARD
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
}`,Cy=`#define STANDARD
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
}`,Ry=`#define TOON
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
}`,Iy=`#define TOON
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
}`,Dy=`uniform float size;
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
}`,Ny=`uniform vec3 diffuse;
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
}`,Oy=`#include <common>
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
}`,Uy=`uniform vec3 color;
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
}`,ky=`uniform float rotation;
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
}`,By=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:r_,alphahash_pars_fragment:o_,alphamap_fragment:a_,alphamap_pars_fragment:l_,alphatest_fragment:c_,alphatest_pars_fragment:u_,aomap_fragment:h_,aomap_pars_fragment:d_,batching_pars_vertex:f_,batching_vertex:p_,begin_vertex:m_,beginnormal_vertex:g_,bsdfs:__,iridescence_fragment:v_,bumpmap_pars_fragment:y_,clipping_planes_fragment:x_,clipping_planes_pars_fragment:M_,clipping_planes_pars_vertex:b_,clipping_planes_vertex:S_,color_fragment:w_,color_pars_fragment:E_,color_pars_vertex:T_,color_vertex:A_,common:L_,cube_uv_reflection_fragment:P_,defaultnormal_vertex:C_,displacementmap_pars_vertex:R_,displacementmap_vertex:I_,emissivemap_fragment:D_,emissivemap_pars_fragment:N_,colorspace_fragment:O_,colorspace_pars_fragment:U_,envmap_fragment:k_,envmap_common_pars_fragment:B_,envmap_pars_fragment:F_,envmap_pars_vertex:z_,envmap_physical_pars_fragment:J_,envmap_vertex:H_,fog_vertex:V_,fog_pars_vertex:G_,fog_fragment:W_,fog_pars_fragment:Z_,gradientmap_pars_fragment:X_,lightmap_fragment:q_,lightmap_pars_fragment:$_,lights_lambert_fragment:Y_,lights_lambert_pars_fragment:j_,lights_pars_begin:K_,lights_toon_fragment:Q_,lights_toon_pars_fragment:tv,lights_phong_fragment:ev,lights_phong_pars_fragment:nv,lights_physical_fragment:iv,lights_physical_pars_fragment:sv,lights_fragment_begin:rv,lights_fragment_maps:ov,lights_fragment_end:av,logdepthbuf_fragment:lv,logdepthbuf_pars_fragment:cv,logdepthbuf_pars_vertex:uv,logdepthbuf_vertex:hv,map_fragment:dv,map_pars_fragment:fv,map_particle_fragment:pv,map_particle_pars_fragment:mv,metalnessmap_fragment:gv,metalnessmap_pars_fragment:_v,morphinstance_vertex:vv,morphcolor_vertex:yv,morphnormal_vertex:xv,morphtarget_pars_vertex:Mv,morphtarget_vertex:bv,normal_fragment_begin:Sv,normal_fragment_maps:wv,normal_pars_fragment:Ev,normal_pars_vertex:Tv,normal_vertex:Av,normalmap_pars_fragment:Lv,clearcoat_normal_fragment_begin:Pv,clearcoat_normal_fragment_maps:Cv,clearcoat_pars_fragment:Rv,iridescence_pars_fragment:Iv,opaque_fragment:Dv,packing:Nv,premultiplied_alpha_fragment:Ov,project_vertex:Uv,dithering_fragment:kv,dithering_pars_fragment:Bv,roughnessmap_fragment:Fv,roughnessmap_pars_fragment:zv,shadowmap_pars_fragment:Hv,shadowmap_pars_vertex:Vv,shadowmap_vertex:Gv,shadowmask_pars_fragment:Wv,skinbase_vertex:Zv,skinning_pars_vertex:Xv,skinning_vertex:qv,skinnormal_vertex:$v,specularmap_fragment:Yv,specularmap_pars_fragment:jv,tonemapping_fragment:Kv,tonemapping_pars_fragment:Jv,transmission_fragment:Qv,transmission_pars_fragment:ty,uv_pars_fragment:ey,uv_pars_vertex:ny,uv_vertex:iy,worldpos_vertex:sy,background_vert:ry,background_frag:oy,backgroundCube_vert:ay,backgroundCube_frag:ly,cube_vert:cy,cube_frag:uy,depth_vert:hy,depth_frag:dy,distanceRGBA_vert:fy,distanceRGBA_frag:py,equirect_vert:my,equirect_frag:gy,linedashed_vert:_y,linedashed_frag:vy,meshbasic_vert:yy,meshbasic_frag:xy,meshlambert_vert:My,meshlambert_frag:by,meshmatcap_vert:Sy,meshmatcap_frag:wy,meshnormal_vert:Ey,meshnormal_frag:Ty,meshphong_vert:Ay,meshphong_frag:Ly,meshphysical_vert:Py,meshphysical_frag:Cy,meshtoon_vert:Ry,meshtoon_frag:Iy,points_vert:Dy,points_frag:Ny,shadow_vert:Oy,shadow_frag:Uy,sprite_vert:ky,sprite_frag:By},Tt={common:{diffuse:{value:new ne(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},envMapRotation:{value:new re},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ne(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ne(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new ne(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},oi={basic:{uniforms:fn([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:fn([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new ne(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:fn([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new ne(0)},specular:{value:new ne(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:fn([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new ne(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:fn([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new ne(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:fn([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:fn([Tt.points,Tt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:fn([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:fn([Tt.common,Tt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:fn([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:fn([Tt.sprite,Tt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new re}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:fn([Tt.common,Tt.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:fn([Tt.lights,Tt.fog,{color:{value:new ne(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};oi.physical={uniforms:fn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new ne(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new ne(0)},specularColor:{value:new ne(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const oa={r:0,b:0,g:0},us=new hi,Fy=new xe;function zy(s,t,e,n,r,a,l){const u=new ne(0);let h=a===!0?0:1,d,p,m=null,g=0,_=null;function M(v,y){let D=!1,b=y.isScene===!0?y.background:null;b&&b.isTexture&&(b=(y.backgroundBlurriness>0?e:t).get(b)),b===null?w(u,h):b&&b.isColor&&(w(b,1),D=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,l):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(s.autoClear||D)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Ba)?(p===void 0&&(p=new Ve(new Ri(1,1,1),new Ki({name:"BackgroundCubeMaterial",uniforms:yr(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),p.geometry.deleteAttribute("normal"),p.geometry.deleteAttribute("uv"),p.onBeforeRender=function(B,N,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(p.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(p)),us.copy(y.backgroundRotation),us.x*=-1,us.y*=-1,us.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(us.y*=-1,us.z*=-1),p.material.uniforms.envMap.value=b,p.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,p.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,p.material.uniforms.backgroundRotation.value.setFromMatrix4(Fy.makeRotationFromEuler(us)),p.material.toneMapped=ye.getTransfer(b.colorSpace)!==Ee,(m!==b||g!==b.version||_!==s.toneMapping)&&(p.material.needsUpdate=!0,m=b,g=b.version,_=s.toneMapping),p.layers.enableAll(),v.unshift(p,p.geometry,p.material,0,0,null)):b&&b.isTexture&&(d===void 0&&(d=new Ve(new _o(2,2),new Ki({name:"BackgroundMaterial",uniforms:yr(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:ji,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(d)),d.material.uniforms.t2D.value=b,d.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,d.material.toneMapped=ye.getTransfer(b.colorSpace)!==Ee,b.matrixAutoUpdate===!0&&b.updateMatrix(),d.material.uniforms.uvTransform.value.copy(b.matrix),(m!==b||g!==b.version||_!==s.toneMapping)&&(d.material.needsUpdate=!0,m=b,g=b.version,_=s.toneMapping),d.layers.enableAll(),v.unshift(d,d.geometry,d.material,0,0,null))}function w(v,y){v.getRGB(oa,bf(s)),n.buffers.color.setClear(oa.r,oa.g,oa.b,y,l)}return{getClearColor:function(){return u},setClearColor:function(v,y=1){u.set(v),h=y,w(u,h)},getClearAlpha:function(){return h},setClearAlpha:function(v){h=v,w(u,h)},render:M}}function Hy(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},r=g(null);let a=r,l=!1;function u(E,z,q,k,W){let X=!1;const J=m(k,q,z);a!==J&&(a=J,d(a.object)),X=_(E,k,q,W),X&&M(E,k,q,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(X||l)&&(l=!1,C(E,z,q,k),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function h(){return s.createVertexArray()}function d(E){return s.bindVertexArray(E)}function p(E){return s.deleteVertexArray(E)}function m(E,z,q){const k=q.wireframe===!0;let W=n[E.id];W===void 0&&(W={},n[E.id]=W);let X=W[z.id];X===void 0&&(X={},W[z.id]=X);let J=X[k];return J===void 0&&(J=g(h()),X[k]=J),J}function g(E){const z=[],q=[],k=[];for(let W=0;W<e;W++)z[W]=0,q[W]=0,k[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:q,attributeDivisors:k,object:E,attributes:{},index:null}}function _(E,z,q,k){const W=a.attributes,X=z.attributes;let J=0;const ht=q.getAttributes();for(const F in ht)if(ht[F].location>=0){const Z=W[F];let dt=X[F];if(dt===void 0&&(F==="instanceMatrix"&&E.instanceMatrix&&(dt=E.instanceMatrix),F==="instanceColor"&&E.instanceColor&&(dt=E.instanceColor)),Z===void 0||Z.attribute!==dt||dt&&Z.data!==dt.data)return!0;J++}return a.attributesNum!==J||a.index!==k}function M(E,z,q,k){const W={},X=z.attributes;let J=0;const ht=q.getAttributes();for(const F in ht)if(ht[F].location>=0){let Z=X[F];Z===void 0&&(F==="instanceMatrix"&&E.instanceMatrix&&(Z=E.instanceMatrix),F==="instanceColor"&&E.instanceColor&&(Z=E.instanceColor));const dt={};dt.attribute=Z,Z&&Z.data&&(dt.data=Z.data),W[F]=dt,J++}a.attributes=W,a.attributesNum=J,a.index=k}function w(){const E=a.newAttributes;for(let z=0,q=E.length;z<q;z++)E[z]=0}function v(E){y(E,0)}function y(E,z){const q=a.newAttributes,k=a.enabledAttributes,W=a.attributeDivisors;q[E]=1,k[E]===0&&(s.enableVertexAttribArray(E),k[E]=1),W[E]!==z&&(s.vertexAttribDivisor(E,z),W[E]=z)}function D(){const E=a.newAttributes,z=a.enabledAttributes;for(let q=0,k=z.length;q<k;q++)z[q]!==E[q]&&(s.disableVertexAttribArray(q),z[q]=0)}function b(E,z,q,k,W,X,J){J===!0?s.vertexAttribIPointer(E,z,q,W,X):s.vertexAttribPointer(E,z,q,k,W,X)}function C(E,z,q,k){w();const W=k.attributes,X=q.getAttributes(),J=z.defaultAttributeValues;for(const ht in X){const F=X[ht];if(F.location>=0){let rt=W[ht];if(rt===void 0&&(ht==="instanceMatrix"&&E.instanceMatrix&&(rt=E.instanceMatrix),ht==="instanceColor"&&E.instanceColor&&(rt=E.instanceColor)),rt!==void 0){const Z=rt.normalized,dt=rt.itemSize,bt=t.get(rt);if(bt===void 0)continue;const Dt=bt.buffer,K=bt.type,ct=bt.bytesPerElement,pt=K===s.INT||K===s.UNSIGNED_INT||rt.gpuType===rf;if(rt.isInterleavedBufferAttribute){const yt=rt.data,Ut=yt.stride,Lt=rt.offset;if(yt.isInstancedInterleavedBuffer){for(let Et=0;Et<F.locationSize;Et++)y(F.location+Et,yt.meshPerAttribute);E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let Et=0;Et<F.locationSize;Et++)v(F.location+Et);s.bindBuffer(s.ARRAY_BUFFER,Dt);for(let Et=0;Et<F.locationSize;Et++)b(F.location+Et,dt/F.locationSize,K,Z,Ut*ct,(Lt+dt/F.locationSize*Et)*ct,pt)}else{if(rt.isInstancedBufferAttribute){for(let yt=0;yt<F.locationSize;yt++)y(F.location+yt,rt.meshPerAttribute);E.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let yt=0;yt<F.locationSize;yt++)v(F.location+yt);s.bindBuffer(s.ARRAY_BUFFER,Dt);for(let yt=0;yt<F.locationSize;yt++)b(F.location+yt,dt/F.locationSize,K,Z,dt*ct,dt/F.locationSize*yt*ct,pt)}}else if(J!==void 0){const Z=J[ht];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(F.location,Z);break;case 3:s.vertexAttrib3fv(F.location,Z);break;case 4:s.vertexAttrib4fv(F.location,Z);break;default:s.vertexAttrib1fv(F.location,Z)}}}}D()}function B(){U();for(const E in n){const z=n[E];for(const q in z){const k=z[q];for(const W in k)p(k[W].object),delete k[W];delete z[q]}delete n[E]}}function N(E){if(n[E.id]===void 0)return;const z=n[E.id];for(const q in z){const k=z[q];for(const W in k)p(k[W].object),delete k[W];delete z[q]}delete n[E.id]}function R(E){for(const z in n){const q=n[z];if(q[E.id]===void 0)continue;const k=q[E.id];for(const W in k)p(k[W].object),delete k[W];delete q[E.id]}}function U(){P(),l=!0,a!==r&&(a=r,d(a.object))}function P(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:u,reset:U,resetDefaultState:P,dispose:B,releaseStatesOfGeometry:N,releaseStatesOfProgram:R,initAttributes:w,enableAttribute:v,disableUnusedAttributes:D}}function Vy(s,t,e){let n;function r(h){n=h}function a(h,d){s.drawArrays(n,h,d),e.update(d,n,1)}function l(h,d,p){p!==0&&(s.drawArraysInstanced(n,h,d,p),e.update(d,n,p))}function u(h,d,p){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<p;g++)this.render(h[g],d[g]);else{m.multiDrawArraysWEBGL(n,h,0,d,0,p);let g=0;for(let _=0;_<p;_++)g+=d[_];e.update(g,n,1)}}this.setMode=r,this.render=a,this.renderInstances=l,this.renderMultiDraw=u}function Gy(s,t,e){let n;function r(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const u=a(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),M=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=p>0,D=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:a,precision:l,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:p,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:M,maxVaryings:w,maxFragmentUniforms:v,vertexTextures:y,maxSamples:D}}function Wy(s){const t=this;let e=null,n=0,r=!1,a=!1;const l=new kn,u=new re,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(m,g){const _=m.length!==0||g||n!==0||r;return r=g,n=m.length,_},this.beginShadows=function(){a=!0,p(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(m,g){e=p(m,g,0)},this.setState=function(m,g,_){const M=m.clippingPlanes,w=m.clipIntersection,v=m.clipShadows,y=s.get(m);if(!r||M===null||M.length===0||a&&!v)a?p(null):d();else{const D=a?0:n,b=D*4;let C=y.clippingState||null;h.value=C,C=p(M,g,b,_);for(let B=0;B!==b;++B)C[B]=e[B];y.clippingState=C,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=D}};function d(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function p(m,g,_,M){const w=m!==null?m.length:0;let v=null;if(w!==0){if(v=h.value,M!==!0||v===null){const y=_+w*4,D=g.matrixWorldInverse;u.getNormalMatrix(D),(v===null||v.length<y)&&(v=new Float32Array(y));for(let b=0,C=_;b!==w;++b,C+=4)l.copy(m[b]).applyMatrix4(D,u),l.normal.toArray(v,C),v[C+3]=l.constant}h.value=v,h.needsUpdate=!0}return t.numPlanes=w,t.numIntersection=0,v}}function Zy(s){let t=new WeakMap;function e(l,u){return u===hc?l.mapping=gr:u===dc&&(l.mapping=_r),l}function n(l){if(l&&l.isTexture){const u=l.mapping;if(u===hc||u===dc)if(t.has(l)){const h=t.get(l).texture;return e(h,l.mapping)}else{const h=l.image;if(h&&h.height>0){const d=new e_(h.height);return d.fromEquirectangularTexture(s,l),t.set(l,d),l.addEventListener("dispose",r),e(d.texture,l.mapping)}else return null}}return l}function r(l){const u=l.target;u.removeEventListener("dispose",r);const h=t.get(u);h!==void 0&&(t.delete(u),h.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class Tf extends Sf{constructor(t=-1,e=1,n=1,r=-1,a=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=r,this.near=a,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,r,a,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-t,l=n+t,u=r+e,h=r-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,p=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=d*this.view.offsetX,l=a+d*this.view.width,u-=p*this.view.offsetY,h=u-p*this.view.height}this.projectionMatrix.makeOrthographic(a,l,u,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const or=4,Xh=[.125,.215,.35,.446,.526,.582],ms=20,Wl=new Tf,qh=new ne;let Zl=null,Xl=0,ql=0,$l=!1;const ds=(1+Math.sqrt(5))/2,Qs=1/ds,$h=[new V(1,1,1),new V(-1,1,1),new V(1,1,-1),new V(-1,1,-1),new V(0,ds,Qs),new V(0,ds,-Qs),new V(Qs,0,ds),new V(-Qs,0,ds),new V(ds,Qs,0),new V(-ds,Qs,0)];class Yh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,r=100){Zl=this._renderer.getRenderTarget(),Xl=this._renderer.getActiveCubeFace(),ql=this._renderer.getActiveMipmapLevel(),$l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Zl,Xl,ql),this._renderer.xr.enabled=$l,t.scissorTest=!1,aa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gr||t.mapping===_r?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Zl=this._renderer.getRenderTarget(),Xl=this._renderer.getActiveCubeFace(),ql=this._renderer.getActiveMipmapLevel(),$l=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:qn,minFilter:qn,generateMipmaps:!1,type:Ma,format:ci,colorSpace:Ji,depthBuffer:!1},r=jh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=jh(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xy(a)),this._blurMaterial=qy(a,t,e)}return r}_compileMaterial(t){const e=new Ve(this._lodPlanes[0],t);this._renderer.compile(e,Wl)}_sceneToCubeUV(t,e,n,r){const u=new Un(90,1,e,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,m=p.autoClear,g=p.toneMapping;p.getClearColor(qh),p.toneMapping=Xi,p.autoClear=!1;const _=new yf({name:"PMREM.Background",side:En,depthWrite:!1,depthTest:!1}),M=new Ve(new Ri,_);let w=!1;const v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,w=!0):(_.color.copy(qh),w=!0);for(let y=0;y<6;y++){const D=y%3;D===0?(u.up.set(0,h[y],0),u.lookAt(d[y],0,0)):D===1?(u.up.set(0,0,h[y]),u.lookAt(0,d[y],0)):(u.up.set(0,h[y],0),u.lookAt(0,0,d[y]));const b=this._cubeSize;aa(r,D*b,y>2?b:0,b,b),p.setRenderTarget(r),w&&p.render(M,u),p.render(t,u)}M.geometry.dispose(),M.material.dispose(),p.toneMapping=g,p.autoClear=m,t.background=v}_textureToCubeUV(t,e){const n=this._renderer,r=t.mapping===gr||t.mapping===_r;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kh());const a=r?this._cubemapMaterial:this._equirectMaterial,l=new Ve(this._lodPlanes[0],a),u=a.uniforms;u.envMap.value=t;const h=this._cubeSize;aa(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(l,Wl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let r=1;r<this._lodPlanes.length;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),l=$h[(r-1)%$h.length];this._blur(t,r-1,r,a,l)}e.autoClear=n}_blur(t,e,n,r,a){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,r,"latitudinal",a),this._halfBlur(l,t,n,n,r,"longitudinal",a)}_halfBlur(t,e,n,r,a,l,u){const h=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const p=3,m=new Ve(this._lodPlanes[r],d),g=d.uniforms,_=this._sizeLods[n]-1,M=isFinite(a)?Math.PI/(2*_):2*Math.PI/(2*ms-1),w=a/M,v=isFinite(a)?1+Math.floor(p*w):ms;v>ms&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${ms}`);const y=[];let D=0;for(let R=0;R<ms;++R){const U=R/w,P=Math.exp(-U*U/2);y.push(P),R===0?D+=P:R<v&&(D+=2*P)}for(let R=0;R<y.length;R++)y[R]=y[R]/D;g.envMap.value=t.texture,g.samples.value=v,g.weights.value=y,g.latitudinal.value=l==="latitudinal",u&&(g.poleAxis.value=u);const{_lodMax:b}=this;g.dTheta.value=M,g.mipInt.value=b-n;const C=this._sizeLods[r],B=3*C*(r>b-or?r-b+or:0),N=4*(this._cubeSize-C);aa(e,B,N,3*C,2*C),h.setRenderTarget(e),h.render(m,Wl)}}function Xy(s){const t=[],e=[],n=[];let r=s;const a=s-or+1+Xh.length;for(let l=0;l<a;l++){const u=Math.pow(2,r);e.push(u);let h=1/u;l>s-or?h=Xh[l-s+or-1]:l===0&&(h=0),n.push(h);const d=1/(u-2),p=-d,m=1+d,g=[p,p,m,p,m,m,p,p,m,m,p,m],_=6,M=6,w=3,v=2,y=1,D=new Float32Array(w*M*_),b=new Float32Array(v*M*_),C=new Float32Array(y*M*_);for(let N=0;N<_;N++){const R=N%3*2/3-1,U=N>2?0:-1,P=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];D.set(P,w*M*N),b.set(g,v*M*N);const E=[N,N,N,N,N,N];C.set(E,y*M*N)}const B=new gn;B.setAttribute("position",new jn(D,w)),B.setAttribute("uv",new jn(b,v)),B.setAttribute("faceIndex",new jn(C,y)),t.push(B),r>or&&r--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function jh(s,t,e){const n=new xs(s,t,e);return n.texture.mapping=Ba,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function aa(s,t,e,n,r){s.viewport.set(t,e,n,r),s.scissor.set(t,e,n,r)}function qy(s,t,e){const n=new Float32Array(ms),r=new V(0,1,0);return new Ki({name:"SphericalGaussianBlur",defines:{n:ms,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Oc(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Kh(){return new Ki({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oc(),fragmentShader:`

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
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Jh(){return new Ki({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Zi,depthTest:!1,depthWrite:!1})}function Oc(){return`

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
	`}function $y(s){let t=new WeakMap,e=null;function n(u){if(u&&u.isTexture){const h=u.mapping,d=h===hc||h===dc,p=h===gr||h===_r;if(d||p){let m=t.get(u);const g=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return e===null&&(e=new Yh(s)),m=d?e.fromEquirectangular(u,m):e.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const _=u.image;return d&&_&&_.height>0||p&&_&&r(_)?(e===null&&(e=new Yh(s)),m=d?e.fromEquirectangular(u):e.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",a),m.texture):null}}}return u}function r(u){let h=0;const d=6;for(let p=0;p<d;p++)u[p]!==void 0&&h++;return h===d}function a(u){const h=u.target;h.removeEventListener("dispose",a);const d=t.get(h);d!==void 0&&(t.delete(h),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function Yy(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let r;switch(n){case"WEBGL_depth_texture":r=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=s.getExtension(n)}return t[n]=r,r}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const r=e(n);return r===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function jy(s,t,e,n){const r={},a=new WeakMap;function l(m){const g=m.target;g.index!==null&&t.remove(g.index);for(const M in g.attributes)t.remove(g.attributes[M]);for(const M in g.morphAttributes){const w=g.morphAttributes[M];for(let v=0,y=w.length;v<y;v++)t.remove(w[v])}g.removeEventListener("dispose",l),delete r[g.id];const _=a.get(g);_&&(t.remove(_),a.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function u(m,g){return r[g.id]===!0||(g.addEventListener("dispose",l),r[g.id]=!0,e.memory.geometries++),g}function h(m){const g=m.attributes;for(const M in g)t.update(g[M],s.ARRAY_BUFFER);const _=m.morphAttributes;for(const M in _){const w=_[M];for(let v=0,y=w.length;v<y;v++)t.update(w[v],s.ARRAY_BUFFER)}}function d(m){const g=[],_=m.index,M=m.attributes.position;let w=0;if(_!==null){const D=_.array;w=_.version;for(let b=0,C=D.length;b<C;b+=3){const B=D[b+0],N=D[b+1],R=D[b+2];g.push(B,N,N,R,R,B)}}else if(M!==void 0){const D=M.array;w=M.version;for(let b=0,C=D.length/3-1;b<C;b+=3){const B=b+0,N=b+1,R=b+2;g.push(B,N,N,R,R,B)}}else return;const v=new(mf(g)?Mf:xf)(g,1);v.version=w;const y=a.get(m);y&&t.remove(y),a.set(m,v)}function p(m){const g=a.get(m);if(g){const _=m.index;_!==null&&g.version<_.version&&d(m)}else d(m);return a.get(m)}return{get:u,update:h,getWireframeAttribute:p}}function Ky(s,t,e){let n;function r(m){n=m}let a,l;function u(m){a=m.type,l=m.bytesPerElement}function h(m,g){s.drawElements(n,g,a,m*l),e.update(g,n,1)}function d(m,g,_){_!==0&&(s.drawElementsInstanced(n,g,a,m*l,_),e.update(g,n,_))}function p(m,g,_){if(_===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let w=0;w<_;w++)this.render(m[w]/l,g[w]);else{M.multiDrawElementsWEBGL(n,g,0,a,m,0,_);let w=0;for(let v=0;v<_;v++)w+=g[v];e.update(w,n,1)}}this.setMode=r,this.setIndex=u,this.render=h,this.renderInstances=d,this.renderMultiDraw=p}function Jy(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,l,u){switch(e.calls++,l){case s.TRIANGLES:e.triangles+=u*(a/3);break;case s.LINES:e.lines+=u*(a/2);break;case s.LINE_STRIP:e.lines+=u*(a-1);break;case s.LINE_LOOP:e.lines+=u*a;break;case s.POINTS:e.points+=u*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:n}}function Qy(s,t,e){const n=new WeakMap,r=new Ke;function a(l,u,h){const d=l.morphTargetInfluences,p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,m=p!==void 0?p.length:0;let g=n.get(u);if(g===void 0||g.count!==m){let P=function(){R.dispose(),n.delete(u),u.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const _=u.morphAttributes.position!==void 0,M=u.morphAttributes.normal!==void 0,w=u.morphAttributes.color!==void 0,v=u.morphAttributes.position||[],y=u.morphAttributes.normal||[],D=u.morphAttributes.color||[];let b=0;_===!0&&(b=1),M===!0&&(b=2),w===!0&&(b=3);let C=u.attributes.position.count*b,B=1;C>t.maxTextureSize&&(B=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const N=new Float32Array(C*B*4*m),R=new _f(N,C,B,m);R.type=Ai,R.needsUpdate=!0;const U=b*4;for(let E=0;E<m;E++){const z=v[E],q=y[E],k=D[E],W=C*B*4*E;for(let X=0;X<z.count;X++){const J=X*U;_===!0&&(r.fromBufferAttribute(z,X),N[W+J+0]=r.x,N[W+J+1]=r.y,N[W+J+2]=r.z,N[W+J+3]=0),M===!0&&(r.fromBufferAttribute(q,X),N[W+J+4]=r.x,N[W+J+5]=r.y,N[W+J+6]=r.z,N[W+J+7]=0),w===!0&&(r.fromBufferAttribute(k,X),N[W+J+8]=r.x,N[W+J+9]=r.y,N[W+J+10]=r.z,N[W+J+11]=k.itemSize===4?r.w:1)}}g={count:m,texture:R,size:new Mt(C,B)},n.set(u,g),u.addEventListener("dispose",P)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)h.getUniforms().setValue(s,"morphTexture",l.morphTexture,e);else{let _=0;for(let w=0;w<d.length;w++)_+=d[w];const M=u.morphTargetsRelative?1:1-_;h.getUniforms().setValue(s,"morphTargetBaseInfluence",M),h.getUniforms().setValue(s,"morphTargetInfluences",d)}h.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}return{update:a}}function t0(s,t,e,n){let r=new WeakMap;function a(h){const d=n.render.frame,p=h.geometry,m=t.get(h,p);if(r.get(m)!==d&&(t.update(m),r.set(m,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",u)===!1&&h.addEventListener("dispose",u),r.get(h)!==d&&(e.update(h.instanceMatrix,s.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,s.ARRAY_BUFFER),r.set(h,d))),h.isSkinnedMesh){const g=h.skeleton;r.get(g)!==d&&(g.update(),r.set(g,d))}return m}function l(){r=new WeakMap}function u(h){const d=h.target;d.removeEventListener("dispose",u),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:a,dispose:l}}class Af extends ln{constructor(t,e,n,r,a,l,u,h,d,p){if(p=p!==void 0?p:hr,p!==hr&&p!==ao)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&p===hr&&(n=vr),n===void 0&&p===ao&&(n=go),super(null,r,a,l,u,h,p,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=u!==void 0?u:wn,this.minFilter=h!==void 0?h:wn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Lf=new ln,Pf=new Af(1,1);Pf.compareFunction=pf;const Cf=new _f,Rf=new Fg,If=new wf,Qh=[],td=[],ed=new Float32Array(16),nd=new Float32Array(9),id=new Float32Array(4);function Ar(s,t,e){const n=s[0];if(n<=0||n>0)return s;const r=t*e;let a=Qh[r];if(a===void 0&&(a=new Float32Array(r),Qh[r]=a),t!==0){n.toArray(a,0);for(let l=1,u=0;l!==t;++l)u+=e,s[l].toArray(a,u)}return a}function Ge(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function We(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ha(s,t){let e=td[t];e===void 0&&(e=new Int32Array(t),td[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function e0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function n0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;s.uniform2fv(this.addr,t),We(e,t)}}function i0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;s.uniform3fv(this.addr,t),We(e,t)}}function s0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;s.uniform4fv(this.addr,t),We(e,t)}}function r0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;id.set(n),s.uniformMatrix2fv(this.addr,!1,id),We(e,n)}}function o0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;nd.set(n),s.uniformMatrix3fv(this.addr,!1,nd),We(e,n)}}function a0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ge(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),We(e,t)}else{if(Ge(e,n))return;ed.set(n),s.uniformMatrix4fv(this.addr,!1,ed),We(e,n)}}function l0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function c0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;s.uniform2iv(this.addr,t),We(e,t)}}function u0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;s.uniform3iv(this.addr,t),We(e,t)}}function h0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;s.uniform4iv(this.addr,t),We(e,t)}}function d0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function f0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;s.uniform2uiv(this.addr,t),We(e,t)}}function p0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;s.uniform3uiv(this.addr,t),We(e,t)}}function m0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;s.uniform4uiv(this.addr,t),We(e,t)}}function g0(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r);const a=this.type===s.SAMPLER_2D_SHADOW?Pf:Lf;e.setTexture2D(t||a,r)}function _0(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTexture3D(t||Rf,r)}function v0(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTextureCube(t||If,r)}function y0(s,t,e){const n=this.cache,r=e.allocateTextureUnit();n[0]!==r&&(s.uniform1i(this.addr,r),n[0]=r),e.setTexture2DArray(t||Cf,r)}function x0(s){switch(s){case 5126:return e0;case 35664:return n0;case 35665:return i0;case 35666:return s0;case 35674:return r0;case 35675:return o0;case 35676:return a0;case 5124:case 35670:return l0;case 35667:case 35671:return c0;case 35668:case 35672:return u0;case 35669:case 35673:return h0;case 5125:return d0;case 36294:return f0;case 36295:return p0;case 36296:return m0;case 35678:case 36198:case 36298:case 36306:case 35682:return g0;case 35679:case 36299:case 36307:return _0;case 35680:case 36300:case 36308:case 36293:return v0;case 36289:case 36303:case 36311:case 36292:return y0}}function M0(s,t){s.uniform1fv(this.addr,t)}function b0(s,t){const e=Ar(t,this.size,2);s.uniform2fv(this.addr,e)}function S0(s,t){const e=Ar(t,this.size,3);s.uniform3fv(this.addr,e)}function w0(s,t){const e=Ar(t,this.size,4);s.uniform4fv(this.addr,e)}function E0(s,t){const e=Ar(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function T0(s,t){const e=Ar(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function A0(s,t){const e=Ar(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function L0(s,t){s.uniform1iv(this.addr,t)}function P0(s,t){s.uniform2iv(this.addr,t)}function C0(s,t){s.uniform3iv(this.addr,t)}function R0(s,t){s.uniform4iv(this.addr,t)}function I0(s,t){s.uniform1uiv(this.addr,t)}function D0(s,t){s.uniform2uiv(this.addr,t)}function N0(s,t){s.uniform3uiv(this.addr,t)}function O0(s,t){s.uniform4uiv(this.addr,t)}function U0(s,t,e){const n=this.cache,r=t.length,a=Ha(e,r);Ge(n,a)||(s.uniform1iv(this.addr,a),We(n,a));for(let l=0;l!==r;++l)e.setTexture2D(t[l]||Lf,a[l])}function k0(s,t,e){const n=this.cache,r=t.length,a=Ha(e,r);Ge(n,a)||(s.uniform1iv(this.addr,a),We(n,a));for(let l=0;l!==r;++l)e.setTexture3D(t[l]||Rf,a[l])}function B0(s,t,e){const n=this.cache,r=t.length,a=Ha(e,r);Ge(n,a)||(s.uniform1iv(this.addr,a),We(n,a));for(let l=0;l!==r;++l)e.setTextureCube(t[l]||If,a[l])}function F0(s,t,e){const n=this.cache,r=t.length,a=Ha(e,r);Ge(n,a)||(s.uniform1iv(this.addr,a),We(n,a));for(let l=0;l!==r;++l)e.setTexture2DArray(t[l]||Cf,a[l])}function z0(s){switch(s){case 5126:return M0;case 35664:return b0;case 35665:return S0;case 35666:return w0;case 35674:return E0;case 35675:return T0;case 35676:return A0;case 5124:case 35670:return L0;case 35667:case 35671:return P0;case 35668:case 35672:return C0;case 35669:case 35673:return R0;case 5125:return I0;case 36294:return D0;case 36295:return N0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return U0;case 35679:case 36299:case 36307:return k0;case 35680:case 36300:case 36308:case 36293:return B0;case 36289:case 36303:case 36311:case 36292:return F0}}class H0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=x0(e.type)}}class V0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=z0(e.type)}}class G0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const r=this.seq;for(let a=0,l=r.length;a!==l;++a){const u=r[a];u.setValue(t,e[u.id],n)}}}const Yl=/(\w+)(\])?(\[|\.)?/g;function sd(s,t){s.seq.push(t),s.map[t.id]=t}function W0(s,t,e){const n=s.name,r=n.length;for(Yl.lastIndex=0;;){const a=Yl.exec(n),l=Yl.lastIndex;let u=a[1];const h=a[2]==="]",d=a[3];if(h&&(u=u|0),d===void 0||d==="["&&l+2===r){sd(e,d===void 0?new H0(u,s,t):new V0(u,s,t));break}else{let m=e.map[u];m===void 0&&(m=new G0(u),sd(e,m)),e=m}}}class _a{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=t.getActiveUniform(e,r),l=t.getUniformLocation(e,a.name);W0(a,l,this)}}setValue(t,e,n,r){const a=this.map[e];a!==void 0&&a.setValue(t,n,r)}setOptional(t,e,n){const r=e[n];r!==void 0&&this.setValue(t,n,r)}static upload(t,e,n,r){for(let a=0,l=e.length;a!==l;++a){const u=e[a],h=n[u.id];h.needsUpdate!==!1&&u.setValue(t,h.value,r)}}static seqWithValue(t,e){const n=[];for(let r=0,a=t.length;r!==a;++r){const l=t[r];l.id in e&&n.push(l)}return n}}function rd(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Z0=37297;let X0=0;function q0(s,t){const e=s.split(`
`),n=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let l=r;l<a;l++){const u=l+1;n.push(`${u===t?">":" "} ${u}: ${e[l]}`)}return n.join(`
`)}function $0(s){const t=ye.getPrimaries(ye.workingColorSpace),e=ye.getPrimaries(s);let n;switch(t===e?n="":t===wa&&e===Sa?n="LinearDisplayP3ToLinearSRGB":t===Sa&&e===wa&&(n="LinearSRGBToLinearDisplayP3"),s){case Ji:case Fa:return[n,"LinearTransferOETF"];case ri:case Ic:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function od(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=s.getShaderInfoLog(t).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const l=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+q0(s.getShaderSource(t),l)}else return r}function Y0(s,t){const e=$0(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function j0(s,t){let e;switch(t){case ig:e="Linear";break;case sg:e="Reinhard";break;case rg:e="OptimizedCineon";break;case og:e="ACESFilmic";break;case lg:e="AgX";break;case cg:e="Neutral";break;case ag:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function K0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(to).join(`
`)}function J0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Q0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const a=s.getActiveAttrib(t,r),l=a.name;let u=1;a.type===s.FLOAT_MAT2&&(u=2),a.type===s.FLOAT_MAT3&&(u=3),a.type===s.FLOAT_MAT4&&(u=4),e[l]={type:a.type,location:s.getAttribLocation(t,l),locationSize:u}}return e}function to(s){return s!==""}function ad(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ld(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function gc(s){return s.replace(tx,nx)}const ex=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function nx(s,t){let e=se[t];if(e===void 0){const n=ex.get(t);if(n!==void 0)e=se[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return gc(e)}const ix=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function cd(s){return s.replace(ix,sx)}function sx(s,t,e,n){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function ud(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function rx(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===ef?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Pm?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===wi&&(t="SHADOWMAP_TYPE_VSM"),t}function ox(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case gr:case _r:t="ENVMAP_TYPE_CUBE";break;case Ba:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ax(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case _r:t="ENVMAP_MODE_REFRACTION";break}return t}function lx(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Rc:t="ENVMAP_BLENDING_MULTIPLY";break;case eg:t="ENVMAP_BLENDING_MIX";break;case ng:t="ENVMAP_BLENDING_ADD";break}return t}function cx(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function ux(s,t,e,n){const r=s.getContext(),a=e.defines;let l=e.vertexShader,u=e.fragmentShader;const h=rx(e),d=ox(e),p=ax(e),m=lx(e),g=cx(e),_=K0(e),M=J0(a),w=r.createProgram();let v,y,D=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(to).join(`
`),v.length>0&&(v+=`
`),y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(to).join(`
`),y.length>0&&(y+=`
`)):(v=[ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+p:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),y=[ud(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+p:"",e.envMap?"#define "+m:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Xi?"#define TONE_MAPPING":"",e.toneMapping!==Xi?se.tonemapping_pars_fragment:"",e.toneMapping!==Xi?j0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,Y0("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(to).join(`
`)),l=gc(l),l=ad(l,e),l=ld(l,e),u=gc(u),u=ad(u,e),u=ld(u,e),l=cd(l),u=cd(u),e.isRawShaderMaterial!==!0&&(D=`#version 300 es
`,v=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,y=["#define varying in",e.glslVersion===Th?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const b=D+v+l,C=D+y+u,B=rd(r,r.VERTEX_SHADER,b),N=rd(r,r.FRAGMENT_SHADER,C);r.attachShader(w,B),r.attachShader(w,N),e.index0AttributeName!==void 0?r.bindAttribLocation(w,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(w,0,"position"),r.linkProgram(w);function R(z){if(s.debug.checkShaderErrors){const q=r.getProgramInfoLog(w).trim(),k=r.getShaderInfoLog(B).trim(),W=r.getShaderInfoLog(N).trim();let X=!0,J=!0;if(r.getProgramParameter(w,r.LINK_STATUS)===!1)if(X=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(r,w,B,N);else{const ht=od(r,B,"vertex"),F=od(r,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(w,r.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+q+`
`+ht+`
`+F)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):(k===""||W==="")&&(J=!1);J&&(z.diagnostics={runnable:X,programLog:q,vertexShader:{log:k,prefix:v},fragmentShader:{log:W,prefix:y}})}r.deleteShader(B),r.deleteShader(N),U=new _a(r,w),P=Q0(r,w)}let U;this.getUniforms=function(){return U===void 0&&R(this),U};let P;this.getAttributes=function(){return P===void 0&&R(this),P};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=r.getProgramParameter(w,Z0)),E},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(w),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=X0++,this.cacheKey=t,this.usedTimes=1,this.program=w,this.vertexShader=B,this.fragmentShader=N,this}let hx=0;class dx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(r)===!1&&(l.add(r),r.usedTimes++),l.has(a)===!1&&(l.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new fx(t),e.set(t,n)),n}}class fx{constructor(t){this.id=hx++,this.code=t,this.usedTimes=0}}function px(s,t,e,n,r,a,l){const u=new Dc,h=new dx,d=new Set,p=[],m=r.logarithmicDepthBuffer,g=r.vertexTextures;let _=r.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(P){return d.add(P),P===0?"uv":`uv${P}`}function v(P,E,z,q,k){const W=q.fog,X=k.geometry,J=P.isMeshStandardMaterial?q.environment:null,ht=(P.isMeshStandardMaterial?e:t).get(P.envMap||J),F=ht&&ht.mapping===Ba?ht.image.height:null,rt=M[P.type];P.precision!==null&&(_=r.getMaxPrecision(P.precision),_!==P.precision&&console.warn("THREE.WebGLProgram.getParameters:",P.precision,"not supported, using",_,"instead."));const Z=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,dt=Z!==void 0?Z.length:0;let bt=0;X.morphAttributes.position!==void 0&&(bt=1),X.morphAttributes.normal!==void 0&&(bt=2),X.morphAttributes.color!==void 0&&(bt=3);let Dt,K,ct,pt;if(rt){const ke=oi[rt];Dt=ke.vertexShader,K=ke.fragmentShader}else Dt=P.vertexShader,K=P.fragmentShader,h.update(P),ct=h.getVertexShaderID(P),pt=h.getFragmentShaderID(P);const yt=s.getRenderTarget(),Ut=k.isInstancedMesh===!0,Lt=k.isBatchedMesh===!0,Et=!!P.map,G=!!P.matcap,it=!!ht,ot=!!P.aoMap,ft=!!P.lightMap,vt=!!P.bumpMap,xt=!!P.normalMap,O=!!P.displacementMap,T=!!P.emissiveMap,$=!!P.metalnessMap,at=!!P.roughnessMap,lt=P.anisotropy>0,mt=P.clearcoat>0,Gt=P.iridescence>0,_t=P.sheen>0,Ft=P.transmission>0,Wt=lt&&!!P.anisotropyMap,St=mt&&!!P.clearcoatMap,Pt=mt&&!!P.clearcoatNormalMap,qt=mt&&!!P.clearcoatRoughnessMap,Nt=Gt&&!!P.iridescenceMap,Ot=Gt&&!!P.iridescenceThicknessMap,ae=_t&&!!P.sheenColorMap,le=_t&&!!P.sheenRoughnessMap,fe=!!P.specularMap,de=!!P.specularColorMap,me=!!P.specularIntensityMap,kt=Ft&&!!P.transmissionMap,S=Ft&&!!P.thicknessMap,Q=!!P.gradientMap,ut=!!P.alphaMap,wt=P.alphaTest>0,Rt=!!P.alphaHash,ue=!!P.extensions;let oe=Xi;P.toneMapped&&(yt===null||yt.isXRRenderTarget===!0)&&(oe=s.toneMapping);const Me={shaderID:rt,shaderType:P.type,shaderName:P.name,vertexShader:Dt,fragmentShader:K,defines:P.defines,customVertexShaderID:ct,customFragmentShaderID:pt,isRawShaderMaterial:P.isRawShaderMaterial===!0,glslVersion:P.glslVersion,precision:_,batching:Lt,instancing:Ut,instancingColor:Ut&&k.instanceColor!==null,instancingMorph:Ut&&k.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:yt===null?s.outputColorSpace:yt.isXRRenderTarget===!0?yt.texture.colorSpace:Ji,alphaToCoverage:!!P.alphaToCoverage,map:Et,matcap:G,envMap:it,envMapMode:it&&ht.mapping,envMapCubeUVHeight:F,aoMap:ot,lightMap:ft,bumpMap:vt,normalMap:xt,displacementMap:g&&O,emissiveMap:T,normalMapObjectSpace:xt&&P.normalMapType===bg,normalMapTangentSpace:xt&&P.normalMapType===ff,metalnessMap:$,roughnessMap:at,anisotropy:lt,anisotropyMap:Wt,clearcoat:mt,clearcoatMap:St,clearcoatNormalMap:Pt,clearcoatRoughnessMap:qt,iridescence:Gt,iridescenceMap:Nt,iridescenceThicknessMap:Ot,sheen:_t,sheenColorMap:ae,sheenRoughnessMap:le,specularMap:fe,specularColorMap:de,specularIntensityMap:me,transmission:Ft,transmissionMap:kt,thicknessMap:S,gradientMap:Q,opaque:P.transparent===!1&&P.blending===ur&&P.alphaToCoverage===!1,alphaMap:ut,alphaTest:wt,alphaHash:Rt,combine:P.combine,mapUv:Et&&w(P.map.channel),aoMapUv:ot&&w(P.aoMap.channel),lightMapUv:ft&&w(P.lightMap.channel),bumpMapUv:vt&&w(P.bumpMap.channel),normalMapUv:xt&&w(P.normalMap.channel),displacementMapUv:O&&w(P.displacementMap.channel),emissiveMapUv:T&&w(P.emissiveMap.channel),metalnessMapUv:$&&w(P.metalnessMap.channel),roughnessMapUv:at&&w(P.roughnessMap.channel),anisotropyMapUv:Wt&&w(P.anisotropyMap.channel),clearcoatMapUv:St&&w(P.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&w(P.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:qt&&w(P.clearcoatRoughnessMap.channel),iridescenceMapUv:Nt&&w(P.iridescenceMap.channel),iridescenceThicknessMapUv:Ot&&w(P.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&w(P.sheenColorMap.channel),sheenRoughnessMapUv:le&&w(P.sheenRoughnessMap.channel),specularMapUv:fe&&w(P.specularMap.channel),specularColorMapUv:de&&w(P.specularColorMap.channel),specularIntensityMapUv:me&&w(P.specularIntensityMap.channel),transmissionMapUv:kt&&w(P.transmissionMap.channel),thicknessMapUv:S&&w(P.thicknessMap.channel),alphaMapUv:ut&&w(P.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(xt||lt),vertexColors:P.vertexColors,vertexAlphas:P.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!X.attributes.uv&&(Et||ut),fog:!!W,useFog:P.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:P.flatShading===!0,sizeAttenuation:P.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:k.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:bt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:P.dithering,shadowMapEnabled:s.shadowMap.enabled&&z.length>0,shadowMapType:s.shadowMap.type,toneMapping:oe,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Et&&P.map.isVideoTexture===!0&&ye.getTransfer(P.map.colorSpace)===Ee,premultipliedAlpha:P.premultipliedAlpha,doubleSided:P.side===Bn,flipSided:P.side===En,useDepthPacking:P.depthPacking>=0,depthPacking:P.depthPacking||0,index0AttributeName:P.index0AttributeName,extensionClipCullDistance:ue&&P.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ue&&P.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:P.customProgramCacheKey()};return Me.vertexUv1s=d.has(1),Me.vertexUv2s=d.has(2),Me.vertexUv3s=d.has(3),d.clear(),Me}function y(P){const E=[];if(P.shaderID?E.push(P.shaderID):(E.push(P.customVertexShaderID),E.push(P.customFragmentShaderID)),P.defines!==void 0)for(const z in P.defines)E.push(z),E.push(P.defines[z]);return P.isRawShaderMaterial===!1&&(D(E,P),b(E,P),E.push(s.outputColorSpace)),E.push(P.customProgramCacheKey),E.join()}function D(P,E){P.push(E.precision),P.push(E.outputColorSpace),P.push(E.envMapMode),P.push(E.envMapCubeUVHeight),P.push(E.mapUv),P.push(E.alphaMapUv),P.push(E.lightMapUv),P.push(E.aoMapUv),P.push(E.bumpMapUv),P.push(E.normalMapUv),P.push(E.displacementMapUv),P.push(E.emissiveMapUv),P.push(E.metalnessMapUv),P.push(E.roughnessMapUv),P.push(E.anisotropyMapUv),P.push(E.clearcoatMapUv),P.push(E.clearcoatNormalMapUv),P.push(E.clearcoatRoughnessMapUv),P.push(E.iridescenceMapUv),P.push(E.iridescenceThicknessMapUv),P.push(E.sheenColorMapUv),P.push(E.sheenRoughnessMapUv),P.push(E.specularMapUv),P.push(E.specularColorMapUv),P.push(E.specularIntensityMapUv),P.push(E.transmissionMapUv),P.push(E.thicknessMapUv),P.push(E.combine),P.push(E.fogExp2),P.push(E.sizeAttenuation),P.push(E.morphTargetsCount),P.push(E.morphAttributeCount),P.push(E.numDirLights),P.push(E.numPointLights),P.push(E.numSpotLights),P.push(E.numSpotLightMaps),P.push(E.numHemiLights),P.push(E.numRectAreaLights),P.push(E.numDirLightShadows),P.push(E.numPointLightShadows),P.push(E.numSpotLightShadows),P.push(E.numSpotLightShadowsWithMaps),P.push(E.numLightProbes),P.push(E.shadowMapType),P.push(E.toneMapping),P.push(E.numClippingPlanes),P.push(E.numClipIntersection),P.push(E.depthPacking)}function b(P,E){u.disableAll(),E.supportsVertexTextures&&u.enable(0),E.instancing&&u.enable(1),E.instancingColor&&u.enable(2),E.instancingMorph&&u.enable(3),E.matcap&&u.enable(4),E.envMap&&u.enable(5),E.normalMapObjectSpace&&u.enable(6),E.normalMapTangentSpace&&u.enable(7),E.clearcoat&&u.enable(8),E.iridescence&&u.enable(9),E.alphaTest&&u.enable(10),E.vertexColors&&u.enable(11),E.vertexAlphas&&u.enable(12),E.vertexUv1s&&u.enable(13),E.vertexUv2s&&u.enable(14),E.vertexUv3s&&u.enable(15),E.vertexTangents&&u.enable(16),E.anisotropy&&u.enable(17),E.alphaHash&&u.enable(18),E.batching&&u.enable(19),P.push(u.mask),u.disableAll(),E.fog&&u.enable(0),E.useFog&&u.enable(1),E.flatShading&&u.enable(2),E.logarithmicDepthBuffer&&u.enable(3),E.skinning&&u.enable(4),E.morphTargets&&u.enable(5),E.morphNormals&&u.enable(6),E.morphColors&&u.enable(7),E.premultipliedAlpha&&u.enable(8),E.shadowMapEnabled&&u.enable(9),E.useLegacyLights&&u.enable(10),E.doubleSided&&u.enable(11),E.flipSided&&u.enable(12),E.useDepthPacking&&u.enable(13),E.dithering&&u.enable(14),E.transmission&&u.enable(15),E.sheen&&u.enable(16),E.opaque&&u.enable(17),E.pointsUvs&&u.enable(18),E.decodeVideoTexture&&u.enable(19),E.alphaToCoverage&&u.enable(20),P.push(u.mask)}function C(P){const E=M[P.type];let z;if(E){const q=oi[E];z=Kg.clone(q.uniforms)}else z=P.uniforms;return z}function B(P,E){let z;for(let q=0,k=p.length;q<k;q++){const W=p[q];if(W.cacheKey===E){z=W,++z.usedTimes;break}}return z===void 0&&(z=new ux(s,E,P,a),p.push(z)),z}function N(P){if(--P.usedTimes===0){const E=p.indexOf(P);p[E]=p[p.length-1],p.pop(),P.destroy()}}function R(P){h.remove(P)}function U(){h.dispose()}return{getParameters:v,getProgramCacheKey:y,getUniforms:C,acquireProgram:B,releaseProgram:N,releaseShaderCache:R,programs:p,dispose:U}}function mx(){let s=new WeakMap;function t(a){let l=s.get(a);return l===void 0&&(l={},s.set(a,l)),l}function e(a){s.delete(a)}function n(a,l,u){s.get(a)[l]=u}function r(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:r}}function gx(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function hd(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function dd(){const s=[];let t=0;const e=[],n=[],r=[];function a(){t=0,e.length=0,n.length=0,r.length=0}function l(m,g,_,M,w,v){let y=s[t];return y===void 0?(y={id:m.id,object:m,geometry:g,material:_,groupOrder:M,renderOrder:m.renderOrder,z:w,group:v},s[t]=y):(y.id=m.id,y.object=m,y.geometry=g,y.material=_,y.groupOrder=M,y.renderOrder=m.renderOrder,y.z=w,y.group=v),t++,y}function u(m,g,_,M,w,v){const y=l(m,g,_,M,w,v);_.transmission>0?n.push(y):_.transparent===!0?r.push(y):e.push(y)}function h(m,g,_,M,w,v){const y=l(m,g,_,M,w,v);_.transmission>0?n.unshift(y):_.transparent===!0?r.unshift(y):e.unshift(y)}function d(m,g){e.length>1&&e.sort(m||gx),n.length>1&&n.sort(g||hd),r.length>1&&r.sort(g||hd)}function p(){for(let m=t,g=s.length;m<g;m++){const _=s[m];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:e,transmissive:n,transparent:r,init:a,push:u,unshift:h,finish:p,sort:d}}function _x(){let s=new WeakMap;function t(n,r){const a=s.get(n);let l;return a===void 0?(l=new dd,s.set(n,[l])):r>=a.length?(l=new dd,a.push(l)):l=a[r],l}function e(){s=new WeakMap}return{get:t,dispose:e}}function vx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new V,color:new ne};break;case"SpotLight":e={position:new V,direction:new V,color:new ne,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new V,color:new ne,distance:0,decay:0};break;case"HemisphereLight":e={direction:new V,skyColor:new ne,groundColor:new ne};break;case"RectAreaLight":e={color:new ne,position:new V,halfWidth:new V,halfHeight:new V};break}return s[t.id]=e,e}}}function yx(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let xx=0;function Mx(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function bx(s){const t=new vx,e=yx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new V);const r=new V,a=new xe,l=new xe;function u(d,p){let m=0,g=0,_=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let M=0,w=0,v=0,y=0,D=0,b=0,C=0,B=0,N=0,R=0,U=0;d.sort(Mx);const P=p===!0?Math.PI:1;for(let z=0,q=d.length;z<q;z++){const k=d[z],W=k.color,X=k.intensity,J=k.distance,ht=k.shadow&&k.shadow.map?k.shadow.map.texture:null;if(k.isAmbientLight)m+=W.r*X*P,g+=W.g*X*P,_+=W.b*X*P;else if(k.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(k.sh.coefficients[F],X);U++}else if(k.isDirectionalLight){const F=t.get(k);if(F.color.copy(k.color).multiplyScalar(k.intensity*P),k.castShadow){const rt=k.shadow,Z=e.get(k);Z.shadowBias=rt.bias,Z.shadowNormalBias=rt.normalBias,Z.shadowRadius=rt.radius,Z.shadowMapSize=rt.mapSize,n.directionalShadow[M]=Z,n.directionalShadowMap[M]=ht,n.directionalShadowMatrix[M]=k.shadow.matrix,b++}n.directional[M]=F,M++}else if(k.isSpotLight){const F=t.get(k);F.position.setFromMatrixPosition(k.matrixWorld),F.color.copy(W).multiplyScalar(X*P),F.distance=J,F.coneCos=Math.cos(k.angle),F.penumbraCos=Math.cos(k.angle*(1-k.penumbra)),F.decay=k.decay,n.spot[v]=F;const rt=k.shadow;if(k.map&&(n.spotLightMap[N]=k.map,N++,rt.updateMatrices(k),k.castShadow&&R++),n.spotLightMatrix[v]=rt.matrix,k.castShadow){const Z=e.get(k);Z.shadowBias=rt.bias,Z.shadowNormalBias=rt.normalBias,Z.shadowRadius=rt.radius,Z.shadowMapSize=rt.mapSize,n.spotShadow[v]=Z,n.spotShadowMap[v]=ht,B++}v++}else if(k.isRectAreaLight){const F=t.get(k);F.color.copy(W).multiplyScalar(X),F.halfWidth.set(k.width*.5,0,0),F.halfHeight.set(0,k.height*.5,0),n.rectArea[y]=F,y++}else if(k.isPointLight){const F=t.get(k);if(F.color.copy(k.color).multiplyScalar(k.intensity*P),F.distance=k.distance,F.decay=k.decay,k.castShadow){const rt=k.shadow,Z=e.get(k);Z.shadowBias=rt.bias,Z.shadowNormalBias=rt.normalBias,Z.shadowRadius=rt.radius,Z.shadowMapSize=rt.mapSize,Z.shadowCameraNear=rt.camera.near,Z.shadowCameraFar=rt.camera.far,n.pointShadow[w]=Z,n.pointShadowMap[w]=ht,n.pointShadowMatrix[w]=k.shadow.matrix,C++}n.point[w]=F,w++}else if(k.isHemisphereLight){const F=t.get(k);F.skyColor.copy(k.color).multiplyScalar(X*P),F.groundColor.copy(k.groundColor).multiplyScalar(X*P),n.hemi[D]=F,D++}}y>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Tt.LTC_FLOAT_1,n.rectAreaLTC2=Tt.LTC_FLOAT_2):(n.rectAreaLTC1=Tt.LTC_HALF_1,n.rectAreaLTC2=Tt.LTC_HALF_2)),n.ambient[0]=m,n.ambient[1]=g,n.ambient[2]=_;const E=n.hash;(E.directionalLength!==M||E.pointLength!==w||E.spotLength!==v||E.rectAreaLength!==y||E.hemiLength!==D||E.numDirectionalShadows!==b||E.numPointShadows!==C||E.numSpotShadows!==B||E.numSpotMaps!==N||E.numLightProbes!==U)&&(n.directional.length=M,n.spot.length=v,n.rectArea.length=y,n.point.length=w,n.hemi.length=D,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=B,n.spotShadowMap.length=B,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=B+N-R,n.spotLightMap.length=N,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=U,E.directionalLength=M,E.pointLength=w,E.spotLength=v,E.rectAreaLength=y,E.hemiLength=D,E.numDirectionalShadows=b,E.numPointShadows=C,E.numSpotShadows=B,E.numSpotMaps=N,E.numLightProbes=U,n.version=xx++)}function h(d,p){let m=0,g=0,_=0,M=0,w=0;const v=p.matrixWorldInverse;for(let y=0,D=d.length;y<D;y++){const b=d[y];if(b.isDirectionalLight){const C=n.directional[m];C.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(v),m++}else if(b.isSpotLight){const C=n.spot[_];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(v),C.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(v),_++}else if(b.isRectAreaLight){const C=n.rectArea[M];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(v),l.identity(),a.copy(b.matrixWorld),a.premultiply(v),l.extractRotation(a),C.halfWidth.set(b.width*.5,0,0),C.halfHeight.set(0,b.height*.5,0),C.halfWidth.applyMatrix4(l),C.halfHeight.applyMatrix4(l),M++}else if(b.isPointLight){const C=n.point[g];C.position.setFromMatrixPosition(b.matrixWorld),C.position.applyMatrix4(v),g++}else if(b.isHemisphereLight){const C=n.hemi[w];C.direction.setFromMatrixPosition(b.matrixWorld),C.direction.transformDirection(v),w++}}}return{setup:u,setupView:h,state:n}}function fd(s){const t=new bx(s),e=[],n=[];function r(){e.length=0,n.length=0}function a(p){e.push(p)}function l(p){n.push(p)}function u(p){t.setup(e,p)}function h(p){t.setupView(e,p)}return{init:r,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:u,setupLightsView:h,pushLight:a,pushShadow:l}}function Sx(s){let t=new WeakMap;function e(r,a=0){const l=t.get(r);let u;return l===void 0?(u=new fd(s),t.set(r,[u])):a>=l.length?(u=new fd(s),l.push(u)):u=l[a],u}function n(){t=new WeakMap}return{get:e,dispose:n}}class wx extends Tr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ex extends Tr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ax=`uniform sampler2D shadow_pass;
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
}`;function Lx(s,t,e){let n=new Nc;const r=new Mt,a=new Mt,l=new Ke,u=new wx({depthPacking:Mg}),h=new Ex,d={},p=e.maxTextureSize,m={[ji]:En,[En]:ji,[Bn]:Bn},g=new Ki({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:Tx,fragmentShader:Ax}),_=g.clone();_.defines.HORIZONTAL_PASS=1;const M=new gn;M.setAttribute("position",new jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Ve(M,g),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ef;let y=this.type;this.render=function(N,R,U){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||N.length===0)return;const P=s.getRenderTarget(),E=s.getActiveCubeFace(),z=s.getActiveMipmapLevel(),q=s.state;q.setBlending(Zi),q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const k=y!==wi&&this.type===wi,W=y===wi&&this.type!==wi;for(let X=0,J=N.length;X<J;X++){const ht=N[X],F=ht.shadow;if(F===void 0){console.warn("THREE.WebGLShadowMap:",ht,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;r.copy(F.mapSize);const rt=F.getFrameExtents();if(r.multiply(rt),a.copy(F.mapSize),(r.x>p||r.y>p)&&(r.x>p&&(a.x=Math.floor(p/rt.x),r.x=a.x*rt.x,F.mapSize.x=a.x),r.y>p&&(a.y=Math.floor(p/rt.y),r.y=a.y*rt.y,F.mapSize.y=a.y)),F.map===null||k===!0||W===!0){const dt=this.type!==wi?{minFilter:wn,magFilter:wn}:{};F.map!==null&&F.map.dispose(),F.map=new xs(r.x,r.y,dt),F.map.texture.name=ht.name+".shadowMap",F.camera.updateProjectionMatrix()}s.setRenderTarget(F.map),s.clear();const Z=F.getViewportCount();for(let dt=0;dt<Z;dt++){const bt=F.getViewport(dt);l.set(a.x*bt.x,a.y*bt.y,a.x*bt.z,a.y*bt.w),q.viewport(l),F.updateMatrices(ht,dt),n=F.getFrustum(),C(R,U,F.camera,ht,this.type)}F.isPointLightShadow!==!0&&this.type===wi&&D(F,U),F.needsUpdate=!1}y=this.type,v.needsUpdate=!1,s.setRenderTarget(P,E,z)};function D(N,R){const U=t.update(w);g.defines.VSM_SAMPLES!==N.blurSamples&&(g.defines.VSM_SAMPLES=N.blurSamples,_.defines.VSM_SAMPLES=N.blurSamples,g.needsUpdate=!0,_.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new xs(r.x,r.y)),g.uniforms.shadow_pass.value=N.map.texture,g.uniforms.resolution.value=N.mapSize,g.uniforms.radius.value=N.radius,s.setRenderTarget(N.mapPass),s.clear(),s.renderBufferDirect(R,null,U,g,w,null),_.uniforms.shadow_pass.value=N.mapPass.texture,_.uniforms.resolution.value=N.mapSize,_.uniforms.radius.value=N.radius,s.setRenderTarget(N.map),s.clear(),s.renderBufferDirect(R,null,U,_,w,null)}function b(N,R,U,P){let E=null;const z=U.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(z!==void 0)E=z;else if(E=U.isPointLight===!0?h:u,s.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const q=E.uuid,k=R.uuid;let W=d[q];W===void 0&&(W={},d[q]=W);let X=W[k];X===void 0&&(X=E.clone(),W[k]=X,R.addEventListener("dispose",B)),E=X}if(E.visible=R.visible,E.wireframe=R.wireframe,P===wi?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:m[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const q=s.properties.get(E);q.light=U}return E}function C(N,R,U,P,E){if(N.visible===!1)return;if(N.layers.test(R.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&E===wi)&&(!N.frustumCulled||n.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,N.matrixWorld);const k=t.update(N),W=N.material;if(Array.isArray(W)){const X=k.groups;for(let J=0,ht=X.length;J<ht;J++){const F=X[J],rt=W[F.materialIndex];if(rt&&rt.visible){const Z=b(N,rt,P,E);N.onBeforeShadow(s,N,R,U,k,Z,F),s.renderBufferDirect(U,null,k,Z,N,F),N.onAfterShadow(s,N,R,U,k,Z,F)}}}else if(W.visible){const X=b(N,W,P,E);N.onBeforeShadow(s,N,R,U,k,X,null),s.renderBufferDirect(U,null,k,X,N,null),N.onAfterShadow(s,N,R,U,k,X,null)}}const q=N.children;for(let k=0,W=q.length;k<W;k++)C(q[k],R,U,P,E)}function B(N){N.target.removeEventListener("dispose",B);for(const U in d){const P=d[U],E=N.target.uuid;E in P&&(P[E].dispose(),delete P[E])}}}function Px(s){function t(){let S=!1;const Q=new Ke;let ut=null;const wt=new Ke(0,0,0,0);return{setMask:function(Rt){ut!==Rt&&!S&&(s.colorMask(Rt,Rt,Rt,Rt),ut=Rt)},setLocked:function(Rt){S=Rt},setClear:function(Rt,ue,oe,Me,ke){ke===!0&&(Rt*=Me,ue*=Me,oe*=Me),Q.set(Rt,ue,oe,Me),wt.equals(Q)===!1&&(s.clearColor(Rt,ue,oe,Me),wt.copy(Q))},reset:function(){S=!1,ut=null,wt.set(-1,0,0,0)}}}function e(){let S=!1,Q=null,ut=null,wt=null;return{setTest:function(Rt){Rt?pt(s.DEPTH_TEST):yt(s.DEPTH_TEST)},setMask:function(Rt){Q!==Rt&&!S&&(s.depthMask(Rt),Q=Rt)},setFunc:function(Rt){if(ut!==Rt){switch(Rt){case $m:s.depthFunc(s.NEVER);break;case Ym:s.depthFunc(s.ALWAYS);break;case jm:s.depthFunc(s.LESS);break;case xa:s.depthFunc(s.LEQUAL);break;case Km:s.depthFunc(s.EQUAL);break;case Jm:s.depthFunc(s.GEQUAL);break;case Qm:s.depthFunc(s.GREATER);break;case tg:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ut=Rt}},setLocked:function(Rt){S=Rt},setClear:function(Rt){wt!==Rt&&(s.clearDepth(Rt),wt=Rt)},reset:function(){S=!1,Q=null,ut=null,wt=null}}}function n(){let S=!1,Q=null,ut=null,wt=null,Rt=null,ue=null,oe=null,Me=null,ke=null;return{setTest:function(ve){S||(ve?pt(s.STENCIL_TEST):yt(s.STENCIL_TEST))},setMask:function(ve){Q!==ve&&!S&&(s.stencilMask(ve),Q=ve)},setFunc:function(ve,De,Le){(ut!==ve||wt!==De||Rt!==Le)&&(s.stencilFunc(ve,De,Le),ut=ve,wt=De,Rt=Le)},setOp:function(ve,De,Le){(ue!==ve||oe!==De||Me!==Le)&&(s.stencilOp(ve,De,Le),ue=ve,oe=De,Me=Le)},setLocked:function(ve){S=ve},setClear:function(ve){ke!==ve&&(s.clearStencil(ve),ke=ve)},reset:function(){S=!1,Q=null,ut=null,wt=null,Rt=null,ue=null,oe=null,Me=null,ke=null}}}const r=new t,a=new e,l=new n,u=new WeakMap,h=new WeakMap;let d={},p={},m=new WeakMap,g=[],_=null,M=!1,w=null,v=null,y=null,D=null,b=null,C=null,B=null,N=new ne(0,0,0),R=0,U=!1,P=null,E=null,z=null,q=null,k=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,J=0;const ht=s.getParameter(s.VERSION);ht.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(ht)[1]),X=J>=1):ht.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(ht)[1]),X=J>=2);let F=null,rt={};const Z=s.getParameter(s.SCISSOR_BOX),dt=s.getParameter(s.VIEWPORT),bt=new Ke().fromArray(Z),Dt=new Ke().fromArray(dt);function K(S,Q,ut,wt){const Rt=new Uint8Array(4),ue=s.createTexture();s.bindTexture(S,ue),s.texParameteri(S,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(S,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let oe=0;oe<ut;oe++)S===s.TEXTURE_3D||S===s.TEXTURE_2D_ARRAY?s.texImage3D(Q,0,s.RGBA,1,1,wt,0,s.RGBA,s.UNSIGNED_BYTE,Rt):s.texImage2D(Q+oe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Rt);return ue}const ct={};ct[s.TEXTURE_2D]=K(s.TEXTURE_2D,s.TEXTURE_2D,1),ct[s.TEXTURE_CUBE_MAP]=K(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ct[s.TEXTURE_2D_ARRAY]=K(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ct[s.TEXTURE_3D]=K(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),l.setClear(0),pt(s.DEPTH_TEST),a.setFunc(xa),vt(!1),xt(Yu),pt(s.CULL_FACE),ot(Zi);function pt(S){d[S]!==!0&&(s.enable(S),d[S]=!0)}function yt(S){d[S]!==!1&&(s.disable(S),d[S]=!1)}function Ut(S,Q){return p[S]!==Q?(s.bindFramebuffer(S,Q),p[S]=Q,S===s.DRAW_FRAMEBUFFER&&(p[s.FRAMEBUFFER]=Q),S===s.FRAMEBUFFER&&(p[s.DRAW_FRAMEBUFFER]=Q),!0):!1}function Lt(S,Q){let ut=g,wt=!1;if(S){ut=m.get(Q),ut===void 0&&(ut=[],m.set(Q,ut));const Rt=S.textures;if(ut.length!==Rt.length||ut[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,oe=Rt.length;ue<oe;ue++)ut[ue]=s.COLOR_ATTACHMENT0+ue;ut.length=Rt.length,wt=!0}}else ut[0]!==s.BACK&&(ut[0]=s.BACK,wt=!0);wt&&s.drawBuffers(ut)}function Et(S){return _!==S?(s.useProgram(S),_=S,!0):!1}const G={[ps]:s.FUNC_ADD,[Rm]:s.FUNC_SUBTRACT,[Im]:s.FUNC_REVERSE_SUBTRACT};G[Dm]=s.MIN,G[Nm]=s.MAX;const it={[Om]:s.ZERO,[Um]:s.ONE,[km]:s.SRC_COLOR,[cc]:s.SRC_ALPHA,[Gm]:s.SRC_ALPHA_SATURATE,[Hm]:s.DST_COLOR,[Fm]:s.DST_ALPHA,[Bm]:s.ONE_MINUS_SRC_COLOR,[uc]:s.ONE_MINUS_SRC_ALPHA,[Vm]:s.ONE_MINUS_DST_COLOR,[zm]:s.ONE_MINUS_DST_ALPHA,[Wm]:s.CONSTANT_COLOR,[Zm]:s.ONE_MINUS_CONSTANT_COLOR,[Xm]:s.CONSTANT_ALPHA,[qm]:s.ONE_MINUS_CONSTANT_ALPHA};function ot(S,Q,ut,wt,Rt,ue,oe,Me,ke,ve){if(S===Zi){M===!0&&(yt(s.BLEND),M=!1);return}if(M===!1&&(pt(s.BLEND),M=!0),S!==Cm){if(S!==w||ve!==U){if((v!==ps||b!==ps)&&(s.blendEquation(s.FUNC_ADD),v=ps,b=ps),ve)switch(S){case ur:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ju:s.blendFunc(s.ONE,s.ONE);break;case Ku:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ju:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}else switch(S){case ur:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ju:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ku:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ju:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",S);break}y=null,D=null,C=null,B=null,N.set(0,0,0),R=0,w=S,U=ve}return}Rt=Rt||Q,ue=ue||ut,oe=oe||wt,(Q!==v||Rt!==b)&&(s.blendEquationSeparate(G[Q],G[Rt]),v=Q,b=Rt),(ut!==y||wt!==D||ue!==C||oe!==B)&&(s.blendFuncSeparate(it[ut],it[wt],it[ue],it[oe]),y=ut,D=wt,C=ue,B=oe),(Me.equals(N)===!1||ke!==R)&&(s.blendColor(Me.r,Me.g,Me.b,ke),N.copy(Me),R=ke),w=S,U=!1}function ft(S,Q){S.side===Bn?yt(s.CULL_FACE):pt(s.CULL_FACE);let ut=S.side===En;Q&&(ut=!ut),vt(ut),S.blending===ur&&S.transparent===!1?ot(Zi):ot(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),a.setFunc(S.depthFunc),a.setTest(S.depthTest),a.setMask(S.depthWrite),r.setMask(S.colorWrite);const wt=S.stencilWrite;l.setTest(wt),wt&&(l.setMask(S.stencilWriteMask),l.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),l.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass)),T(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?pt(s.SAMPLE_ALPHA_TO_COVERAGE):yt(s.SAMPLE_ALPHA_TO_COVERAGE)}function vt(S){P!==S&&(S?s.frontFace(s.CW):s.frontFace(s.CCW),P=S)}function xt(S){S!==Am?(pt(s.CULL_FACE),S!==E&&(S===Yu?s.cullFace(s.BACK):S===Lm?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):yt(s.CULL_FACE),E=S}function O(S){S!==z&&(X&&s.lineWidth(S),z=S)}function T(S,Q,ut){S?(pt(s.POLYGON_OFFSET_FILL),(q!==Q||k!==ut)&&(s.polygonOffset(Q,ut),q=Q,k=ut)):yt(s.POLYGON_OFFSET_FILL)}function $(S){S?pt(s.SCISSOR_TEST):yt(s.SCISSOR_TEST)}function at(S){S===void 0&&(S=s.TEXTURE0+W-1),F!==S&&(s.activeTexture(S),F=S)}function lt(S,Q,ut){ut===void 0&&(F===null?ut=s.TEXTURE0+W-1:ut=F);let wt=rt[ut];wt===void 0&&(wt={type:void 0,texture:void 0},rt[ut]=wt),(wt.type!==S||wt.texture!==Q)&&(F!==ut&&(s.activeTexture(ut),F=ut),s.bindTexture(S,Q||ct[S]),wt.type=S,wt.texture=Q)}function mt(){const S=rt[F];S!==void 0&&S.type!==void 0&&(s.bindTexture(S.type,null),S.type=void 0,S.texture=void 0)}function Gt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function _t(){try{s.compressedTexImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ft(){try{s.texSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Wt(){try{s.texSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function St(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Pt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function qt(){try{s.texStorage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Nt(){try{s.texStorage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function Ot(){try{s.texImage2D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function ae(){try{s.texImage3D.apply(s,arguments)}catch(S){console.error("THREE.WebGLState:",S)}}function le(S){bt.equals(S)===!1&&(s.scissor(S.x,S.y,S.z,S.w),bt.copy(S))}function fe(S){Dt.equals(S)===!1&&(s.viewport(S.x,S.y,S.z,S.w),Dt.copy(S))}function de(S,Q){let ut=h.get(Q);ut===void 0&&(ut=new WeakMap,h.set(Q,ut));let wt=ut.get(S);wt===void 0&&(wt=s.getUniformBlockIndex(Q,S.name),ut.set(S,wt))}function me(S,Q){const wt=h.get(Q).get(S);u.get(Q)!==wt&&(s.uniformBlockBinding(Q,wt,S.__bindingPointIndex),u.set(Q,wt))}function kt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},F=null,rt={},p={},m=new WeakMap,g=[],_=null,M=!1,w=null,v=null,y=null,D=null,b=null,C=null,B=null,N=new ne(0,0,0),R=0,U=!1,P=null,E=null,z=null,q=null,k=null,bt.set(0,0,s.canvas.width,s.canvas.height),Dt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),l.reset()}return{buffers:{color:r,depth:a,stencil:l},enable:pt,disable:yt,bindFramebuffer:Ut,drawBuffers:Lt,useProgram:Et,setBlending:ot,setMaterial:ft,setFlipSided:vt,setCullFace:xt,setLineWidth:O,setPolygonOffset:T,setScissorTest:$,activeTexture:at,bindTexture:lt,unbindTexture:mt,compressedTexImage2D:Gt,compressedTexImage3D:_t,texImage2D:Ot,texImage3D:ae,updateUBOMapping:de,uniformBlockBinding:me,texStorage2D:qt,texStorage3D:Nt,texSubImage2D:Ft,texSubImage3D:Wt,compressedTexSubImage2D:St,compressedTexSubImage3D:Pt,scissor:le,viewport:fe,reset:kt}}function Cx(s,t,e,n,r,a,l){const u=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new Mt,p=new WeakMap;let m;const g=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(O,T){return _?new OffscreenCanvas(O,T):Ta("canvas")}function w(O,T,$){let at=1;const lt=xt(O);if((lt.width>$||lt.height>$)&&(at=$/Math.max(lt.width,lt.height)),at<1)if(typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&O instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&O instanceof ImageBitmap||typeof VideoFrame<"u"&&O instanceof VideoFrame){const mt=Math.floor(at*lt.width),Gt=Math.floor(at*lt.height);m===void 0&&(m=M(mt,Gt));const _t=T?M(mt,Gt):m;return _t.width=mt,_t.height=Gt,_t.getContext("2d").drawImage(O,0,0,mt,Gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+lt.width+"x"+lt.height+") to ("+mt+"x"+Gt+")."),_t}else return"data"in O&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+lt.width+"x"+lt.height+")."),O;return O}function v(O){return O.generateMipmaps&&O.minFilter!==wn&&O.minFilter!==qn}function y(O){s.generateMipmap(O)}function D(O,T,$,at,lt=!1){if(O!==null){if(s[O]!==void 0)return s[O];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+O+"'")}let mt=T;if(T===s.RED&&($===s.FLOAT&&(mt=s.R32F),$===s.HALF_FLOAT&&(mt=s.R16F),$===s.UNSIGNED_BYTE&&(mt=s.R8)),T===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(mt=s.R8UI),$===s.UNSIGNED_SHORT&&(mt=s.R16UI),$===s.UNSIGNED_INT&&(mt=s.R32UI),$===s.BYTE&&(mt=s.R8I),$===s.SHORT&&(mt=s.R16I),$===s.INT&&(mt=s.R32I)),T===s.RG&&($===s.FLOAT&&(mt=s.RG32F),$===s.HALF_FLOAT&&(mt=s.RG16F),$===s.UNSIGNED_BYTE&&(mt=s.RG8)),T===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(mt=s.RG8UI),$===s.UNSIGNED_SHORT&&(mt=s.RG16UI),$===s.UNSIGNED_INT&&(mt=s.RG32UI),$===s.BYTE&&(mt=s.RG8I),$===s.SHORT&&(mt=s.RG16I),$===s.INT&&(mt=s.RG32I)),T===s.RGB&&$===s.UNSIGNED_INT_5_9_9_9_REV&&(mt=s.RGB9_E5),T===s.RGBA){const Gt=lt?ba:ye.getTransfer(at);$===s.FLOAT&&(mt=s.RGBA32F),$===s.HALF_FLOAT&&(mt=s.RGBA16F),$===s.UNSIGNED_BYTE&&(mt=Gt===Ee?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT_4_4_4_4&&(mt=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(mt=s.RGB5_A1)}return(mt===s.R16F||mt===s.R32F||mt===s.RG16F||mt===s.RG32F||mt===s.RGBA16F||mt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),mt}function b(O,T){return v(O)===!0||O.isFramebufferTexture&&O.minFilter!==wn&&O.minFilter!==qn?Math.log2(Math.max(T.width,T.height))+1:O.mipmaps!==void 0&&O.mipmaps.length>0?O.mipmaps.length:O.isCompressedTexture&&Array.isArray(O.image)?T.mipmaps.length:1}function C(O){const T=O.target;T.removeEventListener("dispose",C),N(T),T.isVideoTexture&&p.delete(T)}function B(O){const T=O.target;T.removeEventListener("dispose",B),U(T)}function N(O){const T=n.get(O);if(T.__webglInit===void 0)return;const $=O.source,at=g.get($);if(at){const lt=at[T.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&R(O),Object.keys(at).length===0&&g.delete($)}n.remove(O)}function R(O){const T=n.get(O);s.deleteTexture(T.__webglTexture);const $=O.source,at=g.get($);delete at[T.__cacheKey],l.memory.textures--}function U(O){const T=n.get(O);if(O.depthTexture&&O.depthTexture.dispose(),O.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(T.__webglFramebuffer[at]))for(let lt=0;lt<T.__webglFramebuffer[at].length;lt++)s.deleteFramebuffer(T.__webglFramebuffer[at][lt]);else s.deleteFramebuffer(T.__webglFramebuffer[at]);T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer[at])}else{if(Array.isArray(T.__webglFramebuffer))for(let at=0;at<T.__webglFramebuffer.length;at++)s.deleteFramebuffer(T.__webglFramebuffer[at]);else s.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&s.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&s.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let at=0;at<T.__webglColorRenderbuffer.length;at++)T.__webglColorRenderbuffer[at]&&s.deleteRenderbuffer(T.__webglColorRenderbuffer[at]);T.__webglDepthRenderbuffer&&s.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const $=O.textures;for(let at=0,lt=$.length;at<lt;at++){const mt=n.get($[at]);mt.__webglTexture&&(s.deleteTexture(mt.__webglTexture),l.memory.textures--),n.remove($[at])}n.remove(O)}let P=0;function E(){P=0}function z(){const O=P;return O>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+O+" texture units while this GPU supports only "+r.maxTextures),P+=1,O}function q(O){const T=[];return T.push(O.wrapS),T.push(O.wrapT),T.push(O.wrapR||0),T.push(O.magFilter),T.push(O.minFilter),T.push(O.anisotropy),T.push(O.internalFormat),T.push(O.format),T.push(O.type),T.push(O.generateMipmaps),T.push(O.premultiplyAlpha),T.push(O.flipY),T.push(O.unpackAlignment),T.push(O.colorSpace),T.join()}function k(O,T){const $=n.get(O);if(O.isVideoTexture&&ft(O),O.isRenderTargetTexture===!1&&O.version>0&&$.__version!==O.version){const at=O.image;if(at===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{bt($,O,T);return}}e.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+T)}function W(O,T){const $=n.get(O);if(O.version>0&&$.__version!==O.version){bt($,O,T);return}e.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+T)}function X(O,T){const $=n.get(O);if(O.version>0&&$.__version!==O.version){bt($,O,T);return}e.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+T)}function J(O,T){const $=n.get(O);if(O.version>0&&$.__version!==O.version){Dt($,O,T);return}e.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+T)}const ht={[fc]:s.REPEAT,[gs]:s.CLAMP_TO_EDGE,[pc]:s.MIRRORED_REPEAT},F={[wn]:s.NEAREST,[ug]:s.NEAREST_MIPMAP_NEAREST,[zo]:s.NEAREST_MIPMAP_LINEAR,[qn]:s.LINEAR,[yl]:s.LINEAR_MIPMAP_NEAREST,[_s]:s.LINEAR_MIPMAP_LINEAR},rt={[Sg]:s.NEVER,[Pg]:s.ALWAYS,[wg]:s.LESS,[pf]:s.LEQUAL,[Eg]:s.EQUAL,[Lg]:s.GEQUAL,[Tg]:s.GREATER,[Ag]:s.NOTEQUAL};function Z(O,T){if(T.type===Ai&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===qn||T.magFilter===yl||T.magFilter===zo||T.magFilter===_s||T.minFilter===qn||T.minFilter===yl||T.minFilter===zo||T.minFilter===_s)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(O,s.TEXTURE_WRAP_S,ht[T.wrapS]),s.texParameteri(O,s.TEXTURE_WRAP_T,ht[T.wrapT]),(O===s.TEXTURE_3D||O===s.TEXTURE_2D_ARRAY)&&s.texParameteri(O,s.TEXTURE_WRAP_R,ht[T.wrapR]),s.texParameteri(O,s.TEXTURE_MAG_FILTER,F[T.magFilter]),s.texParameteri(O,s.TEXTURE_MIN_FILTER,F[T.minFilter]),T.compareFunction&&(s.texParameteri(O,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(O,s.TEXTURE_COMPARE_FUNC,rt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===wn||T.minFilter!==zo&&T.minFilter!==_s||T.type===Ai&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const $=t.get("EXT_texture_filter_anisotropic");s.texParameterf(O,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function dt(O,T){let $=!1;O.__webglInit===void 0&&(O.__webglInit=!0,T.addEventListener("dispose",C));const at=T.source;let lt=g.get(at);lt===void 0&&(lt={},g.set(at,lt));const mt=q(T);if(mt!==O.__cacheKey){lt[mt]===void 0&&(lt[mt]={texture:s.createTexture(),usedTimes:0},l.memory.textures++,$=!0),lt[mt].usedTimes++;const Gt=lt[O.__cacheKey];Gt!==void 0&&(lt[O.__cacheKey].usedTimes--,Gt.usedTimes===0&&R(T)),O.__cacheKey=mt,O.__webglTexture=lt[mt].texture}return $}function bt(O,T,$){let at=s.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(at=s.TEXTURE_2D_ARRAY),T.isData3DTexture&&(at=s.TEXTURE_3D);const lt=dt(O,T),mt=T.source;e.bindTexture(at,O.__webglTexture,s.TEXTURE0+$);const Gt=n.get(mt);if(mt.version!==Gt.__version||lt===!0){e.activeTexture(s.TEXTURE0+$);const _t=ye.getPrimaries(ye.workingColorSpace),Ft=T.colorSpace===Vi?null:ye.getPrimaries(T.colorSpace),Wt=T.colorSpace===Vi||_t===Ft?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let St=w(T.image,!1,r.maxTextureSize);St=vt(T,St);const Pt=a.convert(T.format,T.colorSpace),qt=a.convert(T.type);let Nt=D(T.internalFormat,Pt,qt,T.colorSpace,T.isVideoTexture);Z(at,T);let Ot;const ae=T.mipmaps,le=T.isVideoTexture!==!0&&Nt!==df,fe=Gt.__version===void 0||lt===!0,de=mt.dataReady,me=b(T,St);if(T.isDepthTexture)Nt=s.DEPTH_COMPONENT16,T.type===Ai?Nt=s.DEPTH_COMPONENT32F:T.type===vr?Nt=s.DEPTH_COMPONENT24:T.type===go&&(Nt=s.DEPTH24_STENCIL8),fe&&(le?e.texStorage2D(s.TEXTURE_2D,1,Nt,St.width,St.height):e.texImage2D(s.TEXTURE_2D,0,Nt,St.width,St.height,0,Pt,qt,null));else if(T.isDataTexture)if(ae.length>0){le&&fe&&e.texStorage2D(s.TEXTURE_2D,me,Nt,ae[0].width,ae[0].height);for(let kt=0,S=ae.length;kt<S;kt++)Ot=ae[kt],le?de&&e.texSubImage2D(s.TEXTURE_2D,kt,0,0,Ot.width,Ot.height,Pt,qt,Ot.data):e.texImage2D(s.TEXTURE_2D,kt,Nt,Ot.width,Ot.height,0,Pt,qt,Ot.data);T.generateMipmaps=!1}else le?(fe&&e.texStorage2D(s.TEXTURE_2D,me,Nt,St.width,St.height),de&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,St.width,St.height,Pt,qt,St.data)):e.texImage2D(s.TEXTURE_2D,0,Nt,St.width,St.height,0,Pt,qt,St.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){le&&fe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,me,Nt,ae[0].width,ae[0].height,St.depth);for(let kt=0,S=ae.length;kt<S;kt++)Ot=ae[kt],T.format!==ci?Pt!==null?le?de&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,kt,0,0,0,Ot.width,Ot.height,St.depth,Pt,Ot.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,kt,Nt,Ot.width,Ot.height,St.depth,0,Ot.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?de&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,kt,0,0,0,Ot.width,Ot.height,St.depth,Pt,qt,Ot.data):e.texImage3D(s.TEXTURE_2D_ARRAY,kt,Nt,Ot.width,Ot.height,St.depth,0,Pt,qt,Ot.data)}else{le&&fe&&e.texStorage2D(s.TEXTURE_2D,me,Nt,ae[0].width,ae[0].height);for(let kt=0,S=ae.length;kt<S;kt++)Ot=ae[kt],T.format!==ci?Pt!==null?le?de&&e.compressedTexSubImage2D(s.TEXTURE_2D,kt,0,0,Ot.width,Ot.height,Pt,Ot.data):e.compressedTexImage2D(s.TEXTURE_2D,kt,Nt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?de&&e.texSubImage2D(s.TEXTURE_2D,kt,0,0,Ot.width,Ot.height,Pt,qt,Ot.data):e.texImage2D(s.TEXTURE_2D,kt,Nt,Ot.width,Ot.height,0,Pt,qt,Ot.data)}else if(T.isDataArrayTexture)le?(fe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,me,Nt,St.width,St.height,St.depth),de&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,St.width,St.height,St.depth,Pt,qt,St.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Nt,St.width,St.height,St.depth,0,Pt,qt,St.data);else if(T.isData3DTexture)le?(fe&&e.texStorage3D(s.TEXTURE_3D,me,Nt,St.width,St.height,St.depth),de&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,St.width,St.height,St.depth,Pt,qt,St.data)):e.texImage3D(s.TEXTURE_3D,0,Nt,St.width,St.height,St.depth,0,Pt,qt,St.data);else if(T.isFramebufferTexture){if(fe)if(le)e.texStorage2D(s.TEXTURE_2D,me,Nt,St.width,St.height);else{let kt=St.width,S=St.height;for(let Q=0;Q<me;Q++)e.texImage2D(s.TEXTURE_2D,Q,Nt,kt,S,0,Pt,qt,null),kt>>=1,S>>=1}}else if(ae.length>0){if(le&&fe){const kt=xt(ae[0]);e.texStorage2D(s.TEXTURE_2D,me,Nt,kt.width,kt.height)}for(let kt=0,S=ae.length;kt<S;kt++)Ot=ae[kt],le?de&&e.texSubImage2D(s.TEXTURE_2D,kt,0,0,Pt,qt,Ot):e.texImage2D(s.TEXTURE_2D,kt,Nt,Pt,qt,Ot);T.generateMipmaps=!1}else if(le){if(fe){const kt=xt(St);e.texStorage2D(s.TEXTURE_2D,me,Nt,kt.width,kt.height)}de&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Pt,qt,St)}else e.texImage2D(s.TEXTURE_2D,0,Nt,Pt,qt,St);v(T)&&y(at),Gt.__version=mt.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function Dt(O,T,$){if(T.image.length!==6)return;const at=dt(O,T),lt=T.source;e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+$);const mt=n.get(lt);if(lt.version!==mt.__version||at===!0){e.activeTexture(s.TEXTURE0+$);const Gt=ye.getPrimaries(ye.workingColorSpace),_t=T.colorSpace===Vi?null:ye.getPrimaries(T.colorSpace),Ft=T.colorSpace===Vi||Gt===_t?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,T.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,T.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ft);const Wt=T.isCompressedTexture||T.image[0].isCompressedTexture,St=T.image[0]&&T.image[0].isDataTexture,Pt=[];for(let S=0;S<6;S++)!Wt&&!St?Pt[S]=w(T.image[S],!0,r.maxCubemapSize):Pt[S]=St?T.image[S].image:T.image[S],Pt[S]=vt(T,Pt[S]);const qt=Pt[0],Nt=a.convert(T.format,T.colorSpace),Ot=a.convert(T.type),ae=D(T.internalFormat,Nt,Ot,T.colorSpace),le=T.isVideoTexture!==!0,fe=mt.__version===void 0||at===!0,de=lt.dataReady;let me=b(T,qt);Z(s.TEXTURE_CUBE_MAP,T);let kt;if(Wt){le&&fe&&e.texStorage2D(s.TEXTURE_CUBE_MAP,me,ae,qt.width,qt.height);for(let S=0;S<6;S++){kt=Pt[S].mipmaps;for(let Q=0;Q<kt.length;Q++){const ut=kt[Q];T.format!==ci?Nt!==null?le?de&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q,0,0,ut.width,ut.height,Nt,ut.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q,ae,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):le?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q,0,0,ut.width,ut.height,Nt,Ot,ut.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q,ae,ut.width,ut.height,0,Nt,Ot,ut.data)}}}else{if(kt=T.mipmaps,le&&fe){kt.length>0&&me++;const S=xt(Pt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,me,ae,S.width,S.height)}for(let S=0;S<6;S++)if(St){le?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Pt[S].width,Pt[S].height,Nt,Ot,Pt[S].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,ae,Pt[S].width,Pt[S].height,0,Nt,Ot,Pt[S].data);for(let Q=0;Q<kt.length;Q++){const wt=kt[Q].image[S].image;le?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q+1,0,0,wt.width,wt.height,Nt,Ot,wt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q+1,ae,wt.width,wt.height,0,Nt,Ot,wt.data)}}else{le?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,0,0,Nt,Ot,Pt[S]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,0,ae,Nt,Ot,Pt[S]);for(let Q=0;Q<kt.length;Q++){const ut=kt[Q];le?de&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q+1,0,0,Nt,Ot,ut.image[S]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+S,Q+1,ae,Nt,Ot,ut.image[S])}}}v(T)&&y(s.TEXTURE_CUBE_MAP),mt.__version=lt.version,T.onUpdate&&T.onUpdate(T)}O.__version=T.version}function K(O,T,$,at,lt,mt){const Gt=a.convert($.format,$.colorSpace),_t=a.convert($.type),Ft=D($.internalFormat,Gt,_t,$.colorSpace);if(!n.get(T).__hasExternalTextures){const St=Math.max(1,T.width>>mt),Pt=Math.max(1,T.height>>mt);lt===s.TEXTURE_3D||lt===s.TEXTURE_2D_ARRAY?e.texImage3D(lt,mt,Ft,St,Pt,T.depth,0,Gt,_t,null):e.texImage2D(lt,mt,Ft,St,Pt,0,Gt,_t,null)}e.bindFramebuffer(s.FRAMEBUFFER,O),ot(T)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,at,lt,n.get($).__webglTexture,0,it(T)):(lt===s.TEXTURE_2D||lt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,at,lt,n.get($).__webglTexture,mt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ct(O,T,$){if(s.bindRenderbuffer(s.RENDERBUFFER,O),T.depthBuffer&&!T.stencilBuffer){let at=s.DEPTH_COMPONENT24;if($||ot(T)){const lt=T.depthTexture;lt&&lt.isDepthTexture&&(lt.type===Ai?at=s.DEPTH_COMPONENT32F:lt.type===vr&&(at=s.DEPTH_COMPONENT24));const mt=it(T);ot(T)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,mt,at,T.width,T.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,mt,at,T.width,T.height)}else s.renderbufferStorage(s.RENDERBUFFER,at,T.width,T.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,O)}else if(T.depthBuffer&&T.stencilBuffer){const at=it(T);$&&ot(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,at,s.DEPTH24_STENCIL8,T.width,T.height):ot(T)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,at,s.DEPTH24_STENCIL8,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,O)}else{const at=T.textures;for(let lt=0;lt<at.length;lt++){const mt=at[lt],Gt=a.convert(mt.format,mt.colorSpace),_t=a.convert(mt.type),Ft=D(mt.internalFormat,Gt,_t,mt.colorSpace),Wt=it(T);$&&ot(T)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Wt,Ft,T.width,T.height):ot(T)?u.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Wt,Ft,T.width,T.height):s.renderbufferStorage(s.RENDERBUFFER,Ft,T.width,T.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pt(O,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,O),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),k(T.depthTexture,0);const at=n.get(T.depthTexture).__webglTexture,lt=it(T);if(T.depthTexture.format===hr)ot(T)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,at,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,at,0);else if(T.depthTexture.format===ao)ot(T)?u.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,at,0,lt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,at,0);else throw new Error("Unknown depthTexture format")}function yt(O){const T=n.get(O),$=O.isWebGLCubeRenderTarget===!0;if(O.depthTexture&&!T.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");pt(T.__webglFramebuffer,O)}else if($){T.__webglDepthbuffer=[];for(let at=0;at<6;at++)e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer[at]),T.__webglDepthbuffer[at]=s.createRenderbuffer(),ct(T.__webglDepthbuffer[at],O,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer=s.createRenderbuffer(),ct(T.__webglDepthbuffer,O,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ut(O,T,$){const at=n.get(O);T!==void 0&&K(at.__webglFramebuffer,O,O.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&yt(O)}function Lt(O){const T=O.texture,$=n.get(O),at=n.get(T);O.addEventListener("dispose",B);const lt=O.textures,mt=O.isWebGLCubeRenderTarget===!0,Gt=lt.length>1;if(Gt||(at.__webglTexture===void 0&&(at.__webglTexture=s.createTexture()),at.__version=T.version,l.memory.textures++),mt){$.__webglFramebuffer=[];for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0){$.__webglFramebuffer[_t]=[];for(let Ft=0;Ft<T.mipmaps.length;Ft++)$.__webglFramebuffer[_t][Ft]=s.createFramebuffer()}else $.__webglFramebuffer[_t]=s.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){$.__webglFramebuffer=[];for(let _t=0;_t<T.mipmaps.length;_t++)$.__webglFramebuffer[_t]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(Gt)for(let _t=0,Ft=lt.length;_t<Ft;_t++){const Wt=n.get(lt[_t]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=s.createTexture(),l.memory.textures++)}if(O.samples>0&&ot(O)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let _t=0;_t<lt.length;_t++){const Ft=lt[_t];$.__webglColorRenderbuffer[_t]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[_t]);const Wt=a.convert(Ft.format,Ft.colorSpace),St=a.convert(Ft.type),Pt=D(Ft.internalFormat,Wt,St,Ft.colorSpace,O.isXRRenderTarget===!0),qt=it(O);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,Pt,O.width,O.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+_t,s.RENDERBUFFER,$.__webglColorRenderbuffer[_t])}s.bindRenderbuffer(s.RENDERBUFFER,null),O.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),ct($.__webglDepthRenderbuffer,O,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(mt){e.bindTexture(s.TEXTURE_CUBE_MAP,at.__webglTexture),Z(s.TEXTURE_CUBE_MAP,T);for(let _t=0;_t<6;_t++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ft=0;Ft<T.mipmaps.length;Ft++)K($.__webglFramebuffer[_t][Ft],O,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Ft);else K($.__webglFramebuffer[_t],O,T,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0);v(T)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Gt){for(let _t=0,Ft=lt.length;_t<Ft;_t++){const Wt=lt[_t],St=n.get(Wt);e.bindTexture(s.TEXTURE_2D,St.__webglTexture),Z(s.TEXTURE_2D,Wt),K($.__webglFramebuffer,O,Wt,s.COLOR_ATTACHMENT0+_t,s.TEXTURE_2D,0),v(Wt)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let _t=s.TEXTURE_2D;if((O.isWebGL3DRenderTarget||O.isWebGLArrayRenderTarget)&&(_t=O.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(_t,at.__webglTexture),Z(_t,T),T.mipmaps&&T.mipmaps.length>0)for(let Ft=0;Ft<T.mipmaps.length;Ft++)K($.__webglFramebuffer[Ft],O,T,s.COLOR_ATTACHMENT0,_t,Ft);else K($.__webglFramebuffer,O,T,s.COLOR_ATTACHMENT0,_t,0);v(T)&&y(_t),e.unbindTexture()}O.depthBuffer&&yt(O)}function Et(O){const T=O.textures;for(let $=0,at=T.length;$<at;$++){const lt=T[$];if(v(lt)){const mt=O.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,Gt=n.get(lt).__webglTexture;e.bindTexture(mt,Gt),y(mt),e.unbindTexture()}}}function G(O){if(O.samples>0&&ot(O)===!1){const T=O.textures,$=O.width,at=O.height;let lt=s.COLOR_BUFFER_BIT;const mt=[],Gt=O.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,_t=n.get(O),Ft=T.length>1;if(Ft)for(let Wt=0;Wt<T.length;Wt++)e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let Wt=0;Wt<T.length;Wt++){mt.push(s.COLOR_ATTACHMENT0+Wt),O.depthBuffer&&mt.push(Gt);const St=_t.__ignoreDepthValues!==void 0?_t.__ignoreDepthValues:!1;if(St===!1&&(O.depthBuffer&&(lt|=s.DEPTH_BUFFER_BIT),O.stencilBuffer&&_t.__isTransmissionRenderTarget!==!0&&(lt|=s.STENCIL_BUFFER_BIT)),Ft&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,_t.__webglColorRenderbuffer[Wt]),St===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[Gt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[Gt])),Ft){const Pt=n.get(T[Wt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pt,0)}s.blitFramebuffer(0,0,$,at,0,0,$,at,lt,s.NEAREST),h&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,mt)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Ft)for(let Wt=0;Wt<T.length;Wt++){e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.RENDERBUFFER,_t.__webglColorRenderbuffer[Wt]);const St=n.get(T[Wt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,_t.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Wt,s.TEXTURE_2D,St,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}}function it(O){return Math.min(r.maxSamples,O.samples)}function ot(O){const T=n.get(O);return O.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function ft(O){const T=l.render.frame;p.get(O)!==T&&(p.set(O,T),O.update())}function vt(O,T){const $=O.colorSpace,at=O.format,lt=O.type;return O.isCompressedTexture===!0||O.isVideoTexture===!0||$!==Ji&&$!==Vi&&(ye.getTransfer($)===Ee?(at!==ci||lt!==qi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),T}function xt(O){return typeof HTMLImageElement<"u"&&O instanceof HTMLImageElement?(d.width=O.naturalWidth||O.width,d.height=O.naturalHeight||O.height):typeof VideoFrame<"u"&&O instanceof VideoFrame?(d.width=O.displayWidth,d.height=O.displayHeight):(d.width=O.width,d.height=O.height),d}this.allocateTextureUnit=z,this.resetTextureUnits=E,this.setTexture2D=k,this.setTexture2DArray=W,this.setTexture3D=X,this.setTextureCube=J,this.rebindTextures=Ut,this.setupRenderTarget=Lt,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=G,this.setupDepthRenderbuffer=yt,this.setupFrameBufferTexture=K,this.useMultisampledRTT=ot}function Rx(s,t){function e(n,r=Vi){let a;const l=ye.getTransfer(r);if(n===qi)return s.UNSIGNED_BYTE;if(n===of)return s.UNSIGNED_SHORT_4_4_4_4;if(n===af)return s.UNSIGNED_SHORT_5_5_5_1;if(n===fg)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===hg)return s.BYTE;if(n===dg)return s.SHORT;if(n===sf)return s.UNSIGNED_SHORT;if(n===rf)return s.INT;if(n===vr)return s.UNSIGNED_INT;if(n===Ai)return s.FLOAT;if(n===Ma)return s.HALF_FLOAT;if(n===pg)return s.ALPHA;if(n===mg)return s.RGB;if(n===ci)return s.RGBA;if(n===gg)return s.LUMINANCE;if(n===_g)return s.LUMINANCE_ALPHA;if(n===hr)return s.DEPTH_COMPONENT;if(n===ao)return s.DEPTH_STENCIL;if(n===lf)return s.RED;if(n===cf)return s.RED_INTEGER;if(n===vg)return s.RG;if(n===uf)return s.RG_INTEGER;if(n===hf)return s.RGBA_INTEGER;if(n===xl||n===Ml||n===bl||n===Sl)if(l===Ee)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===xl)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ml)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===bl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Sl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===xl)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ml)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===bl)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Sl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qu||n===th||n===eh||n===nh)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Qu)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===th)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===eh)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===nh)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===df)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===ih||n===sh)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===ih)return l===Ee?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===sh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===rh||n===oh||n===ah||n===lh||n===ch||n===uh||n===hh||n===dh||n===fh||n===ph||n===mh||n===gh||n===_h||n===vh)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===rh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===oh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ah)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ch)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===hh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===dh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===fh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ph)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_h)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vh)return l===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wl||n===yh||n===xh)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===wl)return l===Ee?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yh)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xh)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===yg||n===Mh||n===bh||n===Sh)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===wl)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Mh)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bh)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sh)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===go?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Ix extends Un{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class vs extends Je{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dx={type:"move"};class jl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let r=null,a=null,l=null;const u=this._targetRay,h=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const w of t.hand.values()){const v=e.getJointPose(w,n),y=this._getHandJoint(d,w);v!==null&&(y.matrix.fromArray(v.transform.matrix),y.matrix.decompose(y.position,y.rotation,y.scale),y.matrixWorldNeedsUpdate=!0,y.jointRadius=v.radius),y.visible=v!==null}const p=d.joints["index-finger-tip"],m=d.joints["thumb-tip"],g=p.position.distanceTo(m.position),_=.02,M=.005;d.inputState.pinching&&g>_+M?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&g<=_-M&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(h.matrix.fromArray(a.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,a.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(a.linearVelocity)):h.hasLinearVelocity=!1,a.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(a.angularVelocity)):h.hasAngularVelocity=!1));u!==null&&(r=e.getPose(t.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(u.matrix.fromArray(r.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,r.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(r.linearVelocity)):u.hasLinearVelocity=!1,r.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(r.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Dx)))}return u!==null&&(u.visible=r!==null),h!==null&&(h.visible=a!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new vs;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ox=`
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

}`;class Ux{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const r=new ln,a=t.properties.get(r);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,r=new Ki({vertexShader:Nx,fragmentShader:Ox,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ve(new _o(20,20),r)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class kx extends Es{constructor(t,e){super();const n=this;let r=null,a=1,l=null,u="local-floor",h=1,d=null,p=null,m=null,g=null,_=null,M=null;const w=new Ux,v=e.getContextAttributes();let y=null,D=null;const b=[],C=[],B=new Mt;let N=null;const R=new Un;R.layers.enable(1),R.viewport=new Ke;const U=new Un;U.layers.enable(2),U.viewport=new Ke;const P=[R,U],E=new Ix;E.layers.enable(1),E.layers.enable(2);let z=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ct=b[K];return ct===void 0&&(ct=new jl,b[K]=ct),ct.getTargetRaySpace()},this.getControllerGrip=function(K){let ct=b[K];return ct===void 0&&(ct=new jl,b[K]=ct),ct.getGripSpace()},this.getHand=function(K){let ct=b[K];return ct===void 0&&(ct=new jl,b[K]=ct),ct.getHandSpace()};function k(K){const ct=C.indexOf(K.inputSource);if(ct===-1)return;const pt=b[ct];pt!==void 0&&(pt.update(K.inputSource,K.frame,d||l),pt.dispatchEvent({type:K.type,data:K.inputSource}))}function W(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",X);for(let K=0;K<b.length;K++){const ct=C[K];ct!==null&&(C[K]=null,b[K].disconnect(ct))}z=null,q=null,w.reset(),t.setRenderTarget(y),_=null,g=null,m=null,r=null,D=null,Dt.stop(),n.isPresenting=!1,t.setPixelRatio(N),t.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){u=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(K){d=K},this.getBaseLayer=function(){return g!==null?g:_},this.getBinding=function(){return m},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(K){if(r=K,r!==null){if(y=t.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",W),r.addEventListener("inputsourceschange",X),v.xrCompatible!==!0&&await e.makeXRCompatible(),N=t.getPixelRatio(),t.getSize(B),r.renderState.layers===void 0){const ct={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};_=new XRWebGLLayer(r,e,ct),r.updateRenderState({baseLayer:_}),t.setPixelRatio(1),t.setSize(_.framebufferWidth,_.framebufferHeight,!1),D=new xs(_.framebufferWidth,_.framebufferHeight,{format:ci,type:qi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let ct=null,pt=null,yt=null;v.depth&&(yt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=v.stencil?ao:hr,pt=v.stencil?go:vr);const Ut={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:a};m=new XRWebGLBinding(r,e),g=m.createProjectionLayer(Ut),r.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),D=new xs(g.textureWidth,g.textureHeight,{format:ci,type:qi,depthTexture:new Af(g.textureWidth,g.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const Lt=t.properties.get(D);Lt.__ignoreDepthValues=g.ignoreDepthValues}D.isXRRenderTarget=!0,this.setFoveation(h),d=null,l=await r.requestReferenceSpace(u),Dt.setContext(r),Dt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode};function X(K){for(let ct=0;ct<K.removed.length;ct++){const pt=K.removed[ct],yt=C.indexOf(pt);yt>=0&&(C[yt]=null,b[yt].disconnect(pt))}for(let ct=0;ct<K.added.length;ct++){const pt=K.added[ct];let yt=C.indexOf(pt);if(yt===-1){for(let Lt=0;Lt<b.length;Lt++)if(Lt>=C.length){C.push(pt),yt=Lt;break}else if(C[Lt]===null){C[Lt]=pt,yt=Lt;break}if(yt===-1)break}const Ut=b[yt];Ut&&Ut.connect(pt)}}const J=new V,ht=new V;function F(K,ct,pt){J.setFromMatrixPosition(ct.matrixWorld),ht.setFromMatrixPosition(pt.matrixWorld);const yt=J.distanceTo(ht),Ut=ct.projectionMatrix.elements,Lt=pt.projectionMatrix.elements,Et=Ut[14]/(Ut[10]-1),G=Ut[14]/(Ut[10]+1),it=(Ut[9]+1)/Ut[5],ot=(Ut[9]-1)/Ut[5],ft=(Ut[8]-1)/Ut[0],vt=(Lt[8]+1)/Lt[0],xt=Et*ft,O=Et*vt,T=yt/(-ft+vt),$=T*-ft;ct.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX($),K.translateZ(T),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const at=Et+T,lt=G+T,mt=xt-$,Gt=O+(yt-$),_t=it*G/lt*at,Ft=ot*G/lt*at;K.projectionMatrix.makePerspective(mt,Gt,_t,Ft,at,lt),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function rt(K,ct){ct===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ct.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(r===null)return;w.texture!==null&&(K.near=w.depthNear,K.far=w.depthFar),E.near=U.near=R.near=K.near,E.far=U.far=R.far=K.far,(z!==E.near||q!==E.far)&&(r.updateRenderState({depthNear:E.near,depthFar:E.far}),z=E.near,q=E.far,R.near=z,R.far=q,U.near=z,U.far=q,R.updateProjectionMatrix(),U.updateProjectionMatrix(),K.updateProjectionMatrix());const ct=K.parent,pt=E.cameras;rt(E,ct);for(let yt=0;yt<pt.length;yt++)rt(pt[yt],ct);pt.length===2?F(E,R,U):E.projectionMatrix.copy(R.projectionMatrix),Z(K,E,ct)};function Z(K,ct,pt){pt===null?K.matrix.copy(ct.matrixWorld):(K.matrix.copy(pt.matrixWorld),K.matrix.invert(),K.matrix.multiply(ct.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ct.projectionMatrix),K.projectionMatrixInverse.copy(ct.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=mc*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(g===null&&_===null))return h},this.setFoveation=function(K){h=K,g!==null&&(g.fixedFoveation=K),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=K)},this.hasDepthSensing=function(){return w.texture!==null};let dt=null;function bt(K,ct){if(p=ct.getViewerPose(d||l),M=ct,p!==null){const pt=p.views;_!==null&&(t.setRenderTargetFramebuffer(D,_.framebuffer),t.setRenderTarget(D));let yt=!1;pt.length!==E.cameras.length&&(E.cameras.length=0,yt=!0);for(let Lt=0;Lt<pt.length;Lt++){const Et=pt[Lt];let G=null;if(_!==null)G=_.getViewport(Et);else{const ot=m.getViewSubImage(g,Et);G=ot.viewport,Lt===0&&(t.setRenderTargetTextures(D,ot.colorTexture,g.ignoreDepthValues?void 0:ot.depthStencilTexture),t.setRenderTarget(D))}let it=P[Lt];it===void 0&&(it=new Un,it.layers.enable(Lt),it.viewport=new Ke,P[Lt]=it),it.matrix.fromArray(Et.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Et.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(G.x,G.y,G.width,G.height),Lt===0&&(E.matrix.copy(it.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),yt===!0&&E.cameras.push(it)}const Ut=r.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const Lt=m.getDepthInformation(pt[0]);Lt&&Lt.isValid&&Lt.texture&&w.init(t,Lt,r.renderState)}}for(let pt=0;pt<b.length;pt++){const yt=C[pt],Ut=b[pt];yt!==null&&Ut!==void 0&&Ut.update(yt,ct,d||l)}w.render(t,E),dt&&dt(K,ct),ct.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ct}),M=null}const Dt=new Ef;Dt.setAnimationLoop(bt),this.setAnimationLoop=function(K){dt=K},this.dispose=function(){}}}const hs=new hi,Bx=new xe;function Fx(s,t){function e(v,y){v.matrixAutoUpdate===!0&&v.updateMatrix(),y.value.copy(v.matrix)}function n(v,y){y.color.getRGB(v.fogColor.value,bf(s)),y.isFog?(v.fogNear.value=y.near,v.fogFar.value=y.far):y.isFogExp2&&(v.fogDensity.value=y.density)}function r(v,y,D,b,C){y.isMeshBasicMaterial||y.isMeshLambertMaterial?a(v,y):y.isMeshToonMaterial?(a(v,y),m(v,y)):y.isMeshPhongMaterial?(a(v,y),p(v,y)):y.isMeshStandardMaterial?(a(v,y),g(v,y),y.isMeshPhysicalMaterial&&_(v,y,C)):y.isMeshMatcapMaterial?(a(v,y),M(v,y)):y.isMeshDepthMaterial?a(v,y):y.isMeshDistanceMaterial?(a(v,y),w(v,y)):y.isMeshNormalMaterial?a(v,y):y.isLineBasicMaterial?(l(v,y),y.isLineDashedMaterial&&u(v,y)):y.isPointsMaterial?h(v,y,D,b):y.isSpriteMaterial?d(v,y):y.isShadowMaterial?(v.color.value.copy(y.color),v.opacity.value=y.opacity):y.isShaderMaterial&&(y.uniformsNeedUpdate=!1)}function a(v,y){v.opacity.value=y.opacity,y.color&&v.diffuse.value.copy(y.color),y.emissive&&v.emissive.value.copy(y.emissive).multiplyScalar(y.emissiveIntensity),y.map&&(v.map.value=y.map,e(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,e(y.alphaMap,v.alphaMapTransform)),y.bumpMap&&(v.bumpMap.value=y.bumpMap,e(y.bumpMap,v.bumpMapTransform),v.bumpScale.value=y.bumpScale,y.side===En&&(v.bumpScale.value*=-1)),y.normalMap&&(v.normalMap.value=y.normalMap,e(y.normalMap,v.normalMapTransform),v.normalScale.value.copy(y.normalScale),y.side===En&&v.normalScale.value.negate()),y.displacementMap&&(v.displacementMap.value=y.displacementMap,e(y.displacementMap,v.displacementMapTransform),v.displacementScale.value=y.displacementScale,v.displacementBias.value=y.displacementBias),y.emissiveMap&&(v.emissiveMap.value=y.emissiveMap,e(y.emissiveMap,v.emissiveMapTransform)),y.specularMap&&(v.specularMap.value=y.specularMap,e(y.specularMap,v.specularMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest);const D=t.get(y),b=D.envMap,C=D.envMapRotation;if(b&&(v.envMap.value=b,hs.copy(C),hs.x*=-1,hs.y*=-1,hs.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(hs.y*=-1,hs.z*=-1),v.envMapRotation.value.setFromMatrix4(Bx.makeRotationFromEuler(hs)),v.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=y.reflectivity,v.ior.value=y.ior,v.refractionRatio.value=y.refractionRatio),y.lightMap){v.lightMap.value=y.lightMap;const B=s._useLegacyLights===!0?Math.PI:1;v.lightMapIntensity.value=y.lightMapIntensity*B,e(y.lightMap,v.lightMapTransform)}y.aoMap&&(v.aoMap.value=y.aoMap,v.aoMapIntensity.value=y.aoMapIntensity,e(y.aoMap,v.aoMapTransform))}function l(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,y.map&&(v.map.value=y.map,e(y.map,v.mapTransform))}function u(v,y){v.dashSize.value=y.dashSize,v.totalSize.value=y.dashSize+y.gapSize,v.scale.value=y.scale}function h(v,y,D,b){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.size.value=y.size*D,v.scale.value=b*.5,y.map&&(v.map.value=y.map,e(y.map,v.uvTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,e(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function d(v,y){v.diffuse.value.copy(y.color),v.opacity.value=y.opacity,v.rotation.value=y.rotation,y.map&&(v.map.value=y.map,e(y.map,v.mapTransform)),y.alphaMap&&(v.alphaMap.value=y.alphaMap,e(y.alphaMap,v.alphaMapTransform)),y.alphaTest>0&&(v.alphaTest.value=y.alphaTest)}function p(v,y){v.specular.value.copy(y.specular),v.shininess.value=Math.max(y.shininess,1e-4)}function m(v,y){y.gradientMap&&(v.gradientMap.value=y.gradientMap)}function g(v,y){v.metalness.value=y.metalness,y.metalnessMap&&(v.metalnessMap.value=y.metalnessMap,e(y.metalnessMap,v.metalnessMapTransform)),v.roughness.value=y.roughness,y.roughnessMap&&(v.roughnessMap.value=y.roughnessMap,e(y.roughnessMap,v.roughnessMapTransform)),y.envMap&&(v.envMapIntensity.value=y.envMapIntensity)}function _(v,y,D){v.ior.value=y.ior,y.sheen>0&&(v.sheenColor.value.copy(y.sheenColor).multiplyScalar(y.sheen),v.sheenRoughness.value=y.sheenRoughness,y.sheenColorMap&&(v.sheenColorMap.value=y.sheenColorMap,e(y.sheenColorMap,v.sheenColorMapTransform)),y.sheenRoughnessMap&&(v.sheenRoughnessMap.value=y.sheenRoughnessMap,e(y.sheenRoughnessMap,v.sheenRoughnessMapTransform))),y.clearcoat>0&&(v.clearcoat.value=y.clearcoat,v.clearcoatRoughness.value=y.clearcoatRoughness,y.clearcoatMap&&(v.clearcoatMap.value=y.clearcoatMap,e(y.clearcoatMap,v.clearcoatMapTransform)),y.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=y.clearcoatRoughnessMap,e(y.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),y.clearcoatNormalMap&&(v.clearcoatNormalMap.value=y.clearcoatNormalMap,e(y.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(y.clearcoatNormalScale),y.side===En&&v.clearcoatNormalScale.value.negate())),y.iridescence>0&&(v.iridescence.value=y.iridescence,v.iridescenceIOR.value=y.iridescenceIOR,v.iridescenceThicknessMinimum.value=y.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=y.iridescenceThicknessRange[1],y.iridescenceMap&&(v.iridescenceMap.value=y.iridescenceMap,e(y.iridescenceMap,v.iridescenceMapTransform)),y.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=y.iridescenceThicknessMap,e(y.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),y.transmission>0&&(v.transmission.value=y.transmission,v.transmissionSamplerMap.value=D.texture,v.transmissionSamplerSize.value.set(D.width,D.height),y.transmissionMap&&(v.transmissionMap.value=y.transmissionMap,e(y.transmissionMap,v.transmissionMapTransform)),v.thickness.value=y.thickness,y.thicknessMap&&(v.thicknessMap.value=y.thicknessMap,e(y.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=y.attenuationDistance,v.attenuationColor.value.copy(y.attenuationColor)),y.anisotropy>0&&(v.anisotropyVector.value.set(y.anisotropy*Math.cos(y.anisotropyRotation),y.anisotropy*Math.sin(y.anisotropyRotation)),y.anisotropyMap&&(v.anisotropyMap.value=y.anisotropyMap,e(y.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=y.specularIntensity,v.specularColor.value.copy(y.specularColor),y.specularColorMap&&(v.specularColorMap.value=y.specularColorMap,e(y.specularColorMap,v.specularColorMapTransform)),y.specularIntensityMap&&(v.specularIntensityMap.value=y.specularIntensityMap,e(y.specularIntensityMap,v.specularIntensityMapTransform))}function M(v,y){y.matcap&&(v.matcap.value=y.matcap)}function w(v,y){const D=t.get(y).light;v.referencePosition.value.setFromMatrixPosition(D.matrixWorld),v.nearDistance.value=D.shadow.camera.near,v.farDistance.value=D.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function zx(s,t,e,n){let r={},a={},l=[];const u=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function h(D,b){const C=b.program;n.uniformBlockBinding(D,C)}function d(D,b){let C=r[D.id];C===void 0&&(M(D),C=p(D),r[D.id]=C,D.addEventListener("dispose",v));const B=b.program;n.updateUBOMapping(D,B);const N=t.render.frame;a[D.id]!==N&&(g(D),a[D.id]=N)}function p(D){const b=m();D.__bindingPointIndex=b;const C=s.createBuffer(),B=D.__size,N=D.usage;return s.bindBuffer(s.UNIFORM_BUFFER,C),s.bufferData(s.UNIFORM_BUFFER,B,N),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,b,C),C}function m(){for(let D=0;D<u;D++)if(l.indexOf(D)===-1)return l.push(D),D;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(D){const b=r[D.id],C=D.uniforms,B=D.__cache;s.bindBuffer(s.UNIFORM_BUFFER,b);for(let N=0,R=C.length;N<R;N++){const U=Array.isArray(C[N])?C[N]:[C[N]];for(let P=0,E=U.length;P<E;P++){const z=U[P];if(_(z,N,P,B)===!0){const q=z.__offset,k=Array.isArray(z.value)?z.value:[z.value];let W=0;for(let X=0;X<k.length;X++){const J=k[X],ht=w(J);typeof J=="number"||typeof J=="boolean"?(z.__data[0]=J,s.bufferSubData(s.UNIFORM_BUFFER,q+W,z.__data)):J.isMatrix3?(z.__data[0]=J.elements[0],z.__data[1]=J.elements[1],z.__data[2]=J.elements[2],z.__data[3]=0,z.__data[4]=J.elements[3],z.__data[5]=J.elements[4],z.__data[6]=J.elements[5],z.__data[7]=0,z.__data[8]=J.elements[6],z.__data[9]=J.elements[7],z.__data[10]=J.elements[8],z.__data[11]=0):(J.toArray(z.__data,W),W+=ht.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,q,z.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function _(D,b,C,B){const N=D.value,R=b+"_"+C;if(B[R]===void 0)return typeof N=="number"||typeof N=="boolean"?B[R]=N:B[R]=N.clone(),!0;{const U=B[R];if(typeof N=="number"||typeof N=="boolean"){if(U!==N)return B[R]=N,!0}else if(U.equals(N)===!1)return U.copy(N),!0}return!1}function M(D){const b=D.uniforms;let C=0;const B=16;for(let R=0,U=b.length;R<U;R++){const P=Array.isArray(b[R])?b[R]:[b[R]];for(let E=0,z=P.length;E<z;E++){const q=P[E],k=Array.isArray(q.value)?q.value:[q.value];for(let W=0,X=k.length;W<X;W++){const J=k[W],ht=w(J),F=C%B;F!==0&&B-F<ht.boundary&&(C+=B-F),q.__data=new Float32Array(ht.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=C,C+=ht.storage}}}const N=C%B;return N>0&&(C+=B-N),D.__size=C,D.__cache={},this}function w(D){const b={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(b.boundary=4,b.storage=4):D.isVector2?(b.boundary=8,b.storage=8):D.isVector3||D.isColor?(b.boundary=16,b.storage=12):D.isVector4?(b.boundary=16,b.storage=16):D.isMatrix3?(b.boundary=48,b.storage=48):D.isMatrix4?(b.boundary=64,b.storage=64):D.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",D),b}function v(D){const b=D.target;b.removeEventListener("dispose",v);const C=l.indexOf(b.__bindingPointIndex);l.splice(C,1),s.deleteBuffer(r[b.id]),delete r[b.id],delete a[b.id]}function y(){for(const D in r)s.deleteBuffer(r[D]);l=[],r={},a={}}return{bind:h,update:d,dispose:y}}class Hx{constructor(t={}){const{canvas:e=Ig(),context:n=null,depth:r=!0,stencil:a=!1,alpha:l=!1,antialias:u=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:d=!1,powerPreference:p="default",failIfMajorPerformanceCaveat:m=!1}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=l;const _=new Uint32Array(4),M=new Int32Array(4);let w=null,v=null;const y=[],D=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ri,this._useLegacyLights=!1,this.toneMapping=Xi,this.toneMappingExposure=1;const b=this;let C=!1,B=0,N=0,R=null,U=-1,P=null;const E=new Ke,z=new Ke;let q=null;const k=new ne(0);let W=0,X=e.width,J=e.height,ht=1,F=null,rt=null;const Z=new Ke(0,0,X,J),dt=new Ke(0,0,X,J);let bt=!1;const Dt=new Nc;let K=!1,ct=!1;const pt=new xe,yt=new Mt,Ut=new V,Lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Et(){return R===null?ht:1}let G=n;function it(I,Y){const nt=e.getContext(I,Y);return nt!==null?nt:null}try{const I={alpha:!0,depth:r,stencil:a,antialias:u,premultipliedAlpha:h,preserveDrawingBuffer:d,powerPreference:p,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Cc}`),e.addEventListener("webglcontextlost",Q,!1),e.addEventListener("webglcontextrestored",ut,!1),e.addEventListener("webglcontextcreationerror",wt,!1),G===null){const Y="webgl2";if(G=it(Y,I),G===null)throw it(Y)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let ot,ft,vt,xt,O,T,$,at,lt,mt,Gt,_t,Ft,Wt,St,Pt,qt,Nt,Ot,ae,le,fe,de,me;function kt(){ot=new Yy(G),ot.init(),ft=new Gy(G,ot,t),fe=new Rx(G,ot),vt=new Px(G),xt=new Jy(G),O=new mx,T=new Cx(G,ot,vt,O,ft,fe,xt),$=new Zy(b),at=new $y(b),lt=new s_(G),de=new Hy(G,lt),mt=new jy(G,lt,xt,de),Gt=new t0(G,mt,lt,xt),Ot=new Qy(G,ft,T),Pt=new Wy(O),_t=new px(b,$,at,ot,ft,de,Pt),Ft=new Fx(b,O),Wt=new _x,St=new Sx(ot),Nt=new zy(b,$,at,vt,Gt,g,h),qt=new Lx(b,Gt,ft),me=new zx(G,xt,ft,vt),ae=new Vy(G,ot,xt),le=new Ky(G,ot,xt),xt.programs=_t.programs,b.capabilities=ft,b.extensions=ot,b.properties=O,b.renderLists=Wt,b.shadowMap=qt,b.state=vt,b.info=xt}kt();const S=new kx(b,G);this.xr=S,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const I=ot.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=ot.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return ht},this.setPixelRatio=function(I){I!==void 0&&(ht=I,this.setSize(X,J,!1))},this.getSize=function(I){return I.set(X,J)},this.setSize=function(I,Y,nt=!0){if(S.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=I,J=Y,e.width=Math.floor(I*ht),e.height=Math.floor(Y*ht),nt===!0&&(e.style.width=I+"px",e.style.height=Y+"px"),this.setViewport(0,0,I,Y)},this.getDrawingBufferSize=function(I){return I.set(X*ht,J*ht).floor()},this.setDrawingBufferSize=function(I,Y,nt){X=I,J=Y,ht=nt,e.width=Math.floor(I*nt),e.height=Math.floor(Y*nt),this.setViewport(0,0,I,Y)},this.getCurrentViewport=function(I){return I.copy(E)},this.getViewport=function(I){return I.copy(Z)},this.setViewport=function(I,Y,nt,st){I.isVector4?Z.set(I.x,I.y,I.z,I.w):Z.set(I,Y,nt,st),vt.viewport(E.copy(Z).multiplyScalar(ht).round())},this.getScissor=function(I){return I.copy(dt)},this.setScissor=function(I,Y,nt,st){I.isVector4?dt.set(I.x,I.y,I.z,I.w):dt.set(I,Y,nt,st),vt.scissor(z.copy(dt).multiplyScalar(ht).round())},this.getScissorTest=function(){return bt},this.setScissorTest=function(I){vt.setScissorTest(bt=I)},this.setOpaqueSort=function(I){F=I},this.setTransparentSort=function(I){rt=I},this.getClearColor=function(I){return I.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(I=!0,Y=!0,nt=!0){let st=0;if(I){let tt=!1;if(R!==null){const At=R.texture.format;tt=At===hf||At===uf||At===cf}if(tt){const At=R.texture.type,Ht=At===qi||At===vr||At===sf||At===go||At===of||At===af,Zt=Nt.getClearColor(),Xt=Nt.getClearAlpha(),Jt=Zt.r,Kt=Zt.g,Qt=Zt.b;Ht?(_[0]=Jt,_[1]=Kt,_[2]=Qt,_[3]=Xt,G.clearBufferuiv(G.COLOR,0,_)):(M[0]=Jt,M[1]=Kt,M[2]=Qt,M[3]=Xt,G.clearBufferiv(G.COLOR,0,M))}else st|=G.COLOR_BUFFER_BIT}Y&&(st|=G.DEPTH_BUFFER_BIT),nt&&(st|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Q,!1),e.removeEventListener("webglcontextrestored",ut,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),Wt.dispose(),St.dispose(),O.dispose(),$.dispose(),at.dispose(),Gt.dispose(),de.dispose(),me.dispose(),_t.dispose(),S.dispose(),S.removeEventListener("sessionstart",De),S.removeEventListener("sessionend",Le),cn.stop()};function Q(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ut(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const I=xt.autoReset,Y=qt.enabled,nt=qt.autoUpdate,st=qt.needsUpdate,tt=qt.type;kt(),xt.autoReset=I,qt.enabled=Y,qt.autoUpdate=nt,qt.needsUpdate=st,qt.type=tt}function wt(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function Rt(I){const Y=I.target;Y.removeEventListener("dispose",Rt),ue(Y)}function ue(I){oe(I),O.remove(I)}function oe(I){const Y=O.get(I).programs;Y!==void 0&&(Y.forEach(function(nt){_t.releaseProgram(nt)}),I.isShaderMaterial&&_t.releaseShaderCache(I))}this.renderBufferDirect=function(I,Y,nt,st,tt,At){Y===null&&(Y=Lt);const Ht=tt.isMesh&&tt.matrixWorld.determinant()<0,Zt=bo(I,Y,nt,st,tt);vt.setMaterial(st,Ht);let Xt=nt.index,Jt=1;if(st.wireframe===!0){if(Xt=mt.getWireframeAttribute(nt),Xt===void 0)return;Jt=2}const Kt=nt.drawRange,Qt=nt.attributes.position;let Ce=Kt.start*Jt,un=(Kt.start+Kt.count)*Jt;At!==null&&(Ce=Math.max(Ce,At.start*Jt),un=Math.min(un,(At.start+At.count)*Jt)),Xt!==null?(Ce=Math.max(Ce,0),un=Math.min(un,Xt.count)):Qt!=null&&(Ce=Math.max(Ce,0),un=Math.min(un,Qt.count));const Ne=un-Ce;if(Ne<0||Ne===1/0)return;de.setup(tt,st,Zt,nt,Xt);let hn,be=ae;if(Xt!==null&&(hn=lt.get(Xt),be=le,be.setIndex(hn)),tt.isMesh)st.wireframe===!0?(vt.setLineWidth(st.wireframeLinewidth*Et()),be.setMode(G.LINES)):be.setMode(G.TRIANGLES);else if(tt.isLine){let te=st.linewidth;te===void 0&&(te=1),vt.setLineWidth(te*Et()),tt.isLineSegments?be.setMode(G.LINES):tt.isLineLoop?be.setMode(G.LINE_LOOP):be.setMode(G.LINE_STRIP)}else tt.isPoints?be.setMode(G.POINTS):tt.isSprite&&be.setMode(G.TRIANGLES);if(tt.isBatchedMesh)be.renderMultiDraw(tt._multiDrawStarts,tt._multiDrawCounts,tt._multiDrawCount);else if(tt.isInstancedMesh)be.renderInstances(Ce,Ne,tt.count);else if(nt.isInstancedBufferGeometry){const te=nt._maxInstanceCount!==void 0?nt._maxInstanceCount:1/0,fi=Math.min(nt.instanceCount,te);be.renderInstances(Ce,Ne,fi)}else be.render(Ce,Ne)};function Me(I,Y,nt){I.transparent===!0&&I.side===Bn&&I.forceSinglePass===!1?(I.side=En,I.needsUpdate=!0,Qi(I,Y,nt),I.side=ji,I.needsUpdate=!0,Qi(I,Y,nt),I.side=Bn):Qi(I,Y,nt)}this.compile=function(I,Y,nt=null){nt===null&&(nt=I),v=St.get(nt),v.init(),D.push(v),nt.traverseVisible(function(tt){tt.isLight&&tt.layers.test(Y.layers)&&(v.pushLight(tt),tt.castShadow&&v.pushShadow(tt))}),I!==nt&&I.traverseVisible(function(tt){tt.isLight&&tt.layers.test(Y.layers)&&(v.pushLight(tt),tt.castShadow&&v.pushShadow(tt))}),v.setupLights(b._useLegacyLights);const st=new Set;return I.traverse(function(tt){const At=tt.material;if(At)if(Array.isArray(At))for(let Ht=0;Ht<At.length;Ht++){const Zt=At[Ht];Me(Zt,nt,tt),st.add(Zt)}else Me(At,nt,tt),st.add(At)}),D.pop(),v=null,st},this.compileAsync=function(I,Y,nt=null){const st=this.compile(I,Y,nt);return new Promise(tt=>{function At(){if(st.forEach(function(Ht){O.get(Ht).currentProgram.isReady()&&st.delete(Ht)}),st.size===0){tt(I);return}setTimeout(At,10)}ot.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let ke=null;function ve(I){ke&&ke(I)}function De(){cn.stop()}function Le(){cn.start()}const cn=new Ef;cn.setAnimationLoop(ve),typeof self<"u"&&cn.setContext(self),this.setAnimationLoop=function(I){ke=I,S.setAnimationLoop(I),I===null?cn.stop():cn.start()},S.addEventListener("sessionstart",De),S.addEventListener("sessionend",Le),this.render=function(I,Y){if(Y!==void 0&&Y.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),S.enabled===!0&&S.isPresenting===!0&&(S.cameraAutoUpdate===!0&&S.updateCamera(Y),Y=S.getCamera()),I.isScene===!0&&I.onBeforeRender(b,I,Y,R),v=St.get(I,D.length),v.init(),D.push(v),pt.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),Dt.setFromProjectionMatrix(pt),ct=this.localClippingEnabled,K=Pt.init(this.clippingPlanes,ct),w=Wt.get(I,y.length),w.init(),y.push(w),_n(I,Y,0,b.sortObjects),w.finish(),b.sortObjects===!0&&w.sort(F,rt),this.info.render.frame++,K===!0&&Pt.beginShadows();const nt=v.state.shadowsArray;if(qt.render(nt,I,Y),K===!0&&Pt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(S.enabled===!1||S.isPresenting===!1||S.hasDepthSensing()===!1)&&Nt.render(w,I),v.setupLights(b._useLegacyLights),Y.isArrayCamera){const st=Y.cameras;for(let tt=0,At=st.length;tt<At;tt++){const Ht=st[tt];ti(w,I,Ht,Ht.viewport)}}else ti(w,I,Y);R!==null&&(T.updateMultisampleRenderTarget(R),T.updateRenderTargetMipmap(R)),I.isScene===!0&&I.onAfterRender(b,I,Y),de.resetDefaultState(),U=-1,P=null,D.pop(),D.length>0?v=D[D.length-1]:v=null,y.pop(),y.length>0?w=y[y.length-1]:w=null};function _n(I,Y,nt,st){if(I.visible===!1)return;if(I.layers.test(Y.layers)){if(I.isGroup)nt=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(Y);else if(I.isLight)v.pushLight(I),I.castShadow&&v.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||Dt.intersectsSprite(I)){st&&Ut.setFromMatrixPosition(I.matrixWorld).applyMatrix4(pt);const Ht=Gt.update(I),Zt=I.material;Zt.visible&&w.push(I,Ht,Zt,nt,Ut.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||Dt.intersectsObject(I))){const Ht=Gt.update(I),Zt=I.material;if(st&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),Ut.copy(I.boundingSphere.center)):(Ht.boundingSphere===null&&Ht.computeBoundingSphere(),Ut.copy(Ht.boundingSphere.center)),Ut.applyMatrix4(I.matrixWorld).applyMatrix4(pt)),Array.isArray(Zt)){const Xt=Ht.groups;for(let Jt=0,Kt=Xt.length;Jt<Kt;Jt++){const Qt=Xt[Jt],Ce=Zt[Qt.materialIndex];Ce&&Ce.visible&&w.push(I,Ht,Ce,nt,Ut.z,Qt)}}else Zt.visible&&w.push(I,Ht,Zt,nt,Ut.z,null)}}const At=I.children;for(let Ht=0,Zt=At.length;Ht<Zt;Ht++)_n(At[Ht],Y,nt,st)}function ti(I,Y,nt,st){const tt=I.opaque,At=I.transmissive,Ht=I.transparent;v.setupLightsView(nt),K===!0&&Pt.setGlobalState(b.clippingPlanes,nt),At.length>0&&Ii(tt,At,Y,nt),st&&vt.viewport(E.copy(st)),tt.length>0&&Ze(tt,Y,nt),At.length>0&&Ze(At,Y,nt),Ht.length>0&&Ze(Ht,Y,nt),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function Ii(I,Y,nt,st){if((nt.isScene===!0?nt.overrideMaterial:null)!==null)return;if(v.state.transmissionRenderTarget===null){v.state.transmissionRenderTarget=new xs(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?Ma:qi,minFilter:_s,samples:4,stencilBuffer:a});const Jt=O.get(v.state.transmissionRenderTarget);Jt.__isTransmissionRenderTarget=!0}const At=v.state.transmissionRenderTarget;b.getDrawingBufferSize(yt),At.setSize(yt.x,yt.y);const Ht=b.getRenderTarget();b.setRenderTarget(At),b.getClearColor(k),W=b.getClearAlpha(),W<1&&b.setClearColor(16777215,.5),b.clear();const Zt=b.toneMapping;b.toneMapping=Xi,Ze(I,nt,st),T.updateMultisampleRenderTarget(At),T.updateRenderTargetMipmap(At);let Xt=!1;for(let Jt=0,Kt=Y.length;Jt<Kt;Jt++){const Qt=Y[Jt],Ce=Qt.object,un=Qt.geometry,Ne=Qt.material,hn=Qt.group;if(Ne.side===Bn&&Ce.layers.test(st.layers)){const be=Ne.side;Ne.side=En,Ne.needsUpdate=!0,zt(Ce,nt,st,un,Ne,hn),Ne.side=be,Ne.needsUpdate=!0,Xt=!0}}Xt===!0&&(T.updateMultisampleRenderTarget(At),T.updateRenderTargetMipmap(At)),b.setRenderTarget(Ht),b.setClearColor(k,W),b.toneMapping=Zt}function Ze(I,Y,nt){const st=Y.isScene===!0?Y.overrideMaterial:null;for(let tt=0,At=I.length;tt<At;tt++){const Ht=I[tt],Zt=Ht.object,Xt=Ht.geometry,Jt=st===null?Ht.material:st,Kt=Ht.group;Zt.layers.test(nt.layers)&&zt(Zt,Y,nt,Xt,Jt,Kt)}}function zt(I,Y,nt,st,tt,At){I.onBeforeRender(b,Y,nt,st,tt,At),I.modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),tt.onBeforeRender(b,Y,nt,st,I,At),tt.transparent===!0&&tt.side===Bn&&tt.forceSinglePass===!1?(tt.side=En,tt.needsUpdate=!0,b.renderBufferDirect(nt,Y,st,tt,I,At),tt.side=ji,tt.needsUpdate=!0,b.renderBufferDirect(nt,Y,st,tt,I,At),tt.side=Bn):b.renderBufferDirect(nt,Y,st,tt,I,At),I.onAfterRender(b,Y,nt,st,tt,At)}function Qi(I,Y,nt){Y.isScene!==!0&&(Y=Lt);const st=O.get(I),tt=v.state.lights,At=v.state.shadowsArray,Ht=tt.state.version,Zt=_t.getParameters(I,tt.state,At,Y,nt),Xt=_t.getProgramCacheKey(Zt);let Jt=st.programs;st.environment=I.isMeshStandardMaterial?Y.environment:null,st.fog=Y.fog,st.envMap=(I.isMeshStandardMaterial?at:$).get(I.envMap||st.environment),st.envMapRotation=st.environment!==null&&I.envMap===null?Y.environmentRotation:I.envMapRotation,Jt===void 0&&(I.addEventListener("dispose",Rt),Jt=new Map,st.programs=Jt);let Kt=Jt.get(Xt);if(Kt!==void 0){if(st.currentProgram===Kt&&st.lightsStateVersion===Ht)return Cr(I,Zt),Kt}else Zt.uniforms=_t.getUniforms(I),I.onBuild(nt,Zt,b),I.onBeforeCompile(Zt,b),Kt=_t.acquireProgram(Zt,Xt),Jt.set(Xt,Kt),st.uniforms=Zt.uniforms;const Qt=st.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Qt.clippingPlanes=Pt.uniform),Cr(I,Zt),st.needsLights=So(I),st.lightsStateVersion=Ht,st.needsLights&&(Qt.ambientLightColor.value=tt.state.ambient,Qt.lightProbe.value=tt.state.probe,Qt.directionalLights.value=tt.state.directional,Qt.directionalLightShadows.value=tt.state.directionalShadow,Qt.spotLights.value=tt.state.spot,Qt.spotLightShadows.value=tt.state.spotShadow,Qt.rectAreaLights.value=tt.state.rectArea,Qt.ltc_1.value=tt.state.rectAreaLTC1,Qt.ltc_2.value=tt.state.rectAreaLTC2,Qt.pointLights.value=tt.state.point,Qt.pointLightShadows.value=tt.state.pointShadow,Qt.hemisphereLights.value=tt.state.hemi,Qt.directionalShadowMap.value=tt.state.directionalShadowMap,Qt.directionalShadowMatrix.value=tt.state.directionalShadowMatrix,Qt.spotShadowMap.value=tt.state.spotShadowMap,Qt.spotLightMatrix.value=tt.state.spotLightMatrix,Qt.spotLightMap.value=tt.state.spotLightMap,Qt.pointShadowMap.value=tt.state.pointShadowMap,Qt.pointShadowMatrix.value=tt.state.pointShadowMatrix),st.currentProgram=Kt,st.uniformsList=null,Kt}function Pr(I){if(I.uniformsList===null){const Y=I.currentProgram.getUniforms();I.uniformsList=_a.seqWithValue(Y.seq,I.uniforms)}return I.uniformsList}function Cr(I,Y){const nt=O.get(I);nt.outputColorSpace=Y.outputColorSpace,nt.batching=Y.batching,nt.instancing=Y.instancing,nt.instancingColor=Y.instancingColor,nt.instancingMorph=Y.instancingMorph,nt.skinning=Y.skinning,nt.morphTargets=Y.morphTargets,nt.morphNormals=Y.morphNormals,nt.morphColors=Y.morphColors,nt.morphTargetsCount=Y.morphTargetsCount,nt.numClippingPlanes=Y.numClippingPlanes,nt.numIntersection=Y.numClipIntersection,nt.vertexAlphas=Y.vertexAlphas,nt.vertexTangents=Y.vertexTangents,nt.toneMapping=Y.toneMapping}function bo(I,Y,nt,st,tt){Y.isScene!==!0&&(Y=Lt),T.resetTextureUnits();const At=Y.fog,Ht=st.isMeshStandardMaterial?Y.environment:null,Zt=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ji,Xt=(st.isMeshStandardMaterial?at:$).get(st.envMap||Ht),Jt=st.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,Kt=!!nt.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),Qt=!!nt.morphAttributes.position,Ce=!!nt.morphAttributes.normal,un=!!nt.morphAttributes.color;let Ne=Xi;st.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ne=b.toneMapping);const hn=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,be=hn!==void 0?hn.length:0,te=O.get(st),fi=v.state.lights;if(K===!0&&(ct===!0||I!==P)){const rn=I===P&&st.id===U;Pt.setState(st,I,rn)}let Vt=!1;st.version===te.__version?(te.needsLights&&te.lightsStateVersion!==fi.state.version||te.outputColorSpace!==Zt||tt.isBatchedMesh&&te.batching===!1||!tt.isBatchedMesh&&te.batching===!0||tt.isInstancedMesh&&te.instancing===!1||!tt.isInstancedMesh&&te.instancing===!0||tt.isSkinnedMesh&&te.skinning===!1||!tt.isSkinnedMesh&&te.skinning===!0||tt.isInstancedMesh&&te.instancingColor===!0&&tt.instanceColor===null||tt.isInstancedMesh&&te.instancingColor===!1&&tt.instanceColor!==null||tt.isInstancedMesh&&te.instancingMorph===!0&&tt.morphTexture===null||tt.isInstancedMesh&&te.instancingMorph===!1&&tt.morphTexture!==null||te.envMap!==Xt||st.fog===!0&&te.fog!==At||te.numClippingPlanes!==void 0&&(te.numClippingPlanes!==Pt.numPlanes||te.numIntersection!==Pt.numIntersection)||te.vertexAlphas!==Jt||te.vertexTangents!==Kt||te.morphTargets!==Qt||te.morphNormals!==Ce||te.morphColors!==un||te.toneMapping!==Ne||te.morphTargetsCount!==be)&&(Vt=!0):(Vt=!0,te.__version=st.version);let ge=te.currentProgram;Vt===!0&&(ge=Qi(st,Y,tt));let ts=!1,Rn=!1,ei=!1;const Be=ge.getUniforms(),$t=te.uniforms;if(vt.useProgram(ge.program)&&(ts=!0,Rn=!0,ei=!0),st.id!==U&&(U=st.id,Rn=!0),ts||P!==I){Be.setValue(G,"projectionMatrix",I.projectionMatrix),Be.setValue(G,"viewMatrix",I.matrixWorldInverse);const rn=Be.map.cameraPosition;rn!==void 0&&rn.setValue(G,Ut.setFromMatrixPosition(I.matrixWorld)),ft.logarithmicDepthBuffer&&Be.setValue(G,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&Be.setValue(G,"isOrthographic",I.isOrthographicCamera===!0),P!==I&&(P=I,Rn=!0,ei=!0)}if(tt.isSkinnedMesh){Be.setOptional(G,tt,"bindMatrix"),Be.setOptional(G,tt,"bindMatrixInverse");const rn=tt.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),Be.setValue(G,"boneTexture",rn.boneTexture,T))}tt.isBatchedMesh&&(Be.setOptional(G,tt,"batchingTexture"),Be.setValue(G,"batchingTexture",tt._matricesTexture,T));const we=nt.morphAttributes;if((we.position!==void 0||we.normal!==void 0||we.color!==void 0)&&Ot.update(tt,nt,ge),(Rn||te.receiveShadow!==tt.receiveShadow)&&(te.receiveShadow=tt.receiveShadow,Be.setValue(G,"receiveShadow",tt.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&($t.envMap.value=Xt,$t.flipEnvMap.value=Xt.isCubeTexture&&Xt.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&Y.environment!==null&&($t.envMapIntensity.value=Y.environmentIntensity),Rn&&(Be.setValue(G,"toneMappingExposure",b.toneMappingExposure),te.needsLights&&Rr($t,ei),At&&st.fog===!0&&Ft.refreshFogUniforms($t,At),Ft.refreshMaterialUniforms($t,st,ht,J,v.state.transmissionRenderTarget),_a.upload(G,Pr(te),$t,T)),st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(_a.upload(G,Pr(te),$t,T),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&Be.setValue(G,"center",tt.center),Be.setValue(G,"modelViewMatrix",tt.modelViewMatrix),Be.setValue(G,"normalMatrix",tt.normalMatrix),Be.setValue(G,"modelMatrix",tt.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){const rn=st.uniformsGroups;for(let Di=0,vn=rn.length;Di<vn;Di++){const wo=rn[Di];me.update(wo,ge),me.bind(wo,ge)}}return ge}function Rr(I,Y){I.ambientLightColor.needsUpdate=Y,I.lightProbe.needsUpdate=Y,I.directionalLights.needsUpdate=Y,I.directionalLightShadows.needsUpdate=Y,I.pointLights.needsUpdate=Y,I.pointLightShadows.needsUpdate=Y,I.spotLights.needsUpdate=Y,I.spotLightShadows.needsUpdate=Y,I.rectAreaLights.needsUpdate=Y,I.hemisphereLights.needsUpdate=Y}function So(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(I,Y,nt){O.get(I.texture).__webglTexture=Y,O.get(I.depthTexture).__webglTexture=nt;const st=O.get(I);st.__hasExternalTextures=!0,st.__autoAllocateDepthBuffer=nt===void 0,st.__autoAllocateDepthBuffer||ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),st.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,Y){const nt=O.get(I);nt.__webglFramebuffer=Y,nt.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(I,Y=0,nt=0){R=I,B=Y,N=nt;let st=!0,tt=null,At=!1,Ht=!1;if(I){const Xt=O.get(I);Xt.__useDefaultFramebuffer!==void 0?(vt.bindFramebuffer(G.FRAMEBUFFER,null),st=!1):Xt.__webglFramebuffer===void 0?T.setupRenderTarget(I):Xt.__hasExternalTextures&&T.rebindTextures(I,O.get(I.texture).__webglTexture,O.get(I.depthTexture).__webglTexture);const Jt=I.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(Ht=!0);const Kt=O.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Kt[Y])?tt=Kt[Y][nt]:tt=Kt[Y],At=!0):I.samples>0&&T.useMultisampledRTT(I)===!1?tt=O.get(I).__webglMultisampledFramebuffer:Array.isArray(Kt)?tt=Kt[nt]:tt=Kt,E.copy(I.viewport),z.copy(I.scissor),q=I.scissorTest}else E.copy(Z).multiplyScalar(ht).floor(),z.copy(dt).multiplyScalar(ht).floor(),q=bt;if(vt.bindFramebuffer(G.FRAMEBUFFER,tt)&&st&&vt.drawBuffers(I,tt),vt.viewport(E),vt.scissor(z),vt.setScissorTest(q),At){const Xt=O.get(I.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Xt.__webglTexture,nt)}else if(Ht){const Xt=O.get(I.texture),Jt=Y||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Xt.__webglTexture,nt||0,Jt)}U=-1},this.readRenderTargetPixels=function(I,Y,nt,st,tt,At,Ht){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Zt=O.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Ht!==void 0&&(Zt=Zt[Ht]),Zt){vt.bindFramebuffer(G.FRAMEBUFFER,Zt);try{const Xt=I.texture,Jt=Xt.format,Kt=Xt.type;if(Jt!==ci&&fe.convert(Jt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Qt=Kt===Ma&&(ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float"));if(Kt!==qi&&fe.convert(Kt)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&Kt!==Ai&&!Qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=I.width-st&&nt>=0&&nt<=I.height-tt&&G.readPixels(Y,nt,st,tt,fe.convert(Jt),fe.convert(Kt),At)}finally{const Xt=R!==null?O.get(R).__webglFramebuffer:null;vt.bindFramebuffer(G.FRAMEBUFFER,Xt)}}},this.copyFramebufferToTexture=function(I,Y,nt=0){const st=Math.pow(2,-nt),tt=Math.floor(Y.image.width*st),At=Math.floor(Y.image.height*st);T.setTexture2D(Y,0),G.copyTexSubImage2D(G.TEXTURE_2D,nt,0,0,I.x,I.y,tt,At),vt.unbindTexture()},this.copyTextureToTexture=function(I,Y,nt,st=0){const tt=Y.image.width,At=Y.image.height,Ht=fe.convert(nt.format),Zt=fe.convert(nt.type);T.setTexture2D(nt,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,nt.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,nt.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,nt.unpackAlignment),Y.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,st,I.x,I.y,tt,At,Ht,Zt,Y.image.data):Y.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,st,I.x,I.y,Y.mipmaps[0].width,Y.mipmaps[0].height,Ht,Y.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,st,I.x,I.y,Ht,Zt,Y.image),st===0&&nt.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),vt.unbindTexture()},this.copyTextureToTexture3D=function(I,Y,nt,st,tt=0){const At=Math.round(I.max.x-I.min.x),Ht=Math.round(I.max.y-I.min.y),Zt=I.max.z-I.min.z+1,Xt=fe.convert(st.format),Jt=fe.convert(st.type);let Kt;if(st.isData3DTexture)T.setTexture3D(st,0),Kt=G.TEXTURE_3D;else if(st.isDataArrayTexture||st.isCompressedArrayTexture)T.setTexture2DArray(st,0),Kt=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,st.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,st.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,st.unpackAlignment);const Qt=G.getParameter(G.UNPACK_ROW_LENGTH),Ce=G.getParameter(G.UNPACK_IMAGE_HEIGHT),un=G.getParameter(G.UNPACK_SKIP_PIXELS),Ne=G.getParameter(G.UNPACK_SKIP_ROWS),hn=G.getParameter(G.UNPACK_SKIP_IMAGES),be=nt.isCompressedTexture?nt.mipmaps[tt]:nt.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,be.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,be.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,I.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,I.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,I.min.z),nt.isDataTexture||nt.isData3DTexture?G.texSubImage3D(Kt,tt,Y.x,Y.y,Y.z,At,Ht,Zt,Xt,Jt,be.data):st.isCompressedArrayTexture?G.compressedTexSubImage3D(Kt,tt,Y.x,Y.y,Y.z,At,Ht,Zt,Xt,be.data):G.texSubImage3D(Kt,tt,Y.x,Y.y,Y.z,At,Ht,Zt,Xt,Jt,be),G.pixelStorei(G.UNPACK_ROW_LENGTH,Qt),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Ce),G.pixelStorei(G.UNPACK_SKIP_PIXELS,un),G.pixelStorei(G.UNPACK_SKIP_ROWS,Ne),G.pixelStorei(G.UNPACK_SKIP_IMAGES,hn),tt===0&&st.generateMipmaps&&G.generateMipmap(Kt),vt.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?T.setTextureCube(I,0):I.isData3DTexture?T.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?T.setTexture2DArray(I,0):T.setTexture2D(I,0),vt.unbindTexture()},this.resetState=function(){B=0,N=0,R=null,vt.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ic?"display-p3":"srgb",e.unpackColorSpace=ye.workingColorSpace===Fa?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Vx extends Je{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Gx extends ln{constructor(t=null,e=1,n=1,r,a,l,u,h,d=wn,p=wn,m,g){super(null,l,u,h,d,p,r,a,m,g),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pd extends jn{constructor(t,e,n,r=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const tr=new xe,md=new xe,la=[],gd=new Ts,Wx=new xe,Yr=new Ve,jr=new Er;class Zx extends Ve{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Wx)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ts),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,tr),gd.copy(t.boundingBox).applyMatrix4(tr),this.boundingBox.union(gd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Er),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,tr),jr.copy(t.boundingSphere).applyMatrix4(tr),this.boundingSphere.union(jr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,r=this.morphTexture.source.data.data,a=n.length+1,l=t*a+1;for(let u=0;u<n.length;u++)n[u]=r[l+u]}raycast(t,e){const n=this.matrixWorld,r=this.count;if(Yr.geometry=this.geometry,Yr.material=this.material,Yr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jr.copy(this.boundingSphere),jr.applyMatrix4(n),t.ray.intersectsSphere(jr)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,tr),md.multiplyMatrices(n,tr),Yr.matrixWorld=md,Yr.raycast(t,la);for(let l=0,u=la.length;l<u;l++){const h=la[l];h.instanceId=a,h.object=this,e.push(h)}la.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new pd(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Gx(new Float32Array(r*this.count),r,this.count,lf,Ai));const a=this.morphTexture.source.data.data;let l=0;for(let d=0;d<n.length;d++)l+=n[d];const u=this.geometry.morphTargetsRelative?1:1-l,h=r*t;a[h]=u,a.set(n,h+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Va extends Tr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ne(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _d=new V,vd=new V,yd=new xe,Kl=new za,ca=new Er;class Uc extends Je{constructor(t=new gn,e=new Va){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let r=1,a=e.count;r<a;r++)_d.fromBufferAttribute(e,r-1),vd.fromBufferAttribute(e,r),n[r]=n[r-1],n[r]+=_d.distanceTo(vd);t.setAttribute("lineDistance",new nn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,r=this.matrixWorld,a=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ca.copy(n.boundingSphere),ca.applyMatrix4(r),ca.radius+=a,t.ray.intersectsSphere(ca)===!1)return;yd.copy(r).invert(),Kl.copy(t.ray).applyMatrix4(yd);const u=a/((this.scale.x+this.scale.y+this.scale.z)/3),h=u*u,d=new V,p=new V,m=new V,g=new V,_=this.isLineSegments?2:1,M=n.index,v=n.attributes.position;if(M!==null){const y=Math.max(0,l.start),D=Math.min(M.count,l.start+l.count);for(let b=y,C=D-1;b<C;b+=_){const B=M.getX(b),N=M.getX(b+1);if(d.fromBufferAttribute(v,B),p.fromBufferAttribute(v,N),Kl.distanceSqToSegment(d,p,g,m)>h)continue;g.applyMatrix4(this.matrixWorld);const U=t.ray.origin.distanceTo(g);U<t.near||U>t.far||e.push({distance:U,point:m.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}else{const y=Math.max(0,l.start),D=Math.min(v.count,l.start+l.count);for(let b=y,C=D-1;b<C;b+=_){if(d.fromBufferAttribute(v,b),p.fromBufferAttribute(v,b+1),Kl.distanceSqToSegment(d,p,g,m)>h)continue;g.applyMatrix4(this.matrixWorld);const N=t.ray.origin.distanceTo(g);N<t.near||N>t.far||e.push({distance:N,point:m.clone().applyMatrix4(this.matrixWorld),index:b,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const r=e[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,l=r.length;a<l;a++){const u=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[u]=a}}}}}const xd=new V,Md=new V;class Xx extends Uc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let r=0,a=e.count;r<a;r+=2)xd.fromBufferAttribute(e,r),Md.fromBufferAttribute(e,r+1),n[r]=r===0?0:n[r-1],n[r+1]=n[r]+xd.distanceTo(Md);t.setAttribute("lineDistance",new nn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Df extends ln{constructor(t,e,n,r,a,l,u,h,d){super(t,e,n,r,a,l,u,h,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class di{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,r=this.getPoint(0),a=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),a+=n.distanceTo(r),e.push(a),r=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let r=0;const a=n.length;let l;e?l=e:l=t*n[a-1];let u=0,h=a-1,d;for(;u<=h;)if(r=Math.floor(u+(h-u)/2),d=n[r]-l,d<0)u=r+1;else if(d>0)h=r-1;else{h=r;break}if(r=h,n[r]===l)return r/(a-1);const p=n[r],g=n[r+1]-p,_=(l-p)/g;return(r+_)/(a-1)}getTangent(t,e){let r=t-1e-4,a=t+1e-4;r<0&&(r=0),a>1&&(a=1);const l=this.getPoint(r),u=this.getPoint(a),h=e||(l.isVector2?new Mt:new V);return h.copy(u).sub(l).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new V,r=[],a=[],l=[],u=new V,h=new xe;for(let _=0;_<=t;_++){const M=_/t;r[_]=this.getTangentAt(M,new V)}a[0]=new V,l[0]=new V;let d=Number.MAX_VALUE;const p=Math.abs(r[0].x),m=Math.abs(r[0].y),g=Math.abs(r[0].z);p<=d&&(d=p,n.set(1,0,0)),m<=d&&(d=m,n.set(0,1,0)),g<=d&&n.set(0,0,1),u.crossVectors(r[0],n).normalize(),a[0].crossVectors(r[0],u),l[0].crossVectors(r[0],a[0]);for(let _=1;_<=t;_++){if(a[_]=a[_-1].clone(),l[_]=l[_-1].clone(),u.crossVectors(r[_-1],r[_]),u.length()>Number.EPSILON){u.normalize();const M=Math.acos(en(r[_-1].dot(r[_]),-1,1));a[_].applyMatrix4(h.makeRotationAxis(u,M))}l[_].crossVectors(r[_],a[_])}if(e===!0){let _=Math.acos(en(a[0].dot(a[t]),-1,1));_/=t,r[0].dot(u.crossVectors(a[0],a[t]))>0&&(_=-_);for(let M=1;M<=t;M++)a[M].applyMatrix4(h.makeRotationAxis(r[M],_*M)),l[M].crossVectors(r[M],a[M])}return{tangents:r,normals:a,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class kc extends di{constructor(t=0,e=0,n=1,r=1,a=0,l=Math.PI*2,u=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=r,this.aStartAngle=a,this.aEndAngle=l,this.aClockwise=u,this.aRotation=h}getPoint(t,e=new Mt){const n=e,r=Math.PI*2;let a=this.aEndAngle-this.aStartAngle;const l=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=r;for(;a>r;)a-=r;a<Number.EPSILON&&(l?a=0:a=r),this.aClockwise===!0&&!l&&(a===r?a=-r:a=a-r);const u=this.aStartAngle+t*a;let h=this.aX+this.xRadius*Math.cos(u),d=this.aY+this.yRadius*Math.sin(u);if(this.aRotation!==0){const p=Math.cos(this.aRotation),m=Math.sin(this.aRotation),g=h-this.aX,_=d-this.aY;h=g*p-_*m+this.aX,d=g*m+_*p+this.aY}return n.set(h,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class qx extends kc{constructor(t,e,n,r,a,l){super(t,e,n,n,r,a,l),this.isArcCurve=!0,this.type="ArcCurve"}}function Bc(){let s=0,t=0,e=0,n=0;function r(a,l,u,h){s=a,t=u,e=-3*a+3*l-2*u-h,n=2*a-2*l+u+h}return{initCatmullRom:function(a,l,u,h,d){r(l,u,d*(u-a),d*(h-l))},initNonuniformCatmullRom:function(a,l,u,h,d,p,m){let g=(l-a)/d-(u-a)/(d+p)+(u-l)/p,_=(u-l)/p-(h-l)/(p+m)+(h-u)/m;g*=p,_*=p,r(l,u,g,_)},calc:function(a){const l=a*a,u=l*a;return s+t*a+e*l+n*u}}}const ua=new V,Jl=new Bc,Ql=new Bc,tc=new Bc;class _c extends di{constructor(t=[],e=!1,n="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=r}getPoint(t,e=new V){const n=e,r=this.points,a=r.length,l=(a-(this.closed?0:1))*t;let u=Math.floor(l),h=l-u;this.closed?u+=u>0?0:(Math.floor(Math.abs(u)/a)+1)*a:h===0&&u===a-1&&(u=a-2,h=1);let d,p;this.closed||u>0?d=r[(u-1)%a]:(ua.subVectors(r[0],r[1]).add(r[0]),d=ua);const m=r[u%a],g=r[(u+1)%a];if(this.closed||u+2<a?p=r[(u+2)%a]:(ua.subVectors(r[a-1],r[a-2]).add(r[a-1]),p=ua),this.curveType==="centripetal"||this.curveType==="chordal"){const _=this.curveType==="chordal"?.5:.25;let M=Math.pow(d.distanceToSquared(m),_),w=Math.pow(m.distanceToSquared(g),_),v=Math.pow(g.distanceToSquared(p),_);w<1e-4&&(w=1),M<1e-4&&(M=w),v<1e-4&&(v=w),Jl.initNonuniformCatmullRom(d.x,m.x,g.x,p.x,M,w,v),Ql.initNonuniformCatmullRom(d.y,m.y,g.y,p.y,M,w,v),tc.initNonuniformCatmullRom(d.z,m.z,g.z,p.z,M,w,v)}else this.curveType==="catmullrom"&&(Jl.initCatmullRom(d.x,m.x,g.x,p.x,this.tension),Ql.initCatmullRom(d.y,m.y,g.y,p.y,this.tension),tc.initCatmullRom(d.z,m.z,g.z,p.z,this.tension));return n.set(Jl.calc(h),Ql.calc(h),tc.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new V().fromArray(r))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function bd(s,t,e,n,r){const a=(n-t)*.5,l=(r-e)*.5,u=s*s,h=s*u;return(2*e-2*n+a+l)*h+(-3*e+3*n-2*a-l)*u+a*s+e}function $x(s,t){const e=1-s;return e*e*t}function Yx(s,t){return 2*(1-s)*s*t}function jx(s,t){return s*s*t}function io(s,t,e,n){return $x(s,t)+Yx(s,e)+jx(s,n)}function Kx(s,t){const e=1-s;return e*e*e*t}function Jx(s,t){const e=1-s;return 3*e*e*s*t}function Qx(s,t){return 3*(1-s)*s*s*t}function tM(s,t){return s*s*s*t}function so(s,t,e,n,r){return Kx(s,t)+Jx(s,e)+Qx(s,n)+tM(s,r)}class Nf extends di{constructor(t=new Mt,e=new Mt,n=new Mt,r=new Mt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new Mt){const n=e,r=this.v0,a=this.v1,l=this.v2,u=this.v3;return n.set(so(t,r.x,a.x,l.x,u.x),so(t,r.y,a.y,l.y,u.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class eM extends di{constructor(t=new V,e=new V,n=new V,r=new V){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=r}getPoint(t,e=new V){const n=e,r=this.v0,a=this.v1,l=this.v2,u=this.v3;return n.set(so(t,r.x,a.x,l.x,u.x),so(t,r.y,a.y,l.y,u.y),so(t,r.z,a.z,l.z,u.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Of extends di{constructor(t=new Mt,e=new Mt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Mt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Mt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nM extends di{constructor(t=new V,e=new V){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new V){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new V){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Uf extends di{constructor(t=new Mt,e=new Mt,n=new Mt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Mt){const n=e,r=this.v0,a=this.v1,l=this.v2;return n.set(io(t,r.x,a.x,l.x),io(t,r.y,a.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class kf extends di{constructor(t=new V,e=new V,n=new V){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new V){const n=e,r=this.v0,a=this.v1,l=this.v2;return n.set(io(t,r.x,a.x,l.x),io(t,r.y,a.y,l.y),io(t,r.z,a.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bf extends di{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Mt){const n=e,r=this.points,a=(r.length-1)*t,l=Math.floor(a),u=a-l,h=r[l===0?l:l-1],d=r[l],p=r[l>r.length-2?r.length-1:l+1],m=r[l>r.length-3?r.length-1:l+2];return n.set(bd(u,h.x,d.x,p.x,m.x),bd(u,h.y,d.y,p.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const r=this.points[e];t.points.push(r.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const r=t.points[e];this.points.push(new Mt().fromArray(r))}return this}}var Aa=Object.freeze({__proto__:null,ArcCurve:qx,CatmullRomCurve3:_c,CubicBezierCurve:Nf,CubicBezierCurve3:eM,EllipseCurve:kc,LineCurve:Of,LineCurve3:nM,QuadraticBezierCurve:Uf,QuadraticBezierCurve3:kf,SplineCurve:Bf});class iM extends di{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Aa[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),r=this.getCurveLengths();let a=0;for(;a<r.length;){if(r[a]>=n){const l=r[a]-n,u=this.curves[a],h=u.getLength(),d=h===0?0:1-l/h;return u.getPointAt(d,e)}a++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,r=this.curves.length;n<r;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let r=0,a=this.curves;r<a.length;r++){const l=a[r],u=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,h=l.getPoints(u);for(let d=0;d<h.length;d++){const p=h[d];n&&n.equals(p)||(e.push(p),n=p)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(r.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const r=this.curves[e];t.curves.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const r=t.curves[e];this.curves.push(new Aa[r.type]().fromJSON(r))}return this}}class Sd extends iM{constructor(t){super(),this.type="Path",this.currentPoint=new Mt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Of(this.currentPoint.clone(),new Mt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,r){const a=new Uf(this.currentPoint.clone(),new Mt(t,e),new Mt(n,r));return this.curves.push(a),this.currentPoint.set(n,r),this}bezierCurveTo(t,e,n,r,a,l){const u=new Nf(this.currentPoint.clone(),new Mt(t,e),new Mt(n,r),new Mt(a,l));return this.curves.push(u),this.currentPoint.set(a,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Bf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,r,a,l){const u=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+u,e+h,n,r,a,l),this}absarc(t,e,n,r,a,l){return this.absellipse(t,e,n,n,r,a,l),this}ellipse(t,e,n,r,a,l,u,h){const d=this.currentPoint.x,p=this.currentPoint.y;return this.absellipse(t+d,e+p,n,r,a,l,u,h),this}absellipse(t,e,n,r,a,l,u,h){const d=new kc(t,e,n,r,a,l,u,h);if(this.curves.length>0){const m=d.getPoint(0);m.equals(this.currentPoint)||this.lineTo(m.x,m.y)}this.curves.push(d);const p=d.getPoint(1);return this.currentPoint.copy(p),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}const ha=new V,da=new V,ec=new V,fa=new $n;class sM extends gn{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const r=Math.pow(10,4),a=Math.cos(no*e),l=t.getIndex(),u=t.getAttribute("position"),h=l?l.count:u.count,d=[0,0,0],p=["a","b","c"],m=new Array(3),g={},_=[];for(let M=0;M<h;M+=3){l?(d[0]=l.getX(M),d[1]=l.getX(M+1),d[2]=l.getX(M+2)):(d[0]=M,d[1]=M+1,d[2]=M+2);const{a:w,b:v,c:y}=fa;if(w.fromBufferAttribute(u,d[0]),v.fromBufferAttribute(u,d[1]),y.fromBufferAttribute(u,d[2]),fa.getNormal(ec),m[0]=`${Math.round(w.x*r)},${Math.round(w.y*r)},${Math.round(w.z*r)}`,m[1]=`${Math.round(v.x*r)},${Math.round(v.y*r)},${Math.round(v.z*r)}`,m[2]=`${Math.round(y.x*r)},${Math.round(y.y*r)},${Math.round(y.z*r)}`,!(m[0]===m[1]||m[1]===m[2]||m[2]===m[0]))for(let D=0;D<3;D++){const b=(D+1)%3,C=m[D],B=m[b],N=fa[p[D]],R=fa[p[b]],U=`${C}_${B}`,P=`${B}_${C}`;P in g&&g[P]?(ec.dot(g[P].normal)<=a&&(_.push(N.x,N.y,N.z),_.push(R.x,R.y,R.z)),g[P]=null):U in g||(g[U]={index0:d[D],index1:d[b],normal:ec.clone()})}}for(const M in g)if(g[M]){const{index0:w,index1:v}=g[M];ha.fromBufferAttribute(u,w),da.fromBufferAttribute(u,v),_.push(ha.x,ha.y,ha.z),_.push(da.x,da.y,da.z)}this.setAttribute("position",new nn(_,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ga extends Sd{constructor(t){super(t),this.uuid=wr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,r=this.holes.length;n<r;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(r.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const r=this.holes[e];t.holes.push(r.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const r=t.holes[e];this.holes.push(new Sd().fromJSON(r))}return this}}const rM={triangulate:function(s,t,e=2){const n=t&&t.length,r=n?t[0]*e:s.length;let a=Ff(s,0,r,e,!0);const l=[];if(!a||a.next===a.prev)return l;let u,h,d,p,m,g,_;if(n&&(a=uM(s,t,a,e)),s.length>80*e){u=d=s[0],h=p=s[1];for(let M=e;M<r;M+=e)m=s[M],g=s[M+1],m<u&&(u=m),g<h&&(h=g),m>d&&(d=m),g>p&&(p=g);_=Math.max(d-u,p-h),_=_!==0?32767/_:0}return lo(a,l,e,u,h,_,0),l}};function Ff(s,t,e,n,r){let a,l;if(r===MM(s,t,e,n)>0)for(a=t;a<e;a+=n)l=wd(a,s[a],s[a+1],l);else for(a=e-n;a>=t;a-=n)l=wd(a,s[a],s[a+1],l);return l&&Wa(l,l.next)&&(uo(l),l=l.next),l}function bs(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Wa(e,e.next)||Ie(e.prev,e,e.next)===0)){if(uo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function lo(s,t,e,n,r,a,l){if(!s)return;!l&&a&&mM(s,n,r,a);let u=s,h,d;for(;s.prev!==s.next;){if(h=s.prev,d=s.next,a?aM(s,n,r,a):oM(s)){t.push(h.i/e|0),t.push(s.i/e|0),t.push(d.i/e|0),uo(s),s=d.next,u=d.next;continue}if(s=d,s===u){l?l===1?(s=lM(bs(s),t,e),lo(s,t,e,n,r,a,2)):l===2&&cM(s,t,e,n,r,a):lo(bs(s),t,e,n,r,a,1);break}}}function oM(s){const t=s.prev,e=s,n=s.next;if(Ie(t,e,n)>=0)return!1;const r=t.x,a=e.x,l=n.x,u=t.y,h=e.y,d=n.y,p=r<a?r<l?r:l:a<l?a:l,m=u<h?u<d?u:d:h<d?h:d,g=r>a?r>l?r:l:a>l?a:l,_=u>h?u>d?u:d:h>d?h:d;let M=n.next;for(;M!==t;){if(M.x>=p&&M.x<=g&&M.y>=m&&M.y<=_&&ar(r,u,a,h,l,d,M.x,M.y)&&Ie(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function aM(s,t,e,n){const r=s.prev,a=s,l=s.next;if(Ie(r,a,l)>=0)return!1;const u=r.x,h=a.x,d=l.x,p=r.y,m=a.y,g=l.y,_=u<h?u<d?u:d:h<d?h:d,M=p<m?p<g?p:g:m<g?m:g,w=u>h?u>d?u:d:h>d?h:d,v=p>m?p>g?p:g:m>g?m:g,y=vc(_,M,t,e,n),D=vc(w,v,t,e,n);let b=s.prevZ,C=s.nextZ;for(;b&&b.z>=y&&C&&C.z<=D;){if(b.x>=_&&b.x<=w&&b.y>=M&&b.y<=v&&b!==r&&b!==l&&ar(u,p,h,m,d,g,b.x,b.y)&&Ie(b.prev,b,b.next)>=0||(b=b.prevZ,C.x>=_&&C.x<=w&&C.y>=M&&C.y<=v&&C!==r&&C!==l&&ar(u,p,h,m,d,g,C.x,C.y)&&Ie(C.prev,C,C.next)>=0))return!1;C=C.nextZ}for(;b&&b.z>=y;){if(b.x>=_&&b.x<=w&&b.y>=M&&b.y<=v&&b!==r&&b!==l&&ar(u,p,h,m,d,g,b.x,b.y)&&Ie(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;C&&C.z<=D;){if(C.x>=_&&C.x<=w&&C.y>=M&&C.y<=v&&C!==r&&C!==l&&ar(u,p,h,m,d,g,C.x,C.y)&&Ie(C.prev,C,C.next)>=0)return!1;C=C.nextZ}return!0}function lM(s,t,e){let n=s;do{const r=n.prev,a=n.next.next;!Wa(r,a)&&zf(r,n,n.next,a)&&co(r,a)&&co(a,r)&&(t.push(r.i/e|0),t.push(n.i/e|0),t.push(a.i/e|0),uo(n),uo(n.next),n=s=a),n=n.next}while(n!==s);return bs(n)}function cM(s,t,e,n,r,a){let l=s;do{let u=l.next.next;for(;u!==l.prev;){if(l.i!==u.i&&vM(l,u)){let h=Hf(l,u);l=bs(l,l.next),h=bs(h,h.next),lo(l,t,e,n,r,a,0),lo(h,t,e,n,r,a,0);return}u=u.next}l=l.next}while(l!==s)}function uM(s,t,e,n){const r=[];let a,l,u,h,d;for(a=0,l=t.length;a<l;a++)u=t[a]*n,h=a<l-1?t[a+1]*n:s.length,d=Ff(s,u,h,n,!1),d===d.next&&(d.steiner=!0),r.push(_M(d));for(r.sort(hM),a=0;a<r.length;a++)e=dM(r[a],e);return e}function hM(s,t){return s.x-t.x}function dM(s,t){const e=fM(s,t);if(!e)return t;const n=Hf(e,s);return bs(n,n.next),bs(e,e.next)}function fM(s,t){let e=t,n=-1/0,r;const a=s.x,l=s.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const g=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(g<=a&&g>n&&(n=g,r=e.x<e.next.x?e:e.next,g===a))return r}e=e.next}while(e!==t);if(!r)return null;const u=r,h=r.x,d=r.y;let p=1/0,m;e=r;do a>=e.x&&e.x>=h&&a!==e.x&&ar(l<d?a:n,l,h,d,l<d?n:a,l,e.x,e.y)&&(m=Math.abs(l-e.y)/(a-e.x),co(e,s)&&(m<p||m===p&&(e.x>r.x||e.x===r.x&&pM(r,e)))&&(r=e,p=m)),e=e.next;while(e!==u);return r}function pM(s,t){return Ie(s.prev,s,t.prev)<0&&Ie(t.next,s,s.next)<0}function mM(s,t,e,n){let r=s;do r.z===0&&(r.z=vc(r.x,r.y,t,e,n)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==s);r.prevZ.nextZ=null,r.prevZ=null,gM(r)}function gM(s){let t,e,n,r,a,l,u,h,d=1;do{for(e=s,s=null,a=null,l=0;e;){for(l++,n=e,u=0,t=0;t<d&&(u++,n=n.nextZ,!!n);t++);for(h=d;u>0||h>0&&n;)u!==0&&(h===0||!n||e.z<=n.z)?(r=e,e=e.nextZ,u--):(r=n,n=n.nextZ,h--),a?a.nextZ=r:s=r,r.prevZ=a,a=r;e=n}a.nextZ=null,d*=2}while(l>1);return s}function vc(s,t,e,n,r){return s=(s-e)*r|0,t=(t-n)*r|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function _M(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function ar(s,t,e,n,r,a,l,u){return(r-l)*(t-u)>=(s-l)*(a-u)&&(s-l)*(n-u)>=(e-l)*(t-u)&&(e-l)*(a-u)>=(r-l)*(n-u)}function vM(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!yM(s,t)&&(co(s,t)&&co(t,s)&&xM(s,t)&&(Ie(s.prev,s,t.prev)||Ie(s,t.prev,t))||Wa(s,t)&&Ie(s.prev,s,s.next)>0&&Ie(t.prev,t,t.next)>0)}function Ie(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Wa(s,t){return s.x===t.x&&s.y===t.y}function zf(s,t,e,n){const r=ma(Ie(s,t,e)),a=ma(Ie(s,t,n)),l=ma(Ie(e,n,s)),u=ma(Ie(e,n,t));return!!(r!==a&&l!==u||r===0&&pa(s,e,t)||a===0&&pa(s,n,t)||l===0&&pa(e,s,n)||u===0&&pa(e,t,n))}function pa(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function ma(s){return s>0?1:s<0?-1:0}function yM(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&zf(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function co(s,t){return Ie(s.prev,s,s.next)<0?Ie(s,t,s.next)>=0&&Ie(s,s.prev,t)>=0:Ie(s,t,s.prev)<0||Ie(s,s.next,t)<0}function xM(s,t){let e=s,n=!1;const r=(s.x+t.x)/2,a=(s.y+t.y)/2;do e.y>a!=e.next.y>a&&e.next.y!==e.y&&r<(e.next.x-e.x)*(a-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Hf(s,t){const e=new yc(s.i,s.x,s.y),n=new yc(t.i,t.x,t.y),r=s.next,a=t.prev;return s.next=t,t.prev=s,e.next=r,r.prev=e,n.next=e,e.prev=n,a.next=n,n.prev=a,n}function wd(s,t,e,n){const r=new yc(s,t,e);return n?(r.next=n.next,r.prev=n,n.next.prev=r,n.next=r):(r.prev=r,r.next=r),r}function uo(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function yc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function MM(s,t,e,n){let r=0;for(let a=t,l=e-n;a<e;a+=n)r+=(s[l]-s[a])*(s[a+1]+s[l+1]),l=a;return r}class ro{static area(t){const e=t.length;let n=0;for(let r=e-1,a=0;a<e;r=a++)n+=t[r].x*t[a].y-t[a].x*t[r].y;return n*.5}static isClockWise(t){return ro.area(t)<0}static triangulateShape(t,e){const n=[],r=[],a=[];Ed(t),Td(n,t);let l=t.length;e.forEach(Ed);for(let h=0;h<e.length;h++)r.push(l),l+=e[h].length,Td(n,e[h]);const u=rM.triangulate(n,r);for(let h=0;h<u.length;h+=3)a.push(u.slice(h,h+3));return a}}function Ed(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Td(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class vo extends gn{constructor(t=new Ga([new Mt(.5,.5),new Mt(-.5,.5),new Mt(-.5,-.5),new Mt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,r=[],a=[];for(let u=0,h=t.length;u<h;u++){const d=t[u];l(d)}this.setAttribute("position",new nn(r,3)),this.setAttribute("uv",new nn(a,2)),this.computeVertexNormals();function l(u){const h=[],d=e.curveSegments!==void 0?e.curveSegments:12,p=e.steps!==void 0?e.steps:1,m=e.depth!==void 0?e.depth:1;let g=e.bevelEnabled!==void 0?e.bevelEnabled:!0,_=e.bevelThickness!==void 0?e.bevelThickness:.2,M=e.bevelSize!==void 0?e.bevelSize:_-.1,w=e.bevelOffset!==void 0?e.bevelOffset:0,v=e.bevelSegments!==void 0?e.bevelSegments:3;const y=e.extrudePath,D=e.UVGenerator!==void 0?e.UVGenerator:bM;let b,C=!1,B,N,R,U;y&&(b=y.getSpacedPoints(p),C=!0,g=!1,B=y.computeFrenetFrames(p,!1),N=new V,R=new V,U=new V),g||(v=0,_=0,M=0,w=0);const P=u.extractPoints(d);let E=P.shape;const z=P.holes;if(!ro.isClockWise(E)){E=E.reverse();for(let it=0,ot=z.length;it<ot;it++){const ft=z[it];ro.isClockWise(ft)&&(z[it]=ft.reverse())}}const k=ro.triangulateShape(E,z),W=E;for(let it=0,ot=z.length;it<ot;it++){const ft=z[it];E=E.concat(ft)}function X(it,ot,ft){return ot||console.error("THREE.ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(ot,ft)}const J=E.length,ht=k.length;function F(it,ot,ft){let vt,xt,O;const T=it.x-ot.x,$=it.y-ot.y,at=ft.x-it.x,lt=ft.y-it.y,mt=T*T+$*$,Gt=T*lt-$*at;if(Math.abs(Gt)>Number.EPSILON){const _t=Math.sqrt(mt),Ft=Math.sqrt(at*at+lt*lt),Wt=ot.x-$/_t,St=ot.y+T/_t,Pt=ft.x-lt/Ft,qt=ft.y+at/Ft,Nt=((Pt-Wt)*lt-(qt-St)*at)/(T*lt-$*at);vt=Wt+T*Nt-it.x,xt=St+$*Nt-it.y;const Ot=vt*vt+xt*xt;if(Ot<=2)return new Mt(vt,xt);O=Math.sqrt(Ot/2)}else{let _t=!1;T>Number.EPSILON?at>Number.EPSILON&&(_t=!0):T<-Number.EPSILON?at<-Number.EPSILON&&(_t=!0):Math.sign($)===Math.sign(lt)&&(_t=!0),_t?(vt=-$,xt=T,O=Math.sqrt(mt)):(vt=T,xt=$,O=Math.sqrt(mt/2))}return new Mt(vt/O,xt/O)}const rt=[];for(let it=0,ot=W.length,ft=ot-1,vt=it+1;it<ot;it++,ft++,vt++)ft===ot&&(ft=0),vt===ot&&(vt=0),rt[it]=F(W[it],W[ft],W[vt]);const Z=[];let dt,bt=rt.concat();for(let it=0,ot=z.length;it<ot;it++){const ft=z[it];dt=[];for(let vt=0,xt=ft.length,O=xt-1,T=vt+1;vt<xt;vt++,O++,T++)O===xt&&(O=0),T===xt&&(T=0),dt[vt]=F(ft[vt],ft[O],ft[T]);Z.push(dt),bt=bt.concat(dt)}for(let it=0;it<v;it++){const ot=it/v,ft=_*Math.cos(ot*Math.PI/2),vt=M*Math.sin(ot*Math.PI/2)+w;for(let xt=0,O=W.length;xt<O;xt++){const T=X(W[xt],rt[xt],vt);yt(T.x,T.y,-ft)}for(let xt=0,O=z.length;xt<O;xt++){const T=z[xt];dt=Z[xt];for(let $=0,at=T.length;$<at;$++){const lt=X(T[$],dt[$],vt);yt(lt.x,lt.y,-ft)}}}const Dt=M+w;for(let it=0;it<J;it++){const ot=g?X(E[it],bt[it],Dt):E[it];C?(R.copy(B.normals[0]).multiplyScalar(ot.x),N.copy(B.binormals[0]).multiplyScalar(ot.y),U.copy(b[0]).add(R).add(N),yt(U.x,U.y,U.z)):yt(ot.x,ot.y,0)}for(let it=1;it<=p;it++)for(let ot=0;ot<J;ot++){const ft=g?X(E[ot],bt[ot],Dt):E[ot];C?(R.copy(B.normals[it]).multiplyScalar(ft.x),N.copy(B.binormals[it]).multiplyScalar(ft.y),U.copy(b[it]).add(R).add(N),yt(U.x,U.y,U.z)):yt(ft.x,ft.y,m/p*it)}for(let it=v-1;it>=0;it--){const ot=it/v,ft=_*Math.cos(ot*Math.PI/2),vt=M*Math.sin(ot*Math.PI/2)+w;for(let xt=0,O=W.length;xt<O;xt++){const T=X(W[xt],rt[xt],vt);yt(T.x,T.y,m+ft)}for(let xt=0,O=z.length;xt<O;xt++){const T=z[xt];dt=Z[xt];for(let $=0,at=T.length;$<at;$++){const lt=X(T[$],dt[$],vt);C?yt(lt.x,lt.y+b[p-1].y,b[p-1].x+ft):yt(lt.x,lt.y,m+ft)}}}K(),ct();function K(){const it=r.length/3;if(g){let ot=0,ft=J*ot;for(let vt=0;vt<ht;vt++){const xt=k[vt];Ut(xt[2]+ft,xt[1]+ft,xt[0]+ft)}ot=p+v*2,ft=J*ot;for(let vt=0;vt<ht;vt++){const xt=k[vt];Ut(xt[0]+ft,xt[1]+ft,xt[2]+ft)}}else{for(let ot=0;ot<ht;ot++){const ft=k[ot];Ut(ft[2],ft[1],ft[0])}for(let ot=0;ot<ht;ot++){const ft=k[ot];Ut(ft[0]+J*p,ft[1]+J*p,ft[2]+J*p)}}n.addGroup(it,r.length/3-it,0)}function ct(){const it=r.length/3;let ot=0;pt(W,ot),ot+=W.length;for(let ft=0,vt=z.length;ft<vt;ft++){const xt=z[ft];pt(xt,ot),ot+=xt.length}n.addGroup(it,r.length/3-it,1)}function pt(it,ot){let ft=it.length;for(;--ft>=0;){const vt=ft;let xt=ft-1;xt<0&&(xt=it.length-1);for(let O=0,T=p+v*2;O<T;O++){const $=J*O,at=J*(O+1),lt=ot+vt+$,mt=ot+xt+$,Gt=ot+xt+at,_t=ot+vt+at;Lt(lt,mt,Gt,_t)}}}function yt(it,ot,ft){h.push(it),h.push(ot),h.push(ft)}function Ut(it,ot,ft){Et(it),Et(ot),Et(ft);const vt=r.length/3,xt=D.generateTopUV(n,r,vt-3,vt-2,vt-1);G(xt[0]),G(xt[1]),G(xt[2])}function Lt(it,ot,ft,vt){Et(it),Et(ot),Et(vt),Et(ot),Et(ft),Et(vt);const xt=r.length/3,O=D.generateSideWallUV(n,r,xt-6,xt-3,xt-2,xt-1);G(O[0]),G(O[1]),G(O[3]),G(O[1]),G(O[2]),G(O[3])}function Et(it){r.push(h[it*3+0]),r.push(h[it*3+1]),r.push(h[it*3+2])}function G(it){a.push(it.x),a.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return SM(e,n,t)}static fromJSON(t,e){const n=[];for(let a=0,l=t.shapes.length;a<l;a++){const u=e[t.shapes[a]];n.push(u)}const r=t.options.extrudePath;return r!==void 0&&(t.options.extrudePath=new Aa[r.type]().fromJSON(r)),new vo(n,t.options)}}const bM={generateTopUV:function(s,t,e,n,r){const a=t[e*3],l=t[e*3+1],u=t[n*3],h=t[n*3+1],d=t[r*3],p=t[r*3+1];return[new Mt(a,l),new Mt(u,h),new Mt(d,p)]},generateSideWallUV:function(s,t,e,n,r,a){const l=t[e*3],u=t[e*3+1],h=t[e*3+2],d=t[n*3],p=t[n*3+1],m=t[n*3+2],g=t[r*3],_=t[r*3+1],M=t[r*3+2],w=t[a*3],v=t[a*3+1],y=t[a*3+2];return Math.abs(u-p)<Math.abs(l-d)?[new Mt(l,1-h),new Mt(d,1-m),new Mt(g,1-M),new Mt(w,1-y)]:[new Mt(u,1-h),new Mt(p,1-m),new Mt(_,1-M),new Mt(v,1-y)]}};function SM(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,r=s.length;n<r;n++){const a=s[n];e.shapes.push(a.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Fc extends gn{constructor(t=new kf(new V(-1,-1,0),new V(-1,1,0),new V(1,1,0)),e=64,n=1,r=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:r,closed:a};const l=t.computeFrenetFrames(e,a);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const u=new V,h=new V,d=new Mt;let p=new V;const m=[],g=[],_=[],M=[];w(),this.setIndex(M),this.setAttribute("position",new nn(m,3)),this.setAttribute("normal",new nn(g,3)),this.setAttribute("uv",new nn(_,2));function w(){for(let b=0;b<e;b++)v(b);v(a===!1?e:0),D(),y()}function v(b){p=t.getPointAt(b/e,p);const C=l.normals[b],B=l.binormals[b];for(let N=0;N<=r;N++){const R=N/r*Math.PI*2,U=Math.sin(R),P=-Math.cos(R);h.x=P*C.x+U*B.x,h.y=P*C.y+U*B.y,h.z=P*C.z+U*B.z,h.normalize(),g.push(h.x,h.y,h.z),u.x=p.x+n*h.x,u.y=p.y+n*h.y,u.z=p.z+n*h.z,m.push(u.x,u.y,u.z)}}function y(){for(let b=1;b<=e;b++)for(let C=1;C<=r;C++){const B=(r+1)*(b-1)+(C-1),N=(r+1)*b+(C-1),R=(r+1)*b+C,U=(r+1)*(b-1)+C;M.push(B,N,U),M.push(N,R,U)}}function D(){for(let b=0;b<=e;b++)for(let C=0;C<=r;C++)d.x=b/e,d.y=C/r,_.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Fc(new Aa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class $i extends Tr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ne(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ne(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ff,this.normalScale=new Mt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=Rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Vf extends Je{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ne(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const nc=new xe,Ad=new V,Ld=new V;class wM{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Mt(512,512),this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Nc,this._frameExtents=new Mt(1,1),this._viewportCount=1,this._viewports=[new Ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Ad.setFromMatrixPosition(t.matrixWorld),e.position.copy(Ad),Ld.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ld),e.updateMatrixWorld(),nc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(nc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(nc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class EM extends wM{constructor(){super(new Tf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class TM extends Vf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Je.DEFAULT_UP),this.updateMatrix(),this.target=new Je,this.shadow=new EM}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class AM extends Vf{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Pd=new xe;class Gf{constructor(t,e,n=0,r=1/0){this.ray=new za(t,e),this.near=n,this.far=r,this.camera=null,this.layers=new Dc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Pd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Pd),this}intersectObject(t,e=!0,n=[]){return xc(t,this,n,e),n.sort(Cd),n}intersectObjects(t,e=!0,n=[]){for(let r=0,a=t.length;r<a;r++)xc(t[r],this,n,e);return n.sort(Cd),n}}function Cd(s,t){return s.distance-t.distance}function xc(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const r=s.children;for(let a=0,l=r.length;a<l;a++)xc(r[a],t,e,!0)}}class Rd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(en(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Cc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Cc);const Id={type:"change"},ic={type:"start"},Dd={type:"end"},ga=new za,Nd=new kn,LM=Math.cos(70*Rg.DEG2RAD);class PM extends Es{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new V,this.cursor=new V,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Os.ROTATE,MIDDLE:Os.DOLLY,RIGHT:Os.PAN},this.touches={ONE:Us.ROTATE,TWO:Us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return u.phi},this.getAzimuthalAngle=function(){return u.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(S){S.addEventListener("keydown",Pt),this._domElementKeyEvents=S},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Pt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Id),n.update(),a=r.NONE},this.update=function(){const S=new V,Q=new Ms().setFromUnitVectors(t.up,new V(0,1,0)),ut=Q.clone().invert(),wt=new V,Rt=new Ms,ue=new V,oe=2*Math.PI;return function(ke=null){const ve=n.object.position;S.copy(ve).sub(n.target),S.applyQuaternion(Q),u.setFromVector3(S),n.autoRotate&&a===r.NONE&&q(E(ke)),n.enableDamping?(u.theta+=h.theta*n.dampingFactor,u.phi+=h.phi*n.dampingFactor):(u.theta+=h.theta,u.phi+=h.phi);let De=n.minAzimuthAngle,Le=n.maxAzimuthAngle;isFinite(De)&&isFinite(Le)&&(De<-Math.PI?De+=oe:De>Math.PI&&(De-=oe),Le<-Math.PI?Le+=oe:Le>Math.PI&&(Le-=oe),De<=Le?u.theta=Math.max(De,Math.min(Le,u.theta)):u.theta=u.theta>(De+Le)/2?Math.max(De,u.theta):Math.min(Le,u.theta)),u.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,u.phi)),u.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(p,n.dampingFactor):n.target.add(p),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let cn=!1;if(n.zoomToCursor&&N||n.object.isOrthographicCamera)u.radius=Z(u.radius);else{const _n=u.radius;u.radius=Z(u.radius*d),cn=_n!=u.radius}if(S.setFromSpherical(u),S.applyQuaternion(ut),ve.copy(n.target).add(S),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,p.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),p.set(0,0,0)),n.zoomToCursor&&N){let _n=null;if(n.object.isPerspectiveCamera){const ti=S.length();_n=Z(ti*d);const Ii=ti-_n;n.object.position.addScaledVector(C,Ii),n.object.updateMatrixWorld(),cn=!!Ii}else if(n.object.isOrthographicCamera){const ti=new V(B.x,B.y,0);ti.unproject(n.object);const Ii=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),cn=Ii!==n.object.zoom;const Ze=new V(B.x,B.y,0);Ze.unproject(n.object),n.object.position.sub(Ze).add(ti),n.object.updateMatrixWorld(),_n=S.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;_n!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(_n).add(n.object.position):(ga.origin.copy(n.object.position),ga.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(ga.direction))<LM?t.lookAt(n.target):(Nd.setFromNormalAndCoplanarPoint(n.object.up,n.target),ga.intersectPlane(Nd,n.target))))}else if(n.object.isOrthographicCamera){const _n=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),_n!==n.object.zoom&&(n.object.updateProjectionMatrix(),cn=!0)}return d=1,N=!1,cn||wt.distanceToSquared(n.object.position)>l||8*(1-Rt.dot(n.object.quaternion))>l||ue.distanceToSquared(n.target)>l?(n.dispatchEvent(Id),wt.copy(n.object.position),Rt.copy(n.object.quaternion),ue.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ot),n.domElement.removeEventListener("pointerdown",$),n.domElement.removeEventListener("pointercancel",lt),n.domElement.removeEventListener("wheel",_t),n.domElement.removeEventListener("pointermove",at),n.domElement.removeEventListener("pointerup",lt),n.domElement.getRootNode().removeEventListener("keydown",Wt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Pt),n._domElementKeyEvents=null)};const n=this,r={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=r.NONE;const l=1e-6,u=new Rd,h=new Rd;let d=1;const p=new V,m=new Mt,g=new Mt,_=new Mt,M=new Mt,w=new Mt,v=new Mt,y=new Mt,D=new Mt,b=new Mt,C=new V,B=new Mt;let N=!1;const R=[],U={};let P=!1;function E(S){return S!==null?2*Math.PI/60*n.autoRotateSpeed*S:2*Math.PI/60/60*n.autoRotateSpeed}function z(S){const Q=Math.abs(S*.01);return Math.pow(.95,n.zoomSpeed*Q)}function q(S){h.theta-=S}function k(S){h.phi-=S}const W=function(){const S=new V;return function(ut,wt){S.setFromMatrixColumn(wt,0),S.multiplyScalar(-ut),p.add(S)}}(),X=function(){const S=new V;return function(ut,wt){n.screenSpacePanning===!0?S.setFromMatrixColumn(wt,1):(S.setFromMatrixColumn(wt,0),S.crossVectors(n.object.up,S)),S.multiplyScalar(ut),p.add(S)}}(),J=function(){const S=new V;return function(ut,wt){const Rt=n.domElement;if(n.object.isPerspectiveCamera){const ue=n.object.position;S.copy(ue).sub(n.target);let oe=S.length();oe*=Math.tan(n.object.fov/2*Math.PI/180),W(2*ut*oe/Rt.clientHeight,n.object.matrix),X(2*wt*oe/Rt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(W(ut*(n.object.right-n.object.left)/n.object.zoom/Rt.clientWidth,n.object.matrix),X(wt*(n.object.top-n.object.bottom)/n.object.zoom/Rt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ht(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function F(S){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=S:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function rt(S,Q){if(!n.zoomToCursor)return;N=!0;const ut=n.domElement.getBoundingClientRect(),wt=S-ut.left,Rt=Q-ut.top,ue=ut.width,oe=ut.height;B.x=wt/ue*2-1,B.y=-(Rt/oe)*2+1,C.set(B.x,B.y,1).unproject(n.object).sub(n.object.position).normalize()}function Z(S){return Math.max(n.minDistance,Math.min(n.maxDistance,S))}function dt(S){m.set(S.clientX,S.clientY)}function bt(S){rt(S.clientX,S.clientX),y.set(S.clientX,S.clientY)}function Dt(S){M.set(S.clientX,S.clientY)}function K(S){g.set(S.clientX,S.clientY),_.subVectors(g,m).multiplyScalar(n.rotateSpeed);const Q=n.domElement;q(2*Math.PI*_.x/Q.clientHeight),k(2*Math.PI*_.y/Q.clientHeight),m.copy(g),n.update()}function ct(S){D.set(S.clientX,S.clientY),b.subVectors(D,y),b.y>0?ht(z(b.y)):b.y<0&&F(z(b.y)),y.copy(D),n.update()}function pt(S){w.set(S.clientX,S.clientY),v.subVectors(w,M).multiplyScalar(n.panSpeed),J(v.x,v.y),M.copy(w),n.update()}function yt(S){rt(S.clientX,S.clientY),S.deltaY<0?F(z(S.deltaY)):S.deltaY>0&&ht(z(S.deltaY)),n.update()}function Ut(S){let Q=!1;switch(S.code){case n.keys.UP:S.ctrlKey||S.metaKey||S.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):J(0,n.keyPanSpeed),Q=!0;break;case n.keys.BOTTOM:S.ctrlKey||S.metaKey||S.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):J(0,-n.keyPanSpeed),Q=!0;break;case n.keys.LEFT:S.ctrlKey||S.metaKey||S.shiftKey?q(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):J(n.keyPanSpeed,0),Q=!0;break;case n.keys.RIGHT:S.ctrlKey||S.metaKey||S.shiftKey?q(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):J(-n.keyPanSpeed,0),Q=!0;break}Q&&(S.preventDefault(),n.update())}function Lt(S){if(R.length===1)m.set(S.pageX,S.pageY);else{const Q=me(S),ut=.5*(S.pageX+Q.x),wt=.5*(S.pageY+Q.y);m.set(ut,wt)}}function Et(S){if(R.length===1)M.set(S.pageX,S.pageY);else{const Q=me(S),ut=.5*(S.pageX+Q.x),wt=.5*(S.pageY+Q.y);M.set(ut,wt)}}function G(S){const Q=me(S),ut=S.pageX-Q.x,wt=S.pageY-Q.y,Rt=Math.sqrt(ut*ut+wt*wt);y.set(0,Rt)}function it(S){n.enableZoom&&G(S),n.enablePan&&Et(S)}function ot(S){n.enableZoom&&G(S),n.enableRotate&&Lt(S)}function ft(S){if(R.length==1)g.set(S.pageX,S.pageY);else{const ut=me(S),wt=.5*(S.pageX+ut.x),Rt=.5*(S.pageY+ut.y);g.set(wt,Rt)}_.subVectors(g,m).multiplyScalar(n.rotateSpeed);const Q=n.domElement;q(2*Math.PI*_.x/Q.clientHeight),k(2*Math.PI*_.y/Q.clientHeight),m.copy(g)}function vt(S){if(R.length===1)w.set(S.pageX,S.pageY);else{const Q=me(S),ut=.5*(S.pageX+Q.x),wt=.5*(S.pageY+Q.y);w.set(ut,wt)}v.subVectors(w,M).multiplyScalar(n.panSpeed),J(v.x,v.y),M.copy(w)}function xt(S){const Q=me(S),ut=S.pageX-Q.x,wt=S.pageY-Q.y,Rt=Math.sqrt(ut*ut+wt*wt);D.set(0,Rt),b.set(0,Math.pow(D.y/y.y,n.zoomSpeed)),ht(b.y),y.copy(D);const ue=(S.pageX+Q.x)*.5,oe=(S.pageY+Q.y)*.5;rt(ue,oe)}function O(S){n.enableZoom&&xt(S),n.enablePan&&vt(S)}function T(S){n.enableZoom&&xt(S),n.enableRotate&&ft(S)}function $(S){n.enabled!==!1&&(R.length===0&&(n.domElement.setPointerCapture(S.pointerId),n.domElement.addEventListener("pointermove",at),n.domElement.addEventListener("pointerup",lt)),!fe(S)&&(ae(S),S.pointerType==="touch"?qt(S):mt(S)))}function at(S){n.enabled!==!1&&(S.pointerType==="touch"?Nt(S):Gt(S))}function lt(S){switch(le(S),R.length){case 0:n.domElement.releasePointerCapture(S.pointerId),n.domElement.removeEventListener("pointermove",at),n.domElement.removeEventListener("pointerup",lt),n.dispatchEvent(Dd),a=r.NONE;break;case 1:const Q=R[0],ut=U[Q];qt({pointerId:Q,pageX:ut.x,pageY:ut.y});break}}function mt(S){let Q;switch(S.button){case 0:Q=n.mouseButtons.LEFT;break;case 1:Q=n.mouseButtons.MIDDLE;break;case 2:Q=n.mouseButtons.RIGHT;break;default:Q=-1}switch(Q){case Os.DOLLY:if(n.enableZoom===!1)return;bt(S),a=r.DOLLY;break;case Os.ROTATE:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enablePan===!1)return;Dt(S),a=r.PAN}else{if(n.enableRotate===!1)return;dt(S),a=r.ROTATE}break;case Os.PAN:if(S.ctrlKey||S.metaKey||S.shiftKey){if(n.enableRotate===!1)return;dt(S),a=r.ROTATE}else{if(n.enablePan===!1)return;Dt(S),a=r.PAN}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(ic)}function Gt(S){switch(a){case r.ROTATE:if(n.enableRotate===!1)return;K(S);break;case r.DOLLY:if(n.enableZoom===!1)return;ct(S);break;case r.PAN:if(n.enablePan===!1)return;pt(S);break}}function _t(S){n.enabled===!1||n.enableZoom===!1||a!==r.NONE||(S.preventDefault(),n.dispatchEvent(ic),yt(Ft(S)),n.dispatchEvent(Dd))}function Ft(S){const Q=S.deltaMode,ut={clientX:S.clientX,clientY:S.clientY,deltaY:S.deltaY};switch(Q){case 1:ut.deltaY*=16;break;case 2:ut.deltaY*=100;break}return S.ctrlKey&&!P&&(ut.deltaY*=10),ut}function Wt(S){S.key==="Control"&&(P=!0,n.domElement.getRootNode().addEventListener("keyup",St,{passive:!0,capture:!0}))}function St(S){S.key==="Control"&&(P=!1,n.domElement.getRootNode().removeEventListener("keyup",St,{passive:!0,capture:!0}))}function Pt(S){n.enabled===!1||n.enablePan===!1||Ut(S)}function qt(S){switch(de(S),R.length){case 1:switch(n.touches.ONE){case Us.ROTATE:if(n.enableRotate===!1)return;Lt(S),a=r.TOUCH_ROTATE;break;case Us.PAN:if(n.enablePan===!1)return;Et(S),a=r.TOUCH_PAN;break;default:a=r.NONE}break;case 2:switch(n.touches.TWO){case Us.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;it(S),a=r.TOUCH_DOLLY_PAN;break;case Us.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ot(S),a=r.TOUCH_DOLLY_ROTATE;break;default:a=r.NONE}break;default:a=r.NONE}a!==r.NONE&&n.dispatchEvent(ic)}function Nt(S){switch(de(S),a){case r.TOUCH_ROTATE:if(n.enableRotate===!1)return;ft(S),n.update();break;case r.TOUCH_PAN:if(n.enablePan===!1)return;vt(S),n.update();break;case r.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;O(S),n.update();break;case r.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;T(S),n.update();break;default:a=r.NONE}}function Ot(S){n.enabled!==!1&&S.preventDefault()}function ae(S){R.push(S.pointerId)}function le(S){delete U[S.pointerId];for(let Q=0;Q<R.length;Q++)if(R[Q]==S.pointerId){R.splice(Q,1);return}}function fe(S){for(let Q=0;Q<R.length;Q++)if(R[Q]==S.pointerId)return!0;return!1}function de(S){let Q=U[S.pointerId];Q===void 0&&(Q=new Mt,U[S.pointerId]=Q),Q.set(S.pageX,S.pageY)}function me(S){const Q=S.pointerId===R[0]?R[1]:R[0];return U[Q]}n.domElement.addEventListener("contextmenu",Ot),n.domElement.addEventListener("pointerdown",$),n.domElement.addEventListener("pointercancel",lt),n.domElement.addEventListener("wheel",_t,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Wt,{passive:!0,capture:!0}),this.update()}}var yo=Uint8Array,Wf=Uint16Array,CM=Int32Array,RM=new yo([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),IM=new yo([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Zf=function(s,t){for(var e=new Wf(31),n=0;n<31;++n)e[n]=t+=1<<s[n-1];for(var r=new CM(e[30]),n=1;n<30;++n)for(var a=e[n];a<e[n+1];++a)r[a]=a-e[n]<<5|n;return{b:e,r}},Xf=Zf(RM,2),DM=Xf.b,NM=Xf.r;DM[28]=258,NM[258]=28;Zf(IM,0);var OM=new Wf(32768);for(_e=0;_e<32768;++_e)Si=(_e&43690)>>1|(_e&21845)<<1,Si=(Si&52428)>>2|(Si&13107)<<2,Si=(Si&61680)>>4|(Si&3855)<<4,OM[_e]=((Si&65280)>>8|(Si&255)<<8)>>1;var Si,_e,Za=new yo(288);for(_e=0;_e<144;++_e)Za[_e]=8;var _e;for(_e=144;_e<256;++_e)Za[_e]=9;var _e;for(_e=256;_e<280;++_e)Za[_e]=7;var _e;for(_e=280;_e<288;++_e)Za[_e]=8;var _e,UM=new yo(32);for(_e=0;_e<32;++_e)UM[_e]=5;var _e,kM=new yo(0),BM=typeof TextDecoder<"u"&&new TextDecoder,FM=0;try{BM.decode(kM,{stream:!0}),FM=1}catch{}const zM="modulepreload",HM=function(s){return"/"+s},Od={},VM=function(t,e,n){let r=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),u=l?.nonce||l?.getAttribute("nonce");r=Promise.allSettled(e.map(h=>{if(h=HM(h),h in Od)return;Od[h]=!0;const d=h.endsWith(".css"),p=d?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const m=document.createElement("link");if(m.rel=d?"stylesheet":zM,d||(m.as="script"),m.crossOrigin="",m.href=h,u&&m.setAttribute("nonce",u),document.head.appendChild(m),d)return new Promise((g,_)=>{m.addEventListener("load",g),m.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${h}`)))})}))}function a(l){const u=new Event("vite:preloadError",{cancelable:!0});if(u.payload=l,window.dispatchEvent(u),!u.defaultPrevented)throw l}return r.then(l=>{for(const u of l||[])u.status==="rejected"&&a(u.reason);return t().catch(a)})};let Sn=null,Ae=null,mn=null,Yn=null,Ud="",ee=null,jt=null,ai=null,Mc="",Yi=[],kd="",Qn=null,Xa=null;const he={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500",7:"#b8b8b8",8:"#262626"},Fn={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0,river_polygons:!0,barren:!0,buildings:!0,roads:!0},Re={};let bc=1,qf=1,GM=0;const ui=[];let Kn=[],La=[],qa=[];const xo=new Map;let ho=-1,$a=!1,zc="",zn=200,Hn=200,Ss=2,Jn=1,fo=-1,Pa=!1;const Ya={water_ocean:!0,water_lake:!0,water_pond:!0,water_reservoir:!0,water_wastewater:!0,water_human:!0,water_other:!0};let oo=1,Sc=-1;const Wi={rivers:!0,streams_named:!0,streams_unnamed:!0,river_polygons:!0,canals:!0,canal_polygons:!0},Kr={lc_forest:!1,lc_forest_detailed:!1,lc_scrub:!1,lc_shrub:!1,lc_grass:!1,lc_grass_detailed:!1,lc_crop:!1,lc_moss:!1,lc_wetland:!1,lc_wetland_detailed:!1,lc_mangrove:!1,lc_barren:!1,lc_desert:!1,lc_sand:!1,lc_rock:!1,lc_snow:!1,lc_glacier:!1,lc_urban:!1},Gi={veg_dense:{...Kr,lc_forest:!0,lc_forest_detailed:!0,lc_shrub:!0,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},veg_low:{...Kr,lc_scrub:!0,lc_grass:!0,lc_grass_detailed:!0,lc_crop:!0,lc_moss:!0},wetland_lc:{...Kr,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},snow_lc:{...Kr,lc_snow:!0,lc_glacier:!0},barren_lc:{...Kr,lc_barren:!0,lc_desert:!0,lc_sand:!0,lc_rock:!0,lc_urban:!0}},$f={veg_dense:0,veg_low:0,wetland_lc:0,snow_lc:0,barren_lc:0};let WM=.2,Hc=1,Ca=1,Vc=.6,Ra=1,Pi=[],Bd="";function ZM(s){Hc=s}function XM(s){Ca=s}function qM(s){Vc=s}function $M(s){Ra=s}let Ia=0,Gc=.5,ja=1,Wc="raised",Ci=[],Ln=null;function YM(s){Ia=s}function jM(s){Gc=s}function KM(s){ja=s}function JM(s){Wc=s}function Fd(s,t,e){Gi[s]&&(Gi[s][t]=e,jt&&(jt.dispose(),jt=null))}function QM(s,t){$f[s]=t}const sr={},Da={};let li=null,zd="",Ye=null,Na=null,wc=[],ys=null,Pe=null,lr=null,Jr=null,Zc=!1;const Cn=256,tb=3072;let sn=[];const cr=[];function Yf(){if(!Pe||!lr)return!1;const s=lr.getBoundingClientRect();return!s.width||!s.height?!1:(Pe.style.left=`${s.left}px`,Pe.style.top=`${s.top}px`,Pe.style.width=`${s.width}px`,Pe.style.height=`${s.height}px`,Sn&&(Sn.setSize(s.width,s.height,!1),mn.aspect=s.width/s.height,mn.updateProjectionMatrix()),!0)}function Hd(){if(!Pe||!Zc)return;Yf()&&Pe.style.display==="none"&&(Pe.style.display="block")}function xr(s){if(Pe||(Pe=document.getElementById("dims-canvas")),lr!==s&&(Jr&&lr&&Jr.unobserve(lr),lr=s,Jr||(Jr=new ResizeObserver(Hd),window.addEventListener("resize",Hd)),Jr.observe(s)),Zc=!0,Yf()&&Pe&&(Pe.style.display="block"),Sn)return;const t=s.getBoundingClientRect(),e=t.width||800,n=t.height||600;Sn=new Hx({canvas:Pe,antialias:!0}),Sn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Sn.setSize(e,n,!1),Sn.localClippingEnabled=!0,Ae=new Vx,Ae.background=new ne(527380),mn=new Un(42,e/n,.1,1e5),Yn=new PM(mn,Pe),Yn.enableDamping=!0,Yn.dampingFactor=.06,Ae.add(new AM(16777215,.8));const r=new TM(16777215,.6);r.position.set(1.5,3,2),Ae.add(r);const a=()=>{requestAnimationFrame(a),Yn.update(),Sn.render(Ae,mn),Db()};a()}function jf(){Zc=!1,Pe&&(Pe.style.display="none")}function Lr(s){if(Object.assign(he,s),ee&&(jt&&(jt.dispose(),jt=null),jt=fr(ee.bounds,ee.grid,Cn,ee.minE,ee.elevRange,Yi,zn,Hn,Jn,Ci,Pi),Ye)){const p=Ye.material;p.map=jt,p.needsUpdate=!0}const t=Re.base??1;Na&&Na.material.color.set(he[t]??he[1]);const e=Re.facade??1,n=new ne(he[e]??he[1]);for(const p of wc)p.material.color.set(n);if(ys){const p=Re.gpx_line??6,m=he[p]??"#ff4500";ys.traverse(g=>{const _=g.material;_?.color&&_.color.set(m)}),ys.visible=Fn.gpx_line??!0}const r=Re.gpx??6,a=he[r]??"#ff4500";for(const p of Kn)p.traverse(m=>{const g=m.material;g?.color&&g.color.set(a)});const l=Re.buildings??7,u=new ne(he[l]??"#b8b8b8");for(const p of La)p.material.color.set(u);const h=Re.roads??8,d=new ne(he[h]??"#262626");Ln?.traverse(p=>{const m=p.material;m?.color&&m.color.set(d)});for(const p of qa){const m=p.__zoneLayerId,g=Pc.find(M=>M.id===m);if(!g)continue;const _=Re[m]??g.slot;p.material.color.set(he[_]??"#888")}}function eb(s,t){Re[s]=t,Lr({})}function Kf(s,t){if(Fn[s]=t,s==="gpx_line")ys&&(ys.visible=t);else if(s==="gpx")for(const e of Kn)e.visible=t;else if(s==="buildings"){for(const e of La)e.visible=t;ee&&(jt&&(jt.dispose(),jt=null),jt=fr(ee.bounds,ee.grid,Cn,ee.minE,ee.elevRange,Yi,zn,Hn,Jn,Ci,Pi),Ye&&(Ye.material.map=jt,Ye.material.needsUpdate=!0))}else if(s==="roads")Ln&&(Ln.visible=t),ee&&(jt&&(jt.dispose(),jt=null),jt=fr(ee.bounds,ee.grid,Cn,ee.minE,ee.elevRange,Yi,zn,Hn,Jn,Ci,Pi),Ye&&(Ye.material.map=jt,Ye.material.needsUpdate=!0));else if(ee&&(jt&&(jt.dispose(),jt=null),jt=fr(ee.bounds,ee.grid,Cn,ee.minE,ee.elevRange,Yi,zn,Hn,Jn,Ci,Pi),Ye)){const e=Ye.material;e.map=jt,e.needsUpdate=!0}}function nb(s,t){bc=s,qf=t}function ib(s){$a=!0,zc=s,Pe&&(Pe.style.cursor="crosshair")}function Jf(){$a=!1,zc="",Pe&&(Pe.style.cursor="")}function Qf(){return $a}function sb(s,t){if(!$a||!Ae||!mn||!Ye||!Pe)return-1;const e=Pe.getBoundingClientRect(),n=(s-e.left)/e.width*2-1,r=-((t-e.top)/e.height)*2+1,a=new Gf;a.setFromCamera(new Mt(n,r),mn);const l=a.intersectObject(Ye);let u=-1;if(l.length>0){const h=l[0].point,d=.5-h.z/Hn,p=.5+h.x/zn,m=GM++,g={id:m,latFrac:d,lonFrac:p,shape:zc,visible:!0,diameterMult:10,rotDeg:0,flatTop:!0,heightOffMult:0};ui.push(g),$c(g,ui.length-1),u=m}return Jf(),u}function Ec(){return ui.map(s=>({id:s.id,shape:s.shape,visible:s.visible,diameterMult:s.diameterMult,rotDeg:s.rotDeg,flatTop:s.flatTop,heightOffMult:s.heightOffMult}))}function Tc(){return ho}function tp(s){ho=s}function rb(){ho=-1}function ob(s,t){if(!Ae||!mn||!Pe||Kn.length===0)return-1;const e=Pe.getBoundingClientRect(),n=(s-e.left)/e.width*2-1,r=-((t-e.top)/e.height)*2+1,a=new Gf;a.setFromCamera(new Mt(n,r),mn);const l=a.intersectObjects(Kn,!0);if(!l.length)return-1;let u=l[0].object;for(;u;){const h=xo.get(u);if(h!==void 0)return h;u=u.parent}return-1}function Ac(s,t){const e=ui.findIndex(a=>a.id===s);if(e<0)return;Object.assign(ui[e],t);const n=Kn[e];if(n){xo.delete(n),Ae?.remove(n);const a=sn.indexOf(n);a>=0&&sn.splice(a,1),Kn.splice(e,1)}const r=ui[e];$c(r,e)}function ab(s,t){Ac(s,{visible:t})}function lb(s){const t=ui.findIndex(n=>n.id===s);if(t<0)return;ui.splice(t,1);const e=Kn.splice(t,1)[0];if(e){xo.delete(e),Ae?.remove(e);const n=sn.indexOf(e);n>=0&&sn.splice(n,1)}ho===s&&(ho=-1)}async function cb(s,t,e){if(!Ae||!mn||!Yn||!Sn)return;const n=`${s.minLat}|${s.maxLat}|${s.minLon}|${s.maxLon}`,r=n!==Ud;r&&(Ud=n,ee=null,jt&&(jt.dispose(),jt=null),e(5,"Téléchargement des altitudes…"),ee=await Rb(s));const a={features:n!==kd,buildings:n!==Bd};if(a.features||a.buildings){e(30,"Chargement des données géographiques…");const{zoneFeatures:u,buildings:h,roads:d}=await hb(s);(u.length>0||h.length>0||d.length>0)&&(kd=n,Bd=n,u.length>0&&(Yi=u,jt&&(jt.dispose(),jt=null)),Pi=h,Ci=d)}if(!jt&&ee){e(70,"Génération de la texture…");const{wMm:u,dMm:h,exag:d}=t,p=s,m=(p.minLat+p.maxLat)/2,g=Math.max((p.maxLon-p.minLon)*Math.cos(m*Math.PI/180)*111320,(p.maxLat-p.minLat)*111320),_=Math.max(u,h),M=Math.max(1,Math.min(_*.5,ee.elevRange/g*_*d));jt=fr(s,ee.grid,Cn,ee.minE,ee.elevRange,Yi,u,h,M,Ci,Pi)}else r||e(50,"Reconstruction…");const l=JSON.stringify(t.zonePts);(l!==Mc||!ai)&&(Mc=l,ai&&(ai.dispose(),ai=null),ai=xb(t.zonePts,t.zoneType,s)),e(88,"Construction de la scène 3D…"),Mn(t),e(100,"")}function Mn(s){if(!Ae||!mn||!Yn||!ee)return;Ib();const{wMm:t,dMm:e,baseH:n,exag:r,flatFacade:a,facadeWidthMm:l,gpxPoints:u,zoneType:h,zonePts:d,bounds:p}=s,{grid:m,minE:g,elevRange:_}=ee,M=p??ee.bounds,w=(M.minLat+M.maxLat)/2,v=(M.maxLon-M.minLon)*Math.cos(w*Math.PI/180)*111320,y=(M.maxLat-M.minLat)*111320,D=Math.max(v,y),b=Math.max(t,e),C=Math.max(1,Math.min(b*.5,_/D*b*r));jt||(jt=fr(M,m,Cn,g,_,Yi,t,e,C,Ci,Pi));const B=n+C,N=Cn,R=Mb(d,h,M,t,e);Qn=R;const U=Math.max(1,l);Ye=null,Na=null,wc=[],ys=null,li=null,Kn=[],La=[],qa=[],Ln=null,zn=t,Hn=e,Ss=n,Jn=C;const E=yb(m,N,M,Yi,_,C,.2);Xa=E;{const F=new _o(t,e,N-1,N-1);F.rotateX(-Math.PI/2);const rt=F.attributes.position;for(let dt=0;dt<rt.count;dt++)rt.setY(dt,n+(E[dt]-g)/_*C);rt.needsUpdate=!0,F.computeVertexNormals();const Z=new Ve(F,new $i({map:jt,alphaMap:ai??void 0,transparent:!!ai}));Ye=Z,fs(Z)}const z=Re.base??1,q=new ne(he[z]??he[1]),k=new Ve(bb(R,h,t,e,n,U),new $i({color:q,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));Na=k,fs(k);const W=Re.facade??1,X=new ne(he[W]??he[1]),J=new $i({color:X,side:Bn});for(const F of Sb(R,h,t,e,U,a,B,m,N,g,_,n,C))F.material=J,wc.push(F),fs(F);if(u.length>=2){const F=Cb(u,M,t,e,E,N,g,_,n,C);F&&(F.visible=Fn.gpx_line??!0,ys=F,fs(F))}{const F=new Xx(new sM(new Ri(t+U*2,B,e+U*2)),new Va({color:16718362}));F.position.y=B/2,fs(F)}cr.length=0,cr.push({id:"dl-width",v:new V(0,2,e/2+U+14)}),cr.push({id:"dl-depth",v:new V(t/2+U+14,B*.1,0)}),cr.push({id:"dl-height",v:new V(-t/2-U-12,B/2,e/2+8)}),er("dl-width",`${t} mm`),er("dl-depth",`${e} mm`),er("dl-height",`~${Math.round(B*10)/10} mm`),er("dp-total-val",`~${Math.round(B*10)/10}`),er("dp-map-h",`~${Math.round(C*10)/10}`),er("dp-base-h-disp",`${n}`),zn=t,Hn=e,Ss=n,Jn=C,xo.clear();for(let F=0;F<ui.length;F++)$c(ui[F],F);qc();try{Lc()}catch(F){console.warn("rebuildRoadMeshes failed:",F)}if(Pi.length>0){const F=Fn.buildings??!0;for(const rt of db(Pi,M,E,N,g,_,t,e,n,C))rt.visible=F,La.push(rt),fs(rt)}const ht=Math.sqrt(t*t+e*e);{const F=new V(0,B*.3,0);Yn.target.lengthSq()<.1&&(mn.position.set(t*.7,B+ht*.44,e*.92),mn.lookAt(F)),Yn.target.copy(F),Yn.update()}}function ub(){Yn&&Yn.target.set(0,0,0),jt&&(jt.dispose(),jt=null),ai&&(ai.dispose(),ai=null),Mc=""}async function hb(s){const t={zoneFeatures:[],buildings:[],roads:[]},{minLat:e,minLon:n,maxLat:r,maxLon:a}=s,l=`(${e},${n},${r},${a})`,h=`[out:json][timeout:60][maxsize:536870912];
(
  way["natural"="water"]${l};
  relation["natural"="water"]${l};
  way["waterway"="riverbank"]${l};
  way["waterway"~"^(river|canal|stream|ditch)$"]${l};
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
);
out geom qt;`,d=new AbortController,p=setTimeout(()=>d.abort(),58e3);try{const m=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(h)}`,{signal:d.signal});if(clearTimeout(p),!m.ok)return t;const g=(await m.json()).elements??[],_=[],M=[],w=[];for(const v of g){const y=v.tags;y&&(y.highway&&v.type==="way"&&(v.geometry?.length??0)>=2?w.push({hwType:y.highway,geom:v.geometry}):y.building?M.push(v):_.push(v))}return{zoneFeatures:_,buildings:M,roads:w}}catch{return clearTimeout(p),t}}function Mo(s,t,e){let n=!1;const r=e.length;for(let a=0,l=r-1;a<r;l=a++){const u=e[a][0],h=e[a][1],d=e[l][0],p=e[l][1];h>t!=p>t&&s<(d-u)*(t-h)/(p-h)+u&&(n=!n)}return n}function db(s,t,e,n,r,a,l,u,h,d){const{minLat:p,maxLat:m,minLon:g,maxLon:_}=t,M=new ne(he[Re.buildings??7]??"#888888"),w=[new kn(new V(-1,0,0),l/2),new kn(new V(1,0,0),l/2),new kn(new V(0,0,-1),u/2),new kn(new V(0,0,1),u/2)],v=new $i({color:M,clippingPlanes:w}),y=[],D=(p+m)/2,b=Math.cos(D*Math.PI/180);for(const C of s){const B=Xc(C);if(!B.length)continue;const N=B[0];if(N.length<3||Ra>0&&ip(C,b)<Ra)continue;const R=parseFloat(C.tags?.["building:levels"]??"2")||2,U=Math.max(Vc,R*WM*Hc);let P=0,E=0;for(const Z of N)P+=Z.lon,E+=Z.lat;const z=(P/N.length-g)/(_-g),q=(E/N.length-p)/(m-p),k=z*l-l/2,W=q*u-u/2;if(Qn){const Z=k,dt=(.5-q)*u;if(!Mo(Z,dt,Qn))continue}const X=new Ga;for(let Z=0;Z<N.length;Z++){const dt=(N[Z].lon-g)/(_-g),bt=(N[Z].lat-p)/(m-p),Dt=k+(dt*l-l/2-k)*Ca,K=W+(bt*u-u/2-W)*Ca;Z===0?X.moveTo(Dt,K):X.lineTo(Dt,K)}X.closePath();const J=Mr(e,n,z,1-q),ht=h+(J-r)/a*d,F=new vo(X,{depth:U,bevelEnabled:!1});F.rotateX(-Math.PI/2);const rt=new Ve(F,v);rt.position.y=ht,y.push(rt)}return y}function ep(s){return s==="motorway"||s==="motorway_link"?10:s==="trunk"||s==="trunk_link"?8:s==="primary"||s==="primary_link"?6:s==="secondary"||s==="secondary_link"?5:s==="tertiary"||s==="tertiary_link"?4:3.5}function fb(s,t,e,n,r,a,l,u,h,d,p,m){const{minLat:g,maxLat:_,minLon:M,maxLon:w}=n,v=(R,U)=>{const P=Math.max(0,Math.min(1,R/h+.5)),E=Math.max(0,Math.min(1,.5-U/d)),z=Mr(r,a,P,1-E);return p+(z-l)/u*m+e},y=[];for(const R of s){const U=(R.lon-M)/(w-M),P=(R.lat-g)/(_-g);if(U<-.02||U>1.02||P<-.02||P>1.02)continue;const E=(U-.5)*h,z=(.5-P)*d;Qn&&!Mo(E,z,Qn)||y.push(new V(E,v(E,z),z))}if(y.length<2)return null;const D=1.5,b=[y[0]];for(let R=1;R<y.length;R++){const U=y[R-1],P=y[R],E=P.x-U.x,z=P.z-U.z,q=Math.sqrt(E*E+z*z),k=Math.max(1,Math.round(q/D));for(let W=1;W<=k;W++){const X=W/k,J=U.x+E*X,ht=U.z+z*X;b.push(new V(J,v(J,ht),ht))}}const C=[],B=[];for(let R=0;R<b.length;R++){const U=b[Math.max(0,R-1)],P=b[Math.min(b.length-1,R+1)],E=P.x-U.x,z=P.z-U.z,q=Math.sqrt(E*E+z*z);if(q<1e-9)C.push(b[R].x,b[R].y,b[R].z),C.push(b[R].x,b[R].y,b[R].z);else{const k=-z/q*t,W=E/q*t;C.push(b[R].x-k,b[R].y,b[R].z-W),C.push(b[R].x+k,b[R].y,b[R].z+W)}if(R>0){const k=(R-1)*2;B.push(k,k+2,k+1,k+1,k+2,k+3)}}if(C.length<12)return null;const N=new gn;return N.setAttribute("position",new nn(C,3)),N.setIndex(B),N.computeVertexNormals(),N}function Lc(){if(Ln){Ae?.remove(Ln);const y=sn.indexOf(Ln);y>=0&&sn.splice(y,1),Ln=null}if(!ee||!Ae||!Ci.length)return;const{minE:s,elevRange:t,bounds:e}=ee,n=Xa??ee.grid,r=Cn,a=zn,l=Hn,u=Ss,h=Jn,d=(e.minLat+e.maxLat)/2,p=(e.maxLon-e.minLon)*Math.cos(d*Math.PI/180)*111320,m=a/p,g=Re.roads??8,_=new ne(he[g]??"#262626"),M=new $i({color:_,side:Bn,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),w=Wc==="raised"?Ia:-Ia,v=new vs;for(const y of Ci){if(Qn){const B=e;if(!y.geom.some(R=>{const U=(R.lon-B.minLon)/(B.maxLon-B.minLon)*a-a/2,P=(.5-(R.lat-B.minLat)/(B.maxLat-B.minLat))*l;return Mo(U,P,Qn)}))continue}const D=ep(y.hwType)*m*ja,b=Math.max(Gc,D)/2,C=fb(y.geom,b,w,e,n,r,s,t,a,l,u,h);C&&v.add(new Ve(C,M))}v.children.length>0&&(v.visible=Fn.roads??!0,Ae.add(v),sn.push(v),Ln=v)}function pb(s,t){fo=s,Pa=t}function mb(s,t){Ya[s]=t,jt&&(jt.dispose(),jt=null)}function gb(s,t){oo=s,Sc=t,jt&&(jt.dispose(),jt=null)}function Vd(s,t){Wi[s]=t,jt&&(jt.dispose(),jt=null)}function np(s){const t=s.water??"";return["ocean","sea","bay","strait"].includes(t)?"water_ocean":t==="canal"?"water_canal":t==="lake"||!t&&s.natural==="water"?"water_lake":t==="pond"?"water_pond":t==="reservoir"||s.landuse==="reservoir"?"water_reservoir":t==="wastewater"?"water_wastewater":["basin","dock","reflecting_pool","swimming_pool","moat"].includes(t)?"water_human":"water_other"}function _b(s){const t=s.waterway??"";return t==="river"?Wi.rivers!==!1:t==="canal"?Wi.canals!==!1:t==="stream"||t==="ditch"?(s.name?Wi.streams_named:Wi.streams_unnamed)!==!1:!0}function vb(s,t,e){let n=!1;for(let r=0,a=e.length-1;r<e.length;a=r++){const l=e[r].lat,u=e[r].lon,h=e[a].lat,d=e[a].lon;l>s!=h>s&&t<(d-u)*(s-l)/(h-l)+u&&(n=!n)}return n}function Xc(s){return s.type==="way"&&s.geometry?[s.geometry]:s.type==="relation"&&s.members?s.members.filter(t=>t.role==="outer"&&t.geometry).map(t=>t.geometry):[]}function yb(s,t,e,n,r,a,l){if(!Pa&&fo===0)return s;const u=new Float32Array(s),h=e.maxLat-e.minLat,d=e.maxLon-e.minLon,p=r>0&&a>0?l/a*r:0;for(const m of n)if(!(!m.tags||!(m.tags.natural==="water"||m.tags.waterway==="riverbank"))&&Ya[np(m.tags)]!==!1)for(const _ of Xc(m)){if(_.length<3)continue;let M=1/0,w=-1/0,v=1/0,y=-1/0;for(const U of _)U.lat<M&&(M=U.lat),U.lat>w&&(w=U.lat),U.lon<v&&(v=U.lon),U.lon>y&&(y=U.lon);const D=Math.max(0,Math.floor((e.maxLat-w)/h*(t-1))),b=Math.min(t-1,Math.ceil((e.maxLat-M)/h*(t-1))),C=Math.max(0,Math.floor((v-e.minLon)/d*(t-1))),B=Math.min(t-1,Math.ceil((y-e.minLon)/d*(t-1))),N=[];let R=1/0;for(let U=D;U<=b;U++){const P=e.maxLat-U/(t-1)*h;for(let E=C;E<=B;E++)if(vb(P,e.minLon+E/(t-1)*d,_)){const z=U*t+E;N.push(z),u[z]<R&&(R=u[z])}}for(const U of N)Pa&&(u[U]=R),u[U]+=fo*p}return u}function Qr(s,t){return s.natural==="wood"?t.lc_forest_detailed===!0:s.landuse==="forest"?t.lc_forest===!0:s.natural==="grassland"||s.landuse==="grass"?t.lc_grass===!0:s.landuse==="meadow"?t.lc_grass_detailed===!0:s.landuse==="farmland"?t.lc_crop===!0:s.natural==="fell"||s.natural==="moor"?t.lc_moss===!0:s.natural==="heath"?t.lc_shrub===!0:s.natural==="scrub"?t.lc_scrub===!0:s.natural==="wetland"?s.wetland==="mangrove"?t.lc_mangrove===!0:t.lc_wetland===!0:s.natural==="mud"?t.lc_wetland_detailed===!0:s.natural==="glacier"?t.lc_glacier===!0:s.natural==="snow"?t.lc_snow===!0:s.natural==="bare_rock"?t.lc_rock===!0:s.natural==="scree"?t.lc_barren===!0:s.natural==="sand"?t.lc_sand===!0||t.lc_desert===!0:!1}const Pc=[{id:"veg_low",match:s=>Qr(s,Gi.veg_low??{}),slot:3,fill:!0},{id:"veg_dense",match:s=>Qr(s,Gi.veg_dense??{}),slot:4,fill:!0},{id:"wetland",match:s=>Qr(s,Gi.wetland_lc??{}),slot:3,fill:!0},{id:"snow",match:s=>Qr(s,Gi.snow_lc??{}),slot:2,fill:!0},{id:"barren",match:s=>Qr(s,Gi.barren_lc??{}),slot:1,fill:!0},{id:"water",match:s=>s.natural==="water"&&(()=>{const t=np(s);return t==="water_canal"?Wi.canal_polygons!==!1:Ya[t]!==!1})(),slot:5,fill:!0},{id:"river_polygons",match:s=>s.waterway==="riverbank"&&Wi.river_polygons!==!1,slot:5,fill:!0},{id:"waterways",match:s=>!!s.waterway&&s.waterway!=="riverbank"&&_b(s),slot:5,fill:!1}];function ip(s,t){const e=n=>{if(n.length<3)return 0;let r=0;for(let a=0,l=n.length-1;a<n.length;l=a++)r+=(n[l].lon+n[a].lon)*(n[l].lat-n[a].lat);return Math.abs(r)/2*(t*111320)*111320};return s.type==="way"&&s.geometry?e(s.geometry):s.type==="relation"&&s.members?s.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,r)=>n+e(r.geometry),0):0}function fr(s,t,e,n,r,a,l,u,h,d,p){const m=tb,g=document.createElement("canvas");g.width=g.height=m;const _=g.getContext("2d");{const C=rc(he[Re.veg_low??3]??"#8ab858"),B=rc(he[Re.veg_dense??4]??"#3a6828"),N=rc(he[Re.base??1]??"#c0af88"),R=document.createElement("canvas");R.width=e,R.height=e;const U=R.getContext("2d"),P=U.createImageData(e,e),E=P.data;for(let z=0;z<e;z++)for(let q=0;q<e;q++){const k=Math.max(0,Math.min(1,(t[z*e+q]-n)/(r||1))),W=k<.4?Zd(C,B,k/.4):k<.65?Zd(B,N,(k-.4)/.25):N,X=(z*e+q)*4;E[X]=W[0],E[X+1]=W[1],E[X+2]=W[2],E[X+3]=255}U.putImageData(P,0,0),_.drawImage(R,0,0,m,m)}const M=document.getElementById("cp-filter"),w=M?Number(M.value):100,v=Math.cos((s.minLat+s.maxLat)/2*Math.PI/180),y=(s.maxLon-s.minLon)*v*111320*(s.maxLat-s.minLat)*111320,D=Math.pow(1-w/100,2)*.02*y;for(const C of Pc){if(!Fn[C.id])continue;const B=a.filter(U=>!U.tags||!C.match(U.tags)?!1:C.fill&&D>0?ip(U,v)>=D:!0);if(!B.length)continue;const N=Re[C.id]??C.slot,R=he[N]??"#888";if(C.fill){_.beginPath();for(const U of B)Gd(_,U,s,m);_.fillStyle=R,_.fill("evenodd")}}{const C=l/(e-1),B=u/(e-1),N=h/(r>0?r:1),R=-.5,U=.7071,P=-.5,E=new Float32Array(e*e);for(let k=0;k<e;k++)for(let W=0;W<e;W++){const X=Math.max(0,W-1),J=Math.min(e-1,W+1),ht=Math.max(0,k-1),F=Math.min(e-1,k+1),rt=(t[k*e+J]-t[k*e+X])/((J-X)*C),Z=(t[F*e+W]-t[ht*e+W])/((F-ht)*B),dt=rt*N,bt=Z*N,Dt=Math.sqrt(dt*dt+1+bt*bt),K=(-dt*R+U-bt*P)/Dt;E[k*e+W]=Math.max(.35,Math.min(1.3,.45+.85*Math.max(0,K)))}const z=_.getImageData(0,0,m,m),q=z.data;for(let k=0;k<m;k++)for(let W=0;W<m;W++){const X=W/(m-1)*(e-1),J=k/(m-1)*(e-1),ht=Math.min(e-2,Math.floor(X)),F=Math.min(e-2,Math.floor(J)),rt=X-ht,Z=J-F,dt=E[F*e+ht]*(1-rt)*(1-Z)+E[F*e+ht+1]*rt*(1-Z)+E[(F+1)*e+ht]*(1-rt)*Z+E[(F+1)*e+ht+1]*rt*Z,bt=(k*m+W)*4;q[bt]=q[bt]*dt>255?255:q[bt]*dt,q[bt+1]=q[bt+1]*dt>255?255:q[bt+1]*dt,q[bt+2]=q[bt+2]*dt>255?255:q[bt+2]*dt}_.putImageData(z,0,0)}if((Fn.roads??!0)&&d.length>0){const C=Re.roads??8,B=he[C]??"#262626",N=(s.minLat+s.maxLat)/2,R=Math.cos(N*Math.PI/180),U=(s.maxLon-s.minLon)*R*111320,P=m/U;_.lineCap="round",_.lineJoin="round";for(const E of d){const z=ep(E.hwType)*P*ja,q=Math.max(4,z);_.beginPath();let k=!0;for(const W of E.geom){const X=(W.lon-s.minLon)/(s.maxLon-s.minLon)*m,J=(1-(W.lat-s.minLat)/(s.maxLat-s.minLat))*m;k?(_.moveTo(X,J),k=!1):_.lineTo(X,J)}_.strokeStyle=B,_.lineWidth=q,_.stroke()}}if((Fn.buildings??!0)&&p.length>0){const C=Re.buildings??7,B=he[C]??"#b8b8b8";_.fillStyle=B,_.beginPath();for(const N of p){const R=Xc(N);if(!R.length)continue;const U=R[0];if(!(U.length<3)){for(let P=0;P<U.length;P++){const E=(U[P].lon-s.minLon)/(s.maxLon-s.minLon)*m,z=(1-(U[P].lat-s.minLat)/(s.maxLat-s.minLat))*m;P===0?_.moveTo(E,z):_.lineTo(E,z)}_.closePath()}}_.fill("nonzero")}for(const C of Pc){if(C.fill||!Fn[C.id])continue;const B=a.filter(U=>U.tags&&C.match(U.tags));if(!B.length)continue;const N=Re[C.id]??C.slot,R=he[N]??"#888";for(const U of B){if(!U.tags)continue;const P=U.tags.waterway??"",E=(P==="river"?7:P==="canal"?5:P==="stream"?2.5:1.5)*oo;_.beginPath(),Gd(_,U,s,m),_.strokeStyle=R,_.lineWidth=E,_.lineCap="round",_.lineJoin="round",_.stroke()}}const b=new Df(g);return Sn&&(b.anisotropy=Sn.capabilities.getMaxAnisotropy()),b}function Gd(s,t,e,n){const r=a=>{if(!(!a||a.length<2))for(let l=0;l<a.length;l++){const u=(a[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,h=(1-(a[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?s.moveTo(u,h):s.lineTo(u,h)}};if(t.type==="way"&&t.geometry)r(t.geometry);else if(t.type==="relation"&&t.members)for(const a of t.members)(a.role==="outer"||a.role==="inner")&&a.geometry&&r(a.geometry)}function xb(s,t,e,n,r){if(!s||s.length<3||t==="rect"||t==="sq")return null;const a=512,l=document.createElement("canvas");l.width=l.height=a;const u=l.getContext("2d");u.fillStyle="black",u.fillRect(0,0,a,a),u.fillStyle="white",u.beginPath();for(let h=0;h<s.length;h++){const[d,p]=s[h],m=(p-e.minLon)/(e.maxLon-e.minLon)*a,g=(1-(d-e.minLat)/(e.maxLat-e.minLat))*a;h===0?u.moveTo(m,g):u.lineTo(m,g)}return u.closePath(),u.fill(),new Df(l)}function Mb(s,t,e,n,r){return!s||s.length<3||t==="rect"||t==="sq"?[[-n/2,-r/2],[n/2,-r/2],[n/2,r/2],[-n/2,r/2]]:s.map(([a,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(a-e.minLat)/(e.maxLat-e.minLat))*r-r/2])}function bb(s,t,e,n,r,a){if(t==="rect"||t==="sq"){const h=new Ri(e+a*2,r,n+a*2);return h.translate(0,r/2,0),h}const l=new Ga;if(t==="circ"){const h=e/2+a,d=n/2+a;for(let p=0;p<=64;p++){const m=p/64*Math.PI*2;p===0?l.moveTo(Math.cos(m)*h,Math.sin(m)*d):l.lineTo(Math.cos(m)*h,Math.sin(m)*d)}}else{l.moveTo(s[0][0],s[0][1]);for(let h=1;h<s.length;h++)l.lineTo(s[h][0],s[h][1]);l.closePath()}const u=new vo(l,{depth:r,bevelEnabled:!1});return u.rotateX(-Math.PI/2),u}function Sb(s,t,e,n,r,a,l,u,h,d,p,m,g){const _=(w,v)=>{const y=Math.max(0,Math.min(1,(w+e/2)/e)),D=Math.max(0,Math.min(1,(v+n/2)/n)),b=y*(h-1),C=D*(h-1),B=Math.min(h-2,Math.floor(b)),N=Math.min(h-2,Math.floor(C)),R=b-B,U=C-N,P=u[N*h+B]*(1-R)*(1-U)+u[N*h+B+1]*R*(1-U)+u[(N+1)*h+B]*(1-R)*U+u[(N+1)*h+B+1]*R*U;return m+(P-d)/p*g};return t==="rect"||t==="sq"?a?wb(e,n,r,l):Eb(e,n,r,h,u,d,p,m,g):Tb(s,r,a?()=>l:_)}function wb(s,t,e,n){const r=(a,l,u,h,d)=>{const p=new Ve(new Ri(a,l,u));return p.position.set(h,l/2,d),p};return[r(s+e*2,n,e,0,t/2+e/2),r(s+e*2,n,e,0,-t/2-e/2),r(e,n,t,s/2+e/2,0),r(e,n,t,-s/2-e/2,0)]}function Eb(s,t,e,n,r,a,l,u,h){const d=(D,b)=>u+(r[b*n+D]-a)/l*h,p=Math.min(n-1,64),m=D=>Math.round(D/p*(n-1)),g=d(0,n-1),_=d(n-1,n-1),M=d(0,0),w=d(n-1,0),v=[[-s/2-e,t/2,g],...Array.from({length:p+1},(D,b)=>{const C=m(b);return[-s/2+C/(n-1)*s,t/2,d(C,n-1)]}),[s/2+e,t/2,_]],y=[[s/2+e,-t/2,w],...Array.from({length:p+1},(D,b)=>{const C=m(b);return[s/2-C/(n-1)*s,-t/2,d(n-1-C,0)]}),[-s/2-e,-t/2,M]];return[eo(v,[0,0,1],e),eo(y,[0,0,-1],e),eo(Array.from({length:p+1},(D,b)=>{const C=m(b);return[s/2,t/2-C/(n-1)*t,d(n-1,n-1-C)]}),[1,0,0],e),eo(Array.from({length:p+1},(D,b)=>{const C=m(b);return[-s/2,-t/2+C/(n-1)*t,d(0,C)]}),[-1,0,0],e)]}function Tb(s,t,e){const n=[],r=s.length;for(let a=0;a<r;a++){const[l,u]=s[a],[h,d]=s[(a+1)%r],p=h-l,m=d-u,g=Math.sqrt(p*p+m*m);if(g<.5)continue;const _=m/g,M=-p/g,w=Math.max(2,Math.round(g/3)),v=[];for(let y=0;y<=w;y++){const D=y/w,b=l+p*D,C=u+m*D;v.push([b,C,e(b,C)])}n.push(eo(v,[_,0,M],t))}return n}function eo(s,t,e){const n=s.length,[r,,a]=t,l=[],u=[];for(const[_,M,w]of s)l.push(_+r*e,0,M+a*e),l.push(_+r*e,w,M+a*e);for(const[_,M,w]of s)l.push(_,0,M),l.push(_,w,M);for(const[_,M,w]of s)l.push(_+r*e,w,M+a*e),l.push(_,w,M);for(const[_,M]of s)l.push(_+r*e,0,M+a*e),l.push(_,0,M);const h=0,d=n*2,p=n*4,m=n*6;for(let _=0;_<n-1;_++){const M=_*2;u.push(h+M,h+M+2,h+M+1,h+M+1,h+M+2,h+M+3),u.push(d+M,d+M+1,d+M+2,d+M+1,d+M+3,d+M+2),u.push(p+M,p+M+1,p+M+2,p+M+1,p+M+3,p+M+2),u.push(m+M,m+M+2,m+M+1,m+M+1,m+M+2,m+M+3)}const g=new gn;return g.setAttribute("position",new nn(l,3)),g.setIndex(u),g.computeVertexNormals(),new Ve(g)}async function Ab(s){const t=`${s.minLat}|${s.maxLat}|${s.minLon}|${s.maxLon}`;if(t===zd)return;const e=`(${s.minLat},${s.minLon},${s.maxLat},${s.maxLon})`,n=`[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${e};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${e};
  way["piste:type"]${e};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${e};
);
out geom;`,r=new AbortController,a=setTimeout(()=>r.abort(),45e3);let l;try{const h=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(n)}`,{signal:r.signal});clearTimeout(a),l=await h.json()}catch(h){throw clearTimeout(a),h}for(const h of Object.keys(sr))delete sr[h];const u=(h,d)=>{sr[h]||(sr[h]=[]),sr[h].push(d)};for(const h of l.elements)if(h.type==="way"){const d=h.tags??{},p=h.geometry??[];if(p.length<2)continue;if(d.highway){const g={motorway:"road_motorway",motorway_link:"road_motorway",trunk:"road_trunk",trunk_link:"road_trunk",primary:"road_primary",primary_link:"road_primary",secondary:"road_secondary",secondary_link:"road_secondary",tertiary:"road_tertiary",tertiary_link:"road_tertiary",unclassified:"road_unclassified",living_street:"street_living",residential:"street_residential"}[d.highway];g&&u(g,p)}d.railway&&u({narrow_gauge:"rail_narrow",rail:"rail_standard",light_rail:"rail_light",funicular:"rail_funicular",monorail:"rail_monorail",tram:"rail_tram",subway:"rail_subway"}[d.railway]??"rail_unknown",p),d["piste:type"]&&u({easy:"piste_easy",novice:"piste_novice",intermediate:"piste_intermediate",advanced:"piste_advanced",expert:"piste_expert",freeride:"piste_freeride"}[d["piste:difficulty"]??""]??"piste_other",p)}else if(h.type==="relation"){const d=h.tags??{},p=d.route??"",m=d.network??"",g=(h.members??[]).filter(v=>v.type==="way"&&(v.geometry?.length??0)>=2).map(v=>v.geometry);if(!g.length)continue;const M={hiking:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},foot:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},bicycle:{icn:"cycling_icn",ncn:"cycling_ncn",rcn:"cycling_rcn",lcn:"cycling_lcn"},mtb:{"":"mtb_local"},horse:{ihwn:"equestrian_iwn",nhwn:"equestrian_nwn",rhwn:"equestrian_rwn",lhwn:"equestrian_lwn"}}[p];if(!M)continue;let w;if(p==="mtb"){const v=d["mtb:scale"]??"";w=v?`mtb_${v}`:"mtb_local"}else w=M[m]??Object.values(M).at(-1);for(const v of g)u(w,v)}zd=t,qc()}function Wd(s,t){Da[s]=t,qc()}function qc(){if(li){Ae?.remove(li);const p=sn.indexOf(li);p>=0&&sn.splice(p,1),li=null}if(!ee||!Ae)return;const{grid:s,minE:t,elevRange:e,bounds:n}=ee,r=Cn,a=zn,l=Hn,u=Ss,h=Jn,d=new vs;for(const[p,m]of Object.entries(sr)){if(Da[p]===!1)continue;const g=Lb(p),_=new Va({color:g});for(const M of m){const w=[];for(const v of M){const y=(v.lon-n.minLon)/(n.maxLon-n.minLon),D=(v.lat-n.minLat)/(n.maxLat-n.minLat);if(y<0||y>1||D<0||D>1)continue;const b=(y-.5)*a,C=(.5-D)*l,B=y*(r-1),N=(1-D)*(r-1),R=Math.min(r-2,Math.floor(B)),U=Math.min(r-2,Math.floor(N)),P=B-R,E=N-U,z=s[U*r+R]*(1-P)*(1-E)+s[U*r+R+1]*P*(1-E)+s[(U+1)*r+R]*(1-P)*E+s[(U+1)*r+R+1]*P*E;w.push(new V(b,u+(z-t)/e*h+.6,C))}w.length>=2&&d.add(new Uc(new gn().setFromPoints(w),_))}}d.children.length>0&&(Ae.add(d),sn.push(d),li=d)}function Lb(s){return s.startsWith("road_motorway")?14820122:s.startsWith("road_trunk")?15041054:s.startsWith("road_primary")?16110375:s.startsWith("road_secondary")?13951528:s.startsWith("road_tertiary")?11184810:s.startsWith("road_")?13421772:s.startsWith("street_")?14540253:s.startsWith("rail_")?5592439:s.startsWith("hiking_")?16737792:s.startsWith("cycling_")?26316:s.startsWith("mtb_")?8930304:s.startsWith("equestrian_")?10053171:s.startsWith("piste_easy")?43775:s.startsWith("piste_novice")?52292:s.startsWith("piste_intermediate")?13378082:s.startsWith("piste_")?2236962:8947848}function Pb(s,t){const e=new Ga;switch(s){case"square":e.moveTo(-t,-t),e.lineTo(t,-t),e.lineTo(t,t),e.lineTo(-t,t),e.closePath();break;case"diamond":e.moveTo(0,-t),e.lineTo(t*.72,0),e.lineTo(0,t),e.lineTo(-t*.72,0),e.closePath();break;case"triangle":e.moveTo(0,t),e.lineTo(t*.866,-t*.5),e.lineTo(-t*.866,-t*.5),e.closePath();break;case"cross":{const n=t*.32;e.moveTo(-n,-t),e.lineTo(n,-t),e.lineTo(n,-n),e.lineTo(t,-n),e.lineTo(t,n),e.lineTo(n,n),e.lineTo(n,t),e.lineTo(-n,t),e.lineTo(-n,n),e.lineTo(-t,n),e.lineTo(-t,-n),e.lineTo(-n,-n),e.closePath();break}case"heart":{e.moveTo(0,-t*.25),e.bezierCurveTo(-t*.05,-t*.55,-t,-t*.55,-t,t*.1),e.bezierCurveTo(-t,t*.65,-t*.45,t*.88,0,t),e.bezierCurveTo(t*.45,t*.88,t,t*.65,t,t*.1),e.bezierCurveTo(t,-t*.55,t*.05,-t*.55,0,-t*.25),e.closePath();break}case"star":{const n=t,r=t*.42;for(let a=0;a<10;a++){const l=a*Math.PI/5-Math.PI/2,u=a%2===0?n:r,h=Math.cos(l)*u,d=Math.sin(l)*u;a===0?e.moveTo(h,d):e.lineTo(h,d)}e.closePath();break}default:e.absarc(0,0,t,0,Math.PI*2,!1);break}return e}function Mr(s,t,e,n){const r=Math.max(0,Math.min(t-2,e*(t-1))),a=Math.max(0,Math.min(t-2,n*(t-1))),l=Math.floor(r),u=Math.floor(a),h=r-l,d=a-u;return s[u*t+l]*(1-h)*(1-d)+s[u*t+l+1]*h*(1-d)+s[(u+1)*t+l]*(1-h)*d+s[(u+1)*t+l+1]*h*d}function $c(s,t){if(!ee||!Ae)return;const{grid:e,minE:n,elevRange:r}=ee,a=Cn,l=zn,u=Hn,h=Ss,d=Jn,p=.42,m=.2,g=s.diameterMult*p/2,_=.5,M=s.heightOffMult*m,w=s.lonFrac,v=1-s.latFrac,y=(w-.5)*l,D=(.5-(1-v))*u;let b;if(s.flatTop){let E=-1/0;const z=8;for(let q=0;q<=z;q++)for(let k=0;k<=z;k++){const W=q/z,X=k/z,J=w+(W-.5)*(g*2)/l,ht=v+(X-.5)*(g*2)/u,F=Math.max(0,Math.min(1,J)),rt=Math.max(0,Math.min(1,ht)),Z=Mr(e,a,F,rt);Z>E&&(E=Z)}b=h+(E-n)/r*d}else{const E=Mr(e,a,w,v);b=h+(E-n)/r*d}const C=Re.gpx??6,B=he[C]??"#ff4500",N=new $i({color:B,side:Bn}),R=Pb(s.shape,g),U=new vo(R,{depth:_,bevelEnabled:!1});U.rotateX(-Math.PI/2),s.rotDeg!==0&&U.rotateY(s.rotDeg*Math.PI/180);const P=new Ve(U,N);P.position.set(y,b+M,D),P.visible=s.visible&&(Fn.gpx??!0),xo.set(P,s.id),t>=Kn.length?(fs(P),Kn.push(P)):(Ae.add(P),sn.push(P),Kn.splice(t,0,P))}function sc(s,t,e,n,r,a,l,u,h,d,p){const m=Math.max(0,Math.min(1,s/e+.5)),g=Math.max(0,Math.min(1,.5-t/n)),_=m*(a-1),M=(1-g)*(a-1),w=Math.min(a-2,Math.floor(_)),v=Math.min(a-2,Math.floor(M)),y=_-w,D=M-v,b=r[v*a+w]*(1-y)*(1-D)+r[v*a+w+1]*y*(1-D)+r[(v+1)*a+w]*(1-y)*D+r[(v+1)*a+w+1]*y*D;return h+(b-l)/u*d+p}function Cb(s,t,e,n,r,a,l,u,h,d){const m=bc*.21+.05+qf*.2,g=[];for(const D of s){const b=Math.max(5e-4,Math.min(.9995,(D.lon-t.minLon)/(t.maxLon-t.minLon))),C=Math.max(5e-4,Math.min(.9995,(D.lat-t.minLat)/(t.maxLat-t.minLat))),B=(b-.5)*e,N=(.5-C)*n;g.push(new V(B,sc(B,N,e,n,r,a,l,u,h,d,m),N))}if(g.length<2)return null;const _=1,M=[g[0]];for(let D=0;D<g.length-1;D++){const b=g[D],C=g[D+1],B=C.x-b.x,N=C.z-b.z,R=Math.sqrt(B*B+N*N),U=Math.max(1,Math.floor(R/_));for(let P=1;P<=U;P++){const E=P/U,z=b.x+B*E,q=b.z+N*E,k=sc(z,q,e,n,r,a,l,u,h,d,m),W=new V(z,k,q);W.distanceTo(M[M.length-1])>=.08&&M.push(W)}}if(M.length<2)return null;const w=Re.gpx_line??6,v=he[w]??"#ff4500",y=bc*.21;if(y>=.1){const D=new _c(M,!1,"centripetal"),b=Math.min(2e3,Math.max(80,M.length*5)),C=D.getSpacedPoints(b);for(const N of C){const R=sc(N.x,N.z,e,n,r,a,l,u,h,d,m-y);N.y<R&&(N.y=R)}const B=new Fc(new _c(C,!1,"centripetal"),b,y,8,!1);return new Ve(B,new $i({color:v}))}return new Uc(new gn().setFromPoints(M),new Va({color:v}))}function Zd(s,t,e){return[Math.round(s[0]+(t[0]-s[0])*e),Math.round(s[1]+(t[1]-s[1])*e),Math.round(s[2]+(t[2]-s[2])*e)]}function rc(s){const t=parseInt(s.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}async function Rb(s){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=r=>{r.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:r.data.elevGrid,minE:r.data.minE,elevRange:r.data.elevRange,bounds:s})):r.data.type==="ERROR"&&(n.terminate(),e(new Error(r.data.message)))},n.onerror=r=>{n.terminate(),e(r)},n.postMessage({type:"BUILD_TERRAIN",bounds:s,GRID:Cn,elevZoom:12})})}function fs(s){Ae.add(s),sn.push(s)}function er(s,t){const e=document.getElementById(s);e&&(e.textContent=t)}function Ib(){sn.forEach(s=>{Ae.remove(s),s.geometry?.dispose()}),sn=[],cr.length=0}function Db(){if(!mn||!Sn)return;const s=Sn.domElement.clientWidth,t=Sn.domElement.clientHeight;if(!(!s||!t))for(const{id:e,v:n}of cr){const r=document.getElementById(e);if(!r)continue;const a=n.clone().project(mn);if(a.z>1){r.style.opacity="0";continue}r.style.opacity="1",r.style.left=`${(a.x+1)/2*s}px`,r.style.top=`${-(a.y-1)/2*t}px`}}let Ei=null;function sp(s){if(!jt)return null;try{const e=Math.min(s*4,2048),n=e/s,r=document.createElement("canvas");r.width=r.height=e;const a=r.getContext("2d");a.drawImage(jt.image,0,0,e,e);const l=a.getImageData(0,0,e,e).data,u=new Uint8ClampedArray(s*s*4);for(let h=0;h<s;h++){const d=Math.floor(h*n),p=Math.min(Math.ceil((h+1)*n),e);for(let m=0;m<s;m++){const g=Math.floor(m*n),_=Math.min(Math.ceil((m+1)*n),e);let M=0,w=0,v=0,y=0,D=0,b=0,C=0,B=!1;for(let R=d;R<p;R++)for(let U=g;U<_;U++){const P=(R*e+U)*4,E=l[P],z=l[P+1],q=l[P+2];M+=E,w+=z,v+=q,y++,!B&&q>E+25&&q>z+25&&q>70&&(D=E,b=z,C=q,B=!0)}const N=(h*s+m)*4;u[N]=B?D:M/y,u[N+1]=B?b:w/y,u[N+2]=B?C:v/y,u[N+3]=255}}return u}catch{return null}}function Nb(s=.2){if(!Ae||!Ye||!ee)return;const t=Math.max(.01,s),e=zn,n=Hn,r=Ss,a=Jn,{minE:l,elevRange:u}=ee,h=Cn,d=Xa??ee.grid,p=Math.min(500,Math.max(150,Math.round(Math.max(e,n)/.5))),m=e/p,g=n/p,_=sp(p),M=new ne(he[Re.veg_low??3]??"#8ab858");po();const w=p*p,v=new Ri(m,1,g),y=new $i({color:16777215}),D=new Zx(v,y,w),b=new Je,C=new ne;for(let B=0,N=0;B<p;B++)for(let R=0;R<p;R++,N++){const U=(R+.5)/p,P=(B+.5)/p,E=(U-.5)*e,z=(.5-P)*n;if(Qn&&!Mo(E,z,Qn)){b.scale.setScalar(0),b.position.set(E,r,z),b.updateMatrix(),D.setMatrixAt(N,b.matrix),b.scale.setScalar(1);continue}const k=(Mr(d,h,U,1-P)-l)/u*a;let W=0,X=0,J=0,ht=!1;if(_){const rt=((p-1-B)*p+R)*4;W=_[rt],X=_[rt+1],J=_[rt+2],ht=J>W+25&&J>X+25&&J>70}const F=Math.max(t,Math.ceil(k/t)*t-(ht?2*t:0));b.position.set(E,r+F/2,z),b.scale.set(1,F,1),b.updateMatrix(),D.setMatrixAt(N,b.matrix),_?C.setRGB(W/255,X/255,J/255):C.copy(M),D.setColorAt(N,C)}D.instanceMatrix.needsUpdate=!0,D.instanceColor&&(D.instanceColor.needsUpdate=!0),Ei=new vs,Ei.add(D),Ae.add(Ei),sn.push(Ei),Ye.visible=!1;for(const B of qa)B.visible=!1;Ln&&(Ln.visible=!1),li&&(li.visible=!1)}async function Ob(s){if(!ee||!jt){alert(`Ouvrez d'abord l'onglet "Aperçu" pour générer la prévisualisation.`);return}const t=.2,e=zn,n=Hn,r=Ss,a=Jn,{minE:l,elevRange:u}=ee,h=Cn,d=Xa??ee.grid,p=Math.min(150,Math.max(60,Math.round(Math.max(e,n)/1.5))),m=e/p,g=n/p,_=sp(p);function M(X,J,ht){let F=1,rt=1/0;for(const[Z,dt]of Object.entries(he)){const bt=new ne(dt),Dt=(bt.r-X/255)**2+(bt.g-J/255)**2+(bt.b-ht/255)**2;Dt<rt&&(rt=Dt,F=Number(Z))}return F}const w=new Map,v=new Map;for(let X=0;X<p;X++)for(let J=0;J<p;J++){const ht=(J+.5)/p,F=(X+.5)/p,rt=(ht-.5)*e,Z=(.5-F)*n;if(Qn&&!Mo(rt,Z,Qn))continue;const bt=(Mr(d,h,ht,1-F)-l)/u*a,Dt=((p-1-X)*p+J)*4;let K=1,ct=!1;if(_){const Ut=_[Dt],Lt=_[Dt+1],Et=_[Dt+2];ct=Et>Ut+25&&Et>Lt+25&&Et>70,K=M(Ut,Lt,Et)}const pt=Math.max(t,Math.ceil(bt/t)*t-(ct?2*t:0)),yt=`${J},${X}`;w.set(yt,{slot:K,h:pt}),v.has(K)||v.set(K,new Map),v.get(K).set(yt,pt)}function y(X,J){let ht="",F="",rt=0;function Z(dt,bt,Dt,K,ct,pt,yt,Ut,Lt,Et,G,it){ht+=`<vertex x="${dt.toFixed(3)}" y="${bt.toFixed(3)}" z="${Dt.toFixed(3)}"/><vertex x="${K.toFixed(3)}" y="${ct.toFixed(3)}" z="${pt.toFixed(3)}"/><vertex x="${yt.toFixed(3)}" y="${Ut.toFixed(3)}" z="${Lt.toFixed(3)}"/><vertex x="${Et.toFixed(3)}" y="${G.toFixed(3)}" z="${it.toFixed(3)}"/>`,F+=`<triangle v1="${rt}" v2="${rt+1}" v3="${rt+2}"/><triangle v1="${rt}" v2="${rt+2}" v3="${rt+3}"/>`,rt+=4}for(const[dt,bt]of J){const[Dt,K]=dt.split(",").map(Number),ct=(Dt+.5)/p,pt=(K+.5)/p,yt=(ct-.5)*e,Ut=(.5-pt)*n,Lt=yt-m/2,Et=yt+m/2,G=Ut-g/2,it=Ut+g/2,ot=0,ft=r+bt;Z(Lt,G,ft,Et,G,ft,Et,it,ft,Lt,it,ft),Z(Lt,it,ot,Et,it,ot,Et,G,ot,Lt,G,ot);const vt=w.get(`${Dt+1},${K}`);if(!vt||vt.slot!==X)Z(Et,G,ot,Et,it,ot,Et,it,ft,Et,G,ft);else if(vt.h<bt){const $=r+vt.h;Z(Et,G,$,Et,it,$,Et,it,ft,Et,G,ft)}const xt=w.get(`${Dt-1},${K}`);if(!xt||xt.slot!==X)Z(Lt,it,ot,Lt,G,ot,Lt,G,ft,Lt,it,ft);else if(xt.h<bt){const $=r+xt.h;Z(Lt,it,$,Lt,G,$,Lt,G,ft,Lt,it,ft)}const O=w.get(`${Dt},${K-1}`);if(!O||O.slot!==X)Z(Et,it,ot,Lt,it,ot,Lt,it,ft,Et,it,ft);else if(O.h<bt){const $=r+O.h;Z(Et,it,$,Lt,it,$,Lt,it,ft,Et,it,ft)}const T=w.get(`${Dt},${K+1}`);if(!T||T.slot!==X)Z(Lt,G,ot,Et,G,ot,Et,G,ft,Lt,G,ft);else if(T.h<bt){const $=r+T.h;Z(Lt,G,$,Et,G,$,Et,G,ft,Lt,G,ft)}}return{vx:ht,tr:F}}if(!v.size){alert("Aucune donnée à exporter.");return}const D=[];let b=1;for(const[X,J]of v){const{vx:ht,tr:F}=y(X,J);F&&D.push({id:b++,name:`terrain_s${X}`,col:(he[X]??"#888888").replace("#",""),vx:ht,tr:F})}if(!D.length){alert("Aucun maillage à exporter.");return}const C=D.map(X=>`<basematerials id="${X.id+1e3}"><base name="${X.name}" displaycolor="#${X.col}"/></basematerials>`).join(`
`),B=D.map(X=>`<object id="${X.id}" type="model" pid="${X.id+1e3}" pindex="0"><mesh><vertices>${X.vx}</vertices><triangles>${X.tr}</triangles></mesh></object>`).join(`
`),N=D.map(X=>`<item objectid="${X.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),R=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",C,B,"  </resources>","  <build>",N,"  </build>","</model>"].join(`
`),U='<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>',P='<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/></Types>',{default:E}=await VM(async()=>{const{default:X}=await import("./jszip.min-BCtesgVg.js").then(J=>J.j);return{default:X}},[]),z=new E;z.file("[Content_Types].xml",P),z.folder("_rels").file(".rels",U),z.folder("3D").file("3dmodel.model",R);const q=await z.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),k=URL.createObjectURL(q),W=document.createElement("a");W.href=k,W.download=s??`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(W),W.click(),document.body.removeChild(W),URL.revokeObjectURL(k)}function po(){if(Ae){if(Ei){Ae.remove(Ei);const s=sn.indexOf(Ei);s>=0&&sn.splice(s,1),Ei.traverse(t=>{const e=t;e.geometry?.dispose(),Array.isArray(e.material)?e.material.forEach(n=>n.dispose()):e.material?.dispose()}),Ei=null}Ye&&(Ye.visible=!0);for(const s of qa)s.visible=Fn[s.__zoneLayerId]??!0;Ln&&(Ln.visible=Fn.roads??!0),li&&(li.visible=!0)}}function Ub(){const s=document.getElementById("zone-footer");s&&(It.bounds?(s.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),ub()):(s.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-apercu-btn")?.setAttribute("disabled","")))}let br=!1,oc=!1,Sr="";function bn(){const s=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:s("dp-w",It.wMm||200),dMm:s("dp-d",It.dMm||200),baseH:s("dp-base",5),exag:s("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:s("dp-walls",2),gpxPoints:It.gpxPoints,zoneType:It.zoneType,zonePts:It.zonePts,bounds:It.bounds}}function Yc(){const s=(g,_)=>{const M=document.getElementById(g);M&&(M.value=String(Math.round(_)))};if(!It.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:r}=It.bounds,a=(t+e)/2,l=(r-n)*Math.cos(a*Math.PI/180)*111320,u=(e-t)*111320,h=200,d=l/u,p=d>=1?h:Math.max(10,Math.round(h*d)),m=d<1?h:Math.max(10,Math.round(h/d));It.wMm=p,It.dMm=m,s("dp-w",p),s("dp-d",m)}function As(){const s=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,r=document.getElementById("dp-layers-hint"),a=document.getElementById("dp-wall-mm");r&&(r.textContent=`${Math.round(s/e)} couches`),a&&(a.textContent=`${(t*n).toFixed(2)} mm`)}async function Oa(){if(!It.bounds||oc)return;oc=!0;const s=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");s.classList.remove("hidden");try{await cb(It.bounds,bn(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{s.classList.add("hidden"),oc=!1}}function jc(){It.bounds&&(Yc(),As(),requestAnimationFrame(()=>{const s=document.getElementById("dims-view");br?(xr(s),Oa()):(br=!0,xr(s),Oa())}))}window.dpToggle=s=>{document.getElementById(s)?.classList.toggle("open")};dm();_m(Ub);document.querySelectorAll(".tab-btn").forEach(s=>{s.addEventListener("click",()=>{const t=s.dataset.tab;!t||s.disabled||(Sr=t,ws(t),t==="params"?(po(),jc()):t==="colors"?(po(),Kc()):t==="apercu"?ap():jf())})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),ws("colors"),Kc()});document.getElementById("btn-next-apercu")?.addEventListener("click",()=>{document.getElementById("tab-apercu-btn")?.removeAttribute("disabled"),ws("apercu"),ap()});document.getElementById("btn-next-render")?.addEventListener("click",async()=>{const s=document.getElementById("btn-next-render");s.querySelector("span");const t=s.innerHTML;s.disabled=!0,s.innerHTML='<span style="display:flex;align-items:center;gap:6px"><svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin 1s linear infinite"><circle cx="10" cy="10" r="7" stroke-dasharray="22 22" stroke-linecap="round"/></svg>Génération…</span>';try{await Ob(`Terrain3D_${Date.now()}.3mf`)}finally{s.disabled=!1,s.innerHTML=t}});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{Sr="zone",jf(),ws("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{Sr="params",ws("params"),jc()});document.getElementById("btn-back-colors")?.addEventListener("click",()=>{Sr="colors",po(),ws("colors"),Kc()});document.querySelectorAll(".dp-sh").forEach(s=>{s.addEventListener("click",()=>{s.closest(".dp-sec")?.classList.toggle("open")})});let Xd;const kb=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];kb.forEach(s=>{document.getElementById(s)?.addEventListener("input",()=>{As();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(It.wMm=t),e>0&&(It.dMm=e),clearTimeout(Xd),Xd=setTimeout(()=>Mn(bn()),500)})});document.getElementById("dp-walls")?.addEventListener("input",As);document.getElementById("dp-flat")?.addEventListener("change",()=>{Mn(bn())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>void 0);document.getElementById("btn-next-tab")?.addEventListener("click",()=>{It.bounds&&(ws("params"),jc())});let qd;document.querySelectorAll("#params-col input, #params-col select").forEach(s=>{s.addEventListener("change",()=>{clearTimeout(qd),qd=setTimeout(()=>{},700)}),s.addEventListener("input",()=>{if(s.type==="range"){const t=document.getElementById(`${s.id}-v`);t&&(t.textContent=s.value)}})});function rp(s){document.getElementById(s)?.classList.remove("hidden")}function op(s){document.getElementById(s)?.classList.add("hidden")}function Kc(){It.bounds&&(Yc(),requestAnimationFrame(async()=>{const s=document.getElementById("colors-3d-area");rp("colors-loading"),br?(xr(s),await new Promise(t=>requestAnimationFrame(()=>t())),Mn(bn())):(br=!0,xr(s),await Oa()),op("colors-loading"),zb()}))}function Bb(){return Number(document.getElementById("ps-layer-h")?.value??.2)}function Fb(){Nb(Bb());const s=document.getElementById("btn-print-preview");if(s){s.classList.add("active");const t=s.querySelector("span");t&&(t.textContent="Aperçu lisse")}}function ap(){It.bounds&&(Sr="apercu",Yc(),requestAnimationFrame(async()=>{const s=document.getElementById("apercu-3d-area");rp("apercu-loading"),po(),br?(xr(s),await new Promise(t=>requestAnimationFrame(()=>t())),Mn(bn())):(br=!0,xr(s),await Oa()),op("apercu-loading"),Sr==="apercu"&&Fb()}))}function zb(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(s=>{const t=Number(s.dataset.slot);he[t]&&(s.style.background=he[t])}),document.querySelectorAll(".cp-sw-inner").forEach(s=>{const e=s.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(s.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(s=>{const t=Number(s.dataset.slot);s.addEventListener("input",()=>{const n=s.value,r=s.nextElementSibling;r&&(r.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(a=>{a.style.background=n}),Lr({[t]:n})});const e=s.nextElementSibling;e&&(e.style.background=s.value)});function Hb(s,t){Lr({[s]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${s}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${s}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let nr=null;function Vb(s,t){nr&&(nr.remove(),nr=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(he).map(Number).sort((u,h)=>u-h),r=Re[s]??Number(t.dataset.slot)??1;n.forEach(u=>{const h=document.createElement("div");h.className="cp-slot-pick-item"+(u===r?" active":""),h.style.setProperty("--sw",he[u]??"#888"),h.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${u}</span>`,h.addEventListener("click",d=>{d.stopPropagation(),eb(s,u),t.dataset.slot=String(u),t.textContent=String(u),t.style.background=he[u]??"#888",e.remove(),nr=null}),e.appendChild(h)}),document.body.appendChild(e),nr=e;const a=t.getBoundingClientRect();e.style.left=`${a.left}px`,e.style.top=`${a.bottom+4}px`;const l=u=>{e.contains(u.target)||(e.remove(),nr=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const n=s.closest(".cp-layer")?.dataset.layer??"";n&&Vb(n,s)})});let ir=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(ir){ir.remove(),ir=null;return}const s=Math.max(...Object.keys(he).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,ir=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),ir=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const r=e.value;he[s]=r;const a=document.createElement("label");a.className="cp-swatch",a.dataset.slot=String(s),a.title=`Couleur ${s}`,a.innerHTML=`<input type="color" class="cp-color-input" data-slot="${s}" value="${r}"><div class="cp-sw-inner" style="background:${r}"><span class="cp-sw-num">${s}</span></div>`,a.querySelector(".cp-color-input").addEventListener("input",function(){Hb(s,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(a),t.remove(),ir=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete he[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{Lr({})});document.querySelectorAll(".cp-eye").forEach(s=>{const t=s.dataset.layer;t&&s.addEventListener("click",()=>{s.classList.toggle("hidden-layer");const e=!s.classList.contains("hidden-layer");Kf(t,e)})});const lp={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const s=document.getElementById("cp-preset").value,t=lp[s];t&&(Lr(t),Object.entries(t).forEach(([e,n])=>{const r=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(r){r.value=n;const a=r.nextElementSibling;a&&(a.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const Gb=document.getElementById("cp-dd-trigger"),Jc=document.getElementById("cp-dd-menu");Gb?.addEventListener("click",s=>{s.stopPropagation(),Jc?.classList.toggle("open")});document.addEventListener("click",()=>Jc?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const e=s.dataset.preset??"",n=s.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),s.classList.add("cp-dd-active");const r=document.getElementById("cp-dd-label");r&&(r.textContent=n),Jc?.classList.remove("open");const a=lp[e];a&&(Lr(a),Wb(a))})});function Wb(s){Object.entries(s).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const r=n.nextElementSibling;r&&(r.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);s[e]&&(t.style.background=s[e])})}const Qc=document.getElementById("cp-layer-detail"),cp=document.getElementById("ldp-title"),up=document.getElementById("ldp-icon"),hp=document.getElementById("ldp-content");function Zb(s,t,e){cp.textContent=t,up.innerHTML=e,hp.innerHTML=$b(s),Qc.classList.add("open"),nS(s)}function dp(){Qc.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",dp);document.querySelectorAll(".cp-layer-nav").forEach(s=>{s.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=s.dataset.type??"land_cover",n=s.querySelector(".cp-layer-name")?.textContent??"Couche",r=s.querySelector(".cp-layer-ico")?.innerHTML??"";Zb(e,n,r)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{cp.textContent="Nouvelle couche",up.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',hp.innerHTML=eS(),Qc.classList.add("open"),iS()});function Xb(){const s=Wc==="raised";return`
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
        <input type="number" id="ldp-road-h" min="0" max="20" step="0.05" value="${Ia.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Minimum Road Width</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-minw" min="0.1" max="10" step="0.05" value="${Gc.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Road Width Multiplier</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-mult" min="0.1" max="10" step="0.05" value="${ja.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">x</span>
      </div>
    </div>
  </div>`}function qb(){const s=Hc.toFixed(2),t=Ca.toFixed(2),e=Vc.toFixed(2),n=Ra.toFixed(2);return`
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
  </div>`}function $b(s){return s==="markers"?Kb():s==="lines"?Qb():s==="water"?jb():s==="waterways"?Yb():["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(s)?tS(s):s==="roads"?Xb():s==="buildings"?qb():""}function Yb(){const s=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=(oo*s).toFixed(2),n=(Sc*t).toFixed(2),r=Wi;return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Largeur (nb. de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Épaisseur des lignes comme multiple de la largeur de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-ww-width" class="cp-slider" min="1" max="10" step="0.5" value="${oo}">
        <input type="number" class="ldp-num" id="ldp-ww-width-n" value="${oo}" step="0.5">
        <span class="ldp-unit" id="ldp-ww-width-mm">( ${e} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-ww-offset" value="${Sc}" step="1">
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
  </div>`}function jb(){const s=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,t=(fo*s).toFixed(2),n=[{key:"water_ocean",label:"Océans"},{key:"water_lake",label:"Lacs"},{key:"water_pond",label:"Étangs"},{key:"water_reservoir",label:"Réservoirs"},{key:"water_wastewater",label:"Eaux usées"},{key:"water_human",label:"Artificiel"},{key:"water_other",label:"Autre"}].map(r=>`<label class="ldp-check-row"><input type="checkbox" class="ldp-water-feat" data-key="${r.key}"${Ya[r.key]!==!1?" checked":""}> ${r.label}</label>`).join("");return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-water-offset" value="${fo}" step="1">
        <span class="ldp-unit" id="ldp-water-offset-mm">( ${t} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <label class="ldp-check-row">
        <input type="checkbox" id="ldp-water-hydro"${Pa?" checked":""}>
        <span>Hydro-Flatten</span>
        <button class="cp-icon-btn cp-info-btn" title="Force une élévation plate pour toutes les étendues d'eau">i</button>
      </label>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    ${n}
  </div>`}function Kb(){return`
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
  </div>`}const Jb=[{label:"Itinéraires de randonnée",cats:[{key:"hiking_iwn",label:"International"},{key:"hiking_nwn",label:"National"},{key:"hiking_rwn",label:"Régional"},{key:"hiking_lwn",label:"Local"}]},{label:"Itinéraires cyclables",cats:[{key:"cycling_icn",label:"International"},{key:"cycling_ncn",label:"National"},{key:"cycling_rcn",label:"Régional"},{key:"cycling_lcn",label:"Local"}]},{label:"Parcours de VTT",cats:[{key:"mtb_0",label:"International"},{key:"mtb_1",label:"National"},{key:"mtb_2",label:"Régional"},{key:"mtb_local",label:"Local"}]},{label:"Itinéraires équestres",cats:[{key:"equestrian_iwn",label:"International"},{key:"equestrian_nwn",label:"National"},{key:"equestrian_rwn",label:"Régional"},{key:"equestrian_lwn",label:"Local"}]},{label:"Sports d'hiver",cats:[{key:"piste_easy",label:"Facile"},{key:"piste_novice",label:"Novice"},{key:"piste_intermediate",label:"Intermédiaire"},{key:"piste_advanced",label:"Avancé"},{key:"piste_expert",label:"Expert"},{key:"piste_freeride",label:"Freeride"},{key:"piste_other",label:"Autre difficulté"},{key:"piste_none",label:"Sans difficulté"}]},{label:"Routes",cats:[{key:"road_motorway",label:"Autoroute"},{key:"road_trunk",label:"Voie express"},{key:"road_primary",label:"Route nationale"},{key:"road_secondary",label:"Route départementale"},{key:"road_tertiary",label:"Voie tertiaire"},{key:"road_unclassified",label:"Non classifiée"}]},{label:"Rues",cats:[{key:"street_living",label:"Zone de rencontre"},{key:"street_residential",label:"Rue résidentielle"}]},{label:"Rails",cats:[{key:"rail_narrow",label:"Voie étroite"},{key:"rail_standard",label:"Voie standard"},{key:"rail_unknown",label:"Inconnue"},{key:"rail_funicular",label:"Funiculaire"},{key:"rail_light",label:"Tramway rapide"},{key:"rail_monorail",label:"Monorail"},{key:"rail_tram",label:"Tramway"},{key:"rail_subway",label:"Métro"}]}];function Qb(){const s='<svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg>';return`
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
    <div id="ldp-line-groups">${Jb.map(e=>{const n=e.cats.every(a=>Da[a.key]===!0),r=e.cats.map(a=>{const l=Da[a.key]===!0;return`<label class="ldp-sub-row"><input type="checkbox" class="ldp-line-sub" data-linecat="${a.key}"${l?" checked":""}> ${a.label}</label>`}).join("");return`
    <div class="ldp-line-group">
      <div class="ldp-line-group-header">
        <input type="checkbox" class="ldp-line-group-chk" data-group="${e.label}"${n?" checked":""}>
        <span class="ldp-group-label">${e.label}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories">${s}</button>
      </div>
      <div class="ldp-line-subs">${r}</div>
    </div>`}).join("")}</div>
    <div id="ldp-line-status" class="ldp-line-status"></div>
  </div>`}function tS(s){const t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=$f[s]??0,n=(e*t).toFixed(2),r=Gi[s]??{},a=(u,h,d)=>{const p=d.filter(M=>r[M.key]===!0).length,m=p===d.length,g=p>0,_=d.map(M=>`<label class="ldp-check-row ldp-lc-sub"><input type="checkbox" class="ldp-lc-feat" data-key="${M.key}"${r[M.key]===!0?" checked":""}> ${M.label}</label>`).join("");return`
    <div class="ldp-lc-group">
      <div class="ldp-lc-group-header">
        <input type="checkbox" class="ldp-lc-group-chk" data-group="${u}"${m?" checked":g?' data-indeterminate="1"':""}>
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
  </div>`}function eS(){return`
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
  </div>`}function nS(s){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(s==="markers"){const n=document.getElementById("ldp-marker-size"),r=document.getElementById("ldp-marker-size-n"),a=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),u=document.getElementById("ldp-marker-rot-n"),h=document.getElementById("ldp-marker-offset"),d=document.getElementById("ldp-offset-mm"),p=()=>{a&&(a.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},m=()=>{d&&(d.textContent=`( ${(Number(h.value||0)*e).toFixed(2)} mm )`)},g=()=>{const _=Tc();_<0||Ac(_,{diameterMult:Number(n?.value??10)||10,rotDeg:Number(l?.value??0),flatTop:document.getElementById("ldp-marker-flat")?.checked??!0,heightOffMult:Number(h?.value??0)})};n?.addEventListener("input",()=>{r&&(r.value=Number(n.value).toFixed(1)),p(),g()}),r?.addEventListener("input",()=>{n&&(n.value=r.value),p(),g()}),l?.addEventListener("input",()=>{u&&(u.value=l.value),g()}),u?.addEventListener("input",()=>{l&&(l.value=u.value),g()}),h?.addEventListener("input",()=>{m(),g()}),document.getElementById("ldp-marker-flat")?.addEventListener("change",g),p(),m(),mr(),document.querySelectorAll(".ldp-shape-btn").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(v=>v.classList.remove("active")),_.classList.add("active");const M=_.dataset.shape??"circle",w=Tc();w>=0?Ac(w,{shape:M}):(ib(M),tu(!0))})})}if(s==="lines"){const n=document.getElementById("ldp-line-w"),r=document.getElementById("ldp-line-w-n"),a=document.getElementById("ldp-line-offset"),l=()=>{const d=Math.max(.1,Number(n?.value??1)||1),p=Number(a?.value??1)||1;nb(d,p);const m=bn();m&&Mn(m)};n?.addEventListener("input",()=>{r&&(r.value=Number(n.value).toFixed(1)),l()}),r?.addEventListener("input",()=>{n&&(n.value=r.value),l()}),a?.addEventListener("input",l);const u=d=>d.closest(".ldp-line-group")?.classList.toggle("open");document.querySelectorAll(".ldp-chev-btn").forEach(d=>d.addEventListener("click",()=>u(d))),document.querySelectorAll(".ldp-group-label").forEach(d=>d.addEventListener("click",()=>u(d)));const h=()=>{if(!It.bounds)return;const d=document.getElementById("ldp-line-status");d&&(d.textContent="Chargement des données…"),Ab(It.bounds).then(()=>{d&&(d.textContent="")}).catch(()=>{d&&(d.textContent="Erreur de chargement.")})};document.querySelectorAll(".ldp-line-sub").forEach(d=>{d.addEventListener("change",()=>{Wd(d.dataset.linecat,d.checked),d.checked&&h();const p=d.closest(".ldp-line-group"),m=p?.querySelector(".ldp-line-group-chk");if(m){const g=p.querySelectorAll(".ldp-line-sub");m.checked=Array.from(g).every(_=>_.checked),m.indeterminate=!m.checked&&Array.from(g).some(_=>_.checked)}})}),document.querySelectorAll(".ldp-line-group-chk").forEach(d=>{d.addEventListener("change",()=>{d.closest(".ldp-line-group")?.querySelectorAll(".ldp-line-sub").forEach(m=>{m.checked=d.checked,Wd(m.dataset.linecat,d.checked)}),d.checked&&h()})})}if(["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(s)){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,r=document.getElementById("ldp-lc-offset"),a=document.getElementById("ldp-lc-offset-mm");r?.addEventListener("input",()=>{const u=Number(r.value??0);a&&(a.textContent=`( ${(u*n).toFixed(2)} mm )`),QM(s,u)}),document.querySelectorAll(".ldp-lc-group-chk").forEach(u=>{u.dataset.indeterminate&&(u.indeterminate=!0),u.addEventListener("change",()=>{u.closest(".ldp-lc-group")?.querySelectorAll(".ldp-lc-feat").forEach(p=>{p.checked=u.checked,Fd(s,p.dataset.key,u.checked)});const d=bn();d&&Mn(d)})});const l=u=>u.closest(".ldp-lc-group")?.classList.toggle("open");document.querySelectorAll(".ldp-lc-group .ldp-chev-btn").forEach(u=>u.addEventListener("click",()=>l(u))),document.querySelectorAll(".ldp-lc-group .ldp-group-label").forEach(u=>u.addEventListener("click",()=>l(u))),document.querySelectorAll(".ldp-lc-feat").forEach(u=>{u.addEventListener("change",()=>{Fd(s,u.dataset.key,u.checked);const h=u.closest(".ldp-lc-group"),d=h?.querySelector(".ldp-lc-group-chk");if(d){const m=Array.from(h.querySelectorAll(".ldp-lc-feat"));d.checked=m.every(g=>g.checked),d.indeterminate=!d.checked&&m.some(g=>g.checked)}const p=bn();p&&Mn(p)})})}if(s==="roads"){const n=(r,a)=>{const l=document.getElementById(r);l?.addEventListener("change",()=>{a(Number(l.value)),Lc()})};n("ldp-road-h",YM),n("ldp-road-minw",jM),n("ldp-road-mult",KM),document.querySelectorAll(".ldp-style-btn").forEach(r=>{r.addEventListener("click",()=>{document.querySelectorAll(".ldp-style-btn").forEach(a=>a.classList.remove("active")),r.classList.add("active"),JM(r.dataset.style),Lc()})})}if(s==="buildings"){const n=(r,a,l)=>{const u=document.getElementById(r),h=document.getElementById(r+"-val");u?.addEventListener("input",()=>{const d=Number(u.value);h&&(h.textContent=a(d)),l(d);const p=bn();p&&Mn(p)})};n("ldp-bld-hscale",r=>`${r.toFixed(2)}x`,ZM),n("ldp-bld-szscale",r=>`${r.toFixed(2)}x`,XM),n("ldp-bld-minh",r=>`${r.toFixed(2)} mm`,qM),n("ldp-bld-minsz",r=>`${r.toFixed(2)} m²`,$M)}if(s==="water"){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,r=document.getElementById("ldp-water-offset"),a=document.getElementById("ldp-water-offset-mm"),l=document.getElementById("ldp-water-hydro"),u=()=>{const h=Number(r?.value??-1),d=l?.checked??!1;a&&(a.textContent=`( ${(h*n).toFixed(2)} mm )`),pb(h,d);const p=bn();p&&Mn(p)};r?.addEventListener("input",u),l?.addEventListener("change",u),document.querySelectorAll(".ldp-water-feat").forEach(h=>{h.addEventListener("change",()=>{mb(h.dataset.key,h.checked);const d=bn();d&&Mn(d)})})}if(s==="waterways"){const n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,r=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,a=document.getElementById("ldp-ww-width"),l=document.getElementById("ldp-ww-width-n"),u=document.getElementById("ldp-ww-width-mm"),h=document.getElementById("ldp-ww-offset"),d=document.getElementById("ldp-ww-offset-mm"),p=()=>{const g=Math.max(.1,Number(l?.value??1)||1),_=Number(h?.value??-1);u&&(u.textContent=`( ${(g*n).toFixed(2)} mm )`),d&&(d.textContent=`( ${(_*r).toFixed(2)} mm )`),gb(g,_);const M=bn();M&&Mn(M)};a?.addEventListener("input",()=>{l&&(l.value=Number(a.value).toFixed(1)),p()}),l?.addEventListener("input",()=>{a&&(a.value=l.value),p()}),h?.addEventListener("input",p);const m=document.getElementById("ldp-ww-streams");m?.addEventListener("change",()=>{document.querySelectorAll('.ldp-ww-feat[data-key="streams_named"], .ldp-ww-feat[data-key="streams_unnamed"]').forEach(_=>{_.checked=m.checked,Vd(_.dataset.key,m.checked)});const g=bn();g&&Mn(g)}),document.querySelectorAll(".ldp-ww-feat").forEach(g=>{g.id!=="ldp-ww-streams"&&g.addEventListener("change",()=>{if(Vd(g.dataset.key,g.checked),(g.dataset.key==="streams_named"||g.dataset.key==="streams_unnamed")&&m){const M=document.querySelector('.ldp-ww-feat[data-key="streams_named"]')?.checked??!1,w=document.querySelector('.ldp-ww-feat[data-key="streams_unnamed"]')?.checked??!1;m.checked=M||w,m.indeterminate=M!==w}const _=bn();_&&Mn(_)})})}}function iS(){document.getElementById("ldp-new-type")?.addEventListener("change",s=>{const t=s.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",dp),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const s=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=s[(s.indexOf(t)+1)%s.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=he[e]??"#888"})}const pr=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{pr.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{pr.classList.add("hidden")});pr?.addEventListener("click",s=>{s.target===pr&&pr.classList.add("hidden")});const Ua=document.getElementById("ps-layer-h"),ka=document.getElementById("ps-wall-w"),fp=document.getElementById("ps-layer-h-val"),pp=document.getElementById("ps-wall-w-val");Ua?.addEventListener("input",()=>{fp.textContent=Number(Ua.value).toFixed(2),As()});ka?.addEventListener("input",()=>{pp.textContent=Number(ka.value).toFixed(2),As()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{pr.classList.add("hidden"),As()});document.getElementById("ps-reset")?.addEventListener("click",()=>{Ua&&(Ua.value="0.20",fp.textContent="0.20"),ka&&(ka.value="0.42",pp.textContent="0.42"),As()});function tu(s){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=s?"block":"none"}let mp=0,gp=0;document.getElementById("dims-canvas")?.addEventListener("pointerdown",s=>{mp=s.clientX,gp=s.clientY});document.getElementById("dims-canvas")?.addEventListener("click",s=>{const t=s.clientX-mp,e=s.clientY-gp;if(!(t*t+e*e>=25))if(Qf())sb(s.clientX,s.clientY)>=0&&(tu(!1),mr());else{const n=ob(s.clientX,s.clientY);if(n>=0){tp(n),mr();const a=Ec().find(l=>l.id===n);a&&_p(a)}else rb()}});document.addEventListener("keydown",s=>{s.key==="Escape"&&Qf()&&(Jf(),tu(!1))});const sS={circle:"Rond",square:"Carré",diamond:"Losange",triangle:"Triangle",cross:"Croix",heart:"Cœur",star:"Étoile"},$d={circle:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>',square:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>',diamond:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>',triangle:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>',cross:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>',heart:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>',star:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'},rS='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>',oS='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>';function mr(){const s=document.getElementById("ldp-marker-list");if(!s)return;const t=Ec(),e=Tc();if(!t.length){s.innerHTML='<div class="ldp-empty">Aucun marqueur placé</div>';return}s.innerHTML=t.map(n=>`
    <div class="ldp-marker-row${n.id===e?" selected":""}" data-marker-id="${n.id}">
      <svg class="ldp-marker-ico" viewBox="0 0 16 16">${$d[n.shape]??$d.circle}</svg>
      <span class="ldp-marker-lbl">${sS[n.shape]??n.shape}</span>
      <button class="cp-eye ldp-m-eye${n.visible?" active":""}" data-mid="${n.id}" title="Visibilité">${rS}</button>
      <button class="cp-del ldp-m-del" data-mid="${n.id}" title="Supprimer">${oS}</button>
    </div>`).join(""),s.querySelectorAll(".ldp-marker-row").forEach(n=>{n.addEventListener("click",r=>{if(r.target.closest(".cp-eye, .cp-del"))return;const a=Number(n.dataset.markerId);tp(a),mr();const l=Ec().find(u=>u.id===a);l&&_p(l)})}),s.querySelectorAll(".ldp-m-eye").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation();const a=Number(n.dataset.mid),l=!n.classList.contains("active");ab(a,l),mr()})}),s.querySelectorAll(".ldp-m-del").forEach(n=>{n.addEventListener("click",r=>{r.stopPropagation(),lb(Number(n.dataset.mid)),mr()})})}function _p(s){document.querySelectorAll(".ldp-shape-btn").forEach(m=>m.classList.remove("active")),document.querySelector(`.ldp-shape-btn[data-shape="${s.shape}"]`)?.classList.add("active");const t=document.getElementById("ldp-marker-size"),e=document.getElementById("ldp-marker-size-n");t&&(t.value=String(s.diameterMult)),e&&(e.value=String(s.diameterMult));const n=document.getElementById("ldp-marker-rot"),r=document.getElementById("ldp-marker-rot-n");n&&(n.value=String(s.rotDeg)),r&&(r.value=String(s.rotDeg));const a=document.getElementById("ldp-marker-flat");a&&(a.checked=s.flatTop);const l=document.getElementById("ldp-marker-offset");l&&(l.value=String(s.heightOffMult));const u=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,h=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,d=document.getElementById("ldp-marker-mm"),p=document.getElementById("ldp-offset-mm");d&&(d.textContent=`( ${(s.diameterMult*u).toFixed(2)} mm )`),p&&(p.textContent=`( ${(s.heightOffMult*h).toFixed(2)} mm )`)}document.querySelectorAll(".cp-del:not(.ldp-m-del)").forEach(s=>{s.addEventListener("click",t=>{t.stopPropagation();const e=s.closest(".cp-layer");if(!e)return;const n=e.dataset.layer;n&&Kf(n,!1),e.remove()})});export{fm as c,pm as g};
