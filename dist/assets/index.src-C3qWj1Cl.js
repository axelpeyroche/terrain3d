(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function Tp(){document.getElementById("app").innerHTML=`

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
            <div class="cp-layer cp-layer-fixed">
              <span class="cp-drag"></span>
              <div class="cp-sw-mini" data-slot="3" style="background:#8ab858">3</div>
              <svg class="cp-layer-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="8" width="12" height="6" rx="1"/></svg>
              <span class="cp-layer-name">Base</span>
            </div>

            <div class="cp-layer cp-layer-fixed">
              <span class="cp-drag"></span>
              <div class="cp-sw-mini" data-slot="1" style="background:#c0af88">1</div>
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
`}function xi(r,t,e){const n=h=>document.getElementById(h),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${r}%`);const c=n("pp");c&&(c.textContent=`${Math.round(r)}%`)}function Fa(r){const t=document.getElementById("prog");t&&(t.style.display=r?"flex":"none")}function Il(r,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=r,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function or(r){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===r)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${r}`))}window.ts=r=>{document.getElementById(`sb-${r}`)?.classList.toggle("h"),document.getElementById(`ca-${r}`)?.classList.toggle("o")};window.ev=r=>{r.stopPropagation()};var Es=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function nd(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Dl={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(r,t){(function(e,n){n(t)})(Es,function(e){var n="1.9.4";function s(i){var a,u,b,T;for(u=1,b=arguments.length;u<b;u++){T=arguments[u];for(a in T)i[a]=T[a]}return i}var o=Object.create||function(){function i(){}return function(a){return i.prototype=a,new i}}();function l(i,a){var u=Array.prototype.slice;if(i.bind)return i.bind.apply(i,u.call(arguments,1));var b=u.call(arguments,2);return function(){return i.apply(a,b.length?b.concat(u.call(arguments)):arguments)}}var c=0;function h(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,a,u){var b,T,z,Y;return Y=function(){b=!1,T&&(z.apply(u,T),T=!1)},z=function(){b?T=arguments:(i.apply(u,arguments),setTimeout(Y,a),b=!0)},z}function f(i,a,u){var b=a[1],T=a[0],z=b-T;return i===b&&u?i:((i-T)%z+z)%z+T}function p(){return!1}function _(i,a){if(a===!1)return i;var u=Math.pow(10,a===void 0?6:a);return Math.round(i*u)/u}function m(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function x(i){return m(i).split(/\s+/)}function y(i,a){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?o(i.options):{});for(var u in a)i.options[u]=a[u];return i.options}function g(i,a,u){var b=[];for(var T in i)b.push(encodeURIComponent(u?T.toUpperCase():T)+"="+encodeURIComponent(i[T]));return(!a||a.indexOf("?")===-1?"?":"&")+b.join("&")}var v=/\{ *([\w_ -]+) *\}/g;function S(i,a){return i.replace(v,function(u,b){var T=a[b];if(T===void 0)throw new Error("No value provided for variable "+u);return typeof T=="function"&&(T=T(a)),T})}var M=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function P(i,a){for(var u=0;u<i.length;u++)if(i[u]===a)return u;return-1}var N="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function O(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var U=0;function H(i){var a=+new Date,u=Math.max(0,16-(a-U));return U=a+u,window.setTimeout(i,u)}var I=window.requestAnimationFrame||O("RequestAnimationFrame")||H,R=window.cancelAnimationFrame||O("CancelAnimationFrame")||O("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function W(i,a,u){if(u&&I===H)i.call(a);else return I.call(window,l(i,a))}function k(i){i&&R.call(window,i)}var F={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:h,throttle:d,wrapNum:f,falseFn:p,formatNum:_,trim:m,splitWords:x,setOptions:y,getParamString:g,template:S,isArray:M,indexOf:P,emptyImageUrl:N,requestFn:I,cancelFn:R,requestAnimFrame:W,cancelAnimFrame:k};function A(){}A.extend=function(i){var a=function(){y(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},u=a.__super__=this.prototype,b=o(u);b.constructor=a,a.prototype=b;for(var T in this)Object.prototype.hasOwnProperty.call(this,T)&&T!=="prototype"&&T!=="__super__"&&(a[T]=this[T]);return i.statics&&s(a,i.statics),i.includes&&(Z(i.includes),s.apply(null,[b].concat(i.includes))),s(b,i),delete b.statics,delete b.includes,b.options&&(b.options=u.options?o(u.options):{},s(b.options,i.options)),b._initHooks=[],b.callInitHooks=function(){if(!this._initHooksCalled){u.callInitHooks&&u.callInitHooks.call(this),this._initHooksCalled=!0;for(var z=0,Y=b._initHooks.length;z<Y;z++)b._initHooks[z].call(this)}},a},A.include=function(i){var a=this.prototype.options;return s(this.prototype,i),i.options&&(this.prototype.options=a,this.mergeOptions(i.options)),this},A.mergeOptions=function(i){return s(this.prototype.options,i),this},A.addInitHook=function(i){var a=Array.prototype.slice.call(arguments,1),u=typeof i=="function"?i:function(){this[i].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(u),this};function Z(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=M(i)?i:[i];for(var a=0;a<i.length;a++)i[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var at={on:function(i,a,u){if(typeof i=="object")for(var b in i)this._on(b,i[b],a);else{i=x(i);for(var T=0,z=i.length;T<z;T++)this._on(i[T],a,u)}return this},off:function(i,a,u){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var b in i)this._off(b,i[b],a);else{i=x(i);for(var T=arguments.length===1,z=0,Y=i.length;z<Y;z++)T?this._off(i[z]):this._off(i[z],a,u)}return this},_on:function(i,a,u,b){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(i,a,u)===!1){u===this&&(u=void 0);var T={fn:a,ctx:u};b&&(T.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(T)}},_off:function(i,a,u){var b,T,z;if(this._events&&(b=this._events[i],!!b)){if(arguments.length===1){if(this._firingCount)for(T=0,z=b.length;T<z;T++)b[T].fn=p;delete this._events[i];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var Y=this._listens(i,a,u);if(Y!==!1){var ht=b[Y];this._firingCount&&(ht.fn=p,this._events[i]=b=b.slice()),b.splice(Y,1)}}},fire:function(i,a,u){if(!this.listens(i,u))return this;var b=s({},a,{type:i,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var T=this._events[i];if(T){this._firingCount=this._firingCount+1||1;for(var z=0,Y=T.length;z<Y;z++){var ht=T[z],mt=ht.fn;ht.once&&this.off(i,mt,ht.ctx),mt.call(ht.ctx||this,b)}this._firingCount--}}return u&&this._propagateEvent(b),this},listens:function(i,a,u,b){typeof i!="string"&&console.warn('"string" type argument expected');var T=a;typeof a!="function"&&(b=!!a,T=void 0,u=void 0);var z=this._events&&this._events[i];if(z&&z.length&&this._listens(i,T,u)!==!1)return!0;if(b){for(var Y in this._eventParents)if(this._eventParents[Y].listens(i,a,u,b))return!0}return!1},_listens:function(i,a,u){if(!this._events)return!1;var b=this._events[i]||[];if(!a)return!!b.length;u===this&&(u=void 0);for(var T=0,z=b.length;T<z;T++)if(b[T].fn===a&&b[T].ctx===u)return T;return!1},once:function(i,a,u){if(typeof i=="object")for(var b in i)this._on(b,i[b],a,!0);else{i=x(i);for(var T=0,z=i.length;T<z;T++)this._on(i[T],a,u,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[h(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[h(i)],this},_propagateEvent:function(i){for(var a in this._eventParents)this._eventParents[a].fire(i.type,s({layer:i.target,propagatedFrom:i.target},i),!0)}};at.addEventListener=at.on,at.removeEventListener=at.clearAllEventListeners=at.off,at.addOneTimeEventListener=at.once,at.fireEvent=at.fire,at.hasEventListeners=at.listens;var ot=A.extend(at);function j(i,a,u){this.x=u?Math.round(i):i,this.y=u?Math.round(a):a}var st=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};j.prototype={clone:function(){return new j(this.x,this.y)},add:function(i){return this.clone()._add(rt(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(rt(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new j(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new j(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=st(this.x),this.y=st(this.y),this},distanceTo:function(i){i=rt(i);var a=i.x-this.x,u=i.y-this.y;return Math.sqrt(a*a+u*u)},equals:function(i){return i=rt(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=rt(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+_(this.x)+", "+_(this.y)+")"}};function rt(i,a,u){return i instanceof j?i:M(i)?new j(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new j(i.x,i.y):new j(i,a,u)}function q(i,a){if(i)for(var u=a?[i,a]:i,b=0,T=u.length;b<T;b++)this.extend(u[b])}q.prototype={extend:function(i){var a,u;if(!i)return this;if(i instanceof j||typeof i[0]=="number"||"x"in i)a=u=rt(i);else if(i=tt(i),a=i.min,u=i.max,!a||!u)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=u.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(u.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(u.y,this.max.y)),this},getCenter:function(i){return rt((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return rt(this.min.x,this.max.y)},getTopRight:function(){return rt(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var a,u;return typeof i[0]=="number"||i instanceof j?i=rt(i):i=tt(i),i instanceof q?(a=i.min,u=i.max):a=u=i,a.x>=this.min.x&&u.x<=this.max.x&&a.y>=this.min.y&&u.y<=this.max.y},intersects:function(i){i=tt(i);var a=this.min,u=this.max,b=i.min,T=i.max,z=T.x>=a.x&&b.x<=u.x,Y=T.y>=a.y&&b.y<=u.y;return z&&Y},overlaps:function(i){i=tt(i);var a=this.min,u=this.max,b=i.min,T=i.max,z=T.x>a.x&&b.x<u.x,Y=T.y>a.y&&b.y<u.y;return z&&Y},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var a=this.min,u=this.max,b=Math.abs(a.x-u.x)*i,T=Math.abs(a.y-u.y)*i;return tt(rt(a.x-b,a.y-T),rt(u.x+b,u.y+T))},equals:function(i){return i?(i=tt(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function tt(i,a){return!i||i instanceof q?i:new q(i,a)}function Lt(i,a){if(i)for(var u=a?[i,a]:i,b=0,T=u.length;b<T;b++)this.extend(u[b])}Lt.prototype={extend:function(i){var a=this._southWest,u=this._northEast,b,T;if(i instanceof nt)b=i,T=i;else if(i instanceof Lt){if(b=i._southWest,T=i._northEast,!b||!T)return this}else return i?this.extend(wt(i)||J(i)):this;return!a&&!u?(this._southWest=new nt(b.lat,b.lng),this._northEast=new nt(T.lat,T.lng)):(a.lat=Math.min(b.lat,a.lat),a.lng=Math.min(b.lng,a.lng),u.lat=Math.max(T.lat,u.lat),u.lng=Math.max(T.lng,u.lng)),this},pad:function(i){var a=this._southWest,u=this._northEast,b=Math.abs(a.lat-u.lat)*i,T=Math.abs(a.lng-u.lng)*i;return new Lt(new nt(a.lat-b,a.lng-T),new nt(u.lat+b,u.lng+T))},getCenter:function(){return new nt((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new nt(this.getNorth(),this.getWest())},getSouthEast:function(){return new nt(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof nt||"lat"in i?i=wt(i):i=J(i);var a=this._southWest,u=this._northEast,b,T;return i instanceof Lt?(b=i.getSouthWest(),T=i.getNorthEast()):b=T=i,b.lat>=a.lat&&T.lat<=u.lat&&b.lng>=a.lng&&T.lng<=u.lng},intersects:function(i){i=J(i);var a=this._southWest,u=this._northEast,b=i.getSouthWest(),T=i.getNorthEast(),z=T.lat>=a.lat&&b.lat<=u.lat,Y=T.lng>=a.lng&&b.lng<=u.lng;return z&&Y},overlaps:function(i){i=J(i);var a=this._southWest,u=this._northEast,b=i.getSouthWest(),T=i.getNorthEast(),z=T.lat>a.lat&&b.lat<u.lat,Y=T.lng>a.lng&&b.lng<u.lng;return z&&Y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,a){return i?(i=J(i),this._southWest.equals(i.getSouthWest(),a)&&this._northEast.equals(i.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function J(i,a){return i instanceof Lt?i:new Lt(i,a)}function nt(i,a,u){if(isNaN(i)||isNaN(a))throw new Error("Invalid LatLng object: ("+i+", "+a+")");this.lat=+i,this.lng=+a,u!==void 0&&(this.alt=+u)}nt.prototype={equals:function(i,a){if(!i)return!1;i=wt(i);var u=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return u<=(a===void 0?1e-9:a)},toString:function(i){return"LatLng("+_(this.lat,i)+", "+_(this.lng,i)+")"},distanceTo:function(i){return Pt.distance(this,wt(i))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(i){var a=180*i/40075017,u=a/Math.cos(Math.PI/180*this.lat);return J([this.lat-a,this.lng-u],[this.lat+a,this.lng+u])},clone:function(){return new nt(this.lat,this.lng,this.alt)}};function wt(i,a,u){return i instanceof nt?i:M(i)&&typeof i[0]!="object"?i.length===3?new nt(i[0],i[1],i[2]):i.length===2?new nt(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new nt(i.lat,"lng"in i?i.lng:i.lon,i.alt):a===void 0?null:new nt(i,a,u)}var St={latLngToPoint:function(i,a){var u=this.projection.project(i),b=this.scale(a);return this.transformation._transform(u,b)},pointToLatLng:function(i,a){var u=this.scale(a),b=this.transformation.untransform(i,u);return this.projection.unproject(b)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var a=this.projection.bounds,u=this.scale(i),b=this.transformation.transform(a.min,u),T=this.transformation.transform(a.max,u);return new q(b,T)},infinite:!1,wrapLatLng:function(i){var a=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,u=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,b=i.alt;return new nt(u,a,b)},wrapLatLngBounds:function(i){var a=i.getCenter(),u=this.wrapLatLng(a),b=a.lat-u.lat,T=a.lng-u.lng;if(b===0&&T===0)return i;var z=i.getSouthWest(),Y=i.getNorthEast(),ht=new nt(z.lat-b,z.lng-T),mt=new nt(Y.lat-b,Y.lng-T);return new Lt(ht,mt)}},Pt=s({},St,{wrapLng:[-180,180],R:6371e3,distance:function(i,a){var u=Math.PI/180,b=i.lat*u,T=a.lat*u,z=Math.sin((a.lat-i.lat)*u/2),Y=Math.sin((a.lng-i.lng)*u/2),ht=z*z+Math.cos(b)*Math.cos(T)*Y*Y,mt=2*Math.atan2(Math.sqrt(ht),Math.sqrt(1-ht));return this.R*mt}}),It=6378137,kt={R:It,MAX_LATITUDE:85.0511287798,project:function(i){var a=Math.PI/180,u=this.MAX_LATITUDE,b=Math.max(Math.min(u,i.lat),-u),T=Math.sin(b*a);return new j(this.R*i.lng*a,this.R*Math.log((1+T)/(1-T))/2)},unproject:function(i){var a=180/Math.PI;return new nt((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*a,i.x*a/this.R)},bounds:function(){var i=It*Math.PI;return new q([-i,-i],[i,i])}()};function it(i,a,u,b){if(M(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=a,this._c=u,this._d=b}it.prototype={transform:function(i,a){return this._transform(i.clone(),a)},_transform:function(i,a){return a=a||1,i.x=a*(this._a*i.x+this._b),i.y=a*(this._c*i.y+this._d),i},untransform:function(i,a){return a=a||1,new j((i.x/a-this._b)/this._a,(i.y/a-this._d)/this._c)}};function vt(i,a,u,b){return new it(i,a,u,b)}var xt=s({},Pt,{code:"EPSG:3857",projection:kt,transformation:function(){var i=.5/(Math.PI*kt.R);return vt(i,.5,-i,.5)}()}),E=s({},xt,{code:"EPSG:900913"});function et(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function $(i,a){var u="",b,T,z,Y,ht,mt;for(b=0,z=i.length;b<z;b++){for(ht=i[b],T=0,Y=ht.length;T<Y;T++)mt=ht[T],u+=(T?"L":"M")+mt.x+" "+mt.y;u+=a?Wt.svg?"z":"x":""}return u||"M0 0"}var C=document.documentElement.style,w="ActiveXObject"in window,B=w&&!document.addEventListener,X="msLaunchUri"in navigator&&!("documentMode"in document),K=He("webkit"),G=He("android"),ft=He("android 2")||He("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=G&&He("Google")&&lt<537&&!("AudioNode"in window),Tt=!!window.opera,Et=!X&&He("chrome"),At=He("gecko")&&!K&&!Tt&&!w,Ht=!Et&&He("safari"),zt=He("phantom"),Dt="OTransition"in C,Kt=navigator.platform.indexOf("Win")===0,Vt=w&&"transition"in C,oe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,ae="MozPerspective"in C,Qt=!window.L_DISABLE_3D&&(Vt||oe||ae)&&!Dt&&!zt,Ft=typeof orientation<"u"||He("mobile"),D=Ft&&K,ut=Ft&&oe,Mt=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||Mt),Nt="ontouchstart"in window||!!window.TouchEvent,re=!window.L_NO_TOUCH&&(Nt||Rt),he=Ft&&Tt,_e=Ft&&At,Ie=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,me=function(){var i=!1;try{var a=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",p,a),window.removeEventListener("testPassiveEventSupport",p,a)}catch{}return i}(),Ce=function(){return!!document.createElement("canvas").getContext}(),Se=!!(document.createElementNS&&et("svg").createSVGRect),nn=!!Se&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),un=!Se&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var a=i.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),Zn=navigator.platform.indexOf("Mac")===0,gi=navigator.platform.indexOf("Linux")===0;function He(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Wt={ie:w,ielt9:B,edge:X,webkit:K,android:G,android23:ft,androidStock:pt,opera:Tt,chrome:Et,gecko:At,safari:Ht,phantom:zt,opera12:Dt,win:Kt,ie3d:Vt,webkit3d:oe,gecko3d:ae,any3d:Qt,mobile:Ft,mobileWebkit:D,mobileWebkit3d:ut,msPointer:Mt,pointer:Rt,touch:re,touchNative:Nt,mobileOpera:he,mobileGecko:_e,retina:Ie,passiveEvents:me,canvas:Ce,svg:Se,vml:un,inlineSvg:nn,mac:Zn,linux:gi},ki=Wt.msPointer?"MSPointerDown":"pointerdown",es=Wt.msPointer?"MSPointerMove":"pointermove",ns=Wt.msPointer?"MSPointerUp":"pointerup",Zs=Wt.msPointer?"MSPointerCancel":"pointercancel",is={touchstart:ki,touchmove:es,touchend:ns,touchcancel:Zs},Xs={touchstart:te,touchmove:jt,touchend:jt,touchcancel:jt},V={},ct=!1;function gt(i,a,u){return a==="touchstart"&&qt(),Xs[a]?(u=Xs[a].bind(this,u),i.addEventListener(is[a],u,!1),u):(console.warn("wrong event specified:",a),p)}function _t(i,a,u){if(!is[a]){console.warn("wrong event specified:",a);return}i.removeEventListener(is[a],u,!1)}function dt(i){V[i.pointerId]=i}function Ut(i){V[i.pointerId]&&(V[i.pointerId]=i)}function Zt(i){delete V[i.pointerId]}function qt(){ct||(document.addEventListener(ki,dt,!0),document.addEventListener(es,Ut,!0),document.addEventListener(ns,Zt,!0),document.addEventListener(Zs,Zt,!0),ct=!0)}function jt(i,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var u in V)a.touches.push(V[u]);a.changedTouches=[a],i(a)}}function te(i,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&je(a),jt(i,a)}function Jt(i){var a={},u,b;for(b in i)u=i[b],a[b]=u&&u.bind?u.bind(i):u;return i=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var ee=200;function Ee(i,a){i.addEventListener("dblclick",a);var u=0,b;function T(z){if(z.detail!==1){b=z.detail;return}if(!(z.pointerType==="mouse"||z.sourceCapabilities&&!z.sourceCapabilities.firesTouchEvents)){var Y=xc(z);if(!(Y.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!Y.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ht=Date.now();ht-u<=ee?(b++,b===2&&a(Jt(z))):b=1,u=ht}}}return i.addEventListener("click",T),{dblclick:a,simDblclick:T}}function rn(i,a){i.removeEventListener("dblclick",a.dblclick),i.removeEventListener("click",a.simDblclick)}var Le=js(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),sn=js(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ve=sn==="webkitTransition"||sn==="OTransition"?sn+"End":"transitionend";function ne(i){return typeof i=="string"?document.getElementById(i):i}function ei(i,a){var u=i.style[a]||i.currentStyle&&i.currentStyle[a];if((!u||u==="auto")&&document.defaultView){var b=document.defaultView.getComputedStyle(i,null);u=b?b[a]:null}return u==="auto"?null:u}function Xt(i,a,u){var b=document.createElement(i);return b.className=a||"",u&&u.appendChild(b),b}function fe(i){var a=i.parentNode;a&&a.removeChild(i)}function zi(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Tn(i){var a=i.parentNode;a&&a.lastChild!==i&&a.appendChild(i)}function Xn(i){var a=i.parentNode;a&&a.firstChild!==i&&a.insertBefore(i,a.firstChild)}function De(i,a){if(i.classList!==void 0)return i.classList.contains(a);var u=_i(i);return u.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(u)}function Yt(i,a){if(i.classList!==void 0)for(var u=x(a),b=0,T=u.length;b<T;b++)i.classList.add(u[b]);else if(!De(i,a)){var z=_i(i);Ke(i,(z?z+" ":"")+a)}}function xe(i,a){i.classList!==void 0?i.classList.remove(a):Ke(i,m((" "+_i(i)+" ").replace(" "+a+" "," ")))}function Ke(i,a){i.className.baseVal===void 0?i.className=a:i.className.baseVal=a}function _i(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function dn(i,a){"opacity"in i.style?i.style.opacity=a:"filter"in i.style&&qs(i,a)}function qs(i,a){var u=!1,b="DXImageTransform.Microsoft.Alpha";try{u=i.filters.item(b)}catch{if(a===1)return}a=Math.round(a*100),u?(u.Enabled=a!==100,u.Opacity=a):i.style.filter+=" progid:"+b+"(opacity="+a+")"}function js(i){for(var a=document.documentElement.style,u=0;u<i.length;u++)if(i[u]in a)return i[u];return!1}function Bi(i,a,u){var b=a||new j(0,0);i.style[Le]=(Wt.ie3d?"translate("+b.x+"px,"+b.y+"px)":"translate3d("+b.x+"px,"+b.y+"px,0)")+(u?" scale("+u+")":"")}function Ne(i,a){i._leaflet_pos=a,Wt.any3d?Bi(i,a):(i.style.left=a.x+"px",i.style.top=a.y+"px")}function Fi(i){return i._leaflet_pos||new j(0,0)}var rs,ss,va;if("onselectstart"in document)rs=function(){se(window,"selectstart",je)},ss=function(){ye(window,"selectstart",je)};else{var os=js(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);rs=function(){if(os){var i=document.documentElement.style;va=i[os],i[os]="none"}},ss=function(){os&&(document.documentElement.style[os]=va,va=void 0)}}function ya(){se(window,"dragstart",je)}function xa(){ye(window,"dragstart",je)}var Ys,ba;function wa(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&($s(),Ys=i,ba=i.style.outlineStyle,i.style.outlineStyle="none",se(window,"keydown",$s))}function $s(){Ys&&(Ys.style.outlineStyle=ba,Ys=void 0,ba=void 0,ye(window,"keydown",$s))}function vc(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function Ma(i){var a=i.getBoundingClientRect();return{x:a.width/i.offsetWidth||1,y:a.height/i.offsetHeight||1,boundingClientRect:a}}var If={__proto__:null,TRANSFORM:Le,TRANSITION:sn,TRANSITION_END:ve,get:ne,getStyle:ei,create:Xt,remove:fe,empty:zi,toFront:Tn,toBack:Xn,hasClass:De,addClass:Yt,removeClass:xe,setClass:Ke,getClass:_i,setOpacity:dn,testProp:js,setTransform:Bi,setPosition:Ne,getPosition:Fi,get disableTextSelection(){return rs},get enableTextSelection(){return ss},disableImageDrag:ya,enableImageDrag:xa,preventOutline:wa,restoreOutline:$s,getSizedParentNode:vc,getScale:Ma};function se(i,a,u,b){if(a&&typeof a=="object")for(var T in a)Ea(i,T,a[T],u);else{a=x(a);for(var z=0,Y=a.length;z<Y;z++)Ea(i,a[z],u,b)}return this}var qn="_leaflet_events";function ye(i,a,u,b){if(arguments.length===1)yc(i),delete i[qn];else if(a&&typeof a=="object")for(var T in a)Ta(i,T,a[T],u);else if(a=x(a),arguments.length===2)yc(i,function(ht){return P(a,ht)!==-1});else for(var z=0,Y=a.length;z<Y;z++)Ta(i,a[z],u,b);return this}function yc(i,a){for(var u in i[qn]){var b=u.split(/\d/)[0];(!a||a(b))&&Ta(i,b,null,null,u)}}var Sa={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Ea(i,a,u,b){var T=a+h(u)+(b?"_"+h(b):"");if(i[qn]&&i[qn][T])return this;var z=function(ht){return u.call(b||i,ht||window.event)},Y=z;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?z=gt(i,a,z):Wt.touch&&a==="dblclick"?z=Ee(i,z):"addEventListener"in i?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?i.addEventListener(Sa[a]||a,z,Wt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(z=function(ht){ht=ht||window.event,Ca(i,ht)&&Y(ht)},i.addEventListener(Sa[a],z,!1)):i.addEventListener(a,Y,!1):i.attachEvent("on"+a,z),i[qn]=i[qn]||{},i[qn][T]=z}function Ta(i,a,u,b,T){T=T||a+h(u)+(b?"_"+h(b):"");var z=i[qn]&&i[qn][T];if(!z)return this;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?_t(i,a,z):Wt.touch&&a==="dblclick"?rn(i,z):"removeEventListener"in i?i.removeEventListener(Sa[a]||a,z,!1):i.detachEvent("on"+a,z),i[qn][T]=null}function Hi(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function Aa(i){return Ea(i,"wheel",Hi),this}function as(i){return se(i,"mousedown touchstart dblclick contextmenu",Hi),i._leaflet_disable_click=!0,this}function je(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function Vi(i){return je(i),Hi(i),this}function xc(i){if(i.composedPath)return i.composedPath();for(var a=[],u=i.target;u;)a.push(u),u=u.parentNode;return a}function bc(i,a){if(!a)return new j(i.clientX,i.clientY);var u=Ma(a),b=u.boundingClientRect;return new j((i.clientX-b.left)/u.x-a.clientLeft,(i.clientY-b.top)/u.y-a.clientTop)}var Df=Wt.linux&&Wt.chrome?window.devicePixelRatio:Wt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function wc(i){return Wt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/Df:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function Ca(i,a){var u=a.relatedTarget;if(!u)return!0;try{for(;u&&u!==i;)u=u.parentNode}catch{return!1}return u!==i}var Nf={__proto__:null,on:se,off:ye,stopPropagation:Hi,disableScrollPropagation:Aa,disableClickPropagation:as,preventDefault:je,stop:Vi,getPropagationPath:xc,getMousePosition:bc,getWheelDelta:wc,isExternalTarget:Ca,addListener:se,removeListener:ye},Mc=ot.extend({run:function(i,a,u,b){this.stop(),this._el=i,this._inProgress=!0,this._duration=u||.25,this._easeOutPower=1/Math.max(b||.5,.2),this._startPos=Fi(i),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=W(this._animate,this),this._step()},_step:function(i){var a=+new Date-this._startTime,u=this._duration*1e3;a<u?this._runFrame(this._easeOut(a/u),i):(this._runFrame(1),this._complete())},_runFrame:function(i,a){var u=this._startPos.add(this._offset.multiplyBy(i));a&&u._round(),Ne(this._el,u),this.fire("step")},_complete:function(){k(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),de=ot.extend({options:{crs:xt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,a){a=y(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(wt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=sn&&Wt.any3d&&!Wt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),se(this._proxy,ve,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,a,u){if(a=a===void 0?this._zoom:this._limitZoom(a),i=this._limitCenter(wt(i),a,this.options.maxBounds),u=u||{},this._stop(),this._loaded&&!u.reset&&u!==!0){u.animate!==void 0&&(u.zoom=s({animate:u.animate},u.zoom),u.pan=s({animate:u.animate,duration:u.duration},u.pan));var b=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,a,u.zoom):this._tryAnimatedPan(i,u.pan);if(b)return clearTimeout(this._sizeTimer),this}return this._resetView(i,a,u.pan&&u.pan.noMoveStart),this},setZoom:function(i,a){return this._loaded?this.setView(this.getCenter(),i,{zoom:a}):(this._zoom=i,this)},zoomIn:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,a)},zoomOut:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,a)},setZoomAround:function(i,a,u){var b=this.getZoomScale(a),T=this.getSize().divideBy(2),z=i instanceof j?i:this.latLngToContainerPoint(i),Y=z.subtract(T).multiplyBy(1-1/b),ht=this.containerPointToLatLng(T.add(Y));return this.setView(ht,a,{zoom:u})},_getBoundsCenterZoom:function(i,a){a=a||{},i=i.getBounds?i.getBounds():J(i);var u=rt(a.paddingTopLeft||a.padding||[0,0]),b=rt(a.paddingBottomRight||a.padding||[0,0]),T=this.getBoundsZoom(i,!1,u.add(b));if(T=typeof a.maxZoom=="number"?Math.min(a.maxZoom,T):T,T===1/0)return{center:i.getCenter(),zoom:T};var z=b.subtract(u).divideBy(2),Y=this.project(i.getSouthWest(),T),ht=this.project(i.getNorthEast(),T),mt=this.unproject(Y.add(ht).divideBy(2).add(z),T);return{center:mt,zoom:T}},fitBounds:function(i,a){if(i=J(i),!i.isValid())throw new Error("Bounds are not valid.");var u=this._getBoundsCenterZoom(i,a);return this.setView(u.center,u.zoom,a)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,a){return this.setView(i,this._zoom,{pan:a})},panBy:function(i,a){if(i=rt(i).round(),a=a||{},!i.x&&!i.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Mc,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){Yt(this._mapPane,"leaflet-pan-anim");var u=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,u,a.duration||.25,a.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,a,u){if(u=u||{},u.animate===!1||!Wt.any3d)return this.setView(i,a,u);this._stop();var b=this.project(this.getCenter()),T=this.project(i),z=this.getSize(),Y=this._zoom;i=wt(i),a=a===void 0?Y:a;var ht=Math.max(z.x,z.y),mt=ht*this.getZoomScale(Y,a),Ct=T.distanceTo(b)||1,Bt=1.42,$t=Bt*Bt;function ue(Oe){var lo=Oe?-1:1,wp=Oe?mt:ht,Mp=mt*mt-ht*ht+lo*$t*$t*Ct*Ct,Sp=2*wp*$t*Ct,Ba=Mp/Sp,ih=Math.sqrt(Ba*Ba+1)-Ba,Ep=ih<1e-9?-18:Math.log(ih);return Ep}function on(Oe){return(Math.exp(Oe)-Math.exp(-Oe))/2}function Ve(Oe){return(Math.exp(Oe)+Math.exp(-Oe))/2}function Cn(Oe){return on(Oe)/Ve(Oe)}var fn=ue(0);function mr(Oe){return ht*(Ve(fn)/Ve(fn+Bt*Oe))}function vp(Oe){return ht*(Ve(fn)*Cn(fn+Bt*Oe)-on(fn))/$t}function yp(Oe){return 1-Math.pow(1-Oe,1.5)}var xp=Date.now(),eh=(ue(1)-fn)/Bt,bp=u.duration?1e3*u.duration:1e3*eh*.8;function nh(){var Oe=(Date.now()-xp)/bp,lo=yp(Oe)*eh;Oe<=1?(this._flyToFrame=W(nh,this),this._move(this.unproject(b.add(T.subtract(b).multiplyBy(vp(lo)/Ct)),Y),this.getScaleZoom(ht/mr(lo),Y),{flyTo:!0})):this._move(i,a)._moveEnd(!0)}return this._moveStart(!0,u.noMoveStart),nh.call(this),this},flyToBounds:function(i,a){var u=this._getBoundsCenterZoom(i,a);return this.flyTo(u.center,u.zoom,a)},setMaxBounds:function(i){return i=J(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var a=this.options.minZoom;return this.options.minZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var a=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,a){this._enforcingBounds=!0;var u=this.getCenter(),b=this._limitCenter(u,this._zoom,J(i));return u.equals(b)||this.panTo(b,a),this._enforcingBounds=!1,this},panInside:function(i,a){a=a||{};var u=rt(a.paddingTopLeft||a.padding||[0,0]),b=rt(a.paddingBottomRight||a.padding||[0,0]),T=this.project(this.getCenter()),z=this.project(i),Y=this.getPixelBounds(),ht=tt([Y.min.add(u),Y.max.subtract(b)]),mt=ht.getSize();if(!ht.contains(z)){this._enforcingBounds=!0;var Ct=z.subtract(ht.getCenter()),Bt=ht.extend(z).getSize().subtract(mt);T.x+=Ct.x<0?-Bt.x:Bt.x,T.y+=Ct.y<0?-Bt.y:Bt.y,this.panTo(this.unproject(T),a),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=s({animate:!1,pan:!0},i===!0?{animate:!0}:i);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var u=this.getSize(),b=a.divideBy(2).round(),T=u.divideBy(2).round(),z=b.subtract(T);return!z.x&&!z.y?this:(i.animate&&i.pan?this.panBy(z):(i.pan&&this._rawPanBy(z),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:u}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=s({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),u=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,u,i):navigator.geolocation.getCurrentPosition(a,u,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var a=i.code,u=i.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+u+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var a=i.coords.latitude,u=i.coords.longitude,b=new nt(a,u),T=b.toBounds(i.coords.accuracy*2),z=this._locateOptions;if(z.setView){var Y=this.getBoundsZoom(T);this.setView(b,z.maxZoom?Math.min(Y,z.maxZoom):Y)}var ht={latlng:b,bounds:T,timestamp:i.timestamp};for(var mt in i.coords)typeof i.coords[mt]=="number"&&(ht[mt]=i.coords[mt]);this.fire("locationfound",ht)}},addHandler:function(i,a){if(!a)return this;var u=this[i]=new a(this);return this._handlers.push(u),this.options[i]&&u.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),fe(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(k(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)fe(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,a){var u="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),b=Xt("div",u,a||this._mapPane);return i&&(this._panes[i]=b),b},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),a=this.unproject(i.getBottomLeft()),u=this.unproject(i.getTopRight());return new Lt(a,u)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,a,u){i=J(i),u=rt(u||[0,0]);var b=this.getZoom()||0,T=this.getMinZoom(),z=this.getMaxZoom(),Y=i.getNorthWest(),ht=i.getSouthEast(),mt=this.getSize().subtract(u),Ct=tt(this.project(ht,b),this.project(Y,b)).getSize(),Bt=Wt.any3d?this.options.zoomSnap:1,$t=mt.x/Ct.x,ue=mt.y/Ct.y,on=a?Math.max($t,ue):Math.min($t,ue);return b=this.getScaleZoom(on,b),Bt&&(b=Math.round(b/(Bt/100))*(Bt/100),b=a?Math.ceil(b/Bt)*Bt:Math.floor(b/Bt)*Bt),Math.max(T,Math.min(z,b))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new j(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,a){var u=this._getTopLeftPoint(i,a);return new q(u,u.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,a){var u=this.options.crs;return a=a===void 0?this._zoom:a,u.scale(i)/u.scale(a)},getScaleZoom:function(i,a){var u=this.options.crs;a=a===void 0?this._zoom:a;var b=u.zoom(i*u.scale(a));return isNaN(b)?1/0:b},project:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(wt(i),a)},unproject:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(rt(i),a)},layerPointToLatLng:function(i){var a=rt(i).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(i){var a=this.project(wt(i))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(wt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(J(i))},distance:function(i,a){return this.options.crs.distance(wt(i),wt(a))},containerPointToLayerPoint:function(i){return rt(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return rt(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var a=this.containerPointToLayerPoint(rt(i));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(wt(i)))},mouseEventToContainerPoint:function(i){return bc(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var a=this._container=ne(i);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");se(a,"scroll",this._onScroll,this),this._containerId=h(a)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Wt.any3d,Yt(i,"leaflet-container"+(Wt.touch?" leaflet-touch":"")+(Wt.retina?" leaflet-retina":"")+(Wt.ielt9?" leaflet-oldie":"")+(Wt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=ei(i,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),Ne(this._mapPane,new j(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Yt(i.markerPane,"leaflet-zoom-hide"),Yt(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,a,u){Ne(this._mapPane,new j(0,0));var b=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var T=this._zoom!==a;this._moveStart(T,u)._move(i,a)._moveEnd(T),this.fire("viewreset"),b&&this.fire("load")},_moveStart:function(i,a){return i&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(i,a,u,b){a===void 0&&(a=this._zoom);var T=this._zoom!==a;return this._zoom=a,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),b?u&&u.pinch&&this.fire("zoom",u):((T||u&&u.pinch)&&this.fire("zoom",u),this.fire("move",u)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return k(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){Ne(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[h(this._container)]=this;var a=i?ye:se;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Wt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){k(this._resizeRequest),this._resizeRequest=W(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,a){for(var u=[],b,T=a==="mouseout"||a==="mouseover",z=i.target||i.srcElement,Y=!1;z;){if(b=this._targets[h(z)],b&&(a==="click"||a==="preclick")&&this._draggableMoved(b)){Y=!0;break}if(b&&b.listens(a,!0)&&(T&&!Ca(z,i)||(u.push(b),T))||z===this._container)break;z=z.parentNode}return!u.length&&!Y&&!T&&this.listens(a,!0)&&(u=[this]),u},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var a=i.target||i.srcElement;if(!(!this._loaded||a._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(a))){var u=i.type;u==="mousedown"&&wa(a),this._fireDOMEvent(i,u)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,a,u){if(i.type==="click"){var b=s({},i);b.type="preclick",this._fireDOMEvent(b,b.type,u)}var T=this._findEventTargets(i,a);if(u){for(var z=[],Y=0;Y<u.length;Y++)u[Y].listens(a,!0)&&z.push(u[Y]);T=z.concat(T)}if(T.length){a==="contextmenu"&&je(i);var ht=T[0],mt={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var Ct=ht.getLatLng&&(!ht._radius||ht._radius<=10);mt.containerPoint=Ct?this.latLngToContainerPoint(ht.getLatLng()):this.mouseEventToContainerPoint(i),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=Ct?ht.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for(Y=0;Y<T.length;Y++)if(T[Y].fire(a,mt,!0),mt.originalEvent._stopped||T[Y].options.bubblingMouseEvents===!1&&P(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,a=this._handlers.length;i<a;i++)this._handlers[i].disable()},whenReady:function(i,a){return this._loaded?i.call(a||this,{target:this}):this.on("load",i,a),this},_getMapPanePos:function(){return Fi(this._mapPane)||new j(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,a){var u=i&&a!==void 0?this._getNewPixelOrigin(i,a):this.getPixelOrigin();return u.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,a){var u=this.getSize()._divideBy(2);return this.project(i,a)._subtract(u)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,a,u){var b=this._getNewPixelOrigin(u,a);return this.project(i,a)._subtract(b)},_latLngBoundsToNewLayerBounds:function(i,a,u){var b=this._getNewPixelOrigin(u,a);return tt([this.project(i.getSouthWest(),a)._subtract(b),this.project(i.getNorthWest(),a)._subtract(b),this.project(i.getSouthEast(),a)._subtract(b),this.project(i.getNorthEast(),a)._subtract(b)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,a,u){if(!u)return i;var b=this.project(i,a),T=this.getSize().divideBy(2),z=new q(b.subtract(T),b.add(T)),Y=this._getBoundsOffset(z,u,a);return Math.abs(Y.x)<=1&&Math.abs(Y.y)<=1?i:this.unproject(b.add(Y),a)},_limitOffset:function(i,a){if(!a)return i;var u=this.getPixelBounds(),b=new q(u.min.add(i),u.max.add(i));return i.add(this._getBoundsOffset(b,a))},_getBoundsOffset:function(i,a,u){var b=tt(this.project(a.getNorthEast(),u),this.project(a.getSouthWest(),u)),T=b.min.subtract(i.min),z=b.max.subtract(i.max),Y=this._rebound(T.x,-z.x),ht=this._rebound(T.y,-z.y);return new j(Y,ht)},_rebound:function(i,a){return i+a>0?Math.round(i-a)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(a))},_limitZoom:function(i){var a=this.getMinZoom(),u=this.getMaxZoom(),b=Wt.any3d?this.options.zoomSnap:1;return b&&(i=Math.round(i/b)*b),Math.max(a,Math.min(u,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){xe(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,a){var u=this._getCenterOffset(i)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(u)?!1:(this.panBy(u,a),!0)},_createAnimProxy:function(){var i=this._proxy=Xt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(a){var u=Le,b=this._proxy.style[u];Bi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),b===this._proxy.style[u]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){fe(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),a=this.getZoom();Bi(this._proxy,this.project(i,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,a,u){if(this._animatingZoom)return!0;if(u=u||{},!this._zoomAnimated||u.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var b=this.getZoomScale(a),T=this._getCenterOffset(i)._divideBy(1-1/b);return u.animate!==!0&&!this.getSize().contains(T)?!1:(W(function(){this._moveStart(!0,u.noMoveStart||!1)._animateZoom(i,a,!0)},this),!0)},_animateZoom:function(i,a,u,b){this._mapPane&&(u&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=a,Yt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:a,noUpdate:b}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&xe(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function Of(i,a){return new de(i,a)}var In=A.extend({options:{position:"topright"},initialize:function(i){y(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var a=this._map;return a&&a.removeControl(this),this.options.position=i,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var a=this._container=this.onAdd(i),u=this.getPosition(),b=i._controlCorners[u];return Yt(a,"leaflet-control"),u.indexOf("bottom")!==-1?b.insertBefore(a,b.firstChild):b.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(fe(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),ls=function(i){return new In(i)};de.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},a="leaflet-",u=this._controlContainer=Xt("div",a+"control-container",this._container);function b(T,z){var Y=a+T+" "+a+z;i[T+z]=Xt("div",Y,u)}b("top","left"),b("top","right"),b("bottom","left"),b("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)fe(this._controlCorners[i]);fe(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Sc=In.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,a,u,b){return u<b?-1:b<u?1:0}},initialize:function(i,a,u){y(this,u),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var b in i)this._addLayer(i[b],b);for(b in a)this._addLayer(a[b],b,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return In.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,a){return this._addLayer(i,a),this._map?this._update():this},addOverlay:function(i,a){return this._addLayer(i,a,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var a=this._getLayer(h(i));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){Yt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?(Yt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):xe(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return xe(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",a=this._container=Xt("div",i),u=this.options.collapsed;a.setAttribute("aria-haspopup",!0),as(a),Aa(a);var b=this._section=Xt("section",i+"-list");u&&(this._map.on("click",this.collapse,this),se(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var T=this._layersLink=Xt("a",i+"-toggle",a);T.href="#",T.title="Layers",T.setAttribute("role","button"),se(T,{keydown:function(z){z.keyCode===13&&this._expandSafely()},click:function(z){je(z),this._expandSafely()}},this),u||this.expand(),this._baseLayersList=Xt("div",i+"-base",b),this._separator=Xt("div",i+"-separator",b),this._overlaysList=Xt("div",i+"-overlays",b),a.appendChild(b)},_getLayer:function(i){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&h(this._layers[a].layer)===i)return this._layers[a]},_addLayer:function(i,a,u){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:a,overlay:u}),this.options.sortLayers&&this._layers.sort(l(function(b,T){return this.options.sortFunction(b.layer,T.layer,b.name,T.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;zi(this._baseLayersList),zi(this._overlaysList),this._layerControlInputs=[];var i,a,u,b,T=0;for(u=0;u<this._layers.length;u++)b=this._layers[u],this._addItem(b),a=a||b.overlay,i=i||!b.overlay,T+=b.overlay?0:1;return this.options.hideSingleBase&&(i=i&&T>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=a&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var a=this._getLayer(h(i.target)),u=a.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;u&&this._map.fire(u,a)},_createRadioElement:function(i,a){var u='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(a?' checked="checked"':"")+"/>",b=document.createElement("div");return b.innerHTML=u,b.firstChild},_addItem:function(i){var a=document.createElement("label"),u=this._map.hasLayer(i.layer),b;i.overlay?(b=document.createElement("input"),b.type="checkbox",b.className="leaflet-control-layers-selector",b.defaultChecked=u):b=this._createRadioElement("leaflet-base-layers_"+h(this),u),this._layerControlInputs.push(b),b.layerId=h(i.layer),se(b,"click",this._onInputClick,this);var T=document.createElement("span");T.innerHTML=" "+i.name;var z=document.createElement("span");a.appendChild(z),z.appendChild(b),z.appendChild(T);var Y=i.overlay?this._overlaysList:this._baseLayersList;return Y.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,a,u,b=[],T=[];this._handlingClick=!0;for(var z=i.length-1;z>=0;z--)a=i[z],u=this._getLayer(a.layerId).layer,a.checked?b.push(u):a.checked||T.push(u);for(z=0;z<T.length;z++)this._map.hasLayer(T[z])&&this._map.removeLayer(T[z]);for(z=0;z<b.length;z++)this._map.hasLayer(b[z])||this._map.addLayer(b[z]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,a,u,b=this._map.getZoom(),T=i.length-1;T>=0;T--)a=i[T],u=this._getLayer(a.layerId).layer,a.disabled=u.options.minZoom!==void 0&&b<u.options.minZoom||u.options.maxZoom!==void 0&&b>u.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,se(i,"click",je),this.expand();var a=this;setTimeout(function(){ye(i,"click",je),a._preventClick=!1})}}),Uf=function(i,a,u){return new Sc(i,a,u)},La=In.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var a="leaflet-control-zoom",u=Xt("div",a+" leaflet-bar"),b=this.options;return this._zoomInButton=this._createButton(b.zoomInText,b.zoomInTitle,a+"-in",u,this._zoomIn),this._zoomOutButton=this._createButton(b.zoomOutText,b.zoomOutTitle,a+"-out",u,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),u},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,a,u,b,T){var z=Xt("a",u,b);return z.innerHTML=i,z.href="#",z.title=a,z.setAttribute("role","button"),z.setAttribute("aria-label",a),as(z),se(z,"click",Vi),se(z,"click",T,this),se(z,"click",this._refocusOnMap,this),z},_updateDisabled:function(){var i=this._map,a="leaflet-disabled";xe(this._zoomInButton,a),xe(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&(Yt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&(Yt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});de.mergeOptions({zoomControl:!0}),de.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new La,this.addControl(this.zoomControl))});var kf=function(i){return new La(i)},Ec=In.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var a="leaflet-control-scale",u=Xt("div",a),b=this.options;return this._addScales(b,a+"-line",u),i.on(b.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),u},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,a,u){i.metric&&(this._mScale=Xt("div",a,u)),i.imperial&&(this._iScale=Xt("div",a,u))},_update:function(){var i=this._map,a=i.getSize().y/2,u=i.distance(i.containerPointToLatLng([0,a]),i.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(u)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var a=this._getRoundNum(i),u=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,u,a/i)},_updateImperial:function(i){var a=i*3.2808399,u,b,T;a>5280?(u=a/5280,b=this._getRoundNum(u),this._updateScale(this._iScale,b+" mi",b/u)):(T=this._getRoundNum(a),this._updateScale(this._iScale,T+" ft",T/a))},_updateScale:function(i,a,u){i.style.width=Math.round(this.options.maxWidth*u)+"px",i.innerHTML=a},_getRoundNum:function(i){var a=Math.pow(10,(Math.floor(i)+"").length-1),u=i/a;return u=u>=10?10:u>=5?5:u>=3?3:u>=2?2:1,a*u}}),zf=function(i){return new Ec(i)},Bf='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Pa=In.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Wt.inlineSvg?Bf+" ":"")+"Leaflet</a>"},initialize:function(i){y(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Xt("div","leaflet-control-attribution"),as(this._container);for(var a in i._layers)i._layers[a].getAttribution&&this.addAttribution(i._layers[a].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var a in this._attributions)this._attributions[a]&&i.push(a);var u=[];this.options.prefix&&u.push(this.options.prefix),i.length&&u.push(i.join(", ")),this._container.innerHTML=u.join(' <span aria-hidden="true">|</span> ')}}});de.mergeOptions({attributionControl:!0}),de.addInitHook(function(){this.options.attributionControl&&new Pa().addTo(this)});var Ff=function(i){return new Pa(i)};In.Layers=Sc,In.Zoom=La,In.Scale=Ec,In.Attribution=Pa,ls.layers=Uf,ls.zoom=kf,ls.scale=zf,ls.attribution=Ff;var jn=A.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});jn.addTo=function(i,a){return i.addHandler(a,this),this};var Hf={Events:at},Tc=Wt.touch?"touchstart mousedown":"mousedown",vi=ot.extend({options:{clickTolerance:3},initialize:function(i,a,u,b){y(this,b),this._element=i,this._dragStartTarget=a||i,this._preventOutline=u},enable:function(){this._enabled||(se(this._dragStartTarget,Tc,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(vi._dragging===this&&this.finishDrag(!0),ye(this._dragStartTarget,Tc,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!De(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){vi._dragging===this&&this.finishDrag();return}if(!(vi._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(vi._dragging=this,this._preventOutline&&wa(this._element),ya(),rs(),!this._moving)){this.fire("down");var a=i.touches?i.touches[0]:i,u=vc(this._element);this._startPoint=new j(a.clientX,a.clientY),this._startPos=Fi(this._element),this._parentScale=Ma(u);var b=i.type==="mousedown";se(document,b?"mousemove":"touchmove",this._onMove,this),se(document,b?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var a=i.touches&&i.touches.length===1?i.touches[0]:i,u=new j(a.clientX,a.clientY)._subtract(this._startPoint);!u.x&&!u.y||Math.abs(u.x)+Math.abs(u.y)<this.options.clickTolerance||(u.x/=this._parentScale.x,u.y/=this._parentScale.y,je(i),this._moved||(this.fire("dragstart"),this._moved=!0,Yt(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Yt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(u),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),Ne(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){xe(document.body,"leaflet-dragging"),this._lastTarget&&(xe(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),ye(document,"mousemove touchmove",this._onMove,this),ye(document,"mouseup touchend touchcancel",this._onUp,this),xa(),ss();var a=this._moved&&this._moving;this._moving=!1,vi._dragging=!1,a&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function Ac(i,a,u){var b,T=[1,4,2,8],z,Y,ht,mt,Ct,Bt,$t,ue;for(z=0,Bt=i.length;z<Bt;z++)i[z]._code=Gi(i[z],a);for(ht=0;ht<4;ht++){for($t=T[ht],b=[],z=0,Bt=i.length,Y=Bt-1;z<Bt;Y=z++)mt=i[z],Ct=i[Y],mt._code&$t?Ct._code&$t||(ue=Ks(Ct,mt,$t,a,u),ue._code=Gi(ue,a),b.push(ue)):(Ct._code&$t&&(ue=Ks(Ct,mt,$t,a,u),ue._code=Gi(ue,a),b.push(ue)),b.push(mt));i=b}return i}function Cc(i,a){var u,b,T,z,Y,ht,mt,Ct,Bt;if(!i||i.length===0)throw new Error("latlngs not passed");An(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var $t=wt([0,0]),ue=J(i),on=ue.getNorthWest().distanceTo(ue.getSouthWest())*ue.getNorthEast().distanceTo(ue.getNorthWest());on<1700&&($t=Ra(i));var Ve=i.length,Cn=[];for(u=0;u<Ve;u++){var fn=wt(i[u]);Cn.push(a.project(wt([fn.lat-$t.lat,fn.lng-$t.lng])))}for(ht=mt=Ct=0,u=0,b=Ve-1;u<Ve;b=u++)T=Cn[u],z=Cn[b],Y=T.y*z.x-z.y*T.x,mt+=(T.x+z.x)*Y,Ct+=(T.y+z.y)*Y,ht+=Y*3;ht===0?Bt=Cn[0]:Bt=[mt/ht,Ct/ht];var mr=a.unproject(rt(Bt));return wt([mr.lat+$t.lat,mr.lng+$t.lng])}function Ra(i){for(var a=0,u=0,b=0,T=0;T<i.length;T++){var z=wt(i[T]);a+=z.lat,u+=z.lng,b++}return wt([a/b,u/b])}var Vf={__proto__:null,clipPolygon:Ac,polygonCenter:Cc,centroid:Ra};function Lc(i,a){if(!a||!i.length)return i.slice();var u=a*a;return i=Zf(i,u),i=Wf(i,u),i}function Pc(i,a,u){return Math.sqrt(cs(i,a,u,!0))}function Gf(i,a,u){return cs(i,a,u)}function Wf(i,a){var u=i.length,b=typeof Uint8Array<"u"?Uint8Array:Array,T=new b(u);T[0]=T[u-1]=1,Ia(i,T,a,0,u-1);var z,Y=[];for(z=0;z<u;z++)T[z]&&Y.push(i[z]);return Y}function Ia(i,a,u,b,T){var z=0,Y,ht,mt;for(ht=b+1;ht<=T-1;ht++)mt=cs(i[ht],i[b],i[T],!0),mt>z&&(Y=ht,z=mt);z>u&&(a[Y]=1,Ia(i,a,u,b,Y),Ia(i,a,u,Y,T))}function Zf(i,a){for(var u=[i[0]],b=1,T=0,z=i.length;b<z;b++)Xf(i[b],i[T])>a&&(u.push(i[b]),T=b);return T<z-1&&u.push(i[z-1]),u}var Rc;function Ic(i,a,u,b,T){var z=b?Rc:Gi(i,u),Y=Gi(a,u),ht,mt,Ct;for(Rc=Y;;){if(!(z|Y))return[i,a];if(z&Y)return!1;ht=z||Y,mt=Ks(i,a,ht,u,T),Ct=Gi(mt,u),ht===z?(i=mt,z=Ct):(a=mt,Y=Ct)}}function Ks(i,a,u,b,T){var z=a.x-i.x,Y=a.y-i.y,ht=b.min,mt=b.max,Ct,Bt;return u&8?(Ct=i.x+z*(mt.y-i.y)/Y,Bt=mt.y):u&4?(Ct=i.x+z*(ht.y-i.y)/Y,Bt=ht.y):u&2?(Ct=mt.x,Bt=i.y+Y*(mt.x-i.x)/z):u&1&&(Ct=ht.x,Bt=i.y+Y*(ht.x-i.x)/z),new j(Ct,Bt,T)}function Gi(i,a){var u=0;return i.x<a.min.x?u|=1:i.x>a.max.x&&(u|=2),i.y<a.min.y?u|=4:i.y>a.max.y&&(u|=8),u}function Xf(i,a){var u=a.x-i.x,b=a.y-i.y;return u*u+b*b}function cs(i,a,u,b){var T=a.x,z=a.y,Y=u.x-T,ht=u.y-z,mt=Y*Y+ht*ht,Ct;return mt>0&&(Ct=((i.x-T)*Y+(i.y-z)*ht)/mt,Ct>1?(T=u.x,z=u.y):Ct>0&&(T+=Y*Ct,z+=ht*Ct)),Y=i.x-T,ht=i.y-z,b?Y*Y+ht*ht:new j(T,z)}function An(i){return!M(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function Dc(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),An(i)}function Nc(i,a){var u,b,T,z,Y,ht,mt,Ct;if(!i||i.length===0)throw new Error("latlngs not passed");An(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Bt=wt([0,0]),$t=J(i),ue=$t.getNorthWest().distanceTo($t.getSouthWest())*$t.getNorthEast().distanceTo($t.getNorthWest());ue<1700&&(Bt=Ra(i));var on=i.length,Ve=[];for(u=0;u<on;u++){var Cn=wt(i[u]);Ve.push(a.project(wt([Cn.lat-Bt.lat,Cn.lng-Bt.lng])))}for(u=0,b=0;u<on-1;u++)b+=Ve[u].distanceTo(Ve[u+1])/2;if(b===0)Ct=Ve[0];else for(u=0,z=0;u<on-1;u++)if(Y=Ve[u],ht=Ve[u+1],T=Y.distanceTo(ht),z+=T,z>b){mt=(z-b)/T,Ct=[ht.x-mt*(ht.x-Y.x),ht.y-mt*(ht.y-Y.y)];break}var fn=a.unproject(rt(Ct));return wt([fn.lat+Bt.lat,fn.lng+Bt.lng])}var qf={__proto__:null,simplify:Lc,pointToSegmentDistance:Pc,closestPointOnSegment:Gf,clipSegment:Ic,_getEdgeIntersection:Ks,_getBitCode:Gi,_sqClosestPointOnSegment:cs,isFlat:An,_flat:Dc,polylineCenter:Nc},Da={project:function(i){return new j(i.lng,i.lat)},unproject:function(i){return new nt(i.y,i.x)},bounds:new q([-180,-90],[180,90])},Na={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var a=Math.PI/180,u=this.R,b=i.lat*a,T=this.R_MINOR/u,z=Math.sqrt(1-T*T),Y=z*Math.sin(b),ht=Math.tan(Math.PI/4-b/2)/Math.pow((1-Y)/(1+Y),z/2);return b=-u*Math.log(Math.max(ht,1e-10)),new j(i.lng*a*u,b)},unproject:function(i){for(var a=180/Math.PI,u=this.R,b=this.R_MINOR/u,T=Math.sqrt(1-b*b),z=Math.exp(-i.y/u),Y=Math.PI/2-2*Math.atan(z),ht=0,mt=.1,Ct;ht<15&&Math.abs(mt)>1e-7;ht++)Ct=T*Math.sin(Y),Ct=Math.pow((1-Ct)/(1+Ct),T/2),mt=Math.PI/2-2*Math.atan(z*Ct)-Y,Y+=mt;return new nt(Y*a,i.x*a/u)}},jf={__proto__:null,LonLat:Da,Mercator:Na,SphericalMercator:kt},Yf=s({},Pt,{code:"EPSG:3395",projection:Na,transformation:function(){var i=.5/(Math.PI*Na.R);return vt(i,.5,-i,.5)}()}),Oc=s({},Pt,{code:"EPSG:4326",projection:Da,transformation:vt(1/180,1,-1/180,.5)}),$f=s({},St,{projection:Da,transformation:vt(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,a){var u=a.lng-i.lng,b=a.lat-i.lat;return Math.sqrt(u*u+b*b)},infinite:!0});St.Earth=Pt,St.EPSG3395=Yf,St.EPSG3857=xt,St.EPSG900913=E,St.EPSG4326=Oc,St.Simple=$f;var Dn=ot.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[h(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[h(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var a=i.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var u=this.getEvents();a.on(u,this),this.once("remove",function(){a.off(u,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});de.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var a=h(i);return this._layers[a]?this:(this._layers[a]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var a=h(i);return this._layers[a]?(this._loaded&&i.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return h(i)in this._layers},eachLayer:function(i,a){for(var u in this._layers)i.call(a,this._layers[u]);return this},_addLayers:function(i){i=i?M(i)?i:[i]:[];for(var a=0,u=i.length;a<u;a++)this.addLayer(i[a])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[h(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var a=h(i);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,a=-1/0,u=this._getZoomSpan();for(var b in this._zoomBoundLayers){var T=this._zoomBoundLayers[b].options;i=T.minZoom===void 0?i:Math.min(i,T.minZoom),a=T.maxZoom===void 0?a:Math.max(a,T.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=i===1/0?void 0:i,u!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var hr=Dn.extend({initialize:function(i,a){y(this,a),this._layers={};var u,b;if(i)for(u=0,b=i.length;u<b;u++)this.addLayer(i[u])},addLayer:function(i){var a=this.getLayerId(i);return this._layers[a]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var a=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(i){var a=typeof i=="number"?i:this.getLayerId(i);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var a=Array.prototype.slice.call(arguments,1),u,b;for(u in this._layers)b=this._layers[u],b[i]&&b[i].apply(b,a);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,a){for(var u in this._layers)i.call(a,this._layers[u]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return h(i)}}),Kf=function(i,a){return new hr(i,a)},ni=hr.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),hr.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),hr.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new Lt;for(var a in this._layers){var u=this._layers[a];i.extend(u.getBounds?u.getBounds():u.getLatLng())}return i}}),Jf=function(i,a){return new ni(i,a)},ur=A.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){y(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,a){var u=this._getIconUrl(i);if(!u){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var b=this._createImg(u,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(b,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(b.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),b},_setIconStyles:function(i,a){var u=this.options,b=u[a+"Size"];typeof b=="number"&&(b=[b,b]);var T=rt(b),z=rt(a==="shadow"&&u.shadowAnchor||u.iconAnchor||T&&T.divideBy(2,!0));i.className="leaflet-marker-"+a+" "+(u.className||""),z&&(i.style.marginLeft=-z.x+"px",i.style.marginTop=-z.y+"px"),T&&(i.style.width=T.x+"px",i.style.height=T.y+"px")},_createImg:function(i,a){return a=a||document.createElement("img"),a.src=i,a},_getIconUrl:function(i){return Wt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function Qf(i){return new ur(i)}var hs=ur.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof hs.imagePath!="string"&&(hs.imagePath=this._detectIconPath()),(this.options.imagePath||hs.imagePath)+ur.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var a=function(u,b,T){var z=b.exec(u);return z&&z[T]};return i=a(i,/^url\((['"])?(.+)\1\)$/,2),i&&a(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Xt("div","leaflet-default-icon-path",document.body),a=ei(i,"background-image")||ei(i,"backgroundImage");if(document.body.removeChild(i),a=this._stripUrl(a),a)return a;var u=document.querySelector('link[href$="leaflet.css"]');return u?u.href.substring(0,u.href.length-11-1):""}}),Uc=jn.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new vi(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Yt(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&xe(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var a=this._marker,u=a._map,b=this._marker.options.autoPanSpeed,T=this._marker.options.autoPanPadding,z=Fi(a._icon),Y=u.getPixelBounds(),ht=u.getPixelOrigin(),mt=tt(Y.min._subtract(ht).add(T),Y.max._subtract(ht).subtract(T));if(!mt.contains(z)){var Ct=rt((Math.max(mt.max.x,z.x)-mt.max.x)/(Y.max.x-mt.max.x)-(Math.min(mt.min.x,z.x)-mt.min.x)/(Y.min.x-mt.min.x),(Math.max(mt.max.y,z.y)-mt.max.y)/(Y.max.y-mt.max.y)-(Math.min(mt.min.y,z.y)-mt.min.y)/(Y.min.y-mt.min.y)).multiplyBy(b);u.panBy(Ct,{animate:!1}),this._draggable._newPos._add(Ct),this._draggable._startPos._add(Ct),Ne(a._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=W(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(k(this._panRequest),this._panRequest=W(this._adjustPan.bind(this,i)))},_onDrag:function(i){var a=this._marker,u=a._shadow,b=Fi(a._icon),T=a._map.layerPointToLatLng(b);u&&Ne(u,b),a._latlng=T,i.latlng=T,i.oldLatLng=this._oldLatLng,a.fire("move",i).fire("drag",i)},_onDragEnd:function(i){k(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),Js=Dn.extend({options:{icon:new hs,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,a){y(this,a),this._latlng=wt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),u=i.icon.createIcon(this._icon),b=!1;u!==this._icon&&(this._icon&&this._removeIcon(),b=!0,i.title&&(u.title=i.title),u.tagName==="IMG"&&(u.alt=i.alt||"")),Yt(u,a),i.keyboard&&(u.tabIndex="0",u.setAttribute("role","button")),this._icon=u,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&se(u,"focus",this._panOnFocus,this);var T=i.icon.createShadow(this._shadow),z=!1;T!==this._shadow&&(this._removeShadow(),z=!0),T&&(Yt(T,a),T.alt=""),this._shadow=T,i.opacity<1&&this._updateOpacity(),b&&this.getPane().appendChild(this._icon),this._initInteraction(),T&&z&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&ye(this._icon,"focus",this._panOnFocus,this),fe(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&fe(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&Ne(this._icon,i),this._shadow&&Ne(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&(Yt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Uc)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Uc(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&dn(this._icon,i),this._shadow&&dn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var a=this.options.icon.options,u=a.iconSize?rt(a.iconSize):rt(0,0),b=a.iconAnchor?rt(a.iconAnchor):rt(0,0);i.panInside(this._latlng,{paddingTopLeft:b,paddingBottomRight:u.subtract(b)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function tp(i,a){return new Js(i,a)}var yi=Dn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return y(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Qs=yi.extend({options:{fill:!0,radius:10},initialize:function(i,a){y(this,a),this._latlng=wt(i),this._radius=this.options.radius},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var a=i&&i.radius||this._radius;return yi.prototype.setStyle.call(this,i),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,a=this._radiusY||i,u=this._clickTolerance(),b=[i+u,a+u];this._pxBounds=new q(this._point.subtract(b),this._point.add(b))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function ep(i,a){return new Qs(i,a)}var Oa=Qs.extend({initialize:function(i,a,u){if(typeof a=="number"&&(a=s({},u,{radius:a})),y(this,a),this._latlng=wt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new Lt(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:yi.prototype.setStyle,_project:function(){var i=this._latlng.lng,a=this._latlng.lat,u=this._map,b=u.options.crs;if(b.distance===Pt.distance){var T=Math.PI/180,z=this._mRadius/Pt.R/T,Y=u.project([a+z,i]),ht=u.project([a-z,i]),mt=Y.add(ht).divideBy(2),Ct=u.unproject(mt).lat,Bt=Math.acos((Math.cos(z*T)-Math.sin(a*T)*Math.sin(Ct*T))/(Math.cos(a*T)*Math.cos(Ct*T)))/T;(isNaN(Bt)||Bt===0)&&(Bt=z/Math.cos(Math.PI/180*a)),this._point=mt.subtract(u.getPixelOrigin()),this._radius=isNaN(Bt)?0:mt.x-u.project([Ct,i-Bt]).x,this._radiusY=mt.y-Y.y}else{var $t=b.unproject(b.project(this._latlng).subtract([this._mRadius,0]));this._point=u.latLngToLayerPoint(this._latlng),this._radius=this._point.x-u.latLngToLayerPoint($t).x}this._updateBounds()}});function np(i,a,u){return new Oa(i,a,u)}var ii=yi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,a){y(this,a),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var a=1/0,u=null,b=cs,T,z,Y=0,ht=this._parts.length;Y<ht;Y++)for(var mt=this._parts[Y],Ct=1,Bt=mt.length;Ct<Bt;Ct++){T=mt[Ct-1],z=mt[Ct];var $t=b(i,T,z,!0);$t<a&&(a=$t,u=b(i,T,z))}return u&&(u.distance=Math.sqrt(a)),u},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Nc(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,a){return a=a||this._defaultShape(),i=wt(i),a.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new Lt,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return An(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var a=[],u=An(i),b=0,T=i.length;b<T;b++)u?(a[b]=wt(i[b]),this._bounds.extend(a[b])):a[b]=this._convertLatLngs(i[b]);return a},_project:function(){var i=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),a=new j(i,i);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(i,a,u){var b=i[0]instanceof nt,T=i.length,z,Y;if(b){for(Y=[],z=0;z<T;z++)Y[z]=this._map.latLngToLayerPoint(i[z]),u.extend(Y[z]);a.push(Y)}else for(z=0;z<T;z++)this._projectLatlngs(i[z],a,u)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,u,b,T,z,Y,ht,mt;for(u=0,T=0,z=this._rings.length;u<z;u++)for(mt=this._rings[u],b=0,Y=mt.length;b<Y-1;b++)ht=Ic(mt[b],mt[b+1],i,b,!0),ht&&(a[T]=a[T]||[],a[T].push(ht[0]),(ht[1]!==mt[b+1]||b===Y-2)&&(a[T].push(ht[1]),T++))}},_simplifyPoints:function(){for(var i=this._parts,a=this.options.smoothFactor,u=0,b=i.length;u<b;u++)i[u]=Lc(i[u],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,a){var u,b,T,z,Y,ht,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(u=0,z=this._parts.length;u<z;u++)for(ht=this._parts[u],b=0,Y=ht.length,T=Y-1;b<Y;T=b++)if(!(!a&&b===0)&&Pc(i,ht[T],ht[b])<=mt)return!0;return!1}});function ip(i,a){return new ii(i,a)}ii._flat=Dc;var dr=ii.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Cc(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var a=ii.prototype._convertLatLngs.call(this,i),u=a.length;return u>=2&&a[0]instanceof nt&&a[0].equals(a[u-1])&&a.pop(),a},_setLatLngs:function(i){ii.prototype._setLatLngs.call(this,i),An(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return An(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,a=this.options.weight,u=new j(a,a);if(i=new q(i.min.subtract(u),i.max.add(u)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var b=0,T=this._rings.length,z;b<T;b++)z=Ac(this._rings[b],i,!0),z.length&&this._parts.push(z)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var a=!1,u,b,T,z,Y,ht,mt,Ct;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(z=0,mt=this._parts.length;z<mt;z++)for(u=this._parts[z],Y=0,Ct=u.length,ht=Ct-1;Y<Ct;ht=Y++)b=u[Y],T=u[ht],b.y>i.y!=T.y>i.y&&i.x<(T.x-b.x)*(i.y-b.y)/(T.y-b.y)+b.x&&(a=!a);return a||ii.prototype._containsPoint.call(this,i,!0)}});function rp(i,a){return new dr(i,a)}var ri=ni.extend({initialize:function(i,a){y(this,a),this._layers={},i&&this.addData(i)},addData:function(i){var a=M(i)?i:i.features,u,b,T;if(a){for(u=0,b=a.length;u<b;u++)T=a[u],(T.geometries||T.geometry||T.features||T.coordinates)&&this.addData(T);return this}var z=this.options;if(z.filter&&!z.filter(i))return this;var Y=to(i,z);return Y?(Y.feature=io(i),Y.defaultOptions=Y.options,this.resetStyle(Y),z.onEachFeature&&z.onEachFeature(i,Y),this.addLayer(Y)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=s({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(a){this._setLayerStyle(a,i)},this)},_setLayerStyle:function(i,a){i.setStyle&&(typeof a=="function"&&(a=a(i.feature)),i.setStyle(a))}});function to(i,a){var u=i.type==="Feature"?i.geometry:i,b=u?u.coordinates:null,T=[],z=a&&a.pointToLayer,Y=a&&a.coordsToLatLng||Ua,ht,mt,Ct,Bt;if(!b&&!u)return null;switch(u.type){case"Point":return ht=Y(b),kc(z,i,ht,a);case"MultiPoint":for(Ct=0,Bt=b.length;Ct<Bt;Ct++)ht=Y(b[Ct]),T.push(kc(z,i,ht,a));return new ni(T);case"LineString":case"MultiLineString":return mt=eo(b,u.type==="LineString"?0:1,Y),new ii(mt,a);case"Polygon":case"MultiPolygon":return mt=eo(b,u.type==="Polygon"?1:2,Y),new dr(mt,a);case"GeometryCollection":for(Ct=0,Bt=u.geometries.length;Ct<Bt;Ct++){var $t=to({geometry:u.geometries[Ct],type:"Feature",properties:i.properties},a);$t&&T.push($t)}return new ni(T);case"FeatureCollection":for(Ct=0,Bt=u.features.length;Ct<Bt;Ct++){var ue=to(u.features[Ct],a);ue&&T.push(ue)}return new ni(T);default:throw new Error("Invalid GeoJSON object.")}}function kc(i,a,u,b){return i?i(a,u):new Js(u,b&&b.markersInheritOptions&&b)}function Ua(i){return new nt(i[1],i[0],i[2])}function eo(i,a,u){for(var b=[],T=0,z=i.length,Y;T<z;T++)Y=a?eo(i[T],a-1,u):(u||Ua)(i[T]),b.push(Y);return b}function ka(i,a){return i=wt(i),i.alt!==void 0?[_(i.lng,a),_(i.lat,a),_(i.alt,a)]:[_(i.lng,a),_(i.lat,a)]}function no(i,a,u,b){for(var T=[],z=0,Y=i.length;z<Y;z++)T.push(a?no(i[z],An(i[z])?0:a-1,u,b):ka(i[z],b));return!a&&u&&T.length>0&&T.push(T[0].slice()),T}function fr(i,a){return i.feature?s({},i.feature,{geometry:a}):io(a)}function io(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var za={toGeoJSON:function(i){return fr(this,{type:"Point",coordinates:ka(this.getLatLng(),i)})}};Js.include(za),Oa.include(za),Qs.include(za),ii.include({toGeoJSON:function(i){var a=!An(this._latlngs),u=no(this._latlngs,a?1:0,!1,i);return fr(this,{type:(a?"Multi":"")+"LineString",coordinates:u})}}),dr.include({toGeoJSON:function(i){var a=!An(this._latlngs),u=a&&!An(this._latlngs[0]),b=no(this._latlngs,u?2:a?1:0,!0,i);return a||(b=[b]),fr(this,{type:(u?"Multi":"")+"Polygon",coordinates:b})}}),hr.include({toMultiPoint:function(i){var a=[];return this.eachLayer(function(u){a.push(u.toGeoJSON(i).geometry.coordinates)}),fr(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(i){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(i);var u=a==="GeometryCollection",b=[];return this.eachLayer(function(T){if(T.toGeoJSON){var z=T.toGeoJSON(i);if(u)b.push(z.geometry);else{var Y=io(z);Y.type==="FeatureCollection"?b.push.apply(b,Y.features):b.push(Y)}}}),u?fr(this,{geometries:b,type:"GeometryCollection"}):{type:"FeatureCollection",features:b}}});function zc(i,a){return new ri(i,a)}var sp=zc,ro=Dn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,a,u){this._url=i,this._bounds=J(a),y(this,u)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Yt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){fe(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&Tn(this._image),this},bringToBack:function(){return this._map&&Xn(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=J(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",a=this._image=i?this._url:Xt("img");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(i){var a=this._map.getZoomScale(i.zoom),u=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;Bi(this._image,u,a)},_reset:function(){var i=this._image,a=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),u=a.getSize();Ne(i,a.min),i.style.width=u.x+"px",i.style.height=u.y+"px"},_updateOpacity:function(){dn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),op=function(i,a,u){return new ro(i,a,u)},Bc=ro.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",a=this._image=i?this._url:Xt("video");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onloadeddata=l(this.fire,this,"load"),i){for(var u=a.getElementsByTagName("source"),b=[],T=0;T<u.length;T++)b.push(u[T].src);this._url=u.length>0?b:[a.src];return}M(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var z=0;z<this._url.length;z++){var Y=Xt("source");Y.src=this._url[z],a.appendChild(Y)}}});function ap(i,a,u){return new Bc(i,a,u)}var Fc=ro.extend({_initImage:function(){var i=this._image=this._url;Yt(i,"leaflet-image-layer"),this._zoomAnimated&&Yt(i,"leaflet-zoom-animated"),this.options.className&&Yt(i,this.options.className),i.onselectstart=p,i.onmousemove=p}});function lp(i,a,u){return new Fc(i,a,u)}var Yn=Dn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,a){i&&(i instanceof nt||M(i))?(this._latlng=wt(i),y(this,a)):(y(this,i),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&dn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&dn(this._container,1),this.bringToFront(),this.options.interactive&&(Yt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(dn(this._container,0),this._removeTimeout=setTimeout(l(fe,void 0,this._container),200)):fe(this._container),this.options.interactive&&(xe(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=wt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Tn(this._container),this},bringToBack:function(){return this._map&&Xn(this._container),this},_prepareOpen:function(i){var a=this._source;if(!a._map)return!1;if(a instanceof ni){a=null;var u=this._source._layers;for(var b in u)if(u[b]._map){a=u[b];break}if(!a)return!1;this._source=a}if(!i)if(a.getCenter)i=a.getCenter();else if(a.getLatLng)i=a.getLatLng();else if(a.getBounds)i=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")i.innerHTML=a;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),a=rt(this.options.offset),u=this._getAnchor();this._zoomAnimated?Ne(this._container,i.add(u)):a=a.add(i).add(u);var b=this._containerBottom=-a.y,T=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=b+"px",this._container.style.left=T+"px"}},_getAnchor:function(){return[0,0]}});de.include({_initOverlay:function(i,a,u,b){var T=a;return T instanceof i||(T=new i(b).setContent(a)),u&&T.setLatLng(u),T}}),Dn.include({_initOverlay:function(i,a,u,b){var T=u;return T instanceof i?(y(T,b),T._source=this):(T=a&&!b?a:new i(b,this),T.setContent(u)),T}});var so=Yn.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,Yn.prototype.openOn.call(this,i)},onAdd:function(i){Yn.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof yi||this._source.on("preclick",Hi))},onRemove:function(i){Yn.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof yi||this._source.off("preclick",Hi))},getEvents:function(){var i=Yn.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",a=this._container=Xt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),u=this._wrapper=Xt("div",i+"-content-wrapper",a);if(this._contentNode=Xt("div",i+"-content",u),as(a),Aa(this._contentNode),se(a,"contextmenu",Hi),this._tipContainer=Xt("div",i+"-tip-container",a),this._tip=Xt("div",i+"-tip",this._tipContainer),this.options.closeButton){var b=this._closeButton=Xt("a",i+"-close-button",a);b.setAttribute("role","button"),b.setAttribute("aria-label","Close popup"),b.href="#close",b.innerHTML='<span aria-hidden="true">&#215;</span>',se(b,"click",function(T){je(T),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,a=i.style;a.width="",a.whiteSpace="nowrap";var u=i.offsetWidth;u=Math.min(u,this.options.maxWidth),u=Math.max(u,this.options.minWidth),a.width=u+1+"px",a.whiteSpace="",a.height="";var b=i.offsetHeight,T=this.options.maxHeight,z="leaflet-popup-scrolled";T&&b>T?(a.height=T+"px",Yt(i,z)):xe(i,z),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),u=this._getAnchor();Ne(this._container,a.add(u))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,a=parseInt(ei(this._container,"marginBottom"),10)||0,u=this._container.offsetHeight+a,b=this._containerWidth,T=new j(this._containerLeft,-u-this._containerBottom);T._add(Fi(this._container));var z=i.layerPointToContainerPoint(T),Y=rt(this.options.autoPanPadding),ht=rt(this.options.autoPanPaddingTopLeft||Y),mt=rt(this.options.autoPanPaddingBottomRight||Y),Ct=i.getSize(),Bt=0,$t=0;z.x+b+mt.x>Ct.x&&(Bt=z.x+b-Ct.x+mt.x),z.x-Bt-ht.x<0&&(Bt=z.x-ht.x),z.y+u+mt.y>Ct.y&&($t=z.y+u-Ct.y+mt.y),z.y-$t-ht.y<0&&($t=z.y-ht.y),(Bt||$t)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([Bt,$t]))}},_getAnchor:function(){return rt(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),cp=function(i,a){return new so(i,a)};de.mergeOptions({closePopupOnClick:!0}),de.include({openPopup:function(i,a,u){return this._initOverlay(so,i,a,u).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),Dn.include({bindPopup:function(i,a){return this._popup=this._initOverlay(so,this._popup,i,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof ni||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){Vi(i);var a=i.layer||i.target;if(this._popup._source===a&&!(a instanceof yi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=a,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var oo=Yn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){Yn.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){Yn.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=Yn.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",a=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Xt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var a,u,b=this._map,T=this._container,z=b.latLngToContainerPoint(b.getCenter()),Y=b.layerPointToContainerPoint(i),ht=this.options.direction,mt=T.offsetWidth,Ct=T.offsetHeight,Bt=rt(this.options.offset),$t=this._getAnchor();ht==="top"?(a=mt/2,u=Ct):ht==="bottom"?(a=mt/2,u=0):ht==="center"?(a=mt/2,u=Ct/2):ht==="right"?(a=0,u=Ct/2):ht==="left"?(a=mt,u=Ct/2):Y.x<z.x?(ht="right",a=0,u=Ct/2):(ht="left",a=mt+(Bt.x+$t.x)*2,u=Ct/2),i=i.subtract(rt(a,u,!0)).add(Bt).add($t),xe(T,"leaflet-tooltip-right"),xe(T,"leaflet-tooltip-left"),xe(T,"leaflet-tooltip-top"),xe(T,"leaflet-tooltip-bottom"),Yt(T,"leaflet-tooltip-"+ht),Ne(T,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&dn(this._container,i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(a)},_getAnchor:function(){return rt(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),hp=function(i,a){return new oo(i,a)};de.include({openTooltip:function(i,a,u){return this._initOverlay(oo,i,a,u).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),Dn.include({bindTooltip:function(i,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(oo,this._tooltip,i,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var a=i?"off":"on",u={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?u.add=this._openTooltip:(u.mouseover=this._openTooltip,u.mouseout=this.closeTooltip,u.click=this._openTooltip,this._map?this._addFocusListeners():u.add=this._addFocusListeners),this._tooltip.options.sticky&&(u.mousemove=this._moveTooltip),this[a](u),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof ni||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&(se(a,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),se(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var a=i.latlng,u,b;this._tooltip.options.sticky&&i.originalEvent&&(u=this._map.mouseEventToContainerPoint(i.originalEvent),b=this._map.containerPointToLayerPoint(u),a=this._map.layerPointToLatLng(b)),this._tooltip.setLatLng(a)}});var Hc=ur.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var a=i&&i.tagName==="DIV"?i:document.createElement("div"),u=this.options;if(u.html instanceof Element?(zi(a),a.appendChild(u.html)):a.innerHTML=u.html!==!1?u.html:"",u.bgPos){var b=rt(u.bgPos);a.style.backgroundPosition=-b.x+"px "+-b.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function up(i){return new Hc(i)}ur.Default=hs;var us=Dn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Wt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){y(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),fe(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Tn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Xn(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof j?i:new j(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var a=this.getPane().children,u=-i(-1/0,1/0),b=0,T=a.length,z;b<T;b++)z=a[b].style.zIndex,a[b]!==this._container&&z&&(u=i(u,+z));isFinite(u)&&(this.options.zIndex=u+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Wt.ielt9){dn(this._container,this.options.opacity);var i=+new Date,a=!1,u=!1;for(var b in this._tiles){var T=this._tiles[b];if(!(!T.current||!T.loaded)){var z=Math.min(1,(i-T.loaded)/200);dn(T.el,z),z<1?a=!0:(T.active?u=!0:this._onOpaqueTile(T),T.active=!0)}}u&&!this._noPrune&&this._pruneTiles(),a&&(k(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Xt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,a=this.options.maxZoom;if(i!==void 0){for(var u in this._levels)u=Number(u),this._levels[u].el.children.length||u===i?(this._levels[u].el.style.zIndex=a-Math.abs(i-u),this._onUpdateLevel(u)):(fe(this._levels[u].el),this._removeTilesAtZoom(u),this._onRemoveLevel(u),delete this._levels[u]);var b=this._levels[i],T=this._map;return b||(b=this._levels[i]={},b.el=Xt("div","leaflet-tile-container leaflet-zoom-animated",this._container),b.el.style.zIndex=a,b.origin=T.project(T.unproject(T.getPixelOrigin()),i).round(),b.zoom=i,this._setZoomTransform(b,T.getCenter(),T.getZoom()),p(b.el.offsetWidth),this._onCreateLevel(b)),this._level=b,b}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var i,a,u=this._map.getZoom();if(u>this.options.maxZoom||u<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)a=this._tiles[i],a.retain=a.current;for(i in this._tiles)if(a=this._tiles[i],a.current&&!a.active){var b=a.coords;this._retainParent(b.x,b.y,b.z,b.z-5)||this._retainChildren(b.x,b.y,b.z,b.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var a in this._tiles)this._tiles[a].coords.z===i&&this._removeTile(a)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)fe(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,a,u,b){var T=Math.floor(i/2),z=Math.floor(a/2),Y=u-1,ht=new j(+T,+z);ht.z=+Y;var mt=this._tileCoordsToKey(ht),Ct=this._tiles[mt];return Ct&&Ct.active?(Ct.retain=!0,!0):(Ct&&Ct.loaded&&(Ct.retain=!0),Y>b?this._retainParent(T,z,Y,b):!1)},_retainChildren:function(i,a,u,b){for(var T=2*i;T<2*i+2;T++)for(var z=2*a;z<2*a+2;z++){var Y=new j(T,z);Y.z=u+1;var ht=this._tileCoordsToKey(Y),mt=this._tiles[ht];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);u+1<b&&this._retainChildren(T,z,u+1,b)}},_resetView:function(i){var a=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var a=this.options;return a.minNativeZoom!==void 0&&i<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<i?a.maxNativeZoom:i},_setView:function(i,a,u,b){var T=Math.round(a);this.options.maxZoom!==void 0&&T>this.options.maxZoom||this.options.minZoom!==void 0&&T<this.options.minZoom?T=void 0:T=this._clampZoom(T);var z=this.options.updateWhenZooming&&T!==this._tileZoom;(!b||z)&&(this._tileZoom=T,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),T!==void 0&&this._update(i),u||this._pruneTiles(),this._noPrune=!!u),this._setZoomTransforms(i,a)},_setZoomTransforms:function(i,a){for(var u in this._levels)this._setZoomTransform(this._levels[u],i,a)},_setZoomTransform:function(i,a,u){var b=this._map.getZoomScale(u,i.zoom),T=i.origin.multiplyBy(b).subtract(this._map._getNewPixelOrigin(a,u)).round();Wt.any3d?Bi(i.el,T,b):Ne(i.el,T)},_resetGrid:function(){var i=this._map,a=i.options.crs,u=this._tileSize=this.getTileSize(),b=this._tileZoom,T=this._map.getPixelWorldBounds(this._tileZoom);T&&(this._globalTileRange=this._pxBoundsToTileRange(T)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,a.wrapLng[0]],b).x/u.x),Math.ceil(i.project([0,a.wrapLng[1]],b).x/u.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([a.wrapLat[0],0],b).y/u.x),Math.ceil(i.project([a.wrapLat[1],0],b).y/u.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var a=this._map,u=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),b=a.getZoomScale(u,this._tileZoom),T=a.project(i,this._tileZoom).floor(),z=a.getSize().divideBy(b*2);return new q(T.subtract(z),T.add(z))},_update:function(i){var a=this._map;if(a){var u=this._clampZoom(a.getZoom());if(i===void 0&&(i=a.getCenter()),this._tileZoom!==void 0){var b=this._getTiledPixelBounds(i),T=this._pxBoundsToTileRange(b),z=T.getCenter(),Y=[],ht=this.options.keepBuffer,mt=new q(T.getBottomLeft().subtract([ht,-ht]),T.getTopRight().add([ht,-ht]));if(!(isFinite(T.min.x)&&isFinite(T.min.y)&&isFinite(T.max.x)&&isFinite(T.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Ct in this._tiles){var Bt=this._tiles[Ct].coords;(Bt.z!==this._tileZoom||!mt.contains(new j(Bt.x,Bt.y)))&&(this._tiles[Ct].current=!1)}if(Math.abs(u-this._tileZoom)>1){this._setView(i,u);return}for(var $t=T.min.y;$t<=T.max.y;$t++)for(var ue=T.min.x;ue<=T.max.x;ue++){var on=new j(ue,$t);if(on.z=this._tileZoom,!!this._isValidTile(on)){var Ve=this._tiles[this._tileCoordsToKey(on)];Ve?Ve.current=!0:Y.push(on)}}if(Y.sort(function(fn,mr){return fn.distanceTo(z)-mr.distanceTo(z)}),Y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Cn=document.createDocumentFragment();for(ue=0;ue<Y.length;ue++)this._addTile(Y[ue],Cn);this._level.el.appendChild(Cn)}}}},_isValidTile:function(i){var a=this._map.options.crs;if(!a.infinite){var u=this._globalTileRange;if(!a.wrapLng&&(i.x<u.min.x||i.x>u.max.x)||!a.wrapLat&&(i.y<u.min.y||i.y>u.max.y))return!1}if(!this.options.bounds)return!0;var b=this._tileCoordsToBounds(i);return J(this.options.bounds).overlaps(b)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var a=this._map,u=this.getTileSize(),b=i.scaleBy(u),T=b.add(u),z=a.unproject(b,i.z),Y=a.unproject(T,i.z);return[z,Y]},_tileCoordsToBounds:function(i){var a=this._tileCoordsToNwSe(i),u=new Lt(a[0],a[1]);return this.options.noWrap||(u=this._map.wrapLatLngBounds(u)),u},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var a=i.split(":"),u=new j(+a[0],+a[1]);return u.z=+a[2],u},_removeTile:function(i){var a=this._tiles[i];a&&(fe(a.el),delete this._tiles[i],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){Yt(i,"leaflet-tile");var a=this.getTileSize();i.style.width=a.x+"px",i.style.height=a.y+"px",i.onselectstart=p,i.onmousemove=p,Wt.ielt9&&this.options.opacity<1&&dn(i,this.options.opacity)},_addTile:function(i,a){var u=this._getTilePos(i),b=this._tileCoordsToKey(i),T=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(T),this.createTile.length<2&&W(l(this._tileReady,this,i,null,T)),Ne(T,u),this._tiles[b]={el:T,coords:i,current:!0},a.appendChild(T),this.fire("tileloadstart",{tile:T,coords:i})},_tileReady:function(i,a,u){a&&this.fire("tileerror",{error:a,tile:u,coords:i});var b=this._tileCoordsToKey(i);u=this._tiles[b],u&&(u.loaded=+new Date,this._map._fadeAnimated?(dn(u.el,0),k(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this)):(u.active=!0,this._pruneTiles()),a||(Yt(u.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:u.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Wt.ielt9||!this._map._fadeAnimated?W(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var a=new j(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return a.z=i.z,a},_pxBoundsToTileRange:function(i){var a=this.getTileSize();return new q(i.min.unscaleBy(a).floor(),i.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function dp(i){return new us(i)}var pr=us.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,a){this._url=i,a=y(this,a),a.detectRetina&&Wt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,a){return this._url===i&&a===void 0&&(a=!0),this._url=i,a||this.redraw(),this},createTile:function(i,a){var u=document.createElement("img");return se(u,"load",l(this._tileOnLoad,this,a,u)),se(u,"error",l(this._tileOnError,this,a,u)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(u.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(u.referrerPolicy=this.options.referrerPolicy),u.alt="",u.src=this.getTileUrl(i),u},getTileUrl:function(i){var a={r:Wt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var u=this._globalTileRange.max.y-i.y;this.options.tms&&(a.y=u),a["-y"]=u}return S(this._url,s(a,this.options))},_tileOnLoad:function(i,a){Wt.ielt9?setTimeout(l(i,this,null,a),0):i(null,a)},_tileOnError:function(i,a,u){var b=this.options.errorTileUrl;b&&a.getAttribute("src")!==b&&(a.src=b),i(u,a)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,a=this.options.maxZoom,u=this.options.zoomReverse,b=this.options.zoomOffset;return u&&(i=a-i),i+b},_getSubdomain:function(i){var a=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var i,a;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(a=this._tiles[i].el,a.onload=p,a.onerror=p,!a.complete)){a.src=N;var u=this._tiles[i].coords;fe(a),delete this._tiles[i],this.fire("tileabort",{tile:a,coords:u})}},_removeTile:function(i){var a=this._tiles[i];if(a)return a.el.setAttribute("src",N),us.prototype._removeTile.call(this,i)},_tileReady:function(i,a,u){if(!(!this._map||u&&u.getAttribute("src")===N))return us.prototype._tileReady.call(this,i,a,u)}});function Vc(i,a){return new pr(i,a)}var Gc=pr.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,a){this._url=i;var u=s({},this.defaultWmsParams);for(var b in a)b in this.options||(u[b]=a[b]);a=y(this,a);var T=a.detectRetina&&Wt.retina?2:1,z=this.getTileSize();u.width=z.x*T,u.height=z.y*T,this.wmsParams=u},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,pr.prototype.onAdd.call(this,i)},getTileUrl:function(i){var a=this._tileCoordsToNwSe(i),u=this._crs,b=tt(u.project(a[0]),u.project(a[1])),T=b.min,z=b.max,Y=(this._wmsVersion>=1.3&&this._crs===Oc?[T.y,T.x,z.y,z.x]:[T.x,T.y,z.x,z.y]).join(","),ht=pr.prototype.getTileUrl.call(this,i);return ht+g(this.wmsParams,ht,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+Y},setParams:function(i,a){return s(this.wmsParams,i),a||this.redraw(),this}});function fp(i,a){return new Gc(i,a)}pr.WMS=Gc,Vc.wms=fp;var si=Dn.extend({options:{padding:.1},initialize:function(i){y(this,i),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Yt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,a){var u=this._map.getZoomScale(a,this._zoom),b=this._map.getSize().multiplyBy(.5+this.options.padding),T=this._map.project(this._center,a),z=b.multiplyBy(-u).add(T).subtract(this._map._getNewPixelOrigin(i,a));Wt.any3d?Bi(this._container,z,u):Ne(this._container,z)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,a=this._map.getSize(),u=this._map.containerPointToLayerPoint(a.multiplyBy(-i)).round();this._bounds=new q(u,u.add(a.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Wc=si.extend({options:{tolerance:0},getEvents:function(){var i=si.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){si.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");se(i,"mousemove",this._onMouseMove,this),se(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),se(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){k(this._redrawRequest),delete this._ctx,fe(this._container),ye(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var a in this._layers)i=this._layers[a],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){si.prototype._update.call(this);var i=this._bounds,a=this._container,u=i.getSize(),b=Wt.retina?2:1;Ne(a,i.min),a.width=b*u.x,a.height=b*u.y,a.style.width=u.x+"px",a.style.height=u.y+"px",Wt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){si.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[h(i)]=i;var a=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var a=i._order,u=a.next,b=a.prev;u?u.prev=b:this._drawLast=b,b?b.next=u:this._drawFirst=u,delete i._order,delete this._layers[h(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var a=i.options.dashArray.split(/[, ]+/),u=[],b,T;for(T=0;T<a.length;T++){if(b=Number(a[T]),isNaN(b))return;u.push(b)}i.options._dashArray=u}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||W(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var a=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(i._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(i._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var a=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,a=this._redrawBounds;if(this._ctx.save(),a){var u=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,u.x,u.y),this._ctx.clip()}this._drawing=!0;for(var b=this._drawFirst;b;b=b.next)i=b.layer,(!a||i._pxBounds&&i._pxBounds.intersects(a))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,a){if(this._drawing){var u,b,T,z,Y=i._parts,ht=Y.length,mt=this._ctx;if(ht){for(mt.beginPath(),u=0;u<ht;u++){for(b=0,T=Y[u].length;b<T;b++)z=Y[u][b],mt[b?"lineTo":"moveTo"](z.x,z.y);a&&mt.closePath()}this._fillStroke(mt,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var a=i._point,u=this._ctx,b=Math.max(Math.round(i._radius),1),T=(Math.max(Math.round(i._radiusY),1)||b)/b;T!==1&&(u.save(),u.scale(1,T)),u.beginPath(),u.arc(a.x,a.y/T,b,0,Math.PI*2,!1),T!==1&&u.restore(),this._fillStroke(u,i)}},_fillStroke:function(i,a){var u=a.options;u.fill&&(i.globalAlpha=u.fillOpacity,i.fillStyle=u.fillColor||u.color,i.fill(u.fillRule||"evenodd")),u.stroke&&u.weight!==0&&(i.setLineDash&&i.setLineDash(a.options&&a.options._dashArray||[]),i.globalAlpha=u.opacity,i.lineWidth=u.weight,i.strokeStyle=u.color,i.lineCap=u.lineCap,i.lineJoin=u.lineJoin,i.stroke())},_onClick:function(i){for(var a=this._map.mouseEventToLayerPoint(i),u,b,T=this._drawFirst;T;T=T.next)u=T.layer,u.options.interactive&&u._containsPoint(a)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(u))&&(b=u);this._fireEvent(b?[b]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,a)}},_handleMouseOut:function(i){var a=this._hoveredLayer;a&&(xe(this._container,"leaflet-interactive"),this._fireEvent([a],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,a){if(!this._mouseHoverThrottled){for(var u,b,T=this._drawFirst;T;T=T.next)u=T.layer,u.options.interactive&&u._containsPoint(a)&&(b=u);b!==this._hoveredLayer&&(this._handleMouseOut(i),b&&(Yt(this._container,"leaflet-interactive"),this._fireEvent([b],i,"mouseover"),this._hoveredLayer=b)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,a,u){this._map._fireDOMEvent(a,u||a.type,i)},_bringToFront:function(i){var a=i._order;if(a){var u=a.next,b=a.prev;if(u)u.prev=b;else return;b?b.next=u:u&&(this._drawFirst=u),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(i)}},_bringToBack:function(i){var a=i._order;if(a){var u=a.next,b=a.prev;if(b)b.next=u;else return;u?u.prev=b:b&&(this._drawLast=b),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(i)}}});function Zc(i){return Wt.canvas?new Wc(i):null}var ds=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),pp={_initContainer:function(){this._container=Xt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(si.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var a=i._container=ds("shape");Yt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",i._path=ds("path"),a.appendChild(i._path),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){var a=i._container;this._container.appendChild(a),i.options.interactive&&i.addInteractiveTarget(a)},_removePath:function(i){var a=i._container;fe(a),i.removeInteractiveTarget(a),delete this._layers[h(i)]},_updateStyle:function(i){var a=i._stroke,u=i._fill,b=i.options,T=i._container;T.stroked=!!b.stroke,T.filled=!!b.fill,b.stroke?(a||(a=i._stroke=ds("stroke")),T.appendChild(a),a.weight=b.weight+"px",a.color=b.color,a.opacity=b.opacity,b.dashArray?a.dashStyle=M(b.dashArray)?b.dashArray.join(" "):b.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=b.lineCap.replace("butt","flat"),a.joinstyle=b.lineJoin):a&&(T.removeChild(a),i._stroke=null),b.fill?(u||(u=i._fill=ds("fill")),T.appendChild(u),u.color=b.fillColor||b.color,u.opacity=b.fillOpacity):u&&(T.removeChild(u),i._fill=null)},_updateCircle:function(i){var a=i._point.round(),u=Math.round(i._radius),b=Math.round(i._radiusY||u);this._setPath(i,i._empty()?"M0 0":"AL "+a.x+","+a.y+" "+u+","+b+" 0,"+65535*360)},_setPath:function(i,a){i._path.v=a},_bringToFront:function(i){Tn(i._container)},_bringToBack:function(i){Xn(i._container)}},ao=Wt.vml?ds:et,fs=si.extend({_initContainer:function(){this._container=ao("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=ao("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){fe(this._container),ye(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){si.prototype._update.call(this);var i=this._bounds,a=i.getSize(),u=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,u.setAttribute("width",a.x),u.setAttribute("height",a.y)),Ne(u,i.min),u.setAttribute("viewBox",[i.min.x,i.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(i){var a=i._path=ao("path");i.options.className&&Yt(a,i.options.className),i.options.interactive&&Yt(a,"leaflet-interactive"),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){fe(i._path),i.removeInteractiveTarget(i._path),delete this._layers[h(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var a=i._path,u=i.options;a&&(u.stroke?(a.setAttribute("stroke",u.color),a.setAttribute("stroke-opacity",u.opacity),a.setAttribute("stroke-width",u.weight),a.setAttribute("stroke-linecap",u.lineCap),a.setAttribute("stroke-linejoin",u.lineJoin),u.dashArray?a.setAttribute("stroke-dasharray",u.dashArray):a.removeAttribute("stroke-dasharray"),u.dashOffset?a.setAttribute("stroke-dashoffset",u.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),u.fill?(a.setAttribute("fill",u.fillColor||u.color),a.setAttribute("fill-opacity",u.fillOpacity),a.setAttribute("fill-rule",u.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(i,a){this._setPath(i,$(i._parts,a))},_updateCircle:function(i){var a=i._point,u=Math.max(Math.round(i._radius),1),b=Math.max(Math.round(i._radiusY),1)||u,T="a"+u+","+b+" 0 1,0 ",z=i._empty()?"M0 0":"M"+(a.x-u)+","+a.y+T+u*2+",0 "+T+-u*2+",0 ";this._setPath(i,z)},_setPath:function(i,a){i._path.setAttribute("d",a)},_bringToFront:function(i){Tn(i._path)},_bringToBack:function(i){Xn(i._path)}});Wt.vml&&fs.include(pp);function Xc(i){return Wt.svg||Wt.vml?new fs(i):null}de.include({getRenderer:function(i){var a=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var a=this._paneRenderers[i];return a===void 0&&(a=this._createRenderer({pane:i}),this._paneRenderers[i]=a),a},_createRenderer:function(i){return this.options.preferCanvas&&Zc(i)||Xc(i)}});var qc=dr.extend({initialize:function(i,a){dr.prototype.initialize.call(this,this._boundsToLatLngs(i),a)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=J(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function mp(i,a){return new qc(i,a)}fs.create=ao,fs.pointsToPath=$,ri.geometryToLayer=to,ri.coordsToLatLng=Ua,ri.coordsToLatLngs=eo,ri.latLngToCoords=ka,ri.latLngsToCoords=no,ri.getFeature=fr,ri.asFeature=io,de.mergeOptions({boxZoom:!0});var jc=jn.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){se(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){ye(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){fe(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),rs(),ya(),this._startPoint=this._map.mouseEventToContainerPoint(i),se(document,{contextmenu:Vi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Xt("div","leaflet-zoom-box",this._container),Yt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var a=new q(this._point,this._startPoint),u=a.getSize();Ne(this._box,a.min),this._box.style.width=u.x+"px",this._box.style.height=u.y+"px"},_finish:function(){this._moved&&(fe(this._box),xe(this._container,"leaflet-crosshair")),ss(),xa(),ye(document,{contextmenu:Vi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new Lt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});de.addInitHook("addHandler","boxZoom",jc),de.mergeOptions({doubleClickZoom:!0});var Yc=jn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var a=this._map,u=a.getZoom(),b=a.options.zoomDelta,T=i.originalEvent.shiftKey?u-b:u+b;a.options.doubleClickZoom==="center"?a.setZoom(T):a.setZoomAround(i.containerPoint,T)}});de.addInitHook("addHandler","doubleClickZoom",Yc),de.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var $c=jn.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new vi(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}Yt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){xe(this._map._container,"leaflet-grab"),xe(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=J(this._map.options.maxBounds);this._offsetLimit=tt(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var a=this._lastTime=+new Date,u=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(u),this._times.push(a),this._prunePositions(a)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,a){return i-(i-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;i.x<a.min.x&&(i.x=this._viscousLimit(i.x,a.min.x)),i.y<a.min.y&&(i.y=this._viscousLimit(i.y,a.min.y)),i.x>a.max.x&&(i.x=this._viscousLimit(i.x,a.max.x)),i.y>a.max.y&&(i.y=this._viscousLimit(i.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,a=Math.round(i/2),u=this._initialWorldOffset,b=this._draggable._newPos.x,T=(b-a+u)%i+a-u,z=(b+a+u)%i-a-u,Y=Math.abs(T+u)<Math.abs(z+u)?T:z;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=Y},_onDragEnd:function(i){var a=this._map,u=a.options,b=!u.inertia||i.noInertia||this._times.length<2;if(a.fire("dragend",i),b)a.fire("moveend");else{this._prunePositions(+new Date);var T=this._lastPos.subtract(this._positions[0]),z=(this._lastTime-this._times[0])/1e3,Y=u.easeLinearity,ht=T.multiplyBy(Y/z),mt=ht.distanceTo([0,0]),Ct=Math.min(u.inertiaMaxSpeed,mt),Bt=ht.multiplyBy(Ct/mt),$t=Ct/(u.inertiaDeceleration*Y),ue=Bt.multiplyBy(-$t/2).round();!ue.x&&!ue.y?a.fire("moveend"):(ue=a._limitOffset(ue,a.options.maxBounds),W(function(){a.panBy(ue,{duration:$t,easeLinearity:Y,noMoveStart:!0,animate:!0})}))}}});de.addInitHook("addHandler","dragging",$c),de.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Kc=jn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),se(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),ye(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,a=document.documentElement,u=i.scrollTop||a.scrollTop,b=i.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(b,u)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var a=this._panKeys={},u=this.keyCodes,b,T;for(b=0,T=u.left.length;b<T;b++)a[u.left[b]]=[-1*i,0];for(b=0,T=u.right.length;b<T;b++)a[u.right[b]]=[i,0];for(b=0,T=u.down.length;b<T;b++)a[u.down[b]]=[0,i];for(b=0,T=u.up.length;b<T;b++)a[u.up[b]]=[0,-1*i]},_setZoomDelta:function(i){var a=this._zoomKeys={},u=this.keyCodes,b,T;for(b=0,T=u.zoomIn.length;b<T;b++)a[u.zoomIn[b]]=i;for(b=0,T=u.zoomOut.length;b<T;b++)a[u.zoomOut[b]]=-i},_addHooks:function(){se(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){ye(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var a=i.keyCode,u=this._map,b;if(a in this._panKeys){if(!u._panAnim||!u._panAnim._inProgress)if(b=this._panKeys[a],i.shiftKey&&(b=rt(b).multiplyBy(3)),u.options.maxBounds&&(b=u._limitOffset(rt(b),u.options.maxBounds)),u.options.worldCopyJump){var T=u.wrapLatLng(u.unproject(u.project(u.getCenter()).add(b)));u.panTo(T)}else u.panBy(b)}else if(a in this._zoomKeys)u.setZoom(u.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&u._popup&&u._popup.options.closeOnEscapeKey)u.closePopup();else return;Vi(i)}}});de.addInitHook("addHandler","keyboard",Kc),de.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var Jc=jn.extend({addHooks:function(){se(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){ye(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var a=wc(i),u=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var b=Math.max(u-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),b),Vi(i)},_performZoom:function(){var i=this._map,a=i.getZoom(),u=this._map.options.zoomSnap||0;i._stop();var b=this._delta/(this._map.options.wheelPxPerZoomLevel*4),T=4*Math.log(2/(1+Math.exp(-Math.abs(b))))/Math.LN2,z=u?Math.ceil(T/u)*u:T,Y=i._limitZoom(a+(this._delta>0?z:-z))-a;this._delta=0,this._startTime=null,Y&&(i.options.scrollWheelZoom==="center"?i.setZoom(a+Y):i.setZoomAround(this._lastMousePos,a+Y))}});de.addInitHook("addHandler","scrollWheelZoom",Jc);var gp=600;de.mergeOptions({tapHold:Wt.touchNative&&Wt.safari&&Wt.mobile,tapTolerance:15});var Qc=jn.extend({addHooks:function(){se(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){ye(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var a=i.touches[0];this._startPos=this._newPos=new j(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(se(document,"touchend",je),se(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),gp),se(document,"touchend touchcancel contextmenu",this._cancel,this),se(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){ye(document,"touchend",je),ye(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),ye(document,"touchend touchcancel contextmenu",this._cancel,this),ye(document,"touchmove",this._onMove,this)},_onMove:function(i){var a=i.touches[0];this._newPos=new j(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,a){var u=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});u._simulated=!0,a.target.dispatchEvent(u)}});de.addInitHook("addHandler","tapHold",Qc),de.mergeOptions({touchZoom:Wt.touch,bounceAtZoomLimits:!0});var th=jn.extend({addHooks:function(){Yt(this._map._container,"leaflet-touch-zoom"),se(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){xe(this._map._container,"leaflet-touch-zoom"),ye(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var a=this._map;if(!(!i.touches||i.touches.length!==2||a._animatingZoom||this._zooming)){var u=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(u.add(b)._divideBy(2))),this._startDist=u.distanceTo(b),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),se(document,"touchmove",this._onTouchMove,this),se(document,"touchend touchcancel",this._onTouchEnd,this),je(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var a=this._map,u=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]),T=u.distanceTo(b)/this._startDist;if(this._zoom=a.getScaleZoom(T,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&T<1||this._zoom>a.getMaxZoom()&&T>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,T===1)return}else{var z=u._add(b)._divideBy(2)._subtract(this._centerPoint);if(T===1&&z.x===0&&z.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(z),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),k(this._animRequest);var Y=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=W(Y,this,!0),je(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,k(this._animRequest),ye(document,"touchmove",this._onTouchMove,this),ye(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});de.addInitHook("addHandler","touchZoom",th),de.BoxZoom=jc,de.DoubleClickZoom=Yc,de.Drag=$c,de.Keyboard=Kc,de.ScrollWheelZoom=Jc,de.TapHold=Qc,de.TouchZoom=th,e.Bounds=q,e.Browser=Wt,e.CRS=St,e.Canvas=Wc,e.Circle=Oa,e.CircleMarker=Qs,e.Class=A,e.Control=In,e.DivIcon=Hc,e.DivOverlay=Yn,e.DomEvent=Nf,e.DomUtil=If,e.Draggable=vi,e.Evented=ot,e.FeatureGroup=ni,e.GeoJSON=ri,e.GridLayer=us,e.Handler=jn,e.Icon=ur,e.ImageOverlay=ro,e.LatLng=nt,e.LatLngBounds=Lt,e.Layer=Dn,e.LayerGroup=hr,e.LineUtil=qf,e.Map=de,e.Marker=Js,e.Mixin=Hf,e.Path=yi,e.Point=j,e.PolyUtil=Vf,e.Polygon=dr,e.Polyline=ii,e.Popup=so,e.PosAnimation=Mc,e.Projection=jf,e.Rectangle=qc,e.Renderer=si,e.SVG=fs,e.SVGOverlay=Fc,e.TileLayer=pr,e.Tooltip=oo,e.Transformation=it,e.Util=F,e.VideoOverlay=Bc,e.bind=l,e.bounds=tt,e.canvas=Zc,e.circle=np,e.circleMarker=ep,e.control=ls,e.divIcon=up,e.extend=s,e.featureGroup=Jf,e.geoJSON=zc,e.geoJson=sp,e.gridLayer=dp,e.icon=Qf,e.imageOverlay=op,e.latLng=wt,e.latLngBounds=J,e.layerGroup=Kf,e.map=Of,e.marker=tp,e.point=rt,e.polygon=rp,e.polyline=ip,e.popup=cp,e.rectangle=mp,e.setOptions=y,e.stamp=h,e.svg=Xc,e.svgOverlay=lp,e.tileLayer=Vc,e.tooltip=hp,e.transformation=vt,e.version=n,e.videoOverlay=ap;var _p=window.L;e.noConflict=function(){return window.L=_p,this},window.L=e})})(Dl,Dl.exports);var Ap=Dl.exports;const we=nd(Ap),bt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function id(){const r=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:r("c-base")||"#eeebe6",terrainRes:Number(r("t-res"))||128,exag:Number(r("dp-exag")||r("t-exag"))||1,smooth:Number(r("t-smooth"))||1,baseH:Number(r("dp-base")||r("t-base-h"))||5,maxDim:Number(r("t-maxdim"))||200,elevZoom:Number(r("t-zoom"))||15,waterOn:t("water-on"),waterCol:r("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:r("road-col")||"#262626",buildOn:t("build-on"),buildCol:r("build-col")||"#9090a0",buildHS:Number(r("build-hs"))||1,gpxCol:r("gpx-col")||"#ff4500",gpxH:Number(r("gpx-h"))||1.2,gpxMW:Number(r("gpx-mw"))||1.5,gpxTW:Number(r("gpx-tw"))||3}}let Fs=null,Gt,Ze=null,Sn=null,pi=null,Re=null,Pe=null,Pn=[],Ye=[],We=null,cn=null,ps=null,Br="none",gr=[];const Cp={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function Lp(r){r&&(Fs=r);const t=we.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=we.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=we.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),s=we.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),o=we.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Gt=we.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),we.control.zoom({position:"topright"}).addTo(Gt),we.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:s,Voyager:o,"IGN (France)":n},{},{position:"topright"}).addTo(Gt),new ResizeObserver(()=>Gt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Gt.invalidateSize(),300),Op(),Ip(),Up(),kp(),Np()}function rh(r,t){return[[r.lat,r.lng],[r.lat,t.lng],[t.lat,t.lng],[t.lat,r.lng]]}function sh(r,t){const e=(r.lat+t.lat)/2,n=Math.abs(t.lat-r.lat)*111320,s=Math.abs(t.lng-r.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),h=Math.min(r.lat,t.lat),d=Math.min(r.lng,t.lng);return[[h,d],[h,d+c],[h+l,d+c],[h+l,d]]}function oh(r,t,e=80){const n=r.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[r.lat+n*Math.cos(l)/111320,r.lng+n*Math.sin(l)/(111320*Math.cos(r.lat*Math.PI/180))]})}function ah(r,t){const e=r.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[r.lat+e*Math.cos(o)/111320,r.lng+e*Math.sin(o)/(111320*Math.cos(r.lat*Math.PI/180))]})}function rd(r){Re&&Re!==r&&(Pe=null,Pn=[],Ye=[],We&&(Gt.removeLayer(We),We=null),cn&&(Gt.removeLayer(cn),cn=null)),Re=r,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===r)}),Gt.getContainer().classList.toggle("dm",!!r);const t=document.getElementById("dch");t.style.display=r?"block":"none",r&&(t.textContent=Cp[r]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=r==="trace"?"block":"none",r!=="trace"&&(e.textContent="0 points tracés"),!r){const n=document.getElementById("snap");n&&(n.style.display="none")}}function Zo(r=!0){We&&(Gt.removeLayer(We),We=null),cn&&(Gt.removeLayer(cn),cn=null),Pe=null,Pn=[],Ye=[],r&&rd(null)}function Xo(r,t){return t?Gt.latLngToContainerPoint(r).distanceTo(Gt.latLngToContainerPoint(t)):9999}function lh(r){const t=[];Pn.length>2&&t.push(Pn[0]),Ye.length>2&&t.push(Ye[0]),pi&&t.push(pi.getLatLng());let e=null,n=9999;for(const s of t){const o=Xo(r,s);o<18&&o<n&&(n=o,e=s)}return e}function Pp(r,t){const e=document.getElementById("snap");if(!e)return;if(!t||Xo(r,t)>18){e.style.display="none";return}const n=Gt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function Rp(){document.getElementById("zone-controls")?.classList.add("visible"),Nl()}function sd(){document.getElementById("zone-controls")?.classList.remove("visible"),od("none")}function Nl(){if(!bt.bounds)return;const r=document.getElementById("zone-controls");if(!r)return;const t=we.latLng(bt.bounds.maxLat,bt.bounds.maxLon),e=Gt.latLngToContainerPoint(t),n=40;r.style.left=e.x+10+"px",r.style.top=Math.max(10,e.y-n/2)+"px"}function od(r){Br==="move"&&r!=="move"&&(Gt.dragging.enable(),Gt.getContainer().style.cursor=""),Br=r,document.getElementById("zc-move")?.classList.toggle("active",r==="move"),r==="move"&&(Gt.dragging.disable(),Gt.getContainer().style.cursor="grab")}function ad(r){Ze&&(Gt.removeLayer(Ze),Ze=null),Ze=we.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const t=r.map(h=>h[0]),e=r.map(h=>h[1]);bt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(bt.bounds.minLat+bt.bounds.maxLat)/2,s=(bt.bounds.maxLon-bt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,o=(bt.bounds.maxLat-bt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(o,s);bt.wMm=Math.round(s*c),bt.dMm=Math.round(o*c),Fs?.()}function ch(r){if(!bt.zonePts)return;const t=bt.zonePts.map(l=>l[0]),e=bt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,s=(Math.min(...e)+Math.max(...e))/2,o=bt.zonePts.map(([l,c])=>[n+(l-n)*r,s+(c-s)*r]);bt.zonePts=o,ad(o)}function Ip(){document.getElementById("zc-delete")?.addEventListener("click",()=>{Ze&&(Gt.removeLayer(Ze),Ze=null),bt.bounds=null,bt.zonePts=null,sd(),Fs?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>ch(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>ch(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{od(Br==="move"?"none":"move")});let r=null;Gt.getContainer().addEventListener("mousedown",t=>{Br!=="move"||!bt.zonePts||(r={x:t.clientX,y:t.clientY},gr=bt.zonePts.map(e=>[e[0],e[1]]),Gt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(Br!=="move"||!r||!gr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(we.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(we.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=gr.map(([h,d])=>[h+o,d+l]);Ze&&(Gt.removeLayer(Ze),Ze=null),Ze=we.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt)}),document.addEventListener("mouseup",t=>{if(Br!=="move"||!r||!gr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(we.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(we.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=gr.map(([h,d])=>[h+o,d+l]);r=null,gr=[],bt.zonePts=c,ad(c),Nl(),Gt.getContainer().style.cursor="grab"}),Gt.on("move zoom moveend zoomend",Nl)}function ms(r,t){Ze&&(Gt.removeLayer(Ze),Ze=null),Ze=we.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const e=r.map(d=>d[0]),n=r.map(d=>d[1]);bt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},bt.zonePts=r,bt.zoneType=t;const s=(bt.bounds.minLat+bt.bounds.maxLat)/2,o=(bt.bounds.maxLon-bt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(bt.bounds.maxLat-bt.bounds.minLat)*111320,h=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);bt.realW=o,bt.realH=l,bt.wMm=Math.round(o*h),bt.dMm=Math.round(l*h),Fs?.(),Rp(),Zo()}function Dp(){Sn&&(Gt.removeLayer(Sn),Sn=null),!(Ye.length<2)&&(Sn=we.polyline(Ye,{color:"#ff0000",weight:4,opacity:.9}).addTo(Gt))}function hh(r){const t=document.getElementById("snap");if(t&&(t.style.display="none"),cn&&(Gt.removeLayer(cn),cn=null),r.length<2){Zo();return}bt.gpxPoints=r.map(n=>({lat:n.lat,lon:n.lng})),ld(),cd(`✏️ ${r.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),Zo()}function ld(){Sn&&(Gt.removeLayer(Sn),Sn=null),!(bt.gpxPoints.length<2)&&(Sn=we.polyline(bt.gpxPoints.map(r=>[r.lat,r.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Gt))}function cd(r){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=r,t.style.display="block")}function Np(){Gt.on("mousemove",r=>{if(!Re)return;const t=r.latlng,e=lh(t);Pp(t,e??Pe);const n=e??t;if((Re==="rect"||Re==="sq")&&Pe){const s=Re==="sq"?sh(Pe,n):rh(Pe,n);We?We.setLatLngs(s):We=we.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Gt)}else if((Re==="circ"||Re==="hex")&&Pe){const s=Re==="circ"?oh(Pe,n):ah(Pe,n);We?We.setLatLngs(s):We=we.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Gt)}else if(Re==="poly"&&Pn.length>0){const s=[...Pn,n];We?We.setLatLngs(s):We=we.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Gt)}else if(Re==="trace"&&Ye.length>0){const s=[...Ye,n];We?We.setLatLngs(s):We=we.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Gt)}}),Gt.on("click",r=>{if(!Re)return;const t=r.latlng,e=lh(t),n=e??t;if(Re==="rect"){if(!Pe){Pe=n;return}ms(rh(Pe,n),"rect")}else if(Re==="sq"){if(!Pe){Pe=n;return}ms(sh(Pe,n),"rect")}else if(Re==="circ"){if(!Pe){Pe=n;return}ms(oh(Pe,n),"circ")}else if(Re==="hex"){if(!Pe){Pe=n;return}ms(ah(Pe,n),"hex")}else if(Re==="poly"){if(Pn.length>2&&Xo(t,Pn[0])<18){ms(Pn.map(s=>[s.lat,s.lng]),"poly");return}Pn.push(n),Pn.length===1&&(cn&&Gt.removeLayer(cn),cn=we.circleMarker(Pn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt))}else Re==="trace"&&(ps&&clearTimeout(ps),ps=setTimeout(()=>{if(Ye.length>2&&Xo(t,Ye[0])<18){hh(Ye);return}Ye.push(e??t);const s=Ye.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(cn&&Gt.removeLayer(cn),cn=we.circleMarker(Ye[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt)),Dp()},220))}),Gt.on("dblclick",r=>{Re==="trace"&&Ye.length>=2&&(ps&&clearTimeout(ps),hh(Ye),r.originalEvent.preventDefault())})}function Op(){["rect","sq","circ","hex","poly","trace"].forEach(r=>{document.getElementById("db-"+r)?.addEventListener("click",()=>{rd(Re===r?null:r)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{Zo(),Ze&&(Gt.removeLayer(Ze),Ze=null),Sn&&(Gt.removeLayer(Sn),Sn=null),pi&&(Gt.removeLayer(pi),pi=null),bt.bounds=null,bt.zonePts=null,bt.gpxPoints=[],Ye=[],sd();const r=document.getElementById("gpx-badge");r&&(r.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),Fs?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!bt.bounds)return;const r=bt.bounds;Gt.fitBounds([[r.minLat,r.minLon],[r.maxLat,r.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!bt.gpxPoints.length)return;const r=bt.gpxPoints.map(e=>e.lat),t=bt.gpxPoints.map(e=>e.lon);Gt.fitBounds([[Math.min(...r),Math.min(...t)],[Math.max(...r),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function Up(){document.getElementById("gpx-file")?.addEventListener("change",function(){const r=this.files?.[0];if(!r)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(h=>({lat:parseFloat(h.getAttribute("lat")),lon:parseFloat(h.getAttribute("lon"))})).filter(h=>!isNaN(h.lat)&&!isNaN(h.lon));if(!o.length)return;bt.gpxPoints=o,ld(),Sn&&Gt.fitBounds(Sn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let h=1;h<o.length;h++){const f=(o[h].lat-o[h-1].lat)*Math.PI/180,p=(o[h].lon-o[h-1].lon)*Math.PI/180,_=Math.sin(f/2)**2+Math.cos(o[h-1].lat*Math.PI/180)*Math.cos(o[h].lat*Math.PI/180)*Math.sin(p/2)**2;l+=6371*2*Math.atan2(Math.sqrt(_),Math.sqrt(1-_))}cd(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(r)})}let uh;function kp(){const r=document.getElementById("srch-input"),t=document.getElementById("srch-drop");r?.addEventListener("input",function(){clearTimeout(uh);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(uh=setTimeout(()=>zp(e),120))}),r?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function zp(r){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),h=this.dataset.bb.split(",").map(Number);pi&&(Gt.removeLayer(pi),pi=null),pi=we.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Gt),Gt.fitBounds([[h[0],h[2]],[h[1],h[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ql="163",_r={ROTATE:0,DOLLY:1,PAN:2},vr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Bp=0,dh=1,Fp=2,hd=1,Hp=2,di=3,Di=0,_n=1,mn=2,Pi=0,Wr=1,fh=2,ph=3,mh=4,Vp=5,Ki=100,Gp=101,Wp=102,Zp=103,Xp=104,qp=200,jp=201,Yp=202,$p=203,Ol=204,Ul=205,Kp=206,Jp=207,Qp=208,tm=209,em=210,nm=211,im=212,rm=213,sm=214,om=0,am=1,lm=2,qo=3,cm=4,hm=5,um=6,dm=7,tc=0,fm=1,pm=2,Ri=0,ud=1,mm=2,gm=3,_m=4,vm=5,ym=6,xm=7,dd=300,Yr=301,$r=302,kl=303,zl=304,aa=306,Bl=1e3,er=1001,Fl=1002,Rn=1003,bm=1004,co=1005,Bn=1006,Ha=1007,nr=1008,Ii=1009,wm=1010,Mm=1011,fd=1012,pd=1013,Kr=1014,Li=1015,jo=1016,md=1017,gd=1018,Hs=1020,Sm=35902,Em=1021,Tm=1022,Qn=1023,Am=1024,Cm=1025,Zr=1026,Os=1027,Lm=1028,_d=1029,Pm=1030,vd=1031,yd=1033,Va=33776,Ga=33777,Wa=33778,Za=33779,gh=35840,_h=35841,vh=35842,yh=35843,xd=36196,xh=37492,bh=37496,wh=37808,Mh=37809,Sh=37810,Eh=37811,Th=37812,Ah=37813,Ch=37814,Lh=37815,Ph=37816,Rh=37817,Ih=37818,Dh=37819,Nh=37820,Oh=37821,Xa=36492,Uh=36494,kh=36495,Rm=36283,zh=36284,Bh=36285,Fh=36286,Im=3200,Dm=3201,ec=0,Nm=1,Ci="",$n="srgb",Ui="srgb-linear",nc="display-p3",la="display-p3-linear",Yo="linear",be="srgb",$o="rec709",Ko="p3",yr=7680,Hh=519,Om=512,Um=513,km=514,bd=515,zm=516,Bm=517,Fm=518,Hm=519,Vh=35044,Gh="300 es",mi=2e3,Jo=2001;class ar{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ls=Math.PI/180,Hl=180/Math.PI;function Qr(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[r&255]+Je[r>>8&255]+Je[r>>16&255]+Je[r>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function Xe(r,t,e){return Math.max(t,Math.min(e,r))}function Vm(r,t){return(r%t+t)%t}function qa(r,t,e){return(1-e)*r+e*t}function gs(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function pn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Gm={DEG2RAD:Ls};class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,e,n,s,o,l,c,h,d){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,h,d)}set(t,e,n,s,o,l,c,h,d){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=h,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],h=n[6],d=n[1],f=n[4],p=n[7],_=n[2],m=n[5],x=n[8],y=s[0],g=s[3],v=s[6],S=s[1],M=s[4],P=s[7],N=s[2],O=s[5],U=s[8];return o[0]=l*y+c*S+h*N,o[3]=l*g+c*M+h*O,o[6]=l*v+c*P+h*U,o[1]=d*y+f*S+p*N,o[4]=d*g+f*M+p*O,o[7]=d*v+f*P+p*U,o[2]=_*y+m*S+x*N,o[5]=_*g+m*M+x*O,o[8]=_*v+m*P+x*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*o*f+n*c*h+s*o*d-s*l*h}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],p=f*l-c*d,_=c*h-f*o,m=d*o-l*h,x=e*p+n*_+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return t[0]=p*y,t[1]=(s*d-f*n)*y,t[2]=(c*n-s*l)*y,t[3]=_*y,t[4]=(f*e-s*h)*y,t[5]=(s*o-c*e)*y,t[6]=m*y,t[7]=(n*h-d*e)*y,t[8]=(l*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const h=Math.cos(o),d=Math.sin(o);return this.set(n*h,n*d,-n*(h*l+d*c)+l+t,-s*d,s*h,-s*(-d*l+h*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(ja.makeScale(t,e)),this}rotate(t){return this.premultiply(ja.makeRotation(-t)),this}translate(t,e){return this.premultiply(ja.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ja=new ce;function wd(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Qo(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Wm(){const r=Qo("canvas");return r.style.display="block",r}const Wh={};function Zm(r){r in Wh||(Wh[r]=!0,console.warn(r))}const Zh=new ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Xh=new ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ho={[Ui]:{transfer:Yo,primaries:$o,toReference:r=>r,fromReference:r=>r},[$n]:{transfer:be,primaries:$o,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[la]:{transfer:Yo,primaries:Ko,toReference:r=>r.applyMatrix3(Xh),fromReference:r=>r.applyMatrix3(Zh)},[nc]:{transfer:be,primaries:Ko,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Xh),fromReference:r=>r.applyMatrix3(Zh).convertLinearToSRGB()}},Xm=new Set([Ui,la]),ge={enabled:!0,_workingColorSpace:Ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Xm.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=ho[t].toReference,s=ho[e].fromReference;return s(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return ho[r].primaries},getTransfer:function(r){return r===Ci?Yo:ho[r].transfer}};function Xr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ya(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let xr;class qm{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{xr===void 0&&(xr=Qo("canvas")),xr.width=t.width,xr.height=t.height;const n=xr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=xr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Qo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=Xr(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Xr(e[n]/255)*255):e[n]=Xr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let jm=0;class Md{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:jm++}),this.uuid=Qr(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push($a(s[l].image)):o.push($a(s[l]))}else o=$a(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function $a(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?qm.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Ym=0;class hn extends ar{constructor(t=hn.DEFAULT_IMAGE,e=hn.DEFAULT_MAPPING,n=er,s=er,o=Bn,l=nr,c=Qn,h=Ii,d=hn.DEFAULT_ANISOTROPY,f=Ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Ym++}),this.uuid=Qr(),this.name="",this.source=new Md(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=h,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==dd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Bl:t.x=t.x-Math.floor(t.x);break;case er:t.x=t.x<0?0:1;break;case Fl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Bl:t.y=t.y-Math.floor(t.y);break;case er:t.y=t.y<0?0:1;break;case Fl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=dd;hn.DEFAULT_ANISOTROPY=1;class qe{constructor(t=0,e=0,n=0,s=1){qe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const h=t.elements,d=h[0],f=h[4],p=h[8],_=h[1],m=h[5],x=h[9],y=h[2],g=h[6],v=h[10];if(Math.abs(f-_)<.01&&Math.abs(p-y)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+_)<.1&&Math.abs(p+y)<.1&&Math.abs(x+g)<.1&&Math.abs(d+m+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(d+1)/2,P=(m+1)/2,N=(v+1)/2,O=(f+_)/4,U=(p+y)/4,H=(x+g)/4;return M>P&&M>N?M<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(M),s=O/n,o=U/n):P>N?P<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(P),n=O/s,o=H/s):N<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(N),n=U/o,s=H/o),this.set(n,s,o,e),this}let S=Math.sqrt((g-x)*(g-x)+(p-y)*(p-y)+(_-f)*(_-f));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(p-y)/S,this.z=(_-f)/S,this.w=Math.acos((d+m+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $m extends ar{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new qe(0,0,t,e),this.scissorTest=!1,this.viewport=new qe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new hn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Md(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ir extends $m{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sd extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Km extends hn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Rn,this.minFilter=Rn,this.wrapR=er,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let h=n[s+0],d=n[s+1],f=n[s+2],p=n[s+3];const _=o[l+0],m=o[l+1],x=o[l+2],y=o[l+3];if(c===0){t[e+0]=h,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(c===1){t[e+0]=_,t[e+1]=m,t[e+2]=x,t[e+3]=y;return}if(p!==y||h!==_||d!==m||f!==x){let g=1-c;const v=h*_+d*m+f*x+p*y,S=v>=0?1:-1,M=1-v*v;if(M>Number.EPSILON){const N=Math.sqrt(M),O=Math.atan2(N,v*S);g=Math.sin(g*O)/N,c=Math.sin(c*O)/N}const P=c*S;if(h=h*g+_*P,d=d*g+m*P,f=f*g+x*P,p=p*g+y*P,g===1-c){const N=1/Math.sqrt(h*h+d*d+f*f+p*p);h*=N,d*=N,f*=N,p*=N}}t[e]=h,t[e+1]=d,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],h=n[s+1],d=n[s+2],f=n[s+3],p=o[l],_=o[l+1],m=o[l+2],x=o[l+3];return t[e]=c*x+f*p+h*m-d*_,t[e+1]=h*x+f*_+d*p-c*m,t[e+2]=d*x+f*m+c*_-h*p,t[e+3]=f*x-c*p-h*_-d*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,h=Math.sin,d=c(n/2),f=c(s/2),p=c(o/2),_=h(n/2),m=h(s/2),x=h(o/2);switch(l){case"XYZ":this._x=_*f*p+d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p-_*m*x;break;case"YXZ":this._x=_*f*p+d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p+_*m*x;break;case"ZXY":this._x=_*f*p-d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p-_*m*x;break;case"ZYX":this._x=_*f*p-d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p+_*m*x;break;case"YZX":this._x=_*f*p+d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p-_*m*x;break;case"XZY":this._x=_*f*p-d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p+_*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],h=e[9],d=e[2],f=e[6],p=e[10],_=n+c+p;if(_>0){const m=.5/Math.sqrt(_+1);this._w=.25/m,this._x=(f-h)*m,this._y=(o-d)*m,this._z=(l-s)*m}else if(n>c&&n>p){const m=2*Math.sqrt(1+n-c-p);this._w=(f-h)/m,this._x=.25*m,this._y=(s+l)/m,this._z=(o+d)/m}else if(c>p){const m=2*Math.sqrt(1+c-n-p);this._w=(o-d)/m,this._x=(s+l)/m,this._y=.25*m,this._z=(h+f)/m}else{const m=2*Math.sqrt(1+p-n-c);this._w=(l-s)/m,this._x=(o+d)/m,this._y=(h+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,h=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+s*d-o*h,this._y=s*f+l*h+o*c-n*d,this._z=o*f+l*d+n*h-s*c,this._w=l*f-n*c-s*h-o*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const h=1-c*c;if(h<=Number.EPSILON){const m=1-e;return this._w=m*l+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const d=Math.sqrt(h),f=Math.atan2(d,c),p=Math.sin((1-e)*f)/d,_=Math.sin(e*f)/d;return this._w=l*p+this._w*_,this._x=n*p+this._x*_,this._y=s*p+this._y*_,this._z=o*p+this._z*_,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,e=0,n=0){Q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qh.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,h=t.w,d=2*(l*s-c*n),f=2*(c*e-o*s),p=2*(o*n-l*e);return this.x=e+h*d+l*p-c*f,this.y=n+h*f+c*d-o*p,this.z=s+h*p+o*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,h=e.z;return this.x=s*h-o*c,this.y=o*l-n*h,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ka.copy(this).projectOnVector(t),this.sub(Ka)}reflect(t){return this.sub(Ka.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ka=new Q,qh=new rr;class Vs{constructor(t=new Q(1/0,1/0,1/0),e=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Nn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Nn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Nn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,Nn):Nn.fromBufferAttribute(o,l),Nn.applyMatrix4(t.matrixWorld),this.expandByPoint(Nn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),uo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uo.copy(n.boundingBox)),uo.applyMatrix4(t.matrixWorld),this.union(uo)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Nn),Nn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(_s),fo.subVectors(this.max,_s),br.subVectors(t.a,_s),wr.subVectors(t.b,_s),Mr.subVectors(t.c,_s),bi.subVectors(wr,br),wi.subVectors(Mr,wr),Wi.subVectors(br,Mr);let e=[0,-bi.z,bi.y,0,-wi.z,wi.y,0,-Wi.z,Wi.y,bi.z,0,-bi.x,wi.z,0,-wi.x,Wi.z,0,-Wi.x,-bi.y,bi.x,0,-wi.y,wi.x,0,-Wi.y,Wi.x,0];return!Ja(e,br,wr,Mr,fo)||(e=[1,0,0,0,1,0,0,0,1],!Ja(e,br,wr,Mr,fo))?!1:(po.crossVectors(bi,wi),e=[po.x,po.y,po.z],Ja(e,br,wr,Mr,fo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Nn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Nn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(oi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),oi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),oi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),oi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),oi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),oi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),oi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),oi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(oi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const oi=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],Nn=new Q,uo=new Vs,br=new Q,wr=new Q,Mr=new Q,bi=new Q,wi=new Q,Wi=new Q,_s=new Q,fo=new Q,po=new Q,Zi=new Q;function Ja(r,t,e,n,s){for(let o=0,l=r.length-3;o<=l;o+=3){Zi.fromArray(r,o);const c=s.x*Math.abs(Zi.x)+s.y*Math.abs(Zi.y)+s.z*Math.abs(Zi.z),h=t.dot(Zi),d=e.dot(Zi),f=n.dot(Zi);if(Math.max(-Math.max(h,d,f),Math.min(h,d,f))>c)return!1}return!0}const Jm=new Vs,vs=new Q,Qa=new Q;class ca{constructor(t=new Q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Jm.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;vs.subVectors(t,this.center);const e=vs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(vs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(vs.copy(t.center).add(Qa)),this.expandByPoint(vs.copy(t.center).sub(Qa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ai=new Q,tl=new Q,mo=new Q,Mi=new Q,el=new Q,go=new Q,nl=new Q;class ic{constructor(t=new Q,e=new Q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ai.copy(this.origin).addScaledVector(this.direction,e),ai.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){tl.copy(t).add(e).multiplyScalar(.5),mo.copy(e).sub(t).normalize(),Mi.copy(this.origin).sub(tl);const o=t.distanceTo(e)*.5,l=-this.direction.dot(mo),c=Mi.dot(this.direction),h=-Mi.dot(mo),d=Mi.lengthSq(),f=Math.abs(1-l*l);let p,_,m,x;if(f>0)if(p=l*h-c,_=l*c-h,x=o*f,p>=0)if(_>=-x)if(_<=x){const y=1/f;p*=y,_*=y,m=p*(p+l*_+2*c)+_*(l*p+_+2*h)+d}else _=o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*h)+d;else _=-o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*h)+d;else _<=-x?(p=Math.max(0,-(-l*o+c)),_=p>0?-o:Math.min(Math.max(-o,-h),o),m=-p*p+_*(_+2*h)+d):_<=x?(p=0,_=Math.min(Math.max(-o,-h),o),m=_*(_+2*h)+d):(p=Math.max(0,-(l*o+c)),_=p>0?o:Math.min(Math.max(-o,-h),o),m=-p*p+_*(_+2*h)+d);else _=l>0?-o:o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*h)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(tl).addScaledVector(mo,_),m}intersectSphere(t,e){ai.subVectors(t.center,this.origin);const n=ai.dot(this.direction),s=ai.dot(ai)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,h=n+l;return h<0?null:c<0?this.at(h,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,h;const d=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,_=this.origin;return d>=0?(n=(t.min.x-_.x)*d,s=(t.max.x-_.x)*d):(n=(t.max.x-_.x)*d,s=(t.min.x-_.x)*d),f>=0?(o=(t.min.y-_.y)*f,l=(t.max.y-_.y)*f):(o=(t.max.y-_.y)*f,l=(t.min.y-_.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),p>=0?(c=(t.min.z-_.z)*p,h=(t.max.z-_.z)*p):(c=(t.max.z-_.z)*p,h=(t.min.z-_.z)*p),n>h||c>s)||((c>n||n!==n)&&(n=c),(h<s||s!==s)&&(s=h),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ai)!==null}intersectTriangle(t,e,n,s,o){el.subVectors(e,t),go.subVectors(n,t),nl.crossVectors(el,go);let l=this.direction.dot(nl),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Mi.subVectors(this.origin,t);const h=c*this.direction.dot(go.crossVectors(Mi,go));if(h<0)return null;const d=c*this.direction.dot(el.cross(Mi));if(d<0||h+d>l)return null;const f=-c*Mi.dot(nl);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ae{constructor(t,e,n,s,o,l,c,h,d,f,p,_,m,x,y,g){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,h,d,f,p,_,m,x,y,g)}set(t,e,n,s,o,l,c,h,d,f,p,_,m,x,y,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=s,v[1]=o,v[5]=l,v[9]=c,v[13]=h,v[2]=d,v[6]=f,v[10]=p,v[14]=_,v[3]=m,v[7]=x,v[11]=y,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Sr.setFromMatrixColumn(t,0).length(),o=1/Sr.setFromMatrixColumn(t,1).length(),l=1/Sr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),d=Math.sin(s),f=Math.cos(o),p=Math.sin(o);if(t.order==="XYZ"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=h*f,e[4]=-h*p,e[8]=d,e[1]=m+x*d,e[5]=_-y*d,e[9]=-c*h,e[2]=y-_*d,e[6]=x+m*d,e[10]=l*h}else if(t.order==="YXZ"){const _=h*f,m=h*p,x=d*f,y=d*p;e[0]=_+y*c,e[4]=x*c-m,e[8]=l*d,e[1]=l*p,e[5]=l*f,e[9]=-c,e[2]=m*c-x,e[6]=y+_*c,e[10]=l*h}else if(t.order==="ZXY"){const _=h*f,m=h*p,x=d*f,y=d*p;e[0]=_-y*c,e[4]=-l*p,e[8]=x+m*c,e[1]=m+x*c,e[5]=l*f,e[9]=y-_*c,e[2]=-l*d,e[6]=c,e[10]=l*h}else if(t.order==="ZYX"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=h*f,e[4]=x*d-m,e[8]=_*d+y,e[1]=h*p,e[5]=y*d+_,e[9]=m*d-x,e[2]=-d,e[6]=c*h,e[10]=l*h}else if(t.order==="YZX"){const _=l*h,m=l*d,x=c*h,y=c*d;e[0]=h*f,e[4]=y-_*p,e[8]=x*p+m,e[1]=p,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=m*p+x,e[10]=_-y*p}else if(t.order==="XZY"){const _=l*h,m=l*d,x=c*h,y=c*d;e[0]=h*f,e[4]=-p,e[8]=d*f,e[1]=_*p+y,e[5]=l*f,e[9]=m*p-x,e[2]=x*p-m,e[6]=c*f,e[10]=y*p+_}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Qm,t,tg)}lookAt(t,e,n){const s=this.elements;return vn.subVectors(t,e),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Si.crossVectors(n,vn),Si.lengthSq()===0&&(Math.abs(n.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Si.crossVectors(n,vn)),Si.normalize(),_o.crossVectors(vn,Si),s[0]=Si.x,s[4]=_o.x,s[8]=vn.x,s[1]=Si.y,s[5]=_o.y,s[9]=vn.y,s[2]=Si.z,s[6]=_o.z,s[10]=vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],h=n[8],d=n[12],f=n[1],p=n[5],_=n[9],m=n[13],x=n[2],y=n[6],g=n[10],v=n[14],S=n[3],M=n[7],P=n[11],N=n[15],O=s[0],U=s[4],H=s[8],I=s[12],R=s[1],W=s[5],k=s[9],F=s[13],A=s[2],Z=s[6],at=s[10],ot=s[14],j=s[3],st=s[7],rt=s[11],q=s[15];return o[0]=l*O+c*R+h*A+d*j,o[4]=l*U+c*W+h*Z+d*st,o[8]=l*H+c*k+h*at+d*rt,o[12]=l*I+c*F+h*ot+d*q,o[1]=f*O+p*R+_*A+m*j,o[5]=f*U+p*W+_*Z+m*st,o[9]=f*H+p*k+_*at+m*rt,o[13]=f*I+p*F+_*ot+m*q,o[2]=x*O+y*R+g*A+v*j,o[6]=x*U+y*W+g*Z+v*st,o[10]=x*H+y*k+g*at+v*rt,o[14]=x*I+y*F+g*ot+v*q,o[3]=S*O+M*R+P*A+N*j,o[7]=S*U+M*W+P*Z+N*st,o[11]=S*H+M*k+P*at+N*rt,o[15]=S*I+M*F+P*ot+N*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],h=t[9],d=t[13],f=t[2],p=t[6],_=t[10],m=t[14],x=t[3],y=t[7],g=t[11],v=t[15];return x*(+o*h*p-s*d*p-o*c*_+n*d*_+s*c*m-n*h*m)+y*(+e*h*m-e*d*_+o*l*_-s*l*m+s*d*f-o*h*f)+g*(+e*d*p-e*c*m-o*l*p+n*l*m+o*c*f-n*d*f)+v*(-s*c*f-e*h*p+e*c*_+s*l*p-n*l*_+n*h*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],p=t[9],_=t[10],m=t[11],x=t[12],y=t[13],g=t[14],v=t[15],S=p*g*d-y*_*d+y*h*m-c*g*m-p*h*v+c*_*v,M=x*_*d-f*g*d-x*h*m+l*g*m+f*h*v-l*_*v,P=f*y*d-x*p*d+x*c*m-l*y*m-f*c*v+l*p*v,N=x*p*h-f*y*h-x*c*_+l*y*_+f*c*g-l*p*g,O=e*S+n*M+s*P+o*N;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/O;return t[0]=S*U,t[1]=(y*_*o-p*g*o-y*s*m+n*g*m+p*s*v-n*_*v)*U,t[2]=(c*g*o-y*h*o+y*s*d-n*g*d-c*s*v+n*h*v)*U,t[3]=(p*h*o-c*_*o-p*s*d+n*_*d+c*s*m-n*h*m)*U,t[4]=M*U,t[5]=(f*g*o-x*_*o+x*s*m-e*g*m-f*s*v+e*_*v)*U,t[6]=(x*h*o-l*g*o-x*s*d+e*g*d+l*s*v-e*h*v)*U,t[7]=(l*_*o-f*h*o+f*s*d-e*_*d-l*s*m+e*h*m)*U,t[8]=P*U,t[9]=(x*p*o-f*y*o-x*n*m+e*y*m+f*n*v-e*p*v)*U,t[10]=(l*y*o-x*c*o+x*n*d-e*y*d-l*n*v+e*c*v)*U,t[11]=(f*c*o-l*p*o-f*n*d+e*p*d+l*n*m-e*c*m)*U,t[12]=N*U,t[13]=(f*y*s-x*p*s+x*n*_-e*y*_-f*n*g+e*p*g)*U,t[14]=(x*c*s-l*y*s-x*n*h+e*y*h+l*n*g-e*c*g)*U,t[15]=(l*p*s-f*c*s+f*n*h-e*p*h-l*n*_+e*c*_)*U,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,h=t.z,d=o*l,f=o*c;return this.set(d*l+n,d*c-s*h,d*h+s*c,0,d*c+s*h,f*c+n,f*h-s*l,0,d*h-s*c,f*h+s*l,o*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,h=e._w,d=o+o,f=l+l,p=c+c,_=o*d,m=o*f,x=o*p,y=l*f,g=l*p,v=c*p,S=h*d,M=h*f,P=h*p,N=n.x,O=n.y,U=n.z;return s[0]=(1-(y+v))*N,s[1]=(m+P)*N,s[2]=(x-M)*N,s[3]=0,s[4]=(m-P)*O,s[5]=(1-(_+v))*O,s[6]=(g+S)*O,s[7]=0,s[8]=(x+M)*U,s[9]=(g-S)*U,s[10]=(1-(_+y))*U,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Sr.set(s[0],s[1],s[2]).length();const l=Sr.set(s[4],s[5],s[6]).length(),c=Sr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],On.copy(this);const d=1/o,f=1/l,p=1/c;return On.elements[0]*=d,On.elements[1]*=d,On.elements[2]*=d,On.elements[4]*=f,On.elements[5]*=f,On.elements[6]*=f,On.elements[8]*=p,On.elements[9]*=p,On.elements[10]*=p,e.setFromRotationMatrix(On),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=mi){const h=this.elements,d=2*o/(e-t),f=2*o/(n-s),p=(e+t)/(e-t),_=(n+s)/(n-s);let m,x;if(c===mi)m=-(l+o)/(l-o),x=-2*l*o/(l-o);else if(c===Jo)m=-l/(l-o),x=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=d,h[4]=0,h[8]=p,h[12]=0,h[1]=0,h[5]=f,h[9]=_,h[13]=0,h[2]=0,h[6]=0,h[10]=m,h[14]=x,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=mi){const h=this.elements,d=1/(e-t),f=1/(n-s),p=1/(l-o),_=(e+t)*d,m=(n+s)*f;let x,y;if(c===mi)x=(l+o)*p,y=-2*p;else if(c===Jo)x=o*p,y=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=2*d,h[4]=0,h[8]=0,h[12]=-_,h[1]=0,h[5]=2*f,h[9]=0,h[13]=-m,h[2]=0,h[6]=0,h[10]=y,h[14]=-x,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Sr=new Q,On=new Ae,Qm=new Q(0,0,0),tg=new Q(1,1,1),Si=new Q,_o=new Q,vn=new Q,jh=new Ae,Yh=new rr;class Wn{constructor(t=0,e=0,n=0,s=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],h=s[1],d=s[5],f=s[9],p=s[2],_=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(h,d)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(h,o));break;case"ZYX":this._y=Math.asin(-Xe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(_,m),this._z=Math.atan2(h,o)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Xe(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return jh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(jh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yh.setFromEuler(this),this.setFromQuaternion(Yh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class Ed{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let eg=0;const $h=new Q,Er=new rr,li=new Ae,vo=new Q,ys=new Q,ng=new Q,ig=new rr,Kh=new Q(1,0,0),Jh=new Q(0,1,0),Qh=new Q(0,0,1),tu={type:"added"},rg={type:"removed"},Tr={type:"childadded",child:null},il={type:"childremoved",child:null};class $e extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eg++}),this.uuid=Qr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new Q,e=new Wn,n=new rr,s=new Q(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new ce}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ed,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Er.setFromAxisAngle(t,e),this.quaternion.multiply(Er),this}rotateOnWorldAxis(t,e){return Er.setFromAxisAngle(t,e),this.quaternion.premultiply(Er),this}rotateX(t){return this.rotateOnAxis(Kh,t)}rotateY(t){return this.rotateOnAxis(Jh,t)}rotateZ(t){return this.rotateOnAxis(Qh,t)}translateOnAxis(t,e){return $h.copy(t).applyQuaternion(this.quaternion),this.position.add($h.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kh,t)}translateY(t){return this.translateOnAxis(Jh,t)}translateZ(t){return this.translateOnAxis(Qh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(li.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?vo.copy(t):vo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?li.lookAt(ys,vo,this.up):li.lookAt(vo,ys,this.up),this.quaternion.setFromRotationMatrix(li),s&&(li.extractRotation(s.matrixWorld),Er.setFromRotationMatrix(li),this.quaternion.premultiply(Er.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(tu),Tr.child=t,this.dispatchEvent(Tr),Tr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rg),il.child=t,this.dispatchEvent(il),il.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),li.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),li.multiply(t.parent.matrixWorld)),t.applyMatrix4(li),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(tu),Tr.child=t,this.dispatchEvent(Tr),Tr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,t,ng),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,ig,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,h){return c[h.uuid]===void 0&&(c[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const h=c.shapes;if(Array.isArray(h))for(let d=0,f=h.length;d<f;d++){const p=h[d];o(t.shapes,p)}else o(t.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let h=0,d=this.material.length;h<d;h++)c.push(o(t.materials,this.material[h]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const h=this.animations[c];s.animations.push(o(t.animations,h))}}if(e){const c=l(t.geometries),h=l(t.materials),d=l(t.textures),f=l(t.images),p=l(t.shapes),_=l(t.skeletons),m=l(t.animations),x=l(t.nodes);c.length>0&&(n.geometries=c),h.length>0&&(n.materials=h),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),_.length>0&&(n.skeletons=_),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function l(c){const h=[];for(const d in c){const f=c[d];delete f.metadata,h.push(f)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}$e.DEFAULT_UP=new Q(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Un=new Q,ci=new Q,rl=new Q,hi=new Q,Ar=new Q,Cr=new Q,eu=new Q,sl=new Q,ol=new Q,al=new Q;class Fn{constructor(t=new Q,e=new Q,n=new Q){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Un.subVectors(t,e),s.cross(Un);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){Un.subVectors(s,e),ci.subVectors(n,e),rl.subVectors(t,e);const l=Un.dot(Un),c=Un.dot(ci),h=Un.dot(rl),d=ci.dot(ci),f=ci.dot(rl),p=l*d-c*c;if(p===0)return o.set(0,0,0),null;const _=1/p,m=(d*h-c*f)*_,x=(l*f-c*h)*_;return o.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,hi)===null?!1:hi.x>=0&&hi.y>=0&&hi.x+hi.y<=1}static getInterpolation(t,e,n,s,o,l,c,h){return this.getBarycoord(t,e,n,s,hi)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(o,hi.x),h.addScaledVector(l,hi.y),h.addScaledVector(c,hi.z),h)}static isFrontFacing(t,e,n,s){return Un.subVectors(n,e),ci.subVectors(t,e),Un.cross(ci).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Un.subVectors(this.c,this.b),ci.subVectors(this.a,this.b),Un.cross(ci).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Fn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Fn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;Ar.subVectors(s,n),Cr.subVectors(o,n),sl.subVectors(t,n);const h=Ar.dot(sl),d=Cr.dot(sl);if(h<=0&&d<=0)return e.copy(n);ol.subVectors(t,s);const f=Ar.dot(ol),p=Cr.dot(ol);if(f>=0&&p<=f)return e.copy(s);const _=h*p-f*d;if(_<=0&&h>=0&&f<=0)return l=h/(h-f),e.copy(n).addScaledVector(Ar,l);al.subVectors(t,o);const m=Ar.dot(al),x=Cr.dot(al);if(x>=0&&m<=x)return e.copy(o);const y=m*d-h*x;if(y<=0&&d>=0&&x<=0)return c=d/(d-x),e.copy(n).addScaledVector(Cr,c);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return eu.subVectors(o,s),c=(p-f)/(p-f+(m-x)),e.copy(s).addScaledVector(eu,c);const v=1/(g+y+_);return l=y*v,c=_*v,e.copy(n).addScaledVector(Ar,l).addScaledVector(Cr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Td={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ei={h:0,s:0,l:0},yo={h:0,s:0,l:0};function ll(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class ie{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$n){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ge.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ge.workingColorSpace){return this.r=t,this.g=e,this.b=n,ge.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ge.workingColorSpace){if(t=Vm(t,1),e=Xe(e,0,1),n=Xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=ll(l,o,t+1/3),this.g=ll(l,o,t),this.b=ll(l,o,t-1/3)}return ge.toWorkingColorSpace(this,s),this}setStyle(t,e=$n){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$n){const n=Td[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xr(t.r),this.g=Xr(t.g),this.b=Xr(t.b),this}copyLinearToSRGB(t){return this.r=Ya(t.r),this.g=Ya(t.g),this.b=Ya(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$n){return ge.fromWorkingColorSpace(Qe.copy(this),t),Math.round(Xe(Qe.r*255,0,255))*65536+Math.round(Xe(Qe.g*255,0,255))*256+Math.round(Xe(Qe.b*255,0,255))}getHexString(t=$n){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ge.workingColorSpace){ge.fromWorkingColorSpace(Qe.copy(this),e);const n=Qe.r,s=Qe.g,o=Qe.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let h,d;const f=(c+l)/2;if(c===l)h=0,d=0;else{const p=l-c;switch(d=f<=.5?p/(l+c):p/(2-l-c),l){case n:h=(s-o)/p+(s<o?6:0);break;case s:h=(o-n)/p+2;break;case o:h=(n-s)/p+4;break}h/=6}return t.h=h,t.s=d,t.l=f,t}getRGB(t,e=ge.workingColorSpace){return ge.fromWorkingColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=$n){ge.fromWorkingColorSpace(Qe.copy(this),t);const e=Qe.r,n=Qe.g,s=Qe.b;return t!==$n?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ei),this.setHSL(Ei.h+t,Ei.s+e,Ei.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ei),t.getHSL(yo);const n=qa(Ei.h,yo.h,e),s=qa(Ei.s,yo.s,e),o=qa(Ei.l,yo.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qe=new ie;ie.NAMES=Td;let sg=0;class lr extends ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:sg++}),this.uuid=Qr(),this.name="",this.type="Material",this.blending=Wr,this.side=Di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ol,this.blendDst=Ul,this.blendEquation=Ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Hh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yr,this.stencilZFail=yr,this.stencilZPass=yr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Wr&&(n.blending=this.blending),this.side!==Di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ol&&(n.blendSrc=this.blendSrc),this.blendDst!==Ul&&(n.blendDst=this.blendDst),this.blendEquation!==Ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Hh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==yr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==yr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ad extends lr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ue=new Q,xo=new yt;class En{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Vh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Zm("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)xo.fromBufferAttribute(this,e),xo.applyMatrix3(t),this.setXY(e,xo.x,xo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix3(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gs(e,this.array)),e}setX(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gs(e,this.array)),e}setY(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gs(e,this.array)),e}setW(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),s=pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),s=pn(s,this.array),o=pn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Vh&&(t.usage=this.usage),t}}class Cd extends En{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ld extends En{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Me extends En{constructor(t,e,n){super(new Float32Array(t),e,n)}}let og=0;const Ln=new Ae,cl=new $e,Lr=new Q,yn=new Vs,xs=new Vs,Ge=new Q;class Fe extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:og++}),this.uuid=Qr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(wd(t)?Ld:Cd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ce().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ln.makeRotationFromQuaternion(t),this.applyMatrix4(Ln),this}rotateX(t){return Ln.makeRotationX(t),this.applyMatrix4(Ln),this}rotateY(t){return Ln.makeRotationY(t),this.applyMatrix4(Ln),this}rotateZ(t){return Ln.makeRotationZ(t),this.applyMatrix4(Ln),this}translate(t,e,n){return Ln.makeTranslation(t,e,n),this.applyMatrix4(Ln),this}scale(t,e,n){return Ln.makeScale(t,e,n),this.applyMatrix4(Ln),this}lookAt(t){return cl.lookAt(t),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Lr).negate(),this.translate(Lr.x,Lr.y,Lr.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];yn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ca);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const n=this.boundingSphere.center;if(yn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];xs.setFromBufferAttribute(c),this.morphTargetsRelative?(Ge.addVectors(yn.min,xs.min),yn.expandByPoint(Ge),Ge.addVectors(yn.max,xs.max),yn.expandByPoint(Ge)):(yn.expandByPoint(xs.min),yn.expandByPoint(xs.max))}yn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)Ge.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Ge));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],h=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)Ge.fromBufferAttribute(c,d),h&&(Lr.fromBufferAttribute(t,d),Ge.add(Lr)),s=Math.max(s,n.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new En(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],h=[];for(let H=0;H<n.count;H++)c[H]=new Q,h[H]=new Q;const d=new Q,f=new Q,p=new Q,_=new yt,m=new yt,x=new yt,y=new Q,g=new Q;function v(H,I,R){d.fromBufferAttribute(n,H),f.fromBufferAttribute(n,I),p.fromBufferAttribute(n,R),_.fromBufferAttribute(o,H),m.fromBufferAttribute(o,I),x.fromBufferAttribute(o,R),f.sub(d),p.sub(d),m.sub(_),x.sub(_);const W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(W),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(W),c[H].add(y),c[I].add(y),c[R].add(y),h[H].add(g),h[I].add(g),h[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let H=0,I=S.length;H<I;++H){const R=S[H],W=R.start,k=R.count;for(let F=W,A=W+k;F<A;F+=3)v(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const M=new Q,P=new Q,N=new Q,O=new Q;function U(H){N.fromBufferAttribute(s,H),O.copy(N);const I=c[H];M.copy(I),M.sub(N.multiplyScalar(N.dot(I))).normalize(),P.crossVectors(O,I);const W=P.dot(h[H])<0?-1:1;l.setXYZW(H,M.x,M.y,M.z,W)}for(let H=0,I=S.length;H<I;++H){const R=S[H],W=R.start,k=R.count;for(let F=W,A=W+k;F<A;F+=3)U(t.getX(F+0)),U(t.getX(F+1)),U(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new En(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let _=0,m=n.count;_<m;_++)n.setXYZ(_,0,0,0);const s=new Q,o=new Q,l=new Q,c=new Q,h=new Q,d=new Q,f=new Q,p=new Q;if(t)for(let _=0,m=t.count;_<m;_+=3){const x=t.getX(_+0),y=t.getX(_+1),g=t.getX(_+2);s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),l.fromBufferAttribute(e,g),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),c.fromBufferAttribute(n,x),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,g),c.add(f),h.add(f),d.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(y,h.x,h.y,h.z),n.setXYZ(g,d.x,d.y,d.z)}else for(let _=0,m=e.count;_<m;_+=3)s.fromBufferAttribute(e,_+0),o.fromBufferAttribute(e,_+1),l.fromBufferAttribute(e,_+2),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),n.setXYZ(_+0,f.x,f.y,f.z),n.setXYZ(_+1,f.x,f.y,f.z),n.setXYZ(_+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(c,h){const d=c.array,f=c.itemSize,p=c.normalized,_=new d.constructor(h.length*f);let m=0,x=0;for(let y=0,g=h.length;y<g;y++){c.isInterleavedBufferAttribute?m=h[y]*c.data.stride+c.offset:m=h[y]*f;for(let v=0;v<f;v++)_[x++]=d[m++]}return new En(_,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Fe,n=this.index.array,s=this.attributes;for(const c in s){const h=s[c],d=t(h,n);e.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const h=[],d=o[c];for(let f=0,p=d.length;f<p;f++){const _=d[f],m=t(_,n);h.push(m)}e.morphAttributes[c]=h}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,h=l.length;c<h;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const d in h)h[d]!==void 0&&(t[d]=h[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const d=n[h];t.data.attributes[h]=d.toJSON(t.data)}const s={};let o=!1;for(const h in this.morphAttributes){const d=this.morphAttributes[h],f=[];for(let p=0,_=d.length;p<_;p++){const m=d[p];f.push(m.toJSON(t.data))}f.length>0&&(s[h]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const d in s){const f=s[d];this.setAttribute(d,f.clone(e))}const o=t.morphAttributes;for(const d in o){const f=[],p=o[d];for(let _=0,m=p.length;_<m;_++)f.push(p[_].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const nu=new Ae,Xi=new ic,bo=new ca,iu=new Q,Pr=new Q,Rr=new Q,Ir=new Q,hl=new Q,wo=new Q,Mo=new yt,So=new yt,Eo=new yt,ru=new Q,su=new Q,ou=new Q,To=new Q,Ao=new Q;class ke extends $e{constructor(t=new Fe,e=new Ad){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){wo.set(0,0,0);for(let h=0,d=o.length;h<d;h++){const f=c[h],p=o[h];f!==0&&(hl.fromBufferAttribute(p,t),l?wo.addScaledVector(hl,f):wo.addScaledVector(hl.sub(e),f))}e.add(wo)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),bo.copy(n.boundingSphere),bo.applyMatrix4(o),Xi.copy(t.ray).recast(t.near),!(bo.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(bo,iu)===null||Xi.origin.distanceToSquared(iu)>(t.far-t.near)**2))&&(nu.copy(o).invert(),Xi.copy(t.ray).applyMatrix4(nu),!(n.boundingBox!==null&&Xi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Xi)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,h=o.attributes.position,d=o.attributes.uv,f=o.attributes.uv1,p=o.attributes.normal,_=o.groups,m=o.drawRange;if(c!==null)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),M=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=M;P<N;P+=3){const O=c.getX(P),U=c.getX(P+1),H=c.getX(P+2);s=Co(this,v,t,n,d,f,p,O,U,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=c.getX(g),M=c.getX(g+1),P=c.getX(g+2);s=Co(this,l,t,n,d,f,p,S,M,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(h!==void 0)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),M=Math.min(h.count,Math.min(g.start+g.count,m.start+m.count));for(let P=S,N=M;P<N;P+=3){const O=P,U=P+1,H=P+2;s=Co(this,v,t,n,d,f,p,O,U,H),s&&(s.faceIndex=Math.floor(P/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(h.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=g,M=g+1,P=g+2;s=Co(this,l,t,n,d,f,p,S,M,P),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function ag(r,t,e,n,s,o,l,c){let h;if(t.side===_n?h=n.intersectTriangle(l,o,s,!0,c):h=n.intersectTriangle(s,o,l,t.side===Di,c),h===null)return null;Ao.copy(c),Ao.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(Ao);return d<e.near||d>e.far?null:{distance:d,point:Ao.clone(),object:r}}function Co(r,t,e,n,s,o,l,c,h,d){r.getVertexPosition(c,Pr),r.getVertexPosition(h,Rr),r.getVertexPosition(d,Ir);const f=ag(r,t,e,n,Pr,Rr,Ir,To);if(f){s&&(Mo.fromBufferAttribute(s,c),So.fromBufferAttribute(s,h),Eo.fromBufferAttribute(s,d),f.uv=Fn.getInterpolation(To,Pr,Rr,Ir,Mo,So,Eo,new yt)),o&&(Mo.fromBufferAttribute(o,c),So.fromBufferAttribute(o,h),Eo.fromBufferAttribute(o,d),f.uv1=Fn.getInterpolation(To,Pr,Rr,Ir,Mo,So,Eo,new yt)),l&&(ru.fromBufferAttribute(l,c),su.fromBufferAttribute(l,h),ou.fromBufferAttribute(l,d),f.normal=Fn.getInterpolation(To,Pr,Rr,Ir,ru,su,ou,new Q),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:c,b:h,c:d,normal:new Q,materialIndex:0};Fn.getNormal(Pr,Rr,Ir,p.normal),f.face=p}return f}class ln extends Fe{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const h=[],d=[],f=[],p=[];let _=0,m=0;x("z","y","x",-1,-1,n,e,t,l,o,0),x("z","y","x",1,-1,n,e,-t,l,o,1),x("x","z","y",1,1,t,n,e,s,l,2),x("x","z","y",1,-1,t,n,-e,s,l,3),x("x","y","z",1,-1,t,e,n,s,o,4),x("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(h),this.setAttribute("position",new Me(d,3)),this.setAttribute("normal",new Me(f,3)),this.setAttribute("uv",new Me(p,2));function x(y,g,v,S,M,P,N,O,U,H,I){const R=P/U,W=N/H,k=P/2,F=N/2,A=O/2,Z=U+1,at=H+1;let ot=0,j=0;const st=new Q;for(let rt=0;rt<at;rt++){const q=rt*W-F;for(let tt=0;tt<Z;tt++){const Lt=tt*R-k;st[y]=Lt*S,st[g]=q*M,st[v]=A,d.push(st.x,st.y,st.z),st[y]=0,st[g]=0,st[v]=O>0?1:-1,f.push(st.x,st.y,st.z),p.push(tt/U),p.push(1-rt/H),ot+=1}}for(let rt=0;rt<H;rt++)for(let q=0;q<U;q++){const tt=_+q+Z*rt,Lt=_+q+Z*(rt+1),J=_+(q+1)+Z*(rt+1),nt=_+(q+1)+Z*rt;h.push(tt,Lt,nt),h.push(Lt,J,nt),j+=6}c.addGroup(m,j,I),m+=j,_+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Jr(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function an(r){const t={};for(let e=0;e<r.length;e++){const n=Jr(r[e]);for(const s in n)t[s]=n[s]}return t}function lg(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Pd(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ge.workingColorSpace}const cg={clone:Jr,merge:an};var hg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ug=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ni extends lr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hg,this.fragmentShader=ug,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Jr(t.uniforms),this.uniformsGroups=lg(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Rd extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=mi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ti=new Q,au=new yt,lu=new yt;class bn extends Rd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Hl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ls*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Hl*2*Math.atan(Math.tan(Ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-t/Ti.z)}getViewSize(t,e){return this.getViewBounds(t,au,lu),e.subVectors(lu,au)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ls*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const h=l.fullWidth,d=l.fullHeight;o+=l.offsetX*s/h,e-=l.offsetY*n/d,s*=l.width/h,n*=l.height/d}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Dr=-90,Nr=1;class dg extends $e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new bn(Dr,Nr,t,e);s.layers=this.layers,this.add(s);const o=new bn(Dr,Nr,t,e);o.layers=this.layers,this.add(o);const l=new bn(Dr,Nr,t,e);l.layers=this.layers,this.add(l);const c=new bn(Dr,Nr,t,e);c.layers=this.layers,this.add(c);const h=new bn(Dr,Nr,t,e);h.layers=this.layers,this.add(h);const d=new bn(Dr,Nr,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,h]=e;for(const d of e)this.remove(d);if(t===mi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===Jo)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,h,d,f]=this.children,p=t.getRenderTarget(),_=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,h),t.setRenderTarget(n,4,s),t.render(e,d),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(p,_,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Id extends hn{constructor(t,e,n,s,o,l,c,h,d,f){t=t!==void 0?t:[],e=e!==void 0?e:Yr,super(t,e,n,s,o,l,c,h,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class fg extends ir{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Id(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Bn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ln(5,5,5),o=new Ni({name:"CubemapFromEquirect",uniforms:Jr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_n,blending:Pi});o.uniforms.tEquirect.value=e;const l=new ke(s,o),c=e.minFilter;return e.minFilter===nr&&(e.minFilter=Bn),new dg(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const ul=new Q,pg=new Q,mg=new ce;class Ai{constructor(t=new Q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ul.subVectors(n,e).cross(pg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ul),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||mg.getNormalMatrix(t),s=this.coplanarPoint(ul).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qi=new ca,Lo=new Q;class rc{constructor(t=new Ai,e=new Ai,n=new Ai,s=new Ai,o=new Ai,l=new Ai){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=mi){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],h=s[3],d=s[4],f=s[5],p=s[6],_=s[7],m=s[8],x=s[9],y=s[10],g=s[11],v=s[12],S=s[13],M=s[14],P=s[15];if(n[0].setComponents(h-o,_-d,g-m,P-v).normalize(),n[1].setComponents(h+o,_+d,g+m,P+v).normalize(),n[2].setComponents(h+l,_+f,g+x,P+S).normalize(),n[3].setComponents(h-l,_-f,g-x,P-S).normalize(),n[4].setComponents(h-c,_-p,g-y,P-M).normalize(),e===mi)n[5].setComponents(h+c,_+p,g+y,P+M).normalize();else if(e===Jo)n[5].setComponents(c,p,y,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(t){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Lo.x=s.normal.x>0?t.max.x:t.min.x,Lo.y=s.normal.y>0?t.max.y:t.min.y,Lo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Lo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Dd(){let r=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){r=o}}}function gg(r){const t=new WeakMap;function e(c,h){const d=c.array,f=c.usage,p=d.byteLength,_=r.createBuffer();r.bindBuffer(h,_),r.bufferData(h,d,f),c.onUploadCallback();let m;if(d instanceof Float32Array)m=r.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?m=r.HALF_FLOAT:m=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)m=r.SHORT;else if(d instanceof Uint32Array)m=r.UNSIGNED_INT;else if(d instanceof Int32Array)m=r.INT;else if(d instanceof Int8Array)m=r.BYTE;else if(d instanceof Uint8Array)m=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)m=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:m,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,h,d){const f=h.array,p=h._updateRange,_=h.updateRanges;if(r.bindBuffer(d,c),p.count===-1&&_.length===0&&r.bufferSubData(d,0,f),_.length!==0){for(let m=0,x=_.length;m<x;m++){const y=_[m];r.bufferSubData(d,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}h.clearUpdateRanges()}p.count!==-1&&(r.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),h.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=t.get(c);h&&(r.deleteBuffer(h.buffer),t.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,h),d.version=c.version}}return{get:s,remove:o,update:l}}class Gs extends Fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),h=Math.floor(s),d=c+1,f=h+1,p=t/c,_=e/h,m=[],x=[],y=[],g=[];for(let v=0;v<f;v++){const S=v*_-l;for(let M=0;M<d;M++){const P=M*p-o;x.push(P,-S,0),y.push(0,0,1),g.push(M/c),g.push(1-v/h)}}for(let v=0;v<h;v++)for(let S=0;S<c;S++){const M=S+d*v,P=S+d*(v+1),N=S+1+d*(v+1),O=S+1+d*v;m.push(M,P,O),m.push(P,N,O)}this.setIndex(m),this.setAttribute("position",new Me(x,3)),this.setAttribute("normal",new Me(y,3)),this.setAttribute("uv",new Me(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.width,t.height,t.widthSegments,t.heightSegments)}}var _g=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vg=`#ifdef USE_ALPHAHASH
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
#endif`,yg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mg=`#ifdef USE_AOMAP
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
#endif`,Sg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eg=`#ifdef USE_BATCHING
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
#endif`,Tg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ag=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lg=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pg=`#ifdef USE_IRIDESCENCE
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
#endif`,Rg=`#ifdef USE_BUMPMAP
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
#endif`,Ig=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ng=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Og=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ug=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,zg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Bg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Fg=`#define PI 3.141592653589793
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
} // validated`,Hg=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Vg=`vec3 transformedNormal = objectNormal;
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
#endif`,Gg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zg=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qg="gl_FragColor = linearToOutputTexel( gl_FragColor );",jg=`
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
}`,Yg=`#ifdef USE_ENVMAP
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
#endif`,$g=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kg=`#ifdef USE_ENVMAP
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
#endif`,Jg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qg=`#ifdef USE_ENVMAP
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
#endif`,t_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,e_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,r_=`#ifdef USE_GRADIENTMAP
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
}`,s_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,o_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,a_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c_=`uniform bool receiveShadow;
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
#endif`,h_=`#ifdef USE_ENVMAP
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
#endif`,u_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,d_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,f_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,m_=`PhysicalMaterial material;
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
#endif`,g_=`struct PhysicalMaterial {
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
}`,__=`
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
#endif`,v_=`#if defined( RE_IndirectDiffuse )
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
#endif`,y_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,x_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,b_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,S_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,T_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,A_=`#if defined( USE_POINTS_UV )
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
#endif`,C_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,L_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,P_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,R_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,I_=`#ifdef USE_MORPHNORMALS
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
#endif`,D_=`#ifdef USE_MORPHTARGETS
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
#endif`,N_=`#ifdef USE_MORPHTARGETS
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
#endif`,O_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,U_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,k_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,F_=`#ifdef USE_NORMALMAP
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
#endif`,H_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,V_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,G_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,W_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Z_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,X_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,q_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,j_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Q_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ev=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,nv=`float getShadowMask() {
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
}`,iv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rv=`#ifdef USE_SKINNING
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
#endif`,sv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ov=`#ifdef USE_SKINNING
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
#endif`,av=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,hv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,uv=`#ifdef USE_TRANSMISSION
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
#endif`,dv=`#ifdef USE_TRANSMISSION
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
#endif`,fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _v=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vv=`uniform sampler2D t2D;
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
}`,yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`#include <common>
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
}`,Sv=`#if DEPTH_PACKING == 3200
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
}`,Ev=`#define DISTANCE
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
}`,Tv=`#define DISTANCE
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
}`,Av=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lv=`uniform float scale;
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
}`,Pv=`uniform vec3 diffuse;
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
}`,Rv=`#include <common>
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
}`,Iv=`uniform vec3 diffuse;
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
}`,Dv=`#define LAMBERT
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
}`,Nv=`#define LAMBERT
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
}`,Ov=`#define MATCAP
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
}`,Uv=`#define MATCAP
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
}`,kv=`#define NORMAL
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
}`,zv=`#define NORMAL
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
}`,Bv=`#define PHONG
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
}`,Fv=`#define PHONG
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
}`,Hv=`#define STANDARD
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
}`,Vv=`#define STANDARD
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
}`,Gv=`#define TOON
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
}`,Wv=`#define TOON
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
}`,Zv=`uniform float size;
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
}`,Xv=`uniform vec3 diffuse;
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
}`,qv=`#include <common>
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
}`,jv=`uniform vec3 color;
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
}`,Yv=`uniform float rotation;
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
}`,$v=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:_g,alphahash_pars_fragment:vg,alphamap_fragment:yg,alphamap_pars_fragment:xg,alphatest_fragment:bg,alphatest_pars_fragment:wg,aomap_fragment:Mg,aomap_pars_fragment:Sg,batching_pars_vertex:Eg,batching_vertex:Tg,begin_vertex:Ag,beginnormal_vertex:Cg,bsdfs:Lg,iridescence_fragment:Pg,bumpmap_pars_fragment:Rg,clipping_planes_fragment:Ig,clipping_planes_pars_fragment:Dg,clipping_planes_pars_vertex:Ng,clipping_planes_vertex:Og,color_fragment:Ug,color_pars_fragment:kg,color_pars_vertex:zg,color_vertex:Bg,common:Fg,cube_uv_reflection_fragment:Hg,defaultnormal_vertex:Vg,displacementmap_pars_vertex:Gg,displacementmap_vertex:Wg,emissivemap_fragment:Zg,emissivemap_pars_fragment:Xg,colorspace_fragment:qg,colorspace_pars_fragment:jg,envmap_fragment:Yg,envmap_common_pars_fragment:$g,envmap_pars_fragment:Kg,envmap_pars_vertex:Jg,envmap_physical_pars_fragment:h_,envmap_vertex:Qg,fog_vertex:t_,fog_pars_vertex:e_,fog_fragment:n_,fog_pars_fragment:i_,gradientmap_pars_fragment:r_,lightmap_fragment:s_,lightmap_pars_fragment:o_,lights_lambert_fragment:a_,lights_lambert_pars_fragment:l_,lights_pars_begin:c_,lights_toon_fragment:u_,lights_toon_pars_fragment:d_,lights_phong_fragment:f_,lights_phong_pars_fragment:p_,lights_physical_fragment:m_,lights_physical_pars_fragment:g_,lights_fragment_begin:__,lights_fragment_maps:v_,lights_fragment_end:y_,logdepthbuf_fragment:x_,logdepthbuf_pars_fragment:b_,logdepthbuf_pars_vertex:w_,logdepthbuf_vertex:M_,map_fragment:S_,map_pars_fragment:E_,map_particle_fragment:T_,map_particle_pars_fragment:A_,metalnessmap_fragment:C_,metalnessmap_pars_fragment:L_,morphinstance_vertex:P_,morphcolor_vertex:R_,morphnormal_vertex:I_,morphtarget_pars_vertex:D_,morphtarget_vertex:N_,normal_fragment_begin:O_,normal_fragment_maps:U_,normal_pars_fragment:k_,normal_pars_vertex:z_,normal_vertex:B_,normalmap_pars_fragment:F_,clearcoat_normal_fragment_begin:H_,clearcoat_normal_fragment_maps:V_,clearcoat_pars_fragment:G_,iridescence_pars_fragment:W_,opaque_fragment:Z_,packing:X_,premultiplied_alpha_fragment:q_,project_vertex:j_,dithering_fragment:Y_,dithering_pars_fragment:$_,roughnessmap_fragment:K_,roughnessmap_pars_fragment:J_,shadowmap_pars_fragment:Q_,shadowmap_pars_vertex:tv,shadowmap_vertex:ev,shadowmask_pars_fragment:nv,skinbase_vertex:iv,skinning_pars_vertex:rv,skinning_vertex:sv,skinnormal_vertex:ov,specularmap_fragment:av,specularmap_pars_fragment:lv,tonemapping_fragment:cv,tonemapping_pars_fragment:hv,transmission_fragment:uv,transmission_pars_fragment:dv,uv_pars_fragment:fv,uv_pars_vertex:pv,uv_vertex:mv,worldpos_vertex:gv,background_vert:_v,background_frag:vv,backgroundCube_vert:yv,backgroundCube_frag:xv,cube_vert:bv,cube_frag:wv,depth_vert:Mv,depth_frag:Sv,distanceRGBA_vert:Ev,distanceRGBA_frag:Tv,equirect_vert:Av,equirect_frag:Cv,linedashed_vert:Lv,linedashed_frag:Pv,meshbasic_vert:Rv,meshbasic_frag:Iv,meshlambert_vert:Dv,meshlambert_frag:Nv,meshmatcap_vert:Ov,meshmatcap_frag:Uv,meshnormal_vert:kv,meshnormal_frag:zv,meshphong_vert:Bv,meshphong_frag:Fv,meshphysical_vert:Hv,meshphysical_frag:Vv,meshtoon_vert:Gv,meshtoon_frag:Wv,points_vert:Zv,points_frag:Xv,shadow_vert:qv,shadow_frag:jv,sprite_vert:Yv,sprite_frag:$v},Ot={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},Kn={basic:{uniforms:an([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:an([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ie(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:an([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:an([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:an([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new ie(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:an([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:an([Ot.points,Ot.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:an([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:an([Ot.common,Ot.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:an([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:an([Ot.sprite,Ot.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:an([Ot.common,Ot.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:an([Ot.lights,Ot.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};Kn.physical={uniforms:an([Kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const Po={r:0,b:0,g:0},ji=new Wn,Kv=new Ae;function Jv(r,t,e,n,s,o,l){const c=new ie(0);let h=o===!0?0:1,d,f,p=null,_=0,m=null;function x(g,v){let S=!1,M=v.isScene===!0?v.background:null;M&&M.isTexture&&(M=(v.backgroundBlurriness>0?e:t).get(M)),M===null?y(c,h):M&&M.isColor&&(y(M,1),S=!0);const P=r.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,l):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),M&&(M.isCubeTexture||M.mapping===aa)?(f===void 0&&(f=new ke(new ln(1,1,1),new Ni({name:"BackgroundCubeMaterial",uniforms:Jr(Kn.backgroundCube.uniforms),vertexShader:Kn.backgroundCube.vertexShader,fragmentShader:Kn.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(N,O,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),ji.copy(v.backgroundRotation),ji.x*=-1,ji.y*=-1,ji.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(ji.y*=-1,ji.z*=-1),f.material.uniforms.envMap.value=M,f.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(ji)),f.material.toneMapped=ge.getTransfer(M.colorSpace)!==be,(p!==M||_!==M.version||m!==r.toneMapping)&&(f.material.needsUpdate=!0,p=M,_=M.version,m=r.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null)):M&&M.isTexture&&(d===void 0&&(d=new ke(new Gs(2,2),new Ni({name:"BackgroundMaterial",uniforms:Jr(Kn.background.uniforms),vertexShader:Kn.background.vertexShader,fragmentShader:Kn.background.fragmentShader,side:Di,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=M,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.toneMapped=ge.getTransfer(M.colorSpace)!==be,M.matrixAutoUpdate===!0&&M.updateMatrix(),d.material.uniforms.uvTransform.value.copy(M.matrix),(p!==M||_!==M.version||m!==r.toneMapping)&&(d.material.needsUpdate=!0,p=M,_=M.version,m=r.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null))}function y(g,v){g.getRGB(Po,Pd(r)),n.buffers.color.setClear(Po.r,Po.g,Po.b,v,l)}return{getClearColor:function(){return c},setClearColor:function(g,v=1){c.set(g),h=v,y(c,h)},getClearAlpha:function(){return h},setClearAlpha:function(g){h=g,y(c,h)},render:x}}function Qv(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=_(null);let o=s,l=!1;function c(R,W,k,F,A){let Z=!1;const at=p(F,k,W);o!==at&&(o=at,d(o.object)),Z=m(R,F,k,A),Z&&x(R,F,k,A),A!==null&&t.update(A,r.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,P(R,W,k,F),A!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(A).buffer))}function h(){return r.createVertexArray()}function d(R){return r.bindVertexArray(R)}function f(R){return r.deleteVertexArray(R)}function p(R,W,k){const F=k.wireframe===!0;let A=n[R.id];A===void 0&&(A={},n[R.id]=A);let Z=A[W.id];Z===void 0&&(Z={},A[W.id]=Z);let at=Z[F];return at===void 0&&(at=_(h()),Z[F]=at),at}function _(R){const W=[],k=[],F=[];for(let A=0;A<e;A++)W[A]=0,k[A]=0,F[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:k,attributeDivisors:F,object:R,attributes:{},index:null}}function m(R,W,k,F){const A=o.attributes,Z=W.attributes;let at=0;const ot=k.getAttributes();for(const j in ot)if(ot[j].location>=0){const rt=A[j];let q=Z[j];if(q===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),rt===void 0||rt.attribute!==q||q&&rt.data!==q.data)return!0;at++}return o.attributesNum!==at||o.index!==F}function x(R,W,k,F){const A={},Z=W.attributes;let at=0;const ot=k.getAttributes();for(const j in ot)if(ot[j].location>=0){let rt=Z[j];rt===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(rt=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(rt=R.instanceColor));const q={};q.attribute=rt,rt&&rt.data&&(q.data=rt.data),A[j]=q,at++}o.attributes=A,o.attributesNum=at,o.index=F}function y(){const R=o.newAttributes;for(let W=0,k=R.length;W<k;W++)R[W]=0}function g(R){v(R,0)}function v(R,W){const k=o.newAttributes,F=o.enabledAttributes,A=o.attributeDivisors;k[R]=1,F[R]===0&&(r.enableVertexAttribArray(R),F[R]=1),A[R]!==W&&(r.vertexAttribDivisor(R,W),A[R]=W)}function S(){const R=o.newAttributes,W=o.enabledAttributes;for(let k=0,F=W.length;k<F;k++)W[k]!==R[k]&&(r.disableVertexAttribArray(k),W[k]=0)}function M(R,W,k,F,A,Z,at){at===!0?r.vertexAttribIPointer(R,W,k,A,Z):r.vertexAttribPointer(R,W,k,F,A,Z)}function P(R,W,k,F){y();const A=F.attributes,Z=k.getAttributes(),at=W.defaultAttributeValues;for(const ot in Z){const j=Z[ot];if(j.location>=0){let st=A[ot];if(st===void 0&&(ot==="instanceMatrix"&&R.instanceMatrix&&(st=R.instanceMatrix),ot==="instanceColor"&&R.instanceColor&&(st=R.instanceColor)),st!==void 0){const rt=st.normalized,q=st.itemSize,tt=t.get(st);if(tt===void 0)continue;const Lt=tt.buffer,J=tt.type,nt=tt.bytesPerElement,wt=J===r.INT||J===r.UNSIGNED_INT||st.gpuType===pd;if(st.isInterleavedBufferAttribute){const St=st.data,Pt=St.stride,It=st.offset;if(St.isInstancedInterleavedBuffer){for(let kt=0;kt<j.locationSize;kt++)v(j.location+kt,St.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let kt=0;kt<j.locationSize;kt++)g(j.location+kt);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let kt=0;kt<j.locationSize;kt++)M(j.location+kt,q/j.locationSize,J,rt,Pt*nt,(It+q/j.locationSize*kt)*nt,wt)}else{if(st.isInstancedBufferAttribute){for(let St=0;St<j.locationSize;St++)v(j.location+St,st.meshPerAttribute);R.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let St=0;St<j.locationSize;St++)g(j.location+St);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let St=0;St<j.locationSize;St++)M(j.location+St,q/j.locationSize,J,rt,q*nt,q/j.locationSize*St*nt,wt)}}else if(at!==void 0){const rt=at[ot];if(rt!==void 0)switch(rt.length){case 2:r.vertexAttrib2fv(j.location,rt);break;case 3:r.vertexAttrib3fv(j.location,rt);break;case 4:r.vertexAttrib4fv(j.location,rt);break;default:r.vertexAttrib1fv(j.location,rt)}}}}S()}function N(){H();for(const R in n){const W=n[R];for(const k in W){const F=W[k];for(const A in F)f(F[A].object),delete F[A];delete W[k]}delete n[R]}}function O(R){if(n[R.id]===void 0)return;const W=n[R.id];for(const k in W){const F=W[k];for(const A in F)f(F[A].object),delete F[A];delete W[k]}delete n[R.id]}function U(R){for(const W in n){const k=n[W];if(k[R.id]===void 0)continue;const F=k[R.id];for(const A in F)f(F[A].object),delete F[A];delete k[R.id]}}function H(){I(),l=!0,o!==s&&(o=s,d(o.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:H,resetDefaultState:I,dispose:N,releaseStatesOfGeometry:O,releaseStatesOfProgram:U,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function t0(r,t,e){let n;function s(h){n=h}function o(h,d){r.drawArrays(n,h,d),e.update(d,n,1)}function l(h,d,f){f!==0&&(r.drawArraysInstanced(n,h,d,f),e.update(d,n,f))}function c(h,d,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(h[_],d[_]);else{p.multiDrawArraysWEBGL(n,h,0,d,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];e.update(_,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function e0(r,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const h=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),g=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:v,maxSamples:S}}function n0(r){const t=this;let e=null,n=0,s=!1,o=!1;const l=new Ai,c=new ce,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(p,_){const m=p.length!==0||_||n!==0||s;return s=_,n=p.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,_){e=f(p,_,0)},this.setState=function(p,_,m){const x=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,v=r.get(p);if(!s||x===null||x.length===0||o&&!g)o?f(null):d();else{const S=o?0:n,M=S*4;let P=v.clippingState||null;h.value=P,P=f(x,_,M,m);for(let N=0;N!==M;++N)P[N]=e[N];v.clippingState=P,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function d(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,_,m,x){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=h.value,x!==!0||g===null){const v=m+y*4,S=_.matrixWorldInverse;c.getNormalMatrix(S),(g===null||g.length<v)&&(g=new Float32Array(v));for(let M=0,P=m;M!==y;++M,P+=4)l.copy(p[M]).applyMatrix4(S,c),l.normal.toArray(g,P),g[P+3]=l.constant}h.value=g,h.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}function i0(r){let t=new WeakMap;function e(l,c){return c===kl?l.mapping=Yr:c===zl&&(l.mapping=$r),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===kl||c===zl)if(t.has(l)){const h=t.get(l).texture;return e(h,l.mapping)}else{const h=l.image;if(h&&h.height>0){const d=new fg(h.height);return d.fromEquirectangularTexture(r,l),t.set(l,d),l.addEventListener("dispose",s),e(d.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Nd extends Rd{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,h=s-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,l=o+d*this.view.width,c-=f*this.view.offsetY,h=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Fr=4,cu=[.125,.215,.35,.446,.526,.582],Ji=20,dl=new Nd,hu=new ie;let fl=null,pl=0,ml=0,gl=!1;const $i=(1+Math.sqrt(5))/2,Or=1/$i,uu=[new Q(1,1,1),new Q(-1,1,1),new Q(1,1,-1),new Q(-1,1,-1),new Q(0,$i,Or),new Q(0,$i,-Or),new Q(Or,0,$i),new Q(-Or,0,$i),new Q($i,Or,0),new Q(-$i,Or,0)];class du{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(fl,pl,ml),this._renderer.xr.enabled=gl,t.scissorTest=!1,Ro(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Yr||t.mapping===$r?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),fl=this._renderer.getRenderTarget(),pl=this._renderer.getActiveCubeFace(),ml=this._renderer.getActiveMipmapLevel(),gl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:jo,format:Qn,colorSpace:Ui,depthBuffer:!1},s=fu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fu(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=r0(o)),this._blurMaterial=s0(o,t,e)}return s}_compileMaterial(t){const e=new ke(this._lodPlanes[0],t);this._renderer.compile(e,dl)}_sceneToCubeUV(t,e,n,s){const c=new bn(90,1,e,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,_=f.toneMapping;f.getClearColor(hu),f.toneMapping=Ri,f.autoClear=!1;const m=new Ad({name:"PMREM.Background",side:_n,depthWrite:!1,depthTest:!1}),x=new ke(new ln,m);let y=!1;const g=t.background;g?g.isColor&&(m.color.copy(g),t.background=null,y=!0):(m.color.copy(hu),y=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(c.up.set(0,h[v],0),c.lookAt(d[v],0,0)):S===1?(c.up.set(0,0,h[v]),c.lookAt(0,d[v],0)):(c.up.set(0,h[v],0),c.lookAt(0,0,d[v]));const M=this._cubeSize;Ro(s,S*M,v>2?M:0,M,M),f.setRenderTarget(s),y&&f.render(x,c),f.render(t,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=_,f.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Yr||t.mapping===$r;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pu());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new ke(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const h=this._cubeSize;Ro(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(l,dl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=uu[(s-1)%uu.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const h=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new ke(this._lodPlanes[s],d),_=d.uniforms,m=this._sizeLods[n]-1,x=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*Ji-1),y=o/x,g=isFinite(o)?1+Math.floor(f*y):Ji;g>Ji&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ji}`);const v=[];let S=0;for(let U=0;U<Ji;++U){const H=U/y,I=Math.exp(-H*H/2);v.push(I),U===0?S+=I:U<g&&(S+=2*I)}for(let U=0;U<v.length;U++)v[U]=v[U]/S;_.envMap.value=t.texture,_.samples.value=g,_.weights.value=v,_.latitudinal.value=l==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:M}=this;_.dTheta.value=x,_.mipInt.value=M-n;const P=this._sizeLods[s],N=3*P*(s>M-Fr?s-M+Fr:0),O=4*(this._cubeSize-P);Ro(e,N,O,3*P,2*P),h.setRenderTarget(e),h.render(p,dl)}}function r0(r){const t=[],e=[],n=[];let s=r;const o=r-Fr+1+cu.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let h=1/c;l>r-Fr?h=cu[l-r+Fr-1]:l===0&&(h=0),n.push(h);const d=1/(c-2),f=-d,p=1+d,_=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,y=3,g=2,v=1,S=new Float32Array(y*x*m),M=new Float32Array(g*x*m),P=new Float32Array(v*x*m);for(let O=0;O<m;O++){const U=O%3*2/3-1,H=O>2?0:-1,I=[U,H,0,U+2/3,H,0,U+2/3,H+1,0,U,H,0,U+2/3,H+1,0,U,H+1,0];S.set(I,y*x*O),M.set(_,g*x*O);const R=[O,O,O,O,O,O];P.set(R,v*x*O)}const N=new Fe;N.setAttribute("position",new En(S,y)),N.setAttribute("uv",new En(M,g)),N.setAttribute("faceIndex",new En(P,v)),t.push(N),s>Fr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function fu(r,t,e){const n=new ir(r,t,e);return n.texture.mapping=aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ro(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function s0(r,t,e){const n=new Float32Array(Ji),s=new Q(0,1,0);return new Ni({name:"SphericalGaussianBlur",defines:{n:Ji,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:sc(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function pu(){return new Ni({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:sc(),fragmentShader:`

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
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function mu(){return new Ni({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:sc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pi,depthTest:!1,depthWrite:!1})}function sc(){return`

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
	`}function o0(r){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const h=c.mapping,d=h===kl||h===zl,f=h===Yr||h===$r;if(d||f){let p=t.get(c);const _=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==_)return e===null&&(e=new du(r)),p=d?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const m=c.image;return d&&m&&m.height>0||f&&m&&s(m)?(e===null&&(e=new du(r)),p=d?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function s(c){let h=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&h++;return h===d}function o(c){const h=c.target;h.removeEventListener("dispose",o);const d=t.get(h);d!==void 0&&(t.delete(h),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function a0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function l0(r,t,e,n){const s={},o=new WeakMap;function l(p){const _=p.target;_.index!==null&&t.remove(_.index);for(const x in _.attributes)t.remove(_.attributes[x]);for(const x in _.morphAttributes){const y=_.morphAttributes[x];for(let g=0,v=y.length;g<v;g++)t.remove(y[g])}_.removeEventListener("dispose",l),delete s[_.id];const m=o.get(_);m&&(t.remove(m),o.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(p,_){return s[_.id]===!0||(_.addEventListener("dispose",l),s[_.id]=!0,e.memory.geometries++),_}function h(p){const _=p.attributes;for(const x in _)t.update(_[x],r.ARRAY_BUFFER);const m=p.morphAttributes;for(const x in m){const y=m[x];for(let g=0,v=y.length;g<v;g++)t.update(y[g],r.ARRAY_BUFFER)}}function d(p){const _=[],m=p.index,x=p.attributes.position;let y=0;if(m!==null){const S=m.array;y=m.version;for(let M=0,P=S.length;M<P;M+=3){const N=S[M+0],O=S[M+1],U=S[M+2];_.push(N,O,O,U,U,N)}}else if(x!==void 0){const S=x.array;y=x.version;for(let M=0,P=S.length/3-1;M<P;M+=3){const N=M+0,O=M+1,U=M+2;_.push(N,O,O,U,U,N)}}else return;const g=new(wd(_)?Ld:Cd)(_,1);g.version=y;const v=o.get(p);v&&t.remove(v),o.set(p,g)}function f(p){const _=o.get(p);if(_){const m=p.index;m!==null&&_.version<m.version&&d(p)}else d(p);return o.get(p)}return{get:c,update:h,getWireframeAttribute:f}}function c0(r,t,e){let n;function s(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function h(p,_){r.drawElements(n,_,o,p*l),e.update(_,n,1)}function d(p,_,m){m!==0&&(r.drawElementsInstanced(n,_,o,p*l,m),e.update(_,n,m))}function f(p,_,m){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<m;y++)this.render(p[y]/l,_[y]);else{x.multiDrawElementsWEBGL(n,_,0,o,p,0,m);let y=0;for(let g=0;g<m;g++)y+=_[g];e.update(y,n,1)}}this.setMode=s,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function h0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case r.TRIANGLES:e.triangles+=c*(o/3);break;case r.LINES:e.lines+=c*(o/2);break;case r.LINE_STRIP:e.lines+=c*(o-1);break;case r.LINE_LOOP:e.lines+=c*o;break;case r.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function u0(r,t,e){const n=new WeakMap,s=new qe;function o(l,c,h){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let _=n.get(c);if(_===void 0||_.count!==p){let I=function(){U.dispose(),n.delete(c),c.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let M=0;m===!0&&(M=1),x===!0&&(M=2),y===!0&&(M=3);let P=c.attributes.position.count*M,N=1;P>t.maxTextureSize&&(N=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const O=new Float32Array(P*N*4*p),U=new Sd(O,P,N,p);U.type=Li,U.needsUpdate=!0;const H=M*4;for(let R=0;R<p;R++){const W=g[R],k=v[R],F=S[R],A=P*N*4*R;for(let Z=0;Z<W.count;Z++){const at=Z*H;m===!0&&(s.fromBufferAttribute(W,Z),O[A+at+0]=s.x,O[A+at+1]=s.y,O[A+at+2]=s.z,O[A+at+3]=0),x===!0&&(s.fromBufferAttribute(k,Z),O[A+at+4]=s.x,O[A+at+5]=s.y,O[A+at+6]=s.z,O[A+at+7]=0),y===!0&&(s.fromBufferAttribute(F,Z),O[A+at+8]=s.x,O[A+at+9]=s.y,O[A+at+10]=s.z,O[A+at+11]=F.itemSize===4?s.w:1)}}_={count:p,texture:U,size:new yt(P,N)},n.set(c,_),c.addEventListener("dispose",I)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)h.getUniforms().setValue(r,"morphTexture",l.morphTexture,e);else{let m=0;for(let y=0;y<d.length;y++)m+=d[y];const x=c.morphTargetsRelative?1:1-m;h.getUniforms().setValue(r,"morphTargetBaseInfluence",x),h.getUniforms().setValue(r,"morphTargetInfluences",d)}h.getUniforms().setValue(r,"morphTargetsTexture",_.texture,e),h.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:o}}function d0(r,t,e,n){let s=new WeakMap;function o(h){const d=n.render.frame,f=h.geometry,p=t.get(h,f);if(s.get(p)!==d&&(t.update(p),s.set(p,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),s.get(h)!==d&&(e.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,r.ARRAY_BUFFER),s.set(h,d))),h.isSkinnedMesh){const _=h.skeleton;s.get(_)!==d&&(_.update(),s.set(_,d))}return p}function l(){s=new WeakMap}function c(h){const d=h.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:l}}class Od extends hn{constructor(t,e,n,s,o,l,c,h,d,f){if(f=f!==void 0?f:Zr,f!==Zr&&f!==Os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===Zr&&(n=Kr),n===void 0&&f===Os&&(n=Hs),super(null,s,o,l,c,h,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Rn,this.minFilter=h!==void 0?h:Rn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ud=new hn,kd=new Od(1,1);kd.compareFunction=bd;const zd=new Sd,Bd=new Km,Fd=new Id,gu=[],_u=[],vu=new Float32Array(16),yu=new Float32Array(9),xu=new Float32Array(4);function ts(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let o=gu[s];if(o===void 0&&(o=new Float32Array(s),gu[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,r[l].toArray(o,c)}return o}function ze(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Be(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function ha(r,t){let e=_u[t];e===void 0&&(e=new Int32Array(t),_u[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function f0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function p0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2fv(this.addr,t),Be(e,t)}}function m0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ze(e,t))return;r.uniform3fv(this.addr,t),Be(e,t)}}function g0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4fv(this.addr,t),Be(e,t)}}function _0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(ze(e,n))return;xu.set(n),r.uniformMatrix2fv(this.addr,!1,xu),Be(e,n)}}function v0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(ze(e,n))return;yu.set(n),r.uniformMatrix3fv(this.addr,!1,yu),Be(e,n)}}function y0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(ze(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(ze(e,n))return;vu.set(n),r.uniformMatrix4fv(this.addr,!1,vu),Be(e,n)}}function x0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function b0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2iv(this.addr,t),Be(e,t)}}function w0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3iv(this.addr,t),Be(e,t)}}function M0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4iv(this.addr,t),Be(e,t)}}function S0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function E0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ze(e,t))return;r.uniform2uiv(this.addr,t),Be(e,t)}}function T0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ze(e,t))return;r.uniform3uiv(this.addr,t),Be(e,t)}}function A0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ze(e,t))return;r.uniform4uiv(this.addr,t),Be(e,t)}}function C0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);const o=this.type===r.SAMPLER_2D_SHADOW?kd:Ud;e.setTexture2D(t||o,s)}function L0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Bd,s)}function P0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Fd,s)}function R0(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||zd,s)}function I0(r){switch(r){case 5126:return f0;case 35664:return p0;case 35665:return m0;case 35666:return g0;case 35674:return _0;case 35675:return v0;case 35676:return y0;case 5124:case 35670:return x0;case 35667:case 35671:return b0;case 35668:case 35672:return w0;case 35669:case 35673:return M0;case 5125:return S0;case 36294:return E0;case 36295:return T0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return C0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return R0}}function D0(r,t){r.uniform1fv(this.addr,t)}function N0(r,t){const e=ts(t,this.size,2);r.uniform2fv(this.addr,e)}function O0(r,t){const e=ts(t,this.size,3);r.uniform3fv(this.addr,e)}function U0(r,t){const e=ts(t,this.size,4);r.uniform4fv(this.addr,e)}function k0(r,t){const e=ts(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function z0(r,t){const e=ts(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function B0(r,t){const e=ts(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function F0(r,t){r.uniform1iv(this.addr,t)}function H0(r,t){r.uniform2iv(this.addr,t)}function V0(r,t){r.uniform3iv(this.addr,t)}function G0(r,t){r.uniform4iv(this.addr,t)}function W0(r,t){r.uniform1uiv(this.addr,t)}function Z0(r,t){r.uniform2uiv(this.addr,t)}function X0(r,t){r.uniform3uiv(this.addr,t)}function q0(r,t){r.uniform4uiv(this.addr,t)}function j0(r,t,e){const n=this.cache,s=t.length,o=ha(e,s);ze(n,o)||(r.uniform1iv(this.addr,o),Be(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||Ud,o[l])}function Y0(r,t,e){const n=this.cache,s=t.length,o=ha(e,s);ze(n,o)||(r.uniform1iv(this.addr,o),Be(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||Bd,o[l])}function $0(r,t,e){const n=this.cache,s=t.length,o=ha(e,s);ze(n,o)||(r.uniform1iv(this.addr,o),Be(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||Fd,o[l])}function K0(r,t,e){const n=this.cache,s=t.length,o=ha(e,s);ze(n,o)||(r.uniform1iv(this.addr,o),Be(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||zd,o[l])}function J0(r){switch(r){case 5126:return D0;case 35664:return N0;case 35665:return O0;case 35666:return U0;case 35674:return k0;case 35675:return z0;case 35676:return B0;case 5124:case 35670:return F0;case 35667:case 35671:return H0;case 35668:case 35672:return V0;case 35669:case 35673:return G0;case 5125:return W0;case 36294:return Z0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return j0;case 35679:case 36299:case 36307:return Y0;case 35680:case 36300:case 36308:case 36293:return $0;case 36289:case 36303:case 36311:case 36292:return K0}}class Q0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=I0(e.type)}}class ty{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=J0(e.type)}}class ey{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const _l=/(\w+)(\])?(\[|\.)?/g;function bu(r,t){r.seq.push(t),r.map[t.id]=t}function ny(r,t,e){const n=r.name,s=n.length;for(_l.lastIndex=0;;){const o=_l.exec(n),l=_l.lastIndex;let c=o[1];const h=o[2]==="]",d=o[3];if(h&&(c=c|0),d===void 0||d==="["&&l+2===s){bu(e,d===void 0?new Q0(c,r,t):new ty(c,r,t));break}else{let p=e.map[c];p===void 0&&(p=new ey(c),bu(e,p)),e=p}}}class Go{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);ny(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],h=n[c.id];h.needsUpdate!==!1&&c.setValue(t,h.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function wu(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const iy=37297;let ry=0;function sy(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function oy(r){const t=ge.getPrimaries(ge.workingColorSpace),e=ge.getPrimaries(r);let n;switch(t===e?n="":t===Ko&&e===$o?n="LinearDisplayP3ToLinearSRGB":t===$o&&e===Ko&&(n="LinearSRGBToLinearDisplayP3"),r){case Ui:case la:return[n,"LinearTransferOETF"];case $n:case nc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Mu(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+sy(r.getShaderSource(t),l)}else return s}function ay(r,t){const e=oy(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function ly(r,t){let e;switch(t){case ud:e="Linear";break;case mm:e="Reinhard";break;case gm:e="OptimizedCineon";break;case _m:e="ACESFilmic";break;case ym:e="AgX";break;case xm:e="Neutral";break;case vm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function cy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ts).join(`
`)}function hy(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function uy(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=r.getActiveAttrib(t,s),l=o.name;let c=1;o.type===r.FLOAT_MAT2&&(c=2),o.type===r.FLOAT_MAT3&&(c=3),o.type===r.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:r.getAttribLocation(t,l),locationSize:c}}return e}function Ts(r){return r!==""}function Su(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Eu(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const dy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Vl(r){return r.replace(dy,py)}const fy=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function py(r,t){let e=le[t];if(e===void 0){const n=fy.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Vl(e)}const my=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Tu(r){return r.replace(my,gy)}function gy(r,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Au(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function _y(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===hd?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Hp?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===di&&(t="SHADOWMAP_TYPE_VSM"),t}function vy(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Yr:case $r:t="ENVMAP_TYPE_CUBE";break;case aa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function yy(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case $r:t="ENVMAP_MODE_REFRACTION";break}return t}function xy(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case tc:t="ENVMAP_BLENDING_MULTIPLY";break;case fm:t="ENVMAP_BLENDING_MIX";break;case pm:t="ENVMAP_BLENDING_ADD";break}return t}function by(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function wy(r,t,e,n){const s=r.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const h=_y(e),d=vy(e),f=yy(e),p=xy(e),_=by(e),m=cy(e),x=hy(o),y=s.createProgram();let g,v,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ts).join(`
`),g.length>0&&(g+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ts).join(`
`),v.length>0&&(v+=`
`)):(g=[Au(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ts).join(`
`),v=[Au(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ri?"#define TONE_MAPPING":"",e.toneMapping!==Ri?le.tonemapping_pars_fragment:"",e.toneMapping!==Ri?ly("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,ay("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ts).join(`
`)),l=Vl(l),l=Su(l,e),l=Eu(l,e),c=Vl(c),c=Su(c,e),c=Eu(c,e),l=Tu(l),c=Tu(c),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,v=["#define varying in",e.glslVersion===Gh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const M=S+g+l,P=S+v+c,N=wu(s,s.VERTEX_SHADER,M),O=wu(s,s.FRAGMENT_SHADER,P);s.attachShader(y,N),s.attachShader(y,O),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function U(W){if(r.debug.checkShaderErrors){const k=s.getProgramInfoLog(y).trim(),F=s.getShaderInfoLog(N).trim(),A=s.getShaderInfoLog(O).trim();let Z=!0,at=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,y,N,O);else{const ot=Mu(s,N,"vertex"),j=Mu(s,O,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+k+`
`+ot+`
`+j)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(F===""||A==="")&&(at=!1);at&&(W.diagnostics={runnable:Z,programLog:k,vertexShader:{log:F,prefix:g},fragmentShader:{log:A,prefix:v}})}s.deleteShader(N),s.deleteShader(O),H=new Go(s,y),I=uy(s,y)}let H;this.getUniforms=function(){return H===void 0&&U(this),H};let I;this.getAttributes=function(){return I===void 0&&U(this),I};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(y,iy)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ry++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=O,this}let My=0;class Sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ey(t),e.set(t,n)),n}}class Ey{constructor(t){this.id=My++,this.code=t,this.usedTimes=0}}function Ty(r,t,e,n,s,o,l){const c=new Ed,h=new Sy,d=new Set,f=[],p=s.logarithmicDepthBuffer,_=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(I){return d.add(I),I===0?"uv":`uv${I}`}function g(I,R,W,k,F){const A=k.fog,Z=F.geometry,at=I.isMeshStandardMaterial?k.environment:null,ot=(I.isMeshStandardMaterial?e:t).get(I.envMap||at),j=ot&&ot.mapping===aa?ot.image.height:null,st=x[I.type];I.precision!==null&&(m=s.getMaxPrecision(I.precision),m!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",m,"instead."));const rt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,q=rt!==void 0?rt.length:0;let tt=0;Z.morphAttributes.position!==void 0&&(tt=1),Z.morphAttributes.normal!==void 0&&(tt=2),Z.morphAttributes.color!==void 0&&(tt=3);let Lt,J,nt,wt;if(st){const Ie=Kn[st];Lt=Ie.vertexShader,J=Ie.fragmentShader}else Lt=I.vertexShader,J=I.fragmentShader,h.update(I),nt=h.getVertexShaderID(I),wt=h.getFragmentShaderID(I);const St=r.getRenderTarget(),Pt=F.isInstancedMesh===!0,It=F.isBatchedMesh===!0,kt=!!I.map,it=!!I.matcap,vt=!!ot,xt=!!I.aoMap,E=!!I.lightMap,et=!!I.bumpMap,$=!!I.normalMap,C=!!I.displacementMap,w=!!I.emissiveMap,B=!!I.metalnessMap,X=!!I.roughnessMap,K=I.anisotropy>0,G=I.clearcoat>0,ft=I.iridescence>0,lt=I.sheen>0,pt=I.transmission>0,Tt=K&&!!I.anisotropyMap,Et=G&&!!I.clearcoatMap,At=G&&!!I.clearcoatNormalMap,Ht=G&&!!I.clearcoatRoughnessMap,zt=ft&&!!I.iridescenceMap,Dt=ft&&!!I.iridescenceThicknessMap,Kt=lt&&!!I.sheenColorMap,Vt=lt&&!!I.sheenRoughnessMap,oe=!!I.specularMap,ae=!!I.specularColorMap,Qt=!!I.specularIntensityMap,Ft=pt&&!!I.transmissionMap,D=pt&&!!I.thicknessMap,ut=!!I.gradientMap,Mt=!!I.alphaMap,Rt=I.alphaTest>0,Nt=!!I.alphaHash,re=!!I.extensions;let he=Ri;I.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(he=r.toneMapping);const _e={shaderID:st,shaderType:I.type,shaderName:I.name,vertexShader:Lt,fragmentShader:J,defines:I.defines,customVertexShaderID:nt,customFragmentShaderID:wt,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:m,batching:It,instancing:Pt,instancingColor:Pt&&F.instanceColor!==null,instancingMorph:Pt&&F.morphTexture!==null,supportsVertexTextures:_,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:Ui,alphaToCoverage:!!I.alphaToCoverage,map:kt,matcap:it,envMap:vt,envMapMode:vt&&ot.mapping,envMapCubeUVHeight:j,aoMap:xt,lightMap:E,bumpMap:et,normalMap:$,displacementMap:_&&C,emissiveMap:w,normalMapObjectSpace:$&&I.normalMapType===Nm,normalMapTangentSpace:$&&I.normalMapType===ec,metalnessMap:B,roughnessMap:X,anisotropy:K,anisotropyMap:Tt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:At,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:zt,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Vt,specularMap:oe,specularColorMap:ae,specularIntensityMap:Qt,transmission:pt,transmissionMap:Ft,thicknessMap:D,gradientMap:ut,opaque:I.transparent===!1&&I.blending===Wr&&I.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Rt,alphaHash:Nt,combine:I.combine,mapUv:kt&&y(I.map.channel),aoMapUv:xt&&y(I.aoMap.channel),lightMapUv:E&&y(I.lightMap.channel),bumpMapUv:et&&y(I.bumpMap.channel),normalMapUv:$&&y(I.normalMap.channel),displacementMapUv:C&&y(I.displacementMap.channel),emissiveMapUv:w&&y(I.emissiveMap.channel),metalnessMapUv:B&&y(I.metalnessMap.channel),roughnessMapUv:X&&y(I.roughnessMap.channel),anisotropyMapUv:Tt&&y(I.anisotropyMap.channel),clearcoatMapUv:Et&&y(I.clearcoatMap.channel),clearcoatNormalMapUv:At&&y(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(I.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&y(I.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&y(I.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(I.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&y(I.sheenRoughnessMap.channel),specularMapUv:oe&&y(I.specularMap.channel),specularColorMapUv:ae&&y(I.specularColorMap.channel),specularIntensityMapUv:Qt&&y(I.specularIntensityMap.channel),transmissionMapUv:Ft&&y(I.transmissionMap.channel),thicknessMapUv:D&&y(I.thicknessMap.channel),alphaMapUv:Mt&&y(I.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&($||K),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Z.attributes.uv&&(kt||Mt),fog:!!A,useFog:I.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:F.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:tt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:I.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:he,useLegacyLights:r._useLegacyLights,decodeVideoTexture:kt&&I.map.isVideoTexture===!0&&ge.getTransfer(I.map.colorSpace)===be,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===mn,flipSided:I.side===_n,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:re&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:re&&I.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return _e.vertexUv1s=d.has(1),_e.vertexUv2s=d.has(2),_e.vertexUv3s=d.has(3),d.clear(),_e}function v(I){const R=[];if(I.shaderID?R.push(I.shaderID):(R.push(I.customVertexShaderID),R.push(I.customFragmentShaderID)),I.defines!==void 0)for(const W in I.defines)R.push(W),R.push(I.defines[W]);return I.isRawShaderMaterial===!1&&(S(R,I),M(R,I),R.push(r.outputColorSpace)),R.push(I.customProgramCacheKey),R.join()}function S(I,R){I.push(R.precision),I.push(R.outputColorSpace),I.push(R.envMapMode),I.push(R.envMapCubeUVHeight),I.push(R.mapUv),I.push(R.alphaMapUv),I.push(R.lightMapUv),I.push(R.aoMapUv),I.push(R.bumpMapUv),I.push(R.normalMapUv),I.push(R.displacementMapUv),I.push(R.emissiveMapUv),I.push(R.metalnessMapUv),I.push(R.roughnessMapUv),I.push(R.anisotropyMapUv),I.push(R.clearcoatMapUv),I.push(R.clearcoatNormalMapUv),I.push(R.clearcoatRoughnessMapUv),I.push(R.iridescenceMapUv),I.push(R.iridescenceThicknessMapUv),I.push(R.sheenColorMapUv),I.push(R.sheenRoughnessMapUv),I.push(R.specularMapUv),I.push(R.specularColorMapUv),I.push(R.specularIntensityMapUv),I.push(R.transmissionMapUv),I.push(R.thicknessMapUv),I.push(R.combine),I.push(R.fogExp2),I.push(R.sizeAttenuation),I.push(R.morphTargetsCount),I.push(R.morphAttributeCount),I.push(R.numDirLights),I.push(R.numPointLights),I.push(R.numSpotLights),I.push(R.numSpotLightMaps),I.push(R.numHemiLights),I.push(R.numRectAreaLights),I.push(R.numDirLightShadows),I.push(R.numPointLightShadows),I.push(R.numSpotLightShadows),I.push(R.numSpotLightShadowsWithMaps),I.push(R.numLightProbes),I.push(R.shadowMapType),I.push(R.toneMapping),I.push(R.numClippingPlanes),I.push(R.numClipIntersection),I.push(R.depthPacking)}function M(I,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),I.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.skinning&&c.enable(4),R.morphTargets&&c.enable(5),R.morphNormals&&c.enable(6),R.morphColors&&c.enable(7),R.premultipliedAlpha&&c.enable(8),R.shadowMapEnabled&&c.enable(9),R.useLegacyLights&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.alphaToCoverage&&c.enable(20),I.push(c.mask)}function P(I){const R=x[I.type];let W;if(R){const k=Kn[R];W=cg.clone(k.uniforms)}else W=I.uniforms;return W}function N(I,R){let W;for(let k=0,F=f.length;k<F;k++){const A=f[k];if(A.cacheKey===R){W=A,++W.usedTimes;break}}return W===void 0&&(W=new wy(r,R,I,o),f.push(W)),W}function O(I){if(--I.usedTimes===0){const R=f.indexOf(I);f[R]=f[f.length-1],f.pop(),I.destroy()}}function U(I){h.remove(I)}function H(){h.dispose()}return{getParameters:g,getProgramCacheKey:v,getUniforms:P,acquireProgram:N,releaseProgram:O,releaseShaderCache:U,programs:f,dispose:H}}function Ay(){let r=new WeakMap;function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function e(o){r.delete(o)}function n(o,l,c){r.get(o)[l]=c}function s(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Cy(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Cu(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Lu(){const r=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(p,_,m,x,y,g){let v=r[t];return v===void 0?(v={id:p.id,object:p,geometry:_,material:m,groupOrder:x,renderOrder:p.renderOrder,z:y,group:g},r[t]=v):(v.id=p.id,v.object=p,v.geometry=_,v.material=m,v.groupOrder=x,v.renderOrder=p.renderOrder,v.z=y,v.group=g),t++,v}function c(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.push(v):m.transparent===!0?s.push(v):e.push(v)}function h(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function d(p,_){e.length>1&&e.sort(p||Cy),n.length>1&&n.sort(_||Cu),s.length>1&&s.sort(_||Cu)}function f(){for(let p=t,_=r.length;p<_;p++){const m=r[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:h,finish:f,sort:d}}function Ly(){let r=new WeakMap;function t(n,s){const o=r.get(n);let l;return o===void 0?(l=new Lu,r.set(n,[l])):s>=o.length?(l=new Lu,o.push(l)):l=o[s],l}function e(){r=new WeakMap}return{get:t,dispose:e}}function Py(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Q,color:new ie};break;case"SpotLight":e={position:new Q,direction:new Q,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Q,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Q,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return r[t.id]=e,e}}}function Ry(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let Iy=0;function Dy(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function Ny(r){const t=new Py,e=Ry(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new Q);const s=new Q,o=new Ae,l=new Ae;function c(d,f){let p=0,_=0,m=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let x=0,y=0,g=0,v=0,S=0,M=0,P=0,N=0,O=0,U=0,H=0;d.sort(Dy);const I=f===!0?Math.PI:1;for(let W=0,k=d.length;W<k;W++){const F=d[W],A=F.color,Z=F.intensity,at=F.distance,ot=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)p+=A.r*Z*I,_+=A.g*Z*I,m+=A.b*Z*I;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],Z);H++}else if(F.isDirectionalLight){const j=t.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity*I),F.castShadow){const st=F.shadow,rt=e.get(F);rt.shadowBias=st.bias,rt.shadowNormalBias=st.normalBias,rt.shadowRadius=st.radius,rt.shadowMapSize=st.mapSize,n.directionalShadow[x]=rt,n.directionalShadowMap[x]=ot,n.directionalShadowMatrix[x]=F.shadow.matrix,M++}n.directional[x]=j,x++}else if(F.isSpotLight){const j=t.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(A).multiplyScalar(Z*I),j.distance=at,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[g]=j;const st=F.shadow;if(F.map&&(n.spotLightMap[O]=F.map,O++,st.updateMatrices(F),F.castShadow&&U++),n.spotLightMatrix[g]=st.matrix,F.castShadow){const rt=e.get(F);rt.shadowBias=st.bias,rt.shadowNormalBias=st.normalBias,rt.shadowRadius=st.radius,rt.shadowMapSize=st.mapSize,n.spotShadow[g]=rt,n.spotShadowMap[g]=ot,N++}g++}else if(F.isRectAreaLight){const j=t.get(F);j.color.copy(A).multiplyScalar(Z),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),n.rectArea[v]=j,v++}else if(F.isPointLight){const j=t.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity*I),j.distance=F.distance,j.decay=F.decay,F.castShadow){const st=F.shadow,rt=e.get(F);rt.shadowBias=st.bias,rt.shadowNormalBias=st.normalBias,rt.shadowRadius=st.radius,rt.shadowMapSize=st.mapSize,rt.shadowCameraNear=st.camera.near,rt.shadowCameraFar=st.camera.far,n.pointShadow[y]=rt,n.pointShadowMap[y]=ot,n.pointShadowMatrix[y]=F.shadow.matrix,P++}n.point[y]=j,y++}else if(F.isHemisphereLight){const j=t.get(F);j.skyColor.copy(F.color).multiplyScalar(Z*I),j.groundColor.copy(F.groundColor).multiplyScalar(Z*I),n.hemi[S]=j,S++}}v>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=_,n.ambient[2]=m;const R=n.hash;(R.directionalLength!==x||R.pointLength!==y||R.spotLength!==g||R.rectAreaLength!==v||R.hemiLength!==S||R.numDirectionalShadows!==M||R.numPointShadows!==P||R.numSpotShadows!==N||R.numSpotMaps!==O||R.numLightProbes!==H)&&(n.directional.length=x,n.spot.length=g,n.rectArea.length=v,n.point.length=y,n.hemi.length=S,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=P,n.pointShadowMap.length=P,n.spotShadow.length=N,n.spotShadowMap.length=N,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=P,n.spotLightMatrix.length=N+O-U,n.spotLightMap.length=O,n.numSpotLightShadowsWithMaps=U,n.numLightProbes=H,R.directionalLength=x,R.pointLength=y,R.spotLength=g,R.rectAreaLength=v,R.hemiLength=S,R.numDirectionalShadows=M,R.numPointShadows=P,R.numSpotShadows=N,R.numSpotMaps=O,R.numLightProbes=H,n.version=Iy++)}function h(d,f){let p=0,_=0,m=0,x=0,y=0;const g=f.matrixWorldInverse;for(let v=0,S=d.length;v<S;v++){const M=d[v];if(M.isDirectionalLight){const P=n.directional[p];P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),p++}else if(M.isSpotLight){const P=n.spot[m];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(g),P.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),P.direction.sub(s),P.direction.transformDirection(g),m++}else if(M.isRectAreaLight){const P=n.rectArea[x];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(g),l.identity(),o.copy(M.matrixWorld),o.premultiply(g),l.extractRotation(o),P.halfWidth.set(M.width*.5,0,0),P.halfHeight.set(0,M.height*.5,0),P.halfWidth.applyMatrix4(l),P.halfHeight.applyMatrix4(l),x++}else if(M.isPointLight){const P=n.point[_];P.position.setFromMatrixPosition(M.matrixWorld),P.position.applyMatrix4(g),_++}else if(M.isHemisphereLight){const P=n.hemi[y];P.direction.setFromMatrixPosition(M.matrixWorld),P.direction.transformDirection(g),y++}}}return{setup:c,setupView:h,state:n}}function Pu(r){const t=new Ny(r),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function h(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:h,pushLight:o,pushShadow:l}}function Oy(r){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new Pu(r),t.set(s,[c])):o>=l.length?(c=new Pu(r),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class Uy extends lr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Im,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class ky extends lr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const zy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,By=`uniform sampler2D shadow_pass;
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
}`;function Fy(r,t,e){let n=new rc;const s=new yt,o=new yt,l=new qe,c=new Uy({depthPacking:Dm}),h=new ky,d={},f=e.maxTextureSize,p={[Di]:_n,[_n]:Di,[mn]:mn},_=new Ni({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:zy,fragmentShader:By}),m=_.clone();m.defines.HORIZONTAL_PASS=1;const x=new Fe;x.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ke(x,_),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hd;let v=this.type;this.render=function(O,U,H){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||O.length===0)return;const I=r.getRenderTarget(),R=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),k=r.state;k.setBlending(Pi),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const F=v!==di&&this.type===di,A=v===di&&this.type!==di;for(let Z=0,at=O.length;Z<at;Z++){const ot=O[Z],j=ot.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const st=j.getFrameExtents();if(s.multiply(st),o.copy(j.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/st.x),s.x=o.x*st.x,j.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/st.y),s.y=o.y*st.y,j.mapSize.y=o.y)),j.map===null||F===!0||A===!0){const q=this.type!==di?{minFilter:Rn,magFilter:Rn}:{};j.map!==null&&j.map.dispose(),j.map=new ir(s.x,s.y,q),j.map.texture.name=ot.name+".shadowMap",j.camera.updateProjectionMatrix()}r.setRenderTarget(j.map),r.clear();const rt=j.getViewportCount();for(let q=0;q<rt;q++){const tt=j.getViewport(q);l.set(o.x*tt.x,o.y*tt.y,o.x*tt.z,o.y*tt.w),k.viewport(l),j.updateMatrices(ot,q),n=j.getFrustum(),P(U,H,j.camera,ot,this.type)}j.isPointLightShadow!==!0&&this.type===di&&S(j,H),j.needsUpdate=!1}v=this.type,g.needsUpdate=!1,r.setRenderTarget(I,R,W)};function S(O,U){const H=t.update(y);_.defines.VSM_SAMPLES!==O.blurSamples&&(_.defines.VSM_SAMPLES=O.blurSamples,m.defines.VSM_SAMPLES=O.blurSamples,_.needsUpdate=!0,m.needsUpdate=!0),O.mapPass===null&&(O.mapPass=new ir(s.x,s.y)),_.uniforms.shadow_pass.value=O.map.texture,_.uniforms.resolution.value=O.mapSize,_.uniforms.radius.value=O.radius,r.setRenderTarget(O.mapPass),r.clear(),r.renderBufferDirect(U,null,H,_,y,null),m.uniforms.shadow_pass.value=O.mapPass.texture,m.uniforms.resolution.value=O.mapSize,m.uniforms.radius.value=O.radius,r.setRenderTarget(O.map),r.clear(),r.renderBufferDirect(U,null,H,m,y,null)}function M(O,U,H,I){let R=null;const W=H.isPointLight===!0?O.customDistanceMaterial:O.customDepthMaterial;if(W!==void 0)R=W;else if(R=H.isPointLight===!0?h:c,r.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0){const k=R.uuid,F=U.uuid;let A=d[k];A===void 0&&(A={},d[k]=A);let Z=A[F];Z===void 0&&(Z=R.clone(),A[F]=Z,U.addEventListener("dispose",N)),R=Z}if(R.visible=U.visible,R.wireframe=U.wireframe,I===di?R.side=U.shadowSide!==null?U.shadowSide:U.side:R.side=U.shadowSide!==null?U.shadowSide:p[U.side],R.alphaMap=U.alphaMap,R.alphaTest=U.alphaTest,R.map=U.map,R.clipShadows=U.clipShadows,R.clippingPlanes=U.clippingPlanes,R.clipIntersection=U.clipIntersection,R.displacementMap=U.displacementMap,R.displacementScale=U.displacementScale,R.displacementBias=U.displacementBias,R.wireframeLinewidth=U.wireframeLinewidth,R.linewidth=U.linewidth,H.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const k=r.properties.get(R);k.light=H}return R}function P(O,U,H,I,R){if(O.visible===!1)return;if(O.layers.test(U.layers)&&(O.isMesh||O.isLine||O.isPoints)&&(O.castShadow||O.receiveShadow&&R===di)&&(!O.frustumCulled||n.intersectsObject(O))){O.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,O.matrixWorld);const F=t.update(O),A=O.material;if(Array.isArray(A)){const Z=F.groups;for(let at=0,ot=Z.length;at<ot;at++){const j=Z[at],st=A[j.materialIndex];if(st&&st.visible){const rt=M(O,st,I,R);O.onBeforeShadow(r,O,U,H,F,rt,j),r.renderBufferDirect(H,null,F,rt,O,j),O.onAfterShadow(r,O,U,H,F,rt,j)}}}else if(A.visible){const Z=M(O,A,I,R);O.onBeforeShadow(r,O,U,H,F,Z,null),r.renderBufferDirect(H,null,F,Z,O,null),O.onAfterShadow(r,O,U,H,F,Z,null)}}const k=O.children;for(let F=0,A=k.length;F<A;F++)P(k[F],U,H,I,R)}function N(O){O.target.removeEventListener("dispose",N);for(const H in d){const I=d[H],R=O.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function Hy(r){function t(){let D=!1;const ut=new qe;let Mt=null;const Rt=new qe(0,0,0,0);return{setMask:function(Nt){Mt!==Nt&&!D&&(r.colorMask(Nt,Nt,Nt,Nt),Mt=Nt)},setLocked:function(Nt){D=Nt},setClear:function(Nt,re,he,_e,Ie){Ie===!0&&(Nt*=_e,re*=_e,he*=_e),ut.set(Nt,re,he,_e),Rt.equals(ut)===!1&&(r.clearColor(Nt,re,he,_e),Rt.copy(ut))},reset:function(){D=!1,Mt=null,Rt.set(-1,0,0,0)}}}function e(){let D=!1,ut=null,Mt=null,Rt=null;return{setTest:function(Nt){Nt?wt(r.DEPTH_TEST):St(r.DEPTH_TEST)},setMask:function(Nt){ut!==Nt&&!D&&(r.depthMask(Nt),ut=Nt)},setFunc:function(Nt){if(Mt!==Nt){switch(Nt){case om:r.depthFunc(r.NEVER);break;case am:r.depthFunc(r.ALWAYS);break;case lm:r.depthFunc(r.LESS);break;case qo:r.depthFunc(r.LEQUAL);break;case cm:r.depthFunc(r.EQUAL);break;case hm:r.depthFunc(r.GEQUAL);break;case um:r.depthFunc(r.GREATER);break;case dm:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Mt=Nt}},setLocked:function(Nt){D=Nt},setClear:function(Nt){Rt!==Nt&&(r.clearDepth(Nt),Rt=Nt)},reset:function(){D=!1,ut=null,Mt=null,Rt=null}}}function n(){let D=!1,ut=null,Mt=null,Rt=null,Nt=null,re=null,he=null,_e=null,Ie=null;return{setTest:function(me){D||(me?wt(r.STENCIL_TEST):St(r.STENCIL_TEST))},setMask:function(me){ut!==me&&!D&&(r.stencilMask(me),ut=me)},setFunc:function(me,Ce,Se){(Mt!==me||Rt!==Ce||Nt!==Se)&&(r.stencilFunc(me,Ce,Se),Mt=me,Rt=Ce,Nt=Se)},setOp:function(me,Ce,Se){(re!==me||he!==Ce||_e!==Se)&&(r.stencilOp(me,Ce,Se),re=me,he=Ce,_e=Se)},setLocked:function(me){D=me},setClear:function(me){Ie!==me&&(r.clearStencil(me),Ie=me)},reset:function(){D=!1,ut=null,Mt=null,Rt=null,Nt=null,re=null,he=null,_e=null,Ie=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,h=new WeakMap;let d={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,M=null,P=null,N=null,O=new ie(0,0,0),U=0,H=!1,I=null,R=null,W=null,k=null,F=null;const A=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,at=0;const ot=r.getParameter(r.VERSION);ot.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(ot)[1]),Z=at>=1):ot.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),Z=at>=2);let j=null,st={};const rt=r.getParameter(r.SCISSOR_BOX),q=r.getParameter(r.VIEWPORT),tt=new qe().fromArray(rt),Lt=new qe().fromArray(q);function J(D,ut,Mt,Rt){const Nt=new Uint8Array(4),re=r.createTexture();r.bindTexture(D,re),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let he=0;he<Mt;he++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(ut,0,r.RGBA,1,1,Rt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(ut+he,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return re}const nt={};nt[r.TEXTURE_2D]=J(r.TEXTURE_2D,r.TEXTURE_2D,1),nt[r.TEXTURE_CUBE_MAP]=J(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),nt[r.TEXTURE_2D_ARRAY]=J(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),nt[r.TEXTURE_3D]=J(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),wt(r.DEPTH_TEST),o.setFunc(qo),et(!1),$(dh),wt(r.CULL_FACE),xt(Pi);function wt(D){d[D]!==!0&&(r.enable(D),d[D]=!0)}function St(D){d[D]!==!1&&(r.disable(D),d[D]=!1)}function Pt(D,ut){return f[D]!==ut?(r.bindFramebuffer(D,ut),f[D]=ut,D===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ut),D===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ut),!0):!1}function It(D,ut){let Mt=_,Rt=!1;if(D){Mt=p.get(ut),Mt===void 0&&(Mt=[],p.set(ut,Mt));const Nt=D.textures;if(Mt.length!==Nt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let re=0,he=Nt.length;re<he;re++)Mt[re]=r.COLOR_ATTACHMENT0+re;Mt.length=Nt.length,Rt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Rt=!0);Rt&&r.drawBuffers(Mt)}function kt(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const it={[Ki]:r.FUNC_ADD,[Gp]:r.FUNC_SUBTRACT,[Wp]:r.FUNC_REVERSE_SUBTRACT};it[Zp]=r.MIN,it[Xp]=r.MAX;const vt={[qp]:r.ZERO,[jp]:r.ONE,[Yp]:r.SRC_COLOR,[Ol]:r.SRC_ALPHA,[em]:r.SRC_ALPHA_SATURATE,[Qp]:r.DST_COLOR,[Kp]:r.DST_ALPHA,[$p]:r.ONE_MINUS_SRC_COLOR,[Ul]:r.ONE_MINUS_SRC_ALPHA,[tm]:r.ONE_MINUS_DST_COLOR,[Jp]:r.ONE_MINUS_DST_ALPHA,[nm]:r.CONSTANT_COLOR,[im]:r.ONE_MINUS_CONSTANT_COLOR,[rm]:r.CONSTANT_ALPHA,[sm]:r.ONE_MINUS_CONSTANT_ALPHA};function xt(D,ut,Mt,Rt,Nt,re,he,_e,Ie,me){if(D===Pi){x===!0&&(St(r.BLEND),x=!1);return}if(x===!1&&(wt(r.BLEND),x=!0),D!==Vp){if(D!==y||me!==H){if((g!==Ki||M!==Ki)&&(r.blendEquation(r.FUNC_ADD),g=Ki,M=Ki),me)switch(D){case Wr:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case fh:r.blendFunc(r.ONE,r.ONE);break;case ph:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case mh:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Wr:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case fh:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case ph:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case mh:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,S=null,P=null,N=null,O.set(0,0,0),U=0,y=D,H=me}return}Nt=Nt||ut,re=re||Mt,he=he||Rt,(ut!==g||Nt!==M)&&(r.blendEquationSeparate(it[ut],it[Nt]),g=ut,M=Nt),(Mt!==v||Rt!==S||re!==P||he!==N)&&(r.blendFuncSeparate(vt[Mt],vt[Rt],vt[re],vt[he]),v=Mt,S=Rt,P=re,N=he),(_e.equals(O)===!1||Ie!==U)&&(r.blendColor(_e.r,_e.g,_e.b,Ie),O.copy(_e),U=Ie),y=D,H=!1}function E(D,ut){D.side===mn?St(r.CULL_FACE):wt(r.CULL_FACE);let Mt=D.side===_n;ut&&(Mt=!Mt),et(Mt),D.blending===Wr&&D.transparent===!1?xt(Pi):xt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Rt=D.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),w(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?wt(r.SAMPLE_ALPHA_TO_COVERAGE):St(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){I!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),I=D)}function $(D){D!==Bp?(wt(r.CULL_FACE),D!==R&&(D===dh?r.cullFace(r.BACK):D===Fp?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):St(r.CULL_FACE),R=D}function C(D){D!==W&&(Z&&r.lineWidth(D),W=D)}function w(D,ut,Mt){D?(wt(r.POLYGON_OFFSET_FILL),(k!==ut||F!==Mt)&&(r.polygonOffset(ut,Mt),k=ut,F=Mt)):St(r.POLYGON_OFFSET_FILL)}function B(D){D?wt(r.SCISSOR_TEST):St(r.SCISSOR_TEST)}function X(D){D===void 0&&(D=r.TEXTURE0+A-1),j!==D&&(r.activeTexture(D),j=D)}function K(D,ut,Mt){Mt===void 0&&(j===null?Mt=r.TEXTURE0+A-1:Mt=j);let Rt=st[Mt];Rt===void 0&&(Rt={type:void 0,texture:void 0},st[Mt]=Rt),(Rt.type!==D||Rt.texture!==ut)&&(j!==Mt&&(r.activeTexture(Mt),j=Mt),r.bindTexture(D,ut||nt[D]),Rt.type=D,Rt.texture=ut)}function G(){const D=st[j];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ft(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Vt(D){tt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function oe(D){Lt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Lt.copy(D))}function ae(D,ut){let Mt=h.get(ut);Mt===void 0&&(Mt=new WeakMap,h.set(ut,Mt));let Rt=Mt.get(D);Rt===void 0&&(Rt=r.getUniformBlockIndex(ut,D.name),Mt.set(D,Rt))}function Qt(D,ut){const Rt=h.get(ut).get(D);c.get(ut)!==Rt&&(r.uniformBlockBinding(ut,Rt,D.__bindingPointIndex),c.set(ut,Rt))}function Ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},j=null,st={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,M=null,P=null,N=null,O=new ie(0,0,0),U=0,H=!1,I=null,R=null,W=null,k=null,F=null,tt.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:wt,disable:St,bindFramebuffer:Pt,drawBuffers:It,useProgram:kt,setBlending:xt,setMaterial:E,setFlipSided:et,setCullFace:$,setLineWidth:C,setPolygonOffset:w,setScissorTest:B,activeTexture:X,bindTexture:K,unbindTexture:G,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Kt,updateUBOMapping:ae,uniformBlockBinding:Qt,texStorage2D:Ht,texStorage3D:zt,texSubImage2D:pt,texSubImage3D:Tt,compressedTexSubImage2D:Et,compressedTexSubImage3D:At,scissor:Vt,viewport:oe,reset:Ft}}function Vy(r,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new yt,f=new WeakMap;let p;const _=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,w){return m?new OffscreenCanvas(C,w):Qo("canvas")}function y(C,w,B){let X=1;const K=$(C);if((K.width>B||K.height>B)&&(X=B/Math.max(K.width,K.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const G=Math.floor(X*K.width),ft=Math.floor(X*K.height);p===void 0&&(p=x(G,ft));const lt=w?x(G,ft):p;return lt.width=G,lt.height=ft,lt.getContext("2d").drawImage(C,0,0,G,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+G+"x"+ft+")."),lt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),C;return C}function g(C){return C.generateMipmaps&&C.minFilter!==Rn&&C.minFilter!==Bn}function v(C){r.generateMipmap(C)}function S(C,w,B,X,K=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let G=w;if(w===r.RED&&(B===r.FLOAT&&(G=r.R32F),B===r.HALF_FLOAT&&(G=r.R16F),B===r.UNSIGNED_BYTE&&(G=r.R8)),w===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.R8UI),B===r.UNSIGNED_SHORT&&(G=r.R16UI),B===r.UNSIGNED_INT&&(G=r.R32UI),B===r.BYTE&&(G=r.R8I),B===r.SHORT&&(G=r.R16I),B===r.INT&&(G=r.R32I)),w===r.RG&&(B===r.FLOAT&&(G=r.RG32F),B===r.HALF_FLOAT&&(G=r.RG16F),B===r.UNSIGNED_BYTE&&(G=r.RG8)),w===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.RG8UI),B===r.UNSIGNED_SHORT&&(G=r.RG16UI),B===r.UNSIGNED_INT&&(G=r.RG32UI),B===r.BYTE&&(G=r.RG8I),B===r.SHORT&&(G=r.RG16I),B===r.INT&&(G=r.RG32I)),w===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&(G=r.RGB9_E5),w===r.RGBA){const ft=K?Yo:ge.getTransfer(X);B===r.FLOAT&&(G=r.RGBA32F),B===r.HALF_FLOAT&&(G=r.RGBA16F),B===r.UNSIGNED_BYTE&&(G=ft===be?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(G=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(G=r.RGB5_A1)}return(G===r.R16F||G===r.R32F||G===r.RG16F||G===r.RG32F||G===r.RGBA16F||G===r.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function M(C,w){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Rn&&C.minFilter!==Bn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function P(C){const w=C.target;w.removeEventListener("dispose",P),O(w),w.isVideoTexture&&f.delete(w)}function N(C){const w=C.target;w.removeEventListener("dispose",N),H(w)}function O(C){const w=n.get(C);if(w.__webglInit===void 0)return;const B=C.source,X=_.get(B);if(X){const K=X[w.__cacheKey];K.usedTimes--,K.usedTimes===0&&U(C),Object.keys(X).length===0&&_.delete(B)}n.remove(C)}function U(C){const w=n.get(C);r.deleteTexture(w.__webglTexture);const B=C.source,X=_.get(B);delete X[w.__cacheKey],l.memory.textures--}function H(C){const w=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(w.__webglFramebuffer[X]))for(let K=0;K<w.__webglFramebuffer[X].length;K++)r.deleteFramebuffer(w.__webglFramebuffer[X][K]);else r.deleteFramebuffer(w.__webglFramebuffer[X]);w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer[X])}else{if(Array.isArray(w.__webglFramebuffer))for(let X=0;X<w.__webglFramebuffer.length;X++)r.deleteFramebuffer(w.__webglFramebuffer[X]);else r.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&r.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&r.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let X=0;X<w.__webglColorRenderbuffer.length;X++)w.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(w.__webglColorRenderbuffer[X]);w.__webglDepthRenderbuffer&&r.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const B=C.textures;for(let X=0,K=B.length;X<K;X++){const G=n.get(B[X]);G.__webglTexture&&(r.deleteTexture(G.__webglTexture),l.memory.textures--),n.remove(B[X])}n.remove(C)}let I=0;function R(){I=0}function W(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function k(C){const w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function F(C,w){const B=n.get(C);if(C.isVideoTexture&&E(C),C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){const X=C.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(B,C,w);return}}e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+w)}function A(C,w){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,w);return}e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+w)}function Z(C,w){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,w);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+w)}function at(C,w){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Lt(B,C,w);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+w)}const ot={[Bl]:r.REPEAT,[er]:r.CLAMP_TO_EDGE,[Fl]:r.MIRRORED_REPEAT},j={[Rn]:r.NEAREST,[bm]:r.NEAREST_MIPMAP_NEAREST,[co]:r.NEAREST_MIPMAP_LINEAR,[Bn]:r.LINEAR,[Ha]:r.LINEAR_MIPMAP_NEAREST,[nr]:r.LINEAR_MIPMAP_LINEAR},st={[Om]:r.NEVER,[Hm]:r.ALWAYS,[Um]:r.LESS,[bd]:r.LEQUAL,[km]:r.EQUAL,[Fm]:r.GEQUAL,[zm]:r.GREATER,[Bm]:r.NOTEQUAL};function rt(C,w){if(w.type===Li&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===Bn||w.magFilter===Ha||w.magFilter===co||w.magFilter===nr||w.minFilter===Bn||w.minFilter===Ha||w.minFilter===co||w.minFilter===nr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,ot[w.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,ot[w.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,ot[w.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,j[w.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,j[w.minFilter]),w.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,st[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Rn||w.minFilter!==co&&w.minFilter!==nr||w.type===Li&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function q(C,w){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",P));const X=w.source;let K=_.get(X);K===void 0&&(K={},_.set(X,K));const G=k(w);if(G!==C.__cacheKey){K[G]===void 0&&(K[G]={texture:r.createTexture(),usedTimes:0},l.memory.textures++,B=!0),K[G].usedTimes++;const ft=K[C.__cacheKey];ft!==void 0&&(K[C.__cacheKey].usedTimes--,ft.usedTimes===0&&U(w)),C.__cacheKey=G,C.__webglTexture=K[G].texture}return B}function tt(C,w,B){let X=r.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),w.isData3DTexture&&(X=r.TEXTURE_3D);const K=q(C,w),G=w.source;e.bindTexture(X,C.__webglTexture,r.TEXTURE0+B);const ft=n.get(G);if(G.version!==ft.__version||K===!0){e.activeTexture(r.TEXTURE0+B);const lt=ge.getPrimaries(ge.workingColorSpace),pt=w.colorSpace===Ci?null:ge.getPrimaries(w.colorSpace),Tt=w.colorSpace===Ci||lt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=y(w.image,!1,s.maxTextureSize);Et=et(w,Et);const At=o.convert(w.format,w.colorSpace),Ht=o.convert(w.type);let zt=S(w.internalFormat,At,Ht,w.colorSpace,w.isVideoTexture);rt(X,w);let Dt;const Kt=w.mipmaps,Vt=w.isVideoTexture!==!0&&zt!==xd,oe=ft.__version===void 0||K===!0,ae=G.dataReady,Qt=M(w,Et);if(w.isDepthTexture)zt=r.DEPTH_COMPONENT16,w.type===Li?zt=r.DEPTH_COMPONENT32F:w.type===Kr?zt=r.DEPTH_COMPONENT24:w.type===Hs&&(zt=r.DEPTH24_STENCIL8),oe&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,zt,Et.width,Et.height):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,null));else if(w.isDataTexture)if(Kt.length>0){Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,Qt,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data);w.generateMipmaps=!1}else Vt?(oe&&e.texStorage2D(r.TEXTURE_2D,Qt,zt,Et.width,Et.height),ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Et.width,Et.height,At,Ht,Et.data)):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,Et.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Vt&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Qt,zt,Kt[0].width,Kt[0].height,Et.depth);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],w.format!==Qn?At!==null?Vt?ae&&e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Dt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Ht,Dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,At,Ht,Dt.data)}else{Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,Qt,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],w.format!==Qn?At!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(w.isDataArrayTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Qt,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(w.isData3DTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_3D,Qt,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_3D,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(w.isFramebufferTexture){if(oe)if(Vt)e.texStorage2D(r.TEXTURE_2D,Qt,zt,Et.width,Et.height);else{let Ft=Et.width,D=Et.height;for(let ut=0;ut<Qt;ut++)e.texImage2D(r.TEXTURE_2D,ut,zt,Ft,D,0,At,Ht,null),Ft>>=1,D>>=1}}else if(Kt.length>0){if(Vt&&oe){const Ft=$(Kt[0]);e.texStorage2D(r.TEXTURE_2D,Qt,zt,Ft.width,Ft.height)}for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,At,Ht,Dt):e.texImage2D(r.TEXTURE_2D,Ft,zt,At,Ht,Dt);w.generateMipmaps=!1}else if(Vt){if(oe){const Ft=$(Et);e.texStorage2D(r.TEXTURE_2D,Qt,zt,Ft.width,Ft.height)}ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,Et)}else e.texImage2D(r.TEXTURE_2D,0,zt,At,Ht,Et);g(w)&&v(X),ft.__version=G.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function Lt(C,w,B){if(w.image.length!==6)return;const X=q(C,w),K=w.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+B);const G=n.get(K);if(K.version!==G.__version||X===!0){e.activeTexture(r.TEXTURE0+B);const ft=ge.getPrimaries(ge.workingColorSpace),lt=w.colorSpace===Ci?null:ge.getPrimaries(w.colorSpace),pt=w.colorSpace===Ci||ft===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,w.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,w.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Tt=w.isCompressedTexture||w.image[0].isCompressedTexture,Et=w.image[0]&&w.image[0].isDataTexture,At=[];for(let D=0;D<6;D++)!Tt&&!Et?At[D]=y(w.image[D],!0,s.maxCubemapSize):At[D]=Et?w.image[D].image:w.image[D],At[D]=et(w,At[D]);const Ht=At[0],zt=o.convert(w.format,w.colorSpace),Dt=o.convert(w.type),Kt=S(w.internalFormat,zt,Dt,w.colorSpace),Vt=w.isVideoTexture!==!0,oe=G.__version===void 0||X===!0,ae=K.dataReady;let Qt=M(w,Ht);rt(r.TEXTURE_CUBE_MAP,w);let Ft;if(Tt){Vt&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,Qt,Kt,Ht.width,Ht.height);for(let D=0;D<6;D++){Ft=At[D].mipmaps;for(let ut=0;ut<Ft.length;ut++){const Mt=Ft[ut];w.format!==Qn?zt!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut,0,0,Mt.width,Mt.height,zt,Mt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut,Kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut,0,0,Mt.width,Mt.height,zt,Dt,Mt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut,Kt,Mt.width,Mt.height,0,zt,Dt,Mt.data)}}}else{if(Ft=w.mipmaps,Vt&&oe){Ft.length>0&&Qt++;const D=$(At[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,Qt,Kt,D.width,D.height)}for(let D=0;D<6;D++)if(Et){Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,At[D].width,At[D].height,zt,Dt,At[D].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,At[D].width,At[D].height,0,zt,Dt,At[D].data);for(let ut=0;ut<Ft.length;ut++){const Rt=Ft[ut].image[D].image;Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut+1,0,0,Rt.width,Rt.height,zt,Dt,Rt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut+1,Kt,Rt.width,Rt.height,0,zt,Dt,Rt.data)}}else{Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,zt,Dt,At[D]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,zt,Dt,At[D]);for(let ut=0;ut<Ft.length;ut++){const Mt=Ft[ut];Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut+1,0,0,zt,Dt,Mt.image[D]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ut+1,Kt,zt,Dt,Mt.image[D])}}}g(w)&&v(r.TEXTURE_CUBE_MAP),G.__version=K.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function J(C,w,B,X,K,G){const ft=o.convert(B.format,B.colorSpace),lt=o.convert(B.type),pt=S(B.internalFormat,ft,lt,B.colorSpace);if(!n.get(w).__hasExternalTextures){const Et=Math.max(1,w.width>>G),At=Math.max(1,w.height>>G);K===r.TEXTURE_3D||K===r.TEXTURE_2D_ARRAY?e.texImage3D(K,G,pt,Et,At,w.depth,0,ft,lt,null):e.texImage2D(K,G,pt,Et,At,0,ft,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),xt(w)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,K,n.get(B).__webglTexture,0,vt(w)):(K===r.TEXTURE_2D||K>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,K,n.get(B).__webglTexture,G),e.bindFramebuffer(r.FRAMEBUFFER,null)}function nt(C,w,B){if(r.bindRenderbuffer(r.RENDERBUFFER,C),w.depthBuffer&&!w.stencilBuffer){let X=r.DEPTH_COMPONENT24;if(B||xt(w)){const K=w.depthTexture;K&&K.isDepthTexture&&(K.type===Li?X=r.DEPTH_COMPONENT32F:K.type===Kr&&(X=r.DEPTH_COMPONENT24));const G=vt(w);xt(w)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,G,X,w.width,w.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,G,X,w.width,w.height)}else r.renderbufferStorage(r.RENDERBUFFER,X,w.width,w.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,C)}else if(w.depthBuffer&&w.stencilBuffer){const X=vt(w);B&&xt(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,w.width,w.height):xt(w)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,C)}else{const X=w.textures;for(let K=0;K<X.length;K++){const G=X[K],ft=o.convert(G.format,G.colorSpace),lt=o.convert(G.type),pt=S(G.internalFormat,ft,lt,G.colorSpace),Tt=vt(w);B&&xt(w)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Tt,pt,w.width,w.height):xt(w)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Tt,pt,w.width,w.height):r.renderbufferStorage(r.RENDERBUFFER,pt,w.width,w.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function wt(C,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),F(w.depthTexture,0);const X=n.get(w.depthTexture).__webglTexture,K=vt(w);if(w.depthTexture.format===Zr)xt(w)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else if(w.depthTexture.format===Os)xt(w)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function St(C){const w=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!w.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");wt(w.__webglFramebuffer,C)}else if(B){w.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer[X]),w.__webglDepthbuffer[X]=r.createRenderbuffer(),nt(w.__webglDepthbuffer[X],C,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=r.createRenderbuffer(),nt(w.__webglDepthbuffer,C,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(C,w,B){const X=n.get(C);w!==void 0&&J(X.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&St(C)}function It(C){const w=C.texture,B=n.get(C),X=n.get(w);C.addEventListener("dispose",N);const K=C.textures,G=C.isWebGLCubeRenderTarget===!0,ft=K.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=w.version,l.memory.textures++),G){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let pt=0;pt<w.mipmaps.length;pt++)B.__webglFramebuffer[lt][pt]=r.createFramebuffer()}else B.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<w.mipmaps.length;lt++)B.__webglFramebuffer[lt]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ft)for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=n.get(K[lt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=r.createTexture(),l.memory.textures++)}if(C.samples>0&&xt(C)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<K.length;lt++){const pt=K[lt];B.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Tt=o.convert(pt.format,pt.colorSpace),Et=o.convert(pt.type),At=S(pt.internalFormat,Tt,Et,pt.colorSpace,C.isXRRenderTarget===!0),Ht=vt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,At,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),nt(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(G){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),rt(r.TEXTURE_CUBE_MAP,w);for(let lt=0;lt<6;lt++)if(w.mipmaps&&w.mipmaps.length>0)for(let pt=0;pt<w.mipmaps.length;pt++)J(B.__webglFramebuffer[lt][pt],C,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else J(B.__webglFramebuffer[lt],C,w,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(w)&&v(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=K.length;lt<pt;lt++){const Tt=K[lt],Et=n.get(Tt);e.bindTexture(r.TEXTURE_2D,Et.__webglTexture),rt(r.TEXTURE_2D,Tt),J(B.__webglFramebuffer,C,Tt,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),g(Tt)&&v(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(lt=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),rt(lt,w),w.mipmaps&&w.mipmaps.length>0)for(let pt=0;pt<w.mipmaps.length;pt++)J(B.__webglFramebuffer[pt],C,w,r.COLOR_ATTACHMENT0,lt,pt);else J(B.__webglFramebuffer,C,w,r.COLOR_ATTACHMENT0,lt,0);g(w)&&v(lt),e.unbindTexture()}C.depthBuffer&&St(C)}function kt(C){const w=C.textures;for(let B=0,X=w.length;B<X;B++){const K=w[B];if(g(K)){const G=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ft=n.get(K).__webglTexture;e.bindTexture(G,ft),v(G),e.unbindTexture()}}}function it(C){if(C.samples>0&&xt(C)===!1){const w=C.textures,B=C.width,X=C.height;let K=r.COLOR_BUFFER_BIT;const G=[],ft=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(C),pt=w.length>1;if(pt)for(let Tt=0;Tt<w.length;Tt++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Tt=0;Tt<w.length;Tt++){G.push(r.COLOR_ATTACHMENT0+Tt),C.depthBuffer&&G.push(ft);const Et=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Et===!1&&(C.depthBuffer&&(K|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&(K|=r.STENCIL_BUFFER_BIT)),pt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]),Et===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ft]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ft])),pt){const At=n.get(w[Tt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,At,0)}r.blitFramebuffer(0,0,B,X,0,0,B,X,K,r.NEAREST),h&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,G)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<w.length;Tt++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]);const Et=n.get(w[Tt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,Et,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function vt(C){return Math.min(s.maxSamples,C.samples)}function xt(C){const w=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function E(C){const w=l.render.frame;f.get(C)!==w&&(f.set(C,w),C.update())}function et(C,w){const B=C.colorSpace,X=C.format,K=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==Ui&&B!==Ci&&(ge.getTransfer(B)===be?(X!==Qn||K!==Ii)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),w}function $(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(d.width=C.naturalWidth||C.width,d.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(d.width=C.displayWidth,d.height=C.displayHeight):(d.width=C.width,d.height=C.height),d}this.allocateTextureUnit=W,this.resetTextureUnits=R,this.setTexture2D=F,this.setTexture2DArray=A,this.setTexture3D=Z,this.setTextureCube=at,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=J,this.useMultisampledRTT=xt}function Gy(r,t){function e(n,s=Ci){let o;const l=ge.getTransfer(s);if(n===Ii)return r.UNSIGNED_BYTE;if(n===md)return r.UNSIGNED_SHORT_4_4_4_4;if(n===gd)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Sm)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===wm)return r.BYTE;if(n===Mm)return r.SHORT;if(n===fd)return r.UNSIGNED_SHORT;if(n===pd)return r.INT;if(n===Kr)return r.UNSIGNED_INT;if(n===Li)return r.FLOAT;if(n===jo)return r.HALF_FLOAT;if(n===Em)return r.ALPHA;if(n===Tm)return r.RGB;if(n===Qn)return r.RGBA;if(n===Am)return r.LUMINANCE;if(n===Cm)return r.LUMINANCE_ALPHA;if(n===Zr)return r.DEPTH_COMPONENT;if(n===Os)return r.DEPTH_STENCIL;if(n===Lm)return r.RED;if(n===_d)return r.RED_INTEGER;if(n===Pm)return r.RG;if(n===vd)return r.RG_INTEGER;if(n===yd)return r.RGBA_INTEGER;if(n===Va||n===Ga||n===Wa||n===Za)if(l===be)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Va)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ga)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Za)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Va)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ga)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Za)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===gh||n===_h||n===vh||n===yh)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===gh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_h)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===vh)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xd)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===xh||n===bh)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===xh)return l===be?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===bh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wh||n===Mh||n===Sh||n===Eh||n===Th||n===Ah||n===Ch||n===Lh||n===Ph||n===Rh||n===Ih||n===Dh||n===Nh||n===Oh)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===wh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Mh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Sh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Eh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Th)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ah)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ch)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Lh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ph)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Rh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ih)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oh)return l===be?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xa||n===Uh||n===kh)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Xa)return l===be?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Uh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===kh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rm||n===zh||n===Bh||n===Fh)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Xa)return o.COMPRESSED_RED_RGTC1_EXT;if(n===zh)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Bh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Fh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class Wy extends bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class As extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zy={type:"move"};class vl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new As,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new As,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new As,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,h=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const y of t.hand.values()){const g=e.getJointPose(y,n),v=this._getHandJoint(d,y);g!==null&&(v.matrix.fromArray(g.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=g.radius),v.visible=g!==null}const f=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],_=f.position.distanceTo(p.position),m=.02,x=.005;d.inputState.pinching&&_>m+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&_<=m-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(Zy)))}return c!==null&&(c.visible=s!==null),h!==null&&(h.visible=o!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new As;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Xy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,qy=`
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

}`;class jy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new hn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new Ni({vertexShader:Xy,fragmentShader:qy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new ke(new Gs(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Yy extends ar{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",h=1,d=null,f=null,p=null,_=null,m=null,x=null;const y=new jy,g=e.getContextAttributes();let v=null,S=null;const M=[],P=[],N=new yt;let O=null;const U=new bn;U.layers.enable(1),U.viewport=new qe;const H=new bn;H.layers.enable(2),H.viewport=new qe;const I=[U,H],R=new Wy;R.layers.enable(1),R.layers.enable(2);let W=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let nt=M[J];return nt===void 0&&(nt=new vl,M[J]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(J){let nt=M[J];return nt===void 0&&(nt=new vl,M[J]=nt),nt.getGripSpace()},this.getHand=function(J){let nt=M[J];return nt===void 0&&(nt=new vl,M[J]=nt),nt.getHandSpace()};function F(J){const nt=P.indexOf(J.inputSource);if(nt===-1)return;const wt=M[nt];wt!==void 0&&(wt.update(J.inputSource,J.frame,d||l),wt.dispatchEvent({type:J.type,data:J.inputSource}))}function A(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",A),s.removeEventListener("inputsourceschange",Z);for(let J=0;J<M.length;J++){const nt=P[J];nt!==null&&(P[J]=null,M[J].disconnect(nt))}W=null,k=null,y.reset(),t.setRenderTarget(v),m=null,_=null,p=null,s=null,S=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(O),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){c=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(J){d=J},this.getBaseLayer=function(){return _!==null?_:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",A),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),O=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const nt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new ir(m.framebufferWidth,m.framebufferHeight,{format:Qn,type:Ii,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let nt=null,wt=null,St=null;g.depth&&(St=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=g.stencil?Os:Zr,wt=g.stencil?Hs:Kr);const Pt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:o};p=new XRWebGLBinding(s,e),_=p.createProjectionLayer(Pt),s.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),S=new ir(_.textureWidth,_.textureHeight,{format:Qn,type:Ii,depthTexture:new Od(_.textureWidth,_.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const It=t.properties.get(S);It.__ignoreDepthValues=_.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(h),d=null,l=await s.requestReferenceSpace(c),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(J){for(let nt=0;nt<J.removed.length;nt++){const wt=J.removed[nt],St=P.indexOf(wt);St>=0&&(P[St]=null,M[St].disconnect(wt))}for(let nt=0;nt<J.added.length;nt++){const wt=J.added[nt];let St=P.indexOf(wt);if(St===-1){for(let It=0;It<M.length;It++)if(It>=P.length){P.push(wt),St=It;break}else if(P[It]===null){P[It]=wt,St=It;break}if(St===-1)break}const Pt=M[St];Pt&&Pt.connect(wt)}}const at=new Q,ot=new Q;function j(J,nt,wt){at.setFromMatrixPosition(nt.matrixWorld),ot.setFromMatrixPosition(wt.matrixWorld);const St=at.distanceTo(ot),Pt=nt.projectionMatrix.elements,It=wt.projectionMatrix.elements,kt=Pt[14]/(Pt[10]-1),it=Pt[14]/(Pt[10]+1),vt=(Pt[9]+1)/Pt[5],xt=(Pt[9]-1)/Pt[5],E=(Pt[8]-1)/Pt[0],et=(It[8]+1)/It[0],$=kt*E,C=kt*et,w=St/(-E+et),B=w*-E;nt.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(B),J.translateZ(w),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const X=kt+w,K=it+w,G=$-B,ft=C+(St-B),lt=vt*it/K*X,pt=xt*it/K*X;J.projectionMatrix.makePerspective(G,ft,lt,pt,X,K),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function st(J,nt){nt===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(nt.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;y.texture!==null&&(J.near=y.depthNear,J.far=y.depthFar),R.near=H.near=U.near=J.near,R.far=H.far=U.far=J.far,(W!==R.near||k!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),W=R.near,k=R.far,U.near=W,U.far=k,H.near=W,H.far=k,U.updateProjectionMatrix(),H.updateProjectionMatrix(),J.updateProjectionMatrix());const nt=J.parent,wt=R.cameras;st(R,nt);for(let St=0;St<wt.length;St++)st(wt[St],nt);wt.length===2?j(R,U,H):R.projectionMatrix.copy(U.projectionMatrix),rt(J,R,nt)};function rt(J,nt,wt){wt===null?J.matrix.copy(nt.matrixWorld):(J.matrix.copy(wt.matrixWorld),J.matrix.invert(),J.matrix.multiply(nt.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(nt.projectionMatrix),J.projectionMatrixInverse.copy(nt.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Hl*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(_===null&&m===null))return h},this.setFoveation=function(J){h=J,_!==null&&(_.fixedFoveation=J),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null};let q=null;function tt(J,nt){if(f=nt.getViewerPose(d||l),x=nt,f!==null){const wt=f.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let St=!1;wt.length!==R.cameras.length&&(R.cameras.length=0,St=!0);for(let It=0;It<wt.length;It++){const kt=wt[It];let it=null;if(m!==null)it=m.getViewport(kt);else{const xt=p.getViewSubImage(_,kt);it=xt.viewport,It===0&&(t.setRenderTargetTextures(S,xt.colorTexture,_.ignoreDepthValues?void 0:xt.depthStencilTexture),t.setRenderTarget(S))}let vt=I[It];vt===void 0&&(vt=new bn,vt.layers.enable(It),vt.viewport=new qe,I[It]=vt),vt.matrix.fromArray(kt.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(kt.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(it.x,it.y,it.width,it.height),It===0&&(R.matrix.copy(vt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),St===!0&&R.cameras.push(vt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=p.getDepthInformation(wt[0]);It&&It.isValid&&It.texture&&y.init(t,It,s.renderState)}}for(let wt=0;wt<M.length;wt++){const St=P[wt],Pt=M[wt];St!==null&&Pt!==void 0&&Pt.update(St,nt,d||l)}y.render(t,R),q&&q(J,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),x=null}const Lt=new Dd;Lt.setAnimationLoop(tt),this.setAnimationLoop=function(J){q=J},this.dispose=function(){}}}const Yi=new Wn,$y=new Ae;function Ky(r,t){function e(g,v){g.matrixAutoUpdate===!0&&g.updateMatrix(),v.value.copy(g.matrix)}function n(g,v){v.color.getRGB(g.fogColor.value,Pd(r)),v.isFog?(g.fogNear.value=v.near,g.fogFar.value=v.far):v.isFogExp2&&(g.fogDensity.value=v.density)}function s(g,v,S,M,P){v.isMeshBasicMaterial||v.isMeshLambertMaterial?o(g,v):v.isMeshToonMaterial?(o(g,v),p(g,v)):v.isMeshPhongMaterial?(o(g,v),f(g,v)):v.isMeshStandardMaterial?(o(g,v),_(g,v),v.isMeshPhysicalMaterial&&m(g,v,P)):v.isMeshMatcapMaterial?(o(g,v),x(g,v)):v.isMeshDepthMaterial?o(g,v):v.isMeshDistanceMaterial?(o(g,v),y(g,v)):v.isMeshNormalMaterial?o(g,v):v.isLineBasicMaterial?(l(g,v),v.isLineDashedMaterial&&c(g,v)):v.isPointsMaterial?h(g,v,S,M):v.isSpriteMaterial?d(g,v):v.isShadowMaterial?(g.color.value.copy(v.color),g.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function o(g,v){g.opacity.value=v.opacity,v.color&&g.diffuse.value.copy(v.color),v.emissive&&g.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.bumpMap&&(g.bumpMap.value=v.bumpMap,e(v.bumpMap,g.bumpMapTransform),g.bumpScale.value=v.bumpScale,v.side===_n&&(g.bumpScale.value*=-1)),v.normalMap&&(g.normalMap.value=v.normalMap,e(v.normalMap,g.normalMapTransform),g.normalScale.value.copy(v.normalScale),v.side===_n&&g.normalScale.value.negate()),v.displacementMap&&(g.displacementMap.value=v.displacementMap,e(v.displacementMap,g.displacementMapTransform),g.displacementScale.value=v.displacementScale,g.displacementBias.value=v.displacementBias),v.emissiveMap&&(g.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,g.emissiveMapTransform)),v.specularMap&&(g.specularMap.value=v.specularMap,e(v.specularMap,g.specularMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest);const S=t.get(v),M=S.envMap,P=S.envMapRotation;if(M&&(g.envMap.value=M,Yi.copy(P),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),g.envMapRotation.value.setFromMatrix4($y.makeRotationFromEuler(Yi)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=v.reflectivity,g.ior.value=v.ior,g.refractionRatio.value=v.refractionRatio),v.lightMap){g.lightMap.value=v.lightMap;const N=r._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=v.lightMapIntensity*N,e(v.lightMap,g.lightMapTransform)}v.aoMap&&(g.aoMap.value=v.aoMap,g.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,g.aoMapTransform))}function l(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform))}function c(g,v){g.dashSize.value=v.dashSize,g.totalSize.value=v.dashSize+v.gapSize,g.scale.value=v.scale}function h(g,v,S,M){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.size.value=v.size*S,g.scale.value=M*.5,v.map&&(g.map.value=v.map,e(v.map,g.uvTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function d(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.rotation.value=v.rotation,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function f(g,v){g.specular.value.copy(v.specular),g.shininess.value=Math.max(v.shininess,1e-4)}function p(g,v){v.gradientMap&&(g.gradientMap.value=v.gradientMap)}function _(g,v){g.metalness.value=v.metalness,v.metalnessMap&&(g.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,g.metalnessMapTransform)),g.roughness.value=v.roughness,v.roughnessMap&&(g.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,g.roughnessMapTransform)),v.envMap&&(g.envMapIntensity.value=v.envMapIntensity)}function m(g,v,S){g.ior.value=v.ior,v.sheen>0&&(g.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),g.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(g.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,g.sheenColorMapTransform)),v.sheenRoughnessMap&&(g.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,g.sheenRoughnessMapTransform))),v.clearcoat>0&&(g.clearcoat.value=v.clearcoat,g.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(g.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,g.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(g.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===_n&&g.clearcoatNormalScale.value.negate())),v.iridescence>0&&(g.iridescence.value=v.iridescence,g.iridescenceIOR.value=v.iridescenceIOR,g.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(g.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,g.iridescenceMapTransform)),v.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),v.transmission>0&&(g.transmission.value=v.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),v.transmissionMap&&(g.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,g.transmissionMapTransform)),g.thickness.value=v.thickness,v.thicknessMap&&(g.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=v.attenuationDistance,g.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(g.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(g.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=v.specularIntensity,g.specularColor.value.copy(v.specularColor),v.specularColorMap&&(g.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,g.specularColorMapTransform)),v.specularIntensityMap&&(g.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,v){v.matcap&&(g.matcap.value=v.matcap)}function y(g,v){const S=t.get(v).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Jy(r,t,e,n){let s={},o={},l=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function h(S,M){const P=M.program;n.uniformBlockBinding(S,P)}function d(S,M){let P=s[S.id];P===void 0&&(x(S),P=f(S),s[S.id]=P,S.addEventListener("dispose",g));const N=M.program;n.updateUBOMapping(S,N);const O=t.render.frame;o[S.id]!==O&&(_(S),o[S.id]=O)}function f(S){const M=p();S.__bindingPointIndex=M;const P=r.createBuffer(),N=S.__size,O=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,P),r.bufferData(r.UNIFORM_BUFFER,N,O),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,P),P}function p(){for(let S=0;S<c;S++)if(l.indexOf(S)===-1)return l.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(S){const M=s[S.id],P=S.uniforms,N=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let O=0,U=P.length;O<U;O++){const H=Array.isArray(P[O])?P[O]:[P[O]];for(let I=0,R=H.length;I<R;I++){const W=H[I];if(m(W,O,I,N)===!0){const k=W.__offset,F=Array.isArray(W.value)?W.value:[W.value];let A=0;for(let Z=0;Z<F.length;Z++){const at=F[Z],ot=y(at);typeof at=="number"||typeof at=="boolean"?(W.__data[0]=at,r.bufferSubData(r.UNIFORM_BUFFER,k+A,W.__data)):at.isMatrix3?(W.__data[0]=at.elements[0],W.__data[1]=at.elements[1],W.__data[2]=at.elements[2],W.__data[3]=0,W.__data[4]=at.elements[3],W.__data[5]=at.elements[4],W.__data[6]=at.elements[5],W.__data[7]=0,W.__data[8]=at.elements[6],W.__data[9]=at.elements[7],W.__data[10]=at.elements[8],W.__data[11]=0):(at.toArray(W.__data,A),A+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,W.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(S,M,P,N){const O=S.value,U=M+"_"+P;if(N[U]===void 0)return typeof O=="number"||typeof O=="boolean"?N[U]=O:N[U]=O.clone(),!0;{const H=N[U];if(typeof O=="number"||typeof O=="boolean"){if(H!==O)return N[U]=O,!0}else if(H.equals(O)===!1)return H.copy(O),!0}return!1}function x(S){const M=S.uniforms;let P=0;const N=16;for(let U=0,H=M.length;U<H;U++){const I=Array.isArray(M[U])?M[U]:[M[U]];for(let R=0,W=I.length;R<W;R++){const k=I[R],F=Array.isArray(k.value)?k.value:[k.value];for(let A=0,Z=F.length;A<Z;A++){const at=F[A],ot=y(at),j=P%N;j!==0&&N-j<ot.boundary&&(P+=N-j),k.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=P,P+=ot.storage}}}const O=P%N;return O>0&&(P+=N-O),S.__size=P,S.__cache={},this}function y(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function g(S){const M=S.target;M.removeEventListener("dispose",g);const P=l.indexOf(M.__bindingPointIndex);l.splice(P,1),r.deleteBuffer(s[M.id]),delete s[M.id],delete o[M.id]}function v(){for(const S in s)r.deleteBuffer(s[S]);l=[],s={},o={}}return{bind:h,update:d,dispose:v}}class Hd{constructor(t={}){const{canvas:e=Wm(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=l;const m=new Uint32Array(4),x=new Int32Array(4);let y=null,g=null;const v=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$n,this._useLegacyLights=!1,this.toneMapping=Ri,this.toneMappingExposure=1;const M=this;let P=!1,N=0,O=0,U=null,H=-1,I=null;const R=new qe,W=new qe;let k=null;const F=new ie(0);let A=0,Z=e.width,at=e.height,ot=1,j=null,st=null;const rt=new qe(0,0,Z,at),q=new qe(0,0,Z,at);let tt=!1;const Lt=new rc;let J=!1,nt=!1;const wt=new Ae,St=new yt,Pt=new Q,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function kt(){return U===null?ot:1}let it=n;function vt(V,ct){const gt=e.getContext(V,ct);return gt!==null?gt:null}try{const V={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:h,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ql}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),it===null){const ct="webgl2";if(it=vt(ct,V),it===null)throw vt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let xt,E,et,$,C,w,B,X,K,G,ft,lt,pt,Tt,Et,At,Ht,zt,Dt,Kt,Vt,oe,ae,Qt;function Ft(){xt=new a0(it),xt.init(),E=new e0(it,xt,t),oe=new Gy(it,xt),et=new Hy(it),$=new h0(it),C=new Ay,w=new Vy(it,xt,et,C,E,oe,$),B=new i0(M),X=new o0(M),K=new gg(it),ae=new Qv(it,K),G=new l0(it,K,$,ae),ft=new d0(it,G,K,$),Dt=new u0(it,E,w),At=new n0(C),lt=new Ty(M,B,X,xt,E,ae,At),pt=new Ky(M,C),Tt=new Ly,Et=new Oy(xt),zt=new Jv(M,B,X,et,ft,_,h),Ht=new Fy(M,ft,E),Qt=new Jy(it,$,E,et),Kt=new t0(it,xt,$),Vt=new c0(it,xt,$),$.programs=lt.programs,M.capabilities=E,M.extensions=xt,M.properties=C,M.renderLists=Tt,M.shadowMap=Ht,M.state=et,M.info=$}Ft();const D=new Yy(M,it);this.xr=D,this.getContext=function(){return it},this.getContextAttributes=function(){return it.getContextAttributes()},this.forceContextLoss=function(){const V=xt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=xt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(V){V!==void 0&&(ot=V,this.setSize(Z,at,!1))},this.getSize=function(V){return V.set(Z,at)},this.setSize=function(V,ct,gt=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=V,at=ct,e.width=Math.floor(V*ot),e.height=Math.floor(ct*ot),gt===!0&&(e.style.width=V+"px",e.style.height=ct+"px"),this.setViewport(0,0,V,ct)},this.getDrawingBufferSize=function(V){return V.set(Z*ot,at*ot).floor()},this.setDrawingBufferSize=function(V,ct,gt){Z=V,at=ct,ot=gt,e.width=Math.floor(V*gt),e.height=Math.floor(ct*gt),this.setViewport(0,0,V,ct)},this.getCurrentViewport=function(V){return V.copy(R)},this.getViewport=function(V){return V.copy(rt)},this.setViewport=function(V,ct,gt,_t){V.isVector4?rt.set(V.x,V.y,V.z,V.w):rt.set(V,ct,gt,_t),et.viewport(R.copy(rt).multiplyScalar(ot).round())},this.getScissor=function(V){return V.copy(q)},this.setScissor=function(V,ct,gt,_t){V.isVector4?q.set(V.x,V.y,V.z,V.w):q.set(V,ct,gt,_t),et.scissor(W.copy(q).multiplyScalar(ot).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(V){et.setScissorTest(tt=V)},this.setOpaqueSort=function(V){j=V},this.setTransparentSort=function(V){st=V},this.getClearColor=function(V){return V.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(V=!0,ct=!0,gt=!0){let _t=0;if(V){let dt=!1;if(U!==null){const Ut=U.texture.format;dt=Ut===yd||Ut===vd||Ut===_d}if(dt){const Ut=U.texture.type,Zt=Ut===Ii||Ut===Kr||Ut===fd||Ut===Hs||Ut===md||Ut===gd,qt=zt.getClearColor(),jt=zt.getClearAlpha(),te=qt.r,Jt=qt.g,ee=qt.b;Zt?(m[0]=te,m[1]=Jt,m[2]=ee,m[3]=jt,it.clearBufferuiv(it.COLOR,0,m)):(x[0]=te,x[1]=Jt,x[2]=ee,x[3]=jt,it.clearBufferiv(it.COLOR,0,x))}else _t|=it.COLOR_BUFFER_BIT}ct&&(_t|=it.DEPTH_BUFFER_BIT),gt&&(_t|=it.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),it.clear(_t)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Tt.dispose(),Et.dispose(),C.dispose(),B.dispose(),X.dispose(),ft.dispose(),ae.dispose(),Qt.dispose(),lt.dispose(),D.dispose(),D.removeEventListener("sessionstart",Ce),D.removeEventListener("sessionend",Se),nn.stop()};function ut(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const V=$.autoReset,ct=Ht.enabled,gt=Ht.autoUpdate,_t=Ht.needsUpdate,dt=Ht.type;Ft(),$.autoReset=V,Ht.enabled=ct,Ht.autoUpdate=gt,Ht.needsUpdate=_t,Ht.type=dt}function Rt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function Nt(V){const ct=V.target;ct.removeEventListener("dispose",Nt),re(ct)}function re(V){he(V),C.remove(V)}function he(V){const ct=C.get(V).programs;ct!==void 0&&(ct.forEach(function(gt){lt.releaseProgram(gt)}),V.isShaderMaterial&&lt.releaseShaderCache(V))}this.renderBufferDirect=function(V,ct,gt,_t,dt,Ut){ct===null&&(ct=It);const Zt=dt.isMesh&&dt.matrixWorld.determinant()<0,qt=Zs(V,ct,gt,_t,dt);et.setMaterial(_t,Zt);let jt=gt.index,te=1;if(_t.wireframe===!0){if(jt=G.getWireframeAttribute(gt),jt===void 0)return;te=2}const Jt=gt.drawRange,ee=gt.attributes.position;let Ee=Jt.start*te,rn=(Jt.start+Jt.count)*te;Ut!==null&&(Ee=Math.max(Ee,Ut.start*te),rn=Math.min(rn,(Ut.start+Ut.count)*te)),jt!==null?(Ee=Math.max(Ee,0),rn=Math.min(rn,jt.count)):ee!=null&&(Ee=Math.max(Ee,0),rn=Math.min(rn,ee.count));const Le=rn-Ee;if(Le<0||Le===1/0)return;ae.setup(dt,_t,qt,gt,jt);let sn,ve=Kt;if(jt!==null&&(sn=K.get(jt),ve=Vt,ve.setIndex(sn)),dt.isMesh)_t.wireframe===!0?(et.setLineWidth(_t.wireframeLinewidth*kt()),ve.setMode(it.LINES)):ve.setMode(it.TRIANGLES);else if(dt.isLine){let ne=_t.linewidth;ne===void 0&&(ne=1),et.setLineWidth(ne*kt()),dt.isLineSegments?ve.setMode(it.LINES):dt.isLineLoop?ve.setMode(it.LINE_LOOP):ve.setMode(it.LINE_STRIP)}else dt.isPoints?ve.setMode(it.POINTS):dt.isSprite&&ve.setMode(it.TRIANGLES);if(dt.isBatchedMesh)ve.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)ve.renderInstances(Ee,Le,dt.count);else if(gt.isInstancedBufferGeometry){const ne=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,ei=Math.min(gt.instanceCount,ne);ve.renderInstances(Ee,Le,ei)}else ve.render(Ee,Le)};function _e(V,ct,gt){V.transparent===!0&&V.side===mn&&V.forceSinglePass===!1?(V.side=_n,V.needsUpdate=!0,ki(V,ct,gt),V.side=Di,V.needsUpdate=!0,ki(V,ct,gt),V.side=mn):ki(V,ct,gt)}this.compile=function(V,ct,gt=null){gt===null&&(gt=V),g=Et.get(gt),g.init(),S.push(g),gt.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),V!==gt&&V.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),g.setupLights(M._useLegacyLights);const _t=new Set;return V.traverse(function(dt){const Ut=dt.material;if(Ut)if(Array.isArray(Ut))for(let Zt=0;Zt<Ut.length;Zt++){const qt=Ut[Zt];_e(qt,gt,dt),_t.add(qt)}else _e(Ut,gt,dt),_t.add(Ut)}),S.pop(),g=null,_t},this.compileAsync=function(V,ct,gt=null){const _t=this.compile(V,ct,gt);return new Promise(dt=>{function Ut(){if(_t.forEach(function(Zt){C.get(Zt).currentProgram.isReady()&&_t.delete(Zt)}),_t.size===0){dt(V);return}setTimeout(Ut,10)}xt.get("KHR_parallel_shader_compile")!==null?Ut():setTimeout(Ut,10)})};let Ie=null;function me(V){Ie&&Ie(V)}function Ce(){nn.stop()}function Se(){nn.start()}const nn=new Dd;nn.setAnimationLoop(me),typeof self<"u"&&nn.setContext(self),this.setAnimationLoop=function(V){Ie=V,D.setAnimationLoop(V),V===null?nn.stop():nn.start()},D.addEventListener("sessionstart",Ce),D.addEventListener("sessionend",Se),this.render=function(V,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(ct),ct=D.getCamera()),V.isScene===!0&&V.onBeforeRender(M,V,ct,U),g=Et.get(V,S.length),g.init(),S.push(g),wt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),Lt.setFromProjectionMatrix(wt),nt=this.localClippingEnabled,J=At.init(this.clippingPlanes,nt),y=Tt.get(V,v.length),y.init(),v.push(y),un(V,ct,0,M.sortObjects),y.finish(),M.sortObjects===!0&&y.sort(j,st),this.info.render.frame++,J===!0&&At.beginShadows();const gt=g.state.shadowsArray;if(Ht.render(gt,V,ct),J===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1)&&zt.render(y,V),g.setupLights(M._useLegacyLights),ct.isArrayCamera){const _t=ct.cameras;for(let dt=0,Ut=_t.length;dt<Ut;dt++){const Zt=_t[dt];Zn(y,V,Zt,Zt.viewport)}}else Zn(y,V,ct);U!==null&&(w.updateMultisampleRenderTarget(U),w.updateRenderTargetMipmap(U)),V.isScene===!0&&V.onAfterRender(M,V,ct),ae.resetDefaultState(),H=-1,I=null,S.pop(),S.length>0?g=S[S.length-1]:g=null,v.pop(),v.length>0?y=v[v.length-1]:y=null};function un(V,ct,gt,_t){if(V.visible===!1)return;if(V.layers.test(ct.layers)){if(V.isGroup)gt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(ct);else if(V.isLight)g.pushLight(V),V.castShadow&&g.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||Lt.intersectsSprite(V)){_t&&Pt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(wt);const Zt=ft.update(V),qt=V.material;qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||Lt.intersectsObject(V))){const Zt=ft.update(V),qt=V.material;if(_t&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),Pt.copy(V.boundingSphere.center)):(Zt.boundingSphere===null&&Zt.computeBoundingSphere(),Pt.copy(Zt.boundingSphere.center)),Pt.applyMatrix4(V.matrixWorld).applyMatrix4(wt)),Array.isArray(qt)){const jt=Zt.groups;for(let te=0,Jt=jt.length;te<Jt;te++){const ee=jt[te],Ee=qt[ee.materialIndex];Ee&&Ee.visible&&y.push(V,Zt,Ee,gt,Pt.z,ee)}}else qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}const Ut=V.children;for(let Zt=0,qt=Ut.length;Zt<qt;Zt++)un(Ut[Zt],ct,gt,_t)}function Zn(V,ct,gt,_t){const dt=V.opaque,Ut=V.transmissive,Zt=V.transparent;g.setupLightsView(gt),J===!0&&At.setGlobalState(M.clippingPlanes,gt),Ut.length>0&&gi(dt,Ut,ct,gt),_t&&et.viewport(R.copy(_t)),dt.length>0&&He(dt,ct,gt),Ut.length>0&&He(Ut,ct,gt),Zt.length>0&&He(Zt,ct,gt),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function gi(V,ct,gt,_t){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(g.state.transmissionRenderTarget===null){g.state.transmissionRenderTarget=new ir(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float")?jo:Ii,minFilter:nr,samples:4,stencilBuffer:o});const te=C.get(g.state.transmissionRenderTarget);te.__isTransmissionRenderTarget=!0}const Ut=g.state.transmissionRenderTarget;M.getDrawingBufferSize(St),Ut.setSize(St.x,St.y);const Zt=M.getRenderTarget();M.setRenderTarget(Ut),M.getClearColor(F),A=M.getClearAlpha(),A<1&&M.setClearColor(16777215,.5),M.clear();const qt=M.toneMapping;M.toneMapping=Ri,He(V,gt,_t),w.updateMultisampleRenderTarget(Ut),w.updateRenderTargetMipmap(Ut);let jt=!1;for(let te=0,Jt=ct.length;te<Jt;te++){const ee=ct[te],Ee=ee.object,rn=ee.geometry,Le=ee.material,sn=ee.group;if(Le.side===mn&&Ee.layers.test(_t.layers)){const ve=Le.side;Le.side=_n,Le.needsUpdate=!0,Wt(Ee,gt,_t,rn,Le,sn),Le.side=ve,Le.needsUpdate=!0,jt=!0}}jt===!0&&(w.updateMultisampleRenderTarget(Ut),w.updateRenderTargetMipmap(Ut)),M.setRenderTarget(Zt),M.setClearColor(F,A),M.toneMapping=qt}function He(V,ct,gt){const _t=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,Ut=V.length;dt<Ut;dt++){const Zt=V[dt],qt=Zt.object,jt=Zt.geometry,te=_t===null?Zt.material:_t,Jt=Zt.group;qt.layers.test(gt.layers)&&Wt(qt,ct,gt,jt,te,Jt)}}function Wt(V,ct,gt,_t,dt,Ut){V.onBeforeRender(M,ct,gt,_t,dt,Ut),V.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),dt.onBeforeRender(M,ct,gt,_t,V,Ut),dt.transparent===!0&&dt.side===mn&&dt.forceSinglePass===!1?(dt.side=_n,dt.needsUpdate=!0,M.renderBufferDirect(gt,ct,_t,dt,V,Ut),dt.side=Di,dt.needsUpdate=!0,M.renderBufferDirect(gt,ct,_t,dt,V,Ut),dt.side=mn):M.renderBufferDirect(gt,ct,_t,dt,V,Ut),V.onAfterRender(M,ct,gt,_t,dt,Ut)}function ki(V,ct,gt){ct.isScene!==!0&&(ct=It);const _t=C.get(V),dt=g.state.lights,Ut=g.state.shadowsArray,Zt=dt.state.version,qt=lt.getParameters(V,dt.state,Ut,ct,gt),jt=lt.getProgramCacheKey(qt);let te=_t.programs;_t.environment=V.isMeshStandardMaterial?ct.environment:null,_t.fog=ct.fog,_t.envMap=(V.isMeshStandardMaterial?X:B).get(V.envMap||_t.environment),_t.envMapRotation=_t.environment!==null&&V.envMap===null?ct.environmentRotation:V.envMapRotation,te===void 0&&(V.addEventListener("dispose",Nt),te=new Map,_t.programs=te);let Jt=te.get(jt);if(Jt!==void 0){if(_t.currentProgram===Jt&&_t.lightsStateVersion===Zt)return ns(V,qt),Jt}else qt.uniforms=lt.getUniforms(V),V.onBuild(gt,qt,M),V.onBeforeCompile(qt,M),Jt=lt.acquireProgram(qt,jt),te.set(jt,Jt),_t.uniforms=qt.uniforms;const ee=_t.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(ee.clippingPlanes=At.uniform),ns(V,qt),_t.needsLights=Xs(V),_t.lightsStateVersion=Zt,_t.needsLights&&(ee.ambientLightColor.value=dt.state.ambient,ee.lightProbe.value=dt.state.probe,ee.directionalLights.value=dt.state.directional,ee.directionalLightShadows.value=dt.state.directionalShadow,ee.spotLights.value=dt.state.spot,ee.spotLightShadows.value=dt.state.spotShadow,ee.rectAreaLights.value=dt.state.rectArea,ee.ltc_1.value=dt.state.rectAreaLTC1,ee.ltc_2.value=dt.state.rectAreaLTC2,ee.pointLights.value=dt.state.point,ee.pointLightShadows.value=dt.state.pointShadow,ee.hemisphereLights.value=dt.state.hemi,ee.directionalShadowMap.value=dt.state.directionalShadowMap,ee.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,ee.spotShadowMap.value=dt.state.spotShadowMap,ee.spotLightMatrix.value=dt.state.spotLightMatrix,ee.spotLightMap.value=dt.state.spotLightMap,ee.pointShadowMap.value=dt.state.pointShadowMap,ee.pointShadowMatrix.value=dt.state.pointShadowMatrix),_t.currentProgram=Jt,_t.uniformsList=null,Jt}function es(V){if(V.uniformsList===null){const ct=V.currentProgram.getUniforms();V.uniformsList=Go.seqWithValue(ct.seq,V.uniforms)}return V.uniformsList}function ns(V,ct){const gt=C.get(V);gt.outputColorSpace=ct.outputColorSpace,gt.batching=ct.batching,gt.instancing=ct.instancing,gt.instancingColor=ct.instancingColor,gt.instancingMorph=ct.instancingMorph,gt.skinning=ct.skinning,gt.morphTargets=ct.morphTargets,gt.morphNormals=ct.morphNormals,gt.morphColors=ct.morphColors,gt.morphTargetsCount=ct.morphTargetsCount,gt.numClippingPlanes=ct.numClippingPlanes,gt.numIntersection=ct.numClipIntersection,gt.vertexAlphas=ct.vertexAlphas,gt.vertexTangents=ct.vertexTangents,gt.toneMapping=ct.toneMapping}function Zs(V,ct,gt,_t,dt){ct.isScene!==!0&&(ct=It),w.resetTextureUnits();const Ut=ct.fog,Zt=_t.isMeshStandardMaterial?ct.environment:null,qt=U===null?M.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:Ui,jt=(_t.isMeshStandardMaterial?X:B).get(_t.envMap||Zt),te=_t.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,Jt=!!gt.attributes.tangent&&(!!_t.normalMap||_t.anisotropy>0),ee=!!gt.morphAttributes.position,Ee=!!gt.morphAttributes.normal,rn=!!gt.morphAttributes.color;let Le=Ri;_t.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Le=M.toneMapping);const sn=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,ve=sn!==void 0?sn.length:0,ne=C.get(_t),ei=g.state.lights;if(J===!0&&(nt===!0||V!==I)){const Ke=V===I&&_t.id===H;At.setState(_t,V,Ke)}let Xt=!1;_t.version===ne.__version?(ne.needsLights&&ne.lightsStateVersion!==ei.state.version||ne.outputColorSpace!==qt||dt.isBatchedMesh&&ne.batching===!1||!dt.isBatchedMesh&&ne.batching===!0||dt.isInstancedMesh&&ne.instancing===!1||!dt.isInstancedMesh&&ne.instancing===!0||dt.isSkinnedMesh&&ne.skinning===!1||!dt.isSkinnedMesh&&ne.skinning===!0||dt.isInstancedMesh&&ne.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&ne.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&ne.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&ne.instancingMorph===!1&&dt.morphTexture!==null||ne.envMap!==jt||_t.fog===!0&&ne.fog!==Ut||ne.numClippingPlanes!==void 0&&(ne.numClippingPlanes!==At.numPlanes||ne.numIntersection!==At.numIntersection)||ne.vertexAlphas!==te||ne.vertexTangents!==Jt||ne.morphTargets!==ee||ne.morphNormals!==Ee||ne.morphColors!==rn||ne.toneMapping!==Le||ne.morphTargetsCount!==ve)&&(Xt=!0):(Xt=!0,ne.__version=_t.version);let fe=ne.currentProgram;Xt===!0&&(fe=ki(_t,ct,dt));let zi=!1,Tn=!1,Xn=!1;const De=fe.getUniforms(),Yt=ne.uniforms;if(et.useProgram(fe.program)&&(zi=!0,Tn=!0,Xn=!0),_t.id!==H&&(H=_t.id,Tn=!0),zi||I!==V){De.setValue(it,"projectionMatrix",V.projectionMatrix),De.setValue(it,"viewMatrix",V.matrixWorldInverse);const Ke=De.map.cameraPosition;Ke!==void 0&&Ke.setValue(it,Pt.setFromMatrixPosition(V.matrixWorld)),E.logarithmicDepthBuffer&&De.setValue(it,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(_t.isMeshPhongMaterial||_t.isMeshToonMaterial||_t.isMeshLambertMaterial||_t.isMeshBasicMaterial||_t.isMeshStandardMaterial||_t.isShaderMaterial)&&De.setValue(it,"isOrthographic",V.isOrthographicCamera===!0),I!==V&&(I=V,Tn=!0,Xn=!0)}if(dt.isSkinnedMesh){De.setOptional(it,dt,"bindMatrix"),De.setOptional(it,dt,"bindMatrixInverse");const Ke=dt.skeleton;Ke&&(Ke.boneTexture===null&&Ke.computeBoneTexture(),De.setValue(it,"boneTexture",Ke.boneTexture,w))}dt.isBatchedMesh&&(De.setOptional(it,dt,"batchingTexture"),De.setValue(it,"batchingTexture",dt._matricesTexture,w));const xe=gt.morphAttributes;if((xe.position!==void 0||xe.normal!==void 0||xe.color!==void 0)&&Dt.update(dt,gt,fe),(Tn||ne.receiveShadow!==dt.receiveShadow)&&(ne.receiveShadow=dt.receiveShadow,De.setValue(it,"receiveShadow",dt.receiveShadow)),_t.isMeshGouraudMaterial&&_t.envMap!==null&&(Yt.envMap.value=jt,Yt.flipEnvMap.value=jt.isCubeTexture&&jt.isRenderTargetTexture===!1?-1:1),_t.isMeshStandardMaterial&&_t.envMap===null&&ct.environment!==null&&(Yt.envMapIntensity.value=ct.environmentIntensity),Tn&&(De.setValue(it,"toneMappingExposure",M.toneMappingExposure),ne.needsLights&&is(Yt,Xn),Ut&&_t.fog===!0&&pt.refreshFogUniforms(Yt,Ut),pt.refreshMaterialUniforms(Yt,_t,ot,at,g.state.transmissionRenderTarget),Go.upload(it,es(ne),Yt,w)),_t.isShaderMaterial&&_t.uniformsNeedUpdate===!0&&(Go.upload(it,es(ne),Yt,w),_t.uniformsNeedUpdate=!1),_t.isSpriteMaterial&&De.setValue(it,"center",dt.center),De.setValue(it,"modelViewMatrix",dt.modelViewMatrix),De.setValue(it,"normalMatrix",dt.normalMatrix),De.setValue(it,"modelMatrix",dt.matrixWorld),_t.isShaderMaterial||_t.isRawShaderMaterial){const Ke=_t.uniformsGroups;for(let _i=0,dn=Ke.length;_i<dn;_i++){const qs=Ke[_i];Qt.update(qs,fe),Qt.bind(qs,fe)}}return fe}function is(V,ct){V.ambientLightColor.needsUpdate=ct,V.lightProbe.needsUpdate=ct,V.directionalLights.needsUpdate=ct,V.directionalLightShadows.needsUpdate=ct,V.pointLights.needsUpdate=ct,V.pointLightShadows.needsUpdate=ct,V.spotLights.needsUpdate=ct,V.spotLightShadows.needsUpdate=ct,V.rectAreaLights.needsUpdate=ct,V.hemisphereLights.needsUpdate=ct}function Xs(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return O},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(V,ct,gt){C.get(V.texture).__webglTexture=ct,C.get(V.depthTexture).__webglTexture=gt;const _t=C.get(V);_t.__hasExternalTextures=!0,_t.__autoAllocateDepthBuffer=gt===void 0,_t.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),_t.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,ct){const gt=C.get(V);gt.__webglFramebuffer=ct,gt.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(V,ct=0,gt=0){U=V,N=ct,O=gt;let _t=!0,dt=null,Ut=!1,Zt=!1;if(V){const jt=C.get(V);jt.__useDefaultFramebuffer!==void 0?(et.bindFramebuffer(it.FRAMEBUFFER,null),_t=!1):jt.__webglFramebuffer===void 0?w.setupRenderTarget(V):jt.__hasExternalTextures&&w.rebindTextures(V,C.get(V.texture).__webglTexture,C.get(V.depthTexture).__webglTexture);const te=V.texture;(te.isData3DTexture||te.isDataArrayTexture||te.isCompressedArrayTexture)&&(Zt=!0);const Jt=C.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(Jt[ct])?dt=Jt[ct][gt]:dt=Jt[ct],Ut=!0):V.samples>0&&w.useMultisampledRTT(V)===!1?dt=C.get(V).__webglMultisampledFramebuffer:Array.isArray(Jt)?dt=Jt[gt]:dt=Jt,R.copy(V.viewport),W.copy(V.scissor),k=V.scissorTest}else R.copy(rt).multiplyScalar(ot).floor(),W.copy(q).multiplyScalar(ot).floor(),k=tt;if(et.bindFramebuffer(it.FRAMEBUFFER,dt)&&_t&&et.drawBuffers(V,dt),et.viewport(R),et.scissor(W),et.setScissorTest(k),Ut){const jt=C.get(V.texture);it.framebufferTexture2D(it.FRAMEBUFFER,it.COLOR_ATTACHMENT0,it.TEXTURE_CUBE_MAP_POSITIVE_X+ct,jt.__webglTexture,gt)}else if(Zt){const jt=C.get(V.texture),te=ct||0;it.framebufferTextureLayer(it.FRAMEBUFFER,it.COLOR_ATTACHMENT0,jt.__webglTexture,gt||0,te)}H=-1},this.readRenderTargetPixels=function(V,ct,gt,_t,dt,Ut,Zt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=C.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Zt!==void 0&&(qt=qt[Zt]),qt){et.bindFramebuffer(it.FRAMEBUFFER,qt);try{const jt=V.texture,te=jt.format,Jt=jt.type;if(te!==Qn&&oe.convert(te)!==it.getParameter(it.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ee=Jt===jo&&(xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float"));if(Jt!==Ii&&oe.convert(Jt)!==it.getParameter(it.IMPLEMENTATION_COLOR_READ_TYPE)&&Jt!==Li&&!ee){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=V.width-_t&&gt>=0&&gt<=V.height-dt&&it.readPixels(ct,gt,_t,dt,oe.convert(te),oe.convert(Jt),Ut)}finally{const jt=U!==null?C.get(U).__webglFramebuffer:null;et.bindFramebuffer(it.FRAMEBUFFER,jt)}}},this.copyFramebufferToTexture=function(V,ct,gt=0){const _t=Math.pow(2,-gt),dt=Math.floor(ct.image.width*_t),Ut=Math.floor(ct.image.height*_t);w.setTexture2D(ct,0),it.copyTexSubImage2D(it.TEXTURE_2D,gt,0,0,V.x,V.y,dt,Ut),et.unbindTexture()},this.copyTextureToTexture=function(V,ct,gt,_t=0){const dt=ct.image.width,Ut=ct.image.height,Zt=oe.convert(gt.format),qt=oe.convert(gt.type);w.setTexture2D(gt,0),it.pixelStorei(it.UNPACK_FLIP_Y_WEBGL,gt.flipY),it.pixelStorei(it.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),it.pixelStorei(it.UNPACK_ALIGNMENT,gt.unpackAlignment),ct.isDataTexture?it.texSubImage2D(it.TEXTURE_2D,_t,V.x,V.y,dt,Ut,Zt,qt,ct.image.data):ct.isCompressedTexture?it.compressedTexSubImage2D(it.TEXTURE_2D,_t,V.x,V.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Zt,ct.mipmaps[0].data):it.texSubImage2D(it.TEXTURE_2D,_t,V.x,V.y,Zt,qt,ct.image),_t===0&&gt.generateMipmaps&&it.generateMipmap(it.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(V,ct,gt,_t,dt=0){const Ut=Math.round(V.max.x-V.min.x),Zt=Math.round(V.max.y-V.min.y),qt=V.max.z-V.min.z+1,jt=oe.convert(_t.format),te=oe.convert(_t.type);let Jt;if(_t.isData3DTexture)w.setTexture3D(_t,0),Jt=it.TEXTURE_3D;else if(_t.isDataArrayTexture||_t.isCompressedArrayTexture)w.setTexture2DArray(_t,0),Jt=it.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}it.pixelStorei(it.UNPACK_FLIP_Y_WEBGL,_t.flipY),it.pixelStorei(it.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),it.pixelStorei(it.UNPACK_ALIGNMENT,_t.unpackAlignment);const ee=it.getParameter(it.UNPACK_ROW_LENGTH),Ee=it.getParameter(it.UNPACK_IMAGE_HEIGHT),rn=it.getParameter(it.UNPACK_SKIP_PIXELS),Le=it.getParameter(it.UNPACK_SKIP_ROWS),sn=it.getParameter(it.UNPACK_SKIP_IMAGES),ve=gt.isCompressedTexture?gt.mipmaps[dt]:gt.image;it.pixelStorei(it.UNPACK_ROW_LENGTH,ve.width),it.pixelStorei(it.UNPACK_IMAGE_HEIGHT,ve.height),it.pixelStorei(it.UNPACK_SKIP_PIXELS,V.min.x),it.pixelStorei(it.UNPACK_SKIP_ROWS,V.min.y),it.pixelStorei(it.UNPACK_SKIP_IMAGES,V.min.z),gt.isDataTexture||gt.isData3DTexture?it.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,te,ve.data):_t.isCompressedArrayTexture?it.compressedTexSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ve.data):it.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,te,ve),it.pixelStorei(it.UNPACK_ROW_LENGTH,ee),it.pixelStorei(it.UNPACK_IMAGE_HEIGHT,Ee),it.pixelStorei(it.UNPACK_SKIP_PIXELS,rn),it.pixelStorei(it.UNPACK_SKIP_ROWS,Le),it.pixelStorei(it.UNPACK_SKIP_IMAGES,sn),dt===0&&_t.generateMipmaps&&it.generateMipmap(Jt),et.unbindTexture()},this.initTexture=function(V){V.isCubeTexture?w.setTextureCube(V,0):V.isData3DTexture?w.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?w.setTexture2DArray(V,0):w.setTexture2D(V,0),et.unbindTexture()},this.resetState=function(){N=0,O=0,U=null,et.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===nc?"display-p3":"srgb",e.unpackColorSpace=ge.workingColorSpace===la?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Vd extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wn,this.environmentIntensity=1,this.environmentRotation=new Wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class oc extends lr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ru=new Q,Iu=new Q,Du=new Ae,yl=new ic,Io=new ca;class Gd extends $e{constructor(t=new Fe,e=new oc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)Ru.fromBufferAttribute(e,s-1),Iu.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Ru.distanceTo(Iu);t.setAttribute("lineDistance",new Me(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(s),Io.radius+=o,t.ray.intersectsSphere(Io)===!1)return;Du.copy(s).invert(),yl.copy(t.ray).applyMatrix4(Du);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),h=c*c,d=new Q,f=new Q,p=new Q,_=new Q,m=this.isLineSegments?2:1,x=n.index,g=n.attributes.position;if(x!==null){const v=Math.max(0,l.start),S=Math.min(x.count,l.start+l.count);for(let M=v,P=S-1;M<P;M+=m){const N=x.getX(M),O=x.getX(M+1);if(d.fromBufferAttribute(g,N),f.fromBufferAttribute(g,O),yl.distanceSqToSegment(d,f,_,p)>h)continue;_.applyMatrix4(this.matrixWorld);const H=t.ray.origin.distanceTo(_);H<t.near||H>t.far||e.push({distance:H,point:p.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,l.start),S=Math.min(g.count,l.start+l.count);for(let M=v,P=S-1;M<P;M+=m){if(d.fromBufferAttribute(g,M),f.fromBufferAttribute(g,M+1),yl.distanceSqToSegment(d,f,_,p)>h)continue;_.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(_);O<t.near||O>t.far||e.push({distance:O,point:p.clone().applyMatrix4(this.matrixWorld),index:M,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const Nu=new Q,Ou=new Q;class Qy extends Gd{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)Nu.fromBufferAttribute(e,s),Ou.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Nu.distanceTo(Ou);t.setAttribute("lineDistance",new Me(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Wd extends hn{constructor(t,e,n,s,o,l,c,h,d){super(t,e,n,s,o,l,c,h,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ti{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,h=o-1,d;for(;c<=h;)if(s=Math.floor(c+(h-c)/2),d=n[s]-l,d<0)c=s+1;else if(d>0)h=s-1;else{h=s;break}if(s=h,n[s]===l)return s/(o-1);const f=n[s],_=n[s+1]-f,m=(l-f)/_;return(s+m)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),h=e||(l.isVector2?new yt:new Q);return h.copy(c).sub(l).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new Q,s=[],o=[],l=[],c=new Q,h=new Ae;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new Q)}o[0]=new Q,l[0]=new Q;let d=Number.MAX_VALUE;const f=Math.abs(s[0].x),p=Math.abs(s[0].y),_=Math.abs(s[0].z);f<=d&&(d=f,n.set(1,0,0)),p<=d&&(d=p,n.set(0,1,0)),_<=d&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),l[m]=l[m-1].clone(),c.crossVectors(s[m-1],s[m]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(Xe(s[m-1].dot(s[m]),-1,1));o[m].applyMatrix4(h.makeRotationAxis(c,x))}l[m].crossVectors(s[m],o[m])}if(e===!0){let m=Math.acos(Xe(o[0].dot(o[t]),-1,1));m/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(m=-m);for(let x=1;x<=t;x++)o[x].applyMatrix4(h.makeRotationAxis(s[x],m*x)),l[x].crossVectors(s[x],o[x])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ac extends ti{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=h}getPoint(t,e=new yt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let h=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),_=h-this.aX,m=d-this.aY;h=_*f-m*p+this.aX,d=_*p+m*f+this.aY}return n.set(h,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class tx extends ac{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function lc(){let r=0,t=0,e=0,n=0;function s(o,l,c,h){r=o,t=c,e=-3*o+3*l-2*c-h,n=2*o-2*l+c+h}return{initCatmullRom:function(o,l,c,h,d){s(l,c,d*(c-o),d*(h-l))},initNonuniformCatmullRom:function(o,l,c,h,d,f,p){let _=(l-o)/d-(c-o)/(d+f)+(c-l)/f,m=(c-l)/f-(h-l)/(f+p)+(h-c)/p;_*=f,m*=f,s(l,c,_,m)},calc:function(o){const l=o*o,c=l*o;return r+t*o+e*l+n*c}}}const Do=new Q,xl=new lc,bl=new lc,wl=new lc;class ex extends ti{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new Q){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),h=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:h===0&&c===o-1&&(c=o-2,h=1);let d,f;this.closed||c>0?d=s[(c-1)%o]:(Do.subVectors(s[0],s[1]).add(s[0]),d=Do);const p=s[c%o],_=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:(Do.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=Do),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(d.distanceToSquared(p),m),y=Math.pow(p.distanceToSquared(_),m),g=Math.pow(_.distanceToSquared(f),m);y<1e-4&&(y=1),x<1e-4&&(x=y),g<1e-4&&(g=y),xl.initNonuniformCatmullRom(d.x,p.x,_.x,f.x,x,y,g),bl.initNonuniformCatmullRom(d.y,p.y,_.y,f.y,x,y,g),wl.initNonuniformCatmullRom(d.z,p.z,_.z,f.z,x,y,g)}else this.curveType==="catmullrom"&&(xl.initCatmullRom(d.x,p.x,_.x,f.x,this.tension),bl.initCatmullRom(d.y,p.y,_.y,f.y,this.tension),wl.initCatmullRom(d.z,p.z,_.z,f.z,this.tension));return n.set(xl.calc(h),bl.calc(h),wl.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Q().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Uu(r,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=r*r,h=r*c;return(2*e-2*n+o+l)*h+(-3*e+3*n-2*o-l)*c+o*r+e}function nx(r,t){const e=1-r;return e*e*t}function ix(r,t){return 2*(1-r)*r*t}function rx(r,t){return r*r*t}function Ps(r,t,e,n){return nx(r,t)+ix(r,e)+rx(r,n)}function sx(r,t){const e=1-r;return e*e*e*t}function ox(r,t){const e=1-r;return 3*e*e*r*t}function ax(r,t){return 3*(1-r)*r*r*t}function lx(r,t){return r*r*r*t}function Rs(r,t,e,n,s){return sx(r,t)+ox(r,e)+ax(r,n)+lx(r,s)}class Zd extends ti{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Rs(t,s.x,o.x,l.x,c.x),Rs(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class cx extends ti{constructor(t=new Q,e=new Q,n=new Q,s=new Q){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Q){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(Rs(t,s.x,o.x,l.x,c.x),Rs(t,s.y,o.y,l.y,c.y),Rs(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Xd extends ti{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hx extends ti{constructor(t=new Q,e=new Q){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new Q){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Q){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qd extends ti{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Ps(t,s.x,o.x,l.x),Ps(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ux extends ti{constructor(t=new Q,e=new Q,n=new Q){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Q){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(Ps(t,s.x,o.x,l.x),Ps(t,s.y,o.y,l.y),Ps(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jd extends ti{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,h=s[l===0?l:l-1],d=s[l],f=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(Uu(c,h.x,d.x,f.x,p.x),Uu(c,h.y,d.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new yt().fromArray(s))}return this}}var Gl=Object.freeze({__proto__:null,ArcCurve:tx,CatmullRomCurve3:ex,CubicBezierCurve:Zd,CubicBezierCurve3:cx,EllipseCurve:ac,LineCurve:Xd,LineCurve3:hx,QuadraticBezierCurve:qd,QuadraticBezierCurve3:ux,SplineCurve:jd});class dx extends ti{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Gl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],h=c.getLength(),d=h===0?0:1-l/h;return c.getPointAt(d,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,h=l.getPoints(c);for(let d=0;d<h.length;d++){const f=h[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Gl[s.type]().fromJSON(s))}return this}}class ku extends dx{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Xd(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new qd(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new Zd(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new jd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+c,e+h,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,h){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,s,o,l,c,h),this}absellipse(t,e,n,s,o,l,c,h){const d=new ac(t,e,n,s,o,l,c,h);if(this.curves.length>0){const p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Qi extends Fe{constructor(t=[new yt(0,-.5),new yt(.5,0),new yt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Xe(s,0,Math.PI*2);const o=[],l=[],c=[],h=[],d=[],f=1/e,p=new Q,_=new yt,m=new Q,x=new Q,y=new Q;let g=0,v=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,y.copy(m),m.normalize(),h.push(m.x,m.y,m.z);break;case t.length-1:h.push(y.x,y.y,y.z);break;default:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,x.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),h.push(m.x,m.y,m.z),y.copy(x)}for(let S=0;S<=e;S++){const M=n+S*f*s,P=Math.sin(M),N=Math.cos(M);for(let O=0;O<=t.length-1;O++){p.x=t[O].x*P,p.y=t[O].y,p.z=t[O].x*N,l.push(p.x,p.y,p.z),_.x=S/e,_.y=O/(t.length-1),c.push(_.x,_.y);const U=h[3*O+0]*P,H=h[3*O+1],I=h[3*O+0]*N;d.push(U,H,I)}}for(let S=0;S<e;S++)for(let M=0;M<t.length-1;M++){const P=M+S*t.length,N=P,O=P+t.length,U=P+t.length+1,H=P+1;o.push(N,O,H),o.push(U,H,O)}this.setIndex(o),this.setAttribute("position",new Me(l,3)),this.setAttribute("uv",new Me(c,2)),this.setAttribute("normal",new Me(d,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qi(t.points,t.segments,t.phiStart,t.phiLength)}}class Us extends Fe{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:h};const d=this;s=Math.floor(s),o=Math.floor(o);const f=[],p=[],_=[],m=[];let x=0;const y=[],g=n/2;let v=0;S(),l===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(f),this.setAttribute("position",new Me(p,3)),this.setAttribute("normal",new Me(_,3)),this.setAttribute("uv",new Me(m,2));function S(){const P=new Q,N=new Q;let O=0;const U=(e-t)/n;for(let H=0;H<=o;H++){const I=[],R=H/o,W=R*(e-t)+t;for(let k=0;k<=s;k++){const F=k/s,A=F*h+c,Z=Math.sin(A),at=Math.cos(A);N.x=W*Z,N.y=-R*n+g,N.z=W*at,p.push(N.x,N.y,N.z),P.set(Z,U,at).normalize(),_.push(P.x,P.y,P.z),m.push(F,1-R),I.push(x++)}y.push(I)}for(let H=0;H<s;H++)for(let I=0;I<o;I++){const R=y[I][H],W=y[I+1][H],k=y[I+1][H+1],F=y[I][H+1];f.push(R,W,F),f.push(W,k,F),O+=6}d.addGroup(v,O,0),v+=O}function M(P){const N=x,O=new yt,U=new Q;let H=0;const I=P===!0?t:e,R=P===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,g*R,0),_.push(0,R,0),m.push(.5,.5),x++;const W=x;for(let k=0;k<=s;k++){const A=k/s*h+c,Z=Math.cos(A),at=Math.sin(A);U.x=I*at,U.y=g*R,U.z=I*Z,p.push(U.x,U.y,U.z),_.push(0,R,0),O.x=Z*.5+.5,O.y=at*.5*R+.5,m.push(O.x,O.y),x++}for(let k=0;k<s;k++){const F=N+k,A=W+k;P===!0?f.push(A,A+1,F):f.push(A+1,A,F),H+=3}d.addGroup(v,H,P===!0?1:2),v+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Us(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class cc extends Us{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new cc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}const No=new Q,Oo=new Q,Ml=new Q,Uo=new Fn;class fx extends Fe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(Ls*e),l=t.getIndex(),c=t.getAttribute("position"),h=l?l.count:c.count,d=[0,0,0],f=["a","b","c"],p=new Array(3),_={},m=[];for(let x=0;x<h;x+=3){l?(d[0]=l.getX(x),d[1]=l.getX(x+1),d[2]=l.getX(x+2)):(d[0]=x,d[1]=x+1,d[2]=x+2);const{a:y,b:g,c:v}=Uo;if(y.fromBufferAttribute(c,d[0]),g.fromBufferAttribute(c,d[1]),v.fromBufferAttribute(c,d[2]),Uo.getNormal(Ml),p[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,p[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,p[2]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const M=(S+1)%3,P=p[S],N=p[M],O=Uo[f[S]],U=Uo[f[M]],H=`${P}_${N}`,I=`${N}_${P}`;I in _&&_[I]?(Ml.dot(_[I].normal)<=o&&(m.push(O.x,O.y,O.z),m.push(U.x,U.y,U.z)),_[I]=null):H in _||(_[H]={index0:d[S],index1:d[M],normal:Ml.clone()})}}for(const x in _)if(_[x]){const{index0:y,index1:g}=_[x];No.fromBufferAttribute(c,y),Oo.fromBufferAttribute(c,g),m.push(No.x,No.y,No.z),m.push(Oo.x,Oo.y,Oo.z)}this.setAttribute("position",new Me(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class hc extends ku{constructor(t){super(t),this.uuid=Qr(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new ku().fromJSON(s))}return this}}const px={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let o=Yd(r,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,h,d,f,p,_,m;if(n&&(o=yx(r,t,o,e)),r.length>80*e){c=d=r[0],h=f=r[1];for(let x=e;x<s;x+=e)p=r[x],_=r[x+1],p<c&&(c=p),_<h&&(h=_),p>d&&(d=p),_>f&&(f=_);m=Math.max(d-c,f-h),m=m!==0?32767/m:0}return ks(o,l,e,c,h,m,0),l}};function Yd(r,t,e,n,s){let o,l;if(s===Px(r,t,e,n)>0)for(o=t;o<e;o+=n)l=zu(o,r[o],r[o+1],l);else for(o=e-n;o>=t;o-=n)l=zu(o,r[o],r[o+1],l);return l&&ua(l,l.next)&&(Bs(l),l=l.next),l}function sr(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(ua(e,e.next)||Te(e.prev,e,e.next)===0)){if(Bs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ks(r,t,e,n,s,o,l){if(!r)return;!l&&o&&Sx(r,n,s,o);let c=r,h,d;for(;r.prev!==r.next;){if(h=r.prev,d=r.next,o?gx(r,n,s,o):mx(r)){t.push(h.i/e|0),t.push(r.i/e|0),t.push(d.i/e|0),Bs(r),r=d.next,c=d.next;continue}if(r=d,r===c){l?l===1?(r=_x(sr(r),t,e),ks(r,t,e,n,s,o,2)):l===2&&vx(r,t,e,n,s,o):ks(sr(r),t,e,n,s,o,1);break}}}function mx(r){const t=r.prev,e=r,n=r.next;if(Te(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,h=e.y,d=n.y,f=s<o?s<l?s:l:o<l?o:l,p=c<h?c<d?c:d:h<d?h:d,_=s>o?s>l?s:l:o>l?o:l,m=c>h?c>d?c:d:h>d?h:d;let x=n.next;for(;x!==t;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=m&&Hr(s,c,o,h,l,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function gx(r,t,e,n){const s=r.prev,o=r,l=r.next;if(Te(s,o,l)>=0)return!1;const c=s.x,h=o.x,d=l.x,f=s.y,p=o.y,_=l.y,m=c<h?c<d?c:d:h<d?h:d,x=f<p?f<_?f:_:p<_?p:_,y=c>h?c>d?c:d:h>d?h:d,g=f>p?f>_?f:_:p>_?p:_,v=Wl(m,x,t,e,n),S=Wl(y,g,t,e,n);let M=r.prevZ,P=r.nextZ;for(;M&&M.z>=v&&P&&P.z<=S;){if(M.x>=m&&M.x<=y&&M.y>=x&&M.y<=g&&M!==s&&M!==l&&Hr(c,f,h,p,d,_,M.x,M.y)&&Te(M.prev,M,M.next)>=0||(M=M.prevZ,P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Hr(c,f,h,p,d,_,P.x,P.y)&&Te(P.prev,P,P.next)>=0))return!1;P=P.nextZ}for(;M&&M.z>=v;){if(M.x>=m&&M.x<=y&&M.y>=x&&M.y<=g&&M!==s&&M!==l&&Hr(c,f,h,p,d,_,M.x,M.y)&&Te(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;P&&P.z<=S;){if(P.x>=m&&P.x<=y&&P.y>=x&&P.y<=g&&P!==s&&P!==l&&Hr(c,f,h,p,d,_,P.x,P.y)&&Te(P.prev,P,P.next)>=0)return!1;P=P.nextZ}return!0}function _x(r,t,e){let n=r;do{const s=n.prev,o=n.next.next;!ua(s,o)&&$d(s,n,n.next,o)&&zs(s,o)&&zs(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),Bs(n),Bs(n.next),n=r=o),n=n.next}while(n!==r);return sr(n)}function vx(r,t,e,n,s,o){let l=r;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&Ax(l,c)){let h=Kd(l,c);l=sr(l,l.next),h=sr(h,h.next),ks(l,t,e,n,s,o,0),ks(h,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==r)}function yx(r,t,e,n){const s=[];let o,l,c,h,d;for(o=0,l=t.length;o<l;o++)c=t[o]*n,h=o<l-1?t[o+1]*n:r.length,d=Yd(r,c,h,n,!1),d===d.next&&(d.steiner=!0),s.push(Tx(d));for(s.sort(xx),o=0;o<s.length;o++)e=bx(s[o],e);return e}function xx(r,t){return r.x-t.x}function bx(r,t){const e=wx(r,t);if(!e)return t;const n=Kd(e,r);return sr(n,n.next),sr(e,e.next)}function wx(r,t){let e=t,n=-1/0,s;const o=r.x,l=r.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const _=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(_<=o&&_>n&&(n=_,s=e.x<e.next.x?e:e.next,_===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,h=s.x,d=s.y;let f=1/0,p;e=s;do o>=e.x&&e.x>=h&&o!==e.x&&Hr(l<d?o:n,l,h,d,l<d?n:o,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(o-e.x),zs(e,r)&&(p<f||p===f&&(e.x>s.x||e.x===s.x&&Mx(s,e)))&&(s=e,f=p)),e=e.next;while(e!==c);return s}function Mx(r,t){return Te(r.prev,r,t.prev)<0&&Te(t.next,r,r.next)<0}function Sx(r,t,e,n){let s=r;do s.z===0&&(s.z=Wl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,Ex(s)}function Ex(r){let t,e,n,s,o,l,c,h,d=1;do{for(e=r,r=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(h=d;c>0||h>0&&n;)c!==0&&(h===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,h--),o?o.nextZ=s:r=s,s.prevZ=o,o=s;e=n}o.nextZ=null,d*=2}while(l>1);return r}function Wl(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function Tx(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Hr(r,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(r-l)*(o-c)&&(r-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function Ax(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!Cx(r,t)&&(zs(r,t)&&zs(t,r)&&Lx(r,t)&&(Te(r.prev,r,t.prev)||Te(r,t.prev,t))||ua(r,t)&&Te(r.prev,r,r.next)>0&&Te(t.prev,t,t.next)>0)}function Te(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function ua(r,t){return r.x===t.x&&r.y===t.y}function $d(r,t,e,n){const s=zo(Te(r,t,e)),o=zo(Te(r,t,n)),l=zo(Te(e,n,r)),c=zo(Te(e,n,t));return!!(s!==o&&l!==c||s===0&&ko(r,e,t)||o===0&&ko(r,n,t)||l===0&&ko(e,r,n)||c===0&&ko(e,t,n))}function ko(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function zo(r){return r>0?1:r<0?-1:0}function Cx(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&$d(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function zs(r,t){return Te(r.prev,r,r.next)<0?Te(r,t,r.next)>=0&&Te(r,r.prev,t)>=0:Te(r,t,r.prev)<0||Te(r,r.next,t)<0}function Lx(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,o=(r.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function Kd(r,t){const e=new Zl(r.i,r.x,r.y),n=new Zl(t.i,t.x,t.y),s=r.next,o=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function zu(r,t,e,n){const s=new Zl(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Bs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function Zl(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Px(r,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(r[l]-r[o])*(r[o+1]+r[l+1]),l=o;return s}class Is{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return Is.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];Bu(t),Fu(n,t);let l=t.length;e.forEach(Bu);for(let h=0;h<e.length;h++)s.push(l),l+=e[h].length,Fu(n,e[h]);const c=px.triangulate(n,s);for(let h=0;h<c.length;h+=3)o.push(c.slice(h,h+3));return o}}function Bu(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Fu(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class da extends Fe{constructor(t=new hc([new yt(.5,.5),new yt(-.5,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,h=t.length;c<h;c++){const d=t[c];l(d)}this.setAttribute("position",new Me(s,3)),this.setAttribute("uv",new Me(o,2)),this.computeVertexNormals();function l(c){const h=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let _=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:m-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const v=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:Rx;let M,P=!1,N,O,U,H;v&&(M=v.getSpacedPoints(f),P=!0,_=!1,N=v.computeFrenetFrames(f,!1),O=new Q,U=new Q,H=new Q),_||(g=0,m=0,x=0,y=0);const I=c.extractPoints(d);let R=I.shape;const W=I.holes;if(!Is.isClockWise(R)){R=R.reverse();for(let vt=0,xt=W.length;vt<xt;vt++){const E=W[vt];Is.isClockWise(E)&&(W[vt]=E.reverse())}}const F=Is.triangulateShape(R,W),A=R;for(let vt=0,xt=W.length;vt<xt;vt++){const E=W[vt];R=R.concat(E)}function Z(vt,xt,E){return xt||console.error("THREE.ExtrudeGeometry: vec does not exist"),vt.clone().addScaledVector(xt,E)}const at=R.length,ot=F.length;function j(vt,xt,E){let et,$,C;const w=vt.x-xt.x,B=vt.y-xt.y,X=E.x-vt.x,K=E.y-vt.y,G=w*w+B*B,ft=w*K-B*X;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(G),pt=Math.sqrt(X*X+K*K),Tt=xt.x-B/lt,Et=xt.y+w/lt,At=E.x-K/pt,Ht=E.y+X/pt,zt=((At-Tt)*K-(Ht-Et)*X)/(w*K-B*X);et=Tt+w*zt-vt.x,$=Et+B*zt-vt.y;const Dt=et*et+$*$;if(Dt<=2)return new yt(et,$);C=Math.sqrt(Dt/2)}else{let lt=!1;w>Number.EPSILON?X>Number.EPSILON&&(lt=!0):w<-Number.EPSILON?X<-Number.EPSILON&&(lt=!0):Math.sign(B)===Math.sign(K)&&(lt=!0),lt?(et=-B,$=w,C=Math.sqrt(G)):(et=w,$=B,C=Math.sqrt(G/2))}return new yt(et/C,$/C)}const st=[];for(let vt=0,xt=A.length,E=xt-1,et=vt+1;vt<xt;vt++,E++,et++)E===xt&&(E=0),et===xt&&(et=0),st[vt]=j(A[vt],A[E],A[et]);const rt=[];let q,tt=st.concat();for(let vt=0,xt=W.length;vt<xt;vt++){const E=W[vt];q=[];for(let et=0,$=E.length,C=$-1,w=et+1;et<$;et++,C++,w++)C===$&&(C=0),w===$&&(w=0),q[et]=j(E[et],E[C],E[w]);rt.push(q),tt=tt.concat(q)}for(let vt=0;vt<g;vt++){const xt=vt/g,E=m*Math.cos(xt*Math.PI/2),et=x*Math.sin(xt*Math.PI/2)+y;for(let $=0,C=A.length;$<C;$++){const w=Z(A[$],st[$],et);St(w.x,w.y,-E)}for(let $=0,C=W.length;$<C;$++){const w=W[$];q=rt[$];for(let B=0,X=w.length;B<X;B++){const K=Z(w[B],q[B],et);St(K.x,K.y,-E)}}}const Lt=x+y;for(let vt=0;vt<at;vt++){const xt=_?Z(R[vt],tt[vt],Lt):R[vt];P?(U.copy(N.normals[0]).multiplyScalar(xt.x),O.copy(N.binormals[0]).multiplyScalar(xt.y),H.copy(M[0]).add(U).add(O),St(H.x,H.y,H.z)):St(xt.x,xt.y,0)}for(let vt=1;vt<=f;vt++)for(let xt=0;xt<at;xt++){const E=_?Z(R[xt],tt[xt],Lt):R[xt];P?(U.copy(N.normals[vt]).multiplyScalar(E.x),O.copy(N.binormals[vt]).multiplyScalar(E.y),H.copy(M[vt]).add(U).add(O),St(H.x,H.y,H.z)):St(E.x,E.y,p/f*vt)}for(let vt=g-1;vt>=0;vt--){const xt=vt/g,E=m*Math.cos(xt*Math.PI/2),et=x*Math.sin(xt*Math.PI/2)+y;for(let $=0,C=A.length;$<C;$++){const w=Z(A[$],st[$],et);St(w.x,w.y,p+E)}for(let $=0,C=W.length;$<C;$++){const w=W[$];q=rt[$];for(let B=0,X=w.length;B<X;B++){const K=Z(w[B],q[B],et);P?St(K.x,K.y+M[f-1].y,M[f-1].x+E):St(K.x,K.y,p+E)}}}J(),nt();function J(){const vt=s.length/3;if(_){let xt=0,E=at*xt;for(let et=0;et<ot;et++){const $=F[et];Pt($[2]+E,$[1]+E,$[0]+E)}xt=f+g*2,E=at*xt;for(let et=0;et<ot;et++){const $=F[et];Pt($[0]+E,$[1]+E,$[2]+E)}}else{for(let xt=0;xt<ot;xt++){const E=F[xt];Pt(E[2],E[1],E[0])}for(let xt=0;xt<ot;xt++){const E=F[xt];Pt(E[0]+at*f,E[1]+at*f,E[2]+at*f)}}n.addGroup(vt,s.length/3-vt,0)}function nt(){const vt=s.length/3;let xt=0;wt(A,xt),xt+=A.length;for(let E=0,et=W.length;E<et;E++){const $=W[E];wt($,xt),xt+=$.length}n.addGroup(vt,s.length/3-vt,1)}function wt(vt,xt){let E=vt.length;for(;--E>=0;){const et=E;let $=E-1;$<0&&($=vt.length-1);for(let C=0,w=f+g*2;C<w;C++){const B=at*C,X=at*(C+1),K=xt+et+B,G=xt+$+B,ft=xt+$+X,lt=xt+et+X;It(K,G,ft,lt)}}}function St(vt,xt,E){h.push(vt),h.push(xt),h.push(E)}function Pt(vt,xt,E){kt(vt),kt(xt),kt(E);const et=s.length/3,$=S.generateTopUV(n,s,et-3,et-2,et-1);it($[0]),it($[1]),it($[2])}function It(vt,xt,E,et){kt(vt),kt(xt),kt(et),kt(xt),kt(E),kt(et);const $=s.length/3,C=S.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);it(C[0]),it(C[1]),it(C[3]),it(C[1]),it(C[2]),it(C[3])}function kt(vt){s.push(h[vt*3+0]),s.push(h[vt*3+1]),s.push(h[vt*3+2])}function it(vt){o.push(vt.x),o.push(vt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ix(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Gl[s.type]().fromJSON(s)),new da(n,t.options)}}const Rx={generateTopUV:function(r,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],h=t[n*3+1],d=t[s*3],f=t[s*3+1];return[new yt(o,l),new yt(c,h),new yt(d,f)]},generateSideWallUV:function(r,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],h=t[e*3+2],d=t[n*3],f=t[n*3+1],p=t[n*3+2],_=t[s*3],m=t[s*3+1],x=t[s*3+2],y=t[o*3],g=t[o*3+1],v=t[o*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new yt(l,1-h),new yt(d,1-p),new yt(_,1-x),new yt(y,1-v)]:[new yt(c,1-h),new yt(f,1-p),new yt(m,1-x),new yt(g,1-v)]}};function Ix(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const o=r[n];e.shapes.push(o.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ta extends Fe{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],f=new Q,p=new Q,_=new Q;for(let m=0;m<=n;m++)for(let x=0;x<=s;x++){const y=x/s*o,g=m/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(y),p.y=(t+e*Math.cos(g))*Math.sin(y),p.z=e*Math.sin(g),c.push(p.x,p.y,p.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),_.subVectors(p,f).normalize(),h.push(_.x,_.y,_.z),d.push(x/s),d.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=s;x++){const y=(s+1)*m+x-1,g=(s+1)*(m-1)+x-1,v=(s+1)*(m-1)+x,S=(s+1)*m+x;l.push(y,g,S),l.push(g,v,S)}this.setIndex(l),this.setAttribute("position",new Me(c,3)),this.setAttribute("normal",new Me(h,3)),this.setAttribute("uv",new Me(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ta(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class tr extends lr{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sl extends lr{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wn,this.combine=tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Jd extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ie(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const El=new Ae,Hu=new Q,Vu=new Q;class Dx{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rc,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new qe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Hu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hu),Vu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vu),e.updateMatrixWorld(),El.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(El),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(El)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Nx extends Dx{constructor(){super(new Nd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Xl extends Jd{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new Nx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Qd extends Jd{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Gu{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Xe(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ql}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ql);const Wu={type:"change"},Tl={type:"start"},Zu={type:"end"},Bo=new ic,Xu=new Ai,Ox=Math.cos(70*Gm.DEG2RAD);class tf extends ar{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new Q,this.cursor=new Q,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:_r.ROTATE,MIDDLE:_r.DOLLY,RIGHT:_r.PAN},this.touches={ONE:vr.ROTATE,TWO:vr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",At),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",At),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Wu),n.update(),o=s.NONE},this.update=function(){const D=new Q,ut=new rr().setFromUnitVectors(t.up,new Q(0,1,0)),Mt=ut.clone().invert(),Rt=new Q,Nt=new rr,re=new Q,he=2*Math.PI;return function(Ie=null){const me=n.object.position;D.copy(me).sub(n.target),D.applyQuaternion(ut),c.setFromVector3(D),n.autoRotate&&o===s.NONE&&k(R(Ie)),n.enableDamping?(c.theta+=h.theta*n.dampingFactor,c.phi+=h.phi*n.dampingFactor):(c.theta+=h.theta,c.phi+=h.phi);let Ce=n.minAzimuthAngle,Se=n.maxAzimuthAngle;isFinite(Ce)&&isFinite(Se)&&(Ce<-Math.PI?Ce+=he:Ce>Math.PI&&(Ce-=he),Se<-Math.PI?Se+=he:Se>Math.PI&&(Se-=he),Ce<=Se?c.theta=Math.max(Ce,Math.min(Se,c.theta)):c.theta=c.theta>(Ce+Se)/2?Math.max(Ce,c.theta):Math.min(Se,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let nn=!1;if(n.zoomToCursor&&O||n.object.isOrthographicCamera)c.radius=rt(c.radius);else{const un=c.radius;c.radius=rt(c.radius*d),nn=un!=c.radius}if(D.setFromSpherical(c),D.applyQuaternion(Mt),me.copy(n.target).add(D),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&O){let un=null;if(n.object.isPerspectiveCamera){const Zn=D.length();un=rt(Zn*d);const gi=Zn-un;n.object.position.addScaledVector(P,gi),n.object.updateMatrixWorld(),nn=!!gi}else if(n.object.isOrthographicCamera){const Zn=new Q(N.x,N.y,0);Zn.unproject(n.object);const gi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),nn=gi!==n.object.zoom;const He=new Q(N.x,N.y,0);He.unproject(n.object),n.object.position.sub(He).add(Zn),n.object.updateMatrixWorld(),un=D.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;un!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(un).add(n.object.position):(Bo.origin.copy(n.object.position),Bo.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Bo.direction))<Ox?t.lookAt(n.target):(Xu.setFromNormalAndCoplanarPoint(n.object.up,n.target),Bo.intersectPlane(Xu,n.target))))}else if(n.object.isOrthographicCamera){const un=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),un!==n.object.zoom&&(n.object.updateProjectionMatrix(),nn=!0)}return d=1,O=!1,nn||Rt.distanceToSquared(n.object.position)>l||8*(1-Nt.dot(n.object.quaternion))>l||re.distanceToSquared(n.target)>l?(n.dispatchEvent(Wu),Rt.copy(n.object.position),Nt.copy(n.object.quaternion),re.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",K),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.domElement.getRootNode().removeEventListener("keydown",Tt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",At),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new Gu,h=new Gu;let d=1;const f=new Q,p=new yt,_=new yt,m=new yt,x=new yt,y=new yt,g=new yt,v=new yt,S=new yt,M=new yt,P=new Q,N=new yt;let O=!1;const U=[],H={};let I=!1;function R(D){return D!==null?2*Math.PI/60*n.autoRotateSpeed*D:2*Math.PI/60/60*n.autoRotateSpeed}function W(D){const ut=Math.abs(D*.01);return Math.pow(.95,n.zoomSpeed*ut)}function k(D){h.theta-=D}function F(D){h.phi-=D}const A=function(){const D=new Q;return function(Mt,Rt){D.setFromMatrixColumn(Rt,0),D.multiplyScalar(-Mt),f.add(D)}}(),Z=function(){const D=new Q;return function(Mt,Rt){n.screenSpacePanning===!0?D.setFromMatrixColumn(Rt,1):(D.setFromMatrixColumn(Rt,0),D.crossVectors(n.object.up,D)),D.multiplyScalar(Mt),f.add(D)}}(),at=function(){const D=new Q;return function(Mt,Rt){const Nt=n.domElement;if(n.object.isPerspectiveCamera){const re=n.object.position;D.copy(re).sub(n.target);let he=D.length();he*=Math.tan(n.object.fov/2*Math.PI/180),A(2*Mt*he/Nt.clientHeight,n.object.matrix),Z(2*Rt*he/Nt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(A(Mt*(n.object.right-n.object.left)/n.object.zoom/Nt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/Nt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ot(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function st(D,ut){if(!n.zoomToCursor)return;O=!0;const Mt=n.domElement.getBoundingClientRect(),Rt=D-Mt.left,Nt=ut-Mt.top,re=Mt.width,he=Mt.height;N.x=Rt/re*2-1,N.y=-(Nt/he)*2+1,P.set(N.x,N.y,1).unproject(n.object).sub(n.object.position).normalize()}function rt(D){return Math.max(n.minDistance,Math.min(n.maxDistance,D))}function q(D){p.set(D.clientX,D.clientY)}function tt(D){st(D.clientX,D.clientX),v.set(D.clientX,D.clientY)}function Lt(D){x.set(D.clientX,D.clientY)}function J(D){_.set(D.clientX,D.clientY),m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ut=n.domElement;k(2*Math.PI*m.x/ut.clientHeight),F(2*Math.PI*m.y/ut.clientHeight),p.copy(_),n.update()}function nt(D){S.set(D.clientX,D.clientY),M.subVectors(S,v),M.y>0?ot(W(M.y)):M.y<0&&j(W(M.y)),v.copy(S),n.update()}function wt(D){y.set(D.clientX,D.clientY),g.subVectors(y,x).multiplyScalar(n.panSpeed),at(g.x,g.y),x.copy(y),n.update()}function St(D){st(D.clientX,D.clientY),D.deltaY<0?j(W(D.deltaY)):D.deltaY>0&&ot(W(D.deltaY)),n.update()}function Pt(D){let ut=!1;switch(D.code){case n.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?F(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(0,n.keyPanSpeed),ut=!0;break;case n.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?F(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(0,-n.keyPanSpeed),ut=!0;break;case n.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(n.keyPanSpeed,0),ut=!0;break;case n.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(-n.keyPanSpeed,0),ut=!0;break}ut&&(D.preventDefault(),n.update())}function It(D){if(U.length===1)p.set(D.pageX,D.pageY);else{const ut=Qt(D),Mt=.5*(D.pageX+ut.x),Rt=.5*(D.pageY+ut.y);p.set(Mt,Rt)}}function kt(D){if(U.length===1)x.set(D.pageX,D.pageY);else{const ut=Qt(D),Mt=.5*(D.pageX+ut.x),Rt=.5*(D.pageY+ut.y);x.set(Mt,Rt)}}function it(D){const ut=Qt(D),Mt=D.pageX-ut.x,Rt=D.pageY-ut.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);v.set(0,Nt)}function vt(D){n.enableZoom&&it(D),n.enablePan&&kt(D)}function xt(D){n.enableZoom&&it(D),n.enableRotate&&It(D)}function E(D){if(U.length==1)_.set(D.pageX,D.pageY);else{const Mt=Qt(D),Rt=.5*(D.pageX+Mt.x),Nt=.5*(D.pageY+Mt.y);_.set(Rt,Nt)}m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ut=n.domElement;k(2*Math.PI*m.x/ut.clientHeight),F(2*Math.PI*m.y/ut.clientHeight),p.copy(_)}function et(D){if(U.length===1)y.set(D.pageX,D.pageY);else{const ut=Qt(D),Mt=.5*(D.pageX+ut.x),Rt=.5*(D.pageY+ut.y);y.set(Mt,Rt)}g.subVectors(y,x).multiplyScalar(n.panSpeed),at(g.x,g.y),x.copy(y)}function $(D){const ut=Qt(D),Mt=D.pageX-ut.x,Rt=D.pageY-ut.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);S.set(0,Nt),M.set(0,Math.pow(S.y/v.y,n.zoomSpeed)),ot(M.y),v.copy(S);const re=(D.pageX+ut.x)*.5,he=(D.pageY+ut.y)*.5;st(re,he)}function C(D){n.enableZoom&&$(D),n.enablePan&&et(D)}function w(D){n.enableZoom&&$(D),n.enableRotate&&E(D)}function B(D){n.enabled!==!1&&(U.length===0&&(n.domElement.setPointerCapture(D.pointerId),n.domElement.addEventListener("pointermove",X),n.domElement.addEventListener("pointerup",K)),!oe(D)&&(Kt(D),D.pointerType==="touch"?Ht(D):G(D)))}function X(D){n.enabled!==!1&&(D.pointerType==="touch"?zt(D):ft(D))}function K(D){switch(Vt(D),U.length){case 0:n.domElement.releasePointerCapture(D.pointerId),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",K),n.dispatchEvent(Zu),o=s.NONE;break;case 1:const ut=U[0],Mt=H[ut];Ht({pointerId:ut,pageX:Mt.x,pageY:Mt.y});break}}function G(D){let ut;switch(D.button){case 0:ut=n.mouseButtons.LEFT;break;case 1:ut=n.mouseButtons.MIDDLE;break;case 2:ut=n.mouseButtons.RIGHT;break;default:ut=-1}switch(ut){case _r.DOLLY:if(n.enableZoom===!1)return;tt(D),o=s.DOLLY;break;case _r.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enablePan===!1)return;Lt(D),o=s.PAN}else{if(n.enableRotate===!1)return;q(D),o=s.ROTATE}break;case _r.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enableRotate===!1)return;q(D),o=s.ROTATE}else{if(n.enablePan===!1)return;Lt(D),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Tl)}function ft(D){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;J(D);break;case s.DOLLY:if(n.enableZoom===!1)return;nt(D);break;case s.PAN:if(n.enablePan===!1)return;wt(D);break}}function lt(D){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(D.preventDefault(),n.dispatchEvent(Tl),St(pt(D)),n.dispatchEvent(Zu))}function pt(D){const ut=D.deltaMode,Mt={clientX:D.clientX,clientY:D.clientY,deltaY:D.deltaY};switch(ut){case 1:Mt.deltaY*=16;break;case 2:Mt.deltaY*=100;break}return D.ctrlKey&&!I&&(Mt.deltaY*=10),Mt}function Tt(D){D.key==="Control"&&(I=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(D){D.key==="Control"&&(I=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function At(D){n.enabled===!1||n.enablePan===!1||Pt(D)}function Ht(D){switch(ae(D),U.length){case 1:switch(n.touches.ONE){case vr.ROTATE:if(n.enableRotate===!1)return;It(D),o=s.TOUCH_ROTATE;break;case vr.PAN:if(n.enablePan===!1)return;kt(D),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case vr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;vt(D),o=s.TOUCH_DOLLY_PAN;break;case vr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xt(D),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Tl)}function zt(D){switch(ae(D),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;E(D),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;et(D),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;C(D),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;w(D),n.update();break;default:o=s.NONE}}function Dt(D){n.enabled!==!1&&D.preventDefault()}function Kt(D){U.push(D.pointerId)}function Vt(D){delete H[D.pointerId];for(let ut=0;ut<U.length;ut++)if(U[ut]==D.pointerId){U.splice(ut,1);return}}function oe(D){for(let ut=0;ut<U.length;ut++)if(U[ut]==D.pointerId)return!0;return!1}function ae(D){let ut=H[D.pointerId];ut===void 0&&(ut=new yt,H[D.pointerId]=ut),ut.set(D.pageX,D.pageY)}function Qt(D){const ut=D.pointerId===U[0]?U[1]:U[0];return H[ut]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",K),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Tt,{passive:!0,capture:!0}),this.update()}}let Fo=null;function uc(r){return Fo||(Fo=new Promise(t=>{const e=r.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new Hd({canvas:r,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=ud,o.toneMappingExposure=1,bt.renderer=o;const l=new Vd;l.background=new ie(12113128),bt.scene=l;const c=new bn(45,n/s,.5,8e3);c.position.set(0,200,350),bt.camera=c;const h=new tf(c,r);h.enableDamping=!0,h.dampingFactor=.07,h.minDistance=10,h.maxDistance=4e3,h.screenSpacePanning=!0,h.maxPolarAngle=Math.PI/2,bt.controls=h,l.add(new Qd(16777215,.78));const d=new Xl(16775924,.95);d.position.set(-250,700,200),l.add(d);const f=new Xl(14544639,.4);f.position.set(200,250,-200),l.add(f);const p=new As;l.add(p),bt.tg=p,window.addEventListener("resize",()=>{const m=e.clientWidth,x=e.clientHeight;!m||!x||(c.aspect=m/x,c.updateProjectionMatrix(),o.setSize(m,x))});function _(){requestAnimationFrame(_),h.update(),o.render(l,c)}_(),t()}),Fo)}function Ux(){if(bt.tg)for(;bt.tg.children.length;){const r=bt.tg.children[0];bt.tg.remove(r),r.geometry?.dispose(),Array.isArray(r.material)?r.material.forEach(t=>t.dispose()):r.material?.dispose()}}const kx="#f0ede8",zx="#c0bbb5",Bx="#0fe300",Fx="#0fe300",Hx="#0fe300",Vx="#0fe300",Gx="#262626",Ur="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function ef(r,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:h,BASE_H:d}=bt;if(!e||!n)return d;const f=(r+s/2)/s*(n-1),p=(t+o/2)/o*(n-1),_=Math.max(0,Math.min(n-2,Math.floor(f))),m=Math.max(0,Math.min(n-2,Math.floor(p))),x=f-_,y=p-m,g=e[m*n+_]??l,v=e[m*n+_+1]??l,S=e[(m+1)*n+_]??l,M=e[(m+1)*n+_+1]??l,P=g*(1-x)*(1-y)+v*x*(1-y)+S*(1-x)*y+M*x*y;return d+Math.max(0,Math.min(1,(P-l)/Math.max(.001,c)))*h}function Ho(r,t,e){if(!r.positions.length||!r.indices.length)return null;const n=new Fe;n.setAttribute("position",new En(r.positions,3)),r.colors&&n.setAttribute("color",new En(r.colors,3)),n.setIndex(new En(r.indices,1)),n.computeVertexNormals();const s=new ke(n,t);return s.name=e,s}function Wx(r){if(!bt.tg)return;Ux();const t=id(),e=bt.tg;function n(o,l,c,h=-8){l.polygonOffset=!0,l.polygonOffsetFactor=h,l.polygonOffsetUnits=h;const d=Ho(o,l,c);d&&e.add(d)}const s=(o,l=.95,c=!1)=>new tr({color:new ie(o),roughness:l,metalness:0,flatShading:c});{const o=new tr({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:mn,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=Ho(r.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=Zx(bt.wMm,bt.dMm,bt.zoneType);if(o){const l=new da(o,{depth:bt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new ke(l,new tr({color:new ie(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if(Xx(t.cBase),r.GROUND.positions.length){const o=new tr({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=Ho(r.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(r.LAND,s(kx),"LAND",-2),n(r.ROCK,s(zx),"ROCK",-3),n(r.FARM,s(Vx),"FARM",-4),n(r.GRASS,s(Bx),"GRASS",-5),n(r.PARKS,s(Hx),"PARKS",-6),n(r.FOREST,s(Fx),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=mn,n(r.WATER,o,"WATER",-8)}if(t.roadsOn){n(r.PED,s(Gx,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=mn,n(r.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(r.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),r.GPX.positions.length){const o=new tr({color:new ie(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=Ho(r.GPX,o,"GPX");l&&e.add(l)}Yx()}function Zx(r,t,e){const n=new hc;if(e==="circ")n.ellipse(0,0,r/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(r/2*Math.cos(o),r/2*Math.sin(o)):n.lineTo(r/2*Math.cos(o),r/2*Math.sin(o))}n.closePath()}else n.moveTo(-r/2,-t/2),n.lineTo(r/2,-t/2),n.lineTo(r/2,t/2),n.lineTo(-r/2,t/2),n.closePath();return n}function Xx(r){if(!bt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=bt,o=new tr({color:new ie(r),roughness:.55,side:mn});function l(h,d){return{x:h,z:d,topY:Math.max(n,ef(h*.98,d*.98))}}function c(h){const d=[],f=[];let p=0;const _=h.length;for(let y=0;y<_;y++){const g=h[y],v=h[(y+1)%_],S=(g.x+v.x)/2,M=(g.z+v.z)/2,P=S*(v.z-g.z)-M*(v.x-g.x),[N,O]=P>=0?[g,v]:[v,g];d.push(N.x,N.topY,N.z,O.x,O.topY,O.z,O.x,0,O.z,N.x,0,N.z),f.push(p,p+1,p+2,p,p+2,p+3),p+=4}if(!d.length)return;const m=new Fe;m.setAttribute("position",new Me(d,3)),m.setIndex(f),m.computeVertexNormals();const x=new ke(m,o);x.name="WALLS",bt.tg.add(x)}if(s==="circ"){const d=t/2;c(Array.from({length:512},(f,p)=>{const _=p/512*Math.PI*2;return l(d*Math.cos(_),d*Math.sin(_))}))}else if(s==="hex"){const h=t/2;c(Array.from({length:6},(d,f)=>{const p=f/6*Math.PI*2-Math.PI/6;return l(h*Math.cos(p),h*Math.sin(p))}))}else if(bt.zonePts&&bt.zonePts.length>=3&&bt.bounds){const{bounds:h}=bt,d=e/(h.maxLat-h.minLat),f=t/(h.maxLon-h.minLon),p=(h.minLat+h.maxLat)/2,_=(h.minLon+h.maxLon)/2;c(bt.zonePts.map(([m,x])=>l((x-_)*f,-(m-p)*d)))}else{const h=-t/2,d=t/2,f=-e/2,p=e/2;c([l(h,f),l(d,f),l(d,p),l(h,p)])}}const qx=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function Al(r){const t=[],e=[];let n=0;for(const o of r){const l=o.attributes.position,c=o.index;for(let h=0;h<l.count;h++)t.push(l.getX(h),l.getY(h),l.getZ(h));if(c)for(let h=0;h<c.count;h++)e.push(c.getX(h)+n);else for(let h=0;h<l.count;h++)e.push(h+n);n+=l.count,o.dispose()}const s=new Fe;return s.setAttribute("position",new Me(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function jx(r,t,e,n){const s=t/2,o=n/2;try{switch(r){case"eiffel":{const l=[new yt(s,0),new yt(s*.82,e*.035),new yt(s*.58,e*.08),new yt(s*.32,e*.135),new yt(s*.265,e*.165),new yt(s*.285,e*.175),new yt(s*.245,e*.188),new yt(s*.18,e*.23),new yt(s*.13,e*.33),new yt(s*.115,e*.348),new yt(s*.13,e*.358),new yt(s*.11,e*.37),new yt(s*.08,e*.43),new yt(s*.048,e*.6),new yt(s*.026,e*.83),new yt(s*.01,e*.94),new yt(0,e)],c=new Qi(l,4);c.rotateY(Math.PI/4);const h=new Us(s*.32,s*.32,e*.012,16,1,!1);h.translate(0,e*.175,0);const d=new Us(s*.145,s*.145,e*.01,16,1,!1);return d.translate(0,e*.358,0),Al([c,h,d])}case"burj":{const l=[new yt(s,0),new yt(s*.8,e*.15),new yt(s*.55,e*.4),new yt(s*.25,e*.72),new yt(s*.08,e*.9),new yt(s*.02,e)];return new Qi(l,12)}case"dome":{const c=Array.from({length:13},(h,d)=>{const f=d/12*Math.PI/2;return new yt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new yt(s*.9,0),new yt(0,0)),new Qi(c,16)}case"onion":{const l=[new yt(s*.3,0),new yt(s*.55,e*.12),new yt(s,e*.4),new yt(s*.55,e*.65),new yt(s*.1,e*.85),new yt(s*.04,e)];return new Qi(l,12)}case"tower":{const l=[new yt(s,0),new yt(s*.65,e*.2),new yt(s*.3,e*.55),new yt(s*.1,e*.8),new yt(s*.03,e)];return new Qi(l,8)}case"pyramid":{const l=new cc(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,h=new ln(l,c,n);h.translate(-s+l/2,c/2,0);const d=new ln(l,c,n);d.translate(s-l/2,c/2,0);const f=new ln(t,e*.22,n);return f.translate(0,e*.89,0),Al([h,d,f])}case"cathedral":{const l=t*.55,c=e*.65,h=t*.14,d=new ln(l,c,n);d.translate(0,c/2,0);const f=new ln(h,e,h);f.translate(-l/2+h/2,e/2,-o+h/2);const p=new ln(h,e,h);return p.translate(l/2-h/2,e/2,-o+h/2),Al([d,f,p])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,h=new ta(l,Math.max(c,3),8,32);return h.scale(1,e/(l*.8),o/s),h.translate(0,e/2,0),h}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],h=new Fe;return h.setAttribute("position",new Me(l,3)),h.setIndex(c),h.computeVertexNormals(),h}case"wheel":{const l=Math.min(s,e/2),c=new ta(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new ln(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function Yx(){if(!bt.tg||!bt.bounds||!bt.elevGrid)return;const{bounds:r,wMm:t,dMm:e,mmPerMeter:n}=bt,s=(r.minLat+r.maxLat)/2,o=(r.minLon+r.maxLon)/2,l=e/(r.maxLat-r.minLat),c=t/(r.maxLon-r.minLon),h=.01;let d=0;for(const f of qx){if(f.lat<r.minLat-h||f.lat>r.maxLat+h||f.lon<r.minLon-h||f.lon>r.maxLon+h)continue;const p=(f.lon-o)*c,_=-(f.lat-s)*l,m=t/2,x=e/2;if(!(p>=-m-1&&p<=m+1&&_>=-x-1&&_<=x+1))continue;const g=ef(p,_),v=Math.min(t*.25,Math.max(5,f.rH*n*2)),S=Math.min(t*.08,Math.max(1.5,f.rW*n)),M=Math.min(t*.08,Math.max(1.5,f.rD*n)),P=jx(f.sh,S,v,M);if(!P)continue;P.translate(p,g,_);const N=new ke(P,new tr({color:new ie(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));N.name="LM_"+f.n,bt.tg.add(N),d++}d&&console.log(`Landmarks: ${d} monument(s)`)}var qr=Math.pow,tn=(r,t,e)=>new Promise((n,s)=>{var o=h=>{try{c(e.next(h))}catch(d){s(d)}},l=h=>{try{c(e.throw(h))}catch(d){s(d)}},c=h=>h.done?n(h.value):Promise.resolve(h.value).then(o,l);c((e=e.apply(r,t)).next())}),wn=Uint8Array,Ds=Uint16Array,$x=Int32Array,nf=new wn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),rf=new wn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Kx=new wn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),sf=function(r,t){for(var e=new Ds(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var s=new $x(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},of=sf(nf,2),af=of.b,Jx=of.r;af[28]=258,Jx[258]=28;var Qx=sf(rf,0),tb=Qx.b,lf=new Ds(32768);for(pe=0;pe<32768;++pe)ui=(pe&43690)>>1|(pe&21845)<<1,ui=(ui&52428)>>2|(ui&13107)<<2,ui=(ui&61680)>>4|(ui&3855)<<4,lf[pe]=((ui&65280)>>8|(ui&255)<<8)>>1;var ui,pe,Ns=function(r,t,e){for(var n=r.length,s=0,o=new Ds(t);s<n;++s)r[s]&&++o[r[s]-1];var l=new Ds(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new Ds(1<<t);var h=15-t;for(s=0;s<n;++s)if(r[s])for(var d=s<<4|r[s],f=t-r[s],p=l[r[s]-1]++<<f,_=p|(1<<f)-1;p<=_;++p)c[lf[p]>>h]=d}return c},Ws=new wn(288);for(pe=0;pe<144;++pe)Ws[pe]=8;var pe;for(pe=144;pe<256;++pe)Ws[pe]=9;var pe;for(pe=256;pe<280;++pe)Ws[pe]=7;var pe;for(pe=280;pe<288;++pe)Ws[pe]=8;var pe,cf=new wn(32);for(pe=0;pe<32;++pe)cf[pe]=5;var pe,eb=Ns(Ws,9),nb=Ns(cf,5),Cl=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},kn=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},Ll=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},ib=function(r){return(r+7)/8|0},rb=function(r,t,e){(e==null||e>r.length)&&(e=r.length);var n=new wn(e-t);return n.set(r.subarray(t,e)),n},sb=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],xn=function(r,t,e){var n=new Error(t||sb[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,xn),!e)throw n;return n},dc=function(r,t,e,n){var s=r.length,o=0;if(!s||t.f&&!t.l)return e||new wn(0);var l=!e||t.i!=2,c=t.i;e||(e=new wn(s*3));var h=function(kt){var it=e.length;if(kt>it){var vt=new wn(Math.max(it*2,kt));vt.set(e),e=vt}},d=t.f||0,f=t.p||0,p=t.b||0,_=t.l,m=t.d,x=t.m,y=t.n,g=s*8;do{if(!_){d=kn(r,f,1);var v=kn(r,f+1,3);if(f+=3,v)if(v==1)_=eb,m=nb,x=9,y=5;else if(v==2){var N=kn(r,f,31)+257,O=kn(r,f+10,15)+4,U=N+kn(r,f+5,31)+1;f+=14;for(var H=new wn(U),I=new wn(19),R=0;R<O;++R)I[Kx[R]]=kn(r,f+R*3,7);f+=O*3;for(var W=Cl(I),k=(1<<W)-1,F=Ns(I,W),R=0;R<U;){var A=F[kn(r,f,k)];f+=A&15;var S=A>>4;if(S<16)H[R++]=S;else{var Z=0,at=0;for(S==16?(at=3+kn(r,f,3),f+=2,Z=H[R-1]):S==17?(at=3+kn(r,f,7),f+=3):S==18&&(at=11+kn(r,f,127),f+=7);at--;)H[R++]=Z}}var ot=H.subarray(0,N),j=H.subarray(N);x=Cl(ot),y=Cl(j),_=Ns(ot,x),m=Ns(j,y)}else xn(1);else{var S=ib(f)+4,M=r[S-4]|r[S-3]<<8,P=S+M;if(P>s){c&&xn(0);break}l&&h(p+M),e.set(r.subarray(S,P),p),t.b=p+=M,t.p=f=P*8,t.f=d;continue}if(f>g){c&&xn(0);break}}l&&h(p+131072);for(var st=(1<<x)-1,rt=(1<<y)-1,q=f;;q=f){var Z=_[Ll(r,f)&st],tt=Z>>4;if(f+=Z&15,f>g){c&&xn(0);break}if(Z||xn(2),tt<256)e[p++]=tt;else if(tt==256){q=f,_=null;break}else{var Lt=tt-254;if(tt>264){var R=tt-257,J=nf[R];Lt=kn(r,f,(1<<J)-1)+af[R],f+=J}var nt=m[Ll(r,f)&rt],wt=nt>>4;nt||xn(3),f+=nt&15;var j=tb[wt];if(wt>3){var J=rf[wt];j+=Ll(r,f)&(1<<J)-1,f+=J}if(f>g){c&&xn(0);break}l&&h(p+131072);var St=p+Lt;if(p<j){var Pt=o-j,It=Math.min(j,St);for(Pt+p<0&&xn(3);p<It;++p)e[p]=n[Pt+p]}for(;p<St;p+=4)e[p]=e[p-j],e[p+1]=e[p+1-j],e[p+2]=e[p+2-j],e[p+3]=e[p+3-j];p=St}}t.l=_,t.p=q,t.b=p,t.f=d,_&&(d=1,t.m=x,t.d=m,t.n=y)}while(!d);return p==e.length?e:rb(e,0,p)},ob=new wn(0),ab=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&xn(6,"invalid gzip data");var t=r[3],e=10;t&4&&(e+=(r[10]|r[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!r[e++]);return e+(t&2)},lb=function(r){var t=r.length;return(r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0},cb=function(r,t){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&xn(6,"invalid zlib data"),(r[1]>>5&1)==1&&xn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function hb(r,t){return dc(r,{i:2},t,t)}function ub(r,t){var e=ab(r);return e+8>r.length&&xn(6,"invalid gzip data"),dc(r.subarray(e,-8),{i:2},new wn(lb(r)),t)}function db(r,t){return dc(r.subarray(cb(r),-4),{i:2},t,t)}function ql(r,t){return r[0]==31&&r[1]==139&&r[2]==8?ub(r,t):(r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31?hb(r,t):db(r,t)}var fb=typeof TextDecoder<"u"&&new TextDecoder,pb=0;try{fb.decode(ob,{stream:!0}),pb=1}catch{}var hf=(r,t)=>r*qr(2,t),bs=(r,t)=>Math.floor(r/qr(2,t)),ea=(r,t)=>hf(r.getUint16(t+1,!0),8)+r.getUint8(t),uf=(r,t)=>hf(r.getUint32(t+2,!0),16)+r.getUint16(t,!0),mb=(r,t,e,n,s)=>{if(r!==n.getUint8(s))return r-n.getUint8(s);const o=ea(n,s+1);if(t!==o)return t-o;const l=ea(n,s+4);return e!==l?e-l:0},gb=(r,t,e,n)=>{const s=df(r,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},qu=(r,t,e,n)=>{const s=df(r,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},df=(r,t,e,n)=>{let s=0,o=r.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=mb(t,e,n,r,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[uf(r,l*17+7),r.getUint32(l*17+13,!0)]}return null},_b=(r,t)=>r.isDir&&!t.isDir?1:!r.isDir&&t.isDir?-1:r.z!==t.z?r.z-t.z:r.x!==t.x?r.x-t.x:r.y-t.y,ff=(r,t)=>{const e=r.getUint8(t*17);return{z:e&127,x:ea(r,t*17+1),y:ea(r,t*17+4),offset:uf(r,t*17+7),length:r.getUint32(t*17+13,!0),isDir:e>>7===1}},ju=r=>{const t=[],e=new DataView(r);for(let n=0;n<e.byteLength/17;n++)t.push(ff(e,n));return vb(t)},vb=r=>{r.sort(_b);const t=new ArrayBuffer(17*r.length),e=new Uint8Array(t);for(let n=0;n<r.length;n++){const s=r[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=bs(s.offset,8)&255,e[n*17+9]=bs(s.offset,16)&255,e[n*17+10]=bs(s.offset,24)&255,e[n*17+11]=bs(s.offset,32)&255,e[n*17+12]=bs(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},yb=(r,t)=>{if(r.byteLength<17)return null;const e=r.byteLength/17,n=ff(r,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function xb(r){return tn(this,null,function*(){const t=yield r.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let h=0;"minzoom"in l&&(h=+l.minzoom);let d=0;"maxzoom"in l&&(d=+l.maxzoom);let f=0,p=0,_=0,m=-180,x=-85,y=180,g=85;if(l.bounds){const S=l.bounds.split(",");m=+S[0],x=+S[1],y=+S[2],g=+S[3]}if(l.center){const S=l.center.split(",");f=+S[0],p=+S[1],_=+S[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:h,maxZoom:d,minLon:m,minLat:x,maxLon:y,maxLat:g,centerZoom:_,centerLon:f,centerLat:p,etag:t.etag}})}function bb(r,t,e,n,s,o,l){return tn(this,null,function*(){let c=yield e.getArrayBuffer(t,r.rootDirectoryOffset,r.rootDirectoryLength,r);r.specVersion===1&&(c=ju(c));const h=qu(new DataView(c),n,s,o);if(h){let p=(yield t.getBytes(h.offset,h.length,l)).data;const _=new DataView(p);return _.getUint8(0)===31&&_.getUint8(1)===139&&(p=ql(new Uint8Array(p))),{data:p}}const d=yb(new DataView(c),{z:n,x:s,y:o});if(d){const f=gb(new DataView(c),d.z,d.x,d.y);if(f){let p=yield e.getArrayBuffer(t,f.offset,f.length,r);r.specVersion===1&&(p=ju(p));const _=qu(new DataView(p),n,s,o);if(_){let x=(yield t.getBytes(_.offset,_.length,l)).data;const y=new DataView(x);return y.getUint8(0)===31&&y.getUint8(1)===139&&(x=ql(new Uint8Array(x))),{data:x}}}}})}var pf={getHeader:xb,getZxy:bb};function kr(r,t){return(t>>>0)*4294967296+(r>>>0)}function wb(r,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return kr(r,s);throw new Error("Expected varint not more than 10 bytes")}function ws(r){const t=r.buf;let e=t[r.pos++],n=e&127;return e<128||(e=t[r.pos++],n|=(e&127)<<7,e<128)||(e=t[r.pos++],n|=(e&127)<<14,e<128)||(e=t[r.pos++],n|=(e&127)<<21,e<128)?n:(e=t[r.pos],n|=(e&15)<<28,wb(n,r))}function Mb(r,t,e,n){if(n===0){e===1&&(t[0]=r-1-t[0],t[1]=r-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var Sb=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function Eb(r,t,e){if(r>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>qr(2,r)-1||e>qr(2,r)-1)throw Error("tile x/y outside zoom level bounds");const n=Sb[r],s=qr(2,r);let o=0,l=0,c=0;const h=[t,e];let d=s/2;for(;d>0;)o=(h[0]&d)>0?1:0,l=(h[1]&d)>0?1:0,c+=d*d*(3*o^l),Mb(d,h,o,l),d=d/2;return n+c}function mf(r,t){return tn(this,null,function*(){if(t===1||t===0)return r;if(t===2){if(typeof globalThis.DecompressionStream>"u")return ql(new Uint8Array(r));const e=new Response(r).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function Tb(r){return r===1?".mvt":r===2?".png":r===3?".jpg":r===4?".webp":r===5?".avif":""}var Ab=127;function Cb(r,t){let e=0,n=r.length-1;for(;e<=n;){const s=n+e>>1,o=t-r[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return r[s]}return n>=0&&(r[n].runLength===0||t-r[n].tileId<r[n].runLength)?r[n]:null}var Lb=class{constructor(r,t=new Headers){this.url=r,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(r){this.customHeaders=r}getBytes(r,t,e,n){return tn(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${r}-${r+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let h=yield fetch(this.url,{signal:o,cache:c,headers:l});if(r===0&&h.status===416){const _=h.headers.get("Content-Range");if(!_||!_.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const m=+_.substr(8);h=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${m-1}`}})}let d=h.headers.get("Etag");if(d?.startsWith("W/")&&(d=null),h.status===416||n&&d&&d!==n)throw this.mustReload=!0,new jl(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(h.status>=300)throw Error(`Bad response code: ${h.status}`);const f=h.headers.get("Content-Length");if(h.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield h.arrayBuffer(),etag:d||void 0,cacheControl:h.headers.get("Cache-Control")||void 0,expires:h.headers.get("Expires")||void 0}})}};function zn(r,t){const e=r.getUint32(t+4,!0),n=r.getUint32(t+0,!0);return e*qr(2,32)+n}function Pb(r,t){const e=new DataView(r),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:zn(e,8),rootDirectoryLength:zn(e,16),jsonMetadataOffset:zn(e,24),jsonMetadataLength:zn(e,32),leafDirectoryOffset:zn(e,40),leafDirectoryLength:zn(e,48),tileDataOffset:zn(e,56),tileDataLength:zn(e,64),numAddressedTiles:zn(e,72),numTileEntries:zn(e,80),numTileContents:zn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function gf(r){const t={buf:new Uint8Array(r),pos:0},e=ws(t),n=[];let s=0;for(let o=0;o<e;o++){const l=ws(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=ws(t);for(let o=0;o<e;o++)n[o].length=ws(t);for(let o=0;o<e;o++){const l=ws(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function Rb(r){const t=new DataView(r);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var jl=class extends Error{};function Ib(r,t){return tn(this,null,function*(){const e=yield r.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(Rb(e.data)<3)return[yield pf.getHeader(r)];const s=e.data.slice(0,Ab),o=Pb(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${r.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,h=gf(yield t(l,o.internalCompression));return[o,[c,h.length,h]]})}function Db(r,t,e,n,s){return tn(this,null,function*(){const o=yield r.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=gf(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var Nb=class{constructor(r=100,t=!0,e=mf){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=r,this.counter=1,this.decompress=e}getHeader(r){return tn(this,null,function*(){const t=r.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{Ib(r,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(r,t,e,n){return tn(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,h)=>{Db(r,this.decompress,t,e,n).then(d=>{c(d),this.prune()}).catch(d=>{h(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(r,t,e,n){return tn(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,h)=>{r.getBytes(t,e,void 0,n.etag).then(d=>{c(d.data),this.cache.has(s),this.prune()}).catch(d=>{h(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let r=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<r&&(r=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(r){return tn(this,null,function*(){const t=r.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(r.getKey());const e=new Promise((n,s)=>{this.getHeader(r).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},Ob=class{constructor(r,t,e){typeof r=="string"?this.source=new Lb(r):this.source=r,e?this.decompress=e:this.decompress=mf,t?this.cache=t:this.cache=new Nb}getHeader(){return tn(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(r,t,e,n){return tn(this,null,function*(){const s=Eb(r,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return pf.getZxy(o,this.source,this.cache,r,t,e,n);if(r<o.minZoom||r>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let h=0;h<=3;h++){const d=yield this.cache.getDirectory(this.source,l,c,o),f=Cb(d,s);if(f){if(f.runLength>0){const p=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(p.data,o.tileCompression),cacheControl:p.cacheControl,expires:p.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(r,t,e,n){return tn(this,null,function*(){try{return yield this.getZxyAttempt(r,t,e,n)}catch(s){if(s instanceof jl)return this.cache.invalidate(this.source),yield this.getZxyAttempt(r,t,e,n);throw s}})}getMetadataAttempt(){return tn(this,null,function*(){const r=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(r.jsonMetadataOffset,r.jsonMetadataLength,void 0,r.etag),e=yield this.decompress(t.data,r.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return tn(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(r){if(r instanceof jl)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw r}})}getTileJson(r){return tn(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=Tb(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${r}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const Pl=new Map;function Ub(r){return Pl.has(r)||Pl.set(r,new Ob(r)),Pl.get(r)}function kb(r,t){const e=[];let n=0;const s=new Uint8Array(r);function o(){let d=0,f=0;for(;n<s.length;){const p=s[n++];if(d|=(p&127)<<f,!(p&128))break;f+=7}return d}function l(){if(n>=s.length)return null;const d=o();return{field:d>>3,wire:d&7}}function c(d){if(d===0)o();else if(d===2){const f=o();n+=f}else d===5?n+=4:d===1&&(n+=8)}function h(){const d=o(),f=new Uint8Array(r,n,d);return n+=d,new TextDecoder().decode(f)}for(;n<s.length;){const d=l();if(!d)break;if(d.field===3&&d.wire===2){const f=o(),p=n+f;let _="";const m=[],x=[],y=[];for(;n<p;){const g=l();if(!g)break;if(g.field===1&&g.wire===2)_=h();else if(g.field===3&&g.wire===2)m.push(h());else if(g.field===4&&g.wire===2){const v=o(),S=n+v;for(;n<S;){const M=l();if(!M)break;if(M.wire===2){const P=o(),N=new Uint8Array(r,n,P);n+=P,x.push(new TextDecoder().decode(N))}else M.field===5&&M.wire===0?x.push(o()!==0):M.field===6&&M.wire===0||M.field===7&&M.wire===0?x.push(o()):c(M.wire)}}else if(g.field===5&&g.wire===0)o();else if(g.field===2&&g.wire===2){const v=o(),S=n+v;let M=0;const P=[],N=[];for(;n<S;){const O=l();if(!O)break;if(O.field===3&&O.wire===0)M=o();else if(O.field===2&&O.wire===2){const U=o(),H=n+U;for(;n<H;)P.push(o())}else if(O.field===4&&O.wire===2){const U=o(),H=n+U;for(;n<H;)N.push(o())}else c(O.wire)}y.push({type:M,tags:P,geom:N})}else c(g.wire)}if(n=p,t&&t!==_)continue;for(const g of y){const v={};for(let I=0;I<g.tags.length-1;I+=2)v[m[g.tags[I]]]=x[g.tags[I+1]]??null;const S=[];let M=0,P=0,N=[],O=0,U=0,H=0;for(;H<g.geom.length;){if(U===0){const I=g.geom[H++];O=I&7,U=I>>3}if(O===1||O===2){O===1&&N.length>=2&&(S.push(N),N=[]);const I=Yu(g.geom[H++]),R=Yu(g.geom[H++]);M+=I,P+=R,N.push({lat:P,lon:M}),U--}else O===7?(N.length>=2&&(S.push(N),N=[]),U--):(H++,U--)}N.length>=2&&S.push(N),e.push({layer:_,type:g.type,properties:v,rings:S})}}else c(d.wire)}return e}function Yu(r){return r>>1^-(r&1)}function zb(r,t,e,n,s,o){const l=2**e,c=(r+n/o)/l,h=(t+s/o)/l,d=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*h)))*180/Math.PI,lon:d}}async function Bb(r,t){const s=[{path:`${Ur}/buildings.pmtiles`,z:14,name:"building"},{path:`${Ur}/transportation.pmtiles`,z:14,name:"segment"},{path:`${Ur}/base.pmtiles`,z:13,name:"water"},{path:`${Ur}/base.pmtiles`,z:13,name:"land"},{path:`${Ur}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${Ur}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:h,name:d}of s){try{const f=Ub(c),p=(y,g)=>{const v=2**h,S=Math.floor((g+180)/360*v),M=y*Math.PI/180,P=Math.floor((1-Math.log(Math.tan(M)+1/Math.cos(M))/Math.PI)/2*v);return{x:S,y:P}},_=p(r.maxLat,r.minLon),m=p(r.minLat,r.maxLon),x=[];for(let y=_.y;y<=m.y;y++)for(let g=_.x;g<=m.x;g++)x.push((async(v,S)=>{try{const M=await f.getZxy(h,v,S);if(!M)return;const P=kb(M.data,d);for(const N of P){for(const O of N.rings)for(const U of O){const H=zb(v,S,h,U.lon,U.lat,4096);U.lat=H.lat,U.lon=H.lon}o.push(N)}}catch{}})(g,y));await Promise.all(x)}catch{}l++,t(Math.round(l/s.length*100))}return o}function _f(r="terrain3d.stl"){if(!bt.tg)return;const t=[];new Q;const e=new Q;if(bt.tg.traverse(m=>{if(!(m instanceof ke))return;const x=m.geometry,y=x.attributes.position;if(!y)return;const g=x.index,v=m.matrixWorld;function S(M){const P=new Q(y.getX(M),y.getY(M),y.getZ(M));return P.applyMatrix4(v),P}if(g)for(let M=0;M<g.count;M+=3)t.push([S(g.getX(M)),S(g.getX(M+1)),S(g.getX(M+2))]);else for(let M=0;M<y.count;M+=3)t.push([S(M),S(M+1),S(M+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let m=0;m<Math.min(l.length,80);m++)s.setUint8(m,l[m]);s.setUint32(80,t.length,!0);let c=84;const h=new Q,d=new Q;for(const[m,x,y]of t){h.subVectors(x,m),d.subVectors(y,m),e.crossVectors(h,d).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const g of[m,x,y])s.setFloat32(c,g.x,!0),c+=4,s.setFloat32(c,g.y,!0),c+=4,s.setFloat32(c,g.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=r,_.click(),URL.revokeObjectURL(p),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function Vo(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var vf={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(r,t){(function(e){r.exports=e()})(function(){return function e(n,s,o){function l(d,f){if(!s[d]){if(!n[d]){var p=typeof Vo=="function"&&Vo;if(!f&&p)return p(d,!0);if(c)return c(d,!0);var _=new Error("Cannot find module '"+d+"'");throw _.code="MODULE_NOT_FOUND",_}var m=s[d]={exports:{}};n[d][0].call(m.exports,function(x){var y=n[d][1][x];return l(y||x)},m,m.exports,e,n,s,o)}return s[d].exports}for(var c=typeof Vo=="function"&&Vo,h=0;h<o.length;h++)l(o[h]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(h){for(var d,f,p,_,m,x,y,g=[],v=0,S=h.length,M=S,P=o.getTypeOf(h)!=="string";v<h.length;)M=S-v,p=P?(d=h[v++],f=v<S?h[v++]:0,v<S?h[v++]:0):(d=h.charCodeAt(v++),f=v<S?h.charCodeAt(v++):0,v<S?h.charCodeAt(v++):0),_=d>>2,m=(3&d)<<4|f>>4,x=1<M?(15&f)<<2|p>>6:64,y=2<M?63&p:64,g.push(c.charAt(_)+c.charAt(m)+c.charAt(x)+c.charAt(y));return g.join("")},s.decode=function(h){var d,f,p,_,m,x,y=0,g=0,v="data:";if(h.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var S,M=3*(h=h.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(h.charAt(h.length-1)===c.charAt(64)&&M--,h.charAt(h.length-2)===c.charAt(64)&&M--,M%1!=0)throw new Error("Invalid base64 input, bad content length.");for(S=l.uint8array?new Uint8Array(0|M):new Array(0|M);y<h.length;)d=c.indexOf(h.charAt(y++))<<2|(_=c.indexOf(h.charAt(y++)))>>4,f=(15&_)<<4|(m=c.indexOf(h.charAt(y++)))>>2,p=(3&m)<<6|(x=c.indexOf(h.charAt(y++))),S[g++]=d,m!==64&&(S[g++]=f),x!==64&&(S[g++]=p);return S}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),h=e("./stream/DataLengthProbe");function d(f,p,_,m,x){this.compressedSize=f,this.uncompressedSize=p,this.crc32=_,this.compression=m,this.compressedContent=x}d.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")),p=this;return f.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(f,p,_){return f.pipe(new c).pipe(new h("uncompressedSize")).pipe(p.compressWorker(_)).pipe(new h("compressedSize")).withStreamInfo("compression",p)},n.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,h=[],d=0;d<256;d++){c=d;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;h[d]=c}return h}();n.exports=function(c,h){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(d,f,p,_){var m=l,x=_+p;d^=-1;for(var y=_;y<x;y++)d=d>>>8^m[255&(d^f[y])];return-1^d}(0|h,c,c.length,0):function(d,f,p,_){var m=l,x=_+p;d^=-1;for(var y=_;y<x;y++)d=d>>>8^m[255&(d^f.charCodeAt(y))];return-1^d}(0|h,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),h=e("./stream/GenericWorker"),d=o?"uint8array":"array";function f(p,_){h.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=_,this.meta={}}s.magic="\b\0",c.inherits(f,h),f.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(d,p.data),!1)},f.prototype.flush=function(){h.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(_){p.push({data:_,meta:p.meta})}},s.compressWorker=function(p){return new f("Deflate",p)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(m,x){var y,g="";for(y=0;y<x;y++)g+=String.fromCharCode(255&m),m>>>=8;return g}function l(m,x,y,g,v,S){var M,P,N=m.file,O=m.compression,U=S!==d.utf8encode,H=c.transformTo("string",S(N.name)),I=c.transformTo("string",d.utf8encode(N.name)),R=N.comment,W=c.transformTo("string",S(R)),k=c.transformTo("string",d.utf8encode(R)),F=I.length!==N.name.length,A=k.length!==R.length,Z="",at="",ot="",j=N.dir,st=N.date,rt={crc32:0,compressedSize:0,uncompressedSize:0};x&&!y||(rt.crc32=m.crc32,rt.compressedSize=m.compressedSize,rt.uncompressedSize=m.uncompressedSize);var q=0;x&&(q|=8),U||!F&&!A||(q|=2048);var tt=0,Lt=0;j&&(tt|=16),v==="UNIX"?(Lt=798,tt|=function(nt,wt){var St=nt;return nt||(St=wt?16893:33204),(65535&St)<<16}(N.unixPermissions,j)):(Lt=20,tt|=function(nt){return 63&(nt||0)}(N.dosPermissions)),M=st.getUTCHours(),M<<=6,M|=st.getUTCMinutes(),M<<=5,M|=st.getUTCSeconds()/2,P=st.getUTCFullYear()-1980,P<<=4,P|=st.getUTCMonth()+1,P<<=5,P|=st.getUTCDate(),F&&(at=o(1,1)+o(f(H),4)+I,Z+="up"+o(at.length,2)+at),A&&(ot=o(1,1)+o(f(W),4)+k,Z+="uc"+o(ot.length,2)+ot);var J="";return J+=`
\0`,J+=o(q,2),J+=O.magic,J+=o(M,2),J+=o(P,2),J+=o(rt.crc32,4),J+=o(rt.compressedSize,4),J+=o(rt.uncompressedSize,4),J+=o(H.length,2),J+=o(Z.length,2),{fileRecord:p.LOCAL_FILE_HEADER+J+H+Z,dirRecord:p.CENTRAL_FILE_HEADER+o(Lt,2)+J+o(W.length,2)+"\0\0\0\0"+o(tt,4)+o(g,4)+H+Z+W}}var c=e("../utils"),h=e("../stream/GenericWorker"),d=e("../utf8"),f=e("../crc32"),p=e("../signature");function _(m,x,y,g){h.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=x,this.zipPlatform=y,this.encodeFileName=g,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(_,h),_.prototype.push=function(m){var x=m.meta.percent||0,y=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,h.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:y?(x+100*(y-g-1))/y:100}}))},_.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var x=this.streamFiles&&!m.file.dir;if(x){var y=l(m,x,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},_.prototype.closedSource=function(m){this.accumulate=!1;var x=this.streamFiles&&!m.file.dir,y=l(m,x,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),x)this.push({data:function(g){return p.DATA_DESCRIPTOR+o(g.crc32,4)+o(g.compressedSize,4)+o(g.uncompressedSize,4)}(m),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},_.prototype.flush=function(){for(var m=this.bytesWritten,x=0;x<this.dirRecords.length;x++)this.push({data:this.dirRecords[x],meta:{percent:100}});var y=this.bytesWritten-m,g=function(v,S,M,P,N){var O=c.transformTo("string",N(P));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(v,2)+o(v,2)+o(S,4)+o(M,4)+o(O.length,2)+O}(this.dirRecords.length,y,m,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},_.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},_.prototype.registerPrevious=function(m){this._sources.push(m);var x=this;return m.on("data",function(y){x.processChunk(y)}),m.on("end",function(){x.closedSource(x.previous.streamInfo),x._sources.length?x.prepareNextSource():x.end()}),m.on("error",function(y){x.error(y)}),this},_.prototype.resume=function(){return!!h.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},_.prototype.error=function(m){var x=this._sources;if(!h.prototype.error.call(this,m))return!1;for(var y=0;y<x.length;y++)try{x[y].error(m)}catch{}return!0},_.prototype.lock=function(){h.prototype.lock.call(this);for(var m=this._sources,x=0;x<m.length;x++)m[x].lock()},n.exports=_},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,h,d){var f=new l(h.streamFiles,d,h.platform,h.encodeFileName),p=0;try{c.forEach(function(_,m){p++;var x=function(S,M){var P=S||M,N=o[P];if(!N)throw new Error(P+" is not a valid compression method !");return N}(m.options.compression,h.compression),y=m.options.compressionOptions||h.compressionOptions||{},g=m.dir,v=m.date;m._compressWorker(x,y).withStreamInfo("file",{name:_,dir:g,date:v,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(f)}),f.entriesCount=p}catch(_){f.error(_)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),h=e("./zipEntries"),d=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function p(_){return new l.Promise(function(m,x){var y=_.decompressed.getContentWorker().pipe(new d);y.on("error",function(g){x(g)}).on("end",function(){y.streamInfo.crc32!==_.decompressed.crc32?x(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}n.exports=function(_,m){var x=this;return m=o.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(_)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",_,!0,m.optimizedBinaryString,m.base64).then(function(y){var g=new h(m);return g.load(y),g}).then(function(y){var g=[l.Promise.resolve(y)],v=y.files;if(m.checkCRC32)for(var S=0;S<v.length;S++)g.push(p(v[S]));return l.Promise.all(g)}).then(function(y){for(var g=y.shift(),v=g.files,S=0;S<v.length;S++){var M=v[S],P=M.fileNameStr,N=o.resolve(M.fileNameStr);x.file(N,M.decompressed,{binary:!0,optimizedBinaryString:!0,date:M.date,dir:M.dir,comment:M.fileCommentStr.length?M.fileCommentStr:null,unixPermissions:M.unixPermissions,dosPermissions:M.dosPermissions,createFolders:m.createFolders}),M.dir||(x.file(N).unsafeOriginalName=P)}return g.zipComment.length&&(x.comment=g.zipComment),x})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(h,d){l.call(this,"Nodejs stream input adapter for "+h),this._upstreamEnded=!1,this._bindStream(d)}o.inherits(c,l),c.prototype._bindStream=function(h){var d=this;(this._stream=h).pause(),h.on("data",function(f){d.push({data:f,meta:{percent:0}})}).on("error",function(f){d.isPaused?this.generatedError=f:d.error(f)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,h,d){o.call(this,h),this._helper=c;var f=this;c.on("data",function(p,_){f.push(p)||f._helper.pause(),d&&d(_)}).on("error",function(p){f.emit("error",p)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(N,O,U){var H,I=c.getTypeOf(O),R=c.extend(U||{},f);R.date=R.date||new Date,R.compression!==null&&(R.compression=R.compression.toUpperCase()),typeof R.unixPermissions=="string"&&(R.unixPermissions=parseInt(R.unixPermissions,8)),R.unixPermissions&&16384&R.unixPermissions&&(R.dir=!0),R.dosPermissions&&16&R.dosPermissions&&(R.dir=!0),R.dir&&(N=v(N)),R.createFolders&&(H=g(N))&&S.call(this,H,!0);var W=I==="string"&&R.binary===!1&&R.base64===!1;U&&U.binary!==void 0||(R.binary=!W),(O instanceof p&&O.uncompressedSize===0||R.dir||!O||O.length===0)&&(R.base64=!1,R.binary=!0,O="",R.compression="STORE",I="string");var k=null;k=O instanceof p||O instanceof h?O:x.isNode&&x.isStream(O)?new y(N,O):c.prepareContent(N,O,R.binary,R.optimizedBinaryString,R.base64);var F=new _(N,k,R);this.files[N]=F}var l=e("./utf8"),c=e("./utils"),h=e("./stream/GenericWorker"),d=e("./stream/StreamHelper"),f=e("./defaults"),p=e("./compressedObject"),_=e("./zipObject"),m=e("./generate"),x=e("./nodejsUtils"),y=e("./nodejs/NodejsStreamInputAdapter"),g=function(N){N.slice(-1)==="/"&&(N=N.substring(0,N.length-1));var O=N.lastIndexOf("/");return 0<O?N.substring(0,O):""},v=function(N){return N.slice(-1)!=="/"&&(N+="/"),N},S=function(N,O){return O=O!==void 0?O:f.createFolders,N=v(N),this.files[N]||o.call(this,N,null,{dir:!0,createFolders:O}),this.files[N]};function M(N){return Object.prototype.toString.call(N)==="[object RegExp]"}var P={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(N){var O,U,H;for(O in this.files)H=this.files[O],(U=O.slice(this.root.length,O.length))&&O.slice(0,this.root.length)===this.root&&N(U,H)},filter:function(N){var O=[];return this.forEach(function(U,H){N(U,H)&&O.push(H)}),O},file:function(N,O,U){if(arguments.length!==1)return N=this.root+N,o.call(this,N,O,U),this;if(M(N)){var H=N;return this.filter(function(R,W){return!W.dir&&H.test(R)})}var I=this.files[this.root+N];return I&&!I.dir?I:null},folder:function(N){if(!N)return this;if(M(N))return this.filter(function(I,R){return R.dir&&N.test(I)});var O=this.root+N,U=S.call(this,O),H=this.clone();return H.root=U.name,H},remove:function(N){N=this.root+N;var O=this.files[N];if(O||(N.slice(-1)!=="/"&&(N+="/"),O=this.files[N]),O&&!O.dir)delete this.files[N];else for(var U=this.filter(function(I,R){return R.name.slice(0,N.length)===N}),H=0;H<U.length;H++)delete this.files[U[H].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(N){var O,U={};try{if((U=c.extend(N||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=U.type.toLowerCase(),U.compression=U.compression.toUpperCase(),U.type==="binarystring"&&(U.type="string"),!U.type)throw new Error("No output type specified.");c.checkSupport(U.type),U.platform!=="darwin"&&U.platform!=="freebsd"&&U.platform!=="linux"&&U.platform!=="sunos"||(U.platform="UNIX"),U.platform==="win32"&&(U.platform="DOS");var H=U.comment||this.comment||"";O=m.generateWorker(this,U,H)}catch(I){(O=new h("error")).error(I)}return new d(O,U.type||"string",U.mimeType)},generateAsync:function(N,O){return this.generateInternalStream(N).accumulate(O)},generateNodeStream:function(N,O){return(N=N||{}).type||(N.type="nodebuffer"),this.generateInternalStream(N).toNodejsStream(O)}};n.exports=P},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var h=0;h<this.data.length;h++)c[h]=255&c[h]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var h=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.length-4;0<=_;--_)if(this.data[_]===h&&this.data[_+1]===d&&this.data[_+2]===f&&this.data[_+3]===p)return _-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var h=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.readData(4);return h===_[0]&&d===_[1]&&f===_[2]&&p===_[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var h=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var h,d=0;for(this.checkOffset(c),h=this.index+c-1;h>=this.index;h--)d=(d<<8)+this.byteAt(h);return this.index+=c,d},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var h=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var h=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var h=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),h=e("./StringReader"),d=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(p){var _=o.getTypeOf(p);return o.checkSupport(_),_!=="string"||l.uint8array?_==="nodebuffer"?new d(p):l.uint8array?new f(o.transformTo("uint8array",p)):new c(o.transformTo("array",p)):new h(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(h){o.call(this,"ConvertWorker to "+h),this.destType=h}l.inherits(c,o),c.prototype.processChunk=function(h){this.push({data:l.transformTo(this.destType,h.data),meta:h.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(h){this.streamInfo.crc32=l(h.data,this.streamInfo.crc32||0),this.push(h)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(h){l.call(this,"DataLengthProbe for "+h),this.propName=h,this.withStreamInfo(h,0)}o.inherits(c,l),c.prototype.processChunk=function(h){if(h){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+h.data.length}l.prototype.processChunk.call(this,h)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(h){l.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,h.then(function(f){d.dataIsReady=!0,d.data=f,d.max=f&&f.length||0,d.type=o.getTypeOf(f),d.isPaused||d._tickAndRepeat()},function(f){d.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var h=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":h=this.data.substring(this.index,d);break;case"uint8array":h=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":h=this.data.slice(this.index,d)}return this.index=d,this.push({data:h,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var h=0;h<this._listeners[l].length;h++)this._listeners[l][h].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(h){c.processChunk(h)}),l.on("end",function(){c.end()}),l.on("error",function(h){c.error(h)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),h=e("../base64"),d=e("../support"),f=e("../external"),p=null;if(d.nodestream)try{p=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function _(x,y){return new f.Promise(function(g,v){var S=[],M=x._internalType,P=x._outputType,N=x._mimeType;x.on("data",function(O,U){S.push(O),y&&y(U)}).on("error",function(O){S=[],v(O)}).on("end",function(){try{var O=function(U,H,I){switch(U){case"blob":return o.newBlob(o.transformTo("arraybuffer",H),I);case"base64":return h.encode(H);default:return o.transformTo(U,H)}}(P,function(U,H){var I,R=0,W=null,k=0;for(I=0;I<H.length;I++)k+=H[I].length;switch(U){case"string":return H.join("");case"array":return Array.prototype.concat.apply([],H);case"uint8array":for(W=new Uint8Array(k),I=0;I<H.length;I++)W.set(H[I],R),R+=H[I].length;return W;case"nodebuffer":return Buffer.concat(H);default:throw new Error("concat : unsupported type '"+U+"'")}}(M,S),N);g(O)}catch(U){v(U)}S=[]}).resume()})}function m(x,y,g){var v=y;switch(y){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=y,this._mimeType=g,o.checkSupport(v),this._worker=x.pipe(new l(v)),x.lock()}catch(S){this._worker=new c("error"),this._worker.error(S)}}m.prototype={accumulate:function(x){return _(this,x)},on:function(x,y){var g=this;return x==="data"?this._worker.on(x,function(v){y.call(g,v.data,v.meta)}):this._worker.on(x,function(){o.delay(y,arguments,g)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(x){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},x)}},n.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),h=e("./stream/GenericWorker"),d=new Array(256),f=0;f<256;f++)d[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;d[254]=d[254]=1;function p(){h.call(this,"utf-8 decode"),this.leftOver=null}function _(){h.call(this,"utf-8 encode")}s.utf8encode=function(m){return l.nodebuffer?c.newBufferFrom(m,"utf-8"):function(x){var y,g,v,S,M,P=x.length,N=0;for(S=0;S<P;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),N+=g<128?1:g<2048?2:g<65536?3:4;for(y=l.uint8array?new Uint8Array(N):new Array(N),S=M=0;M<N;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<P&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),g<128?y[M++]=g:(g<2048?y[M++]=192|g>>>6:(g<65536?y[M++]=224|g>>>12:(y[M++]=240|g>>>18,y[M++]=128|g>>>12&63),y[M++]=128|g>>>6&63),y[M++]=128|63&g);return y}(m)},s.utf8decode=function(m){return l.nodebuffer?o.transformTo("nodebuffer",m).toString("utf-8"):function(x){var y,g,v,S,M=x.length,P=new Array(2*M);for(y=g=0;y<M;)if((v=x[y++])<128)P[g++]=v;else if(4<(S=d[v]))P[g++]=65533,y+=S-1;else{for(v&=S===2?31:S===3?15:7;1<S&&y<M;)v=v<<6|63&x[y++],S--;1<S?P[g++]=65533:v<65536?P[g++]=v:(v-=65536,P[g++]=55296|v>>10&1023,P[g++]=56320|1023&v)}return P.length!==g&&(P.subarray?P=P.subarray(0,g):P.length=g),o.applyFromCharCode(P)}(m=o.transformTo(l.uint8array?"uint8array":"array",m))},o.inherits(p,h),p.prototype.processChunk=function(m){var x=o.transformTo(l.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var y=x;(x=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),x.set(y,this.leftOver.length)}else x=this.leftOver.concat(x);this.leftOver=null}var g=function(S,M){var P;for((M=M||S.length)>S.length&&(M=S.length),P=M-1;0<=P&&(192&S[P])==128;)P--;return P<0||P===0?M:P+d[S[P]]>M?P:M}(x),v=x;g!==x.length&&(l.uint8array?(v=x.subarray(0,g),this.leftOver=x.subarray(g,x.length)):(v=x.slice(0,g),this.leftOver=x.slice(g,x.length))),this.push({data:s.utf8decode(v),meta:m.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=p,o.inherits(_,h),_.prototype.processChunk=function(m){this.push({data:s.utf8encode(m.data),meta:m.meta})},s.Utf8EncodeWorker=_},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),h=e("./external");function d(y){return y}function f(y,g){for(var v=0;v<y.length;++v)g[v]=255&y.charCodeAt(v);return g}e("setimmediate"),s.newBlob=function(y,g){s.checkSupport("blob");try{return new Blob([y],{type:g})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(y),v.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(y,g,v){var S=[],M=0,P=y.length;if(P<=v)return String.fromCharCode.apply(null,y);for(;M<P;)g==="array"||g==="nodebuffer"?S.push(String.fromCharCode.apply(null,y.slice(M,Math.min(M+v,P)))):S.push(String.fromCharCode.apply(null,y.subarray(M,Math.min(M+v,P)))),M+=v;return S.join("")},stringifyByChar:function(y){for(var g="",v=0;v<y.length;v++)g+=String.fromCharCode(y[v]);return g},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function _(y){var g=65536,v=s.getTypeOf(y),S=!0;if(v==="uint8array"?S=p.applyCanBeUsed.uint8array:v==="nodebuffer"&&(S=p.applyCanBeUsed.nodebuffer),S)for(;1<g;)try{return p.stringifyByChunk(y,v,g)}catch{g=Math.floor(g/2)}return p.stringifyByChar(y)}function m(y,g){for(var v=0;v<y.length;v++)g[v]=y[v];return g}s.applyFromCharCode=_;var x={};x.string={string:d,array:function(y){return f(y,new Array(y.length))},arraybuffer:function(y){return x.string.uint8array(y).buffer},uint8array:function(y){return f(y,new Uint8Array(y.length))},nodebuffer:function(y){return f(y,c.allocBuffer(y.length))}},x.array={string:_,array:d,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},x.arraybuffer={string:function(y){return _(new Uint8Array(y))},array:function(y){return m(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:d,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},x.uint8array={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:d,nodebuffer:function(y){return c.newBufferFrom(y)}},x.nodebuffer={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return x.nodebuffer.uint8array(y).buffer},uint8array:function(y){return m(y,new Uint8Array(y.length))},nodebuffer:d},s.transformTo=function(y,g){if(g=g||"",!y)return g;s.checkSupport(y);var v=s.getTypeOf(g);return x[v][y](g)},s.resolve=function(y){for(var g=y.split("/"),v=[],S=0;S<g.length;S++){var M=g[S];M==="."||M===""&&S!==0&&S!==g.length-1||(M===".."?v.pop():v.push(M))}return v.join("/")},s.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(y)?"nodebuffer":o.uint8array&&y instanceof Uint8Array?"uint8array":o.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(y){if(!o[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(y){var g,v,S="";for(v=0;v<(y||"").length;v++)S+="\\x"+((g=y.charCodeAt(v))<16?"0":"")+g.toString(16).toUpperCase();return S},s.delay=function(y,g,v){setImmediate(function(){y.apply(v||null,g||[])})},s.inherits=function(y,g){function v(){}v.prototype=g.prototype,y.prototype=new v},s.extend=function(){var y,g,v={};for(y=0;y<arguments.length;y++)for(g in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],g)&&v[g]===void 0&&(v[g]=arguments[y][g]);return v},s.prepareContent=function(y,g,v,S,M){return h.Promise.resolve(g).then(function(P){return o.blob&&(P instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(P))!==-1)&&typeof FileReader<"u"?new h.Promise(function(N,O){var U=new FileReader;U.onload=function(H){N(H.target.result)},U.onerror=function(H){O(H.target.error)},U.readAsArrayBuffer(P)}):P}).then(function(P){var N=s.getTypeOf(P);return N?(N==="arraybuffer"?P=s.transformTo("uint8array",P):N==="string"&&(M?P=l.decode(P):v&&S!==!0&&(P=function(O){return f(O,o.uint8array?new Uint8Array(O.length):new Array(O.length))}(P))),P):h.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),h=e("./zipEntry"),d=e("./support");function f(p){this.files=[],this.loadOptions=p}f.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var _=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(_)+", expected "+l.pretty(p)+")")}},isSignature:function(p,_){var m=this.reader.index;this.reader.setIndex(p);var x=this.reader.readString(4)===_;return this.reader.setIndex(m),x},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),_=d.uint8array?"uint8array":"array",m=l.transformTo(_,p);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,_,m,x=this.zip64EndOfCentralSize-44;0<x;)p=this.reader.readInt(2),_=this.reader.readInt(4),m=this.reader.readData(_),this.zip64ExtensibleData[p]={id:p,length:_,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,_;for(p=0;p<this.files.length;p++)_=this.files[p],this.reader.setIndex(_.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),_.readLocalPart(this.reader),_.handleUTF8(),_.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(p=new h({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var _=p;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var x=_-m;if(0<x)this.isSignature(_,c.CENTRAL_FILE_HEADER)||(this.reader.zero=x);else if(x<0)throw new Error("Corrupted zip: missing "+Math.abs(x)+" bytes.")},prepareReader:function(p){this.reader=o(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),h=e("./crc32"),d=e("./utf8"),f=e("./compressions"),p=e("./support");function _(m,x){this.options=m,this.loadOptions=x}_.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var x,y;if(m.skip(22),this.fileNameLength=m.readInt(2),y=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((x=function(g){for(var v in f)if(Object.prototype.hasOwnProperty.call(f,v)&&f[v].magic===g)return f[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,x,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var x=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(x),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var x,y,g,v=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<v;)x=m.readInt(2),y=m.readInt(2),g=m.readData(y),this.extraFields[x]={id:x,length:y,value:g};m.setIndex(v)},handleUTF8:function(){var m=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var x=this.findExtraFieldUnicodePath();if(x!==null)this.fileNameStr=x;else{var y=l.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var v=l.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var x=o(m.value);return x.readInt(1)!==1||h(this.fileName)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var x=o(m.value);return x.readInt(1)!==1||h(this.fileComment)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null}},n.exports=_},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(x,y,g){this.name=x,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=y,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),h=e("./utf8"),d=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(x){var y=null,g="string";try{if(!x)throw new Error("No output type specified.");var v=(g=x.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),y=this._decompressWorker();var S=!this._dataBinary;S&&!v&&(y=y.pipe(new h.Utf8EncodeWorker)),!S&&v&&(y=y.pipe(new h.Utf8DecodeWorker))}catch(M){(y=new f("error")).error(M)}return new l(y,g,"")},async:function(x,y){return this.internalStream(x).accumulate(y)},nodeStream:function(x,y){return this.internalStream(x||"nodebuffer").toNodejsStream(y)},_compressWorker:function(x,y){if(this._data instanceof d&&this._data.compression.magic===x.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new h.Utf8EncodeWorker)),d.createWorkerFrom(g,x,y)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],_=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<p.length;m++)o.prototype[p[m]]=_;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,h=o.MutationObserver||o.WebKitMutationObserver;if(h){var d=0,f=new h(x),p=o.document.createTextNode("");f.observe(p,{characterData:!0}),l=function(){p.data=d=++d%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var y=o.document.createElement("script");y.onreadystatechange=function(){x(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},o.document.documentElement.appendChild(y)}:function(){setTimeout(x,0)};else{var _=new o.MessageChannel;_.port1.onmessage=x,l=function(){_.port2.postMessage(0)}}var m=[];function x(){var y,g;c=!0;for(var v=m.length;v;){for(g=m,m=[],y=-1;++y<v;)g[y]();v=m.length}c=!1}n.exports=function(y){m.push(y)!==1||c||l()}}).call(this,typeof Es<"u"?Es:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},h=["REJECTED"],d=["FULFILLED"],f=["PENDING"];function p(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,v!==l&&y(this,v)}function _(v,S,M){this.promise=v,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof M=="function"&&(this.onRejected=M,this.callRejected=this.otherCallRejected)}function m(v,S,M){o(function(){var P;try{P=S(M)}catch(N){return c.reject(v,N)}P===v?c.reject(v,new TypeError("Cannot resolve promise with itself")):c.resolve(v,P)})}function x(v){var S=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof S=="function")return function(){S.apply(v,arguments)}}function y(v,S){var M=!1;function P(U){M||(M=!0,c.reject(v,U))}function N(U){M||(M=!0,c.resolve(v,U))}var O=g(function(){S(N,P)});O.status==="error"&&P(O.value)}function g(v,S){var M={};try{M.value=v(S),M.status="success"}catch(P){M.status="error",M.value=P}return M}(n.exports=p).prototype.finally=function(v){if(typeof v!="function")return this;var S=this.constructor;return this.then(function(M){return S.resolve(v()).then(function(){return M})},function(M){return S.resolve(v()).then(function(){throw M})})},p.prototype.catch=function(v){return this.then(null,v)},p.prototype.then=function(v,S){if(typeof v!="function"&&this.state===d||typeof S!="function"&&this.state===h)return this;var M=new this.constructor(l);return this.state!==f?m(M,this.state===d?v:S,this.outcome):this.queue.push(new _(M,v,S)),M},_.prototype.callFulfilled=function(v){c.resolve(this.promise,v)},_.prototype.otherCallFulfilled=function(v){m(this.promise,this.onFulfilled,v)},_.prototype.callRejected=function(v){c.reject(this.promise,v)},_.prototype.otherCallRejected=function(v){m(this.promise,this.onRejected,v)},c.resolve=function(v,S){var M=g(x,S);if(M.status==="error")return c.reject(v,M.value);var P=M.value;if(P)y(v,P);else{v.state=d,v.outcome=S;for(var N=-1,O=v.queue.length;++N<O;)v.queue[N].callFulfilled(S)}return v},c.reject=function(v,S){v.state=h,v.outcome=S;for(var M=-1,P=v.queue.length;++M<P;)v.queue[M].callRejected(S);return v},p.resolve=function(v){return v instanceof this?v:c.resolve(new this(l),v)},p.reject=function(v){var S=new this(l);return c.reject(S,v)},p.all=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var M=v.length,P=!1;if(!M)return this.resolve([]);for(var N=new Array(M),O=0,U=-1,H=new this(l);++U<M;)I(v[U],U);return H;function I(R,W){S.resolve(R).then(function(k){N[W]=k,++O!==M||P||(P=!0,c.resolve(H,N))},function(k){P||(P=!0,c.reject(H,k))})}},p.race=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var M=v.length,P=!1;if(!M)return this.resolve([]);for(var N=-1,O=new this(l);++N<M;)U=v[N],S.resolve(U).then(function(H){P||(P=!0,c.resolve(O,H))},function(H){P||(P=!0,c.reject(O,H))});var U;return O}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),h=e("./zlib/messages"),d=e("./zlib/zstream"),f=Object.prototype.toString,p=0,_=-1,m=0,x=8;function y(v){if(!(this instanceof y))return new y(v);this.options=l.assign({level:_,method:x,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},v||{});var S=this.options;S.raw&&0<S.windowBits?S.windowBits=-S.windowBits:S.gzip&&0<S.windowBits&&S.windowBits<16&&(S.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var M=o.deflateInit2(this.strm,S.level,S.method,S.windowBits,S.memLevel,S.strategy);if(M!==p)throw new Error(h[M]);if(S.header&&o.deflateSetHeader(this.strm,S.header),S.dictionary){var P;if(P=typeof S.dictionary=="string"?c.string2buf(S.dictionary):f.call(S.dictionary)==="[object ArrayBuffer]"?new Uint8Array(S.dictionary):S.dictionary,(M=o.deflateSetDictionary(this.strm,P))!==p)throw new Error(h[M]);this._dict_set=!0}}function g(v,S){var M=new y(S);if(M.push(v,!0),M.err)throw M.msg||h[M.err];return M.result}y.prototype.push=function(v,S){var M,P,N=this.strm,O=this.options.chunkSize;if(this.ended)return!1;P=S===~~S?S:S===!0?4:0,typeof v=="string"?N.input=c.string2buf(v):f.call(v)==="[object ArrayBuffer]"?N.input=new Uint8Array(v):N.input=v,N.next_in=0,N.avail_in=N.input.length;do{if(N.avail_out===0&&(N.output=new l.Buf8(O),N.next_out=0,N.avail_out=O),(M=o.deflate(N,P))!==1&&M!==p)return this.onEnd(M),!(this.ended=!0);N.avail_out!==0&&(N.avail_in!==0||P!==4&&P!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(N.output,N.next_out))):this.onData(l.shrinkBuf(N.output,N.next_out)))}while((0<N.avail_in||N.avail_out===0)&&M!==1);return P===4?(M=o.deflateEnd(this.strm),this.onEnd(M),this.ended=!0,M===p):P!==2||(this.onEnd(p),!(N.avail_out=0))},y.prototype.onData=function(v){this.chunks.push(v)},y.prototype.onEnd=function(v){v===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=y,s.deflate=g,s.deflateRaw=function(v,S){return(S=S||{}).raw=!0,g(v,S)},s.gzip=function(v,S){return(S=S||{}).gzip=!0,g(v,S)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),h=e("./zlib/constants"),d=e("./zlib/messages"),f=e("./zlib/zstream"),p=e("./zlib/gzheader"),_=Object.prototype.toString;function m(y){if(!(this instanceof m))return new m(y);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},y||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||y&&y.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var v=o.inflateInit2(this.strm,g.windowBits);if(v!==h.Z_OK)throw new Error(d[v]);this.header=new p,o.inflateGetHeader(this.strm,this.header)}function x(y,g){var v=new m(g);if(v.push(y,!0),v.err)throw v.msg||d[v.err];return v.result}m.prototype.push=function(y,g){var v,S,M,P,N,O,U=this.strm,H=this.options.chunkSize,I=this.options.dictionary,R=!1;if(this.ended)return!1;S=g===~~g?g:g===!0?h.Z_FINISH:h.Z_NO_FLUSH,typeof y=="string"?U.input=c.binstring2buf(y):_.call(y)==="[object ArrayBuffer]"?U.input=new Uint8Array(y):U.input=y,U.next_in=0,U.avail_in=U.input.length;do{if(U.avail_out===0&&(U.output=new l.Buf8(H),U.next_out=0,U.avail_out=H),(v=o.inflate(U,h.Z_NO_FLUSH))===h.Z_NEED_DICT&&I&&(O=typeof I=="string"?c.string2buf(I):_.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,v=o.inflateSetDictionary(this.strm,O)),v===h.Z_BUF_ERROR&&R===!0&&(v=h.Z_OK,R=!1),v!==h.Z_STREAM_END&&v!==h.Z_OK)return this.onEnd(v),!(this.ended=!0);U.next_out&&(U.avail_out!==0&&v!==h.Z_STREAM_END&&(U.avail_in!==0||S!==h.Z_FINISH&&S!==h.Z_SYNC_FLUSH)||(this.options.to==="string"?(M=c.utf8border(U.output,U.next_out),P=U.next_out-M,N=c.buf2string(U.output,M),U.next_out=P,U.avail_out=H-P,P&&l.arraySet(U.output,U.output,M,P,0),this.onData(N)):this.onData(l.shrinkBuf(U.output,U.next_out)))),U.avail_in===0&&U.avail_out===0&&(R=!0)}while((0<U.avail_in||U.avail_out===0)&&v!==h.Z_STREAM_END);return v===h.Z_STREAM_END&&(S=h.Z_FINISH),S===h.Z_FINISH?(v=o.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===h.Z_OK):S!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),!(U.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===h.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Inflate=m,s.inflate=x,s.inflateRaw=function(y,g){return(g=g||{}).raw=!0,x(y,g)},s.ungzip=x},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(h){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var f=d.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var p in f)f.hasOwnProperty(p)&&(h[p]=f[p])}}return h},s.shrinkBuf=function(h,d){return h.length===d?h:h.subarray?h.subarray(0,d):(h.length=d,h)};var l={arraySet:function(h,d,f,p,_){if(d.subarray&&h.subarray)h.set(d.subarray(f,f+p),_);else for(var m=0;m<p;m++)h[_+m]=d[f+m]},flattenChunks:function(h){var d,f,p,_,m,x;for(d=p=0,f=h.length;d<f;d++)p+=h[d].length;for(x=new Uint8Array(p),d=_=0,f=h.length;d<f;d++)m=h[d],x.set(m,_),_+=m.length;return x}},c={arraySet:function(h,d,f,p,_){for(var m=0;m<p;m++)h[_+m]=d[f+m]},flattenChunks:function(h){return[].concat.apply([],h)}};s.setTyped=function(h){h?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var h=new o.Buf8(256),d=0;d<256;d++)h[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function f(p,_){if(_<65537&&(p.subarray&&c||!p.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(p,_));for(var m="",x=0;x<_;x++)m+=String.fromCharCode(p[x]);return m}h[254]=h[254]=1,s.string2buf=function(p){var _,m,x,y,g,v=p.length,S=0;for(y=0;y<v;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),S+=m<128?1:m<2048?2:m<65536?3:4;for(_=new o.Buf8(S),y=g=0;g<S;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),m<128?_[g++]=m:(m<2048?_[g++]=192|m>>>6:(m<65536?_[g++]=224|m>>>12:(_[g++]=240|m>>>18,_[g++]=128|m>>>12&63),_[g++]=128|m>>>6&63),_[g++]=128|63&m);return _},s.buf2binstring=function(p){return f(p,p.length)},s.binstring2buf=function(p){for(var _=new o.Buf8(p.length),m=0,x=_.length;m<x;m++)_[m]=p.charCodeAt(m);return _},s.buf2string=function(p,_){var m,x,y,g,v=_||p.length,S=new Array(2*v);for(m=x=0;m<v;)if((y=p[m++])<128)S[x++]=y;else if(4<(g=h[y]))S[x++]=65533,m+=g-1;else{for(y&=g===2?31:g===3?15:7;1<g&&m<v;)y=y<<6|63&p[m++],g--;1<g?S[x++]=65533:y<65536?S[x++]=y:(y-=65536,S[x++]=55296|y>>10&1023,S[x++]=56320|1023&y)}return f(S,x)},s.utf8border=function(p,_){var m;for((_=_||p.length)>p.length&&(_=p.length),m=_-1;0<=m&&(192&p[m])==128;)m--;return m<0||m===0?_:m+h[p[m]]>_?m:_}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,h){for(var d=65535&o|0,f=o>>>16&65535|0,p=0;c!==0;){for(c-=p=2e3<c?2e3:c;f=f+(d=d+l[h++]|0)|0,--p;);d%=65521,f%=65521}return d|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],h=0;h<256;h++){l=h;for(var d=0;d<8;d++)l=1&l?3988292384^l>>>1:l>>>1;c[h]=l}return c}();n.exports=function(l,c,h,d){var f=o,p=d+h;l^=-1;for(var _=d;_<p;_++)l=l>>>8^f[255&(l^c[_])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),h=e("./adler32"),d=e("./crc32"),f=e("./messages"),p=0,_=4,m=0,x=-2,y=-1,g=4,v=2,S=8,M=9,P=286,N=30,O=19,U=2*P+1,H=15,I=3,R=258,W=R+I+1,k=42,F=113,A=1,Z=2,at=3,ot=4;function j(E,et){return E.msg=f[et],et}function st(E){return(E<<1)-(4<E?9:0)}function rt(E){for(var et=E.length;0<=--et;)E[et]=0}function q(E){var et=E.state,$=et.pending;$>E.avail_out&&($=E.avail_out),$!==0&&(l.arraySet(E.output,et.pending_buf,et.pending_out,$,E.next_out),E.next_out+=$,et.pending_out+=$,E.total_out+=$,E.avail_out-=$,et.pending-=$,et.pending===0&&(et.pending_out=0))}function tt(E,et){c._tr_flush_block(E,0<=E.block_start?E.block_start:-1,E.strstart-E.block_start,et),E.block_start=E.strstart,q(E.strm)}function Lt(E,et){E.pending_buf[E.pending++]=et}function J(E,et){E.pending_buf[E.pending++]=et>>>8&255,E.pending_buf[E.pending++]=255&et}function nt(E,et){var $,C,w=E.max_chain_length,B=E.strstart,X=E.prev_length,K=E.nice_match,G=E.strstart>E.w_size-W?E.strstart-(E.w_size-W):0,ft=E.window,lt=E.w_mask,pt=E.prev,Tt=E.strstart+R,Et=ft[B+X-1],At=ft[B+X];E.prev_length>=E.good_match&&(w>>=2),K>E.lookahead&&(K=E.lookahead);do if(ft[($=et)+X]===At&&ft[$+X-1]===Et&&ft[$]===ft[B]&&ft[++$]===ft[B+1]){B+=2,$++;do;while(ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&B<Tt);if(C=R-(Tt-B),B=Tt-R,X<C){if(E.match_start=et,K<=(X=C))break;Et=ft[B+X-1],At=ft[B+X]}}while((et=pt[et&lt])>G&&--w!=0);return X<=E.lookahead?X:E.lookahead}function wt(E){var et,$,C,w,B,X,K,G,ft,lt,pt=E.w_size;do{if(w=E.window_size-E.lookahead-E.strstart,E.strstart>=pt+(pt-W)){for(l.arraySet(E.window,E.window,pt,pt,0),E.match_start-=pt,E.strstart-=pt,E.block_start-=pt,et=$=E.hash_size;C=E.head[--et],E.head[et]=pt<=C?C-pt:0,--$;);for(et=$=pt;C=E.prev[--et],E.prev[et]=pt<=C?C-pt:0,--$;);w+=pt}if(E.strm.avail_in===0)break;if(X=E.strm,K=E.window,G=E.strstart+E.lookahead,ft=w,lt=void 0,lt=X.avail_in,ft<lt&&(lt=ft),$=lt===0?0:(X.avail_in-=lt,l.arraySet(K,X.input,X.next_in,lt,G),X.state.wrap===1?X.adler=h(X.adler,K,lt,G):X.state.wrap===2&&(X.adler=d(X.adler,K,lt,G)),X.next_in+=lt,X.total_in+=lt,lt),E.lookahead+=$,E.lookahead+E.insert>=I)for(B=E.strstart-E.insert,E.ins_h=E.window[B],E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+1])&E.hash_mask;E.insert&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[B+I-1])&E.hash_mask,E.prev[B&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=B,B++,E.insert--,!(E.lookahead+E.insert<I)););}while(E.lookahead<W&&E.strm.avail_in!==0)}function St(E,et){for(var $,C;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return A;if(E.lookahead===0)break}if($=0,E.lookahead>=I&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),$!==0&&E.strstart-$<=E.w_size-W&&(E.match_length=nt(E,$)),E.match_length>=I)if(C=c._tr_tally(E,E.strstart-E.match_start,E.match_length-I),E.lookahead-=E.match_length,E.match_length<=E.max_lazy_match&&E.lookahead>=I){for(E.match_length--;E.strstart++,E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart,--E.match_length!=0;);E.strstart++}else E.strstart+=E.match_length,E.match_length=0,E.ins_h=E.window[E.strstart],E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+1])&E.hash_mask;else C=c._tr_tally(E,0,E.window[E.strstart]),E.lookahead--,E.strstart++;if(C&&(tt(E,!1),E.strm.avail_out===0))return A}return E.insert=E.strstart<I-1?E.strstart:I-1,et===_?(tt(E,!0),E.strm.avail_out===0?at:ot):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?A:Z}function Pt(E,et){for(var $,C,w;;){if(E.lookahead<W){if(wt(E),E.lookahead<W&&et===p)return A;if(E.lookahead===0)break}if($=0,E.lookahead>=I&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),E.prev_length=E.match_length,E.prev_match=E.match_start,E.match_length=I-1,$!==0&&E.prev_length<E.max_lazy_match&&E.strstart-$<=E.w_size-W&&(E.match_length=nt(E,$),E.match_length<=5&&(E.strategy===1||E.match_length===I&&4096<E.strstart-E.match_start)&&(E.match_length=I-1)),E.prev_length>=I&&E.match_length<=E.prev_length){for(w=E.strstart+E.lookahead-I,C=c._tr_tally(E,E.strstart-1-E.prev_match,E.prev_length-I),E.lookahead-=E.prev_length-1,E.prev_length-=2;++E.strstart<=w&&(E.ins_h=(E.ins_h<<E.hash_shift^E.window[E.strstart+I-1])&E.hash_mask,$=E.prev[E.strstart&E.w_mask]=E.head[E.ins_h],E.head[E.ins_h]=E.strstart),--E.prev_length!=0;);if(E.match_available=0,E.match_length=I-1,E.strstart++,C&&(tt(E,!1),E.strm.avail_out===0))return A}else if(E.match_available){if((C=c._tr_tally(E,0,E.window[E.strstart-1]))&&tt(E,!1),E.strstart++,E.lookahead--,E.strm.avail_out===0)return A}else E.match_available=1,E.strstart++,E.lookahead--}return E.match_available&&(C=c._tr_tally(E,0,E.window[E.strstart-1]),E.match_available=0),E.insert=E.strstart<I-1?E.strstart:I-1,et===_?(tt(E,!0),E.strm.avail_out===0?at:ot):E.last_lit&&(tt(E,!1),E.strm.avail_out===0)?A:Z}function It(E,et,$,C,w){this.good_length=E,this.max_lazy=et,this.nice_length=$,this.max_chain=C,this.func=w}function kt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=S,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*U),this.dyn_dtree=new l.Buf16(2*(2*N+1)),this.bl_tree=new l.Buf16(2*(2*O+1)),rt(this.dyn_ltree),rt(this.dyn_dtree),rt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(H+1),this.heap=new l.Buf16(2*P+1),rt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*P+1),rt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function it(E){var et;return E&&E.state?(E.total_in=E.total_out=0,E.data_type=v,(et=E.state).pending=0,et.pending_out=0,et.wrap<0&&(et.wrap=-et.wrap),et.status=et.wrap?k:F,E.adler=et.wrap===2?0:1,et.last_flush=p,c._tr_init(et),m):j(E,x)}function vt(E){var et=it(E);return et===m&&function($){$.window_size=2*$.w_size,rt($.head),$.max_lazy_match=o[$.level].max_lazy,$.good_match=o[$.level].good_length,$.nice_match=o[$.level].nice_length,$.max_chain_length=o[$.level].max_chain,$.strstart=0,$.block_start=0,$.lookahead=0,$.insert=0,$.match_length=$.prev_length=I-1,$.match_available=0,$.ins_h=0}(E.state),et}function xt(E,et,$,C,w,B){if(!E)return x;var X=1;if(et===y&&(et=6),C<0?(X=0,C=-C):15<C&&(X=2,C-=16),w<1||M<w||$!==S||C<8||15<C||et<0||9<et||B<0||g<B)return j(E,x);C===8&&(C=9);var K=new kt;return(E.state=K).strm=E,K.wrap=X,K.gzhead=null,K.w_bits=C,K.w_size=1<<K.w_bits,K.w_mask=K.w_size-1,K.hash_bits=w+7,K.hash_size=1<<K.hash_bits,K.hash_mask=K.hash_size-1,K.hash_shift=~~((K.hash_bits+I-1)/I),K.window=new l.Buf8(2*K.w_size),K.head=new l.Buf16(K.hash_size),K.prev=new l.Buf16(K.w_size),K.lit_bufsize=1<<w+6,K.pending_buf_size=4*K.lit_bufsize,K.pending_buf=new l.Buf8(K.pending_buf_size),K.d_buf=1*K.lit_bufsize,K.l_buf=3*K.lit_bufsize,K.level=et,K.strategy=B,K.method=$,vt(E)}o=[new It(0,0,0,0,function(E,et){var $=65535;for($>E.pending_buf_size-5&&($=E.pending_buf_size-5);;){if(E.lookahead<=1){if(wt(E),E.lookahead===0&&et===p)return A;if(E.lookahead===0)break}E.strstart+=E.lookahead,E.lookahead=0;var C=E.block_start+$;if((E.strstart===0||E.strstart>=C)&&(E.lookahead=E.strstart-C,E.strstart=C,tt(E,!1),E.strm.avail_out===0)||E.strstart-E.block_start>=E.w_size-W&&(tt(E,!1),E.strm.avail_out===0))return A}return E.insert=0,et===_?(tt(E,!0),E.strm.avail_out===0?at:ot):(E.strstart>E.block_start&&(tt(E,!1),E.strm.avail_out),A)}),new It(4,4,8,4,St),new It(4,5,16,8,St),new It(4,6,32,32,St),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(E,et){return xt(E,et,S,15,8,0)},s.deflateInit2=xt,s.deflateReset=vt,s.deflateResetKeep=it,s.deflateSetHeader=function(E,et){return E&&E.state?E.state.wrap!==2?x:(E.state.gzhead=et,m):x},s.deflate=function(E,et){var $,C,w,B;if(!E||!E.state||5<et||et<0)return E?j(E,x):x;if(C=E.state,!E.output||!E.input&&E.avail_in!==0||C.status===666&&et!==_)return j(E,E.avail_out===0?-5:x);if(C.strm=E,$=C.last_flush,C.last_flush=et,C.status===k)if(C.wrap===2)E.adler=0,Lt(C,31),Lt(C,139),Lt(C,8),C.gzhead?(Lt(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),Lt(C,255&C.gzhead.time),Lt(C,C.gzhead.time>>8&255),Lt(C,C.gzhead.time>>16&255),Lt(C,C.gzhead.time>>24&255),Lt(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),Lt(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(Lt(C,255&C.gzhead.extra.length),Lt(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(E.adler=d(E.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(Lt(C,0),Lt(C,0),Lt(C,0),Lt(C,0),Lt(C,0),Lt(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),Lt(C,3),C.status=F);else{var X=S+(C.w_bits-8<<4)<<8;X|=(2<=C.strategy||C.level<2?0:C.level<6?1:C.level===6?2:3)<<6,C.strstart!==0&&(X|=32),X+=31-X%31,C.status=F,J(C,X),C.strstart!==0&&(J(C,E.adler>>>16),J(C,65535&E.adler)),E.adler=1}if(C.status===69)if(C.gzhead.extra){for(w=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>w&&(E.adler=d(E.adler,C.pending_buf,C.pending-w,w)),q(E),w=C.pending,C.pending!==C.pending_buf_size));)Lt(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>w&&(E.adler=d(E.adler,C.pending_buf,C.pending-w,w)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(C.status===73)if(C.gzhead.name){w=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>w&&(E.adler=d(E.adler,C.pending_buf,C.pending-w,w)),q(E),w=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,Lt(C,B)}while(B!==0);C.gzhead.hcrc&&C.pending>w&&(E.adler=d(E.adler,C.pending_buf,C.pending-w,w)),B===0&&(C.gzindex=0,C.status=91)}else C.status=91;if(C.status===91)if(C.gzhead.comment){w=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>w&&(E.adler=d(E.adler,C.pending_buf,C.pending-w,w)),q(E),w=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,Lt(C,B)}while(B!==0);C.gzhead.hcrc&&C.pending>w&&(E.adler=d(E.adler,C.pending_buf,C.pending-w,w)),B===0&&(C.status=103)}else C.status=103;if(C.status===103&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&q(E),C.pending+2<=C.pending_buf_size&&(Lt(C,255&E.adler),Lt(C,E.adler>>8&255),E.adler=0,C.status=F)):C.status=F),C.pending!==0){if(q(E),E.avail_out===0)return C.last_flush=-1,m}else if(E.avail_in===0&&st(et)<=st($)&&et!==_)return j(E,-5);if(C.status===666&&E.avail_in!==0)return j(E,-5);if(E.avail_in!==0||C.lookahead!==0||et!==p&&C.status!==666){var K=C.strategy===2?function(G,ft){for(var lt;;){if(G.lookahead===0&&(wt(G),G.lookahead===0)){if(ft===p)return A;break}if(G.match_length=0,lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++,lt&&(tt(G,!1),G.strm.avail_out===0))return A}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?at:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?A:Z}(C,et):C.strategy===3?function(G,ft){for(var lt,pt,Tt,Et,At=G.window;;){if(G.lookahead<=R){if(wt(G),G.lookahead<=R&&ft===p)return A;if(G.lookahead===0)break}if(G.match_length=0,G.lookahead>=I&&0<G.strstart&&(pt=At[Tt=G.strstart-1])===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]){Et=G.strstart+R;do;while(pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&Tt<Et);G.match_length=R-(Et-Tt),G.match_length>G.lookahead&&(G.match_length=G.lookahead)}if(G.match_length>=I?(lt=c._tr_tally(G,1,G.match_length-I),G.lookahead-=G.match_length,G.strstart+=G.match_length,G.match_length=0):(lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++),lt&&(tt(G,!1),G.strm.avail_out===0))return A}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?at:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?A:Z}(C,et):o[C.level].func(C,et);if(K!==at&&K!==ot||(C.status=666),K===A||K===at)return E.avail_out===0&&(C.last_flush=-1),m;if(K===Z&&(et===1?c._tr_align(C):et!==5&&(c._tr_stored_block(C,0,0,!1),et===3&&(rt(C.head),C.lookahead===0&&(C.strstart=0,C.block_start=0,C.insert=0))),q(E),E.avail_out===0))return C.last_flush=-1,m}return et!==_?m:C.wrap<=0?1:(C.wrap===2?(Lt(C,255&E.adler),Lt(C,E.adler>>8&255),Lt(C,E.adler>>16&255),Lt(C,E.adler>>24&255),Lt(C,255&E.total_in),Lt(C,E.total_in>>8&255),Lt(C,E.total_in>>16&255),Lt(C,E.total_in>>24&255)):(J(C,E.adler>>>16),J(C,65535&E.adler)),q(E),0<C.wrap&&(C.wrap=-C.wrap),C.pending!==0?m:1)},s.deflateEnd=function(E){var et;return E&&E.state?(et=E.state.status)!==k&&et!==69&&et!==73&&et!==91&&et!==103&&et!==F&&et!==666?j(E,x):(E.state=null,et===F?j(E,-3):m):x},s.deflateSetDictionary=function(E,et){var $,C,w,B,X,K,G,ft,lt=et.length;if(!E||!E.state||(B=($=E.state).wrap)===2||B===1&&$.status!==k||$.lookahead)return x;for(B===1&&(E.adler=h(E.adler,et,lt,0)),$.wrap=0,lt>=$.w_size&&(B===0&&(rt($.head),$.strstart=0,$.block_start=0,$.insert=0),ft=new l.Buf8($.w_size),l.arraySet(ft,et,lt-$.w_size,$.w_size,0),et=ft,lt=$.w_size),X=E.avail_in,K=E.next_in,G=E.input,E.avail_in=lt,E.next_in=0,E.input=et,wt($);$.lookahead>=I;){for(C=$.strstart,w=$.lookahead-(I-1);$.ins_h=($.ins_h<<$.hash_shift^$.window[C+I-1])&$.hash_mask,$.prev[C&$.w_mask]=$.head[$.ins_h],$.head[$.ins_h]=C,C++,--w;);$.strstart=C,$.lookahead=I-1,wt($)}return $.strstart+=$.lookahead,$.block_start=$.strstart,$.insert=$.lookahead,$.lookahead=0,$.match_length=$.prev_length=I-1,$.match_available=0,E.next_in=K,E.input=G,E.avail_in=X,$.wrap=B,m},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,h,d,f,p,_,m,x,y,g,v,S,M,P,N,O,U,H,I,R,W,k,F,A,Z;c=o.state,h=o.next_in,A=o.input,d=h+(o.avail_in-5),f=o.next_out,Z=o.output,p=f-(l-o.avail_out),_=f+(o.avail_out-257),m=c.dmax,x=c.wsize,y=c.whave,g=c.wnext,v=c.window,S=c.hold,M=c.bits,P=c.lencode,N=c.distcode,O=(1<<c.lenbits)-1,U=(1<<c.distbits)-1;t:do{M<15&&(S+=A[h++]<<M,M+=8,S+=A[h++]<<M,M+=8),H=P[S&O];e:for(;;){if(S>>>=I=H>>>24,M-=I,(I=H>>>16&255)===0)Z[f++]=65535&H;else{if(!(16&I)){if(!(64&I)){H=P[(65535&H)+(S&(1<<I)-1)];continue e}if(32&I){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}R=65535&H,(I&=15)&&(M<I&&(S+=A[h++]<<M,M+=8),R+=S&(1<<I)-1,S>>>=I,M-=I),M<15&&(S+=A[h++]<<M,M+=8,S+=A[h++]<<M,M+=8),H=N[S&U];n:for(;;){if(S>>>=I=H>>>24,M-=I,!(16&(I=H>>>16&255))){if(!(64&I)){H=N[(65535&H)+(S&(1<<I)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(W=65535&H,M<(I&=15)&&(S+=A[h++]<<M,(M+=8)<I&&(S+=A[h++]<<M,M+=8)),m<(W+=S&(1<<I)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(S>>>=I,M-=I,(I=f-p)<W){if(y<(I=W-I)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(F=v,(k=0)===g){if(k+=x-I,I<R){for(R-=I;Z[f++]=v[k++],--I;);k=f-W,F=Z}}else if(g<I){if(k+=x+g-I,(I-=g)<R){for(R-=I;Z[f++]=v[k++],--I;);if(k=0,g<R){for(R-=I=g;Z[f++]=v[k++],--I;);k=f-W,F=Z}}}else if(k+=g-I,I<R){for(R-=I;Z[f++]=v[k++],--I;);k=f-W,F=Z}for(;2<R;)Z[f++]=F[k++],Z[f++]=F[k++],Z[f++]=F[k++],R-=3;R&&(Z[f++]=F[k++],1<R&&(Z[f++]=F[k++]))}else{for(k=f-W;Z[f++]=Z[k++],Z[f++]=Z[k++],Z[f++]=Z[k++],2<(R-=3););R&&(Z[f++]=Z[k++],1<R&&(Z[f++]=Z[k++]))}break}}break}}while(h<d&&f<_);h-=R=M>>3,S&=(1<<(M-=R<<3))-1,o.next_in=h,o.next_out=f,o.avail_in=h<d?d-h+5:5-(h-d),o.avail_out=f<_?_-f+257:257-(f-_),c.hold=S,c.bits=M}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),h=e("./inffast"),d=e("./inftrees"),f=1,p=2,_=0,m=-2,x=1,y=852,g=592;function v(k){return(k>>>24&255)+(k>>>8&65280)+((65280&k)<<8)+((255&k)<<24)}function S(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function M(k){var F;return k&&k.state?(F=k.state,k.total_in=k.total_out=F.total=0,k.msg="",F.wrap&&(k.adler=1&F.wrap),F.mode=x,F.last=0,F.havedict=0,F.dmax=32768,F.head=null,F.hold=0,F.bits=0,F.lencode=F.lendyn=new o.Buf32(y),F.distcode=F.distdyn=new o.Buf32(g),F.sane=1,F.back=-1,_):m}function P(k){var F;return k&&k.state?((F=k.state).wsize=0,F.whave=0,F.wnext=0,M(k)):m}function N(k,F){var A,Z;return k&&k.state?(Z=k.state,F<0?(A=0,F=-F):(A=1+(F>>4),F<48&&(F&=15)),F&&(F<8||15<F)?m:(Z.window!==null&&Z.wbits!==F&&(Z.window=null),Z.wrap=A,Z.wbits=F,P(k))):m}function O(k,F){var A,Z;return k?(Z=new S,(k.state=Z).window=null,(A=N(k,F))!==_&&(k.state=null),A):m}var U,H,I=!0;function R(k){if(I){var F;for(U=new o.Buf32(512),H=new o.Buf32(32),F=0;F<144;)k.lens[F++]=8;for(;F<256;)k.lens[F++]=9;for(;F<280;)k.lens[F++]=7;for(;F<288;)k.lens[F++]=8;for(d(f,k.lens,0,288,U,0,k.work,{bits:9}),F=0;F<32;)k.lens[F++]=5;d(p,k.lens,0,32,H,0,k.work,{bits:5}),I=!1}k.lencode=U,k.lenbits=9,k.distcode=H,k.distbits=5}function W(k,F,A,Z){var at,ot=k.state;return ot.window===null&&(ot.wsize=1<<ot.wbits,ot.wnext=0,ot.whave=0,ot.window=new o.Buf8(ot.wsize)),Z>=ot.wsize?(o.arraySet(ot.window,F,A-ot.wsize,ot.wsize,0),ot.wnext=0,ot.whave=ot.wsize):(Z<(at=ot.wsize-ot.wnext)&&(at=Z),o.arraySet(ot.window,F,A-Z,at,ot.wnext),(Z-=at)?(o.arraySet(ot.window,F,A-Z,Z,0),ot.wnext=Z,ot.whave=ot.wsize):(ot.wnext+=at,ot.wnext===ot.wsize&&(ot.wnext=0),ot.whave<ot.wsize&&(ot.whave+=at))),0}s.inflateReset=P,s.inflateReset2=N,s.inflateResetKeep=M,s.inflateInit=function(k){return O(k,15)},s.inflateInit2=O,s.inflate=function(k,F){var A,Z,at,ot,j,st,rt,q,tt,Lt,J,nt,wt,St,Pt,It,kt,it,vt,xt,E,et,$,C,w=0,B=new o.Buf8(4),X=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!k||!k.state||!k.output||!k.input&&k.avail_in!==0)return m;(A=k.state).mode===12&&(A.mode=13),j=k.next_out,at=k.output,rt=k.avail_out,ot=k.next_in,Z=k.input,st=k.avail_in,q=A.hold,tt=A.bits,Lt=st,J=rt,et=_;t:for(;;)switch(A.mode){case x:if(A.wrap===0){A.mode=13;break}for(;tt<16;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(2&A.wrap&&q===35615){B[A.check=0]=255&q,B[1]=q>>>8&255,A.check=c(A.check,B,2,0),tt=q=0,A.mode=2;break}if(A.flags=0,A.head&&(A.head.done=!1),!(1&A.wrap)||(((255&q)<<8)+(q>>8))%31){k.msg="incorrect header check",A.mode=30;break}if((15&q)!=8){k.msg="unknown compression method",A.mode=30;break}if(tt-=4,E=8+(15&(q>>>=4)),A.wbits===0)A.wbits=E;else if(E>A.wbits){k.msg="invalid window size",A.mode=30;break}A.dmax=1<<E,k.adler=A.check=1,A.mode=512&q?10:12,tt=q=0;break;case 2:for(;tt<16;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(A.flags=q,(255&A.flags)!=8){k.msg="unknown compression method",A.mode=30;break}if(57344&A.flags){k.msg="unknown header flags set",A.mode=30;break}A.head&&(A.head.text=q>>8&1),512&A.flags&&(B[0]=255&q,B[1]=q>>>8&255,A.check=c(A.check,B,2,0)),tt=q=0,A.mode=3;case 3:for(;tt<32;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}A.head&&(A.head.time=q),512&A.flags&&(B[0]=255&q,B[1]=q>>>8&255,B[2]=q>>>16&255,B[3]=q>>>24&255,A.check=c(A.check,B,4,0)),tt=q=0,A.mode=4;case 4:for(;tt<16;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}A.head&&(A.head.xflags=255&q,A.head.os=q>>8),512&A.flags&&(B[0]=255&q,B[1]=q>>>8&255,A.check=c(A.check,B,2,0)),tt=q=0,A.mode=5;case 5:if(1024&A.flags){for(;tt<16;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}A.length=q,A.head&&(A.head.extra_len=q),512&A.flags&&(B[0]=255&q,B[1]=q>>>8&255,A.check=c(A.check,B,2,0)),tt=q=0}else A.head&&(A.head.extra=null);A.mode=6;case 6:if(1024&A.flags&&(st<(nt=A.length)&&(nt=st),nt&&(A.head&&(E=A.head.extra_len-A.length,A.head.extra||(A.head.extra=new Array(A.head.extra_len)),o.arraySet(A.head.extra,Z,ot,nt,E)),512&A.flags&&(A.check=c(A.check,Z,nt,ot)),st-=nt,ot+=nt,A.length-=nt),A.length))break t;A.length=0,A.mode=7;case 7:if(2048&A.flags){if(st===0)break t;for(nt=0;E=Z[ot+nt++],A.head&&E&&A.length<65536&&(A.head.name+=String.fromCharCode(E)),E&&nt<st;);if(512&A.flags&&(A.check=c(A.check,Z,nt,ot)),st-=nt,ot+=nt,E)break t}else A.head&&(A.head.name=null);A.length=0,A.mode=8;case 8:if(4096&A.flags){if(st===0)break t;for(nt=0;E=Z[ot+nt++],A.head&&E&&A.length<65536&&(A.head.comment+=String.fromCharCode(E)),E&&nt<st;);if(512&A.flags&&(A.check=c(A.check,Z,nt,ot)),st-=nt,ot+=nt,E)break t}else A.head&&(A.head.comment=null);A.mode=9;case 9:if(512&A.flags){for(;tt<16;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(q!==(65535&A.check)){k.msg="header crc mismatch",A.mode=30;break}tt=q=0}A.head&&(A.head.hcrc=A.flags>>9&1,A.head.done=!0),k.adler=A.check=0,A.mode=12;break;case 10:for(;tt<32;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}k.adler=A.check=v(q),tt=q=0,A.mode=11;case 11:if(A.havedict===0)return k.next_out=j,k.avail_out=rt,k.next_in=ot,k.avail_in=st,A.hold=q,A.bits=tt,2;k.adler=A.check=1,A.mode=12;case 12:if(F===5||F===6)break t;case 13:if(A.last){q>>>=7&tt,tt-=7&tt,A.mode=27;break}for(;tt<3;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}switch(A.last=1&q,tt-=1,3&(q>>>=1)){case 0:A.mode=14;break;case 1:if(R(A),A.mode=20,F!==6)break;q>>>=2,tt-=2;break t;case 2:A.mode=17;break;case 3:k.msg="invalid block type",A.mode=30}q>>>=2,tt-=2;break;case 14:for(q>>>=7&tt,tt-=7&tt;tt<32;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if((65535&q)!=(q>>>16^65535)){k.msg="invalid stored block lengths",A.mode=30;break}if(A.length=65535&q,tt=q=0,A.mode=15,F===6)break t;case 15:A.mode=16;case 16:if(nt=A.length){if(st<nt&&(nt=st),rt<nt&&(nt=rt),nt===0)break t;o.arraySet(at,Z,ot,nt,j),st-=nt,ot+=nt,rt-=nt,j+=nt,A.length-=nt;break}A.mode=12;break;case 17:for(;tt<14;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(A.nlen=257+(31&q),q>>>=5,tt-=5,A.ndist=1+(31&q),q>>>=5,tt-=5,A.ncode=4+(15&q),q>>>=4,tt-=4,286<A.nlen||30<A.ndist){k.msg="too many length or distance symbols",A.mode=30;break}A.have=0,A.mode=18;case 18:for(;A.have<A.ncode;){for(;tt<3;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}A.lens[X[A.have++]]=7&q,q>>>=3,tt-=3}for(;A.have<19;)A.lens[X[A.have++]]=0;if(A.lencode=A.lendyn,A.lenbits=7,$={bits:A.lenbits},et=d(0,A.lens,0,19,A.lencode,0,A.work,$),A.lenbits=$.bits,et){k.msg="invalid code lengths set",A.mode=30;break}A.have=0,A.mode=19;case 19:for(;A.have<A.nlen+A.ndist;){for(;It=(w=A.lencode[q&(1<<A.lenbits)-1])>>>16&255,kt=65535&w,!((Pt=w>>>24)<=tt);){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(kt<16)q>>>=Pt,tt-=Pt,A.lens[A.have++]=kt;else{if(kt===16){for(C=Pt+2;tt<C;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(q>>>=Pt,tt-=Pt,A.have===0){k.msg="invalid bit length repeat",A.mode=30;break}E=A.lens[A.have-1],nt=3+(3&q),q>>>=2,tt-=2}else if(kt===17){for(C=Pt+3;tt<C;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}tt-=Pt,E=0,nt=3+(7&(q>>>=Pt)),q>>>=3,tt-=3}else{for(C=Pt+7;tt<C;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}tt-=Pt,E=0,nt=11+(127&(q>>>=Pt)),q>>>=7,tt-=7}if(A.have+nt>A.nlen+A.ndist){k.msg="invalid bit length repeat",A.mode=30;break}for(;nt--;)A.lens[A.have++]=E}}if(A.mode===30)break;if(A.lens[256]===0){k.msg="invalid code -- missing end-of-block",A.mode=30;break}if(A.lenbits=9,$={bits:A.lenbits},et=d(f,A.lens,0,A.nlen,A.lencode,0,A.work,$),A.lenbits=$.bits,et){k.msg="invalid literal/lengths set",A.mode=30;break}if(A.distbits=6,A.distcode=A.distdyn,$={bits:A.distbits},et=d(p,A.lens,A.nlen,A.ndist,A.distcode,0,A.work,$),A.distbits=$.bits,et){k.msg="invalid distances set",A.mode=30;break}if(A.mode=20,F===6)break t;case 20:A.mode=21;case 21:if(6<=st&&258<=rt){k.next_out=j,k.avail_out=rt,k.next_in=ot,k.avail_in=st,A.hold=q,A.bits=tt,h(k,J),j=k.next_out,at=k.output,rt=k.avail_out,ot=k.next_in,Z=k.input,st=k.avail_in,q=A.hold,tt=A.bits,A.mode===12&&(A.back=-1);break}for(A.back=0;It=(w=A.lencode[q&(1<<A.lenbits)-1])>>>16&255,kt=65535&w,!((Pt=w>>>24)<=tt);){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(It&&!(240&It)){for(it=Pt,vt=It,xt=kt;It=(w=A.lencode[xt+((q&(1<<it+vt)-1)>>it)])>>>16&255,kt=65535&w,!(it+(Pt=w>>>24)<=tt);){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}q>>>=it,tt-=it,A.back+=it}if(q>>>=Pt,tt-=Pt,A.back+=Pt,A.length=kt,It===0){A.mode=26;break}if(32&It){A.back=-1,A.mode=12;break}if(64&It){k.msg="invalid literal/length code",A.mode=30;break}A.extra=15&It,A.mode=22;case 22:if(A.extra){for(C=A.extra;tt<C;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}A.length+=q&(1<<A.extra)-1,q>>>=A.extra,tt-=A.extra,A.back+=A.extra}A.was=A.length,A.mode=23;case 23:for(;It=(w=A.distcode[q&(1<<A.distbits)-1])>>>16&255,kt=65535&w,!((Pt=w>>>24)<=tt);){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(!(240&It)){for(it=Pt,vt=It,xt=kt;It=(w=A.distcode[xt+((q&(1<<it+vt)-1)>>it)])>>>16&255,kt=65535&w,!(it+(Pt=w>>>24)<=tt);){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}q>>>=it,tt-=it,A.back+=it}if(q>>>=Pt,tt-=Pt,A.back+=Pt,64&It){k.msg="invalid distance code",A.mode=30;break}A.offset=kt,A.extra=15&It,A.mode=24;case 24:if(A.extra){for(C=A.extra;tt<C;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}A.offset+=q&(1<<A.extra)-1,q>>>=A.extra,tt-=A.extra,A.back+=A.extra}if(A.offset>A.dmax){k.msg="invalid distance too far back",A.mode=30;break}A.mode=25;case 25:if(rt===0)break t;if(nt=J-rt,A.offset>nt){if((nt=A.offset-nt)>A.whave&&A.sane){k.msg="invalid distance too far back",A.mode=30;break}wt=nt>A.wnext?(nt-=A.wnext,A.wsize-nt):A.wnext-nt,nt>A.length&&(nt=A.length),St=A.window}else St=at,wt=j-A.offset,nt=A.length;for(rt<nt&&(nt=rt),rt-=nt,A.length-=nt;at[j++]=St[wt++],--nt;);A.length===0&&(A.mode=21);break;case 26:if(rt===0)break t;at[j++]=A.length,rt--,A.mode=21;break;case 27:if(A.wrap){for(;tt<32;){if(st===0)break t;st--,q|=Z[ot++]<<tt,tt+=8}if(J-=rt,k.total_out+=J,A.total+=J,J&&(k.adler=A.check=A.flags?c(A.check,at,J,j-J):l(A.check,at,J,j-J)),J=rt,(A.flags?q:v(q))!==A.check){k.msg="incorrect data check",A.mode=30;break}tt=q=0}A.mode=28;case 28:if(A.wrap&&A.flags){for(;tt<32;){if(st===0)break t;st--,q+=Z[ot++]<<tt,tt+=8}if(q!==(4294967295&A.total)){k.msg="incorrect length check",A.mode=30;break}tt=q=0}A.mode=29;case 29:et=1;break t;case 30:et=-3;break t;case 31:return-4;case 32:default:return m}return k.next_out=j,k.avail_out=rt,k.next_in=ot,k.avail_in=st,A.hold=q,A.bits=tt,(A.wsize||J!==k.avail_out&&A.mode<30&&(A.mode<27||F!==4))&&W(k,k.output,k.next_out,J-k.avail_out)?(A.mode=31,-4):(Lt-=k.avail_in,J-=k.avail_out,k.total_in+=Lt,k.total_out+=J,A.total+=J,A.wrap&&J&&(k.adler=A.check=A.flags?c(A.check,at,J,k.next_out-J):l(A.check,at,J,k.next_out-J)),k.data_type=A.bits+(A.last?64:0)+(A.mode===12?128:0)+(A.mode===20||A.mode===15?256:0),(Lt==0&&J===0||F===4)&&et===_&&(et=-5),et)},s.inflateEnd=function(k){if(!k||!k.state)return m;var F=k.state;return F.window&&(F.window=null),k.state=null,_},s.inflateGetHeader=function(k,F){var A;return k&&k.state&&2&(A=k.state).wrap?((A.head=F).done=!1,_):m},s.inflateSetDictionary=function(k,F){var A,Z=F.length;return k&&k.state?(A=k.state).wrap!==0&&A.mode!==11?m:A.mode===11&&l(1,F,Z,0)!==A.check?-3:W(k,F,Z,Z)?(A.mode=31,-4):(A.havedict=1,_):m},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],h=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,p,_,m,x,y,g,v){var S,M,P,N,O,U,H,I,R,W=v.bits,k=0,F=0,A=0,Z=0,at=0,ot=0,j=0,st=0,rt=0,q=0,tt=null,Lt=0,J=new o.Buf16(16),nt=new o.Buf16(16),wt=null,St=0;for(k=0;k<=15;k++)J[k]=0;for(F=0;F<m;F++)J[p[_+F]]++;for(at=W,Z=15;1<=Z&&J[Z]===0;Z--);if(Z<at&&(at=Z),Z===0)return x[y++]=20971520,x[y++]=20971520,v.bits=1,0;for(A=1;A<Z&&J[A]===0;A++);for(at<A&&(at=A),k=st=1;k<=15;k++)if(st<<=1,(st-=J[k])<0)return-1;if(0<st&&(f===0||Z!==1))return-1;for(nt[1]=0,k=1;k<15;k++)nt[k+1]=nt[k]+J[k];for(F=0;F<m;F++)p[_+F]!==0&&(g[nt[p[_+F]]++]=F);if(U=f===0?(tt=wt=g,19):f===1?(tt=l,Lt-=257,wt=c,St-=257,256):(tt=h,wt=d,-1),k=A,O=y,j=F=q=0,P=-1,N=(rt=1<<(ot=at))-1,f===1&&852<rt||f===2&&592<rt)return 1;for(;;){for(H=k-j,R=g[F]<U?(I=0,g[F]):g[F]>U?(I=wt[St+g[F]],tt[Lt+g[F]]):(I=96,0),S=1<<k-j,A=M=1<<ot;x[O+(q>>j)+(M-=S)]=H<<24|I<<16|R|0,M!==0;);for(S=1<<k-1;q&S;)S>>=1;if(S!==0?(q&=S-1,q+=S):q=0,F++,--J[k]==0){if(k===Z)break;k=p[_+g[F]]}if(at<k&&(q&N)!==P){for(j===0&&(j=at),O+=A,st=1<<(ot=k-j);ot+j<Z&&!((st-=J[ot+j])<=0);)ot++,st<<=1;if(rt+=1<<ot,f===1&&852<rt||f===2&&592<rt)return 1;x[P=q&N]=at<<24|ot<<16|O-y|0}}return q!==0&&(x[O+q]=k-j<<24|64<<16|0),v.bits=at,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function h(w){for(var B=w.length;0<=--B;)w[B]=0}var d=0,f=29,p=256,_=p+1+f,m=30,x=19,y=2*_+1,g=15,v=16,S=7,M=256,P=16,N=17,O=18,U=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],H=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],W=new Array(2*(_+2));h(W);var k=new Array(2*m);h(k);var F=new Array(512);h(F);var A=new Array(256);h(A);var Z=new Array(f);h(Z);var at,ot,j,st=new Array(m);function rt(w,B,X,K,G){this.static_tree=w,this.extra_bits=B,this.extra_base=X,this.elems=K,this.max_length=G,this.has_stree=w&&w.length}function q(w,B){this.dyn_tree=w,this.max_code=0,this.stat_desc=B}function tt(w){return w<256?F[w]:F[256+(w>>>7)]}function Lt(w,B){w.pending_buf[w.pending++]=255&B,w.pending_buf[w.pending++]=B>>>8&255}function J(w,B,X){w.bi_valid>v-X?(w.bi_buf|=B<<w.bi_valid&65535,Lt(w,w.bi_buf),w.bi_buf=B>>v-w.bi_valid,w.bi_valid+=X-v):(w.bi_buf|=B<<w.bi_valid&65535,w.bi_valid+=X)}function nt(w,B,X){J(w,X[2*B],X[2*B+1])}function wt(w,B){for(var X=0;X|=1&w,w>>>=1,X<<=1,0<--B;);return X>>>1}function St(w,B,X){var K,G,ft=new Array(g+1),lt=0;for(K=1;K<=g;K++)ft[K]=lt=lt+X[K-1]<<1;for(G=0;G<=B;G++){var pt=w[2*G+1];pt!==0&&(w[2*G]=wt(ft[pt]++,pt))}}function Pt(w){var B;for(B=0;B<_;B++)w.dyn_ltree[2*B]=0;for(B=0;B<m;B++)w.dyn_dtree[2*B]=0;for(B=0;B<x;B++)w.bl_tree[2*B]=0;w.dyn_ltree[2*M]=1,w.opt_len=w.static_len=0,w.last_lit=w.matches=0}function It(w){8<w.bi_valid?Lt(w,w.bi_buf):0<w.bi_valid&&(w.pending_buf[w.pending++]=w.bi_buf),w.bi_buf=0,w.bi_valid=0}function kt(w,B,X,K){var G=2*B,ft=2*X;return w[G]<w[ft]||w[G]===w[ft]&&K[B]<=K[X]}function it(w,B,X){for(var K=w.heap[X],G=X<<1;G<=w.heap_len&&(G<w.heap_len&&kt(B,w.heap[G+1],w.heap[G],w.depth)&&G++,!kt(B,K,w.heap[G],w.depth));)w.heap[X]=w.heap[G],X=G,G<<=1;w.heap[X]=K}function vt(w,B,X){var K,G,ft,lt,pt=0;if(w.last_lit!==0)for(;K=w.pending_buf[w.d_buf+2*pt]<<8|w.pending_buf[w.d_buf+2*pt+1],G=w.pending_buf[w.l_buf+pt],pt++,K===0?nt(w,G,B):(nt(w,(ft=A[G])+p+1,B),(lt=U[ft])!==0&&J(w,G-=Z[ft],lt),nt(w,ft=tt(--K),X),(lt=H[ft])!==0&&J(w,K-=st[ft],lt)),pt<w.last_lit;);nt(w,M,B)}function xt(w,B){var X,K,G,ft=B.dyn_tree,lt=B.stat_desc.static_tree,pt=B.stat_desc.has_stree,Tt=B.stat_desc.elems,Et=-1;for(w.heap_len=0,w.heap_max=y,X=0;X<Tt;X++)ft[2*X]!==0?(w.heap[++w.heap_len]=Et=X,w.depth[X]=0):ft[2*X+1]=0;for(;w.heap_len<2;)ft[2*(G=w.heap[++w.heap_len]=Et<2?++Et:0)]=1,w.depth[G]=0,w.opt_len--,pt&&(w.static_len-=lt[2*G+1]);for(B.max_code=Et,X=w.heap_len>>1;1<=X;X--)it(w,ft,X);for(G=Tt;X=w.heap[1],w.heap[1]=w.heap[w.heap_len--],it(w,ft,1),K=w.heap[1],w.heap[--w.heap_max]=X,w.heap[--w.heap_max]=K,ft[2*G]=ft[2*X]+ft[2*K],w.depth[G]=(w.depth[X]>=w.depth[K]?w.depth[X]:w.depth[K])+1,ft[2*X+1]=ft[2*K+1]=G,w.heap[1]=G++,it(w,ft,1),2<=w.heap_len;);w.heap[--w.heap_max]=w.heap[1],function(At,Ht){var zt,Dt,Kt,Vt,oe,ae,Qt=Ht.dyn_tree,Ft=Ht.max_code,D=Ht.stat_desc.static_tree,ut=Ht.stat_desc.has_stree,Mt=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,Nt=Ht.stat_desc.max_length,re=0;for(Vt=0;Vt<=g;Vt++)At.bl_count[Vt]=0;for(Qt[2*At.heap[At.heap_max]+1]=0,zt=At.heap_max+1;zt<y;zt++)Nt<(Vt=Qt[2*Qt[2*(Dt=At.heap[zt])+1]+1]+1)&&(Vt=Nt,re++),Qt[2*Dt+1]=Vt,Ft<Dt||(At.bl_count[Vt]++,oe=0,Rt<=Dt&&(oe=Mt[Dt-Rt]),ae=Qt[2*Dt],At.opt_len+=ae*(Vt+oe),ut&&(At.static_len+=ae*(D[2*Dt+1]+oe)));if(re!==0){do{for(Vt=Nt-1;At.bl_count[Vt]===0;)Vt--;At.bl_count[Vt]--,At.bl_count[Vt+1]+=2,At.bl_count[Nt]--,re-=2}while(0<re);for(Vt=Nt;Vt!==0;Vt--)for(Dt=At.bl_count[Vt];Dt!==0;)Ft<(Kt=At.heap[--zt])||(Qt[2*Kt+1]!==Vt&&(At.opt_len+=(Vt-Qt[2*Kt+1])*Qt[2*Kt],Qt[2*Kt+1]=Vt),Dt--)}}(w,B),St(ft,Et,w.bl_count)}function E(w,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),B[2*(X+1)+1]=65535,K=0;K<=X;K++)G=lt,lt=B[2*(K+1)+1],++pt<Tt&&G===lt||(pt<Et?w.bl_tree[2*G]+=pt:G!==0?(G!==ft&&w.bl_tree[2*G]++,w.bl_tree[2*P]++):pt<=10?w.bl_tree[2*N]++:w.bl_tree[2*O]++,ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4))}function et(w,B,X){var K,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),K=0;K<=X;K++)if(G=lt,lt=B[2*(K+1)+1],!(++pt<Tt&&G===lt)){if(pt<Et)for(;nt(w,G,w.bl_tree),--pt!=0;);else G!==0?(G!==ft&&(nt(w,G,w.bl_tree),pt--),nt(w,P,w.bl_tree),J(w,pt-3,2)):pt<=10?(nt(w,N,w.bl_tree),J(w,pt-3,3)):(nt(w,O,w.bl_tree),J(w,pt-11,7));ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4)}}h(st);var $=!1;function C(w,B,X,K){J(w,(d<<1)+(K?1:0),3),function(G,ft,lt,pt){It(G),Lt(G,lt),Lt(G,~lt),o.arraySet(G.pending_buf,G.window,ft,lt,G.pending),G.pending+=lt}(w,B,X)}s._tr_init=function(w){$||(function(){var B,X,K,G,ft,lt=new Array(g+1);for(G=K=0;G<f-1;G++)for(Z[G]=K,B=0;B<1<<U[G];B++)A[K++]=G;for(A[K-1]=G,G=ft=0;G<16;G++)for(st[G]=ft,B=0;B<1<<H[G];B++)F[ft++]=G;for(ft>>=7;G<m;G++)for(st[G]=ft<<7,B=0;B<1<<H[G]-7;B++)F[256+ft++]=G;for(X=0;X<=g;X++)lt[X]=0;for(B=0;B<=143;)W[2*B+1]=8,B++,lt[8]++;for(;B<=255;)W[2*B+1]=9,B++,lt[9]++;for(;B<=279;)W[2*B+1]=7,B++,lt[7]++;for(;B<=287;)W[2*B+1]=8,B++,lt[8]++;for(St(W,_+1,lt),B=0;B<m;B++)k[2*B+1]=5,k[2*B]=wt(B,5);at=new rt(W,U,p+1,_,g),ot=new rt(k,H,0,m,g),j=new rt(new Array(0),I,0,x,S)}(),$=!0),w.l_desc=new q(w.dyn_ltree,at),w.d_desc=new q(w.dyn_dtree,ot),w.bl_desc=new q(w.bl_tree,j),w.bi_buf=0,w.bi_valid=0,Pt(w)},s._tr_stored_block=C,s._tr_flush_block=function(w,B,X,K){var G,ft,lt=0;0<w.level?(w.strm.data_type===2&&(w.strm.data_type=function(pt){var Tt,Et=4093624447;for(Tt=0;Tt<=31;Tt++,Et>>>=1)if(1&Et&&pt.dyn_ltree[2*Tt]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Tt=32;Tt<p;Tt++)if(pt.dyn_ltree[2*Tt]!==0)return c;return l}(w)),xt(w,w.l_desc),xt(w,w.d_desc),lt=function(pt){var Tt;for(E(pt,pt.dyn_ltree,pt.l_desc.max_code),E(pt,pt.dyn_dtree,pt.d_desc.max_code),xt(pt,pt.bl_desc),Tt=x-1;3<=Tt&&pt.bl_tree[2*R[Tt]+1]===0;Tt--);return pt.opt_len+=3*(Tt+1)+5+5+4,Tt}(w),G=w.opt_len+3+7>>>3,(ft=w.static_len+3+7>>>3)<=G&&(G=ft)):G=ft=X+5,X+4<=G&&B!==-1?C(w,B,X,K):w.strategy===4||ft===G?(J(w,2+(K?1:0),3),vt(w,W,k)):(J(w,4+(K?1:0),3),function(pt,Tt,Et,At){var Ht;for(J(pt,Tt-257,5),J(pt,Et-1,5),J(pt,At-4,4),Ht=0;Ht<At;Ht++)J(pt,pt.bl_tree[2*R[Ht]+1],3);et(pt,pt.dyn_ltree,Tt-1),et(pt,pt.dyn_dtree,Et-1)}(w,w.l_desc.max_code+1,w.d_desc.max_code+1,lt+1),vt(w,w.dyn_ltree,w.dyn_dtree)),Pt(w),K&&It(w)},s._tr_tally=function(w,B,X){return w.pending_buf[w.d_buf+2*w.last_lit]=B>>>8&255,w.pending_buf[w.d_buf+2*w.last_lit+1]=255&B,w.pending_buf[w.l_buf+w.last_lit]=255&X,w.last_lit++,B===0?w.dyn_ltree[2*X]++:(w.matches++,B--,w.dyn_ltree[2*(A[X]+p+1)]++,w.dyn_dtree[2*tt(B)]++),w.last_lit===w.lit_bufsize-1},s._tr_align=function(w){J(w,2,3),nt(w,M,W),function(B){B.bi_valid===16?(Lt(B,B.bi_buf),B.bi_buf=0,B.bi_valid=0):8<=B.bi_valid&&(B.pending_buf[B.pending++]=255&B.bi_buf,B.bi_buf>>=8,B.bi_valid-=8)}(w)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var h,d,f,p,_=1,m={},x=!1,y=l.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(l);g=g&&g.setTimeout?g:l,h={}.toString.call(l.process)==="[object process]"?function(P){process.nextTick(function(){S(P)})}:function(){if(l.postMessage&&!l.importScripts){var P=!0,N=l.onmessage;return l.onmessage=function(){P=!1},l.postMessage("","*"),l.onmessage=N,P}}()?(p="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",M,!1):l.attachEvent("onmessage",M),function(P){l.postMessage(p+P,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(P){S(P.data)},function(P){f.port2.postMessage(P)}):y&&"onreadystatechange"in y.createElement("script")?(d=y.documentElement,function(P){var N=y.createElement("script");N.onreadystatechange=function(){S(P),N.onreadystatechange=null,d.removeChild(N),N=null},d.appendChild(N)}):function(P){setTimeout(S,0,P)},g.setImmediate=function(P){typeof P!="function"&&(P=new Function(""+P));for(var N=new Array(arguments.length-1),O=0;O<N.length;O++)N[O]=arguments[O+1];var U={callback:P,args:N};return m[_]=U,h(_),_++},g.clearImmediate=v}function v(P){delete m[P]}function S(P){if(x)setTimeout(S,0,P);else{var N=m[P];if(N){x=!0;try{(function(O){var U=O.callback,H=O.args;switch(H.length){case 0:U();break;case 1:U(H[0]);break;case 2:U(H[0],H[1]);break;case 3:U(H[0],H[1],H[2]);break;default:U.apply(c,H)}})(N)}finally{v(P),x=!1}}}}function M(P){P.source===l&&typeof P.data=="string"&&P.data.indexOf(p)===0&&S(+P.data.slice(p.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof Es<"u"?Es:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(vf);var Fb=vf.exports;const Hb=nd(Fb);async function Vb(r){if(!bt.tg||!bt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(bt.tg.traverse(m=>{if(!(m instanceof ke))return;const x=m.geometry.clone();m.updateWorldMatrix(!0,!1),x.applyMatrix4(m.matrixWorld);const y=x.attributes.position,g=x.index;if(!y||y.count<3){x.dispose();return}let v="E4DFD8";const S=Array.isArray(m.material)?m.material[0]:m.material;S&&"color"in S&&(v=S.color.getHexString().toUpperCase());let M="";for(let N=0;N<y.count;N++)M+=`<vertex x="${y.getX(N).toFixed(4)}" y="${y.getZ(N).toFixed(4)}" z="${y.getY(N).toFixed(4)}"/>`;let P="";if(g)for(let N=0;N<g.count;N+=3)P+=`<triangle v1="${g.getX(N)}" v2="${g.getX(N+1)}" v3="${g.getX(N+2)}"/>`;else for(let N=0;N<y.count;N+=3)P+=`<triangle v1="${N}" v2="${N+1}" v3="${N+2}"/>`;x.dispose(),P&&t.push({id:e++,name:m.name||"mesh",col:v,vx:M,tr:P})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(m=>`<basematerials id="${m.id+1e3}"><base name="${m.name}" displaycolor="#${m.col}"/></basematerials>`).join(`
`),s=t.map(m=>`<object id="${m.id}" type="model" p:pid="${m.id+1e3}" p:pindex="0"><mesh><vertices>${m.vx}</vertices><triangles>${m.tr}</triangles></mesh></object>`).join(`
`),o=t.map(m=>`<item objectid="${m.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),h=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),d=new Hb;d.file("[Content_Types].xml",h),d.folder("_rels").file(".rels",c),d.folder("3D").file("3dmodel.model",l);const f=await d.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(_),_.click(),document.body.removeChild(_),URL.revokeObjectURL(p)}let Hn=null,fi=null,Gn=null,Vn=null,$u="",Mn=null,gn=null,Jn=null,Yl="",$l=[],Ku="";const Oi={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},yf={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0};let na=null,Wo=[],en=null,Vr=null,Ms=null,fc=!1;const fa=256,Gb=2048;let Kl=[];const Gr=[];function xf(){if(!en||!Vr)return!1;const r=Vr.getBoundingClientRect();return!r.width||!r.height?!1:(en.style.left=`${r.left}px`,en.style.top=`${r.top}px`,en.style.width=`${r.width}px`,en.style.height=`${r.height}px`,Hn&&(Hn.setSize(r.width,r.height,!1),Gn.aspect=r.width/r.height,Gn.updateProjectionMatrix()),!0)}function Ju(){if(!en||!fc)return;xf()&&en.style.display==="none"&&(en.style.display="block")}function ia(r){if(en||(en=document.getElementById("dims-canvas")),Vr!==r&&(Ms&&Vr&&Ms.unobserve(Vr),Vr=r,Ms||(Ms=new ResizeObserver(Ju),window.addEventListener("resize",Ju)),Ms.observe(r)),fc=!0,xf()&&en&&(en.style.display="block"),Hn)return;const t=r.getBoundingClientRect(),e=t.width||800,n=t.height||600;Hn=new Hd({canvas:en,antialias:!0}),Hn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Hn.setSize(e,n,!1),fi=new Vd,fi.background=new ie(527380),Gn=new bn(42,e/n,.1,1e5),Vn=new tf(Gn,en),Vn.enableDamping=!0,Vn.dampingFactor=.06,fi.add(new Qd(16777215,.8));const s=new Xl(16777215,.6);s.position.set(1.5,3,2),fi.add(s);const o=()=>{requestAnimationFrame(o),Vn.update(),Hn.render(fi,Gn),l1()};o()}function bf(){fc=!1,en&&(en.style.display="none")}function pa(r){if(Object.assign(Oi,r),Mn&&(gn&&(gn.dispose(),gn=null),gn=wf(Mn.bounds,Mn.grid,fa,Mn.minE,Mn.elevRange,$l),na)){const e=na.material;e.map=gn,e.needsUpdate=!0}const t=new ie(Oi[1]);for(const e of Wo)e.material.color.set(t)}function Wb(r,t){yf[r]=t,pa({})}async function Zb(r,t,e){if(!fi||!Gn||!Vn||!Hn)return;const n=`${r.minLat}|${r.maxLat}|${r.minLon}|${r.maxLon}`;n!==$u?($u=n,Mn=null,gn&&(gn.dispose(),gn=null),e(5,"Téléchargement des altitudes…"),Mn=await o1(r),e(35,"Chargement des données géographiques…"),n!==Ku&&(Ku=n,$l=await qb(r)),e(70,"Génération de la texture…"),gn=wf(r,Mn.grid,fa,Mn.minE,Mn.elevRange,$l)):e(50,"Reconstruction…");const o=JSON.stringify(t.zonePts);(o!==Yl||!Jn)&&(Yl=o,Jn&&(Jn.dispose(),Jn=null),Jn=Yb(t.zonePts,t.zoneType,r)),e(88,"Construction de la scène 3D…"),ma(t),e(100,"")}function ma(r){if(!fi||!Gn||!Vn||!Mn||!gn)return;a1();const{wMm:t,dMm:e,baseH:n,exag:s,flatFacade:o,facadeWidthMm:l,gpxPoints:c,zoneType:h,zonePts:d,bounds:f}=r,{grid:p,minE:_,elevRange:m}=Mn,x=f??Mn.bounds,y=(x.minLat+x.maxLat)/2,g=(x.maxLon-x.minLon)*Math.cos(y*Math.PI/180)*111320,v=(x.maxLat-x.minLat)*111320,S=Math.max(g,v),M=Math.max(t,e),P=Math.max(1,Math.min(M*.5,m/S*M*s)),N=n+P,O=fa,U=$b(d,h,x,t,e),H=Math.max(1,l);na=null,Wo=[];{const F=new Gs(t,e,O-1,O-1);F.rotateX(-Math.PI/2);const A=F.attributes.position;for(let at=0;at<A.count;at++)A.setY(at,n+(p[at]-_)/m*P);A.needsUpdate=!0,F.computeVertexNormals();const Z=new ke(F,new Sl({map:gn,alphaMap:Jn??void 0,transparent:!!Jn}));na=Z,Ss(Z)}const I=new ie(Oi[1]),R=new ke(Kb(U,h,t,e,n,H),new Sl({color:I}));Wo.push(R),Ss(R);const W=new Sl({color:I,side:mn});for(const F of Jb(U,h,t,e,H,o,N,p,O,_,m,n,P))F.material=W,Wo.push(F),Ss(F);if(c.length>=2){const F=n1(c,x,t,e,p,O,_,m,n,P);F&&Ss(F)}{const F=new Qy(new fx(new ln(t+H*2,N,e+H*2)),new oc({color:16718362}));F.position.y=N/2,Ss(F)}Gr.length=0,Gr.push({id:"dl-width",v:new Q(0,2,e/2+H+14)}),Gr.push({id:"dl-depth",v:new Q(t/2+H+14,N*.1,0)}),Gr.push({id:"dl-height",v:new Q(-t/2-H-12,N/2,e/2+8)}),zr("dl-width",`${t} mm`),zr("dl-depth",`${e} mm`),zr("dl-height",`~${Math.round(N*10)/10} mm`),zr("dp-total-val",`~${Math.round(N*10)/10}`),zr("dp-map-h",`~${Math.round(P*10)/10}`),zr("dp-base-h-disp",`${n}`);const k=Math.sqrt(t*t+e*e);if(Vn.target.lengthSq()<.1){Gn.position.set(t*.7,N+k*.44,e*.92);const F=new Q(0,N*.2,0);Gn.lookAt(F),Vn.target.copy(F),Vn.update()}}function Xb(){Vn&&Vn.target.set(0,0,0),gn&&(gn.dispose(),gn=null),Jn&&(Jn.dispose(),Jn=null),Yl=""}async function qb(r){const{minLat:t,minLon:e,maxLat:n,maxLon:s}=r,o=`(${t},${e},${n},${s})`,l=`[out:json][timeout:28];
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
out geom;`,c=new AbortController,h=setTimeout(()=>c.abort(),22e3);try{const d=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(l)}`,{signal:c.signal});return clearTimeout(h),(await d.json()).elements??[]}catch{return clearTimeout(h),[]}}const jb=[{id:"veg_low",match:r=>r.natural==="grassland"||r.landuse==="meadow"||r.landuse==="grass"||r.landuse==="farmland"||r.natural==="fell"||r.natural==="moor"||r.natural==="heath"||r.natural==="scrub",slot:3,fill:!0},{id:"veg_dense",match:r=>r.natural==="wood"||r.landuse==="forest",slot:4,fill:!0},{id:"wetland",match:r=>r.natural==="wetland"||r.natural==="mud",slot:3,fill:!0},{id:"snow",match:r=>r.natural==="glacier"||r.natural==="snow",slot:2,fill:!0},{id:"water",match:r=>r.natural==="water"||r.waterway==="riverbank",slot:5,fill:!0},{id:"waterways",match:r=>!!r.waterway&&r.waterway!=="riverbank",slot:5,fill:!1}];function wf(r,t,e,n,s,o){const l=Gb,c=document.createElement("canvas");c.width=c.height=l;const h=c.getContext("2d"),d=h.createImageData(l,l),f=d.data;for(let p=0;p<l;p++)for(let _=0;_<l;_++){const m=_/(l-1)*(e-1),x=p/(l-1)*(e-1),y=Math.min(e-2,Math.floor(m)),g=Math.min(e-2,Math.floor(x)),v=m-y,S=x-g,M=t[g*e+y]*(1-v)*(1-S)+t[g*e+y+1]*v*(1-S)+t[(g+1)*e+y]*(1-v)*S+t[(g+1)*e+y+1]*v*S,P=Math.max(0,Math.min(1,(M-n)/s)),[N,O,U]=s1(P),H=(p*l+_)*4;f[H]=N,f[H+1]=O,f[H+2]=U,f[H+3]=255}h.putImageData(d,0,0);for(const p of jb){if(!yf[p.id])continue;const _=o.filter(x=>x.tags&&p.match(x.tags));if(!_.length)continue;const m=Oi[p.slot]??"#888";if(p.fill){h.beginPath();for(const x of _)Qu(h,x,r,l);h.fillStyle=m,h.fill("evenodd")}else for(const x of _){if(!x.tags)continue;const y=x.tags.waterway??"",g=y==="river"?7:y==="canal"?5:y==="stream"?2.5:1.5;h.beginPath(),Qu(h,x,r,l),h.strokeStyle=m,h.lineWidth=g,h.lineCap="round",h.lineJoin="round",h.stroke()}}return new Wd(c)}function Qu(r,t,e,n){const s=o=>{if(!(!o||o.length<2)){for(let l=0;l<o.length;l++){const c=(o[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,h=(1-(o[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?r.moveTo(c,h):r.lineTo(c,h)}r.closePath()}};if(t.type==="way"&&t.geometry)s(t.geometry);else if(t.type==="relation"&&t.members)for(const o of t.members)o.role==="outer"&&o.geometry&&s(o.geometry)}function Yb(r,t,e,n,s){if(!r||r.length<3||t==="rect"||t==="sq")return null;const o=512,l=document.createElement("canvas");l.width=l.height=o;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,o,o),c.fillStyle="white",c.beginPath();for(let h=0;h<r.length;h++){const[d,f]=r[h],p=(f-e.minLon)/(e.maxLon-e.minLon)*o,_=(1-(d-e.minLat)/(e.maxLat-e.minLat))*o;h===0?c.moveTo(p,_):c.lineTo(p,_)}return c.closePath(),c.fill(),new Wd(l)}function $b(r,t,e,n,s){return!r||r.length<3||t==="rect"||t==="sq"?[[-n/2,-s/2],[n/2,-s/2],[n/2,s/2],[-n/2,s/2]]:r.map(([o,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(o-e.minLat)/(e.maxLat-e.minLat))*s-s/2])}function Kb(r,t,e,n,s,o){if(t==="rect"||t==="sq"){const h=new ln(e+o*2,s,n+o*2);return h.translate(0,s/2,0),h}const l=new hc;if(t==="circ"){const h=e/2+o,d=n/2+o;for(let f=0;f<=64;f++){const p=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(p)*h,Math.sin(p)*d):l.lineTo(Math.cos(p)*h,Math.sin(p)*d)}}else{l.moveTo(r[0][0],r[0][1]);for(let h=1;h<r.length;h++)l.lineTo(r[h][0],r[h][1]);l.closePath()}const c=new da(l,{depth:s,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function Jb(r,t,e,n,s,o,l,c,h,d,f,p,_){const m=(y,g)=>{const v=Math.max(0,Math.min(1,(y+e/2)/e)),S=Math.max(0,Math.min(1,(g+n/2)/n)),M=v*(h-1),P=S*(h-1),N=Math.min(h-2,Math.floor(M)),O=Math.min(h-2,Math.floor(P)),U=M-N,H=P-O,I=c[O*h+N]*(1-U)*(1-H)+c[O*h+N+1]*U*(1-H)+c[(O+1)*h+N]*(1-U)*H+c[(O+1)*h+N+1]*U*H;return p+(I-d)/f*_};return t==="rect"||t==="sq"?o?Qb(e,n,s,l):t1(e,n,s,h,c,d,f,p,_):e1(r,s,o?()=>l:m)}function Qb(r,t,e,n){const s=(o,l,c,h,d)=>{const f=new ke(new ln(o,l,c));return f.position.set(h,l/2,d),f};return[s(r+e*2,n,e,0,t/2+e/2),s(r+e*2,n,e,0,-t/2-e/2),s(e,n,t,r/2+e/2,0),s(e,n,t,-r/2-e/2,0)]}function t1(r,t,e,n,s,o,l,c,h){const d=(g,v)=>c+(s[v*n+g]-o)/l*h,f=d(0,n-1),p=d(n-1,n-1),_=d(0,0),m=d(n-1,0),x=[[-r/2-e,t/2,f],...Array.from({length:n},(g,v)=>[-r/2+v/(n-1)*r,t/2,d(v,n-1)]),[r/2+e,t/2,p]],y=[[r/2+e,-t/2,m],...Array.from({length:n},(g,v)=>[r/2-v/(n-1)*r,-t/2,d(n-1-v,0)]),[-r/2-e,-t/2,_]];return[Cs(x,[0,0,1],e),Cs(y,[0,0,-1],e),Cs(Array.from({length:n},(g,v)=>[r/2,t/2-v/(n-1)*t,d(n-1,n-1-v)]),[1,0,0],e),Cs(Array.from({length:n},(g,v)=>[-r/2,-t/2+v/(n-1)*t,d(0,v)]),[-1,0,0],e)]}function e1(r,t,e){const n=[],s=r.length;for(let o=0;o<s;o++){const[l,c]=r[o],[h,d]=r[(o+1)%s],f=h-l,p=d-c,_=Math.sqrt(f*f+p*p);if(_<.5)continue;const m=p/_,x=-f/_,y=Math.max(2,Math.round(_/3)),g=[];for(let v=0;v<=y;v++){const S=v/y,M=l+f*S,P=c+p*S;g.push([M,P,e(M,P)])}n.push(Cs(g,[m,0,x],t))}return n}function Cs(r,t,e){const n=r.length,[s,,o]=t,l=[],c=[];for(const[m,x,y]of r)l.push(m+s*e,0,x+o*e),l.push(m+s*e,y,x+o*e);for(const[m,x,y]of r)l.push(m,0,x),l.push(m,y,x);for(const[m,x,y]of r)l.push(m+s*e,y,x+o*e),l.push(m,y,x);for(const[m,x]of r)l.push(m+s*e,0,x+o*e),l.push(m,0,x);const h=0,d=n*2,f=n*4,p=n*6;for(let m=0;m<n-1;m++){const x=m*2;c.push(h+x,h+x+2,h+x+1,h+x+1,h+x+2,h+x+3),c.push(d+x,d+x+1,d+x+2,d+x+1,d+x+3,d+x+2),c.push(f+x,f+x+1,f+x+2,f+x+1,f+x+3,f+x+2),c.push(p+x,p+x+2,p+x+1,p+x+1,p+x+2,p+x+3)}const _=new Fe;return _.setAttribute("position",new Me(l,3)),_.setIndex(c),_.computeVertexNormals(),new ke(_)}function n1(r,t,e,n,s,o,l,c,h,d){const f=[];for(const p of r){const _=(p.lon-t.minLon)/(t.maxLon-t.minLon),m=(p.lat-t.minLat)/(t.maxLat-t.minLat);if(_<0||_>1||m<0||m>1)continue;const x=(_-.5)*e,y=(.5-m)*n,g=_*(o-1),v=(1-m)*(o-1),S=Math.min(o-2,Math.floor(g)),M=Math.min(o-2,Math.floor(v)),P=g-S,N=v-M,O=s[M*o+S]*(1-P)*(1-N)+s[M*o+S+1]*P*(1-N)+s[(M+1)*o+S]*(1-P)*N+s[(M+1)*o+S+1]*P*N;f.push(new Q(x,h+(O-l)/c*d+1,y))}return f.length<2?null:new Gd(new Fe().setFromPoints(f),new oc({color:16729344}))}function i1(r,t,e){return[Math.round(r[0]+(t[0]-r[0])*e),Math.round(r[1]+(t[1]-r[1])*e),Math.round(r[2]+(t[2]-r[2])*e)]}function r1(r){const t=parseInt(r.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function s1(r){const[t,e,n]=r1(Oi[1]),o=[[0,[120,140,92]],[.18,[154,152,104]],[.38,[176,160,114]],[.58,[184,168,120]],[.74,[170,150,112]],[.88,[180,168,144]],[1,[216,208,192]]].map(([l,[c,h,d]])=>[l,[Math.round(c*.6+t*.4),Math.round(h*.6+e*.4),Math.round(d*.6+n*.4)]]);for(let l=1;l<o.length;l++)if(r<=o[l][0]){const c=(r-o[l-1][0])/(o[l][0]-o[l-1][0]);return i1(o[l-1][1],o[l][1],c)}return o[o.length-1][1]}async function o1(r){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=s=>{s.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:s.data.elevGrid,minE:s.data.minE,elevRange:s.data.elevRange,bounds:r})):s.data.type==="ERROR"&&(n.terminate(),e(new Error(s.data.message)))},n.onerror=s=>{n.terminate(),e(s)},n.postMessage({type:"BUILD_TERRAIN",bounds:r,GRID:fa,elevZoom:12})})}function Ss(r){fi.add(r),Kl.push(r)}function zr(r,t){const e=document.getElementById(r);e&&(e.textContent=t)}function a1(){Kl.forEach(r=>{fi.remove(r),r.geometry?.dispose()}),Kl=[],Gr.length=0}function l1(){if(!Gn||!Hn)return;const r=Hn.domElement.clientWidth,t=Hn.domElement.clientHeight;if(!(!r||!t))for(const{id:e,v:n}of Gr){const s=document.getElementById(e);if(!s)continue;const o=n.clone().project(Gn);if(o.z>1){s.style.opacity="0";continue}s.style.opacity="1",s.style.left=`${(o.x+1)/2*r}px`,s.style.top=`${-(o.y-1)/2*t}px`}}const c1=.05;function h1(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function u1(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function pc(){if(!bt.bounds){Il("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(bt.generating)return;bt.generating=!0;const r=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");r.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),Fa(!0);try{const n=document.getElementById("c3d");await uc(n);const s=id(),{bounds:o,wMm:l,dMm:c}=bt,{minLat:h,maxLat:d,minLon:f,maxLon:p}=o,_=(h+d)/2,m=(f+p)/2,x=(p-f)*Math.cos(_*Math.PI/180)*111320;bt.mmPerMeter=l/x,bt.BASE_H=s.baseH,xi(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const y=s.terrainRes,g=await new Promise((H,I)=>{const R=h1();R.onmessage=k=>{k.data.type==="PROGRESS"?xi(5+k.data.pct*.2,"ÉLÉVATION","Altitude…"):k.data.type==="TERRAIN_READY"?(R.terminate(),H(k.data)):k.data.type==="ERROR"&&(R.terminate(),I(new Error(k.data.message)))},R.onerror=k=>{R.terminate(),I(k)};const W={type:"BUILD_TERRAIN",bounds:o,GRID:y,elevZoom:s.elevZoom};R.postMessage(W)});bt.elevGrid=g.elevGrid,bt.GRID=g.GRID,bt.minE=g.minE,bt.elevRange=g.elevRange;const S=(d-h)*111320,M=Math.max(x,S),P=Math.max(l,c),N=g.elevRange/M*P*s.exag;bt.elevScaleMm=Math.max(1,Math.min(P*.5,N)),s.smooth>0&&d1(bt.elevGrid,y,s.smooth),xi(30,"DONNÉES","Chargement des données cartographiques…");const O=await Bb(o,H=>{xi(30+H*.3,"DONNÉES","Données carto…")});xi(60,"GÉOMÉTRIE","Génération des géométries 3D…");const U=await new Promise((H,I)=>{const R=u1();R.onmessage=k=>{k.data.type==="GEO_PROGRESS"?xi(60+k.data.pct*.35,"GÉOMÉTRIE",`${k.data.step}…`):k.data.type==="GEOMETRY_READY"?(R.terminate(),H(k.data)):k.data.type==="ERROR"&&(R.terminate(),I(new Error(k.data.message)))},R.onerror=k=>{R.terminate(),I(k)};const W={type:"BUILD_GEOMETRY",elevGrid:bt.elevGrid,GRID:bt.GRID,wMm:l,dMm:c,BASE_H:bt.BASE_H,MIN_SURF:c1,elevScaleMm:bt.elevScaleMm,minE:bt.minE,elevRange:bt.elevRange,features:O,gpxPoints:bt.gpxPoints,bounds:o,settings:s,zoneType:bt.zoneType,zonePts:bt.zonePts,mmPerMeter:bt.mmPerMeter};R.postMessage(W)});xi(95,"SCÈNE","Construction de la scène 3D…"),Wx(U),xi(100,"TERMINÉ","Modèle 3D prêt."),bt.generated=!0,bt.generating=!1,setTimeout(()=>{Fa(!1),document.getElementById("hint3d").style.display="block",f1(g.minE,g.maxE,bt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){bt.generating=!1,Fa(!1),Il("ERREUR",String(n)),console.error(n)}finally{r.disabled=!1}}function d1(r,t,e){const n=new Float32Array(r.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,h=0;for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){const p=o+d,_=l+f;p>=0&&p<t&&_>=0&&_<t&&(c+=r[p*t+_],h++)}n[o*t+l]=c/h}r.set(n)}}function f1(r,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(r)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function p1(){const r=document.getElementById("zone-footer");r&&(bt.bounds?(r.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),Xb()):(r.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}let ra=!1,Rl=!1;function ga(){const r=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:r("dp-w",bt.wMm||200),dMm:r("dp-d",bt.dMm||200),baseH:r("dp-base",5),exag:r("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:r("dp-walls",2),gpxPoints:bt.gpxPoints,zoneType:bt.zoneType,zonePts:bt.zonePts,bounds:bt.bounds}}function Mf(){const r=(_,m)=>{const x=document.getElementById(_);x&&(x.value=String(Math.round(m)))};if(!bt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:s}=bt.bounds,o=(t+e)/2,l=(s-n)*Math.cos(o*Math.PI/180)*111320,c=(e-t)*111320,h=200,d=l/c,f=d>=1?h:Math.max(10,Math.round(h*d)),p=d<1?h:Math.max(10,Math.round(h/d));bt.wMm=f,bt.dMm=p,r("dp-w",f),r("dp-d",p)}function cr(){const r=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=document.getElementById("dp-layers-hint"),o=document.getElementById("dp-wall-mm");s&&(s.textContent=`${Math.round(r/e)} couches`),o&&(o.textContent=`${(t*n).toFixed(2)} mm`)}async function Jl(){if(!bt.bounds||Rl)return;Rl=!0;const r=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");r.classList.remove("hidden");try{await Zb(bt.bounds,ga(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{r.classList.add("hidden"),Rl=!1}}function _a(){bt.bounds&&(Mf(),cr(),requestAnimationFrame(()=>{const r=document.getElementById("dims-view");ra?(ia(r),Jl()):(ra=!0,ia(r),Jl())}))}window.dpToggle=r=>{document.getElementById(r)?.classList.toggle("open")};Tp();Lp(p1);document.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.tab;if(!(!t||r.disabled)&&(or(t),t==="params"?_a():t==="colors"?Sf():bf(),t==="render")){const e=document.getElementById("c3d");e&&uc(e)}})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),or("colors"),Sf()});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),or("render");const r=document.getElementById("c3d");r&&uc(r),pc()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{bf(),or("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{or("params"),_a()});document.getElementById("btn-back-params")?.addEventListener("click",()=>{or("params"),_a()});document.getElementById("btn-gen")?.addEventListener("click",pc);document.getElementById("btn-stl")?.addEventListener("click",()=>_f("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>Vb());document.querySelectorAll(".dp-sh").forEach(r=>{r.addEventListener("click",()=>{r.closest(".dp-sec")?.classList.toggle("open")})});let td;const m1=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];m1.forEach(r=>{document.getElementById(r)?.addEventListener("input",()=>{cr();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(bt.wMm=t),e>0&&(bt.dMm=e),clearTimeout(td),td=setTimeout(()=>ma(ga()),500)})});document.getElementById("dp-walls")?.addEventListener("input",cr);document.getElementById("dp-flat")?.addEventListener("change",()=>{ma(ga())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>{if(!bt.generated){Il("INFO",`Générez d'abord le modèle 3D dans l'onglet "Générer & Exporter".`);return}_f("terrain3d.stl")});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{bt.bounds&&(or("params"),_a())});let ed;document.querySelectorAll("#params-col input, #params-col select").forEach(r=>{r.addEventListener("change",()=>{clearTimeout(ed),ed=setTimeout(()=>{bt.generated&&bt.tg&&pc()},700)}),r.addEventListener("input",()=>{if(r.type==="range"){const t=document.getElementById(`${r.id}-v`);t&&(t.textContent=r.value)}})});function Sf(){bt.bounds&&(Mf(),requestAnimationFrame(()=>{const r=document.getElementById("colors-3d-area");ra?(ia(r),ma(ga())):(ra=!0,ia(r),Jl()),g1()}))}function g1(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(r=>{const t=Number(r.dataset.slot);Oi[t]&&(r.style.background=Oi[t])}),document.querySelectorAll(".cp-sw-inner").forEach(r=>{const e=r.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(r.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(r=>{const t=Number(r.dataset.slot);r.addEventListener("input",()=>{const n=r.value,s=r.nextElementSibling;s&&(s.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(o=>{o.style.background=n}),pa({[t]:n})});const e=r.nextElementSibling;e&&(e.style.background=r.value)});document.querySelectorAll(".cp-eye").forEach(r=>{const t=r.dataset.layer;t&&r.addEventListener("click",()=>{r.classList.toggle("hidden-layer");const e=!r.classList.contains("hidden-layer");Wb(t,e)})});const Ef={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const r=document.getElementById("cp-preset").value,t=Ef[r];t&&(pa(t),Object.entries(t).forEach(([e,n])=>{const s=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(s){s.value=n;const o=s.nextElementSibling;o&&(o.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const _1=document.getElementById("cp-dd-trigger"),mc=document.getElementById("cp-dd-menu");_1?.addEventListener("click",r=>{r.stopPropagation(),mc?.classList.toggle("open")});document.addEventListener("click",()=>mc?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const e=r.dataset.preset??"",n=r.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),r.classList.add("cp-dd-active");const s=document.getElementById("cp-dd-label");s&&(s.textContent=n),mc?.classList.remove("open");const o=Ef[e];o&&(pa(o),v1(o))})});function v1(r){Object.entries(r).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const s=n.nextElementSibling;s&&(s.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);r[e]&&(t.style.background=r[e])})}const gc=document.getElementById("cp-main"),_c=document.getElementById("cp-detail"),Tf=document.getElementById("ldp-title"),Af=document.getElementById("ldp-icon"),Cf=document.getElementById("ldp-content");function y1(r,t,e,n){Tf.textContent=e,Af.innerHTML=n,Cf.innerHTML=x1(t),gc.style.display="none",_c.style.display="flex",E1(t)}function Lf(){_c.style.display="none",gc.style.display="flex"}document.getElementById("ldp-back")?.addEventListener("click",Lf);document.querySelectorAll(".cp-layer-nav").forEach(r=>{r.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del"))return;const e=r.dataset.type??"land_cover",n=r.querySelector(".cp-layer-name")?.textContent??"Couche",s=r.querySelector(".cp-layer-ico")?.innerHTML??"";y1(r.dataset.layer??"",e,n,s)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{Tf.textContent="Nouvelle couche",Af.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',Cf.innerHTML=S1(),gc.style.display="none",_c.style.display="flex",T1()});function x1(r){return r==="markers"?b1():r==="lines"?w1():M1()}function b1(){return`
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
  </div>`}function w1(){return`
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
  </div>`}function M1(){return`
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
  </div>`}function S1(){return`
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
  </div>`}function E1(r){Number(document.getElementById("ps-wall-w")?.value??.42);const t=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(r==="markers"){const e=document.getElementById("ldp-marker-size"),n=document.getElementById("ldp-marker-size-n"),s=document.getElementById("ldp-marker-rot"),o=document.getElementById("ldp-marker-rot-n"),l=document.getElementById("ldp-marker-offset"),c=()=>{const h=Number(e.value);n.value=h.toFixed(1),l.nextElementSibling&&(l.nextElementSibling.textContent=`( ${l.value===""?"0.00":(Number(l.value)*t).toFixed(2)} mm )`)};e?.addEventListener("input",()=>{n.value=e.value,c()}),n?.addEventListener("input",()=>{e&&(e.value=n.value)}),s?.addEventListener("input",()=>{o&&(o.value=s.value)}),o?.addEventListener("input",()=>{s&&(s.value=o.value)})}if(r==="lines"){const e=document.getElementById("ldp-line-w"),n=document.getElementById("ldp-line-w-n");e?.addEventListener("input",()=>{n&&(n.value=e.value)}),n?.addEventListener("input",()=>{e&&(e.value=n.value)})}}function T1(){document.getElementById("ldp-new-type")?.addEventListener("change",r=>{const t=r.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",Lf),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const r=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=r[(r.indexOf(t)+1)%r.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=Oi[e]??"#888"})}const jr=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{jr.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{jr.classList.add("hidden")});jr?.addEventListener("click",r=>{r.target===jr&&jr.classList.add("hidden")});const sa=document.getElementById("ps-layer-h"),oa=document.getElementById("ps-wall-w"),Pf=document.getElementById("ps-layer-h-val"),Rf=document.getElementById("ps-wall-w-val");sa?.addEventListener("input",()=>{Pf.textContent=Number(sa.value).toFixed(2),cr()});oa?.addEventListener("input",()=>{Rf.textContent=Number(oa.value).toFixed(2),cr()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{jr.classList.add("hidden"),cr()});document.getElementById("ps-reset")?.addEventListener("click",()=>{sa&&(sa.value="0.20",Pf.textContent="0.20"),oa&&(oa.value="0.42",Rf.textContent="0.42"),cr()});
