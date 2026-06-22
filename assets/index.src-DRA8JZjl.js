(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function tg(){document.getElementById("app").innerHTML=`

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
    <button class="tab-btn" data-tab="render" id="tab-render-btn" disabled>
      <span class="tab-num">5</span>
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
        <button class="btn-next" id="btn-next-apercu">
          Aperçu
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 4l6 6-6 6"/></svg>
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

  <!-- ── ONGLET 4 : GÉNÉRER & EXPORTER ─────────────────── -->
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
`}function zi(i,t,e){const n=u=>document.getElementById(u),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${i}%`);const c=n("pp");c&&(c.textContent=`${Math.round(i)}%`)}function Rl(i){const t=document.getElementById("prog");t&&(t.style.display=i?"flex":"none")}function Sc(i,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=i,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function Di(i){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===i)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${i}`))}window.ts=i=>{document.getElementById(`sb-${i}`)?.classList.toggle("h"),document.getElementById(`ca-${i}`)?.classList.toggle("o")};window.ev=i=>{i.stopPropagation()};var ro=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function xf(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var Ec={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(i,t){(function(e,n){n(t)})(ro,function(e){var n="1.9.4";function s(r){var a,d,b,C;for(d=1,b=arguments.length;d<b;d++){C=arguments[d];for(a in C)r[a]=C[a]}return r}var o=Object.create||function(){function r(){}return function(a){return r.prototype=a,new r}}();function l(r,a){var d=Array.prototype.slice;if(r.bind)return r.bind.apply(r,d.call(arguments,1));var b=d.call(arguments,2);return function(){return r.apply(a,b.length?b.concat(d.call(arguments)):arguments)}}var c=0;function u(r){return"_leaflet_id"in r||(r._leaflet_id=++c),r._leaflet_id}function h(r,a,d){var b,C,B,$;return $=function(){b=!1,C&&(B.apply(d,C),C=!1)},B=function(){b?C=arguments:(r.apply(d,arguments),setTimeout($,a),b=!0)},B}function f(r,a,d){var b=a[1],C=a[0],B=b-C;return r===b&&d?r:((r-C)%B+B)%B+C}function p(){return!1}function g(r,a){if(a===!1)return r;var d=Math.pow(10,a===void 0?6:a);return Math.round(r*d)/d}function m(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function y(r){return m(r).split(/\s+/)}function x(r,a){Object.prototype.hasOwnProperty.call(r,"options")||(r.options=r.options?o(r.options):{});for(var d in a)r.options[d]=a[d];return r.options}function _(r,a,d){var b=[];for(var C in r)b.push(encodeURIComponent(d?C.toUpperCase():C)+"="+encodeURIComponent(r[C]));return(!a||a.indexOf("?")===-1?"?":"&")+b.join("&")}var v=/\{ *([\w_ -]+) *\}/g;function S(r,a){return r.replace(v,function(d,b){var C=a[b];if(C===void 0)throw new Error("No value provided for variable "+d);return typeof C=="function"&&(C=C(a)),C})}var w=Array.isArray||function(r){return Object.prototype.toString.call(r)==="[object Array]"};function T(r,a){for(var d=0;d<r.length;d++)if(r[d]===a)return d;return-1}var k="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function O(r){return window["webkit"+r]||window["moz"+r]||window["ms"+r]}var D=0;function z(r){var a=+new Date,d=Math.max(0,16-(a-D));return D=a+d,window.setTimeout(r,d)}var I=window.requestAnimationFrame||O("RequestAnimationFrame")||z,R=window.cancelAnimationFrame||O("CancelAnimationFrame")||O("CancelRequestAnimationFrame")||function(r){window.clearTimeout(r)};function G(r,a,d){if(d&&I===z)r.call(a);else return I.call(window,l(r,a))}function U(r){r&&R.call(window,r)}var F={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:u,throttle:h,wrapNum:f,falseFn:p,formatNum:g,trim:m,splitWords:y,setOptions:x,getParamString:_,template:S,isArray:w,indexOf:T,emptyImageUrl:k,requestFn:I,cancelFn:R,requestAnimFrame:G,cancelAnimFrame:U};function E(){}E.extend=function(r){var a=function(){x(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},d=a.__super__=this.prototype,b=o(d);b.constructor=a,a.prototype=b;for(var C in this)Object.prototype.hasOwnProperty.call(this,C)&&C!=="prototype"&&C!=="__super__"&&(a[C]=this[C]);return r.statics&&s(a,r.statics),r.includes&&(Z(r.includes),s.apply(null,[b].concat(r.includes))),s(b,r),delete b.statics,delete b.includes,b.options&&(b.options=d.options?o(d.options):{},s(b.options,r.options)),b._initHooks=[],b.callInitHooks=function(){if(!this._initHooksCalled){d.callInitHooks&&d.callInitHooks.call(this),this._initHooksCalled=!0;for(var B=0,$=b._initHooks.length;B<$;B++)b._initHooks[B].call(this)}},a},E.include=function(r){var a=this.prototype.options;return s(this.prototype,r),r.options&&(this.prototype.options=a,this.mergeOptions(r.options)),this},E.mergeOptions=function(r){return s(this.prototype.options,r),this},E.addInitHook=function(r){var a=Array.prototype.slice.call(arguments,1),d=typeof r=="function"?r:function(){this[r].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(d),this};function Z(r){if(!(typeof L>"u"||!L||!L.Mixin)){r=w(r)?r:[r];for(var a=0;a<r.length;a++)r[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var ot={on:function(r,a,d){if(typeof r=="object")for(var b in r)this._on(b,r[b],a);else{r=y(r);for(var C=0,B=r.length;C<B;C++)this._on(r[C],a,d)}return this},off:function(r,a,d){if(!arguments.length)delete this._events;else if(typeof r=="object")for(var b in r)this._off(b,r[b],a);else{r=y(r);for(var C=arguments.length===1,B=0,$=r.length;B<$;B++)C?this._off(r[B]):this._off(r[B],a,d)}return this},_on:function(r,a,d,b){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(r,a,d)===!1){d===this&&(d=void 0);var C={fn:a,ctx:d};b&&(C.once=!0),this._events=this._events||{},this._events[r]=this._events[r]||[],this._events[r].push(C)}},_off:function(r,a,d){var b,C,B;if(this._events&&(b=this._events[r],!!b)){if(arguments.length===1){if(this._firingCount)for(C=0,B=b.length;C<B;C++)b[C].fn=p;delete this._events[r];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var $=this._listens(r,a,d);if($!==!1){var ut=b[$];this._firingCount&&(ut.fn=p,this._events[r]=b=b.slice()),b.splice($,1)}}},fire:function(r,a,d){if(!this.listens(r,d))return this;var b=s({},a,{type:r,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var C=this._events[r];if(C){this._firingCount=this._firingCount+1||1;for(var B=0,$=C.length;B<$;B++){var ut=C[B],mt=ut.fn;ut.once&&this.off(r,mt,ut.ctx),mt.call(ut.ctx||this,b)}this._firingCount--}}return d&&this._propagateEvent(b),this},listens:function(r,a,d,b){typeof r!="string"&&console.warn('"string" type argument expected');var C=a;typeof a!="function"&&(b=!!a,C=void 0,d=void 0);var B=this._events&&this._events[r];if(B&&B.length&&this._listens(r,C,d)!==!1)return!0;if(b){for(var $ in this._eventParents)if(this._eventParents[$].listens(r,a,d,b))return!0}return!1},_listens:function(r,a,d){if(!this._events)return!1;var b=this._events[r]||[];if(!a)return!!b.length;d===this&&(d=void 0);for(var C=0,B=b.length;C<B;C++)if(b[C].fn===a&&b[C].ctx===d)return C;return!1},once:function(r,a,d){if(typeof r=="object")for(var b in r)this._on(b,r[b],a,!0);else{r=y(r);for(var C=0,B=r.length;C<B;C++)this._on(r[C],a,d,!0)}return this},addEventParent:function(r){return this._eventParents=this._eventParents||{},this._eventParents[u(r)]=r,this},removeEventParent:function(r){return this._eventParents&&delete this._eventParents[u(r)],this},_propagateEvent:function(r){for(var a in this._eventParents)this._eventParents[a].fire(r.type,s({layer:r.target,propagatedFrom:r.target},r),!0)}};ot.addEventListener=ot.on,ot.removeEventListener=ot.clearAllEventListeners=ot.off,ot.addOneTimeEventListener=ot.once,ot.fireEvent=ot.fire,ot.hasEventListeners=ot.listens;var rt=E.extend(ot);function W(r,a,d){this.x=d?Math.round(r):r,this.y=d?Math.round(a):a}var it=Math.trunc||function(r){return r>0?Math.floor(r):Math.ceil(r)};W.prototype={clone:function(){return new W(this.x,this.y)},add:function(r){return this.clone()._add(et(r))},_add:function(r){return this.x+=r.x,this.y+=r.y,this},subtract:function(r){return this.clone()._subtract(et(r))},_subtract:function(r){return this.x-=r.x,this.y-=r.y,this},divideBy:function(r){return this.clone()._divideBy(r)},_divideBy:function(r){return this.x/=r,this.y/=r,this},multiplyBy:function(r){return this.clone()._multiplyBy(r)},_multiplyBy:function(r){return this.x*=r,this.y*=r,this},scaleBy:function(r){return new W(this.x*r.x,this.y*r.y)},unscaleBy:function(r){return new W(this.x/r.x,this.y/r.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=it(this.x),this.y=it(this.y),this},distanceTo:function(r){r=et(r);var a=r.x-this.x,d=r.y-this.y;return Math.sqrt(a*a+d*d)},equals:function(r){return r=et(r),r.x===this.x&&r.y===this.y},contains:function(r){return r=et(r),Math.abs(r.x)<=Math.abs(this.x)&&Math.abs(r.y)<=Math.abs(this.y)},toString:function(){return"Point("+g(this.x)+", "+g(this.y)+")"}};function et(r,a,d){return r instanceof W?r:w(r)?new W(r[0],r[1]):r==null?r:typeof r=="object"&&"x"in r&&"y"in r?new W(r.x,r.y):new W(r,a,d)}function q(r,a){if(r)for(var d=a?[r,a]:r,b=0,C=d.length;b<C;b++)this.extend(d[b])}q.prototype={extend:function(r){var a,d;if(!r)return this;if(r instanceof W||typeof r[0]=="number"||"x"in r)a=d=et(r);else if(r=Y(r),a=r.min,d=r.max,!a||!d)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=d.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(d.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(d.y,this.max.y)),this},getCenter:function(r){return et((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,r)},getBottomLeft:function(){return et(this.min.x,this.max.y)},getTopRight:function(){return et(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(r){var a,d;return typeof r[0]=="number"||r instanceof W?r=et(r):r=Y(r),r instanceof q?(a=r.min,d=r.max):a=d=r,a.x>=this.min.x&&d.x<=this.max.x&&a.y>=this.min.y&&d.y<=this.max.y},intersects:function(r){r=Y(r);var a=this.min,d=this.max,b=r.min,C=r.max,B=C.x>=a.x&&b.x<=d.x,$=C.y>=a.y&&b.y<=d.y;return B&&$},overlaps:function(r){r=Y(r);var a=this.min,d=this.max,b=r.min,C=r.max,B=C.x>a.x&&b.x<d.x,$=C.y>a.y&&b.y<d.y;return B&&$},isValid:function(){return!!(this.min&&this.max)},pad:function(r){var a=this.min,d=this.max,b=Math.abs(a.x-d.x)*r,C=Math.abs(a.y-d.y)*r;return Y(et(a.x-b,a.y-C),et(d.x+b,d.y+C))},equals:function(r){return r?(r=Y(r),this.min.equals(r.getTopLeft())&&this.max.equals(r.getBottomRight())):!1}};function Y(r,a){return!r||r instanceof q?r:new q(r,a)}function At(r,a){if(r)for(var d=a?[r,a]:r,b=0,C=d.length;b<C;b++)this.extend(d[b])}At.prototype={extend:function(r){var a=this._southWest,d=this._northEast,b,C;if(r instanceof st)b=r,C=r;else if(r instanceof At){if(b=r._southWest,C=r._northEast,!b||!C)return this}else return r?this.extend(wt(r)||tt(r)):this;return!a&&!d?(this._southWest=new st(b.lat,b.lng),this._northEast=new st(C.lat,C.lng)):(a.lat=Math.min(b.lat,a.lat),a.lng=Math.min(b.lng,a.lng),d.lat=Math.max(C.lat,d.lat),d.lng=Math.max(C.lng,d.lng)),this},pad:function(r){var a=this._southWest,d=this._northEast,b=Math.abs(a.lat-d.lat)*r,C=Math.abs(a.lng-d.lng)*r;return new At(new st(a.lat-b,a.lng-C),new st(d.lat+b,d.lng+C))},getCenter:function(){return new st((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new st(this.getNorth(),this.getWest())},getSouthEast:function(){return new st(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(r){typeof r[0]=="number"||r instanceof st||"lat"in r?r=wt(r):r=tt(r);var a=this._southWest,d=this._northEast,b,C;return r instanceof At?(b=r.getSouthWest(),C=r.getNorthEast()):b=C=r,b.lat>=a.lat&&C.lat<=d.lat&&b.lng>=a.lng&&C.lng<=d.lng},intersects:function(r){r=tt(r);var a=this._southWest,d=this._northEast,b=r.getSouthWest(),C=r.getNorthEast(),B=C.lat>=a.lat&&b.lat<=d.lat,$=C.lng>=a.lng&&b.lng<=d.lng;return B&&$},overlaps:function(r){r=tt(r);var a=this._southWest,d=this._northEast,b=r.getSouthWest(),C=r.getNorthEast(),B=C.lat>a.lat&&b.lat<d.lat,$=C.lng>a.lng&&b.lng<d.lng;return B&&$},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(r,a){return r?(r=tt(r),this._southWest.equals(r.getSouthWest(),a)&&this._northEast.equals(r.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function tt(r,a){return r instanceof At?r:new At(r,a)}function st(r,a,d){if(isNaN(r)||isNaN(a))throw new Error("Invalid LatLng object: ("+r+", "+a+")");this.lat=+r,this.lng=+a,d!==void 0&&(this.alt=+d)}st.prototype={equals:function(r,a){if(!r)return!1;r=wt(r);var d=Math.max(Math.abs(this.lat-r.lat),Math.abs(this.lng-r.lng));return d<=(a===void 0?1e-9:a)},toString:function(r){return"LatLng("+g(this.lat,r)+", "+g(this.lng,r)+")"},distanceTo:function(r){return Pt.distance(this,wt(r))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(r){var a=180*r/40075017,d=a/Math.cos(Math.PI/180*this.lat);return tt([this.lat-a,this.lng-d],[this.lat+a,this.lng+d])},clone:function(){return new st(this.lat,this.lng,this.alt)}};function wt(r,a,d){return r instanceof st?r:w(r)&&typeof r[0]!="object"?r.length===3?new st(r[0],r[1],r[2]):r.length===2?new st(r[0],r[1]):null:r==null?r:typeof r=="object"&&"lat"in r?new st(r.lat,"lng"in r?r.lng:r.lon,r.alt):a===void 0?null:new st(r,a,d)}var St={latLngToPoint:function(r,a){var d=this.projection.project(r),b=this.scale(a);return this.transformation._transform(d,b)},pointToLatLng:function(r,a){var d=this.scale(a),b=this.transformation.untransform(r,d);return this.projection.unproject(b)},project:function(r){return this.projection.project(r)},unproject:function(r){return this.projection.unproject(r)},scale:function(r){return 256*Math.pow(2,r)},zoom:function(r){return Math.log(r/256)/Math.LN2},getProjectedBounds:function(r){if(this.infinite)return null;var a=this.projection.bounds,d=this.scale(r),b=this.transformation.transform(a.min,d),C=this.transformation.transform(a.max,d);return new q(b,C)},infinite:!1,wrapLatLng:function(r){var a=this.wrapLng?f(r.lng,this.wrapLng,!0):r.lng,d=this.wrapLat?f(r.lat,this.wrapLat,!0):r.lat,b=r.alt;return new st(d,a,b)},wrapLatLngBounds:function(r){var a=r.getCenter(),d=this.wrapLatLng(a),b=a.lat-d.lat,C=a.lng-d.lng;if(b===0&&C===0)return r;var B=r.getSouthWest(),$=r.getNorthEast(),ut=new st(B.lat-b,B.lng-C),mt=new st($.lat-b,$.lng-C);return new At(ut,mt)}},Pt=s({},St,{wrapLng:[-180,180],R:6371e3,distance:function(r,a){var d=Math.PI/180,b=r.lat*d,C=a.lat*d,B=Math.sin((a.lat-r.lat)*d/2),$=Math.sin((a.lng-r.lng)*d/2),ut=B*B+Math.cos(b)*Math.cos(C)*$*$,mt=2*Math.atan2(Math.sqrt(ut),Math.sqrt(1-ut));return this.R*mt}}),It=6378137,Ut={R:It,MAX_LATITUDE:85.0511287798,project:function(r){var a=Math.PI/180,d=this.MAX_LATITUDE,b=Math.max(Math.min(d,r.lat),-d),C=Math.sin(b*a);return new W(this.R*r.lng*a,this.R*Math.log((1+C)/(1-C))/2)},unproject:function(r){var a=180/Math.PI;return new st((2*Math.atan(Math.exp(r.y/this.R))-Math.PI/2)*a,r.x*a/this.R)},bounds:function(){var r=It*Math.PI;return new q([-r,-r],[r,r])}()};function at(r,a,d,b){if(w(r)){this._a=r[0],this._b=r[1],this._c=r[2],this._d=r[3];return}this._a=r,this._b=a,this._c=d,this._d=b}at.prototype={transform:function(r,a){return this._transform(r.clone(),a)},_transform:function(r,a){return a=a||1,r.x=a*(this._a*r.x+this._b),r.y=a*(this._c*r.y+this._d),r},untransform:function(r,a){return a=a||1,new W((r.x/a-this._b)/this._a,(r.y/a-this._d)/this._c)}};function xt(r,a,d,b){return new at(r,a,d,b)}var bt=s({},Pt,{code:"EPSG:3857",projection:Ut,transformation:function(){var r=.5/(Math.PI*Ut.R);return xt(r,.5,-r,.5)}()}),A=s({},bt,{code:"EPSG:900913"});function nt(r){return document.createElementNS("http://www.w3.org/2000/svg",r)}function K(r,a){var d="",b,C,B,$,ut,mt;for(b=0,B=r.length;b<B;b++){for(ut=r[b],C=0,$=ut.length;C<$;C++)mt=ut[C],d+=(C?"L":"M")+mt.x+" "+mt.y;d+=a?Wt.svg?"z":"x":""}return d||"M0 0"}var P=document.documentElement.style,M="ActiveXObject"in window,H=M&&!document.addEventListener,j="msLaunchUri"in navigator&&!("documentMode"in document),Q=qe("webkit"),X=qe("android"),ft=qe("android 2")||qe("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=X&&qe("Google")&&lt<537&&!("AudioNode"in window),Tt=!!window.opera,Et=!j&&qe("chrome"),Lt=qe("gecko")&&!Q&&!Tt&&!M,Ht=!Et&&qe("safari"),zt=qe("phantom"),Dt="OTransition"in P,Qt=navigator.platform.indexOf("Win")===0,Vt=M&&"transition"in P,ae="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,le="MozPerspective"in P,ee=!window.L_DISABLE_3D&&(Vt||ae||le)&&!Dt&&!zt,Ft=typeof orientation<"u"||qe("mobile"),N=Ft&&Q,ht=Ft&&ae,Mt=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||Mt),kt="ontouchstart"in window||!!window.TouchEvent,se=!window.L_NO_TOUCH&&(kt||Rt),he=Ft&&Tt,be=Ft&&Lt,Fe=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,ve=function(){var r=!1;try{var a=Object.defineProperty({},"passive",{get:function(){r=!0}});window.addEventListener("testPassiveEventSupport",p,a),window.removeEventListener("testPassiveEventSupport",p,a)}catch{}return r}(),De=function(){return!!document.createElement("canvas").getContext}(),Ae=!!(document.createElementNS&&nt("svg").createSVGRect),cn=!!Ae&&function(){var r=document.createElement("div");return r.innerHTML="<svg/>",(r.firstChild&&r.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),vn=!Ae&&function(){try{var r=document.createElement("div");r.innerHTML='<v:shape adj="1"/>';var a=r.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),ei=navigator.platform.indexOf("Mac")===0,ki=navigator.platform.indexOf("Linux")===0;function qe(r){return navigator.userAgent.toLowerCase().indexOf(r)>=0}var Wt={ie:M,ielt9:H,edge:j,webkit:Q,android:X,android23:ft,androidStock:pt,opera:Tt,chrome:Et,gecko:Lt,safari:Ht,phantom:zt,opera12:Dt,win:Qt,ie3d:Vt,webkit3d:ae,gecko3d:le,any3d:ee,mobile:Ft,mobileWebkit:N,mobileWebkit3d:ht,msPointer:Mt,pointer:Rt,touch:se,touchNative:kt,mobileOpera:he,mobileGecko:be,retina:Fe,passiveEvents:ve,canvas:De,svg:Ae,vml:vn,inlineSvg:cn,mac:ei,linux:ki},nr=Wt.msPointer?"MSPointerDown":"pointerdown",Ds=Wt.msPointer?"MSPointerMove":"pointermove",ks=Wt.msPointer?"MSPointerUp":"pointerup",Ro=Wt.msPointer?"MSPointerCancel":"pointercancel",Ns={touchstart:nr,touchmove:Ds,touchend:ks,touchcancel:Ro},Io={touchstart:ne,touchmove:jt,touchend:jt,touchcancel:jt},V={},ct=!1;function gt(r,a,d){return a==="touchstart"&&qt(),Io[a]?(d=Io[a].bind(this,d),r.addEventListener(Ns[a],d,!1),d):(console.warn("wrong event specified:",a),p)}function _t(r,a,d){if(!Ns[a]){console.warn("wrong event specified:",a);return}r.removeEventListener(Ns[a],d,!1)}function dt(r){V[r.pointerId]=r}function Ot(r){V[r.pointerId]&&(V[r.pointerId]=r)}function Zt(r){delete V[r.pointerId]}function qt(){ct||(document.addEventListener(nr,dt,!0),document.addEventListener(Ds,Ot,!0),document.addEventListener(ks,Zt,!0),document.addEventListener(Ro,Zt,!0),ct=!0)}function jt(r,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var d in V)a.touches.push(V[d]);a.changedTouches=[a],r(a)}}function ne(r,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&tn(a),jt(r,a)}function te(r){var a={},d,b;for(b in r)d=r[b],a[b]=d&&d.bind?d.bind(r):d;return r=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var ie=200;function Pe(r,a){r.addEventListener("dblclick",a);var d=0,b;function C(B){if(B.detail!==1){b=B.detail;return}if(!(B.pointerType==="mouse"||B.sourceCapabilities&&!B.sourceCapabilities.firesTouchEvents)){var $=Lu(B);if(!($.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!$.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ut=Date.now();ut-d<=ie?(b++,b===2&&a(te(B))):b=1,d=ut}}}return r.addEventListener("click",C),{dblclick:a,simDblclick:C}}function un(r,a){r.removeEventListener("dblclick",a.dblclick),r.removeEventListener("click",a.simDblclick)}var ke=ko(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),hn=ko(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),we=hn==="webkitTransition"||hn==="OTransition"?hn+"End":"transitionend";function re(r){return typeof r=="string"?document.getElementById(r):r}function mi(r,a){var d=r.style[a]||r.currentStyle&&r.currentStyle[a];if((!d||d==="auto")&&document.defaultView){var b=document.defaultView.getComputedStyle(r,null);d=b?b[a]:null}return d==="auto"?null:d}function Xt(r,a,d){var b=document.createElement(r);return b.className=a||"",d&&d.appendChild(b),b}function ge(r){var a=r.parentNode;a&&a.removeChild(r)}function ir(r){for(;r.firstChild;)r.removeChild(r.firstChild)}function Nn(r){var a=r.parentNode;a&&a.lastChild!==r&&a.appendChild(r)}function ni(r){var a=r.parentNode;a&&a.firstChild!==r&&a.insertBefore(r,a.firstChild)}function He(r,a){if(r.classList!==void 0)return r.classList.contains(a);var d=Ni(r);return d.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(d)}function $t(r,a){if(r.classList!==void 0)for(var d=y(a),b=0,C=d.length;b<C;b++)r.classList.add(d[b]);else if(!He(r,a)){var B=Ni(r);rn(r,(B?B+" ":"")+a)}}function Se(r,a){r.classList!==void 0?r.classList.remove(a):rn(r,m((" "+Ni(r)+" ").replace(" "+a+" "," ")))}function rn(r,a){r.className.baseVal===void 0?r.className=a:r.className.baseVal=a}function Ni(r){return r.correspondingElement&&(r=r.correspondingElement),r.className.baseVal===void 0?r.className:r.className.baseVal}function yn(r,a){"opacity"in r.style?r.style.opacity=a:"filter"in r.style&&Do(r,a)}function Do(r,a){var d=!1,b="DXImageTransform.Microsoft.Alpha";try{d=r.filters.item(b)}catch{if(a===1)return}a=Math.round(a*100),d?(d.Enabled=a!==100,d.Opacity=a):r.style.filter+=" progid:"+b+"(opacity="+a+")"}function ko(r){for(var a=document.documentElement.style,d=0;d<r.length;d++)if(r[d]in a)return r[d];return!1}function rr(r,a,d){var b=a||new W(0,0);r.style[ke]=(Wt.ie3d?"translate("+b.x+"px,"+b.y+"px)":"translate3d("+b.x+"px,"+b.y+"px,0)")+(d?" scale("+d+")":"")}function Ve(r,a){r._leaflet_pos=a,Wt.any3d?rr(r,a):(r.style.left=a.x+"px",r.style.top=a.y+"px")}function sr(r){return r._leaflet_pos||new W(0,0)}var Os,Us,cl;if("onselectstart"in document)Os=function(){oe(window,"selectstart",tn)},Us=function(){Me(window,"selectstart",tn)};else{var zs=ko(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Os=function(){if(zs){var r=document.documentElement.style;cl=r[zs],r[zs]="none"}},Us=function(){zs&&(document.documentElement.style[zs]=cl,cl=void 0)}}function ul(){oe(window,"dragstart",tn)}function hl(){Me(window,"dragstart",tn)}var No,dl;function fl(r){for(;r.tabIndex===-1;)r=r.parentNode;r.style&&(Oo(),No=r,dl=r.style.outlineStyle,r.style.outlineStyle="none",oe(window,"keydown",Oo))}function Oo(){No&&(No.style.outlineStyle=dl,No=void 0,dl=void 0,Me(window,"keydown",Oo))}function Tu(r){do r=r.parentNode;while((!r.offsetWidth||!r.offsetHeight)&&r!==document.body);return r}function pl(r){var a=r.getBoundingClientRect();return{x:a.width/r.offsetWidth||1,y:a.height/r.offsetHeight||1,boundingClientRect:a}}var om={__proto__:null,TRANSFORM:ke,TRANSITION:hn,TRANSITION_END:we,get:re,getStyle:mi,create:Xt,remove:ge,empty:ir,toFront:Nn,toBack:ni,hasClass:He,addClass:$t,removeClass:Se,setClass:rn,getClass:Ni,setOpacity:yn,testProp:ko,setTransform:rr,setPosition:Ve,getPosition:sr,get disableTextSelection(){return Os},get enableTextSelection(){return Us},disableImageDrag:ul,enableImageDrag:hl,preventOutline:fl,restoreOutline:Oo,getSizedParentNode:Tu,getScale:pl};function oe(r,a,d,b){if(a&&typeof a=="object")for(var C in a)gl(r,C,a[C],d);else{a=y(a);for(var B=0,$=a.length;B<$;B++)gl(r,a[B],d,b)}return this}var ii="_leaflet_events";function Me(r,a,d,b){if(arguments.length===1)Au(r),delete r[ii];else if(a&&typeof a=="object")for(var C in a)_l(r,C,a[C],d);else if(a=y(a),arguments.length===2)Au(r,function(ut){return T(a,ut)!==-1});else for(var B=0,$=a.length;B<$;B++)_l(r,a[B],d,b);return this}function Au(r,a){for(var d in r[ii]){var b=d.split(/\d/)[0];(!a||a(b))&&_l(r,b,null,null,d)}}var ml={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function gl(r,a,d,b){var C=a+u(d)+(b?"_"+u(b):"");if(r[ii]&&r[ii][C])return this;var B=function(ut){return d.call(b||r,ut||window.event)},$=B;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?B=gt(r,a,B):Wt.touch&&a==="dblclick"?B=Pe(r,B):"addEventListener"in r?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?r.addEventListener(ml[a]||a,B,Wt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(B=function(ut){ut=ut||window.event,yl(r,ut)&&$(ut)},r.addEventListener(ml[a],B,!1)):r.addEventListener(a,$,!1):r.attachEvent("on"+a,B),r[ii]=r[ii]||{},r[ii][C]=B}function _l(r,a,d,b,C){C=C||a+u(d)+(b?"_"+u(b):"");var B=r[ii]&&r[ii][C];if(!B)return this;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?_t(r,a,B):Wt.touch&&a==="dblclick"?un(r,B):"removeEventListener"in r?r.removeEventListener(ml[a]||a,B,!1):r.detachEvent("on"+a,B),r[ii][C]=null}function or(r){return r.stopPropagation?r.stopPropagation():r.originalEvent?r.originalEvent._stopped=!0:r.cancelBubble=!0,this}function vl(r){return gl(r,"wheel",or),this}function Bs(r){return oe(r,"mousedown touchstart dblclick contextmenu",or),r._leaflet_disable_click=!0,this}function tn(r){return r.preventDefault?r.preventDefault():r.returnValue=!1,this}function ar(r){return tn(r),or(r),this}function Lu(r){if(r.composedPath)return r.composedPath();for(var a=[],d=r.target;d;)a.push(d),d=d.parentNode;return a}function Cu(r,a){if(!a)return new W(r.clientX,r.clientY);var d=pl(a),b=d.boundingClientRect;return new W((r.clientX-b.left)/d.x-a.clientLeft,(r.clientY-b.top)/d.y-a.clientTop)}var am=Wt.linux&&Wt.chrome?window.devicePixelRatio:Wt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Pu(r){return Wt.edge?r.wheelDeltaY/2:r.deltaY&&r.deltaMode===0?-r.deltaY/am:r.deltaY&&r.deltaMode===1?-r.deltaY*20:r.deltaY&&r.deltaMode===2?-r.deltaY*60:r.deltaX||r.deltaZ?0:r.wheelDelta?(r.wheelDeltaY||r.wheelDelta)/2:r.detail&&Math.abs(r.detail)<32765?-r.detail*20:r.detail?r.detail/-32765*60:0}function yl(r,a){var d=a.relatedTarget;if(!d)return!0;try{for(;d&&d!==r;)d=d.parentNode}catch{return!1}return d!==r}var lm={__proto__:null,on:oe,off:Me,stopPropagation:or,disableScrollPropagation:vl,disableClickPropagation:Bs,preventDefault:tn,stop:ar,getPropagationPath:Lu,getMousePosition:Cu,getWheelDelta:Pu,isExternalTarget:yl,addListener:oe,removeListener:Me},Ru=rt.extend({run:function(r,a,d,b){this.stop(),this._el=r,this._inProgress=!0,this._duration=d||.25,this._easeOutPower=1/Math.max(b||.5,.2),this._startPos=sr(r),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=G(this._animate,this),this._step()},_step:function(r){var a=+new Date-this._startTime,d=this._duration*1e3;a<d?this._runFrame(this._easeOut(a/d),r):(this._runFrame(1),this._complete())},_runFrame:function(r,a){var d=this._startPos.add(this._offset.multiplyBy(r));a&&d._round(),Ve(this._el,d),this.fire("step")},_complete:function(){U(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(r){return 1-Math.pow(1-r,this._easeOutPower)}}),pe=rt.extend({options:{crs:bt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(r,a){a=x(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(r),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(wt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=hn&&Wt.any3d&&!Wt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),oe(this._proxy,we,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(r,a,d){if(a=a===void 0?this._zoom:this._limitZoom(a),r=this._limitCenter(wt(r),a,this.options.maxBounds),d=d||{},this._stop(),this._loaded&&!d.reset&&d!==!0){d.animate!==void 0&&(d.zoom=s({animate:d.animate},d.zoom),d.pan=s({animate:d.animate,duration:d.duration},d.pan));var b=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(r,a,d.zoom):this._tryAnimatedPan(r,d.pan);if(b)return clearTimeout(this._sizeTimer),this}return this._resetView(r,a,d.pan&&d.pan.noMoveStart),this},setZoom:function(r,a){return this._loaded?this.setView(this.getCenter(),r,{zoom:a}):(this._zoom=r,this)},zoomIn:function(r,a){return r=r||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+r,a)},zoomOut:function(r,a){return r=r||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-r,a)},setZoomAround:function(r,a,d){var b=this.getZoomScale(a),C=this.getSize().divideBy(2),B=r instanceof W?r:this.latLngToContainerPoint(r),$=B.subtract(C).multiplyBy(1-1/b),ut=this.containerPointToLatLng(C.add($));return this.setView(ut,a,{zoom:d})},_getBoundsCenterZoom:function(r,a){a=a||{},r=r.getBounds?r.getBounds():tt(r);var d=et(a.paddingTopLeft||a.padding||[0,0]),b=et(a.paddingBottomRight||a.padding||[0,0]),C=this.getBoundsZoom(r,!1,d.add(b));if(C=typeof a.maxZoom=="number"?Math.min(a.maxZoom,C):C,C===1/0)return{center:r.getCenter(),zoom:C};var B=b.subtract(d).divideBy(2),$=this.project(r.getSouthWest(),C),ut=this.project(r.getNorthEast(),C),mt=this.unproject($.add(ut).divideBy(2).add(B),C);return{center:mt,zoom:C}},fitBounds:function(r,a){if(r=tt(r),!r.isValid())throw new Error("Bounds are not valid.");var d=this._getBoundsCenterZoom(r,a);return this.setView(d.center,d.zoom,a)},fitWorld:function(r){return this.fitBounds([[-90,-180],[90,180]],r)},panTo:function(r,a){return this.setView(r,this._zoom,{pan:a})},panBy:function(r,a){if(r=et(r).round(),a=a||{},!r.x&&!r.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(r))return this._resetView(this.unproject(this.project(this.getCenter()).add(r)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Ru,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){$t(this._mapPane,"leaflet-pan-anim");var d=this._getMapPanePos().subtract(r).round();this._panAnim.run(this._mapPane,d,a.duration||.25,a.easeLinearity)}else this._rawPanBy(r),this.fire("move").fire("moveend");return this},flyTo:function(r,a,d){if(d=d||{},d.animate===!1||!Wt.any3d)return this.setView(r,a,d);this._stop();var b=this.project(this.getCenter()),C=this.project(r),B=this.getSize(),$=this._zoom;r=wt(r),a=a===void 0?$:a;var ut=Math.max(B.x,B.y),mt=ut*this.getZoomScale($,a),Ct=C.distanceTo(b)||1,Bt=1.42,Yt=Bt*Bt;function de(Ge){var jo=Ge?-1:1,Ym=Ge?mt:ut,Km=mt*mt-ut*ut+jo*Yt*Yt*Ct*Ct,Jm=2*Ym*Yt*Ct,Pl=Km/Jm,hh=Math.sqrt(Pl*Pl+1)-Pl,Qm=hh<1e-9?-18:Math.log(hh);return Qm}function dn(Ge){return(Math.exp(Ge)-Math.exp(-Ge))/2}function je(Ge){return(Math.exp(Ge)+Math.exp(-Ge))/2}function Un(Ge){return dn(Ge)/je(Ge)}var xn=de(0);function Ur(Ge){return ut*(je(xn)/je(xn+Bt*Ge))}function Xm(Ge){return ut*(je(xn)*Un(xn+Bt*Ge)-dn(xn))/Yt}function qm(Ge){return 1-Math.pow(1-Ge,1.5)}var jm=Date.now(),ch=(de(1)-xn)/Bt,$m=d.duration?1e3*d.duration:1e3*ch*.8;function uh(){var Ge=(Date.now()-jm)/$m,jo=qm(Ge)*ch;Ge<=1?(this._flyToFrame=G(uh,this),this._move(this.unproject(b.add(C.subtract(b).multiplyBy(Xm(jo)/Ct)),$),this.getScaleZoom(ut/Ur(jo),$),{flyTo:!0})):this._move(r,a)._moveEnd(!0)}return this._moveStart(!0,d.noMoveStart),uh.call(this),this},flyToBounds:function(r,a){var d=this._getBoundsCenterZoom(r,a);return this.flyTo(d.center,d.zoom,a)},setMaxBounds:function(r){return r=tt(r),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),r.isValid()?(this.options.maxBounds=r,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(r){var a=this.options.minZoom;return this.options.minZoom=r,this._loaded&&a!==r&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(r):this},setMaxZoom:function(r){var a=this.options.maxZoom;return this.options.maxZoom=r,this._loaded&&a!==r&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(r):this},panInsideBounds:function(r,a){this._enforcingBounds=!0;var d=this.getCenter(),b=this._limitCenter(d,this._zoom,tt(r));return d.equals(b)||this.panTo(b,a),this._enforcingBounds=!1,this},panInside:function(r,a){a=a||{};var d=et(a.paddingTopLeft||a.padding||[0,0]),b=et(a.paddingBottomRight||a.padding||[0,0]),C=this.project(this.getCenter()),B=this.project(r),$=this.getPixelBounds(),ut=Y([$.min.add(d),$.max.subtract(b)]),mt=ut.getSize();if(!ut.contains(B)){this._enforcingBounds=!0;var Ct=B.subtract(ut.getCenter()),Bt=ut.extend(B).getSize().subtract(mt);C.x+=Ct.x<0?-Bt.x:Bt.x,C.y+=Ct.y<0?-Bt.y:Bt.y,this.panTo(this.unproject(C),a),this._enforcingBounds=!1}return this},invalidateSize:function(r){if(!this._loaded)return this;r=s({animate:!1,pan:!0},r===!0?{animate:!0}:r);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var d=this.getSize(),b=a.divideBy(2).round(),C=d.divideBy(2).round(),B=b.subtract(C);return!B.x&&!B.y?this:(r.animate&&r.pan?this.panBy(B):(r.pan&&this._rawPanBy(B),this.fire("move"),r.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:d}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(r){if(r=this._locateOptions=s({timeout:1e4,watch:!1},r),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),d=l(this._handleGeolocationError,this);return r.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,d,r):navigator.geolocation.getCurrentPosition(a,d,r),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(r){if(this._container._leaflet_id){var a=r.code,d=r.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+d+"."})}},_handleGeolocationResponse:function(r){if(this._container._leaflet_id){var a=r.coords.latitude,d=r.coords.longitude,b=new st(a,d),C=b.toBounds(r.coords.accuracy*2),B=this._locateOptions;if(B.setView){var $=this.getBoundsZoom(C);this.setView(b,B.maxZoom?Math.min($,B.maxZoom):$)}var ut={latlng:b,bounds:C,timestamp:r.timestamp};for(var mt in r.coords)typeof r.coords[mt]=="number"&&(ut[mt]=r.coords[mt]);this.fire("locationfound",ut)}},addHandler:function(r,a){if(!a)return this;var d=this[r]=new a(this);return this._handlers.push(d),this.options[r]&&d.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),ge(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(U(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var r;for(r in this._layers)this._layers[r].remove();for(r in this._panes)ge(this._panes[r]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(r,a){var d="leaflet-pane"+(r?" leaflet-"+r.replace("Pane","")+"-pane":""),b=Xt("div",d,a||this._mapPane);return r&&(this._panes[r]=b),b},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var r=this.getPixelBounds(),a=this.unproject(r.getBottomLeft()),d=this.unproject(r.getTopRight());return new At(a,d)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(r,a,d){r=tt(r),d=et(d||[0,0]);var b=this.getZoom()||0,C=this.getMinZoom(),B=this.getMaxZoom(),$=r.getNorthWest(),ut=r.getSouthEast(),mt=this.getSize().subtract(d),Ct=Y(this.project(ut,b),this.project($,b)).getSize(),Bt=Wt.any3d?this.options.zoomSnap:1,Yt=mt.x/Ct.x,de=mt.y/Ct.y,dn=a?Math.max(Yt,de):Math.min(Yt,de);return b=this.getScaleZoom(dn,b),Bt&&(b=Math.round(b/(Bt/100))*(Bt/100),b=a?Math.ceil(b/Bt)*Bt:Math.floor(b/Bt)*Bt),Math.max(C,Math.min(B,b))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new W(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(r,a){var d=this._getTopLeftPoint(r,a);return new q(d,d.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(r){return this.options.crs.getProjectedBounds(r===void 0?this.getZoom():r)},getPane:function(r){return typeof r=="string"?this._panes[r]:r},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(r,a){var d=this.options.crs;return a=a===void 0?this._zoom:a,d.scale(r)/d.scale(a)},getScaleZoom:function(r,a){var d=this.options.crs;a=a===void 0?this._zoom:a;var b=d.zoom(r*d.scale(a));return isNaN(b)?1/0:b},project:function(r,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(wt(r),a)},unproject:function(r,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(et(r),a)},layerPointToLatLng:function(r){var a=et(r).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(r){var a=this.project(wt(r))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(r){return this.options.crs.wrapLatLng(wt(r))},wrapLatLngBounds:function(r){return this.options.crs.wrapLatLngBounds(tt(r))},distance:function(r,a){return this.options.crs.distance(wt(r),wt(a))},containerPointToLayerPoint:function(r){return et(r).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(r){return et(r).add(this._getMapPanePos())},containerPointToLatLng:function(r){var a=this.containerPointToLayerPoint(et(r));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(r){return this.layerPointToContainerPoint(this.latLngToLayerPoint(wt(r)))},mouseEventToContainerPoint:function(r){return Cu(r,this._container)},mouseEventToLayerPoint:function(r){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(r))},mouseEventToLatLng:function(r){return this.layerPointToLatLng(this.mouseEventToLayerPoint(r))},_initContainer:function(r){var a=this._container=re(r);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");oe(a,"scroll",this._onScroll,this),this._containerId=u(a)},_initLayout:function(){var r=this._container;this._fadeAnimated=this.options.fadeAnimation&&Wt.any3d,$t(r,"leaflet-container"+(Wt.touch?" leaflet-touch":"")+(Wt.retina?" leaflet-retina":"")+(Wt.ielt9?" leaflet-oldie":"")+(Wt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=mi(r,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(r.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var r=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Ve(this._mapPane,new W(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||($t(r.markerPane,"leaflet-zoom-hide"),$t(r.shadowPane,"leaflet-zoom-hide"))},_resetView:function(r,a,d){Ve(this._mapPane,new W(0,0));var b=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var C=this._zoom!==a;this._moveStart(C,d)._move(r,a)._moveEnd(C),this.fire("viewreset"),b&&this.fire("load")},_moveStart:function(r,a){return r&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(r,a,d,b){a===void 0&&(a=this._zoom);var C=this._zoom!==a;return this._zoom=a,this._lastCenter=r,this._pixelOrigin=this._getNewPixelOrigin(r),b?d&&d.pinch&&this.fire("zoom",d):((C||d&&d.pinch)&&this.fire("zoom",d),this.fire("move",d)),this},_moveEnd:function(r){return r&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return U(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(r){Ve(this._mapPane,this._getMapPanePos().subtract(r))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(r){this._targets={},this._targets[u(this._container)]=this;var a=r?Me:oe;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Wt.any3d&&this.options.transform3DLimit&&(r?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){U(this._resizeRequest),this._resizeRequest=G(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var r=this._getMapPanePos();Math.max(Math.abs(r.x),Math.abs(r.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(r,a){for(var d=[],b,C=a==="mouseout"||a==="mouseover",B=r.target||r.srcElement,$=!1;B;){if(b=this._targets[u(B)],b&&(a==="click"||a==="preclick")&&this._draggableMoved(b)){$=!0;break}if(b&&b.listens(a,!0)&&(C&&!yl(B,r)||(d.push(b),C))||B===this._container)break;B=B.parentNode}return!d.length&&!$&&!C&&this.listens(a,!0)&&(d=[this]),d},_isClickDisabled:function(r){for(;r&&r!==this._container;){if(r._leaflet_disable_click)return!0;r=r.parentNode}},_handleDOMEvent:function(r){var a=r.target||r.srcElement;if(!(!this._loaded||a._leaflet_disable_events||r.type==="click"&&this._isClickDisabled(a))){var d=r.type;d==="mousedown"&&fl(a),this._fireDOMEvent(r,d)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(r,a,d){if(r.type==="click"){var b=s({},r);b.type="preclick",this._fireDOMEvent(b,b.type,d)}var C=this._findEventTargets(r,a);if(d){for(var B=[],$=0;$<d.length;$++)d[$].listens(a,!0)&&B.push(d[$]);C=B.concat(C)}if(C.length){a==="contextmenu"&&tn(r);var ut=C[0],mt={originalEvent:r};if(r.type!=="keypress"&&r.type!=="keydown"&&r.type!=="keyup"){var Ct=ut.getLatLng&&(!ut._radius||ut._radius<=10);mt.containerPoint=Ct?this.latLngToContainerPoint(ut.getLatLng()):this.mouseEventToContainerPoint(r),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=Ct?ut.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for($=0;$<C.length;$++)if(C[$].fire(a,mt,!0),mt.originalEvent._stopped||C[$].options.bubblingMouseEvents===!1&&T(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(r){return r=r.dragging&&r.dragging.enabled()?r:this,r.dragging&&r.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var r=0,a=this._handlers.length;r<a;r++)this._handlers[r].disable()},whenReady:function(r,a){return this._loaded?r.call(a||this,{target:this}):this.on("load",r,a),this},_getMapPanePos:function(){return sr(this._mapPane)||new W(0,0)},_moved:function(){var r=this._getMapPanePos();return r&&!r.equals([0,0])},_getTopLeftPoint:function(r,a){var d=r&&a!==void 0?this._getNewPixelOrigin(r,a):this.getPixelOrigin();return d.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(r,a){var d=this.getSize()._divideBy(2);return this.project(r,a)._subtract(d)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(r,a,d){var b=this._getNewPixelOrigin(d,a);return this.project(r,a)._subtract(b)},_latLngBoundsToNewLayerBounds:function(r,a,d){var b=this._getNewPixelOrigin(d,a);return Y([this.project(r.getSouthWest(),a)._subtract(b),this.project(r.getNorthWest(),a)._subtract(b),this.project(r.getSouthEast(),a)._subtract(b),this.project(r.getNorthEast(),a)._subtract(b)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(r){return this.latLngToLayerPoint(r).subtract(this._getCenterLayerPoint())},_limitCenter:function(r,a,d){if(!d)return r;var b=this.project(r,a),C=this.getSize().divideBy(2),B=new q(b.subtract(C),b.add(C)),$=this._getBoundsOffset(B,d,a);return Math.abs($.x)<=1&&Math.abs($.y)<=1?r:this.unproject(b.add($),a)},_limitOffset:function(r,a){if(!a)return r;var d=this.getPixelBounds(),b=new q(d.min.add(r),d.max.add(r));return r.add(this._getBoundsOffset(b,a))},_getBoundsOffset:function(r,a,d){var b=Y(this.project(a.getNorthEast(),d),this.project(a.getSouthWest(),d)),C=b.min.subtract(r.min),B=b.max.subtract(r.max),$=this._rebound(C.x,-B.x),ut=this._rebound(C.y,-B.y);return new W($,ut)},_rebound:function(r,a){return r+a>0?Math.round(r-a)/2:Math.max(0,Math.ceil(r))-Math.max(0,Math.floor(a))},_limitZoom:function(r){var a=this.getMinZoom(),d=this.getMaxZoom(),b=Wt.any3d?this.options.zoomSnap:1;return b&&(r=Math.round(r/b)*b),Math.max(a,Math.min(d,r))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){Se(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(r,a){var d=this._getCenterOffset(r)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(d)?!1:(this.panBy(d,a),!0)},_createAnimProxy:function(){var r=this._proxy=Xt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(r),this.on("zoomanim",function(a){var d=ke,b=this._proxy.style[d];rr(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),b===this._proxy.style[d]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){ge(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var r=this.getCenter(),a=this.getZoom();rr(this._proxy,this.project(r,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(r){this._animatingZoom&&r.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(r,a,d){if(this._animatingZoom)return!0;if(d=d||{},!this._zoomAnimated||d.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var b=this.getZoomScale(a),C=this._getCenterOffset(r)._divideBy(1-1/b);return d.animate!==!0&&!this.getSize().contains(C)?!1:(G(function(){this._moveStart(!0,d.noMoveStart||!1)._animateZoom(r,a,!0)},this),!0)},_animateZoom:function(r,a,d,b){this._mapPane&&(d&&(this._animatingZoom=!0,this._animateToCenter=r,this._animateToZoom=a,$t(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:r,zoom:a,noUpdate:b}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&Se(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function cm(r,a){return new pe(r,a)}var Vn=E.extend({options:{position:"topright"},initialize:function(r){x(this,r)},getPosition:function(){return this.options.position},setPosition:function(r){var a=this._map;return a&&a.removeControl(this),this.options.position=r,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(r){this.remove(),this._map=r;var a=this._container=this.onAdd(r),d=this.getPosition(),b=r._controlCorners[d];return $t(a,"leaflet-control"),d.indexOf("bottom")!==-1?b.insertBefore(a,b.firstChild):b.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(ge(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(r){this._map&&r&&r.screenX>0&&r.screenY>0&&this._map.getContainer().focus()}}),Fs=function(r){return new Vn(r)};pe.include({addControl:function(r){return r.addTo(this),this},removeControl:function(r){return r.remove(),this},_initControlPos:function(){var r=this._controlCorners={},a="leaflet-",d=this._controlContainer=Xt("div",a+"control-container",this._container);function b(C,B){var $=a+C+" "+a+B;r[C+B]=Xt("div",$,d)}b("top","left"),b("top","right"),b("bottom","left"),b("bottom","right")},_clearControlPos:function(){for(var r in this._controlCorners)ge(this._controlCorners[r]);ge(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Iu=Vn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(r,a,d,b){return d<b?-1:b<d?1:0}},initialize:function(r,a,d){x(this,d),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var b in r)this._addLayer(r[b],b);for(b in a)this._addLayer(a[b],b,!0)},onAdd:function(r){this._initLayout(),this._update(),this._map=r,r.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(r){return Vn.prototype.addTo.call(this,r),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var r=0;r<this._layers.length;r++)this._layers[r].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(r,a){return this._addLayer(r,a),this._map?this._update():this},addOverlay:function(r,a){return this._addLayer(r,a,!0),this._map?this._update():this},removeLayer:function(r){r.off("add remove",this._onLayerChange,this);var a=this._getLayer(u(r));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){$t(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var r=this._map.getSize().y-(this._container.offsetTop+50);return r<this._section.clientHeight?($t(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=r+"px"):Se(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return Se(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var r="leaflet-control-layers",a=this._container=Xt("div",r),d=this.options.collapsed;a.setAttribute("aria-haspopup",!0),Bs(a),vl(a);var b=this._section=Xt("section",r+"-list");d&&(this._map.on("click",this.collapse,this),oe(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var C=this._layersLink=Xt("a",r+"-toggle",a);C.href="#",C.title="Layers",C.setAttribute("role","button"),oe(C,{keydown:function(B){B.keyCode===13&&this._expandSafely()},click:function(B){tn(B),this._expandSafely()}},this),d||this.expand(),this._baseLayersList=Xt("div",r+"-base",b),this._separator=Xt("div",r+"-separator",b),this._overlaysList=Xt("div",r+"-overlays",b),a.appendChild(b)},_getLayer:function(r){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&u(this._layers[a].layer)===r)return this._layers[a]},_addLayer:function(r,a,d){this._map&&r.on("add remove",this._onLayerChange,this),this._layers.push({layer:r,name:a,overlay:d}),this.options.sortLayers&&this._layers.sort(l(function(b,C){return this.options.sortFunction(b.layer,C.layer,b.name,C.name)},this)),this.options.autoZIndex&&r.setZIndex&&(this._lastZIndex++,r.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;ir(this._baseLayersList),ir(this._overlaysList),this._layerControlInputs=[];var r,a,d,b,C=0;for(d=0;d<this._layers.length;d++)b=this._layers[d],this._addItem(b),a=a||b.overlay,r=r||!b.overlay,C+=b.overlay?0:1;return this.options.hideSingleBase&&(r=r&&C>1,this._baseLayersList.style.display=r?"":"none"),this._separator.style.display=a&&r?"":"none",this},_onLayerChange:function(r){this._handlingClick||this._update();var a=this._getLayer(u(r.target)),d=a.overlay?r.type==="add"?"overlayadd":"overlayremove":r.type==="add"?"baselayerchange":null;d&&this._map.fire(d,a)},_createRadioElement:function(r,a){var d='<input type="radio" class="leaflet-control-layers-selector" name="'+r+'"'+(a?' checked="checked"':"")+"/>",b=document.createElement("div");return b.innerHTML=d,b.firstChild},_addItem:function(r){var a=document.createElement("label"),d=this._map.hasLayer(r.layer),b;r.overlay?(b=document.createElement("input"),b.type="checkbox",b.className="leaflet-control-layers-selector",b.defaultChecked=d):b=this._createRadioElement("leaflet-base-layers_"+u(this),d),this._layerControlInputs.push(b),b.layerId=u(r.layer),oe(b,"click",this._onInputClick,this);var C=document.createElement("span");C.innerHTML=" "+r.name;var B=document.createElement("span");a.appendChild(B),B.appendChild(b),B.appendChild(C);var $=r.overlay?this._overlaysList:this._baseLayersList;return $.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var r=this._layerControlInputs,a,d,b=[],C=[];this._handlingClick=!0;for(var B=r.length-1;B>=0;B--)a=r[B],d=this._getLayer(a.layerId).layer,a.checked?b.push(d):a.checked||C.push(d);for(B=0;B<C.length;B++)this._map.hasLayer(C[B])&&this._map.removeLayer(C[B]);for(B=0;B<b.length;B++)this._map.hasLayer(b[B])||this._map.addLayer(b[B]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var r=this._layerControlInputs,a,d,b=this._map.getZoom(),C=r.length-1;C>=0;C--)a=r[C],d=this._getLayer(a.layerId).layer,a.disabled=d.options.minZoom!==void 0&&b<d.options.minZoom||d.options.maxZoom!==void 0&&b>d.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var r=this._section;this._preventClick=!0,oe(r,"click",tn),this.expand();var a=this;setTimeout(function(){Me(r,"click",tn),a._preventClick=!1})}}),um=function(r,a,d){return new Iu(r,a,d)},xl=Vn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(r){var a="leaflet-control-zoom",d=Xt("div",a+" leaflet-bar"),b=this.options;return this._zoomInButton=this._createButton(b.zoomInText,b.zoomInTitle,a+"-in",d,this._zoomIn),this._zoomOutButton=this._createButton(b.zoomOutText,b.zoomOutTitle,a+"-out",d,this._zoomOut),this._updateDisabled(),r.on("zoomend zoomlevelschange",this._updateDisabled,this),d},onRemove:function(r){r.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(r){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(r.shiftKey?3:1))},_zoomOut:function(r){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(r.shiftKey?3:1))},_createButton:function(r,a,d,b,C){var B=Xt("a",d,b);return B.innerHTML=r,B.href="#",B.title=a,B.setAttribute("role","button"),B.setAttribute("aria-label",a),Bs(B),oe(B,"click",ar),oe(B,"click",C,this),oe(B,"click",this._refocusOnMap,this),B},_updateDisabled:function(){var r=this._map,a="leaflet-disabled";Se(this._zoomInButton,a),Se(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||r._zoom===r.getMinZoom())&&($t(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||r._zoom===r.getMaxZoom())&&($t(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});pe.mergeOptions({zoomControl:!0}),pe.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new xl,this.addControl(this.zoomControl))});var hm=function(r){return new xl(r)},Du=Vn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(r){var a="leaflet-control-scale",d=Xt("div",a),b=this.options;return this._addScales(b,a+"-line",d),r.on(b.updateWhenIdle?"moveend":"move",this._update,this),r.whenReady(this._update,this),d},onRemove:function(r){r.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(r,a,d){r.metric&&(this._mScale=Xt("div",a,d)),r.imperial&&(this._iScale=Xt("div",a,d))},_update:function(){var r=this._map,a=r.getSize().y/2,d=r.distance(r.containerPointToLatLng([0,a]),r.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(d)},_updateScales:function(r){this.options.metric&&r&&this._updateMetric(r),this.options.imperial&&r&&this._updateImperial(r)},_updateMetric:function(r){var a=this._getRoundNum(r),d=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,d,a/r)},_updateImperial:function(r){var a=r*3.2808399,d,b,C;a>5280?(d=a/5280,b=this._getRoundNum(d),this._updateScale(this._iScale,b+" mi",b/d)):(C=this._getRoundNum(a),this._updateScale(this._iScale,C+" ft",C/a))},_updateScale:function(r,a,d){r.style.width=Math.round(this.options.maxWidth*d)+"px",r.innerHTML=a},_getRoundNum:function(r){var a=Math.pow(10,(Math.floor(r)+"").length-1),d=r/a;return d=d>=10?10:d>=5?5:d>=3?3:d>=2?2:1,a*d}}),dm=function(r){return new Du(r)},fm='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',bl=Vn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Wt.inlineSvg?fm+" ":"")+"Leaflet</a>"},initialize:function(r){x(this,r),this._attributions={}},onAdd:function(r){r.attributionControl=this,this._container=Xt("div","leaflet-control-attribution"),Bs(this._container);for(var a in r._layers)r._layers[a].getAttribution&&this.addAttribution(r._layers[a].getAttribution());return this._update(),r.on("layeradd",this._addAttribution,this),this._container},onRemove:function(r){r.off("layeradd",this._addAttribution,this)},_addAttribution:function(r){r.layer.getAttribution&&(this.addAttribution(r.layer.getAttribution()),r.layer.once("remove",function(){this.removeAttribution(r.layer.getAttribution())},this))},setPrefix:function(r){return this.options.prefix=r,this._update(),this},addAttribution:function(r){return r?(this._attributions[r]||(this._attributions[r]=0),this._attributions[r]++,this._update(),this):this},removeAttribution:function(r){return r?(this._attributions[r]&&(this._attributions[r]--,this._update()),this):this},_update:function(){if(this._map){var r=[];for(var a in this._attributions)this._attributions[a]&&r.push(a);var d=[];this.options.prefix&&d.push(this.options.prefix),r.length&&d.push(r.join(", ")),this._container.innerHTML=d.join(' <span aria-hidden="true">|</span> ')}}});pe.mergeOptions({attributionControl:!0}),pe.addInitHook(function(){this.options.attributionControl&&new bl().addTo(this)});var pm=function(r){return new bl(r)};Vn.Layers=Iu,Vn.Zoom=xl,Vn.Scale=Du,Vn.Attribution=bl,Fs.layers=um,Fs.zoom=hm,Fs.scale=dm,Fs.attribution=pm;var ri=E.extend({initialize:function(r){this._map=r},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});ri.addTo=function(r,a){return r.addHandler(a,this),this};var mm={Events:ot},ku=Wt.touch?"touchstart mousedown":"mousedown",Oi=rt.extend({options:{clickTolerance:3},initialize:function(r,a,d,b){x(this,b),this._element=r,this._dragStartTarget=a||r,this._preventOutline=d},enable:function(){this._enabled||(oe(this._dragStartTarget,ku,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Oi._dragging===this&&this.finishDrag(!0),Me(this._dragStartTarget,ku,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(r){if(this._enabled&&(this._moved=!1,!He(this._element,"leaflet-zoom-anim"))){if(r.touches&&r.touches.length!==1){Oi._dragging===this&&this.finishDrag();return}if(!(Oi._dragging||r.shiftKey||r.which!==1&&r.button!==1&&!r.touches)&&(Oi._dragging=this,this._preventOutline&&fl(this._element),ul(),Os(),!this._moving)){this.fire("down");var a=r.touches?r.touches[0]:r,d=Tu(this._element);this._startPoint=new W(a.clientX,a.clientY),this._startPos=sr(this._element),this._parentScale=pl(d);var b=r.type==="mousedown";oe(document,b?"mousemove":"touchmove",this._onMove,this),oe(document,b?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(r){if(this._enabled){if(r.touches&&r.touches.length>1){this._moved=!0;return}var a=r.touches&&r.touches.length===1?r.touches[0]:r,d=new W(a.clientX,a.clientY)._subtract(this._startPoint);!d.x&&!d.y||Math.abs(d.x)+Math.abs(d.y)<this.options.clickTolerance||(d.x/=this._parentScale.x,d.y/=this._parentScale.y,tn(r),this._moved||(this.fire("dragstart"),this._moved=!0,$t(document.body,"leaflet-dragging"),this._lastTarget=r.target||r.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),$t(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(d),this._moving=!0,this._lastEvent=r,this._updatePosition())}},_updatePosition:function(){var r={originalEvent:this._lastEvent};this.fire("predrag",r),Ve(this._element,this._newPos),this.fire("drag",r)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(r){Se(document.body,"leaflet-dragging"),this._lastTarget&&(Se(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),Me(document,"mousemove touchmove",this._onMove,this),Me(document,"mouseup touchend touchcancel",this._onUp,this),hl(),Us();var a=this._moved&&this._moving;this._moving=!1,Oi._dragging=!1,a&&this.fire("dragend",{noInertia:r,distance:this._newPos.distanceTo(this._startPos)})}});function Nu(r,a,d){var b,C=[1,4,2,8],B,$,ut,mt,Ct,Bt,Yt,de;for(B=0,Bt=r.length;B<Bt;B++)r[B]._code=lr(r[B],a);for(ut=0;ut<4;ut++){for(Yt=C[ut],b=[],B=0,Bt=r.length,$=Bt-1;B<Bt;$=B++)mt=r[B],Ct=r[$],mt._code&Yt?Ct._code&Yt||(de=Uo(Ct,mt,Yt,a,d),de._code=lr(de,a),b.push(de)):(Ct._code&Yt&&(de=Uo(Ct,mt,Yt,a,d),de._code=lr(de,a),b.push(de)),b.push(mt));r=b}return r}function Ou(r,a){var d,b,C,B,$,ut,mt,Ct,Bt;if(!r||r.length===0)throw new Error("latlngs not passed");On(r)||(console.warn("latlngs are not flat! Only the first ring will be used"),r=r[0]);var Yt=wt([0,0]),de=tt(r),dn=de.getNorthWest().distanceTo(de.getSouthWest())*de.getNorthEast().distanceTo(de.getNorthWest());dn<1700&&(Yt=wl(r));var je=r.length,Un=[];for(d=0;d<je;d++){var xn=wt(r[d]);Un.push(a.project(wt([xn.lat-Yt.lat,xn.lng-Yt.lng])))}for(ut=mt=Ct=0,d=0,b=je-1;d<je;b=d++)C=Un[d],B=Un[b],$=C.y*B.x-B.y*C.x,mt+=(C.x+B.x)*$,Ct+=(C.y+B.y)*$,ut+=$*3;ut===0?Bt=Un[0]:Bt=[mt/ut,Ct/ut];var Ur=a.unproject(et(Bt));return wt([Ur.lat+Yt.lat,Ur.lng+Yt.lng])}function wl(r){for(var a=0,d=0,b=0,C=0;C<r.length;C++){var B=wt(r[C]);a+=B.lat,d+=B.lng,b++}return wt([a/b,d/b])}var gm={__proto__:null,clipPolygon:Nu,polygonCenter:Ou,centroid:wl};function Uu(r,a){if(!a||!r.length)return r.slice();var d=a*a;return r=ym(r,d),r=vm(r,d),r}function zu(r,a,d){return Math.sqrt(Hs(r,a,d,!0))}function _m(r,a,d){return Hs(r,a,d)}function vm(r,a){var d=r.length,b=typeof Uint8Array<"u"?Uint8Array:Array,C=new b(d);C[0]=C[d-1]=1,Ml(r,C,a,0,d-1);var B,$=[];for(B=0;B<d;B++)C[B]&&$.push(r[B]);return $}function Ml(r,a,d,b,C){var B=0,$,ut,mt;for(ut=b+1;ut<=C-1;ut++)mt=Hs(r[ut],r[b],r[C],!0),mt>B&&($=ut,B=mt);B>d&&(a[$]=1,Ml(r,a,d,b,$),Ml(r,a,d,$,C))}function ym(r,a){for(var d=[r[0]],b=1,C=0,B=r.length;b<B;b++)xm(r[b],r[C])>a&&(d.push(r[b]),C=b);return C<B-1&&d.push(r[B-1]),d}var Bu;function Fu(r,a,d,b,C){var B=b?Bu:lr(r,d),$=lr(a,d),ut,mt,Ct;for(Bu=$;;){if(!(B|$))return[r,a];if(B&$)return!1;ut=B||$,mt=Uo(r,a,ut,d,C),Ct=lr(mt,d),ut===B?(r=mt,B=Ct):(a=mt,$=Ct)}}function Uo(r,a,d,b,C){var B=a.x-r.x,$=a.y-r.y,ut=b.min,mt=b.max,Ct,Bt;return d&8?(Ct=r.x+B*(mt.y-r.y)/$,Bt=mt.y):d&4?(Ct=r.x+B*(ut.y-r.y)/$,Bt=ut.y):d&2?(Ct=mt.x,Bt=r.y+$*(mt.x-r.x)/B):d&1&&(Ct=ut.x,Bt=r.y+$*(ut.x-r.x)/B),new W(Ct,Bt,C)}function lr(r,a){var d=0;return r.x<a.min.x?d|=1:r.x>a.max.x&&(d|=2),r.y<a.min.y?d|=4:r.y>a.max.y&&(d|=8),d}function xm(r,a){var d=a.x-r.x,b=a.y-r.y;return d*d+b*b}function Hs(r,a,d,b){var C=a.x,B=a.y,$=d.x-C,ut=d.y-B,mt=$*$+ut*ut,Ct;return mt>0&&(Ct=((r.x-C)*$+(r.y-B)*ut)/mt,Ct>1?(C=d.x,B=d.y):Ct>0&&(C+=$*Ct,B+=ut*Ct)),$=r.x-C,ut=r.y-B,b?$*$+ut*ut:new W(C,B)}function On(r){return!w(r[0])||typeof r[0][0]!="object"&&typeof r[0][0]<"u"}function Hu(r){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),On(r)}function Vu(r,a){var d,b,C,B,$,ut,mt,Ct;if(!r||r.length===0)throw new Error("latlngs not passed");On(r)||(console.warn("latlngs are not flat! Only the first ring will be used"),r=r[0]);var Bt=wt([0,0]),Yt=tt(r),de=Yt.getNorthWest().distanceTo(Yt.getSouthWest())*Yt.getNorthEast().distanceTo(Yt.getNorthWest());de<1700&&(Bt=wl(r));var dn=r.length,je=[];for(d=0;d<dn;d++){var Un=wt(r[d]);je.push(a.project(wt([Un.lat-Bt.lat,Un.lng-Bt.lng])))}for(d=0,b=0;d<dn-1;d++)b+=je[d].distanceTo(je[d+1])/2;if(b===0)Ct=je[0];else for(d=0,B=0;d<dn-1;d++)if($=je[d],ut=je[d+1],C=$.distanceTo(ut),B+=C,B>b){mt=(B-b)/C,Ct=[ut.x-mt*(ut.x-$.x),ut.y-mt*(ut.y-$.y)];break}var xn=a.unproject(et(Ct));return wt([xn.lat+Bt.lat,xn.lng+Bt.lng])}var bm={__proto__:null,simplify:Uu,pointToSegmentDistance:zu,closestPointOnSegment:_m,clipSegment:Fu,_getEdgeIntersection:Uo,_getBitCode:lr,_sqClosestPointOnSegment:Hs,isFlat:On,_flat:Hu,polylineCenter:Vu},Sl={project:function(r){return new W(r.lng,r.lat)},unproject:function(r){return new st(r.y,r.x)},bounds:new q([-180,-90],[180,90])},El={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(r){var a=Math.PI/180,d=this.R,b=r.lat*a,C=this.R_MINOR/d,B=Math.sqrt(1-C*C),$=B*Math.sin(b),ut=Math.tan(Math.PI/4-b/2)/Math.pow((1-$)/(1+$),B/2);return b=-d*Math.log(Math.max(ut,1e-10)),new W(r.lng*a*d,b)},unproject:function(r){for(var a=180/Math.PI,d=this.R,b=this.R_MINOR/d,C=Math.sqrt(1-b*b),B=Math.exp(-r.y/d),$=Math.PI/2-2*Math.atan(B),ut=0,mt=.1,Ct;ut<15&&Math.abs(mt)>1e-7;ut++)Ct=C*Math.sin($),Ct=Math.pow((1-Ct)/(1+Ct),C/2),mt=Math.PI/2-2*Math.atan(B*Ct)-$,$+=mt;return new st($*a,r.x*a/d)}},wm={__proto__:null,LonLat:Sl,Mercator:El,SphericalMercator:Ut},Mm=s({},Pt,{code:"EPSG:3395",projection:El,transformation:function(){var r=.5/(Math.PI*El.R);return xt(r,.5,-r,.5)}()}),Gu=s({},Pt,{code:"EPSG:4326",projection:Sl,transformation:xt(1/180,1,-1/180,.5)}),Sm=s({},St,{projection:Sl,transformation:xt(1,0,-1,0),scale:function(r){return Math.pow(2,r)},zoom:function(r){return Math.log(r)/Math.LN2},distance:function(r,a){var d=a.lng-r.lng,b=a.lat-r.lat;return Math.sqrt(d*d+b*b)},infinite:!0});St.Earth=Pt,St.EPSG3395=Mm,St.EPSG3857=bt,St.EPSG900913=A,St.EPSG4326=Gu,St.Simple=Sm;var Gn=rt.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(r){return r.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(r){return r&&r.removeLayer(this),this},getPane:function(r){return this._map.getPane(r?this.options[r]||r:this.options.pane)},addInteractiveTarget:function(r){return this._map._targets[u(r)]=this,this},removeInteractiveTarget:function(r){return delete this._map._targets[u(r)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(r){var a=r.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var d=this.getEvents();a.on(d,this),this.once("remove",function(){a.off(d,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});pe.include({addLayer:function(r){if(!r._layerAdd)throw new Error("The provided object is not a Layer.");var a=u(r);return this._layers[a]?this:(this._layers[a]=r,r._mapToAdd=this,r.beforeAdd&&r.beforeAdd(this),this.whenReady(r._layerAdd,r),this)},removeLayer:function(r){var a=u(r);return this._layers[a]?(this._loaded&&r.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:r}),r.fire("remove")),r._map=r._mapToAdd=null,this):this},hasLayer:function(r){return u(r)in this._layers},eachLayer:function(r,a){for(var d in this._layers)r.call(a,this._layers[d]);return this},_addLayers:function(r){r=r?w(r)?r:[r]:[];for(var a=0,d=r.length;a<d;a++)this.addLayer(r[a])},_addZoomLimit:function(r){(!isNaN(r.options.maxZoom)||!isNaN(r.options.minZoom))&&(this._zoomBoundLayers[u(r)]=r,this._updateZoomLevels())},_removeZoomLimit:function(r){var a=u(r);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var r=1/0,a=-1/0,d=this._getZoomSpan();for(var b in this._zoomBoundLayers){var C=this._zoomBoundLayers[b].options;r=C.minZoom===void 0?r:Math.min(r,C.minZoom),a=C.maxZoom===void 0?a:Math.max(a,C.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=r===1/0?void 0:r,d!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Ir=Gn.extend({initialize:function(r,a){x(this,a),this._layers={};var d,b;if(r)for(d=0,b=r.length;d<b;d++)this.addLayer(r[d])},addLayer:function(r){var a=this.getLayerId(r);return this._layers[a]=r,this._map&&this._map.addLayer(r),this},removeLayer:function(r){var a=r in this._layers?r:this.getLayerId(r);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(r){var a=typeof r=="number"?r:this.getLayerId(r);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(r){var a=Array.prototype.slice.call(arguments,1),d,b;for(d in this._layers)b=this._layers[d],b[r]&&b[r].apply(b,a);return this},onAdd:function(r){this.eachLayer(r.addLayer,r)},onRemove:function(r){this.eachLayer(r.removeLayer,r)},eachLayer:function(r,a){for(var d in this._layers)r.call(a,this._layers[d]);return this},getLayer:function(r){return this._layers[r]},getLayers:function(){var r=[];return this.eachLayer(r.push,r),r},setZIndex:function(r){return this.invoke("setZIndex",r)},getLayerId:function(r){return u(r)}}),Em=function(r,a){return new Ir(r,a)},gi=Ir.extend({addLayer:function(r){return this.hasLayer(r)?this:(r.addEventParent(this),Ir.prototype.addLayer.call(this,r),this.fire("layeradd",{layer:r}))},removeLayer:function(r){return this.hasLayer(r)?(r in this._layers&&(r=this._layers[r]),r.removeEventParent(this),Ir.prototype.removeLayer.call(this,r),this.fire("layerremove",{layer:r})):this},setStyle:function(r){return this.invoke("setStyle",r)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var r=new At;for(var a in this._layers){var d=this._layers[a];r.extend(d.getBounds?d.getBounds():d.getLatLng())}return r}}),Tm=function(r,a){return new gi(r,a)},Dr=E.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(r){x(this,r)},createIcon:function(r){return this._createIcon("icon",r)},createShadow:function(r){return this._createIcon("shadow",r)},_createIcon:function(r,a){var d=this._getIconUrl(r);if(!d){if(r==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var b=this._createImg(d,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(b,r),(this.options.crossOrigin||this.options.crossOrigin==="")&&(b.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),b},_setIconStyles:function(r,a){var d=this.options,b=d[a+"Size"];typeof b=="number"&&(b=[b,b]);var C=et(b),B=et(a==="shadow"&&d.shadowAnchor||d.iconAnchor||C&&C.divideBy(2,!0));r.className="leaflet-marker-"+a+" "+(d.className||""),B&&(r.style.marginLeft=-B.x+"px",r.style.marginTop=-B.y+"px"),C&&(r.style.width=C.x+"px",r.style.height=C.y+"px")},_createImg:function(r,a){return a=a||document.createElement("img"),a.src=r,a},_getIconUrl:function(r){return Wt.retina&&this.options[r+"RetinaUrl"]||this.options[r+"Url"]}});function Am(r){return new Dr(r)}var Vs=Dr.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(r){return typeof Vs.imagePath!="string"&&(Vs.imagePath=this._detectIconPath()),(this.options.imagePath||Vs.imagePath)+Dr.prototype._getIconUrl.call(this,r)},_stripUrl:function(r){var a=function(d,b,C){var B=b.exec(d);return B&&B[C]};return r=a(r,/^url\((['"])?(.+)\1\)$/,2),r&&a(r,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var r=Xt("div","leaflet-default-icon-path",document.body),a=mi(r,"background-image")||mi(r,"backgroundImage");if(document.body.removeChild(r),a=this._stripUrl(a),a)return a;var d=document.querySelector('link[href$="leaflet.css"]');return d?d.href.substring(0,d.href.length-11-1):""}}),Wu=ri.extend({initialize:function(r){this._marker=r},addHooks:function(){var r=this._marker._icon;this._draggable||(this._draggable=new Oi(r,r,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),$t(r,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&Se(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(r){var a=this._marker,d=a._map,b=this._marker.options.autoPanSpeed,C=this._marker.options.autoPanPadding,B=sr(a._icon),$=d.getPixelBounds(),ut=d.getPixelOrigin(),mt=Y($.min._subtract(ut).add(C),$.max._subtract(ut).subtract(C));if(!mt.contains(B)){var Ct=et((Math.max(mt.max.x,B.x)-mt.max.x)/($.max.x-mt.max.x)-(Math.min(mt.min.x,B.x)-mt.min.x)/($.min.x-mt.min.x),(Math.max(mt.max.y,B.y)-mt.max.y)/($.max.y-mt.max.y)-(Math.min(mt.min.y,B.y)-mt.min.y)/($.min.y-mt.min.y)).multiplyBy(b);d.panBy(Ct,{animate:!1}),this._draggable._newPos._add(Ct),this._draggable._startPos._add(Ct),Ve(a._icon,this._draggable._newPos),this._onDrag(r),this._panRequest=G(this._adjustPan.bind(this,r))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(r){this._marker.options.autoPan&&(U(this._panRequest),this._panRequest=G(this._adjustPan.bind(this,r)))},_onDrag:function(r){var a=this._marker,d=a._shadow,b=sr(a._icon),C=a._map.layerPointToLatLng(b);d&&Ve(d,b),a._latlng=C,r.latlng=C,r.oldLatLng=this._oldLatLng,a.fire("move",r).fire("drag",r)},_onDragEnd:function(r){U(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",r)}}),zo=Gn.extend({options:{icon:new Vs,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(r,a){x(this,a),this._latlng=wt(r)},onAdd:function(r){this._zoomAnimated=this._zoomAnimated&&r.options.markerZoomAnimation,this._zoomAnimated&&r.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(r){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&r.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(r){var a=this._latlng;return this._latlng=wt(r),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(r){return this.options.zIndexOffset=r,this.update()},getIcon:function(){return this.options.icon},setIcon:function(r){return this.options.icon=r,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var r=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(r)}return this},_initIcon:function(){var r=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),d=r.icon.createIcon(this._icon),b=!1;d!==this._icon&&(this._icon&&this._removeIcon(),b=!0,r.title&&(d.title=r.title),d.tagName==="IMG"&&(d.alt=r.alt||"")),$t(d,a),r.keyboard&&(d.tabIndex="0",d.setAttribute("role","button")),this._icon=d,r.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&oe(d,"focus",this._panOnFocus,this);var C=r.icon.createShadow(this._shadow),B=!1;C!==this._shadow&&(this._removeShadow(),B=!0),C&&($t(C,a),C.alt=""),this._shadow=C,r.opacity<1&&this._updateOpacity(),b&&this.getPane().appendChild(this._icon),this._initInteraction(),C&&B&&this.getPane(r.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&Me(this._icon,"focus",this._panOnFocus,this),ge(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&ge(this._shadow),this._shadow=null},_setPos:function(r){this._icon&&Ve(this._icon,r),this._shadow&&Ve(this._shadow,r),this._zIndex=r.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(r){this._icon&&(this._icon.style.zIndex=this._zIndex+r)},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&($t(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Wu)){var r=this.options.draggable;this.dragging&&(r=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Wu(this),r&&this.dragging.enable()}},setOpacity:function(r){return this.options.opacity=r,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var r=this.options.opacity;this._icon&&yn(this._icon,r),this._shadow&&yn(this._shadow,r)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var r=this._map;if(r){var a=this.options.icon.options,d=a.iconSize?et(a.iconSize):et(0,0),b=a.iconAnchor?et(a.iconAnchor):et(0,0);r.panInside(this._latlng,{paddingTopLeft:b,paddingBottomRight:d.subtract(b)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Lm(r,a){return new zo(r,a)}var Ui=Gn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(r){this._renderer=r.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(r){return x(this,r),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&r&&Object.prototype.hasOwnProperty.call(r,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Bo=Ui.extend({options:{fill:!0,radius:10},initialize:function(r,a){x(this,a),this._latlng=wt(r),this._radius=this.options.radius},setLatLng:function(r){var a=this._latlng;return this._latlng=wt(r),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(r){return this.options.radius=this._radius=r,this.redraw()},getRadius:function(){return this._radius},setStyle:function(r){var a=r&&r.radius||this._radius;return Ui.prototype.setStyle.call(this,r),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var r=this._radius,a=this._radiusY||r,d=this._clickTolerance(),b=[r+d,a+d];this._pxBounds=new q(this._point.subtract(b),this._point.add(b))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(r){return r.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Cm(r,a){return new Bo(r,a)}var Tl=Bo.extend({initialize:function(r,a,d){if(typeof a=="number"&&(a=s({},d,{radius:a})),x(this,a),this._latlng=wt(r),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(r){return this._mRadius=r,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var r=[this._radius,this._radiusY||this._radius];return new At(this._map.layerPointToLatLng(this._point.subtract(r)),this._map.layerPointToLatLng(this._point.add(r)))},setStyle:Ui.prototype.setStyle,_project:function(){var r=this._latlng.lng,a=this._latlng.lat,d=this._map,b=d.options.crs;if(b.distance===Pt.distance){var C=Math.PI/180,B=this._mRadius/Pt.R/C,$=d.project([a+B,r]),ut=d.project([a-B,r]),mt=$.add(ut).divideBy(2),Ct=d.unproject(mt).lat,Bt=Math.acos((Math.cos(B*C)-Math.sin(a*C)*Math.sin(Ct*C))/(Math.cos(a*C)*Math.cos(Ct*C)))/C;(isNaN(Bt)||Bt===0)&&(Bt=B/Math.cos(Math.PI/180*a)),this._point=mt.subtract(d.getPixelOrigin()),this._radius=isNaN(Bt)?0:mt.x-d.project([Ct,r-Bt]).x,this._radiusY=mt.y-$.y}else{var Yt=b.unproject(b.project(this._latlng).subtract([this._mRadius,0]));this._point=d.latLngToLayerPoint(this._latlng),this._radius=this._point.x-d.latLngToLayerPoint(Yt).x}this._updateBounds()}});function Pm(r,a,d){return new Tl(r,a,d)}var _i=Ui.extend({options:{smoothFactor:1,noClip:!1},initialize:function(r,a){x(this,a),this._setLatLngs(r)},getLatLngs:function(){return this._latlngs},setLatLngs:function(r){return this._setLatLngs(r),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(r){for(var a=1/0,d=null,b=Hs,C,B,$=0,ut=this._parts.length;$<ut;$++)for(var mt=this._parts[$],Ct=1,Bt=mt.length;Ct<Bt;Ct++){C=mt[Ct-1],B=mt[Ct];var Yt=b(r,C,B,!0);Yt<a&&(a=Yt,d=b(r,C,B))}return d&&(d.distance=Math.sqrt(a)),d},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Vu(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(r,a){return a=a||this._defaultShape(),r=wt(r),a.push(r),this._bounds.extend(r),this.redraw()},_setLatLngs:function(r){this._bounds=new At,this._latlngs=this._convertLatLngs(r)},_defaultShape:function(){return On(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(r){for(var a=[],d=On(r),b=0,C=r.length;b<C;b++)d?(a[b]=wt(r[b]),this._bounds.extend(a[b])):a[b]=this._convertLatLngs(r[b]);return a},_project:function(){var r=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,r),this._bounds.isValid()&&r.isValid()&&(this._rawPxBounds=r,this._updateBounds())},_updateBounds:function(){var r=this._clickTolerance(),a=new W(r,r);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(r,a,d){var b=r[0]instanceof st,C=r.length,B,$;if(b){for($=[],B=0;B<C;B++)$[B]=this._map.latLngToLayerPoint(r[B]),d.extend($[B]);a.push($)}else for(B=0;B<C;B++)this._projectLatlngs(r[B],a,d)},_clipPoints:function(){var r=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(r))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,d,b,C,B,$,ut,mt;for(d=0,C=0,B=this._rings.length;d<B;d++)for(mt=this._rings[d],b=0,$=mt.length;b<$-1;b++)ut=Fu(mt[b],mt[b+1],r,b,!0),ut&&(a[C]=a[C]||[],a[C].push(ut[0]),(ut[1]!==mt[b+1]||b===$-2)&&(a[C].push(ut[1]),C++))}},_simplifyPoints:function(){for(var r=this._parts,a=this.options.smoothFactor,d=0,b=r.length;d<b;d++)r[d]=Uu(r[d],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(r,a){var d,b,C,B,$,ut,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(r))return!1;for(d=0,B=this._parts.length;d<B;d++)for(ut=this._parts[d],b=0,$=ut.length,C=$-1;b<$;C=b++)if(!(!a&&b===0)&&zu(r,ut[C],ut[b])<=mt)return!0;return!1}});function Rm(r,a){return new _i(r,a)}_i._flat=Hu;var kr=_i.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Ou(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(r){var a=_i.prototype._convertLatLngs.call(this,r),d=a.length;return d>=2&&a[0]instanceof st&&a[0].equals(a[d-1])&&a.pop(),a},_setLatLngs:function(r){_i.prototype._setLatLngs.call(this,r),On(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return On(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var r=this._renderer._bounds,a=this.options.weight,d=new W(a,a);if(r=new q(r.min.subtract(d),r.max.add(d)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(r))){if(this.options.noClip){this._parts=this._rings;return}for(var b=0,C=this._rings.length,B;b<C;b++)B=Nu(this._rings[b],r,!0),B.length&&this._parts.push(B)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(r){var a=!1,d,b,C,B,$,ut,mt,Ct;if(!this._pxBounds||!this._pxBounds.contains(r))return!1;for(B=0,mt=this._parts.length;B<mt;B++)for(d=this._parts[B],$=0,Ct=d.length,ut=Ct-1;$<Ct;ut=$++)b=d[$],C=d[ut],b.y>r.y!=C.y>r.y&&r.x<(C.x-b.x)*(r.y-b.y)/(C.y-b.y)+b.x&&(a=!a);return a||_i.prototype._containsPoint.call(this,r,!0)}});function Im(r,a){return new kr(r,a)}var vi=gi.extend({initialize:function(r,a){x(this,a),this._layers={},r&&this.addData(r)},addData:function(r){var a=w(r)?r:r.features,d,b,C;if(a){for(d=0,b=a.length;d<b;d++)C=a[d],(C.geometries||C.geometry||C.features||C.coordinates)&&this.addData(C);return this}var B=this.options;if(B.filter&&!B.filter(r))return this;var $=Fo(r,B);return $?($.feature=Go(r),$.defaultOptions=$.options,this.resetStyle($),B.onEachFeature&&B.onEachFeature(r,$),this.addLayer($)):this},resetStyle:function(r){return r===void 0?this.eachLayer(this.resetStyle,this):(r.options=s({},r.defaultOptions),this._setLayerStyle(r,this.options.style),this)},setStyle:function(r){return this.eachLayer(function(a){this._setLayerStyle(a,r)},this)},_setLayerStyle:function(r,a){r.setStyle&&(typeof a=="function"&&(a=a(r.feature)),r.setStyle(a))}});function Fo(r,a){var d=r.type==="Feature"?r.geometry:r,b=d?d.coordinates:null,C=[],B=a&&a.pointToLayer,$=a&&a.coordsToLatLng||Al,ut,mt,Ct,Bt;if(!b&&!d)return null;switch(d.type){case"Point":return ut=$(b),Zu(B,r,ut,a);case"MultiPoint":for(Ct=0,Bt=b.length;Ct<Bt;Ct++)ut=$(b[Ct]),C.push(Zu(B,r,ut,a));return new gi(C);case"LineString":case"MultiLineString":return mt=Ho(b,d.type==="LineString"?0:1,$),new _i(mt,a);case"Polygon":case"MultiPolygon":return mt=Ho(b,d.type==="Polygon"?1:2,$),new kr(mt,a);case"GeometryCollection":for(Ct=0,Bt=d.geometries.length;Ct<Bt;Ct++){var Yt=Fo({geometry:d.geometries[Ct],type:"Feature",properties:r.properties},a);Yt&&C.push(Yt)}return new gi(C);case"FeatureCollection":for(Ct=0,Bt=d.features.length;Ct<Bt;Ct++){var de=Fo(d.features[Ct],a);de&&C.push(de)}return new gi(C);default:throw new Error("Invalid GeoJSON object.")}}function Zu(r,a,d,b){return r?r(a,d):new zo(d,b&&b.markersInheritOptions&&b)}function Al(r){return new st(r[1],r[0],r[2])}function Ho(r,a,d){for(var b=[],C=0,B=r.length,$;C<B;C++)$=a?Ho(r[C],a-1,d):(d||Al)(r[C]),b.push($);return b}function Ll(r,a){return r=wt(r),r.alt!==void 0?[g(r.lng,a),g(r.lat,a),g(r.alt,a)]:[g(r.lng,a),g(r.lat,a)]}function Vo(r,a,d,b){for(var C=[],B=0,$=r.length;B<$;B++)C.push(a?Vo(r[B],On(r[B])?0:a-1,d,b):Ll(r[B],b));return!a&&d&&C.length>0&&C.push(C[0].slice()),C}function Nr(r,a){return r.feature?s({},r.feature,{geometry:a}):Go(a)}function Go(r){return r.type==="Feature"||r.type==="FeatureCollection"?r:{type:"Feature",properties:{},geometry:r}}var Cl={toGeoJSON:function(r){return Nr(this,{type:"Point",coordinates:Ll(this.getLatLng(),r)})}};zo.include(Cl),Tl.include(Cl),Bo.include(Cl),_i.include({toGeoJSON:function(r){var a=!On(this._latlngs),d=Vo(this._latlngs,a?1:0,!1,r);return Nr(this,{type:(a?"Multi":"")+"LineString",coordinates:d})}}),kr.include({toGeoJSON:function(r){var a=!On(this._latlngs),d=a&&!On(this._latlngs[0]),b=Vo(this._latlngs,d?2:a?1:0,!0,r);return a||(b=[b]),Nr(this,{type:(d?"Multi":"")+"Polygon",coordinates:b})}}),Ir.include({toMultiPoint:function(r){var a=[];return this.eachLayer(function(d){a.push(d.toGeoJSON(r).geometry.coordinates)}),Nr(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(r){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(r);var d=a==="GeometryCollection",b=[];return this.eachLayer(function(C){if(C.toGeoJSON){var B=C.toGeoJSON(r);if(d)b.push(B.geometry);else{var $=Go(B);$.type==="FeatureCollection"?b.push.apply(b,$.features):b.push($)}}}),d?Nr(this,{geometries:b,type:"GeometryCollection"}):{type:"FeatureCollection",features:b}}});function Xu(r,a){return new vi(r,a)}var Dm=Xu,Wo=Gn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(r,a,d){this._url=r,this._bounds=tt(a),x(this,d)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&($t(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){ge(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(r){return this.options.opacity=r,this._image&&this._updateOpacity(),this},setStyle:function(r){return r.opacity&&this.setOpacity(r.opacity),this},bringToFront:function(){return this._map&&Nn(this._image),this},bringToBack:function(){return this._map&&ni(this._image),this},setUrl:function(r){return this._url=r,this._image&&(this._image.src=r),this},setBounds:function(r){return this._bounds=tt(r),this._map&&this._reset(),this},getEvents:function(){var r={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(r.zoomanim=this._animateZoom),r},setZIndex:function(r){return this.options.zIndex=r,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var r=this._url.tagName==="IMG",a=this._image=r?this._url:Xt("img");if($t(a,"leaflet-image-layer"),this._zoomAnimated&&$t(a,"leaflet-zoom-animated"),this.options.className&&$t(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),r){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(r){var a=this._map.getZoomScale(r.zoom),d=this._map._latLngBoundsToNewLayerBounds(this._bounds,r.zoom,r.center).min;rr(this._image,d,a)},_reset:function(){var r=this._image,a=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),d=a.getSize();Ve(r,a.min),r.style.width=d.x+"px",r.style.height=d.y+"px"},_updateOpacity:function(){yn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var r=this.options.errorOverlayUrl;r&&this._url!==r&&(this._url=r,this._image.src=r)},getCenter:function(){return this._bounds.getCenter()}}),km=function(r,a,d){return new Wo(r,a,d)},qu=Wo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var r=this._url.tagName==="VIDEO",a=this._image=r?this._url:Xt("video");if($t(a,"leaflet-image-layer"),this._zoomAnimated&&$t(a,"leaflet-zoom-animated"),this.options.className&&$t(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onloadeddata=l(this.fire,this,"load"),r){for(var d=a.getElementsByTagName("source"),b=[],C=0;C<d.length;C++)b.push(d[C].src);this._url=d.length>0?b:[a.src];return}w(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var B=0;B<this._url.length;B++){var $=Xt("source");$.src=this._url[B],a.appendChild($)}}});function Nm(r,a,d){return new qu(r,a,d)}var ju=Wo.extend({_initImage:function(){var r=this._image=this._url;$t(r,"leaflet-image-layer"),this._zoomAnimated&&$t(r,"leaflet-zoom-animated"),this.options.className&&$t(r,this.options.className),r.onselectstart=p,r.onmousemove=p}});function Om(r,a,d){return new ju(r,a,d)}var si=Gn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(r,a){r&&(r instanceof st||w(r))?(this._latlng=wt(r),x(this,a)):(x(this,r),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(r){return r=arguments.length?r:this._source._map,r.hasLayer(this)||r.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(r){return this._map?this.close():(arguments.length?this._source=r:r=this._source,this._prepareOpen(),this.openOn(r._map)),this},onAdd:function(r){this._zoomAnimated=r._zoomAnimated,this._container||this._initLayout(),r._fadeAnimated&&yn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),r._fadeAnimated&&yn(this._container,1),this.bringToFront(),this.options.interactive&&($t(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(r){r._fadeAnimated?(yn(this._container,0),this._removeTimeout=setTimeout(l(ge,void 0,this._container),200)):ge(this._container),this.options.interactive&&(Se(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(r){return this._latlng=wt(r),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(r){return this._content=r,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var r={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(r.zoomanim=this._animateZoom),r},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Nn(this._container),this},bringToBack:function(){return this._map&&ni(this._container),this},_prepareOpen:function(r){var a=this._source;if(!a._map)return!1;if(a instanceof gi){a=null;var d=this._source._layers;for(var b in d)if(d[b]._map){a=d[b];break}if(!a)return!1;this._source=a}if(!r)if(a.getCenter)r=a.getCenter();else if(a.getLatLng)r=a.getLatLng();else if(a.getBounds)r=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(r),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var r=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")r.innerHTML=a;else{for(;r.hasChildNodes();)r.removeChild(r.firstChild);r.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var r=this._map.latLngToLayerPoint(this._latlng),a=et(this.options.offset),d=this._getAnchor();this._zoomAnimated?Ve(this._container,r.add(d)):a=a.add(r).add(d);var b=this._containerBottom=-a.y,C=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=b+"px",this._container.style.left=C+"px"}},_getAnchor:function(){return[0,0]}});pe.include({_initOverlay:function(r,a,d,b){var C=a;return C instanceof r||(C=new r(b).setContent(a)),d&&C.setLatLng(d),C}}),Gn.include({_initOverlay:function(r,a,d,b){var C=d;return C instanceof r?(x(C,b),C._source=this):(C=a&&!b?a:new r(b,this),C.setContent(d)),C}});var Zo=si.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(r){return r=arguments.length?r:this._source._map,!r.hasLayer(this)&&r._popup&&r._popup.options.autoClose&&r.removeLayer(r._popup),r._popup=this,si.prototype.openOn.call(this,r)},onAdd:function(r){si.prototype.onAdd.call(this,r),r.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Ui||this._source.on("preclick",or))},onRemove:function(r){si.prototype.onRemove.call(this,r),r.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Ui||this._source.off("preclick",or))},getEvents:function(){var r=si.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(r.preclick=this.close),this.options.keepInView&&(r.moveend=this._adjustPan),r},_initLayout:function(){var r="leaflet-popup",a=this._container=Xt("div",r+" "+(this.options.className||"")+" leaflet-zoom-animated"),d=this._wrapper=Xt("div",r+"-content-wrapper",a);if(this._contentNode=Xt("div",r+"-content",d),Bs(a),vl(this._contentNode),oe(a,"contextmenu",or),this._tipContainer=Xt("div",r+"-tip-container",a),this._tip=Xt("div",r+"-tip",this._tipContainer),this.options.closeButton){var b=this._closeButton=Xt("a",r+"-close-button",a);b.setAttribute("role","button"),b.setAttribute("aria-label","Close popup"),b.href="#close",b.innerHTML='<span aria-hidden="true">&#215;</span>',oe(b,"click",function(C){tn(C),this.close()},this)}},_updateLayout:function(){var r=this._contentNode,a=r.style;a.width="",a.whiteSpace="nowrap";var d=r.offsetWidth;d=Math.min(d,this.options.maxWidth),d=Math.max(d,this.options.minWidth),a.width=d+1+"px",a.whiteSpace="",a.height="";var b=r.offsetHeight,C=this.options.maxHeight,B="leaflet-popup-scrolled";C&&b>C?(a.height=C+"px",$t(r,B)):Se(r,B),this._containerWidth=this._container.offsetWidth},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center),d=this._getAnchor();Ve(this._container,a.add(d))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var r=this._map,a=parseInt(mi(this._container,"marginBottom"),10)||0,d=this._container.offsetHeight+a,b=this._containerWidth,C=new W(this._containerLeft,-d-this._containerBottom);C._add(sr(this._container));var B=r.layerPointToContainerPoint(C),$=et(this.options.autoPanPadding),ut=et(this.options.autoPanPaddingTopLeft||$),mt=et(this.options.autoPanPaddingBottomRight||$),Ct=r.getSize(),Bt=0,Yt=0;B.x+b+mt.x>Ct.x&&(Bt=B.x+b-Ct.x+mt.x),B.x-Bt-ut.x<0&&(Bt=B.x-ut.x),B.y+d+mt.y>Ct.y&&(Yt=B.y+d-Ct.y+mt.y),B.y-Yt-ut.y<0&&(Yt=B.y-ut.y),(Bt||Yt)&&(this.options.keepInView&&(this._autopanning=!0),r.fire("autopanstart").panBy([Bt,Yt]))}},_getAnchor:function(){return et(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Um=function(r,a){return new Zo(r,a)};pe.mergeOptions({closePopupOnClick:!0}),pe.include({openPopup:function(r,a,d){return this._initOverlay(Zo,r,a,d).openOn(this),this},closePopup:function(r){return r=arguments.length?r:this._popup,r&&r.close(),this}}),Gn.include({bindPopup:function(r,a){return this._popup=this._initOverlay(Zo,this._popup,r,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(r){return this._popup&&(this instanceof gi||(this._popup._source=this),this._popup._prepareOpen(r||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(r){return this._popup&&this._popup.setContent(r),this},getPopup:function(){return this._popup},_openPopup:function(r){if(!(!this._popup||!this._map)){ar(r);var a=r.layer||r.target;if(this._popup._source===a&&!(a instanceof Ui)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(r.latlng);return}this._popup._source=a,this.openPopup(r.latlng)}},_movePopup:function(r){this._popup.setLatLng(r.latlng)},_onKeyPress:function(r){r.originalEvent.keyCode===13&&this._openPopup(r)}});var Xo=si.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(r){si.prototype.onAdd.call(this,r),this.setOpacity(this.options.opacity),r.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(r){si.prototype.onRemove.call(this,r),r.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var r=si.prototype.getEvents.call(this);return this.options.permanent||(r.preclick=this.close),r},_initLayout:function(){var r="leaflet-tooltip",a=r+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Xt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+u(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(r){var a,d,b=this._map,C=this._container,B=b.latLngToContainerPoint(b.getCenter()),$=b.layerPointToContainerPoint(r),ut=this.options.direction,mt=C.offsetWidth,Ct=C.offsetHeight,Bt=et(this.options.offset),Yt=this._getAnchor();ut==="top"?(a=mt/2,d=Ct):ut==="bottom"?(a=mt/2,d=0):ut==="center"?(a=mt/2,d=Ct/2):ut==="right"?(a=0,d=Ct/2):ut==="left"?(a=mt,d=Ct/2):$.x<B.x?(ut="right",a=0,d=Ct/2):(ut="left",a=mt+(Bt.x+Yt.x)*2,d=Ct/2),r=r.subtract(et(a,d,!0)).add(Bt).add(Yt),Se(C,"leaflet-tooltip-right"),Se(C,"leaflet-tooltip-left"),Se(C,"leaflet-tooltip-top"),Se(C,"leaflet-tooltip-bottom"),$t(C,"leaflet-tooltip-"+ut),Ve(C,r)},_updatePosition:function(){var r=this._map.latLngToLayerPoint(this._latlng);this._setPosition(r)},setOpacity:function(r){this.options.opacity=r,this._container&&yn(this._container,r)},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center);this._setPosition(a)},_getAnchor:function(){return et(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),zm=function(r,a){return new Xo(r,a)};pe.include({openTooltip:function(r,a,d){return this._initOverlay(Xo,r,a,d).openOn(this),this},closeTooltip:function(r){return r.close(),this}}),Gn.include({bindTooltip:function(r,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Xo,this._tooltip,r,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(r){if(!(!r&&this._tooltipHandlersAdded)){var a=r?"off":"on",d={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?d.add=this._openTooltip:(d.mouseover=this._openTooltip,d.mouseout=this.closeTooltip,d.click=this._openTooltip,this._map?this._addFocusListeners():d.add=this._addFocusListeners),this._tooltip.options.sticky&&(d.mousemove=this._moveTooltip),this[a](d),this._tooltipHandlersAdded=!r}},openTooltip:function(r){return this._tooltip&&(this instanceof gi||(this._tooltip._source=this),this._tooltip._prepareOpen(r)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(r){return this._tooltip&&this._tooltip.setContent(r),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(r){var a=typeof r.getElement=="function"&&r.getElement();a&&(oe(a,"focus",function(){this._tooltip._source=r,this.openTooltip()},this),oe(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(r){var a=typeof r.getElement=="function"&&r.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(r){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(r)});return}this._tooltip._source=r.layer||r.target,this.openTooltip(this._tooltip.options.sticky?r.latlng:void 0)}},_moveTooltip:function(r){var a=r.latlng,d,b;this._tooltip.options.sticky&&r.originalEvent&&(d=this._map.mouseEventToContainerPoint(r.originalEvent),b=this._map.containerPointToLayerPoint(d),a=this._map.layerPointToLatLng(b)),this._tooltip.setLatLng(a)}});var $u=Dr.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(r){var a=r&&r.tagName==="DIV"?r:document.createElement("div"),d=this.options;if(d.html instanceof Element?(ir(a),a.appendChild(d.html)):a.innerHTML=d.html!==!1?d.html:"",d.bgPos){var b=et(d.bgPos);a.style.backgroundPosition=-b.x+"px "+-b.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function Bm(r){return new $u(r)}Dr.Default=Vs;var Gs=Gn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Wt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(r){x(this,r)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(r){r._addZoomLimit(this)},onRemove:function(r){this._removeAllTiles(),ge(this._container),r._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Nn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(ni(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(r){return this.options.opacity=r,this._updateOpacity(),this},setZIndex:function(r){return this.options.zIndex=r,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var r=this._clampZoom(this._map.getZoom());r!==this._tileZoom&&(this._tileZoom=r,this._updateLevels()),this._update()}return this},getEvents:function(){var r={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=h(this._onMoveEnd,this.options.updateInterval,this)),r.move=this._onMove),this._zoomAnimated&&(r.zoomanim=this._animateZoom),r},createTile:function(){return document.createElement("div")},getTileSize:function(){var r=this.options.tileSize;return r instanceof W?r:new W(r,r)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(r){for(var a=this.getPane().children,d=-r(-1/0,1/0),b=0,C=a.length,B;b<C;b++)B=a[b].style.zIndex,a[b]!==this._container&&B&&(d=r(d,+B));isFinite(d)&&(this.options.zIndex=d+r(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Wt.ielt9){yn(this._container,this.options.opacity);var r=+new Date,a=!1,d=!1;for(var b in this._tiles){var C=this._tiles[b];if(!(!C.current||!C.loaded)){var B=Math.min(1,(r-C.loaded)/200);yn(C.el,B),B<1?a=!0:(C.active?d=!0:this._onOpaqueTile(C),C.active=!0)}}d&&!this._noPrune&&this._pruneTiles(),a&&(U(this._fadeFrame),this._fadeFrame=G(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Xt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var r=this._tileZoom,a=this.options.maxZoom;if(r!==void 0){for(var d in this._levels)d=Number(d),this._levels[d].el.children.length||d===r?(this._levels[d].el.style.zIndex=a-Math.abs(r-d),this._onUpdateLevel(d)):(ge(this._levels[d].el),this._removeTilesAtZoom(d),this._onRemoveLevel(d),delete this._levels[d]);var b=this._levels[r],C=this._map;return b||(b=this._levels[r]={},b.el=Xt("div","leaflet-tile-container leaflet-zoom-animated",this._container),b.el.style.zIndex=a,b.origin=C.project(C.unproject(C.getPixelOrigin()),r).round(),b.zoom=r,this._setZoomTransform(b,C.getCenter(),C.getZoom()),p(b.el.offsetWidth),this._onCreateLevel(b)),this._level=b,b}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var r,a,d=this._map.getZoom();if(d>this.options.maxZoom||d<this.options.minZoom){this._removeAllTiles();return}for(r in this._tiles)a=this._tiles[r],a.retain=a.current;for(r in this._tiles)if(a=this._tiles[r],a.current&&!a.active){var b=a.coords;this._retainParent(b.x,b.y,b.z,b.z-5)||this._retainChildren(b.x,b.y,b.z,b.z+2)}for(r in this._tiles)this._tiles[r].retain||this._removeTile(r)}},_removeTilesAtZoom:function(r){for(var a in this._tiles)this._tiles[a].coords.z===r&&this._removeTile(a)},_removeAllTiles:function(){for(var r in this._tiles)this._removeTile(r)},_invalidateAll:function(){for(var r in this._levels)ge(this._levels[r].el),this._onRemoveLevel(Number(r)),delete this._levels[r];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(r,a,d,b){var C=Math.floor(r/2),B=Math.floor(a/2),$=d-1,ut=new W(+C,+B);ut.z=+$;var mt=this._tileCoordsToKey(ut),Ct=this._tiles[mt];return Ct&&Ct.active?(Ct.retain=!0,!0):(Ct&&Ct.loaded&&(Ct.retain=!0),$>b?this._retainParent(C,B,$,b):!1)},_retainChildren:function(r,a,d,b){for(var C=2*r;C<2*r+2;C++)for(var B=2*a;B<2*a+2;B++){var $=new W(C,B);$.z=d+1;var ut=this._tileCoordsToKey($),mt=this._tiles[ut];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);d+1<b&&this._retainChildren(C,B,d+1,b)}},_resetView:function(r){var a=r&&(r.pinch||r.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(r){this._setView(r.center,r.zoom,!0,r.noUpdate)},_clampZoom:function(r){var a=this.options;return a.minNativeZoom!==void 0&&r<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<r?a.maxNativeZoom:r},_setView:function(r,a,d,b){var C=Math.round(a);this.options.maxZoom!==void 0&&C>this.options.maxZoom||this.options.minZoom!==void 0&&C<this.options.minZoom?C=void 0:C=this._clampZoom(C);var B=this.options.updateWhenZooming&&C!==this._tileZoom;(!b||B)&&(this._tileZoom=C,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),C!==void 0&&this._update(r),d||this._pruneTiles(),this._noPrune=!!d),this._setZoomTransforms(r,a)},_setZoomTransforms:function(r,a){for(var d in this._levels)this._setZoomTransform(this._levels[d],r,a)},_setZoomTransform:function(r,a,d){var b=this._map.getZoomScale(d,r.zoom),C=r.origin.multiplyBy(b).subtract(this._map._getNewPixelOrigin(a,d)).round();Wt.any3d?rr(r.el,C,b):Ve(r.el,C)},_resetGrid:function(){var r=this._map,a=r.options.crs,d=this._tileSize=this.getTileSize(),b=this._tileZoom,C=this._map.getPixelWorldBounds(this._tileZoom);C&&(this._globalTileRange=this._pxBoundsToTileRange(C)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(r.project([0,a.wrapLng[0]],b).x/d.x),Math.ceil(r.project([0,a.wrapLng[1]],b).x/d.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(r.project([a.wrapLat[0],0],b).y/d.x),Math.ceil(r.project([a.wrapLat[1],0],b).y/d.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(r){var a=this._map,d=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),b=a.getZoomScale(d,this._tileZoom),C=a.project(r,this._tileZoom).floor(),B=a.getSize().divideBy(b*2);return new q(C.subtract(B),C.add(B))},_update:function(r){var a=this._map;if(a){var d=this._clampZoom(a.getZoom());if(r===void 0&&(r=a.getCenter()),this._tileZoom!==void 0){var b=this._getTiledPixelBounds(r),C=this._pxBoundsToTileRange(b),B=C.getCenter(),$=[],ut=this.options.keepBuffer,mt=new q(C.getBottomLeft().subtract([ut,-ut]),C.getTopRight().add([ut,-ut]));if(!(isFinite(C.min.x)&&isFinite(C.min.y)&&isFinite(C.max.x)&&isFinite(C.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Ct in this._tiles){var Bt=this._tiles[Ct].coords;(Bt.z!==this._tileZoom||!mt.contains(new W(Bt.x,Bt.y)))&&(this._tiles[Ct].current=!1)}if(Math.abs(d-this._tileZoom)>1){this._setView(r,d);return}for(var Yt=C.min.y;Yt<=C.max.y;Yt++)for(var de=C.min.x;de<=C.max.x;de++){var dn=new W(de,Yt);if(dn.z=this._tileZoom,!!this._isValidTile(dn)){var je=this._tiles[this._tileCoordsToKey(dn)];je?je.current=!0:$.push(dn)}}if($.sort(function(xn,Ur){return xn.distanceTo(B)-Ur.distanceTo(B)}),$.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Un=document.createDocumentFragment();for(de=0;de<$.length;de++)this._addTile($[de],Un);this._level.el.appendChild(Un)}}}},_isValidTile:function(r){var a=this._map.options.crs;if(!a.infinite){var d=this._globalTileRange;if(!a.wrapLng&&(r.x<d.min.x||r.x>d.max.x)||!a.wrapLat&&(r.y<d.min.y||r.y>d.max.y))return!1}if(!this.options.bounds)return!0;var b=this._tileCoordsToBounds(r);return tt(this.options.bounds).overlaps(b)},_keyToBounds:function(r){return this._tileCoordsToBounds(this._keyToTileCoords(r))},_tileCoordsToNwSe:function(r){var a=this._map,d=this.getTileSize(),b=r.scaleBy(d),C=b.add(d),B=a.unproject(b,r.z),$=a.unproject(C,r.z);return[B,$]},_tileCoordsToBounds:function(r){var a=this._tileCoordsToNwSe(r),d=new At(a[0],a[1]);return this.options.noWrap||(d=this._map.wrapLatLngBounds(d)),d},_tileCoordsToKey:function(r){return r.x+":"+r.y+":"+r.z},_keyToTileCoords:function(r){var a=r.split(":"),d=new W(+a[0],+a[1]);return d.z=+a[2],d},_removeTile:function(r){var a=this._tiles[r];a&&(ge(a.el),delete this._tiles[r],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(r)}))},_initTile:function(r){$t(r,"leaflet-tile");var a=this.getTileSize();r.style.width=a.x+"px",r.style.height=a.y+"px",r.onselectstart=p,r.onmousemove=p,Wt.ielt9&&this.options.opacity<1&&yn(r,this.options.opacity)},_addTile:function(r,a){var d=this._getTilePos(r),b=this._tileCoordsToKey(r),C=this.createTile(this._wrapCoords(r),l(this._tileReady,this,r));this._initTile(C),this.createTile.length<2&&G(l(this._tileReady,this,r,null,C)),Ve(C,d),this._tiles[b]={el:C,coords:r,current:!0},a.appendChild(C),this.fire("tileloadstart",{tile:C,coords:r})},_tileReady:function(r,a,d){a&&this.fire("tileerror",{error:a,tile:d,coords:r});var b=this._tileCoordsToKey(r);d=this._tiles[b],d&&(d.loaded=+new Date,this._map._fadeAnimated?(yn(d.el,0),U(this._fadeFrame),this._fadeFrame=G(this._updateOpacity,this)):(d.active=!0,this._pruneTiles()),a||($t(d.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:d.el,coords:r})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Wt.ielt9||!this._map._fadeAnimated?G(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(r){return r.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(r){var a=new W(this._wrapX?f(r.x,this._wrapX):r.x,this._wrapY?f(r.y,this._wrapY):r.y);return a.z=r.z,a},_pxBoundsToTileRange:function(r){var a=this.getTileSize();return new q(r.min.unscaleBy(a).floor(),r.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var r in this._tiles)if(!this._tiles[r].loaded)return!1;return!0}});function Fm(r){return new Gs(r)}var Or=Gs.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(r,a){this._url=r,a=x(this,a),a.detectRetina&&Wt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(r,a){return this._url===r&&a===void 0&&(a=!0),this._url=r,a||this.redraw(),this},createTile:function(r,a){var d=document.createElement("img");return oe(d,"load",l(this._tileOnLoad,this,a,d)),oe(d,"error",l(this._tileOnError,this,a,d)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(d.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(d.referrerPolicy=this.options.referrerPolicy),d.alt="",d.src=this.getTileUrl(r),d},getTileUrl:function(r){var a={r:Wt.retina?"@2x":"",s:this._getSubdomain(r),x:r.x,y:r.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var d=this._globalTileRange.max.y-r.y;this.options.tms&&(a.y=d),a["-y"]=d}return S(this._url,s(a,this.options))},_tileOnLoad:function(r,a){Wt.ielt9?setTimeout(l(r,this,null,a),0):r(null,a)},_tileOnError:function(r,a,d){var b=this.options.errorTileUrl;b&&a.getAttribute("src")!==b&&(a.src=b),r(d,a)},_onTileRemove:function(r){r.tile.onload=null},_getZoomForUrl:function(){var r=this._tileZoom,a=this.options.maxZoom,d=this.options.zoomReverse,b=this.options.zoomOffset;return d&&(r=a-r),r+b},_getSubdomain:function(r){var a=Math.abs(r.x+r.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var r,a;for(r in this._tiles)if(this._tiles[r].coords.z!==this._tileZoom&&(a=this._tiles[r].el,a.onload=p,a.onerror=p,!a.complete)){a.src=k;var d=this._tiles[r].coords;ge(a),delete this._tiles[r],this.fire("tileabort",{tile:a,coords:d})}},_removeTile:function(r){var a=this._tiles[r];if(a)return a.el.setAttribute("src",k),Gs.prototype._removeTile.call(this,r)},_tileReady:function(r,a,d){if(!(!this._map||d&&d.getAttribute("src")===k))return Gs.prototype._tileReady.call(this,r,a,d)}});function Yu(r,a){return new Or(r,a)}var Ku=Or.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(r,a){this._url=r;var d=s({},this.defaultWmsParams);for(var b in a)b in this.options||(d[b]=a[b]);a=x(this,a);var C=a.detectRetina&&Wt.retina?2:1,B=this.getTileSize();d.width=B.x*C,d.height=B.y*C,this.wmsParams=d},onAdd:function(r){this._crs=this.options.crs||r.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,Or.prototype.onAdd.call(this,r)},getTileUrl:function(r){var a=this._tileCoordsToNwSe(r),d=this._crs,b=Y(d.project(a[0]),d.project(a[1])),C=b.min,B=b.max,$=(this._wmsVersion>=1.3&&this._crs===Gu?[C.y,C.x,B.y,B.x]:[C.x,C.y,B.x,B.y]).join(","),ut=Or.prototype.getTileUrl.call(this,r);return ut+_(this.wmsParams,ut,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+$},setParams:function(r,a){return s(this.wmsParams,r),a||this.redraw(),this}});function Hm(r,a){return new Ku(r,a)}Or.WMS=Ku,Yu.wms=Hm;var yi=Gn.extend({options:{padding:.1},initialize:function(r){x(this,r),u(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),$t(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var r={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(r.zoomanim=this._onAnimZoom),r},_onAnimZoom:function(r){this._updateTransform(r.center,r.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(r,a){var d=this._map.getZoomScale(a,this._zoom),b=this._map.getSize().multiplyBy(.5+this.options.padding),C=this._map.project(this._center,a),B=b.multiplyBy(-d).add(C).subtract(this._map._getNewPixelOrigin(r,a));Wt.any3d?rr(this._container,B,d):Ve(this._container,B)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var r in this._layers)this._layers[r]._reset()},_onZoomEnd:function(){for(var r in this._layers)this._layers[r]._project()},_updatePaths:function(){for(var r in this._layers)this._layers[r]._update()},_update:function(){var r=this.options.padding,a=this._map.getSize(),d=this._map.containerPointToLayerPoint(a.multiplyBy(-r)).round();this._bounds=new q(d,d.add(a.multiplyBy(1+r*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Ju=yi.extend({options:{tolerance:0},getEvents:function(){var r=yi.prototype.getEvents.call(this);return r.viewprereset=this._onViewPreReset,r},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){yi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var r=this._container=document.createElement("canvas");oe(r,"mousemove",this._onMouseMove,this),oe(r,"click dblclick mousedown mouseup contextmenu",this._onClick,this),oe(r,"mouseout",this._handleMouseOut,this),r._leaflet_disable_events=!0,this._ctx=r.getContext("2d")},_destroyContainer:function(){U(this._redrawRequest),delete this._ctx,ge(this._container),Me(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var r;this._redrawBounds=null;for(var a in this._layers)r=this._layers[a],r._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){yi.prototype._update.call(this);var r=this._bounds,a=this._container,d=r.getSize(),b=Wt.retina?2:1;Ve(a,r.min),a.width=b*d.x,a.height=b*d.y,a.style.width=d.x+"px",a.style.height=d.y+"px",Wt.retina&&this._ctx.scale(2,2),this._ctx.translate(-r.min.x,-r.min.y),this.fire("update")}},_reset:function(){yi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(r){this._updateDashArray(r),this._layers[u(r)]=r;var a=r._order={layer:r,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(r){this._requestRedraw(r)},_removePath:function(r){var a=r._order,d=a.next,b=a.prev;d?d.prev=b:this._drawLast=b,b?b.next=d:this._drawFirst=d,delete r._order,delete this._layers[u(r)],this._requestRedraw(r)},_updatePath:function(r){this._extendRedrawBounds(r),r._project(),r._update(),this._requestRedraw(r)},_updateStyle:function(r){this._updateDashArray(r),this._requestRedraw(r)},_updateDashArray:function(r){if(typeof r.options.dashArray=="string"){var a=r.options.dashArray.split(/[, ]+/),d=[],b,C;for(C=0;C<a.length;C++){if(b=Number(a[C]),isNaN(b))return;d.push(b)}r.options._dashArray=d}else r.options._dashArray=r.options.dashArray},_requestRedraw:function(r){this._map&&(this._extendRedrawBounds(r),this._redrawRequest=this._redrawRequest||G(this._redraw,this))},_extendRedrawBounds:function(r){if(r._pxBounds){var a=(r.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(r._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(r._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var r=this._redrawBounds;if(r){var a=r.getSize();this._ctx.clearRect(r.min.x,r.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var r,a=this._redrawBounds;if(this._ctx.save(),a){var d=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,d.x,d.y),this._ctx.clip()}this._drawing=!0;for(var b=this._drawFirst;b;b=b.next)r=b.layer,(!a||r._pxBounds&&r._pxBounds.intersects(a))&&r._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(r,a){if(this._drawing){var d,b,C,B,$=r._parts,ut=$.length,mt=this._ctx;if(ut){for(mt.beginPath(),d=0;d<ut;d++){for(b=0,C=$[d].length;b<C;b++)B=$[d][b],mt[b?"lineTo":"moveTo"](B.x,B.y);a&&mt.closePath()}this._fillStroke(mt,r)}}},_updateCircle:function(r){if(!(!this._drawing||r._empty())){var a=r._point,d=this._ctx,b=Math.max(Math.round(r._radius),1),C=(Math.max(Math.round(r._radiusY),1)||b)/b;C!==1&&(d.save(),d.scale(1,C)),d.beginPath(),d.arc(a.x,a.y/C,b,0,Math.PI*2,!1),C!==1&&d.restore(),this._fillStroke(d,r)}},_fillStroke:function(r,a){var d=a.options;d.fill&&(r.globalAlpha=d.fillOpacity,r.fillStyle=d.fillColor||d.color,r.fill(d.fillRule||"evenodd")),d.stroke&&d.weight!==0&&(r.setLineDash&&r.setLineDash(a.options&&a.options._dashArray||[]),r.globalAlpha=d.opacity,r.lineWidth=d.weight,r.strokeStyle=d.color,r.lineCap=d.lineCap,r.lineJoin=d.lineJoin,r.stroke())},_onClick:function(r){for(var a=this._map.mouseEventToLayerPoint(r),d,b,C=this._drawFirst;C;C=C.next)d=C.layer,d.options.interactive&&d._containsPoint(a)&&(!(r.type==="click"||r.type==="preclick")||!this._map._draggableMoved(d))&&(b=d);this._fireEvent(b?[b]:!1,r)},_onMouseMove:function(r){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(r);this._handleMouseHover(r,a)}},_handleMouseOut:function(r){var a=this._hoveredLayer;a&&(Se(this._container,"leaflet-interactive"),this._fireEvent([a],r,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(r,a){if(!this._mouseHoverThrottled){for(var d,b,C=this._drawFirst;C;C=C.next)d=C.layer,d.options.interactive&&d._containsPoint(a)&&(b=d);b!==this._hoveredLayer&&(this._handleMouseOut(r),b&&($t(this._container,"leaflet-interactive"),this._fireEvent([b],r,"mouseover"),this._hoveredLayer=b)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,r),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(r,a,d){this._map._fireDOMEvent(a,d||a.type,r)},_bringToFront:function(r){var a=r._order;if(a){var d=a.next,b=a.prev;if(d)d.prev=b;else return;b?b.next=d:d&&(this._drawFirst=d),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(r)}},_bringToBack:function(r){var a=r._order;if(a){var d=a.next,b=a.prev;if(b)b.next=d;else return;d?d.prev=b:b&&(this._drawLast=b),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(r)}}});function Qu(r){return Wt.canvas?new Ju(r):null}var Ws=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(r){return document.createElement("<lvml:"+r+' class="lvml">')}}catch{}return function(r){return document.createElement("<"+r+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Vm={_initContainer:function(){this._container=Xt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(yi.prototype._update.call(this),this.fire("update"))},_initPath:function(r){var a=r._container=Ws("shape");$t(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",r._path=Ws("path"),a.appendChild(r._path),this._updateStyle(r),this._layers[u(r)]=r},_addPath:function(r){var a=r._container;this._container.appendChild(a),r.options.interactive&&r.addInteractiveTarget(a)},_removePath:function(r){var a=r._container;ge(a),r.removeInteractiveTarget(a),delete this._layers[u(r)]},_updateStyle:function(r){var a=r._stroke,d=r._fill,b=r.options,C=r._container;C.stroked=!!b.stroke,C.filled=!!b.fill,b.stroke?(a||(a=r._stroke=Ws("stroke")),C.appendChild(a),a.weight=b.weight+"px",a.color=b.color,a.opacity=b.opacity,b.dashArray?a.dashStyle=w(b.dashArray)?b.dashArray.join(" "):b.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=b.lineCap.replace("butt","flat"),a.joinstyle=b.lineJoin):a&&(C.removeChild(a),r._stroke=null),b.fill?(d||(d=r._fill=Ws("fill")),C.appendChild(d),d.color=b.fillColor||b.color,d.opacity=b.fillOpacity):d&&(C.removeChild(d),r._fill=null)},_updateCircle:function(r){var a=r._point.round(),d=Math.round(r._radius),b=Math.round(r._radiusY||d);this._setPath(r,r._empty()?"M0 0":"AL "+a.x+","+a.y+" "+d+","+b+" 0,"+65535*360)},_setPath:function(r,a){r._path.v=a},_bringToFront:function(r){Nn(r._container)},_bringToBack:function(r){ni(r._container)}},qo=Wt.vml?Ws:nt,Zs=yi.extend({_initContainer:function(){this._container=qo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=qo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){ge(this._container),Me(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){yi.prototype._update.call(this);var r=this._bounds,a=r.getSize(),d=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,d.setAttribute("width",a.x),d.setAttribute("height",a.y)),Ve(d,r.min),d.setAttribute("viewBox",[r.min.x,r.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(r){var a=r._path=qo("path");r.options.className&&$t(a,r.options.className),r.options.interactive&&$t(a,"leaflet-interactive"),this._updateStyle(r),this._layers[u(r)]=r},_addPath:function(r){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(r._path),r.addInteractiveTarget(r._path)},_removePath:function(r){ge(r._path),r.removeInteractiveTarget(r._path),delete this._layers[u(r)]},_updatePath:function(r){r._project(),r._update()},_updateStyle:function(r){var a=r._path,d=r.options;a&&(d.stroke?(a.setAttribute("stroke",d.color),a.setAttribute("stroke-opacity",d.opacity),a.setAttribute("stroke-width",d.weight),a.setAttribute("stroke-linecap",d.lineCap),a.setAttribute("stroke-linejoin",d.lineJoin),d.dashArray?a.setAttribute("stroke-dasharray",d.dashArray):a.removeAttribute("stroke-dasharray"),d.dashOffset?a.setAttribute("stroke-dashoffset",d.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),d.fill?(a.setAttribute("fill",d.fillColor||d.color),a.setAttribute("fill-opacity",d.fillOpacity),a.setAttribute("fill-rule",d.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(r,a){this._setPath(r,K(r._parts,a))},_updateCircle:function(r){var a=r._point,d=Math.max(Math.round(r._radius),1),b=Math.max(Math.round(r._radiusY),1)||d,C="a"+d+","+b+" 0 1,0 ",B=r._empty()?"M0 0":"M"+(a.x-d)+","+a.y+C+d*2+",0 "+C+-d*2+",0 ";this._setPath(r,B)},_setPath:function(r,a){r._path.setAttribute("d",a)},_bringToFront:function(r){Nn(r._path)},_bringToBack:function(r){ni(r._path)}});Wt.vml&&Zs.include(Vm);function th(r){return Wt.svg||Wt.vml?new Zs(r):null}pe.include({getRenderer:function(r){var a=r.options.renderer||this._getPaneRenderer(r.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(r){if(r==="overlayPane"||r===void 0)return!1;var a=this._paneRenderers[r];return a===void 0&&(a=this._createRenderer({pane:r}),this._paneRenderers[r]=a),a},_createRenderer:function(r){return this.options.preferCanvas&&Qu(r)||th(r)}});var eh=kr.extend({initialize:function(r,a){kr.prototype.initialize.call(this,this._boundsToLatLngs(r),a)},setBounds:function(r){return this.setLatLngs(this._boundsToLatLngs(r))},_boundsToLatLngs:function(r){return r=tt(r),[r.getSouthWest(),r.getNorthWest(),r.getNorthEast(),r.getSouthEast()]}});function Gm(r,a){return new eh(r,a)}Zs.create=qo,Zs.pointsToPath=K,vi.geometryToLayer=Fo,vi.coordsToLatLng=Al,vi.coordsToLatLngs=Ho,vi.latLngToCoords=Ll,vi.latLngsToCoords=Vo,vi.getFeature=Nr,vi.asFeature=Go,pe.mergeOptions({boxZoom:!0});var nh=ri.extend({initialize:function(r){this._map=r,this._container=r._container,this._pane=r._panes.overlayPane,this._resetStateTimeout=0,r.on("unload",this._destroy,this)},addHooks:function(){oe(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){Me(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){ge(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(r){if(!r.shiftKey||r.which!==1&&r.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Os(),ul(),this._startPoint=this._map.mouseEventToContainerPoint(r),oe(document,{contextmenu:ar,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(r){this._moved||(this._moved=!0,this._box=Xt("div","leaflet-zoom-box",this._container),$t(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(r);var a=new q(this._point,this._startPoint),d=a.getSize();Ve(this._box,a.min),this._box.style.width=d.x+"px",this._box.style.height=d.y+"px"},_finish:function(){this._moved&&(ge(this._box),Se(this._container,"leaflet-crosshair")),Us(),hl(),Me(document,{contextmenu:ar,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(r){if(!(r.which!==1&&r.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new At(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(r){r.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});pe.addInitHook("addHandler","boxZoom",nh),pe.mergeOptions({doubleClickZoom:!0});var ih=ri.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(r){var a=this._map,d=a.getZoom(),b=a.options.zoomDelta,C=r.originalEvent.shiftKey?d-b:d+b;a.options.doubleClickZoom==="center"?a.setZoom(C):a.setZoomAround(r.containerPoint,C)}});pe.addInitHook("addHandler","doubleClickZoom",ih),pe.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var rh=ri.extend({addHooks:function(){if(!this._draggable){var r=this._map;this._draggable=new Oi(r._mapPane,r._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),r.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),r.on("zoomend",this._onZoomEnd,this),r.whenReady(this._onZoomEnd,this))}$t(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){Se(this._map._container,"leaflet-grab"),Se(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var r=this._map;if(r._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=tt(this._map.options.maxBounds);this._offsetLimit=Y(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;r.fire("movestart").fire("dragstart"),r.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(r){if(this._map.options.inertia){var a=this._lastTime=+new Date,d=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(d),this._times.push(a),this._prunePositions(a)}this._map.fire("move",r).fire("drag",r)},_prunePositions:function(r){for(;this._positions.length>1&&r-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var r=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(r).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(r,a){return r-(r-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var r=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;r.x<a.min.x&&(r.x=this._viscousLimit(r.x,a.min.x)),r.y<a.min.y&&(r.y=this._viscousLimit(r.y,a.min.y)),r.x>a.max.x&&(r.x=this._viscousLimit(r.x,a.max.x)),r.y>a.max.y&&(r.y=this._viscousLimit(r.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(r)}},_onPreDragWrap:function(){var r=this._worldWidth,a=Math.round(r/2),d=this._initialWorldOffset,b=this._draggable._newPos.x,C=(b-a+d)%r+a-d,B=(b+a+d)%r-a-d,$=Math.abs(C+d)<Math.abs(B+d)?C:B;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=$},_onDragEnd:function(r){var a=this._map,d=a.options,b=!d.inertia||r.noInertia||this._times.length<2;if(a.fire("dragend",r),b)a.fire("moveend");else{this._prunePositions(+new Date);var C=this._lastPos.subtract(this._positions[0]),B=(this._lastTime-this._times[0])/1e3,$=d.easeLinearity,ut=C.multiplyBy($/B),mt=ut.distanceTo([0,0]),Ct=Math.min(d.inertiaMaxSpeed,mt),Bt=ut.multiplyBy(Ct/mt),Yt=Ct/(d.inertiaDeceleration*$),de=Bt.multiplyBy(-Yt/2).round();!de.x&&!de.y?a.fire("moveend"):(de=a._limitOffset(de,a.options.maxBounds),G(function(){a.panBy(de,{duration:Yt,easeLinearity:$,noMoveStart:!0,animate:!0})}))}}});pe.addInitHook("addHandler","dragging",rh),pe.mergeOptions({keyboard:!0,keyboardPanDelta:80});var sh=ri.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(r){this._map=r,this._setPanDelta(r.options.keyboardPanDelta),this._setZoomDelta(r.options.zoomDelta)},addHooks:function(){var r=this._map._container;r.tabIndex<=0&&(r.tabIndex="0"),oe(r,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),Me(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var r=document.body,a=document.documentElement,d=r.scrollTop||a.scrollTop,b=r.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(b,d)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(r){var a=this._panKeys={},d=this.keyCodes,b,C;for(b=0,C=d.left.length;b<C;b++)a[d.left[b]]=[-1*r,0];for(b=0,C=d.right.length;b<C;b++)a[d.right[b]]=[r,0];for(b=0,C=d.down.length;b<C;b++)a[d.down[b]]=[0,r];for(b=0,C=d.up.length;b<C;b++)a[d.up[b]]=[0,-1*r]},_setZoomDelta:function(r){var a=this._zoomKeys={},d=this.keyCodes,b,C;for(b=0,C=d.zoomIn.length;b<C;b++)a[d.zoomIn[b]]=r;for(b=0,C=d.zoomOut.length;b<C;b++)a[d.zoomOut[b]]=-r},_addHooks:function(){oe(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){Me(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(r){if(!(r.altKey||r.ctrlKey||r.metaKey)){var a=r.keyCode,d=this._map,b;if(a in this._panKeys){if(!d._panAnim||!d._panAnim._inProgress)if(b=this._panKeys[a],r.shiftKey&&(b=et(b).multiplyBy(3)),d.options.maxBounds&&(b=d._limitOffset(et(b),d.options.maxBounds)),d.options.worldCopyJump){var C=d.wrapLatLng(d.unproject(d.project(d.getCenter()).add(b)));d.panTo(C)}else d.panBy(b)}else if(a in this._zoomKeys)d.setZoom(d.getZoom()+(r.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&d._popup&&d._popup.options.closeOnEscapeKey)d.closePopup();else return;ar(r)}}});pe.addInitHook("addHandler","keyboard",sh),pe.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var oh=ri.extend({addHooks:function(){oe(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){Me(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(r){var a=Pu(r),d=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(r),this._startTime||(this._startTime=+new Date);var b=Math.max(d-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),b),ar(r)},_performZoom:function(){var r=this._map,a=r.getZoom(),d=this._map.options.zoomSnap||0;r._stop();var b=this._delta/(this._map.options.wheelPxPerZoomLevel*4),C=4*Math.log(2/(1+Math.exp(-Math.abs(b))))/Math.LN2,B=d?Math.ceil(C/d)*d:C,$=r._limitZoom(a+(this._delta>0?B:-B))-a;this._delta=0,this._startTime=null,$&&(r.options.scrollWheelZoom==="center"?r.setZoom(a+$):r.setZoomAround(this._lastMousePos,a+$))}});pe.addInitHook("addHandler","scrollWheelZoom",oh);var Wm=600;pe.mergeOptions({tapHold:Wt.touchNative&&Wt.safari&&Wt.mobile,tapTolerance:15});var ah=ri.extend({addHooks:function(){oe(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){Me(this._map._container,"touchstart",this._onDown,this)},_onDown:function(r){if(clearTimeout(this._holdTimeout),r.touches.length===1){var a=r.touches[0];this._startPos=this._newPos=new W(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(oe(document,"touchend",tn),oe(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),Wm),oe(document,"touchend touchcancel contextmenu",this._cancel,this),oe(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function r(){Me(document,"touchend",tn),Me(document,"touchend touchcancel",r)},_cancel:function(){clearTimeout(this._holdTimeout),Me(document,"touchend touchcancel contextmenu",this._cancel,this),Me(document,"touchmove",this._onMove,this)},_onMove:function(r){var a=r.touches[0];this._newPos=new W(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(r,a){var d=new MouseEvent(r,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});d._simulated=!0,a.target.dispatchEvent(d)}});pe.addInitHook("addHandler","tapHold",ah),pe.mergeOptions({touchZoom:Wt.touch,bounceAtZoomLimits:!0});var lh=ri.extend({addHooks:function(){$t(this._map._container,"leaflet-touch-zoom"),oe(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){Se(this._map._container,"leaflet-touch-zoom"),Me(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(r){var a=this._map;if(!(!r.touches||r.touches.length!==2||a._animatingZoom||this._zooming)){var d=a.mouseEventToContainerPoint(r.touches[0]),b=a.mouseEventToContainerPoint(r.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(d.add(b)._divideBy(2))),this._startDist=d.distanceTo(b),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),oe(document,"touchmove",this._onTouchMove,this),oe(document,"touchend touchcancel",this._onTouchEnd,this),tn(r)}},_onTouchMove:function(r){if(!(!r.touches||r.touches.length!==2||!this._zooming)){var a=this._map,d=a.mouseEventToContainerPoint(r.touches[0]),b=a.mouseEventToContainerPoint(r.touches[1]),C=d.distanceTo(b)/this._startDist;if(this._zoom=a.getScaleZoom(C,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&C<1||this._zoom>a.getMaxZoom()&&C>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,C===1)return}else{var B=d._add(b)._divideBy(2)._subtract(this._centerPoint);if(C===1&&B.x===0&&B.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(B),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),U(this._animRequest);var $=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=G($,this,!0),tn(r)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,U(this._animRequest),Me(document,"touchmove",this._onTouchMove,this),Me(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});pe.addInitHook("addHandler","touchZoom",lh),pe.BoxZoom=nh,pe.DoubleClickZoom=ih,pe.Drag=rh,pe.Keyboard=sh,pe.ScrollWheelZoom=oh,pe.TapHold=ah,pe.TouchZoom=lh,e.Bounds=q,e.Browser=Wt,e.CRS=St,e.Canvas=Ju,e.Circle=Tl,e.CircleMarker=Bo,e.Class=E,e.Control=Vn,e.DivIcon=$u,e.DivOverlay=si,e.DomEvent=lm,e.DomUtil=om,e.Draggable=Oi,e.Evented=rt,e.FeatureGroup=gi,e.GeoJSON=vi,e.GridLayer=Gs,e.Handler=ri,e.Icon=Dr,e.ImageOverlay=Wo,e.LatLng=st,e.LatLngBounds=At,e.Layer=Gn,e.LayerGroup=Ir,e.LineUtil=bm,e.Map=pe,e.Marker=zo,e.Mixin=mm,e.Path=Ui,e.Point=W,e.PolyUtil=gm,e.Polygon=kr,e.Polyline=_i,e.Popup=Zo,e.PosAnimation=Ru,e.Projection=wm,e.Rectangle=eh,e.Renderer=yi,e.SVG=Zs,e.SVGOverlay=ju,e.TileLayer=Or,e.Tooltip=Xo,e.Transformation=at,e.Util=F,e.VideoOverlay=qu,e.bind=l,e.bounds=Y,e.canvas=Qu,e.circle=Pm,e.circleMarker=Cm,e.control=Fs,e.divIcon=Bm,e.extend=s,e.featureGroup=Tm,e.geoJSON=Xu,e.geoJson=Dm,e.gridLayer=Fm,e.icon=Am,e.imageOverlay=km,e.latLng=wt,e.latLngBounds=tt,e.layerGroup=Em,e.map=cm,e.marker=Lm,e.point=et,e.polygon=Im,e.polyline=Rm,e.popup=Um,e.rectangle=Gm,e.setOptions=x,e.stamp=u,e.svg=th,e.svgOverlay=Om,e.tileLayer=Yu,e.tooltip=zm,e.transformation=xt,e.version=n,e.videoOverlay=Nm;var Zm=window.L;e.noConflict=function(){return window.L=Zm,this},window.L=e})})(Ec,Ec.exports);var eg=Ec.exports;const Te=xf(eg),yt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function bf(){const i=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:i("c-base")||"#eeebe6",terrainRes:Number(i("t-res"))||128,exag:Number(i("dp-exag")||i("t-exag"))||1,smooth:Number(i("t-smooth"))||1,baseH:Number(i("dp-base")||i("t-base-h"))||5,maxDim:Number(i("t-maxdim"))||200,elevZoom:Number(i("t-zoom"))||15,waterOn:t("water-on"),waterCol:i("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:i("road-col")||"#262626",buildOn:t("build-on"),buildCol:i("build-col")||"#9090a0",buildHS:Number(i("build-hs"))||1,gpxCol:i("gpx-col")||"#ff4500",gpxH:Number(i("gpx-h"))||1.2,gpxMW:Number(i("gpx-mw"))||1.5,gpxTW:Number(i("gpx-tw"))||3}}let So=null,Gt,Ke=null,Dn=null,Li=null,ze=null,Ue=null,Bn=[],en=[],Ye=null,mn=null,Xs=null,hs="none",zr=[];const ng={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function ig(i){i&&(So=i);const t=Te.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Te.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Te.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),s=Te.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),o=Te.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Gt=Te.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Te.control.zoom({position:"topright"}).addTo(Gt),Te.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:s,Voyager:o,"IGN (France)":n},{},{position:"topright"}).addTo(Gt),new ResizeObserver(()=>Gt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Gt.invalidateSize(),300),cg(),og(),ug(),hg(),lg()}function dh(i,t){return[[i.lat,i.lng],[i.lat,t.lng],[t.lat,t.lng],[t.lat,i.lng]]}function fh(i,t){const e=(i.lat+t.lat)/2,n=Math.abs(t.lat-i.lat)*111320,s=Math.abs(t.lng-i.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),u=Math.min(i.lat,t.lat),h=Math.min(i.lng,t.lng);return[[u,h],[u,h+c],[u+l,h+c],[u+l,h]]}function ph(i,t,e=80){const n=i.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[i.lat+n*Math.cos(l)/111320,i.lng+n*Math.sin(l)/(111320*Math.cos(i.lat*Math.PI/180))]})}function mh(i,t){const e=i.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[i.lat+e*Math.cos(o)/111320,i.lng+e*Math.sin(o)/(111320*Math.cos(i.lat*Math.PI/180))]})}function wf(i){ze&&ze!==i&&(Ue=null,Bn=[],en=[],Ye&&(Gt.removeLayer(Ye),Ye=null),mn&&(Gt.removeLayer(mn),mn=null)),ze=i,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===i)}),Gt.getContainer().classList.toggle("dm",!!i);const t=document.getElementById("dch");t.style.display=i?"block":"none",i&&(t.textContent=ng[i]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=i==="trace"?"block":"none",i!=="trace"&&(e.textContent="0 points tracés"),!i){const n=document.getElementById("snap");n&&(n.style.display="none")}}function Ca(i=!0){Ye&&(Gt.removeLayer(Ye),Ye=null),mn&&(Gt.removeLayer(mn),mn=null),Ue=null,Bn=[],en=[],i&&wf(null)}function Pa(i,t){return t?Gt.latLngToContainerPoint(i).distanceTo(Gt.latLngToContainerPoint(t)):9999}function gh(i){const t=[];Bn.length>2&&t.push(Bn[0]),en.length>2&&t.push(en[0]),Li&&t.push(Li.getLatLng());let e=null,n=9999;for(const s of t){const o=Pa(i,s);o<18&&o<n&&(n=o,e=s)}return e}function rg(i,t){const e=document.getElementById("snap");if(!e)return;if(!t||Pa(i,t)>18){e.style.display="none";return}const n=Gt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function sg(){document.getElementById("zone-controls")?.classList.add("visible"),Tc()}function Mf(){document.getElementById("zone-controls")?.classList.remove("visible"),Sf("none")}function Tc(){if(!yt.bounds)return;const i=document.getElementById("zone-controls");if(!i)return;const t=Te.latLng(yt.bounds.maxLat,yt.bounds.maxLon),e=Gt.latLngToContainerPoint(t),n=40;i.style.left=e.x+10+"px",i.style.top=Math.max(10,e.y-n/2)+"px"}function Sf(i){hs==="move"&&i!=="move"&&(Gt.dragging.enable(),Gt.getContainer().style.cursor=""),hs=i,document.getElementById("zc-move")?.classList.toggle("active",i==="move"),i==="move"&&(Gt.dragging.disable(),Gt.getContainer().style.cursor="grab")}function Ef(i){Ke&&(Gt.removeLayer(Ke),Ke=null),Ke=Te.polygon(i,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const t=i.map(u=>u[0]),e=i.map(u=>u[1]);yt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(yt.bounds.minLat+yt.bounds.maxLat)/2,s=(yt.bounds.maxLon-yt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,o=(yt.bounds.maxLat-yt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(o,s);yt.wMm=Math.round(s*c),yt.dMm=Math.round(o*c),So?.()}function _h(i){if(!yt.zonePts)return;const t=yt.zonePts.map(l=>l[0]),e=yt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,s=(Math.min(...e)+Math.max(...e))/2,o=yt.zonePts.map(([l,c])=>[n+(l-n)*i,s+(c-s)*i]);yt.zonePts=o,Ef(o)}function og(){document.getElementById("zc-delete")?.addEventListener("click",()=>{Ke&&(Gt.removeLayer(Ke),Ke=null),yt.bounds=null,yt.zonePts=null,Mf(),So?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>_h(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>_h(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{Sf(hs==="move"?"none":"move")});let i=null;Gt.getContainer().addEventListener("mousedown",t=>{hs!=="move"||!yt.zonePts||(i={x:t.clientX,y:t.clientY},zr=yt.zonePts.map(e=>[e[0],e[1]]),Gt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(hs!=="move"||!i||!zr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Te.point(i.x-e.left,i.y-e.top)),s=Gt.containerPointToLatLng(Te.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=zr.map(([u,h])=>[u+o,h+l]);Ke&&(Gt.removeLayer(Ke),Ke=null),Ke=Te.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt)}),document.addEventListener("mouseup",t=>{if(hs!=="move"||!i||!zr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Te.point(i.x-e.left,i.y-e.top)),s=Gt.containerPointToLatLng(Te.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=zr.map(([u,h])=>[u+o,h+l]);i=null,zr=[],yt.zonePts=c,Ef(c),Tc(),Gt.getContainer().style.cursor="grab"}),Gt.on("move zoom moveend zoomend",Tc)}function qs(i,t){Ke&&(Gt.removeLayer(Ke),Ke=null),Ke=Te.polygon(i,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const e=i.map(h=>h[0]),n=i.map(h=>h[1]);yt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},yt.zonePts=i,yt.zoneType=t;const s=(yt.bounds.minLat+yt.bounds.maxLat)/2,o=(yt.bounds.maxLon-yt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(yt.bounds.maxLat-yt.bounds.minLat)*111320,u=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);yt.realW=o,yt.realH=l,yt.wMm=Math.round(o*u),yt.dMm=Math.round(l*u),So?.(),sg(),Ca()}function ag(){Dn&&(Gt.removeLayer(Dn),Dn=null),!(en.length<2)&&(Dn=Te.polyline(en,{color:"#ff0000",weight:4,opacity:.9}).addTo(Gt))}function vh(i){const t=document.getElementById("snap");if(t&&(t.style.display="none"),mn&&(Gt.removeLayer(mn),mn=null),i.length<2){Ca();return}yt.gpxPoints=i.map(n=>({lat:n.lat,lon:n.lng})),Tf(),Af(`✏️ ${i.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),Ca()}function Tf(){Dn&&(Gt.removeLayer(Dn),Dn=null),!(yt.gpxPoints.length<2)&&(Dn=Te.polyline(yt.gpxPoints.map(i=>[i.lat,i.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Gt))}function Af(i){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=i,t.style.display="block")}function lg(){Gt.on("mousemove",i=>{if(!ze)return;const t=i.latlng,e=gh(t);rg(t,e??Ue);const n=e??t;if((ze==="rect"||ze==="sq")&&Ue){const s=ze==="sq"?fh(Ue,n):dh(Ue,n);Ye?Ye.setLatLngs(s):Ye=Te.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Gt)}else if((ze==="circ"||ze==="hex")&&Ue){const s=ze==="circ"?ph(Ue,n):mh(Ue,n);Ye?Ye.setLatLngs(s):Ye=Te.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Gt)}else if(ze==="poly"&&Bn.length>0){const s=[...Bn,n];Ye?Ye.setLatLngs(s):Ye=Te.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Gt)}else if(ze==="trace"&&en.length>0){const s=[...en,n];Ye?Ye.setLatLngs(s):Ye=Te.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Gt)}}),Gt.on("click",i=>{if(!ze)return;const t=i.latlng,e=gh(t),n=e??t;if(ze==="rect"){if(!Ue){Ue=n;return}qs(dh(Ue,n),"rect")}else if(ze==="sq"){if(!Ue){Ue=n;return}qs(fh(Ue,n),"rect")}else if(ze==="circ"){if(!Ue){Ue=n;return}qs(ph(Ue,n),"circ")}else if(ze==="hex"){if(!Ue){Ue=n;return}qs(mh(Ue,n),"hex")}else if(ze==="poly"){if(Bn.length>2&&Pa(t,Bn[0])<18){qs(Bn.map(s=>[s.lat,s.lng]),"poly");return}Bn.push(n),Bn.length===1&&(mn&&Gt.removeLayer(mn),mn=Te.circleMarker(Bn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt))}else ze==="trace"&&(Xs&&clearTimeout(Xs),Xs=setTimeout(()=>{if(en.length>2&&Pa(t,en[0])<18){vh(en);return}en.push(e??t);const s=en.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(mn&&Gt.removeLayer(mn),mn=Te.circleMarker(en[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt)),ag()},220))}),Gt.on("dblclick",i=>{ze==="trace"&&en.length>=2&&(Xs&&clearTimeout(Xs),vh(en),i.originalEvent.preventDefault())})}function cg(){["rect","sq","circ","hex","poly","trace"].forEach(i=>{document.getElementById("db-"+i)?.addEventListener("click",()=>{wf(ze===i?null:i)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{Ca(),Ke&&(Gt.removeLayer(Ke),Ke=null),Dn&&(Gt.removeLayer(Dn),Dn=null),Li&&(Gt.removeLayer(Li),Li=null),yt.bounds=null,yt.zonePts=null,yt.gpxPoints=[],en=[],Mf();const i=document.getElementById("gpx-badge");i&&(i.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),So?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!yt.bounds)return;const i=yt.bounds;Gt.fitBounds([[i.minLat,i.minLon],[i.maxLat,i.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!yt.gpxPoints.length)return;const i=yt.gpxPoints.map(e=>e.lat),t=yt.gpxPoints.map(e=>e.lon);Gt.fitBounds([[Math.min(...i),Math.min(...t)],[Math.max(...i),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function ug(){document.getElementById("gpx-file")?.addEventListener("change",function(){const i=this.files?.[0];if(!i)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(u=>({lat:parseFloat(u.getAttribute("lat")),lon:parseFloat(u.getAttribute("lon"))})).filter(u=>!isNaN(u.lat)&&!isNaN(u.lon));if(!o.length)return;yt.gpxPoints=o,Tf(),Dn&&Gt.fitBounds(Dn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let u=1;u<o.length;u++){const f=(o[u].lat-o[u-1].lat)*Math.PI/180,p=(o[u].lon-o[u-1].lon)*Math.PI/180,g=Math.sin(f/2)**2+Math.cos(o[u-1].lat*Math.PI/180)*Math.cos(o[u].lat*Math.PI/180)*Math.sin(p/2)**2;l+=6371*2*Math.atan2(Math.sqrt(g),Math.sqrt(1-g))}Af(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(i)})}let yh;function hg(){const i=document.getElementById("srch-input"),t=document.getElementById("srch-drop");i?.addEventListener("input",function(){clearTimeout(yh);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(yh=setTimeout(()=>dg(e),120))}),i?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function dg(i){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),u=this.dataset.bb.split(",").map(Number);Li&&(Gt.removeLayer(Li),Li=null),Li=Te.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Gt),Gt.fitBounds([[u[0],u[2]],[u[1],u[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Kc="163",Br={ROTATE:0,DOLLY:1,PAN:2},Fr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fg=0,xh=1,pg=2,Lf=1,mg=2,Ti=3,Qi=0,Tn=1,ln=2,$i=0,gs=1,bh=2,wh=3,Mh=4,gg=5,_r=100,_g=101,vg=102,yg=103,xg=104,bg=200,wg=201,Mg=202,Sg=203,Ac=204,Lc=205,Eg=206,Tg=207,Ag=208,Lg=209,Cg=210,Pg=211,Rg=212,Ig=213,Dg=214,kg=0,Ng=1,Og=2,Ra=3,Ug=4,zg=5,Bg=6,Fg=7,Jc=0,Hg=1,Vg=2,Yi=0,Cf=1,Gg=2,Wg=3,Zg=4,Xg=5,qg=6,jg=7,Pf=300,Ms=301,Ss=302,Cc=303,Pc=304,Ja=306,Rc=1e3,br=1001,Ic=1002,Hn=1003,$g=1004,$o=1005,$n=1006,Il=1007,wr=1008,Ki=1009,Yg=1010,Kg=1011,Rf=1012,If=1013,Es=1014,qi=1015,Ia=1016,Df=1017,kf=1018,Eo=1020,Jg=35902,Qg=1021,t_=1022,ci=1023,e_=1024,n_=1025,_s=1026,mo=1027,i_=1028,Nf=1029,r_=1030,Of=1031,Uf=1033,Dl=33776,kl=33777,Nl=33778,Ol=33779,Sh=35840,Eh=35841,Th=35842,Ah=35843,zf=36196,Lh=37492,Ch=37496,Ph=37808,Rh=37809,Ih=37810,Dh=37811,kh=37812,Nh=37813,Oh=37814,Uh=37815,zh=37816,Bh=37817,Fh=37818,Hh=37819,Vh=37820,Gh=37821,Ul=36492,Wh=36494,Zh=36495,s_=36283,Xh=36284,qh=36285,jh=36286,o_=3200,a_=3201,Qc=0,l_=1,Zi="",oi="srgb",er="srgb-linear",tu="display-p3",Qa="display-p3-linear",Da="linear",Ee="srgb",ka="rec709",Na="p3",Hr=7680,$h=519,c_=512,u_=513,h_=514,Bf=515,d_=516,f_=517,p_=518,m_=519,Yh=35044,Kh="300 es",Ci=2e3,Oa=2001;class Cr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ao=Math.PI/180,Dc=180/Math.PI;function Cs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[e&63|128]+sn[e>>8&255]+"-"+sn[e>>16&255]+sn[e>>24&255]+sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]).toLowerCase()}function Je(i,t,e){return Math.max(t,Math.min(e,i))}function g_(i,t){return(i%t+t)%t}function zl(i,t,e){return(1-e)*i+e*t}function js(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const __={DEG2RAD:ao};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ue{constructor(t,e,n,s,o,l,c,u,h){ue.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,h)}set(t,e,n,s,o,l,c,u,h){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=u,f[6]=n,f[7]=l,f[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],u=n[6],h=n[1],f=n[4],p=n[7],g=n[2],m=n[5],y=n[8],x=s[0],_=s[3],v=s[6],S=s[1],w=s[4],T=s[7],k=s[2],O=s[5],D=s[8];return o[0]=l*x+c*S+u*k,o[3]=l*_+c*w+u*O,o[6]=l*v+c*T+u*D,o[1]=h*x+f*S+p*k,o[4]=h*_+f*w+p*O,o[7]=h*v+f*T+p*D,o[2]=g*x+m*S+y*k,o[5]=g*_+m*w+y*O,o[8]=g*v+m*T+y*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],h=t[7],f=t[8];return e*l*f-e*c*h-n*o*f+n*c*u+s*o*h-s*l*u}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],h=t[7],f=t[8],p=f*l-c*h,g=c*u-f*o,m=h*o-l*u,y=e*p+n*g+s*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/y;return t[0]=p*x,t[1]=(s*h-f*n)*x,t[2]=(c*n-s*l)*x,t[3]=g*x,t[4]=(f*e-s*u)*x,t[5]=(s*o-c*e)*x,t[6]=m*x,t[7]=(n*u-h*e)*x,t[8]=(l*e-n*o)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const u=Math.cos(o),h=Math.sin(o);return this.set(n*u,n*h,-n*(u*l+h*c)+l+t,-s*h,s*u,-s*(-h*l+u*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Bl.makeScale(t,e)),this}rotate(t){return this.premultiply(Bl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bl=new ue;function Ff(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ua(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function v_(){const i=Ua("canvas");return i.style.display="block",i}const Jh={};function y_(i){i in Jh||(Jh[i]=!0,console.warn(i))}const Qh=new ue().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),td=new ue().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Yo={[er]:{transfer:Da,primaries:ka,toReference:i=>i,fromReference:i=>i},[oi]:{transfer:Ee,primaries:ka,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Qa]:{transfer:Da,primaries:Na,toReference:i=>i.applyMatrix3(td),fromReference:i=>i.applyMatrix3(Qh)},[tu]:{transfer:Ee,primaries:Na,toReference:i=>i.convertSRGBToLinear().applyMatrix3(td),fromReference:i=>i.applyMatrix3(Qh).convertLinearToSRGB()}},x_=new Set([er,Qa]),xe={enabled:!0,_workingColorSpace:er,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!x_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Yo[t].toReference,s=Yo[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Yo[i].primaries},getTransfer:function(i){return i===Zi?Da:Yo[i].transfer}};function vs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fl(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Vr;class b_{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vr===void 0&&(Vr=Ua("canvas")),Vr.width=t.width,Vr.height=t.height;const n=Vr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ua("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=vs(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(vs(e[n]/255)*255):e[n]=vs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let w_=0;class Hf{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=Cs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push(Hl(s[l].image)):o.push(Hl(s[l]))}else o=Hl(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function Hl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?b_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let M_=0;class gn extends Cr{constructor(t=gn.DEFAULT_IMAGE,e=gn.DEFAULT_MAPPING,n=br,s=br,o=$n,l=wr,c=ci,u=Ki,h=gn.DEFAULT_ANISOTROPY,f=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:M_++}),this.uuid=Cs(),this.name="",this.source=new Hf(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=u,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ue,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pf)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Rc:t.x=t.x-Math.floor(t.x);break;case br:t.x=t.x<0?0:1;break;case Ic:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Rc:t.y=t.y-Math.floor(t.y);break;case br:t.y=t.y<0?0:1;break;case Ic:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}gn.DEFAULT_IMAGE=null;gn.DEFAULT_MAPPING=Pf;gn.DEFAULT_ANISOTROPY=1;class Qe{constructor(t=0,e=0,n=0,s=1){Qe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const u=t.elements,h=u[0],f=u[4],p=u[8],g=u[1],m=u[5],y=u[9],x=u[2],_=u[6],v=u[10];if(Math.abs(f-g)<.01&&Math.abs(p-x)<.01&&Math.abs(y-_)<.01){if(Math.abs(f+g)<.1&&Math.abs(p+x)<.1&&Math.abs(y+_)<.1&&Math.abs(h+m+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(h+1)/2,T=(m+1)/2,k=(v+1)/2,O=(f+g)/4,D=(p+x)/4,z=(y+_)/4;return w>T&&w>k?w<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(w),s=O/n,o=D/n):T>k?T<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(T),n=O/s,o=z/s):k<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(k),n=D/o,s=z/o),this.set(n,s,o,e),this}let S=Math.sqrt((_-y)*(_-y)+(p-x)*(p-x)+(g-f)*(g-f));return Math.abs(S)<.001&&(S=1),this.x=(_-y)/S,this.y=(p-x)/S,this.z=(g-f)/S,this.w=Math.acos((h+m+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class S_ extends Cr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Qe(0,0,t,e),this.scissorTest=!1,this.viewport=new Qe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$n,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new gn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Hf(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tr extends S_{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Vf extends gn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class E_ extends gn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Hn,this.minFilter=Hn,this.wrapR=br,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ar{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let u=n[s+0],h=n[s+1],f=n[s+2],p=n[s+3];const g=o[l+0],m=o[l+1],y=o[l+2],x=o[l+3];if(c===0){t[e+0]=u,t[e+1]=h,t[e+2]=f,t[e+3]=p;return}if(c===1){t[e+0]=g,t[e+1]=m,t[e+2]=y,t[e+3]=x;return}if(p!==x||u!==g||h!==m||f!==y){let _=1-c;const v=u*g+h*m+f*y+p*x,S=v>=0?1:-1,w=1-v*v;if(w>Number.EPSILON){const k=Math.sqrt(w),O=Math.atan2(k,v*S);_=Math.sin(_*O)/k,c=Math.sin(c*O)/k}const T=c*S;if(u=u*_+g*T,h=h*_+m*T,f=f*_+y*T,p=p*_+x*T,_===1-c){const k=1/Math.sqrt(u*u+h*h+f*f+p*p);u*=k,h*=k,f*=k,p*=k}}t[e]=u,t[e+1]=h,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],u=n[s+1],h=n[s+2],f=n[s+3],p=o[l],g=o[l+1],m=o[l+2],y=o[l+3];return t[e]=c*y+f*p+u*m-h*g,t[e+1]=u*y+f*g+h*p-c*m,t[e+2]=h*y+f*m+c*g-u*p,t[e+3]=f*y-c*p-u*g-h*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,u=Math.sin,h=c(n/2),f=c(s/2),p=c(o/2),g=u(n/2),m=u(s/2),y=u(o/2);switch(l){case"XYZ":this._x=g*f*p+h*m*y,this._y=h*m*p-g*f*y,this._z=h*f*y+g*m*p,this._w=h*f*p-g*m*y;break;case"YXZ":this._x=g*f*p+h*m*y,this._y=h*m*p-g*f*y,this._z=h*f*y-g*m*p,this._w=h*f*p+g*m*y;break;case"ZXY":this._x=g*f*p-h*m*y,this._y=h*m*p+g*f*y,this._z=h*f*y+g*m*p,this._w=h*f*p-g*m*y;break;case"ZYX":this._x=g*f*p-h*m*y,this._y=h*m*p+g*f*y,this._z=h*f*y-g*m*p,this._w=h*f*p+g*m*y;break;case"YZX":this._x=g*f*p+h*m*y,this._y=h*m*p+g*f*y,this._z=h*f*y-g*m*p,this._w=h*f*p-g*m*y;break;case"XZY":this._x=g*f*p-h*m*y,this._y=h*m*p-g*f*y,this._z=h*f*y+g*m*p,this._w=h*f*p+g*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],u=e[9],h=e[2],f=e[6],p=e[10],g=n+c+p;if(g>0){const m=.5/Math.sqrt(g+1);this._w=.25/m,this._x=(f-u)*m,this._y=(o-h)*m,this._z=(l-s)*m}else if(n>c&&n>p){const m=2*Math.sqrt(1+n-c-p);this._w=(f-u)/m,this._x=.25*m,this._y=(s+l)/m,this._z=(o+h)/m}else if(c>p){const m=2*Math.sqrt(1+c-n-p);this._w=(o-h)/m,this._x=(s+l)/m,this._y=.25*m,this._z=(u+f)/m}else{const m=2*Math.sqrt(1+p-n-c);this._w=(l-s)/m,this._x=(o+h)/m,this._y=(u+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,u=e._y,h=e._z,f=e._w;return this._x=n*f+l*c+s*h-o*u,this._y=s*f+l*u+o*c-n*h,this._z=o*f+l*h+n*u-s*c,this._w=l*f-n*c-s*u-o*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const u=1-c*c;if(u<=Number.EPSILON){const m=1-e;return this._w=m*l+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const h=Math.sqrt(u),f=Math.atan2(h,c),p=Math.sin((1-e)*f)/h,g=Math.sin(e*f)/h;return this._w=l*p+this._w*g,this._x=n*p+this._x*g,this._y=s*p+this._y*g,this._z=o*p+this._z*g,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,e=0,n=0){J.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ed.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ed.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,u=t.w,h=2*(l*s-c*n),f=2*(c*e-o*s),p=2*(o*n-l*e);return this.x=e+u*h+l*p-c*f,this.y=n+u*f+c*h-o*p,this.z=s+u*p+o*f-l*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,u=e.z;return this.x=s*u-o*c,this.y=o*l-n*u,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Vl.copy(this).projectOnVector(t),this.sub(Vl)}reflect(t){return this.sub(Vl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vl=new J,ed=new Ar;class To{constructor(t=new J(1/0,1/0,1/0),e=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Wn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Wn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Wn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,Wn):Wn.fromBufferAttribute(o,l),Wn.applyMatrix4(t.matrixWorld),this.expandByPoint(Wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ko.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ko.copy(n.boundingBox)),Ko.applyMatrix4(t.matrixWorld),this.union(Ko)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Wn),Wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($s),Jo.subVectors(this.max,$s),Gr.subVectors(t.a,$s),Wr.subVectors(t.b,$s),Zr.subVectors(t.c,$s),Bi.subVectors(Wr,Gr),Fi.subVectors(Zr,Wr),cr.subVectors(Gr,Zr);let e=[0,-Bi.z,Bi.y,0,-Fi.z,Fi.y,0,-cr.z,cr.y,Bi.z,0,-Bi.x,Fi.z,0,-Fi.x,cr.z,0,-cr.x,-Bi.y,Bi.x,0,-Fi.y,Fi.x,0,-cr.y,cr.x,0];return!Gl(e,Gr,Wr,Zr,Jo)||(e=[1,0,0,0,1,0,0,0,1],!Gl(e,Gr,Wr,Zr,Jo))?!1:(Qo.crossVectors(Bi,Fi),e=[Qo.x,Qo.y,Qo.z],Gl(e,Gr,Wr,Zr,Jo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const xi=[new J,new J,new J,new J,new J,new J,new J,new J],Wn=new J,Ko=new To,Gr=new J,Wr=new J,Zr=new J,Bi=new J,Fi=new J,cr=new J,$s=new J,Jo=new J,Qo=new J,ur=new J;function Gl(i,t,e,n,s){for(let o=0,l=i.length-3;o<=l;o+=3){ur.fromArray(i,o);const c=s.x*Math.abs(ur.x)+s.y*Math.abs(ur.y)+s.z*Math.abs(ur.z),u=t.dot(ur),h=e.dot(ur),f=n.dot(ur);if(Math.max(-Math.max(u,h,f),Math.min(u,h,f))>c)return!1}return!0}const T_=new To,Ys=new J,Wl=new J;class tl{constructor(t=new J,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):T_.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ys.subVectors(t,this.center);const e=Ys.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ys.copy(t.center).add(Wl)),this.expandByPoint(Ys.copy(t.center).sub(Wl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const bi=new J,Zl=new J,ta=new J,Hi=new J,Xl=new J,ea=new J,ql=new J;class el{constructor(t=new J,e=new J(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,bi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=bi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(bi.copy(this.origin).addScaledVector(this.direction,e),bi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Zl.copy(t).add(e).multiplyScalar(.5),ta.copy(e).sub(t).normalize(),Hi.copy(this.origin).sub(Zl);const o=t.distanceTo(e)*.5,l=-this.direction.dot(ta),c=Hi.dot(this.direction),u=-Hi.dot(ta),h=Hi.lengthSq(),f=Math.abs(1-l*l);let p,g,m,y;if(f>0)if(p=l*u-c,g=l*c-u,y=o*f,p>=0)if(g>=-y)if(g<=y){const x=1/f;p*=x,g*=x,m=p*(p+l*g+2*c)+g*(l*p+g+2*u)+h}else g=o,p=Math.max(0,-(l*g+c)),m=-p*p+g*(g+2*u)+h;else g=-o,p=Math.max(0,-(l*g+c)),m=-p*p+g*(g+2*u)+h;else g<=-y?(p=Math.max(0,-(-l*o+c)),g=p>0?-o:Math.min(Math.max(-o,-u),o),m=-p*p+g*(g+2*u)+h):g<=y?(p=0,g=Math.min(Math.max(-o,-u),o),m=g*(g+2*u)+h):(p=Math.max(0,-(l*o+c)),g=p>0?o:Math.min(Math.max(-o,-u),o),m=-p*p+g*(g+2*u)+h);else g=l>0?-o:o,p=Math.max(0,-(l*g+c)),m=-p*p+g*(g+2*u)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Zl).addScaledVector(ta,g),m}intersectSphere(t,e){bi.subVectors(t.center,this.origin);const n=bi.dot(this.direction),s=bi.dot(bi)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,u=n+l;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,u;const h=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,g=this.origin;return h>=0?(n=(t.min.x-g.x)*h,s=(t.max.x-g.x)*h):(n=(t.max.x-g.x)*h,s=(t.min.x-g.x)*h),f>=0?(o=(t.min.y-g.y)*f,l=(t.max.y-g.y)*f):(o=(t.max.y-g.y)*f,l=(t.min.y-g.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),p>=0?(c=(t.min.z-g.z)*p,u=(t.max.z-g.z)*p):(c=(t.max.z-g.z)*p,u=(t.min.z-g.z)*p),n>u||c>s)||((c>n||n!==n)&&(n=c),(u<s||s!==s)&&(s=u),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,bi)!==null}intersectTriangle(t,e,n,s,o){Xl.subVectors(e,t),ea.subVectors(n,t),ql.crossVectors(Xl,ea);let l=this.direction.dot(ql),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Hi.subVectors(this.origin,t);const u=c*this.direction.dot(ea.crossVectors(Hi,ea));if(u<0)return null;const h=c*this.direction.dot(Xl.cross(Hi));if(h<0||u+h>l)return null;const f=-c*Hi.dot(ql);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ce{constructor(t,e,n,s,o,l,c,u,h,f,p,g,m,y,x,_){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,h,f,p,g,m,y,x,_)}set(t,e,n,s,o,l,c,u,h,f,p,g,m,y,x,_){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=s,v[1]=o,v[5]=l,v[9]=c,v[13]=u,v[2]=h,v[6]=f,v[10]=p,v[14]=g,v[3]=m,v[7]=y,v[11]=x,v[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Xr.setFromMatrixColumn(t,0).length(),o=1/Xr.setFromMatrixColumn(t,1).length(),l=1/Xr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),u=Math.cos(s),h=Math.sin(s),f=Math.cos(o),p=Math.sin(o);if(t.order==="XYZ"){const g=l*f,m=l*p,y=c*f,x=c*p;e[0]=u*f,e[4]=-u*p,e[8]=h,e[1]=m+y*h,e[5]=g-x*h,e[9]=-c*u,e[2]=x-g*h,e[6]=y+m*h,e[10]=l*u}else if(t.order==="YXZ"){const g=u*f,m=u*p,y=h*f,x=h*p;e[0]=g+x*c,e[4]=y*c-m,e[8]=l*h,e[1]=l*p,e[5]=l*f,e[9]=-c,e[2]=m*c-y,e[6]=x+g*c,e[10]=l*u}else if(t.order==="ZXY"){const g=u*f,m=u*p,y=h*f,x=h*p;e[0]=g-x*c,e[4]=-l*p,e[8]=y+m*c,e[1]=m+y*c,e[5]=l*f,e[9]=x-g*c,e[2]=-l*h,e[6]=c,e[10]=l*u}else if(t.order==="ZYX"){const g=l*f,m=l*p,y=c*f,x=c*p;e[0]=u*f,e[4]=y*h-m,e[8]=g*h+x,e[1]=u*p,e[5]=x*h+g,e[9]=m*h-y,e[2]=-h,e[6]=c*u,e[10]=l*u}else if(t.order==="YZX"){const g=l*u,m=l*h,y=c*u,x=c*h;e[0]=u*f,e[4]=x-g*p,e[8]=y*p+m,e[1]=p,e[5]=l*f,e[9]=-c*f,e[2]=-h*f,e[6]=m*p+y,e[10]=g-x*p}else if(t.order==="XZY"){const g=l*u,m=l*h,y=c*u,x=c*h;e[0]=u*f,e[4]=-p,e[8]=h*f,e[1]=g*p+x,e[5]=l*f,e[9]=m*p-y,e[2]=y*p-m,e[6]=c*f,e[10]=x*p+g}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(A_,t,L_)}lookAt(t,e,n){const s=this.elements;return Ln.subVectors(t,e),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),Vi.crossVectors(n,Ln),Vi.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),Vi.crossVectors(n,Ln)),Vi.normalize(),na.crossVectors(Ln,Vi),s[0]=Vi.x,s[4]=na.x,s[8]=Ln.x,s[1]=Vi.y,s[5]=na.y,s[9]=Ln.y,s[2]=Vi.z,s[6]=na.z,s[10]=Ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],u=n[8],h=n[12],f=n[1],p=n[5],g=n[9],m=n[13],y=n[2],x=n[6],_=n[10],v=n[14],S=n[3],w=n[7],T=n[11],k=n[15],O=s[0],D=s[4],z=s[8],I=s[12],R=s[1],G=s[5],U=s[9],F=s[13],E=s[2],Z=s[6],ot=s[10],rt=s[14],W=s[3],it=s[7],et=s[11],q=s[15];return o[0]=l*O+c*R+u*E+h*W,o[4]=l*D+c*G+u*Z+h*it,o[8]=l*z+c*U+u*ot+h*et,o[12]=l*I+c*F+u*rt+h*q,o[1]=f*O+p*R+g*E+m*W,o[5]=f*D+p*G+g*Z+m*it,o[9]=f*z+p*U+g*ot+m*et,o[13]=f*I+p*F+g*rt+m*q,o[2]=y*O+x*R+_*E+v*W,o[6]=y*D+x*G+_*Z+v*it,o[10]=y*z+x*U+_*ot+v*et,o[14]=y*I+x*F+_*rt+v*q,o[3]=S*O+w*R+T*E+k*W,o[7]=S*D+w*G+T*Z+k*it,o[11]=S*z+w*U+T*ot+k*et,o[15]=S*I+w*F+T*rt+k*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],u=t[9],h=t[13],f=t[2],p=t[6],g=t[10],m=t[14],y=t[3],x=t[7],_=t[11],v=t[15];return y*(+o*u*p-s*h*p-o*c*g+n*h*g+s*c*m-n*u*m)+x*(+e*u*m-e*h*g+o*l*g-s*l*m+s*h*f-o*u*f)+_*(+e*h*p-e*c*m-o*l*p+n*l*m+o*c*f-n*h*f)+v*(-s*c*f-e*u*p+e*c*g+s*l*p-n*l*g+n*u*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],h=t[7],f=t[8],p=t[9],g=t[10],m=t[11],y=t[12],x=t[13],_=t[14],v=t[15],S=p*_*h-x*g*h+x*u*m-c*_*m-p*u*v+c*g*v,w=y*g*h-f*_*h-y*u*m+l*_*m+f*u*v-l*g*v,T=f*x*h-y*p*h+y*c*m-l*x*m-f*c*v+l*p*v,k=y*p*u-f*x*u-y*c*g+l*x*g+f*c*_-l*p*_,O=e*S+n*w+s*T+o*k;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/O;return t[0]=S*D,t[1]=(x*g*o-p*_*o-x*s*m+n*_*m+p*s*v-n*g*v)*D,t[2]=(c*_*o-x*u*o+x*s*h-n*_*h-c*s*v+n*u*v)*D,t[3]=(p*u*o-c*g*o-p*s*h+n*g*h+c*s*m-n*u*m)*D,t[4]=w*D,t[5]=(f*_*o-y*g*o+y*s*m-e*_*m-f*s*v+e*g*v)*D,t[6]=(y*u*o-l*_*o-y*s*h+e*_*h+l*s*v-e*u*v)*D,t[7]=(l*g*o-f*u*o+f*s*h-e*g*h-l*s*m+e*u*m)*D,t[8]=T*D,t[9]=(y*p*o-f*x*o-y*n*m+e*x*m+f*n*v-e*p*v)*D,t[10]=(l*x*o-y*c*o+y*n*h-e*x*h-l*n*v+e*c*v)*D,t[11]=(f*c*o-l*p*o-f*n*h+e*p*h+l*n*m-e*c*m)*D,t[12]=k*D,t[13]=(f*x*s-y*p*s+y*n*g-e*x*g-f*n*_+e*p*_)*D,t[14]=(y*c*s-l*x*s-y*n*u+e*x*u+l*n*_-e*c*_)*D,t[15]=(l*p*s-f*c*s+f*n*u-e*p*u-l*n*g+e*c*g)*D,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,u=t.z,h=o*l,f=o*c;return this.set(h*l+n,h*c-s*u,h*u+s*c,0,h*c+s*u,f*c+n,f*u-s*l,0,h*u-s*c,f*u+s*l,o*u*u+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,u=e._w,h=o+o,f=l+l,p=c+c,g=o*h,m=o*f,y=o*p,x=l*f,_=l*p,v=c*p,S=u*h,w=u*f,T=u*p,k=n.x,O=n.y,D=n.z;return s[0]=(1-(x+v))*k,s[1]=(m+T)*k,s[2]=(y-w)*k,s[3]=0,s[4]=(m-T)*O,s[5]=(1-(g+v))*O,s[6]=(_+S)*O,s[7]=0,s[8]=(y+w)*D,s[9]=(_-S)*D,s[10]=(1-(g+x))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Xr.set(s[0],s[1],s[2]).length();const l=Xr.set(s[4],s[5],s[6]).length(),c=Xr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Zn.copy(this);const h=1/o,f=1/l,p=1/c;return Zn.elements[0]*=h,Zn.elements[1]*=h,Zn.elements[2]*=h,Zn.elements[4]*=f,Zn.elements[5]*=f,Zn.elements[6]*=f,Zn.elements[8]*=p,Zn.elements[9]*=p,Zn.elements[10]*=p,e.setFromRotationMatrix(Zn),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=Ci){const u=this.elements,h=2*o/(e-t),f=2*o/(n-s),p=(e+t)/(e-t),g=(n+s)/(n-s);let m,y;if(c===Ci)m=-(l+o)/(l-o),y=-2*l*o/(l-o);else if(c===Oa)m=-l/(l-o),y=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=h,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=f,u[9]=g,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=y,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=Ci){const u=this.elements,h=1/(e-t),f=1/(n-s),p=1/(l-o),g=(e+t)*h,m=(n+s)*f;let y,x;if(c===Ci)y=(l+o)*p,x=-2*p;else if(c===Oa)y=o*p,x=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*h,u[4]=0,u[8]=0,u[12]=-g,u[1]=0,u[5]=2*f,u[9]=0,u[13]=-m,u[2]=0,u[6]=0,u[10]=x,u[14]=-y,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Xr=new J,Zn=new Ce,A_=new J(0,0,0),L_=new J(1,1,1),Vi=new J,na=new J,Ln=new J,nd=new Ce,id=new Ar;class ti{constructor(t=0,e=0,n=0,s=ti.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],f=s[9],p=s[2],g=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(g,h),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(Je(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-l,h)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-Je(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(g,m),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-l,h));break;case"YZX":this._z=Math.asin(Je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,h),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(g,h),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return nd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(nd,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return id.setFromEuler(this),this.setFromQuaternion(id,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ti.DEFAULT_ORDER="XYZ";class eu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let C_=0;const rd=new J,qr=new Ar,wi=new Ce,ia=new J,Ks=new J,P_=new J,R_=new Ar,sd=new J(1,0,0),od=new J(0,1,0),ad=new J(0,0,1),ld={type:"added"},I_={type:"removed"},jr={type:"childadded",child:null},jl={type:"childremoved",child:null};class nn extends Cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:C_++}),this.uuid=Cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const t=new J,e=new ti,n=new Ar,s=new J(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ce},normalMatrix:{value:new ue}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qr.setFromAxisAngle(t,e),this.quaternion.multiply(qr),this}rotateOnWorldAxis(t,e){return qr.setFromAxisAngle(t,e),this.quaternion.premultiply(qr),this}rotateX(t){return this.rotateOnAxis(sd,t)}rotateY(t){return this.rotateOnAxis(od,t)}rotateZ(t){return this.rotateOnAxis(ad,t)}translateOnAxis(t,e){return rd.copy(t).applyQuaternion(this.quaternion),this.position.add(rd.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(sd,t)}translateY(t){return this.translateOnAxis(od,t)}translateZ(t){return this.translateOnAxis(ad,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(wi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ia.copy(t):ia.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ks.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wi.lookAt(Ks,ia,this.up):wi.lookAt(ia,Ks,this.up),this.quaternion.setFromRotationMatrix(wi),s&&(wi.extractRotation(s.matrixWorld),qr.setFromRotationMatrix(wi),this.quaternion.premultiply(qr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ld),jr.child=t,this.dispatchEvent(jr),jr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(I_),jl.child=t,this.dispatchEvent(jl),jl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),wi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),wi.multiply(t.parent.matrixWorld)),t.applyMatrix4(wi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ld),jr.child=t,this.dispatchEvent(jr),jr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,t,P_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ks,R_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let h=0,f=u.length;h<f;h++){const p=u[h];o(t.shapes,p)}else o(t.shapes,u)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,h=this.material.length;u<h;u++)c.push(o(t.materials,this.material[u]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];s.animations.push(o(t.animations,u))}}if(e){const c=l(t.geometries),u=l(t.materials),h=l(t.textures),f=l(t.images),p=l(t.shapes),g=l(t.skeletons),m=l(t.animations),y=l(t.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),h.length>0&&(n.textures=h),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),g.length>0&&(n.skeletons=g),m.length>0&&(n.animations=m),y.length>0&&(n.nodes=y)}return n.object=s,n;function l(c){const u=[];for(const h in c){const f=c[h];delete f.metadata,u.push(f)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}nn.DEFAULT_UP=new J(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xn=new J,Mi=new J,$l=new J,Si=new J,$r=new J,Yr=new J,cd=new J,Yl=new J,Kl=new J,Jl=new J;class Yn{constructor(t=new J,e=new J,n=new J){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Xn.subVectors(t,e),s.cross(Xn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){Xn.subVectors(s,e),Mi.subVectors(n,e),$l.subVectors(t,e);const l=Xn.dot(Xn),c=Xn.dot(Mi),u=Xn.dot($l),h=Mi.dot(Mi),f=Mi.dot($l),p=l*h-c*c;if(p===0)return o.set(0,0,0),null;const g=1/p,m=(h*u-c*f)*g,y=(l*f-c*u)*g;return o.set(1-m-y,y,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(t,e,n,s,o,l,c,u){return this.getBarycoord(t,e,n,s,Si)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,Si.x),u.addScaledVector(l,Si.y),u.addScaledVector(c,Si.z),u)}static isFrontFacing(t,e,n,s){return Xn.subVectors(n,e),Mi.subVectors(t,e),Xn.cross(Mi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Xn.cross(Mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Yn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Yn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Yn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Yn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Yn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;$r.subVectors(s,n),Yr.subVectors(o,n),Yl.subVectors(t,n);const u=$r.dot(Yl),h=Yr.dot(Yl);if(u<=0&&h<=0)return e.copy(n);Kl.subVectors(t,s);const f=$r.dot(Kl),p=Yr.dot(Kl);if(f>=0&&p<=f)return e.copy(s);const g=u*p-f*h;if(g<=0&&u>=0&&f<=0)return l=u/(u-f),e.copy(n).addScaledVector($r,l);Jl.subVectors(t,o);const m=$r.dot(Jl),y=Yr.dot(Jl);if(y>=0&&m<=y)return e.copy(o);const x=m*h-u*y;if(x<=0&&h>=0&&y<=0)return c=h/(h-y),e.copy(n).addScaledVector(Yr,c);const _=f*y-m*p;if(_<=0&&p-f>=0&&m-y>=0)return cd.subVectors(o,s),c=(p-f)/(p-f+(m-y)),e.copy(s).addScaledVector(cd,c);const v=1/(_+x+g);return l=x*v,c=g*v,e.copy(n).addScaledVector($r,l).addScaledVector(Yr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Gf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Gi={h:0,s:0,l:0},ra={h:0,s:0,l:0};function Ql(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=oi){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=xe.workingColorSpace){return this.r=t,this.g=e,this.b=n,xe.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=xe.workingColorSpace){if(t=g_(t,1),e=Je(e,0,1),n=Je(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=Ql(l,o,t+1/3),this.g=Ql(l,o,t),this.b=Ql(l,o,t-1/3)}return xe.toWorkingColorSpace(this,s),this}setStyle(t,e=oi){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=oi){const n=Gf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=vs(t.r),this.g=vs(t.g),this.b=vs(t.b),this}copyLinearToSRGB(t){return this.r=Fl(t.r),this.g=Fl(t.g),this.b=Fl(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=oi){return xe.fromWorkingColorSpace(on.copy(this),t),Math.round(Je(on.r*255,0,255))*65536+Math.round(Je(on.g*255,0,255))*256+Math.round(Je(on.b*255,0,255))}getHexString(t=oi){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.fromWorkingColorSpace(on.copy(this),e);const n=on.r,s=on.g,o=on.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let u,h;const f=(c+l)/2;if(c===l)u=0,h=0;else{const p=l-c;switch(h=f<=.5?p/(l+c):p/(2-l-c),l){case n:u=(s-o)/p+(s<o?6:0);break;case s:u=(o-n)/p+2;break;case o:u=(n-s)/p+4;break}u/=6}return t.h=u,t.s=h,t.l=f,t}getRGB(t,e=xe.workingColorSpace){return xe.fromWorkingColorSpace(on.copy(this),e),t.r=on.r,t.g=on.g,t.b=on.b,t}getStyle(t=oi){xe.fromWorkingColorSpace(on.copy(this),t);const e=on.r,n=on.g,s=on.b;return t!==oi?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Gi),this.setHSL(Gi.h+t,Gi.s+e,Gi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Gi),t.getHSL(ra);const n=zl(Gi.h,ra.h,e),s=zl(Gi.s,ra.s,e),o=zl(Gi.l,ra.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const on=new Kt;Kt.NAMES=Gf;let D_=0;class Pr extends Cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=Cs(),this.name="",this.type="Material",this.blending=gs,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ac,this.blendDst=Lc,this.blendEquation=_r,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ra,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hr,this.stencilZFail=Hr,this.stencilZPass=Hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==Qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ac&&(n.blendSrc=this.blendSrc),this.blendDst!==Lc&&(n.blendDst=this.blendDst),this.blendEquation!==_r&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ra&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==$h&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Wf extends Pr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const We=new J,sa=new vt;class kn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Yh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=qi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return y_("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)sa.fromBufferAttribute(this,e),sa.applyMatrix3(t),this.setXY(e,sa.x,sa.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix3(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=js(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=bn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=js(e,this.array)),e}setX(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=js(e,this.array)),e}setY(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=js(e,this.array)),e}setZ(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=js(e,this.array)),e}setW(t,e){return this.normalized&&(e=bn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),n=bn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),n=bn(n,this.array),s=bn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=bn(e,this.array),n=bn(n,this.array),s=bn(s,this.array),o=bn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Yh&&(t.usage=this.usage),t}}class Zf extends kn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Xf extends kn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ye extends kn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let k_=0;const zn=new Ce,tc=new nn,Kr=new J,Cn=new To,Js=new To,$e=new J;class Oe extends Cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=Cs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ff(t)?Xf:Zf)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ue().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return zn.makeRotationFromQuaternion(t),this.applyMatrix4(zn),this}rotateX(t){return zn.makeRotationX(t),this.applyMatrix4(zn),this}rotateY(t){return zn.makeRotationY(t),this.applyMatrix4(zn),this}rotateZ(t){return zn.makeRotationZ(t),this.applyMatrix4(zn),this}translate(t,e,n){return zn.makeTranslation(t,e,n),this.applyMatrix4(zn),this}scale(t,e,n){return zn.makeScale(t,e,n),this.applyMatrix4(zn),this}lookAt(t){return tc.lookAt(t),tc.updateMatrix(),this.applyMatrix4(tc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new ye(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new To);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];Cn.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Cn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Cn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Cn.min),this.boundingBox.expandByPoint(Cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new tl);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const n=this.boundingSphere.center;if(Cn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];Js.setFromBufferAttribute(c),this.morphTargetsRelative?($e.addVectors(Cn.min,Js.min),Cn.expandByPoint($e),$e.addVectors(Cn.max,Js.max),Cn.expandByPoint($e)):(Cn.expandByPoint(Js.min),Cn.expandByPoint(Js.max))}Cn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)$e.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared($e));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],u=this.morphTargetsRelative;for(let h=0,f=c.count;h<f;h++)$e.fromBufferAttribute(c,h),u&&(Kr.fromBufferAttribute(t,h),$e.add(Kr)),s=Math.max(s,n.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new kn(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],u=[];for(let z=0;z<n.count;z++)c[z]=new J,u[z]=new J;const h=new J,f=new J,p=new J,g=new vt,m=new vt,y=new vt,x=new J,_=new J;function v(z,I,R){h.fromBufferAttribute(n,z),f.fromBufferAttribute(n,I),p.fromBufferAttribute(n,R),g.fromBufferAttribute(o,z),m.fromBufferAttribute(o,I),y.fromBufferAttribute(o,R),f.sub(h),p.sub(h),m.sub(g),y.sub(g);const G=1/(m.x*y.y-y.x*m.y);isFinite(G)&&(x.copy(f).multiplyScalar(y.y).addScaledVector(p,-m.y).multiplyScalar(G),_.copy(p).multiplyScalar(m.x).addScaledVector(f,-y.x).multiplyScalar(G),c[z].add(x),c[I].add(x),c[R].add(x),u[z].add(_),u[I].add(_),u[R].add(_))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let z=0,I=S.length;z<I;++z){const R=S[z],G=R.start,U=R.count;for(let F=G,E=G+U;F<E;F+=3)v(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const w=new J,T=new J,k=new J,O=new J;function D(z){k.fromBufferAttribute(s,z),O.copy(k);const I=c[z];w.copy(I),w.sub(k.multiplyScalar(k.dot(I))).normalize(),T.crossVectors(O,I);const G=T.dot(u[z])<0?-1:1;l.setXYZW(z,w.x,w.y,w.z,G)}for(let z=0,I=S.length;z<I;++z){const R=S[z],G=R.start,U=R.count;for(let F=G,E=G+U;F<E;F+=3)D(t.getX(F+0)),D(t.getX(F+1)),D(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new kn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let g=0,m=n.count;g<m;g++)n.setXYZ(g,0,0,0);const s=new J,o=new J,l=new J,c=new J,u=new J,h=new J,f=new J,p=new J;if(t)for(let g=0,m=t.count;g<m;g+=3){const y=t.getX(g+0),x=t.getX(g+1),_=t.getX(g+2);s.fromBufferAttribute(e,y),o.fromBufferAttribute(e,x),l.fromBufferAttribute(e,_),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),c.fromBufferAttribute(n,y),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,_),c.add(f),u.add(f),h.add(f),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(x,u.x,u.y,u.z),n.setXYZ(_,h.x,h.y,h.z)}else for(let g=0,m=e.count;g<m;g+=3)s.fromBufferAttribute(e,g+0),o.fromBufferAttribute(e,g+1),l.fromBufferAttribute(e,g+2),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),n.setXYZ(g+0,f.x,f.y,f.z),n.setXYZ(g+1,f.x,f.y,f.z),n.setXYZ(g+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)$e.fromBufferAttribute(t,e),$e.normalize(),t.setXYZ(e,$e.x,$e.y,$e.z)}toNonIndexed(){function t(c,u){const h=c.array,f=c.itemSize,p=c.normalized,g=new h.constructor(u.length*f);let m=0,y=0;for(let x=0,_=u.length;x<_;x++){c.isInterleavedBufferAttribute?m=u[x]*c.data.stride+c.offset:m=u[x]*f;for(let v=0;v<f;v++)g[y++]=h[m++]}return new kn(g,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,n=this.index.array,s=this.attributes;for(const c in s){const u=s[c],h=t(u,n);e.setAttribute(c,h)}const o=this.morphAttributes;for(const c in o){const u=[],h=o[c];for(let f=0,p=h.length;f<p;f++){const g=h[f],m=t(g,n);u.push(m)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,u=l.length;c<u;c++){const h=l[c];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const h in u)u[h]!==void 0&&(t[h]=u[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const u in n){const h=n[u];t.data.attributes[u]=h.toJSON(t.data)}const s={};let o=!1;for(const u in this.morphAttributes){const h=this.morphAttributes[u],f=[];for(let p=0,g=h.length;p<g;p++){const m=h[p];f.push(m.toJSON(t.data))}f.length>0&&(s[u]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const f=s[h];this.setAttribute(h,f.clone(e))}const o=t.morphAttributes;for(const h in o){const f=[],p=o[h];for(let g=0,m=p.length;g<m;g++)f.push(p[g].clone(e));this.morphAttributes[h]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let h=0,f=l.length;h<f;h++){const p=l[h];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ud=new Ce,hr=new el,oa=new tl,hd=new J,Jr=new J,Qr=new J,ts=new J,ec=new J,aa=new J,la=new vt,ca=new vt,ua=new vt,dd=new J,fd=new J,pd=new J,ha=new J,da=new J;class Ie extends nn{constructor(t=new Oe,e=new Wf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){aa.set(0,0,0);for(let u=0,h=o.length;u<h;u++){const f=c[u],p=o[u];f!==0&&(ec.fromBufferAttribute(p,t),l?aa.addScaledVector(ec,f):aa.addScaledVector(ec.sub(e),f))}e.add(aa)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(o),hr.copy(t.ray).recast(t.near),!(oa.containsPoint(hr.origin)===!1&&(hr.intersectSphere(oa,hd)===null||hr.origin.distanceToSquared(hd)>(t.far-t.near)**2))&&(ud.copy(o).invert(),hr.copy(t.ray).applyMatrix4(ud),!(n.boundingBox!==null&&hr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,hr)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,u=o.attributes.position,h=o.attributes.uv,f=o.attributes.uv1,p=o.attributes.normal,g=o.groups,m=o.drawRange;if(c!==null)if(Array.isArray(l))for(let y=0,x=g.length;y<x;y++){const _=g[y],v=l[_.materialIndex],S=Math.max(_.start,m.start),w=Math.min(c.count,Math.min(_.start+_.count,m.start+m.count));for(let T=S,k=w;T<k;T+=3){const O=c.getX(T),D=c.getX(T+1),z=c.getX(T+2);s=fa(this,v,t,n,h,f,p,O,D,z),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const y=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let _=y,v=x;_<v;_+=3){const S=c.getX(_),w=c.getX(_+1),T=c.getX(_+2);s=fa(this,l,t,n,h,f,p,S,w,T),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(u!==void 0)if(Array.isArray(l))for(let y=0,x=g.length;y<x;y++){const _=g[y],v=l[_.materialIndex],S=Math.max(_.start,m.start),w=Math.min(u.count,Math.min(_.start+_.count,m.start+m.count));for(let T=S,k=w;T<k;T+=3){const O=T,D=T+1,z=T+2;s=fa(this,v,t,n,h,f,p,O,D,z),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const y=Math.max(0,m.start),x=Math.min(u.count,m.start+m.count);for(let _=y,v=x;_<v;_+=3){const S=_,w=_+1,T=_+2;s=fa(this,l,t,n,h,f,p,S,w,T),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}}function N_(i,t,e,n,s,o,l,c){let u;if(t.side===Tn?u=n.intersectTriangle(l,o,s,!0,c):u=n.intersectTriangle(s,o,l,t.side===Qi,c),u===null)return null;da.copy(c),da.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(da);return h<e.near||h>e.far?null:{distance:h,point:da.clone(),object:i}}function fa(i,t,e,n,s,o,l,c,u,h){i.getVertexPosition(c,Jr),i.getVertexPosition(u,Qr),i.getVertexPosition(h,ts);const f=N_(i,t,e,n,Jr,Qr,ts,ha);if(f){s&&(la.fromBufferAttribute(s,c),ca.fromBufferAttribute(s,u),ua.fromBufferAttribute(s,h),f.uv=Yn.getInterpolation(ha,Jr,Qr,ts,la,ca,ua,new vt)),o&&(la.fromBufferAttribute(o,c),ca.fromBufferAttribute(o,u),ua.fromBufferAttribute(o,h),f.uv1=Yn.getInterpolation(ha,Jr,Qr,ts,la,ca,ua,new vt)),l&&(dd.fromBufferAttribute(l,c),fd.fromBufferAttribute(l,u),pd.fromBufferAttribute(l,h),f.normal=Yn.getInterpolation(ha,Jr,Qr,ts,dd,fd,pd,new J),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:c,b:u,c:h,normal:new J,materialIndex:0};Yn.getNormal(Jr,Qr,ts,p.normal),f.face=p}return f}class pn extends Oe{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const u=[],h=[],f=[],p=[];let g=0,m=0;y("z","y","x",-1,-1,n,e,t,l,o,0),y("z","y","x",1,-1,n,e,-t,l,o,1),y("x","z","y",1,1,t,n,e,s,l,2),y("x","z","y",1,-1,t,n,-e,s,l,3),y("x","y","z",1,-1,t,e,n,s,o,4),y("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(u),this.setAttribute("position",new ye(h,3)),this.setAttribute("normal",new ye(f,3)),this.setAttribute("uv",new ye(p,2));function y(x,_,v,S,w,T,k,O,D,z,I){const R=T/D,G=k/z,U=T/2,F=k/2,E=O/2,Z=D+1,ot=z+1;let rt=0,W=0;const it=new J;for(let et=0;et<ot;et++){const q=et*G-F;for(let Y=0;Y<Z;Y++){const At=Y*R-U;it[x]=At*S,it[_]=q*w,it[v]=E,h.push(it.x,it.y,it.z),it[x]=0,it[_]=0,it[v]=O>0?1:-1,f.push(it.x,it.y,it.z),p.push(Y/D),p.push(1-et/z),rt+=1}}for(let et=0;et<z;et++)for(let q=0;q<D;q++){const Y=g+q+Z*et,At=g+q+Z*(et+1),tt=g+(q+1)+Z*(et+1),st=g+(q+1)+Z*et;u.push(Y,At,st),u.push(At,tt,st),W+=6}c.addGroup(m,W,I),m+=W,g+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ts(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function fn(i){const t={};for(let e=0;e<i.length;e++){const n=Ts(i[e]);for(const s in n)t[s]=n[s]}return t}function O_(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function qf(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:xe.workingColorSpace}const U_={clone:Ts,merge:fn};var z_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class tr extends Pr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=z_,this.fragmentShader=B_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ts(t.uniforms),this.uniformsGroups=O_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class jf extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=Ci}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Wi=new J,md=new vt,gd=new vt;class Rn extends jf{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Dc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ao*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Dc*2*Math.atan(Math.tan(ao*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Wi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z),Wi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wi.x,Wi.y).multiplyScalar(-t/Wi.z)}getViewSize(t,e){return this.getViewBounds(t,md,gd),e.subVectors(gd,md)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ao*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const u=l.fullWidth,h=l.fullHeight;o+=l.offsetX*s/u,e-=l.offsetY*n/h,s*=l.width/u,n*=l.height/h}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const es=-90,ns=1;class F_ extends nn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Rn(es,ns,t,e);s.layers=this.layers,this.add(s);const o=new Rn(es,ns,t,e);o.layers=this.layers,this.add(o);const l=new Rn(es,ns,t,e);l.layers=this.layers,this.add(l);const c=new Rn(es,ns,t,e);c.layers=this.layers,this.add(c);const u=new Rn(es,ns,t,e);u.layers=this.layers,this.add(u);const h=new Rn(es,ns,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,u]=e;for(const h of e)this.remove(h);if(t===Ci)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===Oa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,u,h,f]=this.children,p=t.getRenderTarget(),g=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),y=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,u),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(p,g,m),t.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class $f extends gn{constructor(t,e,n,s,o,l,c,u,h,f){t=t!==void 0?t:[],e=e!==void 0?e:Ms,super(t,e,n,s,o,l,c,u,h,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class H_ extends Tr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new $f(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$n}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new pn(5,5,5),o=new tr({name:"CubemapFromEquirect",uniforms:Ts(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Tn,blending:$i});o.uniforms.tEquirect.value=e;const l=new Ie(s,o),c=e.minFilter;return e.minFilter===wr&&(e.minFilter=$n),new F_(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const nc=new J,V_=new J,G_=new ue;class Fn{constructor(t=new J(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=nc.subVectors(n,e).cross(V_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(nc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||G_.getNormalMatrix(t),s=this.coplanarPoint(nc).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const dr=new tl,pa=new J;class nu{constructor(t=new Fn,e=new Fn,n=new Fn,s=new Fn,o=new Fn,l=new Fn){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ci){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],u=s[3],h=s[4],f=s[5],p=s[6],g=s[7],m=s[8],y=s[9],x=s[10],_=s[11],v=s[12],S=s[13],w=s[14],T=s[15];if(n[0].setComponents(u-o,g-h,_-m,T-v).normalize(),n[1].setComponents(u+o,g+h,_+m,T+v).normalize(),n[2].setComponents(u+l,g+f,_+y,T+S).normalize(),n[3].setComponents(u-l,g-f,_-y,T-S).normalize(),n[4].setComponents(u-c,g-p,_-x,T-w).normalize(),e===Ci)n[5].setComponents(u+c,g+p,_+x,T+w).normalize();else if(e===Oa)n[5].setComponents(c,p,x,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),dr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),dr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(dr)}intersectsSprite(t){return dr.center.set(0,0,0),dr.radius=.7071067811865476,dr.applyMatrix4(t.matrixWorld),this.intersectsSphere(dr)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(pa.x=s.normal.x>0?t.max.x:t.min.x,pa.y=s.normal.y>0?t.max.y:t.min.y,pa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(pa)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Yf(){let i=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function W_(i){const t=new WeakMap;function e(c,u){const h=c.array,f=c.usage,p=h.byteLength,g=i.createBuffer();i.bindBuffer(u,g),i.bufferData(u,h,f),c.onUploadCallback();let m;if(h instanceof Float32Array)m=i.FLOAT;else if(h instanceof Uint16Array)c.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)m=i.SHORT;else if(h instanceof Uint32Array)m=i.UNSIGNED_INT;else if(h instanceof Int32Array)m=i.INT;else if(h instanceof Int8Array)m=i.BYTE;else if(h instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:g,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,h){const f=u.array,p=u._updateRange,g=u.updateRanges;if(i.bindBuffer(h,c),p.count===-1&&g.length===0&&i.bufferSubData(h,0,f),g.length!==0){for(let m=0,y=g.length;m<y;m++){const x=g[m];i.bufferSubData(h,x.start*f.BYTES_PER_ELEMENT,f,x.start,x.count)}u.clearUpdateRanges()}p.count!==-1&&(i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=t.get(c);u&&(i.deleteBuffer(u.buffer),t.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=t.get(c);if(h===void 0)t.set(c,e(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,c,u),h.version=c.version}}return{get:s,remove:o,update:l}}class Ao extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),u=Math.floor(s),h=c+1,f=u+1,p=t/c,g=e/u,m=[],y=[],x=[],_=[];for(let v=0;v<f;v++){const S=v*g-l;for(let w=0;w<h;w++){const T=w*p-o;y.push(T,-S,0),x.push(0,0,1),_.push(w/c),_.push(1-v/u)}}for(let v=0;v<u;v++)for(let S=0;S<c;S++){const w=S+h*v,T=S+h*(v+1),k=S+1+h*(v+1),O=S+1+h*v;m.push(w,T,O),m.push(T,k,O)}this.setIndex(m),this.setAttribute("position",new ye(y,3)),this.setAttribute("normal",new ye(x,3)),this.setAttribute("uv",new ye(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ao(t.width,t.height,t.widthSegments,t.heightSegments)}}var Z_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,X_=`#ifdef USE_ALPHAHASH
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
#endif`,q_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,j_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Y_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,K_=`#ifdef USE_AOMAP
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
#endif`,J_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Q_=`#ifdef USE_BATCHING
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
#endif`,tv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ev=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,iv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rv=`#ifdef USE_IRIDESCENCE
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
#endif`,sv=`#ifdef USE_BUMPMAP
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
#endif`,ov=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,av=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,hv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,fv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,pv=`#define PI 3.141592653589793
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
} // validated`,mv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gv=`vec3 transformedNormal = objectNormal;
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
#endif`,_v=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bv="gl_FragColor = linearToOutputTexel( gl_FragColor );",wv=`
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
}`,Mv=`#ifdef USE_ENVMAP
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
#endif`,Sv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ev=`#ifdef USE_ENVMAP
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
#endif`,Tv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
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
#endif`,Lv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Cv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Rv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Iv=`#ifdef USE_GRADIENTMAP
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
}`,Dv=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,kv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ov=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Uv=`uniform bool receiveShadow;
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
#endif`,zv=`#ifdef USE_ENVMAP
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
#endif`,Bv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Fv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gv=`PhysicalMaterial material;
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
#endif`,Wv=`struct PhysicalMaterial {
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
}`,Zv=`
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
#endif`,Xv=`#if defined( RE_IndirectDiffuse )
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
#endif`,qv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,$v=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,t0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,e0=`#if defined( USE_POINTS_UV )
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
#endif`,n0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,r0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,o0=`#ifdef USE_MORPHNORMALS
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
#endif`,a0=`#ifdef USE_MORPHTARGETS
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
#endif`,l0=`#ifdef USE_MORPHTARGETS
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
#endif`,c0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,u0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,h0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,p0=`#ifdef USE_NORMALMAP
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
#endif`,m0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,g0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,y0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,x0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,b0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,w0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,M0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,E0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,T0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,C0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,P0=`float getShadowMask() {
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
}`,R0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,I0=`#ifdef USE_SKINNING
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
#endif`,D0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,k0=`#ifdef USE_SKINNING
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
#endif`,N0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,O0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,U0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,z0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,B0=`#ifdef USE_TRANSMISSION
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
#endif`,F0=`#ifdef USE_TRANSMISSION
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
#endif`,H0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,V0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Z0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,X0=`uniform sampler2D t2D;
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
}`,q0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,$0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Y0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,K0=`#include <common>
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
}`,J0=`#if DEPTH_PACKING == 3200
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
}`,Q0=`#define DISTANCE
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
}`,ty=`#define DISTANCE
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
}`,ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ny=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iy=`uniform float scale;
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
}`,ry=`uniform vec3 diffuse;
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
}`,sy=`#include <common>
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
}`,oy=`uniform vec3 diffuse;
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
}`,ay=`#define LAMBERT
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
}`,ly=`#define LAMBERT
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
}`,cy=`#define MATCAP
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
}`,uy=`#define MATCAP
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
}`,hy=`#define NORMAL
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
}`,dy=`#define NORMAL
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
}`,fy=`#define PHONG
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
}`,py=`#define PHONG
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
}`,my=`#define STANDARD
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
}`,gy=`#define STANDARD
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
}`,_y=`#define TOON
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
}`,vy=`#define TOON
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
}`,yy=`uniform float size;
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
}`,xy=`uniform vec3 diffuse;
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
}`,by=`#include <common>
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
}`,wy=`uniform vec3 color;
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
}`,My=`uniform float rotation;
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
}`,Sy=`uniform vec3 diffuse;
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
}`,ce={alphahash_fragment:Z_,alphahash_pars_fragment:X_,alphamap_fragment:q_,alphamap_pars_fragment:j_,alphatest_fragment:$_,alphatest_pars_fragment:Y_,aomap_fragment:K_,aomap_pars_fragment:J_,batching_pars_vertex:Q_,batching_vertex:tv,begin_vertex:ev,beginnormal_vertex:nv,bsdfs:iv,iridescence_fragment:rv,bumpmap_pars_fragment:sv,clipping_planes_fragment:ov,clipping_planes_pars_fragment:av,clipping_planes_pars_vertex:lv,clipping_planes_vertex:cv,color_fragment:uv,color_pars_fragment:hv,color_pars_vertex:dv,color_vertex:fv,common:pv,cube_uv_reflection_fragment:mv,defaultnormal_vertex:gv,displacementmap_pars_vertex:_v,displacementmap_vertex:vv,emissivemap_fragment:yv,emissivemap_pars_fragment:xv,colorspace_fragment:bv,colorspace_pars_fragment:wv,envmap_fragment:Mv,envmap_common_pars_fragment:Sv,envmap_pars_fragment:Ev,envmap_pars_vertex:Tv,envmap_physical_pars_fragment:zv,envmap_vertex:Av,fog_vertex:Lv,fog_pars_vertex:Cv,fog_fragment:Pv,fog_pars_fragment:Rv,gradientmap_pars_fragment:Iv,lightmap_fragment:Dv,lightmap_pars_fragment:kv,lights_lambert_fragment:Nv,lights_lambert_pars_fragment:Ov,lights_pars_begin:Uv,lights_toon_fragment:Bv,lights_toon_pars_fragment:Fv,lights_phong_fragment:Hv,lights_phong_pars_fragment:Vv,lights_physical_fragment:Gv,lights_physical_pars_fragment:Wv,lights_fragment_begin:Zv,lights_fragment_maps:Xv,lights_fragment_end:qv,logdepthbuf_fragment:jv,logdepthbuf_pars_fragment:$v,logdepthbuf_pars_vertex:Yv,logdepthbuf_vertex:Kv,map_fragment:Jv,map_pars_fragment:Qv,map_particle_fragment:t0,map_particle_pars_fragment:e0,metalnessmap_fragment:n0,metalnessmap_pars_fragment:i0,morphinstance_vertex:r0,morphcolor_vertex:s0,morphnormal_vertex:o0,morphtarget_pars_vertex:a0,morphtarget_vertex:l0,normal_fragment_begin:c0,normal_fragment_maps:u0,normal_pars_fragment:h0,normal_pars_vertex:d0,normal_vertex:f0,normalmap_pars_fragment:p0,clearcoat_normal_fragment_begin:m0,clearcoat_normal_fragment_maps:g0,clearcoat_pars_fragment:_0,iridescence_pars_fragment:v0,opaque_fragment:y0,packing:x0,premultiplied_alpha_fragment:b0,project_vertex:w0,dithering_fragment:M0,dithering_pars_fragment:S0,roughnessmap_fragment:E0,roughnessmap_pars_fragment:T0,shadowmap_pars_fragment:A0,shadowmap_pars_vertex:L0,shadowmap_vertex:C0,shadowmask_pars_fragment:P0,skinbase_vertex:R0,skinning_pars_vertex:I0,skinning_vertex:D0,skinnormal_vertex:k0,specularmap_fragment:N0,specularmap_pars_fragment:O0,tonemapping_fragment:U0,tonemapping_pars_fragment:z0,transmission_fragment:B0,transmission_pars_fragment:F0,uv_pars_fragment:H0,uv_pars_vertex:V0,uv_vertex:G0,worldpos_vertex:W0,background_vert:Z0,background_frag:X0,backgroundCube_vert:q0,backgroundCube_frag:j0,cube_vert:$0,cube_frag:Y0,depth_vert:K0,depth_frag:J0,distanceRGBA_vert:Q0,distanceRGBA_frag:ty,equirect_vert:ey,equirect_frag:ny,linedashed_vert:iy,linedashed_frag:ry,meshbasic_vert:sy,meshbasic_frag:oy,meshlambert_vert:ay,meshlambert_frag:ly,meshmatcap_vert:cy,meshmatcap_frag:uy,meshnormal_vert:hy,meshnormal_frag:dy,meshphong_vert:fy,meshphong_frag:py,meshphysical_vert:my,meshphysical_frag:gy,meshtoon_vert:_y,meshtoon_frag:vy,points_vert:yy,points_frag:xy,shadow_vert:by,shadow_frag:wy,sprite_vert:My,sprite_frag:Sy},Nt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ue}},envmap:{envMap:{value:null},envMapRotation:{value:new ue},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ue}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ue}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ue},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ue},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ue},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ue}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ue}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ue}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0},uvTransform:{value:new ue}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ue},alphaMap:{value:null},alphaMapTransform:{value:new ue},alphaTest:{value:0}}},ai={basic:{uniforms:fn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:ce.meshbasic_vert,fragmentShader:ce.meshbasic_frag},lambert:{uniforms:fn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:ce.meshlambert_vert,fragmentShader:ce.meshlambert_frag},phong:{uniforms:fn([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:ce.meshphong_vert,fragmentShader:ce.meshphong_frag},standard:{uniforms:fn([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag},toon:{uniforms:fn([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:ce.meshtoon_vert,fragmentShader:ce.meshtoon_frag},matcap:{uniforms:fn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:ce.meshmatcap_vert,fragmentShader:ce.meshmatcap_frag},points:{uniforms:fn([Nt.points,Nt.fog]),vertexShader:ce.points_vert,fragmentShader:ce.points_frag},dashed:{uniforms:fn([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ce.linedashed_vert,fragmentShader:ce.linedashed_frag},depth:{uniforms:fn([Nt.common,Nt.displacementmap]),vertexShader:ce.depth_vert,fragmentShader:ce.depth_frag},normal:{uniforms:fn([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:ce.meshnormal_vert,fragmentShader:ce.meshnormal_frag},sprite:{uniforms:fn([Nt.sprite,Nt.fog]),vertexShader:ce.sprite_vert,fragmentShader:ce.sprite_frag},background:{uniforms:{uvTransform:{value:new ue},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ce.background_vert,fragmentShader:ce.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ue}},vertexShader:ce.backgroundCube_vert,fragmentShader:ce.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ce.cube_vert,fragmentShader:ce.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ce.equirect_vert,fragmentShader:ce.equirect_frag},distanceRGBA:{uniforms:fn([Nt.common,Nt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ce.distanceRGBA_vert,fragmentShader:ce.distanceRGBA_frag},shadow:{uniforms:fn([Nt.lights,Nt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:ce.shadow_vert,fragmentShader:ce.shadow_frag}};ai.physical={uniforms:fn([ai.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ue},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ue},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ue},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ue},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ue},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ue},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ue},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ue},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ue},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ue},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ue},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ue}}]),vertexShader:ce.meshphysical_vert,fragmentShader:ce.meshphysical_frag};const ma={r:0,b:0,g:0},fr=new ti,Ey=new Ce;function Ty(i,t,e,n,s,o,l){const c=new Kt(0);let u=o===!0?0:1,h,f,p=null,g=0,m=null;function y(_,v){let S=!1,w=v.isScene===!0?v.background:null;w&&w.isTexture&&(w=(v.backgroundBlurriness>0?e:t).get(w)),w===null?x(c,u):w&&w.isColor&&(x(w,1),S=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,l):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),w&&(w.isCubeTexture||w.mapping===Ja)?(f===void 0&&(f=new Ie(new pn(1,1,1),new tr({name:"BackgroundCubeMaterial",uniforms:Ts(ai.backgroundCube.uniforms),vertexShader:ai.backgroundCube.vertexShader,fragmentShader:ai.backgroundCube.fragmentShader,side:Tn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(k,O,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),fr.copy(v.backgroundRotation),fr.x*=-1,fr.y*=-1,fr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(fr.y*=-1,fr.z*=-1),f.material.uniforms.envMap.value=w,f.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Ey.makeRotationFromEuler(fr)),f.material.toneMapped=xe.getTransfer(w.colorSpace)!==Ee,(p!==w||g!==w.version||m!==i.toneMapping)&&(f.material.needsUpdate=!0,p=w,g=w.version,m=i.toneMapping),f.layers.enableAll(),_.unshift(f,f.geometry,f.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new Ie(new Ao(2,2),new tr({name:"BackgroundMaterial",uniforms:Ts(ai.background.uniforms),vertexShader:ai.background.vertexShader,fragmentShader:ai.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=xe.getTransfer(w.colorSpace)!==Ee,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(p!==w||g!==w.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,p=w,g=w.version,m=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null))}function x(_,v){_.getRGB(ma,qf(i)),n.buffers.color.setClear(ma.r,ma.g,ma.b,v,l)}return{getClearColor:function(){return c},setClearColor:function(_,v=1){c.set(_),u=v,x(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(_){u=_,x(c,u)},render:y}}function Ay(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=g(null);let o=s,l=!1;function c(R,G,U,F,E){let Z=!1;const ot=p(F,U,G);o!==ot&&(o=ot,h(o.object)),Z=m(R,F,U,E),Z&&y(R,F,U,E),E!==null&&t.update(E,i.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,T(R,G,U,F),E!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(E).buffer))}function u(){return i.createVertexArray()}function h(R){return i.bindVertexArray(R)}function f(R){return i.deleteVertexArray(R)}function p(R,G,U){const F=U.wireframe===!0;let E=n[R.id];E===void 0&&(E={},n[R.id]=E);let Z=E[G.id];Z===void 0&&(Z={},E[G.id]=Z);let ot=Z[F];return ot===void 0&&(ot=g(u()),Z[F]=ot),ot}function g(R){const G=[],U=[],F=[];for(let E=0;E<e;E++)G[E]=0,U[E]=0,F[E]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:G,enabledAttributes:U,attributeDivisors:F,object:R,attributes:{},index:null}}function m(R,G,U,F){const E=o.attributes,Z=G.attributes;let ot=0;const rt=U.getAttributes();for(const W in rt)if(rt[W].location>=0){const et=E[W];let q=Z[W];if(q===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),et===void 0||et.attribute!==q||q&&et.data!==q.data)return!0;ot++}return o.attributesNum!==ot||o.index!==F}function y(R,G,U,F){const E={},Z=G.attributes;let ot=0;const rt=U.getAttributes();for(const W in rt)if(rt[W].location>=0){let et=Z[W];et===void 0&&(W==="instanceMatrix"&&R.instanceMatrix&&(et=R.instanceMatrix),W==="instanceColor"&&R.instanceColor&&(et=R.instanceColor));const q={};q.attribute=et,et&&et.data&&(q.data=et.data),E[W]=q,ot++}o.attributes=E,o.attributesNum=ot,o.index=F}function x(){const R=o.newAttributes;for(let G=0,U=R.length;G<U;G++)R[G]=0}function _(R){v(R,0)}function v(R,G){const U=o.newAttributes,F=o.enabledAttributes,E=o.attributeDivisors;U[R]=1,F[R]===0&&(i.enableVertexAttribArray(R),F[R]=1),E[R]!==G&&(i.vertexAttribDivisor(R,G),E[R]=G)}function S(){const R=o.newAttributes,G=o.enabledAttributes;for(let U=0,F=G.length;U<F;U++)G[U]!==R[U]&&(i.disableVertexAttribArray(U),G[U]=0)}function w(R,G,U,F,E,Z,ot){ot===!0?i.vertexAttribIPointer(R,G,U,E,Z):i.vertexAttribPointer(R,G,U,F,E,Z)}function T(R,G,U,F){x();const E=F.attributes,Z=U.getAttributes(),ot=G.defaultAttributeValues;for(const rt in Z){const W=Z[rt];if(W.location>=0){let it=E[rt];if(it===void 0&&(rt==="instanceMatrix"&&R.instanceMatrix&&(it=R.instanceMatrix),rt==="instanceColor"&&R.instanceColor&&(it=R.instanceColor)),it!==void 0){const et=it.normalized,q=it.itemSize,Y=t.get(it);if(Y===void 0)continue;const At=Y.buffer,tt=Y.type,st=Y.bytesPerElement,wt=tt===i.INT||tt===i.UNSIGNED_INT||it.gpuType===If;if(it.isInterleavedBufferAttribute){const St=it.data,Pt=St.stride,It=it.offset;if(St.isInstancedInterleavedBuffer){for(let Ut=0;Ut<W.locationSize;Ut++)v(W.location+Ut,St.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Ut=0;Ut<W.locationSize;Ut++)_(W.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,At);for(let Ut=0;Ut<W.locationSize;Ut++)w(W.location+Ut,q/W.locationSize,tt,et,Pt*st,(It+q/W.locationSize*Ut)*st,wt)}else{if(it.isInstancedBufferAttribute){for(let St=0;St<W.locationSize;St++)v(W.location+St,it.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let St=0;St<W.locationSize;St++)_(W.location+St);i.bindBuffer(i.ARRAY_BUFFER,At);for(let St=0;St<W.locationSize;St++)w(W.location+St,q/W.locationSize,tt,et,q*st,q/W.locationSize*St*st,wt)}}else if(ot!==void 0){const et=ot[rt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(W.location,et);break;case 3:i.vertexAttrib3fv(W.location,et);break;case 4:i.vertexAttrib4fv(W.location,et);break;default:i.vertexAttrib1fv(W.location,et)}}}}S()}function k(){z();for(const R in n){const G=n[R];for(const U in G){const F=G[U];for(const E in F)f(F[E].object),delete F[E];delete G[U]}delete n[R]}}function O(R){if(n[R.id]===void 0)return;const G=n[R.id];for(const U in G){const F=G[U];for(const E in F)f(F[E].object),delete F[E];delete G[U]}delete n[R.id]}function D(R){for(const G in n){const U=n[G];if(U[R.id]===void 0)continue;const F=U[R.id];for(const E in F)f(F[E].object),delete F[E];delete U[R.id]}}function z(){I(),l=!0,o!==s&&(o=s,h(o.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:z,resetDefaultState:I,dispose:k,releaseStatesOfGeometry:O,releaseStatesOfProgram:D,initAttributes:x,enableAttribute:_,disableUnusedAttributes:S}}function Ly(i,t,e){let n;function s(u){n=u}function o(u,h){i.drawArrays(n,u,h),e.update(h,n,1)}function l(u,h,f){f!==0&&(i.drawArraysInstanced(n,u,h,f),e.update(h,n,f))}function c(u,h,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<f;g++)this.render(u[g],h[g]);else{p.multiDrawArraysWEBGL(n,u,0,h,0,f);let g=0;for(let m=0;m<f;m++)g+=h[m];e.update(g,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Cy(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),y=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:v,maxSamples:S}}function Py(i){const t=this;let e=null,n=0,s=!1,o=!1;const l=new Fn,c=new ue,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,g){const m=p.length!==0||g||n!==0||s;return s=g,n=p.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,g){e=f(p,g,0)},this.setState=function(p,g,m){const y=p.clippingPlanes,x=p.clipIntersection,_=p.clipShadows,v=i.get(p);if(!s||y===null||y.length===0||o&&!_)o?f(null):h();else{const S=o?0:n,w=S*4;let T=v.clippingState||null;u.value=T,T=f(y,g,w,m);for(let k=0;k!==w;++k)T[k]=e[k];v.clippingState=T,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function h(){u.value!==e&&(u.value=e,u.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,g,m,y){const x=p!==null?p.length:0;let _=null;if(x!==0){if(_=u.value,y!==!0||_===null){const v=m+x*4,S=g.matrixWorldInverse;c.getNormalMatrix(S),(_===null||_.length<v)&&(_=new Float32Array(v));for(let w=0,T=m;w!==x;++w,T+=4)l.copy(p[w]).applyMatrix4(S,c),l.normal.toArray(_,T),_[T+3]=l.constant}u.value=_,u.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,_}}function Ry(i){let t=new WeakMap;function e(l,c){return c===Cc?l.mapping=Ms:c===Pc&&(l.mapping=Ss),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===Cc||c===Pc)if(t.has(l)){const u=t.get(l).texture;return e(u,l.mapping)}else{const u=l.image;if(u&&u.height>0){const h=new H_(u.height);return h.fromEquirectangularTexture(i,l),t.set(l,h),l.addEventListener("dispose",s),e(h.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Kf extends jf{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,u=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=h*this.view.offsetX,l=o+h*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ds=4,_d=[.125,.215,.35,.446,.526,.582],vr=20,ic=new Kf,vd=new Kt;let rc=null,sc=0,oc=0,ac=!1;const mr=(1+Math.sqrt(5))/2,is=1/mr,yd=[new J(1,1,1),new J(-1,1,1),new J(1,1,-1),new J(-1,1,-1),new J(0,mr,is),new J(0,mr,-is),new J(is,0,mr),new J(-is,0,mr),new J(mr,is,0),new J(-mr,is,0)];class xd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){rc=this._renderer.getRenderTarget(),sc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(rc,sc,oc),this._renderer.xr.enabled=ac,t.scissorTest=!1,ga(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),rc=this._renderer.getRenderTarget(),sc=this._renderer.getActiveCubeFace(),oc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$n,minFilter:$n,generateMipmaps:!1,type:Ia,format:ci,colorSpace:er,depthBuffer:!1},s=bd(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bd(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Iy(o)),this._blurMaterial=Dy(o,t,e)}return s}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,ic)}_sceneToCubeUV(t,e,n,s){const c=new Rn(90,1,e,n),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,g=f.toneMapping;f.getClearColor(vd),f.toneMapping=Yi,f.autoClear=!1;const m=new Wf({name:"PMREM.Background",side:Tn,depthWrite:!1,depthTest:!1}),y=new Ie(new pn,m);let x=!1;const _=t.background;_?_.isColor&&(m.color.copy(_),t.background=null,x=!0):(m.color.copy(vd),x=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(c.up.set(0,u[v],0),c.lookAt(h[v],0,0)):S===1?(c.up.set(0,0,u[v]),c.lookAt(0,h[v],0)):(c.up.set(0,u[v],0),c.lookAt(0,0,h[v]));const w=this._cubeSize;ga(s,S*w,v>2?w:0,w,w),f.setRenderTarget(s),x&&f.render(y,c),f.render(t,c)}y.geometry.dispose(),y.material.dispose(),f.toneMapping=g,f.autoClear=p,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ms||t.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Md()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wd());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new Ie(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const u=this._cubeSize;ga(e,0,0,3*u,2*u),n.setRenderTarget(e),n.render(l,ic)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=yd[(s-1)%yd.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const u=this._renderer,h=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new Ie(this._lodPlanes[s],h),g=h.uniforms,m=this._sizeLods[n]-1,y=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*vr-1),x=o/y,_=isFinite(o)?1+Math.floor(f*x):vr;_>vr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${vr}`);const v=[];let S=0;for(let D=0;D<vr;++D){const z=D/x,I=Math.exp(-z*z/2);v.push(I),D===0?S+=I:D<_&&(S+=2*I)}for(let D=0;D<v.length;D++)v[D]=v[D]/S;g.envMap.value=t.texture,g.samples.value=_,g.weights.value=v,g.latitudinal.value=l==="latitudinal",c&&(g.poleAxis.value=c);const{_lodMax:w}=this;g.dTheta.value=y,g.mipInt.value=w-n;const T=this._sizeLods[s],k=3*T*(s>w-ds?s-w+ds:0),O=4*(this._cubeSize-T);ga(e,k,O,3*T,2*T),u.setRenderTarget(e),u.render(p,ic)}}function Iy(i){const t=[],e=[],n=[];let s=i;const o=i-ds+1+_d.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let u=1/c;l>i-ds?u=_d[l-i+ds-1]:l===0&&(u=0),n.push(u);const h=1/(c-2),f=-h,p=1+h,g=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,y=6,x=3,_=2,v=1,S=new Float32Array(x*y*m),w=new Float32Array(_*y*m),T=new Float32Array(v*y*m);for(let O=0;O<m;O++){const D=O%3*2/3-1,z=O>2?0:-1,I=[D,z,0,D+2/3,z,0,D+2/3,z+1,0,D,z,0,D+2/3,z+1,0,D,z+1,0];S.set(I,x*y*O),w.set(g,_*y*O);const R=[O,O,O,O,O,O];T.set(R,v*y*O)}const k=new Oe;k.setAttribute("position",new kn(S,x)),k.setAttribute("uv",new kn(w,_)),k.setAttribute("faceIndex",new kn(T,v)),t.push(k),s>ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bd(i,t,e){const n=new Tr(i,t,e);return n.texture.mapping=Ja,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ga(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Dy(i,t,e){const n=new Float32Array(vr),s=new J(0,1,0);return new tr({name:"SphericalGaussianBlur",defines:{n:vr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:iu(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function wd(){return new tr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:iu(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Md(){return new tr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function iu(){return`

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
	`}function ky(i){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const u=c.mapping,h=u===Cc||u===Pc,f=u===Ms||u===Ss;if(h||f){let p=t.get(c);const g=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==g)return e===null&&(e=new xd(i)),p=h?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const m=c.image;return h&&m&&m.height>0||f&&m&&s(m)?(e===null&&(e=new xd(i)),p=h?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function s(c){let u=0;const h=6;for(let f=0;f<h;f++)c[f]!==void 0&&u++;return u===h}function o(c){const u=c.target;u.removeEventListener("dispose",o);const h=t.get(u);h!==void 0&&(t.delete(u),h.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function Ny(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Oy(i,t,e,n){const s={},o=new WeakMap;function l(p){const g=p.target;g.index!==null&&t.remove(g.index);for(const y in g.attributes)t.remove(g.attributes[y]);for(const y in g.morphAttributes){const x=g.morphAttributes[y];for(let _=0,v=x.length;_<v;_++)t.remove(x[_])}g.removeEventListener("dispose",l),delete s[g.id];const m=o.get(g);m&&(t.remove(m),o.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(p,g){return s[g.id]===!0||(g.addEventListener("dispose",l),s[g.id]=!0,e.memory.geometries++),g}function u(p){const g=p.attributes;for(const y in g)t.update(g[y],i.ARRAY_BUFFER);const m=p.morphAttributes;for(const y in m){const x=m[y];for(let _=0,v=x.length;_<v;_++)t.update(x[_],i.ARRAY_BUFFER)}}function h(p){const g=[],m=p.index,y=p.attributes.position;let x=0;if(m!==null){const S=m.array;x=m.version;for(let w=0,T=S.length;w<T;w+=3){const k=S[w+0],O=S[w+1],D=S[w+2];g.push(k,O,O,D,D,k)}}else if(y!==void 0){const S=y.array;x=y.version;for(let w=0,T=S.length/3-1;w<T;w+=3){const k=w+0,O=w+1,D=w+2;g.push(k,O,O,D,D,k)}}else return;const _=new(Ff(g)?Xf:Zf)(g,1);_.version=x;const v=o.get(p);v&&t.remove(v),o.set(p,_)}function f(p){const g=o.get(p);if(g){const m=p.index;m!==null&&g.version<m.version&&h(p)}else h(p);return o.get(p)}return{get:c,update:u,getWireframeAttribute:f}}function Uy(i,t,e){let n;function s(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,g){i.drawElements(n,g,o,p*l),e.update(g,n,1)}function h(p,g,m){m!==0&&(i.drawElementsInstanced(n,g,o,p*l,m),e.update(g,n,m))}function f(p,g,m){if(m===0)return;const y=t.get("WEBGL_multi_draw");if(y===null)for(let x=0;x<m;x++)this.render(p[x]/l,g[x]);else{y.multiDrawElementsWEBGL(n,g,0,o,p,0,m);let x=0;for(let _=0;_<m;_++)x+=g[_];e.update(x,n,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function zy(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case i.TRIANGLES:e.triangles+=c*(o/3);break;case i.LINES:e.lines+=c*(o/2);break;case i.LINE_STRIP:e.lines+=c*(o-1);break;case i.LINE_LOOP:e.lines+=c*o;break;case i.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function By(i,t,e){const n=new WeakMap,s=new Qe;function o(l,c,u){const h=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let g=n.get(c);if(g===void 0||g.count!==p){let I=function(){D.dispose(),n.delete(c),c.removeEventListener("dispose",I)};g!==void 0&&g.texture.dispose();const m=c.morphAttributes.position!==void 0,y=c.morphAttributes.normal!==void 0,x=c.morphAttributes.color!==void 0,_=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let w=0;m===!0&&(w=1),y===!0&&(w=2),x===!0&&(w=3);let T=c.attributes.position.count*w,k=1;T>t.maxTextureSize&&(k=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const O=new Float32Array(T*k*4*p),D=new Vf(O,T,k,p);D.type=qi,D.needsUpdate=!0;const z=w*4;for(let R=0;R<p;R++){const G=_[R],U=v[R],F=S[R],E=T*k*4*R;for(let Z=0;Z<G.count;Z++){const ot=Z*z;m===!0&&(s.fromBufferAttribute(G,Z),O[E+ot+0]=s.x,O[E+ot+1]=s.y,O[E+ot+2]=s.z,O[E+ot+3]=0),y===!0&&(s.fromBufferAttribute(U,Z),O[E+ot+4]=s.x,O[E+ot+5]=s.y,O[E+ot+6]=s.z,O[E+ot+7]=0),x===!0&&(s.fromBufferAttribute(F,Z),O[E+ot+8]=s.x,O[E+ot+9]=s.y,O[E+ot+10]=s.z,O[E+ot+11]=F.itemSize===4?s.w:1)}}g={count:p,texture:D,size:new vt(T,k)},n.set(c,g),c.addEventListener("dispose",I)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",l.morphTexture,e);else{let m=0;for(let x=0;x<h.length;x++)m+=h[x];const y=c.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",y),u.getUniforms().setValue(i,"morphTargetInfluences",h)}u.getUniforms().setValue(i,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}return{update:o}}function Fy(i,t,e,n){let s=new WeakMap;function o(u){const h=n.render.frame,f=u.geometry,p=t.get(u,f);if(s.get(p)!==h&&(t.update(p),s.set(p,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),s.get(u)!==h&&(e.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,i.ARRAY_BUFFER),s.set(u,h))),u.isSkinnedMesh){const g=u.skeleton;s.get(g)!==h&&(g.update(),s.set(g,h))}return p}function l(){s=new WeakMap}function c(u){const h=u.target;h.removeEventListener("dispose",c),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:l}}class Jf extends gn{constructor(t,e,n,s,o,l,c,u,h,f){if(f=f!==void 0?f:_s,f!==_s&&f!==mo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===_s&&(n=Es),n===void 0&&f===mo&&(n=Eo),super(null,s,o,l,c,u,f,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Hn,this.minFilter=u!==void 0?u:Hn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Qf=new gn,tp=new Jf(1,1);tp.compareFunction=Bf;const ep=new Vf,np=new E_,ip=new $f,Sd=[],Ed=[],Td=new Float32Array(16),Ad=new Float32Array(9),Ld=new Float32Array(4);function Ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let o=Sd[s];if(o===void 0&&(o=new Float32Array(s),Sd[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,i[l].toArray(o,c)}return o}function Ze(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function nl(i,t){let e=Ed[t];e===void 0&&(e=new Int32Array(t),Ed[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2fv(this.addr,t),Xe(e,t)}}function Gy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ze(e,t))return;i.uniform3fv(this.addr,t),Xe(e,t)}}function Wy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4fv(this.addr,t),Xe(e,t)}}function Zy(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Xe(e,t)}else{if(Ze(e,n))return;Ld.set(n),i.uniformMatrix2fv(this.addr,!1,Ld),Xe(e,n)}}function Xy(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Xe(e,t)}else{if(Ze(e,n))return;Ad.set(n),i.uniformMatrix3fv(this.addr,!1,Ad),Xe(e,n)}}function qy(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ze(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Xe(e,t)}else{if(Ze(e,n))return;Td.set(n),i.uniformMatrix4fv(this.addr,!1,Td),Xe(e,n)}}function jy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function $y(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2iv(this.addr,t),Xe(e,t)}}function Yy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;i.uniform3iv(this.addr,t),Xe(e,t)}}function Ky(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4iv(this.addr,t),Xe(e,t)}}function Jy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ze(e,t))return;i.uniform2uiv(this.addr,t),Xe(e,t)}}function tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ze(e,t))return;i.uniform3uiv(this.addr,t),Xe(e,t)}}function ex(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ze(e,t))return;i.uniform4uiv(this.addr,t),Xe(e,t)}}function nx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const o=this.type===i.SAMPLER_2D_SHADOW?tp:Qf;e.setTexture2D(t||o,s)}function ix(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||np,s)}function rx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ip,s)}function sx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ep,s)}function ox(i){switch(i){case 5126:return Hy;case 35664:return Vy;case 35665:return Gy;case 35666:return Wy;case 35674:return Zy;case 35675:return Xy;case 35676:return qy;case 5124:case 35670:return jy;case 35667:case 35671:return $y;case 35668:case 35672:return Yy;case 35669:case 35673:return Ky;case 5125:return Jy;case 36294:return Qy;case 36295:return tx;case 36296:return ex;case 35678:case 36198:case 36298:case 36306:case 35682:return nx;case 35679:case 36299:case 36307:return ix;case 35680:case 36300:case 36308:case 36293:return rx;case 36289:case 36303:case 36311:case 36292:return sx}}function ax(i,t){i.uniform1fv(this.addr,t)}function lx(i,t){const e=Ps(t,this.size,2);i.uniform2fv(this.addr,e)}function cx(i,t){const e=Ps(t,this.size,3);i.uniform3fv(this.addr,e)}function ux(i,t){const e=Ps(t,this.size,4);i.uniform4fv(this.addr,e)}function hx(i,t){const e=Ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function dx(i,t){const e=Ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function fx(i,t){const e=Ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function px(i,t){i.uniform1iv(this.addr,t)}function mx(i,t){i.uniform2iv(this.addr,t)}function gx(i,t){i.uniform3iv(this.addr,t)}function _x(i,t){i.uniform4iv(this.addr,t)}function vx(i,t){i.uniform1uiv(this.addr,t)}function yx(i,t){i.uniform2uiv(this.addr,t)}function xx(i,t){i.uniform3uiv(this.addr,t)}function bx(i,t){i.uniform4uiv(this.addr,t)}function wx(i,t,e){const n=this.cache,s=t.length,o=nl(e,s);Ze(n,o)||(i.uniform1iv(this.addr,o),Xe(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||Qf,o[l])}function Mx(i,t,e){const n=this.cache,s=t.length,o=nl(e,s);Ze(n,o)||(i.uniform1iv(this.addr,o),Xe(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||np,o[l])}function Sx(i,t,e){const n=this.cache,s=t.length,o=nl(e,s);Ze(n,o)||(i.uniform1iv(this.addr,o),Xe(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||ip,o[l])}function Ex(i,t,e){const n=this.cache,s=t.length,o=nl(e,s);Ze(n,o)||(i.uniform1iv(this.addr,o),Xe(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||ep,o[l])}function Tx(i){switch(i){case 5126:return ax;case 35664:return lx;case 35665:return cx;case 35666:return ux;case 35674:return hx;case 35675:return dx;case 35676:return fx;case 5124:case 35670:return px;case 35667:case 35671:return mx;case 35668:case 35672:return gx;case 35669:case 35673:return _x;case 5125:return vx;case 36294:return yx;case 36295:return xx;case 36296:return bx;case 35678:case 36198:case 36298:case 36306:case 35682:return wx;case 35679:case 36299:case 36307:return Mx;case 35680:case 36300:case 36308:case 36293:return Sx;case 36289:case 36303:case 36311:case 36292:return Ex}}class Ax{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ox(e.type)}}class Lx{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Tx(e.type)}}class Cx{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const lc=/(\w+)(\])?(\[|\.)?/g;function Cd(i,t){i.seq.push(t),i.map[t.id]=t}function Px(i,t,e){const n=i.name,s=n.length;for(lc.lastIndex=0;;){const o=lc.exec(n),l=lc.lastIndex;let c=o[1];const u=o[2]==="]",h=o[3];if(u&&(c=c|0),h===void 0||h==="["&&l+2===s){Cd(e,h===void 0?new Ax(c,i,t):new Lx(c,i,t));break}else{let p=e.map[c];p===void 0&&(p=new Cx(c),Cd(e,p)),e=p}}}class La{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);Px(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],u=n[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function Pd(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Rx=37297;let Ix=0;function Dx(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function kx(i){const t=xe.getPrimaries(xe.workingColorSpace),e=xe.getPrimaries(i);let n;switch(t===e?n="":t===Na&&e===ka?n="LinearDisplayP3ToLinearSRGB":t===ka&&e===Na&&(n="LinearSRGBToLinearDisplayP3"),i){case er:case Qa:return[n,"LinearTransferOETF"];case oi:case tu:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Rd(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Dx(i.getShaderSource(t),l)}else return s}function Nx(i,t){const e=kx(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ox(i,t){let e;switch(t){case Cf:e="Linear";break;case Gg:e="Reinhard";break;case Wg:e="OptimizedCineon";break;case Zg:e="ACESFilmic";break;case qg:e="AgX";break;case jg:e="Neutral";break;case Xg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Ux(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(so).join(`
`)}function zx(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Bx(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(t,s),l=o.name;let c=1;o.type===i.FLOAT_MAT2&&(c=2),o.type===i.FLOAT_MAT3&&(c=3),o.type===i.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:i.getAttribLocation(t,l),locationSize:c}}return e}function so(i){return i!==""}function Id(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dd(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Fx=/^[ \t]*#include +<([\w\d./]+)>/gm;function kc(i){return i.replace(Fx,Vx)}const Hx=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Vx(i,t){let e=ce[t];if(e===void 0){const n=Hx.get(t);if(n!==void 0)e=ce[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return kc(e)}const Gx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kd(i){return i.replace(Gx,Wx)}function Wx(i,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Nd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Zx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Lf?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===mg?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ti&&(t="SHADOWMAP_TYPE_VSM"),t}function Xx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ms:case Ss:t="ENVMAP_TYPE_CUBE";break;case Ja:t="ENVMAP_TYPE_CUBE_UV";break}return t}function qx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ss:t="ENVMAP_MODE_REFRACTION";break}return t}function jx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Jc:t="ENVMAP_BLENDING_MULTIPLY";break;case Hg:t="ENVMAP_BLENDING_MIX";break;case Vg:t="ENVMAP_BLENDING_ADD";break}return t}function $x(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Yx(i,t,e,n){const s=i.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const u=Zx(e),h=Xx(e),f=qx(e),p=jx(e),g=$x(e),m=Ux(e),y=zx(o),x=s.createProgram();let _,v,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(so).join(`
`),_.length>0&&(_+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(so).join(`
`),v.length>0&&(v+=`
`)):(_=[Nd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(so).join(`
`),v=[Nd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",g?"#define CUBEUV_TEXEL_WIDTH "+g.texelWidth:"",g?"#define CUBEUV_TEXEL_HEIGHT "+g.texelHeight:"",g?"#define CUBEUV_MAX_MIP "+g.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Yi?"#define TONE_MAPPING":"",e.toneMapping!==Yi?ce.tonemapping_pars_fragment:"",e.toneMapping!==Yi?Ox("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ce.colorspace_pars_fragment,Nx("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(so).join(`
`)),l=kc(l),l=Id(l,e),l=Dd(l,e),c=kc(c),c=Id(c,e),c=Dd(c,e),l=kd(l),c=kd(c),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,_=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,v=["#define varying in",e.glslVersion===Kh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const w=S+_+l,T=S+v+c,k=Pd(s,s.VERTEX_SHADER,w),O=Pd(s,s.FRAGMENT_SHADER,T);s.attachShader(x,k),s.attachShader(x,O),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function D(G){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(x).trim(),F=s.getShaderInfoLog(k).trim(),E=s.getShaderInfoLog(O).trim();let Z=!0,ot=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,k,O);else{const rt=Rd(s,k,"vertex"),W=Rd(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+U+`
`+rt+`
`+W)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(F===""||E==="")&&(ot=!1);ot&&(G.diagnostics={runnable:Z,programLog:U,vertexShader:{log:F,prefix:_},fragmentShader:{log:E,prefix:v}})}s.deleteShader(k),s.deleteShader(O),z=new La(s,x),I=Bx(s,x)}let z;this.getUniforms=function(){return z===void 0&&D(this),z};let I;this.getAttributes=function(){return I===void 0&&D(this),I};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(x,Rx)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ix++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=k,this.fragmentShader=O,this}let Kx=0;class Jx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Qx(t),e.set(t,n)),n}}class Qx{constructor(t){this.id=Kx++,this.code=t,this.usedTimes=0}}function tb(i,t,e,n,s,o,l){const c=new eu,u=new Jx,h=new Set,f=[],p=s.logarithmicDepthBuffer,g=s.vertexTextures;let m=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(I){return h.add(I),I===0?"uv":`uv${I}`}function _(I,R,G,U,F){const E=U.fog,Z=F.geometry,ot=I.isMeshStandardMaterial?U.environment:null,rt=(I.isMeshStandardMaterial?e:t).get(I.envMap||ot),W=rt&&rt.mapping===Ja?rt.image.height:null,it=y[I.type];I.precision!==null&&(m=s.getMaxPrecision(I.precision),m!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",m,"instead."));const et=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,q=et!==void 0?et.length:0;let Y=0;Z.morphAttributes.position!==void 0&&(Y=1),Z.morphAttributes.normal!==void 0&&(Y=2),Z.morphAttributes.color!==void 0&&(Y=3);let At,tt,st,wt;if(it){const Fe=ai[it];At=Fe.vertexShader,tt=Fe.fragmentShader}else At=I.vertexShader,tt=I.fragmentShader,u.update(I),st=u.getVertexShaderID(I),wt=u.getFragmentShaderID(I);const St=i.getRenderTarget(),Pt=F.isInstancedMesh===!0,It=F.isBatchedMesh===!0,Ut=!!I.map,at=!!I.matcap,xt=!!rt,bt=!!I.aoMap,A=!!I.lightMap,nt=!!I.bumpMap,K=!!I.normalMap,P=!!I.displacementMap,M=!!I.emissiveMap,H=!!I.metalnessMap,j=!!I.roughnessMap,Q=I.anisotropy>0,X=I.clearcoat>0,ft=I.iridescence>0,lt=I.sheen>0,pt=I.transmission>0,Tt=Q&&!!I.anisotropyMap,Et=X&&!!I.clearcoatMap,Lt=X&&!!I.clearcoatNormalMap,Ht=X&&!!I.clearcoatRoughnessMap,zt=ft&&!!I.iridescenceMap,Dt=ft&&!!I.iridescenceThicknessMap,Qt=lt&&!!I.sheenColorMap,Vt=lt&&!!I.sheenRoughnessMap,ae=!!I.specularMap,le=!!I.specularColorMap,ee=!!I.specularIntensityMap,Ft=pt&&!!I.transmissionMap,N=pt&&!!I.thicknessMap,ht=!!I.gradientMap,Mt=!!I.alphaMap,Rt=I.alphaTest>0,kt=!!I.alphaHash,se=!!I.extensions;let he=Yi;I.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(he=i.toneMapping);const be={shaderID:it,shaderType:I.type,shaderName:I.name,vertexShader:At,fragmentShader:tt,defines:I.defines,customVertexShaderID:st,customFragmentShaderID:wt,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:m,batching:It,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:g,outputColorSpace:St===null?i.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:er,alphaToCoverage:!!I.alphaToCoverage,map:Ut,matcap:at,envMap:xt,envMapMode:xt&&rt.mapping,envMapCubeUVHeight:W,aoMap:bt,lightMap:A,bumpMap:nt,normalMap:K,displacementMap:g&&P,emissiveMap:M,normalMapObjectSpace:K&&I.normalMapType===l_,normalMapTangentSpace:K&&I.normalMapType===Qc,metalnessMap:H,roughnessMap:j,anisotropy:Q,anisotropyMap:Tt,clearcoat:X,clearcoatMap:Et,clearcoatNormalMap:Lt,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:zt,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Qt,sheenRoughnessMap:Vt,specularMap:ae,specularColorMap:le,specularIntensityMap:ee,transmission:pt,transmissionMap:Ft,thicknessMap:N,gradientMap:ht,opaque:I.transparent===!1&&I.blending===gs&&I.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Rt,alphaHash:kt,combine:I.combine,mapUv:Ut&&x(I.map.channel),aoMapUv:bt&&x(I.aoMap.channel),lightMapUv:A&&x(I.lightMap.channel),bumpMapUv:nt&&x(I.bumpMap.channel),normalMapUv:K&&x(I.normalMap.channel),displacementMapUv:P&&x(I.displacementMap.channel),emissiveMapUv:M&&x(I.emissiveMap.channel),metalnessMapUv:H&&x(I.metalnessMap.channel),roughnessMapUv:j&&x(I.roughnessMap.channel),anisotropyMapUv:Tt&&x(I.anisotropyMap.channel),clearcoatMapUv:Et&&x(I.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&x(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&x(I.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&x(I.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&x(I.iridescenceThicknessMap.channel),sheenColorMapUv:Qt&&x(I.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&x(I.sheenRoughnessMap.channel),specularMapUv:ae&&x(I.specularMap.channel),specularColorMapUv:le&&x(I.specularColorMap.channel),specularIntensityMapUv:ee&&x(I.specularIntensityMap.channel),transmissionMapUv:Ft&&x(I.transmissionMap.channel),thicknessMapUv:N&&x(I.thicknessMap.channel),alphaMapUv:Mt&&x(I.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(K||Q),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(Ut||Mt),fog:!!E,useFog:I.fog===!0,fogExp2:!!E&&E.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:Y,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:I.dithering,shadowMapEnabled:i.shadowMap.enabled&&G.length>0,shadowMapType:i.shadowMap.type,toneMapping:he,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ut&&I.map.isVideoTexture===!0&&xe.getTransfer(I.map.colorSpace)===Ee,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===ln,flipSided:I.side===Tn,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:se&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:se&&I.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return be.vertexUv1s=h.has(1),be.vertexUv2s=h.has(2),be.vertexUv3s=h.has(3),h.clear(),be}function v(I){const R=[];if(I.shaderID?R.push(I.shaderID):(R.push(I.customVertexShaderID),R.push(I.customFragmentShaderID)),I.defines!==void 0)for(const G in I.defines)R.push(G),R.push(I.defines[G]);return I.isRawShaderMaterial===!1&&(S(R,I),w(R,I),R.push(i.outputColorSpace)),R.push(I.customProgramCacheKey),R.join()}function S(I,R){I.push(R.precision),I.push(R.outputColorSpace),I.push(R.envMapMode),I.push(R.envMapCubeUVHeight),I.push(R.mapUv),I.push(R.alphaMapUv),I.push(R.lightMapUv),I.push(R.aoMapUv),I.push(R.bumpMapUv),I.push(R.normalMapUv),I.push(R.displacementMapUv),I.push(R.emissiveMapUv),I.push(R.metalnessMapUv),I.push(R.roughnessMapUv),I.push(R.anisotropyMapUv),I.push(R.clearcoatMapUv),I.push(R.clearcoatNormalMapUv),I.push(R.clearcoatRoughnessMapUv),I.push(R.iridescenceMapUv),I.push(R.iridescenceThicknessMapUv),I.push(R.sheenColorMapUv),I.push(R.sheenRoughnessMapUv),I.push(R.specularMapUv),I.push(R.specularColorMapUv),I.push(R.specularIntensityMapUv),I.push(R.transmissionMapUv),I.push(R.thicknessMapUv),I.push(R.combine),I.push(R.fogExp2),I.push(R.sizeAttenuation),I.push(R.morphTargetsCount),I.push(R.morphAttributeCount),I.push(R.numDirLights),I.push(R.numPointLights),I.push(R.numSpotLights),I.push(R.numSpotLightMaps),I.push(R.numHemiLights),I.push(R.numRectAreaLights),I.push(R.numDirLightShadows),I.push(R.numPointLightShadows),I.push(R.numSpotLightShadows),I.push(R.numSpotLightShadowsWithMaps),I.push(R.numLightProbes),I.push(R.shadowMapType),I.push(R.toneMapping),I.push(R.numClippingPlanes),I.push(R.numClipIntersection),I.push(R.depthPacking)}function w(I,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),I.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.skinning&&c.enable(4),R.morphTargets&&c.enable(5),R.morphNormals&&c.enable(6),R.morphColors&&c.enable(7),R.premultipliedAlpha&&c.enable(8),R.shadowMapEnabled&&c.enable(9),R.useLegacyLights&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.alphaToCoverage&&c.enable(20),I.push(c.mask)}function T(I){const R=y[I.type];let G;if(R){const U=ai[R];G=U_.clone(U.uniforms)}else G=I.uniforms;return G}function k(I,R){let G;for(let U=0,F=f.length;U<F;U++){const E=f[U];if(E.cacheKey===R){G=E,++G.usedTimes;break}}return G===void 0&&(G=new Yx(i,R,I,o),f.push(G)),G}function O(I){if(--I.usedTimes===0){const R=f.indexOf(I);f[R]=f[f.length-1],f.pop(),I.destroy()}}function D(I){u.remove(I)}function z(){u.dispose()}return{getParameters:_,getProgramCacheKey:v,getUniforms:T,acquireProgram:k,releaseProgram:O,releaseShaderCache:D,programs:f,dispose:z}}function eb(){let i=new WeakMap;function t(o){let l=i.get(o);return l===void 0&&(l={},i.set(o,l)),l}function e(o){i.delete(o)}function n(o,l,c){i.get(o)[l]=c}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function nb(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Od(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ud(){const i=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(p,g,m,y,x,_){let v=i[t];return v===void 0?(v={id:p.id,object:p,geometry:g,material:m,groupOrder:y,renderOrder:p.renderOrder,z:x,group:_},i[t]=v):(v.id=p.id,v.object=p,v.geometry=g,v.material=m,v.groupOrder=y,v.renderOrder=p.renderOrder,v.z=x,v.group=_),t++,v}function c(p,g,m,y,x,_){const v=l(p,g,m,y,x,_);m.transmission>0?n.push(v):m.transparent===!0?s.push(v):e.push(v)}function u(p,g,m,y,x,_){const v=l(p,g,m,y,x,_);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function h(p,g){e.length>1&&e.sort(p||nb),n.length>1&&n.sort(g||Od),s.length>1&&s.sort(g||Od)}function f(){for(let p=t,g=i.length;p<g;p++){const m=i[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:u,finish:f,sort:h}}function ib(){let i=new WeakMap;function t(n,s){const o=i.get(n);let l;return o===void 0?(l=new Ud,i.set(n,[l])):s>=o.length?(l=new Ud,o.push(l)):l=o[s],l}function e(){i=new WeakMap}return{get:t,dispose:e}}function rb(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new J,color:new Kt};break;case"SpotLight":e={position:new J,direction:new J,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new J,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new J,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new J,halfWidth:new J,halfHeight:new J};break}return i[t.id]=e,e}}}function sb(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let ob=0;function ab(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function lb(i){const t=new rb,e=sb(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new J);const s=new J,o=new Ce,l=new Ce;function c(h,f){let p=0,g=0,m=0;for(let G=0;G<9;G++)n.probe[G].set(0,0,0);let y=0,x=0,_=0,v=0,S=0,w=0,T=0,k=0,O=0,D=0,z=0;h.sort(ab);const I=f===!0?Math.PI:1;for(let G=0,U=h.length;G<U;G++){const F=h[G],E=F.color,Z=F.intensity,ot=F.distance,rt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)p+=E.r*Z*I,g+=E.g*Z*I,m+=E.b*Z*I;else if(F.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(F.sh.coefficients[W],Z);z++}else if(F.isDirectionalLight){const W=t.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity*I),F.castShadow){const it=F.shadow,et=e.get(F);et.shadowBias=it.bias,et.shadowNormalBias=it.normalBias,et.shadowRadius=it.radius,et.shadowMapSize=it.mapSize,n.directionalShadow[y]=et,n.directionalShadowMap[y]=rt,n.directionalShadowMatrix[y]=F.shadow.matrix,w++}n.directional[y]=W,y++}else if(F.isSpotLight){const W=t.get(F);W.position.setFromMatrixPosition(F.matrixWorld),W.color.copy(E).multiplyScalar(Z*I),W.distance=ot,W.coneCos=Math.cos(F.angle),W.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),W.decay=F.decay,n.spot[_]=W;const it=F.shadow;if(F.map&&(n.spotLightMap[O]=F.map,O++,it.updateMatrices(F),F.castShadow&&D++),n.spotLightMatrix[_]=it.matrix,F.castShadow){const et=e.get(F);et.shadowBias=it.bias,et.shadowNormalBias=it.normalBias,et.shadowRadius=it.radius,et.shadowMapSize=it.mapSize,n.spotShadow[_]=et,n.spotShadowMap[_]=rt,k++}_++}else if(F.isRectAreaLight){const W=t.get(F);W.color.copy(E).multiplyScalar(Z),W.halfWidth.set(F.width*.5,0,0),W.halfHeight.set(0,F.height*.5,0),n.rectArea[v]=W,v++}else if(F.isPointLight){const W=t.get(F);if(W.color.copy(F.color).multiplyScalar(F.intensity*I),W.distance=F.distance,W.decay=F.decay,F.castShadow){const it=F.shadow,et=e.get(F);et.shadowBias=it.bias,et.shadowNormalBias=it.normalBias,et.shadowRadius=it.radius,et.shadowMapSize=it.mapSize,et.shadowCameraNear=it.camera.near,et.shadowCameraFar=it.camera.far,n.pointShadow[x]=et,n.pointShadowMap[x]=rt,n.pointShadowMatrix[x]=F.shadow.matrix,T++}n.point[x]=W,x++}else if(F.isHemisphereLight){const W=t.get(F);W.skyColor.copy(F.color).multiplyScalar(Z*I),W.groundColor.copy(F.groundColor).multiplyScalar(Z*I),n.hemi[S]=W,S++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Nt.LTC_FLOAT_1,n.rectAreaLTC2=Nt.LTC_FLOAT_2):(n.rectAreaLTC1=Nt.LTC_HALF_1,n.rectAreaLTC2=Nt.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=g,n.ambient[2]=m;const R=n.hash;(R.directionalLength!==y||R.pointLength!==x||R.spotLength!==_||R.rectAreaLength!==v||R.hemiLength!==S||R.numDirectionalShadows!==w||R.numPointShadows!==T||R.numSpotShadows!==k||R.numSpotMaps!==O||R.numLightProbes!==z)&&(n.directional.length=y,n.spot.length=_,n.rectArea.length=v,n.point.length=x,n.hemi.length=S,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=k,n.spotShadowMap.length=k,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=k+O-D,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=D,n.numLightProbes=z,R.directionalLength=y,R.pointLength=x,R.spotLength=_,R.rectAreaLength=v,R.hemiLength=S,R.numDirectionalShadows=w,R.numPointShadows=T,R.numSpotShadows=k,R.numSpotMaps=O,R.numLightProbes=z,n.version=ob++)}function u(h,f){let p=0,g=0,m=0,y=0,x=0;const _=f.matrixWorldInverse;for(let v=0,S=h.length;v<S;v++){const w=h[v];if(w.isDirectionalLight){const T=n.directional[p];T.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(_),p++}else if(w.isSpotLight){const T=n.spot[m];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(_),T.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(_),m++}else if(w.isRectAreaLight){const T=n.rectArea[y];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(_),l.identity(),o.copy(w.matrixWorld),o.premultiply(_),l.extractRotation(o),T.halfWidth.set(w.width*.5,0,0),T.halfHeight.set(0,w.height*.5,0),T.halfWidth.applyMatrix4(l),T.halfHeight.applyMatrix4(l),y++}else if(w.isPointLight){const T=n.point[g];T.position.setFromMatrixPosition(w.matrixWorld),T.position.applyMatrix4(_),g++}else if(w.isHemisphereLight){const T=n.hemi[x];T.direction.setFromMatrixPosition(w.matrixWorld),T.direction.transformDirection(_),x++}}}return{setup:c,setupView:u,state:n}}function zd(i){const t=new lb(i),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function u(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l}}function cb(i){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new zd(i),t.set(s,[c])):o>=l.length?(c=new zd(i),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class ub extends Pr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=o_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class hb extends Pr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const db=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fb=`uniform sampler2D shadow_pass;
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
}`;function pb(i,t,e){let n=new nu;const s=new vt,o=new vt,l=new Qe,c=new ub({depthPacking:a_}),u=new hb,h={},f=e.maxTextureSize,p={[Qi]:Tn,[Tn]:Qi,[ln]:ln},g=new tr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:db,fragmentShader:fb}),m=g.clone();m.defines.HORIZONTAL_PASS=1;const y=new Oe;y.setAttribute("position",new kn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Ie(y,g),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lf;let v=this.type;this.render=function(O,D,z){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||O.length===0)return;const I=i.getRenderTarget(),R=i.getActiveCubeFace(),G=i.getActiveMipmapLevel(),U=i.state;U.setBlending($i),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=v!==Ti&&this.type===Ti,E=v===Ti&&this.type!==Ti;for(let Z=0,ot=O.length;Z<ot;Z++){const rt=O[Z],W=rt.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const it=W.getFrameExtents();if(s.multiply(it),o.copy(W.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/it.x),s.x=o.x*it.x,W.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/it.y),s.y=o.y*it.y,W.mapSize.y=o.y)),W.map===null||F===!0||E===!0){const q=this.type!==Ti?{minFilter:Hn,magFilter:Hn}:{};W.map!==null&&W.map.dispose(),W.map=new Tr(s.x,s.y,q),W.map.texture.name=rt.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const et=W.getViewportCount();for(let q=0;q<et;q++){const Y=W.getViewport(q);l.set(o.x*Y.x,o.y*Y.y,o.x*Y.z,o.y*Y.w),U.viewport(l),W.updateMatrices(rt,q),n=W.getFrustum(),T(D,z,W.camera,rt,this.type)}W.isPointLightShadow!==!0&&this.type===Ti&&S(W,z),W.needsUpdate=!1}v=this.type,_.needsUpdate=!1,i.setRenderTarget(I,R,G)};function S(O,D){const z=t.update(x);g.defines.VSM_SAMPLES!==O.blurSamples&&(g.defines.VSM_SAMPLES=O.blurSamples,m.defines.VSM_SAMPLES=O.blurSamples,g.needsUpdate=!0,m.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new Tr(s.x,s.y)),g.uniforms.shadow_pass.value=O.map.texture,g.uniforms.resolution.value=O.mapSize,g.uniforms.radius.value=O.radius,i.setRenderTarget(O.mapPass),i.clear(),i.renderBufferDirect(D,null,z,g,x,null),m.uniforms.shadow_pass.value=O.mapPass.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,i.setRenderTarget(O.map),i.clear(),i.renderBufferDirect(D,null,z,m,x,null)}function w(O,D,z,I){let R=null;const G=z.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(G!==void 0)R=G;else if(R=z.isPointLight===!0?u:c,i.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const U=R.uuid,F=D.uuid;let E=h[U];E===void 0&&(E={},h[U]=E);let Z=E[F];Z===void 0&&(Z=R.clone(),E[F]=Z,D.addEventListener("dispose",k)),R=Z}if(R.visible=D.visible,R.wireframe=D.wireframe,I===Ti?R.side=D.shadowSide!==null?D.shadowSide:D.side:R.side=D.shadowSide!==null?D.shadowSide:p[D.side],R.alphaMap=D.alphaMap,R.alphaTest=D.alphaTest,R.map=D.map,R.clipShadows=D.clipShadows,R.clippingPlanes=D.clippingPlanes,R.clipIntersection=D.clipIntersection,R.displacementMap=D.displacementMap,R.displacementScale=D.displacementScale,R.displacementBias=D.displacementBias,R.wireframeLinewidth=D.wireframeLinewidth,R.linewidth=D.linewidth,z.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const U=i.properties.get(R);U.light=z}return R}function T(O,D,z,I,R){if(O.visible===!1)return;if(O.layers.test(D.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===Ti)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,O.matrixWorld);const F=t.update(O),E=O.material;if(Array.isArray(E)){const Z=F.groups;for(let ot=0,rt=Z.length;ot<rt;ot++){const W=Z[ot],it=E[W.materialIndex];if(it&&it.visible){const et=w(O,it,I,R);O.onBeforeShadow(i,O,D,z,F,et,W),i.renderBufferDirect(z,null,F,et,O,W),O.onAfterShadow(i,O,D,z,F,et,W)}}}else if(E.visible){const Z=w(O,E,I,R);O.onBeforeShadow(i,O,D,z,F,Z,null),i.renderBufferDirect(z,null,F,Z,O,null),O.onAfterShadow(i,O,D,z,F,Z,null)}}const U=O.children;for(let F=0,E=U.length;F<E;F++)T(U[F],D,z,I,R)}function k(O){O.target.removeEventListener("dispose",k);for(const z in h){const I=h[z],R=O.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function mb(i){function t(){let N=!1;const ht=new Qe;let Mt=null;const Rt=new Qe(0,0,0,0);return{setMask:function(kt){Mt!==kt&&!N&&(i.colorMask(kt,kt,kt,kt),Mt=kt)},setLocked:function(kt){N=kt},setClear:function(kt,se,he,be,Fe){Fe===!0&&(kt*=be,se*=be,he*=be),ht.set(kt,se,he,be),Rt.equals(ht)===!1&&(i.clearColor(kt,se,he,be),Rt.copy(ht))},reset:function(){N=!1,Mt=null,Rt.set(-1,0,0,0)}}}function e(){let N=!1,ht=null,Mt=null,Rt=null;return{setTest:function(kt){kt?wt(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(kt){ht!==kt&&!N&&(i.depthMask(kt),ht=kt)},setFunc:function(kt){if(Mt!==kt){switch(kt){case kg:i.depthFunc(i.NEVER);break;case Ng:i.depthFunc(i.ALWAYS);break;case Og:i.depthFunc(i.LESS);break;case Ra:i.depthFunc(i.LEQUAL);break;case Ug:i.depthFunc(i.EQUAL);break;case zg:i.depthFunc(i.GEQUAL);break;case Bg:i.depthFunc(i.GREATER);break;case Fg:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=kt}},setLocked:function(kt){N=kt},setClear:function(kt){Rt!==kt&&(i.clearDepth(kt),Rt=kt)},reset:function(){N=!1,ht=null,Mt=null,Rt=null}}}function n(){let N=!1,ht=null,Mt=null,Rt=null,kt=null,se=null,he=null,be=null,Fe=null;return{setTest:function(ve){N||(ve?wt(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(ve){ht!==ve&&!N&&(i.stencilMask(ve),ht=ve)},setFunc:function(ve,De,Ae){(Mt!==ve||Rt!==De||kt!==Ae)&&(i.stencilFunc(ve,De,Ae),Mt=ve,Rt=De,kt=Ae)},setOp:function(ve,De,Ae){(se!==ve||he!==De||be!==Ae)&&(i.stencilOp(ve,De,Ae),se=ve,he=De,be=Ae)},setLocked:function(ve){N=ve},setClear:function(ve){Fe!==ve&&(i.clearStencil(ve),Fe=ve)},reset:function(){N=!1,ht=null,Mt=null,Rt=null,kt=null,se=null,he=null,be=null,Fe=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,u=new WeakMap;let h={},f={},p=new WeakMap,g=[],m=null,y=!1,x=null,_=null,v=null,S=null,w=null,T=null,k=null,O=new Kt(0,0,0),D=0,z=!1,I=null,R=null,G=null,U=null,F=null;const E=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,ot=0;const rt=i.getParameter(i.VERSION);rt.indexOf("WebGL")!==-1?(ot=parseFloat(/^WebGL (\d)/.exec(rt)[1]),Z=ot>=1):rt.indexOf("OpenGL ES")!==-1&&(ot=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),Z=ot>=2);let W=null,it={};const et=i.getParameter(i.SCISSOR_BOX),q=i.getParameter(i.VIEWPORT),Y=new Qe().fromArray(et),At=new Qe().fromArray(q);function tt(N,ht,Mt,Rt){const kt=new Uint8Array(4),se=i.createTexture();i.bindTexture(N,se),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let he=0;he<Mt;he++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,Rt,0,i.RGBA,i.UNSIGNED_BYTE,kt):i.texImage2D(ht+he,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,kt);return se}const st={};st[i.TEXTURE_2D]=tt(i.TEXTURE_2D,i.TEXTURE_2D,1),st[i.TEXTURE_CUBE_MAP]=tt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),st[i.TEXTURE_2D_ARRAY]=tt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),st[i.TEXTURE_3D]=tt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),wt(i.DEPTH_TEST),o.setFunc(Ra),nt(!1),K(xh),wt(i.CULL_FACE),bt($i);function wt(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function St(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Pt(N,ht){return f[N]!==ht?(i.bindFramebuffer(N,ht),f[N]=ht,N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ht),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function It(N,ht){let Mt=g,Rt=!1;if(N){Mt=p.get(ht),Mt===void 0&&(Mt=[],p.set(ht,Mt));const kt=N.textures;if(Mt.length!==kt.length||Mt[0]!==i.COLOR_ATTACHMENT0){for(let se=0,he=kt.length;se<he;se++)Mt[se]=i.COLOR_ATTACHMENT0+se;Mt.length=kt.length,Rt=!0}}else Mt[0]!==i.BACK&&(Mt[0]=i.BACK,Rt=!0);Rt&&i.drawBuffers(Mt)}function Ut(N){return m!==N?(i.useProgram(N),m=N,!0):!1}const at={[_r]:i.FUNC_ADD,[_g]:i.FUNC_SUBTRACT,[vg]:i.FUNC_REVERSE_SUBTRACT};at[yg]=i.MIN,at[xg]=i.MAX;const xt={[bg]:i.ZERO,[wg]:i.ONE,[Mg]:i.SRC_COLOR,[Ac]:i.SRC_ALPHA,[Cg]:i.SRC_ALPHA_SATURATE,[Ag]:i.DST_COLOR,[Eg]:i.DST_ALPHA,[Sg]:i.ONE_MINUS_SRC_COLOR,[Lc]:i.ONE_MINUS_SRC_ALPHA,[Lg]:i.ONE_MINUS_DST_COLOR,[Tg]:i.ONE_MINUS_DST_ALPHA,[Pg]:i.CONSTANT_COLOR,[Rg]:i.ONE_MINUS_CONSTANT_COLOR,[Ig]:i.CONSTANT_ALPHA,[Dg]:i.ONE_MINUS_CONSTANT_ALPHA};function bt(N,ht,Mt,Rt,kt,se,he,be,Fe,ve){if(N===$i){y===!0&&(St(i.BLEND),y=!1);return}if(y===!1&&(wt(i.BLEND),y=!0),N!==gg){if(N!==x||ve!==z){if((_!==_r||w!==_r)&&(i.blendEquation(i.FUNC_ADD),_=_r,w=_r),ve)switch(N){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bh:i.blendFunc(i.ONE,i.ONE);break;case wh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case bh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case wh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Mh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,S=null,T=null,k=null,O.set(0,0,0),D=0,x=N,z=ve}return}kt=kt||ht,se=se||Mt,he=he||Rt,(ht!==_||kt!==w)&&(i.blendEquationSeparate(at[ht],at[kt]),_=ht,w=kt),(Mt!==v||Rt!==S||se!==T||he!==k)&&(i.blendFuncSeparate(xt[Mt],xt[Rt],xt[se],xt[he]),v=Mt,S=Rt,T=se,k=he),(be.equals(O)===!1||Fe!==D)&&(i.blendColor(be.r,be.g,be.b,Fe),O.copy(be),D=Fe),x=N,z=!1}function A(N,ht){N.side===ln?St(i.CULL_FACE):wt(i.CULL_FACE);let Mt=N.side===Tn;ht&&(Mt=!Mt),nt(Mt),N.blending===gs&&N.transparent===!1?bt($i):bt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const Rt=N.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(N.stencilWriteMask),l.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),l.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),M(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?wt(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function nt(N){I!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),I=N)}function K(N){N!==fg?(wt(i.CULL_FACE),N!==R&&(N===xh?i.cullFace(i.BACK):N===pg?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),R=N}function P(N){N!==G&&(Z&&i.lineWidth(N),G=N)}function M(N,ht,Mt){N?(wt(i.POLYGON_OFFSET_FILL),(U!==ht||F!==Mt)&&(i.polygonOffset(ht,Mt),U=ht,F=Mt)):St(i.POLYGON_OFFSET_FILL)}function H(N){N?wt(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function j(N){N===void 0&&(N=i.TEXTURE0+E-1),W!==N&&(i.activeTexture(N),W=N)}function Q(N,ht,Mt){Mt===void 0&&(W===null?Mt=i.TEXTURE0+E-1:Mt=W);let Rt=it[Mt];Rt===void 0&&(Rt={type:void 0,texture:void 0},it[Mt]=Rt),(Rt.type!==N||Rt.texture!==ht)&&(W!==Mt&&(i.activeTexture(Mt),W=Mt),i.bindTexture(N,ht||st[N]),Rt.type=N,Rt.texture=ht)}function X(){const N=it[W];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function ft(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function lt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function pt(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Et(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Lt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ht(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function zt(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Dt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Qt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Vt(N){Y.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Y.copy(N))}function ae(N){At.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),At.copy(N))}function le(N,ht){let Mt=u.get(ht);Mt===void 0&&(Mt=new WeakMap,u.set(ht,Mt));let Rt=Mt.get(N);Rt===void 0&&(Rt=i.getUniformBlockIndex(ht,N.name),Mt.set(N,Rt))}function ee(N,ht){const Rt=u.get(ht).get(N);c.get(ht)!==Rt&&(i.uniformBlockBinding(ht,Rt,N.__bindingPointIndex),c.set(ht,Rt))}function Ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},W=null,it={},f={},p=new WeakMap,g=[],m=null,y=!1,x=null,_=null,v=null,S=null,w=null,T=null,k=null,O=new Kt(0,0,0),D=0,z=!1,I=null,R=null,G=null,U=null,F=null,Y.set(0,0,i.canvas.width,i.canvas.height),At.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:wt,disable:St,bindFramebuffer:Pt,drawBuffers:It,useProgram:Ut,setBlending:bt,setMaterial:A,setFlipSided:nt,setCullFace:K,setLineWidth:P,setPolygonOffset:M,setScissorTest:H,activeTexture:j,bindTexture:Q,unbindTexture:X,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Qt,updateUBOMapping:le,uniformBlockBinding:ee,texStorage2D:Ht,texStorage3D:zt,texSubImage2D:pt,texSubImage3D:Tt,compressedTexSubImage2D:Et,compressedTexSubImage3D:Lt,scissor:Vt,viewport:ae,reset:Ft}}function gb(i,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new vt,f=new WeakMap;let p;const g=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(P,M){return m?new OffscreenCanvas(P,M):Ua("canvas")}function x(P,M,H){let j=1;const Q=K(P);if((Q.width>H||Q.height>H)&&(j=H/Math.max(Q.width,Q.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const X=Math.floor(j*Q.width),ft=Math.floor(j*Q.height);p===void 0&&(p=y(X,ft));const lt=M?y(X,ft):p;return lt.width=X,lt.height=ft,lt.getContext("2d").drawImage(P,0,0,X,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+X+"x"+ft+")."),lt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),P;return P}function _(P){return P.generateMipmaps&&P.minFilter!==Hn&&P.minFilter!==$n}function v(P){i.generateMipmap(P)}function S(P,M,H,j,Q=!1){if(P!==null){if(i[P]!==void 0)return i[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let X=M;if(M===i.RED&&(H===i.FLOAT&&(X=i.R32F),H===i.HALF_FLOAT&&(X=i.R16F),H===i.UNSIGNED_BYTE&&(X=i.R8)),M===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(X=i.R8UI),H===i.UNSIGNED_SHORT&&(X=i.R16UI),H===i.UNSIGNED_INT&&(X=i.R32UI),H===i.BYTE&&(X=i.R8I),H===i.SHORT&&(X=i.R16I),H===i.INT&&(X=i.R32I)),M===i.RG&&(H===i.FLOAT&&(X=i.RG32F),H===i.HALF_FLOAT&&(X=i.RG16F),H===i.UNSIGNED_BYTE&&(X=i.RG8)),M===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(X=i.RG8UI),H===i.UNSIGNED_SHORT&&(X=i.RG16UI),H===i.UNSIGNED_INT&&(X=i.RG32UI),H===i.BYTE&&(X=i.RG8I),H===i.SHORT&&(X=i.RG16I),H===i.INT&&(X=i.RG32I)),M===i.RGB&&H===i.UNSIGNED_INT_5_9_9_9_REV&&(X=i.RGB9_E5),M===i.RGBA){const ft=Q?Da:xe.getTransfer(j);H===i.FLOAT&&(X=i.RGBA32F),H===i.HALF_FLOAT&&(X=i.RGBA16F),H===i.UNSIGNED_BYTE&&(X=ft===Ee?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT_4_4_4_4&&(X=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(X=i.RGB5_A1)}return(X===i.R16F||X===i.R32F||X===i.RG16F||X===i.RG32F||X===i.RGBA16F||X===i.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function w(P,M){return _(P)===!0||P.isFramebufferTexture&&P.minFilter!==Hn&&P.minFilter!==$n?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function T(P){const M=P.target;M.removeEventListener("dispose",T),O(M),M.isVideoTexture&&f.delete(M)}function k(P){const M=P.target;M.removeEventListener("dispose",k),z(M)}function O(P){const M=n.get(P);if(M.__webglInit===void 0)return;const H=P.source,j=g.get(H);if(j){const Q=j[M.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&D(P),Object.keys(j).length===0&&g.delete(H)}n.remove(P)}function D(P){const M=n.get(P);i.deleteTexture(M.__webglTexture);const H=P.source,j=g.get(H);delete j[M.__cacheKey],l.memory.textures--}function z(P){const M=n.get(P);if(P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Q=0;Q<M.__webglFramebuffer[j].length;Q++)i.deleteFramebuffer(M.__webglFramebuffer[j][Q]);else i.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)i.deleteFramebuffer(M.__webglFramebuffer[j]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const H=P.textures;for(let j=0,Q=H.length;j<Q;j++){const X=n.get(H[j]);X.__webglTexture&&(i.deleteTexture(X.__webglTexture),l.memory.textures--),n.remove(H[j])}n.remove(P)}let I=0;function R(){I=0}function G(){const P=I;return P>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+s.maxTextures),I+=1,P}function U(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function F(P,M){const H=n.get(P);if(P.isVideoTexture&&A(P),P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){const j=P.image;if(j===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(H,P,M);return}}e.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+M)}function E(P,M){const H=n.get(P);if(P.version>0&&H.__version!==P.version){Y(H,P,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+M)}function Z(P,M){const H=n.get(P);if(P.version>0&&H.__version!==P.version){Y(H,P,M);return}e.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+M)}function ot(P,M){const H=n.get(P);if(P.version>0&&H.__version!==P.version){At(H,P,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+M)}const rt={[Rc]:i.REPEAT,[br]:i.CLAMP_TO_EDGE,[Ic]:i.MIRRORED_REPEAT},W={[Hn]:i.NEAREST,[$g]:i.NEAREST_MIPMAP_NEAREST,[$o]:i.NEAREST_MIPMAP_LINEAR,[$n]:i.LINEAR,[Il]:i.LINEAR_MIPMAP_NEAREST,[wr]:i.LINEAR_MIPMAP_LINEAR},it={[c_]:i.NEVER,[m_]:i.ALWAYS,[u_]:i.LESS,[Bf]:i.LEQUAL,[h_]:i.EQUAL,[p_]:i.GEQUAL,[d_]:i.GREATER,[f_]:i.NOTEQUAL};function et(P,M){if(M.type===qi&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===$n||M.magFilter===Il||M.magFilter===$o||M.magFilter===wr||M.minFilter===$n||M.minFilter===Il||M.minFilter===$o||M.minFilter===wr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(P,i.TEXTURE_WRAP_S,rt[M.wrapS]),i.texParameteri(P,i.TEXTURE_WRAP_T,rt[M.wrapT]),(P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY)&&i.texParameteri(P,i.TEXTURE_WRAP_R,rt[M.wrapR]),i.texParameteri(P,i.TEXTURE_MAG_FILTER,W[M.magFilter]),i.texParameteri(P,i.TEXTURE_MIN_FILTER,W[M.minFilter]),M.compareFunction&&(i.texParameteri(P,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(P,i.TEXTURE_COMPARE_FUNC,it[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Hn||M.minFilter!==$o&&M.minFilter!==wr||M.type===qi&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const H=t.get("EXT_texture_filter_anisotropic");i.texParameterf(P,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function q(P,M){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",T));const j=M.source;let Q=g.get(j);Q===void 0&&(Q={},g.set(j,Q));const X=U(M);if(X!==P.__cacheKey){Q[X]===void 0&&(Q[X]={texture:i.createTexture(),usedTimes:0},l.memory.textures++,H=!0),Q[X].usedTimes++;const ft=Q[P.__cacheKey];ft!==void 0&&(Q[P.__cacheKey].usedTimes--,ft.usedTimes===0&&D(M)),P.__cacheKey=X,P.__webglTexture=Q[X].texture}return H}function Y(P,M,H){let j=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=i.TEXTURE_3D);const Q=q(P,M),X=M.source;e.bindTexture(j,P.__webglTexture,i.TEXTURE0+H);const ft=n.get(X);if(X.version!==ft.__version||Q===!0){e.activeTexture(i.TEXTURE0+H);const lt=xe.getPrimaries(xe.workingColorSpace),pt=M.colorSpace===Zi?null:xe.getPrimaries(M.colorSpace),Tt=M.colorSpace===Zi||lt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=x(M.image,!1,s.maxTextureSize);Et=nt(M,Et);const Lt=o.convert(M.format,M.colorSpace),Ht=o.convert(M.type);let zt=S(M.internalFormat,Lt,Ht,M.colorSpace,M.isVideoTexture);et(j,M);let Dt;const Qt=M.mipmaps,Vt=M.isVideoTexture!==!0&&zt!==zf,ae=ft.__version===void 0||Q===!0,le=X.dataReady,ee=w(M,Et);if(M.isDepthTexture)zt=i.DEPTH_COMPONENT16,M.type===qi?zt=i.DEPTH_COMPONENT32F:M.type===Es?zt=i.DEPTH_COMPONENT24:M.type===Eo&&(zt=i.DEPTH24_STENCIL8),ae&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,zt,Et.width,Et.height):e.texImage2D(i.TEXTURE_2D,0,zt,Et.width,Et.height,0,Lt,Ht,null));else if(M.isDataTexture)if(Qt.length>0){Vt&&ae&&e.texStorage2D(i.TEXTURE_2D,ee,zt,Qt[0].width,Qt[0].height);for(let Ft=0,N=Qt.length;Ft<N;Ft++)Dt=Qt[Ft],Vt?le&&e.texSubImage2D(i.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,Lt,Ht,Dt.data):e.texImage2D(i.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Lt,Ht,Dt.data);M.generateMipmaps=!1}else Vt?(ae&&e.texStorage2D(i.TEXTURE_2D,ee,zt,Et.width,Et.height),le&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et.width,Et.height,Lt,Ht,Et.data)):e.texImage2D(i.TEXTURE_2D,0,zt,Et.width,Et.height,0,Lt,Ht,Et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Vt&&ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ee,zt,Qt[0].width,Qt[0].height,Et.depth);for(let Ft=0,N=Qt.length;Ft<N;Ft++)Dt=Qt[Ft],M.format!==ci?Lt!==null?Vt?le&&e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,Lt,Dt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?le&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,Lt,Ht,Dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Lt,Ht,Dt.data)}else{Vt&&ae&&e.texStorage2D(i.TEXTURE_2D,ee,zt,Qt[0].width,Qt[0].height);for(let Ft=0,N=Qt.length;Ft<N;Ft++)Dt=Qt[Ft],M.format!==ci?Lt!==null?Vt?le&&e.compressedTexSubImage2D(i.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,Lt,Dt.data):e.compressedTexImage2D(i.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?le&&e.texSubImage2D(i.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,Lt,Ht,Dt.data):e.texImage2D(i.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Lt,Ht,Dt.data)}else if(M.isDataArrayTexture)Vt?(ae&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ee,zt,Et.width,Et.height,Et.depth),le&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,Lt,Ht,Et.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,zt,Et.width,Et.height,Et.depth,0,Lt,Ht,Et.data);else if(M.isData3DTexture)Vt?(ae&&e.texStorage3D(i.TEXTURE_3D,ee,zt,Et.width,Et.height,Et.depth),le&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,Lt,Ht,Et.data)):e.texImage3D(i.TEXTURE_3D,0,zt,Et.width,Et.height,Et.depth,0,Lt,Ht,Et.data);else if(M.isFramebufferTexture){if(ae)if(Vt)e.texStorage2D(i.TEXTURE_2D,ee,zt,Et.width,Et.height);else{let Ft=Et.width,N=Et.height;for(let ht=0;ht<ee;ht++)e.texImage2D(i.TEXTURE_2D,ht,zt,Ft,N,0,Lt,Ht,null),Ft>>=1,N>>=1}}else if(Qt.length>0){if(Vt&&ae){const Ft=K(Qt[0]);e.texStorage2D(i.TEXTURE_2D,ee,zt,Ft.width,Ft.height)}for(let Ft=0,N=Qt.length;Ft<N;Ft++)Dt=Qt[Ft],Vt?le&&e.texSubImage2D(i.TEXTURE_2D,Ft,0,0,Lt,Ht,Dt):e.texImage2D(i.TEXTURE_2D,Ft,zt,Lt,Ht,Dt);M.generateMipmaps=!1}else if(Vt){if(ae){const Ft=K(Et);e.texStorage2D(i.TEXTURE_2D,ee,zt,Ft.width,Ft.height)}le&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Lt,Ht,Et)}else e.texImage2D(i.TEXTURE_2D,0,zt,Lt,Ht,Et);_(M)&&v(j),ft.__version=X.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function At(P,M,H){if(M.image.length!==6)return;const j=q(P,M),Q=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,P.__webglTexture,i.TEXTURE0+H);const X=n.get(Q);if(Q.version!==X.__version||j===!0){e.activeTexture(i.TEXTURE0+H);const ft=xe.getPrimaries(xe.workingColorSpace),lt=M.colorSpace===Zi?null:xe.getPrimaries(M.colorSpace),pt=M.colorSpace===Zi||ft===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Tt=M.isCompressedTexture||M.image[0].isCompressedTexture,Et=M.image[0]&&M.image[0].isDataTexture,Lt=[];for(let N=0;N<6;N++)!Tt&&!Et?Lt[N]=x(M.image[N],!0,s.maxCubemapSize):Lt[N]=Et?M.image[N].image:M.image[N],Lt[N]=nt(M,Lt[N]);const Ht=Lt[0],zt=o.convert(M.format,M.colorSpace),Dt=o.convert(M.type),Qt=S(M.internalFormat,zt,Dt,M.colorSpace),Vt=M.isVideoTexture!==!0,ae=X.__version===void 0||j===!0,le=Q.dataReady;let ee=w(M,Ht);et(i.TEXTURE_CUBE_MAP,M);let Ft;if(Tt){Vt&&ae&&e.texStorage2D(i.TEXTURE_CUBE_MAP,ee,Qt,Ht.width,Ht.height);for(let N=0;N<6;N++){Ft=Lt[N].mipmaps;for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];M.format!==ci?zt!==null?Vt?le&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht,0,0,Mt.width,Mt.height,zt,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht,Qt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?le&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht,0,0,Mt.width,Mt.height,zt,Dt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht,Qt,Mt.width,Mt.height,0,zt,Dt,Mt.data)}}}else{if(Ft=M.mipmaps,Vt&&ae){Ft.length>0&&ee++;const N=K(Lt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,ee,Qt,N.width,N.height)}for(let N=0;N<6;N++)if(Et){Vt?le&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,Lt[N].width,Lt[N].height,zt,Dt,Lt[N].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,Qt,Lt[N].width,Lt[N].height,0,zt,Dt,Lt[N].data);for(let ht=0;ht<Ft.length;ht++){const Rt=Ft[ht].image[N].image;Vt?le&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht+1,0,0,Rt.width,Rt.height,zt,Dt,Rt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht+1,Qt,Rt.width,Rt.height,0,zt,Dt,Rt.data)}}else{Vt?le&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,0,0,zt,Dt,Lt[N]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,0,Qt,zt,Dt,Lt[N]);for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];Vt?le&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht+1,0,0,zt,Dt,Mt.image[N]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+N,ht+1,Qt,zt,Dt,Mt.image[N])}}}_(M)&&v(i.TEXTURE_CUBE_MAP),X.__version=Q.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function tt(P,M,H,j,Q,X){const ft=o.convert(H.format,H.colorSpace),lt=o.convert(H.type),pt=S(H.internalFormat,ft,lt,H.colorSpace);if(!n.get(M).__hasExternalTextures){const Et=Math.max(1,M.width>>X),Lt=Math.max(1,M.height>>X);Q===i.TEXTURE_3D||Q===i.TEXTURE_2D_ARRAY?e.texImage3D(Q,X,pt,Et,Lt,M.depth,0,ft,lt,null):e.texImage2D(Q,X,pt,Et,Lt,0,ft,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,P),bt(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,j,Q,n.get(H).__webglTexture,0,xt(M)):(Q===i.TEXTURE_2D||Q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,j,Q,n.get(H).__webglTexture,X),e.bindFramebuffer(i.FRAMEBUFFER,null)}function st(P,M,H){if(i.bindRenderbuffer(i.RENDERBUFFER,P),M.depthBuffer&&!M.stencilBuffer){let j=i.DEPTH_COMPONENT24;if(H||bt(M)){const Q=M.depthTexture;Q&&Q.isDepthTexture&&(Q.type===qi?j=i.DEPTH_COMPONENT32F:Q.type===Es&&(j=i.DEPTH_COMPONENT24));const X=xt(M);bt(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X,j,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,X,j,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,j,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,P)}else if(M.depthBuffer&&M.stencilBuffer){const j=xt(M);H&&bt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,j,i.DEPTH24_STENCIL8,M.width,M.height):bt(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,j,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,P)}else{const j=M.textures;for(let Q=0;Q<j.length;Q++){const X=j[Q],ft=o.convert(X.format,X.colorSpace),lt=o.convert(X.type),pt=S(X.internalFormat,ft,lt,X.colorSpace),Tt=xt(M);H&&bt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,pt,M.width,M.height):bt(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt,pt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,pt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(P,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),F(M.depthTexture,0);const j=n.get(M.depthTexture).__webglTexture,Q=xt(M);if(M.depthTexture.format===_s)bt(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,j,0);else if(M.depthTexture.format===mo)bt(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function St(P){const M=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!M.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");wt(M.__webglFramebuffer,P)}else if(H){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]=i.createRenderbuffer(),st(M.__webglDepthbuffer[j],P,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),st(M.__webglDepthbuffer,P,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(P,M,H){const j=n.get(P);M!==void 0&&tt(j.__webglFramebuffer,P,P.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&St(P)}function It(P){const M=P.texture,H=n.get(P),j=n.get(M);P.addEventListener("dispose",k);const Q=P.textures,X=P.isWebGLCubeRenderTarget===!0,ft=Q.length>1;if(ft||(j.__webglTexture===void 0&&(j.__webglTexture=i.createTexture()),j.__version=M.version,l.memory.textures++),X){H.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer[lt]=[];for(let pt=0;pt<M.mipmaps.length;pt++)H.__webglFramebuffer[lt][pt]=i.createFramebuffer()}else H.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){H.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)H.__webglFramebuffer[lt]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(ft)for(let lt=0,pt=Q.length;lt<pt;lt++){const Tt=n.get(Q[lt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),l.memory.textures++)}if(P.samples>0&&bt(P)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let lt=0;lt<Q.length;lt++){const pt=Q[lt];H.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[lt]);const Tt=o.convert(pt.format,pt.colorSpace),Et=o.convert(pt.type),Lt=S(pt.internalFormat,Tt,Et,pt.colorSpace,P.isXRRenderTarget===!0),Ht=xt(P);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,Lt,P.width,P.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,H.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),st(H.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(X){e.bindTexture(i.TEXTURE_CUBE_MAP,j.__webglTexture),et(i.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)tt(H.__webglFramebuffer[lt][pt],P,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else tt(H.__webglFramebuffer[lt],P,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);_(M)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=Q.length;lt<pt;lt++){const Tt=Q[lt],Et=n.get(Tt);e.bindTexture(i.TEXTURE_2D,Et.__webglTexture),et(i.TEXTURE_2D,Tt),tt(H.__webglFramebuffer,P,Tt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),_(Tt)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(lt=P.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,j.__webglTexture),et(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)tt(H.__webglFramebuffer[pt],P,M,i.COLOR_ATTACHMENT0,lt,pt);else tt(H.__webglFramebuffer,P,M,i.COLOR_ATTACHMENT0,lt,0);_(M)&&v(lt),e.unbindTexture()}P.depthBuffer&&St(P)}function Ut(P){const M=P.textures;for(let H=0,j=M.length;H<j;H++){const Q=M[H];if(_(Q)){const X=P.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ft=n.get(Q).__webglTexture;e.bindTexture(X,ft),v(X),e.unbindTexture()}}}function at(P){if(P.samples>0&&bt(P)===!1){const M=P.textures,H=P.width,j=P.height;let Q=i.COLOR_BUFFER_BIT;const X=[],ft=P.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(P),pt=M.length>1;if(pt)for(let Tt=0;Tt<M.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Tt=0;Tt<M.length;Tt++){X.push(i.COLOR_ATTACHMENT0+Tt),P.depthBuffer&&X.push(ft);const Et=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Et===!1&&(P.depthBuffer&&(Q|=i.DEPTH_BUFFER_BIT),P.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&(Q|=i.STENCIL_BUFFER_BIT)),pt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]),Et===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ft]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ft])),pt){const Lt=n.get(M[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Lt,0)}i.blitFramebuffer(0,0,H,j,0,0,H,j,Q,i.NEAREST),u&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,X)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<M.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]);const Et=n.get(M[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,Et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function xt(P){return Math.min(s.maxSamples,P.samples)}function bt(P){const M=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function A(P){const M=l.render.frame;f.get(P)!==M&&(f.set(P,M),P.update())}function nt(P,M){const H=P.colorSpace,j=P.format,Q=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||H!==er&&H!==Zi&&(xe.getTransfer(H)===Ee?(j!==ci||Q!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),M}function K(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(h.width=P.naturalWidth||P.width,h.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(h.width=P.displayWidth,h.height=P.displayHeight):(h.width=P.width,h.height=P.height),h}this.allocateTextureUnit=G,this.resetTextureUnits=R,this.setTexture2D=F,this.setTexture2DArray=E,this.setTexture3D=Z,this.setTextureCube=ot,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=at,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=tt,this.useMultisampledRTT=bt}function _b(i,t){function e(n,s=Zi){let o;const l=xe.getTransfer(s);if(n===Ki)return i.UNSIGNED_BYTE;if(n===Df)return i.UNSIGNED_SHORT_4_4_4_4;if(n===kf)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Jg)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Yg)return i.BYTE;if(n===Kg)return i.SHORT;if(n===Rf)return i.UNSIGNED_SHORT;if(n===If)return i.INT;if(n===Es)return i.UNSIGNED_INT;if(n===qi)return i.FLOAT;if(n===Ia)return i.HALF_FLOAT;if(n===Qg)return i.ALPHA;if(n===t_)return i.RGB;if(n===ci)return i.RGBA;if(n===e_)return i.LUMINANCE;if(n===n_)return i.LUMINANCE_ALPHA;if(n===_s)return i.DEPTH_COMPONENT;if(n===mo)return i.DEPTH_STENCIL;if(n===i_)return i.RED;if(n===Nf)return i.RED_INTEGER;if(n===r_)return i.RG;if(n===Of)return i.RG_INTEGER;if(n===Uf)return i.RGBA_INTEGER;if(n===Dl||n===kl||n===Nl||n===Ol)if(l===Ee)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Dl)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===kl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Nl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ol)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Dl)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===kl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Nl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ol)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sh||n===Eh||n===Th||n===Ah)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Sh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Eh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Th)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ah)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zf)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Lh||n===Ch)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Lh)return l===Ee?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Ch)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ph||n===Rh||n===Ih||n===Dh||n===kh||n===Nh||n===Oh||n===Uh||n===zh||n===Bh||n===Fh||n===Hh||n===Vh||n===Gh)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Ph)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Rh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ih)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Dh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Nh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Uh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===zh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Bh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Hh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Gh)return l===Ee?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ul||n===Wh||n===Zh)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Ul)return l===Ee?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Zh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===s_||n===Xh||n===qh||n===jh)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Ul)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Xh)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Eo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class vb extends Rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Mr extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const yb={type:"move"};class cc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,u=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){l=!0;for(const x of t.hand.values()){const _=e.getJointPose(x,n),v=this._getHandJoint(h,x);_!==null&&(v.matrix.fromArray(_.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=_.radius),v.visible=_!==null}const f=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],g=f.position.distanceTo(p.position),m=.02,y=.005;h.inputState.pinching&&g>m+y?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&g<=m-y&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(yb)))}return c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),h!==null&&(h.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Mr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const xb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bb=`
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

}`;class wb{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new gn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new tr({vertexShader:xb,fragmentShader:bb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ie(new Ao(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Mb extends Cr{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",u=1,h=null,f=null,p=null,g=null,m=null,y=null;const x=new wb,_=e.getContextAttributes();let v=null,S=null;const w=[],T=[],k=new vt;let O=null;const D=new Rn;D.layers.enable(1),D.viewport=new Qe;const z=new Rn;z.layers.enable(2),z.viewport=new Qe;const I=[D,z],R=new vb;R.layers.enable(1),R.layers.enable(2);let G=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let st=w[tt];return st===void 0&&(st=new cc,w[tt]=st),st.getTargetRaySpace()},this.getControllerGrip=function(tt){let st=w[tt];return st===void 0&&(st=new cc,w[tt]=st),st.getGripSpace()},this.getHand=function(tt){let st=w[tt];return st===void 0&&(st=new cc,w[tt]=st),st.getHandSpace()};function F(tt){const st=T.indexOf(tt.inputSource);if(st===-1)return;const wt=w[st];wt!==void 0&&(wt.update(tt.inputSource,tt.frame,h||l),wt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function E(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",E),s.removeEventListener("inputsourceschange",Z);for(let tt=0;tt<w.length;tt++){const st=T[tt];st!==null&&(T[tt]=null,w[tt].disconnect(st))}G=null,U=null,x.reset(),t.setRenderTarget(v),m=null,g=null,p=null,s=null,S=null,At.stop(),n.isPresenting=!1,t.setPixelRatio(O),t.setSize(k.width,k.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){o=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){c=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||l},this.setReferenceSpace=function(tt){h=tt},this.getBaseLayer=function(){return g!==null?g:m},this.getBinding=function(){return p},this.getFrame=function(){return y},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",E),s.addEventListener("inputsourceschange",Z),_.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(k),s.renderState.layers===void 0){const st={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new Tr(m.framebufferWidth,m.framebufferHeight,{format:ci,type:Ki,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let st=null,wt=null,St=null;_.depth&&(St=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=_.stencil?mo:_s,wt=_.stencil?Eo:Es);const Pt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:o};p=new XRWebGLBinding(s,e),g=p.createProjectionLayer(Pt),s.updateRenderState({layers:[g]}),t.setPixelRatio(1),t.setSize(g.textureWidth,g.textureHeight,!1),S=new Tr(g.textureWidth,g.textureHeight,{format:ci,type:Ki,depthTexture:new Jf(g.textureWidth,g.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const It=t.properties.get(S);It.__ignoreDepthValues=g.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(u),h=null,l=await s.requestReferenceSpace(c),At.setContext(s),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(tt){for(let st=0;st<tt.removed.length;st++){const wt=tt.removed[st],St=T.indexOf(wt);St>=0&&(T[St]=null,w[St].disconnect(wt))}for(let st=0;st<tt.added.length;st++){const wt=tt.added[st];let St=T.indexOf(wt);if(St===-1){for(let It=0;It<w.length;It++)if(It>=T.length){T.push(wt),St=It;break}else if(T[It]===null){T[It]=wt,St=It;break}if(St===-1)break}const Pt=w[St];Pt&&Pt.connect(wt)}}const ot=new J,rt=new J;function W(tt,st,wt){ot.setFromMatrixPosition(st.matrixWorld),rt.setFromMatrixPosition(wt.matrixWorld);const St=ot.distanceTo(rt),Pt=st.projectionMatrix.elements,It=wt.projectionMatrix.elements,Ut=Pt[14]/(Pt[10]-1),at=Pt[14]/(Pt[10]+1),xt=(Pt[9]+1)/Pt[5],bt=(Pt[9]-1)/Pt[5],A=(Pt[8]-1)/Pt[0],nt=(It[8]+1)/It[0],K=Ut*A,P=Ut*nt,M=St/(-A+nt),H=M*-A;st.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(H),tt.translateZ(M),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert();const j=Ut+M,Q=at+M,X=K-H,ft=P+(St-H),lt=xt*at/Q*j,pt=bt*at/Q*j;tt.projectionMatrix.makePerspective(X,ft,lt,pt,j,Q),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}function it(tt,st){st===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(st.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;x.texture!==null&&(tt.near=x.depthNear,tt.far=x.depthFar),R.near=z.near=D.near=tt.near,R.far=z.far=D.far=tt.far,(G!==R.near||U!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),G=R.near,U=R.far,D.near=G,D.far=U,z.near=G,z.far=U,D.updateProjectionMatrix(),z.updateProjectionMatrix(),tt.updateProjectionMatrix());const st=tt.parent,wt=R.cameras;it(R,st);for(let St=0;St<wt.length;St++)it(wt[St],st);wt.length===2?W(R,D,z):R.projectionMatrix.copy(D.projectionMatrix),et(tt,R,st)};function et(tt,st,wt){wt===null?tt.matrix.copy(st.matrixWorld):(tt.matrix.copy(wt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(st.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(st.projectionMatrix),tt.projectionMatrixInverse.copy(st.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Dc*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(g===null&&m===null))return u},this.setFoveation=function(tt){u=tt,g!==null&&(g.fixedFoveation=tt),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=tt)},this.hasDepthSensing=function(){return x.texture!==null};let q=null;function Y(tt,st){if(f=st.getViewerPose(h||l),y=st,f!==null){const wt=f.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let St=!1;wt.length!==R.cameras.length&&(R.cameras.length=0,St=!0);for(let It=0;It<wt.length;It++){const Ut=wt[It];let at=null;if(m!==null)at=m.getViewport(Ut);else{const bt=p.getViewSubImage(g,Ut);at=bt.viewport,It===0&&(t.setRenderTargetTextures(S,bt.colorTexture,g.ignoreDepthValues?void 0:bt.depthStencilTexture),t.setRenderTarget(S))}let xt=I[It];xt===void 0&&(xt=new Rn,xt.layers.enable(It),xt.viewport=new Qe,I[It]=xt),xt.matrix.fromArray(Ut.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(Ut.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(at.x,at.y,at.width,at.height),It===0&&(R.matrix.copy(xt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),St===!0&&R.cameras.push(xt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=p.getDepthInformation(wt[0]);It&&It.isValid&&It.texture&&x.init(t,It,s.renderState)}}for(let wt=0;wt<w.length;wt++){const St=T[wt],Pt=w[wt];St!==null&&Pt!==void 0&&Pt.update(St,st,h||l)}x.render(t,R),q&&q(tt,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),y=null}const At=new Yf;At.setAnimationLoop(Y),this.setAnimationLoop=function(tt){q=tt},this.dispose=function(){}}}const pr=new ti,Sb=new Ce;function Eb(i,t){function e(_,v){_.matrixAutoUpdate===!0&&_.updateMatrix(),v.value.copy(_.matrix)}function n(_,v){v.color.getRGB(_.fogColor.value,qf(i)),v.isFog?(_.fogNear.value=v.near,_.fogFar.value=v.far):v.isFogExp2&&(_.fogDensity.value=v.density)}function s(_,v,S,w,T){v.isMeshBasicMaterial||v.isMeshLambertMaterial?o(_,v):v.isMeshToonMaterial?(o(_,v),p(_,v)):v.isMeshPhongMaterial?(o(_,v),f(_,v)):v.isMeshStandardMaterial?(o(_,v),g(_,v),v.isMeshPhysicalMaterial&&m(_,v,T)):v.isMeshMatcapMaterial?(o(_,v),y(_,v)):v.isMeshDepthMaterial?o(_,v):v.isMeshDistanceMaterial?(o(_,v),x(_,v)):v.isMeshNormalMaterial?o(_,v):v.isLineBasicMaterial?(l(_,v),v.isLineDashedMaterial&&c(_,v)):v.isPointsMaterial?u(_,v,S,w):v.isSpriteMaterial?h(_,v):v.isShadowMaterial?(_.color.value.copy(v.color),_.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function o(_,v){_.opacity.value=v.opacity,v.color&&_.diffuse.value.copy(v.color),v.emissive&&_.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(_.map.value=v.map,e(v.map,_.mapTransform)),v.alphaMap&&(_.alphaMap.value=v.alphaMap,e(v.alphaMap,_.alphaMapTransform)),v.bumpMap&&(_.bumpMap.value=v.bumpMap,e(v.bumpMap,_.bumpMapTransform),_.bumpScale.value=v.bumpScale,v.side===Tn&&(_.bumpScale.value*=-1)),v.normalMap&&(_.normalMap.value=v.normalMap,e(v.normalMap,_.normalMapTransform),_.normalScale.value.copy(v.normalScale),v.side===Tn&&_.normalScale.value.negate()),v.displacementMap&&(_.displacementMap.value=v.displacementMap,e(v.displacementMap,_.displacementMapTransform),_.displacementScale.value=v.displacementScale,_.displacementBias.value=v.displacementBias),v.emissiveMap&&(_.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,_.emissiveMapTransform)),v.specularMap&&(_.specularMap.value=v.specularMap,e(v.specularMap,_.specularMapTransform)),v.alphaTest>0&&(_.alphaTest.value=v.alphaTest);const S=t.get(v),w=S.envMap,T=S.envMapRotation;if(w&&(_.envMap.value=w,pr.copy(T),pr.x*=-1,pr.y*=-1,pr.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(pr.y*=-1,pr.z*=-1),_.envMapRotation.value.setFromMatrix4(Sb.makeRotationFromEuler(pr)),_.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=v.reflectivity,_.ior.value=v.ior,_.refractionRatio.value=v.refractionRatio),v.lightMap){_.lightMap.value=v.lightMap;const k=i._useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=v.lightMapIntensity*k,e(v.lightMap,_.lightMapTransform)}v.aoMap&&(_.aoMap.value=v.aoMap,_.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,_.aoMapTransform))}function l(_,v){_.diffuse.value.copy(v.color),_.opacity.value=v.opacity,v.map&&(_.map.value=v.map,e(v.map,_.mapTransform))}function c(_,v){_.dashSize.value=v.dashSize,_.totalSize.value=v.dashSize+v.gapSize,_.scale.value=v.scale}function u(_,v,S,w){_.diffuse.value.copy(v.color),_.opacity.value=v.opacity,_.size.value=v.size*S,_.scale.value=w*.5,v.map&&(_.map.value=v.map,e(v.map,_.uvTransform)),v.alphaMap&&(_.alphaMap.value=v.alphaMap,e(v.alphaMap,_.alphaMapTransform)),v.alphaTest>0&&(_.alphaTest.value=v.alphaTest)}function h(_,v){_.diffuse.value.copy(v.color),_.opacity.value=v.opacity,_.rotation.value=v.rotation,v.map&&(_.map.value=v.map,e(v.map,_.mapTransform)),v.alphaMap&&(_.alphaMap.value=v.alphaMap,e(v.alphaMap,_.alphaMapTransform)),v.alphaTest>0&&(_.alphaTest.value=v.alphaTest)}function f(_,v){_.specular.value.copy(v.specular),_.shininess.value=Math.max(v.shininess,1e-4)}function p(_,v){v.gradientMap&&(_.gradientMap.value=v.gradientMap)}function g(_,v){_.metalness.value=v.metalness,v.metalnessMap&&(_.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,_.metalnessMapTransform)),_.roughness.value=v.roughness,v.roughnessMap&&(_.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,_.roughnessMapTransform)),v.envMap&&(_.envMapIntensity.value=v.envMapIntensity)}function m(_,v,S){_.ior.value=v.ior,v.sheen>0&&(_.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),_.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(_.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,_.sheenColorMapTransform)),v.sheenRoughnessMap&&(_.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,_.sheenRoughnessMapTransform))),v.clearcoat>0&&(_.clearcoat.value=v.clearcoat,_.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(_.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,_.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(_.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Tn&&_.clearcoatNormalScale.value.negate())),v.iridescence>0&&(_.iridescence.value=v.iridescence,_.iridescenceIOR.value=v.iridescenceIOR,_.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(_.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,_.iridescenceMapTransform)),v.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),v.transmission>0&&(_.transmission.value=v.transmission,_.transmissionSamplerMap.value=S.texture,_.transmissionSamplerSize.value.set(S.width,S.height),v.transmissionMap&&(_.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,_.transmissionMapTransform)),_.thickness.value=v.thickness,v.thicknessMap&&(_.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=v.attenuationDistance,_.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(_.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(_.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=v.specularIntensity,_.specularColor.value.copy(v.specularColor),v.specularColorMap&&(_.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,_.specularColorMapTransform)),v.specularIntensityMap&&(_.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,_.specularIntensityMapTransform))}function y(_,v){v.matcap&&(_.matcap.value=v.matcap)}function x(_,v){const S=t.get(v).light;_.referencePosition.value.setFromMatrixPosition(S.matrixWorld),_.nearDistance.value=S.shadow.camera.near,_.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Tb(i,t,e,n){let s={},o={},l=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function u(S,w){const T=w.program;n.uniformBlockBinding(S,T)}function h(S,w){let T=s[S.id];T===void 0&&(y(S),T=f(S),s[S.id]=T,S.addEventListener("dispose",_));const k=w.program;n.updateUBOMapping(S,k);const O=t.render.frame;o[S.id]!==O&&(g(S),o[S.id]=O)}function f(S){const w=p();S.__bindingPointIndex=w;const T=i.createBuffer(),k=S.__size,O=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,k,O),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,T),T}function p(){for(let S=0;S<c;S++)if(l.indexOf(S)===-1)return l.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function g(S){const w=s[S.id],T=S.uniforms,k=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let O=0,D=T.length;O<D;O++){const z=Array.isArray(T[O])?T[O]:[T[O]];for(let I=0,R=z.length;I<R;I++){const G=z[I];if(m(G,O,I,k)===!0){const U=G.__offset,F=Array.isArray(G.value)?G.value:[G.value];let E=0;for(let Z=0;Z<F.length;Z++){const ot=F[Z],rt=x(ot);typeof ot=="number"||typeof ot=="boolean"?(G.__data[0]=ot,i.bufferSubData(i.UNIFORM_BUFFER,U+E,G.__data)):ot.isMatrix3?(G.__data[0]=ot.elements[0],G.__data[1]=ot.elements[1],G.__data[2]=ot.elements[2],G.__data[3]=0,G.__data[4]=ot.elements[3],G.__data[5]=ot.elements[4],G.__data[6]=ot.elements[5],G.__data[7]=0,G.__data[8]=ot.elements[6],G.__data[9]=ot.elements[7],G.__data[10]=ot.elements[8],G.__data[11]=0):(ot.toArray(G.__data,E),E+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,G.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,w,T,k){const O=S.value,D=w+"_"+T;if(k[D]===void 0)return typeof O=="number"||typeof O=="boolean"?k[D]=O:k[D]=O.clone(),!0;{const z=k[D];if(typeof O=="number"||typeof O=="boolean"){if(z!==O)return k[D]=O,!0}else if(z.equals(O)===!1)return z.copy(O),!0}return!1}function y(S){const w=S.uniforms;let T=0;const k=16;for(let D=0,z=w.length;D<z;D++){const I=Array.isArray(w[D])?w[D]:[w[D]];for(let R=0,G=I.length;R<G;R++){const U=I[R],F=Array.isArray(U.value)?U.value:[U.value];for(let E=0,Z=F.length;E<Z;E++){const ot=F[E],rt=x(ot),W=T%k;W!==0&&k-W<rt.boundary&&(T+=k-W),U.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=rt.storage}}}const O=T%k;return O>0&&(T+=k-O),S.__size=T,S.__cache={},this}function x(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function _(S){const w=S.target;w.removeEventListener("dispose",_);const T=l.indexOf(w.__bindingPointIndex);l.splice(T,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function v(){for(const S in s)i.deleteBuffer(s[S]);l=[],s={},o={}}return{bind:u,update:h,dispose:v}}class rp{constructor(t={}){const{canvas:e=v_(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:h=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=l;const m=new Uint32Array(4),y=new Int32Array(4);let x=null,_=null;const v=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=oi,this._useLegacyLights=!1,this.toneMapping=Yi,this.toneMappingExposure=1;const w=this;let T=!1,k=0,O=0,D=null,z=-1,I=null;const R=new Qe,G=new Qe;let U=null;const F=new Kt(0);let E=0,Z=e.width,ot=e.height,rt=1,W=null,it=null;const et=new Qe(0,0,Z,ot),q=new Qe(0,0,Z,ot);let Y=!1;const At=new nu;let tt=!1,st=!1;const wt=new Ce,St=new vt,Pt=new J,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ut(){return D===null?rt:1}let at=n;function xt(V,ct){const gt=e.getContext(V,ct);return gt!==null?gt:null}try{const V={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:h,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Kc}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),at===null){const ct="webgl2";if(at=xt(ct,V),at===null)throw xt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let bt,A,nt,K,P,M,H,j,Q,X,ft,lt,pt,Tt,Et,Lt,Ht,zt,Dt,Qt,Vt,ae,le,ee;function Ft(){bt=new Ny(at),bt.init(),A=new Cy(at,bt,t),ae=new _b(at,bt),nt=new mb(at),K=new zy(at),P=new eb,M=new gb(at,bt,nt,P,A,ae,K),H=new Ry(w),j=new ky(w),Q=new W_(at),le=new Ay(at,Q),X=new Oy(at,Q,K,le),ft=new Fy(at,X,Q,K),Dt=new By(at,A,M),Lt=new Py(P),lt=new tb(w,H,j,bt,A,le,Lt),pt=new Eb(w,P),Tt=new ib,Et=new cb(bt),zt=new Ty(w,H,j,nt,ft,g,u),Ht=new pb(w,ft,A),ee=new Tb(at,K,A,nt),Qt=new Ly(at,bt,K),Vt=new Uy(at,bt,K),K.programs=lt.programs,w.capabilities=A,w.extensions=bt,w.properties=P,w.renderLists=Tt,w.shadowMap=Ht,w.state=nt,w.info=K}Ft();const N=new Mb(w,at);this.xr=N,this.getContext=function(){return at},this.getContextAttributes=function(){return at.getContextAttributes()},this.forceContextLoss=function(){const V=bt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=bt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return rt},this.setPixelRatio=function(V){V!==void 0&&(rt=V,this.setSize(Z,ot,!1))},this.getSize=function(V){return V.set(Z,ot)},this.setSize=function(V,ct,gt=!0){if(N.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=V,ot=ct,e.width=Math.floor(V*rt),e.height=Math.floor(ct*rt),gt===!0&&(e.style.width=V+"px",e.style.height=ct+"px"),this.setViewport(0,0,V,ct)},this.getDrawingBufferSize=function(V){return V.set(Z*rt,ot*rt).floor()},this.setDrawingBufferSize=function(V,ct,gt){Z=V,ot=ct,rt=gt,e.width=Math.floor(V*gt),e.height=Math.floor(ct*gt),this.setViewport(0,0,V,ct)},this.getCurrentViewport=function(V){return V.copy(R)},this.getViewport=function(V){return V.copy(et)},this.setViewport=function(V,ct,gt,_t){V.isVector4?et.set(V.x,V.y,V.z,V.w):et.set(V,ct,gt,_t),nt.viewport(R.copy(et).multiplyScalar(rt).round())},this.getScissor=function(V){return V.copy(q)},this.setScissor=function(V,ct,gt,_t){V.isVector4?q.set(V.x,V.y,V.z,V.w):q.set(V,ct,gt,_t),nt.scissor(G.copy(q).multiplyScalar(rt).round())},this.getScissorTest=function(){return Y},this.setScissorTest=function(V){nt.setScissorTest(Y=V)},this.setOpaqueSort=function(V){W=V},this.setTransparentSort=function(V){it=V},this.getClearColor=function(V){return V.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(V=!0,ct=!0,gt=!0){let _t=0;if(V){let dt=!1;if(D!==null){const Ot=D.texture.format;dt=Ot===Uf||Ot===Of||Ot===Nf}if(dt){const Ot=D.texture.type,Zt=Ot===Ki||Ot===Es||Ot===Rf||Ot===Eo||Ot===Df||Ot===kf,qt=zt.getClearColor(),jt=zt.getClearAlpha(),ne=qt.r,te=qt.g,ie=qt.b;Zt?(m[0]=ne,m[1]=te,m[2]=ie,m[3]=jt,at.clearBufferuiv(at.COLOR,0,m)):(y[0]=ne,y[1]=te,y[2]=ie,y[3]=jt,at.clearBufferiv(at.COLOR,0,y))}else _t|=at.COLOR_BUFFER_BIT}ct&&(_t|=at.DEPTH_BUFFER_BIT),gt&&(_t|=at.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),at.clear(_t)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Tt.dispose(),Et.dispose(),P.dispose(),H.dispose(),j.dispose(),ft.dispose(),le.dispose(),ee.dispose(),lt.dispose(),N.dispose(),N.removeEventListener("sessionstart",De),N.removeEventListener("sessionend",Ae),cn.stop()};function ht(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const V=K.autoReset,ct=Ht.enabled,gt=Ht.autoUpdate,_t=Ht.needsUpdate,dt=Ht.type;Ft(),K.autoReset=V,Ht.enabled=ct,Ht.autoUpdate=gt,Ht.needsUpdate=_t,Ht.type=dt}function Rt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function kt(V){const ct=V.target;ct.removeEventListener("dispose",kt),se(ct)}function se(V){he(V),P.remove(V)}function he(V){const ct=P.get(V).programs;ct!==void 0&&(ct.forEach(function(gt){lt.releaseProgram(gt)}),V.isShaderMaterial&&lt.releaseShaderCache(V))}this.renderBufferDirect=function(V,ct,gt,_t,dt,Ot){ct===null&&(ct=It);const Zt=dt.isMesh&&dt.matrixWorld.determinant()<0,qt=Ro(V,ct,gt,_t,dt);nt.setMaterial(_t,Zt);let jt=gt.index,ne=1;if(_t.wireframe===!0){if(jt=X.getWireframeAttribute(gt),jt===void 0)return;ne=2}const te=gt.drawRange,ie=gt.attributes.position;let Pe=te.start*ne,un=(te.start+te.count)*ne;Ot!==null&&(Pe=Math.max(Pe,Ot.start*ne),un=Math.min(un,(Ot.start+Ot.count)*ne)),jt!==null?(Pe=Math.max(Pe,0),un=Math.min(un,jt.count)):ie!=null&&(Pe=Math.max(Pe,0),un=Math.min(un,ie.count));const ke=un-Pe;if(ke<0||ke===1/0)return;le.setup(dt,_t,qt,gt,jt);let hn,we=Qt;if(jt!==null&&(hn=Q.get(jt),we=Vt,we.setIndex(hn)),dt.isMesh)_t.wireframe===!0?(nt.setLineWidth(_t.wireframeLinewidth*Ut()),we.setMode(at.LINES)):we.setMode(at.TRIANGLES);else if(dt.isLine){let re=_t.linewidth;re===void 0&&(re=1),nt.setLineWidth(re*Ut()),dt.isLineSegments?we.setMode(at.LINES):dt.isLineLoop?we.setMode(at.LINE_LOOP):we.setMode(at.LINE_STRIP)}else dt.isPoints?we.setMode(at.POINTS):dt.isSprite&&we.setMode(at.TRIANGLES);if(dt.isBatchedMesh)we.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)we.renderInstances(Pe,ke,dt.count);else if(gt.isInstancedBufferGeometry){const re=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,mi=Math.min(gt.instanceCount,re);we.renderInstances(Pe,ke,mi)}else we.render(Pe,ke)};function be(V,ct,gt){V.transparent===!0&&V.side===ln&&V.forceSinglePass===!1?(V.side=Tn,V.needsUpdate=!0,nr(V,ct,gt),V.side=Qi,V.needsUpdate=!0,nr(V,ct,gt),V.side=ln):nr(V,ct,gt)}this.compile=function(V,ct,gt=null){gt===null&&(gt=V),_=Et.get(gt),_.init(),S.push(_),gt.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(_.pushLight(dt),dt.castShadow&&_.pushShadow(dt))}),V!==gt&&V.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(_.pushLight(dt),dt.castShadow&&_.pushShadow(dt))}),_.setupLights(w._useLegacyLights);const _t=new Set;return V.traverse(function(dt){const Ot=dt.material;if(Ot)if(Array.isArray(Ot))for(let Zt=0;Zt<Ot.length;Zt++){const qt=Ot[Zt];be(qt,gt,dt),_t.add(qt)}else be(Ot,gt,dt),_t.add(Ot)}),S.pop(),_=null,_t},this.compileAsync=function(V,ct,gt=null){const _t=this.compile(V,ct,gt);return new Promise(dt=>{function Ot(){if(_t.forEach(function(Zt){P.get(Zt).currentProgram.isReady()&&_t.delete(Zt)}),_t.size===0){dt(V);return}setTimeout(Ot,10)}bt.get("KHR_parallel_shader_compile")!==null?Ot():setTimeout(Ot,10)})};let Fe=null;function ve(V){Fe&&Fe(V)}function De(){cn.stop()}function Ae(){cn.start()}const cn=new Yf;cn.setAnimationLoop(ve),typeof self<"u"&&cn.setContext(self),this.setAnimationLoop=function(V){Fe=V,N.setAnimationLoop(V),V===null?cn.stop():cn.start()},N.addEventListener("sessionstart",De),N.addEventListener("sessionend",Ae),this.render=function(V,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),N.enabled===!0&&N.isPresenting===!0&&(N.cameraAutoUpdate===!0&&N.updateCamera(ct),ct=N.getCamera()),V.isScene===!0&&V.onBeforeRender(w,V,ct,D),_=Et.get(V,S.length),_.init(),S.push(_),wt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),At.setFromProjectionMatrix(wt),st=this.localClippingEnabled,tt=Lt.init(this.clippingPlanes,st),x=Tt.get(V,v.length),x.init(),v.push(x),vn(V,ct,0,w.sortObjects),x.finish(),w.sortObjects===!0&&x.sort(W,it),this.info.render.frame++,tt===!0&&Lt.beginShadows();const gt=_.state.shadowsArray;if(Ht.render(gt,V,ct),tt===!0&&Lt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(N.enabled===!1||N.isPresenting===!1||N.hasDepthSensing()===!1)&&zt.render(x,V),_.setupLights(w._useLegacyLights),ct.isArrayCamera){const _t=ct.cameras;for(let dt=0,Ot=_t.length;dt<Ot;dt++){const Zt=_t[dt];ei(x,V,Zt,Zt.viewport)}}else ei(x,V,ct);D!==null&&(M.updateMultisampleRenderTarget(D),M.updateRenderTargetMipmap(D)),V.isScene===!0&&V.onAfterRender(w,V,ct),le.resetDefaultState(),z=-1,I=null,S.pop(),S.length>0?_=S[S.length-1]:_=null,v.pop(),v.length>0?x=v[v.length-1]:x=null};function vn(V,ct,gt,_t){if(V.visible===!1)return;if(V.layers.test(ct.layers)){if(V.isGroup)gt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(ct);else if(V.isLight)_.pushLight(V),V.castShadow&&_.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||At.intersectsSprite(V)){_t&&Pt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(wt);const Zt=ft.update(V),qt=V.material;qt.visible&&x.push(V,Zt,qt,gt,Pt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||At.intersectsObject(V))){const Zt=ft.update(V),qt=V.material;if(_t&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),Pt.copy(V.boundingSphere.center)):(Zt.boundingSphere===null&&Zt.computeBoundingSphere(),Pt.copy(Zt.boundingSphere.center)),Pt.applyMatrix4(V.matrixWorld).applyMatrix4(wt)),Array.isArray(qt)){const jt=Zt.groups;for(let ne=0,te=jt.length;ne<te;ne++){const ie=jt[ne],Pe=qt[ie.materialIndex];Pe&&Pe.visible&&x.push(V,Zt,Pe,gt,Pt.z,ie)}}else qt.visible&&x.push(V,Zt,qt,gt,Pt.z,null)}}const Ot=V.children;for(let Zt=0,qt=Ot.length;Zt<qt;Zt++)vn(Ot[Zt],ct,gt,_t)}function ei(V,ct,gt,_t){const dt=V.opaque,Ot=V.transmissive,Zt=V.transparent;_.setupLightsView(gt),tt===!0&&Lt.setGlobalState(w.clippingPlanes,gt),Ot.length>0&&ki(dt,Ot,ct,gt),_t&&nt.viewport(R.copy(_t)),dt.length>0&&qe(dt,ct,gt),Ot.length>0&&qe(Ot,ct,gt),Zt.length>0&&qe(Zt,ct,gt),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function ki(V,ct,gt,_t){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget===null){_.state.transmissionRenderTarget=new Tr(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?Ia:Ki,minFilter:wr,samples:4,stencilBuffer:o});const ne=P.get(_.state.transmissionRenderTarget);ne.__isTransmissionRenderTarget=!0}const Ot=_.state.transmissionRenderTarget;w.getDrawingBufferSize(St),Ot.setSize(St.x,St.y);const Zt=w.getRenderTarget();w.setRenderTarget(Ot),w.getClearColor(F),E=w.getClearAlpha(),E<1&&w.setClearColor(16777215,.5),w.clear();const qt=w.toneMapping;w.toneMapping=Yi,qe(V,gt,_t),M.updateMultisampleRenderTarget(Ot),M.updateRenderTargetMipmap(Ot);let jt=!1;for(let ne=0,te=ct.length;ne<te;ne++){const ie=ct[ne],Pe=ie.object,un=ie.geometry,ke=ie.material,hn=ie.group;if(ke.side===ln&&Pe.layers.test(_t.layers)){const we=ke.side;ke.side=Tn,ke.needsUpdate=!0,Wt(Pe,gt,_t,un,ke,hn),ke.side=we,ke.needsUpdate=!0,jt=!0}}jt===!0&&(M.updateMultisampleRenderTarget(Ot),M.updateRenderTargetMipmap(Ot)),w.setRenderTarget(Zt),w.setClearColor(F,E),w.toneMapping=qt}function qe(V,ct,gt){const _t=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,Ot=V.length;dt<Ot;dt++){const Zt=V[dt],qt=Zt.object,jt=Zt.geometry,ne=_t===null?Zt.material:_t,te=Zt.group;qt.layers.test(gt.layers)&&Wt(qt,ct,gt,jt,ne,te)}}function Wt(V,ct,gt,_t,dt,Ot){V.onBeforeRender(w,ct,gt,_t,dt,Ot),V.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),dt.onBeforeRender(w,ct,gt,_t,V,Ot),dt.transparent===!0&&dt.side===ln&&dt.forceSinglePass===!1?(dt.side=Tn,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,Ot),dt.side=Qi,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,Ot),dt.side=ln):w.renderBufferDirect(gt,ct,_t,dt,V,Ot),V.onAfterRender(w,ct,gt,_t,dt,Ot)}function nr(V,ct,gt){ct.isScene!==!0&&(ct=It);const _t=P.get(V),dt=_.state.lights,Ot=_.state.shadowsArray,Zt=dt.state.version,qt=lt.getParameters(V,dt.state,Ot,ct,gt),jt=lt.getProgramCacheKey(qt);let ne=_t.programs;_t.environment=V.isMeshStandardMaterial?ct.environment:null,_t.fog=ct.fog,_t.envMap=(V.isMeshStandardMaterial?j:H).get(V.envMap||_t.environment),_t.envMapRotation=_t.environment!==null&&V.envMap===null?ct.environmentRotation:V.envMapRotation,ne===void 0&&(V.addEventListener("dispose",kt),ne=new Map,_t.programs=ne);let te=ne.get(jt);if(te!==void 0){if(_t.currentProgram===te&&_t.lightsStateVersion===Zt)return ks(V,qt),te}else qt.uniforms=lt.getUniforms(V),V.onBuild(gt,qt,w),V.onBeforeCompile(qt,w),te=lt.acquireProgram(qt,jt),ne.set(jt,te),_t.uniforms=qt.uniforms;const ie=_t.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(ie.clippingPlanes=Lt.uniform),ks(V,qt),_t.needsLights=Io(V),_t.lightsStateVersion=Zt,_t.needsLights&&(ie.ambientLightColor.value=dt.state.ambient,ie.lightProbe.value=dt.state.probe,ie.directionalLights.value=dt.state.directional,ie.directionalLightShadows.value=dt.state.directionalShadow,ie.spotLights.value=dt.state.spot,ie.spotLightShadows.value=dt.state.spotShadow,ie.rectAreaLights.value=dt.state.rectArea,ie.ltc_1.value=dt.state.rectAreaLTC1,ie.ltc_2.value=dt.state.rectAreaLTC2,ie.pointLights.value=dt.state.point,ie.pointLightShadows.value=dt.state.pointShadow,ie.hemisphereLights.value=dt.state.hemi,ie.directionalShadowMap.value=dt.state.directionalShadowMap,ie.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,ie.spotShadowMap.value=dt.state.spotShadowMap,ie.spotLightMatrix.value=dt.state.spotLightMatrix,ie.spotLightMap.value=dt.state.spotLightMap,ie.pointShadowMap.value=dt.state.pointShadowMap,ie.pointShadowMatrix.value=dt.state.pointShadowMatrix),_t.currentProgram=te,_t.uniformsList=null,te}function Ds(V){if(V.uniformsList===null){const ct=V.currentProgram.getUniforms();V.uniformsList=La.seqWithValue(ct.seq,V.uniforms)}return V.uniformsList}function ks(V,ct){const gt=P.get(V);gt.outputColorSpace=ct.outputColorSpace,gt.batching=ct.batching,gt.instancing=ct.instancing,gt.instancingColor=ct.instancingColor,gt.instancingMorph=ct.instancingMorph,gt.skinning=ct.skinning,gt.morphTargets=ct.morphTargets,gt.morphNormals=ct.morphNormals,gt.morphColors=ct.morphColors,gt.morphTargetsCount=ct.morphTargetsCount,gt.numClippingPlanes=ct.numClippingPlanes,gt.numIntersection=ct.numClipIntersection,gt.vertexAlphas=ct.vertexAlphas,gt.vertexTangents=ct.vertexTangents,gt.toneMapping=ct.toneMapping}function Ro(V,ct,gt,_t,dt){ct.isScene!==!0&&(ct=It),M.resetTextureUnits();const Ot=ct.fog,Zt=_t.isMeshStandardMaterial?ct.environment:null,qt=D===null?w.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:er,jt=(_t.isMeshStandardMaterial?j:H).get(_t.envMap||Zt),ne=_t.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,te=!!gt.attributes.tangent&&(!!_t.normalMap||_t.anisotropy>0),ie=!!gt.morphAttributes.position,Pe=!!gt.morphAttributes.normal,un=!!gt.morphAttributes.color;let ke=Yi;_t.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ke=w.toneMapping);const hn=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,we=hn!==void 0?hn.length:0,re=P.get(_t),mi=_.state.lights;if(tt===!0&&(st===!0||V!==I)){const rn=V===I&&_t.id===z;Lt.setState(_t,V,rn)}let Xt=!1;_t.version===re.__version?(re.needsLights&&re.lightsStateVersion!==mi.state.version||re.outputColorSpace!==qt||dt.isBatchedMesh&&re.batching===!1||!dt.isBatchedMesh&&re.batching===!0||dt.isInstancedMesh&&re.instancing===!1||!dt.isInstancedMesh&&re.instancing===!0||dt.isSkinnedMesh&&re.skinning===!1||!dt.isSkinnedMesh&&re.skinning===!0||dt.isInstancedMesh&&re.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&re.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&re.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&re.instancingMorph===!1&&dt.morphTexture!==null||re.envMap!==jt||_t.fog===!0&&re.fog!==Ot||re.numClippingPlanes!==void 0&&(re.numClippingPlanes!==Lt.numPlanes||re.numIntersection!==Lt.numIntersection)||re.vertexAlphas!==ne||re.vertexTangents!==te||re.morphTargets!==ie||re.morphNormals!==Pe||re.morphColors!==un||re.toneMapping!==ke||re.morphTargetsCount!==we)&&(Xt=!0):(Xt=!0,re.__version=_t.version);let ge=re.currentProgram;Xt===!0&&(ge=nr(_t,ct,dt));let ir=!1,Nn=!1,ni=!1;const He=ge.getUniforms(),$t=re.uniforms;if(nt.useProgram(ge.program)&&(ir=!0,Nn=!0,ni=!0),_t.id!==z&&(z=_t.id,Nn=!0),ir||I!==V){He.setValue(at,"projectionMatrix",V.projectionMatrix),He.setValue(at,"viewMatrix",V.matrixWorldInverse);const rn=He.map.cameraPosition;rn!==void 0&&rn.setValue(at,Pt.setFromMatrixPosition(V.matrixWorld)),A.logarithmicDepthBuffer&&He.setValue(at,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(_t.isMeshPhongMaterial||_t.isMeshToonMaterial||_t.isMeshLambertMaterial||_t.isMeshBasicMaterial||_t.isMeshStandardMaterial||_t.isShaderMaterial)&&He.setValue(at,"isOrthographic",V.isOrthographicCamera===!0),I!==V&&(I=V,Nn=!0,ni=!0)}if(dt.isSkinnedMesh){He.setOptional(at,dt,"bindMatrix"),He.setOptional(at,dt,"bindMatrixInverse");const rn=dt.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),He.setValue(at,"boneTexture",rn.boneTexture,M))}dt.isBatchedMesh&&(He.setOptional(at,dt,"batchingTexture"),He.setValue(at,"batchingTexture",dt._matricesTexture,M));const Se=gt.morphAttributes;if((Se.position!==void 0||Se.normal!==void 0||Se.color!==void 0)&&Dt.update(dt,gt,ge),(Nn||re.receiveShadow!==dt.receiveShadow)&&(re.receiveShadow=dt.receiveShadow,He.setValue(at,"receiveShadow",dt.receiveShadow)),_t.isMeshGouraudMaterial&&_t.envMap!==null&&($t.envMap.value=jt,$t.flipEnvMap.value=jt.isCubeTexture&&jt.isRenderTargetTexture===!1?-1:1),_t.isMeshStandardMaterial&&_t.envMap===null&&ct.environment!==null&&($t.envMapIntensity.value=ct.environmentIntensity),Nn&&(He.setValue(at,"toneMappingExposure",w.toneMappingExposure),re.needsLights&&Ns($t,ni),Ot&&_t.fog===!0&&pt.refreshFogUniforms($t,Ot),pt.refreshMaterialUniforms($t,_t,rt,ot,_.state.transmissionRenderTarget),La.upload(at,Ds(re),$t,M)),_t.isShaderMaterial&&_t.uniformsNeedUpdate===!0&&(La.upload(at,Ds(re),$t,M),_t.uniformsNeedUpdate=!1),_t.isSpriteMaterial&&He.setValue(at,"center",dt.center),He.setValue(at,"modelViewMatrix",dt.modelViewMatrix),He.setValue(at,"normalMatrix",dt.normalMatrix),He.setValue(at,"modelMatrix",dt.matrixWorld),_t.isShaderMaterial||_t.isRawShaderMaterial){const rn=_t.uniformsGroups;for(let Ni=0,yn=rn.length;Ni<yn;Ni++){const Do=rn[Ni];ee.update(Do,ge),ee.bind(Do,ge)}}return ge}function Ns(V,ct){V.ambientLightColor.needsUpdate=ct,V.lightProbe.needsUpdate=ct,V.directionalLights.needsUpdate=ct,V.directionalLightShadows.needsUpdate=ct,V.pointLights.needsUpdate=ct,V.pointLightShadows.needsUpdate=ct,V.spotLights.needsUpdate=ct,V.spotLightShadows.needsUpdate=ct,V.rectAreaLights.needsUpdate=ct,V.hemisphereLights.needsUpdate=ct}function Io(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(V,ct,gt){P.get(V.texture).__webglTexture=ct,P.get(V.depthTexture).__webglTexture=gt;const _t=P.get(V);_t.__hasExternalTextures=!0,_t.__autoAllocateDepthBuffer=gt===void 0,_t.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),_t.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,ct){const gt=P.get(V);gt.__webglFramebuffer=ct,gt.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(V,ct=0,gt=0){D=V,k=ct,O=gt;let _t=!0,dt=null,Ot=!1,Zt=!1;if(V){const jt=P.get(V);jt.__useDefaultFramebuffer!==void 0?(nt.bindFramebuffer(at.FRAMEBUFFER,null),_t=!1):jt.__webglFramebuffer===void 0?M.setupRenderTarget(V):jt.__hasExternalTextures&&M.rebindTextures(V,P.get(V.texture).__webglTexture,P.get(V.depthTexture).__webglTexture);const ne=V.texture;(ne.isData3DTexture||ne.isDataArrayTexture||ne.isCompressedArrayTexture)&&(Zt=!0);const te=P.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(te[ct])?dt=te[ct][gt]:dt=te[ct],Ot=!0):V.samples>0&&M.useMultisampledRTT(V)===!1?dt=P.get(V).__webglMultisampledFramebuffer:Array.isArray(te)?dt=te[gt]:dt=te,R.copy(V.viewport),G.copy(V.scissor),U=V.scissorTest}else R.copy(et).multiplyScalar(rt).floor(),G.copy(q).multiplyScalar(rt).floor(),U=Y;if(nt.bindFramebuffer(at.FRAMEBUFFER,dt)&&_t&&nt.drawBuffers(V,dt),nt.viewport(R),nt.scissor(G),nt.setScissorTest(U),Ot){const jt=P.get(V.texture);at.framebufferTexture2D(at.FRAMEBUFFER,at.COLOR_ATTACHMENT0,at.TEXTURE_CUBE_MAP_POSITIVE_X+ct,jt.__webglTexture,gt)}else if(Zt){const jt=P.get(V.texture),ne=ct||0;at.framebufferTextureLayer(at.FRAMEBUFFER,at.COLOR_ATTACHMENT0,jt.__webglTexture,gt||0,ne)}z=-1},this.readRenderTargetPixels=function(V,ct,gt,_t,dt,Ot,Zt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=P.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Zt!==void 0&&(qt=qt[Zt]),qt){nt.bindFramebuffer(at.FRAMEBUFFER,qt);try{const jt=V.texture,ne=jt.format,te=jt.type;if(ne!==ci&&ae.convert(ne)!==at.getParameter(at.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ie=te===Ia&&(bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float"));if(te!==Ki&&ae.convert(te)!==at.getParameter(at.IMPLEMENTATION_COLOR_READ_TYPE)&&te!==qi&&!ie){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=V.width-_t&&gt>=0&&gt<=V.height-dt&&at.readPixels(ct,gt,_t,dt,ae.convert(ne),ae.convert(te),Ot)}finally{const jt=D!==null?P.get(D).__webglFramebuffer:null;nt.bindFramebuffer(at.FRAMEBUFFER,jt)}}},this.copyFramebufferToTexture=function(V,ct,gt=0){const _t=Math.pow(2,-gt),dt=Math.floor(ct.image.width*_t),Ot=Math.floor(ct.image.height*_t);M.setTexture2D(ct,0),at.copyTexSubImage2D(at.TEXTURE_2D,gt,0,0,V.x,V.y,dt,Ot),nt.unbindTexture()},this.copyTextureToTexture=function(V,ct,gt,_t=0){const dt=ct.image.width,Ot=ct.image.height,Zt=ae.convert(gt.format),qt=ae.convert(gt.type);M.setTexture2D(gt,0),at.pixelStorei(at.UNPACK_FLIP_Y_WEBGL,gt.flipY),at.pixelStorei(at.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),at.pixelStorei(at.UNPACK_ALIGNMENT,gt.unpackAlignment),ct.isDataTexture?at.texSubImage2D(at.TEXTURE_2D,_t,V.x,V.y,dt,Ot,Zt,qt,ct.image.data):ct.isCompressedTexture?at.compressedTexSubImage2D(at.TEXTURE_2D,_t,V.x,V.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Zt,ct.mipmaps[0].data):at.texSubImage2D(at.TEXTURE_2D,_t,V.x,V.y,Zt,qt,ct.image),_t===0&&gt.generateMipmaps&&at.generateMipmap(at.TEXTURE_2D),nt.unbindTexture()},this.copyTextureToTexture3D=function(V,ct,gt,_t,dt=0){const Ot=Math.round(V.max.x-V.min.x),Zt=Math.round(V.max.y-V.min.y),qt=V.max.z-V.min.z+1,jt=ae.convert(_t.format),ne=ae.convert(_t.type);let te;if(_t.isData3DTexture)M.setTexture3D(_t,0),te=at.TEXTURE_3D;else if(_t.isDataArrayTexture||_t.isCompressedArrayTexture)M.setTexture2DArray(_t,0),te=at.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}at.pixelStorei(at.UNPACK_FLIP_Y_WEBGL,_t.flipY),at.pixelStorei(at.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),at.pixelStorei(at.UNPACK_ALIGNMENT,_t.unpackAlignment);const ie=at.getParameter(at.UNPACK_ROW_LENGTH),Pe=at.getParameter(at.UNPACK_IMAGE_HEIGHT),un=at.getParameter(at.UNPACK_SKIP_PIXELS),ke=at.getParameter(at.UNPACK_SKIP_ROWS),hn=at.getParameter(at.UNPACK_SKIP_IMAGES),we=gt.isCompressedTexture?gt.mipmaps[dt]:gt.image;at.pixelStorei(at.UNPACK_ROW_LENGTH,we.width),at.pixelStorei(at.UNPACK_IMAGE_HEIGHT,we.height),at.pixelStorei(at.UNPACK_SKIP_PIXELS,V.min.x),at.pixelStorei(at.UNPACK_SKIP_ROWS,V.min.y),at.pixelStorei(at.UNPACK_SKIP_IMAGES,V.min.z),gt.isDataTexture||gt.isData3DTexture?at.texSubImage3D(te,dt,ct.x,ct.y,ct.z,Ot,Zt,qt,jt,ne,we.data):_t.isCompressedArrayTexture?at.compressedTexSubImage3D(te,dt,ct.x,ct.y,ct.z,Ot,Zt,qt,jt,we.data):at.texSubImage3D(te,dt,ct.x,ct.y,ct.z,Ot,Zt,qt,jt,ne,we),at.pixelStorei(at.UNPACK_ROW_LENGTH,ie),at.pixelStorei(at.UNPACK_IMAGE_HEIGHT,Pe),at.pixelStorei(at.UNPACK_SKIP_PIXELS,un),at.pixelStorei(at.UNPACK_SKIP_ROWS,ke),at.pixelStorei(at.UNPACK_SKIP_IMAGES,hn),dt===0&&_t.generateMipmaps&&at.generateMipmap(te),nt.unbindTexture()},this.initTexture=function(V){V.isCubeTexture?M.setTextureCube(V,0):V.isData3DTexture?M.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?M.setTexture2DArray(V,0):M.setTexture2D(V,0),nt.unbindTexture()},this.resetState=function(){k=0,O=0,D=null,nt.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===tu?"display-p3":"srgb",e.unpackColorSpace=xe.workingColorSpace===Qa?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class sp extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class il extends Pr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Bd=new J,Fd=new J,Hd=new Ce,uc=new el,_a=new tl;class ru extends nn{constructor(t=new Oe,e=new il){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)Bd.fromBufferAttribute(e,s-1),Fd.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Bd.distanceTo(Fd);t.setAttribute("lineDistance",new ye(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_a.copy(n.boundingSphere),_a.applyMatrix4(s),_a.radius+=o,t.ray.intersectsSphere(_a)===!1)return;Hd.copy(s).invert(),uc.copy(t.ray).applyMatrix4(Hd);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,h=new J,f=new J,p=new J,g=new J,m=this.isLineSegments?2:1,y=n.index,_=n.attributes.position;if(y!==null){const v=Math.max(0,l.start),S=Math.min(y.count,l.start+l.count);for(let w=v,T=S-1;w<T;w+=m){const k=y.getX(w),O=y.getX(w+1);if(h.fromBufferAttribute(_,k),f.fromBufferAttribute(_,O),uc.distanceSqToSegment(h,f,g,p)>u)continue;g.applyMatrix4(this.matrixWorld);const z=t.ray.origin.distanceTo(g);z<t.near||z>t.far||e.push({distance:z,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,l.start),S=Math.min(_.count,l.start+l.count);for(let w=v,T=S-1;w<T;w+=m){if(h.fromBufferAttribute(_,w),f.fromBufferAttribute(_,w+1),uc.distanceSqToSegment(h,f,g,p)>u)continue;g.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(g);O<t.near||O>t.far||e.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const Vd=new J,Gd=new J;class Ab extends ru{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)Vd.fromBufferAttribute(e,s),Gd.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Vd.distanceTo(Gd);t.setAttribute("lineDistance",new ye(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class op extends gn{constructor(t,e,n,s,o,l,c,u,h){super(t,e,n,s,o,l,c,u,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class pi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,u=o-1,h;for(;c<=u;)if(s=Math.floor(c+(u-c)/2),h=n[s]-l,h<0)c=s+1;else if(h>0)u=s-1;else{u=s;break}if(s=u,n[s]===l)return s/(o-1);const f=n[s],g=n[s+1]-f,m=(l-f)/g;return(s+m)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),u=e||(l.isVector2?new vt:new J);return u.copy(c).sub(l).normalize(),u}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new J,s=[],o=[],l=[],c=new J,u=new Ce;for(let m=0;m<=t;m++){const y=m/t;s[m]=this.getTangentAt(y,new J)}o[0]=new J,l[0]=new J;let h=Number.MAX_VALUE;const f=Math.abs(s[0].x),p=Math.abs(s[0].y),g=Math.abs(s[0].z);f<=h&&(h=f,n.set(1,0,0)),p<=h&&(h=p,n.set(0,1,0)),g<=h&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),l[m]=l[m-1].clone(),c.crossVectors(s[m-1],s[m]),c.length()>Number.EPSILON){c.normalize();const y=Math.acos(Je(s[m-1].dot(s[m]),-1,1));o[m].applyMatrix4(u.makeRotationAxis(c,y))}l[m].crossVectors(s[m],o[m])}if(e===!0){let m=Math.acos(Je(o[0].dot(o[t]),-1,1));m/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(m=-m);for(let y=1;y<=t;y++)o[y].applyMatrix4(u.makeRotationAxis(s[y],m*y)),l[y].crossVectors(s[y],o[y])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class su extends pi{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new vt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let u=this.aX+this.xRadius*Math.cos(c),h=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),g=u-this.aX,m=h-this.aY;u=g*f-m*p+this.aX,h=g*p+m*f+this.aY}return n.set(u,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Lb extends su{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function ou(){let i=0,t=0,e=0,n=0;function s(o,l,c,u){i=o,t=c,e=-3*o+3*l-2*c-u,n=2*o-2*l+c+u}return{initCatmullRom:function(o,l,c,u,h){s(l,c,h*(c-o),h*(u-l))},initNonuniformCatmullRom:function(o,l,c,u,h,f,p){let g=(l-o)/h-(c-o)/(h+f)+(c-l)/f,m=(c-l)/f-(u-l)/(f+p)+(u-c)/p;g*=f,m*=f,s(l,c,g,m)},calc:function(o){const l=o*o,c=l*o;return i+t*o+e*l+n*c}}}const va=new J,hc=new ou,dc=new ou,fc=new ou;class Nc extends pi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new J){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),u=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:u===0&&c===o-1&&(c=o-2,u=1);let h,f;this.closed||c>0?h=s[(c-1)%o]:(va.subVectors(s[0],s[1]).add(s[0]),h=va);const p=s[c%o],g=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:(va.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=va),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let y=Math.pow(h.distanceToSquared(p),m),x=Math.pow(p.distanceToSquared(g),m),_=Math.pow(g.distanceToSquared(f),m);x<1e-4&&(x=1),y<1e-4&&(y=x),_<1e-4&&(_=x),hc.initNonuniformCatmullRom(h.x,p.x,g.x,f.x,y,x,_),dc.initNonuniformCatmullRom(h.y,p.y,g.y,f.y,y,x,_),fc.initNonuniformCatmullRom(h.z,p.z,g.z,f.z,y,x,_)}else this.curveType==="catmullrom"&&(hc.initCatmullRom(h.x,p.x,g.x,f.x,this.tension),dc.initCatmullRom(h.y,p.y,g.y,f.y,this.tension),fc.initCatmullRom(h.z,p.z,g.z,f.z,this.tension));return n.set(hc.calc(u),dc.calc(u),fc.calc(u)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new J().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Wd(i,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=i*i,u=i*c;return(2*e-2*n+o+l)*u+(-3*e+3*n-2*o-l)*c+o*i+e}function Cb(i,t){const e=1-i;return e*e*t}function Pb(i,t){return 2*(1-i)*i*t}function Rb(i,t){return i*i*t}function lo(i,t,e,n){return Cb(i,t)+Pb(i,e)+Rb(i,n)}function Ib(i,t){const e=1-i;return e*e*e*t}function Db(i,t){const e=1-i;return 3*e*e*i*t}function kb(i,t){return 3*(1-i)*i*i*t}function Nb(i,t){return i*i*i*t}function co(i,t,e,n,s){return Ib(i,t)+Db(i,e)+kb(i,n)+Nb(i,s)}class ap extends pi{constructor(t=new vt,e=new vt,n=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(co(t,s.x,o.x,l.x,c.x),co(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ob extends pi{constructor(t=new J,e=new J,n=new J,s=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new J){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(co(t,s.x,o.x,l.x,c.x),co(t,s.y,o.y,l.y,c.y),co(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class lp extends pi{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ub extends pi{constructor(t=new J,e=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new J){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new J){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class cp extends pi{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(lo(t,s.x,o.x,l.x),lo(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class up extends pi{constructor(t=new J,e=new J,n=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new J){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(lo(t,s.x,o.x,l.x),lo(t,s.y,o.y,l.y),lo(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hp extends pi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,u=s[l===0?l:l-1],h=s[l],f=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(Wd(c,u.x,h.x,f.x,p.x),Wd(c,u.y,h.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var za=Object.freeze({__proto__:null,ArcCurve:Lb,CatmullRomCurve3:Nc,CubicBezierCurve:ap,CubicBezierCurve3:Ob,EllipseCurve:su,LineCurve:lp,LineCurve3:Ub,QuadraticBezierCurve:cp,QuadraticBezierCurve3:up,SplineCurve:hp});class zb extends pi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new za[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],u=c.getLength(),h=u===0?0:1-l/u;return c.getPointAt(h,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,u=l.getPoints(c);for(let h=0;h<u.length;h++){const f=u[h];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new za[s.type]().fromJSON(s))}return this}}class Zd extends zb{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new lp(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new cp(this.currentPoint.clone(),new vt(t,e),new vt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new ap(this.currentPoint.clone(),new vt(t,e),new vt(n,s),new vt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new hp(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,u){const h=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+h,e+f,n,s,o,l,c,u),this}absellipse(t,e,n,s,o,l,c,u){const h=new su(t,e,n,s,o,l,c,u);if(this.curves.length>0){const p=h.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(h);const f=h.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class yr extends Oe{constructor(t=[new vt(0,-.5),new vt(.5,0),new vt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Je(s,0,Math.PI*2);const o=[],l=[],c=[],u=[],h=[],f=1/e,p=new J,g=new vt,m=new J,y=new J,x=new J;let _=0,v=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:_=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-_,m.z=v*0,x.copy(m),m.normalize(),u.push(m.x,m.y,m.z);break;case t.length-1:u.push(x.x,x.y,x.z);break;default:_=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-_,m.z=v*0,y.copy(m),m.x+=x.x,m.y+=x.y,m.z+=x.z,m.normalize(),u.push(m.x,m.y,m.z),x.copy(y)}for(let S=0;S<=e;S++){const w=n+S*f*s,T=Math.sin(w),k=Math.cos(w);for(let O=0;O<=t.length-1;O++){p.x=t[O].x*T,p.y=t[O].y,p.z=t[O].x*k,l.push(p.x,p.y,p.z),g.x=S/e,g.y=O/(t.length-1),c.push(g.x,g.y);const D=u[3*O+0]*T,z=u[3*O+1],I=u[3*O+0]*k;h.push(D,z,I)}}for(let S=0;S<e;S++)for(let w=0;w<t.length-1;w++){const T=w+S*t.length,k=T,O=T+t.length,D=T+t.length+1,z=T+1;o.push(k,O,z),o.push(D,z,O)}this.setIndex(o),this.setAttribute("position",new ye(l,3)),this.setAttribute("uv",new ye(c,2)),this.setAttribute("normal",new ye(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yr(t.points,t.segments,t.phiStart,t.phiLength)}}class go extends Oe{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:u};const h=this;s=Math.floor(s),o=Math.floor(o);const f=[],p=[],g=[],m=[];let y=0;const x=[],_=n/2;let v=0;S(),l===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(f),this.setAttribute("position",new ye(p,3)),this.setAttribute("normal",new ye(g,3)),this.setAttribute("uv",new ye(m,2));function S(){const T=new J,k=new J;let O=0;const D=(e-t)/n;for(let z=0;z<=o;z++){const I=[],R=z/o,G=R*(e-t)+t;for(let U=0;U<=s;U++){const F=U/s,E=F*u+c,Z=Math.sin(E),ot=Math.cos(E);k.x=G*Z,k.y=-R*n+_,k.z=G*ot,p.push(k.x,k.y,k.z),T.set(Z,D,ot).normalize(),g.push(T.x,T.y,T.z),m.push(F,1-R),I.push(y++)}x.push(I)}for(let z=0;z<s;z++)for(let I=0;I<o;I++){const R=x[I][z],G=x[I+1][z],U=x[I+1][z+1],F=x[I][z+1];f.push(R,G,F),f.push(G,U,F),O+=6}h.addGroup(v,O,0),v+=O}function w(T){const k=y,O=new vt,D=new J;let z=0;const I=T===!0?t:e,R=T===!0?1:-1;for(let U=1;U<=s;U++)p.push(0,_*R,0),g.push(0,R,0),m.push(.5,.5),y++;const G=y;for(let U=0;U<=s;U++){const E=U/s*u+c,Z=Math.cos(E),ot=Math.sin(E);D.x=I*ot,D.y=_*R,D.z=I*Z,p.push(D.x,D.y,D.z),g.push(0,R,0),O.x=Z*.5+.5,O.y=ot*.5*R+.5,m.push(O.x,O.y),y++}for(let U=0;U<s;U++){const F=k+U,E=G+U;T===!0?f.push(E,E+1,F):f.push(E+1,E,F),z+=3}h.addGroup(v,z,T===!0?1:2),v+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new go(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class au extends go{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new au(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const ya=new J,xa=new J,pc=new J,ba=new Yn;class Bb extends Oe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(ao*e),l=t.getIndex(),c=t.getAttribute("position"),u=l?l.count:c.count,h=[0,0,0],f=["a","b","c"],p=new Array(3),g={},m=[];for(let y=0;y<u;y+=3){l?(h[0]=l.getX(y),h[1]=l.getX(y+1),h[2]=l.getX(y+2)):(h[0]=y,h[1]=y+1,h[2]=y+2);const{a:x,b:_,c:v}=ba;if(x.fromBufferAttribute(c,h[0]),_.fromBufferAttribute(c,h[1]),v.fromBufferAttribute(c,h[2]),ba.getNormal(pc),p[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,p[1]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,p[2]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const w=(S+1)%3,T=p[S],k=p[w],O=ba[f[S]],D=ba[f[w]],z=`${T}_${k}`,I=`${k}_${T}`;I in g&&g[I]?(pc.dot(g[I].normal)<=o&&(m.push(O.x,O.y,O.z),m.push(D.x,D.y,D.z)),g[I]=null):z in g||(g[z]={index0:h[S],index1:h[w],normal:pc.clone()})}}for(const y in g)if(g[y]){const{index0:x,index1:_}=g[y];ya.fromBufferAttribute(c,x),xa.fromBufferAttribute(c,_),m.push(ya.x,ya.y,ya.z),m.push(xa.x,xa.y,xa.z)}this.setAttribute("position",new ye(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Lo extends Zd{constructor(t){super(t),this.uuid=Cs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Zd().fromJSON(s))}return this}}const Fb={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let o=dp(i,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,u,h,f,p,g,m;if(n&&(o=Zb(i,t,o,e)),i.length>80*e){c=h=i[0],u=f=i[1];for(let y=e;y<s;y+=e)p=i[y],g=i[y+1],p<c&&(c=p),g<u&&(u=g),p>h&&(h=p),g>f&&(f=g);m=Math.max(h-c,f-u),m=m!==0?32767/m:0}return _o(o,l,e,c,u,m,0),l}};function dp(i,t,e,n,s){let o,l;if(s===nw(i,t,e,n)>0)for(o=t;o<e;o+=n)l=Xd(o,i[o],i[o+1],l);else for(o=e-n;o>=t;o-=n)l=Xd(o,i[o],i[o+1],l);return l&&rl(l,l.next)&&(yo(l),l=l.next),l}function Lr(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(rl(e,e.next)||Re(e.prev,e,e.next)===0)){if(yo(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function _o(i,t,e,n,s,o,l){if(!i)return;!l&&o&&Yb(i,n,s,o);let c=i,u,h;for(;i.prev!==i.next;){if(u=i.prev,h=i.next,o?Vb(i,n,s,o):Hb(i)){t.push(u.i/e|0),t.push(i.i/e|0),t.push(h.i/e|0),yo(i),i=h.next,c=h.next;continue}if(i=h,i===c){l?l===1?(i=Gb(Lr(i),t,e),_o(i,t,e,n,s,o,2)):l===2&&Wb(i,t,e,n,s,o):_o(Lr(i),t,e,n,s,o,1);break}}}function Hb(i){const t=i.prev,e=i,n=i.next;if(Re(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,u=e.y,h=n.y,f=s<o?s<l?s:l:o<l?o:l,p=c<u?c<h?c:h:u<h?u:h,g=s>o?s>l?s:l:o>l?o:l,m=c>u?c>h?c:h:u>h?u:h;let y=n.next;for(;y!==t;){if(y.x>=f&&y.x<=g&&y.y>=p&&y.y<=m&&fs(s,c,o,u,l,h,y.x,y.y)&&Re(y.prev,y,y.next)>=0)return!1;y=y.next}return!0}function Vb(i,t,e,n){const s=i.prev,o=i,l=i.next;if(Re(s,o,l)>=0)return!1;const c=s.x,u=o.x,h=l.x,f=s.y,p=o.y,g=l.y,m=c<u?c<h?c:h:u<h?u:h,y=f<p?f<g?f:g:p<g?p:g,x=c>u?c>h?c:h:u>h?u:h,_=f>p?f>g?f:g:p>g?p:g,v=Oc(m,y,t,e,n),S=Oc(x,_,t,e,n);let w=i.prevZ,T=i.nextZ;for(;w&&w.z>=v&&T&&T.z<=S;){if(w.x>=m&&w.x<=x&&w.y>=y&&w.y<=_&&w!==s&&w!==l&&fs(c,f,u,p,h,g,w.x,w.y)&&Re(w.prev,w,w.next)>=0||(w=w.prevZ,T.x>=m&&T.x<=x&&T.y>=y&&T.y<=_&&T!==s&&T!==l&&fs(c,f,u,p,h,g,T.x,T.y)&&Re(T.prev,T,T.next)>=0))return!1;T=T.nextZ}for(;w&&w.z>=v;){if(w.x>=m&&w.x<=x&&w.y>=y&&w.y<=_&&w!==s&&w!==l&&fs(c,f,u,p,h,g,w.x,w.y)&&Re(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;T&&T.z<=S;){if(T.x>=m&&T.x<=x&&T.y>=y&&T.y<=_&&T!==s&&T!==l&&fs(c,f,u,p,h,g,T.x,T.y)&&Re(T.prev,T,T.next)>=0)return!1;T=T.nextZ}return!0}function Gb(i,t,e){let n=i;do{const s=n.prev,o=n.next.next;!rl(s,o)&&fp(s,n,n.next,o)&&vo(s,o)&&vo(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),yo(n),yo(n.next),n=i=o),n=n.next}while(n!==i);return Lr(n)}function Wb(i,t,e,n,s,o){let l=i;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&Qb(l,c)){let u=pp(l,c);l=Lr(l,l.next),u=Lr(u,u.next),_o(l,t,e,n,s,o,0),_o(u,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==i)}function Zb(i,t,e,n){const s=[];let o,l,c,u,h;for(o=0,l=t.length;o<l;o++)c=t[o]*n,u=o<l-1?t[o+1]*n:i.length,h=dp(i,c,u,n,!1),h===h.next&&(h.steiner=!0),s.push(Jb(h));for(s.sort(Xb),o=0;o<s.length;o++)e=qb(s[o],e);return e}function Xb(i,t){return i.x-t.x}function qb(i,t){const e=jb(i,t);if(!e)return t;const n=pp(e,i);return Lr(n,n.next),Lr(e,e.next)}function jb(i,t){let e=t,n=-1/0,s;const o=i.x,l=i.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const g=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(g<=o&&g>n&&(n=g,s=e.x<e.next.x?e:e.next,g===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,u=s.x,h=s.y;let f=1/0,p;e=s;do o>=e.x&&e.x>=u&&o!==e.x&&fs(l<h?o:n,l,u,h,l<h?n:o,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(o-e.x),vo(e,i)&&(p<f||p===f&&(e.x>s.x||e.x===s.x&&$b(s,e)))&&(s=e,f=p)),e=e.next;while(e!==c);return s}function $b(i,t){return Re(i.prev,i,t.prev)<0&&Re(t.next,i,i.next)<0}function Yb(i,t,e,n){let s=i;do s.z===0&&(s.z=Oc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Kb(s)}function Kb(i){let t,e,n,s,o,l,c,u,h=1;do{for(e=i,i=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<h&&(c++,n=n.nextZ,!!n);t++);for(u=h;c>0||u>0&&n;)c!==0&&(u===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,u--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;e=n}o.nextZ=null,h*=2}while(l>1);return i}function Oc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Jb(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fs(i,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(i-l)*(o-c)&&(i-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function Qb(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!tw(i,t)&&(vo(i,t)&&vo(t,i)&&ew(i,t)&&(Re(i.prev,i,t.prev)||Re(i,t.prev,t))||rl(i,t)&&Re(i.prev,i,i.next)>0&&Re(t.prev,t,t.next)>0)}function Re(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function rl(i,t){return i.x===t.x&&i.y===t.y}function fp(i,t,e,n){const s=Ma(Re(i,t,e)),o=Ma(Re(i,t,n)),l=Ma(Re(e,n,i)),c=Ma(Re(e,n,t));return!!(s!==o&&l!==c||s===0&&wa(i,e,t)||o===0&&wa(i,n,t)||l===0&&wa(e,i,n)||c===0&&wa(e,t,n))}function wa(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Ma(i){return i>0?1:i<0?-1:0}function tw(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&fp(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function vo(i,t){return Re(i.prev,i,i.next)<0?Re(i,t,i.next)>=0&&Re(i,i.prev,t)>=0:Re(i,t,i.prev)<0||Re(i,i.next,t)<0}function ew(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,o=(i.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function pp(i,t){const e=new Uc(i.i,i.x,i.y),n=new Uc(t.i,t.x,t.y),s=i.next,o=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function Xd(i,t,e,n){const s=new Uc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function yo(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Uc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function nw(i,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(i[l]-i[o])*(i[o+1]+i[l+1]),l=o;return s}class uo{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return uo.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];qd(t),jd(n,t);let l=t.length;e.forEach(qd);for(let u=0;u<e.length;u++)s.push(l),l+=e[u].length,jd(n,e[u]);const c=Fb.triangulate(n,s);for(let u=0;u<c.length;u+=3)o.push(c.slice(u,u+3));return o}}function qd(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function jd(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class Rs extends Oe{constructor(t=new Lo([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,u=t.length;c<u;c++){const h=t[c];l(h)}this.setAttribute("position",new ye(s,3)),this.setAttribute("uv",new ye(o,2)),this.computeVertexNormals();function l(c){const u=[],h=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let g=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,y=e.bevelSize!==void 0?e.bevelSize:m-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,_=e.bevelSegments!==void 0?e.bevelSegments:3;const v=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:iw;let w,T=!1,k,O,D,z;v&&(w=v.getSpacedPoints(f),T=!0,g=!1,k=v.computeFrenetFrames(f,!1),O=new J,D=new J,z=new J),g||(_=0,m=0,y=0,x=0);const I=c.extractPoints(h);let R=I.shape;const G=I.holes;if(!uo.isClockWise(R)){R=R.reverse();for(let xt=0,bt=G.length;xt<bt;xt++){const A=G[xt];uo.isClockWise(A)&&(G[xt]=A.reverse())}}const F=uo.triangulateShape(R,G),E=R;for(let xt=0,bt=G.length;xt<bt;xt++){const A=G[xt];R=R.concat(A)}function Z(xt,bt,A){return bt||console.error("THREE.ExtrudeGeometry: vec does not exist"),xt.clone().addScaledVector(bt,A)}const ot=R.length,rt=F.length;function W(xt,bt,A){let nt,K,P;const M=xt.x-bt.x,H=xt.y-bt.y,j=A.x-xt.x,Q=A.y-xt.y,X=M*M+H*H,ft=M*Q-H*j;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(X),pt=Math.sqrt(j*j+Q*Q),Tt=bt.x-H/lt,Et=bt.y+M/lt,Lt=A.x-Q/pt,Ht=A.y+j/pt,zt=((Lt-Tt)*Q-(Ht-Et)*j)/(M*Q-H*j);nt=Tt+M*zt-xt.x,K=Et+H*zt-xt.y;const Dt=nt*nt+K*K;if(Dt<=2)return new vt(nt,K);P=Math.sqrt(Dt/2)}else{let lt=!1;M>Number.EPSILON?j>Number.EPSILON&&(lt=!0):M<-Number.EPSILON?j<-Number.EPSILON&&(lt=!0):Math.sign(H)===Math.sign(Q)&&(lt=!0),lt?(nt=-H,K=M,P=Math.sqrt(X)):(nt=M,K=H,P=Math.sqrt(X/2))}return new vt(nt/P,K/P)}const it=[];for(let xt=0,bt=E.length,A=bt-1,nt=xt+1;xt<bt;xt++,A++,nt++)A===bt&&(A=0),nt===bt&&(nt=0),it[xt]=W(E[xt],E[A],E[nt]);const et=[];let q,Y=it.concat();for(let xt=0,bt=G.length;xt<bt;xt++){const A=G[xt];q=[];for(let nt=0,K=A.length,P=K-1,M=nt+1;nt<K;nt++,P++,M++)P===K&&(P=0),M===K&&(M=0),q[nt]=W(A[nt],A[P],A[M]);et.push(q),Y=Y.concat(q)}for(let xt=0;xt<_;xt++){const bt=xt/_,A=m*Math.cos(bt*Math.PI/2),nt=y*Math.sin(bt*Math.PI/2)+x;for(let K=0,P=E.length;K<P;K++){const M=Z(E[K],it[K],nt);St(M.x,M.y,-A)}for(let K=0,P=G.length;K<P;K++){const M=G[K];q=et[K];for(let H=0,j=M.length;H<j;H++){const Q=Z(M[H],q[H],nt);St(Q.x,Q.y,-A)}}}const At=y+x;for(let xt=0;xt<ot;xt++){const bt=g?Z(R[xt],Y[xt],At):R[xt];T?(D.copy(k.normals[0]).multiplyScalar(bt.x),O.copy(k.binormals[0]).multiplyScalar(bt.y),z.copy(w[0]).add(D).add(O),St(z.x,z.y,z.z)):St(bt.x,bt.y,0)}for(let xt=1;xt<=f;xt++)for(let bt=0;bt<ot;bt++){const A=g?Z(R[bt],Y[bt],At):R[bt];T?(D.copy(k.normals[xt]).multiplyScalar(A.x),O.copy(k.binormals[xt]).multiplyScalar(A.y),z.copy(w[xt]).add(D).add(O),St(z.x,z.y,z.z)):St(A.x,A.y,p/f*xt)}for(let xt=_-1;xt>=0;xt--){const bt=xt/_,A=m*Math.cos(bt*Math.PI/2),nt=y*Math.sin(bt*Math.PI/2)+x;for(let K=0,P=E.length;K<P;K++){const M=Z(E[K],it[K],nt);St(M.x,M.y,p+A)}for(let K=0,P=G.length;K<P;K++){const M=G[K];q=et[K];for(let H=0,j=M.length;H<j;H++){const Q=Z(M[H],q[H],nt);T?St(Q.x,Q.y+w[f-1].y,w[f-1].x+A):St(Q.x,Q.y,p+A)}}}tt(),st();function tt(){const xt=s.length/3;if(g){let bt=0,A=ot*bt;for(let nt=0;nt<rt;nt++){const K=F[nt];Pt(K[2]+A,K[1]+A,K[0]+A)}bt=f+_*2,A=ot*bt;for(let nt=0;nt<rt;nt++){const K=F[nt];Pt(K[0]+A,K[1]+A,K[2]+A)}}else{for(let bt=0;bt<rt;bt++){const A=F[bt];Pt(A[2],A[1],A[0])}for(let bt=0;bt<rt;bt++){const A=F[bt];Pt(A[0]+ot*f,A[1]+ot*f,A[2]+ot*f)}}n.addGroup(xt,s.length/3-xt,0)}function st(){const xt=s.length/3;let bt=0;wt(E,bt),bt+=E.length;for(let A=0,nt=G.length;A<nt;A++){const K=G[A];wt(K,bt),bt+=K.length}n.addGroup(xt,s.length/3-xt,1)}function wt(xt,bt){let A=xt.length;for(;--A>=0;){const nt=A;let K=A-1;K<0&&(K=xt.length-1);for(let P=0,M=f+_*2;P<M;P++){const H=ot*P,j=ot*(P+1),Q=bt+nt+H,X=bt+K+H,ft=bt+K+j,lt=bt+nt+j;It(Q,X,ft,lt)}}}function St(xt,bt,A){u.push(xt),u.push(bt),u.push(A)}function Pt(xt,bt,A){Ut(xt),Ut(bt),Ut(A);const nt=s.length/3,K=S.generateTopUV(n,s,nt-3,nt-2,nt-1);at(K[0]),at(K[1]),at(K[2])}function It(xt,bt,A,nt){Ut(xt),Ut(bt),Ut(nt),Ut(bt),Ut(A),Ut(nt);const K=s.length/3,P=S.generateSideWallUV(n,s,K-6,K-3,K-2,K-1);at(P[0]),at(P[1]),at(P[3]),at(P[1]),at(P[2]),at(P[3])}function Ut(xt){s.push(u[xt*3+0]),s.push(u[xt*3+1]),s.push(u[xt*3+2])}function at(xt){o.push(xt.x),o.push(xt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return rw(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new za[s.type]().fromJSON(s)),new Rs(n,t.options)}}const iw={generateTopUV:function(i,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],u=t[n*3+1],h=t[s*3],f=t[s*3+1];return[new vt(o,l),new vt(c,u),new vt(h,f)]},generateSideWallUV:function(i,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],u=t[e*3+2],h=t[n*3],f=t[n*3+1],p=t[n*3+2],g=t[s*3],m=t[s*3+1],y=t[s*3+2],x=t[o*3],_=t[o*3+1],v=t[o*3+2];return Math.abs(c-f)<Math.abs(l-h)?[new vt(l,1-u),new vt(h,1-p),new vt(g,1-y),new vt(x,1-v)]:[new vt(c,1-u),new vt(f,1-p),new vt(m,1-y),new vt(_,1-v)]}};function rw(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];e.shapes.push(o.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Ba extends Oe{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],h=[],f=new J,p=new J,g=new J;for(let m=0;m<=n;m++)for(let y=0;y<=s;y++){const x=y/s*o,_=m/n*Math.PI*2;p.x=(t+e*Math.cos(_))*Math.cos(x),p.y=(t+e*Math.cos(_))*Math.sin(x),p.z=e*Math.sin(_),c.push(p.x,p.y,p.z),f.x=t*Math.cos(x),f.y=t*Math.sin(x),g.subVectors(p,f).normalize(),u.push(g.x,g.y,g.z),h.push(y/s),h.push(m/n)}for(let m=1;m<=n;m++)for(let y=1;y<=s;y++){const x=(s+1)*m+y-1,_=(s+1)*(m-1)+y-1,v=(s+1)*(m-1)+y,S=(s+1)*m+y;l.push(x,_,S),l.push(_,v,S)}this.setIndex(l),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(u,3)),this.setAttribute("uv",new ye(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ba(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class lu extends Oe{constructor(t=new up(new J(-1,-1,0),new J(-1,1,0),new J(1,1,0)),e=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:o};const l=t.computeFrenetFrames(e,o);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const c=new J,u=new J,h=new vt;let f=new J;const p=[],g=[],m=[],y=[];x(),this.setIndex(y),this.setAttribute("position",new ye(p,3)),this.setAttribute("normal",new ye(g,3)),this.setAttribute("uv",new ye(m,2));function x(){for(let w=0;w<e;w++)_(w);_(o===!1?e:0),S(),v()}function _(w){f=t.getPointAt(w/e,f);const T=l.normals[w],k=l.binormals[w];for(let O=0;O<=s;O++){const D=O/s*Math.PI*2,z=Math.sin(D),I=-Math.cos(D);u.x=I*T.x+z*k.x,u.y=I*T.y+z*k.y,u.z=I*T.z+z*k.z,u.normalize(),g.push(u.x,u.y,u.z),c.x=f.x+n*u.x,c.y=f.y+n*u.y,c.z=f.z+n*u.z,p.push(c.x,c.y,c.z)}}function v(){for(let w=1;w<=e;w++)for(let T=1;T<=s;T++){const k=(s+1)*(w-1)+(T-1),O=(s+1)*w+(T-1),D=(s+1)*w+T,z=(s+1)*(w-1)+T;y.push(k,O,z),y.push(O,D,z)}}function S(){for(let w=0;w<=e;w++)for(let T=0;T<=s;T++)h.x=w/e,h.y=T/s,m.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new lu(new za[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class xr extends Pr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sr extends Pr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Jc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class mp extends nn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const mc=new Ce,$d=new J,Yd=new J;class sw{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new nu,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;$d.setFromMatrixPosition(t.matrixWorld),e.position.copy($d),Yd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yd),e.updateMatrixWorld(),mc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(mc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(mc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class ow extends sw{constructor(){super(new Kf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zc extends mp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new ow}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class gp extends mp{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const Kd=new Ce;class _p{constructor(t,e,n=0,s=1/0){this.ray=new el(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new eu,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Kd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Kd),this}intersectObject(t,e=!0,n=[]){return Bc(t,this,n,e),n.sort(Jd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,o=t.length;s<o;s++)Bc(t[s],this,n,e);return n.sort(Jd),n}}function Jd(i,t){return i.distance-t.distance}function Bc(i,t,e,n){if(i.layers.test(t.layers)&&i.raycast(t,e),n===!0){const s=i.children;for(let o=0,l=s.length;o<l;o++)Bc(s[o],t,e,!0)}}class Qd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Je(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kc);const tf={type:"change"},gc={type:"start"},ef={type:"end"},Sa=new el,nf=new Fn,aw=Math.cos(70*__.DEG2RAD);class vp extends Cr{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Br.ROTATE,MIDDLE:Br.DOLLY,RIGHT:Br.PAN},this.touches={ONE:Fr.ROTATE,TWO:Fr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(N){N.addEventListener("keydown",Lt),this._domElementKeyEvents=N},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Lt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(tf),n.update(),o=s.NONE},this.update=function(){const N=new J,ht=new Ar().setFromUnitVectors(t.up,new J(0,1,0)),Mt=ht.clone().invert(),Rt=new J,kt=new Ar,se=new J,he=2*Math.PI;return function(Fe=null){const ve=n.object.position;N.copy(ve).sub(n.target),N.applyQuaternion(ht),c.setFromVector3(N),n.autoRotate&&o===s.NONE&&U(R(Fe)),n.enableDamping?(c.theta+=u.theta*n.dampingFactor,c.phi+=u.phi*n.dampingFactor):(c.theta+=u.theta,c.phi+=u.phi);let De=n.minAzimuthAngle,Ae=n.maxAzimuthAngle;isFinite(De)&&isFinite(Ae)&&(De<-Math.PI?De+=he:De>Math.PI&&(De-=he),Ae<-Math.PI?Ae+=he:Ae>Math.PI&&(Ae-=he),De<=Ae?c.theta=Math.max(De,Math.min(Ae,c.theta)):c.theta=c.theta>(De+Ae)/2?Math.max(De,c.theta):Math.min(Ae,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let cn=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)c.radius=et(c.radius);else{const vn=c.radius;c.radius=et(c.radius*h),cn=vn!=c.radius}if(N.setFromSpherical(c),N.applyQuaternion(Mt),ve.copy(n.target).add(N),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&O){let vn=null;if(n.object.isPerspectiveCamera){const ei=N.length();vn=et(ei*h);const ki=ei-vn;n.object.position.addScaledVector(T,ki),n.object.updateMatrixWorld(),cn=!!ki}else if(n.object.isOrthographicCamera){const ei=new J(k.x,k.y,0);ei.unproject(n.object);const ki=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),n.object.updateProjectionMatrix(),cn=ki!==n.object.zoom;const qe=new J(k.x,k.y,0);qe.unproject(n.object),n.object.position.sub(qe).add(ei),n.object.updateMatrixWorld(),vn=N.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;vn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(vn).add(n.object.position):(Sa.origin.copy(n.object.position),Sa.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Sa.direction))<aw?t.lookAt(n.target):(nf.setFromNormalAndCoplanarPoint(n.object.up,n.target),Sa.intersectPlane(nf,n.target))))}else if(n.object.isOrthographicCamera){const vn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),vn!==n.object.zoom&&(n.object.updateProjectionMatrix(),cn=!0)}return h=1,O=!1,cn||Rt.distanceToSquared(n.object.position)>l||8*(1-kt.dot(n.object.quaternion))>l||se.distanceToSquared(n.target)>l?(n.dispatchEvent(tf),Rt.copy(n.object.position),kt.copy(n.object.quaternion),se.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",H),n.domElement.removeEventListener("pointercancel",Q),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",j),n.domElement.removeEventListener("pointerup",Q),n.domElement.getRootNode().removeEventListener("keydown",Tt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Lt),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new Qd,u=new Qd;let h=1;const f=new J,p=new vt,g=new vt,m=new vt,y=new vt,x=new vt,_=new vt,v=new vt,S=new vt,w=new vt,T=new J,k=new vt;let O=!1;const D=[],z={};let I=!1;function R(N){return N!==null?2*Math.PI/60*n.autoRotateSpeed*N:2*Math.PI/60/60*n.autoRotateSpeed}function G(N){const ht=Math.abs(N*.01);return Math.pow(.95,n.zoomSpeed*ht)}function U(N){u.theta-=N}function F(N){u.phi-=N}const E=function(){const N=new J;return function(Mt,Rt){N.setFromMatrixColumn(Rt,0),N.multiplyScalar(-Mt),f.add(N)}}(),Z=function(){const N=new J;return function(Mt,Rt){n.screenSpacePanning===!0?N.setFromMatrixColumn(Rt,1):(N.setFromMatrixColumn(Rt,0),N.crossVectors(n.object.up,N)),N.multiplyScalar(Mt),f.add(N)}}(),ot=function(){const N=new J;return function(Mt,Rt){const kt=n.domElement;if(n.object.isPerspectiveCamera){const se=n.object.position;N.copy(se).sub(n.target);let he=N.length();he*=Math.tan(n.object.fov/2*Math.PI/180),E(2*Mt*he/kt.clientHeight,n.object.matrix),Z(2*Rt*he/kt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(E(Mt*(n.object.right-n.object.left)/n.object.zoom/kt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/kt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function rt(N){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h/=N:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function W(N){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h*=N:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function it(N,ht){if(!n.zoomToCursor)return;O=!0;const Mt=n.domElement.getBoundingClientRect(),Rt=N-Mt.left,kt=ht-Mt.top,se=Mt.width,he=Mt.height;k.x=Rt/se*2-1,k.y=-(kt/he)*2+1,T.set(k.x,k.y,1).unproject(n.object).sub(n.object.position).normalize()}function et(N){return Math.max(n.minDistance,Math.min(n.maxDistance,N))}function q(N){p.set(N.clientX,N.clientY)}function Y(N){it(N.clientX,N.clientX),v.set(N.clientX,N.clientY)}function At(N){y.set(N.clientX,N.clientY)}function tt(N){g.set(N.clientX,N.clientY),m.subVectors(g,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;U(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(g),n.update()}function st(N){S.set(N.clientX,N.clientY),w.subVectors(S,v),w.y>0?rt(G(w.y)):w.y<0&&W(G(w.y)),v.copy(S),n.update()}function wt(N){x.set(N.clientX,N.clientY),_.subVectors(x,y).multiplyScalar(n.panSpeed),ot(_.x,_.y),y.copy(x),n.update()}function St(N){it(N.clientX,N.clientY),N.deltaY<0?W(G(N.deltaY)):N.deltaY>0&&rt(G(N.deltaY)),n.update()}function Pt(N){let ht=!1;switch(N.code){case n.keys.UP:N.ctrlKey||N.metaKey||N.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ot(0,n.keyPanSpeed),ht=!0;break;case n.keys.BOTTOM:N.ctrlKey||N.metaKey||N.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ot(0,-n.keyPanSpeed),ht=!0;break;case n.keys.LEFT:N.ctrlKey||N.metaKey||N.shiftKey?U(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ot(n.keyPanSpeed,0),ht=!0;break;case n.keys.RIGHT:N.ctrlKey||N.metaKey||N.shiftKey?U(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):ot(-n.keyPanSpeed,0),ht=!0;break}ht&&(N.preventDefault(),n.update())}function It(N){if(D.length===1)p.set(N.pageX,N.pageY);else{const ht=ee(N),Mt=.5*(N.pageX+ht.x),Rt=.5*(N.pageY+ht.y);p.set(Mt,Rt)}}function Ut(N){if(D.length===1)y.set(N.pageX,N.pageY);else{const ht=ee(N),Mt=.5*(N.pageX+ht.x),Rt=.5*(N.pageY+ht.y);y.set(Mt,Rt)}}function at(N){const ht=ee(N),Mt=N.pageX-ht.x,Rt=N.pageY-ht.y,kt=Math.sqrt(Mt*Mt+Rt*Rt);v.set(0,kt)}function xt(N){n.enableZoom&&at(N),n.enablePan&&Ut(N)}function bt(N){n.enableZoom&&at(N),n.enableRotate&&It(N)}function A(N){if(D.length==1)g.set(N.pageX,N.pageY);else{const Mt=ee(N),Rt=.5*(N.pageX+Mt.x),kt=.5*(N.pageY+Mt.y);g.set(Rt,kt)}m.subVectors(g,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;U(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(g)}function nt(N){if(D.length===1)x.set(N.pageX,N.pageY);else{const ht=ee(N),Mt=.5*(N.pageX+ht.x),Rt=.5*(N.pageY+ht.y);x.set(Mt,Rt)}_.subVectors(x,y).multiplyScalar(n.panSpeed),ot(_.x,_.y),y.copy(x)}function K(N){const ht=ee(N),Mt=N.pageX-ht.x,Rt=N.pageY-ht.y,kt=Math.sqrt(Mt*Mt+Rt*Rt);S.set(0,kt),w.set(0,Math.pow(S.y/v.y,n.zoomSpeed)),rt(w.y),v.copy(S);const se=(N.pageX+ht.x)*.5,he=(N.pageY+ht.y)*.5;it(se,he)}function P(N){n.enableZoom&&K(N),n.enablePan&&nt(N)}function M(N){n.enableZoom&&K(N),n.enableRotate&&A(N)}function H(N){n.enabled!==!1&&(D.length===0&&(n.domElement.setPointerCapture(N.pointerId),n.domElement.addEventListener("pointermove",j),n.domElement.addEventListener("pointerup",Q)),!ae(N)&&(Qt(N),N.pointerType==="touch"?Ht(N):X(N)))}function j(N){n.enabled!==!1&&(N.pointerType==="touch"?zt(N):ft(N))}function Q(N){switch(Vt(N),D.length){case 0:n.domElement.releasePointerCapture(N.pointerId),n.domElement.removeEventListener("pointermove",j),n.domElement.removeEventListener("pointerup",Q),n.dispatchEvent(ef),o=s.NONE;break;case 1:const ht=D[0],Mt=z[ht];Ht({pointerId:ht,pageX:Mt.x,pageY:Mt.y});break}}function X(N){let ht;switch(N.button){case 0:ht=n.mouseButtons.LEFT;break;case 1:ht=n.mouseButtons.MIDDLE;break;case 2:ht=n.mouseButtons.RIGHT;break;default:ht=-1}switch(ht){case Br.DOLLY:if(n.enableZoom===!1)return;Y(N),o=s.DOLLY;break;case Br.ROTATE:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enablePan===!1)return;At(N),o=s.PAN}else{if(n.enableRotate===!1)return;q(N),o=s.ROTATE}break;case Br.PAN:if(N.ctrlKey||N.metaKey||N.shiftKey){if(n.enableRotate===!1)return;q(N),o=s.ROTATE}else{if(n.enablePan===!1)return;At(N),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(gc)}function ft(N){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;tt(N);break;case s.DOLLY:if(n.enableZoom===!1)return;st(N);break;case s.PAN:if(n.enablePan===!1)return;wt(N);break}}function lt(N){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(N.preventDefault(),n.dispatchEvent(gc),St(pt(N)),n.dispatchEvent(ef))}function pt(N){const ht=N.deltaMode,Mt={clientX:N.clientX,clientY:N.clientY,deltaY:N.deltaY};switch(ht){case 1:Mt.deltaY*=16;break;case 2:Mt.deltaY*=100;break}return N.ctrlKey&&!I&&(Mt.deltaY*=10),Mt}function Tt(N){N.key==="Control"&&(I=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(N){N.key==="Control"&&(I=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function Lt(N){n.enabled===!1||n.enablePan===!1||Pt(N)}function Ht(N){switch(le(N),D.length){case 1:switch(n.touches.ONE){case Fr.ROTATE:if(n.enableRotate===!1)return;It(N),o=s.TOUCH_ROTATE;break;case Fr.PAN:if(n.enablePan===!1)return;Ut(N),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case Fr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;xt(N),o=s.TOUCH_DOLLY_PAN;break;case Fr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;bt(N),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(gc)}function zt(N){switch(le(N),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;A(N),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;nt(N),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;P(N),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;M(N),n.update();break;default:o=s.NONE}}function Dt(N){n.enabled!==!1&&N.preventDefault()}function Qt(N){D.push(N.pointerId)}function Vt(N){delete z[N.pointerId];for(let ht=0;ht<D.length;ht++)if(D[ht]==N.pointerId){D.splice(ht,1);return}}function ae(N){for(let ht=0;ht<D.length;ht++)if(D[ht]==N.pointerId)return!0;return!1}function le(N){let ht=z[N.pointerId];ht===void 0&&(ht=new vt,z[N.pointerId]=ht),ht.set(N.pageX,N.pageY)}function ee(N){const ht=N.pointerId===D[0]?D[1]:D[0];return z[ht]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",H),n.domElement.addEventListener("pointercancel",Q),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Tt,{passive:!0,capture:!0}),this.update()}}let Ea=null;function cu(i){return Ea||(Ea=new Promise(t=>{const e=i.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new rp({canvas:i,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=Cf,o.toneMappingExposure=1,yt.renderer=o;const l=new sp;l.background=new Kt(12113128),yt.scene=l;const c=new Rn(45,n/s,.5,8e3);c.position.set(0,200,350),yt.camera=c;const u=new vp(c,i);u.enableDamping=!0,u.dampingFactor=.07,u.minDistance=10,u.maxDistance=4e3,u.screenSpacePanning=!0,u.maxPolarAngle=Math.PI/2,yt.controls=u,l.add(new gp(16777215,.78));const h=new zc(16775924,.95);h.position.set(-250,700,200),l.add(h);const f=new zc(14544639,.4);f.position.set(200,250,-200),l.add(f);const p=new Mr;l.add(p),yt.tg=p,window.addEventListener("resize",()=>{const m=e.clientWidth,y=e.clientHeight;!m||!y||(c.aspect=m/y,c.updateProjectionMatrix(),o.setSize(m,y))});function g(){requestAnimationFrame(g),u.update(),o.render(l,c)}g(),t()}),Ea)}function lw(){if(yt.tg)for(;yt.tg.children.length;){const i=yt.tg.children[0];yt.tg.remove(i),i.geometry?.dispose(),Array.isArray(i.material)?i.material.forEach(t=>t.dispose()):i.material?.dispose()}}const cw="#f0ede8",uw="#c0bbb5",hw="#0fe300",dw="#0fe300",fw="#0fe300",pw="#0fe300",mw="#262626",rs="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function yp(i,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:u,BASE_H:h}=yt;if(!e||!n)return h;const f=(i+s/2)/s*(n-1),p=(t+o/2)/o*(n-1),g=Math.max(0,Math.min(n-2,Math.floor(f))),m=Math.max(0,Math.min(n-2,Math.floor(p))),y=f-g,x=p-m,_=e[m*n+g]??l,v=e[m*n+g+1]??l,S=e[(m+1)*n+g]??l,w=e[(m+1)*n+g+1]??l,T=_*(1-y)*(1-x)+v*y*(1-x)+S*(1-y)*x+w*y*x;return h+Math.max(0,Math.min(1,(T-l)/Math.max(.001,c)))*u}function Ta(i,t,e){if(!i.positions.length||!i.indices.length)return null;const n=new Oe;n.setAttribute("position",new kn(i.positions,3)),i.colors&&n.setAttribute("color",new kn(i.colors,3)),n.setIndex(new kn(i.indices,1)),n.computeVertexNormals();const s=new Ie(n,t);return s.name=e,s}function gw(i){if(!yt.tg)return;lw();const t=bf(),e=yt.tg;function n(o,l,c,u=-8){l.polygonOffset=!0,l.polygonOffsetFactor=u,l.polygonOffsetUnits=u;const h=Ta(o,l,c);h&&e.add(h)}const s=(o,l=.95,c=!1)=>new xr({color:new Kt(o),roughness:l,metalness:0,flatShading:c});{const o=new xr({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:ln,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=Ta(i.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=_w(yt.wMm,yt.dMm,yt.zoneType);if(o){const l=new Rs(o,{depth:yt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new Ie(l,new xr({color:new Kt(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if(vw(t.cBase),i.GROUND.positions.length){const o=new xr({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=Ta(i.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(i.LAND,s(cw),"LAND",-2),n(i.ROCK,s(uw),"ROCK",-3),n(i.FARM,s(pw),"FARM",-4),n(i.GRASS,s(hw),"GRASS",-5),n(i.PARKS,s(fw),"PARKS",-6),n(i.FOREST,s(dw),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=ln,n(i.WATER,o,"WATER",-8)}if(t.roadsOn){n(i.PED,s(mw,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=ln,n(i.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(i.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),i.GPX.positions.length){const o=new xr({color:new Kt(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=Ta(i.GPX,o,"GPX");l&&e.add(l)}bw()}function _w(i,t,e){const n=new Lo;if(e==="circ")n.ellipse(0,0,i/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(i/2*Math.cos(o),i/2*Math.sin(o)):n.lineTo(i/2*Math.cos(o),i/2*Math.sin(o))}n.closePath()}else n.moveTo(-i/2,-t/2),n.lineTo(i/2,-t/2),n.lineTo(i/2,t/2),n.lineTo(-i/2,t/2),n.closePath();return n}function vw(i){if(!yt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=yt,o=new xr({color:new Kt(i),roughness:.55,side:ln});function l(u,h){return{x:u,z:h,topY:Math.max(n,yp(u*.98,h*.98))}}function c(u){const h=[],f=[];let p=0;const g=u.length;for(let x=0;x<g;x++){const _=u[x],v=u[(x+1)%g],S=(_.x+v.x)/2,w=(_.z+v.z)/2,T=S*(v.z-_.z)-w*(v.x-_.x),[k,O]=T>=0?[_,v]:[v,_];h.push(k.x,k.topY,k.z,O.x,O.topY,O.z,O.x,0,O.z,k.x,0,k.z),f.push(p,p+1,p+2,p,p+2,p+3),p+=4}if(!h.length)return;const m=new Oe;m.setAttribute("position",new ye(h,3)),m.setIndex(f),m.computeVertexNormals();const y=new Ie(m,o);y.name="WALLS",yt.tg.add(y)}if(s==="circ"){const h=t/2;c(Array.from({length:512},(f,p)=>{const g=p/512*Math.PI*2;return l(h*Math.cos(g),h*Math.sin(g))}))}else if(s==="hex"){const u=t/2;c(Array.from({length:6},(h,f)=>{const p=f/6*Math.PI*2-Math.PI/6;return l(u*Math.cos(p),u*Math.sin(p))}))}else if(yt.zonePts&&yt.zonePts.length>=3&&yt.bounds){const{bounds:u}=yt,h=e/(u.maxLat-u.minLat),f=t/(u.maxLon-u.minLon),p=(u.minLat+u.maxLat)/2,g=(u.minLon+u.maxLon)/2;c(yt.zonePts.map(([m,y])=>l((y-g)*f,-(m-p)*h)))}else{const u=-t/2,h=t/2,f=-e/2,p=e/2;c([l(u,f),l(h,f),l(h,p),l(u,p)])}}const yw=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function _c(i){const t=[],e=[];let n=0;for(const o of i){const l=o.attributes.position,c=o.index;for(let u=0;u<l.count;u++)t.push(l.getX(u),l.getY(u),l.getZ(u));if(c)for(let u=0;u<c.count;u++)e.push(c.getX(u)+n);else for(let u=0;u<l.count;u++)e.push(u+n);n+=l.count,o.dispose()}const s=new Oe;return s.setAttribute("position",new ye(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function xw(i,t,e,n){const s=t/2,o=n/2;try{switch(i){case"eiffel":{const l=[new vt(s,0),new vt(s*.82,e*.035),new vt(s*.58,e*.08),new vt(s*.32,e*.135),new vt(s*.265,e*.165),new vt(s*.285,e*.175),new vt(s*.245,e*.188),new vt(s*.18,e*.23),new vt(s*.13,e*.33),new vt(s*.115,e*.348),new vt(s*.13,e*.358),new vt(s*.11,e*.37),new vt(s*.08,e*.43),new vt(s*.048,e*.6),new vt(s*.026,e*.83),new vt(s*.01,e*.94),new vt(0,e)],c=new yr(l,4);c.rotateY(Math.PI/4);const u=new go(s*.32,s*.32,e*.012,16,1,!1);u.translate(0,e*.175,0);const h=new go(s*.145,s*.145,e*.01,16,1,!1);return h.translate(0,e*.358,0),_c([c,u,h])}case"burj":{const l=[new vt(s,0),new vt(s*.8,e*.15),new vt(s*.55,e*.4),new vt(s*.25,e*.72),new vt(s*.08,e*.9),new vt(s*.02,e)];return new yr(l,12)}case"dome":{const c=Array.from({length:13},(u,h)=>{const f=h/12*Math.PI/2;return new vt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new vt(s*.9,0),new vt(0,0)),new yr(c,16)}case"onion":{const l=[new vt(s*.3,0),new vt(s*.55,e*.12),new vt(s,e*.4),new vt(s*.55,e*.65),new vt(s*.1,e*.85),new vt(s*.04,e)];return new yr(l,12)}case"tower":{const l=[new vt(s,0),new vt(s*.65,e*.2),new vt(s*.3,e*.55),new vt(s*.1,e*.8),new vt(s*.03,e)];return new yr(l,8)}case"pyramid":{const l=new au(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,u=new pn(l,c,n);u.translate(-s+l/2,c/2,0);const h=new pn(l,c,n);h.translate(s-l/2,c/2,0);const f=new pn(t,e*.22,n);return f.translate(0,e*.89,0),_c([u,h,f])}case"cathedral":{const l=t*.55,c=e*.65,u=t*.14,h=new pn(l,c,n);h.translate(0,c/2,0);const f=new pn(u,e,u);f.translate(-l/2+u/2,e/2,-o+u/2);const p=new pn(u,e,u);return p.translate(l/2-u/2,e/2,-o+u/2),_c([h,f,p])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,u=new Ba(l,Math.max(c,3),8,32);return u.scale(1,e/(l*.8),o/s),u.translate(0,e/2,0),u}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],u=new Oe;return u.setAttribute("position",new ye(l,3)),u.setIndex(c),u.computeVertexNormals(),u}case"wheel":{const l=Math.min(s,e/2),c=new Ba(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new pn(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function bw(){if(!yt.tg||!yt.bounds||!yt.elevGrid)return;const{bounds:i,wMm:t,dMm:e,mmPerMeter:n}=yt,s=(i.minLat+i.maxLat)/2,o=(i.minLon+i.maxLon)/2,l=e/(i.maxLat-i.minLat),c=t/(i.maxLon-i.minLon),u=.01;let h=0;for(const f of yw){if(f.lat<i.minLat-u||f.lat>i.maxLat+u||f.lon<i.minLon-u||f.lon>i.maxLon+u)continue;const p=(f.lon-o)*c,g=-(f.lat-s)*l,m=t/2,y=e/2;if(!(p>=-m-1&&p<=m+1&&g>=-y-1&&g<=y+1))continue;const _=yp(p,g),v=Math.min(t*.25,Math.max(5,f.rH*n*2)),S=Math.min(t*.08,Math.max(1.5,f.rW*n)),w=Math.min(t*.08,Math.max(1.5,f.rD*n)),T=xw(f.sh,S,v,w);if(!T)continue;T.translate(p,_,g);const k=new Ie(T,new xr({color:new Kt(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));k.name="LM_"+f.n,yt.tg.add(k),h++}h&&console.log(`Landmarks: ${h} monument(s)`)}var ys=Math.pow,an=(i,t,e)=>new Promise((n,s)=>{var o=u=>{try{c(e.next(u))}catch(h){s(h)}},l=u=>{try{c(e.throw(u))}catch(h){s(h)}},c=u=>u.done?n(u.value):Promise.resolve(u.value).then(o,l);c((e=e.apply(i,t)).next())}),In=Uint8Array,ho=Uint16Array,ww=Int32Array,xp=new In([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),bp=new In([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Mw=new In([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),wp=function(i,t){for(var e=new ho(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new ww(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},Mp=wp(xp,2),Sp=Mp.b,Sw=Mp.r;Sp[28]=258,Sw[258]=28;var Ew=wp(bp,0),Tw=Ew.b,Ep=new ho(32768);for(_e=0;_e<32768;++_e)Ei=(_e&43690)>>1|(_e&21845)<<1,Ei=(Ei&52428)>>2|(Ei&13107)<<2,Ei=(Ei&61680)>>4|(Ei&3855)<<4,Ep[_e]=((Ei&65280)>>8|(Ei&255)<<8)>>1;var Ei,_e,fo=function(i,t,e){for(var n=i.length,s=0,o=new ho(t);s<n;++s)i[s]&&++o[i[s]-1];var l=new ho(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new ho(1<<t);var u=15-t;for(s=0;s<n;++s)if(i[s])for(var h=s<<4|i[s],f=t-i[s],p=l[i[s]-1]++<<f,g=p|(1<<f)-1;p<=g;++p)c[Ep[p]>>u]=h}return c},Co=new In(288);for(_e=0;_e<144;++_e)Co[_e]=8;var _e;for(_e=144;_e<256;++_e)Co[_e]=9;var _e;for(_e=256;_e<280;++_e)Co[_e]=7;var _e;for(_e=280;_e<288;++_e)Co[_e]=8;var _e,Tp=new In(32);for(_e=0;_e<32;++_e)Tp[_e]=5;var _e,Aw=fo(Co,9),Lw=fo(Tp,5),vc=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},qn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},yc=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},Cw=function(i){return(i+7)/8|0},Pw=function(i,t,e){(e==null||e>i.length)&&(e=i.length);var n=new In(e-t);return n.set(i.subarray(t,e)),n},Rw=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Pn=function(i,t,e){var n=new Error(t||Rw[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Pn),!e)throw n;return n},uu=function(i,t,e,n){var s=i.length,o=0;if(!s||t.f&&!t.l)return e||new In(0);var l=!e||t.i!=2,c=t.i;e||(e=new In(s*3));var u=function(Ut){var at=e.length;if(Ut>at){var xt=new In(Math.max(at*2,Ut));xt.set(e),e=xt}},h=t.f||0,f=t.p||0,p=t.b||0,g=t.l,m=t.d,y=t.m,x=t.n,_=s*8;do{if(!g){h=qn(i,f,1);var v=qn(i,f+1,3);if(f+=3,v)if(v==1)g=Aw,m=Lw,y=9,x=5;else if(v==2){var k=qn(i,f,31)+257,O=qn(i,f+10,15)+4,D=k+qn(i,f+5,31)+1;f+=14;for(var z=new In(D),I=new In(19),R=0;R<O;++R)I[Mw[R]]=qn(i,f+R*3,7);f+=O*3;for(var G=vc(I),U=(1<<G)-1,F=fo(I,G),R=0;R<D;){var E=F[qn(i,f,U)];f+=E&15;var S=E>>4;if(S<16)z[R++]=S;else{var Z=0,ot=0;for(S==16?(ot=3+qn(i,f,3),f+=2,Z=z[R-1]):S==17?(ot=3+qn(i,f,7),f+=3):S==18&&(ot=11+qn(i,f,127),f+=7);ot--;)z[R++]=Z}}var rt=z.subarray(0,k),W=z.subarray(k);y=vc(rt),x=vc(W),g=fo(rt,y),m=fo(W,x)}else Pn(1);else{var S=Cw(f)+4,w=i[S-4]|i[S-3]<<8,T=S+w;if(T>s){c&&Pn(0);break}l&&u(p+w),e.set(i.subarray(S,T),p),t.b=p+=w,t.p=f=T*8,t.f=h;continue}if(f>_){c&&Pn(0);break}}l&&u(p+131072);for(var it=(1<<y)-1,et=(1<<x)-1,q=f;;q=f){var Z=g[yc(i,f)&it],Y=Z>>4;if(f+=Z&15,f>_){c&&Pn(0);break}if(Z||Pn(2),Y<256)e[p++]=Y;else if(Y==256){q=f,g=null;break}else{var At=Y-254;if(Y>264){var R=Y-257,tt=xp[R];At=qn(i,f,(1<<tt)-1)+Sp[R],f+=tt}var st=m[yc(i,f)&et],wt=st>>4;st||Pn(3),f+=st&15;var W=Tw[wt];if(wt>3){var tt=bp[wt];W+=yc(i,f)&(1<<tt)-1,f+=tt}if(f>_){c&&Pn(0);break}l&&u(p+131072);var St=p+At;if(p<W){var Pt=o-W,It=Math.min(W,St);for(Pt+p<0&&Pn(3);p<It;++p)e[p]=n[Pt+p]}for(;p<St;p+=4)e[p]=e[p-W],e[p+1]=e[p+1-W],e[p+2]=e[p+2-W],e[p+3]=e[p+3-W];p=St}}t.l=g,t.p=q,t.b=p,t.f=h,g&&(h=1,t.m=y,t.d=m,t.n=x)}while(!h);return p==e.length?e:Pw(e,0,p)},Iw=new In(0),Dw=function(i){(i[0]!=31||i[1]!=139||i[2]!=8)&&Pn(6,"invalid gzip data");var t=i[3],e=10;t&4&&(e+=(i[10]|i[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!i[e++]);return e+(t&2)},kw=function(i){var t=i.length;return(i[t-4]|i[t-3]<<8|i[t-2]<<16|i[t-1]<<24)>>>0},Nw=function(i,t){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&Pn(6,"invalid zlib data"),(i[1]>>5&1)==1&&Pn(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function Ow(i,t){return uu(i,{i:2},t,t)}function Uw(i,t){var e=Dw(i);return e+8>i.length&&Pn(6,"invalid gzip data"),uu(i.subarray(e,-8),{i:2},new In(kw(i)),t)}function zw(i,t){return uu(i.subarray(Nw(i),-4),{i:2},t,t)}function Fc(i,t){return i[0]==31&&i[1]==139&&i[2]==8?Uw(i,t):(i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31?Ow(i,t):zw(i,t)}var Bw=typeof TextDecoder<"u"&&new TextDecoder,Fw=0;try{Bw.decode(Iw,{stream:!0}),Fw=1}catch{}var Ap=(i,t)=>i*ys(2,t),Qs=(i,t)=>Math.floor(i/ys(2,t)),Fa=(i,t)=>Ap(i.getUint16(t+1,!0),8)+i.getUint8(t),Lp=(i,t)=>Ap(i.getUint32(t+2,!0),16)+i.getUint16(t,!0),Hw=(i,t,e,n,s)=>{if(i!==n.getUint8(s))return i-n.getUint8(s);const o=Fa(n,s+1);if(t!==o)return t-o;const l=Fa(n,s+4);return e!==l?e-l:0},Vw=(i,t,e,n)=>{const s=Cp(i,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},rf=(i,t,e,n)=>{const s=Cp(i,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},Cp=(i,t,e,n)=>{let s=0,o=i.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=Hw(t,e,n,i,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[Lp(i,l*17+7),i.getUint32(l*17+13,!0)]}return null},Gw=(i,t)=>i.isDir&&!t.isDir?1:!i.isDir&&t.isDir?-1:i.z!==t.z?i.z-t.z:i.x!==t.x?i.x-t.x:i.y-t.y,Pp=(i,t)=>{const e=i.getUint8(t*17);return{z:e&127,x:Fa(i,t*17+1),y:Fa(i,t*17+4),offset:Lp(i,t*17+7),length:i.getUint32(t*17+13,!0),isDir:e>>7===1}},sf=i=>{const t=[],e=new DataView(i);for(let n=0;n<e.byteLength/17;n++)t.push(Pp(e,n));return Ww(t)},Ww=i=>{i.sort(Gw);const t=new ArrayBuffer(17*i.length),e=new Uint8Array(t);for(let n=0;n<i.length;n++){const s=i[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=Qs(s.offset,8)&255,e[n*17+9]=Qs(s.offset,16)&255,e[n*17+10]=Qs(s.offset,24)&255,e[n*17+11]=Qs(s.offset,32)&255,e[n*17+12]=Qs(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},Zw=(i,t)=>{if(i.byteLength<17)return null;const e=i.byteLength/17,n=Pp(i,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function Xw(i){return an(this,null,function*(){const t=yield i.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let u=0;"minzoom"in l&&(u=+l.minzoom);let h=0;"maxzoom"in l&&(h=+l.maxzoom);let f=0,p=0,g=0,m=-180,y=-85,x=180,_=85;if(l.bounds){const S=l.bounds.split(",");m=+S[0],y=+S[1],x=+S[2],_=+S[3]}if(l.center){const S=l.center.split(",");f=+S[0],p=+S[1],g=+S[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:u,maxZoom:h,minLon:m,minLat:y,maxLon:x,maxLat:_,centerZoom:g,centerLon:f,centerLat:p,etag:t.etag}})}function qw(i,t,e,n,s,o,l){return an(this,null,function*(){let c=yield e.getArrayBuffer(t,i.rootDirectoryOffset,i.rootDirectoryLength,i);i.specVersion===1&&(c=sf(c));const u=rf(new DataView(c),n,s,o);if(u){let p=(yield t.getBytes(u.offset,u.length,l)).data;const g=new DataView(p);return g.getUint8(0)===31&&g.getUint8(1)===139&&(p=Fc(new Uint8Array(p))),{data:p}}const h=Zw(new DataView(c),{z:n,x:s,y:o});if(h){const f=Vw(new DataView(c),h.z,h.x,h.y);if(f){let p=yield e.getArrayBuffer(t,f.offset,f.length,i);i.specVersion===1&&(p=sf(p));const g=rf(new DataView(p),n,s,o);if(g){let y=(yield t.getBytes(g.offset,g.length,l)).data;const x=new DataView(y);return x.getUint8(0)===31&&x.getUint8(1)===139&&(y=Fc(new Uint8Array(y))),{data:y}}}}})}var Rp={getHeader:Xw,getZxy:qw};function ss(i,t){return(t>>>0)*4294967296+(i>>>0)}function jw(i,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return ss(i,s);throw new Error("Expected varint not more than 10 bytes")}function to(i){const t=i.buf;let e=t[i.pos++],n=e&127;return e<128||(e=t[i.pos++],n|=(e&127)<<7,e<128)||(e=t[i.pos++],n|=(e&127)<<14,e<128)||(e=t[i.pos++],n|=(e&127)<<21,e<128)?n:(e=t[i.pos],n|=(e&15)<<28,jw(n,i))}function $w(i,t,e,n){if(n===0){e===1&&(t[0]=i-1-t[0],t[1]=i-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var Yw=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function Kw(i,t,e){if(i>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>ys(2,i)-1||e>ys(2,i)-1)throw Error("tile x/y outside zoom level bounds");const n=Yw[i],s=ys(2,i);let o=0,l=0,c=0;const u=[t,e];let h=s/2;for(;h>0;)o=(u[0]&h)>0?1:0,l=(u[1]&h)>0?1:0,c+=h*h*(3*o^l),$w(h,u,o,l),h=h/2;return n+c}function Ip(i,t){return an(this,null,function*(){if(t===1||t===0)return i;if(t===2){if(typeof globalThis.DecompressionStream>"u")return Fc(new Uint8Array(i));const e=new Response(i).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function Jw(i){return i===1?".mvt":i===2?".png":i===3?".jpg":i===4?".webp":i===5?".avif":""}var Qw=127;function t1(i,t){let e=0,n=i.length-1;for(;e<=n;){const s=n+e>>1,o=t-i[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return i[s]}return n>=0&&(i[n].runLength===0||t-i[n].tileId<i[n].runLength)?i[n]:null}var e1=class{constructor(i,t=new Headers){this.url=i,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(i){this.customHeaders=i}getBytes(i,t,e,n){return an(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${i}-${i+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let u=yield fetch(this.url,{signal:o,cache:c,headers:l});if(i===0&&u.status===416){const g=u.headers.get("Content-Range");if(!g||!g.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const m=+g.substr(8);u=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${m-1}`}})}let h=u.headers.get("Etag");if(h?.startsWith("W/")&&(h=null),u.status===416||n&&h&&h!==n)throw this.mustReload=!0,new Hc(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(u.status>=300)throw Error(`Bad response code: ${u.status}`);const f=u.headers.get("Content-Length");if(u.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield u.arrayBuffer(),etag:h||void 0,cacheControl:u.headers.get("Cache-Control")||void 0,expires:u.headers.get("Expires")||void 0}})}};function jn(i,t){const e=i.getUint32(t+4,!0),n=i.getUint32(t+0,!0);return e*ys(2,32)+n}function n1(i,t){const e=new DataView(i),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:jn(e,8),rootDirectoryLength:jn(e,16),jsonMetadataOffset:jn(e,24),jsonMetadataLength:jn(e,32),leafDirectoryOffset:jn(e,40),leafDirectoryLength:jn(e,48),tileDataOffset:jn(e,56),tileDataLength:jn(e,64),numAddressedTiles:jn(e,72),numTileEntries:jn(e,80),numTileContents:jn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function Dp(i){const t={buf:new Uint8Array(i),pos:0},e=to(t),n=[];let s=0;for(let o=0;o<e;o++){const l=to(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=to(t);for(let o=0;o<e;o++)n[o].length=to(t);for(let o=0;o<e;o++){const l=to(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function i1(i){const t=new DataView(i);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var Hc=class extends Error{};function r1(i,t){return an(this,null,function*(){const e=yield i.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(i1(e.data)<3)return[yield Rp.getHeader(i)];const s=e.data.slice(0,Qw),o=n1(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${i.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,u=Dp(yield t(l,o.internalCompression));return[o,[c,u.length,u]]})}function s1(i,t,e,n,s){return an(this,null,function*(){const o=yield i.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=Dp(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var o1=class{constructor(i=100,t=!0,e=Ip){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=i,this.counter=1,this.decompress=e}getHeader(i){return an(this,null,function*(){const t=i.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{r1(i,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(i,t,e,n){return an(this,null,function*(){const s=`${i.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{s1(i,this.decompress,t,e,n).then(h=>{c(h),this.prune()}).catch(h=>{u(h)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(i,t,e,n){return an(this,null,function*(){const s=`${i.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{i.getBytes(t,e,void 0,n.etag).then(h=>{c(h.data),this.cache.has(s),this.prune()}).catch(h=>{u(h)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let i=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<i&&(i=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(i){return an(this,null,function*(){const t=i.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(i.getKey());const e=new Promise((n,s)=>{this.getHeader(i).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},a1=class{constructor(i,t,e){typeof i=="string"?this.source=new e1(i):this.source=i,e?this.decompress=e:this.decompress=Ip,t?this.cache=t:this.cache=new o1}getHeader(){return an(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(i,t,e,n){return an(this,null,function*(){const s=Kw(i,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return Rp.getZxy(o,this.source,this.cache,i,t,e,n);if(i<o.minZoom||i>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let u=0;u<=3;u++){const h=yield this.cache.getDirectory(this.source,l,c,o),f=t1(h,s);if(f){if(f.runLength>0){const p=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(p.data,o.tileCompression),cacheControl:p.cacheControl,expires:p.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(i,t,e,n){return an(this,null,function*(){try{return yield this.getZxyAttempt(i,t,e,n)}catch(s){if(s instanceof Hc)return this.cache.invalidate(this.source),yield this.getZxyAttempt(i,t,e,n);throw s}})}getMetadataAttempt(){return an(this,null,function*(){const i=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(i.jsonMetadataOffset,i.jsonMetadataLength,void 0,i.etag),e=yield this.decompress(t.data,i.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return an(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(i){if(i instanceof Hc)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw i}})}getTileJson(i){return an(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=Jw(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${i}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const xc=new Map;function l1(i){return xc.has(i)||xc.set(i,new a1(i)),xc.get(i)}function c1(i,t){const e=[];let n=0;const s=new Uint8Array(i);function o(){let h=0,f=0;for(;n<s.length;){const p=s[n++];if(h|=(p&127)<<f,!(p&128))break;f+=7}return h}function l(){if(n>=s.length)return null;const h=o();return{field:h>>3,wire:h&7}}function c(h){if(h===0)o();else if(h===2){const f=o();n+=f}else h===5?n+=4:h===1&&(n+=8)}function u(){const h=o(),f=new Uint8Array(i,n,h);return n+=h,new TextDecoder().decode(f)}for(;n<s.length;){const h=l();if(!h)break;if(h.field===3&&h.wire===2){const f=o(),p=n+f;let g="";const m=[],y=[],x=[];for(;n<p;){const _=l();if(!_)break;if(_.field===1&&_.wire===2)g=u();else if(_.field===3&&_.wire===2)m.push(u());else if(_.field===4&&_.wire===2){const v=o(),S=n+v;for(;n<S;){const w=l();if(!w)break;if(w.wire===2){const T=o(),k=new Uint8Array(i,n,T);n+=T,y.push(new TextDecoder().decode(k))}else w.field===5&&w.wire===0?y.push(o()!==0):w.field===6&&w.wire===0||w.field===7&&w.wire===0?y.push(o()):c(w.wire)}}else if(_.field===5&&_.wire===0)o();else if(_.field===2&&_.wire===2){const v=o(),S=n+v;let w=0;const T=[],k=[];for(;n<S;){const O=l();if(!O)break;if(O.field===3&&O.wire===0)w=o();else if(O.field===2&&O.wire===2){const D=o(),z=n+D;for(;n<z;)T.push(o())}else if(O.field===4&&O.wire===2){const D=o(),z=n+D;for(;n<z;)k.push(o())}else c(O.wire)}x.push({type:w,tags:T,geom:k})}else c(_.wire)}if(n=p,t&&t!==g)continue;for(const _ of x){const v={};for(let I=0;I<_.tags.length-1;I+=2)v[m[_.tags[I]]]=y[_.tags[I+1]]??null;const S=[];let w=0,T=0,k=[],O=0,D=0,z=0;for(;z<_.geom.length;){if(D===0){const I=_.geom[z++];O=I&7,D=I>>3}if(O===1||O===2){O===1&&k.length>=2&&(S.push(k),k=[]);const I=of(_.geom[z++]),R=of(_.geom[z++]);w+=I,T+=R,k.push({lat:T,lon:w}),D--}else O===7?(k.length>=2&&(S.push(k),k=[]),D--):(z++,D--)}k.length>=2&&S.push(k),e.push({layer:g,type:_.type,properties:v,rings:S})}}else c(h.wire)}return e}function of(i){return i>>1^-(i&1)}function u1(i,t,e,n,s,o){const l=2**e,c=(i+n/o)/l,u=(t+s/o)/l,h=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI,lon:h}}async function h1(i,t){const s=[{path:`${rs}/buildings.pmtiles`,z:14,name:"building"},{path:`${rs}/transportation.pmtiles`,z:14,name:"segment"},{path:`${rs}/base.pmtiles`,z:13,name:"water"},{path:`${rs}/base.pmtiles`,z:13,name:"land"},{path:`${rs}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${rs}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:u,name:h}of s){try{const f=l1(c),p=(x,_)=>{const v=2**u,S=Math.floor((_+180)/360*v),w=x*Math.PI/180,T=Math.floor((1-Math.log(Math.tan(w)+1/Math.cos(w))/Math.PI)/2*v);return{x:S,y:T}},g=p(i.maxLat,i.minLon),m=p(i.minLat,i.maxLon),y=[];for(let x=g.y;x<=m.y;x++)for(let _=g.x;_<=m.x;_++)y.push((async(v,S)=>{try{const w=await f.getZxy(u,v,S);if(!w)return;const T=c1(w.data,h);for(const k of T){for(const O of k.rings)for(const D of O){const z=u1(v,S,u,D.lon,D.lat,4096);D.lat=z.lat,D.lon=z.lon}o.push(k)}}catch{}})(_,x));await Promise.all(y)}catch{}l++,t(Math.round(l/s.length*100))}return o}function kp(i="terrain3d.stl"){if(!yt.tg)return;const t=[];new J;const e=new J;if(yt.tg.traverse(m=>{if(!(m instanceof Ie))return;const y=m.geometry,x=y.attributes.position;if(!x)return;const _=y.index,v=m.matrixWorld;function S(w){const T=new J(x.getX(w),x.getY(w),x.getZ(w));return T.applyMatrix4(v),T}if(_)for(let w=0;w<_.count;w+=3)t.push([S(_.getX(w)),S(_.getX(w+1)),S(_.getX(w+2))]);else for(let w=0;w<x.count;w+=3)t.push([S(w),S(w+1),S(w+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let m=0;m<Math.min(l.length,80);m++)s.setUint8(m,l[m]);s.setUint32(80,t.length,!0);let c=84;const u=new J,h=new J;for(const[m,y,x]of t){u.subVectors(y,m),h.subVectors(x,m),e.crossVectors(u,h).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const _ of[m,y,x])s.setFloat32(c,_.x,!0),c+=4,s.setFloat32(c,_.y,!0),c+=4,s.setFloat32(c,_.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),p=URL.createObjectURL(f),g=document.createElement("a");g.href=p,g.download=i,g.click(),URL.revokeObjectURL(p),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function Aa(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Np={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(i,t){(function(e){i.exports=e()})(function(){return function e(n,s,o){function l(h,f){if(!s[h]){if(!n[h]){var p=typeof Aa=="function"&&Aa;if(!f&&p)return p(h,!0);if(c)return c(h,!0);var g=new Error("Cannot find module '"+h+"'");throw g.code="MODULE_NOT_FOUND",g}var m=s[h]={exports:{}};n[h][0].call(m.exports,function(y){var x=n[h][1][y];return l(x||y)},m,m.exports,e,n,s,o)}return s[h].exports}for(var c=typeof Aa=="function"&&Aa,u=0;u<o.length;u++)l(o[u]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(u){for(var h,f,p,g,m,y,x,_=[],v=0,S=u.length,w=S,T=o.getTypeOf(u)!=="string";v<u.length;)w=S-v,p=T?(h=u[v++],f=v<S?u[v++]:0,v<S?u[v++]:0):(h=u.charCodeAt(v++),f=v<S?u.charCodeAt(v++):0,v<S?u.charCodeAt(v++):0),g=h>>2,m=(3&h)<<4|f>>4,y=1<w?(15&f)<<2|p>>6:64,x=2<w?63&p:64,_.push(c.charAt(g)+c.charAt(m)+c.charAt(y)+c.charAt(x));return _.join("")},s.decode=function(u){var h,f,p,g,m,y,x=0,_=0,v="data:";if(u.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var S,w=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===c.charAt(64)&&w--,u.charAt(u.length-2)===c.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(S=l.uint8array?new Uint8Array(0|w):new Array(0|w);x<u.length;)h=c.indexOf(u.charAt(x++))<<2|(g=c.indexOf(u.charAt(x++)))>>4,f=(15&g)<<4|(m=c.indexOf(u.charAt(x++)))>>2,p=(3&m)<<6|(y=c.indexOf(u.charAt(x++))),S[_++]=h,m!==64&&(S[_++]=f),y!==64&&(S[_++]=p);return S}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),u=e("./stream/DataLengthProbe");function h(f,p,g,m,y){this.compressedSize=f,this.uncompressedSize=p,this.crc32=g,this.compression=m,this.compressedContent=y}h.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),p=this;return f.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},h.createWorkerFrom=function(f,p,g){return f.pipe(new c).pipe(new u("uncompressedSize")).pipe(p.compressWorker(g)).pipe(new u("compressedSize")).withStreamInfo("compression",p)},n.exports=h},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,u=[],h=0;h<256;h++){c=h;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;u[h]=c}return u}();n.exports=function(c,u){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(h,f,p,g){var m=l,y=g+p;h^=-1;for(var x=g;x<y;x++)h=h>>>8^m[255&(h^f[x])];return-1^h}(0|u,c,c.length,0):function(h,f,p,g){var m=l,y=g+p;h^=-1;for(var x=g;x<y;x++)h=h>>>8^m[255&(h^f.charCodeAt(x))];return-1^h}(0|u,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),u=e("./stream/GenericWorker"),h=o?"uint8array":"array";function f(p,g){u.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=g,this.meta={}}s.magic="\b\0",c.inherits(f,u),f.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(h,p.data),!1)},f.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(g){p.push({data:g,meta:p.meta})}},s.compressWorker=function(p){return new f("Deflate",p)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(m,y){var x,_="";for(x=0;x<y;x++)_+=String.fromCharCode(255&m),m>>>=8;return _}function l(m,y,x,_,v,S){var w,T,k=m.file,O=m.compression,D=S!==h.utf8encode,z=c.transformTo("string",S(k.name)),I=c.transformTo("string",h.utf8encode(k.name)),R=k.comment,G=c.transformTo("string",S(R)),U=c.transformTo("string",h.utf8encode(R)),F=I.length!==k.name.length,E=U.length!==R.length,Z="",ot="",rt="",W=k.dir,it=k.date,et={crc32:0,compressedSize:0,uncompressedSize:0};y&&!x||(et.crc32=m.crc32,et.compressedSize=m.compressedSize,et.uncompressedSize=m.uncompressedSize);var q=0;y&&(q|=8),D||!F&&!E||(q|=2048);var Y=0,At=0;W&&(Y|=16),v==="UNIX"?(At=798,Y|=function(st,wt){var St=st;return st||(St=wt?16893:33204),(65535&St)<<16}(k.unixPermissions,W)):(At=20,Y|=function(st){return 63&(st||0)}(k.dosPermissions)),w=it.getUTCHours(),w<<=6,w|=it.getUTCMinutes(),w<<=5,w|=it.getUTCSeconds()/2,T=it.getUTCFullYear()-1980,T<<=4,T|=it.getUTCMonth()+1,T<<=5,T|=it.getUTCDate(),F&&(ot=o(1,1)+o(f(z),4)+I,Z+="up"+o(ot.length,2)+ot),E&&(rt=o(1,1)+o(f(G),4)+U,Z+="uc"+o(rt.length,2)+rt);var tt="";return tt+=`
\0`,tt+=o(q,2),tt+=O.magic,tt+=o(w,2),tt+=o(T,2),tt+=o(et.crc32,4),tt+=o(et.compressedSize,4),tt+=o(et.uncompressedSize,4),tt+=o(z.length,2),tt+=o(Z.length,2),{fileRecord:p.LOCAL_FILE_HEADER+tt+z+Z,dirRecord:p.CENTRAL_FILE_HEADER+o(At,2)+tt+o(G.length,2)+"\0\0\0\0"+o(Y,4)+o(_,4)+z+Z+G}}var c=e("../utils"),u=e("../stream/GenericWorker"),h=e("../utf8"),f=e("../crc32"),p=e("../signature");function g(m,y,x,_){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=y,this.zipPlatform=x,this.encodeFileName=_,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(g,u),g.prototype.push=function(m){var y=m.meta.percent||0,x=this.entriesCount,_=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,u.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:x?(y+100*(x-_-1))/x:100}}))},g.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var y=this.streamFiles&&!m.file.dir;if(y){var x=l(m,y,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:x.fileRecord,meta:{percent:0}})}else this.accumulate=!0},g.prototype.closedSource=function(m){this.accumulate=!1;var y=this.streamFiles&&!m.file.dir,x=l(m,y,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(x.dirRecord),y)this.push({data:function(_){return p.DATA_DESCRIPTOR+o(_.crc32,4)+o(_.compressedSize,4)+o(_.uncompressedSize,4)}(m),meta:{percent:100}});else for(this.push({data:x.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},g.prototype.flush=function(){for(var m=this.bytesWritten,y=0;y<this.dirRecords.length;y++)this.push({data:this.dirRecords[y],meta:{percent:100}});var x=this.bytesWritten-m,_=function(v,S,w,T,k){var O=c.transformTo("string",k(T));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(v,2)+o(v,2)+o(S,4)+o(w,4)+o(O.length,2)+O}(this.dirRecords.length,x,m,this.zipComment,this.encodeFileName);this.push({data:_,meta:{percent:100}})},g.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},g.prototype.registerPrevious=function(m){this._sources.push(m);var y=this;return m.on("data",function(x){y.processChunk(x)}),m.on("end",function(){y.closedSource(y.previous.streamInfo),y._sources.length?y.prepareNextSource():y.end()}),m.on("error",function(x){y.error(x)}),this},g.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},g.prototype.error=function(m){var y=this._sources;if(!u.prototype.error.call(this,m))return!1;for(var x=0;x<y.length;x++)try{y[x].error(m)}catch{}return!0},g.prototype.lock=function(){u.prototype.lock.call(this);for(var m=this._sources,y=0;y<m.length;y++)m[y].lock()},n.exports=g},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,u,h){var f=new l(u.streamFiles,h,u.platform,u.encodeFileName),p=0;try{c.forEach(function(g,m){p++;var y=function(S,w){var T=S||w,k=o[T];if(!k)throw new Error(T+" is not a valid compression method !");return k}(m.options.compression,u.compression),x=m.options.compressionOptions||u.compressionOptions||{},_=m.dir,v=m.date;m._compressWorker(y,x).withStreamInfo("file",{name:g,dir:_,date:v,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(f)}),f.entriesCount=p}catch(g){f.error(g)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),u=e("./zipEntries"),h=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function p(g){return new l.Promise(function(m,y){var x=g.decompressed.getContentWorker().pipe(new h);x.on("error",function(_){y(_)}).on("end",function(){x.streamInfo.crc32!==g.decompressed.crc32?y(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}n.exports=function(g,m){var y=this;return m=o.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(g)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",g,!0,m.optimizedBinaryString,m.base64).then(function(x){var _=new u(m);return _.load(x),_}).then(function(x){var _=[l.Promise.resolve(x)],v=x.files;if(m.checkCRC32)for(var S=0;S<v.length;S++)_.push(p(v[S]));return l.Promise.all(_)}).then(function(x){for(var _=x.shift(),v=_.files,S=0;S<v.length;S++){var w=v[S],T=w.fileNameStr,k=o.resolve(w.fileNameStr);y.file(k,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:m.createFolders}),w.dir||(y.file(k).unsafeOriginalName=T)}return _.zipComment.length&&(y.comment=_.zipComment),y})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(u,h){l.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(h)}o.inherits(c,l),c.prototype._bindStream=function(u){var h=this;(this._stream=u).pause(),u.on("data",function(f){h.push({data:f,meta:{percent:0}})}).on("error",function(f){h.isPaused?this.generatedError=f:h.error(f)}).on("end",function(){h.isPaused?h._upstreamEnded=!0:h.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,u,h){o.call(this,u),this._helper=c;var f=this;c.on("data",function(p,g){f.push(p)||f._helper.pause(),h&&h(g)}).on("error",function(p){f.emit("error",p)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(k,O,D){var z,I=c.getTypeOf(O),R=c.extend(D||{},f);R.date=R.date||new Date,R.compression!==null&&(R.compression=R.compression.toUpperCase()),typeof R.unixPermissions=="string"&&(R.unixPermissions=parseInt(R.unixPermissions,8)),R.unixPermissions&&16384&R.unixPermissions&&(R.dir=!0),R.dosPermissions&&16&R.dosPermissions&&(R.dir=!0),R.dir&&(k=v(k)),R.createFolders&&(z=_(k))&&S.call(this,z,!0);var G=I==="string"&&R.binary===!1&&R.base64===!1;D&&D.binary!==void 0||(R.binary=!G),(O instanceof p&&O.uncompressedSize===0||R.dir||!O||O.length===0)&&(R.base64=!1,R.binary=!0,O="",R.compression="STORE",I="string");var U=null;U=O instanceof p||O instanceof u?O:y.isNode&&y.isStream(O)?new x(k,O):c.prepareContent(k,O,R.binary,R.optimizedBinaryString,R.base64);var F=new g(k,U,R);this.files[k]=F}var l=e("./utf8"),c=e("./utils"),u=e("./stream/GenericWorker"),h=e("./stream/StreamHelper"),f=e("./defaults"),p=e("./compressedObject"),g=e("./zipObject"),m=e("./generate"),y=e("./nodejsUtils"),x=e("./nodejs/NodejsStreamInputAdapter"),_=function(k){k.slice(-1)==="/"&&(k=k.substring(0,k.length-1));var O=k.lastIndexOf("/");return 0<O?k.substring(0,O):""},v=function(k){return k.slice(-1)!=="/"&&(k+="/"),k},S=function(k,O){return O=O!==void 0?O:f.createFolders,k=v(k),this.files[k]||o.call(this,k,null,{dir:!0,createFolders:O}),this.files[k]};function w(k){return Object.prototype.toString.call(k)==="[object RegExp]"}var T={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(k){var O,D,z;for(O in this.files)z=this.files[O],(D=O.slice(this.root.length,O.length))&&O.slice(0,this.root.length)===this.root&&k(D,z)},filter:function(k){var O=[];return this.forEach(function(D,z){k(D,z)&&O.push(z)}),O},file:function(k,O,D){if(arguments.length!==1)return k=this.root+k,o.call(this,k,O,D),this;if(w(k)){var z=k;return this.filter(function(R,G){return!G.dir&&z.test(R)})}var I=this.files[this.root+k];return I&&!I.dir?I:null},folder:function(k){if(!k)return this;if(w(k))return this.filter(function(I,R){return R.dir&&k.test(I)});var O=this.root+k,D=S.call(this,O),z=this.clone();return z.root=D.name,z},remove:function(k){k=this.root+k;var O=this.files[k];if(O||(k.slice(-1)!=="/"&&(k+="/"),O=this.files[k]),O&&!O.dir)delete this.files[k];else for(var D=this.filter(function(I,R){return R.name.slice(0,k.length)===k}),z=0;z<D.length;z++)delete this.files[D[z].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(k){var O,D={};try{if((D=c.extend(k||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=D.type.toLowerCase(),D.compression=D.compression.toUpperCase(),D.type==="binarystring"&&(D.type="string"),!D.type)throw new Error("No output type specified.");c.checkSupport(D.type),D.platform!=="darwin"&&D.platform!=="freebsd"&&D.platform!=="linux"&&D.platform!=="sunos"||(D.platform="UNIX"),D.platform==="win32"&&(D.platform="DOS");var z=D.comment||this.comment||"";O=m.generateWorker(this,D,z)}catch(I){(O=new u("error")).error(I)}return new h(O,D.type||"string",D.mimeType)},generateAsync:function(k,O){return this.generateInternalStream(k).accumulate(O)},generateNodeStream:function(k,O){return(k=k||{}).type||(k.type="nodebuffer"),this.generateInternalStream(k).toNodejsStream(O)}};n.exports=T},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var u=0;u<this.data.length;u++)c[u]=255&c[u]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var u=c.charCodeAt(0),h=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),g=this.length-4;0<=g;--g)if(this.data[g]===u&&this.data[g+1]===h&&this.data[g+2]===f&&this.data[g+3]===p)return g-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var u=c.charCodeAt(0),h=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),g=this.readData(4);return u===g[0]&&h===g[1]&&f===g[2]&&p===g[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var u,h=0;for(this.checkOffset(c),u=this.index+c-1;u>=this.index;u--)h=(h<<8)+this.byteAt(u);return this.index+=c,h},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),u=e("./StringReader"),h=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(p){var g=o.getTypeOf(p);return o.checkSupport(g),g!=="string"||l.uint8array?g==="nodebuffer"?new h(p):l.uint8array?new f(o.transformTo("uint8array",p)):new c(o.transformTo("array",p)):new u(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(u){o.call(this,"ConvertWorker to "+u),this.destType=u}l.inherits(c,o),c.prototype.processChunk=function(u){this.push({data:l.transformTo(this.destType,u.data),meta:u.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(u){this.streamInfo.crc32=l(u.data,this.streamInfo.crc32||0),this.push(u)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}o.inherits(c,l),c.prototype.processChunk=function(u){if(u){var h=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=h+u.data.length}l.prototype.processChunk.call(this,u)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataWorker");var h=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(f){h.dataIsReady=!0,h.data=f,h.max=f&&f.length||0,h.type=o.getTypeOf(f),h.isPaused||h._tickAndRepeat()},function(f){h.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,h=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,h);break;case"uint8array":u=this.data.subarray(this.index,h);break;case"array":case"nodebuffer":u=this.data.slice(this.index,h)}return this.index=h,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var u=0;u<this._listeners[l].length;u++)this._listeners[l][u].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(u){c.processChunk(u)}),l.on("end",function(){c.end()}),l.on("error",function(u){c.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),u=e("../base64"),h=e("../support"),f=e("../external"),p=null;if(h.nodestream)try{p=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function g(y,x){return new f.Promise(function(_,v){var S=[],w=y._internalType,T=y._outputType,k=y._mimeType;y.on("data",function(O,D){S.push(O),x&&x(D)}).on("error",function(O){S=[],v(O)}).on("end",function(){try{var O=function(D,z,I){switch(D){case"blob":return o.newBlob(o.transformTo("arraybuffer",z),I);case"base64":return u.encode(z);default:return o.transformTo(D,z)}}(T,function(D,z){var I,R=0,G=null,U=0;for(I=0;I<z.length;I++)U+=z[I].length;switch(D){case"string":return z.join("");case"array":return Array.prototype.concat.apply([],z);case"uint8array":for(G=new Uint8Array(U),I=0;I<z.length;I++)G.set(z[I],R),R+=z[I].length;return G;case"nodebuffer":return Buffer.concat(z);default:throw new Error("concat : unsupported type '"+D+"'")}}(w,S),k);_(O)}catch(D){v(D)}S=[]}).resume()})}function m(y,x,_){var v=x;switch(x){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=x,this._mimeType=_,o.checkSupport(v),this._worker=y.pipe(new l(v)),y.lock()}catch(S){this._worker=new c("error"),this._worker.error(S)}}m.prototype={accumulate:function(y){return g(this,y)},on:function(y,x){var _=this;return y==="data"?this._worker.on(y,function(v){x.call(_,v.data,v.meta)}):this._worker.on(y,function(){o.delay(x,arguments,_)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(y){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},y)}},n.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),u=e("./stream/GenericWorker"),h=new Array(256),f=0;f<256;f++)h[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;h[254]=h[254]=1;function p(){u.call(this,"utf-8 decode"),this.leftOver=null}function g(){u.call(this,"utf-8 encode")}s.utf8encode=function(m){return l.nodebuffer?c.newBufferFrom(m,"utf-8"):function(y){var x,_,v,S,w,T=y.length,k=0;for(S=0;S<T;S++)(64512&(_=y.charCodeAt(S)))==55296&&S+1<T&&(64512&(v=y.charCodeAt(S+1)))==56320&&(_=65536+(_-55296<<10)+(v-56320),S++),k+=_<128?1:_<2048?2:_<65536?3:4;for(x=l.uint8array?new Uint8Array(k):new Array(k),S=w=0;w<k;S++)(64512&(_=y.charCodeAt(S)))==55296&&S+1<T&&(64512&(v=y.charCodeAt(S+1)))==56320&&(_=65536+(_-55296<<10)+(v-56320),S++),_<128?x[w++]=_:(_<2048?x[w++]=192|_>>>6:(_<65536?x[w++]=224|_>>>12:(x[w++]=240|_>>>18,x[w++]=128|_>>>12&63),x[w++]=128|_>>>6&63),x[w++]=128|63&_);return x}(m)},s.utf8decode=function(m){return l.nodebuffer?o.transformTo("nodebuffer",m).toString("utf-8"):function(y){var x,_,v,S,w=y.length,T=new Array(2*w);for(x=_=0;x<w;)if((v=y[x++])<128)T[_++]=v;else if(4<(S=h[v]))T[_++]=65533,x+=S-1;else{for(v&=S===2?31:S===3?15:7;1<S&&x<w;)v=v<<6|63&y[x++],S--;1<S?T[_++]=65533:v<65536?T[_++]=v:(v-=65536,T[_++]=55296|v>>10&1023,T[_++]=56320|1023&v)}return T.length!==_&&(T.subarray?T=T.subarray(0,_):T.length=_),o.applyFromCharCode(T)}(m=o.transformTo(l.uint8array?"uint8array":"array",m))},o.inherits(p,u),p.prototype.processChunk=function(m){var y=o.transformTo(l.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var x=y;(y=new Uint8Array(x.length+this.leftOver.length)).set(this.leftOver,0),y.set(x,this.leftOver.length)}else y=this.leftOver.concat(y);this.leftOver=null}var _=function(S,w){var T;for((w=w||S.length)>S.length&&(w=S.length),T=w-1;0<=T&&(192&S[T])==128;)T--;return T<0||T===0?w:T+h[S[T]]>w?T:w}(y),v=y;_!==y.length&&(l.uint8array?(v=y.subarray(0,_),this.leftOver=y.subarray(_,y.length)):(v=y.slice(0,_),this.leftOver=y.slice(_,y.length))),this.push({data:s.utf8decode(v),meta:m.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=p,o.inherits(g,u),g.prototype.processChunk=function(m){this.push({data:s.utf8encode(m.data),meta:m.meta})},s.Utf8EncodeWorker=g},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),u=e("./external");function h(x){return x}function f(x,_){for(var v=0;v<x.length;++v)_[v]=255&x.charCodeAt(v);return _}e("setimmediate"),s.newBlob=function(x,_){s.checkSupport("blob");try{return new Blob([x],{type:_})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(x),v.getBlob(_)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(x,_,v){var S=[],w=0,T=x.length;if(T<=v)return String.fromCharCode.apply(null,x);for(;w<T;)_==="array"||_==="nodebuffer"?S.push(String.fromCharCode.apply(null,x.slice(w,Math.min(w+v,T)))):S.push(String.fromCharCode.apply(null,x.subarray(w,Math.min(w+v,T)))),w+=v;return S.join("")},stringifyByChar:function(x){for(var _="",v=0;v<x.length;v++)_+=String.fromCharCode(x[v]);return _},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function g(x){var _=65536,v=s.getTypeOf(x),S=!0;if(v==="uint8array"?S=p.applyCanBeUsed.uint8array:v==="nodebuffer"&&(S=p.applyCanBeUsed.nodebuffer),S)for(;1<_;)try{return p.stringifyByChunk(x,v,_)}catch{_=Math.floor(_/2)}return p.stringifyByChar(x)}function m(x,_){for(var v=0;v<x.length;v++)_[v]=x[v];return _}s.applyFromCharCode=g;var y={};y.string={string:h,array:function(x){return f(x,new Array(x.length))},arraybuffer:function(x){return y.string.uint8array(x).buffer},uint8array:function(x){return f(x,new Uint8Array(x.length))},nodebuffer:function(x){return f(x,c.allocBuffer(x.length))}},y.array={string:g,array:h,arraybuffer:function(x){return new Uint8Array(x).buffer},uint8array:function(x){return new Uint8Array(x)},nodebuffer:function(x){return c.newBufferFrom(x)}},y.arraybuffer={string:function(x){return g(new Uint8Array(x))},array:function(x){return m(new Uint8Array(x),new Array(x.byteLength))},arraybuffer:h,uint8array:function(x){return new Uint8Array(x)},nodebuffer:function(x){return c.newBufferFrom(new Uint8Array(x))}},y.uint8array={string:g,array:function(x){return m(x,new Array(x.length))},arraybuffer:function(x){return x.buffer},uint8array:h,nodebuffer:function(x){return c.newBufferFrom(x)}},y.nodebuffer={string:g,array:function(x){return m(x,new Array(x.length))},arraybuffer:function(x){return y.nodebuffer.uint8array(x).buffer},uint8array:function(x){return m(x,new Uint8Array(x.length))},nodebuffer:h},s.transformTo=function(x,_){if(_=_||"",!x)return _;s.checkSupport(x);var v=s.getTypeOf(_);return y[v][x](_)},s.resolve=function(x){for(var _=x.split("/"),v=[],S=0;S<_.length;S++){var w=_[S];w==="."||w===""&&S!==0&&S!==_.length-1||(w===".."?v.pop():v.push(w))}return v.join("/")},s.getTypeOf=function(x){return typeof x=="string"?"string":Object.prototype.toString.call(x)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(x)?"nodebuffer":o.uint8array&&x instanceof Uint8Array?"uint8array":o.arraybuffer&&x instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(x){if(!o[x.toLowerCase()])throw new Error(x+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(x){var _,v,S="";for(v=0;v<(x||"").length;v++)S+="\\x"+((_=x.charCodeAt(v))<16?"0":"")+_.toString(16).toUpperCase();return S},s.delay=function(x,_,v){setImmediate(function(){x.apply(v||null,_||[])})},s.inherits=function(x,_){function v(){}v.prototype=_.prototype,x.prototype=new v},s.extend=function(){var x,_,v={};for(x=0;x<arguments.length;x++)for(_ in arguments[x])Object.prototype.hasOwnProperty.call(arguments[x],_)&&v[_]===void 0&&(v[_]=arguments[x][_]);return v},s.prepareContent=function(x,_,v,S,w){return u.Promise.resolve(_).then(function(T){return o.blob&&(T instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(T))!==-1)&&typeof FileReader<"u"?new u.Promise(function(k,O){var D=new FileReader;D.onload=function(z){k(z.target.result)},D.onerror=function(z){O(z.target.error)},D.readAsArrayBuffer(T)}):T}).then(function(T){var k=s.getTypeOf(T);return k?(k==="arraybuffer"?T=s.transformTo("uint8array",T):k==="string"&&(w?T=l.decode(T):v&&S!==!0&&(T=function(O){return f(O,o.uint8array?new Uint8Array(O.length):new Array(O.length))}(T))),T):u.Promise.reject(new Error("Can't read the data of '"+x+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),u=e("./zipEntry"),h=e("./support");function f(p){this.files=[],this.loadOptions=p}f.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var g=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(g)+", expected "+l.pretty(p)+")")}},isSignature:function(p,g){var m=this.reader.index;this.reader.setIndex(p);var y=this.reader.readString(4)===g;return this.reader.setIndex(m),y},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),g=h.uint8array?"uint8array":"array",m=l.transformTo(g,p);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,g,m,y=this.zip64EndOfCentralSize-44;0<y;)p=this.reader.readInt(2),g=this.reader.readInt(4),m=this.reader.readData(g),this.zip64ExtensibleData[p]={id:p,length:g,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,g;for(p=0;p<this.files.length;p++)g=this.files[p],this.reader.setIndex(g.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),g.readLocalPart(this.reader),g.handleUTF8(),g.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(p=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var g=p;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var y=g-m;if(0<y)this.isSignature(g,c.CENTRAL_FILE_HEADER)||(this.reader.zero=y);else if(y<0)throw new Error("Corrupted zip: missing "+Math.abs(y)+" bytes.")},prepareReader:function(p){this.reader=o(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),u=e("./crc32"),h=e("./utf8"),f=e("./compressions"),p=e("./support");function g(m,y){this.options=m,this.loadOptions=y}g.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var y,x;if(m.skip(22),this.fileNameLength=m.readInt(2),x=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(x),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((y=function(_){for(var v in f)if(Object.prototype.hasOwnProperty.call(f,v)&&f[v].magic===_)return f[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,y,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var y=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(y),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var y,x,_,v=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<v;)y=m.readInt(2),x=m.readInt(2),_=m.readData(x),this.extraFields[y]={id:y,length:x,value:_};m.setIndex(v)},handleUTF8:function(){var m=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var y=this.findExtraFieldUnicodePath();if(y!==null)this.fileNameStr=y;else{var x=l.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(x)}var _=this.findExtraFieldUnicodeComment();if(_!==null)this.fileCommentStr=_;else{var v=l.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var y=o(m.value);return y.readInt(1)!==1||u(this.fileName)!==y.readInt(4)?null:h.utf8decode(y.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var y=o(m.value);return y.readInt(1)!==1||u(this.fileComment)!==y.readInt(4)?null:h.utf8decode(y.readData(m.length-5))}return null}},n.exports=g},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(y,x,_){this.name=y,this.dir=_.dir,this.date=_.date,this.comment=_.comment,this.unixPermissions=_.unixPermissions,this.dosPermissions=_.dosPermissions,this._data=x,this._dataBinary=_.binary,this.options={compression:_.compression,compressionOptions:_.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),u=e("./utf8"),h=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(y){var x=null,_="string";try{if(!y)throw new Error("No output type specified.");var v=(_=y.toLowerCase())==="string"||_==="text";_!=="binarystring"&&_!=="text"||(_="string"),x=this._decompressWorker();var S=!this._dataBinary;S&&!v&&(x=x.pipe(new u.Utf8EncodeWorker)),!S&&v&&(x=x.pipe(new u.Utf8DecodeWorker))}catch(w){(x=new f("error")).error(w)}return new l(x,_,"")},async:function(y,x){return this.internalStream(y).accumulate(x)},nodeStream:function(y,x){return this.internalStream(y||"nodebuffer").toNodejsStream(x)},_compressWorker:function(y,x){if(this._data instanceof h&&this._data.compression.magic===y.magic)return this._data.getCompressedWorker();var _=this._decompressWorker();return this._dataBinary||(_=_.pipe(new u.Utf8EncodeWorker)),h.createWorkerFrom(_,y,x)},_decompressWorker:function(){return this._data instanceof h?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],g=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<p.length;m++)o.prototype[p[m]]=g;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,u=o.MutationObserver||o.WebKitMutationObserver;if(u){var h=0,f=new u(y),p=o.document.createTextNode("");f.observe(p,{characterData:!0}),l=function(){p.data=h=++h%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var x=o.document.createElement("script");x.onreadystatechange=function(){y(),x.onreadystatechange=null,x.parentNode.removeChild(x),x=null},o.document.documentElement.appendChild(x)}:function(){setTimeout(y,0)};else{var g=new o.MessageChannel;g.port1.onmessage=y,l=function(){g.port2.postMessage(0)}}var m=[];function y(){var x,_;c=!0;for(var v=m.length;v;){for(_=m,m=[],x=-1;++x<v;)_[x]();v=m.length}c=!1}n.exports=function(x){m.push(x)!==1||c||l()}}).call(this,typeof ro<"u"?ro:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},u=["REJECTED"],h=["FULFILLED"],f=["PENDING"];function p(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,v!==l&&x(this,v)}function g(v,S,w){this.promise=v,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function m(v,S,w){o(function(){var T;try{T=S(w)}catch(k){return c.reject(v,k)}T===v?c.reject(v,new TypeError("Cannot resolve promise with itself")):c.resolve(v,T)})}function y(v){var S=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof S=="function")return function(){S.apply(v,arguments)}}function x(v,S){var w=!1;function T(D){w||(w=!0,c.reject(v,D))}function k(D){w||(w=!0,c.resolve(v,D))}var O=_(function(){S(k,T)});O.status==="error"&&T(O.value)}function _(v,S){var w={};try{w.value=v(S),w.status="success"}catch(T){w.status="error",w.value=T}return w}(n.exports=p).prototype.finally=function(v){if(typeof v!="function")return this;var S=this.constructor;return this.then(function(w){return S.resolve(v()).then(function(){return w})},function(w){return S.resolve(v()).then(function(){throw w})})},p.prototype.catch=function(v){return this.then(null,v)},p.prototype.then=function(v,S){if(typeof v!="function"&&this.state===h||typeof S!="function"&&this.state===u)return this;var w=new this.constructor(l);return this.state!==f?m(w,this.state===h?v:S,this.outcome):this.queue.push(new g(w,v,S)),w},g.prototype.callFulfilled=function(v){c.resolve(this.promise,v)},g.prototype.otherCallFulfilled=function(v){m(this.promise,this.onFulfilled,v)},g.prototype.callRejected=function(v){c.reject(this.promise,v)},g.prototype.otherCallRejected=function(v){m(this.promise,this.onRejected,v)},c.resolve=function(v,S){var w=_(y,S);if(w.status==="error")return c.reject(v,w.value);var T=w.value;if(T)x(v,T);else{v.state=h,v.outcome=S;for(var k=-1,O=v.queue.length;++k<O;)v.queue[k].callFulfilled(S)}return v},c.reject=function(v,S){v.state=u,v.outcome=S;for(var w=-1,T=v.queue.length;++w<T;)v.queue[w].callRejected(S);return v},p.resolve=function(v){return v instanceof this?v:c.resolve(new this(l),v)},p.reject=function(v){var S=new this(l);return c.reject(S,v)},p.all=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,T=!1;if(!w)return this.resolve([]);for(var k=new Array(w),O=0,D=-1,z=new this(l);++D<w;)I(v[D],D);return z;function I(R,G){S.resolve(R).then(function(U){k[G]=U,++O!==w||T||(T=!0,c.resolve(z,k))},function(U){T||(T=!0,c.reject(z,U))})}},p.race=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,T=!1;if(!w)return this.resolve([]);for(var k=-1,O=new this(l);++k<w;)D=v[k],S.resolve(D).then(function(z){T||(T=!0,c.resolve(O,z))},function(z){T||(T=!0,c.reject(O,z))});var D;return O}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/messages"),h=e("./zlib/zstream"),f=Object.prototype.toString,p=0,g=-1,m=0,y=8;function x(v){if(!(this instanceof x))return new x(v);this.options=l.assign({level:g,method:y,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},v||{});var S=this.options;S.raw&&0<S.windowBits?S.windowBits=-S.windowBits:S.gzip&&0<S.windowBits&&S.windowBits<16&&(S.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var w=o.deflateInit2(this.strm,S.level,S.method,S.windowBits,S.memLevel,S.strategy);if(w!==p)throw new Error(u[w]);if(S.header&&o.deflateSetHeader(this.strm,S.header),S.dictionary){var T;if(T=typeof S.dictionary=="string"?c.string2buf(S.dictionary):f.call(S.dictionary)==="[object ArrayBuffer]"?new Uint8Array(S.dictionary):S.dictionary,(w=o.deflateSetDictionary(this.strm,T))!==p)throw new Error(u[w]);this._dict_set=!0}}function _(v,S){var w=new x(S);if(w.push(v,!0),w.err)throw w.msg||u[w.err];return w.result}x.prototype.push=function(v,S){var w,T,k=this.strm,O=this.options.chunkSize;if(this.ended)return!1;T=S===~~S?S:S===!0?4:0,typeof v=="string"?k.input=c.string2buf(v):f.call(v)==="[object ArrayBuffer]"?k.input=new Uint8Array(v):k.input=v,k.next_in=0,k.avail_in=k.input.length;do{if(k.avail_out===0&&(k.output=new l.Buf8(O),k.next_out=0,k.avail_out=O),(w=o.deflate(k,T))!==1&&w!==p)return this.onEnd(w),!(this.ended=!0);k.avail_out!==0&&(k.avail_in!==0||T!==4&&T!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(k.output,k.next_out))):this.onData(l.shrinkBuf(k.output,k.next_out)))}while((0<k.avail_in||k.avail_out===0)&&w!==1);return T===4?(w=o.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===p):T!==2||(this.onEnd(p),!(k.avail_out=0))},x.prototype.onData=function(v){this.chunks.push(v)},x.prototype.onEnd=function(v){v===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=x,s.deflate=_,s.deflateRaw=function(v,S){return(S=S||{}).raw=!0,_(v,S)},s.gzip=function(v,S){return(S=S||{}).gzip=!0,_(v,S)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/constants"),h=e("./zlib/messages"),f=e("./zlib/zstream"),p=e("./zlib/gzheader"),g=Object.prototype.toString;function m(x){if(!(this instanceof m))return new m(x);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},x||{});var _=this.options;_.raw&&0<=_.windowBits&&_.windowBits<16&&(_.windowBits=-_.windowBits,_.windowBits===0&&(_.windowBits=-15)),!(0<=_.windowBits&&_.windowBits<16)||x&&x.windowBits||(_.windowBits+=32),15<_.windowBits&&_.windowBits<48&&!(15&_.windowBits)&&(_.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var v=o.inflateInit2(this.strm,_.windowBits);if(v!==u.Z_OK)throw new Error(h[v]);this.header=new p,o.inflateGetHeader(this.strm,this.header)}function y(x,_){var v=new m(_);if(v.push(x,!0),v.err)throw v.msg||h[v.err];return v.result}m.prototype.push=function(x,_){var v,S,w,T,k,O,D=this.strm,z=this.options.chunkSize,I=this.options.dictionary,R=!1;if(this.ended)return!1;S=_===~~_?_:_===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof x=="string"?D.input=c.binstring2buf(x):g.call(x)==="[object ArrayBuffer]"?D.input=new Uint8Array(x):D.input=x,D.next_in=0,D.avail_in=D.input.length;do{if(D.avail_out===0&&(D.output=new l.Buf8(z),D.next_out=0,D.avail_out=z),(v=o.inflate(D,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&I&&(O=typeof I=="string"?c.string2buf(I):g.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,v=o.inflateSetDictionary(this.strm,O)),v===u.Z_BUF_ERROR&&R===!0&&(v=u.Z_OK,R=!1),v!==u.Z_STREAM_END&&v!==u.Z_OK)return this.onEnd(v),!(this.ended=!0);D.next_out&&(D.avail_out!==0&&v!==u.Z_STREAM_END&&(D.avail_in!==0||S!==u.Z_FINISH&&S!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=c.utf8border(D.output,D.next_out),T=D.next_out-w,k=c.buf2string(D.output,w),D.next_out=T,D.avail_out=z-T,T&&l.arraySet(D.output,D.output,w,T,0),this.onData(k)):this.onData(l.shrinkBuf(D.output,D.next_out)))),D.avail_in===0&&D.avail_out===0&&(R=!0)}while((0<D.avail_in||D.avail_out===0)&&v!==u.Z_STREAM_END);return v===u.Z_STREAM_END&&(S=u.Z_FINISH),S===u.Z_FINISH?(v=o.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===u.Z_OK):S!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(D.avail_out=0))},m.prototype.onData=function(x){this.chunks.push(x)},m.prototype.onEnd=function(x){x===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=x,this.msg=this.strm.msg},s.Inflate=m,s.inflate=y,s.inflateRaw=function(x,_){return(_=_||{}).raw=!0,y(x,_)},s.ungzip=y},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(u){for(var h=Array.prototype.slice.call(arguments,1);h.length;){var f=h.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var p in f)f.hasOwnProperty(p)&&(u[p]=f[p])}}return u},s.shrinkBuf=function(u,h){return u.length===h?u:u.subarray?u.subarray(0,h):(u.length=h,u)};var l={arraySet:function(u,h,f,p,g){if(h.subarray&&u.subarray)u.set(h.subarray(f,f+p),g);else for(var m=0;m<p;m++)u[g+m]=h[f+m]},flattenChunks:function(u){var h,f,p,g,m,y;for(h=p=0,f=u.length;h<f;h++)p+=u[h].length;for(y=new Uint8Array(p),h=g=0,f=u.length;h<f;h++)m=u[h],y.set(m,g),g+=m.length;return y}},c={arraySet:function(u,h,f,p,g){for(var m=0;m<p;m++)u[g+m]=h[f+m]},flattenChunks:function(u){return[].concat.apply([],u)}};s.setTyped=function(u){u?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var u=new o.Buf8(256),h=0;h<256;h++)u[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;function f(p,g){if(g<65537&&(p.subarray&&c||!p.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(p,g));for(var m="",y=0;y<g;y++)m+=String.fromCharCode(p[y]);return m}u[254]=u[254]=1,s.string2buf=function(p){var g,m,y,x,_,v=p.length,S=0;for(x=0;x<v;x++)(64512&(m=p.charCodeAt(x)))==55296&&x+1<v&&(64512&(y=p.charCodeAt(x+1)))==56320&&(m=65536+(m-55296<<10)+(y-56320),x++),S+=m<128?1:m<2048?2:m<65536?3:4;for(g=new o.Buf8(S),x=_=0;_<S;x++)(64512&(m=p.charCodeAt(x)))==55296&&x+1<v&&(64512&(y=p.charCodeAt(x+1)))==56320&&(m=65536+(m-55296<<10)+(y-56320),x++),m<128?g[_++]=m:(m<2048?g[_++]=192|m>>>6:(m<65536?g[_++]=224|m>>>12:(g[_++]=240|m>>>18,g[_++]=128|m>>>12&63),g[_++]=128|m>>>6&63),g[_++]=128|63&m);return g},s.buf2binstring=function(p){return f(p,p.length)},s.binstring2buf=function(p){for(var g=new o.Buf8(p.length),m=0,y=g.length;m<y;m++)g[m]=p.charCodeAt(m);return g},s.buf2string=function(p,g){var m,y,x,_,v=g||p.length,S=new Array(2*v);for(m=y=0;m<v;)if((x=p[m++])<128)S[y++]=x;else if(4<(_=u[x]))S[y++]=65533,m+=_-1;else{for(x&=_===2?31:_===3?15:7;1<_&&m<v;)x=x<<6|63&p[m++],_--;1<_?S[y++]=65533:x<65536?S[y++]=x:(x-=65536,S[y++]=55296|x>>10&1023,S[y++]=56320|1023&x)}return f(S,y)},s.utf8border=function(p,g){var m;for((g=g||p.length)>p.length&&(g=p.length),m=g-1;0<=m&&(192&p[m])==128;)m--;return m<0||m===0?g:m+u[p[m]]>g?m:g}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,u){for(var h=65535&o|0,f=o>>>16&65535|0,p=0;c!==0;){for(c-=p=2e3<c?2e3:c;f=f+(h=h+l[u++]|0)|0,--p;);h%=65521,f%=65521}return h|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],u=0;u<256;u++){l=u;for(var h=0;h<8;h++)l=1&l?3988292384^l>>>1:l>>>1;c[u]=l}return c}();n.exports=function(l,c,u,h){var f=o,p=h+u;l^=-1;for(var g=h;g<p;g++)l=l>>>8^f[255&(l^c[g])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),u=e("./adler32"),h=e("./crc32"),f=e("./messages"),p=0,g=4,m=0,y=-2,x=-1,_=4,v=2,S=8,w=9,T=286,k=30,O=19,D=2*T+1,z=15,I=3,R=258,G=R+I+1,U=42,F=113,E=1,Z=2,ot=3,rt=4;function W(A,nt){return A.msg=f[nt],nt}function it(A){return(A<<1)-(4<A?9:0)}function et(A){for(var nt=A.length;0<=--nt;)A[nt]=0}function q(A){var nt=A.state,K=nt.pending;K>A.avail_out&&(K=A.avail_out),K!==0&&(l.arraySet(A.output,nt.pending_buf,nt.pending_out,K,A.next_out),A.next_out+=K,nt.pending_out+=K,A.total_out+=K,A.avail_out-=K,nt.pending-=K,nt.pending===0&&(nt.pending_out=0))}function Y(A,nt){c._tr_flush_block(A,0<=A.block_start?A.block_start:-1,A.strstart-A.block_start,nt),A.block_start=A.strstart,q(A.strm)}function At(A,nt){A.pending_buf[A.pending++]=nt}function tt(A,nt){A.pending_buf[A.pending++]=nt>>>8&255,A.pending_buf[A.pending++]=255&nt}function st(A,nt){var K,P,M=A.max_chain_length,H=A.strstart,j=A.prev_length,Q=A.nice_match,X=A.strstart>A.w_size-G?A.strstart-(A.w_size-G):0,ft=A.window,lt=A.w_mask,pt=A.prev,Tt=A.strstart+R,Et=ft[H+j-1],Lt=ft[H+j];A.prev_length>=A.good_match&&(M>>=2),Q>A.lookahead&&(Q=A.lookahead);do if(ft[(K=nt)+j]===Lt&&ft[K+j-1]===Et&&ft[K]===ft[H]&&ft[++K]===ft[H+1]){H+=2,K++;do;while(ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&ft[++H]===ft[++K]&&H<Tt);if(P=R-(Tt-H),H=Tt-R,j<P){if(A.match_start=nt,Q<=(j=P))break;Et=ft[H+j-1],Lt=ft[H+j]}}while((nt=pt[nt&lt])>X&&--M!=0);return j<=A.lookahead?j:A.lookahead}function wt(A){var nt,K,P,M,H,j,Q,X,ft,lt,pt=A.w_size;do{if(M=A.window_size-A.lookahead-A.strstart,A.strstart>=pt+(pt-G)){for(l.arraySet(A.window,A.window,pt,pt,0),A.match_start-=pt,A.strstart-=pt,A.block_start-=pt,nt=K=A.hash_size;P=A.head[--nt],A.head[nt]=pt<=P?P-pt:0,--K;);for(nt=K=pt;P=A.prev[--nt],A.prev[nt]=pt<=P?P-pt:0,--K;);M+=pt}if(A.strm.avail_in===0)break;if(j=A.strm,Q=A.window,X=A.strstart+A.lookahead,ft=M,lt=void 0,lt=j.avail_in,ft<lt&&(lt=ft),K=lt===0?0:(j.avail_in-=lt,l.arraySet(Q,j.input,j.next_in,lt,X),j.state.wrap===1?j.adler=u(j.adler,Q,lt,X):j.state.wrap===2&&(j.adler=h(j.adler,Q,lt,X)),j.next_in+=lt,j.total_in+=lt,lt),A.lookahead+=K,A.lookahead+A.insert>=I)for(H=A.strstart-A.insert,A.ins_h=A.window[H],A.ins_h=(A.ins_h<<A.hash_shift^A.window[H+1])&A.hash_mask;A.insert&&(A.ins_h=(A.ins_h<<A.hash_shift^A.window[H+I-1])&A.hash_mask,A.prev[H&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=H,H++,A.insert--,!(A.lookahead+A.insert<I)););}while(A.lookahead<G&&A.strm.avail_in!==0)}function St(A,nt){for(var K,P;;){if(A.lookahead<G){if(wt(A),A.lookahead<G&&nt===p)return E;if(A.lookahead===0)break}if(K=0,A.lookahead>=I&&(A.ins_h=(A.ins_h<<A.hash_shift^A.window[A.strstart+I-1])&A.hash_mask,K=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),K!==0&&A.strstart-K<=A.w_size-G&&(A.match_length=st(A,K)),A.match_length>=I)if(P=c._tr_tally(A,A.strstart-A.match_start,A.match_length-I),A.lookahead-=A.match_length,A.match_length<=A.max_lazy_match&&A.lookahead>=I){for(A.match_length--;A.strstart++,A.ins_h=(A.ins_h<<A.hash_shift^A.window[A.strstart+I-1])&A.hash_mask,K=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart,--A.match_length!=0;);A.strstart++}else A.strstart+=A.match_length,A.match_length=0,A.ins_h=A.window[A.strstart],A.ins_h=(A.ins_h<<A.hash_shift^A.window[A.strstart+1])&A.hash_mask;else P=c._tr_tally(A,0,A.window[A.strstart]),A.lookahead--,A.strstart++;if(P&&(Y(A,!1),A.strm.avail_out===0))return E}return A.insert=A.strstart<I-1?A.strstart:I-1,nt===g?(Y(A,!0),A.strm.avail_out===0?ot:rt):A.last_lit&&(Y(A,!1),A.strm.avail_out===0)?E:Z}function Pt(A,nt){for(var K,P,M;;){if(A.lookahead<G){if(wt(A),A.lookahead<G&&nt===p)return E;if(A.lookahead===0)break}if(K=0,A.lookahead>=I&&(A.ins_h=(A.ins_h<<A.hash_shift^A.window[A.strstart+I-1])&A.hash_mask,K=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),A.prev_length=A.match_length,A.prev_match=A.match_start,A.match_length=I-1,K!==0&&A.prev_length<A.max_lazy_match&&A.strstart-K<=A.w_size-G&&(A.match_length=st(A,K),A.match_length<=5&&(A.strategy===1||A.match_length===I&&4096<A.strstart-A.match_start)&&(A.match_length=I-1)),A.prev_length>=I&&A.match_length<=A.prev_length){for(M=A.strstart+A.lookahead-I,P=c._tr_tally(A,A.strstart-1-A.prev_match,A.prev_length-I),A.lookahead-=A.prev_length-1,A.prev_length-=2;++A.strstart<=M&&(A.ins_h=(A.ins_h<<A.hash_shift^A.window[A.strstart+I-1])&A.hash_mask,K=A.prev[A.strstart&A.w_mask]=A.head[A.ins_h],A.head[A.ins_h]=A.strstart),--A.prev_length!=0;);if(A.match_available=0,A.match_length=I-1,A.strstart++,P&&(Y(A,!1),A.strm.avail_out===0))return E}else if(A.match_available){if((P=c._tr_tally(A,0,A.window[A.strstart-1]))&&Y(A,!1),A.strstart++,A.lookahead--,A.strm.avail_out===0)return E}else A.match_available=1,A.strstart++,A.lookahead--}return A.match_available&&(P=c._tr_tally(A,0,A.window[A.strstart-1]),A.match_available=0),A.insert=A.strstart<I-1?A.strstart:I-1,nt===g?(Y(A,!0),A.strm.avail_out===0?ot:rt):A.last_lit&&(Y(A,!1),A.strm.avail_out===0)?E:Z}function It(A,nt,K,P,M){this.good_length=A,this.max_lazy=nt,this.nice_length=K,this.max_chain=P,this.func=M}function Ut(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=S,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*D),this.dyn_dtree=new l.Buf16(2*(2*k+1)),this.bl_tree=new l.Buf16(2*(2*O+1)),et(this.dyn_ltree),et(this.dyn_dtree),et(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(z+1),this.heap=new l.Buf16(2*T+1),et(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*T+1),et(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function at(A){var nt;return A&&A.state?(A.total_in=A.total_out=0,A.data_type=v,(nt=A.state).pending=0,nt.pending_out=0,nt.wrap<0&&(nt.wrap=-nt.wrap),nt.status=nt.wrap?U:F,A.adler=nt.wrap===2?0:1,nt.last_flush=p,c._tr_init(nt),m):W(A,y)}function xt(A){var nt=at(A);return nt===m&&function(K){K.window_size=2*K.w_size,et(K.head),K.max_lazy_match=o[K.level].max_lazy,K.good_match=o[K.level].good_length,K.nice_match=o[K.level].nice_length,K.max_chain_length=o[K.level].max_chain,K.strstart=0,K.block_start=0,K.lookahead=0,K.insert=0,K.match_length=K.prev_length=I-1,K.match_available=0,K.ins_h=0}(A.state),nt}function bt(A,nt,K,P,M,H){if(!A)return y;var j=1;if(nt===x&&(nt=6),P<0?(j=0,P=-P):15<P&&(j=2,P-=16),M<1||w<M||K!==S||P<8||15<P||nt<0||9<nt||H<0||_<H)return W(A,y);P===8&&(P=9);var Q=new Ut;return(A.state=Q).strm=A,Q.wrap=j,Q.gzhead=null,Q.w_bits=P,Q.w_size=1<<Q.w_bits,Q.w_mask=Q.w_size-1,Q.hash_bits=M+7,Q.hash_size=1<<Q.hash_bits,Q.hash_mask=Q.hash_size-1,Q.hash_shift=~~((Q.hash_bits+I-1)/I),Q.window=new l.Buf8(2*Q.w_size),Q.head=new l.Buf16(Q.hash_size),Q.prev=new l.Buf16(Q.w_size),Q.lit_bufsize=1<<M+6,Q.pending_buf_size=4*Q.lit_bufsize,Q.pending_buf=new l.Buf8(Q.pending_buf_size),Q.d_buf=1*Q.lit_bufsize,Q.l_buf=3*Q.lit_bufsize,Q.level=nt,Q.strategy=H,Q.method=K,xt(A)}o=[new It(0,0,0,0,function(A,nt){var K=65535;for(K>A.pending_buf_size-5&&(K=A.pending_buf_size-5);;){if(A.lookahead<=1){if(wt(A),A.lookahead===0&&nt===p)return E;if(A.lookahead===0)break}A.strstart+=A.lookahead,A.lookahead=0;var P=A.block_start+K;if((A.strstart===0||A.strstart>=P)&&(A.lookahead=A.strstart-P,A.strstart=P,Y(A,!1),A.strm.avail_out===0)||A.strstart-A.block_start>=A.w_size-G&&(Y(A,!1),A.strm.avail_out===0))return E}return A.insert=0,nt===g?(Y(A,!0),A.strm.avail_out===0?ot:rt):(A.strstart>A.block_start&&(Y(A,!1),A.strm.avail_out),E)}),new It(4,4,8,4,St),new It(4,5,16,8,St),new It(4,6,32,32,St),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(A,nt){return bt(A,nt,S,15,8,0)},s.deflateInit2=bt,s.deflateReset=xt,s.deflateResetKeep=at,s.deflateSetHeader=function(A,nt){return A&&A.state?A.state.wrap!==2?y:(A.state.gzhead=nt,m):y},s.deflate=function(A,nt){var K,P,M,H;if(!A||!A.state||5<nt||nt<0)return A?W(A,y):y;if(P=A.state,!A.output||!A.input&&A.avail_in!==0||P.status===666&&nt!==g)return W(A,A.avail_out===0?-5:y);if(P.strm=A,K=P.last_flush,P.last_flush=nt,P.status===U)if(P.wrap===2)A.adler=0,At(P,31),At(P,139),At(P,8),P.gzhead?(At(P,(P.gzhead.text?1:0)+(P.gzhead.hcrc?2:0)+(P.gzhead.extra?4:0)+(P.gzhead.name?8:0)+(P.gzhead.comment?16:0)),At(P,255&P.gzhead.time),At(P,P.gzhead.time>>8&255),At(P,P.gzhead.time>>16&255),At(P,P.gzhead.time>>24&255),At(P,P.level===9?2:2<=P.strategy||P.level<2?4:0),At(P,255&P.gzhead.os),P.gzhead.extra&&P.gzhead.extra.length&&(At(P,255&P.gzhead.extra.length),At(P,P.gzhead.extra.length>>8&255)),P.gzhead.hcrc&&(A.adler=h(A.adler,P.pending_buf,P.pending,0)),P.gzindex=0,P.status=69):(At(P,0),At(P,0),At(P,0),At(P,0),At(P,0),At(P,P.level===9?2:2<=P.strategy||P.level<2?4:0),At(P,3),P.status=F);else{var j=S+(P.w_bits-8<<4)<<8;j|=(2<=P.strategy||P.level<2?0:P.level<6?1:P.level===6?2:3)<<6,P.strstart!==0&&(j|=32),j+=31-j%31,P.status=F,tt(P,j),P.strstart!==0&&(tt(P,A.adler>>>16),tt(P,65535&A.adler)),A.adler=1}if(P.status===69)if(P.gzhead.extra){for(M=P.pending;P.gzindex<(65535&P.gzhead.extra.length)&&(P.pending!==P.pending_buf_size||(P.gzhead.hcrc&&P.pending>M&&(A.adler=h(A.adler,P.pending_buf,P.pending-M,M)),q(A),M=P.pending,P.pending!==P.pending_buf_size));)At(P,255&P.gzhead.extra[P.gzindex]),P.gzindex++;P.gzhead.hcrc&&P.pending>M&&(A.adler=h(A.adler,P.pending_buf,P.pending-M,M)),P.gzindex===P.gzhead.extra.length&&(P.gzindex=0,P.status=73)}else P.status=73;if(P.status===73)if(P.gzhead.name){M=P.pending;do{if(P.pending===P.pending_buf_size&&(P.gzhead.hcrc&&P.pending>M&&(A.adler=h(A.adler,P.pending_buf,P.pending-M,M)),q(A),M=P.pending,P.pending===P.pending_buf_size)){H=1;break}H=P.gzindex<P.gzhead.name.length?255&P.gzhead.name.charCodeAt(P.gzindex++):0,At(P,H)}while(H!==0);P.gzhead.hcrc&&P.pending>M&&(A.adler=h(A.adler,P.pending_buf,P.pending-M,M)),H===0&&(P.gzindex=0,P.status=91)}else P.status=91;if(P.status===91)if(P.gzhead.comment){M=P.pending;do{if(P.pending===P.pending_buf_size&&(P.gzhead.hcrc&&P.pending>M&&(A.adler=h(A.adler,P.pending_buf,P.pending-M,M)),q(A),M=P.pending,P.pending===P.pending_buf_size)){H=1;break}H=P.gzindex<P.gzhead.comment.length?255&P.gzhead.comment.charCodeAt(P.gzindex++):0,At(P,H)}while(H!==0);P.gzhead.hcrc&&P.pending>M&&(A.adler=h(A.adler,P.pending_buf,P.pending-M,M)),H===0&&(P.status=103)}else P.status=103;if(P.status===103&&(P.gzhead.hcrc?(P.pending+2>P.pending_buf_size&&q(A),P.pending+2<=P.pending_buf_size&&(At(P,255&A.adler),At(P,A.adler>>8&255),A.adler=0,P.status=F)):P.status=F),P.pending!==0){if(q(A),A.avail_out===0)return P.last_flush=-1,m}else if(A.avail_in===0&&it(nt)<=it(K)&&nt!==g)return W(A,-5);if(P.status===666&&A.avail_in!==0)return W(A,-5);if(A.avail_in!==0||P.lookahead!==0||nt!==p&&P.status!==666){var Q=P.strategy===2?function(X,ft){for(var lt;;){if(X.lookahead===0&&(wt(X),X.lookahead===0)){if(ft===p)return E;break}if(X.match_length=0,lt=c._tr_tally(X,0,X.window[X.strstart]),X.lookahead--,X.strstart++,lt&&(Y(X,!1),X.strm.avail_out===0))return E}return X.insert=0,ft===g?(Y(X,!0),X.strm.avail_out===0?ot:rt):X.last_lit&&(Y(X,!1),X.strm.avail_out===0)?E:Z}(P,nt):P.strategy===3?function(X,ft){for(var lt,pt,Tt,Et,Lt=X.window;;){if(X.lookahead<=R){if(wt(X),X.lookahead<=R&&ft===p)return E;if(X.lookahead===0)break}if(X.match_length=0,X.lookahead>=I&&0<X.strstart&&(pt=Lt[Tt=X.strstart-1])===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]){Et=X.strstart+R;do;while(pt===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]&&pt===Lt[++Tt]&&Tt<Et);X.match_length=R-(Et-Tt),X.match_length>X.lookahead&&(X.match_length=X.lookahead)}if(X.match_length>=I?(lt=c._tr_tally(X,1,X.match_length-I),X.lookahead-=X.match_length,X.strstart+=X.match_length,X.match_length=0):(lt=c._tr_tally(X,0,X.window[X.strstart]),X.lookahead--,X.strstart++),lt&&(Y(X,!1),X.strm.avail_out===0))return E}return X.insert=0,ft===g?(Y(X,!0),X.strm.avail_out===0?ot:rt):X.last_lit&&(Y(X,!1),X.strm.avail_out===0)?E:Z}(P,nt):o[P.level].func(P,nt);if(Q!==ot&&Q!==rt||(P.status=666),Q===E||Q===ot)return A.avail_out===0&&(P.last_flush=-1),m;if(Q===Z&&(nt===1?c._tr_align(P):nt!==5&&(c._tr_stored_block(P,0,0,!1),nt===3&&(et(P.head),P.lookahead===0&&(P.strstart=0,P.block_start=0,P.insert=0))),q(A),A.avail_out===0))return P.last_flush=-1,m}return nt!==g?m:P.wrap<=0?1:(P.wrap===2?(At(P,255&A.adler),At(P,A.adler>>8&255),At(P,A.adler>>16&255),At(P,A.adler>>24&255),At(P,255&A.total_in),At(P,A.total_in>>8&255),At(P,A.total_in>>16&255),At(P,A.total_in>>24&255)):(tt(P,A.adler>>>16),tt(P,65535&A.adler)),q(A),0<P.wrap&&(P.wrap=-P.wrap),P.pending!==0?m:1)},s.deflateEnd=function(A){var nt;return A&&A.state?(nt=A.state.status)!==U&&nt!==69&&nt!==73&&nt!==91&&nt!==103&&nt!==F&&nt!==666?W(A,y):(A.state=null,nt===F?W(A,-3):m):y},s.deflateSetDictionary=function(A,nt){var K,P,M,H,j,Q,X,ft,lt=nt.length;if(!A||!A.state||(H=(K=A.state).wrap)===2||H===1&&K.status!==U||K.lookahead)return y;for(H===1&&(A.adler=u(A.adler,nt,lt,0)),K.wrap=0,lt>=K.w_size&&(H===0&&(et(K.head),K.strstart=0,K.block_start=0,K.insert=0),ft=new l.Buf8(K.w_size),l.arraySet(ft,nt,lt-K.w_size,K.w_size,0),nt=ft,lt=K.w_size),j=A.avail_in,Q=A.next_in,X=A.input,A.avail_in=lt,A.next_in=0,A.input=nt,wt(K);K.lookahead>=I;){for(P=K.strstart,M=K.lookahead-(I-1);K.ins_h=(K.ins_h<<K.hash_shift^K.window[P+I-1])&K.hash_mask,K.prev[P&K.w_mask]=K.head[K.ins_h],K.head[K.ins_h]=P,P++,--M;);K.strstart=P,K.lookahead=I-1,wt(K)}return K.strstart+=K.lookahead,K.block_start=K.strstart,K.insert=K.lookahead,K.lookahead=0,K.match_length=K.prev_length=I-1,K.match_available=0,A.next_in=Q,A.input=X,A.avail_in=j,K.wrap=H,m},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,u,h,f,p,g,m,y,x,_,v,S,w,T,k,O,D,z,I,R,G,U,F,E,Z;c=o.state,u=o.next_in,E=o.input,h=u+(o.avail_in-5),f=o.next_out,Z=o.output,p=f-(l-o.avail_out),g=f+(o.avail_out-257),m=c.dmax,y=c.wsize,x=c.whave,_=c.wnext,v=c.window,S=c.hold,w=c.bits,T=c.lencode,k=c.distcode,O=(1<<c.lenbits)-1,D=(1<<c.distbits)-1;t:do{w<15&&(S+=E[u++]<<w,w+=8,S+=E[u++]<<w,w+=8),z=T[S&O];e:for(;;){if(S>>>=I=z>>>24,w-=I,(I=z>>>16&255)===0)Z[f++]=65535&z;else{if(!(16&I)){if(!(64&I)){z=T[(65535&z)+(S&(1<<I)-1)];continue e}if(32&I){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}R=65535&z,(I&=15)&&(w<I&&(S+=E[u++]<<w,w+=8),R+=S&(1<<I)-1,S>>>=I,w-=I),w<15&&(S+=E[u++]<<w,w+=8,S+=E[u++]<<w,w+=8),z=k[S&D];n:for(;;){if(S>>>=I=z>>>24,w-=I,!(16&(I=z>>>16&255))){if(!(64&I)){z=k[(65535&z)+(S&(1<<I)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(G=65535&z,w<(I&=15)&&(S+=E[u++]<<w,(w+=8)<I&&(S+=E[u++]<<w,w+=8)),m<(G+=S&(1<<I)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(S>>>=I,w-=I,(I=f-p)<G){if(x<(I=G-I)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(F=v,(U=0)===_){if(U+=y-I,I<R){for(R-=I;Z[f++]=v[U++],--I;);U=f-G,F=Z}}else if(_<I){if(U+=y+_-I,(I-=_)<R){for(R-=I;Z[f++]=v[U++],--I;);if(U=0,_<R){for(R-=I=_;Z[f++]=v[U++],--I;);U=f-G,F=Z}}}else if(U+=_-I,I<R){for(R-=I;Z[f++]=v[U++],--I;);U=f-G,F=Z}for(;2<R;)Z[f++]=F[U++],Z[f++]=F[U++],Z[f++]=F[U++],R-=3;R&&(Z[f++]=F[U++],1<R&&(Z[f++]=F[U++]))}else{for(U=f-G;Z[f++]=Z[U++],Z[f++]=Z[U++],Z[f++]=Z[U++],2<(R-=3););R&&(Z[f++]=Z[U++],1<R&&(Z[f++]=Z[U++]))}break}}break}}while(u<h&&f<g);u-=R=w>>3,S&=(1<<(w-=R<<3))-1,o.next_in=u,o.next_out=f,o.avail_in=u<h?h-u+5:5-(u-h),o.avail_out=f<g?g-f+257:257-(f-g),c.hold=S,c.bits=w}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),u=e("./inffast"),h=e("./inftrees"),f=1,p=2,g=0,m=-2,y=1,x=852,_=592;function v(U){return(U>>>24&255)+(U>>>8&65280)+((65280&U)<<8)+((255&U)<<24)}function S(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(U){var F;return U&&U.state?(F=U.state,U.total_in=U.total_out=F.total=0,U.msg="",F.wrap&&(U.adler=1&F.wrap),F.mode=y,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new o.Buf32(x),F.distcode=F.distdyn=new o.Buf32(_),F.sane=1,F.back=-1,g):m}function T(U){var F;return U&&U.state?((F=U.state).wsize=0,F.whave=0,F.wnext=0,w(U)):m}function k(U,F){var E,Z;return U&&U.state?(Z=U.state,F<0?(E=0,F=-F):(E=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?m:(Z.window!==null&&Z.wbits!==F&&(Z.window=null),Z.wrap=E,Z.wbits=F,T(U))):m}function O(U,F){var E,Z;return U?(Z=new S,(U.state=Z).window=null,(E=k(U,F))!==g&&(U.state=null),E):m}var D,z,I=!0;function R(U){if(I){var F;for(D=new o.Buf32(512),z=new o.Buf32(32),F=0;F<144;)U.lens[F++]=8;for(;F<256;)U.lens[F++]=9;for(;F<280;)U.lens[F++]=7;for(;F<288;)U.lens[F++]=8;for(h(f,U.lens,0,288,D,0,U.work,{bits:9}),F=0;F<32;)U.lens[F++]=5;h(p,U.lens,0,32,z,0,U.work,{bits:5}),I=!1}U.lencode=D,U.lenbits=9,U.distcode=z,U.distbits=5}function G(U,F,E,Z){var ot,rt=U.state;return rt.window===null&&(rt.wsize=1<<rt.wbits,rt.wnext=0,rt.whave=0,rt.window=new o.Buf8(rt.wsize)),Z>=rt.wsize?(o.arraySet(rt.window,F,E-rt.wsize,rt.wsize,0),rt.wnext=0,rt.whave=rt.wsize):(Z<(ot=rt.wsize-rt.wnext)&&(ot=Z),o.arraySet(rt.window,F,E-Z,ot,rt.wnext),(Z-=ot)?(o.arraySet(rt.window,F,E-Z,Z,0),rt.wnext=Z,rt.whave=rt.wsize):(rt.wnext+=ot,rt.wnext===rt.wsize&&(rt.wnext=0),rt.whave<rt.wsize&&(rt.whave+=ot))),0}s.inflateReset=T,s.inflateReset2=k,s.inflateResetKeep=w,s.inflateInit=function(U){return O(U,15)},s.inflateInit2=O,s.inflate=function(U,F){var E,Z,ot,rt,W,it,et,q,Y,At,tt,st,wt,St,Pt,It,Ut,at,xt,bt,A,nt,K,P,M=0,H=new o.Buf8(4),j=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!U||!U.state||!U.output||!U.input&&U.avail_in!==0)return m;(E=U.state).mode===12&&(E.mode=13),W=U.next_out,ot=U.output,et=U.avail_out,rt=U.next_in,Z=U.input,it=U.avail_in,q=E.hold,Y=E.bits,At=it,tt=et,nt=g;t:for(;;)switch(E.mode){case y:if(E.wrap===0){E.mode=13;break}for(;Y<16;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(2&E.wrap&&q===35615){H[E.check=0]=255&q,H[1]=q>>>8&255,E.check=c(E.check,H,2,0),Y=q=0,E.mode=2;break}if(E.flags=0,E.head&&(E.head.done=!1),!(1&E.wrap)||(((255&q)<<8)+(q>>8))%31){U.msg="incorrect header check",E.mode=30;break}if((15&q)!=8){U.msg="unknown compression method",E.mode=30;break}if(Y-=4,A=8+(15&(q>>>=4)),E.wbits===0)E.wbits=A;else if(A>E.wbits){U.msg="invalid window size",E.mode=30;break}E.dmax=1<<A,U.adler=E.check=1,E.mode=512&q?10:12,Y=q=0;break;case 2:for(;Y<16;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(E.flags=q,(255&E.flags)!=8){U.msg="unknown compression method",E.mode=30;break}if(57344&E.flags){U.msg="unknown header flags set",E.mode=30;break}E.head&&(E.head.text=q>>8&1),512&E.flags&&(H[0]=255&q,H[1]=q>>>8&255,E.check=c(E.check,H,2,0)),Y=q=0,E.mode=3;case 3:for(;Y<32;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}E.head&&(E.head.time=q),512&E.flags&&(H[0]=255&q,H[1]=q>>>8&255,H[2]=q>>>16&255,H[3]=q>>>24&255,E.check=c(E.check,H,4,0)),Y=q=0,E.mode=4;case 4:for(;Y<16;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}E.head&&(E.head.xflags=255&q,E.head.os=q>>8),512&E.flags&&(H[0]=255&q,H[1]=q>>>8&255,E.check=c(E.check,H,2,0)),Y=q=0,E.mode=5;case 5:if(1024&E.flags){for(;Y<16;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}E.length=q,E.head&&(E.head.extra_len=q),512&E.flags&&(H[0]=255&q,H[1]=q>>>8&255,E.check=c(E.check,H,2,0)),Y=q=0}else E.head&&(E.head.extra=null);E.mode=6;case 6:if(1024&E.flags&&(it<(st=E.length)&&(st=it),st&&(E.head&&(A=E.head.extra_len-E.length,E.head.extra||(E.head.extra=new Array(E.head.extra_len)),o.arraySet(E.head.extra,Z,rt,st,A)),512&E.flags&&(E.check=c(E.check,Z,st,rt)),it-=st,rt+=st,E.length-=st),E.length))break t;E.length=0,E.mode=7;case 7:if(2048&E.flags){if(it===0)break t;for(st=0;A=Z[rt+st++],E.head&&A&&E.length<65536&&(E.head.name+=String.fromCharCode(A)),A&&st<it;);if(512&E.flags&&(E.check=c(E.check,Z,st,rt)),it-=st,rt+=st,A)break t}else E.head&&(E.head.name=null);E.length=0,E.mode=8;case 8:if(4096&E.flags){if(it===0)break t;for(st=0;A=Z[rt+st++],E.head&&A&&E.length<65536&&(E.head.comment+=String.fromCharCode(A)),A&&st<it;);if(512&E.flags&&(E.check=c(E.check,Z,st,rt)),it-=st,rt+=st,A)break t}else E.head&&(E.head.comment=null);E.mode=9;case 9:if(512&E.flags){for(;Y<16;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(q!==(65535&E.check)){U.msg="header crc mismatch",E.mode=30;break}Y=q=0}E.head&&(E.head.hcrc=E.flags>>9&1,E.head.done=!0),U.adler=E.check=0,E.mode=12;break;case 10:for(;Y<32;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}U.adler=E.check=v(q),Y=q=0,E.mode=11;case 11:if(E.havedict===0)return U.next_out=W,U.avail_out=et,U.next_in=rt,U.avail_in=it,E.hold=q,E.bits=Y,2;U.adler=E.check=1,E.mode=12;case 12:if(F===5||F===6)break t;case 13:if(E.last){q>>>=7&Y,Y-=7&Y,E.mode=27;break}for(;Y<3;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}switch(E.last=1&q,Y-=1,3&(q>>>=1)){case 0:E.mode=14;break;case 1:if(R(E),E.mode=20,F!==6)break;q>>>=2,Y-=2;break t;case 2:E.mode=17;break;case 3:U.msg="invalid block type",E.mode=30}q>>>=2,Y-=2;break;case 14:for(q>>>=7&Y,Y-=7&Y;Y<32;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if((65535&q)!=(q>>>16^65535)){U.msg="invalid stored block lengths",E.mode=30;break}if(E.length=65535&q,Y=q=0,E.mode=15,F===6)break t;case 15:E.mode=16;case 16:if(st=E.length){if(it<st&&(st=it),et<st&&(st=et),st===0)break t;o.arraySet(ot,Z,rt,st,W),it-=st,rt+=st,et-=st,W+=st,E.length-=st;break}E.mode=12;break;case 17:for(;Y<14;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(E.nlen=257+(31&q),q>>>=5,Y-=5,E.ndist=1+(31&q),q>>>=5,Y-=5,E.ncode=4+(15&q),q>>>=4,Y-=4,286<E.nlen||30<E.ndist){U.msg="too many length or distance symbols",E.mode=30;break}E.have=0,E.mode=18;case 18:for(;E.have<E.ncode;){for(;Y<3;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}E.lens[j[E.have++]]=7&q,q>>>=3,Y-=3}for(;E.have<19;)E.lens[j[E.have++]]=0;if(E.lencode=E.lendyn,E.lenbits=7,K={bits:E.lenbits},nt=h(0,E.lens,0,19,E.lencode,0,E.work,K),E.lenbits=K.bits,nt){U.msg="invalid code lengths set",E.mode=30;break}E.have=0,E.mode=19;case 19:for(;E.have<E.nlen+E.ndist;){for(;It=(M=E.lencode[q&(1<<E.lenbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=Y);){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(Ut<16)q>>>=Pt,Y-=Pt,E.lens[E.have++]=Ut;else{if(Ut===16){for(P=Pt+2;Y<P;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(q>>>=Pt,Y-=Pt,E.have===0){U.msg="invalid bit length repeat",E.mode=30;break}A=E.lens[E.have-1],st=3+(3&q),q>>>=2,Y-=2}else if(Ut===17){for(P=Pt+3;Y<P;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}Y-=Pt,A=0,st=3+(7&(q>>>=Pt)),q>>>=3,Y-=3}else{for(P=Pt+7;Y<P;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}Y-=Pt,A=0,st=11+(127&(q>>>=Pt)),q>>>=7,Y-=7}if(E.have+st>E.nlen+E.ndist){U.msg="invalid bit length repeat",E.mode=30;break}for(;st--;)E.lens[E.have++]=A}}if(E.mode===30)break;if(E.lens[256]===0){U.msg="invalid code -- missing end-of-block",E.mode=30;break}if(E.lenbits=9,K={bits:E.lenbits},nt=h(f,E.lens,0,E.nlen,E.lencode,0,E.work,K),E.lenbits=K.bits,nt){U.msg="invalid literal/lengths set",E.mode=30;break}if(E.distbits=6,E.distcode=E.distdyn,K={bits:E.distbits},nt=h(p,E.lens,E.nlen,E.ndist,E.distcode,0,E.work,K),E.distbits=K.bits,nt){U.msg="invalid distances set",E.mode=30;break}if(E.mode=20,F===6)break t;case 20:E.mode=21;case 21:if(6<=it&&258<=et){U.next_out=W,U.avail_out=et,U.next_in=rt,U.avail_in=it,E.hold=q,E.bits=Y,u(U,tt),W=U.next_out,ot=U.output,et=U.avail_out,rt=U.next_in,Z=U.input,it=U.avail_in,q=E.hold,Y=E.bits,E.mode===12&&(E.back=-1);break}for(E.back=0;It=(M=E.lencode[q&(1<<E.lenbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=Y);){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(It&&!(240&It)){for(at=Pt,xt=It,bt=Ut;It=(M=E.lencode[bt+((q&(1<<at+xt)-1)>>at)])>>>16&255,Ut=65535&M,!(at+(Pt=M>>>24)<=Y);){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}q>>>=at,Y-=at,E.back+=at}if(q>>>=Pt,Y-=Pt,E.back+=Pt,E.length=Ut,It===0){E.mode=26;break}if(32&It){E.back=-1,E.mode=12;break}if(64&It){U.msg="invalid literal/length code",E.mode=30;break}E.extra=15&It,E.mode=22;case 22:if(E.extra){for(P=E.extra;Y<P;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}E.length+=q&(1<<E.extra)-1,q>>>=E.extra,Y-=E.extra,E.back+=E.extra}E.was=E.length,E.mode=23;case 23:for(;It=(M=E.distcode[q&(1<<E.distbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=Y);){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(!(240&It)){for(at=Pt,xt=It,bt=Ut;It=(M=E.distcode[bt+((q&(1<<at+xt)-1)>>at)])>>>16&255,Ut=65535&M,!(at+(Pt=M>>>24)<=Y);){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}q>>>=at,Y-=at,E.back+=at}if(q>>>=Pt,Y-=Pt,E.back+=Pt,64&It){U.msg="invalid distance code",E.mode=30;break}E.offset=Ut,E.extra=15&It,E.mode=24;case 24:if(E.extra){for(P=E.extra;Y<P;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}E.offset+=q&(1<<E.extra)-1,q>>>=E.extra,Y-=E.extra,E.back+=E.extra}if(E.offset>E.dmax){U.msg="invalid distance too far back",E.mode=30;break}E.mode=25;case 25:if(et===0)break t;if(st=tt-et,E.offset>st){if((st=E.offset-st)>E.whave&&E.sane){U.msg="invalid distance too far back",E.mode=30;break}wt=st>E.wnext?(st-=E.wnext,E.wsize-st):E.wnext-st,st>E.length&&(st=E.length),St=E.window}else St=ot,wt=W-E.offset,st=E.length;for(et<st&&(st=et),et-=st,E.length-=st;ot[W++]=St[wt++],--st;);E.length===0&&(E.mode=21);break;case 26:if(et===0)break t;ot[W++]=E.length,et--,E.mode=21;break;case 27:if(E.wrap){for(;Y<32;){if(it===0)break t;it--,q|=Z[rt++]<<Y,Y+=8}if(tt-=et,U.total_out+=tt,E.total+=tt,tt&&(U.adler=E.check=E.flags?c(E.check,ot,tt,W-tt):l(E.check,ot,tt,W-tt)),tt=et,(E.flags?q:v(q))!==E.check){U.msg="incorrect data check",E.mode=30;break}Y=q=0}E.mode=28;case 28:if(E.wrap&&E.flags){for(;Y<32;){if(it===0)break t;it--,q+=Z[rt++]<<Y,Y+=8}if(q!==(4294967295&E.total)){U.msg="incorrect length check",E.mode=30;break}Y=q=0}E.mode=29;case 29:nt=1;break t;case 30:nt=-3;break t;case 31:return-4;case 32:default:return m}return U.next_out=W,U.avail_out=et,U.next_in=rt,U.avail_in=it,E.hold=q,E.bits=Y,(E.wsize||tt!==U.avail_out&&E.mode<30&&(E.mode<27||F!==4))&&G(U,U.output,U.next_out,tt-U.avail_out)?(E.mode=31,-4):(At-=U.avail_in,tt-=U.avail_out,U.total_in+=At,U.total_out+=tt,E.total+=tt,E.wrap&&tt&&(U.adler=E.check=E.flags?c(E.check,ot,tt,U.next_out-tt):l(E.check,ot,tt,U.next_out-tt)),U.data_type=E.bits+(E.last?64:0)+(E.mode===12?128:0)+(E.mode===20||E.mode===15?256:0),(At==0&&tt===0||F===4)&&nt===g&&(nt=-5),nt)},s.inflateEnd=function(U){if(!U||!U.state)return m;var F=U.state;return F.window&&(F.window=null),U.state=null,g},s.inflateGetHeader=function(U,F){var E;return U&&U.state&&2&(E=U.state).wrap?((E.head=F).done=!1,g):m},s.inflateSetDictionary=function(U,F){var E,Z=F.length;return U&&U.state?(E=U.state).wrap!==0&&E.mode!==11?m:E.mode===11&&l(1,F,Z,0)!==E.check?-3:G(U,F,Z,Z)?(E.mode=31,-4):(E.havedict=1,g):m},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,p,g,m,y,x,_,v){var S,w,T,k,O,D,z,I,R,G=v.bits,U=0,F=0,E=0,Z=0,ot=0,rt=0,W=0,it=0,et=0,q=0,Y=null,At=0,tt=new o.Buf16(16),st=new o.Buf16(16),wt=null,St=0;for(U=0;U<=15;U++)tt[U]=0;for(F=0;F<m;F++)tt[p[g+F]]++;for(ot=G,Z=15;1<=Z&&tt[Z]===0;Z--);if(Z<ot&&(ot=Z),Z===0)return y[x++]=20971520,y[x++]=20971520,v.bits=1,0;for(E=1;E<Z&&tt[E]===0;E++);for(ot<E&&(ot=E),U=it=1;U<=15;U++)if(it<<=1,(it-=tt[U])<0)return-1;if(0<it&&(f===0||Z!==1))return-1;for(st[1]=0,U=1;U<15;U++)st[U+1]=st[U]+tt[U];for(F=0;F<m;F++)p[g+F]!==0&&(_[st[p[g+F]]++]=F);if(D=f===0?(Y=wt=_,19):f===1?(Y=l,At-=257,wt=c,St-=257,256):(Y=u,wt=h,-1),U=E,O=x,W=F=q=0,T=-1,k=(et=1<<(rt=ot))-1,f===1&&852<et||f===2&&592<et)return 1;for(;;){for(z=U-W,R=_[F]<D?(I=0,_[F]):_[F]>D?(I=wt[St+_[F]],Y[At+_[F]]):(I=96,0),S=1<<U-W,E=w=1<<rt;y[O+(q>>W)+(w-=S)]=z<<24|I<<16|R|0,w!==0;);for(S=1<<U-1;q&S;)S>>=1;if(S!==0?(q&=S-1,q+=S):q=0,F++,--tt[U]==0){if(U===Z)break;U=p[g+_[F]]}if(ot<U&&(q&k)!==T){for(W===0&&(W=ot),O+=E,it=1<<(rt=U-W);rt+W<Z&&!((it-=tt[rt+W])<=0);)rt++,it<<=1;if(et+=1<<rt,f===1&&852<et||f===2&&592<et)return 1;y[T=q&k]=ot<<24|rt<<16|O-x|0}}return q!==0&&(y[O+q]=U-W<<24|64<<16|0),v.bits=ot,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function u(M){for(var H=M.length;0<=--H;)M[H]=0}var h=0,f=29,p=256,g=p+1+f,m=30,y=19,x=2*g+1,_=15,v=16,S=7,w=256,T=16,k=17,O=18,D=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],z=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],G=new Array(2*(g+2));u(G);var U=new Array(2*m);u(U);var F=new Array(512);u(F);var E=new Array(256);u(E);var Z=new Array(f);u(Z);var ot,rt,W,it=new Array(m);function et(M,H,j,Q,X){this.static_tree=M,this.extra_bits=H,this.extra_base=j,this.elems=Q,this.max_length=X,this.has_stree=M&&M.length}function q(M,H){this.dyn_tree=M,this.max_code=0,this.stat_desc=H}function Y(M){return M<256?F[M]:F[256+(M>>>7)]}function At(M,H){M.pending_buf[M.pending++]=255&H,M.pending_buf[M.pending++]=H>>>8&255}function tt(M,H,j){M.bi_valid>v-j?(M.bi_buf|=H<<M.bi_valid&65535,At(M,M.bi_buf),M.bi_buf=H>>v-M.bi_valid,M.bi_valid+=j-v):(M.bi_buf|=H<<M.bi_valid&65535,M.bi_valid+=j)}function st(M,H,j){tt(M,j[2*H],j[2*H+1])}function wt(M,H){for(var j=0;j|=1&M,M>>>=1,j<<=1,0<--H;);return j>>>1}function St(M,H,j){var Q,X,ft=new Array(_+1),lt=0;for(Q=1;Q<=_;Q++)ft[Q]=lt=lt+j[Q-1]<<1;for(X=0;X<=H;X++){var pt=M[2*X+1];pt!==0&&(M[2*X]=wt(ft[pt]++,pt))}}function Pt(M){var H;for(H=0;H<g;H++)M.dyn_ltree[2*H]=0;for(H=0;H<m;H++)M.dyn_dtree[2*H]=0;for(H=0;H<y;H++)M.bl_tree[2*H]=0;M.dyn_ltree[2*w]=1,M.opt_len=M.static_len=0,M.last_lit=M.matches=0}function It(M){8<M.bi_valid?At(M,M.bi_buf):0<M.bi_valid&&(M.pending_buf[M.pending++]=M.bi_buf),M.bi_buf=0,M.bi_valid=0}function Ut(M,H,j,Q){var X=2*H,ft=2*j;return M[X]<M[ft]||M[X]===M[ft]&&Q[H]<=Q[j]}function at(M,H,j){for(var Q=M.heap[j],X=j<<1;X<=M.heap_len&&(X<M.heap_len&&Ut(H,M.heap[X+1],M.heap[X],M.depth)&&X++,!Ut(H,Q,M.heap[X],M.depth));)M.heap[j]=M.heap[X],j=X,X<<=1;M.heap[j]=Q}function xt(M,H,j){var Q,X,ft,lt,pt=0;if(M.last_lit!==0)for(;Q=M.pending_buf[M.d_buf+2*pt]<<8|M.pending_buf[M.d_buf+2*pt+1],X=M.pending_buf[M.l_buf+pt],pt++,Q===0?st(M,X,H):(st(M,(ft=E[X])+p+1,H),(lt=D[ft])!==0&&tt(M,X-=Z[ft],lt),st(M,ft=Y(--Q),j),(lt=z[ft])!==0&&tt(M,Q-=it[ft],lt)),pt<M.last_lit;);st(M,w,H)}function bt(M,H){var j,Q,X,ft=H.dyn_tree,lt=H.stat_desc.static_tree,pt=H.stat_desc.has_stree,Tt=H.stat_desc.elems,Et=-1;for(M.heap_len=0,M.heap_max=x,j=0;j<Tt;j++)ft[2*j]!==0?(M.heap[++M.heap_len]=Et=j,M.depth[j]=0):ft[2*j+1]=0;for(;M.heap_len<2;)ft[2*(X=M.heap[++M.heap_len]=Et<2?++Et:0)]=1,M.depth[X]=0,M.opt_len--,pt&&(M.static_len-=lt[2*X+1]);for(H.max_code=Et,j=M.heap_len>>1;1<=j;j--)at(M,ft,j);for(X=Tt;j=M.heap[1],M.heap[1]=M.heap[M.heap_len--],at(M,ft,1),Q=M.heap[1],M.heap[--M.heap_max]=j,M.heap[--M.heap_max]=Q,ft[2*X]=ft[2*j]+ft[2*Q],M.depth[X]=(M.depth[j]>=M.depth[Q]?M.depth[j]:M.depth[Q])+1,ft[2*j+1]=ft[2*Q+1]=X,M.heap[1]=X++,at(M,ft,1),2<=M.heap_len;);M.heap[--M.heap_max]=M.heap[1],function(Lt,Ht){var zt,Dt,Qt,Vt,ae,le,ee=Ht.dyn_tree,Ft=Ht.max_code,N=Ht.stat_desc.static_tree,ht=Ht.stat_desc.has_stree,Mt=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,kt=Ht.stat_desc.max_length,se=0;for(Vt=0;Vt<=_;Vt++)Lt.bl_count[Vt]=0;for(ee[2*Lt.heap[Lt.heap_max]+1]=0,zt=Lt.heap_max+1;zt<x;zt++)kt<(Vt=ee[2*ee[2*(Dt=Lt.heap[zt])+1]+1]+1)&&(Vt=kt,se++),ee[2*Dt+1]=Vt,Ft<Dt||(Lt.bl_count[Vt]++,ae=0,Rt<=Dt&&(ae=Mt[Dt-Rt]),le=ee[2*Dt],Lt.opt_len+=le*(Vt+ae),ht&&(Lt.static_len+=le*(N[2*Dt+1]+ae)));if(se!==0){do{for(Vt=kt-1;Lt.bl_count[Vt]===0;)Vt--;Lt.bl_count[Vt]--,Lt.bl_count[Vt+1]+=2,Lt.bl_count[kt]--,se-=2}while(0<se);for(Vt=kt;Vt!==0;Vt--)for(Dt=Lt.bl_count[Vt];Dt!==0;)Ft<(Qt=Lt.heap[--zt])||(ee[2*Qt+1]!==Vt&&(Lt.opt_len+=(Vt-ee[2*Qt+1])*ee[2*Qt],ee[2*Qt+1]=Vt),Dt--)}}(M,H),St(ft,Et,M.bl_count)}function A(M,H,j){var Q,X,ft=-1,lt=H[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),H[2*(j+1)+1]=65535,Q=0;Q<=j;Q++)X=lt,lt=H[2*(Q+1)+1],++pt<Tt&&X===lt||(pt<Et?M.bl_tree[2*X]+=pt:X!==0?(X!==ft&&M.bl_tree[2*X]++,M.bl_tree[2*T]++):pt<=10?M.bl_tree[2*k]++:M.bl_tree[2*O]++,ft=X,Et=(pt=0)===lt?(Tt=138,3):X===lt?(Tt=6,3):(Tt=7,4))}function nt(M,H,j){var Q,X,ft=-1,lt=H[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),Q=0;Q<=j;Q++)if(X=lt,lt=H[2*(Q+1)+1],!(++pt<Tt&&X===lt)){if(pt<Et)for(;st(M,X,M.bl_tree),--pt!=0;);else X!==0?(X!==ft&&(st(M,X,M.bl_tree),pt--),st(M,T,M.bl_tree),tt(M,pt-3,2)):pt<=10?(st(M,k,M.bl_tree),tt(M,pt-3,3)):(st(M,O,M.bl_tree),tt(M,pt-11,7));ft=X,Et=(pt=0)===lt?(Tt=138,3):X===lt?(Tt=6,3):(Tt=7,4)}}u(it);var K=!1;function P(M,H,j,Q){tt(M,(h<<1)+(Q?1:0),3),function(X,ft,lt,pt){It(X),At(X,lt),At(X,~lt),o.arraySet(X.pending_buf,X.window,ft,lt,X.pending),X.pending+=lt}(M,H,j)}s._tr_init=function(M){K||(function(){var H,j,Q,X,ft,lt=new Array(_+1);for(X=Q=0;X<f-1;X++)for(Z[X]=Q,H=0;H<1<<D[X];H++)E[Q++]=X;for(E[Q-1]=X,X=ft=0;X<16;X++)for(it[X]=ft,H=0;H<1<<z[X];H++)F[ft++]=X;for(ft>>=7;X<m;X++)for(it[X]=ft<<7,H=0;H<1<<z[X]-7;H++)F[256+ft++]=X;for(j=0;j<=_;j++)lt[j]=0;for(H=0;H<=143;)G[2*H+1]=8,H++,lt[8]++;for(;H<=255;)G[2*H+1]=9,H++,lt[9]++;for(;H<=279;)G[2*H+1]=7,H++,lt[7]++;for(;H<=287;)G[2*H+1]=8,H++,lt[8]++;for(St(G,g+1,lt),H=0;H<m;H++)U[2*H+1]=5,U[2*H]=wt(H,5);ot=new et(G,D,p+1,g,_),rt=new et(U,z,0,m,_),W=new et(new Array(0),I,0,y,S)}(),K=!0),M.l_desc=new q(M.dyn_ltree,ot),M.d_desc=new q(M.dyn_dtree,rt),M.bl_desc=new q(M.bl_tree,W),M.bi_buf=0,M.bi_valid=0,Pt(M)},s._tr_stored_block=P,s._tr_flush_block=function(M,H,j,Q){var X,ft,lt=0;0<M.level?(M.strm.data_type===2&&(M.strm.data_type=function(pt){var Tt,Et=4093624447;for(Tt=0;Tt<=31;Tt++,Et>>>=1)if(1&Et&&pt.dyn_ltree[2*Tt]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Tt=32;Tt<p;Tt++)if(pt.dyn_ltree[2*Tt]!==0)return c;return l}(M)),bt(M,M.l_desc),bt(M,M.d_desc),lt=function(pt){var Tt;for(A(pt,pt.dyn_ltree,pt.l_desc.max_code),A(pt,pt.dyn_dtree,pt.d_desc.max_code),bt(pt,pt.bl_desc),Tt=y-1;3<=Tt&&pt.bl_tree[2*R[Tt]+1]===0;Tt--);return pt.opt_len+=3*(Tt+1)+5+5+4,Tt}(M),X=M.opt_len+3+7>>>3,(ft=M.static_len+3+7>>>3)<=X&&(X=ft)):X=ft=j+5,j+4<=X&&H!==-1?P(M,H,j,Q):M.strategy===4||ft===X?(tt(M,2+(Q?1:0),3),xt(M,G,U)):(tt(M,4+(Q?1:0),3),function(pt,Tt,Et,Lt){var Ht;for(tt(pt,Tt-257,5),tt(pt,Et-1,5),tt(pt,Lt-4,4),Ht=0;Ht<Lt;Ht++)tt(pt,pt.bl_tree[2*R[Ht]+1],3);nt(pt,pt.dyn_ltree,Tt-1),nt(pt,pt.dyn_dtree,Et-1)}(M,M.l_desc.max_code+1,M.d_desc.max_code+1,lt+1),xt(M,M.dyn_ltree,M.dyn_dtree)),Pt(M),Q&&It(M)},s._tr_tally=function(M,H,j){return M.pending_buf[M.d_buf+2*M.last_lit]=H>>>8&255,M.pending_buf[M.d_buf+2*M.last_lit+1]=255&H,M.pending_buf[M.l_buf+M.last_lit]=255&j,M.last_lit++,H===0?M.dyn_ltree[2*j]++:(M.matches++,H--,M.dyn_ltree[2*(E[j]+p+1)]++,M.dyn_dtree[2*Y(H)]++),M.last_lit===M.lit_bufsize-1},s._tr_align=function(M){tt(M,2,3),st(M,w,G),function(H){H.bi_valid===16?(At(H,H.bi_buf),H.bi_buf=0,H.bi_valid=0):8<=H.bi_valid&&(H.pending_buf[H.pending++]=255&H.bi_buf,H.bi_buf>>=8,H.bi_valid-=8)}(M)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var u,h,f,p,g=1,m={},y=!1,x=l.document,_=Object.getPrototypeOf&&Object.getPrototypeOf(l);_=_&&_.setTimeout?_:l,u={}.toString.call(l.process)==="[object process]"?function(T){process.nextTick(function(){S(T)})}:function(){if(l.postMessage&&!l.importScripts){var T=!0,k=l.onmessage;return l.onmessage=function(){T=!1},l.postMessage("","*"),l.onmessage=k,T}}()?(p="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",w,!1):l.attachEvent("onmessage",w),function(T){l.postMessage(p+T,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(T){S(T.data)},function(T){f.port2.postMessage(T)}):x&&"onreadystatechange"in x.createElement("script")?(h=x.documentElement,function(T){var k=x.createElement("script");k.onreadystatechange=function(){S(T),k.onreadystatechange=null,h.removeChild(k),k=null},h.appendChild(k)}):function(T){setTimeout(S,0,T)},_.setImmediate=function(T){typeof T!="function"&&(T=new Function(""+T));for(var k=new Array(arguments.length-1),O=0;O<k.length;O++)k[O]=arguments[O+1];var D={callback:T,args:k};return m[g]=D,u(g),g++},_.clearImmediate=v}function v(T){delete m[T]}function S(T){if(y)setTimeout(S,0,T);else{var k=m[T];if(k){y=!0;try{(function(O){var D=O.callback,z=O.args;switch(z.length){case 0:D();break;case 1:D(z[0]);break;case 2:D(z[0],z[1]);break;case 3:D(z[0],z[1],z[2]);break;default:D.apply(c,z)}})(k)}finally{v(T),y=!1}}}}function w(T){T.source===l&&typeof T.data=="string"&&T.data.indexOf(p)===0&&S(+T.data.slice(p.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof ro<"u"?ro:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Np);var d1=Np.exports;const f1=xf(d1);async function p1(i){if(!yt.tg||!yt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(yt.tg.traverse(m=>{if(!(m instanceof Ie))return;const y=m.geometry.clone();m.updateWorldMatrix(!0,!1),y.applyMatrix4(m.matrixWorld);const x=y.attributes.position,_=y.index;if(!x||x.count<3){y.dispose();return}let v="E4DFD8";const S=Array.isArray(m.material)?m.material[0]:m.material;S&&"color"in S&&(v=S.color.getHexString().toUpperCase());let w="";for(let k=0;k<x.count;k++)w+=`<vertex x="${x.getX(k).toFixed(4)}" y="${x.getZ(k).toFixed(4)}" z="${x.getY(k).toFixed(4)}"/>`;let T="";if(_)for(let k=0;k<_.count;k+=3)T+=`<triangle v1="${_.getX(k)}" v2="${_.getX(k+1)}" v3="${_.getX(k+2)}"/>`;else for(let k=0;k<x.count;k+=3)T+=`<triangle v1="${k}" v2="${k+1}" v3="${k+2}"/>`;y.dispose(),T&&t.push({id:e++,name:m.name||"mesh",col:v,vx:w,tr:T})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(m=>`<basematerials id="${m.id+1e3}"><base name="${m.name}" displaycolor="#${m.col}"/></basematerials>`).join(`
`),s=t.map(m=>`<object id="${m.id}" type="model" p:pid="${m.id+1e3}" p:pindex="0"><mesh><vertices>${m.vx}</vertices><triangles>${m.tr}</triangles></mesh></object>`).join(`
`),o=t.map(m=>`<item objectid="${m.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),u=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),h=new f1;h.file("[Content_Types].xml",u),h.folder("_rels").file(".rels",c),h.folder("3D").file("3dmodel.model",l);const f=await h.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),p=URL.createObjectURL(f),g=document.createElement("a");g.href=p,g.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(g),g.click(),document.body.removeChild(g),URL.revokeObjectURL(p)}let En=null,Be=null,_n=null,Kn=null,af="",fe=null,Jt=null,li=null,Vc="",Ji=[],lf="",xo=null;const me={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500",7:"#b8b8b8",8:"#262626"},ui={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0,river_polygons:!0,barren:!0,buildings:!0,roads:!0},Ne={};let Gc=1,Op=1,m1=0;const hi=[];let Jn=[],Ha=[],Up=[];const Po=new Map;let bo=-1,sl=!1,hu="",di=200,fi=200,wo=2,Pi=1,Mo=-1,Va=!1;const ol={water_ocean:!0,water_lake:!0,water_pond:!0,water_reservoir:!0,water_wastewater:!0,water_human:!0,water_other:!0};let po=1,Wc=-1;const ji={rivers:!0,streams_named:!0,streams_unnamed:!0,river_polygons:!0,canals:!0,canal_polygons:!0},eo={lc_forest:!1,lc_forest_detailed:!1,lc_scrub:!1,lc_shrub:!1,lc_grass:!1,lc_grass_detailed:!1,lc_crop:!1,lc_moss:!1,lc_wetland:!1,lc_wetland_detailed:!1,lc_mangrove:!1,lc_barren:!1,lc_desert:!1,lc_sand:!1,lc_rock:!1,lc_snow:!1,lc_glacier:!1,lc_urban:!1},Xi={veg_dense:{...eo,lc_forest:!0,lc_forest_detailed:!0,lc_shrub:!0,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},veg_low:{...eo,lc_scrub:!0,lc_grass:!0,lc_grass_detailed:!0,lc_crop:!0,lc_moss:!0},wetland_lc:{...eo,lc_wetland:!0,lc_wetland_detailed:!0,lc_mangrove:!0},snow_lc:{...eo,lc_snow:!0,lc_glacier:!0},barren_lc:{...eo,lc_barren:!0,lc_desert:!0,lc_sand:!0,lc_rock:!0,lc_urban:!0}},zp={veg_dense:0,veg_low:0,wetland_lc:0,snow_lc:0,barren_lc:0};let g1=.2,du=1,Ga=1,fu=.6,Wa=1,Ri=[],cf="";function _1(i){du=i}function v1(i){Ga=i}function y1(i){fu=i}function x1(i){Wa=i}let Za=0,pu=.5,al=1,mu="raised",Ii=[],Ai=null;function b1(i){Za=i}function w1(i){pu=i}function M1(i){al=i}function S1(i){mu=i}function uf(i,t,e){Xi[i]&&(Xi[i][t]=e,Jt&&(Jt.dispose(),Jt=null))}function E1(i,t){zp[i]=t}const cs={},Xa={};let us=null,hf="",Sn=null,qa=null,Zc=[],Er=null,Le=null,ps=null,no=null,gu=!1;const Qn=256,T1=3072;let An=[];const ms=[];function Bp(){if(!Le||!ps)return!1;const i=ps.getBoundingClientRect();return!i.width||!i.height?!1:(Le.style.left=`${i.left}px`,Le.style.top=`${i.top}px`,Le.style.width=`${i.width}px`,Le.style.height=`${i.height}px`,En&&(En.setSize(i.width,i.height,!1),_n.aspect=i.width/i.height,_n.updateProjectionMatrix()),!0)}function df(){if(!Le||!gu)return;Bp()&&Le.style.display==="none"&&(Le.style.display="block")}function As(i){if(Le||(Le=document.getElementById("dims-canvas")),ps!==i&&(no&&ps&&no.unobserve(ps),ps=i,no||(no=new ResizeObserver(df),window.addEventListener("resize",df)),no.observe(i)),gu=!0,Bp()&&Le&&(Le.style.display="block"),En)return;const t=i.getBoundingClientRect(),e=t.width||800,n=t.height||600;En=new rp({canvas:Le,antialias:!0}),En.setPixelRatio(Math.min(window.devicePixelRatio,2)),En.setSize(e,n,!1),En.localClippingEnabled=!0,Be=new sp,Be.background=new Kt(527380),_n=new Rn(42,e/n,.1,1e5),Kn=new vp(_n,Le),Kn.enableDamping=!0,Kn.dampingFactor=.06,Be.add(new gp(16777215,.8));const s=new zc(16777215,.6);s.position.set(1.5,3,2),Be.add(s);const o=()=>{requestAnimationFrame(o),Kn.update(),En.render(Be,_n),sM()};o()}function Fp(){gu=!1,Le&&(Le.style.display="none")}function Is(i){if(Object.assign(me,i),fe&&(Jt&&(Jt.dispose(),Jt=null),Jt=xs(fe.bounds,fe.grid,Qn,fe.minE,fe.elevRange,Ji,di,fi,Pi,Ii,Ri),Sn)){const f=Sn.material;f.map=Jt,f.needsUpdate=!0}const t=Ne.base??1;qa&&qa.material.color.set(me[t]??me[1]);const e=Ne.facade??1,n=new Kt(me[e]??me[1]);for(const f of Zc)f.material.color.set(n);if(Er){const f=Ne.gpx_line??6,p=me[f]??"#ff4500";Er.traverse(g=>{const m=g.material;m?.color&&m.color.set(p)}),Er.visible=ui.gpx_line??!0}const s=Ne.gpx??6,o=me[s]??"#ff4500";for(const f of Jn)f.traverse(p=>{const g=p.material;g?.color&&g.color.set(o)});const l=Ne.buildings??7,c=new Kt(me[l]??"#b8b8b8");for(const f of Ha)f.material.color.set(c);const u=Ne.roads??8,h=new Kt(me[u]??"#262626");Ai?.traverse(f=>{const p=f.material;p?.color&&p.color.set(h)});for(const f of Up){const p=f.__zoneLayerId,g=Yc.find(y=>y.id===p);if(!g)continue;const m=Ne[p]??g.slot;f.material.color.set(me[m]??"#888")}}function A1(i,t){Ne[i]=t,Is({})}function Hp(i,t){if(ui[i]=t,i==="gpx_line")Er&&(Er.visible=t);else if(i==="gpx")for(const e of Jn)e.visible=t;else if(i==="buildings"){for(const e of Ha)e.visible=t;fe&&(Jt&&(Jt.dispose(),Jt=null),Jt=xs(fe.bounds,fe.grid,Qn,fe.minE,fe.elevRange,Ji,di,fi,Pi,Ii,Ri),Sn&&(Sn.material.map=Jt,Sn.material.needsUpdate=!0))}else if(i==="roads")Ai&&(Ai.visible=t),fe&&(Jt&&(Jt.dispose(),Jt=null),Jt=xs(fe.bounds,fe.grid,Qn,fe.minE,fe.elevRange,Ji,di,fi,Pi,Ii,Ri),Sn&&(Sn.material.map=Jt,Sn.material.needsUpdate=!0));else if(fe&&(Jt&&(Jt.dispose(),Jt=null),Jt=xs(fe.bounds,fe.grid,Qn,fe.minE,fe.elevRange,Ji,di,fi,Pi,Ii,Ri),Sn)){const e=Sn.material;e.map=Jt,e.needsUpdate=!0}}function L1(i,t){Gc=i,Op=t}function C1(i){sl=!0,hu=i,Le&&(Le.style.cursor="crosshair")}function Vp(){sl=!1,hu="",Le&&(Le.style.cursor="")}function Gp(){return sl}function P1(i,t){if(!sl||!Be||!_n||!Sn||!Le)return-1;const e=Le.getBoundingClientRect(),n=(i-e.left)/e.width*2-1,s=-((t-e.top)/e.height)*2+1,o=new _p;o.setFromCamera(new vt(n,s),_n);const l=o.intersectObject(Sn);let c=-1;if(l.length>0){const u=l[0].point,h=.5-u.z/fi,f=.5+u.x/di,p=m1++,g={id:p,latFrac:h,lonFrac:f,shape:hu,visible:!0,diameterMult:10,rotDeg:0,flatTop:!0,heightOffMult:0};hi.push(g),yu(g,hi.length-1),c=p}return Vp(),c}function Xc(){return hi.map(i=>({id:i.id,shape:i.shape,visible:i.visible,diameterMult:i.diameterMult,rotDeg:i.rotDeg,flatTop:i.flatTop,heightOffMult:i.heightOffMult}))}function qc(){return bo}function Wp(i){bo=i}function R1(){bo=-1}function I1(i,t){if(!Be||!_n||!Le||Jn.length===0)return-1;const e=Le.getBoundingClientRect(),n=(i-e.left)/e.width*2-1,s=-((t-e.top)/e.height)*2+1,o=new _p;o.setFromCamera(new vt(n,s),_n);const l=o.intersectObjects(Jn,!0);if(!l.length)return-1;let c=l[0].object;for(;c;){const u=Po.get(c);if(u!==void 0)return u;c=c.parent}return-1}function jc(i,t){const e=hi.findIndex(o=>o.id===i);if(e<0)return;Object.assign(hi[e],t);const n=Jn[e];if(n){Po.delete(n),Be?.remove(n);const o=An.indexOf(n);o>=0&&An.splice(o,1),Jn.splice(e,1)}const s=hi[e];yu(s,e)}function D1(i,t){jc(i,{visible:t})}function k1(i){const t=hi.findIndex(n=>n.id===i);if(t<0)return;hi.splice(t,1);const e=Jn.splice(t,1)[0];if(e){Po.delete(e),Be?.remove(e);const n=An.indexOf(e);n>=0&&An.splice(n,1)}bo===i&&(bo=-1)}async function N1(i,t,e){if(!Be||!_n||!Kn||!En)return;const n=`${i.minLat}|${i.maxLat}|${i.minLon}|${i.maxLon}`,s=n!==af;s&&(af=n,fe=null,Jt&&(Jt.dispose(),Jt=null),e(5,"Téléchargement des altitudes…"),fe=await iM(i));const o={features:n!==lf,buildings:n!==cf};if(o.features||o.buildings){e(30,"Chargement des données géographiques…");const{zoneFeatures:c,buildings:u,roads:h}=await U1(i);(c.length>0||u.length>0||h.length>0)&&(lf=n,cf=n,c.length>0&&(Ji=c,Jt&&(Jt.dispose(),Jt=null)),Ri=u,Ii=h)}if(!Jt&&fe){e(70,"Génération de la texture…");const{wMm:c,dMm:u,exag:h}=t,f=i,p=(f.minLat+f.maxLat)/2,g=Math.max((f.maxLon-f.minLon)*Math.cos(p*Math.PI/180)*111320,(f.maxLat-f.minLat)*111320),m=Math.max(c,u),y=Math.max(1,Math.min(m*.5,fe.elevRange/g*m*h));Jt=xs(i,fe.grid,Qn,fe.minE,fe.elevRange,Ji,c,u,y,Ii,Ri)}else s||e(50,"Reconstruction…");const l=JSON.stringify(t.zonePts);(l!==Vc||!li)&&(Vc=l,li&&(li.dispose(),li=null),li=X1(t.zonePts,t.zoneType,i)),e(88,"Construction de la scène 3D…"),wn(t),e(100,"")}function wn(i){if(!Be||!_n||!Kn||!fe)return;rM();const{wMm:t,dMm:e,baseH:n,exag:s,flatFacade:o,facadeWidthMm:l,gpxPoints:c,zoneType:u,zonePts:h,bounds:f}=i,{grid:p,minE:g,elevRange:m}=fe,y=f??fe.bounds;Jt||(Jt=xs(y,p,Qn,g,m,Ji,t,e,T,Ii,Ri));const x=(y.minLat+y.maxLat)/2,_=(y.maxLon-y.minLon)*Math.cos(x*Math.PI/180)*111320,v=(y.maxLat-y.minLat)*111320,S=Math.max(_,v),w=Math.max(t,e),T=Math.max(1,Math.min(w*.5,m/S*w*s)),k=n+T,O=Qn,D=q1(h,u,y,t,e);xo=D;const z=Math.max(1,l);Sn=null,qa=null,Zc=[],Er=null,us=null,Jn=[],Ha=[],Up=[],Ai=null,di=t,fi=e,wo=n,Pi=T;const R=Z1(p,O,y,Ji,m,T,.2);{const W=new Ao(t,e,O-1,O-1);W.rotateX(-Math.PI/2);const it=W.attributes.position;for(let q=0;q<it.count;q++)it.setY(q,n+(R[q]-g)/m*T);it.needsUpdate=!0,W.computeVertexNormals();const et=new Ie(W,new Sr({map:Jt,alphaMap:li??void 0,transparent:!!li}));Sn=et,gr(et)}const G=Ne.base??1,U=new Kt(me[G]??me[1]),F=new Ie(j1(D,u,t,e,n,z),new Sr({color:U,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));qa=F,gr(F);const E=Ne.facade??1,Z=new Kt(me[E]??me[1]),ot=new Sr({color:Z,side:ln});for(const W of $1(D,u,t,e,z,o,k,p,O,g,m,n,T))W.material=ot,Zc.push(W),gr(W);if(c.length>=2){const W=nM(c,y,t,e,R,O,g,m,n,T);W&&(W.visible=ui.gpx_line??!0,Er=W,gr(W))}{const W=new Ab(new Bb(new pn(t+z*2,k,e+z*2)),new il({color:16718362}));W.position.y=k/2,gr(W)}ms.length=0,ms.push({id:"dl-width",v:new J(0,2,e/2+z+14)}),ms.push({id:"dl-depth",v:new J(t/2+z+14,k*.1,0)}),ms.push({id:"dl-height",v:new J(-t/2-z-12,k/2,e/2+8)}),os("dl-width",`${t} mm`),os("dl-depth",`${e} mm`),os("dl-height",`~${Math.round(k*10)/10} mm`),os("dp-total-val",`~${Math.round(k*10)/10}`),os("dp-map-h",`~${Math.round(T*10)/10}`),os("dp-base-h-disp",`${n}`),di=t,fi=e,wo=n,Pi=T,Po.clear();for(let W=0;W<hi.length;W++)yu(hi[W],W);vu();try{$c()}catch(W){console.warn("rebuildRoadMeshes failed:",W)}if(Ri.length>0){const W=ui.buildings??!0;for(const it of z1(Ri,y,R,O,g,m,t,e,n,T))it.visible=W,Ha.push(it),gr(it)}const rt=Math.sqrt(t*t+e*e);{const W=new J(0,k*.3,0);Kn.target.lengthSq()<.1&&(_n.position.set(t*.7,k+rt*.44,e*.92),_n.lookAt(W)),Kn.target.copy(W),Kn.update()}}function O1(){Kn&&Kn.target.set(0,0,0),Jt&&(Jt.dispose(),Jt=null),li&&(li.dispose(),li=null),Vc=""}async function U1(i){const t={zoneFeatures:[],buildings:[],roads:[]},{minLat:e,minLon:n,maxLat:s,maxLon:o}=i,l=`(${e},${n},${s},${o})`,u=`[out:json][timeout:60][maxsize:536870912];
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
out geom qt;`,h=new AbortController,f=setTimeout(()=>h.abort(),58e3);try{const p=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(u)}`,{signal:h.signal});if(clearTimeout(f),!p.ok)return t;const g=(await p.json()).elements??[],m=[],y=[],x=[];for(const _ of g){const v=_.tags;v&&(v.highway&&_.type==="way"&&(_.geometry?.length??0)>=2?x.push({hwType:v.highway,geom:_.geometry}):v.building?y.push(_):m.push(_))}return{zoneFeatures:m,buildings:y,roads:x}}catch{return clearTimeout(f),t}}function Zp(i,t,e){let n=!1;const s=e.length;for(let o=0,l=s-1;o<s;l=o++){const c=e[o][0],u=e[o][1],h=e[l][0],f=e[l][1];u>t!=f>t&&i<(h-c)*(t-u)/(f-u)+c&&(n=!n)}return n}function z1(i,t,e,n,s,o,l,c,u,h){const{minLat:f,maxLat:p,minLon:g,maxLon:m}=t,y=new Kt(me[Ne.buildings??7]??"#888888"),x=[new Fn(new J(-1,0,0),l/2),new Fn(new J(1,0,0),l/2),new Fn(new J(0,0,-1),c/2),new Fn(new J(0,0,1),c/2)],_=new Sr({color:y,clippingPlanes:x}),v=[],S=(f+p)/2,w=Math.cos(S*Math.PI/180);for(const T of i){const k=_u(T);if(!k.length)continue;const O=k[0];if(O.length<3||Wa>0&&jp(T,w)<Wa)continue;const D=parseFloat(T.tags?.["building:levels"]??"2")||2,z=Math.max(fu,D*g1*du);let I=0,R=0;for(const et of O)I+=et.lon,R+=et.lat;const G=(I/O.length-g)/(m-g),U=(R/O.length-f)/(p-f),F=G*l-l/2,E=U*c-c/2;if(xo){const et=F,q=(.5-U)*c;if(!Zp(et,q,xo))continue}const Z=new Lo;for(let et=0;et<O.length;et++){const q=(O[et].lon-g)/(m-g),Y=(O[et].lat-f)/(p-f),At=F+(q*l-l/2-F)*Ga,tt=E+(Y*c-c/2-E)*Ga;et===0?Z.moveTo(At,tt):Z.lineTo(At,tt)}Z.closePath();const ot=ja(e,n,G,1-U),rt=u+(ot-s)/o*h,W=new Rs(Z,{depth:z,bevelEnabled:!1});W.rotateX(-Math.PI/2);const it=new Ie(W,_);it.position.y=rt,v.push(it)}return v}function Xp(i){return i==="motorway"||i==="motorway_link"?10:i==="trunk"||i==="trunk_link"?8:i==="primary"||i==="primary_link"?6:i==="secondary"||i==="secondary_link"?5:i==="tertiary"||i==="tertiary_link"?4:3.5}function B1(i,t,e,n,s,o,l,c,u,h,f,p){const{minLat:g,maxLat:m,minLon:y,maxLon:x}=n,_=(D,z)=>{const I=Math.max(0,Math.min(1,D/u+.5)),R=Math.max(0,Math.min(1,.5-z/h)),G=ja(s,o,I,1-R);return f+(G-l)/c*p+e},v=[];for(const D of i){const z=(D.lon-y)/(x-y),I=(D.lat-g)/(m-g);if(z<-.02||z>1.02||I<-.02||I>1.02)continue;const R=(z-.5)*u,G=(.5-I)*h;v.push(new J(R,_(R,G),G))}if(v.length<2)return null;const S=1.5,w=[v[0]];for(let D=1;D<v.length;D++){const z=v[D-1],I=v[D],R=I.x-z.x,G=I.z-z.z,U=Math.sqrt(R*R+G*G),F=Math.max(1,Math.round(U/S));for(let E=1;E<=F;E++){const Z=E/F,ot=z.x+R*Z,rt=z.z+G*Z;w.push(new J(ot,_(ot,rt),rt))}}const T=[],k=[];for(let D=0;D<w.length;D++){const z=w[Math.max(0,D-1)],I=w[Math.min(w.length-1,D+1)],R=I.x-z.x,G=I.z-z.z,U=Math.sqrt(R*R+G*G);if(U<1e-9)T.push(w[D].x,w[D].y,w[D].z),T.push(w[D].x,w[D].y,w[D].z);else{const F=-G/U*t,E=R/U*t;T.push(w[D].x-F,w[D].y,w[D].z-E),T.push(w[D].x+F,w[D].y,w[D].z+E)}if(D>0){const F=(D-1)*2;k.push(F,F+2,F+1,F+1,F+2,F+3)}}if(T.length<12)return null;const O=new Oe;return O.setAttribute("position",new ye(T,3)),O.setIndex(k),O.computeVertexNormals(),O}function $c(){if(Ai){Be?.remove(Ai);const v=An.indexOf(Ai);v>=0&&An.splice(v,1),Ai=null}if(!fe||!Be||!Ii.length)return;const{grid:i,minE:t,elevRange:e,bounds:n}=fe,s=Qn,o=di,l=fi,c=wo,u=Pi,h=(n.minLat+n.maxLat)/2,f=(n.maxLon-n.minLon)*Math.cos(h*Math.PI/180)*111320,p=o/f,g=Ne.roads??8,m=new Kt(me[g]??"#262626"),y=new Sr({color:m,side:ln,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4}),x=(mu==="raised"?Za:-Za)+.2,_=new Mr;for(const v of Ii){if(xo){const k=n;if(!v.geom.some(D=>{const z=(D.lon-k.minLon)/(k.maxLon-k.minLon)*o-o/2,I=(.5-(D.lat-k.minLat)/(k.maxLat-k.minLat))*l;return Zp(z,I,xo)}))continue}const S=Xp(v.hwType)*p*al,w=Math.max(pu,S)/2,T=B1(v.geom,w,x,n,i,s,t,e,o,l,c,u);T&&_.add(new Ie(T,y))}_.children.length>0&&(_.visible=ui.roads??!0,Be.add(_),An.push(_),Ai=_)}function F1(i,t){Mo=i,Va=t}function H1(i,t){ol[i]=t,Jt&&(Jt.dispose(),Jt=null)}function V1(i,t){po=i,Wc=t,Jt&&(Jt.dispose(),Jt=null)}function ff(i,t){ji[i]=t,Jt&&(Jt.dispose(),Jt=null)}function qp(i){const t=i.water??"";return["ocean","sea","bay","strait"].includes(t)?"water_ocean":t==="canal"?"water_canal":t==="lake"||!t&&i.natural==="water"?"water_lake":t==="pond"?"water_pond":t==="reservoir"||i.landuse==="reservoir"?"water_reservoir":t==="wastewater"?"water_wastewater":["basin","dock","reflecting_pool","swimming_pool","moat"].includes(t)?"water_human":"water_other"}function G1(i){const t=i.waterway??"";return t==="river"?ji.rivers!==!1:t==="canal"?ji.canals!==!1:t==="stream"||t==="ditch"?(i.name?ji.streams_named:ji.streams_unnamed)!==!1:!0}function W1(i,t,e){let n=!1;for(let s=0,o=e.length-1;s<e.length;o=s++){const l=e[s].lat,c=e[s].lon,u=e[o].lat,h=e[o].lon;l>i!=u>i&&t<(h-c)*(i-l)/(u-l)+c&&(n=!n)}return n}function _u(i){return i.type==="way"&&i.geometry?[i.geometry]:i.type==="relation"&&i.members?i.members.filter(t=>t.role==="outer"&&t.geometry).map(t=>t.geometry):[]}function Z1(i,t,e,n,s,o,l){if(!Va&&Mo===0)return i;const c=new Float32Array(i),u=e.maxLat-e.minLat,h=e.maxLon-e.minLon,f=s>0&&o>0?l/o*s:0;for(const p of n)if(!(!p.tags||!(p.tags.natural==="water"||p.tags.waterway==="riverbank"))&&ol[qp(p.tags)]!==!1)for(const m of _u(p)){if(m.length<3)continue;let y=1/0,x=-1/0,_=1/0,v=-1/0;for(const z of m)z.lat<y&&(y=z.lat),z.lat>x&&(x=z.lat),z.lon<_&&(_=z.lon),z.lon>v&&(v=z.lon);const S=Math.max(0,Math.floor((e.maxLat-x)/u*(t-1))),w=Math.min(t-1,Math.ceil((e.maxLat-y)/u*(t-1))),T=Math.max(0,Math.floor((_-e.minLon)/h*(t-1))),k=Math.min(t-1,Math.ceil((v-e.minLon)/h*(t-1))),O=[];let D=1/0;for(let z=S;z<=w;z++){const I=e.maxLat-z/(t-1)*u;for(let R=T;R<=k;R++)if(W1(I,e.minLon+R/(t-1)*h,m)){const G=z*t+R;O.push(G),c[G]<D&&(D=c[G])}}for(const z of O)Va&&(c[z]=D),c[z]+=Mo*f}return c}function io(i,t){return i.natural==="wood"?t.lc_forest_detailed===!0:i.landuse==="forest"?t.lc_forest===!0:i.natural==="grassland"||i.landuse==="grass"?t.lc_grass===!0:i.landuse==="meadow"?t.lc_grass_detailed===!0:i.landuse==="farmland"?t.lc_crop===!0:i.natural==="fell"||i.natural==="moor"?t.lc_moss===!0:i.natural==="heath"?t.lc_shrub===!0:i.natural==="scrub"?t.lc_scrub===!0:i.natural==="wetland"?i.wetland==="mangrove"?t.lc_mangrove===!0:t.lc_wetland===!0:i.natural==="mud"?t.lc_wetland_detailed===!0:i.natural==="glacier"?t.lc_glacier===!0:i.natural==="snow"?t.lc_snow===!0:i.natural==="bare_rock"?t.lc_rock===!0:i.natural==="scree"?t.lc_barren===!0:i.natural==="sand"?t.lc_sand===!0||t.lc_desert===!0:!1}const Yc=[{id:"veg_low",match:i=>io(i,Xi.veg_low??{}),slot:3,fill:!0},{id:"veg_dense",match:i=>io(i,Xi.veg_dense??{}),slot:4,fill:!0},{id:"wetland",match:i=>io(i,Xi.wetland_lc??{}),slot:3,fill:!0},{id:"snow",match:i=>io(i,Xi.snow_lc??{}),slot:2,fill:!0},{id:"barren",match:i=>io(i,Xi.barren_lc??{}),slot:1,fill:!0},{id:"water",match:i=>i.natural==="water"&&(()=>{const t=qp(i);return t==="water_canal"?ji.canal_polygons!==!1:ol[t]!==!1})(),slot:5,fill:!0},{id:"river_polygons",match:i=>i.waterway==="riverbank"&&ji.river_polygons!==!1,slot:5,fill:!0},{id:"waterways",match:i=>!!i.waterway&&i.waterway!=="riverbank"&&G1(i),slot:5,fill:!1}];function jp(i,t){const e=n=>{if(n.length<3)return 0;let s=0;for(let o=0,l=n.length-1;o<n.length;l=o++)s+=(n[l].lon+n[o].lon)*(n[l].lat-n[o].lat);return Math.abs(s)/2*(t*111320)*111320};return i.type==="way"&&i.geometry?e(i.geometry):i.type==="relation"&&i.members?i.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,s)=>n+e(s.geometry),0):0}function xs(i,t,e,n,s,o,l,c,u,h,f){const p=T1,g=document.createElement("canvas");g.width=g.height=p;const m=g.getContext("2d");{const T=wc(me[Ne.veg_low??3]??"#8ab858"),k=wc(me[Ne.veg_dense??4]??"#3a6828"),O=wc(me[Ne.base??1]??"#c0af88"),D=document.createElement("canvas");D.width=e,D.height=e;const z=D.getContext("2d"),I=z.createImageData(e,e),R=I.data;for(let G=0;G<e;G++)for(let U=0;U<e;U++){const F=Math.max(0,Math.min(1,(t[G*e+U]-n)/(s||1))),E=F<.4?gf(T,k,F/.4):F<.65?gf(k,O,(F-.4)/.25):O,Z=(G*e+U)*4;R[Z]=E[0],R[Z+1]=E[1],R[Z+2]=E[2],R[Z+3]=255}z.putImageData(I,0,0),m.drawImage(D,0,0,p,p)}const y=document.getElementById("cp-filter"),x=y?Number(y.value):100,_=Math.cos((i.minLat+i.maxLat)/2*Math.PI/180),v=(i.maxLon-i.minLon)*_*111320*(i.maxLat-i.minLat)*111320,S=Math.pow(1-x/100,2)*.02*v;for(const T of Yc){if(!ui[T.id])continue;const k=o.filter(z=>!z.tags||!T.match(z.tags)?!1:T.fill&&S>0?jp(z,_)>=S:!0);if(!k.length)continue;const O=Ne[T.id]??T.slot,D=me[O]??"#888";if(T.fill){m.beginPath();for(const z of k)pf(m,z,i,p);m.fillStyle=D,m.fill("evenodd")}}{const T=l/(e-1),k=c/(e-1),O=u/(s>0?s:1),D=-.5,z=.7071,I=-.5,R=new Float32Array(e*e);for(let F=0;F<e;F++)for(let E=0;E<e;E++){const Z=Math.max(0,E-1),ot=Math.min(e-1,E+1),rt=Math.max(0,F-1),W=Math.min(e-1,F+1),it=(t[F*e+ot]-t[F*e+Z])/((ot-Z)*T),et=(t[W*e+E]-t[rt*e+E])/((W-rt)*k),q=it*O,Y=et*O,At=Math.sqrt(q*q+1+Y*Y),tt=(-q*D+z-Y*I)/At;R[F*e+E]=Math.max(.35,Math.min(1.3,.45+.85*Math.max(0,tt)))}const G=m.getImageData(0,0,p,p),U=G.data;for(let F=0;F<p;F++)for(let E=0;E<p;E++){const Z=E/(p-1)*(e-1),ot=F/(p-1)*(e-1),rt=Math.min(e-2,Math.floor(Z)),W=Math.min(e-2,Math.floor(ot)),it=Z-rt,et=ot-W,q=R[W*e+rt]*(1-it)*(1-et)+R[W*e+rt+1]*it*(1-et)+R[(W+1)*e+rt]*(1-it)*et+R[(W+1)*e+rt+1]*it*et,Y=(F*p+E)*4;U[Y]=U[Y]*q>255?255:U[Y]*q,U[Y+1]=U[Y+1]*q>255?255:U[Y+1]*q,U[Y+2]=U[Y+2]*q>255?255:U[Y+2]*q}m.putImageData(G,0,0)}if((ui.roads??!0)&&h.length>0){const T=Ne.roads??8,k=me[T]??"#262626",O=(i.minLat+i.maxLat)/2,D=Math.cos(O*Math.PI/180),z=(i.maxLon-i.minLon)*D*111320,I=p/z;m.lineCap="round",m.lineJoin="round";for(const R of h){const G=Xp(R.hwType)*I*al,U=Math.max(4,G);m.beginPath();let F=!0;for(const E of R.geom){const Z=(E.lon-i.minLon)/(i.maxLon-i.minLon)*p,ot=(1-(E.lat-i.minLat)/(i.maxLat-i.minLat))*p;F?(m.moveTo(Z,ot),F=!1):m.lineTo(Z,ot)}m.strokeStyle=k,m.lineWidth=U,m.stroke()}}if((ui.buildings??!0)&&f.length>0){const T=Ne.buildings??7,k=me[T]??"#b8b8b8";m.fillStyle=k,m.beginPath();for(const O of f){const D=_u(O);if(!D.length)continue;const z=D[0];if(!(z.length<3)){for(let I=0;I<z.length;I++){const R=(z[I].lon-i.minLon)/(i.maxLon-i.minLon)*p,G=(1-(z[I].lat-i.minLat)/(i.maxLat-i.minLat))*p;I===0?m.moveTo(R,G):m.lineTo(R,G)}m.closePath()}}m.fill("nonzero")}for(const T of Yc){if(T.fill||!ui[T.id])continue;const k=o.filter(z=>z.tags&&T.match(z.tags));if(!k.length)continue;const O=Ne[T.id]??T.slot,D=me[O]??"#888";for(const z of k){if(!z.tags)continue;const I=z.tags.waterway??"",R=(I==="river"?7:I==="canal"?5:I==="stream"?2.5:1.5)*po;m.beginPath(),pf(m,z,i,p),m.strokeStyle=D,m.lineWidth=R,m.lineCap="round",m.lineJoin="round",m.stroke()}}const w=new op(g);return En&&(w.anisotropy=En.capabilities.getMaxAnisotropy()),w}function pf(i,t,e,n){const s=o=>{if(!(!o||o.length<2))for(let l=0;l<o.length;l++){const c=(o[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,u=(1-(o[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?i.moveTo(c,u):i.lineTo(c,u)}};if(t.type==="way"&&t.geometry)s(t.geometry);else if(t.type==="relation"&&t.members)for(const o of t.members)(o.role==="outer"||o.role==="inner")&&o.geometry&&s(o.geometry)}function X1(i,t,e,n,s){if(!i||i.length<3||t==="rect"||t==="sq")return null;const o=512,l=document.createElement("canvas");l.width=l.height=o;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,o,o),c.fillStyle="white",c.beginPath();for(let u=0;u<i.length;u++){const[h,f]=i[u],p=(f-e.minLon)/(e.maxLon-e.minLon)*o,g=(1-(h-e.minLat)/(e.maxLat-e.minLat))*o;u===0?c.moveTo(p,g):c.lineTo(p,g)}return c.closePath(),c.fill(),new op(l)}function q1(i,t,e,n,s){return!i||i.length<3||t==="rect"||t==="sq"?[[-n/2,-s/2],[n/2,-s/2],[n/2,s/2],[-n/2,s/2]]:i.map(([o,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(o-e.minLat)/(e.maxLat-e.minLat))*s-s/2])}function j1(i,t,e,n,s,o){if(t==="rect"||t==="sq"){const u=new pn(e+o*2,s,n+o*2);return u.translate(0,s/2,0),u}const l=new Lo;if(t==="circ"){const u=e/2+o,h=n/2+o;for(let f=0;f<=64;f++){const p=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(p)*u,Math.sin(p)*h):l.lineTo(Math.cos(p)*u,Math.sin(p)*h)}}else{l.moveTo(i[0][0],i[0][1]);for(let u=1;u<i.length;u++)l.lineTo(i[u][0],i[u][1]);l.closePath()}const c=new Rs(l,{depth:s,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function $1(i,t,e,n,s,o,l,c,u,h,f,p,g){const m=(x,_)=>{const v=Math.max(0,Math.min(1,(x+e/2)/e)),S=Math.max(0,Math.min(1,(_+n/2)/n)),w=v*(u-1),T=S*(u-1),k=Math.min(u-2,Math.floor(w)),O=Math.min(u-2,Math.floor(T)),D=w-k,z=T-O,I=c[O*u+k]*(1-D)*(1-z)+c[O*u+k+1]*D*(1-z)+c[(O+1)*u+k]*(1-D)*z+c[(O+1)*u+k+1]*D*z;return p+(I-h)/f*g};return t==="rect"||t==="sq"?o?Y1(e,n,s,l):K1(e,n,s,u,c,h,f,p,g):J1(i,s,o?()=>l:m)}function Y1(i,t,e,n){const s=(o,l,c,u,h)=>{const f=new Ie(new pn(o,l,c));return f.position.set(u,l/2,h),f};return[s(i+e*2,n,e,0,t/2+e/2),s(i+e*2,n,e,0,-t/2-e/2),s(e,n,t,i/2+e/2,0),s(e,n,t,-i/2-e/2,0)]}function K1(i,t,e,n,s,o,l,c,u){const h=(S,w)=>c+(s[w*n+S]-o)/l*u,f=Math.min(n-1,64),p=S=>Math.round(S/f*(n-1)),g=h(0,n-1),m=h(n-1,n-1),y=h(0,0),x=h(n-1,0),_=[[-i/2-e,t/2,g],...Array.from({length:f+1},(S,w)=>{const T=p(w);return[-i/2+T/(n-1)*i,t/2,h(T,n-1)]}),[i/2+e,t/2,m]],v=[[i/2+e,-t/2,x],...Array.from({length:f+1},(S,w)=>{const T=p(w);return[i/2-T/(n-1)*i,-t/2,h(n-1-T,0)]}),[-i/2-e,-t/2,y]];return[oo(_,[0,0,1],e),oo(v,[0,0,-1],e),oo(Array.from({length:f+1},(S,w)=>{const T=p(w);return[i/2,t/2-T/(n-1)*t,h(n-1,n-1-T)]}),[1,0,0],e),oo(Array.from({length:f+1},(S,w)=>{const T=p(w);return[-i/2,-t/2+T/(n-1)*t,h(0,T)]}),[-1,0,0],e)]}function J1(i,t,e){const n=[],s=i.length;for(let o=0;o<s;o++){const[l,c]=i[o],[u,h]=i[(o+1)%s],f=u-l,p=h-c,g=Math.sqrt(f*f+p*p);if(g<.5)continue;const m=p/g,y=-f/g,x=Math.max(2,Math.round(g/3)),_=[];for(let v=0;v<=x;v++){const S=v/x,w=l+f*S,T=c+p*S;_.push([w,T,e(w,T)])}n.push(oo(_,[m,0,y],t))}return n}function oo(i,t,e){const n=i.length,[s,,o]=t,l=[],c=[];for(const[m,y,x]of i)l.push(m+s*e,0,y+o*e),l.push(m+s*e,x,y+o*e);for(const[m,y,x]of i)l.push(m,0,y),l.push(m,x,y);for(const[m,y,x]of i)l.push(m+s*e,x,y+o*e),l.push(m,x,y);for(const[m,y]of i)l.push(m+s*e,0,y+o*e),l.push(m,0,y);const u=0,h=n*2,f=n*4,p=n*6;for(let m=0;m<n-1;m++){const y=m*2;c.push(u+y,u+y+2,u+y+1,u+y+1,u+y+2,u+y+3),c.push(h+y,h+y+1,h+y+2,h+y+1,h+y+3,h+y+2),c.push(f+y,f+y+1,f+y+2,f+y+1,f+y+3,f+y+2),c.push(p+y,p+y+2,p+y+1,p+y+1,p+y+2,p+y+3)}const g=new Oe;return g.setAttribute("position",new ye(l,3)),g.setIndex(c),g.computeVertexNormals(),new Ie(g)}async function Q1(i){const t=`${i.minLat}|${i.maxLat}|${i.minLon}|${i.maxLon}`;if(t===hf)return;const e=`(${i.minLat},${i.minLon},${i.maxLat},${i.maxLon})`,n=`[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${e};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${e};
  way["piste:type"]${e};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${e};
);
out geom;`,s=new AbortController,o=setTimeout(()=>s.abort(),45e3);let l;try{const u=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(n)}`,{signal:s.signal});clearTimeout(o),l=await u.json()}catch(u){throw clearTimeout(o),u}for(const u of Object.keys(cs))delete cs[u];const c=(u,h)=>{cs[u]||(cs[u]=[]),cs[u].push(h)};for(const u of l.elements)if(u.type==="way"){const h=u.tags??{},f=u.geometry??[];if(f.length<2)continue;if(h.highway){const g={motorway:"road_motorway",motorway_link:"road_motorway",trunk:"road_trunk",trunk_link:"road_trunk",primary:"road_primary",primary_link:"road_primary",secondary:"road_secondary",secondary_link:"road_secondary",tertiary:"road_tertiary",tertiary_link:"road_tertiary",unclassified:"road_unclassified",living_street:"street_living",residential:"street_residential"}[h.highway];g&&c(g,f)}h.railway&&c({narrow_gauge:"rail_narrow",rail:"rail_standard",light_rail:"rail_light",funicular:"rail_funicular",monorail:"rail_monorail",tram:"rail_tram",subway:"rail_subway"}[h.railway]??"rail_unknown",f),h["piste:type"]&&c({easy:"piste_easy",novice:"piste_novice",intermediate:"piste_intermediate",advanced:"piste_advanced",expert:"piste_expert",freeride:"piste_freeride"}[h["piste:difficulty"]??""]??"piste_other",f)}else if(u.type==="relation"){const h=u.tags??{},f=h.route??"",p=h.network??"",g=(u.members??[]).filter(_=>_.type==="way"&&(_.geometry?.length??0)>=2).map(_=>_.geometry);if(!g.length)continue;const y={hiking:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},foot:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},bicycle:{icn:"cycling_icn",ncn:"cycling_ncn",rcn:"cycling_rcn",lcn:"cycling_lcn"},mtb:{"":"mtb_local"},horse:{ihwn:"equestrian_iwn",nhwn:"equestrian_nwn",rhwn:"equestrian_rwn",lhwn:"equestrian_lwn"}}[f];if(!y)continue;let x;if(f==="mtb"){const _=h["mtb:scale"]??"";x=_?`mtb_${_}`:"mtb_local"}else x=y[p]??Object.values(y).at(-1);for(const _ of g)c(x,_)}hf=t,vu()}function mf(i,t){Xa[i]=t,vu()}function vu(){if(us){Be?.remove(us);const f=An.indexOf(us);f>=0&&An.splice(f,1),us=null}if(!fe||!Be)return;const{grid:i,minE:t,elevRange:e,bounds:n}=fe,s=Qn,o=di,l=fi,c=wo,u=Pi,h=new Mr;for(const[f,p]of Object.entries(cs)){if(Xa[f]===!1)continue;const g=tM(f),m=new il({color:g});for(const y of p){const x=[];for(const _ of y){const v=(_.lon-n.minLon)/(n.maxLon-n.minLon),S=(_.lat-n.minLat)/(n.maxLat-n.minLat);if(v<0||v>1||S<0||S>1)continue;const w=(v-.5)*o,T=(.5-S)*l,k=v*(s-1),O=(1-S)*(s-1),D=Math.min(s-2,Math.floor(k)),z=Math.min(s-2,Math.floor(O)),I=k-D,R=O-z,G=i[z*s+D]*(1-I)*(1-R)+i[z*s+D+1]*I*(1-R)+i[(z+1)*s+D]*(1-I)*R+i[(z+1)*s+D+1]*I*R;x.push(new J(w,c+(G-t)/e*u+.6,T))}x.length>=2&&h.add(new ru(new Oe().setFromPoints(x),m))}}h.children.length>0&&(Be.add(h),An.push(h),us=h)}function tM(i){return i.startsWith("road_motorway")?14820122:i.startsWith("road_trunk")?15041054:i.startsWith("road_primary")?16110375:i.startsWith("road_secondary")?13951528:i.startsWith("road_tertiary")?11184810:i.startsWith("road_")?13421772:i.startsWith("street_")?14540253:i.startsWith("rail_")?5592439:i.startsWith("hiking_")?16737792:i.startsWith("cycling_")?26316:i.startsWith("mtb_")?8930304:i.startsWith("equestrian_")?10053171:i.startsWith("piste_easy")?43775:i.startsWith("piste_novice")?52292:i.startsWith("piste_intermediate")?13378082:i.startsWith("piste_")?2236962:8947848}function eM(i,t){const e=new Lo;switch(i){case"square":e.moveTo(-t,-t),e.lineTo(t,-t),e.lineTo(t,t),e.lineTo(-t,t),e.closePath();break;case"diamond":e.moveTo(0,-t),e.lineTo(t*.72,0),e.lineTo(0,t),e.lineTo(-t*.72,0),e.closePath();break;case"triangle":e.moveTo(0,t),e.lineTo(t*.866,-t*.5),e.lineTo(-t*.866,-t*.5),e.closePath();break;case"cross":{const n=t*.32;e.moveTo(-n,-t),e.lineTo(n,-t),e.lineTo(n,-n),e.lineTo(t,-n),e.lineTo(t,n),e.lineTo(n,n),e.lineTo(n,t),e.lineTo(-n,t),e.lineTo(-n,n),e.lineTo(-t,n),e.lineTo(-t,-n),e.lineTo(-n,-n),e.closePath();break}case"heart":{e.moveTo(0,-t*.25),e.bezierCurveTo(-t*.05,-t*.55,-t,-t*.55,-t,t*.1),e.bezierCurveTo(-t,t*.65,-t*.45,t*.88,0,t),e.bezierCurveTo(t*.45,t*.88,t,t*.65,t,t*.1),e.bezierCurveTo(t,-t*.55,t*.05,-t*.55,0,-t*.25),e.closePath();break}case"star":{const n=t,s=t*.42;for(let o=0;o<10;o++){const l=o*Math.PI/5-Math.PI/2,c=o%2===0?n:s,u=Math.cos(l)*c,h=Math.sin(l)*c;o===0?e.moveTo(u,h):e.lineTo(u,h)}e.closePath();break}default:e.absarc(0,0,t,0,Math.PI*2,!1);break}return e}function ja(i,t,e,n){const s=Math.max(0,Math.min(t-2,e*(t-1))),o=Math.max(0,Math.min(t-2,n*(t-1))),l=Math.floor(s),c=Math.floor(o),u=s-l,h=o-c;return i[c*t+l]*(1-u)*(1-h)+i[c*t+l+1]*u*(1-h)+i[(c+1)*t+l]*(1-u)*h+i[(c+1)*t+l+1]*u*h}function yu(i,t){if(!fe||!Be)return;const{grid:e,minE:n,elevRange:s}=fe,o=Qn,l=di,c=fi,u=wo,h=Pi,f=.42,p=.2,g=i.diameterMult*f/2,m=.5,y=i.heightOffMult*p,x=i.lonFrac,_=1-i.latFrac,v=(x-.5)*l,S=(.5-(1-_))*c;let w;if(i.flatTop){let R=-1/0;const G=8;for(let U=0;U<=G;U++)for(let F=0;F<=G;F++){const E=U/G,Z=F/G,ot=x+(E-.5)*(g*2)/l,rt=_+(Z-.5)*(g*2)/c,W=Math.max(0,Math.min(1,ot)),it=Math.max(0,Math.min(1,rt)),et=ja(e,o,W,it);et>R&&(R=et)}w=u+(R-n)/s*h}else{const R=ja(e,o,x,_);w=u+(R-n)/s*h}const T=Ne.gpx??6,k=me[T]??"#ff4500",O=new Sr({color:k,side:ln}),D=eM(i.shape,g),z=new Rs(D,{depth:m,bevelEnabled:!1});z.rotateX(-Math.PI/2),i.rotDeg!==0&&z.rotateY(i.rotDeg*Math.PI/180);const I=new Ie(z,O);I.position.set(v,w+y,S),I.visible=i.visible&&(ui.gpx??!0),Po.set(I,i.id),t>=Jn.length?(gr(I),Jn.push(I)):(Be.add(I),An.push(I),Jn.splice(t,0,I))}function bc(i,t,e,n,s,o,l,c,u,h,f){const p=Math.max(0,Math.min(1,i/e+.5)),g=Math.max(0,Math.min(1,.5-t/n)),m=p*(o-1),y=(1-g)*(o-1),x=Math.min(o-2,Math.floor(m)),_=Math.min(o-2,Math.floor(y)),v=m-x,S=y-_,w=s[_*o+x]*(1-v)*(1-S)+s[_*o+x+1]*v*(1-S)+s[(_+1)*o+x]*(1-v)*S+s[(_+1)*o+x+1]*v*S;return u+(w-l)/c*h+f}function nM(i,t,e,n,s,o,l,c,u,h){const p=Gc*.21+.05+Op*.2,g=[];for(const S of i){const w=Math.max(5e-4,Math.min(.9995,(S.lon-t.minLon)/(t.maxLon-t.minLon))),T=Math.max(5e-4,Math.min(.9995,(S.lat-t.minLat)/(t.maxLat-t.minLat))),k=(w-.5)*e,O=(.5-T)*n;g.push(new J(k,bc(k,O,e,n,s,o,l,c,u,h,p),O))}if(g.length<2)return null;const m=1,y=[g[0]];for(let S=0;S<g.length-1;S++){const w=g[S],T=g[S+1],k=T.x-w.x,O=T.z-w.z,D=Math.sqrt(k*k+O*O),z=Math.max(1,Math.floor(D/m));for(let I=1;I<=z;I++){const R=I/z,G=w.x+k*R,U=w.z+O*R,F=bc(G,U,e,n,s,o,l,c,u,h,p),E=new J(G,F,U);E.distanceTo(y[y.length-1])>=.08&&y.push(E)}}if(y.length<2)return null;const x=Ne.gpx_line??6,_=me[x]??"#ff4500",v=Gc*.21;if(v>=.1){const S=new Nc(y,!1,"centripetal"),w=Math.min(2e3,Math.max(80,y.length*5)),T=S.getSpacedPoints(w);for(const O of T){const D=bc(O.x,O.z,e,n,s,o,l,c,u,h,p-v);O.y<D&&(O.y=D)}const k=new lu(new Nc(T,!1,"centripetal"),w,v,8,!1);return new Ie(k,new Sr({color:_}))}return new ru(new Oe().setFromPoints(y),new il({color:_}))}function gf(i,t,e){return[Math.round(i[0]+(t[0]-i[0])*e),Math.round(i[1]+(t[1]-i[1])*e),Math.round(i[2]+(t[2]-i[2])*e)]}function wc(i){const t=parseInt(i.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}async function iM(i){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=s=>{s.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:s.data.elevGrid,minE:s.data.minE,elevRange:s.data.elevRange,bounds:i})):s.data.type==="ERROR"&&(n.terminate(),e(new Error(s.data.message)))},n.onerror=s=>{n.terminate(),e(s)},n.postMessage({type:"BUILD_TERRAIN",bounds:i,GRID:Qn,elevZoom:12})})}function gr(i){Be.add(i),An.push(i)}function os(i,t){const e=document.getElementById(i);e&&(e.textContent=t)}function rM(){An.forEach(i=>{Be.remove(i),i.geometry?.dispose()}),An=[],ms.length=0}function sM(){if(!_n||!En)return;const i=En.domElement.clientWidth,t=En.domElement.clientHeight;if(!(!i||!t))for(const{id:e,v:n}of ms){const s=document.getElementById(e);if(!s)continue;const o=n.clone().project(_n);if(o.z>1){s.style.opacity="0";continue}s.style.opacity="1",s.style.left=`${(o.x+1)/2*i}px`,s.style.top=`${-(o.y-1)/2*t}px`}}const oM=.05;function aM(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function lM(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function xu(){if(!yt.bounds){Sc("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(yt.generating)return;yt.generating=!0;const i=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");i.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),Rl(!0);try{const n=document.getElementById("c3d");await cu(n);const s=bf(),{bounds:o,wMm:l,dMm:c}=yt,{minLat:u,maxLat:h,minLon:f,maxLon:p}=o,g=(u+h)/2,m=(f+p)/2,y=(p-f)*Math.cos(g*Math.PI/180)*111320;yt.mmPerMeter=l/y,yt.BASE_H=s.baseH,zi(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const x=s.terrainRes,_=await new Promise((z,I)=>{const R=aM();R.onmessage=U=>{U.data.type==="PROGRESS"?zi(5+U.data.pct*.2,"ÉLÉVATION","Altitude…"):U.data.type==="TERRAIN_READY"?(R.terminate(),z(U.data)):U.data.type==="ERROR"&&(R.terminate(),I(new Error(U.data.message)))},R.onerror=U=>{R.terminate(),I(U)};const G={type:"BUILD_TERRAIN",bounds:o,GRID:x,elevZoom:s.elevZoom};R.postMessage(G)});yt.elevGrid=_.elevGrid,yt.GRID=_.GRID,yt.minE=_.minE,yt.elevRange=_.elevRange;const S=(h-u)*111320,w=Math.max(y,S),T=Math.max(l,c),k=_.elevRange/w*T*s.exag;yt.elevScaleMm=Math.max(1,Math.min(T*.5,k)),s.smooth>0&&cM(yt.elevGrid,x,s.smooth),zi(30,"DONNÉES","Chargement des données cartographiques…");const O=await h1(o,z=>{zi(30+z*.3,"DONNÉES","Données carto…")});zi(60,"GÉOMÉTRIE","Génération des géométries 3D…");const D=await new Promise((z,I)=>{const R=lM();R.onmessage=U=>{U.data.type==="GEO_PROGRESS"?zi(60+U.data.pct*.35,"GÉOMÉTRIE",`${U.data.step}…`):U.data.type==="GEOMETRY_READY"?(R.terminate(),z(U.data)):U.data.type==="ERROR"&&(R.terminate(),I(new Error(U.data.message)))},R.onerror=U=>{R.terminate(),I(U)};const G={type:"BUILD_GEOMETRY",elevGrid:yt.elevGrid,GRID:yt.GRID,wMm:l,dMm:c,BASE_H:yt.BASE_H,MIN_SURF:oM,elevScaleMm:yt.elevScaleMm,minE:yt.minE,elevRange:yt.elevRange,features:O,gpxPoints:yt.gpxPoints,bounds:o,settings:s,zoneType:yt.zoneType,zonePts:yt.zonePts,mmPerMeter:yt.mmPerMeter};R.postMessage(G)});zi(95,"SCÈNE","Construction de la scène 3D…"),gw(D),zi(100,"TERMINÉ","Modèle 3D prêt."),yt.generated=!0,yt.generating=!1,setTimeout(()=>{Rl(!1),document.getElementById("hint3d").style.display="block",uM(_.minE,_.maxE,yt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){yt.generating=!1,Rl(!1),Sc("ERREUR",String(n)),console.error(n)}finally{i.disabled=!1}}function cM(i,t,e){const n=new Float32Array(i.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,u=0;for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++){const p=o+h,g=l+f;p>=0&&p<t&&g>=0&&g<t&&(c+=i[p*t+g],u++)}n[o*t+l]=c/u}i.set(n)}}function uM(i,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(i)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function hM(){const i=document.getElementById("zone-footer");i&&(yt.bounds?(i.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),O1()):(i.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}let Ls=!1,Mc=!1;function Mn(){const i=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:i("dp-w",yt.wMm||200),dMm:i("dp-d",yt.dMm||200),baseH:i("dp-base",5),exag:i("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:i("dp-walls",2),gpxPoints:yt.gpxPoints,zoneType:yt.zoneType,zonePts:yt.zonePts,bounds:yt.bounds}}function bu(){const i=(g,m)=>{const y=document.getElementById(g);y&&(y.value=String(Math.round(m)))};if(!yt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:s}=yt.bounds,o=(t+e)/2,l=(s-n)*Math.cos(o*Math.PI/180)*111320,c=(e-t)*111320,u=200,h=l/c,f=h>=1?u:Math.max(10,Math.round(u*h)),p=h<1?u:Math.max(10,Math.round(u/h));yt.wMm=f,yt.dMm=p,i("dp-w",f),i("dp-d",p)}function Rr(){const i=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=document.getElementById("dp-layers-hint"),o=document.getElementById("dp-wall-mm");s&&(s.textContent=`${Math.round(i/e)} couches`),o&&(o.textContent=`${(t*n).toFixed(2)} mm`)}async function $a(){if(!yt.bounds||Mc)return;Mc=!0;const i=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");i.classList.remove("hidden");try{await N1(yt.bounds,Mn(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{i.classList.add("hidden"),Mc=!1}}function ll(){yt.bounds&&(bu(),Rr(),requestAnimationFrame(()=>{const i=document.getElementById("dims-view");Ls?(As(i),$a()):(Ls=!0,As(i),$a())}))}window.dpToggle=i=>{document.getElementById(i)?.classList.toggle("open")};tg();ig(hM);document.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{const t=i.dataset.tab;if(!(!t||i.disabled)&&(Di(t),t==="params"?ll():t==="colors"?wu():t==="apercu"?$p():Fp(),t==="render")){const e=document.getElementById("c3d");e&&cu(e)}})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),Di("colors"),wu()});document.getElementById("btn-next-apercu")?.addEventListener("click",()=>{document.getElementById("tab-apercu-btn")?.removeAttribute("disabled"),Di("apercu"),$p()});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),Di("render");const i=document.getElementById("c3d");i&&cu(i),xu()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{Fp(),Di("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{Di("params"),ll()});document.getElementById("btn-back-params")?.addEventListener("click",()=>{Di("params"),ll()});document.getElementById("btn-back-colors")?.addEventListener("click",()=>{Di("colors"),wu()});document.getElementById("btn-gen")?.addEventListener("click",xu);document.getElementById("btn-stl")?.addEventListener("click",()=>kp("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>p1());document.querySelectorAll(".dp-sh").forEach(i=>{i.addEventListener("click",()=>{i.closest(".dp-sec")?.classList.toggle("open")})});let _f;const dM=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];dM.forEach(i=>{document.getElementById(i)?.addEventListener("input",()=>{Rr();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(yt.wMm=t),e>0&&(yt.dMm=e),clearTimeout(_f),_f=setTimeout(()=>wn(Mn()),500)})});document.getElementById("dp-walls")?.addEventListener("input",Rr);document.getElementById("dp-flat")?.addEventListener("change",()=>{wn(Mn())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>{if(!yt.generated){Sc("INFO",`Générez d'abord le modèle 3D dans l'onglet "Générer & Exporter".`);return}kp("terrain3d.stl")});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{yt.bounds&&(Di("params"),ll())});let vf;document.querySelectorAll("#params-col input, #params-col select").forEach(i=>{i.addEventListener("change",()=>{clearTimeout(vf),vf=setTimeout(()=>{yt.generated&&yt.tg&&xu()},700)}),i.addEventListener("input",()=>{if(i.type==="range"){const t=document.getElementById(`${i.id}-v`);t&&(t.textContent=i.value)}})});function wu(){yt.bounds&&(bu(),requestAnimationFrame(()=>{const i=document.getElementById("colors-3d-area");Ls?(As(i),wn(Mn())):(Ls=!0,As(i),$a()),fM()}))}function $p(){yt.bounds&&(bu(),requestAnimationFrame(()=>{const i=document.getElementById("apercu-3d-area");Ls?(As(i),wn(Mn())):(Ls=!0,As(i),$a())}))}function fM(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(i=>{const t=Number(i.dataset.slot);me[t]&&(i.style.background=me[t])}),document.querySelectorAll(".cp-sw-inner").forEach(i=>{const e=i.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(i.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(i=>{const t=Number(i.dataset.slot);i.addEventListener("input",()=>{const n=i.value,s=i.nextElementSibling;s&&(s.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(o=>{o.style.background=n}),Is({[t]:n})});const e=i.nextElementSibling;e&&(e.style.background=i.value)});function pM(i,t){Is({[i]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${i}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${i}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let as=null;function mM(i,t){as&&(as.remove(),as=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(me).map(Number).sort((c,u)=>c-u),s=Ne[i]??Number(t.dataset.slot)??1;n.forEach(c=>{const u=document.createElement("div");u.className="cp-slot-pick-item"+(c===s?" active":""),u.style.setProperty("--sw",me[c]??"#888"),u.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,u.addEventListener("click",h=>{h.stopPropagation(),A1(i,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=me[c]??"#888",e.remove(),as=null}),e.appendChild(u)}),document.body.appendChild(e),as=e;const o=t.getBoundingClientRect();e.style.left=`${o.left}px`,e.style.top=`${o.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),as=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(i=>{i.addEventListener("click",t=>{t.stopPropagation();const n=i.closest(".cp-layer")?.dataset.layer??"";n&&mM(n,i)})});let ls=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(ls){ls.remove(),ls=null;return}const i=Math.max(...Object.keys(me).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,ls=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),ls=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const s=e.value;me[i]=s;const o=document.createElement("label");o.className="cp-swatch",o.dataset.slot=String(i),o.title=`Couleur ${i}`,o.innerHTML=`<input type="color" class="cp-color-input" data-slot="${i}" value="${s}"><div class="cp-sw-inner" style="background:${s}"><span class="cp-sw-num">${i}</span></div>`,o.querySelector(".cp-color-input").addEventListener("input",function(){pM(i,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(o),t.remove(),ls=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete me[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{Is({})});document.querySelectorAll(".cp-eye").forEach(i=>{const t=i.dataset.layer;t&&i.addEventListener("click",()=>{i.classList.toggle("hidden-layer");const e=!i.classList.contains("hidden-layer");Hp(t,e)})});const Yp={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const i=document.getElementById("cp-preset").value,t=Yp[i];t&&(Is(t),Object.entries(t).forEach(([e,n])=>{const s=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(s){s.value=n;const o=s.nextElementSibling;o&&(o.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const gM=document.getElementById("cp-dd-trigger"),Mu=document.getElementById("cp-dd-menu");gM?.addEventListener("click",i=>{i.stopPropagation(),Mu?.classList.toggle("open")});document.addEventListener("click",()=>Mu?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(i=>{i.addEventListener("click",t=>{t.stopPropagation();const e=i.dataset.preset??"",n=i.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),i.classList.add("cp-dd-active");const s=document.getElementById("cp-dd-label");s&&(s.textContent=n),Mu?.classList.remove("open");const o=Yp[e];o&&(Is(o),_M(o))})});function _M(i){Object.entries(i).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const s=n.nextElementSibling;s&&(s.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);i[e]&&(t.style.background=i[e])})}const Su=document.getElementById("cp-layer-detail"),Kp=document.getElementById("ldp-title"),Jp=document.getElementById("ldp-icon"),Qp=document.getElementById("ldp-content");function vM(i,t,e){Kp.textContent=t,Jp.innerHTML=e,Qp.innerHTML=bM(i),Su.classList.add("open"),CM(i)}function tm(){Su.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",tm);document.querySelectorAll(".cp-layer-nav").forEach(i=>{i.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=i.dataset.type??"land_cover",n=i.querySelector(".cp-layer-name")?.textContent??"Couche",s=i.querySelector(".cp-layer-ico")?.innerHTML??"";vM(e,n,s)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{Kp.textContent="Nouvelle couche",Jp.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',Qp.innerHTML=LM(),Su.classList.add("open"),PM()});function yM(){const i=mu==="raised";return`
  <div class="ldp-section">
    <div class="ldp-row">
      <label class="ldp-label">Road Style</label>
      <div class="ldp-row-right" style="display:flex;gap:4px">
        <button class="ldp-style-btn${i?" active":""}" data-style="raised">Raised</button>
        <button class="ldp-style-btn${i?"":" active"}" data-style="recessed">Recessed</button>
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
        <input type="number" id="ldp-road-minw" min="0.1" max="10" step="0.05" value="${pu.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">mm</span>
      </div>
    </div>
    <div class="ldp-row">
      <label class="ldp-label">Road Width Multiplier</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-road-mult" min="0.1" max="10" step="0.05" value="${al.toFixed(2)}" style="width:72px">
        <span style="margin-left:4px">x</span>
      </div>
    </div>
  </div>`}function xM(){const i=du.toFixed(2),t=Ga.toFixed(2),e=fu.toFixed(2),n=Wa.toFixed(2);return`
  <div class="ldp-section">
    <div class="ldp-row">
      <label class="ldp-label">Building height scale</label>
      <div class="ldp-row-right">
        <input type="number" id="ldp-bld-hscale" min="0.1" max="20" step="0.05" value="${i}" style="width:72px">
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
  </div>`}function bM(i){return i==="markers"?SM():i==="lines"?TM():i==="water"?MM():i==="waterways"?wM():["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(i)?AM(i):i==="roads"?yM():i==="buildings"?xM():""}function wM(){const i=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=(po*i).toFixed(2),n=(Wc*t).toFixed(2),s=ji;return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Largeur (nb. de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Épaisseur des lignes comme multiple de la largeur de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-ww-width" class="cp-slider" min="1" max="10" step="0.5" value="${po}">
        <input type="number" class="ldp-num" id="ldp-ww-width-n" value="${po}" step="0.5">
        <span class="ldp-unit" id="ldp-ww-width-mm">( ${e} mm )</span>
      </div>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-ww-offset" value="${Wc}" step="1">
        <span class="ldp-unit" id="ldp-ww-offset-mm">( ${n} mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Caractéristiques</span></div>
    <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="rivers"${s.rivers!==!1?" checked":""}> Rivières</label>
    <div class="ldp-ww-stream-group">
      <label class="ldp-check-row"><input type="checkbox" id="ldp-ww-streams" class="ldp-ww-feat" data-key="streams"${s.streams_named!==!1||s.streams_unnamed!==!1?" checked":""}> Ruisseaux</label>
      <div class="ldp-ww-stream-subs" style="padding-left:18px">
        <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="streams_named"${s.streams_named!==!1?" checked":""}> Nommés</label>
        <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="streams_unnamed"${s.streams_unnamed!==!1?" checked":""}> Sans nom</label>
      </div>
    </div>
    <label class="ldp-check-row">
      <input type="checkbox" class="ldp-ww-feat" data-key="river_polygons"${s.river_polygons!==!1?" checked":""}>
      Polygones rivières (expérimental)
      <button class="cp-icon-btn cp-info-btn" title="Peut donner des résultats étranges pour le décalage de hauteur en zone montagneuse">i</button>
    </label>
    <label class="ldp-check-row"><input type="checkbox" class="ldp-ww-feat" data-key="canals"${s.canals!==!1?" checked":""}> Canaux</label>
    <label class="ldp-check-row">
      <input type="checkbox" class="ldp-ww-feat" data-key="canal_polygons"${s.canal_polygons!==!1?" checked":""}>
      Polygones canaux (expérimental)
      <button class="cp-icon-btn cp-info-btn" title="Peut donner des résultats étranges pour le décalage de hauteur en zone montagneuse">i</button>
    </label>
  </div>`}function MM(){const i=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,t=(Mo*i).toFixed(2),n=[{key:"water_ocean",label:"Océans"},{key:"water_lake",label:"Lacs"},{key:"water_pond",label:"Étangs"},{key:"water_reservoir",label:"Réservoirs"},{key:"water_wastewater",label:"Eaux usées"},{key:"water_human",label:"Artificiel"},{key:"water_other",label:"Autre"}].map(s=>`<label class="ldp-check-row"><input type="checkbox" class="ldp-water-feat" data-key="${s.key}"${ol[s.key]!==!1?" checked":""}> ${s.label}</label>`).join("");return`
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Paramètres</span></div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nb. de couches)</span>
        <button class="cp-icon-btn cp-info-btn" title="Positif = élève au-dessus de la surface, négatif = enfonce en dessous">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-water-offset" value="${Mo}" step="1">
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
  </div>`}function SM(){return`
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
  </div>`}const EM=[{label:"Itinéraires de randonnée",cats:[{key:"hiking_iwn",label:"International"},{key:"hiking_nwn",label:"National"},{key:"hiking_rwn",label:"Régional"},{key:"hiking_lwn",label:"Local"}]},{label:"Itinéraires cyclables",cats:[{key:"cycling_icn",label:"International"},{key:"cycling_ncn",label:"National"},{key:"cycling_rcn",label:"Régional"},{key:"cycling_lcn",label:"Local"}]},{label:"Parcours de VTT",cats:[{key:"mtb_0",label:"International"},{key:"mtb_1",label:"National"},{key:"mtb_2",label:"Régional"},{key:"mtb_local",label:"Local"}]},{label:"Itinéraires équestres",cats:[{key:"equestrian_iwn",label:"International"},{key:"equestrian_nwn",label:"National"},{key:"equestrian_rwn",label:"Régional"},{key:"equestrian_lwn",label:"Local"}]},{label:"Sports d'hiver",cats:[{key:"piste_easy",label:"Facile"},{key:"piste_novice",label:"Novice"},{key:"piste_intermediate",label:"Intermédiaire"},{key:"piste_advanced",label:"Avancé"},{key:"piste_expert",label:"Expert"},{key:"piste_freeride",label:"Freeride"},{key:"piste_other",label:"Autre difficulté"},{key:"piste_none",label:"Sans difficulté"}]},{label:"Routes",cats:[{key:"road_motorway",label:"Autoroute"},{key:"road_trunk",label:"Voie express"},{key:"road_primary",label:"Route nationale"},{key:"road_secondary",label:"Route départementale"},{key:"road_tertiary",label:"Voie tertiaire"},{key:"road_unclassified",label:"Non classifiée"}]},{label:"Rues",cats:[{key:"street_living",label:"Zone de rencontre"},{key:"street_residential",label:"Rue résidentielle"}]},{label:"Rails",cats:[{key:"rail_narrow",label:"Voie étroite"},{key:"rail_standard",label:"Voie standard"},{key:"rail_unknown",label:"Inconnue"},{key:"rail_funicular",label:"Funiculaire"},{key:"rail_light",label:"Tramway rapide"},{key:"rail_monorail",label:"Monorail"},{key:"rail_tram",label:"Tramway"},{key:"rail_subway",label:"Métro"}]}];function TM(){const i='<svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg>';return`
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
    <div id="ldp-line-groups">${EM.map(e=>{const n=e.cats.every(o=>Xa[o.key]===!0),s=e.cats.map(o=>{const l=Xa[o.key]===!0;return`<label class="ldp-sub-row"><input type="checkbox" class="ldp-line-sub" data-linecat="${o.key}"${l?" checked":""}> ${o.label}</label>`}).join("");return`
    <div class="ldp-line-group">
      <div class="ldp-line-group-header">
        <input type="checkbox" class="ldp-line-group-chk" data-group="${e.label}"${n?" checked":""}>
        <span class="ldp-group-label">${e.label}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories">${i}</button>
      </div>
      <div class="ldp-line-subs">${s}</div>
    </div>`}).join("")}</div>
    <div id="ldp-line-status" class="ldp-line-status"></div>
  </div>`}function AM(i){const t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,e=zp[i]??0,n=(e*t).toFixed(2),s=Xi[i]??{},o=(c,u,h)=>{const f=h.filter(y=>s[y.key]===!0).length,p=f===h.length,g=f>0,m=h.map(y=>`<label class="ldp-check-row ldp-lc-sub"><input type="checkbox" class="ldp-lc-feat" data-key="${y.key}"${s[y.key]===!0?" checked":""}> ${y.label}</label>`).join("");return`
    <div class="ldp-lc-group">
      <div class="ldp-lc-group-header">
        <input type="checkbox" class="ldp-lc-group-chk" data-group="${c}"${p?" checked":g?' data-indeterminate="1"':""}>
        <span class="ldp-group-label">${u}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories"><svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg></button>
      </div>
      <div class="ldp-line-subs">${m}</div>
    </div>`},l=[o("forests","Forêts",[{key:"lc_forest",label:"Forêt"},{key:"lc_forest_detailed",label:"Forêt (Détaillée)"}]),o("shrubs","Arbustes",[{key:"lc_scrub",label:"Lande"},{key:"lc_shrub",label:"Buisson"}]),o("fields","Champs",[{key:"lc_grass",label:"Prairie"},{key:"lc_grass_detailed",label:"Prairie (Détaillée)"},{key:"lc_crop",label:"Culture"},{key:"lc_moss",label:"Mousse"}]),o("wetlands","Zones humides",[{key:"lc_wetland",label:"Zone humide"},{key:"lc_wetland_detailed",label:"Zone humide (Détaillée)"},{key:"lc_mangrove",label:"Mangrove"}]),o("barren","Terrain nu",[{key:"lc_barren",label:"Terrain nu"},{key:"lc_desert",label:"Désert"},{key:"lc_sand",label:"Sable"},{key:"lc_rock",label:"Roche"}]),o("ice","Glace",[{key:"lc_snow",label:"Glace & Neige"},{key:"lc_glacier",label:"Glacier"}]),`<label class="ldp-check-row"><input type="checkbox" class="ldp-lc-feat" data-key="lc_urban"${s.lc_urban===!0?" checked":""}> Urbain</label>`].join("");return`
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
  </div>`}function LM(){return`
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
  </div>`}function CM(i){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(i==="markers"){const n=document.getElementById("ldp-marker-size"),s=document.getElementById("ldp-marker-size-n"),o=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),c=document.getElementById("ldp-marker-rot-n"),u=document.getElementById("ldp-marker-offset"),h=document.getElementById("ldp-offset-mm"),f=()=>{o&&(o.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},p=()=>{h&&(h.textContent=`( ${(Number(u.value||0)*e).toFixed(2)} mm )`)},g=()=>{const m=qc();m<0||jc(m,{diameterMult:Number(n?.value??10)||10,rotDeg:Number(l?.value??0),flatTop:document.getElementById("ldp-marker-flat")?.checked??!0,heightOffMult:Number(u?.value??0)})};n?.addEventListener("input",()=>{s&&(s.value=Number(n.value).toFixed(1)),f(),g()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),f(),g()}),l?.addEventListener("input",()=>{c&&(c.value=l.value),g()}),c?.addEventListener("input",()=>{l&&(l.value=c.value),g()}),u?.addEventListener("input",()=>{p(),g()}),document.getElementById("ldp-marker-flat")?.addEventListener("change",g),f(),p(),ws(),document.querySelectorAll(".ldp-shape-btn").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(_=>_.classList.remove("active")),m.classList.add("active");const y=m.dataset.shape??"circle",x=qc();x>=0?jc(x,{shape:y}):(C1(y),Eu(!0))})})}if(i==="lines"){const n=document.getElementById("ldp-line-w"),s=document.getElementById("ldp-line-w-n"),o=document.getElementById("ldp-line-offset"),l=()=>{const h=Math.max(.1,Number(n?.value??1)||1),f=Number(o?.value??1)||1;L1(h,f);const p=Mn();p&&wn(p)};n?.addEventListener("input",()=>{s&&(s.value=Number(n.value).toFixed(1)),l()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),l()}),o?.addEventListener("input",l);const c=h=>h.closest(".ldp-line-group")?.classList.toggle("open");document.querySelectorAll(".ldp-chev-btn").forEach(h=>h.addEventListener("click",()=>c(h))),document.querySelectorAll(".ldp-group-label").forEach(h=>h.addEventListener("click",()=>c(h)));const u=()=>{if(!yt.bounds)return;const h=document.getElementById("ldp-line-status");h&&(h.textContent="Chargement des données…"),Q1(yt.bounds).then(()=>{h&&(h.textContent="")}).catch(()=>{h&&(h.textContent="Erreur de chargement.")})};document.querySelectorAll(".ldp-line-sub").forEach(h=>{h.addEventListener("change",()=>{mf(h.dataset.linecat,h.checked),h.checked&&u();const f=h.closest(".ldp-line-group"),p=f?.querySelector(".ldp-line-group-chk");if(p){const g=f.querySelectorAll(".ldp-line-sub");p.checked=Array.from(g).every(m=>m.checked),p.indeterminate=!p.checked&&Array.from(g).some(m=>m.checked)}})}),document.querySelectorAll(".ldp-line-group-chk").forEach(h=>{h.addEventListener("change",()=>{h.closest(".ldp-line-group")?.querySelectorAll(".ldp-line-sub").forEach(p=>{p.checked=h.checked,mf(p.dataset.linecat,h.checked)}),h.checked&&u()})})}if(["veg_dense","veg_low","wetland_lc","snow_lc","barren_lc"].includes(i)){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,s=document.getElementById("ldp-lc-offset"),o=document.getElementById("ldp-lc-offset-mm");s?.addEventListener("input",()=>{const c=Number(s.value??0);o&&(o.textContent=`( ${(c*n).toFixed(2)} mm )`),E1(i,c)}),document.querySelectorAll(".ldp-lc-group-chk").forEach(c=>{c.dataset.indeterminate&&(c.indeterminate=!0),c.addEventListener("change",()=>{c.closest(".ldp-lc-group")?.querySelectorAll(".ldp-lc-feat").forEach(f=>{f.checked=c.checked,uf(i,f.dataset.key,c.checked)});const h=Mn();h&&wn(h)})});const l=c=>c.closest(".ldp-lc-group")?.classList.toggle("open");document.querySelectorAll(".ldp-lc-group .ldp-chev-btn").forEach(c=>c.addEventListener("click",()=>l(c))),document.querySelectorAll(".ldp-lc-group .ldp-group-label").forEach(c=>c.addEventListener("click",()=>l(c))),document.querySelectorAll(".ldp-lc-feat").forEach(c=>{c.addEventListener("change",()=>{uf(i,c.dataset.key,c.checked);const u=c.closest(".ldp-lc-group"),h=u?.querySelector(".ldp-lc-group-chk");if(h){const p=Array.from(u.querySelectorAll(".ldp-lc-feat"));h.checked=p.every(g=>g.checked),h.indeterminate=!h.checked&&p.some(g=>g.checked)}const f=Mn();f&&wn(f)})})}if(i==="roads"){const n=(s,o)=>{const l=document.getElementById(s);l?.addEventListener("change",()=>{o(Number(l.value)),$c()})};n("ldp-road-h",b1),n("ldp-road-minw",w1),n("ldp-road-mult",M1),document.querySelectorAll(".ldp-style-btn").forEach(s=>{s.addEventListener("click",()=>{document.querySelectorAll(".ldp-style-btn").forEach(o=>o.classList.remove("active")),s.classList.add("active"),S1(s.dataset.style),$c()})})}if(i==="buildings"){const n=(s,o,l)=>{const c=document.getElementById(s),u=document.getElementById(s+"-val");c?.addEventListener("input",()=>{const h=Number(c.value);u&&(u.textContent=o(h)),l(h);const f=Mn();f&&wn(f)})};n("ldp-bld-hscale",s=>`${s.toFixed(2)}x`,_1),n("ldp-bld-szscale",s=>`${s.toFixed(2)}x`,v1),n("ldp-bld-minh",s=>`${s.toFixed(2)} mm`,y1),n("ldp-bld-minsz",s=>`${s.toFixed(2)} m²`,x1)}if(i==="water"){const n=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,s=document.getElementById("ldp-water-offset"),o=document.getElementById("ldp-water-offset-mm"),l=document.getElementById("ldp-water-hydro"),c=()=>{const u=Number(s?.value??-1),h=l?.checked??!1;o&&(o.textContent=`( ${(u*n).toFixed(2)} mm )`),F1(u,h);const f=Mn();f&&wn(f)};s?.addEventListener("input",c),l?.addEventListener("change",c),document.querySelectorAll(".ldp-water-feat").forEach(u=>{u.addEventListener("change",()=>{H1(u.dataset.key,u.checked);const h=Mn();h&&wn(h)})})}if(i==="waterways"){const n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,o=document.getElementById("ldp-ww-width"),l=document.getElementById("ldp-ww-width-n"),c=document.getElementById("ldp-ww-width-mm"),u=document.getElementById("ldp-ww-offset"),h=document.getElementById("ldp-ww-offset-mm"),f=()=>{const g=Math.max(.1,Number(l?.value??1)||1),m=Number(u?.value??-1);c&&(c.textContent=`( ${(g*n).toFixed(2)} mm )`),h&&(h.textContent=`( ${(m*s).toFixed(2)} mm )`),V1(g,m);const y=Mn();y&&wn(y)};o?.addEventListener("input",()=>{l&&(l.value=Number(o.value).toFixed(1)),f()}),l?.addEventListener("input",()=>{o&&(o.value=l.value),f()}),u?.addEventListener("input",f);const p=document.getElementById("ldp-ww-streams");p?.addEventListener("change",()=>{document.querySelectorAll('.ldp-ww-feat[data-key="streams_named"], .ldp-ww-feat[data-key="streams_unnamed"]').forEach(m=>{m.checked=p.checked,ff(m.dataset.key,p.checked)});const g=Mn();g&&wn(g)}),document.querySelectorAll(".ldp-ww-feat").forEach(g=>{g.id!=="ldp-ww-streams"&&g.addEventListener("change",()=>{if(ff(g.dataset.key,g.checked),(g.dataset.key==="streams_named"||g.dataset.key==="streams_unnamed")&&p){const y=document.querySelector('.ldp-ww-feat[data-key="streams_named"]')?.checked??!1,x=document.querySelector('.ldp-ww-feat[data-key="streams_unnamed"]')?.checked??!1;p.checked=y||x,p.indeterminate=y!==x}const m=Mn();m&&wn(m)})})}}function PM(){document.getElementById("ldp-new-type")?.addEventListener("change",i=>{const t=i.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",tm),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const i=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=i[(i.indexOf(t)+1)%i.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=me[e]??"#888"})}const bs=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{bs.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{bs.classList.add("hidden")});bs?.addEventListener("click",i=>{i.target===bs&&bs.classList.add("hidden")});const Ya=document.getElementById("ps-layer-h"),Ka=document.getElementById("ps-wall-w"),em=document.getElementById("ps-layer-h-val"),nm=document.getElementById("ps-wall-w-val");Ya?.addEventListener("input",()=>{em.textContent=Number(Ya.value).toFixed(2),Rr()});Ka?.addEventListener("input",()=>{nm.textContent=Number(Ka.value).toFixed(2),Rr()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{bs.classList.add("hidden"),Rr()});document.getElementById("ps-reset")?.addEventListener("click",()=>{Ya&&(Ya.value="0.20",em.textContent="0.20"),Ka&&(Ka.value="0.42",nm.textContent="0.42"),Rr()});function Eu(i){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=i?"block":"none"}let im=0,rm=0;document.getElementById("dims-canvas")?.addEventListener("pointerdown",i=>{im=i.clientX,rm=i.clientY});document.getElementById("dims-canvas")?.addEventListener("click",i=>{const t=i.clientX-im,e=i.clientY-rm;if(!(t*t+e*e>=25))if(Gp())P1(i.clientX,i.clientY)>=0&&(Eu(!1),ws());else{const n=I1(i.clientX,i.clientY);if(n>=0){Wp(n),ws();const o=Xc().find(l=>l.id===n);o&&sm(o)}else R1()}});document.addEventListener("keydown",i=>{i.key==="Escape"&&Gp()&&(Vp(),Eu(!1))});const RM={circle:"Rond",square:"Carré",diamond:"Losange",triangle:"Triangle",cross:"Croix",heart:"Cœur",star:"Étoile"},yf={circle:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>',square:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>',diamond:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>',triangle:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>',cross:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>',heart:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>',star:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'},IM='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>',DM='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>';function ws(){const i=document.getElementById("ldp-marker-list");if(!i)return;const t=Xc(),e=qc();if(!t.length){i.innerHTML='<div class="ldp-empty">Aucun marqueur placé</div>';return}i.innerHTML=t.map(n=>`
    <div class="ldp-marker-row${n.id===e?" selected":""}" data-marker-id="${n.id}">
      <svg class="ldp-marker-ico" viewBox="0 0 16 16">${yf[n.shape]??yf.circle}</svg>
      <span class="ldp-marker-lbl">${RM[n.shape]??n.shape}</span>
      <button class="cp-eye ldp-m-eye${n.visible?" active":""}" data-mid="${n.id}" title="Visibilité">${IM}</button>
      <button class="cp-del ldp-m-del" data-mid="${n.id}" title="Supprimer">${DM}</button>
    </div>`).join(""),i.querySelectorAll(".ldp-marker-row").forEach(n=>{n.addEventListener("click",s=>{if(s.target.closest(".cp-eye, .cp-del"))return;const o=Number(n.dataset.markerId);Wp(o),ws();const l=Xc().find(c=>c.id===o);l&&sm(l)})}),i.querySelectorAll(".ldp-m-eye").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const o=Number(n.dataset.mid),l=!n.classList.contains("active");D1(o,l),ws()})}),i.querySelectorAll(".ldp-m-del").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation(),k1(Number(n.dataset.mid)),ws()})})}function sm(i){document.querySelectorAll(".ldp-shape-btn").forEach(p=>p.classList.remove("active")),document.querySelector(`.ldp-shape-btn[data-shape="${i.shape}"]`)?.classList.add("active");const t=document.getElementById("ldp-marker-size"),e=document.getElementById("ldp-marker-size-n");t&&(t.value=String(i.diameterMult)),e&&(e.value=String(i.diameterMult));const n=document.getElementById("ldp-marker-rot"),s=document.getElementById("ldp-marker-rot-n");n&&(n.value=String(i.rotDeg)),s&&(s.value=String(i.rotDeg));const o=document.getElementById("ldp-marker-flat");o&&(o.checked=i.flatTop);const l=document.getElementById("ldp-marker-offset");l&&(l.value=String(i.heightOffMult));const c=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,u=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,h=document.getElementById("ldp-marker-mm"),f=document.getElementById("ldp-offset-mm");h&&(h.textContent=`( ${(i.diameterMult*c).toFixed(2)} mm )`),f&&(f.textContent=`( ${(i.heightOffMult*u).toFixed(2)} mm )`)}document.querySelectorAll(".cp-del:not(.ldp-m-del)").forEach(i=>{i.addEventListener("click",t=>{t.stopPropagation();const e=i.closest(".cp-layer");if(!e)return;const n=e.dataset.layer;n&&Hp(n,!1),e.remove()})});
