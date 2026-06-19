(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function am(){document.getElementById("app").innerHTML=`

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
    <button class="tab-btn" data-tab="render" id="tab-render-btn" disabled>
      <span class="tab-num">4</span>
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

            <div class="cp-layer cp-layer-nav" data-layer="water" data-type="land_cover">
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

            <div class="cp-layer cp-layer-nav" data-layer="waterways" data-type="land_cover">
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

            <div class="cp-layer cp-layer-nav" data-layer="veg_dense" data-type="land_cover">
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

            <div class="cp-layer cp-layer-nav" data-layer="veg_low" data-type="land_cover">
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

            <div class="cp-layer cp-layer-nav" data-layer="snow" data-type="land_cover">
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

            <div class="cp-layer cp-layer-nav" data-layer="terrain" data-type="land_cover">
              <span class="cp-drag">⠿</span>
              <div class="cp-sw-mini" data-slot="1" style="background:#c0af88">1</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="1,13 6,5 10,9 13,4 15,13"/></svg>
              <span class="cp-layer-name">Terrain nu</span>
              <button class="cp-eye active" data-layer="terrain" title="Visibilité">
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
        <button class="btn-next" id="btn-next-render">
          Générer
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
`}function Mi(r,t,e){const n=u=>document.getElementById(u),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${r}%`);const c=n("pp");c&&(c.textContent=`${Math.round(r)}%`)}function ol(r){const t=document.getElementById("prog");t&&(t.style.display=r?"flex":"none")}function Kl(r,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=r,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function hr(r){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===r)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${r}`))}window.ts=r=>{document.getElementById(`sb-${r}`)?.classList.toggle("h"),document.getElementById(`ca-${r}`)?.classList.toggle("o")};window.ev=r=>{r.stopPropagation()};var zs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Pd(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Jl={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(r,t){(function(e,n){n(t)})(zs,function(e){var n="1.9.4";function s(i){var a,h,b,T;for(h=1,b=arguments.length;h<b;h++){T=arguments[h];for(a in T)i[a]=T[a]}return i}var o=Object.create||function(){function i(){}return function(a){return i.prototype=a,new i}}();function l(i,a){var h=Array.prototype.slice;if(i.bind)return i.bind.apply(i,h.call(arguments,1));var b=h.call(arguments,2);return function(){return i.apply(a,b.length?b.concat(h.call(arguments)):arguments)}}var c=0;function u(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,a,h){var b,T,z,Y;return Y=function(){b=!1,T&&(z.apply(h,T),T=!1)},z=function(){b?T=arguments:(i.apply(h,arguments),setTimeout(Y,a),b=!0)},z}function f(i,a,h){var b=a[1],T=a[0],z=b-T;return i===b&&h?i:((i-T)%z+z)%z+T}function p(){return!1}function _(i,a){if(a===!1)return i;var h=Math.pow(10,a===void 0?6:a);return Math.round(i*h)/h}function m(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function x(i){return m(i).split(/\s+/)}function y(i,a){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?o(i.options):{});for(var h in a)i.options[h]=a[h];return i.options}function g(i,a,h){var b=[];for(var T in i)b.push(encodeURIComponent(h?T.toUpperCase():T)+"="+encodeURIComponent(i[T]));return(!a||a.indexOf("?")===-1?"?":"&")+b.join("&")}var v=/\{ *([\w_ -]+) *\}/g;function S(i,a){return i.replace(v,function(h,b){var T=a[b];if(T===void 0)throw new Error("No value provided for variable "+h);return typeof T=="function"&&(T=T(a)),T})}var w=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function P(i,a){for(var h=0;h<i.length;h++)if(i[h]===a)return h;return-1}var N="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function O(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var k=0;function H(i){var a=+new Date,h=Math.max(0,16-(a-k));return k=a+h,window.setTimeout(i,h)}var I=window.requestAnimationFrame||O("RequestAnimationFrame")||H,R=window.cancelAnimationFrame||O("CancelAnimationFrame")||O("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function W(i,a,h){if(h&&I===H)i.call(a);else return I.call(window,l(i,a))}function U(i){i&&R.call(window,i)}var F={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:u,throttle:d,wrapNum:f,falseFn:p,formatNum:_,trim:m,splitWords:x,setOptions:y,getParamString:g,template:S,isArray:w,indexOf:P,emptyImageUrl:N,requestFn:I,cancelFn:R,requestAnimFrame:W,cancelAnimFrame:U};function C(){}C.extend=function(i){var a=function(){y(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},h=a.__super__=this.prototype,b=o(h);b.constructor=a,a.prototype=b;for(var T in this)Object.prototype.hasOwnProperty.call(this,T)&&T!=="prototype"&&T!=="__super__"&&(a[T]=this[T]);return i.statics&&s(a,i.statics),i.includes&&(Z(i.includes),s.apply(null,[b].concat(i.includes))),s(b,i),delete b.statics,delete b.includes,b.options&&(b.options=h.options?o(h.options):{},s(b.options,i.options)),b._initHooks=[],b.callInitHooks=function(){if(!this._initHooksCalled){h.callInitHooks&&h.callInitHooks.call(this),this._initHooksCalled=!0;for(var z=0,Y=b._initHooks.length;z<Y;z++)b._initHooks[z].call(this)}},a},C.include=function(i){var a=this.prototype.options;return s(this.prototype,i),i.options&&(this.prototype.options=a,this.mergeOptions(i.options)),this},C.mergeOptions=function(i){return s(this.prototype.options,i),this},C.addInitHook=function(i){var a=Array.prototype.slice.call(arguments,1),h=typeof i=="function"?i:function(){this[i].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(h),this};function Z(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=w(i)?i:[i];for(var a=0;a<i.length;a++)i[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var nt={on:function(i,a,h){if(typeof i=="object")for(var b in i)this._on(b,i[b],a);else{i=x(i);for(var T=0,z=i.length;T<z;T++)this._on(i[T],a,h)}return this},off:function(i,a,h){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var b in i)this._off(b,i[b],a);else{i=x(i);for(var T=arguments.length===1,z=0,Y=i.length;z<Y;z++)T?this._off(i[z]):this._off(i[z],a,h)}return this},_on:function(i,a,h,b){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(i,a,h)===!1){h===this&&(h=void 0);var T={fn:a,ctx:h};b&&(T.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(T)}},_off:function(i,a,h){var b,T,z;if(this._events&&(b=this._events[i],!!b)){if(arguments.length===1){if(this._firingCount)for(T=0,z=b.length;T<z;T++)b[T].fn=p;delete this._events[i];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var Y=this._listens(i,a,h);if(Y!==!1){var ut=b[Y];this._firingCount&&(ut.fn=p,this._events[i]=b=b.slice()),b.splice(Y,1)}}},fire:function(i,a,h){if(!this.listens(i,h))return this;var b=s({},a,{type:i,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var T=this._events[i];if(T){this._firingCount=this._firingCount+1||1;for(var z=0,Y=T.length;z<Y;z++){var ut=T[z],mt=ut.fn;ut.once&&this.off(i,mt,ut.ctx),mt.call(ut.ctx||this,b)}this._firingCount--}}return h&&this._propagateEvent(b),this},listens:function(i,a,h,b){typeof i!="string"&&console.warn('"string" type argument expected');var T=a;typeof a!="function"&&(b=!!a,T=void 0,h=void 0);var z=this._events&&this._events[i];if(z&&z.length&&this._listens(i,T,h)!==!1)return!0;if(b){for(var Y in this._eventParents)if(this._eventParents[Y].listens(i,a,h,b))return!0}return!1},_listens:function(i,a,h){if(!this._events)return!1;var b=this._events[i]||[];if(!a)return!!b.length;h===this&&(h=void 0);for(var T=0,z=b.length;T<z;T++)if(b[T].fn===a&&b[T].ctx===h)return T;return!1},once:function(i,a,h){if(typeof i=="object")for(var b in i)this._on(b,i[b],a,!0);else{i=x(i);for(var T=0,z=i.length;T<z;T++)this._on(i[T],a,h,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[u(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[u(i)],this},_propagateEvent:function(i){for(var a in this._eventParents)this._eventParents[a].fire(i.type,s({layer:i.target,propagatedFrom:i.target},i),!0)}};nt.addEventListener=nt.on,nt.removeEventListener=nt.clearAllEventListeners=nt.off,nt.addOneTimeEventListener=nt.once,nt.fireEvent=nt.fire,nt.hasEventListeners=nt.listens;var rt=C.extend(nt);function j(i,a,h){this.x=h?Math.round(i):i,this.y=h?Math.round(a):a}var st=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};j.prototype={clone:function(){return new j(this.x,this.y)},add:function(i){return this.clone()._add(at(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(at(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new j(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new j(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=st(this.x),this.y=st(this.y),this},distanceTo:function(i){i=at(i);var a=i.x-this.x,h=i.y-this.y;return Math.sqrt(a*a+h*h)},equals:function(i){return i=at(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=at(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+_(this.x)+", "+_(this.y)+")"}};function at(i,a,h){return i instanceof j?i:w(i)?new j(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new j(i.x,i.y):new j(i,a,h)}function q(i,a){if(i)for(var h=a?[i,a]:i,b=0,T=h.length;b<T;b++)this.extend(h[b])}q.prototype={extend:function(i){var a,h;if(!i)return this;if(i instanceof j||typeof i[0]=="number"||"x"in i)a=h=at(i);else if(i=tt(i),a=i.min,h=i.max,!a||!h)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=h.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(h.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(h.y,this.max.y)),this},getCenter:function(i){return at((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return at(this.min.x,this.max.y)},getTopRight:function(){return at(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var a,h;return typeof i[0]=="number"||i instanceof j?i=at(i):i=tt(i),i instanceof q?(a=i.min,h=i.max):a=h=i,a.x>=this.min.x&&h.x<=this.max.x&&a.y>=this.min.y&&h.y<=this.max.y},intersects:function(i){i=tt(i);var a=this.min,h=this.max,b=i.min,T=i.max,z=T.x>=a.x&&b.x<=h.x,Y=T.y>=a.y&&b.y<=h.y;return z&&Y},overlaps:function(i){i=tt(i);var a=this.min,h=this.max,b=i.min,T=i.max,z=T.x>a.x&&b.x<h.x,Y=T.y>a.y&&b.y<h.y;return z&&Y},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var a=this.min,h=this.max,b=Math.abs(a.x-h.x)*i,T=Math.abs(a.y-h.y)*i;return tt(at(a.x-b,a.y-T),at(h.x+b,h.y+T))},equals:function(i){return i?(i=tt(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function tt(i,a){return!i||i instanceof q?i:new q(i,a)}function Ct(i,a){if(i)for(var h=a?[i,a]:i,b=0,T=h.length;b<T;b++)this.extend(h[b])}Ct.prototype={extend:function(i){var a=this._southWest,h=this._northEast,b,T;if(i instanceof it)b=i,T=i;else if(i instanceof Ct){if(b=i._southWest,T=i._northEast,!b||!T)return this}else return i?this.extend(wt(i)||Q(i)):this;return!a&&!h?(this._southWest=new it(b.lat,b.lng),this._northEast=new it(T.lat,T.lng)):(a.lat=Math.min(b.lat,a.lat),a.lng=Math.min(b.lng,a.lng),h.lat=Math.max(T.lat,h.lat),h.lng=Math.max(T.lng,h.lng)),this},pad:function(i){var a=this._southWest,h=this._northEast,b=Math.abs(a.lat-h.lat)*i,T=Math.abs(a.lng-h.lng)*i;return new Ct(new it(a.lat-b,a.lng-T),new it(h.lat+b,h.lng+T))},getCenter:function(){return new it((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new it(this.getNorth(),this.getWest())},getSouthEast:function(){return new it(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof it||"lat"in i?i=wt(i):i=Q(i);var a=this._southWest,h=this._northEast,b,T;return i instanceof Ct?(b=i.getSouthWest(),T=i.getNorthEast()):b=T=i,b.lat>=a.lat&&T.lat<=h.lat&&b.lng>=a.lng&&T.lng<=h.lng},intersects:function(i){i=Q(i);var a=this._southWest,h=this._northEast,b=i.getSouthWest(),T=i.getNorthEast(),z=T.lat>=a.lat&&b.lat<=h.lat,Y=T.lng>=a.lng&&b.lng<=h.lng;return z&&Y},overlaps:function(i){i=Q(i);var a=this._southWest,h=this._northEast,b=i.getSouthWest(),T=i.getNorthEast(),z=T.lat>a.lat&&b.lat<h.lat,Y=T.lng>a.lng&&b.lng<h.lng;return z&&Y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,a){return i?(i=Q(i),this._southWest.equals(i.getSouthWest(),a)&&this._northEast.equals(i.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function Q(i,a){return i instanceof Ct?i:new Ct(i,a)}function it(i,a,h){if(isNaN(i)||isNaN(a))throw new Error("Invalid LatLng object: ("+i+", "+a+")");this.lat=+i,this.lng=+a,h!==void 0&&(this.alt=+h)}it.prototype={equals:function(i,a){if(!i)return!1;i=wt(i);var h=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return h<=(a===void 0?1e-9:a)},toString:function(i){return"LatLng("+_(this.lat,i)+", "+_(this.lng,i)+")"},distanceTo:function(i){return Pt.distance(this,wt(i))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(i){var a=180*i/40075017,h=a/Math.cos(Math.PI/180*this.lat);return Q([this.lat-a,this.lng-h],[this.lat+a,this.lng+h])},clone:function(){return new it(this.lat,this.lng,this.alt)}};function wt(i,a,h){return i instanceof it?i:w(i)&&typeof i[0]!="object"?i.length===3?new it(i[0],i[1],i[2]):i.length===2?new it(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new it(i.lat,"lng"in i?i.lng:i.lon,i.alt):a===void 0?null:new it(i,a,h)}var St={latLngToPoint:function(i,a){var h=this.projection.project(i),b=this.scale(a);return this.transformation._transform(h,b)},pointToLatLng:function(i,a){var h=this.scale(a),b=this.transformation.untransform(i,h);return this.projection.unproject(b)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var a=this.projection.bounds,h=this.scale(i),b=this.transformation.transform(a.min,h),T=this.transformation.transform(a.max,h);return new q(b,T)},infinite:!1,wrapLatLng:function(i){var a=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,h=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,b=i.alt;return new it(h,a,b)},wrapLatLngBounds:function(i){var a=i.getCenter(),h=this.wrapLatLng(a),b=a.lat-h.lat,T=a.lng-h.lng;if(b===0&&T===0)return i;var z=i.getSouthWest(),Y=i.getNorthEast(),ut=new it(z.lat-b,z.lng-T),mt=new it(Y.lat-b,Y.lng-T);return new Ct(ut,mt)}},Pt=s({},St,{wrapLng:[-180,180],R:6371e3,distance:function(i,a){var h=Math.PI/180,b=i.lat*h,T=a.lat*h,z=Math.sin((a.lat-i.lat)*h/2),Y=Math.sin((a.lng-i.lng)*h/2),ut=z*z+Math.cos(b)*Math.cos(T)*Y*Y,mt=2*Math.atan2(Math.sqrt(ut),Math.sqrt(1-ut));return this.R*mt}}),It=6378137,Ut={R:It,MAX_LATITUDE:85.0511287798,project:function(i){var a=Math.PI/180,h=this.MAX_LATITUDE,b=Math.max(Math.min(h,i.lat),-h),T=Math.sin(b*a);return new j(this.R*i.lng*a,this.R*Math.log((1+T)/(1-T))/2)},unproject:function(i){var a=180/Math.PI;return new it((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*a,i.x*a/this.R)},bounds:function(){var i=It*Math.PI;return new q([-i,-i],[i,i])}()};function ot(i,a,h,b){if(w(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=a,this._c=h,this._d=b}ot.prototype={transform:function(i,a){return this._transform(i.clone(),a)},_transform:function(i,a){return a=a||1,i.x=a*(this._a*i.x+this._b),i.y=a*(this._c*i.y+this._d),i},untransform:function(i,a){return a=a||1,new j((i.x/a-this._b)/this._a,(i.y/a-this._d)/this._c)}};function xt(i,a,h,b){return new ot(i,a,h,b)}var bt=s({},Pt,{code:"EPSG:3857",projection:Ut,transformation:function(){var i=.5/(Math.PI*Ut.R);return xt(i,.5,-i,.5)}()}),E=s({},bt,{code:"EPSG:900913"});function et(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function $(i,a){var h="",b,T,z,Y,ut,mt;for(b=0,z=i.length;b<z;b++){for(ut=i[b],T=0,Y=ut.length;T<Y;T++)mt=ut[T],h+=(T?"L":"M")+mt.x+" "+mt.y;h+=a?Wt.svg?"z":"x":""}return h||"M0 0"}var A=document.documentElement.style,M="ActiveXObject"in window,B=M&&!document.addEventListener,X="msLaunchUri"in navigator&&!("documentMode"in document),K=Ge("webkit"),G=Ge("android"),ft=Ge("android 2")||Ge("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=G&&Ge("Google")&&lt<537&&!("AudioNode"in window),Tt=!!window.opera,Et=!X&&Ge("chrome"),At=Ge("gecko")&&!K&&!Tt&&!M,Ht=!Et&&Ge("safari"),zt=Ge("phantom"),Dt="OTransition"in A,Kt=navigator.platform.indexOf("Win")===0,Vt=M&&"transition"in A,oe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,ae="MozPerspective"in A,te=!window.L_DISABLE_3D&&(Vt||oe||ae)&&!Dt&&!zt,Ft=typeof orientation<"u"||Ge("mobile"),D=Ft&&K,ht=Ft&&oe,Mt=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||Mt),Nt="ontouchstart"in window||!!window.TouchEvent,re=!window.L_NO_TOUCH&&(Nt||Rt),ue=Ft&&Tt,ve=Ft&&At,ke=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,me=function(){var i=!1;try{var a=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",p,a),window.removeEventListener("testPassiveEventSupport",p,a)}catch{}return i}(),Ce=function(){return!!document.createElement("canvas").getContext}(),Ee=!!(document.createElementNS&&et("svg").createSVGRect),sn=!!Ee&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),mn=!Ee&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var a=i.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),jn=navigator.platform.indexOf("Mac")===0,yi=navigator.platform.indexOf("Linux")===0;function Ge(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Wt={ie:M,ielt9:B,edge:X,webkit:K,android:G,android23:ft,androidStock:pt,opera:Tt,chrome:Et,gecko:At,safari:Ht,phantom:zt,opera12:Dt,win:Kt,ie3d:Vt,webkit3d:oe,gecko3d:ae,any3d:te,mobile:Ft,mobileWebkit:D,mobileWebkit3d:ht,msPointer:Mt,pointer:Rt,touch:re,touchNative:Nt,mobileOpera:ue,mobileGecko:ve,retina:ke,passiveEvents:me,canvas:Ce,svg:Ee,vml:mn,inlineSvg:sn,mac:jn,linux:yi},Fi=Wt.msPointer?"MSPointerDown":"pointerdown",ms=Wt.msPointer?"MSPointerMove":"pointermove",gs=Wt.msPointer?"MSPointerUp":"pointerup",lo=Wt.msPointer?"MSPointerCancel":"pointercancel",_s={touchstart:Fi,touchmove:ms,touchend:gs,touchcancel:lo},co={touchstart:ee,touchmove:jt,touchend:jt,touchcancel:jt},V={},ct=!1;function gt(i,a,h){return a==="touchstart"&&qt(),co[a]?(h=co[a].bind(this,h),i.addEventListener(_s[a],h,!1),h):(console.warn("wrong event specified:",a),p)}function _t(i,a,h){if(!_s[a]){console.warn("wrong event specified:",a);return}i.removeEventListener(_s[a],h,!1)}function dt(i){V[i.pointerId]=i}function kt(i){V[i.pointerId]&&(V[i.pointerId]=i)}function Zt(i){delete V[i.pointerId]}function qt(){ct||(document.addEventListener(Fi,dt,!0),document.addEventListener(ms,kt,!0),document.addEventListener(gs,Zt,!0),document.addEventListener(lo,Zt,!0),ct=!0)}function jt(i,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var h in V)a.touches.push(V[h]);a.changedTouches=[a],i(a)}}function ee(i,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&$e(a),jt(i,a)}function Jt(i){var a={},h,b;for(b in i)h=i[b],a[b]=h&&h.bind?h.bind(i):h;return i=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var ne=200;function Ae(i,a){i.addEventListener("dblclick",a);var h=0,b;function T(z){if(z.detail!==1){b=z.detail;return}if(!(z.pointerType==="mouse"||z.sourceCapabilities&&!z.sourceCapabilities.firesTouchEvents)){var Y=Gc(z);if(!(Y.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!Y.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ut=Date.now();ut-h<=ne?(b++,b===2&&a(Jt(z))):b=1,h=ut}}}return i.addEventListener("click",T),{dblclick:a,simDblclick:T}}function on(i,a){i.removeEventListener("dblclick",a.dblclick),i.removeEventListener("click",a.simDblclick)}var Pe=ho(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),an=ho(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ye=an==="webkitTransition"||an==="OTransition"?an+"End":"transitionend";function ie(i){return typeof i=="string"?document.getElementById(i):i}function ri(i,a){var h=i.style[a]||i.currentStyle&&i.currentStyle[a];if((!h||h==="auto")&&document.defaultView){var b=document.defaultView.getComputedStyle(i,null);h=b?b[a]:null}return h==="auto"?null:h}function Xt(i,a,h){var b=document.createElement(i);return b.className=a||"",h&&h.appendChild(b),b}function fe(i){var a=i.parentNode;a&&a.removeChild(i)}function Hi(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Cn(i){var a=i.parentNode;a&&a.lastChild!==i&&a.appendChild(i)}function Yn(i){var a=i.parentNode;a&&a.firstChild!==i&&a.insertBefore(i,a.firstChild)}function Ue(i,a){if(i.classList!==void 0)return i.classList.contains(a);var h=xi(i);return h.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(h)}function Yt(i,a){if(i.classList!==void 0)for(var h=x(a),b=0,T=h.length;b<T;b++)i.classList.add(h[b]);else if(!Ue(i,a)){var z=xi(i);tn(i,(z?z+" ":"")+a)}}function be(i,a){i.classList!==void 0?i.classList.remove(a):tn(i,m((" "+xi(i)+" ").replace(" "+a+" "," ")))}function tn(i,a){i.className.baseVal===void 0?i.className=a:i.className.baseVal=a}function xi(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function gn(i,a){"opacity"in i.style?i.style.opacity=a:"filter"in i.style&&uo(i,a)}function uo(i,a){var h=!1,b="DXImageTransform.Microsoft.Alpha";try{h=i.filters.item(b)}catch{if(a===1)return}a=Math.round(a*100),h?(h.Enabled=a!==100,h.Opacity=a):i.style.filter+=" progid:"+b+"(opacity="+a+")"}function ho(i){for(var a=document.documentElement.style,h=0;h<i.length;h++)if(i[h]in a)return i[h];return!1}function Vi(i,a,h){var b=a||new j(0,0);i.style[Pe]=(Wt.ie3d?"translate("+b.x+"px,"+b.y+"px)":"translate3d("+b.x+"px,"+b.y+"px,0)")+(h?" scale("+h+")":"")}function ze(i,a){i._leaflet_pos=a,Wt.any3d?Vi(i,a):(i.style.left=a.x+"px",i.style.top=a.y+"px")}function Gi(i){return i._leaflet_pos||new j(0,0)}var vs,ys,za;if("onselectstart"in document)vs=function(){se(window,"selectstart",$e)},ys=function(){xe(window,"selectstart",$e)};else{var xs=ho(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);vs=function(){if(xs){var i=document.documentElement.style;za=i[xs],i[xs]="none"}},ys=function(){xs&&(document.documentElement.style[xs]=za,za=void 0)}}function Ba(){se(window,"dragstart",$e)}function Fa(){xe(window,"dragstart",$e)}var fo,Ha;function Va(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(po(),fo=i,Ha=i.style.outlineStyle,i.style.outlineStyle="none",se(window,"keydown",po))}function po(){fo&&(fo.style.outlineStyle=Ha,fo=void 0,Ha=void 0,xe(window,"keydown",po))}function Hc(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function Ga(i){var a=i.getBoundingClientRect();return{x:a.width/i.offsetWidth||1,y:a.height/i.offsetHeight||1,boundingClientRect:a}}var fp={__proto__:null,TRANSFORM:Pe,TRANSITION:an,TRANSITION_END:ye,get:ie,getStyle:ri,create:Xt,remove:fe,empty:Hi,toFront:Cn,toBack:Yn,hasClass:Ue,addClass:Yt,removeClass:be,setClass:tn,getClass:xi,setOpacity:gn,testProp:ho,setTransform:Vi,setPosition:ze,getPosition:Gi,get disableTextSelection(){return vs},get enableTextSelection(){return ys},disableImageDrag:Ba,enableImageDrag:Fa,preventOutline:Va,restoreOutline:po,getSizedParentNode:Hc,getScale:Ga};function se(i,a,h,b){if(a&&typeof a=="object")for(var T in a)Za(i,T,a[T],h);else{a=x(a);for(var z=0,Y=a.length;z<Y;z++)Za(i,a[z],h,b)}return this}var $n="_leaflet_events";function xe(i,a,h,b){if(arguments.length===1)Vc(i),delete i[$n];else if(a&&typeof a=="object")for(var T in a)Xa(i,T,a[T],h);else if(a=x(a),arguments.length===2)Vc(i,function(ut){return P(a,ut)!==-1});else for(var z=0,Y=a.length;z<Y;z++)Xa(i,a[z],h,b);return this}function Vc(i,a){for(var h in i[$n]){var b=h.split(/\d/)[0];(!a||a(b))&&Xa(i,b,null,null,h)}}var Wa={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Za(i,a,h,b){var T=a+u(h)+(b?"_"+u(b):"");if(i[$n]&&i[$n][T])return this;var z=function(ut){return h.call(b||i,ut||window.event)},Y=z;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?z=gt(i,a,z):Wt.touch&&a==="dblclick"?z=Ae(i,z):"addEventListener"in i?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?i.addEventListener(Wa[a]||a,z,Wt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(z=function(ut){ut=ut||window.event,ja(i,ut)&&Y(ut)},i.addEventListener(Wa[a],z,!1)):i.addEventListener(a,Y,!1):i.attachEvent("on"+a,z),i[$n]=i[$n]||{},i[$n][T]=z}function Xa(i,a,h,b,T){T=T||a+u(h)+(b?"_"+u(b):"");var z=i[$n]&&i[$n][T];if(!z)return this;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?_t(i,a,z):Wt.touch&&a==="dblclick"?on(i,z):"removeEventListener"in i?i.removeEventListener(Wa[a]||a,z,!1):i.detachEvent("on"+a,z),i[$n][T]=null}function Wi(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function qa(i){return Za(i,"wheel",Wi),this}function bs(i){return se(i,"mousedown touchstart dblclick contextmenu",Wi),i._leaflet_disable_click=!0,this}function $e(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function Zi(i){return $e(i),Wi(i),this}function Gc(i){if(i.composedPath)return i.composedPath();for(var a=[],h=i.target;h;)a.push(h),h=h.parentNode;return a}function Wc(i,a){if(!a)return new j(i.clientX,i.clientY);var h=Ga(a),b=h.boundingClientRect;return new j((i.clientX-b.left)/h.x-a.clientLeft,(i.clientY-b.top)/h.y-a.clientTop)}var pp=Wt.linux&&Wt.chrome?window.devicePixelRatio:Wt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Zc(i){return Wt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/pp:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function ja(i,a){var h=a.relatedTarget;if(!h)return!0;try{for(;h&&h!==i;)h=h.parentNode}catch{return!1}return h!==i}var mp={__proto__:null,on:se,off:xe,stopPropagation:Wi,disableScrollPropagation:qa,disableClickPropagation:bs,preventDefault:$e,stop:Zi,getPropagationPath:Gc,getMousePosition:Wc,getWheelDelta:Zc,isExternalTarget:ja,addListener:se,removeListener:xe},Xc=rt.extend({run:function(i,a,h,b){this.stop(),this._el=i,this._inProgress=!0,this._duration=h||.25,this._easeOutPower=1/Math.max(b||.5,.2),this._startPos=Gi(i),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=W(this._animate,this),this._step()},_step:function(i){var a=+new Date-this._startTime,h=this._duration*1e3;a<h?this._runFrame(this._easeOut(a/h),i):(this._runFrame(1),this._complete())},_runFrame:function(i,a){var h=this._startPos.add(this._offset.multiplyBy(i));a&&h._round(),ze(this._el,h),this.fire("step")},_complete:function(){U(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),de=rt.extend({options:{crs:bt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,a){a=y(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(wt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=an&&Wt.any3d&&!Wt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),se(this._proxy,ye,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,a,h){if(a=a===void 0?this._zoom:this._limitZoom(a),i=this._limitCenter(wt(i),a,this.options.maxBounds),h=h||{},this._stop(),this._loaded&&!h.reset&&h!==!0){h.animate!==void 0&&(h.zoom=s({animate:h.animate},h.zoom),h.pan=s({animate:h.animate,duration:h.duration},h.pan));var b=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,a,h.zoom):this._tryAnimatedPan(i,h.pan);if(b)return clearTimeout(this._sizeTimer),this}return this._resetView(i,a,h.pan&&h.pan.noMoveStart),this},setZoom:function(i,a){return this._loaded?this.setView(this.getCenter(),i,{zoom:a}):(this._zoom=i,this)},zoomIn:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,a)},zoomOut:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,a)},setZoomAround:function(i,a,h){var b=this.getZoomScale(a),T=this.getSize().divideBy(2),z=i instanceof j?i:this.latLngToContainerPoint(i),Y=z.subtract(T).multiplyBy(1-1/b),ut=this.containerPointToLatLng(T.add(Y));return this.setView(ut,a,{zoom:h})},_getBoundsCenterZoom:function(i,a){a=a||{},i=i.getBounds?i.getBounds():Q(i);var h=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),T=this.getBoundsZoom(i,!1,h.add(b));if(T=typeof a.maxZoom=="number"?Math.min(a.maxZoom,T):T,T===1/0)return{center:i.getCenter(),zoom:T};var z=b.subtract(h).divideBy(2),Y=this.project(i.getSouthWest(),T),ut=this.project(i.getNorthEast(),T),mt=this.unproject(Y.add(ut).divideBy(2).add(z),T);return{center:mt,zoom:T}},fitBounds:function(i,a){if(i=Q(i),!i.isValid())throw new Error("Bounds are not valid.");var h=this._getBoundsCenterZoom(i,a);return this.setView(h.center,h.zoom,a)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,a){return this.setView(i,this._zoom,{pan:a})},panBy:function(i,a){if(i=at(i).round(),a=a||{},!i.x&&!i.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Xc,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){Yt(this._mapPane,"leaflet-pan-anim");var h=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,h,a.duration||.25,a.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,a,h){if(h=h||{},h.animate===!1||!Wt.any3d)return this.setView(i,a,h);this._stop();var b=this.project(this.getCenter()),T=this.project(i),z=this.getSize(),Y=this._zoom;i=wt(i),a=a===void 0?Y:a;var ut=Math.max(z.x,z.y),mt=ut*this.getZoomScale(Y,a),Lt=T.distanceTo(b)||1,Bt=1.42,$t=Bt*Bt;function he(Be){var To=Be?-1:1,im=Be?mt:ut,rm=mt*mt-ut*ut+To*$t*$t*Lt*Lt,sm=2*im*$t*Lt,sl=rm/sm,Tu=Math.sqrt(sl*sl+1)-sl,om=Tu<1e-9?-18:Math.log(Tu);return om}function ln(Be){return(Math.exp(Be)-Math.exp(-Be))/2}function We(Be){return(Math.exp(Be)+Math.exp(-Be))/2}function Rn(Be){return ln(Be)/We(Be)}var _n=he(0);function br(Be){return ut*(We(_n)/We(_n+Bt*Be))}function Qp(Be){return ut*(We(_n)*Rn(_n+Bt*Be)-ln(_n))/$t}function tm(Be){return 1-Math.pow(1-Be,1.5)}var em=Date.now(),Su=(he(1)-_n)/Bt,nm=h.duration?1e3*h.duration:1e3*Su*.8;function Eu(){var Be=(Date.now()-em)/nm,To=tm(Be)*Su;Be<=1?(this._flyToFrame=W(Eu,this),this._move(this.unproject(b.add(T.subtract(b).multiplyBy(Qp(To)/Lt)),Y),this.getScaleZoom(ut/br(To),Y),{flyTo:!0})):this._move(i,a)._moveEnd(!0)}return this._moveStart(!0,h.noMoveStart),Eu.call(this),this},flyToBounds:function(i,a){var h=this._getBoundsCenterZoom(i,a);return this.flyTo(h.center,h.zoom,a)},setMaxBounds:function(i){return i=Q(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var a=this.options.minZoom;return this.options.minZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var a=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,a){this._enforcingBounds=!0;var h=this.getCenter(),b=this._limitCenter(h,this._zoom,Q(i));return h.equals(b)||this.panTo(b,a),this._enforcingBounds=!1,this},panInside:function(i,a){a=a||{};var h=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),T=this.project(this.getCenter()),z=this.project(i),Y=this.getPixelBounds(),ut=tt([Y.min.add(h),Y.max.subtract(b)]),mt=ut.getSize();if(!ut.contains(z)){this._enforcingBounds=!0;var Lt=z.subtract(ut.getCenter()),Bt=ut.extend(z).getSize().subtract(mt);T.x+=Lt.x<0?-Bt.x:Bt.x,T.y+=Lt.y<0?-Bt.y:Bt.y,this.panTo(this.unproject(T),a),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=s({animate:!1,pan:!0},i===!0?{animate:!0}:i);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var h=this.getSize(),b=a.divideBy(2).round(),T=h.divideBy(2).round(),z=b.subtract(T);return!z.x&&!z.y?this:(i.animate&&i.pan?this.panBy(z):(i.pan&&this._rawPanBy(z),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:h}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=s({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),h=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,h,i):navigator.geolocation.getCurrentPosition(a,h,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var a=i.code,h=i.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+h+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var a=i.coords.latitude,h=i.coords.longitude,b=new it(a,h),T=b.toBounds(i.coords.accuracy*2),z=this._locateOptions;if(z.setView){var Y=this.getBoundsZoom(T);this.setView(b,z.maxZoom?Math.min(Y,z.maxZoom):Y)}var ut={latlng:b,bounds:T,timestamp:i.timestamp};for(var mt in i.coords)typeof i.coords[mt]=="number"&&(ut[mt]=i.coords[mt]);this.fire("locationfound",ut)}},addHandler:function(i,a){if(!a)return this;var h=this[i]=new a(this);return this._handlers.push(h),this.options[i]&&h.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),fe(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(U(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)fe(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,a){var h="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),b=Xt("div",h,a||this._mapPane);return i&&(this._panes[i]=b),b},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),a=this.unproject(i.getBottomLeft()),h=this.unproject(i.getTopRight());return new Ct(a,h)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,a,h){i=Q(i),h=at(h||[0,0]);var b=this.getZoom()||0,T=this.getMinZoom(),z=this.getMaxZoom(),Y=i.getNorthWest(),ut=i.getSouthEast(),mt=this.getSize().subtract(h),Lt=tt(this.project(ut,b),this.project(Y,b)).getSize(),Bt=Wt.any3d?this.options.zoomSnap:1,$t=mt.x/Lt.x,he=mt.y/Lt.y,ln=a?Math.max($t,he):Math.min($t,he);return b=this.getScaleZoom(ln,b),Bt&&(b=Math.round(b/(Bt/100))*(Bt/100),b=a?Math.ceil(b/Bt)*Bt:Math.floor(b/Bt)*Bt),Math.max(T,Math.min(z,b))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new j(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,a){var h=this._getTopLeftPoint(i,a);return new q(h,h.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,a){var h=this.options.crs;return a=a===void 0?this._zoom:a,h.scale(i)/h.scale(a)},getScaleZoom:function(i,a){var h=this.options.crs;a=a===void 0?this._zoom:a;var b=h.zoom(i*h.scale(a));return isNaN(b)?1/0:b},project:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(wt(i),a)},unproject:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(at(i),a)},layerPointToLatLng:function(i){var a=at(i).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(i){var a=this.project(wt(i))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(wt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(Q(i))},distance:function(i,a){return this.options.crs.distance(wt(i),wt(a))},containerPointToLayerPoint:function(i){return at(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return at(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var a=this.containerPointToLayerPoint(at(i));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(wt(i)))},mouseEventToContainerPoint:function(i){return Wc(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var a=this._container=ie(i);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");se(a,"scroll",this._onScroll,this),this._containerId=u(a)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Wt.any3d,Yt(i,"leaflet-container"+(Wt.touch?" leaflet-touch":"")+(Wt.retina?" leaflet-retina":"")+(Wt.ielt9?" leaflet-oldie":"")+(Wt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=ri(i,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),ze(this._mapPane,new j(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Yt(i.markerPane,"leaflet-zoom-hide"),Yt(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,a,h){ze(this._mapPane,new j(0,0));var b=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var T=this._zoom!==a;this._moveStart(T,h)._move(i,a)._moveEnd(T),this.fire("viewreset"),b&&this.fire("load")},_moveStart:function(i,a){return i&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(i,a,h,b){a===void 0&&(a=this._zoom);var T=this._zoom!==a;return this._zoom=a,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),b?h&&h.pinch&&this.fire("zoom",h):((T||h&&h.pinch)&&this.fire("zoom",h),this.fire("move",h)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return U(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){ze(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[u(this._container)]=this;var a=i?xe:se;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Wt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){U(this._resizeRequest),this._resizeRequest=W(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,a){for(var h=[],b,T=a==="mouseout"||a==="mouseover",z=i.target||i.srcElement,Y=!1;z;){if(b=this._targets[u(z)],b&&(a==="click"||a==="preclick")&&this._draggableMoved(b)){Y=!0;break}if(b&&b.listens(a,!0)&&(T&&!ja(z,i)||(h.push(b),T))||z===this._container)break;z=z.parentNode}return!h.length&&!Y&&!T&&this.listens(a,!0)&&(h=[this]),h},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var a=i.target||i.srcElement;if(!(!this._loaded||a._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(a))){var h=i.type;h==="mousedown"&&Va(a),this._fireDOMEvent(i,h)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,a,h){if(i.type==="click"){var b=s({},i);b.type="preclick",this._fireDOMEvent(b,b.type,h)}var T=this._findEventTargets(i,a);if(h){for(var z=[],Y=0;Y<h.length;Y++)h[Y].listens(a,!0)&&z.push(h[Y]);T=z.concat(T)}if(T.length){a==="contextmenu"&&$e(i);var ut=T[0],mt={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var Lt=ut.getLatLng&&(!ut._radius||ut._radius<=10);mt.containerPoint=Lt?this.latLngToContainerPoint(ut.getLatLng()):this.mouseEventToContainerPoint(i),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=Lt?ut.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for(Y=0;Y<T.length;Y++)if(T[Y].fire(a,mt,!0),mt.originalEvent._stopped||T[Y].options.bubblingMouseEvents===!1&&P(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,a=this._handlers.length;i<a;i++)this._handlers[i].disable()},whenReady:function(i,a){return this._loaded?i.call(a||this,{target:this}):this.on("load",i,a),this},_getMapPanePos:function(){return Gi(this._mapPane)||new j(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,a){var h=i&&a!==void 0?this._getNewPixelOrigin(i,a):this.getPixelOrigin();return h.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,a){var h=this.getSize()._divideBy(2);return this.project(i,a)._subtract(h)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,a,h){var b=this._getNewPixelOrigin(h,a);return this.project(i,a)._subtract(b)},_latLngBoundsToNewLayerBounds:function(i,a,h){var b=this._getNewPixelOrigin(h,a);return tt([this.project(i.getSouthWest(),a)._subtract(b),this.project(i.getNorthWest(),a)._subtract(b),this.project(i.getSouthEast(),a)._subtract(b),this.project(i.getNorthEast(),a)._subtract(b)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,a,h){if(!h)return i;var b=this.project(i,a),T=this.getSize().divideBy(2),z=new q(b.subtract(T),b.add(T)),Y=this._getBoundsOffset(z,h,a);return Math.abs(Y.x)<=1&&Math.abs(Y.y)<=1?i:this.unproject(b.add(Y),a)},_limitOffset:function(i,a){if(!a)return i;var h=this.getPixelBounds(),b=new q(h.min.add(i),h.max.add(i));return i.add(this._getBoundsOffset(b,a))},_getBoundsOffset:function(i,a,h){var b=tt(this.project(a.getNorthEast(),h),this.project(a.getSouthWest(),h)),T=b.min.subtract(i.min),z=b.max.subtract(i.max),Y=this._rebound(T.x,-z.x),ut=this._rebound(T.y,-z.y);return new j(Y,ut)},_rebound:function(i,a){return i+a>0?Math.round(i-a)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(a))},_limitZoom:function(i){var a=this.getMinZoom(),h=this.getMaxZoom(),b=Wt.any3d?this.options.zoomSnap:1;return b&&(i=Math.round(i/b)*b),Math.max(a,Math.min(h,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){be(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,a){var h=this._getCenterOffset(i)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(h)?!1:(this.panBy(h,a),!0)},_createAnimProxy:function(){var i=this._proxy=Xt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(a){var h=Pe,b=this._proxy.style[h];Vi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),b===this._proxy.style[h]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){fe(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),a=this.getZoom();Vi(this._proxy,this.project(i,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,a,h){if(this._animatingZoom)return!0;if(h=h||{},!this._zoomAnimated||h.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var b=this.getZoomScale(a),T=this._getCenterOffset(i)._divideBy(1-1/b);return h.animate!==!0&&!this.getSize().contains(T)?!1:(W(function(){this._moveStart(!0,h.noMoveStart||!1)._animateZoom(i,a,!0)},this),!0)},_animateZoom:function(i,a,h,b){this._mapPane&&(h&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=a,Yt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:a,noUpdate:b}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&be(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function gp(i,a){return new de(i,a)}var kn=C.extend({options:{position:"topright"},initialize:function(i){y(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var a=this._map;return a&&a.removeControl(this),this.options.position=i,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var a=this._container=this.onAdd(i),h=this.getPosition(),b=i._controlCorners[h];return Yt(a,"leaflet-control"),h.indexOf("bottom")!==-1?b.insertBefore(a,b.firstChild):b.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(fe(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),ws=function(i){return new kn(i)};de.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},a="leaflet-",h=this._controlContainer=Xt("div",a+"control-container",this._container);function b(T,z){var Y=a+T+" "+a+z;i[T+z]=Xt("div",Y,h)}b("top","left"),b("top","right"),b("bottom","left"),b("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)fe(this._controlCorners[i]);fe(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var qc=kn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,a,h,b){return h<b?-1:b<h?1:0}},initialize:function(i,a,h){y(this,h),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var b in i)this._addLayer(i[b],b);for(b in a)this._addLayer(a[b],b,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return kn.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,a){return this._addLayer(i,a),this._map?this._update():this},addOverlay:function(i,a){return this._addLayer(i,a,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var a=this._getLayer(u(i));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){Yt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?(Yt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):be(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return be(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",a=this._container=Xt("div",i),h=this.options.collapsed;a.setAttribute("aria-haspopup",!0),bs(a),qa(a);var b=this._section=Xt("section",i+"-list");h&&(this._map.on("click",this.collapse,this),se(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var T=this._layersLink=Xt("a",i+"-toggle",a);T.href="#",T.title="Layers",T.setAttribute("role","button"),se(T,{keydown:function(z){z.keyCode===13&&this._expandSafely()},click:function(z){$e(z),this._expandSafely()}},this),h||this.expand(),this._baseLayersList=Xt("div",i+"-base",b),this._separator=Xt("div",i+"-separator",b),this._overlaysList=Xt("div",i+"-overlays",b),a.appendChild(b)},_getLayer:function(i){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&u(this._layers[a].layer)===i)return this._layers[a]},_addLayer:function(i,a,h){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:a,overlay:h}),this.options.sortLayers&&this._layers.sort(l(function(b,T){return this.options.sortFunction(b.layer,T.layer,b.name,T.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Hi(this._baseLayersList),Hi(this._overlaysList),this._layerControlInputs=[];var i,a,h,b,T=0;for(h=0;h<this._layers.length;h++)b=this._layers[h],this._addItem(b),a=a||b.overlay,i=i||!b.overlay,T+=b.overlay?0:1;return this.options.hideSingleBase&&(i=i&&T>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=a&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var a=this._getLayer(u(i.target)),h=a.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;h&&this._map.fire(h,a)},_createRadioElement:function(i,a){var h='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(a?' checked="checked"':"")+"/>",b=document.createElement("div");return b.innerHTML=h,b.firstChild},_addItem:function(i){var a=document.createElement("label"),h=this._map.hasLayer(i.layer),b;i.overlay?(b=document.createElement("input"),b.type="checkbox",b.className="leaflet-control-layers-selector",b.defaultChecked=h):b=this._createRadioElement("leaflet-base-layers_"+u(this),h),this._layerControlInputs.push(b),b.layerId=u(i.layer),se(b,"click",this._onInputClick,this);var T=document.createElement("span");T.innerHTML=" "+i.name;var z=document.createElement("span");a.appendChild(z),z.appendChild(b),z.appendChild(T);var Y=i.overlay?this._overlaysList:this._baseLayersList;return Y.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,a,h,b=[],T=[];this._handlingClick=!0;for(var z=i.length-1;z>=0;z--)a=i[z],h=this._getLayer(a.layerId).layer,a.checked?b.push(h):a.checked||T.push(h);for(z=0;z<T.length;z++)this._map.hasLayer(T[z])&&this._map.removeLayer(T[z]);for(z=0;z<b.length;z++)this._map.hasLayer(b[z])||this._map.addLayer(b[z]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,a,h,b=this._map.getZoom(),T=i.length-1;T>=0;T--)a=i[T],h=this._getLayer(a.layerId).layer,a.disabled=h.options.minZoom!==void 0&&b<h.options.minZoom||h.options.maxZoom!==void 0&&b>h.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,se(i,"click",$e),this.expand();var a=this;setTimeout(function(){xe(i,"click",$e),a._preventClick=!1})}}),_p=function(i,a,h){return new qc(i,a,h)},Ya=kn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var a="leaflet-control-zoom",h=Xt("div",a+" leaflet-bar"),b=this.options;return this._zoomInButton=this._createButton(b.zoomInText,b.zoomInTitle,a+"-in",h,this._zoomIn),this._zoomOutButton=this._createButton(b.zoomOutText,b.zoomOutTitle,a+"-out",h,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),h},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,a,h,b,T){var z=Xt("a",h,b);return z.innerHTML=i,z.href="#",z.title=a,z.setAttribute("role","button"),z.setAttribute("aria-label",a),bs(z),se(z,"click",Zi),se(z,"click",T,this),se(z,"click",this._refocusOnMap,this),z},_updateDisabled:function(){var i=this._map,a="leaflet-disabled";be(this._zoomInButton,a),be(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&(Yt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&(Yt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});de.mergeOptions({zoomControl:!0}),de.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ya,this.addControl(this.zoomControl))});var vp=function(i){return new Ya(i)},jc=kn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var a="leaflet-control-scale",h=Xt("div",a),b=this.options;return this._addScales(b,a+"-line",h),i.on(b.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),h},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,a,h){i.metric&&(this._mScale=Xt("div",a,h)),i.imperial&&(this._iScale=Xt("div",a,h))},_update:function(){var i=this._map,a=i.getSize().y/2,h=i.distance(i.containerPointToLatLng([0,a]),i.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(h)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var a=this._getRoundNum(i),h=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,h,a/i)},_updateImperial:function(i){var a=i*3.2808399,h,b,T;a>5280?(h=a/5280,b=this._getRoundNum(h),this._updateScale(this._iScale,b+" mi",b/h)):(T=this._getRoundNum(a),this._updateScale(this._iScale,T+" ft",T/a))},_updateScale:function(i,a,h){i.style.width=Math.round(this.options.maxWidth*h)+"px",i.innerHTML=a},_getRoundNum:function(i){var a=Math.pow(10,(Math.floor(i)+"").length-1),h=i/a;return h=h>=10?10:h>=5?5:h>=3?3:h>=2?2:1,a*h}}),yp=function(i){return new jc(i)},xp='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',$a=kn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Wt.inlineSvg?xp+" ":"")+"Leaflet</a>"},initialize:function(i){y(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Xt("div","leaflet-control-attribution"),bs(this._container);for(var a in i._layers)i._layers[a].getAttribution&&this.addAttribution(i._layers[a].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var a in this._attributions)this._attributions[a]&&i.push(a);var h=[];this.options.prefix&&h.push(this.options.prefix),i.length&&h.push(i.join(", ")),this._container.innerHTML=h.join(' <span aria-hidden="true">|</span> ')}}});de.mergeOptions({attributionControl:!0}),de.addInitHook(function(){this.options.attributionControl&&new $a().addTo(this)});var bp=function(i){return new $a(i)};kn.Layers=qc,kn.Zoom=Ya,kn.Scale=jc,kn.Attribution=$a,ws.layers=_p,ws.zoom=vp,ws.scale=yp,ws.attribution=bp;var Kn=C.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});Kn.addTo=function(i,a){return i.addHandler(a,this),this};var wp={Events:nt},Yc=Wt.touch?"touchstart mousedown":"mousedown",bi=rt.extend({options:{clickTolerance:3},initialize:function(i,a,h,b){y(this,b),this._element=i,this._dragStartTarget=a||i,this._preventOutline=h},enable:function(){this._enabled||(se(this._dragStartTarget,Yc,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(bi._dragging===this&&this.finishDrag(!0),xe(this._dragStartTarget,Yc,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!Ue(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){bi._dragging===this&&this.finishDrag();return}if(!(bi._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(bi._dragging=this,this._preventOutline&&Va(this._element),Ba(),vs(),!this._moving)){this.fire("down");var a=i.touches?i.touches[0]:i,h=Hc(this._element);this._startPoint=new j(a.clientX,a.clientY),this._startPos=Gi(this._element),this._parentScale=Ga(h);var b=i.type==="mousedown";se(document,b?"mousemove":"touchmove",this._onMove,this),se(document,b?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var a=i.touches&&i.touches.length===1?i.touches[0]:i,h=new j(a.clientX,a.clientY)._subtract(this._startPoint);!h.x&&!h.y||Math.abs(h.x)+Math.abs(h.y)<this.options.clickTolerance||(h.x/=this._parentScale.x,h.y/=this._parentScale.y,$e(i),this._moved||(this.fire("dragstart"),this._moved=!0,Yt(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Yt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(h),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),ze(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){be(document.body,"leaflet-dragging"),this._lastTarget&&(be(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),xe(document,"mousemove touchmove",this._onMove,this),xe(document,"mouseup touchend touchcancel",this._onUp,this),Fa(),ys();var a=this._moved&&this._moving;this._moving=!1,bi._dragging=!1,a&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function $c(i,a,h){var b,T=[1,4,2,8],z,Y,ut,mt,Lt,Bt,$t,he;for(z=0,Bt=i.length;z<Bt;z++)i[z]._code=Xi(i[z],a);for(ut=0;ut<4;ut++){for($t=T[ut],b=[],z=0,Bt=i.length,Y=Bt-1;z<Bt;Y=z++)mt=i[z],Lt=i[Y],mt._code&$t?Lt._code&$t||(he=mo(Lt,mt,$t,a,h),he._code=Xi(he,a),b.push(he)):(Lt._code&$t&&(he=mo(Lt,mt,$t,a,h),he._code=Xi(he,a),b.push(he)),b.push(mt));i=b}return i}function Kc(i,a){var h,b,T,z,Y,ut,mt,Lt,Bt;if(!i||i.length===0)throw new Error("latlngs not passed");Pn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var $t=wt([0,0]),he=Q(i),ln=he.getNorthWest().distanceTo(he.getSouthWest())*he.getNorthEast().distanceTo(he.getNorthWest());ln<1700&&($t=Ka(i));var We=i.length,Rn=[];for(h=0;h<We;h++){var _n=wt(i[h]);Rn.push(a.project(wt([_n.lat-$t.lat,_n.lng-$t.lng])))}for(ut=mt=Lt=0,h=0,b=We-1;h<We;b=h++)T=Rn[h],z=Rn[b],Y=T.y*z.x-z.y*T.x,mt+=(T.x+z.x)*Y,Lt+=(T.y+z.y)*Y,ut+=Y*3;ut===0?Bt=Rn[0]:Bt=[mt/ut,Lt/ut];var br=a.unproject(at(Bt));return wt([br.lat+$t.lat,br.lng+$t.lng])}function Ka(i){for(var a=0,h=0,b=0,T=0;T<i.length;T++){var z=wt(i[T]);a+=z.lat,h+=z.lng,b++}return wt([a/b,h/b])}var Mp={__proto__:null,clipPolygon:$c,polygonCenter:Kc,centroid:Ka};function Jc(i,a){if(!a||!i.length)return i.slice();var h=a*a;return i=Tp(i,h),i=Ep(i,h),i}function Qc(i,a,h){return Math.sqrt(Ms(i,a,h,!0))}function Sp(i,a,h){return Ms(i,a,h)}function Ep(i,a){var h=i.length,b=typeof Uint8Array<"u"?Uint8Array:Array,T=new b(h);T[0]=T[h-1]=1,Ja(i,T,a,0,h-1);var z,Y=[];for(z=0;z<h;z++)T[z]&&Y.push(i[z]);return Y}function Ja(i,a,h,b,T){var z=0,Y,ut,mt;for(ut=b+1;ut<=T-1;ut++)mt=Ms(i[ut],i[b],i[T],!0),mt>z&&(Y=ut,z=mt);z>h&&(a[Y]=1,Ja(i,a,h,b,Y),Ja(i,a,h,Y,T))}function Tp(i,a){for(var h=[i[0]],b=1,T=0,z=i.length;b<z;b++)Ap(i[b],i[T])>a&&(h.push(i[b]),T=b);return T<z-1&&h.push(i[z-1]),h}var tu;function eu(i,a,h,b,T){var z=b?tu:Xi(i,h),Y=Xi(a,h),ut,mt,Lt;for(tu=Y;;){if(!(z|Y))return[i,a];if(z&Y)return!1;ut=z||Y,mt=mo(i,a,ut,h,T),Lt=Xi(mt,h),ut===z?(i=mt,z=Lt):(a=mt,Y=Lt)}}function mo(i,a,h,b,T){var z=a.x-i.x,Y=a.y-i.y,ut=b.min,mt=b.max,Lt,Bt;return h&8?(Lt=i.x+z*(mt.y-i.y)/Y,Bt=mt.y):h&4?(Lt=i.x+z*(ut.y-i.y)/Y,Bt=ut.y):h&2?(Lt=mt.x,Bt=i.y+Y*(mt.x-i.x)/z):h&1&&(Lt=ut.x,Bt=i.y+Y*(ut.x-i.x)/z),new j(Lt,Bt,T)}function Xi(i,a){var h=0;return i.x<a.min.x?h|=1:i.x>a.max.x&&(h|=2),i.y<a.min.y?h|=4:i.y>a.max.y&&(h|=8),h}function Ap(i,a){var h=a.x-i.x,b=a.y-i.y;return h*h+b*b}function Ms(i,a,h,b){var T=a.x,z=a.y,Y=h.x-T,ut=h.y-z,mt=Y*Y+ut*ut,Lt;return mt>0&&(Lt=((i.x-T)*Y+(i.y-z)*ut)/mt,Lt>1?(T=h.x,z=h.y):Lt>0&&(T+=Y*Lt,z+=ut*Lt)),Y=i.x-T,ut=i.y-z,b?Y*Y+ut*ut:new j(T,z)}function Pn(i){return!w(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function nu(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Pn(i)}function iu(i,a){var h,b,T,z,Y,ut,mt,Lt;if(!i||i.length===0)throw new Error("latlngs not passed");Pn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Bt=wt([0,0]),$t=Q(i),he=$t.getNorthWest().distanceTo($t.getSouthWest())*$t.getNorthEast().distanceTo($t.getNorthWest());he<1700&&(Bt=Ka(i));var ln=i.length,We=[];for(h=0;h<ln;h++){var Rn=wt(i[h]);We.push(a.project(wt([Rn.lat-Bt.lat,Rn.lng-Bt.lng])))}for(h=0,b=0;h<ln-1;h++)b+=We[h].distanceTo(We[h+1])/2;if(b===0)Lt=We[0];else for(h=0,z=0;h<ln-1;h++)if(Y=We[h],ut=We[h+1],T=Y.distanceTo(ut),z+=T,z>b){mt=(z-b)/T,Lt=[ut.x-mt*(ut.x-Y.x),ut.y-mt*(ut.y-Y.y)];break}var _n=a.unproject(at(Lt));return wt([_n.lat+Bt.lat,_n.lng+Bt.lng])}var Lp={__proto__:null,simplify:Jc,pointToSegmentDistance:Qc,closestPointOnSegment:Sp,clipSegment:eu,_getEdgeIntersection:mo,_getBitCode:Xi,_sqClosestPointOnSegment:Ms,isFlat:Pn,_flat:nu,polylineCenter:iu},Qa={project:function(i){return new j(i.lng,i.lat)},unproject:function(i){return new it(i.y,i.x)},bounds:new q([-180,-90],[180,90])},tl={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var a=Math.PI/180,h=this.R,b=i.lat*a,T=this.R_MINOR/h,z=Math.sqrt(1-T*T),Y=z*Math.sin(b),ut=Math.tan(Math.PI/4-b/2)/Math.pow((1-Y)/(1+Y),z/2);return b=-h*Math.log(Math.max(ut,1e-10)),new j(i.lng*a*h,b)},unproject:function(i){for(var a=180/Math.PI,h=this.R,b=this.R_MINOR/h,T=Math.sqrt(1-b*b),z=Math.exp(-i.y/h),Y=Math.PI/2-2*Math.atan(z),ut=0,mt=.1,Lt;ut<15&&Math.abs(mt)>1e-7;ut++)Lt=T*Math.sin(Y),Lt=Math.pow((1-Lt)/(1+Lt),T/2),mt=Math.PI/2-2*Math.atan(z*Lt)-Y,Y+=mt;return new it(Y*a,i.x*a/h)}},Cp={__proto__:null,LonLat:Qa,Mercator:tl,SphericalMercator:Ut},Pp=s({},Pt,{code:"EPSG:3395",projection:tl,transformation:function(){var i=.5/(Math.PI*tl.R);return xt(i,.5,-i,.5)}()}),ru=s({},Pt,{code:"EPSG:4326",projection:Qa,transformation:xt(1/180,1,-1/180,.5)}),Rp=s({},St,{projection:Qa,transformation:xt(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,a){var h=a.lng-i.lng,b=a.lat-i.lat;return Math.sqrt(h*h+b*b)},infinite:!0});St.Earth=Pt,St.EPSG3395=Pp,St.EPSG3857=bt,St.EPSG900913=E,St.EPSG4326=ru,St.Simple=Rp;var Un=rt.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[u(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[u(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var a=i.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var h=this.getEvents();a.on(h,this),this.once("remove",function(){a.off(h,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});de.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var a=u(i);return this._layers[a]?this:(this._layers[a]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var a=u(i);return this._layers[a]?(this._loaded&&i.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return u(i)in this._layers},eachLayer:function(i,a){for(var h in this._layers)i.call(a,this._layers[h]);return this},_addLayers:function(i){i=i?w(i)?i:[i]:[];for(var a=0,h=i.length;a<h;a++)this.addLayer(i[a])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[u(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var a=u(i);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,a=-1/0,h=this._getZoomSpan();for(var b in this._zoomBoundLayers){var T=this._zoomBoundLayers[b].options;i=T.minZoom===void 0?i:Math.min(i,T.minZoom),a=T.maxZoom===void 0?a:Math.max(a,T.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=i===1/0?void 0:i,h!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var gr=Un.extend({initialize:function(i,a){y(this,a),this._layers={};var h,b;if(i)for(h=0,b=i.length;h<b;h++)this.addLayer(i[h])},addLayer:function(i){var a=this.getLayerId(i);return this._layers[a]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var a=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(i){var a=typeof i=="number"?i:this.getLayerId(i);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var a=Array.prototype.slice.call(arguments,1),h,b;for(h in this._layers)b=this._layers[h],b[i]&&b[i].apply(b,a);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,a){for(var h in this._layers)i.call(a,this._layers[h]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return u(i)}}),Ip=function(i,a){return new gr(i,a)},si=gr.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),gr.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),gr.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new Ct;for(var a in this._layers){var h=this._layers[a];i.extend(h.getBounds?h.getBounds():h.getLatLng())}return i}}),Dp=function(i,a){return new si(i,a)},_r=C.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){y(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,a){var h=this._getIconUrl(i);if(!h){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var b=this._createImg(h,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(b,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(b.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),b},_setIconStyles:function(i,a){var h=this.options,b=h[a+"Size"];typeof b=="number"&&(b=[b,b]);var T=at(b),z=at(a==="shadow"&&h.shadowAnchor||h.iconAnchor||T&&T.divideBy(2,!0));i.className="leaflet-marker-"+a+" "+(h.className||""),z&&(i.style.marginLeft=-z.x+"px",i.style.marginTop=-z.y+"px"),T&&(i.style.width=T.x+"px",i.style.height=T.y+"px")},_createImg:function(i,a){return a=a||document.createElement("img"),a.src=i,a},_getIconUrl:function(i){return Wt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function Np(i){return new _r(i)}var Ss=_r.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof Ss.imagePath!="string"&&(Ss.imagePath=this._detectIconPath()),(this.options.imagePath||Ss.imagePath)+_r.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var a=function(h,b,T){var z=b.exec(h);return z&&z[T]};return i=a(i,/^url\((['"])?(.+)\1\)$/,2),i&&a(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Xt("div","leaflet-default-icon-path",document.body),a=ri(i,"background-image")||ri(i,"backgroundImage");if(document.body.removeChild(i),a=this._stripUrl(a),a)return a;var h=document.querySelector('link[href$="leaflet.css"]');return h?h.href.substring(0,h.href.length-11-1):""}}),su=Kn.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new bi(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Yt(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&be(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var a=this._marker,h=a._map,b=this._marker.options.autoPanSpeed,T=this._marker.options.autoPanPadding,z=Gi(a._icon),Y=h.getPixelBounds(),ut=h.getPixelOrigin(),mt=tt(Y.min._subtract(ut).add(T),Y.max._subtract(ut).subtract(T));if(!mt.contains(z)){var Lt=at((Math.max(mt.max.x,z.x)-mt.max.x)/(Y.max.x-mt.max.x)-(Math.min(mt.min.x,z.x)-mt.min.x)/(Y.min.x-mt.min.x),(Math.max(mt.max.y,z.y)-mt.max.y)/(Y.max.y-mt.max.y)-(Math.min(mt.min.y,z.y)-mt.min.y)/(Y.min.y-mt.min.y)).multiplyBy(b);h.panBy(Lt,{animate:!1}),this._draggable._newPos._add(Lt),this._draggable._startPos._add(Lt),ze(a._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=W(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(U(this._panRequest),this._panRequest=W(this._adjustPan.bind(this,i)))},_onDrag:function(i){var a=this._marker,h=a._shadow,b=Gi(a._icon),T=a._map.layerPointToLatLng(b);h&&ze(h,b),a._latlng=T,i.latlng=T,i.oldLatLng=this._oldLatLng,a.fire("move",i).fire("drag",i)},_onDragEnd:function(i){U(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),go=Un.extend({options:{icon:new Ss,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,a){y(this,a),this._latlng=wt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),h=i.icon.createIcon(this._icon),b=!1;h!==this._icon&&(this._icon&&this._removeIcon(),b=!0,i.title&&(h.title=i.title),h.tagName==="IMG"&&(h.alt=i.alt||"")),Yt(h,a),i.keyboard&&(h.tabIndex="0",h.setAttribute("role","button")),this._icon=h,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&se(h,"focus",this._panOnFocus,this);var T=i.icon.createShadow(this._shadow),z=!1;T!==this._shadow&&(this._removeShadow(),z=!0),T&&(Yt(T,a),T.alt=""),this._shadow=T,i.opacity<1&&this._updateOpacity(),b&&this.getPane().appendChild(this._icon),this._initInteraction(),T&&z&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&xe(this._icon,"focus",this._panOnFocus,this),fe(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&fe(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&ze(this._icon,i),this._shadow&&ze(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&(Yt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),su)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new su(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&gn(this._icon,i),this._shadow&&gn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var a=this.options.icon.options,h=a.iconSize?at(a.iconSize):at(0,0),b=a.iconAnchor?at(a.iconAnchor):at(0,0);i.panInside(this._latlng,{paddingTopLeft:b,paddingBottomRight:h.subtract(b)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Op(i,a){return new go(i,a)}var wi=Un.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return y(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),_o=wi.extend({options:{fill:!0,radius:10},initialize:function(i,a){y(this,a),this._latlng=wt(i),this._radius=this.options.radius},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var a=i&&i.radius||this._radius;return wi.prototype.setStyle.call(this,i),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,a=this._radiusY||i,h=this._clickTolerance(),b=[i+h,a+h];this._pxBounds=new q(this._point.subtract(b),this._point.add(b))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function kp(i,a){return new _o(i,a)}var el=_o.extend({initialize:function(i,a,h){if(typeof a=="number"&&(a=s({},h,{radius:a})),y(this,a),this._latlng=wt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new Ct(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:wi.prototype.setStyle,_project:function(){var i=this._latlng.lng,a=this._latlng.lat,h=this._map,b=h.options.crs;if(b.distance===Pt.distance){var T=Math.PI/180,z=this._mRadius/Pt.R/T,Y=h.project([a+z,i]),ut=h.project([a-z,i]),mt=Y.add(ut).divideBy(2),Lt=h.unproject(mt).lat,Bt=Math.acos((Math.cos(z*T)-Math.sin(a*T)*Math.sin(Lt*T))/(Math.cos(a*T)*Math.cos(Lt*T)))/T;(isNaN(Bt)||Bt===0)&&(Bt=z/Math.cos(Math.PI/180*a)),this._point=mt.subtract(h.getPixelOrigin()),this._radius=isNaN(Bt)?0:mt.x-h.project([Lt,i-Bt]).x,this._radiusY=mt.y-Y.y}else{var $t=b.unproject(b.project(this._latlng).subtract([this._mRadius,0]));this._point=h.latLngToLayerPoint(this._latlng),this._radius=this._point.x-h.latLngToLayerPoint($t).x}this._updateBounds()}});function Up(i,a,h){return new el(i,a,h)}var oi=wi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,a){y(this,a),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var a=1/0,h=null,b=Ms,T,z,Y=0,ut=this._parts.length;Y<ut;Y++)for(var mt=this._parts[Y],Lt=1,Bt=mt.length;Lt<Bt;Lt++){T=mt[Lt-1],z=mt[Lt];var $t=b(i,T,z,!0);$t<a&&(a=$t,h=b(i,T,z))}return h&&(h.distance=Math.sqrt(a)),h},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return iu(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,a){return a=a||this._defaultShape(),i=wt(i),a.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new Ct,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return Pn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var a=[],h=Pn(i),b=0,T=i.length;b<T;b++)h?(a[b]=wt(i[b]),this._bounds.extend(a[b])):a[b]=this._convertLatLngs(i[b]);return a},_project:function(){var i=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),a=new j(i,i);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(i,a,h){var b=i[0]instanceof it,T=i.length,z,Y;if(b){for(Y=[],z=0;z<T;z++)Y[z]=this._map.latLngToLayerPoint(i[z]),h.extend(Y[z]);a.push(Y)}else for(z=0;z<T;z++)this._projectLatlngs(i[z],a,h)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,h,b,T,z,Y,ut,mt;for(h=0,T=0,z=this._rings.length;h<z;h++)for(mt=this._rings[h],b=0,Y=mt.length;b<Y-1;b++)ut=eu(mt[b],mt[b+1],i,b,!0),ut&&(a[T]=a[T]||[],a[T].push(ut[0]),(ut[1]!==mt[b+1]||b===Y-2)&&(a[T].push(ut[1]),T++))}},_simplifyPoints:function(){for(var i=this._parts,a=this.options.smoothFactor,h=0,b=i.length;h<b;h++)i[h]=Jc(i[h],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,a){var h,b,T,z,Y,ut,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(h=0,z=this._parts.length;h<z;h++)for(ut=this._parts[h],b=0,Y=ut.length,T=Y-1;b<Y;T=b++)if(!(!a&&b===0)&&Qc(i,ut[T],ut[b])<=mt)return!0;return!1}});function zp(i,a){return new oi(i,a)}oi._flat=nu;var vr=oi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Kc(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var a=oi.prototype._convertLatLngs.call(this,i),h=a.length;return h>=2&&a[0]instanceof it&&a[0].equals(a[h-1])&&a.pop(),a},_setLatLngs:function(i){oi.prototype._setLatLngs.call(this,i),Pn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Pn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,a=this.options.weight,h=new j(a,a);if(i=new q(i.min.subtract(h),i.max.add(h)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var b=0,T=this._rings.length,z;b<T;b++)z=$c(this._rings[b],i,!0),z.length&&this._parts.push(z)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var a=!1,h,b,T,z,Y,ut,mt,Lt;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(z=0,mt=this._parts.length;z<mt;z++)for(h=this._parts[z],Y=0,Lt=h.length,ut=Lt-1;Y<Lt;ut=Y++)b=h[Y],T=h[ut],b.y>i.y!=T.y>i.y&&i.x<(T.x-b.x)*(i.y-b.y)/(T.y-b.y)+b.x&&(a=!a);return a||oi.prototype._containsPoint.call(this,i,!0)}});function Bp(i,a){return new vr(i,a)}var ai=si.extend({initialize:function(i,a){y(this,a),this._layers={},i&&this.addData(i)},addData:function(i){var a=w(i)?i:i.features,h,b,T;if(a){for(h=0,b=a.length;h<b;h++)T=a[h],(T.geometries||T.geometry||T.features||T.coordinates)&&this.addData(T);return this}var z=this.options;if(z.filter&&!z.filter(i))return this;var Y=vo(i,z);return Y?(Y.feature=bo(i),Y.defaultOptions=Y.options,this.resetStyle(Y),z.onEachFeature&&z.onEachFeature(i,Y),this.addLayer(Y)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=s({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(a){this._setLayerStyle(a,i)},this)},_setLayerStyle:function(i,a){i.setStyle&&(typeof a=="function"&&(a=a(i.feature)),i.setStyle(a))}});function vo(i,a){var h=i.type==="Feature"?i.geometry:i,b=h?h.coordinates:null,T=[],z=a&&a.pointToLayer,Y=a&&a.coordsToLatLng||nl,ut,mt,Lt,Bt;if(!b&&!h)return null;switch(h.type){case"Point":return ut=Y(b),ou(z,i,ut,a);case"MultiPoint":for(Lt=0,Bt=b.length;Lt<Bt;Lt++)ut=Y(b[Lt]),T.push(ou(z,i,ut,a));return new si(T);case"LineString":case"MultiLineString":return mt=yo(b,h.type==="LineString"?0:1,Y),new oi(mt,a);case"Polygon":case"MultiPolygon":return mt=yo(b,h.type==="Polygon"?1:2,Y),new vr(mt,a);case"GeometryCollection":for(Lt=0,Bt=h.geometries.length;Lt<Bt;Lt++){var $t=vo({geometry:h.geometries[Lt],type:"Feature",properties:i.properties},a);$t&&T.push($t)}return new si(T);case"FeatureCollection":for(Lt=0,Bt=h.features.length;Lt<Bt;Lt++){var he=vo(h.features[Lt],a);he&&T.push(he)}return new si(T);default:throw new Error("Invalid GeoJSON object.")}}function ou(i,a,h,b){return i?i(a,h):new go(h,b&&b.markersInheritOptions&&b)}function nl(i){return new it(i[1],i[0],i[2])}function yo(i,a,h){for(var b=[],T=0,z=i.length,Y;T<z;T++)Y=a?yo(i[T],a-1,h):(h||nl)(i[T]),b.push(Y);return b}function il(i,a){return i=wt(i),i.alt!==void 0?[_(i.lng,a),_(i.lat,a),_(i.alt,a)]:[_(i.lng,a),_(i.lat,a)]}function xo(i,a,h,b){for(var T=[],z=0,Y=i.length;z<Y;z++)T.push(a?xo(i[z],Pn(i[z])?0:a-1,h,b):il(i[z],b));return!a&&h&&T.length>0&&T.push(T[0].slice()),T}function yr(i,a){return i.feature?s({},i.feature,{geometry:a}):bo(a)}function bo(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var rl={toGeoJSON:function(i){return yr(this,{type:"Point",coordinates:il(this.getLatLng(),i)})}};go.include(rl),el.include(rl),_o.include(rl),oi.include({toGeoJSON:function(i){var a=!Pn(this._latlngs),h=xo(this._latlngs,a?1:0,!1,i);return yr(this,{type:(a?"Multi":"")+"LineString",coordinates:h})}}),vr.include({toGeoJSON:function(i){var a=!Pn(this._latlngs),h=a&&!Pn(this._latlngs[0]),b=xo(this._latlngs,h?2:a?1:0,!0,i);return a||(b=[b]),yr(this,{type:(h?"Multi":"")+"Polygon",coordinates:b})}}),gr.include({toMultiPoint:function(i){var a=[];return this.eachLayer(function(h){a.push(h.toGeoJSON(i).geometry.coordinates)}),yr(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(i){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(i);var h=a==="GeometryCollection",b=[];return this.eachLayer(function(T){if(T.toGeoJSON){var z=T.toGeoJSON(i);if(h)b.push(z.geometry);else{var Y=bo(z);Y.type==="FeatureCollection"?b.push.apply(b,Y.features):b.push(Y)}}}),h?yr(this,{geometries:b,type:"GeometryCollection"}):{type:"FeatureCollection",features:b}}});function au(i,a){return new ai(i,a)}var Fp=au,wo=Un.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,a,h){this._url=i,this._bounds=Q(a),y(this,h)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Yt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){fe(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&Cn(this._image),this},bringToBack:function(){return this._map&&Yn(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=Q(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",a=this._image=i?this._url:Xt("img");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(i){var a=this._map.getZoomScale(i.zoom),h=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;Vi(this._image,h,a)},_reset:function(){var i=this._image,a=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),h=a.getSize();ze(i,a.min),i.style.width=h.x+"px",i.style.height=h.y+"px"},_updateOpacity:function(){gn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),Hp=function(i,a,h){return new wo(i,a,h)},lu=wo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",a=this._image=i?this._url:Xt("video");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onloadeddata=l(this.fire,this,"load"),i){for(var h=a.getElementsByTagName("source"),b=[],T=0;T<h.length;T++)b.push(h[T].src);this._url=h.length>0?b:[a.src];return}w(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var z=0;z<this._url.length;z++){var Y=Xt("source");Y.src=this._url[z],a.appendChild(Y)}}});function Vp(i,a,h){return new lu(i,a,h)}var cu=wo.extend({_initImage:function(){var i=this._image=this._url;Yt(i,"leaflet-image-layer"),this._zoomAnimated&&Yt(i,"leaflet-zoom-animated"),this.options.className&&Yt(i,this.options.className),i.onselectstart=p,i.onmousemove=p}});function Gp(i,a,h){return new cu(i,a,h)}var Jn=Un.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,a){i&&(i instanceof it||w(i))?(this._latlng=wt(i),y(this,a)):(y(this,i),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&gn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&gn(this._container,1),this.bringToFront(),this.options.interactive&&(Yt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(gn(this._container,0),this._removeTimeout=setTimeout(l(fe,void 0,this._container),200)):fe(this._container),this.options.interactive&&(be(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=wt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Cn(this._container),this},bringToBack:function(){return this._map&&Yn(this._container),this},_prepareOpen:function(i){var a=this._source;if(!a._map)return!1;if(a instanceof si){a=null;var h=this._source._layers;for(var b in h)if(h[b]._map){a=h[b];break}if(!a)return!1;this._source=a}if(!i)if(a.getCenter)i=a.getCenter();else if(a.getLatLng)i=a.getLatLng();else if(a.getBounds)i=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")i.innerHTML=a;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),a=at(this.options.offset),h=this._getAnchor();this._zoomAnimated?ze(this._container,i.add(h)):a=a.add(i).add(h);var b=this._containerBottom=-a.y,T=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=b+"px",this._container.style.left=T+"px"}},_getAnchor:function(){return[0,0]}});de.include({_initOverlay:function(i,a,h,b){var T=a;return T instanceof i||(T=new i(b).setContent(a)),h&&T.setLatLng(h),T}}),Un.include({_initOverlay:function(i,a,h,b){var T=h;return T instanceof i?(y(T,b),T._source=this):(T=a&&!b?a:new i(b,this),T.setContent(h)),T}});var Mo=Jn.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,Jn.prototype.openOn.call(this,i)},onAdd:function(i){Jn.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof wi||this._source.on("preclick",Wi))},onRemove:function(i){Jn.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof wi||this._source.off("preclick",Wi))},getEvents:function(){var i=Jn.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",a=this._container=Xt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),h=this._wrapper=Xt("div",i+"-content-wrapper",a);if(this._contentNode=Xt("div",i+"-content",h),bs(a),qa(this._contentNode),se(a,"contextmenu",Wi),this._tipContainer=Xt("div",i+"-tip-container",a),this._tip=Xt("div",i+"-tip",this._tipContainer),this.options.closeButton){var b=this._closeButton=Xt("a",i+"-close-button",a);b.setAttribute("role","button"),b.setAttribute("aria-label","Close popup"),b.href="#close",b.innerHTML='<span aria-hidden="true">&#215;</span>',se(b,"click",function(T){$e(T),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,a=i.style;a.width="",a.whiteSpace="nowrap";var h=i.offsetWidth;h=Math.min(h,this.options.maxWidth),h=Math.max(h,this.options.minWidth),a.width=h+1+"px",a.whiteSpace="",a.height="";var b=i.offsetHeight,T=this.options.maxHeight,z="leaflet-popup-scrolled";T&&b>T?(a.height=T+"px",Yt(i,z)):be(i,z),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),h=this._getAnchor();ze(this._container,a.add(h))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,a=parseInt(ri(this._container,"marginBottom"),10)||0,h=this._container.offsetHeight+a,b=this._containerWidth,T=new j(this._containerLeft,-h-this._containerBottom);T._add(Gi(this._container));var z=i.layerPointToContainerPoint(T),Y=at(this.options.autoPanPadding),ut=at(this.options.autoPanPaddingTopLeft||Y),mt=at(this.options.autoPanPaddingBottomRight||Y),Lt=i.getSize(),Bt=0,$t=0;z.x+b+mt.x>Lt.x&&(Bt=z.x+b-Lt.x+mt.x),z.x-Bt-ut.x<0&&(Bt=z.x-ut.x),z.y+h+mt.y>Lt.y&&($t=z.y+h-Lt.y+mt.y),z.y-$t-ut.y<0&&($t=z.y-ut.y),(Bt||$t)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([Bt,$t]))}},_getAnchor:function(){return at(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Wp=function(i,a){return new Mo(i,a)};de.mergeOptions({closePopupOnClick:!0}),de.include({openPopup:function(i,a,h){return this._initOverlay(Mo,i,a,h).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),Un.include({bindPopup:function(i,a){return this._popup=this._initOverlay(Mo,this._popup,i,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof si||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){Zi(i);var a=i.layer||i.target;if(this._popup._source===a&&!(a instanceof wi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=a,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var So=Jn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){Jn.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){Jn.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=Jn.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",a=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Xt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+u(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var a,h,b=this._map,T=this._container,z=b.latLngToContainerPoint(b.getCenter()),Y=b.layerPointToContainerPoint(i),ut=this.options.direction,mt=T.offsetWidth,Lt=T.offsetHeight,Bt=at(this.options.offset),$t=this._getAnchor();ut==="top"?(a=mt/2,h=Lt):ut==="bottom"?(a=mt/2,h=0):ut==="center"?(a=mt/2,h=Lt/2):ut==="right"?(a=0,h=Lt/2):ut==="left"?(a=mt,h=Lt/2):Y.x<z.x?(ut="right",a=0,h=Lt/2):(ut="left",a=mt+(Bt.x+$t.x)*2,h=Lt/2),i=i.subtract(at(a,h,!0)).add(Bt).add($t),be(T,"leaflet-tooltip-right"),be(T,"leaflet-tooltip-left"),be(T,"leaflet-tooltip-top"),be(T,"leaflet-tooltip-bottom"),Yt(T,"leaflet-tooltip-"+ut),ze(T,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&gn(this._container,i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(a)},_getAnchor:function(){return at(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Zp=function(i,a){return new So(i,a)};de.include({openTooltip:function(i,a,h){return this._initOverlay(So,i,a,h).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),Un.include({bindTooltip:function(i,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(So,this._tooltip,i,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var a=i?"off":"on",h={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?h.add=this._openTooltip:(h.mouseover=this._openTooltip,h.mouseout=this.closeTooltip,h.click=this._openTooltip,this._map?this._addFocusListeners():h.add=this._addFocusListeners),this._tooltip.options.sticky&&(h.mousemove=this._moveTooltip),this[a](h),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof si||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&(se(a,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),se(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var a=i.latlng,h,b;this._tooltip.options.sticky&&i.originalEvent&&(h=this._map.mouseEventToContainerPoint(i.originalEvent),b=this._map.containerPointToLayerPoint(h),a=this._map.layerPointToLatLng(b)),this._tooltip.setLatLng(a)}});var uu=_r.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var a=i&&i.tagName==="DIV"?i:document.createElement("div"),h=this.options;if(h.html instanceof Element?(Hi(a),a.appendChild(h.html)):a.innerHTML=h.html!==!1?h.html:"",h.bgPos){var b=at(h.bgPos);a.style.backgroundPosition=-b.x+"px "+-b.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function Xp(i){return new uu(i)}_r.Default=Ss;var Es=Un.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Wt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){y(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),fe(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Cn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Yn(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof j?i:new j(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var a=this.getPane().children,h=-i(-1/0,1/0),b=0,T=a.length,z;b<T;b++)z=a[b].style.zIndex,a[b]!==this._container&&z&&(h=i(h,+z));isFinite(h)&&(this.options.zIndex=h+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Wt.ielt9){gn(this._container,this.options.opacity);var i=+new Date,a=!1,h=!1;for(var b in this._tiles){var T=this._tiles[b];if(!(!T.current||!T.loaded)){var z=Math.min(1,(i-T.loaded)/200);gn(T.el,z),z<1?a=!0:(T.active?h=!0:this._onOpaqueTile(T),T.active=!0)}}h&&!this._noPrune&&this._pruneTiles(),a&&(U(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Xt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,a=this.options.maxZoom;if(i!==void 0){for(var h in this._levels)h=Number(h),this._levels[h].el.children.length||h===i?(this._levels[h].el.style.zIndex=a-Math.abs(i-h),this._onUpdateLevel(h)):(fe(this._levels[h].el),this._removeTilesAtZoom(h),this._onRemoveLevel(h),delete this._levels[h]);var b=this._levels[i],T=this._map;return b||(b=this._levels[i]={},b.el=Xt("div","leaflet-tile-container leaflet-zoom-animated",this._container),b.el.style.zIndex=a,b.origin=T.project(T.unproject(T.getPixelOrigin()),i).round(),b.zoom=i,this._setZoomTransform(b,T.getCenter(),T.getZoom()),p(b.el.offsetWidth),this._onCreateLevel(b)),this._level=b,b}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var i,a,h=this._map.getZoom();if(h>this.options.maxZoom||h<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)a=this._tiles[i],a.retain=a.current;for(i in this._tiles)if(a=this._tiles[i],a.current&&!a.active){var b=a.coords;this._retainParent(b.x,b.y,b.z,b.z-5)||this._retainChildren(b.x,b.y,b.z,b.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var a in this._tiles)this._tiles[a].coords.z===i&&this._removeTile(a)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)fe(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,a,h,b){var T=Math.floor(i/2),z=Math.floor(a/2),Y=h-1,ut=new j(+T,+z);ut.z=+Y;var mt=this._tileCoordsToKey(ut),Lt=this._tiles[mt];return Lt&&Lt.active?(Lt.retain=!0,!0):(Lt&&Lt.loaded&&(Lt.retain=!0),Y>b?this._retainParent(T,z,Y,b):!1)},_retainChildren:function(i,a,h,b){for(var T=2*i;T<2*i+2;T++)for(var z=2*a;z<2*a+2;z++){var Y=new j(T,z);Y.z=h+1;var ut=this._tileCoordsToKey(Y),mt=this._tiles[ut];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);h+1<b&&this._retainChildren(T,z,h+1,b)}},_resetView:function(i){var a=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var a=this.options;return a.minNativeZoom!==void 0&&i<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<i?a.maxNativeZoom:i},_setView:function(i,a,h,b){var T=Math.round(a);this.options.maxZoom!==void 0&&T>this.options.maxZoom||this.options.minZoom!==void 0&&T<this.options.minZoom?T=void 0:T=this._clampZoom(T);var z=this.options.updateWhenZooming&&T!==this._tileZoom;(!b||z)&&(this._tileZoom=T,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),T!==void 0&&this._update(i),h||this._pruneTiles(),this._noPrune=!!h),this._setZoomTransforms(i,a)},_setZoomTransforms:function(i,a){for(var h in this._levels)this._setZoomTransform(this._levels[h],i,a)},_setZoomTransform:function(i,a,h){var b=this._map.getZoomScale(h,i.zoom),T=i.origin.multiplyBy(b).subtract(this._map._getNewPixelOrigin(a,h)).round();Wt.any3d?Vi(i.el,T,b):ze(i.el,T)},_resetGrid:function(){var i=this._map,a=i.options.crs,h=this._tileSize=this.getTileSize(),b=this._tileZoom,T=this._map.getPixelWorldBounds(this._tileZoom);T&&(this._globalTileRange=this._pxBoundsToTileRange(T)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,a.wrapLng[0]],b).x/h.x),Math.ceil(i.project([0,a.wrapLng[1]],b).x/h.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([a.wrapLat[0],0],b).y/h.x),Math.ceil(i.project([a.wrapLat[1],0],b).y/h.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var a=this._map,h=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),b=a.getZoomScale(h,this._tileZoom),T=a.project(i,this._tileZoom).floor(),z=a.getSize().divideBy(b*2);return new q(T.subtract(z),T.add(z))},_update:function(i){var a=this._map;if(a){var h=this._clampZoom(a.getZoom());if(i===void 0&&(i=a.getCenter()),this._tileZoom!==void 0){var b=this._getTiledPixelBounds(i),T=this._pxBoundsToTileRange(b),z=T.getCenter(),Y=[],ut=this.options.keepBuffer,mt=new q(T.getBottomLeft().subtract([ut,-ut]),T.getTopRight().add([ut,-ut]));if(!(isFinite(T.min.x)&&isFinite(T.min.y)&&isFinite(T.max.x)&&isFinite(T.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Lt in this._tiles){var Bt=this._tiles[Lt].coords;(Bt.z!==this._tileZoom||!mt.contains(new j(Bt.x,Bt.y)))&&(this._tiles[Lt].current=!1)}if(Math.abs(h-this._tileZoom)>1){this._setView(i,h);return}for(var $t=T.min.y;$t<=T.max.y;$t++)for(var he=T.min.x;he<=T.max.x;he++){var ln=new j(he,$t);if(ln.z=this._tileZoom,!!this._isValidTile(ln)){var We=this._tiles[this._tileCoordsToKey(ln)];We?We.current=!0:Y.push(ln)}}if(Y.sort(function(_n,br){return _n.distanceTo(z)-br.distanceTo(z)}),Y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Rn=document.createDocumentFragment();for(he=0;he<Y.length;he++)this._addTile(Y[he],Rn);this._level.el.appendChild(Rn)}}}},_isValidTile:function(i){var a=this._map.options.crs;if(!a.infinite){var h=this._globalTileRange;if(!a.wrapLng&&(i.x<h.min.x||i.x>h.max.x)||!a.wrapLat&&(i.y<h.min.y||i.y>h.max.y))return!1}if(!this.options.bounds)return!0;var b=this._tileCoordsToBounds(i);return Q(this.options.bounds).overlaps(b)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var a=this._map,h=this.getTileSize(),b=i.scaleBy(h),T=b.add(h),z=a.unproject(b,i.z),Y=a.unproject(T,i.z);return[z,Y]},_tileCoordsToBounds:function(i){var a=this._tileCoordsToNwSe(i),h=new Ct(a[0],a[1]);return this.options.noWrap||(h=this._map.wrapLatLngBounds(h)),h},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var a=i.split(":"),h=new j(+a[0],+a[1]);return h.z=+a[2],h},_removeTile:function(i){var a=this._tiles[i];a&&(fe(a.el),delete this._tiles[i],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){Yt(i,"leaflet-tile");var a=this.getTileSize();i.style.width=a.x+"px",i.style.height=a.y+"px",i.onselectstart=p,i.onmousemove=p,Wt.ielt9&&this.options.opacity<1&&gn(i,this.options.opacity)},_addTile:function(i,a){var h=this._getTilePos(i),b=this._tileCoordsToKey(i),T=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(T),this.createTile.length<2&&W(l(this._tileReady,this,i,null,T)),ze(T,h),this._tiles[b]={el:T,coords:i,current:!0},a.appendChild(T),this.fire("tileloadstart",{tile:T,coords:i})},_tileReady:function(i,a,h){a&&this.fire("tileerror",{error:a,tile:h,coords:i});var b=this._tileCoordsToKey(i);h=this._tiles[b],h&&(h.loaded=+new Date,this._map._fadeAnimated?(gn(h.el,0),U(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this)):(h.active=!0,this._pruneTiles()),a||(Yt(h.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:h.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Wt.ielt9||!this._map._fadeAnimated?W(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var a=new j(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return a.z=i.z,a},_pxBoundsToTileRange:function(i){var a=this.getTileSize();return new q(i.min.unscaleBy(a).floor(),i.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function qp(i){return new Es(i)}var xr=Es.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,a){this._url=i,a=y(this,a),a.detectRetina&&Wt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,a){return this._url===i&&a===void 0&&(a=!0),this._url=i,a||this.redraw(),this},createTile:function(i,a){var h=document.createElement("img");return se(h,"load",l(this._tileOnLoad,this,a,h)),se(h,"error",l(this._tileOnError,this,a,h)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(h.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(h.referrerPolicy=this.options.referrerPolicy),h.alt="",h.src=this.getTileUrl(i),h},getTileUrl:function(i){var a={r:Wt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var h=this._globalTileRange.max.y-i.y;this.options.tms&&(a.y=h),a["-y"]=h}return S(this._url,s(a,this.options))},_tileOnLoad:function(i,a){Wt.ielt9?setTimeout(l(i,this,null,a),0):i(null,a)},_tileOnError:function(i,a,h){var b=this.options.errorTileUrl;b&&a.getAttribute("src")!==b&&(a.src=b),i(h,a)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,a=this.options.maxZoom,h=this.options.zoomReverse,b=this.options.zoomOffset;return h&&(i=a-i),i+b},_getSubdomain:function(i){var a=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var i,a;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(a=this._tiles[i].el,a.onload=p,a.onerror=p,!a.complete)){a.src=N;var h=this._tiles[i].coords;fe(a),delete this._tiles[i],this.fire("tileabort",{tile:a,coords:h})}},_removeTile:function(i){var a=this._tiles[i];if(a)return a.el.setAttribute("src",N),Es.prototype._removeTile.call(this,i)},_tileReady:function(i,a,h){if(!(!this._map||h&&h.getAttribute("src")===N))return Es.prototype._tileReady.call(this,i,a,h)}});function hu(i,a){return new xr(i,a)}var du=xr.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,a){this._url=i;var h=s({},this.defaultWmsParams);for(var b in a)b in this.options||(h[b]=a[b]);a=y(this,a);var T=a.detectRetina&&Wt.retina?2:1,z=this.getTileSize();h.width=z.x*T,h.height=z.y*T,this.wmsParams=h},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,xr.prototype.onAdd.call(this,i)},getTileUrl:function(i){var a=this._tileCoordsToNwSe(i),h=this._crs,b=tt(h.project(a[0]),h.project(a[1])),T=b.min,z=b.max,Y=(this._wmsVersion>=1.3&&this._crs===ru?[T.y,T.x,z.y,z.x]:[T.x,T.y,z.x,z.y]).join(","),ut=xr.prototype.getTileUrl.call(this,i);return ut+g(this.wmsParams,ut,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+Y},setParams:function(i,a){return s(this.wmsParams,i),a||this.redraw(),this}});function jp(i,a){return new du(i,a)}xr.WMS=du,hu.wms=jp;var li=Un.extend({options:{padding:.1},initialize:function(i){y(this,i),u(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Yt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,a){var h=this._map.getZoomScale(a,this._zoom),b=this._map.getSize().multiplyBy(.5+this.options.padding),T=this._map.project(this._center,a),z=b.multiplyBy(-h).add(T).subtract(this._map._getNewPixelOrigin(i,a));Wt.any3d?Vi(this._container,z,h):ze(this._container,z)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,a=this._map.getSize(),h=this._map.containerPointToLayerPoint(a.multiplyBy(-i)).round();this._bounds=new q(h,h.add(a.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),fu=li.extend({options:{tolerance:0},getEvents:function(){var i=li.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){li.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");se(i,"mousemove",this._onMouseMove,this),se(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),se(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){U(this._redrawRequest),delete this._ctx,fe(this._container),xe(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var a in this._layers)i=this._layers[a],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){li.prototype._update.call(this);var i=this._bounds,a=this._container,h=i.getSize(),b=Wt.retina?2:1;ze(a,i.min),a.width=b*h.x,a.height=b*h.y,a.style.width=h.x+"px",a.style.height=h.y+"px",Wt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){li.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[u(i)]=i;var a=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var a=i._order,h=a.next,b=a.prev;h?h.prev=b:this._drawLast=b,b?b.next=h:this._drawFirst=h,delete i._order,delete this._layers[u(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var a=i.options.dashArray.split(/[, ]+/),h=[],b,T;for(T=0;T<a.length;T++){if(b=Number(a[T]),isNaN(b))return;h.push(b)}i.options._dashArray=h}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||W(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var a=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(i._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(i._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var a=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,a=this._redrawBounds;if(this._ctx.save(),a){var h=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,h.x,h.y),this._ctx.clip()}this._drawing=!0;for(var b=this._drawFirst;b;b=b.next)i=b.layer,(!a||i._pxBounds&&i._pxBounds.intersects(a))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,a){if(this._drawing){var h,b,T,z,Y=i._parts,ut=Y.length,mt=this._ctx;if(ut){for(mt.beginPath(),h=0;h<ut;h++){for(b=0,T=Y[h].length;b<T;b++)z=Y[h][b],mt[b?"lineTo":"moveTo"](z.x,z.y);a&&mt.closePath()}this._fillStroke(mt,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var a=i._point,h=this._ctx,b=Math.max(Math.round(i._radius),1),T=(Math.max(Math.round(i._radiusY),1)||b)/b;T!==1&&(h.save(),h.scale(1,T)),h.beginPath(),h.arc(a.x,a.y/T,b,0,Math.PI*2,!1),T!==1&&h.restore(),this._fillStroke(h,i)}},_fillStroke:function(i,a){var h=a.options;h.fill&&(i.globalAlpha=h.fillOpacity,i.fillStyle=h.fillColor||h.color,i.fill(h.fillRule||"evenodd")),h.stroke&&h.weight!==0&&(i.setLineDash&&i.setLineDash(a.options&&a.options._dashArray||[]),i.globalAlpha=h.opacity,i.lineWidth=h.weight,i.strokeStyle=h.color,i.lineCap=h.lineCap,i.lineJoin=h.lineJoin,i.stroke())},_onClick:function(i){for(var a=this._map.mouseEventToLayerPoint(i),h,b,T=this._drawFirst;T;T=T.next)h=T.layer,h.options.interactive&&h._containsPoint(a)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(h))&&(b=h);this._fireEvent(b?[b]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,a)}},_handleMouseOut:function(i){var a=this._hoveredLayer;a&&(be(this._container,"leaflet-interactive"),this._fireEvent([a],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,a){if(!this._mouseHoverThrottled){for(var h,b,T=this._drawFirst;T;T=T.next)h=T.layer,h.options.interactive&&h._containsPoint(a)&&(b=h);b!==this._hoveredLayer&&(this._handleMouseOut(i),b&&(Yt(this._container,"leaflet-interactive"),this._fireEvent([b],i,"mouseover"),this._hoveredLayer=b)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,a,h){this._map._fireDOMEvent(a,h||a.type,i)},_bringToFront:function(i){var a=i._order;if(a){var h=a.next,b=a.prev;if(h)h.prev=b;else return;b?b.next=h:h&&(this._drawFirst=h),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(i)}},_bringToBack:function(i){var a=i._order;if(a){var h=a.next,b=a.prev;if(b)b.next=h;else return;h?h.prev=b:b&&(this._drawLast=b),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(i)}}});function pu(i){return Wt.canvas?new fu(i):null}var Ts=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Yp={_initContainer:function(){this._container=Xt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(li.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var a=i._container=Ts("shape");Yt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",i._path=Ts("path"),a.appendChild(i._path),this._updateStyle(i),this._layers[u(i)]=i},_addPath:function(i){var a=i._container;this._container.appendChild(a),i.options.interactive&&i.addInteractiveTarget(a)},_removePath:function(i){var a=i._container;fe(a),i.removeInteractiveTarget(a),delete this._layers[u(i)]},_updateStyle:function(i){var a=i._stroke,h=i._fill,b=i.options,T=i._container;T.stroked=!!b.stroke,T.filled=!!b.fill,b.stroke?(a||(a=i._stroke=Ts("stroke")),T.appendChild(a),a.weight=b.weight+"px",a.color=b.color,a.opacity=b.opacity,b.dashArray?a.dashStyle=w(b.dashArray)?b.dashArray.join(" "):b.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=b.lineCap.replace("butt","flat"),a.joinstyle=b.lineJoin):a&&(T.removeChild(a),i._stroke=null),b.fill?(h||(h=i._fill=Ts("fill")),T.appendChild(h),h.color=b.fillColor||b.color,h.opacity=b.fillOpacity):h&&(T.removeChild(h),i._fill=null)},_updateCircle:function(i){var a=i._point.round(),h=Math.round(i._radius),b=Math.round(i._radiusY||h);this._setPath(i,i._empty()?"M0 0":"AL "+a.x+","+a.y+" "+h+","+b+" 0,"+65535*360)},_setPath:function(i,a){i._path.v=a},_bringToFront:function(i){Cn(i._container)},_bringToBack:function(i){Yn(i._container)}},Eo=Wt.vml?Ts:et,As=li.extend({_initContainer:function(){this._container=Eo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Eo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){fe(this._container),xe(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){li.prototype._update.call(this);var i=this._bounds,a=i.getSize(),h=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,h.setAttribute("width",a.x),h.setAttribute("height",a.y)),ze(h,i.min),h.setAttribute("viewBox",[i.min.x,i.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(i){var a=i._path=Eo("path");i.options.className&&Yt(a,i.options.className),i.options.interactive&&Yt(a,"leaflet-interactive"),this._updateStyle(i),this._layers[u(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){fe(i._path),i.removeInteractiveTarget(i._path),delete this._layers[u(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var a=i._path,h=i.options;a&&(h.stroke?(a.setAttribute("stroke",h.color),a.setAttribute("stroke-opacity",h.opacity),a.setAttribute("stroke-width",h.weight),a.setAttribute("stroke-linecap",h.lineCap),a.setAttribute("stroke-linejoin",h.lineJoin),h.dashArray?a.setAttribute("stroke-dasharray",h.dashArray):a.removeAttribute("stroke-dasharray"),h.dashOffset?a.setAttribute("stroke-dashoffset",h.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),h.fill?(a.setAttribute("fill",h.fillColor||h.color),a.setAttribute("fill-opacity",h.fillOpacity),a.setAttribute("fill-rule",h.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(i,a){this._setPath(i,$(i._parts,a))},_updateCircle:function(i){var a=i._point,h=Math.max(Math.round(i._radius),1),b=Math.max(Math.round(i._radiusY),1)||h,T="a"+h+","+b+" 0 1,0 ",z=i._empty()?"M0 0":"M"+(a.x-h)+","+a.y+T+h*2+",0 "+T+-h*2+",0 ";this._setPath(i,z)},_setPath:function(i,a){i._path.setAttribute("d",a)},_bringToFront:function(i){Cn(i._path)},_bringToBack:function(i){Yn(i._path)}});Wt.vml&&As.include(Yp);function mu(i){return Wt.svg||Wt.vml?new As(i):null}de.include({getRenderer:function(i){var a=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var a=this._paneRenderers[i];return a===void 0&&(a=this._createRenderer({pane:i}),this._paneRenderers[i]=a),a},_createRenderer:function(i){return this.options.preferCanvas&&pu(i)||mu(i)}});var gu=vr.extend({initialize:function(i,a){vr.prototype.initialize.call(this,this._boundsToLatLngs(i),a)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=Q(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function $p(i,a){return new gu(i,a)}As.create=Eo,As.pointsToPath=$,ai.geometryToLayer=vo,ai.coordsToLatLng=nl,ai.coordsToLatLngs=yo,ai.latLngToCoords=il,ai.latLngsToCoords=xo,ai.getFeature=yr,ai.asFeature=bo,de.mergeOptions({boxZoom:!0});var _u=Kn.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){se(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){xe(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){fe(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),vs(),Ba(),this._startPoint=this._map.mouseEventToContainerPoint(i),se(document,{contextmenu:Zi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Xt("div","leaflet-zoom-box",this._container),Yt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var a=new q(this._point,this._startPoint),h=a.getSize();ze(this._box,a.min),this._box.style.width=h.x+"px",this._box.style.height=h.y+"px"},_finish:function(){this._moved&&(fe(this._box),be(this._container,"leaflet-crosshair")),ys(),Fa(),xe(document,{contextmenu:Zi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new Ct(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});de.addInitHook("addHandler","boxZoom",_u),de.mergeOptions({doubleClickZoom:!0});var vu=Kn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var a=this._map,h=a.getZoom(),b=a.options.zoomDelta,T=i.originalEvent.shiftKey?h-b:h+b;a.options.doubleClickZoom==="center"?a.setZoom(T):a.setZoomAround(i.containerPoint,T)}});de.addInitHook("addHandler","doubleClickZoom",vu),de.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var yu=Kn.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new bi(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}Yt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){be(this._map._container,"leaflet-grab"),be(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=Q(this._map.options.maxBounds);this._offsetLimit=tt(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var a=this._lastTime=+new Date,h=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(h),this._times.push(a),this._prunePositions(a)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,a){return i-(i-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;i.x<a.min.x&&(i.x=this._viscousLimit(i.x,a.min.x)),i.y<a.min.y&&(i.y=this._viscousLimit(i.y,a.min.y)),i.x>a.max.x&&(i.x=this._viscousLimit(i.x,a.max.x)),i.y>a.max.y&&(i.y=this._viscousLimit(i.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,a=Math.round(i/2),h=this._initialWorldOffset,b=this._draggable._newPos.x,T=(b-a+h)%i+a-h,z=(b+a+h)%i-a-h,Y=Math.abs(T+h)<Math.abs(z+h)?T:z;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=Y},_onDragEnd:function(i){var a=this._map,h=a.options,b=!h.inertia||i.noInertia||this._times.length<2;if(a.fire("dragend",i),b)a.fire("moveend");else{this._prunePositions(+new Date);var T=this._lastPos.subtract(this._positions[0]),z=(this._lastTime-this._times[0])/1e3,Y=h.easeLinearity,ut=T.multiplyBy(Y/z),mt=ut.distanceTo([0,0]),Lt=Math.min(h.inertiaMaxSpeed,mt),Bt=ut.multiplyBy(Lt/mt),$t=Lt/(h.inertiaDeceleration*Y),he=Bt.multiplyBy(-$t/2).round();!he.x&&!he.y?a.fire("moveend"):(he=a._limitOffset(he,a.options.maxBounds),W(function(){a.panBy(he,{duration:$t,easeLinearity:Y,noMoveStart:!0,animate:!0})}))}}});de.addInitHook("addHandler","dragging",yu),de.mergeOptions({keyboard:!0,keyboardPanDelta:80});var xu=Kn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),se(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),xe(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,a=document.documentElement,h=i.scrollTop||a.scrollTop,b=i.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(b,h)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var a=this._panKeys={},h=this.keyCodes,b,T;for(b=0,T=h.left.length;b<T;b++)a[h.left[b]]=[-1*i,0];for(b=0,T=h.right.length;b<T;b++)a[h.right[b]]=[i,0];for(b=0,T=h.down.length;b<T;b++)a[h.down[b]]=[0,i];for(b=0,T=h.up.length;b<T;b++)a[h.up[b]]=[0,-1*i]},_setZoomDelta:function(i){var a=this._zoomKeys={},h=this.keyCodes,b,T;for(b=0,T=h.zoomIn.length;b<T;b++)a[h.zoomIn[b]]=i;for(b=0,T=h.zoomOut.length;b<T;b++)a[h.zoomOut[b]]=-i},_addHooks:function(){se(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){xe(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var a=i.keyCode,h=this._map,b;if(a in this._panKeys){if(!h._panAnim||!h._panAnim._inProgress)if(b=this._panKeys[a],i.shiftKey&&(b=at(b).multiplyBy(3)),h.options.maxBounds&&(b=h._limitOffset(at(b),h.options.maxBounds)),h.options.worldCopyJump){var T=h.wrapLatLng(h.unproject(h.project(h.getCenter()).add(b)));h.panTo(T)}else h.panBy(b)}else if(a in this._zoomKeys)h.setZoom(h.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&h._popup&&h._popup.options.closeOnEscapeKey)h.closePopup();else return;Zi(i)}}});de.addInitHook("addHandler","keyboard",xu),de.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var bu=Kn.extend({addHooks:function(){se(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){xe(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var a=Zc(i),h=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var b=Math.max(h-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),b),Zi(i)},_performZoom:function(){var i=this._map,a=i.getZoom(),h=this._map.options.zoomSnap||0;i._stop();var b=this._delta/(this._map.options.wheelPxPerZoomLevel*4),T=4*Math.log(2/(1+Math.exp(-Math.abs(b))))/Math.LN2,z=h?Math.ceil(T/h)*h:T,Y=i._limitZoom(a+(this._delta>0?z:-z))-a;this._delta=0,this._startTime=null,Y&&(i.options.scrollWheelZoom==="center"?i.setZoom(a+Y):i.setZoomAround(this._lastMousePos,a+Y))}});de.addInitHook("addHandler","scrollWheelZoom",bu);var Kp=600;de.mergeOptions({tapHold:Wt.touchNative&&Wt.safari&&Wt.mobile,tapTolerance:15});var wu=Kn.extend({addHooks:function(){se(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){xe(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var a=i.touches[0];this._startPos=this._newPos=new j(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(se(document,"touchend",$e),se(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),Kp),se(document,"touchend touchcancel contextmenu",this._cancel,this),se(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){xe(document,"touchend",$e),xe(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),xe(document,"touchend touchcancel contextmenu",this._cancel,this),xe(document,"touchmove",this._onMove,this)},_onMove:function(i){var a=i.touches[0];this._newPos=new j(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,a){var h=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});h._simulated=!0,a.target.dispatchEvent(h)}});de.addInitHook("addHandler","tapHold",wu),de.mergeOptions({touchZoom:Wt.touch,bounceAtZoomLimits:!0});var Mu=Kn.extend({addHooks:function(){Yt(this._map._container,"leaflet-touch-zoom"),se(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){be(this._map._container,"leaflet-touch-zoom"),xe(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var a=this._map;if(!(!i.touches||i.touches.length!==2||a._animatingZoom||this._zooming)){var h=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(h.add(b)._divideBy(2))),this._startDist=h.distanceTo(b),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),se(document,"touchmove",this._onTouchMove,this),se(document,"touchend touchcancel",this._onTouchEnd,this),$e(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var a=this._map,h=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]),T=h.distanceTo(b)/this._startDist;if(this._zoom=a.getScaleZoom(T,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&T<1||this._zoom>a.getMaxZoom()&&T>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,T===1)return}else{var z=h._add(b)._divideBy(2)._subtract(this._centerPoint);if(T===1&&z.x===0&&z.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(z),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),U(this._animRequest);var Y=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=W(Y,this,!0),$e(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,U(this._animRequest),xe(document,"touchmove",this._onTouchMove,this),xe(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});de.addInitHook("addHandler","touchZoom",Mu),de.BoxZoom=_u,de.DoubleClickZoom=vu,de.Drag=yu,de.Keyboard=xu,de.ScrollWheelZoom=bu,de.TapHold=wu,de.TouchZoom=Mu,e.Bounds=q,e.Browser=Wt,e.CRS=St,e.Canvas=fu,e.Circle=el,e.CircleMarker=_o,e.Class=C,e.Control=kn,e.DivIcon=uu,e.DivOverlay=Jn,e.DomEvent=mp,e.DomUtil=fp,e.Draggable=bi,e.Evented=rt,e.FeatureGroup=si,e.GeoJSON=ai,e.GridLayer=Es,e.Handler=Kn,e.Icon=_r,e.ImageOverlay=wo,e.LatLng=it,e.LatLngBounds=Ct,e.Layer=Un,e.LayerGroup=gr,e.LineUtil=Lp,e.Map=de,e.Marker=go,e.Mixin=wp,e.Path=wi,e.Point=j,e.PolyUtil=Mp,e.Polygon=vr,e.Polyline=oi,e.Popup=Mo,e.PosAnimation=Xc,e.Projection=Cp,e.Rectangle=gu,e.Renderer=li,e.SVG=As,e.SVGOverlay=cu,e.TileLayer=xr,e.Tooltip=So,e.Transformation=ot,e.Util=F,e.VideoOverlay=lu,e.bind=l,e.bounds=tt,e.canvas=pu,e.circle=Up,e.circleMarker=kp,e.control=ws,e.divIcon=Xp,e.extend=s,e.featureGroup=Dp,e.geoJSON=au,e.geoJson=Fp,e.gridLayer=qp,e.icon=Np,e.imageOverlay=Hp,e.latLng=wt,e.latLngBounds=Q,e.layerGroup=Ip,e.map=gp,e.marker=Op,e.point=at,e.polygon=Bp,e.polyline=zp,e.popup=Wp,e.rectangle=$p,e.setOptions=y,e.stamp=u,e.svg=mu,e.svgOverlay=Gp,e.tileLayer=hu,e.tooltip=Zp,e.transformation=xt,e.version=n,e.videoOverlay=Vp;var Jp=window.L;e.noConflict=function(){return window.L=Jp,this},window.L=e})})(Jl,Jl.exports);var lm=Jl.exports;const Me=Pd(lm),yt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function Rd(){const r=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:r("c-base")||"#eeebe6",terrainRes:Number(r("t-res"))||128,exag:Number(r("dp-exag")||r("t-exag"))||1,smooth:Number(r("t-smooth"))||1,baseH:Number(r("dp-base")||r("t-base-h"))||5,maxDim:Number(r("t-maxdim"))||200,elevZoom:Number(r("t-zoom"))||15,waterOn:t("water-on"),waterCol:r("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:r("road-col")||"#262626",buildOn:t("build-on"),buildCol:r("build-col")||"#9090a0",buildHS:Number(r("build-hs"))||1,gpxCol:r("gpx-col")||"#ff4500",gpxH:Number(r("gpx-h"))||1.2,gpxMW:Number(r("gpx-mw"))||1.5,gpxTW:Number(r("gpx-tw"))||3}}let Qs=null,Gt,qe=null,Tn=null,gi=null,De=null,Ie=null,Dn=[],Ke=[],Xe=null,hn=null,Ls=null,$r="none",wr=[];const cm={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function um(r){r&&(Qs=r);const t=Me.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Me.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Me.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),s=Me.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),o=Me.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Gt=Me.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Me.control.zoom({position:"topright"}).addTo(Gt),Me.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:s,Voyager:o,"IGN (France)":n},{},{position:"topright"}).addTo(Gt),new ResizeObserver(()=>Gt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Gt.invalidateSize(),300),gm(),fm(),_m(),vm(),mm()}function Au(r,t){return[[r.lat,r.lng],[r.lat,t.lng],[t.lat,t.lng],[t.lat,r.lng]]}function Lu(r,t){const e=(r.lat+t.lat)/2,n=Math.abs(t.lat-r.lat)*111320,s=Math.abs(t.lng-r.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),u=Math.min(r.lat,t.lat),d=Math.min(r.lng,t.lng);return[[u,d],[u,d+c],[u+l,d+c],[u+l,d]]}function Cu(r,t,e=80){const n=r.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[r.lat+n*Math.cos(l)/111320,r.lng+n*Math.sin(l)/(111320*Math.cos(r.lat*Math.PI/180))]})}function Pu(r,t){const e=r.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[r.lat+e*Math.cos(o)/111320,r.lng+e*Math.sin(o)/(111320*Math.cos(r.lat*Math.PI/180))]})}function Id(r){De&&De!==r&&(Ie=null,Dn=[],Ke=[],Xe&&(Gt.removeLayer(Xe),Xe=null),hn&&(Gt.removeLayer(hn),hn=null)),De=r,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===r)}),Gt.getContainer().classList.toggle("dm",!!r);const t=document.getElementById("dch");t.style.display=r?"block":"none",r&&(t.textContent=cm[r]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=r==="trace"?"block":"none",r!=="trace"&&(e.textContent="0 points tracés"),!r){const n=document.getElementById("snap");n&&(n.style.display="none")}}function aa(r=!0){Xe&&(Gt.removeLayer(Xe),Xe=null),hn&&(Gt.removeLayer(hn),hn=null),Ie=null,Dn=[],Ke=[],r&&Id(null)}function la(r,t){return t?Gt.latLngToContainerPoint(r).distanceTo(Gt.latLngToContainerPoint(t)):9999}function Ru(r){const t=[];Dn.length>2&&t.push(Dn[0]),Ke.length>2&&t.push(Ke[0]),gi&&t.push(gi.getLatLng());let e=null,n=9999;for(const s of t){const o=la(r,s);o<18&&o<n&&(n=o,e=s)}return e}function hm(r,t){const e=document.getElementById("snap");if(!e)return;if(!t||la(r,t)>18){e.style.display="none";return}const n=Gt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function dm(){document.getElementById("zone-controls")?.classList.add("visible"),Ql()}function Dd(){document.getElementById("zone-controls")?.classList.remove("visible"),Nd("none")}function Ql(){if(!yt.bounds)return;const r=document.getElementById("zone-controls");if(!r)return;const t=Me.latLng(yt.bounds.maxLat,yt.bounds.maxLon),e=Gt.latLngToContainerPoint(t),n=40;r.style.left=e.x+10+"px",r.style.top=Math.max(10,e.y-n/2)+"px"}function Nd(r){$r==="move"&&r!=="move"&&(Gt.dragging.enable(),Gt.getContainer().style.cursor=""),$r=r,document.getElementById("zc-move")?.classList.toggle("active",r==="move"),r==="move"&&(Gt.dragging.disable(),Gt.getContainer().style.cursor="grab")}function Od(r){qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const t=r.map(u=>u[0]),e=r.map(u=>u[1]);yt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(yt.bounds.minLat+yt.bounds.maxLat)/2,s=(yt.bounds.maxLon-yt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,o=(yt.bounds.maxLat-yt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(o,s);yt.wMm=Math.round(s*c),yt.dMm=Math.round(o*c),Qs?.()}function Iu(r){if(!yt.zonePts)return;const t=yt.zonePts.map(l=>l[0]),e=yt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,s=(Math.min(...e)+Math.max(...e))/2,o=yt.zonePts.map(([l,c])=>[n+(l-n)*r,s+(c-s)*r]);yt.zonePts=o,Od(o)}function fm(){document.getElementById("zc-delete")?.addEventListener("click",()=>{qe&&(Gt.removeLayer(qe),qe=null),yt.bounds=null,yt.zonePts=null,Dd(),Qs?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>Iu(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>Iu(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{Nd($r==="move"?"none":"move")});let r=null;Gt.getContainer().addEventListener("mousedown",t=>{$r!=="move"||!yt.zonePts||(r={x:t.clientX,y:t.clientY},wr=yt.zonePts.map(e=>[e[0],e[1]]),Gt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if($r!=="move"||!r||!wr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Me.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(Me.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=wr.map(([u,d])=>[u+o,d+l]);qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt)}),document.addEventListener("mouseup",t=>{if($r!=="move"||!r||!wr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Me.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(Me.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=wr.map(([u,d])=>[u+o,d+l]);r=null,wr=[],yt.zonePts=c,Od(c),Ql(),Gt.getContainer().style.cursor="grab"}),Gt.on("move zoom moveend zoomend",Ql)}function Cs(r,t){qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const e=r.map(d=>d[0]),n=r.map(d=>d[1]);yt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},yt.zonePts=r,yt.zoneType=t;const s=(yt.bounds.minLat+yt.bounds.maxLat)/2,o=(yt.bounds.maxLon-yt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(yt.bounds.maxLat-yt.bounds.minLat)*111320,u=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);yt.realW=o,yt.realH=l,yt.wMm=Math.round(o*u),yt.dMm=Math.round(l*u),Qs?.(),dm(),aa()}function pm(){Tn&&(Gt.removeLayer(Tn),Tn=null),!(Ke.length<2)&&(Tn=Me.polyline(Ke,{color:"#ff0000",weight:4,opacity:.9}).addTo(Gt))}function Du(r){const t=document.getElementById("snap");if(t&&(t.style.display="none"),hn&&(Gt.removeLayer(hn),hn=null),r.length<2){aa();return}yt.gpxPoints=r.map(n=>({lat:n.lat,lon:n.lng})),kd(),Ud(`✏️ ${r.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),aa()}function kd(){Tn&&(Gt.removeLayer(Tn),Tn=null),!(yt.gpxPoints.length<2)&&(Tn=Me.polyline(yt.gpxPoints.map(r=>[r.lat,r.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Gt))}function Ud(r){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=r,t.style.display="block")}function mm(){Gt.on("mousemove",r=>{if(!De)return;const t=r.latlng,e=Ru(t);hm(t,e??Ie);const n=e??t;if((De==="rect"||De==="sq")&&Ie){const s=De==="sq"?Lu(Ie,n):Au(Ie,n);Xe?Xe.setLatLngs(s):Xe=Me.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Gt)}else if((De==="circ"||De==="hex")&&Ie){const s=De==="circ"?Cu(Ie,n):Pu(Ie,n);Xe?Xe.setLatLngs(s):Xe=Me.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Gt)}else if(De==="poly"&&Dn.length>0){const s=[...Dn,n];Xe?Xe.setLatLngs(s):Xe=Me.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Gt)}else if(De==="trace"&&Ke.length>0){const s=[...Ke,n];Xe?Xe.setLatLngs(s):Xe=Me.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Gt)}}),Gt.on("click",r=>{if(!De)return;const t=r.latlng,e=Ru(t),n=e??t;if(De==="rect"){if(!Ie){Ie=n;return}Cs(Au(Ie,n),"rect")}else if(De==="sq"){if(!Ie){Ie=n;return}Cs(Lu(Ie,n),"rect")}else if(De==="circ"){if(!Ie){Ie=n;return}Cs(Cu(Ie,n),"circ")}else if(De==="hex"){if(!Ie){Ie=n;return}Cs(Pu(Ie,n),"hex")}else if(De==="poly"){if(Dn.length>2&&la(t,Dn[0])<18){Cs(Dn.map(s=>[s.lat,s.lng]),"poly");return}Dn.push(n),Dn.length===1&&(hn&&Gt.removeLayer(hn),hn=Me.circleMarker(Dn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt))}else De==="trace"&&(Ls&&clearTimeout(Ls),Ls=setTimeout(()=>{if(Ke.length>2&&la(t,Ke[0])<18){Du(Ke);return}Ke.push(e??t);const s=Ke.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(hn&&Gt.removeLayer(hn),hn=Me.circleMarker(Ke[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt)),pm()},220))}),Gt.on("dblclick",r=>{De==="trace"&&Ke.length>=2&&(Ls&&clearTimeout(Ls),Du(Ke),r.originalEvent.preventDefault())})}function gm(){["rect","sq","circ","hex","poly","trace"].forEach(r=>{document.getElementById("db-"+r)?.addEventListener("click",()=>{Id(De===r?null:r)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{aa(),qe&&(Gt.removeLayer(qe),qe=null),Tn&&(Gt.removeLayer(Tn),Tn=null),gi&&(Gt.removeLayer(gi),gi=null),yt.bounds=null,yt.zonePts=null,yt.gpxPoints=[],Ke=[],Dd();const r=document.getElementById("gpx-badge");r&&(r.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),Qs?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!yt.bounds)return;const r=yt.bounds;Gt.fitBounds([[r.minLat,r.minLon],[r.maxLat,r.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!yt.gpxPoints.length)return;const r=yt.gpxPoints.map(e=>e.lat),t=yt.gpxPoints.map(e=>e.lon);Gt.fitBounds([[Math.min(...r),Math.min(...t)],[Math.max(...r),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function _m(){document.getElementById("gpx-file")?.addEventListener("change",function(){const r=this.files?.[0];if(!r)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(u=>({lat:parseFloat(u.getAttribute("lat")),lon:parseFloat(u.getAttribute("lon"))})).filter(u=>!isNaN(u.lat)&&!isNaN(u.lon));if(!o.length)return;yt.gpxPoints=o,kd(),Tn&&Gt.fitBounds(Tn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let u=1;u<o.length;u++){const f=(o[u].lat-o[u-1].lat)*Math.PI/180,p=(o[u].lon-o[u-1].lon)*Math.PI/180,_=Math.sin(f/2)**2+Math.cos(o[u-1].lat*Math.PI/180)*Math.cos(o[u].lat*Math.PI/180)*Math.sin(p/2)**2;l+=6371*2*Math.atan2(Math.sqrt(_),Math.sqrt(1-_))}Ud(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(r)})}let Nu;function vm(){const r=document.getElementById("srch-input"),t=document.getElementById("srch-drop");r?.addEventListener("input",function(){clearTimeout(Nu);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(Nu=setTimeout(()=>ym(e),120))}),r?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function ym(r){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),u=this.dataset.bb.split(",").map(Number);gi&&(Gt.removeLayer(gi),gi=null),gi=Me.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Gt),Gt.fitBounds([[u[0],u[2]],[u[1],u[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vc="163",Mr={ROTATE:0,DOLLY:1,PAN:2},Sr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xm=0,Ou=1,bm=2,zd=1,wm=2,mi=3,Ui=0,xn=1,dn=2,Di=0,ns=1,ku=2,Uu=3,zu=4,Mm=5,tr=100,Sm=101,Em=102,Tm=103,Am=104,Lm=200,Cm=201,Pm=202,Rm=203,tc=204,ec=205,Im=206,Dm=207,Nm=208,Om=209,km=210,Um=211,zm=212,Bm=213,Fm=214,Hm=0,Vm=1,Gm=2,ca=3,Wm=4,Zm=5,Xm=6,qm=7,yc=0,jm=1,Ym=2,Ni=0,Bd=1,$m=2,Km=3,Jm=4,Qm=5,tg=6,eg=7,Fd=300,as=301,ls=302,nc=303,ic=304,Ta=306,rc=1e3,rr=1001,sc=1002,Nn=1003,ng=1004,Ao=1005,Gn=1006,al=1007,sr=1008,Oi=1009,ig=1010,rg=1011,Hd=1012,Vd=1013,cs=1014,Ii=1015,ua=1016,Gd=1017,Wd=1018,to=1020,sg=35902,og=1021,ag=1022,ni=1023,lg=1024,cg=1025,is=1026,js=1027,ug=1028,Zd=1029,hg=1030,Xd=1031,qd=1033,ll=33776,cl=33777,ul=33778,hl=33779,Bu=35840,Fu=35841,Hu=35842,Vu=35843,jd=36196,Gu=37492,Wu=37496,Zu=37808,Xu=37809,qu=37810,ju=37811,Yu=37812,$u=37813,Ku=37814,Ju=37815,Qu=37816,th=37817,eh=37818,nh=37819,ih=37820,rh=37821,dl=36492,sh=36494,oh=36495,dg=36283,ah=36284,lh=36285,ch=36286,fg=3200,pg=3201,xc=0,mg=1,Ri="",Qn="srgb",Bi="srgb-linear",bc="display-p3",Aa="display-p3-linear",ha="linear",we="srgb",da="rec709",fa="p3",Er=7680,uh=519,gg=512,_g=513,vg=514,Yd=515,yg=516,xg=517,bg=518,wg=519,hh=35044,dh="300 es",_i=2e3,pa=2001;class dr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hs=Math.PI/180,oc=180/Math.PI;function ds(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[r&255]+en[r>>8&255]+en[r>>16&255]+en[r>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function je(r,t,e){return Math.max(t,Math.min(e,r))}function Mg(r,t){return(r%t+t)%t}function fl(r,t,e){return(1-e)*r+e*t}function Ps(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function vn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Sg={DEG2RAD:Hs};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,e,n,s,o,l,c,u,d){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,d)}set(t,e,n,s,o,l,c,u,d){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=u,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],u=n[6],d=n[1],f=n[4],p=n[7],_=n[2],m=n[5],x=n[8],y=s[0],g=s[3],v=s[6],S=s[1],w=s[4],P=s[7],N=s[2],O=s[5],k=s[8];return o[0]=l*y+c*S+u*N,o[3]=l*g+c*w+u*O,o[6]=l*v+c*P+u*k,o[1]=d*y+f*S+p*N,o[4]=d*g+f*w+p*O,o[7]=d*v+f*P+p*k,o[2]=_*y+m*S+x*N,o[5]=_*g+m*w+x*O,o[8]=_*v+m*P+x*k,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*o*f+n*c*u+s*o*d-s*l*u}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8],p=f*l-c*d,_=c*u-f*o,m=d*o-l*u,x=e*p+n*_+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return t[0]=p*y,t[1]=(s*d-f*n)*y,t[2]=(c*n-s*l)*y,t[3]=_*y,t[4]=(f*e-s*u)*y,t[5]=(s*o-c*e)*y,t[6]=m*y,t[7]=(n*u-d*e)*y,t[8]=(l*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const u=Math.cos(o),d=Math.sin(o);return this.set(n*u,n*d,-n*(u*l+d*c)+l+t,-s*d,s*u,-s*(-d*l+u*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(pl.makeScale(t,e)),this}rotate(t){return this.premultiply(pl.makeRotation(-t)),this}translate(t,e){return this.premultiply(pl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const pl=new ce;function $d(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ma(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Eg(){const r=ma("canvas");return r.style.display="block",r}const fh={};function Tg(r){r in fh||(fh[r]=!0,console.warn(r))}const ph=new ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),mh=new ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Lo={[Bi]:{transfer:ha,primaries:da,toReference:r=>r,fromReference:r=>r},[Qn]:{transfer:we,primaries:da,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Aa]:{transfer:ha,primaries:fa,toReference:r=>r.applyMatrix3(mh),fromReference:r=>r.applyMatrix3(ph)},[bc]:{transfer:we,primaries:fa,toReference:r=>r.convertSRGBToLinear().applyMatrix3(mh),fromReference:r=>r.applyMatrix3(ph).convertLinearToSRGB()}},Ag=new Set([Bi,Aa]),ge={enabled:!0,_workingColorSpace:Bi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Ag.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Lo[t].toReference,s=Lo[e].fromReference;return s(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Lo[r].primaries},getTransfer:function(r){return r===Ri?ha:Lo[r].transfer}};function rs(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ml(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Tr;class Lg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Tr===void 0&&(Tr=ma("canvas")),Tr.width=t.width,Tr.height=t.height;const n=Tr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Tr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ma("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=rs(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(rs(e[n]/255)*255):e[n]=rs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Cg=0;class Kd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cg++}),this.uuid=ds(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push(gl(s[l].image)):o.push(gl(s[l]))}else o=gl(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function gl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Lg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Pg=0;class pn extends dr{constructor(t=pn.DEFAULT_IMAGE,e=pn.DEFAULT_MAPPING,n=rr,s=rr,o=Gn,l=sr,c=ni,u=Oi,d=pn.DEFAULT_ANISOTROPY,f=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=ds(),this.name="",this.source=new Kd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=u,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Fd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case rc:t.x=t.x-Math.floor(t.x);break;case rr:t.x=t.x<0?0:1;break;case sc:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case rc:t.y=t.y-Math.floor(t.y);break;case rr:t.y=t.y<0?0:1;break;case sc:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=Fd;pn.DEFAULT_ANISOTROPY=1;class Ye{constructor(t=0,e=0,n=0,s=1){Ye.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const u=t.elements,d=u[0],f=u[4],p=u[8],_=u[1],m=u[5],x=u[9],y=u[2],g=u[6],v=u[10];if(Math.abs(f-_)<.01&&Math.abs(p-y)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+_)<.1&&Math.abs(p+y)<.1&&Math.abs(x+g)<.1&&Math.abs(d+m+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(d+1)/2,P=(m+1)/2,N=(v+1)/2,O=(f+_)/4,k=(p+y)/4,H=(x+g)/4;return w>P&&w>N?w<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(w),s=O/n,o=k/n):P>N?P<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(P),n=O/s,o=H/s):N<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(N),n=k/o,s=H/o),this.set(n,s,o,e),this}let S=Math.sqrt((g-x)*(g-x)+(p-y)*(p-y)+(_-f)*(_-f));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(p-y)/S,this.z=(_-f)/S,this.w=Math.acos((d+m+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Rg extends dr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ye(0,0,t,e),this.scissorTest=!1,this.viewport=new Ye(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new pn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Kd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ar extends Rg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Jd extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=rr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ig extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=rr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let u=n[s+0],d=n[s+1],f=n[s+2],p=n[s+3];const _=o[l+0],m=o[l+1],x=o[l+2],y=o[l+3];if(c===0){t[e+0]=u,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(c===1){t[e+0]=_,t[e+1]=m,t[e+2]=x,t[e+3]=y;return}if(p!==y||u!==_||d!==m||f!==x){let g=1-c;const v=u*_+d*m+f*x+p*y,S=v>=0?1:-1,w=1-v*v;if(w>Number.EPSILON){const N=Math.sqrt(w),O=Math.atan2(N,v*S);g=Math.sin(g*O)/N,c=Math.sin(c*O)/N}const P=c*S;if(u=u*g+_*P,d=d*g+m*P,f=f*g+x*P,p=p*g+y*P,g===1-c){const N=1/Math.sqrt(u*u+d*d+f*f+p*p);u*=N,d*=N,f*=N,p*=N}}t[e]=u,t[e+1]=d,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],u=n[s+1],d=n[s+2],f=n[s+3],p=o[l],_=o[l+1],m=o[l+2],x=o[l+3];return t[e]=c*x+f*p+u*m-d*_,t[e+1]=u*x+f*_+d*p-c*m,t[e+2]=d*x+f*m+c*_-u*p,t[e+3]=f*x-c*p-u*_-d*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,u=Math.sin,d=c(n/2),f=c(s/2),p=c(o/2),_=u(n/2),m=u(s/2),x=u(o/2);switch(l){case"XYZ":this._x=_*f*p+d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p-_*m*x;break;case"YXZ":this._x=_*f*p+d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p+_*m*x;break;case"ZXY":this._x=_*f*p-d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p-_*m*x;break;case"ZYX":this._x=_*f*p-d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p+_*m*x;break;case"YZX":this._x=_*f*p+d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p-_*m*x;break;case"XZY":this._x=_*f*p-d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p+_*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],u=e[9],d=e[2],f=e[6],p=e[10],_=n+c+p;if(_>0){const m=.5/Math.sqrt(_+1);this._w=.25/m,this._x=(f-u)*m,this._y=(o-d)*m,this._z=(l-s)*m}else if(n>c&&n>p){const m=2*Math.sqrt(1+n-c-p);this._w=(f-u)/m,this._x=.25*m,this._y=(s+l)/m,this._z=(o+d)/m}else if(c>p){const m=2*Math.sqrt(1+c-n-p);this._w=(o-d)/m,this._x=(s+l)/m,this._y=.25*m,this._z=(u+f)/m}else{const m=2*Math.sqrt(1+p-n-c);this._w=(l-s)/m,this._x=(o+d)/m,this._y=(u+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,u=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+s*d-o*u,this._y=s*f+l*u+o*c-n*d,this._z=o*f+l*d+n*u-s*c,this._w=l*f-n*c-s*u-o*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const u=1-c*c;if(u<=Number.EPSILON){const m=1-e;return this._w=m*l+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const d=Math.sqrt(u),f=Math.atan2(d,c),p=Math.sin((1-e)*f)/d,_=Math.sin(e*f)/d;return this._w=l*p+this._w*_,this._x=n*p+this._x*_,this._y=s*p+this._y*_,this._z=o*p+this._z*_,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,e=0,n=0){J.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,u=t.w,d=2*(l*s-c*n),f=2*(c*e-o*s),p=2*(o*n-l*e);return this.x=e+u*d+l*p-c*f,this.y=n+u*f+c*d-o*p,this.z=s+u*p+o*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,u=e.z;return this.x=s*u-o*c,this.y=o*l-n*u,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return _l.copy(this).projectOnVector(t),this.sub(_l)}reflect(t){return this.sub(_l.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _l=new J,gh=new lr;class eo{constructor(t=new J(1/0,1/0,1/0),e=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,zn):zn.fromBufferAttribute(o,l),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Co.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Co.copy(n.boundingBox)),Co.applyMatrix4(t.matrixWorld),this.union(Co)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Rs),Po.subVectors(this.max,Rs),Ar.subVectors(t.a,Rs),Lr.subVectors(t.b,Rs),Cr.subVectors(t.c,Rs),Si.subVectors(Lr,Ar),Ei.subVectors(Cr,Lr),qi.subVectors(Ar,Cr);let e=[0,-Si.z,Si.y,0,-Ei.z,Ei.y,0,-qi.z,qi.y,Si.z,0,-Si.x,Ei.z,0,-Ei.x,qi.z,0,-qi.x,-Si.y,Si.x,0,-Ei.y,Ei.x,0,-qi.y,qi.x,0];return!vl(e,Ar,Lr,Cr,Po)||(e=[1,0,0,0,1,0,0,0,1],!vl(e,Ar,Lr,Cr,Po))?!1:(Ro.crossVectors(Si,Ei),e=[Ro.x,Ro.y,Ro.z],vl(e,Ar,Lr,Cr,Po))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ci=[new J,new J,new J,new J,new J,new J,new J,new J],zn=new J,Co=new eo,Ar=new J,Lr=new J,Cr=new J,Si=new J,Ei=new J,qi=new J,Rs=new J,Po=new J,Ro=new J,ji=new J;function vl(r,t,e,n,s){for(let o=0,l=r.length-3;o<=l;o+=3){ji.fromArray(r,o);const c=s.x*Math.abs(ji.x)+s.y*Math.abs(ji.y)+s.z*Math.abs(ji.z),u=t.dot(ji),d=e.dot(ji),f=n.dot(ji);if(Math.max(-Math.max(u,d,f),Math.min(u,d,f))>c)return!1}return!0}const Dg=new eo,Is=new J,yl=new J;class La{constructor(t=new J,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Dg.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Is.subVectors(t,this.center);const e=Is.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Is,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(yl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Is.copy(t.center).add(yl)),this.expandByPoint(Is.copy(t.center).sub(yl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new J,xl=new J,Io=new J,Ti=new J,bl=new J,Do=new J,wl=new J;class Ca{constructor(t=new J,e=new J(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ui.copy(this.origin).addScaledVector(this.direction,e),ui.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){xl.copy(t).add(e).multiplyScalar(.5),Io.copy(e).sub(t).normalize(),Ti.copy(this.origin).sub(xl);const o=t.distanceTo(e)*.5,l=-this.direction.dot(Io),c=Ti.dot(this.direction),u=-Ti.dot(Io),d=Ti.lengthSq(),f=Math.abs(1-l*l);let p,_,m,x;if(f>0)if(p=l*u-c,_=l*c-u,x=o*f,p>=0)if(_>=-x)if(_<=x){const y=1/f;p*=y,_*=y,m=p*(p+l*_+2*c)+_*(l*p+_+2*u)+d}else _=o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+d;else _=-o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+d;else _<=-x?(p=Math.max(0,-(-l*o+c)),_=p>0?-o:Math.min(Math.max(-o,-u),o),m=-p*p+_*(_+2*u)+d):_<=x?(p=0,_=Math.min(Math.max(-o,-u),o),m=_*(_+2*u)+d):(p=Math.max(0,-(l*o+c)),_=p>0?o:Math.min(Math.max(-o,-u),o),m=-p*p+_*(_+2*u)+d);else _=l>0?-o:o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(xl).addScaledVector(Io,_),m}intersectSphere(t,e){ui.subVectors(t.center,this.origin);const n=ui.dot(this.direction),s=ui.dot(ui)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,u=n+l;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,u;const d=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,_=this.origin;return d>=0?(n=(t.min.x-_.x)*d,s=(t.max.x-_.x)*d):(n=(t.max.x-_.x)*d,s=(t.min.x-_.x)*d),f>=0?(o=(t.min.y-_.y)*f,l=(t.max.y-_.y)*f):(o=(t.max.y-_.y)*f,l=(t.min.y-_.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),p>=0?(c=(t.min.z-_.z)*p,u=(t.max.z-_.z)*p):(c=(t.max.z-_.z)*p,u=(t.min.z-_.z)*p),n>u||c>s)||((c>n||n!==n)&&(n=c),(u<s||s!==s)&&(s=u),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ui)!==null}intersectTriangle(t,e,n,s,o){bl.subVectors(e,t),Do.subVectors(n,t),wl.crossVectors(bl,Do);let l=this.direction.dot(wl),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Ti.subVectors(this.origin,t);const u=c*this.direction.dot(Do.crossVectors(Ti,Do));if(u<0)return null;const d=c*this.direction.dot(bl.cross(Ti));if(d<0||u+d>l)return null;const f=-c*Ti.dot(wl);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Te{constructor(t,e,n,s,o,l,c,u,d,f,p,_,m,x,y,g){Te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,d,f,p,_,m,x,y,g)}set(t,e,n,s,o,l,c,u,d,f,p,_,m,x,y,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=s,v[1]=o,v[5]=l,v[9]=c,v[13]=u,v[2]=d,v[6]=f,v[10]=p,v[14]=_,v[3]=m,v[7]=x,v[11]=y,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Pr.setFromMatrixColumn(t,0).length(),o=1/Pr.setFromMatrixColumn(t,1).length(),l=1/Pr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),u=Math.cos(s),d=Math.sin(s),f=Math.cos(o),p=Math.sin(o);if(t.order==="XYZ"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=-u*p,e[8]=d,e[1]=m+x*d,e[5]=_-y*d,e[9]=-c*u,e[2]=y-_*d,e[6]=x+m*d,e[10]=l*u}else if(t.order==="YXZ"){const _=u*f,m=u*p,x=d*f,y=d*p;e[0]=_+y*c,e[4]=x*c-m,e[8]=l*d,e[1]=l*p,e[5]=l*f,e[9]=-c,e[2]=m*c-x,e[6]=y+_*c,e[10]=l*u}else if(t.order==="ZXY"){const _=u*f,m=u*p,x=d*f,y=d*p;e[0]=_-y*c,e[4]=-l*p,e[8]=x+m*c,e[1]=m+x*c,e[5]=l*f,e[9]=y-_*c,e[2]=-l*d,e[6]=c,e[10]=l*u}else if(t.order==="ZYX"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=x*d-m,e[8]=_*d+y,e[1]=u*p,e[5]=y*d+_,e[9]=m*d-x,e[2]=-d,e[6]=c*u,e[10]=l*u}else if(t.order==="YZX"){const _=l*u,m=l*d,x=c*u,y=c*d;e[0]=u*f,e[4]=y-_*p,e[8]=x*p+m,e[1]=p,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=m*p+x,e[10]=_-y*p}else if(t.order==="XZY"){const _=l*u,m=l*d,x=c*u,y=c*d;e[0]=u*f,e[4]=-p,e[8]=d*f,e[1]=_*p+y,e[5]=l*f,e[9]=m*p-x,e[2]=x*p-m,e[6]=c*f,e[10]=y*p+_}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Ng,t,Og)}lookAt(t,e,n){const s=this.elements;return bn.subVectors(t,e),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ai.crossVectors(n,bn),Ai.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ai.crossVectors(n,bn)),Ai.normalize(),No.crossVectors(bn,Ai),s[0]=Ai.x,s[4]=No.x,s[8]=bn.x,s[1]=Ai.y,s[5]=No.y,s[9]=bn.y,s[2]=Ai.z,s[6]=No.z,s[10]=bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],u=n[8],d=n[12],f=n[1],p=n[5],_=n[9],m=n[13],x=n[2],y=n[6],g=n[10],v=n[14],S=n[3],w=n[7],P=n[11],N=n[15],O=s[0],k=s[4],H=s[8],I=s[12],R=s[1],W=s[5],U=s[9],F=s[13],C=s[2],Z=s[6],nt=s[10],rt=s[14],j=s[3],st=s[7],at=s[11],q=s[15];return o[0]=l*O+c*R+u*C+d*j,o[4]=l*k+c*W+u*Z+d*st,o[8]=l*H+c*U+u*nt+d*at,o[12]=l*I+c*F+u*rt+d*q,o[1]=f*O+p*R+_*C+m*j,o[5]=f*k+p*W+_*Z+m*st,o[9]=f*H+p*U+_*nt+m*at,o[13]=f*I+p*F+_*rt+m*q,o[2]=x*O+y*R+g*C+v*j,o[6]=x*k+y*W+g*Z+v*st,o[10]=x*H+y*U+g*nt+v*at,o[14]=x*I+y*F+g*rt+v*q,o[3]=S*O+w*R+P*C+N*j,o[7]=S*k+w*W+P*Z+N*st,o[11]=S*H+w*U+P*nt+N*at,o[15]=S*I+w*F+P*rt+N*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],u=t[9],d=t[13],f=t[2],p=t[6],_=t[10],m=t[14],x=t[3],y=t[7],g=t[11],v=t[15];return x*(+o*u*p-s*d*p-o*c*_+n*d*_+s*c*m-n*u*m)+y*(+e*u*m-e*d*_+o*l*_-s*l*m+s*d*f-o*u*f)+g*(+e*d*p-e*c*m-o*l*p+n*l*m+o*c*f-n*d*f)+v*(-s*c*f-e*u*p+e*c*_+s*l*p-n*l*_+n*u*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8],p=t[9],_=t[10],m=t[11],x=t[12],y=t[13],g=t[14],v=t[15],S=p*g*d-y*_*d+y*u*m-c*g*m-p*u*v+c*_*v,w=x*_*d-f*g*d-x*u*m+l*g*m+f*u*v-l*_*v,P=f*y*d-x*p*d+x*c*m-l*y*m-f*c*v+l*p*v,N=x*p*u-f*y*u-x*c*_+l*y*_+f*c*g-l*p*g,O=e*S+n*w+s*P+o*N;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/O;return t[0]=S*k,t[1]=(y*_*o-p*g*o-y*s*m+n*g*m+p*s*v-n*_*v)*k,t[2]=(c*g*o-y*u*o+y*s*d-n*g*d-c*s*v+n*u*v)*k,t[3]=(p*u*o-c*_*o-p*s*d+n*_*d+c*s*m-n*u*m)*k,t[4]=w*k,t[5]=(f*g*o-x*_*o+x*s*m-e*g*m-f*s*v+e*_*v)*k,t[6]=(x*u*o-l*g*o-x*s*d+e*g*d+l*s*v-e*u*v)*k,t[7]=(l*_*o-f*u*o+f*s*d-e*_*d-l*s*m+e*u*m)*k,t[8]=P*k,t[9]=(x*p*o-f*y*o-x*n*m+e*y*m+f*n*v-e*p*v)*k,t[10]=(l*y*o-x*c*o+x*n*d-e*y*d-l*n*v+e*c*v)*k,t[11]=(f*c*o-l*p*o-f*n*d+e*p*d+l*n*m-e*c*m)*k,t[12]=N*k,t[13]=(f*y*s-x*p*s+x*n*_-e*y*_-f*n*g+e*p*g)*k,t[14]=(x*c*s-l*y*s-x*n*u+e*y*u+l*n*g-e*c*g)*k,t[15]=(l*p*s-f*c*s+f*n*u-e*p*u-l*n*_+e*c*_)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,u=t.z,d=o*l,f=o*c;return this.set(d*l+n,d*c-s*u,d*u+s*c,0,d*c+s*u,f*c+n,f*u-s*l,0,d*u-s*c,f*u+s*l,o*u*u+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,u=e._w,d=o+o,f=l+l,p=c+c,_=o*d,m=o*f,x=o*p,y=l*f,g=l*p,v=c*p,S=u*d,w=u*f,P=u*p,N=n.x,O=n.y,k=n.z;return s[0]=(1-(y+v))*N,s[1]=(m+P)*N,s[2]=(x-w)*N,s[3]=0,s[4]=(m-P)*O,s[5]=(1-(_+v))*O,s[6]=(g+S)*O,s[7]=0,s[8]=(x+w)*k,s[9]=(g-S)*k,s[10]=(1-(_+y))*k,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Pr.set(s[0],s[1],s[2]).length();const l=Pr.set(s[4],s[5],s[6]).length(),c=Pr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Bn.copy(this);const d=1/o,f=1/l,p=1/c;return Bn.elements[0]*=d,Bn.elements[1]*=d,Bn.elements[2]*=d,Bn.elements[4]*=f,Bn.elements[5]*=f,Bn.elements[6]*=f,Bn.elements[8]*=p,Bn.elements[9]*=p,Bn.elements[10]*=p,e.setFromRotationMatrix(Bn),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=_i){const u=this.elements,d=2*o/(e-t),f=2*o/(n-s),p=(e+t)/(e-t),_=(n+s)/(n-s);let m,x;if(c===_i)m=-(l+o)/(l-o),x=-2*l*o/(l-o);else if(c===pa)m=-l/(l-o),x=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=f,u[9]=_,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=x,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=_i){const u=this.elements,d=1/(e-t),f=1/(n-s),p=1/(l-o),_=(e+t)*d,m=(n+s)*f;let x,y;if(c===_i)x=(l+o)*p,y=-2*p;else if(c===pa)x=o*p,y=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*d,u[4]=0,u[8]=0,u[12]=-_,u[1]=0,u[5]=2*f,u[9]=0,u[13]=-m,u[2]=0,u[6]=0,u[10]=y,u[14]=-x,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pr=new J,Bn=new Te,Ng=new J(0,0,0),Og=new J(1,1,1),Ai=new J,No=new J,bn=new J,_h=new Te,vh=new lr;class qn{constructor(t=0,e=0,n=0,s=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],u=s[1],d=s[5],f=s[9],p=s[2],_=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(u,d)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(je(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-je(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(_,m),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return _h.makeRotationFromQuaternion(t),this.setFromRotationMatrix(_h,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return vh.setFromEuler(this),this.setFromQuaternion(vh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class wc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kg=0;const yh=new J,Rr=new lr,hi=new Te,Oo=new J,Ds=new J,Ug=new J,zg=new lr,xh=new J(1,0,0),bh=new J(0,1,0),wh=new J(0,0,1),Mh={type:"added"},Bg={type:"removed"},Ir={type:"childadded",child:null},Ml={type:"childremoved",child:null};class Qe extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qe.DEFAULT_UP.clone();const t=new J,e=new qn,n=new lr,s=new J(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Te},normalMatrix:{value:new ce}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=Qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Rr.setFromAxisAngle(t,e),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(t,e){return Rr.setFromAxisAngle(t,e),this.quaternion.premultiply(Rr),this}rotateX(t){return this.rotateOnAxis(xh,t)}rotateY(t){return this.rotateOnAxis(bh,t)}rotateZ(t){return this.rotateOnAxis(wh,t)}translateOnAxis(t,e){return yh.copy(t).applyQuaternion(this.quaternion),this.position.add(yh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(xh,t)}translateY(t){return this.translateOnAxis(bh,t)}translateZ(t){return this.translateOnAxis(wh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Oo.copy(t):Oo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(Ds,Oo,this.up):hi.lookAt(Oo,Ds,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),Rr.setFromRotationMatrix(hi),this.quaternion.premultiply(Rr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Mh),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Bg),Ml.child=t,this.dispatchEvent(Ml),Ml.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Mh),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,t,Ug),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,zg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let d=0,f=u.length;d<f;d++){const p=u[d];o(t.shapes,p)}else o(t.shapes,u)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,d=this.material.length;u<d;u++)c.push(o(t.materials,this.material[u]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];s.animations.push(o(t.animations,u))}}if(e){const c=l(t.geometries),u=l(t.materials),d=l(t.textures),f=l(t.images),p=l(t.shapes),_=l(t.skeletons),m=l(t.animations),x=l(t.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),_.length>0&&(n.skeletons=_),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function l(c){const u=[];for(const d in c){const f=c[d];delete f.metadata,u.push(f)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Qe.DEFAULT_UP=new J(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new J,di=new J,Sl=new J,fi=new J,Dr=new J,Nr=new J,Sh=new J,El=new J,Tl=new J,Al=new J;class Wn{constructor(t=new J,e=new J,n=new J){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Fn.subVectors(t,e),s.cross(Fn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){Fn.subVectors(s,e),di.subVectors(n,e),Sl.subVectors(t,e);const l=Fn.dot(Fn),c=Fn.dot(di),u=Fn.dot(Sl),d=di.dot(di),f=di.dot(Sl),p=l*d-c*c;if(p===0)return o.set(0,0,0),null;const _=1/p,m=(d*u-c*f)*_,x=(l*f-c*u)*_;return o.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(t,e,n,s,o,l,c,u){return this.getBarycoord(t,e,n,s,fi)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,fi.x),u.addScaledVector(l,fi.y),u.addScaledVector(c,fi.z),u)}static isFrontFacing(t,e,n,s){return Fn.subVectors(n,e),di.subVectors(t,e),Fn.cross(di).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Fn.cross(di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Wn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;Dr.subVectors(s,n),Nr.subVectors(o,n),El.subVectors(t,n);const u=Dr.dot(El),d=Nr.dot(El);if(u<=0&&d<=0)return e.copy(n);Tl.subVectors(t,s);const f=Dr.dot(Tl),p=Nr.dot(Tl);if(f>=0&&p<=f)return e.copy(s);const _=u*p-f*d;if(_<=0&&u>=0&&f<=0)return l=u/(u-f),e.copy(n).addScaledVector(Dr,l);Al.subVectors(t,o);const m=Dr.dot(Al),x=Nr.dot(Al);if(x>=0&&m<=x)return e.copy(o);const y=m*d-u*x;if(y<=0&&d>=0&&x<=0)return c=d/(d-x),e.copy(n).addScaledVector(Nr,c);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return Sh.subVectors(o,s),c=(p-f)/(p-f+(m-x)),e.copy(s).addScaledVector(Sh,c);const v=1/(g+y+_);return l=y*v,c=_*v,e.copy(n).addScaledVector(Dr,l).addScaledVector(Nr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Qd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},ko={h:0,s:0,l:0};function Ll(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=Mg(t,1),e=je(e,0,1),n=je(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=Ll(l,o,t+1/3),this.g=Ll(l,o,t),this.b=Ll(l,o,t-1/3)}return ge.toWorkingColorSpace(this,s),this}setStyle(t,e=Qn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qn){const n=Qd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=rs(t.r),this.g=rs(t.g),this.b=rs(t.b),this}copyLinearToSRGB(t){return this.r=ml(t.r),this.g=ml(t.g),this.b=ml(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qn){return ge.fromWorkingColorSpace(nn.copy(this),t),Math.round(je(nn.r*255,0,255))*65536+Math.round(je(nn.g*255,0,255))*256+Math.round(je(nn.b*255,0,255))}getHexString(t=Qn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(nn.copy(this),e);const n=nn.r,s=nn.g,o=nn.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let u,d;const f=(c+l)/2;if(c===l)u=0,d=0;else{const p=l-c;switch(d=f<=.5?p/(l+c):p/(2-l-c),l){case n:u=(s-o)/p+(s<o?6:0);break;case s:u=(o-n)/p+2;break;case o:u=(n-s)/p+4;break}u/=6}return t.h=u,t.s=d,t.l=f,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=Qn){ge.fromWorkingColorSpace(nn.copy(this),t);const e=nn.r,n=nn.g,s=nn.b;return t!==Qn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Li),this.setHSL(Li.h+t,Li.s+e,Li.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Li),t.getHSL(ko);const n=fl(Li.h,ko.h,e),s=fl(Li.s,ko.s,e),o=fl(Li.l,ko.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new Qt;Qt.NAMES=Qd;let Fg=0;class fr extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fg++}),this.uuid=ds(),this.name="",this.type="Material",this.blending=ns,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=tc,this.blendDst=ec,this.blendEquation=tr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=ca,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Er,this.stencilZFail=Er,this.stencilZPass=Er,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(n.blending=this.blending),this.side!==Ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==tc&&(n.blendSrc=this.blendSrc),this.blendDst!==ec&&(n.blendDst=this.blendDst),this.blendEquation!==tr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ca&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Er&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Er&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Er&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class tf extends fr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new J,Uo=new vt;class An{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=hh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ii,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Tg("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Uo.fromBufferAttribute(this,e),Uo.applyMatrix3(t),this.setXY(e,Uo.x,Uo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ps(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=vn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),s=vn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=vn(e,this.array),n=vn(n,this.array),s=vn(s,this.array),o=vn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==hh&&(t.usage=this.usage),t}}class ef extends An{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class nf extends An{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _e extends An{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Hg=0;const In=new Te,Cl=new Qe,Or=new J,wn=new eo,Ns=new eo,Ze=new J;class Oe extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=ds(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new($d(t)?nf:ef)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ce().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return Cl.lookAt(t),Cl.updateMatrix(),this.applyMatrix4(Cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new _e(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];wn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new La);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];Ns.setFromBufferAttribute(c),this.morphTargetsRelative?(Ze.addVectors(wn.min,Ns.min),wn.expandByPoint(Ze),Ze.addVectors(wn.max,Ns.max),wn.expandByPoint(Ze)):(wn.expandByPoint(Ns.min),wn.expandByPoint(Ns.max))}wn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)Ze.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],u=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)Ze.fromBufferAttribute(c,d),u&&(Or.fromBufferAttribute(t,d),Ze.add(Or)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],u=[];for(let H=0;H<n.count;H++)c[H]=new J,u[H]=new J;const d=new J,f=new J,p=new J,_=new vt,m=new vt,x=new vt,y=new J,g=new J;function v(H,I,R){d.fromBufferAttribute(n,H),f.fromBufferAttribute(n,I),p.fromBufferAttribute(n,R),_.fromBufferAttribute(o,H),m.fromBufferAttribute(o,I),x.fromBufferAttribute(o,R),f.sub(d),p.sub(d),m.sub(_),x.sub(_);const W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(W),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(W),c[H].add(y),c[I].add(y),c[R].add(y),u[H].add(g),u[I].add(g),u[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let H=0,I=S.length;H<I;++H){const R=S[H],W=R.start,U=R.count;for(let F=W,C=W+U;F<C;F+=3)v(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const w=new J,P=new J,N=new J,O=new J;function k(H){N.fromBufferAttribute(s,H),O.copy(N);const I=c[H];w.copy(I),w.sub(N.multiplyScalar(N.dot(I))).normalize(),P.crossVectors(O,I);const W=P.dot(u[H])<0?-1:1;l.setXYZW(H,w.x,w.y,w.z,W)}for(let H=0,I=S.length;H<I;++H){const R=S[H],W=R.start,U=R.count;for(let F=W,C=W+U;F<C;F+=3)k(t.getX(F+0)),k(t.getX(F+1)),k(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let _=0,m=n.count;_<m;_++)n.setXYZ(_,0,0,0);const s=new J,o=new J,l=new J,c=new J,u=new J,d=new J,f=new J,p=new J;if(t)for(let _=0,m=t.count;_<m;_+=3){const x=t.getX(_+0),y=t.getX(_+1),g=t.getX(_+2);s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),l.fromBufferAttribute(e,g),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,g),c.add(f),u.add(f),d.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(y,u.x,u.y,u.z),n.setXYZ(g,d.x,d.y,d.z)}else for(let _=0,m=e.count;_<m;_+=3)s.fromBufferAttribute(e,_+0),o.fromBufferAttribute(e,_+1),l.fromBufferAttribute(e,_+2),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),n.setXYZ(_+0,f.x,f.y,f.z),n.setXYZ(_+1,f.x,f.y,f.z),n.setXYZ(_+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(c,u){const d=c.array,f=c.itemSize,p=c.normalized,_=new d.constructor(u.length*f);let m=0,x=0;for(let y=0,g=u.length;y<g;y++){c.isInterleavedBufferAttribute?m=u[y]*c.data.stride+c.offset:m=u[y]*f;for(let v=0;v<f;v++)_[x++]=d[m++]}return new An(_,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,n=this.index.array,s=this.attributes;for(const c in s){const u=s[c],d=t(u,n);e.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const u=[],d=o[c];for(let f=0,p=d.length;f<p;f++){const _=d[f],m=t(_,n);u.push(m)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,u=l.length;c<u;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const d in u)u[d]!==void 0&&(t[d]=u[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const u in n){const d=n[u];t.data.attributes[u]=d.toJSON(t.data)}const s={};let o=!1;for(const u in this.morphAttributes){const d=this.morphAttributes[u],f=[];for(let p=0,_=d.length;p<_;p++){const m=d[p];f.push(m.toJSON(t.data))}f.length>0&&(s[u]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const d in s){const f=s[d];this.setAttribute(d,f.clone(e))}const o=t.morphAttributes;for(const d in o){const f=[],p=o[d];for(let _=0,m=p.length;_<m;_++)f.push(p[_].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Eh=new Te,Yi=new Ca,zo=new La,Th=new J,kr=new J,Ur=new J,zr=new J,Pl=new J,Bo=new J,Fo=new vt,Ho=new vt,Vo=new vt,Ah=new J,Lh=new J,Ch=new J,Go=new J,Wo=new J;class Ne extends Qe{constructor(t=new Oe,e=new tf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){Bo.set(0,0,0);for(let u=0,d=o.length;u<d;u++){const f=c[u],p=o[u];f!==0&&(Pl.fromBufferAttribute(p,t),l?Bo.addScaledVector(Pl,f):Bo.addScaledVector(Pl.sub(e),f))}e.add(Bo)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),zo.copy(n.boundingSphere),zo.applyMatrix4(o),Yi.copy(t.ray).recast(t.near),!(zo.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(zo,Th)===null||Yi.origin.distanceToSquared(Th)>(t.far-t.near)**2))&&(Eh.copy(o).invert(),Yi.copy(t.ray).applyMatrix4(Eh),!(n.boundingBox!==null&&Yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,u=o.attributes.position,d=o.attributes.uv,f=o.attributes.uv1,p=o.attributes.normal,_=o.groups,m=o.drawRange;if(c!==null)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=w;P<N;P+=3){const O=c.getX(P),k=c.getX(P+1),H=c.getX(P+2);s=Zo(this,v,t,n,d,f,p,O,k,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=c.getX(g),w=c.getX(g+1),P=c.getX(g+2);s=Zo(this,l,t,n,d,f,p,S,w,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(u!==void 0)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(u.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=w;P<N;P+=3){const O=P,k=P+1,H=P+2;s=Zo(this,v,t,n,d,f,p,O,k,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(u.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=g,w=g+1,P=g+2;s=Zo(this,l,t,n,d,f,p,S,w,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Vg(r,t,e,n,s,o,l,c){let u;if(t.side===xn?u=n.intersectTriangle(l,o,s,!0,c):u=n.intersectTriangle(s,o,l,t.side===Ui,c),u===null)return null;Wo.copy(c),Wo.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(Wo);return d<e.near||d>e.far?null:{distance:d,point:Wo.clone(),object:r}}function Zo(r,t,e,n,s,o,l,c,u,d){r.getVertexPosition(c,kr),r.getVertexPosition(u,Ur),r.getVertexPosition(d,zr);const f=Vg(r,t,e,n,kr,Ur,zr,Go);if(f){s&&(Fo.fromBufferAttribute(s,c),Ho.fromBufferAttribute(s,u),Vo.fromBufferAttribute(s,d),f.uv=Wn.getInterpolation(Go,kr,Ur,zr,Fo,Ho,Vo,new vt)),o&&(Fo.fromBufferAttribute(o,c),Ho.fromBufferAttribute(o,u),Vo.fromBufferAttribute(o,d),f.uv1=Wn.getInterpolation(Go,kr,Ur,zr,Fo,Ho,Vo,new vt)),l&&(Ah.fromBufferAttribute(l,c),Lh.fromBufferAttribute(l,u),Ch.fromBufferAttribute(l,d),f.normal=Wn.getInterpolation(Go,kr,Ur,zr,Ah,Lh,Ch,new J),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:c,b:u,c:d,normal:new J,materialIndex:0};Wn.getNormal(kr,Ur,zr,p.normal),f.face=p}return f}class un extends Oe{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const u=[],d=[],f=[],p=[];let _=0,m=0;x("z","y","x",-1,-1,n,e,t,l,o,0),x("z","y","x",1,-1,n,e,-t,l,o,1),x("x","z","y",1,1,t,n,e,s,l,2),x("x","z","y",1,-1,t,n,-e,s,l,3),x("x","y","z",1,-1,t,e,n,s,o,4),x("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(u),this.setAttribute("position",new _e(d,3)),this.setAttribute("normal",new _e(f,3)),this.setAttribute("uv",new _e(p,2));function x(y,g,v,S,w,P,N,O,k,H,I){const R=P/k,W=N/H,U=P/2,F=N/2,C=O/2,Z=k+1,nt=H+1;let rt=0,j=0;const st=new J;for(let at=0;at<nt;at++){const q=at*W-F;for(let tt=0;tt<Z;tt++){const Ct=tt*R-U;st[y]=Ct*S,st[g]=q*w,st[v]=C,d.push(st.x,st.y,st.z),st[y]=0,st[g]=0,st[v]=O>0?1:-1,f.push(st.x,st.y,st.z),p.push(tt/k),p.push(1-at/H),rt+=1}}for(let at=0;at<H;at++)for(let q=0;q<k;q++){const tt=_+q+Z*at,Ct=_+q+Z*(at+1),Q=_+(q+1)+Z*(at+1),it=_+(q+1)+Z*at;u.push(tt,Ct,it),u.push(Ct,Q,it),j+=6}c.addGroup(m,j,I),m+=j,_+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new un(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function us(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function cn(r){const t={};for(let e=0;e<r.length;e++){const n=us(r[e]);for(const s in n)t[s]=n[s]}return t}function Gg(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function rf(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}const Wg={clone:us,merge:cn};var Zg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zi extends fr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zg,this.fragmentShader=Xg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=Gg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class sf extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=_i}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new J,Ph=new vt,Rh=new vt;class Sn extends sf{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=oc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return oc*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,Ph,Rh),e.subVectors(Rh,Ph)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Hs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const u=l.fullWidth,d=l.fullHeight;o+=l.offsetX*s/u,e-=l.offsetY*n/d,s*=l.width/u,n*=l.height/d}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Br=-90,Fr=1;class qg extends Qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Sn(Br,Fr,t,e);s.layers=this.layers,this.add(s);const o=new Sn(Br,Fr,t,e);o.layers=this.layers,this.add(o);const l=new Sn(Br,Fr,t,e);l.layers=this.layers,this.add(l);const c=new Sn(Br,Fr,t,e);c.layers=this.layers,this.add(c);const u=new Sn(Br,Fr,t,e);u.layers=this.layers,this.add(u);const d=new Sn(Br,Fr,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,u]=e;for(const d of e)this.remove(d);if(t===_i)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===pa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,u,d,f]=this.children,p=t.getRenderTarget(),_=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,u),t.setRenderTarget(n,4,s),t.render(e,d),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(p,_,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class of extends pn{constructor(t,e,n,s,o,l,c,u,d,f){t=t!==void 0?t:[],e=e!==void 0?e:as,super(t,e,n,s,o,l,c,u,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class jg extends ar{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new of(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new un(5,5,5),o=new zi({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:Di});o.uniforms.tEquirect.value=e;const l=new Ne(s,o),c=e.minFilter;return e.minFilter===sr&&(e.minFilter=Gn),new qg(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const Rl=new J,Yg=new J,$g=new ce;class Pi{constructor(t=new J(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Rl.subVectors(n,e).cross(Yg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Rl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||$g.getNormalMatrix(t),s=this.coplanarPoint(Rl).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const $i=new La,Xo=new J;class Mc{constructor(t=new Pi,e=new Pi,n=new Pi,s=new Pi,o=new Pi,l=new Pi){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_i){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],u=s[3],d=s[4],f=s[5],p=s[6],_=s[7],m=s[8],x=s[9],y=s[10],g=s[11],v=s[12],S=s[13],w=s[14],P=s[15];if(n[0].setComponents(u-o,_-d,g-m,P-v).normalize(),n[1].setComponents(u+o,_+d,g+m,P+v).normalize(),n[2].setComponents(u+l,_+f,g+x,P+S).normalize(),n[3].setComponents(u-l,_-f,g-x,P-S).normalize(),n[4].setComponents(u-c,_-p,g-y,P-w).normalize(),e===_i)n[5].setComponents(u+c,_+p,g+y,P+w).normalize();else if(e===pa)n[5].setComponents(c,p,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),$i.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),$i.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere($i)}intersectsSprite(t){return $i.center.set(0,0,0),$i.radius=.7071067811865476,$i.applyMatrix4(t.matrixWorld),this.intersectsSphere($i)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Xo.x=s.normal.x>0?t.max.x:t.min.x,Xo.y=s.normal.y>0?t.max.y:t.min.y,Xo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Xo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function af(){let r=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){r=o}}}function Kg(r){const t=new WeakMap;function e(c,u){const d=c.array,f=c.usage,p=d.byteLength,_=r.createBuffer();r.bindBuffer(u,_),r.bufferData(u,d,f),c.onUploadCallback();let m;if(d instanceof Float32Array)m=r.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?m=r.HALF_FLOAT:m=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)m=r.SHORT;else if(d instanceof Uint32Array)m=r.UNSIGNED_INT;else if(d instanceof Int32Array)m=r.INT;else if(d instanceof Int8Array)m=r.BYTE;else if(d instanceof Uint8Array)m=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)m=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:m,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,d){const f=u.array,p=u._updateRange,_=u.updateRanges;if(r.bindBuffer(d,c),p.count===-1&&_.length===0&&r.bufferSubData(d,0,f),_.length!==0){for(let m=0,x=_.length;m<x;m++){const y=_[m];r.bufferSubData(d,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}u.clearUpdateRanges()}p.count!==-1&&(r.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=t.get(c);u&&(r.deleteBuffer(u.buffer),t.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,u),d.version=c.version}}return{get:s,remove:o,update:l}}class no extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),u=Math.floor(s),d=c+1,f=u+1,p=t/c,_=e/u,m=[],x=[],y=[],g=[];for(let v=0;v<f;v++){const S=v*_-l;for(let w=0;w<d;w++){const P=w*p-o;x.push(P,-S,0),y.push(0,0,1),g.push(w/c),g.push(1-v/u)}}for(let v=0;v<u;v++)for(let S=0;S<c;S++){const w=S+d*v,P=S+d*(v+1),N=S+1+d*(v+1),O=S+1+d*v;m.push(w,P,O),m.push(P,N,O)}this.setIndex(m),this.setAttribute("position",new _e(x,3)),this.setAttribute("normal",new _e(y,3)),this.setAttribute("uv",new _e(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new no(t.width,t.height,t.widthSegments,t.heightSegments)}}var Jg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Qg=`#ifdef USE_ALPHAHASH
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
#endif`,t_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,e_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,r_=`#ifdef USE_AOMAP
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
#endif`,s_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o_=`#ifdef USE_BATCHING
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
#endif`,a_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,l_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,c_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,h_=`#ifdef USE_IRIDESCENCE
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
#endif`,d_=`#ifdef USE_BUMPMAP
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
#endif`,f_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,p_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,__=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,v_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,y_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,x_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,b_=`#define PI 3.141592653589793
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
} // validated`,w_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,M_=`vec3 transformedNormal = objectNormal;
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
#endif`,S_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,E_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,T_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,A_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,L_="gl_FragColor = linearToOutputTexel( gl_FragColor );",C_=`
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
}`,P_=`#ifdef USE_ENVMAP
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
#endif`,R_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,I_=`#ifdef USE_ENVMAP
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
#endif`,D_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,N_=`#ifdef USE_ENVMAP
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
#endif`,O_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,k_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,U_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,B_=`#ifdef USE_GRADIENTMAP
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
}`,F_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,H_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,V_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,G_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,W_=`uniform bool receiveShadow;
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
#endif`,Z_=`#ifdef USE_ENVMAP
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
#endif`,X_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,q_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,j_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Y_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$_=`PhysicalMaterial material;
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
#endif`,K_=`struct PhysicalMaterial {
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
}`,J_=`
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
#endif`,Q_=`#if defined( RE_IndirectDiffuse )
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
#endif`,tv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ev=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,nv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,iv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,sv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ov=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,av=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,lv=`#if defined( USE_POINTS_UV )
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
#endif`,cv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,uv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,dv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,fv=`#ifdef USE_MORPHNORMALS
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
#endif`,pv=`#ifdef USE_MORPHTARGETS
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
#endif`,mv=`#ifdef USE_MORPHTARGETS
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
#endif`,gv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_v=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,bv=`#ifdef USE_NORMALMAP
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
#endif`,wv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ev=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Tv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Av=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Lv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Cv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Pv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Rv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Iv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Dv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Uv=`float getShadowMask() {
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
}`,zv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Bv=`#ifdef USE_SKINNING
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
#endif`,Fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Hv=`#ifdef USE_SKINNING
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
#endif`,Vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Wv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Xv=`#ifdef USE_TRANSMISSION
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
#endif`,qv=`#ifdef USE_TRANSMISSION
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
#endif`,jv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Kv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Jv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Qv=`uniform sampler2D t2D;
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
}`,t0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`#include <common>
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
}`,s0=`#if DEPTH_PACKING == 3200
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
}`,o0=`#define DISTANCE
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
}`,a0=`#define DISTANCE
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
}`,l0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,c0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`uniform float scale;
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
}`,h0=`uniform vec3 diffuse;
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
}`,d0=`#include <common>
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
}`,f0=`uniform vec3 diffuse;
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
}`,p0=`#define LAMBERT
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
}`,m0=`#define LAMBERT
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
}`,g0=`#define MATCAP
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
}`,_0=`#define MATCAP
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
}`,v0=`#define NORMAL
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
}`,y0=`#define NORMAL
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
}`,x0=`#define PHONG
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
}`,b0=`#define PHONG
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
}`,w0=`#define STANDARD
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
}`,M0=`#define STANDARD
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
}`,S0=`#define TOON
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
}`,E0=`#define TOON
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
}`,T0=`uniform float size;
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
}`,A0=`uniform vec3 diffuse;
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
}`,L0=`#include <common>
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
}`,C0=`uniform vec3 color;
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
}`,P0=`uniform float rotation;
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
}`,R0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:Jg,alphahash_pars_fragment:Qg,alphamap_fragment:t_,alphamap_pars_fragment:e_,alphatest_fragment:n_,alphatest_pars_fragment:i_,aomap_fragment:r_,aomap_pars_fragment:s_,batching_pars_vertex:o_,batching_vertex:a_,begin_vertex:l_,beginnormal_vertex:c_,bsdfs:u_,iridescence_fragment:h_,bumpmap_pars_fragment:d_,clipping_planes_fragment:f_,clipping_planes_pars_fragment:p_,clipping_planes_pars_vertex:m_,clipping_planes_vertex:g_,color_fragment:__,color_pars_fragment:v_,color_pars_vertex:y_,color_vertex:x_,common:b_,cube_uv_reflection_fragment:w_,defaultnormal_vertex:M_,displacementmap_pars_vertex:S_,displacementmap_vertex:E_,emissivemap_fragment:T_,emissivemap_pars_fragment:A_,colorspace_fragment:L_,colorspace_pars_fragment:C_,envmap_fragment:P_,envmap_common_pars_fragment:R_,envmap_pars_fragment:I_,envmap_pars_vertex:D_,envmap_physical_pars_fragment:Z_,envmap_vertex:N_,fog_vertex:O_,fog_pars_vertex:k_,fog_fragment:U_,fog_pars_fragment:z_,gradientmap_pars_fragment:B_,lightmap_fragment:F_,lightmap_pars_fragment:H_,lights_lambert_fragment:V_,lights_lambert_pars_fragment:G_,lights_pars_begin:W_,lights_toon_fragment:X_,lights_toon_pars_fragment:q_,lights_phong_fragment:j_,lights_phong_pars_fragment:Y_,lights_physical_fragment:$_,lights_physical_pars_fragment:K_,lights_fragment_begin:J_,lights_fragment_maps:Q_,lights_fragment_end:tv,logdepthbuf_fragment:ev,logdepthbuf_pars_fragment:nv,logdepthbuf_pars_vertex:iv,logdepthbuf_vertex:rv,map_fragment:sv,map_pars_fragment:ov,map_particle_fragment:av,map_particle_pars_fragment:lv,metalnessmap_fragment:cv,metalnessmap_pars_fragment:uv,morphinstance_vertex:hv,morphcolor_vertex:dv,morphnormal_vertex:fv,morphtarget_pars_vertex:pv,morphtarget_vertex:mv,normal_fragment_begin:gv,normal_fragment_maps:_v,normal_pars_fragment:vv,normal_pars_vertex:yv,normal_vertex:xv,normalmap_pars_fragment:bv,clearcoat_normal_fragment_begin:wv,clearcoat_normal_fragment_maps:Mv,clearcoat_pars_fragment:Sv,iridescence_pars_fragment:Ev,opaque_fragment:Tv,packing:Av,premultiplied_alpha_fragment:Lv,project_vertex:Cv,dithering_fragment:Pv,dithering_pars_fragment:Rv,roughnessmap_fragment:Iv,roughnessmap_pars_fragment:Dv,shadowmap_pars_fragment:Nv,shadowmap_pars_vertex:Ov,shadowmap_vertex:kv,shadowmask_pars_fragment:Uv,skinbase_vertex:zv,skinning_pars_vertex:Bv,skinning_vertex:Fv,skinnormal_vertex:Hv,specularmap_fragment:Vv,specularmap_pars_fragment:Gv,tonemapping_fragment:Wv,tonemapping_pars_fragment:Zv,transmission_fragment:Xv,transmission_pars_fragment:qv,uv_pars_fragment:jv,uv_pars_vertex:Yv,uv_vertex:$v,worldpos_vertex:Kv,background_vert:Jv,background_frag:Qv,backgroundCube_vert:t0,backgroundCube_frag:e0,cube_vert:n0,cube_frag:i0,depth_vert:r0,depth_frag:s0,distanceRGBA_vert:o0,distanceRGBA_frag:a0,equirect_vert:l0,equirect_frag:c0,linedashed_vert:u0,linedashed_frag:h0,meshbasic_vert:d0,meshbasic_frag:f0,meshlambert_vert:p0,meshlambert_frag:m0,meshmatcap_vert:g0,meshmatcap_frag:_0,meshnormal_vert:v0,meshnormal_frag:y0,meshphong_vert:x0,meshphong_frag:b0,meshphysical_vert:w0,meshphysical_frag:M0,meshtoon_vert:S0,meshtoon_frag:E0,points_vert:T0,points_frag:A0,shadow_vert:L0,shadow_frag:C0,sprite_vert:P0,sprite_frag:R0},Ot={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},ti={basic:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:cn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:cn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:cn([Ot.points,Ot.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:cn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:cn([Ot.common,Ot.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:cn([Ot.sprite,Ot.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:cn([Ot.common,Ot.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:cn([Ot.lights,Ot.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};ti.physical={uniforms:cn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const qo={r:0,b:0,g:0},Ki=new qn,I0=new Te;function D0(r,t,e,n,s,o,l){const c=new Qt(0);let u=o===!0?0:1,d,f,p=null,_=0,m=null;function x(g,v){let S=!1,w=v.isScene===!0?v.background:null;w&&w.isTexture&&(w=(v.backgroundBlurriness>0?e:t).get(w)),w===null?y(c,u):w&&w.isColor&&(y(w,1),S=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,l):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),w&&(w.isCubeTexture||w.mapping===Ta)?(f===void 0&&(f=new Ne(new un(1,1,1),new zi({name:"BackgroundCubeMaterial",uniforms:us(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(N,O,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),Ki.copy(v.backgroundRotation),Ki.x*=-1,Ki.y*=-1,Ki.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ki.y*=-1,Ki.z*=-1),f.material.uniforms.envMap.value=w,f.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(I0.makeRotationFromEuler(Ki)),f.material.toneMapped=ge.getTransfer(w.colorSpace)!==we,(p!==w||_!==w.version||m!==r.toneMapping)&&(f.material.needsUpdate=!0,p=w,_=w.version,m=r.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null)):w&&w.isTexture&&(d===void 0&&(d=new Ne(new no(2,2),new zi({name:"BackgroundMaterial",uniforms:us(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=w,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.toneMapped=ge.getTransfer(w.colorSpace)!==we,w.matrixAutoUpdate===!0&&w.updateMatrix(),d.material.uniforms.uvTransform.value.copy(w.matrix),(p!==w||_!==w.version||m!==r.toneMapping)&&(d.material.needsUpdate=!0,p=w,_=w.version,m=r.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null))}function y(g,v){g.getRGB(qo,rf(r)),n.buffers.color.setClear(qo.r,qo.g,qo.b,v,l)}return{getClearColor:function(){return c},setClearColor:function(g,v=1){c.set(g),u=v,y(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,y(c,u)},render:x}}function N0(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=_(null);let o=s,l=!1;function c(R,W,U,F,C){let Z=!1;const nt=p(F,U,W);o!==nt&&(o=nt,d(o.object)),Z=m(R,F,U,C),Z&&x(R,F,U,C),C!==null&&t.update(C,r.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,P(R,W,U,F),C!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(C).buffer))}function u(){return r.createVertexArray()}function d(R){return r.bindVertexArray(R)}function f(R){return r.deleteVertexArray(R)}function p(R,W,U){const F=U.wireframe===!0;let C=n[R.id];C===void 0&&(C={},n[R.id]=C);let Z=C[W.id];Z===void 0&&(Z={},C[W.id]=Z);let nt=Z[F];return nt===void 0&&(nt=_(u()),Z[F]=nt),nt}function _(R){const W=[],U=[],F=[];for(let C=0;C<e;C++)W[C]=0,U[C]=0,F[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:U,attributeDivisors:F,object:R,attributes:{},index:null}}function m(R,W,U,F){const C=o.attributes,Z=W.attributes;let nt=0;const rt=U.getAttributes();for(const j in rt)if(rt[j].location>=0){const at=C[j];let q=Z[j];if(q===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),at===void 0||at.attribute!==q||q&&at.data!==q.data)return!0;nt++}return o.attributesNum!==nt||o.index!==F}function x(R,W,U,F){const C={},Z=W.attributes;let nt=0;const rt=U.getAttributes();for(const j in rt)if(rt[j].location>=0){let at=Z[j];at===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(at=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(at=R.instanceColor));const q={};q.attribute=at,at&&at.data&&(q.data=at.data),C[j]=q,nt++}o.attributes=C,o.attributesNum=nt,o.index=F}function y(){const R=o.newAttributes;for(let W=0,U=R.length;W<U;W++)R[W]=0}function g(R){v(R,0)}function v(R,W){const U=o.newAttributes,F=o.enabledAttributes,C=o.attributeDivisors;U[R]=1,F[R]===0&&(r.enableVertexAttribArray(R),F[R]=1),C[R]!==W&&(r.vertexAttribDivisor(R,W),C[R]=W)}function S(){const R=o.newAttributes,W=o.enabledAttributes;for(let U=0,F=W.length;U<F;U++)W[U]!==R[U]&&(r.disableVertexAttribArray(U),W[U]=0)}function w(R,W,U,F,C,Z,nt){nt===!0?r.vertexAttribIPointer(R,W,U,C,Z):r.vertexAttribPointer(R,W,U,F,C,Z)}function P(R,W,U,F){y();const C=F.attributes,Z=U.getAttributes(),nt=W.defaultAttributeValues;for(const rt in Z){const j=Z[rt];if(j.location>=0){let st=C[rt];if(st===void 0&&(rt==="instanceMatrix"&&R.instanceMatrix&&(st=R.instanceMatrix),rt==="instanceColor"&&R.instanceColor&&(st=R.instanceColor)),st!==void 0){const at=st.normalized,q=st.itemSize,tt=t.get(st);if(tt===void 0)continue;const Ct=tt.buffer,Q=tt.type,it=tt.bytesPerElement,wt=Q===r.INT||Q===r.UNSIGNED_INT||st.gpuType===Vd;if(st.isInterleavedBufferAttribute){const St=st.data,Pt=St.stride,It=st.offset;if(St.isInstancedInterleavedBuffer){for(let Ut=0;Ut<j.locationSize;Ut++)v(j.location+Ut,St.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Ut=0;Ut<j.locationSize;Ut++)g(j.location+Ut);r.bindBuffer(r.ARRAY_BUFFER,Ct);for(let Ut=0;Ut<j.locationSize;Ut++)w(j.location+Ut,q/j.locationSize,Q,at,Pt*it,(It+q/j.locationSize*Ut)*it,wt)}else{if(st.isInstancedBufferAttribute){for(let St=0;St<j.locationSize;St++)v(j.location+St,st.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let St=0;St<j.locationSize;St++)g(j.location+St);r.bindBuffer(r.ARRAY_BUFFER,Ct);for(let St=0;St<j.locationSize;St++)w(j.location+St,q/j.locationSize,Q,at,q*it,q/j.locationSize*St*it,wt)}}else if(nt!==void 0){const at=nt[rt];if(at!==void 0)switch(at.length){case 2:r.vertexAttrib2fv(j.location,at);break;case 3:r.vertexAttrib3fv(j.location,at);break;case 4:r.vertexAttrib4fv(j.location,at);break;default:r.vertexAttrib1fv(j.location,at)}}}}S()}function N(){H();for(const R in n){const W=n[R];for(const U in W){const F=W[U];for(const C in F)f(F[C].object),delete F[C];delete W[U]}delete n[R]}}function O(R){if(n[R.id]===void 0)return;const W=n[R.id];for(const U in W){const F=W[U];for(const C in F)f(F[C].object),delete F[C];delete W[U]}delete n[R.id]}function k(R){for(const W in n){const U=n[W];if(U[R.id]===void 0)continue;const F=U[R.id];for(const C in F)f(F[C].object),delete F[C];delete U[R.id]}}function H(){I(),l=!0,o!==s&&(o=s,d(o.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:H,resetDefaultState:I,dispose:N,releaseStatesOfGeometry:O,releaseStatesOfProgram:k,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function O0(r,t,e){let n;function s(u){n=u}function o(u,d){r.drawArrays(n,u,d),e.update(d,n,1)}function l(u,d,f){f!==0&&(r.drawArraysInstanced(n,u,d,f),e.update(d,n,f))}function c(u,d,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(u[_],d[_]);else{p.multiDrawArraysWEBGL(n,u,0,d,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];e.update(_,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function k0(r,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),g=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:v,maxSamples:S}}function U0(r){const t=this;let e=null,n=0,s=!1,o=!1;const l=new Pi,c=new ce,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,_){const m=p.length!==0||_||n!==0||s;return s=_,n=p.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,_){e=f(p,_,0)},this.setState=function(p,_,m){const x=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,v=r.get(p);if(!s||x===null||x.length===0||o&&!g)o?f(null):d();else{const S=o?0:n,w=S*4;let P=v.clippingState||null;u.value=P,P=f(x,_,w,m);for(let N=0;N!==w;++N)P[N]=e[N];v.clippingState=P,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function d(){u.value!==e&&(u.value=e,u.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,_,m,x){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=u.value,x!==!0||g===null){const v=m+y*4,S=_.matrixWorldInverse;c.getNormalMatrix(S),(g===null||g.length<v)&&(g=new Float32Array(v));for(let w=0,P=m;w!==y;++w,P+=4)l.copy(p[w]).applyMatrix4(S,c),l.normal.toArray(g,P),g[P+3]=l.constant}u.value=g,u.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}function z0(r){let t=new WeakMap;function e(l,c){return c===nc?l.mapping=as:c===ic&&(l.mapping=ls),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===nc||c===ic)if(t.has(l)){const u=t.get(l).texture;return e(u,l.mapping)}else{const u=l.image;if(u&&u.height>0){const d=new jg(u.height);return d.fromEquirectangularTexture(r,l),t.set(l,d),l.addEventListener("dispose",s),e(d.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class lf extends sf{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,u=s-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,l=o+d*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Kr=4,Ih=[.125,.215,.35,.446,.526,.582],er=20,Il=new lf,Dh=new Qt;let Dl=null,Nl=0,Ol=0,kl=!1;const Qi=(1+Math.sqrt(5))/2,Hr=1/Qi,Nh=[new J(1,1,1),new J(-1,1,1),new J(1,1,-1),new J(-1,1,-1),new J(0,Qi,Hr),new J(0,Qi,-Hr),new J(Hr,0,Qi),new J(-Hr,0,Qi),new J(Qi,Hr,0),new J(-Qi,Hr,0)];class Oh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Dl=this._renderer.getRenderTarget(),Nl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Dl,Nl,Ol),this._renderer.xr.enabled=kl,t.scissorTest=!1,jo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===as||t.mapping===ls?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Dl=this._renderer.getRenderTarget(),Nl=this._renderer.getActiveCubeFace(),Ol=this._renderer.getActiveMipmapLevel(),kl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:ua,format:ni,colorSpace:Bi,depthBuffer:!1},s=kh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kh(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=B0(o)),this._blurMaterial=F0(o,t,e)}return s}_compileMaterial(t){const e=new Ne(this._lodPlanes[0],t);this._renderer.compile(e,Il)}_sceneToCubeUV(t,e,n,s){const c=new Sn(90,1,e,n),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,_=f.toneMapping;f.getClearColor(Dh),f.toneMapping=Ni,f.autoClear=!1;const m=new tf({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1}),x=new Ne(new un,m);let y=!1;const g=t.background;g?g.isColor&&(m.color.copy(g),t.background=null,y=!0):(m.color.copy(Dh),y=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(c.up.set(0,u[v],0),c.lookAt(d[v],0,0)):S===1?(c.up.set(0,0,u[v]),c.lookAt(0,d[v],0)):(c.up.set(0,u[v],0),c.lookAt(0,0,d[v]));const w=this._cubeSize;jo(s,S*w,v>2?w:0,w,w),f.setRenderTarget(s),y&&f.render(x,c),f.render(t,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=_,f.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===as||t.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uh());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new Ne(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const u=this._cubeSize;jo(e,0,0,3*u,2*u),n.setRenderTarget(e),n.render(l,Il)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=Nh[(s-1)%Nh.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const u=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new Ne(this._lodPlanes[s],d),_=d.uniforms,m=this._sizeLods[n]-1,x=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*er-1),y=o/x,g=isFinite(o)?1+Math.floor(f*y):er;g>er&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${er}`);const v=[];let S=0;for(let k=0;k<er;++k){const H=k/y,I=Math.exp(-H*H/2);v.push(I),k===0?S+=I:k<g&&(S+=2*I)}for(let k=0;k<v.length;k++)v[k]=v[k]/S;_.envMap.value=t.texture,_.samples.value=g,_.weights.value=v,_.latitudinal.value=l==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:w}=this;_.dTheta.value=x,_.mipInt.value=w-n;const P=this._sizeLods[s],N=3*P*(s>w-Kr?s-w+Kr:0),O=4*(this._cubeSize-P);jo(e,N,O,3*P,2*P),u.setRenderTarget(e),u.render(p,Il)}}function B0(r){const t=[],e=[],n=[];let s=r;const o=r-Kr+1+Ih.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let u=1/c;l>r-Kr?u=Ih[l-r+Kr-1]:l===0&&(u=0),n.push(u);const d=1/(c-2),f=-d,p=1+d,_=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,y=3,g=2,v=1,S=new Float32Array(y*x*m),w=new Float32Array(g*x*m),P=new Float32Array(v*x*m);for(let O=0;O<m;O++){const k=O%3*2/3-1,H=O>2?0:-1,I=[k,H,0,k+2/3,H,0,k+2/3,H+1,0,k,H,0,k+2/3,H+1,0,k,H+1,0];S.set(I,y*x*O),w.set(_,g*x*O);const R=[O,O,O,O,O,O];P.set(R,v*x*O)}const N=new Oe;N.setAttribute("position",new An(S,y)),N.setAttribute("uv",new An(w,g)),N.setAttribute("faceIndex",new An(P,v)),t.push(N),s>Kr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function kh(r,t,e){const n=new ar(r,t,e);return n.texture.mapping=Ta,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jo(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function F0(r,t,e){const n=new Float32Array(er),s=new J(0,1,0);return new zi({name:"SphericalGaussianBlur",defines:{n:er,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Sc(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Uh(){return new zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Sc(),fragmentShader:`

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
		`,blending:Di,depthTest:!1,depthWrite:!1})}function zh(){return new zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Sc(){return`

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
	`}function H0(r){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const u=c.mapping,d=u===nc||u===ic,f=u===as||u===ls;if(d||f){let p=t.get(c);const _=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==_)return e===null&&(e=new Oh(r)),p=d?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const m=c.image;return d&&m&&m.height>0||f&&m&&s(m)?(e===null&&(e=new Oh(r)),p=d?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function s(c){let u=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&u++;return u===d}function o(c){const u=c.target;u.removeEventListener("dispose",o);const d=t.get(u);d!==void 0&&(t.delete(u),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function V0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function G0(r,t,e,n){const s={},o=new WeakMap;function l(p){const _=p.target;_.index!==null&&t.remove(_.index);for(const x in _.attributes)t.remove(_.attributes[x]);for(const x in _.morphAttributes){const y=_.morphAttributes[x];for(let g=0,v=y.length;g<v;g++)t.remove(y[g])}_.removeEventListener("dispose",l),delete s[_.id];const m=o.get(_);m&&(t.remove(m),o.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(p,_){return s[_.id]===!0||(_.addEventListener("dispose",l),s[_.id]=!0,e.memory.geometries++),_}function u(p){const _=p.attributes;for(const x in _)t.update(_[x],r.ARRAY_BUFFER);const m=p.morphAttributes;for(const x in m){const y=m[x];for(let g=0,v=y.length;g<v;g++)t.update(y[g],r.ARRAY_BUFFER)}}function d(p){const _=[],m=p.index,x=p.attributes.position;let y=0;if(m!==null){const S=m.array;y=m.version;for(let w=0,P=S.length;w<P;w+=3){const N=S[w+0],O=S[w+1],k=S[w+2];_.push(N,O,O,k,k,N)}}else if(x!==void 0){const S=x.array;y=x.version;for(let w=0,P=S.length/3-1;w<P;w+=3){const N=w+0,O=w+1,k=w+2;_.push(N,O,O,k,k,N)}}else return;const g=new($d(_)?nf:ef)(_,1);g.version=y;const v=o.get(p);v&&t.remove(v),o.set(p,g)}function f(p){const _=o.get(p);if(_){const m=p.index;m!==null&&_.version<m.version&&d(p)}else d(p);return o.get(p)}return{get:c,update:u,getWireframeAttribute:f}}function W0(r,t,e){let n;function s(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,_){r.drawElements(n,_,o,p*l),e.update(_,n,1)}function d(p,_,m){m!==0&&(r.drawElementsInstanced(n,_,o,p*l,m),e.update(_,n,m))}function f(p,_,m){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<m;y++)this.render(p[y]/l,_[y]);else{x.multiDrawElementsWEBGL(n,_,0,o,p,0,m);let y=0;for(let g=0;g<m;g++)y+=_[g];e.update(y,n,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function Z0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case r.TRIANGLES:e.triangles+=c*(o/3);break;case r.LINES:e.lines+=c*(o/2);break;case r.LINE_STRIP:e.lines+=c*(o-1);break;case r.LINE_LOOP:e.lines+=c*o;break;case r.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function X0(r,t,e){const n=new WeakMap,s=new Ye;function o(l,c,u){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let _=n.get(c);if(_===void 0||_.count!==p){let I=function(){k.dispose(),n.delete(c),c.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let w=0;m===!0&&(w=1),x===!0&&(w=2),y===!0&&(w=3);let P=c.attributes.position.count*w,N=1;P>t.maxTextureSize&&(N=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const O=new Float32Array(P*N*4*p),k=new Jd(O,P,N,p);k.type=Ii,k.needsUpdate=!0;const H=w*4;for(let R=0;R<p;R++){const W=g[R],U=v[R],F=S[R],C=P*N*4*R;for(let Z=0;Z<W.count;Z++){const nt=Z*H;m===!0&&(s.fromBufferAttribute(W,Z),O[C+nt+0]=s.x,O[C+nt+1]=s.y,O[C+nt+2]=s.z,O[C+nt+3]=0),x===!0&&(s.fromBufferAttribute(U,Z),O[C+nt+4]=s.x,O[C+nt+5]=s.y,O[C+nt+6]=s.z,O[C+nt+7]=0),y===!0&&(s.fromBufferAttribute(F,Z),O[C+nt+8]=s.x,O[C+nt+9]=s.y,O[C+nt+10]=s.z,O[C+nt+11]=F.itemSize===4?s.w:1)}}_={count:p,texture:k,size:new vt(P,N)},n.set(c,_),c.addEventListener("dispose",I)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)u.getUniforms().setValue(r,"morphTexture",l.morphTexture,e);else{let m=0;for(let y=0;y<d.length;y++)m+=d[y];const x=c.morphTargetsRelative?1:1-m;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",d)}u.getUniforms().setValue(r,"morphTargetsTexture",_.texture,e),u.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:o}}function q0(r,t,e,n){let s=new WeakMap;function o(u){const d=n.render.frame,f=u.geometry,p=t.get(u,f);if(s.get(p)!==d&&(t.update(p),s.set(p,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),s.get(u)!==d&&(e.update(u.instanceMatrix,r.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,r.ARRAY_BUFFER),s.set(u,d))),u.isSkinnedMesh){const _=u.skeleton;s.get(_)!==d&&(_.update(),s.set(_,d))}return p}function l(){s=new WeakMap}function c(u){const d=u.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:l}}class cf extends pn{constructor(t,e,n,s,o,l,c,u,d,f){if(f=f!==void 0?f:is,f!==is&&f!==js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===is&&(n=cs),n===void 0&&f===js&&(n=to),super(null,s,o,l,c,u,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Nn,this.minFilter=u!==void 0?u:Nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const uf=new pn,hf=new cf(1,1);hf.compareFunction=Yd;const df=new Jd,ff=new Ig,pf=new of,Bh=[],Fh=[],Hh=new Float32Array(16),Vh=new Float32Array(9),Gh=new Float32Array(4);function fs(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let o=Bh[s];if(o===void 0&&(o=new Float32Array(s),Bh[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,r[l].toArray(o,c)}return o}function He(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ve(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Pa(r,t){let e=Fh[t];e===void 0&&(e=new Int32Array(t),Fh[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function j0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Y0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;r.uniform2fv(this.addr,t),Ve(e,t)}}function $0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;r.uniform3fv(this.addr,t),Ve(e,t)}}function K0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;r.uniform4fv(this.addr,t),Ve(e,t)}}function J0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Gh.set(n),r.uniformMatrix2fv(this.addr,!1,Gh),Ve(e,n)}}function Q0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Vh.set(n),r.uniformMatrix3fv(this.addr,!1,Vh),Ve(e,n)}}function ty(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Hh.set(n),r.uniformMatrix4fv(this.addr,!1,Hh),Ve(e,n)}}function ey(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function ny(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;r.uniform2iv(this.addr,t),Ve(e,t)}}function iy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;r.uniform3iv(this.addr,t),Ve(e,t)}}function ry(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;r.uniform4iv(this.addr,t),Ve(e,t)}}function sy(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function oy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;r.uniform2uiv(this.addr,t),Ve(e,t)}}function ay(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;r.uniform3uiv(this.addr,t),Ve(e,t)}}function ly(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;r.uniform4uiv(this.addr,t),Ve(e,t)}}function cy(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);const o=this.type===r.SAMPLER_2D_SHADOW?hf:uf;e.setTexture2D(t||o,s)}function uy(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||ff,s)}function hy(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||pf,s)}function dy(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||df,s)}function fy(r){switch(r){case 5126:return j0;case 35664:return Y0;case 35665:return $0;case 35666:return K0;case 35674:return J0;case 35675:return Q0;case 35676:return ty;case 5124:case 35670:return ey;case 35667:case 35671:return ny;case 35668:case 35672:return iy;case 35669:case 35673:return ry;case 5125:return sy;case 36294:return oy;case 36295:return ay;case 36296:return ly;case 35678:case 36198:case 36298:case 36306:case 35682:return cy;case 35679:case 36299:case 36307:return uy;case 35680:case 36300:case 36308:case 36293:return hy;case 36289:case 36303:case 36311:case 36292:return dy}}function py(r,t){r.uniform1fv(this.addr,t)}function my(r,t){const e=fs(t,this.size,2);r.uniform2fv(this.addr,e)}function gy(r,t){const e=fs(t,this.size,3);r.uniform3fv(this.addr,e)}function _y(r,t){const e=fs(t,this.size,4);r.uniform4fv(this.addr,e)}function vy(r,t){const e=fs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function yy(r,t){const e=fs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function xy(r,t){const e=fs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function by(r,t){r.uniform1iv(this.addr,t)}function wy(r,t){r.uniform2iv(this.addr,t)}function My(r,t){r.uniform3iv(this.addr,t)}function Sy(r,t){r.uniform4iv(this.addr,t)}function Ey(r,t){r.uniform1uiv(this.addr,t)}function Ty(r,t){r.uniform2uiv(this.addr,t)}function Ay(r,t){r.uniform3uiv(this.addr,t)}function Ly(r,t){r.uniform4uiv(this.addr,t)}function Cy(r,t,e){const n=this.cache,s=t.length,o=Pa(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||uf,o[l])}function Py(r,t,e){const n=this.cache,s=t.length,o=Pa(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||ff,o[l])}function Ry(r,t,e){const n=this.cache,s=t.length,o=Pa(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||pf,o[l])}function Iy(r,t,e){const n=this.cache,s=t.length,o=Pa(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||df,o[l])}function Dy(r){switch(r){case 5126:return py;case 35664:return my;case 35665:return gy;case 35666:return _y;case 35674:return vy;case 35675:return yy;case 35676:return xy;case 5124:case 35670:return by;case 35667:case 35671:return wy;case 35668:case 35672:return My;case 35669:case 35673:return Sy;case 5125:return Ey;case 36294:return Ty;case 36295:return Ay;case 36296:return Ly;case 35678:case 36198:case 36298:case 36306:case 35682:return Cy;case 35679:case 36299:case 36307:return Py;case 35680:case 36300:case 36308:case 36293:return Ry;case 36289:case 36303:case 36311:case 36292:return Iy}}class Ny{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=fy(e.type)}}class Oy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Dy(e.type)}}class ky{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const Ul=/(\w+)(\])?(\[|\.)?/g;function Wh(r,t){r.seq.push(t),r.map[t.id]=t}function Uy(r,t,e){const n=r.name,s=n.length;for(Ul.lastIndex=0;;){const o=Ul.exec(n),l=Ul.lastIndex;let c=o[1];const u=o[2]==="]",d=o[3];if(u&&(c=c|0),d===void 0||d==="["&&l+2===s){Wh(e,d===void 0?new Ny(c,r,t):new Oy(c,r,t));break}else{let p=e.map[c];p===void 0&&(p=new ky(c),Wh(e,p)),e=p}}}class oa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);Uy(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],u=n[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function Zh(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const zy=37297;let By=0;function Fy(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function Hy(r){const t=ge.getPrimaries(ge.workingColorSpace),e=ge.getPrimaries(r);let n;switch(t===e?n="":t===fa&&e===da?n="LinearDisplayP3ToLinearSRGB":t===da&&e===fa&&(n="LinearSRGBToLinearDisplayP3"),r){case Bi:case Aa:return[n,"LinearTransferOETF"];case Qn:case bc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Xh(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Fy(r.getShaderSource(t),l)}else return s}function Vy(r,t){const e=Hy(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Gy(r,t){let e;switch(t){case Bd:e="Linear";break;case $m:e="Reinhard";break;case Km:e="OptimizedCineon";break;case Jm:e="ACESFilmic";break;case tg:e="AgX";break;case eg:e="Neutral";break;case Qm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Wy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bs).join(`
`)}function Zy(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Xy(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=r.getActiveAttrib(t,s),l=o.name;let c=1;o.type===r.FLOAT_MAT2&&(c=2),o.type===r.FLOAT_MAT3&&(c=3),o.type===r.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:r.getAttribLocation(t,l),locationSize:c}}return e}function Bs(r){return r!==""}function qh(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const qy=/^[ \t]*#include +<([\w\d./]+)>/gm;function ac(r){return r.replace(qy,Yy)}const jy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Yy(r,t){let e=le[t];if(e===void 0){const n=jy.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ac(e)}const $y=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yh(r){return r.replace($y,Ky)}function Ky(r,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function $h(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Jy(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===zd?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===wm?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===mi&&(t="SHADOWMAP_TYPE_VSM"),t}function Qy(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case as:case ls:t="ENVMAP_TYPE_CUBE";break;case Ta:t="ENVMAP_TYPE_CUBE_UV";break}return t}function tx(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ls:t="ENVMAP_MODE_REFRACTION";break}return t}function ex(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case yc:t="ENVMAP_BLENDING_MULTIPLY";break;case jm:t="ENVMAP_BLENDING_MIX";break;case Ym:t="ENVMAP_BLENDING_ADD";break}return t}function nx(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function ix(r,t,e,n){const s=r.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const u=Jy(e),d=Qy(e),f=tx(e),p=ex(e),_=nx(e),m=Wy(e),x=Zy(o),y=s.createProgram();let g,v,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Bs).join(`
`),g.length>0&&(g+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Bs).join(`
`),v.length>0&&(v+=`
`)):(g=[$h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),v=[$h(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ni?"#define TONE_MAPPING":"",e.toneMapping!==Ni?le.tonemapping_pars_fragment:"",e.toneMapping!==Ni?Gy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,Vy("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Bs).join(`
`)),l=ac(l),l=qh(l,e),l=jh(l,e),c=ac(c),c=qh(c,e),c=jh(c,e),l=Yh(l),c=Yh(c),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,v=["#define varying in",e.glslVersion===dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const w=S+g+l,P=S+v+c,N=Zh(s,s.VERTEX_SHADER,w),O=Zh(s,s.FRAGMENT_SHADER,P);s.attachShader(y,N),s.attachShader(y,O),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function k(W){if(r.debug.checkShaderErrors){const U=s.getProgramInfoLog(y).trim(),F=s.getShaderInfoLog(N).trim(),C=s.getShaderInfoLog(O).trim();let Z=!0,nt=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,y,N,O);else{const rt=Xh(s,N,"vertex"),j=Xh(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+U+`
`+rt+`
`+j)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(F===""||C==="")&&(nt=!1);nt&&(W.diagnostics={runnable:Z,programLog:U,vertexShader:{log:F,prefix:g},fragmentShader:{log:C,prefix:v}})}s.deleteShader(N),s.deleteShader(O),H=new oa(s,y),I=Xy(s,y)}let H;this.getUniforms=function(){return H===void 0&&k(this),H};let I;this.getAttributes=function(){return I===void 0&&k(this),I};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(y,zy)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=By++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=O,this}let rx=0;class sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ox(t),e.set(t,n)),n}}class ox{constructor(t){this.id=rx++,this.code=t,this.usedTimes=0}}function ax(r,t,e,n,s,o,l){const c=new wc,u=new sx,d=new Set,f=[],p=s.logarithmicDepthBuffer,_=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(I){return d.add(I),I===0?"uv":`uv${I}`}function g(I,R,W,U,F){const C=U.fog,Z=F.geometry,nt=I.isMeshStandardMaterial?U.environment:null,rt=(I.isMeshStandardMaterial?e:t).get(I.envMap||nt),j=rt&&rt.mapping===Ta?rt.image.height:null,st=x[I.type];I.precision!==null&&(m=s.getMaxPrecision(I.precision),m!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",m,"instead."));const at=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,q=at!==void 0?at.length:0;let tt=0;Z.morphAttributes.position!==void 0&&(tt=1),Z.morphAttributes.normal!==void 0&&(tt=2),Z.morphAttributes.color!==void 0&&(tt=3);let Ct,Q,it,wt;if(st){const ke=ti[st];Ct=ke.vertexShader,Q=ke.fragmentShader}else Ct=I.vertexShader,Q=I.fragmentShader,u.update(I),it=u.getVertexShaderID(I),wt=u.getFragmentShaderID(I);const St=r.getRenderTarget(),Pt=F.isInstancedMesh===!0,It=F.isBatchedMesh===!0,Ut=!!I.map,ot=!!I.matcap,xt=!!rt,bt=!!I.aoMap,E=!!I.lightMap,et=!!I.bumpMap,$=!!I.normalMap,A=!!I.displacementMap,M=!!I.emissiveMap,B=!!I.metalnessMap,X=!!I.roughnessMap,K=I.anisotropy>0,G=I.clearcoat>0,ft=I.iridescence>0,lt=I.sheen>0,pt=I.transmission>0,Tt=K&&!!I.anisotropyMap,Et=G&&!!I.clearcoatMap,At=G&&!!I.clearcoatNormalMap,Ht=G&&!!I.clearcoatRoughnessMap,zt=ft&&!!I.iridescenceMap,Dt=ft&&!!I.iridescenceThicknessMap,Kt=lt&&!!I.sheenColorMap,Vt=lt&&!!I.sheenRoughnessMap,oe=!!I.specularMap,ae=!!I.specularColorMap,te=!!I.specularIntensityMap,Ft=pt&&!!I.transmissionMap,D=pt&&!!I.thicknessMap,ht=!!I.gradientMap,Mt=!!I.alphaMap,Rt=I.alphaTest>0,Nt=!!I.alphaHash,re=!!I.extensions;let ue=Ni;I.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(ue=r.toneMapping);const ve={shaderID:st,shaderType:I.type,shaderName:I.name,vertexShader:Ct,fragmentShader:Q,defines:I.defines,customVertexShaderID:it,customFragmentShaderID:wt,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:m,batching:It,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:_,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Bi,alphaToCoverage:!!I.alphaToCoverage,map:Ut,matcap:ot,envMap:xt,envMapMode:xt&&rt.mapping,envMapCubeUVHeight:j,aoMap:bt,lightMap:E,bumpMap:et,normalMap:$,displacementMap:_&&A,emissiveMap:M,normalMapObjectSpace:$&&I.normalMapType===mg,normalMapTangentSpace:$&&I.normalMapType===xc,metalnessMap:B,roughnessMap:X,anisotropy:K,anisotropyMap:Tt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:At,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:zt,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Vt,specularMap:oe,specularColorMap:ae,specularIntensityMap:te,transmission:pt,transmissionMap:Ft,thicknessMap:D,gradientMap:ht,opaque:I.transparent===!1&&I.blending===ns&&I.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Rt,alphaHash:Nt,combine:I.combine,mapUv:Ut&&y(I.map.channel),aoMapUv:bt&&y(I.aoMap.channel),lightMapUv:E&&y(I.lightMap.channel),bumpMapUv:et&&y(I.bumpMap.channel),normalMapUv:$&&y(I.normalMap.channel),displacementMapUv:A&&y(I.displacementMap.channel),emissiveMapUv:M&&y(I.emissiveMap.channel),metalnessMapUv:B&&y(I.metalnessMap.channel),roughnessMapUv:X&&y(I.roughnessMap.channel),anisotropyMapUv:Tt&&y(I.anisotropyMap.channel),clearcoatMapUv:Et&&y(I.clearcoatMap.channel),clearcoatNormalMapUv:At&&y(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(I.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&y(I.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&y(I.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(I.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&y(I.sheenRoughnessMap.channel),specularMapUv:oe&&y(I.specularMap.channel),specularColorMapUv:ae&&y(I.specularColorMap.channel),specularIntensityMapUv:te&&y(I.specularIntensityMap.channel),transmissionMapUv:Ft&&y(I.transmissionMap.channel),thicknessMapUv:D&&y(I.thicknessMap.channel),alphaMapUv:Mt&&y(I.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&($||K),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(Ut||Mt),fog:!!C,useFog:I.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:tt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:I.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:ue,useLegacyLights:r._useLegacyLights,decodeVideoTexture:Ut&&I.map.isVideoTexture===!0&&ge.getTransfer(I.map.colorSpace)===we,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===dn,flipSided:I.side===xn,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:re&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:re&&I.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return ve.vertexUv1s=d.has(1),ve.vertexUv2s=d.has(2),ve.vertexUv3s=d.has(3),d.clear(),ve}function v(I){const R=[];if(I.shaderID?R.push(I.shaderID):(R.push(I.customVertexShaderID),R.push(I.customFragmentShaderID)),I.defines!==void 0)for(const W in I.defines)R.push(W),R.push(I.defines[W]);return I.isRawShaderMaterial===!1&&(S(R,I),w(R,I),R.push(r.outputColorSpace)),R.push(I.customProgramCacheKey),R.join()}function S(I,R){I.push(R.precision),I.push(R.outputColorSpace),I.push(R.envMapMode),I.push(R.envMapCubeUVHeight),I.push(R.mapUv),I.push(R.alphaMapUv),I.push(R.lightMapUv),I.push(R.aoMapUv),I.push(R.bumpMapUv),I.push(R.normalMapUv),I.push(R.displacementMapUv),I.push(R.emissiveMapUv),I.push(R.metalnessMapUv),I.push(R.roughnessMapUv),I.push(R.anisotropyMapUv),I.push(R.clearcoatMapUv),I.push(R.clearcoatNormalMapUv),I.push(R.clearcoatRoughnessMapUv),I.push(R.iridescenceMapUv),I.push(R.iridescenceThicknessMapUv),I.push(R.sheenColorMapUv),I.push(R.sheenRoughnessMapUv),I.push(R.specularMapUv),I.push(R.specularColorMapUv),I.push(R.specularIntensityMapUv),I.push(R.transmissionMapUv),I.push(R.thicknessMapUv),I.push(R.combine),I.push(R.fogExp2),I.push(R.sizeAttenuation),I.push(R.morphTargetsCount),I.push(R.morphAttributeCount),I.push(R.numDirLights),I.push(R.numPointLights),I.push(R.numSpotLights),I.push(R.numSpotLightMaps),I.push(R.numHemiLights),I.push(R.numRectAreaLights),I.push(R.numDirLightShadows),I.push(R.numPointLightShadows),I.push(R.numSpotLightShadows),I.push(R.numSpotLightShadowsWithMaps),I.push(R.numLightProbes),I.push(R.shadowMapType),I.push(R.toneMapping),I.push(R.numClippingPlanes),I.push(R.numClipIntersection),I.push(R.depthPacking)}function w(I,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),I.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.skinning&&c.enable(4),R.morphTargets&&c.enable(5),R.morphNormals&&c.enable(6),R.morphColors&&c.enable(7),R.premultipliedAlpha&&c.enable(8),R.shadowMapEnabled&&c.enable(9),R.useLegacyLights&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.alphaToCoverage&&c.enable(20),I.push(c.mask)}function P(I){const R=x[I.type];let W;if(R){const U=ti[R];W=Wg.clone(U.uniforms)}else W=I.uniforms;return W}function N(I,R){let W;for(let U=0,F=f.length;U<F;U++){const C=f[U];if(C.cacheKey===R){W=C,++W.usedTimes;break}}return W===void 0&&(W=new ix(r,R,I,o),f.push(W)),W}function O(I){if(--I.usedTimes===0){const R=f.indexOf(I);f[R]=f[f.length-1],f.pop(),I.destroy()}}function k(I){u.remove(I)}function H(){u.dispose()}return{getParameters:g,getProgramCacheKey:v,getUniforms:P,acquireProgram:N,releaseProgram:O,releaseShaderCache:k,programs:f,dispose:H}}function lx(){let r=new WeakMap;function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function e(o){r.delete(o)}function n(o,l,c){r.get(o)[l]=c}function s(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function cx(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Kh(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Jh(){const r=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(p,_,m,x,y,g){let v=r[t];return v===void 0?(v={id:p.id,object:p,geometry:_,material:m,groupOrder:x,renderOrder:p.renderOrder,z:y,group:g},r[t]=v):(v.id=p.id,v.object=p,v.geometry=_,v.material=m,v.groupOrder=x,v.renderOrder=p.renderOrder,v.z=y,v.group=g),t++,v}function c(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.push(v):m.transparent===!0?s.push(v):e.push(v)}function u(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function d(p,_){e.length>1&&e.sort(p||cx),n.length>1&&n.sort(_||Kh),s.length>1&&s.sort(_||Kh)}function f(){for(let p=t,_=r.length;p<_;p++){const m=r[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:u,finish:f,sort:d}}function ux(){let r=new WeakMap;function t(n,s){const o=r.get(n);let l;return o===void 0?(l=new Jh,r.set(n,[l])):s>=o.length?(l=new Jh,o.push(l)):l=o[s],l}function e(){r=new WeakMap}return{get:t,dispose:e}}function hx(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new J,color:new Qt};break;case"SpotLight":e={position:new J,direction:new J,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new J,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new J,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new J,halfWidth:new J,halfHeight:new J};break}return r[t.id]=e,e}}}function dx(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let fx=0;function px(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function mx(r){const t=new hx,e=dx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new J);const s=new J,o=new Te,l=new Te;function c(d,f){let p=0,_=0,m=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let x=0,y=0,g=0,v=0,S=0,w=0,P=0,N=0,O=0,k=0,H=0;d.sort(px);const I=f===!0?Math.PI:1;for(let W=0,U=d.length;W<U;W++){const F=d[W],C=F.color,Z=F.intensity,nt=F.distance,rt=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)p+=C.r*Z*I,_+=C.g*Z*I,m+=C.b*Z*I;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],Z);H++}else if(F.isDirectionalLight){const j=t.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity*I),F.castShadow){const st=F.shadow,at=e.get(F);at.shadowBias=st.bias,at.shadowNormalBias=st.normalBias,at.shadowRadius=st.radius,at.shadowMapSize=st.mapSize,n.directionalShadow[x]=at,n.directionalShadowMap[x]=rt,n.directionalShadowMatrix[x]=F.shadow.matrix,w++}n.directional[x]=j,x++}else if(F.isSpotLight){const j=t.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(C).multiplyScalar(Z*I),j.distance=nt,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[g]=j;const st=F.shadow;if(F.map&&(n.spotLightMap[O]=F.map,O++,st.updateMatrices(F),F.castShadow&&k++),n.spotLightMatrix[g]=st.matrix,F.castShadow){const at=e.get(F);at.shadowBias=st.bias,at.shadowNormalBias=st.normalBias,at.shadowRadius=st.radius,at.shadowMapSize=st.mapSize,n.spotShadow[g]=at,n.spotShadowMap[g]=rt,N++}g++}else if(F.isRectAreaLight){const j=t.get(F);j.color.copy(C).multiplyScalar(Z),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),n.rectArea[v]=j,v++}else if(F.isPointLight){const j=t.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity*I),j.distance=F.distance,j.decay=F.decay,F.castShadow){const st=F.shadow,at=e.get(F);at.shadowBias=st.bias,at.shadowNormalBias=st.normalBias,at.shadowRadius=st.radius,at.shadowMapSize=st.mapSize,at.shadowCameraNear=st.camera.near,at.shadowCameraFar=st.camera.far,n.pointShadow[y]=at,n.pointShadowMap[y]=rt,n.pointShadowMatrix[y]=F.shadow.matrix,P++}n.point[y]=j,y++}else if(F.isHemisphereLight){const j=t.get(F);j.skyColor.copy(F.color).multiplyScalar(Z*I),j.groundColor.copy(F.groundColor).multiplyScalar(Z*I),n.hemi[S]=j,S++}}v>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=_,n.ambient[2]=m;const R=n.hash;(R.directionalLength!==x||R.pointLength!==y||R.spotLength!==g||R.rectAreaLength!==v||R.hemiLength!==S||R.numDirectionalShadows!==w||R.numPointShadows!==P||R.numSpotShadows!==N||R.numSpotMaps!==O||R.numLightProbes!==H)&&(n.directional.length=x,n.spot.length=g,n.rectArea.length=v,n.point.length=y,n.hemi.length=S,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=N,n.spotShadowMap.length=N,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=N+O-k,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=k,n.numLightProbes=H,R.directionalLength=x,R.pointLength=y,R.spotLength=g,R.rectAreaLength=v,R.hemiLength=S,R.numDirectionalShadows=w,R.numPointShadows=P,R.numSpotShadows=N,R.numSpotMaps=O,R.numLightProbes=H,n.version=fx++)}function u(d,f){let p=0,_=0,m=0,x=0,y=0;const g=f.matrixWorldInverse;for(let v=0,S=d.length;v<S;v++){const w=d[v];if(w.isDirectionalLight){const P=n.directional[p];P.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),p++}else if(w.isSpotLight){const P=n.spot[m];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(g),P.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const P=n.rectArea[x];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(g),l.identity(),o.copy(w.matrixWorld),o.premultiply(g),l.extractRotation(o),P.halfWidth.set(w.width*.5,0,0),P.halfHeight.set(0,w.height*.5,0),P.halfWidth.applyMatrix4(l),P.halfHeight.applyMatrix4(l),x++}else if(w.isPointLight){const P=n.point[_];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(g),_++}else if(w.isHemisphereLight){const P=n.hemi[y];P.direction.setFromMatrixPosition(w.matrixWorld),P.direction.transformDirection(g),y++}}}return{setup:c,setupView:u,state:n}}function Qh(r){const t=new mx(r),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function u(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l}}function gx(r){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new Qh(r),t.set(s,[c])):o>=l.length?(c=new Qh(r),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class _x extends fr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=fg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class vx extends fr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const yx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xx=`uniform sampler2D shadow_pass;
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
}`;function bx(r,t,e){let n=new Mc;const s=new vt,o=new vt,l=new Ye,c=new _x({depthPacking:pg}),u=new vx,d={},f=e.maxTextureSize,p={[Ui]:xn,[xn]:Ui,[dn]:dn},_=new zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:yx,fragmentShader:xx}),m=_.clone();m.defines.HORIZONTAL_PASS=1;const x=new Oe;x.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ne(x,_),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=zd;let v=this.type;this.render=function(O,k,H){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||O.length===0)return;const I=r.getRenderTarget(),R=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),U=r.state;U.setBlending(Di),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=v!==mi&&this.type===mi,C=v===mi&&this.type!==mi;for(let Z=0,nt=O.length;Z<nt;Z++){const rt=O[Z],j=rt.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const st=j.getFrameExtents();if(s.multiply(st),o.copy(j.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/st.x),s.x=o.x*st.x,j.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/st.y),s.y=o.y*st.y,j.mapSize.y=o.y)),j.map===null||F===!0||C===!0){const q=this.type!==mi?{minFilter:Nn,magFilter:Nn}:{};j.map!==null&&j.map.dispose(),j.map=new ar(s.x,s.y,q),j.map.texture.name=rt.name+".shadowMap",j.camera.updateProjectionMatrix()}r.setRenderTarget(j.map),r.clear();const at=j.getViewportCount();for(let q=0;q<at;q++){const tt=j.getViewport(q);l.set(o.x*tt.x,o.y*tt.y,o.x*tt.z,o.y*tt.w),U.viewport(l),j.updateMatrices(rt,q),n=j.getFrustum(),P(k,H,j.camera,rt,this.type)}j.isPointLightShadow!==!0&&this.type===mi&&S(j,H),j.needsUpdate=!1}v=this.type,g.needsUpdate=!1,r.setRenderTarget(I,R,W)};function S(O,k){const H=t.update(y);_.defines.VSM_SAMPLES!==O.blurSamples&&(_.defines.VSM_SAMPLES=O.blurSamples,m.defines.VSM_SAMPLES=O.blurSamples,_.needsUpdate=!0,m.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ar(s.x,s.y)),_.uniforms.shadow_pass.value=O.map.texture,_.uniforms.resolution.value=O.mapSize,_.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(k,null,H,_,y,null),m.uniforms.shadow_pass.value=O.mapPass.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(k,null,H,m,y,null)}function w(O,k,H,I){let R=null;const W=H.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(W!==void 0)R=W;else if(R=H.isPointLight===!0?u:c,r.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0){const U=R.uuid,F=k.uuid;let C=d[U];C===void 0&&(C={},d[U]=C);let Z=C[F];Z===void 0&&(Z=R.clone(),C[F]=Z,k.addEventListener("dispose",N)),R=Z}if(R.visible=k.visible,R.wireframe=k.wireframe,I===mi?R.side=k.shadowSide!==null?k.shadowSide:k.side:R.side=k.shadowSide!==null?k.shadowSide:p[k.side],R.alphaMap=k.alphaMap,R.alphaTest=k.alphaTest,R.map=k.map,R.clipShadows=k.clipShadows,R.clippingPlanes=k.clippingPlanes,R.clipIntersection=k.clipIntersection,R.displacementMap=k.displacementMap,R.displacementScale=k.displacementScale,R.displacementBias=k.displacementBias,R.wireframeLinewidth=k.wireframeLinewidth,R.linewidth=k.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const U=r.properties.get(R);U.light=H}return R}function P(O,k,H,I,R){if(O.visible===!1)return;if(O.layers.test(k.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===mi)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,O.matrixWorld);const F=t.update(O),C=O.material;if(Array.isArray(C)){const Z=F.groups;for(let nt=0,rt=Z.length;nt<rt;nt++){const j=Z[nt],st=C[j.materialIndex];if(st&&st.visible){const at=w(O,st,I,R);O.onBeforeShadow(r,O,k,H,F,at,j),r.renderBufferDirect(H,null,F,at,O,j),O.onAfterShadow(r,O,k,H,F,at,j)}}}else if(C.visible){const Z=w(O,C,I,R);O.onBeforeShadow(r,O,k,H,F,Z,null),r.renderBufferDirect(H,null,F,Z,O,null),O.onAfterShadow(r,O,k,H,F,Z,null)}}const U=O.children;for(let F=0,C=U.length;F<C;F++)P(U[F],k,H,I,R)}function N(O){O.target.removeEventListener("dispose",N);for(const H in d){const I=d[H],R=O.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function wx(r){function t(){let D=!1;const ht=new Ye;let Mt=null;const Rt=new Ye(0,0,0,0);return{setMask:function(Nt){Mt!==Nt&&!D&&(r.colorMask(Nt,Nt,Nt,Nt),Mt=Nt)},setLocked:function(Nt){D=Nt},setClear:function(Nt,re,ue,ve,ke){ke===!0&&(Nt*=ve,re*=ve,ue*=ve),ht.set(Nt,re,ue,ve),Rt.equals(ht)===!1&&(r.clearColor(Nt,re,ue,ve),Rt.copy(ht))},reset:function(){D=!1,Mt=null,Rt.set(-1,0,0,0)}}}function e(){let D=!1,ht=null,Mt=null,Rt=null;return{setTest:function(Nt){Nt?wt(r.DEPTH_TEST):St(r.DEPTH_TEST)},setMask:function(Nt){ht!==Nt&&!D&&(r.depthMask(Nt),ht=Nt)},setFunc:function(Nt){if(Mt!==Nt){switch(Nt){case Hm:r.depthFunc(r.NEVER);break;case Vm:r.depthFunc(r.ALWAYS);break;case Gm:r.depthFunc(r.LESS);break;case ca:r.depthFunc(r.LEQUAL);break;case Wm:r.depthFunc(r.EQUAL);break;case Zm:r.depthFunc(r.GEQUAL);break;case Xm:r.depthFunc(r.GREATER);break;case qm:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Mt=Nt}},setLocked:function(Nt){D=Nt},setClear:function(Nt){Rt!==Nt&&(r.clearDepth(Nt),Rt=Nt)},reset:function(){D=!1,ht=null,Mt=null,Rt=null}}}function n(){let D=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,ve=null,ke=null;return{setTest:function(me){D||(me?wt(r.STENCIL_TEST):St(r.STENCIL_TEST))},setMask:function(me){ht!==me&&!D&&(r.stencilMask(me),ht=me)},setFunc:function(me,Ce,Ee){(Mt!==me||Rt!==Ce||Nt!==Ee)&&(r.stencilFunc(me,Ce,Ee),Mt=me,Rt=Ce,Nt=Ee)},setOp:function(me,Ce,Ee){(re!==me||ue!==Ce||ve!==Ee)&&(r.stencilOp(me,Ce,Ee),re=me,ue=Ce,ve=Ee)},setLocked:function(me){D=me},setClear:function(me){ke!==me&&(r.clearStencil(me),ke=me)},reset:function(){D=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,ve=null,ke=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,u=new WeakMap;let d={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,w=null,P=null,N=null,O=new Qt(0,0,0),k=0,H=!1,I=null,R=null,W=null,U=null,F=null;const C=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,nt=0;const rt=r.getParameter(r.VERSION);rt.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(rt)[1]),Z=nt>=1):rt.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(rt)[1]),Z=nt>=2);let j=null,st={};const at=r.getParameter(r.SCISSOR_BOX),q=r.getParameter(r.VIEWPORT),tt=new Ye().fromArray(at),Ct=new Ye().fromArray(q);function Q(D,ht,Mt,Rt){const Nt=new Uint8Array(4),re=r.createTexture();r.bindTexture(D,re),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ue=0;ue<Mt;ue++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(ht,0,r.RGBA,1,1,Rt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(ht+ue,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return re}const it={};it[r.TEXTURE_2D]=Q(r.TEXTURE_2D,r.TEXTURE_2D,1),it[r.TEXTURE_CUBE_MAP]=Q(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[r.TEXTURE_2D_ARRAY]=Q(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),it[r.TEXTURE_3D]=Q(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),wt(r.DEPTH_TEST),o.setFunc(ca),et(!1),$(Ou),wt(r.CULL_FACE),bt(Di);function wt(D){d[D]!==!0&&(r.enable(D),d[D]=!0)}function St(D){d[D]!==!1&&(r.disable(D),d[D]=!1)}function Pt(D,ht){return f[D]!==ht?(r.bindFramebuffer(D,ht),f[D]=ht,D===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ht),D===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ht),!0):!1}function It(D,ht){let Mt=_,Rt=!1;if(D){Mt=p.get(ht),Mt===void 0&&(Mt=[],p.set(ht,Mt));const Nt=D.textures;if(Mt.length!==Nt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let re=0,ue=Nt.length;re<ue;re++)Mt[re]=r.COLOR_ATTACHMENT0+re;Mt.length=Nt.length,Rt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Rt=!0);Rt&&r.drawBuffers(Mt)}function Ut(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const ot={[tr]:r.FUNC_ADD,[Sm]:r.FUNC_SUBTRACT,[Em]:r.FUNC_REVERSE_SUBTRACT};ot[Tm]=r.MIN,ot[Am]=r.MAX;const xt={[Lm]:r.ZERO,[Cm]:r.ONE,[Pm]:r.SRC_COLOR,[tc]:r.SRC_ALPHA,[km]:r.SRC_ALPHA_SATURATE,[Nm]:r.DST_COLOR,[Im]:r.DST_ALPHA,[Rm]:r.ONE_MINUS_SRC_COLOR,[ec]:r.ONE_MINUS_SRC_ALPHA,[Om]:r.ONE_MINUS_DST_COLOR,[Dm]:r.ONE_MINUS_DST_ALPHA,[Um]:r.CONSTANT_COLOR,[zm]:r.ONE_MINUS_CONSTANT_COLOR,[Bm]:r.CONSTANT_ALPHA,[Fm]:r.ONE_MINUS_CONSTANT_ALPHA};function bt(D,ht,Mt,Rt,Nt,re,ue,ve,ke,me){if(D===Di){x===!0&&(St(r.BLEND),x=!1);return}if(x===!1&&(wt(r.BLEND),x=!0),D!==Mm){if(D!==y||me!==H){if((g!==tr||w!==tr)&&(r.blendEquation(r.FUNC_ADD),g=tr,w=tr),me)switch(D){case ns:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ku:r.blendFunc(r.ONE,r.ONE);break;case Uu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zu:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ns:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ku:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Uu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case zu:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,S=null,P=null,N=null,O.set(0,0,0),k=0,y=D,H=me}return}Nt=Nt||ht,re=re||Mt,ue=ue||Rt,(ht!==g||Nt!==w)&&(r.blendEquationSeparate(ot[ht],ot[Nt]),g=ht,w=Nt),(Mt!==v||Rt!==S||re!==P||ue!==N)&&(r.blendFuncSeparate(xt[Mt],xt[Rt],xt[re],xt[ue]),v=Mt,S=Rt,P=re,N=ue),(ve.equals(O)===!1||ke!==k)&&(r.blendColor(ve.r,ve.g,ve.b,ke),O.copy(ve),k=ke),y=D,H=!1}function E(D,ht){D.side===dn?St(r.CULL_FACE):wt(r.CULL_FACE);let Mt=D.side===xn;ht&&(Mt=!Mt),et(Mt),D.blending===ns&&D.transparent===!1?bt(Di):bt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Rt=D.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),M(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?wt(r.SAMPLE_ALPHA_TO_COVERAGE):St(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){I!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),I=D)}function $(D){D!==xm?(wt(r.CULL_FACE),D!==R&&(D===Ou?r.cullFace(r.BACK):D===bm?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):St(r.CULL_FACE),R=D}function A(D){D!==W&&(Z&&r.lineWidth(D),W=D)}function M(D,ht,Mt){D?(wt(r.POLYGON_OFFSET_FILL),(U!==ht||F!==Mt)&&(r.polygonOffset(ht,Mt),U=ht,F=Mt)):St(r.POLYGON_OFFSET_FILL)}function B(D){D?wt(r.SCISSOR_TEST):St(r.SCISSOR_TEST)}function X(D){D===void 0&&(D=r.TEXTURE0+C-1),j!==D&&(r.activeTexture(D),j=D)}function K(D,ht,Mt){Mt===void 0&&(j===null?Mt=r.TEXTURE0+C-1:Mt=j);let Rt=st[Mt];Rt===void 0&&(Rt={type:void 0,texture:void 0},st[Mt]=Rt),(Rt.type!==D||Rt.texture!==ht)&&(j!==Mt&&(r.activeTexture(Mt),j=Mt),r.bindTexture(D,ht||it[D]),Rt.type=D,Rt.texture=ht)}function G(){const D=st[j];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ft(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Vt(D){tt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function oe(D){Ct.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Ct.copy(D))}function ae(D,ht){let Mt=u.get(ht);Mt===void 0&&(Mt=new WeakMap,u.set(ht,Mt));let Rt=Mt.get(D);Rt===void 0&&(Rt=r.getUniformBlockIndex(ht,D.name),Mt.set(D,Rt))}function te(D,ht){const Rt=u.get(ht).get(D);c.get(ht)!==Rt&&(r.uniformBlockBinding(ht,Rt,D.__bindingPointIndex),c.set(ht,Rt))}function Ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},j=null,st={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,w=null,P=null,N=null,O=new Qt(0,0,0),k=0,H=!1,I=null,R=null,W=null,U=null,F=null,tt.set(0,0,r.canvas.width,r.canvas.height),Ct.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:wt,disable:St,bindFramebuffer:Pt,drawBuffers:It,useProgram:Ut,setBlending:bt,setMaterial:E,setFlipSided:et,setCullFace:$,setLineWidth:A,setPolygonOffset:M,setScissorTest:B,activeTexture:X,bindTexture:K,unbindTexture:G,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Kt,updateUBOMapping:ae,uniformBlockBinding:te,texStorage2D:Ht,texStorage3D:zt,texSubImage2D:pt,texSubImage3D:Tt,compressedTexSubImage2D:Et,compressedTexSubImage3D:At,scissor:Vt,viewport:oe,reset:Ft}}function Mx(r,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new vt,f=new WeakMap;let p;const _=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,M){return m?new OffscreenCanvas(A,M):ma("canvas")}function y(A,M,B){let X=1;const K=$(A);if((K.width>B||K.height>B)&&(X=B/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const G=Math.floor(X*K.width),ft=Math.floor(X*K.height);p===void 0&&(p=x(G,ft));const lt=M?x(G,ft):p;return lt.width=G,lt.height=ft,lt.getContext("2d").drawImage(A,0,0,G,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+ft+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function g(A){return A.generateMipmaps&&A.minFilter!==Nn&&A.minFilter!==Gn}function v(A){r.generateMipmap(A)}function S(A,M,B,X,K=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let G=M;if(M===r.RED&&(B===r.FLOAT&&(G=r.R32F),B===r.HALF_FLOAT&&(G=r.R16F),B===r.UNSIGNED_BYTE&&(G=r.R8)),M===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.R8UI),B===r.UNSIGNED_SHORT&&(G=r.R16UI),B===r.UNSIGNED_INT&&(G=r.R32UI),B===r.BYTE&&(G=r.R8I),B===r.SHORT&&(G=r.R16I),B===r.INT&&(G=r.R32I)),M===r.RG&&(B===r.FLOAT&&(G=r.RG32F),B===r.HALF_FLOAT&&(G=r.RG16F),B===r.UNSIGNED_BYTE&&(G=r.RG8)),M===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.RG8UI),B===r.UNSIGNED_SHORT&&(G=r.RG16UI),B===r.UNSIGNED_INT&&(G=r.RG32UI),B===r.BYTE&&(G=r.RG8I),B===r.SHORT&&(G=r.RG16I),B===r.INT&&(G=r.RG32I)),M===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&(G=r.RGB9_E5),M===r.RGBA){const ft=K?ha:ge.getTransfer(X);B===r.FLOAT&&(G=r.RGBA32F),B===r.HALF_FLOAT&&(G=r.RGBA16F),B===r.UNSIGNED_BYTE&&(G=ft===we?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(G=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(G=r.RGB5_A1)}return(G===r.R16F||G===r.R32F||G===r.RG16F||G===r.RG32F||G===r.RGBA16F||G===r.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function w(A,M){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==Nn&&A.minFilter!==Gn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function P(A){const M=A.target;M.removeEventListener("dispose",P),O(M),M.isVideoTexture&&f.delete(M)}function N(A){const M=A.target;M.removeEventListener("dispose",N),H(M)}function O(A){const M=n.get(A);if(M.__webglInit===void 0)return;const B=A.source,X=_.get(B);if(X){const K=X[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&k(A),Object.keys(X).length===0&&_.delete(B)}n.remove(A)}function k(A){const M=n.get(A);r.deleteTexture(M.__webglTexture);const B=A.source,X=_.get(B);delete X[M.__cacheKey],l.memory.textures--}function H(A){const M=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(M.__webglFramebuffer[X]))for(let K=0;K<M.__webglFramebuffer[X].length;K++)r.deleteFramebuffer(M.__webglFramebuffer[X][K]);else r.deleteFramebuffer(M.__webglFramebuffer[X]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[X])}else{if(Array.isArray(M.__webglFramebuffer))for(let X=0;X<M.__webglFramebuffer.length;X++)r.deleteFramebuffer(M.__webglFramebuffer[X]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let X=0;X<M.__webglColorRenderbuffer.length;X++)M.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[X]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=A.textures;for(let X=0,K=B.length;X<K;X++){const G=n.get(B[X]);G.__webglTexture&&(r.deleteTexture(G.__webglTexture),l.memory.textures--),n.remove(B[X])}n.remove(A)}let I=0;function R(){I=0}function W(){const A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function U(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function F(A,M){const B=n.get(A);if(A.isVideoTexture&&E(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const X=A.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(B,A,M);return}}e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+M)}function C(A,M){const B=n.get(A);if(A.version>0&&B.__version!==A.version){tt(B,A,M);return}e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+M)}function Z(A,M){const B=n.get(A);if(A.version>0&&B.__version!==A.version){tt(B,A,M);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+M)}function nt(A,M){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Ct(B,A,M);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+M)}const rt={[rc]:r.REPEAT,[rr]:r.CLAMP_TO_EDGE,[sc]:r.MIRRORED_REPEAT},j={[Nn]:r.NEAREST,[ng]:r.NEAREST_MIPMAP_NEAREST,[Ao]:r.NEAREST_MIPMAP_LINEAR,[Gn]:r.LINEAR,[al]:r.LINEAR_MIPMAP_NEAREST,[sr]:r.LINEAR_MIPMAP_LINEAR},st={[gg]:r.NEVER,[wg]:r.ALWAYS,[_g]:r.LESS,[Yd]:r.LEQUAL,[vg]:r.EQUAL,[bg]:r.GEQUAL,[yg]:r.GREATER,[xg]:r.NOTEQUAL};function at(A,M){if(M.type===Ii&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Gn||M.magFilter===al||M.magFilter===Ao||M.magFilter===sr||M.minFilter===Gn||M.minFilter===al||M.minFilter===Ao||M.minFilter===sr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,rt[M.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,rt[M.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,rt[M.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,j[M.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,j[M.minFilter]),M.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,st[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Nn||M.minFilter!==Ao&&M.minFilter!==sr||M.type===Ii&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function q(A,M){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",P));const X=M.source;let K=_.get(X);K===void 0&&(K={},_.set(X,K));const G=U(M);if(G!==A.__cacheKey){K[G]===void 0&&(K[G]={texture:r.createTexture(),usedTimes:0},l.memory.textures++,B=!0),K[G].usedTimes++;const ft=K[A.__cacheKey];ft!==void 0&&(K[A.__cacheKey].usedTimes--,ft.usedTimes===0&&k(M)),A.__cacheKey=G,A.__webglTexture=K[G].texture}return B}function tt(A,M,B){let X=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(X=r.TEXTURE_3D);const K=q(A,M),G=M.source;e.bindTexture(X,A.__webglTexture,r.TEXTURE0+B);const ft=n.get(G);if(G.version!==ft.__version||K===!0){e.activeTexture(r.TEXTURE0+B);const lt=ge.getPrimaries(ge.workingColorSpace),pt=M.colorSpace===Ri?null:ge.getPrimaries(M.colorSpace),Tt=M.colorSpace===Ri||lt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=y(M.image,!1,s.maxTextureSize);Et=et(M,Et);const At=o.convert(M.format,M.colorSpace),Ht=o.convert(M.type);let zt=S(M.internalFormat,At,Ht,M.colorSpace,M.isVideoTexture);at(X,M);let Dt;const Kt=M.mipmaps,Vt=M.isVideoTexture!==!0&&zt!==jd,oe=ft.__version===void 0||K===!0,ae=G.dataReady,te=w(M,Et);if(M.isDepthTexture)zt=r.DEPTH_COMPONENT16,M.type===Ii?zt=r.DEPTH_COMPONENT32F:M.type===cs?zt=r.DEPTH_COMPONENT24:M.type===to&&(zt=r.DEPTH24_STENCIL8),oe&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,zt,Et.width,Et.height):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,null));else if(M.isDataTexture)if(Kt.length>0){Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data);M.generateMipmaps=!1}else Vt?(oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Et.width,Et.height),ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Et.width,Et.height,At,Ht,Et.data)):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,Et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Vt&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,te,zt,Kt[0].width,Kt[0].height,Et.depth);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],M.format!==ni?At!==null?Vt?ae&&e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Dt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Ht,Dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,At,Ht,Dt.data)}else{Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],M.format!==ni?At!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(M.isDataArrayTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(M.isData3DTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_3D,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_3D,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(M.isFramebufferTexture){if(oe)if(Vt)e.texStorage2D(r.TEXTURE_2D,te,zt,Et.width,Et.height);else{let Ft=Et.width,D=Et.height;for(let ht=0;ht<te;ht++)e.texImage2D(r.TEXTURE_2D,ht,zt,Ft,D,0,At,Ht,null),Ft>>=1,D>>=1}}else if(Kt.length>0){if(Vt&&oe){const Ft=$(Kt[0]);e.texStorage2D(r.TEXTURE_2D,te,zt,Ft.width,Ft.height)}for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,At,Ht,Dt):e.texImage2D(r.TEXTURE_2D,Ft,zt,At,Ht,Dt);M.generateMipmaps=!1}else if(Vt){if(oe){const Ft=$(Et);e.texStorage2D(r.TEXTURE_2D,te,zt,Ft.width,Ft.height)}ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,Et)}else e.texImage2D(r.TEXTURE_2D,0,zt,At,Ht,Et);g(M)&&v(X),ft.__version=G.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Ct(A,M,B){if(M.image.length!==6)return;const X=q(A,M),K=M.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+B);const G=n.get(K);if(K.version!==G.__version||X===!0){e.activeTexture(r.TEXTURE0+B);const ft=ge.getPrimaries(ge.workingColorSpace),lt=M.colorSpace===Ri?null:ge.getPrimaries(M.colorSpace),pt=M.colorSpace===Ri||ft===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Tt=M.isCompressedTexture||M.image[0].isCompressedTexture,Et=M.image[0]&&M.image[0].isDataTexture,At=[];for(let D=0;D<6;D++)!Tt&&!Et?At[D]=y(M.image[D],!0,s.maxCubemapSize):At[D]=Et?M.image[D].image:M.image[D],At[D]=et(M,At[D]);const Ht=At[0],zt=o.convert(M.format,M.colorSpace),Dt=o.convert(M.type),Kt=S(M.internalFormat,zt,Dt,M.colorSpace),Vt=M.isVideoTexture!==!0,oe=G.__version===void 0||X===!0,ae=K.dataReady;let te=w(M,Ht);at(r.TEXTURE_CUBE_MAP,M);let Ft;if(Tt){Vt&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,te,Kt,Ht.width,Ht.height);for(let D=0;D<6;D++){Ft=At[D].mipmaps;for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];M.format!==ni?zt!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,0,0,Mt.width,Mt.height,zt,Mt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,Kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,0,0,Mt.width,Mt.height,zt,Dt,Mt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,Kt,Mt.width,Mt.height,0,zt,Dt,Mt.data)}}}else{if(Ft=M.mipmaps,Vt&&oe){Ft.length>0&&te++;const D=$(At[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,te,Kt,D.width,D.height)}for(let D=0;D<6;D++)if(Et){Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,At[D].width,At[D].height,zt,Dt,At[D].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,At[D].width,At[D].height,0,zt,Dt,At[D].data);for(let ht=0;ht<Ft.length;ht++){const Rt=Ft[ht].image[D].image;Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,0,0,Rt.width,Rt.height,zt,Dt,Rt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,Kt,Rt.width,Rt.height,0,zt,Dt,Rt.data)}}else{Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,zt,Dt,At[D]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,zt,Dt,At[D]);for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,0,0,zt,Dt,Mt.image[D]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,Kt,zt,Dt,Mt.image[D])}}}g(M)&&v(r.TEXTURE_CUBE_MAP),G.__version=K.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Q(A,M,B,X,K,G){const ft=o.convert(B.format,B.colorSpace),lt=o.convert(B.type),pt=S(B.internalFormat,ft,lt,B.colorSpace);if(!n.get(M).__hasExternalTextures){const Et=Math.max(1,M.width>>G),At=Math.max(1,M.height>>G);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?e.texImage3D(K,G,pt,Et,At,M.depth,0,ft,lt,null):e.texImage2D(K,G,pt,Et,At,0,ft,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),bt(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,K,n.get(B).__webglTexture,0,xt(M)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,K,n.get(B).__webglTexture,G),e.bindFramebuffer(r.FRAMEBUFFER,null)}function it(A,M,B){if(r.bindRenderbuffer(r.RENDERBUFFER,A),M.depthBuffer&&!M.stencilBuffer){let X=r.DEPTH_COMPONENT24;if(B||bt(M)){const K=M.depthTexture;K&&K.isDepthTexture&&(K.type===Ii?X=r.DEPTH_COMPONENT32F:K.type===cs&&(X=r.DEPTH_COMPONENT24));const G=xt(M);bt(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,G,X,M.width,M.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,G,X,M.width,M.height)}else r.renderbufferStorage(r.RENDERBUFFER,X,M.width,M.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,A)}else if(M.depthBuffer&&M.stencilBuffer){const X=xt(M);B&&bt(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,M.width,M.height):bt(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,A)}else{const X=M.textures;for(let K=0;K<X.length;K++){const G=X[K],ft=o.convert(G.format,G.colorSpace),lt=o.convert(G.type),pt=S(G.internalFormat,ft,lt,G.colorSpace),Tt=xt(M);B&&bt(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Tt,pt,M.width,M.height):bt(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Tt,pt,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,pt,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function wt(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),F(M.depthTexture,0);const X=n.get(M.depthTexture).__webglTexture,K=xt(M);if(M.depthTexture.format===is)bt(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else if(M.depthTexture.format===js)bt(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function St(A){const M=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");wt(M.__webglFramebuffer,A)}else if(B){M.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[X]),M.__webglDepthbuffer[X]=r.createRenderbuffer(),it(M.__webglDepthbuffer[X],A,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),it(M.__webglDepthbuffer,A,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(A,M,B){const X=n.get(A);M!==void 0&&Q(X.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&St(A)}function It(A){const M=A.texture,B=n.get(A),X=n.get(M);A.addEventListener("dispose",N);const K=A.textures,G=A.isWebGLCubeRenderTarget===!0,ft=K.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=M.version,l.memory.textures++),G){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let pt=0;pt<M.mipmaps.length;pt++)B.__webglFramebuffer[lt][pt]=r.createFramebuffer()}else B.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)B.__webglFramebuffer[lt]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ft)for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=n.get(K[lt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=r.createTexture(),l.memory.textures++)}if(A.samples>0&&bt(A)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const pt=K[lt];B.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Tt=o.convert(pt.format,pt.colorSpace),Et=o.convert(pt.type),At=S(pt.internalFormat,Tt,Et,pt.colorSpace,A.isXRRenderTarget===!0),Ht=xt(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,At,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),it(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(G){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),at(r.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)Q(B.__webglFramebuffer[lt][pt],A,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else Q(B.__webglFramebuffer[lt],A,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(M)&&v(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=K[lt],Et=n.get(Tt);e.bindTexture(r.TEXTURE_2D,Et.__webglTexture),at(r.TEXTURE_2D,Tt),Q(B.__webglFramebuffer,A,Tt,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),g(Tt)&&v(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),at(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)Q(B.__webglFramebuffer[pt],A,M,r.COLOR_ATTACHMENT0,lt,pt);else Q(B.__webglFramebuffer,A,M,r.COLOR_ATTACHMENT0,lt,0);g(M)&&v(lt),e.unbindTexture()}A.depthBuffer&&St(A)}function Ut(A){const M=A.textures;for(let B=0,X=M.length;B<X;B++){const K=M[B];if(g(K)){const G=A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ft=n.get(K).__webglTexture;e.bindTexture(G,ft),v(G),e.unbindTexture()}}}function ot(A){if(A.samples>0&&bt(A)===!1){const M=A.textures,B=A.width,X=A.height;let K=r.COLOR_BUFFER_BIT;const G=[],ft=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(A),pt=M.length>1;if(pt)for(let Tt=0;Tt<M.length;Tt++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Tt=0;Tt<M.length;Tt++){G.push(r.COLOR_ATTACHMENT0+Tt),A.depthBuffer&&G.push(ft);const Et=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Et===!1&&(A.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&(K|=r.STENCIL_BUFFER_BIT)),pt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]),Et===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ft]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ft])),pt){const At=n.get(M[Tt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,At,0)}r.blitFramebuffer(0,0,B,X,0,0,B,X,K,r.NEAREST),u&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,G)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<M.length;Tt++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]);const Et=n.get(M[Tt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,Et,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function xt(A){return Math.min(s.maxSamples,A.samples)}function bt(A){const M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function E(A){const M=l.render.frame;f.get(A)!==M&&(f.set(A,M),A.update())}function et(A,M){const B=A.colorSpace,X=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Bi&&B!==Ri&&(ge.getTransfer(B)===we?(X!==ni||K!==Oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function $(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(d.width=A.naturalWidth||A.width,d.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(d.width=A.displayWidth,d.height=A.displayHeight):(d.width=A.width,d.height=A.height),d}this.allocateTextureUnit=W,this.resetTextureUnits=R,this.setTexture2D=F,this.setTexture2DArray=C,this.setTexture3D=Z,this.setTextureCube=nt,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=ot,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=bt}function Sx(r,t){function e(n,s=Ri){let o;const l=ge.getTransfer(s);if(n===Oi)return r.UNSIGNED_BYTE;if(n===Gd)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Wd)return r.UNSIGNED_SHORT_5_5_5_1;if(n===sg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===ig)return r.BYTE;if(n===rg)return r.SHORT;if(n===Hd)return r.UNSIGNED_SHORT;if(n===Vd)return r.INT;if(n===cs)return r.UNSIGNED_INT;if(n===Ii)return r.FLOAT;if(n===ua)return r.HALF_FLOAT;if(n===og)return r.ALPHA;if(n===ag)return r.RGB;if(n===ni)return r.RGBA;if(n===lg)return r.LUMINANCE;if(n===cg)return r.LUMINANCE_ALPHA;if(n===is)return r.DEPTH_COMPONENT;if(n===js)return r.DEPTH_STENCIL;if(n===ug)return r.RED;if(n===Zd)return r.RED_INTEGER;if(n===hg)return r.RG;if(n===Xd)return r.RG_INTEGER;if(n===qd)return r.RGBA_INTEGER;if(n===ll||n===cl||n===ul||n===hl)if(l===we)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===ll)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===cl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ul)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===hl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===ll)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===cl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ul)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===hl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Bu||n===Fu||n===Hu||n===Vu)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Bu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Fu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Hu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===jd)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Gu||n===Wu)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Gu)return l===we?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Wu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zu||n===Xu||n===qu||n===ju||n===Yu||n===$u||n===Ku||n===Ju||n===Qu||n===th||n===eh||n===nh||n===ih||n===rh)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Zu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Xu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ju)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Yu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$u)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ku)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ju)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===th)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===eh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ih)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===rh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===dl||n===sh||n===oh)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===dl)return l===we?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===sh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===oh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===dg||n===ah||n===lh||n===ch)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===dl)return o.COMPRESSED_RED_RGTC1_EXT;if(n===ah)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ch)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===to?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Ex extends Sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Jr extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Tx={type:"move"};class zl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,u=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const y of t.hand.values()){const g=e.getJointPose(y,n),v=this._getHandJoint(d,y);g!==null&&(v.matrix.fromArray(g.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=g.radius),v.visible=g!==null}const f=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],_=f.position.distanceTo(p.position),m=.02,x=.005;d.inputState.pinching&&_>m+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&_<=m-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Tx)))}return c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Jr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Ax=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Lx=`
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

}`;class Cx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new pn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new zi({vertexShader:Ax,fragmentShader:Lx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ne(new no(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Px extends dr{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",u=1,d=null,f=null,p=null,_=null,m=null,x=null;const y=new Cx,g=e.getContextAttributes();let v=null,S=null;const w=[],P=[],N=new vt;let O=null;const k=new Sn;k.layers.enable(1),k.viewport=new Ye;const H=new Sn;H.layers.enable(2),H.viewport=new Ye;const I=[k,H],R=new Ex;R.layers.enable(1),R.layers.enable(2);let W=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let it=w[Q];return it===void 0&&(it=new zl,w[Q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Q){let it=w[Q];return it===void 0&&(it=new zl,w[Q]=it),it.getGripSpace()},this.getHand=function(Q){let it=w[Q];return it===void 0&&(it=new zl,w[Q]=it),it.getHandSpace()};function F(Q){const it=P.indexOf(Q.inputSource);if(it===-1)return;const wt=w[it];wt!==void 0&&(wt.update(Q.inputSource,Q.frame,d||l),wt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function C(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",C),s.removeEventListener("inputsourceschange",Z);for(let Q=0;Q<w.length;Q++){const it=P[Q];it!==null&&(P[Q]=null,w[Q].disconnect(it))}W=null,U=null,y.reset(),t.setRenderTarget(v),m=null,_=null,p=null,s=null,S=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(O),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(Q){d=Q},this.getBaseLayer=function(){return _!==null?_:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",C),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const it={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new ar(m.framebufferWidth,m.framebufferHeight,{format:ni,type:Oi,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let it=null,wt=null,St=null;g.depth&&(St=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=g.stencil?js:is,wt=g.stencil?to:cs);const Pt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:o};p=new XRWebGLBinding(s,e),_=p.createProjectionLayer(Pt),s.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),S=new ar(_.textureWidth,_.textureHeight,{format:ni,type:Oi,depthTexture:new cf(_.textureWidth,_.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const It=t.properties.get(S);It.__ignoreDepthValues=_.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(u),d=null,l=await s.requestReferenceSpace(c),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(Q){for(let it=0;it<Q.removed.length;it++){const wt=Q.removed[it],St=P.indexOf(wt);St>=0&&(P[St]=null,w[St].disconnect(wt))}for(let it=0;it<Q.added.length;it++){const wt=Q.added[it];let St=P.indexOf(wt);if(St===-1){for(let It=0;It<w.length;It++)if(It>=P.length){P.push(wt),St=It;break}else if(P[It]===null){P[It]=wt,St=It;break}if(St===-1)break}const Pt=w[St];Pt&&Pt.connect(wt)}}const nt=new J,rt=new J;function j(Q,it,wt){nt.setFromMatrixPosition(it.matrixWorld),rt.setFromMatrixPosition(wt.matrixWorld);const St=nt.distanceTo(rt),Pt=it.projectionMatrix.elements,It=wt.projectionMatrix.elements,Ut=Pt[14]/(Pt[10]-1),ot=Pt[14]/(Pt[10]+1),xt=(Pt[9]+1)/Pt[5],bt=(Pt[9]-1)/Pt[5],E=(Pt[8]-1)/Pt[0],et=(It[8]+1)/It[0],$=Ut*E,A=Ut*et,M=St/(-E+et),B=M*-E;it.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(B),Q.translateZ(M),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const X=Ut+M,K=ot+M,G=$-B,ft=A+(St-B),lt=xt*ot/K*X,pt=bt*ot/K*X;Q.projectionMatrix.makePerspective(G,ft,lt,pt,X,K),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function st(Q,it){it===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(it.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;y.texture!==null&&(Q.near=y.depthNear,Q.far=y.depthFar),R.near=H.near=k.near=Q.near,R.far=H.far=k.far=Q.far,(W!==R.near||U!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),W=R.near,U=R.far,k.near=W,k.far=U,H.near=W,H.far=U,k.updateProjectionMatrix(),H.updateProjectionMatrix(),Q.updateProjectionMatrix());const it=Q.parent,wt=R.cameras;st(R,it);for(let St=0;St<wt.length;St++)st(wt[St],it);wt.length===2?j(R,k,H):R.projectionMatrix.copy(k.projectionMatrix),at(Q,R,it)};function at(Q,it,wt){wt===null?Q.matrix.copy(it.matrixWorld):(Q.matrix.copy(wt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(it.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(it.projectionMatrix),Q.projectionMatrixInverse.copy(it.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=oc*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(_===null&&m===null))return u},this.setFoveation=function(Q){u=Q,_!==null&&(_.fixedFoveation=Q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Q)},this.hasDepthSensing=function(){return y.texture!==null};let q=null;function tt(Q,it){if(f=it.getViewerPose(d||l),x=it,f!==null){const wt=f.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let St=!1;wt.length!==R.cameras.length&&(R.cameras.length=0,St=!0);for(let It=0;It<wt.length;It++){const Ut=wt[It];let ot=null;if(m!==null)ot=m.getViewport(Ut);else{const bt=p.getViewSubImage(_,Ut);ot=bt.viewport,It===0&&(t.setRenderTargetTextures(S,bt.colorTexture,_.ignoreDepthValues?void 0:bt.depthStencilTexture),t.setRenderTarget(S))}let xt=I[It];xt===void 0&&(xt=new Sn,xt.layers.enable(It),xt.viewport=new Ye,I[It]=xt),xt.matrix.fromArray(Ut.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(Ut.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(ot.x,ot.y,ot.width,ot.height),It===0&&(R.matrix.copy(xt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),St===!0&&R.cameras.push(xt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=p.getDepthInformation(wt[0]);It&&It.isValid&&It.texture&&y.init(t,It,s.renderState)}}for(let wt=0;wt<w.length;wt++){const St=P[wt],Pt=w[wt];St!==null&&Pt!==void 0&&Pt.update(St,it,d||l)}y.render(t,R),q&&q(Q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),x=null}const Ct=new af;Ct.setAnimationLoop(tt),this.setAnimationLoop=function(Q){q=Q},this.dispose=function(){}}}const Ji=new qn,Rx=new Te;function Ix(r,t){function e(g,v){g.matrixAutoUpdate===!0&&g.updateMatrix(),v.value.copy(g.matrix)}function n(g,v){v.color.getRGB(g.fogColor.value,rf(r)),v.isFog?(g.fogNear.value=v.near,g.fogFar.value=v.far):v.isFogExp2&&(g.fogDensity.value=v.density)}function s(g,v,S,w,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?o(g,v):v.isMeshToonMaterial?(o(g,v),p(g,v)):v.isMeshPhongMaterial?(o(g,v),f(g,v)):v.isMeshStandardMaterial?(o(g,v),_(g,v),v.isMeshPhysicalMaterial&&m(g,v,P)):v.isMeshMatcapMaterial?(o(g,v),x(g,v)):v.isMeshDepthMaterial?o(g,v):v.isMeshDistanceMaterial?(o(g,v),y(g,v)):v.isMeshNormalMaterial?o(g,v):v.isLineBasicMaterial?(l(g,v),v.isLineDashedMaterial&&c(g,v)):v.isPointsMaterial?u(g,v,S,w):v.isSpriteMaterial?d(g,v):v.isShadowMaterial?(g.color.value.copy(v.color),g.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function o(g,v){g.opacity.value=v.opacity,v.color&&g.diffuse.value.copy(v.color),v.emissive&&g.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.bumpMap&&(g.bumpMap.value=v.bumpMap,e(v.bumpMap,g.bumpMapTransform),g.bumpScale.value=v.bumpScale,v.side===xn&&(g.bumpScale.value*=-1)),v.normalMap&&(g.normalMap.value=v.normalMap,e(v.normalMap,g.normalMapTransform),g.normalScale.value.copy(v.normalScale),v.side===xn&&g.normalScale.value.negate()),v.displacementMap&&(g.displacementMap.value=v.displacementMap,e(v.displacementMap,g.displacementMapTransform),g.displacementScale.value=v.displacementScale,g.displacementBias.value=v.displacementBias),v.emissiveMap&&(g.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,g.emissiveMapTransform)),v.specularMap&&(g.specularMap.value=v.specularMap,e(v.specularMap,g.specularMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest);const S=t.get(v),w=S.envMap,P=S.envMapRotation;if(w&&(g.envMap.value=w,Ji.copy(P),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),g.envMapRotation.value.setFromMatrix4(Rx.makeRotationFromEuler(Ji)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=v.reflectivity,g.ior.value=v.ior,g.refractionRatio.value=v.refractionRatio),v.lightMap){g.lightMap.value=v.lightMap;const N=r._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=v.lightMapIntensity*N,e(v.lightMap,g.lightMapTransform)}v.aoMap&&(g.aoMap.value=v.aoMap,g.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,g.aoMapTransform))}function l(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform))}function c(g,v){g.dashSize.value=v.dashSize,g.totalSize.value=v.dashSize+v.gapSize,g.scale.value=v.scale}function u(g,v,S,w){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.size.value=v.size*S,g.scale.value=w*.5,v.map&&(g.map.value=v.map,e(v.map,g.uvTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function d(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.rotation.value=v.rotation,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function f(g,v){g.specular.value.copy(v.specular),g.shininess.value=Math.max(v.shininess,1e-4)}function p(g,v){v.gradientMap&&(g.gradientMap.value=v.gradientMap)}function _(g,v){g.metalness.value=v.metalness,v.metalnessMap&&(g.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,g.metalnessMapTransform)),g.roughness.value=v.roughness,v.roughnessMap&&(g.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,g.roughnessMapTransform)),v.envMap&&(g.envMapIntensity.value=v.envMapIntensity)}function m(g,v,S){g.ior.value=v.ior,v.sheen>0&&(g.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),g.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(g.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,g.sheenColorMapTransform)),v.sheenRoughnessMap&&(g.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,g.sheenRoughnessMapTransform))),v.clearcoat>0&&(g.clearcoat.value=v.clearcoat,g.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(g.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,g.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(g.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===xn&&g.clearcoatNormalScale.value.negate())),v.iridescence>0&&(g.iridescence.value=v.iridescence,g.iridescenceIOR.value=v.iridescenceIOR,g.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(g.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,g.iridescenceMapTransform)),v.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),v.transmission>0&&(g.transmission.value=v.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),v.transmissionMap&&(g.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,g.transmissionMapTransform)),g.thickness.value=v.thickness,v.thicknessMap&&(g.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=v.attenuationDistance,g.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(g.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(g.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=v.specularIntensity,g.specularColor.value.copy(v.specularColor),v.specularColorMap&&(g.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,g.specularColorMapTransform)),v.specularIntensityMap&&(g.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,v){v.matcap&&(g.matcap.value=v.matcap)}function y(g,v){const S=t.get(v).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Dx(r,t,e,n){let s={},o={},l=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function u(S,w){const P=w.program;n.uniformBlockBinding(S,P)}function d(S,w){let P=s[S.id];P===void 0&&(x(S),P=f(S),s[S.id]=P,S.addEventListener("dispose",g));const N=w.program;n.updateUBOMapping(S,N);const O=t.render.frame;o[S.id]!==O&&(_(S),o[S.id]=O)}function f(S){const w=p();S.__bindingPointIndex=w;const P=r.createBuffer(),N=S.__size,O=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,P),r.bufferData(r.UNIFORM_BUFFER,N,O),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,P),P}function p(){for(let S=0;S<c;S++)if(l.indexOf(S)===-1)return l.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(S){const w=s[S.id],P=S.uniforms,N=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let O=0,k=P.length;O<k;O++){const H=Array.isArray(P[O])?P[O]:[P[O]];for(let I=0,R=H.length;I<R;I++){const W=H[I];if(m(W,O,I,N)===!0){const U=W.__offset,F=Array.isArray(W.value)?W.value:[W.value];let C=0;for(let Z=0;Z<F.length;Z++){const nt=F[Z],rt=y(nt);typeof nt=="number"||typeof nt=="boolean"?(W.__data[0]=nt,r.bufferSubData(r.UNIFORM_BUFFER,U+C,W.__data)):nt.isMatrix3?(W.__data[0]=nt.elements[0],W.__data[1]=nt.elements[1],W.__data[2]=nt.elements[2],W.__data[3]=0,W.__data[4]=nt.elements[3],W.__data[5]=nt.elements[4],W.__data[6]=nt.elements[5],W.__data[7]=0,W.__data[8]=nt.elements[6],W.__data[9]=nt.elements[7],W.__data[10]=nt.elements[8],W.__data[11]=0):(nt.toArray(W.__data,C),C+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,W.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(S,w,P,N){const O=S.value,k=w+"_"+P;if(N[k]===void 0)return typeof O=="number"||typeof O=="boolean"?N[k]=O:N[k]=O.clone(),!0;{const H=N[k];if(typeof O=="number"||typeof O=="boolean"){if(H!==O)return N[k]=O,!0}else if(H.equals(O)===!1)return H.copy(O),!0}return!1}function x(S){const w=S.uniforms;let P=0;const N=16;for(let k=0,H=w.length;k<H;k++){const I=Array.isArray(w[k])?w[k]:[w[k]];for(let R=0,W=I.length;R<W;R++){const U=I[R],F=Array.isArray(U.value)?U.value:[U.value];for(let C=0,Z=F.length;C<Z;C++){const nt=F[C],rt=y(nt),j=P%N;j!==0&&N-j<rt.boundary&&(P+=N-j),U.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=P,P+=rt.storage}}}const O=P%N;return O>0&&(P+=N-O),S.__size=P,S.__cache={},this}function y(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function g(S){const w=S.target;w.removeEventListener("dispose",g);const P=l.indexOf(w.__bindingPointIndex);l.splice(P,1),r.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function v(){for(const S in s)r.deleteBuffer(s[S]);l=[],s={},o={}}return{bind:u,update:d,dispose:v}}class mf{constructor(t={}){const{canvas:e=Eg(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=l;const m=new Uint32Array(4),x=new Int32Array(4);let y=null,g=null;const v=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qn,this._useLegacyLights=!1,this.toneMapping=Ni,this.toneMappingExposure=1;const w=this;let P=!1,N=0,O=0,k=null,H=-1,I=null;const R=new Ye,W=new Ye;let U=null;const F=new Qt(0);let C=0,Z=e.width,nt=e.height,rt=1,j=null,st=null;const at=new Ye(0,0,Z,nt),q=new Ye(0,0,Z,nt);let tt=!1;const Ct=new Mc;let Q=!1,it=!1;const wt=new Te,St=new vt,Pt=new J,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ut(){return k===null?rt:1}let ot=n;function xt(V,ct){const gt=e.getContext(V,ct);return gt!==null?gt:null}try{const V={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${vc}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),ot===null){const ct="webgl2";if(ot=xt(ct,V),ot===null)throw xt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let bt,E,et,$,A,M,B,X,K,G,ft,lt,pt,Tt,Et,At,Ht,zt,Dt,Kt,Vt,oe,ae,te;function Ft(){bt=new V0(ot),bt.init(),E=new k0(ot,bt,t),oe=new Sx(ot,bt),et=new wx(ot),$=new Z0(ot),A=new lx,M=new Mx(ot,bt,et,A,E,oe,$),B=new z0(w),X=new H0(w),K=new Kg(ot),ae=new N0(ot,K),G=new G0(ot,K,$,ae),ft=new q0(ot,G,K,$),Dt=new X0(ot,E,M),At=new U0(A),lt=new ax(w,B,X,bt,E,ae,At),pt=new Ix(w,A),Tt=new ux,Et=new gx(bt),zt=new D0(w,B,X,et,ft,_,u),Ht=new bx(w,ft,E),te=new Dx(ot,$,E,et),Kt=new O0(ot,bt,$),Vt=new W0(ot,bt,$),$.programs=lt.programs,w.capabilities=E,w.extensions=bt,w.properties=A,w.renderLists=Tt,w.shadowMap=Ht,w.state=et,w.info=$}Ft();const D=new Px(w,ot);this.xr=D,this.getContext=function(){return ot},this.getContextAttributes=function(){return ot.getContextAttributes()},this.forceContextLoss=function(){const V=bt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=bt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return rt},this.setPixelRatio=function(V){V!==void 0&&(rt=V,this.setSize(Z,nt,!1))},this.getSize=function(V){return V.set(Z,nt)},this.setSize=function(V,ct,gt=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=V,nt=ct,e.width=Math.floor(V*rt),e.height=Math.floor(ct*rt),gt===!0&&(e.style.width=V+"px",e.style.height=ct+"px"),this.setViewport(0,0,V,ct)},this.getDrawingBufferSize=function(V){return V.set(Z*rt,nt*rt).floor()},this.setDrawingBufferSize=function(V,ct,gt){Z=V,nt=ct,rt=gt,e.width=Math.floor(V*gt),e.height=Math.floor(ct*gt),this.setViewport(0,0,V,ct)},this.getCurrentViewport=function(V){return V.copy(R)},this.getViewport=function(V){return V.copy(at)},this.setViewport=function(V,ct,gt,_t){V.isVector4?at.set(V.x,V.y,V.z,V.w):at.set(V,ct,gt,_t),et.viewport(R.copy(at).multiplyScalar(rt).round())},this.getScissor=function(V){return V.copy(q)},this.setScissor=function(V,ct,gt,_t){V.isVector4?q.set(V.x,V.y,V.z,V.w):q.set(V,ct,gt,_t),et.scissor(W.copy(q).multiplyScalar(rt).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(V){et.setScissorTest(tt=V)},this.setOpaqueSort=function(V){j=V},this.setTransparentSort=function(V){st=V},this.getClearColor=function(V){return V.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(V=!0,ct=!0,gt=!0){let _t=0;if(V){let dt=!1;if(k!==null){const kt=k.texture.format;dt=kt===qd||kt===Xd||kt===Zd}if(dt){const kt=k.texture.type,Zt=kt===Oi||kt===cs||kt===Hd||kt===to||kt===Gd||kt===Wd,qt=zt.getClearColor(),jt=zt.getClearAlpha(),ee=qt.r,Jt=qt.g,ne=qt.b;Zt?(m[0]=ee,m[1]=Jt,m[2]=ne,m[3]=jt,ot.clearBufferuiv(ot.COLOR,0,m)):(x[0]=ee,x[1]=Jt,x[2]=ne,x[3]=jt,ot.clearBufferiv(ot.COLOR,0,x))}else _t|=ot.COLOR_BUFFER_BIT}ct&&(_t|=ot.DEPTH_BUFFER_BIT),gt&&(_t|=ot.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ot.clear(_t)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Tt.dispose(),Et.dispose(),A.dispose(),B.dispose(),X.dispose(),ft.dispose(),ae.dispose(),te.dispose(),lt.dispose(),D.dispose(),D.removeEventListener("sessionstart",Ce),D.removeEventListener("sessionend",Ee),sn.stop()};function ht(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const V=$.autoReset,ct=Ht.enabled,gt=Ht.autoUpdate,_t=Ht.needsUpdate,dt=Ht.type;Ft(),$.autoReset=V,Ht.enabled=ct,Ht.autoUpdate=gt,Ht.needsUpdate=_t,Ht.type=dt}function Rt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function Nt(V){const ct=V.target;ct.removeEventListener("dispose",Nt),re(ct)}function re(V){ue(V),A.remove(V)}function ue(V){const ct=A.get(V).programs;ct!==void 0&&(ct.forEach(function(gt){lt.releaseProgram(gt)}),V.isShaderMaterial&&lt.releaseShaderCache(V))}this.renderBufferDirect=function(V,ct,gt,_t,dt,kt){ct===null&&(ct=It);const Zt=dt.isMesh&&dt.matrixWorld.determinant()<0,qt=lo(V,ct,gt,_t,dt);et.setMaterial(_t,Zt);let jt=gt.index,ee=1;if(_t.wireframe===!0){if(jt=G.getWireframeAttribute(gt),jt===void 0)return;ee=2}const Jt=gt.drawRange,ne=gt.attributes.position;let Ae=Jt.start*ee,on=(Jt.start+Jt.count)*ee;kt!==null&&(Ae=Math.max(Ae,kt.start*ee),on=Math.min(on,(kt.start+kt.count)*ee)),jt!==null?(Ae=Math.max(Ae,0),on=Math.min(on,jt.count)):ne!=null&&(Ae=Math.max(Ae,0),on=Math.min(on,ne.count));const Pe=on-Ae;if(Pe<0||Pe===1/0)return;ae.setup(dt,_t,qt,gt,jt);let an,ye=Kt;if(jt!==null&&(an=K.get(jt),ye=Vt,ye.setIndex(an)),dt.isMesh)_t.wireframe===!0?(et.setLineWidth(_t.wireframeLinewidth*Ut()),ye.setMode(ot.LINES)):ye.setMode(ot.TRIANGLES);else if(dt.isLine){let ie=_t.linewidth;ie===void 0&&(ie=1),et.setLineWidth(ie*Ut()),dt.isLineSegments?ye.setMode(ot.LINES):dt.isLineLoop?ye.setMode(ot.LINE_LOOP):ye.setMode(ot.LINE_STRIP)}else dt.isPoints?ye.setMode(ot.POINTS):dt.isSprite&&ye.setMode(ot.TRIANGLES);if(dt.isBatchedMesh)ye.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)ye.renderInstances(Ae,Pe,dt.count);else if(gt.isInstancedBufferGeometry){const ie=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,ri=Math.min(gt.instanceCount,ie);ye.renderInstances(Ae,Pe,ri)}else ye.render(Ae,Pe)};function ve(V,ct,gt){V.transparent===!0&&V.side===dn&&V.forceSinglePass===!1?(V.side=xn,V.needsUpdate=!0,Fi(V,ct,gt),V.side=Ui,V.needsUpdate=!0,Fi(V,ct,gt),V.side=dn):Fi(V,ct,gt)}this.compile=function(V,ct,gt=null){gt===null&&(gt=V),g=Et.get(gt),g.init(),S.push(g),gt.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),V!==gt&&V.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),g.setupLights(w._useLegacyLights);const _t=new Set;return V.traverse(function(dt){const kt=dt.material;if(kt)if(Array.isArray(kt))for(let Zt=0;Zt<kt.length;Zt++){const qt=kt[Zt];ve(qt,gt,dt),_t.add(qt)}else ve(kt,gt,dt),_t.add(kt)}),S.pop(),g=null,_t},this.compileAsync=function(V,ct,gt=null){const _t=this.compile(V,ct,gt);return new Promise(dt=>{function kt(){if(_t.forEach(function(Zt){A.get(Zt).currentProgram.isReady()&&_t.delete(Zt)}),_t.size===0){dt(V);return}setTimeout(kt,10)}bt.get("KHR_parallel_shader_compile")!==null?kt():setTimeout(kt,10)})};let ke=null;function me(V){ke&&ke(V)}function Ce(){sn.stop()}function Ee(){sn.start()}const sn=new af;sn.setAnimationLoop(me),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(V){ke=V,D.setAnimationLoop(V),V===null?sn.stop():sn.start()},D.addEventListener("sessionstart",Ce),D.addEventListener("sessionend",Ee),this.render=function(V,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(ct),ct=D.getCamera()),V.isScene===!0&&V.onBeforeRender(w,V,ct,k),g=Et.get(V,S.length),g.init(),S.push(g),wt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),Ct.setFromProjectionMatrix(wt),it=this.localClippingEnabled,Q=At.init(this.clippingPlanes,it),y=Tt.get(V,v.length),y.init(),v.push(y),mn(V,ct,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(j,st),this.info.render.frame++,Q===!0&&At.beginShadows();const gt=g.state.shadowsArray;if(Ht.render(gt,V,ct),Q===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1)&&zt.render(y,V),g.setupLights(w._useLegacyLights),ct.isArrayCamera){const _t=ct.cameras;for(let dt=0,kt=_t.length;dt<kt;dt++){const Zt=_t[dt];jn(y,V,Zt,Zt.viewport)}}else jn(y,V,ct);k!==null&&(M.updateMultisampleRenderTarget(k),M.updateRenderTargetMipmap(k)),V.isScene===!0&&V.onAfterRender(w,V,ct),ae.resetDefaultState(),H=-1,I=null,S.pop(),S.length>0?g=S[S.length-1]:g=null,v.pop(),v.length>0?y=v[v.length-1]:y=null};function mn(V,ct,gt,_t){if(V.visible===!1)return;if(V.layers.test(ct.layers)){if(V.isGroup)gt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(ct);else if(V.isLight)g.pushLight(V),V.castShadow&&g.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||Ct.intersectsSprite(V)){_t&&Pt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(wt);const Zt=ft.update(V),qt=V.material;qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||Ct.intersectsObject(V))){const Zt=ft.update(V),qt=V.material;if(_t&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),Pt.copy(V.boundingSphere.center)):(Zt.boundingSphere===null&&Zt.computeBoundingSphere(),Pt.copy(Zt.boundingSphere.center)),Pt.applyMatrix4(V.matrixWorld).applyMatrix4(wt)),Array.isArray(qt)){const jt=Zt.groups;for(let ee=0,Jt=jt.length;ee<Jt;ee++){const ne=jt[ee],Ae=qt[ne.materialIndex];Ae&&Ae.visible&&y.push(V,Zt,Ae,gt,Pt.z,ne)}}else qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}const kt=V.children;for(let Zt=0,qt=kt.length;Zt<qt;Zt++)mn(kt[Zt],ct,gt,_t)}function jn(V,ct,gt,_t){const dt=V.opaque,kt=V.transmissive,Zt=V.transparent;g.setupLightsView(gt),Q===!0&&At.setGlobalState(w.clippingPlanes,gt),kt.length>0&&yi(dt,kt,ct,gt),_t&&et.viewport(R.copy(_t)),dt.length>0&&Ge(dt,ct,gt),kt.length>0&&Ge(kt,ct,gt),Zt.length>0&&Ge(Zt,ct,gt),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function yi(V,ct,gt,_t){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(g.state.transmissionRenderTarget===null){g.state.transmissionRenderTarget=new ar(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?ua:Oi,minFilter:sr,samples:4,stencilBuffer:o});const ee=A.get(g.state.transmissionRenderTarget);ee.__isTransmissionRenderTarget=!0}const kt=g.state.transmissionRenderTarget;w.getDrawingBufferSize(St),kt.setSize(St.x,St.y);const Zt=w.getRenderTarget();w.setRenderTarget(kt),w.getClearColor(F),C=w.getClearAlpha(),C<1&&w.setClearColor(16777215,.5),w.clear();const qt=w.toneMapping;w.toneMapping=Ni,Ge(V,gt,_t),M.updateMultisampleRenderTarget(kt),M.updateRenderTargetMipmap(kt);let jt=!1;for(let ee=0,Jt=ct.length;ee<Jt;ee++){const ne=ct[ee],Ae=ne.object,on=ne.geometry,Pe=ne.material,an=ne.group;if(Pe.side===dn&&Ae.layers.test(_t.layers)){const ye=Pe.side;Pe.side=xn,Pe.needsUpdate=!0,Wt(Ae,gt,_t,on,Pe,an),Pe.side=ye,Pe.needsUpdate=!0,jt=!0}}jt===!0&&(M.updateMultisampleRenderTarget(kt),M.updateRenderTargetMipmap(kt)),w.setRenderTarget(Zt),w.setClearColor(F,C),w.toneMapping=qt}function Ge(V,ct,gt){const _t=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,kt=V.length;dt<kt;dt++){const Zt=V[dt],qt=Zt.object,jt=Zt.geometry,ee=_t===null?Zt.material:_t,Jt=Zt.group;qt.layers.test(gt.layers)&&Wt(qt,ct,gt,jt,ee,Jt)}}function Wt(V,ct,gt,_t,dt,kt){V.onBeforeRender(w,ct,gt,_t,dt,kt),V.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),dt.onBeforeRender(w,ct,gt,_t,V,kt),dt.transparent===!0&&dt.side===dn&&dt.forceSinglePass===!1?(dt.side=xn,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,kt),dt.side=Ui,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,kt),dt.side=dn):w.renderBufferDirect(gt,ct,_t,dt,V,kt),V.onAfterRender(w,ct,gt,_t,dt,kt)}function Fi(V,ct,gt){ct.isScene!==!0&&(ct=It);const _t=A.get(V),dt=g.state.lights,kt=g.state.shadowsArray,Zt=dt.state.version,qt=lt.getParameters(V,dt.state,kt,ct,gt),jt=lt.getProgramCacheKey(qt);let ee=_t.programs;_t.environment=V.isMeshStandardMaterial?ct.environment:null,_t.fog=ct.fog,_t.envMap=(V.isMeshStandardMaterial?X:B).get(V.envMap||_t.environment),_t.envMapRotation=_t.environment!==null&&V.envMap===null?ct.environmentRotation:V.envMapRotation,ee===void 0&&(V.addEventListener("dispose",Nt),ee=new Map,_t.programs=ee);let Jt=ee.get(jt);if(Jt!==void 0){if(_t.currentProgram===Jt&&_t.lightsStateVersion===Zt)return gs(V,qt),Jt}else qt.uniforms=lt.getUniforms(V),V.onBuild(gt,qt,w),V.onBeforeCompile(qt,w),Jt=lt.acquireProgram(qt,jt),ee.set(jt,Jt),_t.uniforms=qt.uniforms;const ne=_t.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(ne.clippingPlanes=At.uniform),gs(V,qt),_t.needsLights=co(V),_t.lightsStateVersion=Zt,_t.needsLights&&(ne.ambientLightColor.value=dt.state.ambient,ne.lightProbe.value=dt.state.probe,ne.directionalLights.value=dt.state.directional,ne.directionalLightShadows.value=dt.state.directionalShadow,ne.spotLights.value=dt.state.spot,ne.spotLightShadows.value=dt.state.spotShadow,ne.rectAreaLights.value=dt.state.rectArea,ne.ltc_1.value=dt.state.rectAreaLTC1,ne.ltc_2.value=dt.state.rectAreaLTC2,ne.pointLights.value=dt.state.point,ne.pointLightShadows.value=dt.state.pointShadow,ne.hemisphereLights.value=dt.state.hemi,ne.directionalShadowMap.value=dt.state.directionalShadowMap,ne.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,ne.spotShadowMap.value=dt.state.spotShadowMap,ne.spotLightMatrix.value=dt.state.spotLightMatrix,ne.spotLightMap.value=dt.state.spotLightMap,ne.pointShadowMap.value=dt.state.pointShadowMap,ne.pointShadowMatrix.value=dt.state.pointShadowMatrix),_t.currentProgram=Jt,_t.uniformsList=null,Jt}function ms(V){if(V.uniformsList===null){const ct=V.currentProgram.getUniforms();V.uniformsList=oa.seqWithValue(ct.seq,V.uniforms)}return V.uniformsList}function gs(V,ct){const gt=A.get(V);gt.outputColorSpace=ct.outputColorSpace,gt.batching=ct.batching,gt.instancing=ct.instancing,gt.instancingColor=ct.instancingColor,gt.instancingMorph=ct.instancingMorph,gt.skinning=ct.skinning,gt.morphTargets=ct.morphTargets,gt.morphNormals=ct.morphNormals,gt.morphColors=ct.morphColors,gt.morphTargetsCount=ct.morphTargetsCount,gt.numClippingPlanes=ct.numClippingPlanes,gt.numIntersection=ct.numClipIntersection,gt.vertexAlphas=ct.vertexAlphas,gt.vertexTangents=ct.vertexTangents,gt.toneMapping=ct.toneMapping}function lo(V,ct,gt,_t,dt){ct.isScene!==!0&&(ct=It),M.resetTextureUnits();const kt=ct.fog,Zt=_t.isMeshStandardMaterial?ct.environment:null,qt=k===null?w.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Bi,jt=(_t.isMeshStandardMaterial?X:B).get(_t.envMap||Zt),ee=_t.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,Jt=!!gt.attributes.tangent&&(!!_t.normalMap||_t.anisotropy>0),ne=!!gt.morphAttributes.position,Ae=!!gt.morphAttributes.normal,on=!!gt.morphAttributes.color;let Pe=Ni;_t.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Pe=w.toneMapping);const an=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,ye=an!==void 0?an.length:0,ie=A.get(_t),ri=g.state.lights;if(Q===!0&&(it===!0||V!==I)){const tn=V===I&&_t.id===H;At.setState(_t,V,tn)}let Xt=!1;_t.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==ri.state.version||ie.outputColorSpace!==qt||dt.isBatchedMesh&&ie.batching===!1||!dt.isBatchedMesh&&ie.batching===!0||dt.isInstancedMesh&&ie.instancing===!1||!dt.isInstancedMesh&&ie.instancing===!0||dt.isSkinnedMesh&&ie.skinning===!1||!dt.isSkinnedMesh&&ie.skinning===!0||dt.isInstancedMesh&&ie.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&ie.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&ie.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&ie.instancingMorph===!1&&dt.morphTexture!==null||ie.envMap!==jt||_t.fog===!0&&ie.fog!==kt||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==At.numPlanes||ie.numIntersection!==At.numIntersection)||ie.vertexAlphas!==ee||ie.vertexTangents!==Jt||ie.morphTargets!==ne||ie.morphNormals!==Ae||ie.morphColors!==on||ie.toneMapping!==Pe||ie.morphTargetsCount!==ye)&&(Xt=!0):(Xt=!0,ie.__version=_t.version);let fe=ie.currentProgram;Xt===!0&&(fe=Fi(_t,ct,dt));let Hi=!1,Cn=!1,Yn=!1;const Ue=fe.getUniforms(),Yt=ie.uniforms;if(et.useProgram(fe.program)&&(Hi=!0,Cn=!0,Yn=!0),_t.id!==H&&(H=_t.id,Cn=!0),Hi||I!==V){Ue.setValue(ot,"projectionMatrix",V.projectionMatrix),Ue.setValue(ot,"viewMatrix",V.matrixWorldInverse);const tn=Ue.map.cameraPosition;tn!==void 0&&tn.setValue(ot,Pt.setFromMatrixPosition(V.matrixWorld)),E.logarithmicDepthBuffer&&Ue.setValue(ot,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(_t.isMeshPhongMaterial||_t.isMeshToonMaterial||_t.isMeshLambertMaterial||_t.isMeshBasicMaterial||_t.isMeshStandardMaterial||_t.isShaderMaterial)&&Ue.setValue(ot,"isOrthographic",V.isOrthographicCamera===!0),I!==V&&(I=V,Cn=!0,Yn=!0)}if(dt.isSkinnedMesh){Ue.setOptional(ot,dt,"bindMatrix"),Ue.setOptional(ot,dt,"bindMatrixInverse");const tn=dt.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),Ue.setValue(ot,"boneTexture",tn.boneTexture,M))}dt.isBatchedMesh&&(Ue.setOptional(ot,dt,"batchingTexture"),Ue.setValue(ot,"batchingTexture",dt._matricesTexture,M));const be=gt.morphAttributes;if((be.position!==void 0||be.normal!==void 0||be.color!==void 0)&&Dt.update(dt,gt,fe),(Cn||ie.receiveShadow!==dt.receiveShadow)&&(ie.receiveShadow=dt.receiveShadow,Ue.setValue(ot,"receiveShadow",dt.receiveShadow)),_t.isMeshGouraudMaterial&&_t.envMap!==null&&(Yt.envMap.value=jt,Yt.flipEnvMap.value=jt.isCubeTexture&&jt.isRenderTargetTexture===!1?-1:1),_t.isMeshStandardMaterial&&_t.envMap===null&&ct.environment!==null&&(Yt.envMapIntensity.value=ct.environmentIntensity),Cn&&(Ue.setValue(ot,"toneMappingExposure",w.toneMappingExposure),ie.needsLights&&_s(Yt,Yn),kt&&_t.fog===!0&&pt.refreshFogUniforms(Yt,kt),pt.refreshMaterialUniforms(Yt,_t,rt,nt,g.state.transmissionRenderTarget),oa.upload(ot,ms(ie),Yt,M)),_t.isShaderMaterial&&_t.uniformsNeedUpdate===!0&&(oa.upload(ot,ms(ie),Yt,M),_t.uniformsNeedUpdate=!1),_t.isSpriteMaterial&&Ue.setValue(ot,"center",dt.center),Ue.setValue(ot,"modelViewMatrix",dt.modelViewMatrix),Ue.setValue(ot,"normalMatrix",dt.normalMatrix),Ue.setValue(ot,"modelMatrix",dt.matrixWorld),_t.isShaderMaterial||_t.isRawShaderMaterial){const tn=_t.uniformsGroups;for(let xi=0,gn=tn.length;xi<gn;xi++){const uo=tn[xi];te.update(uo,fe),te.bind(uo,fe)}}return fe}function _s(V,ct){V.ambientLightColor.needsUpdate=ct,V.lightProbe.needsUpdate=ct,V.directionalLights.needsUpdate=ct,V.directionalLightShadows.needsUpdate=ct,V.pointLights.needsUpdate=ct,V.pointLightShadows.needsUpdate=ct,V.spotLights.needsUpdate=ct,V.spotLightShadows.needsUpdate=ct,V.rectAreaLights.needsUpdate=ct,V.hemisphereLights.needsUpdate=ct}function co(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(V,ct,gt){A.get(V.texture).__webglTexture=ct,A.get(V.depthTexture).__webglTexture=gt;const _t=A.get(V);_t.__hasExternalTextures=!0,_t.__autoAllocateDepthBuffer=gt===void 0,_t.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),_t.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,ct){const gt=A.get(V);gt.__webglFramebuffer=ct,gt.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(V,ct=0,gt=0){k=V,N=ct,O=gt;let _t=!0,dt=null,kt=!1,Zt=!1;if(V){const jt=A.get(V);jt.__useDefaultFramebuffer!==void 0?(et.bindFramebuffer(ot.FRAMEBUFFER,null),_t=!1):jt.__webglFramebuffer===void 0?M.setupRenderTarget(V):jt.__hasExternalTextures&&M.rebindTextures(V,A.get(V.texture).__webglTexture,A.get(V.depthTexture).__webglTexture);const ee=V.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Zt=!0);const Jt=A.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(Jt[ct])?dt=Jt[ct][gt]:dt=Jt[ct],kt=!0):V.samples>0&&M.useMultisampledRTT(V)===!1?dt=A.get(V).__webglMultisampledFramebuffer:Array.isArray(Jt)?dt=Jt[gt]:dt=Jt,R.copy(V.viewport),W.copy(V.scissor),U=V.scissorTest}else R.copy(at).multiplyScalar(rt).floor(),W.copy(q).multiplyScalar(rt).floor(),U=tt;if(et.bindFramebuffer(ot.FRAMEBUFFER,dt)&&_t&&et.drawBuffers(V,dt),et.viewport(R),et.scissor(W),et.setScissorTest(U),kt){const jt=A.get(V.texture);ot.framebufferTexture2D(ot.FRAMEBUFFER,ot.COLOR_ATTACHMENT0,ot.TEXTURE_CUBE_MAP_POSITIVE_X+ct,jt.__webglTexture,gt)}else if(Zt){const jt=A.get(V.texture),ee=ct||0;ot.framebufferTextureLayer(ot.FRAMEBUFFER,ot.COLOR_ATTACHMENT0,jt.__webglTexture,gt||0,ee)}H=-1},this.readRenderTargetPixels=function(V,ct,gt,_t,dt,kt,Zt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=A.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Zt!==void 0&&(qt=qt[Zt]),qt){et.bindFramebuffer(ot.FRAMEBUFFER,qt);try{const jt=V.texture,ee=jt.format,Jt=jt.type;if(ee!==ni&&oe.convert(ee)!==ot.getParameter(ot.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ne=Jt===ua&&(bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float"));if(Jt!==Oi&&oe.convert(Jt)!==ot.getParameter(ot.IMPLEMENTATION_COLOR_READ_TYPE)&&Jt!==Ii&&!ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=V.width-_t&&gt>=0&&gt<=V.height-dt&&ot.readPixels(ct,gt,_t,dt,oe.convert(ee),oe.convert(Jt),kt)}finally{const jt=k!==null?A.get(k).__webglFramebuffer:null;et.bindFramebuffer(ot.FRAMEBUFFER,jt)}}},this.copyFramebufferToTexture=function(V,ct,gt=0){const _t=Math.pow(2,-gt),dt=Math.floor(ct.image.width*_t),kt=Math.floor(ct.image.height*_t);M.setTexture2D(ct,0),ot.copyTexSubImage2D(ot.TEXTURE_2D,gt,0,0,V.x,V.y,dt,kt),et.unbindTexture()},this.copyTextureToTexture=function(V,ct,gt,_t=0){const dt=ct.image.width,kt=ct.image.height,Zt=oe.convert(gt.format),qt=oe.convert(gt.type);M.setTexture2D(gt,0),ot.pixelStorei(ot.UNPACK_FLIP_Y_WEBGL,gt.flipY),ot.pixelStorei(ot.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),ot.pixelStorei(ot.UNPACK_ALIGNMENT,gt.unpackAlignment),ct.isDataTexture?ot.texSubImage2D(ot.TEXTURE_2D,_t,V.x,V.y,dt,kt,Zt,qt,ct.image.data):ct.isCompressedTexture?ot.compressedTexSubImage2D(ot.TEXTURE_2D,_t,V.x,V.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Zt,ct.mipmaps[0].data):ot.texSubImage2D(ot.TEXTURE_2D,_t,V.x,V.y,Zt,qt,ct.image),_t===0&&gt.generateMipmaps&&ot.generateMipmap(ot.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(V,ct,gt,_t,dt=0){const kt=Math.round(V.max.x-V.min.x),Zt=Math.round(V.max.y-V.min.y),qt=V.max.z-V.min.z+1,jt=oe.convert(_t.format),ee=oe.convert(_t.type);let Jt;if(_t.isData3DTexture)M.setTexture3D(_t,0),Jt=ot.TEXTURE_3D;else if(_t.isDataArrayTexture||_t.isCompressedArrayTexture)M.setTexture2DArray(_t,0),Jt=ot.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ot.pixelStorei(ot.UNPACK_FLIP_Y_WEBGL,_t.flipY),ot.pixelStorei(ot.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),ot.pixelStorei(ot.UNPACK_ALIGNMENT,_t.unpackAlignment);const ne=ot.getParameter(ot.UNPACK_ROW_LENGTH),Ae=ot.getParameter(ot.UNPACK_IMAGE_HEIGHT),on=ot.getParameter(ot.UNPACK_SKIP_PIXELS),Pe=ot.getParameter(ot.UNPACK_SKIP_ROWS),an=ot.getParameter(ot.UNPACK_SKIP_IMAGES),ye=gt.isCompressedTexture?gt.mipmaps[dt]:gt.image;ot.pixelStorei(ot.UNPACK_ROW_LENGTH,ye.width),ot.pixelStorei(ot.UNPACK_IMAGE_HEIGHT,ye.height),ot.pixelStorei(ot.UNPACK_SKIP_PIXELS,V.min.x),ot.pixelStorei(ot.UNPACK_SKIP_ROWS,V.min.y),ot.pixelStorei(ot.UNPACK_SKIP_IMAGES,V.min.z),gt.isDataTexture||gt.isData3DTexture?ot.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,kt,Zt,qt,jt,ee,ye.data):_t.isCompressedArrayTexture?ot.compressedTexSubImage3D(Jt,dt,ct.x,ct.y,ct.z,kt,Zt,qt,jt,ye.data):ot.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,kt,Zt,qt,jt,ee,ye),ot.pixelStorei(ot.UNPACK_ROW_LENGTH,ne),ot.pixelStorei(ot.UNPACK_IMAGE_HEIGHT,Ae),ot.pixelStorei(ot.UNPACK_SKIP_PIXELS,on),ot.pixelStorei(ot.UNPACK_SKIP_ROWS,Pe),ot.pixelStorei(ot.UNPACK_SKIP_IMAGES,an),dt===0&&_t.generateMipmaps&&ot.generateMipmap(Jt),et.unbindTexture()},this.initTexture=function(V){V.isCubeTexture?M.setTextureCube(V,0):V.isData3DTexture?M.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?M.setTexture2DArray(V,0):M.setTexture2D(V,0),et.unbindTexture()},this.resetState=function(){N=0,O=0,k=null,et.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===bc?"display-p3":"srgb",e.unpackColorSpace=ge.workingColorSpace===Aa?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class gf extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Ra extends fr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const td=new J,ed=new J,nd=new Te,Bl=new Ca,Yo=new La;class Ec extends Qe{constructor(t=new Oe,e=new Ra){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)td.fromBufferAttribute(e,s-1),ed.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=td.distanceTo(ed);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Yo.copy(n.boundingSphere),Yo.applyMatrix4(s),Yo.radius+=o,t.ray.intersectsSphere(Yo)===!1)return;nd.copy(s).invert(),Bl.copy(t.ray).applyMatrix4(nd);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,d=new J,f=new J,p=new J,_=new J,m=this.isLineSegments?2:1,x=n.index,g=n.attributes.position;if(x!==null){const v=Math.max(0,l.start),S=Math.min(x.count,l.start+l.count);for(let w=v,P=S-1;w<P;w+=m){const N=x.getX(w),O=x.getX(w+1);if(d.fromBufferAttribute(g,N),f.fromBufferAttribute(g,O),Bl.distanceSqToSegment(d,f,_,p)>u)continue;_.applyMatrix4(this.matrixWorld);const H=t.ray.origin.distanceTo(_);H<t.near||H>t.far||e.push({distance:H,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,l.start),S=Math.min(g.count,l.start+l.count);for(let w=v,P=S-1;w<P;w+=m){if(d.fromBufferAttribute(g,w),f.fromBufferAttribute(g,w+1),Bl.distanceSqToSegment(d,f,_,p)>u)continue;_.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(_);O<t.near||O>t.far||e.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const id=new J,rd=new J;class Nx extends Ec{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)id.fromBufferAttribute(e,s),rd.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+id.distanceTo(rd);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _f extends pn{constructor(t,e,n,s,o,l,c,u,d){super(t,e,n,s,o,l,c,u,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,u=o-1,d;for(;c<=u;)if(s=Math.floor(c+(u-c)/2),d=n[s]-l,d<0)c=s+1;else if(d>0)u=s-1;else{u=s;break}if(s=u,n[s]===l)return s/(o-1);const f=n[s],_=n[s+1]-f,m=(l-f)/_;return(s+m)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),u=e||(l.isVector2?new vt:new J);return u.copy(c).sub(l).normalize(),u}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new J,s=[],o=[],l=[],c=new J,u=new Te;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new J)}o[0]=new J,l[0]=new J;let d=Number.MAX_VALUE;const f=Math.abs(s[0].x),p=Math.abs(s[0].y),_=Math.abs(s[0].z);f<=d&&(d=f,n.set(1,0,0)),p<=d&&(d=p,n.set(0,1,0)),_<=d&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),l[m]=l[m-1].clone(),c.crossVectors(s[m-1],s[m]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(je(s[m-1].dot(s[m]),-1,1));o[m].applyMatrix4(u.makeRotationAxis(c,x))}l[m].crossVectors(s[m],o[m])}if(e===!0){let m=Math.acos(je(o[0].dot(o[t]),-1,1));m/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(m=-m);for(let x=1;x<=t;x++)o[x].applyMatrix4(u.makeRotationAxis(s[x],m*x)),l[x].crossVectors(s[x],o[x])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Tc extends ii{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new vt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let u=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),_=u-this.aX,m=d-this.aY;u=_*f-m*p+this.aX,d=_*p+m*f+this.aY}return n.set(u,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Ox extends Tc{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function Ac(){let r=0,t=0,e=0,n=0;function s(o,l,c,u){r=o,t=c,e=-3*o+3*l-2*c-u,n=2*o-2*l+c+u}return{initCatmullRom:function(o,l,c,u,d){s(l,c,d*(c-o),d*(u-l))},initNonuniformCatmullRom:function(o,l,c,u,d,f,p){let _=(l-o)/d-(c-o)/(d+f)+(c-l)/f,m=(c-l)/f-(u-l)/(f+p)+(u-c)/p;_*=f,m*=f,s(l,c,_,m)},calc:function(o){const l=o*o,c=l*o;return r+t*o+e*l+n*c}}}const $o=new J,Fl=new Ac,Hl=new Ac,Vl=new Ac;class vf extends ii{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new J){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),u=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:u===0&&c===o-1&&(c=o-2,u=1);let d,f;this.closed||c>0?d=s[(c-1)%o]:($o.subVectors(s[0],s[1]).add(s[0]),d=$o);const p=s[c%o],_=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:($o.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=$o),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(d.distanceToSquared(p),m),y=Math.pow(p.distanceToSquared(_),m),g=Math.pow(_.distanceToSquared(f),m);y<1e-4&&(y=1),x<1e-4&&(x=y),g<1e-4&&(g=y),Fl.initNonuniformCatmullRom(d.x,p.x,_.x,f.x,x,y,g),Hl.initNonuniformCatmullRom(d.y,p.y,_.y,f.y,x,y,g),Vl.initNonuniformCatmullRom(d.z,p.z,_.z,f.z,x,y,g)}else this.curveType==="catmullrom"&&(Fl.initCatmullRom(d.x,p.x,_.x,f.x,this.tension),Hl.initCatmullRom(d.y,p.y,_.y,f.y,this.tension),Vl.initCatmullRom(d.z,p.z,_.z,f.z,this.tension));return n.set(Fl.calc(u),Hl.calc(u),Vl.calc(u)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new J().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function sd(r,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=r*r,u=r*c;return(2*e-2*n+o+l)*u+(-3*e+3*n-2*o-l)*c+o*r+e}function kx(r,t){const e=1-r;return e*e*t}function Ux(r,t){return 2*(1-r)*r*t}function zx(r,t){return r*r*t}function Vs(r,t,e,n){return kx(r,t)+Ux(r,e)+zx(r,n)}function Bx(r,t){const e=1-r;return e*e*e*t}function Fx(r,t){const e=1-r;return 3*e*e*r*t}function Hx(r,t){return 3*(1-r)*r*r*t}function Vx(r,t){return r*r*r*t}function Gs(r,t,e,n,s){return Bx(r,t)+Fx(r,e)+Hx(r,n)+Vx(r,s)}class yf extends ii{constructor(t=new vt,e=new vt,n=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Gs(t,s.x,o.x,l.x,c.x),Gs(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gx extends ii{constructor(t=new J,e=new J,n=new J,s=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new J){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Gs(t,s.x,o.x,l.x,c.x),Gs(t,s.y,o.y,l.y,c.y),Gs(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class xf extends ii{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wx extends ii{constructor(t=new J,e=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new J){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new J){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class bf extends ii{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Vs(t,s.x,o.x,l.x),Vs(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wf extends ii{constructor(t=new J,e=new J,n=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new J){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Vs(t,s.x,o.x,l.x),Vs(t,s.y,o.y,l.y),Vs(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mf extends ii{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,u=s[l===0?l:l-1],d=s[l],f=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(sd(c,u.x,d.x,f.x,p.x),sd(c,u.y,d.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var ga=Object.freeze({__proto__:null,ArcCurve:Ox,CatmullRomCurve3:vf,CubicBezierCurve:yf,CubicBezierCurve3:Gx,EllipseCurve:Tc,LineCurve:xf,LineCurve3:Wx,QuadraticBezierCurve:bf,QuadraticBezierCurve3:wf,SplineCurve:Mf});class Zx extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ga[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],u=c.getLength(),d=u===0?0:1-l/u;return c.getPointAt(d,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,u=l.getPoints(c);for(let d=0;d<u.length;d++){const f=u[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ga[s.type]().fromJSON(s))}return this}}class od extends Zx{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new xf(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new bf(this.currentPoint.clone(),new vt(t,e),new vt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new yf(this.currentPoint.clone(),new vt(t,e),new vt(n,s),new vt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Mf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,u){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,s,o,l,c,u),this}absellipse(t,e,n,s,o,l,c,u){const d=new Tc(t,e,n,s,o,l,c,u);if(this.curves.length>0){const p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class nr extends Oe{constructor(t=[new vt(0,-.5),new vt(.5,0),new vt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=je(s,0,Math.PI*2);const o=[],l=[],c=[],u=[],d=[],f=1/e,p=new J,_=new vt,m=new J,x=new J,y=new J;let g=0,v=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,y.copy(m),m.normalize(),u.push(m.x,m.y,m.z);break;case t.length-1:u.push(y.x,y.y,y.z);break;default:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,x.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),u.push(m.x,m.y,m.z),y.copy(x)}for(let S=0;S<=e;S++){const w=n+S*f*s,P=Math.sin(w),N=Math.cos(w);for(let O=0;O<=t.length-1;O++){p.x=t[O].x*P,p.y=t[O].y,p.z=t[O].x*N,l.push(p.x,p.y,p.z),_.x=S/e,_.y=O/(t.length-1),c.push(_.x,_.y);const k=u[3*O+0]*P,H=u[3*O+1],I=u[3*O+0]*N;d.push(k,H,I)}}for(let S=0;S<e;S++)for(let w=0;w<t.length-1;w++){const P=w+S*t.length,N=P,O=P+t.length,k=P+t.length+1,H=P+1;o.push(N,O,H),o.push(k,H,O)}this.setIndex(o),this.setAttribute("position",new _e(l,3)),this.setAttribute("uv",new _e(c,2)),this.setAttribute("normal",new _e(d,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new nr(t.points,t.segments,t.phiStart,t.phiLength)}}class Ys extends Oe{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:u};const d=this;s=Math.floor(s),o=Math.floor(o);const f=[],p=[],_=[],m=[];let x=0;const y=[],g=n/2;let v=0;S(),l===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(f),this.setAttribute("position",new _e(p,3)),this.setAttribute("normal",new _e(_,3)),this.setAttribute("uv",new _e(m,2));function S(){const P=new J,N=new J;let O=0;const k=(e-t)/n;for(let H=0;H<=o;H++){const I=[],R=H/o,W=R*(e-t)+t;for(let U=0;U<=s;U++){const F=U/s,C=F*u+c,Z=Math.sin(C),nt=Math.cos(C);N.x=W*Z,N.y=-R*n+g,N.z=W*nt,p.push(N.x,N.y,N.z),P.set(Z,k,nt).normalize(),_.push(P.x,P.y,P.z),m.push(F,1-R),I.push(x++)}y.push(I)}for(let H=0;H<s;H++)for(let I=0;I<o;I++){const R=y[I][H],W=y[I+1][H],U=y[I+1][H+1],F=y[I][H+1];f.push(R,W,F),f.push(W,U,F),O+=6}d.addGroup(v,O,0),v+=O}function w(P){const N=x,O=new vt,k=new J;let H=0;const I=P===!0?t:e,R=P===!0?1:-1;for(let U=1;U<=s;U++)p.push(0,g*R,0),_.push(0,R,0),m.push(.5,.5),x++;const W=x;for(let U=0;U<=s;U++){const C=U/s*u+c,Z=Math.cos(C),nt=Math.sin(C);k.x=I*nt,k.y=g*R,k.z=I*Z,p.push(k.x,k.y,k.z),_.push(0,R,0),O.x=Z*.5+.5,O.y=nt*.5*R+.5,m.push(O.x,O.y),x++}for(let U=0;U<s;U++){const F=N+U,C=W+U;P===!0?f.push(C,C+1,F):f.push(C+1,C,F),H+=3}d.addGroup(v,H,P===!0?1:2),v+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ys(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Lc extends Ys{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new Lc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const Ko=new J,Jo=new J,Gl=new J,Qo=new Wn;class Xx extends Oe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(Hs*e),l=t.getIndex(),c=t.getAttribute("position"),u=l?l.count:c.count,d=[0,0,0],f=["a","b","c"],p=new Array(3),_={},m=[];for(let x=0;x<u;x+=3){l?(d[0]=l.getX(x),d[1]=l.getX(x+1),d[2]=l.getX(x+2)):(d[0]=x,d[1]=x+1,d[2]=x+2);const{a:y,b:g,c:v}=Qo;if(y.fromBufferAttribute(c,d[0]),g.fromBufferAttribute(c,d[1]),v.fromBufferAttribute(c,d[2]),Qo.getNormal(Gl),p[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,p[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,p[2]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const w=(S+1)%3,P=p[S],N=p[w],O=Qo[f[S]],k=Qo[f[w]],H=`${P}_${N}`,I=`${N}_${P}`;I in _&&_[I]?(Gl.dot(_[I].normal)<=o&&(m.push(O.x,O.y,O.z),m.push(k.x,k.y,k.z)),_[I]=null):H in _||(_[H]={index0:d[S],index1:d[w],normal:Gl.clone()})}}for(const x in _)if(_[x]){const{index0:y,index1:g}=_[x];Ko.fromBufferAttribute(c,y),Jo.fromBufferAttribute(c,g),m.push(Ko.x,Ko.y,Ko.z),m.push(Jo.x,Jo.y,Jo.z)}this.setAttribute("position",new _e(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ia extends od{constructor(t){super(t),this.uuid=ds(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new od().fromJSON(s))}return this}}const qx={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let o=Sf(r,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,u,d,f,p,_,m;if(n&&(o=Jx(r,t,o,e)),r.length>80*e){c=d=r[0],u=f=r[1];for(let x=e;x<s;x+=e)p=r[x],_=r[x+1],p<c&&(c=p),_<u&&(u=_),p>d&&(d=p),_>f&&(f=_);m=Math.max(d-c,f-u),m=m!==0?32767/m:0}return $s(o,l,e,c,u,m,0),l}};function Sf(r,t,e,n,s){let o,l;if(s===cb(r,t,e,n)>0)for(o=t;o<e;o+=n)l=ad(o,r[o],r[o+1],l);else for(o=e-n;o>=t;o-=n)l=ad(o,r[o],r[o+1],l);return l&&Da(l,l.next)&&(Js(l),l=l.next),l}function cr(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Da(e,e.next)||Le(e.prev,e,e.next)===0)){if(Js(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function $s(r,t,e,n,s,o,l){if(!r)return;!l&&o&&ib(r,n,s,o);let c=r,u,d;for(;r.prev!==r.next;){if(u=r.prev,d=r.next,o?Yx(r,n,s,o):jx(r)){t.push(u.i/e|0),t.push(r.i/e|0),t.push(d.i/e|0),Js(r),r=d.next,c=d.next;continue}if(r=d,r===c){l?l===1?(r=$x(cr(r),t,e),$s(r,t,e,n,s,o,2)):l===2&&Kx(r,t,e,n,s,o):$s(cr(r),t,e,n,s,o,1);break}}}function jx(r){const t=r.prev,e=r,n=r.next;if(Le(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,u=e.y,d=n.y,f=s<o?s<l?s:l:o<l?o:l,p=c<u?c<d?c:d:u<d?u:d,_=s>o?s>l?s:l:o>l?o:l,m=c>u?c>d?c:d:u>d?u:d;let x=n.next;for(;x!==t;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=m&&Qr(s,c,o,u,l,d,x.x,x.y)&&Le(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Yx(r,t,e,n){const s=r.prev,o=r,l=r.next;if(Le(s,o,l)>=0)return!1;const c=s.x,u=o.x,d=l.x,f=s.y,p=o.y,_=l.y,m=c<u?c<d?c:d:u<d?u:d,x=f<p?f<_?f:_:p<_?p:_,y=c>u?c>d?c:d:u>d?u:d,g=f>p?f>_?f:_:p>_?p:_,v=lc(m,x,t,e,n),S=lc(y,g,t,e,n);let w=r.prevZ,P=r.nextZ;for(;w&&w.z>=v&&P&&P.z<=S;){if(w.x>=m&&w.x<=y&&w.y>=x&&w.y<=g&&w!==s&&w!==l&&Qr(c,f,u,p,d,_,w.x,w.y)&&Le(w.prev,w,w.next)>=0||(w=w.prevZ,P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Qr(c,f,u,p,d,_,P.x,P.y)&&Le(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;w&&w.z>=v;){if(w.x>=m&&w.x<=y&&w.y>=x&&w.y<=g&&w!==s&&w!==l&&Qr(c,f,u,p,d,_,w.x,w.y)&&Le(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;P&&P.z<=S;){if(P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Qr(c,f,u,p,d,_,P.x,P.y)&&Le(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function $x(r,t,e){let n=r;do{const s=n.prev,o=n.next.next;!Da(s,o)&&Ef(s,n,n.next,o)&&Ks(s,o)&&Ks(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),Js(n),Js(n.next),n=r=o),n=n.next}while(n!==r);return cr(n)}function Kx(r,t,e,n,s,o){let l=r;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&ob(l,c)){let u=Tf(l,c);l=cr(l,l.next),u=cr(u,u.next),$s(l,t,e,n,s,o,0),$s(u,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==r)}function Jx(r,t,e,n){const s=[];let o,l,c,u,d;for(o=0,l=t.length;o<l;o++)c=t[o]*n,u=o<l-1?t[o+1]*n:r.length,d=Sf(r,c,u,n,!1),d===d.next&&(d.steiner=!0),s.push(sb(d));for(s.sort(Qx),o=0;o<s.length;o++)e=tb(s[o],e);return e}function Qx(r,t){return r.x-t.x}function tb(r,t){const e=eb(r,t);if(!e)return t;const n=Tf(e,r);return cr(n,n.next),cr(e,e.next)}function eb(r,t){let e=t,n=-1/0,s;const o=r.x,l=r.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const _=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(_<=o&&_>n&&(n=_,s=e.x<e.next.x?e:e.next,_===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,u=s.x,d=s.y;let f=1/0,p;e=s;do o>=e.x&&e.x>=u&&o!==e.x&&Qr(l<d?o:n,l,u,d,l<d?n:o,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(o-e.x),Ks(e,r)&&(p<f||p===f&&(e.x>s.x||e.x===s.x&&nb(s,e)))&&(s=e,f=p)),e=e.next;while(e!==c);return s}function nb(r,t){return Le(r.prev,r,t.prev)<0&&Le(t.next,r,r.next)<0}function ib(r,t,e,n){let s=r;do s.z===0&&(s.z=lc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,rb(s)}function rb(r){let t,e,n,s,o,l,c,u,d=1;do{for(e=r,r=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(u=d;c>0||u>0&&n;)c!==0&&(u===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,u--),o?o.nextZ=s:r=s,s.prevZ=o,o=s;e=n}o.nextZ=null,d*=2}while(l>1);return r}function lc(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function sb(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Qr(r,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(r-l)*(o-c)&&(r-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function ob(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!ab(r,t)&&(Ks(r,t)&&Ks(t,r)&&lb(r,t)&&(Le(r.prev,r,t.prev)||Le(r,t.prev,t))||Da(r,t)&&Le(r.prev,r,r.next)>0&&Le(t.prev,t,t.next)>0)}function Le(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Da(r,t){return r.x===t.x&&r.y===t.y}function Ef(r,t,e,n){const s=ea(Le(r,t,e)),o=ea(Le(r,t,n)),l=ea(Le(e,n,r)),c=ea(Le(e,n,t));return!!(s!==o&&l!==c||s===0&&ta(r,e,t)||o===0&&ta(r,n,t)||l===0&&ta(e,r,n)||c===0&&ta(e,t,n))}function ta(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function ea(r){return r>0?1:r<0?-1:0}function ab(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Ef(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Ks(r,t){return Le(r.prev,r,r.next)<0?Le(r,t,r.next)>=0&&Le(r,r.prev,t)>=0:Le(r,t,r.prev)<0||Le(r,r.next,t)<0}function lb(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,o=(r.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Tf(r,t){const e=new cc(r.i,r.x,r.y),n=new cc(t.i,t.x,t.y),s=r.next,o=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function ad(r,t,e,n){const s=new cc(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Js(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function cc(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function cb(r,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(r[l]-r[o])*(r[o+1]+r[l+1]),l=o;return s}class Ws{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return Ws.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];ld(t),cd(n,t);let l=t.length;e.forEach(ld);for(let u=0;u<e.length;u++)s.push(l),l+=e[u].length,cd(n,e[u]);const c=qx.triangulate(n,s);for(let u=0;u<c.length;u+=3)o.push(c.slice(u,u+3));return o}}function ld(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function cd(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class io extends Oe{constructor(t=new Ia([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,u=t.length;c<u;c++){const d=t[c];l(d)}this.setAttribute("position",new _e(s,3)),this.setAttribute("uv",new _e(o,2)),this.computeVertexNormals();function l(c){const u=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let _=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:m-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const v=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:ub;let w,P=!1,N,O,k,H;v&&(w=v.getSpacedPoints(f),P=!0,_=!1,N=v.computeFrenetFrames(f,!1),O=new J,k=new J,H=new J),_||(g=0,m=0,x=0,y=0);const I=c.extractPoints(d);let R=I.shape;const W=I.holes;if(!Ws.isClockWise(R)){R=R.reverse();for(let xt=0,bt=W.length;xt<bt;xt++){const E=W[xt];Ws.isClockWise(E)&&(W[xt]=E.reverse())}}const F=Ws.triangulateShape(R,W),C=R;for(let xt=0,bt=W.length;xt<bt;xt++){const E=W[xt];R=R.concat(E)}function Z(xt,bt,E){return bt||console.error("THREE.ExtrudeGeometry: vec does not exist"),xt.clone().addScaledVector(bt,E)}const nt=R.length,rt=F.length;function j(xt,bt,E){let et,$,A;const M=xt.x-bt.x,B=xt.y-bt.y,X=E.x-xt.x,K=E.y-xt.y,G=M*M+B*B,ft=M*K-B*X;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(G),pt=Math.sqrt(X*X+K*K),Tt=bt.x-B/lt,Et=bt.y+M/lt,At=E.x-K/pt,Ht=E.y+X/pt,zt=((At-Tt)*K-(Ht-Et)*X)/(M*K-B*X);et=Tt+M*zt-xt.x,$=Et+B*zt-xt.y;const Dt=et*et+$*$;if(Dt<=2)return new vt(et,$);A=Math.sqrt(Dt/2)}else{let lt=!1;M>Number.EPSILON?X>Number.EPSILON&&(lt=!0):M<-Number.EPSILON?X<-Number.EPSILON&&(lt=!0):Math.sign(B)===Math.sign(K)&&(lt=!0),lt?(et=-B,$=M,A=Math.sqrt(G)):(et=M,$=B,A=Math.sqrt(G/2))}return new vt(et/A,$/A)}const st=[];for(let xt=0,bt=C.length,E=bt-1,et=xt+1;xt<bt;xt++,E++,et++)E===bt&&(E=0),et===bt&&(et=0),st[xt]=j(C[xt],C[E],C[et]);const at=[];let q,tt=st.concat();for(let xt=0,bt=W.length;xt<bt;xt++){const E=W[xt];q=[];for(let et=0,$=E.length,A=$-1,M=et+1;et<$;et++,A++,M++)A===$&&(A=0),M===$&&(M=0),q[et]=j(E[et],E[A],E[M]);at.push(q),tt=tt.concat(q)}for(let xt=0;xt<g;xt++){const bt=xt/g,E=m*Math.cos(bt*Math.PI/2),et=x*Math.sin(bt*Math.PI/2)+y;for(let $=0,A=C.length;$<A;$++){const M=Z(C[$],st[$],et);St(M.x,M.y,-E)}for(let $=0,A=W.length;$<A;$++){const M=W[$];q=at[$];for(let B=0,X=M.length;B<X;B++){const K=Z(M[B],q[B],et);St(K.x,K.y,-E)}}}const Ct=x+y;for(let xt=0;xt<nt;xt++){const bt=_?Z(R[xt],tt[xt],Ct):R[xt];P?(k.copy(N.normals[0]).multiplyScalar(bt.x),O.copy(N.binormals[0]).multiplyScalar(bt.y),H.copy(w[0]).add(k).add(O),St(H.x,H.y,H.z)):St(bt.x,bt.y,0)}for(let xt=1;xt<=f;xt++)for(let bt=0;bt<nt;bt++){const E=_?Z(R[bt],tt[bt],Ct):R[bt];P?(k.copy(N.normals[xt]).multiplyScalar(E.x),O.copy(N.binormals[xt]).multiplyScalar(E.y),H.copy(w[xt]).add(k).add(O),St(H.x,H.y,H.z)):St(E.x,E.y,p/f*xt)}for(let xt=g-1;xt>=0;xt--){const bt=xt/g,E=m*Math.cos(bt*Math.PI/2),et=x*Math.sin(bt*Math.PI/2)+y;for(let $=0,A=C.length;$<A;$++){const M=Z(C[$],st[$],et);St(M.x,M.y,p+E)}for(let $=0,A=W.length;$<A;$++){const M=W[$];q=at[$];for(let B=0,X=M.length;B<X;B++){const K=Z(M[B],q[B],et);P?St(K.x,K.y+w[f-1].y,w[f-1].x+E):St(K.x,K.y,p+E)}}}Q(),it();function Q(){const xt=s.length/3;if(_){let bt=0,E=nt*bt;for(let et=0;et<rt;et++){const $=F[et];Pt($[2]+E,$[1]+E,$[0]+E)}bt=f+g*2,E=nt*bt;for(let et=0;et<rt;et++){const $=F[et];Pt($[0]+E,$[1]+E,$[2]+E)}}else{for(let bt=0;bt<rt;bt++){const E=F[bt];Pt(E[2],E[1],E[0])}for(let bt=0;bt<rt;bt++){const E=F[bt];Pt(E[0]+nt*f,E[1]+nt*f,E[2]+nt*f)}}n.addGroup(xt,s.length/3-xt,0)}function it(){const xt=s.length/3;let bt=0;wt(C,bt),bt+=C.length;for(let E=0,et=W.length;E<et;E++){const $=W[E];wt($,bt),bt+=$.length}n.addGroup(xt,s.length/3-xt,1)}function wt(xt,bt){let E=xt.length;for(;--E>=0;){const et=E;let $=E-1;$<0&&($=xt.length-1);for(let A=0,M=f+g*2;A<M;A++){const B=nt*A,X=nt*(A+1),K=bt+et+B,G=bt+$+B,ft=bt+$+X,lt=bt+et+X;It(K,G,ft,lt)}}}function St(xt,bt,E){u.push(xt),u.push(bt),u.push(E)}function Pt(xt,bt,E){Ut(xt),Ut(bt),Ut(E);const et=s.length/3,$=S.generateTopUV(n,s,et-3,et-2,et-1);ot($[0]),ot($[1]),ot($[2])}function It(xt,bt,E,et){Ut(xt),Ut(bt),Ut(et),Ut(bt),Ut(E),Ut(et);const $=s.length/3,A=S.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);ot(A[0]),ot(A[1]),ot(A[3]),ot(A[1]),ot(A[2]),ot(A[3])}function Ut(xt){s.push(u[xt*3+0]),s.push(u[xt*3+1]),s.push(u[xt*3+2])}function ot(xt){o.push(xt.x),o.push(xt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return hb(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ga[s.type]().fromJSON(s)),new io(n,t.options)}}const ub={generateTopUV:function(r,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],u=t[n*3+1],d=t[s*3],f=t[s*3+1];return[new vt(o,l),new vt(c,u),new vt(d,f)]},generateSideWallUV:function(r,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],u=t[e*3+2],d=t[n*3],f=t[n*3+1],p=t[n*3+2],_=t[s*3],m=t[s*3+1],x=t[s*3+2],y=t[o*3],g=t[o*3+1],v=t[o*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new vt(l,1-u),new vt(d,1-p),new vt(_,1-x),new vt(y,1-v)]:[new vt(c,1-u),new vt(f,1-p),new vt(m,1-x),new vt(g,1-v)]}};function hb(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const o=r[n];e.shapes.push(o.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class _a extends Oe{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],d=[],f=new J,p=new J,_=new J;for(let m=0;m<=n;m++)for(let x=0;x<=s;x++){const y=x/s*o,g=m/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(y),p.y=(t+e*Math.cos(g))*Math.sin(y),p.z=e*Math.sin(g),c.push(p.x,p.y,p.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),_.subVectors(p,f).normalize(),u.push(_.x,_.y,_.z),d.push(x/s),d.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=s;x++){const y=(s+1)*m+x-1,g=(s+1)*(m-1)+x-1,v=(s+1)*(m-1)+x,S=(s+1)*m+x;l.push(y,g,S),l.push(g,v,S)}this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _a(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Cc extends Oe{constructor(t=new wf(new J(-1,-1,0),new J(-1,1,0),new J(1,1,0)),e=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:o};const l=t.computeFrenetFrames(e,o);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const c=new J,u=new J,d=new vt;let f=new J;const p=[],_=[],m=[],x=[];y(),this.setIndex(x),this.setAttribute("position",new _e(p,3)),this.setAttribute("normal",new _e(_,3)),this.setAttribute("uv",new _e(m,2));function y(){for(let w=0;w<e;w++)g(w);g(o===!1?e:0),S(),v()}function g(w){f=t.getPointAt(w/e,f);const P=l.normals[w],N=l.binormals[w];for(let O=0;O<=s;O++){const k=O/s*Math.PI*2,H=Math.sin(k),I=-Math.cos(k);u.x=I*P.x+H*N.x,u.y=I*P.y+H*N.y,u.z=I*P.z+H*N.z,u.normalize(),_.push(u.x,u.y,u.z),c.x=f.x+n*u.x,c.y=f.y+n*u.y,c.z=f.z+n*u.z,p.push(c.x,c.y,c.z)}}function v(){for(let w=1;w<=e;w++)for(let P=1;P<=s;P++){const N=(s+1)*(w-1)+(P-1),O=(s+1)*w+(P-1),k=(s+1)*w+P,H=(s+1)*(w-1)+P;x.push(N,O,H),x.push(O,k,H)}}function S(){for(let w=0;w<=e;w++)for(let P=0;P<=s;P++)d.x=w/e,d.y=P/s,m.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Cc(new ga[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class ir extends fr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Zs extends fr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Af extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Wl=new Te,ud=new J,hd=new J;class db{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Mc,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ud.setFromMatrixPosition(t.matrixWorld),e.position.copy(ud),hd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hd),e.updateMatrixWorld(),Wl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Wl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Wl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class fb extends db{constructor(){super(new lf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class uc extends Af{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new fb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Lf extends Af{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const dd=new Te;class pb{constructor(t,e,n=0,s=1/0){this.ray=new Ca(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new wc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return dd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dd),this}intersectObject(t,e=!0,n=[]){return hc(t,this,n,e),n.sort(fd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,o=t.length;s<o;s++)hc(t[s],this,n,e);return n.sort(fd),n}}function fd(r,t){return r.distance-t.distance}function hc(r,t,e,n){if(r.layers.test(t.layers)&&r.raycast(t,e),n===!0){const s=r.children;for(let o=0,l=s.length;o<l;o++)hc(s[o],t,e,!0)}}class pd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(je(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vc);const md={type:"change"},Zl={type:"start"},gd={type:"end"},na=new Ca,_d=new Pi,mb=Math.cos(70*Sg.DEG2RAD);class Cf extends dr{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mr.ROTATE,MIDDLE:Mr.DOLLY,RIGHT:Mr.PAN},this.touches={ONE:Sr.ROTATE,TWO:Sr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",At),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",At),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(md),n.update(),o=s.NONE},this.update=function(){const D=new J,ht=new lr().setFromUnitVectors(t.up,new J(0,1,0)),Mt=ht.clone().invert(),Rt=new J,Nt=new lr,re=new J,ue=2*Math.PI;return function(ke=null){const me=n.object.position;D.copy(me).sub(n.target),D.applyQuaternion(ht),c.setFromVector3(D),n.autoRotate&&o===s.NONE&&U(R(ke)),n.enableDamping?(c.theta+=u.theta*n.dampingFactor,c.phi+=u.phi*n.dampingFactor):(c.theta+=u.theta,c.phi+=u.phi);let Ce=n.minAzimuthAngle,Ee=n.maxAzimuthAngle;isFinite(Ce)&&isFinite(Ee)&&(Ce<-Math.PI?Ce+=ue:Ce>Math.PI&&(Ce-=ue),Ee<-Math.PI?Ee+=ue:Ee>Math.PI&&(Ee-=ue),Ce<=Ee?c.theta=Math.max(Ce,Math.min(Ee,c.theta)):c.theta=c.theta>(Ce+Ee)/2?Math.max(Ce,c.theta):Math.min(Ee,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let sn=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)c.radius=at(c.radius);else{const mn=c.radius;c.radius=at(c.radius*d),sn=mn!=c.radius}if(D.setFromSpherical(c),D.applyQuaternion(Mt),me.copy(n.target).add(D),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&O){let mn=null;if(n.object.isPerspectiveCamera){const jn=D.length();mn=at(jn*d);const yi=jn-mn;n.object.position.addScaledVector(P,yi),n.object.updateMatrixWorld(),sn=!!yi}else if(n.object.isOrthographicCamera){const jn=new J(N.x,N.y,0);jn.unproject(n.object);const yi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),sn=yi!==n.object.zoom;const Ge=new J(N.x,N.y,0);Ge.unproject(n.object),n.object.position.sub(Ge).add(jn),n.object.updateMatrixWorld(),mn=D.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;mn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(mn).add(n.object.position):(na.origin.copy(n.object.position),na.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(na.direction))<mb?t.lookAt(n.target):(_d.setFromNormalAndCoplanarPoint(n.object.up,n.target),na.intersectPlane(_d,n.target))))}else if(n.object.isOrthographicCamera){const mn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),mn!==n.object.zoom&&(n.object.updateProjectionMatrix(),sn=!0)}return d=1,O=!1,sn||Rt.distanceToSquared(n.object.position)>l||8*(1-Nt.dot(n.object.quaternion))>l||re.distanceToSquared(n.target)>l?(n.dispatchEvent(md),Rt.copy(n.object.position),Nt.copy(n.object.quaternion),re.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",K),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.domElement.getRootNode().removeEventListener("keydown",Tt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",At),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new pd,u=new pd;let d=1;const f=new J,p=new vt,_=new vt,m=new vt,x=new vt,y=new vt,g=new vt,v=new vt,S=new vt,w=new vt,P=new J,N=new vt;let O=!1;const k=[],H={};let I=!1;function R(D){return D!==null?2*Math.PI/60*n.autoRotateSpeed*D:2*Math.PI/60/60*n.autoRotateSpeed}function W(D){const ht=Math.abs(D*.01);return Math.pow(.95,n.zoomSpeed*ht)}function U(D){u.theta-=D}function F(D){u.phi-=D}const C=function(){const D=new J;return function(Mt,Rt){D.setFromMatrixColumn(Rt,0),D.multiplyScalar(-Mt),f.add(D)}}(),Z=function(){const D=new J;return function(Mt,Rt){n.screenSpacePanning===!0?D.setFromMatrixColumn(Rt,1):(D.setFromMatrixColumn(Rt,0),D.crossVectors(n.object.up,D)),D.multiplyScalar(Mt),f.add(D)}}(),nt=function(){const D=new J;return function(Mt,Rt){const Nt=n.domElement;if(n.object.isPerspectiveCamera){const re=n.object.position;D.copy(re).sub(n.target);let ue=D.length();ue*=Math.tan(n.object.fov/2*Math.PI/180),C(2*Mt*ue/Nt.clientHeight,n.object.matrix),Z(2*Rt*ue/Nt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(C(Mt*(n.object.right-n.object.left)/n.object.zoom/Nt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/Nt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function rt(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function st(D,ht){if(!n.zoomToCursor)return;O=!0;const Mt=n.domElement.getBoundingClientRect(),Rt=D-Mt.left,Nt=ht-Mt.top,re=Mt.width,ue=Mt.height;N.x=Rt/re*2-1,N.y=-(Nt/ue)*2+1,P.set(N.x,N.y,1).unproject(n.object).sub(n.object.position).normalize()}function at(D){return Math.max(n.minDistance,Math.min(n.maxDistance,D))}function q(D){p.set(D.clientX,D.clientY)}function tt(D){st(D.clientX,D.clientX),v.set(D.clientX,D.clientY)}function Ct(D){x.set(D.clientX,D.clientY)}function Q(D){_.set(D.clientX,D.clientY),m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;U(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(_),n.update()}function it(D){S.set(D.clientX,D.clientY),w.subVectors(S,v),w.y>0?rt(W(w.y)):w.y<0&&j(W(w.y)),v.copy(S),n.update()}function wt(D){y.set(D.clientX,D.clientY),g.subVectors(y,x).multiplyScalar(n.panSpeed),nt(g.x,g.y),x.copy(y),n.update()}function St(D){st(D.clientX,D.clientY),D.deltaY<0?j(W(D.deltaY)):D.deltaY>0&&rt(W(D.deltaY)),n.update()}function Pt(D){let ht=!1;switch(D.code){case n.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(0,n.keyPanSpeed),ht=!0;break;case n.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(0,-n.keyPanSpeed),ht=!0;break;case n.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?U(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(n.keyPanSpeed,0),ht=!0;break;case n.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?U(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(-n.keyPanSpeed,0),ht=!0;break}ht&&(D.preventDefault(),n.update())}function It(D){if(k.length===1)p.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);p.set(Mt,Rt)}}function Ut(D){if(k.length===1)x.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);x.set(Mt,Rt)}}function ot(D){const ht=te(D),Mt=D.pageX-ht.x,Rt=D.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);v.set(0,Nt)}function xt(D){n.enableZoom&&ot(D),n.enablePan&&Ut(D)}function bt(D){n.enableZoom&&ot(D),n.enableRotate&&It(D)}function E(D){if(k.length==1)_.set(D.pageX,D.pageY);else{const Mt=te(D),Rt=.5*(D.pageX+Mt.x),Nt=.5*(D.pageY+Mt.y);_.set(Rt,Nt)}m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;U(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(_)}function et(D){if(k.length===1)y.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);y.set(Mt,Rt)}g.subVectors(y,x).multiplyScalar(n.panSpeed),nt(g.x,g.y),x.copy(y)}function $(D){const ht=te(D),Mt=D.pageX-ht.x,Rt=D.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);S.set(0,Nt),w.set(0,Math.pow(S.y/v.y,n.zoomSpeed)),rt(w.y),v.copy(S);const re=(D.pageX+ht.x)*.5,ue=(D.pageY+ht.y)*.5;st(re,ue)}function A(D){n.enableZoom&&$(D),n.enablePan&&et(D)}function M(D){n.enableZoom&&$(D),n.enableRotate&&E(D)}function B(D){n.enabled!==!1&&(k.length===0&&(n.domElement.setPointerCapture(D.pointerId),n.domElement.addEventListener("pointermove",X),n.domElement.addEventListener("pointerup",K)),!oe(D)&&(Kt(D),D.pointerType==="touch"?Ht(D):G(D)))}function X(D){n.enabled!==!1&&(D.pointerType==="touch"?zt(D):ft(D))}function K(D){switch(Vt(D),k.length){case 0:n.domElement.releasePointerCapture(D.pointerId),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.dispatchEvent(gd),o=s.NONE;break;case 1:const ht=k[0],Mt=H[ht];Ht({pointerId:ht,pageX:Mt.x,pageY:Mt.y});break}}function G(D){let ht;switch(D.button){case 0:ht=n.mouseButtons.LEFT;break;case 1:ht=n.mouseButtons.MIDDLE;break;case 2:ht=n.mouseButtons.RIGHT;break;default:ht=-1}switch(ht){case Mr.DOLLY:if(n.enableZoom===!1)return;tt(D),o=s.DOLLY;break;case Mr.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enablePan===!1)return;Ct(D),o=s.PAN}else{if(n.enableRotate===!1)return;q(D),o=s.ROTATE}break;case Mr.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enableRotate===!1)return;q(D),o=s.ROTATE}else{if(n.enablePan===!1)return;Ct(D),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Zl)}function ft(D){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;Q(D);break;case s.DOLLY:if(n.enableZoom===!1)return;it(D);break;case s.PAN:if(n.enablePan===!1)return;wt(D);break}}function lt(D){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(D.preventDefault(),n.dispatchEvent(Zl),St(pt(D)),n.dispatchEvent(gd))}function pt(D){const ht=D.deltaMode,Mt={clientX:D.clientX,clientY:D.clientY,deltaY:D.deltaY};switch(ht){case 1:Mt.deltaY*=16;break;case 2:Mt.deltaY*=100;break}return D.ctrlKey&&!I&&(Mt.deltaY*=10),Mt}function Tt(D){D.key==="Control"&&(I=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(D){D.key==="Control"&&(I=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function At(D){n.enabled===!1||n.enablePan===!1||Pt(D)}function Ht(D){switch(ae(D),k.length){case 1:switch(n.touches.ONE){case Sr.ROTATE:if(n.enableRotate===!1)return;It(D),o=s.TOUCH_ROTATE;break;case Sr.PAN:if(n.enablePan===!1)return;Ut(D),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case Sr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;xt(D),o=s.TOUCH_DOLLY_PAN;break;case Sr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;bt(D),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Zl)}function zt(D){switch(ae(D),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;E(D),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;et(D),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;A(D),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;M(D),n.update();break;default:o=s.NONE}}function Dt(D){n.enabled!==!1&&D.preventDefault()}function Kt(D){k.push(D.pointerId)}function Vt(D){delete H[D.pointerId];for(let ht=0;ht<k.length;ht++)if(k[ht]==D.pointerId){k.splice(ht,1);return}}function oe(D){for(let ht=0;ht<k.length;ht++)if(k[ht]==D.pointerId)return!0;return!1}function ae(D){let ht=H[D.pointerId];ht===void 0&&(ht=new vt,H[D.pointerId]=ht),ht.set(D.pageX,D.pageY)}function te(D){const ht=D.pointerId===k[0]?k[1]:k[0];return H[ht]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",K),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Tt,{passive:!0,capture:!0}),this.update()}}let ia=null;function Pc(r){return ia||(ia=new Promise(t=>{const e=r.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new mf({canvas:r,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=Bd,o.toneMappingExposure=1,yt.renderer=o;const l=new gf;l.background=new Qt(12113128),yt.scene=l;const c=new Sn(45,n/s,.5,8e3);c.position.set(0,200,350),yt.camera=c;const u=new Cf(c,r);u.enableDamping=!0,u.dampingFactor=.07,u.minDistance=10,u.maxDistance=4e3,u.screenSpacePanning=!0,u.maxPolarAngle=Math.PI/2,yt.controls=u,l.add(new Lf(16777215,.78));const d=new uc(16775924,.95);d.position.set(-250,700,200),l.add(d);const f=new uc(14544639,.4);f.position.set(200,250,-200),l.add(f);const p=new Jr;l.add(p),yt.tg=p,window.addEventListener("resize",()=>{const m=e.clientWidth,x=e.clientHeight;!m||!x||(c.aspect=m/x,c.updateProjectionMatrix(),o.setSize(m,x))});function _(){requestAnimationFrame(_),u.update(),o.render(l,c)}_(),t()}),ia)}function gb(){if(yt.tg)for(;yt.tg.children.length;){const r=yt.tg.children[0];yt.tg.remove(r),r.geometry?.dispose(),Array.isArray(r.material)?r.material.forEach(t=>t.dispose()):r.material?.dispose()}}const _b="#f0ede8",vb="#c0bbb5",yb="#0fe300",xb="#0fe300",bb="#0fe300",wb="#0fe300",Mb="#262626",Vr="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function Pf(r,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:u,BASE_H:d}=yt;if(!e||!n)return d;const f=(r+s/2)/s*(n-1),p=(t+o/2)/o*(n-1),_=Math.max(0,Math.min(n-2,Math.floor(f))),m=Math.max(0,Math.min(n-2,Math.floor(p))),x=f-_,y=p-m,g=e[m*n+_]??l,v=e[m*n+_+1]??l,S=e[(m+1)*n+_]??l,w=e[(m+1)*n+_+1]??l,P=g*(1-x)*(1-y)+v*x*(1-y)+S*(1-x)*y+w*x*y;return d+Math.max(0,Math.min(1,(P-l)/Math.max(.001,c)))*u}function ra(r,t,e){if(!r.positions.length||!r.indices.length)return null;const n=new Oe;n.setAttribute("position",new An(r.positions,3)),r.colors&&n.setAttribute("color",new An(r.colors,3)),n.setIndex(new An(r.indices,1)),n.computeVertexNormals();const s=new Ne(n,t);return s.name=e,s}function Sb(r){if(!yt.tg)return;gb();const t=Rd(),e=yt.tg;function n(o,l,c,u=-8){l.polygonOffset=!0,l.polygonOffsetFactor=u,l.polygonOffsetUnits=u;const d=ra(o,l,c);d&&e.add(d)}const s=(o,l=.95,c=!1)=>new ir({color:new Qt(o),roughness:l,metalness:0,flatShading:c});{const o=new ir({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:dn,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=ra(r.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=Eb(yt.wMm,yt.dMm,yt.zoneType);if(o){const l=new io(o,{depth:yt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new Ne(l,new ir({color:new Qt(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if(Tb(t.cBase),r.GROUND.positions.length){const o=new ir({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=ra(r.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(r.LAND,s(_b),"LAND",-2),n(r.ROCK,s(vb),"ROCK",-3),n(r.FARM,s(wb),"FARM",-4),n(r.GRASS,s(yb),"GRASS",-5),n(r.PARKS,s(bb),"PARKS",-6),n(r.FOREST,s(xb),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=dn,n(r.WATER,o,"WATER",-8)}if(t.roadsOn){n(r.PED,s(Mb,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=dn,n(r.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(r.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),r.GPX.positions.length){const o=new ir({color:new Qt(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=ra(r.GPX,o,"GPX");l&&e.add(l)}Cb()}function Eb(r,t,e){const n=new Ia;if(e==="circ")n.ellipse(0,0,r/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(r/2*Math.cos(o),r/2*Math.sin(o)):n.lineTo(r/2*Math.cos(o),r/2*Math.sin(o))}n.closePath()}else n.moveTo(-r/2,-t/2),n.lineTo(r/2,-t/2),n.lineTo(r/2,t/2),n.lineTo(-r/2,t/2),n.closePath();return n}function Tb(r){if(!yt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=yt,o=new ir({color:new Qt(r),roughness:.55,side:dn});function l(u,d){return{x:u,z:d,topY:Math.max(n,Pf(u*.98,d*.98))}}function c(u){const d=[],f=[];let p=0;const _=u.length;for(let y=0;y<_;y++){const g=u[y],v=u[(y+1)%_],S=(g.x+v.x)/2,w=(g.z+v.z)/2,P=S*(v.z-g.z)-w*(v.x-g.x),[N,O]=P>=0?[g,v]:[v,g];d.push(N.x,N.topY,N.z,O.x,O.topY,O.z,O.x,0,O.z,N.x,0,N.z),f.push(p,p+1,p+2,p,p+2,p+3),p+=4}if(!d.length)return;const m=new Oe;m.setAttribute("position",new _e(d,3)),m.setIndex(f),m.computeVertexNormals();const x=new Ne(m,o);x.name="WALLS",yt.tg.add(x)}if(s==="circ"){const d=t/2;c(Array.from({length:512},(f,p)=>{const _=p/512*Math.PI*2;return l(d*Math.cos(_),d*Math.sin(_))}))}else if(s==="hex"){const u=t/2;c(Array.from({length:6},(d,f)=>{const p=f/6*Math.PI*2-Math.PI/6;return l(u*Math.cos(p),u*Math.sin(p))}))}else if(yt.zonePts&&yt.zonePts.length>=3&&yt.bounds){const{bounds:u}=yt,d=e/(u.maxLat-u.minLat),f=t/(u.maxLon-u.minLon),p=(u.minLat+u.maxLat)/2,_=(u.minLon+u.maxLon)/2;c(yt.zonePts.map(([m,x])=>l((x-_)*f,-(m-p)*d)))}else{const u=-t/2,d=t/2,f=-e/2,p=e/2;c([l(u,f),l(d,f),l(d,p),l(u,p)])}}const Ab=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function Xl(r){const t=[],e=[];let n=0;for(const o of r){const l=o.attributes.position,c=o.index;for(let u=0;u<l.count;u++)t.push(l.getX(u),l.getY(u),l.getZ(u));if(c)for(let u=0;u<c.count;u++)e.push(c.getX(u)+n);else for(let u=0;u<l.count;u++)e.push(u+n);n+=l.count,o.dispose()}const s=new Oe;return s.setAttribute("position",new _e(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Lb(r,t,e,n){const s=t/2,o=n/2;try{switch(r){case"eiffel":{const l=[new vt(s,0),new vt(s*.82,e*.035),new vt(s*.58,e*.08),new vt(s*.32,e*.135),new vt(s*.265,e*.165),new vt(s*.285,e*.175),new vt(s*.245,e*.188),new vt(s*.18,e*.23),new vt(s*.13,e*.33),new vt(s*.115,e*.348),new vt(s*.13,e*.358),new vt(s*.11,e*.37),new vt(s*.08,e*.43),new vt(s*.048,e*.6),new vt(s*.026,e*.83),new vt(s*.01,e*.94),new vt(0,e)],c=new nr(l,4);c.rotateY(Math.PI/4);const u=new Ys(s*.32,s*.32,e*.012,16,1,!1);u.translate(0,e*.175,0);const d=new Ys(s*.145,s*.145,e*.01,16,1,!1);return d.translate(0,e*.358,0),Xl([c,u,d])}case"burj":{const l=[new vt(s,0),new vt(s*.8,e*.15),new vt(s*.55,e*.4),new vt(s*.25,e*.72),new vt(s*.08,e*.9),new vt(s*.02,e)];return new nr(l,12)}case"dome":{const c=Array.from({length:13},(u,d)=>{const f=d/12*Math.PI/2;return new vt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new vt(s*.9,0),new vt(0,0)),new nr(c,16)}case"onion":{const l=[new vt(s*.3,0),new vt(s*.55,e*.12),new vt(s,e*.4),new vt(s*.55,e*.65),new vt(s*.1,e*.85),new vt(s*.04,e)];return new nr(l,12)}case"tower":{const l=[new vt(s,0),new vt(s*.65,e*.2),new vt(s*.3,e*.55),new vt(s*.1,e*.8),new vt(s*.03,e)];return new nr(l,8)}case"pyramid":{const l=new Lc(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,u=new un(l,c,n);u.translate(-s+l/2,c/2,0);const d=new un(l,c,n);d.translate(s-l/2,c/2,0);const f=new un(t,e*.22,n);return f.translate(0,e*.89,0),Xl([u,d,f])}case"cathedral":{const l=t*.55,c=e*.65,u=t*.14,d=new un(l,c,n);d.translate(0,c/2,0);const f=new un(u,e,u);f.translate(-l/2+u/2,e/2,-o+u/2);const p=new un(u,e,u);return p.translate(l/2-u/2,e/2,-o+u/2),Xl([d,f,p])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,u=new _a(l,Math.max(c,3),8,32);return u.scale(1,e/(l*.8),o/s),u.translate(0,e/2,0),u}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],u=new Oe;return u.setAttribute("position",new _e(l,3)),u.setIndex(c),u.computeVertexNormals(),u}case"wheel":{const l=Math.min(s,e/2),c=new _a(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new un(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function Cb(){if(!yt.tg||!yt.bounds||!yt.elevGrid)return;const{bounds:r,wMm:t,dMm:e,mmPerMeter:n}=yt,s=(r.minLat+r.maxLat)/2,o=(r.minLon+r.maxLon)/2,l=e/(r.maxLat-r.minLat),c=t/(r.maxLon-r.minLon),u=.01;let d=0;for(const f of Ab){if(f.lat<r.minLat-u||f.lat>r.maxLat+u||f.lon<r.minLon-u||f.lon>r.maxLon+u)continue;const p=(f.lon-o)*c,_=-(f.lat-s)*l,m=t/2,x=e/2;if(!(p>=-m-1&&p<=m+1&&_>=-x-1&&_<=x+1))continue;const g=Pf(p,_),v=Math.min(t*.25,Math.max(5,f.rH*n*2)),S=Math.min(t*.08,Math.max(1.5,f.rW*n)),w=Math.min(t*.08,Math.max(1.5,f.rD*n)),P=Lb(f.sh,S,v,w);if(!P)continue;P.translate(p,g,_);const N=new Ne(P,new ir({color:new Qt(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));N.name="LM_"+f.n,yt.tg.add(N),d++}d&&console.log(`Landmarks: ${d} monument(s)`)}var ss=Math.pow,rn=(r,t,e)=>new Promise((n,s)=>{var o=u=>{try{c(e.next(u))}catch(d){s(d)}},l=u=>{try{c(e.throw(u))}catch(d){s(d)}},c=u=>u.done?n(u.value):Promise.resolve(u.value).then(o,l);c((e=e.apply(r,t)).next())}),En=Uint8Array,Xs=Uint16Array,Pb=Int32Array,Rf=new En([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),If=new En([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Rb=new En([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Df=function(r,t){for(var e=new Xs(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var s=new Pb(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},Nf=Df(Rf,2),Of=Nf.b,Ib=Nf.r;Of[28]=258,Ib[258]=28;var Db=Df(If,0),Nb=Db.b,kf=new Xs(32768);for(pe=0;pe<32768;++pe)pi=(pe&43690)>>1|(pe&21845)<<1,pi=(pi&52428)>>2|(pi&13107)<<2,pi=(pi&61680)>>4|(pi&3855)<<4,kf[pe]=((pi&65280)>>8|(pi&255)<<8)>>1;var pi,pe,qs=function(r,t,e){for(var n=r.length,s=0,o=new Xs(t);s<n;++s)r[s]&&++o[r[s]-1];var l=new Xs(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new Xs(1<<t);var u=15-t;for(s=0;s<n;++s)if(r[s])for(var d=s<<4|r[s],f=t-r[s],p=l[r[s]-1]++<<f,_=p|(1<<f)-1;p<=_;++p)c[kf[p]>>u]=d}return c},ro=new En(288);for(pe=0;pe<144;++pe)ro[pe]=8;var pe;for(pe=144;pe<256;++pe)ro[pe]=9;var pe;for(pe=256;pe<280;++pe)ro[pe]=7;var pe;for(pe=280;pe<288;++pe)ro[pe]=8;var pe,Uf=new En(32);for(pe=0;pe<32;++pe)Uf[pe]=5;var pe,Ob=qs(ro,9),kb=qs(Uf,5),ql=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},Hn=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},jl=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},Ub=function(r){return(r+7)/8|0},zb=function(r,t,e){(e==null||e>r.length)&&(e=r.length);var n=new En(e-t);return n.set(r.subarray(t,e)),n},Bb=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Mn=function(r,t,e){var n=new Error(t||Bb[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,Mn),!e)throw n;return n},Rc=function(r,t,e,n){var s=r.length,o=0;if(!s||t.f&&!t.l)return e||new En(0);var l=!e||t.i!=2,c=t.i;e||(e=new En(s*3));var u=function(Ut){var ot=e.length;if(Ut>ot){var xt=new En(Math.max(ot*2,Ut));xt.set(e),e=xt}},d=t.f||0,f=t.p||0,p=t.b||0,_=t.l,m=t.d,x=t.m,y=t.n,g=s*8;do{if(!_){d=Hn(r,f,1);var v=Hn(r,f+1,3);if(f+=3,v)if(v==1)_=Ob,m=kb,x=9,y=5;else if(v==2){var N=Hn(r,f,31)+257,O=Hn(r,f+10,15)+4,k=N+Hn(r,f+5,31)+1;f+=14;for(var H=new En(k),I=new En(19),R=0;R<O;++R)I[Rb[R]]=Hn(r,f+R*3,7);f+=O*3;for(var W=ql(I),U=(1<<W)-1,F=qs(I,W),R=0;R<k;){var C=F[Hn(r,f,U)];f+=C&15;var S=C>>4;if(S<16)H[R++]=S;else{var Z=0,nt=0;for(S==16?(nt=3+Hn(r,f,3),f+=2,Z=H[R-1]):S==17?(nt=3+Hn(r,f,7),f+=3):S==18&&(nt=11+Hn(r,f,127),f+=7);nt--;)H[R++]=Z}}var rt=H.subarray(0,N),j=H.subarray(N);x=ql(rt),y=ql(j),_=qs(rt,x),m=qs(j,y)}else Mn(1);else{var S=Ub(f)+4,w=r[S-4]|r[S-3]<<8,P=S+w;if(P>s){c&&Mn(0);break}l&&u(p+w),e.set(r.subarray(S,P),p),t.b=p+=w,t.p=f=P*8,t.f=d;continue}if(f>g){c&&Mn(0);break}}l&&u(p+131072);for(var st=(1<<x)-1,at=(1<<y)-1,q=f;;q=f){var Z=_[jl(r,f)&st],tt=Z>>4;if(f+=Z&15,f>g){c&&Mn(0);break}if(Z||Mn(2),tt<256)e[p++]=tt;else if(tt==256){q=f,_=null;break}else{var Ct=tt-254;if(tt>264){var R=tt-257,Q=Rf[R];Ct=Hn(r,f,(1<<Q)-1)+Of[R],f+=Q}var it=m[jl(r,f)&at],wt=it>>4;it||Mn(3),f+=it&15;var j=Nb[wt];if(wt>3){var Q=If[wt];j+=jl(r,f)&(1<<Q)-1,f+=Q}if(f>g){c&&Mn(0);break}l&&u(p+131072);var St=p+Ct;if(p<j){var Pt=o-j,It=Math.min(j,St);for(Pt+p<0&&Mn(3);p<It;++p)e[p]=n[Pt+p]}for(;p<St;p+=4)e[p]=e[p-j],e[p+1]=e[p+1-j],e[p+2]=e[p+2-j],e[p+3]=e[p+3-j];p=St}}t.l=_,t.p=q,t.b=p,t.f=d,_&&(d=1,t.m=x,t.d=m,t.n=y)}while(!d);return p==e.length?e:zb(e,0,p)},Fb=new En(0),Hb=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&Mn(6,"invalid gzip data");var t=r[3],e=10;t&4&&(e+=(r[10]|r[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!r[e++]);return e+(t&2)},Vb=function(r){var t=r.length;return(r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0},Gb=function(r,t){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&Mn(6,"invalid zlib data"),(r[1]>>5&1)==1&&Mn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function Wb(r,t){return Rc(r,{i:2},t,t)}function Zb(r,t){var e=Hb(r);return e+8>r.length&&Mn(6,"invalid gzip data"),Rc(r.subarray(e,-8),{i:2},new En(Vb(r)),t)}function Xb(r,t){return Rc(r.subarray(Gb(r),-4),{i:2},t,t)}function dc(r,t){return r[0]==31&&r[1]==139&&r[2]==8?Zb(r,t):(r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31?Wb(r,t):Xb(r,t)}var qb=typeof TextDecoder<"u"&&new TextDecoder,jb=0;try{qb.decode(Fb,{stream:!0}),jb=1}catch{}var zf=(r,t)=>r*ss(2,t),Os=(r,t)=>Math.floor(r/ss(2,t)),va=(r,t)=>zf(r.getUint16(t+1,!0),8)+r.getUint8(t),Bf=(r,t)=>zf(r.getUint32(t+2,!0),16)+r.getUint16(t,!0),Yb=(r,t,e,n,s)=>{if(r!==n.getUint8(s))return r-n.getUint8(s);const o=va(n,s+1);if(t!==o)return t-o;const l=va(n,s+4);return e!==l?e-l:0},$b=(r,t,e,n)=>{const s=Ff(r,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},vd=(r,t,e,n)=>{const s=Ff(r,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},Ff=(r,t,e,n)=>{let s=0,o=r.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=Yb(t,e,n,r,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[Bf(r,l*17+7),r.getUint32(l*17+13,!0)]}return null},Kb=(r,t)=>r.isDir&&!t.isDir?1:!r.isDir&&t.isDir?-1:r.z!==t.z?r.z-t.z:r.x!==t.x?r.x-t.x:r.y-t.y,Hf=(r,t)=>{const e=r.getUint8(t*17);return{z:e&127,x:va(r,t*17+1),y:va(r,t*17+4),offset:Bf(r,t*17+7),length:r.getUint32(t*17+13,!0),isDir:e>>7===1}},yd=r=>{const t=[],e=new DataView(r);for(let n=0;n<e.byteLength/17;n++)t.push(Hf(e,n));return Jb(t)},Jb=r=>{r.sort(Kb);const t=new ArrayBuffer(17*r.length),e=new Uint8Array(t);for(let n=0;n<r.length;n++){const s=r[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=Os(s.offset,8)&255,e[n*17+9]=Os(s.offset,16)&255,e[n*17+10]=Os(s.offset,24)&255,e[n*17+11]=Os(s.offset,32)&255,e[n*17+12]=Os(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},Qb=(r,t)=>{if(r.byteLength<17)return null;const e=r.byteLength/17,n=Hf(r,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function t1(r){return rn(this,null,function*(){const t=yield r.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let u=0;"minzoom"in l&&(u=+l.minzoom);let d=0;"maxzoom"in l&&(d=+l.maxzoom);let f=0,p=0,_=0,m=-180,x=-85,y=180,g=85;if(l.bounds){const S=l.bounds.split(",");m=+S[0],x=+S[1],y=+S[2],g=+S[3]}if(l.center){const S=l.center.split(",");f=+S[0],p=+S[1],_=+S[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:u,maxZoom:d,minLon:m,minLat:x,maxLon:y,maxLat:g,centerZoom:_,centerLon:f,centerLat:p,etag:t.etag}})}function e1(r,t,e,n,s,o,l){return rn(this,null,function*(){let c=yield e.getArrayBuffer(t,r.rootDirectoryOffset,r.rootDirectoryLength,r);r.specVersion===1&&(c=yd(c));const u=vd(new DataView(c),n,s,o);if(u){let p=(yield t.getBytes(u.offset,u.length,l)).data;const _=new DataView(p);return _.getUint8(0)===31&&_.getUint8(1)===139&&(p=dc(new Uint8Array(p))),{data:p}}const d=Qb(new DataView(c),{z:n,x:s,y:o});if(d){const f=$b(new DataView(c),d.z,d.x,d.y);if(f){let p=yield e.getArrayBuffer(t,f.offset,f.length,r);r.specVersion===1&&(p=yd(p));const _=vd(new DataView(p),n,s,o);if(_){let x=(yield t.getBytes(_.offset,_.length,l)).data;const y=new DataView(x);return y.getUint8(0)===31&&y.getUint8(1)===139&&(x=dc(new Uint8Array(x))),{data:x}}}}})}var Vf={getHeader:t1,getZxy:e1};function Gr(r,t){return(t>>>0)*4294967296+(r>>>0)}function n1(r,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return Gr(r,s);throw new Error("Expected varint not more than 10 bytes")}function ks(r){const t=r.buf;let e=t[r.pos++],n=e&127;return e<128||(e=t[r.pos++],n|=(e&127)<<7,e<128)||(e=t[r.pos++],n|=(e&127)<<14,e<128)||(e=t[r.pos++],n|=(e&127)<<21,e<128)?n:(e=t[r.pos],n|=(e&15)<<28,n1(n,r))}function i1(r,t,e,n){if(n===0){e===1&&(t[0]=r-1-t[0],t[1]=r-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var r1=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function s1(r,t,e){if(r>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>ss(2,r)-1||e>ss(2,r)-1)throw Error("tile x/y outside zoom level bounds");const n=r1[r],s=ss(2,r);let o=0,l=0,c=0;const u=[t,e];let d=s/2;for(;d>0;)o=(u[0]&d)>0?1:0,l=(u[1]&d)>0?1:0,c+=d*d*(3*o^l),i1(d,u,o,l),d=d/2;return n+c}function Gf(r,t){return rn(this,null,function*(){if(t===1||t===0)return r;if(t===2){if(typeof globalThis.DecompressionStream>"u")return dc(new Uint8Array(r));const e=new Response(r).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function o1(r){return r===1?".mvt":r===2?".png":r===3?".jpg":r===4?".webp":r===5?".avif":""}var a1=127;function l1(r,t){let e=0,n=r.length-1;for(;e<=n;){const s=n+e>>1,o=t-r[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return r[s]}return n>=0&&(r[n].runLength===0||t-r[n].tileId<r[n].runLength)?r[n]:null}var c1=class{constructor(r,t=new Headers){this.url=r,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(r){this.customHeaders=r}getBytes(r,t,e,n){return rn(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${r}-${r+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let u=yield fetch(this.url,{signal:o,cache:c,headers:l});if(r===0&&u.status===416){const _=u.headers.get("Content-Range");if(!_||!_.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const m=+_.substr(8);u=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${m-1}`}})}let d=u.headers.get("Etag");if(d?.startsWith("W/")&&(d=null),u.status===416||n&&d&&d!==n)throw this.mustReload=!0,new fc(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(u.status>=300)throw Error(`Bad response code: ${u.status}`);const f=u.headers.get("Content-Length");if(u.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield u.arrayBuffer(),etag:d||void 0,cacheControl:u.headers.get("Cache-Control")||void 0,expires:u.headers.get("Expires")||void 0}})}};function Vn(r,t){const e=r.getUint32(t+4,!0),n=r.getUint32(t+0,!0);return e*ss(2,32)+n}function u1(r,t){const e=new DataView(r),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:Vn(e,8),rootDirectoryLength:Vn(e,16),jsonMetadataOffset:Vn(e,24),jsonMetadataLength:Vn(e,32),leafDirectoryOffset:Vn(e,40),leafDirectoryLength:Vn(e,48),tileDataOffset:Vn(e,56),tileDataLength:Vn(e,64),numAddressedTiles:Vn(e,72),numTileEntries:Vn(e,80),numTileContents:Vn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function Wf(r){const t={buf:new Uint8Array(r),pos:0},e=ks(t),n=[];let s=0;for(let o=0;o<e;o++){const l=ks(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=ks(t);for(let o=0;o<e;o++)n[o].length=ks(t);for(let o=0;o<e;o++){const l=ks(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function h1(r){const t=new DataView(r);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var fc=class extends Error{};function d1(r,t){return rn(this,null,function*(){const e=yield r.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(h1(e.data)<3)return[yield Vf.getHeader(r)];const s=e.data.slice(0,a1),o=u1(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${r.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,u=Wf(yield t(l,o.internalCompression));return[o,[c,u.length,u]]})}function f1(r,t,e,n,s){return rn(this,null,function*(){const o=yield r.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=Wf(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var p1=class{constructor(r=100,t=!0,e=Gf){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=r,this.counter=1,this.decompress=e}getHeader(r){return rn(this,null,function*(){const t=r.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{d1(r,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(r,t,e,n){return rn(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{f1(r,this.decompress,t,e,n).then(d=>{c(d),this.prune()}).catch(d=>{u(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(r,t,e,n){return rn(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{r.getBytes(t,e,void 0,n.etag).then(d=>{c(d.data),this.cache.has(s),this.prune()}).catch(d=>{u(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let r=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<r&&(r=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(r){return rn(this,null,function*(){const t=r.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(r.getKey());const e=new Promise((n,s)=>{this.getHeader(r).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},m1=class{constructor(r,t,e){typeof r=="string"?this.source=new c1(r):this.source=r,e?this.decompress=e:this.decompress=Gf,t?this.cache=t:this.cache=new p1}getHeader(){return rn(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(r,t,e,n){return rn(this,null,function*(){const s=s1(r,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return Vf.getZxy(o,this.source,this.cache,r,t,e,n);if(r<o.minZoom||r>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let u=0;u<=3;u++){const d=yield this.cache.getDirectory(this.source,l,c,o),f=l1(d,s);if(f){if(f.runLength>0){const p=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(p.data,o.tileCompression),cacheControl:p.cacheControl,expires:p.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(r,t,e,n){return rn(this,null,function*(){try{return yield this.getZxyAttempt(r,t,e,n)}catch(s){if(s instanceof fc)return this.cache.invalidate(this.source),yield this.getZxyAttempt(r,t,e,n);throw s}})}getMetadataAttempt(){return rn(this,null,function*(){const r=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(r.jsonMetadataOffset,r.jsonMetadataLength,void 0,r.etag),e=yield this.decompress(t.data,r.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return rn(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(r){if(r instanceof fc)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw r}})}getTileJson(r){return rn(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=o1(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${r}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const Yl=new Map;function g1(r){return Yl.has(r)||Yl.set(r,new m1(r)),Yl.get(r)}function _1(r,t){const e=[];let n=0;const s=new Uint8Array(r);function o(){let d=0,f=0;for(;n<s.length;){const p=s[n++];if(d|=(p&127)<<f,!(p&128))break;f+=7}return d}function l(){if(n>=s.length)return null;const d=o();return{field:d>>3,wire:d&7}}function c(d){if(d===0)o();else if(d===2){const f=o();n+=f}else d===5?n+=4:d===1&&(n+=8)}function u(){const d=o(),f=new Uint8Array(r,n,d);return n+=d,new TextDecoder().decode(f)}for(;n<s.length;){const d=l();if(!d)break;if(d.field===3&&d.wire===2){const f=o(),p=n+f;let _="";const m=[],x=[],y=[];for(;n<p;){const g=l();if(!g)break;if(g.field===1&&g.wire===2)_=u();else if(g.field===3&&g.wire===2)m.push(u());else if(g.field===4&&g.wire===2){const v=o(),S=n+v;for(;n<S;){const w=l();if(!w)break;if(w.wire===2){const P=o(),N=new Uint8Array(r,n,P);n+=P,x.push(new TextDecoder().decode(N))}else w.field===5&&w.wire===0?x.push(o()!==0):w.field===6&&w.wire===0||w.field===7&&w.wire===0?x.push(o()):c(w.wire)}}else if(g.field===5&&g.wire===0)o();else if(g.field===2&&g.wire===2){const v=o(),S=n+v;let w=0;const P=[],N=[];for(;n<S;){const O=l();if(!O)break;if(O.field===3&&O.wire===0)w=o();else if(O.field===2&&O.wire===2){const k=o(),H=n+k;for(;n<H;)P.push(o())}else if(O.field===4&&O.wire===2){const k=o(),H=n+k;for(;n<H;)N.push(o())}else c(O.wire)}y.push({type:w,tags:P,geom:N})}else c(g.wire)}if(n=p,t&&t!==_)continue;for(const g of y){const v={};for(let I=0;I<g.tags.length-1;I+=2)v[m[g.tags[I]]]=x[g.tags[I+1]]??null;const S=[];let w=0,P=0,N=[],O=0,k=0,H=0;for(;H<g.geom.length;){if(k===0){const I=g.geom[H++];O=I&7,k=I>>3}if(O===1||O===2){O===1&&N.length>=2&&(S.push(N),N=[]);const I=xd(g.geom[H++]),R=xd(g.geom[H++]);w+=I,P+=R,N.push({lat:P,lon:w}),k--}else O===7?(N.length>=2&&(S.push(N),N=[]),k--):(H++,k--)}N.length>=2&&S.push(N),e.push({layer:_,type:g.type,properties:v,rings:S})}}else c(d.wire)}return e}function xd(r){return r>>1^-(r&1)}function v1(r,t,e,n,s,o){const l=2**e,c=(r+n/o)/l,u=(t+s/o)/l,d=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI,lon:d}}async function y1(r,t){const s=[{path:`${Vr}/buildings.pmtiles`,z:14,name:"building"},{path:`${Vr}/transportation.pmtiles`,z:14,name:"segment"},{path:`${Vr}/base.pmtiles`,z:13,name:"water"},{path:`${Vr}/base.pmtiles`,z:13,name:"land"},{path:`${Vr}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${Vr}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:u,name:d}of s){try{const f=g1(c),p=(y,g)=>{const v=2**u,S=Math.floor((g+180)/360*v),w=y*Math.PI/180,P=Math.floor((1-Math.log(Math.tan(w)+1/Math.cos(w))/Math.PI)/2*v);return{x:S,y:P}},_=p(r.maxLat,r.minLon),m=p(r.minLat,r.maxLon),x=[];for(let y=_.y;y<=m.y;y++)for(let g=_.x;g<=m.x;g++)x.push((async(v,S)=>{try{const w=await f.getZxy(u,v,S);if(!w)return;const P=_1(w.data,d);for(const N of P){for(const O of N.rings)for(const k of O){const H=v1(v,S,u,k.lon,k.lat,4096);k.lat=H.lat,k.lon=H.lon}o.push(N)}}catch{}})(g,y));await Promise.all(x)}catch{}l++,t(Math.round(l/s.length*100))}return o}function Zf(r="terrain3d.stl"){if(!yt.tg)return;const t=[];new J;const e=new J;if(yt.tg.traverse(m=>{if(!(m instanceof Ne))return;const x=m.geometry,y=x.attributes.position;if(!y)return;const g=x.index,v=m.matrixWorld;function S(w){const P=new J(y.getX(w),y.getY(w),y.getZ(w));return P.applyMatrix4(v),P}if(g)for(let w=0;w<g.count;w+=3)t.push([S(g.getX(w)),S(g.getX(w+1)),S(g.getX(w+2))]);else for(let w=0;w<y.count;w+=3)t.push([S(w),S(w+1),S(w+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let m=0;m<Math.min(l.length,80);m++)s.setUint8(m,l[m]);s.setUint32(80,t.length,!0);let c=84;const u=new J,d=new J;for(const[m,x,y]of t){u.subVectors(x,m),d.subVectors(y,m),e.crossVectors(u,d).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const g of[m,x,y])s.setFloat32(c,g.x,!0),c+=4,s.setFloat32(c,g.y,!0),c+=4,s.setFloat32(c,g.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=r,_.click(),URL.revokeObjectURL(p),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function sa(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var Xf={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(r,t){(function(e){r.exports=e()})(function(){return function e(n,s,o){function l(d,f){if(!s[d]){if(!n[d]){var p=typeof sa=="function"&&sa;if(!f&&p)return p(d,!0);if(c)return c(d,!0);var _=new Error("Cannot find module '"+d+"'");throw _.code="MODULE_NOT_FOUND",_}var m=s[d]={exports:{}};n[d][0].call(m.exports,function(x){var y=n[d][1][x];return l(y||x)},m,m.exports,e,n,s,o)}return s[d].exports}for(var c=typeof sa=="function"&&sa,u=0;u<o.length;u++)l(o[u]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(u){for(var d,f,p,_,m,x,y,g=[],v=0,S=u.length,w=S,P=o.getTypeOf(u)!=="string";v<u.length;)w=S-v,p=P?(d=u[v++],f=v<S?u[v++]:0,v<S?u[v++]:0):(d=u.charCodeAt(v++),f=v<S?u.charCodeAt(v++):0,v<S?u.charCodeAt(v++):0),_=d>>2,m=(3&d)<<4|f>>4,x=1<w?(15&f)<<2|p>>6:64,y=2<w?63&p:64,g.push(c.charAt(_)+c.charAt(m)+c.charAt(x)+c.charAt(y));return g.join("")},s.decode=function(u){var d,f,p,_,m,x,y=0,g=0,v="data:";if(u.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var S,w=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===c.charAt(64)&&w--,u.charAt(u.length-2)===c.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(S=l.uint8array?new Uint8Array(0|w):new Array(0|w);y<u.length;)d=c.indexOf(u.charAt(y++))<<2|(_=c.indexOf(u.charAt(y++)))>>4,f=(15&_)<<4|(m=c.indexOf(u.charAt(y++)))>>2,p=(3&m)<<6|(x=c.indexOf(u.charAt(y++))),S[g++]=d,m!==64&&(S[g++]=f),x!==64&&(S[g++]=p);return S}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),u=e("./stream/DataLengthProbe");function d(f,p,_,m,x){this.compressedSize=f,this.uncompressedSize=p,this.crc32=_,this.compression=m,this.compressedContent=x}d.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),p=this;return f.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(f,p,_){return f.pipe(new c).pipe(new u("uncompressedSize")).pipe(p.compressWorker(_)).pipe(new u("compressedSize")).withStreamInfo("compression",p)},n.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,u=[],d=0;d<256;d++){c=d;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;u[d]=c}return u}();n.exports=function(c,u){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(d,f,p,_){var m=l,x=_+p;d^=-1;for(var y=_;y<x;y++)d=d>>>8^m[255&(d^f[y])];return-1^d}(0|u,c,c.length,0):function(d,f,p,_){var m=l,x=_+p;d^=-1;for(var y=_;y<x;y++)d=d>>>8^m[255&(d^f.charCodeAt(y))];return-1^d}(0|u,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),u=e("./stream/GenericWorker"),d=o?"uint8array":"array";function f(p,_){u.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=_,this.meta={}}s.magic="\b\0",c.inherits(f,u),f.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(d,p.data),!1)},f.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(_){p.push({data:_,meta:p.meta})}},s.compressWorker=function(p){return new f("Deflate",p)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(m,x){var y,g="";for(y=0;y<x;y++)g+=String.fromCharCode(255&m),m>>>=8;return g}function l(m,x,y,g,v,S){var w,P,N=m.file,O=m.compression,k=S!==d.utf8encode,H=c.transformTo("string",S(N.name)),I=c.transformTo("string",d.utf8encode(N.name)),R=N.comment,W=c.transformTo("string",S(R)),U=c.transformTo("string",d.utf8encode(R)),F=I.length!==N.name.length,C=U.length!==R.length,Z="",nt="",rt="",j=N.dir,st=N.date,at={crc32:0,compressedSize:0,uncompressedSize:0};x&&!y||(at.crc32=m.crc32,at.compressedSize=m.compressedSize,at.uncompressedSize=m.uncompressedSize);var q=0;x&&(q|=8),k||!F&&!C||(q|=2048);var tt=0,Ct=0;j&&(tt|=16),v==="UNIX"?(Ct=798,tt|=function(it,wt){var St=it;return it||(St=wt?16893:33204),(65535&St)<<16}(N.unixPermissions,j)):(Ct=20,tt|=function(it){return 63&(it||0)}(N.dosPermissions)),w=st.getUTCHours(),w<<=6,w|=st.getUTCMinutes(),w<<=5,w|=st.getUTCSeconds()/2,P=st.getUTCFullYear()-1980,P<<=4,P|=st.getUTCMonth()+1,P<<=5,P|=st.getUTCDate(),F&&(nt=o(1,1)+o(f(H),4)+I,Z+="up"+o(nt.length,2)+nt),C&&(rt=o(1,1)+o(f(W),4)+U,Z+="uc"+o(rt.length,2)+rt);var Q="";return Q+=`
\0`,Q+=o(q,2),Q+=O.magic,Q+=o(w,2),Q+=o(P,2),Q+=o(at.crc32,4),Q+=o(at.compressedSize,4),Q+=o(at.uncompressedSize,4),Q+=o(H.length,2),Q+=o(Z.length,2),{fileRecord:p.LOCAL_FILE_HEADER+Q+H+Z,dirRecord:p.CENTRAL_FILE_HEADER+o(Ct,2)+Q+o(W.length,2)+"\0\0\0\0"+o(tt,4)+o(g,4)+H+Z+W}}var c=e("../utils"),u=e("../stream/GenericWorker"),d=e("../utf8"),f=e("../crc32"),p=e("../signature");function _(m,x,y,g){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=x,this.zipPlatform=y,this.encodeFileName=g,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(_,u),_.prototype.push=function(m){var x=m.meta.percent||0,y=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,u.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:y?(x+100*(y-g-1))/y:100}}))},_.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var x=this.streamFiles&&!m.file.dir;if(x){var y=l(m,x,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},_.prototype.closedSource=function(m){this.accumulate=!1;var x=this.streamFiles&&!m.file.dir,y=l(m,x,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),x)this.push({data:function(g){return p.DATA_DESCRIPTOR+o(g.crc32,4)+o(g.compressedSize,4)+o(g.uncompressedSize,4)}(m),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},_.prototype.flush=function(){for(var m=this.bytesWritten,x=0;x<this.dirRecords.length;x++)this.push({data:this.dirRecords[x],meta:{percent:100}});var y=this.bytesWritten-m,g=function(v,S,w,P,N){var O=c.transformTo("string",N(P));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(v,2)+o(v,2)+o(S,4)+o(w,4)+o(O.length,2)+O}(this.dirRecords.length,y,m,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},_.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},_.prototype.registerPrevious=function(m){this._sources.push(m);var x=this;return m.on("data",function(y){x.processChunk(y)}),m.on("end",function(){x.closedSource(x.previous.streamInfo),x._sources.length?x.prepareNextSource():x.end()}),m.on("error",function(y){x.error(y)}),this},_.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},_.prototype.error=function(m){var x=this._sources;if(!u.prototype.error.call(this,m))return!1;for(var y=0;y<x.length;y++)try{x[y].error(m)}catch{}return!0},_.prototype.lock=function(){u.prototype.lock.call(this);for(var m=this._sources,x=0;x<m.length;x++)m[x].lock()},n.exports=_},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,u,d){var f=new l(u.streamFiles,d,u.platform,u.encodeFileName),p=0;try{c.forEach(function(_,m){p++;var x=function(S,w){var P=S||w,N=o[P];if(!N)throw new Error(P+" is not a valid compression method !");return N}(m.options.compression,u.compression),y=m.options.compressionOptions||u.compressionOptions||{},g=m.dir,v=m.date;m._compressWorker(x,y).withStreamInfo("file",{name:_,dir:g,date:v,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(f)}),f.entriesCount=p}catch(_){f.error(_)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),u=e("./zipEntries"),d=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function p(_){return new l.Promise(function(m,x){var y=_.decompressed.getContentWorker().pipe(new d);y.on("error",function(g){x(g)}).on("end",function(){y.streamInfo.crc32!==_.decompressed.crc32?x(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}n.exports=function(_,m){var x=this;return m=o.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(_)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",_,!0,m.optimizedBinaryString,m.base64).then(function(y){var g=new u(m);return g.load(y),g}).then(function(y){var g=[l.Promise.resolve(y)],v=y.files;if(m.checkCRC32)for(var S=0;S<v.length;S++)g.push(p(v[S]));return l.Promise.all(g)}).then(function(y){for(var g=y.shift(),v=g.files,S=0;S<v.length;S++){var w=v[S],P=w.fileNameStr,N=o.resolve(w.fileNameStr);x.file(N,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:m.createFolders}),w.dir||(x.file(N).unsafeOriginalName=P)}return g.zipComment.length&&(x.comment=g.zipComment),x})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(u,d){l.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(d)}o.inherits(c,l),c.prototype._bindStream=function(u){var d=this;(this._stream=u).pause(),u.on("data",function(f){d.push({data:f,meta:{percent:0}})}).on("error",function(f){d.isPaused?this.generatedError=f:d.error(f)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,u,d){o.call(this,u),this._helper=c;var f=this;c.on("data",function(p,_){f.push(p)||f._helper.pause(),d&&d(_)}).on("error",function(p){f.emit("error",p)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(N,O,k){var H,I=c.getTypeOf(O),R=c.extend(k||{},f);R.date=R.date||new Date,R.compression!==null&&(R.compression=R.compression.toUpperCase()),typeof R.unixPermissions=="string"&&(R.unixPermissions=parseInt(R.unixPermissions,8)),R.unixPermissions&&16384&R.unixPermissions&&(R.dir=!0),R.dosPermissions&&16&R.dosPermissions&&(R.dir=!0),R.dir&&(N=v(N)),R.createFolders&&(H=g(N))&&S.call(this,H,!0);var W=I==="string"&&R.binary===!1&&R.base64===!1;k&&k.binary!==void 0||(R.binary=!W),(O instanceof p&&O.uncompressedSize===0||R.dir||!O||O.length===0)&&(R.base64=!1,R.binary=!0,O="",R.compression="STORE",I="string");var U=null;U=O instanceof p||O instanceof u?O:x.isNode&&x.isStream(O)?new y(N,O):c.prepareContent(N,O,R.binary,R.optimizedBinaryString,R.base64);var F=new _(N,U,R);this.files[N]=F}var l=e("./utf8"),c=e("./utils"),u=e("./stream/GenericWorker"),d=e("./stream/StreamHelper"),f=e("./defaults"),p=e("./compressedObject"),_=e("./zipObject"),m=e("./generate"),x=e("./nodejsUtils"),y=e("./nodejs/NodejsStreamInputAdapter"),g=function(N){N.slice(-1)==="/"&&(N=N.substring(0,N.length-1));var O=N.lastIndexOf("/");return 0<O?N.substring(0,O):""},v=function(N){return N.slice(-1)!=="/"&&(N+="/"),N},S=function(N,O){return O=O!==void 0?O:f.createFolders,N=v(N),this.files[N]||o.call(this,N,null,{dir:!0,createFolders:O}),this.files[N]};function w(N){return Object.prototype.toString.call(N)==="[object RegExp]"}var P={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(N){var O,k,H;for(O in this.files)H=this.files[O],(k=O.slice(this.root.length,O.length))&&O.slice(0,this.root.length)===this.root&&N(k,H)},filter:function(N){var O=[];return this.forEach(function(k,H){N(k,H)&&O.push(H)}),O},file:function(N,O,k){if(arguments.length!==1)return N=this.root+N,o.call(this,N,O,k),this;if(w(N)){var H=N;return this.filter(function(R,W){return!W.dir&&H.test(R)})}var I=this.files[this.root+N];return I&&!I.dir?I:null},folder:function(N){if(!N)return this;if(w(N))return this.filter(function(I,R){return R.dir&&N.test(I)});var O=this.root+N,k=S.call(this,O),H=this.clone();return H.root=k.name,H},remove:function(N){N=this.root+N;var O=this.files[N];if(O||(N.slice(-1)!=="/"&&(N+="/"),O=this.files[N]),O&&!O.dir)delete this.files[N];else for(var k=this.filter(function(I,R){return R.name.slice(0,N.length)===N}),H=0;H<k.length;H++)delete this.files[k[H].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(N){var O,k={};try{if((k=c.extend(N||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=k.type.toLowerCase(),k.compression=k.compression.toUpperCase(),k.type==="binarystring"&&(k.type="string"),!k.type)throw new Error("No output type specified.");c.checkSupport(k.type),k.platform!=="darwin"&&k.platform!=="freebsd"&&k.platform!=="linux"&&k.platform!=="sunos"||(k.platform="UNIX"),k.platform==="win32"&&(k.platform="DOS");var H=k.comment||this.comment||"";O=m.generateWorker(this,k,H)}catch(I){(O=new u("error")).error(I)}return new d(O,k.type||"string",k.mimeType)},generateAsync:function(N,O){return this.generateInternalStream(N).accumulate(O)},generateNodeStream:function(N,O){return(N=N||{}).type||(N.type="nodebuffer"),this.generateInternalStream(N).toNodejsStream(O)}};n.exports=P},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var u=0;u<this.data.length;u++)c[u]=255&c[u]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var u=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.length-4;0<=_;--_)if(this.data[_]===u&&this.data[_+1]===d&&this.data[_+2]===f&&this.data[_+3]===p)return _-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var u=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.readData(4);return u===_[0]&&d===_[1]&&f===_[2]&&p===_[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var u,d=0;for(this.checkOffset(c),u=this.index+c-1;u>=this.index;u--)d=(d<<8)+this.byteAt(u);return this.index+=c,d},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),u=e("./StringReader"),d=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(p){var _=o.getTypeOf(p);return o.checkSupport(_),_!=="string"||l.uint8array?_==="nodebuffer"?new d(p):l.uint8array?new f(o.transformTo("uint8array",p)):new c(o.transformTo("array",p)):new u(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(u){o.call(this,"ConvertWorker to "+u),this.destType=u}l.inherits(c,o),c.prototype.processChunk=function(u){this.push({data:l.transformTo(this.destType,u.data),meta:u.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(u){this.streamInfo.crc32=l(u.data,this.streamInfo.crc32||0),this.push(u)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}o.inherits(c,l),c.prototype.processChunk=function(u){if(u){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+u.data.length}l.prototype.processChunk.call(this,u)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(f){d.dataIsReady=!0,d.data=f,d.max=f&&f.length||0,d.type=o.getTypeOf(f),d.isPaused||d._tickAndRepeat()},function(f){d.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,d);break;case"uint8array":u=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":u=this.data.slice(this.index,d)}return this.index=d,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var u=0;u<this._listeners[l].length;u++)this._listeners[l][u].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(u){c.processChunk(u)}),l.on("end",function(){c.end()}),l.on("error",function(u){c.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),u=e("../base64"),d=e("../support"),f=e("../external"),p=null;if(d.nodestream)try{p=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function _(x,y){return new f.Promise(function(g,v){var S=[],w=x._internalType,P=x._outputType,N=x._mimeType;x.on("data",function(O,k){S.push(O),y&&y(k)}).on("error",function(O){S=[],v(O)}).on("end",function(){try{var O=function(k,H,I){switch(k){case"blob":return o.newBlob(o.transformTo("arraybuffer",H),I);case"base64":return u.encode(H);default:return o.transformTo(k,H)}}(P,function(k,H){var I,R=0,W=null,U=0;for(I=0;I<H.length;I++)U+=H[I].length;switch(k){case"string":return H.join("");case"array":return Array.prototype.concat.apply([],H);case"uint8array":for(W=new Uint8Array(U),I=0;I<H.length;I++)W.set(H[I],R),R+=H[I].length;return W;case"nodebuffer":return Buffer.concat(H);default:throw new Error("concat : unsupported type '"+k+"'")}}(w,S),N);g(O)}catch(k){v(k)}S=[]}).resume()})}function m(x,y,g){var v=y;switch(y){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=y,this._mimeType=g,o.checkSupport(v),this._worker=x.pipe(new l(v)),x.lock()}catch(S){this._worker=new c("error"),this._worker.error(S)}}m.prototype={accumulate:function(x){return _(this,x)},on:function(x,y){var g=this;return x==="data"?this._worker.on(x,function(v){y.call(g,v.data,v.meta)}):this._worker.on(x,function(){o.delay(y,arguments,g)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(x){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},x)}},n.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),u=e("./stream/GenericWorker"),d=new Array(256),f=0;f<256;f++)d[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;d[254]=d[254]=1;function p(){u.call(this,"utf-8 decode"),this.leftOver=null}function _(){u.call(this,"utf-8 encode")}s.utf8encode=function(m){return l.nodebuffer?c.newBufferFrom(m,"utf-8"):function(x){var y,g,v,S,w,P=x.length,N=0;for(S=0;S<P;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),N+=g<128?1:g<2048?2:g<65536?3:4;for(y=l.uint8array?new Uint8Array(N):new Array(N),S=w=0;w<N;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),g<128?y[w++]=g:(g<2048?y[w++]=192|g>>>6:(g<65536?y[w++]=224|g>>>12:(y[w++]=240|g>>>18,y[w++]=128|g>>>12&63),y[w++]=128|g>>>6&63),y[w++]=128|63&g);return y}(m)},s.utf8decode=function(m){return l.nodebuffer?o.transformTo("nodebuffer",m).toString("utf-8"):function(x){var y,g,v,S,w=x.length,P=new Array(2*w);for(y=g=0;y<w;)if((v=x[y++])<128)P[g++]=v;else if(4<(S=d[v]))P[g++]=65533,y+=S-1;else{for(v&=S===2?31:S===3?15:7;1<S&&y<w;)v=v<<6|63&x[y++],S--;1<S?P[g++]=65533:v<65536?P[g++]=v:(v-=65536,P[g++]=55296|v>>10&1023,P[g++]=56320|1023&v)}return P.length!==g&&(P.subarray?P=P.subarray(0,g):P.length=g),o.applyFromCharCode(P)}(m=o.transformTo(l.uint8array?"uint8array":"array",m))},o.inherits(p,u),p.prototype.processChunk=function(m){var x=o.transformTo(l.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var y=x;(x=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),x.set(y,this.leftOver.length)}else x=this.leftOver.concat(x);this.leftOver=null}var g=function(S,w){var P;for((w=w||S.length)>S.length&&(w=S.length),P=w-1;0<=P&&(192&S[P])==128;)P--;return P<0||P===0?w:P+d[S[P]]>w?P:w}(x),v=x;g!==x.length&&(l.uint8array?(v=x.subarray(0,g),this.leftOver=x.subarray(g,x.length)):(v=x.slice(0,g),this.leftOver=x.slice(g,x.length))),this.push({data:s.utf8decode(v),meta:m.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=p,o.inherits(_,u),_.prototype.processChunk=function(m){this.push({data:s.utf8encode(m.data),meta:m.meta})},s.Utf8EncodeWorker=_},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),u=e("./external");function d(y){return y}function f(y,g){for(var v=0;v<y.length;++v)g[v]=255&y.charCodeAt(v);return g}e("setimmediate"),s.newBlob=function(y,g){s.checkSupport("blob");try{return new Blob([y],{type:g})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(y),v.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(y,g,v){var S=[],w=0,P=y.length;if(P<=v)return String.fromCharCode.apply(null,y);for(;w<P;)g==="array"||g==="nodebuffer"?S.push(String.fromCharCode.apply(null,y.slice(w,Math.min(w+v,P)))):S.push(String.fromCharCode.apply(null,y.subarray(w,Math.min(w+v,P)))),w+=v;return S.join("")},stringifyByChar:function(y){for(var g="",v=0;v<y.length;v++)g+=String.fromCharCode(y[v]);return g},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function _(y){var g=65536,v=s.getTypeOf(y),S=!0;if(v==="uint8array"?S=p.applyCanBeUsed.uint8array:v==="nodebuffer"&&(S=p.applyCanBeUsed.nodebuffer),S)for(;1<g;)try{return p.stringifyByChunk(y,v,g)}catch{g=Math.floor(g/2)}return p.stringifyByChar(y)}function m(y,g){for(var v=0;v<y.length;v++)g[v]=y[v];return g}s.applyFromCharCode=_;var x={};x.string={string:d,array:function(y){return f(y,new Array(y.length))},arraybuffer:function(y){return x.string.uint8array(y).buffer},uint8array:function(y){return f(y,new Uint8Array(y.length))},nodebuffer:function(y){return f(y,c.allocBuffer(y.length))}},x.array={string:_,array:d,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},x.arraybuffer={string:function(y){return _(new Uint8Array(y))},array:function(y){return m(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:d,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},x.uint8array={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:d,nodebuffer:function(y){return c.newBufferFrom(y)}},x.nodebuffer={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return x.nodebuffer.uint8array(y).buffer},uint8array:function(y){return m(y,new Uint8Array(y.length))},nodebuffer:d},s.transformTo=function(y,g){if(g=g||"",!y)return g;s.checkSupport(y);var v=s.getTypeOf(g);return x[v][y](g)},s.resolve=function(y){for(var g=y.split("/"),v=[],S=0;S<g.length;S++){var w=g[S];w==="."||w===""&&S!==0&&S!==g.length-1||(w===".."?v.pop():v.push(w))}return v.join("/")},s.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(y)?"nodebuffer":o.uint8array&&y instanceof Uint8Array?"uint8array":o.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(y){if(!o[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(y){var g,v,S="";for(v=0;v<(y||"").length;v++)S+="\\x"+((g=y.charCodeAt(v))<16?"0":"")+g.toString(16).toUpperCase();return S},s.delay=function(y,g,v){setImmediate(function(){y.apply(v||null,g||[])})},s.inherits=function(y,g){function v(){}v.prototype=g.prototype,y.prototype=new v},s.extend=function(){var y,g,v={};for(y=0;y<arguments.length;y++)for(g in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],g)&&v[g]===void 0&&(v[g]=arguments[y][g]);return v},s.prepareContent=function(y,g,v,S,w){return u.Promise.resolve(g).then(function(P){return o.blob&&(P instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(P))!==-1)&&typeof FileReader<"u"?new u.Promise(function(N,O){var k=new FileReader;k.onload=function(H){N(H.target.result)},k.onerror=function(H){O(H.target.error)},k.readAsArrayBuffer(P)}):P}).then(function(P){var N=s.getTypeOf(P);return N?(N==="arraybuffer"?P=s.transformTo("uint8array",P):N==="string"&&(w?P=l.decode(P):v&&S!==!0&&(P=function(O){return f(O,o.uint8array?new Uint8Array(O.length):new Array(O.length))}(P))),P):u.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),u=e("./zipEntry"),d=e("./support");function f(p){this.files=[],this.loadOptions=p}f.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var _=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(_)+", expected "+l.pretty(p)+")")}},isSignature:function(p,_){var m=this.reader.index;this.reader.setIndex(p);var x=this.reader.readString(4)===_;return this.reader.setIndex(m),x},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),_=d.uint8array?"uint8array":"array",m=l.transformTo(_,p);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,_,m,x=this.zip64EndOfCentralSize-44;0<x;)p=this.reader.readInt(2),_=this.reader.readInt(4),m=this.reader.readData(_),this.zip64ExtensibleData[p]={id:p,length:_,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,_;for(p=0;p<this.files.length;p++)_=this.files[p],this.reader.setIndex(_.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),_.readLocalPart(this.reader),_.handleUTF8(),_.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(p=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var _=p;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var x=_-m;if(0<x)this.isSignature(_,c.CENTRAL_FILE_HEADER)||(this.reader.zero=x);else if(x<0)throw new Error("Corrupted zip: missing "+Math.abs(x)+" bytes.")},prepareReader:function(p){this.reader=o(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),u=e("./crc32"),d=e("./utf8"),f=e("./compressions"),p=e("./support");function _(m,x){this.options=m,this.loadOptions=x}_.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var x,y;if(m.skip(22),this.fileNameLength=m.readInt(2),y=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((x=function(g){for(var v in f)if(Object.prototype.hasOwnProperty.call(f,v)&&f[v].magic===g)return f[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,x,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var x=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(x),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var x,y,g,v=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<v;)x=m.readInt(2),y=m.readInt(2),g=m.readData(y),this.extraFields[x]={id:x,length:y,value:g};m.setIndex(v)},handleUTF8:function(){var m=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var x=this.findExtraFieldUnicodePath();if(x!==null)this.fileNameStr=x;else{var y=l.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var v=l.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileName)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileComment)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null}},n.exports=_},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(x,y,g){this.name=x,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=y,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),u=e("./utf8"),d=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(x){var y=null,g="string";try{if(!x)throw new Error("No output type specified.");var v=(g=x.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),y=this._decompressWorker();var S=!this._dataBinary;S&&!v&&(y=y.pipe(new u.Utf8EncodeWorker)),!S&&v&&(y=y.pipe(new u.Utf8DecodeWorker))}catch(w){(y=new f("error")).error(w)}return new l(y,g,"")},async:function(x,y){return this.internalStream(x).accumulate(y)},nodeStream:function(x,y){return this.internalStream(x||"nodebuffer").toNodejsStream(y)},_compressWorker:function(x,y){if(this._data instanceof d&&this._data.compression.magic===x.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new u.Utf8EncodeWorker)),d.createWorkerFrom(g,x,y)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],_=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<p.length;m++)o.prototype[p[m]]=_;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,u=o.MutationObserver||o.WebKitMutationObserver;if(u){var d=0,f=new u(x),p=o.document.createTextNode("");f.observe(p,{characterData:!0}),l=function(){p.data=d=++d%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var y=o.document.createElement("script");y.onreadystatechange=function(){x(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},o.document.documentElement.appendChild(y)}:function(){setTimeout(x,0)};else{var _=new o.MessageChannel;_.port1.onmessage=x,l=function(){_.port2.postMessage(0)}}var m=[];function x(){var y,g;c=!0;for(var v=m.length;v;){for(g=m,m=[],y=-1;++y<v;)g[y]();v=m.length}c=!1}n.exports=function(y){m.push(y)!==1||c||l()}}).call(this,typeof zs<"u"?zs:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},u=["REJECTED"],d=["FULFILLED"],f=["PENDING"];function p(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,v!==l&&y(this,v)}function _(v,S,w){this.promise=v,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function m(v,S,w){o(function(){var P;try{P=S(w)}catch(N){return c.reject(v,N)}P===v?c.reject(v,new TypeError("Cannot resolve promise with itself")):c.resolve(v,P)})}function x(v){var S=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof S=="function")return function(){S.apply(v,arguments)}}function y(v,S){var w=!1;function P(k){w||(w=!0,c.reject(v,k))}function N(k){w||(w=!0,c.resolve(v,k))}var O=g(function(){S(N,P)});O.status==="error"&&P(O.value)}function g(v,S){var w={};try{w.value=v(S),w.status="success"}catch(P){w.status="error",w.value=P}return w}(n.exports=p).prototype.finally=function(v){if(typeof v!="function")return this;var S=this.constructor;return this.then(function(w){return S.resolve(v()).then(function(){return w})},function(w){return S.resolve(v()).then(function(){throw w})})},p.prototype.catch=function(v){return this.then(null,v)},p.prototype.then=function(v,S){if(typeof v!="function"&&this.state===d||typeof S!="function"&&this.state===u)return this;var w=new this.constructor(l);return this.state!==f?m(w,this.state===d?v:S,this.outcome):this.queue.push(new _(w,v,S)),w},_.prototype.callFulfilled=function(v){c.resolve(this.promise,v)},_.prototype.otherCallFulfilled=function(v){m(this.promise,this.onFulfilled,v)},_.prototype.callRejected=function(v){c.reject(this.promise,v)},_.prototype.otherCallRejected=function(v){m(this.promise,this.onRejected,v)},c.resolve=function(v,S){var w=g(x,S);if(w.status==="error")return c.reject(v,w.value);var P=w.value;if(P)y(v,P);else{v.state=d,v.outcome=S;for(var N=-1,O=v.queue.length;++N<O;)v.queue[N].callFulfilled(S)}return v},c.reject=function(v,S){v.state=u,v.outcome=S;for(var w=-1,P=v.queue.length;++w<P;)v.queue[w].callRejected(S);return v},p.resolve=function(v){return v instanceof this?v:c.resolve(new this(l),v)},p.reject=function(v){var S=new this(l);return c.reject(S,v)},p.all=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,P=!1;if(!w)return this.resolve([]);for(var N=new Array(w),O=0,k=-1,H=new this(l);++k<w;)I(v[k],k);return H;function I(R,W){S.resolve(R).then(function(U){N[W]=U,++O!==w||P||(P=!0,c.resolve(H,N))},function(U){P||(P=!0,c.reject(H,U))})}},p.race=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,P=!1;if(!w)return this.resolve([]);for(var N=-1,O=new this(l);++N<w;)k=v[N],S.resolve(k).then(function(H){P||(P=!0,c.resolve(O,H))},function(H){P||(P=!0,c.reject(O,H))});var k;return O}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/messages"),d=e("./zlib/zstream"),f=Object.prototype.toString,p=0,_=-1,m=0,x=8;function y(v){if(!(this instanceof y))return new y(v);this.options=l.assign({level:_,method:x,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},v||{});var S=this.options;S.raw&&0<S.windowBits?S.windowBits=-S.windowBits:S.gzip&&0<S.windowBits&&S.windowBits<16&&(S.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var w=o.deflateInit2(this.strm,S.level,S.method,S.windowBits,S.memLevel,S.strategy);if(w!==p)throw new Error(u[w]);if(S.header&&o.deflateSetHeader(this.strm,S.header),S.dictionary){var P;if(P=typeof S.dictionary=="string"?c.string2buf(S.dictionary):f.call(S.dictionary)==="[object ArrayBuffer]"?new Uint8Array(S.dictionary):S.dictionary,(w=o.deflateSetDictionary(this.strm,P))!==p)throw new Error(u[w]);this._dict_set=!0}}function g(v,S){var w=new y(S);if(w.push(v,!0),w.err)throw w.msg||u[w.err];return w.result}y.prototype.push=function(v,S){var w,P,N=this.strm,O=this.options.chunkSize;if(this.ended)return!1;P=S===~~S?S:S===!0?4:0,typeof v=="string"?N.input=c.string2buf(v):f.call(v)==="[object ArrayBuffer]"?N.input=new Uint8Array(v):N.input=v,N.next_in=0,N.avail_in=N.input.length;do{if(N.avail_out===0&&(N.output=new l.Buf8(O),N.next_out=0,N.avail_out=O),(w=o.deflate(N,P))!==1&&w!==p)return this.onEnd(w),!(this.ended=!0);N.avail_out!==0&&(N.avail_in!==0||P!==4&&P!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(N.output,N.next_out))):this.onData(l.shrinkBuf(N.output,N.next_out)))}while((0<N.avail_in||N.avail_out===0)&&w!==1);return P===4?(w=o.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===p):P!==2||(this.onEnd(p),!(N.avail_out=0))},y.prototype.onData=function(v){this.chunks.push(v)},y.prototype.onEnd=function(v){v===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=y,s.deflate=g,s.deflateRaw=function(v,S){return(S=S||{}).raw=!0,g(v,S)},s.gzip=function(v,S){return(S=S||{}).gzip=!0,g(v,S)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/constants"),d=e("./zlib/messages"),f=e("./zlib/zstream"),p=e("./zlib/gzheader"),_=Object.prototype.toString;function m(y){if(!(this instanceof m))return new m(y);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},y||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||y&&y.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var v=o.inflateInit2(this.strm,g.windowBits);if(v!==u.Z_OK)throw new Error(d[v]);this.header=new p,o.inflateGetHeader(this.strm,this.header)}function x(y,g){var v=new m(g);if(v.push(y,!0),v.err)throw v.msg||d[v.err];return v.result}m.prototype.push=function(y,g){var v,S,w,P,N,O,k=this.strm,H=this.options.chunkSize,I=this.options.dictionary,R=!1;if(this.ended)return!1;S=g===~~g?g:g===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof y=="string"?k.input=c.binstring2buf(y):_.call(y)==="[object ArrayBuffer]"?k.input=new Uint8Array(y):k.input=y,k.next_in=0,k.avail_in=k.input.length;do{if(k.avail_out===0&&(k.output=new l.Buf8(H),k.next_out=0,k.avail_out=H),(v=o.inflate(k,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&I&&(O=typeof I=="string"?c.string2buf(I):_.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,v=o.inflateSetDictionary(this.strm,O)),v===u.Z_BUF_ERROR&&R===!0&&(v=u.Z_OK,R=!1),v!==u.Z_STREAM_END&&v!==u.Z_OK)return this.onEnd(v),!(this.ended=!0);k.next_out&&(k.avail_out!==0&&v!==u.Z_STREAM_END&&(k.avail_in!==0||S!==u.Z_FINISH&&S!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=c.utf8border(k.output,k.next_out),P=k.next_out-w,N=c.buf2string(k.output,w),k.next_out=P,k.avail_out=H-P,P&&l.arraySet(k.output,k.output,w,P,0),this.onData(N)):this.onData(l.shrinkBuf(k.output,k.next_out)))),k.avail_in===0&&k.avail_out===0&&(R=!0)}while((0<k.avail_in||k.avail_out===0)&&v!==u.Z_STREAM_END);return v===u.Z_STREAM_END&&(S=u.Z_FINISH),S===u.Z_FINISH?(v=o.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===u.Z_OK):S!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(k.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Inflate=m,s.inflate=x,s.inflateRaw=function(y,g){return(g=g||{}).raw=!0,x(y,g)},s.ungzip=x},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(u){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var f=d.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var p in f)f.hasOwnProperty(p)&&(u[p]=f[p])}}return u},s.shrinkBuf=function(u,d){return u.length===d?u:u.subarray?u.subarray(0,d):(u.length=d,u)};var l={arraySet:function(u,d,f,p,_){if(d.subarray&&u.subarray)u.set(d.subarray(f,f+p),_);else for(var m=0;m<p;m++)u[_+m]=d[f+m]},flattenChunks:function(u){var d,f,p,_,m,x;for(d=p=0,f=u.length;d<f;d++)p+=u[d].length;for(x=new Uint8Array(p),d=_=0,f=u.length;d<f;d++)m=u[d],x.set(m,_),_+=m.length;return x}},c={arraySet:function(u,d,f,p,_){for(var m=0;m<p;m++)u[_+m]=d[f+m]},flattenChunks:function(u){return[].concat.apply([],u)}};s.setTyped=function(u){u?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var u=new o.Buf8(256),d=0;d<256;d++)u[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function f(p,_){if(_<65537&&(p.subarray&&c||!p.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(p,_));for(var m="",x=0;x<_;x++)m+=String.fromCharCode(p[x]);return m}u[254]=u[254]=1,s.string2buf=function(p){var _,m,x,y,g,v=p.length,S=0;for(y=0;y<v;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),S+=m<128?1:m<2048?2:m<65536?3:4;for(_=new o.Buf8(S),y=g=0;g<S;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),m<128?_[g++]=m:(m<2048?_[g++]=192|m>>>6:(m<65536?_[g++]=224|m>>>12:(_[g++]=240|m>>>18,_[g++]=128|m>>>12&63),_[g++]=128|m>>>6&63),_[g++]=128|63&m);return _},s.buf2binstring=function(p){return f(p,p.length)},s.binstring2buf=function(p){for(var _=new o.Buf8(p.length),m=0,x=_.length;m<x;m++)_[m]=p.charCodeAt(m);return _},s.buf2string=function(p,_){var m,x,y,g,v=_||p.length,S=new Array(2*v);for(m=x=0;m<v;)if((y=p[m++])<128)S[x++]=y;else if(4<(g=u[y]))S[x++]=65533,m+=g-1;else{for(y&=g===2?31:g===3?15:7;1<g&&m<v;)y=y<<6|63&p[m++],g--;1<g?S[x++]=65533:y<65536?S[x++]=y:(y-=65536,S[x++]=55296|y>>10&1023,S[x++]=56320|1023&y)}return f(S,x)},s.utf8border=function(p,_){var m;for((_=_||p.length)>p.length&&(_=p.length),m=_-1;0<=m&&(192&p[m])==128;)m--;return m<0||m===0?_:m+u[p[m]]>_?m:_}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,u){for(var d=65535&o|0,f=o>>>16&65535|0,p=0;c!==0;){for(c-=p=2e3<c?2e3:c;f=f+(d=d+l[u++]|0)|0,--p;);d%=65521,f%=65521}return d|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],u=0;u<256;u++){l=u;for(var d=0;d<8;d++)l=1&l?3988292384^l>>>1:l>>>1;c[u]=l}return c}();n.exports=function(l,c,u,d){var f=o,p=d+u;l^=-1;for(var _=d;_<p;_++)l=l>>>8^f[255&(l^c[_])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),u=e("./adler32"),d=e("./crc32"),f=e("./messages"),p=0,_=4,m=0,x=-2,y=-1,g=4,v=2,S=8,w=9,P=286,N=30,O=19,k=2*P+1,H=15,I=3,R=258,W=R+I+1,U=42,F=113,C=1,Z=2,nt=3,rt=4;function j(E,et){return E.msg=f[et],et}function st(E){return(E<<1)-(4<E?9:0)}function at(E){for(var et=E.length;0<=--et;)E[et]=0}function q(E){var et=E.state,$=et.pending;$>E.avail_out&&($=E.avail_out),$!==0&&(l.arraySet(E.output,et.pending_buf,et.pending_out,$,E.next_out),E.next_out+=$,et.pending_out+=$,E.total_out+=$,E.avail_out-=$,et.pending-=$,et.pending===0&&(et.pending_out=0))}function tt(E,et){c._tr_flush_block(E,0<=E.block_start?E.block_start:-1,E.strstart-E.block_start,et),E.block_start=E.strstart,q(E.strm)}function Ct(E,et){E.pending_buf[E.pending++]=et}function Q(E,et){E.pending_buf[E.pending++]=et>>>8&255,E.pending_buf[E.pending++]=255&et}function it(E,et){var $,A,M=E.max_chain_length,B=E.strstart,X=E.prev_length,K=E.nice_match,G=E.strstart>E.w_size-W?E.strstart-(E.w_size-W):0,ft=E.window,lt=E.w_mask,pt=E.prev,Tt=E.strstart+R,Et=ft[B+X-1],At=ft[B+X];E.prev_length>=E.good_match&&(M>>=2),K>E.lookahead&&(K=E.lookahead);do if(ft[($=et)+X]===At&&ft[$+X-1]===Et&&ft[$]===ft[B]&&ft[++$]===ft[B+1]){B+=2,$++;do;while(ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&B<Tt);if(A=R-(Tt-B),B=Tt-R,X<A){if(E.match_start=et,K<=(X=A))break;Et=ft[B+X-1],At=ft[B+X]}}while((et=pt[et&lt])>G&&--M!=0);return X<=E.lookahead?X:E.lookahead}function wt(E){var et,$,A,M,B,X,K,G,ft,lt,pt=E.w_size;do{if(M=E.window_size-E.lookahead-E.strstart,E.strstart>=pt+(pt-W)){for(l.arraySet(E.window,E.window,pt,pt,0),E.match_start-=pt,E.strstart-=pt,E.block_start-=pt,et=$=E.hash_size;A=E.head[--et],E.head[et]=pt<=A?A-pt:0,--$;);for(et=$=pt;A=E.prev[--et],E.prev[et]=pt<=A?A-pt:0,--$;);M+=pt}if(E.strm.avail_in===0)break;if(X=E.strm,K=E.window,G=E.strstart+E.lookahead,ft=M,lt=void 0,lt=X.avail_in,ft<lt&&(lt=ft),$=lt===0?0:(X.avail_in-=lt,l.arraySet(K,X.input,X.next_in,lt,G),X.state.wrap===1?X.adler=u(X.adler,K,lt,G):X.state.wrap===2&&(X.adler=d(X.adler,K,lt,G)),X.next_in+=lt,X.total_in+=lt,lt),E.lookahead+=$,E.lookahead+E.insert>=I)for(B=E.strstart-E.insert,E.ins_h=E.window[B],E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+1])&E.hash_mask;E.insert&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+I-1])&E.hash_mask,E.prev[B&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=B,B++,E.insert--,!(E.lookahead+E.insert<I)););}while(E.lookahead<W&&E.strm.avail_in!==0)}function St(E,et){for(var $,A;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return C;if(E.lookahead===0)break}if($=0,E.lookahead>=I&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),$!==0&&E.strstart-$<=E.w_size-W&&(E.match_length=it(E,$)),E.match_length>=I)if(A=c._tr_tally(E,E.strstart-E.match_start,E.match_length-I),E.lookahead-=E.match_length,E.match_length<=E.max_lazy_match&&E.lookahead>=I){for(E.match_length--;E.strstart++,E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart,--E.match_length!=0;);E.strstart++}else E.strstart+=E.match_length,E.match_length=0,E.ins_h=E.window[E.strstart],E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+1])&E.hash_mask;else A=c._tr_tally(E,0,E.window[E.strstart]),E.lookahead--,E.strstart++;if(A&&(tt(E,!1),E.strm.avail_out===0))return C}return E.insert=E.strstart<I-1?E.strstart:I-1,et===_?(tt(E,!0),E.strm.avail_out===0?nt:rt):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?C:Z}function Pt(E,et){for(var $,A,M;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return C;if(E.lookahead===0)break}if($=0,E.lookahead>=I&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),E.prev_length=E.match_length,E.prev_match=E.match_start,E.match_length=I-1,$!==0&&E.prev_length<E.max_lazy_match&&E.strstart-$<=E.w_size-W&&(E.match_length=it(E,$),E.match_length<=5&&(E.strategy===1||E.match_length===I&&4096<E.strstart-E.match_start)&&(E.match_length=I-1)),E.prev_length>=I&&E.match_length<=E.prev_length){for(M=E.strstart+E.lookahead-I,A=c._tr_tally(E,E.strstart-1-E.prev_match,E.prev_length-I),E.lookahead-=E.prev_length-1,E.prev_length-=2;++E.strstart<=M&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),--E.prev_length!=0;);if(E.match_available=0,E.match_length=I-1,E.strstart++,A&&(tt(E,!1),E.strm.avail_out===0))return C}else if(E.match_available){if((A=c._tr_tally(E,0,E.window[E.strstart-1]))&&tt(E,!1),E.strstart++,E.lookahead--,E.strm.avail_out===0)return C}else E.match_available=1,E.strstart++,E.lookahead--}return E.match_available&&(A=c._tr_tally(E,0,E.window[E.strstart-1]),E.match_available=0),E.insert=E.strstart<I-1?E.strstart:I-1,et===_?(tt(E,!0),E.strm.avail_out===0?nt:rt):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?C:Z}function It(E,et,$,A,M){this.good_length=E,this.max_lazy=et,this.nice_length=$,this.max_chain=A,this.func=M}function Ut(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=S,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*k),this.dyn_dtree=new l.Buf16(2*(2*N+1)),this.bl_tree=new l.Buf16(2*(2*O+1)),at(this.dyn_ltree),at(this.dyn_dtree),at(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(H+1),this.heap=new l.Buf16(2*P+1),at(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*P+1),at(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function ot(E){var et;return E&&E.state?(E.total_in=E.total_out=0,E.data_type=v,(et=E.state).pending=0,et.pending_out=0,et.wrap<0&&(et.wrap=-et.wrap),et.status=et.wrap?U:F,E.adler=et.wrap===2?0:1,et.last_flush=p,c._tr_init(et),m):j(E,x)}function xt(E){var et=ot(E);return et===m&&function($){$.window_size=2*$.w_size,at($.head),$.max_lazy_match=o[$.level].max_lazy,$.good_match=o[$.level].good_length,$.nice_match=o[$.level].nice_length,$.max_chain_length=o[$.level].max_chain,$.strstart=0,$.block_start=0,$.lookahead=0,$.insert=0,$.match_length=$.prev_length=I-1,$.match_available=0,$.ins_h=0}(E.state),et}function bt(E,et,$,A,M,B){if(!E)return x;var X=1;if(et===y&&(et=6),A<0?(X=0,A=-A):15<A&&(X=2,A-=16),M<1||w<M||$!==S||A<8||15<A||et<0||9<et||B<0||g<B)return j(E,x);A===8&&(A=9);var K=new Ut;return(E.state=K).strm=E,K.wrap=X,K.gzhead=null,K.w_bits=A,K.w_size=1<<K.w_bits,K.w_mask=K.w_size-1,K.hash_bits=M+7,K.hash_size=1<<K.hash_bits,K.hash_mask=K.hash_size-1,K.hash_shift=~~((K.hash_bits+I-1)/I),K.window=new l.Buf8(2*K.w_size),K.head=new l.Buf16(K.hash_size),K.prev=new l.Buf16(K.w_size),K.lit_bufsize=1<<M+6,K.pending_buf_size=4*K.lit_bufsize,K.pending_buf=new l.Buf8(K.pending_buf_size),K.d_buf=1*K.lit_bufsize,K.l_buf=3*K.lit_bufsize,K.level=et,K.strategy=B,K.method=$,xt(E)}o=[new It(0,0,0,0,function(E,et){var $=65535;for($>E.pending_buf_size-5&&($=E.pending_buf_size-5);;){if(E.lookahead<=1){if(wt(E),E.lookahead===0&&et===p)return C;if(E.lookahead===0)break}E.strstart+=E.lookahead,E.lookahead=0;var A=E.block_start+$;if((E.strstart===0||E.strstart>=A)&&(E.lookahead=E.strstart-A,E.strstart=A,tt(E,!1),E.strm.avail_out===0)||E.strstart-E.block_start>=E.w_size-W&&(tt(E,!1),E.strm.avail_out===0))return C}return E.insert=0,et===_?(tt(E,!0),E.strm.avail_out===0?nt:rt):(E.strstart>E.block_start&&(tt(E,!1),E.strm.avail_out),C)}),new It(4,4,8,4,St),new It(4,5,16,8,St),new It(4,6,32,32,St),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(E,et){return bt(E,et,S,15,8,0)},s.deflateInit2=bt,s.deflateReset=xt,s.deflateResetKeep=ot,s.deflateSetHeader=function(E,et){return E&&E.state?E.state.wrap!==2?x:(E.state.gzhead=et,m):x},s.deflate=function(E,et){var $,A,M,B;if(!E||!E.state||5<et||et<0)return E?j(E,x):x;if(A=E.state,!E.output||!E.input&&E.avail_in!==0||A.status===666&&et!==_)return j(E,E.avail_out===0?-5:x);if(A.strm=E,$=A.last_flush,A.last_flush=et,A.status===U)if(A.wrap===2)E.adler=0,Ct(A,31),Ct(A,139),Ct(A,8),A.gzhead?(Ct(A,(A.gzhead.text?1:0)+(A.gzhead.hcrc?2:0)+(A.gzhead.extra?4:0)+(A.gzhead.name?8:0)+(A.gzhead.comment?16:0)),Ct(A,255&A.gzhead.time),Ct(A,A.gzhead.time>>8&255),Ct(A,A.gzhead.time>>16&255),Ct(A,A.gzhead.time>>24&255),Ct(A,A.level===9?2:2<=A.strategy||A.level<2?4:0),Ct(A,255&A.gzhead.os),A.gzhead.extra&&A.gzhead.extra.length&&(Ct(A,255&A.gzhead.extra.length),Ct(A,A.gzhead.extra.length>>8&255)),A.gzhead.hcrc&&(E.adler=d(E.adler,A.pending_buf,A.pending,0)),A.gzindex=0,A.status=69):(Ct(A,0),Ct(A,0),Ct(A,0),Ct(A,0),Ct(A,0),Ct(A,A.level===9?2:2<=A.strategy||A.level<2?4:0),Ct(A,3),A.status=F);else{var X=S+(A.w_bits-8<<4)<<8;X|=(2<=A.strategy||A.level<2?0:A.level<6?1:A.level===6?2:3)<<6,A.strstart!==0&&(X|=32),X+=31-X%31,A.status=F,Q(A,X),A.strstart!==0&&(Q(A,E.adler>>>16),Q(A,65535&E.adler)),E.adler=1}if(A.status===69)if(A.gzhead.extra){for(M=A.pending;A.gzindex<(65535&A.gzhead.extra.length)&&(A.pending!==A.pending_buf_size||(A.gzhead.hcrc&&A.pending>M&&(E.adler=d(E.adler,A.pending_buf,A.pending-M,M)),q(E),M=A.pending,A.pending!==A.pending_buf_size));)Ct(A,255&A.gzhead.extra[A.gzindex]),A.gzindex++;A.gzhead.hcrc&&A.pending>M&&(E.adler=d(E.adler,A.pending_buf,A.pending-M,M)),A.gzindex===A.gzhead.extra.length&&(A.gzindex=0,A.status=73)}else A.status=73;if(A.status===73)if(A.gzhead.name){M=A.pending;do{if(A.pending===A.pending_buf_size&&(A.gzhead.hcrc&&A.pending>M&&(E.adler=d(E.adler,A.pending_buf,A.pending-M,M)),q(E),M=A.pending,A.pending===A.pending_buf_size)){B=1;break}B=A.gzindex<A.gzhead.name.length?255&A.gzhead.name.charCodeAt(A.gzindex++):0,Ct(A,B)}while(B!==0);A.gzhead.hcrc&&A.pending>M&&(E.adler=d(E.adler,A.pending_buf,A.pending-M,M)),B===0&&(A.gzindex=0,A.status=91)}else A.status=91;if(A.status===91)if(A.gzhead.comment){M=A.pending;do{if(A.pending===A.pending_buf_size&&(A.gzhead.hcrc&&A.pending>M&&(E.adler=d(E.adler,A.pending_buf,A.pending-M,M)),q(E),M=A.pending,A.pending===A.pending_buf_size)){B=1;break}B=A.gzindex<A.gzhead.comment.length?255&A.gzhead.comment.charCodeAt(A.gzindex++):0,Ct(A,B)}while(B!==0);A.gzhead.hcrc&&A.pending>M&&(E.adler=d(E.adler,A.pending_buf,A.pending-M,M)),B===0&&(A.status=103)}else A.status=103;if(A.status===103&&(A.gzhead.hcrc?(A.pending+2>A.pending_buf_size&&q(E),A.pending+2<=A.pending_buf_size&&(Ct(A,255&E.adler),Ct(A,E.adler>>8&255),E.adler=0,A.status=F)):A.status=F),A.pending!==0){if(q(E),E.avail_out===0)return A.last_flush=-1,m}else if(E.avail_in===0&&st(et)<=st($)&&et!==_)return j(E,-5);if(A.status===666&&E.avail_in!==0)return j(E,-5);if(E.avail_in!==0||A.lookahead!==0||et!==p&&A.status!==666){var K=A.strategy===2?function(G,ft){for(var lt;;){if(G.lookahead===0&&(wt(G),G.lookahead===0)){if(ft===p)return C;break}if(G.match_length=0,lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++,lt&&(tt(G,!1),G.strm.avail_out===0))return C}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?nt:rt):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?C:Z}(A,et):A.strategy===3?function(G,ft){for(var lt,pt,Tt,Et,At=G.window;;){if(G.lookahead<=R){if(wt(G),G.lookahead<=R&&ft===p)return C;if(G.lookahead===0)break}if(G.match_length=0,G.lookahead>=I&&0<G.strstart&&(pt=At[Tt=G.strstart-1])===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]){Et=G.strstart+R;do;while(pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&Tt<Et);G.match_length=R-(Et-Tt),G.match_length>G.lookahead&&(G.match_length=G.lookahead)}if(G.match_length>=I?(lt=c._tr_tally(G,1,G.match_length-I),G.lookahead-=G.match_length,G.strstart+=G.match_length,G.match_length=0):(lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++),lt&&(tt(G,!1),G.strm.avail_out===0))return C}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?nt:rt):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?C:Z}(A,et):o[A.level].func(A,et);if(K!==nt&&K!==rt||(A.status=666),K===C||K===nt)return E.avail_out===0&&(A.last_flush=-1),m;if(K===Z&&(et===1?c._tr_align(A):et!==5&&(c._tr_stored_block(A,0,0,!1),et===3&&(at(A.head),A.lookahead===0&&(A.strstart=0,A.block_start=0,A.insert=0))),q(E),E.avail_out===0))return A.last_flush=-1,m}return et!==_?m:A.wrap<=0?1:(A.wrap===2?(Ct(A,255&E.adler),Ct(A,E.adler>>8&255),Ct(A,E.adler>>16&255),Ct(A,E.adler>>24&255),Ct(A,255&E.total_in),Ct(A,E.total_in>>8&255),Ct(A,E.total_in>>16&255),Ct(A,E.total_in>>24&255)):(Q(A,E.adler>>>16),Q(A,65535&E.adler)),q(E),0<A.wrap&&(A.wrap=-A.wrap),A.pending!==0?m:1)},s.deflateEnd=function(E){var et;return E&&E.state?(et=E.state.status)!==U&&et!==69&&et!==73&&et!==91&&et!==103&&et!==F&&et!==666?j(E,x):(E.state=null,et===F?j(E,-3):m):x},s.deflateSetDictionary=function(E,et){var $,A,M,B,X,K,G,ft,lt=et.length;if(!E||!E.state||(B=($=E.state).wrap)===2||B===1&&$.status!==U||$.lookahead)return x;for(B===1&&(E.adler=u(E.adler,et,lt,0)),$.wrap=0,lt>=$.w_size&&(B===0&&(at($.head),$.strstart=0,$.block_start=0,$.insert=0),ft=new l.Buf8($.w_size),l.arraySet(ft,et,lt-$.w_size,$.w_size,0),et=ft,lt=$.w_size),X=E.avail_in,K=E.next_in,G=E.input,E.avail_in=lt,E.next_in=0,E.input=et,wt($);$.lookahead>=I;){for(A=$.strstart,M=$.lookahead-(I-1);$.ins_h=($.ins_h<<$.hash_shift^$.window[A+I-1])&$.hash_mask,$.prev[A&$.w_mask]=$.head[$.ins_h],$.head[$.ins_h]=A,A++,--M;);$.strstart=A,$.lookahead=I-1,wt($)}return $.strstart+=$.lookahead,$.block_start=$.strstart,$.insert=$.lookahead,$.lookahead=0,$.match_length=$.prev_length=I-1,$.match_available=0,E.next_in=K,E.input=G,E.avail_in=X,$.wrap=B,m},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,u,d,f,p,_,m,x,y,g,v,S,w,P,N,O,k,H,I,R,W,U,F,C,Z;c=o.state,u=o.next_in,C=o.input,d=u+(o.avail_in-5),f=o.next_out,Z=o.output,p=f-(l-o.avail_out),_=f+(o.avail_out-257),m=c.dmax,x=c.wsize,y=c.whave,g=c.wnext,v=c.window,S=c.hold,w=c.bits,P=c.lencode,N=c.distcode,O=(1<<c.lenbits)-1,k=(1<<c.distbits)-1;t:do{w<15&&(S+=C[u++]<<w,w+=8,S+=C[u++]<<w,w+=8),H=P[S&O];e:for(;;){if(S>>>=I=H>>>24,w-=I,(I=H>>>16&255)===0)Z[f++]=65535&H;else{if(!(16&I)){if(!(64&I)){H=P[(65535&H)+(S&(1<<I)-1)];continue e}if(32&I){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}R=65535&H,(I&=15)&&(w<I&&(S+=C[u++]<<w,w+=8),R+=S&(1<<I)-1,S>>>=I,w-=I),w<15&&(S+=C[u++]<<w,w+=8,S+=C[u++]<<w,w+=8),H=N[S&k];n:for(;;){if(S>>>=I=H>>>24,w-=I,!(16&(I=H>>>16&255))){if(!(64&I)){H=N[(65535&H)+(S&(1<<I)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(W=65535&H,w<(I&=15)&&(S+=C[u++]<<w,(w+=8)<I&&(S+=C[u++]<<w,w+=8)),m<(W+=S&(1<<I)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(S>>>=I,w-=I,(I=f-p)<W){if(y<(I=W-I)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(F=v,(U=0)===g){if(U+=x-I,I<R){for(R-=I;Z[f++]=v[U++],--I;);U=f-W,F=Z}}else if(g<I){if(U+=x+g-I,(I-=g)<R){for(R-=I;Z[f++]=v[U++],--I;);if(U=0,g<R){for(R-=I=g;Z[f++]=v[U++],--I;);U=f-W,F=Z}}}else if(U+=g-I,I<R){for(R-=I;Z[f++]=v[U++],--I;);U=f-W,F=Z}for(;2<R;)Z[f++]=F[U++],Z[f++]=F[U++],Z[f++]=F[U++],R-=3;R&&(Z[f++]=F[U++],1<R&&(Z[f++]=F[U++]))}else{for(U=f-W;Z[f++]=Z[U++],Z[f++]=Z[U++],Z[f++]=Z[U++],2<(R-=3););R&&(Z[f++]=Z[U++],1<R&&(Z[f++]=Z[U++]))}break}}break}}while(u<d&&f<_);u-=R=w>>3,S&=(1<<(w-=R<<3))-1,o.next_in=u,o.next_out=f,o.avail_in=u<d?d-u+5:5-(u-d),o.avail_out=f<_?_-f+257:257-(f-_),c.hold=S,c.bits=w}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),u=e("./inffast"),d=e("./inftrees"),f=1,p=2,_=0,m=-2,x=1,y=852,g=592;function v(U){return(U>>>24&255)+(U>>>8&65280)+((65280&U)<<8)+((255&U)<<24)}function S(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(U){var F;return U&&U.state?(F=U.state,U.total_in=U.total_out=F.total=0,U.msg="",F.wrap&&(U.adler=1&F.wrap),F.mode=x,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new o.Buf32(y),F.distcode=F.distdyn=new o.Buf32(g),F.sane=1,F.back=-1,_):m}function P(U){var F;return U&&U.state?((F=U.state).wsize=0,F.whave=0,F.wnext=0,w(U)):m}function N(U,F){var C,Z;return U&&U.state?(Z=U.state,F<0?(C=0,F=-F):(C=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?m:(Z.window!==null&&Z.wbits!==F&&(Z.window=null),Z.wrap=C,Z.wbits=F,P(U))):m}function O(U,F){var C,Z;return U?(Z=new S,(U.state=Z).window=null,(C=N(U,F))!==_&&(U.state=null),C):m}var k,H,I=!0;function R(U){if(I){var F;for(k=new o.Buf32(512),H=new o.Buf32(32),F=0;F<144;)U.lens[F++]=8;for(;F<256;)U.lens[F++]=9;for(;F<280;)U.lens[F++]=7;for(;F<288;)U.lens[F++]=8;for(d(f,U.lens,0,288,k,0,U.work,{bits:9}),F=0;F<32;)U.lens[F++]=5;d(p,U.lens,0,32,H,0,U.work,{bits:5}),I=!1}U.lencode=k,U.lenbits=9,U.distcode=H,U.distbits=5}function W(U,F,C,Z){var nt,rt=U.state;return rt.window===null&&(rt.wsize=1<<rt.wbits,rt.wnext=0,rt.whave=0,rt.window=new o.Buf8(rt.wsize)),Z>=rt.wsize?(o.arraySet(rt.window,F,C-rt.wsize,rt.wsize,0),rt.wnext=0,rt.whave=rt.wsize):(Z<(nt=rt.wsize-rt.wnext)&&(nt=Z),o.arraySet(rt.window,F,C-Z,nt,rt.wnext),(Z-=nt)?(o.arraySet(rt.window,F,C-Z,Z,0),rt.wnext=Z,rt.whave=rt.wsize):(rt.wnext+=nt,rt.wnext===rt.wsize&&(rt.wnext=0),rt.whave<rt.wsize&&(rt.whave+=nt))),0}s.inflateReset=P,s.inflateReset2=N,s.inflateResetKeep=w,s.inflateInit=function(U){return O(U,15)},s.inflateInit2=O,s.inflate=function(U,F){var C,Z,nt,rt,j,st,at,q,tt,Ct,Q,it,wt,St,Pt,It,Ut,ot,xt,bt,E,et,$,A,M=0,B=new o.Buf8(4),X=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!U||!U.state||!U.output||!U.input&&U.avail_in!==0)return m;(C=U.state).mode===12&&(C.mode=13),j=U.next_out,nt=U.output,at=U.avail_out,rt=U.next_in,Z=U.input,st=U.avail_in,q=C.hold,tt=C.bits,Ct=st,Q=at,et=_;t:for(;;)switch(C.mode){case x:if(C.wrap===0){C.mode=13;break}for(;tt<16;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(2&C.wrap&&q===35615){B[C.check=0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0),tt=q=0,C.mode=2;break}if(C.flags=0,C.head&&(C.head.done=!1),!(1&C.wrap)||(((255&q)<<8)+(q>>8))%31){U.msg="incorrect header check",C.mode=30;break}if((15&q)!=8){U.msg="unknown compression method",C.mode=30;break}if(tt-=4,E=8+(15&(q>>>=4)),C.wbits===0)C.wbits=E;else if(E>C.wbits){U.msg="invalid window size",C.mode=30;break}C.dmax=1<<E,U.adler=C.check=1,C.mode=512&q?10:12,tt=q=0;break;case 2:for(;tt<16;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(C.flags=q,(255&C.flags)!=8){U.msg="unknown compression method",C.mode=30;break}if(57344&C.flags){U.msg="unknown header flags set",C.mode=30;break}C.head&&(C.head.text=q>>8&1),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0)),tt=q=0,C.mode=3;case 3:for(;tt<32;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}C.head&&(C.head.time=q),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,B[2]=q>>>16&255,B[3]=q>>>24&255,C.check=c(C.check,B,4,0)),tt=q=0,C.mode=4;case 4:for(;tt<16;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}C.head&&(C.head.xflags=255&q,C.head.os=q>>8),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0)),tt=q=0,C.mode=5;case 5:if(1024&C.flags){for(;tt<16;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}C.length=q,C.head&&(C.head.extra_len=q),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0)),tt=q=0}else C.head&&(C.head.extra=null);C.mode=6;case 6:if(1024&C.flags&&(st<(it=C.length)&&(it=st),it&&(C.head&&(E=C.head.extra_len-C.length,C.head.extra||(C.head.extra=new Array(C.head.extra_len)),o.arraySet(C.head.extra,Z,rt,it,E)),512&C.flags&&(C.check=c(C.check,Z,it,rt)),st-=it,rt+=it,C.length-=it),C.length))break t;C.length=0,C.mode=7;case 7:if(2048&C.flags){if(st===0)break t;for(it=0;E=Z[rt+it++],C.head&&E&&C.length<65536&&(C.head.name+=String.fromCharCode(E)),E&&it<st;);if(512&C.flags&&(C.check=c(C.check,Z,it,rt)),st-=it,rt+=it,E)break t}else C.head&&(C.head.name=null);C.length=0,C.mode=8;case 8:if(4096&C.flags){if(st===0)break t;for(it=0;E=Z[rt+it++],C.head&&E&&C.length<65536&&(C.head.comment+=String.fromCharCode(E)),E&&it<st;);if(512&C.flags&&(C.check=c(C.check,Z,it,rt)),st-=it,rt+=it,E)break t}else C.head&&(C.head.comment=null);C.mode=9;case 9:if(512&C.flags){for(;tt<16;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(q!==(65535&C.check)){U.msg="header crc mismatch",C.mode=30;break}tt=q=0}C.head&&(C.head.hcrc=C.flags>>9&1,C.head.done=!0),U.adler=C.check=0,C.mode=12;break;case 10:for(;tt<32;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}U.adler=C.check=v(q),tt=q=0,C.mode=11;case 11:if(C.havedict===0)return U.next_out=j,U.avail_out=at,U.next_in=rt,U.avail_in=st,C.hold=q,C.bits=tt,2;U.adler=C.check=1,C.mode=12;case 12:if(F===5||F===6)break t;case 13:if(C.last){q>>>=7&tt,tt-=7&tt,C.mode=27;break}for(;tt<3;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}switch(C.last=1&q,tt-=1,3&(q>>>=1)){case 0:C.mode=14;break;case 1:if(R(C),C.mode=20,F!==6)break;q>>>=2,tt-=2;break t;case 2:C.mode=17;break;case 3:U.msg="invalid block type",C.mode=30}q>>>=2,tt-=2;break;case 14:for(q>>>=7&tt,tt-=7&tt;tt<32;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if((65535&q)!=(q>>>16^65535)){U.msg="invalid stored block lengths",C.mode=30;break}if(C.length=65535&q,tt=q=0,C.mode=15,F===6)break t;case 15:C.mode=16;case 16:if(it=C.length){if(st<it&&(it=st),at<it&&(it=at),it===0)break t;o.arraySet(nt,Z,rt,it,j),st-=it,rt+=it,at-=it,j+=it,C.length-=it;break}C.mode=12;break;case 17:for(;tt<14;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(C.nlen=257+(31&q),q>>>=5,tt-=5,C.ndist=1+(31&q),q>>>=5,tt-=5,C.ncode=4+(15&q),q>>>=4,tt-=4,286<C.nlen||30<C.ndist){U.msg="too many length or distance symbols",C.mode=30;break}C.have=0,C.mode=18;case 18:for(;C.have<C.ncode;){for(;tt<3;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}C.lens[X[C.have++]]=7&q,q>>>=3,tt-=3}for(;C.have<19;)C.lens[X[C.have++]]=0;if(C.lencode=C.lendyn,C.lenbits=7,$={bits:C.lenbits},et=d(0,C.lens,0,19,C.lencode,0,C.work,$),C.lenbits=$.bits,et){U.msg="invalid code lengths set",C.mode=30;break}C.have=0,C.mode=19;case 19:for(;C.have<C.nlen+C.ndist;){for(;It=(M=C.lencode[q&(1<<C.lenbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=tt);){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(Ut<16)q>>>=Pt,tt-=Pt,C.lens[C.have++]=Ut;else{if(Ut===16){for(A=Pt+2;tt<A;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(q>>>=Pt,tt-=Pt,C.have===0){U.msg="invalid bit length repeat",C.mode=30;break}E=C.lens[C.have-1],it=3+(3&q),q>>>=2,tt-=2}else if(Ut===17){for(A=Pt+3;tt<A;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}tt-=Pt,E=0,it=3+(7&(q>>>=Pt)),q>>>=3,tt-=3}else{for(A=Pt+7;tt<A;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}tt-=Pt,E=0,it=11+(127&(q>>>=Pt)),q>>>=7,tt-=7}if(C.have+it>C.nlen+C.ndist){U.msg="invalid bit length repeat",C.mode=30;break}for(;it--;)C.lens[C.have++]=E}}if(C.mode===30)break;if(C.lens[256]===0){U.msg="invalid code -- missing end-of-block",C.mode=30;break}if(C.lenbits=9,$={bits:C.lenbits},et=d(f,C.lens,0,C.nlen,C.lencode,0,C.work,$),C.lenbits=$.bits,et){U.msg="invalid literal/lengths set",C.mode=30;break}if(C.distbits=6,C.distcode=C.distdyn,$={bits:C.distbits},et=d(p,C.lens,C.nlen,C.ndist,C.distcode,0,C.work,$),C.distbits=$.bits,et){U.msg="invalid distances set",C.mode=30;break}if(C.mode=20,F===6)break t;case 20:C.mode=21;case 21:if(6<=st&&258<=at){U.next_out=j,U.avail_out=at,U.next_in=rt,U.avail_in=st,C.hold=q,C.bits=tt,u(U,Q),j=U.next_out,nt=U.output,at=U.avail_out,rt=U.next_in,Z=U.input,st=U.avail_in,q=C.hold,tt=C.bits,C.mode===12&&(C.back=-1);break}for(C.back=0;It=(M=C.lencode[q&(1<<C.lenbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=tt);){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(It&&!(240&It)){for(ot=Pt,xt=It,bt=Ut;It=(M=C.lencode[bt+((q&(1<<ot+xt)-1)>>ot)])>>>16&255,Ut=65535&M,!(ot+(Pt=M>>>24)<=tt);){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}q>>>=ot,tt-=ot,C.back+=ot}if(q>>>=Pt,tt-=Pt,C.back+=Pt,C.length=Ut,It===0){C.mode=26;break}if(32&It){C.back=-1,C.mode=12;break}if(64&It){U.msg="invalid literal/length code",C.mode=30;break}C.extra=15&It,C.mode=22;case 22:if(C.extra){for(A=C.extra;tt<A;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}C.length+=q&(1<<C.extra)-1,q>>>=C.extra,tt-=C.extra,C.back+=C.extra}C.was=C.length,C.mode=23;case 23:for(;It=(M=C.distcode[q&(1<<C.distbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=tt);){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(!(240&It)){for(ot=Pt,xt=It,bt=Ut;It=(M=C.distcode[bt+((q&(1<<ot+xt)-1)>>ot)])>>>16&255,Ut=65535&M,!(ot+(Pt=M>>>24)<=tt);){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}q>>>=ot,tt-=ot,C.back+=ot}if(q>>>=Pt,tt-=Pt,C.back+=Pt,64&It){U.msg="invalid distance code",C.mode=30;break}C.offset=Ut,C.extra=15&It,C.mode=24;case 24:if(C.extra){for(A=C.extra;tt<A;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}C.offset+=q&(1<<C.extra)-1,q>>>=C.extra,tt-=C.extra,C.back+=C.extra}if(C.offset>C.dmax){U.msg="invalid distance too far back",C.mode=30;break}C.mode=25;case 25:if(at===0)break t;if(it=Q-at,C.offset>it){if((it=C.offset-it)>C.whave&&C.sane){U.msg="invalid distance too far back",C.mode=30;break}wt=it>C.wnext?(it-=C.wnext,C.wsize-it):C.wnext-it,it>C.length&&(it=C.length),St=C.window}else St=nt,wt=j-C.offset,it=C.length;for(at<it&&(it=at),at-=it,C.length-=it;nt[j++]=St[wt++],--it;);C.length===0&&(C.mode=21);break;case 26:if(at===0)break t;nt[j++]=C.length,at--,C.mode=21;break;case 27:if(C.wrap){for(;tt<32;){if(st===0)break t;st--,q|=Z[rt++]<<tt,tt+=8}if(Q-=at,U.total_out+=Q,C.total+=Q,Q&&(U.adler=C.check=C.flags?c(C.check,nt,Q,j-Q):l(C.check,nt,Q,j-Q)),Q=at,(C.flags?q:v(q))!==C.check){U.msg="incorrect data check",C.mode=30;break}tt=q=0}C.mode=28;case 28:if(C.wrap&&C.flags){for(;tt<32;){if(st===0)break t;st--,q+=Z[rt++]<<tt,tt+=8}if(q!==(4294967295&C.total)){U.msg="incorrect length check",C.mode=30;break}tt=q=0}C.mode=29;case 29:et=1;break t;case 30:et=-3;break t;case 31:return-4;case 32:default:return m}return U.next_out=j,U.avail_out=at,U.next_in=rt,U.avail_in=st,C.hold=q,C.bits=tt,(C.wsize||Q!==U.avail_out&&C.mode<30&&(C.mode<27||F!==4))&&W(U,U.output,U.next_out,Q-U.avail_out)?(C.mode=31,-4):(Ct-=U.avail_in,Q-=U.avail_out,U.total_in+=Ct,U.total_out+=Q,C.total+=Q,C.wrap&&Q&&(U.adler=C.check=C.flags?c(C.check,nt,Q,U.next_out-Q):l(C.check,nt,Q,U.next_out-Q)),U.data_type=C.bits+(C.last?64:0)+(C.mode===12?128:0)+(C.mode===20||C.mode===15?256:0),(Ct==0&&Q===0||F===4)&&et===_&&(et=-5),et)},s.inflateEnd=function(U){if(!U||!U.state)return m;var F=U.state;return F.window&&(F.window=null),U.state=null,_},s.inflateGetHeader=function(U,F){var C;return U&&U.state&&2&(C=U.state).wrap?((C.head=F).done=!1,_):m},s.inflateSetDictionary=function(U,F){var C,Z=F.length;return U&&U.state?(C=U.state).wrap!==0&&C.mode!==11?m:C.mode===11&&l(1,F,Z,0)!==C.check?-3:W(U,F,Z,Z)?(C.mode=31,-4):(C.havedict=1,_):m},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,p,_,m,x,y,g,v){var S,w,P,N,O,k,H,I,R,W=v.bits,U=0,F=0,C=0,Z=0,nt=0,rt=0,j=0,st=0,at=0,q=0,tt=null,Ct=0,Q=new o.Buf16(16),it=new o.Buf16(16),wt=null,St=0;for(U=0;U<=15;U++)Q[U]=0;for(F=0;F<m;F++)Q[p[_+F]]++;for(nt=W,Z=15;1<=Z&&Q[Z]===0;Z--);if(Z<nt&&(nt=Z),Z===0)return x[y++]=20971520,x[y++]=20971520,v.bits=1,0;for(C=1;C<Z&&Q[C]===0;C++);for(nt<C&&(nt=C),U=st=1;U<=15;U++)if(st<<=1,(st-=Q[U])<0)return-1;if(0<st&&(f===0||Z!==1))return-1;for(it[1]=0,U=1;U<15;U++)it[U+1]=it[U]+Q[U];for(F=0;F<m;F++)p[_+F]!==0&&(g[it[p[_+F]]++]=F);if(k=f===0?(tt=wt=g,19):f===1?(tt=l,Ct-=257,wt=c,St-=257,256):(tt=u,wt=d,-1),U=C,O=y,j=F=q=0,P=-1,N=(at=1<<(rt=nt))-1,f===1&&852<at||f===2&&592<at)return 1;for(;;){for(H=U-j,R=g[F]<k?(I=0,g[F]):g[F]>k?(I=wt[St+g[F]],tt[Ct+g[F]]):(I=96,0),S=1<<U-j,C=w=1<<rt;x[O+(q>>j)+(w-=S)]=H<<24|I<<16|R|0,w!==0;);for(S=1<<U-1;q&S;)S>>=1;if(S!==0?(q&=S-1,q+=S):q=0,F++,--Q[U]==0){if(U===Z)break;U=p[_+g[F]]}if(nt<U&&(q&N)!==P){for(j===0&&(j=nt),O+=C,st=1<<(rt=U-j);rt+j<Z&&!((st-=Q[rt+j])<=0);)rt++,st<<=1;if(at+=1<<rt,f===1&&852<at||f===2&&592<at)return 1;x[P=q&N]=nt<<24|rt<<16|O-y|0}}return q!==0&&(x[O+q]=U-j<<24|64<<16|0),v.bits=nt,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function u(M){for(var B=M.length;0<=--B;)M[B]=0}var d=0,f=29,p=256,_=p+1+f,m=30,x=19,y=2*_+1,g=15,v=16,S=7,w=256,P=16,N=17,O=18,k=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],H=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],W=new Array(2*(_+2));u(W);var U=new Array(2*m);u(U);var F=new Array(512);u(F);var C=new Array(256);u(C);var Z=new Array(f);u(Z);var nt,rt,j,st=new Array(m);function at(M,B,X,K,G){this.static_tree=M,this.extra_bits=B,this.extra_base=X,this.elems=K,this.max_length=G,this.has_stree=M&&M.length}function q(M,B){this.dyn_tree=M,this.max_code=0,this.stat_desc=B}function tt(M){return M<256?F[M]:F[256+(M>>>7)]}function Ct(M,B){M.pending_buf[M.pending++]=255&B,M.pending_buf[M.pending++]=B>>>8&255}function Q(M,B,X){M.bi_valid>v-X?(M.bi_buf|=B<<M.bi_valid&65535,Ct(M,M.bi_buf),M.bi_buf=B>>v-M.bi_valid,M.bi_valid+=X-v):(M.bi_buf|=B<<M.bi_valid&65535,M.bi_valid+=X)}function it(M,B,X){Q(M,X[2*B],X[2*B+1])}function wt(M,B){for(var X=0;X|=1&M,M>>>=1,X<<=1,0<--B;);return X>>>1}function St(M,B,X){var K,G,ft=new Array(g+1),lt=0;for(K=1;K<=g;K++)ft[K]=lt=lt+X[K-1]<<1;for(G=0;G<=B;G++){var pt=M[2*G+1];pt!==0&&(M[2*G]=wt(ft[pt]++,pt))}}function Pt(M){var B;for(B=0;B<_;B++)M.dyn_ltree[2*B]=0;for(B=0;B<m;B++)M.dyn_dtree[2*B]=0;for(B=0;B<x;B++)M.bl_tree[2*B]=0;M.dyn_ltree[2*w]=1,M.opt_len=M.static_len=0,M.last_lit=M.matches=0}function It(M){8<M.bi_valid?Ct(M,M.bi_buf):0<M.bi_valid&&(M.pending_buf[M.pending++]=M.bi_buf),M.bi_buf=0,M.bi_valid=0}function Ut(M,B,X,K){var G=2*B,ft=2*X;return M[G]<M[ft]||M[G]===M[ft]&&K[B]<=K[X]}function ot(M,B,X){for(var K=M.heap[X],G=X<<1;G<=M.heap_len&&(G<M.heap_len&&Ut(B,M.heap[G+1],M.heap[G],M.depth)&&G++,!Ut(B,K,M.heap[G],M.depth));)M.heap[X]=M.heap[G],X=G,G<<=1;M.heap[X]=K}function xt(M,B,X){var K,G,ft,lt,pt=0;if(M.last_lit!==0)for(;K=M.pending_buf[M.d_buf+2*pt]<<8|M.pending_buf[M.d_buf+2*pt+1],G=M.pending_buf[M.l_buf+pt],pt++,K===0?it(M,G,B):(it(M,(ft=C[G])+p+1,B),(lt=k[ft])!==0&&Q(M,G-=Z[ft],lt),it(M,ft=tt(--K),X),(lt=H[ft])!==0&&Q(M,K-=st[ft],lt)),pt<M.last_lit;);it(M,w,B)}function bt(M,B){var X,K,G,ft=B.dyn_tree,lt=B.stat_desc.static_tree,pt=B.stat_desc.has_stree,Tt=B.stat_desc.elems,Et=-1;for(M.heap_len=0,M.heap_max=y,X=0;X<Tt;X++)ft[2*X]!==0?(M.heap[++M.heap_len]=Et=X,M.depth[X]=0):ft[2*X+1]=0;for(;M.heap_len<2;)ft[2*(G=M.heap[++M.heap_len]=Et<2?++Et:0)]=1,M.depth[G]=0,M.opt_len--,pt&&(M.static_len-=lt[2*G+1]);for(B.max_code=Et,X=M.heap_len>>1;1<=X;X--)ot(M,ft,X);for(G=Tt;X=M.heap[1],M.heap[1]=M.heap[M.heap_len--],ot(M,ft,1),K=M.heap[1],M.heap[--M.heap_max]=X,M.heap[--M.heap_max]=K,ft[2*G]=ft[2*X]+ft[2*K],M.depth[G]=(M.depth[X]>=M.depth[K]?M.depth[X]:M.depth[K])+1,ft[2*X+1]=ft[2*K+1]=G,M.heap[1]=G++,ot(M,ft,1),2<=M.heap_len;);M.heap[--M.heap_max]=M.heap[1],function(At,Ht){var zt,Dt,Kt,Vt,oe,ae,te=Ht.dyn_tree,Ft=Ht.max_code,D=Ht.stat_desc.static_tree,ht=Ht.stat_desc.has_stree,Mt=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,Nt=Ht.stat_desc.max_length,re=0;for(Vt=0;Vt<=g;Vt++)At.bl_count[Vt]=0;for(te[2*At.heap[At.heap_max]+1]=0,zt=At.heap_max+1;zt<y;zt++)Nt<(Vt=te[2*te[2*(Dt=At.heap[zt])+1]+1]+1)&&(Vt=Nt,re++),te[2*Dt+1]=Vt,Ft<Dt||(At.bl_count[Vt]++,oe=0,Rt<=Dt&&(oe=Mt[Dt-Rt]),ae=te[2*Dt],At.opt_len+=ae*(Vt+oe),ht&&(At.static_len+=ae*(D[2*Dt+1]+oe)));if(re!==0){do{for(Vt=Nt-1;At.bl_count[Vt]===0;)Vt--;At.bl_count[Vt]--,At.bl_count[Vt+1]+=2,At.bl_count[Nt]--,re-=2}while(0<re);for(Vt=Nt;Vt!==0;Vt--)for(Dt=At.bl_count[Vt];Dt!==0;)Ft<(Kt=At.heap[--zt])||(te[2*Kt+1]!==Vt&&(At.opt_len+=(Vt-te[2*Kt+1])*te[2*Kt],te[2*Kt+1]=Vt),Dt--)}}(M,B),St(ft,Et,M.bl_count)}function E(M,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),B[2*(X+1)+1]=65535,K=0;K<=X;K++)G=lt,lt=B[2*(K+1)+1],++pt<Tt&&G===lt||(pt<Et?M.bl_tree[2*G]+=pt:G!==0?(G!==ft&&M.bl_tree[2*G]++,M.bl_tree[2*P]++):pt<=10?M.bl_tree[2*N]++:M.bl_tree[2*O]++,ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4))}function et(M,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),K=0;K<=X;K++)if(G=lt,lt=B[2*(K+1)+1],!(++pt<Tt&&G===lt)){if(pt<Et)for(;it(M,G,M.bl_tree),--pt!=0;);else G!==0?(G!==ft&&(it(M,G,M.bl_tree),pt--),it(M,P,M.bl_tree),Q(M,pt-3,2)):pt<=10?(it(M,N,M.bl_tree),Q(M,pt-3,3)):(it(M,O,M.bl_tree),Q(M,pt-11,7));ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4)}}u(st);var $=!1;function A(M,B,X,K){Q(M,(d<<1)+(K?1:0),3),function(G,ft,lt,pt){It(G),Ct(G,lt),Ct(G,~lt),o.arraySet(G.pending_buf,G.window,ft,lt,G.pending),G.pending+=lt}(M,B,X)}s._tr_init=function(M){$||(function(){var B,X,K,G,ft,lt=new Array(g+1);for(G=K=0;G<f-1;G++)for(Z[G]=K,B=0;B<1<<k[G];B++)C[K++]=G;for(C[K-1]=G,G=ft=0;G<16;G++)for(st[G]=ft,B=0;B<1<<H[G];B++)F[ft++]=G;for(ft>>=7;G<m;G++)for(st[G]=ft<<7,B=0;B<1<<H[G]-7;B++)F[256+ft++]=G;for(X=0;X<=g;X++)lt[X]=0;for(B=0;B<=143;)W[2*B+1]=8,B++,lt[8]++;for(;B<=255;)W[2*B+1]=9,B++,lt[9]++;for(;B<=279;)W[2*B+1]=7,B++,lt[7]++;for(;B<=287;)W[2*B+1]=8,B++,lt[8]++;for(St(W,_+1,lt),B=0;B<m;B++)U[2*B+1]=5,U[2*B]=wt(B,5);nt=new at(W,k,p+1,_,g),rt=new at(U,H,0,m,g),j=new at(new Array(0),I,0,x,S)}(),$=!0),M.l_desc=new q(M.dyn_ltree,nt),M.d_desc=new q(M.dyn_dtree,rt),M.bl_desc=new q(M.bl_tree,j),M.bi_buf=0,M.bi_valid=0,Pt(M)},s._tr_stored_block=A,s._tr_flush_block=function(M,B,X,K){var G,ft,lt=0;0<M.level?(M.strm.data_type===2&&(M.strm.data_type=function(pt){var Tt,Et=4093624447;for(Tt=0;Tt<=31;Tt++,Et>>>=1)if(1&Et&&pt.dyn_ltree[2*Tt]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Tt=32;Tt<p;Tt++)if(pt.dyn_ltree[2*Tt]!==0)return c;return l}(M)),bt(M,M.l_desc),bt(M,M.d_desc),lt=function(pt){var Tt;for(E(pt,pt.dyn_ltree,pt.l_desc.max_code),E(pt,pt.dyn_dtree,pt.d_desc.max_code),bt(pt,pt.bl_desc),Tt=x-1;3<=Tt&&pt.bl_tree[2*R[Tt]+1]===0;Tt--);return pt.opt_len+=3*(Tt+1)+5+5+4,Tt}(M),G=M.opt_len+3+7>>>3,(ft=M.static_len+3+7>>>3)<=G&&(G=ft)):G=ft=X+5,X+4<=G&&B!==-1?A(M,B,X,K):M.strategy===4||ft===G?(Q(M,2+(K?1:0),3),xt(M,W,U)):(Q(M,4+(K?1:0),3),function(pt,Tt,Et,At){var Ht;for(Q(pt,Tt-257,5),Q(pt,Et-1,5),Q(pt,At-4,4),Ht=0;Ht<At;Ht++)Q(pt,pt.bl_tree[2*R[Ht]+1],3);et(pt,pt.dyn_ltree,Tt-1),et(pt,pt.dyn_dtree,Et-1)}(M,M.l_desc.max_code+1,M.d_desc.max_code+1,lt+1),xt(M,M.dyn_ltree,M.dyn_dtree)),Pt(M),K&&It(M)},s._tr_tally=function(M,B,X){return M.pending_buf[M.d_buf+2*M.last_lit]=B>>>8&255,M.pending_buf[M.d_buf+2*M.last_lit+1]=255&B,M.pending_buf[M.l_buf+M.last_lit]=255&X,M.last_lit++,B===0?M.dyn_ltree[2*X]++:(M.matches++,B--,M.dyn_ltree[2*(C[X]+p+1)]++,M.dyn_dtree[2*tt(B)]++),M.last_lit===M.lit_bufsize-1},s._tr_align=function(M){Q(M,2,3),it(M,w,W),function(B){B.bi_valid===16?(Ct(B,B.bi_buf),B.bi_buf=0,B.bi_valid=0):8<=B.bi_valid&&(B.pending_buf[B.pending++]=255&B.bi_buf,B.bi_buf>>=8,B.bi_valid-=8)}(M)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var u,d,f,p,_=1,m={},x=!1,y=l.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(l);g=g&&g.setTimeout?g:l,u={}.toString.call(l.process)==="[object process]"?function(P){process.nextTick(function(){S(P)})}:function(){if(l.postMessage&&!l.importScripts){var P=!0,N=l.onmessage;return l.onmessage=function(){P=!1},l.postMessage("","*"),l.onmessage=N,P}}()?(p="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",w,!1):l.attachEvent("onmessage",w),function(P){l.postMessage(p+P,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(P){S(P.data)},function(P){f.port2.postMessage(P)}):y&&"onreadystatechange"in y.createElement("script")?(d=y.documentElement,function(P){var N=y.createElement("script");N.onreadystatechange=function(){S(P),N.onreadystatechange=null,d.removeChild(N),N=null},d.appendChild(N)}):function(P){setTimeout(S,0,P)},g.setImmediate=function(P){typeof P!="function"&&(P=new Function(""+P));for(var N=new Array(arguments.length-1),O=0;O<N.length;O++)N[O]=arguments[O+1];var k={callback:P,args:N};return m[_]=k,u(_),_++},g.clearImmediate=v}function v(P){delete m[P]}function S(P){if(x)setTimeout(S,0,P);else{var N=m[P];if(N){x=!0;try{(function(O){var k=O.callback,H=O.args;switch(H.length){case 0:k();break;case 1:k(H[0]);break;case 2:k(H[0],H[1]);break;case 3:k(H[0],H[1],H[2]);break;default:k.apply(c,H)}})(N)}finally{v(P),x=!1}}}}function w(P){P.source===l&&typeof P.data=="string"&&P.data.indexOf(p)===0&&S(+P.data.slice(p.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof zs<"u"?zs:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(Xf);var x1=Xf.exports;const b1=Pd(x1);async function w1(r){if(!yt.tg||!yt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(yt.tg.traverse(m=>{if(!(m instanceof Ne))return;const x=m.geometry.clone();m.updateWorldMatrix(!0,!1),x.applyMatrix4(m.matrixWorld);const y=x.attributes.position,g=x.index;if(!y||y.count<3){x.dispose();return}let v="E4DFD8";const S=Array.isArray(m.material)?m.material[0]:m.material;S&&"color"in S&&(v=S.color.getHexString().toUpperCase());let w="";for(let N=0;N<y.count;N++)w+=`<vertex x="${y.getX(N).toFixed(4)}" y="${y.getZ(N).toFixed(4)}" z="${y.getY(N).toFixed(4)}"/>`;let P="";if(g)for(let N=0;N<g.count;N+=3)P+=`<triangle v1="${g.getX(N)}" v2="${g.getX(N+1)}" v3="${g.getX(N+2)}"/>`;else for(let N=0;N<y.count;N+=3)P+=`<triangle v1="${N}" v2="${N+1}" v3="${N+2}"/>`;x.dispose(),P&&t.push({id:e++,name:m.name||"mesh",col:v,vx:w,tr:P})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(m=>`<basematerials id="${m.id+1e3}"><base name="${m.name}" displaycolor="#${m.col}"/></basematerials>`).join(`
`),s=t.map(m=>`<object id="${m.id}" type="model" p:pid="${m.id+1e3}" p:pindex="0"><mesh><vertices>${m.vx}</vertices><triangles>${m.tr}</triangles></mesh></object>`).join(`
`),o=t.map(m=>`<item objectid="${m.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),u=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),d=new b1;d.file("[Content_Types].xml",u),d.folder("_rels").file(".rels",c),d.folder("3D").file("3dmodel.model",l);const f=await d.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(_),_.click(),document.body.removeChild(_),URL.revokeObjectURL(p)}let Zn=null,fn=null,Ln=null,Xn=null,bd="",Je=null,yn=null,ei=null,pc="",mc=[],wd="";const Se={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},so={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0},On={};let qf=1,jf=1,M1=0;const ur=[];let vi=[],Na=!1,ya="",Oa=200,ka=200,Ic=2,Dc=1;const qr={},xa={};let jr=null,Md="",hs=null,ba=null,gc=[],or=null,Re=null,ts=null,Us=null,Nc=!1;const ps=256,S1=2048;let ki=[];const es=[];function Yf(){if(!Re||!ts)return!1;const r=ts.getBoundingClientRect();return!r.width||!r.height?!1:(Re.style.left=`${r.left}px`,Re.style.top=`${r.top}px`,Re.style.width=`${r.width}px`,Re.style.height=`${r.height}px`,Zn&&(Zn.setSize(r.width,r.height,!1),Ln.aspect=r.width/r.height,Ln.updateProjectionMatrix()),!0)}function Sd(){if(!Re||!Nc)return;Yf()&&Re.style.display==="none"&&(Re.style.display="block")}function wa(r){if(Re||(Re=document.getElementById("dims-canvas")),ts!==r&&(Us&&ts&&Us.unobserve(ts),ts=r,Us||(Us=new ResizeObserver(Sd),window.addEventListener("resize",Sd)),Us.observe(r)),Nc=!0,Yf()&&Re&&(Re.style.display="block"),Zn)return;const t=r.getBoundingClientRect(),e=t.width||800,n=t.height||600;Zn=new mf({canvas:Re,antialias:!0}),Zn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Zn.setSize(e,n,!1),fn=new gf,fn.background=new Qt(527380),Ln=new Sn(42,e/n,.1,1e5),Xn=new Cf(Ln,Re),Xn.enableDamping=!0,Xn.dampingFactor=.06,fn.add(new Lf(16777215,.8));const s=new uc(16777215,.6);s.position.set(1.5,3,2),fn.add(s);const o=()=>{requestAnimationFrame(o),Xn.update(),Zn.render(fn,Ln),J1()};o()}function $f(){Nc=!1,Re&&(Re.style.display="none")}function pr(r){if(Object.assign(Se,r),Je&&(yn&&(yn.dispose(),yn=null),yn=tp(Je.bounds,Je.grid,ps,Je.minE,Je.elevRange,mc),hs)){const l=hs.material;l.map=yn,l.needsUpdate=!0}const t=On.base??1;ba&&ba.material.color.set(Se[t]??Se[1]);const e=On.facade??1,n=new Qt(Se[e]??Se[1]);for(const l of gc)l.material.color.set(n);if(or){const l=On.gpx_line??6,c=Se[l]??"#ff4500";or.traverse(u=>{const d=u.material;d?.color&&d.color.set(c)}),or.visible=so.gpx_line??!0}const s=On.gpx??6,o=Se[s]??"#ff4500";for(const l of vi)l.traverse(c=>{const u=c.material;u?.color&&u.color.set(o)})}function E1(r,t){On[r]=t,pr({})}function Kf(r,t){if(so[r]=t,r==="gpx_line")or&&(or.visible=t);else if(r==="gpx")for(const e of vi)e.visible=t;else pr({})}function T1(r,t){qf=r,jf=t}function A1(r){Na=!0,ya=r,Re&&(Re.style.cursor="crosshair")}function Jf(){Na=!1,ya="",Re&&(Re.style.cursor="")}function Qf(){return Na}function L1(r,t){if(!Na||!fn||!Ln||!hs||!Re)return-1;const e=Re.getBoundingClientRect(),n=(r-e.left)/e.width*2-1,s=-((t-e.top)/e.height)*2+1,o=new pb;o.setFromCamera(new vt(n,s),Ln);const l=o.intersectObject(hs);let c=-1;if(l.length>0){const u=l[0].point,d=.5-u.z/ka,f=.5+u.x/Oa,p=M1++;ur.push({id:p,latFrac:d,lonFrac:f,shape:ya,visible:!0}),ep(d,f,ya),c=p}return Jf(),c}function C1(){return ur.map(r=>({id:r.id,shape:r.shape,visible:r.visible}))}function P1(r,t){const e=ur.findIndex(n=>n.id===r);e<0||(ur[e].visible=t,vi[e]&&(vi[e].visible=t))}function R1(r){const t=ur.findIndex(n=>n.id===r);if(t<0)return;ur.splice(t,1);const e=vi.splice(t,1)[0];if(e){fn?.remove(e);const n=ki.indexOf(e);n>=0&&ki.splice(n,1)}}async function I1(r,t,e){if(!fn||!Ln||!Xn||!Zn)return;const n=`${r.minLat}|${r.maxLat}|${r.minLon}|${r.maxLon}`;n!==bd?(bd=n,Je=null,yn&&(yn.dispose(),yn=null),e(5,"Téléchargement des altitudes…"),Je=await $1(r),e(35,"Chargement des données géographiques…"),n!==wd&&(wd=n,mc=await N1(r)),e(70,"Génération de la texture…"),yn=tp(r,Je.grid,ps,Je.minE,Je.elevRange,mc)):e(50,"Reconstruction…");const o=JSON.stringify(t.zonePts);(o!==pc||!ei)&&(pc=o,ei&&(ei.dispose(),ei=null),ei=U1(t.zonePts,t.zoneType,r)),e(88,"Construction de la scène 3D…"),oo(t),e(100,"")}function oo(r){if(!fn||!Ln||!Xn||!Je||!yn)return;K1();const{wMm:t,dMm:e,baseH:n,exag:s,flatFacade:o,facadeWidthMm:l,gpxPoints:c,zoneType:u,zonePts:d,bounds:f}=r,{grid:p,minE:_,elevRange:m}=Je,x=f??Je.bounds,y=(x.minLat+x.maxLat)/2,g=(x.maxLon-x.minLon)*Math.cos(y*Math.PI/180)*111320,v=(x.maxLat-x.minLat)*111320,S=Math.max(g,v),w=Math.max(t,e),P=Math.max(1,Math.min(w*.5,m/S*w*s)),N=n+P,O=ps,k=z1(d,u,x,t,e),H=Math.max(1,l);hs=null,ba=null,gc=[],or=null,jr=null,vi=[];{const nt=new no(t,e,O-1,O-1);nt.rotateX(-Math.PI/2);const rt=nt.attributes.position;for(let st=0;st<rt.count;st++)rt.setY(st,n+(p[st]-_)/m*P);rt.needsUpdate=!0,nt.computeVertexNormals();const j=new Ne(nt,new Zs({map:yn,alphaMap:ei??void 0,transparent:!!ei}));hs=j,Yr(j)}const I=On.base??1,R=new Qt(Se[I]??Se[1]),W=new Ne(B1(k,u,t,e,n,H),new Zs({color:R,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));ba=W,Yr(W);const U=On.facade??1,F=new Qt(Se[U]??Se[1]),C=new Zs({color:F,side:dn});for(const nt of F1(k,u,t,e,H,o,N,p,O,_,m,n,P))nt.material=C,gc.push(nt),Yr(nt);if(c.length>=2){const nt=q1(c,x,t,e,p,O,_,m,n,P);nt&&(nt.visible=so.gpx_line??!0,or=nt,Yr(nt))}{const nt=new Nx(new Xx(new un(t+H*2,N,e+H*2)),new Ra({color:16718362}));nt.position.y=N/2,Yr(nt)}es.length=0,es.push({id:"dl-width",v:new J(0,2,e/2+H+14)}),es.push({id:"dl-depth",v:new J(t/2+H+14,N*.1,0)}),es.push({id:"dl-height",v:new J(-t/2-H-12,N/2,e/2+8)}),Wr("dl-width",`${t} mm`),Wr("dl-depth",`${e} mm`),Wr("dl-height",`~${Math.round(N*10)/10} mm`),Wr("dp-total-val",`~${Math.round(N*10)/10}`),Wr("dp-map-h",`~${Math.round(P*10)/10}`),Wr("dp-base-h-disp",`${n}`),Oa=t,ka=e,Ic=n,Dc=P;for(const nt of ur){ep(nt.latFrac,nt.lonFrac,nt.shape);const rt=vi[vi.length-1];rt&&(rt.visible=nt.visible)}Oc();const Z=Math.sqrt(t*t+e*e);if(Xn.target.lengthSq()<.1){Ln.position.set(t*.7,N+Z*.44,e*.92);const nt=new J(0,N*.2,0);Ln.lookAt(nt),Xn.target.copy(nt),Xn.update()}}function D1(){Xn&&Xn.target.set(0,0,0),yn&&(yn.dispose(),yn=null),ei&&(ei.dispose(),ei=null),pc=""}async function N1(r){const{minLat:t,minLon:e,maxLat:n,maxLon:s}=r,o=`(${t},${e},${n},${s})`,l=`[out:json][timeout:28];
(
  way["natural"="water"]${o};
  relation["natural"="water"]${o};
  way["waterway"="riverbank"]${o};
  way["waterway"~"^(river|canal|stream|ditch)$"]${o};
  way["natural"="wood"]${o};
  relation["natural"="wood"]${o};
  way["landuse"="forest"]${o};
  relation["landuse"="forest"]${o};
  way["natural"="scrub"]${o};
  way["natural"="heath"]${o};
  way["natural"="fell"]${o};
  way["natural"="moor"]${o};
  way["natural"="grassland"]${o};
  way["landuse"~"^(meadow|grass|farmland)$"]${o};
  way["natural"="glacier"]${o};
  relation["natural"="glacier"]${o};
  way["natural"="snow"]${o};
  way["natural"="bare_rock"]${o};
  way["natural"="scree"]${o};
  way["natural"="sand"]${o};
  way["natural"="wetland"]${o};
  way["natural"="mud"]${o};
);
out geom;`,c=new AbortController,u=setTimeout(()=>c.abort(),22e3);try{const d=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(l)}`,{signal:c.signal});return clearTimeout(u),(await d.json()).elements??[]}catch{return clearTimeout(u),[]}}const O1=[{id:"veg_low",match:r=>r.natural==="grassland"||r.landuse==="meadow"||r.landuse==="grass"||r.landuse==="farmland"||r.natural==="fell"||r.natural==="moor"||r.natural==="heath"||r.natural==="scrub",slot:3,fill:!0},{id:"veg_dense",match:r=>r.natural==="wood"||r.landuse==="forest",slot:4,fill:!0},{id:"wetland",match:r=>r.natural==="wetland"||r.natural==="mud",slot:3,fill:!0},{id:"snow",match:r=>r.natural==="glacier"||r.natural==="snow",slot:2,fill:!0},{id:"water",match:r=>r.natural==="water"||r.waterway==="riverbank",slot:5,fill:!0},{id:"waterways",match:r=>!!r.waterway&&r.waterway!=="riverbank",slot:5,fill:!1}];function k1(r,t){const e=n=>{if(n.length<3)return 0;let s=0;for(let o=0,l=n.length-1;o<n.length;l=o++)s+=(n[l].lon+n[o].lon)*(n[l].lat-n[o].lat);return Math.abs(s)/2*(t*111320)*111320};return r.type==="way"&&r.geometry?e(r.geometry):r.type==="relation"&&r.members?r.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,s)=>n+e(s.geometry),0):0}function tp(r,t,e,n,s,o){const l=S1,c=document.createElement("canvas");c.width=c.height=l;const u=c.getContext("2d"),d=u.createImageData(l,l),f=d.data;for(let g=0;g<l;g++)for(let v=0;v<l;v++){const S=v/(l-1)*(e-1),w=g/(l-1)*(e-1),P=Math.min(e-2,Math.floor(S)),N=Math.min(e-2,Math.floor(w)),O=S-P,k=w-N,H=t[N*e+P]*(1-O)*(1-k)+t[N*e+P+1]*O*(1-k)+t[(N+1)*e+P]*(1-O)*k+t[(N+1)*e+P+1]*O*k,I=Math.max(0,Math.min(1,(H-n)/s)),[R,W,U]=Y1(I),F=(g*l+v)*4;f[F]=R,f[F+1]=W,f[F+2]=U,f[F+3]=255}u.putImageData(d,0,0);const p=document.getElementById("cp-filter"),_=p?Number(p.value):100,m=Math.cos((r.minLat+r.maxLat)/2*Math.PI/180),x=(r.maxLon-r.minLon)*m*111320*(r.maxLat-r.minLat)*111320,y=Math.pow(1-_/100,2)*.02*x;for(const g of O1){if(!so[g.id])continue;const v=o.filter(P=>!P.tags||!g.match(P.tags)?!1:!g.fill||y<=0?!0:k1(P,m)>=y);if(!v.length)continue;const S=On[g.id]??g.slot,w=Se[S]??"#888";if(g.fill){u.beginPath();for(const P of v)Ed(u,P,r,l);u.fillStyle=w,u.fill("evenodd")}else for(const P of v){if(!P.tags)continue;const N=P.tags.waterway??"",O=N==="river"?7:N==="canal"?5:N==="stream"?2.5:1.5;u.beginPath(),Ed(u,P,r,l),u.strokeStyle=w,u.lineWidth=O,u.lineCap="round",u.lineJoin="round",u.stroke()}}return new _f(c)}function Ed(r,t,e,n){const s=o=>{if(!(!o||o.length<2)){for(let l=0;l<o.length;l++){const c=(o[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,u=(1-(o[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?r.moveTo(c,u):r.lineTo(c,u)}r.closePath()}};if(t.type==="way"&&t.geometry)s(t.geometry);else if(t.type==="relation"&&t.members)for(const o of t.members)o.role==="outer"&&o.geometry&&s(o.geometry)}function U1(r,t,e,n,s){if(!r||r.length<3||t==="rect"||t==="sq")return null;const o=512,l=document.createElement("canvas");l.width=l.height=o;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,o,o),c.fillStyle="white",c.beginPath();for(let u=0;u<r.length;u++){const[d,f]=r[u],p=(f-e.minLon)/(e.maxLon-e.minLon)*o,_=(1-(d-e.minLat)/(e.maxLat-e.minLat))*o;u===0?c.moveTo(p,_):c.lineTo(p,_)}return c.closePath(),c.fill(),new _f(l)}function z1(r,t,e,n,s){return!r||r.length<3||t==="rect"||t==="sq"?[[-n/2,-s/2],[n/2,-s/2],[n/2,s/2],[-n/2,s/2]]:r.map(([o,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(o-e.minLat)/(e.maxLat-e.minLat))*s-s/2])}function B1(r,t,e,n,s,o){if(t==="rect"||t==="sq"){const u=new un(e+o*2,s,n+o*2);return u.translate(0,s/2,0),u}const l=new Ia;if(t==="circ"){const u=e/2+o,d=n/2+o;for(let f=0;f<=64;f++){const p=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(p)*u,Math.sin(p)*d):l.lineTo(Math.cos(p)*u,Math.sin(p)*d)}}else{l.moveTo(r[0][0],r[0][1]);for(let u=1;u<r.length;u++)l.lineTo(r[u][0],r[u][1]);l.closePath()}const c=new io(l,{depth:s,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function F1(r,t,e,n,s,o,l,c,u,d,f,p,_){const m=(y,g)=>{const v=Math.max(0,Math.min(1,(y+e/2)/e)),S=Math.max(0,Math.min(1,(g+n/2)/n)),w=v*(u-1),P=S*(u-1),N=Math.min(u-2,Math.floor(w)),O=Math.min(u-2,Math.floor(P)),k=w-N,H=P-O,I=c[O*u+N]*(1-k)*(1-H)+c[O*u+N+1]*k*(1-H)+c[(O+1)*u+N]*(1-k)*H+c[(O+1)*u+N+1]*k*H;return p+(I-d)/f*_};return t==="rect"||t==="sq"?o?H1(e,n,s,l):V1(e,n,s,u,c,d,f,p,_):G1(r,s,o?()=>l:m)}function H1(r,t,e,n){const s=(o,l,c,u,d)=>{const f=new Ne(new un(o,l,c));return f.position.set(u,l/2,d),f};return[s(r+e*2,n,e,0,t/2+e/2),s(r+e*2,n,e,0,-t/2-e/2),s(e,n,t,r/2+e/2,0),s(e,n,t,-r/2-e/2,0)]}function V1(r,t,e,n,s,o,l,c,u){const d=(S,w)=>c+(s[w*n+S]-o)/l*u,f=Math.min(n-1,64),p=S=>Math.round(S/f*(n-1)),_=d(0,n-1),m=d(n-1,n-1),x=d(0,0),y=d(n-1,0),g=[[-r/2-e,t/2,_],...Array.from({length:f+1},(S,w)=>{const P=p(w);return[-r/2+P/(n-1)*r,t/2,d(P,n-1)]}),[r/2+e,t/2,m]],v=[[r/2+e,-t/2,y],...Array.from({length:f+1},(S,w)=>{const P=p(w);return[r/2-P/(n-1)*r,-t/2,d(n-1-P,0)]}),[-r/2-e,-t/2,x]];return[Fs(g,[0,0,1],e),Fs(v,[0,0,-1],e),Fs(Array.from({length:f+1},(S,w)=>{const P=p(w);return[r/2,t/2-P/(n-1)*t,d(n-1,n-1-P)]}),[1,0,0],e),Fs(Array.from({length:f+1},(S,w)=>{const P=p(w);return[-r/2,-t/2+P/(n-1)*t,d(0,P)]}),[-1,0,0],e)]}function G1(r,t,e){const n=[],s=r.length;for(let o=0;o<s;o++){const[l,c]=r[o],[u,d]=r[(o+1)%s],f=u-l,p=d-c,_=Math.sqrt(f*f+p*p);if(_<.5)continue;const m=p/_,x=-f/_,y=Math.max(2,Math.round(_/3)),g=[];for(let v=0;v<=y;v++){const S=v/y,w=l+f*S,P=c+p*S;g.push([w,P,e(w,P)])}n.push(Fs(g,[m,0,x],t))}return n}function Fs(r,t,e){const n=r.length,[s,,o]=t,l=[],c=[];for(const[m,x,y]of r)l.push(m+s*e,0,x+o*e),l.push(m+s*e,y,x+o*e);for(const[m,x,y]of r)l.push(m,0,x),l.push(m,y,x);for(const[m,x,y]of r)l.push(m+s*e,y,x+o*e),l.push(m,y,x);for(const[m,x]of r)l.push(m+s*e,0,x+o*e),l.push(m,0,x);const u=0,d=n*2,f=n*4,p=n*6;for(let m=0;m<n-1;m++){const x=m*2;c.push(u+x,u+x+2,u+x+1,u+x+1,u+x+2,u+x+3),c.push(d+x,d+x+1,d+x+2,d+x+1,d+x+3,d+x+2),c.push(f+x,f+x+1,f+x+2,f+x+1,f+x+3,f+x+2),c.push(p+x,p+x+2,p+x+1,p+x+1,p+x+2,p+x+3)}const _=new Oe;return _.setAttribute("position",new _e(l,3)),_.setIndex(c),_.computeVertexNormals(),new Ne(_)}async function W1(r){const t=`${r.minLat}|${r.maxLat}|${r.minLon}|${r.maxLon}`;if(t===Md)return;const e=`(${r.minLat},${r.minLon},${r.maxLat},${r.maxLon})`,n=`[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${e};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${e};
  way["piste:type"]${e};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${e};
);
out geom;`,s=new AbortController,o=setTimeout(()=>s.abort(),45e3);let l;try{const u=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(n)}`,{signal:s.signal});clearTimeout(o),l=await u.json()}catch(u){throw clearTimeout(o),u}for(const u of Object.keys(qr))delete qr[u];const c=(u,d)=>{qr[u]||(qr[u]=[]),qr[u].push(d)};for(const u of l.elements)if(u.type==="way"){const d=u.tags??{},f=u.geometry??[];if(f.length<2)continue;if(d.highway){const _={motorway:"road_motorway",motorway_link:"road_motorway",trunk:"road_trunk",trunk_link:"road_trunk",primary:"road_primary",primary_link:"road_primary",secondary:"road_secondary",secondary_link:"road_secondary",tertiary:"road_tertiary",tertiary_link:"road_tertiary",unclassified:"road_unclassified",living_street:"street_living",residential:"street_residential"}[d.highway];_&&c(_,f)}d.railway&&c({narrow_gauge:"rail_narrow",rail:"rail_standard",light_rail:"rail_light",funicular:"rail_funicular",monorail:"rail_monorail",tram:"rail_tram",subway:"rail_subway"}[d.railway]??"rail_unknown",f),d["piste:type"]&&c({easy:"piste_easy",novice:"piste_novice",intermediate:"piste_intermediate",advanced:"piste_advanced",expert:"piste_expert",freeride:"piste_freeride"}[d["piste:difficulty"]??""]??"piste_other",f)}else if(u.type==="relation"){const d=u.tags??{},f=d.route??"",p=d.network??"",_=(u.members??[]).filter(g=>g.type==="way"&&(g.geometry?.length??0)>=2).map(g=>g.geometry);if(!_.length)continue;const x={hiking:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},foot:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},bicycle:{icn:"cycling_icn",ncn:"cycling_ncn",rcn:"cycling_rcn",lcn:"cycling_lcn"},mtb:{"":"mtb_local"},horse:{ihwn:"equestrian_iwn",nhwn:"equestrian_nwn",rhwn:"equestrian_rwn",lhwn:"equestrian_lwn"}}[f];if(!x)continue;let y;if(f==="mtb"){const g=d["mtb:scale"]??"";y=g?`mtb_${g}`:"mtb_local"}else y=x[p]??Object.values(x).at(-1);for(const g of _)c(y,g)}Md=t,Oc()}function Td(r,t){xa[r]=t,Oc()}function Oc(){if(jr){fn?.remove(jr);const f=ki.indexOf(jr);f>=0&&ki.splice(f,1),jr=null}if(!Je||!fn)return;const{grid:r,minE:t,elevRange:e,bounds:n}=Je,s=ps,o=Oa,l=ka,c=Ic,u=Dc,d=new Jr;for(const[f,p]of Object.entries(qr)){if(xa[f]===!1)continue;const _=Z1(f),m=new Ra({color:_});for(const x of p){const y=[];for(const g of x){const v=(g.lon-n.minLon)/(n.maxLon-n.minLon),S=(g.lat-n.minLat)/(n.maxLat-n.minLat);if(v<0||v>1||S<0||S>1)continue;const w=(v-.5)*o,P=(.5-S)*l,N=v*(s-1),O=(1-S)*(s-1),k=Math.min(s-2,Math.floor(N)),H=Math.min(s-2,Math.floor(O)),I=N-k,R=O-H,W=r[H*s+k]*(1-I)*(1-R)+r[H*s+k+1]*I*(1-R)+r[(H+1)*s+k]*(1-I)*R+r[(H+1)*s+k+1]*I*R;y.push(new J(w,c+(W-t)/e*u+.6,P))}y.length>=2&&d.add(new Ec(new Oe().setFromPoints(y),m))}}d.children.length>0&&(fn.add(d),ki.push(d),jr=d)}function Z1(r){return r.startsWith("road_motorway")?14820122:r.startsWith("road_trunk")?15041054:r.startsWith("road_primary")?16110375:r.startsWith("road_secondary")?13951528:r.startsWith("road_tertiary")?11184810:r.startsWith("road_")?13421772:r.startsWith("street_")?14540253:r.startsWith("rail_")?5592439:r.startsWith("hiking_")?16737792:r.startsWith("cycling_")?26316:r.startsWith("mtb_")?8930304:r.startsWith("equestrian_")?10053171:r.startsWith("piste_easy")?43775:r.startsWith("piste_novice")?52292:r.startsWith("piste_intermediate")?13378082:r.startsWith("piste_")?2236962:8947848}function X1(r,t){const e=new Ia;switch(r){case"square":e.moveTo(-t,-t),e.lineTo(t,-t),e.lineTo(t,t),e.lineTo(-t,t),e.closePath();break;case"diamond":e.moveTo(0,-t),e.lineTo(t*.72,0),e.lineTo(0,t),e.lineTo(-t*.72,0),e.closePath();break;case"triangle":e.moveTo(0,t),e.lineTo(t*.866,-t*.5),e.lineTo(-t*.866,-t*.5),e.closePath();break;case"cross":{const n=t*.32;e.moveTo(-n,-t),e.lineTo(n,-t),e.lineTo(n,-n),e.lineTo(t,-n),e.lineTo(t,n),e.lineTo(n,n),e.lineTo(n,t),e.lineTo(-n,t),e.lineTo(-n,n),e.lineTo(-t,n),e.lineTo(-t,-n),e.lineTo(-n,-n),e.closePath();break}case"heart":{e.moveTo(0,-t*.25),e.bezierCurveTo(-t*.05,-t*.55,-t,-t*.55,-t,t*.1),e.bezierCurveTo(-t,t*.65,-t*.45,t*.88,0,t),e.bezierCurveTo(t*.45,t*.88,t,t*.65,t,t*.1),e.bezierCurveTo(t,-t*.55,t*.05,-t*.55,0,-t*.25),e.closePath();break}case"star":{const n=t,s=t*.42;for(let o=0;o<10;o++){const l=o*Math.PI/5-Math.PI/2,c=o%2===0?n:s,u=Math.cos(l)*c,d=Math.sin(l)*c;o===0?e.moveTo(u,d):e.lineTo(u,d)}e.closePath();break}default:e.absarc(0,0,t,0,Math.PI*2,!1);break}return e}function ep(r,t,e){if(!Je||!fn)return;const{grid:n,minE:s,elevRange:o}=Je,l=ps,c=Oa,u=ka,d=Ic,f=Dc,p=t,_=1-r,m=(p-.5)*c,x=(.5-(1-_))*u,y=Math.max(0,Math.min(l-2,p*(l-1))),g=Math.max(0,Math.min(l-2,_*(l-1))),v=Math.floor(y),S=Math.floor(g),w=y-v,P=g-S,N=n[S*l+v]*(1-w)*(1-P)+n[S*l+v+1]*w*(1-P)+n[(S+1)*l+v]*(1-w)*P+n[(S+1)*l+v+1]*w*P,O=d+(N-s)/o*f,k=4.5,H=On.gpx??6,I=Se[H]??"#ff4500",R=new Zs({color:I,side:dn}),W=X1(e,k),U=new io(W,{depth:.5,bevelEnabled:!1});U.rotateX(-Math.PI/2);const F=new Ne(U,R);F.position.set(m,O+.25,x),F.visible=so.gpx??!0,Yr(F),vi.push(F)}function q1(r,t,e,n,s,o,l,c,u,d){const f=[];for(const x of r){const y=Math.max(5e-4,Math.min(.9995,(x.lon-t.minLon)/(t.maxLon-t.minLon))),g=Math.max(5e-4,Math.min(.9995,(x.lat-t.minLat)/(t.maxLat-t.minLat))),v=(y-.5)*e,S=(.5-g)*n,w=y*(o-1),P=(1-g)*(o-1),N=Math.min(o-2,Math.floor(w)),O=Math.min(o-2,Math.floor(P)),k=w-N,H=P-O,I=s[O*o+N]*(1-k)*(1-H)+s[O*o+N+1]*k*(1-H)+s[(O+1)*o+N]*(1-k)*H+s[(O+1)*o+N+1]*k*H,R=jf*.2,W=new J(v,u+(I-l)/c*d+R,S);f.length>0&&W.distanceTo(f[f.length-1])<.08||f.push(W)}if(f.length<2)return null;const p=On.gpx_line??6,_=Se[p]??"#ff4500",m=qf*.21;if(m>=.1){const x=new vf(f,!1,"centripetal"),y=Math.min(1200,f.length*8),g=new Cc(x,y,m,8,!1);return new Ne(g,new Zs({color:_}))}return new Ec(new Oe().setFromPoints(f),new Ra({color:_}))}function j1(r){const t=parseInt(r.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function Y1(r){const t=On.terrain??1,[e,n,s]=j1(Se[t]??Se[1]),o=.78+r*.44;return[Math.min(255,Math.round(e*o)),Math.min(255,Math.round(n*o)),Math.min(255,Math.round(s*o))]}async function $1(r){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=s=>{s.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:s.data.elevGrid,minE:s.data.minE,elevRange:s.data.elevRange,bounds:r})):s.data.type==="ERROR"&&(n.terminate(),e(new Error(s.data.message)))},n.onerror=s=>{n.terminate(),e(s)},n.postMessage({type:"BUILD_TERRAIN",bounds:r,GRID:ps,elevZoom:12})})}function Yr(r){fn.add(r),ki.push(r)}function Wr(r,t){const e=document.getElementById(r);e&&(e.textContent=t)}function K1(){ki.forEach(r=>{fn.remove(r),r.geometry?.dispose()}),ki=[],es.length=0}function J1(){if(!Ln||!Zn)return;const r=Zn.domElement.clientWidth,t=Zn.domElement.clientHeight;if(!(!r||!t))for(const{id:e,v:n}of es){const s=document.getElementById(e);if(!s)continue;const o=n.clone().project(Ln);if(o.z>1){s.style.opacity="0";continue}s.style.opacity="1",s.style.left=`${(o.x+1)/2*r}px`,s.style.top=`${-(o.y-1)/2*t}px`}}const Q1=.05;function tw(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function ew(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function kc(){if(!yt.bounds){Kl("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(yt.generating)return;yt.generating=!0;const r=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");r.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),ol(!0);try{const n=document.getElementById("c3d");await Pc(n);const s=Rd(),{bounds:o,wMm:l,dMm:c}=yt,{minLat:u,maxLat:d,minLon:f,maxLon:p}=o,_=(u+d)/2,m=(f+p)/2,x=(p-f)*Math.cos(_*Math.PI/180)*111320;yt.mmPerMeter=l/x,yt.BASE_H=s.baseH,Mi(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const y=s.terrainRes,g=await new Promise((H,I)=>{const R=tw();R.onmessage=U=>{U.data.type==="PROGRESS"?Mi(5+U.data.pct*.2,"ÉLÉVATION","Altitude…"):U.data.type==="TERRAIN_READY"?(R.terminate(),H(U.data)):U.data.type==="ERROR"&&(R.terminate(),I(new Error(U.data.message)))},R.onerror=U=>{R.terminate(),I(U)};const W={type:"BUILD_TERRAIN",bounds:o,GRID:y,elevZoom:s.elevZoom};R.postMessage(W)});yt.elevGrid=g.elevGrid,yt.GRID=g.GRID,yt.minE=g.minE,yt.elevRange=g.elevRange;const S=(d-u)*111320,w=Math.max(x,S),P=Math.max(l,c),N=g.elevRange/w*P*s.exag;yt.elevScaleMm=Math.max(1,Math.min(P*.5,N)),s.smooth>0&&nw(yt.elevGrid,y,s.smooth),Mi(30,"DONNÉES","Chargement des données cartographiques…");const O=await y1(o,H=>{Mi(30+H*.3,"DONNÉES","Données carto…")});Mi(60,"GÉOMÉTRIE","Génération des géométries 3D…");const k=await new Promise((H,I)=>{const R=ew();R.onmessage=U=>{U.data.type==="GEO_PROGRESS"?Mi(60+U.data.pct*.35,"GÉOMÉTRIE",`${U.data.step}…`):U.data.type==="GEOMETRY_READY"?(R.terminate(),H(U.data)):U.data.type==="ERROR"&&(R.terminate(),I(new Error(U.data.message)))},R.onerror=U=>{R.terminate(),I(U)};const W={type:"BUILD_GEOMETRY",elevGrid:yt.elevGrid,GRID:yt.GRID,wMm:l,dMm:c,BASE_H:yt.BASE_H,MIN_SURF:Q1,elevScaleMm:yt.elevScaleMm,minE:yt.minE,elevRange:yt.elevRange,features:O,gpxPoints:yt.gpxPoints,bounds:o,settings:s,zoneType:yt.zoneType,zonePts:yt.zonePts,mmPerMeter:yt.mmPerMeter};R.postMessage(W)});Mi(95,"SCÈNE","Construction de la scène 3D…"),Sb(k),Mi(100,"TERMINÉ","Modèle 3D prêt."),yt.generated=!0,yt.generating=!1,setTimeout(()=>{ol(!1),document.getElementById("hint3d").style.display="block",iw(g.minE,g.maxE,yt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){yt.generating=!1,ol(!1),Kl("ERREUR",String(n)),console.error(n)}finally{r.disabled=!1}}function nw(r,t,e){const n=new Float32Array(r.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,u=0;for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){const p=o+d,_=l+f;p>=0&&p<t&&_>=0&&_<t&&(c+=r[p*t+_],u++)}n[o*t+l]=c/u}r.set(n)}}function iw(r,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(r)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function rw(){const r=document.getElementById("zone-footer");r&&(yt.bounds?(r.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),D1()):(r.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}let Ma=!1,$l=!1;function ao(){const r=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:r("dp-w",yt.wMm||200),dMm:r("dp-d",yt.dMm||200),baseH:r("dp-base",5),exag:r("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:r("dp-walls",2),gpxPoints:yt.gpxPoints,zoneType:yt.zoneType,zonePts:yt.zonePts,bounds:yt.bounds}}function np(){const r=(_,m)=>{const x=document.getElementById(_);x&&(x.value=String(Math.round(m)))};if(!yt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:s}=yt.bounds,o=(t+e)/2,l=(s-n)*Math.cos(o*Math.PI/180)*111320,c=(e-t)*111320,u=200,d=l/c,f=d>=1?u:Math.max(10,Math.round(u*d)),p=d<1?u:Math.max(10,Math.round(u/d));yt.wMm=f,yt.dMm=p,r("dp-w",f),r("dp-d",p)}function mr(){const r=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=document.getElementById("dp-layers-hint"),o=document.getElementById("dp-wall-mm");s&&(s.textContent=`${Math.round(r/e)} couches`),o&&(o.textContent=`${(t*n).toFixed(2)} mm`)}async function _c(){if(!yt.bounds||$l)return;$l=!0;const r=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");r.classList.remove("hidden");try{await I1(yt.bounds,ao(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{r.classList.add("hidden"),$l=!1}}function Ua(){yt.bounds&&(np(),mr(),requestAnimationFrame(()=>{const r=document.getElementById("dims-view");Ma?(wa(r),_c()):(Ma=!0,wa(r),_c())}))}window.dpToggle=r=>{document.getElementById(r)?.classList.toggle("open")};am();um(rw);document.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.tab;if(!(!t||r.disabled)&&(hr(t),t==="params"?Ua():t==="colors"?ip():$f(),t==="render")){const e=document.getElementById("c3d");e&&Pc(e)}})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),hr("colors"),ip()});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),hr("render");const r=document.getElementById("c3d");r&&Pc(r),kc()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{$f(),hr("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{hr("params"),Ua()});document.getElementById("btn-back-params")?.addEventListener("click",()=>{hr("params"),Ua()});document.getElementById("btn-gen")?.addEventListener("click",kc);document.getElementById("btn-stl")?.addEventListener("click",()=>Zf("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>w1());document.querySelectorAll(".dp-sh").forEach(r=>{r.addEventListener("click",()=>{r.closest(".dp-sec")?.classList.toggle("open")})});let Ad;const sw=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];sw.forEach(r=>{document.getElementById(r)?.addEventListener("input",()=>{mr();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(yt.wMm=t),e>0&&(yt.dMm=e),clearTimeout(Ad),Ad=setTimeout(()=>oo(ao()),500)})});document.getElementById("dp-walls")?.addEventListener("input",mr);document.getElementById("dp-flat")?.addEventListener("change",()=>{oo(ao())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>{if(!yt.generated){Kl("INFO",`Générez d'abord le modèle 3D dans l'onglet "Générer & Exporter".`);return}Zf("terrain3d.stl")});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{yt.bounds&&(hr("params"),Ua())});let Ld;document.querySelectorAll("#params-col input, #params-col select").forEach(r=>{r.addEventListener("change",()=>{clearTimeout(Ld),Ld=setTimeout(()=>{yt.generated&&yt.tg&&kc()},700)}),r.addEventListener("input",()=>{if(r.type==="range"){const t=document.getElementById(`${r.id}-v`);t&&(t.textContent=r.value)}})});function ip(){yt.bounds&&(np(),requestAnimationFrame(()=>{const r=document.getElementById("colors-3d-area");Ma?(wa(r),oo(ao())):(Ma=!0,wa(r),_c()),ow()}))}function ow(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(r=>{const t=Number(r.dataset.slot);Se[t]&&(r.style.background=Se[t])}),document.querySelectorAll(".cp-sw-inner").forEach(r=>{const e=r.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(r.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(r=>{const t=Number(r.dataset.slot);r.addEventListener("input",()=>{const n=r.value,s=r.nextElementSibling;s&&(s.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(o=>{o.style.background=n}),pr({[t]:n})});const e=r.nextElementSibling;e&&(e.style.background=r.value)});function aw(r,t){pr({[r]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${r}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${r}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let Zr=null;function lw(r,t){Zr&&(Zr.remove(),Zr=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(Se).map(Number).sort((c,u)=>c-u),s=On[r]??Number(t.dataset.slot)??1;n.forEach(c=>{const u=document.createElement("div");u.className="cp-slot-pick-item"+(c===s?" active":""),u.style.setProperty("--sw",Se[c]??"#888"),u.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,u.addEventListener("click",d=>{d.stopPropagation(),E1(r,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=Se[c]??"#888",e.remove(),Zr=null}),e.appendChild(u)}),document.body.appendChild(e),Zr=e;const o=t.getBoundingClientRect();e.style.left=`${o.left}px`,e.style.top=`${o.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),Zr=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const n=r.closest(".cp-layer")?.dataset.layer??"";n&&lw(n,r)})});let Xr=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(Xr){Xr.remove(),Xr=null;return}const r=Math.max(...Object.keys(Se).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,Xr=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),Xr=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const s=e.value;Se[r]=s;const o=document.createElement("label");o.className="cp-swatch",o.dataset.slot=String(r),o.title=`Couleur ${r}`,o.innerHTML=`<input type="color" class="cp-color-input" data-slot="${r}" value="${s}"><div class="cp-sw-inner" style="background:${s}"><span class="cp-sw-num">${r}</span></div>`,o.querySelector(".cp-color-input").addEventListener("input",function(){aw(r,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(o),t.remove(),Xr=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete Se[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{pr({})});document.querySelectorAll(".cp-eye").forEach(r=>{const t=r.dataset.layer;t&&r.addEventListener("click",()=>{r.classList.toggle("hidden-layer");const e=!r.classList.contains("hidden-layer");Kf(t,e)})});const rp={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const r=document.getElementById("cp-preset").value,t=rp[r];t&&(pr(t),Object.entries(t).forEach(([e,n])=>{const s=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(s){s.value=n;const o=s.nextElementSibling;o&&(o.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const cw=document.getElementById("cp-dd-trigger"),Uc=document.getElementById("cp-dd-menu");cw?.addEventListener("click",r=>{r.stopPropagation(),Uc?.classList.toggle("open")});document.addEventListener("click",()=>Uc?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const e=r.dataset.preset??"",n=r.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),r.classList.add("cp-dd-active");const s=document.getElementById("cp-dd-label");s&&(s.textContent=n),Uc?.classList.remove("open");const o=rp[e];o&&(pr(o),uw(o))})});function uw(r){Object.entries(r).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const s=n.nextElementSibling;s&&(s.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);r[e]&&(t.style.background=r[e])})}const zc=document.getElementById("cp-layer-detail"),sp=document.getElementById("ldp-title"),op=document.getElementById("ldp-icon"),ap=document.getElementById("ldp-content");function hw(r,t,e){sp.textContent=t,op.innerHTML=e,ap.innerHTML=dw(r),zc.classList.add("open"),vw(r)}function lp(){zc.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",lp);document.querySelectorAll(".cp-layer-nav").forEach(r=>{r.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=r.dataset.type??"land_cover",n=r.querySelector(".cp-layer-name")?.textContent??"Couche",s=r.querySelector(".cp-layer-ico")?.innerHTML??"";hw(e,n,s)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{sp.textContent="Nouvelle couche",op.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',ap.innerHTML=_w(),zc.classList.add("open"),yw()});function dw(r){return r==="markers"?fw():r==="lines"?mw():gw()}function fw(){return`
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
        <input type="number" class="ldp-num" id="ldp-marker-offset" value="2" step="1" min="0">
        <span class="ldp-unit" id="ldp-offset-mm">( 0.40 mm )</span>
      </div>
    </div>
  </div>
  <div class="ldp-sec">
    <div class="ldp-sec-header"><span class="ldp-sec-title">Marqueurs placés</span></div>
    <div id="ldp-marker-list" class="ldp-marker-list"><div class="ldp-empty">Aucun marqueur placé</div></div>
  </div>`}const pw=[{label:"Itinéraires de randonnée",cats:[{key:"hiking_iwn",label:"International"},{key:"hiking_nwn",label:"National"},{key:"hiking_rwn",label:"Régional"},{key:"hiking_lwn",label:"Local"}]},{label:"Itinéraires cyclables",cats:[{key:"cycling_icn",label:"International"},{key:"cycling_ncn",label:"National"},{key:"cycling_rcn",label:"Régional"},{key:"cycling_lcn",label:"Local"}]},{label:"Parcours de VTT",cats:[{key:"mtb_0",label:"International"},{key:"mtb_1",label:"National"},{key:"mtb_2",label:"Régional"},{key:"mtb_local",label:"Local"}]},{label:"Itinéraires équestres",cats:[{key:"equestrian_iwn",label:"International"},{key:"equestrian_nwn",label:"National"},{key:"equestrian_rwn",label:"Régional"},{key:"equestrian_lwn",label:"Local"}]},{label:"Sports d'hiver",cats:[{key:"piste_easy",label:"Facile"},{key:"piste_novice",label:"Novice"},{key:"piste_intermediate",label:"Intermédiaire"},{key:"piste_advanced",label:"Avancé"},{key:"piste_expert",label:"Expert"},{key:"piste_freeride",label:"Freeride"},{key:"piste_other",label:"Autre difficulté"},{key:"piste_none",label:"Sans difficulté"}]},{label:"Routes",cats:[{key:"road_motorway",label:"Autoroute"},{key:"road_trunk",label:"Voie express"},{key:"road_primary",label:"Route nationale"},{key:"road_secondary",label:"Route départementale"},{key:"road_tertiary",label:"Voie tertiaire"},{key:"road_unclassified",label:"Non classifiée"}]},{label:"Rues",cats:[{key:"street_living",label:"Zone de rencontre"},{key:"street_residential",label:"Rue résidentielle"}]},{label:"Rails",cats:[{key:"rail_narrow",label:"Voie étroite"},{key:"rail_standard",label:"Voie standard"},{key:"rail_unknown",label:"Inconnue"},{key:"rail_funicular",label:"Funiculaire"},{key:"rail_light",label:"Tramway rapide"},{key:"rail_monorail",label:"Monorail"},{key:"rail_tram",label:"Tramway"},{key:"rail_subway",label:"Métro"}]}];function mw(){const r='<svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg>';return`
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
    <div id="ldp-line-groups">${pw.map(e=>{const n=e.cats.every(o=>xa[o.key]===!0),s=e.cats.map(o=>{const l=xa[o.key]===!0;return`<label class="ldp-sub-row"><input type="checkbox" class="ldp-line-sub" data-linecat="${o.key}"${l?" checked":""}> ${o.label}</label>`}).join("");return`
    <div class="ldp-line-group">
      <div class="ldp-line-group-header">
        <label><input type="checkbox" class="ldp-line-group-chk" data-group="${e.label}"${n?" checked":""}> <span>${e.label}</span></label>
        <button class="ldp-chev-btn" title="Afficher sous-catégories">${r}</button>
      </div>
      <div class="ldp-line-subs">${s}</div>
    </div>`}).join("")}</div>
    <div id="ldp-line-status" class="ldp-line-status"></div>
  </div>`}function gw(){return`
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Paramètres</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nombre de calques)</span>
        <button class="cp-icon-btn cp-info-btn" title="Décalage vertical en nombre de couches">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-lc-offset" value="0" step="1" min="0">
        <span class="ldp-unit">( 0,00 mm )</span>
      </div>
    </div>
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
  </div>`}function vw(r){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(r==="markers"){const n=document.getElementById("ldp-marker-size"),s=document.getElementById("ldp-marker-size-n"),o=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),c=document.getElementById("ldp-marker-rot-n"),u=document.getElementById("ldp-marker-offset"),d=document.getElementById("ldp-offset-mm"),f=()=>{o&&(o.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},p=()=>{d&&(d.textContent=`( ${(Number(u.value||0)*e).toFixed(2)} mm )`)};n?.addEventListener("input",()=>{s.value=Number(n.value).toFixed(1),f()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),f()}),l?.addEventListener("input",()=>{c&&(c.value=l.value)}),c?.addEventListener("input",()=>{l&&(l.value=c.value)}),u?.addEventListener("input",p),f(),p(),Fc(),document.querySelectorAll(".ldp-shape-btn").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(x=>x.classList.remove("active")),_.classList.add("active");const m=_.dataset.shape??"circle";A1(m),Bc(!0)})})}if(r==="lines"){const n=document.getElementById("ldp-line-w"),s=document.getElementById("ldp-line-w-n"),o=document.getElementById("ldp-line-offset"),l=()=>{const u=Math.max(.1,Number(n?.value??1)||1),d=Number(o?.value??1)||1;T1(u,d);const f=ao();f&&oo(f)};n?.addEventListener("input",()=>{s&&(s.value=Number(n.value).toFixed(1)),l()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),l()}),o?.addEventListener("input",l),document.querySelectorAll(".ldp-chev-btn").forEach(u=>{u.addEventListener("click",()=>{u.closest(".ldp-line-group")?.classList.toggle("open")})});const c=()=>{if(!yt.bounds)return;const u=document.getElementById("ldp-line-status");u&&(u.textContent="Chargement des données…"),W1(yt.bounds).then(()=>{u&&(u.textContent="")}).catch(()=>{u&&(u.textContent="Erreur de chargement.")})};document.querySelectorAll(".ldp-line-sub").forEach(u=>{u.addEventListener("change",()=>{Td(u.dataset.linecat,u.checked),u.checked&&c();const d=u.closest(".ldp-line-group"),f=d?.querySelector(".ldp-line-group-chk");if(f){const p=d.querySelectorAll(".ldp-line-sub");f.checked=Array.from(p).every(_=>_.checked),f.indeterminate=!f.checked&&Array.from(p).some(_=>_.checked)}})}),document.querySelectorAll(".ldp-line-group-chk").forEach(u=>{u.addEventListener("change",()=>{u.closest(".ldp-line-group")?.querySelectorAll(".ldp-line-sub").forEach(f=>{f.checked=u.checked,Td(f.dataset.linecat,u.checked)}),u.checked&&c()})})}}function yw(){document.getElementById("ldp-new-type")?.addEventListener("change",r=>{const t=r.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",lp),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const r=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=r[(r.indexOf(t)+1)%r.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=Se[e]??"#888"})}const os=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{os.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{os.classList.add("hidden")});os?.addEventListener("click",r=>{r.target===os&&os.classList.add("hidden")});const Sa=document.getElementById("ps-layer-h"),Ea=document.getElementById("ps-wall-w"),cp=document.getElementById("ps-layer-h-val"),up=document.getElementById("ps-wall-w-val");Sa?.addEventListener("input",()=>{cp.textContent=Number(Sa.value).toFixed(2),mr()});Ea?.addEventListener("input",()=>{up.textContent=Number(Ea.value).toFixed(2),mr()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{os.classList.add("hidden"),mr()});document.getElementById("ps-reset")?.addEventListener("click",()=>{Sa&&(Sa.value="0.20",cp.textContent="0.20"),Ea&&(Ea.value="0.42",up.textContent="0.42"),mr()});function Bc(r){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=r?"block":"none"}let hp=0,dp=0;document.getElementById("dims-canvas")?.addEventListener("pointerdown",r=>{hp=r.clientX,dp=r.clientY});document.getElementById("dims-canvas")?.addEventListener("click",r=>{if(!Qf())return;const t=r.clientX-hp,e=r.clientY-dp;t*t+e*e<25&&L1(r.clientX,r.clientY)>=0&&(Bc(!1),Fc())});document.addEventListener("keydown",r=>{r.key==="Escape"&&Qf()&&(Jf(),Bc(!1))});const xw={circle:"Rond",square:"Carré",diamond:"Losange",triangle:"Triangle",cross:"Croix",heart:"Cœur",star:"Étoile"},Cd={circle:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>',square:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>',diamond:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>',triangle:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>',cross:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>',heart:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>',star:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'},bw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>',ww='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>';function Fc(){const r=document.getElementById("ldp-marker-list");if(!r)return;const t=C1();if(!t.length){r.innerHTML='<div class="ldp-empty">Aucun marqueur placé</div>';return}r.innerHTML=t.map(e=>`
    <div class="ldp-marker-row" data-marker-id="${e.id}">
      <svg class="ldp-marker-ico" viewBox="0 0 16 16">${Cd[e.shape]??Cd.circle}</svg>
      <span class="ldp-marker-lbl">${xw[e.shape]??e.shape}</span>
      <button class="cp-eye ldp-m-eye${e.visible?" active":""}" data-mid="${e.id}" title="Visibilité">${bw}</button>
      <button class="cp-del ldp-m-del" data-mid="${e.id}" title="Supprimer">${ww}</button>
    </div>`).join(""),r.querySelectorAll(".ldp-m-eye").forEach(e=>{e.addEventListener("click",()=>{const n=Number(e.dataset.mid),s=!e.classList.contains("active");P1(n,s),e.classList.toggle("active",s)})}),r.querySelectorAll(".ldp-m-del").forEach(e=>{e.addEventListener("click",()=>{R1(Number(e.dataset.mid)),Fc()})})}document.querySelectorAll(".cp-del:not(.ldp-m-del)").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const e=r.closest(".cp-layer");if(!e)return;const n=e.dataset.layer;n&&Kf(n,!1),e.remove()})});
