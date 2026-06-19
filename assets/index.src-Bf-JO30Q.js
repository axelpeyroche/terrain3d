(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function Pp(){document.getElementById("app").innerHTML=`

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

      <!-- ── Panneau détail couche (navigation interne) ── -->
      <div id="cp-detail" style="display:none">
        <div class="ldp-header">
          <button class="ldp-back-btn" id="ldp-back" title="Retour">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 3l-6 5 6 5"/></svg>
          </button>
          <svg id="ldp-icon" class="ldp-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"></svg>
          <span id="ldp-title">Couche</span>
        </div>
        <div id="ldp-content" class="ldp-content"></div>
      </div>

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
`}function bi(r,t,e){const n=u=>document.getElementById(u),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${r}%`);const c=n("pp");c&&(c.textContent=`${Math.round(r)}%`)}function Ga(r){const t=document.getElementById("prog");t&&(t.style.display=r?"flex":"none")}function Ol(r,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=r,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function ar(r){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===r)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${r}`))}window.ts=r=>{document.getElementById(`sb-${r}`)?.classList.toggle("h"),document.getElementById(`ca-${r}`)?.classList.toggle("o")};window.ev=r=>{r.stopPropagation()};var Ls=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function od(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Ul={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(r,t){(function(e,n){n(t)})(Ls,function(e){var n="1.9.4";function s(i){var a,h,b,T;for(h=1,b=arguments.length;h<b;h++){T=arguments[h];for(a in T)i[a]=T[a]}return i}var o=Object.create||function(){function i(){}return function(a){return i.prototype=a,new i}}();function l(i,a){var h=Array.prototype.slice;if(i.bind)return i.bind.apply(i,h.call(arguments,1));var b=h.call(arguments,2);return function(){return i.apply(a,b.length?b.concat(h.call(arguments)):arguments)}}var c=0;function u(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,a,h){var b,T,z,Y;return Y=function(){b=!1,T&&(z.apply(h,T),T=!1)},z=function(){b?T=arguments:(i.apply(h,arguments),setTimeout(Y,a),b=!0)},z}function f(i,a,h){var b=a[1],T=a[0],z=b-T;return i===b&&h?i:((i-T)%z+z)%z+T}function p(){return!1}function v(i,a){if(a===!1)return i;var h=Math.pow(10,a===void 0?6:a);return Math.round(i*h)/h}function m(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function x(i){return m(i).split(/\s+/)}function y(i,a){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?o(i.options):{});for(var h in a)i.options[h]=a[h];return i.options}function g(i,a,h){var b=[];for(var T in i)b.push(encodeURIComponent(h?T.toUpperCase():T)+"="+encodeURIComponent(i[T]));return(!a||a.indexOf("?")===-1?"?":"&")+b.join("&")}var _=/\{ *([\w_ -]+) *\}/g;function S(i,a){return i.replace(_,function(h,b){var T=a[b];if(T===void 0)throw new Error("No value provided for variable "+h);return typeof T=="function"&&(T=T(a)),T})}var M=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function P(i,a){for(var h=0;h<i.length;h++)if(i[h]===a)return h;return-1}var N="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function O(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var U=0;function H(i){var a=+new Date,h=Math.max(0,16-(a-U));return U=a+h,window.setTimeout(i,h)}var D=window.requestAnimationFrame||O("RequestAnimationFrame")||H,R=window.cancelAnimationFrame||O("CancelAnimationFrame")||O("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function W(i,a,h){if(h&&D===H)i.call(a);else return D.call(window,l(i,a))}function k(i){i&&R.call(window,i)}var F={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:u,throttle:d,wrapNum:f,falseFn:p,formatNum:v,trim:m,splitWords:x,setOptions:y,getParamString:g,template:S,isArray:M,indexOf:P,emptyImageUrl:N,requestFn:D,cancelFn:R,requestAnimFrame:W,cancelAnimFrame:k};function C(){}C.extend=function(i){var a=function(){y(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},h=a.__super__=this.prototype,b=o(h);b.constructor=a,a.prototype=b;for(var T in this)Object.prototype.hasOwnProperty.call(this,T)&&T!=="prototype"&&T!=="__super__"&&(a[T]=this[T]);return i.statics&&s(a,i.statics),i.includes&&(Z(i.includes),s.apply(null,[b].concat(i.includes))),s(b,i),delete b.statics,delete b.includes,b.options&&(b.options=h.options?o(h.options):{},s(b.options,i.options)),b._initHooks=[],b.callInitHooks=function(){if(!this._initHooksCalled){h.callInitHooks&&h.callInitHooks.call(this),this._initHooksCalled=!0;for(var z=0,Y=b._initHooks.length;z<Y;z++)b._initHooks[z].call(this)}},a},C.include=function(i){var a=this.prototype.options;return s(this.prototype,i),i.options&&(this.prototype.options=a,this.mergeOptions(i.options)),this},C.mergeOptions=function(i){return s(this.prototype.options,i),this},C.addInitHook=function(i){var a=Array.prototype.slice.call(arguments,1),h=typeof i=="function"?i:function(){this[i].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(h),this};function Z(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=M(i)?i:[i];for(var a=0;a<i.length;a++)i[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var it={on:function(i,a,h){if(typeof i=="object")for(var b in i)this._on(b,i[b],a);else{i=x(i);for(var T=0,z=i.length;T<z;T++)this._on(i[T],a,h)}return this},off:function(i,a,h){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var b in i)this._off(b,i[b],a);else{i=x(i);for(var T=arguments.length===1,z=0,Y=i.length;z<Y;z++)T?this._off(i[z]):this._off(i[z],a,h)}return this},_on:function(i,a,h,b){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(i,a,h)===!1){h===this&&(h=void 0);var T={fn:a,ctx:h};b&&(T.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(T)}},_off:function(i,a,h){var b,T,z;if(this._events&&(b=this._events[i],!!b)){if(arguments.length===1){if(this._firingCount)for(T=0,z=b.length;T<z;T++)b[T].fn=p;delete this._events[i];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var Y=this._listens(i,a,h);if(Y!==!1){var ut=b[Y];this._firingCount&&(ut.fn=p,this._events[i]=b=b.slice()),b.splice(Y,1)}}},fire:function(i,a,h){if(!this.listens(i,h))return this;var b=s({},a,{type:i,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var T=this._events[i];if(T){this._firingCount=this._firingCount+1||1;for(var z=0,Y=T.length;z<Y;z++){var ut=T[z],mt=ut.fn;ut.once&&this.off(i,mt,ut.ctx),mt.call(ut.ctx||this,b)}this._firingCount--}}return h&&this._propagateEvent(b),this},listens:function(i,a,h,b){typeof i!="string"&&console.warn('"string" type argument expected');var T=a;typeof a!="function"&&(b=!!a,T=void 0,h=void 0);var z=this._events&&this._events[i];if(z&&z.length&&this._listens(i,T,h)!==!1)return!0;if(b){for(var Y in this._eventParents)if(this._eventParents[Y].listens(i,a,h,b))return!0}return!1},_listens:function(i,a,h){if(!this._events)return!1;var b=this._events[i]||[];if(!a)return!!b.length;h===this&&(h=void 0);for(var T=0,z=b.length;T<z;T++)if(b[T].fn===a&&b[T].ctx===h)return T;return!1},once:function(i,a,h){if(typeof i=="object")for(var b in i)this._on(b,i[b],a,!0);else{i=x(i);for(var T=0,z=i.length;T<z;T++)this._on(i[T],a,h,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[u(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[u(i)],this},_propagateEvent:function(i){for(var a in this._eventParents)this._eventParents[a].fire(i.type,s({layer:i.target,propagatedFrom:i.target},i),!0)}};it.addEventListener=it.on,it.removeEventListener=it.clearAllEventListeners=it.off,it.addOneTimeEventListener=it.once,it.fireEvent=it.fire,it.hasEventListeners=it.listens;var ot=C.extend(it);function j(i,a,h){this.x=h?Math.round(i):i,this.y=h?Math.round(a):a}var rt=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};j.prototype={clone:function(){return new j(this.x,this.y)},add:function(i){return this.clone()._add(at(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(at(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new j(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new j(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=rt(this.x),this.y=rt(this.y),this},distanceTo:function(i){i=at(i);var a=i.x-this.x,h=i.y-this.y;return Math.sqrt(a*a+h*h)},equals:function(i){return i=at(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=at(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+v(this.x)+", "+v(this.y)+")"}};function at(i,a,h){return i instanceof j?i:M(i)?new j(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new j(i.x,i.y):new j(i,a,h)}function q(i,a){if(i)for(var h=a?[i,a]:i,b=0,T=h.length;b<T;b++)this.extend(h[b])}q.prototype={extend:function(i){var a,h;if(!i)return this;if(i instanceof j||typeof i[0]=="number"||"x"in i)a=h=at(i);else if(i=tt(i),a=i.min,h=i.max,!a||!h)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=h.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(h.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(h.y,this.max.y)),this},getCenter:function(i){return at((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return at(this.min.x,this.max.y)},getTopRight:function(){return at(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var a,h;return typeof i[0]=="number"||i instanceof j?i=at(i):i=tt(i),i instanceof q?(a=i.min,h=i.max):a=h=i,a.x>=this.min.x&&h.x<=this.max.x&&a.y>=this.min.y&&h.y<=this.max.y},intersects:function(i){i=tt(i);var a=this.min,h=this.max,b=i.min,T=i.max,z=T.x>=a.x&&b.x<=h.x,Y=T.y>=a.y&&b.y<=h.y;return z&&Y},overlaps:function(i){i=tt(i);var a=this.min,h=this.max,b=i.min,T=i.max,z=T.x>a.x&&b.x<h.x,Y=T.y>a.y&&b.y<h.y;return z&&Y},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var a=this.min,h=this.max,b=Math.abs(a.x-h.x)*i,T=Math.abs(a.y-h.y)*i;return tt(at(a.x-b,a.y-T),at(h.x+b,h.y+T))},equals:function(i){return i?(i=tt(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function tt(i,a){return!i||i instanceof q?i:new q(i,a)}function Lt(i,a){if(i)for(var h=a?[i,a]:i,b=0,T=h.length;b<T;b++)this.extend(h[b])}Lt.prototype={extend:function(i){var a=this._southWest,h=this._northEast,b,T;if(i instanceof nt)b=i,T=i;else if(i instanceof Lt){if(b=i._southWest,T=i._northEast,!b||!T)return this}else return i?this.extend(wt(i)||J(i)):this;return!a&&!h?(this._southWest=new nt(b.lat,b.lng),this._northEast=new nt(T.lat,T.lng)):(a.lat=Math.min(b.lat,a.lat),a.lng=Math.min(b.lng,a.lng),h.lat=Math.max(T.lat,h.lat),h.lng=Math.max(T.lng,h.lng)),this},pad:function(i){var a=this._southWest,h=this._northEast,b=Math.abs(a.lat-h.lat)*i,T=Math.abs(a.lng-h.lng)*i;return new Lt(new nt(a.lat-b,a.lng-T),new nt(h.lat+b,h.lng+T))},getCenter:function(){return new nt((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new nt(this.getNorth(),this.getWest())},getSouthEast:function(){return new nt(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof nt||"lat"in i?i=wt(i):i=J(i);var a=this._southWest,h=this._northEast,b,T;return i instanceof Lt?(b=i.getSouthWest(),T=i.getNorthEast()):b=T=i,b.lat>=a.lat&&T.lat<=h.lat&&b.lng>=a.lng&&T.lng<=h.lng},intersects:function(i){i=J(i);var a=this._southWest,h=this._northEast,b=i.getSouthWest(),T=i.getNorthEast(),z=T.lat>=a.lat&&b.lat<=h.lat,Y=T.lng>=a.lng&&b.lng<=h.lng;return z&&Y},overlaps:function(i){i=J(i);var a=this._southWest,h=this._northEast,b=i.getSouthWest(),T=i.getNorthEast(),z=T.lat>a.lat&&b.lat<h.lat,Y=T.lng>a.lng&&b.lng<h.lng;return z&&Y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,a){return i?(i=J(i),this._southWest.equals(i.getSouthWest(),a)&&this._northEast.equals(i.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function J(i,a){return i instanceof Lt?i:new Lt(i,a)}function nt(i,a,h){if(isNaN(i)||isNaN(a))throw new Error("Invalid LatLng object: ("+i+", "+a+")");this.lat=+i,this.lng=+a,h!==void 0&&(this.alt=+h)}nt.prototype={equals:function(i,a){if(!i)return!1;i=wt(i);var h=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return h<=(a===void 0?1e-9:a)},toString:function(i){return"LatLng("+v(this.lat,i)+", "+v(this.lng,i)+")"},distanceTo:function(i){return Pt.distance(this,wt(i))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(i){var a=180*i/40075017,h=a/Math.cos(Math.PI/180*this.lat);return J([this.lat-a,this.lng-h],[this.lat+a,this.lng+h])},clone:function(){return new nt(this.lat,this.lng,this.alt)}};function wt(i,a,h){return i instanceof nt?i:M(i)&&typeof i[0]!="object"?i.length===3?new nt(i[0],i[1],i[2]):i.length===2?new nt(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new nt(i.lat,"lng"in i?i.lng:i.lon,i.alt):a===void 0?null:new nt(i,a,h)}var St={latLngToPoint:function(i,a){var h=this.projection.project(i),b=this.scale(a);return this.transformation._transform(h,b)},pointToLatLng:function(i,a){var h=this.scale(a),b=this.transformation.untransform(i,h);return this.projection.unproject(b)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var a=this.projection.bounds,h=this.scale(i),b=this.transformation.transform(a.min,h),T=this.transformation.transform(a.max,h);return new q(b,T)},infinite:!1,wrapLatLng:function(i){var a=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,h=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,b=i.alt;return new nt(h,a,b)},wrapLatLngBounds:function(i){var a=i.getCenter(),h=this.wrapLatLng(a),b=a.lat-h.lat,T=a.lng-h.lng;if(b===0&&T===0)return i;var z=i.getSouthWest(),Y=i.getNorthEast(),ut=new nt(z.lat-b,z.lng-T),mt=new nt(Y.lat-b,Y.lng-T);return new Lt(ut,mt)}},Pt=s({},St,{wrapLng:[-180,180],R:6371e3,distance:function(i,a){var h=Math.PI/180,b=i.lat*h,T=a.lat*h,z=Math.sin((a.lat-i.lat)*h/2),Y=Math.sin((a.lng-i.lng)*h/2),ut=z*z+Math.cos(b)*Math.cos(T)*Y*Y,mt=2*Math.atan2(Math.sqrt(ut),Math.sqrt(1-ut));return this.R*mt}}),It=6378137,kt={R:It,MAX_LATITUDE:85.0511287798,project:function(i){var a=Math.PI/180,h=this.MAX_LATITUDE,b=Math.max(Math.min(h,i.lat),-h),T=Math.sin(b*a);return new j(this.R*i.lng*a,this.R*Math.log((1+T)/(1-T))/2)},unproject:function(i){var a=180/Math.PI;return new nt((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*a,i.x*a/this.R)},bounds:function(){var i=It*Math.PI;return new q([-i,-i],[i,i])}()};function st(i,a,h,b){if(M(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=a,this._c=h,this._d=b}st.prototype={transform:function(i,a){return this._transform(i.clone(),a)},_transform:function(i,a){return a=a||1,i.x=a*(this._a*i.x+this._b),i.y=a*(this._c*i.y+this._d),i},untransform:function(i,a){return a=a||1,new j((i.x/a-this._b)/this._a,(i.y/a-this._d)/this._c)}};function vt(i,a,h,b){return new st(i,a,h,b)}var xt=s({},Pt,{code:"EPSG:3857",projection:kt,transformation:function(){var i=.5/(Math.PI*kt.R);return vt(i,.5,-i,.5)}()}),E=s({},xt,{code:"EPSG:900913"});function et(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function $(i,a){var h="",b,T,z,Y,ut,mt;for(b=0,z=i.length;b<z;b++){for(ut=i[b],T=0,Y=ut.length;T<Y;T++)mt=ut[T],h+=(T?"L":"M")+mt.x+" "+mt.y;h+=a?Wt.svg?"z":"x":""}return h||"M0 0"}var A=document.documentElement.style,w="ActiveXObject"in window,B=w&&!document.addEventListener,X="msLaunchUri"in navigator&&!("documentMode"in document),K=Ve("webkit"),G=Ve("android"),ft=Ve("android 2")||Ve("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=G&&Ve("Google")&&lt<537&&!("AudioNode"in window),Tt=!!window.opera,Et=!X&&Ve("chrome"),At=Ve("gecko")&&!K&&!Tt&&!w,Ht=!Et&&Ve("safari"),zt=Ve("phantom"),Dt="OTransition"in A,Kt=navigator.platform.indexOf("Win")===0,Vt=w&&"transition"in A,oe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,ae="MozPerspective"in A,te=!window.L_DISABLE_3D&&(Vt||oe||ae)&&!Dt&&!zt,Ft=typeof orientation<"u"||Ve("mobile"),I=Ft&&K,ht=Ft&&oe,Mt=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||Mt),Nt="ontouchstart"in window||!!window.TouchEvent,re=!window.L_NO_TOUCH&&(Nt||Rt),ue=Ft&&Tt,_e=Ft&&At,Ie=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,me=function(){var i=!1;try{var a=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",p,a),window.removeEventListener("testPassiveEventSupport",p,a)}catch{}return i}(),Ce=function(){return!!document.createElement("canvas").getContext}(),Se=!!(document.createElementNS&&et("svg").createSVGRect),rn=!!Se&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),dn=!Se&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var a=i.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),Xn=navigator.platform.indexOf("Mac")===0,_i=navigator.platform.indexOf("Linux")===0;function Ve(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Wt={ie:w,ielt9:B,edge:X,webkit:K,android:G,android23:ft,androidStock:pt,opera:Tt,chrome:Et,gecko:At,safari:Ht,phantom:zt,opera12:Dt,win:Kt,ie3d:Vt,webkit3d:oe,gecko3d:ae,any3d:te,mobile:Ft,mobileWebkit:I,mobileWebkit3d:ht,msPointer:Mt,pointer:Rt,touch:re,touchNative:Nt,mobileOpera:ue,mobileGecko:_e,retina:Ie,passiveEvents:me,canvas:Ce,svg:Se,vml:dn,inlineSvg:rn,mac:Xn,linux:_i},ki=Wt.msPointer?"MSPointerDown":"pointerdown",ss=Wt.msPointer?"MSPointerMove":"pointermove",os=Wt.msPointer?"MSPointerUp":"pointerup",Ys=Wt.msPointer?"MSPointerCancel":"pointercancel",as={touchstart:ki,touchmove:ss,touchend:os,touchcancel:Ys},$s={touchstart:ee,touchmove:jt,touchend:jt,touchcancel:jt},V={},ct=!1;function gt(i,a,h){return a==="touchstart"&&qt(),$s[a]?(h=$s[a].bind(this,h),i.addEventListener(as[a],h,!1),h):(console.warn("wrong event specified:",a),p)}function _t(i,a,h){if(!as[a]){console.warn("wrong event specified:",a);return}i.removeEventListener(as[a],h,!1)}function dt(i){V[i.pointerId]=i}function Ut(i){V[i.pointerId]&&(V[i.pointerId]=i)}function Zt(i){delete V[i.pointerId]}function qt(){ct||(document.addEventListener(ki,dt,!0),document.addEventListener(ss,Ut,!0),document.addEventListener(os,Zt,!0),document.addEventListener(Ys,Zt,!0),ct=!0)}function jt(i,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var h in V)a.touches.push(V[h]);a.changedTouches=[a],i(a)}}function ee(i,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&Ye(a),jt(i,a)}function Jt(i){var a={},h,b;for(b in i)h=i[b],a[b]=h&&h.bind?h.bind(i):h;return i=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var ne=200;function Ee(i,a){i.addEventListener("dblclick",a);var h=0,b;function T(z){if(z.detail!==1){b=z.detail;return}if(!(z.pointerType==="mouse"||z.sourceCapabilities&&!z.sourceCapabilities.firesTouchEvents)){var Y=Sc(z);if(!(Y.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!Y.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ut=Date.now();ut-h<=ne?(b++,b===2&&a(Jt(z))):b=1,h=ut}}}return i.addEventListener("click",T),{dblclick:a,simDblclick:T}}function sn(i,a){i.removeEventListener("dblclick",a.dblclick),i.removeEventListener("click",a.simDblclick)}var Le=Js(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),on=Js(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ve=on==="webkitTransition"||on==="OTransition"?on+"End":"transitionend";function ie(i){return typeof i=="string"?document.getElementById(i):i}function ni(i,a){var h=i.style[a]||i.currentStyle&&i.currentStyle[a];if((!h||h==="auto")&&document.defaultView){var b=document.defaultView.getComputedStyle(i,null);h=b?b[a]:null}return h==="auto"?null:h}function Xt(i,a,h){var b=document.createElement(i);return b.className=a||"",h&&h.appendChild(b),b}function fe(i){var a=i.parentNode;a&&a.removeChild(i)}function zi(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function An(i){var a=i.parentNode;a&&a.lastChild!==i&&a.appendChild(i)}function qn(i){var a=i.parentNode;a&&a.firstChild!==i&&a.insertBefore(i,a.firstChild)}function De(i,a){if(i.classList!==void 0)return i.classList.contains(a);var h=vi(i);return h.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(h)}function Yt(i,a){if(i.classList!==void 0)for(var h=x(a),b=0,T=h.length;b<T;b++)i.classList.add(h[b]);else if(!De(i,a)){var z=vi(i);Je(i,(z?z+" ":"")+a)}}function xe(i,a){i.classList!==void 0?i.classList.remove(a):Je(i,m((" "+vi(i)+" ").replace(" "+a+" "," ")))}function Je(i,a){i.className.baseVal===void 0?i.className=a:i.className.baseVal=a}function vi(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function fn(i,a){"opacity"in i.style?i.style.opacity=a:"filter"in i.style&&Ks(i,a)}function Ks(i,a){var h=!1,b="DXImageTransform.Microsoft.Alpha";try{h=i.filters.item(b)}catch{if(a===1)return}a=Math.round(a*100),h?(h.Enabled=a!==100,h.Opacity=a):i.style.filter+=" progid:"+b+"(opacity="+a+")"}function Js(i){for(var a=document.documentElement.style,h=0;h<i.length;h++)if(i[h]in a)return i[h];return!1}function Bi(i,a,h){var b=a||new j(0,0);i.style[Le]=(Wt.ie3d?"translate("+b.x+"px,"+b.y+"px)":"translate3d("+b.x+"px,"+b.y+"px,0)")+(h?" scale("+h+")":"")}function Ne(i,a){i._leaflet_pos=a,Wt.any3d?Bi(i,a):(i.style.left=a.x+"px",i.style.top=a.y+"px")}function Fi(i){return i._leaflet_pos||new j(0,0)}var ls,cs,ba;if("onselectstart"in document)ls=function(){se(window,"selectstart",Ye)},cs=function(){ye(window,"selectstart",Ye)};else{var us=Js(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);ls=function(){if(us){var i=document.documentElement.style;ba=i[us],i[us]="none"}},cs=function(){us&&(document.documentElement.style[us]=ba,ba=void 0)}}function wa(){se(window,"dragstart",Ye)}function Ma(){ye(window,"dragstart",Ye)}var Qs,Sa;function Ea(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(to(),Qs=i,Sa=i.style.outlineStyle,i.style.outlineStyle="none",se(window,"keydown",to))}function to(){Qs&&(Qs.style.outlineStyle=Sa,Qs=void 0,Sa=void 0,ye(window,"keydown",to))}function wc(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function Ta(i){var a=i.getBoundingClientRect();return{x:a.width/i.offsetWidth||1,y:a.height/i.offsetHeight||1,boundingClientRect:a}}var Uf={__proto__:null,TRANSFORM:Le,TRANSITION:on,TRANSITION_END:ve,get:ie,getStyle:ni,create:Xt,remove:fe,empty:zi,toFront:An,toBack:qn,hasClass:De,addClass:Yt,removeClass:xe,setClass:Je,getClass:vi,setOpacity:fn,testProp:Js,setTransform:Bi,setPosition:Ne,getPosition:Fi,get disableTextSelection(){return ls},get enableTextSelection(){return cs},disableImageDrag:wa,enableImageDrag:Ma,preventOutline:Ea,restoreOutline:to,getSizedParentNode:wc,getScale:Ta};function se(i,a,h,b){if(a&&typeof a=="object")for(var T in a)Ca(i,T,a[T],h);else{a=x(a);for(var z=0,Y=a.length;z<Y;z++)Ca(i,a[z],h,b)}return this}var jn="_leaflet_events";function ye(i,a,h,b){if(arguments.length===1)Mc(i),delete i[jn];else if(a&&typeof a=="object")for(var T in a)La(i,T,a[T],h);else if(a=x(a),arguments.length===2)Mc(i,function(ut){return P(a,ut)!==-1});else for(var z=0,Y=a.length;z<Y;z++)La(i,a[z],h,b);return this}function Mc(i,a){for(var h in i[jn]){var b=h.split(/\d/)[0];(!a||a(b))&&La(i,b,null,null,h)}}var Aa={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Ca(i,a,h,b){var T=a+u(h)+(b?"_"+u(b):"");if(i[jn]&&i[jn][T])return this;var z=function(ut){return h.call(b||i,ut||window.event)},Y=z;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?z=gt(i,a,z):Wt.touch&&a==="dblclick"?z=Ee(i,z):"addEventListener"in i?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?i.addEventListener(Aa[a]||a,z,Wt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(z=function(ut){ut=ut||window.event,Ra(i,ut)&&Y(ut)},i.addEventListener(Aa[a],z,!1)):i.addEventListener(a,Y,!1):i.attachEvent("on"+a,z),i[jn]=i[jn]||{},i[jn][T]=z}function La(i,a,h,b,T){T=T||a+u(h)+(b?"_"+u(b):"");var z=i[jn]&&i[jn][T];if(!z)return this;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?_t(i,a,z):Wt.touch&&a==="dblclick"?sn(i,z):"removeEventListener"in i?i.removeEventListener(Aa[a]||a,z,!1):i.detachEvent("on"+a,z),i[jn][T]=null}function Hi(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function Pa(i){return Ca(i,"wheel",Hi),this}function hs(i){return se(i,"mousedown touchstart dblclick contextmenu",Hi),i._leaflet_disable_click=!0,this}function Ye(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function Vi(i){return Ye(i),Hi(i),this}function Sc(i){if(i.composedPath)return i.composedPath();for(var a=[],h=i.target;h;)a.push(h),h=h.parentNode;return a}function Ec(i,a){if(!a)return new j(i.clientX,i.clientY);var h=Ta(a),b=h.boundingClientRect;return new j((i.clientX-b.left)/h.x-a.clientLeft,(i.clientY-b.top)/h.y-a.clientTop)}var kf=Wt.linux&&Wt.chrome?window.devicePixelRatio:Wt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Tc(i){return Wt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/kf:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function Ra(i,a){var h=a.relatedTarget;if(!h)return!0;try{for(;h&&h!==i;)h=h.parentNode}catch{return!1}return h!==i}var zf={__proto__:null,on:se,off:ye,stopPropagation:Hi,disableScrollPropagation:Pa,disableClickPropagation:hs,preventDefault:Ye,stop:Vi,getPropagationPath:Sc,getMousePosition:Ec,getWheelDelta:Tc,isExternalTarget:Ra,addListener:se,removeListener:ye},Ac=ot.extend({run:function(i,a,h,b){this.stop(),this._el=i,this._inProgress=!0,this._duration=h||.25,this._easeOutPower=1/Math.max(b||.5,.2),this._startPos=Fi(i),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=W(this._animate,this),this._step()},_step:function(i){var a=+new Date-this._startTime,h=this._duration*1e3;a<h?this._runFrame(this._easeOut(a/h),i):(this._runFrame(1),this._complete())},_runFrame:function(i,a){var h=this._startPos.add(this._offset.multiplyBy(i));a&&h._round(),Ne(this._el,h),this.fire("step")},_complete:function(){k(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),de=ot.extend({options:{crs:xt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,a){a=y(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(wt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=on&&Wt.any3d&&!Wt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),se(this._proxy,ve,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,a,h){if(a=a===void 0?this._zoom:this._limitZoom(a),i=this._limitCenter(wt(i),a,this.options.maxBounds),h=h||{},this._stop(),this._loaded&&!h.reset&&h!==!0){h.animate!==void 0&&(h.zoom=s({animate:h.animate},h.zoom),h.pan=s({animate:h.animate,duration:h.duration},h.pan));var b=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,a,h.zoom):this._tryAnimatedPan(i,h.pan);if(b)return clearTimeout(this._sizeTimer),this}return this._resetView(i,a,h.pan&&h.pan.noMoveStart),this},setZoom:function(i,a){return this._loaded?this.setView(this.getCenter(),i,{zoom:a}):(this._zoom=i,this)},zoomIn:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,a)},zoomOut:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,a)},setZoomAround:function(i,a,h){var b=this.getZoomScale(a),T=this.getSize().divideBy(2),z=i instanceof j?i:this.latLngToContainerPoint(i),Y=z.subtract(T).multiplyBy(1-1/b),ut=this.containerPointToLatLng(T.add(Y));return this.setView(ut,a,{zoom:h})},_getBoundsCenterZoom:function(i,a){a=a||{},i=i.getBounds?i.getBounds():J(i);var h=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),T=this.getBoundsZoom(i,!1,h.add(b));if(T=typeof a.maxZoom=="number"?Math.min(a.maxZoom,T):T,T===1/0)return{center:i.getCenter(),zoom:T};var z=b.subtract(h).divideBy(2),Y=this.project(i.getSouthWest(),T),ut=this.project(i.getNorthEast(),T),mt=this.unproject(Y.add(ut).divideBy(2).add(z),T);return{center:mt,zoom:T}},fitBounds:function(i,a){if(i=J(i),!i.isValid())throw new Error("Bounds are not valid.");var h=this._getBoundsCenterZoom(i,a);return this.setView(h.center,h.zoom,a)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,a){return this.setView(i,this._zoom,{pan:a})},panBy:function(i,a){if(i=at(i).round(),a=a||{},!i.x&&!i.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Ac,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){Yt(this._mapPane,"leaflet-pan-anim");var h=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,h,a.duration||.25,a.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,a,h){if(h=h||{},h.animate===!1||!Wt.any3d)return this.setView(i,a,h);this._stop();var b=this.project(this.getCenter()),T=this.project(i),z=this.getSize(),Y=this._zoom;i=wt(i),a=a===void 0?Y:a;var ut=Math.max(z.x,z.y),mt=ut*this.getZoomScale(Y,a),Ct=T.distanceTo(b)||1,Bt=1.42,$t=Bt*Bt;function he(Oe){var fo=Oe?-1:1,Tp=Oe?mt:ut,Ap=mt*mt-ut*ut+fo*$t*$t*Ct*Ct,Cp=2*Tp*$t*Ct,Va=Ap/Cp,au=Math.sqrt(Va*Va+1)-Va,Lp=au<1e-9?-18:Math.log(au);return Lp}function an(Oe){return(Math.exp(Oe)-Math.exp(-Oe))/2}function Ge(Oe){return(Math.exp(Oe)+Math.exp(-Oe))/2}function Ln(Oe){return an(Oe)/Ge(Oe)}var pn=he(0);function gr(Oe){return ut*(Ge(pn)/Ge(pn+Bt*Oe))}function wp(Oe){return ut*(Ge(pn)*Ln(pn+Bt*Oe)-an(pn))/$t}function Mp(Oe){return 1-Math.pow(1-Oe,1.5)}var Sp=Date.now(),su=(he(1)-pn)/Bt,Ep=h.duration?1e3*h.duration:1e3*su*.8;function ou(){var Oe=(Date.now()-Sp)/Ep,fo=Mp(Oe)*su;Oe<=1?(this._flyToFrame=W(ou,this),this._move(this.unproject(b.add(T.subtract(b).multiplyBy(wp(fo)/Ct)),Y),this.getScaleZoom(ut/gr(fo),Y),{flyTo:!0})):this._move(i,a)._moveEnd(!0)}return this._moveStart(!0,h.noMoveStart),ou.call(this),this},flyToBounds:function(i,a){var h=this._getBoundsCenterZoom(i,a);return this.flyTo(h.center,h.zoom,a)},setMaxBounds:function(i){return i=J(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var a=this.options.minZoom;return this.options.minZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var a=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,a){this._enforcingBounds=!0;var h=this.getCenter(),b=this._limitCenter(h,this._zoom,J(i));return h.equals(b)||this.panTo(b,a),this._enforcingBounds=!1,this},panInside:function(i,a){a=a||{};var h=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),T=this.project(this.getCenter()),z=this.project(i),Y=this.getPixelBounds(),ut=tt([Y.min.add(h),Y.max.subtract(b)]),mt=ut.getSize();if(!ut.contains(z)){this._enforcingBounds=!0;var Ct=z.subtract(ut.getCenter()),Bt=ut.extend(z).getSize().subtract(mt);T.x+=Ct.x<0?-Bt.x:Bt.x,T.y+=Ct.y<0?-Bt.y:Bt.y,this.panTo(this.unproject(T),a),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=s({animate:!1,pan:!0},i===!0?{animate:!0}:i);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var h=this.getSize(),b=a.divideBy(2).round(),T=h.divideBy(2).round(),z=b.subtract(T);return!z.x&&!z.y?this:(i.animate&&i.pan?this.panBy(z):(i.pan&&this._rawPanBy(z),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:h}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=s({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),h=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,h,i):navigator.geolocation.getCurrentPosition(a,h,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var a=i.code,h=i.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+h+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var a=i.coords.latitude,h=i.coords.longitude,b=new nt(a,h),T=b.toBounds(i.coords.accuracy*2),z=this._locateOptions;if(z.setView){var Y=this.getBoundsZoom(T);this.setView(b,z.maxZoom?Math.min(Y,z.maxZoom):Y)}var ut={latlng:b,bounds:T,timestamp:i.timestamp};for(var mt in i.coords)typeof i.coords[mt]=="number"&&(ut[mt]=i.coords[mt]);this.fire("locationfound",ut)}},addHandler:function(i,a){if(!a)return this;var h=this[i]=new a(this);return this._handlers.push(h),this.options[i]&&h.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),fe(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(k(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)fe(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,a){var h="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),b=Xt("div",h,a||this._mapPane);return i&&(this._panes[i]=b),b},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),a=this.unproject(i.getBottomLeft()),h=this.unproject(i.getTopRight());return new Lt(a,h)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,a,h){i=J(i),h=at(h||[0,0]);var b=this.getZoom()||0,T=this.getMinZoom(),z=this.getMaxZoom(),Y=i.getNorthWest(),ut=i.getSouthEast(),mt=this.getSize().subtract(h),Ct=tt(this.project(ut,b),this.project(Y,b)).getSize(),Bt=Wt.any3d?this.options.zoomSnap:1,$t=mt.x/Ct.x,he=mt.y/Ct.y,an=a?Math.max($t,he):Math.min($t,he);return b=this.getScaleZoom(an,b),Bt&&(b=Math.round(b/(Bt/100))*(Bt/100),b=a?Math.ceil(b/Bt)*Bt:Math.floor(b/Bt)*Bt),Math.max(T,Math.min(z,b))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new j(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,a){var h=this._getTopLeftPoint(i,a);return new q(h,h.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,a){var h=this.options.crs;return a=a===void 0?this._zoom:a,h.scale(i)/h.scale(a)},getScaleZoom:function(i,a){var h=this.options.crs;a=a===void 0?this._zoom:a;var b=h.zoom(i*h.scale(a));return isNaN(b)?1/0:b},project:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(wt(i),a)},unproject:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(at(i),a)},layerPointToLatLng:function(i){var a=at(i).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(i){var a=this.project(wt(i))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(wt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(J(i))},distance:function(i,a){return this.options.crs.distance(wt(i),wt(a))},containerPointToLayerPoint:function(i){return at(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return at(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var a=this.containerPointToLayerPoint(at(i));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(wt(i)))},mouseEventToContainerPoint:function(i){return Ec(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var a=this._container=ie(i);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");se(a,"scroll",this._onScroll,this),this._containerId=u(a)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Wt.any3d,Yt(i,"leaflet-container"+(Wt.touch?" leaflet-touch":"")+(Wt.retina?" leaflet-retina":"")+(Wt.ielt9?" leaflet-oldie":"")+(Wt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=ni(i,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Ne(this._mapPane,new j(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Yt(i.markerPane,"leaflet-zoom-hide"),Yt(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,a,h){Ne(this._mapPane,new j(0,0));var b=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var T=this._zoom!==a;this._moveStart(T,h)._move(i,a)._moveEnd(T),this.fire("viewreset"),b&&this.fire("load")},_moveStart:function(i,a){return i&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(i,a,h,b){a===void 0&&(a=this._zoom);var T=this._zoom!==a;return this._zoom=a,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),b?h&&h.pinch&&this.fire("zoom",h):((T||h&&h.pinch)&&this.fire("zoom",h),this.fire("move",h)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return k(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){Ne(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[u(this._container)]=this;var a=i?ye:se;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Wt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){k(this._resizeRequest),this._resizeRequest=W(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,a){for(var h=[],b,T=a==="mouseout"||a==="mouseover",z=i.target||i.srcElement,Y=!1;z;){if(b=this._targets[u(z)],b&&(a==="click"||a==="preclick")&&this._draggableMoved(b)){Y=!0;break}if(b&&b.listens(a,!0)&&(T&&!Ra(z,i)||(h.push(b),T))||z===this._container)break;z=z.parentNode}return!h.length&&!Y&&!T&&this.listens(a,!0)&&(h=[this]),h},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var a=i.target||i.srcElement;if(!(!this._loaded||a._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(a))){var h=i.type;h==="mousedown"&&Ea(a),this._fireDOMEvent(i,h)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,a,h){if(i.type==="click"){var b=s({},i);b.type="preclick",this._fireDOMEvent(b,b.type,h)}var T=this._findEventTargets(i,a);if(h){for(var z=[],Y=0;Y<h.length;Y++)h[Y].listens(a,!0)&&z.push(h[Y]);T=z.concat(T)}if(T.length){a==="contextmenu"&&Ye(i);var ut=T[0],mt={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var Ct=ut.getLatLng&&(!ut._radius||ut._radius<=10);mt.containerPoint=Ct?this.latLngToContainerPoint(ut.getLatLng()):this.mouseEventToContainerPoint(i),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=Ct?ut.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for(Y=0;Y<T.length;Y++)if(T[Y].fire(a,mt,!0),mt.originalEvent._stopped||T[Y].options.bubblingMouseEvents===!1&&P(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,a=this._handlers.length;i<a;i++)this._handlers[i].disable()},whenReady:function(i,a){return this._loaded?i.call(a||this,{target:this}):this.on("load",i,a),this},_getMapPanePos:function(){return Fi(this._mapPane)||new j(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,a){var h=i&&a!==void 0?this._getNewPixelOrigin(i,a):this.getPixelOrigin();return h.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,a){var h=this.getSize()._divideBy(2);return this.project(i,a)._subtract(h)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,a,h){var b=this._getNewPixelOrigin(h,a);return this.project(i,a)._subtract(b)},_latLngBoundsToNewLayerBounds:function(i,a,h){var b=this._getNewPixelOrigin(h,a);return tt([this.project(i.getSouthWest(),a)._subtract(b),this.project(i.getNorthWest(),a)._subtract(b),this.project(i.getSouthEast(),a)._subtract(b),this.project(i.getNorthEast(),a)._subtract(b)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,a,h){if(!h)return i;var b=this.project(i,a),T=this.getSize().divideBy(2),z=new q(b.subtract(T),b.add(T)),Y=this._getBoundsOffset(z,h,a);return Math.abs(Y.x)<=1&&Math.abs(Y.y)<=1?i:this.unproject(b.add(Y),a)},_limitOffset:function(i,a){if(!a)return i;var h=this.getPixelBounds(),b=new q(h.min.add(i),h.max.add(i));return i.add(this._getBoundsOffset(b,a))},_getBoundsOffset:function(i,a,h){var b=tt(this.project(a.getNorthEast(),h),this.project(a.getSouthWest(),h)),T=b.min.subtract(i.min),z=b.max.subtract(i.max),Y=this._rebound(T.x,-z.x),ut=this._rebound(T.y,-z.y);return new j(Y,ut)},_rebound:function(i,a){return i+a>0?Math.round(i-a)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(a))},_limitZoom:function(i){var a=this.getMinZoom(),h=this.getMaxZoom(),b=Wt.any3d?this.options.zoomSnap:1;return b&&(i=Math.round(i/b)*b),Math.max(a,Math.min(h,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){xe(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,a){var h=this._getCenterOffset(i)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(h)?!1:(this.panBy(h,a),!0)},_createAnimProxy:function(){var i=this._proxy=Xt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(a){var h=Le,b=this._proxy.style[h];Bi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),b===this._proxy.style[h]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){fe(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),a=this.getZoom();Bi(this._proxy,this.project(i,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,a,h){if(this._animatingZoom)return!0;if(h=h||{},!this._zoomAnimated||h.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var b=this.getZoomScale(a),T=this._getCenterOffset(i)._divideBy(1-1/b);return h.animate!==!0&&!this.getSize().contains(T)?!1:(W(function(){this._moveStart(!0,h.noMoveStart||!1)._animateZoom(i,a,!0)},this),!0)},_animateZoom:function(i,a,h,b){this._mapPane&&(h&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=a,Yt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:a,noUpdate:b}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&xe(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Bf(i,a){return new de(i,a)}var Dn=C.extend({options:{position:"topright"},initialize:function(i){y(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var a=this._map;return a&&a.removeControl(this),this.options.position=i,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var a=this._container=this.onAdd(i),h=this.getPosition(),b=i._controlCorners[h];return Yt(a,"leaflet-control"),h.indexOf("bottom")!==-1?b.insertBefore(a,b.firstChild):b.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(fe(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),ds=function(i){return new Dn(i)};de.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},a="leaflet-",h=this._controlContainer=Xt("div",a+"control-container",this._container);function b(T,z){var Y=a+T+" "+a+z;i[T+z]=Xt("div",Y,h)}b("top","left"),b("top","right"),b("bottom","left"),b("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)fe(this._controlCorners[i]);fe(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Cc=Dn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,a,h,b){return h<b?-1:b<h?1:0}},initialize:function(i,a,h){y(this,h),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var b in i)this._addLayer(i[b],b);for(b in a)this._addLayer(a[b],b,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return Dn.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,a){return this._addLayer(i,a),this._map?this._update():this},addOverlay:function(i,a){return this._addLayer(i,a,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var a=this._getLayer(u(i));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){Yt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?(Yt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):xe(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return xe(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",a=this._container=Xt("div",i),h=this.options.collapsed;a.setAttribute("aria-haspopup",!0),hs(a),Pa(a);var b=this._section=Xt("section",i+"-list");h&&(this._map.on("click",this.collapse,this),se(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var T=this._layersLink=Xt("a",i+"-toggle",a);T.href="#",T.title="Layers",T.setAttribute("role","button"),se(T,{keydown:function(z){z.keyCode===13&&this._expandSafely()},click:function(z){Ye(z),this._expandSafely()}},this),h||this.expand(),this._baseLayersList=Xt("div",i+"-base",b),this._separator=Xt("div",i+"-separator",b),this._overlaysList=Xt("div",i+"-overlays",b),a.appendChild(b)},_getLayer:function(i){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&u(this._layers[a].layer)===i)return this._layers[a]},_addLayer:function(i,a,h){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:a,overlay:h}),this.options.sortLayers&&this._layers.sort(l(function(b,T){return this.options.sortFunction(b.layer,T.layer,b.name,T.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;zi(this._baseLayersList),zi(this._overlaysList),this._layerControlInputs=[];var i,a,h,b,T=0;for(h=0;h<this._layers.length;h++)b=this._layers[h],this._addItem(b),a=a||b.overlay,i=i||!b.overlay,T+=b.overlay?0:1;return this.options.hideSingleBase&&(i=i&&T>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=a&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var a=this._getLayer(u(i.target)),h=a.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;h&&this._map.fire(h,a)},_createRadioElement:function(i,a){var h='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(a?' checked="checked"':"")+"/>",b=document.createElement("div");return b.innerHTML=h,b.firstChild},_addItem:function(i){var a=document.createElement("label"),h=this._map.hasLayer(i.layer),b;i.overlay?(b=document.createElement("input"),b.type="checkbox",b.className="leaflet-control-layers-selector",b.defaultChecked=h):b=this._createRadioElement("leaflet-base-layers_"+u(this),h),this._layerControlInputs.push(b),b.layerId=u(i.layer),se(b,"click",this._onInputClick,this);var T=document.createElement("span");T.innerHTML=" "+i.name;var z=document.createElement("span");a.appendChild(z),z.appendChild(b),z.appendChild(T);var Y=i.overlay?this._overlaysList:this._baseLayersList;return Y.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,a,h,b=[],T=[];this._handlingClick=!0;for(var z=i.length-1;z>=0;z--)a=i[z],h=this._getLayer(a.layerId).layer,a.checked?b.push(h):a.checked||T.push(h);for(z=0;z<T.length;z++)this._map.hasLayer(T[z])&&this._map.removeLayer(T[z]);for(z=0;z<b.length;z++)this._map.hasLayer(b[z])||this._map.addLayer(b[z]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,a,h,b=this._map.getZoom(),T=i.length-1;T>=0;T--)a=i[T],h=this._getLayer(a.layerId).layer,a.disabled=h.options.minZoom!==void 0&&b<h.options.minZoom||h.options.maxZoom!==void 0&&b>h.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,se(i,"click",Ye),this.expand();var a=this;setTimeout(function(){ye(i,"click",Ye),a._preventClick=!1})}}),Ff=function(i,a,h){return new Cc(i,a,h)},Ia=Dn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var a="leaflet-control-zoom",h=Xt("div",a+" leaflet-bar"),b=this.options;return this._zoomInButton=this._createButton(b.zoomInText,b.zoomInTitle,a+"-in",h,this._zoomIn),this._zoomOutButton=this._createButton(b.zoomOutText,b.zoomOutTitle,a+"-out",h,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),h},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,a,h,b,T){var z=Xt("a",h,b);return z.innerHTML=i,z.href="#",z.title=a,z.setAttribute("role","button"),z.setAttribute("aria-label",a),hs(z),se(z,"click",Vi),se(z,"click",T,this),se(z,"click",this._refocusOnMap,this),z},_updateDisabled:function(){var i=this._map,a="leaflet-disabled";xe(this._zoomInButton,a),xe(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&(Yt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&(Yt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});de.mergeOptions({zoomControl:!0}),de.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ia,this.addControl(this.zoomControl))});var Hf=function(i){return new Ia(i)},Lc=Dn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var a="leaflet-control-scale",h=Xt("div",a),b=this.options;return this._addScales(b,a+"-line",h),i.on(b.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),h},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,a,h){i.metric&&(this._mScale=Xt("div",a,h)),i.imperial&&(this._iScale=Xt("div",a,h))},_update:function(){var i=this._map,a=i.getSize().y/2,h=i.distance(i.containerPointToLatLng([0,a]),i.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(h)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var a=this._getRoundNum(i),h=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,h,a/i)},_updateImperial:function(i){var a=i*3.2808399,h,b,T;a>5280?(h=a/5280,b=this._getRoundNum(h),this._updateScale(this._iScale,b+" mi",b/h)):(T=this._getRoundNum(a),this._updateScale(this._iScale,T+" ft",T/a))},_updateScale:function(i,a,h){i.style.width=Math.round(this.options.maxWidth*h)+"px",i.innerHTML=a},_getRoundNum:function(i){var a=Math.pow(10,(Math.floor(i)+"").length-1),h=i/a;return h=h>=10?10:h>=5?5:h>=3?3:h>=2?2:1,a*h}}),Vf=function(i){return new Lc(i)},Gf='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Da=Dn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Wt.inlineSvg?Gf+" ":"")+"Leaflet</a>"},initialize:function(i){y(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Xt("div","leaflet-control-attribution"),hs(this._container);for(var a in i._layers)i._layers[a].getAttribution&&this.addAttribution(i._layers[a].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var a in this._attributions)this._attributions[a]&&i.push(a);var h=[];this.options.prefix&&h.push(this.options.prefix),i.length&&h.push(i.join(", ")),this._container.innerHTML=h.join(' <span aria-hidden="true">|</span> ')}}});de.mergeOptions({attributionControl:!0}),de.addInitHook(function(){this.options.attributionControl&&new Da().addTo(this)});var Wf=function(i){return new Da(i)};Dn.Layers=Cc,Dn.Zoom=Ia,Dn.Scale=Lc,Dn.Attribution=Da,ds.layers=Ff,ds.zoom=Hf,ds.scale=Vf,ds.attribution=Wf;var Yn=C.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});Yn.addTo=function(i,a){return i.addHandler(a,this),this};var Zf={Events:it},Pc=Wt.touch?"touchstart mousedown":"mousedown",yi=ot.extend({options:{clickTolerance:3},initialize:function(i,a,h,b){y(this,b),this._element=i,this._dragStartTarget=a||i,this._preventOutline=h},enable:function(){this._enabled||(se(this._dragStartTarget,Pc,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(yi._dragging===this&&this.finishDrag(!0),ye(this._dragStartTarget,Pc,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!De(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){yi._dragging===this&&this.finishDrag();return}if(!(yi._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(yi._dragging=this,this._preventOutline&&Ea(this._element),wa(),ls(),!this._moving)){this.fire("down");var a=i.touches?i.touches[0]:i,h=wc(this._element);this._startPoint=new j(a.clientX,a.clientY),this._startPos=Fi(this._element),this._parentScale=Ta(h);var b=i.type==="mousedown";se(document,b?"mousemove":"touchmove",this._onMove,this),se(document,b?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var a=i.touches&&i.touches.length===1?i.touches[0]:i,h=new j(a.clientX,a.clientY)._subtract(this._startPoint);!h.x&&!h.y||Math.abs(h.x)+Math.abs(h.y)<this.options.clickTolerance||(h.x/=this._parentScale.x,h.y/=this._parentScale.y,Ye(i),this._moved||(this.fire("dragstart"),this._moved=!0,Yt(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Yt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(h),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),Ne(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){xe(document.body,"leaflet-dragging"),this._lastTarget&&(xe(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),ye(document,"mousemove touchmove",this._onMove,this),ye(document,"mouseup touchend touchcancel",this._onUp,this),Ma(),cs();var a=this._moved&&this._moving;this._moving=!1,yi._dragging=!1,a&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function Rc(i,a,h){var b,T=[1,4,2,8],z,Y,ut,mt,Ct,Bt,$t,he;for(z=0,Bt=i.length;z<Bt;z++)i[z]._code=Gi(i[z],a);for(ut=0;ut<4;ut++){for($t=T[ut],b=[],z=0,Bt=i.length,Y=Bt-1;z<Bt;Y=z++)mt=i[z],Ct=i[Y],mt._code&$t?Ct._code&$t||(he=eo(Ct,mt,$t,a,h),he._code=Gi(he,a),b.push(he)):(Ct._code&$t&&(he=eo(Ct,mt,$t,a,h),he._code=Gi(he,a),b.push(he)),b.push(mt));i=b}return i}function Ic(i,a){var h,b,T,z,Y,ut,mt,Ct,Bt;if(!i||i.length===0)throw new Error("latlngs not passed");Cn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var $t=wt([0,0]),he=J(i),an=he.getNorthWest().distanceTo(he.getSouthWest())*he.getNorthEast().distanceTo(he.getNorthWest());an<1700&&($t=Na(i));var Ge=i.length,Ln=[];for(h=0;h<Ge;h++){var pn=wt(i[h]);Ln.push(a.project(wt([pn.lat-$t.lat,pn.lng-$t.lng])))}for(ut=mt=Ct=0,h=0,b=Ge-1;h<Ge;b=h++)T=Ln[h],z=Ln[b],Y=T.y*z.x-z.y*T.x,mt+=(T.x+z.x)*Y,Ct+=(T.y+z.y)*Y,ut+=Y*3;ut===0?Bt=Ln[0]:Bt=[mt/ut,Ct/ut];var gr=a.unproject(at(Bt));return wt([gr.lat+$t.lat,gr.lng+$t.lng])}function Na(i){for(var a=0,h=0,b=0,T=0;T<i.length;T++){var z=wt(i[T]);a+=z.lat,h+=z.lng,b++}return wt([a/b,h/b])}var Xf={__proto__:null,clipPolygon:Rc,polygonCenter:Ic,centroid:Na};function Dc(i,a){if(!a||!i.length)return i.slice();var h=a*a;return i=Yf(i,h),i=jf(i,h),i}function Nc(i,a,h){return Math.sqrt(fs(i,a,h,!0))}function qf(i,a,h){return fs(i,a,h)}function jf(i,a){var h=i.length,b=typeof Uint8Array<"u"?Uint8Array:Array,T=new b(h);T[0]=T[h-1]=1,Oa(i,T,a,0,h-1);var z,Y=[];for(z=0;z<h;z++)T[z]&&Y.push(i[z]);return Y}function Oa(i,a,h,b,T){var z=0,Y,ut,mt;for(ut=b+1;ut<=T-1;ut++)mt=fs(i[ut],i[b],i[T],!0),mt>z&&(Y=ut,z=mt);z>h&&(a[Y]=1,Oa(i,a,h,b,Y),Oa(i,a,h,Y,T))}function Yf(i,a){for(var h=[i[0]],b=1,T=0,z=i.length;b<z;b++)$f(i[b],i[T])>a&&(h.push(i[b]),T=b);return T<z-1&&h.push(i[z-1]),h}var Oc;function Uc(i,a,h,b,T){var z=b?Oc:Gi(i,h),Y=Gi(a,h),ut,mt,Ct;for(Oc=Y;;){if(!(z|Y))return[i,a];if(z&Y)return!1;ut=z||Y,mt=eo(i,a,ut,h,T),Ct=Gi(mt,h),ut===z?(i=mt,z=Ct):(a=mt,Y=Ct)}}function eo(i,a,h,b,T){var z=a.x-i.x,Y=a.y-i.y,ut=b.min,mt=b.max,Ct,Bt;return h&8?(Ct=i.x+z*(mt.y-i.y)/Y,Bt=mt.y):h&4?(Ct=i.x+z*(ut.y-i.y)/Y,Bt=ut.y):h&2?(Ct=mt.x,Bt=i.y+Y*(mt.x-i.x)/z):h&1&&(Ct=ut.x,Bt=i.y+Y*(ut.x-i.x)/z),new j(Ct,Bt,T)}function Gi(i,a){var h=0;return i.x<a.min.x?h|=1:i.x>a.max.x&&(h|=2),i.y<a.min.y?h|=4:i.y>a.max.y&&(h|=8),h}function $f(i,a){var h=a.x-i.x,b=a.y-i.y;return h*h+b*b}function fs(i,a,h,b){var T=a.x,z=a.y,Y=h.x-T,ut=h.y-z,mt=Y*Y+ut*ut,Ct;return mt>0&&(Ct=((i.x-T)*Y+(i.y-z)*ut)/mt,Ct>1?(T=h.x,z=h.y):Ct>0&&(T+=Y*Ct,z+=ut*Ct)),Y=i.x-T,ut=i.y-z,b?Y*Y+ut*ut:new j(T,z)}function Cn(i){return!M(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function kc(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Cn(i)}function zc(i,a){var h,b,T,z,Y,ut,mt,Ct;if(!i||i.length===0)throw new Error("latlngs not passed");Cn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Bt=wt([0,0]),$t=J(i),he=$t.getNorthWest().distanceTo($t.getSouthWest())*$t.getNorthEast().distanceTo($t.getNorthWest());he<1700&&(Bt=Na(i));var an=i.length,Ge=[];for(h=0;h<an;h++){var Ln=wt(i[h]);Ge.push(a.project(wt([Ln.lat-Bt.lat,Ln.lng-Bt.lng])))}for(h=0,b=0;h<an-1;h++)b+=Ge[h].distanceTo(Ge[h+1])/2;if(b===0)Ct=Ge[0];else for(h=0,z=0;h<an-1;h++)if(Y=Ge[h],ut=Ge[h+1],T=Y.distanceTo(ut),z+=T,z>b){mt=(z-b)/T,Ct=[ut.x-mt*(ut.x-Y.x),ut.y-mt*(ut.y-Y.y)];break}var pn=a.unproject(at(Ct));return wt([pn.lat+Bt.lat,pn.lng+Bt.lng])}var Kf={__proto__:null,simplify:Dc,pointToSegmentDistance:Nc,closestPointOnSegment:qf,clipSegment:Uc,_getEdgeIntersection:eo,_getBitCode:Gi,_sqClosestPointOnSegment:fs,isFlat:Cn,_flat:kc,polylineCenter:zc},Ua={project:function(i){return new j(i.lng,i.lat)},unproject:function(i){return new nt(i.y,i.x)},bounds:new q([-180,-90],[180,90])},ka={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var a=Math.PI/180,h=this.R,b=i.lat*a,T=this.R_MINOR/h,z=Math.sqrt(1-T*T),Y=z*Math.sin(b),ut=Math.tan(Math.PI/4-b/2)/Math.pow((1-Y)/(1+Y),z/2);return b=-h*Math.log(Math.max(ut,1e-10)),new j(i.lng*a*h,b)},unproject:function(i){for(var a=180/Math.PI,h=this.R,b=this.R_MINOR/h,T=Math.sqrt(1-b*b),z=Math.exp(-i.y/h),Y=Math.PI/2-2*Math.atan(z),ut=0,mt=.1,Ct;ut<15&&Math.abs(mt)>1e-7;ut++)Ct=T*Math.sin(Y),Ct=Math.pow((1-Ct)/(1+Ct),T/2),mt=Math.PI/2-2*Math.atan(z*Ct)-Y,Y+=mt;return new nt(Y*a,i.x*a/h)}},Jf={__proto__:null,LonLat:Ua,Mercator:ka,SphericalMercator:kt},Qf=s({},Pt,{code:"EPSG:3395",projection:ka,transformation:function(){var i=.5/(Math.PI*ka.R);return vt(i,.5,-i,.5)}()}),Bc=s({},Pt,{code:"EPSG:4326",projection:Ua,transformation:vt(1/180,1,-1/180,.5)}),tp=s({},St,{projection:Ua,transformation:vt(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,a){var h=a.lng-i.lng,b=a.lat-i.lat;return Math.sqrt(h*h+b*b)},infinite:!0});St.Earth=Pt,St.EPSG3395=Qf,St.EPSG3857=xt,St.EPSG900913=E,St.EPSG4326=Bc,St.Simple=tp;var Nn=ot.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[u(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[u(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var a=i.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var h=this.getEvents();a.on(h,this),this.once("remove",function(){a.off(h,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});de.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var a=u(i);return this._layers[a]?this:(this._layers[a]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var a=u(i);return this._layers[a]?(this._loaded&&i.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return u(i)in this._layers},eachLayer:function(i,a){for(var h in this._layers)i.call(a,this._layers[h]);return this},_addLayers:function(i){i=i?M(i)?i:[i]:[];for(var a=0,h=i.length;a<h;a++)this.addLayer(i[a])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[u(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var a=u(i);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,a=-1/0,h=this._getZoomSpan();for(var b in this._zoomBoundLayers){var T=this._zoomBoundLayers[b].options;i=T.minZoom===void 0?i:Math.min(i,T.minZoom),a=T.maxZoom===void 0?a:Math.max(a,T.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=i===1/0?void 0:i,h!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var hr=Nn.extend({initialize:function(i,a){y(this,a),this._layers={};var h,b;if(i)for(h=0,b=i.length;h<b;h++)this.addLayer(i[h])},addLayer:function(i){var a=this.getLayerId(i);return this._layers[a]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var a=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(i){var a=typeof i=="number"?i:this.getLayerId(i);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var a=Array.prototype.slice.call(arguments,1),h,b;for(h in this._layers)b=this._layers[h],b[i]&&b[i].apply(b,a);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,a){for(var h in this._layers)i.call(a,this._layers[h]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return u(i)}}),ep=function(i,a){return new hr(i,a)},ii=hr.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),hr.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),hr.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new Lt;for(var a in this._layers){var h=this._layers[a];i.extend(h.getBounds?h.getBounds():h.getLatLng())}return i}}),np=function(i,a){return new ii(i,a)},dr=C.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){y(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,a){var h=this._getIconUrl(i);if(!h){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var b=this._createImg(h,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(b,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(b.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),b},_setIconStyles:function(i,a){var h=this.options,b=h[a+"Size"];typeof b=="number"&&(b=[b,b]);var T=at(b),z=at(a==="shadow"&&h.shadowAnchor||h.iconAnchor||T&&T.divideBy(2,!0));i.className="leaflet-marker-"+a+" "+(h.className||""),z&&(i.style.marginLeft=-z.x+"px",i.style.marginTop=-z.y+"px"),T&&(i.style.width=T.x+"px",i.style.height=T.y+"px")},_createImg:function(i,a){return a=a||document.createElement("img"),a.src=i,a},_getIconUrl:function(i){return Wt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function ip(i){return new dr(i)}var ps=dr.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof ps.imagePath!="string"&&(ps.imagePath=this._detectIconPath()),(this.options.imagePath||ps.imagePath)+dr.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var a=function(h,b,T){var z=b.exec(h);return z&&z[T]};return i=a(i,/^url\((['"])?(.+)\1\)$/,2),i&&a(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Xt("div","leaflet-default-icon-path",document.body),a=ni(i,"background-image")||ni(i,"backgroundImage");if(document.body.removeChild(i),a=this._stripUrl(a),a)return a;var h=document.querySelector('link[href$="leaflet.css"]');return h?h.href.substring(0,h.href.length-11-1):""}}),Fc=Yn.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new yi(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Yt(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&xe(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var a=this._marker,h=a._map,b=this._marker.options.autoPanSpeed,T=this._marker.options.autoPanPadding,z=Fi(a._icon),Y=h.getPixelBounds(),ut=h.getPixelOrigin(),mt=tt(Y.min._subtract(ut).add(T),Y.max._subtract(ut).subtract(T));if(!mt.contains(z)){var Ct=at((Math.max(mt.max.x,z.x)-mt.max.x)/(Y.max.x-mt.max.x)-(Math.min(mt.min.x,z.x)-mt.min.x)/(Y.min.x-mt.min.x),(Math.max(mt.max.y,z.y)-mt.max.y)/(Y.max.y-mt.max.y)-(Math.min(mt.min.y,z.y)-mt.min.y)/(Y.min.y-mt.min.y)).multiplyBy(b);h.panBy(Ct,{animate:!1}),this._draggable._newPos._add(Ct),this._draggable._startPos._add(Ct),Ne(a._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=W(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(k(this._panRequest),this._panRequest=W(this._adjustPan.bind(this,i)))},_onDrag:function(i){var a=this._marker,h=a._shadow,b=Fi(a._icon),T=a._map.layerPointToLatLng(b);h&&Ne(h,b),a._latlng=T,i.latlng=T,i.oldLatLng=this._oldLatLng,a.fire("move",i).fire("drag",i)},_onDragEnd:function(i){k(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),no=Nn.extend({options:{icon:new ps,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,a){y(this,a),this._latlng=wt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),h=i.icon.createIcon(this._icon),b=!1;h!==this._icon&&(this._icon&&this._removeIcon(),b=!0,i.title&&(h.title=i.title),h.tagName==="IMG"&&(h.alt=i.alt||"")),Yt(h,a),i.keyboard&&(h.tabIndex="0",h.setAttribute("role","button")),this._icon=h,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&se(h,"focus",this._panOnFocus,this);var T=i.icon.createShadow(this._shadow),z=!1;T!==this._shadow&&(this._removeShadow(),z=!0),T&&(Yt(T,a),T.alt=""),this._shadow=T,i.opacity<1&&this._updateOpacity(),b&&this.getPane().appendChild(this._icon),this._initInteraction(),T&&z&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&ye(this._icon,"focus",this._panOnFocus,this),fe(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&fe(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&Ne(this._icon,i),this._shadow&&Ne(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&(Yt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Fc)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Fc(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&fn(this._icon,i),this._shadow&&fn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var a=this.options.icon.options,h=a.iconSize?at(a.iconSize):at(0,0),b=a.iconAnchor?at(a.iconAnchor):at(0,0);i.panInside(this._latlng,{paddingTopLeft:b,paddingBottomRight:h.subtract(b)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function rp(i,a){return new no(i,a)}var xi=Nn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return y(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),io=xi.extend({options:{fill:!0,radius:10},initialize:function(i,a){y(this,a),this._latlng=wt(i),this._radius=this.options.radius},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var a=i&&i.radius||this._radius;return xi.prototype.setStyle.call(this,i),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,a=this._radiusY||i,h=this._clickTolerance(),b=[i+h,a+h];this._pxBounds=new q(this._point.subtract(b),this._point.add(b))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function sp(i,a){return new io(i,a)}var za=io.extend({initialize:function(i,a,h){if(typeof a=="number"&&(a=s({},h,{radius:a})),y(this,a),this._latlng=wt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new Lt(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:xi.prototype.setStyle,_project:function(){var i=this._latlng.lng,a=this._latlng.lat,h=this._map,b=h.options.crs;if(b.distance===Pt.distance){var T=Math.PI/180,z=this._mRadius/Pt.R/T,Y=h.project([a+z,i]),ut=h.project([a-z,i]),mt=Y.add(ut).divideBy(2),Ct=h.unproject(mt).lat,Bt=Math.acos((Math.cos(z*T)-Math.sin(a*T)*Math.sin(Ct*T))/(Math.cos(a*T)*Math.cos(Ct*T)))/T;(isNaN(Bt)||Bt===0)&&(Bt=z/Math.cos(Math.PI/180*a)),this._point=mt.subtract(h.getPixelOrigin()),this._radius=isNaN(Bt)?0:mt.x-h.project([Ct,i-Bt]).x,this._radiusY=mt.y-Y.y}else{var $t=b.unproject(b.project(this._latlng).subtract([this._mRadius,0]));this._point=h.latLngToLayerPoint(this._latlng),this._radius=this._point.x-h.latLngToLayerPoint($t).x}this._updateBounds()}});function op(i,a,h){return new za(i,a,h)}var ri=xi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,a){y(this,a),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var a=1/0,h=null,b=fs,T,z,Y=0,ut=this._parts.length;Y<ut;Y++)for(var mt=this._parts[Y],Ct=1,Bt=mt.length;Ct<Bt;Ct++){T=mt[Ct-1],z=mt[Ct];var $t=b(i,T,z,!0);$t<a&&(a=$t,h=b(i,T,z))}return h&&(h.distance=Math.sqrt(a)),h},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return zc(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,a){return a=a||this._defaultShape(),i=wt(i),a.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new Lt,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return Cn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var a=[],h=Cn(i),b=0,T=i.length;b<T;b++)h?(a[b]=wt(i[b]),this._bounds.extend(a[b])):a[b]=this._convertLatLngs(i[b]);return a},_project:function(){var i=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),a=new j(i,i);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(i,a,h){var b=i[0]instanceof nt,T=i.length,z,Y;if(b){for(Y=[],z=0;z<T;z++)Y[z]=this._map.latLngToLayerPoint(i[z]),h.extend(Y[z]);a.push(Y)}else for(z=0;z<T;z++)this._projectLatlngs(i[z],a,h)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,h,b,T,z,Y,ut,mt;for(h=0,T=0,z=this._rings.length;h<z;h++)for(mt=this._rings[h],b=0,Y=mt.length;b<Y-1;b++)ut=Uc(mt[b],mt[b+1],i,b,!0),ut&&(a[T]=a[T]||[],a[T].push(ut[0]),(ut[1]!==mt[b+1]||b===Y-2)&&(a[T].push(ut[1]),T++))}},_simplifyPoints:function(){for(var i=this._parts,a=this.options.smoothFactor,h=0,b=i.length;h<b;h++)i[h]=Dc(i[h],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,a){var h,b,T,z,Y,ut,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(h=0,z=this._parts.length;h<z;h++)for(ut=this._parts[h],b=0,Y=ut.length,T=Y-1;b<Y;T=b++)if(!(!a&&b===0)&&Nc(i,ut[T],ut[b])<=mt)return!0;return!1}});function ap(i,a){return new ri(i,a)}ri._flat=kc;var fr=ri.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Ic(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var a=ri.prototype._convertLatLngs.call(this,i),h=a.length;return h>=2&&a[0]instanceof nt&&a[0].equals(a[h-1])&&a.pop(),a},_setLatLngs:function(i){ri.prototype._setLatLngs.call(this,i),Cn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Cn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,a=this.options.weight,h=new j(a,a);if(i=new q(i.min.subtract(h),i.max.add(h)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var b=0,T=this._rings.length,z;b<T;b++)z=Rc(this._rings[b],i,!0),z.length&&this._parts.push(z)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var a=!1,h,b,T,z,Y,ut,mt,Ct;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(z=0,mt=this._parts.length;z<mt;z++)for(h=this._parts[z],Y=0,Ct=h.length,ut=Ct-1;Y<Ct;ut=Y++)b=h[Y],T=h[ut],b.y>i.y!=T.y>i.y&&i.x<(T.x-b.x)*(i.y-b.y)/(T.y-b.y)+b.x&&(a=!a);return a||ri.prototype._containsPoint.call(this,i,!0)}});function lp(i,a){return new fr(i,a)}var si=ii.extend({initialize:function(i,a){y(this,a),this._layers={},i&&this.addData(i)},addData:function(i){var a=M(i)?i:i.features,h,b,T;if(a){for(h=0,b=a.length;h<b;h++)T=a[h],(T.geometries||T.geometry||T.features||T.coordinates)&&this.addData(T);return this}var z=this.options;if(z.filter&&!z.filter(i))return this;var Y=ro(i,z);return Y?(Y.feature=ao(i),Y.defaultOptions=Y.options,this.resetStyle(Y),z.onEachFeature&&z.onEachFeature(i,Y),this.addLayer(Y)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=s({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(a){this._setLayerStyle(a,i)},this)},_setLayerStyle:function(i,a){i.setStyle&&(typeof a=="function"&&(a=a(i.feature)),i.setStyle(a))}});function ro(i,a){var h=i.type==="Feature"?i.geometry:i,b=h?h.coordinates:null,T=[],z=a&&a.pointToLayer,Y=a&&a.coordsToLatLng||Ba,ut,mt,Ct,Bt;if(!b&&!h)return null;switch(h.type){case"Point":return ut=Y(b),Hc(z,i,ut,a);case"MultiPoint":for(Ct=0,Bt=b.length;Ct<Bt;Ct++)ut=Y(b[Ct]),T.push(Hc(z,i,ut,a));return new ii(T);case"LineString":case"MultiLineString":return mt=so(b,h.type==="LineString"?0:1,Y),new ri(mt,a);case"Polygon":case"MultiPolygon":return mt=so(b,h.type==="Polygon"?1:2,Y),new fr(mt,a);case"GeometryCollection":for(Ct=0,Bt=h.geometries.length;Ct<Bt;Ct++){var $t=ro({geometry:h.geometries[Ct],type:"Feature",properties:i.properties},a);$t&&T.push($t)}return new ii(T);case"FeatureCollection":for(Ct=0,Bt=h.features.length;Ct<Bt;Ct++){var he=ro(h.features[Ct],a);he&&T.push(he)}return new ii(T);default:throw new Error("Invalid GeoJSON object.")}}function Hc(i,a,h,b){return i?i(a,h):new no(h,b&&b.markersInheritOptions&&b)}function Ba(i){return new nt(i[1],i[0],i[2])}function so(i,a,h){for(var b=[],T=0,z=i.length,Y;T<z;T++)Y=a?so(i[T],a-1,h):(h||Ba)(i[T]),b.push(Y);return b}function Fa(i,a){return i=wt(i),i.alt!==void 0?[v(i.lng,a),v(i.lat,a),v(i.alt,a)]:[v(i.lng,a),v(i.lat,a)]}function oo(i,a,h,b){for(var T=[],z=0,Y=i.length;z<Y;z++)T.push(a?oo(i[z],Cn(i[z])?0:a-1,h,b):Fa(i[z],b));return!a&&h&&T.length>0&&T.push(T[0].slice()),T}function pr(i,a){return i.feature?s({},i.feature,{geometry:a}):ao(a)}function ao(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var Ha={toGeoJSON:function(i){return pr(this,{type:"Point",coordinates:Fa(this.getLatLng(),i)})}};no.include(Ha),za.include(Ha),io.include(Ha),ri.include({toGeoJSON:function(i){var a=!Cn(this._latlngs),h=oo(this._latlngs,a?1:0,!1,i);return pr(this,{type:(a?"Multi":"")+"LineString",coordinates:h})}}),fr.include({toGeoJSON:function(i){var a=!Cn(this._latlngs),h=a&&!Cn(this._latlngs[0]),b=oo(this._latlngs,h?2:a?1:0,!0,i);return a||(b=[b]),pr(this,{type:(h?"Multi":"")+"Polygon",coordinates:b})}}),hr.include({toMultiPoint:function(i){var a=[];return this.eachLayer(function(h){a.push(h.toGeoJSON(i).geometry.coordinates)}),pr(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(i){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(i);var h=a==="GeometryCollection",b=[];return this.eachLayer(function(T){if(T.toGeoJSON){var z=T.toGeoJSON(i);if(h)b.push(z.geometry);else{var Y=ao(z);Y.type==="FeatureCollection"?b.push.apply(b,Y.features):b.push(Y)}}}),h?pr(this,{geometries:b,type:"GeometryCollection"}):{type:"FeatureCollection",features:b}}});function Vc(i,a){return new si(i,a)}var cp=Vc,lo=Nn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,a,h){this._url=i,this._bounds=J(a),y(this,h)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Yt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){fe(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&An(this._image),this},bringToBack:function(){return this._map&&qn(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=J(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",a=this._image=i?this._url:Xt("img");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(i){var a=this._map.getZoomScale(i.zoom),h=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;Bi(this._image,h,a)},_reset:function(){var i=this._image,a=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),h=a.getSize();Ne(i,a.min),i.style.width=h.x+"px",i.style.height=h.y+"px"},_updateOpacity:function(){fn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),up=function(i,a,h){return new lo(i,a,h)},Gc=lo.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",a=this._image=i?this._url:Xt("video");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onloadeddata=l(this.fire,this,"load"),i){for(var h=a.getElementsByTagName("source"),b=[],T=0;T<h.length;T++)b.push(h[T].src);this._url=h.length>0?b:[a.src];return}M(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var z=0;z<this._url.length;z++){var Y=Xt("source");Y.src=this._url[z],a.appendChild(Y)}}});function hp(i,a,h){return new Gc(i,a,h)}var Wc=lo.extend({_initImage:function(){var i=this._image=this._url;Yt(i,"leaflet-image-layer"),this._zoomAnimated&&Yt(i,"leaflet-zoom-animated"),this.options.className&&Yt(i,this.options.className),i.onselectstart=p,i.onmousemove=p}});function dp(i,a,h){return new Wc(i,a,h)}var $n=Nn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,a){i&&(i instanceof nt||M(i))?(this._latlng=wt(i),y(this,a)):(y(this,i),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&fn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&fn(this._container,1),this.bringToFront(),this.options.interactive&&(Yt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(fn(this._container,0),this._removeTimeout=setTimeout(l(fe,void 0,this._container),200)):fe(this._container),this.options.interactive&&(xe(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=wt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&An(this._container),this},bringToBack:function(){return this._map&&qn(this._container),this},_prepareOpen:function(i){var a=this._source;if(!a._map)return!1;if(a instanceof ii){a=null;var h=this._source._layers;for(var b in h)if(h[b]._map){a=h[b];break}if(!a)return!1;this._source=a}if(!i)if(a.getCenter)i=a.getCenter();else if(a.getLatLng)i=a.getLatLng();else if(a.getBounds)i=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")i.innerHTML=a;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),a=at(this.options.offset),h=this._getAnchor();this._zoomAnimated?Ne(this._container,i.add(h)):a=a.add(i).add(h);var b=this._containerBottom=-a.y,T=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=b+"px",this._container.style.left=T+"px"}},_getAnchor:function(){return[0,0]}});de.include({_initOverlay:function(i,a,h,b){var T=a;return T instanceof i||(T=new i(b).setContent(a)),h&&T.setLatLng(h),T}}),Nn.include({_initOverlay:function(i,a,h,b){var T=h;return T instanceof i?(y(T,b),T._source=this):(T=a&&!b?a:new i(b,this),T.setContent(h)),T}});var co=$n.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,$n.prototype.openOn.call(this,i)},onAdd:function(i){$n.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof xi||this._source.on("preclick",Hi))},onRemove:function(i){$n.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof xi||this._source.off("preclick",Hi))},getEvents:function(){var i=$n.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",a=this._container=Xt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),h=this._wrapper=Xt("div",i+"-content-wrapper",a);if(this._contentNode=Xt("div",i+"-content",h),hs(a),Pa(this._contentNode),se(a,"contextmenu",Hi),this._tipContainer=Xt("div",i+"-tip-container",a),this._tip=Xt("div",i+"-tip",this._tipContainer),this.options.closeButton){var b=this._closeButton=Xt("a",i+"-close-button",a);b.setAttribute("role","button"),b.setAttribute("aria-label","Close popup"),b.href="#close",b.innerHTML='<span aria-hidden="true">&#215;</span>',se(b,"click",function(T){Ye(T),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,a=i.style;a.width="",a.whiteSpace="nowrap";var h=i.offsetWidth;h=Math.min(h,this.options.maxWidth),h=Math.max(h,this.options.minWidth),a.width=h+1+"px",a.whiteSpace="",a.height="";var b=i.offsetHeight,T=this.options.maxHeight,z="leaflet-popup-scrolled";T&&b>T?(a.height=T+"px",Yt(i,z)):xe(i,z),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),h=this._getAnchor();Ne(this._container,a.add(h))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,a=parseInt(ni(this._container,"marginBottom"),10)||0,h=this._container.offsetHeight+a,b=this._containerWidth,T=new j(this._containerLeft,-h-this._containerBottom);T._add(Fi(this._container));var z=i.layerPointToContainerPoint(T),Y=at(this.options.autoPanPadding),ut=at(this.options.autoPanPaddingTopLeft||Y),mt=at(this.options.autoPanPaddingBottomRight||Y),Ct=i.getSize(),Bt=0,$t=0;z.x+b+mt.x>Ct.x&&(Bt=z.x+b-Ct.x+mt.x),z.x-Bt-ut.x<0&&(Bt=z.x-ut.x),z.y+h+mt.y>Ct.y&&($t=z.y+h-Ct.y+mt.y),z.y-$t-ut.y<0&&($t=z.y-ut.y),(Bt||$t)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([Bt,$t]))}},_getAnchor:function(){return at(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),fp=function(i,a){return new co(i,a)};de.mergeOptions({closePopupOnClick:!0}),de.include({openPopup:function(i,a,h){return this._initOverlay(co,i,a,h).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),Nn.include({bindPopup:function(i,a){return this._popup=this._initOverlay(co,this._popup,i,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof ii||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){Vi(i);var a=i.layer||i.target;if(this._popup._source===a&&!(a instanceof xi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=a,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var uo=$n.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){$n.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){$n.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=$n.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",a=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Xt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+u(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var a,h,b=this._map,T=this._container,z=b.latLngToContainerPoint(b.getCenter()),Y=b.layerPointToContainerPoint(i),ut=this.options.direction,mt=T.offsetWidth,Ct=T.offsetHeight,Bt=at(this.options.offset),$t=this._getAnchor();ut==="top"?(a=mt/2,h=Ct):ut==="bottom"?(a=mt/2,h=0):ut==="center"?(a=mt/2,h=Ct/2):ut==="right"?(a=0,h=Ct/2):ut==="left"?(a=mt,h=Ct/2):Y.x<z.x?(ut="right",a=0,h=Ct/2):(ut="left",a=mt+(Bt.x+$t.x)*2,h=Ct/2),i=i.subtract(at(a,h,!0)).add(Bt).add($t),xe(T,"leaflet-tooltip-right"),xe(T,"leaflet-tooltip-left"),xe(T,"leaflet-tooltip-top"),xe(T,"leaflet-tooltip-bottom"),Yt(T,"leaflet-tooltip-"+ut),Ne(T,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&fn(this._container,i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(a)},_getAnchor:function(){return at(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),pp=function(i,a){return new uo(i,a)};de.include({openTooltip:function(i,a,h){return this._initOverlay(uo,i,a,h).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),Nn.include({bindTooltip:function(i,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(uo,this._tooltip,i,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var a=i?"off":"on",h={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?h.add=this._openTooltip:(h.mouseover=this._openTooltip,h.mouseout=this.closeTooltip,h.click=this._openTooltip,this._map?this._addFocusListeners():h.add=this._addFocusListeners),this._tooltip.options.sticky&&(h.mousemove=this._moveTooltip),this[a](h),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof ii||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&(se(a,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),se(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var a=i.latlng,h,b;this._tooltip.options.sticky&&i.originalEvent&&(h=this._map.mouseEventToContainerPoint(i.originalEvent),b=this._map.containerPointToLayerPoint(h),a=this._map.layerPointToLatLng(b)),this._tooltip.setLatLng(a)}});var Zc=dr.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var a=i&&i.tagName==="DIV"?i:document.createElement("div"),h=this.options;if(h.html instanceof Element?(zi(a),a.appendChild(h.html)):a.innerHTML=h.html!==!1?h.html:"",h.bgPos){var b=at(h.bgPos);a.style.backgroundPosition=-b.x+"px "+-b.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function mp(i){return new Zc(i)}dr.Default=ps;var ms=Nn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Wt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){y(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),fe(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(An(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(qn(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof j?i:new j(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var a=this.getPane().children,h=-i(-1/0,1/0),b=0,T=a.length,z;b<T;b++)z=a[b].style.zIndex,a[b]!==this._container&&z&&(h=i(h,+z));isFinite(h)&&(this.options.zIndex=h+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Wt.ielt9){fn(this._container,this.options.opacity);var i=+new Date,a=!1,h=!1;for(var b in this._tiles){var T=this._tiles[b];if(!(!T.current||!T.loaded)){var z=Math.min(1,(i-T.loaded)/200);fn(T.el,z),z<1?a=!0:(T.active?h=!0:this._onOpaqueTile(T),T.active=!0)}}h&&!this._noPrune&&this._pruneTiles(),a&&(k(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Xt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,a=this.options.maxZoom;if(i!==void 0){for(var h in this._levels)h=Number(h),this._levels[h].el.children.length||h===i?(this._levels[h].el.style.zIndex=a-Math.abs(i-h),this._onUpdateLevel(h)):(fe(this._levels[h].el),this._removeTilesAtZoom(h),this._onRemoveLevel(h),delete this._levels[h]);var b=this._levels[i],T=this._map;return b||(b=this._levels[i]={},b.el=Xt("div","leaflet-tile-container leaflet-zoom-animated",this._container),b.el.style.zIndex=a,b.origin=T.project(T.unproject(T.getPixelOrigin()),i).round(),b.zoom=i,this._setZoomTransform(b,T.getCenter(),T.getZoom()),p(b.el.offsetWidth),this._onCreateLevel(b)),this._level=b,b}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var i,a,h=this._map.getZoom();if(h>this.options.maxZoom||h<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)a=this._tiles[i],a.retain=a.current;for(i in this._tiles)if(a=this._tiles[i],a.current&&!a.active){var b=a.coords;this._retainParent(b.x,b.y,b.z,b.z-5)||this._retainChildren(b.x,b.y,b.z,b.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var a in this._tiles)this._tiles[a].coords.z===i&&this._removeTile(a)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)fe(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,a,h,b){var T=Math.floor(i/2),z=Math.floor(a/2),Y=h-1,ut=new j(+T,+z);ut.z=+Y;var mt=this._tileCoordsToKey(ut),Ct=this._tiles[mt];return Ct&&Ct.active?(Ct.retain=!0,!0):(Ct&&Ct.loaded&&(Ct.retain=!0),Y>b?this._retainParent(T,z,Y,b):!1)},_retainChildren:function(i,a,h,b){for(var T=2*i;T<2*i+2;T++)for(var z=2*a;z<2*a+2;z++){var Y=new j(T,z);Y.z=h+1;var ut=this._tileCoordsToKey(Y),mt=this._tiles[ut];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);h+1<b&&this._retainChildren(T,z,h+1,b)}},_resetView:function(i){var a=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var a=this.options;return a.minNativeZoom!==void 0&&i<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<i?a.maxNativeZoom:i},_setView:function(i,a,h,b){var T=Math.round(a);this.options.maxZoom!==void 0&&T>this.options.maxZoom||this.options.minZoom!==void 0&&T<this.options.minZoom?T=void 0:T=this._clampZoom(T);var z=this.options.updateWhenZooming&&T!==this._tileZoom;(!b||z)&&(this._tileZoom=T,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),T!==void 0&&this._update(i),h||this._pruneTiles(),this._noPrune=!!h),this._setZoomTransforms(i,a)},_setZoomTransforms:function(i,a){for(var h in this._levels)this._setZoomTransform(this._levels[h],i,a)},_setZoomTransform:function(i,a,h){var b=this._map.getZoomScale(h,i.zoom),T=i.origin.multiplyBy(b).subtract(this._map._getNewPixelOrigin(a,h)).round();Wt.any3d?Bi(i.el,T,b):Ne(i.el,T)},_resetGrid:function(){var i=this._map,a=i.options.crs,h=this._tileSize=this.getTileSize(),b=this._tileZoom,T=this._map.getPixelWorldBounds(this._tileZoom);T&&(this._globalTileRange=this._pxBoundsToTileRange(T)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,a.wrapLng[0]],b).x/h.x),Math.ceil(i.project([0,a.wrapLng[1]],b).x/h.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([a.wrapLat[0],0],b).y/h.x),Math.ceil(i.project([a.wrapLat[1],0],b).y/h.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var a=this._map,h=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),b=a.getZoomScale(h,this._tileZoom),T=a.project(i,this._tileZoom).floor(),z=a.getSize().divideBy(b*2);return new q(T.subtract(z),T.add(z))},_update:function(i){var a=this._map;if(a){var h=this._clampZoom(a.getZoom());if(i===void 0&&(i=a.getCenter()),this._tileZoom!==void 0){var b=this._getTiledPixelBounds(i),T=this._pxBoundsToTileRange(b),z=T.getCenter(),Y=[],ut=this.options.keepBuffer,mt=new q(T.getBottomLeft().subtract([ut,-ut]),T.getTopRight().add([ut,-ut]));if(!(isFinite(T.min.x)&&isFinite(T.min.y)&&isFinite(T.max.x)&&isFinite(T.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Ct in this._tiles){var Bt=this._tiles[Ct].coords;(Bt.z!==this._tileZoom||!mt.contains(new j(Bt.x,Bt.y)))&&(this._tiles[Ct].current=!1)}if(Math.abs(h-this._tileZoom)>1){this._setView(i,h);return}for(var $t=T.min.y;$t<=T.max.y;$t++)for(var he=T.min.x;he<=T.max.x;he++){var an=new j(he,$t);if(an.z=this._tileZoom,!!this._isValidTile(an)){var Ge=this._tiles[this._tileCoordsToKey(an)];Ge?Ge.current=!0:Y.push(an)}}if(Y.sort(function(pn,gr){return pn.distanceTo(z)-gr.distanceTo(z)}),Y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Ln=document.createDocumentFragment();for(he=0;he<Y.length;he++)this._addTile(Y[he],Ln);this._level.el.appendChild(Ln)}}}},_isValidTile:function(i){var a=this._map.options.crs;if(!a.infinite){var h=this._globalTileRange;if(!a.wrapLng&&(i.x<h.min.x||i.x>h.max.x)||!a.wrapLat&&(i.y<h.min.y||i.y>h.max.y))return!1}if(!this.options.bounds)return!0;var b=this._tileCoordsToBounds(i);return J(this.options.bounds).overlaps(b)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var a=this._map,h=this.getTileSize(),b=i.scaleBy(h),T=b.add(h),z=a.unproject(b,i.z),Y=a.unproject(T,i.z);return[z,Y]},_tileCoordsToBounds:function(i){var a=this._tileCoordsToNwSe(i),h=new Lt(a[0],a[1]);return this.options.noWrap||(h=this._map.wrapLatLngBounds(h)),h},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var a=i.split(":"),h=new j(+a[0],+a[1]);return h.z=+a[2],h},_removeTile:function(i){var a=this._tiles[i];a&&(fe(a.el),delete this._tiles[i],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){Yt(i,"leaflet-tile");var a=this.getTileSize();i.style.width=a.x+"px",i.style.height=a.y+"px",i.onselectstart=p,i.onmousemove=p,Wt.ielt9&&this.options.opacity<1&&fn(i,this.options.opacity)},_addTile:function(i,a){var h=this._getTilePos(i),b=this._tileCoordsToKey(i),T=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(T),this.createTile.length<2&&W(l(this._tileReady,this,i,null,T)),Ne(T,h),this._tiles[b]={el:T,coords:i,current:!0},a.appendChild(T),this.fire("tileloadstart",{tile:T,coords:i})},_tileReady:function(i,a,h){a&&this.fire("tileerror",{error:a,tile:h,coords:i});var b=this._tileCoordsToKey(i);h=this._tiles[b],h&&(h.loaded=+new Date,this._map._fadeAnimated?(fn(h.el,0),k(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this)):(h.active=!0,this._pruneTiles()),a||(Yt(h.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:h.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Wt.ielt9||!this._map._fadeAnimated?W(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var a=new j(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return a.z=i.z,a},_pxBoundsToTileRange:function(i){var a=this.getTileSize();return new q(i.min.unscaleBy(a).floor(),i.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function gp(i){return new ms(i)}var mr=ms.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,a){this._url=i,a=y(this,a),a.detectRetina&&Wt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,a){return this._url===i&&a===void 0&&(a=!0),this._url=i,a||this.redraw(),this},createTile:function(i,a){var h=document.createElement("img");return se(h,"load",l(this._tileOnLoad,this,a,h)),se(h,"error",l(this._tileOnError,this,a,h)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(h.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(h.referrerPolicy=this.options.referrerPolicy),h.alt="",h.src=this.getTileUrl(i),h},getTileUrl:function(i){var a={r:Wt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var h=this._globalTileRange.max.y-i.y;this.options.tms&&(a.y=h),a["-y"]=h}return S(this._url,s(a,this.options))},_tileOnLoad:function(i,a){Wt.ielt9?setTimeout(l(i,this,null,a),0):i(null,a)},_tileOnError:function(i,a,h){var b=this.options.errorTileUrl;b&&a.getAttribute("src")!==b&&(a.src=b),i(h,a)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,a=this.options.maxZoom,h=this.options.zoomReverse,b=this.options.zoomOffset;return h&&(i=a-i),i+b},_getSubdomain:function(i){var a=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var i,a;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(a=this._tiles[i].el,a.onload=p,a.onerror=p,!a.complete)){a.src=N;var h=this._tiles[i].coords;fe(a),delete this._tiles[i],this.fire("tileabort",{tile:a,coords:h})}},_removeTile:function(i){var a=this._tiles[i];if(a)return a.el.setAttribute("src",N),ms.prototype._removeTile.call(this,i)},_tileReady:function(i,a,h){if(!(!this._map||h&&h.getAttribute("src")===N))return ms.prototype._tileReady.call(this,i,a,h)}});function Xc(i,a){return new mr(i,a)}var qc=mr.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,a){this._url=i;var h=s({},this.defaultWmsParams);for(var b in a)b in this.options||(h[b]=a[b]);a=y(this,a);var T=a.detectRetina&&Wt.retina?2:1,z=this.getTileSize();h.width=z.x*T,h.height=z.y*T,this.wmsParams=h},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,mr.prototype.onAdd.call(this,i)},getTileUrl:function(i){var a=this._tileCoordsToNwSe(i),h=this._crs,b=tt(h.project(a[0]),h.project(a[1])),T=b.min,z=b.max,Y=(this._wmsVersion>=1.3&&this._crs===Bc?[T.y,T.x,z.y,z.x]:[T.x,T.y,z.x,z.y]).join(","),ut=mr.prototype.getTileUrl.call(this,i);return ut+g(this.wmsParams,ut,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+Y},setParams:function(i,a){return s(this.wmsParams,i),a||this.redraw(),this}});function _p(i,a){return new qc(i,a)}mr.WMS=qc,Xc.wms=_p;var oi=Nn.extend({options:{padding:.1},initialize:function(i){y(this,i),u(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Yt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,a){var h=this._map.getZoomScale(a,this._zoom),b=this._map.getSize().multiplyBy(.5+this.options.padding),T=this._map.project(this._center,a),z=b.multiplyBy(-h).add(T).subtract(this._map._getNewPixelOrigin(i,a));Wt.any3d?Bi(this._container,z,h):Ne(this._container,z)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,a=this._map.getSize(),h=this._map.containerPointToLayerPoint(a.multiplyBy(-i)).round();this._bounds=new q(h,h.add(a.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),jc=oi.extend({options:{tolerance:0},getEvents:function(){var i=oi.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){oi.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");se(i,"mousemove",this._onMouseMove,this),se(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),se(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){k(this._redrawRequest),delete this._ctx,fe(this._container),ye(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var a in this._layers)i=this._layers[a],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){oi.prototype._update.call(this);var i=this._bounds,a=this._container,h=i.getSize(),b=Wt.retina?2:1;Ne(a,i.min),a.width=b*h.x,a.height=b*h.y,a.style.width=h.x+"px",a.style.height=h.y+"px",Wt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){oi.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[u(i)]=i;var a=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var a=i._order,h=a.next,b=a.prev;h?h.prev=b:this._drawLast=b,b?b.next=h:this._drawFirst=h,delete i._order,delete this._layers[u(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var a=i.options.dashArray.split(/[, ]+/),h=[],b,T;for(T=0;T<a.length;T++){if(b=Number(a[T]),isNaN(b))return;h.push(b)}i.options._dashArray=h}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||W(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var a=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(i._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(i._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var a=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,a=this._redrawBounds;if(this._ctx.save(),a){var h=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,h.x,h.y),this._ctx.clip()}this._drawing=!0;for(var b=this._drawFirst;b;b=b.next)i=b.layer,(!a||i._pxBounds&&i._pxBounds.intersects(a))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,a){if(this._drawing){var h,b,T,z,Y=i._parts,ut=Y.length,mt=this._ctx;if(ut){for(mt.beginPath(),h=0;h<ut;h++){for(b=0,T=Y[h].length;b<T;b++)z=Y[h][b],mt[b?"lineTo":"moveTo"](z.x,z.y);a&&mt.closePath()}this._fillStroke(mt,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var a=i._point,h=this._ctx,b=Math.max(Math.round(i._radius),1),T=(Math.max(Math.round(i._radiusY),1)||b)/b;T!==1&&(h.save(),h.scale(1,T)),h.beginPath(),h.arc(a.x,a.y/T,b,0,Math.PI*2,!1),T!==1&&h.restore(),this._fillStroke(h,i)}},_fillStroke:function(i,a){var h=a.options;h.fill&&(i.globalAlpha=h.fillOpacity,i.fillStyle=h.fillColor||h.color,i.fill(h.fillRule||"evenodd")),h.stroke&&h.weight!==0&&(i.setLineDash&&i.setLineDash(a.options&&a.options._dashArray||[]),i.globalAlpha=h.opacity,i.lineWidth=h.weight,i.strokeStyle=h.color,i.lineCap=h.lineCap,i.lineJoin=h.lineJoin,i.stroke())},_onClick:function(i){for(var a=this._map.mouseEventToLayerPoint(i),h,b,T=this._drawFirst;T;T=T.next)h=T.layer,h.options.interactive&&h._containsPoint(a)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(h))&&(b=h);this._fireEvent(b?[b]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,a)}},_handleMouseOut:function(i){var a=this._hoveredLayer;a&&(xe(this._container,"leaflet-interactive"),this._fireEvent([a],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,a){if(!this._mouseHoverThrottled){for(var h,b,T=this._drawFirst;T;T=T.next)h=T.layer,h.options.interactive&&h._containsPoint(a)&&(b=h);b!==this._hoveredLayer&&(this._handleMouseOut(i),b&&(Yt(this._container,"leaflet-interactive"),this._fireEvent([b],i,"mouseover"),this._hoveredLayer=b)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,a,h){this._map._fireDOMEvent(a,h||a.type,i)},_bringToFront:function(i){var a=i._order;if(a){var h=a.next,b=a.prev;if(h)h.prev=b;else return;b?b.next=h:h&&(this._drawFirst=h),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(i)}},_bringToBack:function(i){var a=i._order;if(a){var h=a.next,b=a.prev;if(b)b.next=h;else return;h?h.prev=b:b&&(this._drawLast=b),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(i)}}});function Yc(i){return Wt.canvas?new jc(i):null}var gs=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),vp={_initContainer:function(){this._container=Xt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(oi.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var a=i._container=gs("shape");Yt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",i._path=gs("path"),a.appendChild(i._path),this._updateStyle(i),this._layers[u(i)]=i},_addPath:function(i){var a=i._container;this._container.appendChild(a),i.options.interactive&&i.addInteractiveTarget(a)},_removePath:function(i){var a=i._container;fe(a),i.removeInteractiveTarget(a),delete this._layers[u(i)]},_updateStyle:function(i){var a=i._stroke,h=i._fill,b=i.options,T=i._container;T.stroked=!!b.stroke,T.filled=!!b.fill,b.stroke?(a||(a=i._stroke=gs("stroke")),T.appendChild(a),a.weight=b.weight+"px",a.color=b.color,a.opacity=b.opacity,b.dashArray?a.dashStyle=M(b.dashArray)?b.dashArray.join(" "):b.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=b.lineCap.replace("butt","flat"),a.joinstyle=b.lineJoin):a&&(T.removeChild(a),i._stroke=null),b.fill?(h||(h=i._fill=gs("fill")),T.appendChild(h),h.color=b.fillColor||b.color,h.opacity=b.fillOpacity):h&&(T.removeChild(h),i._fill=null)},_updateCircle:function(i){var a=i._point.round(),h=Math.round(i._radius),b=Math.round(i._radiusY||h);this._setPath(i,i._empty()?"M0 0":"AL "+a.x+","+a.y+" "+h+","+b+" 0,"+65535*360)},_setPath:function(i,a){i._path.v=a},_bringToFront:function(i){An(i._container)},_bringToBack:function(i){qn(i._container)}},ho=Wt.vml?gs:et,_s=oi.extend({_initContainer:function(){this._container=ho("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=ho("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){fe(this._container),ye(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){oi.prototype._update.call(this);var i=this._bounds,a=i.getSize(),h=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,h.setAttribute("width",a.x),h.setAttribute("height",a.y)),Ne(h,i.min),h.setAttribute("viewBox",[i.min.x,i.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(i){var a=i._path=ho("path");i.options.className&&Yt(a,i.options.className),i.options.interactive&&Yt(a,"leaflet-interactive"),this._updateStyle(i),this._layers[u(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){fe(i._path),i.removeInteractiveTarget(i._path),delete this._layers[u(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var a=i._path,h=i.options;a&&(h.stroke?(a.setAttribute("stroke",h.color),a.setAttribute("stroke-opacity",h.opacity),a.setAttribute("stroke-width",h.weight),a.setAttribute("stroke-linecap",h.lineCap),a.setAttribute("stroke-linejoin",h.lineJoin),h.dashArray?a.setAttribute("stroke-dasharray",h.dashArray):a.removeAttribute("stroke-dasharray"),h.dashOffset?a.setAttribute("stroke-dashoffset",h.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),h.fill?(a.setAttribute("fill",h.fillColor||h.color),a.setAttribute("fill-opacity",h.fillOpacity),a.setAttribute("fill-rule",h.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(i,a){this._setPath(i,$(i._parts,a))},_updateCircle:function(i){var a=i._point,h=Math.max(Math.round(i._radius),1),b=Math.max(Math.round(i._radiusY),1)||h,T="a"+h+","+b+" 0 1,0 ",z=i._empty()?"M0 0":"M"+(a.x-h)+","+a.y+T+h*2+",0 "+T+-h*2+",0 ";this._setPath(i,z)},_setPath:function(i,a){i._path.setAttribute("d",a)},_bringToFront:function(i){An(i._path)},_bringToBack:function(i){qn(i._path)}});Wt.vml&&_s.include(vp);function $c(i){return Wt.svg||Wt.vml?new _s(i):null}de.include({getRenderer:function(i){var a=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var a=this._paneRenderers[i];return a===void 0&&(a=this._createRenderer({pane:i}),this._paneRenderers[i]=a),a},_createRenderer:function(i){return this.options.preferCanvas&&Yc(i)||$c(i)}});var Kc=fr.extend({initialize:function(i,a){fr.prototype.initialize.call(this,this._boundsToLatLngs(i),a)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=J(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function yp(i,a){return new Kc(i,a)}_s.create=ho,_s.pointsToPath=$,si.geometryToLayer=ro,si.coordsToLatLng=Ba,si.coordsToLatLngs=so,si.latLngToCoords=Fa,si.latLngsToCoords=oo,si.getFeature=pr,si.asFeature=ao,de.mergeOptions({boxZoom:!0});var Jc=Yn.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){se(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){ye(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){fe(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),ls(),wa(),this._startPoint=this._map.mouseEventToContainerPoint(i),se(document,{contextmenu:Vi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Xt("div","leaflet-zoom-box",this._container),Yt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var a=new q(this._point,this._startPoint),h=a.getSize();Ne(this._box,a.min),this._box.style.width=h.x+"px",this._box.style.height=h.y+"px"},_finish:function(){this._moved&&(fe(this._box),xe(this._container,"leaflet-crosshair")),cs(),Ma(),ye(document,{contextmenu:Vi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new Lt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});de.addInitHook("addHandler","boxZoom",Jc),de.mergeOptions({doubleClickZoom:!0});var Qc=Yn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var a=this._map,h=a.getZoom(),b=a.options.zoomDelta,T=i.originalEvent.shiftKey?h-b:h+b;a.options.doubleClickZoom==="center"?a.setZoom(T):a.setZoomAround(i.containerPoint,T)}});de.addInitHook("addHandler","doubleClickZoom",Qc),de.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var tu=Yn.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new yi(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}Yt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){xe(this._map._container,"leaflet-grab"),xe(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=J(this._map.options.maxBounds);this._offsetLimit=tt(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var a=this._lastTime=+new Date,h=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(h),this._times.push(a),this._prunePositions(a)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,a){return i-(i-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;i.x<a.min.x&&(i.x=this._viscousLimit(i.x,a.min.x)),i.y<a.min.y&&(i.y=this._viscousLimit(i.y,a.min.y)),i.x>a.max.x&&(i.x=this._viscousLimit(i.x,a.max.x)),i.y>a.max.y&&(i.y=this._viscousLimit(i.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,a=Math.round(i/2),h=this._initialWorldOffset,b=this._draggable._newPos.x,T=(b-a+h)%i+a-h,z=(b+a+h)%i-a-h,Y=Math.abs(T+h)<Math.abs(z+h)?T:z;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=Y},_onDragEnd:function(i){var a=this._map,h=a.options,b=!h.inertia||i.noInertia||this._times.length<2;if(a.fire("dragend",i),b)a.fire("moveend");else{this._prunePositions(+new Date);var T=this._lastPos.subtract(this._positions[0]),z=(this._lastTime-this._times[0])/1e3,Y=h.easeLinearity,ut=T.multiplyBy(Y/z),mt=ut.distanceTo([0,0]),Ct=Math.min(h.inertiaMaxSpeed,mt),Bt=ut.multiplyBy(Ct/mt),$t=Ct/(h.inertiaDeceleration*Y),he=Bt.multiplyBy(-$t/2).round();!he.x&&!he.y?a.fire("moveend"):(he=a._limitOffset(he,a.options.maxBounds),W(function(){a.panBy(he,{duration:$t,easeLinearity:Y,noMoveStart:!0,animate:!0})}))}}});de.addInitHook("addHandler","dragging",tu),de.mergeOptions({keyboard:!0,keyboardPanDelta:80});var eu=Yn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),se(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),ye(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,a=document.documentElement,h=i.scrollTop||a.scrollTop,b=i.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(b,h)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var a=this._panKeys={},h=this.keyCodes,b,T;for(b=0,T=h.left.length;b<T;b++)a[h.left[b]]=[-1*i,0];for(b=0,T=h.right.length;b<T;b++)a[h.right[b]]=[i,0];for(b=0,T=h.down.length;b<T;b++)a[h.down[b]]=[0,i];for(b=0,T=h.up.length;b<T;b++)a[h.up[b]]=[0,-1*i]},_setZoomDelta:function(i){var a=this._zoomKeys={},h=this.keyCodes,b,T;for(b=0,T=h.zoomIn.length;b<T;b++)a[h.zoomIn[b]]=i;for(b=0,T=h.zoomOut.length;b<T;b++)a[h.zoomOut[b]]=-i},_addHooks:function(){se(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){ye(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var a=i.keyCode,h=this._map,b;if(a in this._panKeys){if(!h._panAnim||!h._panAnim._inProgress)if(b=this._panKeys[a],i.shiftKey&&(b=at(b).multiplyBy(3)),h.options.maxBounds&&(b=h._limitOffset(at(b),h.options.maxBounds)),h.options.worldCopyJump){var T=h.wrapLatLng(h.unproject(h.project(h.getCenter()).add(b)));h.panTo(T)}else h.panBy(b)}else if(a in this._zoomKeys)h.setZoom(h.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&h._popup&&h._popup.options.closeOnEscapeKey)h.closePopup();else return;Vi(i)}}});de.addInitHook("addHandler","keyboard",eu),de.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var nu=Yn.extend({addHooks:function(){se(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){ye(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var a=Tc(i),h=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var b=Math.max(h-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),b),Vi(i)},_performZoom:function(){var i=this._map,a=i.getZoom(),h=this._map.options.zoomSnap||0;i._stop();var b=this._delta/(this._map.options.wheelPxPerZoomLevel*4),T=4*Math.log(2/(1+Math.exp(-Math.abs(b))))/Math.LN2,z=h?Math.ceil(T/h)*h:T,Y=i._limitZoom(a+(this._delta>0?z:-z))-a;this._delta=0,this._startTime=null,Y&&(i.options.scrollWheelZoom==="center"?i.setZoom(a+Y):i.setZoomAround(this._lastMousePos,a+Y))}});de.addInitHook("addHandler","scrollWheelZoom",nu);var xp=600;de.mergeOptions({tapHold:Wt.touchNative&&Wt.safari&&Wt.mobile,tapTolerance:15});var iu=Yn.extend({addHooks:function(){se(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){ye(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var a=i.touches[0];this._startPos=this._newPos=new j(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(se(document,"touchend",Ye),se(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),xp),se(document,"touchend touchcancel contextmenu",this._cancel,this),se(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){ye(document,"touchend",Ye),ye(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),ye(document,"touchend touchcancel contextmenu",this._cancel,this),ye(document,"touchmove",this._onMove,this)},_onMove:function(i){var a=i.touches[0];this._newPos=new j(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,a){var h=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});h._simulated=!0,a.target.dispatchEvent(h)}});de.addInitHook("addHandler","tapHold",iu),de.mergeOptions({touchZoom:Wt.touch,bounceAtZoomLimits:!0});var ru=Yn.extend({addHooks:function(){Yt(this._map._container,"leaflet-touch-zoom"),se(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){xe(this._map._container,"leaflet-touch-zoom"),ye(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var a=this._map;if(!(!i.touches||i.touches.length!==2||a._animatingZoom||this._zooming)){var h=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(h.add(b)._divideBy(2))),this._startDist=h.distanceTo(b),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),se(document,"touchmove",this._onTouchMove,this),se(document,"touchend touchcancel",this._onTouchEnd,this),Ye(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var a=this._map,h=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]),T=h.distanceTo(b)/this._startDist;if(this._zoom=a.getScaleZoom(T,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&T<1||this._zoom>a.getMaxZoom()&&T>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,T===1)return}else{var z=h._add(b)._divideBy(2)._subtract(this._centerPoint);if(T===1&&z.x===0&&z.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(z),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),k(this._animRequest);var Y=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=W(Y,this,!0),Ye(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,k(this._animRequest),ye(document,"touchmove",this._onTouchMove,this),ye(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});de.addInitHook("addHandler","touchZoom",ru),de.BoxZoom=Jc,de.DoubleClickZoom=Qc,de.Drag=tu,de.Keyboard=eu,de.ScrollWheelZoom=nu,de.TapHold=iu,de.TouchZoom=ru,e.Bounds=q,e.Browser=Wt,e.CRS=St,e.Canvas=jc,e.Circle=za,e.CircleMarker=io,e.Class=C,e.Control=Dn,e.DivIcon=Zc,e.DivOverlay=$n,e.DomEvent=zf,e.DomUtil=Uf,e.Draggable=yi,e.Evented=ot,e.FeatureGroup=ii,e.GeoJSON=si,e.GridLayer=ms,e.Handler=Yn,e.Icon=dr,e.ImageOverlay=lo,e.LatLng=nt,e.LatLngBounds=Lt,e.Layer=Nn,e.LayerGroup=hr,e.LineUtil=Kf,e.Map=de,e.Marker=no,e.Mixin=Zf,e.Path=xi,e.Point=j,e.PolyUtil=Xf,e.Polygon=fr,e.Polyline=ri,e.Popup=co,e.PosAnimation=Ac,e.Projection=Jf,e.Rectangle=Kc,e.Renderer=oi,e.SVG=_s,e.SVGOverlay=Wc,e.TileLayer=mr,e.Tooltip=uo,e.Transformation=st,e.Util=F,e.VideoOverlay=Gc,e.bind=l,e.bounds=tt,e.canvas=Yc,e.circle=op,e.circleMarker=sp,e.control=ds,e.divIcon=mp,e.extend=s,e.featureGroup=np,e.geoJSON=Vc,e.geoJson=cp,e.gridLayer=gp,e.icon=ip,e.imageOverlay=up,e.latLng=wt,e.latLngBounds=J,e.layerGroup=ep,e.map=Bf,e.marker=rp,e.point=at,e.polygon=lp,e.polyline=ap,e.popup=fp,e.rectangle=yp,e.setOptions=y,e.stamp=u,e.svg=$c,e.svgOverlay=dp,e.tileLayer=Xc,e.tooltip=pp,e.transformation=vt,e.version=n,e.videoOverlay=hp;var bp=window.L;e.noConflict=function(){return window.L=bp,this},window.L=e})})(Ul,Ul.exports);var Rp=Ul.exports;const we=od(Rp),bt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function ad(){const r=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:r("c-base")||"#eeebe6",terrainRes:Number(r("t-res"))||128,exag:Number(r("dp-exag")||r("t-exag"))||1,smooth:Number(r("t-smooth"))||1,baseH:Number(r("dp-base")||r("t-base-h"))||5,maxDim:Number(r("t-maxdim"))||200,elevZoom:Number(r("t-zoom"))||15,waterOn:t("water-on"),waterCol:r("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:r("road-col")||"#262626",buildOn:t("build-on"),buildCol:r("build-col")||"#9090a0",buildHS:Number(r("build-hs"))||1,gpxCol:r("gpx-col")||"#ff4500",gpxH:Number(r("gpx-h"))||1.2,gpxMW:Number(r("gpx-mw"))||1.5,gpxTW:Number(r("gpx-tw"))||3}}let Ws=null,Gt,Xe=null,En=null,mi=null,Re=null,Pe=null,Rn=[],$e=[],Ze=null,un=null,vs=null,Vr="none",_r=[];const Ip={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function Dp(r){r&&(Ws=r);const t=we.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=we.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=we.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),s=we.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),o=we.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Gt=we.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),we.control.zoom({position:"topright"}).addTo(Gt),we.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:s,Voyager:o,"IGN (France)":n},{},{position:"topright"}).addTo(Gt),new ResizeObserver(()=>Gt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Gt.invalidateSize(),300),Bp(),Up(),Fp(),Hp(),zp()}function lu(r,t){return[[r.lat,r.lng],[r.lat,t.lng],[t.lat,t.lng],[t.lat,r.lng]]}function cu(r,t){const e=(r.lat+t.lat)/2,n=Math.abs(t.lat-r.lat)*111320,s=Math.abs(t.lng-r.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),u=Math.min(r.lat,t.lat),d=Math.min(r.lng,t.lng);return[[u,d],[u,d+c],[u+l,d+c],[u+l,d]]}function uu(r,t,e=80){const n=r.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[r.lat+n*Math.cos(l)/111320,r.lng+n*Math.sin(l)/(111320*Math.cos(r.lat*Math.PI/180))]})}function hu(r,t){const e=r.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[r.lat+e*Math.cos(o)/111320,r.lng+e*Math.sin(o)/(111320*Math.cos(r.lat*Math.PI/180))]})}function ld(r){Re&&Re!==r&&(Pe=null,Rn=[],$e=[],Ze&&(Gt.removeLayer(Ze),Ze=null),un&&(Gt.removeLayer(un),un=null)),Re=r,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===r)}),Gt.getContainer().classList.toggle("dm",!!r);const t=document.getElementById("dch");t.style.display=r?"block":"none",r&&(t.textContent=Ip[r]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=r==="trace"?"block":"none",r!=="trace"&&(e.textContent="0 points tracés"),!r){const n=document.getElementById("snap");n&&(n.style.display="none")}}function jo(r=!0){Ze&&(Gt.removeLayer(Ze),Ze=null),un&&(Gt.removeLayer(un),un=null),Pe=null,Rn=[],$e=[],r&&ld(null)}function Yo(r,t){return t?Gt.latLngToContainerPoint(r).distanceTo(Gt.latLngToContainerPoint(t)):9999}function du(r){const t=[];Rn.length>2&&t.push(Rn[0]),$e.length>2&&t.push($e[0]),mi&&t.push(mi.getLatLng());let e=null,n=9999;for(const s of t){const o=Yo(r,s);o<18&&o<n&&(n=o,e=s)}return e}function Np(r,t){const e=document.getElementById("snap");if(!e)return;if(!t||Yo(r,t)>18){e.style.display="none";return}const n=Gt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function Op(){document.getElementById("zone-controls")?.classList.add("visible"),kl()}function cd(){document.getElementById("zone-controls")?.classList.remove("visible"),ud("none")}function kl(){if(!bt.bounds)return;const r=document.getElementById("zone-controls");if(!r)return;const t=we.latLng(bt.bounds.maxLat,bt.bounds.maxLon),e=Gt.latLngToContainerPoint(t),n=40;r.style.left=e.x+10+"px",r.style.top=Math.max(10,e.y-n/2)+"px"}function ud(r){Vr==="move"&&r!=="move"&&(Gt.dragging.enable(),Gt.getContainer().style.cursor=""),Vr=r,document.getElementById("zc-move")?.classList.toggle("active",r==="move"),r==="move"&&(Gt.dragging.disable(),Gt.getContainer().style.cursor="grab")}function hd(r){Xe&&(Gt.removeLayer(Xe),Xe=null),Xe=we.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const t=r.map(u=>u[0]),e=r.map(u=>u[1]);bt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(bt.bounds.minLat+bt.bounds.maxLat)/2,s=(bt.bounds.maxLon-bt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,o=(bt.bounds.maxLat-bt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(o,s);bt.wMm=Math.round(s*c),bt.dMm=Math.round(o*c),Ws?.()}function fu(r){if(!bt.zonePts)return;const t=bt.zonePts.map(l=>l[0]),e=bt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,s=(Math.min(...e)+Math.max(...e))/2,o=bt.zonePts.map(([l,c])=>[n+(l-n)*r,s+(c-s)*r]);bt.zonePts=o,hd(o)}function Up(){document.getElementById("zc-delete")?.addEventListener("click",()=>{Xe&&(Gt.removeLayer(Xe),Xe=null),bt.bounds=null,bt.zonePts=null,cd(),Ws?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>fu(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>fu(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{ud(Vr==="move"?"none":"move")});let r=null;Gt.getContainer().addEventListener("mousedown",t=>{Vr!=="move"||!bt.zonePts||(r={x:t.clientX,y:t.clientY},_r=bt.zonePts.map(e=>[e[0],e[1]]),Gt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(Vr!=="move"||!r||!_r.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(we.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(we.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=_r.map(([u,d])=>[u+o,d+l]);Xe&&(Gt.removeLayer(Xe),Xe=null),Xe=we.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt)}),document.addEventListener("mouseup",t=>{if(Vr!=="move"||!r||!_r.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(we.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(we.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=_r.map(([u,d])=>[u+o,d+l]);r=null,_r=[],bt.zonePts=c,hd(c),kl(),Gt.getContainer().style.cursor="grab"}),Gt.on("move zoom moveend zoomend",kl)}function ys(r,t){Xe&&(Gt.removeLayer(Xe),Xe=null),Xe=we.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const e=r.map(d=>d[0]),n=r.map(d=>d[1]);bt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},bt.zonePts=r,bt.zoneType=t;const s=(bt.bounds.minLat+bt.bounds.maxLat)/2,o=(bt.bounds.maxLon-bt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(bt.bounds.maxLat-bt.bounds.minLat)*111320,u=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);bt.realW=o,bt.realH=l,bt.wMm=Math.round(o*u),bt.dMm=Math.round(l*u),Ws?.(),Op(),jo()}function kp(){En&&(Gt.removeLayer(En),En=null),!($e.length<2)&&(En=we.polyline($e,{color:"#ff0000",weight:4,opacity:.9}).addTo(Gt))}function pu(r){const t=document.getElementById("snap");if(t&&(t.style.display="none"),un&&(Gt.removeLayer(un),un=null),r.length<2){jo();return}bt.gpxPoints=r.map(n=>({lat:n.lat,lon:n.lng})),dd(),fd(`✏️ ${r.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),jo()}function dd(){En&&(Gt.removeLayer(En),En=null),!(bt.gpxPoints.length<2)&&(En=we.polyline(bt.gpxPoints.map(r=>[r.lat,r.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Gt))}function fd(r){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=r,t.style.display="block")}function zp(){Gt.on("mousemove",r=>{if(!Re)return;const t=r.latlng,e=du(t);Np(t,e??Pe);const n=e??t;if((Re==="rect"||Re==="sq")&&Pe){const s=Re==="sq"?cu(Pe,n):lu(Pe,n);Ze?Ze.setLatLngs(s):Ze=we.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Gt)}else if((Re==="circ"||Re==="hex")&&Pe){const s=Re==="circ"?uu(Pe,n):hu(Pe,n);Ze?Ze.setLatLngs(s):Ze=we.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Gt)}else if(Re==="poly"&&Rn.length>0){const s=[...Rn,n];Ze?Ze.setLatLngs(s):Ze=we.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Gt)}else if(Re==="trace"&&$e.length>0){const s=[...$e,n];Ze?Ze.setLatLngs(s):Ze=we.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Gt)}}),Gt.on("click",r=>{if(!Re)return;const t=r.latlng,e=du(t),n=e??t;if(Re==="rect"){if(!Pe){Pe=n;return}ys(lu(Pe,n),"rect")}else if(Re==="sq"){if(!Pe){Pe=n;return}ys(cu(Pe,n),"rect")}else if(Re==="circ"){if(!Pe){Pe=n;return}ys(uu(Pe,n),"circ")}else if(Re==="hex"){if(!Pe){Pe=n;return}ys(hu(Pe,n),"hex")}else if(Re==="poly"){if(Rn.length>2&&Yo(t,Rn[0])<18){ys(Rn.map(s=>[s.lat,s.lng]),"poly");return}Rn.push(n),Rn.length===1&&(un&&Gt.removeLayer(un),un=we.circleMarker(Rn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt))}else Re==="trace"&&(vs&&clearTimeout(vs),vs=setTimeout(()=>{if($e.length>2&&Yo(t,$e[0])<18){pu($e);return}$e.push(e??t);const s=$e.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(un&&Gt.removeLayer(un),un=we.circleMarker($e[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt)),kp()},220))}),Gt.on("dblclick",r=>{Re==="trace"&&$e.length>=2&&(vs&&clearTimeout(vs),pu($e),r.originalEvent.preventDefault())})}function Bp(){["rect","sq","circ","hex","poly","trace"].forEach(r=>{document.getElementById("db-"+r)?.addEventListener("click",()=>{ld(Re===r?null:r)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{jo(),Xe&&(Gt.removeLayer(Xe),Xe=null),En&&(Gt.removeLayer(En),En=null),mi&&(Gt.removeLayer(mi),mi=null),bt.bounds=null,bt.zonePts=null,bt.gpxPoints=[],$e=[],cd();const r=document.getElementById("gpx-badge");r&&(r.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),Ws?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!bt.bounds)return;const r=bt.bounds;Gt.fitBounds([[r.minLat,r.minLon],[r.maxLat,r.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!bt.gpxPoints.length)return;const r=bt.gpxPoints.map(e=>e.lat),t=bt.gpxPoints.map(e=>e.lon);Gt.fitBounds([[Math.min(...r),Math.min(...t)],[Math.max(...r),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function Fp(){document.getElementById("gpx-file")?.addEventListener("change",function(){const r=this.files?.[0];if(!r)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(u=>({lat:parseFloat(u.getAttribute("lat")),lon:parseFloat(u.getAttribute("lon"))})).filter(u=>!isNaN(u.lat)&&!isNaN(u.lon));if(!o.length)return;bt.gpxPoints=o,dd(),En&&Gt.fitBounds(En.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let u=1;u<o.length;u++){const f=(o[u].lat-o[u-1].lat)*Math.PI/180,p=(o[u].lon-o[u-1].lon)*Math.PI/180,v=Math.sin(f/2)**2+Math.cos(o[u-1].lat*Math.PI/180)*Math.cos(o[u].lat*Math.PI/180)*Math.sin(p/2)**2;l+=6371*2*Math.atan2(Math.sqrt(v),Math.sqrt(1-v))}fd(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(r)})}let mu;function Hp(){const r=document.getElementById("srch-input"),t=document.getElementById("srch-drop");r?.addEventListener("input",function(){clearTimeout(mu);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(mu=setTimeout(()=>Vp(e),120))}),r?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function Vp(r){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),u=this.dataset.bb.split(",").map(Number);mi&&(Gt.removeLayer(mi),mi=null),mi=we.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Gt),Gt.fitBounds([[u[0],u[2]],[u[1],u[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ic="163",vr={ROTATE:0,DOLLY:1,PAN:2},yr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Gp=0,gu=1,Wp=2,pd=1,Zp=2,fi=3,Ni=0,vn=1,gn=2,Ri=0,qr=1,_u=2,vu=3,yu=4,Xp=5,Ki=100,qp=101,jp=102,Yp=103,$p=104,Kp=200,Jp=201,Qp=202,tm=203,zl=204,Bl=205,em=206,nm=207,im=208,rm=209,sm=210,om=211,am=212,lm=213,cm=214,um=0,hm=1,dm=2,$o=3,fm=4,pm=5,mm=6,gm=7,rc=0,_m=1,vm=2,Ii=0,md=1,ym=2,xm=3,bm=4,wm=5,Mm=6,Sm=7,gd=300,Jr=301,Qr=302,Fl=303,Hl=304,ha=306,Vl=1e3,er=1001,Gl=1002,In=1003,Em=1004,po=1005,Fn=1006,Wa=1007,nr=1008,Di=1009,Tm=1010,Am=1011,_d=1012,vd=1013,ts=1014,Pi=1015,Ko=1016,yd=1017,xd=1018,Zs=1020,Cm=35902,Lm=1021,Pm=1022,ti=1023,Rm=1024,Im=1025,jr=1026,Bs=1027,Dm=1028,bd=1029,Nm=1030,wd=1031,Md=1033,Za=33776,Xa=33777,qa=33778,ja=33779,xu=35840,bu=35841,wu=35842,Mu=35843,Sd=36196,Su=37492,Eu=37496,Tu=37808,Au=37809,Cu=37810,Lu=37811,Pu=37812,Ru=37813,Iu=37814,Du=37815,Nu=37816,Ou=37817,Uu=37818,ku=37819,zu=37820,Bu=37821,Ya=36492,Fu=36494,Hu=36495,Om=36283,Vu=36284,Gu=36285,Wu=36286,Um=3200,km=3201,sc=0,zm=1,Li="",Kn="srgb",Ui="srgb-linear",oc="display-p3",da="display-p3-linear",Jo="linear",be="srgb",Qo="rec709",ta="p3",xr=7680,Zu=519,Bm=512,Fm=513,Hm=514,Ed=515,Vm=516,Gm=517,Wm=518,Zm=519,Xu=35044,qu="300 es",gi=2e3,ea=2001;class lr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ds=Math.PI/180,Wl=180/Math.PI;function ns(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qe[r&255]+Qe[r>>8&255]+Qe[r>>16&255]+Qe[r>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]).toLowerCase()}function qe(r,t,e){return Math.max(t,Math.min(e,r))}function Xm(r,t){return(r%t+t)%t}function $a(r,t,e){return(1-e)*r+e*t}function xs(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function mn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const qm={DEG2RAD:Ds};class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,e,n,s,o,l,c,u,d){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,d)}set(t,e,n,s,o,l,c,u,d){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=u,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],u=n[6],d=n[1],f=n[4],p=n[7],v=n[2],m=n[5],x=n[8],y=s[0],g=s[3],_=s[6],S=s[1],M=s[4],P=s[7],N=s[2],O=s[5],U=s[8];return o[0]=l*y+c*S+u*N,o[3]=l*g+c*M+u*O,o[6]=l*_+c*P+u*U,o[1]=d*y+f*S+p*N,o[4]=d*g+f*M+p*O,o[7]=d*_+f*P+p*U,o[2]=v*y+m*S+x*N,o[5]=v*g+m*M+x*O,o[8]=v*_+m*P+x*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*o*f+n*c*u+s*o*d-s*l*u}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8],p=f*l-c*d,v=c*u-f*o,m=d*o-l*u,x=e*p+n*v+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return t[0]=p*y,t[1]=(s*d-f*n)*y,t[2]=(c*n-s*l)*y,t[3]=v*y,t[4]=(f*e-s*u)*y,t[5]=(s*o-c*e)*y,t[6]=m*y,t[7]=(n*u-d*e)*y,t[8]=(l*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const u=Math.cos(o),d=Math.sin(o);return this.set(n*u,n*d,-n*(u*l+d*c)+l+t,-s*d,s*u,-s*(-d*l+u*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(Ka.makeScale(t,e)),this}rotate(t){return this.premultiply(Ka.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ka.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ka=new ce;function Td(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function na(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function jm(){const r=na("canvas");return r.style.display="block",r}const ju={};function Ym(r){r in ju||(ju[r]=!0,console.warn(r))}const Yu=new ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),$u=new ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),mo={[Ui]:{transfer:Jo,primaries:Qo,toReference:r=>r,fromReference:r=>r},[Kn]:{transfer:be,primaries:Qo,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[da]:{transfer:Jo,primaries:ta,toReference:r=>r.applyMatrix3($u),fromReference:r=>r.applyMatrix3(Yu)},[oc]:{transfer:be,primaries:ta,toReference:r=>r.convertSRGBToLinear().applyMatrix3($u),fromReference:r=>r.applyMatrix3(Yu).convertLinearToSRGB()}},$m=new Set([Ui,da]),ge={enabled:!0,_workingColorSpace:Ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!$m.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=mo[t].toReference,s=mo[e].fromReference;return s(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return mo[r].primaries},getTransfer:function(r){return r===Li?Jo:mo[r].transfer}};function Yr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ja(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let br;class Km{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{br===void 0&&(br=na("canvas")),br.width=t.width,br.height=t.height;const n=br.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=br}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=na("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=Yr(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Yr(e[n]/255)*255):e[n]=Yr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Jm=0;class Ad{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jm++}),this.uuid=ns(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push(Qa(s[l].image)):o.push(Qa(s[l]))}else o=Qa(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function Qa(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Km.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Qm=0;class hn extends lr{constructor(t=hn.DEFAULT_IMAGE,e=hn.DEFAULT_MAPPING,n=er,s=er,o=Fn,l=nr,c=ti,u=Di,d=hn.DEFAULT_ANISOTROPY,f=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Qm++}),this.uuid=ns(),this.name="",this.source=new Ad(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=u,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Vl:t.x=t.x-Math.floor(t.x);break;case er:t.x=t.x<0?0:1;break;case Gl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Vl:t.y=t.y-Math.floor(t.y);break;case er:t.y=t.y<0?0:1;break;case Gl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=gd;hn.DEFAULT_ANISOTROPY=1;class je{constructor(t=0,e=0,n=0,s=1){je.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const u=t.elements,d=u[0],f=u[4],p=u[8],v=u[1],m=u[5],x=u[9],y=u[2],g=u[6],_=u[10];if(Math.abs(f-v)<.01&&Math.abs(p-y)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+v)<.1&&Math.abs(p+y)<.1&&Math.abs(x+g)<.1&&Math.abs(d+m+_-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(d+1)/2,P=(m+1)/2,N=(_+1)/2,O=(f+v)/4,U=(p+y)/4,H=(x+g)/4;return M>P&&M>N?M<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(M),s=O/n,o=U/n):P>N?P<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(P),n=O/s,o=H/s):N<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(N),n=U/o,s=H/o),this.set(n,s,o,e),this}let S=Math.sqrt((g-x)*(g-x)+(p-y)*(p-y)+(v-f)*(v-f));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(p-y)/S,this.z=(v-f)/S,this.w=Math.acos((d+m+_-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class tg extends lr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new je(0,0,t,e),this.scissorTest=!1,this.viewport=new je(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new hn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Ad(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ir extends tg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Cd extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=In,this.minFilter=In,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class eg extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=In,this.minFilter=In,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let u=n[s+0],d=n[s+1],f=n[s+2],p=n[s+3];const v=o[l+0],m=o[l+1],x=o[l+2],y=o[l+3];if(c===0){t[e+0]=u,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(c===1){t[e+0]=v,t[e+1]=m,t[e+2]=x,t[e+3]=y;return}if(p!==y||u!==v||d!==m||f!==x){let g=1-c;const _=u*v+d*m+f*x+p*y,S=_>=0?1:-1,M=1-_*_;if(M>Number.EPSILON){const N=Math.sqrt(M),O=Math.atan2(N,_*S);g=Math.sin(g*O)/N,c=Math.sin(c*O)/N}const P=c*S;if(u=u*g+v*P,d=d*g+m*P,f=f*g+x*P,p=p*g+y*P,g===1-c){const N=1/Math.sqrt(u*u+d*d+f*f+p*p);u*=N,d*=N,f*=N,p*=N}}t[e]=u,t[e+1]=d,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],u=n[s+1],d=n[s+2],f=n[s+3],p=o[l],v=o[l+1],m=o[l+2],x=o[l+3];return t[e]=c*x+f*p+u*m-d*v,t[e+1]=u*x+f*v+d*p-c*m,t[e+2]=d*x+f*m+c*v-u*p,t[e+3]=f*x-c*p-u*v-d*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,u=Math.sin,d=c(n/2),f=c(s/2),p=c(o/2),v=u(n/2),m=u(s/2),x=u(o/2);switch(l){case"XYZ":this._x=v*f*p+d*m*x,this._y=d*m*p-v*f*x,this._z=d*f*x+v*m*p,this._w=d*f*p-v*m*x;break;case"YXZ":this._x=v*f*p+d*m*x,this._y=d*m*p-v*f*x,this._z=d*f*x-v*m*p,this._w=d*f*p+v*m*x;break;case"ZXY":this._x=v*f*p-d*m*x,this._y=d*m*p+v*f*x,this._z=d*f*x+v*m*p,this._w=d*f*p-v*m*x;break;case"ZYX":this._x=v*f*p-d*m*x,this._y=d*m*p+v*f*x,this._z=d*f*x-v*m*p,this._w=d*f*p+v*m*x;break;case"YZX":this._x=v*f*p+d*m*x,this._y=d*m*p+v*f*x,this._z=d*f*x-v*m*p,this._w=d*f*p-v*m*x;break;case"XZY":this._x=v*f*p-d*m*x,this._y=d*m*p-v*f*x,this._z=d*f*x+v*m*p,this._w=d*f*p+v*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],u=e[9],d=e[2],f=e[6],p=e[10],v=n+c+p;if(v>0){const m=.5/Math.sqrt(v+1);this._w=.25/m,this._x=(f-u)*m,this._y=(o-d)*m,this._z=(l-s)*m}else if(n>c&&n>p){const m=2*Math.sqrt(1+n-c-p);this._w=(f-u)/m,this._x=.25*m,this._y=(s+l)/m,this._z=(o+d)/m}else if(c>p){const m=2*Math.sqrt(1+c-n-p);this._w=(o-d)/m,this._x=(s+l)/m,this._y=.25*m,this._z=(u+f)/m}else{const m=2*Math.sqrt(1+p-n-c);this._w=(l-s)/m,this._x=(o+d)/m,this._y=(u+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,u=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+s*d-o*u,this._y=s*f+l*u+o*c-n*d,this._z=o*f+l*d+n*u-s*c,this._w=l*f-n*c-s*u-o*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const u=1-c*c;if(u<=Number.EPSILON){const m=1-e;return this._w=m*l+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const d=Math.sqrt(u),f=Math.atan2(d,c),p=Math.sin((1-e)*f)/d,v=Math.sin(e*f)/d;return this._w=l*p+this._w*v,this._x=n*p+this._x*v,this._y=s*p+this._y*v,this._z=o*p+this._z*v,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,e=0,n=0){Q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ku.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ku.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,u=t.w,d=2*(l*s-c*n),f=2*(c*e-o*s),p=2*(o*n-l*e);return this.x=e+u*d+l*p-c*f,this.y=n+u*f+c*d-o*p,this.z=s+u*p+o*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,u=e.z;return this.x=s*u-o*c,this.y=o*l-n*u,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return tl.copy(this).projectOnVector(t),this.sub(tl)}reflect(t){return this.sub(tl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(qe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const tl=new Q,Ku=new rr;class Xs{constructor(t=new Q(1/0,1/0,1/0),e=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,On):On.fromBufferAttribute(o,l),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),go.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),go.copy(n.boundingBox)),go.applyMatrix4(t.matrixWorld),this.union(go)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(bs),_o.subVectors(this.max,bs),wr.subVectors(t.a,bs),Mr.subVectors(t.b,bs),Sr.subVectors(t.c,bs),wi.subVectors(Mr,wr),Mi.subVectors(Sr,Mr),Wi.subVectors(wr,Sr);let e=[0,-wi.z,wi.y,0,-Mi.z,Mi.y,0,-Wi.z,Wi.y,wi.z,0,-wi.x,Mi.z,0,-Mi.x,Wi.z,0,-Wi.x,-wi.y,wi.x,0,-Mi.y,Mi.x,0,-Wi.y,Wi.x,0];return!el(e,wr,Mr,Sr,_o)||(e=[1,0,0,0,1,0,0,0,1],!el(e,wr,Mr,Sr,_o))?!1:(vo.crossVectors(wi,Mi),e=[vo.x,vo.y,vo.z],el(e,wr,Mr,Sr,_o))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ai[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ai[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ai[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ai[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ai[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ai[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ai[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ai[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ai),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ai=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],On=new Q,go=new Xs,wr=new Q,Mr=new Q,Sr=new Q,wi=new Q,Mi=new Q,Wi=new Q,bs=new Q,_o=new Q,vo=new Q,Zi=new Q;function el(r,t,e,n,s){for(let o=0,l=r.length-3;o<=l;o+=3){Zi.fromArray(r,o);const c=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),u=t.dot(Zi),d=e.dot(Zi),f=n.dot(Zi);if(Math.max(-Math.max(u,d,f),Math.min(u,d,f))>c)return!1}return!0}const ng=new Xs,ws=new Q,nl=new Q;class fa{constructor(t=new Q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ng.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ws.subVectors(t,this.center);const e=ws.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ws,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(nl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ws.copy(t.center).add(nl)),this.expandByPoint(ws.copy(t.center).sub(nl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const li=new Q,il=new Q,yo=new Q,Si=new Q,rl=new Q,xo=new Q,sl=new Q;class ac{constructor(t=new Q,e=new Q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(li.copy(this.origin).addScaledVector(this.direction,e),li.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){il.copy(t).add(e).multiplyScalar(.5),yo.copy(e).sub(t).normalize(),Si.copy(this.origin).sub(il);const o=t.distanceTo(e)*.5,l=-this.direction.dot(yo),c=Si.dot(this.direction),u=-Si.dot(yo),d=Si.lengthSq(),f=Math.abs(1-l*l);let p,v,m,x;if(f>0)if(p=l*u-c,v=l*c-u,x=o*f,p>=0)if(v>=-x)if(v<=x){const y=1/f;p*=y,v*=y,m=p*(p+l*v+2*c)+v*(l*p+v+2*u)+d}else v=o,p=Math.max(0,-(l*v+c)),m=-p*p+v*(v+2*u)+d;else v=-o,p=Math.max(0,-(l*v+c)),m=-p*p+v*(v+2*u)+d;else v<=-x?(p=Math.max(0,-(-l*o+c)),v=p>0?-o:Math.min(Math.max(-o,-u),o),m=-p*p+v*(v+2*u)+d):v<=x?(p=0,v=Math.min(Math.max(-o,-u),o),m=v*(v+2*u)+d):(p=Math.max(0,-(l*o+c)),v=p>0?o:Math.min(Math.max(-o,-u),o),m=-p*p+v*(v+2*u)+d);else v=l>0?-o:o,p=Math.max(0,-(l*v+c)),m=-p*p+v*(v+2*u)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(il).addScaledVector(yo,v),m}intersectSphere(t,e){li.subVectors(t.center,this.origin);const n=li.dot(this.direction),s=li.dot(li)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,u=n+l;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,u;const d=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,v=this.origin;return d>=0?(n=(t.min.x-v.x)*d,s=(t.max.x-v.x)*d):(n=(t.max.x-v.x)*d,s=(t.min.x-v.x)*d),f>=0?(o=(t.min.y-v.y)*f,l=(t.max.y-v.y)*f):(o=(t.max.y-v.y)*f,l=(t.min.y-v.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),p>=0?(c=(t.min.z-v.z)*p,u=(t.max.z-v.z)*p):(c=(t.max.z-v.z)*p,u=(t.min.z-v.z)*p),n>u||c>s)||((c>n||n!==n)&&(n=c),(u<s||s!==s)&&(s=u),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,li)!==null}intersectTriangle(t,e,n,s,o){rl.subVectors(e,t),xo.subVectors(n,t),sl.crossVectors(rl,xo);let l=this.direction.dot(sl),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Si.subVectors(this.origin,t);const u=c*this.direction.dot(xo.crossVectors(Si,xo));if(u<0)return null;const d=c*this.direction.dot(rl.cross(Si));if(d<0||u+d>l)return null;const f=-c*Si.dot(sl);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ae{constructor(t,e,n,s,o,l,c,u,d,f,p,v,m,x,y,g){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,d,f,p,v,m,x,y,g)}set(t,e,n,s,o,l,c,u,d,f,p,v,m,x,y,g){const _=this.elements;return _[0]=t,_[4]=e,_[8]=n,_[12]=s,_[1]=o,_[5]=l,_[9]=c,_[13]=u,_[2]=d,_[6]=f,_[10]=p,_[14]=v,_[3]=m,_[7]=x,_[11]=y,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Er.setFromMatrixColumn(t,0).length(),o=1/Er.setFromMatrixColumn(t,1).length(),l=1/Er.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),u=Math.cos(s),d=Math.sin(s),f=Math.cos(o),p=Math.sin(o);if(t.order==="XYZ"){const v=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=-u*p,e[8]=d,e[1]=m+x*d,e[5]=v-y*d,e[9]=-c*u,e[2]=y-v*d,e[6]=x+m*d,e[10]=l*u}else if(t.order==="YXZ"){const v=u*f,m=u*p,x=d*f,y=d*p;e[0]=v+y*c,e[4]=x*c-m,e[8]=l*d,e[1]=l*p,e[5]=l*f,e[9]=-c,e[2]=m*c-x,e[6]=y+v*c,e[10]=l*u}else if(t.order==="ZXY"){const v=u*f,m=u*p,x=d*f,y=d*p;e[0]=v-y*c,e[4]=-l*p,e[8]=x+m*c,e[1]=m+x*c,e[5]=l*f,e[9]=y-v*c,e[2]=-l*d,e[6]=c,e[10]=l*u}else if(t.order==="ZYX"){const v=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=x*d-m,e[8]=v*d+y,e[1]=u*p,e[5]=y*d+v,e[9]=m*d-x,e[2]=-d,e[6]=c*u,e[10]=l*u}else if(t.order==="YZX"){const v=l*u,m=l*d,x=c*u,y=c*d;e[0]=u*f,e[4]=y-v*p,e[8]=x*p+m,e[1]=p,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=m*p+x,e[10]=v-y*p}else if(t.order==="XZY"){const v=l*u,m=l*d,x=c*u,y=c*d;e[0]=u*f,e[4]=-p,e[8]=d*f,e[1]=v*p+y,e[5]=l*f,e[9]=m*p-x,e[2]=x*p-m,e[6]=c*f,e[10]=y*p+v}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ig,t,rg)}lookAt(t,e,n){const s=this.elements;return yn.subVectors(t,e),yn.lengthSq()===0&&(yn.z=1),yn.normalize(),Ei.crossVectors(n,yn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?yn.x+=1e-4:yn.z+=1e-4,yn.normalize(),Ei.crossVectors(n,yn)),Ei.normalize(),bo.crossVectors(yn,Ei),s[0]=Ei.x,s[4]=bo.x,s[8]=yn.x,s[1]=Ei.y,s[5]=bo.y,s[9]=yn.y,s[2]=Ei.z,s[6]=bo.z,s[10]=yn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],u=n[8],d=n[12],f=n[1],p=n[5],v=n[9],m=n[13],x=n[2],y=n[6],g=n[10],_=n[14],S=n[3],M=n[7],P=n[11],N=n[15],O=s[0],U=s[4],H=s[8],D=s[12],R=s[1],W=s[5],k=s[9],F=s[13],C=s[2],Z=s[6],it=s[10],ot=s[14],j=s[3],rt=s[7],at=s[11],q=s[15];return o[0]=l*O+c*R+u*C+d*j,o[4]=l*U+c*W+u*Z+d*rt,o[8]=l*H+c*k+u*it+d*at,o[12]=l*D+c*F+u*ot+d*q,o[1]=f*O+p*R+v*C+m*j,o[5]=f*U+p*W+v*Z+m*rt,o[9]=f*H+p*k+v*it+m*at,o[13]=f*D+p*F+v*ot+m*q,o[2]=x*O+y*R+g*C+_*j,o[6]=x*U+y*W+g*Z+_*rt,o[10]=x*H+y*k+g*it+_*at,o[14]=x*D+y*F+g*ot+_*q,o[3]=S*O+M*R+P*C+N*j,o[7]=S*U+M*W+P*Z+N*rt,o[11]=S*H+M*k+P*it+N*at,o[15]=S*D+M*F+P*ot+N*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],u=t[9],d=t[13],f=t[2],p=t[6],v=t[10],m=t[14],x=t[3],y=t[7],g=t[11],_=t[15];return x*(+o*u*p-s*d*p-o*c*v+n*d*v+s*c*m-n*u*m)+y*(+e*u*m-e*d*v+o*l*v-s*l*m+s*d*f-o*u*f)+g*(+e*d*p-e*c*m-o*l*p+n*l*m+o*c*f-n*d*f)+_*(-s*c*f-e*u*p+e*c*v+s*l*p-n*l*v+n*u*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8],p=t[9],v=t[10],m=t[11],x=t[12],y=t[13],g=t[14],_=t[15],S=p*g*d-y*v*d+y*u*m-c*g*m-p*u*_+c*v*_,M=x*v*d-f*g*d-x*u*m+l*g*m+f*u*_-l*v*_,P=f*y*d-x*p*d+x*c*m-l*y*m-f*c*_+l*p*_,N=x*p*u-f*y*u-x*c*v+l*y*v+f*c*g-l*p*g,O=e*S+n*M+s*P+o*N;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/O;return t[0]=S*U,t[1]=(y*v*o-p*g*o-y*s*m+n*g*m+p*s*_-n*v*_)*U,t[2]=(c*g*o-y*u*o+y*s*d-n*g*d-c*s*_+n*u*_)*U,t[3]=(p*u*o-c*v*o-p*s*d+n*v*d+c*s*m-n*u*m)*U,t[4]=M*U,t[5]=(f*g*o-x*v*o+x*s*m-e*g*m-f*s*_+e*v*_)*U,t[6]=(x*u*o-l*g*o-x*s*d+e*g*d+l*s*_-e*u*_)*U,t[7]=(l*v*o-f*u*o+f*s*d-e*v*d-l*s*m+e*u*m)*U,t[8]=P*U,t[9]=(x*p*o-f*y*o-x*n*m+e*y*m+f*n*_-e*p*_)*U,t[10]=(l*y*o-x*c*o+x*n*d-e*y*d-l*n*_+e*c*_)*U,t[11]=(f*c*o-l*p*o-f*n*d+e*p*d+l*n*m-e*c*m)*U,t[12]=N*U,t[13]=(f*y*s-x*p*s+x*n*v-e*y*v-f*n*g+e*p*g)*U,t[14]=(x*c*s-l*y*s-x*n*u+e*y*u+l*n*g-e*c*g)*U,t[15]=(l*p*s-f*c*s+f*n*u-e*p*u-l*n*v+e*c*v)*U,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,u=t.z,d=o*l,f=o*c;return this.set(d*l+n,d*c-s*u,d*u+s*c,0,d*c+s*u,f*c+n,f*u-s*l,0,d*u-s*c,f*u+s*l,o*u*u+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,u=e._w,d=o+o,f=l+l,p=c+c,v=o*d,m=o*f,x=o*p,y=l*f,g=l*p,_=c*p,S=u*d,M=u*f,P=u*p,N=n.x,O=n.y,U=n.z;return s[0]=(1-(y+_))*N,s[1]=(m+P)*N,s[2]=(x-M)*N,s[3]=0,s[4]=(m-P)*O,s[5]=(1-(v+_))*O,s[6]=(g+S)*O,s[7]=0,s[8]=(x+M)*U,s[9]=(g-S)*U,s[10]=(1-(v+y))*U,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Er.set(s[0],s[1],s[2]).length();const l=Er.set(s[4],s[5],s[6]).length(),c=Er.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Un.copy(this);const d=1/o,f=1/l,p=1/c;return Un.elements[0]*=d,Un.elements[1]*=d,Un.elements[2]*=d,Un.elements[4]*=f,Un.elements[5]*=f,Un.elements[6]*=f,Un.elements[8]*=p,Un.elements[9]*=p,Un.elements[10]*=p,e.setFromRotationMatrix(Un),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=gi){const u=this.elements,d=2*o/(e-t),f=2*o/(n-s),p=(e+t)/(e-t),v=(n+s)/(n-s);let m,x;if(c===gi)m=-(l+o)/(l-o),x=-2*l*o/(l-o);else if(c===ea)m=-l/(l-o),x=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=f,u[9]=v,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=x,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=gi){const u=this.elements,d=1/(e-t),f=1/(n-s),p=1/(l-o),v=(e+t)*d,m=(n+s)*f;let x,y;if(c===gi)x=(l+o)*p,y=-2*p;else if(c===ea)x=o*p,y=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*d,u[4]=0,u[8]=0,u[12]=-v,u[1]=0,u[5]=2*f,u[9]=0,u[13]=-m,u[2]=0,u[6]=0,u[10]=y,u[14]=-x,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Er=new Q,Un=new Ae,ig=new Q(0,0,0),rg=new Q(1,1,1),Ei=new Q,bo=new Q,yn=new Q,Ju=new Ae,Qu=new rr;class Zn{constructor(t=0,e=0,n=0,s=Zn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],u=s[1],d=s[5],f=s[9],p=s[2],v=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(v,d),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(u,d)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(qe(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-qe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(v,m),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(v,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ju.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ju,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qu.setFromEuler(this),this.setFromQuaternion(Qu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zn.DEFAULT_ORDER="XYZ";class Ld{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let sg=0;const th=new Q,Tr=new rr,ci=new Ae,wo=new Q,Ms=new Q,og=new Q,ag=new rr,eh=new Q(1,0,0),nh=new Q(0,1,0),ih=new Q(0,0,1),rh={type:"added"},lg={type:"removed"},Ar={type:"childadded",child:null},ol={type:"childremoved",child:null};class Ke extends lr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=ns(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ke.DEFAULT_UP.clone();const t=new Q,e=new Zn,n=new rr,s=new Q(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new ce}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=Ke.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ld,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Tr.setFromAxisAngle(t,e),this.quaternion.multiply(Tr),this}rotateOnWorldAxis(t,e){return Tr.setFromAxisAngle(t,e),this.quaternion.premultiply(Tr),this}rotateX(t){return this.rotateOnAxis(eh,t)}rotateY(t){return this.rotateOnAxis(nh,t)}rotateZ(t){return this.rotateOnAxis(ih,t)}translateOnAxis(t,e){return th.copy(t).applyQuaternion(this.quaternion),this.position.add(th.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(eh,t)}translateY(t){return this.translateOnAxis(nh,t)}translateZ(t){return this.translateOnAxis(ih,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wo.copy(t):wo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Ms,wo,this.up):ci.lookAt(wo,Ms,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),Tr.setFromRotationMatrix(ci),this.quaternion.premultiply(Tr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rh),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(lg),ol.child=t,this.dispatchEvent(ol),ol.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ci.multiply(t.parent.matrixWorld)),t.applyMatrix4(ci),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rh),Ar.child=t,this.dispatchEvent(Ar),Ar.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,t,og),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ms,ag,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let d=0,f=u.length;d<f;d++){const p=u[d];o(t.shapes,p)}else o(t.shapes,u)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,d=this.material.length;u<d;u++)c.push(o(t.materials,this.material[u]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];s.animations.push(o(t.animations,u))}}if(e){const c=l(t.geometries),u=l(t.materials),d=l(t.textures),f=l(t.images),p=l(t.shapes),v=l(t.skeletons),m=l(t.animations),x=l(t.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),v.length>0&&(n.skeletons=v),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function l(c){const u=[];for(const d in c){const f=c[d];delete f.metadata,u.push(f)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ke.DEFAULT_UP=new Q(0,1,0);Ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const kn=new Q,ui=new Q,al=new Q,hi=new Q,Cr=new Q,Lr=new Q,sh=new Q,ll=new Q,cl=new Q,ul=new Q;class Hn{constructor(t=new Q,e=new Q,n=new Q){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),kn.subVectors(t,e),s.cross(kn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){kn.subVectors(s,e),ui.subVectors(n,e),al.subVectors(t,e);const l=kn.dot(kn),c=kn.dot(ui),u=kn.dot(al),d=ui.dot(ui),f=ui.dot(al),p=l*d-c*c;if(p===0)return o.set(0,0,0),null;const v=1/p,m=(d*u-c*f)*v,x=(l*f-c*u)*v;return o.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(t,e,n,s,o,l,c,u){return this.getBarycoord(t,e,n,s,hi)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,hi.x),u.addScaledVector(l,hi.y),u.addScaledVector(c,hi.z),u)}static isFrontFacing(t,e,n,s){return kn.subVectors(n,e),ui.subVectors(t,e),kn.cross(ui).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return kn.subVectors(this.c,this.b),ui.subVectors(this.a,this.b),kn.cross(ui).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;Cr.subVectors(s,n),Lr.subVectors(o,n),ll.subVectors(t,n);const u=Cr.dot(ll),d=Lr.dot(ll);if(u<=0&&d<=0)return e.copy(n);cl.subVectors(t,s);const f=Cr.dot(cl),p=Lr.dot(cl);if(f>=0&&p<=f)return e.copy(s);const v=u*p-f*d;if(v<=0&&u>=0&&f<=0)return l=u/(u-f),e.copy(n).addScaledVector(Cr,l);ul.subVectors(t,o);const m=Cr.dot(ul),x=Lr.dot(ul);if(x>=0&&m<=x)return e.copy(o);const y=m*d-u*x;if(y<=0&&d>=0&&x<=0)return c=d/(d-x),e.copy(n).addScaledVector(Lr,c);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return sh.subVectors(o,s),c=(p-f)/(p-f+(m-x)),e.copy(s).addScaledVector(sh,c);const _=1/(g+y+v);return l=y*_,c=v*_,e.copy(n).addScaledVector(Cr,l).addScaledVector(Lr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Pd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},Mo={h:0,s:0,l:0};function hl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Kn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=Xm(t,1),e=qe(e,0,1),n=qe(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=hl(l,o,t+1/3),this.g=hl(l,o,t),this.b=hl(l,o,t-1/3)}return ge.toWorkingColorSpace(this,s),this}setStyle(t,e=Kn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Kn){const n=Pd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yr(t.r),this.g=Yr(t.g),this.b=Yr(t.b),this}copyLinearToSRGB(t){return this.r=Ja(t.r),this.g=Ja(t.g),this.b=Ja(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Kn){return ge.fromWorkingColorSpace(tn.copy(this),t),Math.round(qe(tn.r*255,0,255))*65536+Math.round(qe(tn.g*255,0,255))*256+Math.round(qe(tn.b*255,0,255))}getHexString(t=Kn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(tn.copy(this),e);const n=tn.r,s=tn.g,o=tn.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let u,d;const f=(c+l)/2;if(c===l)u=0,d=0;else{const p=l-c;switch(d=f<=.5?p/(l+c):p/(2-l-c),l){case n:u=(s-o)/p+(s<o?6:0);break;case s:u=(o-n)/p+2;break;case o:u=(n-s)/p+4;break}u/=6}return t.h=u,t.s=d,t.l=f,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=Kn){ge.fromWorkingColorSpace(tn.copy(this),t);const e=tn.r,n=tn.g,s=tn.b;return t!==Kn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ti),this.setHSL(Ti.h+t,Ti.s+e,Ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ti),t.getHSL(Mo);const n=$a(Ti.h,Mo.h,e),s=$a(Ti.s,Mo.s,e),o=$a(Ti.l,Mo.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const tn=new Qt;Qt.NAMES=Pd;let cg=0;class cr extends lr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:cg++}),this.uuid=ns(),this.name="",this.type="Material",this.blending=qr,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zl,this.blendDst=Bl,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=$o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=xr,this.stencilZFail=xr,this.stencilZPass=xr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qr&&(n.blending=this.blending),this.side!==Ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zl&&(n.blendSrc=this.blendSrc),this.blendDst!==Bl&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$o&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==xr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==xr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==xr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Rd extends cr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new Q,So=new yt;class Tn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Xu,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Ym("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)So.fromBufferAttribute(this,e),So.applyMatrix3(t),this.setXY(e,So.x,So.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=xs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=mn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=xs(e,this.array)),e}setX(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=xs(e,this.array)),e}setY(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=xs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=xs(e,this.array)),e}setW(t,e){return this.normalized&&(e=mn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=mn(e,this.array),n=mn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=mn(e,this.array),n=mn(n,this.array),s=mn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=mn(e,this.array),n=mn(n,this.array),s=mn(s,this.array),o=mn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xu&&(t.usage=this.usage),t}}class Id extends Tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Dd extends Tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Me extends Tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ug=0;const Pn=new Ae,dl=new Ke,Pr=new Q,xn=new Xs,Ss=new Xs,We=new Q;class He extends lr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ug++}),this.uuid=ns(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Td(t)?Dd:Id)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ce().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Pn.makeRotationFromQuaternion(t),this.applyMatrix4(Pn),this}rotateX(t){return Pn.makeRotationX(t),this.applyMatrix4(Pn),this}rotateY(t){return Pn.makeRotationY(t),this.applyMatrix4(Pn),this}rotateZ(t){return Pn.makeRotationZ(t),this.applyMatrix4(Pn),this}translate(t,e,n){return Pn.makeTranslation(t,e,n),this.applyMatrix4(Pn),this}scale(t,e,n){return Pn.makeScale(t,e,n),this.applyMatrix4(Pn),this}lookAt(t){return dl.lookAt(t),dl.updateMatrix(),this.applyMatrix4(dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pr).negate(),this.translate(Pr.x,Pr.y,Pr.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];xn.setFromBufferAttribute(o),this.morphTargetsRelative?(We.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(We),We.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(We)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fa);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const n=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];Ss.setFromBufferAttribute(c),this.morphTargetsRelative?(We.addVectors(xn.min,Ss.min),xn.expandByPoint(We),We.addVectors(xn.max,Ss.max),xn.expandByPoint(We)):(xn.expandByPoint(Ss.min),xn.expandByPoint(Ss.max))}xn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)We.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(We));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],u=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)We.fromBufferAttribute(c,d),u&&(Pr.fromBufferAttribute(t,d),We.add(Pr)),s=Math.max(s,n.distanceToSquared(We))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],u=[];for(let H=0;H<n.count;H++)c[H]=new Q,u[H]=new Q;const d=new Q,f=new Q,p=new Q,v=new yt,m=new yt,x=new yt,y=new Q,g=new Q;function _(H,D,R){d.fromBufferAttribute(n,H),f.fromBufferAttribute(n,D),p.fromBufferAttribute(n,R),v.fromBufferAttribute(o,H),m.fromBufferAttribute(o,D),x.fromBufferAttribute(o,R),f.sub(d),p.sub(d),m.sub(v),x.sub(v);const W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(W),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(W),c[H].add(y),c[D].add(y),c[R].add(y),u[H].add(g),u[D].add(g),u[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let H=0,D=S.length;H<D;++H){const R=S[H],W=R.start,k=R.count;for(let F=W,C=W+k;F<C;F+=3)_(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new Q,P=new Q,N=new Q,O=new Q;function U(H){N.fromBufferAttribute(s,H),O.copy(N);const D=c[H];M.copy(D),M.sub(N.multiplyScalar(N.dot(D))).normalize(),P.crossVectors(O,D);const W=P.dot(u[H])<0?-1:1;l.setXYZW(H,M.x,M.y,M.z,W)}for(let H=0,D=S.length;H<D;++H){const R=S[H],W=R.start,k=R.count;for(let F=W,C=W+k;F<C;F+=3)U(t.getX(F+0)),U(t.getX(F+1)),U(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let v=0,m=n.count;v<m;v++)n.setXYZ(v,0,0,0);const s=new Q,o=new Q,l=new Q,c=new Q,u=new Q,d=new Q,f=new Q,p=new Q;if(t)for(let v=0,m=t.count;v<m;v+=3){const x=t.getX(v+0),y=t.getX(v+1),g=t.getX(v+2);s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),l.fromBufferAttribute(e,g),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,g),c.add(f),u.add(f),d.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(y,u.x,u.y,u.z),n.setXYZ(g,d.x,d.y,d.z)}else for(let v=0,m=e.count;v<m;v+=3)s.fromBufferAttribute(e,v+0),o.fromBufferAttribute(e,v+1),l.fromBufferAttribute(e,v+2),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),n.setXYZ(v+0,f.x,f.y,f.z),n.setXYZ(v+1,f.x,f.y,f.z),n.setXYZ(v+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)We.fromBufferAttribute(t,e),We.normalize(),t.setXYZ(e,We.x,We.y,We.z)}toNonIndexed(){function t(c,u){const d=c.array,f=c.itemSize,p=c.normalized,v=new d.constructor(u.length*f);let m=0,x=0;for(let y=0,g=u.length;y<g;y++){c.isInterleavedBufferAttribute?m=u[y]*c.data.stride+c.offset:m=u[y]*f;for(let _=0;_<f;_++)v[x++]=d[m++]}return new Tn(v,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,n=this.index.array,s=this.attributes;for(const c in s){const u=s[c],d=t(u,n);e.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const u=[],d=o[c];for(let f=0,p=d.length;f<p;f++){const v=d[f],m=t(v,n);u.push(m)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,u=l.length;c<u;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const d in u)u[d]!==void 0&&(t[d]=u[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const u in n){const d=n[u];t.data.attributes[u]=d.toJSON(t.data)}const s={};let o=!1;for(const u in this.morphAttributes){const d=this.morphAttributes[u],f=[];for(let p=0,v=d.length;p<v;p++){const m=d[p];f.push(m.toJSON(t.data))}f.length>0&&(s[u]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const d in s){const f=s[d];this.setAttribute(d,f.clone(e))}const o=t.morphAttributes;for(const d in o){const f=[],p=o[d];for(let v=0,m=p.length;v<m;v++)f.push(p[v].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const oh=new Ae,Xi=new ac,Eo=new fa,ah=new Q,Rr=new Q,Ir=new Q,Dr=new Q,fl=new Q,To=new Q,Ao=new yt,Co=new yt,Lo=new yt,lh=new Q,ch=new Q,uh=new Q,Po=new Q,Ro=new Q;class ze extends Ke{constructor(t=new He,e=new Rd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){To.set(0,0,0);for(let u=0,d=o.length;u<d;u++){const f=c[u],p=o[u];f!==0&&(fl.fromBufferAttribute(p,t),l?To.addScaledVector(fl,f):To.addScaledVector(fl.sub(e),f))}e.add(To)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Eo.copy(n.boundingSphere),Eo.applyMatrix4(o),Xi.copy(t.ray).recast(t.near),!(Eo.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Eo,ah)===null||Xi.origin.distanceToSquared(ah)>(t.far-t.near)**2))&&(oh.copy(o).invert(),Xi.copy(t.ray).applyMatrix4(oh),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Xi)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,u=o.attributes.position,d=o.attributes.uv,f=o.attributes.uv1,p=o.attributes.normal,v=o.groups,m=o.drawRange;if(c!==null)if(Array.isArray(l))for(let x=0,y=v.length;x<y;x++){const g=v[x],_=l[g.materialIndex],S=Math.max(g.start,m.start),M=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=M;P<N;P+=3){const O=c.getX(P),U=c.getX(P+1),H=c.getX(P+2);s=Io(this,_,t,n,d,f,p,O,U,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let g=x,_=y;g<_;g+=3){const S=c.getX(g),M=c.getX(g+1),P=c.getX(g+2);s=Io(this,l,t,n,d,f,p,S,M,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(u!==void 0)if(Array.isArray(l))for(let x=0,y=v.length;x<y;x++){const g=v[x],_=l[g.materialIndex],S=Math.max(g.start,m.start),M=Math.min(u.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=M;P<N;P+=3){const O=P,U=P+1,H=P+2;s=Io(this,_,t,n,d,f,p,O,U,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(u.count,m.start+m.count);for(let g=x,_=y;g<_;g+=3){const S=g,M=g+1,P=g+2;s=Io(this,l,t,n,d,f,p,S,M,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function hg(r,t,e,n,s,o,l,c){let u;if(t.side===vn?u=n.intersectTriangle(l,o,s,!0,c):u=n.intersectTriangle(s,o,l,t.side===Ni,c),u===null)return null;Ro.copy(c),Ro.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(Ro);return d<e.near||d>e.far?null:{distance:d,point:Ro.clone(),object:r}}function Io(r,t,e,n,s,o,l,c,u,d){r.getVertexPosition(c,Rr),r.getVertexPosition(u,Ir),r.getVertexPosition(d,Dr);const f=hg(r,t,e,n,Rr,Ir,Dr,Po);if(f){s&&(Ao.fromBufferAttribute(s,c),Co.fromBufferAttribute(s,u),Lo.fromBufferAttribute(s,d),f.uv=Hn.getInterpolation(Po,Rr,Ir,Dr,Ao,Co,Lo,new yt)),o&&(Ao.fromBufferAttribute(o,c),Co.fromBufferAttribute(o,u),Lo.fromBufferAttribute(o,d),f.uv1=Hn.getInterpolation(Po,Rr,Ir,Dr,Ao,Co,Lo,new yt)),l&&(lh.fromBufferAttribute(l,c),ch.fromBufferAttribute(l,u),uh.fromBufferAttribute(l,d),f.normal=Hn.getInterpolation(Po,Rr,Ir,Dr,lh,ch,uh,new Q),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:c,b:u,c:d,normal:new Q,materialIndex:0};Hn.getNormal(Rr,Ir,Dr,p.normal),f.face=p}return f}class cn extends He{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const u=[],d=[],f=[],p=[];let v=0,m=0;x("z","y","x",-1,-1,n,e,t,l,o,0),x("z","y","x",1,-1,n,e,-t,l,o,1),x("x","z","y",1,1,t,n,e,s,l,2),x("x","z","y",1,-1,t,n,-e,s,l,3),x("x","y","z",1,-1,t,e,n,s,o,4),x("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(u),this.setAttribute("position",new Me(d,3)),this.setAttribute("normal",new Me(f,3)),this.setAttribute("uv",new Me(p,2));function x(y,g,_,S,M,P,N,O,U,H,D){const R=P/U,W=N/H,k=P/2,F=N/2,C=O/2,Z=U+1,it=H+1;let ot=0,j=0;const rt=new Q;for(let at=0;at<it;at++){const q=at*W-F;for(let tt=0;tt<Z;tt++){const Lt=tt*R-k;rt[y]=Lt*S,rt[g]=q*M,rt[_]=C,d.push(rt.x,rt.y,rt.z),rt[y]=0,rt[g]=0,rt[_]=O>0?1:-1,f.push(rt.x,rt.y,rt.z),p.push(tt/U),p.push(1-at/H),ot+=1}}for(let at=0;at<H;at++)for(let q=0;q<U;q++){const tt=v+q+Z*at,Lt=v+q+Z*(at+1),J=v+(q+1)+Z*(at+1),nt=v+(q+1)+Z*at;u.push(tt,Lt,nt),u.push(Lt,J,nt),j+=6}c.addGroup(m,j,D),m+=j,v+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function es(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function ln(r){const t={};for(let e=0;e<r.length;e++){const n=es(r[e]);for(const s in n)t[s]=n[s]}return t}function dg(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Nd(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}const fg={clone:es,merge:ln};var pg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends cr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pg,this.fragmentShader=mg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=es(t.uniforms),this.uniformsGroups=dg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Od extends Ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=gi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ai=new Q,hh=new yt,dh=new yt;class wn extends Od{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Wl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Wl*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ai.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z),Ai.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ai.x,Ai.y).multiplyScalar(-t/Ai.z)}getViewSize(t,e){return this.getViewBounds(t,hh,dh),e.subVectors(dh,hh)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const u=l.fullWidth,d=l.fullHeight;o+=l.offsetX*s/u,e-=l.offsetY*n/d,s*=l.width/u,n*=l.height/d}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Nr=-90,Or=1;class gg extends Ke{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new wn(Nr,Or,t,e);s.layers=this.layers,this.add(s);const o=new wn(Nr,Or,t,e);o.layers=this.layers,this.add(o);const l=new wn(Nr,Or,t,e);l.layers=this.layers,this.add(l);const c=new wn(Nr,Or,t,e);c.layers=this.layers,this.add(c);const u=new wn(Nr,Or,t,e);u.layers=this.layers,this.add(u);const d=new wn(Nr,Or,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,u]=e;for(const d of e)this.remove(d);if(t===gi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===ea)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,u,d,f]=this.children,p=t.getRenderTarget(),v=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,u),t.setRenderTarget(n,4,s),t.render(e,d),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(p,v,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Ud extends hn{constructor(t,e,n,s,o,l,c,u,d,f){t=t!==void 0?t:[],e=e!==void 0?e:Jr,super(t,e,n,s,o,l,c,u,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _g extends ir{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Ud(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Fn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new cn(5,5,5),o=new Oi({name:"CubemapFromEquirect",uniforms:es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:vn,blending:Ri});o.uniforms.tEquirect.value=e;const l=new ze(s,o),c=e.minFilter;return e.minFilter===nr&&(e.minFilter=Fn),new gg(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const pl=new Q,vg=new Q,yg=new ce;class Ci{constructor(t=new Q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=pl.subVectors(n,e).cross(vg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(pl),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yg.getNormalMatrix(t),s=this.coplanarPoint(pl).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qi=new fa,Do=new Q;class lc{constructor(t=new Ci,e=new Ci,n=new Ci,s=new Ci,o=new Ci,l=new Ci){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=gi){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],u=s[3],d=s[4],f=s[5],p=s[6],v=s[7],m=s[8],x=s[9],y=s[10],g=s[11],_=s[12],S=s[13],M=s[14],P=s[15];if(n[0].setComponents(u-o,v-d,g-m,P-_).normalize(),n[1].setComponents(u+o,v+d,g+m,P+_).normalize(),n[2].setComponents(u+l,v+f,g+x,P+S).normalize(),n[3].setComponents(u-l,v-f,g-x,P-S).normalize(),n[4].setComponents(u-c,v-p,g-y,P-M).normalize(),e===gi)n[5].setComponents(u+c,v+p,g+y,P+M).normalize();else if(e===ea)n[5].setComponents(c,p,y,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(t){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Do.x=s.normal.x>0?t.max.x:t.min.x,Do.y=s.normal.y>0?t.max.y:t.min.y,Do.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Do)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function kd(){let r=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){r=o}}}function xg(r){const t=new WeakMap;function e(c,u){const d=c.array,f=c.usage,p=d.byteLength,v=r.createBuffer();r.bindBuffer(u,v),r.bufferData(u,d,f),c.onUploadCallback();let m;if(d instanceof Float32Array)m=r.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?m=r.HALF_FLOAT:m=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)m=r.SHORT;else if(d instanceof Uint32Array)m=r.UNSIGNED_INT;else if(d instanceof Int32Array)m=r.INT;else if(d instanceof Int8Array)m=r.BYTE;else if(d instanceof Uint8Array)m=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)m=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:v,type:m,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,d){const f=u.array,p=u._updateRange,v=u.updateRanges;if(r.bindBuffer(d,c),p.count===-1&&v.length===0&&r.bufferSubData(d,0,f),v.length!==0){for(let m=0,x=v.length;m<x;m++){const y=v[m];r.bufferSubData(d,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}u.clearUpdateRanges()}p.count!==-1&&(r.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=t.get(c);u&&(r.deleteBuffer(u.buffer),t.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,u),d.version=c.version}}return{get:s,remove:o,update:l}}class qs extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),u=Math.floor(s),d=c+1,f=u+1,p=t/c,v=e/u,m=[],x=[],y=[],g=[];for(let _=0;_<f;_++){const S=_*v-l;for(let M=0;M<d;M++){const P=M*p-o;x.push(P,-S,0),y.push(0,0,1),g.push(M/c),g.push(1-_/u)}}for(let _=0;_<u;_++)for(let S=0;S<c;S++){const M=S+d*_,P=S+d*(_+1),N=S+1+d*(_+1),O=S+1+d*_;m.push(M,P,O),m.push(P,N,O)}this.setIndex(m),this.setAttribute("position",new Me(x,3)),this.setAttribute("normal",new Me(y,3)),this.setAttribute("uv",new Me(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qs(t.width,t.height,t.widthSegments,t.heightSegments)}}var bg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wg=`#ifdef USE_ALPHAHASH
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
#endif`,Mg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Sg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Eg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Tg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ag=`#ifdef USE_AOMAP
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
#endif`,Cg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lg=`#ifdef USE_BATCHING
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
#endif`,Pg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Rg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ig=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Dg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ng=`#ifdef USE_IRIDESCENCE
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
#endif`,Og=`#ifdef USE_BUMPMAP
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
#endif`,Ug=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,kg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Bg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Hg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Vg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Gg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Wg=`#define PI 3.141592653589793
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
} // validated`,Zg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Xg=`vec3 transformedNormal = objectNormal;
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
#endif`,qg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,jg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Yg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$g=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Kg="gl_FragColor = linearToOutputTexel( gl_FragColor );",Jg=`
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
}`,Qg=`#ifdef USE_ENVMAP
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
#endif`,t_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,e_=`#ifdef USE_ENVMAP
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
#endif`,n_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,i_=`#ifdef USE_ENVMAP
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
#endif`,r_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,s_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,o_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,a_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,l_=`#ifdef USE_GRADIENTMAP
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
}`,c_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,u_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,h_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,d_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,f_=`uniform bool receiveShadow;
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
#endif`,p_=`#ifdef USE_ENVMAP
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
#endif`,m_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,g_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,__=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,v_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,y_=`PhysicalMaterial material;
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
#endif`,x_=`struct PhysicalMaterial {
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
}`,b_=`
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
#endif`,w_=`#if defined( RE_IndirectDiffuse )
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
#endif`,M_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,S_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,E_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,T_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,C_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,L_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,P_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,R_=`#if defined( USE_POINTS_UV )
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
#endif`,I_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,D_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,N_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,O_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,U_=`#ifdef USE_MORPHNORMALS
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
#endif`,k_=`#ifdef USE_MORPHTARGETS
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
#endif`,z_=`#ifdef USE_MORPHTARGETS
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
#endif`,B_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,F_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,H_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,V_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,W_=`#ifdef USE_NORMALMAP
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
#endif`,Z_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,X_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,q_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Y_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,K_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,J_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ev=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,sv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ov=`float getShadowMask() {
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
}`,av=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lv=`#ifdef USE_SKINNING
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
#endif`,cv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uv=`#ifdef USE_SKINNING
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
#endif`,hv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mv=`#ifdef USE_TRANSMISSION
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
#endif`,gv=`#ifdef USE_TRANSMISSION
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
#endif`,_v=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wv=`uniform sampler2D t2D;
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
}`,Mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Av=`#include <common>
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
}`,Cv=`#if DEPTH_PACKING == 3200
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
}`,Lv=`#define DISTANCE
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
}`,Pv=`#define DISTANCE
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
}`,Rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Iv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dv=`uniform float scale;
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
}`,Nv=`uniform vec3 diffuse;
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
}`,Ov=`#include <common>
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
}`,Uv=`uniform vec3 diffuse;
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
}`,kv=`#define LAMBERT
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
}`,zv=`#define LAMBERT
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
}`,Bv=`#define MATCAP
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
}`,Fv=`#define MATCAP
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
}`,Hv=`#define NORMAL
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
}`,Vv=`#define NORMAL
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
}`,Gv=`#define PHONG
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
}`,Wv=`#define PHONG
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
}`,Zv=`#define STANDARD
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
}`,Xv=`#define STANDARD
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
}`,qv=`#define TOON
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
}`,jv=`#define TOON
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
}`,Yv=`uniform float size;
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
}`,$v=`uniform vec3 diffuse;
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
}`,Kv=`#include <common>
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
}`,Jv=`uniform vec3 color;
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
}`,Qv=`uniform float rotation;
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
}`,t0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:bg,alphahash_pars_fragment:wg,alphamap_fragment:Mg,alphamap_pars_fragment:Sg,alphatest_fragment:Eg,alphatest_pars_fragment:Tg,aomap_fragment:Ag,aomap_pars_fragment:Cg,batching_pars_vertex:Lg,batching_vertex:Pg,begin_vertex:Rg,beginnormal_vertex:Ig,bsdfs:Dg,iridescence_fragment:Ng,bumpmap_pars_fragment:Og,clipping_planes_fragment:Ug,clipping_planes_pars_fragment:kg,clipping_planes_pars_vertex:zg,clipping_planes_vertex:Bg,color_fragment:Fg,color_pars_fragment:Hg,color_pars_vertex:Vg,color_vertex:Gg,common:Wg,cube_uv_reflection_fragment:Zg,defaultnormal_vertex:Xg,displacementmap_pars_vertex:qg,displacementmap_vertex:jg,emissivemap_fragment:Yg,emissivemap_pars_fragment:$g,colorspace_fragment:Kg,colorspace_pars_fragment:Jg,envmap_fragment:Qg,envmap_common_pars_fragment:t_,envmap_pars_fragment:e_,envmap_pars_vertex:n_,envmap_physical_pars_fragment:p_,envmap_vertex:i_,fog_vertex:r_,fog_pars_vertex:s_,fog_fragment:o_,fog_pars_fragment:a_,gradientmap_pars_fragment:l_,lightmap_fragment:c_,lightmap_pars_fragment:u_,lights_lambert_fragment:h_,lights_lambert_pars_fragment:d_,lights_pars_begin:f_,lights_toon_fragment:m_,lights_toon_pars_fragment:g_,lights_phong_fragment:__,lights_phong_pars_fragment:v_,lights_physical_fragment:y_,lights_physical_pars_fragment:x_,lights_fragment_begin:b_,lights_fragment_maps:w_,lights_fragment_end:M_,logdepthbuf_fragment:S_,logdepthbuf_pars_fragment:E_,logdepthbuf_pars_vertex:T_,logdepthbuf_vertex:A_,map_fragment:C_,map_pars_fragment:L_,map_particle_fragment:P_,map_particle_pars_fragment:R_,metalnessmap_fragment:I_,metalnessmap_pars_fragment:D_,morphinstance_vertex:N_,morphcolor_vertex:O_,morphnormal_vertex:U_,morphtarget_pars_vertex:k_,morphtarget_vertex:z_,normal_fragment_begin:B_,normal_fragment_maps:F_,normal_pars_fragment:H_,normal_pars_vertex:V_,normal_vertex:G_,normalmap_pars_fragment:W_,clearcoat_normal_fragment_begin:Z_,clearcoat_normal_fragment_maps:X_,clearcoat_pars_fragment:q_,iridescence_pars_fragment:j_,opaque_fragment:Y_,packing:$_,premultiplied_alpha_fragment:K_,project_vertex:J_,dithering_fragment:Q_,dithering_pars_fragment:tv,roughnessmap_fragment:ev,roughnessmap_pars_fragment:nv,shadowmap_pars_fragment:iv,shadowmap_pars_vertex:rv,shadowmap_vertex:sv,shadowmask_pars_fragment:ov,skinbase_vertex:av,skinning_pars_vertex:lv,skinning_vertex:cv,skinnormal_vertex:uv,specularmap_fragment:hv,specularmap_pars_fragment:dv,tonemapping_fragment:fv,tonemapping_pars_fragment:pv,transmission_fragment:mv,transmission_pars_fragment:gv,uv_pars_fragment:_v,uv_pars_vertex:vv,uv_vertex:yv,worldpos_vertex:xv,background_vert:bv,background_frag:wv,backgroundCube_vert:Mv,backgroundCube_frag:Sv,cube_vert:Ev,cube_frag:Tv,depth_vert:Av,depth_frag:Cv,distanceRGBA_vert:Lv,distanceRGBA_frag:Pv,equirect_vert:Rv,equirect_frag:Iv,linedashed_vert:Dv,linedashed_frag:Nv,meshbasic_vert:Ov,meshbasic_frag:Uv,meshlambert_vert:kv,meshlambert_frag:zv,meshmatcap_vert:Bv,meshmatcap_frag:Fv,meshnormal_vert:Hv,meshnormal_frag:Vv,meshphong_vert:Gv,meshphong_frag:Wv,meshphysical_vert:Zv,meshphysical_frag:Xv,meshtoon_vert:qv,meshtoon_frag:jv,points_vert:Yv,points_frag:$v,shadow_vert:Kv,shadow_frag:Jv,sprite_vert:Qv,sprite_frag:t0},Ot={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Jn={basic:{uniforms:ln([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:ln([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:ln([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:ln([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:ln([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:ln([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:ln([Ot.points,Ot.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:ln([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:ln([Ot.common,Ot.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:ln([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:ln([Ot.sprite,Ot.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:ln([Ot.common,Ot.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:ln([Ot.lights,Ot.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};Jn.physical={uniforms:ln([Jn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const No={r:0,b:0,g:0},ji=new Zn,e0=new Ae;function n0(r,t,e,n,s,o,l){const c=new Qt(0);let u=o===!0?0:1,d,f,p=null,v=0,m=null;function x(g,_){let S=!1,M=_.isScene===!0?_.background:null;M&&M.isTexture&&(M=(_.backgroundBlurriness>0?e:t).get(M)),M===null?y(c,u):M&&M.isColor&&(y(M,1),S=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,l):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),M&&(M.isCubeTexture||M.mapping===ha)?(f===void 0&&(f=new ze(new cn(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:es(Jn.backgroundCube.uniforms),vertexShader:Jn.backgroundCube.vertexShader,fragmentShader:Jn.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(N,O,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),ji.copy(_.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),f.material.uniforms.envMap.value=M,f.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(e0.makeRotationFromEuler(ji)),f.material.toneMapped=ge.getTransfer(M.colorSpace)!==be,(p!==M||v!==M.version||m!==r.toneMapping)&&(f.material.needsUpdate=!0,p=M,v=M.version,m=r.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null)):M&&M.isTexture&&(d===void 0&&(d=new ze(new qs(2,2),new Oi({name:"BackgroundMaterial",uniforms:es(Jn.background.uniforms),vertexShader:Jn.background.vertexShader,fragmentShader:Jn.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=M,d.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,d.material.toneMapped=ge.getTransfer(M.colorSpace)!==be,M.matrixAutoUpdate===!0&&M.updateMatrix(),d.material.uniforms.uvTransform.value.copy(M.matrix),(p!==M||v!==M.version||m!==r.toneMapping)&&(d.material.needsUpdate=!0,p=M,v=M.version,m=r.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null))}function y(g,_){g.getRGB(No,Nd(r)),n.buffers.color.setClear(No.r,No.g,No.b,_,l)}return{getClearColor:function(){return c},setClearColor:function(g,_=1){c.set(g),u=_,y(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,y(c,u)},render:x}}function i0(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=v(null);let o=s,l=!1;function c(R,W,k,F,C){let Z=!1;const it=p(F,k,W);o!==it&&(o=it,d(o.object)),Z=m(R,F,k,C),Z&&x(R,F,k,C),C!==null&&t.update(C,r.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,P(R,W,k,F),C!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(C).buffer))}function u(){return r.createVertexArray()}function d(R){return r.bindVertexArray(R)}function f(R){return r.deleteVertexArray(R)}function p(R,W,k){const F=k.wireframe===!0;let C=n[R.id];C===void 0&&(C={},n[R.id]=C);let Z=C[W.id];Z===void 0&&(Z={},C[W.id]=Z);let it=Z[F];return it===void 0&&(it=v(u()),Z[F]=it),it}function v(R){const W=[],k=[],F=[];for(let C=0;C<e;C++)W[C]=0,k[C]=0,F[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:k,attributeDivisors:F,object:R,attributes:{},index:null}}function m(R,W,k,F){const C=o.attributes,Z=W.attributes;let it=0;const ot=k.getAttributes();for(const j in ot)if(ot[j].location>=0){const at=C[j];let q=Z[j];if(q===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),at===void 0||at.attribute!==q||q&&at.data!==q.data)return!0;it++}return o.attributesNum!==it||o.index!==F}function x(R,W,k,F){const C={},Z=W.attributes;let it=0;const ot=k.getAttributes();for(const j in ot)if(ot[j].location>=0){let at=Z[j];at===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(at=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(at=R.instanceColor));const q={};q.attribute=at,at&&at.data&&(q.data=at.data),C[j]=q,it++}o.attributes=C,o.attributesNum=it,o.index=F}function y(){const R=o.newAttributes;for(let W=0,k=R.length;W<k;W++)R[W]=0}function g(R){_(R,0)}function _(R,W){const k=o.newAttributes,F=o.enabledAttributes,C=o.attributeDivisors;k[R]=1,F[R]===0&&(r.enableVertexAttribArray(R),F[R]=1),C[R]!==W&&(r.vertexAttribDivisor(R,W),C[R]=W)}function S(){const R=o.newAttributes,W=o.enabledAttributes;for(let k=0,F=W.length;k<F;k++)W[k]!==R[k]&&(r.disableVertexAttribArray(k),W[k]=0)}function M(R,W,k,F,C,Z,it){it===!0?r.vertexAttribIPointer(R,W,k,C,Z):r.vertexAttribPointer(R,W,k,F,C,Z)}function P(R,W,k,F){y();const C=F.attributes,Z=k.getAttributes(),it=W.defaultAttributeValues;for(const ot in Z){const j=Z[ot];if(j.location>=0){let rt=C[ot];if(rt===void 0&&(ot==="instanceMatrix"&&R.instanceMatrix&&(rt=R.instanceMatrix),ot==="instanceColor"&&R.instanceColor&&(rt=R.instanceColor)),rt!==void 0){const at=rt.normalized,q=rt.itemSize,tt=t.get(rt);if(tt===void 0)continue;const Lt=tt.buffer,J=tt.type,nt=tt.bytesPerElement,wt=J===r.INT||J===r.UNSIGNED_INT||rt.gpuType===vd;if(rt.isInterleavedBufferAttribute){const St=rt.data,Pt=St.stride,It=rt.offset;if(St.isInstancedInterleavedBuffer){for(let kt=0;kt<j.locationSize;kt++)_(j.location+kt,St.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let kt=0;kt<j.locationSize;kt++)g(j.location+kt);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let kt=0;kt<j.locationSize;kt++)M(j.location+kt,q/j.locationSize,J,at,Pt*nt,(It+q/j.locationSize*kt)*nt,wt)}else{if(rt.isInstancedBufferAttribute){for(let St=0;St<j.locationSize;St++)_(j.location+St,rt.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let St=0;St<j.locationSize;St++)g(j.location+St);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let St=0;St<j.locationSize;St++)M(j.location+St,q/j.locationSize,J,at,q*nt,q/j.locationSize*St*nt,wt)}}else if(it!==void 0){const at=it[ot];if(at!==void 0)switch(at.length){case 2:r.vertexAttrib2fv(j.location,at);break;case 3:r.vertexAttrib3fv(j.location,at);break;case 4:r.vertexAttrib4fv(j.location,at);break;default:r.vertexAttrib1fv(j.location,at)}}}}S()}function N(){H();for(const R in n){const W=n[R];for(const k in W){const F=W[k];for(const C in F)f(F[C].object),delete F[C];delete W[k]}delete n[R]}}function O(R){if(n[R.id]===void 0)return;const W=n[R.id];for(const k in W){const F=W[k];for(const C in F)f(F[C].object),delete F[C];delete W[k]}delete n[R.id]}function U(R){for(const W in n){const k=n[W];if(k[R.id]===void 0)continue;const F=k[R.id];for(const C in F)f(F[C].object),delete F[C];delete k[R.id]}}function H(){D(),l=!0,o!==s&&(o=s,d(o.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:H,resetDefaultState:D,dispose:N,releaseStatesOfGeometry:O,releaseStatesOfProgram:U,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function r0(r,t,e){let n;function s(u){n=u}function o(u,d){r.drawArrays(n,u,d),e.update(d,n,1)}function l(u,d,f){f!==0&&(r.drawArraysInstanced(n,u,d,f),e.update(d,n,f))}function c(u,d,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<f;v++)this.render(u[v],d[v]);else{p.multiDrawArraysWEBGL(n,u,0,d,0,f);let v=0;for(let m=0;m<f;m++)v+=d[m];e.update(v,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function s0(r,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),v=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),g=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),_=f>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:v,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:_,maxSamples:S}}function o0(r){const t=this;let e=null,n=0,s=!1,o=!1;const l=new Ci,c=new ce,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,v){const m=p.length!==0||v||n!==0||s;return s=v,n=p.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,v){e=f(p,v,0)},this.setState=function(p,v,m){const x=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,_=r.get(p);if(!s||x===null||x.length===0||o&&!g)o?f(null):d();else{const S=o?0:n,M=S*4;let P=_.clippingState||null;u.value=P,P=f(x,v,M,m);for(let N=0;N!==M;++N)P[N]=e[N];_.clippingState=P,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function d(){u.value!==e&&(u.value=e,u.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,v,m,x){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=u.value,x!==!0||g===null){const _=m+y*4,S=v.matrixWorldInverse;c.getNormalMatrix(S),(g===null||g.length<_)&&(g=new Float32Array(_));for(let M=0,P=m;M!==y;++M,P+=4)l.copy(p[M]).applyMatrix4(S,c),l.normal.toArray(g,P),g[P+3]=l.constant}u.value=g,u.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}function a0(r){let t=new WeakMap;function e(l,c){return c===Fl?l.mapping=Jr:c===Hl&&(l.mapping=Qr),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===Fl||c===Hl)if(t.has(l)){const u=t.get(l).texture;return e(u,l.mapping)}else{const u=l.image;if(u&&u.height>0){const d=new _g(u.height);return d.fromEquirectangularTexture(r,l),t.set(l,d),l.addEventListener("dispose",s),e(d.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class zd extends Od{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,u=s-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,l=o+d*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Gr=4,fh=[.125,.215,.35,.446,.526,.582],Ji=20,ml=new zd,ph=new Qt;let gl=null,_l=0,vl=0,yl=!1;const $i=(1+Math.sqrt(5))/2,Ur=1/$i,mh=[new Q(1,1,1),new Q(-1,1,1),new Q(1,1,-1),new Q(-1,1,-1),new Q(0,$i,Ur),new Q(0,$i,-Ur),new Q(Ur,0,$i),new Q(-Ur,0,$i),new Q($i,Ur,0),new Q(-$i,Ur,0)];class gh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){gl=this._renderer.getRenderTarget(),_l=this._renderer.getActiveCubeFace(),vl=this._renderer.getActiveMipmapLevel(),yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(gl,_l,vl),this._renderer.xr.enabled=yl,t.scissorTest=!1,Oo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Jr||t.mapping===Qr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gl=this._renderer.getRenderTarget(),_l=this._renderer.getActiveCubeFace(),vl=this._renderer.getActiveMipmapLevel(),yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:Ko,format:ti,colorSpace:Ui,depthBuffer:!1},s=_h(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_h(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=l0(o)),this._blurMaterial=c0(o,t,e)}return s}_compileMaterial(t){const e=new ze(this._lodPlanes[0],t);this._renderer.compile(e,ml)}_sceneToCubeUV(t,e,n,s){const c=new wn(90,1,e,n),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,v=f.toneMapping;f.getClearColor(ph),f.toneMapping=Ii,f.autoClear=!1;const m=new Rd({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1}),x=new ze(new cn,m);let y=!1;const g=t.background;g?g.isColor&&(m.color.copy(g),t.background=null,y=!0):(m.color.copy(ph),y=!0);for(let _=0;_<6;_++){const S=_%3;S===0?(c.up.set(0,u[_],0),c.lookAt(d[_],0,0)):S===1?(c.up.set(0,0,u[_]),c.lookAt(0,d[_],0)):(c.up.set(0,u[_],0),c.lookAt(0,0,d[_]));const M=this._cubeSize;Oo(s,S*M,_>2?M:0,M,M),f.setRenderTarget(s),y&&f.render(x,c),f.render(t,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=v,f.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Jr||t.mapping===Qr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=yh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vh());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new ze(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const u=this._cubeSize;Oo(e,0,0,3*u,2*u),n.setRenderTarget(e),n.render(l,ml)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=mh[(s-1)%mh.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const u=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new ze(this._lodPlanes[s],d),v=d.uniforms,m=this._sizeLods[n]-1,x=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*Ji-1),y=o/x,g=isFinite(o)?1+Math.floor(f*y):Ji;g>Ji&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ji}`);const _=[];let S=0;for(let U=0;U<Ji;++U){const H=U/y,D=Math.exp(-H*H/2);_.push(D),U===0?S+=D:U<g&&(S+=2*D)}for(let U=0;U<_.length;U++)_[U]=_[U]/S;v.envMap.value=t.texture,v.samples.value=g,v.weights.value=_,v.latitudinal.value=l==="latitudinal",c&&(v.poleAxis.value=c);const{_lodMax:M}=this;v.dTheta.value=x,v.mipInt.value=M-n;const P=this._sizeLods[s],N=3*P*(s>M-Gr?s-M+Gr:0),O=4*(this._cubeSize-P);Oo(e,N,O,3*P,2*P),u.setRenderTarget(e),u.render(p,ml)}}function l0(r){const t=[],e=[],n=[];let s=r;const o=r-Gr+1+fh.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let u=1/c;l>r-Gr?u=fh[l-r+Gr-1]:l===0&&(u=0),n.push(u);const d=1/(c-2),f=-d,p=1+d,v=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,y=3,g=2,_=1,S=new Float32Array(y*x*m),M=new Float32Array(g*x*m),P=new Float32Array(_*x*m);for(let O=0;O<m;O++){const U=O%3*2/3-1,H=O>2?0:-1,D=[U,H,0,U+2/3,H,0,U+2/3,H+1,0,U,H,0,U+2/3,H+1,0,U,H+1,0];S.set(D,y*x*O),M.set(v,g*x*O);const R=[O,O,O,O,O,O];P.set(R,_*x*O)}const N=new He;N.setAttribute("position",new Tn(S,y)),N.setAttribute("uv",new Tn(M,g)),N.setAttribute("faceIndex",new Tn(P,_)),t.push(N),s>Gr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function _h(r,t,e){const n=new ir(r,t,e);return n.texture.mapping=ha,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Oo(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function c0(r,t,e){const n=new Float32Array(Ji),s=new Q(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cc(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function vh(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cc(),fragmentShader:`

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
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function yh(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ri,depthTest:!1,depthWrite:!1})}function cc(){return`

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
	`}function u0(r){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const u=c.mapping,d=u===Fl||u===Hl,f=u===Jr||u===Qr;if(d||f){let p=t.get(c);const v=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==v)return e===null&&(e=new gh(r)),p=d?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const m=c.image;return d&&m&&m.height>0||f&&m&&s(m)?(e===null&&(e=new gh(r)),p=d?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function s(c){let u=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&u++;return u===d}function o(c){const u=c.target;u.removeEventListener("dispose",o);const d=t.get(u);d!==void 0&&(t.delete(u),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function h0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function d0(r,t,e,n){const s={},o=new WeakMap;function l(p){const v=p.target;v.index!==null&&t.remove(v.index);for(const x in v.attributes)t.remove(v.attributes[x]);for(const x in v.morphAttributes){const y=v.morphAttributes[x];for(let g=0,_=y.length;g<_;g++)t.remove(y[g])}v.removeEventListener("dispose",l),delete s[v.id];const m=o.get(v);m&&(t.remove(m),o.delete(v)),n.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,e.memory.geometries--}function c(p,v){return s[v.id]===!0||(v.addEventListener("dispose",l),s[v.id]=!0,e.memory.geometries++),v}function u(p){const v=p.attributes;for(const x in v)t.update(v[x],r.ARRAY_BUFFER);const m=p.morphAttributes;for(const x in m){const y=m[x];for(let g=0,_=y.length;g<_;g++)t.update(y[g],r.ARRAY_BUFFER)}}function d(p){const v=[],m=p.index,x=p.attributes.position;let y=0;if(m!==null){const S=m.array;y=m.version;for(let M=0,P=S.length;M<P;M+=3){const N=S[M+0],O=S[M+1],U=S[M+2];v.push(N,O,O,U,U,N)}}else if(x!==void 0){const S=x.array;y=x.version;for(let M=0,P=S.length/3-1;M<P;M+=3){const N=M+0,O=M+1,U=M+2;v.push(N,O,O,U,U,N)}}else return;const g=new(Td(v)?Dd:Id)(v,1);g.version=y;const _=o.get(p);_&&t.remove(_),o.set(p,g)}function f(p){const v=o.get(p);if(v){const m=p.index;m!==null&&v.version<m.version&&d(p)}else d(p);return o.get(p)}return{get:c,update:u,getWireframeAttribute:f}}function f0(r,t,e){let n;function s(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,v){r.drawElements(n,v,o,p*l),e.update(v,n,1)}function d(p,v,m){m!==0&&(r.drawElementsInstanced(n,v,o,p*l,m),e.update(v,n,m))}function f(p,v,m){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<m;y++)this.render(p[y]/l,v[y]);else{x.multiDrawElementsWEBGL(n,v,0,o,p,0,m);let y=0;for(let g=0;g<m;g++)y+=v[g];e.update(y,n,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function p0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case r.TRIANGLES:e.triangles+=c*(o/3);break;case r.LINES:e.lines+=c*(o/2);break;case r.LINE_STRIP:e.lines+=c*(o-1);break;case r.LINE_LOOP:e.lines+=c*o;break;case r.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function m0(r,t,e){const n=new WeakMap,s=new je;function o(l,c,u){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let v=n.get(c);if(v===void 0||v.count!==p){let D=function(){U.dispose(),n.delete(c),c.removeEventListener("dispose",D)};v!==void 0&&v.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],_=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let M=0;m===!0&&(M=1),x===!0&&(M=2),y===!0&&(M=3);let P=c.attributes.position.count*M,N=1;P>t.maxTextureSize&&(N=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const O=new Float32Array(P*N*4*p),U=new Cd(O,P,N,p);U.type=Pi,U.needsUpdate=!0;const H=M*4;for(let R=0;R<p;R++){const W=g[R],k=_[R],F=S[R],C=P*N*4*R;for(let Z=0;Z<W.count;Z++){const it=Z*H;m===!0&&(s.fromBufferAttribute(W,Z),O[C+it+0]=s.x,O[C+it+1]=s.y,O[C+it+2]=s.z,O[C+it+3]=0),x===!0&&(s.fromBufferAttribute(k,Z),O[C+it+4]=s.x,O[C+it+5]=s.y,O[C+it+6]=s.z,O[C+it+7]=0),y===!0&&(s.fromBufferAttribute(F,Z),O[C+it+8]=s.x,O[C+it+9]=s.y,O[C+it+10]=s.z,O[C+it+11]=F.itemSize===4?s.w:1)}}v={count:p,texture:U,size:new yt(P,N)},n.set(c,v),c.addEventListener("dispose",D)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)u.getUniforms().setValue(r,"morphTexture",l.morphTexture,e);else{let m=0;for(let y=0;y<d.length;y++)m+=d[y];const x=c.morphTargetsRelative?1:1-m;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",d)}u.getUniforms().setValue(r,"morphTargetsTexture",v.texture,e),u.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:o}}function g0(r,t,e,n){let s=new WeakMap;function o(u){const d=n.render.frame,f=u.geometry,p=t.get(u,f);if(s.get(p)!==d&&(t.update(p),s.set(p,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),s.get(u)!==d&&(e.update(u.instanceMatrix,r.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,r.ARRAY_BUFFER),s.set(u,d))),u.isSkinnedMesh){const v=u.skeleton;s.get(v)!==d&&(v.update(),s.set(v,d))}return p}function l(){s=new WeakMap}function c(u){const d=u.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:l}}class Bd extends hn{constructor(t,e,n,s,o,l,c,u,d,f){if(f=f!==void 0?f:jr,f!==jr&&f!==Bs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===jr&&(n=ts),n===void 0&&f===Bs&&(n=Zs),super(null,s,o,l,c,u,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:In,this.minFilter=u!==void 0?u:In,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Fd=new hn,Hd=new Bd(1,1);Hd.compareFunction=Ed;const Vd=new Cd,Gd=new eg,Wd=new Ud,xh=[],bh=[],wh=new Float32Array(16),Mh=new Float32Array(9),Sh=new Float32Array(4);function is(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let o=xh[s];if(o===void 0&&(o=new Float32Array(s),xh[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,r[l].toArray(o,c)}return o}function Be(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Fe(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function pa(r,t){let e=bh[t];e===void 0&&(e=new Int32Array(t),bh[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function _0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function v0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;r.uniform2fv(this.addr,t),Fe(e,t)}}function y0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;r.uniform3fv(this.addr,t),Fe(e,t)}}function x0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;r.uniform4fv(this.addr,t),Fe(e,t)}}function b0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Fe(e,t)}else{if(Be(e,n))return;Sh.set(n),r.uniformMatrix2fv(this.addr,!1,Sh),Fe(e,n)}}function w0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Fe(e,t)}else{if(Be(e,n))return;Mh.set(n),r.uniformMatrix3fv(this.addr,!1,Mh),Fe(e,n)}}function M0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Fe(e,t)}else{if(Be(e,n))return;wh.set(n),r.uniformMatrix4fv(this.addr,!1,wh),Fe(e,n)}}function S0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function E0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;r.uniform2iv(this.addr,t),Fe(e,t)}}function T0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;r.uniform3iv(this.addr,t),Fe(e,t)}}function A0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;r.uniform4iv(this.addr,t),Fe(e,t)}}function C0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function L0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;r.uniform2uiv(this.addr,t),Fe(e,t)}}function P0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;r.uniform3uiv(this.addr,t),Fe(e,t)}}function R0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;r.uniform4uiv(this.addr,t),Fe(e,t)}}function I0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);const o=this.type===r.SAMPLER_2D_SHADOW?Hd:Fd;e.setTexture2D(t||o,s)}function D0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Gd,s)}function N0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Wd,s)}function O0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Vd,s)}function U0(r){switch(r){case 5126:return _0;case 35664:return v0;case 35665:return y0;case 35666:return x0;case 35674:return b0;case 35675:return w0;case 35676:return M0;case 5124:case 35670:return S0;case 35667:case 35671:return E0;case 35668:case 35672:return T0;case 35669:case 35673:return A0;case 5125:return C0;case 36294:return L0;case 36295:return P0;case 36296:return R0;case 35678:case 36198:case 36298:case 36306:case 35682:return I0;case 35679:case 36299:case 36307:return D0;case 35680:case 36300:case 36308:case 36293:return N0;case 36289:case 36303:case 36311:case 36292:return O0}}function k0(r,t){r.uniform1fv(this.addr,t)}function z0(r,t){const e=is(t,this.size,2);r.uniform2fv(this.addr,e)}function B0(r,t){const e=is(t,this.size,3);r.uniform3fv(this.addr,e)}function F0(r,t){const e=is(t,this.size,4);r.uniform4fv(this.addr,e)}function H0(r,t){const e=is(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function V0(r,t){const e=is(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function G0(r,t){const e=is(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function W0(r,t){r.uniform1iv(this.addr,t)}function Z0(r,t){r.uniform2iv(this.addr,t)}function X0(r,t){r.uniform3iv(this.addr,t)}function q0(r,t){r.uniform4iv(this.addr,t)}function j0(r,t){r.uniform1uiv(this.addr,t)}function Y0(r,t){r.uniform2uiv(this.addr,t)}function $0(r,t){r.uniform3uiv(this.addr,t)}function K0(r,t){r.uniform4uiv(this.addr,t)}function J0(r,t,e){const n=this.cache,s=t.length,o=pa(e,s);Be(n,o)||(r.uniform1iv(this.addr,o),Fe(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||Fd,o[l])}function Q0(r,t,e){const n=this.cache,s=t.length,o=pa(e,s);Be(n,o)||(r.uniform1iv(this.addr,o),Fe(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||Gd,o[l])}function ty(r,t,e){const n=this.cache,s=t.length,o=pa(e,s);Be(n,o)||(r.uniform1iv(this.addr,o),Fe(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||Wd,o[l])}function ey(r,t,e){const n=this.cache,s=t.length,o=pa(e,s);Be(n,o)||(r.uniform1iv(this.addr,o),Fe(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||Vd,o[l])}function ny(r){switch(r){case 5126:return k0;case 35664:return z0;case 35665:return B0;case 35666:return F0;case 35674:return H0;case 35675:return V0;case 35676:return G0;case 5124:case 35670:return W0;case 35667:case 35671:return Z0;case 35668:case 35672:return X0;case 35669:case 35673:return q0;case 5125:return j0;case 36294:return Y0;case 36295:return $0;case 36296:return K0;case 35678:case 36198:case 36298:case 36306:case 35682:return J0;case 35679:case 36299:case 36307:return Q0;case 35680:case 36300:case 36308:case 36293:return ty;case 36289:case 36303:case 36311:case 36292:return ey}}class iy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=U0(e.type)}}class ry{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=ny(e.type)}}class sy{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const xl=/(\w+)(\])?(\[|\.)?/g;function Eh(r,t){r.seq.push(t),r.map[t.id]=t}function oy(r,t,e){const n=r.name,s=n.length;for(xl.lastIndex=0;;){const o=xl.exec(n),l=xl.lastIndex;let c=o[1];const u=o[2]==="]",d=o[3];if(u&&(c=c|0),d===void 0||d==="["&&l+2===s){Eh(e,d===void 0?new iy(c,r,t):new ry(c,r,t));break}else{let p=e.map[c];p===void 0&&(p=new sy(c),Eh(e,p)),e=p}}}class qo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);oy(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],u=n[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function Th(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const ay=37297;let ly=0;function cy(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function uy(r){const t=ge.getPrimaries(ge.workingColorSpace),e=ge.getPrimaries(r);let n;switch(t===e?n="":t===ta&&e===Qo?n="LinearDisplayP3ToLinearSRGB":t===Qo&&e===ta&&(n="LinearSRGBToLinearDisplayP3"),r){case Ui:case da:return[n,"LinearTransferOETF"];case Kn:case oc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Ah(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+cy(r.getShaderSource(t),l)}else return s}function hy(r,t){const e=uy(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function dy(r,t){let e;switch(t){case md:e="Linear";break;case ym:e="Reinhard";break;case xm:e="OptimizedCineon";break;case bm:e="ACESFilmic";break;case Mm:e="AgX";break;case Sm:e="Neutral";break;case wm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function fy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ps).join(`
`)}function py(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function my(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=r.getActiveAttrib(t,s),l=o.name;let c=1;o.type===r.FLOAT_MAT2&&(c=2),o.type===r.FLOAT_MAT3&&(c=3),o.type===r.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:r.getAttribLocation(t,l),locationSize:c}}return e}function Ps(r){return r!==""}function Ch(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Lh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const gy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zl(r){return r.replace(gy,vy)}const _y=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function vy(r,t){let e=le[t];if(e===void 0){const n=_y.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Zl(e)}const yy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ph(r){return r.replace(yy,xy)}function xy(r,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Rh(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function by(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===pd?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Zp?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===fi&&(t="SHADOWMAP_TYPE_VSM"),t}function wy(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Jr:case Qr:t="ENVMAP_TYPE_CUBE";break;case ha:t="ENVMAP_TYPE_CUBE_UV";break}return t}function My(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Qr:t="ENVMAP_MODE_REFRACTION";break}return t}function Sy(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case rc:t="ENVMAP_BLENDING_MULTIPLY";break;case _m:t="ENVMAP_BLENDING_MIX";break;case vm:t="ENVMAP_BLENDING_ADD";break}return t}function Ey(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Ty(r,t,e,n){const s=r.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const u=by(e),d=wy(e),f=My(e),p=Sy(e),v=Ey(e),m=fy(e),x=py(o),y=s.createProgram();let g,_,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ps).join(`
`),g.length>0&&(g+=`
`),_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ps).join(`
`),_.length>0&&(_+=`
`)):(g=[Rh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ps).join(`
`),_=[Rh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ii?"#define TONE_MAPPING":"",e.toneMapping!==Ii?le.tonemapping_pars_fragment:"",e.toneMapping!==Ii?dy("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,hy("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ps).join(`
`)),l=Zl(l),l=Ch(l,e),l=Lh(l,e),c=Zl(c),c=Ch(c,e),c=Lh(c,e),l=Ph(l),c=Ph(c),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["#define varying in",e.glslVersion===qu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const M=S+g+l,P=S+_+c,N=Th(s,s.VERTEX_SHADER,M),O=Th(s,s.FRAGMENT_SHADER,P);s.attachShader(y,N),s.attachShader(y,O),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function U(W){if(r.debug.checkShaderErrors){const k=s.getProgramInfoLog(y).trim(),F=s.getShaderInfoLog(N).trim(),C=s.getShaderInfoLog(O).trim();let Z=!0,it=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,y,N,O);else{const ot=Ah(s,N,"vertex"),j=Ah(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+k+`
`+ot+`
`+j)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||C==="")&&(it=!1);it&&(W.diagnostics={runnable:Z,programLog:k,vertexShader:{log:F,prefix:g},fragmentShader:{log:C,prefix:_}})}s.deleteShader(N),s.deleteShader(O),H=new qo(s,y),D=my(s,y)}let H;this.getUniforms=function(){return H===void 0&&U(this),H};let D;this.getAttributes=function(){return D===void 0&&U(this),D};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(y,ay)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ly++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=O,this}let Ay=0;class Cy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ly(t),e.set(t,n)),n}}class Ly{constructor(t){this.id=Ay++,this.code=t,this.usedTimes=0}}function Py(r,t,e,n,s,o,l){const c=new Ld,u=new Cy,d=new Set,f=[],p=s.logarithmicDepthBuffer,v=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(D){return d.add(D),D===0?"uv":`uv${D}`}function g(D,R,W,k,F){const C=k.fog,Z=F.geometry,it=D.isMeshStandardMaterial?k.environment:null,ot=(D.isMeshStandardMaterial?e:t).get(D.envMap||it),j=ot&&ot.mapping===ha?ot.image.height:null,rt=x[D.type];D.precision!==null&&(m=s.getMaxPrecision(D.precision),m!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",m,"instead."));const at=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,q=at!==void 0?at.length:0;let tt=0;Z.morphAttributes.position!==void 0&&(tt=1),Z.morphAttributes.normal!==void 0&&(tt=2),Z.morphAttributes.color!==void 0&&(tt=3);let Lt,J,nt,wt;if(rt){const Ie=Jn[rt];Lt=Ie.vertexShader,J=Ie.fragmentShader}else Lt=D.vertexShader,J=D.fragmentShader,u.update(D),nt=u.getVertexShaderID(D),wt=u.getFragmentShaderID(D);const St=r.getRenderTarget(),Pt=F.isInstancedMesh===!0,It=F.isBatchedMesh===!0,kt=!!D.map,st=!!D.matcap,vt=!!ot,xt=!!D.aoMap,E=!!D.lightMap,et=!!D.bumpMap,$=!!D.normalMap,A=!!D.displacementMap,w=!!D.emissiveMap,B=!!D.metalnessMap,X=!!D.roughnessMap,K=D.anisotropy>0,G=D.clearcoat>0,ft=D.iridescence>0,lt=D.sheen>0,pt=D.transmission>0,Tt=K&&!!D.anisotropyMap,Et=G&&!!D.clearcoatMap,At=G&&!!D.clearcoatNormalMap,Ht=G&&!!D.clearcoatRoughnessMap,zt=ft&&!!D.iridescenceMap,Dt=ft&&!!D.iridescenceThicknessMap,Kt=lt&&!!D.sheenColorMap,Vt=lt&&!!D.sheenRoughnessMap,oe=!!D.specularMap,ae=!!D.specularColorMap,te=!!D.specularIntensityMap,Ft=pt&&!!D.transmissionMap,I=pt&&!!D.thicknessMap,ht=!!D.gradientMap,Mt=!!D.alphaMap,Rt=D.alphaTest>0,Nt=!!D.alphaHash,re=!!D.extensions;let ue=Ii;D.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(ue=r.toneMapping);const _e={shaderID:rt,shaderType:D.type,shaderName:D.name,vertexShader:Lt,fragmentShader:J,defines:D.defines,customVertexShaderID:nt,customFragmentShaderID:wt,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:m,batching:It,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Ui,alphaToCoverage:!!D.alphaToCoverage,map:kt,matcap:st,envMap:vt,envMapMode:vt&&ot.mapping,envMapCubeUVHeight:j,aoMap:xt,lightMap:E,bumpMap:et,normalMap:$,displacementMap:v&&A,emissiveMap:w,normalMapObjectSpace:$&&D.normalMapType===zm,normalMapTangentSpace:$&&D.normalMapType===sc,metalnessMap:B,roughnessMap:X,anisotropy:K,anisotropyMap:Tt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:At,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:zt,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Vt,specularMap:oe,specularColorMap:ae,specularIntensityMap:te,transmission:pt,transmissionMap:Ft,thicknessMap:I,gradientMap:ht,opaque:D.transparent===!1&&D.blending===qr&&D.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Rt,alphaHash:Nt,combine:D.combine,mapUv:kt&&y(D.map.channel),aoMapUv:xt&&y(D.aoMap.channel),lightMapUv:E&&y(D.lightMap.channel),bumpMapUv:et&&y(D.bumpMap.channel),normalMapUv:$&&y(D.normalMap.channel),displacementMapUv:A&&y(D.displacementMap.channel),emissiveMapUv:w&&y(D.emissiveMap.channel),metalnessMapUv:B&&y(D.metalnessMap.channel),roughnessMapUv:X&&y(D.roughnessMap.channel),anisotropyMapUv:Tt&&y(D.anisotropyMap.channel),clearcoatMapUv:Et&&y(D.clearcoatMap.channel),clearcoatNormalMapUv:At&&y(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(D.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&y(D.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&y(D.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(D.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&y(D.sheenRoughnessMap.channel),specularMapUv:oe&&y(D.specularMap.channel),specularColorMapUv:ae&&y(D.specularColorMap.channel),specularIntensityMapUv:te&&y(D.specularIntensityMap.channel),transmissionMapUv:Ft&&y(D.transmissionMap.channel),thicknessMapUv:I&&y(D.thicknessMap.channel),alphaMapUv:Mt&&y(D.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&($||K),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(kt||Mt),fog:!!C,useFog:D.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:tt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:ue,useLegacyLights:r._useLegacyLights,decodeVideoTexture:kt&&D.map.isVideoTexture===!0&&ge.getTransfer(D.map.colorSpace)===be,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===gn,flipSided:D.side===vn,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:re&&D.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:re&&D.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return _e.vertexUv1s=d.has(1),_e.vertexUv2s=d.has(2),_e.vertexUv3s=d.has(3),d.clear(),_e}function _(D){const R=[];if(D.shaderID?R.push(D.shaderID):(R.push(D.customVertexShaderID),R.push(D.customFragmentShaderID)),D.defines!==void 0)for(const W in D.defines)R.push(W),R.push(D.defines[W]);return D.isRawShaderMaterial===!1&&(S(R,D),M(R,D),R.push(r.outputColorSpace)),R.push(D.customProgramCacheKey),R.join()}function S(D,R){D.push(R.precision),D.push(R.outputColorSpace),D.push(R.envMapMode),D.push(R.envMapCubeUVHeight),D.push(R.mapUv),D.push(R.alphaMapUv),D.push(R.lightMapUv),D.push(R.aoMapUv),D.push(R.bumpMapUv),D.push(R.normalMapUv),D.push(R.displacementMapUv),D.push(R.emissiveMapUv),D.push(R.metalnessMapUv),D.push(R.roughnessMapUv),D.push(R.anisotropyMapUv),D.push(R.clearcoatMapUv),D.push(R.clearcoatNormalMapUv),D.push(R.clearcoatRoughnessMapUv),D.push(R.iridescenceMapUv),D.push(R.iridescenceThicknessMapUv),D.push(R.sheenColorMapUv),D.push(R.sheenRoughnessMapUv),D.push(R.specularMapUv),D.push(R.specularColorMapUv),D.push(R.specularIntensityMapUv),D.push(R.transmissionMapUv),D.push(R.thicknessMapUv),D.push(R.combine),D.push(R.fogExp2),D.push(R.sizeAttenuation),D.push(R.morphTargetsCount),D.push(R.morphAttributeCount),D.push(R.numDirLights),D.push(R.numPointLights),D.push(R.numSpotLights),D.push(R.numSpotLightMaps),D.push(R.numHemiLights),D.push(R.numRectAreaLights),D.push(R.numDirLightShadows),D.push(R.numPointLightShadows),D.push(R.numSpotLightShadows),D.push(R.numSpotLightShadowsWithMaps),D.push(R.numLightProbes),D.push(R.shadowMapType),D.push(R.toneMapping),D.push(R.numClippingPlanes),D.push(R.numClipIntersection),D.push(R.depthPacking)}function M(D,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),D.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.skinning&&c.enable(4),R.morphTargets&&c.enable(5),R.morphNormals&&c.enable(6),R.morphColors&&c.enable(7),R.premultipliedAlpha&&c.enable(8),R.shadowMapEnabled&&c.enable(9),R.useLegacyLights&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.alphaToCoverage&&c.enable(20),D.push(c.mask)}function P(D){const R=x[D.type];let W;if(R){const k=Jn[R];W=fg.clone(k.uniforms)}else W=D.uniforms;return W}function N(D,R){let W;for(let k=0,F=f.length;k<F;k++){const C=f[k];if(C.cacheKey===R){W=C,++W.usedTimes;break}}return W===void 0&&(W=new Ty(r,R,D,o),f.push(W)),W}function O(D){if(--D.usedTimes===0){const R=f.indexOf(D);f[R]=f[f.length-1],f.pop(),D.destroy()}}function U(D){u.remove(D)}function H(){u.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:P,acquireProgram:N,releaseProgram:O,releaseShaderCache:U,programs:f,dispose:H}}function Ry(){let r=new WeakMap;function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function e(o){r.delete(o)}function n(o,l,c){r.get(o)[l]=c}function s(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Iy(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Ih(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Dh(){const r=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(p,v,m,x,y,g){let _=r[t];return _===void 0?(_={id:p.id,object:p,geometry:v,material:m,groupOrder:x,renderOrder:p.renderOrder,z:y,group:g},r[t]=_):(_.id=p.id,_.object=p,_.geometry=v,_.material=m,_.groupOrder=x,_.renderOrder=p.renderOrder,_.z=y,_.group=g),t++,_}function c(p,v,m,x,y,g){const _=l(p,v,m,x,y,g);m.transmission>0?n.push(_):m.transparent===!0?s.push(_):e.push(_)}function u(p,v,m,x,y,g){const _=l(p,v,m,x,y,g);m.transmission>0?n.unshift(_):m.transparent===!0?s.unshift(_):e.unshift(_)}function d(p,v){e.length>1&&e.sort(p||Iy),n.length>1&&n.sort(v||Ih),s.length>1&&s.sort(v||Ih)}function f(){for(let p=t,v=r.length;p<v;p++){const m=r[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:u,finish:f,sort:d}}function Dy(){let r=new WeakMap;function t(n,s){const o=r.get(n);let l;return o===void 0?(l=new Dh,r.set(n,[l])):s>=o.length?(l=new Dh,o.push(l)):l=o[s],l}function e(){r=new WeakMap}return{get:t,dispose:e}}function Ny(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Q,color:new Qt};break;case"SpotLight":e={position:new Q,direction:new Q,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Q,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Q,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return r[t.id]=e,e}}}function Oy(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Uy=0;function ky(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function zy(r){const t=new Ny,e=Oy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new Q);const s=new Q,o=new Ae,l=new Ae;function c(d,f){let p=0,v=0,m=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let x=0,y=0,g=0,_=0,S=0,M=0,P=0,N=0,O=0,U=0,H=0;d.sort(ky);const D=f===!0?Math.PI:1;for(let W=0,k=d.length;W<k;W++){const F=d[W],C=F.color,Z=F.intensity,it=F.distance,ot=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)p+=C.r*Z*D,v+=C.g*Z*D,m+=C.b*Z*D;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],Z);H++}else if(F.isDirectionalLight){const j=t.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity*D),F.castShadow){const rt=F.shadow,at=e.get(F);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,n.directionalShadow[x]=at,n.directionalShadowMap[x]=ot,n.directionalShadowMatrix[x]=F.shadow.matrix,M++}n.directional[x]=j,x++}else if(F.isSpotLight){const j=t.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(C).multiplyScalar(Z*D),j.distance=it,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[g]=j;const rt=F.shadow;if(F.map&&(n.spotLightMap[O]=F.map,O++,rt.updateMatrices(F),F.castShadow&&U++),n.spotLightMatrix[g]=rt.matrix,F.castShadow){const at=e.get(F);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,n.spotShadow[g]=at,n.spotShadowMap[g]=ot,N++}g++}else if(F.isRectAreaLight){const j=t.get(F);j.color.copy(C).multiplyScalar(Z),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),n.rectArea[_]=j,_++}else if(F.isPointLight){const j=t.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity*D),j.distance=F.distance,j.decay=F.decay,F.castShadow){const rt=F.shadow,at=e.get(F);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,at.shadowCameraNear=rt.camera.near,at.shadowCameraFar=rt.camera.far,n.pointShadow[y]=at,n.pointShadowMap[y]=ot,n.pointShadowMatrix[y]=F.shadow.matrix,P++}n.point[y]=j,y++}else if(F.isHemisphereLight){const j=t.get(F);j.skyColor.copy(F.color).multiplyScalar(Z*D),j.groundColor.copy(F.groundColor).multiplyScalar(Z*D),n.hemi[S]=j,S++}}_>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=v,n.ambient[2]=m;const R=n.hash;(R.directionalLength!==x||R.pointLength!==y||R.spotLength!==g||R.rectAreaLength!==_||R.hemiLength!==S||R.numDirectionalShadows!==M||R.numPointShadows!==P||R.numSpotShadows!==N||R.numSpotMaps!==O||R.numLightProbes!==H)&&(n.directional.length=x,n.spot.length=g,n.rectArea.length=_,n.point.length=y,n.hemi.length=S,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=N,n.spotShadowMap.length=N,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=N+O-U,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=H,R.directionalLength=x,R.pointLength=y,R.spotLength=g,R.rectAreaLength=_,R.hemiLength=S,R.numDirectionalShadows=M,R.numPointShadows=P,R.numSpotShadows=N,R.numSpotMaps=O,R.numLightProbes=H,n.version=Uy++)}function u(d,f){let p=0,v=0,m=0,x=0,y=0;const g=f.matrixWorldInverse;for(let _=0,S=d.length;_<S;_++){const M=d[_];if(M.isDirectionalLight){const P=n.directional[p];P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),p++}else if(M.isSpotLight){const P=n.spot[m];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(g),P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),m++}else if(M.isRectAreaLight){const P=n.rectArea[x];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(g),l.identity(),o.copy(M.matrixWorld),o.premultiply(g),l.extractRotation(o),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(l),P.halfHeight.applyMatrix4(l),x++}else if(M.isPointLight){const P=n.point[v];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(g),v++}else if(M.isHemisphereLight){const P=n.hemi[y];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(g),y++}}}return{setup:c,setupView:u,state:n}}function Nh(r){const t=new zy(r),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function u(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l}}function By(r){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new Nh(r),t.set(s,[c])):o>=l.length?(c=new Nh(r),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class Fy extends cr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Um,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Hy extends cr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Vy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Gy=`uniform sampler2D shadow_pass;
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
}`;function Wy(r,t,e){let n=new lc;const s=new yt,o=new yt,l=new je,c=new Fy({depthPacking:km}),u=new Hy,d={},f=e.maxTextureSize,p={[Ni]:vn,[vn]:Ni,[gn]:gn},v=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:Vy,fragmentShader:Gy}),m=v.clone();m.defines.HORIZONTAL_PASS=1;const x=new He;x.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ze(x,v),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pd;let _=this.type;this.render=function(O,U,H){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||O.length===0)return;const D=r.getRenderTarget(),R=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),k=r.state;k.setBlending(Ri),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const F=_!==fi&&this.type===fi,C=_===fi&&this.type!==fi;for(let Z=0,it=O.length;Z<it;Z++){const ot=O[Z],j=ot.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const rt=j.getFrameExtents();if(s.multiply(rt),o.copy(j.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/rt.x),s.x=o.x*rt.x,j.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/rt.y),s.y=o.y*rt.y,j.mapSize.y=o.y)),j.map===null||F===!0||C===!0){const q=this.type!==fi?{minFilter:In,magFilter:In}:{};j.map!==null&&j.map.dispose(),j.map=new ir(s.x,s.y,q),j.map.texture.name=ot.name+".shadowMap",j.camera.updateProjectionMatrix()}r.setRenderTarget(j.map),r.clear();const at=j.getViewportCount();for(let q=0;q<at;q++){const tt=j.getViewport(q);l.set(o.x*tt.x,o.y*tt.y,o.x*tt.z,o.y*tt.w),k.viewport(l),j.updateMatrices(ot,q),n=j.getFrustum(),P(U,H,j.camera,ot,this.type)}j.isPointLightShadow!==!0&&this.type===fi&&S(j,H),j.needsUpdate=!1}_=this.type,g.needsUpdate=!1,r.setRenderTarget(D,R,W)};function S(O,U){const H=t.update(y);v.defines.VSM_SAMPLES!==O.blurSamples&&(v.defines.VSM_SAMPLES=O.blurSamples,m.defines.VSM_SAMPLES=O.blurSamples,v.needsUpdate=!0,m.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ir(s.x,s.y)),v.uniforms.shadow_pass.value=O.map.texture,v.uniforms.resolution.value=O.mapSize,v.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(U,null,H,v,y,null),m.uniforms.shadow_pass.value=O.mapPass.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(U,null,H,m,y,null)}function M(O,U,H,D){let R=null;const W=H.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(W!==void 0)R=W;else if(R=H.isPointLight===!0?u:c,r.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const k=R.uuid,F=U.uuid;let C=d[k];C===void 0&&(C={},d[k]=C);let Z=C[F];Z===void 0&&(Z=R.clone(),C[F]=Z,U.addEventListener("dispose",N)),R=Z}if(R.visible=U.visible,R.wireframe=U.wireframe,D===fi?R.side=U.shadowSide!==null?U.shadowSide:U.side:R.side=U.shadowSide!==null?U.shadowSide:p[U.side],R.alphaMap=U.alphaMap,R.alphaTest=U.alphaTest,R.map=U.map,R.clipShadows=U.clipShadows,R.clippingPlanes=U.clippingPlanes,R.clipIntersection=U.clipIntersection,R.displacementMap=U.displacementMap,R.displacementScale=U.displacementScale,R.displacementBias=U.displacementBias,R.wireframeLinewidth=U.wireframeLinewidth,R.linewidth=U.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const k=r.properties.get(R);k.light=H}return R}function P(O,U,H,D,R){if(O.visible===!1)return;if(O.layers.test(U.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===fi)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,O.matrixWorld);const F=t.update(O),C=O.material;if(Array.isArray(C)){const Z=F.groups;for(let it=0,ot=Z.length;it<ot;it++){const j=Z[it],rt=C[j.materialIndex];if(rt&&rt.visible){const at=M(O,rt,D,R);O.onBeforeShadow(r,O,U,H,F,at,j),r.renderBufferDirect(H,null,F,at,O,j),O.onAfterShadow(r,O,U,H,F,at,j)}}}else if(C.visible){const Z=M(O,C,D,R);O.onBeforeShadow(r,O,U,H,F,Z,null),r.renderBufferDirect(H,null,F,Z,O,null),O.onAfterShadow(r,O,U,H,F,Z,null)}}const k=O.children;for(let F=0,C=k.length;F<C;F++)P(k[F],U,H,D,R)}function N(O){O.target.removeEventListener("dispose",N);for(const H in d){const D=d[H],R=O.target.uuid;R in D&&(D[R].dispose(),delete D[R])}}}function Zy(r){function t(){let I=!1;const ht=new je;let Mt=null;const Rt=new je(0,0,0,0);return{setMask:function(Nt){Mt!==Nt&&!I&&(r.colorMask(Nt,Nt,Nt,Nt),Mt=Nt)},setLocked:function(Nt){I=Nt},setClear:function(Nt,re,ue,_e,Ie){Ie===!0&&(Nt*=_e,re*=_e,ue*=_e),ht.set(Nt,re,ue,_e),Rt.equals(ht)===!1&&(r.clearColor(Nt,re,ue,_e),Rt.copy(ht))},reset:function(){I=!1,Mt=null,Rt.set(-1,0,0,0)}}}function e(){let I=!1,ht=null,Mt=null,Rt=null;return{setTest:function(Nt){Nt?wt(r.DEPTH_TEST):St(r.DEPTH_TEST)},setMask:function(Nt){ht!==Nt&&!I&&(r.depthMask(Nt),ht=Nt)},setFunc:function(Nt){if(Mt!==Nt){switch(Nt){case um:r.depthFunc(r.NEVER);break;case hm:r.depthFunc(r.ALWAYS);break;case dm:r.depthFunc(r.LESS);break;case $o:r.depthFunc(r.LEQUAL);break;case fm:r.depthFunc(r.EQUAL);break;case pm:r.depthFunc(r.GEQUAL);break;case mm:r.depthFunc(r.GREATER);break;case gm:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Mt=Nt}},setLocked:function(Nt){I=Nt},setClear:function(Nt){Rt!==Nt&&(r.clearDepth(Nt),Rt=Nt)},reset:function(){I=!1,ht=null,Mt=null,Rt=null}}}function n(){let I=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,_e=null,Ie=null;return{setTest:function(me){I||(me?wt(r.STENCIL_TEST):St(r.STENCIL_TEST))},setMask:function(me){ht!==me&&!I&&(r.stencilMask(me),ht=me)},setFunc:function(me,Ce,Se){(Mt!==me||Rt!==Ce||Nt!==Se)&&(r.stencilFunc(me,Ce,Se),Mt=me,Rt=Ce,Nt=Se)},setOp:function(me,Ce,Se){(re!==me||ue!==Ce||_e!==Se)&&(r.stencilOp(me,Ce,Se),re=me,ue=Ce,_e=Se)},setLocked:function(me){I=me},setClear:function(me){Ie!==me&&(r.clearStencil(me),Ie=me)},reset:function(){I=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,_e=null,Ie=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,u=new WeakMap;let d={},f={},p=new WeakMap,v=[],m=null,x=!1,y=null,g=null,_=null,S=null,M=null,P=null,N=null,O=new Qt(0,0,0),U=0,H=!1,D=null,R=null,W=null,k=null,F=null;const C=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,it=0;const ot=r.getParameter(r.VERSION);ot.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(ot)[1]),Z=it>=1):ot.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),Z=it>=2);let j=null,rt={};const at=r.getParameter(r.SCISSOR_BOX),q=r.getParameter(r.VIEWPORT),tt=new je().fromArray(at),Lt=new je().fromArray(q);function J(I,ht,Mt,Rt){const Nt=new Uint8Array(4),re=r.createTexture();r.bindTexture(I,re),r.texParameteri(I,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(I,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ue=0;ue<Mt;ue++)I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY?r.texImage3D(ht,0,r.RGBA,1,1,Rt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(ht+ue,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return re}const nt={};nt[r.TEXTURE_2D]=J(r.TEXTURE_2D,r.TEXTURE_2D,1),nt[r.TEXTURE_CUBE_MAP]=J(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[r.TEXTURE_2D_ARRAY]=J(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),nt[r.TEXTURE_3D]=J(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),wt(r.DEPTH_TEST),o.setFunc($o),et(!1),$(gu),wt(r.CULL_FACE),xt(Ri);function wt(I){d[I]!==!0&&(r.enable(I),d[I]=!0)}function St(I){d[I]!==!1&&(r.disable(I),d[I]=!1)}function Pt(I,ht){return f[I]!==ht?(r.bindFramebuffer(I,ht),f[I]=ht,I===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ht),I===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ht),!0):!1}function It(I,ht){let Mt=v,Rt=!1;if(I){Mt=p.get(ht),Mt===void 0&&(Mt=[],p.set(ht,Mt));const Nt=I.textures;if(Mt.length!==Nt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let re=0,ue=Nt.length;re<ue;re++)Mt[re]=r.COLOR_ATTACHMENT0+re;Mt.length=Nt.length,Rt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Rt=!0);Rt&&r.drawBuffers(Mt)}function kt(I){return m!==I?(r.useProgram(I),m=I,!0):!1}const st={[Ki]:r.FUNC_ADD,[qp]:r.FUNC_SUBTRACT,[jp]:r.FUNC_REVERSE_SUBTRACT};st[Yp]=r.MIN,st[$p]=r.MAX;const vt={[Kp]:r.ZERO,[Jp]:r.ONE,[Qp]:r.SRC_COLOR,[zl]:r.SRC_ALPHA,[sm]:r.SRC_ALPHA_SATURATE,[im]:r.DST_COLOR,[em]:r.DST_ALPHA,[tm]:r.ONE_MINUS_SRC_COLOR,[Bl]:r.ONE_MINUS_SRC_ALPHA,[rm]:r.ONE_MINUS_DST_COLOR,[nm]:r.ONE_MINUS_DST_ALPHA,[om]:r.CONSTANT_COLOR,[am]:r.ONE_MINUS_CONSTANT_COLOR,[lm]:r.CONSTANT_ALPHA,[cm]:r.ONE_MINUS_CONSTANT_ALPHA};function xt(I,ht,Mt,Rt,Nt,re,ue,_e,Ie,me){if(I===Ri){x===!0&&(St(r.BLEND),x=!1);return}if(x===!1&&(wt(r.BLEND),x=!0),I!==Xp){if(I!==y||me!==H){if((g!==Ki||M!==Ki)&&(r.blendEquation(r.FUNC_ADD),g=Ki,M=Ki),me)switch(I){case qr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _u:r.blendFunc(r.ONE,r.ONE);break;case vu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yu:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case qr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _u:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case vu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case yu:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}_=null,S=null,P=null,N=null,O.set(0,0,0),U=0,y=I,H=me}return}Nt=Nt||ht,re=re||Mt,ue=ue||Rt,(ht!==g||Nt!==M)&&(r.blendEquationSeparate(st[ht],st[Nt]),g=ht,M=Nt),(Mt!==_||Rt!==S||re!==P||ue!==N)&&(r.blendFuncSeparate(vt[Mt],vt[Rt],vt[re],vt[ue]),_=Mt,S=Rt,P=re,N=ue),(_e.equals(O)===!1||Ie!==U)&&(r.blendColor(_e.r,_e.g,_e.b,Ie),O.copy(_e),U=Ie),y=I,H=!1}function E(I,ht){I.side===gn?St(r.CULL_FACE):wt(r.CULL_FACE);let Mt=I.side===vn;ht&&(Mt=!Mt),et(Mt),I.blending===qr&&I.transparent===!1?xt(Ri):xt(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),s.setMask(I.colorWrite);const Rt=I.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(I.stencilWriteMask),l.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),l.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),w(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?wt(r.SAMPLE_ALPHA_TO_COVERAGE):St(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(I){D!==I&&(I?r.frontFace(r.CW):r.frontFace(r.CCW),D=I)}function $(I){I!==Gp?(wt(r.CULL_FACE),I!==R&&(I===gu?r.cullFace(r.BACK):I===Wp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):St(r.CULL_FACE),R=I}function A(I){I!==W&&(Z&&r.lineWidth(I),W=I)}function w(I,ht,Mt){I?(wt(r.POLYGON_OFFSET_FILL),(k!==ht||F!==Mt)&&(r.polygonOffset(ht,Mt),k=ht,F=Mt)):St(r.POLYGON_OFFSET_FILL)}function B(I){I?wt(r.SCISSOR_TEST):St(r.SCISSOR_TEST)}function X(I){I===void 0&&(I=r.TEXTURE0+C-1),j!==I&&(r.activeTexture(I),j=I)}function K(I,ht,Mt){Mt===void 0&&(j===null?Mt=r.TEXTURE0+C-1:Mt=j);let Rt=rt[Mt];Rt===void 0&&(Rt={type:void 0,texture:void 0},rt[Mt]=Rt),(Rt.type!==I||Rt.texture!==ht)&&(j!==Mt&&(r.activeTexture(Mt),j=Mt),r.bindTexture(I,ht||nt[I]),Rt.type=I,Rt.texture=ht)}function G(){const I=rt[j];I!==void 0&&I.type!==void 0&&(r.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function ft(){try{r.compressedTexImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function lt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function pt(){try{r.texSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Tt(){try{r.texSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Et(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function At(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ht(){try{r.texStorage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function zt(){try{r.texStorage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Dt(){try{r.texImage2D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Vt(I){tt.equals(I)===!1&&(r.scissor(I.x,I.y,I.z,I.w),tt.copy(I))}function oe(I){Lt.equals(I)===!1&&(r.viewport(I.x,I.y,I.z,I.w),Lt.copy(I))}function ae(I,ht){let Mt=u.get(ht);Mt===void 0&&(Mt=new WeakMap,u.set(ht,Mt));let Rt=Mt.get(I);Rt===void 0&&(Rt=r.getUniformBlockIndex(ht,I.name),Mt.set(I,Rt))}function te(I,ht){const Rt=u.get(ht).get(I);c.get(ht)!==Rt&&(r.uniformBlockBinding(ht,Rt,I.__bindingPointIndex),c.set(ht,Rt))}function Ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},j=null,rt={},f={},p=new WeakMap,v=[],m=null,x=!1,y=null,g=null,_=null,S=null,M=null,P=null,N=null,O=new Qt(0,0,0),U=0,H=!1,D=null,R=null,W=null,k=null,F=null,tt.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:wt,disable:St,bindFramebuffer:Pt,drawBuffers:It,useProgram:kt,setBlending:xt,setMaterial:E,setFlipSided:et,setCullFace:$,setLineWidth:A,setPolygonOffset:w,setScissorTest:B,activeTexture:X,bindTexture:K,unbindTexture:G,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Kt,updateUBOMapping:ae,uniformBlockBinding:te,texStorage2D:Ht,texStorage3D:zt,texSubImage2D:pt,texSubImage3D:Tt,compressedTexSubImage2D:Et,compressedTexSubImage3D:At,scissor:Vt,viewport:oe,reset:Ft}}function Xy(r,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new yt,f=new WeakMap;let p;const v=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(A,w){return m?new OffscreenCanvas(A,w):na("canvas")}function y(A,w,B){let X=1;const K=$(A);if((K.width>B||K.height>B)&&(X=B/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const G=Math.floor(X*K.width),ft=Math.floor(X*K.height);p===void 0&&(p=x(G,ft));const lt=w?x(G,ft):p;return lt.width=G,lt.height=ft,lt.getContext("2d").drawImage(A,0,0,G,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+ft+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),A;return A}function g(A){return A.generateMipmaps&&A.minFilter!==In&&A.minFilter!==Fn}function _(A){r.generateMipmap(A)}function S(A,w,B,X,K=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let G=w;if(w===r.RED&&(B===r.FLOAT&&(G=r.R32F),B===r.HALF_FLOAT&&(G=r.R16F),B===r.UNSIGNED_BYTE&&(G=r.R8)),w===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.R8UI),B===r.UNSIGNED_SHORT&&(G=r.R16UI),B===r.UNSIGNED_INT&&(G=r.R32UI),B===r.BYTE&&(G=r.R8I),B===r.SHORT&&(G=r.R16I),B===r.INT&&(G=r.R32I)),w===r.RG&&(B===r.FLOAT&&(G=r.RG32F),B===r.HALF_FLOAT&&(G=r.RG16F),B===r.UNSIGNED_BYTE&&(G=r.RG8)),w===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.RG8UI),B===r.UNSIGNED_SHORT&&(G=r.RG16UI),B===r.UNSIGNED_INT&&(G=r.RG32UI),B===r.BYTE&&(G=r.RG8I),B===r.SHORT&&(G=r.RG16I),B===r.INT&&(G=r.RG32I)),w===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&(G=r.RGB9_E5),w===r.RGBA){const ft=K?Jo:ge.getTransfer(X);B===r.FLOAT&&(G=r.RGBA32F),B===r.HALF_FLOAT&&(G=r.RGBA16F),B===r.UNSIGNED_BYTE&&(G=ft===be?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(G=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(G=r.RGB5_A1)}return(G===r.R16F||G===r.R32F||G===r.RG16F||G===r.RG32F||G===r.RGBA16F||G===r.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function M(A,w){return g(A)===!0||A.isFramebufferTexture&&A.minFilter!==In&&A.minFilter!==Fn?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function P(A){const w=A.target;w.removeEventListener("dispose",P),O(w),w.isVideoTexture&&f.delete(w)}function N(A){const w=A.target;w.removeEventListener("dispose",N),H(w)}function O(A){const w=n.get(A);if(w.__webglInit===void 0)return;const B=A.source,X=v.get(B);if(X){const K=X[w.__cacheKey];K.usedTimes--,K.usedTimes===0&&U(A),Object.keys(X).length===0&&v.delete(B)}n.remove(A)}function U(A){const w=n.get(A);r.deleteTexture(w.__webglTexture);const B=A.source,X=v.get(B);delete X[w.__cacheKey],l.memory.textures--}function H(A){const w=n.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(w.__webglFramebuffer[X]))for(let K=0;K<w.__webglFramebuffer[X].length;K++)r.deleteFramebuffer(w.__webglFramebuffer[X][K]);else r.deleteFramebuffer(w.__webglFramebuffer[X]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[X])}else{if(Array.isArray(w.__webglFramebuffer))for(let X=0;X<w.__webglFramebuffer.length;X++)r.deleteFramebuffer(w.__webglFramebuffer[X]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let X=0;X<w.__webglColorRenderbuffer.length;X++)w.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[X]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const B=A.textures;for(let X=0,K=B.length;X<K;X++){const G=n.get(B[X]);G.__webglTexture&&(r.deleteTexture(G.__webglTexture),l.memory.textures--),n.remove(B[X])}n.remove(A)}let D=0;function R(){D=0}function W(){const A=D;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),D+=1,A}function k(A){const w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function F(A,w){const B=n.get(A);if(A.isVideoTexture&&E(A),A.isRenderTargetTexture===!1&&A.version>0&&B.__version!==A.version){const X=A.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(B,A,w);return}}e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+w)}function C(A,w){const B=n.get(A);if(A.version>0&&B.__version!==A.version){tt(B,A,w);return}e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+w)}function Z(A,w){const B=n.get(A);if(A.version>0&&B.__version!==A.version){tt(B,A,w);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+w)}function it(A,w){const B=n.get(A);if(A.version>0&&B.__version!==A.version){Lt(B,A,w);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+w)}const ot={[Vl]:r.REPEAT,[er]:r.CLAMP_TO_EDGE,[Gl]:r.MIRRORED_REPEAT},j={[In]:r.NEAREST,[Em]:r.NEAREST_MIPMAP_NEAREST,[po]:r.NEAREST_MIPMAP_LINEAR,[Fn]:r.LINEAR,[Wa]:r.LINEAR_MIPMAP_NEAREST,[nr]:r.LINEAR_MIPMAP_LINEAR},rt={[Bm]:r.NEVER,[Zm]:r.ALWAYS,[Fm]:r.LESS,[Ed]:r.LEQUAL,[Hm]:r.EQUAL,[Wm]:r.GEQUAL,[Vm]:r.GREATER,[Gm]:r.NOTEQUAL};function at(A,w){if(w.type===Pi&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Fn||w.magFilter===Wa||w.magFilter===po||w.magFilter===nr||w.minFilter===Fn||w.minFilter===Wa||w.minFilter===po||w.minFilter===nr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,ot[w.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,ot[w.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,ot[w.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,j[w.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,j[w.minFilter]),w.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,rt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===In||w.minFilter!==po&&w.minFilter!==nr||w.type===Pi&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function q(A,w){let B=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",P));const X=w.source;let K=v.get(X);K===void 0&&(K={},v.set(X,K));const G=k(w);if(G!==A.__cacheKey){K[G]===void 0&&(K[G]={texture:r.createTexture(),usedTimes:0},l.memory.textures++,B=!0),K[G].usedTimes++;const ft=K[A.__cacheKey];ft!==void 0&&(K[A.__cacheKey].usedTimes--,ft.usedTimes===0&&U(w)),A.__cacheKey=G,A.__webglTexture=K[G].texture}return B}function tt(A,w,B){let X=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(X=r.TEXTURE_3D);const K=q(A,w),G=w.source;e.bindTexture(X,A.__webglTexture,r.TEXTURE0+B);const ft=n.get(G);if(G.version!==ft.__version||K===!0){e.activeTexture(r.TEXTURE0+B);const lt=ge.getPrimaries(ge.workingColorSpace),pt=w.colorSpace===Li?null:ge.getPrimaries(w.colorSpace),Tt=w.colorSpace===Li||lt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=y(w.image,!1,s.maxTextureSize);Et=et(w,Et);const At=o.convert(w.format,w.colorSpace),Ht=o.convert(w.type);let zt=S(w.internalFormat,At,Ht,w.colorSpace,w.isVideoTexture);at(X,w);let Dt;const Kt=w.mipmaps,Vt=w.isVideoTexture!==!0&&zt!==Sd,oe=ft.__version===void 0||K===!0,ae=G.dataReady,te=M(w,Et);if(w.isDepthTexture)zt=r.DEPTH_COMPONENT16,w.type===Pi?zt=r.DEPTH_COMPONENT32F:w.type===ts?zt=r.DEPTH_COMPONENT24:w.type===Zs&&(zt=r.DEPTH24_STENCIL8),oe&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,zt,Et.width,Et.height):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,null));else if(w.isDataTexture)if(Kt.length>0){Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,I=Kt.length;Ft<I;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data);w.generateMipmaps=!1}else Vt?(oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Et.width,Et.height),ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Et.width,Et.height,At,Ht,Et.data)):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,Et.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Vt&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,te,zt,Kt[0].width,Kt[0].height,Et.depth);for(let Ft=0,I=Kt.length;Ft<I;Ft++)Dt=Kt[Ft],w.format!==ti?At!==null?Vt?ae&&e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Dt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Ht,Dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,At,Ht,Dt.data)}else{Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,I=Kt.length;Ft<I;Ft++)Dt=Kt[Ft],w.format!==ti?At!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(w.isDataArrayTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(w.isData3DTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_3D,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_3D,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(w.isFramebufferTexture){if(oe)if(Vt)e.texStorage2D(r.TEXTURE_2D,te,zt,Et.width,Et.height);else{let Ft=Et.width,I=Et.height;for(let ht=0;ht<te;ht++)e.texImage2D(r.TEXTURE_2D,ht,zt,Ft,I,0,At,Ht,null),Ft>>=1,I>>=1}}else if(Kt.length>0){if(Vt&&oe){const Ft=$(Kt[0]);e.texStorage2D(r.TEXTURE_2D,te,zt,Ft.width,Ft.height)}for(let Ft=0,I=Kt.length;Ft<I;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,At,Ht,Dt):e.texImage2D(r.TEXTURE_2D,Ft,zt,At,Ht,Dt);w.generateMipmaps=!1}else if(Vt){if(oe){const Ft=$(Et);e.texStorage2D(r.TEXTURE_2D,te,zt,Ft.width,Ft.height)}ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,Et)}else e.texImage2D(r.TEXTURE_2D,0,zt,At,Ht,Et);g(w)&&_(X),ft.__version=G.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function Lt(A,w,B){if(w.image.length!==6)return;const X=q(A,w),K=w.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+B);const G=n.get(K);if(K.version!==G.__version||X===!0){e.activeTexture(r.TEXTURE0+B);const ft=ge.getPrimaries(ge.workingColorSpace),lt=w.colorSpace===Li?null:ge.getPrimaries(w.colorSpace),pt=w.colorSpace===Li||ft===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Tt=w.isCompressedTexture||w.image[0].isCompressedTexture,Et=w.image[0]&&w.image[0].isDataTexture,At=[];for(let I=0;I<6;I++)!Tt&&!Et?At[I]=y(w.image[I],!0,s.maxCubemapSize):At[I]=Et?w.image[I].image:w.image[I],At[I]=et(w,At[I]);const Ht=At[0],zt=o.convert(w.format,w.colorSpace),Dt=o.convert(w.type),Kt=S(w.internalFormat,zt,Dt,w.colorSpace),Vt=w.isVideoTexture!==!0,oe=G.__version===void 0||X===!0,ae=K.dataReady;let te=M(w,Ht);at(r.TEXTURE_CUBE_MAP,w);let Ft;if(Tt){Vt&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,te,Kt,Ht.width,Ht.height);for(let I=0;I<6;I++){Ft=At[I].mipmaps;for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];w.format!==ti?zt!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht,0,0,Mt.width,Mt.height,zt,Mt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht,Kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht,0,0,Mt.width,Mt.height,zt,Dt,Mt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht,Kt,Mt.width,Mt.height,0,zt,Dt,Mt.data)}}}else{if(Ft=w.mipmaps,Vt&&oe){Ft.length>0&&te++;const I=$(At[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,te,Kt,I.width,I.height)}for(let I=0;I<6;I++)if(Et){Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,0,0,At[I].width,At[I].height,zt,Dt,At[I].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,Kt,At[I].width,At[I].height,0,zt,Dt,At[I].data);for(let ht=0;ht<Ft.length;ht++){const Rt=Ft[ht].image[I].image;Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht+1,0,0,Rt.width,Rt.height,zt,Dt,Rt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht+1,Kt,Rt.width,Rt.height,0,zt,Dt,Rt.data)}}else{Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,0,0,zt,Dt,At[I]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,0,Kt,zt,Dt,At[I]);for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht+1,0,0,zt,Dt,Mt.image[I]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+I,ht+1,Kt,zt,Dt,Mt.image[I])}}}g(w)&&_(r.TEXTURE_CUBE_MAP),G.__version=K.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function J(A,w,B,X,K,G){const ft=o.convert(B.format,B.colorSpace),lt=o.convert(B.type),pt=S(B.internalFormat,ft,lt,B.colorSpace);if(!n.get(w).__hasExternalTextures){const Et=Math.max(1,w.width>>G),At=Math.max(1,w.height>>G);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?e.texImage3D(K,G,pt,Et,At,w.depth,0,ft,lt,null):e.texImage2D(K,G,pt,Et,At,0,ft,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),xt(w)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,K,n.get(B).__webglTexture,0,vt(w)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,K,n.get(B).__webglTexture,G),e.bindFramebuffer(r.FRAMEBUFFER,null)}function nt(A,w,B){if(r.bindRenderbuffer(r.RENDERBUFFER,A),w.depthBuffer&&!w.stencilBuffer){let X=r.DEPTH_COMPONENT24;if(B||xt(w)){const K=w.depthTexture;K&&K.isDepthTexture&&(K.type===Pi?X=r.DEPTH_COMPONENT32F:K.type===ts&&(X=r.DEPTH_COMPONENT24));const G=vt(w);xt(w)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,G,X,w.width,w.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,G,X,w.width,w.height)}else r.renderbufferStorage(r.RENDERBUFFER,X,w.width,w.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,A)}else if(w.depthBuffer&&w.stencilBuffer){const X=vt(w);B&&xt(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,w.width,w.height):xt(w)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,A)}else{const X=w.textures;for(let K=0;K<X.length;K++){const G=X[K],ft=o.convert(G.format,G.colorSpace),lt=o.convert(G.type),pt=S(G.internalFormat,ft,lt,G.colorSpace),Tt=vt(w);B&&xt(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Tt,pt,w.width,w.height):xt(w)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Tt,pt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,pt,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function wt(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),F(w.depthTexture,0);const X=n.get(w.depthTexture).__webglTexture,K=vt(w);if(w.depthTexture.format===jr)xt(w)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else if(w.depthTexture.format===Bs)xt(w)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function St(A){const w=n.get(A),B=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");wt(w.__webglFramebuffer,A)}else if(B){w.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[X]),w.__webglDepthbuffer[X]=r.createRenderbuffer(),nt(w.__webglDepthbuffer[X],A,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=r.createRenderbuffer(),nt(w.__webglDepthbuffer,A,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(A,w,B){const X=n.get(A);w!==void 0&&J(X.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&St(A)}function It(A){const w=A.texture,B=n.get(A),X=n.get(w);A.addEventListener("dispose",N);const K=A.textures,G=A.isWebGLCubeRenderTarget===!0,ft=K.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=w.version,l.memory.textures++),G){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let pt=0;pt<w.mipmaps.length;pt++)B.__webglFramebuffer[lt][pt]=r.createFramebuffer()}else B.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<w.mipmaps.length;lt++)B.__webglFramebuffer[lt]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ft)for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=n.get(K[lt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=r.createTexture(),l.memory.textures++)}if(A.samples>0&&xt(A)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const pt=K[lt];B.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Tt=o.convert(pt.format,pt.colorSpace),Et=o.convert(pt.type),At=S(pt.internalFormat,Tt,Et,pt.colorSpace,A.isXRRenderTarget===!0),Ht=vt(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,At,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),nt(B.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(G){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),at(r.TEXTURE_CUBE_MAP,w);for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let pt=0;pt<w.mipmaps.length;pt++)J(B.__webglFramebuffer[lt][pt],A,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else J(B.__webglFramebuffer[lt],A,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(w)&&_(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=K[lt],Et=n.get(Tt);e.bindTexture(r.TEXTURE_2D,Et.__webglTexture),at(r.TEXTURE_2D,Tt),J(B.__webglFramebuffer,A,Tt,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),g(Tt)&&_(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),at(lt,w),w.mipmaps&&w.mipmaps.length>0)for(let pt=0;pt<w.mipmaps.length;pt++)J(B.__webglFramebuffer[pt],A,w,r.COLOR_ATTACHMENT0,lt,pt);else J(B.__webglFramebuffer,A,w,r.COLOR_ATTACHMENT0,lt,0);g(w)&&_(lt),e.unbindTexture()}A.depthBuffer&&St(A)}function kt(A){const w=A.textures;for(let B=0,X=w.length;B<X;B++){const K=w[B];if(g(K)){const G=A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ft=n.get(K).__webglTexture;e.bindTexture(G,ft),_(G),e.unbindTexture()}}}function st(A){if(A.samples>0&&xt(A)===!1){const w=A.textures,B=A.width,X=A.height;let K=r.COLOR_BUFFER_BIT;const G=[],ft=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(A),pt=w.length>1;if(pt)for(let Tt=0;Tt<w.length;Tt++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Tt=0;Tt<w.length;Tt++){G.push(r.COLOR_ATTACHMENT0+Tt),A.depthBuffer&&G.push(ft);const Et=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Et===!1&&(A.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&(K|=r.STENCIL_BUFFER_BIT)),pt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]),Et===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ft]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ft])),pt){const At=n.get(w[Tt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,At,0)}r.blitFramebuffer(0,0,B,X,0,0,B,X,K,r.NEAREST),u&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,G)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<w.length;Tt++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]);const Et=n.get(w[Tt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,Et,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function vt(A){return Math.min(s.maxSamples,A.samples)}function xt(A){const w=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function E(A){const w=l.render.frame;f.get(A)!==w&&(f.set(A,w),A.update())}function et(A,w){const B=A.colorSpace,X=A.format,K=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||B!==Ui&&B!==Li&&(ge.getTransfer(B)===be?(X!==ti||K!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),w}function $(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(d.width=A.naturalWidth||A.width,d.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(d.width=A.displayWidth,d.height=A.displayHeight):(d.width=A.width,d.height=A.height),d}this.allocateTextureUnit=W,this.resetTextureUnits=R,this.setTexture2D=F,this.setTexture2DArray=C,this.setTexture3D=Z,this.setTextureCube=it,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=J,this.useMultisampledRTT=xt}function qy(r,t){function e(n,s=Li){let o;const l=ge.getTransfer(s);if(n===Di)return r.UNSIGNED_BYTE;if(n===yd)return r.UNSIGNED_SHORT_4_4_4_4;if(n===xd)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Cm)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Tm)return r.BYTE;if(n===Am)return r.SHORT;if(n===_d)return r.UNSIGNED_SHORT;if(n===vd)return r.INT;if(n===ts)return r.UNSIGNED_INT;if(n===Pi)return r.FLOAT;if(n===Ko)return r.HALF_FLOAT;if(n===Lm)return r.ALPHA;if(n===Pm)return r.RGB;if(n===ti)return r.RGBA;if(n===Rm)return r.LUMINANCE;if(n===Im)return r.LUMINANCE_ALPHA;if(n===jr)return r.DEPTH_COMPONENT;if(n===Bs)return r.DEPTH_STENCIL;if(n===Dm)return r.RED;if(n===bd)return r.RED_INTEGER;if(n===Nm)return r.RG;if(n===wd)return r.RG_INTEGER;if(n===Md)return r.RGBA_INTEGER;if(n===Za||n===Xa||n===qa||n===ja)if(l===be)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Za)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Xa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===qa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ja)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Za)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Xa)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===qa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ja)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xu||n===bu||n===wu||n===Mu)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===xu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bu)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Mu)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Sd)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Su||n===Eu)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Su)return l===be?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Eu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Tu||n===Au||n===Cu||n===Lu||n===Pu||n===Ru||n===Iu||n===Du||n===Nu||n===Ou||n===Uu||n===ku||n===zu||n===Bu)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Tu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Au)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Cu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Lu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ru)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Iu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Du)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Nu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ou)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Uu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ku)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===zu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bu)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ya||n===Fu||n===Hu)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Ya)return l===be?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Fu)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Hu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Om||n===Vu||n===Gu||n===Wu)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Ya)return o.COMPRESSED_RED_RGTC1_EXT;if(n===Vu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Gu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Zs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class jy extends wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Rs extends Ke{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Yy={type:"move"};class bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Rs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Rs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Rs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,u=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const y of t.hand.values()){const g=e.getJointPose(y,n),_=this._getHandJoint(d,y);g!==null&&(_.matrix.fromArray(g.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=g.radius),_.visible=g!==null}const f=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],v=f.position.distanceTo(p.position),m=.02,x=.005;d.inputState.pinching&&v>m+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&v<=m-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Yy)))}return c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Rs;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const $y=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ky=`
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

}`;class Jy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new hn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new Oi({vertexShader:$y,fragmentShader:Ky,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ze(new qs(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Qy extends lr{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",u=1,d=null,f=null,p=null,v=null,m=null,x=null;const y=new Jy,g=e.getContextAttributes();let _=null,S=null;const M=[],P=[],N=new yt;let O=null;const U=new wn;U.layers.enable(1),U.viewport=new je;const H=new wn;H.layers.enable(2),H.viewport=new je;const D=[U,H],R=new jy;R.layers.enable(1),R.layers.enable(2);let W=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let nt=M[J];return nt===void 0&&(nt=new bl,M[J]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(J){let nt=M[J];return nt===void 0&&(nt=new bl,M[J]=nt),nt.getGripSpace()},this.getHand=function(J){let nt=M[J];return nt===void 0&&(nt=new bl,M[J]=nt),nt.getHandSpace()};function F(J){const nt=P.indexOf(J.inputSource);if(nt===-1)return;const wt=M[nt];wt!==void 0&&(wt.update(J.inputSource,J.frame,d||l),wt.dispatchEvent({type:J.type,data:J.inputSource}))}function C(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",C),s.removeEventListener("inputsourceschange",Z);for(let J=0;J<M.length;J++){const nt=P[J];nt!==null&&(P[J]=null,M[J].disconnect(nt))}W=null,k=null,y.reset(),t.setRenderTarget(_),m=null,v=null,p=null,s=null,S=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(O),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){c=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(J){d=J},this.getBaseLayer=function(){return v!==null?v:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",C),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const nt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new ir(m.framebufferWidth,m.framebufferHeight,{format:ti,type:Di,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let nt=null,wt=null,St=null;g.depth&&(St=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=g.stencil?Bs:jr,wt=g.stencil?Zs:ts);const Pt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:o};p=new XRWebGLBinding(s,e),v=p.createProjectionLayer(Pt),s.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),S=new ir(v.textureWidth,v.textureHeight,{format:ti,type:Di,depthTexture:new Bd(v.textureWidth,v.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const It=t.properties.get(S);It.__ignoreDepthValues=v.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(u),d=null,l=await s.requestReferenceSpace(c),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(J){for(let nt=0;nt<J.removed.length;nt++){const wt=J.removed[nt],St=P.indexOf(wt);St>=0&&(P[St]=null,M[St].disconnect(wt))}for(let nt=0;nt<J.added.length;nt++){const wt=J.added[nt];let St=P.indexOf(wt);if(St===-1){for(let It=0;It<M.length;It++)if(It>=P.length){P.push(wt),St=It;break}else if(P[It]===null){P[It]=wt,St=It;break}if(St===-1)break}const Pt=M[St];Pt&&Pt.connect(wt)}}const it=new Q,ot=new Q;function j(J,nt,wt){it.setFromMatrixPosition(nt.matrixWorld),ot.setFromMatrixPosition(wt.matrixWorld);const St=it.distanceTo(ot),Pt=nt.projectionMatrix.elements,It=wt.projectionMatrix.elements,kt=Pt[14]/(Pt[10]-1),st=Pt[14]/(Pt[10]+1),vt=(Pt[9]+1)/Pt[5],xt=(Pt[9]-1)/Pt[5],E=(Pt[8]-1)/Pt[0],et=(It[8]+1)/It[0],$=kt*E,A=kt*et,w=St/(-E+et),B=w*-E;nt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(B),J.translateZ(w),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const X=kt+w,K=st+w,G=$-B,ft=A+(St-B),lt=vt*st/K*X,pt=xt*st/K*X;J.projectionMatrix.makePerspective(G,ft,lt,pt,X,K),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function rt(J,nt){nt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(nt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;y.texture!==null&&(J.near=y.depthNear,J.far=y.depthFar),R.near=H.near=U.near=J.near,R.far=H.far=U.far=J.far,(W!==R.near||k!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),W=R.near,k=R.far,U.near=W,U.far=k,H.near=W,H.far=k,U.updateProjectionMatrix(),H.updateProjectionMatrix(),J.updateProjectionMatrix());const nt=J.parent,wt=R.cameras;rt(R,nt);for(let St=0;St<wt.length;St++)rt(wt[St],nt);wt.length===2?j(R,U,H):R.projectionMatrix.copy(U.projectionMatrix),at(J,R,nt)};function at(J,nt,wt){wt===null?J.matrix.copy(nt.matrixWorld):(J.matrix.copy(wt.matrixWorld),J.matrix.invert(),J.matrix.multiply(nt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(nt.projectionMatrix),J.projectionMatrixInverse.copy(nt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Wl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(v===null&&m===null))return u},this.setFoveation=function(J){u=J,v!==null&&(v.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null};let q=null;function tt(J,nt){if(f=nt.getViewerPose(d||l),x=nt,f!==null){const wt=f.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let St=!1;wt.length!==R.cameras.length&&(R.cameras.length=0,St=!0);for(let It=0;It<wt.length;It++){const kt=wt[It];let st=null;if(m!==null)st=m.getViewport(kt);else{const xt=p.getViewSubImage(v,kt);st=xt.viewport,It===0&&(t.setRenderTargetTextures(S,xt.colorTexture,v.ignoreDepthValues?void 0:xt.depthStencilTexture),t.setRenderTarget(S))}let vt=D[It];vt===void 0&&(vt=new wn,vt.layers.enable(It),vt.viewport=new je,D[It]=vt),vt.matrix.fromArray(kt.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(kt.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(st.x,st.y,st.width,st.height),It===0&&(R.matrix.copy(vt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),St===!0&&R.cameras.push(vt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=p.getDepthInformation(wt[0]);It&&It.isValid&&It.texture&&y.init(t,It,s.renderState)}}for(let wt=0;wt<M.length;wt++){const St=P[wt],Pt=M[wt];St!==null&&Pt!==void 0&&Pt.update(St,nt,d||l)}y.render(t,R),q&&q(J,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),x=null}const Lt=new kd;Lt.setAnimationLoop(tt),this.setAnimationLoop=function(J){q=J},this.dispose=function(){}}}const Yi=new Zn,tx=new Ae;function ex(r,t){function e(g,_){g.matrixAutoUpdate===!0&&g.updateMatrix(),_.value.copy(g.matrix)}function n(g,_){_.color.getRGB(g.fogColor.value,Nd(r)),_.isFog?(g.fogNear.value=_.near,g.fogFar.value=_.far):_.isFogExp2&&(g.fogDensity.value=_.density)}function s(g,_,S,M,P){_.isMeshBasicMaterial||_.isMeshLambertMaterial?o(g,_):_.isMeshToonMaterial?(o(g,_),p(g,_)):_.isMeshPhongMaterial?(o(g,_),f(g,_)):_.isMeshStandardMaterial?(o(g,_),v(g,_),_.isMeshPhysicalMaterial&&m(g,_,P)):_.isMeshMatcapMaterial?(o(g,_),x(g,_)):_.isMeshDepthMaterial?o(g,_):_.isMeshDistanceMaterial?(o(g,_),y(g,_)):_.isMeshNormalMaterial?o(g,_):_.isLineBasicMaterial?(l(g,_),_.isLineDashedMaterial&&c(g,_)):_.isPointsMaterial?u(g,_,S,M):_.isSpriteMaterial?d(g,_):_.isShadowMaterial?(g.color.value.copy(_.color),g.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function o(g,_){g.opacity.value=_.opacity,_.color&&g.diffuse.value.copy(_.color),_.emissive&&g.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(g.map.value=_.map,e(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.bumpMap&&(g.bumpMap.value=_.bumpMap,e(_.bumpMap,g.bumpMapTransform),g.bumpScale.value=_.bumpScale,_.side===vn&&(g.bumpScale.value*=-1)),_.normalMap&&(g.normalMap.value=_.normalMap,e(_.normalMap,g.normalMapTransform),g.normalScale.value.copy(_.normalScale),_.side===vn&&g.normalScale.value.negate()),_.displacementMap&&(g.displacementMap.value=_.displacementMap,e(_.displacementMap,g.displacementMapTransform),g.displacementScale.value=_.displacementScale,g.displacementBias.value=_.displacementBias),_.emissiveMap&&(g.emissiveMap.value=_.emissiveMap,e(_.emissiveMap,g.emissiveMapTransform)),_.specularMap&&(g.specularMap.value=_.specularMap,e(_.specularMap,g.specularMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest);const S=t.get(_),M=S.envMap,P=S.envMapRotation;if(M&&(g.envMap.value=M,Yi.copy(P),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),g.envMapRotation.value.setFromMatrix4(tx.makeRotationFromEuler(Yi)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=_.reflectivity,g.ior.value=_.ior,g.refractionRatio.value=_.refractionRatio),_.lightMap){g.lightMap.value=_.lightMap;const N=r._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=_.lightMapIntensity*N,e(_.lightMap,g.lightMapTransform)}_.aoMap&&(g.aoMap.value=_.aoMap,g.aoMapIntensity.value=_.aoMapIntensity,e(_.aoMap,g.aoMapTransform))}function l(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,_.map&&(g.map.value=_.map,e(_.map,g.mapTransform))}function c(g,_){g.dashSize.value=_.dashSize,g.totalSize.value=_.dashSize+_.gapSize,g.scale.value=_.scale}function u(g,_,S,M){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.size.value=_.size*S,g.scale.value=M*.5,_.map&&(g.map.value=_.map,e(_.map,g.uvTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function d(g,_){g.diffuse.value.copy(_.color),g.opacity.value=_.opacity,g.rotation.value=_.rotation,_.map&&(g.map.value=_.map,e(_.map,g.mapTransform)),_.alphaMap&&(g.alphaMap.value=_.alphaMap,e(_.alphaMap,g.alphaMapTransform)),_.alphaTest>0&&(g.alphaTest.value=_.alphaTest)}function f(g,_){g.specular.value.copy(_.specular),g.shininess.value=Math.max(_.shininess,1e-4)}function p(g,_){_.gradientMap&&(g.gradientMap.value=_.gradientMap)}function v(g,_){g.metalness.value=_.metalness,_.metalnessMap&&(g.metalnessMap.value=_.metalnessMap,e(_.metalnessMap,g.metalnessMapTransform)),g.roughness.value=_.roughness,_.roughnessMap&&(g.roughnessMap.value=_.roughnessMap,e(_.roughnessMap,g.roughnessMapTransform)),_.envMap&&(g.envMapIntensity.value=_.envMapIntensity)}function m(g,_,S){g.ior.value=_.ior,_.sheen>0&&(g.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),g.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(g.sheenColorMap.value=_.sheenColorMap,e(_.sheenColorMap,g.sheenColorMapTransform)),_.sheenRoughnessMap&&(g.sheenRoughnessMap.value=_.sheenRoughnessMap,e(_.sheenRoughnessMap,g.sheenRoughnessMapTransform))),_.clearcoat>0&&(g.clearcoat.value=_.clearcoat,g.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(g.clearcoatMap.value=_.clearcoatMap,e(_.clearcoatMap,g.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,e(_.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(g.clearcoatNormalMap.value=_.clearcoatNormalMap,e(_.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===vn&&g.clearcoatNormalScale.value.negate())),_.iridescence>0&&(g.iridescence.value=_.iridescence,g.iridescenceIOR.value=_.iridescenceIOR,g.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(g.iridescenceMap.value=_.iridescenceMap,e(_.iridescenceMap,g.iridescenceMapTransform)),_.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=_.iridescenceThicknessMap,e(_.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),_.transmission>0&&(g.transmission.value=_.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),_.transmissionMap&&(g.transmissionMap.value=_.transmissionMap,e(_.transmissionMap,g.transmissionMapTransform)),g.thickness.value=_.thickness,_.thicknessMap&&(g.thicknessMap.value=_.thicknessMap,e(_.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=_.attenuationDistance,g.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(g.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(g.anisotropyMap.value=_.anisotropyMap,e(_.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=_.specularIntensity,g.specularColor.value.copy(_.specularColor),_.specularColorMap&&(g.specularColorMap.value=_.specularColorMap,e(_.specularColorMap,g.specularColorMapTransform)),_.specularIntensityMap&&(g.specularIntensityMap.value=_.specularIntensityMap,e(_.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,_){_.matcap&&(g.matcap.value=_.matcap)}function y(g,_){const S=t.get(_).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function nx(r,t,e,n){let s={},o={},l=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function u(S,M){const P=M.program;n.uniformBlockBinding(S,P)}function d(S,M){let P=s[S.id];P===void 0&&(x(S),P=f(S),s[S.id]=P,S.addEventListener("dispose",g));const N=M.program;n.updateUBOMapping(S,N);const O=t.render.frame;o[S.id]!==O&&(v(S),o[S.id]=O)}function f(S){const M=p();S.__bindingPointIndex=M;const P=r.createBuffer(),N=S.__size,O=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,P),r.bufferData(r.UNIFORM_BUFFER,N,O),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,P),P}function p(){for(let S=0;S<c;S++)if(l.indexOf(S)===-1)return l.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(S){const M=s[S.id],P=S.uniforms,N=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let O=0,U=P.length;O<U;O++){const H=Array.isArray(P[O])?P[O]:[P[O]];for(let D=0,R=H.length;D<R;D++){const W=H[D];if(m(W,O,D,N)===!0){const k=W.__offset,F=Array.isArray(W.value)?W.value:[W.value];let C=0;for(let Z=0;Z<F.length;Z++){const it=F[Z],ot=y(it);typeof it=="number"||typeof it=="boolean"?(W.__data[0]=it,r.bufferSubData(r.UNIFORM_BUFFER,k+C,W.__data)):it.isMatrix3?(W.__data[0]=it.elements[0],W.__data[1]=it.elements[1],W.__data[2]=it.elements[2],W.__data[3]=0,W.__data[4]=it.elements[3],W.__data[5]=it.elements[4],W.__data[6]=it.elements[5],W.__data[7]=0,W.__data[8]=it.elements[6],W.__data[9]=it.elements[7],W.__data[10]=it.elements[8],W.__data[11]=0):(it.toArray(W.__data,C),C+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,W.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(S,M,P,N){const O=S.value,U=M+"_"+P;if(N[U]===void 0)return typeof O=="number"||typeof O=="boolean"?N[U]=O:N[U]=O.clone(),!0;{const H=N[U];if(typeof O=="number"||typeof O=="boolean"){if(H!==O)return N[U]=O,!0}else if(H.equals(O)===!1)return H.copy(O),!0}return!1}function x(S){const M=S.uniforms;let P=0;const N=16;for(let U=0,H=M.length;U<H;U++){const D=Array.isArray(M[U])?M[U]:[M[U]];for(let R=0,W=D.length;R<W;R++){const k=D[R],F=Array.isArray(k.value)?k.value:[k.value];for(let C=0,Z=F.length;C<Z;C++){const it=F[C],ot=y(it),j=P%N;j!==0&&N-j<ot.boundary&&(P+=N-j),k.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=P,P+=ot.storage}}}const O=P%N;return O>0&&(P+=N-O),S.__size=P,S.__cache={},this}function y(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function g(S){const M=S.target;M.removeEventListener("dispose",g);const P=l.indexOf(M.__bindingPointIndex);l.splice(P,1),r.deleteBuffer(s[M.id]),delete s[M.id],delete o[M.id]}function _(){for(const S in s)r.deleteBuffer(s[S]);l=[],s={},o={}}return{bind:u,update:d,dispose:_}}class Zd{constructor(t={}){const{canvas:e=jm(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=l;const m=new Uint32Array(4),x=new Int32Array(4);let y=null,g=null;const _=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Kn,this._useLegacyLights=!1,this.toneMapping=Ii,this.toneMappingExposure=1;const M=this;let P=!1,N=0,O=0,U=null,H=-1,D=null;const R=new je,W=new je;let k=null;const F=new Qt(0);let C=0,Z=e.width,it=e.height,ot=1,j=null,rt=null;const at=new je(0,0,Z,it),q=new je(0,0,Z,it);let tt=!1;const Lt=new lc;let J=!1,nt=!1;const wt=new Ae,St=new yt,Pt=new Q,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function kt(){return U===null?ot:1}let st=n;function vt(V,ct){const gt=e.getContext(V,ct);return gt!==null?gt:null}try{const V={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ic}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),st===null){const ct="webgl2";if(st=vt(ct,V),st===null)throw vt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let xt,E,et,$,A,w,B,X,K,G,ft,lt,pt,Tt,Et,At,Ht,zt,Dt,Kt,Vt,oe,ae,te;function Ft(){xt=new h0(st),xt.init(),E=new s0(st,xt,t),oe=new qy(st,xt),et=new Zy(st),$=new p0(st),A=new Ry,w=new Xy(st,xt,et,A,E,oe,$),B=new a0(M),X=new u0(M),K=new xg(st),ae=new i0(st,K),G=new d0(st,K,$,ae),ft=new g0(st,G,K,$),Dt=new m0(st,E,w),At=new o0(A),lt=new Py(M,B,X,xt,E,ae,At),pt=new ex(M,A),Tt=new Dy,Et=new By(xt),zt=new n0(M,B,X,et,ft,v,u),Ht=new Wy(M,ft,E),te=new nx(st,$,E,et),Kt=new r0(st,xt,$),Vt=new f0(st,xt,$),$.programs=lt.programs,M.capabilities=E,M.extensions=xt,M.properties=A,M.renderLists=Tt,M.shadowMap=Ht,M.state=et,M.info=$}Ft();const I=new Qy(M,st);this.xr=I,this.getContext=function(){return st},this.getContextAttributes=function(){return st.getContextAttributes()},this.forceContextLoss=function(){const V=xt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=xt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(V){V!==void 0&&(ot=V,this.setSize(Z,it,!1))},this.getSize=function(V){return V.set(Z,it)},this.setSize=function(V,ct,gt=!0){if(I.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=V,it=ct,e.width=Math.floor(V*ot),e.height=Math.floor(ct*ot),gt===!0&&(e.style.width=V+"px",e.style.height=ct+"px"),this.setViewport(0,0,V,ct)},this.getDrawingBufferSize=function(V){return V.set(Z*ot,it*ot).floor()},this.setDrawingBufferSize=function(V,ct,gt){Z=V,it=ct,ot=gt,e.width=Math.floor(V*gt),e.height=Math.floor(ct*gt),this.setViewport(0,0,V,ct)},this.getCurrentViewport=function(V){return V.copy(R)},this.getViewport=function(V){return V.copy(at)},this.setViewport=function(V,ct,gt,_t){V.isVector4?at.set(V.x,V.y,V.z,V.w):at.set(V,ct,gt,_t),et.viewport(R.copy(at).multiplyScalar(ot).round())},this.getScissor=function(V){return V.copy(q)},this.setScissor=function(V,ct,gt,_t){V.isVector4?q.set(V.x,V.y,V.z,V.w):q.set(V,ct,gt,_t),et.scissor(W.copy(q).multiplyScalar(ot).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(V){et.setScissorTest(tt=V)},this.setOpaqueSort=function(V){j=V},this.setTransparentSort=function(V){rt=V},this.getClearColor=function(V){return V.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(V=!0,ct=!0,gt=!0){let _t=0;if(V){let dt=!1;if(U!==null){const Ut=U.texture.format;dt=Ut===Md||Ut===wd||Ut===bd}if(dt){const Ut=U.texture.type,Zt=Ut===Di||Ut===ts||Ut===_d||Ut===Zs||Ut===yd||Ut===xd,qt=zt.getClearColor(),jt=zt.getClearAlpha(),ee=qt.r,Jt=qt.g,ne=qt.b;Zt?(m[0]=ee,m[1]=Jt,m[2]=ne,m[3]=jt,st.clearBufferuiv(st.COLOR,0,m)):(x[0]=ee,x[1]=Jt,x[2]=ne,x[3]=jt,st.clearBufferiv(st.COLOR,0,x))}else _t|=st.COLOR_BUFFER_BIT}ct&&(_t|=st.DEPTH_BUFFER_BIT),gt&&(_t|=st.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),st.clear(_t)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Tt.dispose(),Et.dispose(),A.dispose(),B.dispose(),X.dispose(),ft.dispose(),ae.dispose(),te.dispose(),lt.dispose(),I.dispose(),I.removeEventListener("sessionstart",Ce),I.removeEventListener("sessionend",Se),rn.stop()};function ht(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const V=$.autoReset,ct=Ht.enabled,gt=Ht.autoUpdate,_t=Ht.needsUpdate,dt=Ht.type;Ft(),$.autoReset=V,Ht.enabled=ct,Ht.autoUpdate=gt,Ht.needsUpdate=_t,Ht.type=dt}function Rt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function Nt(V){const ct=V.target;ct.removeEventListener("dispose",Nt),re(ct)}function re(V){ue(V),A.remove(V)}function ue(V){const ct=A.get(V).programs;ct!==void 0&&(ct.forEach(function(gt){lt.releaseProgram(gt)}),V.isShaderMaterial&&lt.releaseShaderCache(V))}this.renderBufferDirect=function(V,ct,gt,_t,dt,Ut){ct===null&&(ct=It);const Zt=dt.isMesh&&dt.matrixWorld.determinant()<0,qt=Ys(V,ct,gt,_t,dt);et.setMaterial(_t,Zt);let jt=gt.index,ee=1;if(_t.wireframe===!0){if(jt=G.getWireframeAttribute(gt),jt===void 0)return;ee=2}const Jt=gt.drawRange,ne=gt.attributes.position;let Ee=Jt.start*ee,sn=(Jt.start+Jt.count)*ee;Ut!==null&&(Ee=Math.max(Ee,Ut.start*ee),sn=Math.min(sn,(Ut.start+Ut.count)*ee)),jt!==null?(Ee=Math.max(Ee,0),sn=Math.min(sn,jt.count)):ne!=null&&(Ee=Math.max(Ee,0),sn=Math.min(sn,ne.count));const Le=sn-Ee;if(Le<0||Le===1/0)return;ae.setup(dt,_t,qt,gt,jt);let on,ve=Kt;if(jt!==null&&(on=K.get(jt),ve=Vt,ve.setIndex(on)),dt.isMesh)_t.wireframe===!0?(et.setLineWidth(_t.wireframeLinewidth*kt()),ve.setMode(st.LINES)):ve.setMode(st.TRIANGLES);else if(dt.isLine){let ie=_t.linewidth;ie===void 0&&(ie=1),et.setLineWidth(ie*kt()),dt.isLineSegments?ve.setMode(st.LINES):dt.isLineLoop?ve.setMode(st.LINE_LOOP):ve.setMode(st.LINE_STRIP)}else dt.isPoints?ve.setMode(st.POINTS):dt.isSprite&&ve.setMode(st.TRIANGLES);if(dt.isBatchedMesh)ve.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)ve.renderInstances(Ee,Le,dt.count);else if(gt.isInstancedBufferGeometry){const ie=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,ni=Math.min(gt.instanceCount,ie);ve.renderInstances(Ee,Le,ni)}else ve.render(Ee,Le)};function _e(V,ct,gt){V.transparent===!0&&V.side===gn&&V.forceSinglePass===!1?(V.side=vn,V.needsUpdate=!0,ki(V,ct,gt),V.side=Ni,V.needsUpdate=!0,ki(V,ct,gt),V.side=gn):ki(V,ct,gt)}this.compile=function(V,ct,gt=null){gt===null&&(gt=V),g=Et.get(gt),g.init(),S.push(g),gt.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),V!==gt&&V.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),g.setupLights(M._useLegacyLights);const _t=new Set;return V.traverse(function(dt){const Ut=dt.material;if(Ut)if(Array.isArray(Ut))for(let Zt=0;Zt<Ut.length;Zt++){const qt=Ut[Zt];_e(qt,gt,dt),_t.add(qt)}else _e(Ut,gt,dt),_t.add(Ut)}),S.pop(),g=null,_t},this.compileAsync=function(V,ct,gt=null){const _t=this.compile(V,ct,gt);return new Promise(dt=>{function Ut(){if(_t.forEach(function(Zt){A.get(Zt).currentProgram.isReady()&&_t.delete(Zt)}),_t.size===0){dt(V);return}setTimeout(Ut,10)}xt.get("KHR_parallel_shader_compile")!==null?Ut():setTimeout(Ut,10)})};let Ie=null;function me(V){Ie&&Ie(V)}function Ce(){rn.stop()}function Se(){rn.start()}const rn=new kd;rn.setAnimationLoop(me),typeof self<"u"&&rn.setContext(self),this.setAnimationLoop=function(V){Ie=V,I.setAnimationLoop(V),V===null?rn.stop():rn.start()},I.addEventListener("sessionstart",Ce),I.addEventListener("sessionend",Se),this.render=function(V,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),I.enabled===!0&&I.isPresenting===!0&&(I.cameraAutoUpdate===!0&&I.updateCamera(ct),ct=I.getCamera()),V.isScene===!0&&V.onBeforeRender(M,V,ct,U),g=Et.get(V,S.length),g.init(),S.push(g),wt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),Lt.setFromProjectionMatrix(wt),nt=this.localClippingEnabled,J=At.init(this.clippingPlanes,nt),y=Tt.get(V,_.length),y.init(),_.push(y),dn(V,ct,0,M.sortObjects),y.finish(),M.sortObjects===!0&&y.sort(j,rt),this.info.render.frame++,J===!0&&At.beginShadows();const gt=g.state.shadowsArray;if(Ht.render(gt,V,ct),J===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(I.enabled===!1||I.isPresenting===!1||I.hasDepthSensing()===!1)&&zt.render(y,V),g.setupLights(M._useLegacyLights),ct.isArrayCamera){const _t=ct.cameras;for(let dt=0,Ut=_t.length;dt<Ut;dt++){const Zt=_t[dt];Xn(y,V,Zt,Zt.viewport)}}else Xn(y,V,ct);U!==null&&(w.updateMultisampleRenderTarget(U),w.updateRenderTargetMipmap(U)),V.isScene===!0&&V.onAfterRender(M,V,ct),ae.resetDefaultState(),H=-1,D=null,S.pop(),S.length>0?g=S[S.length-1]:g=null,_.pop(),_.length>0?y=_[_.length-1]:y=null};function dn(V,ct,gt,_t){if(V.visible===!1)return;if(V.layers.test(ct.layers)){if(V.isGroup)gt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(ct);else if(V.isLight)g.pushLight(V),V.castShadow&&g.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||Lt.intersectsSprite(V)){_t&&Pt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(wt);const Zt=ft.update(V),qt=V.material;qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||Lt.intersectsObject(V))){const Zt=ft.update(V),qt=V.material;if(_t&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),Pt.copy(V.boundingSphere.center)):(Zt.boundingSphere===null&&Zt.computeBoundingSphere(),Pt.copy(Zt.boundingSphere.center)),Pt.applyMatrix4(V.matrixWorld).applyMatrix4(wt)),Array.isArray(qt)){const jt=Zt.groups;for(let ee=0,Jt=jt.length;ee<Jt;ee++){const ne=jt[ee],Ee=qt[ne.materialIndex];Ee&&Ee.visible&&y.push(V,Zt,Ee,gt,Pt.z,ne)}}else qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}const Ut=V.children;for(let Zt=0,qt=Ut.length;Zt<qt;Zt++)dn(Ut[Zt],ct,gt,_t)}function Xn(V,ct,gt,_t){const dt=V.opaque,Ut=V.transmissive,Zt=V.transparent;g.setupLightsView(gt),J===!0&&At.setGlobalState(M.clippingPlanes,gt),Ut.length>0&&_i(dt,Ut,ct,gt),_t&&et.viewport(R.copy(_t)),dt.length>0&&Ve(dt,ct,gt),Ut.length>0&&Ve(Ut,ct,gt),Zt.length>0&&Ve(Zt,ct,gt),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function _i(V,ct,gt,_t){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(g.state.transmissionRenderTarget===null){g.state.transmissionRenderTarget=new ir(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float")?Ko:Di,minFilter:nr,samples:4,stencilBuffer:o});const ee=A.get(g.state.transmissionRenderTarget);ee.__isTransmissionRenderTarget=!0}const Ut=g.state.transmissionRenderTarget;M.getDrawingBufferSize(St),Ut.setSize(St.x,St.y);const Zt=M.getRenderTarget();M.setRenderTarget(Ut),M.getClearColor(F),C=M.getClearAlpha(),C<1&&M.setClearColor(16777215,.5),M.clear();const qt=M.toneMapping;M.toneMapping=Ii,Ve(V,gt,_t),w.updateMultisampleRenderTarget(Ut),w.updateRenderTargetMipmap(Ut);let jt=!1;for(let ee=0,Jt=ct.length;ee<Jt;ee++){const ne=ct[ee],Ee=ne.object,sn=ne.geometry,Le=ne.material,on=ne.group;if(Le.side===gn&&Ee.layers.test(_t.layers)){const ve=Le.side;Le.side=vn,Le.needsUpdate=!0,Wt(Ee,gt,_t,sn,Le,on),Le.side=ve,Le.needsUpdate=!0,jt=!0}}jt===!0&&(w.updateMultisampleRenderTarget(Ut),w.updateRenderTargetMipmap(Ut)),M.setRenderTarget(Zt),M.setClearColor(F,C),M.toneMapping=qt}function Ve(V,ct,gt){const _t=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,Ut=V.length;dt<Ut;dt++){const Zt=V[dt],qt=Zt.object,jt=Zt.geometry,ee=_t===null?Zt.material:_t,Jt=Zt.group;qt.layers.test(gt.layers)&&Wt(qt,ct,gt,jt,ee,Jt)}}function Wt(V,ct,gt,_t,dt,Ut){V.onBeforeRender(M,ct,gt,_t,dt,Ut),V.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),dt.onBeforeRender(M,ct,gt,_t,V,Ut),dt.transparent===!0&&dt.side===gn&&dt.forceSinglePass===!1?(dt.side=vn,dt.needsUpdate=!0,M.renderBufferDirect(gt,ct,_t,dt,V,Ut),dt.side=Ni,dt.needsUpdate=!0,M.renderBufferDirect(gt,ct,_t,dt,V,Ut),dt.side=gn):M.renderBufferDirect(gt,ct,_t,dt,V,Ut),V.onAfterRender(M,ct,gt,_t,dt,Ut)}function ki(V,ct,gt){ct.isScene!==!0&&(ct=It);const _t=A.get(V),dt=g.state.lights,Ut=g.state.shadowsArray,Zt=dt.state.version,qt=lt.getParameters(V,dt.state,Ut,ct,gt),jt=lt.getProgramCacheKey(qt);let ee=_t.programs;_t.environment=V.isMeshStandardMaterial?ct.environment:null,_t.fog=ct.fog,_t.envMap=(V.isMeshStandardMaterial?X:B).get(V.envMap||_t.environment),_t.envMapRotation=_t.environment!==null&&V.envMap===null?ct.environmentRotation:V.envMapRotation,ee===void 0&&(V.addEventListener("dispose",Nt),ee=new Map,_t.programs=ee);let Jt=ee.get(jt);if(Jt!==void 0){if(_t.currentProgram===Jt&&_t.lightsStateVersion===Zt)return os(V,qt),Jt}else qt.uniforms=lt.getUniforms(V),V.onBuild(gt,qt,M),V.onBeforeCompile(qt,M),Jt=lt.acquireProgram(qt,jt),ee.set(jt,Jt),_t.uniforms=qt.uniforms;const ne=_t.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(ne.clippingPlanes=At.uniform),os(V,qt),_t.needsLights=$s(V),_t.lightsStateVersion=Zt,_t.needsLights&&(ne.ambientLightColor.value=dt.state.ambient,ne.lightProbe.value=dt.state.probe,ne.directionalLights.value=dt.state.directional,ne.directionalLightShadows.value=dt.state.directionalShadow,ne.spotLights.value=dt.state.spot,ne.spotLightShadows.value=dt.state.spotShadow,ne.rectAreaLights.value=dt.state.rectArea,ne.ltc_1.value=dt.state.rectAreaLTC1,ne.ltc_2.value=dt.state.rectAreaLTC2,ne.pointLights.value=dt.state.point,ne.pointLightShadows.value=dt.state.pointShadow,ne.hemisphereLights.value=dt.state.hemi,ne.directionalShadowMap.value=dt.state.directionalShadowMap,ne.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,ne.spotShadowMap.value=dt.state.spotShadowMap,ne.spotLightMatrix.value=dt.state.spotLightMatrix,ne.spotLightMap.value=dt.state.spotLightMap,ne.pointShadowMap.value=dt.state.pointShadowMap,ne.pointShadowMatrix.value=dt.state.pointShadowMatrix),_t.currentProgram=Jt,_t.uniformsList=null,Jt}function ss(V){if(V.uniformsList===null){const ct=V.currentProgram.getUniforms();V.uniformsList=qo.seqWithValue(ct.seq,V.uniforms)}return V.uniformsList}function os(V,ct){const gt=A.get(V);gt.outputColorSpace=ct.outputColorSpace,gt.batching=ct.batching,gt.instancing=ct.instancing,gt.instancingColor=ct.instancingColor,gt.instancingMorph=ct.instancingMorph,gt.skinning=ct.skinning,gt.morphTargets=ct.morphTargets,gt.morphNormals=ct.morphNormals,gt.morphColors=ct.morphColors,gt.morphTargetsCount=ct.morphTargetsCount,gt.numClippingPlanes=ct.numClippingPlanes,gt.numIntersection=ct.numClipIntersection,gt.vertexAlphas=ct.vertexAlphas,gt.vertexTangents=ct.vertexTangents,gt.toneMapping=ct.toneMapping}function Ys(V,ct,gt,_t,dt){ct.isScene!==!0&&(ct=It),w.resetTextureUnits();const Ut=ct.fog,Zt=_t.isMeshStandardMaterial?ct.environment:null,qt=U===null?M.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ui,jt=(_t.isMeshStandardMaterial?X:B).get(_t.envMap||Zt),ee=_t.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,Jt=!!gt.attributes.tangent&&(!!_t.normalMap||_t.anisotropy>0),ne=!!gt.morphAttributes.position,Ee=!!gt.morphAttributes.normal,sn=!!gt.morphAttributes.color;let Le=Ii;_t.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Le=M.toneMapping);const on=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,ve=on!==void 0?on.length:0,ie=A.get(_t),ni=g.state.lights;if(J===!0&&(nt===!0||V!==D)){const Je=V===D&&_t.id===H;At.setState(_t,V,Je)}let Xt=!1;_t.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==ni.state.version||ie.outputColorSpace!==qt||dt.isBatchedMesh&&ie.batching===!1||!dt.isBatchedMesh&&ie.batching===!0||dt.isInstancedMesh&&ie.instancing===!1||!dt.isInstancedMesh&&ie.instancing===!0||dt.isSkinnedMesh&&ie.skinning===!1||!dt.isSkinnedMesh&&ie.skinning===!0||dt.isInstancedMesh&&ie.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&ie.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&ie.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&ie.instancingMorph===!1&&dt.morphTexture!==null||ie.envMap!==jt||_t.fog===!0&&ie.fog!==Ut||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==At.numPlanes||ie.numIntersection!==At.numIntersection)||ie.vertexAlphas!==ee||ie.vertexTangents!==Jt||ie.morphTargets!==ne||ie.morphNormals!==Ee||ie.morphColors!==sn||ie.toneMapping!==Le||ie.morphTargetsCount!==ve)&&(Xt=!0):(Xt=!0,ie.__version=_t.version);let fe=ie.currentProgram;Xt===!0&&(fe=ki(_t,ct,dt));let zi=!1,An=!1,qn=!1;const De=fe.getUniforms(),Yt=ie.uniforms;if(et.useProgram(fe.program)&&(zi=!0,An=!0,qn=!0),_t.id!==H&&(H=_t.id,An=!0),zi||D!==V){De.setValue(st,"projectionMatrix",V.projectionMatrix),De.setValue(st,"viewMatrix",V.matrixWorldInverse);const Je=De.map.cameraPosition;Je!==void 0&&Je.setValue(st,Pt.setFromMatrixPosition(V.matrixWorld)),E.logarithmicDepthBuffer&&De.setValue(st,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(_t.isMeshPhongMaterial||_t.isMeshToonMaterial||_t.isMeshLambertMaterial||_t.isMeshBasicMaterial||_t.isMeshStandardMaterial||_t.isShaderMaterial)&&De.setValue(st,"isOrthographic",V.isOrthographicCamera===!0),D!==V&&(D=V,An=!0,qn=!0)}if(dt.isSkinnedMesh){De.setOptional(st,dt,"bindMatrix"),De.setOptional(st,dt,"bindMatrixInverse");const Je=dt.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),De.setValue(st,"boneTexture",Je.boneTexture,w))}dt.isBatchedMesh&&(De.setOptional(st,dt,"batchingTexture"),De.setValue(st,"batchingTexture",dt._matricesTexture,w));const xe=gt.morphAttributes;if((xe.position!==void 0||xe.normal!==void 0||xe.color!==void 0)&&Dt.update(dt,gt,fe),(An||ie.receiveShadow!==dt.receiveShadow)&&(ie.receiveShadow=dt.receiveShadow,De.setValue(st,"receiveShadow",dt.receiveShadow)),_t.isMeshGouraudMaterial&&_t.envMap!==null&&(Yt.envMap.value=jt,Yt.flipEnvMap.value=jt.isCubeTexture&&jt.isRenderTargetTexture===!1?-1:1),_t.isMeshStandardMaterial&&_t.envMap===null&&ct.environment!==null&&(Yt.envMapIntensity.value=ct.environmentIntensity),An&&(De.setValue(st,"toneMappingExposure",M.toneMappingExposure),ie.needsLights&&as(Yt,qn),Ut&&_t.fog===!0&&pt.refreshFogUniforms(Yt,Ut),pt.refreshMaterialUniforms(Yt,_t,ot,it,g.state.transmissionRenderTarget),qo.upload(st,ss(ie),Yt,w)),_t.isShaderMaterial&&_t.uniformsNeedUpdate===!0&&(qo.upload(st,ss(ie),Yt,w),_t.uniformsNeedUpdate=!1),_t.isSpriteMaterial&&De.setValue(st,"center",dt.center),De.setValue(st,"modelViewMatrix",dt.modelViewMatrix),De.setValue(st,"normalMatrix",dt.normalMatrix),De.setValue(st,"modelMatrix",dt.matrixWorld),_t.isShaderMaterial||_t.isRawShaderMaterial){const Je=_t.uniformsGroups;for(let vi=0,fn=Je.length;vi<fn;vi++){const Ks=Je[vi];te.update(Ks,fe),te.bind(Ks,fe)}}return fe}function as(V,ct){V.ambientLightColor.needsUpdate=ct,V.lightProbe.needsUpdate=ct,V.directionalLights.needsUpdate=ct,V.directionalLightShadows.needsUpdate=ct,V.pointLights.needsUpdate=ct,V.pointLightShadows.needsUpdate=ct,V.spotLights.needsUpdate=ct,V.spotLightShadows.needsUpdate=ct,V.rectAreaLights.needsUpdate=ct,V.hemisphereLights.needsUpdate=ct}function $s(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(V,ct,gt){A.get(V.texture).__webglTexture=ct,A.get(V.depthTexture).__webglTexture=gt;const _t=A.get(V);_t.__hasExternalTextures=!0,_t.__autoAllocateDepthBuffer=gt===void 0,_t.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),_t.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,ct){const gt=A.get(V);gt.__webglFramebuffer=ct,gt.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(V,ct=0,gt=0){U=V,N=ct,O=gt;let _t=!0,dt=null,Ut=!1,Zt=!1;if(V){const jt=A.get(V);jt.__useDefaultFramebuffer!==void 0?(et.bindFramebuffer(st.FRAMEBUFFER,null),_t=!1):jt.__webglFramebuffer===void 0?w.setupRenderTarget(V):jt.__hasExternalTextures&&w.rebindTextures(V,A.get(V.texture).__webglTexture,A.get(V.depthTexture).__webglTexture);const ee=V.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Zt=!0);const Jt=A.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(Jt[ct])?dt=Jt[ct][gt]:dt=Jt[ct],Ut=!0):V.samples>0&&w.useMultisampledRTT(V)===!1?dt=A.get(V).__webglMultisampledFramebuffer:Array.isArray(Jt)?dt=Jt[gt]:dt=Jt,R.copy(V.viewport),W.copy(V.scissor),k=V.scissorTest}else R.copy(at).multiplyScalar(ot).floor(),W.copy(q).multiplyScalar(ot).floor(),k=tt;if(et.bindFramebuffer(st.FRAMEBUFFER,dt)&&_t&&et.drawBuffers(V,dt),et.viewport(R),et.scissor(W),et.setScissorTest(k),Ut){const jt=A.get(V.texture);st.framebufferTexture2D(st.FRAMEBUFFER,st.COLOR_ATTACHMENT0,st.TEXTURE_CUBE_MAP_POSITIVE_X+ct,jt.__webglTexture,gt)}else if(Zt){const jt=A.get(V.texture),ee=ct||0;st.framebufferTextureLayer(st.FRAMEBUFFER,st.COLOR_ATTACHMENT0,jt.__webglTexture,gt||0,ee)}H=-1},this.readRenderTargetPixels=function(V,ct,gt,_t,dt,Ut,Zt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=A.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Zt!==void 0&&(qt=qt[Zt]),qt){et.bindFramebuffer(st.FRAMEBUFFER,qt);try{const jt=V.texture,ee=jt.format,Jt=jt.type;if(ee!==ti&&oe.convert(ee)!==st.getParameter(st.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ne=Jt===Ko&&(xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float"));if(Jt!==Di&&oe.convert(Jt)!==st.getParameter(st.IMPLEMENTATION_COLOR_READ_TYPE)&&Jt!==Pi&&!ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=V.width-_t&&gt>=0&&gt<=V.height-dt&&st.readPixels(ct,gt,_t,dt,oe.convert(ee),oe.convert(Jt),Ut)}finally{const jt=U!==null?A.get(U).__webglFramebuffer:null;et.bindFramebuffer(st.FRAMEBUFFER,jt)}}},this.copyFramebufferToTexture=function(V,ct,gt=0){const _t=Math.pow(2,-gt),dt=Math.floor(ct.image.width*_t),Ut=Math.floor(ct.image.height*_t);w.setTexture2D(ct,0),st.copyTexSubImage2D(st.TEXTURE_2D,gt,0,0,V.x,V.y,dt,Ut),et.unbindTexture()},this.copyTextureToTexture=function(V,ct,gt,_t=0){const dt=ct.image.width,Ut=ct.image.height,Zt=oe.convert(gt.format),qt=oe.convert(gt.type);w.setTexture2D(gt,0),st.pixelStorei(st.UNPACK_FLIP_Y_WEBGL,gt.flipY),st.pixelStorei(st.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),st.pixelStorei(st.UNPACK_ALIGNMENT,gt.unpackAlignment),ct.isDataTexture?st.texSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,dt,Ut,Zt,qt,ct.image.data):ct.isCompressedTexture?st.compressedTexSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Zt,ct.mipmaps[0].data):st.texSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,Zt,qt,ct.image),_t===0&&gt.generateMipmaps&&st.generateMipmap(st.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(V,ct,gt,_t,dt=0){const Ut=Math.round(V.max.x-V.min.x),Zt=Math.round(V.max.y-V.min.y),qt=V.max.z-V.min.z+1,jt=oe.convert(_t.format),ee=oe.convert(_t.type);let Jt;if(_t.isData3DTexture)w.setTexture3D(_t,0),Jt=st.TEXTURE_3D;else if(_t.isDataArrayTexture||_t.isCompressedArrayTexture)w.setTexture2DArray(_t,0),Jt=st.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}st.pixelStorei(st.UNPACK_FLIP_Y_WEBGL,_t.flipY),st.pixelStorei(st.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),st.pixelStorei(st.UNPACK_ALIGNMENT,_t.unpackAlignment);const ne=st.getParameter(st.UNPACK_ROW_LENGTH),Ee=st.getParameter(st.UNPACK_IMAGE_HEIGHT),sn=st.getParameter(st.UNPACK_SKIP_PIXELS),Le=st.getParameter(st.UNPACK_SKIP_ROWS),on=st.getParameter(st.UNPACK_SKIP_IMAGES),ve=gt.isCompressedTexture?gt.mipmaps[dt]:gt.image;st.pixelStorei(st.UNPACK_ROW_LENGTH,ve.width),st.pixelStorei(st.UNPACK_IMAGE_HEIGHT,ve.height),st.pixelStorei(st.UNPACK_SKIP_PIXELS,V.min.x),st.pixelStorei(st.UNPACK_SKIP_ROWS,V.min.y),st.pixelStorei(st.UNPACK_SKIP_IMAGES,V.min.z),gt.isDataTexture||gt.isData3DTexture?st.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ee,ve.data):_t.isCompressedArrayTexture?st.compressedTexSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ve.data):st.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ee,ve),st.pixelStorei(st.UNPACK_ROW_LENGTH,ne),st.pixelStorei(st.UNPACK_IMAGE_HEIGHT,Ee),st.pixelStorei(st.UNPACK_SKIP_PIXELS,sn),st.pixelStorei(st.UNPACK_SKIP_ROWS,Le),st.pixelStorei(st.UNPACK_SKIP_IMAGES,on),dt===0&&_t.generateMipmaps&&st.generateMipmap(Jt),et.unbindTexture()},this.initTexture=function(V){V.isCubeTexture?w.setTextureCube(V,0):V.isData3DTexture?w.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?w.setTexture2DArray(V,0):w.setTexture2D(V,0),et.unbindTexture()},this.resetState=function(){N=0,O=0,U=null,et.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===oc?"display-p3":"srgb",e.unpackColorSpace=ge.workingColorSpace===da?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Xd extends Ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class uc extends cr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Oh=new Q,Uh=new Q,kh=new Ae,wl=new ac,Uo=new fa;class qd extends Ke{constructor(t=new He,e=new uc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)Oh.fromBufferAttribute(e,s-1),Uh.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Oh.distanceTo(Uh);t.setAttribute("lineDistance",new Me(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uo.copy(n.boundingSphere),Uo.applyMatrix4(s),Uo.radius+=o,t.ray.intersectsSphere(Uo)===!1)return;kh.copy(s).invert(),wl.copy(t.ray).applyMatrix4(kh);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,d=new Q,f=new Q,p=new Q,v=new Q,m=this.isLineSegments?2:1,x=n.index,g=n.attributes.position;if(x!==null){const _=Math.max(0,l.start),S=Math.min(x.count,l.start+l.count);for(let M=_,P=S-1;M<P;M+=m){const N=x.getX(M),O=x.getX(M+1);if(d.fromBufferAttribute(g,N),f.fromBufferAttribute(g,O),wl.distanceSqToSegment(d,f,v,p)>u)continue;v.applyMatrix4(this.matrixWorld);const H=t.ray.origin.distanceTo(v);H<t.near||H>t.far||e.push({distance:H,point:p.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}else{const _=Math.max(0,l.start),S=Math.min(g.count,l.start+l.count);for(let M=_,P=S-1;M<P;M+=m){if(d.fromBufferAttribute(g,M),f.fromBufferAttribute(g,M+1),wl.distanceSqToSegment(d,f,v,p)>u)continue;v.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(v);O<t.near||O>t.far||e.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const zh=new Q,Bh=new Q;class ix extends qd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)zh.fromBufferAttribute(e,s),Bh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zh.distanceTo(Bh);t.setAttribute("lineDistance",new Me(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class jd extends hn{constructor(t,e,n,s,o,l,c,u,d){super(t,e,n,s,o,l,c,u,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ei{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,u=o-1,d;for(;c<=u;)if(s=Math.floor(c+(u-c)/2),d=n[s]-l,d<0)c=s+1;else if(d>0)u=s-1;else{u=s;break}if(s=u,n[s]===l)return s/(o-1);const f=n[s],v=n[s+1]-f,m=(l-f)/v;return(s+m)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),u=e||(l.isVector2?new yt:new Q);return u.copy(c).sub(l).normalize(),u}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new Q,s=[],o=[],l=[],c=new Q,u=new Ae;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new Q)}o[0]=new Q,l[0]=new Q;let d=Number.MAX_VALUE;const f=Math.abs(s[0].x),p=Math.abs(s[0].y),v=Math.abs(s[0].z);f<=d&&(d=f,n.set(1,0,0)),p<=d&&(d=p,n.set(0,1,0)),v<=d&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),l[m]=l[m-1].clone(),c.crossVectors(s[m-1],s[m]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(qe(s[m-1].dot(s[m]),-1,1));o[m].applyMatrix4(u.makeRotationAxis(c,x))}l[m].crossVectors(s[m],o[m])}if(e===!0){let m=Math.acos(qe(o[0].dot(o[t]),-1,1));m/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(m=-m);for(let x=1;x<=t;x++)o[x].applyMatrix4(u.makeRotationAxis(s[x],m*x)),l[x].crossVectors(s[x],o[x])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class hc extends ei{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new yt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let u=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),v=u-this.aX,m=d-this.aY;u=v*f-m*p+this.aX,d=v*p+m*f+this.aY}return n.set(u,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class rx extends hc{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function dc(){let r=0,t=0,e=0,n=0;function s(o,l,c,u){r=o,t=c,e=-3*o+3*l-2*c-u,n=2*o-2*l+c+u}return{initCatmullRom:function(o,l,c,u,d){s(l,c,d*(c-o),d*(u-l))},initNonuniformCatmullRom:function(o,l,c,u,d,f,p){let v=(l-o)/d-(c-o)/(d+f)+(c-l)/f,m=(c-l)/f-(u-l)/(f+p)+(u-c)/p;v*=f,m*=f,s(l,c,v,m)},calc:function(o){const l=o*o,c=l*o;return r+t*o+e*l+n*c}}}const ko=new Q,Ml=new dc,Sl=new dc,El=new dc;class sx extends ei{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new Q){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),u=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:u===0&&c===o-1&&(c=o-2,u=1);let d,f;this.closed||c>0?d=s[(c-1)%o]:(ko.subVectors(s[0],s[1]).add(s[0]),d=ko);const p=s[c%o],v=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:(ko.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=ko),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(d.distanceToSquared(p),m),y=Math.pow(p.distanceToSquared(v),m),g=Math.pow(v.distanceToSquared(f),m);y<1e-4&&(y=1),x<1e-4&&(x=y),g<1e-4&&(g=y),Ml.initNonuniformCatmullRom(d.x,p.x,v.x,f.x,x,y,g),Sl.initNonuniformCatmullRom(d.y,p.y,v.y,f.y,x,y,g),El.initNonuniformCatmullRom(d.z,p.z,v.z,f.z,x,y,g)}else this.curveType==="catmullrom"&&(Ml.initCatmullRom(d.x,p.x,v.x,f.x,this.tension),Sl.initCatmullRom(d.y,p.y,v.y,f.y,this.tension),El.initCatmullRom(d.z,p.z,v.z,f.z,this.tension));return n.set(Ml.calc(u),Sl.calc(u),El.calc(u)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Q().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Fh(r,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=r*r,u=r*c;return(2*e-2*n+o+l)*u+(-3*e+3*n-2*o-l)*c+o*r+e}function ox(r,t){const e=1-r;return e*e*t}function ax(r,t){return 2*(1-r)*r*t}function lx(r,t){return r*r*t}function Ns(r,t,e,n){return ox(r,t)+ax(r,e)+lx(r,n)}function cx(r,t){const e=1-r;return e*e*e*t}function ux(r,t){const e=1-r;return 3*e*e*r*t}function hx(r,t){return 3*(1-r)*r*r*t}function dx(r,t){return r*r*r*t}function Os(r,t,e,n,s){return cx(r,t)+ux(r,e)+hx(r,n)+dx(r,s)}class Yd extends ei{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Os(t,s.x,o.x,l.x,c.x),Os(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class fx extends ei{constructor(t=new Q,e=new Q,n=new Q,s=new Q){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Q){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Os(t,s.x,o.x,l.x,c.x),Os(t,s.y,o.y,l.y,c.y),Os(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $d extends ei{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class px extends ei{constructor(t=new Q,e=new Q){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new Q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kd extends ei{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Ns(t,s.x,o.x,l.x),Ns(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class mx extends ei{constructor(t=new Q,e=new Q,n=new Q){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Q){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Ns(t,s.x,o.x,l.x),Ns(t,s.y,o.y,l.y),Ns(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jd extends ei{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,u=s[l===0?l:l-1],d=s[l],f=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(Fh(c,u.x,d.x,f.x,p.x),Fh(c,u.y,d.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new yt().fromArray(s))}return this}}var Xl=Object.freeze({__proto__:null,ArcCurve:rx,CatmullRomCurve3:sx,CubicBezierCurve:Yd,CubicBezierCurve3:fx,EllipseCurve:hc,LineCurve:$d,LineCurve3:px,QuadraticBezierCurve:Kd,QuadraticBezierCurve3:mx,SplineCurve:Jd});class gx extends ei{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Xl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],u=c.getLength(),d=u===0?0:1-l/u;return c.getPointAt(d,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,u=l.getPoints(c);for(let d=0;d<u.length;d++){const f=u[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Xl[s.type]().fromJSON(s))}return this}}class Hh extends gx{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new $d(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new Kd(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new Yd(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Jd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,u){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,s,o,l,c,u),this}absellipse(t,e,n,s,o,l,c,u){const d=new hc(t,e,n,s,o,l,c,u);if(this.curves.length>0){const p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Qi extends He{constructor(t=[new yt(0,-.5),new yt(.5,0),new yt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=qe(s,0,Math.PI*2);const o=[],l=[],c=[],u=[],d=[],f=1/e,p=new Q,v=new yt,m=new Q,x=new Q,y=new Q;let g=0,_=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,_=t[S+1].y-t[S].y,m.x=_*1,m.y=-g,m.z=_*0,y.copy(m),m.normalize(),u.push(m.x,m.y,m.z);break;case t.length-1:u.push(y.x,y.y,y.z);break;default:g=t[S+1].x-t[S].x,_=t[S+1].y-t[S].y,m.x=_*1,m.y=-g,m.z=_*0,x.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),u.push(m.x,m.y,m.z),y.copy(x)}for(let S=0;S<=e;S++){const M=n+S*f*s,P=Math.sin(M),N=Math.cos(M);for(let O=0;O<=t.length-1;O++){p.x=t[O].x*P,p.y=t[O].y,p.z=t[O].x*N,l.push(p.x,p.y,p.z),v.x=S/e,v.y=O/(t.length-1),c.push(v.x,v.y);const U=u[3*O+0]*P,H=u[3*O+1],D=u[3*O+0]*N;d.push(U,H,D)}}for(let S=0;S<e;S++)for(let M=0;M<t.length-1;M++){const P=M+S*t.length,N=P,O=P+t.length,U=P+t.length+1,H=P+1;o.push(N,O,H),o.push(U,H,O)}this.setIndex(o),this.setAttribute("position",new Me(l,3)),this.setAttribute("uv",new Me(c,2)),this.setAttribute("normal",new Me(d,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.points,t.segments,t.phiStart,t.phiLength)}}class Fs extends He{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:u};const d=this;s=Math.floor(s),o=Math.floor(o);const f=[],p=[],v=[],m=[];let x=0;const y=[],g=n/2;let _=0;S(),l===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(f),this.setAttribute("position",new Me(p,3)),this.setAttribute("normal",new Me(v,3)),this.setAttribute("uv",new Me(m,2));function S(){const P=new Q,N=new Q;let O=0;const U=(e-t)/n;for(let H=0;H<=o;H++){const D=[],R=H/o,W=R*(e-t)+t;for(let k=0;k<=s;k++){const F=k/s,C=F*u+c,Z=Math.sin(C),it=Math.cos(C);N.x=W*Z,N.y=-R*n+g,N.z=W*it,p.push(N.x,N.y,N.z),P.set(Z,U,it).normalize(),v.push(P.x,P.y,P.z),m.push(F,1-R),D.push(x++)}y.push(D)}for(let H=0;H<s;H++)for(let D=0;D<o;D++){const R=y[D][H],W=y[D+1][H],k=y[D+1][H+1],F=y[D][H+1];f.push(R,W,F),f.push(W,k,F),O+=6}d.addGroup(_,O,0),_+=O}function M(P){const N=x,O=new yt,U=new Q;let H=0;const D=P===!0?t:e,R=P===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,g*R,0),v.push(0,R,0),m.push(.5,.5),x++;const W=x;for(let k=0;k<=s;k++){const C=k/s*u+c,Z=Math.cos(C),it=Math.sin(C);U.x=D*it,U.y=g*R,U.z=D*Z,p.push(U.x,U.y,U.z),v.push(0,R,0),O.x=Z*.5+.5,O.y=it*.5*R+.5,m.push(O.x,O.y),x++}for(let k=0;k<s;k++){const F=N+k,C=W+k;P===!0?f.push(C,C+1,F):f.push(C+1,C,F),H+=3}d.addGroup(_,H,P===!0?1:2),_+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class fc extends Fs{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new fc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const zo=new Q,Bo=new Q,Tl=new Q,Fo=new Hn;class _x extends He{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(Ds*e),l=t.getIndex(),c=t.getAttribute("position"),u=l?l.count:c.count,d=[0,0,0],f=["a","b","c"],p=new Array(3),v={},m=[];for(let x=0;x<u;x+=3){l?(d[0]=l.getX(x),d[1]=l.getX(x+1),d[2]=l.getX(x+2)):(d[0]=x,d[1]=x+1,d[2]=x+2);const{a:y,b:g,c:_}=Fo;if(y.fromBufferAttribute(c,d[0]),g.fromBufferAttribute(c,d[1]),_.fromBufferAttribute(c,d[2]),Fo.getNormal(Tl),p[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,p[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,p[2]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const M=(S+1)%3,P=p[S],N=p[M],O=Fo[f[S]],U=Fo[f[M]],H=`${P}_${N}`,D=`${N}_${P}`;D in v&&v[D]?(Tl.dot(v[D].normal)<=o&&(m.push(O.x,O.y,O.z),m.push(U.x,U.y,U.z)),v[D]=null):H in v||(v[H]={index0:d[S],index1:d[M],normal:Tl.clone()})}}for(const x in v)if(v[x]){const{index0:y,index1:g}=v[x];zo.fromBufferAttribute(c,y),Bo.fromBufferAttribute(c,g),m.push(zo.x,zo.y,zo.z),m.push(Bo.x,Bo.y,Bo.z)}this.setAttribute("position",new Me(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class pc extends Hh{constructor(t){super(t),this.uuid=ns(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Hh().fromJSON(s))}return this}}const vx={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let o=Qd(r,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,u,d,f,p,v,m;if(n&&(o=Mx(r,t,o,e)),r.length>80*e){c=d=r[0],u=f=r[1];for(let x=e;x<s;x+=e)p=r[x],v=r[x+1],p<c&&(c=p),v<u&&(u=v),p>d&&(d=p),v>f&&(f=v);m=Math.max(d-c,f-u),m=m!==0?32767/m:0}return Hs(o,l,e,c,u,m,0),l}};function Qd(r,t,e,n,s){let o,l;if(s===Nx(r,t,e,n)>0)for(o=t;o<e;o+=n)l=Vh(o,r[o],r[o+1],l);else for(o=e-n;o>=t;o-=n)l=Vh(o,r[o],r[o+1],l);return l&&ma(l,l.next)&&(Gs(l),l=l.next),l}function sr(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(ma(e,e.next)||Te(e.prev,e,e.next)===0)){if(Gs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Hs(r,t,e,n,s,o,l){if(!r)return;!l&&o&&Cx(r,n,s,o);let c=r,u,d;for(;r.prev!==r.next;){if(u=r.prev,d=r.next,o?xx(r,n,s,o):yx(r)){t.push(u.i/e|0),t.push(r.i/e|0),t.push(d.i/e|0),Gs(r),r=d.next,c=d.next;continue}if(r=d,r===c){l?l===1?(r=bx(sr(r),t,e),Hs(r,t,e,n,s,o,2)):l===2&&wx(r,t,e,n,s,o):Hs(sr(r),t,e,n,s,o,1);break}}}function yx(r){const t=r.prev,e=r,n=r.next;if(Te(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,u=e.y,d=n.y,f=s<o?s<l?s:l:o<l?o:l,p=c<u?c<d?c:d:u<d?u:d,v=s>o?s>l?s:l:o>l?o:l,m=c>u?c>d?c:d:u>d?u:d;let x=n.next;for(;x!==t;){if(x.x>=f&&x.x<=v&&x.y>=p&&x.y<=m&&Wr(s,c,o,u,l,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function xx(r,t,e,n){const s=r.prev,o=r,l=r.next;if(Te(s,o,l)>=0)return!1;const c=s.x,u=o.x,d=l.x,f=s.y,p=o.y,v=l.y,m=c<u?c<d?c:d:u<d?u:d,x=f<p?f<v?f:v:p<v?p:v,y=c>u?c>d?c:d:u>d?u:d,g=f>p?f>v?f:v:p>v?p:v,_=ql(m,x,t,e,n),S=ql(y,g,t,e,n);let M=r.prevZ,P=r.nextZ;for(;M&&M.z>=_&&P&&P.z<=S;){if(M.x>=m&&M.x<=y&&M.y>=x&&M.y<=g&&M!==s&&M!==l&&Wr(c,f,u,p,d,v,M.x,M.y)&&Te(M.prev,M,M.next)>=0||(M=M.prevZ,P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Wr(c,f,u,p,d,v,P.x,P.y)&&Te(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;M&&M.z>=_;){if(M.x>=m&&M.x<=y&&M.y>=x&&M.y<=g&&M!==s&&M!==l&&Wr(c,f,u,p,d,v,M.x,M.y)&&Te(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;P&&P.z<=S;){if(P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Wr(c,f,u,p,d,v,P.x,P.y)&&Te(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function bx(r,t,e){let n=r;do{const s=n.prev,o=n.next.next;!ma(s,o)&&tf(s,n,n.next,o)&&Vs(s,o)&&Vs(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),Gs(n),Gs(n.next),n=r=o),n=n.next}while(n!==r);return sr(n)}function wx(r,t,e,n,s,o){let l=r;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&Rx(l,c)){let u=ef(l,c);l=sr(l,l.next),u=sr(u,u.next),Hs(l,t,e,n,s,o,0),Hs(u,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==r)}function Mx(r,t,e,n){const s=[];let o,l,c,u,d;for(o=0,l=t.length;o<l;o++)c=t[o]*n,u=o<l-1?t[o+1]*n:r.length,d=Qd(r,c,u,n,!1),d===d.next&&(d.steiner=!0),s.push(Px(d));for(s.sort(Sx),o=0;o<s.length;o++)e=Ex(s[o],e);return e}function Sx(r,t){return r.x-t.x}function Ex(r,t){const e=Tx(r,t);if(!e)return t;const n=ef(e,r);return sr(n,n.next),sr(e,e.next)}function Tx(r,t){let e=t,n=-1/0,s;const o=r.x,l=r.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const v=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(v<=o&&v>n&&(n=v,s=e.x<e.next.x?e:e.next,v===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,u=s.x,d=s.y;let f=1/0,p;e=s;do o>=e.x&&e.x>=u&&o!==e.x&&Wr(l<d?o:n,l,u,d,l<d?n:o,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(o-e.x),Vs(e,r)&&(p<f||p===f&&(e.x>s.x||e.x===s.x&&Ax(s,e)))&&(s=e,f=p)),e=e.next;while(e!==c);return s}function Ax(r,t){return Te(r.prev,r,t.prev)<0&&Te(t.next,r,r.next)<0}function Cx(r,t,e,n){let s=r;do s.z===0&&(s.z=ql(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,Lx(s)}function Lx(r){let t,e,n,s,o,l,c,u,d=1;do{for(e=r,r=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(u=d;c>0||u>0&&n;)c!==0&&(u===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,u--),o?o.nextZ=s:r=s,s.prevZ=o,o=s;e=n}o.nextZ=null,d*=2}while(l>1);return r}function ql(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function Px(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Wr(r,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(r-l)*(o-c)&&(r-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function Rx(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!Ix(r,t)&&(Vs(r,t)&&Vs(t,r)&&Dx(r,t)&&(Te(r.prev,r,t.prev)||Te(r,t.prev,t))||ma(r,t)&&Te(r.prev,r,r.next)>0&&Te(t.prev,t,t.next)>0)}function Te(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function ma(r,t){return r.x===t.x&&r.y===t.y}function tf(r,t,e,n){const s=Vo(Te(r,t,e)),o=Vo(Te(r,t,n)),l=Vo(Te(e,n,r)),c=Vo(Te(e,n,t));return!!(s!==o&&l!==c||s===0&&Ho(r,e,t)||o===0&&Ho(r,n,t)||l===0&&Ho(e,r,n)||c===0&&Ho(e,t,n))}function Ho(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Vo(r){return r>0?1:r<0?-1:0}function Ix(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&tf(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Vs(r,t){return Te(r.prev,r,r.next)<0?Te(r,t,r.next)>=0&&Te(r,r.prev,t)>=0:Te(r,t,r.prev)<0||Te(r,r.next,t)<0}function Dx(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,o=(r.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function ef(r,t){const e=new jl(r.i,r.x,r.y),n=new jl(t.i,t.x,t.y),s=r.next,o=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function Vh(r,t,e,n){const s=new jl(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Gs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function jl(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Nx(r,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(r[l]-r[o])*(r[o+1]+r[l+1]),l=o;return s}class Us{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return Us.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];Gh(t),Wh(n,t);let l=t.length;e.forEach(Gh);for(let u=0;u<e.length;u++)s.push(l),l+=e[u].length,Wh(n,e[u]);const c=vx.triangulate(n,s);for(let u=0;u<c.length;u+=3)o.push(c.slice(u,u+3));return o}}function Gh(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Wh(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class ga extends He{constructor(t=new pc([new yt(.5,.5),new yt(-.5,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,u=t.length;c<u;c++){const d=t[c];l(d)}this.setAttribute("position",new Me(s,3)),this.setAttribute("uv",new Me(o,2)),this.computeVertexNormals();function l(c){const u=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let v=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:m-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const _=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:Ox;let M,P=!1,N,O,U,H;_&&(M=_.getSpacedPoints(f),P=!0,v=!1,N=_.computeFrenetFrames(f,!1),O=new Q,U=new Q,H=new Q),v||(g=0,m=0,x=0,y=0);const D=c.extractPoints(d);let R=D.shape;const W=D.holes;if(!Us.isClockWise(R)){R=R.reverse();for(let vt=0,xt=W.length;vt<xt;vt++){const E=W[vt];Us.isClockWise(E)&&(W[vt]=E.reverse())}}const F=Us.triangulateShape(R,W),C=R;for(let vt=0,xt=W.length;vt<xt;vt++){const E=W[vt];R=R.concat(E)}function Z(vt,xt,E){return xt||console.error("THREE.ExtrudeGeometry: vec does not exist"),vt.clone().addScaledVector(xt,E)}const it=R.length,ot=F.length;function j(vt,xt,E){let et,$,A;const w=vt.x-xt.x,B=vt.y-xt.y,X=E.x-vt.x,K=E.y-vt.y,G=w*w+B*B,ft=w*K-B*X;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(G),pt=Math.sqrt(X*X+K*K),Tt=xt.x-B/lt,Et=xt.y+w/lt,At=E.x-K/pt,Ht=E.y+X/pt,zt=((At-Tt)*K-(Ht-Et)*X)/(w*K-B*X);et=Tt+w*zt-vt.x,$=Et+B*zt-vt.y;const Dt=et*et+$*$;if(Dt<=2)return new yt(et,$);A=Math.sqrt(Dt/2)}else{let lt=!1;w>Number.EPSILON?X>Number.EPSILON&&(lt=!0):w<-Number.EPSILON?X<-Number.EPSILON&&(lt=!0):Math.sign(B)===Math.sign(K)&&(lt=!0),lt?(et=-B,$=w,A=Math.sqrt(G)):(et=w,$=B,A=Math.sqrt(G/2))}return new yt(et/A,$/A)}const rt=[];for(let vt=0,xt=C.length,E=xt-1,et=vt+1;vt<xt;vt++,E++,et++)E===xt&&(E=0),et===xt&&(et=0),rt[vt]=j(C[vt],C[E],C[et]);const at=[];let q,tt=rt.concat();for(let vt=0,xt=W.length;vt<xt;vt++){const E=W[vt];q=[];for(let et=0,$=E.length,A=$-1,w=et+1;et<$;et++,A++,w++)A===$&&(A=0),w===$&&(w=0),q[et]=j(E[et],E[A],E[w]);at.push(q),tt=tt.concat(q)}for(let vt=0;vt<g;vt++){const xt=vt/g,E=m*Math.cos(xt*Math.PI/2),et=x*Math.sin(xt*Math.PI/2)+y;for(let $=0,A=C.length;$<A;$++){const w=Z(C[$],rt[$],et);St(w.x,w.y,-E)}for(let $=0,A=W.length;$<A;$++){const w=W[$];q=at[$];for(let B=0,X=w.length;B<X;B++){const K=Z(w[B],q[B],et);St(K.x,K.y,-E)}}}const Lt=x+y;for(let vt=0;vt<it;vt++){const xt=v?Z(R[vt],tt[vt],Lt):R[vt];P?(U.copy(N.normals[0]).multiplyScalar(xt.x),O.copy(N.binormals[0]).multiplyScalar(xt.y),H.copy(M[0]).add(U).add(O),St(H.x,H.y,H.z)):St(xt.x,xt.y,0)}for(let vt=1;vt<=f;vt++)for(let xt=0;xt<it;xt++){const E=v?Z(R[xt],tt[xt],Lt):R[xt];P?(U.copy(N.normals[vt]).multiplyScalar(E.x),O.copy(N.binormals[vt]).multiplyScalar(E.y),H.copy(M[vt]).add(U).add(O),St(H.x,H.y,H.z)):St(E.x,E.y,p/f*vt)}for(let vt=g-1;vt>=0;vt--){const xt=vt/g,E=m*Math.cos(xt*Math.PI/2),et=x*Math.sin(xt*Math.PI/2)+y;for(let $=0,A=C.length;$<A;$++){const w=Z(C[$],rt[$],et);St(w.x,w.y,p+E)}for(let $=0,A=W.length;$<A;$++){const w=W[$];q=at[$];for(let B=0,X=w.length;B<X;B++){const K=Z(w[B],q[B],et);P?St(K.x,K.y+M[f-1].y,M[f-1].x+E):St(K.x,K.y,p+E)}}}J(),nt();function J(){const vt=s.length/3;if(v){let xt=0,E=it*xt;for(let et=0;et<ot;et++){const $=F[et];Pt($[2]+E,$[1]+E,$[0]+E)}xt=f+g*2,E=it*xt;for(let et=0;et<ot;et++){const $=F[et];Pt($[0]+E,$[1]+E,$[2]+E)}}else{for(let xt=0;xt<ot;xt++){const E=F[xt];Pt(E[2],E[1],E[0])}for(let xt=0;xt<ot;xt++){const E=F[xt];Pt(E[0]+it*f,E[1]+it*f,E[2]+it*f)}}n.addGroup(vt,s.length/3-vt,0)}function nt(){const vt=s.length/3;let xt=0;wt(C,xt),xt+=C.length;for(let E=0,et=W.length;E<et;E++){const $=W[E];wt($,xt),xt+=$.length}n.addGroup(vt,s.length/3-vt,1)}function wt(vt,xt){let E=vt.length;for(;--E>=0;){const et=E;let $=E-1;$<0&&($=vt.length-1);for(let A=0,w=f+g*2;A<w;A++){const B=it*A,X=it*(A+1),K=xt+et+B,G=xt+$+B,ft=xt+$+X,lt=xt+et+X;It(K,G,ft,lt)}}}function St(vt,xt,E){u.push(vt),u.push(xt),u.push(E)}function Pt(vt,xt,E){kt(vt),kt(xt),kt(E);const et=s.length/3,$=S.generateTopUV(n,s,et-3,et-2,et-1);st($[0]),st($[1]),st($[2])}function It(vt,xt,E,et){kt(vt),kt(xt),kt(et),kt(xt),kt(E),kt(et);const $=s.length/3,A=S.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);st(A[0]),st(A[1]),st(A[3]),st(A[1]),st(A[2]),st(A[3])}function kt(vt){s.push(u[vt*3+0]),s.push(u[vt*3+1]),s.push(u[vt*3+2])}function st(vt){o.push(vt.x),o.push(vt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ux(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Xl[s.type]().fromJSON(s)),new ga(n,t.options)}}const Ox={generateTopUV:function(r,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],u=t[n*3+1],d=t[s*3],f=t[s*3+1];return[new yt(o,l),new yt(c,u),new yt(d,f)]},generateSideWallUV:function(r,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],u=t[e*3+2],d=t[n*3],f=t[n*3+1],p=t[n*3+2],v=t[s*3],m=t[s*3+1],x=t[s*3+2],y=t[o*3],g=t[o*3+1],_=t[o*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new yt(l,1-u),new yt(d,1-p),new yt(v,1-x),new yt(y,1-_)]:[new yt(c,1-u),new yt(f,1-p),new yt(m,1-x),new yt(g,1-_)]}};function Ux(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const o=r[n];e.shapes.push(o.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ia extends He{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],d=[],f=new Q,p=new Q,v=new Q;for(let m=0;m<=n;m++)for(let x=0;x<=s;x++){const y=x/s*o,g=m/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(y),p.y=(t+e*Math.cos(g))*Math.sin(y),p.z=e*Math.sin(g),c.push(p.x,p.y,p.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),v.subVectors(p,f).normalize(),u.push(v.x,v.y,v.z),d.push(x/s),d.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=s;x++){const y=(s+1)*m+x-1,g=(s+1)*(m-1)+x-1,_=(s+1)*(m-1)+x,S=(s+1)*m+x;l.push(y,g,S),l.push(g,_,S)}this.setIndex(l),this.setAttribute("position",new Me(c,3)),this.setAttribute("normal",new Me(u,3)),this.setAttribute("uv",new Me(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ia(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class tr extends cr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Al extends cr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sc,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=rc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nf extends Ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Cl=new Ae,Zh=new Q,Xh=new Q;class kx{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lc,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Zh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zh),Xh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xh),e.updateMatrixWorld(),Cl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Cl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Cl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class zx extends kx{constructor(){super(new zd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Yl extends nf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ke.DEFAULT_UP),this.updateMatrix(),this.target=new Ke,this.shadow=new zx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rf extends nf{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class qh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(qe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ic}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ic);const jh={type:"change"},Ll={type:"start"},Yh={type:"end"},Go=new ac,$h=new Ci,Bx=Math.cos(70*qm.DEG2RAD);class sf extends lr{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:vr.ROTATE,MIDDLE:vr.DOLLY,RIGHT:vr.PAN},this.touches={ONE:yr.ROTATE,TWO:yr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(I){I.addEventListener("keydown",At),this._domElementKeyEvents=I},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",At),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(jh),n.update(),o=s.NONE},this.update=function(){const I=new Q,ht=new rr().setFromUnitVectors(t.up,new Q(0,1,0)),Mt=ht.clone().invert(),Rt=new Q,Nt=new rr,re=new Q,ue=2*Math.PI;return function(Ie=null){const me=n.object.position;I.copy(me).sub(n.target),I.applyQuaternion(ht),c.setFromVector3(I),n.autoRotate&&o===s.NONE&&k(R(Ie)),n.enableDamping?(c.theta+=u.theta*n.dampingFactor,c.phi+=u.phi*n.dampingFactor):(c.theta+=u.theta,c.phi+=u.phi);let Ce=n.minAzimuthAngle,Se=n.maxAzimuthAngle;isFinite(Ce)&&isFinite(Se)&&(Ce<-Math.PI?Ce+=ue:Ce>Math.PI&&(Ce-=ue),Se<-Math.PI?Se+=ue:Se>Math.PI&&(Se-=ue),Ce<=Se?c.theta=Math.max(Ce,Math.min(Se,c.theta)):c.theta=c.theta>(Ce+Se)/2?Math.max(Ce,c.theta):Math.min(Se,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let rn=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)c.radius=at(c.radius);else{const dn=c.radius;c.radius=at(c.radius*d),rn=dn!=c.radius}if(I.setFromSpherical(c),I.applyQuaternion(Mt),me.copy(n.target).add(I),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&O){let dn=null;if(n.object.isPerspectiveCamera){const Xn=I.length();dn=at(Xn*d);const _i=Xn-dn;n.object.position.addScaledVector(P,_i),n.object.updateMatrixWorld(),rn=!!_i}else if(n.object.isOrthographicCamera){const Xn=new Q(N.x,N.y,0);Xn.unproject(n.object);const _i=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),rn=_i!==n.object.zoom;const Ve=new Q(N.x,N.y,0);Ve.unproject(n.object),n.object.position.sub(Ve).add(Xn),n.object.updateMatrixWorld(),dn=I.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;dn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(dn).add(n.object.position):(Go.origin.copy(n.object.position),Go.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Go.direction))<Bx?t.lookAt(n.target):($h.setFromNormalAndCoplanarPoint(n.object.up,n.target),Go.intersectPlane($h,n.target))))}else if(n.object.isOrthographicCamera){const dn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),dn!==n.object.zoom&&(n.object.updateProjectionMatrix(),rn=!0)}return d=1,O=!1,rn||Rt.distanceToSquared(n.object.position)>l||8*(1-Nt.dot(n.object.quaternion))>l||re.distanceToSquared(n.target)>l?(n.dispatchEvent(jh),Rt.copy(n.object.position),Nt.copy(n.object.quaternion),re.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",K),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.domElement.getRootNode().removeEventListener("keydown",Tt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",At),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new qh,u=new qh;let d=1;const f=new Q,p=new yt,v=new yt,m=new yt,x=new yt,y=new yt,g=new yt,_=new yt,S=new yt,M=new yt,P=new Q,N=new yt;let O=!1;const U=[],H={};let D=!1;function R(I){return I!==null?2*Math.PI/60*n.autoRotateSpeed*I:2*Math.PI/60/60*n.autoRotateSpeed}function W(I){const ht=Math.abs(I*.01);return Math.pow(.95,n.zoomSpeed*ht)}function k(I){u.theta-=I}function F(I){u.phi-=I}const C=function(){const I=new Q;return function(Mt,Rt){I.setFromMatrixColumn(Rt,0),I.multiplyScalar(-Mt),f.add(I)}}(),Z=function(){const I=new Q;return function(Mt,Rt){n.screenSpacePanning===!0?I.setFromMatrixColumn(Rt,1):(I.setFromMatrixColumn(Rt,0),I.crossVectors(n.object.up,I)),I.multiplyScalar(Mt),f.add(I)}}(),it=function(){const I=new Q;return function(Mt,Rt){const Nt=n.domElement;if(n.object.isPerspectiveCamera){const re=n.object.position;I.copy(re).sub(n.target);let ue=I.length();ue*=Math.tan(n.object.fov/2*Math.PI/180),C(2*Mt*ue/Nt.clientHeight,n.object.matrix),Z(2*Rt*ue/Nt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(C(Mt*(n.object.right-n.object.left)/n.object.zoom/Nt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/Nt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ot(I){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(I){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=I:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function rt(I,ht){if(!n.zoomToCursor)return;O=!0;const Mt=n.domElement.getBoundingClientRect(),Rt=I-Mt.left,Nt=ht-Mt.top,re=Mt.width,ue=Mt.height;N.x=Rt/re*2-1,N.y=-(Nt/ue)*2+1,P.set(N.x,N.y,1).unproject(n.object).sub(n.object.position).normalize()}function at(I){return Math.max(n.minDistance,Math.min(n.maxDistance,I))}function q(I){p.set(I.clientX,I.clientY)}function tt(I){rt(I.clientX,I.clientX),_.set(I.clientX,I.clientY)}function Lt(I){x.set(I.clientX,I.clientY)}function J(I){v.set(I.clientX,I.clientY),m.subVectors(v,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;k(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(v),n.update()}function nt(I){S.set(I.clientX,I.clientY),M.subVectors(S,_),M.y>0?ot(W(M.y)):M.y<0&&j(W(M.y)),_.copy(S),n.update()}function wt(I){y.set(I.clientX,I.clientY),g.subVectors(y,x).multiplyScalar(n.panSpeed),it(g.x,g.y),x.copy(y),n.update()}function St(I){rt(I.clientX,I.clientY),I.deltaY<0?j(W(I.deltaY)):I.deltaY>0&&ot(W(I.deltaY)),n.update()}function Pt(I){let ht=!1;switch(I.code){case n.keys.UP:I.ctrlKey||I.metaKey||I.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):it(0,n.keyPanSpeed),ht=!0;break;case n.keys.BOTTOM:I.ctrlKey||I.metaKey||I.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):it(0,-n.keyPanSpeed),ht=!0;break;case n.keys.LEFT:I.ctrlKey||I.metaKey||I.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):it(n.keyPanSpeed,0),ht=!0;break;case n.keys.RIGHT:I.ctrlKey||I.metaKey||I.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):it(-n.keyPanSpeed,0),ht=!0;break}ht&&(I.preventDefault(),n.update())}function It(I){if(U.length===1)p.set(I.pageX,I.pageY);else{const ht=te(I),Mt=.5*(I.pageX+ht.x),Rt=.5*(I.pageY+ht.y);p.set(Mt,Rt)}}function kt(I){if(U.length===1)x.set(I.pageX,I.pageY);else{const ht=te(I),Mt=.5*(I.pageX+ht.x),Rt=.5*(I.pageY+ht.y);x.set(Mt,Rt)}}function st(I){const ht=te(I),Mt=I.pageX-ht.x,Rt=I.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);_.set(0,Nt)}function vt(I){n.enableZoom&&st(I),n.enablePan&&kt(I)}function xt(I){n.enableZoom&&st(I),n.enableRotate&&It(I)}function E(I){if(U.length==1)v.set(I.pageX,I.pageY);else{const Mt=te(I),Rt=.5*(I.pageX+Mt.x),Nt=.5*(I.pageY+Mt.y);v.set(Rt,Nt)}m.subVectors(v,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;k(2*Math.PI*m.x/ht.clientHeight),F(2*Math.PI*m.y/ht.clientHeight),p.copy(v)}function et(I){if(U.length===1)y.set(I.pageX,I.pageY);else{const ht=te(I),Mt=.5*(I.pageX+ht.x),Rt=.5*(I.pageY+ht.y);y.set(Mt,Rt)}g.subVectors(y,x).multiplyScalar(n.panSpeed),it(g.x,g.y),x.copy(y)}function $(I){const ht=te(I),Mt=I.pageX-ht.x,Rt=I.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);S.set(0,Nt),M.set(0,Math.pow(S.y/_.y,n.zoomSpeed)),ot(M.y),_.copy(S);const re=(I.pageX+ht.x)*.5,ue=(I.pageY+ht.y)*.5;rt(re,ue)}function A(I){n.enableZoom&&$(I),n.enablePan&&et(I)}function w(I){n.enableZoom&&$(I),n.enableRotate&&E(I)}function B(I){n.enabled!==!1&&(U.length===0&&(n.domElement.setPointerCapture(I.pointerId),n.domElement.addEventListener("pointermove",X),n.domElement.addEventListener("pointerup",K)),!oe(I)&&(Kt(I),I.pointerType==="touch"?Ht(I):G(I)))}function X(I){n.enabled!==!1&&(I.pointerType==="touch"?zt(I):ft(I))}function K(I){switch(Vt(I),U.length){case 0:n.domElement.releasePointerCapture(I.pointerId),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.dispatchEvent(Yh),o=s.NONE;break;case 1:const ht=U[0],Mt=H[ht];Ht({pointerId:ht,pageX:Mt.x,pageY:Mt.y});break}}function G(I){let ht;switch(I.button){case 0:ht=n.mouseButtons.LEFT;break;case 1:ht=n.mouseButtons.MIDDLE;break;case 2:ht=n.mouseButtons.RIGHT;break;default:ht=-1}switch(ht){case vr.DOLLY:if(n.enableZoom===!1)return;tt(I),o=s.DOLLY;break;case vr.ROTATE:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enablePan===!1)return;Lt(I),o=s.PAN}else{if(n.enableRotate===!1)return;q(I),o=s.ROTATE}break;case vr.PAN:if(I.ctrlKey||I.metaKey||I.shiftKey){if(n.enableRotate===!1)return;q(I),o=s.ROTATE}else{if(n.enablePan===!1)return;Lt(I),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Ll)}function ft(I){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;J(I);break;case s.DOLLY:if(n.enableZoom===!1)return;nt(I);break;case s.PAN:if(n.enablePan===!1)return;wt(I);break}}function lt(I){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(I.preventDefault(),n.dispatchEvent(Ll),St(pt(I)),n.dispatchEvent(Yh))}function pt(I){const ht=I.deltaMode,Mt={clientX:I.clientX,clientY:I.clientY,deltaY:I.deltaY};switch(ht){case 1:Mt.deltaY*=16;break;case 2:Mt.deltaY*=100;break}return I.ctrlKey&&!D&&(Mt.deltaY*=10),Mt}function Tt(I){I.key==="Control"&&(D=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(I){I.key==="Control"&&(D=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function At(I){n.enabled===!1||n.enablePan===!1||Pt(I)}function Ht(I){switch(ae(I),U.length){case 1:switch(n.touches.ONE){case yr.ROTATE:if(n.enableRotate===!1)return;It(I),o=s.TOUCH_ROTATE;break;case yr.PAN:if(n.enablePan===!1)return;kt(I),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case yr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;vt(I),o=s.TOUCH_DOLLY_PAN;break;case yr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xt(I),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Ll)}function zt(I){switch(ae(I),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;E(I),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;et(I),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;A(I),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;w(I),n.update();break;default:o=s.NONE}}function Dt(I){n.enabled!==!1&&I.preventDefault()}function Kt(I){U.push(I.pointerId)}function Vt(I){delete H[I.pointerId];for(let ht=0;ht<U.length;ht++)if(U[ht]==I.pointerId){U.splice(ht,1);return}}function oe(I){for(let ht=0;ht<U.length;ht++)if(U[ht]==I.pointerId)return!0;return!1}function ae(I){let ht=H[I.pointerId];ht===void 0&&(ht=new yt,H[I.pointerId]=ht),ht.set(I.pageX,I.pageY)}function te(I){const ht=I.pointerId===U[0]?U[1]:U[0];return H[ht]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",K),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Tt,{passive:!0,capture:!0}),this.update()}}let Wo=null;function mc(r){return Wo||(Wo=new Promise(t=>{const e=r.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new Zd({canvas:r,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=md,o.toneMappingExposure=1,bt.renderer=o;const l=new Xd;l.background=new Qt(12113128),bt.scene=l;const c=new wn(45,n/s,.5,8e3);c.position.set(0,200,350),bt.camera=c;const u=new sf(c,r);u.enableDamping=!0,u.dampingFactor=.07,u.minDistance=10,u.maxDistance=4e3,u.screenSpacePanning=!0,u.maxPolarAngle=Math.PI/2,bt.controls=u,l.add(new rf(16777215,.78));const d=new Yl(16775924,.95);d.position.set(-250,700,200),l.add(d);const f=new Yl(14544639,.4);f.position.set(200,250,-200),l.add(f);const p=new Rs;l.add(p),bt.tg=p,window.addEventListener("resize",()=>{const m=e.clientWidth,x=e.clientHeight;!m||!x||(c.aspect=m/x,c.updateProjectionMatrix(),o.setSize(m,x))});function v(){requestAnimationFrame(v),u.update(),o.render(l,c)}v(),t()}),Wo)}function Fx(){if(bt.tg)for(;bt.tg.children.length;){const r=bt.tg.children[0];bt.tg.remove(r),r.geometry?.dispose(),Array.isArray(r.material)?r.material.forEach(t=>t.dispose()):r.material?.dispose()}}const Hx="#f0ede8",Vx="#c0bbb5",Gx="#0fe300",Wx="#0fe300",Zx="#0fe300",Xx="#0fe300",qx="#262626",kr="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function of(r,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:u,BASE_H:d}=bt;if(!e||!n)return d;const f=(r+s/2)/s*(n-1),p=(t+o/2)/o*(n-1),v=Math.max(0,Math.min(n-2,Math.floor(f))),m=Math.max(0,Math.min(n-2,Math.floor(p))),x=f-v,y=p-m,g=e[m*n+v]??l,_=e[m*n+v+1]??l,S=e[(m+1)*n+v]??l,M=e[(m+1)*n+v+1]??l,P=g*(1-x)*(1-y)+_*x*(1-y)+S*(1-x)*y+M*x*y;return d+Math.max(0,Math.min(1,(P-l)/Math.max(.001,c)))*u}function Zo(r,t,e){if(!r.positions.length||!r.indices.length)return null;const n=new He;n.setAttribute("position",new Tn(r.positions,3)),r.colors&&n.setAttribute("color",new Tn(r.colors,3)),n.setIndex(new Tn(r.indices,1)),n.computeVertexNormals();const s=new ze(n,t);return s.name=e,s}function jx(r){if(!bt.tg)return;Fx();const t=ad(),e=bt.tg;function n(o,l,c,u=-8){l.polygonOffset=!0,l.polygonOffsetFactor=u,l.polygonOffsetUnits=u;const d=Zo(o,l,c);d&&e.add(d)}const s=(o,l=.95,c=!1)=>new tr({color:new Qt(o),roughness:l,metalness:0,flatShading:c});{const o=new tr({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:gn,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=Zo(r.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=Yx(bt.wMm,bt.dMm,bt.zoneType);if(o){const l=new ga(o,{depth:bt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new ze(l,new tr({color:new Qt(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if($x(t.cBase),r.GROUND.positions.length){const o=new tr({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=Zo(r.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(r.LAND,s(Hx),"LAND",-2),n(r.ROCK,s(Vx),"ROCK",-3),n(r.FARM,s(Xx),"FARM",-4),n(r.GRASS,s(Gx),"GRASS",-5),n(r.PARKS,s(Zx),"PARKS",-6),n(r.FOREST,s(Wx),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=gn,n(r.WATER,o,"WATER",-8)}if(t.roadsOn){n(r.PED,s(qx,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=gn,n(r.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(r.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),r.GPX.positions.length){const o=new tr({color:new Qt(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=Zo(r.GPX,o,"GPX");l&&e.add(l)}Qx()}function Yx(r,t,e){const n=new pc;if(e==="circ")n.ellipse(0,0,r/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(r/2*Math.cos(o),r/2*Math.sin(o)):n.lineTo(r/2*Math.cos(o),r/2*Math.sin(o))}n.closePath()}else n.moveTo(-r/2,-t/2),n.lineTo(r/2,-t/2),n.lineTo(r/2,t/2),n.lineTo(-r/2,t/2),n.closePath();return n}function $x(r){if(!bt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=bt,o=new tr({color:new Qt(r),roughness:.55,side:gn});function l(u,d){return{x:u,z:d,topY:Math.max(n,of(u*.98,d*.98))}}function c(u){const d=[],f=[];let p=0;const v=u.length;for(let y=0;y<v;y++){const g=u[y],_=u[(y+1)%v],S=(g.x+_.x)/2,M=(g.z+_.z)/2,P=S*(_.z-g.z)-M*(_.x-g.x),[N,O]=P>=0?[g,_]:[_,g];d.push(N.x,N.topY,N.z,O.x,O.topY,O.z,O.x,0,O.z,N.x,0,N.z),f.push(p,p+1,p+2,p,p+2,p+3),p+=4}if(!d.length)return;const m=new He;m.setAttribute("position",new Me(d,3)),m.setIndex(f),m.computeVertexNormals();const x=new ze(m,o);x.name="WALLS",bt.tg.add(x)}if(s==="circ"){const d=t/2;c(Array.from({length:512},(f,p)=>{const v=p/512*Math.PI*2;return l(d*Math.cos(v),d*Math.sin(v))}))}else if(s==="hex"){const u=t/2;c(Array.from({length:6},(d,f)=>{const p=f/6*Math.PI*2-Math.PI/6;return l(u*Math.cos(p),u*Math.sin(p))}))}else if(bt.zonePts&&bt.zonePts.length>=3&&bt.bounds){const{bounds:u}=bt,d=e/(u.maxLat-u.minLat),f=t/(u.maxLon-u.minLon),p=(u.minLat+u.maxLat)/2,v=(u.minLon+u.maxLon)/2;c(bt.zonePts.map(([m,x])=>l((x-v)*f,-(m-p)*d)))}else{const u=-t/2,d=t/2,f=-e/2,p=e/2;c([l(u,f),l(d,f),l(d,p),l(u,p)])}}const Kx=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function Pl(r){const t=[],e=[];let n=0;for(const o of r){const l=o.attributes.position,c=o.index;for(let u=0;u<l.count;u++)t.push(l.getX(u),l.getY(u),l.getZ(u));if(c)for(let u=0;u<c.count;u++)e.push(c.getX(u)+n);else for(let u=0;u<l.count;u++)e.push(u+n);n+=l.count,o.dispose()}const s=new He;return s.setAttribute("position",new Me(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function Jx(r,t,e,n){const s=t/2,o=n/2;try{switch(r){case"eiffel":{const l=[new yt(s,0),new yt(s*.82,e*.035),new yt(s*.58,e*.08),new yt(s*.32,e*.135),new yt(s*.265,e*.165),new yt(s*.285,e*.175),new yt(s*.245,e*.188),new yt(s*.18,e*.23),new yt(s*.13,e*.33),new yt(s*.115,e*.348),new yt(s*.13,e*.358),new yt(s*.11,e*.37),new yt(s*.08,e*.43),new yt(s*.048,e*.6),new yt(s*.026,e*.83),new yt(s*.01,e*.94),new yt(0,e)],c=new Qi(l,4);c.rotateY(Math.PI/4);const u=new Fs(s*.32,s*.32,e*.012,16,1,!1);u.translate(0,e*.175,0);const d=new Fs(s*.145,s*.145,e*.01,16,1,!1);return d.translate(0,e*.358,0),Pl([c,u,d])}case"burj":{const l=[new yt(s,0),new yt(s*.8,e*.15),new yt(s*.55,e*.4),new yt(s*.25,e*.72),new yt(s*.08,e*.9),new yt(s*.02,e)];return new Qi(l,12)}case"dome":{const c=Array.from({length:13},(u,d)=>{const f=d/12*Math.PI/2;return new yt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new yt(s*.9,0),new yt(0,0)),new Qi(c,16)}case"onion":{const l=[new yt(s*.3,0),new yt(s*.55,e*.12),new yt(s,e*.4),new yt(s*.55,e*.65),new yt(s*.1,e*.85),new yt(s*.04,e)];return new Qi(l,12)}case"tower":{const l=[new yt(s,0),new yt(s*.65,e*.2),new yt(s*.3,e*.55),new yt(s*.1,e*.8),new yt(s*.03,e)];return new Qi(l,8)}case"pyramid":{const l=new fc(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,u=new cn(l,c,n);u.translate(-s+l/2,c/2,0);const d=new cn(l,c,n);d.translate(s-l/2,c/2,0);const f=new cn(t,e*.22,n);return f.translate(0,e*.89,0),Pl([u,d,f])}case"cathedral":{const l=t*.55,c=e*.65,u=t*.14,d=new cn(l,c,n);d.translate(0,c/2,0);const f=new cn(u,e,u);f.translate(-l/2+u/2,e/2,-o+u/2);const p=new cn(u,e,u);return p.translate(l/2-u/2,e/2,-o+u/2),Pl([d,f,p])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,u=new ia(l,Math.max(c,3),8,32);return u.scale(1,e/(l*.8),o/s),u.translate(0,e/2,0),u}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],u=new He;return u.setAttribute("position",new Me(l,3)),u.setIndex(c),u.computeVertexNormals(),u}case"wheel":{const l=Math.min(s,e/2),c=new ia(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new cn(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function Qx(){if(!bt.tg||!bt.bounds||!bt.elevGrid)return;const{bounds:r,wMm:t,dMm:e,mmPerMeter:n}=bt,s=(r.minLat+r.maxLat)/2,o=(r.minLon+r.maxLon)/2,l=e/(r.maxLat-r.minLat),c=t/(r.maxLon-r.minLon),u=.01;let d=0;for(const f of Kx){if(f.lat<r.minLat-u||f.lat>r.maxLat+u||f.lon<r.minLon-u||f.lon>r.maxLon+u)continue;const p=(f.lon-o)*c,v=-(f.lat-s)*l,m=t/2,x=e/2;if(!(p>=-m-1&&p<=m+1&&v>=-x-1&&v<=x+1))continue;const g=of(p,v),_=Math.min(t*.25,Math.max(5,f.rH*n*2)),S=Math.min(t*.08,Math.max(1.5,f.rW*n)),M=Math.min(t*.08,Math.max(1.5,f.rD*n)),P=Jx(f.sh,S,_,M);if(!P)continue;P.translate(p,g,v);const N=new ze(P,new tr({color:new Qt(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));N.name="LM_"+f.n,bt.tg.add(N),d++}d&&console.log(`Landmarks: ${d} monument(s)`)}var $r=Math.pow,en=(r,t,e)=>new Promise((n,s)=>{var o=u=>{try{c(e.next(u))}catch(d){s(d)}},l=u=>{try{c(e.throw(u))}catch(d){s(d)}},c=u=>u.done?n(u.value):Promise.resolve(u.value).then(o,l);c((e=e.apply(r,t)).next())}),Mn=Uint8Array,ks=Uint16Array,tb=Int32Array,af=new Mn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),lf=new Mn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),eb=new Mn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),cf=function(r,t){for(var e=new ks(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var s=new tb(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},uf=cf(af,2),hf=uf.b,nb=uf.r;hf[28]=258,nb[258]=28;var ib=cf(lf,0),rb=ib.b,df=new ks(32768);for(pe=0;pe<32768;++pe)di=(pe&43690)>>1|(pe&21845)<<1,di=(di&52428)>>2|(di&13107)<<2,di=(di&61680)>>4|(di&3855)<<4,df[pe]=((di&65280)>>8|(di&255)<<8)>>1;var di,pe,zs=function(r,t,e){for(var n=r.length,s=0,o=new ks(t);s<n;++s)r[s]&&++o[r[s]-1];var l=new ks(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new ks(1<<t);var u=15-t;for(s=0;s<n;++s)if(r[s])for(var d=s<<4|r[s],f=t-r[s],p=l[r[s]-1]++<<f,v=p|(1<<f)-1;p<=v;++p)c[df[p]>>u]=d}return c},js=new Mn(288);for(pe=0;pe<144;++pe)js[pe]=8;var pe;for(pe=144;pe<256;++pe)js[pe]=9;var pe;for(pe=256;pe<280;++pe)js[pe]=7;var pe;for(pe=280;pe<288;++pe)js[pe]=8;var pe,ff=new Mn(32);for(pe=0;pe<32;++pe)ff[pe]=5;var pe,sb=zs(js,9),ob=zs(ff,5),Rl=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},zn=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},Il=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},ab=function(r){return(r+7)/8|0},lb=function(r,t,e){(e==null||e>r.length)&&(e=r.length);var n=new Mn(e-t);return n.set(r.subarray(t,e)),n},cb=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],bn=function(r,t,e){var n=new Error(t||cb[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,bn),!e)throw n;return n},gc=function(r,t,e,n){var s=r.length,o=0;if(!s||t.f&&!t.l)return e||new Mn(0);var l=!e||t.i!=2,c=t.i;e||(e=new Mn(s*3));var u=function(kt){var st=e.length;if(kt>st){var vt=new Mn(Math.max(st*2,kt));vt.set(e),e=vt}},d=t.f||0,f=t.p||0,p=t.b||0,v=t.l,m=t.d,x=t.m,y=t.n,g=s*8;do{if(!v){d=zn(r,f,1);var _=zn(r,f+1,3);if(f+=3,_)if(_==1)v=sb,m=ob,x=9,y=5;else if(_==2){var N=zn(r,f,31)+257,O=zn(r,f+10,15)+4,U=N+zn(r,f+5,31)+1;f+=14;for(var H=new Mn(U),D=new Mn(19),R=0;R<O;++R)D[eb[R]]=zn(r,f+R*3,7);f+=O*3;for(var W=Rl(D),k=(1<<W)-1,F=zs(D,W),R=0;R<U;){var C=F[zn(r,f,k)];f+=C&15;var S=C>>4;if(S<16)H[R++]=S;else{var Z=0,it=0;for(S==16?(it=3+zn(r,f,3),f+=2,Z=H[R-1]):S==17?(it=3+zn(r,f,7),f+=3):S==18&&(it=11+zn(r,f,127),f+=7);it--;)H[R++]=Z}}var ot=H.subarray(0,N),j=H.subarray(N);x=Rl(ot),y=Rl(j),v=zs(ot,x),m=zs(j,y)}else bn(1);else{var S=ab(f)+4,M=r[S-4]|r[S-3]<<8,P=S+M;if(P>s){c&&bn(0);break}l&&u(p+M),e.set(r.subarray(S,P),p),t.b=p+=M,t.p=f=P*8,t.f=d;continue}if(f>g){c&&bn(0);break}}l&&u(p+131072);for(var rt=(1<<x)-1,at=(1<<y)-1,q=f;;q=f){var Z=v[Il(r,f)&rt],tt=Z>>4;if(f+=Z&15,f>g){c&&bn(0);break}if(Z||bn(2),tt<256)e[p++]=tt;else if(tt==256){q=f,v=null;break}else{var Lt=tt-254;if(tt>264){var R=tt-257,J=af[R];Lt=zn(r,f,(1<<J)-1)+hf[R],f+=J}var nt=m[Il(r,f)&at],wt=nt>>4;nt||bn(3),f+=nt&15;var j=rb[wt];if(wt>3){var J=lf[wt];j+=Il(r,f)&(1<<J)-1,f+=J}if(f>g){c&&bn(0);break}l&&u(p+131072);var St=p+Lt;if(p<j){var Pt=o-j,It=Math.min(j,St);for(Pt+p<0&&bn(3);p<It;++p)e[p]=n[Pt+p]}for(;p<St;p+=4)e[p]=e[p-j],e[p+1]=e[p+1-j],e[p+2]=e[p+2-j],e[p+3]=e[p+3-j];p=St}}t.l=v,t.p=q,t.b=p,t.f=d,v&&(d=1,t.m=x,t.d=m,t.n=y)}while(!d);return p==e.length?e:lb(e,0,p)},ub=new Mn(0),hb=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&bn(6,"invalid gzip data");var t=r[3],e=10;t&4&&(e+=(r[10]|r[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!r[e++]);return e+(t&2)},db=function(r){var t=r.length;return(r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0},fb=function(r,t){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&bn(6,"invalid zlib data"),(r[1]>>5&1)==1&&bn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function pb(r,t){return gc(r,{i:2},t,t)}function mb(r,t){var e=hb(r);return e+8>r.length&&bn(6,"invalid gzip data"),gc(r.subarray(e,-8),{i:2},new Mn(db(r)),t)}function gb(r,t){return gc(r.subarray(fb(r),-4),{i:2},t,t)}function $l(r,t){return r[0]==31&&r[1]==139&&r[2]==8?mb(r,t):(r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31?pb(r,t):gb(r,t)}var _b=typeof TextDecoder<"u"&&new TextDecoder,vb=0;try{_b.decode(ub,{stream:!0}),vb=1}catch{}var pf=(r,t)=>r*$r(2,t),Es=(r,t)=>Math.floor(r/$r(2,t)),ra=(r,t)=>pf(r.getUint16(t+1,!0),8)+r.getUint8(t),mf=(r,t)=>pf(r.getUint32(t+2,!0),16)+r.getUint16(t,!0),yb=(r,t,e,n,s)=>{if(r!==n.getUint8(s))return r-n.getUint8(s);const o=ra(n,s+1);if(t!==o)return t-o;const l=ra(n,s+4);return e!==l?e-l:0},xb=(r,t,e,n)=>{const s=gf(r,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},Kh=(r,t,e,n)=>{const s=gf(r,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},gf=(r,t,e,n)=>{let s=0,o=r.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=yb(t,e,n,r,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[mf(r,l*17+7),r.getUint32(l*17+13,!0)]}return null},bb=(r,t)=>r.isDir&&!t.isDir?1:!r.isDir&&t.isDir?-1:r.z!==t.z?r.z-t.z:r.x!==t.x?r.x-t.x:r.y-t.y,_f=(r,t)=>{const e=r.getUint8(t*17);return{z:e&127,x:ra(r,t*17+1),y:ra(r,t*17+4),offset:mf(r,t*17+7),length:r.getUint32(t*17+13,!0),isDir:e>>7===1}},Jh=r=>{const t=[],e=new DataView(r);for(let n=0;n<e.byteLength/17;n++)t.push(_f(e,n));return wb(t)},wb=r=>{r.sort(bb);const t=new ArrayBuffer(17*r.length),e=new Uint8Array(t);for(let n=0;n<r.length;n++){const s=r[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=Es(s.offset,8)&255,e[n*17+9]=Es(s.offset,16)&255,e[n*17+10]=Es(s.offset,24)&255,e[n*17+11]=Es(s.offset,32)&255,e[n*17+12]=Es(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},Mb=(r,t)=>{if(r.byteLength<17)return null;const e=r.byteLength/17,n=_f(r,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function Sb(r){return en(this,null,function*(){const t=yield r.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let u=0;"minzoom"in l&&(u=+l.minzoom);let d=0;"maxzoom"in l&&(d=+l.maxzoom);let f=0,p=0,v=0,m=-180,x=-85,y=180,g=85;if(l.bounds){const S=l.bounds.split(",");m=+S[0],x=+S[1],y=+S[2],g=+S[3]}if(l.center){const S=l.center.split(",");f=+S[0],p=+S[1],v=+S[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:u,maxZoom:d,minLon:m,minLat:x,maxLon:y,maxLat:g,centerZoom:v,centerLon:f,centerLat:p,etag:t.etag}})}function Eb(r,t,e,n,s,o,l){return en(this,null,function*(){let c=yield e.getArrayBuffer(t,r.rootDirectoryOffset,r.rootDirectoryLength,r);r.specVersion===1&&(c=Jh(c));const u=Kh(new DataView(c),n,s,o);if(u){let p=(yield t.getBytes(u.offset,u.length,l)).data;const v=new DataView(p);return v.getUint8(0)===31&&v.getUint8(1)===139&&(p=$l(new Uint8Array(p))),{data:p}}const d=Mb(new DataView(c),{z:n,x:s,y:o});if(d){const f=xb(new DataView(c),d.z,d.x,d.y);if(f){let p=yield e.getArrayBuffer(t,f.offset,f.length,r);r.specVersion===1&&(p=Jh(p));const v=Kh(new DataView(p),n,s,o);if(v){let x=(yield t.getBytes(v.offset,v.length,l)).data;const y=new DataView(x);return y.getUint8(0)===31&&y.getUint8(1)===139&&(x=$l(new Uint8Array(x))),{data:x}}}}})}var vf={getHeader:Sb,getZxy:Eb};function zr(r,t){return(t>>>0)*4294967296+(r>>>0)}function Tb(r,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return zr(r,s);throw new Error("Expected varint not more than 10 bytes")}function Ts(r){const t=r.buf;let e=t[r.pos++],n=e&127;return e<128||(e=t[r.pos++],n|=(e&127)<<7,e<128)||(e=t[r.pos++],n|=(e&127)<<14,e<128)||(e=t[r.pos++],n|=(e&127)<<21,e<128)?n:(e=t[r.pos],n|=(e&15)<<28,Tb(n,r))}function Ab(r,t,e,n){if(n===0){e===1&&(t[0]=r-1-t[0],t[1]=r-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var Cb=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function Lb(r,t,e){if(r>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>$r(2,r)-1||e>$r(2,r)-1)throw Error("tile x/y outside zoom level bounds");const n=Cb[r],s=$r(2,r);let o=0,l=0,c=0;const u=[t,e];let d=s/2;for(;d>0;)o=(u[0]&d)>0?1:0,l=(u[1]&d)>0?1:0,c+=d*d*(3*o^l),Ab(d,u,o,l),d=d/2;return n+c}function yf(r,t){return en(this,null,function*(){if(t===1||t===0)return r;if(t===2){if(typeof globalThis.DecompressionStream>"u")return $l(new Uint8Array(r));const e=new Response(r).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function Pb(r){return r===1?".mvt":r===2?".png":r===3?".jpg":r===4?".webp":r===5?".avif":""}var Rb=127;function Ib(r,t){let e=0,n=r.length-1;for(;e<=n;){const s=n+e>>1,o=t-r[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return r[s]}return n>=0&&(r[n].runLength===0||t-r[n].tileId<r[n].runLength)?r[n]:null}var Db=class{constructor(r,t=new Headers){this.url=r,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(r){this.customHeaders=r}getBytes(r,t,e,n){return en(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${r}-${r+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let u=yield fetch(this.url,{signal:o,cache:c,headers:l});if(r===0&&u.status===416){const v=u.headers.get("Content-Range");if(!v||!v.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const m=+v.substr(8);u=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${m-1}`}})}let d=u.headers.get("Etag");if(d?.startsWith("W/")&&(d=null),u.status===416||n&&d&&d!==n)throw this.mustReload=!0,new Kl(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(u.status>=300)throw Error(`Bad response code: ${u.status}`);const f=u.headers.get("Content-Length");if(u.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield u.arrayBuffer(),etag:d||void 0,cacheControl:u.headers.get("Cache-Control")||void 0,expires:u.headers.get("Expires")||void 0}})}};function Bn(r,t){const e=r.getUint32(t+4,!0),n=r.getUint32(t+0,!0);return e*$r(2,32)+n}function Nb(r,t){const e=new DataView(r),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:Bn(e,8),rootDirectoryLength:Bn(e,16),jsonMetadataOffset:Bn(e,24),jsonMetadataLength:Bn(e,32),leafDirectoryOffset:Bn(e,40),leafDirectoryLength:Bn(e,48),tileDataOffset:Bn(e,56),tileDataLength:Bn(e,64),numAddressedTiles:Bn(e,72),numTileEntries:Bn(e,80),numTileContents:Bn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function xf(r){const t={buf:new Uint8Array(r),pos:0},e=Ts(t),n=[];let s=0;for(let o=0;o<e;o++){const l=Ts(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=Ts(t);for(let o=0;o<e;o++)n[o].length=Ts(t);for(let o=0;o<e;o++){const l=Ts(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function Ob(r){const t=new DataView(r);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var Kl=class extends Error{};function Ub(r,t){return en(this,null,function*(){const e=yield r.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(Ob(e.data)<3)return[yield vf.getHeader(r)];const s=e.data.slice(0,Rb),o=Nb(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${r.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,u=xf(yield t(l,o.internalCompression));return[o,[c,u.length,u]]})}function kb(r,t,e,n,s){return en(this,null,function*(){const o=yield r.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=xf(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var zb=class{constructor(r=100,t=!0,e=yf){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=r,this.counter=1,this.decompress=e}getHeader(r){return en(this,null,function*(){const t=r.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{Ub(r,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(r,t,e,n){return en(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{kb(r,this.decompress,t,e,n).then(d=>{c(d),this.prune()}).catch(d=>{u(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(r,t,e,n){return en(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{r.getBytes(t,e,void 0,n.etag).then(d=>{c(d.data),this.cache.has(s),this.prune()}).catch(d=>{u(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let r=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<r&&(r=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(r){return en(this,null,function*(){const t=r.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(r.getKey());const e=new Promise((n,s)=>{this.getHeader(r).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},Bb=class{constructor(r,t,e){typeof r=="string"?this.source=new Db(r):this.source=r,e?this.decompress=e:this.decompress=yf,t?this.cache=t:this.cache=new zb}getHeader(){return en(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(r,t,e,n){return en(this,null,function*(){const s=Lb(r,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return vf.getZxy(o,this.source,this.cache,r,t,e,n);if(r<o.minZoom||r>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let u=0;u<=3;u++){const d=yield this.cache.getDirectory(this.source,l,c,o),f=Ib(d,s);if(f){if(f.runLength>0){const p=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(p.data,o.tileCompression),cacheControl:p.cacheControl,expires:p.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(r,t,e,n){return en(this,null,function*(){try{return yield this.getZxyAttempt(r,t,e,n)}catch(s){if(s instanceof Kl)return this.cache.invalidate(this.source),yield this.getZxyAttempt(r,t,e,n);throw s}})}getMetadataAttempt(){return en(this,null,function*(){const r=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(r.jsonMetadataOffset,r.jsonMetadataLength,void 0,r.etag),e=yield this.decompress(t.data,r.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return en(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(r){if(r instanceof Kl)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw r}})}getTileJson(r){return en(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=Pb(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${r}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const Dl=new Map;function Fb(r){return Dl.has(r)||Dl.set(r,new Bb(r)),Dl.get(r)}function Hb(r,t){const e=[];let n=0;const s=new Uint8Array(r);function o(){let d=0,f=0;for(;n<s.length;){const p=s[n++];if(d|=(p&127)<<f,!(p&128))break;f+=7}return d}function l(){if(n>=s.length)return null;const d=o();return{field:d>>3,wire:d&7}}function c(d){if(d===0)o();else if(d===2){const f=o();n+=f}else d===5?n+=4:d===1&&(n+=8)}function u(){const d=o(),f=new Uint8Array(r,n,d);return n+=d,new TextDecoder().decode(f)}for(;n<s.length;){const d=l();if(!d)break;if(d.field===3&&d.wire===2){const f=o(),p=n+f;let v="";const m=[],x=[],y=[];for(;n<p;){const g=l();if(!g)break;if(g.field===1&&g.wire===2)v=u();else if(g.field===3&&g.wire===2)m.push(u());else if(g.field===4&&g.wire===2){const _=o(),S=n+_;for(;n<S;){const M=l();if(!M)break;if(M.wire===2){const P=o(),N=new Uint8Array(r,n,P);n+=P,x.push(new TextDecoder().decode(N))}else M.field===5&&M.wire===0?x.push(o()!==0):M.field===6&&M.wire===0||M.field===7&&M.wire===0?x.push(o()):c(M.wire)}}else if(g.field===5&&g.wire===0)o();else if(g.field===2&&g.wire===2){const _=o(),S=n+_;let M=0;const P=[],N=[];for(;n<S;){const O=l();if(!O)break;if(O.field===3&&O.wire===0)M=o();else if(O.field===2&&O.wire===2){const U=o(),H=n+U;for(;n<H;)P.push(o())}else if(O.field===4&&O.wire===2){const U=o(),H=n+U;for(;n<H;)N.push(o())}else c(O.wire)}y.push({type:M,tags:P,geom:N})}else c(g.wire)}if(n=p,t&&t!==v)continue;for(const g of y){const _={};for(let D=0;D<g.tags.length-1;D+=2)_[m[g.tags[D]]]=x[g.tags[D+1]]??null;const S=[];let M=0,P=0,N=[],O=0,U=0,H=0;for(;H<g.geom.length;){if(U===0){const D=g.geom[H++];O=D&7,U=D>>3}if(O===1||O===2){O===1&&N.length>=2&&(S.push(N),N=[]);const D=Qh(g.geom[H++]),R=Qh(g.geom[H++]);M+=D,P+=R,N.push({lat:P,lon:M}),U--}else O===7?(N.length>=2&&(S.push(N),N=[]),U--):(H++,U--)}N.length>=2&&S.push(N),e.push({layer:v,type:g.type,properties:_,rings:S})}}else c(d.wire)}return e}function Qh(r){return r>>1^-(r&1)}function Vb(r,t,e,n,s,o){const l=2**e,c=(r+n/o)/l,u=(t+s/o)/l,d=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI,lon:d}}async function Gb(r,t){const s=[{path:`${kr}/buildings.pmtiles`,z:14,name:"building"},{path:`${kr}/transportation.pmtiles`,z:14,name:"segment"},{path:`${kr}/base.pmtiles`,z:13,name:"water"},{path:`${kr}/base.pmtiles`,z:13,name:"land"},{path:`${kr}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${kr}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:u,name:d}of s){try{const f=Fb(c),p=(y,g)=>{const _=2**u,S=Math.floor((g+180)/360*_),M=y*Math.PI/180,P=Math.floor((1-Math.log(Math.tan(M)+1/Math.cos(M))/Math.PI)/2*_);return{x:S,y:P}},v=p(r.maxLat,r.minLon),m=p(r.minLat,r.maxLon),x=[];for(let y=v.y;y<=m.y;y++)for(let g=v.x;g<=m.x;g++)x.push((async(_,S)=>{try{const M=await f.getZxy(u,_,S);if(!M)return;const P=Hb(M.data,d);for(const N of P){for(const O of N.rings)for(const U of O){const H=Vb(_,S,u,U.lon,U.lat,4096);U.lat=H.lat,U.lon=H.lon}o.push(N)}}catch{}})(g,y));await Promise.all(x)}catch{}l++,t(Math.round(l/s.length*100))}return o}function bf(r="terrain3d.stl"){if(!bt.tg)return;const t=[];new Q;const e=new Q;if(bt.tg.traverse(m=>{if(!(m instanceof ze))return;const x=m.geometry,y=x.attributes.position;if(!y)return;const g=x.index,_=m.matrixWorld;function S(M){const P=new Q(y.getX(M),y.getY(M),y.getZ(M));return P.applyMatrix4(_),P}if(g)for(let M=0;M<g.count;M+=3)t.push([S(g.getX(M)),S(g.getX(M+1)),S(g.getX(M+2))]);else for(let M=0;M<y.count;M+=3)t.push([S(M),S(M+1),S(M+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let m=0;m<Math.min(l.length,80);m++)s.setUint8(m,l[m]);s.setUint32(80,t.length,!0);let c=84;const u=new Q,d=new Q;for(const[m,x,y]of t){u.subVectors(x,m),d.subVectors(y,m),e.crossVectors(u,d).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const g of[m,x,y])s.setFloat32(c,g.x,!0),c+=4,s.setFloat32(c,g.y,!0),c+=4,s.setFloat32(c,g.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),p=URL.createObjectURL(f),v=document.createElement("a");v.href=p,v.download=r,v.click(),URL.revokeObjectURL(p),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function Xo(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var wf={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(r,t){(function(e){r.exports=e()})(function(){return function e(n,s,o){function l(d,f){if(!s[d]){if(!n[d]){var p=typeof Xo=="function"&&Xo;if(!f&&p)return p(d,!0);if(c)return c(d,!0);var v=new Error("Cannot find module '"+d+"'");throw v.code="MODULE_NOT_FOUND",v}var m=s[d]={exports:{}};n[d][0].call(m.exports,function(x){var y=n[d][1][x];return l(y||x)},m,m.exports,e,n,s,o)}return s[d].exports}for(var c=typeof Xo=="function"&&Xo,u=0;u<o.length;u++)l(o[u]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(u){for(var d,f,p,v,m,x,y,g=[],_=0,S=u.length,M=S,P=o.getTypeOf(u)!=="string";_<u.length;)M=S-_,p=P?(d=u[_++],f=_<S?u[_++]:0,_<S?u[_++]:0):(d=u.charCodeAt(_++),f=_<S?u.charCodeAt(_++):0,_<S?u.charCodeAt(_++):0),v=d>>2,m=(3&d)<<4|f>>4,x=1<M?(15&f)<<2|p>>6:64,y=2<M?63&p:64,g.push(c.charAt(v)+c.charAt(m)+c.charAt(x)+c.charAt(y));return g.join("")},s.decode=function(u){var d,f,p,v,m,x,y=0,g=0,_="data:";if(u.substr(0,_.length)===_)throw new Error("Invalid base64 input, it looks like a data url.");var S,M=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===c.charAt(64)&&M--,u.charAt(u.length-2)===c.charAt(64)&&M--,M%1!=0)throw new Error("Invalid base64 input, bad content length.");for(S=l.uint8array?new Uint8Array(0|M):new Array(0|M);y<u.length;)d=c.indexOf(u.charAt(y++))<<2|(v=c.indexOf(u.charAt(y++)))>>4,f=(15&v)<<4|(m=c.indexOf(u.charAt(y++)))>>2,p=(3&m)<<6|(x=c.indexOf(u.charAt(y++))),S[g++]=d,m!==64&&(S[g++]=f),x!==64&&(S[g++]=p);return S}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),u=e("./stream/DataLengthProbe");function d(f,p,v,m,x){this.compressedSize=f,this.uncompressedSize=p,this.crc32=v,this.compression=m,this.compressedContent=x}d.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),p=this;return f.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(f,p,v){return f.pipe(new c).pipe(new u("uncompressedSize")).pipe(p.compressWorker(v)).pipe(new u("compressedSize")).withStreamInfo("compression",p)},n.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,u=[],d=0;d<256;d++){c=d;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;u[d]=c}return u}();n.exports=function(c,u){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(d,f,p,v){var m=l,x=v+p;d^=-1;for(var y=v;y<x;y++)d=d>>>8^m[255&(d^f[y])];return-1^d}(0|u,c,c.length,0):function(d,f,p,v){var m=l,x=v+p;d^=-1;for(var y=v;y<x;y++)d=d>>>8^m[255&(d^f.charCodeAt(y))];return-1^d}(0|u,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),u=e("./stream/GenericWorker"),d=o?"uint8array":"array";function f(p,v){u.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=v,this.meta={}}s.magic="\b\0",c.inherits(f,u),f.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(d,p.data),!1)},f.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(v){p.push({data:v,meta:p.meta})}},s.compressWorker=function(p){return new f("Deflate",p)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(m,x){var y,g="";for(y=0;y<x;y++)g+=String.fromCharCode(255&m),m>>>=8;return g}function l(m,x,y,g,_,S){var M,P,N=m.file,O=m.compression,U=S!==d.utf8encode,H=c.transformTo("string",S(N.name)),D=c.transformTo("string",d.utf8encode(N.name)),R=N.comment,W=c.transformTo("string",S(R)),k=c.transformTo("string",d.utf8encode(R)),F=D.length!==N.name.length,C=k.length!==R.length,Z="",it="",ot="",j=N.dir,rt=N.date,at={crc32:0,compressedSize:0,uncompressedSize:0};x&&!y||(at.crc32=m.crc32,at.compressedSize=m.compressedSize,at.uncompressedSize=m.uncompressedSize);var q=0;x&&(q|=8),U||!F&&!C||(q|=2048);var tt=0,Lt=0;j&&(tt|=16),_==="UNIX"?(Lt=798,tt|=function(nt,wt){var St=nt;return nt||(St=wt?16893:33204),(65535&St)<<16}(N.unixPermissions,j)):(Lt=20,tt|=function(nt){return 63&(nt||0)}(N.dosPermissions)),M=rt.getUTCHours(),M<<=6,M|=rt.getUTCMinutes(),M<<=5,M|=rt.getUTCSeconds()/2,P=rt.getUTCFullYear()-1980,P<<=4,P|=rt.getUTCMonth()+1,P<<=5,P|=rt.getUTCDate(),F&&(it=o(1,1)+o(f(H),4)+D,Z+="up"+o(it.length,2)+it),C&&(ot=o(1,1)+o(f(W),4)+k,Z+="uc"+o(ot.length,2)+ot);var J="";return J+=`
\0`,J+=o(q,2),J+=O.magic,J+=o(M,2),J+=o(P,2),J+=o(at.crc32,4),J+=o(at.compressedSize,4),J+=o(at.uncompressedSize,4),J+=o(H.length,2),J+=o(Z.length,2),{fileRecord:p.LOCAL_FILE_HEADER+J+H+Z,dirRecord:p.CENTRAL_FILE_HEADER+o(Lt,2)+J+o(W.length,2)+"\0\0\0\0"+o(tt,4)+o(g,4)+H+Z+W}}var c=e("../utils"),u=e("../stream/GenericWorker"),d=e("../utf8"),f=e("../crc32"),p=e("../signature");function v(m,x,y,g){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=x,this.zipPlatform=y,this.encodeFileName=g,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(v,u),v.prototype.push=function(m){var x=m.meta.percent||0,y=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,u.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:y?(x+100*(y-g-1))/y:100}}))},v.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var x=this.streamFiles&&!m.file.dir;if(x){var y=l(m,x,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},v.prototype.closedSource=function(m){this.accumulate=!1;var x=this.streamFiles&&!m.file.dir,y=l(m,x,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),x)this.push({data:function(g){return p.DATA_DESCRIPTOR+o(g.crc32,4)+o(g.compressedSize,4)+o(g.uncompressedSize,4)}(m),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},v.prototype.flush=function(){for(var m=this.bytesWritten,x=0;x<this.dirRecords.length;x++)this.push({data:this.dirRecords[x],meta:{percent:100}});var y=this.bytesWritten-m,g=function(_,S,M,P,N){var O=c.transformTo("string",N(P));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(_,2)+o(_,2)+o(S,4)+o(M,4)+o(O.length,2)+O}(this.dirRecords.length,y,m,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},v.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},v.prototype.registerPrevious=function(m){this._sources.push(m);var x=this;return m.on("data",function(y){x.processChunk(y)}),m.on("end",function(){x.closedSource(x.previous.streamInfo),x._sources.length?x.prepareNextSource():x.end()}),m.on("error",function(y){x.error(y)}),this},v.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},v.prototype.error=function(m){var x=this._sources;if(!u.prototype.error.call(this,m))return!1;for(var y=0;y<x.length;y++)try{x[y].error(m)}catch{}return!0},v.prototype.lock=function(){u.prototype.lock.call(this);for(var m=this._sources,x=0;x<m.length;x++)m[x].lock()},n.exports=v},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,u,d){var f=new l(u.streamFiles,d,u.platform,u.encodeFileName),p=0;try{c.forEach(function(v,m){p++;var x=function(S,M){var P=S||M,N=o[P];if(!N)throw new Error(P+" is not a valid compression method !");return N}(m.options.compression,u.compression),y=m.options.compressionOptions||u.compressionOptions||{},g=m.dir,_=m.date;m._compressWorker(x,y).withStreamInfo("file",{name:v,dir:g,date:_,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(f)}),f.entriesCount=p}catch(v){f.error(v)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),u=e("./zipEntries"),d=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function p(v){return new l.Promise(function(m,x){var y=v.decompressed.getContentWorker().pipe(new d);y.on("error",function(g){x(g)}).on("end",function(){y.streamInfo.crc32!==v.decompressed.crc32?x(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}n.exports=function(v,m){var x=this;return m=o.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(v)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",v,!0,m.optimizedBinaryString,m.base64).then(function(y){var g=new u(m);return g.load(y),g}).then(function(y){var g=[l.Promise.resolve(y)],_=y.files;if(m.checkCRC32)for(var S=0;S<_.length;S++)g.push(p(_[S]));return l.Promise.all(g)}).then(function(y){for(var g=y.shift(),_=g.files,S=0;S<_.length;S++){var M=_[S],P=M.fileNameStr,N=o.resolve(M.fileNameStr);x.file(N,M.decompressed,{binary:!0,optimizedBinaryString:!0,date:M.date,dir:M.dir,comment:M.fileCommentStr.length?M.fileCommentStr:null,unixPermissions:M.unixPermissions,dosPermissions:M.dosPermissions,createFolders:m.createFolders}),M.dir||(x.file(N).unsafeOriginalName=P)}return g.zipComment.length&&(x.comment=g.zipComment),x})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(u,d){l.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(d)}o.inherits(c,l),c.prototype._bindStream=function(u){var d=this;(this._stream=u).pause(),u.on("data",function(f){d.push({data:f,meta:{percent:0}})}).on("error",function(f){d.isPaused?this.generatedError=f:d.error(f)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,u,d){o.call(this,u),this._helper=c;var f=this;c.on("data",function(p,v){f.push(p)||f._helper.pause(),d&&d(v)}).on("error",function(p){f.emit("error",p)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(N,O,U){var H,D=c.getTypeOf(O),R=c.extend(U||{},f);R.date=R.date||new Date,R.compression!==null&&(R.compression=R.compression.toUpperCase()),typeof R.unixPermissions=="string"&&(R.unixPermissions=parseInt(R.unixPermissions,8)),R.unixPermissions&&16384&R.unixPermissions&&(R.dir=!0),R.dosPermissions&&16&R.dosPermissions&&(R.dir=!0),R.dir&&(N=_(N)),R.createFolders&&(H=g(N))&&S.call(this,H,!0);var W=D==="string"&&R.binary===!1&&R.base64===!1;U&&U.binary!==void 0||(R.binary=!W),(O instanceof p&&O.uncompressedSize===0||R.dir||!O||O.length===0)&&(R.base64=!1,R.binary=!0,O="",R.compression="STORE",D="string");var k=null;k=O instanceof p||O instanceof u?O:x.isNode&&x.isStream(O)?new y(N,O):c.prepareContent(N,O,R.binary,R.optimizedBinaryString,R.base64);var F=new v(N,k,R);this.files[N]=F}var l=e("./utf8"),c=e("./utils"),u=e("./stream/GenericWorker"),d=e("./stream/StreamHelper"),f=e("./defaults"),p=e("./compressedObject"),v=e("./zipObject"),m=e("./generate"),x=e("./nodejsUtils"),y=e("./nodejs/NodejsStreamInputAdapter"),g=function(N){N.slice(-1)==="/"&&(N=N.substring(0,N.length-1));var O=N.lastIndexOf("/");return 0<O?N.substring(0,O):""},_=function(N){return N.slice(-1)!=="/"&&(N+="/"),N},S=function(N,O){return O=O!==void 0?O:f.createFolders,N=_(N),this.files[N]||o.call(this,N,null,{dir:!0,createFolders:O}),this.files[N]};function M(N){return Object.prototype.toString.call(N)==="[object RegExp]"}var P={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(N){var O,U,H;for(O in this.files)H=this.files[O],(U=O.slice(this.root.length,O.length))&&O.slice(0,this.root.length)===this.root&&N(U,H)},filter:function(N){var O=[];return this.forEach(function(U,H){N(U,H)&&O.push(H)}),O},file:function(N,O,U){if(arguments.length!==1)return N=this.root+N,o.call(this,N,O,U),this;if(M(N)){var H=N;return this.filter(function(R,W){return!W.dir&&H.test(R)})}var D=this.files[this.root+N];return D&&!D.dir?D:null},folder:function(N){if(!N)return this;if(M(N))return this.filter(function(D,R){return R.dir&&N.test(D)});var O=this.root+N,U=S.call(this,O),H=this.clone();return H.root=U.name,H},remove:function(N){N=this.root+N;var O=this.files[N];if(O||(N.slice(-1)!=="/"&&(N+="/"),O=this.files[N]),O&&!O.dir)delete this.files[N];else for(var U=this.filter(function(D,R){return R.name.slice(0,N.length)===N}),H=0;H<U.length;H++)delete this.files[U[H].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(N){var O,U={};try{if((U=c.extend(N||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=U.type.toLowerCase(),U.compression=U.compression.toUpperCase(),U.type==="binarystring"&&(U.type="string"),!U.type)throw new Error("No output type specified.");c.checkSupport(U.type),U.platform!=="darwin"&&U.platform!=="freebsd"&&U.platform!=="linux"&&U.platform!=="sunos"||(U.platform="UNIX"),U.platform==="win32"&&(U.platform="DOS");var H=U.comment||this.comment||"";O=m.generateWorker(this,U,H)}catch(D){(O=new u("error")).error(D)}return new d(O,U.type||"string",U.mimeType)},generateAsync:function(N,O){return this.generateInternalStream(N).accumulate(O)},generateNodeStream:function(N,O){return(N=N||{}).type||(N.type="nodebuffer"),this.generateInternalStream(N).toNodejsStream(O)}};n.exports=P},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var u=0;u<this.data.length;u++)c[u]=255&c[u]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var u=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),v=this.length-4;0<=v;--v)if(this.data[v]===u&&this.data[v+1]===d&&this.data[v+2]===f&&this.data[v+3]===p)return v-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var u=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),v=this.readData(4);return u===v[0]&&d===v[1]&&f===v[2]&&p===v[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var u,d=0;for(this.checkOffset(c),u=this.index+c-1;u>=this.index;u--)d=(d<<8)+this.byteAt(u);return this.index+=c,d},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),u=e("./StringReader"),d=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(p){var v=o.getTypeOf(p);return o.checkSupport(v),v!=="string"||l.uint8array?v==="nodebuffer"?new d(p):l.uint8array?new f(o.transformTo("uint8array",p)):new c(o.transformTo("array",p)):new u(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(u){o.call(this,"ConvertWorker to "+u),this.destType=u}l.inherits(c,o),c.prototype.processChunk=function(u){this.push({data:l.transformTo(this.destType,u.data),meta:u.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(u){this.streamInfo.crc32=l(u.data,this.streamInfo.crc32||0),this.push(u)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}o.inherits(c,l),c.prototype.processChunk=function(u){if(u){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+u.data.length}l.prototype.processChunk.call(this,u)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(f){d.dataIsReady=!0,d.data=f,d.max=f&&f.length||0,d.type=o.getTypeOf(f),d.isPaused||d._tickAndRepeat()},function(f){d.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,d);break;case"uint8array":u=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":u=this.data.slice(this.index,d)}return this.index=d,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var u=0;u<this._listeners[l].length;u++)this._listeners[l][u].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(u){c.processChunk(u)}),l.on("end",function(){c.end()}),l.on("error",function(u){c.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),u=e("../base64"),d=e("../support"),f=e("../external"),p=null;if(d.nodestream)try{p=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function v(x,y){return new f.Promise(function(g,_){var S=[],M=x._internalType,P=x._outputType,N=x._mimeType;x.on("data",function(O,U){S.push(O),y&&y(U)}).on("error",function(O){S=[],_(O)}).on("end",function(){try{var O=function(U,H,D){switch(U){case"blob":return o.newBlob(o.transformTo("arraybuffer",H),D);case"base64":return u.encode(H);default:return o.transformTo(U,H)}}(P,function(U,H){var D,R=0,W=null,k=0;for(D=0;D<H.length;D++)k+=H[D].length;switch(U){case"string":return H.join("");case"array":return Array.prototype.concat.apply([],H);case"uint8array":for(W=new Uint8Array(k),D=0;D<H.length;D++)W.set(H[D],R),R+=H[D].length;return W;case"nodebuffer":return Buffer.concat(H);default:throw new Error("concat : unsupported type '"+U+"'")}}(M,S),N);g(O)}catch(U){_(U)}S=[]}).resume()})}function m(x,y,g){var _=y;switch(y){case"blob":case"arraybuffer":_="uint8array";break;case"base64":_="string"}try{this._internalType=_,this._outputType=y,this._mimeType=g,o.checkSupport(_),this._worker=x.pipe(new l(_)),x.lock()}catch(S){this._worker=new c("error"),this._worker.error(S)}}m.prototype={accumulate:function(x){return v(this,x)},on:function(x,y){var g=this;return x==="data"?this._worker.on(x,function(_){y.call(g,_.data,_.meta)}):this._worker.on(x,function(){o.delay(y,arguments,g)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(x){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},x)}},n.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),u=e("./stream/GenericWorker"),d=new Array(256),f=0;f<256;f++)d[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;d[254]=d[254]=1;function p(){u.call(this,"utf-8 decode"),this.leftOver=null}function v(){u.call(this,"utf-8 encode")}s.utf8encode=function(m){return l.nodebuffer?c.newBufferFrom(m,"utf-8"):function(x){var y,g,_,S,M,P=x.length,N=0;for(S=0;S<P;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(_=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(_-56320),S++),N+=g<128?1:g<2048?2:g<65536?3:4;for(y=l.uint8array?new Uint8Array(N):new Array(N),S=M=0;M<N;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(_=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(_-56320),S++),g<128?y[M++]=g:(g<2048?y[M++]=192|g>>>6:(g<65536?y[M++]=224|g>>>12:(y[M++]=240|g>>>18,y[M++]=128|g>>>12&63),y[M++]=128|g>>>6&63),y[M++]=128|63&g);return y}(m)},s.utf8decode=function(m){return l.nodebuffer?o.transformTo("nodebuffer",m).toString("utf-8"):function(x){var y,g,_,S,M=x.length,P=new Array(2*M);for(y=g=0;y<M;)if((_=x[y++])<128)P[g++]=_;else if(4<(S=d[_]))P[g++]=65533,y+=S-1;else{for(_&=S===2?31:S===3?15:7;1<S&&y<M;)_=_<<6|63&x[y++],S--;1<S?P[g++]=65533:_<65536?P[g++]=_:(_-=65536,P[g++]=55296|_>>10&1023,P[g++]=56320|1023&_)}return P.length!==g&&(P.subarray?P=P.subarray(0,g):P.length=g),o.applyFromCharCode(P)}(m=o.transformTo(l.uint8array?"uint8array":"array",m))},o.inherits(p,u),p.prototype.processChunk=function(m){var x=o.transformTo(l.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var y=x;(x=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),x.set(y,this.leftOver.length)}else x=this.leftOver.concat(x);this.leftOver=null}var g=function(S,M){var P;for((M=M||S.length)>S.length&&(M=S.length),P=M-1;0<=P&&(192&S[P])==128;)P--;return P<0||P===0?M:P+d[S[P]]>M?P:M}(x),_=x;g!==x.length&&(l.uint8array?(_=x.subarray(0,g),this.leftOver=x.subarray(g,x.length)):(_=x.slice(0,g),this.leftOver=x.slice(g,x.length))),this.push({data:s.utf8decode(_),meta:m.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=p,o.inherits(v,u),v.prototype.processChunk=function(m){this.push({data:s.utf8encode(m.data),meta:m.meta})},s.Utf8EncodeWorker=v},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),u=e("./external");function d(y){return y}function f(y,g){for(var _=0;_<y.length;++_)g[_]=255&y.charCodeAt(_);return g}e("setimmediate"),s.newBlob=function(y,g){s.checkSupport("blob");try{return new Blob([y],{type:g})}catch{try{var _=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return _.append(y),_.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(y,g,_){var S=[],M=0,P=y.length;if(P<=_)return String.fromCharCode.apply(null,y);for(;M<P;)g==="array"||g==="nodebuffer"?S.push(String.fromCharCode.apply(null,y.slice(M,Math.min(M+_,P)))):S.push(String.fromCharCode.apply(null,y.subarray(M,Math.min(M+_,P)))),M+=_;return S.join("")},stringifyByChar:function(y){for(var g="",_=0;_<y.length;_++)g+=String.fromCharCode(y[_]);return g},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function v(y){var g=65536,_=s.getTypeOf(y),S=!0;if(_==="uint8array"?S=p.applyCanBeUsed.uint8array:_==="nodebuffer"&&(S=p.applyCanBeUsed.nodebuffer),S)for(;1<g;)try{return p.stringifyByChunk(y,_,g)}catch{g=Math.floor(g/2)}return p.stringifyByChar(y)}function m(y,g){for(var _=0;_<y.length;_++)g[_]=y[_];return g}s.applyFromCharCode=v;var x={};x.string={string:d,array:function(y){return f(y,new Array(y.length))},arraybuffer:function(y){return x.string.uint8array(y).buffer},uint8array:function(y){return f(y,new Uint8Array(y.length))},nodebuffer:function(y){return f(y,c.allocBuffer(y.length))}},x.array={string:v,array:d,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},x.arraybuffer={string:function(y){return v(new Uint8Array(y))},array:function(y){return m(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:d,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},x.uint8array={string:v,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:d,nodebuffer:function(y){return c.newBufferFrom(y)}},x.nodebuffer={string:v,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return x.nodebuffer.uint8array(y).buffer},uint8array:function(y){return m(y,new Uint8Array(y.length))},nodebuffer:d},s.transformTo=function(y,g){if(g=g||"",!y)return g;s.checkSupport(y);var _=s.getTypeOf(g);return x[_][y](g)},s.resolve=function(y){for(var g=y.split("/"),_=[],S=0;S<g.length;S++){var M=g[S];M==="."||M===""&&S!==0&&S!==g.length-1||(M===".."?_.pop():_.push(M))}return _.join("/")},s.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(y)?"nodebuffer":o.uint8array&&y instanceof Uint8Array?"uint8array":o.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(y){if(!o[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(y){var g,_,S="";for(_=0;_<(y||"").length;_++)S+="\\x"+((g=y.charCodeAt(_))<16?"0":"")+g.toString(16).toUpperCase();return S},s.delay=function(y,g,_){setImmediate(function(){y.apply(_||null,g||[])})},s.inherits=function(y,g){function _(){}_.prototype=g.prototype,y.prototype=new _},s.extend=function(){var y,g,_={};for(y=0;y<arguments.length;y++)for(g in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],g)&&_[g]===void 0&&(_[g]=arguments[y][g]);return _},s.prepareContent=function(y,g,_,S,M){return u.Promise.resolve(g).then(function(P){return o.blob&&(P instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(P))!==-1)&&typeof FileReader<"u"?new u.Promise(function(N,O){var U=new FileReader;U.onload=function(H){N(H.target.result)},U.onerror=function(H){O(H.target.error)},U.readAsArrayBuffer(P)}):P}).then(function(P){var N=s.getTypeOf(P);return N?(N==="arraybuffer"?P=s.transformTo("uint8array",P):N==="string"&&(M?P=l.decode(P):_&&S!==!0&&(P=function(O){return f(O,o.uint8array?new Uint8Array(O.length):new Array(O.length))}(P))),P):u.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),u=e("./zipEntry"),d=e("./support");function f(p){this.files=[],this.loadOptions=p}f.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var v=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(v)+", expected "+l.pretty(p)+")")}},isSignature:function(p,v){var m=this.reader.index;this.reader.setIndex(p);var x=this.reader.readString(4)===v;return this.reader.setIndex(m),x},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),v=d.uint8array?"uint8array":"array",m=l.transformTo(v,p);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,v,m,x=this.zip64EndOfCentralSize-44;0<x;)p=this.reader.readInt(2),v=this.reader.readInt(4),m=this.reader.readData(v),this.zip64ExtensibleData[p]={id:p,length:v,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,v;for(p=0;p<this.files.length;p++)v=this.files[p],this.reader.setIndex(v.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),v.readLocalPart(this.reader),v.handleUTF8(),v.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(p=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var v=p;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var x=v-m;if(0<x)this.isSignature(v,c.CENTRAL_FILE_HEADER)||(this.reader.zero=x);else if(x<0)throw new Error("Corrupted zip: missing "+Math.abs(x)+" bytes.")},prepareReader:function(p){this.reader=o(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),u=e("./crc32"),d=e("./utf8"),f=e("./compressions"),p=e("./support");function v(m,x){this.options=m,this.loadOptions=x}v.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var x,y;if(m.skip(22),this.fileNameLength=m.readInt(2),y=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((x=function(g){for(var _ in f)if(Object.prototype.hasOwnProperty.call(f,_)&&f[_].magic===g)return f[_];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,x,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var x=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(x),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var x,y,g,_=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<_;)x=m.readInt(2),y=m.readInt(2),g=m.readData(y),this.extraFields[x]={id:x,length:y,value:g};m.setIndex(_)},handleUTF8:function(){var m=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var x=this.findExtraFieldUnicodePath();if(x!==null)this.fileNameStr=x;else{var y=l.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var _=l.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(_)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileName)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileComment)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null}},n.exports=v},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(x,y,g){this.name=x,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=y,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),u=e("./utf8"),d=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(x){var y=null,g="string";try{if(!x)throw new Error("No output type specified.");var _=(g=x.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),y=this._decompressWorker();var S=!this._dataBinary;S&&!_&&(y=y.pipe(new u.Utf8EncodeWorker)),!S&&_&&(y=y.pipe(new u.Utf8DecodeWorker))}catch(M){(y=new f("error")).error(M)}return new l(y,g,"")},async:function(x,y){return this.internalStream(x).accumulate(y)},nodeStream:function(x,y){return this.internalStream(x||"nodebuffer").toNodejsStream(y)},_compressWorker:function(x,y){if(this._data instanceof d&&this._data.compression.magic===x.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new u.Utf8EncodeWorker)),d.createWorkerFrom(g,x,y)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],v=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<p.length;m++)o.prototype[p[m]]=v;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,u=o.MutationObserver||o.WebKitMutationObserver;if(u){var d=0,f=new u(x),p=o.document.createTextNode("");f.observe(p,{characterData:!0}),l=function(){p.data=d=++d%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var y=o.document.createElement("script");y.onreadystatechange=function(){x(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},o.document.documentElement.appendChild(y)}:function(){setTimeout(x,0)};else{var v=new o.MessageChannel;v.port1.onmessage=x,l=function(){v.port2.postMessage(0)}}var m=[];function x(){var y,g;c=!0;for(var _=m.length;_;){for(g=m,m=[],y=-1;++y<_;)g[y]();_=m.length}c=!1}n.exports=function(y){m.push(y)!==1||c||l()}}).call(this,typeof Ls<"u"?Ls:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},u=["REJECTED"],d=["FULFILLED"],f=["PENDING"];function p(_){if(typeof _!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,_!==l&&y(this,_)}function v(_,S,M){this.promise=_,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof M=="function"&&(this.onRejected=M,this.callRejected=this.otherCallRejected)}function m(_,S,M){o(function(){var P;try{P=S(M)}catch(N){return c.reject(_,N)}P===_?c.reject(_,new TypeError("Cannot resolve promise with itself")):c.resolve(_,P)})}function x(_){var S=_&&_.then;if(_&&(typeof _=="object"||typeof _=="function")&&typeof S=="function")return function(){S.apply(_,arguments)}}function y(_,S){var M=!1;function P(U){M||(M=!0,c.reject(_,U))}function N(U){M||(M=!0,c.resolve(_,U))}var O=g(function(){S(N,P)});O.status==="error"&&P(O.value)}function g(_,S){var M={};try{M.value=_(S),M.status="success"}catch(P){M.status="error",M.value=P}return M}(n.exports=p).prototype.finally=function(_){if(typeof _!="function")return this;var S=this.constructor;return this.then(function(M){return S.resolve(_()).then(function(){return M})},function(M){return S.resolve(_()).then(function(){throw M})})},p.prototype.catch=function(_){return this.then(null,_)},p.prototype.then=function(_,S){if(typeof _!="function"&&this.state===d||typeof S!="function"&&this.state===u)return this;var M=new this.constructor(l);return this.state!==f?m(M,this.state===d?_:S,this.outcome):this.queue.push(new v(M,_,S)),M},v.prototype.callFulfilled=function(_){c.resolve(this.promise,_)},v.prototype.otherCallFulfilled=function(_){m(this.promise,this.onFulfilled,_)},v.prototype.callRejected=function(_){c.reject(this.promise,_)},v.prototype.otherCallRejected=function(_){m(this.promise,this.onRejected,_)},c.resolve=function(_,S){var M=g(x,S);if(M.status==="error")return c.reject(_,M.value);var P=M.value;if(P)y(_,P);else{_.state=d,_.outcome=S;for(var N=-1,O=_.queue.length;++N<O;)_.queue[N].callFulfilled(S)}return _},c.reject=function(_,S){_.state=u,_.outcome=S;for(var M=-1,P=_.queue.length;++M<P;)_.queue[M].callRejected(S);return _},p.resolve=function(_){return _ instanceof this?_:c.resolve(new this(l),_)},p.reject=function(_){var S=new this(l);return c.reject(S,_)},p.all=function(_){var S=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var M=_.length,P=!1;if(!M)return this.resolve([]);for(var N=new Array(M),O=0,U=-1,H=new this(l);++U<M;)D(_[U],U);return H;function D(R,W){S.resolve(R).then(function(k){N[W]=k,++O!==M||P||(P=!0,c.resolve(H,N))},function(k){P||(P=!0,c.reject(H,k))})}},p.race=function(_){var S=this;if(Object.prototype.toString.call(_)!=="[object Array]")return this.reject(new TypeError("must be an array"));var M=_.length,P=!1;if(!M)return this.resolve([]);for(var N=-1,O=new this(l);++N<M;)U=_[N],S.resolve(U).then(function(H){P||(P=!0,c.resolve(O,H))},function(H){P||(P=!0,c.reject(O,H))});var U;return O}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/messages"),d=e("./zlib/zstream"),f=Object.prototype.toString,p=0,v=-1,m=0,x=8;function y(_){if(!(this instanceof y))return new y(_);this.options=l.assign({level:v,method:x,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},_||{});var S=this.options;S.raw&&0<S.windowBits?S.windowBits=-S.windowBits:S.gzip&&0<S.windowBits&&S.windowBits<16&&(S.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var M=o.deflateInit2(this.strm,S.level,S.method,S.windowBits,S.memLevel,S.strategy);if(M!==p)throw new Error(u[M]);if(S.header&&o.deflateSetHeader(this.strm,S.header),S.dictionary){var P;if(P=typeof S.dictionary=="string"?c.string2buf(S.dictionary):f.call(S.dictionary)==="[object ArrayBuffer]"?new Uint8Array(S.dictionary):S.dictionary,(M=o.deflateSetDictionary(this.strm,P))!==p)throw new Error(u[M]);this._dict_set=!0}}function g(_,S){var M=new y(S);if(M.push(_,!0),M.err)throw M.msg||u[M.err];return M.result}y.prototype.push=function(_,S){var M,P,N=this.strm,O=this.options.chunkSize;if(this.ended)return!1;P=S===~~S?S:S===!0?4:0,typeof _=="string"?N.input=c.string2buf(_):f.call(_)==="[object ArrayBuffer]"?N.input=new Uint8Array(_):N.input=_,N.next_in=0,N.avail_in=N.input.length;do{if(N.avail_out===0&&(N.output=new l.Buf8(O),N.next_out=0,N.avail_out=O),(M=o.deflate(N,P))!==1&&M!==p)return this.onEnd(M),!(this.ended=!0);N.avail_out!==0&&(N.avail_in!==0||P!==4&&P!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(N.output,N.next_out))):this.onData(l.shrinkBuf(N.output,N.next_out)))}while((0<N.avail_in||N.avail_out===0)&&M!==1);return P===4?(M=o.deflateEnd(this.strm),this.onEnd(M),this.ended=!0,M===p):P!==2||(this.onEnd(p),!(N.avail_out=0))},y.prototype.onData=function(_){this.chunks.push(_)},y.prototype.onEnd=function(_){_===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=_,this.msg=this.strm.msg},s.Deflate=y,s.deflate=g,s.deflateRaw=function(_,S){return(S=S||{}).raw=!0,g(_,S)},s.gzip=function(_,S){return(S=S||{}).gzip=!0,g(_,S)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/constants"),d=e("./zlib/messages"),f=e("./zlib/zstream"),p=e("./zlib/gzheader"),v=Object.prototype.toString;function m(y){if(!(this instanceof m))return new m(y);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},y||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||y&&y.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var _=o.inflateInit2(this.strm,g.windowBits);if(_!==u.Z_OK)throw new Error(d[_]);this.header=new p,o.inflateGetHeader(this.strm,this.header)}function x(y,g){var _=new m(g);if(_.push(y,!0),_.err)throw _.msg||d[_.err];return _.result}m.prototype.push=function(y,g){var _,S,M,P,N,O,U=this.strm,H=this.options.chunkSize,D=this.options.dictionary,R=!1;if(this.ended)return!1;S=g===~~g?g:g===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof y=="string"?U.input=c.binstring2buf(y):v.call(y)==="[object ArrayBuffer]"?U.input=new Uint8Array(y):U.input=y,U.next_in=0,U.avail_in=U.input.length;do{if(U.avail_out===0&&(U.output=new l.Buf8(H),U.next_out=0,U.avail_out=H),(_=o.inflate(U,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&D&&(O=typeof D=="string"?c.string2buf(D):v.call(D)==="[object ArrayBuffer]"?new Uint8Array(D):D,_=o.inflateSetDictionary(this.strm,O)),_===u.Z_BUF_ERROR&&R===!0&&(_=u.Z_OK,R=!1),_!==u.Z_STREAM_END&&_!==u.Z_OK)return this.onEnd(_),!(this.ended=!0);U.next_out&&(U.avail_out!==0&&_!==u.Z_STREAM_END&&(U.avail_in!==0||S!==u.Z_FINISH&&S!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(M=c.utf8border(U.output,U.next_out),P=U.next_out-M,N=c.buf2string(U.output,M),U.next_out=P,U.avail_out=H-P,P&&l.arraySet(U.output,U.output,M,P,0),this.onData(N)):this.onData(l.shrinkBuf(U.output,U.next_out)))),U.avail_in===0&&U.avail_out===0&&(R=!0)}while((0<U.avail_in||U.avail_out===0)&&_!==u.Z_STREAM_END);return _===u.Z_STREAM_END&&(S=u.Z_FINISH),S===u.Z_FINISH?(_=o.inflateEnd(this.strm),this.onEnd(_),this.ended=!0,_===u.Z_OK):S!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(U.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Inflate=m,s.inflate=x,s.inflateRaw=function(y,g){return(g=g||{}).raw=!0,x(y,g)},s.ungzip=x},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(u){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var f=d.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var p in f)f.hasOwnProperty(p)&&(u[p]=f[p])}}return u},s.shrinkBuf=function(u,d){return u.length===d?u:u.subarray?u.subarray(0,d):(u.length=d,u)};var l={arraySet:function(u,d,f,p,v){if(d.subarray&&u.subarray)u.set(d.subarray(f,f+p),v);else for(var m=0;m<p;m++)u[v+m]=d[f+m]},flattenChunks:function(u){var d,f,p,v,m,x;for(d=p=0,f=u.length;d<f;d++)p+=u[d].length;for(x=new Uint8Array(p),d=v=0,f=u.length;d<f;d++)m=u[d],x.set(m,v),v+=m.length;return x}},c={arraySet:function(u,d,f,p,v){for(var m=0;m<p;m++)u[v+m]=d[f+m]},flattenChunks:function(u){return[].concat.apply([],u)}};s.setTyped=function(u){u?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var u=new o.Buf8(256),d=0;d<256;d++)u[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function f(p,v){if(v<65537&&(p.subarray&&c||!p.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(p,v));for(var m="",x=0;x<v;x++)m+=String.fromCharCode(p[x]);return m}u[254]=u[254]=1,s.string2buf=function(p){var v,m,x,y,g,_=p.length,S=0;for(y=0;y<_;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<_&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),S+=m<128?1:m<2048?2:m<65536?3:4;for(v=new o.Buf8(S),y=g=0;g<S;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<_&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),m<128?v[g++]=m:(m<2048?v[g++]=192|m>>>6:(m<65536?v[g++]=224|m>>>12:(v[g++]=240|m>>>18,v[g++]=128|m>>>12&63),v[g++]=128|m>>>6&63),v[g++]=128|63&m);return v},s.buf2binstring=function(p){return f(p,p.length)},s.binstring2buf=function(p){for(var v=new o.Buf8(p.length),m=0,x=v.length;m<x;m++)v[m]=p.charCodeAt(m);return v},s.buf2string=function(p,v){var m,x,y,g,_=v||p.length,S=new Array(2*_);for(m=x=0;m<_;)if((y=p[m++])<128)S[x++]=y;else if(4<(g=u[y]))S[x++]=65533,m+=g-1;else{for(y&=g===2?31:g===3?15:7;1<g&&m<_;)y=y<<6|63&p[m++],g--;1<g?S[x++]=65533:y<65536?S[x++]=y:(y-=65536,S[x++]=55296|y>>10&1023,S[x++]=56320|1023&y)}return f(S,x)},s.utf8border=function(p,v){var m;for((v=v||p.length)>p.length&&(v=p.length),m=v-1;0<=m&&(192&p[m])==128;)m--;return m<0||m===0?v:m+u[p[m]]>v?m:v}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,u){for(var d=65535&o|0,f=o>>>16&65535|0,p=0;c!==0;){for(c-=p=2e3<c?2e3:c;f=f+(d=d+l[u++]|0)|0,--p;);d%=65521,f%=65521}return d|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],u=0;u<256;u++){l=u;for(var d=0;d<8;d++)l=1&l?3988292384^l>>>1:l>>>1;c[u]=l}return c}();n.exports=function(l,c,u,d){var f=o,p=d+u;l^=-1;for(var v=d;v<p;v++)l=l>>>8^f[255&(l^c[v])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),u=e("./adler32"),d=e("./crc32"),f=e("./messages"),p=0,v=4,m=0,x=-2,y=-1,g=4,_=2,S=8,M=9,P=286,N=30,O=19,U=2*P+1,H=15,D=3,R=258,W=R+D+1,k=42,F=113,C=1,Z=2,it=3,ot=4;function j(E,et){return E.msg=f[et],et}function rt(E){return(E<<1)-(4<E?9:0)}function at(E){for(var et=E.length;0<=--et;)E[et]=0}function q(E){var et=E.state,$=et.pending;$>E.avail_out&&($=E.avail_out),$!==0&&(l.arraySet(E.output,et.pending_buf,et.pending_out,$,E.next_out),E.next_out+=$,et.pending_out+=$,E.total_out+=$,E.avail_out-=$,et.pending-=$,et.pending===0&&(et.pending_out=0))}function tt(E,et){c._tr_flush_block(E,0<=E.block_start?E.block_start:-1,E.strstart-E.block_start,et),E.block_start=E.strstart,q(E.strm)}function Lt(E,et){E.pending_buf[E.pending++]=et}function J(E,et){E.pending_buf[E.pending++]=et>>>8&255,E.pending_buf[E.pending++]=255&et}function nt(E,et){var $,A,w=E.max_chain_length,B=E.strstart,X=E.prev_length,K=E.nice_match,G=E.strstart>E.w_size-W?E.strstart-(E.w_size-W):0,ft=E.window,lt=E.w_mask,pt=E.prev,Tt=E.strstart+R,Et=ft[B+X-1],At=ft[B+X];E.prev_length>=E.good_match&&(w>>=2),K>E.lookahead&&(K=E.lookahead);do if(ft[($=et)+X]===At&&ft[$+X-1]===Et&&ft[$]===ft[B]&&ft[++$]===ft[B+1]){B+=2,$++;do;while(ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&B<Tt);if(A=R-(Tt-B),B=Tt-R,X<A){if(E.match_start=et,K<=(X=A))break;Et=ft[B+X-1],At=ft[B+X]}}while((et=pt[et&lt])>G&&--w!=0);return X<=E.lookahead?X:E.lookahead}function wt(E){var et,$,A,w,B,X,K,G,ft,lt,pt=E.w_size;do{if(w=E.window_size-E.lookahead-E.strstart,E.strstart>=pt+(pt-W)){for(l.arraySet(E.window,E.window,pt,pt,0),E.match_start-=pt,E.strstart-=pt,E.block_start-=pt,et=$=E.hash_size;A=E.head[--et],E.head[et]=pt<=A?A-pt:0,--$;);for(et=$=pt;A=E.prev[--et],E.prev[et]=pt<=A?A-pt:0,--$;);w+=pt}if(E.strm.avail_in===0)break;if(X=E.strm,K=E.window,G=E.strstart+E.lookahead,ft=w,lt=void 0,lt=X.avail_in,ft<lt&&(lt=ft),$=lt===0?0:(X.avail_in-=lt,l.arraySet(K,X.input,X.next_in,lt,G),X.state.wrap===1?X.adler=u(X.adler,K,lt,G):X.state.wrap===2&&(X.adler=d(X.adler,K,lt,G)),X.next_in+=lt,X.total_in+=lt,lt),E.lookahead+=$,E.lookahead+E.insert>=D)for(B=E.strstart-E.insert,E.ins_h=E.window[B],E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+1])&E.hash_mask;E.insert&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+D-1])&E.hash_mask,E.prev[B&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=B,B++,E.insert--,!(E.lookahead+E.insert<D)););}while(E.lookahead<W&&E.strm.avail_in!==0)}function St(E,et){for(var $,A;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return C;if(E.lookahead===0)break}if($=0,E.lookahead>=D&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+D-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),$!==0&&E.strstart-$<=E.w_size-W&&(E.match_length=nt(E,$)),E.match_length>=D)if(A=c._tr_tally(E,E.strstart-E.match_start,E.match_length-D),E.lookahead-=E.match_length,E.match_length<=E.max_lazy_match&&E.lookahead>=D){for(E.match_length--;E.strstart++,E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+D-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart,--E.match_length!=0;);E.strstart++}else E.strstart+=E.match_length,E.match_length=0,E.ins_h=E.window[E.strstart],E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+1])&E.hash_mask;else A=c._tr_tally(E,0,E.window[E.strstart]),E.lookahead--,E.strstart++;if(A&&(tt(E,!1),E.strm.avail_out===0))return C}return E.insert=E.strstart<D-1?E.strstart:D-1,et===v?(tt(E,!0),E.strm.avail_out===0?it:ot):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?C:Z}function Pt(E,et){for(var $,A,w;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return C;if(E.lookahead===0)break}if($=0,E.lookahead>=D&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+D-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),E.prev_length=E.match_length,E.prev_match=E.match_start,E.match_length=D-1,$!==0&&E.prev_length<E.max_lazy_match&&E.strstart-$<=E.w_size-W&&(E.match_length=nt(E,$),E.match_length<=5&&(E.strategy===1||E.match_length===D&&4096<E.strstart-E.match_start)&&(E.match_length=D-1)),E.prev_length>=D&&E.match_length<=E.prev_length){for(w=E.strstart+E.lookahead-D,A=c._tr_tally(E,E.strstart-1-E.prev_match,E.prev_length-D),E.lookahead-=E.prev_length-1,E.prev_length-=2;++E.strstart<=w&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+D-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),--E.prev_length!=0;);if(E.match_available=0,E.match_length=D-1,E.strstart++,A&&(tt(E,!1),E.strm.avail_out===0))return C}else if(E.match_available){if((A=c._tr_tally(E,0,E.window[E.strstart-1]))&&tt(E,!1),E.strstart++,E.lookahead--,E.strm.avail_out===0)return C}else E.match_available=1,E.strstart++,E.lookahead--}return E.match_available&&(A=c._tr_tally(E,0,E.window[E.strstart-1]),E.match_available=0),E.insert=E.strstart<D-1?E.strstart:D-1,et===v?(tt(E,!0),E.strm.avail_out===0?it:ot):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?C:Z}function It(E,et,$,A,w){this.good_length=E,this.max_lazy=et,this.nice_length=$,this.max_chain=A,this.func=w}function kt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=S,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*U),this.dyn_dtree=new l.Buf16(2*(2*N+1)),this.bl_tree=new l.Buf16(2*(2*O+1)),at(this.dyn_ltree),at(this.dyn_dtree),at(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(H+1),this.heap=new l.Buf16(2*P+1),at(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*P+1),at(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function st(E){var et;return E&&E.state?(E.total_in=E.total_out=0,E.data_type=_,(et=E.state).pending=0,et.pending_out=0,et.wrap<0&&(et.wrap=-et.wrap),et.status=et.wrap?k:F,E.adler=et.wrap===2?0:1,et.last_flush=p,c._tr_init(et),m):j(E,x)}function vt(E){var et=st(E);return et===m&&function($){$.window_size=2*$.w_size,at($.head),$.max_lazy_match=o[$.level].max_lazy,$.good_match=o[$.level].good_length,$.nice_match=o[$.level].nice_length,$.max_chain_length=o[$.level].max_chain,$.strstart=0,$.block_start=0,$.lookahead=0,$.insert=0,$.match_length=$.prev_length=D-1,$.match_available=0,$.ins_h=0}(E.state),et}function xt(E,et,$,A,w,B){if(!E)return x;var X=1;if(et===y&&(et=6),A<0?(X=0,A=-A):15<A&&(X=2,A-=16),w<1||M<w||$!==S||A<8||15<A||et<0||9<et||B<0||g<B)return j(E,x);A===8&&(A=9);var K=new kt;return(E.state=K).strm=E,K.wrap=X,K.gzhead=null,K.w_bits=A,K.w_size=1<<K.w_bits,K.w_mask=K.w_size-1,K.hash_bits=w+7,K.hash_size=1<<K.hash_bits,K.hash_mask=K.hash_size-1,K.hash_shift=~~((K.hash_bits+D-1)/D),K.window=new l.Buf8(2*K.w_size),K.head=new l.Buf16(K.hash_size),K.prev=new l.Buf16(K.w_size),K.lit_bufsize=1<<w+6,K.pending_buf_size=4*K.lit_bufsize,K.pending_buf=new l.Buf8(K.pending_buf_size),K.d_buf=1*K.lit_bufsize,K.l_buf=3*K.lit_bufsize,K.level=et,K.strategy=B,K.method=$,vt(E)}o=[new It(0,0,0,0,function(E,et){var $=65535;for($>E.pending_buf_size-5&&($=E.pending_buf_size-5);;){if(E.lookahead<=1){if(wt(E),E.lookahead===0&&et===p)return C;if(E.lookahead===0)break}E.strstart+=E.lookahead,E.lookahead=0;var A=E.block_start+$;if((E.strstart===0||E.strstart>=A)&&(E.lookahead=E.strstart-A,E.strstart=A,tt(E,!1),E.strm.avail_out===0)||E.strstart-E.block_start>=E.w_size-W&&(tt(E,!1),E.strm.avail_out===0))return C}return E.insert=0,et===v?(tt(E,!0),E.strm.avail_out===0?it:ot):(E.strstart>E.block_start&&(tt(E,!1),E.strm.avail_out),C)}),new It(4,4,8,4,St),new It(4,5,16,8,St),new It(4,6,32,32,St),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(E,et){return xt(E,et,S,15,8,0)},s.deflateInit2=xt,s.deflateReset=vt,s.deflateResetKeep=st,s.deflateSetHeader=function(E,et){return E&&E.state?E.state.wrap!==2?x:(E.state.gzhead=et,m):x},s.deflate=function(E,et){var $,A,w,B;if(!E||!E.state||5<et||et<0)return E?j(E,x):x;if(A=E.state,!E.output||!E.input&&E.avail_in!==0||A.status===666&&et!==v)return j(E,E.avail_out===0?-5:x);if(A.strm=E,$=A.last_flush,A.last_flush=et,A.status===k)if(A.wrap===2)E.adler=0,Lt(A,31),Lt(A,139),Lt(A,8),A.gzhead?(Lt(A,(A.gzhead.text?1:0)+(A.gzhead.hcrc?2:0)+(A.gzhead.extra?4:0)+(A.gzhead.name?8:0)+(A.gzhead.comment?16:0)),Lt(A,255&A.gzhead.time),Lt(A,A.gzhead.time>>8&255),Lt(A,A.gzhead.time>>16&255),Lt(A,A.gzhead.time>>24&255),Lt(A,A.level===9?2:2<=A.strategy||A.level<2?4:0),Lt(A,255&A.gzhead.os),A.gzhead.extra&&A.gzhead.extra.length&&(Lt(A,255&A.gzhead.extra.length),Lt(A,A.gzhead.extra.length>>8&255)),A.gzhead.hcrc&&(E.adler=d(E.adler,A.pending_buf,A.pending,0)),A.gzindex=0,A.status=69):(Lt(A,0),Lt(A,0),Lt(A,0),Lt(A,0),Lt(A,0),Lt(A,A.level===9?2:2<=A.strategy||A.level<2?4:0),Lt(A,3),A.status=F);else{var X=S+(A.w_bits-8<<4)<<8;X|=(2<=A.strategy||A.level<2?0:A.level<6?1:A.level===6?2:3)<<6,A.strstart!==0&&(X|=32),X+=31-X%31,A.status=F,J(A,X),A.strstart!==0&&(J(A,E.adler>>>16),J(A,65535&E.adler)),E.adler=1}if(A.status===69)if(A.gzhead.extra){for(w=A.pending;A.gzindex<(65535&A.gzhead.extra.length)&&(A.pending!==A.pending_buf_size||(A.gzhead.hcrc&&A.pending>w&&(E.adler=d(E.adler,A.pending_buf,A.pending-w,w)),q(E),w=A.pending,A.pending!==A.pending_buf_size));)Lt(A,255&A.gzhead.extra[A.gzindex]),A.gzindex++;A.gzhead.hcrc&&A.pending>w&&(E.adler=d(E.adler,A.pending_buf,A.pending-w,w)),A.gzindex===A.gzhead.extra.length&&(A.gzindex=0,A.status=73)}else A.status=73;if(A.status===73)if(A.gzhead.name){w=A.pending;do{if(A.pending===A.pending_buf_size&&(A.gzhead.hcrc&&A.pending>w&&(E.adler=d(E.adler,A.pending_buf,A.pending-w,w)),q(E),w=A.pending,A.pending===A.pending_buf_size)){B=1;break}B=A.gzindex<A.gzhead.name.length?255&A.gzhead.name.charCodeAt(A.gzindex++):0,Lt(A,B)}while(B!==0);A.gzhead.hcrc&&A.pending>w&&(E.adler=d(E.adler,A.pending_buf,A.pending-w,w)),B===0&&(A.gzindex=0,A.status=91)}else A.status=91;if(A.status===91)if(A.gzhead.comment){w=A.pending;do{if(A.pending===A.pending_buf_size&&(A.gzhead.hcrc&&A.pending>w&&(E.adler=d(E.adler,A.pending_buf,A.pending-w,w)),q(E),w=A.pending,A.pending===A.pending_buf_size)){B=1;break}B=A.gzindex<A.gzhead.comment.length?255&A.gzhead.comment.charCodeAt(A.gzindex++):0,Lt(A,B)}while(B!==0);A.gzhead.hcrc&&A.pending>w&&(E.adler=d(E.adler,A.pending_buf,A.pending-w,w)),B===0&&(A.status=103)}else A.status=103;if(A.status===103&&(A.gzhead.hcrc?(A.pending+2>A.pending_buf_size&&q(E),A.pending+2<=A.pending_buf_size&&(Lt(A,255&E.adler),Lt(A,E.adler>>8&255),E.adler=0,A.status=F)):A.status=F),A.pending!==0){if(q(E),E.avail_out===0)return A.last_flush=-1,m}else if(E.avail_in===0&&rt(et)<=rt($)&&et!==v)return j(E,-5);if(A.status===666&&E.avail_in!==0)return j(E,-5);if(E.avail_in!==0||A.lookahead!==0||et!==p&&A.status!==666){var K=A.strategy===2?function(G,ft){for(var lt;;){if(G.lookahead===0&&(wt(G),G.lookahead===0)){if(ft===p)return C;break}if(G.match_length=0,lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++,lt&&(tt(G,!1),G.strm.avail_out===0))return C}return G.insert=0,ft===v?(tt(G,!0),G.strm.avail_out===0?it:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?C:Z}(A,et):A.strategy===3?function(G,ft){for(var lt,pt,Tt,Et,At=G.window;;){if(G.lookahead<=R){if(wt(G),G.lookahead<=R&&ft===p)return C;if(G.lookahead===0)break}if(G.match_length=0,G.lookahead>=D&&0<G.strstart&&(pt=At[Tt=G.strstart-1])===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]){Et=G.strstart+R;do;while(pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&Tt<Et);G.match_length=R-(Et-Tt),G.match_length>G.lookahead&&(G.match_length=G.lookahead)}if(G.match_length>=D?(lt=c._tr_tally(G,1,G.match_length-D),G.lookahead-=G.match_length,G.strstart+=G.match_length,G.match_length=0):(lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++),lt&&(tt(G,!1),G.strm.avail_out===0))return C}return G.insert=0,ft===v?(tt(G,!0),G.strm.avail_out===0?it:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?C:Z}(A,et):o[A.level].func(A,et);if(K!==it&&K!==ot||(A.status=666),K===C||K===it)return E.avail_out===0&&(A.last_flush=-1),m;if(K===Z&&(et===1?c._tr_align(A):et!==5&&(c._tr_stored_block(A,0,0,!1),et===3&&(at(A.head),A.lookahead===0&&(A.strstart=0,A.block_start=0,A.insert=0))),q(E),E.avail_out===0))return A.last_flush=-1,m}return et!==v?m:A.wrap<=0?1:(A.wrap===2?(Lt(A,255&E.adler),Lt(A,E.adler>>8&255),Lt(A,E.adler>>16&255),Lt(A,E.adler>>24&255),Lt(A,255&E.total_in),Lt(A,E.total_in>>8&255),Lt(A,E.total_in>>16&255),Lt(A,E.total_in>>24&255)):(J(A,E.adler>>>16),J(A,65535&E.adler)),q(E),0<A.wrap&&(A.wrap=-A.wrap),A.pending!==0?m:1)},s.deflateEnd=function(E){var et;return E&&E.state?(et=E.state.status)!==k&&et!==69&&et!==73&&et!==91&&et!==103&&et!==F&&et!==666?j(E,x):(E.state=null,et===F?j(E,-3):m):x},s.deflateSetDictionary=function(E,et){var $,A,w,B,X,K,G,ft,lt=et.length;if(!E||!E.state||(B=($=E.state).wrap)===2||B===1&&$.status!==k||$.lookahead)return x;for(B===1&&(E.adler=u(E.adler,et,lt,0)),$.wrap=0,lt>=$.w_size&&(B===0&&(at($.head),$.strstart=0,$.block_start=0,$.insert=0),ft=new l.Buf8($.w_size),l.arraySet(ft,et,lt-$.w_size,$.w_size,0),et=ft,lt=$.w_size),X=E.avail_in,K=E.next_in,G=E.input,E.avail_in=lt,E.next_in=0,E.input=et,wt($);$.lookahead>=D;){for(A=$.strstart,w=$.lookahead-(D-1);$.ins_h=($.ins_h<<$.hash_shift^$.window[A+D-1])&$.hash_mask,$.prev[A&$.w_mask]=$.head[$.ins_h],$.head[$.ins_h]=A,A++,--w;);$.strstart=A,$.lookahead=D-1,wt($)}return $.strstart+=$.lookahead,$.block_start=$.strstart,$.insert=$.lookahead,$.lookahead=0,$.match_length=$.prev_length=D-1,$.match_available=0,E.next_in=K,E.input=G,E.avail_in=X,$.wrap=B,m},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,u,d,f,p,v,m,x,y,g,_,S,M,P,N,O,U,H,D,R,W,k,F,C,Z;c=o.state,u=o.next_in,C=o.input,d=u+(o.avail_in-5),f=o.next_out,Z=o.output,p=f-(l-o.avail_out),v=f+(o.avail_out-257),m=c.dmax,x=c.wsize,y=c.whave,g=c.wnext,_=c.window,S=c.hold,M=c.bits,P=c.lencode,N=c.distcode,O=(1<<c.lenbits)-1,U=(1<<c.distbits)-1;t:do{M<15&&(S+=C[u++]<<M,M+=8,S+=C[u++]<<M,M+=8),H=P[S&O];e:for(;;){if(S>>>=D=H>>>24,M-=D,(D=H>>>16&255)===0)Z[f++]=65535&H;else{if(!(16&D)){if(!(64&D)){H=P[(65535&H)+(S&(1<<D)-1)];continue e}if(32&D){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}R=65535&H,(D&=15)&&(M<D&&(S+=C[u++]<<M,M+=8),R+=S&(1<<D)-1,S>>>=D,M-=D),M<15&&(S+=C[u++]<<M,M+=8,S+=C[u++]<<M,M+=8),H=N[S&U];n:for(;;){if(S>>>=D=H>>>24,M-=D,!(16&(D=H>>>16&255))){if(!(64&D)){H=N[(65535&H)+(S&(1<<D)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(W=65535&H,M<(D&=15)&&(S+=C[u++]<<M,(M+=8)<D&&(S+=C[u++]<<M,M+=8)),m<(W+=S&(1<<D)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(S>>>=D,M-=D,(D=f-p)<W){if(y<(D=W-D)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(F=_,(k=0)===g){if(k+=x-D,D<R){for(R-=D;Z[f++]=_[k++],--D;);k=f-W,F=Z}}else if(g<D){if(k+=x+g-D,(D-=g)<R){for(R-=D;Z[f++]=_[k++],--D;);if(k=0,g<R){for(R-=D=g;Z[f++]=_[k++],--D;);k=f-W,F=Z}}}else if(k+=g-D,D<R){for(R-=D;Z[f++]=_[k++],--D;);k=f-W,F=Z}for(;2<R;)Z[f++]=F[k++],Z[f++]=F[k++],Z[f++]=F[k++],R-=3;R&&(Z[f++]=F[k++],1<R&&(Z[f++]=F[k++]))}else{for(k=f-W;Z[f++]=Z[k++],Z[f++]=Z[k++],Z[f++]=Z[k++],2<(R-=3););R&&(Z[f++]=Z[k++],1<R&&(Z[f++]=Z[k++]))}break}}break}}while(u<d&&f<v);u-=R=M>>3,S&=(1<<(M-=R<<3))-1,o.next_in=u,o.next_out=f,o.avail_in=u<d?d-u+5:5-(u-d),o.avail_out=f<v?v-f+257:257-(f-v),c.hold=S,c.bits=M}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),u=e("./inffast"),d=e("./inftrees"),f=1,p=2,v=0,m=-2,x=1,y=852,g=592;function _(k){return(k>>>24&255)+(k>>>8&65280)+((65280&k)<<8)+((255&k)<<24)}function S(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function M(k){var F;return k&&k.state?(F=k.state,k.total_in=k.total_out=F.total=0,k.msg="",F.wrap&&(k.adler=1&F.wrap),F.mode=x,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new o.Buf32(y),F.distcode=F.distdyn=new o.Buf32(g),F.sane=1,F.back=-1,v):m}function P(k){var F;return k&&k.state?((F=k.state).wsize=0,F.whave=0,F.wnext=0,M(k)):m}function N(k,F){var C,Z;return k&&k.state?(Z=k.state,F<0?(C=0,F=-F):(C=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?m:(Z.window!==null&&Z.wbits!==F&&(Z.window=null),Z.wrap=C,Z.wbits=F,P(k))):m}function O(k,F){var C,Z;return k?(Z=new S,(k.state=Z).window=null,(C=N(k,F))!==v&&(k.state=null),C):m}var U,H,D=!0;function R(k){if(D){var F;for(U=new o.Buf32(512),H=new o.Buf32(32),F=0;F<144;)k.lens[F++]=8;for(;F<256;)k.lens[F++]=9;for(;F<280;)k.lens[F++]=7;for(;F<288;)k.lens[F++]=8;for(d(f,k.lens,0,288,U,0,k.work,{bits:9}),F=0;F<32;)k.lens[F++]=5;d(p,k.lens,0,32,H,0,k.work,{bits:5}),D=!1}k.lencode=U,k.lenbits=9,k.distcode=H,k.distbits=5}function W(k,F,C,Z){var it,ot=k.state;return ot.window===null&&(ot.wsize=1<<ot.wbits,ot.wnext=0,ot.whave=0,ot.window=new o.Buf8(ot.wsize)),Z>=ot.wsize?(o.arraySet(ot.window,F,C-ot.wsize,ot.wsize,0),ot.wnext=0,ot.whave=ot.wsize):(Z<(it=ot.wsize-ot.wnext)&&(it=Z),o.arraySet(ot.window,F,C-Z,it,ot.wnext),(Z-=it)?(o.arraySet(ot.window,F,C-Z,Z,0),ot.wnext=Z,ot.whave=ot.wsize):(ot.wnext+=it,ot.wnext===ot.wsize&&(ot.wnext=0),ot.whave<ot.wsize&&(ot.whave+=it))),0}s.inflateReset=P,s.inflateReset2=N,s.inflateResetKeep=M,s.inflateInit=function(k){return O(k,15)},s.inflateInit2=O,s.inflate=function(k,F){var C,Z,it,ot,j,rt,at,q,tt,Lt,J,nt,wt,St,Pt,It,kt,st,vt,xt,E,et,$,A,w=0,B=new o.Buf8(4),X=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!k||!k.state||!k.output||!k.input&&k.avail_in!==0)return m;(C=k.state).mode===12&&(C.mode=13),j=k.next_out,it=k.output,at=k.avail_out,ot=k.next_in,Z=k.input,rt=k.avail_in,q=C.hold,tt=C.bits,Lt=rt,J=at,et=v;t:for(;;)switch(C.mode){case x:if(C.wrap===0){C.mode=13;break}for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(2&C.wrap&&q===35615){B[C.check=0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0),tt=q=0,C.mode=2;break}if(C.flags=0,C.head&&(C.head.done=!1),!(1&C.wrap)||(((255&q)<<8)+(q>>8))%31){k.msg="incorrect header check",C.mode=30;break}if((15&q)!=8){k.msg="unknown compression method",C.mode=30;break}if(tt-=4,E=8+(15&(q>>>=4)),C.wbits===0)C.wbits=E;else if(E>C.wbits){k.msg="invalid window size",C.mode=30;break}C.dmax=1<<E,k.adler=C.check=1,C.mode=512&q?10:12,tt=q=0;break;case 2:for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(C.flags=q,(255&C.flags)!=8){k.msg="unknown compression method",C.mode=30;break}if(57344&C.flags){k.msg="unknown header flags set",C.mode=30;break}C.head&&(C.head.text=q>>8&1),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0)),tt=q=0,C.mode=3;case 3:for(;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}C.head&&(C.head.time=q),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,B[2]=q>>>16&255,B[3]=q>>>24&255,C.check=c(C.check,B,4,0)),tt=q=0,C.mode=4;case 4:for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}C.head&&(C.head.xflags=255&q,C.head.os=q>>8),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0)),tt=q=0,C.mode=5;case 5:if(1024&C.flags){for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}C.length=q,C.head&&(C.head.extra_len=q),512&C.flags&&(B[0]=255&q,B[1]=q>>>8&255,C.check=c(C.check,B,2,0)),tt=q=0}else C.head&&(C.head.extra=null);C.mode=6;case 6:if(1024&C.flags&&(rt<(nt=C.length)&&(nt=rt),nt&&(C.head&&(E=C.head.extra_len-C.length,C.head.extra||(C.head.extra=new Array(C.head.extra_len)),o.arraySet(C.head.extra,Z,ot,nt,E)),512&C.flags&&(C.check=c(C.check,Z,nt,ot)),rt-=nt,ot+=nt,C.length-=nt),C.length))break t;C.length=0,C.mode=7;case 7:if(2048&C.flags){if(rt===0)break t;for(nt=0;E=Z[ot+nt++],C.head&&E&&C.length<65536&&(C.head.name+=String.fromCharCode(E)),E&&nt<rt;);if(512&C.flags&&(C.check=c(C.check,Z,nt,ot)),rt-=nt,ot+=nt,E)break t}else C.head&&(C.head.name=null);C.length=0,C.mode=8;case 8:if(4096&C.flags){if(rt===0)break t;for(nt=0;E=Z[ot+nt++],C.head&&E&&C.length<65536&&(C.head.comment+=String.fromCharCode(E)),E&&nt<rt;);if(512&C.flags&&(C.check=c(C.check,Z,nt,ot)),rt-=nt,ot+=nt,E)break t}else C.head&&(C.head.comment=null);C.mode=9;case 9:if(512&C.flags){for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(q!==(65535&C.check)){k.msg="header crc mismatch",C.mode=30;break}tt=q=0}C.head&&(C.head.hcrc=C.flags>>9&1,C.head.done=!0),k.adler=C.check=0,C.mode=12;break;case 10:for(;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}k.adler=C.check=_(q),tt=q=0,C.mode=11;case 11:if(C.havedict===0)return k.next_out=j,k.avail_out=at,k.next_in=ot,k.avail_in=rt,C.hold=q,C.bits=tt,2;k.adler=C.check=1,C.mode=12;case 12:if(F===5||F===6)break t;case 13:if(C.last){q>>>=7&tt,tt-=7&tt,C.mode=27;break}for(;tt<3;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}switch(C.last=1&q,tt-=1,3&(q>>>=1)){case 0:C.mode=14;break;case 1:if(R(C),C.mode=20,F!==6)break;q>>>=2,tt-=2;break t;case 2:C.mode=17;break;case 3:k.msg="invalid block type",C.mode=30}q>>>=2,tt-=2;break;case 14:for(q>>>=7&tt,tt-=7&tt;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if((65535&q)!=(q>>>16^65535)){k.msg="invalid stored block lengths",C.mode=30;break}if(C.length=65535&q,tt=q=0,C.mode=15,F===6)break t;case 15:C.mode=16;case 16:if(nt=C.length){if(rt<nt&&(nt=rt),at<nt&&(nt=at),nt===0)break t;o.arraySet(it,Z,ot,nt,j),rt-=nt,ot+=nt,at-=nt,j+=nt,C.length-=nt;break}C.mode=12;break;case 17:for(;tt<14;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(C.nlen=257+(31&q),q>>>=5,tt-=5,C.ndist=1+(31&q),q>>>=5,tt-=5,C.ncode=4+(15&q),q>>>=4,tt-=4,286<C.nlen||30<C.ndist){k.msg="too many length or distance symbols",C.mode=30;break}C.have=0,C.mode=18;case 18:for(;C.have<C.ncode;){for(;tt<3;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}C.lens[X[C.have++]]=7&q,q>>>=3,tt-=3}for(;C.have<19;)C.lens[X[C.have++]]=0;if(C.lencode=C.lendyn,C.lenbits=7,$={bits:C.lenbits},et=d(0,C.lens,0,19,C.lencode,0,C.work,$),C.lenbits=$.bits,et){k.msg="invalid code lengths set",C.mode=30;break}C.have=0,C.mode=19;case 19:for(;C.have<C.nlen+C.ndist;){for(;It=(w=C.lencode[q&(1<<C.lenbits)-1])>>>16&255,kt=65535&w,!((Pt=w>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(kt<16)q>>>=Pt,tt-=Pt,C.lens[C.have++]=kt;else{if(kt===16){for(A=Pt+2;tt<A;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(q>>>=Pt,tt-=Pt,C.have===0){k.msg="invalid bit length repeat",C.mode=30;break}E=C.lens[C.have-1],nt=3+(3&q),q>>>=2,tt-=2}else if(kt===17){for(A=Pt+3;tt<A;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}tt-=Pt,E=0,nt=3+(7&(q>>>=Pt)),q>>>=3,tt-=3}else{for(A=Pt+7;tt<A;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}tt-=Pt,E=0,nt=11+(127&(q>>>=Pt)),q>>>=7,tt-=7}if(C.have+nt>C.nlen+C.ndist){k.msg="invalid bit length repeat",C.mode=30;break}for(;nt--;)C.lens[C.have++]=E}}if(C.mode===30)break;if(C.lens[256]===0){k.msg="invalid code -- missing end-of-block",C.mode=30;break}if(C.lenbits=9,$={bits:C.lenbits},et=d(f,C.lens,0,C.nlen,C.lencode,0,C.work,$),C.lenbits=$.bits,et){k.msg="invalid literal/lengths set",C.mode=30;break}if(C.distbits=6,C.distcode=C.distdyn,$={bits:C.distbits},et=d(p,C.lens,C.nlen,C.ndist,C.distcode,0,C.work,$),C.distbits=$.bits,et){k.msg="invalid distances set",C.mode=30;break}if(C.mode=20,F===6)break t;case 20:C.mode=21;case 21:if(6<=rt&&258<=at){k.next_out=j,k.avail_out=at,k.next_in=ot,k.avail_in=rt,C.hold=q,C.bits=tt,u(k,J),j=k.next_out,it=k.output,at=k.avail_out,ot=k.next_in,Z=k.input,rt=k.avail_in,q=C.hold,tt=C.bits,C.mode===12&&(C.back=-1);break}for(C.back=0;It=(w=C.lencode[q&(1<<C.lenbits)-1])>>>16&255,kt=65535&w,!((Pt=w>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(It&&!(240&It)){for(st=Pt,vt=It,xt=kt;It=(w=C.lencode[xt+((q&(1<<st+vt)-1)>>st)])>>>16&255,kt=65535&w,!(st+(Pt=w>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}q>>>=st,tt-=st,C.back+=st}if(q>>>=Pt,tt-=Pt,C.back+=Pt,C.length=kt,It===0){C.mode=26;break}if(32&It){C.back=-1,C.mode=12;break}if(64&It){k.msg="invalid literal/length code",C.mode=30;break}C.extra=15&It,C.mode=22;case 22:if(C.extra){for(A=C.extra;tt<A;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}C.length+=q&(1<<C.extra)-1,q>>>=C.extra,tt-=C.extra,C.back+=C.extra}C.was=C.length,C.mode=23;case 23:for(;It=(w=C.distcode[q&(1<<C.distbits)-1])>>>16&255,kt=65535&w,!((Pt=w>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(!(240&It)){for(st=Pt,vt=It,xt=kt;It=(w=C.distcode[xt+((q&(1<<st+vt)-1)>>st)])>>>16&255,kt=65535&w,!(st+(Pt=w>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}q>>>=st,tt-=st,C.back+=st}if(q>>>=Pt,tt-=Pt,C.back+=Pt,64&It){k.msg="invalid distance code",C.mode=30;break}C.offset=kt,C.extra=15&It,C.mode=24;case 24:if(C.extra){for(A=C.extra;tt<A;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}C.offset+=q&(1<<C.extra)-1,q>>>=C.extra,tt-=C.extra,C.back+=C.extra}if(C.offset>C.dmax){k.msg="invalid distance too far back",C.mode=30;break}C.mode=25;case 25:if(at===0)break t;if(nt=J-at,C.offset>nt){if((nt=C.offset-nt)>C.whave&&C.sane){k.msg="invalid distance too far back",C.mode=30;break}wt=nt>C.wnext?(nt-=C.wnext,C.wsize-nt):C.wnext-nt,nt>C.length&&(nt=C.length),St=C.window}else St=it,wt=j-C.offset,nt=C.length;for(at<nt&&(nt=at),at-=nt,C.length-=nt;it[j++]=St[wt++],--nt;);C.length===0&&(C.mode=21);break;case 26:if(at===0)break t;it[j++]=C.length,at--,C.mode=21;break;case 27:if(C.wrap){for(;tt<32;){if(rt===0)break t;rt--,q|=Z[ot++]<<tt,tt+=8}if(J-=at,k.total_out+=J,C.total+=J,J&&(k.adler=C.check=C.flags?c(C.check,it,J,j-J):l(C.check,it,J,j-J)),J=at,(C.flags?q:_(q))!==C.check){k.msg="incorrect data check",C.mode=30;break}tt=q=0}C.mode=28;case 28:if(C.wrap&&C.flags){for(;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(q!==(4294967295&C.total)){k.msg="incorrect length check",C.mode=30;break}tt=q=0}C.mode=29;case 29:et=1;break t;case 30:et=-3;break t;case 31:return-4;case 32:default:return m}return k.next_out=j,k.avail_out=at,k.next_in=ot,k.avail_in=rt,C.hold=q,C.bits=tt,(C.wsize||J!==k.avail_out&&C.mode<30&&(C.mode<27||F!==4))&&W(k,k.output,k.next_out,J-k.avail_out)?(C.mode=31,-4):(Lt-=k.avail_in,J-=k.avail_out,k.total_in+=Lt,k.total_out+=J,C.total+=J,C.wrap&&J&&(k.adler=C.check=C.flags?c(C.check,it,J,k.next_out-J):l(C.check,it,J,k.next_out-J)),k.data_type=C.bits+(C.last?64:0)+(C.mode===12?128:0)+(C.mode===20||C.mode===15?256:0),(Lt==0&&J===0||F===4)&&et===v&&(et=-5),et)},s.inflateEnd=function(k){if(!k||!k.state)return m;var F=k.state;return F.window&&(F.window=null),k.state=null,v},s.inflateGetHeader=function(k,F){var C;return k&&k.state&&2&(C=k.state).wrap?((C.head=F).done=!1,v):m},s.inflateSetDictionary=function(k,F){var C,Z=F.length;return k&&k.state?(C=k.state).wrap!==0&&C.mode!==11?m:C.mode===11&&l(1,F,Z,0)!==C.check?-3:W(k,F,Z,Z)?(C.mode=31,-4):(C.havedict=1,v):m},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,p,v,m,x,y,g,_){var S,M,P,N,O,U,H,D,R,W=_.bits,k=0,F=0,C=0,Z=0,it=0,ot=0,j=0,rt=0,at=0,q=0,tt=null,Lt=0,J=new o.Buf16(16),nt=new o.Buf16(16),wt=null,St=0;for(k=0;k<=15;k++)J[k]=0;for(F=0;F<m;F++)J[p[v+F]]++;for(it=W,Z=15;1<=Z&&J[Z]===0;Z--);if(Z<it&&(it=Z),Z===0)return x[y++]=20971520,x[y++]=20971520,_.bits=1,0;for(C=1;C<Z&&J[C]===0;C++);for(it<C&&(it=C),k=rt=1;k<=15;k++)if(rt<<=1,(rt-=J[k])<0)return-1;if(0<rt&&(f===0||Z!==1))return-1;for(nt[1]=0,k=1;k<15;k++)nt[k+1]=nt[k]+J[k];for(F=0;F<m;F++)p[v+F]!==0&&(g[nt[p[v+F]]++]=F);if(U=f===0?(tt=wt=g,19):f===1?(tt=l,Lt-=257,wt=c,St-=257,256):(tt=u,wt=d,-1),k=C,O=y,j=F=q=0,P=-1,N=(at=1<<(ot=it))-1,f===1&&852<at||f===2&&592<at)return 1;for(;;){for(H=k-j,R=g[F]<U?(D=0,g[F]):g[F]>U?(D=wt[St+g[F]],tt[Lt+g[F]]):(D=96,0),S=1<<k-j,C=M=1<<ot;x[O+(q>>j)+(M-=S)]=H<<24|D<<16|R|0,M!==0;);for(S=1<<k-1;q&S;)S>>=1;if(S!==0?(q&=S-1,q+=S):q=0,F++,--J[k]==0){if(k===Z)break;k=p[v+g[F]]}if(it<k&&(q&N)!==P){for(j===0&&(j=it),O+=C,rt=1<<(ot=k-j);ot+j<Z&&!((rt-=J[ot+j])<=0);)ot++,rt<<=1;if(at+=1<<ot,f===1&&852<at||f===2&&592<at)return 1;x[P=q&N]=it<<24|ot<<16|O-y|0}}return q!==0&&(x[O+q]=k-j<<24|64<<16|0),_.bits=it,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function u(w){for(var B=w.length;0<=--B;)w[B]=0}var d=0,f=29,p=256,v=p+1+f,m=30,x=19,y=2*v+1,g=15,_=16,S=7,M=256,P=16,N=17,O=18,U=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],H=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],W=new Array(2*(v+2));u(W);var k=new Array(2*m);u(k);var F=new Array(512);u(F);var C=new Array(256);u(C);var Z=new Array(f);u(Z);var it,ot,j,rt=new Array(m);function at(w,B,X,K,G){this.static_tree=w,this.extra_bits=B,this.extra_base=X,this.elems=K,this.max_length=G,this.has_stree=w&&w.length}function q(w,B){this.dyn_tree=w,this.max_code=0,this.stat_desc=B}function tt(w){return w<256?F[w]:F[256+(w>>>7)]}function Lt(w,B){w.pending_buf[w.pending++]=255&B,w.pending_buf[w.pending++]=B>>>8&255}function J(w,B,X){w.bi_valid>_-X?(w.bi_buf|=B<<w.bi_valid&65535,Lt(w,w.bi_buf),w.bi_buf=B>>_-w.bi_valid,w.bi_valid+=X-_):(w.bi_buf|=B<<w.bi_valid&65535,w.bi_valid+=X)}function nt(w,B,X){J(w,X[2*B],X[2*B+1])}function wt(w,B){for(var X=0;X|=1&w,w>>>=1,X<<=1,0<--B;);return X>>>1}function St(w,B,X){var K,G,ft=new Array(g+1),lt=0;for(K=1;K<=g;K++)ft[K]=lt=lt+X[K-1]<<1;for(G=0;G<=B;G++){var pt=w[2*G+1];pt!==0&&(w[2*G]=wt(ft[pt]++,pt))}}function Pt(w){var B;for(B=0;B<v;B++)w.dyn_ltree[2*B]=0;for(B=0;B<m;B++)w.dyn_dtree[2*B]=0;for(B=0;B<x;B++)w.bl_tree[2*B]=0;w.dyn_ltree[2*M]=1,w.opt_len=w.static_len=0,w.last_lit=w.matches=0}function It(w){8<w.bi_valid?Lt(w,w.bi_buf):0<w.bi_valid&&(w.pending_buf[w.pending++]=w.bi_buf),w.bi_buf=0,w.bi_valid=0}function kt(w,B,X,K){var G=2*B,ft=2*X;return w[G]<w[ft]||w[G]===w[ft]&&K[B]<=K[X]}function st(w,B,X){for(var K=w.heap[X],G=X<<1;G<=w.heap_len&&(G<w.heap_len&&kt(B,w.heap[G+1],w.heap[G],w.depth)&&G++,!kt(B,K,w.heap[G],w.depth));)w.heap[X]=w.heap[G],X=G,G<<=1;w.heap[X]=K}function vt(w,B,X){var K,G,ft,lt,pt=0;if(w.last_lit!==0)for(;K=w.pending_buf[w.d_buf+2*pt]<<8|w.pending_buf[w.d_buf+2*pt+1],G=w.pending_buf[w.l_buf+pt],pt++,K===0?nt(w,G,B):(nt(w,(ft=C[G])+p+1,B),(lt=U[ft])!==0&&J(w,G-=Z[ft],lt),nt(w,ft=tt(--K),X),(lt=H[ft])!==0&&J(w,K-=rt[ft],lt)),pt<w.last_lit;);nt(w,M,B)}function xt(w,B){var X,K,G,ft=B.dyn_tree,lt=B.stat_desc.static_tree,pt=B.stat_desc.has_stree,Tt=B.stat_desc.elems,Et=-1;for(w.heap_len=0,w.heap_max=y,X=0;X<Tt;X++)ft[2*X]!==0?(w.heap[++w.heap_len]=Et=X,w.depth[X]=0):ft[2*X+1]=0;for(;w.heap_len<2;)ft[2*(G=w.heap[++w.heap_len]=Et<2?++Et:0)]=1,w.depth[G]=0,w.opt_len--,pt&&(w.static_len-=lt[2*G+1]);for(B.max_code=Et,X=w.heap_len>>1;1<=X;X--)st(w,ft,X);for(G=Tt;X=w.heap[1],w.heap[1]=w.heap[w.heap_len--],st(w,ft,1),K=w.heap[1],w.heap[--w.heap_max]=X,w.heap[--w.heap_max]=K,ft[2*G]=ft[2*X]+ft[2*K],w.depth[G]=(w.depth[X]>=w.depth[K]?w.depth[X]:w.depth[K])+1,ft[2*X+1]=ft[2*K+1]=G,w.heap[1]=G++,st(w,ft,1),2<=w.heap_len;);w.heap[--w.heap_max]=w.heap[1],function(At,Ht){var zt,Dt,Kt,Vt,oe,ae,te=Ht.dyn_tree,Ft=Ht.max_code,I=Ht.stat_desc.static_tree,ht=Ht.stat_desc.has_stree,Mt=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,Nt=Ht.stat_desc.max_length,re=0;for(Vt=0;Vt<=g;Vt++)At.bl_count[Vt]=0;for(te[2*At.heap[At.heap_max]+1]=0,zt=At.heap_max+1;zt<y;zt++)Nt<(Vt=te[2*te[2*(Dt=At.heap[zt])+1]+1]+1)&&(Vt=Nt,re++),te[2*Dt+1]=Vt,Ft<Dt||(At.bl_count[Vt]++,oe=0,Rt<=Dt&&(oe=Mt[Dt-Rt]),ae=te[2*Dt],At.opt_len+=ae*(Vt+oe),ht&&(At.static_len+=ae*(I[2*Dt+1]+oe)));if(re!==0){do{for(Vt=Nt-1;At.bl_count[Vt]===0;)Vt--;At.bl_count[Vt]--,At.bl_count[Vt+1]+=2,At.bl_count[Nt]--,re-=2}while(0<re);for(Vt=Nt;Vt!==0;Vt--)for(Dt=At.bl_count[Vt];Dt!==0;)Ft<(Kt=At.heap[--zt])||(te[2*Kt+1]!==Vt&&(At.opt_len+=(Vt-te[2*Kt+1])*te[2*Kt],te[2*Kt+1]=Vt),Dt--)}}(w,B),St(ft,Et,w.bl_count)}function E(w,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),B[2*(X+1)+1]=65535,K=0;K<=X;K++)G=lt,lt=B[2*(K+1)+1],++pt<Tt&&G===lt||(pt<Et?w.bl_tree[2*G]+=pt:G!==0?(G!==ft&&w.bl_tree[2*G]++,w.bl_tree[2*P]++):pt<=10?w.bl_tree[2*N]++:w.bl_tree[2*O]++,ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4))}function et(w,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),K=0;K<=X;K++)if(G=lt,lt=B[2*(K+1)+1],!(++pt<Tt&&G===lt)){if(pt<Et)for(;nt(w,G,w.bl_tree),--pt!=0;);else G!==0?(G!==ft&&(nt(w,G,w.bl_tree),pt--),nt(w,P,w.bl_tree),J(w,pt-3,2)):pt<=10?(nt(w,N,w.bl_tree),J(w,pt-3,3)):(nt(w,O,w.bl_tree),J(w,pt-11,7));ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4)}}u(rt);var $=!1;function A(w,B,X,K){J(w,(d<<1)+(K?1:0),3),function(G,ft,lt,pt){It(G),Lt(G,lt),Lt(G,~lt),o.arraySet(G.pending_buf,G.window,ft,lt,G.pending),G.pending+=lt}(w,B,X)}s._tr_init=function(w){$||(function(){var B,X,K,G,ft,lt=new Array(g+1);for(G=K=0;G<f-1;G++)for(Z[G]=K,B=0;B<1<<U[G];B++)C[K++]=G;for(C[K-1]=G,G=ft=0;G<16;G++)for(rt[G]=ft,B=0;B<1<<H[G];B++)F[ft++]=G;for(ft>>=7;G<m;G++)for(rt[G]=ft<<7,B=0;B<1<<H[G]-7;B++)F[256+ft++]=G;for(X=0;X<=g;X++)lt[X]=0;for(B=0;B<=143;)W[2*B+1]=8,B++,lt[8]++;for(;B<=255;)W[2*B+1]=9,B++,lt[9]++;for(;B<=279;)W[2*B+1]=7,B++,lt[7]++;for(;B<=287;)W[2*B+1]=8,B++,lt[8]++;for(St(W,v+1,lt),B=0;B<m;B++)k[2*B+1]=5,k[2*B]=wt(B,5);it=new at(W,U,p+1,v,g),ot=new at(k,H,0,m,g),j=new at(new Array(0),D,0,x,S)}(),$=!0),w.l_desc=new q(w.dyn_ltree,it),w.d_desc=new q(w.dyn_dtree,ot),w.bl_desc=new q(w.bl_tree,j),w.bi_buf=0,w.bi_valid=0,Pt(w)},s._tr_stored_block=A,s._tr_flush_block=function(w,B,X,K){var G,ft,lt=0;0<w.level?(w.strm.data_type===2&&(w.strm.data_type=function(pt){var Tt,Et=4093624447;for(Tt=0;Tt<=31;Tt++,Et>>>=1)if(1&Et&&pt.dyn_ltree[2*Tt]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Tt=32;Tt<p;Tt++)if(pt.dyn_ltree[2*Tt]!==0)return c;return l}(w)),xt(w,w.l_desc),xt(w,w.d_desc),lt=function(pt){var Tt;for(E(pt,pt.dyn_ltree,pt.l_desc.max_code),E(pt,pt.dyn_dtree,pt.d_desc.max_code),xt(pt,pt.bl_desc),Tt=x-1;3<=Tt&&pt.bl_tree[2*R[Tt]+1]===0;Tt--);return pt.opt_len+=3*(Tt+1)+5+5+4,Tt}(w),G=w.opt_len+3+7>>>3,(ft=w.static_len+3+7>>>3)<=G&&(G=ft)):G=ft=X+5,X+4<=G&&B!==-1?A(w,B,X,K):w.strategy===4||ft===G?(J(w,2+(K?1:0),3),vt(w,W,k)):(J(w,4+(K?1:0),3),function(pt,Tt,Et,At){var Ht;for(J(pt,Tt-257,5),J(pt,Et-1,5),J(pt,At-4,4),Ht=0;Ht<At;Ht++)J(pt,pt.bl_tree[2*R[Ht]+1],3);et(pt,pt.dyn_ltree,Tt-1),et(pt,pt.dyn_dtree,Et-1)}(w,w.l_desc.max_code+1,w.d_desc.max_code+1,lt+1),vt(w,w.dyn_ltree,w.dyn_dtree)),Pt(w),K&&It(w)},s._tr_tally=function(w,B,X){return w.pending_buf[w.d_buf+2*w.last_lit]=B>>>8&255,w.pending_buf[w.d_buf+2*w.last_lit+1]=255&B,w.pending_buf[w.l_buf+w.last_lit]=255&X,w.last_lit++,B===0?w.dyn_ltree[2*X]++:(w.matches++,B--,w.dyn_ltree[2*(C[X]+p+1)]++,w.dyn_dtree[2*tt(B)]++),w.last_lit===w.lit_bufsize-1},s._tr_align=function(w){J(w,2,3),nt(w,M,W),function(B){B.bi_valid===16?(Lt(B,B.bi_buf),B.bi_buf=0,B.bi_valid=0):8<=B.bi_valid&&(B.pending_buf[B.pending++]=255&B.bi_buf,B.bi_buf>>=8,B.bi_valid-=8)}(w)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var u,d,f,p,v=1,m={},x=!1,y=l.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(l);g=g&&g.setTimeout?g:l,u={}.toString.call(l.process)==="[object process]"?function(P){process.nextTick(function(){S(P)})}:function(){if(l.postMessage&&!l.importScripts){var P=!0,N=l.onmessage;return l.onmessage=function(){P=!1},l.postMessage("","*"),l.onmessage=N,P}}()?(p="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",M,!1):l.attachEvent("onmessage",M),function(P){l.postMessage(p+P,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(P){S(P.data)},function(P){f.port2.postMessage(P)}):y&&"onreadystatechange"in y.createElement("script")?(d=y.documentElement,function(P){var N=y.createElement("script");N.onreadystatechange=function(){S(P),N.onreadystatechange=null,d.removeChild(N),N=null},d.appendChild(N)}):function(P){setTimeout(S,0,P)},g.setImmediate=function(P){typeof P!="function"&&(P=new Function(""+P));for(var N=new Array(arguments.length-1),O=0;O<N.length;O++)N[O]=arguments[O+1];var U={callback:P,args:N};return m[v]=U,u(v),v++},g.clearImmediate=_}function _(P){delete m[P]}function S(P){if(x)setTimeout(S,0,P);else{var N=m[P];if(N){x=!0;try{(function(O){var U=O.callback,H=O.args;switch(H.length){case 0:U();break;case 1:U(H[0]);break;case 2:U(H[0],H[1]);break;case 3:U(H[0],H[1],H[2]);break;default:U.apply(c,H)}})(N)}finally{_(P),x=!1}}}}function M(P){P.source===l&&typeof P.data=="string"&&P.data.indexOf(p)===0&&S(+P.data.slice(p.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof Ls<"u"?Ls:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(wf);var Wb=wf.exports;const Zb=od(Wb);async function Xb(r){if(!bt.tg||!bt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(bt.tg.traverse(m=>{if(!(m instanceof ze))return;const x=m.geometry.clone();m.updateWorldMatrix(!0,!1),x.applyMatrix4(m.matrixWorld);const y=x.attributes.position,g=x.index;if(!y||y.count<3){x.dispose();return}let _="E4DFD8";const S=Array.isArray(m.material)?m.material[0]:m.material;S&&"color"in S&&(_=S.color.getHexString().toUpperCase());let M="";for(let N=0;N<y.count;N++)M+=`<vertex x="${y.getX(N).toFixed(4)}" y="${y.getZ(N).toFixed(4)}" z="${y.getY(N).toFixed(4)}"/>`;let P="";if(g)for(let N=0;N<g.count;N+=3)P+=`<triangle v1="${g.getX(N)}" v2="${g.getX(N+1)}" v3="${g.getX(N+2)}"/>`;else for(let N=0;N<y.count;N+=3)P+=`<triangle v1="${N}" v2="${N+1}" v3="${N+2}"/>`;x.dispose(),P&&t.push({id:e++,name:m.name||"mesh",col:_,vx:M,tr:P})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(m=>`<basematerials id="${m.id+1e3}"><base name="${m.name}" displaycolor="#${m.col}"/></basematerials>`).join(`
`),s=t.map(m=>`<object id="${m.id}" type="model" p:pid="${m.id+1e3}" p:pindex="0"><mesh><vertices>${m.vx}</vertices><triangles>${m.tr}</triangles></mesh></object>`).join(`
`),o=t.map(m=>`<item objectid="${m.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),u=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),d=new Zb;d.file("[Content_Types].xml",u),d.folder("_rels").file(".rels",c),d.folder("3D").file("3dmodel.model",l);const f=await d.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),p=URL.createObjectURL(f),v=document.createElement("a");v.href=p,v.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(p)}let Vn=null,pi=null,Wn=null,Gn=null,td="",Sn=null,_n=null,Qn=null,Jl="",Ql=[],ed="";const ke={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},Mf={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0},or={};let sa=null,oa=null,tc=[],nn=null,Zr=null,As=null,_c=!1;const _a=256,qb=2048;let ec=[];const Xr=[];function Sf(){if(!nn||!Zr)return!1;const r=Zr.getBoundingClientRect();return!r.width||!r.height?!1:(nn.style.left=`${r.left}px`,nn.style.top=`${r.top}px`,nn.style.width=`${r.width}px`,nn.style.height=`${r.height}px`,Vn&&(Vn.setSize(r.width,r.height,!1),Wn.aspect=r.width/r.height,Wn.updateProjectionMatrix()),!0)}function nd(){if(!nn||!_c)return;Sf()&&nn.style.display==="none"&&(nn.style.display="block")}function aa(r){if(nn||(nn=document.getElementById("dims-canvas")),Zr!==r&&(As&&Zr&&As.unobserve(Zr),Zr=r,As||(As=new ResizeObserver(nd),window.addEventListener("resize",nd)),As.observe(r)),_c=!0,Sf()&&nn&&(nn.style.display="block"),Vn)return;const t=r.getBoundingClientRect(),e=t.width||800,n=t.height||600;Vn=new Zd({canvas:nn,antialias:!0}),Vn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Vn.setSize(e,n,!1),pi=new Xd,pi.background=new Qt(527380),Wn=new wn(42,e/n,.1,1e5),Gn=new sf(Wn,nn),Gn.enableDamping=!0,Gn.dampingFactor=.06,pi.add(new rf(16777215,.8));const s=new Yl(16777215,.6);s.position.set(1.5,3,2),pi.add(s);const o=()=>{requestAnimationFrame(o),Gn.update(),Vn.render(pi,Wn),d1()};o()}function Ef(){_c=!1,nn&&(nn.style.display="none")}function rs(r){if(Object.assign(ke,r),Sn&&(_n&&(_n.dispose(),_n=null),_n=Tf(Sn.bounds,Sn.grid,_a,Sn.minE,Sn.elevRange,Ql),sa)){const s=sa.material;s.map=_n,s.needsUpdate=!0}const t=or.base??1;oa&&oa.material.color.set(ke[t]??ke[1]);const e=or.facade??1,n=new Qt(ke[e]??ke[1]);for(const s of tc)s.material.color.set(n)}function jb(r,t){or[r]=t,rs({})}function Yb(r,t){Mf[r]=t,rs({})}async function $b(r,t,e){if(!pi||!Wn||!Gn||!Vn)return;const n=`${r.minLat}|${r.maxLat}|${r.minLon}|${r.maxLon}`;n!==td?(td=n,Sn=null,_n&&(_n.dispose(),_n=null),e(5,"Téléchargement des altitudes…"),Sn=await u1(r),e(35,"Chargement des données géographiques…"),n!==ed&&(ed=n,Ql=await Jb(r)),e(70,"Génération de la texture…"),_n=Tf(r,Sn.grid,_a,Sn.minE,Sn.elevRange,Ql)):e(50,"Reconstruction…");const o=JSON.stringify(t.zonePts);(o!==Jl||!Qn)&&(Jl=o,Qn&&(Qn.dispose(),Qn=null),Qn=t1(t.zonePts,t.zoneType,r)),e(88,"Construction de la scène 3D…"),va(t),e(100,"")}function va(r){if(!pi||!Wn||!Gn||!Sn||!_n)return;h1();const{wMm:t,dMm:e,baseH:n,exag:s,flatFacade:o,facadeWidthMm:l,gpxPoints:c,zoneType:u,zonePts:d,bounds:f}=r,{grid:p,minE:v,elevRange:m}=Sn,x=f??Sn.bounds,y=(x.minLat+x.maxLat)/2,g=(x.maxLon-x.minLon)*Math.cos(y*Math.PI/180)*111320,_=(x.maxLat-x.minLat)*111320,S=Math.max(g,_),M=Math.max(t,e),P=Math.max(1,Math.min(M*.5,m/S*M*s)),N=n+P,O=_a,U=e1(d,u,x,t,e),H=Math.max(1,l);sa=null,oa=null,tc=[];{const it=new qs(t,e,O-1,O-1);it.rotateX(-Math.PI/2);const ot=it.attributes.position;for(let rt=0;rt<ot.count;rt++)ot.setY(rt,n+(p[rt]-v)/m*P);ot.needsUpdate=!0,it.computeVertexNormals();const j=new ze(it,new Al({map:_n,alphaMap:Qn??void 0,transparent:!!Qn}));sa=j,Cs(j)}const D=or.base??1,R=new Qt(ke[D]??ke[1]),W=new ze(n1(U,u,t,e,n,H),new Al({color:R}));oa=W,Cs(W);const k=or.facade??1,F=new Qt(ke[k]??ke[1]),C=new Al({color:F,side:gn});for(const it of i1(U,u,t,e,H,o,N,p,O,v,m,n,P))it.material=C,tc.push(it),Cs(it);if(c.length>=2){const it=a1(c,x,t,e,p,O,v,m,n,P);it&&Cs(it)}{const it=new ix(new _x(new cn(t+H*2,N,e+H*2)),new uc({color:16718362}));it.position.y=N/2,Cs(it)}Xr.length=0,Xr.push({id:"dl-width",v:new Q(0,2,e/2+H+14)}),Xr.push({id:"dl-depth",v:new Q(t/2+H+14,N*.1,0)}),Xr.push({id:"dl-height",v:new Q(-t/2-H-12,N/2,e/2+8)}),Br("dl-width",`${t} mm`),Br("dl-depth",`${e} mm`),Br("dl-height",`~${Math.round(N*10)/10} mm`),Br("dp-total-val",`~${Math.round(N*10)/10}`),Br("dp-map-h",`~${Math.round(P*10)/10}`),Br("dp-base-h-disp",`${n}`);const Z=Math.sqrt(t*t+e*e);if(Gn.target.lengthSq()<.1){Wn.position.set(t*.7,N+Z*.44,e*.92);const it=new Q(0,N*.2,0);Wn.lookAt(it),Gn.target.copy(it),Gn.update()}}function Kb(){Gn&&Gn.target.set(0,0,0),_n&&(_n.dispose(),_n=null),Qn&&(Qn.dispose(),Qn=null),Jl=""}async function Jb(r){const{minLat:t,minLon:e,maxLat:n,maxLon:s}=r,o=`(${t},${e},${n},${s})`,l=`[out:json][timeout:28];
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
out geom;`,c=new AbortController,u=setTimeout(()=>c.abort(),22e3);try{const d=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(l)}`,{signal:c.signal});return clearTimeout(u),(await d.json()).elements??[]}catch{return clearTimeout(u),[]}}const Qb=[{id:"veg_low",match:r=>r.natural==="grassland"||r.landuse==="meadow"||r.landuse==="grass"||r.landuse==="farmland"||r.natural==="fell"||r.natural==="moor"||r.natural==="heath"||r.natural==="scrub",slot:3,fill:!0},{id:"veg_dense",match:r=>r.natural==="wood"||r.landuse==="forest",slot:4,fill:!0},{id:"wetland",match:r=>r.natural==="wetland"||r.natural==="mud",slot:3,fill:!0},{id:"snow",match:r=>r.natural==="glacier"||r.natural==="snow",slot:2,fill:!0},{id:"water",match:r=>r.natural==="water"||r.waterway==="riverbank",slot:5,fill:!0},{id:"waterways",match:r=>!!r.waterway&&r.waterway!=="riverbank",slot:5,fill:!1}];function Tf(r,t,e,n,s,o){const l=qb,c=document.createElement("canvas");c.width=c.height=l;const u=c.getContext("2d"),d=u.createImageData(l,l),f=d.data;for(let p=0;p<l;p++)for(let v=0;v<l;v++){const m=v/(l-1)*(e-1),x=p/(l-1)*(e-1),y=Math.min(e-2,Math.floor(m)),g=Math.min(e-2,Math.floor(x)),_=m-y,S=x-g,M=t[g*e+y]*(1-_)*(1-S)+t[g*e+y+1]*_*(1-S)+t[(g+1)*e+y]*(1-_)*S+t[(g+1)*e+y+1]*_*S,P=Math.max(0,Math.min(1,(M-n)/s)),[N,O,U]=c1(P),H=(p*l+v)*4;f[H]=N,f[H+1]=O,f[H+2]=U,f[H+3]=255}u.putImageData(d,0,0);for(const p of Qb){if(!Mf[p.id])continue;const v=o.filter(y=>y.tags&&p.match(y.tags));if(!v.length)continue;const m=or[p.id]??p.slot,x=ke[m]??"#888";if(p.fill){u.beginPath();for(const y of v)id(u,y,r,l);u.fillStyle=x,u.fill("evenodd")}else for(const y of v){if(!y.tags)continue;const g=y.tags.waterway??"",_=g==="river"?7:g==="canal"?5:g==="stream"?2.5:1.5;u.beginPath(),id(u,y,r,l),u.strokeStyle=x,u.lineWidth=_,u.lineCap="round",u.lineJoin="round",u.stroke()}}return new jd(c)}function id(r,t,e,n){const s=o=>{if(!(!o||o.length<2)){for(let l=0;l<o.length;l++){const c=(o[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,u=(1-(o[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?r.moveTo(c,u):r.lineTo(c,u)}r.closePath()}};if(t.type==="way"&&t.geometry)s(t.geometry);else if(t.type==="relation"&&t.members)for(const o of t.members)o.role==="outer"&&o.geometry&&s(o.geometry)}function t1(r,t,e,n,s){if(!r||r.length<3||t==="rect"||t==="sq")return null;const o=512,l=document.createElement("canvas");l.width=l.height=o;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,o,o),c.fillStyle="white",c.beginPath();for(let u=0;u<r.length;u++){const[d,f]=r[u],p=(f-e.minLon)/(e.maxLon-e.minLon)*o,v=(1-(d-e.minLat)/(e.maxLat-e.minLat))*o;u===0?c.moveTo(p,v):c.lineTo(p,v)}return c.closePath(),c.fill(),new jd(l)}function e1(r,t,e,n,s){return!r||r.length<3||t==="rect"||t==="sq"?[[-n/2,-s/2],[n/2,-s/2],[n/2,s/2],[-n/2,s/2]]:r.map(([o,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(o-e.minLat)/(e.maxLat-e.minLat))*s-s/2])}function n1(r,t,e,n,s,o){if(t==="rect"||t==="sq"){const u=new cn(e+o*2,s,n+o*2);return u.translate(0,s/2,0),u}const l=new pc;if(t==="circ"){const u=e/2+o,d=n/2+o;for(let f=0;f<=64;f++){const p=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(p)*u,Math.sin(p)*d):l.lineTo(Math.cos(p)*u,Math.sin(p)*d)}}else{l.moveTo(r[0][0],r[0][1]);for(let u=1;u<r.length;u++)l.lineTo(r[u][0],r[u][1]);l.closePath()}const c=new ga(l,{depth:s,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function i1(r,t,e,n,s,o,l,c,u,d,f,p,v){const m=(y,g)=>{const _=Math.max(0,Math.min(1,(y+e/2)/e)),S=Math.max(0,Math.min(1,(g+n/2)/n)),M=_*(u-1),P=S*(u-1),N=Math.min(u-2,Math.floor(M)),O=Math.min(u-2,Math.floor(P)),U=M-N,H=P-O,D=c[O*u+N]*(1-U)*(1-H)+c[O*u+N+1]*U*(1-H)+c[(O+1)*u+N]*(1-U)*H+c[(O+1)*u+N+1]*U*H;return p+(D-d)/f*v};return t==="rect"||t==="sq"?o?r1(e,n,s,l):s1(e,n,s,u,c,d,f,p,v):o1(r,s,o?()=>l:m)}function r1(r,t,e,n){const s=(o,l,c,u,d)=>{const f=new ze(new cn(o,l,c));return f.position.set(u,l/2,d),f};return[s(r+e*2,n,e,0,t/2+e/2),s(r+e*2,n,e,0,-t/2-e/2),s(e,n,t,r/2+e/2,0),s(e,n,t,-r/2-e/2,0)]}function s1(r,t,e,n,s,o,l,c,u){const d=(g,_)=>c+(s[_*n+g]-o)/l*u,f=d(0,n-1),p=d(n-1,n-1),v=d(0,0),m=d(n-1,0),x=[[-r/2-e,t/2,f],...Array.from({length:n},(g,_)=>[-r/2+_/(n-1)*r,t/2,d(_,n-1)]),[r/2+e,t/2,p]],y=[[r/2+e,-t/2,m],...Array.from({length:n},(g,_)=>[r/2-_/(n-1)*r,-t/2,d(n-1-_,0)]),[-r/2-e,-t/2,v]];return[Is(x,[0,0,1],e),Is(y,[0,0,-1],e),Is(Array.from({length:n},(g,_)=>[r/2,t/2-_/(n-1)*t,d(n-1,n-1-_)]),[1,0,0],e),Is(Array.from({length:n},(g,_)=>[-r/2,-t/2+_/(n-1)*t,d(0,_)]),[-1,0,0],e)]}function o1(r,t,e){const n=[],s=r.length;for(let o=0;o<s;o++){const[l,c]=r[o],[u,d]=r[(o+1)%s],f=u-l,p=d-c,v=Math.sqrt(f*f+p*p);if(v<.5)continue;const m=p/v,x=-f/v,y=Math.max(2,Math.round(v/3)),g=[];for(let _=0;_<=y;_++){const S=_/y,M=l+f*S,P=c+p*S;g.push([M,P,e(M,P)])}n.push(Is(g,[m,0,x],t))}return n}function Is(r,t,e){const n=r.length,[s,,o]=t,l=[],c=[];for(const[m,x,y]of r)l.push(m+s*e,0,x+o*e),l.push(m+s*e,y,x+o*e);for(const[m,x,y]of r)l.push(m,0,x),l.push(m,y,x);for(const[m,x,y]of r)l.push(m+s*e,y,x+o*e),l.push(m,y,x);for(const[m,x]of r)l.push(m+s*e,0,x+o*e),l.push(m,0,x);const u=0,d=n*2,f=n*4,p=n*6;for(let m=0;m<n-1;m++){const x=m*2;c.push(u+x,u+x+2,u+x+1,u+x+1,u+x+2,u+x+3),c.push(d+x,d+x+1,d+x+2,d+x+1,d+x+3,d+x+2),c.push(f+x,f+x+1,f+x+2,f+x+1,f+x+3,f+x+2),c.push(p+x,p+x+2,p+x+1,p+x+1,p+x+2,p+x+3)}const v=new He;return v.setAttribute("position",new Me(l,3)),v.setIndex(c),v.computeVertexNormals(),new ze(v)}function a1(r,t,e,n,s,o,l,c,u,d){const f=[];for(const p of r){const v=(p.lon-t.minLon)/(t.maxLon-t.minLon),m=(p.lat-t.minLat)/(t.maxLat-t.minLat);if(v<0||v>1||m<0||m>1)continue;const x=(v-.5)*e,y=(.5-m)*n,g=v*(o-1),_=(1-m)*(o-1),S=Math.min(o-2,Math.floor(g)),M=Math.min(o-2,Math.floor(_)),P=g-S,N=_-M,O=s[M*o+S]*(1-P)*(1-N)+s[M*o+S+1]*P*(1-N)+s[(M+1)*o+S]*(1-P)*N+s[(M+1)*o+S+1]*P*N;f.push(new Q(x,u+(O-l)/c*d+1,y))}return f.length<2?null:new qd(new He().setFromPoints(f),new uc({color:16729344}))}function l1(r){const t=parseInt(r.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function c1(r){const[t,e,n]=l1(ke[1]),s=.78+r*.44;return[Math.min(255,Math.round(t*s)),Math.min(255,Math.round(e*s)),Math.min(255,Math.round(n*s))]}async function u1(r){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=s=>{s.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:s.data.elevGrid,minE:s.data.minE,elevRange:s.data.elevRange,bounds:r})):s.data.type==="ERROR"&&(n.terminate(),e(new Error(s.data.message)))},n.onerror=s=>{n.terminate(),e(s)},n.postMessage({type:"BUILD_TERRAIN",bounds:r,GRID:_a,elevZoom:12})})}function Cs(r){pi.add(r),ec.push(r)}function Br(r,t){const e=document.getElementById(r);e&&(e.textContent=t)}function h1(){ec.forEach(r=>{pi.remove(r),r.geometry?.dispose()}),ec=[],Xr.length=0}function d1(){if(!Wn||!Vn)return;const r=Vn.domElement.clientWidth,t=Vn.domElement.clientHeight;if(!(!r||!t))for(const{id:e,v:n}of Xr){const s=document.getElementById(e);if(!s)continue;const o=n.clone().project(Wn);if(o.z>1){s.style.opacity="0";continue}s.style.opacity="1",s.style.left=`${(o.x+1)/2*r}px`,s.style.top=`${-(o.y-1)/2*t}px`}}const f1=.05;function p1(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function m1(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function vc(){if(!bt.bounds){Ol("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(bt.generating)return;bt.generating=!0;const r=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");r.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),Ga(!0);try{const n=document.getElementById("c3d");await mc(n);const s=ad(),{bounds:o,wMm:l,dMm:c}=bt,{minLat:u,maxLat:d,minLon:f,maxLon:p}=o,v=(u+d)/2,m=(f+p)/2,x=(p-f)*Math.cos(v*Math.PI/180)*111320;bt.mmPerMeter=l/x,bt.BASE_H=s.baseH,bi(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const y=s.terrainRes,g=await new Promise((H,D)=>{const R=p1();R.onmessage=k=>{k.data.type==="PROGRESS"?bi(5+k.data.pct*.2,"ÉLÉVATION","Altitude…"):k.data.type==="TERRAIN_READY"?(R.terminate(),H(k.data)):k.data.type==="ERROR"&&(R.terminate(),D(new Error(k.data.message)))},R.onerror=k=>{R.terminate(),D(k)};const W={type:"BUILD_TERRAIN",bounds:o,GRID:y,elevZoom:s.elevZoom};R.postMessage(W)});bt.elevGrid=g.elevGrid,bt.GRID=g.GRID,bt.minE=g.minE,bt.elevRange=g.elevRange;const S=(d-u)*111320,M=Math.max(x,S),P=Math.max(l,c),N=g.elevRange/M*P*s.exag;bt.elevScaleMm=Math.max(1,Math.min(P*.5,N)),s.smooth>0&&g1(bt.elevGrid,y,s.smooth),bi(30,"DONNÉES","Chargement des données cartographiques…");const O=await Gb(o,H=>{bi(30+H*.3,"DONNÉES","Données carto…")});bi(60,"GÉOMÉTRIE","Génération des géométries 3D…");const U=await new Promise((H,D)=>{const R=m1();R.onmessage=k=>{k.data.type==="GEO_PROGRESS"?bi(60+k.data.pct*.35,"GÉOMÉTRIE",`${k.data.step}…`):k.data.type==="GEOMETRY_READY"?(R.terminate(),H(k.data)):k.data.type==="ERROR"&&(R.terminate(),D(new Error(k.data.message)))},R.onerror=k=>{R.terminate(),D(k)};const W={type:"BUILD_GEOMETRY",elevGrid:bt.elevGrid,GRID:bt.GRID,wMm:l,dMm:c,BASE_H:bt.BASE_H,MIN_SURF:f1,elevScaleMm:bt.elevScaleMm,minE:bt.minE,elevRange:bt.elevRange,features:O,gpxPoints:bt.gpxPoints,bounds:o,settings:s,zoneType:bt.zoneType,zonePts:bt.zonePts,mmPerMeter:bt.mmPerMeter};R.postMessage(W)});bi(95,"SCÈNE","Construction de la scène 3D…"),jx(U),bi(100,"TERMINÉ","Modèle 3D prêt."),bt.generated=!0,bt.generating=!1,setTimeout(()=>{Ga(!1),document.getElementById("hint3d").style.display="block",_1(g.minE,g.maxE,bt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){bt.generating=!1,Ga(!1),Ol("ERREUR",String(n)),console.error(n)}finally{r.disabled=!1}}function g1(r,t,e){const n=new Float32Array(r.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,u=0;for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){const p=o+d,v=l+f;p>=0&&p<t&&v>=0&&v<t&&(c+=r[p*t+v],u++)}n[o*t+l]=c/u}r.set(n)}}function _1(r,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(r)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function v1(){const r=document.getElementById("zone-footer");r&&(bt.bounds?(r.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),Kb()):(r.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}let la=!1,Nl=!1;function ya(){const r=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:r("dp-w",bt.wMm||200),dMm:r("dp-d",bt.dMm||200),baseH:r("dp-base",5),exag:r("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:r("dp-walls",2),gpxPoints:bt.gpxPoints,zoneType:bt.zoneType,zonePts:bt.zonePts,bounds:bt.bounds}}function Af(){const r=(v,m)=>{const x=document.getElementById(v);x&&(x.value=String(Math.round(m)))};if(!bt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:s}=bt.bounds,o=(t+e)/2,l=(s-n)*Math.cos(o*Math.PI/180)*111320,c=(e-t)*111320,u=200,d=l/c,f=d>=1?u:Math.max(10,Math.round(u*d)),p=d<1?u:Math.max(10,Math.round(u/d));bt.wMm=f,bt.dMm=p,r("dp-w",f),r("dp-d",p)}function ur(){const r=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=document.getElementById("dp-layers-hint"),o=document.getElementById("dp-wall-mm");s&&(s.textContent=`${Math.round(r/e)} couches`),o&&(o.textContent=`${(t*n).toFixed(2)} mm`)}async function nc(){if(!bt.bounds||Nl)return;Nl=!0;const r=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");r.classList.remove("hidden");try{await $b(bt.bounds,ya(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{r.classList.add("hidden"),Nl=!1}}function xa(){bt.bounds&&(Af(),ur(),requestAnimationFrame(()=>{const r=document.getElementById("dims-view");la?(aa(r),nc()):(la=!0,aa(r),nc())}))}window.dpToggle=r=>{document.getElementById(r)?.classList.toggle("open")};Pp();Dp(v1);document.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.tab;if(!(!t||r.disabled)&&(ar(t),t==="params"?xa():t==="colors"?Cf():Ef(),t==="render")){const e=document.getElementById("c3d");e&&mc(e)}})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),ar("colors"),Cf()});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),ar("render");const r=document.getElementById("c3d");r&&mc(r),vc()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{Ef(),ar("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{ar("params"),xa()});document.getElementById("btn-back-params")?.addEventListener("click",()=>{ar("params"),xa()});document.getElementById("btn-gen")?.addEventListener("click",vc);document.getElementById("btn-stl")?.addEventListener("click",()=>bf("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>Xb());document.querySelectorAll(".dp-sh").forEach(r=>{r.addEventListener("click",()=>{r.closest(".dp-sec")?.classList.toggle("open")})});let rd;const y1=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];y1.forEach(r=>{document.getElementById(r)?.addEventListener("input",()=>{ur();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(bt.wMm=t),e>0&&(bt.dMm=e),clearTimeout(rd),rd=setTimeout(()=>va(ya()),500)})});document.getElementById("dp-walls")?.addEventListener("input",ur);document.getElementById("dp-flat")?.addEventListener("change",()=>{va(ya())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>{if(!bt.generated){Ol("INFO",`Générez d'abord le modèle 3D dans l'onglet "Générer & Exporter".`);return}bf("terrain3d.stl")});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{bt.bounds&&(ar("params"),xa())});let sd;document.querySelectorAll("#params-col input, #params-col select").forEach(r=>{r.addEventListener("change",()=>{clearTimeout(sd),sd=setTimeout(()=>{bt.generated&&bt.tg&&vc()},700)}),r.addEventListener("input",()=>{if(r.type==="range"){const t=document.getElementById(`${r.id}-v`);t&&(t.textContent=r.value)}})});function Cf(){bt.bounds&&(Af(),requestAnimationFrame(()=>{const r=document.getElementById("colors-3d-area");la?(aa(r),va(ya())):(la=!0,aa(r),nc()),x1()}))}function x1(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(r=>{const t=Number(r.dataset.slot);ke[t]&&(r.style.background=ke[t])}),document.querySelectorAll(".cp-sw-inner").forEach(r=>{const e=r.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(r.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(r=>{const t=Number(r.dataset.slot);r.addEventListener("input",()=>{const n=r.value,s=r.nextElementSibling;s&&(s.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(o=>{o.style.background=n}),rs({[t]:n})});const e=r.nextElementSibling;e&&(e.style.background=r.value)});function b1(r,t){rs({[r]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${r}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${r}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let Fr=null;function w1(r,t){Fr&&(Fr.remove(),Fr=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(ke).map(Number).sort((c,u)=>c-u),s=or[r]??Number(t.dataset.slot)??1;n.forEach(c=>{const u=document.createElement("div");u.className="cp-slot-pick-item"+(c===s?" active":""),u.style.setProperty("--sw",ke[c]??"#888"),u.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,u.addEventListener("click",d=>{d.stopPropagation(),jb(r,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=ke[c]??"#888",e.remove(),Fr=null}),e.appendChild(u)}),document.body.appendChild(e),Fr=e;const o=t.getBoundingClientRect();e.style.left=`${o.left}px`,e.style.top=`${o.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),Fr=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const n=r.closest(".cp-layer")?.dataset.layer??"";n&&w1(n,r)})});let Hr=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(Hr){Hr.remove(),Hr=null;return}const r=Math.max(...Object.keys(ke).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,Hr=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),Hr=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const s=e.value;ke[r]=s;const o=document.createElement("label");o.className="cp-swatch",o.dataset.slot=String(r),o.title=`Couleur ${r}`,o.innerHTML=`<input type="color" class="cp-color-input" data-slot="${r}" value="${s}"><div class="cp-sw-inner" style="background:${s}"><span class="cp-sw-num">${r}</span></div>`,o.querySelector(".cp-color-input").addEventListener("input",function(){b1(r,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(o),t.remove(),Hr=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete ke[n],e.remove()});document.querySelectorAll(".cp-eye").forEach(r=>{const t=r.dataset.layer;t&&r.addEventListener("click",()=>{r.classList.toggle("hidden-layer");const e=!r.classList.contains("hidden-layer");Yb(t,e)})});const Lf={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const r=document.getElementById("cp-preset").value,t=Lf[r];t&&(rs(t),Object.entries(t).forEach(([e,n])=>{const s=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(s){s.value=n;const o=s.nextElementSibling;o&&(o.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const M1=document.getElementById("cp-dd-trigger"),yc=document.getElementById("cp-dd-menu");M1?.addEventListener("click",r=>{r.stopPropagation(),yc?.classList.toggle("open")});document.addEventListener("click",()=>yc?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const e=r.dataset.preset??"",n=r.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),r.classList.add("cp-dd-active");const s=document.getElementById("cp-dd-label");s&&(s.textContent=n),yc?.classList.remove("open");const o=Lf[e];o&&(rs(o),S1(o))})});function S1(r){Object.entries(r).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const s=n.nextElementSibling;s&&(s.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);r[e]&&(t.style.background=r[e])})}const xc=document.getElementById("cp-main"),bc=document.getElementById("cp-detail"),Pf=document.getElementById("ldp-title"),Rf=document.getElementById("ldp-icon"),If=document.getElementById("ldp-content");function E1(r,t,e,n){Pf.textContent=e,Rf.innerHTML=n,If.innerHTML=T1(t),xc.style.display="none",bc.style.display="flex",R1(t)}function Df(){bc.style.display="none",xc.style.display="flex"}document.getElementById("ldp-back")?.addEventListener("click",Df);document.querySelectorAll(".cp-layer-nav").forEach(r=>{r.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=r.dataset.type??"land_cover",n=r.querySelector(".cp-layer-name")?.textContent??"Couche",s=r.querySelector(".cp-layer-ico")?.innerHTML??"";E1(r.dataset.layer??"",e,n,s)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{Pf.textContent="Nouvelle couche",Rf.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',If.innerHTML=P1(),xc.style.display="none",bc.style.display="flex",I1()});function T1(r){return r==="markers"?A1():r==="lines"?C1():L1()}function A1(){return`
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Paramètres</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-label">Forme</div>
      <button class="ldp-form-btn">
        ✕ <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
      </button>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Taille (nombre de murs)</span>
        <button class="cp-icon-btn cp-info-btn" title="Taille du marqueur en nombre de lignes de mur">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="range" id="ldp-marker-size" class="cp-slider" min="1" max="20" value="10">
        <input type="number" class="ldp-num" id="ldp-marker-size-n" value="10.0" step="0.5">
        <span class="ldp-unit">( 4.20 mm )</span>
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
        Plateau plat
        <button class="ldp-edit-btn" title="Modifier"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg></button>
        <button class="cp-icon-btn cp-info-btn" title="Aplatir le sommet du marqueur">i</button>
      </label>
    </div>
    <div class="ldp-field">
      <div class="ldp-field-row">
        <span class="ldp-field-label">Décalage de hauteur<br>(nombre de calques)</span>
        <button class="cp-icon-btn cp-info-btn" title="Décalage vertical en nombre de couches d'impression">i</button>
      </div>
      <div class="ldp-range-row">
        <input type="number" class="ldp-num" id="ldp-marker-offset" value="2" step="1" min="0">
        <span class="ldp-unit">( 0,40 mm )</span>
      </div>
    </div>
  </div>`}function C1(){return`
  <div class="ldp-sec">
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Paramètres</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
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
    <div class="ldp-sec-header">
      <span class="ldp-sec-title">Caractéristiques</span>
      <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 4l4 4 4-4"/></svg>
    </div>
    <div class="ldp-checkboxes">${[{key:"hiking",label:"Itinéraires de randonnée",chevron:!0},{key:"cycling",label:"Itinéraires cyclables",chevron:!0},{key:"mtb",label:"Parcours de VTT",chevron:!0},{key:"horse",label:"Itinéraires équestres",chevron:!0},{key:"winter",label:"Sports d'hiver",chevron:!0},{key:"motor",label:"Sports mécaniques",chevron:!1},{key:"roads",label:"Routes",chevron:!0},{key:"streets",label:"Rues",chevron:!0},{key:"rails",label:"Rails",chevron:!0},{key:"paths",label:"Sentiers",chevron:!1},{key:"cycleways",label:"Pistes cyclables",chevron:!1},{key:"bridleway",label:"Chemins de bride",chevron:!1},{key:"trackways",label:"Chemins ruraux",chevron:!1},{key:"water",label:"Transport fluvial",chevron:!1}].map(e=>`
    <div class="ldp-check-item">
      <label><input type="checkbox" data-linetype="${e.key}"> ${e.label}</label>
      ${e.chevron?'<span class="ldp-chevron"><svg viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 2l3 3-3 3"/></svg></span>':""}
    </div>`).join("")}</div>
  </div>`}function L1(){return`
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
  </div>`}function P1(){return`
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
  </div>`}function R1(r){Number(document.getElementById("ps-wall-w")?.value??.42);const t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(r==="markers"){const e=document.getElementById("ldp-marker-size"),n=document.getElementById("ldp-marker-size-n"),s=document.getElementById("ldp-marker-rot"),o=document.getElementById("ldp-marker-rot-n"),l=document.getElementById("ldp-marker-offset"),c=()=>{const u=Number(e.value);n.value=u.toFixed(1),l.nextElementSibling&&(l.nextElementSibling.textContent=`( ${l.value===""?"0.00":(Number(l.value)*t).toFixed(2)} mm )`)};e?.addEventListener("input",()=>{n.value=e.value,c()}),n?.addEventListener("input",()=>{e&&(e.value=n.value)}),s?.addEventListener("input",()=>{o&&(o.value=s.value)}),o?.addEventListener("input",()=>{s&&(s.value=o.value)})}if(r==="lines"){const e=document.getElementById("ldp-line-w"),n=document.getElementById("ldp-line-w-n");e?.addEventListener("input",()=>{n&&(n.value=e.value)}),n?.addEventListener("input",()=>{e&&(e.value=n.value)})}}function I1(){document.getElementById("ldp-new-type")?.addEventListener("change",r=>{const t=r.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",Df),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const r=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=r[(r.indexOf(t)+1)%r.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=ke[e]??"#888"})}const Kr=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{Kr.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{Kr.classList.add("hidden")});Kr?.addEventListener("click",r=>{r.target===Kr&&Kr.classList.add("hidden")});const ca=document.getElementById("ps-layer-h"),ua=document.getElementById("ps-wall-w"),Nf=document.getElementById("ps-layer-h-val"),Of=document.getElementById("ps-wall-w-val");ca?.addEventListener("input",()=>{Nf.textContent=Number(ca.value).toFixed(2),ur()});ua?.addEventListener("input",()=>{Of.textContent=Number(ua.value).toFixed(2),ur()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{Kr.classList.add("hidden"),ur()});document.getElementById("ps-reset")?.addEventListener("click",()=>{ca&&(ca.value="0.20",Nf.textContent="0.20"),ua&&(ua.value="0.42",Of.textContent="0.42"),ur()});
