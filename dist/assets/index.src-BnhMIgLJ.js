(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function Jp(){document.getElementById("app").innerHTML=`

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
`}function wi(r,t,e){const n=u=>document.getElementById(u),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${r}%`);const c=n("pp");c&&(c.textContent=`${Math.round(r)}%`)}function Ja(r){const t=document.getElementById("prog");t&&(t.style.display=r?"flex":"none")}function Gl(r,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=r,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function lr(r){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===r)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${r}`))}window.ts=r=>{document.getElementById(`sb-${r}`)?.classList.toggle("h"),document.getElementById(`ca-${r}`)?.classList.toggle("o")};window.ev=r=>{r.stopPropagation()};var Is=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function xd(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Wl={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(r,t){(function(e,n){n(t)})(Is,function(e){var n="1.9.4";function s(i){var a,h,b,A;for(h=1,b=arguments.length;h<b;h++){A=arguments[h];for(a in A)i[a]=A[a]}return i}var o=Object.create||function(){function i(){}return function(a){return i.prototype=a,new i}}();function l(i,a){var h=Array.prototype.slice;if(i.bind)return i.bind.apply(i,h.call(arguments,1));var b=h.call(arguments,2);return function(){return i.apply(a,b.length?b.concat(h.call(arguments)):arguments)}}var c=0;function u(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,a,h){var b,A,z,Y;return Y=function(){b=!1,A&&(z.apply(h,A),A=!1)},z=function(){b?A=arguments:(i.apply(h,arguments),setTimeout(Y,a),b=!0)},z}function f(i,a,h){var b=a[1],A=a[0],z=b-A;return i===b&&h?i:((i-A)%z+z)%z+A}function p(){return!1}function _(i,a){if(a===!1)return i;var h=Math.pow(10,a===void 0?6:a);return Math.round(i*h)/h}function m(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function x(i){return m(i).split(/\s+/)}function y(i,a){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?o(i.options):{});for(var h in a)i.options[h]=a[h];return i.options}function g(i,a,h){var b=[];for(var A in i)b.push(encodeURIComponent(h?A.toUpperCase():A)+"="+encodeURIComponent(i[A]));return(!a||a.indexOf("?")===-1?"?":"&")+b.join("&")}var v=/\{ *([\w_ -]+) *\}/g;function S(i,a){return i.replace(v,function(h,b){var A=a[b];if(A===void 0)throw new Error("No value provided for variable "+h);return typeof A=="function"&&(A=A(a)),A})}var w=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function E(i,a){for(var h=0;h<i.length;h++)if(i[h]===a)return h;return-1}var N="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function U(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var O=0;function F(i){var a=+new Date,h=Math.max(0,16-(a-O));return O=a+h,window.setTimeout(i,h)}var I=window.requestAnimationFrame||U("RequestAnimationFrame")||F,R=window.cancelAnimationFrame||U("CancelAnimationFrame")||U("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function W(i,a,h){if(h&&I===F)i.call(a);else return I.call(window,l(i,a))}function k(i){i&&R.call(window,i)}var H={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:u,throttle:d,wrapNum:f,falseFn:p,formatNum:_,trim:m,splitWords:x,setOptions:y,getParamString:g,template:S,isArray:w,indexOf:E,emptyImageUrl:N,requestFn:I,cancelFn:R,requestAnimFrame:W,cancelAnimFrame:k};function P(){}P.extend=function(i){var a=function(){y(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},h=a.__super__=this.prototype,b=o(h);b.constructor=a,a.prototype=b;for(var A in this)Object.prototype.hasOwnProperty.call(this,A)&&A!=="prototype"&&A!=="__super__"&&(a[A]=this[A]);return i.statics&&s(a,i.statics),i.includes&&(Z(i.includes),s.apply(null,[b].concat(i.includes))),s(b,i),delete b.statics,delete b.includes,b.options&&(b.options=h.options?o(h.options):{},s(b.options,i.options)),b._initHooks=[],b.callInitHooks=function(){if(!this._initHooksCalled){h.callInitHooks&&h.callInitHooks.call(this),this._initHooksCalled=!0;for(var z=0,Y=b._initHooks.length;z<Y;z++)b._initHooks[z].call(this)}},a},P.include=function(i){var a=this.prototype.options;return s(this.prototype,i),i.options&&(this.prototype.options=a,this.mergeOptions(i.options)),this},P.mergeOptions=function(i){return s(this.prototype.options,i),this},P.addInitHook=function(i){var a=Array.prototype.slice.call(arguments,1),h=typeof i=="function"?i:function(){this[i].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(h),this};function Z(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=w(i)?i:[i];for(var a=0;a<i.length;a++)i[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var nt={on:function(i,a,h){if(typeof i=="object")for(var b in i)this._on(b,i[b],a);else{i=x(i);for(var A=0,z=i.length;A<z;A++)this._on(i[A],a,h)}return this},off:function(i,a,h){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var b in i)this._off(b,i[b],a);else{i=x(i);for(var A=arguments.length===1,z=0,Y=i.length;z<Y;z++)A?this._off(i[z]):this._off(i[z],a,h)}return this},_on:function(i,a,h,b){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(i,a,h)===!1){h===this&&(h=void 0);var A={fn:a,ctx:h};b&&(A.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(A)}},_off:function(i,a,h){var b,A,z;if(this._events&&(b=this._events[i],!!b)){if(arguments.length===1){if(this._firingCount)for(A=0,z=b.length;A<z;A++)b[A].fn=p;delete this._events[i];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var Y=this._listens(i,a,h);if(Y!==!1){var ut=b[Y];this._firingCount&&(ut.fn=p,this._events[i]=b=b.slice()),b.splice(Y,1)}}},fire:function(i,a,h){if(!this.listens(i,h))return this;var b=s({},a,{type:i,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var A=this._events[i];if(A){this._firingCount=this._firingCount+1||1;for(var z=0,Y=A.length;z<Y;z++){var ut=A[z],mt=ut.fn;ut.once&&this.off(i,mt,ut.ctx),mt.call(ut.ctx||this,b)}this._firingCount--}}return h&&this._propagateEvent(b),this},listens:function(i,a,h,b){typeof i!="string"&&console.warn('"string" type argument expected');var A=a;typeof a!="function"&&(b=!!a,A=void 0,h=void 0);var z=this._events&&this._events[i];if(z&&z.length&&this._listens(i,A,h)!==!1)return!0;if(b){for(var Y in this._eventParents)if(this._eventParents[Y].listens(i,a,h,b))return!0}return!1},_listens:function(i,a,h){if(!this._events)return!1;var b=this._events[i]||[];if(!a)return!!b.length;h===this&&(h=void 0);for(var A=0,z=b.length;A<z;A++)if(b[A].fn===a&&b[A].ctx===h)return A;return!1},once:function(i,a,h){if(typeof i=="object")for(var b in i)this._on(b,i[b],a,!0);else{i=x(i);for(var A=0,z=i.length;A<z;A++)this._on(i[A],a,h,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[u(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[u(i)],this},_propagateEvent:function(i){for(var a in this._eventParents)this._eventParents[a].fire(i.type,s({layer:i.target,propagatedFrom:i.target},i),!0)}};nt.addEventListener=nt.on,nt.removeEventListener=nt.clearAllEventListeners=nt.off,nt.addOneTimeEventListener=nt.once,nt.fireEvent=nt.fire,nt.hasEventListeners=nt.listens;var ot=P.extend(nt);function j(i,a,h){this.x=h?Math.round(i):i,this.y=h?Math.round(a):a}var rt=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};j.prototype={clone:function(){return new j(this.x,this.y)},add:function(i){return this.clone()._add(at(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(at(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new j(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new j(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=rt(this.x),this.y=rt(this.y),this},distanceTo:function(i){i=at(i);var a=i.x-this.x,h=i.y-this.y;return Math.sqrt(a*a+h*h)},equals:function(i){return i=at(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=at(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+_(this.x)+", "+_(this.y)+")"}};function at(i,a,h){return i instanceof j?i:w(i)?new j(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new j(i.x,i.y):new j(i,a,h)}function q(i,a){if(i)for(var h=a?[i,a]:i,b=0,A=h.length;b<A;b++)this.extend(h[b])}q.prototype={extend:function(i){var a,h;if(!i)return this;if(i instanceof j||typeof i[0]=="number"||"x"in i)a=h=at(i);else if(i=tt(i),a=i.min,h=i.max,!a||!h)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=h.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(h.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(h.y,this.max.y)),this},getCenter:function(i){return at((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return at(this.min.x,this.max.y)},getTopRight:function(){return at(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var a,h;return typeof i[0]=="number"||i instanceof j?i=at(i):i=tt(i),i instanceof q?(a=i.min,h=i.max):a=h=i,a.x>=this.min.x&&h.x<=this.max.x&&a.y>=this.min.y&&h.y<=this.max.y},intersects:function(i){i=tt(i);var a=this.min,h=this.max,b=i.min,A=i.max,z=A.x>=a.x&&b.x<=h.x,Y=A.y>=a.y&&b.y<=h.y;return z&&Y},overlaps:function(i){i=tt(i);var a=this.min,h=this.max,b=i.min,A=i.max,z=A.x>a.x&&b.x<h.x,Y=A.y>a.y&&b.y<h.y;return z&&Y},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var a=this.min,h=this.max,b=Math.abs(a.x-h.x)*i,A=Math.abs(a.y-h.y)*i;return tt(at(a.x-b,a.y-A),at(h.x+b,h.y+A))},equals:function(i){return i?(i=tt(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function tt(i,a){return!i||i instanceof q?i:new q(i,a)}function Lt(i,a){if(i)for(var h=a?[i,a]:i,b=0,A=h.length;b<A;b++)this.extend(h[b])}Lt.prototype={extend:function(i){var a=this._southWest,h=this._northEast,b,A;if(i instanceof it)b=i,A=i;else if(i instanceof Lt){if(b=i._southWest,A=i._northEast,!b||!A)return this}else return i?this.extend(wt(i)||Q(i)):this;return!a&&!h?(this._southWest=new it(b.lat,b.lng),this._northEast=new it(A.lat,A.lng)):(a.lat=Math.min(b.lat,a.lat),a.lng=Math.min(b.lng,a.lng),h.lat=Math.max(A.lat,h.lat),h.lng=Math.max(A.lng,h.lng)),this},pad:function(i){var a=this._southWest,h=this._northEast,b=Math.abs(a.lat-h.lat)*i,A=Math.abs(a.lng-h.lng)*i;return new Lt(new it(a.lat-b,a.lng-A),new it(h.lat+b,h.lng+A))},getCenter:function(){return new it((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new it(this.getNorth(),this.getWest())},getSouthEast:function(){return new it(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof it||"lat"in i?i=wt(i):i=Q(i);var a=this._southWest,h=this._northEast,b,A;return i instanceof Lt?(b=i.getSouthWest(),A=i.getNorthEast()):b=A=i,b.lat>=a.lat&&A.lat<=h.lat&&b.lng>=a.lng&&A.lng<=h.lng},intersects:function(i){i=Q(i);var a=this._southWest,h=this._northEast,b=i.getSouthWest(),A=i.getNorthEast(),z=A.lat>=a.lat&&b.lat<=h.lat,Y=A.lng>=a.lng&&b.lng<=h.lng;return z&&Y},overlaps:function(i){i=Q(i);var a=this._southWest,h=this._northEast,b=i.getSouthWest(),A=i.getNorthEast(),z=A.lat>a.lat&&b.lat<h.lat,Y=A.lng>a.lng&&b.lng<h.lng;return z&&Y},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,a){return i?(i=Q(i),this._southWest.equals(i.getSouthWest(),a)&&this._northEast.equals(i.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function Q(i,a){return i instanceof Lt?i:new Lt(i,a)}function it(i,a,h){if(isNaN(i)||isNaN(a))throw new Error("Invalid LatLng object: ("+i+", "+a+")");this.lat=+i,this.lng=+a,h!==void 0&&(this.alt=+h)}it.prototype={equals:function(i,a){if(!i)return!1;i=wt(i);var h=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return h<=(a===void 0?1e-9:a)},toString:function(i){return"LatLng("+_(this.lat,i)+", "+_(this.lng,i)+")"},distanceTo:function(i){return Pt.distance(this,wt(i))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(i){var a=180*i/40075017,h=a/Math.cos(Math.PI/180*this.lat);return Q([this.lat-a,this.lng-h],[this.lat+a,this.lng+h])},clone:function(){return new it(this.lat,this.lng,this.alt)}};function wt(i,a,h){return i instanceof it?i:w(i)&&typeof i[0]!="object"?i.length===3?new it(i[0],i[1],i[2]):i.length===2?new it(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new it(i.lat,"lng"in i?i.lng:i.lon,i.alt):a===void 0?null:new it(i,a,h)}var St={latLngToPoint:function(i,a){var h=this.projection.project(i),b=this.scale(a);return this.transformation._transform(h,b)},pointToLatLng:function(i,a){var h=this.scale(a),b=this.transformation.untransform(i,h);return this.projection.unproject(b)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var a=this.projection.bounds,h=this.scale(i),b=this.transformation.transform(a.min,h),A=this.transformation.transform(a.max,h);return new q(b,A)},infinite:!1,wrapLatLng:function(i){var a=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,h=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,b=i.alt;return new it(h,a,b)},wrapLatLngBounds:function(i){var a=i.getCenter(),h=this.wrapLatLng(a),b=a.lat-h.lat,A=a.lng-h.lng;if(b===0&&A===0)return i;var z=i.getSouthWest(),Y=i.getNorthEast(),ut=new it(z.lat-b,z.lng-A),mt=new it(Y.lat-b,Y.lng-A);return new Lt(ut,mt)}},Pt=s({},St,{wrapLng:[-180,180],R:6371e3,distance:function(i,a){var h=Math.PI/180,b=i.lat*h,A=a.lat*h,z=Math.sin((a.lat-i.lat)*h/2),Y=Math.sin((a.lng-i.lng)*h/2),ut=z*z+Math.cos(b)*Math.cos(A)*Y*Y,mt=2*Math.atan2(Math.sqrt(ut),Math.sqrt(1-ut));return this.R*mt}}),It=6378137,kt={R:It,MAX_LATITUDE:85.0511287798,project:function(i){var a=Math.PI/180,h=this.MAX_LATITUDE,b=Math.max(Math.min(h,i.lat),-h),A=Math.sin(b*a);return new j(this.R*i.lng*a,this.R*Math.log((1+A)/(1-A))/2)},unproject:function(i){var a=180/Math.PI;return new it((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*a,i.x*a/this.R)},bounds:function(){var i=It*Math.PI;return new q([-i,-i],[i,i])}()};function st(i,a,h,b){if(w(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=a,this._c=h,this._d=b}st.prototype={transform:function(i,a){return this._transform(i.clone(),a)},_transform:function(i,a){return a=a||1,i.x=a*(this._a*i.x+this._b),i.y=a*(this._c*i.y+this._d),i},untransform:function(i,a){return a=a||1,new j((i.x/a-this._b)/this._a,(i.y/a-this._d)/this._c)}};function yt(i,a,h,b){return new st(i,a,h,b)}var xt=s({},Pt,{code:"EPSG:3857",projection:kt,transformation:function(){var i=.5/(Math.PI*kt.R);return yt(i,.5,-i,.5)}()}),T=s({},xt,{code:"EPSG:900913"});function et(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function $(i,a){var h="",b,A,z,Y,ut,mt;for(b=0,z=i.length;b<z;b++){for(ut=i[b],A=0,Y=ut.length;A<Y;A++)mt=ut[A],h+=(A?"L":"M")+mt.x+" "+mt.y;h+=a?Wt.svg?"z":"x":""}return h||"M0 0"}var C=document.documentElement.style,M="ActiveXObject"in window,B=M&&!document.addEventListener,X="msLaunchUri"in navigator&&!("documentMode"in document),J=Ge("webkit"),G=Ge("android"),ft=Ge("android 2")||Ge("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=G&&Ge("Google")&&lt<537&&!("AudioNode"in window),Tt=!!window.opera,Et=!X&&Ge("chrome"),At=Ge("gecko")&&!J&&!Tt&&!M,Ht=!Et&&Ge("safari"),zt=Ge("phantom"),Dt="OTransition"in C,Kt=navigator.platform.indexOf("Win")===0,Vt=M&&"transition"in C,oe="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,ae="MozPerspective"in C,te=!window.L_DISABLE_3D&&(Vt||oe||ae)&&!Dt&&!zt,Ft=typeof orientation<"u"||Ge("mobile"),D=Ft&&J,ht=Ft&&oe,Mt=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||Mt),Nt="ontouchstart"in window||!!window.TouchEvent,re=!window.L_NO_TOUCH&&(Nt||Rt),ue=Ft&&Tt,ve=Ft&&At,Ue=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,ge=function(){var i=!1;try{var a=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",p,a),window.removeEventListener("testPassiveEventSupport",p,a)}catch{}return i}(),Le=function(){return!!document.createElement("canvas").getContext}(),Ee=!!(document.createElementNS&&et("svg").createSVGRect),sn=!!Ee&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),pn=!Ee&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var a=i.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),jn=navigator.platform.indexOf("Mac")===0,vi=navigator.platform.indexOf("Linux")===0;function Ge(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Wt={ie:M,ielt9:B,edge:X,webkit:J,android:G,android23:ft,androidStock:pt,opera:Tt,chrome:Et,gecko:At,safari:Ht,phantom:zt,opera12:Dt,win:Kt,ie3d:Vt,webkit3d:oe,gecko3d:ae,any3d:te,mobile:Ft,mobileWebkit:D,mobileWebkit3d:ht,msPointer:Mt,pointer:Rt,touch:re,touchNative:Nt,mobileOpera:ue,mobileGecko:ve,retina:Ue,passiveEvents:ge,canvas:Le,svg:Ee,vml:pn,inlineSvg:sn,mac:jn,linux:vi},zi=Wt.msPointer?"MSPointerDown":"pointerdown",cs=Wt.msPointer?"MSPointerMove":"pointermove",us=Wt.msPointer?"MSPointerUp":"pointerup",no=Wt.msPointer?"MSPointerCancel":"pointercancel",hs={touchstart:zi,touchmove:cs,touchend:us,touchcancel:no},io={touchstart:ee,touchmove:jt,touchend:jt,touchcancel:jt},V={},ct=!1;function gt(i,a,h){return a==="touchstart"&&qt(),io[a]?(h=io[a].bind(this,h),i.addEventListener(hs[a],h,!1),h):(console.warn("wrong event specified:",a),p)}function _t(i,a,h){if(!hs[a]){console.warn("wrong event specified:",a);return}i.removeEventListener(hs[a],h,!1)}function dt(i){V[i.pointerId]=i}function Ut(i){V[i.pointerId]&&(V[i.pointerId]=i)}function Zt(i){delete V[i.pointerId]}function qt(){ct||(document.addEventListener(zi,dt,!0),document.addEventListener(cs,Ut,!0),document.addEventListener(us,Zt,!0),document.addEventListener(no,Zt,!0),ct=!0)}function jt(i,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var h in V)a.touches.push(V[h]);a.changedTouches=[a],i(a)}}function ee(i,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&Ke(a),jt(i,a)}function Jt(i){var a={},h,b;for(b in i)h=i[b],a[b]=h&&h.bind?h.bind(i):h;return i=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var ne=200;function Ae(i,a){i.addEventListener("dblclick",a);var h=0,b;function A(z){if(z.detail!==1){b=z.detail;return}if(!(z.pointerType==="mouse"||z.sourceCapabilities&&!z.sourceCapabilities.firesTouchEvents)){var Y=Uc(z);if(!(Y.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!Y.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ut=Date.now();ut-h<=ne?(b++,b===2&&a(Jt(z))):b=1,h=ut}}}return i.addEventListener("click",A),{dblclick:a,simDblclick:A}}function on(i,a){i.removeEventListener("dblclick",a.dblclick),i.removeEventListener("click",a.simDblclick)}var Pe=so(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),an=so(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ye=an==="webkitTransition"||an==="OTransition"?an+"End":"transitionend";function ie(i){return typeof i=="string"?document.getElementById(i):i}function ri(i,a){var h=i.style[a]||i.currentStyle&&i.currentStyle[a];if((!h||h==="auto")&&document.defaultView){var b=document.defaultView.getComputedStyle(i,null);h=b?b[a]:null}return h==="auto"?null:h}function Xt(i,a,h){var b=document.createElement(i);return b.className=a||"",h&&h.appendChild(b),b}function fe(i){var a=i.parentNode;a&&a.removeChild(i)}function Bi(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function Ln(i){var a=i.parentNode;a&&a.lastChild!==i&&a.appendChild(i)}function Yn(i){var a=i.parentNode;a&&a.firstChild!==i&&a.insertBefore(i,a.firstChild)}function ke(i,a){if(i.classList!==void 0)return i.classList.contains(a);var h=yi(i);return h.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(h)}function Yt(i,a){if(i.classList!==void 0)for(var h=x(a),b=0,A=h.length;b<A;b++)i.classList.add(h[b]);else if(!ke(i,a)){var z=yi(i);tn(i,(z?z+" ":"")+a)}}function be(i,a){i.classList!==void 0?i.classList.remove(a):tn(i,m((" "+yi(i)+" ").replace(" "+a+" "," ")))}function tn(i,a){i.className.baseVal===void 0?i.className=a:i.className.baseVal=a}function yi(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function mn(i,a){"opacity"in i.style?i.style.opacity=a:"filter"in i.style&&ro(i,a)}function ro(i,a){var h=!1,b="DXImageTransform.Microsoft.Alpha";try{h=i.filters.item(b)}catch{if(a===1)return}a=Math.round(a*100),h?(h.Enabled=a!==100,h.Opacity=a):i.style.filter+=" progid:"+b+"(opacity="+a+")"}function so(i){for(var a=document.documentElement.style,h=0;h<i.length;h++)if(i[h]in a)return i[h];return!1}function Fi(i,a,h){var b=a||new j(0,0);i.style[Pe]=(Wt.ie3d?"translate("+b.x+"px,"+b.y+"px)":"translate3d("+b.x+"px,"+b.y+"px,0)")+(h?" scale("+h+")":"")}function ze(i,a){i._leaflet_pos=a,Wt.any3d?Fi(i,a):(i.style.left=a.x+"px",i.style.top=a.y+"px")}function Hi(i){return i._leaflet_pos||new j(0,0)}var ds,fs,Pa;if("onselectstart"in document)ds=function(){se(window,"selectstart",Ke)},fs=function(){xe(window,"selectstart",Ke)};else{var ps=so(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);ds=function(){if(ps){var i=document.documentElement.style;Pa=i[ps],i[ps]="none"}},fs=function(){ps&&(document.documentElement.style[ps]=Pa,Pa=void 0)}}function Ra(){se(window,"dragstart",Ke)}function Ia(){xe(window,"dragstart",Ke)}var oo,Da;function Na(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(ao(),oo=i,Da=i.style.outlineStyle,i.style.outlineStyle="none",se(window,"keydown",ao))}function ao(){oo&&(oo.style.outlineStyle=Da,oo=void 0,Da=void 0,xe(window,"keydown",ao))}function Nc(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function Oa(i){var a=i.getBoundingClientRect();return{x:a.width/i.offsetWidth||1,y:a.height/i.offsetHeight||1,boundingClientRect:a}}var rp={__proto__:null,TRANSFORM:Pe,TRANSITION:an,TRANSITION_END:ye,get:ie,getStyle:ri,create:Xt,remove:fe,empty:Bi,toFront:Ln,toBack:Yn,hasClass:ke,addClass:Yt,removeClass:be,setClass:tn,getClass:yi,setOpacity:mn,testProp:so,setTransform:Fi,setPosition:ze,getPosition:Hi,get disableTextSelection(){return ds},get enableTextSelection(){return fs},disableImageDrag:Ra,enableImageDrag:Ia,preventOutline:Na,restoreOutline:ao,getSizedParentNode:Nc,getScale:Oa};function se(i,a,h,b){if(a&&typeof a=="object")for(var A in a)ka(i,A,a[A],h);else{a=x(a);for(var z=0,Y=a.length;z<Y;z++)ka(i,a[z],h,b)}return this}var $n="_leaflet_events";function xe(i,a,h,b){if(arguments.length===1)Oc(i),delete i[$n];else if(a&&typeof a=="object")for(var A in a)za(i,A,a[A],h);else if(a=x(a),arguments.length===2)Oc(i,function(ut){return E(a,ut)!==-1});else for(var z=0,Y=a.length;z<Y;z++)za(i,a[z],h,b);return this}function Oc(i,a){for(var h in i[$n]){var b=h.split(/\d/)[0];(!a||a(b))&&za(i,b,null,null,h)}}var Ua={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function ka(i,a,h,b){var A=a+u(h)+(b?"_"+u(b):"");if(i[$n]&&i[$n][A])return this;var z=function(ut){return h.call(b||i,ut||window.event)},Y=z;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?z=gt(i,a,z):Wt.touch&&a==="dblclick"?z=Ae(i,z):"addEventListener"in i?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?i.addEventListener(Ua[a]||a,z,Wt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(z=function(ut){ut=ut||window.event,Fa(i,ut)&&Y(ut)},i.addEventListener(Ua[a],z,!1)):i.addEventListener(a,Y,!1):i.attachEvent("on"+a,z),i[$n]=i[$n]||{},i[$n][A]=z}function za(i,a,h,b,A){A=A||a+u(h)+(b?"_"+u(b):"");var z=i[$n]&&i[$n][A];if(!z)return this;!Wt.touchNative&&Wt.pointer&&a.indexOf("touch")===0?_t(i,a,z):Wt.touch&&a==="dblclick"?on(i,z):"removeEventListener"in i?i.removeEventListener(Ua[a]||a,z,!1):i.detachEvent("on"+a,z),i[$n][A]=null}function Vi(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function Ba(i){return ka(i,"wheel",Vi),this}function ms(i){return se(i,"mousedown touchstart dblclick contextmenu",Vi),i._leaflet_disable_click=!0,this}function Ke(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function Gi(i){return Ke(i),Vi(i),this}function Uc(i){if(i.composedPath)return i.composedPath();for(var a=[],h=i.target;h;)a.push(h),h=h.parentNode;return a}function kc(i,a){if(!a)return new j(i.clientX,i.clientY);var h=Oa(a),b=h.boundingClientRect;return new j((i.clientX-b.left)/h.x-a.clientLeft,(i.clientY-b.top)/h.y-a.clientTop)}var sp=Wt.linux&&Wt.chrome?window.devicePixelRatio:Wt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function zc(i){return Wt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/sp:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function Fa(i,a){var h=a.relatedTarget;if(!h)return!0;try{for(;h&&h!==i;)h=h.parentNode}catch{return!1}return h!==i}var op={__proto__:null,on:se,off:xe,stopPropagation:Vi,disableScrollPropagation:Ba,disableClickPropagation:ms,preventDefault:Ke,stop:Gi,getPropagationPath:Uc,getMousePosition:kc,getWheelDelta:zc,isExternalTarget:Fa,addListener:se,removeListener:xe},Bc=ot.extend({run:function(i,a,h,b){this.stop(),this._el=i,this._inProgress=!0,this._duration=h||.25,this._easeOutPower=1/Math.max(b||.5,.2),this._startPos=Hi(i),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=W(this._animate,this),this._step()},_step:function(i){var a=+new Date-this._startTime,h=this._duration*1e3;a<h?this._runFrame(this._easeOut(a/h),i):(this._runFrame(1),this._complete())},_runFrame:function(i,a){var h=this._startPos.add(this._offset.multiplyBy(i));a&&h._round(),ze(this._el,h),this.fire("step")},_complete:function(){k(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),de=ot.extend({options:{crs:xt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,a){a=y(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(wt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=an&&Wt.any3d&&!Wt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),se(this._proxy,ye,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,a,h){if(a=a===void 0?this._zoom:this._limitZoom(a),i=this._limitCenter(wt(i),a,this.options.maxBounds),h=h||{},this._stop(),this._loaded&&!h.reset&&h!==!0){h.animate!==void 0&&(h.zoom=s({animate:h.animate},h.zoom),h.pan=s({animate:h.animate,duration:h.duration},h.pan));var b=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,a,h.zoom):this._tryAnimatedPan(i,h.pan);if(b)return clearTimeout(this._sizeTimer),this}return this._resetView(i,a,h.pan&&h.pan.noMoveStart),this},setZoom:function(i,a){return this._loaded?this.setView(this.getCenter(),i,{zoom:a}):(this._zoom=i,this)},zoomIn:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,a)},zoomOut:function(i,a){return i=i||(Wt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,a)},setZoomAround:function(i,a,h){var b=this.getZoomScale(a),A=this.getSize().divideBy(2),z=i instanceof j?i:this.latLngToContainerPoint(i),Y=z.subtract(A).multiplyBy(1-1/b),ut=this.containerPointToLatLng(A.add(Y));return this.setView(ut,a,{zoom:h})},_getBoundsCenterZoom:function(i,a){a=a||{},i=i.getBounds?i.getBounds():Q(i);var h=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),A=this.getBoundsZoom(i,!1,h.add(b));if(A=typeof a.maxZoom=="number"?Math.min(a.maxZoom,A):A,A===1/0)return{center:i.getCenter(),zoom:A};var z=b.subtract(h).divideBy(2),Y=this.project(i.getSouthWest(),A),ut=this.project(i.getNorthEast(),A),mt=this.unproject(Y.add(ut).divideBy(2).add(z),A);return{center:mt,zoom:A}},fitBounds:function(i,a){if(i=Q(i),!i.isValid())throw new Error("Bounds are not valid.");var h=this._getBoundsCenterZoom(i,a);return this.setView(h.center,h.zoom,a)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,a){return this.setView(i,this._zoom,{pan:a})},panBy:function(i,a){if(i=at(i).round(),a=a||{},!i.x&&!i.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Bc,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){Yt(this._mapPane,"leaflet-pan-anim");var h=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,h,a.duration||.25,a.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,a,h){if(h=h||{},h.animate===!1||!Wt.any3d)return this.setView(i,a,h);this._stop();var b=this.project(this.getCenter()),A=this.project(i),z=this.getSize(),Y=this._zoom;i=wt(i),a=a===void 0?Y:a;var ut=Math.max(z.x,z.y),mt=ut*this.getZoomScale(Y,a),Ct=A.distanceTo(b)||1,Bt=1.42,$t=Bt*Bt;function he(Be){var xo=Be?-1:1,jp=Be?mt:ut,Yp=mt*mt-ut*ut+xo*$t*$t*Ct*Ct,$p=2*jp*$t*Ct,Ka=Yp/$p,yu=Math.sqrt(Ka*Ka+1)-Ka,Kp=yu<1e-9?-18:Math.log(yu);return Kp}function ln(Be){return(Math.exp(Be)-Math.exp(-Be))/2}function We(Be){return(Math.exp(Be)+Math.exp(-Be))/2}function Rn(Be){return ln(Be)/We(Be)}var gn=he(0);function vr(Be){return ut*(We(gn)/We(gn+Bt*Be))}function Wp(Be){return ut*(We(gn)*Rn(gn+Bt*Be)-ln(gn))/$t}function Zp(Be){return 1-Math.pow(1-Be,1.5)}var Xp=Date.now(),_u=(he(1)-gn)/Bt,qp=h.duration?1e3*h.duration:1e3*_u*.8;function vu(){var Be=(Date.now()-Xp)/qp,xo=Zp(Be)*_u;Be<=1?(this._flyToFrame=W(vu,this),this._move(this.unproject(b.add(A.subtract(b).multiplyBy(Wp(xo)/Ct)),Y),this.getScaleZoom(ut/vr(xo),Y),{flyTo:!0})):this._move(i,a)._moveEnd(!0)}return this._moveStart(!0,h.noMoveStart),vu.call(this),this},flyToBounds:function(i,a){var h=this._getBoundsCenterZoom(i,a);return this.flyTo(h.center,h.zoom,a)},setMaxBounds:function(i){return i=Q(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var a=this.options.minZoom;return this.options.minZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var a=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,a){this._enforcingBounds=!0;var h=this.getCenter(),b=this._limitCenter(h,this._zoom,Q(i));return h.equals(b)||this.panTo(b,a),this._enforcingBounds=!1,this},panInside:function(i,a){a=a||{};var h=at(a.paddingTopLeft||a.padding||[0,0]),b=at(a.paddingBottomRight||a.padding||[0,0]),A=this.project(this.getCenter()),z=this.project(i),Y=this.getPixelBounds(),ut=tt([Y.min.add(h),Y.max.subtract(b)]),mt=ut.getSize();if(!ut.contains(z)){this._enforcingBounds=!0;var Ct=z.subtract(ut.getCenter()),Bt=ut.extend(z).getSize().subtract(mt);A.x+=Ct.x<0?-Bt.x:Bt.x,A.y+=Ct.y<0?-Bt.y:Bt.y,this.panTo(this.unproject(A),a),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=s({animate:!1,pan:!0},i===!0?{animate:!0}:i);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var h=this.getSize(),b=a.divideBy(2).round(),A=h.divideBy(2).round(),z=b.subtract(A);return!z.x&&!z.y?this:(i.animate&&i.pan?this.panBy(z):(i.pan&&this._rawPanBy(z),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:h}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=s({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),h=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,h,i):navigator.geolocation.getCurrentPosition(a,h,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var a=i.code,h=i.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+h+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var a=i.coords.latitude,h=i.coords.longitude,b=new it(a,h),A=b.toBounds(i.coords.accuracy*2),z=this._locateOptions;if(z.setView){var Y=this.getBoundsZoom(A);this.setView(b,z.maxZoom?Math.min(Y,z.maxZoom):Y)}var ut={latlng:b,bounds:A,timestamp:i.timestamp};for(var mt in i.coords)typeof i.coords[mt]=="number"&&(ut[mt]=i.coords[mt]);this.fire("locationfound",ut)}},addHandler:function(i,a){if(!a)return this;var h=this[i]=new a(this);return this._handlers.push(h),this.options[i]&&h.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),fe(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(k(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)fe(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,a){var h="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),b=Xt("div",h,a||this._mapPane);return i&&(this._panes[i]=b),b},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),a=this.unproject(i.getBottomLeft()),h=this.unproject(i.getTopRight());return new Lt(a,h)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,a,h){i=Q(i),h=at(h||[0,0]);var b=this.getZoom()||0,A=this.getMinZoom(),z=this.getMaxZoom(),Y=i.getNorthWest(),ut=i.getSouthEast(),mt=this.getSize().subtract(h),Ct=tt(this.project(ut,b),this.project(Y,b)).getSize(),Bt=Wt.any3d?this.options.zoomSnap:1,$t=mt.x/Ct.x,he=mt.y/Ct.y,ln=a?Math.max($t,he):Math.min($t,he);return b=this.getScaleZoom(ln,b),Bt&&(b=Math.round(b/(Bt/100))*(Bt/100),b=a?Math.ceil(b/Bt)*Bt:Math.floor(b/Bt)*Bt),Math.max(A,Math.min(z,b))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new j(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,a){var h=this._getTopLeftPoint(i,a);return new q(h,h.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,a){var h=this.options.crs;return a=a===void 0?this._zoom:a,h.scale(i)/h.scale(a)},getScaleZoom:function(i,a){var h=this.options.crs;a=a===void 0?this._zoom:a;var b=h.zoom(i*h.scale(a));return isNaN(b)?1/0:b},project:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(wt(i),a)},unproject:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(at(i),a)},layerPointToLatLng:function(i){var a=at(i).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(i){var a=this.project(wt(i))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(wt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(Q(i))},distance:function(i,a){return this.options.crs.distance(wt(i),wt(a))},containerPointToLayerPoint:function(i){return at(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return at(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var a=this.containerPointToLayerPoint(at(i));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(wt(i)))},mouseEventToContainerPoint:function(i){return kc(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var a=this._container=ie(i);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");se(a,"scroll",this._onScroll,this),this._containerId=u(a)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Wt.any3d,Yt(i,"leaflet-container"+(Wt.touch?" leaflet-touch":"")+(Wt.retina?" leaflet-retina":"")+(Wt.ielt9?" leaflet-oldie":"")+(Wt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=ri(i,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),ze(this._mapPane,new j(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Yt(i.markerPane,"leaflet-zoom-hide"),Yt(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,a,h){ze(this._mapPane,new j(0,0));var b=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var A=this._zoom!==a;this._moveStart(A,h)._move(i,a)._moveEnd(A),this.fire("viewreset"),b&&this.fire("load")},_moveStart:function(i,a){return i&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(i,a,h,b){a===void 0&&(a=this._zoom);var A=this._zoom!==a;return this._zoom=a,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),b?h&&h.pinch&&this.fire("zoom",h):((A||h&&h.pinch)&&this.fire("zoom",h),this.fire("move",h)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return k(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){ze(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[u(this._container)]=this;var a=i?xe:se;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Wt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){k(this._resizeRequest),this._resizeRequest=W(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,a){for(var h=[],b,A=a==="mouseout"||a==="mouseover",z=i.target||i.srcElement,Y=!1;z;){if(b=this._targets[u(z)],b&&(a==="click"||a==="preclick")&&this._draggableMoved(b)){Y=!0;break}if(b&&b.listens(a,!0)&&(A&&!Fa(z,i)||(h.push(b),A))||z===this._container)break;z=z.parentNode}return!h.length&&!Y&&!A&&this.listens(a,!0)&&(h=[this]),h},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var a=i.target||i.srcElement;if(!(!this._loaded||a._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(a))){var h=i.type;h==="mousedown"&&Na(a),this._fireDOMEvent(i,h)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,a,h){if(i.type==="click"){var b=s({},i);b.type="preclick",this._fireDOMEvent(b,b.type,h)}var A=this._findEventTargets(i,a);if(h){for(var z=[],Y=0;Y<h.length;Y++)h[Y].listens(a,!0)&&z.push(h[Y]);A=z.concat(A)}if(A.length){a==="contextmenu"&&Ke(i);var ut=A[0],mt={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var Ct=ut.getLatLng&&(!ut._radius||ut._radius<=10);mt.containerPoint=Ct?this.latLngToContainerPoint(ut.getLatLng()):this.mouseEventToContainerPoint(i),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=Ct?ut.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for(Y=0;Y<A.length;Y++)if(A[Y].fire(a,mt,!0),mt.originalEvent._stopped||A[Y].options.bubblingMouseEvents===!1&&E(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,a=this._handlers.length;i<a;i++)this._handlers[i].disable()},whenReady:function(i,a){return this._loaded?i.call(a||this,{target:this}):this.on("load",i,a),this},_getMapPanePos:function(){return Hi(this._mapPane)||new j(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,a){var h=i&&a!==void 0?this._getNewPixelOrigin(i,a):this.getPixelOrigin();return h.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,a){var h=this.getSize()._divideBy(2);return this.project(i,a)._subtract(h)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,a,h){var b=this._getNewPixelOrigin(h,a);return this.project(i,a)._subtract(b)},_latLngBoundsToNewLayerBounds:function(i,a,h){var b=this._getNewPixelOrigin(h,a);return tt([this.project(i.getSouthWest(),a)._subtract(b),this.project(i.getNorthWest(),a)._subtract(b),this.project(i.getSouthEast(),a)._subtract(b),this.project(i.getNorthEast(),a)._subtract(b)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,a,h){if(!h)return i;var b=this.project(i,a),A=this.getSize().divideBy(2),z=new q(b.subtract(A),b.add(A)),Y=this._getBoundsOffset(z,h,a);return Math.abs(Y.x)<=1&&Math.abs(Y.y)<=1?i:this.unproject(b.add(Y),a)},_limitOffset:function(i,a){if(!a)return i;var h=this.getPixelBounds(),b=new q(h.min.add(i),h.max.add(i));return i.add(this._getBoundsOffset(b,a))},_getBoundsOffset:function(i,a,h){var b=tt(this.project(a.getNorthEast(),h),this.project(a.getSouthWest(),h)),A=b.min.subtract(i.min),z=b.max.subtract(i.max),Y=this._rebound(A.x,-z.x),ut=this._rebound(A.y,-z.y);return new j(Y,ut)},_rebound:function(i,a){return i+a>0?Math.round(i-a)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(a))},_limitZoom:function(i){var a=this.getMinZoom(),h=this.getMaxZoom(),b=Wt.any3d?this.options.zoomSnap:1;return b&&(i=Math.round(i/b)*b),Math.max(a,Math.min(h,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){be(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,a){var h=this._getCenterOffset(i)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(h)?!1:(this.panBy(h,a),!0)},_createAnimProxy:function(){var i=this._proxy=Xt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(a){var h=Pe,b=this._proxy.style[h];Fi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),b===this._proxy.style[h]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){fe(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),a=this.getZoom();Fi(this._proxy,this.project(i,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,a,h){if(this._animatingZoom)return!0;if(h=h||{},!this._zoomAnimated||h.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var b=this.getZoomScale(a),A=this._getCenterOffset(i)._divideBy(1-1/b);return h.animate!==!0&&!this.getSize().contains(A)?!1:(W(function(){this._moveStart(!0,h.noMoveStart||!1)._animateZoom(i,a,!0)},this),!0)},_animateZoom:function(i,a,h,b){this._mapPane&&(h&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=a,Yt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:a,noUpdate:b}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&be(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function ap(i,a){return new de(i,a)}var Un=P.extend({options:{position:"topright"},initialize:function(i){y(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var a=this._map;return a&&a.removeControl(this),this.options.position=i,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var a=this._container=this.onAdd(i),h=this.getPosition(),b=i._controlCorners[h];return Yt(a,"leaflet-control"),h.indexOf("bottom")!==-1?b.insertBefore(a,b.firstChild):b.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(fe(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),gs=function(i){return new Un(i)};de.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},a="leaflet-",h=this._controlContainer=Xt("div",a+"control-container",this._container);function b(A,z){var Y=a+A+" "+a+z;i[A+z]=Xt("div",Y,h)}b("top","left"),b("top","right"),b("bottom","left"),b("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)fe(this._controlCorners[i]);fe(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var Fc=Un.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,a,h,b){return h<b?-1:b<h?1:0}},initialize:function(i,a,h){y(this,h),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var b in i)this._addLayer(i[b],b);for(b in a)this._addLayer(a[b],b,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return Un.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,a){return this._addLayer(i,a),this._map?this._update():this},addOverlay:function(i,a){return this._addLayer(i,a,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var a=this._getLayer(u(i));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){Yt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?(Yt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):be(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return be(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",a=this._container=Xt("div",i),h=this.options.collapsed;a.setAttribute("aria-haspopup",!0),ms(a),Ba(a);var b=this._section=Xt("section",i+"-list");h&&(this._map.on("click",this.collapse,this),se(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var A=this._layersLink=Xt("a",i+"-toggle",a);A.href="#",A.title="Layers",A.setAttribute("role","button"),se(A,{keydown:function(z){z.keyCode===13&&this._expandSafely()},click:function(z){Ke(z),this._expandSafely()}},this),h||this.expand(),this._baseLayersList=Xt("div",i+"-base",b),this._separator=Xt("div",i+"-separator",b),this._overlaysList=Xt("div",i+"-overlays",b),a.appendChild(b)},_getLayer:function(i){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&u(this._layers[a].layer)===i)return this._layers[a]},_addLayer:function(i,a,h){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:a,overlay:h}),this.options.sortLayers&&this._layers.sort(l(function(b,A){return this.options.sortFunction(b.layer,A.layer,b.name,A.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Bi(this._baseLayersList),Bi(this._overlaysList),this._layerControlInputs=[];var i,a,h,b,A=0;for(h=0;h<this._layers.length;h++)b=this._layers[h],this._addItem(b),a=a||b.overlay,i=i||!b.overlay,A+=b.overlay?0:1;return this.options.hideSingleBase&&(i=i&&A>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=a&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var a=this._getLayer(u(i.target)),h=a.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;h&&this._map.fire(h,a)},_createRadioElement:function(i,a){var h='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(a?' checked="checked"':"")+"/>",b=document.createElement("div");return b.innerHTML=h,b.firstChild},_addItem:function(i){var a=document.createElement("label"),h=this._map.hasLayer(i.layer),b;i.overlay?(b=document.createElement("input"),b.type="checkbox",b.className="leaflet-control-layers-selector",b.defaultChecked=h):b=this._createRadioElement("leaflet-base-layers_"+u(this),h),this._layerControlInputs.push(b),b.layerId=u(i.layer),se(b,"click",this._onInputClick,this);var A=document.createElement("span");A.innerHTML=" "+i.name;var z=document.createElement("span");a.appendChild(z),z.appendChild(b),z.appendChild(A);var Y=i.overlay?this._overlaysList:this._baseLayersList;return Y.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,a,h,b=[],A=[];this._handlingClick=!0;for(var z=i.length-1;z>=0;z--)a=i[z],h=this._getLayer(a.layerId).layer,a.checked?b.push(h):a.checked||A.push(h);for(z=0;z<A.length;z++)this._map.hasLayer(A[z])&&this._map.removeLayer(A[z]);for(z=0;z<b.length;z++)this._map.hasLayer(b[z])||this._map.addLayer(b[z]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,a,h,b=this._map.getZoom(),A=i.length-1;A>=0;A--)a=i[A],h=this._getLayer(a.layerId).layer,a.disabled=h.options.minZoom!==void 0&&b<h.options.minZoom||h.options.maxZoom!==void 0&&b>h.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,se(i,"click",Ke),this.expand();var a=this;setTimeout(function(){xe(i,"click",Ke),a._preventClick=!1})}}),lp=function(i,a,h){return new Fc(i,a,h)},Ha=Un.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var a="leaflet-control-zoom",h=Xt("div",a+" leaflet-bar"),b=this.options;return this._zoomInButton=this._createButton(b.zoomInText,b.zoomInTitle,a+"-in",h,this._zoomIn),this._zoomOutButton=this._createButton(b.zoomOutText,b.zoomOutTitle,a+"-out",h,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),h},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,a,h,b,A){var z=Xt("a",h,b);return z.innerHTML=i,z.href="#",z.title=a,z.setAttribute("role","button"),z.setAttribute("aria-label",a),ms(z),se(z,"click",Gi),se(z,"click",A,this),se(z,"click",this._refocusOnMap,this),z},_updateDisabled:function(){var i=this._map,a="leaflet-disabled";be(this._zoomInButton,a),be(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&(Yt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&(Yt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});de.mergeOptions({zoomControl:!0}),de.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Ha,this.addControl(this.zoomControl))});var cp=function(i){return new Ha(i)},Hc=Un.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var a="leaflet-control-scale",h=Xt("div",a),b=this.options;return this._addScales(b,a+"-line",h),i.on(b.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),h},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,a,h){i.metric&&(this._mScale=Xt("div",a,h)),i.imperial&&(this._iScale=Xt("div",a,h))},_update:function(){var i=this._map,a=i.getSize().y/2,h=i.distance(i.containerPointToLatLng([0,a]),i.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(h)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var a=this._getRoundNum(i),h=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,h,a/i)},_updateImperial:function(i){var a=i*3.2808399,h,b,A;a>5280?(h=a/5280,b=this._getRoundNum(h),this._updateScale(this._iScale,b+" mi",b/h)):(A=this._getRoundNum(a),this._updateScale(this._iScale,A+" ft",A/a))},_updateScale:function(i,a,h){i.style.width=Math.round(this.options.maxWidth*h)+"px",i.innerHTML=a},_getRoundNum:function(i){var a=Math.pow(10,(Math.floor(i)+"").length-1),h=i/a;return h=h>=10?10:h>=5?5:h>=3?3:h>=2?2:1,a*h}}),up=function(i){return new Hc(i)},hp='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',Va=Un.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Wt.inlineSvg?hp+" ":"")+"Leaflet</a>"},initialize:function(i){y(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Xt("div","leaflet-control-attribution"),ms(this._container);for(var a in i._layers)i._layers[a].getAttribution&&this.addAttribution(i._layers[a].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var a in this._attributions)this._attributions[a]&&i.push(a);var h=[];this.options.prefix&&h.push(this.options.prefix),i.length&&h.push(i.join(", ")),this._container.innerHTML=h.join(' <span aria-hidden="true">|</span> ')}}});de.mergeOptions({attributionControl:!0}),de.addInitHook(function(){this.options.attributionControl&&new Va().addTo(this)});var dp=function(i){return new Va(i)};Un.Layers=Fc,Un.Zoom=Ha,Un.Scale=Hc,Un.Attribution=Va,gs.layers=lp,gs.zoom=cp,gs.scale=up,gs.attribution=dp;var Kn=P.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});Kn.addTo=function(i,a){return i.addHandler(a,this),this};var fp={Events:nt},Vc=Wt.touch?"touchstart mousedown":"mousedown",xi=ot.extend({options:{clickTolerance:3},initialize:function(i,a,h,b){y(this,b),this._element=i,this._dragStartTarget=a||i,this._preventOutline=h},enable:function(){this._enabled||(se(this._dragStartTarget,Vc,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(xi._dragging===this&&this.finishDrag(!0),xe(this._dragStartTarget,Vc,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!ke(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){xi._dragging===this&&this.finishDrag();return}if(!(xi._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(xi._dragging=this,this._preventOutline&&Na(this._element),Ra(),ds(),!this._moving)){this.fire("down");var a=i.touches?i.touches[0]:i,h=Nc(this._element);this._startPoint=new j(a.clientX,a.clientY),this._startPos=Hi(this._element),this._parentScale=Oa(h);var b=i.type==="mousedown";se(document,b?"mousemove":"touchmove",this._onMove,this),se(document,b?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var a=i.touches&&i.touches.length===1?i.touches[0]:i,h=new j(a.clientX,a.clientY)._subtract(this._startPoint);!h.x&&!h.y||Math.abs(h.x)+Math.abs(h.y)<this.options.clickTolerance||(h.x/=this._parentScale.x,h.y/=this._parentScale.y,Ke(i),this._moved||(this.fire("dragstart"),this._moved=!0,Yt(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Yt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(h),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),ze(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){be(document.body,"leaflet-dragging"),this._lastTarget&&(be(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),xe(document,"mousemove touchmove",this._onMove,this),xe(document,"mouseup touchend touchcancel",this._onUp,this),Ia(),fs();var a=this._moved&&this._moving;this._moving=!1,xi._dragging=!1,a&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function Gc(i,a,h){var b,A=[1,4,2,8],z,Y,ut,mt,Ct,Bt,$t,he;for(z=0,Bt=i.length;z<Bt;z++)i[z]._code=Wi(i[z],a);for(ut=0;ut<4;ut++){for($t=A[ut],b=[],z=0,Bt=i.length,Y=Bt-1;z<Bt;Y=z++)mt=i[z],Ct=i[Y],mt._code&$t?Ct._code&$t||(he=lo(Ct,mt,$t,a,h),he._code=Wi(he,a),b.push(he)):(Ct._code&$t&&(he=lo(Ct,mt,$t,a,h),he._code=Wi(he,a),b.push(he)),b.push(mt));i=b}return i}function Wc(i,a){var h,b,A,z,Y,ut,mt,Ct,Bt;if(!i||i.length===0)throw new Error("latlngs not passed");Pn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var $t=wt([0,0]),he=Q(i),ln=he.getNorthWest().distanceTo(he.getSouthWest())*he.getNorthEast().distanceTo(he.getNorthWest());ln<1700&&($t=Ga(i));var We=i.length,Rn=[];for(h=0;h<We;h++){var gn=wt(i[h]);Rn.push(a.project(wt([gn.lat-$t.lat,gn.lng-$t.lng])))}for(ut=mt=Ct=0,h=0,b=We-1;h<We;b=h++)A=Rn[h],z=Rn[b],Y=A.y*z.x-z.y*A.x,mt+=(A.x+z.x)*Y,Ct+=(A.y+z.y)*Y,ut+=Y*3;ut===0?Bt=Rn[0]:Bt=[mt/ut,Ct/ut];var vr=a.unproject(at(Bt));return wt([vr.lat+$t.lat,vr.lng+$t.lng])}function Ga(i){for(var a=0,h=0,b=0,A=0;A<i.length;A++){var z=wt(i[A]);a+=z.lat,h+=z.lng,b++}return wt([a/b,h/b])}var pp={__proto__:null,clipPolygon:Gc,polygonCenter:Wc,centroid:Ga};function Zc(i,a){if(!a||!i.length)return i.slice();var h=a*a;return i=_p(i,h),i=gp(i,h),i}function Xc(i,a,h){return Math.sqrt(_s(i,a,h,!0))}function mp(i,a,h){return _s(i,a,h)}function gp(i,a){var h=i.length,b=typeof Uint8Array<"u"?Uint8Array:Array,A=new b(h);A[0]=A[h-1]=1,Wa(i,A,a,0,h-1);var z,Y=[];for(z=0;z<h;z++)A[z]&&Y.push(i[z]);return Y}function Wa(i,a,h,b,A){var z=0,Y,ut,mt;for(ut=b+1;ut<=A-1;ut++)mt=_s(i[ut],i[b],i[A],!0),mt>z&&(Y=ut,z=mt);z>h&&(a[Y]=1,Wa(i,a,h,b,Y),Wa(i,a,h,Y,A))}function _p(i,a){for(var h=[i[0]],b=1,A=0,z=i.length;b<z;b++)vp(i[b],i[A])>a&&(h.push(i[b]),A=b);return A<z-1&&h.push(i[z-1]),h}var qc;function jc(i,a,h,b,A){var z=b?qc:Wi(i,h),Y=Wi(a,h),ut,mt,Ct;for(qc=Y;;){if(!(z|Y))return[i,a];if(z&Y)return!1;ut=z||Y,mt=lo(i,a,ut,h,A),Ct=Wi(mt,h),ut===z?(i=mt,z=Ct):(a=mt,Y=Ct)}}function lo(i,a,h,b,A){var z=a.x-i.x,Y=a.y-i.y,ut=b.min,mt=b.max,Ct,Bt;return h&8?(Ct=i.x+z*(mt.y-i.y)/Y,Bt=mt.y):h&4?(Ct=i.x+z*(ut.y-i.y)/Y,Bt=ut.y):h&2?(Ct=mt.x,Bt=i.y+Y*(mt.x-i.x)/z):h&1&&(Ct=ut.x,Bt=i.y+Y*(ut.x-i.x)/z),new j(Ct,Bt,A)}function Wi(i,a){var h=0;return i.x<a.min.x?h|=1:i.x>a.max.x&&(h|=2),i.y<a.min.y?h|=4:i.y>a.max.y&&(h|=8),h}function vp(i,a){var h=a.x-i.x,b=a.y-i.y;return h*h+b*b}function _s(i,a,h,b){var A=a.x,z=a.y,Y=h.x-A,ut=h.y-z,mt=Y*Y+ut*ut,Ct;return mt>0&&(Ct=((i.x-A)*Y+(i.y-z)*ut)/mt,Ct>1?(A=h.x,z=h.y):Ct>0&&(A+=Y*Ct,z+=ut*Ct)),Y=i.x-A,ut=i.y-z,b?Y*Y+ut*ut:new j(A,z)}function Pn(i){return!w(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function Yc(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Pn(i)}function $c(i,a){var h,b,A,z,Y,ut,mt,Ct;if(!i||i.length===0)throw new Error("latlngs not passed");Pn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var Bt=wt([0,0]),$t=Q(i),he=$t.getNorthWest().distanceTo($t.getSouthWest())*$t.getNorthEast().distanceTo($t.getNorthWest());he<1700&&(Bt=Ga(i));var ln=i.length,We=[];for(h=0;h<ln;h++){var Rn=wt(i[h]);We.push(a.project(wt([Rn.lat-Bt.lat,Rn.lng-Bt.lng])))}for(h=0,b=0;h<ln-1;h++)b+=We[h].distanceTo(We[h+1])/2;if(b===0)Ct=We[0];else for(h=0,z=0;h<ln-1;h++)if(Y=We[h],ut=We[h+1],A=Y.distanceTo(ut),z+=A,z>b){mt=(z-b)/A,Ct=[ut.x-mt*(ut.x-Y.x),ut.y-mt*(ut.y-Y.y)];break}var gn=a.unproject(at(Ct));return wt([gn.lat+Bt.lat,gn.lng+Bt.lng])}var yp={__proto__:null,simplify:Zc,pointToSegmentDistance:Xc,closestPointOnSegment:mp,clipSegment:jc,_getEdgeIntersection:lo,_getBitCode:Wi,_sqClosestPointOnSegment:_s,isFlat:Pn,_flat:Yc,polylineCenter:$c},Za={project:function(i){return new j(i.lng,i.lat)},unproject:function(i){return new it(i.y,i.x)},bounds:new q([-180,-90],[180,90])},Xa={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var a=Math.PI/180,h=this.R,b=i.lat*a,A=this.R_MINOR/h,z=Math.sqrt(1-A*A),Y=z*Math.sin(b),ut=Math.tan(Math.PI/4-b/2)/Math.pow((1-Y)/(1+Y),z/2);return b=-h*Math.log(Math.max(ut,1e-10)),new j(i.lng*a*h,b)},unproject:function(i){for(var a=180/Math.PI,h=this.R,b=this.R_MINOR/h,A=Math.sqrt(1-b*b),z=Math.exp(-i.y/h),Y=Math.PI/2-2*Math.atan(z),ut=0,mt=.1,Ct;ut<15&&Math.abs(mt)>1e-7;ut++)Ct=A*Math.sin(Y),Ct=Math.pow((1-Ct)/(1+Ct),A/2),mt=Math.PI/2-2*Math.atan(z*Ct)-Y,Y+=mt;return new it(Y*a,i.x*a/h)}},xp={__proto__:null,LonLat:Za,Mercator:Xa,SphericalMercator:kt},bp=s({},Pt,{code:"EPSG:3395",projection:Xa,transformation:function(){var i=.5/(Math.PI*Xa.R);return yt(i,.5,-i,.5)}()}),Kc=s({},Pt,{code:"EPSG:4326",projection:Za,transformation:yt(1/180,1,-1/180,.5)}),wp=s({},St,{projection:Za,transformation:yt(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,a){var h=a.lng-i.lng,b=a.lat-i.lat;return Math.sqrt(h*h+b*b)},infinite:!0});St.Earth=Pt,St.EPSG3395=bp,St.EPSG3857=xt,St.EPSG900913=T,St.EPSG4326=Kc,St.Simple=wp;var kn=ot.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[u(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[u(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var a=i.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var h=this.getEvents();a.on(h,this),this.once("remove",function(){a.off(h,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});de.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var a=u(i);return this._layers[a]?this:(this._layers[a]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var a=u(i);return this._layers[a]?(this._loaded&&i.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return u(i)in this._layers},eachLayer:function(i,a){for(var h in this._layers)i.call(a,this._layers[h]);return this},_addLayers:function(i){i=i?w(i)?i:[i]:[];for(var a=0,h=i.length;a<h;a++)this.addLayer(i[a])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[u(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var a=u(i);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,a=-1/0,h=this._getZoomSpan();for(var b in this._zoomBoundLayers){var A=this._zoomBoundLayers[b].options;i=A.minZoom===void 0?i:Math.min(i,A.minZoom),a=A.maxZoom===void 0?a:Math.max(a,A.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=i===1/0?void 0:i,h!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var fr=kn.extend({initialize:function(i,a){y(this,a),this._layers={};var h,b;if(i)for(h=0,b=i.length;h<b;h++)this.addLayer(i[h])},addLayer:function(i){var a=this.getLayerId(i);return this._layers[a]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var a=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(i){var a=typeof i=="number"?i:this.getLayerId(i);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var a=Array.prototype.slice.call(arguments,1),h,b;for(h in this._layers)b=this._layers[h],b[i]&&b[i].apply(b,a);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,a){for(var h in this._layers)i.call(a,this._layers[h]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return u(i)}}),Mp=function(i,a){return new fr(i,a)},si=fr.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),fr.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),fr.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new Lt;for(var a in this._layers){var h=this._layers[a];i.extend(h.getBounds?h.getBounds():h.getLatLng())}return i}}),Sp=function(i,a){return new si(i,a)},pr=P.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){y(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,a){var h=this._getIconUrl(i);if(!h){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var b=this._createImg(h,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(b,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(b.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),b},_setIconStyles:function(i,a){var h=this.options,b=h[a+"Size"];typeof b=="number"&&(b=[b,b]);var A=at(b),z=at(a==="shadow"&&h.shadowAnchor||h.iconAnchor||A&&A.divideBy(2,!0));i.className="leaflet-marker-"+a+" "+(h.className||""),z&&(i.style.marginLeft=-z.x+"px",i.style.marginTop=-z.y+"px"),A&&(i.style.width=A.x+"px",i.style.height=A.y+"px")},_createImg:function(i,a){return a=a||document.createElement("img"),a.src=i,a},_getIconUrl:function(i){return Wt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function Ep(i){return new pr(i)}var vs=pr.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof vs.imagePath!="string"&&(vs.imagePath=this._detectIconPath()),(this.options.imagePath||vs.imagePath)+pr.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var a=function(h,b,A){var z=b.exec(h);return z&&z[A]};return i=a(i,/^url\((['"])?(.+)\1\)$/,2),i&&a(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Xt("div","leaflet-default-icon-path",document.body),a=ri(i,"background-image")||ri(i,"backgroundImage");if(document.body.removeChild(i),a=this._stripUrl(a),a)return a;var h=document.querySelector('link[href$="leaflet.css"]');return h?h.href.substring(0,h.href.length-11-1):""}}),Jc=Kn.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new xi(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Yt(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&be(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var a=this._marker,h=a._map,b=this._marker.options.autoPanSpeed,A=this._marker.options.autoPanPadding,z=Hi(a._icon),Y=h.getPixelBounds(),ut=h.getPixelOrigin(),mt=tt(Y.min._subtract(ut).add(A),Y.max._subtract(ut).subtract(A));if(!mt.contains(z)){var Ct=at((Math.max(mt.max.x,z.x)-mt.max.x)/(Y.max.x-mt.max.x)-(Math.min(mt.min.x,z.x)-mt.min.x)/(Y.min.x-mt.min.x),(Math.max(mt.max.y,z.y)-mt.max.y)/(Y.max.y-mt.max.y)-(Math.min(mt.min.y,z.y)-mt.min.y)/(Y.min.y-mt.min.y)).multiplyBy(b);h.panBy(Ct,{animate:!1}),this._draggable._newPos._add(Ct),this._draggable._startPos._add(Ct),ze(a._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=W(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(k(this._panRequest),this._panRequest=W(this._adjustPan.bind(this,i)))},_onDrag:function(i){var a=this._marker,h=a._shadow,b=Hi(a._icon),A=a._map.layerPointToLatLng(b);h&&ze(h,b),a._latlng=A,i.latlng=A,i.oldLatLng=this._oldLatLng,a.fire("move",i).fire("drag",i)},_onDragEnd:function(i){k(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),co=kn.extend({options:{icon:new vs,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,a){y(this,a),this._latlng=wt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),h=i.icon.createIcon(this._icon),b=!1;h!==this._icon&&(this._icon&&this._removeIcon(),b=!0,i.title&&(h.title=i.title),h.tagName==="IMG"&&(h.alt=i.alt||"")),Yt(h,a),i.keyboard&&(h.tabIndex="0",h.setAttribute("role","button")),this._icon=h,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&se(h,"focus",this._panOnFocus,this);var A=i.icon.createShadow(this._shadow),z=!1;A!==this._shadow&&(this._removeShadow(),z=!0),A&&(Yt(A,a),A.alt=""),this._shadow=A,i.opacity<1&&this._updateOpacity(),b&&this.getPane().appendChild(this._icon),this._initInteraction(),A&&z&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&xe(this._icon,"focus",this._panOnFocus,this),fe(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&fe(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&ze(this._icon,i),this._shadow&&ze(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&(Yt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Jc)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Jc(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&mn(this._icon,i),this._shadow&&mn(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var a=this.options.icon.options,h=a.iconSize?at(a.iconSize):at(0,0),b=a.iconAnchor?at(a.iconAnchor):at(0,0);i.panInside(this._latlng,{paddingTopLeft:b,paddingBottomRight:h.subtract(b)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Tp(i,a){return new co(i,a)}var bi=kn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return y(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),uo=bi.extend({options:{fill:!0,radius:10},initialize:function(i,a){y(this,a),this._latlng=wt(i),this._radius=this.options.radius},setLatLng:function(i){var a=this._latlng;return this._latlng=wt(i),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var a=i&&i.radius||this._radius;return bi.prototype.setStyle.call(this,i),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,a=this._radiusY||i,h=this._clickTolerance(),b=[i+h,a+h];this._pxBounds=new q(this._point.subtract(b),this._point.add(b))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Ap(i,a){return new uo(i,a)}var qa=uo.extend({initialize:function(i,a,h){if(typeof a=="number"&&(a=s({},h,{radius:a})),y(this,a),this._latlng=wt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new Lt(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:bi.prototype.setStyle,_project:function(){var i=this._latlng.lng,a=this._latlng.lat,h=this._map,b=h.options.crs;if(b.distance===Pt.distance){var A=Math.PI/180,z=this._mRadius/Pt.R/A,Y=h.project([a+z,i]),ut=h.project([a-z,i]),mt=Y.add(ut).divideBy(2),Ct=h.unproject(mt).lat,Bt=Math.acos((Math.cos(z*A)-Math.sin(a*A)*Math.sin(Ct*A))/(Math.cos(a*A)*Math.cos(Ct*A)))/A;(isNaN(Bt)||Bt===0)&&(Bt=z/Math.cos(Math.PI/180*a)),this._point=mt.subtract(h.getPixelOrigin()),this._radius=isNaN(Bt)?0:mt.x-h.project([Ct,i-Bt]).x,this._radiusY=mt.y-Y.y}else{var $t=b.unproject(b.project(this._latlng).subtract([this._mRadius,0]));this._point=h.latLngToLayerPoint(this._latlng),this._radius=this._point.x-h.latLngToLayerPoint($t).x}this._updateBounds()}});function Cp(i,a,h){return new qa(i,a,h)}var oi=bi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,a){y(this,a),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var a=1/0,h=null,b=_s,A,z,Y=0,ut=this._parts.length;Y<ut;Y++)for(var mt=this._parts[Y],Ct=1,Bt=mt.length;Ct<Bt;Ct++){A=mt[Ct-1],z=mt[Ct];var $t=b(i,A,z,!0);$t<a&&(a=$t,h=b(i,A,z))}return h&&(h.distance=Math.sqrt(a)),h},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return $c(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,a){return a=a||this._defaultShape(),i=wt(i),a.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new Lt,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return Pn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var a=[],h=Pn(i),b=0,A=i.length;b<A;b++)h?(a[b]=wt(i[b]),this._bounds.extend(a[b])):a[b]=this._convertLatLngs(i[b]);return a},_project:function(){var i=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),a=new j(i,i);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(i,a,h){var b=i[0]instanceof it,A=i.length,z,Y;if(b){for(Y=[],z=0;z<A;z++)Y[z]=this._map.latLngToLayerPoint(i[z]),h.extend(Y[z]);a.push(Y)}else for(z=0;z<A;z++)this._projectLatlngs(i[z],a,h)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,h,b,A,z,Y,ut,mt;for(h=0,A=0,z=this._rings.length;h<z;h++)for(mt=this._rings[h],b=0,Y=mt.length;b<Y-1;b++)ut=jc(mt[b],mt[b+1],i,b,!0),ut&&(a[A]=a[A]||[],a[A].push(ut[0]),(ut[1]!==mt[b+1]||b===Y-2)&&(a[A].push(ut[1]),A++))}},_simplifyPoints:function(){for(var i=this._parts,a=this.options.smoothFactor,h=0,b=i.length;h<b;h++)i[h]=Zc(i[h],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,a){var h,b,A,z,Y,ut,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(h=0,z=this._parts.length;h<z;h++)for(ut=this._parts[h],b=0,Y=ut.length,A=Y-1;b<Y;A=b++)if(!(!a&&b===0)&&Xc(i,ut[A],ut[b])<=mt)return!0;return!1}});function Lp(i,a){return new oi(i,a)}oi._flat=Yc;var mr=oi.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Wc(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var a=oi.prototype._convertLatLngs.call(this,i),h=a.length;return h>=2&&a[0]instanceof it&&a[0].equals(a[h-1])&&a.pop(),a},_setLatLngs:function(i){oi.prototype._setLatLngs.call(this,i),Pn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Pn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,a=this.options.weight,h=new j(a,a);if(i=new q(i.min.subtract(h),i.max.add(h)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var b=0,A=this._rings.length,z;b<A;b++)z=Gc(this._rings[b],i,!0),z.length&&this._parts.push(z)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var a=!1,h,b,A,z,Y,ut,mt,Ct;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(z=0,mt=this._parts.length;z<mt;z++)for(h=this._parts[z],Y=0,Ct=h.length,ut=Ct-1;Y<Ct;ut=Y++)b=h[Y],A=h[ut],b.y>i.y!=A.y>i.y&&i.x<(A.x-b.x)*(i.y-b.y)/(A.y-b.y)+b.x&&(a=!a);return a||oi.prototype._containsPoint.call(this,i,!0)}});function Pp(i,a){return new mr(i,a)}var ai=si.extend({initialize:function(i,a){y(this,a),this._layers={},i&&this.addData(i)},addData:function(i){var a=w(i)?i:i.features,h,b,A;if(a){for(h=0,b=a.length;h<b;h++)A=a[h],(A.geometries||A.geometry||A.features||A.coordinates)&&this.addData(A);return this}var z=this.options;if(z.filter&&!z.filter(i))return this;var Y=ho(i,z);return Y?(Y.feature=mo(i),Y.defaultOptions=Y.options,this.resetStyle(Y),z.onEachFeature&&z.onEachFeature(i,Y),this.addLayer(Y)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=s({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(a){this._setLayerStyle(a,i)},this)},_setLayerStyle:function(i,a){i.setStyle&&(typeof a=="function"&&(a=a(i.feature)),i.setStyle(a))}});function ho(i,a){var h=i.type==="Feature"?i.geometry:i,b=h?h.coordinates:null,A=[],z=a&&a.pointToLayer,Y=a&&a.coordsToLatLng||ja,ut,mt,Ct,Bt;if(!b&&!h)return null;switch(h.type){case"Point":return ut=Y(b),Qc(z,i,ut,a);case"MultiPoint":for(Ct=0,Bt=b.length;Ct<Bt;Ct++)ut=Y(b[Ct]),A.push(Qc(z,i,ut,a));return new si(A);case"LineString":case"MultiLineString":return mt=fo(b,h.type==="LineString"?0:1,Y),new oi(mt,a);case"Polygon":case"MultiPolygon":return mt=fo(b,h.type==="Polygon"?1:2,Y),new mr(mt,a);case"GeometryCollection":for(Ct=0,Bt=h.geometries.length;Ct<Bt;Ct++){var $t=ho({geometry:h.geometries[Ct],type:"Feature",properties:i.properties},a);$t&&A.push($t)}return new si(A);case"FeatureCollection":for(Ct=0,Bt=h.features.length;Ct<Bt;Ct++){var he=ho(h.features[Ct],a);he&&A.push(he)}return new si(A);default:throw new Error("Invalid GeoJSON object.")}}function Qc(i,a,h,b){return i?i(a,h):new co(h,b&&b.markersInheritOptions&&b)}function ja(i){return new it(i[1],i[0],i[2])}function fo(i,a,h){for(var b=[],A=0,z=i.length,Y;A<z;A++)Y=a?fo(i[A],a-1,h):(h||ja)(i[A]),b.push(Y);return b}function Ya(i,a){return i=wt(i),i.alt!==void 0?[_(i.lng,a),_(i.lat,a),_(i.alt,a)]:[_(i.lng,a),_(i.lat,a)]}function po(i,a,h,b){for(var A=[],z=0,Y=i.length;z<Y;z++)A.push(a?po(i[z],Pn(i[z])?0:a-1,h,b):Ya(i[z],b));return!a&&h&&A.length>0&&A.push(A[0].slice()),A}function gr(i,a){return i.feature?s({},i.feature,{geometry:a}):mo(a)}function mo(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var $a={toGeoJSON:function(i){return gr(this,{type:"Point",coordinates:Ya(this.getLatLng(),i)})}};co.include($a),qa.include($a),uo.include($a),oi.include({toGeoJSON:function(i){var a=!Pn(this._latlngs),h=po(this._latlngs,a?1:0,!1,i);return gr(this,{type:(a?"Multi":"")+"LineString",coordinates:h})}}),mr.include({toGeoJSON:function(i){var a=!Pn(this._latlngs),h=a&&!Pn(this._latlngs[0]),b=po(this._latlngs,h?2:a?1:0,!0,i);return a||(b=[b]),gr(this,{type:(h?"Multi":"")+"Polygon",coordinates:b})}}),fr.include({toMultiPoint:function(i){var a=[];return this.eachLayer(function(h){a.push(h.toGeoJSON(i).geometry.coordinates)}),gr(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(i){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(i);var h=a==="GeometryCollection",b=[];return this.eachLayer(function(A){if(A.toGeoJSON){var z=A.toGeoJSON(i);if(h)b.push(z.geometry);else{var Y=mo(z);Y.type==="FeatureCollection"?b.push.apply(b,Y.features):b.push(Y)}}}),h?gr(this,{geometries:b,type:"GeometryCollection"}):{type:"FeatureCollection",features:b}}});function tu(i,a){return new ai(i,a)}var Rp=tu,go=kn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,a,h){this._url=i,this._bounds=Q(a),y(this,h)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Yt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){fe(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&Ln(this._image),this},bringToBack:function(){return this._map&&Yn(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=Q(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",a=this._image=i?this._url:Xt("img");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(i){var a=this._map.getZoomScale(i.zoom),h=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;Fi(this._image,h,a)},_reset:function(){var i=this._image,a=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),h=a.getSize();ze(i,a.min),i.style.width=h.x+"px",i.style.height=h.y+"px"},_updateOpacity:function(){mn(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),Ip=function(i,a,h){return new go(i,a,h)},eu=go.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",a=this._image=i?this._url:Xt("video");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=p,a.onmousemove=p,a.onloadeddata=l(this.fire,this,"load"),i){for(var h=a.getElementsByTagName("source"),b=[],A=0;A<h.length;A++)b.push(h[A].src);this._url=h.length>0?b:[a.src];return}w(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var z=0;z<this._url.length;z++){var Y=Xt("source");Y.src=this._url[z],a.appendChild(Y)}}});function Dp(i,a,h){return new eu(i,a,h)}var nu=go.extend({_initImage:function(){var i=this._image=this._url;Yt(i,"leaflet-image-layer"),this._zoomAnimated&&Yt(i,"leaflet-zoom-animated"),this.options.className&&Yt(i,this.options.className),i.onselectstart=p,i.onmousemove=p}});function Np(i,a,h){return new nu(i,a,h)}var Jn=kn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,a){i&&(i instanceof it||w(i))?(this._latlng=wt(i),y(this,a)):(y(this,i),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&mn(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&mn(this._container,1),this.bringToFront(),this.options.interactive&&(Yt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(mn(this._container,0),this._removeTimeout=setTimeout(l(fe,void 0,this._container),200)):fe(this._container),this.options.interactive&&(be(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=wt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&Ln(this._container),this},bringToBack:function(){return this._map&&Yn(this._container),this},_prepareOpen:function(i){var a=this._source;if(!a._map)return!1;if(a instanceof si){a=null;var h=this._source._layers;for(var b in h)if(h[b]._map){a=h[b];break}if(!a)return!1;this._source=a}if(!i)if(a.getCenter)i=a.getCenter();else if(a.getLatLng)i=a.getLatLng();else if(a.getBounds)i=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")i.innerHTML=a;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),a=at(this.options.offset),h=this._getAnchor();this._zoomAnimated?ze(this._container,i.add(h)):a=a.add(i).add(h);var b=this._containerBottom=-a.y,A=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=b+"px",this._container.style.left=A+"px"}},_getAnchor:function(){return[0,0]}});de.include({_initOverlay:function(i,a,h,b){var A=a;return A instanceof i||(A=new i(b).setContent(a)),h&&A.setLatLng(h),A}}),kn.include({_initOverlay:function(i,a,h,b){var A=h;return A instanceof i?(y(A,b),A._source=this):(A=a&&!b?a:new i(b,this),A.setContent(h)),A}});var _o=Jn.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,Jn.prototype.openOn.call(this,i)},onAdd:function(i){Jn.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof bi||this._source.on("preclick",Vi))},onRemove:function(i){Jn.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof bi||this._source.off("preclick",Vi))},getEvents:function(){var i=Jn.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",a=this._container=Xt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),h=this._wrapper=Xt("div",i+"-content-wrapper",a);if(this._contentNode=Xt("div",i+"-content",h),ms(a),Ba(this._contentNode),se(a,"contextmenu",Vi),this._tipContainer=Xt("div",i+"-tip-container",a),this._tip=Xt("div",i+"-tip",this._tipContainer),this.options.closeButton){var b=this._closeButton=Xt("a",i+"-close-button",a);b.setAttribute("role","button"),b.setAttribute("aria-label","Close popup"),b.href="#close",b.innerHTML='<span aria-hidden="true">&#215;</span>',se(b,"click",function(A){Ke(A),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,a=i.style;a.width="",a.whiteSpace="nowrap";var h=i.offsetWidth;h=Math.min(h,this.options.maxWidth),h=Math.max(h,this.options.minWidth),a.width=h+1+"px",a.whiteSpace="",a.height="";var b=i.offsetHeight,A=this.options.maxHeight,z="leaflet-popup-scrolled";A&&b>A?(a.height=A+"px",Yt(i,z)):be(i,z),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),h=this._getAnchor();ze(this._container,a.add(h))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,a=parseInt(ri(this._container,"marginBottom"),10)||0,h=this._container.offsetHeight+a,b=this._containerWidth,A=new j(this._containerLeft,-h-this._containerBottom);A._add(Hi(this._container));var z=i.layerPointToContainerPoint(A),Y=at(this.options.autoPanPadding),ut=at(this.options.autoPanPaddingTopLeft||Y),mt=at(this.options.autoPanPaddingBottomRight||Y),Ct=i.getSize(),Bt=0,$t=0;z.x+b+mt.x>Ct.x&&(Bt=z.x+b-Ct.x+mt.x),z.x-Bt-ut.x<0&&(Bt=z.x-ut.x),z.y+h+mt.y>Ct.y&&($t=z.y+h-Ct.y+mt.y),z.y-$t-ut.y<0&&($t=z.y-ut.y),(Bt||$t)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([Bt,$t]))}},_getAnchor:function(){return at(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Op=function(i,a){return new _o(i,a)};de.mergeOptions({closePopupOnClick:!0}),de.include({openPopup:function(i,a,h){return this._initOverlay(_o,i,a,h).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),kn.include({bindPopup:function(i,a){return this._popup=this._initOverlay(_o,this._popup,i,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof si||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){Gi(i);var a=i.layer||i.target;if(this._popup._source===a&&!(a instanceof bi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=a,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var vo=Jn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){Jn.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){Jn.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=Jn.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",a=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Xt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+u(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var a,h,b=this._map,A=this._container,z=b.latLngToContainerPoint(b.getCenter()),Y=b.layerPointToContainerPoint(i),ut=this.options.direction,mt=A.offsetWidth,Ct=A.offsetHeight,Bt=at(this.options.offset),$t=this._getAnchor();ut==="top"?(a=mt/2,h=Ct):ut==="bottom"?(a=mt/2,h=0):ut==="center"?(a=mt/2,h=Ct/2):ut==="right"?(a=0,h=Ct/2):ut==="left"?(a=mt,h=Ct/2):Y.x<z.x?(ut="right",a=0,h=Ct/2):(ut="left",a=mt+(Bt.x+$t.x)*2,h=Ct/2),i=i.subtract(at(a,h,!0)).add(Bt).add($t),be(A,"leaflet-tooltip-right"),be(A,"leaflet-tooltip-left"),be(A,"leaflet-tooltip-top"),be(A,"leaflet-tooltip-bottom"),Yt(A,"leaflet-tooltip-"+ut),ze(A,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&mn(this._container,i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(a)},_getAnchor:function(){return at(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Up=function(i,a){return new vo(i,a)};de.include({openTooltip:function(i,a,h){return this._initOverlay(vo,i,a,h).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),kn.include({bindTooltip:function(i,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(vo,this._tooltip,i,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var a=i?"off":"on",h={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?h.add=this._openTooltip:(h.mouseover=this._openTooltip,h.mouseout=this.closeTooltip,h.click=this._openTooltip,this._map?this._addFocusListeners():h.add=this._addFocusListeners),this._tooltip.options.sticky&&(h.mousemove=this._moveTooltip),this[a](h),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof si||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&(se(a,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),se(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var a=i.latlng,h,b;this._tooltip.options.sticky&&i.originalEvent&&(h=this._map.mouseEventToContainerPoint(i.originalEvent),b=this._map.containerPointToLayerPoint(h),a=this._map.layerPointToLatLng(b)),this._tooltip.setLatLng(a)}});var iu=pr.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var a=i&&i.tagName==="DIV"?i:document.createElement("div"),h=this.options;if(h.html instanceof Element?(Bi(a),a.appendChild(h.html)):a.innerHTML=h.html!==!1?h.html:"",h.bgPos){var b=at(h.bgPos);a.style.backgroundPosition=-b.x+"px "+-b.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function kp(i){return new iu(i)}pr.Default=vs;var ys=kn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Wt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){y(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),fe(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(Ln(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(Yn(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof j?i:new j(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var a=this.getPane().children,h=-i(-1/0,1/0),b=0,A=a.length,z;b<A;b++)z=a[b].style.zIndex,a[b]!==this._container&&z&&(h=i(h,+z));isFinite(h)&&(this.options.zIndex=h+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Wt.ielt9){mn(this._container,this.options.opacity);var i=+new Date,a=!1,h=!1;for(var b in this._tiles){var A=this._tiles[b];if(!(!A.current||!A.loaded)){var z=Math.min(1,(i-A.loaded)/200);mn(A.el,z),z<1?a=!0:(A.active?h=!0:this._onOpaqueTile(A),A.active=!0)}}h&&!this._noPrune&&this._pruneTiles(),a&&(k(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this))}},_onOpaqueTile:p,_initContainer:function(){this._container||(this._container=Xt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,a=this.options.maxZoom;if(i!==void 0){for(var h in this._levels)h=Number(h),this._levels[h].el.children.length||h===i?(this._levels[h].el.style.zIndex=a-Math.abs(i-h),this._onUpdateLevel(h)):(fe(this._levels[h].el),this._removeTilesAtZoom(h),this._onRemoveLevel(h),delete this._levels[h]);var b=this._levels[i],A=this._map;return b||(b=this._levels[i]={},b.el=Xt("div","leaflet-tile-container leaflet-zoom-animated",this._container),b.el.style.zIndex=a,b.origin=A.project(A.unproject(A.getPixelOrigin()),i).round(),b.zoom=i,this._setZoomTransform(b,A.getCenter(),A.getZoom()),p(b.el.offsetWidth),this._onCreateLevel(b)),this._level=b,b}},_onUpdateLevel:p,_onRemoveLevel:p,_onCreateLevel:p,_pruneTiles:function(){if(this._map){var i,a,h=this._map.getZoom();if(h>this.options.maxZoom||h<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)a=this._tiles[i],a.retain=a.current;for(i in this._tiles)if(a=this._tiles[i],a.current&&!a.active){var b=a.coords;this._retainParent(b.x,b.y,b.z,b.z-5)||this._retainChildren(b.x,b.y,b.z,b.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var a in this._tiles)this._tiles[a].coords.z===i&&this._removeTile(a)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)fe(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,a,h,b){var A=Math.floor(i/2),z=Math.floor(a/2),Y=h-1,ut=new j(+A,+z);ut.z=+Y;var mt=this._tileCoordsToKey(ut),Ct=this._tiles[mt];return Ct&&Ct.active?(Ct.retain=!0,!0):(Ct&&Ct.loaded&&(Ct.retain=!0),Y>b?this._retainParent(A,z,Y,b):!1)},_retainChildren:function(i,a,h,b){for(var A=2*i;A<2*i+2;A++)for(var z=2*a;z<2*a+2;z++){var Y=new j(A,z);Y.z=h+1;var ut=this._tileCoordsToKey(Y),mt=this._tiles[ut];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);h+1<b&&this._retainChildren(A,z,h+1,b)}},_resetView:function(i){var a=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var a=this.options;return a.minNativeZoom!==void 0&&i<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<i?a.maxNativeZoom:i},_setView:function(i,a,h,b){var A=Math.round(a);this.options.maxZoom!==void 0&&A>this.options.maxZoom||this.options.minZoom!==void 0&&A<this.options.minZoom?A=void 0:A=this._clampZoom(A);var z=this.options.updateWhenZooming&&A!==this._tileZoom;(!b||z)&&(this._tileZoom=A,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),A!==void 0&&this._update(i),h||this._pruneTiles(),this._noPrune=!!h),this._setZoomTransforms(i,a)},_setZoomTransforms:function(i,a){for(var h in this._levels)this._setZoomTransform(this._levels[h],i,a)},_setZoomTransform:function(i,a,h){var b=this._map.getZoomScale(h,i.zoom),A=i.origin.multiplyBy(b).subtract(this._map._getNewPixelOrigin(a,h)).round();Wt.any3d?Fi(i.el,A,b):ze(i.el,A)},_resetGrid:function(){var i=this._map,a=i.options.crs,h=this._tileSize=this.getTileSize(),b=this._tileZoom,A=this._map.getPixelWorldBounds(this._tileZoom);A&&(this._globalTileRange=this._pxBoundsToTileRange(A)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,a.wrapLng[0]],b).x/h.x),Math.ceil(i.project([0,a.wrapLng[1]],b).x/h.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([a.wrapLat[0],0],b).y/h.x),Math.ceil(i.project([a.wrapLat[1],0],b).y/h.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var a=this._map,h=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),b=a.getZoomScale(h,this._tileZoom),A=a.project(i,this._tileZoom).floor(),z=a.getSize().divideBy(b*2);return new q(A.subtract(z),A.add(z))},_update:function(i){var a=this._map;if(a){var h=this._clampZoom(a.getZoom());if(i===void 0&&(i=a.getCenter()),this._tileZoom!==void 0){var b=this._getTiledPixelBounds(i),A=this._pxBoundsToTileRange(b),z=A.getCenter(),Y=[],ut=this.options.keepBuffer,mt=new q(A.getBottomLeft().subtract([ut,-ut]),A.getTopRight().add([ut,-ut]));if(!(isFinite(A.min.x)&&isFinite(A.min.y)&&isFinite(A.max.x)&&isFinite(A.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var Ct in this._tiles){var Bt=this._tiles[Ct].coords;(Bt.z!==this._tileZoom||!mt.contains(new j(Bt.x,Bt.y)))&&(this._tiles[Ct].current=!1)}if(Math.abs(h-this._tileZoom)>1){this._setView(i,h);return}for(var $t=A.min.y;$t<=A.max.y;$t++)for(var he=A.min.x;he<=A.max.x;he++){var ln=new j(he,$t);if(ln.z=this._tileZoom,!!this._isValidTile(ln)){var We=this._tiles[this._tileCoordsToKey(ln)];We?We.current=!0:Y.push(ln)}}if(Y.sort(function(gn,vr){return gn.distanceTo(z)-vr.distanceTo(z)}),Y.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Rn=document.createDocumentFragment();for(he=0;he<Y.length;he++)this._addTile(Y[he],Rn);this._level.el.appendChild(Rn)}}}},_isValidTile:function(i){var a=this._map.options.crs;if(!a.infinite){var h=this._globalTileRange;if(!a.wrapLng&&(i.x<h.min.x||i.x>h.max.x)||!a.wrapLat&&(i.y<h.min.y||i.y>h.max.y))return!1}if(!this.options.bounds)return!0;var b=this._tileCoordsToBounds(i);return Q(this.options.bounds).overlaps(b)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var a=this._map,h=this.getTileSize(),b=i.scaleBy(h),A=b.add(h),z=a.unproject(b,i.z),Y=a.unproject(A,i.z);return[z,Y]},_tileCoordsToBounds:function(i){var a=this._tileCoordsToNwSe(i),h=new Lt(a[0],a[1]);return this.options.noWrap||(h=this._map.wrapLatLngBounds(h)),h},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var a=i.split(":"),h=new j(+a[0],+a[1]);return h.z=+a[2],h},_removeTile:function(i){var a=this._tiles[i];a&&(fe(a.el),delete this._tiles[i],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){Yt(i,"leaflet-tile");var a=this.getTileSize();i.style.width=a.x+"px",i.style.height=a.y+"px",i.onselectstart=p,i.onmousemove=p,Wt.ielt9&&this.options.opacity<1&&mn(i,this.options.opacity)},_addTile:function(i,a){var h=this._getTilePos(i),b=this._tileCoordsToKey(i),A=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(A),this.createTile.length<2&&W(l(this._tileReady,this,i,null,A)),ze(A,h),this._tiles[b]={el:A,coords:i,current:!0},a.appendChild(A),this.fire("tileloadstart",{tile:A,coords:i})},_tileReady:function(i,a,h){a&&this.fire("tileerror",{error:a,tile:h,coords:i});var b=this._tileCoordsToKey(i);h=this._tiles[b],h&&(h.loaded=+new Date,this._map._fadeAnimated?(mn(h.el,0),k(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this)):(h.active=!0,this._pruneTiles()),a||(Yt(h.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:h.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Wt.ielt9||!this._map._fadeAnimated?W(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var a=new j(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return a.z=i.z,a},_pxBoundsToTileRange:function(i){var a=this.getTileSize();return new q(i.min.unscaleBy(a).floor(),i.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function zp(i){return new ys(i)}var _r=ys.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,a){this._url=i,a=y(this,a),a.detectRetina&&Wt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,a){return this._url===i&&a===void 0&&(a=!0),this._url=i,a||this.redraw(),this},createTile:function(i,a){var h=document.createElement("img");return se(h,"load",l(this._tileOnLoad,this,a,h)),se(h,"error",l(this._tileOnError,this,a,h)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(h.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(h.referrerPolicy=this.options.referrerPolicy),h.alt="",h.src=this.getTileUrl(i),h},getTileUrl:function(i){var a={r:Wt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var h=this._globalTileRange.max.y-i.y;this.options.tms&&(a.y=h),a["-y"]=h}return S(this._url,s(a,this.options))},_tileOnLoad:function(i,a){Wt.ielt9?setTimeout(l(i,this,null,a),0):i(null,a)},_tileOnError:function(i,a,h){var b=this.options.errorTileUrl;b&&a.getAttribute("src")!==b&&(a.src=b),i(h,a)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,a=this.options.maxZoom,h=this.options.zoomReverse,b=this.options.zoomOffset;return h&&(i=a-i),i+b},_getSubdomain:function(i){var a=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var i,a;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(a=this._tiles[i].el,a.onload=p,a.onerror=p,!a.complete)){a.src=N;var h=this._tiles[i].coords;fe(a),delete this._tiles[i],this.fire("tileabort",{tile:a,coords:h})}},_removeTile:function(i){var a=this._tiles[i];if(a)return a.el.setAttribute("src",N),ys.prototype._removeTile.call(this,i)},_tileReady:function(i,a,h){if(!(!this._map||h&&h.getAttribute("src")===N))return ys.prototype._tileReady.call(this,i,a,h)}});function ru(i,a){return new _r(i,a)}var su=_r.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,a){this._url=i;var h=s({},this.defaultWmsParams);for(var b in a)b in this.options||(h[b]=a[b]);a=y(this,a);var A=a.detectRetina&&Wt.retina?2:1,z=this.getTileSize();h.width=z.x*A,h.height=z.y*A,this.wmsParams=h},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,_r.prototype.onAdd.call(this,i)},getTileUrl:function(i){var a=this._tileCoordsToNwSe(i),h=this._crs,b=tt(h.project(a[0]),h.project(a[1])),A=b.min,z=b.max,Y=(this._wmsVersion>=1.3&&this._crs===Kc?[A.y,A.x,z.y,z.x]:[A.x,A.y,z.x,z.y]).join(","),ut=_r.prototype.getTileUrl.call(this,i);return ut+g(this.wmsParams,ut,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+Y},setParams:function(i,a){return s(this.wmsParams,i),a||this.redraw(),this}});function Bp(i,a){return new su(i,a)}_r.WMS=su,ru.wms=Bp;var li=kn.extend({options:{padding:.1},initialize:function(i){y(this,i),u(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Yt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,a){var h=this._map.getZoomScale(a,this._zoom),b=this._map.getSize().multiplyBy(.5+this.options.padding),A=this._map.project(this._center,a),z=b.multiplyBy(-h).add(A).subtract(this._map._getNewPixelOrigin(i,a));Wt.any3d?Fi(this._container,z,h):ze(this._container,z)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,a=this._map.getSize(),h=this._map.containerPointToLayerPoint(a.multiplyBy(-i)).round();this._bounds=new q(h,h.add(a.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),ou=li.extend({options:{tolerance:0},getEvents:function(){var i=li.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){li.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");se(i,"mousemove",this._onMouseMove,this),se(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),se(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){k(this._redrawRequest),delete this._ctx,fe(this._container),xe(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var a in this._layers)i=this._layers[a],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){li.prototype._update.call(this);var i=this._bounds,a=this._container,h=i.getSize(),b=Wt.retina?2:1;ze(a,i.min),a.width=b*h.x,a.height=b*h.y,a.style.width=h.x+"px",a.style.height=h.y+"px",Wt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){li.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[u(i)]=i;var a=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var a=i._order,h=a.next,b=a.prev;h?h.prev=b:this._drawLast=b,b?b.next=h:this._drawFirst=h,delete i._order,delete this._layers[u(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var a=i.options.dashArray.split(/[, ]+/),h=[],b,A;for(A=0;A<a.length;A++){if(b=Number(a[A]),isNaN(b))return;h.push(b)}i.options._dashArray=h}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||W(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var a=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(i._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(i._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var a=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,a=this._redrawBounds;if(this._ctx.save(),a){var h=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,h.x,h.y),this._ctx.clip()}this._drawing=!0;for(var b=this._drawFirst;b;b=b.next)i=b.layer,(!a||i._pxBounds&&i._pxBounds.intersects(a))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,a){if(this._drawing){var h,b,A,z,Y=i._parts,ut=Y.length,mt=this._ctx;if(ut){for(mt.beginPath(),h=0;h<ut;h++){for(b=0,A=Y[h].length;b<A;b++)z=Y[h][b],mt[b?"lineTo":"moveTo"](z.x,z.y);a&&mt.closePath()}this._fillStroke(mt,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var a=i._point,h=this._ctx,b=Math.max(Math.round(i._radius),1),A=(Math.max(Math.round(i._radiusY),1)||b)/b;A!==1&&(h.save(),h.scale(1,A)),h.beginPath(),h.arc(a.x,a.y/A,b,0,Math.PI*2,!1),A!==1&&h.restore(),this._fillStroke(h,i)}},_fillStroke:function(i,a){var h=a.options;h.fill&&(i.globalAlpha=h.fillOpacity,i.fillStyle=h.fillColor||h.color,i.fill(h.fillRule||"evenodd")),h.stroke&&h.weight!==0&&(i.setLineDash&&i.setLineDash(a.options&&a.options._dashArray||[]),i.globalAlpha=h.opacity,i.lineWidth=h.weight,i.strokeStyle=h.color,i.lineCap=h.lineCap,i.lineJoin=h.lineJoin,i.stroke())},_onClick:function(i){for(var a=this._map.mouseEventToLayerPoint(i),h,b,A=this._drawFirst;A;A=A.next)h=A.layer,h.options.interactive&&h._containsPoint(a)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(h))&&(b=h);this._fireEvent(b?[b]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,a)}},_handleMouseOut:function(i){var a=this._hoveredLayer;a&&(be(this._container,"leaflet-interactive"),this._fireEvent([a],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,a){if(!this._mouseHoverThrottled){for(var h,b,A=this._drawFirst;A;A=A.next)h=A.layer,h.options.interactive&&h._containsPoint(a)&&(b=h);b!==this._hoveredLayer&&(this._handleMouseOut(i),b&&(Yt(this._container,"leaflet-interactive"),this._fireEvent([b],i,"mouseover"),this._hoveredLayer=b)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,a,h){this._map._fireDOMEvent(a,h||a.type,i)},_bringToFront:function(i){var a=i._order;if(a){var h=a.next,b=a.prev;if(h)h.prev=b;else return;b?b.next=h:h&&(this._drawFirst=h),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(i)}},_bringToBack:function(i){var a=i._order;if(a){var h=a.next,b=a.prev;if(b)b.next=h;else return;h?h.prev=b:b&&(this._drawLast=b),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(i)}}});function au(i){return Wt.canvas?new ou(i):null}var xs=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),Fp={_initContainer:function(){this._container=Xt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||(li.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var a=i._container=xs("shape");Yt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",i._path=xs("path"),a.appendChild(i._path),this._updateStyle(i),this._layers[u(i)]=i},_addPath:function(i){var a=i._container;this._container.appendChild(a),i.options.interactive&&i.addInteractiveTarget(a)},_removePath:function(i){var a=i._container;fe(a),i.removeInteractiveTarget(a),delete this._layers[u(i)]},_updateStyle:function(i){var a=i._stroke,h=i._fill,b=i.options,A=i._container;A.stroked=!!b.stroke,A.filled=!!b.fill,b.stroke?(a||(a=i._stroke=xs("stroke")),A.appendChild(a),a.weight=b.weight+"px",a.color=b.color,a.opacity=b.opacity,b.dashArray?a.dashStyle=w(b.dashArray)?b.dashArray.join(" "):b.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=b.lineCap.replace("butt","flat"),a.joinstyle=b.lineJoin):a&&(A.removeChild(a),i._stroke=null),b.fill?(h||(h=i._fill=xs("fill")),A.appendChild(h),h.color=b.fillColor||b.color,h.opacity=b.fillOpacity):h&&(A.removeChild(h),i._fill=null)},_updateCircle:function(i){var a=i._point.round(),h=Math.round(i._radius),b=Math.round(i._radiusY||h);this._setPath(i,i._empty()?"M0 0":"AL "+a.x+","+a.y+" "+h+","+b+" 0,"+65535*360)},_setPath:function(i,a){i._path.v=a},_bringToFront:function(i){Ln(i._container)},_bringToBack:function(i){Yn(i._container)}},yo=Wt.vml?xs:et,bs=li.extend({_initContainer:function(){this._container=yo("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=yo("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){fe(this._container),xe(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){li.prototype._update.call(this);var i=this._bounds,a=i.getSize(),h=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,h.setAttribute("width",a.x),h.setAttribute("height",a.y)),ze(h,i.min),h.setAttribute("viewBox",[i.min.x,i.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(i){var a=i._path=yo("path");i.options.className&&Yt(a,i.options.className),i.options.interactive&&Yt(a,"leaflet-interactive"),this._updateStyle(i),this._layers[u(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){fe(i._path),i.removeInteractiveTarget(i._path),delete this._layers[u(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var a=i._path,h=i.options;a&&(h.stroke?(a.setAttribute("stroke",h.color),a.setAttribute("stroke-opacity",h.opacity),a.setAttribute("stroke-width",h.weight),a.setAttribute("stroke-linecap",h.lineCap),a.setAttribute("stroke-linejoin",h.lineJoin),h.dashArray?a.setAttribute("stroke-dasharray",h.dashArray):a.removeAttribute("stroke-dasharray"),h.dashOffset?a.setAttribute("stroke-dashoffset",h.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),h.fill?(a.setAttribute("fill",h.fillColor||h.color),a.setAttribute("fill-opacity",h.fillOpacity),a.setAttribute("fill-rule",h.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(i,a){this._setPath(i,$(i._parts,a))},_updateCircle:function(i){var a=i._point,h=Math.max(Math.round(i._radius),1),b=Math.max(Math.round(i._radiusY),1)||h,A="a"+h+","+b+" 0 1,0 ",z=i._empty()?"M0 0":"M"+(a.x-h)+","+a.y+A+h*2+",0 "+A+-h*2+",0 ";this._setPath(i,z)},_setPath:function(i,a){i._path.setAttribute("d",a)},_bringToFront:function(i){Ln(i._path)},_bringToBack:function(i){Yn(i._path)}});Wt.vml&&bs.include(Fp);function lu(i){return Wt.svg||Wt.vml?new bs(i):null}de.include({getRenderer:function(i){var a=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var a=this._paneRenderers[i];return a===void 0&&(a=this._createRenderer({pane:i}),this._paneRenderers[i]=a),a},_createRenderer:function(i){return this.options.preferCanvas&&au(i)||lu(i)}});var cu=mr.extend({initialize:function(i,a){mr.prototype.initialize.call(this,this._boundsToLatLngs(i),a)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=Q(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function Hp(i,a){return new cu(i,a)}bs.create=yo,bs.pointsToPath=$,ai.geometryToLayer=ho,ai.coordsToLatLng=ja,ai.coordsToLatLngs=fo,ai.latLngToCoords=Ya,ai.latLngsToCoords=po,ai.getFeature=gr,ai.asFeature=mo,de.mergeOptions({boxZoom:!0});var uu=Kn.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){se(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){xe(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){fe(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),ds(),Ra(),this._startPoint=this._map.mouseEventToContainerPoint(i),se(document,{contextmenu:Gi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Xt("div","leaflet-zoom-box",this._container),Yt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var a=new q(this._point,this._startPoint),h=a.getSize();ze(this._box,a.min),this._box.style.width=h.x+"px",this._box.style.height=h.y+"px"},_finish:function(){this._moved&&(fe(this._box),be(this._container,"leaflet-crosshair")),fs(),Ia(),xe(document,{contextmenu:Gi,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new Lt(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});de.addInitHook("addHandler","boxZoom",uu),de.mergeOptions({doubleClickZoom:!0});var hu=Kn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var a=this._map,h=a.getZoom(),b=a.options.zoomDelta,A=i.originalEvent.shiftKey?h-b:h+b;a.options.doubleClickZoom==="center"?a.setZoom(A):a.setZoomAround(i.containerPoint,A)}});de.addInitHook("addHandler","doubleClickZoom",hu),de.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var du=Kn.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new xi(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}Yt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){be(this._map._container,"leaflet-grab"),be(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=Q(this._map.options.maxBounds);this._offsetLimit=tt(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var a=this._lastTime=+new Date,h=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(h),this._times.push(a),this._prunePositions(a)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,a){return i-(i-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;i.x<a.min.x&&(i.x=this._viscousLimit(i.x,a.min.x)),i.y<a.min.y&&(i.y=this._viscousLimit(i.y,a.min.y)),i.x>a.max.x&&(i.x=this._viscousLimit(i.x,a.max.x)),i.y>a.max.y&&(i.y=this._viscousLimit(i.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,a=Math.round(i/2),h=this._initialWorldOffset,b=this._draggable._newPos.x,A=(b-a+h)%i+a-h,z=(b+a+h)%i-a-h,Y=Math.abs(A+h)<Math.abs(z+h)?A:z;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=Y},_onDragEnd:function(i){var a=this._map,h=a.options,b=!h.inertia||i.noInertia||this._times.length<2;if(a.fire("dragend",i),b)a.fire("moveend");else{this._prunePositions(+new Date);var A=this._lastPos.subtract(this._positions[0]),z=(this._lastTime-this._times[0])/1e3,Y=h.easeLinearity,ut=A.multiplyBy(Y/z),mt=ut.distanceTo([0,0]),Ct=Math.min(h.inertiaMaxSpeed,mt),Bt=ut.multiplyBy(Ct/mt),$t=Ct/(h.inertiaDeceleration*Y),he=Bt.multiplyBy(-$t/2).round();!he.x&&!he.y?a.fire("moveend"):(he=a._limitOffset(he,a.options.maxBounds),W(function(){a.panBy(he,{duration:$t,easeLinearity:Y,noMoveStart:!0,animate:!0})}))}}});de.addInitHook("addHandler","dragging",du),de.mergeOptions({keyboard:!0,keyboardPanDelta:80});var fu=Kn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),se(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),xe(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,a=document.documentElement,h=i.scrollTop||a.scrollTop,b=i.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(b,h)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var a=this._panKeys={},h=this.keyCodes,b,A;for(b=0,A=h.left.length;b<A;b++)a[h.left[b]]=[-1*i,0];for(b=0,A=h.right.length;b<A;b++)a[h.right[b]]=[i,0];for(b=0,A=h.down.length;b<A;b++)a[h.down[b]]=[0,i];for(b=0,A=h.up.length;b<A;b++)a[h.up[b]]=[0,-1*i]},_setZoomDelta:function(i){var a=this._zoomKeys={},h=this.keyCodes,b,A;for(b=0,A=h.zoomIn.length;b<A;b++)a[h.zoomIn[b]]=i;for(b=0,A=h.zoomOut.length;b<A;b++)a[h.zoomOut[b]]=-i},_addHooks:function(){se(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){xe(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var a=i.keyCode,h=this._map,b;if(a in this._panKeys){if(!h._panAnim||!h._panAnim._inProgress)if(b=this._panKeys[a],i.shiftKey&&(b=at(b).multiplyBy(3)),h.options.maxBounds&&(b=h._limitOffset(at(b),h.options.maxBounds)),h.options.worldCopyJump){var A=h.wrapLatLng(h.unproject(h.project(h.getCenter()).add(b)));h.panTo(A)}else h.panBy(b)}else if(a in this._zoomKeys)h.setZoom(h.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&h._popup&&h._popup.options.closeOnEscapeKey)h.closePopup();else return;Gi(i)}}});de.addInitHook("addHandler","keyboard",fu),de.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var pu=Kn.extend({addHooks:function(){se(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){xe(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var a=zc(i),h=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var b=Math.max(h-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),b),Gi(i)},_performZoom:function(){var i=this._map,a=i.getZoom(),h=this._map.options.zoomSnap||0;i._stop();var b=this._delta/(this._map.options.wheelPxPerZoomLevel*4),A=4*Math.log(2/(1+Math.exp(-Math.abs(b))))/Math.LN2,z=h?Math.ceil(A/h)*h:A,Y=i._limitZoom(a+(this._delta>0?z:-z))-a;this._delta=0,this._startTime=null,Y&&(i.options.scrollWheelZoom==="center"?i.setZoom(a+Y):i.setZoomAround(this._lastMousePos,a+Y))}});de.addInitHook("addHandler","scrollWheelZoom",pu);var Vp=600;de.mergeOptions({tapHold:Wt.touchNative&&Wt.safari&&Wt.mobile,tapTolerance:15});var mu=Kn.extend({addHooks:function(){se(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){xe(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var a=i.touches[0];this._startPos=this._newPos=new j(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(se(document,"touchend",Ke),se(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),Vp),se(document,"touchend touchcancel contextmenu",this._cancel,this),se(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){xe(document,"touchend",Ke),xe(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),xe(document,"touchend touchcancel contextmenu",this._cancel,this),xe(document,"touchmove",this._onMove,this)},_onMove:function(i){var a=i.touches[0];this._newPos=new j(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,a){var h=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});h._simulated=!0,a.target.dispatchEvent(h)}});de.addInitHook("addHandler","tapHold",mu),de.mergeOptions({touchZoom:Wt.touch,bounceAtZoomLimits:!0});var gu=Kn.extend({addHooks:function(){Yt(this._map._container,"leaflet-touch-zoom"),se(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){be(this._map._container,"leaflet-touch-zoom"),xe(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var a=this._map;if(!(!i.touches||i.touches.length!==2||a._animatingZoom||this._zooming)){var h=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(h.add(b)._divideBy(2))),this._startDist=h.distanceTo(b),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),se(document,"touchmove",this._onTouchMove,this),se(document,"touchend touchcancel",this._onTouchEnd,this),Ke(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var a=this._map,h=a.mouseEventToContainerPoint(i.touches[0]),b=a.mouseEventToContainerPoint(i.touches[1]),A=h.distanceTo(b)/this._startDist;if(this._zoom=a.getScaleZoom(A,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&A<1||this._zoom>a.getMaxZoom()&&A>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,A===1)return}else{var z=h._add(b)._divideBy(2)._subtract(this._centerPoint);if(A===1&&z.x===0&&z.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(z),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),k(this._animRequest);var Y=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=W(Y,this,!0),Ke(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,k(this._animRequest),xe(document,"touchmove",this._onTouchMove,this),xe(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});de.addInitHook("addHandler","touchZoom",gu),de.BoxZoom=uu,de.DoubleClickZoom=hu,de.Drag=du,de.Keyboard=fu,de.ScrollWheelZoom=pu,de.TapHold=mu,de.TouchZoom=gu,e.Bounds=q,e.Browser=Wt,e.CRS=St,e.Canvas=ou,e.Circle=qa,e.CircleMarker=uo,e.Class=P,e.Control=Un,e.DivIcon=iu,e.DivOverlay=Jn,e.DomEvent=op,e.DomUtil=rp,e.Draggable=xi,e.Evented=ot,e.FeatureGroup=si,e.GeoJSON=ai,e.GridLayer=ys,e.Handler=Kn,e.Icon=pr,e.ImageOverlay=go,e.LatLng=it,e.LatLngBounds=Lt,e.Layer=kn,e.LayerGroup=fr,e.LineUtil=yp,e.Map=de,e.Marker=co,e.Mixin=fp,e.Path=bi,e.Point=j,e.PolyUtil=pp,e.Polygon=mr,e.Polyline=oi,e.Popup=_o,e.PosAnimation=Bc,e.Projection=xp,e.Rectangle=cu,e.Renderer=li,e.SVG=bs,e.SVGOverlay=nu,e.TileLayer=_r,e.Tooltip=vo,e.Transformation=st,e.Util=H,e.VideoOverlay=eu,e.bind=l,e.bounds=tt,e.canvas=au,e.circle=Cp,e.circleMarker=Ap,e.control=gs,e.divIcon=kp,e.extend=s,e.featureGroup=Sp,e.geoJSON=tu,e.geoJson=Rp,e.gridLayer=zp,e.icon=Ep,e.imageOverlay=Ip,e.latLng=wt,e.latLngBounds=Q,e.layerGroup=Mp,e.map=ap,e.marker=Tp,e.point=at,e.polygon=Pp,e.polyline=Lp,e.popup=Op,e.rectangle=Hp,e.setOptions=y,e.stamp=u,e.svg=lu,e.svgOverlay=Np,e.tileLayer=ru,e.tooltip=Up,e.transformation=yt,e.version=n,e.videoOverlay=Dp;var Gp=window.L;e.noConflict=function(){return window.L=Gp,this},window.L=e})})(Wl,Wl.exports);var Qp=Wl.exports;const Me=xd(Qp),bt={bounds:null,zoneType:"rect",zonePts:null,wMm:200,dMm:200,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function bd(){const r=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:r("c-base")||"#eeebe6",terrainRes:Number(r("t-res"))||128,exag:Number(r("dp-exag")||r("t-exag"))||1,smooth:Number(r("t-smooth"))||1,baseH:Number(r("dp-base")||r("t-base-h"))||5,maxDim:Number(r("t-maxdim"))||200,elevZoom:Number(r("t-zoom"))||15,waterOn:t("water-on"),waterCol:r("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:r("road-col")||"#262626",buildOn:t("build-on"),buildCol:r("build-col")||"#9090a0",buildHS:Number(r("build-hs"))||1,gpxCol:r("gpx-col")||"#ff4500",gpxH:Number(r("gpx-h"))||1.2,gpxMW:Number(r("gpx-mw"))||1.5,gpxTW:Number(r("gpx-tw"))||3}}let qs=null,Gt,qe=null,Tn=null,gi=null,Ne=null,De=null,Dn=[],Je=[],Xe=null,un=null,ws=null,Zr="none",yr=[];const tm={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function em(r){r&&(qs=r);const t=Me.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=Me.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=Me.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"}),s=Me.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",{maxZoom:17,attribution:"© OpenTopoMap"}),o=Me.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",{maxZoom:19,attribution:"© CARTO"});Gt=Me.map("map",{center:[48.8584,2.2945],zoom:13,zoomControl:!1,layers:[t]}),Me.control.zoom({position:"topright"}).addTo(Gt),Me.control.layers({"Plan (OSM)":t,Satellite:e,Topographique:s,Voyager:o,"IGN (France)":n},{},{position:"topright"}).addTo(Gt),new ResizeObserver(()=>Gt.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>Gt.invalidateSize(),300),am(),rm(),lm(),cm(),om()}function xu(r,t){return[[r.lat,r.lng],[r.lat,t.lng],[t.lat,t.lng],[t.lat,r.lng]]}function bu(r,t){const e=(r.lat+t.lat)/2,n=Math.abs(t.lat-r.lat)*111320,s=Math.abs(t.lng-r.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),u=Math.min(r.lat,t.lat),d=Math.min(r.lng,t.lng);return[[u,d],[u,d+c],[u+l,d+c],[u+l,d]]}function wu(r,t,e=80){const n=r.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[r.lat+n*Math.cos(l)/111320,r.lng+n*Math.sin(l)/(111320*Math.cos(r.lat*Math.PI/180))]})}function Mu(r,t){const e=r.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[r.lat+e*Math.cos(o)/111320,r.lng+e*Math.sin(o)/(111320*Math.cos(r.lat*Math.PI/180))]})}function wd(r){Ne&&Ne!==r&&(De=null,Dn=[],Je=[],Xe&&(Gt.removeLayer(Xe),Xe=null),un&&(Gt.removeLayer(un),un=null)),Ne=r,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===r)}),Gt.getContainer().classList.toggle("dm",!!r);const t=document.getElementById("dch");t.style.display=r?"block":"none",r&&(t.textContent=tm[r]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=r==="trace"?"block":"none",r!=="trace"&&(e.textContent="0 points tracés"),!r){const n=document.getElementById("snap");n&&(n.style.display="none")}}function ea(r=!0){Xe&&(Gt.removeLayer(Xe),Xe=null),un&&(Gt.removeLayer(un),un=null),De=null,Dn=[],Je=[],r&&wd(null)}function na(r,t){return t?Gt.latLngToContainerPoint(r).distanceTo(Gt.latLngToContainerPoint(t)):9999}function Su(r){const t=[];Dn.length>2&&t.push(Dn[0]),Je.length>2&&t.push(Je[0]),gi&&t.push(gi.getLatLng());let e=null,n=9999;for(const s of t){const o=na(r,s);o<18&&o<n&&(n=o,e=s)}return e}function nm(r,t){const e=document.getElementById("snap");if(!e)return;if(!t||na(r,t)>18){e.style.display="none";return}const n=Gt.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function im(){document.getElementById("zone-controls")?.classList.add("visible"),Zl()}function Md(){document.getElementById("zone-controls")?.classList.remove("visible"),Sd("none")}function Zl(){if(!bt.bounds)return;const r=document.getElementById("zone-controls");if(!r)return;const t=Me.latLng(bt.bounds.maxLat,bt.bounds.maxLon),e=Gt.latLngToContainerPoint(t),n=40;r.style.left=e.x+10+"px",r.style.top=Math.max(10,e.y-n/2)+"px"}function Sd(r){Zr==="move"&&r!=="move"&&(Gt.dragging.enable(),Gt.getContainer().style.cursor=""),Zr=r,document.getElementById("zc-move")?.classList.toggle("active",r==="move"),r==="move"&&(Gt.dragging.disable(),Gt.getContainer().style.cursor="grab")}function Ed(r){qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const t=r.map(u=>u[0]),e=r.map(u=>u[1]);bt.bounds={minLat:Math.min(...t),maxLat:Math.max(...t),minLon:Math.min(...e),maxLon:Math.max(...e)};const n=(bt.bounds.minLat+bt.bounds.maxLat)/2,s=(bt.bounds.maxLon-bt.bounds.minLon)*Math.cos(n*Math.PI/180)*111320,o=(bt.bounds.maxLat-bt.bounds.minLat)*111320,c=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(o,s);bt.wMm=Math.round(s*c),bt.dMm=Math.round(o*c),qs?.()}function Eu(r){if(!bt.zonePts)return;const t=bt.zonePts.map(l=>l[0]),e=bt.zonePts.map(l=>l[1]),n=(Math.min(...t)+Math.max(...t))/2,s=(Math.min(...e)+Math.max(...e))/2,o=bt.zonePts.map(([l,c])=>[n+(l-n)*r,s+(c-s)*r]);bt.zonePts=o,Ed(o)}function rm(){document.getElementById("zc-delete")?.addEventListener("click",()=>{qe&&(Gt.removeLayer(qe),qe=null),bt.bounds=null,bt.zonePts=null,Md(),qs?.()}),document.getElementById("zc-zoom-in")?.addEventListener("click",()=>Eu(1.2)),document.getElementById("zc-zoom-out")?.addEventListener("click",()=>Eu(.8)),document.getElementById("zc-move")?.addEventListener("click",()=>{Sd(Zr==="move"?"none":"move")});let r=null;Gt.getContainer().addEventListener("mousedown",t=>{Zr!=="move"||!bt.zonePts||(r={x:t.clientX,y:t.clientY},yr=bt.zonePts.map(e=>[e[0],e[1]]),Gt.getContainer().style.cursor="grabbing",t.stopPropagation())}),document.addEventListener("mousemove",t=>{if(Zr!=="move"||!r||!yr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Me.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(Me.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=yr.map(([u,d])=>[u+o,d+l]);qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(c,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt)}),document.addEventListener("mouseup",t=>{if(Zr!=="move"||!r||!yr.length)return;const e=Gt.getContainer().getBoundingClientRect(),n=Gt.containerPointToLatLng(Me.point(r.x-e.left,r.y-e.top)),s=Gt.containerPointToLatLng(Me.point(t.clientX-e.left,t.clientY-e.top)),o=s.lat-n.lat,l=s.lng-n.lng,c=yr.map(([u,d])=>[u+o,d+l]);r=null,yr=[],bt.zonePts=c,Ed(c),Zl(),Gt.getContainer().style.cursor="grab"}),Gt.on("move zoom moveend zoomend",Zl)}function Ms(r,t){qe&&(Gt.removeLayer(qe),qe=null),qe=Me.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(Gt);const e=r.map(d=>d[0]),n=r.map(d=>d[1]);bt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},bt.zonePts=r,bt.zoneType=t;const s=(bt.bounds.minLat+bt.bounds.maxLat)/2,o=(bt.bounds.maxLon-bt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(bt.bounds.maxLat-bt.bounds.minLat)*111320,u=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);bt.realW=o,bt.realH=l,bt.wMm=Math.round(o*u),bt.dMm=Math.round(l*u),qs?.(),im(),ea()}function sm(){Tn&&(Gt.removeLayer(Tn),Tn=null),!(Je.length<2)&&(Tn=Me.polyline(Je,{color:"#ff0000",weight:4,opacity:.9}).addTo(Gt))}function Tu(r){const t=document.getElementById("snap");if(t&&(t.style.display="none"),un&&(Gt.removeLayer(un),un=null),r.length<2){ea();return}bt.gpxPoints=r.map(n=>({lat:n.lat,lon:n.lng})),Td(),Ad(`✏️ ${r.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),ea()}function Td(){Tn&&(Gt.removeLayer(Tn),Tn=null),!(bt.gpxPoints.length<2)&&(Tn=Me.polyline(bt.gpxPoints.map(r=>[r.lat,r.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(Gt))}function Ad(r){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=r,t.style.display="block")}function om(){Gt.on("mousemove",r=>{if(!Ne)return;const t=r.latlng,e=Su(t);nm(t,e??De);const n=e??t;if((Ne==="rect"||Ne==="sq")&&De){const s=Ne==="sq"?bu(De,n):xu(De,n);Xe?Xe.setLatLngs(s):Xe=Me.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(Gt)}else if((Ne==="circ"||Ne==="hex")&&De){const s=Ne==="circ"?wu(De,n):Mu(De,n);Xe?Xe.setLatLngs(s):Xe=Me.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(Gt)}else if(Ne==="poly"&&Dn.length>0){const s=[...Dn,n];Xe?Xe.setLatLngs(s):Xe=Me.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(Gt)}else if(Ne==="trace"&&Je.length>0){const s=[...Je,n];Xe?Xe.setLatLngs(s):Xe=Me.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(Gt)}}),Gt.on("click",r=>{if(!Ne)return;const t=r.latlng,e=Su(t),n=e??t;if(Ne==="rect"){if(!De){De=n;return}Ms(xu(De,n),"rect")}else if(Ne==="sq"){if(!De){De=n;return}Ms(bu(De,n),"rect")}else if(Ne==="circ"){if(!De){De=n;return}Ms(wu(De,n),"circ")}else if(Ne==="hex"){if(!De){De=n;return}Ms(Mu(De,n),"hex")}else if(Ne==="poly"){if(Dn.length>2&&na(t,Dn[0])<18){Ms(Dn.map(s=>[s.lat,s.lng]),"poly");return}Dn.push(n),Dn.length===1&&(un&&Gt.removeLayer(un),un=Me.circleMarker(Dn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt))}else Ne==="trace"&&(ws&&clearTimeout(ws),ws=setTimeout(()=>{if(Je.length>2&&na(t,Je[0])<18){Tu(Je);return}Je.push(e??t);const s=Je.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(un&&Gt.removeLayer(un),un=Me.circleMarker(Je[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(Gt)),sm()},220))}),Gt.on("dblclick",r=>{Ne==="trace"&&Je.length>=2&&(ws&&clearTimeout(ws),Tu(Je),r.originalEvent.preventDefault())})}function am(){["rect","sq","circ","hex","poly","trace"].forEach(r=>{document.getElementById("db-"+r)?.addEventListener("click",()=>{wd(Ne===r?null:r)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{ea(),qe&&(Gt.removeLayer(qe),qe=null),Tn&&(Gt.removeLayer(Tn),Tn=null),gi&&(Gt.removeLayer(gi),gi=null),bt.bounds=null,bt.zonePts=null,bt.gpxPoints=[],Je=[],Md();const r=document.getElementById("gpx-badge");r&&(r.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value=""),qs?.()}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!bt.bounds)return;const r=bt.bounds;Gt.fitBounds([[r.minLat,r.minLon],[r.maxLat,r.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!bt.gpxPoints.length)return;const r=bt.gpxPoints.map(e=>e.lat),t=bt.gpxPoints.map(e=>e.lon);Gt.fitBounds([[Math.min(...r),Math.min(...t)],[Math.max(...r),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function lm(){document.getElementById("gpx-file")?.addEventListener("change",function(){const r=this.files?.[0];if(!r)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(u=>({lat:parseFloat(u.getAttribute("lat")),lon:parseFloat(u.getAttribute("lon"))})).filter(u=>!isNaN(u.lat)&&!isNaN(u.lon));if(!o.length)return;bt.gpxPoints=o,Td(),Tn&&Gt.fitBounds(Tn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let u=1;u<o.length;u++){const f=(o[u].lat-o[u-1].lat)*Math.PI/180,p=(o[u].lon-o[u-1].lon)*Math.PI/180,_=Math.sin(f/2)**2+Math.cos(o[u-1].lat*Math.PI/180)*Math.cos(o[u].lat*Math.PI/180)*Math.sin(p/2)**2;l+=6371*2*Math.atan2(Math.sqrt(_),Math.sqrt(1-_))}Ad(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(r)})}let Au;function cm(){const r=document.getElementById("srch-input"),t=document.getElementById("srch-drop");r?.addEventListener("input",function(){clearTimeout(Au);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(Au=setTimeout(()=>um(e),120))}),r?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function um(r){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),u=this.dataset.bb.split(",").map(Number);gi&&(Gt.removeLayer(gi),gi=null),gi=Me.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(Gt),Gt.fitBounds([[u[0],u[2]],[u[1],u[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const hc="163",xr={ROTATE:0,DOLLY:1,PAN:2},br={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},hm=0,Cu=1,dm=2,Cd=1,fm=2,mi=3,Oi=0,xn=1,vn=2,Ii=0,$r=1,Lu=2,Pu=3,Ru=4,pm=5,Ji=100,mm=101,gm=102,_m=103,vm=104,ym=200,xm=201,bm=202,wm=203,Xl=204,ql=205,Mm=206,Sm=207,Em=208,Tm=209,Am=210,Cm=211,Lm=212,Pm=213,Rm=214,Im=0,Dm=1,Nm=2,ia=3,Om=4,Um=5,km=6,zm=7,dc=0,Bm=1,Fm=2,Di=0,Ld=1,Hm=2,Vm=3,Gm=4,Wm=5,Zm=6,Xm=7,Pd=300,es=301,ns=302,jl=303,Yl=304,ya=306,$l=1e3,nr=1001,Kl=1002,Nn=1003,qm=1004,bo=1005,Gn=1006,Qa=1007,ir=1008,Ni=1009,jm=1010,Ym=1011,Rd=1012,Id=1013,is=1014,Ri=1015,ra=1016,Dd=1017,Nd=1018,js=1020,$m=35902,Km=1021,Jm=1022,ni=1023,Qm=1024,tg=1025,Kr=1026,Gs=1027,eg=1028,Od=1029,ng=1030,Ud=1031,kd=1033,tl=33776,el=33777,nl=33778,il=33779,Iu=35840,Du=35841,Nu=35842,Ou=35843,zd=36196,Uu=37492,ku=37496,zu=37808,Bu=37809,Fu=37810,Hu=37811,Vu=37812,Gu=37813,Wu=37814,Zu=37815,Xu=37816,qu=37817,ju=37818,Yu=37819,$u=37820,Ku=37821,rl=36492,Ju=36494,Qu=36495,ig=36283,th=36284,eh=36285,nh=36286,rg=3200,sg=3201,fc=0,og=1,Pi="",Qn="srgb",ki="srgb-linear",pc="display-p3",xa="display-p3-linear",sa="linear",we="srgb",oa="rec709",aa="p3",wr=7680,ih=519,ag=512,lg=513,cg=514,Bd=515,ug=516,hg=517,dg=518,fg=519,rh=35044,sh="300 es",_i=2e3,la=2001;class cr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const en=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Us=Math.PI/180,Jl=180/Math.PI;function as(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(en[r&255]+en[r>>8&255]+en[r>>16&255]+en[r>>24&255]+"-"+en[t&255]+en[t>>8&255]+"-"+en[t>>16&15|64]+en[t>>24&255]+"-"+en[e&63|128]+en[e>>8&255]+"-"+en[e>>16&255]+en[e>>24&255]+en[n&255]+en[n>>8&255]+en[n>>16&255]+en[n>>24&255]).toLowerCase()}function Ye(r,t,e){return Math.max(t,Math.min(e,r))}function pg(r,t){return(r%t+t)%t}function sl(r,t,e){return(1-e)*r+e*t}function Ss(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function _n(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const mg={DEG2RAD:Us};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ce{constructor(t,e,n,s,o,l,c,u,d){ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,d)}set(t,e,n,s,o,l,c,u,d){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=u,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],u=n[6],d=n[1],f=n[4],p=n[7],_=n[2],m=n[5],x=n[8],y=s[0],g=s[3],v=s[6],S=s[1],w=s[4],E=s[7],N=s[2],U=s[5],O=s[8];return o[0]=l*y+c*S+u*N,o[3]=l*g+c*w+u*U,o[6]=l*v+c*E+u*O,o[1]=d*y+f*S+p*N,o[4]=d*g+f*w+p*U,o[7]=d*v+f*E+p*O,o[2]=_*y+m*S+x*N,o[5]=_*g+m*w+x*U,o[8]=_*v+m*E+x*O,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*o*f+n*c*u+s*o*d-s*l*u}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8],p=f*l-c*d,_=c*u-f*o,m=d*o-l*u,x=e*p+n*_+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return t[0]=p*y,t[1]=(s*d-f*n)*y,t[2]=(c*n-s*l)*y,t[3]=_*y,t[4]=(f*e-s*u)*y,t[5]=(s*o-c*e)*y,t[6]=m*y,t[7]=(n*u-d*e)*y,t[8]=(l*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const u=Math.cos(o),d=Math.sin(o);return this.set(n*u,n*d,-n*(u*l+d*c)+l+t,-s*d,s*u,-s*(-d*l+u*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(ol.makeScale(t,e)),this}rotate(t){return this.premultiply(ol.makeRotation(-t)),this}translate(t,e){return this.premultiply(ol.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ol=new ce;function Fd(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ca(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gg(){const r=ca("canvas");return r.style.display="block",r}const oh={};function _g(r){r in oh||(oh[r]=!0,console.warn(r))}const ah=new ce().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),lh=new ce().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),wo={[ki]:{transfer:sa,primaries:oa,toReference:r=>r,fromReference:r=>r},[Qn]:{transfer:we,primaries:oa,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[xa]:{transfer:sa,primaries:aa,toReference:r=>r.applyMatrix3(lh),fromReference:r=>r.applyMatrix3(ah)},[pc]:{transfer:we,primaries:aa,toReference:r=>r.convertSRGBToLinear().applyMatrix3(lh),fromReference:r=>r.applyMatrix3(ah).convertLinearToSRGB()}},vg=new Set([ki,xa]),_e={enabled:!0,_workingColorSpace:ki,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!vg.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=wo[t].toReference,s=wo[e].fromReference;return s(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return wo[r].primaries},getTransfer:function(r){return r===Pi?sa:wo[r].transfer}};function Jr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function al(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Mr;class yg{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Mr===void 0&&(Mr=ca("canvas")),Mr.width=t.width,Mr.height=t.height;const n=Mr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Mr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ca("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=Jr(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Jr(e[n]/255)*255):e[n]=Jr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let xg=0;class Hd{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=as(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push(ll(s[l].image)):o.push(ll(s[l]))}else o=ll(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function ll(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?yg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bg=0;class fn extends cr{constructor(t=fn.DEFAULT_IMAGE,e=fn.DEFAULT_MAPPING,n=nr,s=nr,o=Gn,l=ir,c=ni,u=Ni,d=fn.DEFAULT_ANISOTROPY,f=Pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bg++}),this.uuid=as(),this.name="",this.source=new Hd(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=u,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Pd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case $l:t.x=t.x-Math.floor(t.x);break;case nr:t.x=t.x<0?0:1;break;case Kl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case $l:t.y=t.y-Math.floor(t.y);break;case nr:t.y=t.y<0?0:1;break;case Kl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=Pd;fn.DEFAULT_ANISOTROPY=1;class $e{constructor(t=0,e=0,n=0,s=1){$e.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const u=t.elements,d=u[0],f=u[4],p=u[8],_=u[1],m=u[5],x=u[9],y=u[2],g=u[6],v=u[10];if(Math.abs(f-_)<.01&&Math.abs(p-y)<.01&&Math.abs(x-g)<.01){if(Math.abs(f+_)<.1&&Math.abs(p+y)<.1&&Math.abs(x+g)<.1&&Math.abs(d+m+v-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const w=(d+1)/2,E=(m+1)/2,N=(v+1)/2,U=(f+_)/4,O=(p+y)/4,F=(x+g)/4;return w>E&&w>N?w<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(w),s=U/n,o=O/n):E>N?E<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(E),n=U/s,o=F/s):N<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(N),n=O/o,s=F/o),this.set(n,s,o,e),this}let S=Math.sqrt((g-x)*(g-x)+(p-y)*(p-y)+(_-f)*(_-f));return Math.abs(S)<.001&&(S=1),this.x=(g-x)/S,this.y=(p-y)/S,this.z=(_-f)/S,this.w=Math.acos((d+m+v-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class wg extends cr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new $e(0,0,t,e),this.scissorTest=!1,this.viewport=new $e(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new fn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Hd(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sr extends wg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Vd extends fn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mg extends fn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Nn,this.minFilter=Nn,this.wrapR=nr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class or{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let u=n[s+0],d=n[s+1],f=n[s+2],p=n[s+3];const _=o[l+0],m=o[l+1],x=o[l+2],y=o[l+3];if(c===0){t[e+0]=u,t[e+1]=d,t[e+2]=f,t[e+3]=p;return}if(c===1){t[e+0]=_,t[e+1]=m,t[e+2]=x,t[e+3]=y;return}if(p!==y||u!==_||d!==m||f!==x){let g=1-c;const v=u*_+d*m+f*x+p*y,S=v>=0?1:-1,w=1-v*v;if(w>Number.EPSILON){const N=Math.sqrt(w),U=Math.atan2(N,v*S);g=Math.sin(g*U)/N,c=Math.sin(c*U)/N}const E=c*S;if(u=u*g+_*E,d=d*g+m*E,f=f*g+x*E,p=p*g+y*E,g===1-c){const N=1/Math.sqrt(u*u+d*d+f*f+p*p);u*=N,d*=N,f*=N,p*=N}}t[e]=u,t[e+1]=d,t[e+2]=f,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],u=n[s+1],d=n[s+2],f=n[s+3],p=o[l],_=o[l+1],m=o[l+2],x=o[l+3];return t[e]=c*x+f*p+u*m-d*_,t[e+1]=u*x+f*_+d*p-c*m,t[e+2]=d*x+f*m+c*_-u*p,t[e+3]=f*x-c*p-u*_-d*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,u=Math.sin,d=c(n/2),f=c(s/2),p=c(o/2),_=u(n/2),m=u(s/2),x=u(o/2);switch(l){case"XYZ":this._x=_*f*p+d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p-_*m*x;break;case"YXZ":this._x=_*f*p+d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p+_*m*x;break;case"ZXY":this._x=_*f*p-d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p-_*m*x;break;case"ZYX":this._x=_*f*p-d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p+_*m*x;break;case"YZX":this._x=_*f*p+d*m*x,this._y=d*m*p+_*f*x,this._z=d*f*x-_*m*p,this._w=d*f*p-_*m*x;break;case"XZY":this._x=_*f*p-d*m*x,this._y=d*m*p-_*f*x,this._z=d*f*x+_*m*p,this._w=d*f*p+_*m*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],u=e[9],d=e[2],f=e[6],p=e[10],_=n+c+p;if(_>0){const m=.5/Math.sqrt(_+1);this._w=.25/m,this._x=(f-u)*m,this._y=(o-d)*m,this._z=(l-s)*m}else if(n>c&&n>p){const m=2*Math.sqrt(1+n-c-p);this._w=(f-u)/m,this._x=.25*m,this._y=(s+l)/m,this._z=(o+d)/m}else if(c>p){const m=2*Math.sqrt(1+c-n-p);this._w=(o-d)/m,this._x=(s+l)/m,this._y=.25*m,this._z=(u+f)/m}else{const m=2*Math.sqrt(1+p-n-c);this._w=(l-s)/m,this._x=(o+d)/m,this._y=(u+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,u=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+s*d-o*u,this._y=s*f+l*u+o*c-n*d,this._z=o*f+l*d+n*u-s*c,this._w=l*f-n*c-s*u-o*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const u=1-c*c;if(u<=Number.EPSILON){const m=1-e;return this._w=m*l+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*o+e*this._z,this.normalize(),this}const d=Math.sqrt(u),f=Math.atan2(d,c),p=Math.sin((1-e)*f)/d,_=Math.sin(e*f)/d;return this._w=l*p+this._w*_,this._x=n*p+this._x*_,this._y=s*p+this._y*_,this._z=o*p+this._z*_,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class K{constructor(t=0,e=0,n=0){K.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ch.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ch.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,u=t.w,d=2*(l*s-c*n),f=2*(c*e-o*s),p=2*(o*n-l*e);return this.x=e+u*d+l*p-c*f,this.y=n+u*f+c*d-o*p,this.z=s+u*p+o*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,u=e.z;return this.x=s*u-o*c,this.y=o*l-n*u,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return cl.copy(this).projectOnVector(t),this.sub(cl)}reflect(t){return this.sub(cl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const cl=new K,ch=new or;class Ys{constructor(t=new K(1/0,1/0,1/0),e=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(zn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(zn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=zn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,zn):zn.fromBufferAttribute(o,l),zn.applyMatrix4(t.matrixWorld),this.expandByPoint(zn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Mo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Mo.copy(n.boundingBox)),Mo.applyMatrix4(t.matrixWorld),this.union(Mo)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,zn),zn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Es),So.subVectors(this.max,Es),Sr.subVectors(t.a,Es),Er.subVectors(t.b,Es),Tr.subVectors(t.c,Es),Mi.subVectors(Er,Sr),Si.subVectors(Tr,Er),Zi.subVectors(Sr,Tr);let e=[0,-Mi.z,Mi.y,0,-Si.z,Si.y,0,-Zi.z,Zi.y,Mi.z,0,-Mi.x,Si.z,0,-Si.x,Zi.z,0,-Zi.x,-Mi.y,Mi.x,0,-Si.y,Si.x,0,-Zi.y,Zi.x,0];return!ul(e,Sr,Er,Tr,So)||(e=[1,0,0,0,1,0,0,0,1],!ul(e,Sr,Er,Tr,So))?!1:(Eo.crossVectors(Mi,Si),e=[Eo.x,Eo.y,Eo.z],ul(e,Sr,Er,Tr,So))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,zn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(zn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const ci=[new K,new K,new K,new K,new K,new K,new K,new K],zn=new K,Mo=new Ys,Sr=new K,Er=new K,Tr=new K,Mi=new K,Si=new K,Zi=new K,Es=new K,So=new K,Eo=new K,Xi=new K;function ul(r,t,e,n,s){for(let o=0,l=r.length-3;o<=l;o+=3){Xi.fromArray(r,o);const c=s.x*Math.abs(Xi.x)+s.y*Math.abs(Xi.y)+s.z*Math.abs(Xi.z),u=t.dot(Xi),d=e.dot(Xi),f=n.dot(Xi);if(Math.max(-Math.max(u,d,f),Math.min(u,d,f))>c)return!1}return!0}const Sg=new Ys,Ts=new K,hl=new K;class ba{constructor(t=new K,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sg.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ts,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(hl)),this.expandByPoint(Ts.copy(t.center).sub(hl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ui=new K,dl=new K,To=new K,Ei=new K,fl=new K,Ao=new K,pl=new K;class wa{constructor(t=new K,e=new K(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ui)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=ui.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(ui.copy(this.origin).addScaledVector(this.direction,e),ui.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){dl.copy(t).add(e).multiplyScalar(.5),To.copy(e).sub(t).normalize(),Ei.copy(this.origin).sub(dl);const o=t.distanceTo(e)*.5,l=-this.direction.dot(To),c=Ei.dot(this.direction),u=-Ei.dot(To),d=Ei.lengthSq(),f=Math.abs(1-l*l);let p,_,m,x;if(f>0)if(p=l*u-c,_=l*c-u,x=o*f,p>=0)if(_>=-x)if(_<=x){const y=1/f;p*=y,_*=y,m=p*(p+l*_+2*c)+_*(l*p+_+2*u)+d}else _=o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+d;else _=-o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+d;else _<=-x?(p=Math.max(0,-(-l*o+c)),_=p>0?-o:Math.min(Math.max(-o,-u),o),m=-p*p+_*(_+2*u)+d):_<=x?(p=0,_=Math.min(Math.max(-o,-u),o),m=_*(_+2*u)+d):(p=Math.max(0,-(l*o+c)),_=p>0?o:Math.min(Math.max(-o,-u),o),m=-p*p+_*(_+2*u)+d);else _=l>0?-o:o,p=Math.max(0,-(l*_+c)),m=-p*p+_*(_+2*u)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(dl).addScaledVector(To,_),m}intersectSphere(t,e){ui.subVectors(t.center,this.origin);const n=ui.dot(this.direction),s=ui.dot(ui)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,u=n+l;return u<0?null:c<0?this.at(u,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,u;const d=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,_=this.origin;return d>=0?(n=(t.min.x-_.x)*d,s=(t.max.x-_.x)*d):(n=(t.max.x-_.x)*d,s=(t.min.x-_.x)*d),f>=0?(o=(t.min.y-_.y)*f,l=(t.max.y-_.y)*f):(o=(t.max.y-_.y)*f,l=(t.min.y-_.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),p>=0?(c=(t.min.z-_.z)*p,u=(t.max.z-_.z)*p):(c=(t.max.z-_.z)*p,u=(t.min.z-_.z)*p),n>u||c>s)||((c>n||n!==n)&&(n=c),(u<s||s!==s)&&(s=u),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,ui)!==null}intersectTriangle(t,e,n,s,o){fl.subVectors(e,t),Ao.subVectors(n,t),pl.crossVectors(fl,Ao);let l=this.direction.dot(pl),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;Ei.subVectors(this.origin,t);const u=c*this.direction.dot(Ao.crossVectors(Ei,Ao));if(u<0)return null;const d=c*this.direction.dot(fl.cross(Ei));if(d<0||u+d>l)return null;const f=-c*Ei.dot(pl);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Te{constructor(t,e,n,s,o,l,c,u,d,f,p,_,m,x,y,g){Te.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,u,d,f,p,_,m,x,y,g)}set(t,e,n,s,o,l,c,u,d,f,p,_,m,x,y,g){const v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=s,v[1]=o,v[5]=l,v[9]=c,v[13]=u,v[2]=d,v[6]=f,v[10]=p,v[14]=_,v[3]=m,v[7]=x,v[11]=y,v[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Te().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ar.setFromMatrixColumn(t,0).length(),o=1/Ar.setFromMatrixColumn(t,1).length(),l=1/Ar.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),u=Math.cos(s),d=Math.sin(s),f=Math.cos(o),p=Math.sin(o);if(t.order==="XYZ"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=-u*p,e[8]=d,e[1]=m+x*d,e[5]=_-y*d,e[9]=-c*u,e[2]=y-_*d,e[6]=x+m*d,e[10]=l*u}else if(t.order==="YXZ"){const _=u*f,m=u*p,x=d*f,y=d*p;e[0]=_+y*c,e[4]=x*c-m,e[8]=l*d,e[1]=l*p,e[5]=l*f,e[9]=-c,e[2]=m*c-x,e[6]=y+_*c,e[10]=l*u}else if(t.order==="ZXY"){const _=u*f,m=u*p,x=d*f,y=d*p;e[0]=_-y*c,e[4]=-l*p,e[8]=x+m*c,e[1]=m+x*c,e[5]=l*f,e[9]=y-_*c,e[2]=-l*d,e[6]=c,e[10]=l*u}else if(t.order==="ZYX"){const _=l*f,m=l*p,x=c*f,y=c*p;e[0]=u*f,e[4]=x*d-m,e[8]=_*d+y,e[1]=u*p,e[5]=y*d+_,e[9]=m*d-x,e[2]=-d,e[6]=c*u,e[10]=l*u}else if(t.order==="YZX"){const _=l*u,m=l*d,x=c*u,y=c*d;e[0]=u*f,e[4]=y-_*p,e[8]=x*p+m,e[1]=p,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=m*p+x,e[10]=_-y*p}else if(t.order==="XZY"){const _=l*u,m=l*d,x=c*u,y=c*d;e[0]=u*f,e[4]=-p,e[8]=d*f,e[1]=_*p+y,e[5]=l*f,e[9]=m*p-x,e[2]=x*p-m,e[6]=c*f,e[10]=y*p+_}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Eg,t,Tg)}lookAt(t,e,n){const s=this.elements;return bn.subVectors(t,e),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ti.crossVectors(n,bn),Ti.lengthSq()===0&&(Math.abs(n.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ti.crossVectors(n,bn)),Ti.normalize(),Co.crossVectors(bn,Ti),s[0]=Ti.x,s[4]=Co.x,s[8]=bn.x,s[1]=Ti.y,s[5]=Co.y,s[9]=bn.y,s[2]=Ti.z,s[6]=Co.z,s[10]=bn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],u=n[8],d=n[12],f=n[1],p=n[5],_=n[9],m=n[13],x=n[2],y=n[6],g=n[10],v=n[14],S=n[3],w=n[7],E=n[11],N=n[15],U=s[0],O=s[4],F=s[8],I=s[12],R=s[1],W=s[5],k=s[9],H=s[13],P=s[2],Z=s[6],nt=s[10],ot=s[14],j=s[3],rt=s[7],at=s[11],q=s[15];return o[0]=l*U+c*R+u*P+d*j,o[4]=l*O+c*W+u*Z+d*rt,o[8]=l*F+c*k+u*nt+d*at,o[12]=l*I+c*H+u*ot+d*q,o[1]=f*U+p*R+_*P+m*j,o[5]=f*O+p*W+_*Z+m*rt,o[9]=f*F+p*k+_*nt+m*at,o[13]=f*I+p*H+_*ot+m*q,o[2]=x*U+y*R+g*P+v*j,o[6]=x*O+y*W+g*Z+v*rt,o[10]=x*F+y*k+g*nt+v*at,o[14]=x*I+y*H+g*ot+v*q,o[3]=S*U+w*R+E*P+N*j,o[7]=S*O+w*W+E*Z+N*rt,o[11]=S*F+w*k+E*nt+N*at,o[15]=S*I+w*H+E*ot+N*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],u=t[9],d=t[13],f=t[2],p=t[6],_=t[10],m=t[14],x=t[3],y=t[7],g=t[11],v=t[15];return x*(+o*u*p-s*d*p-o*c*_+n*d*_+s*c*m-n*u*m)+y*(+e*u*m-e*d*_+o*l*_-s*l*m+s*d*f-o*u*f)+g*(+e*d*p-e*c*m-o*l*p+n*l*m+o*c*f-n*d*f)+v*(-s*c*f-e*u*p+e*c*_+s*l*p-n*l*_+n*u*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],u=t[6],d=t[7],f=t[8],p=t[9],_=t[10],m=t[11],x=t[12],y=t[13],g=t[14],v=t[15],S=p*g*d-y*_*d+y*u*m-c*g*m-p*u*v+c*_*v,w=x*_*d-f*g*d-x*u*m+l*g*m+f*u*v-l*_*v,E=f*y*d-x*p*d+x*c*m-l*y*m-f*c*v+l*p*v,N=x*p*u-f*y*u-x*c*_+l*y*_+f*c*g-l*p*g,U=e*S+n*w+s*E+o*N;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const O=1/U;return t[0]=S*O,t[1]=(y*_*o-p*g*o-y*s*m+n*g*m+p*s*v-n*_*v)*O,t[2]=(c*g*o-y*u*o+y*s*d-n*g*d-c*s*v+n*u*v)*O,t[3]=(p*u*o-c*_*o-p*s*d+n*_*d+c*s*m-n*u*m)*O,t[4]=w*O,t[5]=(f*g*o-x*_*o+x*s*m-e*g*m-f*s*v+e*_*v)*O,t[6]=(x*u*o-l*g*o-x*s*d+e*g*d+l*s*v-e*u*v)*O,t[7]=(l*_*o-f*u*o+f*s*d-e*_*d-l*s*m+e*u*m)*O,t[8]=E*O,t[9]=(x*p*o-f*y*o-x*n*m+e*y*m+f*n*v-e*p*v)*O,t[10]=(l*y*o-x*c*o+x*n*d-e*y*d-l*n*v+e*c*v)*O,t[11]=(f*c*o-l*p*o-f*n*d+e*p*d+l*n*m-e*c*m)*O,t[12]=N*O,t[13]=(f*y*s-x*p*s+x*n*_-e*y*_-f*n*g+e*p*g)*O,t[14]=(x*c*s-l*y*s-x*n*u+e*y*u+l*n*g-e*c*g)*O,t[15]=(l*p*s-f*c*s+f*n*u-e*p*u-l*n*_+e*c*_)*O,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,u=t.z,d=o*l,f=o*c;return this.set(d*l+n,d*c-s*u,d*u+s*c,0,d*c+s*u,f*c+n,f*u-s*l,0,d*u-s*c,f*u+s*l,o*u*u+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,u=e._w,d=o+o,f=l+l,p=c+c,_=o*d,m=o*f,x=o*p,y=l*f,g=l*p,v=c*p,S=u*d,w=u*f,E=u*p,N=n.x,U=n.y,O=n.z;return s[0]=(1-(y+v))*N,s[1]=(m+E)*N,s[2]=(x-w)*N,s[3]=0,s[4]=(m-E)*U,s[5]=(1-(_+v))*U,s[6]=(g+S)*U,s[7]=0,s[8]=(x+w)*O,s[9]=(g-S)*O,s[10]=(1-(_+y))*O,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=Ar.set(s[0],s[1],s[2]).length();const l=Ar.set(s[4],s[5],s[6]).length(),c=Ar.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Bn.copy(this);const d=1/o,f=1/l,p=1/c;return Bn.elements[0]*=d,Bn.elements[1]*=d,Bn.elements[2]*=d,Bn.elements[4]*=f,Bn.elements[5]*=f,Bn.elements[6]*=f,Bn.elements[8]*=p,Bn.elements[9]*=p,Bn.elements[10]*=p,e.setFromRotationMatrix(Bn),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=_i){const u=this.elements,d=2*o/(e-t),f=2*o/(n-s),p=(e+t)/(e-t),_=(n+s)/(n-s);let m,x;if(c===_i)m=-(l+o)/(l-o),x=-2*l*o/(l-o);else if(c===la)m=-l/(l-o),x=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return u[0]=d,u[4]=0,u[8]=p,u[12]=0,u[1]=0,u[5]=f,u[9]=_,u[13]=0,u[2]=0,u[6]=0,u[10]=m,u[14]=x,u[3]=0,u[7]=0,u[11]=-1,u[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=_i){const u=this.elements,d=1/(e-t),f=1/(n-s),p=1/(l-o),_=(e+t)*d,m=(n+s)*f;let x,y;if(c===_i)x=(l+o)*p,y=-2*p;else if(c===la)x=o*p,y=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return u[0]=2*d,u[4]=0,u[8]=0,u[12]=-_,u[1]=0,u[5]=2*f,u[9]=0,u[13]=-m,u[2]=0,u[6]=0,u[10]=y,u[14]=-x,u[3]=0,u[7]=0,u[11]=0,u[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ar=new K,Bn=new Te,Eg=new K(0,0,0),Tg=new K(1,1,1),Ti=new K,Co=new K,bn=new K,uh=new Te,hh=new or;class qn{constructor(t=0,e=0,n=0,s=qn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],u=s[1],d=s[5],f=s[9],p=s[2],_=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(_,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,m),this._z=Math.atan2(u,d)):(this._y=Math.atan2(-p,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(u,o));break;case"ZYX":this._y=Math.asin(-Ye(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(_,m),this._z=Math.atan2(u,o)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-p,o)):(this._x=0,this._y=Math.atan2(c,m));break;case"XZY":this._z=Math.asin(-Ye(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(_,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return uh.makeRotationFromQuaternion(t),this.setFromRotationMatrix(uh,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return hh.setFromEuler(this),this.setFromQuaternion(hh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qn.DEFAULT_ORDER="XYZ";class mc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ag=0;const dh=new K,Cr=new or,hi=new Te,Lo=new K,As=new K,Cg=new K,Lg=new or,fh=new K(1,0,0),ph=new K(0,1,0),mh=new K(0,0,1),gh={type:"added"},Pg={type:"removed"},Lr={type:"childadded",child:null},ml={type:"childremoved",child:null};class Qe extends cr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=as(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Qe.DEFAULT_UP.clone();const t=new K,e=new qn,n=new or,s=new K(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Te},normalMatrix:{value:new ce}}),this.matrix=new Te,this.matrixWorld=new Te,this.matrixAutoUpdate=Qe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Cr.setFromAxisAngle(t,e),this.quaternion.multiply(Cr),this}rotateOnWorldAxis(t,e){return Cr.setFromAxisAngle(t,e),this.quaternion.premultiply(Cr),this}rotateX(t){return this.rotateOnAxis(fh,t)}rotateY(t){return this.rotateOnAxis(ph,t)}rotateZ(t){return this.rotateOnAxis(mh,t)}translateOnAxis(t,e){return dh.copy(t).applyQuaternion(this.quaternion),this.position.add(dh.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(fh,t)}translateY(t){return this.translateOnAxis(ph,t)}translateZ(t){return this.translateOnAxis(mh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(hi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Lo.copy(t):Lo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),As.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hi.lookAt(As,Lo,this.up):hi.lookAt(Lo,As,this.up),this.quaternion.setFromRotationMatrix(hi),s&&(hi.extractRotation(s.matrixWorld),Cr.setFromRotationMatrix(hi),this.quaternion.premultiply(Cr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gh),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Pg),ml.child=t,this.dispatchEvent(ml),ml.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),hi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),hi.multiply(t.parent.matrixWorld)),t.applyMatrix4(hi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gh),Lr.child=t,this.dispatchEvent(Lr),Lr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,t,Cg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(As,Lg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,u){return c[u.uuid]===void 0&&(c[u.uuid]=u.toJSON(t)),u.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const u=c.shapes;if(Array.isArray(u))for(let d=0,f=u.length;d<f;d++){const p=u[d];o(t.shapes,p)}else o(t.shapes,u)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let u=0,d=this.material.length;u<d;u++)c.push(o(t.materials,this.material[u]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const u=this.animations[c];s.animations.push(o(t.animations,u))}}if(e){const c=l(t.geometries),u=l(t.materials),d=l(t.textures),f=l(t.images),p=l(t.shapes),_=l(t.skeletons),m=l(t.animations),x=l(t.nodes);c.length>0&&(n.geometries=c),u.length>0&&(n.materials=u),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),p.length>0&&(n.shapes=p),_.length>0&&(n.skeletons=_),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function l(c){const u=[];for(const d in c){const f=c[d];delete f.metadata,u.push(f)}return u}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Qe.DEFAULT_UP=new K(0,1,0);Qe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Qe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new K,di=new K,gl=new K,fi=new K,Pr=new K,Rr=new K,_h=new K,_l=new K,vl=new K,yl=new K;class Wn{constructor(t=new K,e=new K,n=new K){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Fn.subVectors(t,e),s.cross(Fn);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){Fn.subVectors(s,e),di.subVectors(n,e),gl.subVectors(t,e);const l=Fn.dot(Fn),c=Fn.dot(di),u=Fn.dot(gl),d=di.dot(di),f=di.dot(gl),p=l*d-c*c;if(p===0)return o.set(0,0,0),null;const _=1/p,m=(d*u-c*f)*_,x=(l*f-c*u)*_;return o.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,fi)===null?!1:fi.x>=0&&fi.y>=0&&fi.x+fi.y<=1}static getInterpolation(t,e,n,s,o,l,c,u){return this.getBarycoord(t,e,n,s,fi)===null?(u.x=0,u.y=0,"z"in u&&(u.z=0),"w"in u&&(u.w=0),null):(u.setScalar(0),u.addScaledVector(o,fi.x),u.addScaledVector(l,fi.y),u.addScaledVector(c,fi.z),u)}static isFrontFacing(t,e,n,s){return Fn.subVectors(n,e),di.subVectors(t,e),Fn.cross(di).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Fn.subVectors(this.c,this.b),di.subVectors(this.a,this.b),Fn.cross(di).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Wn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Wn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Wn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Wn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Wn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;Pr.subVectors(s,n),Rr.subVectors(o,n),_l.subVectors(t,n);const u=Pr.dot(_l),d=Rr.dot(_l);if(u<=0&&d<=0)return e.copy(n);vl.subVectors(t,s);const f=Pr.dot(vl),p=Rr.dot(vl);if(f>=0&&p<=f)return e.copy(s);const _=u*p-f*d;if(_<=0&&u>=0&&f<=0)return l=u/(u-f),e.copy(n).addScaledVector(Pr,l);yl.subVectors(t,o);const m=Pr.dot(yl),x=Rr.dot(yl);if(x>=0&&m<=x)return e.copy(o);const y=m*d-u*x;if(y<=0&&d>=0&&x<=0)return c=d/(d-x),e.copy(n).addScaledVector(Rr,c);const g=f*x-m*p;if(g<=0&&p-f>=0&&m-x>=0)return _h.subVectors(o,s),c=(p-f)/(p-f+(m-x)),e.copy(s).addScaledVector(_h,c);const v=1/(g+y+_);return l=y*v,c=_*v,e.copy(n).addScaledVector(Pr,l).addScaledVector(Rr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Gd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ai={h:0,s:0,l:0},Po={h:0,s:0,l:0};function xl(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=_e.workingColorSpace){return this.r=t,this.g=e,this.b=n,_e.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=_e.workingColorSpace){if(t=pg(t,1),e=Ye(e,0,1),n=Ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=xl(l,o,t+1/3),this.g=xl(l,o,t),this.b=xl(l,o,t-1/3)}return _e.toWorkingColorSpace(this,s),this}setStyle(t,e=Qn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qn){const n=Gd[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Jr(t.r),this.g=Jr(t.g),this.b=Jr(t.b),this}copyLinearToSRGB(t){return this.r=al(t.r),this.g=al(t.g),this.b=al(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qn){return _e.fromWorkingColorSpace(nn.copy(this),t),Math.round(Ye(nn.r*255,0,255))*65536+Math.round(Ye(nn.g*255,0,255))*256+Math.round(Ye(nn.b*255,0,255))}getHexString(t=Qn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=_e.workingColorSpace){_e.fromWorkingColorSpace(nn.copy(this),e);const n=nn.r,s=nn.g,o=nn.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let u,d;const f=(c+l)/2;if(c===l)u=0,d=0;else{const p=l-c;switch(d=f<=.5?p/(l+c):p/(2-l-c),l){case n:u=(s-o)/p+(s<o?6:0);break;case s:u=(o-n)/p+2;break;case o:u=(n-s)/p+4;break}u/=6}return t.h=u,t.s=d,t.l=f,t}getRGB(t,e=_e.workingColorSpace){return _e.fromWorkingColorSpace(nn.copy(this),e),t.r=nn.r,t.g=nn.g,t.b=nn.b,t}getStyle(t=Qn){_e.fromWorkingColorSpace(nn.copy(this),t);const e=nn.r,n=nn.g,s=nn.b;return t!==Qn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ai),this.setHSL(Ai.h+t,Ai.s+e,Ai.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ai),t.getHSL(Po);const n=sl(Ai.h,Po.h,e),s=sl(Ai.s,Po.s,e),o=sl(Ai.l,Po.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new Qt;Qt.NAMES=Gd;let Rg=0;class ur extends cr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rg++}),this.uuid=as(),this.name="",this.type="Material",this.blending=$r,this.side=Oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xl,this.blendDst=ql,this.blendEquation=Ji,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qt(0,0,0),this.blendAlpha=0,this.depthFunc=ia,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ih,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wr,this.stencilZFail=wr,this.stencilZPass=wr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$r&&(n.blending=this.blending),this.side!==Oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xl&&(n.blendSrc=this.blendSrc),this.blendDst!==ql&&(n.blendDst=this.blendDst),this.blendEquation!==Ji&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ia&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ih&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Wd extends ur{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Fe=new K,Ro=new vt;class An{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=rh,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return _g("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ro.fromBufferAttribute(this,e),Ro.applyMatrix3(t),this.setXY(e,Ro.x,Ro.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ss(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=_n(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ss(e,this.array)),e}setX(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ss(e,this.array)),e}setY(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ss(e,this.array)),e}setZ(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ss(e,this.array)),e}setW(t,e){return this.normalized&&(e=_n(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=_n(e,this.array),n=_n(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=_n(e,this.array),n=_n(n,this.array),s=_n(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=_n(e,this.array),n=_n(n,this.array),s=_n(s,this.array),o=_n(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==rh&&(t.usage=this.usage),t}}class Zd extends An{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Xd extends An{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class me extends An{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ig=0;const In=new Te,bl=new Qe,Ir=new K,wn=new Ys,Cs=new Ys,Ze=new K;class Oe extends cr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=as(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fd(t)?Xd:Zd)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ce().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,e,n){return In.makeTranslation(t,e,n),this.applyMatrix4(In),this}scale(t,e,n){return In.makeScale(t,e,n),this.applyMatrix4(In),this}lookAt(t){return bl.lookAt(t),bl.updateMatrix(),this.applyMatrix4(bl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ir).negate(),this.translate(Ir.x,Ir.y,Ir.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new me(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];wn.setFromBufferAttribute(o),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,wn.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,wn.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(wn.min),this.boundingBox.expandByPoint(wn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ba);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new K,1/0);return}if(t){const n=this.boundingSphere.center;if(wn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];Cs.setFromBufferAttribute(c),this.morphTargetsRelative?(Ze.addVectors(wn.min,Cs.min),wn.expandByPoint(Ze),Ze.addVectors(wn.max,Cs.max),wn.expandByPoint(Ze)):(wn.expandByPoint(Cs.min),wn.expandByPoint(Cs.max))}wn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)Ze.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Ze));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],u=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)Ze.fromBufferAttribute(c,d),u&&(Ir.fromBufferAttribute(t,d),Ze.add(Ir)),s=Math.max(s,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],u=[];for(let F=0;F<n.count;F++)c[F]=new K,u[F]=new K;const d=new K,f=new K,p=new K,_=new vt,m=new vt,x=new vt,y=new K,g=new K;function v(F,I,R){d.fromBufferAttribute(n,F),f.fromBufferAttribute(n,I),p.fromBufferAttribute(n,R),_.fromBufferAttribute(o,F),m.fromBufferAttribute(o,I),x.fromBufferAttribute(o,R),f.sub(d),p.sub(d),m.sub(_),x.sub(_);const W=1/(m.x*x.y-x.x*m.y);isFinite(W)&&(y.copy(f).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(W),g.copy(p).multiplyScalar(m.x).addScaledVector(f,-x.x).multiplyScalar(W),c[F].add(y),c[I].add(y),c[R].add(y),u[F].add(g),u[I].add(g),u[R].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let F=0,I=S.length;F<I;++F){const R=S[F],W=R.start,k=R.count;for(let H=W,P=W+k;H<P;H+=3)v(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const w=new K,E=new K,N=new K,U=new K;function O(F){N.fromBufferAttribute(s,F),U.copy(N);const I=c[F];w.copy(I),w.sub(N.multiplyScalar(N.dot(I))).normalize(),E.crossVectors(U,I);const W=E.dot(u[F])<0?-1:1;l.setXYZW(F,w.x,w.y,w.z,W)}for(let F=0,I=S.length;F<I;++F){const R=S[F],W=R.start,k=R.count;for(let H=W,P=W+k;H<P;H+=3)O(t.getX(H+0)),O(t.getX(H+1)),O(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let _=0,m=n.count;_<m;_++)n.setXYZ(_,0,0,0);const s=new K,o=new K,l=new K,c=new K,u=new K,d=new K,f=new K,p=new K;if(t)for(let _=0,m=t.count;_<m;_+=3){const x=t.getX(_+0),y=t.getX(_+1),g=t.getX(_+2);s.fromBufferAttribute(e,x),o.fromBufferAttribute(e,y),l.fromBufferAttribute(e,g),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),c.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,g),c.add(f),u.add(f),d.add(f),n.setXYZ(x,c.x,c.y,c.z),n.setXYZ(y,u.x,u.y,u.z),n.setXYZ(g,d.x,d.y,d.z)}else for(let _=0,m=e.count;_<m;_+=3)s.fromBufferAttribute(e,_+0),o.fromBufferAttribute(e,_+1),l.fromBufferAttribute(e,_+2),f.subVectors(l,o),p.subVectors(s,o),f.cross(p),n.setXYZ(_+0,f.x,f.y,f.z),n.setXYZ(_+1,f.x,f.y,f.z),n.setXYZ(_+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(c,u){const d=c.array,f=c.itemSize,p=c.normalized,_=new d.constructor(u.length*f);let m=0,x=0;for(let y=0,g=u.length;y<g;y++){c.isInterleavedBufferAttribute?m=u[y]*c.data.stride+c.offset:m=u[y]*f;for(let v=0;v<f;v++)_[x++]=d[m++]}return new An(_,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Oe,n=this.index.array,s=this.attributes;for(const c in s){const u=s[c],d=t(u,n);e.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const u=[],d=o[c];for(let f=0,p=d.length;f<p;f++){const _=d[f],m=t(_,n);u.push(m)}e.morphAttributes[c]=u}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,u=l.length;c<u;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const u=this.parameters;for(const d in u)u[d]!==void 0&&(t[d]=u[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const u in n){const d=n[u];t.data.attributes[u]=d.toJSON(t.data)}const s={};let o=!1;for(const u in this.morphAttributes){const d=this.morphAttributes[u],f=[];for(let p=0,_=d.length;p<_;p++){const m=d[p];f.push(m.toJSON(t.data))}f.length>0&&(s[u]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const d in s){const f=s[d];this.setAttribute(d,f.clone(e))}const o=t.morphAttributes;for(const d in o){const f=[],p=o[d];for(let _=0,m=p.length;_<m;_++)f.push(p[_].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const p=l[d];this.addGroup(p.start,p.count,p.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const u=t.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vh=new Te,qi=new wa,Io=new ba,yh=new K,Dr=new K,Nr=new K,Or=new K,wl=new K,Do=new K,No=new vt,Oo=new vt,Uo=new vt,xh=new K,bh=new K,wh=new K,ko=new K,zo=new K;class Ie extends Qe{constructor(t=new Oe,e=new Wd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){Do.set(0,0,0);for(let u=0,d=o.length;u<d;u++){const f=c[u],p=o[u];f!==0&&(wl.fromBufferAttribute(p,t),l?Do.addScaledVector(wl,f):Do.addScaledVector(wl.sub(e),f))}e.add(Do)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Io.copy(n.boundingSphere),Io.applyMatrix4(o),qi.copy(t.ray).recast(t.near),!(Io.containsPoint(qi.origin)===!1&&(qi.intersectSphere(Io,yh)===null||qi.origin.distanceToSquared(yh)>(t.far-t.near)**2))&&(vh.copy(o).invert(),qi.copy(t.ray).applyMatrix4(vh),!(n.boundingBox!==null&&qi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qi)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,u=o.attributes.position,d=o.attributes.uv,f=o.attributes.uv1,p=o.attributes.normal,_=o.groups,m=o.drawRange;if(c!==null)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(c.count,Math.min(g.start+g.count,m.start+m.count));for(let E=S,N=w;E<N;E+=3){const U=c.getX(E),O=c.getX(E+1),F=c.getX(E+2);s=Bo(this,v,t,n,d,f,p,U,O,F),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(c.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=c.getX(g),w=c.getX(g+1),E=c.getX(g+2);s=Bo(this,l,t,n,d,f,p,S,w,E),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(u!==void 0)if(Array.isArray(l))for(let x=0,y=_.length;x<y;x++){const g=_[x],v=l[g.materialIndex],S=Math.max(g.start,m.start),w=Math.min(u.count,Math.min(g.start+g.count,m.start+m.count));for(let E=S,N=w;E<N;E+=3){const U=E,O=E+1,F=E+2;s=Bo(this,v,t,n,d,f,p,U,O,F),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const x=Math.max(0,m.start),y=Math.min(u.count,m.start+m.count);for(let g=x,v=y;g<v;g+=3){const S=g,w=g+1,E=g+2;s=Bo(this,l,t,n,d,f,p,S,w,E),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Dg(r,t,e,n,s,o,l,c){let u;if(t.side===xn?u=n.intersectTriangle(l,o,s,!0,c):u=n.intersectTriangle(s,o,l,t.side===Oi,c),u===null)return null;zo.copy(c),zo.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(zo);return d<e.near||d>e.far?null:{distance:d,point:zo.clone(),object:r}}function Bo(r,t,e,n,s,o,l,c,u,d){r.getVertexPosition(c,Dr),r.getVertexPosition(u,Nr),r.getVertexPosition(d,Or);const f=Dg(r,t,e,n,Dr,Nr,Or,ko);if(f){s&&(No.fromBufferAttribute(s,c),Oo.fromBufferAttribute(s,u),Uo.fromBufferAttribute(s,d),f.uv=Wn.getInterpolation(ko,Dr,Nr,Or,No,Oo,Uo,new vt)),o&&(No.fromBufferAttribute(o,c),Oo.fromBufferAttribute(o,u),Uo.fromBufferAttribute(o,d),f.uv1=Wn.getInterpolation(ko,Dr,Nr,Or,No,Oo,Uo,new vt)),l&&(xh.fromBufferAttribute(l,c),bh.fromBufferAttribute(l,u),wh.fromBufferAttribute(l,d),f.normal=Wn.getInterpolation(ko,Dr,Nr,Or,xh,bh,wh,new K),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const p={a:c,b:u,c:d,normal:new K,materialIndex:0};Wn.getNormal(Dr,Nr,Or,p.normal),f.face=p}return f}class je extends Oe{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const u=[],d=[],f=[],p=[];let _=0,m=0;x("z","y","x",-1,-1,n,e,t,l,o,0),x("z","y","x",1,-1,n,e,-t,l,o,1),x("x","z","y",1,1,t,n,e,s,l,2),x("x","z","y",1,-1,t,n,-e,s,l,3),x("x","y","z",1,-1,t,e,n,s,o,4),x("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(u),this.setAttribute("position",new me(d,3)),this.setAttribute("normal",new me(f,3)),this.setAttribute("uv",new me(p,2));function x(y,g,v,S,w,E,N,U,O,F,I){const R=E/O,W=N/F,k=E/2,H=N/2,P=U/2,Z=O+1,nt=F+1;let ot=0,j=0;const rt=new K;for(let at=0;at<nt;at++){const q=at*W-H;for(let tt=0;tt<Z;tt++){const Lt=tt*R-k;rt[y]=Lt*S,rt[g]=q*w,rt[v]=P,d.push(rt.x,rt.y,rt.z),rt[y]=0,rt[g]=0,rt[v]=U>0?1:-1,f.push(rt.x,rt.y,rt.z),p.push(tt/O),p.push(1-at/F),ot+=1}}for(let at=0;at<F;at++)for(let q=0;q<O;q++){const tt=_+q+Z*at,Lt=_+q+Z*(at+1),Q=_+(q+1)+Z*(at+1),it=_+(q+1)+Z*at;u.push(tt,Lt,it),u.push(Lt,Q,it),j+=6}c.addGroup(m,j,I),m+=j,_+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new je(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function rs(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function cn(r){const t={};for(let e=0;e<r.length;e++){const n=rs(r[e]);for(const s in n)t[s]=n[s]}return t}function Ng(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function qd(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}const Og={clone:rs,merge:cn};var Ug=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ui extends ur{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ug,this.fragmentShader=kg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=rs(t.uniforms),this.uniformsGroups=Ng(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class jd extends Qe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Te,this.projectionMatrix=new Te,this.projectionMatrixInverse=new Te,this.coordinateSystem=_i}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ci=new K,Mh=new vt,Sh=new vt;class Sn extends jd{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Jl*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Us*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Jl*2*Math.atan(Math.tan(Us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z),Ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ci.x,Ci.y).multiplyScalar(-t/Ci.z)}getViewSize(t,e){return this.getViewBounds(t,Mh,Sh),e.subVectors(Sh,Mh)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Us*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const u=l.fullWidth,d=l.fullHeight;o+=l.offsetX*s/u,e-=l.offsetY*n/d,s*=l.width/u,n*=l.height/d}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ur=-90,kr=1;class zg extends Qe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Sn(Ur,kr,t,e);s.layers=this.layers,this.add(s);const o=new Sn(Ur,kr,t,e);o.layers=this.layers,this.add(o);const l=new Sn(Ur,kr,t,e);l.layers=this.layers,this.add(l);const c=new Sn(Ur,kr,t,e);c.layers=this.layers,this.add(c);const u=new Sn(Ur,kr,t,e);u.layers=this.layers,this.add(u);const d=new Sn(Ur,kr,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,u]=e;for(const d of e)this.remove(d);if(t===_i)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),u.up.set(0,1,0),u.lookAt(0,0,-1);else if(t===la)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),u.up.set(0,-1,0),u.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,u,d,f]=this.children,p=t.getRenderTarget(),_=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,u),t.setRenderTarget(n,4,s),t.render(e,d),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(p,_,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Yd extends fn{constructor(t,e,n,s,o,l,c,u,d,f){t=t!==void 0?t:[],e=e!==void 0?e:es,super(t,e,n,s,o,l,c,u,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Bg extends sr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Yd(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Gn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new je(5,5,5),o=new Ui({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xn,blending:Ii});o.uniforms.tEquirect.value=e;const l=new Ie(s,o),c=e.minFilter;return e.minFilter===ir&&(e.minFilter=Gn),new zg(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const Ml=new K,Fg=new K,Hg=new ce;class Li{constructor(t=new K(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ml.subVectors(n,e).cross(Fg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ml),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Hg.getNormalMatrix(t),s=this.coplanarPoint(Ml).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ji=new ba,Fo=new K;class gc{constructor(t=new Li,e=new Li,n=new Li,s=new Li,o=new Li,l=new Li){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=_i){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],u=s[3],d=s[4],f=s[5],p=s[6],_=s[7],m=s[8],x=s[9],y=s[10],g=s[11],v=s[12],S=s[13],w=s[14],E=s[15];if(n[0].setComponents(u-o,_-d,g-m,E-v).normalize(),n[1].setComponents(u+o,_+d,g+m,E+v).normalize(),n[2].setComponents(u+l,_+f,g+x,E+S).normalize(),n[3].setComponents(u-l,_-f,g-x,E-S).normalize(),n[4].setComponents(u-c,_-p,g-y,E-w).normalize(),e===_i)n[5].setComponents(u+c,_+p,g+y,E+w).normalize();else if(e===la)n[5].setComponents(c,p,y,w).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ji.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ji.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ji)}intersectsSprite(t){return ji.center.set(0,0,0),ji.radius=.7071067811865476,ji.applyMatrix4(t.matrixWorld),this.intersectsSphere(ji)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Fo.x=s.normal.x>0?t.max.x:t.min.x,Fo.y=s.normal.y>0?t.max.y:t.min.y,Fo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $d(){let r=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){r=o}}}function Vg(r){const t=new WeakMap;function e(c,u){const d=c.array,f=c.usage,p=d.byteLength,_=r.createBuffer();r.bindBuffer(u,_),r.bufferData(u,d,f),c.onUploadCallback();let m;if(d instanceof Float32Array)m=r.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?m=r.HALF_FLOAT:m=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)m=r.SHORT;else if(d instanceof Uint32Array)m=r.UNSIGNED_INT;else if(d instanceof Int32Array)m=r.INT;else if(d instanceof Int8Array)m=r.BYTE;else if(d instanceof Uint8Array)m=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)m=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:_,type:m,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:p}}function n(c,u,d){const f=u.array,p=u._updateRange,_=u.updateRanges;if(r.bindBuffer(d,c),p.count===-1&&_.length===0&&r.bufferSubData(d,0,f),_.length!==0){for(let m=0,x=_.length;m<x;m++){const y=_[m];r.bufferSubData(d,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}u.clearUpdateRanges()}p.count!==-1&&(r.bufferSubData(d,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count),p.count=-1),u.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const u=t.get(c);u&&(r.deleteBuffer(u.buffer),t.delete(c))}function l(c,u){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,u),d.version=c.version}}return{get:s,remove:o,update:l}}class $s extends Oe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),u=Math.floor(s),d=c+1,f=u+1,p=t/c,_=e/u,m=[],x=[],y=[],g=[];for(let v=0;v<f;v++){const S=v*_-l;for(let w=0;w<d;w++){const E=w*p-o;x.push(E,-S,0),y.push(0,0,1),g.push(w/c),g.push(1-v/u)}}for(let v=0;v<u;v++)for(let S=0;S<c;S++){const w=S+d*v,E=S+d*(v+1),N=S+1+d*(v+1),U=S+1+d*v;m.push(w,E,U),m.push(E,N,U)}this.setIndex(m),this.setAttribute("position",new me(x,3)),this.setAttribute("normal",new me(y,3)),this.setAttribute("uv",new me(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $s(t.width,t.height,t.widthSegments,t.heightSegments)}}var Gg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wg=`#ifdef USE_ALPHAHASH
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
#endif`,Zg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Xg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,qg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,jg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Yg=`#ifdef USE_AOMAP
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
#endif`,$g=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Kg=`#ifdef USE_BATCHING
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
#endif`,Jg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Qg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,t_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,e_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,n_=`#ifdef USE_IRIDESCENCE
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
#endif`,i_=`#ifdef USE_BUMPMAP
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
#endif`,r_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,s_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,o_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,a_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,l_=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,c_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,u_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,h_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,d_=`#define PI 3.141592653589793
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
} // validated`,f_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,p_=`vec3 transformedNormal = objectNormal;
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
#endif`,m_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,g_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,__=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,v_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,y_="gl_FragColor = linearToOutputTexel( gl_FragColor );",x_=`
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
}`,b_=`#ifdef USE_ENVMAP
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
#endif`,w_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,M_=`#ifdef USE_ENVMAP
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
#endif`,S_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,E_=`#ifdef USE_ENVMAP
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
#endif`,T_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,A_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,C_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,L_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,P_=`#ifdef USE_GRADIENTMAP
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
}`,R_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,I_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,D_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,N_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,O_=`uniform bool receiveShadow;
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
#endif`,U_=`#ifdef USE_ENVMAP
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
#endif`,k_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,z_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,B_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,F_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,H_=`PhysicalMaterial material;
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
#endif`,V_=`struct PhysicalMaterial {
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
}`,G_=`
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
#endif`,W_=`#if defined( RE_IndirectDiffuse )
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
#endif`,Z_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,X_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,q_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,j_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Y_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,$_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,K_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,J_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Q_=`#if defined( USE_POINTS_UV )
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
#endif`,tv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ev=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,iv=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,rv=`#ifdef USE_MORPHNORMALS
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
#endif`,sv=`#ifdef USE_MORPHTARGETS
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
#endif`,ov=`#ifdef USE_MORPHTARGETS
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
#endif`,av=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,dv=`#ifdef USE_NORMALMAP
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
#endif`,fv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_v=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,vv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,yv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,xv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Sv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ev=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Tv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Av=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Cv=`float getShadowMask() {
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
}`,Lv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pv=`#ifdef USE_SKINNING
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
#endif`,Rv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Iv=`#ifdef USE_SKINNING
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
#endif`,Dv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Nv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ov=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Uv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kv=`#ifdef USE_TRANSMISSION
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
#endif`,zv=`#ifdef USE_TRANSMISSION
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
#endif`,Bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wv=`uniform sampler2D t2D;
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
}`,Zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Xv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,qv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yv=`#include <common>
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
}`,$v=`#if DEPTH_PACKING == 3200
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
}`,Kv=`#define DISTANCE
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
}`,Jv=`#define DISTANCE
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
}`,Qv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,t0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e0=`uniform float scale;
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
}`,n0=`uniform vec3 diffuse;
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
}`,i0=`#include <common>
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
}`,r0=`uniform vec3 diffuse;
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
}`,s0=`#define LAMBERT
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
}`,o0=`#define LAMBERT
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
}`,a0=`#define MATCAP
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
}`,l0=`#define MATCAP
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
}`,c0=`#define NORMAL
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
}`,u0=`#define NORMAL
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
}`,h0=`#define PHONG
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
}`,d0=`#define PHONG
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
}`,f0=`#define STANDARD
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
}`,p0=`#define STANDARD
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
}`,m0=`#define TOON
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
}`,g0=`#define TOON
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
}`,_0=`uniform float size;
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
}`,v0=`uniform vec3 diffuse;
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
}`,y0=`#include <common>
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
}`,x0=`uniform vec3 color;
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
}`,b0=`uniform float rotation;
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
}`,w0=`uniform vec3 diffuse;
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
}`,le={alphahash_fragment:Gg,alphahash_pars_fragment:Wg,alphamap_fragment:Zg,alphamap_pars_fragment:Xg,alphatest_fragment:qg,alphatest_pars_fragment:jg,aomap_fragment:Yg,aomap_pars_fragment:$g,batching_pars_vertex:Kg,batching_vertex:Jg,begin_vertex:Qg,beginnormal_vertex:t_,bsdfs:e_,iridescence_fragment:n_,bumpmap_pars_fragment:i_,clipping_planes_fragment:r_,clipping_planes_pars_fragment:s_,clipping_planes_pars_vertex:o_,clipping_planes_vertex:a_,color_fragment:l_,color_pars_fragment:c_,color_pars_vertex:u_,color_vertex:h_,common:d_,cube_uv_reflection_fragment:f_,defaultnormal_vertex:p_,displacementmap_pars_vertex:m_,displacementmap_vertex:g_,emissivemap_fragment:__,emissivemap_pars_fragment:v_,colorspace_fragment:y_,colorspace_pars_fragment:x_,envmap_fragment:b_,envmap_common_pars_fragment:w_,envmap_pars_fragment:M_,envmap_pars_vertex:S_,envmap_physical_pars_fragment:U_,envmap_vertex:E_,fog_vertex:T_,fog_pars_vertex:A_,fog_fragment:C_,fog_pars_fragment:L_,gradientmap_pars_fragment:P_,lightmap_fragment:R_,lightmap_pars_fragment:I_,lights_lambert_fragment:D_,lights_lambert_pars_fragment:N_,lights_pars_begin:O_,lights_toon_fragment:k_,lights_toon_pars_fragment:z_,lights_phong_fragment:B_,lights_phong_pars_fragment:F_,lights_physical_fragment:H_,lights_physical_pars_fragment:V_,lights_fragment_begin:G_,lights_fragment_maps:W_,lights_fragment_end:Z_,logdepthbuf_fragment:X_,logdepthbuf_pars_fragment:q_,logdepthbuf_pars_vertex:j_,logdepthbuf_vertex:Y_,map_fragment:$_,map_pars_fragment:K_,map_particle_fragment:J_,map_particle_pars_fragment:Q_,metalnessmap_fragment:tv,metalnessmap_pars_fragment:ev,morphinstance_vertex:nv,morphcolor_vertex:iv,morphnormal_vertex:rv,morphtarget_pars_vertex:sv,morphtarget_vertex:ov,normal_fragment_begin:av,normal_fragment_maps:lv,normal_pars_fragment:cv,normal_pars_vertex:uv,normal_vertex:hv,normalmap_pars_fragment:dv,clearcoat_normal_fragment_begin:fv,clearcoat_normal_fragment_maps:pv,clearcoat_pars_fragment:mv,iridescence_pars_fragment:gv,opaque_fragment:_v,packing:vv,premultiplied_alpha_fragment:yv,project_vertex:xv,dithering_fragment:bv,dithering_pars_fragment:wv,roughnessmap_fragment:Mv,roughnessmap_pars_fragment:Sv,shadowmap_pars_fragment:Ev,shadowmap_pars_vertex:Tv,shadowmap_vertex:Av,shadowmask_pars_fragment:Cv,skinbase_vertex:Lv,skinning_pars_vertex:Pv,skinning_vertex:Rv,skinnormal_vertex:Iv,specularmap_fragment:Dv,specularmap_pars_fragment:Nv,tonemapping_fragment:Ov,tonemapping_pars_fragment:Uv,transmission_fragment:kv,transmission_pars_fragment:zv,uv_pars_fragment:Bv,uv_pars_vertex:Fv,uv_vertex:Hv,worldpos_vertex:Vv,background_vert:Gv,background_frag:Wv,backgroundCube_vert:Zv,backgroundCube_frag:Xv,cube_vert:qv,cube_frag:jv,depth_vert:Yv,depth_frag:$v,distanceRGBA_vert:Kv,distanceRGBA_frag:Jv,equirect_vert:Qv,equirect_frag:t0,linedashed_vert:e0,linedashed_frag:n0,meshbasic_vert:i0,meshbasic_frag:r0,meshlambert_vert:s0,meshlambert_frag:o0,meshmatcap_vert:a0,meshmatcap_frag:l0,meshnormal_vert:c0,meshnormal_frag:u0,meshphong_vert:h0,meshphong_frag:d0,meshphysical_vert:f0,meshphysical_frag:p0,meshtoon_vert:m0,meshtoon_frag:g0,points_vert:_0,points_frag:v0,shadow_vert:y0,shadow_frag:x0,sprite_vert:b0,sprite_frag:w0},Ot={common:{diffuse:{value:new Qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ce}},envmap:{envMap:{value:null},envMapRotation:{value:new ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ce},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0},uvTransform:{value:new ce}},sprite:{diffuse:{value:new Qt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ce},alphaMap:{value:null},alphaMapTransform:{value:new ce},alphaTest:{value:0}}},ti={basic:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:le.meshbasic_vert,fragmentShader:le.meshbasic_frag},lambert:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshlambert_vert,fragmentShader:le.meshlambert_frag},phong:{uniforms:cn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},specular:{value:new Qt(1118481)},shininess:{value:30}}]),vertexShader:le.meshphong_vert,fragmentShader:le.meshphong_frag},standard:{uniforms:cn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag},toon:{uniforms:cn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new Qt(0)}}]),vertexShader:le.meshtoon_vert,fragmentShader:le.meshtoon_frag},matcap:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:le.meshmatcap_vert,fragmentShader:le.meshmatcap_frag},points:{uniforms:cn([Ot.points,Ot.fog]),vertexShader:le.points_vert,fragmentShader:le.points_frag},dashed:{uniforms:cn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:le.linedashed_vert,fragmentShader:le.linedashed_frag},depth:{uniforms:cn([Ot.common,Ot.displacementmap]),vertexShader:le.depth_vert,fragmentShader:le.depth_frag},normal:{uniforms:cn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:le.meshnormal_vert,fragmentShader:le.meshnormal_frag},sprite:{uniforms:cn([Ot.sprite,Ot.fog]),vertexShader:le.sprite_vert,fragmentShader:le.sprite_frag},background:{uniforms:{uvTransform:{value:new ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:le.background_vert,fragmentShader:le.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ce}},vertexShader:le.backgroundCube_vert,fragmentShader:le.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:le.cube_vert,fragmentShader:le.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:le.equirect_vert,fragmentShader:le.equirect_frag},distanceRGBA:{uniforms:cn([Ot.common,Ot.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:le.distanceRGBA_vert,fragmentShader:le.distanceRGBA_frag},shadow:{uniforms:cn([Ot.lights,Ot.fog,{color:{value:new Qt(0)},opacity:{value:1}}]),vertexShader:le.shadow_vert,fragmentShader:le.shadow_frag}};ti.physical={uniforms:cn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ce},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ce},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ce},sheen:{value:0},sheenColor:{value:new Qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ce},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ce},attenuationDistance:{value:0},attenuationColor:{value:new Qt(0)},specularColor:{value:new Qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ce},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ce}}]),vertexShader:le.meshphysical_vert,fragmentShader:le.meshphysical_frag};const Ho={r:0,b:0,g:0},Yi=new qn,M0=new Te;function S0(r,t,e,n,s,o,l){const c=new Qt(0);let u=o===!0?0:1,d,f,p=null,_=0,m=null;function x(g,v){let S=!1,w=v.isScene===!0?v.background:null;w&&w.isTexture&&(w=(v.backgroundBlurriness>0?e:t).get(w)),w===null?y(c,u):w&&w.isColor&&(y(w,1),S=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,l):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(r.autoClear||S)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),w&&(w.isCubeTexture||w.mapping===ya)?(f===void 0&&(f=new Ie(new je(1,1,1),new Ui({name:"BackgroundCubeMaterial",uniforms:rs(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(N,U,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),Yi.copy(v.backgroundRotation),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),f.material.uniforms.envMap.value=w,f.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(M0.makeRotationFromEuler(Yi)),f.material.toneMapped=_e.getTransfer(w.colorSpace)!==we,(p!==w||_!==w.version||m!==r.toneMapping)&&(f.material.needsUpdate=!0,p=w,_=w.version,m=r.toneMapping),f.layers.enableAll(),g.unshift(f,f.geometry,f.material,0,0,null)):w&&w.isTexture&&(d===void 0&&(d=new Ie(new $s(2,2),new Ui({name:"BackgroundMaterial",uniforms:rs(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:Oi,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=w,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.toneMapped=_e.getTransfer(w.colorSpace)!==we,w.matrixAutoUpdate===!0&&w.updateMatrix(),d.material.uniforms.uvTransform.value.copy(w.matrix),(p!==w||_!==w.version||m!==r.toneMapping)&&(d.material.needsUpdate=!0,p=w,_=w.version,m=r.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null))}function y(g,v){g.getRGB(Ho,qd(r)),n.buffers.color.setClear(Ho.r,Ho.g,Ho.b,v,l)}return{getClearColor:function(){return c},setClearColor:function(g,v=1){c.set(g),u=v,y(c,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,y(c,u)},render:x}}function E0(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=_(null);let o=s,l=!1;function c(R,W,k,H,P){let Z=!1;const nt=p(H,k,W);o!==nt&&(o=nt,d(o.object)),Z=m(R,H,k,P),Z&&x(R,H,k,P),P!==null&&t.update(P,r.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,E(R,W,k,H),P!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(P).buffer))}function u(){return r.createVertexArray()}function d(R){return r.bindVertexArray(R)}function f(R){return r.deleteVertexArray(R)}function p(R,W,k){const H=k.wireframe===!0;let P=n[R.id];P===void 0&&(P={},n[R.id]=P);let Z=P[W.id];Z===void 0&&(Z={},P[W.id]=Z);let nt=Z[H];return nt===void 0&&(nt=_(u()),Z[H]=nt),nt}function _(R){const W=[],k=[],H=[];for(let P=0;P<e;P++)W[P]=0,k[P]=0,H[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:k,attributeDivisors:H,object:R,attributes:{},index:null}}function m(R,W,k,H){const P=o.attributes,Z=W.attributes;let nt=0;const ot=k.getAttributes();for(const j in ot)if(ot[j].location>=0){const at=P[j];let q=Z[j];if(q===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),at===void 0||at.attribute!==q||q&&at.data!==q.data)return!0;nt++}return o.attributesNum!==nt||o.index!==H}function x(R,W,k,H){const P={},Z=W.attributes;let nt=0;const ot=k.getAttributes();for(const j in ot)if(ot[j].location>=0){let at=Z[j];at===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(at=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(at=R.instanceColor));const q={};q.attribute=at,at&&at.data&&(q.data=at.data),P[j]=q,nt++}o.attributes=P,o.attributesNum=nt,o.index=H}function y(){const R=o.newAttributes;for(let W=0,k=R.length;W<k;W++)R[W]=0}function g(R){v(R,0)}function v(R,W){const k=o.newAttributes,H=o.enabledAttributes,P=o.attributeDivisors;k[R]=1,H[R]===0&&(r.enableVertexAttribArray(R),H[R]=1),P[R]!==W&&(r.vertexAttribDivisor(R,W),P[R]=W)}function S(){const R=o.newAttributes,W=o.enabledAttributes;for(let k=0,H=W.length;k<H;k++)W[k]!==R[k]&&(r.disableVertexAttribArray(k),W[k]=0)}function w(R,W,k,H,P,Z,nt){nt===!0?r.vertexAttribIPointer(R,W,k,P,Z):r.vertexAttribPointer(R,W,k,H,P,Z)}function E(R,W,k,H){y();const P=H.attributes,Z=k.getAttributes(),nt=W.defaultAttributeValues;for(const ot in Z){const j=Z[ot];if(j.location>=0){let rt=P[ot];if(rt===void 0&&(ot==="instanceMatrix"&&R.instanceMatrix&&(rt=R.instanceMatrix),ot==="instanceColor"&&R.instanceColor&&(rt=R.instanceColor)),rt!==void 0){const at=rt.normalized,q=rt.itemSize,tt=t.get(rt);if(tt===void 0)continue;const Lt=tt.buffer,Q=tt.type,it=tt.bytesPerElement,wt=Q===r.INT||Q===r.UNSIGNED_INT||rt.gpuType===Id;if(rt.isInterleavedBufferAttribute){const St=rt.data,Pt=St.stride,It=rt.offset;if(St.isInstancedInterleavedBuffer){for(let kt=0;kt<j.locationSize;kt++)v(j.location+kt,St.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let kt=0;kt<j.locationSize;kt++)g(j.location+kt);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let kt=0;kt<j.locationSize;kt++)w(j.location+kt,q/j.locationSize,Q,at,Pt*it,(It+q/j.locationSize*kt)*it,wt)}else{if(rt.isInstancedBufferAttribute){for(let St=0;St<j.locationSize;St++)v(j.location+St,rt.meshPerAttribute);R.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let St=0;St<j.locationSize;St++)g(j.location+St);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let St=0;St<j.locationSize;St++)w(j.location+St,q/j.locationSize,Q,at,q*it,q/j.locationSize*St*it,wt)}}else if(nt!==void 0){const at=nt[ot];if(at!==void 0)switch(at.length){case 2:r.vertexAttrib2fv(j.location,at);break;case 3:r.vertexAttrib3fv(j.location,at);break;case 4:r.vertexAttrib4fv(j.location,at);break;default:r.vertexAttrib1fv(j.location,at)}}}}S()}function N(){F();for(const R in n){const W=n[R];for(const k in W){const H=W[k];for(const P in H)f(H[P].object),delete H[P];delete W[k]}delete n[R]}}function U(R){if(n[R.id]===void 0)return;const W=n[R.id];for(const k in W){const H=W[k];for(const P in H)f(H[P].object),delete H[P];delete W[k]}delete n[R.id]}function O(R){for(const W in n){const k=n[W];if(k[R.id]===void 0)continue;const H=k[R.id];for(const P in H)f(H[P].object),delete H[P];delete k[R.id]}}function F(){I(),l=!0,o!==s&&(o=s,d(o.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:F,resetDefaultState:I,dispose:N,releaseStatesOfGeometry:U,releaseStatesOfProgram:O,initAttributes:y,enableAttribute:g,disableUnusedAttributes:S}}function T0(r,t,e){let n;function s(u){n=u}function o(u,d){r.drawArrays(n,u,d),e.update(d,n,1)}function l(u,d,f){f!==0&&(r.drawArraysInstanced(n,u,d,f),e.update(d,n,f))}function c(u,d,f){if(f===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<f;_++)this.render(u[_],d[_]);else{p.multiDrawArraysWEBGL(n,u,0,d,0,f);let _=0;for(let m=0;m<f;m++)_+=d[m];e.update(_,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function A0(r,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const u=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=r.getParameter(r.MAX_TEXTURE_SIZE),_=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),m=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),g=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),v=f>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:g,vertexTextures:v,maxSamples:S}}function C0(r){const t=this;let e=null,n=0,s=!1,o=!1;const l=new Li,c=new ce,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,_){const m=p.length!==0||_||n!==0||s;return s=_,n=p.length,m},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(p,_){e=f(p,_,0)},this.setState=function(p,_,m){const x=p.clippingPlanes,y=p.clipIntersection,g=p.clipShadows,v=r.get(p);if(!s||x===null||x.length===0||o&&!g)o?f(null):d();else{const S=o?0:n,w=S*4;let E=v.clippingState||null;u.value=E,E=f(x,_,w,m);for(let N=0;N!==w;++N)E[N]=e[N];v.clippingState=E,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=S}};function d(){u.value!==e&&(u.value=e,u.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(p,_,m,x){const y=p!==null?p.length:0;let g=null;if(y!==0){if(g=u.value,x!==!0||g===null){const v=m+y*4,S=_.matrixWorldInverse;c.getNormalMatrix(S),(g===null||g.length<v)&&(g=new Float32Array(v));for(let w=0,E=m;w!==y;++w,E+=4)l.copy(p[w]).applyMatrix4(S,c),l.normal.toArray(g,E),g[E+3]=l.constant}u.value=g,u.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,g}}function L0(r){let t=new WeakMap;function e(l,c){return c===jl?l.mapping=es:c===Yl&&(l.mapping=ns),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===jl||c===Yl)if(t.has(l)){const u=t.get(l).texture;return e(u,l.mapping)}else{const u=l.image;if(u&&u.height>0){const d=new Bg(u.height);return d.fromEquirectangularTexture(r,l),t.set(l,d),l.addEventListener("dispose",s),e(d.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const u=t.get(c);u!==void 0&&(t.delete(c),u.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Kd extends jd{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,u=s-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,l=o+d*this.view.width,c-=f*this.view.offsetY,u=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,u,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Xr=4,Eh=[.125,.215,.35,.446,.526,.582],Qi=20,Sl=new Kd,Th=new Qt;let El=null,Tl=0,Al=0,Cl=!1;const Ki=(1+Math.sqrt(5))/2,zr=1/Ki,Ah=[new K(1,1,1),new K(-1,1,1),new K(1,1,-1),new K(-1,1,-1),new K(0,Ki,zr),new K(0,Ki,-zr),new K(zr,0,Ki),new K(-zr,0,Ki),new K(Ki,zr,0),new K(-Ki,zr,0)];class Ch{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){El=this._renderer.getRenderTarget(),Tl=this._renderer.getActiveCubeFace(),Al=this._renderer.getActiveMipmapLevel(),Cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ph(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(El,Tl,Al),this._renderer.xr.enabled=Cl,t.scissorTest=!1,Vo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),El=this._renderer.getRenderTarget(),Tl=this._renderer.getActiveCubeFace(),Al=this._renderer.getActiveMipmapLevel(),Cl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Gn,minFilter:Gn,generateMipmaps:!1,type:ra,format:ni,colorSpace:ki,depthBuffer:!1},s=Lh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lh(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=P0(o)),this._blurMaterial=R0(o,t,e)}return s}_compileMaterial(t){const e=new Ie(this._lodPlanes[0],t);this._renderer.compile(e,Sl)}_sceneToCubeUV(t,e,n,s){const c=new Sn(90,1,e,n),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,_=f.toneMapping;f.getClearColor(Th),f.toneMapping=Di,f.autoClear=!1;const m=new Wd({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1}),x=new Ie(new je,m);let y=!1;const g=t.background;g?g.isColor&&(m.color.copy(g),t.background=null,y=!0):(m.color.copy(Th),y=!0);for(let v=0;v<6;v++){const S=v%3;S===0?(c.up.set(0,u[v],0),c.lookAt(d[v],0,0)):S===1?(c.up.set(0,0,u[v]),c.lookAt(0,d[v],0)):(c.up.set(0,u[v],0),c.lookAt(0,0,d[v]));const w=this._cubeSize;Vo(s,S*w,v>2?w:0,w,w),f.setRenderTarget(s),y&&f.render(x,c),f.render(t,c)}x.geometry.dispose(),x.material.dispose(),f.toneMapping=_,f.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===es||t.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ph());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new Ie(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const u=this._cubeSize;Vo(e,0,0,3*u,2*u),n.setRenderTarget(e),n.render(l,Sl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=Ah[(s-1)%Ah.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const u=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,p=new Ie(this._lodPlanes[s],d),_=d.uniforms,m=this._sizeLods[n]-1,x=isFinite(o)?Math.PI/(2*m):2*Math.PI/(2*Qi-1),y=o/x,g=isFinite(o)?1+Math.floor(f*y):Qi;g>Qi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Qi}`);const v=[];let S=0;for(let O=0;O<Qi;++O){const F=O/y,I=Math.exp(-F*F/2);v.push(I),O===0?S+=I:O<g&&(S+=2*I)}for(let O=0;O<v.length;O++)v[O]=v[O]/S;_.envMap.value=t.texture,_.samples.value=g,_.weights.value=v,_.latitudinal.value=l==="latitudinal",c&&(_.poleAxis.value=c);const{_lodMax:w}=this;_.dTheta.value=x,_.mipInt.value=w-n;const E=this._sizeLods[s],N=3*E*(s>w-Xr?s-w+Xr:0),U=4*(this._cubeSize-E);Vo(e,N,U,3*E,2*E),u.setRenderTarget(e),u.render(p,Sl)}}function P0(r){const t=[],e=[],n=[];let s=r;const o=r-Xr+1+Eh.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let u=1/c;l>r-Xr?u=Eh[l-r+Xr-1]:l===0&&(u=0),n.push(u);const d=1/(c-2),f=-d,p=1+d,_=[f,f,p,f,p,p,f,f,p,p,f,p],m=6,x=6,y=3,g=2,v=1,S=new Float32Array(y*x*m),w=new Float32Array(g*x*m),E=new Float32Array(v*x*m);for(let U=0;U<m;U++){const O=U%3*2/3-1,F=U>2?0:-1,I=[O,F,0,O+2/3,F,0,O+2/3,F+1,0,O,F,0,O+2/3,F+1,0,O,F+1,0];S.set(I,y*x*U),w.set(_,g*x*U);const R=[U,U,U,U,U,U];E.set(R,v*x*U)}const N=new Oe;N.setAttribute("position",new An(S,y)),N.setAttribute("uv",new An(w,g)),N.setAttribute("faceIndex",new An(E,v)),t.push(N),s>Xr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Lh(r,t,e){const n=new sr(r,t,e);return n.texture.mapping=ya,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Vo(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function R0(r,t,e){const n=new Float32Array(Qi),s=new K(0,1,0);return new Ui({name:"SphericalGaussianBlur",defines:{n:Qi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Ph(){return new Ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_c(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Rh(){return new Ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_c(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function _c(){return`

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
	`}function I0(r){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const u=c.mapping,d=u===jl||u===Yl,f=u===es||u===ns;if(d||f){let p=t.get(c);const _=p!==void 0?p.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==_)return e===null&&(e=new Ch(r)),p=d?e.fromEquirectangular(c,p):e.fromCubemap(c,p),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),p.texture;if(p!==void 0)return p.texture;{const m=c.image;return d&&m&&m.height>0||f&&m&&s(m)?(e===null&&(e=new Ch(r)),p=d?e.fromEquirectangular(c):e.fromCubemap(c),p.texture.pmremVersion=c.pmremVersion,t.set(c,p),c.addEventListener("dispose",o),p.texture):null}}}return c}function s(c){let u=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&u++;return u===d}function o(c){const u=c.target;u.removeEventListener("dispose",o);const d=t.get(u);d!==void 0&&(t.delete(u),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function D0(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function N0(r,t,e,n){const s={},o=new WeakMap;function l(p){const _=p.target;_.index!==null&&t.remove(_.index);for(const x in _.attributes)t.remove(_.attributes[x]);for(const x in _.morphAttributes){const y=_.morphAttributes[x];for(let g=0,v=y.length;g<v;g++)t.remove(y[g])}_.removeEventListener("dispose",l),delete s[_.id];const m=o.get(_);m&&(t.remove(m),o.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,e.memory.geometries--}function c(p,_){return s[_.id]===!0||(_.addEventListener("dispose",l),s[_.id]=!0,e.memory.geometries++),_}function u(p){const _=p.attributes;for(const x in _)t.update(_[x],r.ARRAY_BUFFER);const m=p.morphAttributes;for(const x in m){const y=m[x];for(let g=0,v=y.length;g<v;g++)t.update(y[g],r.ARRAY_BUFFER)}}function d(p){const _=[],m=p.index,x=p.attributes.position;let y=0;if(m!==null){const S=m.array;y=m.version;for(let w=0,E=S.length;w<E;w+=3){const N=S[w+0],U=S[w+1],O=S[w+2];_.push(N,U,U,O,O,N)}}else if(x!==void 0){const S=x.array;y=x.version;for(let w=0,E=S.length/3-1;w<E;w+=3){const N=w+0,U=w+1,O=w+2;_.push(N,U,U,O,O,N)}}else return;const g=new(Fd(_)?Xd:Zd)(_,1);g.version=y;const v=o.get(p);v&&t.remove(v),o.set(p,g)}function f(p){const _=o.get(p);if(_){const m=p.index;m!==null&&_.version<m.version&&d(p)}else d(p);return o.get(p)}return{get:c,update:u,getWireframeAttribute:f}}function O0(r,t,e){let n;function s(p){n=p}let o,l;function c(p){o=p.type,l=p.bytesPerElement}function u(p,_){r.drawElements(n,_,o,p*l),e.update(_,n,1)}function d(p,_,m){m!==0&&(r.drawElementsInstanced(n,_,o,p*l,m),e.update(_,n,m))}function f(p,_,m){if(m===0)return;const x=t.get("WEBGL_multi_draw");if(x===null)for(let y=0;y<m;y++)this.render(p[y]/l,_[y]);else{x.multiDrawElementsWEBGL(n,_,0,o,p,0,m);let y=0;for(let g=0;g<m;g++)y+=_[g];e.update(y,n,1)}}this.setMode=s,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=f}function U0(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case r.TRIANGLES:e.triangles+=c*(o/3);break;case r.LINES:e.lines+=c*(o/2);break;case r.LINE_STRIP:e.lines+=c*(o-1);break;case r.LINE_LOOP:e.lines+=c*o;break;case r.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function k0(r,t,e){const n=new WeakMap,s=new $e;function o(l,c,u){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,p=f!==void 0?f.length:0;let _=n.get(c);if(_===void 0||_.count!==p){let I=function(){O.dispose(),n.delete(c),c.removeEventListener("dispose",I)};_!==void 0&&_.texture.dispose();const m=c.morphAttributes.position!==void 0,x=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,g=c.morphAttributes.position||[],v=c.morphAttributes.normal||[],S=c.morphAttributes.color||[];let w=0;m===!0&&(w=1),x===!0&&(w=2),y===!0&&(w=3);let E=c.attributes.position.count*w,N=1;E>t.maxTextureSize&&(N=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const U=new Float32Array(E*N*4*p),O=new Vd(U,E,N,p);O.type=Ri,O.needsUpdate=!0;const F=w*4;for(let R=0;R<p;R++){const W=g[R],k=v[R],H=S[R],P=E*N*4*R;for(let Z=0;Z<W.count;Z++){const nt=Z*F;m===!0&&(s.fromBufferAttribute(W,Z),U[P+nt+0]=s.x,U[P+nt+1]=s.y,U[P+nt+2]=s.z,U[P+nt+3]=0),x===!0&&(s.fromBufferAttribute(k,Z),U[P+nt+4]=s.x,U[P+nt+5]=s.y,U[P+nt+6]=s.z,U[P+nt+7]=0),y===!0&&(s.fromBufferAttribute(H,Z),U[P+nt+8]=s.x,U[P+nt+9]=s.y,U[P+nt+10]=s.z,U[P+nt+11]=H.itemSize===4?s.w:1)}}_={count:p,texture:O,size:new vt(E,N)},n.set(c,_),c.addEventListener("dispose",I)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)u.getUniforms().setValue(r,"morphTexture",l.morphTexture,e);else{let m=0;for(let y=0;y<d.length;y++)m+=d[y];const x=c.morphTargetsRelative?1:1-m;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",d)}u.getUniforms().setValue(r,"morphTargetsTexture",_.texture,e),u.getUniforms().setValue(r,"morphTargetsTextureSize",_.size)}return{update:o}}function z0(r,t,e,n){let s=new WeakMap;function o(u){const d=n.render.frame,f=u.geometry,p=t.get(u,f);if(s.get(p)!==d&&(t.update(p),s.set(p,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",c)===!1&&u.addEventListener("dispose",c),s.get(u)!==d&&(e.update(u.instanceMatrix,r.ARRAY_BUFFER),u.instanceColor!==null&&e.update(u.instanceColor,r.ARRAY_BUFFER),s.set(u,d))),u.isSkinnedMesh){const _=u.skeleton;s.get(_)!==d&&(_.update(),s.set(_,d))}return p}function l(){s=new WeakMap}function c(u){const d=u.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:l}}class Jd extends fn{constructor(t,e,n,s,o,l,c,u,d,f){if(f=f!==void 0?f:Kr,f!==Kr&&f!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===Kr&&(n=is),n===void 0&&f===Gs&&(n=js),super(null,s,o,l,c,u,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:Nn,this.minFilter=u!==void 0?u:Nn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Qd=new fn,tf=new Jd(1,1);tf.compareFunction=Bd;const ef=new Vd,nf=new Mg,rf=new Yd,Ih=[],Dh=[],Nh=new Float32Array(16),Oh=new Float32Array(9),Uh=new Float32Array(4);function ls(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let o=Ih[s];if(o===void 0&&(o=new Float32Array(s),Ih[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,r[l].toArray(o,c)}return o}function He(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ve(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ma(r,t){let e=Dh[t];e===void 0&&(e=new Int32Array(t),Dh[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function B0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function F0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;r.uniform2fv(this.addr,t),Ve(e,t)}}function H0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(He(e,t))return;r.uniform3fv(this.addr,t),Ve(e,t)}}function V0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;r.uniform4fv(this.addr,t),Ve(e,t)}}function G0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Uh.set(n),r.uniformMatrix2fv(this.addr,!1,Uh),Ve(e,n)}}function W0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Oh.set(n),r.uniformMatrix3fv(this.addr,!1,Oh),Ve(e,n)}}function Z0(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(He(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(He(e,n))return;Nh.set(n),r.uniformMatrix4fv(this.addr,!1,Nh),Ve(e,n)}}function X0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function q0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;r.uniform2iv(this.addr,t),Ve(e,t)}}function j0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;r.uniform3iv(this.addr,t),Ve(e,t)}}function Y0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;r.uniform4iv(this.addr,t),Ve(e,t)}}function $0(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function K0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(He(e,t))return;r.uniform2uiv(this.addr,t),Ve(e,t)}}function J0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(He(e,t))return;r.uniform3uiv(this.addr,t),Ve(e,t)}}function Q0(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(He(e,t))return;r.uniform4uiv(this.addr,t),Ve(e,t)}}function ty(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);const o=this.type===r.SAMPLER_2D_SHADOW?tf:Qd;e.setTexture2D(t||o,s)}function ey(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||nf,s)}function ny(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||rf,s)}function iy(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ef,s)}function ry(r){switch(r){case 5126:return B0;case 35664:return F0;case 35665:return H0;case 35666:return V0;case 35674:return G0;case 35675:return W0;case 35676:return Z0;case 5124:case 35670:return X0;case 35667:case 35671:return q0;case 35668:case 35672:return j0;case 35669:case 35673:return Y0;case 5125:return $0;case 36294:return K0;case 36295:return J0;case 36296:return Q0;case 35678:case 36198:case 36298:case 36306:case 35682:return ty;case 35679:case 36299:case 36307:return ey;case 35680:case 36300:case 36308:case 36293:return ny;case 36289:case 36303:case 36311:case 36292:return iy}}function sy(r,t){r.uniform1fv(this.addr,t)}function oy(r,t){const e=ls(t,this.size,2);r.uniform2fv(this.addr,e)}function ay(r,t){const e=ls(t,this.size,3);r.uniform3fv(this.addr,e)}function ly(r,t){const e=ls(t,this.size,4);r.uniform4fv(this.addr,e)}function cy(r,t){const e=ls(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function uy(r,t){const e=ls(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function hy(r,t){const e=ls(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function dy(r,t){r.uniform1iv(this.addr,t)}function fy(r,t){r.uniform2iv(this.addr,t)}function py(r,t){r.uniform3iv(this.addr,t)}function my(r,t){r.uniform4iv(this.addr,t)}function gy(r,t){r.uniform1uiv(this.addr,t)}function _y(r,t){r.uniform2uiv(this.addr,t)}function vy(r,t){r.uniform3uiv(this.addr,t)}function yy(r,t){r.uniform4uiv(this.addr,t)}function xy(r,t,e){const n=this.cache,s=t.length,o=Ma(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||Qd,o[l])}function by(r,t,e){const n=this.cache,s=t.length,o=Ma(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||nf,o[l])}function wy(r,t,e){const n=this.cache,s=t.length,o=Ma(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||rf,o[l])}function My(r,t,e){const n=this.cache,s=t.length,o=Ma(e,s);He(n,o)||(r.uniform1iv(this.addr,o),Ve(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||ef,o[l])}function Sy(r){switch(r){case 5126:return sy;case 35664:return oy;case 35665:return ay;case 35666:return ly;case 35674:return cy;case 35675:return uy;case 35676:return hy;case 5124:case 35670:return dy;case 35667:case 35671:return fy;case 35668:case 35672:return py;case 35669:case 35673:return my;case 5125:return gy;case 36294:return _y;case 36295:return vy;case 36296:return yy;case 35678:case 36198:case 36298:case 36306:case 35682:return xy;case 35679:case 36299:case 36307:return by;case 35680:case 36300:case 36308:case 36293:return wy;case 36289:case 36303:case 36311:case 36292:return My}}class Ey{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ry(e.type)}}class Ty{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sy(e.type)}}class Ay{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const Ll=/(\w+)(\])?(\[|\.)?/g;function kh(r,t){r.seq.push(t),r.map[t.id]=t}function Cy(r,t,e){const n=r.name,s=n.length;for(Ll.lastIndex=0;;){const o=Ll.exec(n),l=Ll.lastIndex;let c=o[1];const u=o[2]==="]",d=o[3];if(u&&(c=c|0),d===void 0||d==="["&&l+2===s){kh(e,d===void 0?new Ey(c,r,t):new Ty(c,r,t));break}else{let p=e.map[c];p===void 0&&(p=new Ay(c),kh(e,p)),e=p}}}class ta{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);Cy(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],u=n[c.id];u.needsUpdate!==!1&&c.setValue(t,u.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function zh(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Ly=37297;let Py=0;function Ry(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function Iy(r){const t=_e.getPrimaries(_e.workingColorSpace),e=_e.getPrimaries(r);let n;switch(t===e?n="":t===aa&&e===oa?n="LinearDisplayP3ToLinearSRGB":t===oa&&e===aa&&(n="LinearSRGBToLinearDisplayP3"),r){case ki:case xa:return[n,"LinearTransferOETF"];case Qn:case pc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Bh(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Ry(r.getShaderSource(t),l)}else return s}function Dy(r,t){const e=Iy(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ny(r,t){let e;switch(t){case Ld:e="Linear";break;case Hm:e="Reinhard";break;case Vm:e="OptimizedCineon";break;case Gm:e="ACESFilmic";break;case Zm:e="AgX";break;case Xm:e="Neutral";break;case Wm:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Oy(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ds).join(`
`)}function Uy(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ky(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=r.getActiveAttrib(t,s),l=o.name;let c=1;o.type===r.FLOAT_MAT2&&(c=2),o.type===r.FLOAT_MAT3&&(c=3),o.type===r.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:r.getAttribLocation(t,l),locationSize:c}}return e}function Ds(r){return r!==""}function Fh(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Hh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const zy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ql(r){return r.replace(zy,Fy)}const By=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Fy(r,t){let e=le[t];if(e===void 0){const n=By.get(t);if(n!==void 0)e=le[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ql(e)}const Hy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vh(r){return r.replace(Hy,Vy)}function Vy(r,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Gh(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function Gy(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Cd?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===fm?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===mi&&(t="SHADOWMAP_TYPE_VSM"),t}function Wy(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case ya:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Zy(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function Xy(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case dc:t="ENVMAP_BLENDING_MULTIPLY";break;case Bm:t="ENVMAP_BLENDING_MIX";break;case Fm:t="ENVMAP_BLENDING_ADD";break}return t}function qy(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function jy(r,t,e,n){const s=r.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const u=Gy(e),d=Wy(e),f=Zy(e),p=Xy(e),_=qy(e),m=Oy(e),x=Uy(o),y=s.createProgram();let g,v,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ds).join(`
`),g.length>0&&(g+=`
`),v=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Ds).join(`
`),v.length>0&&(v+=`
`)):(g=[Gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ds).join(`
`),v=[Gh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+p:"",_?"#define CUBEUV_TEXEL_WIDTH "+_.texelWidth:"",_?"#define CUBEUV_TEXEL_HEIGHT "+_.texelHeight:"",_?"#define CUBEUV_MAX_MIP "+_.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+u:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Di?"#define TONE_MAPPING":"",e.toneMapping!==Di?le.tonemapping_pars_fragment:"",e.toneMapping!==Di?Ny("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",le.colorspace_pars_fragment,Dy("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ds).join(`
`)),l=Ql(l),l=Fh(l,e),l=Hh(l,e),c=Ql(c),c=Fh(c,e),c=Hh(c,e),l=Vh(l),c=Vh(c),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,v=["#define varying in",e.glslVersion===sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const w=S+g+l,E=S+v+c,N=zh(s,s.VERTEX_SHADER,w),U=zh(s,s.FRAGMENT_SHADER,E);s.attachShader(y,N),s.attachShader(y,U),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function O(W){if(r.debug.checkShaderErrors){const k=s.getProgramInfoLog(y).trim(),H=s.getShaderInfoLog(N).trim(),P=s.getShaderInfoLog(U).trim();let Z=!0,nt=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,y,N,U);else{const ot=Bh(s,N,"vertex"),j=Bh(s,U,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+k+`
`+ot+`
`+j)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(H===""||P==="")&&(nt=!1);nt&&(W.diagnostics={runnable:Z,programLog:k,vertexShader:{log:H,prefix:g},fragmentShader:{log:P,prefix:v}})}s.deleteShader(N),s.deleteShader(U),F=new ta(s,y),I=ky(s,y)}let F;this.getUniforms=function(){return F===void 0&&O(this),F};let I;this.getAttributes=function(){return I===void 0&&O(this),I};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(y,Ly)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Py++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=U,this}let Yy=0;class $y{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Ky(t),e.set(t,n)),n}}class Ky{constructor(t){this.id=Yy++,this.code=t,this.usedTimes=0}}function Jy(r,t,e,n,s,o,l){const c=new mc,u=new $y,d=new Set,f=[],p=s.logarithmicDepthBuffer,_=s.vertexTextures;let m=s.precision;const x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(I){return d.add(I),I===0?"uv":`uv${I}`}function g(I,R,W,k,H){const P=k.fog,Z=H.geometry,nt=I.isMeshStandardMaterial?k.environment:null,ot=(I.isMeshStandardMaterial?e:t).get(I.envMap||nt),j=ot&&ot.mapping===ya?ot.image.height:null,rt=x[I.type];I.precision!==null&&(m=s.getMaxPrecision(I.precision),m!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",m,"instead."));const at=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,q=at!==void 0?at.length:0;let tt=0;Z.morphAttributes.position!==void 0&&(tt=1),Z.morphAttributes.normal!==void 0&&(tt=2),Z.morphAttributes.color!==void 0&&(tt=3);let Lt,Q,it,wt;if(rt){const Ue=ti[rt];Lt=Ue.vertexShader,Q=Ue.fragmentShader}else Lt=I.vertexShader,Q=I.fragmentShader,u.update(I),it=u.getVertexShaderID(I),wt=u.getFragmentShaderID(I);const St=r.getRenderTarget(),Pt=H.isInstancedMesh===!0,It=H.isBatchedMesh===!0,kt=!!I.map,st=!!I.matcap,yt=!!ot,xt=!!I.aoMap,T=!!I.lightMap,et=!!I.bumpMap,$=!!I.normalMap,C=!!I.displacementMap,M=!!I.emissiveMap,B=!!I.metalnessMap,X=!!I.roughnessMap,J=I.anisotropy>0,G=I.clearcoat>0,ft=I.iridescence>0,lt=I.sheen>0,pt=I.transmission>0,Tt=J&&!!I.anisotropyMap,Et=G&&!!I.clearcoatMap,At=G&&!!I.clearcoatNormalMap,Ht=G&&!!I.clearcoatRoughnessMap,zt=ft&&!!I.iridescenceMap,Dt=ft&&!!I.iridescenceThicknessMap,Kt=lt&&!!I.sheenColorMap,Vt=lt&&!!I.sheenRoughnessMap,oe=!!I.specularMap,ae=!!I.specularColorMap,te=!!I.specularIntensityMap,Ft=pt&&!!I.transmissionMap,D=pt&&!!I.thicknessMap,ht=!!I.gradientMap,Mt=!!I.alphaMap,Rt=I.alphaTest>0,Nt=!!I.alphaHash,re=!!I.extensions;let ue=Di;I.toneMapped&&(St===null||St.isXRRenderTarget===!0)&&(ue=r.toneMapping);const ve={shaderID:rt,shaderType:I.type,shaderName:I.name,vertexShader:Lt,fragmentShader:Q,defines:I.defines,customVertexShaderID:it,customFragmentShaderID:wt,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:m,batching:It,instancing:Pt,instancingColor:Pt&&H.instanceColor!==null,instancingMorph:Pt&&H.morphTexture!==null,supportsVertexTextures:_,outputColorSpace:St===null?r.outputColorSpace:St.isXRRenderTarget===!0?St.texture.colorSpace:ki,alphaToCoverage:!!I.alphaToCoverage,map:kt,matcap:st,envMap:yt,envMapMode:yt&&ot.mapping,envMapCubeUVHeight:j,aoMap:xt,lightMap:T,bumpMap:et,normalMap:$,displacementMap:_&&C,emissiveMap:M,normalMapObjectSpace:$&&I.normalMapType===og,normalMapTangentSpace:$&&I.normalMapType===fc,metalnessMap:B,roughnessMap:X,anisotropy:J,anisotropyMap:Tt,clearcoat:G,clearcoatMap:Et,clearcoatNormalMap:At,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:zt,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Vt,specularMap:oe,specularColorMap:ae,specularIntensityMap:te,transmission:pt,transmissionMap:Ft,thicknessMap:D,gradientMap:ht,opaque:I.transparent===!1&&I.blending===$r&&I.alphaToCoverage===!1,alphaMap:Mt,alphaTest:Rt,alphaHash:Nt,combine:I.combine,mapUv:kt&&y(I.map.channel),aoMapUv:xt&&y(I.aoMap.channel),lightMapUv:T&&y(I.lightMap.channel),bumpMapUv:et&&y(I.bumpMap.channel),normalMapUv:$&&y(I.normalMap.channel),displacementMapUv:C&&y(I.displacementMap.channel),emissiveMapUv:M&&y(I.emissiveMap.channel),metalnessMapUv:B&&y(I.metalnessMap.channel),roughnessMapUv:X&&y(I.roughnessMap.channel),anisotropyMapUv:Tt&&y(I.anisotropyMap.channel),clearcoatMapUv:Et&&y(I.clearcoatMap.channel),clearcoatNormalMapUv:At&&y(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(I.clearcoatRoughnessMap.channel),iridescenceMapUv:zt&&y(I.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&y(I.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(I.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&y(I.sheenRoughnessMap.channel),specularMapUv:oe&&y(I.specularMap.channel),specularColorMapUv:ae&&y(I.specularColorMap.channel),specularIntensityMapUv:te&&y(I.specularIntensityMap.channel),transmissionMapUv:Ft&&y(I.transmissionMap.channel),thicknessMapUv:D&&y(I.thicknessMap.channel),alphaMapUv:Mt&&y(I.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&($||J),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!Z.attributes.uv&&(kt||Mt),fog:!!P,useFog:I.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:p,skinning:H.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:tt,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:I.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:ue,useLegacyLights:r._useLegacyLights,decodeVideoTexture:kt&&I.map.isVideoTexture===!0&&_e.getTransfer(I.map.colorSpace)===we,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===vn,flipSided:I.side===xn,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:re&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:re&&I.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return ve.vertexUv1s=d.has(1),ve.vertexUv2s=d.has(2),ve.vertexUv3s=d.has(3),d.clear(),ve}function v(I){const R=[];if(I.shaderID?R.push(I.shaderID):(R.push(I.customVertexShaderID),R.push(I.customFragmentShaderID)),I.defines!==void 0)for(const W in I.defines)R.push(W),R.push(I.defines[W]);return I.isRawShaderMaterial===!1&&(S(R,I),w(R,I),R.push(r.outputColorSpace)),R.push(I.customProgramCacheKey),R.join()}function S(I,R){I.push(R.precision),I.push(R.outputColorSpace),I.push(R.envMapMode),I.push(R.envMapCubeUVHeight),I.push(R.mapUv),I.push(R.alphaMapUv),I.push(R.lightMapUv),I.push(R.aoMapUv),I.push(R.bumpMapUv),I.push(R.normalMapUv),I.push(R.displacementMapUv),I.push(R.emissiveMapUv),I.push(R.metalnessMapUv),I.push(R.roughnessMapUv),I.push(R.anisotropyMapUv),I.push(R.clearcoatMapUv),I.push(R.clearcoatNormalMapUv),I.push(R.clearcoatRoughnessMapUv),I.push(R.iridescenceMapUv),I.push(R.iridescenceThicknessMapUv),I.push(R.sheenColorMapUv),I.push(R.sheenRoughnessMapUv),I.push(R.specularMapUv),I.push(R.specularColorMapUv),I.push(R.specularIntensityMapUv),I.push(R.transmissionMapUv),I.push(R.thicknessMapUv),I.push(R.combine),I.push(R.fogExp2),I.push(R.sizeAttenuation),I.push(R.morphTargetsCount),I.push(R.morphAttributeCount),I.push(R.numDirLights),I.push(R.numPointLights),I.push(R.numSpotLights),I.push(R.numSpotLightMaps),I.push(R.numHemiLights),I.push(R.numRectAreaLights),I.push(R.numDirLightShadows),I.push(R.numPointLightShadows),I.push(R.numSpotLightShadows),I.push(R.numSpotLightShadowsWithMaps),I.push(R.numLightProbes),I.push(R.shadowMapType),I.push(R.toneMapping),I.push(R.numClippingPlanes),I.push(R.numClipIntersection),I.push(R.depthPacking)}function w(I,R){c.disableAll(),R.supportsVertexTextures&&c.enable(0),R.instancing&&c.enable(1),R.instancingColor&&c.enable(2),R.instancingMorph&&c.enable(3),R.matcap&&c.enable(4),R.envMap&&c.enable(5),R.normalMapObjectSpace&&c.enable(6),R.normalMapTangentSpace&&c.enable(7),R.clearcoat&&c.enable(8),R.iridescence&&c.enable(9),R.alphaTest&&c.enable(10),R.vertexColors&&c.enable(11),R.vertexAlphas&&c.enable(12),R.vertexUv1s&&c.enable(13),R.vertexUv2s&&c.enable(14),R.vertexUv3s&&c.enable(15),R.vertexTangents&&c.enable(16),R.anisotropy&&c.enable(17),R.alphaHash&&c.enable(18),R.batching&&c.enable(19),I.push(c.mask),c.disableAll(),R.fog&&c.enable(0),R.useFog&&c.enable(1),R.flatShading&&c.enable(2),R.logarithmicDepthBuffer&&c.enable(3),R.skinning&&c.enable(4),R.morphTargets&&c.enable(5),R.morphNormals&&c.enable(6),R.morphColors&&c.enable(7),R.premultipliedAlpha&&c.enable(8),R.shadowMapEnabled&&c.enable(9),R.useLegacyLights&&c.enable(10),R.doubleSided&&c.enable(11),R.flipSided&&c.enable(12),R.useDepthPacking&&c.enable(13),R.dithering&&c.enable(14),R.transmission&&c.enable(15),R.sheen&&c.enable(16),R.opaque&&c.enable(17),R.pointsUvs&&c.enable(18),R.decodeVideoTexture&&c.enable(19),R.alphaToCoverage&&c.enable(20),I.push(c.mask)}function E(I){const R=x[I.type];let W;if(R){const k=ti[R];W=Og.clone(k.uniforms)}else W=I.uniforms;return W}function N(I,R){let W;for(let k=0,H=f.length;k<H;k++){const P=f[k];if(P.cacheKey===R){W=P,++W.usedTimes;break}}return W===void 0&&(W=new jy(r,R,I,o),f.push(W)),W}function U(I){if(--I.usedTimes===0){const R=f.indexOf(I);f[R]=f[f.length-1],f.pop(),I.destroy()}}function O(I){u.remove(I)}function F(){u.dispose()}return{getParameters:g,getProgramCacheKey:v,getUniforms:E,acquireProgram:N,releaseProgram:U,releaseShaderCache:O,programs:f,dispose:F}}function Qy(){let r=new WeakMap;function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function e(o){r.delete(o)}function n(o,l,c){r.get(o)[l]=c}function s(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function tx(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Wh(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Zh(){const r=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(p,_,m,x,y,g){let v=r[t];return v===void 0?(v={id:p.id,object:p,geometry:_,material:m,groupOrder:x,renderOrder:p.renderOrder,z:y,group:g},r[t]=v):(v.id=p.id,v.object=p,v.geometry=_,v.material=m,v.groupOrder=x,v.renderOrder=p.renderOrder,v.z=y,v.group=g),t++,v}function c(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.push(v):m.transparent===!0?s.push(v):e.push(v)}function u(p,_,m,x,y,g){const v=l(p,_,m,x,y,g);m.transmission>0?n.unshift(v):m.transparent===!0?s.unshift(v):e.unshift(v)}function d(p,_){e.length>1&&e.sort(p||tx),n.length>1&&n.sort(_||Wh),s.length>1&&s.sort(_||Wh)}function f(){for(let p=t,_=r.length;p<_;p++){const m=r[p];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:u,finish:f,sort:d}}function ex(){let r=new WeakMap;function t(n,s){const o=r.get(n);let l;return o===void 0?(l=new Zh,r.set(n,[l])):s>=o.length?(l=new Zh,o.push(l)):l=o[s],l}function e(){r=new WeakMap}return{get:t,dispose:e}}function nx(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new K,color:new Qt};break;case"SpotLight":e={position:new K,direction:new K,color:new Qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new K,color:new Qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new K,skyColor:new Qt,groundColor:new Qt};break;case"RectAreaLight":e={color:new Qt,position:new K,halfWidth:new K,halfHeight:new K};break}return r[t.id]=e,e}}}function ix(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let rx=0;function sx(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function ox(r){const t=new nx,e=ix(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new K);const s=new K,o=new Te,l=new Te;function c(d,f){let p=0,_=0,m=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let x=0,y=0,g=0,v=0,S=0,w=0,E=0,N=0,U=0,O=0,F=0;d.sort(sx);const I=f===!0?Math.PI:1;for(let W=0,k=d.length;W<k;W++){const H=d[W],P=H.color,Z=H.intensity,nt=H.distance,ot=H.shadow&&H.shadow.map?H.shadow.map.texture:null;if(H.isAmbientLight)p+=P.r*Z*I,_+=P.g*Z*I,m+=P.b*Z*I;else if(H.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(H.sh.coefficients[j],Z);F++}else if(H.isDirectionalLight){const j=t.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity*I),H.castShadow){const rt=H.shadow,at=e.get(H);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,n.directionalShadow[x]=at,n.directionalShadowMap[x]=ot,n.directionalShadowMatrix[x]=H.shadow.matrix,w++}n.directional[x]=j,x++}else if(H.isSpotLight){const j=t.get(H);j.position.setFromMatrixPosition(H.matrixWorld),j.color.copy(P).multiplyScalar(Z*I),j.distance=nt,j.coneCos=Math.cos(H.angle),j.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),j.decay=H.decay,n.spot[g]=j;const rt=H.shadow;if(H.map&&(n.spotLightMap[U]=H.map,U++,rt.updateMatrices(H),H.castShadow&&O++),n.spotLightMatrix[g]=rt.matrix,H.castShadow){const at=e.get(H);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,n.spotShadow[g]=at,n.spotShadowMap[g]=ot,N++}g++}else if(H.isRectAreaLight){const j=t.get(H);j.color.copy(P).multiplyScalar(Z),j.halfWidth.set(H.width*.5,0,0),j.halfHeight.set(0,H.height*.5,0),n.rectArea[v]=j,v++}else if(H.isPointLight){const j=t.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity*I),j.distance=H.distance,j.decay=H.decay,H.castShadow){const rt=H.shadow,at=e.get(H);at.shadowBias=rt.bias,at.shadowNormalBias=rt.normalBias,at.shadowRadius=rt.radius,at.shadowMapSize=rt.mapSize,at.shadowCameraNear=rt.camera.near,at.shadowCameraFar=rt.camera.far,n.pointShadow[y]=at,n.pointShadowMap[y]=ot,n.pointShadowMatrix[y]=H.shadow.matrix,E++}n.point[y]=j,y++}else if(H.isHemisphereLight){const j=t.get(H);j.skyColor.copy(H.color).multiplyScalar(Z*I),j.groundColor.copy(H.groundColor).multiplyScalar(Z*I),n.hemi[S]=j,S++}}v>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=p,n.ambient[1]=_,n.ambient[2]=m;const R=n.hash;(R.directionalLength!==x||R.pointLength!==y||R.spotLength!==g||R.rectAreaLength!==v||R.hemiLength!==S||R.numDirectionalShadows!==w||R.numPointShadows!==E||R.numSpotShadows!==N||R.numSpotMaps!==U||R.numLightProbes!==F)&&(n.directional.length=x,n.spot.length=g,n.rectArea.length=v,n.point.length=y,n.hemi.length=S,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=N,n.spotShadowMap.length=N,n.directionalShadowMatrix.length=w,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=N+U-O,n.spotLightMap.length=U,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=F,R.directionalLength=x,R.pointLength=y,R.spotLength=g,R.rectAreaLength=v,R.hemiLength=S,R.numDirectionalShadows=w,R.numPointShadows=E,R.numSpotShadows=N,R.numSpotMaps=U,R.numLightProbes=F,n.version=rx++)}function u(d,f){let p=0,_=0,m=0,x=0,y=0;const g=f.matrixWorldInverse;for(let v=0,S=d.length;v<S;v++){const w=d[v];if(w.isDirectionalLight){const E=n.directional[p];E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),p++}else if(w.isSpotLight){const E=n.spot[m];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),m++}else if(w.isRectAreaLight){const E=n.rectArea[x];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),l.identity(),o.copy(w.matrixWorld),o.premultiply(g),l.extractRotation(o),E.halfWidth.set(w.width*.5,0,0),E.halfHeight.set(0,w.height*.5,0),E.halfWidth.applyMatrix4(l),E.halfHeight.applyMatrix4(l),x++}else if(w.isPointLight){const E=n.point[_];E.position.setFromMatrixPosition(w.matrixWorld),E.position.applyMatrix4(g),_++}else if(w.isHemisphereLight){const E=n.hemi[y];E.direction.setFromMatrixPosition(w.matrixWorld),E.direction.transformDirection(g),y++}}}return{setup:c,setupView:u,state:n}}function Xh(r){const t=new ox(r),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function u(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:u,pushLight:o,pushShadow:l}}function ax(r){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new Xh(r),t.set(s,[c])):o>=l.length?(c=new Xh(r),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class lx extends ur{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class cx extends ur{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const ux=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hx=`uniform sampler2D shadow_pass;
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
}`;function dx(r,t,e){let n=new gc;const s=new vt,o=new vt,l=new $e,c=new lx({depthPacking:sg}),u=new cx,d={},f=e.maxTextureSize,p={[Oi]:xn,[xn]:Oi,[vn]:vn},_=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:ux,fragmentShader:hx}),m=_.clone();m.defines.HORIZONTAL_PASS=1;const x=new Oe;x.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Ie(x,_),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cd;let v=this.type;this.render=function(U,O,F){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||U.length===0)return;const I=r.getRenderTarget(),R=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),k=r.state;k.setBlending(Ii),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const H=v!==mi&&this.type===mi,P=v===mi&&this.type!==mi;for(let Z=0,nt=U.length;Z<nt;Z++){const ot=U[Z],j=ot.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const rt=j.getFrameExtents();if(s.multiply(rt),o.copy(j.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/rt.x),s.x=o.x*rt.x,j.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/rt.y),s.y=o.y*rt.y,j.mapSize.y=o.y)),j.map===null||H===!0||P===!0){const q=this.type!==mi?{minFilter:Nn,magFilter:Nn}:{};j.map!==null&&j.map.dispose(),j.map=new sr(s.x,s.y,q),j.map.texture.name=ot.name+".shadowMap",j.camera.updateProjectionMatrix()}r.setRenderTarget(j.map),r.clear();const at=j.getViewportCount();for(let q=0;q<at;q++){const tt=j.getViewport(q);l.set(o.x*tt.x,o.y*tt.y,o.x*tt.z,o.y*tt.w),k.viewport(l),j.updateMatrices(ot,q),n=j.getFrustum(),E(O,F,j.camera,ot,this.type)}j.isPointLightShadow!==!0&&this.type===mi&&S(j,F),j.needsUpdate=!1}v=this.type,g.needsUpdate=!1,r.setRenderTarget(I,R,W)};function S(U,O){const F=t.update(y);_.defines.VSM_SAMPLES!==U.blurSamples&&(_.defines.VSM_SAMPLES=U.blurSamples,m.defines.VSM_SAMPLES=U.blurSamples,_.needsUpdate=!0,m.needsUpdate=!0),U.mapPass===null&&(U.mapPass=new sr(s.x,s.y)),_.uniforms.shadow_pass.value=U.map.texture,_.uniforms.resolution.value=U.mapSize,_.uniforms.radius.value=U.radius,r.setRenderTarget(U.mapPass),r.clear(),r.renderBufferDirect(O,null,F,_,y,null),m.uniforms.shadow_pass.value=U.mapPass.texture,m.uniforms.resolution.value=U.mapSize,m.uniforms.radius.value=U.radius,r.setRenderTarget(U.map),r.clear(),r.renderBufferDirect(O,null,F,m,y,null)}function w(U,O,F,I){let R=null;const W=F.isPointLight===!0?U.customDistanceMaterial:U.customDepthMaterial;if(W!==void 0)R=W;else if(R=F.isPointLight===!0?u:c,r.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0){const k=R.uuid,H=O.uuid;let P=d[k];P===void 0&&(P={},d[k]=P);let Z=P[H];Z===void 0&&(Z=R.clone(),P[H]=Z,O.addEventListener("dispose",N)),R=Z}if(R.visible=O.visible,R.wireframe=O.wireframe,I===mi?R.side=O.shadowSide!==null?O.shadowSide:O.side:R.side=O.shadowSide!==null?O.shadowSide:p[O.side],R.alphaMap=O.alphaMap,R.alphaTest=O.alphaTest,R.map=O.map,R.clipShadows=O.clipShadows,R.clippingPlanes=O.clippingPlanes,R.clipIntersection=O.clipIntersection,R.displacementMap=O.displacementMap,R.displacementScale=O.displacementScale,R.displacementBias=O.displacementBias,R.wireframeLinewidth=O.wireframeLinewidth,R.linewidth=O.linewidth,F.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const k=r.properties.get(R);k.light=F}return R}function E(U,O,F,I,R){if(U.visible===!1)return;if(U.layers.test(O.layers)&&(U.isMesh||U.isLine||U.isPoints)&&(U.castShadow||U.receiveShadow&&R===mi)&&(!U.frustumCulled||n.intersectsObject(U))){U.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,U.matrixWorld);const H=t.update(U),P=U.material;if(Array.isArray(P)){const Z=H.groups;for(let nt=0,ot=Z.length;nt<ot;nt++){const j=Z[nt],rt=P[j.materialIndex];if(rt&&rt.visible){const at=w(U,rt,I,R);U.onBeforeShadow(r,U,O,F,H,at,j),r.renderBufferDirect(F,null,H,at,U,j),U.onAfterShadow(r,U,O,F,H,at,j)}}}else if(P.visible){const Z=w(U,P,I,R);U.onBeforeShadow(r,U,O,F,H,Z,null),r.renderBufferDirect(F,null,H,Z,U,null),U.onAfterShadow(r,U,O,F,H,Z,null)}}const k=U.children;for(let H=0,P=k.length;H<P;H++)E(k[H],O,F,I,R)}function N(U){U.target.removeEventListener("dispose",N);for(const F in d){const I=d[F],R=U.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function fx(r){function t(){let D=!1;const ht=new $e;let Mt=null;const Rt=new $e(0,0,0,0);return{setMask:function(Nt){Mt!==Nt&&!D&&(r.colorMask(Nt,Nt,Nt,Nt),Mt=Nt)},setLocked:function(Nt){D=Nt},setClear:function(Nt,re,ue,ve,Ue){Ue===!0&&(Nt*=ve,re*=ve,ue*=ve),ht.set(Nt,re,ue,ve),Rt.equals(ht)===!1&&(r.clearColor(Nt,re,ue,ve),Rt.copy(ht))},reset:function(){D=!1,Mt=null,Rt.set(-1,0,0,0)}}}function e(){let D=!1,ht=null,Mt=null,Rt=null;return{setTest:function(Nt){Nt?wt(r.DEPTH_TEST):St(r.DEPTH_TEST)},setMask:function(Nt){ht!==Nt&&!D&&(r.depthMask(Nt),ht=Nt)},setFunc:function(Nt){if(Mt!==Nt){switch(Nt){case Im:r.depthFunc(r.NEVER);break;case Dm:r.depthFunc(r.ALWAYS);break;case Nm:r.depthFunc(r.LESS);break;case ia:r.depthFunc(r.LEQUAL);break;case Om:r.depthFunc(r.EQUAL);break;case Um:r.depthFunc(r.GEQUAL);break;case km:r.depthFunc(r.GREATER);break;case zm:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Mt=Nt}},setLocked:function(Nt){D=Nt},setClear:function(Nt){Rt!==Nt&&(r.clearDepth(Nt),Rt=Nt)},reset:function(){D=!1,ht=null,Mt=null,Rt=null}}}function n(){let D=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,ve=null,Ue=null;return{setTest:function(ge){D||(ge?wt(r.STENCIL_TEST):St(r.STENCIL_TEST))},setMask:function(ge){ht!==ge&&!D&&(r.stencilMask(ge),ht=ge)},setFunc:function(ge,Le,Ee){(Mt!==ge||Rt!==Le||Nt!==Ee)&&(r.stencilFunc(ge,Le,Ee),Mt=ge,Rt=Le,Nt=Ee)},setOp:function(ge,Le,Ee){(re!==ge||ue!==Le||ve!==Ee)&&(r.stencilOp(ge,Le,Ee),re=ge,ue=Le,ve=Ee)},setLocked:function(ge){D=ge},setClear:function(ge){Ue!==ge&&(r.clearStencil(ge),Ue=ge)},reset:function(){D=!1,ht=null,Mt=null,Rt=null,Nt=null,re=null,ue=null,ve=null,Ue=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,u=new WeakMap;let d={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,w=null,E=null,N=null,U=new Qt(0,0,0),O=0,F=!1,I=null,R=null,W=null,k=null,H=null;const P=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,nt=0;const ot=r.getParameter(r.VERSION);ot.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(ot)[1]),Z=nt>=1):ot.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),Z=nt>=2);let j=null,rt={};const at=r.getParameter(r.SCISSOR_BOX),q=r.getParameter(r.VIEWPORT),tt=new $e().fromArray(at),Lt=new $e().fromArray(q);function Q(D,ht,Mt,Rt){const Nt=new Uint8Array(4),re=r.createTexture();r.bindTexture(D,re),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ue=0;ue<Mt;ue++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(ht,0,r.RGBA,1,1,Rt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(ht+ue,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return re}const it={};it[r.TEXTURE_2D]=Q(r.TEXTURE_2D,r.TEXTURE_2D,1),it[r.TEXTURE_CUBE_MAP]=Q(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[r.TEXTURE_2D_ARRAY]=Q(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),it[r.TEXTURE_3D]=Q(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),wt(r.DEPTH_TEST),o.setFunc(ia),et(!1),$(Cu),wt(r.CULL_FACE),xt(Ii);function wt(D){d[D]!==!0&&(r.enable(D),d[D]=!0)}function St(D){d[D]!==!1&&(r.disable(D),d[D]=!1)}function Pt(D,ht){return f[D]!==ht?(r.bindFramebuffer(D,ht),f[D]=ht,D===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ht),D===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ht),!0):!1}function It(D,ht){let Mt=_,Rt=!1;if(D){Mt=p.get(ht),Mt===void 0&&(Mt=[],p.set(ht,Mt));const Nt=D.textures;if(Mt.length!==Nt.length||Mt[0]!==r.COLOR_ATTACHMENT0){for(let re=0,ue=Nt.length;re<ue;re++)Mt[re]=r.COLOR_ATTACHMENT0+re;Mt.length=Nt.length,Rt=!0}}else Mt[0]!==r.BACK&&(Mt[0]=r.BACK,Rt=!0);Rt&&r.drawBuffers(Mt)}function kt(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const st={[Ji]:r.FUNC_ADD,[mm]:r.FUNC_SUBTRACT,[gm]:r.FUNC_REVERSE_SUBTRACT};st[_m]=r.MIN,st[vm]=r.MAX;const yt={[ym]:r.ZERO,[xm]:r.ONE,[bm]:r.SRC_COLOR,[Xl]:r.SRC_ALPHA,[Am]:r.SRC_ALPHA_SATURATE,[Em]:r.DST_COLOR,[Mm]:r.DST_ALPHA,[wm]:r.ONE_MINUS_SRC_COLOR,[ql]:r.ONE_MINUS_SRC_ALPHA,[Tm]:r.ONE_MINUS_DST_COLOR,[Sm]:r.ONE_MINUS_DST_ALPHA,[Cm]:r.CONSTANT_COLOR,[Lm]:r.ONE_MINUS_CONSTANT_COLOR,[Pm]:r.CONSTANT_ALPHA,[Rm]:r.ONE_MINUS_CONSTANT_ALPHA};function xt(D,ht,Mt,Rt,Nt,re,ue,ve,Ue,ge){if(D===Ii){x===!0&&(St(r.BLEND),x=!1);return}if(x===!1&&(wt(r.BLEND),x=!0),D!==pm){if(D!==y||ge!==F){if((g!==Ji||w!==Ji)&&(r.blendEquation(r.FUNC_ADD),g=Ji,w=Ji),ge)switch(D){case $r:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Lu:r.blendFunc(r.ONE,r.ONE);break;case Pu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ru:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case $r:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Lu:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Pu:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ru:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}v=null,S=null,E=null,N=null,U.set(0,0,0),O=0,y=D,F=ge}return}Nt=Nt||ht,re=re||Mt,ue=ue||Rt,(ht!==g||Nt!==w)&&(r.blendEquationSeparate(st[ht],st[Nt]),g=ht,w=Nt),(Mt!==v||Rt!==S||re!==E||ue!==N)&&(r.blendFuncSeparate(yt[Mt],yt[Rt],yt[re],yt[ue]),v=Mt,S=Rt,E=re,N=ue),(ve.equals(U)===!1||Ue!==O)&&(r.blendColor(ve.r,ve.g,ve.b,Ue),U.copy(ve),O=Ue),y=D,F=!1}function T(D,ht){D.side===vn?St(r.CULL_FACE):wt(r.CULL_FACE);let Mt=D.side===xn;ht&&(Mt=!Mt),et(Mt),D.blending===$r&&D.transparent===!1?xt(Ii):xt(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const Rt=D.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),M(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?wt(r.SAMPLE_ALPHA_TO_COVERAGE):St(r.SAMPLE_ALPHA_TO_COVERAGE)}function et(D){I!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),I=D)}function $(D){D!==hm?(wt(r.CULL_FACE),D!==R&&(D===Cu?r.cullFace(r.BACK):D===dm?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):St(r.CULL_FACE),R=D}function C(D){D!==W&&(Z&&r.lineWidth(D),W=D)}function M(D,ht,Mt){D?(wt(r.POLYGON_OFFSET_FILL),(k!==ht||H!==Mt)&&(r.polygonOffset(ht,Mt),k=ht,H=Mt)):St(r.POLYGON_OFFSET_FILL)}function B(D){D?wt(r.SCISSOR_TEST):St(r.SCISSOR_TEST)}function X(D){D===void 0&&(D=r.TEXTURE0+P-1),j!==D&&(r.activeTexture(D),j=D)}function J(D,ht,Mt){Mt===void 0&&(j===null?Mt=r.TEXTURE0+P-1:Mt=j);let Rt=rt[Mt];Rt===void 0&&(Rt={type:void 0,texture:void 0},rt[Mt]=Rt),(Rt.type!==D||Rt.texture!==ht)&&(j!==Mt&&(r.activeTexture(Mt),j=Mt),r.bindTexture(D,ht||it[D]),Rt.type=D,Rt.texture=ht)}function G(){const D=rt[j];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ft(){try{r.compressedTexImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function pt(){try{r.texSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Tt(){try{r.texSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function At(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ht(){try{r.texStorage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function zt(){try{r.texStorage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Dt(){try{r.texImage2D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Vt(D){tt.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),tt.copy(D))}function oe(D){Lt.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),Lt.copy(D))}function ae(D,ht){let Mt=u.get(ht);Mt===void 0&&(Mt=new WeakMap,u.set(ht,Mt));let Rt=Mt.get(D);Rt===void 0&&(Rt=r.getUniformBlockIndex(ht,D.name),Mt.set(D,Rt))}function te(D,ht){const Rt=u.get(ht).get(D);c.get(ht)!==Rt&&(r.uniformBlockBinding(ht,Rt,D.__bindingPointIndex),c.set(ht,Rt))}function Ft(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},j=null,rt={},f={},p=new WeakMap,_=[],m=null,x=!1,y=null,g=null,v=null,S=null,w=null,E=null,N=null,U=new Qt(0,0,0),O=0,F=!1,I=null,R=null,W=null,k=null,H=null,tt.set(0,0,r.canvas.width,r.canvas.height),Lt.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:wt,disable:St,bindFramebuffer:Pt,drawBuffers:It,useProgram:kt,setBlending:xt,setMaterial:T,setFlipSided:et,setCullFace:$,setLineWidth:C,setPolygonOffset:M,setScissorTest:B,activeTexture:X,bindTexture:J,unbindTexture:G,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Kt,updateUBOMapping:ae,uniformBlockBinding:te,texStorage2D:Ht,texStorage3D:zt,texSubImage2D:pt,texSubImage3D:Tt,compressedTexSubImage2D:Et,compressedTexSubImage3D:At,scissor:Vt,viewport:oe,reset:Ft}}function px(r,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,u=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new vt,f=new WeakMap;let p;const _=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(C,M){return m?new OffscreenCanvas(C,M):ca("canvas")}function y(C,M,B){let X=1;const J=$(C);if((J.width>B||J.height>B)&&(X=B/Math.max(J.width,J.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const G=Math.floor(X*J.width),ft=Math.floor(X*J.height);p===void 0&&(p=x(G,ft));const lt=M?x(G,ft):p;return lt.width=G,lt.height=ft,lt.getContext("2d").drawImage(C,0,0,G,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+G+"x"+ft+")."),lt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),C;return C}function g(C){return C.generateMipmaps&&C.minFilter!==Nn&&C.minFilter!==Gn}function v(C){r.generateMipmap(C)}function S(C,M,B,X,J=!1){if(C!==null){if(r[C]!==void 0)return r[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let G=M;if(M===r.RED&&(B===r.FLOAT&&(G=r.R32F),B===r.HALF_FLOAT&&(G=r.R16F),B===r.UNSIGNED_BYTE&&(G=r.R8)),M===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.R8UI),B===r.UNSIGNED_SHORT&&(G=r.R16UI),B===r.UNSIGNED_INT&&(G=r.R32UI),B===r.BYTE&&(G=r.R8I),B===r.SHORT&&(G=r.R16I),B===r.INT&&(G=r.R32I)),M===r.RG&&(B===r.FLOAT&&(G=r.RG32F),B===r.HALF_FLOAT&&(G=r.RG16F),B===r.UNSIGNED_BYTE&&(G=r.RG8)),M===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(G=r.RG8UI),B===r.UNSIGNED_SHORT&&(G=r.RG16UI),B===r.UNSIGNED_INT&&(G=r.RG32UI),B===r.BYTE&&(G=r.RG8I),B===r.SHORT&&(G=r.RG16I),B===r.INT&&(G=r.RG32I)),M===r.RGB&&B===r.UNSIGNED_INT_5_9_9_9_REV&&(G=r.RGB9_E5),M===r.RGBA){const ft=J?sa:_e.getTransfer(X);B===r.FLOAT&&(G=r.RGBA32F),B===r.HALF_FLOAT&&(G=r.RGBA16F),B===r.UNSIGNED_BYTE&&(G=ft===we?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT_4_4_4_4&&(G=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(G=r.RGB5_A1)}return(G===r.R16F||G===r.R32F||G===r.RG16F||G===r.RG32F||G===r.RGBA16F||G===r.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function w(C,M){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==Nn&&C.minFilter!==Gn?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function E(C){const M=C.target;M.removeEventListener("dispose",E),U(M),M.isVideoTexture&&f.delete(M)}function N(C){const M=C.target;M.removeEventListener("dispose",N),F(M)}function U(C){const M=n.get(C);if(M.__webglInit===void 0)return;const B=C.source,X=_.get(B);if(X){const J=X[M.__cacheKey];J.usedTimes--,J.usedTimes===0&&O(C),Object.keys(X).length===0&&_.delete(B)}n.remove(C)}function O(C){const M=n.get(C);r.deleteTexture(M.__webglTexture);const B=C.source,X=_.get(B);delete X[M.__cacheKey],l.memory.textures--}function F(C){const M=n.get(C);if(C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(M.__webglFramebuffer[X]))for(let J=0;J<M.__webglFramebuffer[X].length;J++)r.deleteFramebuffer(M.__webglFramebuffer[X][J]);else r.deleteFramebuffer(M.__webglFramebuffer[X]);M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer[X])}else{if(Array.isArray(M.__webglFramebuffer))for(let X=0;X<M.__webglFramebuffer.length;X++)r.deleteFramebuffer(M.__webglFramebuffer[X]);else r.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&r.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&r.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let X=0;X<M.__webglColorRenderbuffer.length;X++)M.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(M.__webglColorRenderbuffer[X]);M.__webglDepthRenderbuffer&&r.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const B=C.textures;for(let X=0,J=B.length;X<J;X++){const G=n.get(B[X]);G.__webglTexture&&(r.deleteTexture(G.__webglTexture),l.memory.textures--),n.remove(B[X])}n.remove(C)}let I=0;function R(){I=0}function W(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function k(C){const M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function H(C,M){const B=n.get(C);if(C.isVideoTexture&&T(C),C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){const X=C.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(B,C,M);return}}e.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+M)}function P(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,M);return}e.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+M)}function Z(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){tt(B,C,M);return}e.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+M)}function nt(C,M){const B=n.get(C);if(C.version>0&&B.__version!==C.version){Lt(B,C,M);return}e.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+M)}const ot={[$l]:r.REPEAT,[nr]:r.CLAMP_TO_EDGE,[Kl]:r.MIRRORED_REPEAT},j={[Nn]:r.NEAREST,[qm]:r.NEAREST_MIPMAP_NEAREST,[bo]:r.NEAREST_MIPMAP_LINEAR,[Gn]:r.LINEAR,[Qa]:r.LINEAR_MIPMAP_NEAREST,[ir]:r.LINEAR_MIPMAP_LINEAR},rt={[ag]:r.NEVER,[fg]:r.ALWAYS,[lg]:r.LESS,[Bd]:r.LEQUAL,[cg]:r.EQUAL,[dg]:r.GEQUAL,[ug]:r.GREATER,[hg]:r.NOTEQUAL};function at(C,M){if(M.type===Ri&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Gn||M.magFilter===Qa||M.magFilter===bo||M.magFilter===ir||M.minFilter===Gn||M.minFilter===Qa||M.minFilter===bo||M.minFilter===ir)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(C,r.TEXTURE_WRAP_S,ot[M.wrapS]),r.texParameteri(C,r.TEXTURE_WRAP_T,ot[M.wrapT]),(C===r.TEXTURE_3D||C===r.TEXTURE_2D_ARRAY)&&r.texParameteri(C,r.TEXTURE_WRAP_R,ot[M.wrapR]),r.texParameteri(C,r.TEXTURE_MAG_FILTER,j[M.magFilter]),r.texParameteri(C,r.TEXTURE_MIN_FILTER,j[M.minFilter]),M.compareFunction&&(r.texParameteri(C,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(C,r.TEXTURE_COMPARE_FUNC,rt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Nn||M.minFilter!==bo&&M.minFilter!==ir||M.type===Ri&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");r.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function q(C,M){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",E));const X=M.source;let J=_.get(X);J===void 0&&(J={},_.set(X,J));const G=k(M);if(G!==C.__cacheKey){J[G]===void 0&&(J[G]={texture:r.createTexture(),usedTimes:0},l.memory.textures++,B=!0),J[G].usedTimes++;const ft=J[C.__cacheKey];ft!==void 0&&(J[C.__cacheKey].usedTimes--,ft.usedTimes===0&&O(M)),C.__cacheKey=G,C.__webglTexture=J[G].texture}return B}function tt(C,M,B){let X=r.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),M.isData3DTexture&&(X=r.TEXTURE_3D);const J=q(C,M),G=M.source;e.bindTexture(X,C.__webglTexture,r.TEXTURE0+B);const ft=n.get(G);if(G.version!==ft.__version||J===!0){e.activeTexture(r.TEXTURE0+B);const lt=_e.getPrimaries(_e.workingColorSpace),pt=M.colorSpace===Pi?null:_e.getPrimaries(M.colorSpace),Tt=M.colorSpace===Pi||lt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Et=y(M.image,!1,s.maxTextureSize);Et=et(M,Et);const At=o.convert(M.format,M.colorSpace),Ht=o.convert(M.type);let zt=S(M.internalFormat,At,Ht,M.colorSpace,M.isVideoTexture);at(X,M);let Dt;const Kt=M.mipmaps,Vt=M.isVideoTexture!==!0&&zt!==zd,oe=ft.__version===void 0||J===!0,ae=G.dataReady,te=w(M,Et);if(M.isDepthTexture)zt=r.DEPTH_COMPONENT16,M.type===Ri?zt=r.DEPTH_COMPONENT32F:M.type===is?zt=r.DEPTH_COMPONENT24:M.type===js&&(zt=r.DEPTH24_STENCIL8),oe&&(Vt?e.texStorage2D(r.TEXTURE_2D,1,zt,Et.width,Et.height):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,null));else if(M.isDataTexture)if(Kt.length>0){Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data);M.generateMipmaps=!1}else Vt?(oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Et.width,Et.height),ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Et.width,Et.height,At,Ht,Et.data)):e.texImage2D(r.TEXTURE_2D,0,zt,Et.width,Et.height,0,At,Ht,Et.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Vt&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,te,zt,Kt[0].width,Kt[0].height,Et.depth);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],M.format!==ni?At!==null?Vt?ae&&e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Dt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Ft,0,0,0,Dt.width,Dt.height,Et.depth,At,Ht,Dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Ft,zt,Dt.width,Dt.height,Et.depth,0,At,Ht,Dt.data)}else{Vt&&oe&&e.texStorage2D(r.TEXTURE_2D,te,zt,Kt[0].width,Kt[0].height);for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],M.format!==ni?At!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,Dt.width,Dt.height,At,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Ft,zt,Dt.width,Dt.height,0,At,Ht,Dt.data)}else if(M.isDataArrayTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(M.isData3DTexture)Vt?(oe&&e.texStorage3D(r.TEXTURE_3D,te,zt,Et.width,Et.height,Et.depth),ae&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,At,Ht,Et.data)):e.texImage3D(r.TEXTURE_3D,0,zt,Et.width,Et.height,Et.depth,0,At,Ht,Et.data);else if(M.isFramebufferTexture){if(oe)if(Vt)e.texStorage2D(r.TEXTURE_2D,te,zt,Et.width,Et.height);else{let Ft=Et.width,D=Et.height;for(let ht=0;ht<te;ht++)e.texImage2D(r.TEXTURE_2D,ht,zt,Ft,D,0,At,Ht,null),Ft>>=1,D>>=1}}else if(Kt.length>0){if(Vt&&oe){const Ft=$(Kt[0]);e.texStorage2D(r.TEXTURE_2D,te,zt,Ft.width,Ft.height)}for(let Ft=0,D=Kt.length;Ft<D;Ft++)Dt=Kt[Ft],Vt?ae&&e.texSubImage2D(r.TEXTURE_2D,Ft,0,0,At,Ht,Dt):e.texImage2D(r.TEXTURE_2D,Ft,zt,At,Ht,Dt);M.generateMipmaps=!1}else if(Vt){if(oe){const Ft=$(Et);e.texStorage2D(r.TEXTURE_2D,te,zt,Ft.width,Ft.height)}ae&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,At,Ht,Et)}else e.texImage2D(r.TEXTURE_2D,0,zt,At,Ht,Et);g(M)&&v(X),ft.__version=G.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Lt(C,M,B){if(M.image.length!==6)return;const X=q(C,M),J=M.source;e.bindTexture(r.TEXTURE_CUBE_MAP,C.__webglTexture,r.TEXTURE0+B);const G=n.get(J);if(J.version!==G.__version||X===!0){e.activeTexture(r.TEXTURE0+B);const ft=_e.getPrimaries(_e.workingColorSpace),lt=M.colorSpace===Pi?null:_e.getPrimaries(M.colorSpace),pt=M.colorSpace===Pi||ft===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,M.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,M.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Tt=M.isCompressedTexture||M.image[0].isCompressedTexture,Et=M.image[0]&&M.image[0].isDataTexture,At=[];for(let D=0;D<6;D++)!Tt&&!Et?At[D]=y(M.image[D],!0,s.maxCubemapSize):At[D]=Et?M.image[D].image:M.image[D],At[D]=et(M,At[D]);const Ht=At[0],zt=o.convert(M.format,M.colorSpace),Dt=o.convert(M.type),Kt=S(M.internalFormat,zt,Dt,M.colorSpace),Vt=M.isVideoTexture!==!0,oe=G.__version===void 0||X===!0,ae=J.dataReady;let te=w(M,Ht);at(r.TEXTURE_CUBE_MAP,M);let Ft;if(Tt){Vt&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,te,Kt,Ht.width,Ht.height);for(let D=0;D<6;D++){Ft=At[D].mipmaps;for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];M.format!==ni?zt!==null?Vt?ae&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,0,0,Mt.width,Mt.height,zt,Mt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,Kt,Mt.width,Mt.height,0,Mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,0,0,Mt.width,Mt.height,zt,Dt,Mt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht,Kt,Mt.width,Mt.height,0,zt,Dt,Mt.data)}}}else{if(Ft=M.mipmaps,Vt&&oe){Ft.length>0&&te++;const D=$(At[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,te,Kt,D.width,D.height)}for(let D=0;D<6;D++)if(Et){Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,At[D].width,At[D].height,zt,Dt,At[D].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,At[D].width,At[D].height,0,zt,Dt,At[D].data);for(let ht=0;ht<Ft.length;ht++){const Rt=Ft[ht].image[D].image;Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,0,0,Rt.width,Rt.height,zt,Dt,Rt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,Kt,Rt.width,Rt.height,0,zt,Dt,Rt.data)}}else{Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,0,0,zt,Dt,At[D]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0,Kt,zt,Dt,At[D]);for(let ht=0;ht<Ft.length;ht++){const Mt=Ft[ht];Vt?ae&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,0,0,zt,Dt,Mt.image[D]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+D,ht+1,Kt,zt,Dt,Mt.image[D])}}}g(M)&&v(r.TEXTURE_CUBE_MAP),G.__version=J.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Q(C,M,B,X,J,G){const ft=o.convert(B.format,B.colorSpace),lt=o.convert(B.type),pt=S(B.internalFormat,ft,lt,B.colorSpace);if(!n.get(M).__hasExternalTextures){const Et=Math.max(1,M.width>>G),At=Math.max(1,M.height>>G);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?e.texImage3D(J,G,pt,Et,At,M.depth,0,ft,lt,null):e.texImage2D(J,G,pt,Et,At,0,ft,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,C),xt(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,J,n.get(B).__webglTexture,0,yt(M)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,J,n.get(B).__webglTexture,G),e.bindFramebuffer(r.FRAMEBUFFER,null)}function it(C,M,B){if(r.bindRenderbuffer(r.RENDERBUFFER,C),M.depthBuffer&&!M.stencilBuffer){let X=r.DEPTH_COMPONENT24;if(B||xt(M)){const J=M.depthTexture;J&&J.isDepthTexture&&(J.type===Ri?X=r.DEPTH_COMPONENT32F:J.type===is&&(X=r.DEPTH_COMPONENT24));const G=yt(M);xt(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,G,X,M.width,M.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,G,X,M.width,M.height)}else r.renderbufferStorage(r.RENDERBUFFER,X,M.width,M.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,C)}else if(M.depthBuffer&&M.stencilBuffer){const X=yt(M);B&&xt(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,M.width,M.height):xt(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,M.width,M.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,C)}else{const X=M.textures;for(let J=0;J<X.length;J++){const G=X[J],ft=o.convert(G.format,G.colorSpace),lt=o.convert(G.type),pt=S(G.internalFormat,ft,lt,G.colorSpace),Tt=yt(M);B&&xt(M)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Tt,pt,M.width,M.height):xt(M)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Tt,pt,M.width,M.height):r.renderbufferStorage(r.RENDERBUFFER,pt,M.width,M.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function wt(C,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),H(M.depthTexture,0);const X=n.get(M.depthTexture).__webglTexture,J=yt(M);if(M.depthTexture.format===Kr)xt(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else if(M.depthTexture.format===Gs)xt(M)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function St(C){const M=n.get(C),B=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!M.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");wt(M.__webglFramebuffer,C)}else if(B){M.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer[X]),M.__webglDepthbuffer[X]=r.createRenderbuffer(),it(M.__webglDepthbuffer[X],C,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=r.createRenderbuffer(),it(M.__webglDepthbuffer,C,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(C,M,B){const X=n.get(C);M!==void 0&&Q(X.__webglFramebuffer,C,C.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&St(C)}function It(C){const M=C.texture,B=n.get(C),X=n.get(M);C.addEventListener("dispose",N);const J=C.textures,G=C.isWebGLCubeRenderTarget===!0,ft=J.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=M.version,l.memory.textures++),G){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let pt=0;pt<M.mipmaps.length;pt++)B.__webglFramebuffer[lt][pt]=r.createFramebuffer()}else B.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)B.__webglFramebuffer[lt]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(ft)for(let lt=0,pt=J.length;lt<pt;lt++){const Tt=n.get(J[lt]);Tt.__webglTexture===void 0&&(Tt.__webglTexture=r.createTexture(),l.memory.textures++)}if(C.samples>0&&xt(C)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<J.length;lt++){const pt=J[lt];B.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const Tt=o.convert(pt.format,pt.colorSpace),Et=o.convert(pt.type),At=S(pt.internalFormat,Tt,Et,pt.colorSpace,C.isXRRenderTarget===!0),Ht=yt(C);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,At,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),it(B.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(G){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),at(r.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)Q(B.__webglFramebuffer[lt][pt],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else Q(B.__webglFramebuffer[lt],C,M,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);g(M)&&v(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=J.length;lt<pt;lt++){const Tt=J[lt],Et=n.get(Tt);e.bindTexture(r.TEXTURE_2D,Et.__webglTexture),at(r.TEXTURE_2D,Tt),Q(B.__webglFramebuffer,C,Tt,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),g(Tt)&&v(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(lt=C.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),at(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let pt=0;pt<M.mipmaps.length;pt++)Q(B.__webglFramebuffer[pt],C,M,r.COLOR_ATTACHMENT0,lt,pt);else Q(B.__webglFramebuffer,C,M,r.COLOR_ATTACHMENT0,lt,0);g(M)&&v(lt),e.unbindTexture()}C.depthBuffer&&St(C)}function kt(C){const M=C.textures;for(let B=0,X=M.length;B<X;B++){const J=M[B];if(g(J)){const G=C.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ft=n.get(J).__webglTexture;e.bindTexture(G,ft),v(G),e.unbindTexture()}}}function st(C){if(C.samples>0&&xt(C)===!1){const M=C.textures,B=C.width,X=C.height;let J=r.COLOR_BUFFER_BIT;const G=[],ft=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(C),pt=M.length>1;if(pt)for(let Tt=0;Tt<M.length;Tt++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Tt=0;Tt<M.length;Tt++){G.push(r.COLOR_ATTACHMENT0+Tt),C.depthBuffer&&G.push(ft);const Et=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(Et===!1&&(C.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),C.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&(J|=r.STENCIL_BUFFER_BIT)),pt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]),Et===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ft]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ft])),pt){const At=n.get(M[Tt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,At,0)}r.blitFramebuffer(0,0,B,X,0,0,B,X,J,r.NEAREST),u&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,G)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Tt=0;Tt<M.length;Tt++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Tt]);const Et=n.get(M[Tt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Tt,r.TEXTURE_2D,Et,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function yt(C){return Math.min(s.maxSamples,C.samples)}function xt(C){const M=n.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function T(C){const M=l.render.frame;f.get(C)!==M&&(f.set(C,M),C.update())}function et(C,M){const B=C.colorSpace,X=C.format,J=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==ki&&B!==Pi&&(_e.getTransfer(B)===we?(X!==ni||J!==Ni)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),M}function $(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(d.width=C.naturalWidth||C.width,d.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(d.width=C.displayWidth,d.height=C.displayHeight):(d.width=C.width,d.height=C.height),d}this.allocateTextureUnit=W,this.resetTextureUnits=R,this.setTexture2D=H,this.setTexture2DArray=P,this.setTexture3D=Z,this.setTextureCube=nt,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=kt,this.updateMultisampleRenderTarget=st,this.setupDepthRenderbuffer=St,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=xt}function mx(r,t){function e(n,s=Pi){let o;const l=_e.getTransfer(s);if(n===Ni)return r.UNSIGNED_BYTE;if(n===Dd)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Nd)return r.UNSIGNED_SHORT_5_5_5_1;if(n===$m)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===jm)return r.BYTE;if(n===Ym)return r.SHORT;if(n===Rd)return r.UNSIGNED_SHORT;if(n===Id)return r.INT;if(n===is)return r.UNSIGNED_INT;if(n===Ri)return r.FLOAT;if(n===ra)return r.HALF_FLOAT;if(n===Km)return r.ALPHA;if(n===Jm)return r.RGB;if(n===ni)return r.RGBA;if(n===Qm)return r.LUMINANCE;if(n===tg)return r.LUMINANCE_ALPHA;if(n===Kr)return r.DEPTH_COMPONENT;if(n===Gs)return r.DEPTH_STENCIL;if(n===eg)return r.RED;if(n===Od)return r.RED_INTEGER;if(n===ng)return r.RG;if(n===Ud)return r.RG_INTEGER;if(n===kd)return r.RGBA_INTEGER;if(n===tl||n===el||n===nl||n===il)if(l===we)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===tl)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===el)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===nl)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===il)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===tl)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===el)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===nl)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===il)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Iu||n===Du||n===Nu||n===Ou)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Iu)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Du)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Nu)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ou)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zd)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===Uu||n===ku)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Uu)return l===we?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===ku)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===zu||n===Bu||n===Fu||n===Hu||n===Vu||n===Gu||n===Wu||n===Zu||n===Xu||n===qu||n===ju||n===Yu||n===$u||n===Ku)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===zu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Hu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Vu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Gu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Zu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ju)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yu)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$u)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ku)return l===we?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===rl||n===Ju||n===Qu)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===rl)return l===we?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ju)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qu)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ig||n===th||n===eh||n===nh)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===rl)return o.COMPRESSED_RED_RGTC1_EXT;if(n===th)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===eh)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nh)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===js?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class gx extends Sn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ns extends Qe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _x={type:"move"};class Pl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ns,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ns,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ns,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,u=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const y of t.hand.values()){const g=e.getJointPose(y,n),v=this._getHandJoint(d,y);g!==null&&(v.matrix.fromArray(g.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=g.radius),v.visible=g!==null}const f=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],_=f.position.distanceTo(p.position),m=.02,x=.005;d.inputState.pinching&&_>m+x?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&_<=m-x&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else u!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(u.matrix.fromArray(o.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,o.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(o.linearVelocity)):u.hasLinearVelocity=!1,o.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(o.angularVelocity)):u.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(_x)))}return c!==null&&(c.visible=s!==null),u!==null&&(u.visible=o!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ns;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,yx=`
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

}`;class xx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new fn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new Ui({vertexShader:vx,fragmentShader:yx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ie(new $s(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class bx extends cr{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",u=1,d=null,f=null,p=null,_=null,m=null,x=null;const y=new xx,g=e.getContextAttributes();let v=null,S=null;const w=[],E=[],N=new vt;let U=null;const O=new Sn;O.layers.enable(1),O.viewport=new $e;const F=new Sn;F.layers.enable(2),F.viewport=new $e;const I=[O,F],R=new gx;R.layers.enable(1),R.layers.enable(2);let W=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let it=w[Q];return it===void 0&&(it=new Pl,w[Q]=it),it.getTargetRaySpace()},this.getControllerGrip=function(Q){let it=w[Q];return it===void 0&&(it=new Pl,w[Q]=it),it.getGripSpace()},this.getHand=function(Q){let it=w[Q];return it===void 0&&(it=new Pl,w[Q]=it),it.getHandSpace()};function H(Q){const it=E.indexOf(Q.inputSource);if(it===-1)return;const wt=w[it];wt!==void 0&&(wt.update(Q.inputSource,Q.frame,d||l),wt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function P(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",Z);for(let Q=0;Q<w.length;Q++){const it=E[Q];it!==null&&(E[Q]=null,w[Q].disconnect(it))}W=null,k=null,y.reset(),t.setRenderTarget(v),m=null,_=null,p=null,s=null,S=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(U),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){c=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(Q){d=Q},this.getBaseLayer=function(){return _!==null?_:m},this.getBinding=function(){return p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(v=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",P),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),U=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const it={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:o};m=new XRWebGLLayer(s,e,it),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),S=new sr(m.framebufferWidth,m.framebufferHeight,{format:ni,type:Ni,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let it=null,wt=null,St=null;g.depth&&(St=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,it=g.stencil?Gs:Kr,wt=g.stencil?js:is);const Pt={colorFormat:e.RGBA8,depthFormat:St,scaleFactor:o};p=new XRWebGLBinding(s,e),_=p.createProjectionLayer(Pt),s.updateRenderState({layers:[_]}),t.setPixelRatio(1),t.setSize(_.textureWidth,_.textureHeight,!1),S=new sr(_.textureWidth,_.textureHeight,{format:ni,type:Ni,depthTexture:new Jd(_.textureWidth,_.textureHeight,wt,void 0,void 0,void 0,void 0,void 0,void 0,it),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});const It=t.properties.get(S);It.__ignoreDepthValues=_.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(u),d=null,l=await s.requestReferenceSpace(c),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(Q){for(let it=0;it<Q.removed.length;it++){const wt=Q.removed[it],St=E.indexOf(wt);St>=0&&(E[St]=null,w[St].disconnect(wt))}for(let it=0;it<Q.added.length;it++){const wt=Q.added[it];let St=E.indexOf(wt);if(St===-1){for(let It=0;It<w.length;It++)if(It>=E.length){E.push(wt),St=It;break}else if(E[It]===null){E[It]=wt,St=It;break}if(St===-1)break}const Pt=w[St];Pt&&Pt.connect(wt)}}const nt=new K,ot=new K;function j(Q,it,wt){nt.setFromMatrixPosition(it.matrixWorld),ot.setFromMatrixPosition(wt.matrixWorld);const St=nt.distanceTo(ot),Pt=it.projectionMatrix.elements,It=wt.projectionMatrix.elements,kt=Pt[14]/(Pt[10]-1),st=Pt[14]/(Pt[10]+1),yt=(Pt[9]+1)/Pt[5],xt=(Pt[9]-1)/Pt[5],T=(Pt[8]-1)/Pt[0],et=(It[8]+1)/It[0],$=kt*T,C=kt*et,M=St/(-T+et),B=M*-T;it.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(B),Q.translateZ(M),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert();const X=kt+M,J=st+M,G=$-B,ft=C+(St-B),lt=yt*st/J*X,pt=xt*st/J*X;Q.projectionMatrix.makePerspective(G,ft,lt,pt,X,J),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}function rt(Q,it){it===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(it.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;y.texture!==null&&(Q.near=y.depthNear,Q.far=y.depthFar),R.near=F.near=O.near=Q.near,R.far=F.far=O.far=Q.far,(W!==R.near||k!==R.far)&&(s.updateRenderState({depthNear:R.near,depthFar:R.far}),W=R.near,k=R.far,O.near=W,O.far=k,F.near=W,F.far=k,O.updateProjectionMatrix(),F.updateProjectionMatrix(),Q.updateProjectionMatrix());const it=Q.parent,wt=R.cameras;rt(R,it);for(let St=0;St<wt.length;St++)rt(wt[St],it);wt.length===2?j(R,O,F):R.projectionMatrix.copy(O.projectionMatrix),at(Q,R,it)};function at(Q,it,wt){wt===null?Q.matrix.copy(it.matrixWorld):(Q.matrix.copy(wt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(it.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(it.projectionMatrix),Q.projectionMatrixInverse.copy(it.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Jl*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return R},this.getFoveation=function(){if(!(_===null&&m===null))return u},this.setFoveation=function(Q){u=Q,_!==null&&(_.fixedFoveation=Q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Q)},this.hasDepthSensing=function(){return y.texture!==null};let q=null;function tt(Q,it){if(f=it.getViewerPose(d||l),x=it,f!==null){const wt=f.views;m!==null&&(t.setRenderTargetFramebuffer(S,m.framebuffer),t.setRenderTarget(S));let St=!1;wt.length!==R.cameras.length&&(R.cameras.length=0,St=!0);for(let It=0;It<wt.length;It++){const kt=wt[It];let st=null;if(m!==null)st=m.getViewport(kt);else{const xt=p.getViewSubImage(_,kt);st=xt.viewport,It===0&&(t.setRenderTargetTextures(S,xt.colorTexture,_.ignoreDepthValues?void 0:xt.depthStencilTexture),t.setRenderTarget(S))}let yt=I[It];yt===void 0&&(yt=new Sn,yt.layers.enable(It),yt.viewport=new $e,I[It]=yt),yt.matrix.fromArray(kt.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(kt.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(st.x,st.y,st.width,st.height),It===0&&(R.matrix.copy(yt.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale)),St===!0&&R.cameras.push(yt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=p.getDepthInformation(wt[0]);It&&It.isValid&&It.texture&&y.init(t,It,s.renderState)}}for(let wt=0;wt<w.length;wt++){const St=E[wt],Pt=w[wt];St!==null&&Pt!==void 0&&Pt.update(St,it,d||l)}y.render(t,R),q&&q(Q,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),x=null}const Lt=new $d;Lt.setAnimationLoop(tt),this.setAnimationLoop=function(Q){q=Q},this.dispose=function(){}}}const $i=new qn,wx=new Te;function Mx(r,t){function e(g,v){g.matrixAutoUpdate===!0&&g.updateMatrix(),v.value.copy(g.matrix)}function n(g,v){v.color.getRGB(g.fogColor.value,qd(r)),v.isFog?(g.fogNear.value=v.near,g.fogFar.value=v.far):v.isFogExp2&&(g.fogDensity.value=v.density)}function s(g,v,S,w,E){v.isMeshBasicMaterial||v.isMeshLambertMaterial?o(g,v):v.isMeshToonMaterial?(o(g,v),p(g,v)):v.isMeshPhongMaterial?(o(g,v),f(g,v)):v.isMeshStandardMaterial?(o(g,v),_(g,v),v.isMeshPhysicalMaterial&&m(g,v,E)):v.isMeshMatcapMaterial?(o(g,v),x(g,v)):v.isMeshDepthMaterial?o(g,v):v.isMeshDistanceMaterial?(o(g,v),y(g,v)):v.isMeshNormalMaterial?o(g,v):v.isLineBasicMaterial?(l(g,v),v.isLineDashedMaterial&&c(g,v)):v.isPointsMaterial?u(g,v,S,w):v.isSpriteMaterial?d(g,v):v.isShadowMaterial?(g.color.value.copy(v.color),g.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function o(g,v){g.opacity.value=v.opacity,v.color&&g.diffuse.value.copy(v.color),v.emissive&&g.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.bumpMap&&(g.bumpMap.value=v.bumpMap,e(v.bumpMap,g.bumpMapTransform),g.bumpScale.value=v.bumpScale,v.side===xn&&(g.bumpScale.value*=-1)),v.normalMap&&(g.normalMap.value=v.normalMap,e(v.normalMap,g.normalMapTransform),g.normalScale.value.copy(v.normalScale),v.side===xn&&g.normalScale.value.negate()),v.displacementMap&&(g.displacementMap.value=v.displacementMap,e(v.displacementMap,g.displacementMapTransform),g.displacementScale.value=v.displacementScale,g.displacementBias.value=v.displacementBias),v.emissiveMap&&(g.emissiveMap.value=v.emissiveMap,e(v.emissiveMap,g.emissiveMapTransform)),v.specularMap&&(g.specularMap.value=v.specularMap,e(v.specularMap,g.specularMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest);const S=t.get(v),w=S.envMap,E=S.envMapRotation;if(w&&(g.envMap.value=w,$i.copy(E),$i.x*=-1,$i.y*=-1,$i.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),g.envMapRotation.value.setFromMatrix4(wx.makeRotationFromEuler($i)),g.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=v.reflectivity,g.ior.value=v.ior,g.refractionRatio.value=v.refractionRatio),v.lightMap){g.lightMap.value=v.lightMap;const N=r._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=v.lightMapIntensity*N,e(v.lightMap,g.lightMapTransform)}v.aoMap&&(g.aoMap.value=v.aoMap,g.aoMapIntensity.value=v.aoMapIntensity,e(v.aoMap,g.aoMapTransform))}function l(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform))}function c(g,v){g.dashSize.value=v.dashSize,g.totalSize.value=v.dashSize+v.gapSize,g.scale.value=v.scale}function u(g,v,S,w){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.size.value=v.size*S,g.scale.value=w*.5,v.map&&(g.map.value=v.map,e(v.map,g.uvTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function d(g,v){g.diffuse.value.copy(v.color),g.opacity.value=v.opacity,g.rotation.value=v.rotation,v.map&&(g.map.value=v.map,e(v.map,g.mapTransform)),v.alphaMap&&(g.alphaMap.value=v.alphaMap,e(v.alphaMap,g.alphaMapTransform)),v.alphaTest>0&&(g.alphaTest.value=v.alphaTest)}function f(g,v){g.specular.value.copy(v.specular),g.shininess.value=Math.max(v.shininess,1e-4)}function p(g,v){v.gradientMap&&(g.gradientMap.value=v.gradientMap)}function _(g,v){g.metalness.value=v.metalness,v.metalnessMap&&(g.metalnessMap.value=v.metalnessMap,e(v.metalnessMap,g.metalnessMapTransform)),g.roughness.value=v.roughness,v.roughnessMap&&(g.roughnessMap.value=v.roughnessMap,e(v.roughnessMap,g.roughnessMapTransform)),v.envMap&&(g.envMapIntensity.value=v.envMapIntensity)}function m(g,v,S){g.ior.value=v.ior,v.sheen>0&&(g.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),g.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(g.sheenColorMap.value=v.sheenColorMap,e(v.sheenColorMap,g.sheenColorMapTransform)),v.sheenRoughnessMap&&(g.sheenRoughnessMap.value=v.sheenRoughnessMap,e(v.sheenRoughnessMap,g.sheenRoughnessMapTransform))),v.clearcoat>0&&(g.clearcoat.value=v.clearcoat,g.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(g.clearcoatMap.value=v.clearcoatMap,e(v.clearcoatMap,g.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,e(v.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(g.clearcoatNormalMap.value=v.clearcoatNormalMap,e(v.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===xn&&g.clearcoatNormalScale.value.negate())),v.iridescence>0&&(g.iridescence.value=v.iridescence,g.iridescenceIOR.value=v.iridescenceIOR,g.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(g.iridescenceMap.value=v.iridescenceMap,e(v.iridescenceMap,g.iridescenceMapTransform)),v.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=v.iridescenceThicknessMap,e(v.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),v.transmission>0&&(g.transmission.value=v.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),v.transmissionMap&&(g.transmissionMap.value=v.transmissionMap,e(v.transmissionMap,g.transmissionMapTransform)),g.thickness.value=v.thickness,v.thicknessMap&&(g.thicknessMap.value=v.thicknessMap,e(v.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=v.attenuationDistance,g.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(g.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(g.anisotropyMap.value=v.anisotropyMap,e(v.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=v.specularIntensity,g.specularColor.value.copy(v.specularColor),v.specularColorMap&&(g.specularColorMap.value=v.specularColorMap,e(v.specularColorMap,g.specularColorMapTransform)),v.specularIntensityMap&&(g.specularIntensityMap.value=v.specularIntensityMap,e(v.specularIntensityMap,g.specularIntensityMapTransform))}function x(g,v){v.matcap&&(g.matcap.value=v.matcap)}function y(g,v){const S=t.get(v).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Sx(r,t,e,n){let s={},o={},l=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function u(S,w){const E=w.program;n.uniformBlockBinding(S,E)}function d(S,w){let E=s[S.id];E===void 0&&(x(S),E=f(S),s[S.id]=E,S.addEventListener("dispose",g));const N=w.program;n.updateUBOMapping(S,N);const U=t.render.frame;o[S.id]!==U&&(_(S),o[S.id]=U)}function f(S){const w=p();S.__bindingPointIndex=w;const E=r.createBuffer(),N=S.__size,U=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,E),r.bufferData(r.UNIFORM_BUFFER,N,U),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,w,E),E}function p(){for(let S=0;S<c;S++)if(l.indexOf(S)===-1)return l.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function _(S){const w=s[S.id],E=S.uniforms,N=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,w);for(let U=0,O=E.length;U<O;U++){const F=Array.isArray(E[U])?E[U]:[E[U]];for(let I=0,R=F.length;I<R;I++){const W=F[I];if(m(W,U,I,N)===!0){const k=W.__offset,H=Array.isArray(W.value)?W.value:[W.value];let P=0;for(let Z=0;Z<H.length;Z++){const nt=H[Z],ot=y(nt);typeof nt=="number"||typeof nt=="boolean"?(W.__data[0]=nt,r.bufferSubData(r.UNIFORM_BUFFER,k+P,W.__data)):nt.isMatrix3?(W.__data[0]=nt.elements[0],W.__data[1]=nt.elements[1],W.__data[2]=nt.elements[2],W.__data[3]=0,W.__data[4]=nt.elements[3],W.__data[5]=nt.elements[4],W.__data[6]=nt.elements[5],W.__data[7]=0,W.__data[8]=nt.elements[6],W.__data[9]=nt.elements[7],W.__data[10]=nt.elements[8],W.__data[11]=0):(nt.toArray(W.__data,P),P+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,k,W.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function m(S,w,E,N){const U=S.value,O=w+"_"+E;if(N[O]===void 0)return typeof U=="number"||typeof U=="boolean"?N[O]=U:N[O]=U.clone(),!0;{const F=N[O];if(typeof U=="number"||typeof U=="boolean"){if(F!==U)return N[O]=U,!0}else if(F.equals(U)===!1)return F.copy(U),!0}return!1}function x(S){const w=S.uniforms;let E=0;const N=16;for(let O=0,F=w.length;O<F;O++){const I=Array.isArray(w[O])?w[O]:[w[O]];for(let R=0,W=I.length;R<W;R++){const k=I[R],H=Array.isArray(k.value)?k.value:[k.value];for(let P=0,Z=H.length;P<Z;P++){const nt=H[P],ot=y(nt),j=E%N;j!==0&&N-j<ot.boundary&&(E+=N-j),k.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=E,E+=ot.storage}}}const U=E%N;return U>0&&(E+=N-U),S.__size=E,S.__cache={},this}function y(S){const w={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(w.boundary=4,w.storage=4):S.isVector2?(w.boundary=8,w.storage=8):S.isVector3||S.isColor?(w.boundary=16,w.storage=12):S.isVector4?(w.boundary=16,w.storage=16):S.isMatrix3?(w.boundary=48,w.storage=48):S.isMatrix4?(w.boundary=64,w.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),w}function g(S){const w=S.target;w.removeEventListener("dispose",g);const E=l.indexOf(w.__bindingPointIndex);l.splice(E,1),r.deleteBuffer(s[w.id]),delete s[w.id],delete o[w.id]}function v(){for(const S in s)r.deleteBuffer(s[S]);l=[],s={},o={}}return{bind:u,update:d,dispose:v}}class sf{constructor(t={}){const{canvas:e=gg(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:u=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:p=!1}=t;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=l;const m=new Uint32Array(4),x=new Int32Array(4);let y=null,g=null;const v=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qn,this._useLegacyLights=!1,this.toneMapping=Di,this.toneMappingExposure=1;const w=this;let E=!1,N=0,U=0,O=null,F=-1,I=null;const R=new $e,W=new $e;let k=null;const H=new Qt(0);let P=0,Z=e.width,nt=e.height,ot=1,j=null,rt=null;const at=new $e(0,0,Z,nt),q=new $e(0,0,Z,nt);let tt=!1;const Lt=new gc;let Q=!1,it=!1;const wt=new Te,St=new vt,Pt=new K,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function kt(){return O===null?ot:1}let st=n;function yt(V,ct){const gt=e.getContext(V,ct);return gt!==null?gt:null}try{const V={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:u,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${hc}`),e.addEventListener("webglcontextlost",ht,!1),e.addEventListener("webglcontextrestored",Mt,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),st===null){const ct="webgl2";if(st=yt(ct,V),st===null)throw yt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(V){throw console.error("THREE.WebGLRenderer: "+V.message),V}let xt,T,et,$,C,M,B,X,J,G,ft,lt,pt,Tt,Et,At,Ht,zt,Dt,Kt,Vt,oe,ae,te;function Ft(){xt=new D0(st),xt.init(),T=new A0(st,xt,t),oe=new mx(st,xt),et=new fx(st),$=new U0(st),C=new Qy,M=new px(st,xt,et,C,T,oe,$),B=new L0(w),X=new I0(w),J=new Vg(st),ae=new E0(st,J),G=new N0(st,J,$,ae),ft=new z0(st,G,J,$),Dt=new k0(st,T,M),At=new C0(C),lt=new Jy(w,B,X,xt,T,ae,At),pt=new Mx(w,C),Tt=new ex,Et=new ax(xt),zt=new S0(w,B,X,et,ft,_,u),Ht=new dx(w,ft,T),te=new Sx(st,$,T,et),Kt=new T0(st,xt,$),Vt=new O0(st,xt,$),$.programs=lt.programs,w.capabilities=T,w.extensions=xt,w.properties=C,w.renderLists=Tt,w.shadowMap=Ht,w.state=et,w.info=$}Ft();const D=new bx(w,st);this.xr=D,this.getContext=function(){return st},this.getContextAttributes=function(){return st.getContextAttributes()},this.forceContextLoss=function(){const V=xt.get("WEBGL_lose_context");V&&V.loseContext()},this.forceContextRestore=function(){const V=xt.get("WEBGL_lose_context");V&&V.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(V){V!==void 0&&(ot=V,this.setSize(Z,nt,!1))},this.getSize=function(V){return V.set(Z,nt)},this.setSize=function(V,ct,gt=!0){if(D.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=V,nt=ct,e.width=Math.floor(V*ot),e.height=Math.floor(ct*ot),gt===!0&&(e.style.width=V+"px",e.style.height=ct+"px"),this.setViewport(0,0,V,ct)},this.getDrawingBufferSize=function(V){return V.set(Z*ot,nt*ot).floor()},this.setDrawingBufferSize=function(V,ct,gt){Z=V,nt=ct,ot=gt,e.width=Math.floor(V*gt),e.height=Math.floor(ct*gt),this.setViewport(0,0,V,ct)},this.getCurrentViewport=function(V){return V.copy(R)},this.getViewport=function(V){return V.copy(at)},this.setViewport=function(V,ct,gt,_t){V.isVector4?at.set(V.x,V.y,V.z,V.w):at.set(V,ct,gt,_t),et.viewport(R.copy(at).multiplyScalar(ot).round())},this.getScissor=function(V){return V.copy(q)},this.setScissor=function(V,ct,gt,_t){V.isVector4?q.set(V.x,V.y,V.z,V.w):q.set(V,ct,gt,_t),et.scissor(W.copy(q).multiplyScalar(ot).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(V){et.setScissorTest(tt=V)},this.setOpaqueSort=function(V){j=V},this.setTransparentSort=function(V){rt=V},this.getClearColor=function(V){return V.copy(zt.getClearColor())},this.setClearColor=function(){zt.setClearColor.apply(zt,arguments)},this.getClearAlpha=function(){return zt.getClearAlpha()},this.setClearAlpha=function(){zt.setClearAlpha.apply(zt,arguments)},this.clear=function(V=!0,ct=!0,gt=!0){let _t=0;if(V){let dt=!1;if(O!==null){const Ut=O.texture.format;dt=Ut===kd||Ut===Ud||Ut===Od}if(dt){const Ut=O.texture.type,Zt=Ut===Ni||Ut===is||Ut===Rd||Ut===js||Ut===Dd||Ut===Nd,qt=zt.getClearColor(),jt=zt.getClearAlpha(),ee=qt.r,Jt=qt.g,ne=qt.b;Zt?(m[0]=ee,m[1]=Jt,m[2]=ne,m[3]=jt,st.clearBufferuiv(st.COLOR,0,m)):(x[0]=ee,x[1]=Jt,x[2]=ne,x[3]=jt,st.clearBufferiv(st.COLOR,0,x))}else _t|=st.COLOR_BUFFER_BIT}ct&&(_t|=st.DEPTH_BUFFER_BIT),gt&&(_t|=st.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),st.clear(_t)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ht,!1),e.removeEventListener("webglcontextrestored",Mt,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Tt.dispose(),Et.dispose(),C.dispose(),B.dispose(),X.dispose(),ft.dispose(),ae.dispose(),te.dispose(),lt.dispose(),D.dispose(),D.removeEventListener("sessionstart",Le),D.removeEventListener("sessionend",Ee),sn.stop()};function ht(V){V.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function Mt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const V=$.autoReset,ct=Ht.enabled,gt=Ht.autoUpdate,_t=Ht.needsUpdate,dt=Ht.type;Ft(),$.autoReset=V,Ht.enabled=ct,Ht.autoUpdate=gt,Ht.needsUpdate=_t,Ht.type=dt}function Rt(V){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",V.statusMessage)}function Nt(V){const ct=V.target;ct.removeEventListener("dispose",Nt),re(ct)}function re(V){ue(V),C.remove(V)}function ue(V){const ct=C.get(V).programs;ct!==void 0&&(ct.forEach(function(gt){lt.releaseProgram(gt)}),V.isShaderMaterial&&lt.releaseShaderCache(V))}this.renderBufferDirect=function(V,ct,gt,_t,dt,Ut){ct===null&&(ct=It);const Zt=dt.isMesh&&dt.matrixWorld.determinant()<0,qt=no(V,ct,gt,_t,dt);et.setMaterial(_t,Zt);let jt=gt.index,ee=1;if(_t.wireframe===!0){if(jt=G.getWireframeAttribute(gt),jt===void 0)return;ee=2}const Jt=gt.drawRange,ne=gt.attributes.position;let Ae=Jt.start*ee,on=(Jt.start+Jt.count)*ee;Ut!==null&&(Ae=Math.max(Ae,Ut.start*ee),on=Math.min(on,(Ut.start+Ut.count)*ee)),jt!==null?(Ae=Math.max(Ae,0),on=Math.min(on,jt.count)):ne!=null&&(Ae=Math.max(Ae,0),on=Math.min(on,ne.count));const Pe=on-Ae;if(Pe<0||Pe===1/0)return;ae.setup(dt,_t,qt,gt,jt);let an,ye=Kt;if(jt!==null&&(an=J.get(jt),ye=Vt,ye.setIndex(an)),dt.isMesh)_t.wireframe===!0?(et.setLineWidth(_t.wireframeLinewidth*kt()),ye.setMode(st.LINES)):ye.setMode(st.TRIANGLES);else if(dt.isLine){let ie=_t.linewidth;ie===void 0&&(ie=1),et.setLineWidth(ie*kt()),dt.isLineSegments?ye.setMode(st.LINES):dt.isLineLoop?ye.setMode(st.LINE_LOOP):ye.setMode(st.LINE_STRIP)}else dt.isPoints?ye.setMode(st.POINTS):dt.isSprite&&ye.setMode(st.TRIANGLES);if(dt.isBatchedMesh)ye.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)ye.renderInstances(Ae,Pe,dt.count);else if(gt.isInstancedBufferGeometry){const ie=gt._maxInstanceCount!==void 0?gt._maxInstanceCount:1/0,ri=Math.min(gt.instanceCount,ie);ye.renderInstances(Ae,Pe,ri)}else ye.render(Ae,Pe)};function ve(V,ct,gt){V.transparent===!0&&V.side===vn&&V.forceSinglePass===!1?(V.side=xn,V.needsUpdate=!0,zi(V,ct,gt),V.side=Oi,V.needsUpdate=!0,zi(V,ct,gt),V.side=vn):zi(V,ct,gt)}this.compile=function(V,ct,gt=null){gt===null&&(gt=V),g=Et.get(gt),g.init(),S.push(g),gt.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),V!==gt&&V.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(g.pushLight(dt),dt.castShadow&&g.pushShadow(dt))}),g.setupLights(w._useLegacyLights);const _t=new Set;return V.traverse(function(dt){const Ut=dt.material;if(Ut)if(Array.isArray(Ut))for(let Zt=0;Zt<Ut.length;Zt++){const qt=Ut[Zt];ve(qt,gt,dt),_t.add(qt)}else ve(Ut,gt,dt),_t.add(Ut)}),S.pop(),g=null,_t},this.compileAsync=function(V,ct,gt=null){const _t=this.compile(V,ct,gt);return new Promise(dt=>{function Ut(){if(_t.forEach(function(Zt){C.get(Zt).currentProgram.isReady()&&_t.delete(Zt)}),_t.size===0){dt(V);return}setTimeout(Ut,10)}xt.get("KHR_parallel_shader_compile")!==null?Ut():setTimeout(Ut,10)})};let Ue=null;function ge(V){Ue&&Ue(V)}function Le(){sn.stop()}function Ee(){sn.start()}const sn=new $d;sn.setAnimationLoop(ge),typeof self<"u"&&sn.setContext(self),this.setAnimationLoop=function(V){Ue=V,D.setAnimationLoop(V),V===null?sn.stop():sn.start()},D.addEventListener("sessionstart",Le),D.addEventListener("sessionend",Ee),this.render=function(V,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),D.enabled===!0&&D.isPresenting===!0&&(D.cameraAutoUpdate===!0&&D.updateCamera(ct),ct=D.getCamera()),V.isScene===!0&&V.onBeforeRender(w,V,ct,O),g=Et.get(V,S.length),g.init(),S.push(g),wt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),Lt.setFromProjectionMatrix(wt),it=this.localClippingEnabled,Q=At.init(this.clippingPlanes,it),y=Tt.get(V,v.length),y.init(),v.push(y),pn(V,ct,0,w.sortObjects),y.finish(),w.sortObjects===!0&&y.sort(j,rt),this.info.render.frame++,Q===!0&&At.beginShadows();const gt=g.state.shadowsArray;if(Ht.render(gt,V,ct),Q===!0&&At.endShadows(),this.info.autoReset===!0&&this.info.reset(),(D.enabled===!1||D.isPresenting===!1||D.hasDepthSensing()===!1)&&zt.render(y,V),g.setupLights(w._useLegacyLights),ct.isArrayCamera){const _t=ct.cameras;for(let dt=0,Ut=_t.length;dt<Ut;dt++){const Zt=_t[dt];jn(y,V,Zt,Zt.viewport)}}else jn(y,V,ct);O!==null&&(M.updateMultisampleRenderTarget(O),M.updateRenderTargetMipmap(O)),V.isScene===!0&&V.onAfterRender(w,V,ct),ae.resetDefaultState(),F=-1,I=null,S.pop(),S.length>0?g=S[S.length-1]:g=null,v.pop(),v.length>0?y=v[v.length-1]:y=null};function pn(V,ct,gt,_t){if(V.visible===!1)return;if(V.layers.test(ct.layers)){if(V.isGroup)gt=V.renderOrder;else if(V.isLOD)V.autoUpdate===!0&&V.update(ct);else if(V.isLight)g.pushLight(V),V.castShadow&&g.pushShadow(V);else if(V.isSprite){if(!V.frustumCulled||Lt.intersectsSprite(V)){_t&&Pt.setFromMatrixPosition(V.matrixWorld).applyMatrix4(wt);const Zt=ft.update(V),qt=V.material;qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}else if((V.isMesh||V.isLine||V.isPoints)&&(!V.frustumCulled||Lt.intersectsObject(V))){const Zt=ft.update(V),qt=V.material;if(_t&&(V.boundingSphere!==void 0?(V.boundingSphere===null&&V.computeBoundingSphere(),Pt.copy(V.boundingSphere.center)):(Zt.boundingSphere===null&&Zt.computeBoundingSphere(),Pt.copy(Zt.boundingSphere.center)),Pt.applyMatrix4(V.matrixWorld).applyMatrix4(wt)),Array.isArray(qt)){const jt=Zt.groups;for(let ee=0,Jt=jt.length;ee<Jt;ee++){const ne=jt[ee],Ae=qt[ne.materialIndex];Ae&&Ae.visible&&y.push(V,Zt,Ae,gt,Pt.z,ne)}}else qt.visible&&y.push(V,Zt,qt,gt,Pt.z,null)}}const Ut=V.children;for(let Zt=0,qt=Ut.length;Zt<qt;Zt++)pn(Ut[Zt],ct,gt,_t)}function jn(V,ct,gt,_t){const dt=V.opaque,Ut=V.transmissive,Zt=V.transparent;g.setupLightsView(gt),Q===!0&&At.setGlobalState(w.clippingPlanes,gt),Ut.length>0&&vi(dt,Ut,ct,gt),_t&&et.viewport(R.copy(_t)),dt.length>0&&Ge(dt,ct,gt),Ut.length>0&&Ge(Ut,ct,gt),Zt.length>0&&Ge(Zt,ct,gt),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function vi(V,ct,gt,_t){if((gt.isScene===!0?gt.overrideMaterial:null)!==null)return;if(g.state.transmissionRenderTarget===null){g.state.transmissionRenderTarget=new sr(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float")?ra:Ni,minFilter:ir,samples:4,stencilBuffer:o});const ee=C.get(g.state.transmissionRenderTarget);ee.__isTransmissionRenderTarget=!0}const Ut=g.state.transmissionRenderTarget;w.getDrawingBufferSize(St),Ut.setSize(St.x,St.y);const Zt=w.getRenderTarget();w.setRenderTarget(Ut),w.getClearColor(H),P=w.getClearAlpha(),P<1&&w.setClearColor(16777215,.5),w.clear();const qt=w.toneMapping;w.toneMapping=Di,Ge(V,gt,_t),M.updateMultisampleRenderTarget(Ut),M.updateRenderTargetMipmap(Ut);let jt=!1;for(let ee=0,Jt=ct.length;ee<Jt;ee++){const ne=ct[ee],Ae=ne.object,on=ne.geometry,Pe=ne.material,an=ne.group;if(Pe.side===vn&&Ae.layers.test(_t.layers)){const ye=Pe.side;Pe.side=xn,Pe.needsUpdate=!0,Wt(Ae,gt,_t,on,Pe,an),Pe.side=ye,Pe.needsUpdate=!0,jt=!0}}jt===!0&&(M.updateMultisampleRenderTarget(Ut),M.updateRenderTargetMipmap(Ut)),w.setRenderTarget(Zt),w.setClearColor(H,P),w.toneMapping=qt}function Ge(V,ct,gt){const _t=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,Ut=V.length;dt<Ut;dt++){const Zt=V[dt],qt=Zt.object,jt=Zt.geometry,ee=_t===null?Zt.material:_t,Jt=Zt.group;qt.layers.test(gt.layers)&&Wt(qt,ct,gt,jt,ee,Jt)}}function Wt(V,ct,gt,_t,dt,Ut){V.onBeforeRender(w,ct,gt,_t,dt,Ut),V.modelViewMatrix.multiplyMatrices(gt.matrixWorldInverse,V.matrixWorld),V.normalMatrix.getNormalMatrix(V.modelViewMatrix),dt.onBeforeRender(w,ct,gt,_t,V,Ut),dt.transparent===!0&&dt.side===vn&&dt.forceSinglePass===!1?(dt.side=xn,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,Ut),dt.side=Oi,dt.needsUpdate=!0,w.renderBufferDirect(gt,ct,_t,dt,V,Ut),dt.side=vn):w.renderBufferDirect(gt,ct,_t,dt,V,Ut),V.onAfterRender(w,ct,gt,_t,dt,Ut)}function zi(V,ct,gt){ct.isScene!==!0&&(ct=It);const _t=C.get(V),dt=g.state.lights,Ut=g.state.shadowsArray,Zt=dt.state.version,qt=lt.getParameters(V,dt.state,Ut,ct,gt),jt=lt.getProgramCacheKey(qt);let ee=_t.programs;_t.environment=V.isMeshStandardMaterial?ct.environment:null,_t.fog=ct.fog,_t.envMap=(V.isMeshStandardMaterial?X:B).get(V.envMap||_t.environment),_t.envMapRotation=_t.environment!==null&&V.envMap===null?ct.environmentRotation:V.envMapRotation,ee===void 0&&(V.addEventListener("dispose",Nt),ee=new Map,_t.programs=ee);let Jt=ee.get(jt);if(Jt!==void 0){if(_t.currentProgram===Jt&&_t.lightsStateVersion===Zt)return us(V,qt),Jt}else qt.uniforms=lt.getUniforms(V),V.onBuild(gt,qt,w),V.onBeforeCompile(qt,w),Jt=lt.acquireProgram(qt,jt),ee.set(jt,Jt),_t.uniforms=qt.uniforms;const ne=_t.uniforms;return(!V.isShaderMaterial&&!V.isRawShaderMaterial||V.clipping===!0)&&(ne.clippingPlanes=At.uniform),us(V,qt),_t.needsLights=io(V),_t.lightsStateVersion=Zt,_t.needsLights&&(ne.ambientLightColor.value=dt.state.ambient,ne.lightProbe.value=dt.state.probe,ne.directionalLights.value=dt.state.directional,ne.directionalLightShadows.value=dt.state.directionalShadow,ne.spotLights.value=dt.state.spot,ne.spotLightShadows.value=dt.state.spotShadow,ne.rectAreaLights.value=dt.state.rectArea,ne.ltc_1.value=dt.state.rectAreaLTC1,ne.ltc_2.value=dt.state.rectAreaLTC2,ne.pointLights.value=dt.state.point,ne.pointLightShadows.value=dt.state.pointShadow,ne.hemisphereLights.value=dt.state.hemi,ne.directionalShadowMap.value=dt.state.directionalShadowMap,ne.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,ne.spotShadowMap.value=dt.state.spotShadowMap,ne.spotLightMatrix.value=dt.state.spotLightMatrix,ne.spotLightMap.value=dt.state.spotLightMap,ne.pointShadowMap.value=dt.state.pointShadowMap,ne.pointShadowMatrix.value=dt.state.pointShadowMatrix),_t.currentProgram=Jt,_t.uniformsList=null,Jt}function cs(V){if(V.uniformsList===null){const ct=V.currentProgram.getUniforms();V.uniformsList=ta.seqWithValue(ct.seq,V.uniforms)}return V.uniformsList}function us(V,ct){const gt=C.get(V);gt.outputColorSpace=ct.outputColorSpace,gt.batching=ct.batching,gt.instancing=ct.instancing,gt.instancingColor=ct.instancingColor,gt.instancingMorph=ct.instancingMorph,gt.skinning=ct.skinning,gt.morphTargets=ct.morphTargets,gt.morphNormals=ct.morphNormals,gt.morphColors=ct.morphColors,gt.morphTargetsCount=ct.morphTargetsCount,gt.numClippingPlanes=ct.numClippingPlanes,gt.numIntersection=ct.numClipIntersection,gt.vertexAlphas=ct.vertexAlphas,gt.vertexTangents=ct.vertexTangents,gt.toneMapping=ct.toneMapping}function no(V,ct,gt,_t,dt){ct.isScene!==!0&&(ct=It),M.resetTextureUnits();const Ut=ct.fog,Zt=_t.isMeshStandardMaterial?ct.environment:null,qt=O===null?w.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ki,jt=(_t.isMeshStandardMaterial?X:B).get(_t.envMap||Zt),ee=_t.vertexColors===!0&&!!gt.attributes.color&&gt.attributes.color.itemSize===4,Jt=!!gt.attributes.tangent&&(!!_t.normalMap||_t.anisotropy>0),ne=!!gt.morphAttributes.position,Ae=!!gt.morphAttributes.normal,on=!!gt.morphAttributes.color;let Pe=Di;_t.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Pe=w.toneMapping);const an=gt.morphAttributes.position||gt.morphAttributes.normal||gt.morphAttributes.color,ye=an!==void 0?an.length:0,ie=C.get(_t),ri=g.state.lights;if(Q===!0&&(it===!0||V!==I)){const tn=V===I&&_t.id===F;At.setState(_t,V,tn)}let Xt=!1;_t.version===ie.__version?(ie.needsLights&&ie.lightsStateVersion!==ri.state.version||ie.outputColorSpace!==qt||dt.isBatchedMesh&&ie.batching===!1||!dt.isBatchedMesh&&ie.batching===!0||dt.isInstancedMesh&&ie.instancing===!1||!dt.isInstancedMesh&&ie.instancing===!0||dt.isSkinnedMesh&&ie.skinning===!1||!dt.isSkinnedMesh&&ie.skinning===!0||dt.isInstancedMesh&&ie.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&ie.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&ie.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&ie.instancingMorph===!1&&dt.morphTexture!==null||ie.envMap!==jt||_t.fog===!0&&ie.fog!==Ut||ie.numClippingPlanes!==void 0&&(ie.numClippingPlanes!==At.numPlanes||ie.numIntersection!==At.numIntersection)||ie.vertexAlphas!==ee||ie.vertexTangents!==Jt||ie.morphTargets!==ne||ie.morphNormals!==Ae||ie.morphColors!==on||ie.toneMapping!==Pe||ie.morphTargetsCount!==ye)&&(Xt=!0):(Xt=!0,ie.__version=_t.version);let fe=ie.currentProgram;Xt===!0&&(fe=zi(_t,ct,dt));let Bi=!1,Ln=!1,Yn=!1;const ke=fe.getUniforms(),Yt=ie.uniforms;if(et.useProgram(fe.program)&&(Bi=!0,Ln=!0,Yn=!0),_t.id!==F&&(F=_t.id,Ln=!0),Bi||I!==V){ke.setValue(st,"projectionMatrix",V.projectionMatrix),ke.setValue(st,"viewMatrix",V.matrixWorldInverse);const tn=ke.map.cameraPosition;tn!==void 0&&tn.setValue(st,Pt.setFromMatrixPosition(V.matrixWorld)),T.logarithmicDepthBuffer&&ke.setValue(st,"logDepthBufFC",2/(Math.log(V.far+1)/Math.LN2)),(_t.isMeshPhongMaterial||_t.isMeshToonMaterial||_t.isMeshLambertMaterial||_t.isMeshBasicMaterial||_t.isMeshStandardMaterial||_t.isShaderMaterial)&&ke.setValue(st,"isOrthographic",V.isOrthographicCamera===!0),I!==V&&(I=V,Ln=!0,Yn=!0)}if(dt.isSkinnedMesh){ke.setOptional(st,dt,"bindMatrix"),ke.setOptional(st,dt,"bindMatrixInverse");const tn=dt.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),ke.setValue(st,"boneTexture",tn.boneTexture,M))}dt.isBatchedMesh&&(ke.setOptional(st,dt,"batchingTexture"),ke.setValue(st,"batchingTexture",dt._matricesTexture,M));const be=gt.morphAttributes;if((be.position!==void 0||be.normal!==void 0||be.color!==void 0)&&Dt.update(dt,gt,fe),(Ln||ie.receiveShadow!==dt.receiveShadow)&&(ie.receiveShadow=dt.receiveShadow,ke.setValue(st,"receiveShadow",dt.receiveShadow)),_t.isMeshGouraudMaterial&&_t.envMap!==null&&(Yt.envMap.value=jt,Yt.flipEnvMap.value=jt.isCubeTexture&&jt.isRenderTargetTexture===!1?-1:1),_t.isMeshStandardMaterial&&_t.envMap===null&&ct.environment!==null&&(Yt.envMapIntensity.value=ct.environmentIntensity),Ln&&(ke.setValue(st,"toneMappingExposure",w.toneMappingExposure),ie.needsLights&&hs(Yt,Yn),Ut&&_t.fog===!0&&pt.refreshFogUniforms(Yt,Ut),pt.refreshMaterialUniforms(Yt,_t,ot,nt,g.state.transmissionRenderTarget),ta.upload(st,cs(ie),Yt,M)),_t.isShaderMaterial&&_t.uniformsNeedUpdate===!0&&(ta.upload(st,cs(ie),Yt,M),_t.uniformsNeedUpdate=!1),_t.isSpriteMaterial&&ke.setValue(st,"center",dt.center),ke.setValue(st,"modelViewMatrix",dt.modelViewMatrix),ke.setValue(st,"normalMatrix",dt.normalMatrix),ke.setValue(st,"modelMatrix",dt.matrixWorld),_t.isShaderMaterial||_t.isRawShaderMaterial){const tn=_t.uniformsGroups;for(let yi=0,mn=tn.length;yi<mn;yi++){const ro=tn[yi];te.update(ro,fe),te.bind(ro,fe)}}return fe}function hs(V,ct){V.ambientLightColor.needsUpdate=ct,V.lightProbe.needsUpdate=ct,V.directionalLights.needsUpdate=ct,V.directionalLightShadows.needsUpdate=ct,V.pointLights.needsUpdate=ct,V.pointLightShadows.needsUpdate=ct,V.spotLights.needsUpdate=ct,V.spotLightShadows.needsUpdate=ct,V.rectAreaLights.needsUpdate=ct,V.hemisphereLights.needsUpdate=ct}function io(V){return V.isMeshLambertMaterial||V.isMeshToonMaterial||V.isMeshPhongMaterial||V.isMeshStandardMaterial||V.isShadowMaterial||V.isShaderMaterial&&V.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(V,ct,gt){C.get(V.texture).__webglTexture=ct,C.get(V.depthTexture).__webglTexture=gt;const _t=C.get(V);_t.__hasExternalTextures=!0,_t.__autoAllocateDepthBuffer=gt===void 0,_t.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),_t.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(V,ct){const gt=C.get(V);gt.__webglFramebuffer=ct,gt.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(V,ct=0,gt=0){O=V,N=ct,U=gt;let _t=!0,dt=null,Ut=!1,Zt=!1;if(V){const jt=C.get(V);jt.__useDefaultFramebuffer!==void 0?(et.bindFramebuffer(st.FRAMEBUFFER,null),_t=!1):jt.__webglFramebuffer===void 0?M.setupRenderTarget(V):jt.__hasExternalTextures&&M.rebindTextures(V,C.get(V.texture).__webglTexture,C.get(V.depthTexture).__webglTexture);const ee=V.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Zt=!0);const Jt=C.get(V).__webglFramebuffer;V.isWebGLCubeRenderTarget?(Array.isArray(Jt[ct])?dt=Jt[ct][gt]:dt=Jt[ct],Ut=!0):V.samples>0&&M.useMultisampledRTT(V)===!1?dt=C.get(V).__webglMultisampledFramebuffer:Array.isArray(Jt)?dt=Jt[gt]:dt=Jt,R.copy(V.viewport),W.copy(V.scissor),k=V.scissorTest}else R.copy(at).multiplyScalar(ot).floor(),W.copy(q).multiplyScalar(ot).floor(),k=tt;if(et.bindFramebuffer(st.FRAMEBUFFER,dt)&&_t&&et.drawBuffers(V,dt),et.viewport(R),et.scissor(W),et.setScissorTest(k),Ut){const jt=C.get(V.texture);st.framebufferTexture2D(st.FRAMEBUFFER,st.COLOR_ATTACHMENT0,st.TEXTURE_CUBE_MAP_POSITIVE_X+ct,jt.__webglTexture,gt)}else if(Zt){const jt=C.get(V.texture),ee=ct||0;st.framebufferTextureLayer(st.FRAMEBUFFER,st.COLOR_ATTACHMENT0,jt.__webglTexture,gt||0,ee)}F=-1},this.readRenderTargetPixels=function(V,ct,gt,_t,dt,Ut,Zt){if(!(V&&V.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=C.get(V).__webglFramebuffer;if(V.isWebGLCubeRenderTarget&&Zt!==void 0&&(qt=qt[Zt]),qt){et.bindFramebuffer(st.FRAMEBUFFER,qt);try{const jt=V.texture,ee=jt.format,Jt=jt.type;if(ee!==ni&&oe.convert(ee)!==st.getParameter(st.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const ne=Jt===ra&&(xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float"));if(Jt!==Ni&&oe.convert(Jt)!==st.getParameter(st.IMPLEMENTATION_COLOR_READ_TYPE)&&Jt!==Ri&&!ne){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=V.width-_t&&gt>=0&&gt<=V.height-dt&&st.readPixels(ct,gt,_t,dt,oe.convert(ee),oe.convert(Jt),Ut)}finally{const jt=O!==null?C.get(O).__webglFramebuffer:null;et.bindFramebuffer(st.FRAMEBUFFER,jt)}}},this.copyFramebufferToTexture=function(V,ct,gt=0){const _t=Math.pow(2,-gt),dt=Math.floor(ct.image.width*_t),Ut=Math.floor(ct.image.height*_t);M.setTexture2D(ct,0),st.copyTexSubImage2D(st.TEXTURE_2D,gt,0,0,V.x,V.y,dt,Ut),et.unbindTexture()},this.copyTextureToTexture=function(V,ct,gt,_t=0){const dt=ct.image.width,Ut=ct.image.height,Zt=oe.convert(gt.format),qt=oe.convert(gt.type);M.setTexture2D(gt,0),st.pixelStorei(st.UNPACK_FLIP_Y_WEBGL,gt.flipY),st.pixelStorei(st.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),st.pixelStorei(st.UNPACK_ALIGNMENT,gt.unpackAlignment),ct.isDataTexture?st.texSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,dt,Ut,Zt,qt,ct.image.data):ct.isCompressedTexture?st.compressedTexSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Zt,ct.mipmaps[0].data):st.texSubImage2D(st.TEXTURE_2D,_t,V.x,V.y,Zt,qt,ct.image),_t===0&&gt.generateMipmaps&&st.generateMipmap(st.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(V,ct,gt,_t,dt=0){const Ut=Math.round(V.max.x-V.min.x),Zt=Math.round(V.max.y-V.min.y),qt=V.max.z-V.min.z+1,jt=oe.convert(_t.format),ee=oe.convert(_t.type);let Jt;if(_t.isData3DTexture)M.setTexture3D(_t,0),Jt=st.TEXTURE_3D;else if(_t.isDataArrayTexture||_t.isCompressedArrayTexture)M.setTexture2DArray(_t,0),Jt=st.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}st.pixelStorei(st.UNPACK_FLIP_Y_WEBGL,_t.flipY),st.pixelStorei(st.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),st.pixelStorei(st.UNPACK_ALIGNMENT,_t.unpackAlignment);const ne=st.getParameter(st.UNPACK_ROW_LENGTH),Ae=st.getParameter(st.UNPACK_IMAGE_HEIGHT),on=st.getParameter(st.UNPACK_SKIP_PIXELS),Pe=st.getParameter(st.UNPACK_SKIP_ROWS),an=st.getParameter(st.UNPACK_SKIP_IMAGES),ye=gt.isCompressedTexture?gt.mipmaps[dt]:gt.image;st.pixelStorei(st.UNPACK_ROW_LENGTH,ye.width),st.pixelStorei(st.UNPACK_IMAGE_HEIGHT,ye.height),st.pixelStorei(st.UNPACK_SKIP_PIXELS,V.min.x),st.pixelStorei(st.UNPACK_SKIP_ROWS,V.min.y),st.pixelStorei(st.UNPACK_SKIP_IMAGES,V.min.z),gt.isDataTexture||gt.isData3DTexture?st.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ee,ye.data):_t.isCompressedArrayTexture?st.compressedTexSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ye.data):st.texSubImage3D(Jt,dt,ct.x,ct.y,ct.z,Ut,Zt,qt,jt,ee,ye),st.pixelStorei(st.UNPACK_ROW_LENGTH,ne),st.pixelStorei(st.UNPACK_IMAGE_HEIGHT,Ae),st.pixelStorei(st.UNPACK_SKIP_PIXELS,on),st.pixelStorei(st.UNPACK_SKIP_ROWS,Pe),st.pixelStorei(st.UNPACK_SKIP_IMAGES,an),dt===0&&_t.generateMipmaps&&st.generateMipmap(Jt),et.unbindTexture()},this.initTexture=function(V){V.isCubeTexture?M.setTextureCube(V,0):V.isData3DTexture?M.setTexture3D(V,0):V.isDataArrayTexture||V.isCompressedArrayTexture?M.setTexture2DArray(V,0):M.setTexture2D(V,0),et.unbindTexture()},this.resetState=function(){N=0,U=0,O=null,et.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return _i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===pc?"display-p3":"srgb",e.unpackColorSpace=_e.workingColorSpace===xa?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class of extends Qe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qn,this.environmentIntensity=1,this.environmentRotation=new qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class vc extends ur{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const qh=new K,jh=new K,Yh=new Te,Rl=new wa,Go=new ba;class af extends Qe{constructor(t=new Oe,e=new vc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,o=e.count;s<o;s++)qh.fromBufferAttribute(e,s-1),jh.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=qh.distanceTo(jh);t.setAttribute("lineDistance",new me(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,o=t.params.Line.threshold,l=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Go.copy(n.boundingSphere),Go.applyMatrix4(s),Go.radius+=o,t.ray.intersectsSphere(Go)===!1)return;Yh.copy(s).invert(),Rl.copy(t.ray).applyMatrix4(Yh);const c=o/((this.scale.x+this.scale.y+this.scale.z)/3),u=c*c,d=new K,f=new K,p=new K,_=new K,m=this.isLineSegments?2:1,x=n.index,g=n.attributes.position;if(x!==null){const v=Math.max(0,l.start),S=Math.min(x.count,l.start+l.count);for(let w=v,E=S-1;w<E;w+=m){const N=x.getX(w),U=x.getX(w+1);if(d.fromBufferAttribute(g,N),f.fromBufferAttribute(g,U),Rl.distanceSqToSegment(d,f,_,p)>u)continue;_.applyMatrix4(this.matrixWorld);const F=t.ray.origin.distanceTo(_);F<t.near||F>t.far||e.push({distance:F,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}else{const v=Math.max(0,l.start),S=Math.min(g.count,l.start+l.count);for(let w=v,E=S-1;w<E;w+=m){if(d.fromBufferAttribute(g,w),f.fromBufferAttribute(g,w+1),Rl.distanceSqToSegment(d,f,_,p)>u)continue;_.applyMatrix4(this.matrixWorld);const U=t.ray.origin.distanceTo(_);U<t.near||U>t.far||e.push({distance:U,point:p.clone().applyMatrix4(this.matrixWorld),index:w,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}}const $h=new K,Kh=new K;class Ex extends af{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,o=e.count;s<o;s+=2)$h.fromBufferAttribute(e,s),Kh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+$h.distanceTo(Kh);t.setAttribute("lineDistance",new me(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lf extends fn{constructor(t,e,n,s,o,l,c,u,d){super(t,e,n,s,o,l,c,u,d),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ii{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,u=o-1,d;for(;c<=u;)if(s=Math.floor(c+(u-c)/2),d=n[s]-l,d<0)c=s+1;else if(d>0)u=s-1;else{u=s;break}if(s=u,n[s]===l)return s/(o-1);const f=n[s],_=n[s+1]-f,m=(l-f)/_;return(s+m)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),u=e||(l.isVector2?new vt:new K);return u.copy(c).sub(l).normalize(),u}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new K,s=[],o=[],l=[],c=new K,u=new Te;for(let m=0;m<=t;m++){const x=m/t;s[m]=this.getTangentAt(x,new K)}o[0]=new K,l[0]=new K;let d=Number.MAX_VALUE;const f=Math.abs(s[0].x),p=Math.abs(s[0].y),_=Math.abs(s[0].z);f<=d&&(d=f,n.set(1,0,0)),p<=d&&(d=p,n.set(0,1,0)),_<=d&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let m=1;m<=t;m++){if(o[m]=o[m-1].clone(),l[m]=l[m-1].clone(),c.crossVectors(s[m-1],s[m]),c.length()>Number.EPSILON){c.normalize();const x=Math.acos(Ye(s[m-1].dot(s[m]),-1,1));o[m].applyMatrix4(u.makeRotationAxis(c,x))}l[m].crossVectors(s[m],o[m])}if(e===!0){let m=Math.acos(Ye(o[0].dot(o[t]),-1,1));m/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(m=-m);for(let x=1;x<=t;x++)o[x].applyMatrix4(u.makeRotationAxis(s[x],m*x)),l[x].crossVectors(s[x],o[x])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class yc extends ii{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,u=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=u}getPoint(t,e=new vt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let u=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),_=u-this.aX,m=d-this.aY;u=_*f-m*p+this.aX,d=_*p+m*f+this.aY}return n.set(u,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Tx extends yc{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function xc(){let r=0,t=0,e=0,n=0;function s(o,l,c,u){r=o,t=c,e=-3*o+3*l-2*c-u,n=2*o-2*l+c+u}return{initCatmullRom:function(o,l,c,u,d){s(l,c,d*(c-o),d*(u-l))},initNonuniformCatmullRom:function(o,l,c,u,d,f,p){let _=(l-o)/d-(c-o)/(d+f)+(c-l)/f,m=(c-l)/f-(u-l)/(f+p)+(u-c)/p;_*=f,m*=f,s(l,c,_,m)},calc:function(o){const l=o*o,c=l*o;return r+t*o+e*l+n*c}}}const Wo=new K,Il=new xc,Dl=new xc,Nl=new xc;class cf extends ii{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new K){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),u=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:u===0&&c===o-1&&(c=o-2,u=1);let d,f;this.closed||c>0?d=s[(c-1)%o]:(Wo.subVectors(s[0],s[1]).add(s[0]),d=Wo);const p=s[c%o],_=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:(Wo.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=Wo),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let x=Math.pow(d.distanceToSquared(p),m),y=Math.pow(p.distanceToSquared(_),m),g=Math.pow(_.distanceToSquared(f),m);y<1e-4&&(y=1),x<1e-4&&(x=y),g<1e-4&&(g=y),Il.initNonuniformCatmullRom(d.x,p.x,_.x,f.x,x,y,g),Dl.initNonuniformCatmullRom(d.y,p.y,_.y,f.y,x,y,g),Nl.initNonuniformCatmullRom(d.z,p.z,_.z,f.z,x,y,g)}else this.curveType==="catmullrom"&&(Il.initCatmullRom(d.x,p.x,_.x,f.x,this.tension),Dl.initCatmullRom(d.y,p.y,_.y,f.y,this.tension),Nl.initCatmullRom(d.z,p.z,_.z,f.z,this.tension));return n.set(Il.calc(u),Dl.calc(u),Nl.calc(u)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new K().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Jh(r,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=r*r,u=r*c;return(2*e-2*n+o+l)*u+(-3*e+3*n-2*o-l)*c+o*r+e}function Ax(r,t){const e=1-r;return e*e*t}function Cx(r,t){return 2*(1-r)*r*t}function Lx(r,t){return r*r*t}function ks(r,t,e,n){return Ax(r,t)+Cx(r,e)+Lx(r,n)}function Px(r,t){const e=1-r;return e*e*e*t}function Rx(r,t){const e=1-r;return 3*e*e*r*t}function Ix(r,t){return 3*(1-r)*r*r*t}function Dx(r,t){return r*r*r*t}function zs(r,t,e,n,s){return Px(r,t)+Rx(r,e)+Ix(r,n)+Dx(r,s)}class uf extends ii{constructor(t=new vt,e=new vt,n=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(zs(t,s.x,o.x,l.x,c.x),zs(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Nx extends ii{constructor(t=new K,e=new K,n=new K,s=new K){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new K){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(zs(t,s.x,o.x,l.x,c.x),zs(t,s.y,o.y,l.y,c.y),zs(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class hf extends ii{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ox extends ii{constructor(t=new K,e=new K){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new K){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new K){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class df extends ii{constructor(t=new vt,e=new vt,n=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new vt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(ks(t,s.x,o.x,l.x),ks(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ff extends ii{constructor(t=new K,e=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new K){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(ks(t,s.x,o.x,l.x),ks(t,s.y,o.y,l.y),ks(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class pf extends ii{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,u=s[l===0?l:l-1],d=s[l],f=s[l>s.length-2?s.length-1:l+1],p=s[l>s.length-3?s.length-1:l+2];return n.set(Jh(c,u.x,d.x,f.x,p.x),Jh(c,u.y,d.y,f.y,p.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var ua=Object.freeze({__proto__:null,ArcCurve:Tx,CatmullRomCurve3:cf,CubicBezierCurve:uf,CubicBezierCurve3:Nx,EllipseCurve:yc,LineCurve:hf,LineCurve3:Ox,QuadraticBezierCurve:df,QuadraticBezierCurve3:ff,SplineCurve:pf});class Ux extends ii{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ua[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],u=c.getLength(),d=u===0?0:1-l/u;return c.getPointAt(d,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,u=l.getPoints(c);for(let d=0;d<u.length;d++){const f=u[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ua[s.type]().fromJSON(s))}return this}}class Qh extends Ux{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new hf(this.currentPoint.clone(),new vt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new df(this.currentPoint.clone(),new vt(t,e),new vt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new uf(this.currentPoint.clone(),new vt(t,e),new vt(n,s),new vt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new pf(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(t+c,e+u,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,u){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,s,o,l,c,u),this}absellipse(t,e,n,s,o,l,c,u){const d=new yc(t,e,n,s,o,l,c,u);if(this.curves.length>0){const p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class tr extends Oe{constructor(t=[new vt(0,-.5),new vt(.5,0),new vt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ye(s,0,Math.PI*2);const o=[],l=[],c=[],u=[],d=[],f=1/e,p=new K,_=new vt,m=new K,x=new K,y=new K;let g=0,v=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,y.copy(m),m.normalize(),u.push(m.x,m.y,m.z);break;case t.length-1:u.push(y.x,y.y,y.z);break;default:g=t[S+1].x-t[S].x,v=t[S+1].y-t[S].y,m.x=v*1,m.y=-g,m.z=v*0,x.copy(m),m.x+=y.x,m.y+=y.y,m.z+=y.z,m.normalize(),u.push(m.x,m.y,m.z),y.copy(x)}for(let S=0;S<=e;S++){const w=n+S*f*s,E=Math.sin(w),N=Math.cos(w);for(let U=0;U<=t.length-1;U++){p.x=t[U].x*E,p.y=t[U].y,p.z=t[U].x*N,l.push(p.x,p.y,p.z),_.x=S/e,_.y=U/(t.length-1),c.push(_.x,_.y);const O=u[3*U+0]*E,F=u[3*U+1],I=u[3*U+0]*N;d.push(O,F,I)}}for(let S=0;S<e;S++)for(let w=0;w<t.length-1;w++){const E=w+S*t.length,N=E,U=E+t.length,O=E+t.length+1,F=E+1;o.push(N,U,F),o.push(O,F,U)}this.setIndex(o),this.setAttribute("position",new me(l,3)),this.setAttribute("uv",new me(c,2)),this.setAttribute("normal",new me(d,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tr(t.points,t.segments,t.phiStart,t.phiLength)}}class ss extends Oe{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:u};const d=this;s=Math.floor(s),o=Math.floor(o);const f=[],p=[],_=[],m=[];let x=0;const y=[],g=n/2;let v=0;S(),l===!1&&(t>0&&w(!0),e>0&&w(!1)),this.setIndex(f),this.setAttribute("position",new me(p,3)),this.setAttribute("normal",new me(_,3)),this.setAttribute("uv",new me(m,2));function S(){const E=new K,N=new K;let U=0;const O=(e-t)/n;for(let F=0;F<=o;F++){const I=[],R=F/o,W=R*(e-t)+t;for(let k=0;k<=s;k++){const H=k/s,P=H*u+c,Z=Math.sin(P),nt=Math.cos(P);N.x=W*Z,N.y=-R*n+g,N.z=W*nt,p.push(N.x,N.y,N.z),E.set(Z,O,nt).normalize(),_.push(E.x,E.y,E.z),m.push(H,1-R),I.push(x++)}y.push(I)}for(let F=0;F<s;F++)for(let I=0;I<o;I++){const R=y[I][F],W=y[I+1][F],k=y[I+1][F+1],H=y[I][F+1];f.push(R,W,H),f.push(W,k,H),U+=6}d.addGroup(v,U,0),v+=U}function w(E){const N=x,U=new vt,O=new K;let F=0;const I=E===!0?t:e,R=E===!0?1:-1;for(let k=1;k<=s;k++)p.push(0,g*R,0),_.push(0,R,0),m.push(.5,.5),x++;const W=x;for(let k=0;k<=s;k++){const P=k/s*u+c,Z=Math.cos(P),nt=Math.sin(P);O.x=I*nt,O.y=g*R,O.z=I*Z,p.push(O.x,O.y,O.z),_.push(0,R,0),U.x=Z*.5+.5,U.y=nt*.5*R+.5,m.push(U.x,U.y),x++}for(let k=0;k<s;k++){const H=N+k,P=W+k;E===!0?f.push(P,P+1,H):f.push(P+1,P,H),F+=3}d.addGroup(v,F,E===!0?1:2),v+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sa extends ss{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new Sa(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bc extends Oe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const o=[],l=[];c(s),d(n),f(),this.setAttribute("position",new me(o,3)),this.setAttribute("normal",new me(o.slice(),3)),this.setAttribute("uv",new me(l,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function c(S){const w=new K,E=new K,N=new K;for(let U=0;U<e.length;U+=3)m(e[U+0],w),m(e[U+1],E),m(e[U+2],N),u(w,E,N,S)}function u(S,w,E,N){const U=N+1,O=[];for(let F=0;F<=U;F++){O[F]=[];const I=S.clone().lerp(E,F/U),R=w.clone().lerp(E,F/U),W=U-F;for(let k=0;k<=W;k++)k===0&&F===U?O[F][k]=I:O[F][k]=I.clone().lerp(R,k/W)}for(let F=0;F<U;F++)for(let I=0;I<2*(U-F)-1;I++){const R=Math.floor(I/2);I%2===0?(_(O[F][R+1]),_(O[F+1][R]),_(O[F][R])):(_(O[F][R+1]),_(O[F+1][R+1]),_(O[F+1][R]))}}function d(S){const w=new K;for(let E=0;E<o.length;E+=3)w.x=o[E+0],w.y=o[E+1],w.z=o[E+2],w.normalize().multiplyScalar(S),o[E+0]=w.x,o[E+1]=w.y,o[E+2]=w.z}function f(){const S=new K;for(let w=0;w<o.length;w+=3){S.x=o[w+0],S.y=o[w+1],S.z=o[w+2];const E=g(S)/2/Math.PI+.5,N=v(S)/Math.PI+.5;l.push(E,1-N)}x(),p()}function p(){for(let S=0;S<l.length;S+=6){const w=l[S+0],E=l[S+2],N=l[S+4],U=Math.max(w,E,N),O=Math.min(w,E,N);U>.9&&O<.1&&(w<.2&&(l[S+0]+=1),E<.2&&(l[S+2]+=1),N<.2&&(l[S+4]+=1))}}function _(S){o.push(S.x,S.y,S.z)}function m(S,w){const E=S*3;w.x=t[E+0],w.y=t[E+1],w.z=t[E+2]}function x(){const S=new K,w=new K,E=new K,N=new K,U=new vt,O=new vt,F=new vt;for(let I=0,R=0;I<o.length;I+=9,R+=6){S.set(o[I+0],o[I+1],o[I+2]),w.set(o[I+3],o[I+4],o[I+5]),E.set(o[I+6],o[I+7],o[I+8]),U.set(l[R+0],l[R+1]),O.set(l[R+2],l[R+3]),F.set(l[R+4],l[R+5]),N.copy(S).add(w).add(E).divideScalar(3);const W=g(N);y(U,R+0,S,W),y(O,R+2,w,W),y(F,R+4,E,W)}}function y(S,w,E,N){N<0&&S.x===1&&(l[w]=S.x-1),E.x===0&&E.z===0&&(l[w]=N/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function v(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bc(t.vertices,t.indices,t.radius,t.details)}}const Zo=new K,Xo=new K,Ol=new K,qo=new Wn;class kx extends Oe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),o=Math.cos(Us*e),l=t.getIndex(),c=t.getAttribute("position"),u=l?l.count:c.count,d=[0,0,0],f=["a","b","c"],p=new Array(3),_={},m=[];for(let x=0;x<u;x+=3){l?(d[0]=l.getX(x),d[1]=l.getX(x+1),d[2]=l.getX(x+2)):(d[0]=x,d[1]=x+1,d[2]=x+2);const{a:y,b:g,c:v}=qo;if(y.fromBufferAttribute(c,d[0]),g.fromBufferAttribute(c,d[1]),v.fromBufferAttribute(c,d[2]),qo.getNormal(Ol),p[0]=`${Math.round(y.x*s)},${Math.round(y.y*s)},${Math.round(y.z*s)}`,p[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,p[2]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const w=(S+1)%3,E=p[S],N=p[w],U=qo[f[S]],O=qo[f[w]],F=`${E}_${N}`,I=`${N}_${E}`;I in _&&_[I]?(Ol.dot(_[I].normal)<=o&&(m.push(U.x,U.y,U.z),m.push(O.x,O.y,O.z)),_[I]=null):F in _||(_[F]={index0:d[S],index1:d[w],normal:Ol.clone()})}}for(const x in _)if(_[x]){const{index0:y,index1:g}=_[x];Zo.fromBufferAttribute(c,y),Xo.fromBufferAttribute(c,g),m.push(Zo.x,Zo.y,Zo.z),m.push(Xo.x,Xo.y,Xo.z)}this.setAttribute("position",new me(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class wc extends Qh{constructor(t){super(t),this.uuid=as(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Qh().fromJSON(s))}return this}}const zx={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let o=mf(r,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,u,d,f,p,_,m;if(n&&(o=Gx(r,t,o,e)),r.length>80*e){c=d=r[0],u=f=r[1];for(let x=e;x<s;x+=e)p=r[x],_=r[x+1],p<c&&(c=p),_<u&&(u=_),p>d&&(d=p),_>f&&(f=_);m=Math.max(d-c,f-u),m=m!==0?32767/m:0}return Ws(o,l,e,c,u,m,0),l}};function mf(r,t,e,n,s){let o,l;if(s===t1(r,t,e,n)>0)for(o=t;o<e;o+=n)l=td(o,r[o],r[o+1],l);else for(o=e-n;o>=t;o-=n)l=td(o,r[o],r[o+1],l);return l&&Ea(l,l.next)&&(Xs(l),l=l.next),l}function ar(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Ea(e,e.next)||Ce(e.prev,e,e.next)===0)){if(Xs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Ws(r,t,e,n,s,o,l){if(!r)return;!l&&o&&jx(r,n,s,o);let c=r,u,d;for(;r.prev!==r.next;){if(u=r.prev,d=r.next,o?Fx(r,n,s,o):Bx(r)){t.push(u.i/e|0),t.push(r.i/e|0),t.push(d.i/e|0),Xs(r),r=d.next,c=d.next;continue}if(r=d,r===c){l?l===1?(r=Hx(ar(r),t,e),Ws(r,t,e,n,s,o,2)):l===2&&Vx(r,t,e,n,s,o):Ws(ar(r),t,e,n,s,o,1);break}}}function Bx(r){const t=r.prev,e=r,n=r.next;if(Ce(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,u=e.y,d=n.y,f=s<o?s<l?s:l:o<l?o:l,p=c<u?c<d?c:d:u<d?u:d,_=s>o?s>l?s:l:o>l?o:l,m=c>u?c>d?c:d:u>d?u:d;let x=n.next;for(;x!==t;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=m&&qr(s,c,o,u,l,d,x.x,x.y)&&Ce(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function Fx(r,t,e,n){const s=r.prev,o=r,l=r.next;if(Ce(s,o,l)>=0)return!1;const c=s.x,u=o.x,d=l.x,f=s.y,p=o.y,_=l.y,m=c<u?c<d?c:d:u<d?u:d,x=f<p?f<_?f:_:p<_?p:_,y=c>u?c>d?c:d:u>d?u:d,g=f>p?f>_?f:_:p>_?p:_,v=tc(m,x,t,e,n),S=tc(y,g,t,e,n);let w=r.prevZ,E=r.nextZ;for(;w&&w.z>=v&&E&&E.z<=S;){if(w.x>=m&&w.x<=y&&w.y>=x&&w.y<=g&&w!==s&&w!==l&&qr(c,f,u,p,d,_,w.x,w.y)&&Ce(w.prev,w,w.next)>=0||(w=w.prevZ,E.x>=m&&E.x<=y&&E.y>=x&&E.y<=g&&E!==s&&E!==l&&qr(c,f,u,p,d,_,E.x,E.y)&&Ce(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;w&&w.z>=v;){if(w.x>=m&&w.x<=y&&w.y>=x&&w.y<=g&&w!==s&&w!==l&&qr(c,f,u,p,d,_,w.x,w.y)&&Ce(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;E&&E.z<=S;){if(E.x>=m&&E.x<=y&&E.y>=x&&E.y<=g&&E!==s&&E!==l&&qr(c,f,u,p,d,_,E.x,E.y)&&Ce(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function Hx(r,t,e){let n=r;do{const s=n.prev,o=n.next.next;!Ea(s,o)&&gf(s,n,n.next,o)&&Zs(s,o)&&Zs(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),Xs(n),Xs(n.next),n=r=o),n=n.next}while(n!==r);return ar(n)}function Vx(r,t,e,n,s,o){let l=r;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&Kx(l,c)){let u=_f(l,c);l=ar(l,l.next),u=ar(u,u.next),Ws(l,t,e,n,s,o,0),Ws(u,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==r)}function Gx(r,t,e,n){const s=[];let o,l,c,u,d;for(o=0,l=t.length;o<l;o++)c=t[o]*n,u=o<l-1?t[o+1]*n:r.length,d=mf(r,c,u,n,!1),d===d.next&&(d.steiner=!0),s.push($x(d));for(s.sort(Wx),o=0;o<s.length;o++)e=Zx(s[o],e);return e}function Wx(r,t){return r.x-t.x}function Zx(r,t){const e=Xx(r,t);if(!e)return t;const n=_f(e,r);return ar(n,n.next),ar(e,e.next)}function Xx(r,t){let e=t,n=-1/0,s;const o=r.x,l=r.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const _=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(_<=o&&_>n&&(n=_,s=e.x<e.next.x?e:e.next,_===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,u=s.x,d=s.y;let f=1/0,p;e=s;do o>=e.x&&e.x>=u&&o!==e.x&&qr(l<d?o:n,l,u,d,l<d?n:o,l,e.x,e.y)&&(p=Math.abs(l-e.y)/(o-e.x),Zs(e,r)&&(p<f||p===f&&(e.x>s.x||e.x===s.x&&qx(s,e)))&&(s=e,f=p)),e=e.next;while(e!==c);return s}function qx(r,t){return Ce(r.prev,r,t.prev)<0&&Ce(t.next,r,r.next)<0}function jx(r,t,e,n){let s=r;do s.z===0&&(s.z=tc(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,Yx(s)}function Yx(r){let t,e,n,s,o,l,c,u,d=1;do{for(e=r,r=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(u=d;c>0||u>0&&n;)c!==0&&(u===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,u--),o?o.nextZ=s:r=s,s.prevZ=o,o=s;e=n}o.nextZ=null,d*=2}while(l>1);return r}function tc(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function $x(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function qr(r,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(r-l)*(o-c)&&(r-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function Kx(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!Jx(r,t)&&(Zs(r,t)&&Zs(t,r)&&Qx(r,t)&&(Ce(r.prev,r,t.prev)||Ce(r,t.prev,t))||Ea(r,t)&&Ce(r.prev,r,r.next)>0&&Ce(t.prev,t,t.next)>0)}function Ce(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Ea(r,t){return r.x===t.x&&r.y===t.y}function gf(r,t,e,n){const s=Yo(Ce(r,t,e)),o=Yo(Ce(r,t,n)),l=Yo(Ce(e,n,r)),c=Yo(Ce(e,n,t));return!!(s!==o&&l!==c||s===0&&jo(r,e,t)||o===0&&jo(r,n,t)||l===0&&jo(e,r,n)||c===0&&jo(e,t,n))}function jo(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Yo(r){return r>0?1:r<0?-1:0}function Jx(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&gf(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function Zs(r,t){return Ce(r.prev,r,r.next)<0?Ce(r,t,r.next)>=0&&Ce(r,r.prev,t)>=0:Ce(r,t,r.prev)<0||Ce(r,r.next,t)<0}function Qx(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,o=(r.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function _f(r,t){const e=new ec(r.i,r.x,r.y),n=new ec(t.i,t.x,t.y),s=r.next,o=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function td(r,t,e,n){const s=new ec(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Xs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ec(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function t1(r,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(r[l]-r[o])*(r[o+1]+r[l+1]),l=o;return s}class Bs{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return Bs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];ed(t),nd(n,t);let l=t.length;e.forEach(ed);for(let u=0;u<e.length;u++)s.push(l),l+=e[u].length,nd(n,e[u]);const c=zx.triangulate(n,s);for(let u=0;u<c.length;u+=3)o.push(c.slice(u,u+3));return o}}function ed(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function nd(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class Ta extends Oe{constructor(t=new wc([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,u=t.length;c<u;c++){const d=t[c];l(d)}this.setAttribute("position",new me(s,3)),this.setAttribute("uv",new me(o,2)),this.computeVertexNormals();function l(c){const u=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,p=e.depth!==void 0?e.depth:1;let _=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:m-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const v=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:e1;let w,E=!1,N,U,O,F;v&&(w=v.getSpacedPoints(f),E=!0,_=!1,N=v.computeFrenetFrames(f,!1),U=new K,O=new K,F=new K),_||(g=0,m=0,x=0,y=0);const I=c.extractPoints(d);let R=I.shape;const W=I.holes;if(!Bs.isClockWise(R)){R=R.reverse();for(let yt=0,xt=W.length;yt<xt;yt++){const T=W[yt];Bs.isClockWise(T)&&(W[yt]=T.reverse())}}const H=Bs.triangulateShape(R,W),P=R;for(let yt=0,xt=W.length;yt<xt;yt++){const T=W[yt];R=R.concat(T)}function Z(yt,xt,T){return xt||console.error("THREE.ExtrudeGeometry: vec does not exist"),yt.clone().addScaledVector(xt,T)}const nt=R.length,ot=H.length;function j(yt,xt,T){let et,$,C;const M=yt.x-xt.x,B=yt.y-xt.y,X=T.x-yt.x,J=T.y-yt.y,G=M*M+B*B,ft=M*J-B*X;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(G),pt=Math.sqrt(X*X+J*J),Tt=xt.x-B/lt,Et=xt.y+M/lt,At=T.x-J/pt,Ht=T.y+X/pt,zt=((At-Tt)*J-(Ht-Et)*X)/(M*J-B*X);et=Tt+M*zt-yt.x,$=Et+B*zt-yt.y;const Dt=et*et+$*$;if(Dt<=2)return new vt(et,$);C=Math.sqrt(Dt/2)}else{let lt=!1;M>Number.EPSILON?X>Number.EPSILON&&(lt=!0):M<-Number.EPSILON?X<-Number.EPSILON&&(lt=!0):Math.sign(B)===Math.sign(J)&&(lt=!0),lt?(et=-B,$=M,C=Math.sqrt(G)):(et=M,$=B,C=Math.sqrt(G/2))}return new vt(et/C,$/C)}const rt=[];for(let yt=0,xt=P.length,T=xt-1,et=yt+1;yt<xt;yt++,T++,et++)T===xt&&(T=0),et===xt&&(et=0),rt[yt]=j(P[yt],P[T],P[et]);const at=[];let q,tt=rt.concat();for(let yt=0,xt=W.length;yt<xt;yt++){const T=W[yt];q=[];for(let et=0,$=T.length,C=$-1,M=et+1;et<$;et++,C++,M++)C===$&&(C=0),M===$&&(M=0),q[et]=j(T[et],T[C],T[M]);at.push(q),tt=tt.concat(q)}for(let yt=0;yt<g;yt++){const xt=yt/g,T=m*Math.cos(xt*Math.PI/2),et=x*Math.sin(xt*Math.PI/2)+y;for(let $=0,C=P.length;$<C;$++){const M=Z(P[$],rt[$],et);St(M.x,M.y,-T)}for(let $=0,C=W.length;$<C;$++){const M=W[$];q=at[$];for(let B=0,X=M.length;B<X;B++){const J=Z(M[B],q[B],et);St(J.x,J.y,-T)}}}const Lt=x+y;for(let yt=0;yt<nt;yt++){const xt=_?Z(R[yt],tt[yt],Lt):R[yt];E?(O.copy(N.normals[0]).multiplyScalar(xt.x),U.copy(N.binormals[0]).multiplyScalar(xt.y),F.copy(w[0]).add(O).add(U),St(F.x,F.y,F.z)):St(xt.x,xt.y,0)}for(let yt=1;yt<=f;yt++)for(let xt=0;xt<nt;xt++){const T=_?Z(R[xt],tt[xt],Lt):R[xt];E?(O.copy(N.normals[yt]).multiplyScalar(T.x),U.copy(N.binormals[yt]).multiplyScalar(T.y),F.copy(w[yt]).add(O).add(U),St(F.x,F.y,F.z)):St(T.x,T.y,p/f*yt)}for(let yt=g-1;yt>=0;yt--){const xt=yt/g,T=m*Math.cos(xt*Math.PI/2),et=x*Math.sin(xt*Math.PI/2)+y;for(let $=0,C=P.length;$<C;$++){const M=Z(P[$],rt[$],et);St(M.x,M.y,p+T)}for(let $=0,C=W.length;$<C;$++){const M=W[$];q=at[$];for(let B=0,X=M.length;B<X;B++){const J=Z(M[B],q[B],et);E?St(J.x,J.y+w[f-1].y,w[f-1].x+T):St(J.x,J.y,p+T)}}}Q(),it();function Q(){const yt=s.length/3;if(_){let xt=0,T=nt*xt;for(let et=0;et<ot;et++){const $=H[et];Pt($[2]+T,$[1]+T,$[0]+T)}xt=f+g*2,T=nt*xt;for(let et=0;et<ot;et++){const $=H[et];Pt($[0]+T,$[1]+T,$[2]+T)}}else{for(let xt=0;xt<ot;xt++){const T=H[xt];Pt(T[2],T[1],T[0])}for(let xt=0;xt<ot;xt++){const T=H[xt];Pt(T[0]+nt*f,T[1]+nt*f,T[2]+nt*f)}}n.addGroup(yt,s.length/3-yt,0)}function it(){const yt=s.length/3;let xt=0;wt(P,xt),xt+=P.length;for(let T=0,et=W.length;T<et;T++){const $=W[T];wt($,xt),xt+=$.length}n.addGroup(yt,s.length/3-yt,1)}function wt(yt,xt){let T=yt.length;for(;--T>=0;){const et=T;let $=T-1;$<0&&($=yt.length-1);for(let C=0,M=f+g*2;C<M;C++){const B=nt*C,X=nt*(C+1),J=xt+et+B,G=xt+$+B,ft=xt+$+X,lt=xt+et+X;It(J,G,ft,lt)}}}function St(yt,xt,T){u.push(yt),u.push(xt),u.push(T)}function Pt(yt,xt,T){kt(yt),kt(xt),kt(T);const et=s.length/3,$=S.generateTopUV(n,s,et-3,et-2,et-1);st($[0]),st($[1]),st($[2])}function It(yt,xt,T,et){kt(yt),kt(xt),kt(et),kt(xt),kt(T),kt(et);const $=s.length/3,C=S.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);st(C[0]),st(C[1]),st(C[3]),st(C[1]),st(C[2]),st(C[3])}function kt(yt){s.push(u[yt*3+0]),s.push(u[yt*3+1]),s.push(u[yt*3+2])}function st(yt){o.push(yt.x),o.push(yt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return n1(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ua[s.type]().fromJSON(s)),new Ta(n,t.options)}}const e1={generateTopUV:function(r,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],u=t[n*3+1],d=t[s*3],f=t[s*3+1];return[new vt(o,l),new vt(c,u),new vt(d,f)]},generateSideWallUV:function(r,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],u=t[e*3+2],d=t[n*3],f=t[n*3+1],p=t[n*3+2],_=t[s*3],m=t[s*3+1],x=t[s*3+2],y=t[o*3],g=t[o*3+1],v=t[o*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new vt(l,1-u),new vt(d,1-p),new vt(_,1-x),new vt(y,1-v)]:[new vt(c,1-u),new vt(f,1-p),new vt(m,1-x),new vt(g,1-v)]}};function n1(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const o=r[n];e.shapes.push(o.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Mc extends bc{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Mc(t.radius,t.detail)}}class ha extends Oe{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],d=[],f=new K,p=new K,_=new K;for(let m=0;m<=n;m++)for(let x=0;x<=s;x++){const y=x/s*o,g=m/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(y),p.y=(t+e*Math.cos(g))*Math.sin(y),p.z=e*Math.sin(g),c.push(p.x,p.y,p.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),_.subVectors(p,f).normalize(),u.push(_.x,_.y,_.z),d.push(x/s),d.push(m/n)}for(let m=1;m<=n;m++)for(let x=1;x<=s;x++){const y=(s+1)*m+x-1,g=(s+1)*(m-1)+x-1,v=(s+1)*(m-1)+x,S=(s+1)*m+x;l.push(y,g,S),l.push(g,v,S)}this.setIndex(l),this.setAttribute("position",new me(c,3)),this.setAttribute("normal",new me(u,3)),this.setAttribute("uv",new me(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ha(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Sc extends Oe{constructor(t=new ff(new K(-1,-1,0),new K(-1,1,0),new K(1,1,0)),e=64,n=1,s=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:o};const l=t.computeFrenetFrames(e,o);this.tangents=l.tangents,this.normals=l.normals,this.binormals=l.binormals;const c=new K,u=new K,d=new vt;let f=new K;const p=[],_=[],m=[],x=[];y(),this.setIndex(x),this.setAttribute("position",new me(p,3)),this.setAttribute("normal",new me(_,3)),this.setAttribute("uv",new me(m,2));function y(){for(let w=0;w<e;w++)g(w);g(o===!1?e:0),S(),v()}function g(w){f=t.getPointAt(w/e,f);const E=l.normals[w],N=l.binormals[w];for(let U=0;U<=s;U++){const O=U/s*Math.PI*2,F=Math.sin(O),I=-Math.cos(O);u.x=I*E.x+F*N.x,u.y=I*E.y+F*N.y,u.z=I*E.z+F*N.z,u.normalize(),_.push(u.x,u.y,u.z),c.x=f.x+n*u.x,c.y=f.y+n*u.y,c.z=f.z+n*u.z,p.push(c.x,c.y,c.z)}}function v(){for(let w=1;w<=e;w++)for(let E=1;E<=s;E++){const N=(s+1)*(w-1)+(E-1),U=(s+1)*w+(E-1),O=(s+1)*w+E,F=(s+1)*(w-1)+E;x.push(N,U,F),x.push(U,O,F)}}function S(){for(let w=0;w<=e;w++)for(let E=0;E<=s;E++)d.x=w/e,d.y=E/s,m.push(d.x,d.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Sc(new ua[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class er extends ur{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fs extends ur{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fc,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qn,this.combine=dc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class vf extends Qe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const Ul=new Te,id=new K,rd=new K;class i1{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.map=null,this.mapPass=null,this.matrix=new Te,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gc,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;id.setFromMatrixPosition(t.matrixWorld),e.position.copy(id),rd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rd),e.updateMatrixWorld(),Ul.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ul),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ul)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class r1 extends i1{constructor(){super(new Kd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nc extends vf{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Qe.DEFAULT_UP),this.updateMatrix(),this.target=new Qe,this.shadow=new r1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class yf extends vf{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const sd=new Te;class s1{constructor(t,e,n=0,s=1/0){this.ray=new wa(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new mc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return sd.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(sd),this}intersectObject(t,e=!0,n=[]){return ic(t,this,n,e),n.sort(od),n}intersectObjects(t,e=!0,n=[]){for(let s=0,o=t.length;s<o;s++)ic(t[s],this,n,e);return n.sort(od),n}}function od(r,t){return r.distance-t.distance}function ic(r,t,e,n){if(r.layers.test(t.layers)&&r.raycast(t,e),n===!0){const s=r.children;for(let o=0,l=s.length;o<l;o++)ic(s[o],t,e,!0)}}class ad{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hc);const ld={type:"change"},kl={type:"start"},cd={type:"end"},$o=new wa,ud=new Li,o1=Math.cos(70*mg.DEG2RAD);class xf extends cr{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new K,this.cursor=new K,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:xr.ROTATE,MIDDLE:xr.DOLLY,RIGHT:xr.PAN},this.touches={ONE:br.ROTATE,TWO:br.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(D){D.addEventListener("keydown",At),this._domElementKeyEvents=D},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",At),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(ld),n.update(),o=s.NONE},this.update=function(){const D=new K,ht=new or().setFromUnitVectors(t.up,new K(0,1,0)),Mt=ht.clone().invert(),Rt=new K,Nt=new or,re=new K,ue=2*Math.PI;return function(Ue=null){const ge=n.object.position;D.copy(ge).sub(n.target),D.applyQuaternion(ht),c.setFromVector3(D),n.autoRotate&&o===s.NONE&&k(R(Ue)),n.enableDamping?(c.theta+=u.theta*n.dampingFactor,c.phi+=u.phi*n.dampingFactor):(c.theta+=u.theta,c.phi+=u.phi);let Le=n.minAzimuthAngle,Ee=n.maxAzimuthAngle;isFinite(Le)&&isFinite(Ee)&&(Le<-Math.PI?Le+=ue:Le>Math.PI&&(Le-=ue),Ee<-Math.PI?Ee+=ue:Ee>Math.PI&&(Ee-=ue),Le<=Ee?c.theta=Math.max(Le,Math.min(Ee,c.theta)):c.theta=c.theta>(Le+Ee)/2?Math.max(Le,c.theta):Math.min(Ee,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let sn=!1;if(n.zoomToCursor&&U||n.object.isOrthographicCamera)c.radius=at(c.radius);else{const pn=c.radius;c.radius=at(c.radius*d),sn=pn!=c.radius}if(D.setFromSpherical(c),D.applyQuaternion(Mt),ge.copy(n.target).add(D),n.object.lookAt(n.target),n.enableDamping===!0?(u.theta*=1-n.dampingFactor,u.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(u.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&U){let pn=null;if(n.object.isPerspectiveCamera){const jn=D.length();pn=at(jn*d);const vi=jn-pn;n.object.position.addScaledVector(E,vi),n.object.updateMatrixWorld(),sn=!!vi}else if(n.object.isOrthographicCamera){const jn=new K(N.x,N.y,0);jn.unproject(n.object);const vi=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),sn=vi!==n.object.zoom;const Ge=new K(N.x,N.y,0);Ge.unproject(n.object),n.object.position.sub(Ge).add(jn),n.object.updateMatrixWorld(),pn=D.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;pn!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(pn).add(n.object.position):($o.origin.copy(n.object.position),$o.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot($o.direction))<o1?t.lookAt(n.target):(ud.setFromNormalAndCoplanarPoint(n.object.up,n.target),$o.intersectPlane(ud,n.target))))}else if(n.object.isOrthographicCamera){const pn=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),pn!==n.object.zoom&&(n.object.updateProjectionMatrix(),sn=!0)}return d=1,U=!1,sn||Rt.distanceToSquared(n.object.position)>l||8*(1-Nt.dot(n.object.quaternion))>l||re.distanceToSquared(n.target)>l?(n.dispatchEvent(ld),Rt.copy(n.object.position),Nt.copy(n.object.quaternion),re.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",B),n.domElement.removeEventListener("pointercancel",J),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",J),n.domElement.getRootNode().removeEventListener("keydown",Tt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",At),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new ad,u=new ad;let d=1;const f=new K,p=new vt,_=new vt,m=new vt,x=new vt,y=new vt,g=new vt,v=new vt,S=new vt,w=new vt,E=new K,N=new vt;let U=!1;const O=[],F={};let I=!1;function R(D){return D!==null?2*Math.PI/60*n.autoRotateSpeed*D:2*Math.PI/60/60*n.autoRotateSpeed}function W(D){const ht=Math.abs(D*.01);return Math.pow(.95,n.zoomSpeed*ht)}function k(D){u.theta-=D}function H(D){u.phi-=D}const P=function(){const D=new K;return function(Mt,Rt){D.setFromMatrixColumn(Rt,0),D.multiplyScalar(-Mt),f.add(D)}}(),Z=function(){const D=new K;return function(Mt,Rt){n.screenSpacePanning===!0?D.setFromMatrixColumn(Rt,1):(D.setFromMatrixColumn(Rt,0),D.crossVectors(n.object.up,D)),D.multiplyScalar(Mt),f.add(D)}}(),nt=function(){const D=new K;return function(Mt,Rt){const Nt=n.domElement;if(n.object.isPerspectiveCamera){const re=n.object.position;D.copy(re).sub(n.target);let ue=D.length();ue*=Math.tan(n.object.fov/2*Math.PI/180),P(2*Mt*ue/Nt.clientHeight,n.object.matrix),Z(2*Rt*ue/Nt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(P(Mt*(n.object.right-n.object.left)/n.object.zoom/Nt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/Nt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ot(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(D){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=D:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function rt(D,ht){if(!n.zoomToCursor)return;U=!0;const Mt=n.domElement.getBoundingClientRect(),Rt=D-Mt.left,Nt=ht-Mt.top,re=Mt.width,ue=Mt.height;N.x=Rt/re*2-1,N.y=-(Nt/ue)*2+1,E.set(N.x,N.y,1).unproject(n.object).sub(n.object.position).normalize()}function at(D){return Math.max(n.minDistance,Math.min(n.maxDistance,D))}function q(D){p.set(D.clientX,D.clientY)}function tt(D){rt(D.clientX,D.clientX),v.set(D.clientX,D.clientY)}function Lt(D){x.set(D.clientX,D.clientY)}function Q(D){_.set(D.clientX,D.clientY),m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;k(2*Math.PI*m.x/ht.clientHeight),H(2*Math.PI*m.y/ht.clientHeight),p.copy(_),n.update()}function it(D){S.set(D.clientX,D.clientY),w.subVectors(S,v),w.y>0?ot(W(w.y)):w.y<0&&j(W(w.y)),v.copy(S),n.update()}function wt(D){y.set(D.clientX,D.clientY),g.subVectors(y,x).multiplyScalar(n.panSpeed),nt(g.x,g.y),x.copy(y),n.update()}function St(D){rt(D.clientX,D.clientY),D.deltaY<0?j(W(D.deltaY)):D.deltaY>0&&ot(W(D.deltaY)),n.update()}function Pt(D){let ht=!1;switch(D.code){case n.keys.UP:D.ctrlKey||D.metaKey||D.shiftKey?H(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(0,n.keyPanSpeed),ht=!0;break;case n.keys.BOTTOM:D.ctrlKey||D.metaKey||D.shiftKey?H(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(0,-n.keyPanSpeed),ht=!0;break;case n.keys.LEFT:D.ctrlKey||D.metaKey||D.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(n.keyPanSpeed,0),ht=!0;break;case n.keys.RIGHT:D.ctrlKey||D.metaKey||D.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):nt(-n.keyPanSpeed,0),ht=!0;break}ht&&(D.preventDefault(),n.update())}function It(D){if(O.length===1)p.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);p.set(Mt,Rt)}}function kt(D){if(O.length===1)x.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);x.set(Mt,Rt)}}function st(D){const ht=te(D),Mt=D.pageX-ht.x,Rt=D.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);v.set(0,Nt)}function yt(D){n.enableZoom&&st(D),n.enablePan&&kt(D)}function xt(D){n.enableZoom&&st(D),n.enableRotate&&It(D)}function T(D){if(O.length==1)_.set(D.pageX,D.pageY);else{const Mt=te(D),Rt=.5*(D.pageX+Mt.x),Nt=.5*(D.pageY+Mt.y);_.set(Rt,Nt)}m.subVectors(_,p).multiplyScalar(n.rotateSpeed);const ht=n.domElement;k(2*Math.PI*m.x/ht.clientHeight),H(2*Math.PI*m.y/ht.clientHeight),p.copy(_)}function et(D){if(O.length===1)y.set(D.pageX,D.pageY);else{const ht=te(D),Mt=.5*(D.pageX+ht.x),Rt=.5*(D.pageY+ht.y);y.set(Mt,Rt)}g.subVectors(y,x).multiplyScalar(n.panSpeed),nt(g.x,g.y),x.copy(y)}function $(D){const ht=te(D),Mt=D.pageX-ht.x,Rt=D.pageY-ht.y,Nt=Math.sqrt(Mt*Mt+Rt*Rt);S.set(0,Nt),w.set(0,Math.pow(S.y/v.y,n.zoomSpeed)),ot(w.y),v.copy(S);const re=(D.pageX+ht.x)*.5,ue=(D.pageY+ht.y)*.5;rt(re,ue)}function C(D){n.enableZoom&&$(D),n.enablePan&&et(D)}function M(D){n.enableZoom&&$(D),n.enableRotate&&T(D)}function B(D){n.enabled!==!1&&(O.length===0&&(n.domElement.setPointerCapture(D.pointerId),n.domElement.addEventListener("pointermove",X),n.domElement.addEventListener("pointerup",J)),!oe(D)&&(Kt(D),D.pointerType==="touch"?Ht(D):G(D)))}function X(D){n.enabled!==!1&&(D.pointerType==="touch"?zt(D):ft(D))}function J(D){switch(Vt(D),O.length){case 0:n.domElement.releasePointerCapture(D.pointerId),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",J),n.dispatchEvent(cd),o=s.NONE;break;case 1:const ht=O[0],Mt=F[ht];Ht({pointerId:ht,pageX:Mt.x,pageY:Mt.y});break}}function G(D){let ht;switch(D.button){case 0:ht=n.mouseButtons.LEFT;break;case 1:ht=n.mouseButtons.MIDDLE;break;case 2:ht=n.mouseButtons.RIGHT;break;default:ht=-1}switch(ht){case xr.DOLLY:if(n.enableZoom===!1)return;tt(D),o=s.DOLLY;break;case xr.ROTATE:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enablePan===!1)return;Lt(D),o=s.PAN}else{if(n.enableRotate===!1)return;q(D),o=s.ROTATE}break;case xr.PAN:if(D.ctrlKey||D.metaKey||D.shiftKey){if(n.enableRotate===!1)return;q(D),o=s.ROTATE}else{if(n.enablePan===!1)return;Lt(D),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(kl)}function ft(D){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;Q(D);break;case s.DOLLY:if(n.enableZoom===!1)return;it(D);break;case s.PAN:if(n.enablePan===!1)return;wt(D);break}}function lt(D){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(D.preventDefault(),n.dispatchEvent(kl),St(pt(D)),n.dispatchEvent(cd))}function pt(D){const ht=D.deltaMode,Mt={clientX:D.clientX,clientY:D.clientY,deltaY:D.deltaY};switch(ht){case 1:Mt.deltaY*=16;break;case 2:Mt.deltaY*=100;break}return D.ctrlKey&&!I&&(Mt.deltaY*=10),Mt}function Tt(D){D.key==="Control"&&(I=!0,n.domElement.getRootNode().addEventListener("keyup",Et,{passive:!0,capture:!0}))}function Et(D){D.key==="Control"&&(I=!1,n.domElement.getRootNode().removeEventListener("keyup",Et,{passive:!0,capture:!0}))}function At(D){n.enabled===!1||n.enablePan===!1||Pt(D)}function Ht(D){switch(ae(D),O.length){case 1:switch(n.touches.ONE){case br.ROTATE:if(n.enableRotate===!1)return;It(D),o=s.TOUCH_ROTATE;break;case br.PAN:if(n.enablePan===!1)return;kt(D),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case br.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;yt(D),o=s.TOUCH_DOLLY_PAN;break;case br.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xt(D),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(kl)}function zt(D){switch(ae(D),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;T(D),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;et(D),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;C(D),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;M(D),n.update();break;default:o=s.NONE}}function Dt(D){n.enabled!==!1&&D.preventDefault()}function Kt(D){O.push(D.pointerId)}function Vt(D){delete F[D.pointerId];for(let ht=0;ht<O.length;ht++)if(O[ht]==D.pointerId){O.splice(ht,1);return}}function oe(D){for(let ht=0;ht<O.length;ht++)if(O[ht]==D.pointerId)return!0;return!1}function ae(D){let ht=F[D.pointerId];ht===void 0&&(ht=new vt,F[D.pointerId]=ht),ht.set(D.pageX,D.pageY)}function te(D){const ht=D.pointerId===O[0]?O[1]:O[0];return F[ht]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",B),n.domElement.addEventListener("pointercancel",J),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Tt,{passive:!0,capture:!0}),this.update()}}let Ko=null;function Ec(r){return Ko||(Ko=new Promise(t=>{const e=r.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new sf({canvas:r,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=Ld,o.toneMappingExposure=1,bt.renderer=o;const l=new of;l.background=new Qt(12113128),bt.scene=l;const c=new Sn(45,n/s,.5,8e3);c.position.set(0,200,350),bt.camera=c;const u=new xf(c,r);u.enableDamping=!0,u.dampingFactor=.07,u.minDistance=10,u.maxDistance=4e3,u.screenSpacePanning=!0,u.maxPolarAngle=Math.PI/2,bt.controls=u,l.add(new yf(16777215,.78));const d=new nc(16775924,.95);d.position.set(-250,700,200),l.add(d);const f=new nc(14544639,.4);f.position.set(200,250,-200),l.add(f);const p=new Ns;l.add(p),bt.tg=p,window.addEventListener("resize",()=>{const m=e.clientWidth,x=e.clientHeight;!m||!x||(c.aspect=m/x,c.updateProjectionMatrix(),o.setSize(m,x))});function _(){requestAnimationFrame(_),u.update(),o.render(l,c)}_(),t()}),Ko)}function a1(){if(bt.tg)for(;bt.tg.children.length;){const r=bt.tg.children[0];bt.tg.remove(r),r.geometry?.dispose(),Array.isArray(r.material)?r.material.forEach(t=>t.dispose()):r.material?.dispose()}}const l1="#f0ede8",c1="#c0bbb5",u1="#0fe300",h1="#0fe300",d1="#0fe300",f1="#0fe300",p1="#262626",Br="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function bf(r,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:u,BASE_H:d}=bt;if(!e||!n)return d;const f=(r+s/2)/s*(n-1),p=(t+o/2)/o*(n-1),_=Math.max(0,Math.min(n-2,Math.floor(f))),m=Math.max(0,Math.min(n-2,Math.floor(p))),x=f-_,y=p-m,g=e[m*n+_]??l,v=e[m*n+_+1]??l,S=e[(m+1)*n+_]??l,w=e[(m+1)*n+_+1]??l,E=g*(1-x)*(1-y)+v*x*(1-y)+S*(1-x)*y+w*x*y;return d+Math.max(0,Math.min(1,(E-l)/Math.max(.001,c)))*u}function Jo(r,t,e){if(!r.positions.length||!r.indices.length)return null;const n=new Oe;n.setAttribute("position",new An(r.positions,3)),r.colors&&n.setAttribute("color",new An(r.colors,3)),n.setIndex(new An(r.indices,1)),n.computeVertexNormals();const s=new Ie(n,t);return s.name=e,s}function m1(r){if(!bt.tg)return;a1();const t=bd(),e=bt.tg;function n(o,l,c,u=-8){l.polygonOffset=!0,l.polygonOffsetFactor=u,l.polygonOffsetUnits=u;const d=Jo(o,l,c);d&&e.add(d)}const s=(o,l=.95,c=!1)=>new er({color:new Qt(o),roughness:l,metalness:0,flatShading:c});{const o=new er({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:vn,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=Jo(r.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=g1(bt.wMm,bt.dMm,bt.zoneType);if(o){const l=new Ta(o,{depth:bt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new Ie(l,new er({color:new Qt(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if(_1(t.cBase),r.GROUND.positions.length){const o=new er({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=Jo(r.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(r.LAND,s(l1),"LAND",-2),n(r.ROCK,s(c1),"ROCK",-3),n(r.FARM,s(f1),"FARM",-4),n(r.GRASS,s(u1),"GRASS",-5),n(r.PARKS,s(d1),"PARKS",-6),n(r.FOREST,s(h1),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=vn,n(r.WATER,o,"WATER",-8)}if(t.roadsOn){n(r.PED,s(p1,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=vn,n(r.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(r.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),r.GPX.positions.length){const o=new er({color:new Qt(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=Jo(r.GPX,o,"GPX");l&&e.add(l)}x1()}function g1(r,t,e){const n=new wc;if(e==="circ")n.ellipse(0,0,r/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(r/2*Math.cos(o),r/2*Math.sin(o)):n.lineTo(r/2*Math.cos(o),r/2*Math.sin(o))}n.closePath()}else n.moveTo(-r/2,-t/2),n.lineTo(r/2,-t/2),n.lineTo(r/2,t/2),n.lineTo(-r/2,t/2),n.closePath();return n}function _1(r){if(!bt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=bt,o=new er({color:new Qt(r),roughness:.55,side:vn});function l(u,d){return{x:u,z:d,topY:Math.max(n,bf(u*.98,d*.98))}}function c(u){const d=[],f=[];let p=0;const _=u.length;for(let y=0;y<_;y++){const g=u[y],v=u[(y+1)%_],S=(g.x+v.x)/2,w=(g.z+v.z)/2,E=S*(v.z-g.z)-w*(v.x-g.x),[N,U]=E>=0?[g,v]:[v,g];d.push(N.x,N.topY,N.z,U.x,U.topY,U.z,U.x,0,U.z,N.x,0,N.z),f.push(p,p+1,p+2,p,p+2,p+3),p+=4}if(!d.length)return;const m=new Oe;m.setAttribute("position",new me(d,3)),m.setIndex(f),m.computeVertexNormals();const x=new Ie(m,o);x.name="WALLS",bt.tg.add(x)}if(s==="circ"){const d=t/2;c(Array.from({length:512},(f,p)=>{const _=p/512*Math.PI*2;return l(d*Math.cos(_),d*Math.sin(_))}))}else if(s==="hex"){const u=t/2;c(Array.from({length:6},(d,f)=>{const p=f/6*Math.PI*2-Math.PI/6;return l(u*Math.cos(p),u*Math.sin(p))}))}else if(bt.zonePts&&bt.zonePts.length>=3&&bt.bounds){const{bounds:u}=bt,d=e/(u.maxLat-u.minLat),f=t/(u.maxLon-u.minLon),p=(u.minLat+u.maxLat)/2,_=(u.minLon+u.maxLon)/2;c(bt.zonePts.map(([m,x])=>l((x-_)*f,-(m-p)*d)))}else{const u=-t/2,d=t/2,f=-e/2,p=e/2;c([l(u,f),l(d,f),l(d,p),l(u,p)])}}const v1=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function zl(r){const t=[],e=[];let n=0;for(const o of r){const l=o.attributes.position,c=o.index;for(let u=0;u<l.count;u++)t.push(l.getX(u),l.getY(u),l.getZ(u));if(c)for(let u=0;u<c.count;u++)e.push(c.getX(u)+n);else for(let u=0;u<l.count;u++)e.push(u+n);n+=l.count,o.dispose()}const s=new Oe;return s.setAttribute("position",new me(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function y1(r,t,e,n){const s=t/2,o=n/2;try{switch(r){case"eiffel":{const l=[new vt(s,0),new vt(s*.82,e*.035),new vt(s*.58,e*.08),new vt(s*.32,e*.135),new vt(s*.265,e*.165),new vt(s*.285,e*.175),new vt(s*.245,e*.188),new vt(s*.18,e*.23),new vt(s*.13,e*.33),new vt(s*.115,e*.348),new vt(s*.13,e*.358),new vt(s*.11,e*.37),new vt(s*.08,e*.43),new vt(s*.048,e*.6),new vt(s*.026,e*.83),new vt(s*.01,e*.94),new vt(0,e)],c=new tr(l,4);c.rotateY(Math.PI/4);const u=new ss(s*.32,s*.32,e*.012,16,1,!1);u.translate(0,e*.175,0);const d=new ss(s*.145,s*.145,e*.01,16,1,!1);return d.translate(0,e*.358,0),zl([c,u,d])}case"burj":{const l=[new vt(s,0),new vt(s*.8,e*.15),new vt(s*.55,e*.4),new vt(s*.25,e*.72),new vt(s*.08,e*.9),new vt(s*.02,e)];return new tr(l,12)}case"dome":{const c=Array.from({length:13},(u,d)=>{const f=d/12*Math.PI/2;return new vt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new vt(s*.9,0),new vt(0,0)),new tr(c,16)}case"onion":{const l=[new vt(s*.3,0),new vt(s*.55,e*.12),new vt(s,e*.4),new vt(s*.55,e*.65),new vt(s*.1,e*.85),new vt(s*.04,e)];return new tr(l,12)}case"tower":{const l=[new vt(s,0),new vt(s*.65,e*.2),new vt(s*.3,e*.55),new vt(s*.1,e*.8),new vt(s*.03,e)];return new tr(l,8)}case"pyramid":{const l=new Sa(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,u=new je(l,c,n);u.translate(-s+l/2,c/2,0);const d=new je(l,c,n);d.translate(s-l/2,c/2,0);const f=new je(t,e*.22,n);return f.translate(0,e*.89,0),zl([u,d,f])}case"cathedral":{const l=t*.55,c=e*.65,u=t*.14,d=new je(l,c,n);d.translate(0,c/2,0);const f=new je(u,e,u);f.translate(-l/2+u/2,e/2,-o+u/2);const p=new je(u,e,u);return p.translate(l/2-u/2,e/2,-o+u/2),zl([d,f,p])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,u=new ha(l,Math.max(c,3),8,32);return u.scale(1,e/(l*.8),o/s),u.translate(0,e/2,0),u}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],u=new Oe;return u.setAttribute("position",new me(l,3)),u.setIndex(c),u.computeVertexNormals(),u}case"wheel":{const l=Math.min(s,e/2),c=new ha(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new je(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function x1(){if(!bt.tg||!bt.bounds||!bt.elevGrid)return;const{bounds:r,wMm:t,dMm:e,mmPerMeter:n}=bt,s=(r.minLat+r.maxLat)/2,o=(r.minLon+r.maxLon)/2,l=e/(r.maxLat-r.minLat),c=t/(r.maxLon-r.minLon),u=.01;let d=0;for(const f of v1){if(f.lat<r.minLat-u||f.lat>r.maxLat+u||f.lon<r.minLon-u||f.lon>r.maxLon+u)continue;const p=(f.lon-o)*c,_=-(f.lat-s)*l,m=t/2,x=e/2;if(!(p>=-m-1&&p<=m+1&&_>=-x-1&&_<=x+1))continue;const g=bf(p,_),v=Math.min(t*.25,Math.max(5,f.rH*n*2)),S=Math.min(t*.08,Math.max(1.5,f.rW*n)),w=Math.min(t*.08,Math.max(1.5,f.rD*n)),E=y1(f.sh,S,v,w);if(!E)continue;E.translate(p,g,_);const N=new Ie(E,new er({color:new Qt(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));N.name="LM_"+f.n,bt.tg.add(N),d++}d&&console.log(`Landmarks: ${d} monument(s)`)}var Qr=Math.pow,rn=(r,t,e)=>new Promise((n,s)=>{var o=u=>{try{c(e.next(u))}catch(d){s(d)}},l=u=>{try{c(e.throw(u))}catch(d){s(d)}},c=u=>u.done?n(u.value):Promise.resolve(u.value).then(o,l);c((e=e.apply(r,t)).next())}),En=Uint8Array,Hs=Uint16Array,b1=Int32Array,wf=new En([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Mf=new En([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),w1=new En([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Sf=function(r,t){for(var e=new Hs(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var s=new b1(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},Ef=Sf(wf,2),Tf=Ef.b,M1=Ef.r;Tf[28]=258,M1[258]=28;var S1=Sf(Mf,0),E1=S1.b,Af=new Hs(32768);for(pe=0;pe<32768;++pe)pi=(pe&43690)>>1|(pe&21845)<<1,pi=(pi&52428)>>2|(pi&13107)<<2,pi=(pi&61680)>>4|(pi&3855)<<4,Af[pe]=((pi&65280)>>8|(pi&255)<<8)>>1;var pi,pe,Vs=function(r,t,e){for(var n=r.length,s=0,o=new Hs(t);s<n;++s)r[s]&&++o[r[s]-1];var l=new Hs(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new Hs(1<<t);var u=15-t;for(s=0;s<n;++s)if(r[s])for(var d=s<<4|r[s],f=t-r[s],p=l[r[s]-1]++<<f,_=p|(1<<f)-1;p<=_;++p)c[Af[p]>>u]=d}return c},Ks=new En(288);for(pe=0;pe<144;++pe)Ks[pe]=8;var pe;for(pe=144;pe<256;++pe)Ks[pe]=9;var pe;for(pe=256;pe<280;++pe)Ks[pe]=7;var pe;for(pe=280;pe<288;++pe)Ks[pe]=8;var pe,Cf=new En(32);for(pe=0;pe<32;++pe)Cf[pe]=5;var pe,T1=Vs(Ks,9),A1=Vs(Cf,5),Bl=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},Hn=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},Fl=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},C1=function(r){return(r+7)/8|0},L1=function(r,t,e){(e==null||e>r.length)&&(e=r.length);var n=new En(e-t);return n.set(r.subarray(t,e)),n},P1=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Mn=function(r,t,e){var n=new Error(t||P1[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,Mn),!e)throw n;return n},Tc=function(r,t,e,n){var s=r.length,o=0;if(!s||t.f&&!t.l)return e||new En(0);var l=!e||t.i!=2,c=t.i;e||(e=new En(s*3));var u=function(kt){var st=e.length;if(kt>st){var yt=new En(Math.max(st*2,kt));yt.set(e),e=yt}},d=t.f||0,f=t.p||0,p=t.b||0,_=t.l,m=t.d,x=t.m,y=t.n,g=s*8;do{if(!_){d=Hn(r,f,1);var v=Hn(r,f+1,3);if(f+=3,v)if(v==1)_=T1,m=A1,x=9,y=5;else if(v==2){var N=Hn(r,f,31)+257,U=Hn(r,f+10,15)+4,O=N+Hn(r,f+5,31)+1;f+=14;for(var F=new En(O),I=new En(19),R=0;R<U;++R)I[w1[R]]=Hn(r,f+R*3,7);f+=U*3;for(var W=Bl(I),k=(1<<W)-1,H=Vs(I,W),R=0;R<O;){var P=H[Hn(r,f,k)];f+=P&15;var S=P>>4;if(S<16)F[R++]=S;else{var Z=0,nt=0;for(S==16?(nt=3+Hn(r,f,3),f+=2,Z=F[R-1]):S==17?(nt=3+Hn(r,f,7),f+=3):S==18&&(nt=11+Hn(r,f,127),f+=7);nt--;)F[R++]=Z}}var ot=F.subarray(0,N),j=F.subarray(N);x=Bl(ot),y=Bl(j),_=Vs(ot,x),m=Vs(j,y)}else Mn(1);else{var S=C1(f)+4,w=r[S-4]|r[S-3]<<8,E=S+w;if(E>s){c&&Mn(0);break}l&&u(p+w),e.set(r.subarray(S,E),p),t.b=p+=w,t.p=f=E*8,t.f=d;continue}if(f>g){c&&Mn(0);break}}l&&u(p+131072);for(var rt=(1<<x)-1,at=(1<<y)-1,q=f;;q=f){var Z=_[Fl(r,f)&rt],tt=Z>>4;if(f+=Z&15,f>g){c&&Mn(0);break}if(Z||Mn(2),tt<256)e[p++]=tt;else if(tt==256){q=f,_=null;break}else{var Lt=tt-254;if(tt>264){var R=tt-257,Q=wf[R];Lt=Hn(r,f,(1<<Q)-1)+Tf[R],f+=Q}var it=m[Fl(r,f)&at],wt=it>>4;it||Mn(3),f+=it&15;var j=E1[wt];if(wt>3){var Q=Mf[wt];j+=Fl(r,f)&(1<<Q)-1,f+=Q}if(f>g){c&&Mn(0);break}l&&u(p+131072);var St=p+Lt;if(p<j){var Pt=o-j,It=Math.min(j,St);for(Pt+p<0&&Mn(3);p<It;++p)e[p]=n[Pt+p]}for(;p<St;p+=4)e[p]=e[p-j],e[p+1]=e[p+1-j],e[p+2]=e[p+2-j],e[p+3]=e[p+3-j];p=St}}t.l=_,t.p=q,t.b=p,t.f=d,_&&(d=1,t.m=x,t.d=m,t.n=y)}while(!d);return p==e.length?e:L1(e,0,p)},R1=new En(0),I1=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&Mn(6,"invalid gzip data");var t=r[3],e=10;t&4&&(e+=(r[10]|r[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!r[e++]);return e+(t&2)},D1=function(r){var t=r.length;return(r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0},N1=function(r,t){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&Mn(6,"invalid zlib data"),(r[1]>>5&1)==1&&Mn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function O1(r,t){return Tc(r,{i:2},t,t)}function U1(r,t){var e=I1(r);return e+8>r.length&&Mn(6,"invalid gzip data"),Tc(r.subarray(e,-8),{i:2},new En(D1(r)),t)}function k1(r,t){return Tc(r.subarray(N1(r),-4),{i:2},t,t)}function rc(r,t){return r[0]==31&&r[1]==139&&r[2]==8?U1(r,t):(r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31?O1(r,t):k1(r,t)}var z1=typeof TextDecoder<"u"&&new TextDecoder,B1=0;try{z1.decode(R1,{stream:!0}),B1=1}catch{}var Lf=(r,t)=>r*Qr(2,t),Ls=(r,t)=>Math.floor(r/Qr(2,t)),da=(r,t)=>Lf(r.getUint16(t+1,!0),8)+r.getUint8(t),Pf=(r,t)=>Lf(r.getUint32(t+2,!0),16)+r.getUint16(t,!0),F1=(r,t,e,n,s)=>{if(r!==n.getUint8(s))return r-n.getUint8(s);const o=da(n,s+1);if(t!==o)return t-o;const l=da(n,s+4);return e!==l?e-l:0},H1=(r,t,e,n)=>{const s=Rf(r,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},hd=(r,t,e,n)=>{const s=Rf(r,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},Rf=(r,t,e,n)=>{let s=0,o=r.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=F1(t,e,n,r,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[Pf(r,l*17+7),r.getUint32(l*17+13,!0)]}return null},V1=(r,t)=>r.isDir&&!t.isDir?1:!r.isDir&&t.isDir?-1:r.z!==t.z?r.z-t.z:r.x!==t.x?r.x-t.x:r.y-t.y,If=(r,t)=>{const e=r.getUint8(t*17);return{z:e&127,x:da(r,t*17+1),y:da(r,t*17+4),offset:Pf(r,t*17+7),length:r.getUint32(t*17+13,!0),isDir:e>>7===1}},dd=r=>{const t=[],e=new DataView(r);for(let n=0;n<e.byteLength/17;n++)t.push(If(e,n));return G1(t)},G1=r=>{r.sort(V1);const t=new ArrayBuffer(17*r.length),e=new Uint8Array(t);for(let n=0;n<r.length;n++){const s=r[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=Ls(s.offset,8)&255,e[n*17+9]=Ls(s.offset,16)&255,e[n*17+10]=Ls(s.offset,24)&255,e[n*17+11]=Ls(s.offset,32)&255,e[n*17+12]=Ls(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},W1=(r,t)=>{if(r.byteLength<17)return null;const e=r.byteLength/17,n=If(r,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function Z1(r){return rn(this,null,function*(){const t=yield r.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let u=0;"minzoom"in l&&(u=+l.minzoom);let d=0;"maxzoom"in l&&(d=+l.maxzoom);let f=0,p=0,_=0,m=-180,x=-85,y=180,g=85;if(l.bounds){const S=l.bounds.split(",");m=+S[0],x=+S[1],y=+S[2],g=+S[3]}if(l.center){const S=l.center.split(",");f=+S[0],p=+S[1],_=+S[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:u,maxZoom:d,minLon:m,minLat:x,maxLon:y,maxLat:g,centerZoom:_,centerLon:f,centerLat:p,etag:t.etag}})}function X1(r,t,e,n,s,o,l){return rn(this,null,function*(){let c=yield e.getArrayBuffer(t,r.rootDirectoryOffset,r.rootDirectoryLength,r);r.specVersion===1&&(c=dd(c));const u=hd(new DataView(c),n,s,o);if(u){let p=(yield t.getBytes(u.offset,u.length,l)).data;const _=new DataView(p);return _.getUint8(0)===31&&_.getUint8(1)===139&&(p=rc(new Uint8Array(p))),{data:p}}const d=W1(new DataView(c),{z:n,x:s,y:o});if(d){const f=H1(new DataView(c),d.z,d.x,d.y);if(f){let p=yield e.getArrayBuffer(t,f.offset,f.length,r);r.specVersion===1&&(p=dd(p));const _=hd(new DataView(p),n,s,o);if(_){let x=(yield t.getBytes(_.offset,_.length,l)).data;const y=new DataView(x);return y.getUint8(0)===31&&y.getUint8(1)===139&&(x=rc(new Uint8Array(x))),{data:x}}}}})}var Df={getHeader:Z1,getZxy:X1};function Fr(r,t){return(t>>>0)*4294967296+(r>>>0)}function q1(r,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return Fr(r,s);throw new Error("Expected varint not more than 10 bytes")}function Ps(r){const t=r.buf;let e=t[r.pos++],n=e&127;return e<128||(e=t[r.pos++],n|=(e&127)<<7,e<128)||(e=t[r.pos++],n|=(e&127)<<14,e<128)||(e=t[r.pos++],n|=(e&127)<<21,e<128)?n:(e=t[r.pos],n|=(e&15)<<28,q1(n,r))}function j1(r,t,e,n){if(n===0){e===1&&(t[0]=r-1-t[0],t[1]=r-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var Y1=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function $1(r,t,e){if(r>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>Qr(2,r)-1||e>Qr(2,r)-1)throw Error("tile x/y outside zoom level bounds");const n=Y1[r],s=Qr(2,r);let o=0,l=0,c=0;const u=[t,e];let d=s/2;for(;d>0;)o=(u[0]&d)>0?1:0,l=(u[1]&d)>0?1:0,c+=d*d*(3*o^l),j1(d,u,o,l),d=d/2;return n+c}function Nf(r,t){return rn(this,null,function*(){if(t===1||t===0)return r;if(t===2){if(typeof globalThis.DecompressionStream>"u")return rc(new Uint8Array(r));const e=new Response(r).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function K1(r){return r===1?".mvt":r===2?".png":r===3?".jpg":r===4?".webp":r===5?".avif":""}var J1=127;function Q1(r,t){let e=0,n=r.length-1;for(;e<=n;){const s=n+e>>1,o=t-r[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return r[s]}return n>=0&&(r[n].runLength===0||t-r[n].tileId<r[n].runLength)?r[n]:null}var tb=class{constructor(r,t=new Headers){this.url=r,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(r){this.customHeaders=r}getBytes(r,t,e,n){return rn(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${r}-${r+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let u=yield fetch(this.url,{signal:o,cache:c,headers:l});if(r===0&&u.status===416){const _=u.headers.get("Content-Range");if(!_||!_.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const m=+_.substr(8);u=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${m-1}`}})}let d=u.headers.get("Etag");if(d?.startsWith("W/")&&(d=null),u.status===416||n&&d&&d!==n)throw this.mustReload=!0,new sc(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(u.status>=300)throw Error(`Bad response code: ${u.status}`);const f=u.headers.get("Content-Length");if(u.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield u.arrayBuffer(),etag:d||void 0,cacheControl:u.headers.get("Cache-Control")||void 0,expires:u.headers.get("Expires")||void 0}})}};function Vn(r,t){const e=r.getUint32(t+4,!0),n=r.getUint32(t+0,!0);return e*Qr(2,32)+n}function eb(r,t){const e=new DataView(r),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:Vn(e,8),rootDirectoryLength:Vn(e,16),jsonMetadataOffset:Vn(e,24),jsonMetadataLength:Vn(e,32),leafDirectoryOffset:Vn(e,40),leafDirectoryLength:Vn(e,48),tileDataOffset:Vn(e,56),tileDataLength:Vn(e,64),numAddressedTiles:Vn(e,72),numTileEntries:Vn(e,80),numTileContents:Vn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function Of(r){const t={buf:new Uint8Array(r),pos:0},e=Ps(t),n=[];let s=0;for(let o=0;o<e;o++){const l=Ps(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=Ps(t);for(let o=0;o<e;o++)n[o].length=Ps(t);for(let o=0;o<e;o++){const l=Ps(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function nb(r){const t=new DataView(r);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var sc=class extends Error{};function ib(r,t){return rn(this,null,function*(){const e=yield r.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(nb(e.data)<3)return[yield Df.getHeader(r)];const s=e.data.slice(0,J1),o=eb(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${r.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,u=Of(yield t(l,o.internalCompression));return[o,[c,u.length,u]]})}function rb(r,t,e,n,s){return rn(this,null,function*(){const o=yield r.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=Of(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var sb=class{constructor(r=100,t=!0,e=Nf){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=r,this.counter=1,this.decompress=e}getHeader(r){return rn(this,null,function*(){const t=r.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{ib(r,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(r,t,e,n){return rn(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{rb(r,this.decompress,t,e,n).then(d=>{c(d),this.prune()}).catch(d=>{u(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(r,t,e,n){return rn(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,u)=>{r.getBytes(t,e,void 0,n.etag).then(d=>{c(d.data),this.cache.has(s),this.prune()}).catch(d=>{u(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let r=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<r&&(r=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(r){return rn(this,null,function*(){const t=r.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(r.getKey());const e=new Promise((n,s)=>{this.getHeader(r).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},ob=class{constructor(r,t,e){typeof r=="string"?this.source=new tb(r):this.source=r,e?this.decompress=e:this.decompress=Nf,t?this.cache=t:this.cache=new sb}getHeader(){return rn(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(r,t,e,n){return rn(this,null,function*(){const s=$1(r,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return Df.getZxy(o,this.source,this.cache,r,t,e,n);if(r<o.minZoom||r>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let u=0;u<=3;u++){const d=yield this.cache.getDirectory(this.source,l,c,o),f=Q1(d,s);if(f){if(f.runLength>0){const p=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(p.data,o.tileCompression),cacheControl:p.cacheControl,expires:p.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(r,t,e,n){return rn(this,null,function*(){try{return yield this.getZxyAttempt(r,t,e,n)}catch(s){if(s instanceof sc)return this.cache.invalidate(this.source),yield this.getZxyAttempt(r,t,e,n);throw s}})}getMetadataAttempt(){return rn(this,null,function*(){const r=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(r.jsonMetadataOffset,r.jsonMetadataLength,void 0,r.etag),e=yield this.decompress(t.data,r.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return rn(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(r){if(r instanceof sc)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw r}})}getTileJson(r){return rn(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=K1(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${r}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const Hl=new Map;function ab(r){return Hl.has(r)||Hl.set(r,new ob(r)),Hl.get(r)}function lb(r,t){const e=[];let n=0;const s=new Uint8Array(r);function o(){let d=0,f=0;for(;n<s.length;){const p=s[n++];if(d|=(p&127)<<f,!(p&128))break;f+=7}return d}function l(){if(n>=s.length)return null;const d=o();return{field:d>>3,wire:d&7}}function c(d){if(d===0)o();else if(d===2){const f=o();n+=f}else d===5?n+=4:d===1&&(n+=8)}function u(){const d=o(),f=new Uint8Array(r,n,d);return n+=d,new TextDecoder().decode(f)}for(;n<s.length;){const d=l();if(!d)break;if(d.field===3&&d.wire===2){const f=o(),p=n+f;let _="";const m=[],x=[],y=[];for(;n<p;){const g=l();if(!g)break;if(g.field===1&&g.wire===2)_=u();else if(g.field===3&&g.wire===2)m.push(u());else if(g.field===4&&g.wire===2){const v=o(),S=n+v;for(;n<S;){const w=l();if(!w)break;if(w.wire===2){const E=o(),N=new Uint8Array(r,n,E);n+=E,x.push(new TextDecoder().decode(N))}else w.field===5&&w.wire===0?x.push(o()!==0):w.field===6&&w.wire===0||w.field===7&&w.wire===0?x.push(o()):c(w.wire)}}else if(g.field===5&&g.wire===0)o();else if(g.field===2&&g.wire===2){const v=o(),S=n+v;let w=0;const E=[],N=[];for(;n<S;){const U=l();if(!U)break;if(U.field===3&&U.wire===0)w=o();else if(U.field===2&&U.wire===2){const O=o(),F=n+O;for(;n<F;)E.push(o())}else if(U.field===4&&U.wire===2){const O=o(),F=n+O;for(;n<F;)N.push(o())}else c(U.wire)}y.push({type:w,tags:E,geom:N})}else c(g.wire)}if(n=p,t&&t!==_)continue;for(const g of y){const v={};for(let I=0;I<g.tags.length-1;I+=2)v[m[g.tags[I]]]=x[g.tags[I+1]]??null;const S=[];let w=0,E=0,N=[],U=0,O=0,F=0;for(;F<g.geom.length;){if(O===0){const I=g.geom[F++];U=I&7,O=I>>3}if(U===1||U===2){U===1&&N.length>=2&&(S.push(N),N=[]);const I=fd(g.geom[F++]),R=fd(g.geom[F++]);w+=I,E+=R,N.push({lat:E,lon:w}),O--}else U===7?(N.length>=2&&(S.push(N),N=[]),O--):(F++,O--)}N.length>=2&&S.push(N),e.push({layer:_,type:g.type,properties:v,rings:S})}}else c(d.wire)}return e}function fd(r){return r>>1^-(r&1)}function cb(r,t,e,n,s,o){const l=2**e,c=(r+n/o)/l,u=(t+s/o)/l,d=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*u)))*180/Math.PI,lon:d}}async function ub(r,t){const s=[{path:`${Br}/buildings.pmtiles`,z:14,name:"building"},{path:`${Br}/transportation.pmtiles`,z:14,name:"segment"},{path:`${Br}/base.pmtiles`,z:13,name:"water"},{path:`${Br}/base.pmtiles`,z:13,name:"land"},{path:`${Br}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${Br}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:u,name:d}of s){try{const f=ab(c),p=(y,g)=>{const v=2**u,S=Math.floor((g+180)/360*v),w=y*Math.PI/180,E=Math.floor((1-Math.log(Math.tan(w)+1/Math.cos(w))/Math.PI)/2*v);return{x:S,y:E}},_=p(r.maxLat,r.minLon),m=p(r.minLat,r.maxLon),x=[];for(let y=_.y;y<=m.y;y++)for(let g=_.x;g<=m.x;g++)x.push((async(v,S)=>{try{const w=await f.getZxy(u,v,S);if(!w)return;const E=lb(w.data,d);for(const N of E){for(const U of N.rings)for(const O of U){const F=cb(v,S,u,O.lon,O.lat,4096);O.lat=F.lat,O.lon=F.lon}o.push(N)}}catch{}})(g,y));await Promise.all(x)}catch{}l++,t(Math.round(l/s.length*100))}return o}function Uf(r="terrain3d.stl"){if(!bt.tg)return;const t=[];new K;const e=new K;if(bt.tg.traverse(m=>{if(!(m instanceof Ie))return;const x=m.geometry,y=x.attributes.position;if(!y)return;const g=x.index,v=m.matrixWorld;function S(w){const E=new K(y.getX(w),y.getY(w),y.getZ(w));return E.applyMatrix4(v),E}if(g)for(let w=0;w<g.count;w+=3)t.push([S(g.getX(w)),S(g.getX(w+1)),S(g.getX(w+2))]);else for(let w=0;w<y.count;w+=3)t.push([S(w),S(w+1),S(w+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let m=0;m<Math.min(l.length,80);m++)s.setUint8(m,l[m]);s.setUint32(80,t.length,!0);let c=84;const u=new K,d=new K;for(const[m,x,y]of t){u.subVectors(x,m),d.subVectors(y,m),e.crossVectors(u,d).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const g of[m,x,y])s.setFloat32(c,g.x,!0),c+=4,s.setFloat32(c,g.y,!0),c+=4,s.setFloat32(c,g.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=r,_.click(),URL.revokeObjectURL(p),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function Qo(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var kf={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(r,t){(function(e){r.exports=e()})(function(){return function e(n,s,o){function l(d,f){if(!s[d]){if(!n[d]){var p=typeof Qo=="function"&&Qo;if(!f&&p)return p(d,!0);if(c)return c(d,!0);var _=new Error("Cannot find module '"+d+"'");throw _.code="MODULE_NOT_FOUND",_}var m=s[d]={exports:{}};n[d][0].call(m.exports,function(x){var y=n[d][1][x];return l(y||x)},m,m.exports,e,n,s,o)}return s[d].exports}for(var c=typeof Qo=="function"&&Qo,u=0;u<o.length;u++)l(o[u]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(u){for(var d,f,p,_,m,x,y,g=[],v=0,S=u.length,w=S,E=o.getTypeOf(u)!=="string";v<u.length;)w=S-v,p=E?(d=u[v++],f=v<S?u[v++]:0,v<S?u[v++]:0):(d=u.charCodeAt(v++),f=v<S?u.charCodeAt(v++):0,v<S?u.charCodeAt(v++):0),_=d>>2,m=(3&d)<<4|f>>4,x=1<w?(15&f)<<2|p>>6:64,y=2<w?63&p:64,g.push(c.charAt(_)+c.charAt(m)+c.charAt(x)+c.charAt(y));return g.join("")},s.decode=function(u){var d,f,p,_,m,x,y=0,g=0,v="data:";if(u.substr(0,v.length)===v)throw new Error("Invalid base64 input, it looks like a data url.");var S,w=3*(u=u.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(u.charAt(u.length-1)===c.charAt(64)&&w--,u.charAt(u.length-2)===c.charAt(64)&&w--,w%1!=0)throw new Error("Invalid base64 input, bad content length.");for(S=l.uint8array?new Uint8Array(0|w):new Array(0|w);y<u.length;)d=c.indexOf(u.charAt(y++))<<2|(_=c.indexOf(u.charAt(y++)))>>4,f=(15&_)<<4|(m=c.indexOf(u.charAt(y++)))>>2,p=(3&m)<<6|(x=c.indexOf(u.charAt(y++))),S[g++]=d,m!==64&&(S[g++]=f),x!==64&&(S[g++]=p);return S}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),u=e("./stream/DataLengthProbe");function d(f,p,_,m,x){this.compressedSize=f,this.uncompressedSize=p,this.crc32=_,this.compression=m,this.compressedContent=x}d.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new u("data_length")),p=this;return f.on("end",function(){if(this.streamInfo.data_length!==p.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(f,p,_){return f.pipe(new c).pipe(new u("uncompressedSize")).pipe(p.compressWorker(_)).pipe(new u("compressedSize")).withStreamInfo("compression",p)},n.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,u=[],d=0;d<256;d++){c=d;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;u[d]=c}return u}();n.exports=function(c,u){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(d,f,p,_){var m=l,x=_+p;d^=-1;for(var y=_;y<x;y++)d=d>>>8^m[255&(d^f[y])];return-1^d}(0|u,c,c.length,0):function(d,f,p,_){var m=l,x=_+p;d^=-1;for(var y=_;y<x;y++)d=d>>>8^m[255&(d^f.charCodeAt(y))];return-1^d}(0|u,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),u=e("./stream/GenericWorker"),d=o?"uint8array":"array";function f(p,_){u.call(this,"FlateWorker/"+p),this._pako=null,this._pakoAction=p,this._pakoOptions=_,this.meta={}}s.magic="\b\0",c.inherits(f,u),f.prototype.processChunk=function(p){this.meta=p.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(d,p.data),!1)},f.prototype.flush=function(){u.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){u.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var p=this;this._pako.onData=function(_){p.push({data:_,meta:p.meta})}},s.compressWorker=function(p){return new f("Deflate",p)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(m,x){var y,g="";for(y=0;y<x;y++)g+=String.fromCharCode(255&m),m>>>=8;return g}function l(m,x,y,g,v,S){var w,E,N=m.file,U=m.compression,O=S!==d.utf8encode,F=c.transformTo("string",S(N.name)),I=c.transformTo("string",d.utf8encode(N.name)),R=N.comment,W=c.transformTo("string",S(R)),k=c.transformTo("string",d.utf8encode(R)),H=I.length!==N.name.length,P=k.length!==R.length,Z="",nt="",ot="",j=N.dir,rt=N.date,at={crc32:0,compressedSize:0,uncompressedSize:0};x&&!y||(at.crc32=m.crc32,at.compressedSize=m.compressedSize,at.uncompressedSize=m.uncompressedSize);var q=0;x&&(q|=8),O||!H&&!P||(q|=2048);var tt=0,Lt=0;j&&(tt|=16),v==="UNIX"?(Lt=798,tt|=function(it,wt){var St=it;return it||(St=wt?16893:33204),(65535&St)<<16}(N.unixPermissions,j)):(Lt=20,tt|=function(it){return 63&(it||0)}(N.dosPermissions)),w=rt.getUTCHours(),w<<=6,w|=rt.getUTCMinutes(),w<<=5,w|=rt.getUTCSeconds()/2,E=rt.getUTCFullYear()-1980,E<<=4,E|=rt.getUTCMonth()+1,E<<=5,E|=rt.getUTCDate(),H&&(nt=o(1,1)+o(f(F),4)+I,Z+="up"+o(nt.length,2)+nt),P&&(ot=o(1,1)+o(f(W),4)+k,Z+="uc"+o(ot.length,2)+ot);var Q="";return Q+=`
\0`,Q+=o(q,2),Q+=U.magic,Q+=o(w,2),Q+=o(E,2),Q+=o(at.crc32,4),Q+=o(at.compressedSize,4),Q+=o(at.uncompressedSize,4),Q+=o(F.length,2),Q+=o(Z.length,2),{fileRecord:p.LOCAL_FILE_HEADER+Q+F+Z,dirRecord:p.CENTRAL_FILE_HEADER+o(Lt,2)+Q+o(W.length,2)+"\0\0\0\0"+o(tt,4)+o(g,4)+F+Z+W}}var c=e("../utils"),u=e("../stream/GenericWorker"),d=e("../utf8"),f=e("../crc32"),p=e("../signature");function _(m,x,y,g){u.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=x,this.zipPlatform=y,this.encodeFileName=g,this.streamFiles=m,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(_,u),_.prototype.push=function(m){var x=m.meta.percent||0,y=this.entriesCount,g=this._sources.length;this.accumulate?this.contentBuffer.push(m):(this.bytesWritten+=m.data.length,u.prototype.push.call(this,{data:m.data,meta:{currentFile:this.currentFile,percent:y?(x+100*(y-g-1))/y:100}}))},_.prototype.openedSource=function(m){this.currentSourceOffset=this.bytesWritten,this.currentFile=m.file.name;var x=this.streamFiles&&!m.file.dir;if(x){var y=l(m,x,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},_.prototype.closedSource=function(m){this.accumulate=!1;var x=this.streamFiles&&!m.file.dir,y=l(m,x,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),x)this.push({data:function(g){return p.DATA_DESCRIPTOR+o(g.crc32,4)+o(g.compressedSize,4)+o(g.uncompressedSize,4)}(m),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},_.prototype.flush=function(){for(var m=this.bytesWritten,x=0;x<this.dirRecords.length;x++)this.push({data:this.dirRecords[x],meta:{percent:100}});var y=this.bytesWritten-m,g=function(v,S,w,E,N){var U=c.transformTo("string",N(E));return p.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(v,2)+o(v,2)+o(S,4)+o(w,4)+o(U.length,2)+U}(this.dirRecords.length,y,m,this.zipComment,this.encodeFileName);this.push({data:g,meta:{percent:100}})},_.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},_.prototype.registerPrevious=function(m){this._sources.push(m);var x=this;return m.on("data",function(y){x.processChunk(y)}),m.on("end",function(){x.closedSource(x.previous.streamInfo),x._sources.length?x.prepareNextSource():x.end()}),m.on("error",function(y){x.error(y)}),this},_.prototype.resume=function(){return!!u.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},_.prototype.error=function(m){var x=this._sources;if(!u.prototype.error.call(this,m))return!1;for(var y=0;y<x.length;y++)try{x[y].error(m)}catch{}return!0},_.prototype.lock=function(){u.prototype.lock.call(this);for(var m=this._sources,x=0;x<m.length;x++)m[x].lock()},n.exports=_},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,u,d){var f=new l(u.streamFiles,d,u.platform,u.encodeFileName),p=0;try{c.forEach(function(_,m){p++;var x=function(S,w){var E=S||w,N=o[E];if(!N)throw new Error(E+" is not a valid compression method !");return N}(m.options.compression,u.compression),y=m.options.compressionOptions||u.compressionOptions||{},g=m.dir,v=m.date;m._compressWorker(x,y).withStreamInfo("file",{name:_,dir:g,date:v,comment:m.comment||"",unixPermissions:m.unixPermissions,dosPermissions:m.dosPermissions}).pipe(f)}),f.entriesCount=p}catch(_){f.error(_)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),u=e("./zipEntries"),d=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function p(_){return new l.Promise(function(m,x){var y=_.decompressed.getContentWorker().pipe(new d);y.on("error",function(g){x(g)}).on("end",function(){y.streamInfo.crc32!==_.decompressed.crc32?x(new Error("Corrupted zip : CRC32 mismatch")):m()}).resume()})}n.exports=function(_,m){var x=this;return m=o.extend(m||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(_)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",_,!0,m.optimizedBinaryString,m.base64).then(function(y){var g=new u(m);return g.load(y),g}).then(function(y){var g=[l.Promise.resolve(y)],v=y.files;if(m.checkCRC32)for(var S=0;S<v.length;S++)g.push(p(v[S]));return l.Promise.all(g)}).then(function(y){for(var g=y.shift(),v=g.files,S=0;S<v.length;S++){var w=v[S],E=w.fileNameStr,N=o.resolve(w.fileNameStr);x.file(N,w.decompressed,{binary:!0,optimizedBinaryString:!0,date:w.date,dir:w.dir,comment:w.fileCommentStr.length?w.fileCommentStr:null,unixPermissions:w.unixPermissions,dosPermissions:w.dosPermissions,createFolders:m.createFolders}),w.dir||(x.file(N).unsafeOriginalName=E)}return g.zipComment.length&&(x.comment=g.zipComment),x})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(u,d){l.call(this,"Nodejs stream input adapter for "+u),this._upstreamEnded=!1,this._bindStream(d)}o.inherits(c,l),c.prototype._bindStream=function(u){var d=this;(this._stream=u).pause(),u.on("data",function(f){d.push({data:f,meta:{percent:0}})}).on("error",function(f){d.isPaused?this.generatedError=f:d.error(f)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,u,d){o.call(this,u),this._helper=c;var f=this;c.on("data",function(p,_){f.push(p)||f._helper.pause(),d&&d(_)}).on("error",function(p){f.emit("error",p)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(N,U,O){var F,I=c.getTypeOf(U),R=c.extend(O||{},f);R.date=R.date||new Date,R.compression!==null&&(R.compression=R.compression.toUpperCase()),typeof R.unixPermissions=="string"&&(R.unixPermissions=parseInt(R.unixPermissions,8)),R.unixPermissions&&16384&R.unixPermissions&&(R.dir=!0),R.dosPermissions&&16&R.dosPermissions&&(R.dir=!0),R.dir&&(N=v(N)),R.createFolders&&(F=g(N))&&S.call(this,F,!0);var W=I==="string"&&R.binary===!1&&R.base64===!1;O&&O.binary!==void 0||(R.binary=!W),(U instanceof p&&U.uncompressedSize===0||R.dir||!U||U.length===0)&&(R.base64=!1,R.binary=!0,U="",R.compression="STORE",I="string");var k=null;k=U instanceof p||U instanceof u?U:x.isNode&&x.isStream(U)?new y(N,U):c.prepareContent(N,U,R.binary,R.optimizedBinaryString,R.base64);var H=new _(N,k,R);this.files[N]=H}var l=e("./utf8"),c=e("./utils"),u=e("./stream/GenericWorker"),d=e("./stream/StreamHelper"),f=e("./defaults"),p=e("./compressedObject"),_=e("./zipObject"),m=e("./generate"),x=e("./nodejsUtils"),y=e("./nodejs/NodejsStreamInputAdapter"),g=function(N){N.slice(-1)==="/"&&(N=N.substring(0,N.length-1));var U=N.lastIndexOf("/");return 0<U?N.substring(0,U):""},v=function(N){return N.slice(-1)!=="/"&&(N+="/"),N},S=function(N,U){return U=U!==void 0?U:f.createFolders,N=v(N),this.files[N]||o.call(this,N,null,{dir:!0,createFolders:U}),this.files[N]};function w(N){return Object.prototype.toString.call(N)==="[object RegExp]"}var E={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(N){var U,O,F;for(U in this.files)F=this.files[U],(O=U.slice(this.root.length,U.length))&&U.slice(0,this.root.length)===this.root&&N(O,F)},filter:function(N){var U=[];return this.forEach(function(O,F){N(O,F)&&U.push(F)}),U},file:function(N,U,O){if(arguments.length!==1)return N=this.root+N,o.call(this,N,U,O),this;if(w(N)){var F=N;return this.filter(function(R,W){return!W.dir&&F.test(R)})}var I=this.files[this.root+N];return I&&!I.dir?I:null},folder:function(N){if(!N)return this;if(w(N))return this.filter(function(I,R){return R.dir&&N.test(I)});var U=this.root+N,O=S.call(this,U),F=this.clone();return F.root=O.name,F},remove:function(N){N=this.root+N;var U=this.files[N];if(U||(N.slice(-1)!=="/"&&(N+="/"),U=this.files[N]),U&&!U.dir)delete this.files[N];else for(var O=this.filter(function(I,R){return R.name.slice(0,N.length)===N}),F=0;F<O.length;F++)delete this.files[O[F].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(N){var U,O={};try{if((O=c.extend(N||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=O.type.toLowerCase(),O.compression=O.compression.toUpperCase(),O.type==="binarystring"&&(O.type="string"),!O.type)throw new Error("No output type specified.");c.checkSupport(O.type),O.platform!=="darwin"&&O.platform!=="freebsd"&&O.platform!=="linux"&&O.platform!=="sunos"||(O.platform="UNIX"),O.platform==="win32"&&(O.platform="DOS");var F=O.comment||this.comment||"";U=m.generateWorker(this,O,F)}catch(I){(U=new u("error")).error(I)}return new d(U,O.type||"string",O.mimeType)},generateAsync:function(N,U){return this.generateInternalStream(N).accumulate(U)},generateNodeStream:function(N,U){return(N=N||{}).type||(N.type="nodebuffer"),this.generateInternalStream(N).toNodejsStream(U)}};n.exports=E},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var u=0;u<this.data.length;u++)c[u]=255&c[u]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var u=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.length-4;0<=_;--_)if(this.data[_]===u&&this.data[_+1]===d&&this.data[_+2]===f&&this.data[_+3]===p)return _-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var u=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),p=c.charCodeAt(3),_=this.readData(4);return u===_[0]&&d===_[1]&&f===_[2]&&p===_[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var u,d=0;for(this.checkOffset(c),u=this.index+c-1;u>=this.index;u--)d=(d<<8)+this.byteAt(u);return this.index+=c,d},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var u=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var u=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,u},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),u=e("./StringReader"),d=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(p){var _=o.getTypeOf(p);return o.checkSupport(_),_!=="string"||l.uint8array?_==="nodebuffer"?new d(p):l.uint8array?new f(o.transformTo("uint8array",p)):new c(o.transformTo("array",p)):new u(p)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(u){o.call(this,"ConvertWorker to "+u),this.destType=u}l.inherits(c,o),c.prototype.processChunk=function(u){this.push({data:l.transformTo(this.destType,u.data),meta:u.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(u){this.streamInfo.crc32=l(u.data,this.streamInfo.crc32||0),this.push(u)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataLengthProbe for "+u),this.propName=u,this.withStreamInfo(u,0)}o.inherits(c,l),c.prototype.processChunk=function(u){if(u){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+u.data.length}l.prototype.processChunk.call(this,u)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(u){l.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,u.then(function(f){d.dataIsReady=!0,d.data=f,d.max=f&&f.length||0,d.type=o.getTypeOf(f),d.isPaused||d._tickAndRepeat()},function(f){d.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var u=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":u=this.data.substring(this.index,d);break;case"uint8array":u=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":u=this.data.slice(this.index,d)}return this.index=d,this.push({data:u,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var u=0;u<this._listeners[l].length;u++)this._listeners[l][u].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(u){c.processChunk(u)}),l.on("end",function(){c.end()}),l.on("error",function(u){c.error(u)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),u=e("../base64"),d=e("../support"),f=e("../external"),p=null;if(d.nodestream)try{p=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function _(x,y){return new f.Promise(function(g,v){var S=[],w=x._internalType,E=x._outputType,N=x._mimeType;x.on("data",function(U,O){S.push(U),y&&y(O)}).on("error",function(U){S=[],v(U)}).on("end",function(){try{var U=function(O,F,I){switch(O){case"blob":return o.newBlob(o.transformTo("arraybuffer",F),I);case"base64":return u.encode(F);default:return o.transformTo(O,F)}}(E,function(O,F){var I,R=0,W=null,k=0;for(I=0;I<F.length;I++)k+=F[I].length;switch(O){case"string":return F.join("");case"array":return Array.prototype.concat.apply([],F);case"uint8array":for(W=new Uint8Array(k),I=0;I<F.length;I++)W.set(F[I],R),R+=F[I].length;return W;case"nodebuffer":return Buffer.concat(F);default:throw new Error("concat : unsupported type '"+O+"'")}}(w,S),N);g(U)}catch(O){v(O)}S=[]}).resume()})}function m(x,y,g){var v=y;switch(y){case"blob":case"arraybuffer":v="uint8array";break;case"base64":v="string"}try{this._internalType=v,this._outputType=y,this._mimeType=g,o.checkSupport(v),this._worker=x.pipe(new l(v)),x.lock()}catch(S){this._worker=new c("error"),this._worker.error(S)}}m.prototype={accumulate:function(x){return _(this,x)},on:function(x,y){var g=this;return x==="data"?this._worker.on(x,function(v){y.call(g,v.data,v.meta)}):this._worker.on(x,function(){o.delay(y,arguments,g)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(x){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new p(this,{objectMode:this._outputType!=="nodebuffer"},x)}},n.exports=m},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),u=e("./stream/GenericWorker"),d=new Array(256),f=0;f<256;f++)d[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;d[254]=d[254]=1;function p(){u.call(this,"utf-8 decode"),this.leftOver=null}function _(){u.call(this,"utf-8 encode")}s.utf8encode=function(m){return l.nodebuffer?c.newBufferFrom(m,"utf-8"):function(x){var y,g,v,S,w,E=x.length,N=0;for(S=0;S<E;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<E&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),N+=g<128?1:g<2048?2:g<65536?3:4;for(y=l.uint8array?new Uint8Array(N):new Array(N),S=w=0;w<N;S++)(64512&(g=x.charCodeAt(S)))==55296&&S+1<E&&(64512&(v=x.charCodeAt(S+1)))==56320&&(g=65536+(g-55296<<10)+(v-56320),S++),g<128?y[w++]=g:(g<2048?y[w++]=192|g>>>6:(g<65536?y[w++]=224|g>>>12:(y[w++]=240|g>>>18,y[w++]=128|g>>>12&63),y[w++]=128|g>>>6&63),y[w++]=128|63&g);return y}(m)},s.utf8decode=function(m){return l.nodebuffer?o.transformTo("nodebuffer",m).toString("utf-8"):function(x){var y,g,v,S,w=x.length,E=new Array(2*w);for(y=g=0;y<w;)if((v=x[y++])<128)E[g++]=v;else if(4<(S=d[v]))E[g++]=65533,y+=S-1;else{for(v&=S===2?31:S===3?15:7;1<S&&y<w;)v=v<<6|63&x[y++],S--;1<S?E[g++]=65533:v<65536?E[g++]=v:(v-=65536,E[g++]=55296|v>>10&1023,E[g++]=56320|1023&v)}return E.length!==g&&(E.subarray?E=E.subarray(0,g):E.length=g),o.applyFromCharCode(E)}(m=o.transformTo(l.uint8array?"uint8array":"array",m))},o.inherits(p,u),p.prototype.processChunk=function(m){var x=o.transformTo(l.uint8array?"uint8array":"array",m.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var y=x;(x=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),x.set(y,this.leftOver.length)}else x=this.leftOver.concat(x);this.leftOver=null}var g=function(S,w){var E;for((w=w||S.length)>S.length&&(w=S.length),E=w-1;0<=E&&(192&S[E])==128;)E--;return E<0||E===0?w:E+d[S[E]]>w?E:w}(x),v=x;g!==x.length&&(l.uint8array?(v=x.subarray(0,g),this.leftOver=x.subarray(g,x.length)):(v=x.slice(0,g),this.leftOver=x.slice(g,x.length))),this.push({data:s.utf8decode(v),meta:m.meta})},p.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=p,o.inherits(_,u),_.prototype.processChunk=function(m){this.push({data:s.utf8encode(m.data),meta:m.meta})},s.Utf8EncodeWorker=_},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),u=e("./external");function d(y){return y}function f(y,g){for(var v=0;v<y.length;++v)g[v]=255&y.charCodeAt(v);return g}e("setimmediate"),s.newBlob=function(y,g){s.checkSupport("blob");try{return new Blob([y],{type:g})}catch{try{var v=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return v.append(y),v.getBlob(g)}catch{throw new Error("Bug : can't construct the Blob.")}}};var p={stringifyByChunk:function(y,g,v){var S=[],w=0,E=y.length;if(E<=v)return String.fromCharCode.apply(null,y);for(;w<E;)g==="array"||g==="nodebuffer"?S.push(String.fromCharCode.apply(null,y.slice(w,Math.min(w+v,E)))):S.push(String.fromCharCode.apply(null,y.subarray(w,Math.min(w+v,E)))),w+=v;return S.join("")},stringifyByChar:function(y){for(var g="",v=0;v<y.length;v++)g+=String.fromCharCode(y[v]);return g},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function _(y){var g=65536,v=s.getTypeOf(y),S=!0;if(v==="uint8array"?S=p.applyCanBeUsed.uint8array:v==="nodebuffer"&&(S=p.applyCanBeUsed.nodebuffer),S)for(;1<g;)try{return p.stringifyByChunk(y,v,g)}catch{g=Math.floor(g/2)}return p.stringifyByChar(y)}function m(y,g){for(var v=0;v<y.length;v++)g[v]=y[v];return g}s.applyFromCharCode=_;var x={};x.string={string:d,array:function(y){return f(y,new Array(y.length))},arraybuffer:function(y){return x.string.uint8array(y).buffer},uint8array:function(y){return f(y,new Uint8Array(y.length))},nodebuffer:function(y){return f(y,c.allocBuffer(y.length))}},x.array={string:_,array:d,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},x.arraybuffer={string:function(y){return _(new Uint8Array(y))},array:function(y){return m(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:d,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},x.uint8array={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:d,nodebuffer:function(y){return c.newBufferFrom(y)}},x.nodebuffer={string:_,array:function(y){return m(y,new Array(y.length))},arraybuffer:function(y){return x.nodebuffer.uint8array(y).buffer},uint8array:function(y){return m(y,new Uint8Array(y.length))},nodebuffer:d},s.transformTo=function(y,g){if(g=g||"",!y)return g;s.checkSupport(y);var v=s.getTypeOf(g);return x[v][y](g)},s.resolve=function(y){for(var g=y.split("/"),v=[],S=0;S<g.length;S++){var w=g[S];w==="."||w===""&&S!==0&&S!==g.length-1||(w===".."?v.pop():v.push(w))}return v.join("/")},s.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(y)?"nodebuffer":o.uint8array&&y instanceof Uint8Array?"uint8array":o.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(y){if(!o[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(y){var g,v,S="";for(v=0;v<(y||"").length;v++)S+="\\x"+((g=y.charCodeAt(v))<16?"0":"")+g.toString(16).toUpperCase();return S},s.delay=function(y,g,v){setImmediate(function(){y.apply(v||null,g||[])})},s.inherits=function(y,g){function v(){}v.prototype=g.prototype,y.prototype=new v},s.extend=function(){var y,g,v={};for(y=0;y<arguments.length;y++)for(g in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],g)&&v[g]===void 0&&(v[g]=arguments[y][g]);return v},s.prepareContent=function(y,g,v,S,w){return u.Promise.resolve(g).then(function(E){return o.blob&&(E instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(E))!==-1)&&typeof FileReader<"u"?new u.Promise(function(N,U){var O=new FileReader;O.onload=function(F){N(F.target.result)},O.onerror=function(F){U(F.target.error)},O.readAsArrayBuffer(E)}):E}).then(function(E){var N=s.getTypeOf(E);return N?(N==="arraybuffer"?E=s.transformTo("uint8array",E):N==="string"&&(w?E=l.decode(E):v&&S!==!0&&(E=function(U){return f(U,o.uint8array?new Uint8Array(U.length):new Array(U.length))}(E))),E):u.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),u=e("./zipEntry"),d=e("./support");function f(p){this.files=[],this.loadOptions=p}f.prototype={checkSignature:function(p){if(!this.reader.readAndCheckSignature(p)){this.reader.index-=4;var _=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(_)+", expected "+l.pretty(p)+")")}},isSignature:function(p,_){var m=this.reader.index;this.reader.setIndex(p);var x=this.reader.readString(4)===_;return this.reader.setIndex(m),x},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var p=this.reader.readData(this.zipCommentLength),_=d.uint8array?"uint8array":"array",m=l.transformTo(_,p);this.zipComment=this.loadOptions.decodeFileName(m)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var p,_,m,x=this.zip64EndOfCentralSize-44;0<x;)p=this.reader.readInt(2),_=this.reader.readInt(4),m=this.reader.readData(_),this.zip64ExtensibleData[p]={id:p,length:_,value:m}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var p,_;for(p=0;p<this.files.length;p++)_=this.files[p],this.reader.setIndex(_.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),_.readLocalPart(this.reader),_.handleUTF8(),_.processAttributes()},readCentralDir:function(){var p;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(p=new u({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(p);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var p=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(p<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(p);var _=p;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(p=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(p),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var m=this.centralDirOffset+this.centralDirSize;this.zip64&&(m+=20,m+=12+this.zip64EndOfCentralSize);var x=_-m;if(0<x)this.isSignature(_,c.CENTRAL_FILE_HEADER)||(this.reader.zero=x);else if(x<0)throw new Error("Corrupted zip: missing "+Math.abs(x)+" bytes.")},prepareReader:function(p){this.reader=o(p)},load:function(p){this.prepareReader(p),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),u=e("./crc32"),d=e("./utf8"),f=e("./compressions"),p=e("./support");function _(m,x){this.options=m,this.loadOptions=x}_.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(m){var x,y;if(m.skip(22),this.fileNameLength=m.readInt(2),y=m.readInt(2),this.fileName=m.readData(this.fileNameLength),m.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((x=function(g){for(var v in f)if(Object.prototype.hasOwnProperty.call(f,v)&&f[v].magic===g)return f[v];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,x,m.readData(this.compressedSize))},readCentralPart:function(m){this.versionMadeBy=m.readInt(2),m.skip(2),this.bitFlag=m.readInt(2),this.compressionMethod=m.readString(2),this.date=m.readDate(),this.crc32=m.readInt(4),this.compressedSize=m.readInt(4),this.uncompressedSize=m.readInt(4);var x=m.readInt(2);if(this.extraFieldsLength=m.readInt(2),this.fileCommentLength=m.readInt(2),this.diskNumberStart=m.readInt(2),this.internalFileAttributes=m.readInt(2),this.externalFileAttributes=m.readInt(4),this.localHeaderOffset=m.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");m.skip(x),this.readExtraFields(m),this.parseZIP64ExtraField(m),this.fileComment=m.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var m=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),m==0&&(this.dosPermissions=63&this.externalFileAttributes),m==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var m=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=m.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=m.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=m.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=m.readInt(4))}},readExtraFields:function(m){var x,y,g,v=m.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});m.index+4<v;)x=m.readInt(2),y=m.readInt(2),g=m.readData(y),this.extraFields[x]={id:x,length:y,value:g};m.setIndex(v)},handleUTF8:function(){var m=p.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var x=this.findExtraFieldUnicodePath();if(x!==null)this.fileNameStr=x;else{var y=l.transformTo(m,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var g=this.findExtraFieldUnicodeComment();if(g!==null)this.fileCommentStr=g;else{var v=l.transformTo(m,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(v)}}},findExtraFieldUnicodePath:function(){var m=this.extraFields[28789];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileName)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null},findExtraFieldUnicodeComment:function(){var m=this.extraFields[25461];if(m){var x=o(m.value);return x.readInt(1)!==1||u(this.fileComment)!==x.readInt(4)?null:d.utf8decode(x.readData(m.length-5))}return null}},n.exports=_},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(x,y,g){this.name=x,this.dir=g.dir,this.date=g.date,this.comment=g.comment,this.unixPermissions=g.unixPermissions,this.dosPermissions=g.dosPermissions,this._data=y,this._dataBinary=g.binary,this.options={compression:g.compression,compressionOptions:g.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),u=e("./utf8"),d=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(x){var y=null,g="string";try{if(!x)throw new Error("No output type specified.");var v=(g=x.toLowerCase())==="string"||g==="text";g!=="binarystring"&&g!=="text"||(g="string"),y=this._decompressWorker();var S=!this._dataBinary;S&&!v&&(y=y.pipe(new u.Utf8EncodeWorker)),!S&&v&&(y=y.pipe(new u.Utf8DecodeWorker))}catch(w){(y=new f("error")).error(w)}return new l(y,g,"")},async:function(x,y){return this.internalStream(x).accumulate(y)},nodeStream:function(x,y){return this.internalStream(x||"nodebuffer").toNodejsStream(y)},_compressWorker:function(x,y){if(this._data instanceof d&&this._data.compression.magic===x.magic)return this._data.getCompressedWorker();var g=this._decompressWorker();return this._dataBinary||(g=g.pipe(new u.Utf8EncodeWorker)),d.createWorkerFrom(g,x,y)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var p=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],_=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},m=0;m<p.length;m++)o.prototype[p[m]]=_;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,u=o.MutationObserver||o.WebKitMutationObserver;if(u){var d=0,f=new u(x),p=o.document.createTextNode("");f.observe(p,{characterData:!0}),l=function(){p.data=d=++d%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var y=o.document.createElement("script");y.onreadystatechange=function(){x(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},o.document.documentElement.appendChild(y)}:function(){setTimeout(x,0)};else{var _=new o.MessageChannel;_.port1.onmessage=x,l=function(){_.port2.postMessage(0)}}var m=[];function x(){var y,g;c=!0;for(var v=m.length;v;){for(g=m,m=[],y=-1;++y<v;)g[y]();v=m.length}c=!1}n.exports=function(y){m.push(y)!==1||c||l()}}).call(this,typeof Is<"u"?Is:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},u=["REJECTED"],d=["FULFILLED"],f=["PENDING"];function p(v){if(typeof v!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,v!==l&&y(this,v)}function _(v,S,w){this.promise=v,typeof S=="function"&&(this.onFulfilled=S,this.callFulfilled=this.otherCallFulfilled),typeof w=="function"&&(this.onRejected=w,this.callRejected=this.otherCallRejected)}function m(v,S,w){o(function(){var E;try{E=S(w)}catch(N){return c.reject(v,N)}E===v?c.reject(v,new TypeError("Cannot resolve promise with itself")):c.resolve(v,E)})}function x(v){var S=v&&v.then;if(v&&(typeof v=="object"||typeof v=="function")&&typeof S=="function")return function(){S.apply(v,arguments)}}function y(v,S){var w=!1;function E(O){w||(w=!0,c.reject(v,O))}function N(O){w||(w=!0,c.resolve(v,O))}var U=g(function(){S(N,E)});U.status==="error"&&E(U.value)}function g(v,S){var w={};try{w.value=v(S),w.status="success"}catch(E){w.status="error",w.value=E}return w}(n.exports=p).prototype.finally=function(v){if(typeof v!="function")return this;var S=this.constructor;return this.then(function(w){return S.resolve(v()).then(function(){return w})},function(w){return S.resolve(v()).then(function(){throw w})})},p.prototype.catch=function(v){return this.then(null,v)},p.prototype.then=function(v,S){if(typeof v!="function"&&this.state===d||typeof S!="function"&&this.state===u)return this;var w=new this.constructor(l);return this.state!==f?m(w,this.state===d?v:S,this.outcome):this.queue.push(new _(w,v,S)),w},_.prototype.callFulfilled=function(v){c.resolve(this.promise,v)},_.prototype.otherCallFulfilled=function(v){m(this.promise,this.onFulfilled,v)},_.prototype.callRejected=function(v){c.reject(this.promise,v)},_.prototype.otherCallRejected=function(v){m(this.promise,this.onRejected,v)},c.resolve=function(v,S){var w=g(x,S);if(w.status==="error")return c.reject(v,w.value);var E=w.value;if(E)y(v,E);else{v.state=d,v.outcome=S;for(var N=-1,U=v.queue.length;++N<U;)v.queue[N].callFulfilled(S)}return v},c.reject=function(v,S){v.state=u,v.outcome=S;for(var w=-1,E=v.queue.length;++w<E;)v.queue[w].callRejected(S);return v},p.resolve=function(v){return v instanceof this?v:c.resolve(new this(l),v)},p.reject=function(v){var S=new this(l);return c.reject(S,v)},p.all=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,E=!1;if(!w)return this.resolve([]);for(var N=new Array(w),U=0,O=-1,F=new this(l);++O<w;)I(v[O],O);return F;function I(R,W){S.resolve(R).then(function(k){N[W]=k,++U!==w||E||(E=!0,c.resolve(F,N))},function(k){E||(E=!0,c.reject(F,k))})}},p.race=function(v){var S=this;if(Object.prototype.toString.call(v)!=="[object Array]")return this.reject(new TypeError("must be an array"));var w=v.length,E=!1;if(!w)return this.resolve([]);for(var N=-1,U=new this(l);++N<w;)O=v[N],S.resolve(O).then(function(F){E||(E=!0,c.resolve(U,F))},function(F){E||(E=!0,c.reject(U,F))});var O;return U}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/messages"),d=e("./zlib/zstream"),f=Object.prototype.toString,p=0,_=-1,m=0,x=8;function y(v){if(!(this instanceof y))return new y(v);this.options=l.assign({level:_,method:x,chunkSize:16384,windowBits:15,memLevel:8,strategy:m,to:""},v||{});var S=this.options;S.raw&&0<S.windowBits?S.windowBits=-S.windowBits:S.gzip&&0<S.windowBits&&S.windowBits<16&&(S.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var w=o.deflateInit2(this.strm,S.level,S.method,S.windowBits,S.memLevel,S.strategy);if(w!==p)throw new Error(u[w]);if(S.header&&o.deflateSetHeader(this.strm,S.header),S.dictionary){var E;if(E=typeof S.dictionary=="string"?c.string2buf(S.dictionary):f.call(S.dictionary)==="[object ArrayBuffer]"?new Uint8Array(S.dictionary):S.dictionary,(w=o.deflateSetDictionary(this.strm,E))!==p)throw new Error(u[w]);this._dict_set=!0}}function g(v,S){var w=new y(S);if(w.push(v,!0),w.err)throw w.msg||u[w.err];return w.result}y.prototype.push=function(v,S){var w,E,N=this.strm,U=this.options.chunkSize;if(this.ended)return!1;E=S===~~S?S:S===!0?4:0,typeof v=="string"?N.input=c.string2buf(v):f.call(v)==="[object ArrayBuffer]"?N.input=new Uint8Array(v):N.input=v,N.next_in=0,N.avail_in=N.input.length;do{if(N.avail_out===0&&(N.output=new l.Buf8(U),N.next_out=0,N.avail_out=U),(w=o.deflate(N,E))!==1&&w!==p)return this.onEnd(w),!(this.ended=!0);N.avail_out!==0&&(N.avail_in!==0||E!==4&&E!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(N.output,N.next_out))):this.onData(l.shrinkBuf(N.output,N.next_out)))}while((0<N.avail_in||N.avail_out===0)&&w!==1);return E===4?(w=o.deflateEnd(this.strm),this.onEnd(w),this.ended=!0,w===p):E!==2||(this.onEnd(p),!(N.avail_out=0))},y.prototype.onData=function(v){this.chunks.push(v)},y.prototype.onEnd=function(v){v===p&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=v,this.msg=this.strm.msg},s.Deflate=y,s.deflate=g,s.deflateRaw=function(v,S){return(S=S||{}).raw=!0,g(v,S)},s.gzip=function(v,S){return(S=S||{}).gzip=!0,g(v,S)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),u=e("./zlib/constants"),d=e("./zlib/messages"),f=e("./zlib/zstream"),p=e("./zlib/gzheader"),_=Object.prototype.toString;function m(y){if(!(this instanceof m))return new m(y);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},y||{});var g=this.options;g.raw&&0<=g.windowBits&&g.windowBits<16&&(g.windowBits=-g.windowBits,g.windowBits===0&&(g.windowBits=-15)),!(0<=g.windowBits&&g.windowBits<16)||y&&y.windowBits||(g.windowBits+=32),15<g.windowBits&&g.windowBits<48&&!(15&g.windowBits)&&(g.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var v=o.inflateInit2(this.strm,g.windowBits);if(v!==u.Z_OK)throw new Error(d[v]);this.header=new p,o.inflateGetHeader(this.strm,this.header)}function x(y,g){var v=new m(g);if(v.push(y,!0),v.err)throw v.msg||d[v.err];return v.result}m.prototype.push=function(y,g){var v,S,w,E,N,U,O=this.strm,F=this.options.chunkSize,I=this.options.dictionary,R=!1;if(this.ended)return!1;S=g===~~g?g:g===!0?u.Z_FINISH:u.Z_NO_FLUSH,typeof y=="string"?O.input=c.binstring2buf(y):_.call(y)==="[object ArrayBuffer]"?O.input=new Uint8Array(y):O.input=y,O.next_in=0,O.avail_in=O.input.length;do{if(O.avail_out===0&&(O.output=new l.Buf8(F),O.next_out=0,O.avail_out=F),(v=o.inflate(O,u.Z_NO_FLUSH))===u.Z_NEED_DICT&&I&&(U=typeof I=="string"?c.string2buf(I):_.call(I)==="[object ArrayBuffer]"?new Uint8Array(I):I,v=o.inflateSetDictionary(this.strm,U)),v===u.Z_BUF_ERROR&&R===!0&&(v=u.Z_OK,R=!1),v!==u.Z_STREAM_END&&v!==u.Z_OK)return this.onEnd(v),!(this.ended=!0);O.next_out&&(O.avail_out!==0&&v!==u.Z_STREAM_END&&(O.avail_in!==0||S!==u.Z_FINISH&&S!==u.Z_SYNC_FLUSH)||(this.options.to==="string"?(w=c.utf8border(O.output,O.next_out),E=O.next_out-w,N=c.buf2string(O.output,w),O.next_out=E,O.avail_out=F-E,E&&l.arraySet(O.output,O.output,w,E,0),this.onData(N)):this.onData(l.shrinkBuf(O.output,O.next_out)))),O.avail_in===0&&O.avail_out===0&&(R=!0)}while((0<O.avail_in||O.avail_out===0)&&v!==u.Z_STREAM_END);return v===u.Z_STREAM_END&&(S=u.Z_FINISH),S===u.Z_FINISH?(v=o.inflateEnd(this.strm),this.onEnd(v),this.ended=!0,v===u.Z_OK):S!==u.Z_SYNC_FLUSH||(this.onEnd(u.Z_OK),!(O.avail_out=0))},m.prototype.onData=function(y){this.chunks.push(y)},m.prototype.onEnd=function(y){y===u.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Inflate=m,s.inflate=x,s.inflateRaw=function(y,g){return(g=g||{}).raw=!0,x(y,g)},s.ungzip=x},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(u){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var f=d.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var p in f)f.hasOwnProperty(p)&&(u[p]=f[p])}}return u},s.shrinkBuf=function(u,d){return u.length===d?u:u.subarray?u.subarray(0,d):(u.length=d,u)};var l={arraySet:function(u,d,f,p,_){if(d.subarray&&u.subarray)u.set(d.subarray(f,f+p),_);else for(var m=0;m<p;m++)u[_+m]=d[f+m]},flattenChunks:function(u){var d,f,p,_,m,x;for(d=p=0,f=u.length;d<f;d++)p+=u[d].length;for(x=new Uint8Array(p),d=_=0,f=u.length;d<f;d++)m=u[d],x.set(m,_),_+=m.length;return x}},c={arraySet:function(u,d,f,p,_){for(var m=0;m<p;m++)u[_+m]=d[f+m]},flattenChunks:function(u){return[].concat.apply([],u)}};s.setTyped=function(u){u?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var u=new o.Buf8(256),d=0;d<256;d++)u[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function f(p,_){if(_<65537&&(p.subarray&&c||!p.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(p,_));for(var m="",x=0;x<_;x++)m+=String.fromCharCode(p[x]);return m}u[254]=u[254]=1,s.string2buf=function(p){var _,m,x,y,g,v=p.length,S=0;for(y=0;y<v;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),S+=m<128?1:m<2048?2:m<65536?3:4;for(_=new o.Buf8(S),y=g=0;g<S;y++)(64512&(m=p.charCodeAt(y)))==55296&&y+1<v&&(64512&(x=p.charCodeAt(y+1)))==56320&&(m=65536+(m-55296<<10)+(x-56320),y++),m<128?_[g++]=m:(m<2048?_[g++]=192|m>>>6:(m<65536?_[g++]=224|m>>>12:(_[g++]=240|m>>>18,_[g++]=128|m>>>12&63),_[g++]=128|m>>>6&63),_[g++]=128|63&m);return _},s.buf2binstring=function(p){return f(p,p.length)},s.binstring2buf=function(p){for(var _=new o.Buf8(p.length),m=0,x=_.length;m<x;m++)_[m]=p.charCodeAt(m);return _},s.buf2string=function(p,_){var m,x,y,g,v=_||p.length,S=new Array(2*v);for(m=x=0;m<v;)if((y=p[m++])<128)S[x++]=y;else if(4<(g=u[y]))S[x++]=65533,m+=g-1;else{for(y&=g===2?31:g===3?15:7;1<g&&m<v;)y=y<<6|63&p[m++],g--;1<g?S[x++]=65533:y<65536?S[x++]=y:(y-=65536,S[x++]=55296|y>>10&1023,S[x++]=56320|1023&y)}return f(S,x)},s.utf8border=function(p,_){var m;for((_=_||p.length)>p.length&&(_=p.length),m=_-1;0<=m&&(192&p[m])==128;)m--;return m<0||m===0?_:m+u[p[m]]>_?m:_}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,u){for(var d=65535&o|0,f=o>>>16&65535|0,p=0;c!==0;){for(c-=p=2e3<c?2e3:c;f=f+(d=d+l[u++]|0)|0,--p;);d%=65521,f%=65521}return d|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],u=0;u<256;u++){l=u;for(var d=0;d<8;d++)l=1&l?3988292384^l>>>1:l>>>1;c[u]=l}return c}();n.exports=function(l,c,u,d){var f=o,p=d+u;l^=-1;for(var _=d;_<p;_++)l=l>>>8^f[255&(l^c[_])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),u=e("./adler32"),d=e("./crc32"),f=e("./messages"),p=0,_=4,m=0,x=-2,y=-1,g=4,v=2,S=8,w=9,E=286,N=30,U=19,O=2*E+1,F=15,I=3,R=258,W=R+I+1,k=42,H=113,P=1,Z=2,nt=3,ot=4;function j(T,et){return T.msg=f[et],et}function rt(T){return(T<<1)-(4<T?9:0)}function at(T){for(var et=T.length;0<=--et;)T[et]=0}function q(T){var et=T.state,$=et.pending;$>T.avail_out&&($=T.avail_out),$!==0&&(l.arraySet(T.output,et.pending_buf,et.pending_out,$,T.next_out),T.next_out+=$,et.pending_out+=$,T.total_out+=$,T.avail_out-=$,et.pending-=$,et.pending===0&&(et.pending_out=0))}function tt(T,et){c._tr_flush_block(T,0<=T.block_start?T.block_start:-1,T.strstart-T.block_start,et),T.block_start=T.strstart,q(T.strm)}function Lt(T,et){T.pending_buf[T.pending++]=et}function Q(T,et){T.pending_buf[T.pending++]=et>>>8&255,T.pending_buf[T.pending++]=255&et}function it(T,et){var $,C,M=T.max_chain_length,B=T.strstart,X=T.prev_length,J=T.nice_match,G=T.strstart>T.w_size-W?T.strstart-(T.w_size-W):0,ft=T.window,lt=T.w_mask,pt=T.prev,Tt=T.strstart+R,Et=ft[B+X-1],At=ft[B+X];T.prev_length>=T.good_match&&(M>>=2),J>T.lookahead&&(J=T.lookahead);do if(ft[($=et)+X]===At&&ft[$+X-1]===Et&&ft[$]===ft[B]&&ft[++$]===ft[B+1]){B+=2,$++;do;while(ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&ft[++B]===ft[++$]&&B<Tt);if(C=R-(Tt-B),B=Tt-R,X<C){if(T.match_start=et,J<=(X=C))break;Et=ft[B+X-1],At=ft[B+X]}}while((et=pt[et&lt])>G&&--M!=0);return X<=T.lookahead?X:T.lookahead}function wt(T){var et,$,C,M,B,X,J,G,ft,lt,pt=T.w_size;do{if(M=T.window_size-T.lookahead-T.strstart,T.strstart>=pt+(pt-W)){for(l.arraySet(T.window,T.window,pt,pt,0),T.match_start-=pt,T.strstart-=pt,T.block_start-=pt,et=$=T.hash_size;C=T.head[--et],T.head[et]=pt<=C?C-pt:0,--$;);for(et=$=pt;C=T.prev[--et],T.prev[et]=pt<=C?C-pt:0,--$;);M+=pt}if(T.strm.avail_in===0)break;if(X=T.strm,J=T.window,G=T.strstart+T.lookahead,ft=M,lt=void 0,lt=X.avail_in,ft<lt&&(lt=ft),$=lt===0?0:(X.avail_in-=lt,l.arraySet(J,X.input,X.next_in,lt,G),X.state.wrap===1?X.adler=u(X.adler,J,lt,G):X.state.wrap===2&&(X.adler=d(X.adler,J,lt,G)),X.next_in+=lt,X.total_in+=lt,lt),T.lookahead+=$,T.lookahead+T.insert>=I)for(B=T.strstart-T.insert,T.ins_h=T.window[B],T.ins_h=(T.ins_h<<T.hash_shift^T.window[B+1])&T.hash_mask;T.insert&&(T.ins_h=(T.ins_h<<T.hash_shift^T.window[B+I-1])&T.hash_mask,T.prev[B&T.w_mask]=T.head[T.ins_h],T.head[T.ins_h]=B,B++,T.insert--,!(T.lookahead+T.insert<I)););}while(T.lookahead<W&&T.strm.avail_in!==0)}function St(T,et){for(var $,C;;){if(T.lookahead<W){if(wt(T),T.lookahead<W&&et===p)return P;if(T.lookahead===0)break}if($=0,T.lookahead>=I&&(T.ins_h=(T.ins_h<<T.hash_shift^T.window[T.strstart+I-1])&T.hash_mask,$=T.prev[T.strstart&T.w_mask]=T.head[T.ins_h],T.head[T.ins_h]=T.strstart),$!==0&&T.strstart-$<=T.w_size-W&&(T.match_length=it(T,$)),T.match_length>=I)if(C=c._tr_tally(T,T.strstart-T.match_start,T.match_length-I),T.lookahead-=T.match_length,T.match_length<=T.max_lazy_match&&T.lookahead>=I){for(T.match_length--;T.strstart++,T.ins_h=(T.ins_h<<T.hash_shift^T.window[T.strstart+I-1])&T.hash_mask,$=T.prev[T.strstart&T.w_mask]=T.head[T.ins_h],T.head[T.ins_h]=T.strstart,--T.match_length!=0;);T.strstart++}else T.strstart+=T.match_length,T.match_length=0,T.ins_h=T.window[T.strstart],T.ins_h=(T.ins_h<<T.hash_shift^T.window[T.strstart+1])&T.hash_mask;else C=c._tr_tally(T,0,T.window[T.strstart]),T.lookahead--,T.strstart++;if(C&&(tt(T,!1),T.strm.avail_out===0))return P}return T.insert=T.strstart<I-1?T.strstart:I-1,et===_?(tt(T,!0),T.strm.avail_out===0?nt:ot):T.last_lit&&(tt(T,!1),T.strm.avail_out===0)?P:Z}function Pt(T,et){for(var $,C,M;;){if(T.lookahead<W){if(wt(T),T.lookahead<W&&et===p)return P;if(T.lookahead===0)break}if($=0,T.lookahead>=I&&(T.ins_h=(T.ins_h<<T.hash_shift^T.window[T.strstart+I-1])&T.hash_mask,$=T.prev[T.strstart&T.w_mask]=T.head[T.ins_h],T.head[T.ins_h]=T.strstart),T.prev_length=T.match_length,T.prev_match=T.match_start,T.match_length=I-1,$!==0&&T.prev_length<T.max_lazy_match&&T.strstart-$<=T.w_size-W&&(T.match_length=it(T,$),T.match_length<=5&&(T.strategy===1||T.match_length===I&&4096<T.strstart-T.match_start)&&(T.match_length=I-1)),T.prev_length>=I&&T.match_length<=T.prev_length){for(M=T.strstart+T.lookahead-I,C=c._tr_tally(T,T.strstart-1-T.prev_match,T.prev_length-I),T.lookahead-=T.prev_length-1,T.prev_length-=2;++T.strstart<=M&&(T.ins_h=(T.ins_h<<T.hash_shift^T.window[T.strstart+I-1])&T.hash_mask,$=T.prev[T.strstart&T.w_mask]=T.head[T.ins_h],T.head[T.ins_h]=T.strstart),--T.prev_length!=0;);if(T.match_available=0,T.match_length=I-1,T.strstart++,C&&(tt(T,!1),T.strm.avail_out===0))return P}else if(T.match_available){if((C=c._tr_tally(T,0,T.window[T.strstart-1]))&&tt(T,!1),T.strstart++,T.lookahead--,T.strm.avail_out===0)return P}else T.match_available=1,T.strstart++,T.lookahead--}return T.match_available&&(C=c._tr_tally(T,0,T.window[T.strstart-1]),T.match_available=0),T.insert=T.strstart<I-1?T.strstart:I-1,et===_?(tt(T,!0),T.strm.avail_out===0?nt:ot):T.last_lit&&(tt(T,!1),T.strm.avail_out===0)?P:Z}function It(T,et,$,C,M){this.good_length=T,this.max_lazy=et,this.nice_length=$,this.max_chain=C,this.func=M}function kt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=S,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*O),this.dyn_dtree=new l.Buf16(2*(2*N+1)),this.bl_tree=new l.Buf16(2*(2*U+1)),at(this.dyn_ltree),at(this.dyn_dtree),at(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(F+1),this.heap=new l.Buf16(2*E+1),at(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*E+1),at(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function st(T){var et;return T&&T.state?(T.total_in=T.total_out=0,T.data_type=v,(et=T.state).pending=0,et.pending_out=0,et.wrap<0&&(et.wrap=-et.wrap),et.status=et.wrap?k:H,T.adler=et.wrap===2?0:1,et.last_flush=p,c._tr_init(et),m):j(T,x)}function yt(T){var et=st(T);return et===m&&function($){$.window_size=2*$.w_size,at($.head),$.max_lazy_match=o[$.level].max_lazy,$.good_match=o[$.level].good_length,$.nice_match=o[$.level].nice_length,$.max_chain_length=o[$.level].max_chain,$.strstart=0,$.block_start=0,$.lookahead=0,$.insert=0,$.match_length=$.prev_length=I-1,$.match_available=0,$.ins_h=0}(T.state),et}function xt(T,et,$,C,M,B){if(!T)return x;var X=1;if(et===y&&(et=6),C<0?(X=0,C=-C):15<C&&(X=2,C-=16),M<1||w<M||$!==S||C<8||15<C||et<0||9<et||B<0||g<B)return j(T,x);C===8&&(C=9);var J=new kt;return(T.state=J).strm=T,J.wrap=X,J.gzhead=null,J.w_bits=C,J.w_size=1<<J.w_bits,J.w_mask=J.w_size-1,J.hash_bits=M+7,J.hash_size=1<<J.hash_bits,J.hash_mask=J.hash_size-1,J.hash_shift=~~((J.hash_bits+I-1)/I),J.window=new l.Buf8(2*J.w_size),J.head=new l.Buf16(J.hash_size),J.prev=new l.Buf16(J.w_size),J.lit_bufsize=1<<M+6,J.pending_buf_size=4*J.lit_bufsize,J.pending_buf=new l.Buf8(J.pending_buf_size),J.d_buf=1*J.lit_bufsize,J.l_buf=3*J.lit_bufsize,J.level=et,J.strategy=B,J.method=$,yt(T)}o=[new It(0,0,0,0,function(T,et){var $=65535;for($>T.pending_buf_size-5&&($=T.pending_buf_size-5);;){if(T.lookahead<=1){if(wt(T),T.lookahead===0&&et===p)return P;if(T.lookahead===0)break}T.strstart+=T.lookahead,T.lookahead=0;var C=T.block_start+$;if((T.strstart===0||T.strstart>=C)&&(T.lookahead=T.strstart-C,T.strstart=C,tt(T,!1),T.strm.avail_out===0)||T.strstart-T.block_start>=T.w_size-W&&(tt(T,!1),T.strm.avail_out===0))return P}return T.insert=0,et===_?(tt(T,!0),T.strm.avail_out===0?nt:ot):(T.strstart>T.block_start&&(tt(T,!1),T.strm.avail_out),P)}),new It(4,4,8,4,St),new It(4,5,16,8,St),new It(4,6,32,32,St),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(T,et){return xt(T,et,S,15,8,0)},s.deflateInit2=xt,s.deflateReset=yt,s.deflateResetKeep=st,s.deflateSetHeader=function(T,et){return T&&T.state?T.state.wrap!==2?x:(T.state.gzhead=et,m):x},s.deflate=function(T,et){var $,C,M,B;if(!T||!T.state||5<et||et<0)return T?j(T,x):x;if(C=T.state,!T.output||!T.input&&T.avail_in!==0||C.status===666&&et!==_)return j(T,T.avail_out===0?-5:x);if(C.strm=T,$=C.last_flush,C.last_flush=et,C.status===k)if(C.wrap===2)T.adler=0,Lt(C,31),Lt(C,139),Lt(C,8),C.gzhead?(Lt(C,(C.gzhead.text?1:0)+(C.gzhead.hcrc?2:0)+(C.gzhead.extra?4:0)+(C.gzhead.name?8:0)+(C.gzhead.comment?16:0)),Lt(C,255&C.gzhead.time),Lt(C,C.gzhead.time>>8&255),Lt(C,C.gzhead.time>>16&255),Lt(C,C.gzhead.time>>24&255),Lt(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),Lt(C,255&C.gzhead.os),C.gzhead.extra&&C.gzhead.extra.length&&(Lt(C,255&C.gzhead.extra.length),Lt(C,C.gzhead.extra.length>>8&255)),C.gzhead.hcrc&&(T.adler=d(T.adler,C.pending_buf,C.pending,0)),C.gzindex=0,C.status=69):(Lt(C,0),Lt(C,0),Lt(C,0),Lt(C,0),Lt(C,0),Lt(C,C.level===9?2:2<=C.strategy||C.level<2?4:0),Lt(C,3),C.status=H);else{var X=S+(C.w_bits-8<<4)<<8;X|=(2<=C.strategy||C.level<2?0:C.level<6?1:C.level===6?2:3)<<6,C.strstart!==0&&(X|=32),X+=31-X%31,C.status=H,Q(C,X),C.strstart!==0&&(Q(C,T.adler>>>16),Q(C,65535&T.adler)),T.adler=1}if(C.status===69)if(C.gzhead.extra){for(M=C.pending;C.gzindex<(65535&C.gzhead.extra.length)&&(C.pending!==C.pending_buf_size||(C.gzhead.hcrc&&C.pending>M&&(T.adler=d(T.adler,C.pending_buf,C.pending-M,M)),q(T),M=C.pending,C.pending!==C.pending_buf_size));)Lt(C,255&C.gzhead.extra[C.gzindex]),C.gzindex++;C.gzhead.hcrc&&C.pending>M&&(T.adler=d(T.adler,C.pending_buf,C.pending-M,M)),C.gzindex===C.gzhead.extra.length&&(C.gzindex=0,C.status=73)}else C.status=73;if(C.status===73)if(C.gzhead.name){M=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>M&&(T.adler=d(T.adler,C.pending_buf,C.pending-M,M)),q(T),M=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.name.length?255&C.gzhead.name.charCodeAt(C.gzindex++):0,Lt(C,B)}while(B!==0);C.gzhead.hcrc&&C.pending>M&&(T.adler=d(T.adler,C.pending_buf,C.pending-M,M)),B===0&&(C.gzindex=0,C.status=91)}else C.status=91;if(C.status===91)if(C.gzhead.comment){M=C.pending;do{if(C.pending===C.pending_buf_size&&(C.gzhead.hcrc&&C.pending>M&&(T.adler=d(T.adler,C.pending_buf,C.pending-M,M)),q(T),M=C.pending,C.pending===C.pending_buf_size)){B=1;break}B=C.gzindex<C.gzhead.comment.length?255&C.gzhead.comment.charCodeAt(C.gzindex++):0,Lt(C,B)}while(B!==0);C.gzhead.hcrc&&C.pending>M&&(T.adler=d(T.adler,C.pending_buf,C.pending-M,M)),B===0&&(C.status=103)}else C.status=103;if(C.status===103&&(C.gzhead.hcrc?(C.pending+2>C.pending_buf_size&&q(T),C.pending+2<=C.pending_buf_size&&(Lt(C,255&T.adler),Lt(C,T.adler>>8&255),T.adler=0,C.status=H)):C.status=H),C.pending!==0){if(q(T),T.avail_out===0)return C.last_flush=-1,m}else if(T.avail_in===0&&rt(et)<=rt($)&&et!==_)return j(T,-5);if(C.status===666&&T.avail_in!==0)return j(T,-5);if(T.avail_in!==0||C.lookahead!==0||et!==p&&C.status!==666){var J=C.strategy===2?function(G,ft){for(var lt;;){if(G.lookahead===0&&(wt(G),G.lookahead===0)){if(ft===p)return P;break}if(G.match_length=0,lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++,lt&&(tt(G,!1),G.strm.avail_out===0))return P}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?nt:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?P:Z}(C,et):C.strategy===3?function(G,ft){for(var lt,pt,Tt,Et,At=G.window;;){if(G.lookahead<=R){if(wt(G),G.lookahead<=R&&ft===p)return P;if(G.lookahead===0)break}if(G.match_length=0,G.lookahead>=I&&0<G.strstart&&(pt=At[Tt=G.strstart-1])===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]){Et=G.strstart+R;do;while(pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&pt===At[++Tt]&&Tt<Et);G.match_length=R-(Et-Tt),G.match_length>G.lookahead&&(G.match_length=G.lookahead)}if(G.match_length>=I?(lt=c._tr_tally(G,1,G.match_length-I),G.lookahead-=G.match_length,G.strstart+=G.match_length,G.match_length=0):(lt=c._tr_tally(G,0,G.window[G.strstart]),G.lookahead--,G.strstart++),lt&&(tt(G,!1),G.strm.avail_out===0))return P}return G.insert=0,ft===_?(tt(G,!0),G.strm.avail_out===0?nt:ot):G.last_lit&&(tt(G,!1),G.strm.avail_out===0)?P:Z}(C,et):o[C.level].func(C,et);if(J!==nt&&J!==ot||(C.status=666),J===P||J===nt)return T.avail_out===0&&(C.last_flush=-1),m;if(J===Z&&(et===1?c._tr_align(C):et!==5&&(c._tr_stored_block(C,0,0,!1),et===3&&(at(C.head),C.lookahead===0&&(C.strstart=0,C.block_start=0,C.insert=0))),q(T),T.avail_out===0))return C.last_flush=-1,m}return et!==_?m:C.wrap<=0?1:(C.wrap===2?(Lt(C,255&T.adler),Lt(C,T.adler>>8&255),Lt(C,T.adler>>16&255),Lt(C,T.adler>>24&255),Lt(C,255&T.total_in),Lt(C,T.total_in>>8&255),Lt(C,T.total_in>>16&255),Lt(C,T.total_in>>24&255)):(Q(C,T.adler>>>16),Q(C,65535&T.adler)),q(T),0<C.wrap&&(C.wrap=-C.wrap),C.pending!==0?m:1)},s.deflateEnd=function(T){var et;return T&&T.state?(et=T.state.status)!==k&&et!==69&&et!==73&&et!==91&&et!==103&&et!==H&&et!==666?j(T,x):(T.state=null,et===H?j(T,-3):m):x},s.deflateSetDictionary=function(T,et){var $,C,M,B,X,J,G,ft,lt=et.length;if(!T||!T.state||(B=($=T.state).wrap)===2||B===1&&$.status!==k||$.lookahead)return x;for(B===1&&(T.adler=u(T.adler,et,lt,0)),$.wrap=0,lt>=$.w_size&&(B===0&&(at($.head),$.strstart=0,$.block_start=0,$.insert=0),ft=new l.Buf8($.w_size),l.arraySet(ft,et,lt-$.w_size,$.w_size,0),et=ft,lt=$.w_size),X=T.avail_in,J=T.next_in,G=T.input,T.avail_in=lt,T.next_in=0,T.input=et,wt($);$.lookahead>=I;){for(C=$.strstart,M=$.lookahead-(I-1);$.ins_h=($.ins_h<<$.hash_shift^$.window[C+I-1])&$.hash_mask,$.prev[C&$.w_mask]=$.head[$.ins_h],$.head[$.ins_h]=C,C++,--M;);$.strstart=C,$.lookahead=I-1,wt($)}return $.strstart+=$.lookahead,$.block_start=$.strstart,$.insert=$.lookahead,$.lookahead=0,$.match_length=$.prev_length=I-1,$.match_available=0,T.next_in=J,T.input=G,T.avail_in=X,$.wrap=B,m},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,u,d,f,p,_,m,x,y,g,v,S,w,E,N,U,O,F,I,R,W,k,H,P,Z;c=o.state,u=o.next_in,P=o.input,d=u+(o.avail_in-5),f=o.next_out,Z=o.output,p=f-(l-o.avail_out),_=f+(o.avail_out-257),m=c.dmax,x=c.wsize,y=c.whave,g=c.wnext,v=c.window,S=c.hold,w=c.bits,E=c.lencode,N=c.distcode,U=(1<<c.lenbits)-1,O=(1<<c.distbits)-1;t:do{w<15&&(S+=P[u++]<<w,w+=8,S+=P[u++]<<w,w+=8),F=E[S&U];e:for(;;){if(S>>>=I=F>>>24,w-=I,(I=F>>>16&255)===0)Z[f++]=65535&F;else{if(!(16&I)){if(!(64&I)){F=E[(65535&F)+(S&(1<<I)-1)];continue e}if(32&I){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}R=65535&F,(I&=15)&&(w<I&&(S+=P[u++]<<w,w+=8),R+=S&(1<<I)-1,S>>>=I,w-=I),w<15&&(S+=P[u++]<<w,w+=8,S+=P[u++]<<w,w+=8),F=N[S&O];n:for(;;){if(S>>>=I=F>>>24,w-=I,!(16&(I=F>>>16&255))){if(!(64&I)){F=N[(65535&F)+(S&(1<<I)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(W=65535&F,w<(I&=15)&&(S+=P[u++]<<w,(w+=8)<I&&(S+=P[u++]<<w,w+=8)),m<(W+=S&(1<<I)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(S>>>=I,w-=I,(I=f-p)<W){if(y<(I=W-I)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(H=v,(k=0)===g){if(k+=x-I,I<R){for(R-=I;Z[f++]=v[k++],--I;);k=f-W,H=Z}}else if(g<I){if(k+=x+g-I,(I-=g)<R){for(R-=I;Z[f++]=v[k++],--I;);if(k=0,g<R){for(R-=I=g;Z[f++]=v[k++],--I;);k=f-W,H=Z}}}else if(k+=g-I,I<R){for(R-=I;Z[f++]=v[k++],--I;);k=f-W,H=Z}for(;2<R;)Z[f++]=H[k++],Z[f++]=H[k++],Z[f++]=H[k++],R-=3;R&&(Z[f++]=H[k++],1<R&&(Z[f++]=H[k++]))}else{for(k=f-W;Z[f++]=Z[k++],Z[f++]=Z[k++],Z[f++]=Z[k++],2<(R-=3););R&&(Z[f++]=Z[k++],1<R&&(Z[f++]=Z[k++]))}break}}break}}while(u<d&&f<_);u-=R=w>>3,S&=(1<<(w-=R<<3))-1,o.next_in=u,o.next_out=f,o.avail_in=u<d?d-u+5:5-(u-d),o.avail_out=f<_?_-f+257:257-(f-_),c.hold=S,c.bits=w}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),u=e("./inffast"),d=e("./inftrees"),f=1,p=2,_=0,m=-2,x=1,y=852,g=592;function v(k){return(k>>>24&255)+(k>>>8&65280)+((65280&k)<<8)+((255&k)<<24)}function S(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function w(k){var H;return k&&k.state?(H=k.state,k.total_in=k.total_out=H.total=0,k.msg="",H.wrap&&(k.adler=1&H.wrap),H.mode=x,H.last=0,H.havedict=0,H.dmax=32768,H.head=null,H.hold=0,H.bits=0,H.lencode=H.lendyn=new o.Buf32(y),H.distcode=H.distdyn=new o.Buf32(g),H.sane=1,H.back=-1,_):m}function E(k){var H;return k&&k.state?((H=k.state).wsize=0,H.whave=0,H.wnext=0,w(k)):m}function N(k,H){var P,Z;return k&&k.state?(Z=k.state,H<0?(P=0,H=-H):(P=1+(H>>4),H<48&&(H&=15)),H&&(H<8||15<H)?m:(Z.window!==null&&Z.wbits!==H&&(Z.window=null),Z.wrap=P,Z.wbits=H,E(k))):m}function U(k,H){var P,Z;return k?(Z=new S,(k.state=Z).window=null,(P=N(k,H))!==_&&(k.state=null),P):m}var O,F,I=!0;function R(k){if(I){var H;for(O=new o.Buf32(512),F=new o.Buf32(32),H=0;H<144;)k.lens[H++]=8;for(;H<256;)k.lens[H++]=9;for(;H<280;)k.lens[H++]=7;for(;H<288;)k.lens[H++]=8;for(d(f,k.lens,0,288,O,0,k.work,{bits:9}),H=0;H<32;)k.lens[H++]=5;d(p,k.lens,0,32,F,0,k.work,{bits:5}),I=!1}k.lencode=O,k.lenbits=9,k.distcode=F,k.distbits=5}function W(k,H,P,Z){var nt,ot=k.state;return ot.window===null&&(ot.wsize=1<<ot.wbits,ot.wnext=0,ot.whave=0,ot.window=new o.Buf8(ot.wsize)),Z>=ot.wsize?(o.arraySet(ot.window,H,P-ot.wsize,ot.wsize,0),ot.wnext=0,ot.whave=ot.wsize):(Z<(nt=ot.wsize-ot.wnext)&&(nt=Z),o.arraySet(ot.window,H,P-Z,nt,ot.wnext),(Z-=nt)?(o.arraySet(ot.window,H,P-Z,Z,0),ot.wnext=Z,ot.whave=ot.wsize):(ot.wnext+=nt,ot.wnext===ot.wsize&&(ot.wnext=0),ot.whave<ot.wsize&&(ot.whave+=nt))),0}s.inflateReset=E,s.inflateReset2=N,s.inflateResetKeep=w,s.inflateInit=function(k){return U(k,15)},s.inflateInit2=U,s.inflate=function(k,H){var P,Z,nt,ot,j,rt,at,q,tt,Lt,Q,it,wt,St,Pt,It,kt,st,yt,xt,T,et,$,C,M=0,B=new o.Buf8(4),X=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!k||!k.state||!k.output||!k.input&&k.avail_in!==0)return m;(P=k.state).mode===12&&(P.mode=13),j=k.next_out,nt=k.output,at=k.avail_out,ot=k.next_in,Z=k.input,rt=k.avail_in,q=P.hold,tt=P.bits,Lt=rt,Q=at,et=_;t:for(;;)switch(P.mode){case x:if(P.wrap===0){P.mode=13;break}for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(2&P.wrap&&q===35615){B[P.check=0]=255&q,B[1]=q>>>8&255,P.check=c(P.check,B,2,0),tt=q=0,P.mode=2;break}if(P.flags=0,P.head&&(P.head.done=!1),!(1&P.wrap)||(((255&q)<<8)+(q>>8))%31){k.msg="incorrect header check",P.mode=30;break}if((15&q)!=8){k.msg="unknown compression method",P.mode=30;break}if(tt-=4,T=8+(15&(q>>>=4)),P.wbits===0)P.wbits=T;else if(T>P.wbits){k.msg="invalid window size",P.mode=30;break}P.dmax=1<<T,k.adler=P.check=1,P.mode=512&q?10:12,tt=q=0;break;case 2:for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(P.flags=q,(255&P.flags)!=8){k.msg="unknown compression method",P.mode=30;break}if(57344&P.flags){k.msg="unknown header flags set",P.mode=30;break}P.head&&(P.head.text=q>>8&1),512&P.flags&&(B[0]=255&q,B[1]=q>>>8&255,P.check=c(P.check,B,2,0)),tt=q=0,P.mode=3;case 3:for(;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}P.head&&(P.head.time=q),512&P.flags&&(B[0]=255&q,B[1]=q>>>8&255,B[2]=q>>>16&255,B[3]=q>>>24&255,P.check=c(P.check,B,4,0)),tt=q=0,P.mode=4;case 4:for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}P.head&&(P.head.xflags=255&q,P.head.os=q>>8),512&P.flags&&(B[0]=255&q,B[1]=q>>>8&255,P.check=c(P.check,B,2,0)),tt=q=0,P.mode=5;case 5:if(1024&P.flags){for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}P.length=q,P.head&&(P.head.extra_len=q),512&P.flags&&(B[0]=255&q,B[1]=q>>>8&255,P.check=c(P.check,B,2,0)),tt=q=0}else P.head&&(P.head.extra=null);P.mode=6;case 6:if(1024&P.flags&&(rt<(it=P.length)&&(it=rt),it&&(P.head&&(T=P.head.extra_len-P.length,P.head.extra||(P.head.extra=new Array(P.head.extra_len)),o.arraySet(P.head.extra,Z,ot,it,T)),512&P.flags&&(P.check=c(P.check,Z,it,ot)),rt-=it,ot+=it,P.length-=it),P.length))break t;P.length=0,P.mode=7;case 7:if(2048&P.flags){if(rt===0)break t;for(it=0;T=Z[ot+it++],P.head&&T&&P.length<65536&&(P.head.name+=String.fromCharCode(T)),T&&it<rt;);if(512&P.flags&&(P.check=c(P.check,Z,it,ot)),rt-=it,ot+=it,T)break t}else P.head&&(P.head.name=null);P.length=0,P.mode=8;case 8:if(4096&P.flags){if(rt===0)break t;for(it=0;T=Z[ot+it++],P.head&&T&&P.length<65536&&(P.head.comment+=String.fromCharCode(T)),T&&it<rt;);if(512&P.flags&&(P.check=c(P.check,Z,it,ot)),rt-=it,ot+=it,T)break t}else P.head&&(P.head.comment=null);P.mode=9;case 9:if(512&P.flags){for(;tt<16;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(q!==(65535&P.check)){k.msg="header crc mismatch",P.mode=30;break}tt=q=0}P.head&&(P.head.hcrc=P.flags>>9&1,P.head.done=!0),k.adler=P.check=0,P.mode=12;break;case 10:for(;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}k.adler=P.check=v(q),tt=q=0,P.mode=11;case 11:if(P.havedict===0)return k.next_out=j,k.avail_out=at,k.next_in=ot,k.avail_in=rt,P.hold=q,P.bits=tt,2;k.adler=P.check=1,P.mode=12;case 12:if(H===5||H===6)break t;case 13:if(P.last){q>>>=7&tt,tt-=7&tt,P.mode=27;break}for(;tt<3;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}switch(P.last=1&q,tt-=1,3&(q>>>=1)){case 0:P.mode=14;break;case 1:if(R(P),P.mode=20,H!==6)break;q>>>=2,tt-=2;break t;case 2:P.mode=17;break;case 3:k.msg="invalid block type",P.mode=30}q>>>=2,tt-=2;break;case 14:for(q>>>=7&tt,tt-=7&tt;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if((65535&q)!=(q>>>16^65535)){k.msg="invalid stored block lengths",P.mode=30;break}if(P.length=65535&q,tt=q=0,P.mode=15,H===6)break t;case 15:P.mode=16;case 16:if(it=P.length){if(rt<it&&(it=rt),at<it&&(it=at),it===0)break t;o.arraySet(nt,Z,ot,it,j),rt-=it,ot+=it,at-=it,j+=it,P.length-=it;break}P.mode=12;break;case 17:for(;tt<14;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(P.nlen=257+(31&q),q>>>=5,tt-=5,P.ndist=1+(31&q),q>>>=5,tt-=5,P.ncode=4+(15&q),q>>>=4,tt-=4,286<P.nlen||30<P.ndist){k.msg="too many length or distance symbols",P.mode=30;break}P.have=0,P.mode=18;case 18:for(;P.have<P.ncode;){for(;tt<3;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}P.lens[X[P.have++]]=7&q,q>>>=3,tt-=3}for(;P.have<19;)P.lens[X[P.have++]]=0;if(P.lencode=P.lendyn,P.lenbits=7,$={bits:P.lenbits},et=d(0,P.lens,0,19,P.lencode,0,P.work,$),P.lenbits=$.bits,et){k.msg="invalid code lengths set",P.mode=30;break}P.have=0,P.mode=19;case 19:for(;P.have<P.nlen+P.ndist;){for(;It=(M=P.lencode[q&(1<<P.lenbits)-1])>>>16&255,kt=65535&M,!((Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(kt<16)q>>>=Pt,tt-=Pt,P.lens[P.have++]=kt;else{if(kt===16){for(C=Pt+2;tt<C;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(q>>>=Pt,tt-=Pt,P.have===0){k.msg="invalid bit length repeat",P.mode=30;break}T=P.lens[P.have-1],it=3+(3&q),q>>>=2,tt-=2}else if(kt===17){for(C=Pt+3;tt<C;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}tt-=Pt,T=0,it=3+(7&(q>>>=Pt)),q>>>=3,tt-=3}else{for(C=Pt+7;tt<C;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}tt-=Pt,T=0,it=11+(127&(q>>>=Pt)),q>>>=7,tt-=7}if(P.have+it>P.nlen+P.ndist){k.msg="invalid bit length repeat",P.mode=30;break}for(;it--;)P.lens[P.have++]=T}}if(P.mode===30)break;if(P.lens[256]===0){k.msg="invalid code -- missing end-of-block",P.mode=30;break}if(P.lenbits=9,$={bits:P.lenbits},et=d(f,P.lens,0,P.nlen,P.lencode,0,P.work,$),P.lenbits=$.bits,et){k.msg="invalid literal/lengths set",P.mode=30;break}if(P.distbits=6,P.distcode=P.distdyn,$={bits:P.distbits},et=d(p,P.lens,P.nlen,P.ndist,P.distcode,0,P.work,$),P.distbits=$.bits,et){k.msg="invalid distances set",P.mode=30;break}if(P.mode=20,H===6)break t;case 20:P.mode=21;case 21:if(6<=rt&&258<=at){k.next_out=j,k.avail_out=at,k.next_in=ot,k.avail_in=rt,P.hold=q,P.bits=tt,u(k,Q),j=k.next_out,nt=k.output,at=k.avail_out,ot=k.next_in,Z=k.input,rt=k.avail_in,q=P.hold,tt=P.bits,P.mode===12&&(P.back=-1);break}for(P.back=0;It=(M=P.lencode[q&(1<<P.lenbits)-1])>>>16&255,kt=65535&M,!((Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(It&&!(240&It)){for(st=Pt,yt=It,xt=kt;It=(M=P.lencode[xt+((q&(1<<st+yt)-1)>>st)])>>>16&255,kt=65535&M,!(st+(Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}q>>>=st,tt-=st,P.back+=st}if(q>>>=Pt,tt-=Pt,P.back+=Pt,P.length=kt,It===0){P.mode=26;break}if(32&It){P.back=-1,P.mode=12;break}if(64&It){k.msg="invalid literal/length code",P.mode=30;break}P.extra=15&It,P.mode=22;case 22:if(P.extra){for(C=P.extra;tt<C;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}P.length+=q&(1<<P.extra)-1,q>>>=P.extra,tt-=P.extra,P.back+=P.extra}P.was=P.length,P.mode=23;case 23:for(;It=(M=P.distcode[q&(1<<P.distbits)-1])>>>16&255,kt=65535&M,!((Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(!(240&It)){for(st=Pt,yt=It,xt=kt;It=(M=P.distcode[xt+((q&(1<<st+yt)-1)>>st)])>>>16&255,kt=65535&M,!(st+(Pt=M>>>24)<=tt);){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}q>>>=st,tt-=st,P.back+=st}if(q>>>=Pt,tt-=Pt,P.back+=Pt,64&It){k.msg="invalid distance code",P.mode=30;break}P.offset=kt,P.extra=15&It,P.mode=24;case 24:if(P.extra){for(C=P.extra;tt<C;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}P.offset+=q&(1<<P.extra)-1,q>>>=P.extra,tt-=P.extra,P.back+=P.extra}if(P.offset>P.dmax){k.msg="invalid distance too far back",P.mode=30;break}P.mode=25;case 25:if(at===0)break t;if(it=Q-at,P.offset>it){if((it=P.offset-it)>P.whave&&P.sane){k.msg="invalid distance too far back",P.mode=30;break}wt=it>P.wnext?(it-=P.wnext,P.wsize-it):P.wnext-it,it>P.length&&(it=P.length),St=P.window}else St=nt,wt=j-P.offset,it=P.length;for(at<it&&(it=at),at-=it,P.length-=it;nt[j++]=St[wt++],--it;);P.length===0&&(P.mode=21);break;case 26:if(at===0)break t;nt[j++]=P.length,at--,P.mode=21;break;case 27:if(P.wrap){for(;tt<32;){if(rt===0)break t;rt--,q|=Z[ot++]<<tt,tt+=8}if(Q-=at,k.total_out+=Q,P.total+=Q,Q&&(k.adler=P.check=P.flags?c(P.check,nt,Q,j-Q):l(P.check,nt,Q,j-Q)),Q=at,(P.flags?q:v(q))!==P.check){k.msg="incorrect data check",P.mode=30;break}tt=q=0}P.mode=28;case 28:if(P.wrap&&P.flags){for(;tt<32;){if(rt===0)break t;rt--,q+=Z[ot++]<<tt,tt+=8}if(q!==(4294967295&P.total)){k.msg="incorrect length check",P.mode=30;break}tt=q=0}P.mode=29;case 29:et=1;break t;case 30:et=-3;break t;case 31:return-4;case 32:default:return m}return k.next_out=j,k.avail_out=at,k.next_in=ot,k.avail_in=rt,P.hold=q,P.bits=tt,(P.wsize||Q!==k.avail_out&&P.mode<30&&(P.mode<27||H!==4))&&W(k,k.output,k.next_out,Q-k.avail_out)?(P.mode=31,-4):(Lt-=k.avail_in,Q-=k.avail_out,k.total_in+=Lt,k.total_out+=Q,P.total+=Q,P.wrap&&Q&&(k.adler=P.check=P.flags?c(P.check,nt,Q,k.next_out-Q):l(P.check,nt,Q,k.next_out-Q)),k.data_type=P.bits+(P.last?64:0)+(P.mode===12?128:0)+(P.mode===20||P.mode===15?256:0),(Lt==0&&Q===0||H===4)&&et===_&&(et=-5),et)},s.inflateEnd=function(k){if(!k||!k.state)return m;var H=k.state;return H.window&&(H.window=null),k.state=null,_},s.inflateGetHeader=function(k,H){var P;return k&&k.state&&2&(P=k.state).wrap?((P.head=H).done=!1,_):m},s.inflateSetDictionary=function(k,H){var P,Z=H.length;return k&&k.state?(P=k.state).wrap!==0&&P.mode!==11?m:P.mode===11&&l(1,H,Z,0)!==P.check?-3:W(k,H,Z,Z)?(P.mode=31,-4):(P.havedict=1,_):m},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,p,_,m,x,y,g,v){var S,w,E,N,U,O,F,I,R,W=v.bits,k=0,H=0,P=0,Z=0,nt=0,ot=0,j=0,rt=0,at=0,q=0,tt=null,Lt=0,Q=new o.Buf16(16),it=new o.Buf16(16),wt=null,St=0;for(k=0;k<=15;k++)Q[k]=0;for(H=0;H<m;H++)Q[p[_+H]]++;for(nt=W,Z=15;1<=Z&&Q[Z]===0;Z--);if(Z<nt&&(nt=Z),Z===0)return x[y++]=20971520,x[y++]=20971520,v.bits=1,0;for(P=1;P<Z&&Q[P]===0;P++);for(nt<P&&(nt=P),k=rt=1;k<=15;k++)if(rt<<=1,(rt-=Q[k])<0)return-1;if(0<rt&&(f===0||Z!==1))return-1;for(it[1]=0,k=1;k<15;k++)it[k+1]=it[k]+Q[k];for(H=0;H<m;H++)p[_+H]!==0&&(g[it[p[_+H]]++]=H);if(O=f===0?(tt=wt=g,19):f===1?(tt=l,Lt-=257,wt=c,St-=257,256):(tt=u,wt=d,-1),k=P,U=y,j=H=q=0,E=-1,N=(at=1<<(ot=nt))-1,f===1&&852<at||f===2&&592<at)return 1;for(;;){for(F=k-j,R=g[H]<O?(I=0,g[H]):g[H]>O?(I=wt[St+g[H]],tt[Lt+g[H]]):(I=96,0),S=1<<k-j,P=w=1<<ot;x[U+(q>>j)+(w-=S)]=F<<24|I<<16|R|0,w!==0;);for(S=1<<k-1;q&S;)S>>=1;if(S!==0?(q&=S-1,q+=S):q=0,H++,--Q[k]==0){if(k===Z)break;k=p[_+g[H]]}if(nt<k&&(q&N)!==E){for(j===0&&(j=nt),U+=P,rt=1<<(ot=k-j);ot+j<Z&&!((rt-=Q[ot+j])<=0);)ot++,rt<<=1;if(at+=1<<ot,f===1&&852<at||f===2&&592<at)return 1;x[E=q&N]=nt<<24|ot<<16|U-y|0}}return q!==0&&(x[U+q]=k-j<<24|64<<16|0),v.bits=nt,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function u(M){for(var B=M.length;0<=--B;)M[B]=0}var d=0,f=29,p=256,_=p+1+f,m=30,x=19,y=2*_+1,g=15,v=16,S=7,w=256,E=16,N=17,U=18,O=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],F=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],R=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],W=new Array(2*(_+2));u(W);var k=new Array(2*m);u(k);var H=new Array(512);u(H);var P=new Array(256);u(P);var Z=new Array(f);u(Z);var nt,ot,j,rt=new Array(m);function at(M,B,X,J,G){this.static_tree=M,this.extra_bits=B,this.extra_base=X,this.elems=J,this.max_length=G,this.has_stree=M&&M.length}function q(M,B){this.dyn_tree=M,this.max_code=0,this.stat_desc=B}function tt(M){return M<256?H[M]:H[256+(M>>>7)]}function Lt(M,B){M.pending_buf[M.pending++]=255&B,M.pending_buf[M.pending++]=B>>>8&255}function Q(M,B,X){M.bi_valid>v-X?(M.bi_buf|=B<<M.bi_valid&65535,Lt(M,M.bi_buf),M.bi_buf=B>>v-M.bi_valid,M.bi_valid+=X-v):(M.bi_buf|=B<<M.bi_valid&65535,M.bi_valid+=X)}function it(M,B,X){Q(M,X[2*B],X[2*B+1])}function wt(M,B){for(var X=0;X|=1&M,M>>>=1,X<<=1,0<--B;);return X>>>1}function St(M,B,X){var J,G,ft=new Array(g+1),lt=0;for(J=1;J<=g;J++)ft[J]=lt=lt+X[J-1]<<1;for(G=0;G<=B;G++){var pt=M[2*G+1];pt!==0&&(M[2*G]=wt(ft[pt]++,pt))}}function Pt(M){var B;for(B=0;B<_;B++)M.dyn_ltree[2*B]=0;for(B=0;B<m;B++)M.dyn_dtree[2*B]=0;for(B=0;B<x;B++)M.bl_tree[2*B]=0;M.dyn_ltree[2*w]=1,M.opt_len=M.static_len=0,M.last_lit=M.matches=0}function It(M){8<M.bi_valid?Lt(M,M.bi_buf):0<M.bi_valid&&(M.pending_buf[M.pending++]=M.bi_buf),M.bi_buf=0,M.bi_valid=0}function kt(M,B,X,J){var G=2*B,ft=2*X;return M[G]<M[ft]||M[G]===M[ft]&&J[B]<=J[X]}function st(M,B,X){for(var J=M.heap[X],G=X<<1;G<=M.heap_len&&(G<M.heap_len&&kt(B,M.heap[G+1],M.heap[G],M.depth)&&G++,!kt(B,J,M.heap[G],M.depth));)M.heap[X]=M.heap[G],X=G,G<<=1;M.heap[X]=J}function yt(M,B,X){var J,G,ft,lt,pt=0;if(M.last_lit!==0)for(;J=M.pending_buf[M.d_buf+2*pt]<<8|M.pending_buf[M.d_buf+2*pt+1],G=M.pending_buf[M.l_buf+pt],pt++,J===0?it(M,G,B):(it(M,(ft=P[G])+p+1,B),(lt=O[ft])!==0&&Q(M,G-=Z[ft],lt),it(M,ft=tt(--J),X),(lt=F[ft])!==0&&Q(M,J-=rt[ft],lt)),pt<M.last_lit;);it(M,w,B)}function xt(M,B){var X,J,G,ft=B.dyn_tree,lt=B.stat_desc.static_tree,pt=B.stat_desc.has_stree,Tt=B.stat_desc.elems,Et=-1;for(M.heap_len=0,M.heap_max=y,X=0;X<Tt;X++)ft[2*X]!==0?(M.heap[++M.heap_len]=Et=X,M.depth[X]=0):ft[2*X+1]=0;for(;M.heap_len<2;)ft[2*(G=M.heap[++M.heap_len]=Et<2?++Et:0)]=1,M.depth[G]=0,M.opt_len--,pt&&(M.static_len-=lt[2*G+1]);for(B.max_code=Et,X=M.heap_len>>1;1<=X;X--)st(M,ft,X);for(G=Tt;X=M.heap[1],M.heap[1]=M.heap[M.heap_len--],st(M,ft,1),J=M.heap[1],M.heap[--M.heap_max]=X,M.heap[--M.heap_max]=J,ft[2*G]=ft[2*X]+ft[2*J],M.depth[G]=(M.depth[X]>=M.depth[J]?M.depth[X]:M.depth[J])+1,ft[2*X+1]=ft[2*J+1]=G,M.heap[1]=G++,st(M,ft,1),2<=M.heap_len;);M.heap[--M.heap_max]=M.heap[1],function(At,Ht){var zt,Dt,Kt,Vt,oe,ae,te=Ht.dyn_tree,Ft=Ht.max_code,D=Ht.stat_desc.static_tree,ht=Ht.stat_desc.has_stree,Mt=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,Nt=Ht.stat_desc.max_length,re=0;for(Vt=0;Vt<=g;Vt++)At.bl_count[Vt]=0;for(te[2*At.heap[At.heap_max]+1]=0,zt=At.heap_max+1;zt<y;zt++)Nt<(Vt=te[2*te[2*(Dt=At.heap[zt])+1]+1]+1)&&(Vt=Nt,re++),te[2*Dt+1]=Vt,Ft<Dt||(At.bl_count[Vt]++,oe=0,Rt<=Dt&&(oe=Mt[Dt-Rt]),ae=te[2*Dt],At.opt_len+=ae*(Vt+oe),ht&&(At.static_len+=ae*(D[2*Dt+1]+oe)));if(re!==0){do{for(Vt=Nt-1;At.bl_count[Vt]===0;)Vt--;At.bl_count[Vt]--,At.bl_count[Vt+1]+=2,At.bl_count[Nt]--,re-=2}while(0<re);for(Vt=Nt;Vt!==0;Vt--)for(Dt=At.bl_count[Vt];Dt!==0;)Ft<(Kt=At.heap[--zt])||(te[2*Kt+1]!==Vt&&(At.opt_len+=(Vt-te[2*Kt+1])*te[2*Kt],te[2*Kt+1]=Vt),Dt--)}}(M,B),St(ft,Et,M.bl_count)}function T(M,B,X){var J,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),B[2*(X+1)+1]=65535,J=0;J<=X;J++)G=lt,lt=B[2*(J+1)+1],++pt<Tt&&G===lt||(pt<Et?M.bl_tree[2*G]+=pt:G!==0?(G!==ft&&M.bl_tree[2*G]++,M.bl_tree[2*E]++):pt<=10?M.bl_tree[2*N]++:M.bl_tree[2*U]++,ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4))}function et(M,B,X){var J,G,ft=-1,lt=B[1],pt=0,Tt=7,Et=4;for(lt===0&&(Tt=138,Et=3),J=0;J<=X;J++)if(G=lt,lt=B[2*(J+1)+1],!(++pt<Tt&&G===lt)){if(pt<Et)for(;it(M,G,M.bl_tree),--pt!=0;);else G!==0?(G!==ft&&(it(M,G,M.bl_tree),pt--),it(M,E,M.bl_tree),Q(M,pt-3,2)):pt<=10?(it(M,N,M.bl_tree),Q(M,pt-3,3)):(it(M,U,M.bl_tree),Q(M,pt-11,7));ft=G,Et=(pt=0)===lt?(Tt=138,3):G===lt?(Tt=6,3):(Tt=7,4)}}u(rt);var $=!1;function C(M,B,X,J){Q(M,(d<<1)+(J?1:0),3),function(G,ft,lt,pt){It(G),Lt(G,lt),Lt(G,~lt),o.arraySet(G.pending_buf,G.window,ft,lt,G.pending),G.pending+=lt}(M,B,X)}s._tr_init=function(M){$||(function(){var B,X,J,G,ft,lt=new Array(g+1);for(G=J=0;G<f-1;G++)for(Z[G]=J,B=0;B<1<<O[G];B++)P[J++]=G;for(P[J-1]=G,G=ft=0;G<16;G++)for(rt[G]=ft,B=0;B<1<<F[G];B++)H[ft++]=G;for(ft>>=7;G<m;G++)for(rt[G]=ft<<7,B=0;B<1<<F[G]-7;B++)H[256+ft++]=G;for(X=0;X<=g;X++)lt[X]=0;for(B=0;B<=143;)W[2*B+1]=8,B++,lt[8]++;for(;B<=255;)W[2*B+1]=9,B++,lt[9]++;for(;B<=279;)W[2*B+1]=7,B++,lt[7]++;for(;B<=287;)W[2*B+1]=8,B++,lt[8]++;for(St(W,_+1,lt),B=0;B<m;B++)k[2*B+1]=5,k[2*B]=wt(B,5);nt=new at(W,O,p+1,_,g),ot=new at(k,F,0,m,g),j=new at(new Array(0),I,0,x,S)}(),$=!0),M.l_desc=new q(M.dyn_ltree,nt),M.d_desc=new q(M.dyn_dtree,ot),M.bl_desc=new q(M.bl_tree,j),M.bi_buf=0,M.bi_valid=0,Pt(M)},s._tr_stored_block=C,s._tr_flush_block=function(M,B,X,J){var G,ft,lt=0;0<M.level?(M.strm.data_type===2&&(M.strm.data_type=function(pt){var Tt,Et=4093624447;for(Tt=0;Tt<=31;Tt++,Et>>>=1)if(1&Et&&pt.dyn_ltree[2*Tt]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Tt=32;Tt<p;Tt++)if(pt.dyn_ltree[2*Tt]!==0)return c;return l}(M)),xt(M,M.l_desc),xt(M,M.d_desc),lt=function(pt){var Tt;for(T(pt,pt.dyn_ltree,pt.l_desc.max_code),T(pt,pt.dyn_dtree,pt.d_desc.max_code),xt(pt,pt.bl_desc),Tt=x-1;3<=Tt&&pt.bl_tree[2*R[Tt]+1]===0;Tt--);return pt.opt_len+=3*(Tt+1)+5+5+4,Tt}(M),G=M.opt_len+3+7>>>3,(ft=M.static_len+3+7>>>3)<=G&&(G=ft)):G=ft=X+5,X+4<=G&&B!==-1?C(M,B,X,J):M.strategy===4||ft===G?(Q(M,2+(J?1:0),3),yt(M,W,k)):(Q(M,4+(J?1:0),3),function(pt,Tt,Et,At){var Ht;for(Q(pt,Tt-257,5),Q(pt,Et-1,5),Q(pt,At-4,4),Ht=0;Ht<At;Ht++)Q(pt,pt.bl_tree[2*R[Ht]+1],3);et(pt,pt.dyn_ltree,Tt-1),et(pt,pt.dyn_dtree,Et-1)}(M,M.l_desc.max_code+1,M.d_desc.max_code+1,lt+1),yt(M,M.dyn_ltree,M.dyn_dtree)),Pt(M),J&&It(M)},s._tr_tally=function(M,B,X){return M.pending_buf[M.d_buf+2*M.last_lit]=B>>>8&255,M.pending_buf[M.d_buf+2*M.last_lit+1]=255&B,M.pending_buf[M.l_buf+M.last_lit]=255&X,M.last_lit++,B===0?M.dyn_ltree[2*X]++:(M.matches++,B--,M.dyn_ltree[2*(P[X]+p+1)]++,M.dyn_dtree[2*tt(B)]++),M.last_lit===M.lit_bufsize-1},s._tr_align=function(M){Q(M,2,3),it(M,w,W),function(B){B.bi_valid===16?(Lt(B,B.bi_buf),B.bi_buf=0,B.bi_valid=0):8<=B.bi_valid&&(B.pending_buf[B.pending++]=255&B.bi_buf,B.bi_buf>>=8,B.bi_valid-=8)}(M)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var u,d,f,p,_=1,m={},x=!1,y=l.document,g=Object.getPrototypeOf&&Object.getPrototypeOf(l);g=g&&g.setTimeout?g:l,u={}.toString.call(l.process)==="[object process]"?function(E){process.nextTick(function(){S(E)})}:function(){if(l.postMessage&&!l.importScripts){var E=!0,N=l.onmessage;return l.onmessage=function(){E=!1},l.postMessage("","*"),l.onmessage=N,E}}()?(p="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",w,!1):l.attachEvent("onmessage",w),function(E){l.postMessage(p+E,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(E){S(E.data)},function(E){f.port2.postMessage(E)}):y&&"onreadystatechange"in y.createElement("script")?(d=y.documentElement,function(E){var N=y.createElement("script");N.onreadystatechange=function(){S(E),N.onreadystatechange=null,d.removeChild(N),N=null},d.appendChild(N)}):function(E){setTimeout(S,0,E)},g.setImmediate=function(E){typeof E!="function"&&(E=new Function(""+E));for(var N=new Array(arguments.length-1),U=0;U<N.length;U++)N[U]=arguments[U+1];var O={callback:E,args:N};return m[_]=O,u(_),_++},g.clearImmediate=v}function v(E){delete m[E]}function S(E){if(x)setTimeout(S,0,E);else{var N=m[E];if(N){x=!0;try{(function(U){var O=U.callback,F=U.args;switch(F.length){case 0:O();break;case 1:O(F[0]);break;case 2:O(F[0],F[1]);break;case 3:O(F[0],F[1],F[2]);break;default:O.apply(c,F)}})(N)}finally{v(E),x=!1}}}}function w(E){E.source===l&&typeof E.data=="string"&&E.data.indexOf(p)===0&&S(+E.data.slice(p.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof Is<"u"?Is:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(kf);var hb=kf.exports;const db=xd(hb);async function fb(r){if(!bt.tg||!bt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(bt.tg.traverse(m=>{if(!(m instanceof Ie))return;const x=m.geometry.clone();m.updateWorldMatrix(!0,!1),x.applyMatrix4(m.matrixWorld);const y=x.attributes.position,g=x.index;if(!y||y.count<3){x.dispose();return}let v="E4DFD8";const S=Array.isArray(m.material)?m.material[0]:m.material;S&&"color"in S&&(v=S.color.getHexString().toUpperCase());let w="";for(let N=0;N<y.count;N++)w+=`<vertex x="${y.getX(N).toFixed(4)}" y="${y.getZ(N).toFixed(4)}" z="${y.getY(N).toFixed(4)}"/>`;let E="";if(g)for(let N=0;N<g.count;N+=3)E+=`<triangle v1="${g.getX(N)}" v2="${g.getX(N+1)}" v3="${g.getX(N+2)}"/>`;else for(let N=0;N<y.count;N+=3)E+=`<triangle v1="${N}" v2="${N+1}" v3="${N+2}"/>`;x.dispose(),E&&t.push({id:e++,name:m.name||"mesh",col:v,vx:w,tr:E})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(m=>`<basematerials id="${m.id+1e3}"><base name="${m.name}" displaycolor="#${m.col}"/></basematerials>`).join(`
`),s=t.map(m=>`<object id="${m.id}" type="model" p:pid="${m.id+1e3}" p:pindex="0"><mesh><vertices>${m.vx}</vertices><triangles>${m.tr}</triangles></mesh></object>`).join(`
`),o=t.map(m=>`<item objectid="${m.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),u=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),d=new db;d.file("[Content_Types].xml",u),d.folder("_rels").file(".rels",c),d.folder("3D").file("3dmodel.model",l);const f=await d.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),p=URL.createObjectURL(f),_=document.createElement("a");_.href=p,_.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(_),_.click(),document.body.removeChild(_),URL.revokeObjectURL(p)}let Zn=null,Xn=null,Cn=null,dn=null,pd="",hn=null,yn=null,ei=null,oc="",ac=[],md="";const Se={1:"#c0af88",2:"#e4eee8",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},Js={veg_low:!0,veg_dense:!0,wetland:!0,snow:!0,water:!0,waterways:!0,gpx:!0,gpx_line:!0},On={};let zf=1,Bf=1;const Ff=[];let Aa=[],Ca=!1,fa="",Ac=200,Cc=200,Hf=2,Vf=1,os=null,pa=null,lc=[],rr=null,Re=null,jr=null,Rs=null,Lc=!1;const Qs=256,pb=2048;let cc=[];const Yr=[];function Gf(){if(!Re||!jr)return!1;const r=jr.getBoundingClientRect();return!r.width||!r.height?!1:(Re.style.left=`${r.left}px`,Re.style.top=`${r.top}px`,Re.style.width=`${r.width}px`,Re.style.height=`${r.height}px`,Zn&&(Zn.setSize(r.width,r.height,!1),Cn.aspect=r.width/r.height,Cn.updateProjectionMatrix()),!0)}function gd(){if(!Re||!Lc)return;Gf()&&Re.style.display==="none"&&(Re.style.display="block")}function ma(r){if(Re||(Re=document.getElementById("dims-canvas")),jr!==r&&(Rs&&jr&&Rs.unobserve(jr),jr=r,Rs||(Rs=new ResizeObserver(gd),window.addEventListener("resize",gd)),Rs.observe(r)),Lc=!0,Gf()&&Re&&(Re.style.display="block"),Zn)return;const t=r.getBoundingClientRect(),e=t.width||800,n=t.height||600;Zn=new sf({canvas:Re,antialias:!0}),Zn.setPixelRatio(Math.min(window.devicePixelRatio,2)),Zn.setSize(e,n,!1),Xn=new of,Xn.background=new Qt(527380),Cn=new Sn(42,e/n,.1,1e5),dn=new xf(Cn,Re),dn.enableDamping=!0,dn.dampingFactor=.06,Xn.add(new yf(16777215,.8));const s=new nc(16777215,.6);s.position.set(1.5,3,2),Xn.add(s);const o=()=>{requestAnimationFrame(o),dn.update(),Zn.render(Xn,Cn),kb()};o()}function Wf(){Lc=!1,Re&&(Re.style.display="none")}function hr(r){if(Object.assign(Se,r),hn&&(yn&&(yn.dispose(),yn=null),yn=qf(hn.bounds,hn.grid,Qs,hn.minE,hn.elevRange,ac),os)){const l=os.material;l.map=yn,l.needsUpdate=!0}const t=On.base??1;pa&&pa.material.color.set(Se[t]??Se[1]);const e=On.facade??1,n=new Qt(Se[e]??Se[1]);for(const l of lc)l.material.color.set(n);if(rr){const l=On.gpx_line??6,c=Se[l]??"#ff4500";rr.traverse(u=>{const d=u.material;d?.color&&d.color.set(c)}),rr.visible=Js.gpx_line??!0}const s=On.gpx??6,o=Se[s]??"#ff4500";for(const l of Aa)l.traverse(c=>{const u=c.material;u?.color&&u.color.set(o)})}function mb(r,t){On[r]=t,hr({})}function gb(r,t){if(Js[r]=t,r==="gpx_line")rr&&(rr.visible=t);else if(r==="gpx")for(const e of Aa)e.visible=t;else hr({})}function _b(r,t){zf=r,Bf=t}function vb(r){Ca=!0,fa=r,dn&&(dn.enabled=!1),Re&&(Re.style.cursor="crosshair")}function Zf(){Ca=!1,fa="",dn&&(dn.enabled=!0),Re&&(Re.style.cursor="")}function Xf(){return Ca}function yb(r,t){if(!Ca||!Xn||!Cn||!os||!Re)return!1;const e=Re.getBoundingClientRect(),n=(r-e.left)/e.width*2-1,s=-((t-e.top)/e.height)*2+1,o=new s1;o.setFromCamera(new vt(n,s),Cn);const l=o.intersectObject(os);if(l.length>0){const c=l[0].point,u=.5-c.z/Cc,d=.5+c.x/Ac;Ff.push({latFrac:u,lonFrac:d,shape:fa}),jf(u,d,fa)}return Zf(),!0}async function xb(r,t,e){if(!Xn||!Cn||!dn||!Zn)return;const n=`${r.minLat}|${r.maxLat}|${r.minLon}|${r.maxLon}`;n!==pd?(pd=n,hn=null,yn&&(yn.dispose(),yn=null),e(5,"Téléchargement des altitudes…"),hn=await Ob(r),e(35,"Chargement des données géographiques…"),n!==md&&(md=n,ac=await wb(r)),e(70,"Génération de la texture…"),yn=qf(r,hn.grid,Qs,hn.minE,hn.elevRange,ac)):e(50,"Reconstruction…");const o=JSON.stringify(t.zonePts);(o!==oc||!ei)&&(oc=o,ei&&(ei.dispose(),ei=null),ei=Eb(t.zonePts,t.zoneType,r)),e(88,"Construction de la scène 3D…"),to(t),e(100,"")}function to(r){if(!Xn||!Cn||!dn||!hn||!yn)return;Ub();const{wMm:t,dMm:e,baseH:n,exag:s,flatFacade:o,facadeWidthMm:l,gpxPoints:c,zoneType:u,zonePts:d,bounds:f}=r,{grid:p,minE:_,elevRange:m}=hn,x=f??hn.bounds,y=(x.minLat+x.maxLat)/2,g=(x.maxLon-x.minLon)*Math.cos(y*Math.PI/180)*111320,v=(x.maxLat-x.minLat)*111320,S=Math.max(g,v),w=Math.max(t,e),E=Math.max(1,Math.min(w*.5,m/S*w*s)),N=n+E,U=Qs,O=Tb(d,u,x,t,e),F=Math.max(1,l);os=null,pa=null,lc=[],rr=null,Aa=[];{const nt=new $s(t,e,U-1,U-1);nt.rotateX(-Math.PI/2);const ot=nt.attributes.position;for(let rt=0;rt<ot.count;rt++)ot.setY(rt,n+(p[rt]-_)/m*E);ot.needsUpdate=!0,nt.computeVertexNormals();const j=new Ie(nt,new Fs({map:yn,alphaMap:ei??void 0,transparent:!!ei}));os=j,Wr(j)}const I=On.base??1,R=new Qt(Se[I]??Se[1]),W=new Ie(Ab(O,u,t,e,n,F),new Fs({color:R,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}));pa=W,Wr(W);const k=On.facade??1,H=new Qt(Se[k]??Se[1]),P=new Fs({color:H,side:vn});for(const nt of Cb(O,u,t,e,F,o,N,p,U,_,m,n,E))nt.material=P,lc.push(nt),Wr(nt);if(c.length>=2){const nt=Ib(c,x,t,e,p,U,_,m,n,E);nt&&(nt.visible=Js.gpx_line??!0,rr=nt,Wr(nt))}{const nt=new Ex(new kx(new je(t+F*2,N,e+F*2)),new vc({color:16718362}));nt.position.y=N/2,Wr(nt)}Yr.length=0,Yr.push({id:"dl-width",v:new K(0,2,e/2+F+14)}),Yr.push({id:"dl-depth",v:new K(t/2+F+14,N*.1,0)}),Yr.push({id:"dl-height",v:new K(-t/2-F-12,N/2,e/2+8)}),Hr("dl-width",`${t} mm`),Hr("dl-depth",`${e} mm`),Hr("dl-height",`~${Math.round(N*10)/10} mm`),Hr("dp-total-val",`~${Math.round(N*10)/10}`),Hr("dp-map-h",`~${Math.round(E*10)/10}`),Hr("dp-base-h-disp",`${n}`),Ac=t,Cc=e,Hf=n,Vf=E;for(const nt of Ff)jf(nt.latFrac,nt.lonFrac,nt.shape);const Z=Math.sqrt(t*t+e*e);if(dn.target.lengthSq()<.1){Cn.position.set(t*.7,N+Z*.44,e*.92);const nt=new K(0,N*.2,0);Cn.lookAt(nt),dn.target.copy(nt),dn.update()}}function bb(){dn&&dn.target.set(0,0,0),yn&&(yn.dispose(),yn=null),ei&&(ei.dispose(),ei=null),oc=""}async function wb(r){const{minLat:t,minLon:e,maxLat:n,maxLon:s}=r,o=`(${t},${e},${n},${s})`,l=`[out:json][timeout:28];
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
out geom;`,c=new AbortController,u=setTimeout(()=>c.abort(),22e3);try{const d=await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(l)}`,{signal:c.signal});return clearTimeout(u),(await d.json()).elements??[]}catch{return clearTimeout(u),[]}}const Mb=[{id:"veg_low",match:r=>r.natural==="grassland"||r.landuse==="meadow"||r.landuse==="grass"||r.landuse==="farmland"||r.natural==="fell"||r.natural==="moor"||r.natural==="heath"||r.natural==="scrub",slot:3,fill:!0},{id:"veg_dense",match:r=>r.natural==="wood"||r.landuse==="forest",slot:4,fill:!0},{id:"wetland",match:r=>r.natural==="wetland"||r.natural==="mud",slot:3,fill:!0},{id:"snow",match:r=>r.natural==="glacier"||r.natural==="snow",slot:2,fill:!0},{id:"water",match:r=>r.natural==="water"||r.waterway==="riverbank",slot:5,fill:!0},{id:"waterways",match:r=>!!r.waterway&&r.waterway!=="riverbank",slot:5,fill:!1}];function Sb(r,t){const e=n=>{if(n.length<3)return 0;let s=0;for(let o=0,l=n.length-1;o<n.length;l=o++)s+=(n[l].lon+n[o].lon)*(n[l].lat-n[o].lat);return Math.abs(s)/2*(t*111320)*111320};return r.type==="way"&&r.geometry?e(r.geometry):r.type==="relation"&&r.members?r.members.filter(n=>n.role==="outer"&&n.geometry).reduce((n,s)=>n+e(s.geometry),0):0}function qf(r,t,e,n,s,o){const l=pb,c=document.createElement("canvas");c.width=c.height=l;const u=c.getContext("2d"),d=u.createImageData(l,l),f=d.data;for(let g=0;g<l;g++)for(let v=0;v<l;v++){const S=v/(l-1)*(e-1),w=g/(l-1)*(e-1),E=Math.min(e-2,Math.floor(S)),N=Math.min(e-2,Math.floor(w)),U=S-E,O=w-N,F=t[N*e+E]*(1-U)*(1-O)+t[N*e+E+1]*U*(1-O)+t[(N+1)*e+E]*(1-U)*O+t[(N+1)*e+E+1]*U*O,I=Math.max(0,Math.min(1,(F-n)/s)),[R,W,k]=Nb(I),H=(g*l+v)*4;f[H]=R,f[H+1]=W,f[H+2]=k,f[H+3]=255}u.putImageData(d,0,0);const p=document.getElementById("cp-filter"),_=p?Number(p.value):100,m=Math.cos((r.minLat+r.maxLat)/2*Math.PI/180),x=(r.maxLon-r.minLon)*m*111320*(r.maxLat-r.minLat)*111320,y=Math.pow(1-_/100,2)*.02*x;for(const g of Mb){if(!Js[g.id])continue;const v=o.filter(E=>!E.tags||!g.match(E.tags)?!1:!g.fill||y<=0?!0:Sb(E,m)>=y);if(!v.length)continue;const S=On[g.id]??g.slot,w=Se[S]??"#888";if(g.fill){u.beginPath();for(const E of v)_d(u,E,r,l);u.fillStyle=w,u.fill("evenodd")}else for(const E of v){if(!E.tags)continue;const N=E.tags.waterway??"",U=N==="river"?7:N==="canal"?5:N==="stream"?2.5:1.5;u.beginPath(),_d(u,E,r,l),u.strokeStyle=w,u.lineWidth=U,u.lineCap="round",u.lineJoin="round",u.stroke()}}return new lf(c)}function _d(r,t,e,n){const s=o=>{if(!(!o||o.length<2)){for(let l=0;l<o.length;l++){const c=(o[l].lon-e.minLon)/(e.maxLon-e.minLon)*n,u=(1-(o[l].lat-e.minLat)/(e.maxLat-e.minLat))*n;l===0?r.moveTo(c,u):r.lineTo(c,u)}r.closePath()}};if(t.type==="way"&&t.geometry)s(t.geometry);else if(t.type==="relation"&&t.members)for(const o of t.members)o.role==="outer"&&o.geometry&&s(o.geometry)}function Eb(r,t,e,n,s){if(!r||r.length<3||t==="rect"||t==="sq")return null;const o=512,l=document.createElement("canvas");l.width=l.height=o;const c=l.getContext("2d");c.fillStyle="black",c.fillRect(0,0,o,o),c.fillStyle="white",c.beginPath();for(let u=0;u<r.length;u++){const[d,f]=r[u],p=(f-e.minLon)/(e.maxLon-e.minLon)*o,_=(1-(d-e.minLat)/(e.maxLat-e.minLat))*o;u===0?c.moveTo(p,_):c.lineTo(p,_)}return c.closePath(),c.fill(),new lf(l)}function Tb(r,t,e,n,s){return!r||r.length<3||t==="rect"||t==="sq"?[[-n/2,-s/2],[n/2,-s/2],[n/2,s/2],[-n/2,s/2]]:r.map(([o,l])=>[(l-e.minLon)/(e.maxLon-e.minLon)*n-n/2,(1-(o-e.minLat)/(e.maxLat-e.minLat))*s-s/2])}function Ab(r,t,e,n,s,o){if(t==="rect"||t==="sq"){const u=new je(e+o*2,s,n+o*2);return u.translate(0,s/2,0),u}const l=new wc;if(t==="circ"){const u=e/2+o,d=n/2+o;for(let f=0;f<=64;f++){const p=f/64*Math.PI*2;f===0?l.moveTo(Math.cos(p)*u,Math.sin(p)*d):l.lineTo(Math.cos(p)*u,Math.sin(p)*d)}}else{l.moveTo(r[0][0],r[0][1]);for(let u=1;u<r.length;u++)l.lineTo(r[u][0],r[u][1]);l.closePath()}const c=new Ta(l,{depth:s,bevelEnabled:!1});return c.rotateX(-Math.PI/2),c}function Cb(r,t,e,n,s,o,l,c,u,d,f,p,_){const m=(y,g)=>{const v=Math.max(0,Math.min(1,(y+e/2)/e)),S=Math.max(0,Math.min(1,(g+n/2)/n)),w=v*(u-1),E=S*(u-1),N=Math.min(u-2,Math.floor(w)),U=Math.min(u-2,Math.floor(E)),O=w-N,F=E-U,I=c[U*u+N]*(1-O)*(1-F)+c[U*u+N+1]*O*(1-F)+c[(U+1)*u+N]*(1-O)*F+c[(U+1)*u+N+1]*O*F;return p+(I-d)/f*_};return t==="rect"||t==="sq"?o?Lb(e,n,s,l):Pb(e,n,s,u,c,d,f,p,_):Rb(r,s,o?()=>l:m)}function Lb(r,t,e,n){const s=(o,l,c,u,d)=>{const f=new Ie(new je(o,l,c));return f.position.set(u,l/2,d),f};return[s(r+e*2,n,e,0,t/2+e/2),s(r+e*2,n,e,0,-t/2-e/2),s(e,n,t,r/2+e/2,0),s(e,n,t,-r/2-e/2,0)]}function Pb(r,t,e,n,s,o,l,c,u){const d=(S,w)=>c+(s[w*n+S]-o)/l*u,f=Math.min(n-1,64),p=S=>Math.round(S/f*(n-1)),_=d(0,n-1),m=d(n-1,n-1),x=d(0,0),y=d(n-1,0),g=[[-r/2-e,t/2,_],...Array.from({length:f+1},(S,w)=>{const E=p(w);return[-r/2+E/(n-1)*r,t/2,d(E,n-1)]}),[r/2+e,t/2,m]],v=[[r/2+e,-t/2,y],...Array.from({length:f+1},(S,w)=>{const E=p(w);return[r/2-E/(n-1)*r,-t/2,d(n-1-E,0)]}),[-r/2-e,-t/2,x]];return[Os(g,[0,0,1],e),Os(v,[0,0,-1],e),Os(Array.from({length:f+1},(S,w)=>{const E=p(w);return[r/2,t/2-E/(n-1)*t,d(n-1,n-1-E)]}),[1,0,0],e),Os(Array.from({length:f+1},(S,w)=>{const E=p(w);return[-r/2,-t/2+E/(n-1)*t,d(0,E)]}),[-1,0,0],e)]}function Rb(r,t,e){const n=[],s=r.length;for(let o=0;o<s;o++){const[l,c]=r[o],[u,d]=r[(o+1)%s],f=u-l,p=d-c,_=Math.sqrt(f*f+p*p);if(_<.5)continue;const m=p/_,x=-f/_,y=Math.max(2,Math.round(_/3)),g=[];for(let v=0;v<=y;v++){const S=v/y,w=l+f*S,E=c+p*S;g.push([w,E,e(w,E)])}n.push(Os(g,[m,0,x],t))}return n}function Os(r,t,e){const n=r.length,[s,,o]=t,l=[],c=[];for(const[m,x,y]of r)l.push(m+s*e,0,x+o*e),l.push(m+s*e,y,x+o*e);for(const[m,x,y]of r)l.push(m,0,x),l.push(m,y,x);for(const[m,x,y]of r)l.push(m+s*e,y,x+o*e),l.push(m,y,x);for(const[m,x]of r)l.push(m+s*e,0,x+o*e),l.push(m,0,x);const u=0,d=n*2,f=n*4,p=n*6;for(let m=0;m<n-1;m++){const x=m*2;c.push(u+x,u+x+2,u+x+1,u+x+1,u+x+2,u+x+3),c.push(d+x,d+x+1,d+x+2,d+x+1,d+x+3,d+x+2),c.push(f+x,f+x+1,f+x+2,f+x+1,f+x+3,f+x+2),c.push(p+x,p+x+2,p+x+1,p+x+1,p+x+2,p+x+3)}const _=new Oe;return _.setAttribute("position",new me(l,3)),_.setIndex(c),_.computeVertexNormals(),new Ie(_)}function jf(r,t,e){if(!hn||!Xn)return;const{grid:n,minE:s,elevRange:o}=hn,l=Qs,c=Ac,u=Cc,d=Hf,f=Vf,p=t,_=1-r,m=(p-.5)*c,x=(.5-(1-_))*u,y=p*(l-1),g=_*(l-1),v=Math.min(l-2,Math.floor(y)),S=Math.min(l-2,Math.floor(g)),w=y-v,E=g-S,N=n[S*l+v]*(1-w)*(1-E)+n[S*l+v+1]*w*(1-E)+n[(S+1)*l+v]*(1-w)*E+n[(S+1)*l+v+1]*w*E,U=d+(N-s)/o*f,O=3,F=On.gpx??6,I=Se[F]??"#ff4500",R=new Fs({color:I});let W;switch(e){case"square":W=new je(O*2,O*3,O*2);break;case"diamond":W=new Mc(O*1.4);break;case"triangle":W=new Sa(O,O*3,4);break;case"cross":W=new je(O*.7,O*3,O*.7);break;case"heart":case"star":default:W=new ss(O*.5,O,O*3,16);break}const k=new Ie(W,R);if(k.position.set(m,U+O*1.5,x),k.visible=Js.gpx??!0,e==="cross"){const H=new Ie(new je(O*2.5,O*.7,O*.7),R);H.position.y=O*.8,k.add(H)}Wr(k),Aa.push(k)}function Ib(r,t,e,n,s,o,l,c,u,d){const f=[];for(const x of r){const y=(x.lon-t.minLon)/(t.maxLon-t.minLon),g=(x.lat-t.minLat)/(t.maxLat-t.minLat);if(y<0||y>1||g<0||g>1)continue;const v=(y-.5)*e,S=(.5-g)*n,w=y*(o-1),E=(1-g)*(o-1),N=Math.min(o-2,Math.floor(w)),U=Math.min(o-2,Math.floor(E)),O=w-N,F=E-U,I=s[U*o+N]*(1-O)*(1-F)+s[U*o+N+1]*O*(1-F)+s[(U+1)*o+N]*(1-O)*F+s[(U+1)*o+N+1]*O*F,R=Bf*.2;f.push(new K(v,u+(I-l)/c*d+R,S))}if(f.length<2)return null;const p=On.gpx_line??6,_=Se[p]??"#ff4500",m=zf*.21;if(m>=.1){const x=new cf(f),y=Math.min(600,f.length*6),g=new Sc(x,y,m,6,!1);return new Ie(g,new Fs({color:_}))}return new af(new Oe().setFromPoints(f),new vc({color:_}))}function Db(r){const t=parseInt(r.replace("#",""),16);return[t>>16&255,t>>8&255,t&255]}function Nb(r){const t=On.terrain??1,[e,n,s]=Db(Se[t]??Se[1]),o=.78+r*.44;return[Math.min(255,Math.round(e*o)),Math.min(255,Math.round(n*o)),Math.min(255,Math.round(s*o))]}async function Ob(r){return new Promise((t,e)=>{const n=new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"});n.onmessage=s=>{s.data.type==="TERRAIN_READY"?(n.terminate(),t({grid:s.data.elevGrid,minE:s.data.minE,elevRange:s.data.elevRange,bounds:r})):s.data.type==="ERROR"&&(n.terminate(),e(new Error(s.data.message)))},n.onerror=s=>{n.terminate(),e(s)},n.postMessage({type:"BUILD_TERRAIN",bounds:r,GRID:Qs,elevZoom:12})})}function Wr(r){Xn.add(r),cc.push(r)}function Hr(r,t){const e=document.getElementById(r);e&&(e.textContent=t)}function Ub(){cc.forEach(r=>{Xn.remove(r),r.geometry?.dispose()}),cc=[],Yr.length=0}function kb(){if(!Cn||!Zn)return;const r=Zn.domElement.clientWidth,t=Zn.domElement.clientHeight;if(!(!r||!t))for(const{id:e,v:n}of Yr){const s=document.getElementById(e);if(!s)continue;const o=n.clone().project(Cn);if(o.z>1){s.style.opacity="0";continue}s.style.opacity="1",s.style.left=`${(o.x+1)/2*r}px`,s.style.top=`${-(o.y-1)/2*t}px`}}const zb=.05;function Bb(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function Fb(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function Pc(){if(!bt.bounds){Gl("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(bt.generating)return;bt.generating=!0;const r=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");r.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),Ja(!0);try{const n=document.getElementById("c3d");await Ec(n);const s=bd(),{bounds:o,wMm:l,dMm:c}=bt,{minLat:u,maxLat:d,minLon:f,maxLon:p}=o,_=(u+d)/2,m=(f+p)/2,x=(p-f)*Math.cos(_*Math.PI/180)*111320;bt.mmPerMeter=l/x,bt.BASE_H=s.baseH,wi(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const y=s.terrainRes,g=await new Promise((F,I)=>{const R=Bb();R.onmessage=k=>{k.data.type==="PROGRESS"?wi(5+k.data.pct*.2,"ÉLÉVATION","Altitude…"):k.data.type==="TERRAIN_READY"?(R.terminate(),F(k.data)):k.data.type==="ERROR"&&(R.terminate(),I(new Error(k.data.message)))},R.onerror=k=>{R.terminate(),I(k)};const W={type:"BUILD_TERRAIN",bounds:o,GRID:y,elevZoom:s.elevZoom};R.postMessage(W)});bt.elevGrid=g.elevGrid,bt.GRID=g.GRID,bt.minE=g.minE,bt.elevRange=g.elevRange;const S=(d-u)*111320,w=Math.max(x,S),E=Math.max(l,c),N=g.elevRange/w*E*s.exag;bt.elevScaleMm=Math.max(1,Math.min(E*.5,N)),s.smooth>0&&Hb(bt.elevGrid,y,s.smooth),wi(30,"DONNÉES","Chargement des données cartographiques…");const U=await ub(o,F=>{wi(30+F*.3,"DONNÉES","Données carto…")});wi(60,"GÉOMÉTRIE","Génération des géométries 3D…");const O=await new Promise((F,I)=>{const R=Fb();R.onmessage=k=>{k.data.type==="GEO_PROGRESS"?wi(60+k.data.pct*.35,"GÉOMÉTRIE",`${k.data.step}…`):k.data.type==="GEOMETRY_READY"?(R.terminate(),F(k.data)):k.data.type==="ERROR"&&(R.terminate(),I(new Error(k.data.message)))},R.onerror=k=>{R.terminate(),I(k)};const W={type:"BUILD_GEOMETRY",elevGrid:bt.elevGrid,GRID:bt.GRID,wMm:l,dMm:c,BASE_H:bt.BASE_H,MIN_SURF:zb,elevScaleMm:bt.elevScaleMm,minE:bt.minE,elevRange:bt.elevRange,features:U,gpxPoints:bt.gpxPoints,bounds:o,settings:s,zoneType:bt.zoneType,zonePts:bt.zonePts,mmPerMeter:bt.mmPerMeter};R.postMessage(W)});wi(95,"SCÈNE","Construction de la scène 3D…"),m1(O),wi(100,"TERMINÉ","Modèle 3D prêt."),bt.generated=!0,bt.generating=!1,setTimeout(()=>{Ja(!1),document.getElementById("hint3d").style.display="block",Vb(g.minE,g.maxE,bt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){bt.generating=!1,Ja(!1),Gl("ERREUR",String(n)),console.error(n)}finally{r.disabled=!1}}function Hb(r,t,e){const n=new Float32Array(r.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,u=0;for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){const p=o+d,_=l+f;p>=0&&p<t&&_>=0&&_<t&&(c+=r[p*t+_],u++)}n[o*t+l]=c/u}r.set(n)}}function Vb(r,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(r)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function Gb(){const r=document.getElementById("zone-footer");r&&(bt.bounds?(r.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled"),document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),bb()):(r.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-colors-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}let ga=!1,Vl=!1;function eo(){const r=(e,n)=>Number(document.getElementById(e)?.value??n)||n,t=e=>document.getElementById(e)?.checked??!1;return{wMm:r("dp-w",bt.wMm||200),dMm:r("dp-d",bt.dMm||200),baseH:r("dp-base",5),exag:r("dp-exag",1),flatFacade:t("dp-flat"),facadeWidthMm:r("dp-walls",2),gpxPoints:bt.gpxPoints,zoneType:bt.zoneType,zonePts:bt.zonePts,bounds:bt.bounds}}function Yf(){const r=(_,m)=>{const x=document.getElementById(_);x&&(x.value=String(Math.round(m)))};if(!bt.bounds)return;const{minLat:t,maxLat:e,minLon:n,maxLon:s}=bt.bounds,o=(t+e)/2,l=(s-n)*Math.cos(o*Math.PI/180)*111320,c=(e-t)*111320,u=200,d=l/c,f=d>=1?u:Math.max(10,Math.round(u*d)),p=d<1?u:Math.max(10,Math.round(u/d));bt.wMm=f,bt.dMm=p,r("dp-w",f),r("dp-d",p)}function dr(){const r=Number(document.getElementById("dp-base")?.value??5)||5,t=Number(document.getElementById("dp-walls")?.value??2)||2,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2,n=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,s=document.getElementById("dp-layers-hint"),o=document.getElementById("dp-wall-mm");s&&(s.textContent=`${Math.round(r/e)} couches`),o&&(o.textContent=`${(t*n).toFixed(2)} mm`)}async function uc(){if(!bt.bounds||Vl)return;Vl=!0;const r=document.getElementById("dims-loading"),t=document.getElementById("dims-load-msg");r.classList.remove("hidden");try{await xb(bt.bounds,eo(),(e,n)=>{t.textContent=n||`${e}%`})}catch(e){console.error("Dims preview error:",e),t.textContent="Erreur de chargement"}finally{r.classList.add("hidden"),Vl=!1}}function La(){bt.bounds&&(Yf(),dr(),requestAnimationFrame(()=>{const r=document.getElementById("dims-view");ga?(ma(r),uc()):(ga=!0,ma(r),uc())}))}window.dpToggle=r=>{document.getElementById(r)?.classList.toggle("open")};Jp();em(Gb);document.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.tab;if(!(!t||r.disabled)&&(lr(t),t==="params"?La():t==="colors"?$f():Wf(),t==="render")){const e=document.getElementById("c3d");e&&Ec(e)}})});document.getElementById("btn-next-colors")?.addEventListener("click",()=>{document.getElementById("tab-colors-btn")?.removeAttribute("disabled"),lr("colors"),$f()});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),lr("render");const r=document.getElementById("c3d");r&&Ec(r),Pc()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>{Wf(),lr("zone")});document.getElementById("btn-back-dims")?.addEventListener("click",()=>{lr("params"),La()});document.getElementById("btn-back-params")?.addEventListener("click",()=>{lr("params"),La()});document.getElementById("btn-gen")?.addEventListener("click",Pc);document.getElementById("btn-stl")?.addEventListener("click",()=>Uf("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>fb());document.querySelectorAll(".dp-sh").forEach(r=>{r.addEventListener("click",()=>{r.closest(".dp-sec")?.classList.toggle("open")})});let vd;const Wb=["dp-w","dp-d","dp-exag","dp-base","dp-walls"];Wb.forEach(r=>{document.getElementById(r)?.addEventListener("input",()=>{dr();const t=Number(document.getElementById("dp-w")?.value),e=Number(document.getElementById("dp-d")?.value);t>0&&(bt.wMm=t),e>0&&(bt.dMm=e),clearTimeout(vd),vd=setTimeout(()=>to(eo()),500)})});document.getElementById("dp-walls")?.addEventListener("input",dr);document.getElementById("dp-flat")?.addEventListener("change",()=>{to(eo())});document.getElementById("dp-dl-btn")?.addEventListener("click",()=>{if(!bt.generated){Gl("INFO",`Générez d'abord le modèle 3D dans l'onglet "Générer & Exporter".`);return}Uf("terrain3d.stl")});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{bt.bounds&&(lr("params"),La())});let yd;document.querySelectorAll("#params-col input, #params-col select").forEach(r=>{r.addEventListener("change",()=>{clearTimeout(yd),yd=setTimeout(()=>{bt.generated&&bt.tg&&Pc()},700)}),r.addEventListener("input",()=>{if(r.type==="range"){const t=document.getElementById(`${r.id}-v`);t&&(t.textContent=r.value)}})});function $f(){bt.bounds&&(Yf(),requestAnimationFrame(()=>{const r=document.getElementById("colors-3d-area");ga?(ma(r),to(eo())):(ga=!0,ma(r),uc()),Zb()}))}function Zb(){document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(r=>{const t=Number(r.dataset.slot);Se[t]&&(r.style.background=Se[t])}),document.querySelectorAll(".cp-sw-inner").forEach(r=>{const e=r.closest(".cp-swatch")?.querySelector("input[type=color]");e&&(r.style.background=e.value)})}document.querySelectorAll(".cp-color-input").forEach(r=>{const t=Number(r.dataset.slot);r.addEventListener("input",()=>{const n=r.value,s=r.nextElementSibling;s&&(s.style.background=n),document.querySelectorAll(`.cp-sw-mini[data-slot="${t}"]`).forEach(o=>{o.style.background=n}),hr({[t]:n})});const e=r.nextElementSibling;e&&(e.style.background=r.value)});function Xb(r,t){hr({[r]:t}),document.querySelectorAll(`.cp-sw-mini[data-slot="${r}"]`).forEach(n=>{n.style.background=t});const e=document.querySelector(`.cp-color-input[data-slot="${r}"]`);if(e){e.value=t;const n=e.nextElementSibling;n&&(n.style.background=t)}}let Vr=null;function qb(r,t){Vr&&(Vr.remove(),Vr=null);const e=document.createElement("div");e.className="cp-slot-picker-pop";const n=Object.keys(Se).map(Number).sort((c,u)=>c-u),s=On[r]??Number(t.dataset.slot)??1;n.forEach(c=>{const u=document.createElement("div");u.className="cp-slot-pick-item"+(c===s?" active":""),u.style.setProperty("--sw",Se[c]??"#888"),u.innerHTML=`<span class="cp-spi-dot"></span><span class="cp-spi-num">${c}</span>`,u.addEventListener("click",d=>{d.stopPropagation(),mb(r,c),t.dataset.slot=String(c),t.textContent=String(c),t.style.background=Se[c]??"#888",e.remove(),Vr=null}),e.appendChild(u)}),document.body.appendChild(e),Vr=e;const o=t.getBoundingClientRect();e.style.left=`${o.left}px`,e.style.top=`${o.bottom+4}px`;const l=c=>{e.contains(c.target)||(e.remove(),Vr=null,document.removeEventListener("click",l,!0))};setTimeout(()=>document.addEventListener("click",l,!0),0)}document.querySelectorAll(".cp-layer .cp-sw-mini").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const n=r.closest(".cp-layer")?.dataset.layer??"";n&&qb(n,r)})});let Gr=null;document.getElementById("cp-col-plus")?.addEventListener("click",()=>{if(Gr){Gr.remove(),Gr=null;return}const r=Math.max(...Object.keys(Se).map(Number))+1,t=document.createElement("div");t.className="cp-add-slot-form",t.innerHTML=`
    <div class="cp-add-slot-preview" id="cp-asp-preview" style="background:#888888"></div>
    <input type="color" id="cp-asp-color" value="#888888">
    <div class="cp-add-slot-actions">
      <button class="cp-btn-cancel" id="cp-asp-cancel">Annuler</button>
      <button class="cp-btn-confirm" id="cp-asp-confirm">Confirmer</button>
    </div>`,Gr=t,document.getElementById("cp-swatches")?.after(t);const e=t.querySelector("#cp-asp-color"),n=t.querySelector("#cp-asp-preview");e.addEventListener("input",()=>{n.style.background=e.value}),t.querySelector("#cp-asp-cancel")?.addEventListener("click",()=>{t.remove(),Gr=null}),t.querySelector("#cp-asp-confirm")?.addEventListener("click",()=>{const s=e.value;Se[r]=s;const o=document.createElement("label");o.className="cp-swatch",o.dataset.slot=String(r),o.title=`Couleur ${r}`,o.innerHTML=`<input type="color" class="cp-color-input" data-slot="${r}" value="${s}"><div class="cp-sw-inner" style="background:${s}"><span class="cp-sw-num">${r}</span></div>`,o.querySelector(".cp-color-input").addEventListener("input",function(){Xb(r,this.value),this.nextElementSibling.style.background=this.value}),document.getElementById("cp-swatches")?.appendChild(o),t.remove(),Gr=null})});document.getElementById("cp-col-minus")?.addEventListener("click",()=>{const t=document.getElementById("cp-swatches")?.querySelectorAll(".cp-swatch");if(!t||t.length<=1)return;const e=t[t.length-1],n=Number(e.dataset.slot);delete Se[n],e.remove()});document.getElementById("cp-filter")?.addEventListener("input",()=>{hr({})});document.querySelectorAll(".cp-eye").forEach(r=>{const t=r.dataset.layer;t&&r.addEventListener("click",()=>{r.classList.toggle("hidden-layer");const e=!r.classList.contains("hidden-layer");gb(t,e)})});const Kf={alpes:{1:"#c0af88",2:"#e8ecf0",3:"#8ab858",4:"#3a6828",5:"#4a88c0",6:"#ff4500"},mono:{1:"#a0a090",2:"#d8d8d8",3:"#888878",4:"#606050",5:"#787878",6:"#505050"},desert:{1:"#d4a96a",2:"#f0e8c8",3:"#c8a858",4:"#a07840",5:"#5888a0",6:"#c04820"}};document.getElementById("cp-apply")?.addEventListener("click",()=>{const r=document.getElementById("cp-preset").value,t=Kf[r];t&&(hr(t),Object.entries(t).forEach(([e,n])=>{const s=document.querySelector(`.cp-color-input[data-slot="${e}"]`);if(s){s.value=n;const o=s.nextElementSibling;o&&(o.style.background=n)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(e=>{const n=Number(e.dataset.slot);t[n]&&(e.style.background=t[n])}))});const jb=document.getElementById("cp-dd-trigger"),Rc=document.getElementById("cp-dd-menu");jb?.addEventListener("click",r=>{r.stopPropagation(),Rc?.classList.toggle("open")});document.addEventListener("click",()=>Rc?.classList.remove("open"));document.querySelectorAll(".cp-dd-item").forEach(r=>{r.addEventListener("click",t=>{t.stopPropagation();const e=r.dataset.preset??"",n=r.textContent?.trim().replace(/^✓\s*/,"")??"";document.querySelectorAll(".cp-dd-item").forEach(l=>l.classList.remove("cp-dd-active")),r.classList.add("cp-dd-active");const s=document.getElementById("cp-dd-label");s&&(s.textContent=n),Rc?.classList.remove("open");const o=Kf[e];o&&(hr(o),Yb(o))})});function Yb(r){Object.entries(r).forEach(([t,e])=>{const n=document.querySelector(`.cp-color-input[data-slot="${t}"]`);if(n){n.value=e;const s=n.nextElementSibling;s&&(s.style.background=e)}}),document.querySelectorAll(".cp-sw-mini[data-slot]").forEach(t=>{const e=Number(t.dataset.slot);r[e]&&(t.style.background=r[e])})}const Ic=document.getElementById("cp-layer-detail"),Jf=document.getElementById("ldp-title"),Qf=document.getElementById("ldp-icon"),tp=document.getElementById("ldp-content");function $b(r,t,e){Jf.textContent=t,Qf.innerHTML=e,tp.innerHTML=Kb(r),Ic.classList.add("open"),nw(r)}function ep(){Ic.classList.remove("open")}document.getElementById("ldp-back")?.addEventListener("click",ep);document.querySelectorAll(".cp-layer-nav").forEach(r=>{r.addEventListener("click",t=>{if(t.target.closest(".cp-eye, .cp-del, .cp-sw-mini"))return;const e=r.dataset.type??"land_cover",n=r.querySelector(".cp-layer-name")?.textContent??"Couche",s=r.querySelector(".cp-layer-ico")?.innerHTML??"";$b(e,n,s)})});document.getElementById("cp-add-layer-btn")?.addEventListener("click",()=>{Jf.textContent="Nouvelle couche",Qf.innerHTML='<path d="M8 2v12M2 8h12" stroke-linecap="round"/>',tp.innerHTML=ew(),Ic.classList.add("open"),iw()});function Kb(r){return r==="markers"?Jb():r==="lines"?Qb():tw()}function Jb(){return`
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
  </div>`}function Qb(){return`
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
  </div>`}function tw(){return`
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
  </div>`}function ew(){return`
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
  </div>`}function nw(r){const t=Number(document.getElementById("ps-wall-w")?.value??.42)||.42,e=Number(document.getElementById("ps-layer-h")?.value??.2)||.2;if(r==="markers"){const n=document.getElementById("ldp-marker-size"),s=document.getElementById("ldp-marker-size-n"),o=document.getElementById("ldp-marker-mm"),l=document.getElementById("ldp-marker-rot"),c=document.getElementById("ldp-marker-rot-n"),u=document.getElementById("ldp-marker-offset"),d=document.getElementById("ldp-offset-mm"),f=()=>{o&&(o.textContent=`( ${(Number(n.value)*t).toFixed(2)} mm )`)},p=()=>{d&&(d.textContent=`( ${(Number(u.value||0)*e).toFixed(2)} mm )`)};n?.addEventListener("input",()=>{s.value=Number(n.value).toFixed(1),f()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),f()}),l?.addEventListener("input",()=>{c&&(c.value=l.value)}),c?.addEventListener("input",()=>{l&&(l.value=c.value)}),u?.addEventListener("input",p),f(),p(),document.querySelectorAll(".ldp-shape-btn").forEach(_=>{_.addEventListener("click",()=>{document.querySelectorAll(".ldp-shape-btn").forEach(x=>x.classList.remove("active")),_.classList.add("active");const m=_.dataset.shape??"circle";vb(m),Dc(!0)})})}if(r==="lines"){const n=document.getElementById("ldp-line-w"),s=document.getElementById("ldp-line-w-n"),o=document.getElementById("ldp-line-offset"),l=()=>{const c=Math.max(.1,Number(n?.value??1)||1),u=Number(o?.value??1)||1;_b(c,u);const d=eo();d&&to(d)};n?.addEventListener("input",()=>{s&&(s.value=Number(n.value).toFixed(1)),l()}),s?.addEventListener("input",()=>{n&&(n.value=s.value),l()}),o?.addEventListener("input",l)}}function iw(){document.getElementById("ldp-new-type")?.addEventListener("change",r=>{const t=r.target.value,e=document.getElementById("ldp-new-name"),n={land_cover:"Couverture terrestre",lines:"Lignes",markers:"Marqueurs",water:"Plans d'eau",waterways:"Voies navigables"};e&&(e.placeholder=n[t]??t)}),document.getElementById("ldp-confirm-add")?.addEventListener("click",ep),document.getElementById("ldp-new-color")?.addEventListener("click",()=>{const r=[1,2,3,4,5,6],t=Number(document.getElementById("ldp-new-color").dataset.slot??1),e=r[(r.indexOf(t)+1)%r.length],n=document.getElementById("ldp-new-color");n.dataset.slot=String(e),n.textContent=String(e),n.style.background=Se[e]??"#888"})}const ts=document.getElementById("print-settings-overlay");document.getElementById("btn-print-settings")?.addEventListener("click",()=>{ts.classList.remove("hidden")});document.getElementById("ps-close")?.addEventListener("click",()=>{ts.classList.add("hidden")});ts?.addEventListener("click",r=>{r.target===ts&&ts.classList.add("hidden")});const _a=document.getElementById("ps-layer-h"),va=document.getElementById("ps-wall-w"),np=document.getElementById("ps-layer-h-val"),ip=document.getElementById("ps-wall-w-val");_a?.addEventListener("input",()=>{np.textContent=Number(_a.value).toFixed(2),dr()});va?.addEventListener("input",()=>{ip.textContent=Number(va.value).toFixed(2),dr()});document.getElementById("ps-confirm")?.addEventListener("click",()=>{ts.classList.add("hidden"),dr()});document.getElementById("ps-reset")?.addEventListener("click",()=>{_a&&(_a.value="0.20",np.textContent="0.20"),va&&(va.value="0.42",ip.textContent="0.42"),dr()});function Dc(r){let t=document.getElementById("placement-hint");t||(t=document.createElement("div"),t.id="placement-hint",t.textContent="Cliquez sur la carte 3D pour placer le marqueur  •  Échap pour annuler",document.body.appendChild(t)),t.style.display=r?"block":"none"}document.getElementById("dims-canvas")?.addEventListener("click",r=>{Xf()&&(yb(r.clientX,r.clientY),Dc(!1))});document.addEventListener("keydown",r=>{r.key==="Escape"&&Xf()&&(Zf(),Dc(!1))});
