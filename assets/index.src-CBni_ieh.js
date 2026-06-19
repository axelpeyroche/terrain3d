(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function gm(){document.getElementById("app").innerHTML=`

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
`}function Ei(i,t,e){const n=u=>document.getElementById(u),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${i}%`);const c=n("pp");c&&(c.textContent=`${Math.round(i)}%`)}function ll(i){const t=document.getElementById("prog");t&&(t.style.display=i?"flex":"none")}function Ql(i,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=i,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function hr(i){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===i)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${i}`))}window.ts=i=>{document.getElementById(`sb-${i}`)?.classList.toggle("h"),document.getElementById(`ca-${i}`)?.classList.toggle("o")};window.ev=i=>{i.stopPropagation()};var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function zd(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var tc={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(i,t){(function(e,n){n(t)})(Bs,function(e){var n="1.9.4";function s(r){var a,d,b,T;for(d=1,b=arguments.length;d<b;d++){T=arguments[d];for(a in T)r[a]=T[a]}return r}var o=Object.create||function(){function r(){}return function(a){return r.prototype=a,new r}}();function l(r,a){var d=Array.prototype.slice;if(r.bind)return r.bind.apply(r,d.call(arguments,1));var b=d.call(arguments,2);return function(){return r.apply(a,b.length?b.concat(d.call(arguments)):arguments)}}var c=0;function u(r){return"_leaflet_id"in r||(r._leaflet_id=++c),r._leaflet_id}function h(r,a,d){var b,T,z,Y;return Y=function(){b=!1,T&&(z.apply(d,T),T=!1)},z=function(){b?T=arguments:(r.apply(d,arguments),setTimeout(Y,a),b=!0)},z}function f(r,a,d){var b=a[1],T=a[0],z=b-T;return r===b&&d?r:((r-T)%z+z)%z+T}function p(){return!1}function _(r,a){if(a===!1)return r;var d=Math.pow(10,a===void 0?6:a);return Math.round(r*d)/d}function m(r){return r.trim?r.trim():r.replace(/^\s+|\s+$/g,"")}function x(r){return m(r).split(/\s+/)}function y(r,a){Object.prototype.hasOwnProperty.call(r,"options")||(r.options=r.options?o(r.options):{});for(var d in a)r.options[d]=a[d];return r.options}function g(r,a,d){var b=[];for(var T in r)b.push(encodeURIComponent(d?T.toUpperCase():T)+"="+encodeURIComponent(r[T]));return(!a||a.indexOf("?")===-1?"?":"&")+b.join("&")}var v=/\{ *([\w_ -]+) *\}/g;function S(r,a){return r.replace(v,function(d,b){var T=a[b];if(T===void 0)throw new Error("No value provided for variable "+d);return typeof T=="function"&&(T=T(a)),T})}var w=Array.isArray||function(r){return Object.prototype.toString.call(r)==="[object Array]"};function P(r,a){for(var d=0;d<r.length;d++)if(r[d]===a)return d;return-1}var N="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function O(r){return window["webkit"+r]||window["moz"+r]||window["ms"+r]}var k=0;function H(r){var a=+new Date,d=Math.max(0,16-(a-k));return k=a+d,window.setTimeout(r,d)}var I=window.requestAnimationFrame||O("RequestAnimationFrame")||H,R=window.cancelAnimationFrame||O("CancelAnimationFrame")||O("CancelRequestAnimationFrame")||function(r){window.clearTimeout(r)};function W(r,a,d){if(d&&I===H)r.call(a);else return I.call(window,l(r,a))}function U(r){r&&R.call(window,r)}var F={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:u,throttle:h,wrapNum:f,falseFn:p,formatNum:_,trim:m,splitWords:x,setOptions:y,getParamString:g,template:S,isArray:w,indexOf:P,emptyImageUrl:N,requestFn:I,cancelFn:R,requestAnimFrame:W,cancelAnimFrame:U};function A(){}A.extend=function(r){var a=function(){y(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},d=a.__super__=this.prototype,b=o(d);b.constructor=a,a.prototype=b;for(var T in this)Object.prototype.hasOwnProperty.call(this,T)&&T!=="prototype"&&T!=="__super__"&&(a[T]=this[T]);return r.statics&&s(a,r.statics),r.includes&&(Z(r.includes),s.apply(null,[b].concat(r.includes))),s(b,r),delete b.statics,delete b.includes,b.options&&(b.options=d.options?o(d.options):{},s(b.options,r.options)),b._initHooks=[],b.callInitHooks=function(){if(!this._initHooksCalled){d.callInitHooks&&d.callInitHooks.call(this),this._initHooksCalled=!0;for(var z=0,Y=b._initHooks.length;z<Y;z++)b._initHooks[z].call(this)}},a},A.include=function(r){var a=this.prototype.options;return s(this.prototype,r),r.options&&(this.prototype.options=a,this.mergeOptions(r.options)),this},A.mergeOptions=function(r){return s(this.prototype.options,r),this},A.addInitHook=function(r){var a=Array.prototype.slice.call(arguments,1),d=typeof r=="function"?r:function(){this[r].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(d),this};function Z(r){if(!(typeof L>"u"||!L||!L.Mixin)){r=w(r)?r:[r];for(var a=0;a<r.length;a++)r[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var nt={on:function(r,a,d){if(typeof r=="object")for(var b in r)this._on(b,r[b],a);else{r=x(r);for(var T=0,z=r.length;T<z;T++)this._on(r[T],a,d)}return this},off:function(r,a,d){if(!arguments.length)delete this._events;else if(typeof r=="object")for(var b in r)this._off(b,r[b],a);else{r=x(r);for(var T=arguments.length===1,z=0,Y=r.length;z<Y;z++)T?this._off(r[z]):this._off(r[z],a,d)}return this},_on:function(r,a,d,b){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(r,a,d)===!1){d===this&&(d=void 0);var T={fn:a,ctx:d};b&&(T.once=!0),this._events=this._events||{},this._events[r]=this._events[r]||[],this._events[r].push(T)}},_off:function(r,a,d){var b,T,z;if(this._events&&(b=this._events[r],!!b)){if(arguments.length===1){if(this._firingCount)for(T=0,z=b.length;T<z;T++)b[T].fn=p;delete this._events[r];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var Y=this._listens(r,a,d);if(Y!==!1){var ut=b[Y];this._firingCount&&(ut.fn=p,this._events[r]=b=b.slice()),b.splice(Y,1)}}},fire:function(r,a,d){if(!this.listens(r,d))return this;var b=s({},a,{type:r,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var T=this._events[r];if(T){this._firingCount=this._firingCount+1||1;for(var z=0,Y=T.length;z<Y;z++){var ut=T[z],mt=ut.fn;ut.once&&this.off(r,mt,ut.ctx),mt.call(ut.ctx||this,b)}this._firingCount--}}return d&&this._propagateEvent(b),this},listens:function(r,a,d,b){typeof r!="string"&&console.warn('"string" type argument expected');var T=a;typeof a!="function"&&(b=!!a,T=void 0,d=void 0);var z=this._events&&this._events[r];if(z&&z.length&&this._listens(r,T,d)!==!1)return!0;if(b){for(var Y in this._eventParents)if(this._eventParents[Y].listens(r,a,d,b))return!0}return!1},_listens:function(r,a,d){if(!this._events)return!1;var b=this._events[r]||[];if(!a)return!!b.length;d===this&&(d=void 0);for(var T=0,z=b.length;T<z;T++)if(b[T].fn===a&&b[T].ctx===d)return T;return!1},once:function(r,a,d){if(typeof r=="object")for(var b in r)this._on(b,r[b],a,!0);else{r=x(r);for(var T=0,z=r.length;T<z;T++)this._on(r[T],a,d,!0)}return this},addEventParent:function(r){return this._eventParents=this._eventParents||{},this._eventParents[u(r)]=r,this},removeEventParent:function(r){return this._eventParents&&delete this._eventParents[u(r)],this},_propagateEvent:function(r){for(var a in this._eventParents)this._eventParents[a].fire(r.type,s({layer:r.target,propagatedFrom:r.target},r),!0)}};nt.addEventListener=nt.on,nt.removeEventListener=nt.clearAllEventListeners=nt.off,nt.addOneTimeEventListener=nt.once,nt.fireEvent=nt.fire,nt.hasEventListeners=nt.listens;var ot=A.extend(nt);function q(r,a,d){this.x=d?Math.round(r):r,this.y=d?Math.round(a):a}var rt=Math.trunc||function(r){return r>0?Math.floor(r):Math.ceil(r)};q.prototype={clone:function(){return new q(this.x,this.y)},add:function(r){return this.clone()._add(at(r))},_add:function(r){return this.x+=r.x,this.y+=r.y,this},subtract:function(r){return this.clone()._subtract(at(r))},_subtract:function(r){return this.x-=r.x,this.y-=r.y,this},divideBy:function(r){return this.clone()._divideBy(r)},_divideBy:function(r){return this.x/=r,this.y/=r,this},multiplyBy:function(r){return this.clone()._multiplyBy(r)},_multiplyBy:function(r){return this.x*=r,this.y*=r,this},scaleBy:function(r){return new q(this.x*r.x,this.y*r.y)},unscaleBy:function(r){return new q(this.x/r.x,this.y/r.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=rt(this.x),this.y=rt(this.y),this},distanceTo:function(r){r=at(r);var a=r.x-this.x,d=r.y-this.y;return Math.sqrt(a*a+d*d)},equals:function(r){return r=at(r),r.x===this.x&&r.y===this.y},contains:function(r){return r=at(r),Math.abs(r.x)<=Math.abs(this.x)&&Math.abs(r.y)<=Math.abs(this.y)},toString:function(){return"Point("+_(this.x)+", "+_(this.y)+")"}};function at(r,a,d){return r instanceof q?r:w(r)?new q(r[0],r[1]):r==null?r:typeof r=="object"&&"x"in r&&"y"in r?new q(r.x,r.y):new q(r,a,d)}function j(r,a){if(r)for(var d=a?[r,a]:r,b=0,T=d.length;b<T;b++)this.extend(d[b])}j.prototype={extend:function(r){var a,d;if(!r)return this;if(r instanceof q||typeof r[0]=="number"||"x"in r)a=d=at(r);else if(r=tt(r),a=r.min,d=r.max,!a||!d)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=d.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(d.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(d.y,this.max.y)),this},getCenter:function(r){return at((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,r)},getBottomLeft:function(){return at(this.min.x,this.max.y)},getTopRight:function(){return at(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(r){var a,d;return typeof r[0]=="number"||r instanceof q?r=at(r):r=tt(r),r instanceof j?(a=r.min,d=r.max):a=d=r,a.x>=this.min.x&&d.x<=this.max.x&&a.y>=this.min.y&&d.y<=this.max.y},intersects:function(r){r=tt(r);var a=this.min,d=this.max,b=r.min,T=r.max,z=T.x>=a.x&&b.x<=d.x,Y=T.y>=a.y&&b.y<=d.y;return z&&Y},overlaps:function(r){r=tt(r);var a=this.min,d=this.max,b=r.min,T=r.max,z=T.x>a.x&&b.x<d.x,Y=T.y>a.y&&b.y<d.y;return z&&Y},isValid:function(){return!!(this.min&&this.max)},pad:function(r){var a=this.min,d=this.max,b=Math.abs(a.x-d.x)*r,T=Math.abs(a.y-d.y)*r;return tt(at(a.x-b,a.y-T),at(d.x+b,d.y+T))},equals:function(r){return r?(r=tt(r),this.min.equals(r.getTopLeft())&&this.max.equals(r.getBottomRight())):!1}};function tt(r,a){return!r||r instanceof j?r:new j(r,a)}function Ct(r,a){if(r)for(var d=a?[r,a]:r,b=0,T=d.length;b<T;b++)this.extend(d[b])}Ct.prototype={extend:function(r){var a=this._southWest,d=this._northEast,b,T;if(r instanceof it)b=r,T=r;else if(r instanceof Ct){if(b=r._southWest,T=r._northEast,!b||!T)return this}else return r?this.extend(wt(r)||Q(r)):this;return!a&&!d?(this._southWest=new it(b.lat,b.lng),this._northEast=new it(T.lat,T.lng)):(a.lat=Math.min(b.lat,a.lat),a.lng=Math.min(b.lng,a.lng),d.lat=Math.max(T.lat,d.lat),d.lng=Math.max(T.lng,d.lng)),this},pad:function(r){var a=this._southWest,d=this._northEast,b=Math.abs(a.lat-d.lat)*r,T=Math.abs(a.lng-d.lng)*r;return new Ct(new it(a.lat-b,a.lng-T),new it(d.lat+b,d.lng+T))},getCenter:function(){return new it((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new it(this.getNorth(),this.getWest())},getSouthEast:function(){return new it(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(r){typeof r[0]=="number"||r instanceof it||"lat"in r?r=wt(r):r=Q(r);var a=this._southWest,d=this._northEast,b,T;return r instanceof Ct?(b=r.getSouthWest(),T=r.getNorthEast()):b=T=r,b.lat>=a.lat&&T.lat<=d.lat&&b.lng>=a.lng&&T.lng<=d.lng},intersects:function(r){r=Q(r);var a=this._southWest,d=this._northEast,b=r.getSouthWest(),T=r.getNorthEast(),z=T.lat>=a.lat&&b.lat<=d.lat,Y=T.lng>=a.lng&&b.lng<=d.lng;return z&&Y},overlaps:function(r){r=Q(r);var a=this._southWest,d=this._northEast,b=r.getSouthWest(),T=r.getNorthEast(),z=T.lat>a.lat&&b.lat<d.lat,Y=T.lng>a.lng&&b.lng<d.lng;return z&&Y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(r,a){return r?(r=Q(r),this._southWest.equals(r.getSouthWest(),a)&&this._northEast.equals(r.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function Q(r,a){return r instanceof Ct?r:new Ct(r,a)}function it(r,a,d){if(isNaN(r)||isNaN(a))throw new Error("Invalid LatLng object: ("+r+", "+a+")");this.lat=+r,this.lng=+a,d!==void 0&&(this.alt=+d)}it.prototype={equals:function(r,a){if(!r)return!1;r=wt(r);var d=Math.max(Math.abs(this.lat-r.lat),Math.abs(this.lng-r.lng));return d<=(a===void 0?1e-9:a)},toString:function(r){return"LatLng("+_(this.lat,r)+", "+_(this.lng,r)+")"},distanceTo:function(r){return Pt.distance(this,wt(r))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(r){var a=180*r/40075017,d=a/Math.cos(Math.PI/180*this.lat);return Q([this.lat-a,this.lng-d],[this.lat+a,this.lng+d])},clone:function(){return new it(this.lat,this.lng,this.alt)}};function wt(r,a,d){return r instanceof it?r:w(r)&&typeof r[0]!="object"?r.length===3?new it(r[0],r[1],r[2]):r.length===2?new it(r[0],r[1]):null:r==null?r:typeof r=="object"&&"lat"in r?new it(r.lat,"lng"in r?r.lng:r.lon,r.alt):a===void 0?null:new it(r,a,d)}var St={latLngToPoint:function(r,a){var d=this.projection.project(r),b=this.scale(a);return this.transformation._transform(d,b)},pointToLatLng:function(r,a){var d=this.scale(a),b=this.transformation.untransform(r,d);return this.projection.unproject(b)},project:function(r){return this.projection.project(r)},unproject:function(r){return this.projection.unproject(r)},scale:function(r){return 256*Math.pow(2,r)},zoom:function(r){return Math.log(r/256)/Math.LN2},getProjectedBounds:function(r){if(this.infinite)return null;var a=this.projection.bounds,d=this.scale(r),b=this.transformation.transform(a.min,d),T=this.transformation.transform(a.max,d);return new j(b,T)},infinite:!1,wrapLatLng:function(r){var a=this.wrapLng?f(r.lng,this.wrapLng,!0):r.lng,d=this.wrapLat?f(r.lat,this.wrapLat,!0):r.lat,b=r.alt;return new it(d,a,b)},wrapLatLngBounds:function(r){var a=r.getCenter(),d=this.wrapLatLng(a),b=a.lat-d.lat,T=a.lng-d.lng;if(b===0&&T===0)return r;var z=r.getSouthWest(),Y=r.getNorthEast(),ut=new it(z.lat-b,z.lng-T),mt=new it(Y.lat-b,Y.lng-T);return new Ct(ut,mt)}},Pt=s({},St,{wrapLng:[-180,180],R:6371e3,distance:function(r,a){var d=Math.PI/180,b=r.lat*d,T=a.lat*d,z=Math.sin((a.lat-r.lat)*d/2),Y=Math.sin((a.lng-r.lng)*d/2),ut=z*z+Math.cos(b)*Math.cos(T)*Y*Y,mt=2*Math.atan2(Math.sqrt(ut),Math.sqrt(1-ut));return this.R*mt}}),It=6378137,Ut={R:It,MAX_LATITUDE:85.0511287798,project:function(r){var a=Math.PI/180,d=this.MAX_LATITUDE,b=Math.max(Math.min(d,r.lat),-d),T=Math.sin(b*a);return new q(this.R*r.lng*a,this.R*Math.log((1+T)/(1-T))/2)},unproject:function(r){var a=180/Math.PI;return new it((2*Math.atan(Math.exp(r.y/this.R))-Math.PI/2)*a,r.x*a/this.R)},bounds:function(){var r=It*Math.PI;return new j([-r,-r],[r,r])}()};function st(r,a,d,b){if(w(r)){this._a=r[0],this._b=r[1],this._c=r[2],this._d=r[3];return}this._a=r,this._b=a,this._c=d,this._d=b}st.prototype={transform:function(r,a){return this._transform(r.clone(),a)},_transform:function(r,a){return a=a||1,r.x=a*(this._a*r.x+this._b),r.y=a*(this._c*r.y+this._d),r},untransform:function(r,a){return a=a||1,new q((r.x/a-this._b)/this._a,(r.y/a-this._d)/this._c)}};function xt(r,a,d,b){return new st(r,a,d,b)}var bt=s({},Pt,{code:"EPSG:3857",projection:Ut,transformation:function(){var r=.5/(Math.PI*Ut.R);return xt(r,.5,-r,.5)}()}),E=s({},bt,{code:"EPSG:900913"});function et(r){return document.createElementNS("http://www.w3.org/2000/svg",r)}function $(r,a){var d="",b,T,z,Y,ut,mt;for(b=0,z=r.length;b<z;b++){for(ut=r[b],T=0,Y=ut.length;T<Y;T++)mt=ut[T],d+=(T?"L":"M")+mt.x+" "+mt.y;d+=a?Wt.svg?"z":"x":""}return d||"M0 0"}var C=document.documentElement.style,M="ActiveXObject"in window,B=M&&!document.addEventListener,X="msLaunchUri"in navigator&&!("documentMode"in document),K=Ge("webkit"),G=Ge("android"),ft=Ge("android 2")||Ge("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=G&&Ge("Google")&&lt<537&&!("AudioNode"in window),Tt=!!window.opera,Et=!X&&Ge("chrome"),At=Ge("gecko")&&!K&&!Tt&&!M,Ht=!Et&&Ge("safari"),zt=Ge("phantom"),Dt="OTransition"in C,Kt=navigator.platform.indexOf("Win")===0,Vt=M&&"transition"in C,oe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,ae="MozPerspective"in C,te=!window.L_DISABLE_3D&&(Vt||oe||ae)&&!Dt&&!zt,Ft=typeof orientation<"u"||Ge("mobile"),D=Ft&&K,ht=Ft&&oe,Mt=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||Mt),Nt="ontouchstart"in window||!!window.TouchEvent,re=!window.L_NO_TOUCH&&(Nt||Rt),ue=Ft&&Tt,ve=Ft&&At,ke=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,me=function(){var r=!1;try{var a=Object.defineProperty({},"passive",{get:function(){r=!0}});window.addEventListener("testPassiveEventSupport",p,a),window.removeEventListener("testPassiveEventSupport",p,a)}catch{}return r}(),Pe=function(){return!!document.createElement("canvas").getContext}(),Ee=!!(document.createElementNS&&et("svg").createSVGRect),on=!!Ee&&function(){var r=document.createElement("div");return r.innerHTML="<svg/>",(r.firstChild&&r.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),gn=!Ee&&function(){try{var r=document.createElement("div");r.innerHTML='<v:shape adj="1"/>';var a=r.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),$n=navigator.platform.indexOf("Mac")===0,bi=navigator.platform.indexOf("Linux")===0;function Ge(r){return navigator.userAgent.toLowerCase().indexOf(r)>=0}var Wt={ie:M,ielt9:B,edge:X,webkit:K,android:G,android23:ft,androidStock:pt,opera:Tt,chrome:Et,gecko:At,safari:Ht,phantom:zt,opera12:Dt,win:Kt,ie3d:Vt,webkit3d:oe,gecko3d:ae,any3d:te,mobile:Ft,mobileWebkit:D,mobileWebkit3d:ht,msPointer:Mt,pointer:Rt,touch:re,touchNative:Nt,mobileOpera:ue,mobileGecko:ve,retina:ke,passiveEvents:me,canvas:Pe,svg:Ee,vml:gn,inlineSvg:on,mac:$n,linux:bi},Hi=Wt.msPointer?"MSPointerDown":"pointerdown",gs=Wt.msPointer?"MSPointerMove":"pointermove",_s=Wt.msPointer?"MSPointerUp":"pointerup",ho=Wt.msPointer?"MSPointerCancel":"pointercancel",vs={touchstart:Hi,touchmove:gs,touchend:_s,touchcancel:ho},fo={touchstart:ee,touchmove:jt,touchend:jt,touchcancel:jt},V={},ct=!1;function gt(r,a,d){return a==="touchstart"&&qt(),fo[a]?(d=fo[a].bind(this,d),r.addEventListener(vs[a],d,!1),d):(console.warn("wrong event specified:",a),p)}function _t(r,a,d){if(!vs[a]){console.warn("wrong event specified:",a);return}r.removeEventListener(vs[a],d,!1)}function dt(r){V[r.pointerId]=r}function kt(r){V[r.pointerId]&&(V[r.pointerId]=r)}function Zt(r){delete V[r.pointerId]}function qt(){ct||(document.addEventListener(Hi,dt,!0),document.addEventListener(gs,kt,!0),document.addEventListener(_s,Zt,!0),document.addEventListener(ho,Zt,!0),ct=!0)}function jt(r,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var d in V)a.touches.push(V[d]);a.changedTouches=[a],r(a)}}function ee(r,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&Ke(a),jt(r,a)}function Jt(r){var a={},d,b;for(b in r)d=r[b],a[b]=d&&d.bind?d.bind(r):d;return r=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var ne=200;function Le(r,a){r.addEventListener("dblclick",a);var d=0,b;function T(z){if(z.detail!==1){b=z.detail;return}if(!(z.pointerType==="mouse"||z.sourceCapabilities&&!z.sourceCapabilities.firesTouchEvents)){var Y=$c(z);if(!(Y.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!Y.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ut=Date.now();ut-d<=ne?(b++,b===2&&a(Jt(z))):b=1,d=ut}}}return r.addEventListener("click",T),{dblclick:a,simDblclick:T}}function an(r,a){r.removeEventListener("dblclick",a.dblclick),r.removeEventListener("click",a.simDblclick)}var Re=mo(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),ln=mo(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ye=ln==="webkitTransition"||ln==="OTransition"?ln+"End":"transitionend";function ie(r){return typeof r=="string"?document.getElementById(r):r}function ai(r,a){var d=r.style[a]||r.currentStyle&&r.currentStyle[a];if((!d||d==="auto")&&document.defaultView){var b=document.defaultView.getComputedStyle(r,null);d=b?b[a]:null}return d==="auto"?null:d}function Xt(r,a,d){var b=document.createElement(r);return b.className=a||"",d&&d.appendChild(b),b}function fe(r){var a=r.parentNode;a&&a.removeChild(r)}function Vi(r){for(;r.firstChild;)r.removeChild(r.firstChild)}function Cn(r){var a=r.parentNode;a&&a.lastChild!==r&&a.appendChild(r)}function Kn(r){var a=r.parentNode;a&&a.firstChild!==r&&a.insertBefore(r,a.firstChild)}function Ue(r,a){if(r.classList!==void 0)return r.classList.contains(a);var d=wi(r);return d.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(d)}function Yt(r,a){if(r.classList!==void 0)for(var d=x(a),b=0,T=d.length;b<T;b++)r.classList.add(d[b]);else if(!Ue(r,a)){var z=wi(r);en(r,(z?z+" ":"")+a)}}function be(r,a){r.classList!==void 0?r.classList.remove(a):en(r,m((" "+wi(r)+" ").replace(" "+a+" "," ")))}function en(r,a){r.className.baseVal===void 0?r.className=a:r.className.baseVal=a}function wi(r){return r.correspondingElement&&(r=r.correspondingElement),r.className.baseVal===void 0?r.className:r.className.baseVal}function _n(r,a){"opacity"in r.style?r.style.opacity=a:"filter"in r.style&&po(r,a)}function po(r,a){var d=!1,b="DXImageTransform.Microsoft.Alpha";try{d=r.filters.item(b)}catch{if(a===1)return}a=Math.round(a*100),d?(d.Enabled=a!==100,d.Opacity=a):r.style.filter+=" progid:"+b+"(opacity="+a+")"}function mo(r){for(var a=document.documentElement.style,d=0;d<r.length;d++)if(r[d]in a)return r[d];return!1}function Gi(r,a,d){var b=a||new q(0,0);r.style[Re]=(Wt.ie3d?"translate("+b.x+"px,"+b.y+"px)":"translate3d("+b.x+"px,"+b.y+"px,0)")+(d?" scale("+d+")":"")}function ze(r,a){r._leaflet_pos=a,Wt.any3d?Gi(r,a):(r.style.left=a.x+"px",r.style.top=a.y+"px")}function Wi(r){return r._leaflet_pos||new q(0,0)}var ys,xs,Fa;if("onselectstart"in document)ys=function(){se(window,"selectstart",Ke)},xs=function(){xe(window,"selectstart",Ke)};else{var bs=mo(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);ys=function(){if(bs){var r=document.documentElement.style;Fa=r[bs],r[bs]="none"}},xs=function(){bs&&(document.documentElement.style[bs]=Fa,Fa=void 0)}}function Ha(){se(window,"dragstart",Ke)}function Va(){xe(window,"dragstart",Ke)}var go,Ga;function Wa(r){for(;r.tabIndex===-1;)r=r.parentNode;r.style&&(_o(),go=r,Ga=r.style.outlineStyle,r.style.outlineStyle="none",se(window,"keydown",_o))}function _o(){go&&(go.style.outlineStyle=Ga,go=void 0,Ga=void 0,xe(window,"keydown",_o))}function jc(r){do r=r.parentNode;while((!r.offsetWidth||!r.offsetHeight)&&r!==document.body);return r}function Za(r){var a=r.getBoundingClientRect();return{x:a.width/r.offsetWidth||1,y:a.height/r.offsetHeight||1,boundingClientRect:a}}var wp={__proto__:null,TRANSFORM:Re,TRANSITION:ln,TRANSITION_END:ye,get:ie,getStyle:ai,create:Xt,remove:fe,empty:Vi,toFront:Cn,toBack:Kn,hasClass:Ue,addClass:Yt,removeClass:be,setClass:en,getClass:wi,setOpacity:_n,testProp:mo,setTransform:Gi,setPosition:ze,getPosition:Wi,get disableTextSelection(){return ys},get enableTextSelection(){return xs},disableImageDrag:Ha,enableImageDrag:Va,preventOutline:Wa,restoreOutline:_o,getSizedParentNode:jc,getScale:Za};function se(r,a,d,b){if(a&&typeof a=="object")for(var T in a)qa(r,T,a[T],d);else{a=x(a);for(var z=0,Y=a.length;z<Y;z++)qa(r,a[z],d,b)}return this}var Jn="_leaflet_events";function xe(r,a,d,b){if(arguments.length===1)Yc(r),delete r[Jn];else if(a&&typeof a=="object")for(var T in a)ja(r,T,a[T],d);else if(a=x(a),arguments.length===2)Yc(r,function(ut){return P(a,ut)!==-1});else for(var z=0,Y=a.length;z<Y;z++)ja(r,a[z],d,b);return this}function Yc(r,a){for(var d in r[Jn]){var b=d.split(/\d/)[0];(!a||a(b))&&ja(r,b,null,null,d)}}var Xa={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function qa(r,a,d,b){var T=a+u(d)+(b?"_"+u(b):"");if(r[Jn]&&r[Jn][T])return this;var z=function(ut){return d.call(b||r,ut||window.event)},Y=z;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?z=gt(r,a,z):Wt.touch&&a==="dblclick"?z=Le(r,z):"addEventListener"in r?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?r.addEventListener(Xa[a]||a,z,Wt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(z=function(ut){ut=ut||window.event,$a(r,ut)&&Y(ut)},r.addEventListener(Xa[a],z,!1)):r.addEventListener(a,Y,!1):r.attachEvent("on"+a,z),r[Jn]=r[Jn]||{},r[Jn][T]=z}function ja(r,a,d,b,T){T=T||a+u(d)+(b?"_"+u(b):"");var z=r[Jn]&&r[Jn][T];if(!z)return this;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?_t(r,a,z):Wt.touch&&a==="dblclick"?an(r,z):"removeEventListener"in r?r.removeEventListener(Xa[a]||a,z,!1):r.detachEvent("on"+a,z),r[Jn][T]=null}function Zi(r){return r.stopPropagation?r.stopPropagation():r.originalEvent?r.originalEvent._stopped=!0:r.cancelBubble=!0,this}function Ya(r){return qa(r,"wheel",Zi),this}function ws(r){return se(r,"mousedown touchstart dblclick contextmenu",Zi),r._leaflet_disable_click=!0,this}function Ke(r){return r.preventDefault?r.preventDefault():r.returnValue=!1,this}function Xi(r){return Ke(r),Zi(r),this}function $c(r){if(r.composedPath)return r.composedPath();for(var a=[],d=r.target;d;)a.push(d),d=d.parentNode;return a}function Kc(r,a){if(!a)return new q(r.clientX,r.clientY);var d=Za(a),b=d.boundingClientRect;return new q((r.clientX-b.left)/d.x-a.clientLeft,(r.clientY-b.top)/d.y-a.clientTop)}var Mp=Wt.linux&&Wt.chrome?window.devicePixelRatio:Wt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Jc(r){return Wt.edge?r.wheelDeltaY/2:r.deltaY&&r.deltaMode===0?-r.deltaY/Mp:r.deltaY&&r.deltaMode===1?-r.deltaY*20:r.deltaY&&r.deltaMode===2?-r.deltaY*60:r.deltaX||r.deltaZ?0:r.wheelDelta?(r.wheelDeltaY||r.wheelDelta)/2:r.detail&&Math.abs(r.detail)<32765?-r.detail*20:r.detail?r.detail/-32765*60:0}function $a(r,a){var d=a.relatedTarget;if(!d)return!0;try{for(;d&&d!==r;)d=d.parentNode}catch{return!1}return d!==r}var Sp={__proto__:null,on:se,off:xe,stopPropagation:Zi,disableScrollPropagation:Ya,disableClickPropagation:ws,preventDefault:Ke,stop:Xi,getPropagationPath:$c,getMousePosition:Kc,getWheelDelta:Jc,isExternalTarget:$a,addListener:se,removeListener:xe},Qc=ot.extend({run:function(r,a,d,b){this.stop(),this._el=r,this._inProgress=!0,this._duration=d||.25,this._easeOutPower=1/Math.max(b||.5,.2),this._startPos=Wi(r),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=W(this._animate,this),this._step()},_step:function(r){var a=+new Date-this._startTime,d=this._duration*1e3;a<d?this._runFrame(this._easeOut(a/d),r):(this._runFrame(1),this._complete())},_runFrame:function(r,a){var d=this._startPos.add(this._offset.multiplyBy(r));a&&d._round(),ze(this._el,d),this.fire("step")},_complete:function(){U(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(r){return 1-Math.pow(1-r,this._easeOutPower)}}),de=ot.extend({options:{crs:bt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(r,a){a=y(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(r),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(wt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=ln&&Wt.any3d&&!Wt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),se(this._proxy,ye,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(r,a,d){if(a=a===void 0?this._zoom:this._limitZoom(a),r=this._limitCenter(wt(r),a,this.options.maxBounds),d=d||{},this._stop(),this._loaded&&!d.reset&&d!==!0){d.animate!==void 0&&(d.zoom=s({animate:d.animate},d.zoom),d.pan=s({animate:d.animate,duration:d.duration},d.pan));var b=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(r,a,d.zoom):this._tryAnimatedPan(r,d.pan);if(b)return clearTimeout(this._sizeTimer),this}return this._resetView(r,a,d.pan&&d.pan.noMoveStart),this},setZoom:function(r,a){return this._loaded?this.setView(this.getCenter(),r,{zoom:a}):(this._zoom=r,this)},zoomIn:function(r,a){return r=r||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+r,a)},zoomOut:function(r,a){return r=r||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-r,a)},setZoomAround:function(r,a,d){var b=this.getZoomScale(a),T=this.getSize().divideBy(2),z=r instanceof q?r:this.latLngToContainerPoint(r),Y=z.subtract(T).multiplyBy(1-1/b),ut=this.containerPointToLatLng(T.add(Y));return this.setView(ut,a,{zoom:d})},_getBoundsCenterZoom:function(r,a){a=a||{},r=r.getBounds?r.getBounds():Q(r);var d=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),T=this.getBoundsZoom(r,!1,d.add(b));if(T=typeof a.maxZoom=="number"?Math.min(a.maxZoom,T):T,T===1/0)return{center:r.getCenter(),zoom:T};var z=b.subtract(d).divideBy(2),Y=this.project(r.getSouthWest(),T),ut=this.project(r.getNorthEast(),T),mt=this.unproject(Y.add(ut).divideBy(2).add(z),T);return{center:mt,zoom:T}},fitBounds:function(r,a){if(r=Q(r),!r.isValid())throw new Error("Bounds are not valid.");var d=this._getBoundsCenterZoom(r,a);return this.setView(d.center,d.zoom,a)},fitWorld:function(r){return this.fitBounds([[-90,-180],[90,180]],r)},panTo:function(r,a){return this.setView(r,this._zoom,{pan:a})},panBy:function(r,a){if(r=at(r).round(),a=a||{},!r.x&&!r.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(r))return this._resetView(this.unproject(this.project(this.getCenter()).add(r)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Qc,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){Yt(this._mapPane,"leaflet-pan-anim");var d=this._getMapPanePos().subtract(r).round();this._panAnim.run(this._mapPane,d,a.duration||.25,a.easeLinearity)}else this._rawPanBy(r),this.fire("move").fire("moveend");return this},flyTo:function(r,a,d){if(d=d||{},d.animate===!1||!Wt.any3d)return this.setView(r,a,d);this._stop();var b=this.project(this.getCenter()),T=this.project(r),z=this.getSize(),Y=this._zoom;r=wt(r),a=a===void 0?Y:a;var ut=Math.max(z.x,z.y),mt=ut*this.getZoomScale(Y,a),Lt=T.distanceTo(b)||1,Bt=1.42,$t=Bt*Bt;function he(Be){var Co=Be?-1:1,dm=Be?mt:ut,fm=mt*mt-ut*ut+Co*$t*$t*Lt*Lt,pm=2*dm*$t*Lt,al=fm/pm,Du=Math.sqrt(al*al+1)-al,mm=Du<1e-9?-18:Math.log(Du);return mm}function cn(Be){return(Math.exp(Be)-Math.exp(-Be))/2}function We(Be){return(Math.exp(Be)+Math.exp(-Be))/2}function Rn(Be){return cn(Be)/We(Be)}var vn=he(0);function br(Be){return ut*(We(vn)/We(vn+Bt*Be))}function lm(Be){return ut*(We(vn)*Rn(vn+Bt*Be)-cn(vn))/$t}function cm(Be){return 1-Math.pow(1-Be,1.5)}var um=Date.now(),Ru=(he(1)-vn)/Bt,hm=d.duration?1e3*d.duration:1e3*Ru*.8;function Iu(){var Be=(Date.now()-um)/hm,Co=cm(Be)*Ru;Be<=1?(this._flyToFrame=W(Iu,this),this._move(this.unproject(b.add(T.subtract(b).multiplyBy(lm(Co)/Lt)),Y),this.getScaleZoom(ut/br(Co),Y),{flyTo:!0})):this._move(r,a)._moveEnd(!0)}return this._moveStart(!0,d.noMoveStart),Iu.call(this),this},flyToBounds:function(r,a){var d=this._getBoundsCenterZoom(r,a);return this.flyTo(d.center,d.zoom,a)},setMaxBounds:function(r){return r=Q(r),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),r.isValid()?(this.options.maxBounds=r,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(r){var a=this.options.minZoom;return this.options.minZoom=r,this._loaded&&a!==r&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(r):this},setMaxZoom:function(r){var a=this.options.maxZoom;return this.options.maxZoom=r,this._loaded&&a!==r&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(r):this},panInsideBounds:function(r,a){this._enforcingBounds=!0;var d=this.getCenter(),b=this._limitCenter(d,this._zoom,Q(r));return d.equals(b)||this.panTo(b,a),this._enforcingBounds=!1,this},panInside:function(r,a){a=a||{};var d=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),T=this.project(this.getCenter()),z=this.project(r),Y=this.getPixelBounds(),ut=tt([Y.min.add(d),Y.max.subtract(b)]),mt=ut.getSize();if(!ut.contains(z)){this._enforcingBounds=!0;var Lt=z.subtract(ut.getCenter()),Bt=ut.extend(z).getSize().subtract(mt);T.x+=Lt.x<0?-Bt.x:Bt.x,T.y+=Lt.y<0?-Bt.y:Bt.y,this.panTo(this.unproject(T),a),this._enforcingBounds=!1}return this},invalidateSize:function(r){if(!this._loaded)return this;r=s({animate:!1,pan:!0},r===!0?{animate:!0}:r);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var d=this.getSize(),b=a.divideBy(2).round(),T=d.divideBy(2).round(),z=b.subtract(T);return!z.x&&!z.y?this:(r.animate&&r.pan?this.panBy(z):(r.pan&&this._rawPanBy(z),this.fire("move"),r.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:d}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(r){if(r=this._locateOptions=s({timeout:1e4,watch:!1},r),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),d=l(this._handleGeolocationError,this);return r.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,d,r):navigator.geolocation.getCurrentPosition(a,d,r),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(r){if(this._container._leaflet_id){var a=r.code,d=r.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+d+"."})}},_handleGeolocationResponse:function(r){if(this._container._leaflet_id){var a=r.coords.latitude,d=r.coords.longitude,b=new it(a,d),T=b.toBounds(r.coords.accuracy*2),z=this._locateOptions;if(z.setView){var Y=this.getBoundsZoom(T);this.setView(b,z.maxZoom?Math.min(Y,z.maxZoom):Y)}var ut={latlng:b,bounds:T,timestamp:r.timestamp};for(var mt in r.coords)typeof r.coords[mt]=="number"&&(ut[mt]=r.coords[mt]);this.fire("locationfound",ut)}},addHandler:function(r,a){if(!a)return this;var d=this[r]=new a(this);return this._handlers.push(d),this.options[r]&&d.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),fe(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(U(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var r;for(r in this._layers)this._layers[r].remove();for(r in this._panes)fe(this._panes[r]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(r,a){var d="leaflet-pane"+(r?" leaflet-"+r.replace("Pane","")+"-pane":""),b=Xt("div",d,a||this._mapPane);return r&&(this._panes[r]=b),b},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var r=this.getPixelBounds(),a=this.unproject(r.getBottomLeft()),d=this.unproject(r.getTopRight());return new Ct(a,d)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(r,a,d){r=Q(r),d=at(d||[0,0]);var b=this.getZoom()||0,T=this.getMinZoom(),z=this.getMaxZoom(),Y=r.getNorthWest(),ut=r.getSouthEast(),mt=this.getSize().subtract(d),Lt=tt(this.project(ut,b),this.project(Y,b)).getSize(),Bt=Wt.any3d?this.options.zoomSnap:1,$t=mt.x/Lt.x,he=mt.y/Lt.y,cn=a?Math.max($t,he):Math.min($t,he);return b=this.getScaleZoom(cn,b),Bt&&(b=Math.round(b/(Bt/100))*(Bt/100),b=a?Math.ceil(b/Bt)*Bt:Math.floor(b/Bt)*Bt),Math.max(T,Math.min(z,b))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new q(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(r,a){var d=this._getTopLeftPoint(r,a);return new j(d,d.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(r){return this.options.crs.getProjectedBounds(r===void 0?this.getZoom():r)},getPane:function(r){return typeof r=="string"?this._panes[r]:r},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(r,a){var d=this.options.crs;return a=a===void 0?this._zoom:a,d.scale(r)/d.scale(a)},getScaleZoom:function(r,a){var d=this.options.crs;a=a===void 0?this._zoom:a;var b=d.zoom(r*d.scale(a));return isNaN(b)?1/0:b},project:function(r,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(wt(r),a)},unproject:function(r,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(at(r),a)},layerPointToLatLng:function(r){var a=at(r).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(r){var a=this.project(wt(r))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(r){return this.options.crs.wrapLatLng(wt(r))},wrapLatLngBounds:function(r){return this.options.crs.wrapLatLngBounds(Q(r))},distance:function(r,a){return this.options.crs.distance(wt(r),wt(a))},containerPointToLayerPoint:function(r){return at(r).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(r){return at(r).add(this._getMapPanePos())},containerPointToLatLng:function(r){var a=this.containerPointToLayerPoint(at(r));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(r){return this.layerPointToContainerPoint(this.latLngToLayerPoint(wt(r)))},mouseEventToContainerPoint:function(r){return Kc(r,this._container)},mouseEventToLayerPoint:function(r){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(r))},mouseEventToLatLng:function(r){return this.layerPointToLatLng(this.mouseEventToLayerPoint(r))},_initContainer:function(r){var a=this._container=ie(r);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");se(a,"scroll",this._onScroll,this),this._containerId=u(a)},_initLayout:function(){var r=this._container;this._fadeAnimated=this.options.fadeAnimation&&Wt.any3d,Yt(r,"leaflet-container"+(Wt.touch?" leaflet-touch":"")+(Wt.retina?" leaflet-retina":"")+(Wt.ielt9?" leaflet-oldie":"")+(Wt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=ai(r,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(r.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var r=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),ze(this._mapPane,new q(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Yt(r.markerPane,"leaflet-zoom-hide"),Yt(r.shadowPane,"leaflet-zoom-hide"))},_resetView:function(r,a,d){ze(this._mapPane,new q(0,0));var b=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var T=this._zoom!==a;this._moveStart(T,d)._move(r,a)._moveEnd(T),this.fire("viewreset"),b&&this.fire("load")},_moveStart:function(r,a){return r&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(r,a,d,b){a===void 0&&(a=this._zoom);var T=this._zoom!==a;return this._zoom=a,this._lastCenter=r,this._pixelOrigin=this._getNewPixelOrigin(r),b?d&&d.pinch&&this.fire("zoom",d):((T||d&&d.pinch)&&this.fire("zoom",d),this.fire("move",d)),this},_moveEnd:function(r){return r&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return U(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(r){ze(this._mapPane,this._getMapPanePos().subtract(r))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(r){this._targets={},this._targets[u(this._container)]=this;var a=r?xe:se;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Wt.any3d&&this.options.transform3DLimit&&(r?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){U(this._resizeRequest),this._resizeRequest=W(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var r=this._getMapPanePos();Math.max(Math.abs(r.x),Math.abs(r.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(r,a){for(var d=[],b,T=a==="mouseout"||a==="mouseover",z=r.target||r.srcElement,Y=!1;z;){if(b=this._targets[u(z)],b&&(a==="click"||a==="preclick")&&this._draggableMoved(b)){Y=!0;break}if(b&&b.listens(a,!0)&&(T&&!$a(z,r)||(d.push(b),T))||z===this._container)break;z=z.parentNode}return!d.length&&!Y&&!T&&this.listens(a,!0)&&(d=[this]),d},_isClickDisabled:function(r){for(;r&&r!==this._container;){if(r._leaflet_disable_click)return!0;r=r.parentNode}},_handleDOMEvent:function(r){var a=r.target||r.srcElement;if(!(!this._loaded||a._leaflet_disable_events||r.type==="click"&&this._isClickDisabled(a))){var d=r.type;d==="mousedown"&&Wa(a),this._fireDOMEvent(r,d)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(r,a,d){if(r.type==="click"){var b=s({},r);b.type="preclick",this._fireDOMEvent(b,b.type,d)}var T=this._findEventTargets(r,a);if(d){for(var z=[],Y=0;Y<d.length;Y++)d[Y].listens(a,!0)&&z.push(d[Y]);T=z.concat(T)}if(T.length){a==="contextmenu"&&Ke(r);var ut=T[0],mt={originalEvent:r};if(r.type!=="keypress"&&r.type!=="keydown"&&r.type!=="keyup"){var Lt=ut.getLatLng&&(!ut._radius||ut._radius<=10);mt.containerPoint=Lt?this.latLngToContainerPoint(ut.getLatLng()):this.mouseEventToContainerPoint(r),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=Lt?ut.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for(Y=0;Y<T.length;Y++)if(T[Y].fire(a,mt,!0),mt.originalEvent._stopped||T[Y].options.bubblingMouseEvents===!1&&P(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(r){return r=r.dragging&&r.dragging.enabled()?r:this,r.dragging&&r.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var r=0,a=this._handlers.length;r<a;r++)this._handlers[r].disable()},whenReady:function(r,a){return this._loaded?r.call(a||this,{target:this}):this.on("load",r,a),this},_getMapPanePos:function(){return Wi(this._mapPane)||new q(0,0)},_moved:function(){var r=this._getMapPanePos();return r&&!r.equals([0,0])},_getTopLeftPoint:function(r,a){var d=r&&a!==void 0?this._getNewPixelOrigin(r,a):this.getPixelOrigin();return d.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(r,a){var d=this.getSize()._divideBy(2);return this.project(r,a)._subtract(d)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(r,a,d){var b=this._getNewPixelOrigin(d,a);return this.project(r,a)._subtract(b)},_latLngBoundsToNewLayerBounds:function(r,a,d){var b=this._getNewPixelOrigin(d,a);return tt([this.project(r.getSouthWest(),a)._subtract(b),this.project(r.getNorthWest(),a)._subtract(b),this.project(r.getSouthEast(),a)._subtract(b),this.project(r.getNorthEast(),a)._subtract(b)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(r){return this.latLngToLayerPoint(r).subtract(this._getCenterLayerPoint())},_limitCenter:function(r,a,d){if(!d)return r;var b=this.project(r,a),T=this.getSize().divideBy(2),z=new j(b.subtract(T),b.add(T)),Y=this._getBoundsOffset(z,d,a);return Math.abs(Y.x)<=1&&Math.abs(Y.y)<=1?r:this.unproject(b.add(Y),a)},_limitOffset:function(r,a){if(!a)return r;var d=this.getPixelBounds(),b=new j(d.min.add(r),d.max.add(r));return r.add(this._getBoundsOffset(b,a))},_getBoundsOffset:function(r,a,d){var b=tt(this.project(a.getNorthEast(),d),this.project(a.getSouthWest(),d)),T=b.min.subtract(r.min),z=b.max.subtract(r.max),Y=this._rebound(T.x,-z.x),ut=this._rebound(T.y,-z.y);return new q(Y,ut)},_rebound:function(r,a){return r+a>0?Math.round(r-a)/2:Math.max(0,Math.ceil(r))-Math.max(0,Math.floor(a))},_limitZoom:function(r){var a=this.getMinZoom(),d=this.getMaxZoom(),b=Wt.any3d?this.options.zoomSnap:1;return b&&(r=Math.round(r/b)*b),Math.max(a,Math.min(d,r))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){be(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(r,a){var d=this._getCenterOffset(r)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(d)?!1:(this.panBy(d,a),!0)},_createAnimProxy:function(){var r=this._proxy=Xt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(r),this.on("zoomanim",function(a){var d=Re,b=this._proxy.style[d];Gi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),b===this._proxy.style[d]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){fe(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var r=this.getCenter(),a=this.getZoom();Gi(this._proxy,this.project(r,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(r){this._animatingZoom&&r.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(r,a,d){if(this._animatingZoom)return!0;if(d=d||{},!this._zoomAnimated||d.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var b=this.getZoomScale(a),T=this._getCenterOffset(r)._divideBy(1-1/b);return d.animate!==!0&&!this.getSize().contains(T)?!1:(W(function(){this._moveStart(!0,d.noMoveStart||!1)._animateZoom(r,a,!0)},this),!0)},_animateZoom:function(r,a,d,b){this._mapPane&&(d&&(this._animatingZoom=!0,this._animateToCenter=r,this._animateToZoom=a,Yt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:r,zoom:a,noUpdate:b}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&be(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Ep(r,a){return new de(r,a)}var kn=A.extend({options:{position:"topright"},initialize:function(r){y(this,r)},getPosition:function(){return this.options.position},setPosition:function(r){var a=this._map;return a&&a.removeControl(this),this.options.position=r,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(r){this.remove(),this._map=r;var a=this._container=this.onAdd(r),d=this.getPosition(),b=r._controlCorners[d];return Yt(a,"leaflet-control"),d.indexOf("bottom")!==-1?b.insertBefore(a,b.firstChild):b.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(fe(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(r){this._map&&r&&r.screenX>0&&r.screenY>0&&this._map.getContainer().focus()}}),Ms=function(r){return new kn(r)};de.include({addControl:function(r){return r.addTo(this),this},removeControl:function(r){return r.remove(),this},_initControlPos:function(){var r=this._controlCorners={},a="leaflet-",d=this._controlContainer=Xt("div",a+"control-container",this._container);function b(T,z){var Y=a+T+" "+a+z;r[T+z]=Xt("div",Y,d)}b("top","left"),b("top","right"),b("bottom","left"),b("bottom","right")},_clearControlPos:function(){for(var r in this._controlCorners)fe(this._controlCorners[r]);fe(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var tu=kn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(r,a,d,b){return d<b?-1:b<d?1:0}},initialize:function(r,a,d){y(this,d),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var b in r)this._addLayer(r[b],b);for(b in a)this._addLayer(a[b],b,!0)},onAdd:function(r){this._initLayout(),this._update(),this._map=r,r.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(r){return kn.prototype.addTo.call(this,r),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var r=0;r<this._layers.length;r++)this._layers[r].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(r,a){return this._addLayer(r,a),this._map?this._update():this},addOverlay:function(r,a){return this._addLayer(r,a,!0),this._map?this._update():this},removeLayer:function(r){r.off("add remove",this._onLayerChange,this);var a=this._getLayer(u(r));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){Yt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var r=this._map.getSize().y-(this._container.offsetTop+50);return r<this._section.clientHeight?(Yt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=r+"px"):be(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return be(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var r="leaflet-control-layers",a=this._container=Xt("div",r),d=this.options.collapsed;a.setAttribute("aria-haspopup",!0),ws(a),Ya(a);var b=this._section=Xt("section",r+"-list");d&&(this._map.on("click",this.collapse,this),se(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var T=this._layersLink=Xt("a",r+"-toggle",a);T.href="#",T.title="Layers",T.setAttribute("role","button"),se(T,{keydown:function(z){z.keyCode===13&&this._expandSafely()},click:function(z){Ke(z),this._expandSafely()}},this),d||this.expand(),this._baseLayersList=Xt("div",r+"-base",b),this._separator=Xt("div",r+"-separator",b),this._overlaysList=Xt("div",r+"-overlays",b),a.appendChild(b)},_getLayer:function(r){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&u(this._layers[a].layer)===r)return this._layers[a]},_addLayer:function(r,a,d){this._map&&r.on("add remove",this._onLayerChange,this),this._layers.push({layer:r,name:a,overlay:d}),this.options.sortLayers&&this._layers.sort(l(function(b,T){return this.options.sortFunction(b.layer,T.layer,b.name,T.name)},this)),this.options.autoZIndex&&r.setZIndex&&(this._lastZIndex++,r.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Vi(this._baseLayersList),Vi(this._overlaysList),this._layerControlInputs=[];var r,a,d,b,T=0;for(d=0;d<this._layers.length;d++)b=this._layers[d],this._addItem(b),a=a||b.overlay,r=r||!b.overlay,T+=b.overlay?0:1;return this.options.hideSingleBase&&(r=r&&T>1,this._baseLayersList.style.display=r?"":"none"),this._separator.style.display=a&&r?"":"none",this},_onLayerChange:function(r){this._handlingClick||this._update();var a=this._getLayer(u(r.target)),d=a.overlay?r.type==="add"?"overlayadd":"overlayremove":r.type==="add"?"baselayerchange":null;d&&this._map.fire(d,a)},_createRadioElement:function(r,a){var d='<input type="radio" class="leaflet-control-layers-selector" name="'+r+'"'+(a?' checked="checked"':"")+"/>",b=document.createElement("div");return b.innerHTML=d,b.firstChild},_addItem:function(r){var a=document.createElement("label"),d=this._map.hasLayer(r.layer),b;r.overlay?(b=document.createElement("input"),b.type="checkbox",b.className="leaflet-control-layers-selector",b.defaultChecked=d):b=this._createRadioElement("leaflet-base-layers_"+u(this),d),this._layerControlInputs.push(b),b.layerId=u(r.layer),se(b,"click",this._onInputClick,this);var T=document.createElement("span");T.innerHTML=" "+r.name;var z=document.createElement("span");a.appendChild(z),z.appendChild(b),z.appendChild(T);var Y=r.overlay?this._overlaysList:this._baseLayersList;return Y.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var r=this._layerControlInputs,a,d,b=[],T=[];this._handlingClick=!0;for(var z=r.length-1;z>=0;z--)a=r[z],d=this._getLayer(a.layerId).layer,a.checked?b.push(d):a.checked||T.push(d);for(z=0;z<T.length;z++)this._map.hasLayer(T[z])&&this._map.removeLayer(T[z]);for(z=0;z<b.length;z++)this._map.hasLayer(b[z])||this._map.addLayer(b[z]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var r=this._layerControlInputs,a,d,b=this._map.getZoom(),T=r.length-1;T>=0;T--)a=r[T],d=this._getLayer(a.layerId).layer,a.disabled=d.options.minZoom!==void 0&&b<d.options.minZoom||d.options.maxZoom!==void 0&&b>d.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var r=this._section;this._preventClick=!0,se(r,"click",Ke),this.expand();var a=this;setTimeout(function(){xe(r,"click",Ke),a._preventClick=!1})}}),Tp=function(r,a,d){return new tu(r,a,d)},Ka=kn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(r){var a="leaflet-control-zoom",d=Xt("div",a+" leaflet-bar"),b=this.options;return this._zoomInButton=this._createButton(b.zoomInText,b.zoomInTitle,a+"-in",d,this._zoomIn),this._zoomOutButton=this._createButton(b.zoomOutText,b.zoomOutTitle,a+"-out",d,this._zoomOut),this._updateDisabled(),r.on("zoomend zoomlevelschange",this._updateDisabled,this),d},onRemove:function(r){r.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(r){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(r.shiftKey?3:1))},_zoomOut:function(r){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(r.shiftKey?3:1))},_createButton:function(r,a,d,b,T){var z=Xt("a",d,b);return z.innerHTML=r,z.href="#",z.title=a,z.setAttribute("role","button"),z.setAttribute("aria-label",a),ws(z),se(z,"click",Xi),se(z,"click",T,this),se(z,"click",this._refocusOnMap,this),z},_updateDisabled:function(){var r=this._map,a="leaflet-disabled";be(this._zoomInButton,a),be(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||r._zoom===r.getMinZoom())&&(Yt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||r._zoom===r.getMaxZoom())&&(Yt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});de.mergeOptions({zoomControl:!0}),de.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ka,this.addControl(this.zoomControl))});var Ap=function(r){return new Ka(r)},eu=kn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(r){var a="leaflet-control-scale",d=Xt("div",a),b=this.options;return this._addScales(b,a+"-line",d),r.on(b.updateWhenIdle?"moveend":"move",this._update,this),r.whenReady(this._update,this),d},onRemove:function(r){r.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(r,a,d){r.metric&&(this._mScale=Xt("div",a,d)),r.imperial&&(this._iScale=Xt("div",a,d))},_update:function(){var r=this._map,a=r.getSize().y/2,d=r.distance(r.containerPointToLatLng([0,a]),r.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(d)},_updateScales:function(r){this.options.metric&&r&&this._updateMetric(r),this.options.imperial&&r&&this._updateImperial(r)},_updateMetric:function(r){var a=this._getRoundNum(r),d=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,d,a/r)},_updateImperial:function(r){var a=r*3.2808399,d,b,T;a>5280?(d=a/5280,b=this._getRoundNum(d),this._updateScale(this._iScale,b+" mi",b/d)):(T=this._getRoundNum(a),this._updateScale(this._iScale,T+" ft",T/a))},_updateScale:function(r,a,d){r.style.width=Math.round(this.options.maxWidth*d)+"px",r.innerHTML=a},_getRoundNum:function(r){var a=Math.pow(10,(Math.floor(r)+"").length-1),d=r/a;return d=d>=10?10:d>=5?5:d>=3?3:d>=2?2:1,a*d}}),Lp=function(r){return new eu(r)},Cp='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Ja=kn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Wt.inlineSvg?Cp+" ":"")+"Leaflet</a>"},initialize:function(r){y(this,r),this._attributions={}},onAdd:function(r){r.attributionControl=this,this._container=Xt("div","leaflet-control-attribution"),ws(this._container);for(var a in r._layers)r._layers[a].getAttribution&&this.addAttribution(r._layers[a].getAttribution());return this._update(),r.on("layeradd",this._addAttribution,this),this._container},onRemove:function(r){r.off("layeradd",this._addAttribution,this)},_addAttribution:function(r){r.layer.getAttribution&&(this.addAttribution(r.layer.getAttribution()),r.layer.once("remove",function(){this.removeAttribution(r.layer.getAttribution())},this))},setPrefix:function(r){return this.options.prefix=r,this._update(),this},addAttribution:function(r){return r?(this._attributions[r]||(this._attributions[r]=0),this._attributions[r]++,this._update(),this):this},removeAttribution:function(r){return r?(this._attributions[r]&&(this._attributions[r]--,this._update()),this):this},_update:function(){if(this._map){var r=[];for(var a in this._attributions)this._attributions[a]&&r.push(a);var d=[];this.options.prefix&&d.push(this.options.prefix),r.length&&d.push(r.join(", ")),this._container.innerHTML=d.join(' <span aria-hidden="true">|</span> ')}}});de.mergeOptions({attributionControl:!0}),de.addInitHook(function(){this.options.attributionControl&&new Ja().addTo(this)});var Pp=function(r){return new Ja(r)};kn.Layers=tu,kn.Zoom=Ka,kn.Scale=eu,kn.Attribution=Ja,Ms.layers=Tp,Ms.zoom=Ap,Ms.scale=Lp,Ms.attribution=Pp;var Qn=A.extend({initialize:function(r){this._map=r},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});Qn.addTo=function(r,a){return r.addHandler(a,this),this};var Rp={Events:nt},nu=Wt.touch?"touchstart mousedown":"mousedown",Mi=ot.extend({options:{clickTolerance:3},initialize:function(r,a,d,b){y(this,b),this._element=r,this._dragStartTarget=a||r,this._preventOutline=d},enable:function(){this._enabled||(se(this._dragStartTarget,nu,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(Mi._dragging===this&&this.finishDrag(!0),xe(this._dragStartTarget,nu,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(r){if(this._enabled&&(this._moved=!1,!Ue(this._element,"leaflet-zoom-anim"))){if(r.touches&&r.touches.length!==1){Mi._dragging===this&&this.finishDrag();return}if(!(Mi._dragging||r.shiftKey||r.which!==1&&r.button!==1&&!r.touches)&&(Mi._dragging=this,this._preventOutline&&Wa(this._element),Ha(),ys(),!this._moving)){this.fire("down");var a=r.touches?r.touches[0]:r,d=jc(this._element);this._startPoint=new q(a.clientX,a.clientY),this._startPos=Wi(this._element),this._parentScale=Za(d);var b=r.type==="mousedown";se(document,b?"mousemove":"touchmove",this._onMove,this),se(document,b?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(r){if(this._enabled){if(r.touches&&r.touches.length>1){this._moved=!0;return}var a=r.touches&&r.touches.length===1?r.touches[0]:r,d=new q(a.clientX,a.clientY)._subtract(this._startPoint);!d.x&&!d.y||Math.abs(d.x)+Math.abs(d.y)<this.options.clickTolerance||(d.x/=this._parentScale.x,d.y/=this._parentScale.y,Ke(r),this._moved||(this.fire("dragstart"),this._moved=!0,Yt(document.body,"leaflet-dragging"),this._lastTarget=r.target||r.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Yt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(d),this._moving=!0,this._lastEvent=r,this._updatePosition())}},_updatePosition:function(){var r={originalEvent:this._lastEvent};this.fire("predrag",r),ze(this._element,this._newPos),this.fire("drag",r)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(r){be(document.body,"leaflet-dragging"),this._lastTarget&&(be(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),xe(document,"mousemove touchmove",this._onMove,this),xe(document,"mouseup touchend touchcancel",this._onUp,this),Va(),xs();var a=this._moved&&this._moving;this._moving=!1,Mi._dragging=!1,a&&this.fire("dragend",{noInertia:r,distance:this._newPos.distanceTo(this._startPos)})}});function iu(r,a,d){var b,T=[1,4,2,8],z,Y,ut,mt,Lt,Bt,$t,he;for(z=0,Bt=r.length;z<Bt;z++)r[z]._code=qi(r[z],a);for(ut=0;ut<4;ut++){for($t=T[ut],b=[],z=0,Bt=r.length,Y=Bt-1;z<Bt;Y=z++)mt=r[z],Lt=r[Y],mt._code&$t?Lt._code&$t||(he=vo(Lt,mt,$t,a,d),he._code=qi(he,a),b.push(he)):(Lt._code&$t&&(he=vo(Lt,mt,$t,a,d),he._code=qi(he,a),b.push(he)),b.push(mt));r=b}return r}function ru(r,a){var d,b,T,z,Y,ut,mt,Lt,Bt;if(!r||r.length===0)throw new Error("latlngs not passed");Pn(r)||(console.warn("latlngs are not flat! Only the first ring will be used"),r=r[0]);var $t=wt([0,0]),he=Q(r),cn=he.getNorthWest().distanceTo(he.getSouthWest())*he.getNorthEast().distanceTo(he.getNorthWest());cn<1700&&($t=Qa(r));var We=r.length,Rn=[];for(d=0;d<We;d++){var vn=wt(r[d]);Rn.push(a.project(wt([vn.lat-$t.lat,vn.lng-$t.lng])))}for(ut=mt=Lt=0,d=0,b=We-1;d<We;b=d++)T=Rn[d],z=Rn[b],Y=T.y*z.x-z.y*T.x,mt+=(T.x+z.x)*Y,Lt+=(T.y+z.y)*Y,ut+=Y*3;ut===0?Bt=Rn[0]:Bt=[mt/ut,Lt/ut];var br=a.unproject(at(Bt));return wt([br.lat+$t.lat,br.lng+$t.lng])}function Qa(r){for(var a=0,d=0,b=0,T=0;T<r.length;T++){var z=wt(r[T]);a+=z.lat,d+=z.lng,b++}return wt([a/b,d/b])}var Ip={__proto__:null,clipPolygon:iu,polygonCenter:ru,centroid:Qa};function su(r,a){if(!a||!r.length)return r.slice();var d=a*a;return r=Op(r,d),r=Np(r,d),r}function ou(r,a,d){return Math.sqrt(Ss(r,a,d,!0))}function Dp(r,a,d){return Ss(r,a,d)}function Np(r,a){var d=r.length,b=typeof Uint8Array<"u"?Uint8Array:Array,T=new b(d);T[0]=T[d-1]=1,tl(r,T,a,0,d-1);var z,Y=[];for(z=0;z<d;z++)T[z]&&Y.push(r[z]);return Y}function tl(r,a,d,b,T){var z=0,Y,ut,mt;for(ut=b+1;ut<=T-1;ut++)mt=Ss(r[ut],r[b],r[T],!0),mt>z&&(Y=ut,z=mt);z>d&&(a[Y]=1,tl(r,a,d,b,Y),tl(r,a,d,Y,T))}function Op(r,a){for(var d=[r[0]],b=1,T=0,z=r.length;b<z;b++)kp(r[b],r[T])>a&&(d.push(r[b]),T=b);return T<z-1&&d.push(r[z-1]),d}var au;function lu(r,a,d,b,T){var z=b?au:qi(r,d),Y=qi(a,d),ut,mt,Lt;for(au=Y;;){if(!(z|Y))return[r,a];if(z&Y)return!1;ut=z||Y,mt=vo(r,a,ut,d,T),Lt=qi(mt,d),ut===z?(r=mt,z=Lt):(a=mt,Y=Lt)}}function vo(r,a,d,b,T){var z=a.x-r.x,Y=a.y-r.y,ut=b.min,mt=b.max,Lt,Bt;return d&8?(Lt=r.x+z*(mt.y-r.y)/Y,Bt=mt.y):d&4?(Lt=r.x+z*(ut.y-r.y)/Y,Bt=ut.y):d&2?(Lt=mt.x,Bt=r.y+Y*(mt.x-r.x)/z):d&1&&(Lt=ut.x,Bt=r.y+Y*(ut.x-r.x)/z),new q(Lt,Bt,T)}function qi(r,a){var d=0;return r.x<a.min.x?d|=1:r.x>a.max.x&&(d|=2),r.y<a.min.y?d|=4:r.y>a.max.y&&(d|=8),d}function kp(r,a){var d=a.x-r.x,b=a.y-r.y;return d*d+b*b}function Ss(r,a,d,b){var T=a.x,z=a.y,Y=d.x-T,ut=d.y-z,mt=Y*Y+ut*ut,Lt;return mt>0&&(Lt=((r.x-T)*Y+(r.y-z)*ut)/mt,Lt>1?(T=d.x,z=d.y):Lt>0&&(T+=Y*Lt,z+=ut*Lt)),Y=r.x-T,ut=r.y-z,b?Y*Y+ut*ut:new q(T,z)}function Pn(r){return!w(r[0])||typeof r[0][0]!="object"&&typeof r[0][0]<"u"}function cu(r){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Pn(r)}function uu(r,a){var d,b,T,z,Y,ut,mt,Lt;if(!r||r.length===0)throw new Error("latlngs not passed");Pn(r)||(console.warn("latlngs are not flat! Only the first ring will be used"),r=r[0]);var Bt=wt([0,0]),$t=Q(r),he=$t.getNorthWest().distanceTo($t.getSouthWest())*$t.getNorthEast().distanceTo($t.getNorthWest());he<1700&&(Bt=Qa(r));var cn=r.length,We=[];for(d=0;d<cn;d++){var Rn=wt(r[d]);We.push(a.project(wt([Rn.lat-Bt.lat,Rn.lng-Bt.lng])))}for(d=0,b=0;d<cn-1;d++)b+=We[d].distanceTo(We[d+1])/2;if(b===0)Lt=We[0];else for(d=0,z=0;d<cn-1;d++)if(Y=We[d],ut=We[d+1],T=Y.distanceTo(ut),z+=T,z>b){mt=(z-b)/T,Lt=[ut.x-mt*(ut.x-Y.x),ut.y-mt*(ut.y-Y.y)];break}var vn=a.unproject(at(Lt));return wt([vn.lat+Bt.lat,vn.lng+Bt.lng])}var Up={__proto__:null,simplify:su,pointToSegmentDistance:ou,closestPointOnSegment:Dp,clipSegment:lu,_getEdgeIntersection:vo,_getBitCode:qi,_sqClosestPointOnSegment:Ss,isFlat:Pn,_flat:cu,polylineCenter:uu},el={project:function(r){return new q(r.lng,r.lat)},unproject:function(r){return new it(r.y,r.x)},bounds:new j([-180,-90],[180,90])},nl={R:6378137,R_MINOR:6356752314245179e-9,bounds:new j([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(r){var a=Math.PI/180,d=this.R,b=r.lat*a,T=this.R_MINOR/d,z=Math.sqrt(1-T*T),Y=z*Math.sin(b),ut=Math.tan(Math.PI/4-b/2)/Math.pow((1-Y)/(1+Y),z/2);return b=-d*Math.log(Math.max(ut,1e-10)),new q(r.lng*a*d,b)},unproject:function(r){for(var a=180/Math.PI,d=this.R,b=this.R_MINOR/d,T=Math.sqrt(1-b*b),z=Math.exp(-r.y/d),Y=Math.PI/2-2*Math.atan(z),ut=0,mt=.1,Lt;ut<15&&Math.abs(mt)>1e-7;ut++)Lt=T*Math.sin(Y),Lt=Math.pow((1-Lt)/(1+Lt),T/2),mt=Math.PI/2-2*Math.atan(z*Lt)-Y,Y+=mt;return new it(Y*a,r.x*a/d)}},zp={__proto__:null,LonLat:el,Mercator:nl,SphericalMercator:Ut},Bp=s({},Pt,{code:"EPSG:3395",projection:nl,transformation:function(){var r=.5/(Math.PI*nl.R);return xt(r,.5,-r,.5)}()}),hu=s({},Pt,{code:"EPSG:4326",projection:el,transformation:xt(1/180,1,-1/180,.5)}),Fp=s({},St,{projection:el,transformation:xt(1,0,-1,0),scale:function(r){return Math.pow(2,r)},zoom:function(r){return Math.log(r)/Math.LN2},distance:function(r,a){var d=a.lng-r.lng,b=a.lat-r.lat;return Math.sqrt(d*d+b*b)},infinite:!0});St.Earth=Pt,St.EPSG3395=Bp,St.EPSG3857=bt,St.EPSG900913=E,St.EPSG4326=hu,St.Simple=Fp;var Un=ot.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(r){return r.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(r){return r&&r.removeLayer(this),this},getPane:function(r){return this._map.getPane(r?this.options[r]||r:this.options.pane)},addInteractiveTarget:function(r){return this._map._targets[u(r)]=this,this},removeInteractiveTarget:function(r){return delete this._map._targets[u(r)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(r){var a=r.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var d=this.getEvents();a.on(d,this),this.once("remove",function(){a.off(d,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});de.include({addLayer:function(r){if(!r._layerAdd)throw new Error("The provided object is not a Layer.");var a=u(r);return this._layers[a]?this:(this._layers[a]=r,r._mapToAdd=this,r.beforeAdd&&r.beforeAdd(this),this.whenReady(r._layerAdd,r),this)},removeLayer:function(r){var a=u(r);return this._layers[a]?(this._loaded&&r.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:r}),r.fire("remove")),r._map=r._mapToAdd=null,this):this},hasLayer:function(r){return u(r)in this._layers},eachLayer:function(r,a){for(var d in this._layers)r.call(a,this._layers[d]);return this},_addLayers:function(r){r=r?w(r)?r:[r]:[];for(var a=0,d=r.length;a<d;a++)this.addLayer(r[a])},_addZoomLimit:function(r){(!isNaN(r.options.maxZoom)||!isNaN(r.options.minZoom))&&(this._zoomBoundLayers[u(r)]=r,this._updateZoomLevels())},_removeZoomLimit:function(r){var a=u(r);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var r=1/0,a=-1/0,d=this._getZoomSpan();for(var b in this._zoomBoundLayers){var T=this._zoomBoundLayers[b].options;r=T.minZoom===void 0?r:Math.min(r,T.minZoom),a=T.maxZoom===void 0?a:Math.max(a,T.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=r===1/0?void 0:r,d!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var gr=Un.extend({initialize:function(r,a){y(this,a),this._layers={};var d,b;if(r)for(d=0,b=r.length;d<b;d++)this.addLayer(r[d])},addLayer:function(r){var a=this.getLayerId(r);return this._layers[a]=r,this._map&&this._map.addLayer(r),this},removeLayer:function(r){var a=r in this._layers?r:this.getLayerId(r);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(r){var a=typeof r=="number"?r:this.getLayerId(r);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(r){var a=Array.prototype.slice.call(arguments,1),d,b;for(d in this._layers)b=this._layers[d],b[r]&&b[r].apply(b,a);return this},onAdd:function(r){this.eachLayer(r.addLayer,r)},onRemove:function(r){this.eachLayer(r.removeLayer,r)},eachLayer:function(r,a){for(var d in this._layers)r.call(a,this._layers[d]);return this},getLayer:function(r){return this._layers[r]},getLayers:function(){var r=[];return this.eachLayer(r.push,r),r},setZIndex:function(r){return this.invoke("setZIndex",r)},getLayerId:function(r){return u(r)}}),Hp=function(r,a){return new gr(r,a)},li=gr.extend({addLayer:function(r){return this.hasLayer(r)?this:(r.addEventParent(this),gr.prototype.addLayer.call(this,r),this.fire("layeradd",{layer:r}))},removeLayer:function(r){return this.hasLayer(r)?(r in this._layers&&(r=this._layers[r]),r.removeEventParent(this),gr.prototype.removeLayer.call(this,r),this.fire("layerremove",{layer:r})):this},setStyle:function(r){return this.invoke("setStyle",r)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var r=new Ct;for(var a in this._layers){var d=this._layers[a];r.extend(d.getBounds?d.getBounds():d.getLatLng())}return r}}),Vp=function(r,a){return new li(r,a)},_r=A.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(r){y(this,r)},createIcon:function(r){return this._createIcon("icon",r)},createShadow:function(r){return this._createIcon("shadow",r)},_createIcon:function(r,a){var d=this._getIconUrl(r);if(!d){if(r==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var b=this._createImg(d,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(b,r),(this.options.crossOrigin||this.options.crossOrigin==="")&&(b.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),b},_setIconStyles:function(r,a){var d=this.options,b=d[a+"Size"];typeof b=="number"&&(b=[b,b]);var T=at(b),z=at(a==="shadow"&&d.shadowAnchor||d.iconAnchor||T&&T.divideBy(2,!0));r.className="leaflet-marker-"+a+" "+(d.className||""),z&&(r.style.marginLeft=-z.x+"px",r.style.marginTop=-z.y+"px"),T&&(r.style.width=T.x+"px",r.style.height=T.y+"px")},_createImg:function(r,a){return a=a||document.createElement("img"),a.src=r,a},_getIconUrl:function(r){return Wt.retina&&this.options[r+"RetinaUrl"]||this.options[r+"Url"]}});function Gp(r){return new _r(r)}var Es=_r.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(r){return typeof Es.imagePath!="string"&&(Es.imagePath=this._detectIconPath()),(this.options.imagePath||Es.imagePath)+_r.prototype._getIconUrl.call(this,r)},_stripUrl:function(r){var a=function(d,b,T){var z=b.exec(d);return z&&z[T]};return r=a(r,/^url\((['"])?(.+)\1\)$/,2),r&&a(r,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var r=Xt("div","leaflet-default-icon-path",document.body),a=ai(r,"background-image")||ai(r,"backgroundImage");if(document.body.removeChild(r),a=this._stripUrl(a),a)return a;var d=document.querySelector('link[href$="leaflet.css"]');return d?d.href.substring(0,d.href.length-11-1):""}}),du=Qn.extend({initialize:function(r){this._marker=r},addHooks:function(){var r=this._marker._icon;this._draggable||(this._draggable=new Mi(r,r,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Yt(r,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&be(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(r){var a=this._marker,d=a._map,b=this._marker.options.autoPanSpeed,T=this._marker.options.autoPanPadding,z=Wi(a._icon),Y=d.getPixelBounds(),ut=d.getPixelOrigin(),mt=tt(Y.min._subtract(ut).add(T),Y.max._subtract(ut).subtract(T));if(!mt.contains(z)){var Lt=at((Math.max(mt.max.x,z.x)-mt.max.x)/(Y.max.x-mt.max.x)-(Math.min(mt.min.x,z.x)-mt.min.x)/(Y.min.x-mt.min.x),(Math.max(mt.max.y,z.y)-mt.max.y)/(Y.max.y-mt.max.y)-(Math.min(mt.min.y,z.y)-mt.min.y)/(Y.min.y-mt.min.y)).multiplyBy(b);d.panBy(Lt,{animate:!1}),this._draggable._newPos._add(Lt),this._draggable._startPos._add(Lt),ze(a._icon,this._draggable._newPos),this._onDrag(r),this._panRequest=W(this._adjustPan.bind(this,r))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(r){this._marker.options.autoPan&&(U(this._panRequest),this._panRequest=W(this._adjustPan.bind(this,r)))},_onDrag:function(r){var a=this._marker,d=a._shadow,b=Wi(a._icon),T=a._map.layerPointToLatLng(b);d&&ze(d,b),a._latlng=T,r.latlng=T,r.oldLatLng=this._oldLatLng,a.fire("move",r).fire("drag",r)},_onDragEnd:function(r){U(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",r)}}),yo=Un.extend({options:{icon:new Es,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(r,a){y(this,a),this._latlng=wt(r)},onAdd:function(r){this._zoomAnimated=this._zoomAnimated&&r.options.markerZoomAnimation,this._zoomAnimated&&r.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(r){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&r.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(r){var a=this._latlng;return this._latlng=wt(r),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(r){return this.options.zIndexOffset=r,this.update()},getIcon:function(){return this.options.icon},setIcon:function(r){return this.options.icon=r,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var r=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(r)}return this},_initIcon:function(){var r=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),d=r.icon.createIcon(this._icon),b=!1;d!==this._icon&&(this._icon&&this._removeIcon(),b=!0,r.title&&(d.title=r.title),d.tagName==="IMG"&&(d.alt=r.alt||"")),Yt(d,a),r.keyboard&&(d.tabIndex="0",d.setAttribute("role","button")),this._icon=d,r.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&se(d,"focus",this._panOnFocus,this);var T=r.icon.createShadow(this._shadow),z=!1;T!==this._shadow&&(this._removeShadow(),z=!0),T&&(Yt(T,a),T.alt=""),this._shadow=T,r.opacity<1&&this._updateOpacity(),b&&this.getPane().appendChild(this._icon),this._initInteraction(),T&&z&&this.getPane(r.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&xe(this._icon,"focus",this._panOnFocus,this),fe(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&fe(this._shadow),this._shadow=null},_setPos:function(r){this._icon&&ze(this._icon,r),this._shadow&&ze(this._shadow,r),this._zIndex=r.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(r){this._icon&&(this._icon.style.zIndex=this._zIndex+r)},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&(Yt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),du)){var r=this.options.draggable;this.dragging&&(r=this.dragging.enabled(),this.dragging.disable()),this.dragging=new du(this),r&&this.dragging.enable()}},setOpacity:function(r){return this.options.opacity=r,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var r=this.options.opacity;this._icon&&_n(this._icon,r),this._shadow&&_n(this._shadow,r)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var r=this._map;if(r){var a=this.options.icon.options,d=a.iconSize?at(a.iconSize):at(0,0),b=a.iconAnchor?at(a.iconAnchor):at(0,0);r.panInside(this._latlng,{paddingTopLeft:b,paddingBottomRight:d.subtract(b)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Wp(r,a){return new yo(r,a)}var Si=Un.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(r){this._renderer=r.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(r){return y(this,r),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&r&&Object.prototype.hasOwnProperty.call(r,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),xo=Si.extend({options:{fill:!0,radius:10},initialize:function(r,a){y(this,a),this._latlng=wt(r),this._radius=this.options.radius},setLatLng:function(r){var a=this._latlng;return this._latlng=wt(r),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(r){return this.options.radius=this._radius=r,this.redraw()},getRadius:function(){return this._radius},setStyle:function(r){var a=r&&r.radius||this._radius;return Si.prototype.setStyle.call(this,r),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var r=this._radius,a=this._radiusY||r,d=this._clickTolerance(),b=[r+d,a+d];this._pxBounds=new j(this._point.subtract(b),this._point.add(b))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(r){return r.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Zp(r,a){return new xo(r,a)}var il=xo.extend({initialize:function(r,a,d){if(typeof a=="number"&&(a=s({},d,{radius:a})),y(this,a),this._latlng=wt(r),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(r){return this._mRadius=r,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var r=[this._radius,this._radiusY||this._radius];return new Ct(this._map.layerPointToLatLng(this._point.subtract(r)),this._map.layerPointToLatLng(this._point.add(r)))},setStyle:Si.prototype.setStyle,_project:function(){var r=this._latlng.lng,a=this._latlng.lat,d=this._map,b=d.options.crs;if(b.distance===Pt.distance){var T=Math.PI/180,z=this._mRadius/Pt.R/T,Y=d.project([a+z,r]),ut=d.project([a-z,r]),mt=Y.add(ut).divideBy(2),Lt=d.unproject(mt).lat,Bt=Math.acos((Math.cos(z*T)-Math.sin(a*T)*Math.sin(Lt*T))/(Math.cos(a*T)*Math.cos(Lt*T)))/T;(isNaN(Bt)||Bt===0)&&(Bt=z/Math.cos(Math.PI/180*a)),this._point=mt.subtract(d.getPixelOrigin()),this._radius=isNaN(Bt)?0:mt.x-d.project([Lt,r-Bt]).x,this._radiusY=mt.y-Y.y}else{var $t=b.unproject(b.project(this._latlng).subtract([this._mRadius,0]));this._point=d.latLngToLayerPoint(this._latlng),this._radius=this._point.x-d.latLngToLayerPoint($t).x}this._updateBounds()}});function Xp(r,a,d){return new il(r,a,d)}var ci=Si.extend({options:{smoothFactor:1,noClip:!1},initialize:function(r,a){y(this,a),this._setLatLngs(r)},getLatLngs:function(){return this._latlngs},setLatLngs:function(r){return this._setLatLngs(r),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(r){for(var a=1/0,d=null,b=Ss,T,z,Y=0,ut=this._parts.length;Y<ut;Y++)for(var mt=this._parts[Y],Lt=1,Bt=mt.length;Lt<Bt;Lt++){T=mt[Lt-1],z=mt[Lt];var $t=b(r,T,z,!0);$t<a&&(a=$t,d=b(r,T,z))}return d&&(d.distance=Math.sqrt(a)),d},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return uu(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(r,a){return a=a||this._defaultShape(),r=wt(r),a.push(r),this._bounds.extend(r),this.redraw()},_setLatLngs:function(r){this._bounds=new Ct,this._latlngs=this._convertLatLngs(r)},_defaultShape:function(){return Pn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(r){for(var a=[],d=Pn(r),b=0,T=r.length;b<T;b++)d?(a[b]=wt(r[b]),this._bounds.extend(a[b])):a[b]=this._convertLatLngs(r[b]);return a},_project:function(){var r=new j;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,r),this._bounds.isValid()&&r.isValid()&&(this._rawPxBounds=r,this._updateBounds())},_updateBounds:function(){var r=this._clickTolerance(),a=new q(r,r);this._rawPxBounds&&(this._pxBounds=new j([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(r,a,d){var b=r[0]instanceof it,T=r.length,z,Y;if(b){for(Y=[],z=0;z<T;z++)Y[z]=this._map.latLngToLayerPoint(r[z]),d.extend(Y[z]);a.push(Y)}else for(z=0;z<T;z++)this._projectLatlngs(r[z],a,d)},_clipPoints:function(){var r=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(r))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,d,b,T,z,Y,ut,mt;for(d=0,T=0,z=this._rings.length;d<z;d++)for(mt=this._rings[d],b=0,Y=mt.length;b<Y-1;b++)ut=lu(mt[b],mt[b+1],r,b,!0),ut&&(a[T]=a[T]||[],a[T].push(ut[0]),(ut[1]!==mt[b+1]||b===Y-2)&&(a[T].push(ut[1]),T++))}},_simplifyPoints:function(){for(var r=this._parts,a=this.options.smoothFactor,d=0,b=r.length;d<b;d++)r[d]=su(r[d],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(r,a){var d,b,T,z,Y,ut,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(r))return!1;for(d=0,z=this._parts.length;d<z;d++)for(ut=this._parts[d],b=0,Y=ut.length,T=Y-1;b<Y;T=b++)if(!(!a&&b===0)&&ou(r,ut[T],ut[b])<=mt)return!0;return!1}});function qp(r,a){return new ci(r,a)}ci._flat=cu;var vr=ci.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return ru(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(r){var a=ci.prototype._convertLatLngs.call(this,r),d=a.length;return d>=2&&a[0]instanceof it&&a[0].equals(a[d-1])&&a.pop(),a},_setLatLngs:function(r){ci.prototype._setLatLngs.call(this,r),Pn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Pn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var r=this._renderer._bounds,a=this.options.weight,d=new q(a,a);if(r=new j(r.min.subtract(d),r.max.add(d)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(r))){if(this.options.noClip){this._parts=this._rings;return}for(var b=0,T=this._rings.length,z;b<T;b++)z=iu(this._rings[b],r,!0),z.length&&this._parts.push(z)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(r){var a=!1,d,b,T,z,Y,ut,mt,Lt;if(!this._pxBounds||!this._pxBounds.contains(r))return!1;for(z=0,mt=this._parts.length;z<mt;z++)for(d=this._parts[z],Y=0,Lt=d.length,ut=Lt-1;Y<Lt;ut=Y++)b=d[Y],T=d[ut],b.y>r.y!=T.y>r.y&&r.x<(T.x-b.x)*(r.y-b.y)/(T.y-b.y)+b.x&&(a=!a);return a||ci.prototype._containsPoint.call(this,r,!0)}});function jp(r,a){return new vr(r,a)}var ui=li.extend({initialize:function(r,a){y(this,a),this._layers={},r&&this.addData(r)},addData:function(r){var a=w(r)?r:r.features,d,b,T;if(a){for(d=0,b=a.length;d<b;d++)T=a[d],(T.geometries||T.geometry||T.features||T.coordinates)&&this.addData(T);return this}var z=this.options;if(z.filter&&!z.filter(r))return this;var Y=bo(r,z);return Y?(Y.feature=So(r),Y.defaultOptions=Y.options,this.resetStyle(Y),z.onEachFeature&&z.onEachFeature(r,Y),this.addLayer(Y)):this},resetStyle:function(r){return r===void 0?this.eachLayer(this.resetStyle,this):(r.options=s({},r.defaultOptions),this._setLayerStyle(r,this.options.style),this)},setStyle:function(r){return this.eachLayer(function(a){this._setLayerStyle(a,r)},this)},_setLayerStyle:function(r,a){r.setStyle&&(typeof a=="function"&&(a=a(r.feature)),r.setStyle(a))}});function bo(r,a){var d=r.type==="Feature"?r.geometry:r,b=d?d.coordinates:null,T=[],z=a&&a.pointToLayer,Y=a&&a.coordsToLatLng||rl,ut,mt,Lt,Bt;if(!b&&!d)return null;switch(d.type){case"Point":return ut=Y(b),fu(z,r,ut,a);case"MultiPoint":for(Lt=0,Bt=b.length;Lt<Bt;Lt++)ut=Y(b[Lt]),T.push(fu(z,r,ut,a));return new li(T);case"LineString":case"MultiLineString":return mt=wo(b,d.type==="LineString"?0:1,Y),new ci(mt,a);case"Polygon":case"MultiPolygon":return mt=wo(b,d.type==="Polygon"?1:2,Y),new vr(mt,a);case"GeometryCollection":for(Lt=0,Bt=d.geometries.length;Lt<Bt;Lt++){var $t=bo({geometry:d.geometries[Lt],type:"Feature",properties:r.properties},a);$t&&T.push($t)}return new li(T);case"FeatureCollection":for(Lt=0,Bt=d.features.length;Lt<Bt;Lt++){var he=bo(d.features[Lt],a);he&&T.push(he)}return new li(T);default:throw new Error("Invalid GeoJSON object.")}}function fu(r,a,d,b){return r?r(a,d):new yo(d,b&&b.markersInheritOptions&&b)}function rl(r){return new it(r[1],r[0],r[2])}function wo(r,a,d){for(var b=[],T=0,z=r.length,Y;T<z;T++)Y=a?wo(r[T],a-1,d):(d||rl)(r[T]),b.push(Y);return b}function sl(r,a){return r=wt(r),r.alt!==void 0?[_(r.lng,a),_(r.lat,a),_(r.alt,a)]:[_(r.lng,a),_(r.lat,a)]}function Mo(r,a,d,b){for(var T=[],z=0,Y=r.length;z<Y;z++)T.push(a?Mo(r[z],Pn(r[z])?0:a-1,d,b):sl(r[z],b));return!a&&d&&T.length>0&&T.push(T[0].slice()),T}function yr(r,a){return r.feature?s({},r.feature,{geometry:a}):So(a)}function So(r){return r.type==="Feature"||r.type==="FeatureCollection"?r:{type:"Feature",properties:{},geometry:r}}var ol={toGeoJSON:function(r){return yr(this,{type:"Point",coordinates:sl(this.getLatLng(),r)})}};yo.include(ol),il.include(ol),xo.include(ol),ci.include({toGeoJSON:function(r){var a=!Pn(this._latlngs),d=Mo(this._latlngs,a?1:0,!1,r);return yr(this,{type:(a?"Multi":"")+"LineString",coordinates:d})}}),vr.include({toGeoJSON:function(r){var a=!Pn(this._latlngs),d=a&&!Pn(this._latlngs[0]),b=Mo(this._latlngs,d?2:a?1:0,!0,r);return a||(b=[b]),yr(this,{type:(d?"Multi":"")+"Polygon",coordinates:b})}}),gr.include({toMultiPoint:function(r){var a=[];return this.eachLayer(function(d){a.push(d.toGeoJSON(r).geometry.coordinates)}),yr(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(r){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(r);var d=a==="GeometryCollection",b=[];return this.eachLayer(function(T){if(T.toGeoJSON){var z=T.toGeoJSON(r);if(d)b.push(z.geometry);else{var Y=So(z);Y.type==="FeatureCollection"?b.push.apply(b,Y.features):b.push(Y)}}}),d?yr(this,{geometries:b,type:"GeometryCollection"}):{type:"FeatureCollection",features:b}}});function pu(r,a){return new ui(r,a)}var Yp=pu,Eo=Un.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(r,a,d){this._url=r,this._bounds=Q(a),y(this,d)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Yt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){fe(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(r){return this.options.opacity=r,this._image&&this._updateOpacity(),this},setStyle:function(r){return r.opacity&&this.setOpacity(r.opacity),this},bringToFront:function(){return this._map&&Cn(this._image),this},bringToBack:function(){return this._map&&Kn(this._image),this},setUrl:function(r){return this._url=r,this._image&&(this._image.src=r),this},setBounds:function(r){return this._bounds=Q(r),this._map&&this._reset(),this},getEvents:function(){var r={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(r.zoomanim=this._animateZoom),r},setZIndex:function(r){return this.options.zIndex=r,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var r=this._url.tagName==="IMG",a=this._image=r?this._url:Xt("img");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),r){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(r){var a=this._map.getZoomScale(r.zoom),d=this._map._latLngBoundsToNewLayerBounds(this._bounds,r.zoom,r.center).min;Gi(this._image,d,a)},_reset:function(){var r=this._image,a=new j(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),d=a.getSize();ze(r,a.min),r.style.width=d.x+"px",r.style.height=d.y+"px"},_updateOpacity:function(){_n(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var r=this.options.errorOverlayUrl;r&&this._url!==r&&(this._url=r,this._image.src=r)},getCenter:function(){return this._bounds.getCenter()}}),$p=function(r,a,d){return new Eo(r,a,d)},mu=Eo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var r=this._url.tagName==="VIDEO",a=this._image=r?this._url:Xt("video");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onloadeddata=l(this.fire,this,"load"),r){for(var d=a.getElementsByTagName("source"),b=[],T=0;T<d.length;T++)b.push(d[T].src);this._url=d.length>0?b:[a.src];return}w(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var z=0;z<this._url.length;z++){var Y=Xt("source");Y.src=this._url[z],a.appendChild(Y)}}});function Kp(r,a,d){return new mu(r,a,d)}var gu=Eo.extend({_initImage:function(){var r=this._image=this._url;Yt(r,"leaflet-image-layer"),this._zoomAnimated&&Yt(r,"leaflet-zoom-animated"),this.options.className&&Yt(r,this.options.className),r.onselectstart=p,r.onmousemove=p}});function Jp(r,a,d){return new gu(r,a,d)}var ti=Un.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(r,a){r&&(r instanceof it||w(r))?(this._latlng=wt(r),y(this,a)):(y(this,r),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(r){return r=arguments.length?r:this._source._map,r.hasLayer(this)||r.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(r){return this._map?this.close():(arguments.length?this._source=r:r=this._source,this._prepareOpen(),this.openOn(r._map)),this},onAdd:function(r){this._zoomAnimated=r._zoomAnimated,this._container||this._initLayout(),r._fadeAnimated&&_n(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),r._fadeAnimated&&_n(this._container,1),this.bringToFront(),this.options.interactive&&(Yt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(r){r._fadeAnimated?(_n(this._container,0),this._removeTimeout=setTimeout(l(fe,void 0,this._container),200)):fe(this._container),this.options.interactive&&(be(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(r){return this._latlng=wt(r),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(r){return this._content=r,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var r={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(r.zoomanim=this._animateZoom),r},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Cn(this._container),this},bringToBack:function(){return this._map&&Kn(this._container),this},_prepareOpen:function(r){var a=this._source;if(!a._map)return!1;if(a instanceof li){a=null;var d=this._source._layers;for(var b in d)if(d[b]._map){a=d[b];break}if(!a)return!1;this._source=a}if(!r)if(a.getCenter)r=a.getCenter();else if(a.getLatLng)r=a.getLatLng();else if(a.getBounds)r=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(r),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var r=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")r.innerHTML=a;else{for(;r.hasChildNodes();)r.removeChild(r.firstChild);r.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var r=this._map.latLngToLayerPoint(this._latlng),a=at(this.options.offset),d=this._getAnchor();this._zoomAnimated?ze(this._container,r.add(d)):a=a.add(r).add(d);var b=this._containerBottom=-a.y,T=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=b+"px",this._container.style.left=T+"px"}},_getAnchor:function(){return[0,0]}});de.include({_initOverlay:function(r,a,d,b){var T=a;return T instanceof r||(T=new r(b).setContent(a)),d&&T.setLatLng(d),T}}),Un.include({_initOverlay:function(r,a,d,b){var T=d;return T instanceof r?(y(T,b),T._source=this):(T=a&&!b?a:new r(b,this),T.setContent(d)),T}});var To=ti.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(r){return r=arguments.length?r:this._source._map,!r.hasLayer(this)&&r._popup&&r._popup.options.autoClose&&r.removeLayer(r._popup),r._popup=this,ti.prototype.openOn.call(this,r)},onAdd:function(r){ti.prototype.onAdd.call(this,r),r.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof Si||this._source.on("preclick",Zi))},onRemove:function(r){ti.prototype.onRemove.call(this,r),r.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof Si||this._source.off("preclick",Zi))},getEvents:function(){var r=ti.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(r.preclick=this.close),this.options.keepInView&&(r.moveend=this._adjustPan),r},_initLayout:function(){var r="leaflet-popup",a=this._container=Xt("div",r+" "+(this.options.className||"")+" leaflet-zoom-animated"),d=this._wrapper=Xt("div",r+"-content-wrapper",a);if(this._contentNode=Xt("div",r+"-content",d),ws(a),Ya(this._contentNode),se(a,"contextmenu",Zi),this._tipContainer=Xt("div",r+"-tip-container",a),this._tip=Xt("div",r+"-tip",this._tipContainer),this.options.closeButton){var b=this._closeButton=Xt("a",r+"-close-button",a);b.setAttribute("role","button"),b.setAttribute("aria-label","Close popup"),b.href="#close",b.innerHTML='<span aria-hidden="true">&#215;</span>',se(b,"click",function(T){Ke(T),this.close()},this)}},_updateLayout:function(){var r=this._contentNode,a=r.style;a.width="",a.whiteSpace="nowrap";var d=r.offsetWidth;d=Math.min(d,this.options.maxWidth),d=Math.max(d,this.options.minWidth),a.width=d+1+"px",a.whiteSpace="",a.height="";var b=r.offsetHeight,T=this.options.maxHeight,z="leaflet-popup-scrolled";T&&b>T?(a.height=T+"px",Yt(r,z)):be(r,z),this._containerWidth=this._container.offsetWidth},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center),d=this._getAnchor();ze(this._container,a.add(d))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var r=this._map,a=parseInt(ai(this._container,"marginBottom"),10)||0,d=this._container.offsetHeight+a,b=this._containerWidth,T=new q(this._containerLeft,-d-this._containerBottom);T._add(Wi(this._container));var z=r.layerPointToContainerPoint(T),Y=at(this.options.autoPanPadding),ut=at(this.options.autoPanPaddingTopLeft||Y),mt=at(this.options.autoPanPaddingBottomRight||Y),Lt=r.getSize(),Bt=0,$t=0;z.x+b+mt.x>Lt.x&&(Bt=z.x+b-Lt.x+mt.x),z.x-Bt-ut.x<0&&(Bt=z.x-ut.x),z.y+d+mt.y>Lt.y&&($t=z.y+d-Lt.y+mt.y),z.y-$t-ut.y<0&&($t=z.y-ut.y),(Bt||$t)&&(this.options.keepInView&&(this._autopanning=!0),r.fire("autopanstart").panBy([Bt,$t]))}},_getAnchor:function(){return at(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Qp=function(r,a){return new To(r,a)};de.mergeOptions({closePopupOnClick:!0}),de.include({openPopup:function(r,a,d){return this._initOverlay(To,r,a,d).openOn(this),this},closePopup:function(r){return r=arguments.length?r:this._popup,r&&r.close(),this}}),Un.include({bindPopup:function(r,a){return this._popup=this._initOverlay(To,this._popup,r,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(r){return this._popup&&(this instanceof li||(this._popup._source=this),this._popup._prepareOpen(r||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(r){return this._popup&&this._popup.setContent(r),this},getPopup:function(){return this._popup},_openPopup:function(r){if(!(!this._popup||!this._map)){Xi(r);var a=r.layer||r.target;if(this._popup._source===a&&!(a instanceof Si)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(r.latlng);return}this._popup._source=a,this.openPopup(r.latlng)}},_movePopup:function(r){this._popup.setLatLng(r.latlng)},_onKeyPress:function(r){r.originalEvent.keyCode===13&&this._openPopup(r)}});var Ao=ti.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(r){ti.prototype.onAdd.call(this,r),this.setOpacity(this.options.opacity),r.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(r){ti.prototype.onRemove.call(this,r),r.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var r=ti.prototype.getEvents.call(this);return this.options.permanent||(r.preclick=this.close),r},_initLayout:function(){var r="leaflet-tooltip",a=r+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Xt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+u(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(r){var a,d,b=this._map,T=this._container,z=b.latLngToContainerPoint(b.getCenter()),Y=b.layerPointToContainerPoint(r),ut=this.options.direction,mt=T.offsetWidth,Lt=T.offsetHeight,Bt=at(this.options.offset),$t=this._getAnchor();ut==="top"?(a=mt/2,d=Lt):ut==="bottom"?(a=mt/2,d=0):ut==="center"?(a=mt/2,d=Lt/2):ut==="right"?(a=0,d=Lt/2):ut==="left"?(a=mt,d=Lt/2):Y.x<z.x?(ut="right",a=0,d=Lt/2):(ut="left",a=mt+(Bt.x+$t.x)*2,d=Lt/2),r=r.subtract(at(a,d,!0)).add(Bt).add($t),be(T,"leaflet-tooltip-right"),be(T,"leaflet-tooltip-left"),be(T,"leaflet-tooltip-top"),be(T,"leaflet-tooltip-bottom"),Yt(T,"leaflet-tooltip-"+ut),ze(T,r)},_updatePosition:function(){var r=this._map.latLngToLayerPoint(this._latlng);this._setPosition(r)},setOpacity:function(r){this.options.opacity=r,this._container&&_n(this._container,r)},_animateZoom:function(r){var a=this._map._latLngToNewLayerPoint(this._latlng,r.zoom,r.center);this._setPosition(a)},_getAnchor:function(){return at(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),tm=function(r,a){return new Ao(r,a)};de.include({openTooltip:function(r,a,d){return this._initOverlay(Ao,r,a,d).openOn(this),this},closeTooltip:function(r){return r.close(),this}}),Un.include({bindTooltip:function(r,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Ao,this._tooltip,r,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(r){if(!(!r&&this._tooltipHandlersAdded)){var a=r?"off":"on",d={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?d.add=this._openTooltip:(d.mouseover=this._openTooltip,d.mouseout=this.closeTooltip,d.click=this._openTooltip,this._map?this._addFocusListeners():d.add=this._addFocusListeners),this._tooltip.options.sticky&&(d.mousemove=this._moveTooltip),this[a](d),this._tooltipHandlersAdded=!r}},openTooltip:function(r){return this._tooltip&&(this instanceof li||(this._tooltip._source=this),this._tooltip._prepareOpen(r)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(r){return this._tooltip&&this._tooltip.setContent(r),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(r){var a=typeof r.getElement=="function"&&r.getElement();a&&(se(a,"focus",function(){this._tooltip._source=r,this.openTooltip()},this),se(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(r){var a=typeof r.getElement=="function"&&r.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(r){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(r)});return}this._tooltip._source=r.layer||r.target,this.openTooltip(this._tooltip.options.sticky?r.latlng:void 0)}},_moveTooltip:function(r){var a=r.latlng,d,b;this._tooltip.options.sticky&&r.originalEvent&&(d=this._map.mouseEventToContainerPoint(r.originalEvent),b=this._map.containerPointToLayerPoint(d),a=this._map.layerPointToLatLng(b)),this._tooltip.setLatLng(a)}});var _u=_r.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(r){var a=r&&r.tagName==="DIV"?r:document.createElement("div"),d=this.options;if(d.html instanceof Element?(Vi(a),a.appendChild(d.html)):a.innerHTML=d.html!==!1?d.html:"",d.bgPos){var b=at(d.bgPos);a.style.backgroundPosition=-b.x+"px "+-b.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function em(r){return new _u(r)}_r.Default=Es;var Ts=Un.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Wt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(r){y(this,r)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(r){r._addZoomLimit(this)},onRemove:function(r){this._removeAllTiles(),fe(this._container),r._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Cn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Kn(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(r){return this.options.opacity=r,this._updateOpacity(),this},setZIndex:function(r){return this.options.zIndex=r,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var r=this._clampZoom(this._map.getZoom());r!==this._tileZoom&&(this._tileZoom=r,this._updateLevels()),this._update()}return this},getEvents:function(){var r={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=h(this._onMoveEnd,this.options.updateInterval,this)),r.move=this._onMove),this._zoomAnimated&&(r.zoomanim=this._animateZoom),r},createTile:function(){return document.createElement("div")},getTileSize:function(){var r=this.options.tileSize;return r instanceof q?r:new q(r,r)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(r){for(var a=this.getPane().children,d=-r(-1/0,1/0),b=0,T=a.length,z;b<T;b++)z=a[b].style.zIndex,a[b]!==this._container&&z&&(d=r(d,+z));isFinite(d)&&(this.options.zIndex=d+r(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Wt.ielt9){_n(this._container,this.options.opacity);var r=+new Date,a=!1,d=!1;for(var b in this._tiles){var T=this._tiles[b];if(!(!T.current||!T.loaded)){var z=Math.min(1,(r-T.loaded)/200);_n(T.el,z),z<1?a=!0:(T.active?d=!0:this._onOpaqueTile(T),T.active=!0)}}d&&!this._noPrune&&this._pruneTiles(),a&&(U(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Xt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var r=this._tileZoom,a=this.options.maxZoom;if(r!==void 0){for(var d in this._levels)d=Number(d),this._levels[d].el.children.length||d===r?(this._levels[d].el.style.zIndex=a-Math.abs(r-d),this._onUpdateLevel(d)):(fe(this._levels[d].el),this._removeTilesAtZoom(d),this._onRemoveLevel(d),delete this._levels[d]);var b=this._levels[r],T=this._map;return b||(b=this._levels[r]={},b.el=Xt("div","leaflet-tile-container leaflet-zoom-animated",this._container),b.el.style.zIndex=a,b.origin=T.project(T.unproject(T.getPixelOrigin()),r).round(),b.zoom=r,this._setZoomTransform(b,T.getCenter(),T.getZoom()),p(b.el.offsetWidth),this._onCreateLevel(b)),this._level=b,b}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var r,a,d=this._map.getZoom();if(d>this.options.maxZoom||d<this.options.minZoom){this._removeAllTiles();return}for(r in this._tiles)a=this._tiles[r],a.retain=a.current;for(r in this._tiles)if(a=this._tiles[r],a.current&&!a.active){var b=a.coords;this._retainParent(b.x,b.y,b.z,b.z-5)||this._retainChildren(b.x,b.y,b.z,b.z+2)}for(r in this._tiles)this._tiles[r].retain||this._removeTile(r)}},_removeTilesAtZoom:function(r){for(var a in this._tiles)this._tiles[a].coords.z===r&&this._removeTile(a)},_removeAllTiles:function(){for(var r in this._tiles)this._removeTile(r)},_invalidateAll:function(){for(var r in this._levels)fe(this._levels[r].el),this._onRemoveLevel(Number(r)),delete this._levels[r];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(r,a,d,b){var T=Math.floor(r/2),z=Math.floor(a/2),Y=d-1,ut=new q(+T,+z);ut.z=+Y;var mt=this._tileCoordsToKey(ut),Lt=this._tiles[mt];return Lt&&Lt.active?(Lt.retain=!0,!0):(Lt&&Lt.loaded&&(Lt.retain=!0),Y>b?this._retainParent(T,z,Y,b):!1)},_retainChildren:function(r,a,d,b){for(var T=2*r;T<2*r+2;T++)for(var z=2*a;z<2*a+2;z++){var Y=new q(T,z);Y.z=d+1;var ut=this._tileCoordsToKey(Y),mt=this._tiles[ut];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);d+1<b&&this._retainChildren(T,z,d+1,b)}},_resetView:function(r){var a=r&&(r.pinch||r.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(r){this._setView(r.center,r.zoom,!0,r.noUpdate)},_clampZoom:function(r){var a=this.options;return a.minNativeZoom!==void 0&&r<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<r?a.maxNativeZoom:r},_setView:function(r,a,d,b){var T=Math.round(a);this.options.maxZoom!==void 0&&T>this.options.maxZoom||this.options.minZoom!==void 0&&T<this.options.minZoom?T=void 0:T=this._clampZoom(T);var z=this.options.updateWhenZooming&&T!==this._tileZoom;(!b||z)&&(this._tileZoom=T,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),T!==void 0&&this._update(r),d||this._pruneTiles(),this._noPrune=!!d),this._setZoomTransforms(r,a)},_setZoomTransforms:function(r,a){for(var d in this._levels)this._setZoomTransform(this._levels[d],r,a)},_setZoomTransform:function(r,a,d){var b=this._map.getZoomScale(d,r.zoom),T=r.origin.multiplyBy(b).subtract(this._map._getNewPixelOrigin(a,d)).round();Wt.any3d?Gi(r.el,T,b):ze(r.el,T)},_resetGrid:function(){var r=this._map,a=r.options.crs,d=this._tileSize=this.getTileSize(),b=this._tileZoom,T=this._map.getPixelWorldBounds(this._tileZoom);T&&(this._globalTileRange=this._pxBoundsToTileRange(T)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(r.project([0,a.wrapLng[0]],b).x/d.x),Math.ceil(r.project([0,a.wrapLng[1]],b).x/d.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(r.project([a.wrapLat[0],0],b).y/d.x),Math.ceil(r.project([a.wrapLat[1],0],b).y/d.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(r){var a=this._map,d=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),b=a.getZoomScale(d,this._tileZoom),T=a.project(r,this._tileZoom).floor(),z=a.getSize().divideBy(b*2);return new j(T.subtract(z),T.add(z))},_update:function(r){var a=this._map;if(a){var d=this._clampZoom(a.getZoom());if(r===void 0&&(r=a.getCenter()),this._tileZoom!==void 0){var b=this._getTiledPixelBounds(r),T=this._pxBoundsToTileRange(b),z=T.getCenter(),Y=[],ut=this.options.keepBuffer,mt=new j(T.getBottomLeft().subtract([ut,-ut]),T.getTopRight().add([ut,-ut]));if(!(isFinite(T.min.x)&&isFinite(T.min.y)&&isFinite(T.max.x)&&isFinite(T.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Lt in this._tiles){var Bt=this._tiles[Lt].coords;(Bt.z!==this._tileZoom||!mt.contains(new q(Bt.x,Bt.y)))&&(this._tiles[Lt].current=!1)}if(Math.abs(d-this._tileZoom)>1){this._setView(r,d);return}for(var $t=T.min.y;$t<=T.max.y;$t++)for(var he=T.min.x;he<=T.max.x;he++){var cn=new q(he,$t);if(cn.z=this._tileZoom,!!this._isValidTile(cn)){var We=this._tiles[this._tileCoordsToKey(cn)];We?We.current=!0:Y.push(cn)}}if(Y.sort(function(vn,br){return vn.distanceTo(z)-br.distanceTo(z)}),Y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Rn=document.createDocumentFragment();for(he=0;he<Y.length;he++)this._addTile(Y[he],Rn);this._level.el.appendChild(Rn)}}}},_isValidTile:function(r){var a=this._map.options.crs;if(!a.infinite){var d=this._globalTileRange;if(!a.wrapLng&&(r.x<d.min.x||r.x>d.max.x)||!a.wrapLat&&(r.y<d.min.y||r.y>d.max.y))return!1}if(!this.options.bounds)return!0;var b=this._tileCoordsToBounds(r);return Q(this.options.bounds).overlaps(b)},_keyToBounds:function(r){return this._tileCoordsToBounds(this._keyToTileCoords(r))},_tileCoordsToNwSe:function(r){var a=this._map,d=this.getTileSize(),b=r.scaleBy(d),T=b.add(d),z=a.unproject(b,r.z),Y=a.unproject(T,r.z);return[z,Y]},_tileCoordsToBounds:function(r){var a=this._tileCoordsToNwSe(r),d=new Ct(a[0],a[1]);return this.options.noWrap||(d=this._map.wrapLatLngBounds(d)),d},_tileCoordsToKey:function(r){return r.x+":"+r.y+":"+r.z},_keyToTileCoords:function(r){var a=r.split(":"),d=new q(+a[0],+a[1]);return d.z=+a[2],d},_removeTile:function(r){var a=this._tiles[r];a&&(fe(a.el),delete this._tiles[r],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(r)}))},_initTile:function(r){Yt(r,"leaflet-tile");var a=this.getTileSize();r.style.width=a.x+"px",r.style.height=a.y+"px",r.onselectstart=p,r.onmousemove=p,Wt.ielt9&&this.options.opacity<1&&_n(r,this.options.opacity)},_addTile:function(r,a){var d=this._getTilePos(r),b=this._tileCoordsToKey(r),T=this.createTile(this._wrapCoords(r),l(this._tileReady,this,r));this._initTile(T),this.createTile.length<2&&W(l(this._tileReady,this,r,null,T)),ze(T,d),this._tiles[b]={el:T,coords:r,current:!0},a.appendChild(T),this.fire("tileloadstart",{tile:T,coords:r})},_tileReady:function(r,a,d){a&&this.fire("tileerror",{error:a,tile:d,coords:r});var b=this._tileCoordsToKey(r);d=this._tiles[b],d&&(d.loaded=+new Date,this._map._fadeAnimated?(_n(d.el,0),U(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this)):(d.active=!0,this._pruneTiles()),a||(Yt(d.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:d.el,coords:r})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Wt.ielt9||!this._map._fadeAnimated?W(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(r){return r.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(r){var a=new q(this._wrapX?f(r.x,this._wrapX):r.x,this._wrapY?f(r.y,this._wrapY):r.y);return a.z=r.z,a},_pxBoundsToTileRange:function(r){var a=this.getTileSize();return new j(r.min.unscaleBy(a).floor(),r.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var r in this._tiles)if(!this._tiles[r].loaded)return!1;return!0}});function nm(r){return new Ts(r)}var xr=Ts.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(r,a){this._url=r,a=y(this,a),a.detectRetina&&Wt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(r,a){return this._url===r&&a===void 0&&(a=!0),this._url=r,a||this.redraw(),this},createTile:function(r,a){var d=document.createElement("img");return se(d,"load",l(this._tileOnLoad,this,a,d)),se(d,"error",l(this._tileOnError,this,a,d)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(d.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(d.referrerPolicy=this.options.referrerPolicy),d.alt="",d.src=this.getTileUrl(r),d},getTileUrl:function(r){var a={r:Wt.retina?"@2x":"",s:this._getSubdomain(r),x:r.x,y:r.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var d=this._globalTileRange.max.y-r.y;this.options.tms&&(a.y=d),a["-y"]=d}return S(this._url,s(a,this.options))},_tileOnLoad:function(r,a){Wt.ielt9?setTimeout(l(r,this,null,a),0):r(null,a)},_tileOnError:function(r,a,d){var b=this.options.errorTileUrl;b&&a.getAttribute("src")!==b&&(a.src=b),r(d,a)},_onTileRemove:function(r){r.tile.onload=null},_getZoomForUrl:function(){var r=this._tileZoom,a=this.options.maxZoom,d=this.options.zoomReverse,b=this.options.zoomOffset;return d&&(r=a-r),r+b},_getSubdomain:function(r){var a=Math.abs(r.x+r.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var r,a;for(r in this._tiles)if(this._tiles[r].coords.z!==this._tileZoom&&(a=this._tiles[r].el,a.onload=p,a.onerror=p,!a.complete)){a.src=N;var d=this._tiles[r].coords;fe(a),delete this._tiles[r],this.fire("tileabort",{tile:a,coords:d})}},_removeTile:function(r){var a=this._tiles[r];if(a)return a.el.setAttribute("src",N),Ts.prototype._removeTile.call(this,r)},_tileReady:function(r,a,d){if(!(!this._map||d&&d.getAttribute("src")===N))return Ts.prototype._tileReady.call(this,r,a,d)}});function vu(r,a){return new xr(r,a)}var yu=xr.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(r,a){this._url=r;var d=s({},this.defaultWmsParams);for(var b in a)b in this.options||(d[b]=a[b]);a=y(this,a);var T=a.detectRetina&&Wt.retina?2:1,z=this.getTileSize();d.width=z.x*T,d.height=z.y*T,this.wmsParams=d},onAdd:function(r){this._crs=this.options.crs||r.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,xr.prototype.onAdd.call(this,r)},getTileUrl:function(r){var a=this._tileCoordsToNwSe(r),d=this._crs,b=tt(d.project(a[0]),d.project(a[1])),T=b.min,z=b.max,Y=(this._wmsVersion>=1.3&&this._crs===hu?[T.y,T.x,z.y,z.x]:[T.x,T.y,z.x,z.y]).join(","),ut=xr.prototype.getTileUrl.call(this,r);return ut+g(this.wmsParams,ut,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+Y},setParams:function(r,a){return s(this.wmsParams,r),a||this.redraw(),this}});function im(r,a){return new yu(r,a)}xr.WMS=yu,vu.wms=im;var hi=Un.extend({options:{padding:.1},initialize:function(r){y(this,r),u(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Yt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var r={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(r.zoomanim=this._onAnimZoom),r},_onAnimZoom:function(r){this._updateTransform(r.center,r.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(r,a){var d=this._map.getZoomScale(a,this._zoom),b=this._map.getSize().multiplyBy(.5+this.options.padding),T=this._map.project(this._center,a),z=b.multiplyBy(-d).add(T).subtract(this._map._getNewPixelOrigin(r,a));Wt.any3d?Gi(this._container,z,d):ze(this._container,z)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var r in this._layers)this._layers[r]._reset()},_onZoomEnd:function(){for(var r in this._layers)this._layers[r]._project()},_updatePaths:function(){for(var r in this._layers)this._layers[r]._update()},_update:function(){var r=this.options.padding,a=this._map.getSize(),d=this._map.containerPointToLayerPoint(a.multiplyBy(-r)).round();this._bounds=new j(d,d.add(a.multiplyBy(1+r*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),xu=hi.extend({options:{tolerance:0},getEvents:function(){var r=hi.prototype.getEvents.call(this);return r.viewprereset=this._onViewPreReset,r},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){hi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var r=this._container=document.createElement("canvas");se(r,"mousemove",this._onMouseMove,this),se(r,"click dblclick mousedown mouseup contextmenu",this._onClick,this),se(r,"mouseout",this._handleMouseOut,this),r._leaflet_disable_events=!0,this._ctx=r.getContext("2d")},_destroyContainer:function(){U(this._redrawRequest),delete this._ctx,fe(this._container),xe(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var r;this._redrawBounds=null;for(var a in this._layers)r=this._layers[a],r._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){hi.prototype._update.call(this);var r=this._bounds,a=this._container,d=r.getSize(),b=Wt.retina?2:1;ze(a,r.min),a.width=b*d.x,a.height=b*d.y,a.style.width=d.x+"px",a.style.height=d.y+"px",Wt.retina&&this._ctx.scale(2,2),this._ctx.translate(-r.min.x,-r.min.y),this.fire("update")}},_reset:function(){hi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(r){this._updateDashArray(r),this._layers[u(r)]=r;var a=r._order={layer:r,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(r){this._requestRedraw(r)},_removePath:function(r){var a=r._order,d=a.next,b=a.prev;d?d.prev=b:this._drawLast=b,b?b.next=d:this._drawFirst=d,delete r._order,delete this._layers[u(r)],this._requestRedraw(r)},_updatePath:function(r){this._extendRedrawBounds(r),r._project(),r._update(),this._requestRedraw(r)},_updateStyle:function(r){this._updateDashArray(r),this._requestRedraw(r)},_updateDashArray:function(r){if(typeof r.options.dashArray=="string"){var a=r.options.dashArray.split(/[, ]+/),d=[],b,T;for(T=0;T<a.length;T++){if(b=Number(a[T]),isNaN(b))return;d.push(b)}r.options._dashArray=d}else r.options._dashArray=r.options.dashArray},_requestRedraw:function(r){this._map&&(this._extendRedrawBounds(r),this._redrawRequest=this._redrawRequest||W(this._redraw,this))},_extendRedrawBounds:function(r){if(r._pxBounds){var a=(r.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new j,this._redrawBounds.extend(r._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(r._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var r=this._redrawBounds;if(r){var a=r.getSize();this._ctx.clearRect(r.min.x,r.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var r,a=this._redrawBounds;if(this._ctx.save(),a){var d=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,d.x,d.y),this._ctx.clip()}this._drawing=!0;for(var b=this._drawFirst;b;b=b.next)r=b.layer,(!a||r._pxBounds&&r._pxBounds.intersects(a))&&r._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(r,a){if(this._drawing){var d,b,T,z,Y=r._parts,ut=Y.length,mt=this._ctx;if(ut){for(mt.beginPath(),d=0;d<ut;d++){for(b=0,T=Y[d].length;b<T;b++)z=Y[d][b],mt[b?"lineTo":"moveTo"](z.x,z.y);a&&mt.closePath()}this._fillStroke(mt,r)}}},_updateCircle:function(r){if(!(!this._drawing||r._empty())){var a=r._point,d=this._ctx,b=Math.max(Math.round(r._radius),1),T=(Math.max(Math.round(r._radiusY),1)||b)/b;T!==1&&(d.save(),d.scale(1,T)),d.beginPath(),d.arc(a.x,a.y/T,b,0,Math.PI*2,!1),T!==1&&d.restore(),this._fillStroke(d,r)}},_fillStroke:function(r,a){var d=a.options;d.fill&&(r.globalAlpha=d.fillOpacity,r.fillStyle=d.fillColor||d.color,r.fill(d.fillRule||"evenodd")),d.stroke&&d.weight!==0&&(r.setLineDash&&r.setLineDash(a.options&&a.options._dashArray||[]),r.globalAlpha=d.opacity,r.lineWidth=d.weight,r.strokeStyle=d.color,r.lineCap=d.lineCap,r.lineJoin=d.lineJoin,r.stroke())},_onClick:function(r){for(var a=this._map.mouseEventToLayerPoint(r),d,b,T=this._drawFirst;T;T=T.next)d=T.layer,d.options.interactive&&d._containsPoint(a)&&(!(r.type==="click"||r.type==="preclick")||!this._map._draggableMoved(d))&&(b=d);this._fireEvent(b?[b]:!1,r)},_onMouseMove:function(r){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(r);this._handleMouseHover(r,a)}},_handleMouseOut:function(r){var a=this._hoveredLayer;a&&(be(this._container,"leaflet-interactive"),this._fireEvent([a],r,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(r,a){if(!this._mouseHoverThrottled){for(var d,b,T=this._drawFirst;T;T=T.next)d=T.layer,d.options.interactive&&d._containsPoint(a)&&(b=d);b!==this._hoveredLayer&&(this._handleMouseOut(r),b&&(Yt(this._container,"leaflet-interactive"),this._fireEvent([b],r,"mouseover"),this._hoveredLayer=b)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,r),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(r,a,d){this._map._fireDOMEvent(a,d||a.type,r)},_bringToFront:function(r){var a=r._order;if(a){var d=a.next,b=a.prev;if(d)d.prev=b;else return;b?b.next=d:d&&(this._drawFirst=d),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(r)}},_bringToBack:function(r){var a=r._order;if(a){var d=a.next,b=a.prev;if(b)b.next=d;else return;d?d.prev=b:b&&(this._drawLast=b),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(r)}}});function bu(r){return Wt.canvas?new xu(r):null}var As=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(r){return document.createElement("<lvml:"+r+' class="lvml">')}}catch{}return function(r){return document.createElement("<"+r+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),rm={_initContainer:function(){this._container=Xt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(hi.prototype._update.call(this),this.fire("update"))},_initPath:function(r){var a=r._container=As("shape");Yt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",r._path=As("path"),a.appendChild(r._path),this._updateStyle(r),this._layers[u(r)]=r},_addPath:function(r){var a=r._container;this._container.appendChild(a),r.options.interactive&&r.addInteractiveTarget(a)},_removePath:function(r){var a=r._container;fe(a),r.removeInteractiveTarget(a),delete this._layers[u(r)]},_updateStyle:function(r){var a=r._stroke,d=r._fill,b=r.options,T=r._container;T.stroked=!!b.stroke,T.filled=!!b.fill,b.stroke?(a||(a=r._stroke=As("stroke")),T.appendChild(a),a.weight=b.weight+"px",a.color=b.color,a.opacity=b.opacity,b.dashArray?a.dashStyle=w(b.dashArray)?b.dashArray.join(" "):b.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=b.lineCap.replace("butt","flat"),a.joinstyle=b.lineJoin):a&&(T.removeChild(a),r._stroke=null),b.fill?(d||(d=r._fill=As("fill")),T.appendChild(d),d.color=b.fillColor||b.color,d.opacity=b.fillOpacity):d&&(T.removeChild(d),r._fill=null)},_updateCircle:function(r){var a=r._point.round(),d=Math.round(r._radius),b=Math.round(r._radiusY||d);this._setPath(r,r._empty()?"M0 0":"AL "+a.x+","+a.y+" "+d+","+b+" 0,"+65535*360)},_setPath:function(r,a){r._path.v=a},_bringToFront:function(r){Cn(r._container)},_bringToBack:function(r){Kn(r._container)}},Lo=Wt.vml?As:et,Ls=hi.extend({_initContainer:function(){this._container=Lo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=Lo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){fe(this._container),xe(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){hi.prototype._update.call(this);var r=this._bounds,a=r.getSize(),d=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,d.setAttribute("width",a.x),d.setAttribute("height",a.y)),ze(d,r.min),d.setAttribute("viewBox",[r.min.x,r.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(r){var a=r._path=Lo("path");r.options.className&&Yt(a,r.options.className),r.options.interactive&&Yt(a,"leaflet-interactive"),this._updateStyle(r),this._layers[u(r)]=r},_addPath:function(r){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(r._path),r.addInteractiveTarget(r._path)},_removePath:function(r){fe(r._path),r.removeInteractiveTarget(r._path),delete this._layers[u(r)]},_updatePath:function(r){r._project(),r._update()},_updateStyle:function(r){var a=r._path,d=r.options;a&&(d.stroke?(a.setAttribute("stroke",d.color),a.setAttribute("stroke-opacity",d.opacity),a.setAttribute("stroke-width",d.weight),a.setAttribute("stroke-linecap",d.lineCap),a.setAttribute("stroke-linejoin",d.lineJoin),d.dashArray?a.setAttribute("stroke-dasharray",d.dashArray):a.removeAttribute("stroke-dasharray"),d.dashOffset?a.setAttribute("stroke-dashoffset",d.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),d.fill?(a.setAttribute("fill",d.fillColor||d.color),a.setAttribute("fill-opacity",d.fillOpacity),a.setAttribute("fill-rule",d.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(r,a){this._setPath(r,$(r._parts,a))},_updateCircle:function(r){var a=r._point,d=Math.max(Math.round(r._radius),1),b=Math.max(Math.round(r._radiusY),1)||d,T="a"+d+","+b+" 0 1,0 ",z=r._empty()?"M0 0":"M"+(a.x-d)+","+a.y+T+d*2+",0 "+T+-d*2+",0 ";this._setPath(r,z)},_setPath:function(r,a){r._path.setAttribute("d",a)},_bringToFront:function(r){Cn(r._path)},_bringToBack:function(r){Kn(r._path)}});Wt.vml&&Ls.include(rm);function wu(r){return Wt.svg||Wt.vml?new Ls(r):null}de.include({getRenderer:function(r){var a=r.options.renderer||this._getPaneRenderer(r.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(r){if(r==="overlayPane"||r===void 0)return!1;var a=this._paneRenderers[r];return a===void 0&&(a=this._createRenderer({pane:r}),this._paneRenderers[r]=a),a},_createRenderer:function(r){return this.options.preferCanvas&&bu(r)||wu(r)}});var Mu=vr.extend({initialize:function(r,a){vr.prototype.initialize.call(this,this._boundsToLatLngs(r),a)},setBounds:function(r){return this.setLatLngs(this._boundsToLatLngs(r))},_boundsToLatLngs:function(r){return r=Q(r),[r.getSouthWest(),r.getNorthWest(),r.getNorthEast(),r.getSouthEast()]}});function sm(r,a){return new Mu(r,a)}Ls.create=Lo,Ls.pointsToPath=$,ui.geometryToLayer=bo,ui.coordsToLatLng=rl,ui.coordsToLatLngs=wo,ui.latLngToCoords=sl,ui.latLngsToCoords=Mo,ui.getFeature=yr,ui.asFeature=So,de.mergeOptions({boxZoom:!0});var Su=Qn.extend({initialize:function(r){this._map=r,this._container=r._container,this._pane=r._panes.overlayPane,this._resetStateTimeout=0,r.on("unload",this._destroy,this)},addHooks:function(){se(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){xe(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){fe(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(r){if(!r.shiftKey||r.which!==1&&r.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),ys(),Ha(),this._startPoint=this._map.mouseEventToContainerPoint(r),se(document,{contextmenu:Xi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(r){this._moved||(this._moved=!0,this._box=Xt("div","leaflet-zoom-box",this._container),Yt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(r);var a=new j(this._point,this._startPoint),d=a.getSize();ze(this._box,a.min),this._box.style.width=d.x+"px",this._box.style.height=d.y+"px"},_finish:function(){this._moved&&(fe(this._box),be(this._container,"leaflet-crosshair")),xs(),Va(),xe(document,{contextmenu:Xi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(r){if(!(r.which!==1&&r.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new Ct(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(r){r.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});de.addInitHook("addHandler","boxZoom",Su),de.mergeOptions({doubleClickZoom:!0});var Eu=Qn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(r){var a=this._map,d=a.getZoom(),b=a.options.zoomDelta,T=r.originalEvent.shiftKey?d-b:d+b;a.options.doubleClickZoom==="center"?a.setZoom(T):a.setZoomAround(r.containerPoint,T)}});de.addInitHook("addHandler","doubleClickZoom",Eu),de.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var Tu=Qn.extend({addHooks:function(){if(!this._draggable){var r=this._map;this._draggable=new Mi(r._mapPane,r._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),r.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),r.on("zoomend",this._onZoomEnd,this),r.whenReady(this._onZoomEnd,this))}Yt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){be(this._map._container,"leaflet-grab"),be(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var r=this._map;if(r._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=Q(this._map.options.maxBounds);this._offsetLimit=tt(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;r.fire("movestart").fire("dragstart"),r.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(r){if(this._map.options.inertia){var a=this._lastTime=+new Date,d=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(d),this._times.push(a),this._prunePositions(a)}this._map.fire("move",r).fire("drag",r)},_prunePositions:function(r){for(;this._positions.length>1&&r-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var r=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(r).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(r,a){return r-(r-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var r=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;r.x<a.min.x&&(r.x=this._viscousLimit(r.x,a.min.x)),r.y<a.min.y&&(r.y=this._viscousLimit(r.y,a.min.y)),r.x>a.max.x&&(r.x=this._viscousLimit(r.x,a.max.x)),r.y>a.max.y&&(r.y=this._viscousLimit(r.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(r)}},_onPreDragWrap:function(){var r=this._worldWidth,a=Math.round(r/2),d=this._initialWorldOffset,b=this._draggable._newPos.x,T=(b-a+d)%r+a-d,z=(b+a+d)%r-a-d,Y=Math.abs(T+d)<Math.abs(z+d)?T:z;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=Y},_onDragEnd:function(r){var a=this._map,d=a.options,b=!d.inertia||r.noInertia||this._times.length<2;if(a.fire("dragend",r),b)a.fire("moveend");else{this._prunePositions(+new Date);var T=this._lastPos.subtract(this._positions[0]),z=(this._lastTime-this._times[0])/1e3,Y=d.easeLinearity,ut=T.multiplyBy(Y/z),mt=ut.distanceTo([0,0]),Lt=Math.min(d.inertiaMaxSpeed,mt),Bt=ut.multiplyBy(Lt/mt),$t=Lt/(d.inertiaDeceleration*Y),he=Bt.multiplyBy(-$t/2).round();!he.x&&!he.y?a.fire("moveend"):(he=a._limitOffset(he,a.options.maxBounds),W(function(){a.panBy(he,{duration:$t,easeLinearity:Y,noMoveStart:!0,animate:!0})}))}}});de.addInitHook("addHandler","dragging",Tu),de.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Au=Qn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(r){this._map=r,this._setPanDelta(r.options.keyboardPanDelta),this._setZoomDelta(r.options.zoomDelta)},addHooks:function(){var r=this._map._container;r.tabIndex<=0&&(r.tabIndex="0"),se(r,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),xe(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var r=document.body,a=document.documentElement,d=r.scrollTop||a.scrollTop,b=r.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(b,d)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(r){var a=this._panKeys={},d=this.keyCodes,b,T;for(b=0,T=d.left.length;b<T;b++)a[d.left[b]]=[-1*r,0];for(b=0,T=d.right.length;b<T;b++)a[d.right[b]]=[r,0];for(b=0,T=d.down.length;b<T;b++)a[d.down[b]]=[0,r];for(b=0,T=d.up.length;b<T;b++)a[d.up[b]]=[0,-1*r]},_setZoomDelta:function(r){var a=this._zoomKeys={},d=this.keyCodes,b,T;for(b=0,T=d.zoomIn.length;b<T;b++)a[d.zoomIn[b]]=r;for(b=0,T=d.zoomOut.length;b<T;b++)a[d.zoomOut[b]]=-r},_addHooks:function(){se(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){xe(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(r){if(!(r.altKey||r.ctrlKey||r.metaKey)){var a=r.keyCode,d=this._map,b;if(a in this._panKeys){if(!d._panAnim||!d._panAnim._inProgress)if(b=this._panKeys[a],r.shiftKey&&(b=at(b).multiplyBy(3)),d.options.maxBounds&&(b=d._limitOffset(at(b),d.options.maxBounds)),d.options.worldCopyJump){var T=d.wrapLatLng(d.unproject(d.project(d.getCenter()).add(b)));d.panTo(T)}else d.panBy(b)}else if(a in this._zoomKeys)d.setZoom(d.getZoom()+(r.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&d._popup&&d._popup.options.closeOnEscapeKey)d.closePopup();else return;Xi(r)}}});de.addInitHook("addHandler","keyboard",Au),de.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Lu=Qn.extend({addHooks:function(){se(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){xe(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(r){var a=Jc(r),d=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(r),this._startTime||(this._startTime=+new Date);var b=Math.max(d-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),b),Xi(r)},_performZoom:function(){var r=this._map,a=r.getZoom(),d=this._map.options.zoomSnap||0;r._stop();var b=this._delta/(this._map.options.wheelPxPerZoomLevel*4),T=4*Math.log(2/(1+Math.exp(-Math.abs(b))))/Math.LN2,z=d?Math.ceil(T/d)*d:T,Y=r._limitZoom(a+(this._delta>0?z:-z))-a;this._delta=0,this._startTime=null,Y&&(r.options.scrollWheelZoom==="center"?r.setZoom(a+Y):r.setZoomAround(this._lastMousePos,a+Y))}});de.addInitHook("addHandler","scrollWheelZoom",Lu);var om=600;de.mergeOptions({tapHold:Wt.touchNative&&Wt.safari&&Wt.mobile,tapTolerance:15});var Cu=Qn.extend({addHooks:function(){se(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){xe(this._map._container,"touchstart",this._onDown,this)},_onDown:function(r){if(clearTimeout(this._holdTimeout),r.touches.length===1){var a=r.touches[0];this._startPos=this._newPos=new q(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(se(document,"touchend",Ke),se(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),om),se(document,"touchend touchcancel contextmenu",this._cancel,this),se(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function r(){xe(document,"touchend",Ke),xe(document,"touchend touchcancel",r)},_cancel:function(){clearTimeout(this._holdTimeout),xe(document,"touchend touchcancel contextmenu",this._cancel,this),xe(document,"touchmove",this._onMove,this)},_onMove:function(r){var a=r.touches[0];this._newPos=new q(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(r,a){var d=new MouseEvent(r,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});d._simulated=!0,a.target.dispatchEvent(d)}});de.addInitHook("addHandler","tapHold",Cu),de.mergeOptions({touchZoom:Wt.touch,bounceAtZoomLimits:!0});var Pu=Qn.extend({addHooks:function(){Yt(this._map._container,"leaflet-touch-zoom"),se(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){be(this._map._container,"leaflet-touch-zoom"),xe(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(r){var a=this._map;if(!(!r.touches||r.touches.length!==2||a._animatingZoom||this._zooming)){var d=a.mouseEventToContainerPoint(r.touches[0]),b=a.mouseEventToContainerPoint(r.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(d.add(b)._divideBy(2))),this._startDist=d.distanceTo(b),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),se(document,"touchmove",this._onTouchMove,this),se(document,"touchend touchcancel",this._onTouchEnd,this),Ke(r)}},_onTouchMove:function(r){if(!(!r.touches||r.touches.length!==2||!this._zooming)){var a=this._map,d=a.mouseEventToContainerPoint(r.touches[0]),b=a.mouseEventToContainerPoint(r.touches[1]),T=d.distanceTo(b)/this._startDist;if(this._zoom=a.getScaleZoom(T,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&T<1||this._zoom>a.getMaxZoom()&&T>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,T===1)return}else{var z=d._add(b)._divideBy(2)._subtract(this._centerPoint);if(T===1&&z.x===0&&z.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(z),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),U(this._animRequest);var Y=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=W(Y,this,!0),Ke(r)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,U(this._animRequest),xe(document,"touchmove",this._onTouchMove,this),xe(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});de.addInitHook("addHandler","touchZoom",Pu),de.BoxZoom=Su,de.DoubleClickZoom=Eu,de.Drag=Tu,de.Keyboard=Au,de.ScrollWheelZoom=Lu,de.TapHold=Cu,de.TouchZoom=Pu,e.Bounds=j,e.Browser=Wt,e.CRS=St,e.Canvas=xu,e.Circle=il,e.CircleMarker=xo,e.Class=A,e.Control=kn,e.DivIcon=_u,e.DivOverlay=ti,e.DomEvent=Sp,e.DomUtil=wp,e.Draggable=Mi,e.Evented=ot,e.FeatureGroup=li,e.GeoJSON=ui,e.GridLayer=Ts,e.Handler=Qn,e.Icon=_r,e.ImageOverlay=Eo,e.LatLng=it,e.LatLngBounds=Ct,e.Layer=Un,e.LayerGroup=gr,e.LineUtil=Up,e.Map=de,e.Marker=yo,e.Mixin=Rp,e.Path=Si,e.Point=q,e.PolyUtil=Ip,e.Polygon=vr,e.Polyline=ci,e.Popup=To,e.PosAnimation=Qc,e.Projection=zp,e.Rectangle=Mu,e.Renderer=hi,e.SVG=Ls,e.SVGOverlay=gu,e.TileLayer=xr,e.Tooltip=Ao,e.Transformation=st,e.Util=F,e.VideoOverlay=mu,e.bind=l,e.bounds=tt,e.canvas=bu,e.circle=Xp,e.circleMarker=Zp,e.control=Ms,e.divIcon=em,e.extend=s,e.featureGroup=Vp,e.geoJSON=pu,e.geoJson=Yp,e.gridLayer=nm,e.icon=Gp,e.imageOverlay=$p,e.latLng=wt,e.latLngBounds=Q,e.layerGroup=Hp,e.map=Ep,e.marker=Wp,e.point=at,e.polygon=jp,e.polyline=qp,e.popup=Qp,e.rectangle=sm,e.setOptions=y,e.stamp=u,e.svg=wu,e.svgOverlay=Jp,e.tileLayer=vu,e.tooltip=tm,e.transformation=xt,e.version=n,e.videoOverlay=Kp;var am=window.L;e.noConflict=function(){return window.L=am,this},window.L=e})})(tc,tc.exports);var _m=tc.exports;const Me=zd(_m),yt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function Bd(){const i=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:i("c-base")||"#eeebe6",terrainRes:Number(i("t-res"))||128,exag:Number(i("dp-exag")||i("t-exag"))||1,smooth:Number(i("t-smooth"))||1,baseH:Number(i("dp-base")||i("t-base-h"))||5,maxDim:Number(i("t-maxdim"))||200,elevZoom:Number(i("t-zoom"))||15,waterOn:t("water-on"),waterCol:i("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:i("road-col")||"#262626",buildOn:t("build-on"),buildCol:i("build-col")||"#9090a0",buildHS:Number(i("build-hs"))||1,gpxCol:i("gpx-col")||"#ff4500",gpxH:Number(i("gpx-h"))||1.2,gpxMW:Number(i("gpx-mw"))||1.5,gpxTW:Number(i("gpx-tw"))||3}}let eo=null,Gt,qe=null,An=null,yi=null,De=null,Ie=null,Dn=[],Je=[],Xe=null,dn=null,Cs=null,$r="none",wr=[];const vm={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function ym(i){i&&(eo=i);const t=Me.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Me.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Me.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),s=Me.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),o=Me.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Gt=Me.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Me.control.zoom({position:"topright"}).addTo(Gt),Me.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:s,Voyager:o,"IGN (France)":n},{},{position:"topright"}).addTo(Gt),new ResizeObserver(()=>Gt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Gt.invalidateSize(),300),Em(),wm(),Tm(),Am(),Sm()}function Nu(i,t){return[[i.lat,i.lng],[i.lat,t.lng],[t.lat,t.lng],[t.lat,i.lng]]}function Ou(i,t){const e=(i.lat+t.lat)/2,n=Math.abs(t.lat-i.lat)*111320,s=Math.abs(t.lng-i.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),u=Math.min(i.lat,t.lat),h=Math.min(i.lng,t.lng);return[[u,h],[u,h+c],[u+l,h+c],[u+l,h]]}function ku(i,t,e=80){const n=i.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[i.lat+n*Math.cos(l)/111320,i.lng+n*Math.sin(l)/(111320*Math.cos(i.lat*Math.PI/180))]})}function Uu(i,t){const e=i.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[i.lat+e*Math.cos(o)/111320,i.lng+e*Math.sin(o)/(111320*Math.cos(i.lat*Math.PI/180))]})}function Fd(i){De&&De!==i&&(Ie=null,Dn=[],Je=[],Xe&&(Gt.removeLayer(Xe),Xe=null),dn&&(Gt.removeLayer(dn),dn=null)),De=i,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===i)}),Gt.getContainer().classList.toggle("dm",!!i);const t=document.getElementById("dch");t.style.display=i?"block":"none",i&&(t.textContent=vm[i]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=i==="trace"?"block":"none",i!=="trace"&&(e.textContent="0 points tracés"),!i){const n=document.getElementById("snap");n&&(n.style.display="none")}}function ua(i=!0){Xe&&(Gt.removeLayer(Xe),Xe=null),dn&&(Gt.removeLayer(dn),dn=null),Ie=null,Dn=[],Je=[],i&&Fd(null)}function ha(i,t){return t?Gt.latLngToContainerPoint(i).distanceTo(Gt.latLngToContainerPoint(t)):9999}function zu(i){const t=[];Dn.length>2&&t.push(Dn[0]),Je.length>2&&t.push(Je[0]),yi&&t.push(yi.getLatLng());let e=null,n=9999;for(const s of t){const o=ha(i,s);o<18&&o<n&&(n=o,e=s)}return e}function xm(i,t){const e=document.getElementById("snap");if(!e)return;if(!t||ha(i,t)>18){e.style.display="none";return}const n=Gt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function bm(){document.getElementById("zone-controls")?.classList.add("visible"),ec()}function Hd(){document.getElementById("zone-controls")?.classList.remove("visible"),Vd("none")}function ec(){if(!yt.bounds)return;const i=document.getElementById("zone-controls");if(!i)return;const t=Me.latLng(yt.bounds.maxLat,yt.bounds.maxLon),e=Gt.latLngToContainerPoint(t),n=40;i.style.left=e.x+10+"px",i.style.top=Math.max(10,e.y-n/2)+"px"}function Vd(i){$r==="move"&&i!=="move"&&(Gt.dragging.enable(),Gt.getContainer().style.cursor=""),$r=i,document.getElementById("zc-move")?.classList.toggle("active",i==="move"),i==="move"&&(Gt.dragging.disable(),Gt.getContainer().style.cursor="grab")}function Gd(i){qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(i,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const t=i.map(u=>u[0]),e=i.map(u=>u[1]);yt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(yt.bounds.minLat+yt.bounds.maxLat)/2,s=(yt.bounds.maxLon-yt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,o=(yt.bounds.maxLat-yt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(o,s);yt.wMm=Math.round(s*c),yt.dMm=Math.round(o*c),eo?.()}function Bu(i){if(!yt.zonePts)return;const t=yt.zonePts.map(l=>l[0]),e=yt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,s=(Math.min(...e)+Math.max(...e))/2,o=yt.zonePts.map(([l,c])=>[n+(l-n)*i,s+(c-s)*i]);yt.zonePts=o,Gd(o)}function wm(){document.getElementById("zc-delete")?.addEventListener("click",()=>{qe&&(Gt.removeLayer(qe),qe=null),yt.bounds=null,yt.zonePts=null,Hd(),eo?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>Bu(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>Bu(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{Vd($r==="move"?"none":"move")});let i=null;Gt.getContainer().addEventListener("mousedown",t=>{$r!=="move"||!yt.zonePts||(i={x:t.clientX,y:t.clientY},wr=yt.zonePts.map(e=>[e[0],e[1]]),Gt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if($r!=="move"||!i||!wr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Me.point(i.x-e.left,i.y-e.top)),s=Gt.containerPointToLatLng(Me.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=wr.map(([u,h])=>[u+o,h+l]);qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt)}),document.addEventListener("mouseup",t=>{if($r!=="move"||!i||!wr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Me.point(i.x-e.left,i.y-e.top)),s=Gt.containerPointToLatLng(Me.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=wr.map(([u,h])=>[u+o,h+l]);i=null,wr=[],yt.zonePts=c,Gd(c),ec(),Gt.getContainer().style.cursor="grab"}),Gt.on("move zoom moveend zoomend",ec)}function Ps(i,t){qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(i,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const e=i.map(h=>h[0]),n=i.map(h=>h[1]);yt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},yt.zonePts=i,yt.zoneType=t;const s=(yt.bounds.minLat+yt.bounds.maxLat)/2,o=(yt.bounds.maxLon-yt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(yt.bounds.maxLat-yt.bounds.minLat)*111320,u=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);yt.realW=o,yt.realH=l,yt.wMm=Math.round(o*u),yt.dMm=Math.round(l*u),eo?.(),bm(),ua()}function Mm(){An&&(Gt.removeLayer(An),An=null),!(Je.length<2)&&(An=Me.polyline(Je,{color:"#ff0000",weight:4,opacity:.9}).addTo(Gt))}function Fu(i){const t=document.getElementById("snap");if(t&&(t.style.display="none"),dn&&(Gt.removeLayer(dn),dn=null),i.length<2){ua();return}yt.gpxPoints=i.map(n=>({lat:n.lat,lon:n.lng})),Wd(),Zd(`✏️ ${i.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),ua()}function Wd(){An&&(Gt.removeLayer(An),An=null),!(yt.gpxPoints.length<2)&&(An=Me.polyline(yt.gpxPoints.map(i=>[i.lat,i.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Gt))}function Zd(i){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=i,t.style.display="block")}function Sm(){Gt.on("mousemove",i=>{if(!De)return;const t=i.latlng,e=zu(t);xm(t,e??Ie);const n=e??t;if((De==="rect"||De==="sq")&&Ie){const s=De==="sq"?Ou(Ie,n):Nu(Ie,n);Xe?Xe.setLatLngs(s):Xe=Me.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Gt)}else if((De==="circ"||De==="hex")&&Ie){const s=De==="circ"?ku(Ie,n):Uu(Ie,n);Xe?Xe.setLatLngs(s):Xe=Me.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Gt)}else if(De==="poly"&&Dn.length>0){const s=[...Dn,n];Xe?Xe.setLatLngs(s):Xe=Me.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Gt)}else if(De==="trace"&&Je.length>0){const s=[...Je,n];Xe?Xe.setLatLngs(s):Xe=Me.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Gt)}}),Gt.on("click",i=>{if(!De)return;const t=i.latlng,e=zu(t),n=e??t;if(De==="rect"){if(!Ie){Ie=n;return}Ps(Nu(Ie,n),"rect")}else if(De==="sq"){if(!Ie){Ie=n;return}Ps(Ou(Ie,n),"rect")}else if(De==="circ"){if(!Ie){Ie=n;return}Ps(ku(Ie,n),"circ")}else if(De==="hex"){if(!Ie){Ie=n;return}Ps(Uu(Ie,n),"hex")}else if(De==="poly"){if(Dn.length>2&&ha(t,Dn[0])<18){Ps(Dn.map(s=>[s.lat,s.lng]),"poly");return}Dn.push(n),Dn.length===1&&(dn&&Gt.removeLayer(dn),dn=Me.circleMarker(Dn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt))}else De==="trace"&&(Cs&&clearTimeout(Cs),Cs=setTimeout(()=>{if(Je.length>2&&ha(t,Je[0])<18){Fu(Je);return}Je.push(e??t);const s=Je.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(dn&&Gt.removeLayer(dn),dn=Me.circleMarker(Je[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt)),Mm()},220))}),Gt.on("dblclick",i=>{De==="trace"&&Je.length>=2&&(Cs&&clearTimeout(Cs),Fu(Je),i.originalEvent.preventDefault())})}function Em(){["rect","sq","circ","hex","poly","trace"].forEach(i=>{document.getElementById("db-"+i)?.addEventListener("click",()=>{Fd(De===i?null:i)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{ua(),qe&&(Gt.removeLayer(qe),qe=null),An&&(Gt.removeLayer(An),An=null),yi&&(Gt.removeLayer(yi),yi=null),yt.bounds=null,yt.zonePts=null,yt.gpxPoints=[],Je=[],Hd();const i=document.getElementById("gpx-badge");i&&(i.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),eo?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!yt.bounds)return;const i=yt.bounds;Gt.fitBounds([[i.minLat,i.minLon],[i.maxLat,i.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!yt.gpxPoints.length)return;const i=yt.gpxPoints.map(e=>e.lat),t=yt.gpxPoints.map(e=>e.lon);Gt.fitBounds([[Math.min(...i),Math.min(...t)],[Math.max(...i),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function Tm(){document.getElementById("gpx-file")?.addEventListener("change",function(){const i=this.files?.[0];if(!i)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(u=>({lat:parseFloat(u.getAttribute("lat")),lon:parseFloat(u.getAttribute("lon"))})).filter(u=>!isNaN(u.lat)&&!isNaN(u.lon));if(!o.length)return;yt.gpxPoints=o,Wd(),An&&Gt.fitBounds(An.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let u=1;u<o.length;u++){const f=(o[u].lat-o[u-1].lat)*Math.PI/180,p=(o[u].lon-o[u-1].lon)*Math.PI/180,_=Math.sin(f/2)**2+Math.cos(o[u-1].lat*Math.PI/180)*Math.cos(o[u].lat*Math.PI/180)*Math.sin(p/2)**2;l+=6371*2*Math.atan2(Math.sqrt(_),Math.sqrt(1-_))}Zd(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(i)})}let Hu;function Am(){const i=document.getElementById("srch-input"),t=document.getElementById("srch-drop");i?.addEventListener("input",function(){clearTimeout(Hu);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(Hu=setTimeout(()=>Lm(e),120))}),i?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function Lm(i){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(i)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),u=this.dataset.bb.split(",").map(Number);yi&&(Gt.removeLayer(yi),yi=null),yi=Me.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Gt),Gt.fitBounds([[u[0],u[2]],[u[1],u[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sc="163",Mr={ROTATE:0,DOLLY:1,PAN:2},Sr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Cm=0,Vu=1,Pm=2,Xd=1,Rm=2,vi=3,zi=0,bn=1,fn=2,Oi=0,ns=1,Gu=2,Wu=3,Zu=4,Im=5,er=100,Dm=101,Nm=102,Om=103,km=104,Um=200,zm=201,Bm=202,Fm=203,nc=204,ic=205,Hm=206,Vm=207,Gm=208,Wm=209,Zm=210,Xm=211,qm=212,jm=213,Ym=214,$m=0,Km=1,Jm=2,da=3,Qm=4,tg=5,eg=6,ng=7,Ec=0,ig=1,rg=2,ki=0,qd=1,sg=2,og=3,ag=4,lg=5,cg=6,ug=7,jd=300,ls=301,cs=302,rc=303,sc=304,La=306,oc=1e3,sr=1001,ac=1002,Nn=1003,hg=1004,Po=1005,Gn=1006,cl=1007,or=1008,Ui=1009,dg=1010,fg=1011,Yd=1012,$d=1013,us=1014,Ni=1015,fa=1016,Kd=1017,Jd=1018,no=1020,pg=35902,mg=1021,gg=1022,ri=1023,_g=1024,vg=1025,is=1026,Ys=1027,yg=1028,Qd=1029,xg=1030,tf=1031,ef=1033,ul=33776,hl=33777,dl=33778,fl=33779,Xu=35840,qu=35841,ju=35842,Yu=35843,nf=36196,$u=37492,Ku=37496,Ju=37808,Qu=37809,th=37810,eh=37811,nh=37812,ih=37813,rh=37814,sh=37815,oh=37816,ah=37817,lh=37818,ch=37819,uh=37820,hh=37821,pl=36492,dh=36494,fh=36495,bg=36283,ph=36284,mh=36285,gh=36286,wg=3200,Mg=3201,Tc=0,Sg=1,Di="",ei="srgb",Fi="srgb-linear",Ac="display-p3",Ca="display-p3-linear",pa="linear",we="srgb",ma="rec709",ga="p3",Er=7680,_h=519,Eg=512,Tg=513,Ag=514,rf=515,Lg=516,Cg=517,Pg=518,Rg=519,vh=35044,yh="300 es",xi=2e3,_a=2001;class dr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vs=Math.PI/180,lc=180/Math.PI;function fs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function je(i,t,e){return Math.max(t,Math.min(e,i))}function Ig(i,t){return(i%t+t)%t}function ml(i,t,e){return(1-e)*i+e*t}function Rs(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function yn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Dg={DEG2RAD:Vs};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,e,n,s,o,l,c,u,h){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,h)}set(t,e,n,s,o,l,c,u,h){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=u,f[6]=n,f[7]=l,f[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],u=n[6],h=n[1],f=n[4],p=n[7],_=n[2],m=n[5],x=n[8],y=s[0],g=s[3],v=s[6],S=s[1],w=s[4],P=s[7],N=s[2],O=s[5],k=s[8];return o[0]=l*y+c*S+u*N,o[3]=l*g+c*w+u*O,o[6]=l*v+c*P+u*k,o[1]=h*y+f*S+p*N,o[4]=h*g+f*w+p*O,o[7]=h*v+f*P+p*k,o[2]=_*y+m*S+x*N,o[5]=_*g+m*w+x*O,o[8]=_*v+m*P+x*k,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],h=t[7],f=t[8];return e*l*f-e*c*h-n*o*f+n*c*u+s*o*h-s*l*u}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],h=t[7],f=t[8],p=f*l-c*h,_=c*u-f*o,m=h*o-l*u,x=e*p+n*_+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return t[0]=p*y,t[1]=(s*h-f*n)*y,t[2]=(c*n-s*l)*y,t[3]=_*y,t[4]=(f*e-s*u)*y,t[5]=(s*o-c*e)*y,t[6]=m*y,t[7]=(n*u-h*e)*y,t[8]=(l*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const u=Math.cos(o),h=Math.sin(o);return this.set(n*u,n*h,-n*(u*l+h*c)+l+t,-s*h,s*u,-s*(-h*l+u*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(gl.makeScale(t,e)),this}rotate(t){return this.premultiply(gl.makeRotation(-t)),this}translate(t,e){return this.premultiply(gl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const gl=new ce;function sf(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function va(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ng(){const i=va("canvas");return i.style.display="block",i}const xh={};function Og(i){i in xh||(xh[i]=!0,console.warn(i))}const bh=new ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),wh=new ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ro={[Fi]:{transfer:pa,primaries:ma,toReference:i=>i,fromReference:i=>i},[ei]:{transfer:we,primaries:ma,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ca]:{transfer:pa,primaries:ga,toReference:i=>i.applyMatrix3(wh),fromReference:i=>i.applyMatrix3(bh)},[Ac]:{transfer:we,primaries:ga,toReference:i=>i.convertSRGBToLinear().applyMatrix3(wh),fromReference:i=>i.applyMatrix3(bh).convertLinearToSRGB()}},kg=new Set([Fi,Ca]),ge={enabled:!0,_workingColorSpace:Fi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kg.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Ro[t].toReference,s=Ro[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Ro[i].primaries},getTransfer:function(i){return i===Di?pa:Ro[i].transfer}};function rs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _l(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Tr;class Ug{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Tr===void 0&&(Tr=va("canvas")),Tr.width=t.width,Tr.height=t.height;const n=Tr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Tr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=va("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=rs(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(rs(e[n]/255)*255):e[n]=rs(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let zg=0;class of{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=fs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push(vl(s[l].image)):o.push(vl(s[l]))}else o=vl(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function vl(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ug.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bg=0;class pn extends dr{constructor(t=pn.DEFAULT_IMAGE,e=pn.DEFAULT_MAPPING,n=sr,s=sr,o=Gn,l=or,c=ri,u=Ui,h=pn.DEFAULT_ANISOTROPY,f=Di){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=fs(),this.name="",this.source=new of(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=h,this.format=c,this.internalFormat=null,this.type=u,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==jd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case oc:t.x=t.x-Math.floor(t.x);break;case sr:t.x=t.x<0?0:1;break;case ac:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case oc:t.y=t.y-Math.floor(t.y);break;case sr:t.y=t.y<0?0:1;break;case ac:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}pn.DEFAULT_IMAGE=null;pn.DEFAULT_MAPPING=jd;pn.DEFAULT_ANISOTROPY=1;class $e{constructor(t=0,e=0,n=0,s=1){$e.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const u=t.elements,h=u[0],f=u[4],p=u[8],_=u[1],m=u[5],x=u[9],y=u[2],g=u[6],v=u[10];if(Math.abs(f-_)<.01&&Math.abs(p-y)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+_)<.1&&Math.abs(p+y)<.1&&Math.abs(x+g)<.1&&Math.abs(h+m+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(h+1)/2,P=(m+1)/2,N=(v+1)/2,O=(f+_)/4,k=(p+y)/4,H=(x+g)/4;return w>P&&w>N?w<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(w),s=O/n,o=k/n):P>N?P<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(P),n=O/s,o=H/s):N<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(N),n=k/o,s=H/o),this.set(n,s,o,e),this}let S=Math.sqrt((g-x)*(g-x)+(p-y)*(p-y)+(_-f)*(_-f));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(p-y)/S,this.z=(_-f)/S,this.w=Math.acos((h+m+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fg extends dr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new $e(0,0,t,e),this.scissorTest=!1,this.viewport=new $e(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new pn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new of(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class lr extends Fg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class af extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Hg extends pn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=sr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class cr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let u=n[s+0],h=n[s+1],f=n[s+2],p=n[s+3];const _=o[l+0],m=o[l+1],x=o[l+2],y=o[l+3];if(c===0){t[e+0]=u,t[e+1]=h,t[e+2]=f,t[e+3]=p;return}if(c===1){t[e+0]=_,t[e+1]=m,t[e+2]=x,t[e+3]=y;return}if(p!==y||u!==_||h!==m||f!==x){let g=1-c;const v=u*_+h*m+f*x+p*y,S=v>=0?1:-1,w=1-v*v;if(w>Number.EPSILON){const N=Math.sqrt(w),O=Math.atan2(N,v*S);g=Math.sin(g*O)/N,c=Math.sin(c*O)/N}const P=c*S;if(u=u*g+_*P,h=h*g+m*P,f=f*g+x*P,p=p*g+y*P,g===1-c){const N=1/Math.sqrt(u*u+h*h+f*f+p*p);u*=N,h*=N,f*=N,p*=N}}t[e]=u,t[e+1]=h,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],u=n[s+1],h=n[s+2],f=n[s+3],p=o[l],_=o[l+1],m=o[l+2],x=o[l+3];return t[e]=c*x+f*p+u*m-h*_,t[e+1]=u*x+f*_+h*p-c*m,t[e+2]=h*x+f*m+c*_-u*p,t[e+3]=f*x-c*p-u*_-h*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,u=Math.sin,h=c(n/2),f=c(s/2),p=c(o/2),_=u(n/2),m=u(s/2),x=u(o/2);switch(l){case"XYZ":this._x=_*f*p+h*m*x,this._y=h*m*p-_*f*x,this._z=h*f*x+_*m*p,this._w=h*f*p-_*m*x;break;case"YXZ":this._x=_*f*p+h*m*x,this._y=h*m*p-_*f*x,this._z=h*f*x-_*m*p,this._w=h*f*p+_*m*x;break;case"ZXY":this._x=_*f*p-h*m*x,this._y=h*m*p+_*f*x,this._z=h*f*x+_*m*p,this._w=h*f*p-_*m*x;break;case"ZYX":this._x=_*f*p-h*m*x,this._y=h*m*p+_*f*x,this._z=h*f*x-_*m*p,this._w=h*f*p+_*m*x;break;case"YZX":this._x=_*f*p+h*m*x,this._y=h*m*p+_*f*x,this._z=h*f*x-_*m*p,this._w=h*f*p-_*m*x;break;case"XZY":this._x=_*f*p-h*m*x,this._y=h*m*p-_*f*x,this._z=h*f*x+_*m*p,this._w=h*f*p+_*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],u=e[9],h=e[2],f=e[6],p=e[10],_=n+c+p;if(_>0){const m=.5/Math.sqrt(_+1);this._w=.25/m,this._x=(f-u)*m,this._y=(o-h)*m,this._z=(l-s)*m}else if(n>c&&n>p){const m=2*Math.sqrt(1+n-c-p);this._w=(f-u)/m,this._x=.25*m,this._y=(s+l)/m,this._z=(o+h)/m}else if(c>p){const m=2*Math.sqrt(1+c-n-p);this._w=(o-h)/m,this._x=(s+l)/m,this._y=.25*m,this._z=(u+f)/m}else{const m=2*Math.sqrt(1+p-n-c);this._w=(l-s)/m,this._x=(o+h)/m,this._y=(u+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,u=e._y,h=e._z,f=e._w;return this._x=n*f+l*c+s*h-o*u,this._y=s*f+l*u+o*c-n*h,this._z=o*f+l*h+n*u-s*c,this._w=l*f-n*c-s*u-o*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const u=1-c*c;if(u<=Number.EPSILON){const m=1-e;return this._w=m*l+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const h=Math.sqrt(u),f=Math.atan2(h,c),p=Math.sin((1-e)*f)/h,_=Math.sin(e*f)/h;return this._w=l*p+this._w*_,this._x=n*p+this._x*_,this._y=s*p+this._y*_,this._z=o*p+this._z*_,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,e=0,n=0){J.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Mh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Mh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,u=t.w,h=2*(l*s-c*n),f=2*(c*e-o*s),p=2*(o*n-l*e);return this.x=e+u*h+l*p-c*f,this.y=n+u*f+c*h-o*p,this.z=s+u*p+o*f-l*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,u=e.z;return this.x=s*u-o*c,this.y=o*l-n*u,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return yl.copy(this).projectOnVector(t),this.sub(yl)}reflect(t){return this.sub(yl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const yl=new J,Mh=new cr;class io{constructor(t=new J(1/0,1/0,1/0),e=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,zn):zn.fromBufferAttribute(o,l),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Io.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Io.copy(n.boundingBox)),Io.applyMatrix4(t.matrixWorld),this.union(Io)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),Do.subVectors(this.max,Is),Ar.subVectors(t.a,Is),Lr.subVectors(t.b,Is),Cr.subVectors(t.c,Is),Ti.subVectors(Lr,Ar),Ai.subVectors(Cr,Lr),ji.subVectors(Ar,Cr);let e=[0,-Ti.z,Ti.y,0,-Ai.z,Ai.y,0,-ji.z,ji.y,Ti.z,0,-Ti.x,Ai.z,0,-Ai.x,ji.z,0,-ji.x,-Ti.y,Ti.x,0,-Ai.y,Ai.x,0,-ji.y,ji.x,0];return!xl(e,Ar,Lr,Cr,Do)||(e=[1,0,0,0,1,0,0,0,1],!xl(e,Ar,Lr,Cr,Do))?!1:(No.crossVectors(Ti,Ai),e=[No.x,No.y,No.z],xl(e,Ar,Lr,Cr,Do))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(di),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const di=[new J,new J,new J,new J,new J,new J,new J,new J],zn=new J,Io=new io,Ar=new J,Lr=new J,Cr=new J,Ti=new J,Ai=new J,ji=new J,Is=new J,Do=new J,No=new J,Yi=new J;function xl(i,t,e,n,s){for(let o=0,l=i.length-3;o<=l;o+=3){Yi.fromArray(i,o);const c=s.x*Math.abs(Yi.x)+s.y*Math.abs(Yi.y)+s.z*Math.abs(Yi.z),u=t.dot(Yi),h=e.dot(Yi),f=n.dot(Yi);if(Math.max(-Math.max(u,h,f),Math.min(u,h,f))>c)return!1}return!0}const Vg=new io,Ds=new J,bl=new J;class Pa{constructor(t=new J,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Vg.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ds.subVectors(t,this.center);const e=Ds.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ds,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(bl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ds.copy(t.center).add(bl)),this.expandByPoint(Ds.copy(t.center).sub(bl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fi=new J,wl=new J,Oo=new J,Li=new J,Ml=new J,ko=new J,Sl=new J;class Ra{constructor(t=new J,e=new J(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fi)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fi.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fi.copy(this.origin).addScaledVector(this.direction,e),fi.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){wl.copy(t).add(e).multiplyScalar(.5),Oo.copy(e).sub(t).normalize(),Li.copy(this.origin).sub(wl);const o=t.distanceTo(e)*.5,l=-this.direction.dot(Oo),c=Li.dot(this.direction),u=-Li.dot(Oo),h=Li.lengthSq(),f=Math.abs(1-l*l);let p,_,m,x;if(f>0)if(p=l*u-c,_=l*c-u,x=o*f,p>=0)if(_>=-x)if(_<=x){const y=1/f;p*=y,_*=y,m=p*(p+l*_+2*c)+_*(l*p+_+2*u)+h}else _=o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+h;else _=-o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+h;else _<=-x?(p=Math.max(0,-(-l*o+c)),_=p>0?-o:Math.min(Math.max(-o,-u),o),m=-p*p+_*(_+2*u)+h):_<=x?(p=0,_=Math.min(Math.max(-o,-u),o),m=_*(_+2*u)+h):(p=Math.max(0,-(l*o+c)),_=p>0?o:Math.min(Math.max(-o,-u),o),m=-p*p+_*(_+2*u)+h);else _=l>0?-o:o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(wl).addScaledVector(Oo,_),m}intersectSphere(t,e){fi.subVectors(t.center,this.origin);const n=fi.dot(this.direction),s=fi.dot(fi)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,u=n+l;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,u;const h=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,_=this.origin;return h>=0?(n=(t.min.x-_.x)*h,s=(t.max.x-_.x)*h):(n=(t.max.x-_.x)*h,s=(t.min.x-_.x)*h),f>=0?(o=(t.min.y-_.y)*f,l=(t.max.y-_.y)*f):(o=(t.max.y-_.y)*f,l=(t.min.y-_.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),p>=0?(c=(t.min.z-_.z)*p,u=(t.max.z-_.z)*p):(c=(t.max.z-_.z)*p,u=(t.min.z-_.z)*p),n>u||c>s)||((c>n||n!==n)&&(n=c),(u<s||s!==s)&&(s=u),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,fi)!==null}intersectTriangle(t,e,n,s,o){Ml.subVectors(e,t),ko.subVectors(n,t),Sl.crossVectors(Ml,ko);let l=this.direction.dot(Sl),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Li.subVectors(this.origin,t);const u=c*this.direction.dot(ko.crossVectors(Li,ko));if(u<0)return null;const h=c*this.direction.dot(Ml.cross(Li));if(h<0||u+h>l)return null;const f=-c*Li.dot(Sl);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ae{constructor(t,e,n,s,o,l,c,u,h,f,p,_,m,x,y,g){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,h,f,p,_,m,x,y,g)}set(t,e,n,s,o,l,c,u,h,f,p,_,m,x,y,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=s,v[1]=o,v[5]=l,v[9]=c,v[13]=u,v[2]=h,v[6]=f,v[10]=p,v[14]=_,v[3]=m,v[7]=x,v[11]=y,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Pr.setFromMatrixColumn(t,0).length(),o=1/Pr.setFromMatrixColumn(t,1).length(),l=1/Pr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),u=Math.cos(s),h=Math.sin(s),f=Math.cos(o),p=Math.sin(o);if(t.order==="XYZ"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=-u*p,e[8]=h,e[1]=m+x*h,e[5]=_-y*h,e[9]=-c*u,e[2]=y-_*h,e[6]=x+m*h,e[10]=l*u}else if(t.order==="YXZ"){const _=u*f,m=u*p,x=h*f,y=h*p;e[0]=_+y*c,e[4]=x*c-m,e[8]=l*h,e[1]=l*p,e[5]=l*f,e[9]=-c,e[2]=m*c-x,e[6]=y+_*c,e[10]=l*u}else if(t.order==="ZXY"){const _=u*f,m=u*p,x=h*f,y=h*p;e[0]=_-y*c,e[4]=-l*p,e[8]=x+m*c,e[1]=m+x*c,e[5]=l*f,e[9]=y-_*c,e[2]=-l*h,e[6]=c,e[10]=l*u}else if(t.order==="ZYX"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=x*h-m,e[8]=_*h+y,e[1]=u*p,e[5]=y*h+_,e[9]=m*h-x,e[2]=-h,e[6]=c*u,e[10]=l*u}else if(t.order==="YZX"){const _=l*u,m=l*h,x=c*u,y=c*h;e[0]=u*f,e[4]=y-_*p,e[8]=x*p+m,e[1]=p,e[5]=l*f,e[9]=-c*f,e[2]=-h*f,e[6]=m*p+x,e[10]=_-y*p}else if(t.order==="XZY"){const _=l*u,m=l*h,x=c*u,y=c*h;e[0]=u*f,e[4]=-p,e[8]=h*f,e[1]=_*p+y,e[5]=l*f,e[9]=m*p-x,e[2]=x*p-m,e[6]=c*f,e[10]=y*p+_}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gg,t,Wg)}lookAt(t,e,n){const s=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Ci.crossVectors(n,wn),Ci.lengthSq()===0&&(Math.abs(n.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Ci.crossVectors(n,wn)),Ci.normalize(),Uo.crossVectors(wn,Ci),s[0]=Ci.x,s[4]=Uo.x,s[8]=wn.x,s[1]=Ci.y,s[5]=Uo.y,s[9]=wn.y,s[2]=Ci.z,s[6]=Uo.z,s[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],u=n[8],h=n[12],f=n[1],p=n[5],_=n[9],m=n[13],x=n[2],y=n[6],g=n[10],v=n[14],S=n[3],w=n[7],P=n[11],N=n[15],O=s[0],k=s[4],H=s[8],I=s[12],R=s[1],W=s[5],U=s[9],F=s[13],A=s[2],Z=s[6],nt=s[10],ot=s[14],q=s[3],rt=s[7],at=s[11],j=s[15];return o[0]=l*O+c*R+u*A+h*q,o[4]=l*k+c*W+u*Z+h*rt,o[8]=l*H+c*U+u*nt+h*at,o[12]=l*I+c*F+u*ot+h*j,o[1]=f*O+p*R+_*A+m*q,o[5]=f*k+p*W+_*Z+m*rt,o[9]=f*H+p*U+_*nt+m*at,o[13]=f*I+p*F+_*ot+m*j,o[2]=x*O+y*R+g*A+v*q,o[6]=x*k+y*W+g*Z+v*rt,o[10]=x*H+y*U+g*nt+v*at,o[14]=x*I+y*F+g*ot+v*j,o[3]=S*O+w*R+P*A+N*q,o[7]=S*k+w*W+P*Z+N*rt,o[11]=S*H+w*U+P*nt+N*at,o[15]=S*I+w*F+P*ot+N*j,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],u=t[9],h=t[13],f=t[2],p=t[6],_=t[10],m=t[14],x=t[3],y=t[7],g=t[11],v=t[15];return x*(+o*u*p-s*h*p-o*c*_+n*h*_+s*c*m-n*u*m)+y*(+e*u*m-e*h*_+o*l*_-s*l*m+s*h*f-o*u*f)+g*(+e*h*p-e*c*m-o*l*p+n*l*m+o*c*f-n*h*f)+v*(-s*c*f-e*u*p+e*c*_+s*l*p-n*l*_+n*u*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],h=t[7],f=t[8],p=t[9],_=t[10],m=t[11],x=t[12],y=t[13],g=t[14],v=t[15],S=p*g*h-y*_*h+y*u*m-c*g*m-p*u*v+c*_*v,w=x*_*h-f*g*h-x*u*m+l*g*m+f*u*v-l*_*v,P=f*y*h-x*p*h+x*c*m-l*y*m-f*c*v+l*p*v,N=x*p*u-f*y*u-x*c*_+l*y*_+f*c*g-l*p*g,O=e*S+n*w+s*P+o*N;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/O;return t[0]=S*k,t[1]=(y*_*o-p*g*o-y*s*m+n*g*m+p*s*v-n*_*v)*k,t[2]=(c*g*o-y*u*o+y*s*h-n*g*h-c*s*v+n*u*v)*k,t[3]=(p*u*o-c*_*o-p*s*h+n*_*h+c*s*m-n*u*m)*k,t[4]=w*k,t[5]=(f*g*o-x*_*o+x*s*m-e*g*m-f*s*v+e*_*v)*k,t[6]=(x*u*o-l*g*o-x*s*h+e*g*h+l*s*v-e*u*v)*k,t[7]=(l*_*o-f*u*o+f*s*h-e*_*h-l*s*m+e*u*m)*k,t[8]=P*k,t[9]=(x*p*o-f*y*o-x*n*m+e*y*m+f*n*v-e*p*v)*k,t[10]=(l*y*o-x*c*o+x*n*h-e*y*h-l*n*v+e*c*v)*k,t[11]=(f*c*o-l*p*o-f*n*h+e*p*h+l*n*m-e*c*m)*k,t[12]=N*k,t[13]=(f*y*s-x*p*s+x*n*_-e*y*_-f*n*g+e*p*g)*k,t[14]=(x*c*s-l*y*s-x*n*u+e*y*u+l*n*g-e*c*g)*k,t[15]=(l*p*s-f*c*s+f*n*u-e*p*u-l*n*_+e*c*_)*k,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,u=t.z,h=o*l,f=o*c;return this.set(h*l+n,h*c-s*u,h*u+s*c,0,h*c+s*u,f*c+n,f*u-s*l,0,h*u-s*c,f*u+s*l,o*u*u+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,u=e._w,h=o+o,f=l+l,p=c+c,_=o*h,m=o*f,x=o*p,y=l*f,g=l*p,v=c*p,S=u*h,w=u*f,P=u*p,N=n.x,O=n.y,k=n.z;return s[0]=(1-(y+v))*N,s[1]=(m+P)*N,s[2]=(x-w)*N,s[3]=0,s[4]=(m-P)*O,s[5]=(1-(_+v))*O,s[6]=(g+S)*O,s[7]=0,s[8]=(x+w)*k,s[9]=(g-S)*k,s[10]=(1-(_+y))*k,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Pr.set(s[0],s[1],s[2]).length();const l=Pr.set(s[4],s[5],s[6]).length(),c=Pr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Bn.copy(this);const h=1/o,f=1/l,p=1/c;return Bn.elements[0]*=h,Bn.elements[1]*=h,Bn.elements[2]*=h,Bn.elements[4]*=f,Bn.elements[5]*=f,Bn.elements[6]*=f,Bn.elements[8]*=p,Bn.elements[9]*=p,Bn.elements[10]*=p,e.setFromRotationMatrix(Bn),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=xi){const u=this.elements,h=2*o/(e-t),f=2*o/(n-s),p=(e+t)/(e-t),_=(n+s)/(n-s);let m,x;if(c===xi)m=-(l+o)/(l-o),x=-2*l*o/(l-o);else if(c===_a)m=-l/(l-o),x=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=h,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=f,u[9]=_,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=x,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=xi){const u=this.elements,h=1/(e-t),f=1/(n-s),p=1/(l-o),_=(e+t)*h,m=(n+s)*f;let x,y;if(c===xi)x=(l+o)*p,y=-2*p;else if(c===_a)x=o*p,y=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*h,u[4]=0,u[8]=0,u[12]=-_,u[1]=0,u[5]=2*f,u[9]=0,u[13]=-m,u[2]=0,u[6]=0,u[10]=y,u[14]=-x,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pr=new J,Bn=new Ae,Gg=new J(0,0,0),Wg=new J(1,1,1),Ci=new J,Uo=new J,wn=new J,Sh=new Ae,Eh=new cr;class Yn{constructor(t=0,e=0,n=0,s=Yn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],u=s[1],h=s[5],f=s[9],p=s[2],_=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(je(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(_,h),this._z=0);break;case"YXZ":this._x=Math.asin(-je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(u,h)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(je(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-l,h)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-je(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(_,m),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-l,h));break;case"YZX":this._z=Math.asin(je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,h),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(_,h),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Sh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Sh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Eh.setFromEuler(this),this.setFromQuaternion(Eh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yn.DEFAULT_ORDER="XYZ";class Lc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Zg=0;const Th=new J,Rr=new cr,pi=new Ae,zo=new J,Ns=new J,Xg=new J,qg=new cr,Ah=new J(1,0,0),Lh=new J(0,1,0),Ch=new J(0,0,1),Ph={type:"added"},jg={type:"removed"},Ir={type:"childadded",child:null},El={type:"childremoved",child:null};class tn extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zg++}),this.uuid=fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const t=new J,e=new Yn,n=new cr,s=new J(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new ce}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Rr.setFromAxisAngle(t,e),this.quaternion.multiply(Rr),this}rotateOnWorldAxis(t,e){return Rr.setFromAxisAngle(t,e),this.quaternion.premultiply(Rr),this}rotateX(t){return this.rotateOnAxis(Ah,t)}rotateY(t){return this.rotateOnAxis(Lh,t)}rotateZ(t){return this.rotateOnAxis(Ch,t)}translateOnAxis(t,e){return Th.copy(t).applyQuaternion(this.quaternion),this.position.add(Th.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ah,t)}translateY(t){return this.translateOnAxis(Lh,t)}translateZ(t){return this.translateOnAxis(Ch,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?zo.copy(t):zo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ns.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pi.lookAt(Ns,zo,this.up):pi.lookAt(zo,Ns,this.up),this.quaternion.setFromRotationMatrix(pi),s&&(pi.extractRotation(s.matrixWorld),Rr.setFromRotationMatrix(pi),this.quaternion.premultiply(Rr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ph),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(jg),El.child=t,this.dispatchEvent(El),El.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ph),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,t,Xg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ns,qg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let h=0,f=u.length;h<f;h++){const p=u[h];o(t.shapes,p)}else o(t.shapes,u)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,h=this.material.length;u<h;u++)c.push(o(t.materials,this.material[u]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];s.animations.push(o(t.animations,u))}}if(e){const c=l(t.geometries),u=l(t.materials),h=l(t.textures),f=l(t.images),p=l(t.shapes),_=l(t.skeletons),m=l(t.animations),x=l(t.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),h.length>0&&(n.textures=h),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),_.length>0&&(n.skeletons=_),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function l(c){const u=[];for(const h in c){const f=c[h];delete f.metadata,u.push(f)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}tn.DEFAULT_UP=new J(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new J,mi=new J,Tl=new J,gi=new J,Dr=new J,Nr=new J,Rh=new J,Al=new J,Ll=new J,Cl=new J;class Wn{constructor(t=new J,e=new J,n=new J){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Fn.subVectors(t,e),s.cross(Fn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){Fn.subVectors(s,e),mi.subVectors(n,e),Tl.subVectors(t,e);const l=Fn.dot(Fn),c=Fn.dot(mi),u=Fn.dot(Tl),h=mi.dot(mi),f=mi.dot(Tl),p=l*h-c*c;if(p===0)return o.set(0,0,0),null;const _=1/p,m=(h*u-c*f)*_,x=(l*f-c*u)*_;return o.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,gi)===null?!1:gi.x>=0&&gi.y>=0&&gi.x+gi.y<=1}static getInterpolation(t,e,n,s,o,l,c,u){return this.getBarycoord(t,e,n,s,gi)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,gi.x),u.addScaledVector(l,gi.y),u.addScaledVector(c,gi.z),u)}static isFrontFacing(t,e,n,s){return Fn.subVectors(n,e),mi.subVectors(t,e),Fn.cross(mi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fn.subVectors(this.c,this.b),mi.subVectors(this.a,this.b),Fn.cross(mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Wn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;Dr.subVectors(s,n),Nr.subVectors(o,n),Al.subVectors(t,n);const u=Dr.dot(Al),h=Nr.dot(Al);if(u<=0&&h<=0)return e.copy(n);Ll.subVectors(t,s);const f=Dr.dot(Ll),p=Nr.dot(Ll);if(f>=0&&p<=f)return e.copy(s);const _=u*p-f*h;if(_<=0&&u>=0&&f<=0)return l=u/(u-f),e.copy(n).addScaledVector(Dr,l);Cl.subVectors(t,o);const m=Dr.dot(Cl),x=Nr.dot(Cl);if(x>=0&&m<=x)return e.copy(o);const y=m*h-u*x;if(y<=0&&h>=0&&x<=0)return c=h/(h-x),e.copy(n).addScaledVector(Nr,c);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return Rh.subVectors(o,s),c=(p-f)/(p-f+(m-x)),e.copy(s).addScaledVector(Rh,c);const v=1/(g+y+_);return l=y*v,c=_*v,e.copy(n).addScaledVector(Dr,l).addScaledVector(Nr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const lf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Pi={h:0,s:0,l:0},Bo={h:0,s:0,l:0};function Pl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ei){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=Ig(t,1),e=je(e,0,1),n=je(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=Pl(l,o,t+1/3),this.g=Pl(l,o,t),this.b=Pl(l,o,t-1/3)}return ge.toWorkingColorSpace(this,s),this}setStyle(t,e=ei){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ei){const n=lf[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=rs(t.r),this.g=rs(t.g),this.b=rs(t.b),this}copyLinearToSRGB(t){return this.r=_l(t.r),this.g=_l(t.g),this.b=_l(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ei){return ge.fromWorkingColorSpace(rn.copy(this),t),Math.round(je(rn.r*255,0,255))*65536+Math.round(je(rn.g*255,0,255))*256+Math.round(je(rn.b*255,0,255))}getHexString(t=ei){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(rn.copy(this),e);const n=rn.r,s=rn.g,o=rn.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let u,h;const f=(c+l)/2;if(c===l)u=0,h=0;else{const p=l-c;switch(h=f<=.5?p/(l+c):p/(2-l-c),l){case n:u=(s-o)/p+(s<o?6:0);break;case s:u=(o-n)/p+2;break;case o:u=(n-s)/p+4;break}u/=6}return t.h=u,t.s=h,t.l=f,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=ei){ge.fromWorkingColorSpace(rn.copy(this),t);const e=rn.r,n=rn.g,s=rn.b;return t!==ei?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Pi),this.setHSL(Pi.h+t,Pi.s+e,Pi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Pi),t.getHSL(Bo);const n=ml(Pi.h,Bo.h,e),s=ml(Pi.s,Bo.s,e),o=ml(Pi.l,Bo.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new Qt;Qt.NAMES=lf;let Yg=0;class fr extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=fs(),this.name="",this.type="Material",this.blending=ns,this.side=zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nc,this.blendDst=ic,this.blendEquation=er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=da,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Er,this.stencilZFail=Er,this.stencilZPass=Er,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(n.blending=this.blending),this.side!==zi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==nc&&(n.blendSrc=this.blendSrc),this.blendDst!==ic&&(n.blendDst=this.blendDst),this.blendEquation!==er&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==da&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==_h&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Er&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Er&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Er&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class cf extends fr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new J,Fo=new vt;class Ln{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=vh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ni,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Og("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Fo.fromBufferAttribute(this,e),Fo.applyMatrix3(t),this.setXY(e,Fo.x,Fo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Rs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=yn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Rs(e,this.array)),e}setX(t,e){return this.normalized&&(e=yn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Rs(e,this.array)),e}setY(t,e){return this.normalized&&(e=yn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Rs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=yn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Rs(e,this.array)),e}setW(t,e){return this.normalized&&(e=yn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=yn(e,this.array),n=yn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=yn(e,this.array),n=yn(n,this.array),s=yn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=yn(e,this.array),n=yn(n,this.array),s=yn(s,this.array),o=yn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==vh&&(t.usage=this.usage),t}}class uf extends Ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class hf extends Ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class _e extends Ln{constructor(t,e,n){super(new Float32Array(t),e,n)}}let $g=0;const In=new Ae,Rl=new tn,Or=new J,Mn=new io,Os=new io,Ze=new J;class Oe extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$g++}),this.uuid=fs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sf(t)?hf:uf)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ce().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return Rl.lookAt(t),Rl.updateMatrix(),this.applyMatrix4(Rl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Or).negate(),this.translate(Or.x,Or.y,Or.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new _e(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];Mn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Pa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const n=this.boundingSphere.center;if(Mn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];Os.setFromBufferAttribute(c),this.morphTargetsRelative?(Ze.addVectors(Mn.min,Os.min),Mn.expandByPoint(Ze),Ze.addVectors(Mn.max,Os.max),Mn.expandByPoint(Ze)):(Mn.expandByPoint(Os.min),Mn.expandByPoint(Os.max))}Mn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)Ze.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],u=this.morphTargetsRelative;for(let h=0,f=c.count;h<f;h++)Ze.fromBufferAttribute(c,h),u&&(Or.fromBufferAttribute(t,h),Ze.add(Or)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ln(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],u=[];for(let H=0;H<n.count;H++)c[H]=new J,u[H]=new J;const h=new J,f=new J,p=new J,_=new vt,m=new vt,x=new vt,y=new J,g=new J;function v(H,I,R){h.fromBufferAttribute(n,H),f.fromBufferAttribute(n,I),p.fromBufferAttribute(n,R),_.fromBufferAttribute(o,H),m.fromBufferAttribute(o,I),x.fromBufferAttribute(o,R),f.sub(h),p.sub(h),m.sub(_),x.sub(_);const W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(W),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(W),c[H].add(y),c[I].add(y),c[R].add(y),u[H].add(g),u[I].add(g),u[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let H=0,I=S.length;H<I;++H){const R=S[H],W=R.start,U=R.count;for(let F=W,A=W+U;F<A;F+=3)v(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const w=new J,P=new J,N=new J,O=new J;function k(H){N.fromBufferAttribute(s,H),O.copy(N);const I=c[H];w.copy(I),w.sub(N.multiplyScalar(N.dot(I))).normalize(),P.crossVectors(O,I);const W=P.dot(u[H])<0?-1:1;l.setXYZW(H,w.x,w.y,w.z,W)}for(let H=0,I=S.length;H<I;++H){const R=S[H],W=R.start,U=R.count;for(let F=W,A=W+U;F<A;F+=3)k(t.getX(F+0)),k(t.getX(F+1)),k(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let _=0,m=n.count;_<m;_++)n.setXYZ(_,0,0,0);const s=new J,o=new J,l=new J,c=new J,u=new J,h=new J,f=new J,p=new J;if(t)for(let _=0,m=t.count;_<m;_+=3){const x=t.getX(_+0),y=t.getX(_+1),g=t.getX(_+2);s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),l.fromBufferAttribute(e,g),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),h.fromBufferAttribute(n,g),c.add(f),u.add(f),h.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(y,u.x,u.y,u.z),n.setXYZ(g,h.x,h.y,h.z)}else for(let _=0,m=e.count;_<m;_+=3)s.fromBufferAttribute(e,_+0),o.fromBufferAttribute(e,_+1),l.fromBufferAttribute(e,_+2),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),n.setXYZ(_+0,f.x,f.y,f.z),n.setXYZ(_+1,f.x,f.y,f.z),n.setXYZ(_+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(c,u){const h=c.array,f=c.itemSize,p=c.normalized,_=new h.constructor(u.length*f);let m=0,x=0;for(let y=0,g=u.length;y<g;y++){c.isInterleavedBufferAttribute?m=u[y]*c.data.stride+c.offset:m=u[y]*f;for(let v=0;v<f;v++)_[x++]=h[m++]}return new Ln(_,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,n=this.index.array,s=this.attributes;for(const c in s){const u=s[c],h=t(u,n);e.setAttribute(c,h)}const o=this.morphAttributes;for(const c in o){const u=[],h=o[c];for(let f=0,p=h.length;f<p;f++){const _=h[f],m=t(_,n);u.push(m)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,u=l.length;c<u;c++){const h=l[c];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const h in u)u[h]!==void 0&&(t[h]=u[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const u in n){const h=n[u];t.data.attributes[u]=h.toJSON(t.data)}const s={};let o=!1;for(const u in this.morphAttributes){const h=this.morphAttributes[u],f=[];for(let p=0,_=h.length;p<_;p++){const m=h[p];f.push(m.toJSON(t.data))}f.length>0&&(s[u]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const f=s[h];this.setAttribute(h,f.clone(e))}const o=t.morphAttributes;for(const h in o){const f=[],p=o[h];for(let _=0,m=p.length;_<m;_++)f.push(p[_].clone(e));this.morphAttributes[h]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let h=0,f=l.length;h<f;h++){const p=l[h];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ih=new Ae,$i=new Ra,Ho=new Pa,Dh=new J,kr=new J,Ur=new J,zr=new J,Il=new J,Vo=new J,Go=new vt,Wo=new vt,Zo=new vt,Nh=new J,Oh=new J,kh=new J,Xo=new J,qo=new J;class Ne extends tn{constructor(t=new Oe,e=new cf){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){Vo.set(0,0,0);for(let u=0,h=o.length;u<h;u++){const f=c[u],p=o[u];f!==0&&(Il.fromBufferAttribute(p,t),l?Vo.addScaledVector(Il,f):Vo.addScaledVector(Il.sub(e),f))}e.add(Vo)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ho.copy(n.boundingSphere),Ho.applyMatrix4(o),$i.copy(t.ray).recast(t.near),!(Ho.containsPoint($i.origin)===!1&&($i.intersectSphere(Ho,Dh)===null||$i.origin.distanceToSquared(Dh)>(t.far-t.near)**2))&&(Ih.copy(o).invert(),$i.copy(t.ray).applyMatrix4(Ih),!(n.boundingBox!==null&&$i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,$i)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,u=o.attributes.position,h=o.attributes.uv,f=o.attributes.uv1,p=o.attributes.normal,_=o.groups,m=o.drawRange;if(c!==null)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=w;P<N;P+=3){const O=c.getX(P),k=c.getX(P+1),H=c.getX(P+2);s=jo(this,v,t,n,h,f,p,O,k,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=c.getX(g),w=c.getX(g+1),P=c.getX(g+2);s=jo(this,l,t,n,h,f,p,S,w,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(u!==void 0)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(u.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=w;P<N;P+=3){const O=P,k=P+1,H=P+2;s=jo(this,v,t,n,h,f,p,O,k,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(u.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=g,w=g+1,P=g+2;s=jo(this,l,t,n,h,f,p,S,w,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Kg(i,t,e,n,s,o,l,c){let u;if(t.side===bn?u=n.intersectTriangle(l,o,s,!0,c):u=n.intersectTriangle(s,o,l,t.side===zi,c),u===null)return null;qo.copy(c),qo.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(qo);return h<e.near||h>e.far?null:{distance:h,point:qo.clone(),object:i}}function jo(i,t,e,n,s,o,l,c,u,h){i.getVertexPosition(c,kr),i.getVertexPosition(u,Ur),i.getVertexPosition(h,zr);const f=Kg(i,t,e,n,kr,Ur,zr,Xo);if(f){s&&(Go.fromBufferAttribute(s,c),Wo.fromBufferAttribute(s,u),Zo.fromBufferAttribute(s,h),f.uv=Wn.getInterpolation(Xo,kr,Ur,zr,Go,Wo,Zo,new vt)),o&&(Go.fromBufferAttribute(o,c),Wo.fromBufferAttribute(o,u),Zo.fromBufferAttribute(o,h),f.uv1=Wn.getInterpolation(Xo,kr,Ur,zr,Go,Wo,Zo,new vt)),l&&(Nh.fromBufferAttribute(l,c),Oh.fromBufferAttribute(l,u),kh.fromBufferAttribute(l,h),f.normal=Wn.getInterpolation(Xo,kr,Ur,zr,Nh,Oh,kh,new J),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:c,b:u,c:h,normal:new J,materialIndex:0};Wn.getNormal(kr,Ur,zr,p.normal),f.face=p}return f}class hn extends Oe{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const u=[],h=[],f=[],p=[];let _=0,m=0;x("z","y","x",-1,-1,n,e,t,l,o,0),x("z","y","x",1,-1,n,e,-t,l,o,1),x("x","z","y",1,1,t,n,e,s,l,2),x("x","z","y",1,-1,t,n,-e,s,l,3),x("x","y","z",1,-1,t,e,n,s,o,4),x("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(u),this.setAttribute("position",new _e(h,3)),this.setAttribute("normal",new _e(f,3)),this.setAttribute("uv",new _e(p,2));function x(y,g,v,S,w,P,N,O,k,H,I){const R=P/k,W=N/H,U=P/2,F=N/2,A=O/2,Z=k+1,nt=H+1;let ot=0,q=0;const rt=new J;for(let at=0;at<nt;at++){const j=at*W-F;for(let tt=0;tt<Z;tt++){const Ct=tt*R-U;rt[y]=Ct*S,rt[g]=j*w,rt[v]=A,h.push(rt.x,rt.y,rt.z),rt[y]=0,rt[g]=0,rt[v]=O>0?1:-1,f.push(rt.x,rt.y,rt.z),p.push(tt/k),p.push(1-at/H),ot+=1}}for(let at=0;at<H;at++)for(let j=0;j<k;j++){const tt=_+j+Z*at,Ct=_+j+Z*(at+1),Q=_+(j+1)+Z*(at+1),it=_+(j+1)+Z*at;u.push(tt,Ct,it),u.push(Ct,Q,it),q+=6}c.addGroup(m,q,I),m+=q,_+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function hs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function un(i){const t={};for(let e=0;e<i.length;e++){const n=hs(i[e]);for(const s in n)t[s]=n[s]}return t}function Jg(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function df(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}const Qg={clone:hs,merge:un};var t_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,e_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bi extends fr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=t_,this.fragmentShader=e_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=hs(t.uniforms),this.uniformsGroups=Jg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class ff extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=xi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new J,Uh=new vt,zh=new vt;class En extends ff{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=lc*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return lc*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-t/Ri.z)}getViewSize(t,e){return this.getViewBounds(t,Uh,zh),e.subVectors(zh,Uh)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const u=l.fullWidth,h=l.fullHeight;o+=l.offsetX*s/u,e-=l.offsetY*n/h,s*=l.width/u,n*=l.height/h}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Br=-90,Fr=1;class n_ extends tn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new En(Br,Fr,t,e);s.layers=this.layers,this.add(s);const o=new En(Br,Fr,t,e);o.layers=this.layers,this.add(o);const l=new En(Br,Fr,t,e);l.layers=this.layers,this.add(l);const c=new En(Br,Fr,t,e);c.layers=this.layers,this.add(c);const u=new En(Br,Fr,t,e);u.layers=this.layers,this.add(u);const h=new En(Br,Fr,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,u]=e;for(const h of e)this.remove(h);if(t===xi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===_a)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,u,h,f]=this.children,p=t.getRenderTarget(),_=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,u),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(p,_,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class pf extends pn{constructor(t,e,n,s,o,l,c,u,h,f){t=t!==void 0?t:[],e=e!==void 0?e:ls,super(t,e,n,s,o,l,c,u,h,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class i_ extends lr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new pf(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new hn(5,5,5),o=new Bi({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:Oi});o.uniforms.tEquirect.value=e;const l=new Ne(s,o),c=e.minFilter;return e.minFilter===or&&(e.minFilter=Gn),new n_(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const Dl=new J,r_=new J,s_=new ce;class Ii{constructor(t=new J(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Dl.subVectors(n,e).cross(r_.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Dl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||s_.getNormalMatrix(t),s=this.coplanarPoint(Dl).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ki=new Pa,Yo=new J;class Cc{constructor(t=new Ii,e=new Ii,n=new Ii,s=new Ii,o=new Ii,l=new Ii){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xi){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],u=s[3],h=s[4],f=s[5],p=s[6],_=s[7],m=s[8],x=s[9],y=s[10],g=s[11],v=s[12],S=s[13],w=s[14],P=s[15];if(n[0].setComponents(u-o,_-h,g-m,P-v).normalize(),n[1].setComponents(u+o,_+h,g+m,P+v).normalize(),n[2].setComponents(u+l,_+f,g+x,P+S).normalize(),n[3].setComponents(u-l,_-f,g-x,P-S).normalize(),n[4].setComponents(u-c,_-p,g-y,P-w).normalize(),e===xi)n[5].setComponents(u+c,_+p,g+y,P+w).normalize();else if(e===_a)n[5].setComponents(c,p,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){return Ki.center.set(0,0,0),Ki.radius=.7071067811865476,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Yo.x=s.normal.x>0?t.max.x:t.min.x,Yo.y=s.normal.y>0?t.max.y:t.min.y,Yo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function mf(){let i=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function o_(i){const t=new WeakMap;function e(c,u){const h=c.array,f=c.usage,p=h.byteLength,_=i.createBuffer();i.bindBuffer(u,_),i.bufferData(u,h,f),c.onUploadCallback();let m;if(h instanceof Float32Array)m=i.FLOAT;else if(h instanceof Uint16Array)c.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)m=i.SHORT;else if(h instanceof Uint32Array)m=i.UNSIGNED_INT;else if(h instanceof Int32Array)m=i.INT;else if(h instanceof Int8Array)m=i.BYTE;else if(h instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:m,bytesPerElement:h.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,h){const f=u.array,p=u._updateRange,_=u.updateRanges;if(i.bindBuffer(h,c),p.count===-1&&_.length===0&&i.bufferSubData(h,0,f),_.length!==0){for(let m=0,x=_.length;m<x;m++){const y=_[m];i.bufferSubData(h,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}u.clearUpdateRanges()}p.count!==-1&&(i.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=t.get(c);u&&(i.deleteBuffer(u.buffer),t.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const h=t.get(c);if(h===void 0)t.set(c,e(c,u));else if(h.version<c.version){if(h.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,c,u),h.version=c.version}}return{get:s,remove:o,update:l}}class ro extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),u=Math.floor(s),h=c+1,f=u+1,p=t/c,_=e/u,m=[],x=[],y=[],g=[];for(let v=0;v<f;v++){const S=v*_-l;for(let w=0;w<h;w++){const P=w*p-o;x.push(P,-S,0),y.push(0,0,1),g.push(w/c),g.push(1-v/u)}}for(let v=0;v<u;v++)for(let S=0;S<c;S++){const w=S+h*v,P=S+h*(v+1),N=S+1+h*(v+1),O=S+1+h*v;m.push(w,P,O),m.push(P,N,O)}this.setIndex(m),this.setAttribute("position",new _e(x,3)),this.setAttribute("normal",new _e(y,3)),this.setAttribute("uv",new _e(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ro(t.width,t.height,t.widthSegments,t.heightSegments)}}var a_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,l_=`#ifdef USE_ALPHAHASH
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
#endif`,c_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,u_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,h_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,d_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,f_=`#ifdef USE_AOMAP
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
#endif`,p_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,m_=`#ifdef USE_BATCHING
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
#endif`,g_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,__=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,v_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,y_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,x_=`#ifdef USE_IRIDESCENCE
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
#endif`,M_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,S_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,E_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,T_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,A_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,L_=`#if defined( USE_COLOR_ALPHA )
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
#endif`,P_=`#define PI 3.141592653589793
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
} // validated`,R_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,I_=`vec3 transformedNormal = objectNormal;
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
#endif`,D_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,N_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,O_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,k_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,U_="gl_FragColor = linearToOutputTexel( gl_FragColor );",z_=`
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
}`,B_=`#ifdef USE_ENVMAP
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
#endif`,F_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,H_=`#ifdef USE_ENVMAP
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
#endif`,V_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,G_=`#ifdef USE_ENVMAP
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
#endif`,W_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Z_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,X_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,q_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,j_=`#ifdef USE_GRADIENTMAP
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
}`,Y_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,K_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Q_=`uniform bool receiveShadow;
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
#endif`,tv=`#ifdef USE_ENVMAP
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
#endif`,ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iv=`BlinnPhongMaterial material;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sv=`PhysicalMaterial material;
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
#endif`,ov=`struct PhysicalMaterial {
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
}`,av=`
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
#endif`,lv=`#if defined( RE_IndirectDiffuse )
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
#endif`,cv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,pv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,mv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,_v=`#if defined( USE_POINTS_UV )
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
#endif`,vv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xv=`#ifdef USE_INSTANCING_MORPH
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
#endif`,Sv=`#ifdef USE_MORPHTARGETS
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
#endif`,Ev=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Tv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Av=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lv=`#ifndef FLAT_SHADED
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
#endif`,Pv=`#ifdef USE_NORMALMAP
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
#endif`,Rv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Iv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Dv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ov=`#ifdef OPAQUE
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
}`,Uv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Hv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Vv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Xv=`float getShadowMask() {
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
}`,qv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jv=`#ifdef USE_SKINNING
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
#endif`,Yv=`#ifdef USE_SKINNING
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
#endif`,Kv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Jv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Qv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,t0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,e0=`#ifdef USE_TRANSMISSION
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
#endif`,n0=`#ifdef USE_TRANSMISSION
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
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const a0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,l0=`uniform sampler2D t2D;
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
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,u0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`#include <common>
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
}`,p0=`#if DEPTH_PACKING == 3200
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
}`,m0=`#define DISTANCE
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
}`,g0=`#define DISTANCE
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
}`,_0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`uniform float scale;
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
}`,x0=`uniform vec3 diffuse;
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
}`,M0=`#define LAMBERT
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
}`,S0=`#define LAMBERT
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
}`,E0=`#define MATCAP
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
}`,T0=`#define MATCAP
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
}`,A0=`#define NORMAL
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
}`,L0=`#define NORMAL
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
}`,P0=`#define PHONG
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
}`,R0=`#define STANDARD
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
}`,I0=`#define STANDARD
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
}`,D0=`#define TOON
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
}`,N0=`#define TOON
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
}`,O0=`uniform float size;
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
}`,U0=`#include <common>
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
}`,z0=`uniform vec3 color;
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
}`,B0=`uniform float rotation;
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
}`,F0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:a_,alphahash_pars_fragment:l_,alphamap_fragment:c_,alphamap_pars_fragment:u_,alphatest_fragment:h_,alphatest_pars_fragment:d_,aomap_fragment:f_,aomap_pars_fragment:p_,batching_pars_vertex:m_,batching_vertex:g_,begin_vertex:__,beginnormal_vertex:v_,bsdfs:y_,iridescence_fragment:x_,bumpmap_pars_fragment:b_,clipping_planes_fragment:w_,clipping_planes_pars_fragment:M_,clipping_planes_pars_vertex:S_,clipping_planes_vertex:E_,color_fragment:T_,color_pars_fragment:A_,color_pars_vertex:L_,color_vertex:C_,common:P_,cube_uv_reflection_fragment:R_,defaultnormal_vertex:I_,displacementmap_pars_vertex:D_,displacementmap_vertex:N_,emissivemap_fragment:O_,emissivemap_pars_fragment:k_,colorspace_fragment:U_,colorspace_pars_fragment:z_,envmap_fragment:B_,envmap_common_pars_fragment:F_,envmap_pars_fragment:H_,envmap_pars_vertex:V_,envmap_physical_pars_fragment:tv,envmap_vertex:G_,fog_vertex:W_,fog_pars_vertex:Z_,fog_fragment:X_,fog_pars_fragment:q_,gradientmap_pars_fragment:j_,lightmap_fragment:Y_,lightmap_pars_fragment:$_,lights_lambert_fragment:K_,lights_lambert_pars_fragment:J_,lights_pars_begin:Q_,lights_toon_fragment:ev,lights_toon_pars_fragment:nv,lights_phong_fragment:iv,lights_phong_pars_fragment:rv,lights_physical_fragment:sv,lights_physical_pars_fragment:ov,lights_fragment_begin:av,lights_fragment_maps:lv,lights_fragment_end:cv,logdepthbuf_fragment:uv,logdepthbuf_pars_fragment:hv,logdepthbuf_pars_vertex:dv,logdepthbuf_vertex:fv,map_fragment:pv,map_pars_fragment:mv,map_particle_fragment:gv,map_particle_pars_fragment:_v,metalnessmap_fragment:vv,metalnessmap_pars_fragment:yv,morphinstance_vertex:xv,morphcolor_vertex:bv,morphnormal_vertex:wv,morphtarget_pars_vertex:Mv,morphtarget_vertex:Sv,normal_fragment_begin:Ev,normal_fragment_maps:Tv,normal_pars_fragment:Av,normal_pars_vertex:Lv,normal_vertex:Cv,normalmap_pars_fragment:Pv,clearcoat_normal_fragment_begin:Rv,clearcoat_normal_fragment_maps:Iv,clearcoat_pars_fragment:Dv,iridescence_pars_fragment:Nv,opaque_fragment:Ov,packing:kv,premultiplied_alpha_fragment:Uv,project_vertex:zv,dithering_fragment:Bv,dithering_pars_fragment:Fv,roughnessmap_fragment:Hv,roughnessmap_pars_fragment:Vv,shadowmap_pars_fragment:Gv,shadowmap_pars_vertex:Wv,shadowmap_vertex:Zv,shadowmask_pars_fragment:Xv,skinbase_vertex:qv,skinning_pars_vertex:jv,skinning_vertex:Yv,skinnormal_vertex:$v,specularmap_fragment:Kv,specularmap_pars_fragment:Jv,tonemapping_fragment:Qv,tonemapping_pars_fragment:t0,transmission_fragment:e0,transmission_pars_fragment:n0,uv_pars_fragment:i0,uv_pars_vertex:r0,uv_vertex:s0,worldpos_vertex:o0,background_vert:a0,background_frag:l0,backgroundCube_vert:c0,backgroundCube_frag:u0,cube_vert:h0,cube_frag:d0,depth_vert:f0,depth_frag:p0,distanceRGBA_vert:m0,distanceRGBA_frag:g0,equirect_vert:_0,equirect_frag:v0,linedashed_vert:y0,linedashed_frag:x0,meshbasic_vert:b0,meshbasic_frag:w0,meshlambert_vert:M0,meshlambert_frag:S0,meshmatcap_vert:E0,meshmatcap_frag:T0,meshnormal_vert:A0,meshnormal_frag:L0,meshphong_vert:C0,meshphong_frag:P0,meshphysical_vert:R0,meshphysical_frag:I0,meshtoon_vert:D0,meshtoon_frag:N0,points_vert:O0,points_frag:k0,shadow_vert:U0,shadow_frag:z0,sprite_vert:B0,sprite_frag:F0},Ot={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},ni={basic:{uniforms:un([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:un([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:un([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:un([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:un([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:un([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:un([Ot.points,Ot.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:un([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:un([Ot.common,Ot.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:un([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:un([Ot.sprite,Ot.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:un([Ot.common,Ot.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:un([Ot.lights,Ot.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};ni.physical={uniforms:un([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const $o={r:0,b:0,g:0},Ji=new Yn,H0=new Ae;function V0(i,t,e,n,s,o,l){const c=new Qt(0);let u=o===!0?0:1,h,f,p=null,_=0,m=null;function x(g,v){let S=!1,w=v.isScene===!0?v.background:null;w&&w.isTexture&&(w=(v.backgroundBlurriness>0?e:t).get(w)),w===null?y(c,u):w&&w.isColor&&(y(w,1),S=!0);const P=i.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,l):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),w&&(w.isCubeTexture||w.mapping===La)?(f===void 0&&(f=new Ne(new hn(1,1,1),new Bi({name:"BackgroundCubeMaterial",uniforms:hs(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(N,O,k){this.matrixWorld.copyPosition(k.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),Ji.copy(v.backgroundRotation),Ji.x*=-1,Ji.y*=-1,Ji.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Ji.y*=-1,Ji.z*=-1),f.material.uniforms.envMap.value=w,f.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(H0.makeRotationFromEuler(Ji)),f.material.toneMapped=ge.getTransfer(w.colorSpace)!==we,(p!==w||_!==w.version||m!==i.toneMapping)&&(f.material.needsUpdate=!0,p=w,_=w.version,m=i.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null)):w&&w.isTexture&&(h===void 0&&(h=new Ne(new ro(2,2),new Bi({name:"BackgroundMaterial",uniforms:hs(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:zi,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=w,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.toneMapped=ge.getTransfer(w.colorSpace)!==we,w.matrixAutoUpdate===!0&&w.updateMatrix(),h.material.uniforms.uvTransform.value.copy(w.matrix),(p!==w||_!==w.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,p=w,_=w.version,m=i.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null))}function y(g,v){g.getRGB($o,df(i)),n.buffers.color.setClear($o.r,$o.g,$o.b,v,l)}return{getClearColor:function(){return c},setClearColor:function(g,v=1){c.set(g),u=v,y(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,y(c,u)},render:x}}function G0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=_(null);let o=s,l=!1;function c(R,W,U,F,A){let Z=!1;const nt=p(F,U,W);o!==nt&&(o=nt,h(o.object)),Z=m(R,F,U,A),Z&&x(R,F,U,A),A!==null&&t.update(A,i.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,P(R,W,U,F),A!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(A).buffer))}function u(){return i.createVertexArray()}function h(R){return i.bindVertexArray(R)}function f(R){return i.deleteVertexArray(R)}function p(R,W,U){const F=U.wireframe===!0;let A=n[R.id];A===void 0&&(A={},n[R.id]=A);let Z=A[W.id];Z===void 0&&(Z={},A[W.id]=Z);let nt=Z[F];return nt===void 0&&(nt=_(u()),Z[F]=nt),nt}function _(R){const W=[],U=[],F=[];for(let A=0;A<e;A++)W[A]=0,U[A]=0,F[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:U,attributeDivisors:F,object:R,attributes:{},index:null}}function m(R,W,U,F){const A=o.attributes,Z=W.attributes;let nt=0;const ot=U.getAttributes();for(const q in ot)if(ot[q].location>=0){const at=A[q];let j=Z[q];if(j===void 0&&(q==="instanceMatrix"&&R.instanceMatrix&&(j=R.instanceMatrix),q==="instanceColor"&&R.instanceColor&&(j=R.instanceColor)),at===void 0||at.attribute!==j||j&&at.data!==j.data)return!0;nt++}return o.attributesNum!==nt||o.index!==F}function x(R,W,U,F){const A={},Z=W.attributes;let nt=0;const ot=U.getAttributes();for(const q in ot)if(ot[q].location>=0){let at=Z[q];at===void 0&&(q==="instanceMatrix"&&R.instanceMatrix&&(at=R.instanceMatrix),q==="instanceColor"&&R.instanceColor&&(at=R.instanceColor));const j={};j.attribute=at,at&&at.data&&(j.data=at.data),A[q]=j,nt++}o.attributes=A,o.attributesNum=nt,o.index=F}function y(){const R=o.newAttributes;for(let W=0,U=R.length;W<U;W++)R[W]=0}function g(R){v(R,0)}function v(R,W){const U=o.newAttributes,F=o.enabledAttributes,A=o.attributeDivisors;U[R]=1,F[R]===0&&(i.enableVertexAttribArray(R),F[R]=1),A[R]!==W&&(i.vertexAttribDivisor(R,W),A[R]=W)}function S(){const R=o.newAttributes,W=o.enabledAttributes;for(let U=0,F=W.length;U<F;U++)W[U]!==R[U]&&(i.disableVertexAttribArray(U),W[U]=0)}function w(R,W,U,F,A,Z,nt){nt===!0?i.vertexAttribIPointer(R,W,U,A,Z):i.vertexAttribPointer(R,W,U,F,A,Z)}function P(R,W,U,F){y();const A=F.attributes,Z=U.getAttributes(),nt=W.defaultAttributeValues;for(const ot in Z){const q=Z[ot];if(q.location>=0){let rt=A[ot];if(rt===void 0&&(ot==="instanceMatrix"&&R.instanceMatrix&&(rt=R.instanceMatrix),ot==="instanceColor"&&R.instanceColor&&(rt=R.instanceColor)),rt!==void 0){const at=rt.normalized,j=rt.itemSize,tt=t.get(rt);if(tt===void 0)continue;const Ct=tt.buffer,Q=tt.type,it=tt.bytesPerElement,wt=Q===i.INT||Q===i.UNSIGNED_INT||rt.gpuType===$d;if(rt.isInterleavedBufferAttribute){const St=rt.data,Pt=St.stride,It=rt.offset;if(St.isInstancedInterleavedBuffer){for(let Ut=0;Ut<q.locationSize;Ut++)v(q.location+Ut,St.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let Ut=0;Ut<q.locationSize;Ut++)g(q.location+Ut);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let Ut=0;Ut<q.locationSize;Ut++)w(q.location+Ut,j/q.locationSize,Q,at,Pt*it,(It+j/q.locationSize*Ut)*it,wt)}else{if(rt.isInstancedBufferAttribute){for(let St=0;St<q.locationSize;St++)v(q.location+St,rt.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let St=0;St<q.locationSize;St++)g(q.location+St);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let St=0;St<q.locationSize;St++)w(q.location+St,j/q.locationSize,Q,at,j*it,j/q.locationSize*St*it,wt)}}else if(nt!==void 0){const at=nt[ot];if(at!==void 0)switch(at.length){case 2:i.vertexAttrib2fv(q.location,at);break;case 3:i.vertexAttrib3fv(q.location,at);break;case 4:i.vertexAttrib4fv(q.location,at);break;default:i.vertexAttrib1fv(q.location,at)}}}}S()}function N(){H();for(const R in n){const W=n[R];for(const U in W){const F=W[U];for(const A in F)f(F[A].object),delete F[A];delete W[U]}delete n[R]}}function O(R){if(n[R.id]===void 0)return;const W=n[R.id];for(const U in W){const F=W[U];for(const A in F)f(F[A].object),delete F[A];delete W[U]}delete n[R.id]}function k(R){for(const W in n){const U=n[W];if(U[R.id]===void 0)continue;const F=U[R.id];for(const A in F)f(F[A].object),delete F[A];delete U[R.id]}}function H(){I(),l=!0,o!==s&&(o=s,h(o.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:H,resetDefaultState:I,dispose:N,releaseStatesOfGeometry:O,releaseStatesOfProgram:k,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function W0(i,t,e){let n;function s(u){n=u}function o(u,h){i.drawArrays(n,u,h),e.update(h,n,1)}function l(u,h,f){f!==0&&(i.drawArraysInstanced(n,u,h,f),e.update(h,n,f))}function c(u,h,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(u[_],h[_]);else{p.multiDrawArraysWEBGL(n,u,0,h,0,f);let _=0;for(let m=0;m<f;m++)_+=h[m];e.update(_,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Z0(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),g=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:v,maxSamples:S}}function X0(i){const t=this;let e=null,n=0,s=!1,o=!1;const l=new Ii,c=new ce,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,_){const m=p.length!==0||_||n!==0||s;return s=_,n=p.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,_){e=f(p,_,0)},this.setState=function(p,_,m){const x=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,v=i.get(p);if(!s||x===null||x.length===0||o&&!g)o?f(null):h();else{const S=o?0:n,w=S*4;let P=v.clippingState||null;u.value=P,P=f(x,_,w,m);for(let N=0;N!==w;++N)P[N]=e[N];v.clippingState=P,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function h(){u.value!==e&&(u.value=e,u.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,_,m,x){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=u.value,x!==!0||g===null){const v=m+y*4,S=_.matrixWorldInverse;c.getNormalMatrix(S),(g===null||g.length<v)&&(g=new Float32Array(v));for(let w=0,P=m;w!==y;++w,P+=4)l.copy(p[w]).applyMatrix4(S,c),l.normal.toArray(g,P),g[P+3]=l.constant}u.value=g,u.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}function q0(i){let t=new WeakMap;function e(l,c){return c===rc?l.mapping=ls:c===sc&&(l.mapping=cs),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===rc||c===sc)if(t.has(l)){const u=t.get(l).texture;return e(u,l.mapping)}else{const u=l.image;if(u&&u.height>0){const h=new i_(u.height);return h.fromEquirectangularTexture(i,l),t.set(l,h),l.addEventListener("dispose",s),e(h.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class gf extends ff{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,u=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=h*this.view.offsetX,l=o+h*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Kr=4,Bh=[.125,.215,.35,.446,.526,.582],nr=20,Nl=new gf,Fh=new Qt;let Ol=null,kl=0,Ul=0,zl=!1;const tr=(1+Math.sqrt(5))/2,Hr=1/tr,Hh=[new J(1,1,1),new J(-1,1,1),new J(1,1,-1),new J(-1,1,-1),new J(0,tr,Hr),new J(0,tr,-Hr),new J(Hr,0,tr),new J(-Hr,0,tr),new J(tr,Hr,0),new J(-tr,Hr,0)];class Vh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Ol=this._renderer.getRenderTarget(),kl=this._renderer.getActiveCubeFace(),Ul=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ol,kl,Ul),this._renderer.xr.enabled=zl,t.scissorTest=!1,Ko(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ls||t.mapping===cs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ol=this._renderer.getRenderTarget(),kl=this._renderer.getActiveCubeFace(),Ul=this._renderer.getActiveMipmapLevel(),zl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:fa,format:ri,colorSpace:Fi,depthBuffer:!1},s=Gh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gh(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=j0(o)),this._blurMaterial=Y0(o,t,e)}return s}_compileMaterial(t){const e=new Ne(this._lodPlanes[0],t);this._renderer.compile(e,Nl)}_sceneToCubeUV(t,e,n,s){const c=new En(90,1,e,n),u=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,_=f.toneMapping;f.getClearColor(Fh),f.toneMapping=ki,f.autoClear=!1;const m=new cf({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1}),x=new Ne(new hn,m);let y=!1;const g=t.background;g?g.isColor&&(m.color.copy(g),t.background=null,y=!0):(m.color.copy(Fh),y=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(c.up.set(0,u[v],0),c.lookAt(h[v],0,0)):S===1?(c.up.set(0,0,u[v]),c.lookAt(0,h[v],0)):(c.up.set(0,u[v],0),c.lookAt(0,0,h[v]));const w=this._cubeSize;Ko(s,S*w,v>2?w:0,w,w),f.setRenderTarget(s),y&&f.render(x,c),f.render(t,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=_,f.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===ls||t.mapping===cs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wh());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new Ne(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const u=this._cubeSize;Ko(e,0,0,3*u,2*u),n.setRenderTarget(e),n.render(l,Nl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=Hh[(s-1)%Hh.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const u=this._renderer,h=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new Ne(this._lodPlanes[s],h),_=h.uniforms,m=this._sizeLods[n]-1,x=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*nr-1),y=o/x,g=isFinite(o)?1+Math.floor(f*y):nr;g>nr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${nr}`);const v=[];let S=0;for(let k=0;k<nr;++k){const H=k/y,I=Math.exp(-H*H/2);v.push(I),k===0?S+=I:k<g&&(S+=2*I)}for(let k=0;k<v.length;k++)v[k]=v[k]/S;_.envMap.value=t.texture,_.samples.value=g,_.weights.value=v,_.latitudinal.value=l==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:w}=this;_.dTheta.value=x,_.mipInt.value=w-n;const P=this._sizeLods[s],N=3*P*(s>w-Kr?s-w+Kr:0),O=4*(this._cubeSize-P);Ko(e,N,O,3*P,2*P),u.setRenderTarget(e),u.render(p,Nl)}}function j0(i){const t=[],e=[],n=[];let s=i;const o=i-Kr+1+Bh.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let u=1/c;l>i-Kr?u=Bh[l-i+Kr-1]:l===0&&(u=0),n.push(u);const h=1/(c-2),f=-h,p=1+h,_=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,y=3,g=2,v=1,S=new Float32Array(y*x*m),w=new Float32Array(g*x*m),P=new Float32Array(v*x*m);for(let O=0;O<m;O++){const k=O%3*2/3-1,H=O>2?0:-1,I=[k,H,0,k+2/3,H,0,k+2/3,H+1,0,k,H,0,k+2/3,H+1,0,k,H+1,0];S.set(I,y*x*O),w.set(_,g*x*O);const R=[O,O,O,O,O,O];P.set(R,v*x*O)}const N=new Oe;N.setAttribute("position",new Ln(S,y)),N.setAttribute("uv",new Ln(w,g)),N.setAttribute("faceIndex",new Ln(P,v)),t.push(N),s>Kr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Gh(i,t,e){const n=new lr(i,t,e);return n.texture.mapping=La,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ko(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Y0(i,t,e){const n=new Float32Array(nr),s=new J(0,1,0);return new Bi({name:"SphericalGaussianBlur",defines:{n:nr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Wh(){return new Bi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pc(),fragmentShader:`

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
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Zh(){return new Bi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oi,depthTest:!1,depthWrite:!1})}function Pc(){return`

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
	`}function $0(i){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const u=c.mapping,h=u===rc||u===sc,f=u===ls||u===cs;if(h||f){let p=t.get(c);const _=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==_)return e===null&&(e=new Vh(i)),p=h?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const m=c.image;return h&&m&&m.height>0||f&&m&&s(m)?(e===null&&(e=new Vh(i)),p=h?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function s(c){let u=0;const h=6;for(let f=0;f<h;f++)c[f]!==void 0&&u++;return u===h}function o(c){const u=c.target;u.removeEventListener("dispose",o);const h=t.get(u);h!==void 0&&(t.delete(u),h.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function K0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function J0(i,t,e,n){const s={},o=new WeakMap;function l(p){const _=p.target;_.index!==null&&t.remove(_.index);for(const x in _.attributes)t.remove(_.attributes[x]);for(const x in _.morphAttributes){const y=_.morphAttributes[x];for(let g=0,v=y.length;g<v;g++)t.remove(y[g])}_.removeEventListener("dispose",l),delete s[_.id];const m=o.get(_);m&&(t.remove(m),o.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(p,_){return s[_.id]===!0||(_.addEventListener("dispose",l),s[_.id]=!0,e.memory.geometries++),_}function u(p){const _=p.attributes;for(const x in _)t.update(_[x],i.ARRAY_BUFFER);const m=p.morphAttributes;for(const x in m){const y=m[x];for(let g=0,v=y.length;g<v;g++)t.update(y[g],i.ARRAY_BUFFER)}}function h(p){const _=[],m=p.index,x=p.attributes.position;let y=0;if(m!==null){const S=m.array;y=m.version;for(let w=0,P=S.length;w<P;w+=3){const N=S[w+0],O=S[w+1],k=S[w+2];_.push(N,O,O,k,k,N)}}else if(x!==void 0){const S=x.array;y=x.version;for(let w=0,P=S.length/3-1;w<P;w+=3){const N=w+0,O=w+1,k=w+2;_.push(N,O,O,k,k,N)}}else return;const g=new(sf(_)?hf:uf)(_,1);g.version=y;const v=o.get(p);v&&t.remove(v),o.set(p,g)}function f(p){const _=o.get(p);if(_){const m=p.index;m!==null&&_.version<m.version&&h(p)}else h(p);return o.get(p)}return{get:c,update:u,getWireframeAttribute:f}}function Q0(i,t,e){let n;function s(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,_){i.drawElements(n,_,o,p*l),e.update(_,n,1)}function h(p,_,m){m!==0&&(i.drawElementsInstanced(n,_,o,p*l,m),e.update(_,n,m))}function f(p,_,m){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<m;y++)this.render(p[y]/l,_[y]);else{x.multiDrawElementsWEBGL(n,_,0,o,p,0,m);let y=0;for(let g=0;g<m;g++)y+=_[g];e.update(y,n,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=h,this.renderMultiDraw=f}function ty(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case i.TRIANGLES:e.triangles+=c*(o/3);break;case i.LINES:e.lines+=c*(o/2);break;case i.LINE_STRIP:e.lines+=c*(o-1);break;case i.LINE_LOOP:e.lines+=c*o;break;case i.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function ey(i,t,e){const n=new WeakMap,s=new $e;function o(l,c,u){const h=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let _=n.get(c);if(_===void 0||_.count!==p){let I=function(){k.dispose(),n.delete(c),c.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let w=0;m===!0&&(w=1),x===!0&&(w=2),y===!0&&(w=3);let P=c.attributes.position.count*w,N=1;P>t.maxTextureSize&&(N=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const O=new Float32Array(P*N*4*p),k=new af(O,P,N,p);k.type=Ni,k.needsUpdate=!0;const H=w*4;for(let R=0;R<p;R++){const W=g[R],U=v[R],F=S[R],A=P*N*4*R;for(let Z=0;Z<W.count;Z++){const nt=Z*H;m===!0&&(s.fromBufferAttribute(W,Z),O[A+nt+0]=s.x,O[A+nt+1]=s.y,O[A+nt+2]=s.z,O[A+nt+3]=0),x===!0&&(s.fromBufferAttribute(U,Z),O[A+nt+4]=s.x,O[A+nt+5]=s.y,O[A+nt+6]=s.z,O[A+nt+7]=0),y===!0&&(s.fromBufferAttribute(F,Z),O[A+nt+8]=s.x,O[A+nt+9]=s.y,O[A+nt+10]=s.z,O[A+nt+11]=F.itemSize===4?s.w:1)}}_={count:p,texture:k,size:new vt(P,N)},n.set(c,_),c.addEventListener("dispose",I)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",l.morphTexture,e);else{let m=0;for(let y=0;y<h.length;y++)m+=h[y];const x=c.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",h)}u.getUniforms().setValue(i,"morphTargetsTexture",_.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",_.size)}return{update:o}}function ny(i,t,e,n){let s=new WeakMap;function o(u){const h=n.render.frame,f=u.geometry,p=t.get(u,f);if(s.get(p)!==h&&(t.update(p),s.set(p,h)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),s.get(u)!==h&&(e.update(u.instanceMatrix,i.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,i.ARRAY_BUFFER),s.set(u,h))),u.isSkinnedMesh){const _=u.skeleton;s.get(_)!==h&&(_.update(),s.set(_,h))}return p}function l(){s=new WeakMap}function c(u){const h=u.target;h.removeEventListener("dispose",c),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:l}}class _f extends pn{constructor(t,e,n,s,o,l,c,u,h,f){if(f=f!==void 0?f:is,f!==is&&f!==Ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===is&&(n=us),n===void 0&&f===Ys&&(n=no),super(null,s,o,l,c,u,f,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Nn,this.minFilter=u!==void 0?u:Nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const vf=new pn,yf=new _f(1,1);yf.compareFunction=rf;const xf=new af,bf=new Hg,wf=new pf,Xh=[],qh=[],jh=new Float32Array(16),Yh=new Float32Array(9),$h=new Float32Array(4);function ps(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let o=Xh[s];if(o===void 0&&(o=new Float32Array(s),Xh[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,i[l].toArray(o,c)}return o}function He(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ve(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ia(i,t){let e=qh[t];e===void 0&&(e=new Int32Array(t),qh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function iy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function ry(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2fv(this.addr,t),Ve(e,t)}}function sy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;i.uniform3fv(this.addr,t),Ve(e,t)}}function oy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4fv(this.addr,t),Ve(e,t)}}function ay(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;$h.set(n),i.uniformMatrix2fv(this.addr,!1,$h),Ve(e,n)}}function ly(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Yh.set(n),i.uniformMatrix3fv(this.addr,!1,Yh),Ve(e,n)}}function cy(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;jh.set(n),i.uniformMatrix4fv(this.addr,!1,jh),Ve(e,n)}}function uy(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function hy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2iv(this.addr,t),Ve(e,t)}}function dy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;i.uniform3iv(this.addr,t),Ve(e,t)}}function fy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4iv(this.addr,t),Ve(e,t)}}function py(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function my(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;i.uniform2uiv(this.addr,t),Ve(e,t)}}function gy(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;i.uniform3uiv(this.addr,t),Ve(e,t)}}function _y(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;i.uniform4uiv(this.addr,t),Ve(e,t)}}function vy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const o=this.type===i.SAMPLER_2D_SHADOW?yf:vf;e.setTexture2D(t||o,s)}function yy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||bf,s)}function xy(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||wf,s)}function by(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||xf,s)}function wy(i){switch(i){case 5126:return iy;case 35664:return ry;case 35665:return sy;case 35666:return oy;case 35674:return ay;case 35675:return ly;case 35676:return cy;case 5124:case 35670:return uy;case 35667:case 35671:return hy;case 35668:case 35672:return dy;case 35669:case 35673:return fy;case 5125:return py;case 36294:return my;case 36295:return gy;case 36296:return _y;case 35678:case 36198:case 36298:case 36306:case 35682:return vy;case 35679:case 36299:case 36307:return yy;case 35680:case 36300:case 36308:case 36293:return xy;case 36289:case 36303:case 36311:case 36292:return by}}function My(i,t){i.uniform1fv(this.addr,t)}function Sy(i,t){const e=ps(t,this.size,2);i.uniform2fv(this.addr,e)}function Ey(i,t){const e=ps(t,this.size,3);i.uniform3fv(this.addr,e)}function Ty(i,t){const e=ps(t,this.size,4);i.uniform4fv(this.addr,e)}function Ay(i,t){const e=ps(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Ly(i,t){const e=ps(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Cy(i,t){const e=ps(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Py(i,t){i.uniform1iv(this.addr,t)}function Ry(i,t){i.uniform2iv(this.addr,t)}function Iy(i,t){i.uniform3iv(this.addr,t)}function Dy(i,t){i.uniform4iv(this.addr,t)}function Ny(i,t){i.uniform1uiv(this.addr,t)}function Oy(i,t){i.uniform2uiv(this.addr,t)}function ky(i,t){i.uniform3uiv(this.addr,t)}function Uy(i,t){i.uniform4uiv(this.addr,t)}function zy(i,t,e){const n=this.cache,s=t.length,o=Ia(e,s);He(n,o)||(i.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||vf,o[l])}function By(i,t,e){const n=this.cache,s=t.length,o=Ia(e,s);He(n,o)||(i.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||bf,o[l])}function Fy(i,t,e){const n=this.cache,s=t.length,o=Ia(e,s);He(n,o)||(i.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||wf,o[l])}function Hy(i,t,e){const n=this.cache,s=t.length,o=Ia(e,s);He(n,o)||(i.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||xf,o[l])}function Vy(i){switch(i){case 5126:return My;case 35664:return Sy;case 35665:return Ey;case 35666:return Ty;case 35674:return Ay;case 35675:return Ly;case 35676:return Cy;case 5124:case 35670:return Py;case 35667:case 35671:return Ry;case 35668:case 35672:return Iy;case 35669:case 35673:return Dy;case 5125:return Ny;case 36294:return Oy;case 36295:return ky;case 36296:return Uy;case 35678:case 36198:case 36298:case 36306:case 35682:return zy;case 35679:case 36299:case 36307:return By;case 35680:case 36300:case 36308:case 36293:return Fy;case 36289:case 36303:case 36311:case 36292:return Hy}}class Gy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=wy(e.type)}}class Wy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Vy(e.type)}}class Zy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const Bl=/(\w+)(\])?(\[|\.)?/g;function Kh(i,t){i.seq.push(t),i.map[t.id]=t}function Xy(i,t,e){const n=i.name,s=n.length;for(Bl.lastIndex=0;;){const o=Bl.exec(n),l=Bl.lastIndex;let c=o[1];const u=o[2]==="]",h=o[3];if(u&&(c=c|0),h===void 0||h==="["&&l+2===s){Kh(e,h===void 0?new Gy(c,i,t):new Wy(c,i,t));break}else{let p=e.map[c];p===void 0&&(p=new Zy(c),Kh(e,p)),e=p}}}class ca{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);Xy(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],u=n[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function Jh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const qy=37297;let jy=0;function Yy(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function $y(i){const t=ge.getPrimaries(ge.workingColorSpace),e=ge.getPrimaries(i);let n;switch(t===e?n="":t===ga&&e===ma?n="LinearDisplayP3ToLinearSRGB":t===ma&&e===ga&&(n="LinearSRGBToLinearDisplayP3"),i){case Fi:case Ca:return[n,"LinearTransferOETF"];case ei:case Ac:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Qh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Yy(i.getShaderSource(t),l)}else return s}function Ky(i,t){const e=$y(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Jy(i,t){let e;switch(t){case qd:e="Linear";break;case sg:e="Reinhard";break;case og:e="OptimizedCineon";break;case ag:e="ACESFilmic";break;case cg:e="AgX";break;case ug:e="Neutral";break;case lg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Qy(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function tx(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ex(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(t,s),l=o.name;let c=1;o.type===i.FLOAT_MAT2&&(c=2),o.type===i.FLOAT_MAT3&&(c=3),o.type===i.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:i.getAttribLocation(t,l),locationSize:c}}return e}function Fs(i){return i!==""}function td(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ed(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const nx=/^[ \t]*#include +<([\w\d./]+)>/gm;function cc(i){return i.replace(nx,rx)}const ix=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function rx(i,t){let e=le[t];if(e===void 0){const n=ix.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return cc(e)}const sx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function nd(i){return i.replace(sx,ox)}function ox(i,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function id(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function ax(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Xd?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Rm?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vi&&(t="SHADOWMAP_TYPE_VSM"),t}function lx(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ls:case cs:t="ENVMAP_TYPE_CUBE";break;case La:t="ENVMAP_TYPE_CUBE_UV";break}return t}function cx(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case cs:t="ENVMAP_MODE_REFRACTION";break}return t}function ux(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ec:t="ENVMAP_BLENDING_MULTIPLY";break;case ig:t="ENVMAP_BLENDING_MIX";break;case rg:t="ENVMAP_BLENDING_ADD";break}return t}function hx(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function dx(i,t,e,n){const s=i.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const u=ax(e),h=lx(e),f=cx(e),p=ux(e),_=hx(e),m=Qy(e),x=tx(o),y=s.createProgram();let g,v,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Fs).join(`
`),g.length>0&&(g+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Fs).join(`
`),v.length>0&&(v+=`
`)):(g=[id(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),v=[id(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ki?"#define TONE_MAPPING":"",e.toneMapping!==ki?le.tonemapping_pars_fragment:"",e.toneMapping!==ki?Jy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,Ky("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),l=cc(l),l=td(l,e),l=ed(l,e),c=cc(c),c=td(c,e),c=ed(c,e),l=nd(l),c=nd(c),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,v=["#define varying in",e.glslVersion===yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const w=S+g+l,P=S+v+c,N=Jh(s,s.VERTEX_SHADER,w),O=Jh(s,s.FRAGMENT_SHADER,P);s.attachShader(y,N),s.attachShader(y,O),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function k(W){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(y).trim(),F=s.getShaderInfoLog(N).trim(),A=s.getShaderInfoLog(O).trim();let Z=!0,nt=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,y,N,O);else{const ot=Qh(s,N,"vertex"),q=Qh(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+U+`
`+ot+`
`+q)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(F===""||A==="")&&(nt=!1);nt&&(W.diagnostics={runnable:Z,programLog:U,vertexShader:{log:F,prefix:g},fragmentShader:{log:A,prefix:v}})}s.deleteShader(N),s.deleteShader(O),H=new ca(s,y),I=ex(s,y)}let H;this.getUniforms=function(){return H===void 0&&k(this),H};let I;this.getAttributes=function(){return I===void 0&&k(this),I};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(y,qy)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=jy++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=O,this}let fx=0;class px{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new mx(t),e.set(t,n)),n}}class mx{constructor(t){this.id=fx++,this.code=t,this.usedTimes=0}}function gx(i,t,e,n,s,o,l){const c=new Lc,u=new px,h=new Set,f=[],p=s.logarithmicDepthBuffer,_=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(I){return h.add(I),I===0?"uv":`uv${I}`}function g(I,R,W,U,F){const A=U.fog,Z=F.geometry,nt=I.isMeshStandardMaterial?U.environment:null,ot=(I.isMeshStandardMaterial?e:t).get(I.envMap||nt),q=ot&&ot.mapping===La?ot.image.height:null,rt=x[I.type];I.precision!==null&&(m=s.getMaxPrecision(I.precision),m!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",m,"instead."));const at=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,j=at!==void 0?at.length:0;let tt=0;Z.morphAttributes.position!==void 0&&(tt=1),Z.morphAttributes.normal!==void 0&&(tt=2),Z.morphAttributes.color!==void 0&&(tt=3);let Ct,Q,it,wt;if(rt){const ke=ni[rt];Ct=ke.vertexShader,Q=ke.fragmentShader}else Ct=I.vertexShader,Q=I.fragmentShader,u.update(I),it=u.getVertexShaderID(I),wt=u.getFragmentShaderID(I);const St=i.getRenderTarget(),Pt=F.isInstancedMesh===!0,It=F.isBatchedMesh===!0,Ut=!!I.map,st=!!I.matcap,xt=!!ot,bt=!!I.aoMap,E=!!I.lightMap,et=!!I.bumpMap,$=!!I.normalMap,C=!!I.displacementMap,M=!!I.emissiveMap,B=!!I.metalnessMap,X=!!I.roughnessMap,K=I.anisotropy>0,G=I.clearcoat>0,ft=I.iridescence>0,lt=I.sheen>0,pt=I.transmission>0,Tt=K&&!!I.anisotropyMap,Et=G&&!!I.clearcoatMap,At=G&&!!I.clearcoatNormalMap,Ht=G&&!!I.clearcoatRoughnessMap,zt=ft&&!!I.iridescenceMap,Dt=ft&&!!I.iridescenceThicknessMap,Kt=lt&&!!I.sheenColorMap,Vt=lt&&!!I.sheenRoughnessMap,oe=!!I.specularMap,ae=!!I.specularColorMap,te=!!I.specularIntensityMap,Ft=pt&&!!I.transmissionMap,D=pt&&!!I.thicknessMap,ht=!!I.gradientMap,Mt=!!I.alphaMap,Rt=I.alphaTest>0,Nt=!!I.alphaHash,re=!!I.extensions;let ue=ki;I.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(ue=i.toneMapping);const ve={shaderID:rt,shaderType:I.type,shaderName:I.name,vertexShader:Ct,fragmentShader:Q,defines:I.defines,customVertexShaderID:it,customFragmentShaderID:wt,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:m,batching:It,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:_,outputColorSpace:St===null?i.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Fi,alphaToCoverage:!!I.alphaToCoverage,map:Ut,matcap:st,envMap:xt,envMapMode:xt&&ot.mapping,envMapCubeUVHeight:q,aoMap:bt,lightMap:E,bumpMap:et,normalMap:$,displacementMap:_&&C,emissiveMap:M,normalMapObjectSpace:$&&I.normalMapType===Sg,normalMapTangentSpace:$&&I.normalMapType===Tc,metalnessMap:B,roughnessMap:X,anisotropy:K,anisotropyMap:Tt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:At,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:zt,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Vt,specularMap:oe,specularColorMap:ae,specularIntensityMap:te,transmission:pt,transmissionMap:Ft,thicknessMap:D,gradientMap:ht,opaque:I.transparent===!1&&I.blending===ns&&I.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Rt,alphaHash:Nt,combine:I.combine,mapUv:Ut&&y(I.map.channel),aoMapUv:bt&&y(I.aoMap.channel),lightMapUv:E&&y(I.lightMap.channel),bumpMapUv:et&&y(I.bumpMap.channel),normalMapUv:$&&y(I.normalMap.channel),displacementMapUv:C&&y(I.displacementMap.channel),emissiveMapUv:M&&y(I.emissiveMap.channel),metalnessMapUv:B&&y(I.metalnessMap.channel),roughnessMapUv:X&&y(I.roughnessMap.channel),anisotropyMapUv:Tt&&y(I.anisotropyMap.channel),clearcoatMapUv:Et&&y(I.clearcoatMap.channel),clearcoatNormalMapUv:At&&y(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(I.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&y(I.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&y(I.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(I.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&y(I.sheenRoughnessMap.channel),specularMapUv:oe&&y(I.specularMap.channel),specularColorMapUv:ae&&y(I.specularColorMap.channel),specularIntensityMapUv:te&&y(I.specularIntensityMap.channel),transmissionMapUv:Ft&&y(I.transmissionMap.channel),thicknessMapUv:D&&y(I.thicknessMap.channel),alphaMapUv:Mt&&y(I.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&($||K),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(Ut||Mt),fog:!!A,useFog:I.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:tt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:I.dithering,shadowMapEnabled:i.shadowMap.enabled&&W.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ut&&I.map.isVideoTexture===!0&&ge.getTransfer(I.map.colorSpace)===we,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===fn,flipSided:I.side===bn,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:re&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:re&&I.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return ve.vertexUv1s=h.has(1),ve.vertexUv2s=h.has(2),ve.vertexUv3s=h.has(3),h.clear(),ve}function v(I){const R=[];if(I.shaderID?R.push(I.shaderID):(R.push(I.customVertexShaderID),R.push(I.customFragmentShaderID)),I.defines!==void 0)for(const W in I.defines)R.push(W),R.push(I.defines[W]);return I.isRawShaderMaterial===!1&&(S(R,I),w(R,I),R.push(i.outputColorSpace)),R.push(I.customProgramCacheKey),R.join()}function S(I,R){I.push(R.precision),I.push(R.outputColorSpace),I.push(R.envMapMode),I.push(R.envMapCubeUVHeight),I.push(R.mapUv),I.push(R.alphaMapUv),I.push(R.lightMapUv),I.push(R.aoMapUv),I.push(R.bumpMapUv),I.push(R.normalMapUv),I.push(R.displacementMapUv),I.push(R.emissiveMapUv),I.push(R.metalnessMapUv),I.push(R.roughnessMapUv),I.push(R.anisotropyMapUv),I.push(R.clearcoatMapUv),I.push(R.clearcoatNormalMapUv),I.push(R.clearcoatRoughnessMapUv),I.push(R.iridescenceMapUv),I.push(R.iridescenceThicknessMapUv),I.push(R.sheenColorMapUv),I.push(R.sheenRoughnessMapUv),I.push(R.specularMapUv),I.push(R.specularColorMapUv),I.push(R.specularIntensityMapUv),I.push(R.transmissionMapUv),I.push(R.thicknessMapUv),I.push(R.combine),I.push(R.fogExp2),I.push(R.sizeAttenuation),I.push(R.morphTargetsCount),I.push(R.morphAttributeCount),I.push(R.numDirLights),I.push(R.numPointLights),I.push(R.numSpotLights),I.push(R.numSpotLightMaps),I.push(R.numHemiLights),I.push(R.numRectAreaLights),I.push(R.numDirLightShadows),I.push(R.numPointLightShadows),I.push(R.numSpotLightShadows),I.push(R.numSpotLightShadowsWithMaps),I.push(R.numLightProbes),I.push(R.shadowMapType),I.push(R.toneMapping),I.push(R.numClippingPlanes),I.push(R.numClipIntersection),I.push(R.depthPacking)}function w(I,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),I.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.skinning&&c.enable(4),R.morphTargets&&c.enable(5),R.morphNormals&&c.enable(6),R.morphColors&&c.enable(7),R.premultipliedAlpha&&c.enable(8),R.shadowMapEnabled&&c.enable(9),R.useLegacyLights&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.alphaToCoverage&&c.enable(20),I.push(c.mask)}function P(I){const R=x[I.type];let W;if(R){const U=ni[R];W=Qg.clone(U.uniforms)}else W=I.uniforms;return W}function N(I,R){let W;for(let U=0,F=f.length;U<F;U++){const A=f[U];if(A.cacheKey===R){W=A,++W.usedTimes;break}}return W===void 0&&(W=new dx(i,R,I,o),f.push(W)),W}function O(I){if(--I.usedTimes===0){const R=f.indexOf(I);f[R]=f[f.length-1],f.pop(),I.destroy()}}function k(I){u.remove(I)}function H(){u.dispose()}return{getParameters:g,getProgramCacheKey:v,getUniforms:P,acquireProgram:N,releaseProgram:O,releaseShaderCache:k,programs:f,dispose:H}}function _x(){let i=new WeakMap;function t(o){let l=i.get(o);return l===void 0&&(l={},i.set(o,l)),l}function e(o){i.delete(o)}function n(o,l,c){i.get(o)[l]=c}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function vx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function rd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function sd(){const i=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(p,_,m,x,y,g){let v=i[t];return v===void 0?(v={id:p.id,object:p,geometry:_,material:m,groupOrder:x,renderOrder:p.renderOrder,z:y,group:g},i[t]=v):(v.id=p.id,v.object=p,v.geometry=_,v.material=m,v.groupOrder=x,v.renderOrder=p.renderOrder,v.z=y,v.group=g),t++,v}function c(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.push(v):m.transparent===!0?s.push(v):e.push(v)}function u(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function h(p,_){e.length>1&&e.sort(p||vx),n.length>1&&n.sort(_||rd),s.length>1&&s.sort(_||rd)}function f(){for(let p=t,_=i.length;p<_;p++){const m=i[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:u,finish:f,sort:h}}function yx(){let i=new WeakMap;function t(n,s){const o=i.get(n);let l;return o===void 0?(l=new sd,i.set(n,[l])):s>=o.length?(l=new sd,o.push(l)):l=o[s],l}function e(){i=new WeakMap}return{get:t,dispose:e}}function xx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new J,color:new Qt};break;case"SpotLight":e={position:new J,direction:new J,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new J,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new J,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new J,halfWidth:new J,halfHeight:new J};break}return i[t.id]=e,e}}}function bx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let wx=0;function Mx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Sx(i){const t=new xx,e=bx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new J);const s=new J,o=new Ae,l=new Ae;function c(h,f){let p=0,_=0,m=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let x=0,y=0,g=0,v=0,S=0,w=0,P=0,N=0,O=0,k=0,H=0;h.sort(Mx);const I=f===!0?Math.PI:1;for(let W=0,U=h.length;W<U;W++){const F=h[W],A=F.color,Z=F.intensity,nt=F.distance,ot=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)p+=A.r*Z*I,_+=A.g*Z*I,m+=A.b*Z*I;else if(F.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(F.sh.coefficients[q],Z);H++}else if(F.isDirectionalLight){const q=t.get(F);if(q.color.copy(F.color).multiplyScalar(F.intensity*I),F.castShadow){const rt=F.shadow,at=e.get(F);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,n.directionalShadow[x]=at,n.directionalShadowMap[x]=ot,n.directionalShadowMatrix[x]=F.shadow.matrix,w++}n.directional[x]=q,x++}else if(F.isSpotLight){const q=t.get(F);q.position.setFromMatrixPosition(F.matrixWorld),q.color.copy(A).multiplyScalar(Z*I),q.distance=nt,q.coneCos=Math.cos(F.angle),q.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),q.decay=F.decay,n.spot[g]=q;const rt=F.shadow;if(F.map&&(n.spotLightMap[O]=F.map,O++,rt.updateMatrices(F),F.castShadow&&k++),n.spotLightMatrix[g]=rt.matrix,F.castShadow){const at=e.get(F);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,n.spotShadow[g]=at,n.spotShadowMap[g]=ot,N++}g++}else if(F.isRectAreaLight){const q=t.get(F);q.color.copy(A).multiplyScalar(Z),q.halfWidth.set(F.width*.5,0,0),q.halfHeight.set(0,F.height*.5,0),n.rectArea[v]=q,v++}else if(F.isPointLight){const q=t.get(F);if(q.color.copy(F.color).multiplyScalar(F.intensity*I),q.distance=F.distance,q.decay=F.decay,F.castShadow){const rt=F.shadow,at=e.get(F);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,at.shadowCameraNear=rt.camera.near,at.shadowCameraFar=rt.camera.far,n.pointShadow[y]=at,n.pointShadowMap[y]=ot,n.pointShadowMatrix[y]=F.shadow.matrix,P++}n.point[y]=q,y++}else if(F.isHemisphereLight){const q=t.get(F);q.skyColor.copy(F.color).multiplyScalar(Z*I),q.groundColor.copy(F.groundColor).multiplyScalar(Z*I),n.hemi[S]=q,S++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=_,n.ambient[2]=m;const R=n.hash;(R.directionalLength!==x||R.pointLength!==y||R.spotLength!==g||R.rectAreaLength!==v||R.hemiLength!==S||R.numDirectionalShadows!==w||R.numPointShadows!==P||R.numSpotShadows!==N||R.numSpotMaps!==O||R.numLightProbes!==H)&&(n.directional.length=x,n.spot.length=g,n.rectArea.length=v,n.point.length=y,n.hemi.length=S,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=N,n.spotShadowMap.length=N,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=N+O-k,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=k,n.numLightProbes=H,R.directionalLength=x,R.pointLength=y,R.spotLength=g,R.rectAreaLength=v,R.hemiLength=S,R.numDirectionalShadows=w,R.numPointShadows=P,R.numSpotShadows=N,R.numSpotMaps=O,R.numLightProbes=H,n.version=wx++)}function u(h,f){let p=0,_=0,m=0,x=0,y=0;const g=f.matrixWorldInverse;for(let v=0,S=h.length;v<S;v++){const w=h[v];if(w.isDirectionalLight){const P=n.directional[p];P.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),p++}else if(w.isSpotLight){const P=n.spot[m];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(g),P.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const P=n.rectArea[x];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(g),l.identity(),o.copy(w.matrixWorld),o.premultiply(g),l.extractRotation(o),P.halfWidth.set(w.width*.5,0,0),P.halfHeight.set(0,w.height*.5,0),P.halfWidth.applyMatrix4(l),P.halfHeight.applyMatrix4(l),x++}else if(w.isPointLight){const P=n.point[_];P.position.setFromMatrixPosition(w.matrixWorld),P.position.applyMatrix4(g),_++}else if(w.isHemisphereLight){const P=n.hemi[y];P.direction.setFromMatrixPosition(w.matrixWorld),P.direction.transformDirection(g),y++}}}return{setup:c,setupView:u,state:n}}function od(i){const t=new Sx(i),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function u(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l}}function Ex(i){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new od(i),t.set(s,[c])):o>=l.length?(c=new od(i),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class Tx extends fr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ax extends fr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Lx=`void main() {
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
}`;function Px(i,t,e){let n=new Cc;const s=new vt,o=new vt,l=new $e,c=new Tx({depthPacking:Mg}),u=new Ax,h={},f=e.maxTextureSize,p={[zi]:bn,[bn]:zi,[fn]:fn},_=new Bi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:Lx,fragmentShader:Cx}),m=_.clone();m.defines.HORIZONTAL_PASS=1;const x=new Oe;x.setAttribute("position",new Ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ne(x,_),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xd;let v=this.type;this.render=function(O,k,H){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||O.length===0)return;const I=i.getRenderTarget(),R=i.getActiveCubeFace(),W=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Oi),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=v!==vi&&this.type===vi,A=v===vi&&this.type!==vi;for(let Z=0,nt=O.length;Z<nt;Z++){const ot=O[Z],q=ot.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const rt=q.getFrameExtents();if(s.multiply(rt),o.copy(q.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/rt.x),s.x=o.x*rt.x,q.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/rt.y),s.y=o.y*rt.y,q.mapSize.y=o.y)),q.map===null||F===!0||A===!0){const j=this.type!==vi?{minFilter:Nn,magFilter:Nn}:{};q.map!==null&&q.map.dispose(),q.map=new lr(s.x,s.y,j),q.map.texture.name=ot.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const at=q.getViewportCount();for(let j=0;j<at;j++){const tt=q.getViewport(j);l.set(o.x*tt.x,o.y*tt.y,o.x*tt.z,o.y*tt.w),U.viewport(l),q.updateMatrices(ot,j),n=q.getFrustum(),P(k,H,q.camera,ot,this.type)}q.isPointLightShadow!==!0&&this.type===vi&&S(q,H),q.needsUpdate=!1}v=this.type,g.needsUpdate=!1,i.setRenderTarget(I,R,W)};function S(O,k){const H=t.update(y);_.defines.VSM_SAMPLES!==O.blurSamples&&(_.defines.VSM_SAMPLES=O.blurSamples,m.defines.VSM_SAMPLES=O.blurSamples,_.needsUpdate=!0,m.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new lr(s.x,s.y)),_.uniforms.shadow_pass.value=O.map.texture,_.uniforms.resolution.value=O.mapSize,_.uniforms.radius.value=O.radius,i.setRenderTarget(O.mapPass),i.clear(),i.renderBufferDirect(k,null,H,_,y,null),m.uniforms.shadow_pass.value=O.mapPass.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,i.setRenderTarget(O.map),i.clear(),i.renderBufferDirect(k,null,H,m,y,null)}function w(O,k,H,I){let R=null;const W=H.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(W!==void 0)R=W;else if(R=H.isPointLight===!0?u:c,i.localClippingEnabled&&k.clipShadows===!0&&Array.isArray(k.clippingPlanes)&&k.clippingPlanes.length!==0||k.displacementMap&&k.displacementScale!==0||k.alphaMap&&k.alphaTest>0||k.map&&k.alphaTest>0){const U=R.uuid,F=k.uuid;let A=h[U];A===void 0&&(A={},h[U]=A);let Z=A[F];Z===void 0&&(Z=R.clone(),A[F]=Z,k.addEventListener("dispose",N)),R=Z}if(R.visible=k.visible,R.wireframe=k.wireframe,I===vi?R.side=k.shadowSide!==null?k.shadowSide:k.side:R.side=k.shadowSide!==null?k.shadowSide:p[k.side],R.alphaMap=k.alphaMap,R.alphaTest=k.alphaTest,R.map=k.map,R.clipShadows=k.clipShadows,R.clippingPlanes=k.clippingPlanes,R.clipIntersection=k.clipIntersection,R.displacementMap=k.displacementMap,R.displacementScale=k.displacementScale,R.displacementBias=k.displacementBias,R.wireframeLinewidth=k.wireframeLinewidth,R.linewidth=k.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const U=i.properties.get(R);U.light=H}return R}function P(O,k,H,I,R){if(O.visible===!1)return;if(O.layers.test(k.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===vi)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,O.matrixWorld);const F=t.update(O),A=O.material;if(Array.isArray(A)){const Z=F.groups;for(let nt=0,ot=Z.length;nt<ot;nt++){const q=Z[nt],rt=A[q.materialIndex];if(rt&&rt.visible){const at=w(O,rt,I,R);O.onBeforeShadow(i,O,k,H,F,at,q),i.renderBufferDirect(H,null,F,at,O,q),O.onAfterShadow(i,O,k,H,F,at,q)}}}else if(A.visible){const Z=w(O,A,I,R);O.onBeforeShadow(i,O,k,H,F,Z,null),i.renderBufferDirect(H,null,F,Z,O,null),O.onAfterShadow(i,O,k,H,F,Z,null)}}const U=O.children;for(let F=0,A=U.length;F<A;F++)P(U[F],k,H,I,R)}function N(O){O.target.removeEventListener("dispose",N);for(const H in h){const I=h[H],R=O.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function Rx(i){function t(){let D=!1;const ht=new $e;let Mt=null;const Rt=new $e(0,0,0,0);return{setMask:function(Nt){Mt!==Nt&&!D&&(i.colorMask(Nt,Nt,Nt,Nt),Mt=Nt)},setLocked:function(Nt){D=Nt},setClear:function(Nt,re,ue,ve,ke){ke===!0&&(Nt*=ve,re*=ve,ue*=ve),ht.set(Nt,re,ue,ve),Rt.equals(ht)===!1&&(i.clearColor(Nt,re,ue,ve),Rt.copy(ht))},reset:function(){D=!1,Mt=null,Rt.set(-1,0,0,0)}}}function e(){let D=!1,ht=null,Mt=null,Rt=null;return{setTest:function(Nt){Nt?wt(i.DEPTH_TEST):St(i.DEPTH_TEST)},setMask:function(Nt){ht!==Nt&&!D&&(i.depthMask(Nt),ht=Nt)},setFunc:function(Nt){if(Mt!==Nt){switch(Nt){case $m:i.depthFunc(i.NEVER);break;case Km:i.depthFunc(i.ALWAYS);break;case Jm:i.depthFunc(i.LESS);break;case da:i.depthFunc(i.LEQUAL);break;case Qm:i.depthFunc(i.EQUAL);break;case tg:i.depthFunc(i.GEQUAL);break;case eg:i.depthFunc(i.GREATER);break;case ng:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=Nt}},setLocked:function(Nt){D=Nt},setClear:function(Nt){Rt!==Nt&&(i.clearDepth(Nt),Rt=Nt)},reset:function(){D=!1,ht=null,Mt=null,Rt=null}}}function n(){let D=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,ve=null,ke=null;return{setTest:function(me){D||(me?wt(i.STENCIL_TEST):St(i.STENCIL_TEST))},setMask:function(me){ht!==me&&!D&&(i.stencilMask(me),ht=me)},setFunc:function(me,Pe,Ee){(Mt!==me||Rt!==Pe||Nt!==Ee)&&(i.stencilFunc(me,Pe,Ee),Mt=me,Rt=Pe,Nt=Ee)},setOp:function(me,Pe,Ee){(re!==me||ue!==Pe||ve!==Ee)&&(i.stencilOp(me,Pe,Ee),re=me,ue=Pe,ve=Ee)},setLocked:function(me){D=me},setClear:function(me){ke!==me&&(i.clearStencil(me),ke=me)},reset:function(){D=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,ve=null,ke=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,u=new WeakMap;let h={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,w=null,P=null,N=null,O=new Qt(0,0,0),k=0,H=!1,I=null,R=null,W=null,U=null,F=null;const A=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,nt=0;const ot=i.getParameter(i.VERSION);ot.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(ot)[1]),Z=nt>=1):ot.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),Z=nt>=2);let q=null,rt={};const at=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),tt=new $e().fromArray(at),Ct=new $e().fromArray(j);function Q(D,ht,Mt,Rt){const Nt=new Uint8Array(4),re=i.createTexture();i.bindTexture(D,re),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ue=0;ue<Mt;ue++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ht,0,i.RGBA,1,1,Rt,0,i.RGBA,i.UNSIGNED_BYTE,Nt):i.texImage2D(ht+ue,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Nt);return re}const it={};it[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),it[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),it[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),wt(i.DEPTH_TEST),o.setFunc(da),et(!1),$(Vu),wt(i.CULL_FACE),bt(Oi);function wt(D){h[D]!==!0&&(i.enable(D),h[D]=!0)}function St(D){h[D]!==!1&&(i.disable(D),h[D]=!1)}function Pt(D,ht){return f[D]!==ht?(i.bindFramebuffer(D,ht),f[D]=ht,D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ht),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ht),!0):!1}function It(D,ht){let Mt=_,Rt=!1;if(D){Mt=p.get(ht),Mt===void 0&&(Mt=[],p.set(ht,Mt));const Nt=D.textures;if(Mt.length!==Nt.length||Mt[0]!==i.COLOR_ATTACHMENT0){for(let re=0,ue=Nt.length;re<ue;re++)Mt[re]=i.COLOR_ATTACHMENT0+re;Mt.length=Nt.length,Rt=!0}}else Mt[0]!==i.BACK&&(Mt[0]=i.BACK,Rt=!0);Rt&&i.drawBuffers(Mt)}function Ut(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const st={[er]:i.FUNC_ADD,[Dm]:i.FUNC_SUBTRACT,[Nm]:i.FUNC_REVERSE_SUBTRACT};st[Om]=i.MIN,st[km]=i.MAX;const xt={[Um]:i.ZERO,[zm]:i.ONE,[Bm]:i.SRC_COLOR,[nc]:i.SRC_ALPHA,[Zm]:i.SRC_ALPHA_SATURATE,[Gm]:i.DST_COLOR,[Hm]:i.DST_ALPHA,[Fm]:i.ONE_MINUS_SRC_COLOR,[ic]:i.ONE_MINUS_SRC_ALPHA,[Wm]:i.ONE_MINUS_DST_COLOR,[Vm]:i.ONE_MINUS_DST_ALPHA,[Xm]:i.CONSTANT_COLOR,[qm]:i.ONE_MINUS_CONSTANT_COLOR,[jm]:i.CONSTANT_ALPHA,[Ym]:i.ONE_MINUS_CONSTANT_ALPHA};function bt(D,ht,Mt,Rt,Nt,re,ue,ve,ke,me){if(D===Oi){x===!0&&(St(i.BLEND),x=!1);return}if(x===!1&&(wt(i.BLEND),x=!0),D!==Im){if(D!==y||me!==H){if((g!==er||w!==er)&&(i.blendEquation(i.FUNC_ADD),g=er,w=er),me)switch(D){case ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gu:i.blendFunc(i.ONE,i.ONE);break;case Wu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zu:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gu:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zu:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,S=null,P=null,N=null,O.set(0,0,0),k=0,y=D,H=me}return}Nt=Nt||ht,re=re||Mt,ue=ue||Rt,(ht!==g||Nt!==w)&&(i.blendEquationSeparate(st[ht],st[Nt]),g=ht,w=Nt),(Mt!==v||Rt!==S||re!==P||ue!==N)&&(i.blendFuncSeparate(xt[Mt],xt[Rt],xt[re],xt[ue]),v=Mt,S=Rt,P=re,N=ue),(ve.equals(O)===!1||ke!==k)&&(i.blendColor(ve.r,ve.g,ve.b,ke),O.copy(ve),k=ke),y=D,H=!1}function E(D,ht){D.side===fn?St(i.CULL_FACE):wt(i.CULL_FACE);let Mt=D.side===bn;ht&&(Mt=!Mt),et(Mt),D.blending===ns&&D.transparent===!1?bt(Oi):bt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Rt=D.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),M(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?wt(i.SAMPLE_ALPHA_TO_COVERAGE):St(i.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){I!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),I=D)}function $(D){D!==Cm?(wt(i.CULL_FACE),D!==R&&(D===Vu?i.cullFace(i.BACK):D===Pm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):St(i.CULL_FACE),R=D}function C(D){D!==W&&(Z&&i.lineWidth(D),W=D)}function M(D,ht,Mt){D?(wt(i.POLYGON_OFFSET_FILL),(U!==ht||F!==Mt)&&(i.polygonOffset(ht,Mt),U=ht,F=Mt)):St(i.POLYGON_OFFSET_FILL)}function B(D){D?wt(i.SCISSOR_TEST):St(i.SCISSOR_TEST)}function X(D){D===void 0&&(D=i.TEXTURE0+A-1),q!==D&&(i.activeTexture(D),q=D)}function K(D,ht,Mt){Mt===void 0&&(q===null?Mt=i.TEXTURE0+A-1:Mt=q);let Rt=rt[Mt];Rt===void 0&&(Rt={type:void 0,texture:void 0},rt[Mt]=Rt),(Rt.type!==D||Rt.texture!==ht)&&(q!==Mt&&(i.activeTexture(Mt),q=Mt),i.bindTexture(D,ht||it[D]),Rt.type=D,Rt.texture=ht)}function G(){const D=rt[q];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ft(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Kt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Vt(D){tt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function oe(D){Ct.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ct.copy(D))}function ae(D,ht){let Mt=u.get(ht);Mt===void 0&&(Mt=new WeakMap,u.set(ht,Mt));let Rt=Mt.get(D);Rt===void 0&&(Rt=i.getUniformBlockIndex(ht,D.name),Mt.set(D,Rt))}function te(D,ht){const Rt=u.get(ht).get(D);c.get(ht)!==Rt&&(i.uniformBlockBinding(ht,Rt,D.__bindingPointIndex),c.set(ht,Rt))}function Ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},q=null,rt={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,w=null,P=null,N=null,O=new Qt(0,0,0),k=0,H=!1,I=null,R=null,W=null,U=null,F=null,tt.set(0,0,i.canvas.width,i.canvas.height),Ct.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:wt,disable:St,bindFramebuffer:Pt,drawBuffers:It,useProgram:Ut,setBlending:bt,setMaterial:E,setFlipSided:et,setCullFace:$,setLineWidth:C,setPolygonOffset:M,setScissorTest:B,activeTexture:X,bindTexture:K,unbindTexture:G,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Kt,updateUBOMapping:ae,uniformBlockBinding:te,texStorage2D:Ht,texStorage3D:zt,texSubImage2D:pt,texSubImage3D:Tt,compressedTexSubImage2D:Et,compressedTexSubImage3D:At,scissor:Vt,viewport:oe,reset:Ft}}function Ix(i,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new vt,f=new WeakMap;let p;const _=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,M){return m?new OffscreenCanvas(C,M):va("canvas")}function y(C,M,B){let X=1;const K=$(C);if((K.width>B||K.height>B)&&(X=B/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const G=Math.floor(X*K.width),ft=Math.floor(X*K.height);p===void 0&&(p=x(G,ft));const lt=M?x(G,ft):p;return lt.width=G,lt.height=ft,lt.getContext("2d").drawImage(C,0,0,G,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+ft+")."),lt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function g(C){return C.generateMipmaps&&C.minFilter!==Nn&&C.minFilter!==Gn}function v(C){i.generateMipmap(C)}function S(C,M,B,X,K=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let G=M;if(M===i.RED&&(B===i.FLOAT&&(G=i.R32F),B===i.HALF_FLOAT&&(G=i.R16F),B===i.UNSIGNED_BYTE&&(G=i.R8)),M===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(G=i.R8UI),B===i.UNSIGNED_SHORT&&(G=i.R16UI),B===i.UNSIGNED_INT&&(G=i.R32UI),B===i.BYTE&&(G=i.R8I),B===i.SHORT&&(G=i.R16I),B===i.INT&&(G=i.R32I)),M===i.RG&&(B===i.FLOAT&&(G=i.RG32F),B===i.HALF_FLOAT&&(G=i.RG16F),B===i.UNSIGNED_BYTE&&(G=i.RG8)),M===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(G=i.RG8UI),B===i.UNSIGNED_SHORT&&(G=i.RG16UI),B===i.UNSIGNED_INT&&(G=i.RG32UI),B===i.BYTE&&(G=i.RG8I),B===i.SHORT&&(G=i.RG16I),B===i.INT&&(G=i.RG32I)),M===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),M===i.RGBA){const ft=K?pa:ge.getTransfer(X);B===i.FLOAT&&(G=i.RGBA32F),B===i.HALF_FLOAT&&(G=i.RGBA16F),B===i.UNSIGNED_BYTE&&(G=ft===we?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function w(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Nn&&C.minFilter!==Gn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function P(C){const M=C.target;M.removeEventListener("dispose",P),O(M),M.isVideoTexture&&f.delete(M)}function N(C){const M=C.target;M.removeEventListener("dispose",N),H(M)}function O(C){const M=n.get(C);if(M.__webglInit===void 0)return;const B=C.source,X=_.get(B);if(X){const K=X[M.__cacheKey];K.usedTimes--,K.usedTimes===0&&k(C),Object.keys(X).length===0&&_.delete(B)}n.remove(C)}function k(C){const M=n.get(C);i.deleteTexture(M.__webglTexture);const B=C.source,X=_.get(B);delete X[M.__cacheKey],l.memory.textures--}function H(C){const M=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(M.__webglFramebuffer[X]))for(let K=0;K<M.__webglFramebuffer[X].length;K++)i.deleteFramebuffer(M.__webglFramebuffer[X][K]);else i.deleteFramebuffer(M.__webglFramebuffer[X]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[X])}else{if(Array.isArray(M.__webglFramebuffer))for(let X=0;X<M.__webglFramebuffer.length;X++)i.deleteFramebuffer(M.__webglFramebuffer[X]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let X=0;X<M.__webglColorRenderbuffer.length;X++)M.__webglColorRenderbuffer[X]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[X]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=C.textures;for(let X=0,K=B.length;X<K;X++){const G=n.get(B[X]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),l.memory.textures--),n.remove(B[X])}n.remove(C)}let I=0;function R(){I=0}function W(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function U(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function F(C,M){const B=n.get(C);if(C.isVideoTexture&&E(C),C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){const X=C.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(B,C,M);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+M)}function A(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,M);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+M)}function Z(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,M);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+M)}function nt(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Ct(B,C,M);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+M)}const ot={[oc]:i.REPEAT,[sr]:i.CLAMP_TO_EDGE,[ac]:i.MIRRORED_REPEAT},q={[Nn]:i.NEAREST,[hg]:i.NEAREST_MIPMAP_NEAREST,[Po]:i.NEAREST_MIPMAP_LINEAR,[Gn]:i.LINEAR,[cl]:i.LINEAR_MIPMAP_NEAREST,[or]:i.LINEAR_MIPMAP_LINEAR},rt={[Eg]:i.NEVER,[Rg]:i.ALWAYS,[Tg]:i.LESS,[rf]:i.LEQUAL,[Ag]:i.EQUAL,[Pg]:i.GEQUAL,[Lg]:i.GREATER,[Cg]:i.NOTEQUAL};function at(C,M){if(M.type===Ni&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Gn||M.magFilter===cl||M.magFilter===Po||M.magFilter===or||M.minFilter===Gn||M.minFilter===cl||M.minFilter===Po||M.minFilter===or)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,ot[M.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,ot[M.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,ot[M.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,q[M.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,q[M.minFilter]),M.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Nn||M.minFilter!==Po&&M.minFilter!==or||M.type===Ni&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function j(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",P));const X=M.source;let K=_.get(X);K===void 0&&(K={},_.set(X,K));const G=U(M);if(G!==C.__cacheKey){K[G]===void 0&&(K[G]={texture:i.createTexture(),usedTimes:0},l.memory.textures++,B=!0),K[G].usedTimes++;const ft=K[C.__cacheKey];ft!==void 0&&(K[C.__cacheKey].usedTimes--,ft.usedTimes===0&&k(M)),C.__cacheKey=G,C.__webglTexture=K[G].texture}return B}function tt(C,M,B){let X=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(X=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(X=i.TEXTURE_3D);const K=j(C,M),G=M.source;e.bindTexture(X,C.__webglTexture,i.TEXTURE0+B);const ft=n.get(G);if(G.version!==ft.__version||K===!0){e.activeTexture(i.TEXTURE0+B);const lt=ge.getPrimaries(ge.workingColorSpace),pt=M.colorSpace===Di?null:ge.getPrimaries(M.colorSpace),Tt=M.colorSpace===Di||lt===pt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=y(M.image,!1,s.maxTextureSize);Et=et(M,Et);const At=o.convert(M.format,M.colorSpace),Ht=o.convert(M.type);let zt=S(M.internalFormat,At,Ht,M.colorSpace,M.isVideoTexture);at(X,M);let Dt;const Kt=M.mipmaps,Vt=M.isVideoTexture!==!0&&zt!==nf,oe=ft.__version===void 0||K===!0,ae=G.dataReady,te=w(M,Et);if(M.isDepthTexture)zt=i.DEPTH_COMPONENT16,M.type===Ni?zt=i.DEPTH_COMPONENT32F:M.type===us?zt=i.DEPTH_COMPONENT24:M.type===no&&(zt=i.DEPTH24_STENCIL8),oe&&(Vt?e.texStorage2D(i.TEXTURE_2D,1,zt,Et.width,Et.height):e.texImage2D(i.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,null));else if(M.isDataTexture)if(Kt.length>0){Vt&&oe&&e.texStorage2D(i.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(i.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(i.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data);M.generateMipmaps=!1}else Vt?(oe&&e.texStorage2D(i.TEXTURE_2D,te,zt,Et.width,Et.height),ae&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Et.width,Et.height,At,Ht,Et.data)):e.texImage2D(i.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,Et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Vt&&oe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,zt,Kt[0].width,Kt[0].height,Et.depth);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],M.format!==ri?At!==null?Vt?ae&&e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Dt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Ht,Dt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,At,Ht,Dt.data)}else{Vt&&oe&&e.texStorage2D(i.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],M.format!==ri?At!==null?Vt?ae&&e.compressedTexSubImage2D(i.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Dt.data):e.compressedTexImage2D(i.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage2D(i.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(i.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(M.isDataArrayTexture)Vt?(oe&&e.texStorage3D(i.TEXTURE_2D_ARRAY,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(M.isData3DTexture)Vt?(oe&&e.texStorage3D(i.TEXTURE_3D,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(i.TEXTURE_3D,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(M.isFramebufferTexture){if(oe)if(Vt)e.texStorage2D(i.TEXTURE_2D,te,zt,Et.width,Et.height);else{let Ft=Et.width,D=Et.height;for(let ht=0;ht<te;ht++)e.texImage2D(i.TEXTURE_2D,ht,zt,Ft,D,0,At,Ht,null),Ft>>=1,D>>=1}}else if(Kt.length>0){if(Vt&&oe){const Ft=$(Kt[0]);e.texStorage2D(i.TEXTURE_2D,te,zt,Ft.width,Ft.height)}for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(i.TEXTURE_2D,Ft,0,0,At,Ht,Dt):e.texImage2D(i.TEXTURE_2D,Ft,zt,At,Ht,Dt);M.generateMipmaps=!1}else if(Vt){if(oe){const Ft=$(Et);e.texStorage2D(i.TEXTURE_2D,te,zt,Ft.width,Ft.height)}ae&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,Ht,Et)}else e.texImage2D(i.TEXTURE_2D,0,zt,At,Ht,Et);g(M)&&v(X),ft.__version=G.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Ct(C,M,B){if(M.image.length!==6)return;const X=j(C,M),K=M.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+B);const G=n.get(K);if(K.version!==G.__version||X===!0){e.activeTexture(i.TEXTURE0+B);const ft=ge.getPrimaries(ge.workingColorSpace),lt=M.colorSpace===Di?null:ge.getPrimaries(M.colorSpace),pt=M.colorSpace===Di||ft===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Tt=M.isCompressedTexture||M.image[0].isCompressedTexture,Et=M.image[0]&&M.image[0].isDataTexture,At=[];for(let D=0;D<6;D++)!Tt&&!Et?At[D]=y(M.image[D],!0,s.maxCubemapSize):At[D]=Et?M.image[D].image:M.image[D],At[D]=et(M,At[D]);const Ht=At[0],zt=o.convert(M.format,M.colorSpace),Dt=o.convert(M.type),Kt=S(M.internalFormat,zt,Dt,M.colorSpace),Vt=M.isVideoTexture!==!0,oe=G.__version===void 0||X===!0,ae=K.dataReady;let te=w(M,Ht);at(i.TEXTURE_CUBE_MAP,M);let Ft;if(Tt){Vt&&oe&&e.texStorage2D(i.TEXTURE_CUBE_MAP,te,Kt,Ht.width,Ht.height);for(let D=0;D<6;D++){Ft=At[D].mipmaps;for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];M.format!==ri?zt!==null?Vt?ae&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,0,0,Mt.width,Mt.height,zt,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,Kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?ae&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,0,0,Mt.width,Mt.height,zt,Dt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,Kt,Mt.width,Mt.height,0,zt,Dt,Mt.data)}}}else{if(Ft=M.mipmaps,Vt&&oe){Ft.length>0&&te++;const D=$(At[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,te,Kt,D.width,D.height)}for(let D=0;D<6;D++)if(Et){Vt?ae&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,At[D].width,At[D].height,zt,Dt,At[D].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,At[D].width,At[D].height,0,zt,Dt,At[D].data);for(let ht=0;ht<Ft.length;ht++){const Rt=Ft[ht].image[D].image;Vt?ae&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,0,0,Rt.width,Rt.height,zt,Dt,Rt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,Kt,Rt.width,Rt.height,0,zt,Dt,Rt.data)}}else{Vt?ae&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,zt,Dt,At[D]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,zt,Dt,At[D]);for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];Vt?ae&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,0,0,zt,Dt,Mt.image[D]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,Kt,zt,Dt,Mt.image[D])}}}g(M)&&v(i.TEXTURE_CUBE_MAP),G.__version=K.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Q(C,M,B,X,K,G){const ft=o.convert(B.format,B.colorSpace),lt=o.convert(B.type),pt=S(B.internalFormat,ft,lt,B.colorSpace);if(!n.get(M).__hasExternalTextures){const Et=Math.max(1,M.width>>G),At=Math.max(1,M.height>>G);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,G,pt,Et,At,M.depth,0,ft,lt,null):e.texImage2D(K,G,pt,Et,At,0,ft,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),bt(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,X,K,n.get(B).__webglTexture,0,xt(M)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,X,K,n.get(B).__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(C,M,B){if(i.bindRenderbuffer(i.RENDERBUFFER,C),M.depthBuffer&&!M.stencilBuffer){let X=i.DEPTH_COMPONENT24;if(B||bt(M)){const K=M.depthTexture;K&&K.isDepthTexture&&(K.type===Ni?X=i.DEPTH_COMPONENT32F:K.type===us&&(X=i.DEPTH_COMPONENT24));const G=xt(M);bt(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,G,X,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,G,X,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,X,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,C)}else if(M.depthBuffer&&M.stencilBuffer){const X=xt(M);B&&bt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,X,i.DEPTH24_STENCIL8,M.width,M.height):bt(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,X,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,C)}else{const X=M.textures;for(let K=0;K<X.length;K++){const G=X[K],ft=o.convert(G.format,G.colorSpace),lt=o.convert(G.type),pt=S(G.internalFormat,ft,lt,G.colorSpace),Tt=xt(M);B&&bt(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Tt,pt,M.width,M.height):bt(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Tt,pt,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,pt,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function wt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),F(M.depthTexture,0);const X=n.get(M.depthTexture).__webglTexture,K=xt(M);if(M.depthTexture.format===is)bt(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,X,0);else if(M.depthTexture.format===Ys)bt(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0,K):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function St(C){const M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");wt(M.__webglFramebuffer,C)}else if(B){M.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[X]),M.__webglDepthbuffer[X]=i.createRenderbuffer(),it(M.__webglDepthbuffer[X],C,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),it(M.__webglDepthbuffer,C,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Pt(C,M,B){const X=n.get(C);M!==void 0&&Q(X.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&St(C)}function It(C){const M=C.texture,B=n.get(C),X=n.get(M);C.addEventListener("dispose",N);const K=C.textures,G=C.isWebGLCubeRenderTarget===!0,ft=K.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=i.createTexture()),X.__version=M.version,l.memory.textures++),G){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let pt=0;pt<M.mipmaps.length;pt++)B.__webglFramebuffer[lt][pt]=i.createFramebuffer()}else B.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)B.__webglFramebuffer[lt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(ft)for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=n.get(K[lt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=i.createTexture(),l.memory.textures++)}if(C.samples>0&&bt(C)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const pt=K[lt];B.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Tt=o.convert(pt.format,pt.colorSpace),Et=o.convert(pt.type),At=S(pt.internalFormat,Tt,Et,pt.colorSpace,C.isXRRenderTarget===!0),Ht=xt(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ht,At,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),it(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,X.__webglTexture),at(i.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)Q(B.__webglFramebuffer[lt][pt],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else Q(B.__webglFramebuffer[lt],C,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(M)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=K[lt],Et=n.get(Tt);e.bindTexture(i.TEXTURE_2D,Et.__webglTexture),at(i.TEXTURE_2D,Tt),Q(B.__webglFramebuffer,C,Tt,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),g(Tt)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(lt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),at(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)Q(B.__webglFramebuffer[pt],C,M,i.COLOR_ATTACHMENT0,lt,pt);else Q(B.__webglFramebuffer,C,M,i.COLOR_ATTACHMENT0,lt,0);g(M)&&v(lt),e.unbindTexture()}C.depthBuffer&&St(C)}function Ut(C){const M=C.textures;for(let B=0,X=M.length;B<X;B++){const K=M[B];if(g(K)){const G=C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ft=n.get(K).__webglTexture;e.bindTexture(G,ft),v(G),e.unbindTexture()}}}function st(C){if(C.samples>0&&bt(C)===!1){const M=C.textures,B=C.width,X=C.height;let K=i.COLOR_BUFFER_BIT;const G=[],ft=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=n.get(C),pt=M.length>1;if(pt)for(let Tt=0;Tt<M.length;Tt++)e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Tt=0;Tt<M.length;Tt++){G.push(i.COLOR_ATTACHMENT0+Tt),C.depthBuffer&&G.push(ft);const Et=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Et===!1&&(C.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&(K|=i.STENCIL_BUFFER_BIT)),pt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]),Et===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[ft]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[ft])),pt){const At=n.get(M[Tt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,At,0)}i.blitFramebuffer(0,0,B,X,0,0,B,X,K,i.NEAREST),u&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,G)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<M.length;Tt++){e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]);const Et=n.get(M[Tt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,lt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,Et,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function xt(C){return Math.min(s.maxSamples,C.samples)}function bt(C){const M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function E(C){const M=l.render.frame;f.get(C)!==M&&(f.set(C,M),C.update())}function et(C,M){const B=C.colorSpace,X=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==Fi&&B!==Di&&(ge.getTransfer(B)===we?(X!==ri||K!==Ui)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function $(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(h.width=C.naturalWidth||C.width,h.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(h.width=C.displayWidth,h.height=C.displayHeight):(h.width=C.width,h.height=C.height),h}this.allocateTextureUnit=W,this.resetTextureUnits=R,this.setTexture2D=F,this.setTexture2DArray=A,this.setTexture3D=Z,this.setTextureCube=nt,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=bt}function Dx(i,t){function e(n,s=Di){let o;const l=ge.getTransfer(s);if(n===Ui)return i.UNSIGNED_BYTE;if(n===Kd)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Jd)return i.UNSIGNED_SHORT_5_5_5_1;if(n===pg)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dg)return i.BYTE;if(n===fg)return i.SHORT;if(n===Yd)return i.UNSIGNED_SHORT;if(n===$d)return i.INT;if(n===us)return i.UNSIGNED_INT;if(n===Ni)return i.FLOAT;if(n===fa)return i.HALF_FLOAT;if(n===mg)return i.ALPHA;if(n===gg)return i.RGB;if(n===ri)return i.RGBA;if(n===_g)return i.LUMINANCE;if(n===vg)return i.LUMINANCE_ALPHA;if(n===is)return i.DEPTH_COMPONENT;if(n===Ys)return i.DEPTH_STENCIL;if(n===yg)return i.RED;if(n===Qd)return i.RED_INTEGER;if(n===xg)return i.RG;if(n===tf)return i.RG_INTEGER;if(n===ef)return i.RGBA_INTEGER;if(n===ul||n===hl||n===dl||n===fl)if(l===we)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===ul)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===hl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===dl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===ul)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===hl)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===dl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fl)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Xu||n===qu||n===ju||n===Yu)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Xu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===qu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ju)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===nf)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===$u||n===Ku)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===$u)return l===we?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Ku)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ju||n===Qu||n===th||n===eh||n===nh||n===ih||n===rh||n===sh||n===oh||n===ah||n===lh||n===ch||n===uh||n===hh)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Ju)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Qu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===th)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===eh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===nh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ih)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===rh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===oh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ah)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===lh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ch)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===uh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===hh)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pl||n===dh||n===fh)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===pl)return l===we?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bg||n===ph||n===mh||n===gh)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===pl)return o.COMPRESSED_RED_RGTC1_EXT;if(n===ph)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===mh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===gh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===no?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Nx extends En{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Jr extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ox={type:"move"};class Fl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,u=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){l=!0;for(const y of t.hand.values()){const g=e.getJointPose(y,n),v=this._getHandJoint(h,y);g!==null&&(v.matrix.fromArray(g.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=g.radius),v.visible=g!==null}const f=h.joints["index-finger-tip"],p=h.joints["thumb-tip"],_=f.position.distanceTo(p.position),m=.02,x=.005;h.inputState.pinching&&_>m+x?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&_<=m-x&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Ox)))}return c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),h!==null&&(h.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Jr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const kx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ux=`
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

}`;class zx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new pn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new Bi({vertexShader:kx,fragmentShader:Ux,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ne(new ro(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Bx extends dr{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",u=1,h=null,f=null,p=null,_=null,m=null,x=null;const y=new zx,g=e.getContextAttributes();let v=null,S=null;const w=[],P=[],N=new vt;let O=null;const k=new En;k.layers.enable(1),k.viewport=new $e;const H=new En;H.layers.enable(2),H.viewport=new $e;const I=[k,H],R=new Nx;R.layers.enable(1),R.layers.enable(2);let W=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let it=w[Q];return it===void 0&&(it=new Fl,w[Q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Q){let it=w[Q];return it===void 0&&(it=new Fl,w[Q]=it),it.getGripSpace()},this.getHand=function(Q){let it=w[Q];return it===void 0&&(it=new Fl,w[Q]=it),it.getHandSpace()};function F(Q){const it=P.indexOf(Q.inputSource);if(it===-1)return;const wt=w[it];wt!==void 0&&(wt.update(Q.inputSource,Q.frame,h||l),wt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function A(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",A),s.removeEventListener("inputsourceschange",Z);for(let Q=0;Q<w.length;Q++){const it=P[Q];it!==null&&(P[Q]=null,w[Q].disconnect(it))}W=null,U=null,y.reset(),t.setRenderTarget(v),m=null,_=null,p=null,s=null,S=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(O),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||l},this.setReferenceSpace=function(Q){h=Q},this.getBaseLayer=function(){return _!==null?_:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",A),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const it={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new lr(m.framebufferWidth,m.framebufferHeight,{format:ri,type:Ui,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let it=null,wt=null,St=null;g.depth&&(St=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=g.stencil?Ys:is,wt=g.stencil?no:us);const Pt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:o};p=new XRWebGLBinding(s,e),_=p.createProjectionLayer(Pt),s.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),S=new lr(_.textureWidth,_.textureHeight,{format:ri,type:Ui,depthTexture:new _f(_.textureWidth,_.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const It=t.properties.get(S);It.__ignoreDepthValues=_.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(u),h=null,l=await s.requestReferenceSpace(c),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(Q){for(let it=0;it<Q.removed.length;it++){const wt=Q.removed[it],St=P.indexOf(wt);St>=0&&(P[St]=null,w[St].disconnect(wt))}for(let it=0;it<Q.added.length;it++){const wt=Q.added[it];let St=P.indexOf(wt);if(St===-1){for(let It=0;It<w.length;It++)if(It>=P.length){P.push(wt),St=It;break}else if(P[It]===null){P[It]=wt,St=It;break}if(St===-1)break}const Pt=w[St];Pt&&Pt.connect(wt)}}const nt=new J,ot=new J;function q(Q,it,wt){nt.setFromMatrixPosition(it.matrixWorld),ot.setFromMatrixPosition(wt.matrixWorld);const St=nt.distanceTo(ot),Pt=it.projectionMatrix.elements,It=wt.projectionMatrix.elements,Ut=Pt[14]/(Pt[10]-1),st=Pt[14]/(Pt[10]+1),xt=(Pt[9]+1)/Pt[5],bt=(Pt[9]-1)/Pt[5],E=(Pt[8]-1)/Pt[0],et=(It[8]+1)/It[0],$=Ut*E,C=Ut*et,M=St/(-E+et),B=M*-E;it.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(B),Q.translateZ(M),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const X=Ut+M,K=st+M,G=$-B,ft=C+(St-B),lt=xt*st/K*X,pt=bt*st/K*X;Q.projectionMatrix.makePerspective(G,ft,lt,pt,X,K),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function rt(Q,it){it===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(it.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;y.texture!==null&&(Q.near=y.depthNear,Q.far=y.depthFar),R.near=H.near=k.near=Q.near,R.far=H.far=k.far=Q.far,(W!==R.near||U!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),W=R.near,U=R.far,k.near=W,k.far=U,H.near=W,H.far=U,k.updateProjectionMatrix(),H.updateProjectionMatrix(),Q.updateProjectionMatrix());const it=Q.parent,wt=R.cameras;rt(R,it);for(let St=0;St<wt.length;St++)rt(wt[St],it);wt.length===2?q(R,k,H):R.projectionMatrix.copy(k.projectionMatrix),at(Q,R,it)};function at(Q,it,wt){wt===null?Q.matrix.copy(it.matrixWorld):(Q.matrix.copy(wt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(it.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(it.projectionMatrix),Q.projectionMatrixInverse.copy(it.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=lc*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(_===null&&m===null))return u},this.setFoveation=function(Q){u=Q,_!==null&&(_.fixedFoveation=Q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Q)},this.hasDepthSensing=function(){return y.texture!==null};let j=null;function tt(Q,it){if(f=it.getViewerPose(h||l),x=it,f!==null){const wt=f.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let St=!1;wt.length!==R.cameras.length&&(R.cameras.length=0,St=!0);for(let It=0;It<wt.length;It++){const Ut=wt[It];let st=null;if(m!==null)st=m.getViewport(Ut);else{const bt=p.getViewSubImage(_,Ut);st=bt.viewport,It===0&&(t.setRenderTargetTextures(S,bt.colorTexture,_.ignoreDepthValues?void 0:bt.depthStencilTexture),t.setRenderTarget(S))}let xt=I[It];xt===void 0&&(xt=new En,xt.layers.enable(It),xt.viewport=new $e,I[It]=xt),xt.matrix.fromArray(Ut.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(Ut.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(st.x,st.y,st.width,st.height),It===0&&(R.matrix.copy(xt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),St===!0&&R.cameras.push(xt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=p.getDepthInformation(wt[0]);It&&It.isValid&&It.texture&&y.init(t,It,s.renderState)}}for(let wt=0;wt<w.length;wt++){const St=P[wt],Pt=w[wt];St!==null&&Pt!==void 0&&Pt.update(St,it,h||l)}y.render(t,R),j&&j(Q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),x=null}const Ct=new mf;Ct.setAnimationLoop(tt),this.setAnimationLoop=function(Q){j=Q},this.dispose=function(){}}}const Qi=new Yn,Fx=new Ae;function Hx(i,t){function e(g,v){g.matrixAutoUpdate===!0&&g.updateMatrix(),v.value.copy(g.matrix)}function n(g,v){v.color.getRGB(g.fogColor.value,df(i)),v.isFog?(g.fogNear.value=v.near,g.fogFar.value=v.far):v.isFogExp2&&(g.fogDensity.value=v.density)}function s(g,v,S,w,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?o(g,v):v.isMeshToonMaterial?(o(g,v),p(g,v)):v.isMeshPhongMaterial?(o(g,v),f(g,v)):v.isMeshStandardMaterial?(o(g,v),_(g,v),v.isMeshPhysicalMaterial&&m(g,v,P)):v.isMeshMatcapMaterial?(o(g,v),x(g,v)):v.isMeshDepthMaterial?o(g,v):v.isMeshDistanceMaterial?(o(g,v),y(g,v)):v.isMeshNormalMaterial?o(g,v):v.isLineBasicMaterial?(l(g,v),v.isLineDashedMaterial&&c(g,v)):v.isPointsMaterial?u(g,v,S,w):v.isSpriteMaterial?h(g,v):v.isShadowMaterial?(g.color.value.copy(v.color),g.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function o(g,v){g.opacity.value=v.opacity,v.color&&g.diffuse.value.copy(v.color),v.emissive&&g.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.bumpMap&&(g.bumpMap.value=v.bumpMap,e(v.bumpMap,g.bumpMapTransform),g.bumpScale.value=v.bumpScale,v.side===bn&&(g.bumpScale.value*=-1)),v.normalMap&&(g.normalMap.value=v.normalMap,e(v.normalMap,g.normalMapTransform),g.normalScale.value.copy(v.normalScale),v.side===bn&&g.normalScale.value.negate()),v.displacementMap&&(g.displacementMap.value=v.displacementMap,e(v.displacementMap,g.displacementMapTransform),g.displacementScale.value=v.displacementScale,g.displacementBias.value=v.displacementBias),v.emissiveMap&&(g.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,g.emissiveMapTransform)),v.specularMap&&(g.specularMap.value=v.specularMap,e(v.specularMap,g.specularMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest);const S=t.get(v),w=S.envMap,P=S.envMapRotation;if(w&&(g.envMap.value=w,Qi.copy(P),Qi.x*=-1,Qi.y*=-1,Qi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Qi.y*=-1,Qi.z*=-1),g.envMapRotation.value.setFromMatrix4(Fx.makeRotationFromEuler(Qi)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=v.reflectivity,g.ior.value=v.ior,g.refractionRatio.value=v.refractionRatio),v.lightMap){g.lightMap.value=v.lightMap;const N=i._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=v.lightMapIntensity*N,e(v.lightMap,g.lightMapTransform)}v.aoMap&&(g.aoMap.value=v.aoMap,g.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,g.aoMapTransform))}function l(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform))}function c(g,v){g.dashSize.value=v.dashSize,g.totalSize.value=v.dashSize+v.gapSize,g.scale.value=v.scale}function u(g,v,S,w){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.size.value=v.size*S,g.scale.value=w*.5,v.map&&(g.map.value=v.map,e(v.map,g.uvTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function h(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.rotation.value=v.rotation,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function f(g,v){g.specular.value.copy(v.specular),g.shininess.value=Math.max(v.shininess,1e-4)}function p(g,v){v.gradientMap&&(g.gradientMap.value=v.gradientMap)}function _(g,v){g.metalness.value=v.metalness,v.metalnessMap&&(g.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,g.metalnessMapTransform)),g.roughness.value=v.roughness,v.roughnessMap&&(g.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,g.roughnessMapTransform)),v.envMap&&(g.envMapIntensity.value=v.envMapIntensity)}function m(g,v,S){g.ior.value=v.ior,v.sheen>0&&(g.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),g.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(g.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,g.sheenColorMapTransform)),v.sheenRoughnessMap&&(g.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,g.sheenRoughnessMapTransform))),v.clearcoat>0&&(g.clearcoat.value=v.clearcoat,g.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(g.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,g.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(g.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===bn&&g.clearcoatNormalScale.value.negate())),v.iridescence>0&&(g.iridescence.value=v.iridescence,g.iridescenceIOR.value=v.iridescenceIOR,g.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(g.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,g.iridescenceMapTransform)),v.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),v.transmission>0&&(g.transmission.value=v.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),v.transmissionMap&&(g.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,g.transmissionMapTransform)),g.thickness.value=v.thickness,v.thicknessMap&&(g.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=v.attenuationDistance,g.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(g.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(g.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=v.specularIntensity,g.specularColor.value.copy(v.specularColor),v.specularColorMap&&(g.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,g.specularColorMapTransform)),v.specularIntensityMap&&(g.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,v){v.matcap&&(g.matcap.value=v.matcap)}function y(g,v){const S=t.get(v).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Vx(i,t,e,n){let s={},o={},l=[];const c=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function u(S,w){const P=w.program;n.uniformBlockBinding(S,P)}function h(S,w){let P=s[S.id];P===void 0&&(x(S),P=f(S),s[S.id]=P,S.addEventListener("dispose",g));const N=w.program;n.updateUBOMapping(S,N);const O=t.render.frame;o[S.id]!==O&&(_(S),o[S.id]=O)}function f(S){const w=p();S.__bindingPointIndex=w;const P=i.createBuffer(),N=S.__size,O=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,P),i.bufferData(i.UNIFORM_BUFFER,N,O),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,w,P),P}function p(){for(let S=0;S<c;S++)if(l.indexOf(S)===-1)return l.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(S){const w=s[S.id],P=S.uniforms,N=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,w);for(let O=0,k=P.length;O<k;O++){const H=Array.isArray(P[O])?P[O]:[P[O]];for(let I=0,R=H.length;I<R;I++){const W=H[I];if(m(W,O,I,N)===!0){const U=W.__offset,F=Array.isArray(W.value)?W.value:[W.value];let A=0;for(let Z=0;Z<F.length;Z++){const nt=F[Z],ot=y(nt);typeof nt=="number"||typeof nt=="boolean"?(W.__data[0]=nt,i.bufferSubData(i.UNIFORM_BUFFER,U+A,W.__data)):nt.isMatrix3?(W.__data[0]=nt.elements[0],W.__data[1]=nt.elements[1],W.__data[2]=nt.elements[2],W.__data[3]=0,W.__data[4]=nt.elements[3],W.__data[5]=nt.elements[4],W.__data[6]=nt.elements[5],W.__data[7]=0,W.__data[8]=nt.elements[6],W.__data[9]=nt.elements[7],W.__data[10]=nt.elements[8],W.__data[11]=0):(nt.toArray(W.__data,A),A+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,W.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,w,P,N){const O=S.value,k=w+"_"+P;if(N[k]===void 0)return typeof O=="number"||typeof O=="boolean"?N[k]=O:N[k]=O.clone(),!0;{const H=N[k];if(typeof O=="number"||typeof O=="boolean"){if(H!==O)return N[k]=O,!0}else if(H.equals(O)===!1)return H.copy(O),!0}return!1}function x(S){const w=S.uniforms;let P=0;const N=16;for(let k=0,H=w.length;k<H;k++){const I=Array.isArray(w[k])?w[k]:[w[k]];for(let R=0,W=I.length;R<W;R++){const U=I[R],F=Array.isArray(U.value)?U.value:[U.value];for(let A=0,Z=F.length;A<Z;A++){const nt=F[A],ot=y(nt),q=P%N;q!==0&&N-q<ot.boundary&&(P+=N-q),U.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=P,P+=ot.storage}}}const O=P%N;return O>0&&(P+=N-O),S.__size=P,S.__cache={},this}function y(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function g(S){const w=S.target;w.removeEventListener("dispose",g);const P=l.indexOf(w.__bindingPointIndex);l.splice(P,1),i.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function v(){for(const S in s)i.deleteBuffer(s[S]);l=[],s={},o={}}return{bind:u,update:h,dispose:v}}class Mf{constructor(t={}){const{canvas:e=Ng(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:h=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=l;const m=new Uint32Array(4),x=new Int32Array(4);let y=null,g=null;const v=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ei,this._useLegacyLights=!1,this.toneMapping=ki,this.toneMappingExposure=1;const w=this;let P=!1,N=0,O=0,k=null,H=-1,I=null;const R=new $e,W=new $e;let U=null;const F=new Qt(0);let A=0,Z=e.width,nt=e.height,ot=1,q=null,rt=null;const at=new $e(0,0,Z,nt),j=new $e(0,0,Z,nt);let tt=!1;const Ct=new Cc;let Q=!1,it=!1;const wt=new Ae,St=new vt,Pt=new J,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ut(){return k===null?ot:1}let st=n;function xt(V,ct){const gt=e.getContext(V,ct);return gt!==null?gt:null}try{const V={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:h,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sc}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),st===null){const ct="webgl2";if(st=xt(ct,V),st===null)throw xt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let bt,E,et,$,C,M,B,X,K,G,ft,lt,pt,Tt,Et,At,Ht,zt,Dt,Kt,Vt,oe,ae,te;function Ft(){bt=new K0(st),bt.init(),E=new Z0(st,bt,t),oe=new Dx(st,bt),et=new Rx(st),$=new ty(st),C=new _x,M=new Ix(st,bt,et,C,E,oe,$),B=new q0(w),X=new $0(w),K=new o_(st),ae=new G0(st,K),G=new J0(st,K,$,ae),ft=new ny(st,G,K,$),Dt=new ey(st,E,M),At=new X0(C),lt=new gx(w,B,X,bt,E,ae,At),pt=new Hx(w,C),Tt=new yx,Et=new Ex(bt),zt=new V0(w,B,X,et,ft,_,u),Ht=new Px(w,ft,E),te=new Vx(st,$,E,et),Kt=new W0(st,bt,$),Vt=new Q0(st,bt,$),$.programs=lt.programs,w.capabilities=E,w.extensions=bt,w.properties=C,w.renderLists=Tt,w.shadowMap=Ht,w.state=et,w.info=$}Ft();const D=new Bx(w,st);this.xr=D,this.getContext=function(){return st},this.getContextAttributes=function(){return st.getContextAttributes()},this.forceContextLoss=function(){const V=bt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=bt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(V){V!==void 0&&(ot=V,this.setSize(Z,nt,!1))},this.getSize=function(V){return V.set(Z,nt)},this.setSize=function(V,ct,gt=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=V,nt=ct,e.width=Math.floor(V*ot),e.height=Math.floor(ct*ot),gt===!0&&(e.style.width=V+"px",e.style.height=ct+"px"),this.setViewport(0,0,V,ct)},this.getDrawingBufferSize=function(V){return V.set(Z*ot,nt*ot).floor()},this.setDrawingBufferSize=function(V,ct,gt){Z=V,nt=ct,ot=gt,e.width=Math.floor(V*gt),e.height=Math.floor(ct*gt),this.setViewport(0,0,V,ct)},this.getCurrentViewport=function(V){return V.copy(R)},this.getViewport=function(V){return V.copy(at)},this.setViewport=function(V,ct,gt,_t){V.isVector4?at.set(V.x,V.y,V.z,V.w):at.set(V,ct,gt,_t),et.viewport(R.copy(at).multiplyScalar(ot).round())},this.getScissor=function(V){return V.copy(j)},this.setScissor=function(V,ct,gt,_t){V.isVector4?j.set(V.x,V.y,V.z,V.w):j.set(V,ct,gt,_t),et.scissor(W.copy(j).multiplyScalar(ot).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(V){et.setScissorTest(tt=V)},this.setOpaqueSort=function(V){q=V},this.setTransparentSort=function(V){rt=V},this.getClearColor=function(V){return V.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(V=!0,ct=!0,gt=!0){let _t=0;if(V){let dt=!1;if(k!==null){const kt=k.texture.format;dt=kt===ef||kt===tf||kt===Qd}if(dt){const kt=k.texture.type,Zt=kt===Ui||kt===us||kt===Yd||kt===no||kt===Kd||kt===Jd,qt=zt.getClearColor(),jt=zt.getClearAlpha(),ee=qt.r,Jt=qt.g,ne=qt.b;Zt?(m[0]=ee,m[1]=Jt,m[2]=ne,m[3]=jt,st.clearBufferuiv(st.COLOR,0,m)):(x[0]=ee,x[1]=Jt,x[2]=ne,x[3]=jt,st.clearBufferiv(st.COLOR,0,x))}else _t|=st.COLOR_BUFFER_BIT}ct&&(_t|=st.DEPTH_BUFFER_BIT),gt&&(_t|=st.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),st.clear(_t)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Tt.dispose(),Et.dispose(),C.dispose(),B.dispose(),X.dispose(),ft.dispose(),ae.dispose(),te.dispose(),lt.dispose(),D.dispose(),D.removeEventListener("sessionstart",Pe),D.removeEventListener("sessionend",Ee),on.stop()};function ht(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const V=$.autoReset,ct=Ht.enabled,gt=Ht.autoUpdate,_t=Ht.needsUpdate,dt=Ht.type;Ft(),$.autoReset=V,Ht.enabled=ct,Ht.autoUpdate=gt,Ht.needsUpdate=_t,Ht.type=dt}function Rt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function Nt(V){const ct=V.target;ct.removeEventListener("dispose",Nt),re(ct)}function re(V){ue(V),C.remove(V)}function ue(V){const ct=C.get(V).programs;ct!==void 0&&(ct.forEach(function(gt){lt.releaseProgram(gt)}),V.isShaderMaterial&&lt.releaseShaderCache(V))}this.renderBufferDirect=function(V,ct,gt,_t,dt,kt){ct===null&&(ct=It);const Zt=dt.isMesh&&dt.matrixWorld.determinant()<0,qt=ho(V,ct,gt,_t,dt);et.setMaterial(_t,Zt);let jt=gt.index,ee=1;if(_t.wireframe===!0){if(jt=G.getWireframeAttribute(gt),jt===void 0)return;ee=2}const Jt=gt.drawRange,ne=gt.attributes.position;let Le=Jt.start*ee,an=(Jt.start+Jt.count)*ee;kt!==null&&(Le=Math.max(Le,kt.start*ee),an=Math.min(an,(kt.start+kt.count)*ee)),jt!==null?(Le=Math.max(Le,0),an=Math.min(an,jt.count)):ne!=null&&(Le=Math.max(Le,0),an=Math.min(an,ne.count));const Re=an-Le;if(Re<0||Re===1/0)return;ae.setup(dt,_t,qt,gt,jt);let ln,ye=Kt;if(jt!==null&&(ln=K.get(jt),ye=Vt,ye.setIndex(ln)),dt.isMesh)_t.wireframe===!0?(et.setLineWidth(_t.wireframeLinewidth*Ut()),ye.setMode(st.LINES)):ye.setMode(st.TRIANGLES);else if(dt.isLine){let ie=_t.linewidth;ie===void 0&&(ie=1),et.setLineWidth(ie*Ut()),dt.isLineSegments?ye.setMode(st.LINES):dt.isLineLoop?ye.setMode(st.LINE_LOOP):ye.setMode(st.LINE_STRIP)}else dt.isPoints?ye.setMode(st.POINTS):dt.isSprite&&ye.setMode(st.TRIANGLES);if(dt.isBatchedMesh)ye.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)ye.renderInstances(Le,Re,dt.count);else if(gt.isInstancedBufferGeometry){const ie=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,ai=Math.min(gt.instanceCount,ie);ye.renderInstances(Le,Re,ai)}else ye.render(Le,Re)};function ve(V,ct,gt){V.transparent===!0&&V.side===fn&&V.forceSinglePass===!1?(V.side=bn,V.needsUpdate=!0,Hi(V,ct,gt),V.side=zi,V.needsUpdate=!0,Hi(V,ct,gt),V.side=fn):Hi(V,ct,gt)}this.compile=function(V,ct,gt=null){gt===null&&(gt=V),g=Et.get(gt),g.init(),S.push(g),gt.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),V!==gt&&V.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),g.setupLights(w._useLegacyLights);const _t=new Set;return V.traverse(function(dt){const kt=dt.material;if(kt)if(Array.isArray(kt))for(let Zt=0;Zt<kt.length;Zt++){const qt=kt[Zt];ve(qt,gt,dt),_t.add(qt)}else ve(kt,gt,dt),_t.add(kt)}),S.pop(),g=null,_t},this.compileAsync=function(V,ct,gt=null){const _t=this.compile(V,ct,gt);return new Promise(dt=>{function kt(){if(_t.forEach(function(Zt){C.get(Zt).currentProgram.isReady()&&_t.delete(Zt)}),_t.size===0){dt(V);return}setTimeout(kt,10)}bt.get("KHR_parallel_shader_compile")!==null?kt():setTimeout(kt,10)})};let ke=null;function me(V){ke&&ke(V)}function Pe(){on.stop()}function Ee(){on.start()}const on=new mf;on.setAnimationLoop(me),typeof self<"u"&&on.setContext(self),this.setAnimationLoop=function(V){ke=V,D.setAnimationLoop(V),V===null?on.stop():on.start()},D.addEventListener("sessionstart",Pe),D.addEventListener("sessionend",Ee),this.render=function(V,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(ct),ct=D.getCamera()),V.isScene===!0&&V.onBeforeRender(w,V,ct,k),g=Et.get(V,S.length),g.init(),S.push(g),wt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),Ct.setFromProjectionMatrix(wt),it=this.localClippingEnabled,Q=At.init(this.clippingPlanes,it),y=Tt.get(V,v.length),y.init(),v.push(y),gn(V,ct,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(q,rt),this.info.render.frame++,Q===!0&&At.beginShadows();const gt=g.state.shadowsArray;if(Ht.render(gt,V,ct),Q===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1)&&zt.render(y,V),g.setupLights(w._useLegacyLights),ct.isArrayCamera){const _t=ct.cameras;for(let dt=0,kt=_t.length;dt<kt;dt++){const Zt=_t[dt];$n(y,V,Zt,Zt.viewport)}}else $n(y,V,ct);k!==null&&(M.updateMultisampleRenderTarget(k),M.updateRenderTargetMipmap(k)),V.isScene===!0&&V.onAfterRender(w,V,ct),ae.resetDefaultState(),H=-1,I=null,S.pop(),S.length>0?g=S[S.length-1]:g=null,v.pop(),v.length>0?y=v[v.length-1]:y=null};function gn(V,ct,gt,_t){if(V.visible===!1)return;if(V.layers.test(ct.layers)){if(V.isGroup)gt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(ct);else if(V.isLight)g.pushLight(V),V.castShadow&&g.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||Ct.intersectsSprite(V)){_t&&Pt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(wt);const Zt=ft.update(V),qt=V.material;qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||Ct.intersectsObject(V))){const Zt=ft.update(V),qt=V.material;if(_t&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),Pt.copy(V.boundingSphere.center)):(Zt.boundingSphere===null&&Zt.computeBoundingSphere(),Pt.copy(Zt.boundingSphere.center)),Pt.applyMatrix4(V.matrixWorld).applyMatrix4(wt)),Array.isArray(qt)){const jt=Zt.groups;for(let ee=0,Jt=jt.length;ee<Jt;ee++){const ne=jt[ee],Le=qt[ne.materialIndex];Le&&Le.visible&&y.push(V,Zt,Le,gt,Pt.z,ne)}}else qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}const kt=V.children;for(let Zt=0,qt=kt.length;Zt<qt;Zt++)gn(kt[Zt],ct,gt,_t)}function $n(V,ct,gt,_t){const dt=V.opaque,kt=V.transmissive,Zt=V.transparent;g.setupLightsView(gt),Q===!0&&At.setGlobalState(w.clippingPlanes,gt),kt.length>0&&bi(dt,kt,ct,gt),_t&&et.viewport(R.copy(_t)),dt.length>0&&Ge(dt,ct,gt),kt.length>0&&Ge(kt,ct,gt),Zt.length>0&&Ge(Zt,ct,gt),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function bi(V,ct,gt,_t){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(g.state.transmissionRenderTarget===null){g.state.transmissionRenderTarget=new lr(1,1,{generateMipmaps:!0,type:bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float")?fa:Ui,minFilter:or,samples:4,stencilBuffer:o});const ee=C.get(g.state.transmissionRenderTarget);ee.__isTransmissionRenderTarget=!0}const kt=g.state.transmissionRenderTarget;w.getDrawingBufferSize(St),kt.setSize(St.x,St.y);const Zt=w.getRenderTarget();w.setRenderTarget(kt),w.getClearColor(F),A=w.getClearAlpha(),A<1&&w.setClearColor(16777215,.5),w.clear();const qt=w.toneMapping;w.toneMapping=ki,Ge(V,gt,_t),M.updateMultisampleRenderTarget(kt),M.updateRenderTargetMipmap(kt);let jt=!1;for(let ee=0,Jt=ct.length;ee<Jt;ee++){const ne=ct[ee],Le=ne.object,an=ne.geometry,Re=ne.material,ln=ne.group;if(Re.side===fn&&Le.layers.test(_t.layers)){const ye=Re.side;Re.side=bn,Re.needsUpdate=!0,Wt(Le,gt,_t,an,Re,ln),Re.side=ye,Re.needsUpdate=!0,jt=!0}}jt===!0&&(M.updateMultisampleRenderTarget(kt),M.updateRenderTargetMipmap(kt)),w.setRenderTarget(Zt),w.setClearColor(F,A),w.toneMapping=qt}function Ge(V,ct,gt){const _t=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,kt=V.length;dt<kt;dt++){const Zt=V[dt],qt=Zt.object,jt=Zt.geometry,ee=_t===null?Zt.material:_t,Jt=Zt.group;qt.layers.test(gt.layers)&&Wt(qt,ct,gt,jt,ee,Jt)}}function Wt(V,ct,gt,_t,dt,kt){V.onBeforeRender(w,ct,gt,_t,dt,kt),V.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),dt.onBeforeRender(w,ct,gt,_t,V,kt),dt.transparent===!0&&dt.side===fn&&dt.forceSinglePass===!1?(dt.side=bn,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,kt),dt.side=zi,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,kt),dt.side=fn):w.renderBufferDirect(gt,ct,_t,dt,V,kt),V.onAfterRender(w,ct,gt,_t,dt,kt)}function Hi(V,ct,gt){ct.isScene!==!0&&(ct=It);const _t=C.get(V),dt=g.state.lights,kt=g.state.shadowsArray,Zt=dt.state.version,qt=lt.getParameters(V,dt.state,kt,ct,gt),jt=lt.getProgramCacheKey(qt);let ee=_t.programs;_t.environment=V.isMeshStandardMaterial?ct.environment:null,_t.fog=ct.fog,_t.envMap=(V.isMeshStandardMaterial?X:B).get(V.envMap||_t.environment),_t.envMapRotation=_t.environment!==null&&V.envMap===null?ct.environmentRotation:V.envMapRotation,ee===void 0&&(V.addEventListener("dispose",Nt),ee=new Map,_t.programs=ee);let Jt=ee.get(jt);if(Jt!==void 0){if(_t.currentProgram===Jt&&_t.lightsStateVersion===Zt)return _s(V,qt),Jt}else qt.uniforms=lt.getUniforms(V),V.onBuild(gt,qt,w),V.onBeforeCompile(qt,w),Jt=lt.acquireProgram(qt,jt),ee.set(jt,Jt),_t.uniforms=qt.uniforms;const ne=_t.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(ne.clippingPlanes=At.uniform),_s(V,qt),_t.needsLights=fo(V),_t.lightsStateVersion=Zt,_t.needsLights&&(ne.ambientLightColor.value=dt.state.ambient,ne.lightProbe.value=dt.state.probe,ne.directionalLights.value=dt.state.directional,ne.directionalLightShadows.value=dt.state.directionalShadow,ne.spotLights.value=dt.state.spot,ne.spotLightShadows.value=dt.state.spotShadow,ne.rectAreaLights.value=dt.state.rectArea,ne.ltc_1.value=dt.state.rectAreaLTC1,ne.ltc_2.value=dt.state.rectAreaLTC2,ne.pointLights.value=dt.state.point,ne.pointLightShadows.value=dt.state.pointShadow,ne.hemisphereLights.value=dt.state.hemi,ne.directionalShadowMap.value=dt.state.directionalShadowMap,ne.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,ne.spotShadowMap.value=dt.state.spotShadowMap,ne.spotLightMatrix.value=dt.state.spotLightMatrix,ne.spotLightMap.value=dt.state.spotLightMap,ne.pointShadowMap.value=dt.state.pointShadowMap,ne.pointShadowMatrix.value=dt.state.pointShadowMatrix),_t.currentProgram=Jt,_t.uniformsList=null,Jt}function gs(V){if(V.uniformsList===null){const ct=V.currentProgram.getUniforms();V.uniformsList=ca.seqWithValue(ct.seq,V.uniforms)}return V.uniformsList}function _s(V,ct){const gt=C.get(V);gt.outputColorSpace=ct.outputColorSpace,gt.batching=ct.batching,gt.instancing=ct.instancing,gt.instancingColor=ct.instancingColor,gt.instancingMorph=ct.instancingMorph,gt.skinning=ct.skinning,gt.morphTargets=ct.morphTargets,gt.morphNormals=ct.morphNormals,gt.morphColors=ct.morphColors,gt.morphTargetsCount=ct.morphTargetsCount,gt.numClippingPlanes=ct.numClippingPlanes,gt.numIntersection=ct.numClipIntersection,gt.vertexAlphas=ct.vertexAlphas,gt.vertexTangents=ct.vertexTangents,gt.toneMapping=ct.toneMapping}function ho(V,ct,gt,_t,dt){ct.isScene!==!0&&(ct=It),M.resetTextureUnits();const kt=ct.fog,Zt=_t.isMeshStandardMaterial?ct.environment:null,qt=k===null?w.outputColorSpace:k.isXRRenderTarget===!0?k.texture.colorSpace:Fi,jt=(_t.isMeshStandardMaterial?X:B).get(_t.envMap||Zt),ee=_t.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,Jt=!!gt.attributes.tangent&&(!!_t.normalMap||_t.anisotropy>0),ne=!!gt.morphAttributes.position,Le=!!gt.morphAttributes.normal,an=!!gt.morphAttributes.color;let Re=ki;_t.toneMapped&&(k===null||k.isXRRenderTarget===!0)&&(Re=w.toneMapping);const ln=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,ye=ln!==void 0?ln.length:0,ie=C.get(_t),ai=g.state.lights;if(Q===!0&&(it===!0||V!==I)){const en=V===I&&_t.id===H;At.setState(_t,V,en)}let Xt=!1;_t.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==ai.state.version||ie.outputColorSpace!==qt||dt.isBatchedMesh&&ie.batching===!1||!dt.isBatchedMesh&&ie.batching===!0||dt.isInstancedMesh&&ie.instancing===!1||!dt.isInstancedMesh&&ie.instancing===!0||dt.isSkinnedMesh&&ie.skinning===!1||!dt.isSkinnedMesh&&ie.skinning===!0||dt.isInstancedMesh&&ie.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&ie.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&ie.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&ie.instancingMorph===!1&&dt.morphTexture!==null||ie.envMap!==jt||_t.fog===!0&&ie.fog!==kt||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==At.numPlanes||ie.numIntersection!==At.numIntersection)||ie.vertexAlphas!==ee||ie.vertexTangents!==Jt||ie.morphTargets!==ne||ie.morphNormals!==Le||ie.morphColors!==an||ie.toneMapping!==Re||ie.morphTargetsCount!==ye)&&(Xt=!0):(Xt=!0,ie.__version=_t.version);let fe=ie.currentProgram;Xt===!0&&(fe=Hi(_t,ct,dt));let Vi=!1,Cn=!1,Kn=!1;const Ue=fe.getUniforms(),Yt=ie.uniforms;if(et.useProgram(fe.program)&&(Vi=!0,Cn=!0,Kn=!0),_t.id!==H&&(H=_t.id,Cn=!0),Vi||I!==V){Ue.setValue(st,"projectionMatrix",V.projectionMatrix),Ue.setValue(st,"viewMatrix",V.matrixWorldInverse);const en=Ue.map.cameraPosition;en!==void 0&&en.setValue(st,Pt.setFromMatrixPosition(V.matrixWorld)),E.logarithmicDepthBuffer&&Ue.setValue(st,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(_t.isMeshPhongMaterial||_t.isMeshToonMaterial||_t.isMeshLambertMaterial||_t.isMeshBasicMaterial||_t.isMeshStandardMaterial||_t.isShaderMaterial)&&Ue.setValue(st,"isOrthographic",V.isOrthographicCamera===!0),I!==V&&(I=V,Cn=!0,Kn=!0)}if(dt.isSkinnedMesh){Ue.setOptional(st,dt,"bindMatrix"),Ue.setOptional(st,dt,"bindMatrixInverse");const en=dt.skeleton;en&&(en.boneTexture===null&&en.computeBoneTexture(),Ue.setValue(st,"boneTexture",en.boneTexture,M))}dt.isBatchedMesh&&(Ue.setOptional(st,dt,"batchingTexture"),Ue.setValue(st,"batchingTexture",dt._matricesTexture,M));const be=gt.morphAttributes;if((be.position!==void 0||be.normal!==void 0||be.color!==void 0)&&Dt.update(dt,gt,fe),(Cn||ie.receiveShadow!==dt.receiveShadow)&&(ie.receiveShadow=dt.receiveShadow,Ue.setValue(st,"receiveShadow",dt.receiveShadow)),_t.isMeshGouraudMaterial&&_t.envMap!==null&&(Yt.envMap.value=jt,Yt.flipEnvMap.value=jt.isCubeTexture&&jt.isRenderTargetTexture===!1?-1:1),_t.isMeshStandardMaterial&&_t.envMap===null&&ct.environment!==null&&(Yt.envMapIntensity.value=ct.environmentIntensity),Cn&&(Ue.setValue(st,"toneMappingExposure",w.toneMappingExposure),ie.needsLights&&vs(Yt,Kn),kt&&_t.fog===!0&&pt.refreshFogUniforms(Yt,kt),pt.refreshMaterialUniforms(Yt,_t,ot,nt,g.state.transmissionRenderTarget),ca.upload(st,gs(ie),Yt,M)),_t.isShaderMaterial&&_t.uniformsNeedUpdate===!0&&(ca.upload(st,gs(ie),Yt,M),_t.uniformsNeedUpdate=!1),_t.isSpriteMaterial&&Ue.setValue(st,"center",dt.center),Ue.setValue(st,"modelViewMatrix",dt.modelViewMatrix),Ue.setValue(st,"normalMatrix",dt.normalMatrix),Ue.setValue(st,"modelMatrix",dt.matrixWorld),_t.isShaderMaterial||_t.isRawShaderMaterial){const en=_t.uniformsGroups;for(let wi=0,_n=en.length;wi<_n;wi++){const po=en[wi];te.update(po,fe),te.bind(po,fe)}}return fe}function vs(V,ct){V.ambientLightColor.needsUpdate=ct,V.lightProbe.needsUpdate=ct,V.directionalLights.needsUpdate=ct,V.directionalLightShadows.needsUpdate=ct,V.pointLights.needsUpdate=ct,V.pointLightShadows.needsUpdate=ct,V.spotLights.needsUpdate=ct,V.spotLightShadows.needsUpdate=ct,V.rectAreaLights.needsUpdate=ct,V.hemisphereLights.needsUpdate=ct}function fo(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return k},this.setRenderTargetTextures=function(V,ct,gt){C.get(V.texture).__webglTexture=ct,C.get(V.depthTexture).__webglTexture=gt;const _t=C.get(V);_t.__hasExternalTextures=!0,_t.__autoAllocateDepthBuffer=gt===void 0,_t.__autoAllocateDepthBuffer||bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),_t.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,ct){const gt=C.get(V);gt.__webglFramebuffer=ct,gt.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(V,ct=0,gt=0){k=V,N=ct,O=gt;let _t=!0,dt=null,kt=!1,Zt=!1;if(V){const jt=C.get(V);jt.__useDefaultFramebuffer!==void 0?(et.bindFramebuffer(st.FRAMEBUFFER,null),_t=!1):jt.__webglFramebuffer===void 0?M.setupRenderTarget(V):jt.__hasExternalTextures&&M.rebindTextures(V,C.get(V.texture).__webglTexture,C.get(V.depthTexture).__webglTexture);const ee=V.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Zt=!0);const Jt=C.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(Jt[ct])?dt=Jt[ct][gt]:dt=Jt[ct],kt=!0):V.samples>0&&M.useMultisampledRTT(V)===!1?dt=C.get(V).__webglMultisampledFramebuffer:Array.isArray(Jt)?dt=Jt[gt]:dt=Jt,R.copy(V.viewport),W.copy(V.scissor),U=V.scissorTest}else R.copy(at).multiplyScalar(ot).floor(),W.copy(j).multiplyScalar(ot).floor(),U=tt;if(et.bindFramebuffer(st.FRAMEBUFFER,dt)&&_t&&et.drawBuffers(V,dt),et.viewport(R),et.scissor(W),et.setScissorTest(U),kt){const jt=C.get(V.texture);st.framebufferTexture2D(st.FRAMEBUFFER,st.COLOR_ATTACHMENT0,st.TEXTURE_CUBE_MAP_POSITIVE_X+ct,jt.__webglTexture,gt)}else if(Zt){const jt=C.get(V.texture),ee=ct||0;st.framebufferTextureLayer(st.FRAMEBUFFER,st.COLOR_ATTACHMENT0,jt.__webglTexture,gt||0,ee)}H=-1},this.readRenderTargetPixels=function(V,ct,gt,_t,dt,kt,Zt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=C.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Zt!==void 0&&(qt=qt[Zt]),qt){et.bindFramebuffer(st.FRAMEBUFFER,qt);try{const jt=V.texture,ee=jt.format,Jt=jt.type;if(ee!==ri&&oe.convert(ee)!==st.getParameter(st.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ne=Jt===fa&&(bt.has("EXT_color_buffer_half_float")||bt.has("EXT_color_buffer_float"));if(Jt!==Ui&&oe.convert(Jt)!==st.getParameter(st.IMPLEMENTATION_COLOR_READ_TYPE)&&Jt!==Ni&&!ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=V.width-_t&&gt>=0&&gt<=V.height-dt&&st.readPixels(ct,gt,_t,dt,oe.convert(ee),oe.convert(Jt),kt)}finally{const jt=k!==null?C.get(k).__webglFramebuffer:null;et.bindFramebuffer(st.FRAMEBUFFER,jt)}}},this.copyFramebufferToTexture=function(V,ct,gt=0){const _t=Math.pow(2,-gt),dt=Math.floor(ct.image.width*_t),kt=Math.floor(ct.image.height*_t);M.setTexture2D(ct,0),st.copyTexSubImage2D(st.TEXTURE_2D,gt,0,0,V.x,V.y,dt,kt),et.unbindTexture()},this.copyTextureToTexture=function(V,ct,gt,_t=0){const dt=ct.image.width,kt=ct.image.height,Zt=oe.convert(gt.format),qt=oe.convert(gt.type);M.setTexture2D(gt,0),st.pixelStorei(st.UNPACK_FLIP_Y_WEBGL,gt.flipY),st.pixelStorei(st.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),st.pixelStorei(st.UNPACK_ALIGNMENT,gt.unpackAlignment),ct.isDataTexture?st.texSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,dt,kt,Zt,qt,ct.image.data):ct.isCompressedTexture?st.compressedTexSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Zt,ct.mipmaps[0].data):st.texSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,Zt,qt,ct.image),_t===0&&gt.generateMipmaps&&st.generateMipmap(st.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(V,ct,gt,_t,dt=0){const kt=Math.round(V.max.x-V.min.x),Zt=Math.round(V.max.y-V.min.y),qt=V.max.z-V.min.z+1,jt=oe.convert(_t.format),ee=oe.convert(_t.type);let Jt;if(_t.isData3DTexture)M.setTexture3D(_t,0),Jt=st.TEXTURE_3D;else if(_t.isDataArrayTexture||_t.isCompressedArrayTexture)M.setTexture2DArray(_t,0),Jt=st.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}st.pixelStorei(st.UNPACK_FLIP_Y_WEBGL,_t.flipY),st.pixelStorei(st.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),st.pixelStorei(st.UNPACK_ALIGNMENT,_t.unpackAlignment);const ne=st.getParameter(st.UNPACK_ROW_LENGTH),Le=st.getParameter(st.UNPACK_IMAGE_HEIGHT),an=st.getParameter(st.UNPACK_SKIP_PIXELS),Re=st.getParameter(st.UNPACK_SKIP_ROWS),ln=st.getParameter(st.UNPACK_SKIP_IMAGES),ye=gt.isCompressedTexture?gt.mipmaps[dt]:gt.image;st.pixelStorei(st.UNPACK_ROW_LENGTH,ye.width),st.pixelStorei(st.UNPACK_IMAGE_HEIGHT,ye.height),st.pixelStorei(st.UNPACK_SKIP_PIXELS,V.min.x),st.pixelStorei(st.UNPACK_SKIP_ROWS,V.min.y),st.pixelStorei(st.UNPACK_SKIP_IMAGES,V.min.z),gt.isDataTexture||gt.isData3DTexture?st.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,kt,Zt,qt,jt,ee,ye.data):_t.isCompressedArrayTexture?st.compressedTexSubImage3D(Jt,dt,ct.x,ct.y,ct.z,kt,Zt,qt,jt,ye.data):st.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,kt,Zt,qt,jt,ee,ye),st.pixelStorei(st.UNPACK_ROW_LENGTH,ne),st.pixelStorei(st.UNPACK_IMAGE_HEIGHT,Le),st.pixelStorei(st.UNPACK_SKIP_PIXELS,an),st.pixelStorei(st.UNPACK_SKIP_ROWS,Re),st.pixelStorei(st.UNPACK_SKIP_IMAGES,ln),dt===0&&_t.generateMipmaps&&st.generateMipmap(Jt),et.unbindTexture()},this.initTexture=function(V){V.isCubeTexture?M.setTextureCube(V,0):V.isData3DTexture?M.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?M.setTexture2DArray(V,0):M.setTexture2D(V,0),et.unbindTexture()},this.resetState=function(){N=0,O=0,k=null,et.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ac?"display-p3":"srgb",e.unpackColorSpace=ge.workingColorSpace===Ca?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Sf extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yn,this.environmentIntensity=1,this.environmentRotation=new Yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Da extends fr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ad=new J,ld=new J,cd=new Ae,Hl=new Ra,Jo=new Pa;class Rc extends tn{constructor(t=new Oe,e=new Da){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)ad.fromBufferAttribute(e,s-1),ld.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ad.distanceTo(ld);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jo.copy(n.boundingSphere),Jo.applyMatrix4(s),Jo.radius+=o,t.ray.intersectsSphere(Jo)===!1)return;cd.copy(s).invert(),Hl.copy(t.ray).applyMatrix4(cd);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,h=new J,f=new J,p=new J,_=new J,m=this.isLineSegments?2:1,x=n.index,g=n.attributes.position;if(x!==null){const v=Math.max(0,l.start),S=Math.min(x.count,l.start+l.count);for(let w=v,P=S-1;w<P;w+=m){const N=x.getX(w),O=x.getX(w+1);if(h.fromBufferAttribute(g,N),f.fromBufferAttribute(g,O),Hl.distanceSqToSegment(h,f,_,p)>u)continue;_.applyMatrix4(this.matrixWorld);const H=t.ray.origin.distanceTo(_);H<t.near||H>t.far||e.push({distance:H,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,l.start),S=Math.min(g.count,l.start+l.count);for(let w=v,P=S-1;w<P;w+=m){if(h.fromBufferAttribute(g,w),f.fromBufferAttribute(g,w+1),Hl.distanceSqToSegment(h,f,_,p)>u)continue;_.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(_);O<t.near||O>t.far||e.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const ud=new J,hd=new J;class Gx extends Rc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)ud.fromBufferAttribute(e,s),hd.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+ud.distanceTo(hd);t.setAttribute("lineDistance",new _e(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Ef extends pn{constructor(t,e,n,s,o,l,c,u,h){super(t,e,n,s,o,l,c,u,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class oi{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,u=o-1,h;for(;c<=u;)if(s=Math.floor(c+(u-c)/2),h=n[s]-l,h<0)c=s+1;else if(h>0)u=s-1;else{u=s;break}if(s=u,n[s]===l)return s/(o-1);const f=n[s],_=n[s+1]-f,m=(l-f)/_;return(s+m)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),u=e||(l.isVector2?new vt:new J);return u.copy(c).sub(l).normalize(),u}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new J,s=[],o=[],l=[],c=new J,u=new Ae;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new J)}o[0]=new J,l[0]=new J;let h=Number.MAX_VALUE;const f=Math.abs(s[0].x),p=Math.abs(s[0].y),_=Math.abs(s[0].z);f<=h&&(h=f,n.set(1,0,0)),p<=h&&(h=p,n.set(0,1,0)),_<=h&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),l[m]=l[m-1].clone(),c.crossVectors(s[m-1],s[m]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(je(s[m-1].dot(s[m]),-1,1));o[m].applyMatrix4(u.makeRotationAxis(c,x))}l[m].crossVectors(s[m],o[m])}if(e===!0){let m=Math.acos(je(o[0].dot(o[t]),-1,1));m/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(m=-m);for(let x=1;x<=t;x++)o[x].applyMatrix4(u.makeRotationAxis(s[x],m*x)),l[x].crossVectors(s[x],o[x])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ic extends oi{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new vt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let u=this.aX+this.xRadius*Math.cos(c),h=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),_=u-this.aX,m=h-this.aY;u=_*f-m*p+this.aX,h=_*p+m*f+this.aY}return n.set(u,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Wx extends Ic{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function Dc(){let i=0,t=0,e=0,n=0;function s(o,l,c,u){i=o,t=c,e=-3*o+3*l-2*c-u,n=2*o-2*l+c+u}return{initCatmullRom:function(o,l,c,u,h){s(l,c,h*(c-o),h*(u-l))},initNonuniformCatmullRom:function(o,l,c,u,h,f,p){let _=(l-o)/h-(c-o)/(h+f)+(c-l)/f,m=(c-l)/f-(u-l)/(f+p)+(u-c)/p;_*=f,m*=f,s(l,c,_,m)},calc:function(o){const l=o*o,c=l*o;return i+t*o+e*l+n*c}}}const Qo=new J,Vl=new Dc,Gl=new Dc,Wl=new Dc;class uc extends oi{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new J){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),u=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:u===0&&c===o-1&&(c=o-2,u=1);let h,f;this.closed||c>0?h=s[(c-1)%o]:(Qo.subVectors(s[0],s[1]).add(s[0]),h=Qo);const p=s[c%o],_=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:(Qo.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=Qo),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(h.distanceToSquared(p),m),y=Math.pow(p.distanceToSquared(_),m),g=Math.pow(_.distanceToSquared(f),m);y<1e-4&&(y=1),x<1e-4&&(x=y),g<1e-4&&(g=y),Vl.initNonuniformCatmullRom(h.x,p.x,_.x,f.x,x,y,g),Gl.initNonuniformCatmullRom(h.y,p.y,_.y,f.y,x,y,g),Wl.initNonuniformCatmullRom(h.z,p.z,_.z,f.z,x,y,g)}else this.curveType==="catmullrom"&&(Vl.initCatmullRom(h.x,p.x,_.x,f.x,this.tension),Gl.initCatmullRom(h.y,p.y,_.y,f.y,this.tension),Wl.initCatmullRom(h.z,p.z,_.z,f.z,this.tension));return n.set(Vl.calc(u),Gl.calc(u),Wl.calc(u)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new J().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function dd(i,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=i*i,u=i*c;return(2*e-2*n+o+l)*u+(-3*e+3*n-2*o-l)*c+o*i+e}function Zx(i,t){const e=1-i;return e*e*t}function Xx(i,t){return 2*(1-i)*i*t}function qx(i,t){return i*i*t}function Gs(i,t,e,n){return Zx(i,t)+Xx(i,e)+qx(i,n)}function jx(i,t){const e=1-i;return e*e*e*t}function Yx(i,t){const e=1-i;return 3*e*e*i*t}function $x(i,t){return 3*(1-i)*i*i*t}function Kx(i,t){return i*i*i*t}function Ws(i,t,e,n,s){return jx(i,t)+Yx(i,e)+$x(i,n)+Kx(i,s)}class Tf extends oi{constructor(t=new vt,e=new vt,n=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Ws(t,s.x,o.x,l.x,c.x),Ws(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Jx extends oi{constructor(t=new J,e=new J,n=new J,s=new J){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new J){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Ws(t,s.x,o.x,l.x,c.x),Ws(t,s.y,o.y,l.y,c.y),Ws(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Af extends oi{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qx extends oi{constructor(t=new J,e=new J){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new J){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new J){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lf extends oi{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Gs(t,s.x,o.x,l.x),Gs(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cf extends oi{constructor(t=new J,e=new J,n=new J){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new J){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Gs(t,s.x,o.x,l.x),Gs(t,s.y,o.y,l.y),Gs(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pf extends oi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,u=s[l===0?l:l-1],h=s[l],f=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(dd(c,u.x,h.x,f.x,p.x),dd(c,u.y,h.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var ya=Object.freeze({__proto__:null,ArcCurve:Wx,CatmullRomCurve3:uc,CubicBezierCurve:Tf,CubicBezierCurve3:Jx,EllipseCurve:Ic,LineCurve:Af,LineCurve3:Qx,QuadraticBezierCurve:Lf,QuadraticBezierCurve3:Cf,SplineCurve:Pf});class tb extends oi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ya[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],u=c.getLength(),h=u===0?0:1-l/u;return c.getPointAt(h,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,u=l.getPoints(c);for(let h=0;h<u.length;h++){const f=u[h];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ya[s.type]().fromJSON(s))}return this}}class fd extends tb{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Af(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new Lf(this.currentPoint.clone(),new vt(t,e),new vt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new Tf(this.currentPoint.clone(),new vt(t,e),new vt(n,s),new vt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Pf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,u){const h=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+h,e+f,n,s,o,l,c,u),this}absellipse(t,e,n,s,o,l,c,u){const h=new Ic(t,e,n,s,o,l,c,u);if(this.curves.length>0){const p=h.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(h);const f=h.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ir extends Oe{constructor(t=[new vt(0,-.5),new vt(.5,0),new vt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=je(s,0,Math.PI*2);const o=[],l=[],c=[],u=[],h=[],f=1/e,p=new J,_=new vt,m=new J,x=new J,y=new J;let g=0,v=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,y.copy(m),m.normalize(),u.push(m.x,m.y,m.z);break;case t.length-1:u.push(y.x,y.y,y.z);break;default:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,x.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),u.push(m.x,m.y,m.z),y.copy(x)}for(let S=0;S<=e;S++){const w=n+S*f*s,P=Math.sin(w),N=Math.cos(w);for(let O=0;O<=t.length-1;O++){p.x=t[O].x*P,p.y=t[O].y,p.z=t[O].x*N,l.push(p.x,p.y,p.z),_.x=S/e,_.y=O/(t.length-1),c.push(_.x,_.y);const k=u[3*O+0]*P,H=u[3*O+1],I=u[3*O+0]*N;h.push(k,H,I)}}for(let S=0;S<e;S++)for(let w=0;w<t.length-1;w++){const P=w+S*t.length,N=P,O=P+t.length,k=P+t.length+1,H=P+1;o.push(N,O,H),o.push(k,H,O)}this.setIndex(o),this.setAttribute("position",new _e(l,3)),this.setAttribute("uv",new _e(c,2)),this.setAttribute("normal",new _e(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ir(t.points,t.segments,t.phiStart,t.phiLength)}}class $s extends Oe{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:u};const h=this;s=Math.floor(s),o=Math.floor(o);const f=[],p=[],_=[],m=[];let x=0;const y=[],g=n/2;let v=0;S(),l===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(f),this.setAttribute("position",new _e(p,3)),this.setAttribute("normal",new _e(_,3)),this.setAttribute("uv",new _e(m,2));function S(){const P=new J,N=new J;let O=0;const k=(e-t)/n;for(let H=0;H<=o;H++){const I=[],R=H/o,W=R*(e-t)+t;for(let U=0;U<=s;U++){const F=U/s,A=F*u+c,Z=Math.sin(A),nt=Math.cos(A);N.x=W*Z,N.y=-R*n+g,N.z=W*nt,p.push(N.x,N.y,N.z),P.set(Z,k,nt).normalize(),_.push(P.x,P.y,P.z),m.push(F,1-R),I.push(x++)}y.push(I)}for(let H=0;H<s;H++)for(let I=0;I<o;I++){const R=y[I][H],W=y[I+1][H],U=y[I+1][H+1],F=y[I][H+1];f.push(R,W,F),f.push(W,U,F),O+=6}h.addGroup(v,O,0),v+=O}function w(P){const N=x,O=new vt,k=new J;let H=0;const I=P===!0?t:e,R=P===!0?1:-1;for(let U=1;U<=s;U++)p.push(0,g*R,0),_.push(0,R,0),m.push(.5,.5),x++;const W=x;for(let U=0;U<=s;U++){const A=U/s*u+c,Z=Math.cos(A),nt=Math.sin(A);k.x=I*nt,k.y=g*R,k.z=I*Z,p.push(k.x,k.y,k.z),_.push(0,R,0),O.x=Z*.5+.5,O.y=nt*.5*R+.5,m.push(O.x,O.y),x++}for(let U=0;U<s;U++){const F=N+U,A=W+U;P===!0?f.push(A,A+1,F):f.push(A+1,A,F),H+=3}h.addGroup(v,H,P===!0?1:2),v+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nc extends $s{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new Nc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const ta=new J,ea=new J,Zl=new J,na=new Wn;class eb extends Oe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(Vs*e),l=t.getIndex(),c=t.getAttribute("position"),u=l?l.count:c.count,h=[0,0,0],f=["a","b","c"],p=new Array(3),_={},m=[];for(let x=0;x<u;x+=3){l?(h[0]=l.getX(x),h[1]=l.getX(x+1),h[2]=l.getX(x+2)):(h[0]=x,h[1]=x+1,h[2]=x+2);const{a:y,b:g,c:v}=na;if(y.fromBufferAttribute(c,h[0]),g.fromBufferAttribute(c,h[1]),v.fromBufferAttribute(c,h[2]),na.getNormal(Zl),p[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,p[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,p[2]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const w=(S+1)%3,P=p[S],N=p[w],O=na[f[S]],k=na[f[w]],H=`${P}_${N}`,I=`${N}_${P}`;I in _&&_[I]?(Zl.dot(_[I].normal)<=o&&(m.push(O.x,O.y,O.z),m.push(k.x,k.y,k.z)),_[I]=null):H in _||(_[H]={index0:h[S],index1:h[w],normal:Zl.clone()})}}for(const x in _)if(_[x]){const{index0:y,index1:g}=_[x];ta.fromBufferAttribute(c,y),ea.fromBufferAttribute(c,g),m.push(ta.x,ta.y,ta.z),m.push(ea.x,ea.y,ea.z)}this.setAttribute("position",new _e(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Na extends fd{constructor(t){super(t),this.uuid=fs(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new fd().fromJSON(s))}return this}}const nb={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let o=Rf(i,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,u,h,f,p,_,m;if(n&&(o=ab(i,t,o,e)),i.length>80*e){c=h=i[0],u=f=i[1];for(let x=e;x<s;x+=e)p=i[x],_=i[x+1],p<c&&(c=p),_<u&&(u=_),p>h&&(h=p),_>f&&(f=_);m=Math.max(h-c,f-u),m=m!==0?32767/m:0}return Ks(o,l,e,c,u,m,0),l}};function Rf(i,t,e,n,s){let o,l;if(s===vb(i,t,e,n)>0)for(o=t;o<e;o+=n)l=pd(o,i[o],i[o+1],l);else for(o=e-n;o>=t;o-=n)l=pd(o,i[o],i[o+1],l);return l&&Oa(l,l.next)&&(Qs(l),l=l.next),l}function ur(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Oa(e,e.next)||Ce(e.prev,e,e.next)===0)){if(Qs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ks(i,t,e,n,s,o,l){if(!i)return;!l&&o&&db(i,n,s,o);let c=i,u,h;for(;i.prev!==i.next;){if(u=i.prev,h=i.next,o?rb(i,n,s,o):ib(i)){t.push(u.i/e|0),t.push(i.i/e|0),t.push(h.i/e|0),Qs(i),i=h.next,c=h.next;continue}if(i=h,i===c){l?l===1?(i=sb(ur(i),t,e),Ks(i,t,e,n,s,o,2)):l===2&&ob(i,t,e,n,s,o):Ks(ur(i),t,e,n,s,o,1);break}}}function ib(i){const t=i.prev,e=i,n=i.next;if(Ce(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,u=e.y,h=n.y,f=s<o?s<l?s:l:o<l?o:l,p=c<u?c<h?c:h:u<h?u:h,_=s>o?s>l?s:l:o>l?o:l,m=c>u?c>h?c:h:u>h?u:h;let x=n.next;for(;x!==t;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=m&&Qr(s,c,o,u,l,h,x.x,x.y)&&Ce(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function rb(i,t,e,n){const s=i.prev,o=i,l=i.next;if(Ce(s,o,l)>=0)return!1;const c=s.x,u=o.x,h=l.x,f=s.y,p=o.y,_=l.y,m=c<u?c<h?c:h:u<h?u:h,x=f<p?f<_?f:_:p<_?p:_,y=c>u?c>h?c:h:u>h?u:h,g=f>p?f>_?f:_:p>_?p:_,v=hc(m,x,t,e,n),S=hc(y,g,t,e,n);let w=i.prevZ,P=i.nextZ;for(;w&&w.z>=v&&P&&P.z<=S;){if(w.x>=m&&w.x<=y&&w.y>=x&&w.y<=g&&w!==s&&w!==l&&Qr(c,f,u,p,h,_,w.x,w.y)&&Ce(w.prev,w,w.next)>=0||(w=w.prevZ,P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Qr(c,f,u,p,h,_,P.x,P.y)&&Ce(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;w&&w.z>=v;){if(w.x>=m&&w.x<=y&&w.y>=x&&w.y<=g&&w!==s&&w!==l&&Qr(c,f,u,p,h,_,w.x,w.y)&&Ce(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;P&&P.z<=S;){if(P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Qr(c,f,u,p,h,_,P.x,P.y)&&Ce(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function sb(i,t,e){let n=i;do{const s=n.prev,o=n.next.next;!Oa(s,o)&&If(s,n,n.next,o)&&Js(s,o)&&Js(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),Qs(n),Qs(n.next),n=i=o),n=n.next}while(n!==i);return ur(n)}function ob(i,t,e,n,s,o){let l=i;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&mb(l,c)){let u=Df(l,c);l=ur(l,l.next),u=ur(u,u.next),Ks(l,t,e,n,s,o,0),Ks(u,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==i)}function ab(i,t,e,n){const s=[];let o,l,c,u,h;for(o=0,l=t.length;o<l;o++)c=t[o]*n,u=o<l-1?t[o+1]*n:i.length,h=Rf(i,c,u,n,!1),h===h.next&&(h.steiner=!0),s.push(pb(h));for(s.sort(lb),o=0;o<s.length;o++)e=cb(s[o],e);return e}function lb(i,t){return i.x-t.x}function cb(i,t){const e=ub(i,t);if(!e)return t;const n=Df(e,i);return ur(n,n.next),ur(e,e.next)}function ub(i,t){let e=t,n=-1/0,s;const o=i.x,l=i.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const _=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(_<=o&&_>n&&(n=_,s=e.x<e.next.x?e:e.next,_===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,u=s.x,h=s.y;let f=1/0,p;e=s;do o>=e.x&&e.x>=u&&o!==e.x&&Qr(l<h?o:n,l,u,h,l<h?n:o,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(o-e.x),Js(e,i)&&(p<f||p===f&&(e.x>s.x||e.x===s.x&&hb(s,e)))&&(s=e,f=p)),e=e.next;while(e!==c);return s}function hb(i,t){return Ce(i.prev,i,t.prev)<0&&Ce(t.next,i,i.next)<0}function db(i,t,e,n){let s=i;do s.z===0&&(s.z=hc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,fb(s)}function fb(i){let t,e,n,s,o,l,c,u,h=1;do{for(e=i,i=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<h&&(c++,n=n.nextZ,!!n);t++);for(u=h;c>0||u>0&&n;)c!==0&&(u===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,u--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;e=n}o.nextZ=null,h*=2}while(l>1);return i}function hc(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function pb(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Qr(i,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(i-l)*(o-c)&&(i-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function mb(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!gb(i,t)&&(Js(i,t)&&Js(t,i)&&_b(i,t)&&(Ce(i.prev,i,t.prev)||Ce(i,t.prev,t))||Oa(i,t)&&Ce(i.prev,i,i.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Oa(i,t){return i.x===t.x&&i.y===t.y}function If(i,t,e,n){const s=ra(Ce(i,t,e)),o=ra(Ce(i,t,n)),l=ra(Ce(e,n,i)),c=ra(Ce(e,n,t));return!!(s!==o&&l!==c||s===0&&ia(i,e,t)||o===0&&ia(i,n,t)||l===0&&ia(e,i,n)||c===0&&ia(e,t,n))}function ia(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function ra(i){return i>0?1:i<0?-1:0}function gb(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&If(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Js(i,t){return Ce(i.prev,i,i.next)<0?Ce(i,t,i.next)>=0&&Ce(i,i.prev,t)>=0:Ce(i,t,i.prev)<0||Ce(i,i.next,t)<0}function _b(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,o=(i.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Df(i,t){const e=new dc(i.i,i.x,i.y),n=new dc(t.i,t.x,t.y),s=i.next,o=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function pd(i,t,e,n){const s=new dc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Qs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function dc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function vb(i,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(i[l]-i[o])*(i[o+1]+i[l+1]),l=o;return s}class Zs{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return Zs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];md(t),gd(n,t);let l=t.length;e.forEach(md);for(let u=0;u<e.length;u++)s.push(l),l+=e[u].length,gd(n,e[u]);const c=nb.triangulate(n,s);for(let u=0;u<c.length;u+=3)o.push(c.slice(u,u+3));return o}}function md(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function gd(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class so extends Oe{constructor(t=new Na([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,u=t.length;c<u;c++){const h=t[c];l(h)}this.setAttribute("position",new _e(s,3)),this.setAttribute("uv",new _e(o,2)),this.computeVertexNormals();function l(c){const u=[],h=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let _=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:m-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const v=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:yb;let w,P=!1,N,O,k,H;v&&(w=v.getSpacedPoints(f),P=!0,_=!1,N=v.computeFrenetFrames(f,!1),O=new J,k=new J,H=new J),_||(g=0,m=0,x=0,y=0);const I=c.extractPoints(h);let R=I.shape;const W=I.holes;if(!Zs.isClockWise(R)){R=R.reverse();for(let xt=0,bt=W.length;xt<bt;xt++){const E=W[xt];Zs.isClockWise(E)&&(W[xt]=E.reverse())}}const F=Zs.triangulateShape(R,W),A=R;for(let xt=0,bt=W.length;xt<bt;xt++){const E=W[xt];R=R.concat(E)}function Z(xt,bt,E){return bt||console.error("THREE.ExtrudeGeometry: vec does not exist"),xt.clone().addScaledVector(bt,E)}const nt=R.length,ot=F.length;function q(xt,bt,E){let et,$,C;const M=xt.x-bt.x,B=xt.y-bt.y,X=E.x-xt.x,K=E.y-xt.y,G=M*M+B*B,ft=M*K-B*X;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(G),pt=Math.sqrt(X*X+K*K),Tt=bt.x-B/lt,Et=bt.y+M/lt,At=E.x-K/pt,Ht=E.y+X/pt,zt=((At-Tt)*K-(Ht-Et)*X)/(M*K-B*X);et=Tt+M*zt-xt.x,$=Et+B*zt-xt.y;const Dt=et*et+$*$;if(Dt<=2)return new vt(et,$);C=Math.sqrt(Dt/2)}else{let lt=!1;M>Number.EPSILON?X>Number.EPSILON&&(lt=!0):M<-Number.EPSILON?X<-Number.EPSILON&&(lt=!0):Math.sign(B)===Math.sign(K)&&(lt=!0),lt?(et=-B,$=M,C=Math.sqrt(G)):(et=M,$=B,C=Math.sqrt(G/2))}return new vt(et/C,$/C)}const rt=[];for(let xt=0,bt=A.length,E=bt-1,et=xt+1;xt<bt;xt++,E++,et++)E===bt&&(E=0),et===bt&&(et=0),rt[xt]=q(A[xt],A[E],A[et]);const at=[];let j,tt=rt.concat();for(let xt=0,bt=W.length;xt<bt;xt++){const E=W[xt];j=[];for(let et=0,$=E.length,C=$-1,M=et+1;et<$;et++,C++,M++)C===$&&(C=0),M===$&&(M=0),j[et]=q(E[et],E[C],E[M]);at.push(j),tt=tt.concat(j)}for(let xt=0;xt<g;xt++){const bt=xt/g,E=m*Math.cos(bt*Math.PI/2),et=x*Math.sin(bt*Math.PI/2)+y;for(let $=0,C=A.length;$<C;$++){const M=Z(A[$],rt[$],et);St(M.x,M.y,-E)}for(let $=0,C=W.length;$<C;$++){const M=W[$];j=at[$];for(let B=0,X=M.length;B<X;B++){const K=Z(M[B],j[B],et);St(K.x,K.y,-E)}}}const Ct=x+y;for(let xt=0;xt<nt;xt++){const bt=_?Z(R[xt],tt[xt],Ct):R[xt];P?(k.copy(N.normals[0]).multiplyScalar(bt.x),O.copy(N.binormals[0]).multiplyScalar(bt.y),H.copy(w[0]).add(k).add(O),St(H.x,H.y,H.z)):St(bt.x,bt.y,0)}for(let xt=1;xt<=f;xt++)for(let bt=0;bt<nt;bt++){const E=_?Z(R[bt],tt[bt],Ct):R[bt];P?(k.copy(N.normals[xt]).multiplyScalar(E.x),O.copy(N.binormals[xt]).multiplyScalar(E.y),H.copy(w[xt]).add(k).add(O),St(H.x,H.y,H.z)):St(E.x,E.y,p/f*xt)}for(let xt=g-1;xt>=0;xt--){const bt=xt/g,E=m*Math.cos(bt*Math.PI/2),et=x*Math.sin(bt*Math.PI/2)+y;for(let $=0,C=A.length;$<C;$++){const M=Z(A[$],rt[$],et);St(M.x,M.y,p+E)}for(let $=0,C=W.length;$<C;$++){const M=W[$];j=at[$];for(let B=0,X=M.length;B<X;B++){const K=Z(M[B],j[B],et);P?St(K.x,K.y+w[f-1].y,w[f-1].x+E):St(K.x,K.y,p+E)}}}Q(),it();function Q(){const xt=s.length/3;if(_){let bt=0,E=nt*bt;for(let et=0;et<ot;et++){const $=F[et];Pt($[2]+E,$[1]+E,$[0]+E)}bt=f+g*2,E=nt*bt;for(let et=0;et<ot;et++){const $=F[et];Pt($[0]+E,$[1]+E,$[2]+E)}}else{for(let bt=0;bt<ot;bt++){const E=F[bt];Pt(E[2],E[1],E[0])}for(let bt=0;bt<ot;bt++){const E=F[bt];Pt(E[0]+nt*f,E[1]+nt*f,E[2]+nt*f)}}n.addGroup(xt,s.length/3-xt,0)}function it(){const xt=s.length/3;let bt=0;wt(A,bt),bt+=A.length;for(let E=0,et=W.length;E<et;E++){const $=W[E];wt($,bt),bt+=$.length}n.addGroup(xt,s.length/3-xt,1)}function wt(xt,bt){let E=xt.length;for(;--E>=0;){const et=E;let $=E-1;$<0&&($=xt.length-1);for(let C=0,M=f+g*2;C<M;C++){const B=nt*C,X=nt*(C+1),K=bt+et+B,G=bt+$+B,ft=bt+$+X,lt=bt+et+X;It(K,G,ft,lt)}}}function St(xt,bt,E){u.push(xt),u.push(bt),u.push(E)}function Pt(xt,bt,E){Ut(xt),Ut(bt),Ut(E);const et=s.length/3,$=S.generateTopUV(n,s,et-3,et-2,et-1);st($[0]),st($[1]),st($[2])}function It(xt,bt,E,et){Ut(xt),Ut(bt),Ut(et),Ut(bt),Ut(E),Ut(et);const $=s.length/3,C=S.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);st(C[0]),st(C[1]),st(C[3]),st(C[1]),st(C[2]),st(C[3])}function Ut(xt){s.push(u[xt*3+0]),s.push(u[xt*3+1]),s.push(u[xt*3+2])}function st(xt){o.push(xt.x),o.push(xt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return xb(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ya[s.type]().fromJSON(s)),new so(n,t.options)}}const yb={generateTopUV:function(i,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],u=t[n*3+1],h=t[s*3],f=t[s*3+1];return[new vt(o,l),new vt(c,u),new vt(h,f)]},generateSideWallUV:function(i,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],u=t[e*3+2],h=t[n*3],f=t[n*3+1],p=t[n*3+2],_=t[s*3],m=t[s*3+1],x=t[s*3+2],y=t[o*3],g=t[o*3+1],v=t[o*3+2];return Math.abs(c-f)<Math.abs(l-h)?[new vt(l,1-u),new vt(h,1-p),new vt(_,1-x),new vt(y,1-v)]:[new vt(c,1-u),new vt(f,1-p),new vt(m,1-x),new vt(g,1-v)]}};function xb(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];e.shapes.push(o.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class xa extends Oe{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],h=[],f=new J,p=new J,_=new J;for(let m=0;m<=n;m++)for(let x=0;x<=s;x++){const y=x/s*o,g=m/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(y),p.y=(t+e*Math.cos(g))*Math.sin(y),p.z=e*Math.sin(g),c.push(p.x,p.y,p.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),_.subVectors(p,f).normalize(),u.push(_.x,_.y,_.z),h.push(x/s),h.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=s;x++){const y=(s+1)*m+x-1,g=(s+1)*(m-1)+x-1,v=(s+1)*(m-1)+x,S=(s+1)*m+x;l.push(y,g,S),l.push(g,v,S)}this.setIndex(l),this.setAttribute("position",new _e(c,3)),this.setAttribute("normal",new _e(u,3)),this.setAttribute("uv",new _e(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xa(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Oc extends Oe{constructor(t=new Cf(new J(-1,-1,0),new J(-1,1,0),new J(1,1,0)),e=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:o};const l=t.computeFrenetFrames(e,o);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const c=new J,u=new J,h=new vt;let f=new J;const p=[],_=[],m=[],x=[];y(),this.setIndex(x),this.setAttribute("position",new _e(p,3)),this.setAttribute("normal",new _e(_,3)),this.setAttribute("uv",new _e(m,2));function y(){for(let w=0;w<e;w++)g(w);g(o===!1?e:0),S(),v()}function g(w){f=t.getPointAt(w/e,f);const P=l.normals[w],N=l.binormals[w];for(let O=0;O<=s;O++){const k=O/s*Math.PI*2,H=Math.sin(k),I=-Math.cos(k);u.x=I*P.x+H*N.x,u.y=I*P.y+H*N.y,u.z=I*P.z+H*N.z,u.normalize(),_.push(u.x,u.y,u.z),c.x=f.x+n*u.x,c.y=f.y+n*u.y,c.z=f.z+n*u.z,p.push(c.x,c.y,c.z)}}function v(){for(let w=1;w<=e;w++)for(let P=1;P<=s;P++){const N=(s+1)*(w-1)+(P-1),O=(s+1)*w+(P-1),k=(s+1)*w+P,H=(s+1)*(w-1)+P;x.push(N,O,H),x.push(O,k,H)}}function S(){for(let w=0;w<=e;w++)for(let P=0;P<=s;P++)h.x=w/e,h.y=P/s,m.push(h.x,h.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Oc(new ya[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class rr extends fr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Xs extends fr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Nf extends tn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Xl=new Ae,_d=new J,vd=new J;class bb{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Cc,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;_d.setFromMatrixPosition(t.matrixWorld),e.position.copy(_d),vd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(vd),e.updateMatrixWorld(),Xl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class wb extends bb{constructor(){super(new gf(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fc extends Nf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(tn.DEFAULT_UP),this.updateMatrix(),this.target=new tn,this.shadow=new wb}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Of extends Nf{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const yd=new Ae;class kf{constructor(t,e,n=0,s=1/0){this.ray=new Ra(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Lc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return yd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(yd),this}intersectObject(t,e=!0,n=[]){return pc(t,this,n,e),n.sort(xd),n}intersectObjects(t,e=!0,n=[]){for(let s=0,o=t.length;s<o;s++)pc(t[s],this,n,e);return n.sort(xd),n}}function xd(i,t){return i.distance-t.distance}function pc(i,t,e,n){if(i.layers.test(t.layers)&&i.raycast(t,e),n===!0){const s=i.children;for(let o=0,l=s.length;o<l;o++)pc(s[o],t,e,!0)}}class bd{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(je(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sc);const wd={type:"change"},ql={type:"start"},Md={type:"end"},sa=new Ra,Sd=new Ii,Mb=Math.cos(70*Dg.DEG2RAD);class Uf extends dr{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new J,this.cursor=new J,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Mr.ROTATE,MIDDLE:Mr.DOLLY,RIGHT:Mr.PAN},this.touches={ONE:Sr.ROTATE,TWO:Sr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",At),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",At),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(wd),n.update(),o=s.NONE},this.update=function(){const D=new J,ht=new cr().setFromUnitVectors(t.up,new J(0,1,0)),Mt=ht.clone().invert(),Rt=new J,Nt=new cr,re=new J,ue=2*Math.PI;return function(ke=null){const me=n.object.position;D.copy(me).sub(n.target),D.applyQuaternion(ht),c.setFromVector3(D),n.autoRotate&&o===s.NONE&&U(R(ke)),n.enableDamping?(c.theta+=u.theta*n.dampingFactor,c.phi+=u.phi*n.dampingFactor):(c.theta+=u.theta,c.phi+=u.phi);let Pe=n.minAzimuthAngle,Ee=n.maxAzimuthAngle;isFinite(Pe)&&isFinite(Ee)&&(Pe<-Math.PI?Pe+=ue:Pe>Math.PI&&(Pe-=ue),Ee<-Math.PI?Ee+=ue:Ee>Math.PI&&(Ee-=ue),Pe<=Ee?c.theta=Math.max(Pe,Math.min(Ee,c.theta)):c.theta=c.theta>(Pe+Ee)/2?Math.max(Pe,c.theta):Math.min(Ee,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let on=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)c.radius=at(c.radius);else{const gn=c.radius;c.radius=at(c.radius*h),on=gn!=c.radius}if(D.setFromSpherical(c),D.applyQuaternion(Mt),me.copy(n.target).add(D),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&O){let gn=null;if(n.object.isPerspectiveCamera){const $n=D.length();gn=at($n*h);const bi=$n-gn;n.object.position.addScaledVector(P,bi),n.object.updateMatrixWorld(),on=!!bi}else if(n.object.isOrthographicCamera){const $n=new J(N.x,N.y,0);$n.unproject(n.object);const bi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),n.object.updateProjectionMatrix(),on=bi!==n.object.zoom;const Ge=new J(N.x,N.y,0);Ge.unproject(n.object),n.object.position.sub(Ge).add($n),n.object.updateMatrixWorld(),gn=D.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;gn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(gn).add(n.object.position):(sa.origin.copy(n.object.position),sa.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(sa.direction))<Mb?t.lookAt(n.target):(Sd.setFromNormalAndCoplanarPoint(n.object.up,n.target),sa.intersectPlane(Sd,n.target))))}else if(n.object.isOrthographicCamera){const gn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/h)),gn!==n.object.zoom&&(n.object.updateProjectionMatrix(),on=!0)}return h=1,O=!1,on||Rt.distanceToSquared(n.object.position)>l||8*(1-Nt.dot(n.object.quaternion))>l||re.distanceToSquared(n.target)>l?(n.dispatchEvent(wd),Rt.copy(n.object.position),Nt.copy(n.object.quaternion),re.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",K),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.domElement.getRootNode().removeEventListener("keydown",Tt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",At),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new bd,u=new bd;let h=1;const f=new J,p=new vt,_=new vt,m=new vt,x=new vt,y=new vt,g=new vt,v=new vt,S=new vt,w=new vt,P=new J,N=new vt;let O=!1;const k=[],H={};let I=!1;function R(D){return D!==null?2*Math.PI/60*n.autoRotateSpeed*D:2*Math.PI/60/60*n.autoRotateSpeed}function W(D){const ht=Math.abs(D*.01);return Math.pow(.95,n.zoomSpeed*ht)}function U(D){u.theta-=D}function F(D){u.phi-=D}const A=function(){const D=new J;return function(Mt,Rt){D.setFromMatrixColumn(Rt,0),D.multiplyScalar(-Mt),f.add(D)}}(),Z=function(){const D=new J;return function(Mt,Rt){n.screenSpacePanning===!0?D.setFromMatrixColumn(Rt,1):(D.setFromMatrixColumn(Rt,0),D.crossVectors(n.object.up,D)),D.multiplyScalar(Mt),f.add(D)}}(),nt=function(){const D=new J;return function(Mt,Rt){const Nt=n.domElement;if(n.object.isPerspectiveCamera){const re=n.object.position;D.copy(re).sub(n.target);let ue=D.length();ue*=Math.tan(n.object.fov/2*Math.PI/180),A(2*Mt*ue/Nt.clientHeight,n.object.matrix),Z(2*Rt*ue/Nt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(A(Mt*(n.object.right-n.object.left)/n.object.zoom/Nt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/Nt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ot(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h/=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?h*=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function rt(D,ht){if(!n.zoomToCursor)return;O=!0;const Mt=n.domElement.getBoundingClientRect(),Rt=D-Mt.left,Nt=ht-Mt.top,re=Mt.width,ue=Mt.height;N.x=Rt/re*2-1,N.y=-(Nt/ue)*2+1,P.set(N.x,N.y,1).unproject(n.object).sub(n.object.position).normalize()}function at(D){return Math.max(n.minDistance,Math.min(n.maxDistance,D))}function j(D){p.set(D.clientX,D.clientY)}function tt(D){rt(D.clientX,D.clientX),v.set(D.clientX,D.clientY)}function Ct(D){x.set(D.clientX,D.clientY)}function Q(D){_.set(D.clientX,D.clientY),m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;U(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(_),n.update()}function it(D){S.set(D.clientX,D.clientY),w.subVectors(S,v),w.y>0?ot(W(w.y)):w.y<0&&q(W(w.y)),v.copy(S),n.update()}function wt(D){y.set(D.clientX,D.clientY),g.subVectors(y,x).multiplyScalar(n.panSpeed),nt(g.x,g.y),x.copy(y),n.update()}function St(D){rt(D.clientX,D.clientY),D.deltaY<0?q(W(D.deltaY)):D.deltaY>0&&ot(W(D.deltaY)),n.update()}function Pt(D){let ht=!1;switch(D.code){case n.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(0,n.keyPanSpeed),ht=!0;break;case n.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(0,-n.keyPanSpeed),ht=!0;break;case n.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?U(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(n.keyPanSpeed,0),ht=!0;break;case n.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?U(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(-n.keyPanSpeed,0),ht=!0;break}ht&&(D.preventDefault(),n.update())}function It(D){if(k.length===1)p.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);p.set(Mt,Rt)}}function Ut(D){if(k.length===1)x.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);x.set(Mt,Rt)}}function st(D){const ht=te(D),Mt=D.pageX-ht.x,Rt=D.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);v.set(0,Nt)}function xt(D){n.enableZoom&&st(D),n.enablePan&&Ut(D)}function bt(D){n.enableZoom&&st(D),n.enableRotate&&It(D)}function E(D){if(k.length==1)_.set(D.pageX,D.pageY);else{const Mt=te(D),Rt=.5*(D.pageX+Mt.x),Nt=.5*(D.pageY+Mt.y);_.set(Rt,Nt)}m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;U(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(_)}function et(D){if(k.length===1)y.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);y.set(Mt,Rt)}g.subVectors(y,x).multiplyScalar(n.panSpeed),nt(g.x,g.y),x.copy(y)}function $(D){const ht=te(D),Mt=D.pageX-ht.x,Rt=D.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);S.set(0,Nt),w.set(0,Math.pow(S.y/v.y,n.zoomSpeed)),ot(w.y),v.copy(S);const re=(D.pageX+ht.x)*.5,ue=(D.pageY+ht.y)*.5;rt(re,ue)}function C(D){n.enableZoom&&$(D),n.enablePan&&et(D)}function M(D){n.enableZoom&&$(D),n.enableRotate&&E(D)}function B(D){n.enabled!==!1&&(k.length===0&&(n.domElement.setPointerCapture(D.pointerId),n.domElement.addEventListener("pointermove",X),n.domElement.addEventListener("pointerup",K)),!oe(D)&&(Kt(D),D.pointerType==="touch"?Ht(D):G(D)))}function X(D){n.enabled!==!1&&(D.pointerType==="touch"?zt(D):ft(D))}function K(D){switch(Vt(D),k.length){case 0:n.domElement.releasePointerCapture(D.pointerId),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.dispatchEvent(Md),o=s.NONE;break;case 1:const ht=k[0],Mt=H[ht];Ht({pointerId:ht,pageX:Mt.x,pageY:Mt.y});break}}function G(D){let ht;switch(D.button){case 0:ht=n.mouseButtons.LEFT;break;case 1:ht=n.mouseButtons.MIDDLE;break;case 2:ht=n.mouseButtons.RIGHT;break;default:ht=-1}switch(ht){case Mr.DOLLY:if(n.enableZoom===!1)return;tt(D),o=s.DOLLY;break;case Mr.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enablePan===!1)return;Ct(D),o=s.PAN}else{if(n.enableRotate===!1)return;j(D),o=s.ROTATE}break;case Mr.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enableRotate===!1)return;j(D),o=s.ROTATE}else{if(n.enablePan===!1)return;Ct(D),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(ql)}function ft(D){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;Q(D);break;case s.DOLLY:if(n.enableZoom===!1)return;it(D);break;case s.PAN:if(n.enablePan===!1)return;wt(D);break}}function lt(D){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(D.preventDefault(),n.dispatchEvent(ql),St(pt(D)),n.dispatchEvent(Md))}function pt(D){const ht=D.deltaMode,Mt={clientX:D.clientX,clientY:D.clientY,deltaY:D.deltaY};switch(ht){case 1:Mt.deltaY*=16;break;case 2:Mt.deltaY*=100;break}return D.ctrlKey&&!I&&(Mt.deltaY*=10),Mt}function Tt(D){D.key==="Control"&&(I=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(D){D.key==="Control"&&(I=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function At(D){n.enabled===!1||n.enablePan===!1||Pt(D)}function Ht(D){switch(ae(D),k.length){case 1:switch(n.touches.ONE){case Sr.ROTATE:if(n.enableRotate===!1)return;It(D),o=s.TOUCH_ROTATE;break;case Sr.PAN:if(n.enablePan===!1)return;Ut(D),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case Sr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;xt(D),o=s.TOUCH_DOLLY_PAN;break;case Sr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;bt(D),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(ql)}function zt(D){switch(ae(D),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;E(D),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;et(D),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;C(D),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;M(D),n.update();break;default:o=s.NONE}}function Dt(D){n.enabled!==!1&&D.preventDefault()}function Kt(D){k.push(D.pointerId)}function Vt(D){delete H[D.pointerId];for(let ht=0;ht<k.length;ht++)if(k[ht]==D.pointerId){k.splice(ht,1);return}}function oe(D){for(let ht=0;ht<k.length;ht++)if(k[ht]==D.pointerId)return!0;return!1}function ae(D){let ht=H[D.pointerId];ht===void 0&&(ht=new vt,H[D.pointerId]=ht),ht.set(D.pageX,D.pageY)}function te(D){const ht=D.pointerId===k[0]?k[1]:k[0];return H[ht]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",K),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Tt,{passive:!0,capture:!0}),this.update()}}let oa=null;function kc(i){return oa||(oa=new Promise(t=>{const e=i.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new Mf({canvas:i,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=qd,o.toneMappingExposure=1,yt.renderer=o;const l=new Sf;l.background=new Qt(12113128),yt.scene=l;const c=new En(45,n/s,.5,8e3);c.position.set(0,200,350),yt.camera=c;const u=new Uf(c,i);u.enableDamping=!0,u.dampingFactor=.07,u.minDistance=10,u.maxDistance=4e3,u.screenSpacePanning=!0,u.maxPolarAngle=Math.PI/2,yt.controls=u,l.add(new Of(16777215,.78));const h=new fc(16775924,.95);h.position.set(-250,700,200),l.add(h);const f=new fc(14544639,.4);f.position.set(200,250,-200),l.add(f);const p=new Jr;l.add(p),yt.tg=p,window.addEventListener("resize",()=>{const m=e.clientWidth,x=e.clientHeight;!m||!x||(c.aspect=m/x,c.updateProjectionMatrix(),o.setSize(m,x))});function _(){requestAnimationFrame(_),u.update(),o.render(l,c)}_(),t()}),oa)}function Sb(){if(yt.tg)for(;yt.tg.children.length;){const i=yt.tg.children[0];yt.tg.remove(i),i.geometry?.dispose(),Array.isArray(i.material)?i.material.forEach(t=>t.dispose()):i.material?.dispose()}}const Eb="#f0ede8",Tb="#c0bbb5",Ab="#0fe300",Lb="#0fe300",Cb="#0fe300",Pb="#0fe300",Rb="#262626",Vr="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function zf(i,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:u,BASE_H:h}=yt;if(!e||!n)return h;const f=(i+s/2)/s*(n-1),p=(t+o/2)/o*(n-1),_=Math.max(0,Math.min(n-2,Math.floor(f))),m=Math.max(0,Math.min(n-2,Math.floor(p))),x=f-_,y=p-m,g=e[m*n+_]??l,v=e[m*n+_+1]??l,S=e[(m+1)*n+_]??l,w=e[(m+1)*n+_+1]??l,P=g*(1-x)*(1-y)+v*x*(1-y)+S*(1-x)*y+w*x*y;return h+Math.max(0,Math.min(1,(P-l)/Math.max(.001,c)))*u}function aa(i,t,e){if(!i.positions.length||!i.indices.length)return null;const n=new Oe;n.setAttribute("position",new Ln(i.positions,3)),i.colors&&n.setAttribute("color",new Ln(i.colors,3)),n.setIndex(new Ln(i.indices,1)),n.computeVertexNormals();const s=new Ne(n,t);return s.name=e,s}function Ib(i){if(!yt.tg)return;Sb();const t=Bd(),e=yt.tg;function n(o,l,c,u=-8){l.polygonOffset=!0,l.polygonOffsetFactor=u,l.polygonOffsetUnits=u;const h=aa(o,l,c);h&&e.add(h)}const s=(o,l=.95,c=!1)=>new rr({color:new Qt(o),roughness:l,metalness:0,flatShading:c});{const o=new rr({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:fn,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=aa(i.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=Db(yt.wMm,yt.dMm,yt.zoneType);if(o){const l=new so(o,{depth:yt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new Ne(l,new rr({color:new Qt(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if(Nb(t.cBase),i.GROUND.positions.length){const o=new rr({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=aa(i.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(i.LAND,s(Eb),"LAND",-2),n(i.ROCK,s(Tb),"ROCK",-3),n(i.FARM,s(Pb),"FARM",-4),n(i.GRASS,s(Ab),"GRASS",-5),n(i.PARKS,s(Cb),"PARKS",-6),n(i.FOREST,s(Lb),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=fn,n(i.WATER,o,"WATER",-8)}if(t.roadsOn){n(i.PED,s(Rb,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=fn,n(i.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(i.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),i.GPX.positions.length){const o=new rr({color:new Qt(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=aa(i.GPX,o,"GPX");l&&e.add(l)}Ub()}function Db(i,t,e){const n=new Na;if(e==="circ")n.ellipse(0,0,i/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(i/2*Math.cos(o),i/2*Math.sin(o)):n.lineTo(i/2*Math.cos(o),i/2*Math.sin(o))}n.closePath()}else n.moveTo(-i/2,-t/2),n.lineTo(i/2,-t/2),n.lineTo(i/2,t/2),n.lineTo(-i/2,t/2),n.closePath();return n}function Nb(i){if(!yt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=yt,o=new rr({color:new Qt(i),roughness:.55,side:fn});function l(u,h){return{x:u,z:h,topY:Math.max(n,zf(u*.98,h*.98))}}function c(u){const h=[],f=[];let p=0;const _=u.length;for(let y=0;y<_;y++){const g=u[y],v=u[(y+1)%_],S=(g.x+v.x)/2,w=(g.z+v.z)/2,P=S*(v.z-g.z)-w*(v.x-g.x),[N,O]=P>=0?[g,v]:[v,g];h.push(N.x,N.topY,N.z,O.x,O.topY,O.z,O.x,0,O.z,N.x,0,N.z),f.push(p,p+1,p+2,p,p+2,p+3),p+=4}if(!h.length)return;const m=new Oe;m.setAttribute("position",new _e(h,3)),m.setIndex(f),m.computeVertexNormals();const x=new Ne(m,o);x.name="WALLS",yt.tg.add(x)}if(s==="circ"){const h=t/2;c(Array.from({length:512},(f,p)=>{const _=p/512*Math.PI*2;return l(h*Math.cos(_),h*Math.sin(_))}))}else if(s==="hex"){const u=t/2;c(Array.from({length:6},(h,f)=>{const p=f/6*Math.PI*2-Math.PI/6;return l(u*Math.cos(p),u*Math.sin(p))}))}else if(yt.zonePts&&yt.zonePts.length>=3&&yt.bounds){const{bounds:u}=yt,h=e/(u.maxLat-u.minLat),f=t/(u.maxLon-u.minLon),p=(u.minLat+u.maxLat)/2,_=(u.minLon+u.maxLon)/2;c(yt.zonePts.map(([m,x])=>l((x-_)*f,-(m-p)*h)))}else{const u=-t/2,h=t/2,f=-e/2,p=e/2;c([l(u,f),l(h,f),l(h,p),l(u,p)])}}const Ob=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function jl(i){const t=[],e=[];let n=0;for(const o of i){const l=o.attributes.position,c=o.index;for(let u=0;u<l.count;u++)t.push(l.getX(u),l.getY(u),l.getZ(u));if(c)for(let u=0;u<c.count;u++)e.push(c.getX(u)+n);else for(let u=0;u<l.count;u++)e.push(u+n);n+=l.count,o.dispose()}const s=new Oe;return s.setAttribute("position",new _e(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function kb(i,t,e,n){const s=t/2,o=n/2;try{switch(i){case"eiffel":{const l=[new vt(s,0),new vt(s*.82,e*.035),new vt(s*.58,e*.08),new vt(s*.32,e*.135),new vt(s*.265,e*.165),new vt(s*.285,e*.175),new vt(s*.245,e*.188),new vt(s*.18,e*.23),new vt(s*.13,e*.33),new vt(s*.115,e*.348),new vt(s*.13,e*.358),new vt(s*.11,e*.37),new vt(s*.08,e*.43),new vt(s*.048,e*.6),new vt(s*.026,e*.83),new vt(s*.01,e*.94),new vt(0,e)],c=new ir(l,4);c.rotateY(Math.PI/4);const u=new $s(s*.32,s*.32,e*.012,16,1,!1);u.translate(0,e*.175,0);const h=new $s(s*.145,s*.145,e*.01,16,1,!1);return h.translate(0,e*.358,0),jl([c,u,h])}case"burj":{const l=[new vt(s,0),new vt(s*.8,e*.15),new vt(s*.55,e*.4),new vt(s*.25,e*.72),new vt(s*.08,e*.9),new vt(s*.02,e)];return new ir(l,12)}case"dome":{const c=Array.from({length:13},(u,h)=>{const f=h/12*Math.PI/2;return new vt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new vt(s*.9,0),new vt(0,0)),new ir(c,16)}case"onion":{const l=[new vt(s*.3,0),new vt(s*.55,e*.12),new vt(s,e*.4),new vt(s*.55,e*.65),new vt(s*.1,e*.85),new vt(s*.04,e)];return new ir(l,12)}case"tower":{const l=[new vt(s,0),new vt(s*.65,e*.2),new vt(s*.3,e*.55),new vt(s*.1,e*.8),new vt(s*.03,e)];return new ir(l,8)}case"pyramid":{const l=new Nc(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,u=new hn(l,c,n);u.translate(-s+l/2,c/2,0);const h=new hn(l,c,n);h.translate(s-l/2,c/2,0);const f=new hn(t,e*.22,n);return f.translate(0,e*.89,0),jl([u,h,f])}case"cathedral":{const l=t*.55,c=e*.65,u=t*.14,h=new hn(l,c,n);h.translate(0,c/2,0);const f=new hn(u,e,u);f.translate(-l/2+u/2,e/2,-o+u/2);const p=new hn(u,e,u);return p.translate(l/2-u/2,e/2,-o+u/2),jl([h,f,p])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,u=new xa(l,Math.max(c,3),8,32);return u.scale(1,e/(l*.8),o/s),u.translate(0,e/2,0),u}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],u=new Oe;return u.setAttribute("position",new _e(l,3)),u.setIndex(c),u.computeVertexNormals(),u}case"wheel":{const l=Math.min(s,e/2),c=new xa(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new hn(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function Ub(){if(!yt.tg||!yt.bounds||!yt.elevGrid)return;const{bounds:i,wMm:t,dMm:e,mmPerMeter:n}=yt,s=(i.minLat+i.maxLat)/2,o=(i.minLon+i.maxLon)/2,l=e/(i.maxLat-i.minLat),c=t/(i.maxLon-i.minLon),u=.01;let h=0;for(const f of Ob){if(f.lat<i.minLat-u||f.lat>i.maxLat+u||f.lon<i.minLon-u||f.lon>i.maxLon+u)continue;const p=(f.lon-o)*c,_=-(f.lat-s)*l,m=t/2,x=e/2;if(!(p>=-m-1&&p<=m+1&&_>=-x-1&&_<=x+1))continue;const g=zf(p,_),v=Math.min(t*.25,Math.max(5,f.rH*n*2)),S=Math.min(t*.08,Math.max(1.5,f.rW*n)),w=Math.min(t*.08,Math.max(1.5,f.rD*n)),P=kb(f.sh,S,v,w);if(!P)continue;P.translate(p,g,_);const N=new Ne(P,new rr({color:new Qt(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));N.name="LM_"+f.n,yt.tg.add(N),h++}h&&console.log(`Landmarks: ${h} monument(s)`)}var ss=Math.pow,sn=(i,t,e)=>new Promise((n,s)=>{var o=u=>{try{c(e.next(u))}catch(h){s(h)}},l=u=>{try{c(e.throw(u))}catch(h){s(h)}},c=u=>u.done?n(u.value):Promise.resolve(u.value).then(o,l);c((e=e.apply(i,t)).next())}),Tn=Uint8Array,qs=Uint16Array,zb=Int32Array,Bf=new Tn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ff=new Tn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Bb=new Tn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Hf=function(i,t){for(var e=new qs(31),n=0;n<31;++n)e[n]=t+=1<<i[n-1];for(var s=new zb(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},Vf=Hf(Bf,2),Gf=Vf.b,Fb=Vf.r;Gf[28]=258,Fb[258]=28;var Hb=Hf(Ff,0),Vb=Hb.b,Wf=new qs(32768);for(pe=0;pe<32768;++pe)_i=(pe&43690)>>1|(pe&21845)<<1,_i=(_i&52428)>>2|(_i&13107)<<2,_i=(_i&61680)>>4|(_i&3855)<<4,Wf[pe]=((_i&65280)>>8|(_i&255)<<8)>>1;var _i,pe,js=function(i,t,e){for(var n=i.length,s=0,o=new qs(t);s<n;++s)i[s]&&++o[i[s]-1];var l=new qs(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new qs(1<<t);var u=15-t;for(s=0;s<n;++s)if(i[s])for(var h=s<<4|i[s],f=t-i[s],p=l[i[s]-1]++<<f,_=p|(1<<f)-1;p<=_;++p)c[Wf[p]>>u]=h}return c},oo=new Tn(288);for(pe=0;pe<144;++pe)oo[pe]=8;var pe;for(pe=144;pe<256;++pe)oo[pe]=9;var pe;for(pe=256;pe<280;++pe)oo[pe]=7;var pe;for(pe=280;pe<288;++pe)oo[pe]=8;var pe,Zf=new Tn(32);for(pe=0;pe<32;++pe)Zf[pe]=5;var pe,Gb=js(oo,9),Wb=js(Zf,5),Yl=function(i){for(var t=i[0],e=1;e<i.length;++e)i[e]>t&&(t=i[e]);return t},Hn=function(i,t,e){var n=t/8|0;return(i[n]|i[n+1]<<8)>>(t&7)&e},$l=function(i,t){var e=t/8|0;return(i[e]|i[e+1]<<8|i[e+2]<<16)>>(t&7)},Zb=function(i){return(i+7)/8|0},Xb=function(i,t,e){(e==null||e>i.length)&&(e=i.length);var n=new Tn(e-t);return n.set(i.subarray(t,e)),n},qb=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Sn=function(i,t,e){var n=new Error(t||qb[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Sn),!e)throw n;return n},Uc=function(i,t,e,n){var s=i.length,o=0;if(!s||t.f&&!t.l)return e||new Tn(0);var l=!e||t.i!=2,c=t.i;e||(e=new Tn(s*3));var u=function(Ut){var st=e.length;if(Ut>st){var xt=new Tn(Math.max(st*2,Ut));xt.set(e),e=xt}},h=t.f||0,f=t.p||0,p=t.b||0,_=t.l,m=t.d,x=t.m,y=t.n,g=s*8;do{if(!_){h=Hn(i,f,1);var v=Hn(i,f+1,3);if(f+=3,v)if(v==1)_=Gb,m=Wb,x=9,y=5;else if(v==2){var N=Hn(i,f,31)+257,O=Hn(i,f+10,15)+4,k=N+Hn(i,f+5,31)+1;f+=14;for(var H=new Tn(k),I=new Tn(19),R=0;R<O;++R)I[Bb[R]]=Hn(i,f+R*3,7);f+=O*3;for(var W=Yl(I),U=(1<<W)-1,F=js(I,W),R=0;R<k;){var A=F[Hn(i,f,U)];f+=A&15;var S=A>>4;if(S<16)H[R++]=S;else{var Z=0,nt=0;for(S==16?(nt=3+Hn(i,f,3),f+=2,Z=H[R-1]):S==17?(nt=3+Hn(i,f,7),f+=3):S==18&&(nt=11+Hn(i,f,127),f+=7);nt--;)H[R++]=Z}}var ot=H.subarray(0,N),q=H.subarray(N);x=Yl(ot),y=Yl(q),_=js(ot,x),m=js(q,y)}else Sn(1);else{var S=Zb(f)+4,w=i[S-4]|i[S-3]<<8,P=S+w;if(P>s){c&&Sn(0);break}l&&u(p+w),e.set(i.subarray(S,P),p),t.b=p+=w,t.p=f=P*8,t.f=h;continue}if(f>g){c&&Sn(0);break}}l&&u(p+131072);for(var rt=(1<<x)-1,at=(1<<y)-1,j=f;;j=f){var Z=_[$l(i,f)&rt],tt=Z>>4;if(f+=Z&15,f>g){c&&Sn(0);break}if(Z||Sn(2),tt<256)e[p++]=tt;else if(tt==256){j=f,_=null;break}else{var Ct=tt-254;if(tt>264){var R=tt-257,Q=Bf[R];Ct=Hn(i,f,(1<<Q)-1)+Gf[R],f+=Q}var it=m[$l(i,f)&at],wt=it>>4;it||Sn(3),f+=it&15;var q=Vb[wt];if(wt>3){var Q=Ff[wt];q+=$l(i,f)&(1<<Q)-1,f+=Q}if(f>g){c&&Sn(0);break}l&&u(p+131072);var St=p+Ct;if(p<q){var Pt=o-q,It=Math.min(q,St);for(Pt+p<0&&Sn(3);p<It;++p)e[p]=n[Pt+p]}for(;p<St;p+=4)e[p]=e[p-q],e[p+1]=e[p+1-q],e[p+2]=e[p+2-q],e[p+3]=e[p+3-q];p=St}}t.l=_,t.p=j,t.b=p,t.f=h,_&&(h=1,t.m=x,t.d=m,t.n=y)}while(!h);return p==e.length?e:Xb(e,0,p)},jb=new Tn(0),Yb=function(i){(i[0]!=31||i[1]!=139||i[2]!=8)&&Sn(6,"invalid gzip data");var t=i[3],e=10;t&4&&(e+=(i[10]|i[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!i[e++]);return e+(t&2)},$b=function(i){var t=i.length;return(i[t-4]|i[t-3]<<8|i[t-2]<<16|i[t-1]<<24)>>>0},Kb=function(i,t){return((i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31)&&Sn(6,"invalid zlib data"),(i[1]>>5&1)==1&&Sn(6,"invalid zlib data: "+(i[1]&32?"need":"unexpected")+" dictionary"),(i[1]>>3&4)+2};function Jb(i,t){return Uc(i,{i:2},t,t)}function Qb(i,t){var e=Yb(i);return e+8>i.length&&Sn(6,"invalid gzip data"),Uc(i.subarray(e,-8),{i:2},new Tn($b(i)),t)}function t1(i,t){return Uc(i.subarray(Kb(i),-4),{i:2},t,t)}function mc(i,t){return i[0]==31&&i[1]==139&&i[2]==8?Qb(i,t):(i[0]&15)!=8||i[0]>>4>7||(i[0]<<8|i[1])%31?Jb(i,t):t1(i,t)}var e1=typeof TextDecoder<"u"&&new TextDecoder,n1=0;try{e1.decode(jb,{stream:!0}),n1=1}catch{}var Xf=(i,t)=>i*ss(2,t),ks=(i,t)=>Math.floor(i/ss(2,t)),ba=(i,t)=>Xf(i.getUint16(t+1,!0),8)+i.getUint8(t),qf=(i,t)=>Xf(i.getUint32(t+2,!0),16)+i.getUint16(t,!0),i1=(i,t,e,n,s)=>{if(i!==n.getUint8(s))return i-n.getUint8(s);const o=ba(n,s+1);if(t!==o)return t-o;const l=ba(n,s+4);return e!==l?e-l:0},r1=(i,t,e,n)=>{const s=jf(i,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},Ed=(i,t,e,n)=>{const s=jf(i,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},jf=(i,t,e,n)=>{let s=0,o=i.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=i1(t,e,n,i,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[qf(i,l*17+7),i.getUint32(l*17+13,!0)]}return null},s1=(i,t)=>i.isDir&&!t.isDir?1:!i.isDir&&t.isDir?-1:i.z!==t.z?i.z-t.z:i.x!==t.x?i.x-t.x:i.y-t.y,Yf=(i,t)=>{const e=i.getUint8(t*17);return{z:e&127,x:ba(i,t*17+1),y:ba(i,t*17+4),offset:qf(i,t*17+7),length:i.getUint32(t*17+13,!0),isDir:e>>7===1}},Td=i=>{const t=[],e=new DataView(i);for(let n=0;n<e.byteLength/17;n++)t.push(Yf(e,n));return o1(t)},o1=i=>{i.sort(s1);const t=new ArrayBuffer(17*i.length),e=new Uint8Array(t);for(let n=0;n<i.length;n++){const s=i[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=ks(s.offset,8)&255,e[n*17+9]=ks(s.offset,16)&255,e[n*17+10]=ks(s.offset,24)&255,e[n*17+11]=ks(s.offset,32)&255,e[n*17+12]=ks(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},a1=(i,t)=>{if(i.byteLength<17)return null;const e=i.byteLength/17,n=Yf(i,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function l1(i){return sn(this,null,function*(){const t=yield i.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let u=0;"minzoom"in l&&(u=+l.minzoom);let h=0;"maxzoom"in l&&(h=+l.maxzoom);let f=0,p=0,_=0,m=-180,x=-85,y=180,g=85;if(l.bounds){const S=l.bounds.split(",");m=+S[0],x=+S[1],y=+S[2],g=+S[3]}if(l.center){const S=l.center.split(",");f=+S[0],p=+S[1],_=+S[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:u,maxZoom:h,minLon:m,minLat:x,maxLon:y,maxLat:g,centerZoom:_,centerLon:f,centerLat:p,etag:t.etag}})}function c1(i,t,e,n,s,o,l){return sn(this,null,function*(){let c=yield e.getArrayBuffer(t,i.rootDirectoryOffset,i.rootDirectoryLength,i);i.specVersion===1&&(c=Td(c));const u=Ed(new DataView(c),n,s,o);if(u){let p=(yield t.getBytes(u.offset,u.length,l)).data;const _=new DataView(p);return _.getUint8(0)===31&&_.getUint8(1)===139&&(p=mc(new Uint8Array(p))),{data:p}}const h=a1(new DataView(c),{z:n,x:s,y:o});if(h){const f=r1(new DataView(c),h.z,h.x,h.y);if(f){let p=yield e.getArrayBuffer(t,f.offset,f.length,i);i.specVersion===1&&(p=Td(p));const _=Ed(new DataView(p),n,s,o);if(_){let x=(yield t.getBytes(_.offset,_.length,l)).data;const y=new DataView(x);return y.getUint8(0)===31&&y.getUint8(1)===139&&(x=mc(new Uint8Array(x))),{data:x}}}}})}var $f={getHeader:l1,getZxy:c1};function Gr(i,t){return(t>>>0)*4294967296+(i>>>0)}function u1(i,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return Gr(i,s);throw new Error("Expected varint not more than 10 bytes")}function Us(i){const t=i.buf;let e=t[i.pos++],n=e&127;return e<128||(e=t[i.pos++],n|=(e&127)<<7,e<128)||(e=t[i.pos++],n|=(e&127)<<14,e<128)||(e=t[i.pos++],n|=(e&127)<<21,e<128)?n:(e=t[i.pos],n|=(e&15)<<28,u1(n,i))}function h1(i,t,e,n){if(n===0){e===1&&(t[0]=i-1-t[0],t[1]=i-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var d1=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function f1(i,t,e){if(i>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>ss(2,i)-1||e>ss(2,i)-1)throw Error("tile x/y outside zoom level bounds");const n=d1[i],s=ss(2,i);let o=0,l=0,c=0;const u=[t,e];let h=s/2;for(;h>0;)o=(u[0]&h)>0?1:0,l=(u[1]&h)>0?1:0,c+=h*h*(3*o^l),h1(h,u,o,l),h=h/2;return n+c}function Kf(i,t){return sn(this,null,function*(){if(t===1||t===0)return i;if(t===2){if(typeof globalThis.DecompressionStream>"u")return mc(new Uint8Array(i));const e=new Response(i).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function p1(i){return i===1?".mvt":i===2?".png":i===3?".jpg":i===4?".webp":i===5?".avif":""}var m1=127;function g1(i,t){let e=0,n=i.length-1;for(;e<=n;){const s=n+e>>1,o=t-i[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return i[s]}return n>=0&&(i[n].runLength===0||t-i[n].tileId<i[n].runLength)?i[n]:null}var _1=class{constructor(i,t=new Headers){this.url=i,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(i){this.customHeaders=i}getBytes(i,t,e,n){return sn(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${i}-${i+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let u=yield fetch(this.url,{signal:o,cache:c,headers:l});if(i===0&&u.status===416){const _=u.headers.get("Content-Range");if(!_||!_.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const m=+_.substr(8);u=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${m-1}`}})}let h=u.headers.get("Etag");if(h?.startsWith("W/")&&(h=null),u.status===416||n&&h&&h!==n)throw this.mustReload=!0,new gc(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(u.status>=300)throw Error(`Bad response code: ${u.status}`);const f=u.headers.get("Content-Length");if(u.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield u.arrayBuffer(),etag:h||void 0,cacheControl:u.headers.get("Cache-Control")||void 0,expires:u.headers.get("Expires")||void 0}})}};function Vn(i,t){const e=i.getUint32(t+4,!0),n=i.getUint32(t+0,!0);return e*ss(2,32)+n}function v1(i,t){const e=new DataView(i),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:Vn(e,8),rootDirectoryLength:Vn(e,16),jsonMetadataOffset:Vn(e,24),jsonMetadataLength:Vn(e,32),leafDirectoryOffset:Vn(e,40),leafDirectoryLength:Vn(e,48),tileDataOffset:Vn(e,56),tileDataLength:Vn(e,64),numAddressedTiles:Vn(e,72),numTileEntries:Vn(e,80),numTileContents:Vn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function Jf(i){const t={buf:new Uint8Array(i),pos:0},e=Us(t),n=[];let s=0;for(let o=0;o<e;o++){const l=Us(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=Us(t);for(let o=0;o<e;o++)n[o].length=Us(t);for(let o=0;o<e;o++){const l=Us(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function y1(i){const t=new DataView(i);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var gc=class extends Error{};function x1(i,t){return sn(this,null,function*(){const e=yield i.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(y1(e.data)<3)return[yield $f.getHeader(i)];const s=e.data.slice(0,m1),o=v1(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${i.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,u=Jf(yield t(l,o.internalCompression));return[o,[c,u.length,u]]})}function b1(i,t,e,n,s){return sn(this,null,function*(){const o=yield i.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=Jf(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var w1=class{constructor(i=100,t=!0,e=Kf){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=i,this.counter=1,this.decompress=e}getHeader(i){return sn(this,null,function*(){const t=i.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{x1(i,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(i,t,e,n){return sn(this,null,function*(){const s=`${i.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{b1(i,this.decompress,t,e,n).then(h=>{c(h),this.prune()}).catch(h=>{u(h)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(i,t,e,n){return sn(this,null,function*(){const s=`${i.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{i.getBytes(t,e,void 0,n.etag).then(h=>{c(h.data),this.cache.has(s),this.prune()}).catch(h=>{u(h)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let i=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<i&&(i=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(i){return sn(this,null,function*(){const t=i.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(i.getKey());const e=new Promise((n,s)=>{this.getHeader(i).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},M1=class{constructor(i,t,e){typeof i=="string"?this.source=new _1(i):this.source=i,e?this.decompress=e:this.decompress=Kf,t?this.cache=t:this.cache=new w1}getHeader(){return sn(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(i,t,e,n){return sn(this,null,function*(){const s=f1(i,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return $f.getZxy(o,this.source,this.cache,i,t,e,n);if(i<o.minZoom||i>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let u=0;u<=3;u++){const h=yield this.cache.getDirectory(this.source,l,c,o),f=g1(h,s);if(f){if(f.runLength>0){const p=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(p.data,o.tileCompression),cacheControl:p.cacheControl,expires:p.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(i,t,e,n){return sn(this,null,function*(){try{return yield this.getZxyAttempt(i,t,e,n)}catch(s){if(s instanceof gc)return this.cache.invalidate(this.source),yield this.getZxyAttempt(i,t,e,n);throw s}})}getMetadataAttempt(){return sn(this,null,function*(){const i=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(i.jsonMetadataOffset,i.jsonMetadataLength,void 0,i.etag),e=yield this.decompress(t.data,i.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return sn(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(i){if(i instanceof gc)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw i}})}getTileJson(i){return sn(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=p1(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${i}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const Kl=new Map;function S1(i){return Kl.has(i)||Kl.set(i,new M1(i)),Kl.get(i)}function E1(i,t){const e=[];let n=0;const s=new Uint8Array(i);function o(){let h=0,f=0;for(;n<s.length;){const p=s[n++];if(h|=(p&127)<<f,!(p&128))break;f+=7}return h}function l(){if(n>=s.length)return null;const h=o();return{field:h>>3,wire:h&7}}function c(h){if(h===0)o();else if(h===2){const f=o();n+=f}else h===5?n+=4:h===1&&(n+=8)}function u(){const h=o(),f=new Uint8Array(i,n,h);return n+=h,new TextDecoder().decode(f)}for(;n<s.length;){const h=l();if(!h)break;if(h.field===3&&h.wire===2){const f=o(),p=n+f;let _="";const m=[],x=[],y=[];for(;n<p;){const g=l();if(!g)break;if(g.field===1&&g.wire===2)_=u();else if(g.field===3&&g.wire===2)m.push(u());else if(g.field===4&&g.wire===2){const v=o(),S=n+v;for(;n<S;){const w=l();if(!w)break;if(w.wire===2){const P=o(),N=new Uint8Array(i,n,P);n+=P,x.push(new TextDecoder().decode(N))}else w.field===5&&w.wire===0?x.push(o()!==0):w.field===6&&w.wire===0||w.field===7&&w.wire===0?x.push(o()):c(w.wire)}}else if(g.field===5&&g.wire===0)o();else if(g.field===2&&g.wire===2){const v=o(),S=n+v;let w=0;const P=[],N=[];for(;n<S;){const O=l();if(!O)break;if(O.field===3&&O.wire===0)w=o();else if(O.field===2&&O.wire===2){const k=o(),H=n+k;for(;n<H;)P.push(o())}else if(O.field===4&&O.wire===2){const k=o(),H=n+k;for(;n<H;)N.push(o())}else c(O.wire)}y.push({type:w,tags:P,geom:N})}else c(g.wire)}if(n=p,t&&t!==_)continue;for(const g of y){const v={};for(let I=0;I<g.tags.length-1;I+=2)v[m[g.tags[I]]]=x[g.tags[I+1]]??null;const S=[];let w=0,P=0,N=[],O=0,k=0,H=0;for(;H<g.geom.length;){if(k===0){const I=g.geom[H++];O=I&7,k=I>>3}if(O===1||O===2){O===1&&N.length>=2&&(S.push(N),N=[]);const I=Ad(g.geom[H++]),R=Ad(g.geom[H++]);w+=I,P+=R,N.push({lat:P,lon:w}),k--}else O===7?(N.length>=2&&(S.push(N),N=[]),k--):(H++,k--)}N.length>=2&&S.push(N),e.push({layer:_,type:g.type,properties:v,rings:S})}}else c(h.wire)}return e}function Ad(i){return i>>1^-(i&1)}function T1(i,t,e,n,s,o){const l=2**e,c=(i+n/o)/l,u=(t+s/o)/l,h=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI,lon:h}}async function A1(i,t){const s=[{path:`${Vr}/buildings.pmtiles`,z:14,name:"building"},{path:`${Vr}/transportation.pmtiles`,z:14,name:"segment"},{path:`${Vr}/base.pmtiles`,z:13,name:"water"},{path:`${Vr}/base.pmtiles`,z:13,name:"land"},{path:`${Vr}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${Vr}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:u,name:h}of s){try{const f=S1(c),p=(y,g)=>{const v=2**u,S=Math.floor((g+180)/360*v),w=y*Math.PI/180,P=Math.floor((1-Math.log(Math.tan(w)+1/Math.cos(w))/Math.PI)/2*v);return{x:S,y:P}},_=p(i.maxLat,i.minLon),m=p(i.minLat,i.maxLon),x=[];for(let y=_.y;y<=m.y;y++)for(let g=_.x;g<=m.x;g++)x.push((async(v,S)=>{try{const w=await f.getZxy(u,v,S);if(!w)return;const P=E1(w.data,h);for(const N of P){for(const O of N.rings)for(const k of O){const H=T1(v,S,u,k.lon,k.lat,4096);k.lat=H.lat,k.lon=H.lon}o.push(N)}}catch{}})(g,y));await Promise.all(x)}catch{}l++,t(Math.round(l/s.length*100))}return o}function Qf(i="terrain3d.stl"){if(!yt.tg)return;const t=[];new J;const e=new J;if(yt.tg.traverse(m=>{if(!(m instanceof Ne))return;const x=m.geometry,y=x.attributes.position;if(!y)return;const g=x.index,v=m.matrixWorld;function S(w){const P=new J(y.getX(w),y.getY(w),y.getZ(w));return P.applyMatrix4(v),P}if(g)for(let w=0;w<g.count;w+=3)t.push([S(g.getX(w)),S(g.getX(w+1)),S(g.getX(w+2))]);else for(let w=0;w<y.count;w+=3)t.push([S(w),S(w+1),S(w+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let m=0;m<Math.min(l.length,80);m++)s.setUint8(m,l[m]);s.setUint32(80,t.length,!0);let c=84;const u=new J,h=new J;for(const[m,x,y]of t){u.subVectors(x,m),h.subVectors(y,m),e.crossVectors(u,h).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const g of[m,x,y])s.setFloat32(c,g.x,!0),c+=4,s.setFloat32(c,g.y,!0),c+=4,s.setFloat32(c,g.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=i,_.click(),URL.revokeObjectURL(p),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function la(i){throw new Error('Could not dynamically require "'+i+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var tp={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(i,t){(function(e){i.exports=e()})(function(){return function e(n,s,o){function l(h,f){if(!s[h]){if(!n[h]){var p=typeof la=="function"&&la;if(!f&&p)return p(h,!0);if(c)return c(h,!0);var _=new Error("Cannot find module '"+h+"'");throw _.code="MODULE_NOT_FOUND",_}var m=s[h]={exports:{}};n[h][0].call(m.exports,function(x){var y=n[h][1][x];return l(y||x)},m,m.exports,e,n,s,o)}return s[h].exports}for(var c=typeof la=="function"&&la,u=0;u<o.length;u++)l(o[u]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(u){for(var h,f,p,_,m,x,y,g=[],v=0,S=u.length,w=S,P=o.getTypeOf(u)!=="string";v<u.length;)w=S-v,p=P?(h=u[v++],f=v<S?u[v++]:0,v<S?u[v++]:0):(h=u.charCodeAt(v++),f=v<S?u.charCodeAt(v++):0,v<S?u.charCodeAt(v++):0),_=h>>2,m=(3&h)<<4|f>>4,x=1<w?(15&f)<<2|p>>6:64,y=2<w?63&p:64,g.push(c.charAt(_)+c.charAt(m)+c.charAt(x)+c.charAt(y));return g.join("")},s.decode=function(u){var h,f,p,_,m,x,y=0,g=0,v="data:";if(u.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var S,w=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===c.charAt(64)&&w--,u.charAt(u.length-2)===c.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(S=l.uint8array?new Uint8Array(0|w):new Array(0|w);y<u.length;)h=c.indexOf(u.charAt(y++))<<2|(_=c.indexOf(u.charAt(y++)))>>4,f=(15&_)<<4|(m=c.indexOf(u.charAt(y++)))>>2,p=(3&m)<<6|(x=c.indexOf(u.charAt(y++))),S[g++]=h,m!==64&&(S[g++]=f),x!==64&&(S[g++]=p);return S}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),u=e("./stream/DataLengthProbe");function h(f,p,_,m,x){this.compressedSize=f,this.uncompressedSize=p,this.crc32=_,this.compression=m,this.compressedContent=x}h.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),p=this;return f.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},h.createWorkerFrom=function(f,p,_){return f.pipe(new c).pipe(new u("uncompressedSize")).pipe(p.compressWorker(_)).pipe(new u("compressedSize")).withStreamInfo("compression",p)},n.exports=h},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,u=[],h=0;h<256;h++){c=h;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;u[h]=c}return u}();n.exports=function(c,u){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(h,f,p,_){var m=l,x=_+p;h^=-1;for(var y=_;y<x;y++)h=h>>>8^m[255&(h^f[y])];return-1^h}(0|u,c,c.length,0):function(h,f,p,_){var m=l,x=_+p;h^=-1;for(var y=_;y<x;y++)h=h>>>8^m[255&(h^f.charCodeAt(y))];return-1^h}(0|u,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),u=e("./stream/GenericWorker"),h=o?"uint8array":"array";function f(p,_){u.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=_,this.meta={}}s.magic="\b\0",c.inherits(f,u),f.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(h,p.data),!1)},f.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(_){p.push({data:_,meta:p.meta})}},s.compressWorker=function(p){return new f("Deflate",p)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(m,x){var y,g="";for(y=0;y<x;y++)g+=String.fromCharCode(255&m),m>>>=8;return g}function l(m,x,y,g,v,S){var w,P,N=m.file,O=m.compression,k=S!==h.utf8encode,H=c.transformTo("string",S(N.name)),I=c.transformTo("string",h.utf8encode(N.name)),R=N.comment,W=c.transformTo("string",S(R)),U=c.transformTo("string",h.utf8encode(R)),F=I.length!==N.name.length,A=U.length!==R.length,Z="",nt="",ot="",q=N.dir,rt=N.date,at={crc32:0,compressedSize:0,uncompressedSize:0};x&&!y||(at.crc32=m.crc32,at.compressedSize=m.compressedSize,at.uncompressedSize=m.uncompressedSize);var j=0;x&&(j|=8),k||!F&&!A||(j|=2048);var tt=0,Ct=0;q&&(tt|=16),v==="UNIX"?(Ct=798,tt|=function(it,wt){var St=it;return it||(St=wt?16893:33204),(65535&St)<<16}(N.unixPermissions,q)):(Ct=20,tt|=function(it){return 63&(it||0)}(N.dosPermissions)),w=rt.getUTCHours(),w<<=6,w|=rt.getUTCMinutes(),w<<=5,w|=rt.getUTCSeconds()/2,P=rt.getUTCFullYear()-1980,P<<=4,P|=rt.getUTCMonth()+1,P<<=5,P|=rt.getUTCDate(),F&&(nt=o(1,1)+o(f(H),4)+I,Z+="up"+o(nt.length,2)+nt),A&&(ot=o(1,1)+o(f(W),4)+U,Z+="uc"+o(ot.length,2)+ot);var Q="";return Q+=`
\0`,Q+=o(j,2),Q+=O.magic,Q+=o(w,2),Q+=o(P,2),Q+=o(at.crc32,4),Q+=o(at.compressedSize,4),Q+=o(at.uncompressedSize,4),Q+=o(H.length,2),Q+=o(Z.length,2),{fileRecord:p.LOCAL_FILE_HEADER+Q+H+Z,dirRecord:p.CENTRAL_FILE_HEADER+o(Ct,2)+Q+o(W.length,2)+"\0\0\0\0"+o(tt,4)+o(g,4)+H+Z+W}}var c=e("../utils"),u=e("../stream/GenericWorker"),h=e("../utf8"),f=e("../crc32"),p=e("../signature");function _(m,x,y,g){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=x,this.zipPlatform=y,this.encodeFileName=g,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(_,u),_.prototype.push=function(m){var x=m.meta.percent||0,y=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,u.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:y?(x+100*(y-g-1))/y:100}}))},_.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var x=this.streamFiles&&!m.file.dir;if(x){var y=l(m,x,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},_.prototype.closedSource=function(m){this.accumulate=!1;var x=this.streamFiles&&!m.file.dir,y=l(m,x,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),x)this.push({data:function(g){return p.DATA_DESCRIPTOR+o(g.crc32,4)+o(g.compressedSize,4)+o(g.uncompressedSize,4)}(m),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},_.prototype.flush=function(){for(var m=this.bytesWritten,x=0;x<this.dirRecords.length;x++)this.push({data:this.dirRecords[x],meta:{percent:100}});var y=this.bytesWritten-m,g=function(v,S,w,P,N){var O=c.transformTo("string",N(P));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(v,2)+o(v,2)+o(S,4)+o(w,4)+o(O.length,2)+O}(this.dirRecords.length,y,m,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},_.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},_.prototype.registerPrevious=function(m){this._sources.push(m);var x=this;return m.on("data",function(y){x.processChunk(y)}),m.on("end",function(){x.closedSource(x.previous.streamInfo),x._sources.length?x.prepareNextSource():x.end()}),m.on("error",function(y){x.error(y)}),this},_.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},_.prototype.error=function(m){var x=this._sources;if(!u.prototype.error.call(this,m))return!1;for(var y=0;y<x.length;y++)try{x[y].error(m)}catch{}return!0},_.prototype.lock=function(){u.prototype.lock.call(this);for(var m=this._sources,x=0;x<m.length;x++)m[x].lock()},n.exports=_},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,u,h){var f=new l(u.streamFiles,h,u.platform,u.encodeFileName),p=0;try{c.forEach(function(_,m){p++;var x=function(S,w){var P=S||w,N=o[P];if(!N)throw new Error(P+" is not a valid compression method !");return N}(m.options.compression,u.compression),y=m.options.compressionOptions||u.compressionOptions||{},g=m.dir,v=m.date;m._compressWorker(x,y).withStreamInfo("file",{name:_,dir:g,date:v,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(f)}),f.entriesCount=p}catch(_){f.error(_)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),u=e("./zipEntries"),h=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function p(_){return new l.Promise(function(m,x){var y=_.decompressed.getContentWorker().pipe(new h);y.on("error",function(g){x(g)}).on("end",function(){y.streamInfo.crc32!==_.decompressed.crc32?x(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}n.exports=function(_,m){var x=this;return m=o.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(_)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",_,!0,m.optimizedBinaryString,m.base64).then(function(y){var g=new u(m);return g.load(y),g}).then(function(y){var g=[l.Promise.resolve(y)],v=y.files;if(m.checkCRC32)for(var S=0;S<v.length;S++)g.push(p(v[S]));return l.Promise.all(g)}).then(function(y){for(var g=y.shift(),v=g.files,S=0;S<v.length;S++){var w=v[S],P=w.fileNameStr,N=o.resolve(w.fileNameStr);x.file(N,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:m.createFolders}),w.dir||(x.file(N).unsafeOriginalName=P)}return g.zipComment.length&&(x.comment=g.zipComment),x})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(u,h){l.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(h)}o.inherits(c,l),c.prototype._bindStream=function(u){var h=this;(this._stream=u).pause(),u.on("data",function(f){h.push({data:f,meta:{percent:0}})}).on("error",function(f){h.isPaused?this.generatedError=f:h.error(f)}).on("end",function(){h.isPaused?h._upstreamEnded=!0:h.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,u,h){o.call(this,u),this._helper=c;var f=this;c.on("data",function(p,_){f.push(p)||f._helper.pause(),h&&h(_)}).on("error",function(p){f.emit("error",p)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(N,O,k){var H,I=c.getTypeOf(O),R=c.extend(k||{},f);R.date=R.date||new Date,R.compression!==null&&(R.compression=R.compression.toUpperCase()),typeof R.unixPermissions=="string"&&(R.unixPermissions=parseInt(R.unixPermissions,8)),R.unixPermissions&&16384&R.unixPermissions&&(R.dir=!0),R.dosPermissions&&16&R.dosPermissions&&(R.dir=!0),R.dir&&(N=v(N)),R.createFolders&&(H=g(N))&&S.call(this,H,!0);var W=I==="string"&&R.binary===!1&&R.base64===!1;k&&k.binary!==void 0||(R.binary=!W),(O instanceof p&&O.uncompressedSize===0||R.dir||!O||O.length===0)&&(R.base64=!1,R.binary=!0,O="",R.compression="STORE",I="string");var U=null;U=O instanceof p||O instanceof u?O:x.isNode&&x.isStream(O)?new y(N,O):c.prepareContent(N,O,R.binary,R.optimizedBinaryString,R.base64);var F=new _(N,U,R);this.files[N]=F}var l=e("./utf8"),c=e("./utils"),u=e("./stream/GenericWorker"),h=e("./stream/StreamHelper"),f=e("./defaults"),p=e("./compressedObject"),_=e("./zipObject"),m=e("./generate"),x=e("./nodejsUtils"),y=e("./nodejs/NodejsStreamInputAdapter"),g=function(N){N.slice(-1)==="/"&&(N=N.substring(0,N.length-1));var O=N.lastIndexOf("/");return 0<O?N.substring(0,O):""},v=function(N){return N.slice(-1)!=="/"&&(N+="/"),N},S=function(N,O){return O=O!==void 0?O:f.createFolders,N=v(N),this.files[N]||o.call(this,N,null,{dir:!0,createFolders:O}),this.files[N]};function w(N){return Object.prototype.toString.call(N)==="[object RegExp]"}var P={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(N){var O,k,H;for(O in this.files)H=this.files[O],(k=O.slice(this.root.length,O.length))&&O.slice(0,this.root.length)===this.root&&N(k,H)},filter:function(N){var O=[];return this.forEach(function(k,H){N(k,H)&&O.push(H)}),O},file:function(N,O,k){if(arguments.length!==1)return N=this.root+N,o.call(this,N,O,k),this;if(w(N)){var H=N;return this.filter(function(R,W){return!W.dir&&H.test(R)})}var I=this.files[this.root+N];return I&&!I.dir?I:null},folder:function(N){if(!N)return this;if(w(N))return this.filter(function(I,R){return R.dir&&N.test(I)});var O=this.root+N,k=S.call(this,O),H=this.clone();return H.root=k.name,H},remove:function(N){N=this.root+N;var O=this.files[N];if(O||(N.slice(-1)!=="/"&&(N+="/"),O=this.files[N]),O&&!O.dir)delete this.files[N];else for(var k=this.filter(function(I,R){return R.name.slice(0,N.length)===N}),H=0;H<k.length;H++)delete this.files[k[H].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(N){var O,k={};try{if((k=c.extend(N||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=k.type.toLowerCase(),k.compression=k.compression.toUpperCase(),k.type==="binarystring"&&(k.type="string"),!k.type)throw new Error("No output type specified.");c.checkSupport(k.type),k.platform!=="darwin"&&k.platform!=="freebsd"&&k.platform!=="linux"&&k.platform!=="sunos"||(k.platform="UNIX"),k.platform==="win32"&&(k.platform="DOS");var H=k.comment||this.comment||"";O=m.generateWorker(this,k,H)}catch(I){(O=new u("error")).error(I)}return new h(O,k.type||"string",k.mimeType)},generateAsync:function(N,O){return this.generateInternalStream(N).accumulate(O)},generateNodeStream:function(N,O){return(N=N||{}).type||(N.type="nodebuffer"),this.generateInternalStream(N).toNodejsStream(O)}};n.exports=P},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var u=0;u<this.data.length;u++)c[u]=255&c[u]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var u=c.charCodeAt(0),h=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.length-4;0<=_;--_)if(this.data[_]===u&&this.data[_+1]===h&&this.data[_+2]===f&&this.data[_+3]===p)return _-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var u=c.charCodeAt(0),h=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.readData(4);return u===_[0]&&h===_[1]&&f===_[2]&&p===_[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var u,h=0;for(this.checkOffset(c),u=this.index+c-1;u>=this.index;u--)h=(h<<8)+this.byteAt(u);return this.index+=c,h},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),u=e("./StringReader"),h=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(p){var _=o.getTypeOf(p);return o.checkSupport(_),_!=="string"||l.uint8array?_==="nodebuffer"?new h(p):l.uint8array?new f(o.transformTo("uint8array",p)):new c(o.transformTo("array",p)):new u(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(u){o.call(this,"ConvertWorker to "+u),this.destType=u}l.inherits(c,o),c.prototype.processChunk=function(u){this.push({data:l.transformTo(this.destType,u.data),meta:u.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(u){this.streamInfo.crc32=l(u.data,this.streamInfo.crc32||0),this.push(u)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}o.inherits(c,l),c.prototype.processChunk=function(u){if(u){var h=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=h+u.data.length}l.prototype.processChunk.call(this,u)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataWorker");var h=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(f){h.dataIsReady=!0,h.data=f,h.max=f&&f.length||0,h.type=o.getTypeOf(f),h.isPaused||h._tickAndRepeat()},function(f){h.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,h=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,h);break;case"uint8array":u=this.data.subarray(this.index,h);break;case"array":case"nodebuffer":u=this.data.slice(this.index,h)}return this.index=h,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var u=0;u<this._listeners[l].length;u++)this._listeners[l][u].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(u){c.processChunk(u)}),l.on("end",function(){c.end()}),l.on("error",function(u){c.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),u=e("../base64"),h=e("../support"),f=e("../external"),p=null;if(h.nodestream)try{p=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function _(x,y){return new f.Promise(function(g,v){var S=[],w=x._internalType,P=x._outputType,N=x._mimeType;x.on("data",function(O,k){S.push(O),y&&y(k)}).on("error",function(O){S=[],v(O)}).on("end",function(){try{var O=function(k,H,I){switch(k){case"blob":return o.newBlob(o.transformTo("arraybuffer",H),I);case"base64":return u.encode(H);default:return o.transformTo(k,H)}}(P,function(k,H){var I,R=0,W=null,U=0;for(I=0;I<H.length;I++)U+=H[I].length;switch(k){case"string":return H.join("");case"array":return Array.prototype.concat.apply([],H);case"uint8array":for(W=new Uint8Array(U),I=0;I<H.length;I++)W.set(H[I],R),R+=H[I].length;return W;case"nodebuffer":return Buffer.concat(H);default:throw new Error("concat : unsupported type '"+k+"'")}}(w,S),N);g(O)}catch(k){v(k)}S=[]}).resume()})}function m(x,y,g){var v=y;switch(y){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=y,this._mimeType=g,o.checkSupport(v),this._worker=x.pipe(new l(v)),x.lock()}catch(S){this._worker=new c("error"),this._worker.error(S)}}m.prototype={accumulate:function(x){return _(this,x)},on:function(x,y){var g=this;return x==="data"?this._worker.on(x,function(v){y.call(g,v.data,v.meta)}):this._worker.on(x,function(){o.delay(y,arguments,g)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(x){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},x)}},n.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),u=e("./stream/GenericWorker"),h=new Array(256),f=0;f<256;f++)h[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;h[254]=h[254]=1;function p(){u.call(this,"utf-8 decode"),this.leftOver=null}function _(){u.call(this,"utf-8 encode")}s.utf8encode=function(m){return l.nodebuffer?c.newBufferFrom(m,"utf-8"):function(x){var y,g,v,S,w,P=x.length,N=0;for(S=0;S<P;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),N+=g<128?1:g<2048?2:g<65536?3:4;for(y=l.uint8array?new Uint8Array(N):new Array(N),S=w=0;w<N;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),g<128?y[w++]=g:(g<2048?y[w++]=192|g>>>6:(g<65536?y[w++]=224|g>>>12:(y[w++]=240|g>>>18,y[w++]=128|g>>>12&63),y[w++]=128|g>>>6&63),y[w++]=128|63&g);return y}(m)},s.utf8decode=function(m){return l.nodebuffer?o.transformTo("nodebuffer",m).toString("utf-8"):function(x){var y,g,v,S,w=x.length,P=new Array(2*w);for(y=g=0;y<w;)if((v=x[y++])<128)P[g++]=v;else if(4<(S=h[v]))P[g++]=65533,y+=S-1;else{for(v&=S===2?31:S===3?15:7;1<S&&y<w;)v=v<<6|63&x[y++],S--;1<S?P[g++]=65533:v<65536?P[g++]=v:(v-=65536,P[g++]=55296|v>>10&1023,P[g++]=56320|1023&v)}return P.length!==g&&(P.subarray?P=P.subarray(0,g):P.length=g),o.applyFromCharCode(P)}(m=o.transformTo(l.uint8array?"uint8array":"array",m))},o.inherits(p,u),p.prototype.processChunk=function(m){var x=o.transformTo(l.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var y=x;(x=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),x.set(y,this.leftOver.length)}else x=this.leftOver.concat(x);this.leftOver=null}var g=function(S,w){var P;for((w=w||S.length)>S.length&&(w=S.length),P=w-1;0<=P&&(192&S[P])==128;)P--;return P<0||P===0?w:P+h[S[P]]>w?P:w}(x),v=x;g!==x.length&&(l.uint8array?(v=x.subarray(0,g),this.leftOver=x.subarray(g,x.length)):(v=x.slice(0,g),this.leftOver=x.slice(g,x.length))),this.push({data:s.utf8decode(v),meta:m.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=p,o.inherits(_,u),_.prototype.processChunk=function(m){this.push({data:s.utf8encode(m.data),meta:m.meta})},s.Utf8EncodeWorker=_},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),u=e("./external");function h(y){return y}function f(y,g){for(var v=0;v<y.length;++v)g[v]=255&y.charCodeAt(v);return g}e("setimmediate"),s.newBlob=function(y,g){s.checkSupport("blob");try{return new Blob([y],{type:g})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(y),v.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(y,g,v){var S=[],w=0,P=y.length;if(P<=v)return String.fromCharCode.apply(null,y);for(;w<P;)g==="array"||g==="nodebuffer"?S.push(String.fromCharCode.apply(null,y.slice(w,Math.min(w+v,P)))):S.push(String.fromCharCode.apply(null,y.subarray(w,Math.min(w+v,P)))),w+=v;return S.join("")},stringifyByChar:function(y){for(var g="",v=0;v<y.length;v++)g+=String.fromCharCode(y[v]);return g},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function _(y){var g=65536,v=s.getTypeOf(y),S=!0;if(v==="uint8array"?S=p.applyCanBeUsed.uint8array:v==="nodebuffer"&&(S=p.applyCanBeUsed.nodebuffer),S)for(;1<g;)try{return p.stringifyByChunk(y,v,g)}catch{g=Math.floor(g/2)}return p.stringifyByChar(y)}function m(y,g){for(var v=0;v<y.length;v++)g[v]=y[v];return g}s.applyFromCharCode=_;var x={};x.string={string:h,array:function(y){return f(y,new Array(y.length))},arraybuffer:function(y){return x.string.uint8array(y).buffer},uint8array:function(y){return f(y,new Uint8Array(y.length))},nodebuffer:function(y){return f(y,c.allocBuffer(y.length))}},x.array={string:_,array:h,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},x.arraybuffer={string:function(y){return _(new Uint8Array(y))},array:function(y){return m(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:h,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},x.uint8array={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:h,nodebuffer:function(y){return c.newBufferFrom(y)}},x.nodebuffer={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return x.nodebuffer.uint8array(y).buffer},uint8array:function(y){return m(y,new Uint8Array(y.length))},nodebuffer:h},s.transformTo=function(y,g){if(g=g||"",!y)return g;s.checkSupport(y);var v=s.getTypeOf(g);return x[v][y](g)},s.resolve=function(y){for(var g=y.split("/"),v=[],S=0;S<g.length;S++){var w=g[S];w==="."||w===""&&S!==0&&S!==g.length-1||(w===".."?v.pop():v.push(w))}return v.join("/")},s.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(y)?"nodebuffer":o.uint8array&&y instanceof Uint8Array?"uint8array":o.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(y){if(!o[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(y){var g,v,S="";for(v=0;v<(y||"").length;v++)S+="\\x"+((g=y.charCodeAt(v))<16?"0":"")+g.toString(16).toUpperCase();return S},s.delay=function(y,g,v){setImmediate(function(){y.apply(v||null,g||[])})},s.inherits=function(y,g){function v(){}v.prototype=g.prototype,y.prototype=new v},s.extend=function(){var y,g,v={};for(y=0;y<arguments.length;y++)for(g in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],g)&&v[g]===void 0&&(v[g]=arguments[y][g]);return v},s.prepareContent=function(y,g,v,S,w){return u.Promise.resolve(g).then(function(P){return o.blob&&(P instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(P))!==-1)&&typeof FileReader<"u"?new u.Promise(function(N,O){var k=new FileReader;k.onload=function(H){N(H.target.result)},k.onerror=function(H){O(H.target.error)},k.readAsArrayBuffer(P)}):P}).then(function(P){var N=s.getTypeOf(P);return N?(N==="arraybuffer"?P=s.transformTo("uint8array",P):N==="string"&&(w?P=l.decode(P):v&&S!==!0&&(P=function(O){return f(O,o.uint8array?new Uint8Array(O.length):new Array(O.length))}(P))),P):u.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),u=e("./zipEntry"),h=e("./support");function f(p){this.files=[],this.loadOptions=p}f.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var _=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(_)+", expected "+l.pretty(p)+")")}},isSignature:function(p,_){var m=this.reader.index;this.reader.setIndex(p);var x=this.reader.readString(4)===_;return this.reader.setIndex(m),x},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),_=h.uint8array?"uint8array":"array",m=l.transformTo(_,p);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,_,m,x=this.zip64EndOfCentralSize-44;0<x;)p=this.reader.readInt(2),_=this.reader.readInt(4),m=this.reader.readData(_),this.zip64ExtensibleData[p]={id:p,length:_,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,_;for(p=0;p<this.files.length;p++)_=this.files[p],this.reader.setIndex(_.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),_.readLocalPart(this.reader),_.handleUTF8(),_.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(p=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var _=p;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var x=_-m;if(0<x)this.isSignature(_,c.CENTRAL_FILE_HEADER)||(this.reader.zero=x);else if(x<0)throw new Error("Corrupted zip: missing "+Math.abs(x)+" bytes.")},prepareReader:function(p){this.reader=o(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),u=e("./crc32"),h=e("./utf8"),f=e("./compressions"),p=e("./support");function _(m,x){this.options=m,this.loadOptions=x}_.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var x,y;if(m.skip(22),this.fileNameLength=m.readInt(2),y=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((x=function(g){for(var v in f)if(Object.prototype.hasOwnProperty.call(f,v)&&f[v].magic===g)return f[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,x,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var x=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(x),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var x,y,g,v=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<v;)x=m.readInt(2),y=m.readInt(2),g=m.readData(y),this.extraFields[x]={id:x,length:y,value:g};m.setIndex(v)},handleUTF8:function(){var m=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=h.utf8decode(this.fileName),this.fileCommentStr=h.utf8decode(this.fileComment);else{var x=this.findExtraFieldUnicodePath();if(x!==null)this.fileNameStr=x;else{var y=l.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var v=l.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileName)!==x.readInt(4)?null:h.utf8decode(x.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileComment)!==x.readInt(4)?null:h.utf8decode(x.readData(m.length-5))}return null}},n.exports=_},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(x,y,g){this.name=x,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=y,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),u=e("./utf8"),h=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(x){var y=null,g="string";try{if(!x)throw new Error("No output type specified.");var v=(g=x.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),y=this._decompressWorker();var S=!this._dataBinary;S&&!v&&(y=y.pipe(new u.Utf8EncodeWorker)),!S&&v&&(y=y.pipe(new u.Utf8DecodeWorker))}catch(w){(y=new f("error")).error(w)}return new l(y,g,"")},async:function(x,y){return this.internalStream(x).accumulate(y)},nodeStream:function(x,y){return this.internalStream(x||"nodebuffer").toNodejsStream(y)},_compressWorker:function(x,y){if(this._data instanceof h&&this._data.compression.magic===x.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new u.Utf8EncodeWorker)),h.createWorkerFrom(g,x,y)},_decompressWorker:function(){return this._data instanceof h?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],_=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<p.length;m++)o.prototype[p[m]]=_;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,u=o.MutationObserver||o.WebKitMutationObserver;if(u){var h=0,f=new u(x),p=o.document.createTextNode("");f.observe(p,{characterData:!0}),l=function(){p.data=h=++h%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var y=o.document.createElement("script");y.onreadystatechange=function(){x(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},o.document.documentElement.appendChild(y)}:function(){setTimeout(x,0)};else{var _=new o.MessageChannel;_.port1.onmessage=x,l=function(){_.port2.postMessage(0)}}var m=[];function x(){var y,g;c=!0;for(var v=m.length;v;){for(g=m,m=[],y=-1;++y<v;)g[y]();v=m.length}c=!1}n.exports=function(y){m.push(y)!==1||c||l()}}).call(this,typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},u=["REJECTED"],h=["FULFILLED"],f=["PENDING"];function p(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,v!==l&&y(this,v)}function _(v,S,w){this.promise=v,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function m(v,S,w){o(function(){var P;try{P=S(w)}catch(N){return c.reject(v,N)}P===v?c.reject(v,new TypeError("Cannot resolve promise with itself")):c.resolve(v,P)})}function x(v){var S=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof S=="function")return function(){S.apply(v,arguments)}}function y(v,S){var w=!1;function P(k){w||(w=!0,c.reject(v,k))}function N(k){w||(w=!0,c.resolve(v,k))}var O=g(function(){S(N,P)});O.status==="error"&&P(O.value)}function g(v,S){var w={};try{w.value=v(S),w.status="success"}catch(P){w.status="error",w.value=P}return w}(n.exports=p).prototype.finally=function(v){if(typeof v!="function")return this;var S=this.constructor;return this.then(function(w){return S.resolve(v()).then(function(){return w})},function(w){return S.resolve(v()).then(function(){throw w})})},p.prototype.catch=function(v){return this.then(null,v)},p.prototype.then=function(v,S){if(typeof v!="function"&&this.state===h||typeof S!="function"&&this.state===u)return this;var w=new this.constructor(l);return this.state!==f?m(w,this.state===h?v:S,this.outcome):this.queue.push(new _(w,v,S)),w},_.prototype.callFulfilled=function(v){c.resolve(this.promise,v)},_.prototype.otherCallFulfilled=function(v){m(this.promise,this.onFulfilled,v)},_.prototype.callRejected=function(v){c.reject(this.promise,v)},_.prototype.otherCallRejected=function(v){m(this.promise,this.onRejected,v)},c.resolve=function(v,S){var w=g(x,S);if(w.status==="error")return c.reject(v,w.value);var P=w.value;if(P)y(v,P);else{v.state=h,v.outcome=S;for(var N=-1,O=v.queue.length;++N<O;)v.queue[N].callFulfilled(S)}return v},c.reject=function(v,S){v.state=u,v.outcome=S;for(var w=-1,P=v.queue.length;++w<P;)v.queue[w].callRejected(S);return v},p.resolve=function(v){return v instanceof this?v:c.resolve(new this(l),v)},p.reject=function(v){var S=new this(l);return c.reject(S,v)},p.all=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,P=!1;if(!w)return this.resolve([]);for(var N=new Array(w),O=0,k=-1,H=new this(l);++k<w;)I(v[k],k);return H;function I(R,W){S.resolve(R).then(function(U){N[W]=U,++O!==w||P||(P=!0,c.resolve(H,N))},function(U){P||(P=!0,c.reject(H,U))})}},p.race=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,P=!1;if(!w)return this.resolve([]);for(var N=-1,O=new this(l);++N<w;)k=v[N],S.resolve(k).then(function(H){P||(P=!0,c.resolve(O,H))},function(H){P||(P=!0,c.reject(O,H))});var k;return O}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/messages"),h=e("./zlib/zstream"),f=Object.prototype.toString,p=0,_=-1,m=0,x=8;function y(v){if(!(this instanceof y))return new y(v);this.options=l.assign({level:_,method:x,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},v||{});var S=this.options;S.raw&&0<S.windowBits?S.windowBits=-S.windowBits:S.gzip&&0<S.windowBits&&S.windowBits<16&&(S.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new h,this.strm.avail_out=0;var w=o.deflateInit2(this.strm,S.level,S.method,S.windowBits,S.memLevel,S.strategy);if(w!==p)throw new Error(u[w]);if(S.header&&o.deflateSetHeader(this.strm,S.header),S.dictionary){var P;if(P=typeof S.dictionary=="string"?c.string2buf(S.dictionary):f.call(S.dictionary)==="[object ArrayBuffer]"?new Uint8Array(S.dictionary):S.dictionary,(w=o.deflateSetDictionary(this.strm,P))!==p)throw new Error(u[w]);this._dict_set=!0}}function g(v,S){var w=new y(S);if(w.push(v,!0),w.err)throw w.msg||u[w.err];return w.result}y.prototype.push=function(v,S){var w,P,N=this.strm,O=this.options.chunkSize;if(this.ended)return!1;P=S===~~S?S:S===!0?4:0,typeof v=="string"?N.input=c.string2buf(v):f.call(v)==="[object ArrayBuffer]"?N.input=new Uint8Array(v):N.input=v,N.next_in=0,N.avail_in=N.input.length;do{if(N.avail_out===0&&(N.output=new l.Buf8(O),N.next_out=0,N.avail_out=O),(w=o.deflate(N,P))!==1&&w!==p)return this.onEnd(w),!(this.ended=!0);N.avail_out!==0&&(N.avail_in!==0||P!==4&&P!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(N.output,N.next_out))):this.onData(l.shrinkBuf(N.output,N.next_out)))}while((0<N.avail_in||N.avail_out===0)&&w!==1);return P===4?(w=o.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===p):P!==2||(this.onEnd(p),!(N.avail_out=0))},y.prototype.onData=function(v){this.chunks.push(v)},y.prototype.onEnd=function(v){v===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=y,s.deflate=g,s.deflateRaw=function(v,S){return(S=S||{}).raw=!0,g(v,S)},s.gzip=function(v,S){return(S=S||{}).gzip=!0,g(v,S)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/constants"),h=e("./zlib/messages"),f=e("./zlib/zstream"),p=e("./zlib/gzheader"),_=Object.prototype.toString;function m(y){if(!(this instanceof m))return new m(y);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},y||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||y&&y.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var v=o.inflateInit2(this.strm,g.windowBits);if(v!==u.Z_OK)throw new Error(h[v]);this.header=new p,o.inflateGetHeader(this.strm,this.header)}function x(y,g){var v=new m(g);if(v.push(y,!0),v.err)throw v.msg||h[v.err];return v.result}m.prototype.push=function(y,g){var v,S,w,P,N,O,k=this.strm,H=this.options.chunkSize,I=this.options.dictionary,R=!1;if(this.ended)return!1;S=g===~~g?g:g===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof y=="string"?k.input=c.binstring2buf(y):_.call(y)==="[object ArrayBuffer]"?k.input=new Uint8Array(y):k.input=y,k.next_in=0,k.avail_in=k.input.length;do{if(k.avail_out===0&&(k.output=new l.Buf8(H),k.next_out=0,k.avail_out=H),(v=o.inflate(k,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&I&&(O=typeof I=="string"?c.string2buf(I):_.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,v=o.inflateSetDictionary(this.strm,O)),v===u.Z_BUF_ERROR&&R===!0&&(v=u.Z_OK,R=!1),v!==u.Z_STREAM_END&&v!==u.Z_OK)return this.onEnd(v),!(this.ended=!0);k.next_out&&(k.avail_out!==0&&v!==u.Z_STREAM_END&&(k.avail_in!==0||S!==u.Z_FINISH&&S!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=c.utf8border(k.output,k.next_out),P=k.next_out-w,N=c.buf2string(k.output,w),k.next_out=P,k.avail_out=H-P,P&&l.arraySet(k.output,k.output,w,P,0),this.onData(N)):this.onData(l.shrinkBuf(k.output,k.next_out)))),k.avail_in===0&&k.avail_out===0&&(R=!0)}while((0<k.avail_in||k.avail_out===0)&&v!==u.Z_STREAM_END);return v===u.Z_STREAM_END&&(S=u.Z_FINISH),S===u.Z_FINISH?(v=o.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===u.Z_OK):S!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(k.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Inflate=m,s.inflate=x,s.inflateRaw=function(y,g){return(g=g||{}).raw=!0,x(y,g)},s.ungzip=x},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(u){for(var h=Array.prototype.slice.call(arguments,1);h.length;){var f=h.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var p in f)f.hasOwnProperty(p)&&(u[p]=f[p])}}return u},s.shrinkBuf=function(u,h){return u.length===h?u:u.subarray?u.subarray(0,h):(u.length=h,u)};var l={arraySet:function(u,h,f,p,_){if(h.subarray&&u.subarray)u.set(h.subarray(f,f+p),_);else for(var m=0;m<p;m++)u[_+m]=h[f+m]},flattenChunks:function(u){var h,f,p,_,m,x;for(h=p=0,f=u.length;h<f;h++)p+=u[h].length;for(x=new Uint8Array(p),h=_=0,f=u.length;h<f;h++)m=u[h],x.set(m,_),_+=m.length;return x}},c={arraySet:function(u,h,f,p,_){for(var m=0;m<p;m++)u[_+m]=h[f+m]},flattenChunks:function(u){return[].concat.apply([],u)}};s.setTyped=function(u){u?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var u=new o.Buf8(256),h=0;h<256;h++)u[h]=252<=h?6:248<=h?5:240<=h?4:224<=h?3:192<=h?2:1;function f(p,_){if(_<65537&&(p.subarray&&c||!p.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(p,_));for(var m="",x=0;x<_;x++)m+=String.fromCharCode(p[x]);return m}u[254]=u[254]=1,s.string2buf=function(p){var _,m,x,y,g,v=p.length,S=0;for(y=0;y<v;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),S+=m<128?1:m<2048?2:m<65536?3:4;for(_=new o.Buf8(S),y=g=0;g<S;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),m<128?_[g++]=m:(m<2048?_[g++]=192|m>>>6:(m<65536?_[g++]=224|m>>>12:(_[g++]=240|m>>>18,_[g++]=128|m>>>12&63),_[g++]=128|m>>>6&63),_[g++]=128|63&m);return _},s.buf2binstring=function(p){return f(p,p.length)},s.binstring2buf=function(p){for(var _=new o.Buf8(p.length),m=0,x=_.length;m<x;m++)_[m]=p.charCodeAt(m);return _},s.buf2string=function(p,_){var m,x,y,g,v=_||p.length,S=new Array(2*v);for(m=x=0;m<v;)if((y=p[m++])<128)S[x++]=y;else if(4<(g=u[y]))S[x++]=65533,m+=g-1;else{for(y&=g===2?31:g===3?15:7;1<g&&m<v;)y=y<<6|63&p[m++],g--;1<g?S[x++]=65533:y<65536?S[x++]=y:(y-=65536,S[x++]=55296|y>>10&1023,S[x++]=56320|1023&y)}return f(S,x)},s.utf8border=function(p,_){var m;for((_=_||p.length)>p.length&&(_=p.length),m=_-1;0<=m&&(192&p[m])==128;)m--;return m<0||m===0?_:m+u[p[m]]>_?m:_}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,u){for(var h=65535&o|0,f=o>>>16&65535|0,p=0;c!==0;){for(c-=p=2e3<c?2e3:c;f=f+(h=h+l[u++]|0)|0,--p;);h%=65521,f%=65521}return h|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],u=0;u<256;u++){l=u;for(var h=0;h<8;h++)l=1&l?3988292384^l>>>1:l>>>1;c[u]=l}return c}();n.exports=function(l,c,u,h){var f=o,p=h+u;l^=-1;for(var _=h;_<p;_++)l=l>>>8^f[255&(l^c[_])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),u=e("./adler32"),h=e("./crc32"),f=e("./messages"),p=0,_=4,m=0,x=-2,y=-1,g=4,v=2,S=8,w=9,P=286,N=30,O=19,k=2*P+1,H=15,I=3,R=258,W=R+I+1,U=42,F=113,A=1,Z=2,nt=3,ot=4;function q(E,et){return E.msg=f[et],et}function rt(E){return(E<<1)-(4<E?9:0)}function at(E){for(var et=E.length;0<=--et;)E[et]=0}function j(E){var et=E.state,$=et.pending;$>E.avail_out&&($=E.avail_out),$!==0&&(l.arraySet(E.output,et.pending_buf,et.pending_out,$,E.next_out),E.next_out+=$,et.pending_out+=$,E.total_out+=$,E.avail_out-=$,et.pending-=$,et.pending===0&&(et.pending_out=0))}function tt(E,et){c._tr_flush_block(E,0<=E.block_start?E.block_start:-1,E.strstart-E.block_start,et),E.block_start=E.strstart,j(E.strm)}function Ct(E,et){E.pending_buf[E.pending++]=et}function Q(E,et){E.pending_buf[E.pending++]=et>>>8&255,E.pending_buf[E.pending++]=255&et}function it(E,et){var $,C,M=E.max_chain_length,B=E.strstart,X=E.prev_length,K=E.nice_match,G=E.strstart>E.w_size-W?E.strstart-(E.w_size-W):0,ft=E.window,lt=E.w_mask,pt=E.prev,Tt=E.strstart+R,Et=ft[B+X-1],At=ft[B+X];E.prev_length>=E.good_match&&(M>>=2),K>E.lookahead&&(K=E.lookahead);do if(ft[($=et)+X]===At&&ft[$+X-1]===Et&&ft[$]===ft[B]&&ft[++$]===ft[B+1]){B+=2,$++;do;while(ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&B<Tt);if(C=R-(Tt-B),B=Tt-R,X<C){if(E.match_start=et,K<=(X=C))break;Et=ft[B+X-1],At=ft[B+X]}}while((et=pt[et&lt])>G&&--M!=0);return X<=E.lookahead?X:E.lookahead}function wt(E){var et,$,C,M,B,X,K,G,ft,lt,pt=E.w_size;do{if(M=E.window_size-E.lookahead-E.strstart,E.strstart>=pt+(pt-W)){for(l.arraySet(E.window,E.window,pt,pt,0),E.match_start-=pt,E.strstart-=pt,E.block_start-=pt,et=$=E.hash_size;C=E.head[--et],E.head[et]=pt<=C?C-pt:0,--$;);for(et=$=pt;C=E.prev[--et],E.prev[et]=pt<=C?C-pt:0,--$;);M+=pt}if(E.strm.avail_in===0)break;if(X=E.strm,K=E.window,G=E.strstart+E.lookahead,ft=M,lt=void 0,lt=X.avail_in,ft<lt&&(lt=ft),$=lt===0?0:(X.avail_in-=lt,l.arraySet(K,X.input,X.next_in,lt,G),X.state.wrap===1?X.adler=u(X.adler,K,lt,G):X.state.wrap===2&&(X.adler=h(X.adler,K,lt,G)),X.next_in+=lt,X.total_in+=lt,lt),E.lookahead+=$,E.lookahead+E.insert>=I)for(B=E.strstart-E.insert,E.ins_h=E.window[B],E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+1])&E.hash_mask;E.insert&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+I-1])&E.hash_mask,E.prev[B&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=B,B++,E.insert--,!(E.lookahead+E.insert<I)););}while(E.lookahead<W&&E.strm.avail_in!==0)}function St(E,et){for(var $,C;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return A;if(E.lookahead===0)break}if($=0,E.lookahead>=I&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),$!==0&&E.strstart-$<=E.w_size-W&&(E.match_length=it(E,$)),E.match_length>=I)if(C=c._tr_tally(E,E.strstart-E.match_start,E.match_length-I),E.lookahead-=E.match_length,E.match_length<=E.max_lazy_match&&E.lookahead>=I){for(E.match_length--;E.strstart++,E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart,--E.match_length!=0;);E.strstart++}else E.strstart+=E.match_length,E.match_length=0,E.ins_h=E.window[E.strstart],E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+1])&E.hash_mask;else C=c._tr_tally(E,0,E.window[E.strstart]),E.lookahead--,E.strstart++;if(C&&(tt(E,!1),E.strm.avail_out===0))return A}return E.insert=E.strstart<I-1?E.strstart:I-1,et===_?(tt(E,!0),E.strm.avail_out===0?nt:ot):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?A:Z}function Pt(E,et){for(var $,C,M;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return A;if(E.lookahead===0)break}if($=0,E.lookahead>=I&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),E.prev_length=E.match_length,E.prev_match=E.match_start,E.match_length=I-1,$!==0&&E.prev_length<E.max_lazy_match&&E.strstart-$<=E.w_size-W&&(E.match_length=it(E,$),E.match_length<=5&&(E.strategy===1||E.match_length===I&&4096<E.strstart-E.match_start)&&(E.match_length=I-1)),E.prev_length>=I&&E.match_length<=E.prev_length){for(M=E.strstart+E.lookahead-I,C=c._tr_tally(E,E.strstart-1-E.prev_match,E.prev_length-I),E.lookahead-=E.prev_length-1,E.prev_length-=2;++E.strstart<=M&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),--E.prev_length!=0;);if(E.match_available=0,E.match_length=I-1,E.strstart++,C&&(tt(E,!1),E.strm.avail_out===0))return A}else if(E.match_available){if((C=c._tr_tally(E,0,E.window[E.strstart-1]))&&tt(E,!1),E.strstart++,E.lookahead--,E.strm.avail_out===0)return A}else E.match_available=1,E.strstart++,E.lookahead--}return E.match_available&&(C=c._tr_tally(E,0,E.window[E.strstart-1]),E.match_available=0),E.insert=E.strstart<I-1?E.strstart:I-1,et===_?(tt(E,!0),E.strm.avail_out===0?nt:ot):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?A:Z}function It(E,et,$,C,M){this.good_length=E,this.max_lazy=et,this.nice_length=$,this.max_chain=C,this.func=M}function Ut(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=S,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*k),this.dyn_dtree=new l.Buf16(2*(2*N+1)),this.bl_tree=new l.Buf16(2*(2*O+1)),at(this.dyn_ltree),at(this.dyn_dtree),at(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(H+1),this.heap=new l.Buf16(2*P+1),at(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*P+1),at(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function st(E){var et;return E&&E.state?(E.total_in=E.total_out=0,E.data_type=v,(et=E.state).pending=0,et.pending_out=0,et.wrap<0&&(et.wrap=-et.wrap),et.status=et.wrap?U:F,E.adler=et.wrap===2?0:1,et.last_flush=p,c._tr_init(et),m):q(E,x)}function xt(E){var et=st(E);return et===m&&function($){$.window_size=2*$.w_size,at($.head),$.max_lazy_match=o[$.level].max_lazy,$.good_match=o[$.level].good_length,$.nice_match=o[$.level].nice_length,$.max_chain_length=o[$.level].max_chain,$.strstart=0,$.block_start=0,$.lookahead=0,$.insert=0,$.match_length=$.prev_length=I-1,$.match_available=0,$.ins_h=0}(E.state),et}function bt(E,et,$,C,M,B){if(!E)return x;var X=1;if(et===y&&(et=6),C<0?(X=0,C=-C):15<C&&(X=2,C-=16),M<1||w<M||$!==S||C<8||15<C||et<0||9<et||B<0||g<B)return q(E,x);C===8&&(C=9);var K=new Ut;return(E.state=K).strm=E,K.wrap=X,K.gzhead=null,K.w_bits=C,K.w_size=1<<K.w_bits,K.w_mask=K.w_size-1,K.hash_bits=M+7,K.hash_size=1<<K.hash_bits,K.hash_mask=K.hash_size-1,K.hash_shift=~~((K.hash_bits+I-1)/I),K.window=new l.Buf8(2*K.w_size),K.head=new l.Buf16(K.hash_size),K.prev=new l.Buf16(K.w_size),K.lit_bufsize=1<<M+6,K.pending_buf_size=4*K.lit_bufsize,K.pending_buf=new l.Buf8(K.pending_buf_size),K.d_buf=1*K.lit_bufsize,K.l_buf=3*K.lit_bufsize,K.level=et,K.strategy=B,K.method=$,xt(E)}o=[new It(0,0,0,0,function(E,et){var $=65535;for($>E.pending_buf_size-5&&($=E.pending_buf_size-5);;){if(E.lookahead<=1){if(wt(E),E.lookahead===0&&et===p)return A;if(E.lookahead===0)break}E.strstart+=E.lookahead,E.lookahead=0;var C=E.block_start+$;if((E.strstart===0||E.strstart>=C)&&(E.lookahead=E.strstart-C,E.strstart=C,tt(E,!1),E.strm.avail_out===0)||E.strstart-E.block_start>=E.w_size-W&&(tt(E,!1),E.strm.avail_out===0))return A}return E.insert=0,et===_?(tt(E,!0),E.strm.avail_out===0?nt:ot):(E.strstart>E.block_start&&(tt(E,!1),E.strm.avail_out),A)}),new It(4,4,8,4,St),new It(4,5,16,8,St),new It(4,6,32,32,St),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(E,et){return bt(E,et,S,15,8,0)},s.deflateInit2=bt,s.deflateReset=xt,s.deflateResetKeep=st,s.deflateSetHeader=function(E,et){return E&&E.state?E.state.wrap!==2?x:(E.state.gzhead=et,m):x},s.deflate=function(E,et){var $,C,M,B;if(!E||!E.state||5<et||et<0)return E?q(E,x):x;if(C=E.state,!E.output||!E.input&&E.avail_in!==0||C.status===666&&et!==_)return q(E,E.avail_out===0?-5:x);if(C.strm=E,$=C.last_flush,C.last_flush=et,C.status===U)if(C.wrap===2)E.adler=0,Ct(C,31),Ct(C,139),Ct(C,8),C.gzhead?(Ct(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),Ct(C,255&C.gzhead.time),Ct(C,C.gzhead.time>>8&255),Ct(C,C.gzhead.time>>16&255),Ct(C,C.gzhead.time>>24&255),Ct(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),Ct(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(Ct(C,255&C.gzhead.extra.length),Ct(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(E.adler=h(E.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(Ct(C,0),Ct(C,0),Ct(C,0),Ct(C,0),Ct(C,0),Ct(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),Ct(C,3),C.status=F);else{var X=S+(C.w_bits-8<<4)<<8;X|=(2<=C.strategy||C.level<2?0:C.level<6?1:C.level===6?2:3)<<6,C.strstart!==0&&(X|=32),X+=31-X%31,C.status=F,Q(C,X),C.strstart!==0&&(Q(C,E.adler>>>16),Q(C,65535&E.adler)),E.adler=1}if(C.status===69)if(C.gzhead.extra){for(M=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>M&&(E.adler=h(E.adler,C.pending_buf,C.pending-M,M)),j(E),M=C.pending,C.pending!==C.pending_buf_size));)Ct(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>M&&(E.adler=h(E.adler,C.pending_buf,C.pending-M,M)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(C.status===73)if(C.gzhead.name){M=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>M&&(E.adler=h(E.adler,C.pending_buf,C.pending-M,M)),j(E),M=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,Ct(C,B)}while(B!==0);C.gzhead.hcrc&&C.pending>M&&(E.adler=h(E.adler,C.pending_buf,C.pending-M,M)),B===0&&(C.gzindex=0,C.status=91)}else C.status=91;if(C.status===91)if(C.gzhead.comment){M=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>M&&(E.adler=h(E.adler,C.pending_buf,C.pending-M,M)),j(E),M=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,Ct(C,B)}while(B!==0);C.gzhead.hcrc&&C.pending>M&&(E.adler=h(E.adler,C.pending_buf,C.pending-M,M)),B===0&&(C.status=103)}else C.status=103;if(C.status===103&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&j(E),C.pending+2<=C.pending_buf_size&&(Ct(C,255&E.adler),Ct(C,E.adler>>8&255),E.adler=0,C.status=F)):C.status=F),C.pending!==0){if(j(E),E.avail_out===0)return C.last_flush=-1,m}else if(E.avail_in===0&&rt(et)<=rt($)&&et!==_)return q(E,-5);if(C.status===666&&E.avail_in!==0)return q(E,-5);if(E.avail_in!==0||C.lookahead!==0||et!==p&&C.status!==666){var K=C.strategy===2?function(G,ft){for(var lt;;){if(G.lookahead===0&&(wt(G),G.lookahead===0)){if(ft===p)return A;break}if(G.match_length=0,lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++,lt&&(tt(G,!1),G.strm.avail_out===0))return A}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?nt:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?A:Z}(C,et):C.strategy===3?function(G,ft){for(var lt,pt,Tt,Et,At=G.window;;){if(G.lookahead<=R){if(wt(G),G.lookahead<=R&&ft===p)return A;if(G.lookahead===0)break}if(G.match_length=0,G.lookahead>=I&&0<G.strstart&&(pt=At[Tt=G.strstart-1])===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]){Et=G.strstart+R;do;while(pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&Tt<Et);G.match_length=R-(Et-Tt),G.match_length>G.lookahead&&(G.match_length=G.lookahead)}if(G.match_length>=I?(lt=c._tr_tally(G,1,G.match_length-I),G.lookahead-=G.match_length,G.strstart+=G.match_length,G.match_length=0):(lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++),lt&&(tt(G,!1),G.strm.avail_out===0))return A}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?nt:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?A:Z}(C,et):o[C.level].func(C,et);if(K!==nt&&K!==ot||(C.status=666),K===A||K===nt)return E.avail_out===0&&(C.last_flush=-1),m;if(K===Z&&(et===1?c._tr_align(C):et!==5&&(c._tr_stored_block(C,0,0,!1),et===3&&(at(C.head),C.lookahead===0&&(C.strstart=0,C.block_start=0,C.insert=0))),j(E),E.avail_out===0))return C.last_flush=-1,m}return et!==_?m:C.wrap<=0?1:(C.wrap===2?(Ct(C,255&E.adler),Ct(C,E.adler>>8&255),Ct(C,E.adler>>16&255),Ct(C,E.adler>>24&255),Ct(C,255&E.total_in),Ct(C,E.total_in>>8&255),Ct(C,E.total_in>>16&255),Ct(C,E.total_in>>24&255)):(Q(C,E.adler>>>16),Q(C,65535&E.adler)),j(E),0<C.wrap&&(C.wrap=-C.wrap),C.pending!==0?m:1)},s.deflateEnd=function(E){var et;return E&&E.state?(et=E.state.status)!==U&&et!==69&&et!==73&&et!==91&&et!==103&&et!==F&&et!==666?q(E,x):(E.state=null,et===F?q(E,-3):m):x},s.deflateSetDictionary=function(E,et){var $,C,M,B,X,K,G,ft,lt=et.length;if(!E||!E.state||(B=($=E.state).wrap)===2||B===1&&$.status!==U||$.lookahead)return x;for(B===1&&(E.adler=u(E.adler,et,lt,0)),$.wrap=0,lt>=$.w_size&&(B===0&&(at($.head),$.strstart=0,$.block_start=0,$.insert=0),ft=new l.Buf8($.w_size),l.arraySet(ft,et,lt-$.w_size,$.w_size,0),et=ft,lt=$.w_size),X=E.avail_in,K=E.next_in,G=E.input,E.avail_in=lt,E.next_in=0,E.input=et,wt($);$.lookahead>=I;){for(C=$.strstart,M=$.lookahead-(I-1);$.ins_h=($.ins_h<<$.hash_shift^$.window[C+I-1])&$.hash_mask,$.prev[C&$.w_mask]=$.head[$.ins_h],$.head[$.ins_h]=C,C++,--M;);$.strstart=C,$.lookahead=I-1,wt($)}return $.strstart+=$.lookahead,$.block_start=$.strstart,$.insert=$.lookahead,$.lookahead=0,$.match_length=$.prev_length=I-1,$.match_available=0,E.next_in=K,E.input=G,E.avail_in=X,$.wrap=B,m},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,u,h,f,p,_,m,x,y,g,v,S,w,P,N,O,k,H,I,R,W,U,F,A,Z;c=o.state,u=o.next_in,A=o.input,h=u+(o.avail_in-5),f=o.next_out,Z=o.output,p=f-(l-o.avail_out),_=f+(o.avail_out-257),m=c.dmax,x=c.wsize,y=c.whave,g=c.wnext,v=c.window,S=c.hold,w=c.bits,P=c.lencode,N=c.distcode,O=(1<<c.lenbits)-1,k=(1<<c.distbits)-1;t:do{w<15&&(S+=A[u++]<<w,w+=8,S+=A[u++]<<w,w+=8),H=P[S&O];e:for(;;){if(S>>>=I=H>>>24,w-=I,(I=H>>>16&255)===0)Z[f++]=65535&H;else{if(!(16&I)){if(!(64&I)){H=P[(65535&H)+(S&(1<<I)-1)];continue e}if(32&I){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}R=65535&H,(I&=15)&&(w<I&&(S+=A[u++]<<w,w+=8),R+=S&(1<<I)-1,S>>>=I,w-=I),w<15&&(S+=A[u++]<<w,w+=8,S+=A[u++]<<w,w+=8),H=N[S&k];n:for(;;){if(S>>>=I=H>>>24,w-=I,!(16&(I=H>>>16&255))){if(!(64&I)){H=N[(65535&H)+(S&(1<<I)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(W=65535&H,w<(I&=15)&&(S+=A[u++]<<w,(w+=8)<I&&(S+=A[u++]<<w,w+=8)),m<(W+=S&(1<<I)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(S>>>=I,w-=I,(I=f-p)<W){if(y<(I=W-I)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(F=v,(U=0)===g){if(U+=x-I,I<R){for(R-=I;Z[f++]=v[U++],--I;);U=f-W,F=Z}}else if(g<I){if(U+=x+g-I,(I-=g)<R){for(R-=I;Z[f++]=v[U++],--I;);if(U=0,g<R){for(R-=I=g;Z[f++]=v[U++],--I;);U=f-W,F=Z}}}else if(U+=g-I,I<R){for(R-=I;Z[f++]=v[U++],--I;);U=f-W,F=Z}for(;2<R;)Z[f++]=F[U++],Z[f++]=F[U++],Z[f++]=F[U++],R-=3;R&&(Z[f++]=F[U++],1<R&&(Z[f++]=F[U++]))}else{for(U=f-W;Z[f++]=Z[U++],Z[f++]=Z[U++],Z[f++]=Z[U++],2<(R-=3););R&&(Z[f++]=Z[U++],1<R&&(Z[f++]=Z[U++]))}break}}break}}while(u<h&&f<_);u-=R=w>>3,S&=(1<<(w-=R<<3))-1,o.next_in=u,o.next_out=f,o.avail_in=u<h?h-u+5:5-(u-h),o.avail_out=f<_?_-f+257:257-(f-_),c.hold=S,c.bits=w}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),u=e("./inffast"),h=e("./inftrees"),f=1,p=2,_=0,m=-2,x=1,y=852,g=592;function v(U){return(U>>>24&255)+(U>>>8&65280)+((65280&U)<<8)+((255&U)<<24)}function S(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(U){var F;return U&&U.state?(F=U.state,U.total_in=U.total_out=F.total=0,U.msg="",F.wrap&&(U.adler=1&F.wrap),F.mode=x,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new o.Buf32(y),F.distcode=F.distdyn=new o.Buf32(g),F.sane=1,F.back=-1,_):m}function P(U){var F;return U&&U.state?((F=U.state).wsize=0,F.whave=0,F.wnext=0,w(U)):m}function N(U,F){var A,Z;return U&&U.state?(Z=U.state,F<0?(A=0,F=-F):(A=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?m:(Z.window!==null&&Z.wbits!==F&&(Z.window=null),Z.wrap=A,Z.wbits=F,P(U))):m}function O(U,F){var A,Z;return U?(Z=new S,(U.state=Z).window=null,(A=N(U,F))!==_&&(U.state=null),A):m}var k,H,I=!0;function R(U){if(I){var F;for(k=new o.Buf32(512),H=new o.Buf32(32),F=0;F<144;)U.lens[F++]=8;for(;F<256;)U.lens[F++]=9;for(;F<280;)U.lens[F++]=7;for(;F<288;)U.lens[F++]=8;for(h(f,U.lens,0,288,k,0,U.work,{bits:9}),F=0;F<32;)U.lens[F++]=5;h(p,U.lens,0,32,H,0,U.work,{bits:5}),I=!1}U.lencode=k,U.lenbits=9,U.distcode=H,U.distbits=5}function W(U,F,A,Z){var nt,ot=U.state;return ot.window===null&&(ot.wsize=1<<ot.wbits,ot.wnext=0,ot.whave=0,ot.window=new o.Buf8(ot.wsize)),Z>=ot.wsize?(o.arraySet(ot.window,F,A-ot.wsize,ot.wsize,0),ot.wnext=0,ot.whave=ot.wsize):(Z<(nt=ot.wsize-ot.wnext)&&(nt=Z),o.arraySet(ot.window,F,A-Z,nt,ot.wnext),(Z-=nt)?(o.arraySet(ot.window,F,A-Z,Z,0),ot.wnext=Z,ot.whave=ot.wsize):(ot.wnext+=nt,ot.wnext===ot.wsize&&(ot.wnext=0),ot.whave<ot.wsize&&(ot.whave+=nt))),0}s.inflateReset=P,s.inflateReset2=N,s.inflateResetKeep=w,s.inflateInit=function(U){return O(U,15)},s.inflateInit2=O,s.inflate=function(U,F){var A,Z,nt,ot,q,rt,at,j,tt,Ct,Q,it,wt,St,Pt,It,Ut,st,xt,bt,E,et,$,C,M=0,B=new o.Buf8(4),X=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!U||!U.state||!U.output||!U.input&&U.avail_in!==0)return m;(A=U.state).mode===12&&(A.mode=13),q=U.next_out,nt=U.output,at=U.avail_out,ot=U.next_in,Z=U.input,rt=U.avail_in,j=A.hold,tt=A.bits,Ct=rt,Q=at,et=_;t:for(;;)switch(A.mode){case x:if(A.wrap===0){A.mode=13;break}for(;tt<16;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(2&A.wrap&&j===35615){B[A.check=0]=255&j,B[1]=j>>>8&255,A.check=c(A.check,B,2,0),tt=j=0,A.mode=2;break}if(A.flags=0,A.head&&(A.head.done=!1),!(1&A.wrap)||(((255&j)<<8)+(j>>8))%31){U.msg="incorrect header check",A.mode=30;break}if((15&j)!=8){U.msg="unknown compression method",A.mode=30;break}if(tt-=4,E=8+(15&(j>>>=4)),A.wbits===0)A.wbits=E;else if(E>A.wbits){U.msg="invalid window size",A.mode=30;break}A.dmax=1<<E,U.adler=A.check=1,A.mode=512&j?10:12,tt=j=0;break;case 2:for(;tt<16;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(A.flags=j,(255&A.flags)!=8){U.msg="unknown compression method",A.mode=30;break}if(57344&A.flags){U.msg="unknown header flags set",A.mode=30;break}A.head&&(A.head.text=j>>8&1),512&A.flags&&(B[0]=255&j,B[1]=j>>>8&255,A.check=c(A.check,B,2,0)),tt=j=0,A.mode=3;case 3:for(;tt<32;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}A.head&&(A.head.time=j),512&A.flags&&(B[0]=255&j,B[1]=j>>>8&255,B[2]=j>>>16&255,B[3]=j>>>24&255,A.check=c(A.check,B,4,0)),tt=j=0,A.mode=4;case 4:for(;tt<16;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}A.head&&(A.head.xflags=255&j,A.head.os=j>>8),512&A.flags&&(B[0]=255&j,B[1]=j>>>8&255,A.check=c(A.check,B,2,0)),tt=j=0,A.mode=5;case 5:if(1024&A.flags){for(;tt<16;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}A.length=j,A.head&&(A.head.extra_len=j),512&A.flags&&(B[0]=255&j,B[1]=j>>>8&255,A.check=c(A.check,B,2,0)),tt=j=0}else A.head&&(A.head.extra=null);A.mode=6;case 6:if(1024&A.flags&&(rt<(it=A.length)&&(it=rt),it&&(A.head&&(E=A.head.extra_len-A.length,A.head.extra||(A.head.extra=new Array(A.head.extra_len)),o.arraySet(A.head.extra,Z,ot,it,E)),512&A.flags&&(A.check=c(A.check,Z,it,ot)),rt-=it,ot+=it,A.length-=it),A.length))break t;A.length=0,A.mode=7;case 7:if(2048&A.flags){if(rt===0)break t;for(it=0;E=Z[ot+it++],A.head&&E&&A.length<65536&&(A.head.name+=String.fromCharCode(E)),E&&it<rt;);if(512&A.flags&&(A.check=c(A.check,Z,it,ot)),rt-=it,ot+=it,E)break t}else A.head&&(A.head.name=null);A.length=0,A.mode=8;case 8:if(4096&A.flags){if(rt===0)break t;for(it=0;E=Z[ot+it++],A.head&&E&&A.length<65536&&(A.head.comment+=String.fromCharCode(E)),E&&it<rt;);if(512&A.flags&&(A.check=c(A.check,Z,it,ot)),rt-=it,ot+=it,E)break t}else A.head&&(A.head.comment=null);A.mode=9;case 9:if(512&A.flags){for(;tt<16;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(j!==(65535&A.check)){U.msg="header crc mismatch",A.mode=30;break}tt=j=0}A.head&&(A.head.hcrc=A.flags>>9&1,A.head.done=!0),U.adler=A.check=0,A.mode=12;break;case 10:for(;tt<32;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}U.adler=A.check=v(j),tt=j=0,A.mode=11;case 11:if(A.havedict===0)return U.next_out=q,U.avail_out=at,U.next_in=ot,U.avail_in=rt,A.hold=j,A.bits=tt,2;U.adler=A.check=1,A.mode=12;case 12:if(F===5||F===6)break t;case 13:if(A.last){j>>>=7&tt,tt-=7&tt,A.mode=27;break}for(;tt<3;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}switch(A.last=1&j,tt-=1,3&(j>>>=1)){case 0:A.mode=14;break;case 1:if(R(A),A.mode=20,F!==6)break;j>>>=2,tt-=2;break t;case 2:A.mode=17;break;case 3:U.msg="invalid block type",A.mode=30}j>>>=2,tt-=2;break;case 14:for(j>>>=7&tt,tt-=7&tt;tt<32;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if((65535&j)!=(j>>>16^65535)){U.msg="invalid stored block lengths",A.mode=30;break}if(A.length=65535&j,tt=j=0,A.mode=15,F===6)break t;case 15:A.mode=16;case 16:if(it=A.length){if(rt<it&&(it=rt),at<it&&(it=at),it===0)break t;o.arraySet(nt,Z,ot,it,q),rt-=it,ot+=it,at-=it,q+=it,A.length-=it;break}A.mode=12;break;case 17:for(;tt<14;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(A.nlen=257+(31&j),j>>>=5,tt-=5,A.ndist=1+(31&j),j>>>=5,tt-=5,A.ncode=4+(15&j),j>>>=4,tt-=4,286<A.nlen||30<A.ndist){U.msg="too many length or distance symbols",A.mode=30;break}A.have=0,A.mode=18;case 18:for(;A.have<A.ncode;){for(;tt<3;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}A.lens[X[A.have++]]=7&j,j>>>=3,tt-=3}for(;A.have<19;)A.lens[X[A.have++]]=0;if(A.lencode=A.lendyn,A.lenbits=7,$={bits:A.lenbits},et=h(0,A.lens,0,19,A.lencode,0,A.work,$),A.lenbits=$.bits,et){U.msg="invalid code lengths set",A.mode=30;break}A.have=0,A.mode=19;case 19:for(;A.have<A.nlen+A.ndist;){for(;It=(M=A.lencode[j&(1<<A.lenbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(Ut<16)j>>>=Pt,tt-=Pt,A.lens[A.have++]=Ut;else{if(Ut===16){for(C=Pt+2;tt<C;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(j>>>=Pt,tt-=Pt,A.have===0){U.msg="invalid bit length repeat",A.mode=30;break}E=A.lens[A.have-1],it=3+(3&j),j>>>=2,tt-=2}else if(Ut===17){for(C=Pt+3;tt<C;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}tt-=Pt,E=0,it=3+(7&(j>>>=Pt)),j>>>=3,tt-=3}else{for(C=Pt+7;tt<C;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}tt-=Pt,E=0,it=11+(127&(j>>>=Pt)),j>>>=7,tt-=7}if(A.have+it>A.nlen+A.ndist){U.msg="invalid bit length repeat",A.mode=30;break}for(;it--;)A.lens[A.have++]=E}}if(A.mode===30)break;if(A.lens[256]===0){U.msg="invalid code -- missing end-of-block",A.mode=30;break}if(A.lenbits=9,$={bits:A.lenbits},et=h(f,A.lens,0,A.nlen,A.lencode,0,A.work,$),A.lenbits=$.bits,et){U.msg="invalid literal/lengths set",A.mode=30;break}if(A.distbits=6,A.distcode=A.distdyn,$={bits:A.distbits},et=h(p,A.lens,A.nlen,A.ndist,A.distcode,0,A.work,$),A.distbits=$.bits,et){U.msg="invalid distances set",A.mode=30;break}if(A.mode=20,F===6)break t;case 20:A.mode=21;case 21:if(6<=rt&&258<=at){U.next_out=q,U.avail_out=at,U.next_in=ot,U.avail_in=rt,A.hold=j,A.bits=tt,u(U,Q),q=U.next_out,nt=U.output,at=U.avail_out,ot=U.next_in,Z=U.input,rt=U.avail_in,j=A.hold,tt=A.bits,A.mode===12&&(A.back=-1);break}for(A.back=0;It=(M=A.lencode[j&(1<<A.lenbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(It&&!(240&It)){for(st=Pt,xt=It,bt=Ut;It=(M=A.lencode[bt+((j&(1<<st+xt)-1)>>st)])>>>16&255,Ut=65535&M,!(st+(Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}j>>>=st,tt-=st,A.back+=st}if(j>>>=Pt,tt-=Pt,A.back+=Pt,A.length=Ut,It===0){A.mode=26;break}if(32&It){A.back=-1,A.mode=12;break}if(64&It){U.msg="invalid literal/length code",A.mode=30;break}A.extra=15&It,A.mode=22;case 22:if(A.extra){for(C=A.extra;tt<C;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}A.length+=j&(1<<A.extra)-1,j>>>=A.extra,tt-=A.extra,A.back+=A.extra}A.was=A.length,A.mode=23;case 23:for(;It=(M=A.distcode[j&(1<<A.distbits)-1])>>>16&255,Ut=65535&M,!((Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(!(240&It)){for(st=Pt,xt=It,bt=Ut;It=(M=A.distcode[bt+((j&(1<<st+xt)-1)>>st)])>>>16&255,Ut=65535&M,!(st+(Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}j>>>=st,tt-=st,A.back+=st}if(j>>>=Pt,tt-=Pt,A.back+=Pt,64&It){U.msg="invalid distance code",A.mode=30;break}A.offset=Ut,A.extra=15&It,A.mode=24;case 24:if(A.extra){for(C=A.extra;tt<C;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}A.offset+=j&(1<<A.extra)-1,j>>>=A.extra,tt-=A.extra,A.back+=A.extra}if(A.offset>A.dmax){U.msg="invalid distance too far back",A.mode=30;break}A.mode=25;case 25:if(at===0)break t;if(it=Q-at,A.offset>it){if((it=A.offset-it)>A.whave&&A.sane){U.msg="invalid distance too far back",A.mode=30;break}wt=it>A.wnext?(it-=A.wnext,A.wsize-it):A.wnext-it,it>A.length&&(it=A.length),St=A.window}else St=nt,wt=q-A.offset,it=A.length;for(at<it&&(it=at),at-=it,A.length-=it;nt[q++]=St[wt++],--it;);A.length===0&&(A.mode=21);break;case 26:if(at===0)break t;nt[q++]=A.length,at--,A.mode=21;break;case 27:if(A.wrap){for(;tt<32;){if(rt===0)break t;rt--,j|=Z[ot++]<<tt,tt+=8}if(Q-=at,U.total_out+=Q,A.total+=Q,Q&&(U.adler=A.check=A.flags?c(A.check,nt,Q,q-Q):l(A.check,nt,Q,q-Q)),Q=at,(A.flags?j:v(j))!==A.check){U.msg="incorrect data check",A.mode=30;break}tt=j=0}A.mode=28;case 28:if(A.wrap&&A.flags){for(;tt<32;){if(rt===0)break t;rt--,j+=Z[ot++]<<tt,tt+=8}if(j!==(4294967295&A.total)){U.msg="incorrect length check",A.mode=30;break}tt=j=0}A.mode=29;case 29:et=1;break t;case 30:et=-3;break t;case 31:return-4;case 32:default:return m}return U.next_out=q,U.avail_out=at,U.next_in=ot,U.avail_in=rt,A.hold=j,A.bits=tt,(A.wsize||Q!==U.avail_out&&A.mode<30&&(A.mode<27||F!==4))&&W(U,U.output,U.next_out,Q-U.avail_out)?(A.mode=31,-4):(Ct-=U.avail_in,Q-=U.avail_out,U.total_in+=Ct,U.total_out+=Q,A.total+=Q,A.wrap&&Q&&(U.adler=A.check=A.flags?c(A.check,nt,Q,U.next_out-Q):l(A.check,nt,Q,U.next_out-Q)),U.data_type=A.bits+(A.last?64:0)+(A.mode===12?128:0)+(A.mode===20||A.mode===15?256:0),(Ct==0&&Q===0||F===4)&&et===_&&(et=-5),et)},s.inflateEnd=function(U){if(!U||!U.state)return m;var F=U.state;return F.window&&(F.window=null),U.state=null,_},s.inflateGetHeader=function(U,F){var A;return U&&U.state&&2&(A=U.state).wrap?((A.head=F).done=!1,_):m},s.inflateSetDictionary=function(U,F){var A,Z=F.length;return U&&U.state?(A=U.state).wrap!==0&&A.mode!==11?m:A.mode===11&&l(1,F,Z,0)!==A.check?-3:W(U,F,Z,Z)?(A.mode=31,-4):(A.havedict=1,_):m},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],h=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,p,_,m,x,y,g,v){var S,w,P,N,O,k,H,I,R,W=v.bits,U=0,F=0,A=0,Z=0,nt=0,ot=0,q=0,rt=0,at=0,j=0,tt=null,Ct=0,Q=new o.Buf16(16),it=new o.Buf16(16),wt=null,St=0;for(U=0;U<=15;U++)Q[U]=0;for(F=0;F<m;F++)Q[p[_+F]]++;for(nt=W,Z=15;1<=Z&&Q[Z]===0;Z--);if(Z<nt&&(nt=Z),Z===0)return x[y++]=20971520,x[y++]=20971520,v.bits=1,0;for(A=1;A<Z&&Q[A]===0;A++);for(nt<A&&(nt=A),U=rt=1;U<=15;U++)if(rt<<=1,(rt-=Q[U])<0)return-1;if(0<rt&&(f===0||Z!==1))return-1;for(it[1]=0,U=1;U<15;U++)it[U+1]=it[U]+Q[U];for(F=0;F<m;F++)p[_+F]!==0&&(g[it[p[_+F]]++]=F);if(k=f===0?(tt=wt=g,19):f===1?(tt=l,Ct-=257,wt=c,St-=257,256):(tt=u,wt=h,-1),U=A,O=y,q=F=j=0,P=-1,N=(at=1<<(ot=nt))-1,f===1&&852<at||f===2&&592<at)return 1;for(;;){for(H=U-q,R=g[F]<k?(I=0,g[F]):g[F]>k?(I=wt[St+g[F]],tt[Ct+g[F]]):(I=96,0),S=1<<U-q,A=w=1<<ot;x[O+(j>>q)+(w-=S)]=H<<24|I<<16|R|0,w!==0;);for(S=1<<U-1;j&S;)S>>=1;if(S!==0?(j&=S-1,j+=S):j=0,F++,--Q[U]==0){if(U===Z)break;U=p[_+g[F]]}if(nt<U&&(j&N)!==P){for(q===0&&(q=nt),O+=A,rt=1<<(ot=U-q);ot+q<Z&&!((rt-=Q[ot+q])<=0);)ot++,rt<<=1;if(at+=1<<ot,f===1&&852<at||f===2&&592<at)return 1;x[P=j&N]=nt<<24|ot<<16|O-y|0}}return j!==0&&(x[O+j]=U-q<<24|64<<16|0),v.bits=nt,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function u(M){for(var B=M.length;0<=--B;)M[B]=0}var h=0,f=29,p=256,_=p+1+f,m=30,x=19,y=2*_+1,g=15,v=16,S=7,w=256,P=16,N=17,O=18,k=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],H=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],W=new Array(2*(_+2));u(W);var U=new Array(2*m);u(U);var F=new Array(512);u(F);var A=new Array(256);u(A);var Z=new Array(f);u(Z);var nt,ot,q,rt=new Array(m);function at(M,B,X,K,G){this.static_tree=M,this.extra_bits=B,this.extra_base=X,this.elems=K,this.max_length=G,this.has_stree=M&&M.length}function j(M,B){this.dyn_tree=M,this.max_code=0,this.stat_desc=B}function tt(M){return M<256?F[M]:F[256+(M>>>7)]}function Ct(M,B){M.pending_buf[M.pending++]=255&B,M.pending_buf[M.pending++]=B>>>8&255}function Q(M,B,X){M.bi_valid>v-X?(M.bi_buf|=B<<M.bi_valid&65535,Ct(M,M.bi_buf),M.bi_buf=B>>v-M.bi_valid,M.bi_valid+=X-v):(M.bi_buf|=B<<M.bi_valid&65535,M.bi_valid+=X)}function it(M,B,X){Q(M,X[2*B],X[2*B+1])}function wt(M,B){for(var X=0;X|=1&M,M>>>=1,X<<=1,0<--B;);return X>>>1}function St(M,B,X){var K,G,ft=new Array(g+1),lt=0;for(K=1;K<=g;K++)ft[K]=lt=lt+X[K-1]<<1;for(G=0;G<=B;G++){var pt=M[2*G+1];pt!==0&&(M[2*G]=wt(ft[pt]++,pt))}}function Pt(M){var B;for(B=0;B<_;B++)M.dyn_ltree[2*B]=0;for(B=0;B<m;B++)M.dyn_dtree[2*B]=0;for(B=0;B<x;B++)M.bl_tree[2*B]=0;M.dyn_ltree[2*w]=1,M.opt_len=M.static_len=0,M.last_lit=M.matches=0}function It(M){8<M.bi_valid?Ct(M,M.bi_buf):0<M.bi_valid&&(M.pending_buf[M.pending++]=M.bi_buf),M.bi_buf=0,M.bi_valid=0}function Ut(M,B,X,K){var G=2*B,ft=2*X;return M[G]<M[ft]||M[G]===M[ft]&&K[B]<=K[X]}function st(M,B,X){for(var K=M.heap[X],G=X<<1;G<=M.heap_len&&(G<M.heap_len&&Ut(B,M.heap[G+1],M.heap[G],M.depth)&&G++,!Ut(B,K,M.heap[G],M.depth));)M.heap[X]=M.heap[G],X=G,G<<=1;M.heap[X]=K}function xt(M,B,X){var K,G,ft,lt,pt=0;if(M.last_lit!==0)for(;K=M.pending_buf[M.d_buf+2*pt]<<8|M.pending_buf[M.d_buf+2*pt+1],G=M.pending_buf[M.l_buf+pt],pt++,K===0?it(M,G,B):(it(M,(ft=A[G])+p+1,B),(lt=k[ft])!==0&&Q(M,G-=Z[ft],lt),it(M,ft=tt(--K),X),(lt=H[ft])!==0&&Q(M,K-=rt[ft],lt)),pt<M.last_lit;);it(M,w,B)}function bt(M,B){var X,K,G,ft=B.dyn_tree,lt=B.stat_desc.static_tree,pt=B.stat_desc.has_stree,Tt=B.stat_desc.elems,Et=-1;for(M.heap_len=0,M.heap_max=y,X=0;X<Tt;X++)ft[2*X]!==0?(M.heap[++M.heap_len]=Et=X,M.depth[X]=0):ft[2*X+1]=0;for(;M.heap_len<2;)ft[2*(G=M.heap[++M.heap_len]=Et<2?++Et:0)]=1,M.depth[G]=0,M.opt_len--,pt&&(M.static_len-=lt[2*G+1]);for(B.max_code=Et,X=M.heap_len>>1;1<=X;X--)st(M,ft,X);for(G=Tt;X=M.heap[1],M.heap[1]=M.heap[M.heap_len--],st(M,ft,1),K=M.heap[1],M.heap[--M.heap_max]=X,M.heap[--M.heap_max]=K,ft[2*G]=ft[2*X]+ft[2*K],M.depth[G]=(M.depth[X]>=M.depth[K]?M.depth[X]:M.depth[K])+1,ft[2*X+1]=ft[2*K+1]=G,M.heap[1]=G++,st(M,ft,1),2<=M.heap_len;);M.heap[--M.heap_max]=M.heap[1],function(At,Ht){var zt,Dt,Kt,Vt,oe,ae,te=Ht.dyn_tree,Ft=Ht.max_code,D=Ht.stat_desc.static_tree,ht=Ht.stat_desc.has_stree,Mt=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,Nt=Ht.stat_desc.max_length,re=0;for(Vt=0;Vt<=g;Vt++)At.bl_count[Vt]=0;for(te[2*At.heap[At.heap_max]+1]=0,zt=At.heap_max+1;zt<y;zt++)Nt<(Vt=te[2*te[2*(Dt=At.heap[zt])+1]+1]+1)&&(Vt=Nt,re++),te[2*Dt+1]=Vt,Ft<Dt||(At.bl_count[Vt]++,oe=0,Rt<=Dt&&(oe=Mt[Dt-Rt]),ae=te[2*Dt],At.opt_len+=ae*(Vt+oe),ht&&(At.static_len+=ae*(D[2*Dt+1]+oe)));if(re!==0){do{for(Vt=Nt-1;At.bl_count[Vt]===0;)Vt--;At.bl_count[Vt]--,At.bl_count[Vt+1]+=2,At.bl_count[Nt]--,re-=2}while(0<re);for(Vt=Nt;Vt!==0;Vt--)for(Dt=At.bl_count[Vt];Dt!==0;)Ft<(Kt=At.heap[--zt])||(te[2*Kt+1]!==Vt&&(At.opt_len+=(Vt-te[2*Kt+1])*te[2*Kt],te[2*Kt+1]=Vt),Dt--)}}(M,B),St(ft,Et,M.bl_count)}function E(M,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),B[2*(X+1)+1]=65535,K=0;K<=X;K++)G=lt,lt=B[2*(K+1)+1],++pt<Tt&&G===lt||(pt<Et?M.bl_tree[2*G]+=pt:G!==0?(G!==ft&&M.bl_tree[2*G]++,M.bl_tree[2*P]++):pt<=10?M.bl_tree[2*N]++:M.bl_tree[2*O]++,ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4))}function et(M,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),K=0;K<=X;K++)if(G=lt,lt=B[2*(K+1)+1],!(++pt<Tt&&G===lt)){if(pt<Et)for(;it(M,G,M.bl_tree),--pt!=0;);else G!==0?(G!==ft&&(it(M,G,M.bl_tree),pt--),it(M,P,M.bl_tree),Q(M,pt-3,2)):pt<=10?(it(M,N,M.bl_tree),Q(M,pt-3,3)):(it(M,O,M.bl_tree),Q(M,pt-11,7));ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4)}}u(rt);var $=!1;function C(M,B,X,K){Q(M,(h<<1)+(K?1:0),3),function(G,ft,lt,pt){It(G),Ct(G,lt),Ct(G,~lt),o.arraySet(G.pending_buf,G.window,ft,lt,G.pending),G.pending+=lt}(M,B,X)}s._tr_init=function(M){$||(function(){var B,X,K,G,ft,lt=new Array(g+1);for(G=K=0;G<f-1;G++)for(Z[G]=K,B=0;B<1<<k[G];B++)A[K++]=G;for(A[K-1]=G,G=ft=0;G<16;G++)for(rt[G]=ft,B=0;B<1<<H[G];B++)F[ft++]=G;for(ft>>=7;G<m;G++)for(rt[G]=ft<<7,B=0;B<1<<H[G]-7;B++)F[256+ft++]=G;for(X=0;X<=g;X++)lt[X]=0;for(B=0;B<=143;)W[2*B+1]=8,B++,lt[8]++;for(;B<=255;)W[2*B+1]=9,B++,lt[9]++;for(;B<=279;)W[2*B+1]=7,B++,lt[7]++;for(;B<=287;)W[2*B+1]=8,B++,lt[8]++;for(St(W,_+1,lt),B=0;B<m;B++)U[2*B+1]=5,U[2*B]=wt(B,5);nt=new at(W,k,p+1,_,g),ot=new at(U,H,0,m,g),q=new at(new Array(0),I,0,x,S)}(),$=!0),M.l_desc=new j(M.dyn_ltree,nt),M.d_desc=new j(M.dyn_dtree,ot),M.bl_desc=new j(M.bl_tree,q),M.bi_buf=0,M.bi_valid=0,Pt(M)},s._tr_stored_block=C,s._tr_flush_block=function(M,B,X,K){var G,ft,lt=0;0<M.level?(M.strm.data_type===2&&(M.strm.data_type=function(pt){var Tt,Et=4093624447;for(Tt=0;Tt<=31;Tt++,Et>>>=1)if(1&Et&&pt.dyn_ltree[2*Tt]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Tt=32;Tt<p;Tt++)if(pt.dyn_ltree[2*Tt]!==0)return c;return l}(M)),bt(M,M.l_desc),bt(M,M.d_desc),lt=function(pt){var Tt;for(E(pt,pt.dyn_ltree,pt.l_desc.max_code),E(pt,pt.dyn_dtree,pt.d_desc.max_code),bt(pt,pt.bl_desc),Tt=x-1;3<=Tt&&pt.bl_tree[2*R[Tt]+1]===0;Tt--);return pt.opt_len+=3*(Tt+1)+5+5+4,Tt}(M),G=M.opt_len+3+7>>>3,(ft=M.static_len+3+7>>>3)<=G&&(G=ft)):G=ft=X+5,X+4<=G&&B!==-1?C(M,B,X,K):M.strategy===4||ft===G?(Q(M,2+(K?1:0),3),xt(M,W,U)):(Q(M,4+(K?1:0),3),function(pt,Tt,Et,At){var Ht;for(Q(pt,Tt-257,5),Q(pt,Et-1,5),Q(pt,At-4,4),Ht=0;Ht<At;Ht++)Q(pt,pt.bl_tree[2*R[Ht]+1],3);et(pt,pt.dyn_ltree,Tt-1),et(pt,pt.dyn_dtree,Et-1)}(M,M.l_desc.max_code+1,M.d_desc.max_code+1,lt+1),xt(M,M.dyn_ltree,M.dyn_dtree)),Pt(M),K&&It(M)},s._tr_tally=function(M,B,X){return M.pending_buf[M.d_buf+2*M.last_lit]=B>>>8&255,M.pending_buf[M.d_buf+2*M.last_lit+1]=255&B,M.pending_buf[M.l_buf+M.last_lit]=255&X,M.last_lit++,B===0?M.dyn_ltree[2*X]++:(M.matches++,B--,M.dyn_ltree[2*(A[X]+p+1)]++,M.dyn_dtree[2*tt(B)]++),M.last_lit===M.lit_bufsize-1},s._tr_align=function(M){Q(M,2,3),it(M,w,W),function(B){B.bi_valid===16?(Ct(B,B.bi_buf),B.bi_buf=0,B.bi_valid=0):8<=B.bi_valid&&(B.pending_buf[B.pending++]=255&B.bi_buf,B.bi_buf>>=8,B.bi_valid-=8)}(M)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var u,h,f,p,_=1,m={},x=!1,y=l.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(l);g=g&&g.setTimeout?g:l,u={}.toString.call(l.process)==="[object process]"?function(P){process.nextTick(function(){S(P)})}:function(){if(l.postMessage&&!l.importScripts){var P=!0,N=l.onmessage;return l.onmessage=function(){P=!1},l.postMessage("","*"),l.onmessage=N,P}}()?(p="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",w,!1):l.attachEvent("onmessage",w),function(P){l.postMessage(p+P,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(P){S(P.data)},function(P){f.port2.postMessage(P)}):y&&"onreadystatechange"in y.createElement("script")?(h=y.documentElement,function(P){var N=y.createElement("script");N.onreadystatechange=function(){S(P),N.onreadystatechange=null,h.removeChild(N),N=null},h.appendChild(N)}):function(P){setTimeout(S,0,P)},g.setImmediate=function(P){typeof P!="function"&&(P=new Function(""+P));for(var N=new Array(arguments.length-1),O=0;O<N.length;O++)N[O]=arguments[O+1];var k={callback:P,args:N};return m[_]=k,u(_),_++},g.clearImmediate=v}function v(P){delete m[P]}function S(P){if(x)setTimeout(S,0,P);else{var N=m[P];if(N){x=!0;try{(function(O){var k=O.callback,H=O.args;switch(H.length){case 0:k();break;case 1:k(H[0]);break;case 2:k(H[0],H[1]);break;case 3:k(H[0],H[1],H[2]);break;default:k.apply(c,H)}})(N)}finally{v(P),x=!1}}}}function w(P){P.source===l&&typeof P.data=="string"&&P.data.indexOf(p)===0&&S(+P.data.slice(p.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(tp);var L1=tp.exports;const C1=zd(L1);async function P1(i){if(!yt.tg||!yt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(yt.tg.traverse(m=>{if(!(m instanceof Ne))return;const x=m.geometry.clone();m.updateWorldMatrix(!0,!1),x.applyMatrix4(m.matrixWorld);const y=x.attributes.position,g=x.index;if(!y||y.count<3){x.dispose();return}let v="E4DFD8";const S=Array.isArray(m.material)?m.material[0]:m.material;S&&"color"in S&&(v=S.color.getHexString().toUpperCase());let w="";for(let N=0;N<y.count;N++)w+=`<vertex x="${y.getX(N).toFixed(4)}" y="${y.getZ(N).toFixed(4)}" z="${y.getY(N).toFixed(4)}"/>`;let P="";if(g)for(let N=0;N<g.count;N+=3)P+=`<triangle v1="${g.getX(N)}" v2="${g.getX(N+1)}" v3="${g.getX(N+2)}"/>`;else for(let N=0;N<y.count;N+=3)P+=`<triangle v1="${N}" v2="${N+1}" v3="${N+2}"/>`;x.dispose(),P&&t.push({id:e++,name:m.name||"mesh",col:v,vx:w,tr:P})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(m=>`<basematerials id="${m.id+1e3}"><base name="${m.name}" displaycolor="#${m.col}"/></basematerials>`).join(`
`),s=t.map(m=>`<object id="${m.id}" type="model" p:pid="${m.id+1e3}" p:pindex="0"><mesh><vertices>${m.vx}</vertices><triangles>${m.tr}</triangles></mesh></object>`).join(`
`),o=t.map(m=>`<item objectid="${m.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),u=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),h=new C1;h.file("[Content_Types].xml",u),h.folder("_rels").file(".rels",c),h.folder("3D").file("3dmodel.model",l);const f=await h.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(_),_.click(),document.body.removeChild(_),URL.revokeObjectURL(p)}let Zn=null,Ye=null,mn=null,Xn=null,Ld="",Qe=null,xn=null,ii=null,_c="",vc=[],Cd="";const Se={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},ao={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0},On={};let ep=1,np=1,R1=0;const si=[];let qn=[];const lo=new Map;let to=-1,ka=!1,zc="",Ua=200,za=200,Bc=2,Fc=1;const qr={},wa={};let jr=null,Pd="",ds=null,Ma=null,yc=[],ar=null,Te=null,ts=null,zs=null,Hc=!1;const ms=256,I1=2048;let jn=[];const es=[];function ip(){if(!Te||!ts)return!1;const i=ts.getBoundingClientRect();return!i.width||!i.height?!1:(Te.style.left=`${i.left}px`,Te.style.top=`${i.top}px`,Te.style.width=`${i.width}px`,Te.style.height=`${i.height}px`,Zn&&(Zn.setSize(i.width,i.height,!1),mn.aspect=i.width/i.height,mn.updateProjectionMatrix()),!0)}function Rd(){if(!Te||!Hc)return;ip()&&Te.style.display==="none"&&(Te.style.display="block")}function Sa(i){if(Te||(Te=document.getElementById("dims-canvas")),ts!==i&&(zs&&ts&&zs.unobserve(ts),ts=i,zs||(zs=new ResizeObserver(Rd),window.addEventListener("resize",Rd)),zs.observe(i)),Hc=!0,ip()&&Te&&(Te.style.display="block"),Zn)return;const t=i.getBoundingClientRect(),e=t.width||800,n=t.height||600;Zn=new Mf({canvas:Te,antialias:!0}),Zn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Zn.setSize(e,n,!1),Ye=new Sf,Ye.background=new Qt(527380),mn=new En(42,e/n,.1,1e5),Xn=new Uf(mn,Te),Xn.enableDamping=!0,Xn.dampingFactor=.06,Ye.add(new Of(16777215,.8));const s=new fc(16777215,.6);s.position.set(1.5,3,2),Ye.add(s);const o=()=>{requestAnimationFrame(o),Xn.update(),Zn.render(Ye,mn),aw()};o()}function rp(){Hc=!1,Te&&(Te.style.display="none")}function pr(i){if(Object.assign(Se,i),Qe&&(xn&&(xn.dispose(),xn=null),xn=cp(Qe.bounds,Qe.grid,ms,Qe.minE,Qe.elevRange,vc),ds)){const l=ds.material;l.map=xn,l.needsUpdate=!0}const t=On.base??1;Ma&&Ma.material.color.set(Se[t]??Se[1]);const e=On.facade??1,n=new Qt(Se[e]??Se[1]);for(const l of yc)l.material.color.set(n);if(ar){const l=On.gpx_line??6,c=Se[l]??"#ff4500";ar.traverse(u=>{const h=u.material;h?.color&&h.color.set(c)}),ar.visible=ao.gpx_line??!0}const s=On.gpx??6,o=Se[s]??"#ff4500";for(const l of qn)l.traverse(c=>{const u=c.material;u?.color&&u.color.set(o)})}function D1(i,t){On[i]=t,pr({})}function sp(i,t){if(ao[i]=t,i==="gpx_line")ar&&(ar.visible=t);else if(i==="gpx")for(const e of qn)e.visible=t;else pr({})}function N1(i,t){ep=i,np=t}function O1(i){ka=!0,zc=i,Te&&(Te.style.cursor="crosshair")}function op(){ka=!1,zc="",Te&&(Te.style.cursor="")}function ap(){return ka}function k1(i,t){if(!ka||!Ye||!mn||!ds||!Te)return-1;const e=Te.getBoundingClientRect(),n=(i-e.left)/e.width*2-1,s=-((t-e.top)/e.height)*2+1,o=new kf;o.setFromCamera(new vt(n,s),mn);const l=o.intersectObject(ds);let c=-1;if(l.length>0){const u=l[0].point,h=.5-u.z/za,f=.5+u.x/Ua,p=R1++,_={id:p,latFrac:h,lonFrac:f,shape:zc,visible:!0,diameterMult:10,rotDeg:0,flatTop:!0,heightOffMult:2};si.push(_),Gc(_,si.length-1),c=p}return op(),c}function xc(){return si.map(i=>({id:i.id,shape:i.shape,visible:i.visible,diameterMult:i.diameterMult,rotDeg:i.rotDeg,flatTop:i.flatTop,heightOffMult:i.heightOffMult}))}function bc(){return to}function lp(i){to=i}function U1(){to=-1}function z1(i,t){if(!Ye||!mn||!Te||qn.length===0)return-1;const e=Te.getBoundingClientRect(),n=(i-e.left)/e.width*2-1,s=-((t-e.top)/e.height)*2+1,o=new kf;o.setFromCamera(new vt(n,s),mn);const l=o.intersectObjects(qn,!0);if(!l.length)return-1;let c=l[0].object;for(;c;){const u=lo.get(c);if(u!==void 0)return u;c=c.parent}return-1}function wc(i,t){const e=si.findIndex(o=>o.id===i);if(e<0)return;Object.assign(si[e],t);const n=qn[e];if(n){lo.delete(n),Ye?.remove(n);const o=jn.indexOf(n);o>=0&&jn.splice(o,1),qn.splice(e,1)}const s=si[e];Gc(s,e)}function B1(i,t){wc(i,{visible:t})}function F1(i){const t=si.findIndex(n=>n.id===i);if(t<0)return;si.splice(t,1);const e=qn.splice(t,1)[0];if(e){lo.delete(e),Ye?.remove(e);const n=jn.indexOf(e);n>=0&&jn.splice(n,1)}to===i&&(to=-1)}async function H1(i,t,e){if(!Ye||!mn||!Xn||!Zn)return;const n=`${i.minLat}|${i.maxLat}|${i.minLon}|${i.maxLon}`;if(n!==Ld){if(Ld=n,Qe=null,xn&&(xn.dispose(),xn=null),e(5,"Téléchargement des altitudes…"),Qe=await sw(i),e(35,"Chargement des données géographiques…"),n!==Cd){const l=await G1(i);l.length>0&&(Cd=n,vc=l)}e(70,"Génération de la texture…"),xn=cp(i,Qe.grid,ms,Qe.minE,Qe.elevRange,vc)}else e(50,"Reconstruction…");const o=JSON.stringify(t.zonePts);(o!==_c||!ii)&&(_c=o,ii&&(ii.dispose(),ii=null),ii=X1(t.zonePts,t.zoneType,i)),e(88,"Construction de la scène 3D…"),co(t),e(100,"")}function co(i){if(!Ye||!mn||!Xn||!Qe||!xn)return;ow();const{wMm:t,dMm:e,baseH:n,exag:s,flatFacade:o,facadeWidthMm:l,gpxPoints:c,zoneType:u,zonePts:h,bounds:f}=i,{grid:p,minE:_,elevRange:m}=Qe,x=f??Qe.bounds,y=(x.minLat+x.maxLat)/2,g=(x.maxLon-x.minLon)*Math.cos(y*Math.PI/180)*111320,v=(x.maxLat-x.minLat)*111320,S=Math.max(g,v),w=Math.max(t,e),P=Math.max(1,Math.min(w*.5,m/S*w*s)),N=n+P,O=ms,k=q1(h,u,x,t,e),H=Math.max(1,l);ds=null,Ma=null,yc=[],ar=null,jr=null,qn=[];{const nt=new ro(t,e,O-1,O-1);nt.rotateX(-Math.PI/2);const ot=nt.attributes.position;for(let rt=0;rt<ot.count;rt++)ot.setY(rt,n+(p[rt]-_)/m*P);ot.needsUpdate=!0,nt.computeVertexNormals();const q=new Ne(nt,new Xs({map:xn,alphaMap:ii??void 0,transparent:!!ii}));ds=q,Yr(q)}const I=On.base??1,R=new Qt(Se[I]??Se[1]),W=new Ne(j1(k,u,t,e,n,H),new Xs({color:R,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));Ma=W,Yr(W);const U=On.facade??1,F=new Qt(Se[U]??Se[1]),A=new Xs({color:F,side:fn});for(const nt of Y1(k,u,t,e,H,o,N,p,O,_,m,n,P))nt.material=A,yc.push(nt),Yr(nt);if(c.length>=2){const nt=nw(c,x,t,e,p,O,_,m,n,P);nt&&(nt.visible=ao.gpx_line??!0,ar=nt,Yr(nt))}{const nt=new Gx(new eb(new hn(t+H*2,N,e+H*2)),new Da({color:16718362}));nt.position.y=N/2,Yr(nt)}es.length=0,es.push({id:"dl-width",v:new J(0,2,e/2+H+14)}),es.push({id:"dl-depth",v:new J(t/2+H+14,N*.1,0)}),es.push({id:"dl-height",v:new J(-t/2-H-12,N/2,e/2+8)}),Wr("dl-width",`${t} mm`),Wr("dl-depth",`${e} mm`),Wr("dl-height",`~${Math.round(N*10)/10} mm`),Wr("dp-total-val",`~${Math.round(N*10)/10}`),Wr("dp-map-h",`~${Math.round(P*10)/10}`),Wr("dp-base-h-disp",`${n}`),Ua=t,za=e,Bc=n,Fc=P,lo.clear();for(let nt=0;nt<si.length;nt++)Gc(si[nt],nt);Vc();const Z=Math.sqrt(t*t+e*e);if(Xn.target.lengthSq()<.1){mn.position.set(t*.7,N+Z*.44,e*.92);const nt=new J(0,N*.2,0);mn.lookAt(nt),Xn.target.copy(nt),Xn.update()}}function V1(){Xn&&Xn.target.set(0,0,0),xn&&(xn.dispose(),xn=null),ii&&(ii.dispose(),ii=null),_c=""}async function G1(i){const{minLat:t,minLon:e,maxLat:n,maxLon:s}=i,o=`(${t},${e},${n},${s})`,l=`[out:json][timeout:28];
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
out geom;`,c=new AbortController,u=setTimeout(()=>c.abort(),22e3);try{const h=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(l)}`,{signal:c.signal});return clearTimeout(u),(await h.json()).elements??[]}catch{return clearTimeout(u),[]}}const W1=[{id:"veg_low",match:i=>i.natural==="grassland"||i.landuse==="meadow"||i.landuse==="grass"||i.landuse==="farmland"||i.natural==="fell"||i.natural==="moor"||i.natural==="heath"||i.natural==="scrub",slot:3,fill:!0},{id:"veg_dense",match:i=>i.natural==="wood"||i.landuse==="forest",slot:4,fill:!0},{id:"wetland",match:i=>i.natural==="wetland"||i.natural==="mud",slot:3,fill:!0},{id:"snow",match:i=>i.natural==="glacier"||i.natural==="snow",slot:2,fill:!0},{id:"water",match:i=>i.natural==="water"||i.waterway==="riverbank",slot:5,fill:!0},{id:"waterways",match:i=>!!i.waterway&&i.waterway!=="riverbank",slot:5,fill:!1}];function Z1(i,t){const e=n=>{if(n.length<3)return 0;let s=0;for(let o=0,l=n.length-1;o<n.length;l=o++)s+=(n[l].lon+n[o].lon)*(n[l].lat-n[o].lat);return Math.abs(s)/2*(t*111320)*111320};return i.type==="way"&&i.geometry?e(i.geometry):i.type==="relation"&&i.members?i.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,s)=>n+e(s.geometry),0):0}function cp(i,t,e,n,s,o){const l=I1,c=document.createElement("canvas");c.width=c.height=l;const u=c.getContext("2d"),h=u.createImageData(l,l),f=h.data;for(let g=0;g<l;g++)for(let v=0;v<l;v++){const S=v/(l-1)*(e-1),w=g/(l-1)*(e-1),P=Math.min(e-2,Math.floor(S)),N=Math.min(e-2,Math.floor(w)),O=S-P,k=w-N,H=t[N*e+P]*(1-O)*(1-k)+t[N*e+P+1]*O*(1-k)+t[(N+1)*e+P]*(1-O)*k+t[(N+1)*e+P+1]*O*k,I=Math.max(0,Math.min(1,(H-n)/s)),[R,W,U]=rw(I),F=(g*l+v)*4;f[F]=R,f[F+1]=W,f[F+2]=U,f[F+3]=255}u.putImageData(h,0,0);const p=document.getElementById("cp-filter"),_=p?Number(p.value):100,m=Math.cos((i.minLat+i.maxLat)/2*Math.PI/180),x=(i.maxLon-i.minLon)*m*111320*(i.maxLat-i.minLat)*111320,y=Math.pow(1-_/100,2)*.02*x;for(const g of W1){if(!ao[g.id])continue;const v=o.filter(P=>!P.tags||!g.match(P.tags)?!1:!g.fill||y<=0?!0:Z1(P,m)>=y);if(!v.length)continue;const S=On[g.id]??g.slot,w=Se[S]??"#888";if(g.fill){u.beginPath();for(const P of v)Id(u,P,i,l);u.fillStyle=w,u.fill("evenodd")}else for(const P of v){if(!P.tags)continue;const N=P.tags.waterway??"",O=N==="river"?7:N==="canal"?5:N==="stream"?2.5:1.5;u.beginPath(),Id(u,P,i,l),u.strokeStyle=w,u.lineWidth=O,u.lineCap="round",u.lineJoin="round",u.stroke()}}return new Ef(c)}function Id(i,t,e,n){const s=o=>{if(!(!o||o.length<2)){for(let l=0;l<o.length;l++){const c=(o[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,u=(1-(o[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?i.moveTo(c,u):i.lineTo(c,u)}i.closePath()}};if(t.type==="way"&&t.geometry)s(t.geometry);else if(t.type==="relation"&&t.members)for(const o of t.members)o.role==="outer"&&o.geometry&&s(o.geometry)}function X1(i,t,e,n,s){if(!i||i.length<3||t==="rect"||t==="sq")return null;const o=512,l=document.createElement("canvas");l.width=l.height=o;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,o,o),c.fillStyle="white",c.beginPath();for(let u=0;u<i.length;u++){const[h,f]=i[u],p=(f-e.minLon)/(e.maxLon-e.minLon)*o,_=(1-(h-e.minLat)/(e.maxLat-e.minLat))*o;u===0?c.moveTo(p,_):c.lineTo(p,_)}return c.closePath(),c.fill(),new Ef(l)}function q1(i,t,e,n,s){return!i||i.length<3||t==="rect"||t==="sq"?[[-n/2,-s/2],[n/2,-s/2],[n/2,s/2],[-n/2,s/2]]:i.map(([o,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(o-e.minLat)/(e.maxLat-e.minLat))*s-s/2])}function j1(i,t,e,n,s,o){if(t==="rect"||t==="sq"){const u=new hn(e+o*2,s,n+o*2);return u.translate(0,s/2,0),u}const l=new Na;if(t==="circ"){const u=e/2+o,h=n/2+o;for(let f=0;f<=64;f++){const p=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(p)*u,Math.sin(p)*h):l.lineTo(Math.cos(p)*u,Math.sin(p)*h)}}else{l.moveTo(i[0][0],i[0][1]);for(let u=1;u<i.length;u++)l.lineTo(i[u][0],i[u][1]);l.closePath()}const c=new so(l,{depth:s,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function Y1(i,t,e,n,s,o,l,c,u,h,f,p,_){const m=(y,g)=>{const v=Math.max(0,Math.min(1,(y+e/2)/e)),S=Math.max(0,Math.min(1,(g+n/2)/n)),w=v*(u-1),P=S*(u-1),N=Math.min(u-2,Math.floor(w)),O=Math.min(u-2,Math.floor(P)),k=w-N,H=P-O,I=c[O*u+N]*(1-k)*(1-H)+c[O*u+N+1]*k*(1-H)+c[(O+1)*u+N]*(1-k)*H+c[(O+1)*u+N+1]*k*H;return p+(I-h)/f*_};return t==="rect"||t==="sq"?o?$1(e,n,s,l):K1(e,n,s,u,c,h,f,p,_):J1(i,s,o?()=>l:m)}function $1(i,t,e,n){const s=(o,l,c,u,h)=>{const f=new Ne(new hn(o,l,c));return f.position.set(u,l/2,h),f};return[s(i+e*2,n,e,0,t/2+e/2),s(i+e*2,n,e,0,-t/2-e/2),s(e,n,t,i/2+e/2,0),s(e,n,t,-i/2-e/2,0)]}function K1(i,t,e,n,s,o,l,c,u){const h=(S,w)=>c+(s[w*n+S]-o)/l*u,f=Math.min(n-1,64),p=S=>Math.round(S/f*(n-1)),_=h(0,n-1),m=h(n-1,n-1),x=h(0,0),y=h(n-1,0),g=[[-i/2-e,t/2,_],...Array.from({length:f+1},(S,w)=>{const P=p(w);return[-i/2+P/(n-1)*i,t/2,h(P,n-1)]}),[i/2+e,t/2,m]],v=[[i/2+e,-t/2,y],...Array.from({length:f+1},(S,w)=>{const P=p(w);return[i/2-P/(n-1)*i,-t/2,h(n-1-P,0)]}),[-i/2-e,-t/2,x]];return[Hs(g,[0,0,1],e),Hs(v,[0,0,-1],e),Hs(Array.from({length:f+1},(S,w)=>{const P=p(w);return[i/2,t/2-P/(n-1)*t,h(n-1,n-1-P)]}),[1,0,0],e),Hs(Array.from({length:f+1},(S,w)=>{const P=p(w);return[-i/2,-t/2+P/(n-1)*t,h(0,P)]}),[-1,0,0],e)]}function J1(i,t,e){const n=[],s=i.length;for(let o=0;o<s;o++){const[l,c]=i[o],[u,h]=i[(o+1)%s],f=u-l,p=h-c,_=Math.sqrt(f*f+p*p);if(_<.5)continue;const m=p/_,x=-f/_,y=Math.max(2,Math.round(_/3)),g=[];for(let v=0;v<=y;v++){const S=v/y,w=l+f*S,P=c+p*S;g.push([w,P,e(w,P)])}n.push(Hs(g,[m,0,x],t))}return n}function Hs(i,t,e){const n=i.length,[s,,o]=t,l=[],c=[];for(const[m,x,y]of i)l.push(m+s*e,0,x+o*e),l.push(m+s*e,y,x+o*e);for(const[m,x,y]of i)l.push(m,0,x),l.push(m,y,x);for(const[m,x,y]of i)l.push(m+s*e,y,x+o*e),l.push(m,y,x);for(const[m,x]of i)l.push(m+s*e,0,x+o*e),l.push(m,0,x);const u=0,h=n*2,f=n*4,p=n*6;for(let m=0;m<n-1;m++){const x=m*2;c.push(u+x,u+x+2,u+x+1,u+x+1,u+x+2,u+x+3),c.push(h+x,h+x+1,h+x+2,h+x+1,h+x+3,h+x+2),c.push(f+x,f+x+1,f+x+2,f+x+1,f+x+3,f+x+2),c.push(p+x,p+x+2,p+x+1,p+x+1,p+x+2,p+x+3)}const _=new Oe;return _.setAttribute("position",new _e(l,3)),_.setIndex(c),_.computeVertexNormals(),new Ne(_)}async function Q1(i){const t=`${i.minLat}|${i.maxLat}|${i.minLon}|${i.maxLon}`;if(t===Pd)return;const e=`(${i.minLat},${i.minLon},${i.maxLat},${i.maxLon})`,n=`[out:json][timeout:50];
(
  way["highway"~"^(motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link|unclassified|living_street|residential)$"]${e};
  way["railway"~"^(rail|narrow_gauge|light_rail|funicular|monorail|tram|subway)$"]${e};
  way["piste:type"]${e};
  relation["route"~"^(hiking|foot|bicycle|mtb|horse)$"]${e};
);
out geom;`,s=new AbortController,o=setTimeout(()=>s.abort(),45e3);let l;try{const u=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(n)}`,{signal:s.signal});clearTimeout(o),l=await u.json()}catch(u){throw clearTimeout(o),u}for(const u of Object.keys(qr))delete qr[u];const c=(u,h)=>{qr[u]||(qr[u]=[]),qr[u].push(h)};for(const u of l.elements)if(u.type==="way"){const h=u.tags??{},f=u.geometry??[];if(f.length<2)continue;if(h.highway){const _={motorway:"road_motorway",motorway_link:"road_motorway",trunk:"road_trunk",trunk_link:"road_trunk",primary:"road_primary",primary_link:"road_primary",secondary:"road_secondary",secondary_link:"road_secondary",tertiary:"road_tertiary",tertiary_link:"road_tertiary",unclassified:"road_unclassified",living_street:"street_living",residential:"street_residential"}[h.highway];_&&c(_,f)}h.railway&&c({narrow_gauge:"rail_narrow",rail:"rail_standard",light_rail:"rail_light",funicular:"rail_funicular",monorail:"rail_monorail",tram:"rail_tram",subway:"rail_subway"}[h.railway]??"rail_unknown",f),h["piste:type"]&&c({easy:"piste_easy",novice:"piste_novice",intermediate:"piste_intermediate",advanced:"piste_advanced",expert:"piste_expert",freeride:"piste_freeride"}[h["piste:difficulty"]??""]??"piste_other",f)}else if(u.type==="relation"){const h=u.tags??{},f=h.route??"",p=h.network??"",_=(u.members??[]).filter(g=>g.type==="way"&&(g.geometry?.length??0)>=2).map(g=>g.geometry);if(!_.length)continue;const x={hiking:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},foot:{iwn:"hiking_iwn",nwn:"hiking_nwn",rwn:"hiking_rwn",lwn:"hiking_lwn"},bicycle:{icn:"cycling_icn",ncn:"cycling_ncn",rcn:"cycling_rcn",lcn:"cycling_lcn"},mtb:{"":"mtb_local"},horse:{ihwn:"equestrian_iwn",nhwn:"equestrian_nwn",rhwn:"equestrian_rwn",lhwn:"equestrian_lwn"}}[f];if(!x)continue;let y;if(f==="mtb"){const g=h["mtb:scale"]??"";y=g?`mtb_${g}`:"mtb_local"}else y=x[p]??Object.values(x).at(-1);for(const g of _)c(y,g)}Pd=t,Vc()}function Dd(i,t){wa[i]=t,Vc()}function Vc(){if(jr){Ye?.remove(jr);const f=jn.indexOf(jr);f>=0&&jn.splice(f,1),jr=null}if(!Qe||!Ye)return;const{grid:i,minE:t,elevRange:e,bounds:n}=Qe,s=ms,o=Ua,l=za,c=Bc,u=Fc,h=new Jr;for(const[f,p]of Object.entries(qr)){if(wa[f]===!1)continue;const _=tw(f),m=new Da({color:_});for(const x of p){const y=[];for(const g of x){const v=(g.lon-n.minLon)/(n.maxLon-n.minLon),S=(g.lat-n.minLat)/(n.maxLat-n.minLat);if(v<0||v>1||S<0||S>1)continue;const w=(v-.5)*o,P=(.5-S)*l,N=v*(s-1),O=(1-S)*(s-1),k=Math.min(s-2,Math.floor(N)),H=Math.min(s-2,Math.floor(O)),I=N-k,R=O-H,W=i[H*s+k]*(1-I)*(1-R)+i[H*s+k+1]*I*(1-R)+i[(H+1)*s+k]*(1-I)*R+i[(H+1)*s+k+1]*I*R;y.push(new J(w,c+(W-t)/e*u+.6,P))}y.length>=2&&h.add(new Rc(new Oe().setFromPoints(y),m))}}h.children.length>0&&(Ye.add(h),jn.push(h),jr=h)}function tw(i){return i.startsWith("road_motorway")?14820122:i.startsWith("road_trunk")?15041054:i.startsWith("road_primary")?16110375:i.startsWith("road_secondary")?13951528:i.startsWith("road_tertiary")?11184810:i.startsWith("road_")?13421772:i.startsWith("street_")?14540253:i.startsWith("rail_")?5592439:i.startsWith("hiking_")?16737792:i.startsWith("cycling_")?26316:i.startsWith("mtb_")?8930304:i.startsWith("equestrian_")?10053171:i.startsWith("piste_easy")?43775:i.startsWith("piste_novice")?52292:i.startsWith("piste_intermediate")?13378082:i.startsWith("piste_")?2236962:8947848}function ew(i,t){const e=new Na;switch(i){case"square":e.moveTo(-t,-t),e.lineTo(t,-t),e.lineTo(t,t),e.lineTo(-t,t),e.closePath();break;case"diamond":e.moveTo(0,-t),e.lineTo(t*.72,0),e.lineTo(0,t),e.lineTo(-t*.72,0),e.closePath();break;case"triangle":e.moveTo(0,t),e.lineTo(t*.866,-t*.5),e.lineTo(-t*.866,-t*.5),e.closePath();break;case"cross":{const n=t*.32;e.moveTo(-n,-t),e.lineTo(n,-t),e.lineTo(n,-n),e.lineTo(t,-n),e.lineTo(t,n),e.lineTo(n,n),e.lineTo(n,t),e.lineTo(-n,t),e.lineTo(-n,n),e.lineTo(-t,n),e.lineTo(-t,-n),e.lineTo(-n,-n),e.closePath();break}case"heart":{e.moveTo(0,-t*.25),e.bezierCurveTo(-t*.05,-t*.55,-t,-t*.55,-t,t*.1),e.bezierCurveTo(-t,t*.65,-t*.45,t*.88,0,t),e.bezierCurveTo(t*.45,t*.88,t,t*.65,t,t*.1),e.bezierCurveTo(t,-t*.55,t*.05,-t*.55,0,-t*.25),e.closePath();break}case"star":{const n=t,s=t*.42;for(let o=0;o<10;o++){const l=o*Math.PI/5-Math.PI/2,c=o%2===0?n:s,u=Math.cos(l)*c,h=Math.sin(l)*c;o===0?e.moveTo(u,h):e.lineTo(u,h)}e.closePath();break}default:e.absarc(0,0,t,0,Math.PI*2,!1);break}return e}function Nd(i,t,e,n){const s=Math.max(0,Math.min(t-2,e*(t-1))),o=Math.max(0,Math.min(t-2,n*(t-1))),l=Math.floor(s),c=Math.floor(o),u=s-l,h=o-c;return i[c*t+l]*(1-u)*(1-h)+i[c*t+l+1]*u*(1-h)+i[(c+1)*t+l]*(1-u)*h+i[(c+1)*t+l+1]*u*h}function Gc(i,t){if(!Qe||!Ye)return;const{grid:e,minE:n,elevRange:s}=Qe,o=ms,l=Ua,c=za,u=Bc,h=Fc,f=.42,p=.2,_=i.diameterMult*f/2,m=.5,x=i.heightOffMult*p,y=i.lonFrac,g=1-i.latFrac,v=(y-.5)*l,S=(.5-(1-g))*c;let w;if(i.flatTop){let R=-1/0;const W=8;for(let U=0;U<=W;U++)for(let F=0;F<=W;F++){const A=U/W,Z=F/W,nt=y+(A-.5)*(_*2)/l,ot=g+(Z-.5)*(_*2)/c,q=Math.max(0,Math.min(1,nt)),rt=Math.max(0,Math.min(1,ot)),at=Nd(e,o,q,rt);at>R&&(R=at)}w=u+(R-n)/s*h}else{const R=Nd(e,o,y,g);w=u+(R-n)/s*h}const P=On.gpx??6,N=Se[P]??"#ff4500",O=new Xs({color:N,side:fn}),k=ew(i.shape,_),H=new so(k,{depth:m,bevelEnabled:!1});H.rotateX(-Math.PI/2),i.rotDeg!==0&&H.rotateY(i.rotDeg*Math.PI/180);const I=new Ne(H,O);I.position.set(v,w+x,S),I.visible=i.visible&&(ao.gpx??!0),lo.set(I,i.id),t>=qn.length?(Yr(I),qn.push(I)):(Ye.add(I),jn.push(I),qn.splice(t,0,I))}function nw(i,t,e,n,s,o,l,c,u,h){const f=[];for(const x of i){const y=Math.max(5e-4,Math.min(.9995,(x.lon-t.minLon)/(t.maxLon-t.minLon))),g=Math.max(5e-4,Math.min(.9995,(x.lat-t.minLat)/(t.maxLat-t.minLat))),v=(y-.5)*e,S=(.5-g)*n,w=y*(o-1),P=(1-g)*(o-1),N=Math.min(o-2,Math.floor(w)),O=Math.min(o-2,Math.floor(P)),k=w-N,H=P-O,I=s[O*o+N]*(1-k)*(1-H)+s[O*o+N+1]*k*(1-H)+s[(O+1)*o+N]*(1-k)*H+s[(O+1)*o+N+1]*k*H,R=np*.2,W=new J(v,u+(I-l)/c*h+R,S);f.length>0&&W.distanceTo(f[f.length-1])<.08||f.push(W)}if(f.length<2)return null;const p=On.gpx_line??6,_=Se[p]??"#ff4500",m=ep*.21;if(m>=.1){const x=new uc(f,!1,"centripetal"),y=Math.min(2e3,Math.max(80,f.length*5)),g=x.getSpacedPoints(y),v=new Oc(new uc(g,!1,"catmullrom"),y,m,8,!1);return new Ne(v,new Xs({color:_}))}return new Rc(new Oe().setFromPoints(f),new Da({color:_}))}function iw(i){const t=parseInt(i.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function rw(i){const t=On.terrain??1,[e,n,s]=iw(Se[t]??Se[1]),o=.78+i*.44;return[Math.min(255,Math.round(e*o)),Math.min(255,Math.round(n*o)),Math.min(255,Math.round(s*o))]}async function sw(i){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=s=>{s.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:s.data.elevGrid,minE:s.data.minE,elevRange:s.data.elevRange,bounds:i})):s.data.type==="ERROR"&&(n.terminate(),e(new Error(s.data.message)))},n.onerror=s=>{n.terminate(),e(s)},n.postMessage({type:"BUILD_TERRAIN",bounds:i,GRID:ms,elevZoom:12})})}function Yr(i){Ye.add(i),jn.push(i)}function Wr(i,t){const e=document.getElementById(i);e&&(e.textContent=t)}function ow(){jn.forEach(i=>{Ye.remove(i),i.geometry?.dispose()}),jn=[],es.length=0}function aw(){if(!mn||!Zn)return;const i=Zn.domElement.clientWidth,t=Zn.domElement.clientHeight;if(!(!i||!t))for(const{id:e,v:n}of es){const s=document.getElementById(e);if(!s)continue;const o=n.clone().project(mn);if(o.z>1){s.style.opacity="0";continue}s.style.opacity="1",s.style.left=`${(o.x+1)/2*i}px`,s.style.top=`${-(o.y-1)/2*t}px`}}const lw=.05;function cw(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function uw(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function Wc(){if(!yt.bounds){Ql("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(yt.generating)return;yt.generating=!0;const i=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");i.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),ll(!0);try{const n=document.getElementById("c3d");await kc(n);const s=Bd(),{bounds:o,wMm:l,dMm:c}=yt,{minLat:u,maxLat:h,minLon:f,maxLon:p}=o,_=(u+h)/2,m=(f+p)/2,x=(p-f)*Math.cos(_*Math.PI/180)*111320;yt.mmPerMeter=l/x,yt.BASE_H=s.baseH,Ei(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const y=s.terrainRes,g=await new Promise((H,I)=>{const R=cw();R.onmessage=U=>{U.data.type==="PROGRESS"?Ei(5+U.data.pct*.2,"ÉLÉVATION","Altitude…"):U.data.type==="TERRAIN_READY"?(R.terminate(),H(U.data)):U.data.type==="ERROR"&&(R.terminate(),I(new Error(U.data.message)))},R.onerror=U=>{R.terminate(),I(U)};const W={type:"BUILD_TERRAIN",bounds:o,GRID:y,elevZoom:s.elevZoom};R.postMessage(W)});yt.elevGrid=g.elevGrid,yt.GRID=g.GRID,yt.minE=g.minE,yt.elevRange=g.elevRange;const S=(h-u)*111320,w=Math.max(x,S),P=Math.max(l,c),N=g.elevRange/w*P*s.exag;yt.elevScaleMm=Math.max(1,Math.min(P*.5,N)),s.smooth>0&&hw(yt.elevGrid,y,s.smooth),Ei(30,"DONNÉES","Chargement des données cartographiques…");const O=await A1(o,H=>{Ei(30+H*.3,"DONNÉES","Données carto…")});Ei(60,"GÉOMÉTRIE","Génération des géométries 3D…");const k=await new Promise((H,I)=>{const R=uw();R.onmessage=U=>{U.data.type==="GEO_PROGRESS"?Ei(60+U.data.pct*.35,"GÉOMÉTRIE",`${U.data.step}…`):U.data.type==="GEOMETRY_READY"?(R.terminate(),H(U.data)):U.data.type==="ERROR"&&(R.terminate(),I(new Error(U.data.message)))},R.onerror=U=>{R.terminate(),I(U)};const W={type:"BUILD_GEOMETRY",elevGrid:yt.elevGrid,GRID:yt.GRID,wMm:l,dMm:c,BASE_H:yt.BASE_H,MIN_SURF:lw,elevScaleMm:yt.elevScaleMm,minE:yt.minE,elevRange:yt.elevRange,features:O,gpxPoints:yt.gpxPoints,bounds:o,settings:s,zoneType:yt.zoneType,zonePts:yt.zonePts,mmPerMeter:yt.mmPerMeter};R.postMessage(W)});Ei(95,"SCÈNE","Construction de la scène 3D…"),Ib(k),Ei(100,"TERMINÉ","Modèle 3D prêt."),yt.generated=!0,yt.generating=!1,setTimeout(()=>{ll(!1),document.getElementById("hint3d").style.display="block",dw(g.minE,g.maxE,yt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){yt.generating=!1,ll(!1),Ql("ERREUR",String(n)),console.error(n)}finally{i.disabled=!1}}function hw(i,t,e){const n=new Float32Array(i.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,u=0;for(let h=-1;h<=1;h++)for(let f=-1;f<=1;f++){const p=o+h,_=l+f;p>=0&&p<t&&_>=0&&_<t&&(c+=i[p*t+_],u++)}n[o*t+l]=c/u}i.set(n)}}function dw(i,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(i)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function fw(){const i=document.getElementById("zone-footer");i&&(yt.bounds?(i.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),V1()):(i.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}let Ea=!1,Jl=!1;function uo(){const i=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:i("dp-w",yt.wMm||200),dMm:i("dp-d",yt.dMm||200),baseH:i("dp-base",5),exag:i("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:i("dp-walls",2),gpxPoints:yt.gpxPoints,zoneType:yt.zoneType,zonePts:yt.zonePts,bounds:yt.bounds}}function up(){const i=(_,m)=>{const x=document.getElementById(_);x&&(x.value=String(Math.round(m)))};if(!yt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:s}=yt.bounds,o=(t+e)/2,l=(s-n)*Math.cos(o*Math.PI/180)*111320,c=(e-t)*111320,u=200,h=l/c,f=h>=1?u:Math.max(10,Math.round(u*h)),p=h<1?u:Math.max(10,Math.round(u/h));yt.wMm=f,yt.dMm=p,i("dp-w",f),i("dp-d",p)}function mr(){const i=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=document.getElementById("dp-layers-hint"),o=document.getElementById("dp-wall-mm");s&&(s.textContent=`${Math.round(i/e)} couches`),o&&(o.textContent=`${(t*n).toFixed(2)} mm`)}async function Mc(){if(!yt.bounds||Jl)return;Jl=!0;const i=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");i.classList.remove("hidden");try{await H1(yt.bounds,uo(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{i.classList.add("hidden"),Jl=!1}}function Ba(){yt.bounds&&(up(),mr(),requestAnimationFrame(()=>{const i=document.getElementById("dims-view");Ea?(Sa(i),Mc()):(Ea=!0,Sa(i),Mc())}))}window.dpToggle=i=>{document.getElementById(i)?.classList.toggle("open")};gm();ym(fw);document.querySelectorAll(".tab-btn").forEach(i=>{i.addEventListener("click",()=>{const t=i.dataset.tab;if(!(!t||i.disabled)&&(hr(t),t==="params"?Ba():t==="colors"?hp():rp(),t==="render")){const e=document.getElementById("c3d");e&&kc(e)}})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),hr("colors"),hp()});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),hr("render");const i=document.getElementById("c3d");i&&kc(i),Wc()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{rp(),hr("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{hr("params"),Ba()});document.getElementById("btn-back-params")?.addEventListener("click",()=>{hr("params"),Ba()});document.getElementById("btn-gen")?.addEventListener("click",Wc);document.getElementById("btn-stl")?.addEventListener("click",()=>Qf("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>P1());document.querySelectorAll(".dp-sh").forEach(i=>{i.addEventListener("click",()=>{i.closest(".dp-sec")?.classList.toggle("open")})});let Od;const pw=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];pw.forEach(i=>{document.getElementById(i)?.addEventListener("input",()=>{mr();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(yt.wMm=t),e>0&&(yt.dMm=e),clearTimeout(Od),Od=setTimeout(()=>co(uo()),500)})});document.getElementById("dp-walls")?.addEventListener("input",mr);document.getElementById("dp-flat")?.addEventListener("change",()=>{co(uo())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>{if(!yt.generated){Ql("INFO",`Générez d'abord le modèle 3D dans l'onglet "Générer & Exporter".`);return}Qf("terrain3d.stl")});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{yt.bounds&&(hr("params"),Ba())});let kd;document.querySelectorAll("#params-col input, #params-col select").forEach(i=>{i.addEventListener("change",()=>{clearTimeout(kd),kd=setTimeout(()=>{yt.generated&&yt.tg&&Wc()},700)}),i.addEventListener("input",()=>{if(i.type==="range"){const t=document.getElementById(`${i.id}-v`);t&&(t.textContent=i.value)}})});function hp(){yt.bounds&&(up(),requestAnimationFrame(()=>{const i=document.getElementById("colors-3d-area");Ea?(Sa(i),co(uo())):(Ea=!0,Sa(i),Mc()),mw()}))}function mw(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(i=>{const t=Number(i.dataset.slot);Se[t]&&(i.style.background=Se[t])}),document.querySelectorAll(".cp-sw-inner").forEach(i=>{const e=i.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(i.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(i=>{const t=Number(i.dataset.slot);i.addEventListener("input",()=>{const n=i.value,s=i.nextElementSibling;s&&(s.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(o=>{o.style.background=n}),pr({[t]:n})});const e=i.nextElementSibling;e&&(e.style.background=i.value)});function gw(i,t){pr({[i]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${i}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${i}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let Zr=null;function _w(i,t){Zr&&(Zr.remove(),Zr=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(Se).map(Number).sort((c,u)=>c-u),s=On[i]??Number(t.dataset.slot)??1;n.forEach(c=>{const u=document.createElement("div");u.className="cp-slot-pick-item"+(c===s?" active":""),u.style.setProperty("--sw",Se[c]??"#888"),u.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,u.addEventListener("click",h=>{h.stopPropagation(),D1(i,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=Se[c]??"#888",e.remove(),Zr=null}),e.appendChild(u)}),document.body.appendChild(e),Zr=e;const o=t.getBoundingClientRect();e.style.left=`${o.left}px`,e.style.top=`${o.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),Zr=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(i=>{i.addEventListener("click",t=>{t.stopPropagation();const n=i.closest(".cp-layer")?.dataset.layer??"";n&&_w(n,i)})});let Xr=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(Xr){Xr.remove(),Xr=null;return}const i=Math.max(...Object.keys(Se).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,Xr=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),Xr=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const s=e.value;Se[i]=s;const o=document.createElement("label");o.className="cp-swatch",o.dataset.slot=String(i),o.title=`Couleur ${i}`,o.innerHTML=`<input type="color" class="cp-color-input" data-slot="${i}" value="${s}"><div class="cp-sw-inner" style="background:${s}"><span class="cp-sw-num">${i}</span></div>`,o.querySelector(".cp-color-input").addEventListener("input",function(){gw(i,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(o),t.remove(),Xr=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete Se[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{pr({})});document.querySelectorAll(".cp-eye").forEach(i=>{const t=i.dataset.layer;t&&i.addEventListener("click",()=>{i.classList.toggle("hidden-layer");const e=!i.classList.contains("hidden-layer");sp(t,e)})});const dp={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const i=document.getElementById("cp-preset").value,t=dp[i];t&&(pr(t),Object.entries(t).forEach(([e,n])=>{const s=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(s){s.value=n;const o=s.nextElementSibling;o&&(o.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const vw=document.getElementById("cp-dd-trigger"),Zc=document.getElementById("cp-dd-menu");vw?.addEventListener("click",i=>{i.stopPropagation(),Zc?.classList.toggle("open")});document.addEventListener("click",()=>Zc?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(i=>{i.addEventListener("click",t=>{t.stopPropagation();const e=i.dataset.preset??"",n=i.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),i.classList.add("cp-dd-active");const s=document.getElementById("cp-dd-label");s&&(s.textContent=n),Zc?.classList.remove("open");const o=dp[e];o&&(pr(o),yw(o))})});function yw(i){Object.entries(i).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const s=n.nextElementSibling;s&&(s.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);i[e]&&(t.style.background=i[e])})}const Xc=document.getElementById("cp-layer-detail"),fp=document.getElementById("ldp-title"),pp=document.getElementById("ldp-icon"),mp=document.getElementById("ldp-content");function xw(i,t,e){fp.textContent=t,pp.innerHTML=e,mp.innerHTML=bw(i),Xc.classList.add("open"),Aw(i)}function gp(){Xc.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",gp);document.querySelectorAll(".cp-layer-nav").forEach(i=>{i.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=i.dataset.type??"land_cover",n=i.querySelector(".cp-layer-name")?.textContent??"Couche",s=i.querySelector(".cp-layer-ico")?.innerHTML??"";xw(e,n,s)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{fp.textContent="Nouvelle couche",pp.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',mp.innerHTML=Tw(),Xc.classList.add("open"),Lw()});function bw(i){return i==="markers"?ww():i==="lines"?Sw():Ew()}function ww(){return`
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
  </div>`}const Mw=[{label:"Itinéraires de randonnée",cats:[{key:"hiking_iwn",label:"International"},{key:"hiking_nwn",label:"National"},{key:"hiking_rwn",label:"Régional"},{key:"hiking_lwn",label:"Local"}]},{label:"Itinéraires cyclables",cats:[{key:"cycling_icn",label:"International"},{key:"cycling_ncn",label:"National"},{key:"cycling_rcn",label:"Régional"},{key:"cycling_lcn",label:"Local"}]},{label:"Parcours de VTT",cats:[{key:"mtb_0",label:"International"},{key:"mtb_1",label:"National"},{key:"mtb_2",label:"Régional"},{key:"mtb_local",label:"Local"}]},{label:"Itinéraires équestres",cats:[{key:"equestrian_iwn",label:"International"},{key:"equestrian_nwn",label:"National"},{key:"equestrian_rwn",label:"Régional"},{key:"equestrian_lwn",label:"Local"}]},{label:"Sports d'hiver",cats:[{key:"piste_easy",label:"Facile"},{key:"piste_novice",label:"Novice"},{key:"piste_intermediate",label:"Intermédiaire"},{key:"piste_advanced",label:"Avancé"},{key:"piste_expert",label:"Expert"},{key:"piste_freeride",label:"Freeride"},{key:"piste_other",label:"Autre difficulté"},{key:"piste_none",label:"Sans difficulté"}]},{label:"Routes",cats:[{key:"road_motorway",label:"Autoroute"},{key:"road_trunk",label:"Voie express"},{key:"road_primary",label:"Route nationale"},{key:"road_secondary",label:"Route départementale"},{key:"road_tertiary",label:"Voie tertiaire"},{key:"road_unclassified",label:"Non classifiée"}]},{label:"Rues",cats:[{key:"street_living",label:"Zone de rencontre"},{key:"street_residential",label:"Rue résidentielle"}]},{label:"Rails",cats:[{key:"rail_narrow",label:"Voie étroite"},{key:"rail_standard",label:"Voie standard"},{key:"rail_unknown",label:"Inconnue"},{key:"rail_funicular",label:"Funiculaire"},{key:"rail_light",label:"Tramway rapide"},{key:"rail_monorail",label:"Monorail"},{key:"rail_tram",label:"Tramway"},{key:"rail_subway",label:"Métro"}]}];function Sw(){const i='<svg class="ldp-chev-ico" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg>';return`
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
    <div id="ldp-line-groups">${Mw.map(e=>{const n=e.cats.every(o=>wa[o.key]===!0),s=e.cats.map(o=>{const l=wa[o.key]===!0;return`<label class="ldp-sub-row"><input type="checkbox" class="ldp-line-sub" data-linecat="${o.key}"${l?" checked":""}> ${o.label}</label>`}).join("");return`
    <div class="ldp-line-group">
      <div class="ldp-line-group-header">
        <input type="checkbox" class="ldp-line-group-chk" data-group="${e.label}"${n?" checked":""}>
        <span class="ldp-group-label">${e.label}</span>
        <button class="ldp-chev-btn" title="Afficher sous-catégories">${i}</button>
      </div>
      <div class="ldp-line-subs">${s}</div>
    </div>`}).join("")}</div>
    <div id="ldp-line-status" class="ldp-line-status"></div>
  </div>`}function Ew(){return`
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
  </div>`}function Tw(){return`
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
  </div>`}function Aw(i){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(i==="markers"){const n=document.getElementById("ldp-marker-size"),s=document.getElementById("ldp-marker-size-n"),o=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),c=document.getElementById("ldp-marker-rot-n"),u=document.getElementById("ldp-marker-offset"),h=document.getElementById("ldp-offset-mm"),f=()=>{o&&(o.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},p=()=>{h&&(h.textContent=`( ${(Number(u.value||0)*e).toFixed(2)} mm )`)},_=()=>{const m=bc();m<0||wc(m,{diameterMult:Number(n?.value??10)||10,rotDeg:Number(l?.value??0),flatTop:document.getElementById("ldp-marker-flat")?.checked??!0,heightOffMult:Number(u?.value??2)||0})};n?.addEventListener("input",()=>{s&&(s.value=Number(n.value).toFixed(1)),f(),_()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),f(),_()}),l?.addEventListener("input",()=>{c&&(c.value=l.value),_()}),c?.addEventListener("input",()=>{l&&(l.value=c.value),_()}),u?.addEventListener("input",()=>{p(),_()}),document.getElementById("ldp-marker-flat")?.addEventListener("change",_),f(),p(),as(),document.querySelectorAll(".ldp-shape-btn").forEach(m=>{m.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(g=>g.classList.remove("active")),m.classList.add("active");const x=m.dataset.shape??"circle",y=bc();y>=0?wc(y,{shape:x}):(O1(x),qc(!0))})})}if(i==="lines"){const n=document.getElementById("ldp-line-w"),s=document.getElementById("ldp-line-w-n"),o=document.getElementById("ldp-line-offset"),l=()=>{const h=Math.max(.1,Number(n?.value??1)||1),f=Number(o?.value??1)||1;N1(h,f);const p=uo();p&&co(p)};n?.addEventListener("input",()=>{s&&(s.value=Number(n.value).toFixed(1)),l()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),l()}),o?.addEventListener("input",l);const c=h=>h.closest(".ldp-line-group")?.classList.toggle("open");document.querySelectorAll(".ldp-chev-btn").forEach(h=>h.addEventListener("click",()=>c(h))),document.querySelectorAll(".ldp-group-label").forEach(h=>h.addEventListener("click",()=>c(h)));const u=()=>{if(!yt.bounds)return;const h=document.getElementById("ldp-line-status");h&&(h.textContent="Chargement des données…"),Q1(yt.bounds).then(()=>{h&&(h.textContent="")}).catch(()=>{h&&(h.textContent="Erreur de chargement.")})};document.querySelectorAll(".ldp-line-sub").forEach(h=>{h.addEventListener("change",()=>{Dd(h.dataset.linecat,h.checked),h.checked&&u();const f=h.closest(".ldp-line-group"),p=f?.querySelector(".ldp-line-group-chk");if(p){const _=f.querySelectorAll(".ldp-line-sub");p.checked=Array.from(_).every(m=>m.checked),p.indeterminate=!p.checked&&Array.from(_).some(m=>m.checked)}})}),document.querySelectorAll(".ldp-line-group-chk").forEach(h=>{h.addEventListener("change",()=>{h.closest(".ldp-line-group")?.querySelectorAll(".ldp-line-sub").forEach(p=>{p.checked=h.checked,Dd(p.dataset.linecat,h.checked)}),h.checked&&u()})})}}function Lw(){document.getElementById("ldp-new-type")?.addEventListener("change",i=>{const t=i.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",gp),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const i=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=i[(i.indexOf(t)+1)%i.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=Se[e]??"#888"})}const os=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{os.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{os.classList.add("hidden")});os?.addEventListener("click",i=>{i.target===os&&os.classList.add("hidden")});const Ta=document.getElementById("ps-layer-h"),Aa=document.getElementById("ps-wall-w"),_p=document.getElementById("ps-layer-h-val"),vp=document.getElementById("ps-wall-w-val");Ta?.addEventListener("input",()=>{_p.textContent=Number(Ta.value).toFixed(2),mr()});Aa?.addEventListener("input",()=>{vp.textContent=Number(Aa.value).toFixed(2),mr()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{os.classList.add("hidden"),mr()});document.getElementById("ps-reset")?.addEventListener("click",()=>{Ta&&(Ta.value="0.20",_p.textContent="0.20"),Aa&&(Aa.value="0.42",vp.textContent="0.42"),mr()});function qc(i){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=i?"block":"none"}let yp=0,xp=0;document.getElementById("dims-canvas")?.addEventListener("pointerdown",i=>{yp=i.clientX,xp=i.clientY});document.getElementById("dims-canvas")?.addEventListener("click",i=>{const t=i.clientX-yp,e=i.clientY-xp;if(!(t*t+e*e>=25))if(ap())k1(i.clientX,i.clientY)>=0&&(qc(!1),as());else{const n=z1(i.clientX,i.clientY);if(n>=0){lp(n),as();const o=xc().find(l=>l.id===n);o&&bp(o)}else U1()}});document.addEventListener("keydown",i=>{i.key==="Escape"&&ap()&&(op(),qc(!1))});const Cw={circle:"Rond",square:"Carré",diamond:"Losange",triangle:"Triangle",cross:"Croix",heart:"Cœur",star:"Étoile"},Ud={circle:'<circle cx="8" cy="8" r="5.5" fill="currentColor"/>',square:'<rect x="2.5" y="2.5" width="11" height="11" rx="1.5" fill="currentColor"/>',diamond:'<path d="M8 1.5l6.5 6.5-6.5 6.5L1.5 8z" fill="currentColor"/>',triangle:'<path d="M8 2l6.5 11.5H1.5z" fill="currentColor"/>',cross:'<path d="M5.5 2h5v3.5H14v5h-3.5V14h-5v-3.5H2v-5h3.5z" fill="currentColor"/>',heart:'<path d="M8 13.5S1.5 9 1.5 5a3.25 3.25 0 016.5 0 3.25 3.25 0 016.5 0c0 4-6.5 8.5-6.5 8.5z" fill="currentColor"/>',star:'<path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.6.6 3.6L8 9.7l-3.2 1.8.6-3.6L2.8 5.3l3.6-.5z" fill="currentColor"/>'},Pw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="8" cy="8" rx="6" ry="4"/><circle cx="8" cy="8" r="2"/></svg>',Rw='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="2,4 14,4"/><path d="M5 4V2h6v2"/><rect x="3" y="4" width="10" height="10" rx="1"/></svg>';function as(){const i=document.getElementById("ldp-marker-list");if(!i)return;const t=xc(),e=bc();if(!t.length){i.innerHTML='<div class="ldp-empty">Aucun marqueur placé</div>';return}i.innerHTML=t.map(n=>`
    <div class="ldp-marker-row${n.id===e?" selected":""}" data-marker-id="${n.id}">
      <svg class="ldp-marker-ico" viewBox="0 0 16 16">${Ud[n.shape]??Ud.circle}</svg>
      <span class="ldp-marker-lbl">${Cw[n.shape]??n.shape}</span>
      <button class="cp-eye ldp-m-eye${n.visible?" active":""}" data-mid="${n.id}" title="Visibilité">${Pw}</button>
      <button class="cp-del ldp-m-del" data-mid="${n.id}" title="Supprimer">${Rw}</button>
    </div>`).join(""),i.querySelectorAll(".ldp-marker-row").forEach(n=>{n.addEventListener("click",s=>{if(s.target.closest(".cp-eye, .cp-del"))return;const o=Number(n.dataset.markerId);lp(o),as();const l=xc().find(c=>c.id===o);l&&bp(l)})}),i.querySelectorAll(".ldp-m-eye").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const o=Number(n.dataset.mid),l=!n.classList.contains("active");B1(o,l),as()})}),i.querySelectorAll(".ldp-m-del").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation(),F1(Number(n.dataset.mid)),as()})})}function bp(i){document.querySelectorAll(".ldp-shape-btn").forEach(p=>p.classList.remove("active")),document.querySelector(`.ldp-shape-btn[data-shape="${i.shape}"]`)?.classList.add("active");const t=document.getElementById("ldp-marker-size"),e=document.getElementById("ldp-marker-size-n");t&&(t.value=String(i.diameterMult)),e&&(e.value=String(i.diameterMult));const n=document.getElementById("ldp-marker-rot"),s=document.getElementById("ldp-marker-rot-n");n&&(n.value=String(i.rotDeg)),s&&(s.value=String(i.rotDeg));const o=document.getElementById("ldp-marker-flat");o&&(o.checked=i.flatTop);const l=document.getElementById("ldp-marker-offset");l&&(l.value=String(i.heightOffMult));const c=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,u=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,h=document.getElementById("ldp-marker-mm"),f=document.getElementById("ldp-offset-mm");h&&(h.textContent=`( ${(i.diameterMult*c).toFixed(2)} mm )`),f&&(f.textContent=`( ${(i.heightOffMult*u).toFixed(2)} mm )`)}document.querySelectorAll(".cp-del:not(.ldp-m-del)").forEach(i=>{i.addEventListener("click",t=>{t.stopPropagation();const e=i.closest(".cp-layer");if(!e)return;const n=e.dataset.layer;n&&sp(n,!1),e.remove()})});
