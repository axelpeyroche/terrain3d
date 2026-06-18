(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();function $d(){document.getElementById("app").innerHTML=`

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
      </div>

      <!-- Carte Leaflet -->
      <div id="map"></div>

      <!-- Overlays dessin -->
      <div id="snap"></div>
      <div id="dch"></div>

      <!-- Footer zone définie -->
      <div id="zone-footer">
        <div id="zone-info">
          <svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 2a5 5 0 110 10A5 5 0 018 3z" opacity=".4"/><path d="M8 5a3 3 0 100 6A3 3 0 008 5z"/></svg>
          Zone sélectionnée : <strong id="zone-dims">—</strong>
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
`}function ui(r,t,e){const n=h=>document.getElementById(h),s=n("ps");s&&(s.textContent=t);const o=n("pl");o&&(o.textContent=e);const l=n("pb");l&&(l.style.width=`${r}%`);const c=n("pp");c&&(c.textContent=`${Math.round(r)}%`)}function ia(r){const t=document.getElementById("prog");t&&(t.style.display=r?"flex":"none")}function ic(r,t){const e=document.getElementById("modal");document.getElementById("mtit").textContent=r,document.getElementById("mmsg").textContent=t,e.style.display="flex"}function vs(r){document.querySelectorAll(".tab-btn").forEach(t=>t.classList.toggle("active",t.dataset.tab===r)),document.querySelectorAll(".panel").forEach(t=>t.classList.toggle("active",t.id===`panel-${r}`))}window.ts=r=>{document.getElementById(`sb-${r}`)?.classList.toggle("h"),document.getElementById(`ca-${r}`)?.classList.toggle("o")};window.ev=r=>{r.stopPropagation()};var ss=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Xh(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var Za={exports:{}};/* @preserve
 * Leaflet 1.9.4, a JS library for interactive maps. https://leafletjs.com
 * (c) 2010-2023 Vladimir Agafonkin, (c) 2010-2011 CloudMade
 */(function(r,t){(function(e,n){n(t)})(ss,function(e){var n="1.9.4";function s(i){var a,u,x,E;for(u=1,x=arguments.length;u<x;u++){E=arguments[u];for(a in E)i[a]=E[a]}return i}var o=Object.create||function(){function i(){}return function(a){return i.prototype=a,new i}}();function l(i,a){var u=Array.prototype.slice;if(i.bind)return i.bind.apply(i,u.call(arguments,1));var x=u.call(arguments,2);return function(){return i.apply(a,x.length?x.concat(u.call(arguments)):arguments)}}var c=0;function h(i){return"_leaflet_id"in i||(i._leaflet_id=++c),i._leaflet_id}function d(i,a,u){var x,E,U,j;return j=function(){x=!1,E&&(U.apply(u,E),E=!1)},U=function(){x?E=arguments:(i.apply(u,arguments),setTimeout(j,a),x=!0)},U}function f(i,a,u){var x=a[1],E=a[0],U=x-E;return i===x&&u?i:((i-E)%U+U)%U+E}function m(){return!1}function v(i,a){if(a===!1)return i;var u=Math.pow(10,a===void 0?6:a);return Math.round(i*u)/u}function p(i){return i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function M(i){return p(i).split(/\s+/)}function y(i,a){Object.prototype.hasOwnProperty.call(i,"options")||(i.options=i.options?o(i.options):{});for(var u in a)i.options[u]=a[u];return i.options}function _(i,a,u){var x=[];for(var E in i)x.push(encodeURIComponent(u?E.toUpperCase():E)+"="+encodeURIComponent(i[E]));return(!a||a.indexOf("?")===-1?"?":"&")+x.join("&")}var g=/\{ *([\w_ -]+) *\}/g;function C(i,a){return i.replace(g,function(u,x){var E=a[x];if(E===void 0)throw new Error("No value provided for variable "+u);return typeof E=="function"&&(E=E(a)),E})}var b=Array.isArray||function(i){return Object.prototype.toString.call(i)==="[object Array]"};function I(i,a){for(var u=0;u<i.length;u++)if(i[u]===a)return u;return-1}var N="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";function F(i){return window["webkit"+i]||window["moz"+i]||window["ms"+i]}var z=0;function G(i){var a=+new Date,u=Math.max(0,16-(a-z));return z=a+u,window.setTimeout(i,u)}var D=window.requestAnimationFrame||F("RequestAnimationFrame")||G,P=window.cancelAnimationFrame||F("CancelAnimationFrame")||F("CancelRequestAnimationFrame")||function(i){window.clearTimeout(i)};function W(i,a,u){if(u&&D===G)i.call(a);else return D.call(window,l(i,a))}function O(i){i&&P.call(window,i)}var B={__proto__:null,extend:s,create:o,bind:l,get lastId(){return c},stamp:h,throttle:d,wrapNum:f,falseFn:m,formatNum:v,trim:p,splitWords:M,setOptions:y,getParamString:_,template:C,isArray:b,indexOf:I,emptyImageUrl:N,requestFn:D,cancelFn:P,requestAnimFrame:W,cancelAnimFrame:O};function A(){}A.extend=function(i){var a=function(){y(this),this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks()},u=a.__super__=this.prototype,x=o(u);x.constructor=a,a.prototype=x;for(var E in this)Object.prototype.hasOwnProperty.call(this,E)&&E!=="prototype"&&E!=="__super__"&&(a[E]=this[E]);return i.statics&&s(a,i.statics),i.includes&&(Z(i.includes),s.apply(null,[x].concat(i.includes))),s(x,i),delete x.statics,delete x.includes,x.options&&(x.options=u.options?o(u.options):{},s(x.options,i.options)),x._initHooks=[],x.callInitHooks=function(){if(!this._initHooksCalled){u.callInitHooks&&u.callInitHooks.call(this),this._initHooksCalled=!0;for(var U=0,j=x._initHooks.length;U<j;U++)x._initHooks[U].call(this)}},a},A.include=function(i){var a=this.prototype.options;return s(this.prototype,i),i.options&&(this.prototype.options=a,this.mergeOptions(i.options)),this},A.mergeOptions=function(i){return s(this.prototype.options,i),this},A.addInitHook=function(i){var a=Array.prototype.slice.call(arguments,1),u=typeof i=="function"?i:function(){this[i].apply(this,a)};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(u),this};function Z(i){if(!(typeof L>"u"||!L||!L.Mixin)){i=b(i)?i:[i];for(var a=0;a<i.length;a++)i[a]===L.Mixin.Events&&console.warn("Deprecated include of L.Mixin.Events: this property will be removed in future releases, please inherit from L.Evented instead.",new Error().stack)}}var at={on:function(i,a,u){if(typeof i=="object")for(var x in i)this._on(x,i[x],a);else{i=M(i);for(var E=0,U=i.length;E<U;E++)this._on(i[E],a,u)}return this},off:function(i,a,u){if(!arguments.length)delete this._events;else if(typeof i=="object")for(var x in i)this._off(x,i[x],a);else{i=M(i);for(var E=arguments.length===1,U=0,j=i.length;U<j;U++)E?this._off(i[U]):this._off(i[U],a,u)}return this},_on:function(i,a,u,x){if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}if(this._listens(i,a,u)===!1){u===this&&(u=void 0);var E={fn:a,ctx:u};x&&(E.once=!0),this._events=this._events||{},this._events[i]=this._events[i]||[],this._events[i].push(E)}},_off:function(i,a,u){var x,E,U;if(this._events&&(x=this._events[i],!!x)){if(arguments.length===1){if(this._firingCount)for(E=0,U=x.length;E<U;E++)x[E].fn=m;delete this._events[i];return}if(typeof a!="function"){console.warn("wrong listener type: "+typeof a);return}var j=this._listens(i,a,u);if(j!==!1){var ht=x[j];this._firingCount&&(ht.fn=m,this._events[i]=x=x.slice()),x.splice(j,1)}}},fire:function(i,a,u){if(!this.listens(i,u))return this;var x=s({},a,{type:i,target:this,sourceTarget:a&&a.sourceTarget||this});if(this._events){var E=this._events[i];if(E){this._firingCount=this._firingCount+1||1;for(var U=0,j=E.length;U<j;U++){var ht=E[U],mt=ht.fn;ht.once&&this.off(i,mt,ht.ctx),mt.call(ht.ctx||this,x)}this._firingCount--}}return u&&this._propagateEvent(x),this},listens:function(i,a,u,x){typeof i!="string"&&console.warn('"string" type argument expected');var E=a;typeof a!="function"&&(x=!!a,E=void 0,u=void 0);var U=this._events&&this._events[i];if(U&&U.length&&this._listens(i,E,u)!==!1)return!0;if(x){for(var j in this._eventParents)if(this._eventParents[j].listens(i,a,u,x))return!0}return!1},_listens:function(i,a,u){if(!this._events)return!1;var x=this._events[i]||[];if(!a)return!!x.length;u===this&&(u=void 0);for(var E=0,U=x.length;E<U;E++)if(x[E].fn===a&&x[E].ctx===u)return E;return!1},once:function(i,a,u){if(typeof i=="object")for(var x in i)this._on(x,i[x],a,!0);else{i=M(i);for(var E=0,U=i.length;E<U;E++)this._on(i[E],a,u,!0)}return this},addEventParent:function(i){return this._eventParents=this._eventParents||{},this._eventParents[h(i)]=i,this},removeEventParent:function(i){return this._eventParents&&delete this._eventParents[h(i)],this},_propagateEvent:function(i){for(var a in this._eventParents)this._eventParents[a].fire(i.type,s({layer:i.target,propagatedFrom:i.target},i),!0)}};at.addEventListener=at.on,at.removeEventListener=at.clearAllEventListeners=at.off,at.addOneTimeEventListener=at.once,at.fireEvent=at.fire,at.hasEventListeners=at.listens;var ot=A.extend(at);function Y(i,a,u){this.x=u?Math.round(i):i,this.y=u?Math.round(a):a}var st=Math.trunc||function(i){return i>0?Math.floor(i):Math.ceil(i)};Y.prototype={clone:function(){return new Y(this.x,this.y)},add:function(i){return this.clone()._add(rt(i))},_add:function(i){return this.x+=i.x,this.y+=i.y,this},subtract:function(i){return this.clone()._subtract(rt(i))},_subtract:function(i){return this.x-=i.x,this.y-=i.y,this},divideBy:function(i){return this.clone()._divideBy(i)},_divideBy:function(i){return this.x/=i,this.y/=i,this},multiplyBy:function(i){return this.clone()._multiplyBy(i)},_multiplyBy:function(i){return this.x*=i,this.y*=i,this},scaleBy:function(i){return new Y(this.x*i.x,this.y*i.y)},unscaleBy:function(i){return new Y(this.x/i.x,this.y/i.y)},round:function(){return this.clone()._round()},_round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},floor:function(){return this.clone()._floor()},_floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.clone()._ceil()},_ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},trunc:function(){return this.clone()._trunc()},_trunc:function(){return this.x=st(this.x),this.y=st(this.y),this},distanceTo:function(i){i=rt(i);var a=i.x-this.x,u=i.y-this.y;return Math.sqrt(a*a+u*u)},equals:function(i){return i=rt(i),i.x===this.x&&i.y===this.y},contains:function(i){return i=rt(i),Math.abs(i.x)<=Math.abs(this.x)&&Math.abs(i.y)<=Math.abs(this.y)},toString:function(){return"Point("+v(this.x)+", "+v(this.y)+")"}};function rt(i,a,u){return i instanceof Y?i:b(i)?new Y(i[0],i[1]):i==null?i:typeof i=="object"&&"x"in i&&"y"in i?new Y(i.x,i.y):new Y(i,a,u)}function q(i,a){if(i)for(var u=a?[i,a]:i,x=0,E=u.length;x<E;x++)this.extend(u[x])}q.prototype={extend:function(i){var a,u;if(!i)return this;if(i instanceof Y||typeof i[0]=="number"||"x"in i)a=u=rt(i);else if(i=Q(i),a=i.min,u=i.max,!a||!u)return this;return!this.min&&!this.max?(this.min=a.clone(),this.max=u.clone()):(this.min.x=Math.min(a.x,this.min.x),this.max.x=Math.max(u.x,this.max.x),this.min.y=Math.min(a.y,this.min.y),this.max.y=Math.max(u.y,this.max.y)),this},getCenter:function(i){return rt((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,i)},getBottomLeft:function(){return rt(this.min.x,this.max.y)},getTopRight:function(){return rt(this.max.x,this.min.y)},getTopLeft:function(){return this.min},getBottomRight:function(){return this.max},getSize:function(){return this.max.subtract(this.min)},contains:function(i){var a,u;return typeof i[0]=="number"||i instanceof Y?i=rt(i):i=Q(i),i instanceof q?(a=i.min,u=i.max):a=u=i,a.x>=this.min.x&&u.x<=this.max.x&&a.y>=this.min.y&&u.y<=this.max.y},intersects:function(i){i=Q(i);var a=this.min,u=this.max,x=i.min,E=i.max,U=E.x>=a.x&&x.x<=u.x,j=E.y>=a.y&&x.y<=u.y;return U&&j},overlaps:function(i){i=Q(i);var a=this.min,u=this.max,x=i.min,E=i.max,U=E.x>a.x&&x.x<u.x,j=E.y>a.y&&x.y<u.y;return U&&j},isValid:function(){return!!(this.min&&this.max)},pad:function(i){var a=this.min,u=this.max,x=Math.abs(a.x-u.x)*i,E=Math.abs(a.y-u.y)*i;return Q(rt(a.x-x,a.y-E),rt(u.x+x,u.y+E))},equals:function(i){return i?(i=Q(i),this.min.equals(i.getTopLeft())&&this.max.equals(i.getBottomRight())):!1}};function Q(i,a){return!i||i instanceof q?i:new q(i,a)}function Ct(i,a){if(i)for(var u=a?[i,a]:i,x=0,E=u.length;x<E;x++)this.extend(u[x])}Ct.prototype={extend:function(i){var a=this._southWest,u=this._northEast,x,E;if(i instanceof et)x=i,E=i;else if(i instanceof Ct){if(x=i._southWest,E=i._northEast,!x||!E)return this}else return i?this.extend(Mt(i)||J(i)):this;return!a&&!u?(this._southWest=new et(x.lat,x.lng),this._northEast=new et(E.lat,E.lng)):(a.lat=Math.min(x.lat,a.lat),a.lng=Math.min(x.lng,a.lng),u.lat=Math.max(E.lat,u.lat),u.lng=Math.max(E.lng,u.lng)),this},pad:function(i){var a=this._southWest,u=this._northEast,x=Math.abs(a.lat-u.lat)*i,E=Math.abs(a.lng-u.lng)*i;return new Ct(new et(a.lat-x,a.lng-E),new et(u.lat+x,u.lng+E))},getCenter:function(){return new et((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2)},getSouthWest:function(){return this._southWest},getNorthEast:function(){return this._northEast},getNorthWest:function(){return new et(this.getNorth(),this.getWest())},getSouthEast:function(){return new et(this.getSouth(),this.getEast())},getWest:function(){return this._southWest.lng},getSouth:function(){return this._southWest.lat},getEast:function(){return this._northEast.lng},getNorth:function(){return this._northEast.lat},contains:function(i){typeof i[0]=="number"||i instanceof et||"lat"in i?i=Mt(i):i=J(i);var a=this._southWest,u=this._northEast,x,E;return i instanceof Ct?(x=i.getSouthWest(),E=i.getNorthEast()):x=E=i,x.lat>=a.lat&&E.lat<=u.lat&&x.lng>=a.lng&&E.lng<=u.lng},intersects:function(i){i=J(i);var a=this._southWest,u=this._northEast,x=i.getSouthWest(),E=i.getNorthEast(),U=E.lat>=a.lat&&x.lat<=u.lat,j=E.lng>=a.lng&&x.lng<=u.lng;return U&&j},overlaps:function(i){i=J(i);var a=this._southWest,u=this._northEast,x=i.getSouthWest(),E=i.getNorthEast(),U=E.lat>a.lat&&x.lat<u.lat,j=E.lng>a.lng&&x.lng<u.lng;return U&&j},toBBoxString:function(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",")},equals:function(i,a){return i?(i=J(i),this._southWest.equals(i.getSouthWest(),a)&&this._northEast.equals(i.getNorthEast(),a)):!1},isValid:function(){return!!(this._southWest&&this._northEast)}};function J(i,a){return i instanceof Ct?i:new Ct(i,a)}function et(i,a,u){if(isNaN(i)||isNaN(a))throw new Error("Invalid LatLng object: ("+i+", "+a+")");this.lat=+i,this.lng=+a,u!==void 0&&(this.alt=+u)}et.prototype={equals:function(i,a){if(!i)return!1;i=Mt(i);var u=Math.max(Math.abs(this.lat-i.lat),Math.abs(this.lng-i.lng));return u<=(a===void 0?1e-9:a)},toString:function(i){return"LatLng("+v(this.lat,i)+", "+v(this.lng,i)+")"},distanceTo:function(i){return Pt.distance(this,Mt(i))},wrap:function(){return Pt.wrapLatLng(this)},toBounds:function(i){var a=180*i/40075017,u=a/Math.cos(Math.PI/180*this.lat);return J([this.lat-a,this.lng-u],[this.lat+a,this.lng+u])},clone:function(){return new et(this.lat,this.lng,this.alt)}};function Mt(i,a,u){return i instanceof et?i:b(i)&&typeof i[0]!="object"?i.length===3?new et(i[0],i[1],i[2]):i.length===2?new et(i[0],i[1]):null:i==null?i:typeof i=="object"&&"lat"in i?new et(i.lat,"lng"in i?i.lng:i.lon,i.alt):a===void 0?null:new et(i,a,u)}var bt={latLngToPoint:function(i,a){var u=this.projection.project(i),x=this.scale(a);return this.transformation._transform(u,x)},pointToLatLng:function(i,a){var u=this.scale(a),x=this.transformation.untransform(i,u);return this.projection.unproject(x)},project:function(i){return this.projection.project(i)},unproject:function(i){return this.projection.unproject(i)},scale:function(i){return 256*Math.pow(2,i)},zoom:function(i){return Math.log(i/256)/Math.LN2},getProjectedBounds:function(i){if(this.infinite)return null;var a=this.projection.bounds,u=this.scale(i),x=this.transformation.transform(a.min,u),E=this.transformation.transform(a.max,u);return new q(x,E)},infinite:!1,wrapLatLng:function(i){var a=this.wrapLng?f(i.lng,this.wrapLng,!0):i.lng,u=this.wrapLat?f(i.lat,this.wrapLat,!0):i.lat,x=i.alt;return new et(u,a,x)},wrapLatLngBounds:function(i){var a=i.getCenter(),u=this.wrapLatLng(a),x=a.lat-u.lat,E=a.lng-u.lng;if(x===0&&E===0)return i;var U=i.getSouthWest(),j=i.getNorthEast(),ht=new et(U.lat-x,U.lng-E),mt=new et(j.lat-x,j.lng-E);return new Ct(ht,mt)}},Pt=s({},bt,{wrapLng:[-180,180],R:6371e3,distance:function(i,a){var u=Math.PI/180,x=i.lat*u,E=a.lat*u,U=Math.sin((a.lat-i.lat)*u/2),j=Math.sin((a.lng-i.lng)*u/2),ht=U*U+Math.cos(x)*Math.cos(E)*j*j,mt=2*Math.atan2(Math.sqrt(ht),Math.sqrt(1-ht));return this.R*mt}}),It=6378137,zt={R:It,MAX_LATITUDE:85.0511287798,project:function(i){var a=Math.PI/180,u=this.MAX_LATITUDE,x=Math.max(Math.min(u,i.lat),-u),E=Math.sin(x*a);return new Y(this.R*i.lng*a,this.R*Math.log((1+E)/(1-E))/2)},unproject:function(i){var a=180/Math.PI;return new et((2*Math.atan(Math.exp(i.y/this.R))-Math.PI/2)*a,i.x*a/this.R)},bounds:function(){var i=It*Math.PI;return new q([-i,-i],[i,i])}()};function it(i,a,u,x){if(b(i)){this._a=i[0],this._b=i[1],this._c=i[2],this._d=i[3];return}this._a=i,this._b=a,this._c=u,this._d=x}it.prototype={transform:function(i,a){return this._transform(i.clone(),a)},_transform:function(i,a){return a=a||1,i.x=a*(this._a*i.x+this._b),i.y=a*(this._c*i.y+this._d),i},untransform:function(i,a){return a=a||1,new Y((i.x/a-this._b)/this._a,(i.y/a-this._d)/this._c)}};function vt(i,a,u,x){return new it(i,a,u,x)}var xt=s({},Pt,{code:"EPSG:3857",projection:zt,transformation:function(){var i=.5/(Math.PI*zt.R);return vt(i,.5,-i,.5)}()}),w=s({},xt,{code:"EPSG:900913"});function tt(i){return document.createElementNS("http://www.w3.org/2000/svg",i)}function K(i,a){var u="",x,E,U,j,ht,mt;for(x=0,U=i.length;x<U;x++){for(ht=i[x],E=0,j=ht.length;E<j;E++)mt=ht[E],u+=(E?"L":"M")+mt.x+" "+mt.y;u+=a?Vt.svg?"z":"x":""}return u||"M0 0"}var T=document.documentElement.style,S="ActiveXObject"in window,k=S&&!document.addEventListener,X="msLaunchUri"in navigator&&!("documentMode"in document),$=Fe("webkit"),V=Fe("android"),ft=Fe("android 2")||Fe("android 3"),lt=parseInt(/WebKit\/([0-9]+)|$/.exec(navigator.userAgent)[1],10),pt=V&&Fe("Google")&&lt<537&&!("AudioNode"in window),Et=!!window.opera,wt=!X&&Fe("chrome"),Tt=Fe("gecko")&&!$&&!Et&&!S,Ht=!wt&&Fe("safari"),Ft=Fe("phantom"),Dt="OTransition"in T,Kt=navigator.platform.indexOf("Win")===0,Gt=S&&"transition"in T,re="WebKitCSSMatrix"in window&&"m11"in new window.WebKitCSSMatrix&&!ft,se="MozPerspective"in T,Jt=!window.L_DISABLE_3D&&(Gt||re||se)&&!Dt&&!Ft,Bt=typeof orientation<"u"||Fe("mobile"),R=Bt&&$,ut=Bt&&re,St=!window.PointerEvent&&window.MSPointerEvent,Rt=!!(window.PointerEvent||St),Nt="ontouchstart"in window||!!window.TouchEvent,ne=!window.L_NO_TOUCH&&(Nt||Rt),ce=Bt&&Et,ge=Bt&&Tt,Re=(window.devicePixelRatio||window.screen.deviceXDPI/window.screen.logicalXDPI)>1,me=function(){var i=!1;try{var a=Object.defineProperty({},"passive",{get:function(){i=!0}});window.addEventListener("testPassiveEventSupport",m,a),window.removeEventListener("testPassiveEventSupport",m,a)}catch{}return i}(),Ee=function(){return!!document.createElement("canvas").getContext}(),Se=!!(document.createElementNS&&tt("svg").createSVGRect),Je=!!Se&&function(){var i=document.createElement("div");return i.innerHTML="<svg/>",(i.firstChild&&i.firstChild.namespaceURI)==="http://www.w3.org/2000/svg"}(),an=!Se&&function(){try{var i=document.createElement("div");i.innerHTML='<v:shape adj="1"/>';var a=i.firstChild;return a.style.behavior="url(#default#VML)",a&&typeof a.adj=="object"}catch{return!1}}(),Un=navigator.platform.indexOf("Mac")===0,ai=navigator.platform.indexOf("Linux")===0;function Fe(i){return navigator.userAgent.toLowerCase().indexOf(i)>=0}var Vt={ie:S,ielt9:k,edge:X,webkit:$,android:V,android23:ft,androidStock:pt,opera:Et,chrome:wt,gecko:Tt,safari:Ht,phantom:Ft,opera12:Dt,win:Kt,ie3d:Gt,webkit3d:re,gecko3d:se,any3d:Jt,mobile:Bt,mobileWebkit:R,mobileWebkit3d:ut,msPointer:St,pointer:Rt,touch:ne,touchNative:Nt,mobileOpera:ce,mobileGecko:ge,retina:Re,passiveEvents:me,canvas:Ee,svg:Se,vml:an,inlineSvg:Je,mac:Un,linux:ai},Ai=Vt.msPointer?"MSPointerDown":"pointerdown",zr=Vt.msPointer?"MSPointerMove":"pointermove",Fr=Vt.msPointer?"MSPointerUp":"pointerup",bs=Vt.msPointer?"MSPointerCancel":"pointercancel",kr={touchstart:Ai,touchmove:zr,touchend:Fr,touchcancel:bs},ws={touchstart:Qt,touchmove:qt,touchend:qt,touchcancel:qt},H={},ct=!1;function _t(i,a,u){return a==="touchstart"&&Xt(),ws[a]?(u=ws[a].bind(this,u),i.addEventListener(kr[a],u,!1),u):(console.warn("wrong event specified:",a),m)}function gt(i,a,u){if(!kr[a]){console.warn("wrong event specified:",a);return}i.removeEventListener(kr[a],u,!1)}function dt(i){H[i.pointerId]=i}function Ut(i){H[i.pointerId]&&(H[i.pointerId]=i)}function Wt(i){delete H[i.pointerId]}function Xt(){ct||(document.addEventListener(Ai,dt,!0),document.addEventListener(zr,Ut,!0),document.addEventListener(Fr,Wt,!0),document.addEventListener(bs,Wt,!0),ct=!0)}function qt(i,a){if(a.pointerType!==(a.MSPOINTER_TYPE_MOUSE||"mouse")){a.touches=[];for(var u in H)a.touches.push(H[u]);a.changedTouches=[a],i(a)}}function Qt(i,a){a.MSPOINTER_TYPE_TOUCH&&a.pointerType===a.MSPOINTER_TYPE_TOUCH&&We(a),qt(i,a)}function $t(i){var a={},u,x;for(x in i)u=i[x],a[x]=u&&u.bind?u.bind(i):u;return i=a,a.type="dblclick",a.detail=2,a.isTrusted=!1,a._simulated=!0,a}var te=200;function be(i,a){i.addEventListener("dblclick",a);var u=0,x;function E(U){if(U.detail!==1){x=U.detail;return}if(!(U.pointerType==="mouse"||U.sourceCapabilities&&!U.sourceCapabilities.firesTouchEvents)){var j=xl(U);if(!(j.some(function(mt){return mt instanceof HTMLLabelElement&&mt.attributes.for})&&!j.some(function(mt){return mt instanceof HTMLInputElement||mt instanceof HTMLSelectElement}))){var ht=Date.now();ht-u<=te?(x++,x===2&&a($t(U))):x=1,u=ht}}}return i.addEventListener("click",E),{dblclick:a,simDblclick:E}}function Qe(i,a){i.removeEventListener("dblclick",a.dblclick),i.removeEventListener("click",a.simDblclick)}var Te=Ts(["transform","webkitTransform","OTransform","MozTransform","msTransform"]),tn=Ts(["webkitTransition","transition","OTransition","MozTransition","msTransition"]),ve=tn==="webkitTransition"||tn==="OTransition"?tn+"End":"transitionend";function ee(i){return typeof i=="string"?document.getElementById(i):i}function qn(i,a){var u=i.style[a]||i.currentStyle&&i.currentStyle[a];if((!u||u==="auto")&&document.defaultView){var x=document.defaultView.getComputedStyle(i,null);u=x?x[a]:null}return u==="auto"?null:u}function Zt(i,a,u){var x=document.createElement(i);return x.className=a||"",u&&u.appendChild(x),x}function fe(i){var a=i.parentNode;a&&a.removeChild(i)}function Ci(i){for(;i.firstChild;)i.removeChild(i.firstChild)}function yn(i){var a=i.parentNode;a&&a.lastChild!==i&&a.appendChild(i)}function zn(i){var a=i.parentNode;a&&a.firstChild!==i&&a.insertBefore(i,a.firstChild)}function Ie(i,a){if(i.classList!==void 0)return i.classList.contains(a);var u=li(i);return u.length>0&&new RegExp("(^|\\s)"+a+"(\\s|$)").test(u)}function Yt(i,a){if(i.classList!==void 0)for(var u=M(a),x=0,E=u.length;x<E;x++)i.classList.add(u[x]);else if(!Ie(i,a)){var U=li(i);Xe(i,(U?U+" ":"")+a)}}function ye(i,a){i.classList!==void 0?i.classList.remove(a):Xe(i,p((" "+li(i)+" ").replace(" "+a+" "," ")))}function Xe(i,a){i.className.baseVal===void 0?i.className=a:i.className.baseVal=a}function li(i){return i.correspondingElement&&(i=i.correspondingElement),i.className.baseVal===void 0?i.className:i.className.baseVal}function ln(i,a){"opacity"in i.style?i.style.opacity=a:"filter"in i.style&&Es(i,a)}function Es(i,a){var u=!1,x="DXImageTransform.Microsoft.Alpha";try{u=i.filters.item(x)}catch{if(a===1)return}a=Math.round(a*100),u?(u.Enabled=a!==100,u.Opacity=a):i.style.filter+=" progid:"+x+"(opacity="+a+")"}function Ts(i){for(var a=document.documentElement.style,u=0;u<i.length;u++)if(i[u]in a)return i[u];return!1}function Pi(i,a,u){var x=a||new Y(0,0);i.style[Te]=(Vt.ie3d?"translate("+x.x+"px,"+x.y+"px)":"translate3d("+x.x+"px,"+x.y+"px,0)")+(u?" scale("+u+")":"")}function De(i,a){i._leaflet_pos=a,Vt.any3d?Pi(i,a):(i.style.left=a.x+"px",i.style.top=a.y+"px")}function Li(i){return i._leaflet_pos||new Y(0,0)}var Br,Hr,Oo;if("onselectstart"in document)Br=function(){ie(window,"selectstart",We)},Hr=function(){xe(window,"selectstart",We)};else{var Gr=Ts(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);Br=function(){if(Gr){var i=document.documentElement.style;Oo=i[Gr],i[Gr]="none"}},Hr=function(){Gr&&(document.documentElement.style[Gr]=Oo,Oo=void 0)}}function Uo(){ie(window,"dragstart",We)}function zo(){xe(window,"dragstart",We)}var As,Fo;function ko(i){for(;i.tabIndex===-1;)i=i.parentNode;i.style&&(Cs(),As=i,Fo=i.style.outlineStyle,i.style.outlineStyle="none",ie(window,"keydown",Cs))}function Cs(){As&&(As.style.outlineStyle=Fo,As=void 0,Fo=void 0,xe(window,"keydown",Cs))}function gl(i){do i=i.parentNode;while((!i.offsetWidth||!i.offsetHeight)&&i!==document.body);return i}function Bo(i){var a=i.getBoundingClientRect();return{x:a.width/i.offsetWidth||1,y:a.height/i.offsetHeight||1,boundingClientRect:a}}var id={__proto__:null,TRANSFORM:Te,TRANSITION:tn,TRANSITION_END:ve,get:ee,getStyle:qn,create:Zt,remove:fe,empty:Ci,toFront:yn,toBack:zn,hasClass:Ie,addClass:Yt,removeClass:ye,setClass:Xe,getClass:li,setOpacity:ln,testProp:Ts,setTransform:Pi,setPosition:De,getPosition:Li,get disableTextSelection(){return Br},get enableTextSelection(){return Hr},disableImageDrag:Uo,enableImageDrag:zo,preventOutline:ko,restoreOutline:Cs,getSizedParentNode:gl,getScale:Bo};function ie(i,a,u,x){if(a&&typeof a=="object")for(var E in a)Go(i,E,a[E],u);else{a=M(a);for(var U=0,j=a.length;U<j;U++)Go(i,a[U],u,x)}return this}var Fn="_leaflet_events";function xe(i,a,u,x){if(arguments.length===1)vl(i),delete i[Fn];else if(a&&typeof a=="object")for(var E in a)Vo(i,E,a[E],u);else if(a=M(a),arguments.length===2)vl(i,function(ht){return I(a,ht)!==-1});else for(var U=0,j=a.length;U<j;U++)Vo(i,a[U],u,x);return this}function vl(i,a){for(var u in i[Fn]){var x=u.split(/\d/)[0];(!a||a(x))&&Vo(i,x,null,null,u)}}var Ho={mouseenter:"mouseover",mouseleave:"mouseout",wheel:!("onwheel"in window)&&"mousewheel"};function Go(i,a,u,x){var E=a+h(u)+(x?"_"+h(x):"");if(i[Fn]&&i[Fn][E])return this;var U=function(ht){return u.call(x||i,ht||window.event)},j=U;!Vt.touchNative&&Vt.pointer&&a.indexOf("touch")===0?U=_t(i,a,U):Vt.touch&&a==="dblclick"?U=be(i,U):"addEventListener"in i?a==="touchstart"||a==="touchmove"||a==="wheel"||a==="mousewheel"?i.addEventListener(Ho[a]||a,U,Vt.passiveEvents?{passive:!1}:!1):a==="mouseenter"||a==="mouseleave"?(U=function(ht){ht=ht||window.event,Zo(i,ht)&&j(ht)},i.addEventListener(Ho[a],U,!1)):i.addEventListener(a,j,!1):i.attachEvent("on"+a,U),i[Fn]=i[Fn]||{},i[Fn][E]=U}function Vo(i,a,u,x,E){E=E||a+h(u)+(x?"_"+h(x):"");var U=i[Fn]&&i[Fn][E];if(!U)return this;!Vt.touchNative&&Vt.pointer&&a.indexOf("touch")===0?gt(i,a,U):Vt.touch&&a==="dblclick"?Qe(i,U):"removeEventListener"in i?i.removeEventListener(Ho[a]||a,U,!1):i.detachEvent("on"+a,U),i[Fn][E]=null}function Ri(i){return i.stopPropagation?i.stopPropagation():i.originalEvent?i.originalEvent._stopped=!0:i.cancelBubble=!0,this}function Wo(i){return Go(i,"wheel",Ri),this}function Vr(i){return ie(i,"mousedown touchstart dblclick contextmenu",Ri),i._leaflet_disable_click=!0,this}function We(i){return i.preventDefault?i.preventDefault():i.returnValue=!1,this}function Ii(i){return We(i),Ri(i),this}function xl(i){if(i.composedPath)return i.composedPath();for(var a=[],u=i.target;u;)a.push(u),u=u.parentNode;return a}function yl(i,a){if(!a)return new Y(i.clientX,i.clientY);var u=Bo(a),x=u.boundingClientRect;return new Y((i.clientX-x.left)/u.x-a.clientLeft,(i.clientY-x.top)/u.y-a.clientTop)}var rd=Vt.linux&&Vt.chrome?window.devicePixelRatio:Vt.mac?window.devicePixelRatio*3:window.devicePixelRatio>0?2*window.devicePixelRatio:1;function Ml(i){return Vt.edge?i.wheelDeltaY/2:i.deltaY&&i.deltaMode===0?-i.deltaY/rd:i.deltaY&&i.deltaMode===1?-i.deltaY*20:i.deltaY&&i.deltaMode===2?-i.deltaY*60:i.deltaX||i.deltaZ?0:i.wheelDelta?(i.wheelDeltaY||i.wheelDelta)/2:i.detail&&Math.abs(i.detail)<32765?-i.detail*20:i.detail?i.detail/-32765*60:0}function Zo(i,a){var u=a.relatedTarget;if(!u)return!0;try{for(;u&&u!==i;)u=u.parentNode}catch{return!1}return u!==i}var sd={__proto__:null,on:ie,off:xe,stopPropagation:Ri,disableScrollPropagation:Wo,disableClickPropagation:Vr,preventDefault:We,stop:Ii,getPropagationPath:xl,getMousePosition:yl,getWheelDelta:Ml,isExternalTarget:Zo,addListener:ie,removeListener:xe},Sl=ot.extend({run:function(i,a,u,x){this.stop(),this._el=i,this._inProgress=!0,this._duration=u||.25,this._easeOutPower=1/Math.max(x||.5,.2),this._startPos=Li(i),this._offset=a.subtract(this._startPos),this._startTime=+new Date,this.fire("start"),this._animate()},stop:function(){this._inProgress&&(this._step(!0),this._complete())},_animate:function(){this._animId=W(this._animate,this),this._step()},_step:function(i){var a=+new Date-this._startTime,u=this._duration*1e3;a<u?this._runFrame(this._easeOut(a/u),i):(this._runFrame(1),this._complete())},_runFrame:function(i,a){var u=this._startPos.add(this._offset.multiplyBy(i));a&&u._round(),De(this._el,u),this.fire("step")},_complete:function(){O(this._animId),this._inProgress=!1,this.fire("end")},_easeOut:function(i){return 1-Math.pow(1-i,this._easeOutPower)}}),de=ot.extend({options:{crs:xt,center:void 0,zoom:void 0,minZoom:void 0,maxZoom:void 0,layers:[],maxBounds:void 0,renderer:void 0,zoomAnimation:!0,zoomAnimationThreshold:4,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function(i,a){a=y(this,a),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this._initContainer(i),this._initLayout(),this._onResize=l(this._onResize,this),this._initEvents(),a.maxBounds&&this.setMaxBounds(a.maxBounds),a.zoom!==void 0&&(this._zoom=this._limitZoom(a.zoom)),a.center&&a.zoom!==void 0&&this.setView(Mt(a.center),a.zoom,{reset:!0}),this.callInitHooks(),this._zoomAnimated=tn&&Vt.any3d&&!Vt.mobileOpera&&this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),ie(this._proxy,ve,this._catchTransitionEnd,this)),this._addLayers(this.options.layers)},setView:function(i,a,u){if(a=a===void 0?this._zoom:this._limitZoom(a),i=this._limitCenter(Mt(i),a,this.options.maxBounds),u=u||{},this._stop(),this._loaded&&!u.reset&&u!==!0){u.animate!==void 0&&(u.zoom=s({animate:u.animate},u.zoom),u.pan=s({animate:u.animate,duration:u.duration},u.pan));var x=this._zoom!==a?this._tryAnimatedZoom&&this._tryAnimatedZoom(i,a,u.zoom):this._tryAnimatedPan(i,u.pan);if(x)return clearTimeout(this._sizeTimer),this}return this._resetView(i,a,u.pan&&u.pan.noMoveStart),this},setZoom:function(i,a){return this._loaded?this.setView(this.getCenter(),i,{zoom:a}):(this._zoom=i,this)},zoomIn:function(i,a){return i=i||(Vt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+i,a)},zoomOut:function(i,a){return i=i||(Vt.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-i,a)},setZoomAround:function(i,a,u){var x=this.getZoomScale(a),E=this.getSize().divideBy(2),U=i instanceof Y?i:this.latLngToContainerPoint(i),j=U.subtract(E).multiplyBy(1-1/x),ht=this.containerPointToLatLng(E.add(j));return this.setView(ht,a,{zoom:u})},_getBoundsCenterZoom:function(i,a){a=a||{},i=i.getBounds?i.getBounds():J(i);var u=rt(a.paddingTopLeft||a.padding||[0,0]),x=rt(a.paddingBottomRight||a.padding||[0,0]),E=this.getBoundsZoom(i,!1,u.add(x));if(E=typeof a.maxZoom=="number"?Math.min(a.maxZoom,E):E,E===1/0)return{center:i.getCenter(),zoom:E};var U=x.subtract(u).divideBy(2),j=this.project(i.getSouthWest(),E),ht=this.project(i.getNorthEast(),E),mt=this.unproject(j.add(ht).divideBy(2).add(U),E);return{center:mt,zoom:E}},fitBounds:function(i,a){if(i=J(i),!i.isValid())throw new Error("Bounds are not valid.");var u=this._getBoundsCenterZoom(i,a);return this.setView(u.center,u.zoom,a)},fitWorld:function(i){return this.fitBounds([[-90,-180],[90,180]],i)},panTo:function(i,a){return this.setView(i,this._zoom,{pan:a})},panBy:function(i,a){if(i=rt(i).round(),a=a||{},!i.x&&!i.y)return this.fire("moveend");if(a.animate!==!0&&!this.getSize().contains(i))return this._resetView(this.unproject(this.project(this.getCenter()).add(i)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new Sl,this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),a.noMoveStart||this.fire("movestart"),a.animate!==!1){Yt(this._mapPane,"leaflet-pan-anim");var u=this._getMapPanePos().subtract(i).round();this._panAnim.run(this._mapPane,u,a.duration||.25,a.easeLinearity)}else this._rawPanBy(i),this.fire("move").fire("moveend");return this},flyTo:function(i,a,u){if(u=u||{},u.animate===!1||!Vt.any3d)return this.setView(i,a,u);this._stop();var x=this.project(this.getCenter()),E=this.project(i),U=this.getSize(),j=this._zoom;i=Mt(i),a=a===void 0?j:a;var ht=Math.max(U.x,U.y),mt=ht*this.getZoomScale(j,a),At=E.distanceTo(x)||1,kt=1.42,jt=kt*kt;function he(Ne){var Bs=Ne?-1:1,qd=Ne?mt:ht,Yd=mt*mt-ht*ht+Bs*jt*jt*At*At,jd=2*qd*jt*At,na=Yd/jd,nc=Math.sqrt(na*na+1)-na,Kd=nc<1e-9?-18:Math.log(nc);return Kd}function en(Ne){return(Math.exp(Ne)-Math.exp(-Ne))/2}function ke(Ne){return(Math.exp(Ne)+Math.exp(-Ne))/2}function Sn(Ne){return en(Ne)/ke(Ne)}var cn=he(0);function ir(Ne){return ht*(ke(cn)/ke(cn+kt*Ne))}function Vd(Ne){return ht*(ke(cn)*Sn(cn+kt*Ne)-en(cn))/jt}function Wd(Ne){return 1-Math.pow(1-Ne,1.5)}var Zd=Date.now(),tc=(he(1)-cn)/kt,Xd=u.duration?1e3*u.duration:1e3*tc*.8;function ec(){var Ne=(Date.now()-Zd)/Xd,Bs=Wd(Ne)*tc;Ne<=1?(this._flyToFrame=W(ec,this),this._move(this.unproject(x.add(E.subtract(x).multiplyBy(Vd(Bs)/At)),j),this.getScaleZoom(ht/ir(Bs),j),{flyTo:!0})):this._move(i,a)._moveEnd(!0)}return this._moveStart(!0,u.noMoveStart),ec.call(this),this},flyToBounds:function(i,a){var u=this._getBoundsCenterZoom(i,a);return this.flyTo(u.center,u.zoom,a)},setMaxBounds:function(i){return i=J(i),this.listens("moveend",this._panInsideMaxBounds)&&this.off("moveend",this._panInsideMaxBounds),i.isValid()?(this.options.maxBounds=i,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this)},setMinZoom:function(i){var a=this.options.minZoom;return this.options.minZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()<this.options.minZoom)?this.setZoom(i):this},setMaxZoom:function(i){var a=this.options.maxZoom;return this.options.maxZoom=i,this._loaded&&a!==i&&(this.fire("zoomlevelschange"),this.getZoom()>this.options.maxZoom)?this.setZoom(i):this},panInsideBounds:function(i,a){this._enforcingBounds=!0;var u=this.getCenter(),x=this._limitCenter(u,this._zoom,J(i));return u.equals(x)||this.panTo(x,a),this._enforcingBounds=!1,this},panInside:function(i,a){a=a||{};var u=rt(a.paddingTopLeft||a.padding||[0,0]),x=rt(a.paddingBottomRight||a.padding||[0,0]),E=this.project(this.getCenter()),U=this.project(i),j=this.getPixelBounds(),ht=Q([j.min.add(u),j.max.subtract(x)]),mt=ht.getSize();if(!ht.contains(U)){this._enforcingBounds=!0;var At=U.subtract(ht.getCenter()),kt=ht.extend(U).getSize().subtract(mt);E.x+=At.x<0?-kt.x:kt.x,E.y+=At.y<0?-kt.y:kt.y,this.panTo(this.unproject(E),a),this._enforcingBounds=!1}return this},invalidateSize:function(i){if(!this._loaded)return this;i=s({animate:!1,pan:!0},i===!0?{animate:!0}:i);var a=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var u=this.getSize(),x=a.divideBy(2).round(),E=u.divideBy(2).round(),U=x.subtract(E);return!U.x&&!U.y?this:(i.animate&&i.pan?this.panBy(U):(i.pan&&this._rawPanBy(U),this.fire("move"),i.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(l(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:a,newSize:u}))},stop:function(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop()},locate:function(i){if(i=this._locateOptions=s({timeout:1e4,watch:!1},i),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var a=l(this._handleGeolocationResponse,this),u=l(this._handleGeolocationError,this);return i.watch?this._locationWatchId=navigator.geolocation.watchPosition(a,u,i):navigator.geolocation.getCurrentPosition(a,u,i),this},stopLocate:function(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this},_handleGeolocationError:function(i){if(this._container._leaflet_id){var a=i.code,u=i.message||(a===1?"permission denied":a===2?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:a,message:"Geolocation error: "+u+"."})}},_handleGeolocationResponse:function(i){if(this._container._leaflet_id){var a=i.coords.latitude,u=i.coords.longitude,x=new et(a,u),E=x.toBounds(i.coords.accuracy*2),U=this._locateOptions;if(U.setView){var j=this.getBoundsZoom(E);this.setView(x,U.maxZoom?Math.min(j,U.maxZoom):j)}var ht={latlng:x,bounds:E,timestamp:i.timestamp};for(var mt in i.coords)typeof i.coords[mt]=="number"&&(ht[mt]=i.coords[mt]);this.fire("locationfound",ht)}},addHandler:function(i,a){if(!a)return this;var u=this[i]=new a(this);return this._handlers.push(u),this.options[i]&&u.enable(),this},remove:function(){if(this._initEvents(!0),this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId}catch{this._container._leaflet_id=void 0,this._containerId=void 0}this._locationWatchId!==void 0&&this.stopLocate(),this._stop(),fe(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._resizeRequest&&(O(this._resizeRequest),this._resizeRequest=null),this._clearHandlers(),this._loaded&&this.fire("unload");var i;for(i in this._layers)this._layers[i].remove();for(i in this._panes)fe(this._panes[i]);return this._layers=[],this._panes=[],delete this._mapPane,delete this._renderer,this},createPane:function(i,a){var u="leaflet-pane"+(i?" leaflet-"+i.replace("Pane","")+"-pane":""),x=Zt("div",u,a||this._mapPane);return i&&(this._panes[i]=x),x},getCenter:function(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter.clone():this.layerPointToLatLng(this._getCenterLayerPoint())},getZoom:function(){return this._zoom},getBounds:function(){var i=this.getPixelBounds(),a=this.unproject(i.getBottomLeft()),u=this.unproject(i.getTopRight());return new Ct(a,u)},getMinZoom:function(){return this.options.minZoom===void 0?this._layersMinZoom||0:this.options.minZoom},getMaxZoom:function(){return this.options.maxZoom===void 0?this._layersMaxZoom===void 0?1/0:this._layersMaxZoom:this.options.maxZoom},getBoundsZoom:function(i,a,u){i=J(i),u=rt(u||[0,0]);var x=this.getZoom()||0,E=this.getMinZoom(),U=this.getMaxZoom(),j=i.getNorthWest(),ht=i.getSouthEast(),mt=this.getSize().subtract(u),At=Q(this.project(ht,x),this.project(j,x)).getSize(),kt=Vt.any3d?this.options.zoomSnap:1,jt=mt.x/At.x,he=mt.y/At.y,en=a?Math.max(jt,he):Math.min(jt,he);return x=this.getScaleZoom(en,x),kt&&(x=Math.round(x/(kt/100))*(kt/100),x=a?Math.ceil(x/kt)*kt:Math.floor(x/kt)*kt),Math.max(E,Math.min(U,x))},getSize:function(){return(!this._size||this._sizeChanged)&&(this._size=new Y(this._container.clientWidth||0,this._container.clientHeight||0),this._sizeChanged=!1),this._size.clone()},getPixelBounds:function(i,a){var u=this._getTopLeftPoint(i,a);return new q(u,u.add(this.getSize()))},getPixelOrigin:function(){return this._checkIfLoaded(),this._pixelOrigin},getPixelWorldBounds:function(i){return this.options.crs.getProjectedBounds(i===void 0?this.getZoom():i)},getPane:function(i){return typeof i=="string"?this._panes[i]:i},getPanes:function(){return this._panes},getContainer:function(){return this._container},getZoomScale:function(i,a){var u=this.options.crs;return a=a===void 0?this._zoom:a,u.scale(i)/u.scale(a)},getScaleZoom:function(i,a){var u=this.options.crs;a=a===void 0?this._zoom:a;var x=u.zoom(i*u.scale(a));return isNaN(x)?1/0:x},project:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.latLngToPoint(Mt(i),a)},unproject:function(i,a){return a=a===void 0?this._zoom:a,this.options.crs.pointToLatLng(rt(i),a)},layerPointToLatLng:function(i){var a=rt(i).add(this.getPixelOrigin());return this.unproject(a)},latLngToLayerPoint:function(i){var a=this.project(Mt(i))._round();return a._subtract(this.getPixelOrigin())},wrapLatLng:function(i){return this.options.crs.wrapLatLng(Mt(i))},wrapLatLngBounds:function(i){return this.options.crs.wrapLatLngBounds(J(i))},distance:function(i,a){return this.options.crs.distance(Mt(i),Mt(a))},containerPointToLayerPoint:function(i){return rt(i).subtract(this._getMapPanePos())},layerPointToContainerPoint:function(i){return rt(i).add(this._getMapPanePos())},containerPointToLatLng:function(i){var a=this.containerPointToLayerPoint(rt(i));return this.layerPointToLatLng(a)},latLngToContainerPoint:function(i){return this.layerPointToContainerPoint(this.latLngToLayerPoint(Mt(i)))},mouseEventToContainerPoint:function(i){return yl(i,this._container)},mouseEventToLayerPoint:function(i){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(i))},mouseEventToLatLng:function(i){return this.layerPointToLatLng(this.mouseEventToLayerPoint(i))},_initContainer:function(i){var a=this._container=ee(i);if(a){if(a._leaflet_id)throw new Error("Map container is already initialized.")}else throw new Error("Map container not found.");ie(a,"scroll",this._onScroll,this),this._containerId=h(a)},_initLayout:function(){var i=this._container;this._fadeAnimated=this.options.fadeAnimation&&Vt.any3d,Yt(i,"leaflet-container"+(Vt.touch?" leaflet-touch":"")+(Vt.retina?" leaflet-retina":"")+(Vt.ielt9?" leaflet-oldie":"")+(Vt.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var a=qn(i,"position");a!=="absolute"&&a!=="relative"&&a!=="fixed"&&a!=="sticky"&&(i.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos()},_initPanes:function(){var i=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),De(this._mapPane,new Y(0,0)),this.createPane("tilePane"),this.createPane("overlayPane"),this.createPane("shadowPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(Yt(i.markerPane,"leaflet-zoom-hide"),Yt(i.shadowPane,"leaflet-zoom-hide"))},_resetView:function(i,a,u){De(this._mapPane,new Y(0,0));var x=!this._loaded;this._loaded=!0,a=this._limitZoom(a),this.fire("viewprereset");var E=this._zoom!==a;this._moveStart(E,u)._move(i,a)._moveEnd(E),this.fire("viewreset"),x&&this.fire("load")},_moveStart:function(i,a){return i&&this.fire("zoomstart"),a||this.fire("movestart"),this},_move:function(i,a,u,x){a===void 0&&(a=this._zoom);var E=this._zoom!==a;return this._zoom=a,this._lastCenter=i,this._pixelOrigin=this._getNewPixelOrigin(i),x?u&&u.pinch&&this.fire("zoom",u):((E||u&&u.pinch)&&this.fire("zoom",u),this.fire("move",u)),this},_moveEnd:function(i){return i&&this.fire("zoomend"),this.fire("moveend")},_stop:function(){return O(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this},_rawPanBy:function(i){De(this._mapPane,this._getMapPanePos().subtract(i))},_getZoomSpan:function(){return this.getMaxZoom()-this.getMinZoom()},_panInsideMaxBounds:function(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds)},_checkIfLoaded:function(){if(!this._loaded)throw new Error("Set map center and zoom first.")},_initEvents:function(i){this._targets={},this._targets[h(this._container)]=this;var a=i?xe:ie;a(this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress keydown keyup",this._handleDOMEvent,this),this.options.trackResize&&a(window,"resize",this._onResize,this),Vt.any3d&&this.options.transform3DLimit&&(i?this.off:this.on).call(this,"moveend",this._onMoveEnd)},_onResize:function(){O(this._resizeRequest),this._resizeRequest=W(function(){this.invalidateSize({debounceMoveend:!0})},this)},_onScroll:function(){this._container.scrollTop=0,this._container.scrollLeft=0},_onMoveEnd:function(){var i=this._getMapPanePos();Math.max(Math.abs(i.x),Math.abs(i.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom())},_findEventTargets:function(i,a){for(var u=[],x,E=a==="mouseout"||a==="mouseover",U=i.target||i.srcElement,j=!1;U;){if(x=this._targets[h(U)],x&&(a==="click"||a==="preclick")&&this._draggableMoved(x)){j=!0;break}if(x&&x.listens(a,!0)&&(E&&!Zo(U,i)||(u.push(x),E))||U===this._container)break;U=U.parentNode}return!u.length&&!j&&!E&&this.listens(a,!0)&&(u=[this]),u},_isClickDisabled:function(i){for(;i&&i!==this._container;){if(i._leaflet_disable_click)return!0;i=i.parentNode}},_handleDOMEvent:function(i){var a=i.target||i.srcElement;if(!(!this._loaded||a._leaflet_disable_events||i.type==="click"&&this._isClickDisabled(a))){var u=i.type;u==="mousedown"&&ko(a),this._fireDOMEvent(i,u)}},_mouseEvents:["click","dblclick","mouseover","mouseout","contextmenu"],_fireDOMEvent:function(i,a,u){if(i.type==="click"){var x=s({},i);x.type="preclick",this._fireDOMEvent(x,x.type,u)}var E=this._findEventTargets(i,a);if(u){for(var U=[],j=0;j<u.length;j++)u[j].listens(a,!0)&&U.push(u[j]);E=U.concat(E)}if(E.length){a==="contextmenu"&&We(i);var ht=E[0],mt={originalEvent:i};if(i.type!=="keypress"&&i.type!=="keydown"&&i.type!=="keyup"){var At=ht.getLatLng&&(!ht._radius||ht._radius<=10);mt.containerPoint=At?this.latLngToContainerPoint(ht.getLatLng()):this.mouseEventToContainerPoint(i),mt.layerPoint=this.containerPointToLayerPoint(mt.containerPoint),mt.latlng=At?ht.getLatLng():this.layerPointToLatLng(mt.layerPoint)}for(j=0;j<E.length;j++)if(E[j].fire(a,mt,!0),mt.originalEvent._stopped||E[j].options.bubblingMouseEvents===!1&&I(this._mouseEvents,a)!==-1)return}},_draggableMoved:function(i){return i=i.dragging&&i.dragging.enabled()?i:this,i.dragging&&i.dragging.moved()||this.boxZoom&&this.boxZoom.moved()},_clearHandlers:function(){for(var i=0,a=this._handlers.length;i<a;i++)this._handlers[i].disable()},whenReady:function(i,a){return this._loaded?i.call(a||this,{target:this}):this.on("load",i,a),this},_getMapPanePos:function(){return Li(this._mapPane)||new Y(0,0)},_moved:function(){var i=this._getMapPanePos();return i&&!i.equals([0,0])},_getTopLeftPoint:function(i,a){var u=i&&a!==void 0?this._getNewPixelOrigin(i,a):this.getPixelOrigin();return u.subtract(this._getMapPanePos())},_getNewPixelOrigin:function(i,a){var u=this.getSize()._divideBy(2);return this.project(i,a)._subtract(u)._add(this._getMapPanePos())._round()},_latLngToNewLayerPoint:function(i,a,u){var x=this._getNewPixelOrigin(u,a);return this.project(i,a)._subtract(x)},_latLngBoundsToNewLayerBounds:function(i,a,u){var x=this._getNewPixelOrigin(u,a);return Q([this.project(i.getSouthWest(),a)._subtract(x),this.project(i.getNorthWest(),a)._subtract(x),this.project(i.getSouthEast(),a)._subtract(x),this.project(i.getNorthEast(),a)._subtract(x)])},_getCenterLayerPoint:function(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2))},_getCenterOffset:function(i){return this.latLngToLayerPoint(i).subtract(this._getCenterLayerPoint())},_limitCenter:function(i,a,u){if(!u)return i;var x=this.project(i,a),E=this.getSize().divideBy(2),U=new q(x.subtract(E),x.add(E)),j=this._getBoundsOffset(U,u,a);return Math.abs(j.x)<=1&&Math.abs(j.y)<=1?i:this.unproject(x.add(j),a)},_limitOffset:function(i,a){if(!a)return i;var u=this.getPixelBounds(),x=new q(u.min.add(i),u.max.add(i));return i.add(this._getBoundsOffset(x,a))},_getBoundsOffset:function(i,a,u){var x=Q(this.project(a.getNorthEast(),u),this.project(a.getSouthWest(),u)),E=x.min.subtract(i.min),U=x.max.subtract(i.max),j=this._rebound(E.x,-U.x),ht=this._rebound(E.y,-U.y);return new Y(j,ht)},_rebound:function(i,a){return i+a>0?Math.round(i-a)/2:Math.max(0,Math.ceil(i))-Math.max(0,Math.floor(a))},_limitZoom:function(i){var a=this.getMinZoom(),u=this.getMaxZoom(),x=Vt.any3d?this.options.zoomSnap:1;return x&&(i=Math.round(i/x)*x),Math.max(a,Math.min(u,i))},_onPanTransitionStep:function(){this.fire("move")},_onPanTransitionEnd:function(){ye(this._mapPane,"leaflet-pan-anim"),this.fire("moveend")},_tryAnimatedPan:function(i,a){var u=this._getCenterOffset(i)._trunc();return(a&&a.animate)!==!0&&!this.getSize().contains(u)?!1:(this.panBy(u,a),!0)},_createAnimProxy:function(){var i=this._proxy=Zt("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(i),this.on("zoomanim",function(a){var u=Te,x=this._proxy.style[u];Pi(this._proxy,this.project(a.center,a.zoom),this.getZoomScale(a.zoom,1)),x===this._proxy.style[u]&&this._animatingZoom&&this._onZoomTransitionEnd()},this),this.on("load moveend",this._animMoveEnd,this),this._on("unload",this._destroyAnimProxy,this)},_destroyAnimProxy:function(){fe(this._proxy),this.off("load moveend",this._animMoveEnd,this),delete this._proxy},_animMoveEnd:function(){var i=this.getCenter(),a=this.getZoom();Pi(this._proxy,this.project(i,a),this.getZoomScale(a,1))},_catchTransitionEnd:function(i){this._animatingZoom&&i.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd()},_nothingToAnimate:function(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length},_tryAnimatedZoom:function(i,a,u){if(this._animatingZoom)return!0;if(u=u||{},!this._zoomAnimated||u.animate===!1||this._nothingToAnimate()||Math.abs(a-this._zoom)>this.options.zoomAnimationThreshold)return!1;var x=this.getZoomScale(a),E=this._getCenterOffset(i)._divideBy(1-1/x);return u.animate!==!0&&!this.getSize().contains(E)?!1:(W(function(){this._moveStart(!0,u.noMoveStart||!1)._animateZoom(i,a,!0)},this),!0)},_animateZoom:function(i,a,u,x){this._mapPane&&(u&&(this._animatingZoom=!0,this._animateToCenter=i,this._animateToZoom=a,Yt(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:i,zoom:a,noUpdate:x}),this._tempFireZoomEvent||(this._tempFireZoomEvent=this._zoom!==this._animateToZoom),this._move(this._animateToCenter,this._animateToZoom,void 0,!0),setTimeout(l(this._onZoomTransitionEnd,this),250))},_onZoomTransitionEnd:function(){this._animatingZoom&&(this._mapPane&&ye(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom,void 0,!0),this._tempFireZoomEvent&&this.fire("zoom"),delete this._tempFireZoomEvent,this.fire("move"),this._moveEnd(!0))}});function od(i,a){return new de(i,a)}var Cn=A.extend({options:{position:"topright"},initialize:function(i){y(this,i)},getPosition:function(){return this.options.position},setPosition:function(i){var a=this._map;return a&&a.removeControl(this),this.options.position=i,a&&a.addControl(this),this},getContainer:function(){return this._container},addTo:function(i){this.remove(),this._map=i;var a=this._container=this.onAdd(i),u=this.getPosition(),x=i._controlCorners[u];return Yt(a,"leaflet-control"),u.indexOf("bottom")!==-1?x.insertBefore(a,x.firstChild):x.appendChild(a),this._map.on("unload",this.remove,this),this},remove:function(){return this._map?(fe(this._container),this.onRemove&&this.onRemove(this._map),this._map.off("unload",this.remove,this),this._map=null,this):this},_refocusOnMap:function(i){this._map&&i&&i.screenX>0&&i.screenY>0&&this._map.getContainer().focus()}}),Wr=function(i){return new Cn(i)};de.include({addControl:function(i){return i.addTo(this),this},removeControl:function(i){return i.remove(),this},_initControlPos:function(){var i=this._controlCorners={},a="leaflet-",u=this._controlContainer=Zt("div",a+"control-container",this._container);function x(E,U){var j=a+E+" "+a+U;i[E+U]=Zt("div",j,u)}x("top","left"),x("top","right"),x("bottom","left"),x("bottom","right")},_clearControlPos:function(){for(var i in this._controlCorners)fe(this._controlCorners[i]);fe(this._controlContainer),delete this._controlCorners,delete this._controlContainer}});var bl=Cn.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1,sortLayers:!1,sortFunction:function(i,a,u,x){return u<x?-1:x<u?1:0}},initialize:function(i,a,u){y(this,u),this._layerControlInputs=[],this._layers=[],this._lastZIndex=0,this._handlingClick=!1,this._preventClick=!1;for(var x in i)this._addLayer(i[x],x);for(x in a)this._addLayer(a[x],x,!0)},onAdd:function(i){this._initLayout(),this._update(),this._map=i,i.on("zoomend",this._checkDisabledLayers,this);for(var a=0;a<this._layers.length;a++)this._layers[a].layer.on("add remove",this._onLayerChange,this);return this._container},addTo:function(i){return Cn.prototype.addTo.call(this,i),this._expandIfNotCollapsed()},onRemove:function(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var i=0;i<this._layers.length;i++)this._layers[i].layer.off("add remove",this._onLayerChange,this)},addBaseLayer:function(i,a){return this._addLayer(i,a),this._map?this._update():this},addOverlay:function(i,a){return this._addLayer(i,a,!0),this._map?this._update():this},removeLayer:function(i){i.off("add remove",this._onLayerChange,this);var a=this._getLayer(h(i));return a&&this._layers.splice(this._layers.indexOf(a),1),this._map?this._update():this},expand:function(){Yt(this._container,"leaflet-control-layers-expanded"),this._section.style.height=null;var i=this._map.getSize().y-(this._container.offsetTop+50);return i<this._section.clientHeight?(Yt(this._section,"leaflet-control-layers-scrollbar"),this._section.style.height=i+"px"):ye(this._section,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this},collapse:function(){return ye(this._container,"leaflet-control-layers-expanded"),this},_initLayout:function(){var i="leaflet-control-layers",a=this._container=Zt("div",i),u=this.options.collapsed;a.setAttribute("aria-haspopup",!0),Vr(a),Wo(a);var x=this._section=Zt("section",i+"-list");u&&(this._map.on("click",this.collapse,this),ie(a,{mouseenter:this._expandSafely,mouseleave:this.collapse},this));var E=this._layersLink=Zt("a",i+"-toggle",a);E.href="#",E.title="Layers",E.setAttribute("role","button"),ie(E,{keydown:function(U){U.keyCode===13&&this._expandSafely()},click:function(U){We(U),this._expandSafely()}},this),u||this.expand(),this._baseLayersList=Zt("div",i+"-base",x),this._separator=Zt("div",i+"-separator",x),this._overlaysList=Zt("div",i+"-overlays",x),a.appendChild(x)},_getLayer:function(i){for(var a=0;a<this._layers.length;a++)if(this._layers[a]&&h(this._layers[a].layer)===i)return this._layers[a]},_addLayer:function(i,a,u){this._map&&i.on("add remove",this._onLayerChange,this),this._layers.push({layer:i,name:a,overlay:u}),this.options.sortLayers&&this._layers.sort(l(function(x,E){return this.options.sortFunction(x.layer,E.layer,x.name,E.name)},this)),this.options.autoZIndex&&i.setZIndex&&(this._lastZIndex++,i.setZIndex(this._lastZIndex)),this._expandIfNotCollapsed()},_update:function(){if(!this._container)return this;Ci(this._baseLayersList),Ci(this._overlaysList),this._layerControlInputs=[];var i,a,u,x,E=0;for(u=0;u<this._layers.length;u++)x=this._layers[u],this._addItem(x),a=a||x.overlay,i=i||!x.overlay,E+=x.overlay?0:1;return this.options.hideSingleBase&&(i=i&&E>1,this._baseLayersList.style.display=i?"":"none"),this._separator.style.display=a&&i?"":"none",this},_onLayerChange:function(i){this._handlingClick||this._update();var a=this._getLayer(h(i.target)),u=a.overlay?i.type==="add"?"overlayadd":"overlayremove":i.type==="add"?"baselayerchange":null;u&&this._map.fire(u,a)},_createRadioElement:function(i,a){var u='<input type="radio" class="leaflet-control-layers-selector" name="'+i+'"'+(a?' checked="checked"':"")+"/>",x=document.createElement("div");return x.innerHTML=u,x.firstChild},_addItem:function(i){var a=document.createElement("label"),u=this._map.hasLayer(i.layer),x;i.overlay?(x=document.createElement("input"),x.type="checkbox",x.className="leaflet-control-layers-selector",x.defaultChecked=u):x=this._createRadioElement("leaflet-base-layers_"+h(this),u),this._layerControlInputs.push(x),x.layerId=h(i.layer),ie(x,"click",this._onInputClick,this);var E=document.createElement("span");E.innerHTML=" "+i.name;var U=document.createElement("span");a.appendChild(U),U.appendChild(x),U.appendChild(E);var j=i.overlay?this._overlaysList:this._baseLayersList;return j.appendChild(a),this._checkDisabledLayers(),a},_onInputClick:function(){if(!this._preventClick){var i=this._layerControlInputs,a,u,x=[],E=[];this._handlingClick=!0;for(var U=i.length-1;U>=0;U--)a=i[U],u=this._getLayer(a.layerId).layer,a.checked?x.push(u):a.checked||E.push(u);for(U=0;U<E.length;U++)this._map.hasLayer(E[U])&&this._map.removeLayer(E[U]);for(U=0;U<x.length;U++)this._map.hasLayer(x[U])||this._map.addLayer(x[U]);this._handlingClick=!1,this._refocusOnMap()}},_checkDisabledLayers:function(){for(var i=this._layerControlInputs,a,u,x=this._map.getZoom(),E=i.length-1;E>=0;E--)a=i[E],u=this._getLayer(a.layerId).layer,a.disabled=u.options.minZoom!==void 0&&x<u.options.minZoom||u.options.maxZoom!==void 0&&x>u.options.maxZoom},_expandIfNotCollapsed:function(){return this._map&&!this.options.collapsed&&this.expand(),this},_expandSafely:function(){var i=this._section;this._preventClick=!0,ie(i,"click",We),this.expand();var a=this;setTimeout(function(){xe(i,"click",We),a._preventClick=!1})}}),ad=function(i,a,u){return new bl(i,a,u)},Xo=Cn.extend({options:{position:"topleft",zoomInText:'<span aria-hidden="true">+</span>',zoomInTitle:"Zoom in",zoomOutText:'<span aria-hidden="true">&#x2212;</span>',zoomOutTitle:"Zoom out"},onAdd:function(i){var a="leaflet-control-zoom",u=Zt("div",a+" leaflet-bar"),x=this.options;return this._zoomInButton=this._createButton(x.zoomInText,x.zoomInTitle,a+"-in",u,this._zoomIn),this._zoomOutButton=this._createButton(x.zoomOutText,x.zoomOutTitle,a+"-out",u,this._zoomOut),this._updateDisabled(),i.on("zoomend zoomlevelschange",this._updateDisabled,this),u},onRemove:function(i){i.off("zoomend zoomlevelschange",this._updateDisabled,this)},disable:function(){return this._disabled=!0,this._updateDisabled(),this},enable:function(){return this._disabled=!1,this._updateDisabled(),this},_zoomIn:function(i){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(i.shiftKey?3:1))},_zoomOut:function(i){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(i.shiftKey?3:1))},_createButton:function(i,a,u,x,E){var U=Zt("a",u,x);return U.innerHTML=i,U.href="#",U.title=a,U.setAttribute("role","button"),U.setAttribute("aria-label",a),Vr(U),ie(U,"click",Ii),ie(U,"click",E,this),ie(U,"click",this._refocusOnMap,this),U},_updateDisabled:function(){var i=this._map,a="leaflet-disabled";ye(this._zoomInButton,a),ye(this._zoomOutButton,a),this._zoomInButton.setAttribute("aria-disabled","false"),this._zoomOutButton.setAttribute("aria-disabled","false"),(this._disabled||i._zoom===i.getMinZoom())&&(Yt(this._zoomOutButton,a),this._zoomOutButton.setAttribute("aria-disabled","true")),(this._disabled||i._zoom===i.getMaxZoom())&&(Yt(this._zoomInButton,a),this._zoomInButton.setAttribute("aria-disabled","true"))}});de.mergeOptions({zoomControl:!0}),de.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new Xo,this.addControl(this.zoomControl))});var ld=function(i){return new Xo(i)},wl=Cn.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function(i){var a="leaflet-control-scale",u=Zt("div",a),x=this.options;return this._addScales(x,a+"-line",u),i.on(x.updateWhenIdle?"moveend":"move",this._update,this),i.whenReady(this._update,this),u},onRemove:function(i){i.off(this.options.updateWhenIdle?"moveend":"move",this._update,this)},_addScales:function(i,a,u){i.metric&&(this._mScale=Zt("div",a,u)),i.imperial&&(this._iScale=Zt("div",a,u))},_update:function(){var i=this._map,a=i.getSize().y/2,u=i.distance(i.containerPointToLatLng([0,a]),i.containerPointToLatLng([this.options.maxWidth,a]));this._updateScales(u)},_updateScales:function(i){this.options.metric&&i&&this._updateMetric(i),this.options.imperial&&i&&this._updateImperial(i)},_updateMetric:function(i){var a=this._getRoundNum(i),u=a<1e3?a+" m":a/1e3+" km";this._updateScale(this._mScale,u,a/i)},_updateImperial:function(i){var a=i*3.2808399,u,x,E;a>5280?(u=a/5280,x=this._getRoundNum(u),this._updateScale(this._iScale,x+" mi",x/u)):(E=this._getRoundNum(a),this._updateScale(this._iScale,E+" ft",E/a))},_updateScale:function(i,a,u){i.style.width=Math.round(this.options.maxWidth*u)+"px",i.innerHTML=a},_getRoundNum:function(i){var a=Math.pow(10,(Math.floor(i)+"").length-1),u=i/a;return u=u>=10?10:u>=5?5:u>=3?3:u>=2?2:1,a*u}}),cd=function(i){return new wl(i)},hd='<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8" class="leaflet-attribution-flag"><path fill="#4C7BE1" d="M0 0h12v4H0z"/><path fill="#FFD500" d="M0 4h12v3H0z"/><path fill="#E0BC00" d="M0 7h12v1H0z"/></svg>',qo=Cn.extend({options:{position:"bottomright",prefix:'<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">'+(Vt.inlineSvg?hd+" ":"")+"Leaflet</a>"},initialize:function(i){y(this,i),this._attributions={}},onAdd:function(i){i.attributionControl=this,this._container=Zt("div","leaflet-control-attribution"),Vr(this._container);for(var a in i._layers)i._layers[a].getAttribution&&this.addAttribution(i._layers[a].getAttribution());return this._update(),i.on("layeradd",this._addAttribution,this),this._container},onRemove:function(i){i.off("layeradd",this._addAttribution,this)},_addAttribution:function(i){i.layer.getAttribution&&(this.addAttribution(i.layer.getAttribution()),i.layer.once("remove",function(){this.removeAttribution(i.layer.getAttribution())},this))},setPrefix:function(i){return this.options.prefix=i,this._update(),this},addAttribution:function(i){return i?(this._attributions[i]||(this._attributions[i]=0),this._attributions[i]++,this._update(),this):this},removeAttribution:function(i){return i?(this._attributions[i]&&(this._attributions[i]--,this._update()),this):this},_update:function(){if(this._map){var i=[];for(var a in this._attributions)this._attributions[a]&&i.push(a);var u=[];this.options.prefix&&u.push(this.options.prefix),i.length&&u.push(i.join(", ")),this._container.innerHTML=u.join(' <span aria-hidden="true">|</span> ')}}});de.mergeOptions({attributionControl:!0}),de.addInitHook(function(){this.options.attributionControl&&new qo().addTo(this)});var ud=function(i){return new qo(i)};Cn.Layers=bl,Cn.Zoom=Xo,Cn.Scale=wl,Cn.Attribution=qo,Wr.layers=ad,Wr.zoom=ld,Wr.scale=cd,Wr.attribution=ud;var kn=A.extend({initialize:function(i){this._map=i},enable:function(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this)},disable:function(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this},enabled:function(){return!!this._enabled}});kn.addTo=function(i,a){return i.addHandler(a,this),this};var dd={Events:at},El=Vt.touch?"touchstart mousedown":"mousedown",ci=ot.extend({options:{clickTolerance:3},initialize:function(i,a,u,x){y(this,x),this._element=i,this._dragStartTarget=a||i,this._preventOutline=u},enable:function(){this._enabled||(ie(this._dragStartTarget,El,this._onDown,this),this._enabled=!0)},disable:function(){this._enabled&&(ci._dragging===this&&this.finishDrag(!0),xe(this._dragStartTarget,El,this._onDown,this),this._enabled=!1,this._moved=!1)},_onDown:function(i){if(this._enabled&&(this._moved=!1,!Ie(this._element,"leaflet-zoom-anim"))){if(i.touches&&i.touches.length!==1){ci._dragging===this&&this.finishDrag();return}if(!(ci._dragging||i.shiftKey||i.which!==1&&i.button!==1&&!i.touches)&&(ci._dragging=this,this._preventOutline&&ko(this._element),Uo(),Br(),!this._moving)){this.fire("down");var a=i.touches?i.touches[0]:i,u=gl(this._element);this._startPoint=new Y(a.clientX,a.clientY),this._startPos=Li(this._element),this._parentScale=Bo(u);var x=i.type==="mousedown";ie(document,x?"mousemove":"touchmove",this._onMove,this),ie(document,x?"mouseup":"touchend touchcancel",this._onUp,this)}}},_onMove:function(i){if(this._enabled){if(i.touches&&i.touches.length>1){this._moved=!0;return}var a=i.touches&&i.touches.length===1?i.touches[0]:i,u=new Y(a.clientX,a.clientY)._subtract(this._startPoint);!u.x&&!u.y||Math.abs(u.x)+Math.abs(u.y)<this.options.clickTolerance||(u.x/=this._parentScale.x,u.y/=this._parentScale.y,We(i),this._moved||(this.fire("dragstart"),this._moved=!0,Yt(document.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,window.SVGElementInstance&&this._lastTarget instanceof window.SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),Yt(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(u),this._moving=!0,this._lastEvent=i,this._updatePosition())}},_updatePosition:function(){var i={originalEvent:this._lastEvent};this.fire("predrag",i),De(this._element,this._newPos),this.fire("drag",i)},_onUp:function(){this._enabled&&this.finishDrag()},finishDrag:function(i){ye(document.body,"leaflet-dragging"),this._lastTarget&&(ye(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null),xe(document,"mousemove touchmove",this._onMove,this),xe(document,"mouseup touchend touchcancel",this._onUp,this),zo(),Hr();var a=this._moved&&this._moving;this._moving=!1,ci._dragging=!1,a&&this.fire("dragend",{noInertia:i,distance:this._newPos.distanceTo(this._startPos)})}});function Tl(i,a,u){var x,E=[1,4,2,8],U,j,ht,mt,At,kt,jt,he;for(U=0,kt=i.length;U<kt;U++)i[U]._code=Di(i[U],a);for(ht=0;ht<4;ht++){for(jt=E[ht],x=[],U=0,kt=i.length,j=kt-1;U<kt;j=U++)mt=i[U],At=i[j],mt._code&jt?At._code&jt||(he=Ps(At,mt,jt,a,u),he._code=Di(he,a),x.push(he)):(At._code&jt&&(he=Ps(At,mt,jt,a,u),he._code=Di(he,a),x.push(he)),x.push(mt));i=x}return i}function Al(i,a){var u,x,E,U,j,ht,mt,At,kt;if(!i||i.length===0)throw new Error("latlngs not passed");Mn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var jt=Mt([0,0]),he=J(i),en=he.getNorthWest().distanceTo(he.getSouthWest())*he.getNorthEast().distanceTo(he.getNorthWest());en<1700&&(jt=Yo(i));var ke=i.length,Sn=[];for(u=0;u<ke;u++){var cn=Mt(i[u]);Sn.push(a.project(Mt([cn.lat-jt.lat,cn.lng-jt.lng])))}for(ht=mt=At=0,u=0,x=ke-1;u<ke;x=u++)E=Sn[u],U=Sn[x],j=E.y*U.x-U.y*E.x,mt+=(E.x+U.x)*j,At+=(E.y+U.y)*j,ht+=j*3;ht===0?kt=Sn[0]:kt=[mt/ht,At/ht];var ir=a.unproject(rt(kt));return Mt([ir.lat+jt.lat,ir.lng+jt.lng])}function Yo(i){for(var a=0,u=0,x=0,E=0;E<i.length;E++){var U=Mt(i[E]);a+=U.lat,u+=U.lng,x++}return Mt([a/x,u/x])}var fd={__proto__:null,clipPolygon:Tl,polygonCenter:Al,centroid:Yo};function Cl(i,a){if(!a||!i.length)return i.slice();var u=a*a;return i=_d(i,u),i=md(i,u),i}function Pl(i,a,u){return Math.sqrt(Zr(i,a,u,!0))}function pd(i,a,u){return Zr(i,a,u)}function md(i,a){var u=i.length,x=typeof Uint8Array<"u"?Uint8Array:Array,E=new x(u);E[0]=E[u-1]=1,jo(i,E,a,0,u-1);var U,j=[];for(U=0;U<u;U++)E[U]&&j.push(i[U]);return j}function jo(i,a,u,x,E){var U=0,j,ht,mt;for(ht=x+1;ht<=E-1;ht++)mt=Zr(i[ht],i[x],i[E],!0),mt>U&&(j=ht,U=mt);U>u&&(a[j]=1,jo(i,a,u,x,j),jo(i,a,u,j,E))}function _d(i,a){for(var u=[i[0]],x=1,E=0,U=i.length;x<U;x++)gd(i[x],i[E])>a&&(u.push(i[x]),E=x);return E<U-1&&u.push(i[U-1]),u}var Ll;function Rl(i,a,u,x,E){var U=x?Ll:Di(i,u),j=Di(a,u),ht,mt,At;for(Ll=j;;){if(!(U|j))return[i,a];if(U&j)return!1;ht=U||j,mt=Ps(i,a,ht,u,E),At=Di(mt,u),ht===U?(i=mt,U=At):(a=mt,j=At)}}function Ps(i,a,u,x,E){var U=a.x-i.x,j=a.y-i.y,ht=x.min,mt=x.max,At,kt;return u&8?(At=i.x+U*(mt.y-i.y)/j,kt=mt.y):u&4?(At=i.x+U*(ht.y-i.y)/j,kt=ht.y):u&2?(At=mt.x,kt=i.y+j*(mt.x-i.x)/U):u&1&&(At=ht.x,kt=i.y+j*(ht.x-i.x)/U),new Y(At,kt,E)}function Di(i,a){var u=0;return i.x<a.min.x?u|=1:i.x>a.max.x&&(u|=2),i.y<a.min.y?u|=4:i.y>a.max.y&&(u|=8),u}function gd(i,a){var u=a.x-i.x,x=a.y-i.y;return u*u+x*x}function Zr(i,a,u,x){var E=a.x,U=a.y,j=u.x-E,ht=u.y-U,mt=j*j+ht*ht,At;return mt>0&&(At=((i.x-E)*j+(i.y-U)*ht)/mt,At>1?(E=u.x,U=u.y):At>0&&(E+=j*At,U+=ht*At)),j=i.x-E,ht=i.y-U,x?j*j+ht*ht:new Y(E,U)}function Mn(i){return!b(i[0])||typeof i[0][0]!="object"&&typeof i[0][0]<"u"}function Il(i){return console.warn("Deprecated use of _flat, please use L.LineUtil.isFlat instead."),Mn(i)}function Dl(i,a){var u,x,E,U,j,ht,mt,At;if(!i||i.length===0)throw new Error("latlngs not passed");Mn(i)||(console.warn("latlngs are not flat! Only the first ring will be used"),i=i[0]);var kt=Mt([0,0]),jt=J(i),he=jt.getNorthWest().distanceTo(jt.getSouthWest())*jt.getNorthEast().distanceTo(jt.getNorthWest());he<1700&&(kt=Yo(i));var en=i.length,ke=[];for(u=0;u<en;u++){var Sn=Mt(i[u]);ke.push(a.project(Mt([Sn.lat-kt.lat,Sn.lng-kt.lng])))}for(u=0,x=0;u<en-1;u++)x+=ke[u].distanceTo(ke[u+1])/2;if(x===0)At=ke[0];else for(u=0,U=0;u<en-1;u++)if(j=ke[u],ht=ke[u+1],E=j.distanceTo(ht),U+=E,U>x){mt=(U-x)/E,At=[ht.x-mt*(ht.x-j.x),ht.y-mt*(ht.y-j.y)];break}var cn=a.unproject(rt(At));return Mt([cn.lat+kt.lat,cn.lng+kt.lng])}var vd={__proto__:null,simplify:Cl,pointToSegmentDistance:Pl,closestPointOnSegment:pd,clipSegment:Rl,_getEdgeIntersection:Ps,_getBitCode:Di,_sqClosestPointOnSegment:Zr,isFlat:Mn,_flat:Il,polylineCenter:Dl},Ko={project:function(i){return new Y(i.lng,i.lat)},unproject:function(i){return new et(i.y,i.x)},bounds:new q([-180,-90],[180,90])},$o={R:6378137,R_MINOR:6356752314245179e-9,bounds:new q([-2003750834279e-5,-1549657073972e-5],[2003750834279e-5,1876465623138e-5]),project:function(i){var a=Math.PI/180,u=this.R,x=i.lat*a,E=this.R_MINOR/u,U=Math.sqrt(1-E*E),j=U*Math.sin(x),ht=Math.tan(Math.PI/4-x/2)/Math.pow((1-j)/(1+j),U/2);return x=-u*Math.log(Math.max(ht,1e-10)),new Y(i.lng*a*u,x)},unproject:function(i){for(var a=180/Math.PI,u=this.R,x=this.R_MINOR/u,E=Math.sqrt(1-x*x),U=Math.exp(-i.y/u),j=Math.PI/2-2*Math.atan(U),ht=0,mt=.1,At;ht<15&&Math.abs(mt)>1e-7;ht++)At=E*Math.sin(j),At=Math.pow((1-At)/(1+At),E/2),mt=Math.PI/2-2*Math.atan(U*At)-j,j+=mt;return new et(j*a,i.x*a/u)}},xd={__proto__:null,LonLat:Ko,Mercator:$o,SphericalMercator:zt},yd=s({},Pt,{code:"EPSG:3395",projection:$o,transformation:function(){var i=.5/(Math.PI*$o.R);return vt(i,.5,-i,.5)}()}),Nl=s({},Pt,{code:"EPSG:4326",projection:Ko,transformation:vt(1/180,1,-1/180,.5)}),Md=s({},bt,{projection:Ko,transformation:vt(1,0,-1,0),scale:function(i){return Math.pow(2,i)},zoom:function(i){return Math.log(i)/Math.LN2},distance:function(i,a){var u=a.lng-i.lng,x=a.lat-i.lat;return Math.sqrt(u*u+x*x)},infinite:!0});bt.Earth=Pt,bt.EPSG3395=yd,bt.EPSG3857=xt,bt.EPSG900913=w,bt.EPSG4326=Nl,bt.Simple=Md;var Pn=ot.extend({options:{pane:"overlayPane",attribution:null,bubblingMouseEvents:!0},addTo:function(i){return i.addLayer(this),this},remove:function(){return this.removeFrom(this._map||this._mapToAdd)},removeFrom:function(i){return i&&i.removeLayer(this),this},getPane:function(i){return this._map.getPane(i?this.options[i]||i:this.options.pane)},addInteractiveTarget:function(i){return this._map._targets[h(i)]=this,this},removeInteractiveTarget:function(i){return delete this._map._targets[h(i)],this},getAttribution:function(){return this.options.attribution},_layerAdd:function(i){var a=i.target;if(a.hasLayer(this)){if(this._map=a,this._zoomAnimated=a._zoomAnimated,this.getEvents){var u=this.getEvents();a.on(u,this),this.once("remove",function(){a.off(u,this)},this)}this.onAdd(a),this.fire("add"),a.fire("layeradd",{layer:this})}}});de.include({addLayer:function(i){if(!i._layerAdd)throw new Error("The provided object is not a Layer.");var a=h(i);return this._layers[a]?this:(this._layers[a]=i,i._mapToAdd=this,i.beforeAdd&&i.beforeAdd(this),this.whenReady(i._layerAdd,i),this)},removeLayer:function(i){var a=h(i);return this._layers[a]?(this._loaded&&i.onRemove(this),delete this._layers[a],this._loaded&&(this.fire("layerremove",{layer:i}),i.fire("remove")),i._map=i._mapToAdd=null,this):this},hasLayer:function(i){return h(i)in this._layers},eachLayer:function(i,a){for(var u in this._layers)i.call(a,this._layers[u]);return this},_addLayers:function(i){i=i?b(i)?i:[i]:[];for(var a=0,u=i.length;a<u;a++)this.addLayer(i[a])},_addZoomLimit:function(i){(!isNaN(i.options.maxZoom)||!isNaN(i.options.minZoom))&&(this._zoomBoundLayers[h(i)]=i,this._updateZoomLevels())},_removeZoomLimit:function(i){var a=h(i);this._zoomBoundLayers[a]&&(delete this._zoomBoundLayers[a],this._updateZoomLevels())},_updateZoomLevels:function(){var i=1/0,a=-1/0,u=this._getZoomSpan();for(var x in this._zoomBoundLayers){var E=this._zoomBoundLayers[x].options;i=E.minZoom===void 0?i:Math.min(i,E.minZoom),a=E.maxZoom===void 0?a:Math.max(a,E.maxZoom)}this._layersMaxZoom=a===-1/0?void 0:a,this._layersMinZoom=i===1/0?void 0:i,u!==this._getZoomSpan()&&this.fire("zoomlevelschange"),this.options.maxZoom===void 0&&this._layersMaxZoom&&this.getZoom()>this._layersMaxZoom&&this.setZoom(this._layersMaxZoom),this.options.minZoom===void 0&&this._layersMinZoom&&this.getZoom()<this._layersMinZoom&&this.setZoom(this._layersMinZoom)}});var Ji=Pn.extend({initialize:function(i,a){y(this,a),this._layers={};var u,x;if(i)for(u=0,x=i.length;u<x;u++)this.addLayer(i[u])},addLayer:function(i){var a=this.getLayerId(i);return this._layers[a]=i,this._map&&this._map.addLayer(i),this},removeLayer:function(i){var a=i in this._layers?i:this.getLayerId(i);return this._map&&this._layers[a]&&this._map.removeLayer(this._layers[a]),delete this._layers[a],this},hasLayer:function(i){var a=typeof i=="number"?i:this.getLayerId(i);return a in this._layers},clearLayers:function(){return this.eachLayer(this.removeLayer,this)},invoke:function(i){var a=Array.prototype.slice.call(arguments,1),u,x;for(u in this._layers)x=this._layers[u],x[i]&&x[i].apply(x,a);return this},onAdd:function(i){this.eachLayer(i.addLayer,i)},onRemove:function(i){this.eachLayer(i.removeLayer,i)},eachLayer:function(i,a){for(var u in this._layers)i.call(a,this._layers[u]);return this},getLayer:function(i){return this._layers[i]},getLayers:function(){var i=[];return this.eachLayer(i.push,i),i},setZIndex:function(i){return this.invoke("setZIndex",i)},getLayerId:function(i){return h(i)}}),Sd=function(i,a){return new Ji(i,a)},Yn=Ji.extend({addLayer:function(i){return this.hasLayer(i)?this:(i.addEventParent(this),Ji.prototype.addLayer.call(this,i),this.fire("layeradd",{layer:i}))},removeLayer:function(i){return this.hasLayer(i)?(i in this._layers&&(i=this._layers[i]),i.removeEventParent(this),Ji.prototype.removeLayer.call(this,i),this.fire("layerremove",{layer:i})):this},setStyle:function(i){return this.invoke("setStyle",i)},bringToFront:function(){return this.invoke("bringToFront")},bringToBack:function(){return this.invoke("bringToBack")},getBounds:function(){var i=new Ct;for(var a in this._layers){var u=this._layers[a];i.extend(u.getBounds?u.getBounds():u.getLatLng())}return i}}),bd=function(i,a){return new Yn(i,a)},Qi=A.extend({options:{popupAnchor:[0,0],tooltipAnchor:[0,0],crossOrigin:!1},initialize:function(i){y(this,i)},createIcon:function(i){return this._createIcon("icon",i)},createShadow:function(i){return this._createIcon("shadow",i)},_createIcon:function(i,a){var u=this._getIconUrl(i);if(!u){if(i==="icon")throw new Error("iconUrl not set in Icon options (see the docs).");return null}var x=this._createImg(u,a&&a.tagName==="IMG"?a:null);return this._setIconStyles(x,i),(this.options.crossOrigin||this.options.crossOrigin==="")&&(x.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),x},_setIconStyles:function(i,a){var u=this.options,x=u[a+"Size"];typeof x=="number"&&(x=[x,x]);var E=rt(x),U=rt(a==="shadow"&&u.shadowAnchor||u.iconAnchor||E&&E.divideBy(2,!0));i.className="leaflet-marker-"+a+" "+(u.className||""),U&&(i.style.marginLeft=-U.x+"px",i.style.marginTop=-U.y+"px"),E&&(i.style.width=E.x+"px",i.style.height=E.y+"px")},_createImg:function(i,a){return a=a||document.createElement("img"),a.src=i,a},_getIconUrl:function(i){return Vt.retina&&this.options[i+"RetinaUrl"]||this.options[i+"Url"]}});function wd(i){return new Qi(i)}var Xr=Qi.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function(i){return typeof Xr.imagePath!="string"&&(Xr.imagePath=this._detectIconPath()),(this.options.imagePath||Xr.imagePath)+Qi.prototype._getIconUrl.call(this,i)},_stripUrl:function(i){var a=function(u,x,E){var U=x.exec(u);return U&&U[E]};return i=a(i,/^url\((['"])?(.+)\1\)$/,2),i&&a(i,/^(.*)marker-icon\.png$/,1)},_detectIconPath:function(){var i=Zt("div","leaflet-default-icon-path",document.body),a=qn(i,"background-image")||qn(i,"backgroundImage");if(document.body.removeChild(i),a=this._stripUrl(a),a)return a;var u=document.querySelector('link[href$="leaflet.css"]');return u?u.href.substring(0,u.href.length-11-1):""}}),Ol=kn.extend({initialize:function(i){this._marker=i},addHooks:function(){var i=this._marker._icon;this._draggable||(this._draggable=new ci(i,i,!0)),this._draggable.on({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),Yt(i,"leaflet-marker-draggable")},removeHooks:function(){this._draggable.off({dragstart:this._onDragStart,predrag:this._onPreDrag,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&ye(this._marker._icon,"leaflet-marker-draggable")},moved:function(){return this._draggable&&this._draggable._moved},_adjustPan:function(i){var a=this._marker,u=a._map,x=this._marker.options.autoPanSpeed,E=this._marker.options.autoPanPadding,U=Li(a._icon),j=u.getPixelBounds(),ht=u.getPixelOrigin(),mt=Q(j.min._subtract(ht).add(E),j.max._subtract(ht).subtract(E));if(!mt.contains(U)){var At=rt((Math.max(mt.max.x,U.x)-mt.max.x)/(j.max.x-mt.max.x)-(Math.min(mt.min.x,U.x)-mt.min.x)/(j.min.x-mt.min.x),(Math.max(mt.max.y,U.y)-mt.max.y)/(j.max.y-mt.max.y)-(Math.min(mt.min.y,U.y)-mt.min.y)/(j.min.y-mt.min.y)).multiplyBy(x);u.panBy(At,{animate:!1}),this._draggable._newPos._add(At),this._draggable._startPos._add(At),De(a._icon,this._draggable._newPos),this._onDrag(i),this._panRequest=W(this._adjustPan.bind(this,i))}},_onDragStart:function(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup&&this._marker.closePopup(),this._marker.fire("movestart").fire("dragstart")},_onPreDrag:function(i){this._marker.options.autoPan&&(O(this._panRequest),this._panRequest=W(this._adjustPan.bind(this,i)))},_onDrag:function(i){var a=this._marker,u=a._shadow,x=Li(a._icon),E=a._map.layerPointToLatLng(x);u&&De(u,x),a._latlng=E,i.latlng=E,i.oldLatLng=this._oldLatLng,a.fire("move",i).fire("drag",i)},_onDragEnd:function(i){O(this._panRequest),delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",i)}}),Ls=Pn.extend({options:{icon:new Xr,interactive:!0,keyboard:!0,title:"",alt:"Marker",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",shadowPane:"shadowPane",bubblingMouseEvents:!1,autoPanOnFocus:!0,draggable:!1,autoPan:!1,autoPanPadding:[50,50],autoPanSpeed:10},initialize:function(i,a){y(this,a),this._latlng=Mt(i)},onAdd:function(i){this._zoomAnimated=this._zoomAnimated&&i.options.markerZoomAnimation,this._zoomAnimated&&i.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update()},onRemove:function(i){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),delete this.dragging,this._zoomAnimated&&i.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow()},getEvents:function(){return{zoom:this.update,viewreset:this.update}},getLatLng:function(){return this._latlng},setLatLng:function(i){var a=this._latlng;return this._latlng=Mt(i),this.update(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},setZIndexOffset:function(i){return this.options.zIndexOffset=i,this.update()},getIcon:function(){return this.options.icon},setIcon:function(i){return this.options.icon=i,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this},getElement:function(){return this._icon},update:function(){if(this._icon&&this._map){var i=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(i)}return this},_initIcon:function(){var i=this.options,a="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),u=i.icon.createIcon(this._icon),x=!1;u!==this._icon&&(this._icon&&this._removeIcon(),x=!0,i.title&&(u.title=i.title),u.tagName==="IMG"&&(u.alt=i.alt||"")),Yt(u,a),i.keyboard&&(u.tabIndex="0",u.setAttribute("role","button")),this._icon=u,i.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&ie(u,"focus",this._panOnFocus,this);var E=i.icon.createShadow(this._shadow),U=!1;E!==this._shadow&&(this._removeShadow(),U=!0),E&&(Yt(E,a),E.alt=""),this._shadow=E,i.opacity<1&&this._updateOpacity(),x&&this.getPane().appendChild(this._icon),this._initInteraction(),E&&U&&this.getPane(i.shadowPane).appendChild(this._shadow)},_removeIcon:function(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),this.options.autoPanOnFocus&&xe(this._icon,"focus",this._panOnFocus,this),fe(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null},_removeShadow:function(){this._shadow&&fe(this._shadow),this._shadow=null},_setPos:function(i){this._icon&&De(this._icon,i),this._shadow&&De(this._shadow,i),this._zIndex=i.y+this.options.zIndexOffset,this._resetZIndex()},_updateZIndex:function(i){this._icon&&(this._icon.style.zIndex=this._zIndex+i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center).round();this._setPos(a)},_initInteraction:function(){if(this.options.interactive&&(Yt(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),Ol)){var i=this.options.draggable;this.dragging&&(i=this.dragging.enabled(),this.dragging.disable()),this.dragging=new Ol(this),i&&this.dragging.enable()}},setOpacity:function(i){return this.options.opacity=i,this._map&&this._updateOpacity(),this},_updateOpacity:function(){var i=this.options.opacity;this._icon&&ln(this._icon,i),this._shadow&&ln(this._shadow,i)},_bringToFront:function(){this._updateZIndex(this.options.riseOffset)},_resetZIndex:function(){this._updateZIndex(0)},_panOnFocus:function(){var i=this._map;if(i){var a=this.options.icon.options,u=a.iconSize?rt(a.iconSize):rt(0,0),x=a.iconAnchor?rt(a.iconAnchor):rt(0,0);i.panInside(this._latlng,{paddingTopLeft:x,paddingBottomRight:u.subtract(x)})}},_getPopupAnchor:function(){return this.options.icon.options.popupAnchor},_getTooltipAnchor:function(){return this.options.icon.options.tooltipAnchor}});function Ed(i,a){return new Ls(i,a)}var hi=Pn.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0,bubblingMouseEvents:!0},beforeAdd:function(i){this._renderer=i.getRenderer(this)},onAdd:function(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this)},onRemove:function(){this._renderer._removePath(this)},redraw:function(){return this._map&&this._renderer._updatePath(this),this},setStyle:function(i){return y(this,i),this._renderer&&(this._renderer._updateStyle(this),this.options.stroke&&i&&Object.prototype.hasOwnProperty.call(i,"weight")&&this._updateBounds()),this},bringToFront:function(){return this._renderer&&this._renderer._bringToFront(this),this},bringToBack:function(){return this._renderer&&this._renderer._bringToBack(this),this},getElement:function(){return this._path},_reset:function(){this._project(),this._update()},_clickTolerance:function(){return(this.options.stroke?this.options.weight/2:0)+(this._renderer.options.tolerance||0)}}),Rs=hi.extend({options:{fill:!0,radius:10},initialize:function(i,a){y(this,a),this._latlng=Mt(i),this._radius=this.options.radius},setLatLng:function(i){var a=this._latlng;return this._latlng=Mt(i),this.redraw(),this.fire("move",{oldLatLng:a,latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(i){return this.options.radius=this._radius=i,this.redraw()},getRadius:function(){return this._radius},setStyle:function(i){var a=i&&i.radius||this._radius;return hi.prototype.setStyle.call(this,i),this.setRadius(a),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var i=this._radius,a=this._radiusY||i,u=this._clickTolerance(),x=[i+u,a+u];this._pxBounds=new q(this._point.subtract(x),this._point.add(x))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateCircle(this)},_empty:function(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds)},_containsPoint:function(i){return i.distanceTo(this._point)<=this._radius+this._clickTolerance()}});function Td(i,a){return new Rs(i,a)}var Jo=Rs.extend({initialize:function(i,a,u){if(typeof a=="number"&&(a=s({},u,{radius:a})),y(this,a),this._latlng=Mt(i),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius},setRadius:function(i){return this._mRadius=i,this.redraw()},getRadius:function(){return this._mRadius},getBounds:function(){var i=[this._radius,this._radiusY||this._radius];return new Ct(this._map.layerPointToLatLng(this._point.subtract(i)),this._map.layerPointToLatLng(this._point.add(i)))},setStyle:hi.prototype.setStyle,_project:function(){var i=this._latlng.lng,a=this._latlng.lat,u=this._map,x=u.options.crs;if(x.distance===Pt.distance){var E=Math.PI/180,U=this._mRadius/Pt.R/E,j=u.project([a+U,i]),ht=u.project([a-U,i]),mt=j.add(ht).divideBy(2),At=u.unproject(mt).lat,kt=Math.acos((Math.cos(U*E)-Math.sin(a*E)*Math.sin(At*E))/(Math.cos(a*E)*Math.cos(At*E)))/E;(isNaN(kt)||kt===0)&&(kt=U/Math.cos(Math.PI/180*a)),this._point=mt.subtract(u.getPixelOrigin()),this._radius=isNaN(kt)?0:mt.x-u.project([At,i-kt]).x,this._radiusY=mt.y-j.y}else{var jt=x.unproject(x.project(this._latlng).subtract([this._mRadius,0]));this._point=u.latLngToLayerPoint(this._latlng),this._radius=this._point.x-u.latLngToLayerPoint(jt).x}this._updateBounds()}});function Ad(i,a,u){return new Jo(i,a,u)}var jn=hi.extend({options:{smoothFactor:1,noClip:!1},initialize:function(i,a){y(this,a),this._setLatLngs(i)},getLatLngs:function(){return this._latlngs},setLatLngs:function(i){return this._setLatLngs(i),this.redraw()},isEmpty:function(){return!this._latlngs.length},closestLayerPoint:function(i){for(var a=1/0,u=null,x=Zr,E,U,j=0,ht=this._parts.length;j<ht;j++)for(var mt=this._parts[j],At=1,kt=mt.length;At<kt;At++){E=mt[At-1],U=mt[At];var jt=x(i,E,U,!0);jt<a&&(a=jt,u=x(i,E,U))}return u&&(u.distance=Math.sqrt(a)),u},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Dl(this._defaultShape(),this._map.options.crs)},getBounds:function(){return this._bounds},addLatLng:function(i,a){return a=a||this._defaultShape(),i=Mt(i),a.push(i),this._bounds.extend(i),this.redraw()},_setLatLngs:function(i){this._bounds=new Ct,this._latlngs=this._convertLatLngs(i)},_defaultShape:function(){return Mn(this._latlngs)?this._latlngs:this._latlngs[0]},_convertLatLngs:function(i){for(var a=[],u=Mn(i),x=0,E=i.length;x<E;x++)u?(a[x]=Mt(i[x]),this._bounds.extend(a[x])):a[x]=this._convertLatLngs(i[x]);return a},_project:function(){var i=new q;this._rings=[],this._projectLatlngs(this._latlngs,this._rings,i),this._bounds.isValid()&&i.isValid()&&(this._rawPxBounds=i,this._updateBounds())},_updateBounds:function(){var i=this._clickTolerance(),a=new Y(i,i);this._rawPxBounds&&(this._pxBounds=new q([this._rawPxBounds.min.subtract(a),this._rawPxBounds.max.add(a)]))},_projectLatlngs:function(i,a,u){var x=i[0]instanceof et,E=i.length,U,j;if(x){for(j=[],U=0;U<E;U++)j[U]=this._map.latLngToLayerPoint(i[U]),u.extend(j[U]);a.push(j)}else for(U=0;U<E;U++)this._projectLatlngs(i[U],a,u)},_clipPoints:function(){var i=this._renderer._bounds;if(this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}var a=this._parts,u,x,E,U,j,ht,mt;for(u=0,E=0,U=this._rings.length;u<U;u++)for(mt=this._rings[u],x=0,j=mt.length;x<j-1;x++)ht=Rl(mt[x],mt[x+1],i,x,!0),ht&&(a[E]=a[E]||[],a[E].push(ht[0]),(ht[1]!==mt[x+1]||x===j-2)&&(a[E].push(ht[1]),E++))}},_simplifyPoints:function(){for(var i=this._parts,a=this.options.smoothFactor,u=0,x=i.length;u<x;u++)i[u]=Cl(i[u],a)},_update:function(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath())},_updatePath:function(){this._renderer._updatePoly(this)},_containsPoint:function(i,a){var u,x,E,U,j,ht,mt=this._clickTolerance();if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(u=0,U=this._parts.length;u<U;u++)for(ht=this._parts[u],x=0,j=ht.length,E=j-1;x<j;E=x++)if(!(!a&&x===0)&&Pl(i,ht[E],ht[x])<=mt)return!0;return!1}});function Cd(i,a){return new jn(i,a)}jn._flat=Il;var tr=jn.extend({options:{fill:!0},isEmpty:function(){return!this._latlngs.length||!this._latlngs[0].length},getCenter:function(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");return Al(this._defaultShape(),this._map.options.crs)},_convertLatLngs:function(i){var a=jn.prototype._convertLatLngs.call(this,i),u=a.length;return u>=2&&a[0]instanceof et&&a[0].equals(a[u-1])&&a.pop(),a},_setLatLngs:function(i){jn.prototype._setLatLngs.call(this,i),Mn(this._latlngs)&&(this._latlngs=[this._latlngs])},_defaultShape:function(){return Mn(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0]},_clipPoints:function(){var i=this._renderer._bounds,a=this.options.weight,u=new Y(a,a);if(i=new q(i.min.subtract(u),i.max.add(u)),this._parts=[],!(!this._pxBounds||!this._pxBounds.intersects(i))){if(this.options.noClip){this._parts=this._rings;return}for(var x=0,E=this._rings.length,U;x<E;x++)U=Tl(this._rings[x],i,!0),U.length&&this._parts.push(U)}},_updatePath:function(){this._renderer._updatePoly(this,!0)},_containsPoint:function(i){var a=!1,u,x,E,U,j,ht,mt,At;if(!this._pxBounds||!this._pxBounds.contains(i))return!1;for(U=0,mt=this._parts.length;U<mt;U++)for(u=this._parts[U],j=0,At=u.length,ht=At-1;j<At;ht=j++)x=u[j],E=u[ht],x.y>i.y!=E.y>i.y&&i.x<(E.x-x.x)*(i.y-x.y)/(E.y-x.y)+x.x&&(a=!a);return a||jn.prototype._containsPoint.call(this,i,!0)}});function Pd(i,a){return new tr(i,a)}var Kn=Yn.extend({initialize:function(i,a){y(this,a),this._layers={},i&&this.addData(i)},addData:function(i){var a=b(i)?i:i.features,u,x,E;if(a){for(u=0,x=a.length;u<x;u++)E=a[u],(E.geometries||E.geometry||E.features||E.coordinates)&&this.addData(E);return this}var U=this.options;if(U.filter&&!U.filter(i))return this;var j=Is(i,U);return j?(j.feature=Os(i),j.defaultOptions=j.options,this.resetStyle(j),U.onEachFeature&&U.onEachFeature(i,j),this.addLayer(j)):this},resetStyle:function(i){return i===void 0?this.eachLayer(this.resetStyle,this):(i.options=s({},i.defaultOptions),this._setLayerStyle(i,this.options.style),this)},setStyle:function(i){return this.eachLayer(function(a){this._setLayerStyle(a,i)},this)},_setLayerStyle:function(i,a){i.setStyle&&(typeof a=="function"&&(a=a(i.feature)),i.setStyle(a))}});function Is(i,a){var u=i.type==="Feature"?i.geometry:i,x=u?u.coordinates:null,E=[],U=a&&a.pointToLayer,j=a&&a.coordsToLatLng||Qo,ht,mt,At,kt;if(!x&&!u)return null;switch(u.type){case"Point":return ht=j(x),Ul(U,i,ht,a);case"MultiPoint":for(At=0,kt=x.length;At<kt;At++)ht=j(x[At]),E.push(Ul(U,i,ht,a));return new Yn(E);case"LineString":case"MultiLineString":return mt=Ds(x,u.type==="LineString"?0:1,j),new jn(mt,a);case"Polygon":case"MultiPolygon":return mt=Ds(x,u.type==="Polygon"?1:2,j),new tr(mt,a);case"GeometryCollection":for(At=0,kt=u.geometries.length;At<kt;At++){var jt=Is({geometry:u.geometries[At],type:"Feature",properties:i.properties},a);jt&&E.push(jt)}return new Yn(E);case"FeatureCollection":for(At=0,kt=u.features.length;At<kt;At++){var he=Is(u.features[At],a);he&&E.push(he)}return new Yn(E);default:throw new Error("Invalid GeoJSON object.")}}function Ul(i,a,u,x){return i?i(a,u):new Ls(u,x&&x.markersInheritOptions&&x)}function Qo(i){return new et(i[1],i[0],i[2])}function Ds(i,a,u){for(var x=[],E=0,U=i.length,j;E<U;E++)j=a?Ds(i[E],a-1,u):(u||Qo)(i[E]),x.push(j);return x}function ta(i,a){return i=Mt(i),i.alt!==void 0?[v(i.lng,a),v(i.lat,a),v(i.alt,a)]:[v(i.lng,a),v(i.lat,a)]}function Ns(i,a,u,x){for(var E=[],U=0,j=i.length;U<j;U++)E.push(a?Ns(i[U],Mn(i[U])?0:a-1,u,x):ta(i[U],x));return!a&&u&&E.length>0&&E.push(E[0].slice()),E}function er(i,a){return i.feature?s({},i.feature,{geometry:a}):Os(a)}function Os(i){return i.type==="Feature"||i.type==="FeatureCollection"?i:{type:"Feature",properties:{},geometry:i}}var ea={toGeoJSON:function(i){return er(this,{type:"Point",coordinates:ta(this.getLatLng(),i)})}};Ls.include(ea),Jo.include(ea),Rs.include(ea),jn.include({toGeoJSON:function(i){var a=!Mn(this._latlngs),u=Ns(this._latlngs,a?1:0,!1,i);return er(this,{type:(a?"Multi":"")+"LineString",coordinates:u})}}),tr.include({toGeoJSON:function(i){var a=!Mn(this._latlngs),u=a&&!Mn(this._latlngs[0]),x=Ns(this._latlngs,u?2:a?1:0,!0,i);return a||(x=[x]),er(this,{type:(u?"Multi":"")+"Polygon",coordinates:x})}}),Ji.include({toMultiPoint:function(i){var a=[];return this.eachLayer(function(u){a.push(u.toGeoJSON(i).geometry.coordinates)}),er(this,{type:"MultiPoint",coordinates:a})},toGeoJSON:function(i){var a=this.feature&&this.feature.geometry&&this.feature.geometry.type;if(a==="MultiPoint")return this.toMultiPoint(i);var u=a==="GeometryCollection",x=[];return this.eachLayer(function(E){if(E.toGeoJSON){var U=E.toGeoJSON(i);if(u)x.push(U.geometry);else{var j=Os(U);j.type==="FeatureCollection"?x.push.apply(x,j.features):x.push(j)}}}),u?er(this,{geometries:x,type:"GeometryCollection"}):{type:"FeatureCollection",features:x}}});function zl(i,a){return new Kn(i,a)}var Ld=zl,Us=Pn.extend({options:{opacity:1,alt:"",interactive:!1,crossOrigin:!1,errorOverlayUrl:"",zIndex:1,className:""},initialize:function(i,a,u){this._url=i,this._bounds=J(a),y(this,u)},onAdd:function(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(Yt(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset()},onRemove:function(){fe(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image)},setOpacity:function(i){return this.options.opacity=i,this._image&&this._updateOpacity(),this},setStyle:function(i){return i.opacity&&this.setOpacity(i.opacity),this},bringToFront:function(){return this._map&&yn(this._image),this},bringToBack:function(){return this._map&&zn(this._image),this},setUrl:function(i){return this._url=i,this._image&&(this._image.src=i),this},setBounds:function(i){return this._bounds=J(i),this._map&&this._reset(),this},getEvents:function(){var i={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},getBounds:function(){return this._bounds},getElement:function(){return this._image},_initImage:function(){var i=this._url.tagName==="IMG",a=this._image=i?this._url:Zt("img");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=m,a.onmousemove=m,a.onload=l(this.fire,this,"load"),a.onerror=l(this._overlayOnError,this,"error"),(this.options.crossOrigin||this.options.crossOrigin==="")&&(a.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),this.options.zIndex&&this._updateZIndex(),i){this._url=a.src;return}a.src=this._url,a.alt=this.options.alt},_animateZoom:function(i){var a=this._map.getZoomScale(i.zoom),u=this._map._latLngBoundsToNewLayerBounds(this._bounds,i.zoom,i.center).min;Pi(this._image,u,a)},_reset:function(){var i=this._image,a=new q(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),u=a.getSize();De(i,a.min),i.style.width=u.x+"px",i.style.height=u.y+"px"},_updateOpacity:function(){ln(this._image,this.options.opacity)},_updateZIndex:function(){this._image&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._image.style.zIndex=this.options.zIndex)},_overlayOnError:function(){this.fire("error");var i=this.options.errorOverlayUrl;i&&this._url!==i&&(this._url=i,this._image.src=i)},getCenter:function(){return this._bounds.getCenter()}}),Rd=function(i,a,u){return new Us(i,a,u)},Fl=Us.extend({options:{autoplay:!0,loop:!0,keepAspectRatio:!0,muted:!1,playsInline:!0},_initImage:function(){var i=this._url.tagName==="VIDEO",a=this._image=i?this._url:Zt("video");if(Yt(a,"leaflet-image-layer"),this._zoomAnimated&&Yt(a,"leaflet-zoom-animated"),this.options.className&&Yt(a,this.options.className),a.onselectstart=m,a.onmousemove=m,a.onloadeddata=l(this.fire,this,"load"),i){for(var u=a.getElementsByTagName("source"),x=[],E=0;E<u.length;E++)x.push(u[E].src);this._url=u.length>0?x:[a.src];return}b(this._url)||(this._url=[this._url]),!this.options.keepAspectRatio&&Object.prototype.hasOwnProperty.call(a.style,"objectFit")&&(a.style.objectFit="fill"),a.autoplay=!!this.options.autoplay,a.loop=!!this.options.loop,a.muted=!!this.options.muted,a.playsInline=!!this.options.playsInline;for(var U=0;U<this._url.length;U++){var j=Zt("source");j.src=this._url[U],a.appendChild(j)}}});function Id(i,a,u){return new Fl(i,a,u)}var kl=Us.extend({_initImage:function(){var i=this._image=this._url;Yt(i,"leaflet-image-layer"),this._zoomAnimated&&Yt(i,"leaflet-zoom-animated"),this.options.className&&Yt(i,this.options.className),i.onselectstart=m,i.onmousemove=m}});function Dd(i,a,u){return new kl(i,a,u)}var Bn=Pn.extend({options:{interactive:!1,offset:[0,0],className:"",pane:void 0,content:""},initialize:function(i,a){i&&(i instanceof et||b(i))?(this._latlng=Mt(i),y(this,a)):(y(this,i),this._source=a),this.options.content&&(this._content=this.options.content)},openOn:function(i){return i=arguments.length?i:this._source._map,i.hasLayer(this)||i.addLayer(this),this},close:function(){return this._map&&this._map.removeLayer(this),this},toggle:function(i){return this._map?this.close():(arguments.length?this._source=i:i=this._source,this._prepareOpen(),this.openOn(i._map)),this},onAdd:function(i){this._zoomAnimated=i._zoomAnimated,this._container||this._initLayout(),i._fadeAnimated&&ln(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),i._fadeAnimated&&ln(this._container,1),this.bringToFront(),this.options.interactive&&(Yt(this._container,"leaflet-interactive"),this.addInteractiveTarget(this._container))},onRemove:function(i){i._fadeAnimated?(ln(this._container,0),this._removeTimeout=setTimeout(l(fe,void 0,this._container),200)):fe(this._container),this.options.interactive&&(ye(this._container,"leaflet-interactive"),this.removeInteractiveTarget(this._container))},getLatLng:function(){return this._latlng},setLatLng:function(i){return this._latlng=Mt(i),this._map&&(this._updatePosition(),this._adjustPan()),this},getContent:function(){return this._content},setContent:function(i){return this._content=i,this.update(),this},getElement:function(){return this._container},update:function(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan())},getEvents:function(){var i={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},isOpen:function(){return!!this._map&&this._map.hasLayer(this)},bringToFront:function(){return this._map&&yn(this._container),this},bringToBack:function(){return this._map&&zn(this._container),this},_prepareOpen:function(i){var a=this._source;if(!a._map)return!1;if(a instanceof Yn){a=null;var u=this._source._layers;for(var x in u)if(u[x]._map){a=u[x];break}if(!a)return!1;this._source=a}if(!i)if(a.getCenter)i=a.getCenter();else if(a.getLatLng)i=a.getLatLng();else if(a.getBounds)i=a.getBounds().getCenter();else throw new Error("Unable to get source layer LatLng.");return this.setLatLng(i),this._map&&this.update(),!0},_updateContent:function(){if(this._content){var i=this._contentNode,a=typeof this._content=="function"?this._content(this._source||this):this._content;if(typeof a=="string")i.innerHTML=a;else{for(;i.hasChildNodes();)i.removeChild(i.firstChild);i.appendChild(a)}this.fire("contentupdate")}},_updatePosition:function(){if(this._map){var i=this._map.latLngToLayerPoint(this._latlng),a=rt(this.options.offset),u=this._getAnchor();this._zoomAnimated?De(this._container,i.add(u)):a=a.add(i).add(u);var x=this._containerBottom=-a.y,E=this._containerLeft=-Math.round(this._containerWidth/2)+a.x;this._container.style.bottom=x+"px",this._container.style.left=E+"px"}},_getAnchor:function(){return[0,0]}});de.include({_initOverlay:function(i,a,u,x){var E=a;return E instanceof i||(E=new i(x).setContent(a)),u&&E.setLatLng(u),E}}),Pn.include({_initOverlay:function(i,a,u,x){var E=u;return E instanceof i?(y(E,x),E._source=this):(E=a&&!x?a:new i(x,this),E.setContent(u)),E}});var zs=Bn.extend({options:{pane:"popupPane",offset:[0,7],maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,closeOnEscapeKey:!0,className:""},openOn:function(i){return i=arguments.length?i:this._source._map,!i.hasLayer(this)&&i._popup&&i._popup.options.autoClose&&i.removeLayer(i._popup),i._popup=this,Bn.prototype.openOn.call(this,i)},onAdd:function(i){Bn.prototype.onAdd.call(this,i),i.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof hi||this._source.on("preclick",Ri))},onRemove:function(i){Bn.prototype.onRemove.call(this,i),i.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof hi||this._source.off("preclick",Ri))},getEvents:function(){var i=Bn.prototype.getEvents.call(this);return(this.options.closeOnClick!==void 0?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(i.preclick=this.close),this.options.keepInView&&(i.moveend=this._adjustPan),i},_initLayout:function(){var i="leaflet-popup",a=this._container=Zt("div",i+" "+(this.options.className||"")+" leaflet-zoom-animated"),u=this._wrapper=Zt("div",i+"-content-wrapper",a);if(this._contentNode=Zt("div",i+"-content",u),Vr(a),Wo(this._contentNode),ie(a,"contextmenu",Ri),this._tipContainer=Zt("div",i+"-tip-container",a),this._tip=Zt("div",i+"-tip",this._tipContainer),this.options.closeButton){var x=this._closeButton=Zt("a",i+"-close-button",a);x.setAttribute("role","button"),x.setAttribute("aria-label","Close popup"),x.href="#close",x.innerHTML='<span aria-hidden="true">&#215;</span>',ie(x,"click",function(E){We(E),this.close()},this)}},_updateLayout:function(){var i=this._contentNode,a=i.style;a.width="",a.whiteSpace="nowrap";var u=i.offsetWidth;u=Math.min(u,this.options.maxWidth),u=Math.max(u,this.options.minWidth),a.width=u+1+"px",a.whiteSpace="",a.height="";var x=i.offsetHeight,E=this.options.maxHeight,U="leaflet-popup-scrolled";E&&x>E?(a.height=E+"px",Yt(i,U)):ye(i,U),this._containerWidth=this._container.offsetWidth},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center),u=this._getAnchor();De(this._container,a.add(u))},_adjustPan:function(){if(this.options.autoPan){if(this._map._panAnim&&this._map._panAnim.stop(),this._autopanning){this._autopanning=!1;return}var i=this._map,a=parseInt(qn(this._container,"marginBottom"),10)||0,u=this._container.offsetHeight+a,x=this._containerWidth,E=new Y(this._containerLeft,-u-this._containerBottom);E._add(Li(this._container));var U=i.layerPointToContainerPoint(E),j=rt(this.options.autoPanPadding),ht=rt(this.options.autoPanPaddingTopLeft||j),mt=rt(this.options.autoPanPaddingBottomRight||j),At=i.getSize(),kt=0,jt=0;U.x+x+mt.x>At.x&&(kt=U.x+x-At.x+mt.x),U.x-kt-ht.x<0&&(kt=U.x-ht.x),U.y+u+mt.y>At.y&&(jt=U.y+u-At.y+mt.y),U.y-jt-ht.y<0&&(jt=U.y-ht.y),(kt||jt)&&(this.options.keepInView&&(this._autopanning=!0),i.fire("autopanstart").panBy([kt,jt]))}},_getAnchor:function(){return rt(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0])}}),Nd=function(i,a){return new zs(i,a)};de.mergeOptions({closePopupOnClick:!0}),de.include({openPopup:function(i,a,u){return this._initOverlay(zs,i,a,u).openOn(this),this},closePopup:function(i){return i=arguments.length?i:this._popup,i&&i.close(),this}}),Pn.include({bindPopup:function(i,a){return this._popup=this._initOverlay(zs,this._popup,i,a),this._popupHandlersAdded||(this.on({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this},unbindPopup:function(){return this._popup&&(this.off({click:this._openPopup,keypress:this._onKeyPress,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this},openPopup:function(i){return this._popup&&(this instanceof Yn||(this._popup._source=this),this._popup._prepareOpen(i||this._latlng)&&this._popup.openOn(this._map)),this},closePopup:function(){return this._popup&&this._popup.close(),this},togglePopup:function(){return this._popup&&this._popup.toggle(this),this},isPopupOpen:function(){return this._popup?this._popup.isOpen():!1},setPopupContent:function(i){return this._popup&&this._popup.setContent(i),this},getPopup:function(){return this._popup},_openPopup:function(i){if(!(!this._popup||!this._map)){Ii(i);var a=i.layer||i.target;if(this._popup._source===a&&!(a instanceof hi)){this._map.hasLayer(this._popup)?this.closePopup():this.openPopup(i.latlng);return}this._popup._source=a,this.openPopup(i.latlng)}},_movePopup:function(i){this._popup.setLatLng(i.latlng)},_onKeyPress:function(i){i.originalEvent.keyCode===13&&this._openPopup(i)}});var Fs=Bn.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,opacity:.9},onAdd:function(i){Bn.prototype.onAdd.call(this,i),this.setOpacity(this.options.opacity),i.fire("tooltipopen",{tooltip:this}),this._source&&(this.addEventParent(this._source),this._source.fire("tooltipopen",{tooltip:this},!0))},onRemove:function(i){Bn.prototype.onRemove.call(this,i),i.fire("tooltipclose",{tooltip:this}),this._source&&(this.removeEventParent(this._source),this._source.fire("tooltipclose",{tooltip:this},!0))},getEvents:function(){var i=Bn.prototype.getEvents.call(this);return this.options.permanent||(i.preclick=this.close),i},_initLayout:function(){var i="leaflet-tooltip",a=i+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=Zt("div",a),this._container.setAttribute("role","tooltip"),this._container.setAttribute("id","leaflet-tooltip-"+h(this))},_updateLayout:function(){},_adjustPan:function(){},_setPosition:function(i){var a,u,x=this._map,E=this._container,U=x.latLngToContainerPoint(x.getCenter()),j=x.layerPointToContainerPoint(i),ht=this.options.direction,mt=E.offsetWidth,At=E.offsetHeight,kt=rt(this.options.offset),jt=this._getAnchor();ht==="top"?(a=mt/2,u=At):ht==="bottom"?(a=mt/2,u=0):ht==="center"?(a=mt/2,u=At/2):ht==="right"?(a=0,u=At/2):ht==="left"?(a=mt,u=At/2):j.x<U.x?(ht="right",a=0,u=At/2):(ht="left",a=mt+(kt.x+jt.x)*2,u=At/2),i=i.subtract(rt(a,u,!0)).add(kt).add(jt),ye(E,"leaflet-tooltip-right"),ye(E,"leaflet-tooltip-left"),ye(E,"leaflet-tooltip-top"),ye(E,"leaflet-tooltip-bottom"),Yt(E,"leaflet-tooltip-"+ht),De(E,i)},_updatePosition:function(){var i=this._map.latLngToLayerPoint(this._latlng);this._setPosition(i)},setOpacity:function(i){this.options.opacity=i,this._container&&ln(this._container,i)},_animateZoom:function(i){var a=this._map._latLngToNewLayerPoint(this._latlng,i.zoom,i.center);this._setPosition(a)},_getAnchor:function(){return rt(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0])}}),Od=function(i,a){return new Fs(i,a)};de.include({openTooltip:function(i,a,u){return this._initOverlay(Fs,i,a,u).openOn(this),this},closeTooltip:function(i){return i.close(),this}}),Pn.include({bindTooltip:function(i,a){return this._tooltip&&this.isTooltipOpen()&&this.unbindTooltip(),this._tooltip=this._initOverlay(Fs,this._tooltip,i,a),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this},unbindTooltip:function(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this},_initTooltipInteractions:function(i){if(!(!i&&this._tooltipHandlersAdded)){var a=i?"off":"on",u={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?u.add=this._openTooltip:(u.mouseover=this._openTooltip,u.mouseout=this.closeTooltip,u.click=this._openTooltip,this._map?this._addFocusListeners():u.add=this._addFocusListeners),this._tooltip.options.sticky&&(u.mousemove=this._moveTooltip),this[a](u),this._tooltipHandlersAdded=!i}},openTooltip:function(i){return this._tooltip&&(this instanceof Yn||(this._tooltip._source=this),this._tooltip._prepareOpen(i)&&(this._tooltip.openOn(this._map),this.getElement?this._setAriaDescribedByOnLayer(this):this.eachLayer&&this.eachLayer(this._setAriaDescribedByOnLayer,this))),this},closeTooltip:function(){if(this._tooltip)return this._tooltip.close()},toggleTooltip:function(){return this._tooltip&&this._tooltip.toggle(this),this},isTooltipOpen:function(){return this._tooltip.isOpen()},setTooltipContent:function(i){return this._tooltip&&this._tooltip.setContent(i),this},getTooltip:function(){return this._tooltip},_addFocusListeners:function(){this.getElement?this._addFocusListenersOnLayer(this):this.eachLayer&&this.eachLayer(this._addFocusListenersOnLayer,this)},_addFocusListenersOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&(ie(a,"focus",function(){this._tooltip._source=i,this.openTooltip()},this),ie(a,"blur",this.closeTooltip,this))},_setAriaDescribedByOnLayer:function(i){var a=typeof i.getElement=="function"&&i.getElement();a&&a.setAttribute("aria-describedby",this._tooltip._container.id)},_openTooltip:function(i){if(!(!this._tooltip||!this._map)){if(this._map.dragging&&this._map.dragging.moving()&&!this._openOnceFlag){this._openOnceFlag=!0;var a=this;this._map.once("moveend",function(){a._openOnceFlag=!1,a._openTooltip(i)});return}this._tooltip._source=i.layer||i.target,this.openTooltip(this._tooltip.options.sticky?i.latlng:void 0)}},_moveTooltip:function(i){var a=i.latlng,u,x;this._tooltip.options.sticky&&i.originalEvent&&(u=this._map.mouseEventToContainerPoint(i.originalEvent),x=this._map.containerPointToLayerPoint(u),a=this._map.layerPointToLatLng(x)),this._tooltip.setLatLng(a)}});var Bl=Qi.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function(i){var a=i&&i.tagName==="DIV"?i:document.createElement("div"),u=this.options;if(u.html instanceof Element?(Ci(a),a.appendChild(u.html)):a.innerHTML=u.html!==!1?u.html:"",u.bgPos){var x=rt(u.bgPos);a.style.backgroundPosition=-x.x+"px "+-x.y+"px"}return this._setIconStyles(a,"icon"),a},createShadow:function(){return null}});function Ud(i){return new Bl(i)}Qi.Default=Xr;var qr=Pn.extend({options:{tileSize:256,opacity:1,updateWhenIdle:Vt.mobile,updateWhenZooming:!0,updateInterval:200,zIndex:1,bounds:null,minZoom:0,maxZoom:void 0,maxNativeZoom:void 0,minNativeZoom:void 0,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function(i){y(this,i)},onAdd:function(){this._initContainer(),this._levels={},this._tiles={},this._resetView()},beforeAdd:function(i){i._addZoomLimit(this)},onRemove:function(i){this._removeAllTiles(),fe(this._container),i._removeZoomLimit(this),this._container=null,this._tileZoom=void 0},bringToFront:function(){return this._map&&(yn(this._container),this._setAutoZIndex(Math.max)),this},bringToBack:function(){return this._map&&(zn(this._container),this._setAutoZIndex(Math.min)),this},getContainer:function(){return this._container},setOpacity:function(i){return this.options.opacity=i,this._updateOpacity(),this},setZIndex:function(i){return this.options.zIndex=i,this._updateZIndex(),this},isLoading:function(){return this._loading},redraw:function(){if(this._map){this._removeAllTiles();var i=this._clampZoom(this._map.getZoom());i!==this._tileZoom&&(this._tileZoom=i,this._updateLevels()),this._update()}return this},getEvents:function(){var i={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=d(this._onMoveEnd,this.options.updateInterval,this)),i.move=this._onMove),this._zoomAnimated&&(i.zoomanim=this._animateZoom),i},createTile:function(){return document.createElement("div")},getTileSize:function(){var i=this.options.tileSize;return i instanceof Y?i:new Y(i,i)},_updateZIndex:function(){this._container&&this.options.zIndex!==void 0&&this.options.zIndex!==null&&(this._container.style.zIndex=this.options.zIndex)},_setAutoZIndex:function(i){for(var a=this.getPane().children,u=-i(-1/0,1/0),x=0,E=a.length,U;x<E;x++)U=a[x].style.zIndex,a[x]!==this._container&&U&&(u=i(u,+U));isFinite(u)&&(this.options.zIndex=u+i(-1,1),this._updateZIndex())},_updateOpacity:function(){if(this._map&&!Vt.ielt9){ln(this._container,this.options.opacity);var i=+new Date,a=!1,u=!1;for(var x in this._tiles){var E=this._tiles[x];if(!(!E.current||!E.loaded)){var U=Math.min(1,(i-E.loaded)/200);ln(E.el,U),U<1?a=!0:(E.active?u=!0:this._onOpaqueTile(E),E.active=!0)}}u&&!this._noPrune&&this._pruneTiles(),a&&(O(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this))}},_onOpaqueTile:m,_initContainer:function(){this._container||(this._container=Zt("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container))},_updateLevels:function(){var i=this._tileZoom,a=this.options.maxZoom;if(i!==void 0){for(var u in this._levels)u=Number(u),this._levels[u].el.children.length||u===i?(this._levels[u].el.style.zIndex=a-Math.abs(i-u),this._onUpdateLevel(u)):(fe(this._levels[u].el),this._removeTilesAtZoom(u),this._onRemoveLevel(u),delete this._levels[u]);var x=this._levels[i],E=this._map;return x||(x=this._levels[i]={},x.el=Zt("div","leaflet-tile-container leaflet-zoom-animated",this._container),x.el.style.zIndex=a,x.origin=E.project(E.unproject(E.getPixelOrigin()),i).round(),x.zoom=i,this._setZoomTransform(x,E.getCenter(),E.getZoom()),m(x.el.offsetWidth),this._onCreateLevel(x)),this._level=x,x}},_onUpdateLevel:m,_onRemoveLevel:m,_onCreateLevel:m,_pruneTiles:function(){if(this._map){var i,a,u=this._map.getZoom();if(u>this.options.maxZoom||u<this.options.minZoom){this._removeAllTiles();return}for(i in this._tiles)a=this._tiles[i],a.retain=a.current;for(i in this._tiles)if(a=this._tiles[i],a.current&&!a.active){var x=a.coords;this._retainParent(x.x,x.y,x.z,x.z-5)||this._retainChildren(x.x,x.y,x.z,x.z+2)}for(i in this._tiles)this._tiles[i].retain||this._removeTile(i)}},_removeTilesAtZoom:function(i){for(var a in this._tiles)this._tiles[a].coords.z===i&&this._removeTile(a)},_removeAllTiles:function(){for(var i in this._tiles)this._removeTile(i)},_invalidateAll:function(){for(var i in this._levels)fe(this._levels[i].el),this._onRemoveLevel(Number(i)),delete this._levels[i];this._removeAllTiles(),this._tileZoom=void 0},_retainParent:function(i,a,u,x){var E=Math.floor(i/2),U=Math.floor(a/2),j=u-1,ht=new Y(+E,+U);ht.z=+j;var mt=this._tileCoordsToKey(ht),At=this._tiles[mt];return At&&At.active?(At.retain=!0,!0):(At&&At.loaded&&(At.retain=!0),j>x?this._retainParent(E,U,j,x):!1)},_retainChildren:function(i,a,u,x){for(var E=2*i;E<2*i+2;E++)for(var U=2*a;U<2*a+2;U++){var j=new Y(E,U);j.z=u+1;var ht=this._tileCoordsToKey(j),mt=this._tiles[ht];if(mt&&mt.active){mt.retain=!0;continue}else mt&&mt.loaded&&(mt.retain=!0);u+1<x&&this._retainChildren(E,U,u+1,x)}},_resetView:function(i){var a=i&&(i.pinch||i.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),a,a)},_animateZoom:function(i){this._setView(i.center,i.zoom,!0,i.noUpdate)},_clampZoom:function(i){var a=this.options;return a.minNativeZoom!==void 0&&i<a.minNativeZoom?a.minNativeZoom:a.maxNativeZoom!==void 0&&a.maxNativeZoom<i?a.maxNativeZoom:i},_setView:function(i,a,u,x){var E=Math.round(a);this.options.maxZoom!==void 0&&E>this.options.maxZoom||this.options.minZoom!==void 0&&E<this.options.minZoom?E=void 0:E=this._clampZoom(E);var U=this.options.updateWhenZooming&&E!==this._tileZoom;(!x||U)&&(this._tileZoom=E,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),E!==void 0&&this._update(i),u||this._pruneTiles(),this._noPrune=!!u),this._setZoomTransforms(i,a)},_setZoomTransforms:function(i,a){for(var u in this._levels)this._setZoomTransform(this._levels[u],i,a)},_setZoomTransform:function(i,a,u){var x=this._map.getZoomScale(u,i.zoom),E=i.origin.multiplyBy(x).subtract(this._map._getNewPixelOrigin(a,u)).round();Vt.any3d?Pi(i.el,E,x):De(i.el,E)},_resetGrid:function(){var i=this._map,a=i.options.crs,u=this._tileSize=this.getTileSize(),x=this._tileZoom,E=this._map.getPixelWorldBounds(this._tileZoom);E&&(this._globalTileRange=this._pxBoundsToTileRange(E)),this._wrapX=a.wrapLng&&!this.options.noWrap&&[Math.floor(i.project([0,a.wrapLng[0]],x).x/u.x),Math.ceil(i.project([0,a.wrapLng[1]],x).x/u.y)],this._wrapY=a.wrapLat&&!this.options.noWrap&&[Math.floor(i.project([a.wrapLat[0],0],x).y/u.x),Math.ceil(i.project([a.wrapLat[1],0],x).y/u.y)]},_onMoveEnd:function(){!this._map||this._map._animatingZoom||this._update()},_getTiledPixelBounds:function(i){var a=this._map,u=a._animatingZoom?Math.max(a._animateToZoom,a.getZoom()):a.getZoom(),x=a.getZoomScale(u,this._tileZoom),E=a.project(i,this._tileZoom).floor(),U=a.getSize().divideBy(x*2);return new q(E.subtract(U),E.add(U))},_update:function(i){var a=this._map;if(a){var u=this._clampZoom(a.getZoom());if(i===void 0&&(i=a.getCenter()),this._tileZoom!==void 0){var x=this._getTiledPixelBounds(i),E=this._pxBoundsToTileRange(x),U=E.getCenter(),j=[],ht=this.options.keepBuffer,mt=new q(E.getBottomLeft().subtract([ht,-ht]),E.getTopRight().add([ht,-ht]));if(!(isFinite(E.min.x)&&isFinite(E.min.y)&&isFinite(E.max.x)&&isFinite(E.max.y)))throw new Error("Attempted to load an infinite number of tiles");for(var At in this._tiles){var kt=this._tiles[At].coords;(kt.z!==this._tileZoom||!mt.contains(new Y(kt.x,kt.y)))&&(this._tiles[At].current=!1)}if(Math.abs(u-this._tileZoom)>1){this._setView(i,u);return}for(var jt=E.min.y;jt<=E.max.y;jt++)for(var he=E.min.x;he<=E.max.x;he++){var en=new Y(he,jt);if(en.z=this._tileZoom,!!this._isValidTile(en)){var ke=this._tiles[this._tileCoordsToKey(en)];ke?ke.current=!0:j.push(en)}}if(j.sort(function(cn,ir){return cn.distanceTo(U)-ir.distanceTo(U)}),j.length!==0){this._loading||(this._loading=!0,this.fire("loading"));var Sn=document.createDocumentFragment();for(he=0;he<j.length;he++)this._addTile(j[he],Sn);this._level.el.appendChild(Sn)}}}},_isValidTile:function(i){var a=this._map.options.crs;if(!a.infinite){var u=this._globalTileRange;if(!a.wrapLng&&(i.x<u.min.x||i.x>u.max.x)||!a.wrapLat&&(i.y<u.min.y||i.y>u.max.y))return!1}if(!this.options.bounds)return!0;var x=this._tileCoordsToBounds(i);return J(this.options.bounds).overlaps(x)},_keyToBounds:function(i){return this._tileCoordsToBounds(this._keyToTileCoords(i))},_tileCoordsToNwSe:function(i){var a=this._map,u=this.getTileSize(),x=i.scaleBy(u),E=x.add(u),U=a.unproject(x,i.z),j=a.unproject(E,i.z);return[U,j]},_tileCoordsToBounds:function(i){var a=this._tileCoordsToNwSe(i),u=new Ct(a[0],a[1]);return this.options.noWrap||(u=this._map.wrapLatLngBounds(u)),u},_tileCoordsToKey:function(i){return i.x+":"+i.y+":"+i.z},_keyToTileCoords:function(i){var a=i.split(":"),u=new Y(+a[0],+a[1]);return u.z=+a[2],u},_removeTile:function(i){var a=this._tiles[i];a&&(fe(a.el),delete this._tiles[i],this.fire("tileunload",{tile:a.el,coords:this._keyToTileCoords(i)}))},_initTile:function(i){Yt(i,"leaflet-tile");var a=this.getTileSize();i.style.width=a.x+"px",i.style.height=a.y+"px",i.onselectstart=m,i.onmousemove=m,Vt.ielt9&&this.options.opacity<1&&ln(i,this.options.opacity)},_addTile:function(i,a){var u=this._getTilePos(i),x=this._tileCoordsToKey(i),E=this.createTile(this._wrapCoords(i),l(this._tileReady,this,i));this._initTile(E),this.createTile.length<2&&W(l(this._tileReady,this,i,null,E)),De(E,u),this._tiles[x]={el:E,coords:i,current:!0},a.appendChild(E),this.fire("tileloadstart",{tile:E,coords:i})},_tileReady:function(i,a,u){a&&this.fire("tileerror",{error:a,tile:u,coords:i});var x=this._tileCoordsToKey(i);u=this._tiles[x],u&&(u.loaded=+new Date,this._map._fadeAnimated?(ln(u.el,0),O(this._fadeFrame),this._fadeFrame=W(this._updateOpacity,this)):(u.active=!0,this._pruneTiles()),a||(Yt(u.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:u.el,coords:i})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),Vt.ielt9||!this._map._fadeAnimated?W(this._pruneTiles,this):setTimeout(l(this._pruneTiles,this),250)))},_getTilePos:function(i){return i.scaleBy(this.getTileSize()).subtract(this._level.origin)},_wrapCoords:function(i){var a=new Y(this._wrapX?f(i.x,this._wrapX):i.x,this._wrapY?f(i.y,this._wrapY):i.y);return a.z=i.z,a},_pxBoundsToTileRange:function(i){var a=this.getTileSize();return new q(i.min.unscaleBy(a).floor(),i.max.unscaleBy(a).ceil().subtract([1,1]))},_noTilesToLoad:function(){for(var i in this._tiles)if(!this._tiles[i].loaded)return!1;return!0}});function zd(i){return new qr(i)}var nr=qr.extend({options:{minZoom:0,maxZoom:18,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1,referrerPolicy:!1},initialize:function(i,a){this._url=i,a=y(this,a),a.detectRetina&&Vt.retina&&a.maxZoom>0?(a.tileSize=Math.floor(a.tileSize/2),a.zoomReverse?(a.zoomOffset--,a.minZoom=Math.min(a.maxZoom,a.minZoom+1)):(a.zoomOffset++,a.maxZoom=Math.max(a.minZoom,a.maxZoom-1)),a.minZoom=Math.max(0,a.minZoom)):a.zoomReverse?a.minZoom=Math.min(a.maxZoom,a.minZoom):a.maxZoom=Math.max(a.minZoom,a.maxZoom),typeof a.subdomains=="string"&&(a.subdomains=a.subdomains.split("")),this.on("tileunload",this._onTileRemove)},setUrl:function(i,a){return this._url===i&&a===void 0&&(a=!0),this._url=i,a||this.redraw(),this},createTile:function(i,a){var u=document.createElement("img");return ie(u,"load",l(this._tileOnLoad,this,a,u)),ie(u,"error",l(this._tileOnError,this,a,u)),(this.options.crossOrigin||this.options.crossOrigin==="")&&(u.crossOrigin=this.options.crossOrigin===!0?"":this.options.crossOrigin),typeof this.options.referrerPolicy=="string"&&(u.referrerPolicy=this.options.referrerPolicy),u.alt="",u.src=this.getTileUrl(i),u},getTileUrl:function(i){var a={r:Vt.retina?"@2x":"",s:this._getSubdomain(i),x:i.x,y:i.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var u=this._globalTileRange.max.y-i.y;this.options.tms&&(a.y=u),a["-y"]=u}return C(this._url,s(a,this.options))},_tileOnLoad:function(i,a){Vt.ielt9?setTimeout(l(i,this,null,a),0):i(null,a)},_tileOnError:function(i,a,u){var x=this.options.errorTileUrl;x&&a.getAttribute("src")!==x&&(a.src=x),i(u,a)},_onTileRemove:function(i){i.tile.onload=null},_getZoomForUrl:function(){var i=this._tileZoom,a=this.options.maxZoom,u=this.options.zoomReverse,x=this.options.zoomOffset;return u&&(i=a-i),i+x},_getSubdomain:function(i){var a=Math.abs(i.x+i.y)%this.options.subdomains.length;return this.options.subdomains[a]},_abortLoading:function(){var i,a;for(i in this._tiles)if(this._tiles[i].coords.z!==this._tileZoom&&(a=this._tiles[i].el,a.onload=m,a.onerror=m,!a.complete)){a.src=N;var u=this._tiles[i].coords;fe(a),delete this._tiles[i],this.fire("tileabort",{tile:a,coords:u})}},_removeTile:function(i){var a=this._tiles[i];if(a)return a.el.setAttribute("src",N),qr.prototype._removeTile.call(this,i)},_tileReady:function(i,a,u){if(!(!this._map||u&&u.getAttribute("src")===N))return qr.prototype._tileReady.call(this,i,a,u)}});function Hl(i,a){return new nr(i,a)}var Gl=nr.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function(i,a){this._url=i;var u=s({},this.defaultWmsParams);for(var x in a)x in this.options||(u[x]=a[x]);a=y(this,a);var E=a.detectRetina&&Vt.retina?2:1,U=this.getTileSize();u.width=U.x*E,u.height=U.y*E,this.wmsParams=u},onAdd:function(i){this._crs=this.options.crs||i.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var a=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[a]=this._crs.code,nr.prototype.onAdd.call(this,i)},getTileUrl:function(i){var a=this._tileCoordsToNwSe(i),u=this._crs,x=Q(u.project(a[0]),u.project(a[1])),E=x.min,U=x.max,j=(this._wmsVersion>=1.3&&this._crs===Nl?[E.y,E.x,U.y,U.x]:[E.x,E.y,U.x,U.y]).join(","),ht=nr.prototype.getTileUrl.call(this,i);return ht+_(this.wmsParams,ht,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+j},setParams:function(i,a){return s(this.wmsParams,i),a||this.redraw(),this}});function Fd(i,a){return new Gl(i,a)}nr.WMS=Gl,Hl.wms=Fd;var $n=Pn.extend({options:{padding:.1},initialize:function(i){y(this,i),h(this),this._layers=this._layers||{}},onAdd:function(){this._container||(this._initContainer(),Yt(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update(),this.on("update",this._updatePaths,this)},onRemove:function(){this.off("update",this._updatePaths,this),this._destroyContainer()},getEvents:function(){var i={viewreset:this._reset,zoom:this._onZoom,moveend:this._update,zoomend:this._onZoomEnd};return this._zoomAnimated&&(i.zoomanim=this._onAnimZoom),i},_onAnimZoom:function(i){this._updateTransform(i.center,i.zoom)},_onZoom:function(){this._updateTransform(this._map.getCenter(),this._map.getZoom())},_updateTransform:function(i,a){var u=this._map.getZoomScale(a,this._zoom),x=this._map.getSize().multiplyBy(.5+this.options.padding),E=this._map.project(this._center,a),U=x.multiplyBy(-u).add(E).subtract(this._map._getNewPixelOrigin(i,a));Vt.any3d?Pi(this._container,U,u):De(this._container,U)},_reset:function(){this._update(),this._updateTransform(this._center,this._zoom);for(var i in this._layers)this._layers[i]._reset()},_onZoomEnd:function(){for(var i in this._layers)this._layers[i]._project()},_updatePaths:function(){for(var i in this._layers)this._layers[i]._update()},_update:function(){var i=this.options.padding,a=this._map.getSize(),u=this._map.containerPointToLayerPoint(a.multiplyBy(-i)).round();this._bounds=new q(u,u.add(a.multiplyBy(1+i*2)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom()}}),Vl=$n.extend({options:{tolerance:0},getEvents:function(){var i=$n.prototype.getEvents.call(this);return i.viewprereset=this._onViewPreReset,i},_onViewPreReset:function(){this._postponeUpdatePaths=!0},onAdd:function(){$n.prototype.onAdd.call(this),this._draw()},_initContainer:function(){var i=this._container=document.createElement("canvas");ie(i,"mousemove",this._onMouseMove,this),ie(i,"click dblclick mousedown mouseup contextmenu",this._onClick,this),ie(i,"mouseout",this._handleMouseOut,this),i._leaflet_disable_events=!0,this._ctx=i.getContext("2d")},_destroyContainer:function(){O(this._redrawRequest),delete this._ctx,fe(this._container),xe(this._container),delete this._container},_updatePaths:function(){if(!this._postponeUpdatePaths){var i;this._redrawBounds=null;for(var a in this._layers)i=this._layers[a],i._update();this._redraw()}},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){$n.prototype._update.call(this);var i=this._bounds,a=this._container,u=i.getSize(),x=Vt.retina?2:1;De(a,i.min),a.width=x*u.x,a.height=x*u.y,a.style.width=u.x+"px",a.style.height=u.y+"px",Vt.retina&&this._ctx.scale(2,2),this._ctx.translate(-i.min.x,-i.min.y),this.fire("update")}},_reset:function(){$n.prototype._reset.call(this),this._postponeUpdatePaths&&(this._postponeUpdatePaths=!1,this._updatePaths())},_initPath:function(i){this._updateDashArray(i),this._layers[h(i)]=i;var a=i._order={layer:i,prev:this._drawLast,next:null};this._drawLast&&(this._drawLast.next=a),this._drawLast=a,this._drawFirst=this._drawFirst||this._drawLast},_addPath:function(i){this._requestRedraw(i)},_removePath:function(i){var a=i._order,u=a.next,x=a.prev;u?u.prev=x:this._drawLast=x,x?x.next=u:this._drawFirst=u,delete i._order,delete this._layers[h(i)],this._requestRedraw(i)},_updatePath:function(i){this._extendRedrawBounds(i),i._project(),i._update(),this._requestRedraw(i)},_updateStyle:function(i){this._updateDashArray(i),this._requestRedraw(i)},_updateDashArray:function(i){if(typeof i.options.dashArray=="string"){var a=i.options.dashArray.split(/[, ]+/),u=[],x,E;for(E=0;E<a.length;E++){if(x=Number(a[E]),isNaN(x))return;u.push(x)}i.options._dashArray=u}else i.options._dashArray=i.options.dashArray},_requestRedraw:function(i){this._map&&(this._extendRedrawBounds(i),this._redrawRequest=this._redrawRequest||W(this._redraw,this))},_extendRedrawBounds:function(i){if(i._pxBounds){var a=(i.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new q,this._redrawBounds.extend(i._pxBounds.min.subtract([a,a])),this._redrawBounds.extend(i._pxBounds.max.add([a,a]))}},_redraw:function(){this._redrawRequest=null,this._redrawBounds&&(this._redrawBounds.min._floor(),this._redrawBounds.max._ceil()),this._clear(),this._draw(),this._redrawBounds=null},_clear:function(){var i=this._redrawBounds;if(i){var a=i.getSize();this._ctx.clearRect(i.min.x,i.min.y,a.x,a.y)}else this._ctx.save(),this._ctx.setTransform(1,0,0,1,0,0),this._ctx.clearRect(0,0,this._container.width,this._container.height),this._ctx.restore()},_draw:function(){var i,a=this._redrawBounds;if(this._ctx.save(),a){var u=a.getSize();this._ctx.beginPath(),this._ctx.rect(a.min.x,a.min.y,u.x,u.y),this._ctx.clip()}this._drawing=!0;for(var x=this._drawFirst;x;x=x.next)i=x.layer,(!a||i._pxBounds&&i._pxBounds.intersects(a))&&i._updatePath();this._drawing=!1,this._ctx.restore()},_updatePoly:function(i,a){if(this._drawing){var u,x,E,U,j=i._parts,ht=j.length,mt=this._ctx;if(ht){for(mt.beginPath(),u=0;u<ht;u++){for(x=0,E=j[u].length;x<E;x++)U=j[u][x],mt[x?"lineTo":"moveTo"](U.x,U.y);a&&mt.closePath()}this._fillStroke(mt,i)}}},_updateCircle:function(i){if(!(!this._drawing||i._empty())){var a=i._point,u=this._ctx,x=Math.max(Math.round(i._radius),1),E=(Math.max(Math.round(i._radiusY),1)||x)/x;E!==1&&(u.save(),u.scale(1,E)),u.beginPath(),u.arc(a.x,a.y/E,x,0,Math.PI*2,!1),E!==1&&u.restore(),this._fillStroke(u,i)}},_fillStroke:function(i,a){var u=a.options;u.fill&&(i.globalAlpha=u.fillOpacity,i.fillStyle=u.fillColor||u.color,i.fill(u.fillRule||"evenodd")),u.stroke&&u.weight!==0&&(i.setLineDash&&i.setLineDash(a.options&&a.options._dashArray||[]),i.globalAlpha=u.opacity,i.lineWidth=u.weight,i.strokeStyle=u.color,i.lineCap=u.lineCap,i.lineJoin=u.lineJoin,i.stroke())},_onClick:function(i){for(var a=this._map.mouseEventToLayerPoint(i),u,x,E=this._drawFirst;E;E=E.next)u=E.layer,u.options.interactive&&u._containsPoint(a)&&(!(i.type==="click"||i.type==="preclick")||!this._map._draggableMoved(u))&&(x=u);this._fireEvent(x?[x]:!1,i)},_onMouseMove:function(i){if(!(!this._map||this._map.dragging.moving()||this._map._animatingZoom)){var a=this._map.mouseEventToLayerPoint(i);this._handleMouseHover(i,a)}},_handleMouseOut:function(i){var a=this._hoveredLayer;a&&(ye(this._container,"leaflet-interactive"),this._fireEvent([a],i,"mouseout"),this._hoveredLayer=null,this._mouseHoverThrottled=!1)},_handleMouseHover:function(i,a){if(!this._mouseHoverThrottled){for(var u,x,E=this._drawFirst;E;E=E.next)u=E.layer,u.options.interactive&&u._containsPoint(a)&&(x=u);x!==this._hoveredLayer&&(this._handleMouseOut(i),x&&(Yt(this._container,"leaflet-interactive"),this._fireEvent([x],i,"mouseover"),this._hoveredLayer=x)),this._fireEvent(this._hoveredLayer?[this._hoveredLayer]:!1,i),this._mouseHoverThrottled=!0,setTimeout(l(function(){this._mouseHoverThrottled=!1},this),32)}},_fireEvent:function(i,a,u){this._map._fireDOMEvent(a,u||a.type,i)},_bringToFront:function(i){var a=i._order;if(a){var u=a.next,x=a.prev;if(u)u.prev=x;else return;x?x.next=u:u&&(this._drawFirst=u),a.prev=this._drawLast,this._drawLast.next=a,a.next=null,this._drawLast=a,this._requestRedraw(i)}},_bringToBack:function(i){var a=i._order;if(a){var u=a.next,x=a.prev;if(x)x.next=u;else return;u?u.prev=x:x&&(this._drawLast=x),a.prev=null,a.next=this._drawFirst,this._drawFirst.prev=a,this._drawFirst=a,this._requestRedraw(i)}}});function Wl(i){return Vt.canvas?new Vl(i):null}var Yr=function(){try{return document.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(i){return document.createElement("<lvml:"+i+' class="lvml">')}}catch{}return function(i){return document.createElement("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')}}(),kd={_initContainer:function(){this._container=Zt("div","leaflet-vml-container")},_update:function(){this._map._animatingZoom||($n.prototype._update.call(this),this.fire("update"))},_initPath:function(i){var a=i._container=Yr("shape");Yt(a,"leaflet-vml-shape "+(this.options.className||"")),a.coordsize="1 1",i._path=Yr("path"),a.appendChild(i._path),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){var a=i._container;this._container.appendChild(a),i.options.interactive&&i.addInteractiveTarget(a)},_removePath:function(i){var a=i._container;fe(a),i.removeInteractiveTarget(a),delete this._layers[h(i)]},_updateStyle:function(i){var a=i._stroke,u=i._fill,x=i.options,E=i._container;E.stroked=!!x.stroke,E.filled=!!x.fill,x.stroke?(a||(a=i._stroke=Yr("stroke")),E.appendChild(a),a.weight=x.weight+"px",a.color=x.color,a.opacity=x.opacity,x.dashArray?a.dashStyle=b(x.dashArray)?x.dashArray.join(" "):x.dashArray.replace(/( *, *)/g," "):a.dashStyle="",a.endcap=x.lineCap.replace("butt","flat"),a.joinstyle=x.lineJoin):a&&(E.removeChild(a),i._stroke=null),x.fill?(u||(u=i._fill=Yr("fill")),E.appendChild(u),u.color=x.fillColor||x.color,u.opacity=x.fillOpacity):u&&(E.removeChild(u),i._fill=null)},_updateCircle:function(i){var a=i._point.round(),u=Math.round(i._radius),x=Math.round(i._radiusY||u);this._setPath(i,i._empty()?"M0 0":"AL "+a.x+","+a.y+" "+u+","+x+" 0,"+65535*360)},_setPath:function(i,a){i._path.v=a},_bringToFront:function(i){yn(i._container)},_bringToBack:function(i){zn(i._container)}},ks=Vt.vml?Yr:tt,jr=$n.extend({_initContainer:function(){this._container=ks("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=ks("g"),this._container.appendChild(this._rootGroup)},_destroyContainer:function(){fe(this._container),xe(this._container),delete this._container,delete this._rootGroup,delete this._svgSize},_update:function(){if(!(this._map._animatingZoom&&this._bounds)){$n.prototype._update.call(this);var i=this._bounds,a=i.getSize(),u=this._container;(!this._svgSize||!this._svgSize.equals(a))&&(this._svgSize=a,u.setAttribute("width",a.x),u.setAttribute("height",a.y)),De(u,i.min),u.setAttribute("viewBox",[i.min.x,i.min.y,a.x,a.y].join(" ")),this.fire("update")}},_initPath:function(i){var a=i._path=ks("path");i.options.className&&Yt(a,i.options.className),i.options.interactive&&Yt(a,"leaflet-interactive"),this._updateStyle(i),this._layers[h(i)]=i},_addPath:function(i){this._rootGroup||this._initContainer(),this._rootGroup.appendChild(i._path),i.addInteractiveTarget(i._path)},_removePath:function(i){fe(i._path),i.removeInteractiveTarget(i._path),delete this._layers[h(i)]},_updatePath:function(i){i._project(),i._update()},_updateStyle:function(i){var a=i._path,u=i.options;a&&(u.stroke?(a.setAttribute("stroke",u.color),a.setAttribute("stroke-opacity",u.opacity),a.setAttribute("stroke-width",u.weight),a.setAttribute("stroke-linecap",u.lineCap),a.setAttribute("stroke-linejoin",u.lineJoin),u.dashArray?a.setAttribute("stroke-dasharray",u.dashArray):a.removeAttribute("stroke-dasharray"),u.dashOffset?a.setAttribute("stroke-dashoffset",u.dashOffset):a.removeAttribute("stroke-dashoffset")):a.setAttribute("stroke","none"),u.fill?(a.setAttribute("fill",u.fillColor||u.color),a.setAttribute("fill-opacity",u.fillOpacity),a.setAttribute("fill-rule",u.fillRule||"evenodd")):a.setAttribute("fill","none"))},_updatePoly:function(i,a){this._setPath(i,K(i._parts,a))},_updateCircle:function(i){var a=i._point,u=Math.max(Math.round(i._radius),1),x=Math.max(Math.round(i._radiusY),1)||u,E="a"+u+","+x+" 0 1,0 ",U=i._empty()?"M0 0":"M"+(a.x-u)+","+a.y+E+u*2+",0 "+E+-u*2+",0 ";this._setPath(i,U)},_setPath:function(i,a){i._path.setAttribute("d",a)},_bringToFront:function(i){yn(i._path)},_bringToBack:function(i){zn(i._path)}});Vt.vml&&jr.include(kd);function Zl(i){return Vt.svg||Vt.vml?new jr(i):null}de.include({getRenderer:function(i){var a=i.options.renderer||this._getPaneRenderer(i.options.pane)||this.options.renderer||this._renderer;return a||(a=this._renderer=this._createRenderer()),this.hasLayer(a)||this.addLayer(a),a},_getPaneRenderer:function(i){if(i==="overlayPane"||i===void 0)return!1;var a=this._paneRenderers[i];return a===void 0&&(a=this._createRenderer({pane:i}),this._paneRenderers[i]=a),a},_createRenderer:function(i){return this.options.preferCanvas&&Wl(i)||Zl(i)}});var Xl=tr.extend({initialize:function(i,a){tr.prototype.initialize.call(this,this._boundsToLatLngs(i),a)},setBounds:function(i){return this.setLatLngs(this._boundsToLatLngs(i))},_boundsToLatLngs:function(i){return i=J(i),[i.getSouthWest(),i.getNorthWest(),i.getNorthEast(),i.getSouthEast()]}});function Bd(i,a){return new Xl(i,a)}jr.create=ks,jr.pointsToPath=K,Kn.geometryToLayer=Is,Kn.coordsToLatLng=Qo,Kn.coordsToLatLngs=Ds,Kn.latLngToCoords=ta,Kn.latLngsToCoords=Ns,Kn.getFeature=er,Kn.asFeature=Os,de.mergeOptions({boxZoom:!0});var ql=kn.extend({initialize:function(i){this._map=i,this._container=i._container,this._pane=i._panes.overlayPane,this._resetStateTimeout=0,i.on("unload",this._destroy,this)},addHooks:function(){ie(this._container,"mousedown",this._onMouseDown,this)},removeHooks:function(){xe(this._container,"mousedown",this._onMouseDown,this)},moved:function(){return this._moved},_destroy:function(){fe(this._pane),delete this._pane},_resetState:function(){this._resetStateTimeout=0,this._moved=!1},_clearDeferredResetState:function(){this._resetStateTimeout!==0&&(clearTimeout(this._resetStateTimeout),this._resetStateTimeout=0)},_onMouseDown:function(i){if(!i.shiftKey||i.which!==1&&i.button!==1)return!1;this._clearDeferredResetState(),this._resetState(),Br(),Uo(),this._startPoint=this._map.mouseEventToContainerPoint(i),ie(document,{contextmenu:Ii,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseMove:function(i){this._moved||(this._moved=!0,this._box=Zt("div","leaflet-zoom-box",this._container),Yt(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(i);var a=new q(this._point,this._startPoint),u=a.getSize();De(this._box,a.min),this._box.style.width=u.x+"px",this._box.style.height=u.y+"px"},_finish:function(){this._moved&&(fe(this._box),ye(this._container,"leaflet-crosshair")),Hr(),zo(),xe(document,{contextmenu:Ii,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this)},_onMouseUp:function(i){if(!(i.which!==1&&i.button!==1)&&(this._finish(),!!this._moved)){this._clearDeferredResetState(),this._resetStateTimeout=setTimeout(l(this._resetState,this),0);var a=new Ct(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(a).fire("boxzoomend",{boxZoomBounds:a})}},_onKeyDown:function(i){i.keyCode===27&&(this._finish(),this._clearDeferredResetState(),this._resetState())}});de.addInitHook("addHandler","boxZoom",ql),de.mergeOptions({doubleClickZoom:!0});var Yl=kn.extend({addHooks:function(){this._map.on("dblclick",this._onDoubleClick,this)},removeHooks:function(){this._map.off("dblclick",this._onDoubleClick,this)},_onDoubleClick:function(i){var a=this._map,u=a.getZoom(),x=a.options.zoomDelta,E=i.originalEvent.shiftKey?u-x:u+x;a.options.doubleClickZoom==="center"?a.setZoom(E):a.setZoomAround(i.containerPoint,E)}});de.addInitHook("addHandler","doubleClickZoom",Yl),de.mergeOptions({dragging:!0,inertia:!0,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0});var jl=kn.extend({addHooks:function(){if(!this._draggable){var i=this._map;this._draggable=new ci(i._mapPane,i._container),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),i.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),i.on("zoomend",this._onZoomEnd,this),i.whenReady(this._onZoomEnd,this))}Yt(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[]},removeHooks:function(){ye(this._map._container,"leaflet-grab"),ye(this._map._container,"leaflet-touch-drag"),this._draggable.disable()},moved:function(){return this._draggable&&this._draggable._moved},moving:function(){return this._draggable&&this._draggable._moving},_onDragStart:function(){var i=this._map;if(i._stop(),this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var a=J(this._map.options.maxBounds);this._offsetLimit=Q(this._map.latLngToContainerPoint(a.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(a.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity))}else this._offsetLimit=null;i.fire("movestart").fire("dragstart"),i.options.inertia&&(this._positions=[],this._times=[])},_onDrag:function(i){if(this._map.options.inertia){var a=this._lastTime=+new Date,u=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(u),this._times.push(a),this._prunePositions(a)}this._map.fire("move",i).fire("drag",i)},_prunePositions:function(i){for(;this._positions.length>1&&i-this._times[0]>50;)this._positions.shift(),this._times.shift()},_onZoomEnd:function(){var i=this._map.getSize().divideBy(2),a=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=a.subtract(i).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x},_viscousLimit:function(i,a){return i-(i-a)*this._viscosity},_onPreDragLimit:function(){if(!(!this._viscosity||!this._offsetLimit)){var i=this._draggable._newPos.subtract(this._draggable._startPos),a=this._offsetLimit;i.x<a.min.x&&(i.x=this._viscousLimit(i.x,a.min.x)),i.y<a.min.y&&(i.y=this._viscousLimit(i.y,a.min.y)),i.x>a.max.x&&(i.x=this._viscousLimit(i.x,a.max.x)),i.y>a.max.y&&(i.y=this._viscousLimit(i.y,a.max.y)),this._draggable._newPos=this._draggable._startPos.add(i)}},_onPreDragWrap:function(){var i=this._worldWidth,a=Math.round(i/2),u=this._initialWorldOffset,x=this._draggable._newPos.x,E=(x-a+u)%i+a-u,U=(x+a+u)%i-a-u,j=Math.abs(E+u)<Math.abs(U+u)?E:U;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=j},_onDragEnd:function(i){var a=this._map,u=a.options,x=!u.inertia||i.noInertia||this._times.length<2;if(a.fire("dragend",i),x)a.fire("moveend");else{this._prunePositions(+new Date);var E=this._lastPos.subtract(this._positions[0]),U=(this._lastTime-this._times[0])/1e3,j=u.easeLinearity,ht=E.multiplyBy(j/U),mt=ht.distanceTo([0,0]),At=Math.min(u.inertiaMaxSpeed,mt),kt=ht.multiplyBy(At/mt),jt=At/(u.inertiaDeceleration*j),he=kt.multiplyBy(-jt/2).round();!he.x&&!he.y?a.fire("moveend"):(he=a._limitOffset(he,a.options.maxBounds),W(function(){a.panBy(he,{duration:jt,easeLinearity:j,noMoveStart:!0,animate:!0})}))}}});de.addInitHook("addHandler","dragging",jl),de.mergeOptions({keyboard:!0,keyboardPanDelta:80});var Kl=kn.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function(i){this._map=i,this._setPanDelta(i.options.keyboardPanDelta),this._setZoomDelta(i.options.zoomDelta)},addHooks:function(){var i=this._map._container;i.tabIndex<=0&&(i.tabIndex="0"),ie(i,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this)},removeHooks:function(){this._removeHooks(),xe(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this)},_onMouseDown:function(){if(!this._focused){var i=document.body,a=document.documentElement,u=i.scrollTop||a.scrollTop,x=i.scrollLeft||a.scrollLeft;this._map._container.focus(),window.scrollTo(x,u)}},_onFocus:function(){this._focused=!0,this._map.fire("focus")},_onBlur:function(){this._focused=!1,this._map.fire("blur")},_setPanDelta:function(i){var a=this._panKeys={},u=this.keyCodes,x,E;for(x=0,E=u.left.length;x<E;x++)a[u.left[x]]=[-1*i,0];for(x=0,E=u.right.length;x<E;x++)a[u.right[x]]=[i,0];for(x=0,E=u.down.length;x<E;x++)a[u.down[x]]=[0,i];for(x=0,E=u.up.length;x<E;x++)a[u.up[x]]=[0,-1*i]},_setZoomDelta:function(i){var a=this._zoomKeys={},u=this.keyCodes,x,E;for(x=0,E=u.zoomIn.length;x<E;x++)a[u.zoomIn[x]]=i;for(x=0,E=u.zoomOut.length;x<E;x++)a[u.zoomOut[x]]=-i},_addHooks:function(){ie(document,"keydown",this._onKeyDown,this)},_removeHooks:function(){xe(document,"keydown",this._onKeyDown,this)},_onKeyDown:function(i){if(!(i.altKey||i.ctrlKey||i.metaKey)){var a=i.keyCode,u=this._map,x;if(a in this._panKeys){if(!u._panAnim||!u._panAnim._inProgress)if(x=this._panKeys[a],i.shiftKey&&(x=rt(x).multiplyBy(3)),u.options.maxBounds&&(x=u._limitOffset(rt(x),u.options.maxBounds)),u.options.worldCopyJump){var E=u.wrapLatLng(u.unproject(u.project(u.getCenter()).add(x)));u.panTo(E)}else u.panBy(x)}else if(a in this._zoomKeys)u.setZoom(u.getZoom()+(i.shiftKey?3:1)*this._zoomKeys[a]);else if(a===27&&u._popup&&u._popup.options.closeOnEscapeKey)u.closePopup();else return;Ii(i)}}});de.addInitHook("addHandler","keyboard",Kl),de.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60});var $l=kn.extend({addHooks:function(){ie(this._map._container,"wheel",this._onWheelScroll,this),this._delta=0},removeHooks:function(){xe(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(i){var a=Ml(i),u=this._map.options.wheelDebounceTime;this._delta+=a,this._lastMousePos=this._map.mouseEventToContainerPoint(i),this._startTime||(this._startTime=+new Date);var x=Math.max(u-(+new Date-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(l(this._performZoom,this),x),Ii(i)},_performZoom:function(){var i=this._map,a=i.getZoom(),u=this._map.options.zoomSnap||0;i._stop();var x=this._delta/(this._map.options.wheelPxPerZoomLevel*4),E=4*Math.log(2/(1+Math.exp(-Math.abs(x))))/Math.LN2,U=u?Math.ceil(E/u)*u:E,j=i._limitZoom(a+(this._delta>0?U:-U))-a;this._delta=0,this._startTime=null,j&&(i.options.scrollWheelZoom==="center"?i.setZoom(a+j):i.setZoomAround(this._lastMousePos,a+j))}});de.addInitHook("addHandler","scrollWheelZoom",$l);var Hd=600;de.mergeOptions({tapHold:Vt.touchNative&&Vt.safari&&Vt.mobile,tapTolerance:15});var Jl=kn.extend({addHooks:function(){ie(this._map._container,"touchstart",this._onDown,this)},removeHooks:function(){xe(this._map._container,"touchstart",this._onDown,this)},_onDown:function(i){if(clearTimeout(this._holdTimeout),i.touches.length===1){var a=i.touches[0];this._startPos=this._newPos=new Y(a.clientX,a.clientY),this._holdTimeout=setTimeout(l(function(){this._cancel(),this._isTapValid()&&(ie(document,"touchend",We),ie(document,"touchend touchcancel",this._cancelClickPrevent),this._simulateEvent("contextmenu",a))},this),Hd),ie(document,"touchend touchcancel contextmenu",this._cancel,this),ie(document,"touchmove",this._onMove,this)}},_cancelClickPrevent:function i(){xe(document,"touchend",We),xe(document,"touchend touchcancel",i)},_cancel:function(){clearTimeout(this._holdTimeout),xe(document,"touchend touchcancel contextmenu",this._cancel,this),xe(document,"touchmove",this._onMove,this)},_onMove:function(i){var a=i.touches[0];this._newPos=new Y(a.clientX,a.clientY)},_isTapValid:function(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance},_simulateEvent:function(i,a){var u=new MouseEvent(i,{bubbles:!0,cancelable:!0,view:window,screenX:a.screenX,screenY:a.screenY,clientX:a.clientX,clientY:a.clientY});u._simulated=!0,a.target.dispatchEvent(u)}});de.addInitHook("addHandler","tapHold",Jl),de.mergeOptions({touchZoom:Vt.touch,bounceAtZoomLimits:!0});var Ql=kn.extend({addHooks:function(){Yt(this._map._container,"leaflet-touch-zoom"),ie(this._map._container,"touchstart",this._onTouchStart,this)},removeHooks:function(){ye(this._map._container,"leaflet-touch-zoom"),xe(this._map._container,"touchstart",this._onTouchStart,this)},_onTouchStart:function(i){var a=this._map;if(!(!i.touches||i.touches.length!==2||a._animatingZoom||this._zooming)){var u=a.mouseEventToContainerPoint(i.touches[0]),x=a.mouseEventToContainerPoint(i.touches[1]);this._centerPoint=a.getSize()._divideBy(2),this._startLatLng=a.containerPointToLatLng(this._centerPoint),a.options.touchZoom!=="center"&&(this._pinchStartLatLng=a.containerPointToLatLng(u.add(x)._divideBy(2))),this._startDist=u.distanceTo(x),this._startZoom=a.getZoom(),this._moved=!1,this._zooming=!0,a._stop(),ie(document,"touchmove",this._onTouchMove,this),ie(document,"touchend touchcancel",this._onTouchEnd,this),We(i)}},_onTouchMove:function(i){if(!(!i.touches||i.touches.length!==2||!this._zooming)){var a=this._map,u=a.mouseEventToContainerPoint(i.touches[0]),x=a.mouseEventToContainerPoint(i.touches[1]),E=u.distanceTo(x)/this._startDist;if(this._zoom=a.getScaleZoom(E,this._startZoom),!a.options.bounceAtZoomLimits&&(this._zoom<a.getMinZoom()&&E<1||this._zoom>a.getMaxZoom()&&E>1)&&(this._zoom=a._limitZoom(this._zoom)),a.options.touchZoom==="center"){if(this._center=this._startLatLng,E===1)return}else{var U=u._add(x)._divideBy(2)._subtract(this._centerPoint);if(E===1&&U.x===0&&U.y===0)return;this._center=a.unproject(a.project(this._pinchStartLatLng,this._zoom).subtract(U),this._zoom)}this._moved||(a._moveStart(!0,!1),this._moved=!0),O(this._animRequest);var j=l(a._move,a,this._center,this._zoom,{pinch:!0,round:!1},void 0);this._animRequest=W(j,this,!0),We(i)}},_onTouchEnd:function(){if(!this._moved||!this._zooming){this._zooming=!1;return}this._zooming=!1,O(this._animRequest),xe(document,"touchmove",this._onTouchMove,this),xe(document,"touchend touchcancel",this._onTouchEnd,this),this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom))}});de.addInitHook("addHandler","touchZoom",Ql),de.BoxZoom=ql,de.DoubleClickZoom=Yl,de.Drag=jl,de.Keyboard=Kl,de.ScrollWheelZoom=$l,de.TapHold=Jl,de.TouchZoom=Ql,e.Bounds=q,e.Browser=Vt,e.CRS=bt,e.Canvas=Vl,e.Circle=Jo,e.CircleMarker=Rs,e.Class=A,e.Control=Cn,e.DivIcon=Bl,e.DivOverlay=Bn,e.DomEvent=sd,e.DomUtil=id,e.Draggable=ci,e.Evented=ot,e.FeatureGroup=Yn,e.GeoJSON=Kn,e.GridLayer=qr,e.Handler=kn,e.Icon=Qi,e.ImageOverlay=Us,e.LatLng=et,e.LatLngBounds=Ct,e.Layer=Pn,e.LayerGroup=Ji,e.LineUtil=vd,e.Map=de,e.Marker=Ls,e.Mixin=dd,e.Path=hi,e.Point=Y,e.PolyUtil=fd,e.Polygon=tr,e.Polyline=jn,e.Popup=zs,e.PosAnimation=Sl,e.Projection=xd,e.Rectangle=Xl,e.Renderer=$n,e.SVG=jr,e.SVGOverlay=kl,e.TileLayer=nr,e.Tooltip=Fs,e.Transformation=it,e.Util=B,e.VideoOverlay=Fl,e.bind=l,e.bounds=Q,e.canvas=Wl,e.circle=Ad,e.circleMarker=Td,e.control=Wr,e.divIcon=Ud,e.extend=s,e.featureGroup=bd,e.geoJSON=zl,e.geoJson=Ld,e.gridLayer=zd,e.icon=wd,e.imageOverlay=Rd,e.latLng=Mt,e.latLngBounds=J,e.layerGroup=Sd,e.map=od,e.marker=Ed,e.point=rt,e.polygon=Pd,e.polyline=Cd,e.popup=Nd,e.rectangle=Bd,e.setOptions=y,e.stamp=h,e.svg=Zl,e.svgOverlay=Dd,e.tileLayer=Hl,e.tooltip=Od,e.transformation=vt,e.version=n,e.videoOverlay=Id;var Gd=window.L;e.noConflict=function(){return window.L=Gd,this},window.L=e})})(Za,Za.exports);var Jd=Za.exports;const je=Xh(Jd),Lt={bounds:null,zoneType:"rect",zonePts:null,wMm:150,dMm:150,realW:0,realH:0,gpxPoints:[],generated:!1,generating:!1,elevGrid:null,GRID:128,BASE_H:3,minE:0,elevRange:1,elevScaleMm:20,mmPerMeter:1,renderer:null,scene:null,camera:null,controls:null,tg:null};function qh(){const r=e=>document.getElementById(e)?.value??"",t=e=>document.getElementById(e)?.checked??!0;return{cBase:r("c-base")||"#eeebe6",terrainRes:Number(r("t-res"))||128,exag:Number(r("t-exag"))||2,smooth:Number(r("t-smooth"))||1,baseH:Number(r("t-base-h"))||3,maxDim:Number(r("t-maxdim"))||150,elevZoom:Number(r("t-zoom"))||15,waterOn:t("water-on"),waterCol:r("water-col")||"#3399ff",grassOn:t("grass-on"),roadsOn:t("road-on"),roadCol:r("road-col")||"#262626",buildOn:t("build-on"),buildCol:r("build-col")||"#9090a0",buildHS:Number(r("build-hs"))||1,gpxCol:r("gpx-col")||"#ff4500",gpxH:Number(r("gpx-h"))||1.2,gpxMW:Number(r("gpx-mw"))||1.5,gpxTW:Number(r("gpx-tw"))||3}}let Yh=null,le,Zi=null,vn=null,si=null,Pe=null,Ce=null,wn=[],Ze=[],He=null,rn=null,Kr=null;const Qd={rect:"Cliquez 1er coin puis coin opposé",sq:"Cliquez 1er coin (carré automatique)",circ:"Cliquez centre puis glissez pour le rayon",hex:"Cliquez centre puis glissez pour le rayon",poly:"Cliquez pour ajouter des points — rejoignez le 1er point pour fermer",trace:"Cliquez pour ajouter des points — double-clic pour terminer"};function tf(r){r&&(Yh=r);const t=je.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:19,attribution:"© OSM"}),e=je.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{maxZoom:19,attribution:"© Esri"}),n=je.tileLayer("https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{maxZoom:19,attribution:"© IGN"});le=je.map("map",{center:[48.8584,2.2945],zoom:15,zoomControl:!1,layers:[t]}),je.control.zoom({position:"topright"}).addTo(le),je.control.layers({OSM:t,Satellite:e,IGN:n},{},{position:"topright"}).addTo(le),new ResizeObserver(()=>le.invalidateSize()).observe(document.getElementById("map")),setTimeout(()=>le.invalidateSize(),300),sf(),of(),af(),rf()}function rc(r,t){return[[r.lat,r.lng],[r.lat,t.lng],[t.lat,t.lng],[t.lat,r.lng]]}function sc(r,t){const e=(r.lat+t.lat)/2,n=Math.abs(t.lat-r.lat)*111320,s=Math.abs(t.lng-r.lng)*111320*Math.cos(e*Math.PI/180),o=Math.min(n,s),l=o/111320,c=o/(111320*Math.cos(e*Math.PI/180)),h=Math.min(r.lat,t.lat),d=Math.min(r.lng,t.lng);return[[h,d],[h,d+c],[h+l,d+c],[h+l,d]]}function oc(r,t,e=80){const n=r.distanceTo(t);return Array.from({length:e},(s,o)=>{const l=o/e*Math.PI*2;return[r.lat+n*Math.cos(l)/111320,r.lng+n*Math.sin(l)/(111320*Math.cos(r.lat*Math.PI/180))]})}function ac(r,t){const e=r.distanceTo(t);return Array.from({length:6},(n,s)=>{const o=s/6*Math.PI*2-Math.PI/6;return[r.lat+e*Math.cos(o)/111320,r.lng+e*Math.sin(o)/(111320*Math.cos(r.lat*Math.PI/180))]})}function jh(r){Pe&&Pe!==r&&(Ce=null,wn=[],Ze=[],He&&(le.removeLayer(He),He=null),rn&&(le.removeLayer(rn),rn=null)),Pe=r,["rect","sq","circ","hex","poly","trace"].forEach(n=>{document.getElementById("db-"+n)?.classList.toggle("active",n===r)}),le.getContainer().classList.toggle("dm",!!r);const t=document.getElementById("dch");t.style.display=r?"block":"none",r&&(t.textContent=Qd[r]??"");const e=document.getElementById("gpx-ctr");if(e.style.display=r==="trace"?"block":"none",r!=="trace"&&(e.textContent="0 points tracés"),!r){const n=document.getElementById("snap");n&&(n.style.display="none")}}function xo(r=!0){He&&(le.removeLayer(He),He=null),rn&&(le.removeLayer(rn),rn=null),Ce=null,wn=[],Ze=[],r&&jh(null)}function yo(r,t){return t?le.latLngToContainerPoint(r).distanceTo(le.latLngToContainerPoint(t)):9999}function lc(r){const t=[];wn.length>2&&t.push(wn[0]),Ze.length>2&&t.push(Ze[0]),si&&t.push(si.getLatLng());let e=null,n=9999;for(const s of t){const o=yo(r,s);o<18&&o<n&&(n=o,e=s)}return e}function ef(r,t){const e=document.getElementById("snap");if(!e)return;if(!t||yo(r,t)>18){e.style.display="none";return}const n=le.latLngToContainerPoint(t);e.style.display="block",e.style.left=n.x+"px",e.style.top=n.y+"px"}function $r(r,t){Zi&&(le.removeLayer(Zi),Zi=null),Zi=je.polygon(r,{color:"#f43f5e",weight:2.5,fillColor:"#f43f5e",fillOpacity:.08,dashArray:"6,4"}).addTo(le);const e=r.map(d=>d[0]),n=r.map(d=>d[1]);Lt.bounds={minLat:Math.min(...e),maxLat:Math.max(...e),minLon:Math.min(...n),maxLon:Math.max(...n)},Lt.zonePts=r,Lt.zoneType=t;const s=(Lt.bounds.minLat+Lt.bounds.maxLat)/2,o=(Lt.bounds.maxLon-Lt.bounds.minLon)*Math.cos(s*Math.PI/180)*111320,l=(Lt.bounds.maxLat-Lt.bounds.minLat)*111320,h=Number(document.getElementById("t-maxdim")?.value||150)/Math.max(l,o);Lt.realW=o,Lt.realH=l,Lt.wMm=Math.round(o*h),Lt.dMm=Math.round(l*h),Yh?.(),xo()}function nf(){vn&&(le.removeLayer(vn),vn=null),!(Ze.length<2)&&(vn=je.polyline(Ze,{color:"#ff0000",weight:4,opacity:.9}).addTo(le))}function cc(r){const t=document.getElementById("snap");if(t&&(t.style.display="none"),rn&&(le.removeLayer(rn),rn=null),r.length<2){xo();return}Lt.gpxPoints=r.map(n=>({lat:n.lat,lon:n.lng})),Kh(),$h(`✏️ ${r.length} pts · tracé manuel`);const e=document.getElementById("db-cgpx");e&&(e.style.display="flex"),xo()}function Kh(){vn&&(le.removeLayer(vn),vn=null),!(Lt.gpxPoints.length<2)&&(vn=je.polyline(Lt.gpxPoints.map(r=>[r.lat,r.lon]),{color:"#ff4500",weight:4,opacity:.95}).addTo(le))}function $h(r){const t=document.getElementById("gpx-badge");t&&(t.innerHTML=r,t.style.display="block")}function rf(){le.on("mousemove",r=>{if(!Pe)return;const t=r.latlng,e=lc(t);ef(t,e??Ce);const n=e??t;if((Pe==="rect"||Pe==="sq")&&Ce){const s=Pe==="sq"?sc(Ce,n):rc(Ce,n);He?He.setLatLngs(s):He=je.polygon(s,{color:"#f43f5e",weight:2,fillOpacity:.1}).addTo(le)}else if((Pe==="circ"||Pe==="hex")&&Ce){const s=Pe==="circ"?oc(Ce,n):ac(Ce,n);He?He.setLatLngs(s):He=je.polygon(s,{color:"#00d8ff",weight:2,fillOpacity:.1}).addTo(le)}else if(Pe==="poly"&&wn.length>0){const s=[...wn,n];He?He.setLatLngs(s):He=je.polyline(s,{color:"#f43f5e",weight:2,dashArray:"5,4"}).addTo(le)}else if(Pe==="trace"&&Ze.length>0){const s=[...Ze,n];He?He.setLatLngs(s):He=je.polyline(s,{color:"#ff0000",weight:3,dashArray:"4,3"}).addTo(le)}}),le.on("click",r=>{if(!Pe)return;const t=r.latlng,e=lc(t),n=e??t;if(Pe==="rect"){if(!Ce){Ce=n;return}$r(rc(Ce,n),"rect")}else if(Pe==="sq"){if(!Ce){Ce=n;return}$r(sc(Ce,n),"rect")}else if(Pe==="circ"){if(!Ce){Ce=n;return}$r(oc(Ce,n),"circ")}else if(Pe==="hex"){if(!Ce){Ce=n;return}$r(ac(Ce,n),"hex")}else if(Pe==="poly"){if(wn.length>2&&yo(t,wn[0])<18){$r(wn.map(s=>[s.lat,s.lng]),"poly");return}wn.push(n),wn.length===1&&(rn&&le.removeLayer(rn),rn=je.circleMarker(wn[0],{radius:7,fillColor:"#f43f5e",fillOpacity:.95,color:"#fff",weight:2}).addTo(le))}else Pe==="trace"&&(Kr&&clearTimeout(Kr),Kr=setTimeout(()=>{if(Ze.length>2&&yo(t,Ze[0])<18){cc(Ze);return}Ze.push(e??t);const s=Ze.length,o=document.getElementById("gpx-ctr");o&&(o.textContent=`${s} point${s>1?"s":""} tracé${s>1?"s":""}`),s===1&&(rn&&le.removeLayer(rn),rn=je.circleMarker(Ze[0],{radius:7,fillColor:"#ff0000",fillOpacity:.95,color:"#fff",weight:2}).addTo(le)),nf()},220))}),le.on("dblclick",r=>{Pe==="trace"&&Ze.length>=2&&(Kr&&clearTimeout(Kr),cc(Ze),r.originalEvent.preventDefault())})}function sf(){["rect","sq","circ","hex","poly","trace"].forEach(r=>{document.getElementById("db-"+r)?.addEventListener("click",()=>{jh(Pe===r?null:r)})}),document.getElementById("db-clear")?.addEventListener("click",()=>{xo(),Zi&&(le.removeLayer(Zi),Zi=null),vn&&(le.removeLayer(vn),vn=null),si&&(le.removeLayer(si),si=null),Lt.bounds=null,Lt.zonePts=null,Lt.gpxPoints=[],Ze=[];const r=document.getElementById("gpx-badge");r&&(r.style.display="none");const t=document.getElementById("db-cgpx");t&&(t.style.display="none");const e=document.getElementById("snap");e&&(e.style.display="none");const n=document.getElementById("gpx-file");n&&(n.value="")}),document.getElementById("btn-czone")?.addEventListener("click",()=>{if(!Lt.bounds)return;const r=Lt.bounds;le.fitBounds([[r.minLat,r.minLon],[r.maxLat,r.maxLon]],{padding:[80,200],maxZoom:14})}),document.getElementById("db-cgpx")?.addEventListener("click",()=>{if(!Lt.gpxPoints.length)return;const r=Lt.gpxPoints.map(e=>e.lat),t=Lt.gpxPoints.map(e=>e.lon);le.fitBounds([[Math.min(...r),Math.min(...t)],[Math.max(...r),Math.max(...t)]],{paddingTopLeft:[110,80],paddingBottomRight:[80,80],maxZoom:14})})}function of(){document.getElementById("gpx-file")?.addEventListener("change",function(){const r=this.files?.[0];if(!r)return;const t=new FileReader;t.onload=e=>{try{const n=new DOMParser().parseFromString(e.target.result,"text/xml"),s=[...Array.from(n.getElementsByTagName("trkpt")),...Array.from(n.getElementsByTagName("wpt")),...Array.from(n.getElementsByTagName("rtept"))];if(!s.length)return;const o=s.map(h=>({lat:parseFloat(h.getAttribute("lat")),lon:parseFloat(h.getAttribute("lon"))})).filter(h=>!isNaN(h.lat)&&!isNaN(h.lon));if(!o.length)return;Lt.gpxPoints=o,Kh(),vn&&le.fitBounds(vn.getBounds(),{padding:[80,100],maxZoom:14});let l=0;for(let h=1;h<o.length;h++){const f=(o[h].lat-o[h-1].lat)*Math.PI/180,m=(o[h].lon-o[h-1].lon)*Math.PI/180,v=Math.sin(f/2)**2+Math.cos(o[h-1].lat*Math.PI/180)*Math.cos(o[h].lat*Math.PI/180)*Math.sin(m/2)**2;l+=6371*2*Math.atan2(Math.sqrt(v),Math.sqrt(1-v))}$h(`📍 ${o.length.toLocaleString()} pts · ${l.toFixed(1)} km`);const c=document.getElementById("db-cgpx");c&&(c.style.display="flex")}catch{}},t.readAsText(r)})}let hc;function af(){const r=document.getElementById("srch-input"),t=document.getElementById("srch-drop");r?.addEventListener("input",function(){clearTimeout(hc);const e=this.value.trim();t.style.display="none",!(e.length<2)&&(hc=setTimeout(()=>lf(e),120))}),r?.addEventListener("blur",()=>setTimeout(()=>{t.style.display="none"},200))}async function lf(r){const t=document.getElementById("srch-drop");try{const n=await(await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(r)}&format=json&limit=6&addressdetails=1`)).json();if(!n.length){t.style.display="none";return}t.innerHTML=n.map((s,o)=>`
      <div class="srch-item" data-i="${o}" data-lat="${s.lat}" data-lon="${s.lon}" data-bb="${s.boundingbox.join(",")}">
        <div class="srch-name">${s.display_name.split(",")[0]}</div>
        <div class="srch-addr">${s.display_name.split(",").slice(1,3).join(",")}</div>
      </div>`).join(""),t.style.display="block",t.querySelectorAll(".srch-item").forEach(s=>{s.addEventListener("mousedown",function(o){o.preventDefault();const l=parseFloat(this.dataset.lat),c=parseFloat(this.dataset.lon),h=this.dataset.bb.split(",").map(Number);si&&(le.removeLayer(si),si=null),si=je.circleMarker([l,c],{radius:8,fillColor:"#f43f5e",fillOpacity:.9,color:"#fff",weight:2}).addTo(le),le.fitBounds([[h[0],h[2]],[h[1],h[3]]],{padding:[60,60],maxZoom:16}),t.style.display="none",document.getElementById("srch-input").value=s.querySelector(".srch-name").textContent})})}catch{t.style.display="none"}}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sl="163",rr={ROTATE:0,DOLLY:1,PAN:2},sr={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cf=0,uc=1,hf=2,Jh=1,uf=2,ri=3,wi=0,un=1,_n=2,Mi=0,Ar=1,dc=2,fc=3,pc=4,df=5,Hi=100,ff=101,pf=102,mf=103,_f=104,gf=200,vf=201,xf=202,yf=203,Xa=204,qa=205,Mf=206,Sf=207,bf=208,wf=209,Ef=210,Tf=211,Af=212,Cf=213,Pf=214,Lf=0,Rf=1,If=2,Mo=3,Df=4,Nf=5,Of=6,Uf=7,Qh=0,zf=1,Ff=2,Si=0,tu=1,kf=2,Bf=3,Hf=4,Gf=5,Vf=6,Wf=7,eu=300,Rr=301,Ir=302,Ya=303,ja=304,Lo=306,Ka=1e3,Xi=1001,$a=1002,An=1003,Zf=1004,Hs=1005,On=1006,ra=1007,qi=1008,bi=1009,Xf=1010,qf=1011,nu=1012,iu=1013,Dr=1014,yi=1015,So=1016,ru=1017,su=1018,xs=1020,Yf=35902,jf=1021,Kf=1022,Wn=1023,$f=1024,Jf=1025,Cr=1026,fs=1027,Qf=1028,ou=1029,tp=1030,au=1031,lu=1033,sa=33776,oa=33777,aa=33778,la=33779,mc=35840,_c=35841,gc=35842,vc=35843,cu=36196,xc=37492,yc=37496,Mc=37808,Sc=37809,bc=37810,wc=37811,Ec=37812,Tc=37813,Ac=37814,Cc=37815,Pc=37816,Lc=37817,Rc=37818,Ic=37819,Dc=37820,Nc=37821,ca=36492,Oc=36494,Uc=36495,ep=36283,zc=36284,Fc=36285,kc=36286,np=3200,ip=3201,hu=0,rp=1,xi="",Hn="srgb",Ti="srgb-linear",ol="display-p3",Ro="display-p3-linear",bo="linear",Me="srgb",wo="rec709",Eo="p3",or=7680,Bc=519,sp=512,op=513,ap=514,uu=515,lp=516,cp=517,hp=518,up=519,Hc=35044,Gc="300 es",oi=2e3,To=2001;class $i{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,l=s.length;o<l;o++)s[o].call(this,t);t.target=null}}}const qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],go=Math.PI/180,Ja=180/Math.PI;function Or(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(qe[r&255]+qe[r>>8&255]+qe[r>>16&255]+qe[r>>24&255]+"-"+qe[t&255]+qe[t>>8&255]+"-"+qe[t>>16&15|64]+qe[t>>24&255]+"-"+qe[e&63|128]+qe[e>>8&255]+"-"+qe[e>>16&255]+qe[e>>24&255]+qe[n&255]+qe[n>>8&255]+qe[n>>16&255]+qe[n>>24&255]).toLowerCase()}function Ge(r,t,e){return Math.max(t,Math.min(e,r))}function dp(r,t){return(r%t+t)%t}function ha(r,t,e){return(1-e)*r+e*t}function Jr(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function hn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const fp={DEG2RAD:go};class yt{constructor(t=0,e=0){yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,l=this.y-t.y;return this.x=o*n-l*s+t.x,this.y=o*s+l*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ae{constructor(t,e,n,s,o,l,c,h,d){ae.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,h,d)}set(t,e,n,s,o,l,c,h,d){const f=this.elements;return f[0]=t,f[1]=s,f[2]=c,f[3]=e,f[4]=o,f[5]=h,f[6]=n,f[7]=l,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[3],h=n[6],d=n[1],f=n[4],m=n[7],v=n[2],p=n[5],M=n[8],y=s[0],_=s[3],g=s[6],C=s[1],b=s[4],I=s[7],N=s[2],F=s[5],z=s[8];return o[0]=l*y+c*C+h*N,o[3]=l*_+c*b+h*F,o[6]=l*g+c*I+h*z,o[1]=d*y+f*C+m*N,o[4]=d*_+f*b+m*F,o[7]=d*g+f*I+m*z,o[2]=v*y+p*C+M*N,o[5]=v*_+p*b+M*F,o[8]=v*g+p*I+M*z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8];return e*l*f-e*c*d-n*o*f+n*c*h+s*o*d-s*l*h}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],m=f*l-c*d,v=c*h-f*o,p=d*o-l*h,M=e*m+n*v+s*p;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/M;return t[0]=m*y,t[1]=(s*d-f*n)*y,t[2]=(c*n-s*l)*y,t[3]=v*y,t[4]=(f*e-s*h)*y,t[5]=(s*o-c*e)*y,t[6]=p*y,t[7]=(n*h-d*e)*y,t[8]=(l*e-n*o)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,l,c){const h=Math.cos(o),d=Math.sin(o);return this.set(n*h,n*d,-n*(h*l+d*c)+l+t,-s*d,s*h,-s*(-d*l+h*c)+c+e,0,0,1),this}scale(t,e){return this.premultiply(ua.makeScale(t,e)),this}rotate(t){return this.premultiply(ua.makeRotation(-t)),this}translate(t,e){return this.premultiply(ua.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ua=new ae;function du(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function Ao(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function pp(){const r=Ao("canvas");return r.style.display="block",r}const Vc={};function mp(r){r in Vc||(Vc[r]=!0,console.warn(r))}const Wc=new ae().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Zc=new ae().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Gs={[Ti]:{transfer:bo,primaries:wo,toReference:r=>r,fromReference:r=>r},[Hn]:{transfer:Me,primaries:wo,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ro]:{transfer:bo,primaries:Eo,toReference:r=>r.applyMatrix3(Zc),fromReference:r=>r.applyMatrix3(Wc)},[ol]:{transfer:Me,primaries:Eo,toReference:r=>r.convertSRGBToLinear().applyMatrix3(Zc),fromReference:r=>r.applyMatrix3(Wc).convertLinearToSRGB()}},_p=new Set([Ti,Ro]),_e={enabled:!0,_workingColorSpace:Ti,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!_p.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,t,e){if(this.enabled===!1||t===e||!t||!e)return r;const n=Gs[t].toReference,s=Gs[e].fromReference;return s(n(r))},fromWorkingColorSpace:function(r,t){return this.convert(r,this._workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this._workingColorSpace)},getPrimaries:function(r){return Gs[r].primaries},getTransfer:function(r){return r===xi?bo:Gs[r].transfer}};function Pr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function da(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ar;class gp{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ar===void 0&&(ar=Ao("canvas")),ar.width=t.width,ar.height=t.height;const n=ar.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ar}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ao("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let l=0;l<o.length;l++)o[l]=Pr(o[l]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Pr(e[n]/255)*255):e[n]=Pr(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let vp=0;class fu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vp++}),this.uuid=Or(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let l=0,c=s.length;l<c;l++)s[l].isDataTexture?o.push(fa(s[l].image)):o.push(fa(s[l]))}else o=fa(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function fa(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?gp.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xp=0;class dn extends $i{constructor(t=dn.DEFAULT_IMAGE,e=dn.DEFAULT_MAPPING,n=Xi,s=Xi,o=On,l=qi,c=Wn,h=bi,d=dn.DEFAULT_ANISOTROPY,f=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xp++}),this.uuid=Or(),this.name="",this.source=new fu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=l,this.anisotropy=d,this.format=c,this.internalFormat=null,this.type=h,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ae,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==eu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ka:t.x=t.x-Math.floor(t.x);break;case Xi:t.x=t.x<0?0:1;break;case $a:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ka:t.y=t.y-Math.floor(t.y);break;case Xi:t.y=t.y<0?0:1;break;case $a:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=eu;dn.DEFAULT_ANISOTROPY=1;class Ve{constructor(t=0,e=0,n=0,s=1){Ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,l=t.elements;return this.x=l[0]*e+l[4]*n+l[8]*s+l[12]*o,this.y=l[1]*e+l[5]*n+l[9]*s+l[13]*o,this.z=l[2]*e+l[6]*n+l[10]*s+l[14]*o,this.w=l[3]*e+l[7]*n+l[11]*s+l[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const h=t.elements,d=h[0],f=h[4],m=h[8],v=h[1],p=h[5],M=h[9],y=h[2],_=h[6],g=h[10];if(Math.abs(f-v)<.01&&Math.abs(m-y)<.01&&Math.abs(M-_)<.01){if(Math.abs(f+v)<.1&&Math.abs(m+y)<.1&&Math.abs(M+_)<.1&&Math.abs(d+p+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(d+1)/2,I=(p+1)/2,N=(g+1)/2,F=(f+v)/4,z=(m+y)/4,G=(M+_)/4;return b>I&&b>N?b<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(b),s=F/n,o=z/n):I>N?I<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(I),n=F/s,o=G/s):N<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(N),n=z/o,s=G/o),this.set(n,s,o,e),this}let C=Math.sqrt((_-M)*(_-M)+(m-y)*(m-y)+(v-f)*(v-f));return Math.abs(C)<.001&&(C=1),this.x=(_-M)/C,this.y=(m-y)/C,this.z=(v-f)/C,this.w=Math.acos((d+p+g-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yp extends $i{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ve(0,0,t,e),this.scissorTest=!1,this.viewport=new Ve(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0,count:1},n);const o=new dn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const l=n.count;for(let c=0;c<l;c++)this.textures[c]=o.clone(),this.textures[c].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new fu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends yp{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class pu extends dn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Mp extends dn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=An,this.minFilter=An,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ji{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,l,c){let h=n[s+0],d=n[s+1],f=n[s+2],m=n[s+3];const v=o[l+0],p=o[l+1],M=o[l+2],y=o[l+3];if(c===0){t[e+0]=h,t[e+1]=d,t[e+2]=f,t[e+3]=m;return}if(c===1){t[e+0]=v,t[e+1]=p,t[e+2]=M,t[e+3]=y;return}if(m!==y||h!==v||d!==p||f!==M){let _=1-c;const g=h*v+d*p+f*M+m*y,C=g>=0?1:-1,b=1-g*g;if(b>Number.EPSILON){const N=Math.sqrt(b),F=Math.atan2(N,g*C);_=Math.sin(_*F)/N,c=Math.sin(c*F)/N}const I=c*C;if(h=h*_+v*I,d=d*_+p*I,f=f*_+M*I,m=m*_+y*I,_===1-c){const N=1/Math.sqrt(h*h+d*d+f*f+m*m);h*=N,d*=N,f*=N,m*=N}}t[e]=h,t[e+1]=d,t[e+2]=f,t[e+3]=m}static multiplyQuaternionsFlat(t,e,n,s,o,l){const c=n[s],h=n[s+1],d=n[s+2],f=n[s+3],m=o[l],v=o[l+1],p=o[l+2],M=o[l+3];return t[e]=c*M+f*m+h*p-d*v,t[e+1]=h*M+f*v+d*m-c*p,t[e+2]=d*M+f*p+c*v-h*m,t[e+3]=f*M-c*m-h*v-d*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,l=t._order,c=Math.cos,h=Math.sin,d=c(n/2),f=c(s/2),m=c(o/2),v=h(n/2),p=h(s/2),M=h(o/2);switch(l){case"XYZ":this._x=v*f*m+d*p*M,this._y=d*p*m-v*f*M,this._z=d*f*M+v*p*m,this._w=d*f*m-v*p*M;break;case"YXZ":this._x=v*f*m+d*p*M,this._y=d*p*m-v*f*M,this._z=d*f*M-v*p*m,this._w=d*f*m+v*p*M;break;case"ZXY":this._x=v*f*m-d*p*M,this._y=d*p*m+v*f*M,this._z=d*f*M+v*p*m,this._w=d*f*m-v*p*M;break;case"ZYX":this._x=v*f*m-d*p*M,this._y=d*p*m+v*f*M,this._z=d*f*M-v*p*m,this._w=d*f*m+v*p*M;break;case"YZX":this._x=v*f*m+d*p*M,this._y=d*p*m+v*f*M,this._z=d*f*M-v*p*m,this._w=d*f*m-v*p*M;break;case"XZY":this._x=v*f*m-d*p*M,this._y=d*p*m-v*f*M,this._z=d*f*M+v*p*m,this._w=d*f*m+v*p*M;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+l)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],l=e[1],c=e[5],h=e[9],d=e[2],f=e[6],m=e[10],v=n+c+m;if(v>0){const p=.5/Math.sqrt(v+1);this._w=.25/p,this._x=(f-h)*p,this._y=(o-d)*p,this._z=(l-s)*p}else if(n>c&&n>m){const p=2*Math.sqrt(1+n-c-m);this._w=(f-h)/p,this._x=.25*p,this._y=(s+l)/p,this._z=(o+d)/p}else if(c>m){const p=2*Math.sqrt(1+c-n-m);this._w=(o-d)/p,this._x=(s+l)/p,this._y=.25*p,this._z=(h+f)/p}else{const p=2*Math.sqrt(1+m-n-c);this._w=(l-s)/p,this._x=(o+d)/p,this._y=(h+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ge(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,l=t._w,c=e._x,h=e._y,d=e._z,f=e._w;return this._x=n*f+l*c+s*d-o*h,this._y=s*f+l*h+o*c-n*d,this._z=o*f+l*d+n*h-s*c,this._w=l*f-n*c-s*h-o*d,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,l=this._w;let c=l*t._w+n*t._x+s*t._y+o*t._z;if(c<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,c=-c):this.copy(t),c>=1)return this._w=l,this._x=n,this._y=s,this._z=o,this;const h=1-c*c;if(h<=Number.EPSILON){const p=1-e;return this._w=p*l+e*this._w,this._x=p*n+e*this._x,this._y=p*s+e*this._y,this._z=p*o+e*this._z,this.normalize(),this}const d=Math.sqrt(h),f=Math.atan2(d,c),m=Math.sin((1-e)*f)/d,v=Math.sin(e*f)/d;return this._w=l*m+this._w*v,this._x=n*m+this._x*v,this._y=s*m+this._y*v,this._z=o*m+this._z*v,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{constructor(t=0,e=0,n=0){nt.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,l=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*l,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*l,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*l,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,l=t.y,c=t.z,h=t.w,d=2*(l*s-c*n),f=2*(c*e-o*s),m=2*(o*n-l*e);return this.x=e+h*d+l*m-c*f,this.y=n+h*f+c*d-o*m,this.z=s+h*m+o*f-l*d,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,l=e.x,c=e.y,h=e.z;return this.x=s*h-o*c,this.y=o*l-n*h,this.z=n*c-s*l,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return pa.copy(this).projectOnVector(t),this.sub(pa)}reflect(t){return this.sub(pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ge(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const pa=new nt,Xc=new ji;class ys{constructor(t=new nt(1/0,1/0,1/0),e=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let l=0,c=o.count;l<c;l++)t.isMesh===!0?t.getVertexPosition(l,Ln):Ln.fromBufferAttribute(o,l),Ln.applyMatrix4(t.matrixWorld),this.expandByPoint(Ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Vs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Vs.copy(n.boundingBox)),Vs.applyMatrix4(t.matrixWorld),this.union(Vs)}const s=t.children;for(let o=0,l=s.length;o<l;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Ln),Ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Qr),Ws.subVectors(this.max,Qr),lr.subVectors(t.a,Qr),cr.subVectors(t.b,Qr),hr.subVectors(t.c,Qr),di.subVectors(cr,lr),fi.subVectors(hr,cr),Ni.subVectors(lr,hr);let e=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ni.z,Ni.y,di.z,0,-di.x,fi.z,0,-fi.x,Ni.z,0,-Ni.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ni.y,Ni.x,0];return!ma(e,lr,cr,hr,Ws)||(e=[1,0,0,0,1,0,0,0,1],!ma(e,lr,cr,hr,Ws))?!1:(Zs.crossVectors(di,fi),e=[Zs.x,Zs.y,Zs.z],ma(e,lr,cr,hr,Ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Jn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Jn=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Ln=new nt,Vs=new ys,lr=new nt,cr=new nt,hr=new nt,di=new nt,fi=new nt,Ni=new nt,Qr=new nt,Ws=new nt,Zs=new nt,Oi=new nt;function ma(r,t,e,n,s){for(let o=0,l=r.length-3;o<=l;o+=3){Oi.fromArray(r,o);const c=s.x*Math.abs(Oi.x)+s.y*Math.abs(Oi.y)+s.z*Math.abs(Oi.z),h=t.dot(Oi),d=e.dot(Oi),f=n.dot(Oi);if(Math.max(-Math.max(h,d,f),Math.min(h,d,f))>c)return!1}return!0}const Sp=new ys,ts=new nt,_a=new nt;class al{constructor(t=new nt,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Sp.setFromPoints(t).getCenter(n);let s=0;for(let o=0,l=t.length;o<l;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ts.subVectors(t,this.center);const e=ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ts,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_a.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ts.copy(t.center).add(_a)),this.expandByPoint(ts.copy(t.center).sub(_a))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new nt,ga=new nt,Xs=new nt,pi=new nt,va=new nt,qs=new nt,xa=new nt;class mu{constructor(t=new nt,e=new nt(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ga.copy(t).add(e).multiplyScalar(.5),Xs.copy(e).sub(t).normalize(),pi.copy(this.origin).sub(ga);const o=t.distanceTo(e)*.5,l=-this.direction.dot(Xs),c=pi.dot(this.direction),h=-pi.dot(Xs),d=pi.lengthSq(),f=Math.abs(1-l*l);let m,v,p,M;if(f>0)if(m=l*h-c,v=l*c-h,M=o*f,m>=0)if(v>=-M)if(v<=M){const y=1/f;m*=y,v*=y,p=m*(m+l*v+2*c)+v*(l*m+v+2*h)+d}else v=o,m=Math.max(0,-(l*v+c)),p=-m*m+v*(v+2*h)+d;else v=-o,m=Math.max(0,-(l*v+c)),p=-m*m+v*(v+2*h)+d;else v<=-M?(m=Math.max(0,-(-l*o+c)),v=m>0?-o:Math.min(Math.max(-o,-h),o),p=-m*m+v*(v+2*h)+d):v<=M?(m=0,v=Math.min(Math.max(-o,-h),o),p=v*(v+2*h)+d):(m=Math.max(0,-(l*o+c)),v=m>0?o:Math.min(Math.max(-o,-h),o),p=-m*m+v*(v+2*h)+d);else v=l>0?-o:o,m=Math.max(0,-(l*v+c)),p=-m*m+v*(v+2*h)+d;return n&&n.copy(this.origin).addScaledVector(this.direction,m),s&&s.copy(ga).addScaledVector(Xs,v),p}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);const n=Qn.dot(this.direction),s=Qn.dot(Qn)-n*n,o=t.radius*t.radius;if(s>o)return null;const l=Math.sqrt(o-s),c=n-l,h=n+l;return h<0?null:c<0?this.at(h,e):this.at(c,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,l,c,h;const d=1/this.direction.x,f=1/this.direction.y,m=1/this.direction.z,v=this.origin;return d>=0?(n=(t.min.x-v.x)*d,s=(t.max.x-v.x)*d):(n=(t.max.x-v.x)*d,s=(t.min.x-v.x)*d),f>=0?(o=(t.min.y-v.y)*f,l=(t.max.y-v.y)*f):(o=(t.max.y-v.y)*f,l=(t.min.y-v.y)*f),n>l||o>s||((o>n||isNaN(n))&&(n=o),(l<s||isNaN(s))&&(s=l),m>=0?(c=(t.min.z-v.z)*m,h=(t.max.z-v.z)*m):(c=(t.max.z-v.z)*m,h=(t.min.z-v.z)*m),n>h||c>s)||((c>n||n!==n)&&(n=c),(h<s||s!==s)&&(s=h),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,n,s,o){va.subVectors(e,t),qs.subVectors(n,t),xa.crossVectors(va,qs);let l=this.direction.dot(xa),c;if(l>0){if(s)return null;c=1}else if(l<0)c=-1,l=-l;else return null;pi.subVectors(this.origin,t);const h=c*this.direction.dot(qs.crossVectors(pi,qs));if(h<0)return null;const d=c*this.direction.dot(va.cross(pi));if(d<0||h+d>l)return null;const f=-c*pi.dot(xa);return f<0?null:this.at(f/l,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ae{constructor(t,e,n,s,o,l,c,h,d,f,m,v,p,M,y,_){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,l,c,h,d,f,m,v,p,M,y,_)}set(t,e,n,s,o,l,c,h,d,f,m,v,p,M,y,_){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=o,g[5]=l,g[9]=c,g[13]=h,g[2]=d,g[6]=f,g[10]=m,g[14]=v,g[3]=p,g[7]=M,g[11]=y,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ur.setFromMatrixColumn(t,0).length(),o=1/ur.setFromMatrixColumn(t,1).length(),l=1/ur.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*l,e[9]=n[9]*l,e[10]=n[10]*l,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),d=Math.sin(s),f=Math.cos(o),m=Math.sin(o);if(t.order==="XYZ"){const v=l*f,p=l*m,M=c*f,y=c*m;e[0]=h*f,e[4]=-h*m,e[8]=d,e[1]=p+M*d,e[5]=v-y*d,e[9]=-c*h,e[2]=y-v*d,e[6]=M+p*d,e[10]=l*h}else if(t.order==="YXZ"){const v=h*f,p=h*m,M=d*f,y=d*m;e[0]=v+y*c,e[4]=M*c-p,e[8]=l*d,e[1]=l*m,e[5]=l*f,e[9]=-c,e[2]=p*c-M,e[6]=y+v*c,e[10]=l*h}else if(t.order==="ZXY"){const v=h*f,p=h*m,M=d*f,y=d*m;e[0]=v-y*c,e[4]=-l*m,e[8]=M+p*c,e[1]=p+M*c,e[5]=l*f,e[9]=y-v*c,e[2]=-l*d,e[6]=c,e[10]=l*h}else if(t.order==="ZYX"){const v=l*f,p=l*m,M=c*f,y=c*m;e[0]=h*f,e[4]=M*d-p,e[8]=v*d+y,e[1]=h*m,e[5]=y*d+v,e[9]=p*d-M,e[2]=-d,e[6]=c*h,e[10]=l*h}else if(t.order==="YZX"){const v=l*h,p=l*d,M=c*h,y=c*d;e[0]=h*f,e[4]=y-v*m,e[8]=M*m+p,e[1]=m,e[5]=l*f,e[9]=-c*f,e[2]=-d*f,e[6]=p*m+M,e[10]=v-y*m}else if(t.order==="XZY"){const v=l*h,p=l*d,M=c*h,y=c*d;e[0]=h*f,e[4]=-m,e[8]=d*f,e[1]=v*m+y,e[5]=l*f,e[9]=p*m-M,e[2]=M*m-p,e[6]=c*f,e[10]=y*m+v}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(bp,t,wp)}lookAt(t,e,n){const s=this.elements;return fn.subVectors(t,e),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),mi.crossVectors(n,fn),mi.lengthSq()===0&&(Math.abs(n.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),mi.crossVectors(n,fn)),mi.normalize(),Ys.crossVectors(fn,mi),s[0]=mi.x,s[4]=Ys.x,s[8]=fn.x,s[1]=mi.y,s[5]=Ys.y,s[9]=fn.y,s[2]=mi.z,s[6]=Ys.z,s[10]=fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,l=n[0],c=n[4],h=n[8],d=n[12],f=n[1],m=n[5],v=n[9],p=n[13],M=n[2],y=n[6],_=n[10],g=n[14],C=n[3],b=n[7],I=n[11],N=n[15],F=s[0],z=s[4],G=s[8],D=s[12],P=s[1],W=s[5],O=s[9],B=s[13],A=s[2],Z=s[6],at=s[10],ot=s[14],Y=s[3],st=s[7],rt=s[11],q=s[15];return o[0]=l*F+c*P+h*A+d*Y,o[4]=l*z+c*W+h*Z+d*st,o[8]=l*G+c*O+h*at+d*rt,o[12]=l*D+c*B+h*ot+d*q,o[1]=f*F+m*P+v*A+p*Y,o[5]=f*z+m*W+v*Z+p*st,o[9]=f*G+m*O+v*at+p*rt,o[13]=f*D+m*B+v*ot+p*q,o[2]=M*F+y*P+_*A+g*Y,o[6]=M*z+y*W+_*Z+g*st,o[10]=M*G+y*O+_*at+g*rt,o[14]=M*D+y*B+_*ot+g*q,o[3]=C*F+b*P+I*A+N*Y,o[7]=C*z+b*W+I*Z+N*st,o[11]=C*G+b*O+I*at+N*rt,o[15]=C*D+b*B+I*ot+N*q,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],l=t[1],c=t[5],h=t[9],d=t[13],f=t[2],m=t[6],v=t[10],p=t[14],M=t[3],y=t[7],_=t[11],g=t[15];return M*(+o*h*m-s*d*m-o*c*v+n*d*v+s*c*p-n*h*p)+y*(+e*h*p-e*d*v+o*l*v-s*l*p+s*d*f-o*h*f)+_*(+e*d*m-e*c*p-o*l*m+n*l*p+o*c*f-n*d*f)+g*(-s*c*f-e*h*m+e*c*v+s*l*m-n*l*v+n*h*f)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],l=t[4],c=t[5],h=t[6],d=t[7],f=t[8],m=t[9],v=t[10],p=t[11],M=t[12],y=t[13],_=t[14],g=t[15],C=m*_*d-y*v*d+y*h*p-c*_*p-m*h*g+c*v*g,b=M*v*d-f*_*d-M*h*p+l*_*p+f*h*g-l*v*g,I=f*y*d-M*m*d+M*c*p-l*y*p-f*c*g+l*m*g,N=M*m*h-f*y*h-M*c*v+l*y*v+f*c*_-l*m*_,F=e*C+n*b+s*I+o*N;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/F;return t[0]=C*z,t[1]=(y*v*o-m*_*o-y*s*p+n*_*p+m*s*g-n*v*g)*z,t[2]=(c*_*o-y*h*o+y*s*d-n*_*d-c*s*g+n*h*g)*z,t[3]=(m*h*o-c*v*o-m*s*d+n*v*d+c*s*p-n*h*p)*z,t[4]=b*z,t[5]=(f*_*o-M*v*o+M*s*p-e*_*p-f*s*g+e*v*g)*z,t[6]=(M*h*o-l*_*o-M*s*d+e*_*d+l*s*g-e*h*g)*z,t[7]=(l*v*o-f*h*o+f*s*d-e*v*d-l*s*p+e*h*p)*z,t[8]=I*z,t[9]=(M*m*o-f*y*o-M*n*p+e*y*p+f*n*g-e*m*g)*z,t[10]=(l*y*o-M*c*o+M*n*d-e*y*d-l*n*g+e*c*g)*z,t[11]=(f*c*o-l*m*o-f*n*d+e*m*d+l*n*p-e*c*p)*z,t[12]=N*z,t[13]=(f*y*s-M*m*s+M*n*v-e*y*v-f*n*_+e*m*_)*z,t[14]=(M*c*s-l*y*s-M*n*h+e*y*h+l*n*_-e*c*_)*z,t[15]=(l*m*s-f*c*s+f*n*h-e*m*h-l*n*v+e*c*v)*z,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,l=t.x,c=t.y,h=t.z,d=o*l,f=o*c;return this.set(d*l+n,d*c-s*h,d*h+s*c,0,d*c+s*h,f*c+n,f*h-s*l,0,d*h-s*c,f*h+s*l,o*h*h+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,l){return this.set(1,n,o,0,t,1,l,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,l=e._y,c=e._z,h=e._w,d=o+o,f=l+l,m=c+c,v=o*d,p=o*f,M=o*m,y=l*f,_=l*m,g=c*m,C=h*d,b=h*f,I=h*m,N=n.x,F=n.y,z=n.z;return s[0]=(1-(y+g))*N,s[1]=(p+I)*N,s[2]=(M-b)*N,s[3]=0,s[4]=(p-I)*F,s[5]=(1-(v+g))*F,s[6]=(_+C)*F,s[7]=0,s[8]=(M+b)*z,s[9]=(_-C)*z,s[10]=(1-(v+y))*z,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=ur.set(s[0],s[1],s[2]).length();const l=ur.set(s[4],s[5],s[6]).length(),c=ur.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],Rn.copy(this);const d=1/o,f=1/l,m=1/c;return Rn.elements[0]*=d,Rn.elements[1]*=d,Rn.elements[2]*=d,Rn.elements[4]*=f,Rn.elements[5]*=f,Rn.elements[6]*=f,Rn.elements[8]*=m,Rn.elements[9]*=m,Rn.elements[10]*=m,e.setFromRotationMatrix(Rn),n.x=o,n.y=l,n.z=c,this}makePerspective(t,e,n,s,o,l,c=oi){const h=this.elements,d=2*o/(e-t),f=2*o/(n-s),m=(e+t)/(e-t),v=(n+s)/(n-s);let p,M;if(c===oi)p=-(l+o)/(l-o),M=-2*l*o/(l-o);else if(c===To)p=-l/(l-o),M=-l*o/(l-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+c);return h[0]=d,h[4]=0,h[8]=m,h[12]=0,h[1]=0,h[5]=f,h[9]=v,h[13]=0,h[2]=0,h[6]=0,h[10]=p,h[14]=M,h[3]=0,h[7]=0,h[11]=-1,h[15]=0,this}makeOrthographic(t,e,n,s,o,l,c=oi){const h=this.elements,d=1/(e-t),f=1/(n-s),m=1/(l-o),v=(e+t)*d,p=(n+s)*f;let M,y;if(c===oi)M=(l+o)*m,y=-2*m;else if(c===To)M=o*m,y=-1*m;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+c);return h[0]=2*d,h[4]=0,h[8]=0,h[12]=-v,h[1]=0,h[5]=2*f,h[9]=0,h[13]=-p,h[2]=0,h[6]=0,h[10]=y,h[14]=-M,h[3]=0,h[7]=0,h[11]=0,h[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ur=new nt,Rn=new Ae,bp=new nt(0,0,0),wp=new nt(1,1,1),mi=new nt,Ys=new nt,fn=new nt,qc=new Ae,Yc=new ji;class Zn{constructor(t=0,e=0,n=0,s=Zn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],l=s[4],c=s[8],h=s[1],d=s[5],f=s[9],m=s[2],v=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ge(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-l,o)):(this._x=Math.atan2(v,d),this._z=0);break;case"YXZ":this._x=Math.asin(-Ge(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(c,p),this._z=Math.atan2(h,d)):(this._y=Math.atan2(-m,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ge(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-m,p),this._z=Math.atan2(-l,d)):(this._y=0,this._z=Math.atan2(h,o));break;case"ZYX":this._y=Math.asin(-Ge(m,-1,1)),Math.abs(m)<.9999999?(this._x=Math.atan2(v,p),this._z=Math.atan2(h,o)):(this._x=0,this._z=Math.atan2(-l,d));break;case"YZX":this._z=Math.asin(Ge(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-m,o)):(this._x=0,this._y=Math.atan2(c,p));break;case"XZY":this._z=Math.asin(-Ge(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(v,d),this._y=Math.atan2(c,o)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return qc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(qc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yc.setFromEuler(this),this.setFromQuaternion(Yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zn.DEFAULT_ORDER="XYZ";class _u{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Ep=0;const jc=new nt,dr=new ji,ti=new Ae,js=new nt,es=new nt,Tp=new nt,Ap=new ji,Kc=new nt(1,0,0),$c=new nt(0,1,0),Jc=new nt(0,0,1),Qc={type:"added"},Cp={type:"removed"},fr={type:"childadded",child:null},ya={type:"childremoved",child:null};class $e extends $i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ep++}),this.uuid=Or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$e.DEFAULT_UP.clone();const t=new nt,e=new Zn,n=new ji,s=new nt(1,1,1);function o(){n.setFromEuler(e,!1)}function l(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(l),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new ae}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=$e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _u,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return dr.setFromAxisAngle(t,e),this.quaternion.multiply(dr),this}rotateOnWorldAxis(t,e){return dr.setFromAxisAngle(t,e),this.quaternion.premultiply(dr),this}rotateX(t){return this.rotateOnAxis(Kc,t)}rotateY(t){return this.rotateOnAxis($c,t)}rotateZ(t){return this.rotateOnAxis(Jc,t)}translateOnAxis(t,e){return jc.copy(t).applyQuaternion(this.quaternion),this.position.add(jc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Kc,t)}translateY(t){return this.translateOnAxis($c,t)}translateZ(t){return this.translateOnAxis(Jc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?js.copy(t):js.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(es,js,this.up):ti.lookAt(js,es,this.up),this.quaternion.setFromRotationMatrix(ti),s&&(ti.extractRotation(s.matrixWorld),dr.setFromRotationMatrix(ti),this.quaternion.premultiply(dr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Qc),fr.child=t,this.dispatchEvent(fr),fr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Cp),ya.child=t,this.dispatchEvent(ya),ya.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Qc),fr.child=t,this.dispatchEvent(fr),fr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const l=this.children[n].getObjectByProperty(t,e);if(l!==void 0)return l}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,l=s.length;o<l;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,t,Tp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,Ap,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let o=0,l=s.length;o<l;o++){const c=s[o];c.matrixWorldAutoUpdate===!0&&c.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(c=>({boxInitialized:c.boxInitialized,boxMin:c.box.min.toArray(),boxMax:c.box.max.toArray(),sphereInitialized:c.sphereInitialized,sphereRadius:c.sphere.radius,sphereCenter:c.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(c,h){return c[h.uuid]===void 0&&(c[h.uuid]=h.toJSON(t)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const c=this.geometry.parameters;if(c!==void 0&&c.shapes!==void 0){const h=c.shapes;if(Array.isArray(h))for(let d=0,f=h.length;d<f;d++){const m=h[d];o(t.shapes,m)}else o(t.shapes,h)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const c=[];for(let h=0,d=this.material.length;h<d;h++)c.push(o(t.materials,this.material[h]));s.material=c}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let c=0;c<this.children.length;c++)s.children.push(this.children[c].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let c=0;c<this.animations.length;c++){const h=this.animations[c];s.animations.push(o(t.animations,h))}}if(e){const c=l(t.geometries),h=l(t.materials),d=l(t.textures),f=l(t.images),m=l(t.shapes),v=l(t.skeletons),p=l(t.animations),M=l(t.nodes);c.length>0&&(n.geometries=c),h.length>0&&(n.materials=h),d.length>0&&(n.textures=d),f.length>0&&(n.images=f),m.length>0&&(n.shapes=m),v.length>0&&(n.skeletons=v),p.length>0&&(n.animations=p),M.length>0&&(n.nodes=M)}return n.object=s,n;function l(c){const h=[];for(const d in c){const f=c[d];delete f.metadata,h.push(f)}return h}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}$e.DEFAULT_UP=new nt(0,1,0);$e.DEFAULT_MATRIX_AUTO_UPDATE=!0;$e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new nt,ei=new nt,Ma=new nt,ni=new nt,pr=new nt,mr=new nt,th=new nt,Sa=new nt,ba=new nt,wa=new nt;class Vn{constructor(t=new nt,e=new nt,n=new nt){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),In.subVectors(t,e),s.cross(In);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){In.subVectors(s,e),ei.subVectors(n,e),Ma.subVectors(t,e);const l=In.dot(In),c=In.dot(ei),h=In.dot(Ma),d=ei.dot(ei),f=ei.dot(Ma),m=l*d-c*c;if(m===0)return o.set(0,0,0),null;const v=1/m,p=(d*h-c*f)*v,M=(l*f-c*h)*v;return o.set(1-p-M,M,p)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(t,e,n,s,o,l,c,h){return this.getBarycoord(t,e,n,s,ni)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(o,ni.x),h.addScaledVector(l,ni.y),h.addScaledVector(c,ni.z),h)}static isFrontFacing(t,e,n,s){return In.subVectors(n,e),ei.subVectors(t,e),In.cross(ei).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),In.cross(ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Vn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Vn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return Vn.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return Vn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Vn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let l,c;pr.subVectors(s,n),mr.subVectors(o,n),Sa.subVectors(t,n);const h=pr.dot(Sa),d=mr.dot(Sa);if(h<=0&&d<=0)return e.copy(n);ba.subVectors(t,s);const f=pr.dot(ba),m=mr.dot(ba);if(f>=0&&m<=f)return e.copy(s);const v=h*m-f*d;if(v<=0&&h>=0&&f<=0)return l=h/(h-f),e.copy(n).addScaledVector(pr,l);wa.subVectors(t,o);const p=pr.dot(wa),M=mr.dot(wa);if(M>=0&&p<=M)return e.copy(o);const y=p*d-h*M;if(y<=0&&d>=0&&M<=0)return c=d/(d-M),e.copy(n).addScaledVector(mr,c);const _=f*M-p*m;if(_<=0&&m-f>=0&&p-M>=0)return th.subVectors(o,s),c=(m-f)/(m-f+(p-M)),e.copy(s).addScaledVector(th,c);const g=1/(_+y+v);return l=y*g,c=v*g,e.copy(n).addScaledVector(pr,l).addScaledVector(mr,c)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const gu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},_i={h:0,s:0,l:0},Ks={h:0,s:0,l:0};function Ea(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class ue{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,_e.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=_e.workingColorSpace){return this.r=t,this.g=e,this.b=n,_e.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=_e.workingColorSpace){if(t=dp(t,1),e=Ge(e,0,1),n=Ge(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,l=2*n-o;this.r=Ea(l,o,t+1/3),this.g=Ea(l,o,t),this.b=Ea(l,o,t-1/3)}return _e.toWorkingColorSpace(this,s),this}setStyle(t,e=Hn){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const l=s[1],c=s[2];switch(l){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],l=o.length;if(l===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(l===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Hn){const n=gu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Pr(t.r),this.g=Pr(t.g),this.b=Pr(t.b),this}copyLinearToSRGB(t){return this.r=da(t.r),this.g=da(t.g),this.b=da(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Hn){return _e.fromWorkingColorSpace(Ye.copy(this),t),Math.round(Ge(Ye.r*255,0,255))*65536+Math.round(Ge(Ye.g*255,0,255))*256+Math.round(Ge(Ye.b*255,0,255))}getHexString(t=Hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=_e.workingColorSpace){_e.fromWorkingColorSpace(Ye.copy(this),e);const n=Ye.r,s=Ye.g,o=Ye.b,l=Math.max(n,s,o),c=Math.min(n,s,o);let h,d;const f=(c+l)/2;if(c===l)h=0,d=0;else{const m=l-c;switch(d=f<=.5?m/(l+c):m/(2-l-c),l){case n:h=(s-o)/m+(s<o?6:0);break;case s:h=(o-n)/m+2;break;case o:h=(n-s)/m+4;break}h/=6}return t.h=h,t.s=d,t.l=f,t}getRGB(t,e=_e.workingColorSpace){return _e.fromWorkingColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Hn){_e.fromWorkingColorSpace(Ye.copy(this),t);const e=Ye.r,n=Ye.g,s=Ye.b;return t!==Hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(_i),this.setHSL(_i.h+t,_i.s+e,_i.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(_i),t.getHSL(Ks);const n=ha(_i.h,Ks.h,e),s=ha(_i.s,Ks.s,e),o=ha(_i.l,Ks.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ye=new ue;ue.NAMES=gu;let Pp=0;class Ms extends $i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pp++}),this.uuid=Or(),this.name="",this.type="Material",this.blending=Ar,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xa,this.blendDst=qa,this.blendEquation=Hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=Mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=or,this.stencilZFail=or,this.stencilZPass=or,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ar&&(n.blending=this.blending),this.side!==wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Xa&&(n.blendSrc=this.blendSrc),this.blendDst!==qa&&(n.blendDst=this.blendDst),this.blendEquation!==Hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Mo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==or&&(n.stencilFail=this.stencilFail),this.stencilZFail!==or&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==or&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}if(e){const o=s(t.textures),l=s(t.images);o.length>0&&(n.textures=o),l.length>0&&(n.images=l)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class vu extends Ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.combine=Qh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Oe=new nt,$s=new yt;class xn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Hc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=yi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return mp("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)$s.fromBufferAttribute(this,e),$s.applyMatrix3(t),this.setXY(e,$s.x,$s.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Jr(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=hn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Jr(e,this.array)),e}setX(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Jr(e,this.array)),e}setY(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Jr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Jr(e,this.array)),e}setW(t,e){return this.normalized&&(e=hn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array),s=hn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=hn(e,this.array),n=hn(n,this.array),s=hn(s,this.array),o=hn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Hc&&(t.usage=this.usage),t}}class xu extends xn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class yu extends xn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Le extends xn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Lp=0;const bn=new Ae,Ta=new $e,_r=new nt,pn=new ys,ns=new ys,Be=new nt;class on extends $i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lp++}),this.uuid=Or(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(du(t)?yu:xu)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new ae().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return Ta.lookAt(t),Ta.updateMatrix(),this.applyMatrix4(Ta.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(_r).negate(),this.translate(_r.x,_r.y,_r.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new Le(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];pn.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,pn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,pn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(pn.min),this.boundingBox.expandByPoint(pn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new al);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(t){const n=this.boundingSphere.center;if(pn.setFromBufferAttribute(t),e)for(let o=0,l=e.length;o<l;o++){const c=e[o];ns.setFromBufferAttribute(c),this.morphTargetsRelative?(Be.addVectors(pn.min,ns.min),pn.expandByPoint(Be),Be.addVectors(pn.max,ns.max),pn.expandByPoint(Be)):(pn.expandByPoint(ns.min),pn.expandByPoint(ns.max))}pn.getCenter(n);let s=0;for(let o=0,l=t.count;o<l;o++)Be.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let o=0,l=e.length;o<l;o++){const c=e[o],h=this.morphTargetsRelative;for(let d=0,f=c.count;d<f;d++)Be.fromBufferAttribute(c,d),h&&(_r.fromBufferAttribute(t,d),Be.add(_r)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*n.count),4));const l=this.getAttribute("tangent"),c=[],h=[];for(let G=0;G<n.count;G++)c[G]=new nt,h[G]=new nt;const d=new nt,f=new nt,m=new nt,v=new yt,p=new yt,M=new yt,y=new nt,_=new nt;function g(G,D,P){d.fromBufferAttribute(n,G),f.fromBufferAttribute(n,D),m.fromBufferAttribute(n,P),v.fromBufferAttribute(o,G),p.fromBufferAttribute(o,D),M.fromBufferAttribute(o,P),f.sub(d),m.sub(d),p.sub(v),M.sub(v);const W=1/(p.x*M.y-M.x*p.y);isFinite(W)&&(y.copy(f).multiplyScalar(M.y).addScaledVector(m,-p.y).multiplyScalar(W),_.copy(m).multiplyScalar(p.x).addScaledVector(f,-M.x).multiplyScalar(W),c[G].add(y),c[D].add(y),c[P].add(y),h[G].add(_),h[D].add(_),h[P].add(_))}let C=this.groups;C.length===0&&(C=[{start:0,count:t.count}]);for(let G=0,D=C.length;G<D;++G){const P=C[G],W=P.start,O=P.count;for(let B=W,A=W+O;B<A;B+=3)g(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const b=new nt,I=new nt,N=new nt,F=new nt;function z(G){N.fromBufferAttribute(s,G),F.copy(N);const D=c[G];b.copy(D),b.sub(N.multiplyScalar(N.dot(D))).normalize(),I.crossVectors(F,D);const W=I.dot(h[G])<0?-1:1;l.setXYZW(G,b.x,b.y,b.z,W)}for(let G=0,D=C.length;G<D;++G){const P=C[G],W=P.start,O=P.count;for(let B=W,A=W+O;B<A;B+=3)z(t.getX(B+0)),z(t.getX(B+1)),z(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new xn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let v=0,p=n.count;v<p;v++)n.setXYZ(v,0,0,0);const s=new nt,o=new nt,l=new nt,c=new nt,h=new nt,d=new nt,f=new nt,m=new nt;if(t)for(let v=0,p=t.count;v<p;v+=3){const M=t.getX(v+0),y=t.getX(v+1),_=t.getX(v+2);s.fromBufferAttribute(e,M),o.fromBufferAttribute(e,y),l.fromBufferAttribute(e,_),f.subVectors(l,o),m.subVectors(s,o),f.cross(m),c.fromBufferAttribute(n,M),h.fromBufferAttribute(n,y),d.fromBufferAttribute(n,_),c.add(f),h.add(f),d.add(f),n.setXYZ(M,c.x,c.y,c.z),n.setXYZ(y,h.x,h.y,h.z),n.setXYZ(_,d.x,d.y,d.z)}else for(let v=0,p=e.count;v<p;v+=3)s.fromBufferAttribute(e,v+0),o.fromBufferAttribute(e,v+1),l.fromBufferAttribute(e,v+2),f.subVectors(l,o),m.subVectors(s,o),f.cross(m),n.setXYZ(v+0,f.x,f.y,f.z),n.setXYZ(v+1,f.x,f.y,f.z),n.setXYZ(v+2,f.x,f.y,f.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(c,h){const d=c.array,f=c.itemSize,m=c.normalized,v=new d.constructor(h.length*f);let p=0,M=0;for(let y=0,_=h.length;y<_;y++){c.isInterleavedBufferAttribute?p=h[y]*c.data.stride+c.offset:p=h[y]*f;for(let g=0;g<f;g++)v[M++]=d[p++]}return new xn(v,f,m)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new on,n=this.index.array,s=this.attributes;for(const c in s){const h=s[c],d=t(h,n);e.setAttribute(c,d)}const o=this.morphAttributes;for(const c in o){const h=[],d=o[c];for(let f=0,m=d.length;f<m;f++){const v=d[f],p=t(v,n);h.push(p)}e.morphAttributes[c]=h}e.morphTargetsRelative=this.morphTargetsRelative;const l=this.groups;for(let c=0,h=l.length;c<h;c++){const d=l[c];e.addGroup(d.start,d.count,d.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const d in h)h[d]!==void 0&&(t[d]=h[d]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const h in n){const d=n[h];t.data.attributes[h]=d.toJSON(t.data)}const s={};let o=!1;for(const h in this.morphAttributes){const d=this.morphAttributes[h],f=[];for(let m=0,v=d.length;m<v;m++){const p=d[m];f.push(p.toJSON(t.data))}f.length>0&&(s[h]=f,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const l=this.groups;l.length>0&&(t.data.groups=JSON.parse(JSON.stringify(l)));const c=this.boundingSphere;return c!==null&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const d in s){const f=s[d];this.setAttribute(d,f.clone(e))}const o=t.morphAttributes;for(const d in o){const f=[],m=o[d];for(let v=0,p=m.length;v<p;v++)f.push(m[v].clone(e));this.morphAttributes[d]=f}this.morphTargetsRelative=t.morphTargetsRelative;const l=t.groups;for(let d=0,f=l.length;d<f;d++){const m=l[d];this.addGroup(m.start,m.count,m.materialIndex)}const c=t.boundingBox;c!==null&&(this.boundingBox=c.clone());const h=t.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eh=new Ae,Ui=new mu,Js=new al,nh=new nt,gr=new nt,vr=new nt,xr=new nt,Aa=new nt,Qs=new nt,to=new yt,eo=new yt,no=new yt,ih=new nt,rh=new nt,sh=new nt,io=new nt,ro=new nt;class sn extends $e{constructor(t=new on,e=new vu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,l=s.length;o<l;o++){const c=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[c]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,l=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const c=this.morphTargetInfluences;if(o&&c){Qs.set(0,0,0);for(let h=0,d=o.length;h<d;h++){const f=c[h],m=o[h];f!==0&&(Aa.fromBufferAttribute(m,t),l?Qs.addScaledVector(Aa,f):Qs.addScaledVector(Aa.sub(e),f))}e.add(Qs)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Js.copy(n.boundingSphere),Js.applyMatrix4(o),Ui.copy(t.ray).recast(t.near),!(Js.containsPoint(Ui.origin)===!1&&(Ui.intersectSphere(Js,nh)===null||Ui.origin.distanceToSquared(nh)>(t.far-t.near)**2))&&(eh.copy(o).invert(),Ui.copy(t.ray).applyMatrix4(eh),!(n.boundingBox!==null&&Ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ui)))}_computeIntersections(t,e,n){let s;const o=this.geometry,l=this.material,c=o.index,h=o.attributes.position,d=o.attributes.uv,f=o.attributes.uv1,m=o.attributes.normal,v=o.groups,p=o.drawRange;if(c!==null)if(Array.isArray(l))for(let M=0,y=v.length;M<y;M++){const _=v[M],g=l[_.materialIndex],C=Math.max(_.start,p.start),b=Math.min(c.count,Math.min(_.start+_.count,p.start+p.count));for(let I=C,N=b;I<N;I+=3){const F=c.getX(I),z=c.getX(I+1),G=c.getX(I+2);s=so(this,g,t,n,d,f,m,F,z,G),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const M=Math.max(0,p.start),y=Math.min(c.count,p.start+p.count);for(let _=M,g=y;_<g;_+=3){const C=c.getX(_),b=c.getX(_+1),I=c.getX(_+2);s=so(this,l,t,n,d,f,m,C,b,I),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}else if(h!==void 0)if(Array.isArray(l))for(let M=0,y=v.length;M<y;M++){const _=v[M],g=l[_.materialIndex],C=Math.max(_.start,p.start),b=Math.min(h.count,Math.min(_.start+_.count,p.start+p.count));for(let I=C,N=b;I<N;I+=3){const F=I,z=I+1,G=I+2;s=so(this,g,t,n,d,f,m,F,z,G),s&&(s.faceIndex=Math.floor(I/3),s.face.materialIndex=_.materialIndex,e.push(s))}}else{const M=Math.max(0,p.start),y=Math.min(h.count,p.start+p.count);for(let _=M,g=y;_<g;_+=3){const C=_,b=_+1,I=_+2;s=so(this,l,t,n,d,f,m,C,b,I),s&&(s.faceIndex=Math.floor(_/3),e.push(s))}}}}function Rp(r,t,e,n,s,o,l,c){let h;if(t.side===un?h=n.intersectTriangle(l,o,s,!0,c):h=n.intersectTriangle(s,o,l,t.side===wi,c),h===null)return null;ro.copy(c),ro.applyMatrix4(r.matrixWorld);const d=e.ray.origin.distanceTo(ro);return d<e.near||d>e.far?null:{distance:d,point:ro.clone(),object:r}}function so(r,t,e,n,s,o,l,c,h,d){r.getVertexPosition(c,gr),r.getVertexPosition(h,vr),r.getVertexPosition(d,xr);const f=Rp(r,t,e,n,gr,vr,xr,io);if(f){s&&(to.fromBufferAttribute(s,c),eo.fromBufferAttribute(s,h),no.fromBufferAttribute(s,d),f.uv=Vn.getInterpolation(io,gr,vr,xr,to,eo,no,new yt)),o&&(to.fromBufferAttribute(o,c),eo.fromBufferAttribute(o,h),no.fromBufferAttribute(o,d),f.uv1=Vn.getInterpolation(io,gr,vr,xr,to,eo,no,new yt)),l&&(ih.fromBufferAttribute(l,c),rh.fromBufferAttribute(l,h),sh.fromBufferAttribute(l,d),f.normal=Vn.getInterpolation(io,gr,vr,xr,ih,rh,sh,new nt),f.normal.dot(n.direction)>0&&f.normal.multiplyScalar(-1));const m={a:c,b:h,c:d,normal:new nt,materialIndex:0};Vn.getNormal(gr,vr,xr,m.normal),f.face=m}return f}class En extends on{constructor(t=1,e=1,n=1,s=1,o=1,l=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:l};const c=this;s=Math.floor(s),o=Math.floor(o),l=Math.floor(l);const h=[],d=[],f=[],m=[];let v=0,p=0;M("z","y","x",-1,-1,n,e,t,l,o,0),M("z","y","x",1,-1,n,e,-t,l,o,1),M("x","z","y",1,1,t,n,e,s,l,2),M("x","z","y",1,-1,t,n,-e,s,l,3),M("x","y","z",1,-1,t,e,n,s,o,4),M("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(h),this.setAttribute("position",new Le(d,3)),this.setAttribute("normal",new Le(f,3)),this.setAttribute("uv",new Le(m,2));function M(y,_,g,C,b,I,N,F,z,G,D){const P=I/z,W=N/G,O=I/2,B=N/2,A=F/2,Z=z+1,at=G+1;let ot=0,Y=0;const st=new nt;for(let rt=0;rt<at;rt++){const q=rt*W-B;for(let Q=0;Q<Z;Q++){const Ct=Q*P-O;st[y]=Ct*C,st[_]=q*b,st[g]=A,d.push(st.x,st.y,st.z),st[y]=0,st[_]=0,st[g]=F>0?1:-1,f.push(st.x,st.y,st.z),m.push(Q/z),m.push(1-rt/G),ot+=1}}for(let rt=0;rt<G;rt++)for(let q=0;q<z;q++){const Q=v+q+Z*rt,Ct=v+q+Z*(rt+1),J=v+(q+1)+Z*(rt+1),et=v+(q+1)+Z*rt;h.push(Q,Ct,et),h.push(Ct,J,et),Y+=6}c.addGroup(p,Y,D),p+=Y,v+=ot}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new En(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Nr(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const s=r[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function nn(r){const t={};for(let e=0;e<r.length;e++){const n=Nr(r[e]);for(const s in n)t[s]=n[s]}return t}function Ip(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Mu(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:_e.workingColorSpace}const Dp={clone:Nr,merge:nn};var Np=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Op=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ei extends Ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Np,this.fragmentShader=Op,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Nr(t.uniforms),this.uniformsGroups=Ip(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const l=this.uniforms[s].value;l&&l.isTexture?e.uniforms[s]={type:"t",value:l.toJSON(t).uuid}:l&&l.isColor?e.uniforms[s]={type:"c",value:l.getHex()}:l&&l.isVector2?e.uniforms[s]={type:"v2",value:l.toArray()}:l&&l.isVector3?e.uniforms[s]={type:"v3",value:l.toArray()}:l&&l.isVector4?e.uniforms[s]={type:"v4",value:l.toArray()}:l&&l.isMatrix3?e.uniforms[s]={type:"m3",value:l.toArray()}:l&&l.isMatrix4?e.uniforms[s]={type:"m4",value:l.toArray()}:e.uniforms[s]={value:l}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Su extends $e{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=oi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const gi=new nt,oh=new yt,ah=new yt;class Tn extends Su{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ja*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ja*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){gi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(gi.x,gi.y).multiplyScalar(-t/gi.z),gi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(gi.x,gi.y).multiplyScalar(-t/gi.z)}getViewSize(t,e){return this.getViewBounds(t,oh,ah),e.subVectors(ah,oh)}setViewOffset(t,e,n,s,o,l){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(go*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const l=this.view;if(this.view!==null&&this.view.enabled){const h=l.fullWidth,d=l.fullHeight;o+=l.offsetX*s/h,e-=l.offsetY*n/d,s*=l.width/h,n*=l.height/d}const c=this.filmOffset;c!==0&&(o+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const yr=-90,Mr=1;class Up extends $e{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Tn(yr,Mr,t,e);s.layers=this.layers,this.add(s);const o=new Tn(yr,Mr,t,e);o.layers=this.layers,this.add(o);const l=new Tn(yr,Mr,t,e);l.layers=this.layers,this.add(l);const c=new Tn(yr,Mr,t,e);c.layers=this.layers,this.add(c);const h=new Tn(yr,Mr,t,e);h.layers=this.layers,this.add(h);const d=new Tn(yr,Mr,t,e);d.layers=this.layers,this.add(d)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,l,c,h]=e;for(const d of e)this.remove(d);if(t===oi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),l.up.set(0,0,1),l.lookAt(0,-1,0),c.up.set(0,1,0),c.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(t===To)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),l.up.set(0,0,-1),l.lookAt(0,-1,0),c.up.set(0,-1,0),c.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const d of e)this.add(d),d.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,l,c,h,d,f]=this.children,m=t.getRenderTarget(),v=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),M=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,l),t.setRenderTarget(n,2,s),t.render(e,c),t.setRenderTarget(n,3,s),t.render(e,h),t.setRenderTarget(n,4,s),t.render(e,d),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,f),t.setRenderTarget(m,v,p),t.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class bu extends dn{constructor(t,e,n,s,o,l,c,h,d,f){t=t!==void 0?t:[],e=e!==void 0?e:Rr,super(t,e,n,s,o,l,c,h,d,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zp extends Yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new bu(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:On}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new En(5,5,5),o=new Ei({name:"CubemapFromEquirect",uniforms:Nr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:un,blending:Mi});o.uniforms.tEquirect.value=e;const l=new sn(s,o),c=e.minFilter;return e.minFilter===qi&&(e.minFilter=On),new Up(1,10,this).update(t,l),e.minFilter=c,l.geometry.dispose(),l.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let l=0;l<6;l++)t.setRenderTarget(this,l),t.clear(e,n,s);t.setRenderTarget(o)}}const Ca=new nt,Fp=new nt,kp=new ae;class vi{constructor(t=new nt(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ca.subVectors(n,e).cross(Fp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ca),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||kp.getNormalMatrix(t),s=this.coplanarPoint(Ca).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zi=new al,oo=new nt;class ll{constructor(t=new vi,e=new vi,n=new vi,s=new vi,o=new vi,l=new vi){this.planes=[t,e,n,s,o,l]}set(t,e,n,s,o,l){const c=this.planes;return c[0].copy(t),c[1].copy(e),c[2].copy(n),c[3].copy(s),c[4].copy(o),c[5].copy(l),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=oi){const n=this.planes,s=t.elements,o=s[0],l=s[1],c=s[2],h=s[3],d=s[4],f=s[5],m=s[6],v=s[7],p=s[8],M=s[9],y=s[10],_=s[11],g=s[12],C=s[13],b=s[14],I=s[15];if(n[0].setComponents(h-o,v-d,_-p,I-g).normalize(),n[1].setComponents(h+o,v+d,_+p,I+g).normalize(),n[2].setComponents(h+l,v+f,_+M,I+C).normalize(),n[3].setComponents(h-l,v-f,_-M,I-C).normalize(),n[4].setComponents(h-c,v-m,_-y,I-b).normalize(),e===oi)n[5].setComponents(h+c,v+m,_+y,I+b).normalize();else if(e===To)n[5].setComponents(c,m,y,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zi)}intersectsSprite(t){return zi.center.set(0,0,0),zi.radius=.7071067811865476,zi.applyMatrix4(t.matrixWorld),this.intersectsSphere(zi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(oo.x=s.normal.x>0?t.max.x:t.min.x,oo.y=s.normal.y>0?t.max.y:t.min.y,oo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(oo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function wu(){let r=null,t=!1,e=null,n=null;function s(o,l){e(o,l),n=r.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(s),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){r=o}}}function Bp(r){const t=new WeakMap;function e(c,h){const d=c.array,f=c.usage,m=d.byteLength,v=r.createBuffer();r.bindBuffer(h,v),r.bufferData(h,d,f),c.onUploadCallback();let p;if(d instanceof Float32Array)p=r.FLOAT;else if(d instanceof Uint16Array)c.isFloat16BufferAttribute?p=r.HALF_FLOAT:p=r.UNSIGNED_SHORT;else if(d instanceof Int16Array)p=r.SHORT;else if(d instanceof Uint32Array)p=r.UNSIGNED_INT;else if(d instanceof Int32Array)p=r.INT;else if(d instanceof Int8Array)p=r.BYTE;else if(d instanceof Uint8Array)p=r.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)p=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:v,type:p,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:m}}function n(c,h,d){const f=h.array,m=h._updateRange,v=h.updateRanges;if(r.bindBuffer(d,c),m.count===-1&&v.length===0&&r.bufferSubData(d,0,f),v.length!==0){for(let p=0,M=v.length;p<M;p++){const y=v[p];r.bufferSubData(d,y.start*f.BYTES_PER_ELEMENT,f,y.start,y.count)}h.clearUpdateRanges()}m.count!==-1&&(r.bufferSubData(d,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count),m.count=-1),h.onUploadCallback()}function s(c){return c.isInterleavedBufferAttribute&&(c=c.data),t.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=t.get(c);h&&(r.deleteBuffer(h.buffer),t.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=t.get(c);(!f||f.version<c.version)&&t.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=t.get(c);if(d===void 0)t.set(c,e(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(d.buffer,c,h),d.version=c.version}}return{get:s,remove:o,update:l}}class Io extends on{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,l=e/2,c=Math.floor(n),h=Math.floor(s),d=c+1,f=h+1,m=t/c,v=e/h,p=[],M=[],y=[],_=[];for(let g=0;g<f;g++){const C=g*v-l;for(let b=0;b<d;b++){const I=b*m-o;M.push(I,-C,0),y.push(0,0,1),_.push(b/c),_.push(1-g/h)}}for(let g=0;g<h;g++)for(let C=0;C<c;C++){const b=C+d*g,I=C+d*(g+1),N=C+1+d*(g+1),F=C+1+d*g;p.push(b,I,F),p.push(I,N,F)}this.setIndex(p),this.setAttribute("position",new Le(M,3)),this.setAttribute("normal",new Le(y,3)),this.setAttribute("uv",new Le(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Io(t.width,t.height,t.widthSegments,t.heightSegments)}}var Hp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Gp=`#ifdef USE_ALPHAHASH
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
#endif`,Vp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Wp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Xp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,qp=`#ifdef USE_AOMAP
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
#endif`,Yp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,jp=`#ifdef USE_BATCHING
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
#endif`,Kp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,$p=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Jp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Qp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,tm=`#ifdef USE_IRIDESCENCE
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
#endif`,em=`#ifdef USE_BUMPMAP
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
#endif`,nm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,sm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,om=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,am=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,lm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,cm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,hm=`#define PI 3.141592653589793
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
} // validated`,um=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,dm=`vec3 transformedNormal = objectNormal;
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
#endif`,fm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,pm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,mm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,_m=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,gm="gl_FragColor = linearToOutputTexel( gl_FragColor );",vm=`
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
}`,xm=`#ifdef USE_ENVMAP
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
#endif`,ym=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Mm=`#ifdef USE_ENVMAP
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
#endif`,Sm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,bm=`#ifdef USE_ENVMAP
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
#endif`,wm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Em=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Tm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Am=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Cm=`#ifdef USE_GRADIENTMAP
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
}`,Pm=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Lm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Rm=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Dm=`uniform bool receiveShadow;
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
#endif`,Nm=`#ifdef USE_ENVMAP
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
#endif`,Om=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Um=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,zm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Fm=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,km=`PhysicalMaterial material;
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
#endif`,Bm=`struct PhysicalMaterial {
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
}`,Hm=`
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
#endif`,Gm=`#if defined( RE_IndirectDiffuse )
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
#endif`,Vm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Wm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Xm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,qm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ym=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,jm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Km=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$m=`#if defined( USE_POINTS_UV )
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
#endif`,Jm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Qm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,t_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,e_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,n_=`#ifdef USE_MORPHNORMALS
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
#endif`,i_=`#ifdef USE_MORPHTARGETS
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
#endif`,r_=`#ifdef USE_MORPHTARGETS
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
#endif`,s_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,o_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,a_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,l_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,c_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,h_=`#ifdef USE_NORMALMAP
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
#endif`,u_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,d_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,f_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,p_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,m_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,__=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,g_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,v_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,x_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,y_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,M_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,S_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,b_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,w_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,E_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,T_=`float getShadowMask() {
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
}`,A_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,C_=`#ifdef USE_SKINNING
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
#endif`,P_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,L_=`#ifdef USE_SKINNING
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
#endif`,R_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,I_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,D_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,N_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,O_=`#ifdef USE_TRANSMISSION
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
#endif`,U_=`#ifdef USE_TRANSMISSION
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
#endif`,z_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,F_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,k_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,B_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const H_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,G_=`uniform sampler2D t2D;
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
}`,V_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,W_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,X_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q_=`#include <common>
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
}`,Y_=`#if DEPTH_PACKING == 3200
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
}`,j_=`#define DISTANCE
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
}`,K_=`#define DISTANCE
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
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,J_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`uniform float scale;
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
}`,tg=`uniform vec3 diffuse;
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
}`,eg=`#include <common>
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
}`,ng=`uniform vec3 diffuse;
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
}`,ig=`#define LAMBERT
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
}`,rg=`#define LAMBERT
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
}`,sg=`#define MATCAP
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
}`,og=`#define MATCAP
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
}`,ag=`#define NORMAL
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
}`,lg=`#define NORMAL
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
}`,cg=`#define PHONG
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
}`,hg=`#define PHONG
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
}`,ug=`#define STANDARD
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
}`,dg=`#define STANDARD
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
}`,fg=`#define TOON
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
}`,pg=`#define TOON
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
}`,mg=`uniform float size;
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
}`,_g=`uniform vec3 diffuse;
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
}`,gg=`#include <common>
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
}`,vg=`uniform vec3 color;
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
}`,xg=`uniform float rotation;
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
}`,yg=`uniform vec3 diffuse;
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
}`,oe={alphahash_fragment:Hp,alphahash_pars_fragment:Gp,alphamap_fragment:Vp,alphamap_pars_fragment:Wp,alphatest_fragment:Zp,alphatest_pars_fragment:Xp,aomap_fragment:qp,aomap_pars_fragment:Yp,batching_pars_vertex:jp,batching_vertex:Kp,begin_vertex:$p,beginnormal_vertex:Jp,bsdfs:Qp,iridescence_fragment:tm,bumpmap_pars_fragment:em,clipping_planes_fragment:nm,clipping_planes_pars_fragment:im,clipping_planes_pars_vertex:rm,clipping_planes_vertex:sm,color_fragment:om,color_pars_fragment:am,color_pars_vertex:lm,color_vertex:cm,common:hm,cube_uv_reflection_fragment:um,defaultnormal_vertex:dm,displacementmap_pars_vertex:fm,displacementmap_vertex:pm,emissivemap_fragment:mm,emissivemap_pars_fragment:_m,colorspace_fragment:gm,colorspace_pars_fragment:vm,envmap_fragment:xm,envmap_common_pars_fragment:ym,envmap_pars_fragment:Mm,envmap_pars_vertex:Sm,envmap_physical_pars_fragment:Nm,envmap_vertex:bm,fog_vertex:wm,fog_pars_vertex:Em,fog_fragment:Tm,fog_pars_fragment:Am,gradientmap_pars_fragment:Cm,lightmap_fragment:Pm,lightmap_pars_fragment:Lm,lights_lambert_fragment:Rm,lights_lambert_pars_fragment:Im,lights_pars_begin:Dm,lights_toon_fragment:Om,lights_toon_pars_fragment:Um,lights_phong_fragment:zm,lights_phong_pars_fragment:Fm,lights_physical_fragment:km,lights_physical_pars_fragment:Bm,lights_fragment_begin:Hm,lights_fragment_maps:Gm,lights_fragment_end:Vm,logdepthbuf_fragment:Wm,logdepthbuf_pars_fragment:Zm,logdepthbuf_pars_vertex:Xm,logdepthbuf_vertex:qm,map_fragment:Ym,map_pars_fragment:jm,map_particle_fragment:Km,map_particle_pars_fragment:$m,metalnessmap_fragment:Jm,metalnessmap_pars_fragment:Qm,morphinstance_vertex:t_,morphcolor_vertex:e_,morphnormal_vertex:n_,morphtarget_pars_vertex:i_,morphtarget_vertex:r_,normal_fragment_begin:s_,normal_fragment_maps:o_,normal_pars_fragment:a_,normal_pars_vertex:l_,normal_vertex:c_,normalmap_pars_fragment:h_,clearcoat_normal_fragment_begin:u_,clearcoat_normal_fragment_maps:d_,clearcoat_pars_fragment:f_,iridescence_pars_fragment:p_,opaque_fragment:m_,packing:__,premultiplied_alpha_fragment:g_,project_vertex:v_,dithering_fragment:x_,dithering_pars_fragment:y_,roughnessmap_fragment:M_,roughnessmap_pars_fragment:S_,shadowmap_pars_fragment:b_,shadowmap_pars_vertex:w_,shadowmap_vertex:E_,shadowmask_pars_fragment:T_,skinbase_vertex:A_,skinning_pars_vertex:C_,skinning_vertex:P_,skinnormal_vertex:L_,specularmap_fragment:R_,specularmap_pars_fragment:I_,tonemapping_fragment:D_,tonemapping_pars_fragment:N_,transmission_fragment:O_,transmission_pars_fragment:U_,uv_pars_fragment:z_,uv_pars_vertex:F_,uv_vertex:k_,worldpos_vertex:B_,background_vert:H_,background_frag:G_,backgroundCube_vert:V_,backgroundCube_frag:W_,cube_vert:Z_,cube_frag:X_,depth_vert:q_,depth_frag:Y_,distanceRGBA_vert:j_,distanceRGBA_frag:K_,equirect_vert:$_,equirect_frag:J_,linedashed_vert:Q_,linedashed_frag:tg,meshbasic_vert:eg,meshbasic_frag:ng,meshlambert_vert:ig,meshlambert_frag:rg,meshmatcap_vert:sg,meshmatcap_frag:og,meshnormal_vert:ag,meshnormal_frag:lg,meshphong_vert:cg,meshphong_frag:hg,meshphysical_vert:ug,meshphysical_frag:dg,meshtoon_vert:fg,meshtoon_frag:pg,points_vert:mg,points_frag:_g,shadow_vert:gg,shadow_frag:vg,sprite_vert:xg,sprite_frag:yg},Ot={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ae}},envmap:{envMap:{value:null},envMapRotation:{value:new ae},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ae}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ae}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ae},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ae},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ae},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ae}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ae}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ae}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0},uvTransform:{value:new ae}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ae},alphaMap:{value:null},alphaMapTransform:{value:new ae},alphaTest:{value:0}}},Gn={basic:{uniforms:nn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.fog]),vertexShader:oe.meshbasic_vert,fragmentShader:oe.meshbasic_frag},lambert:{uniforms:nn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)}}]),vertexShader:oe.meshlambert_vert,fragmentShader:oe.meshlambert_frag},phong:{uniforms:nn([Ot.common,Ot.specularmap,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:oe.meshphong_vert,fragmentShader:oe.meshphong_frag},standard:{uniforms:nn([Ot.common,Ot.envmap,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.roughnessmap,Ot.metalnessmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag},toon:{uniforms:nn([Ot.common,Ot.aomap,Ot.lightmap,Ot.emissivemap,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.gradientmap,Ot.fog,Ot.lights,{emissive:{value:new ue(0)}}]),vertexShader:oe.meshtoon_vert,fragmentShader:oe.meshtoon_frag},matcap:{uniforms:nn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,Ot.fog,{matcap:{value:null}}]),vertexShader:oe.meshmatcap_vert,fragmentShader:oe.meshmatcap_frag},points:{uniforms:nn([Ot.points,Ot.fog]),vertexShader:oe.points_vert,fragmentShader:oe.points_frag},dashed:{uniforms:nn([Ot.common,Ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:oe.linedashed_vert,fragmentShader:oe.linedashed_frag},depth:{uniforms:nn([Ot.common,Ot.displacementmap]),vertexShader:oe.depth_vert,fragmentShader:oe.depth_frag},normal:{uniforms:nn([Ot.common,Ot.bumpmap,Ot.normalmap,Ot.displacementmap,{opacity:{value:1}}]),vertexShader:oe.meshnormal_vert,fragmentShader:oe.meshnormal_frag},sprite:{uniforms:nn([Ot.sprite,Ot.fog]),vertexShader:oe.sprite_vert,fragmentShader:oe.sprite_frag},background:{uniforms:{uvTransform:{value:new ae},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:oe.background_vert,fragmentShader:oe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ae}},vertexShader:oe.backgroundCube_vert,fragmentShader:oe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:oe.cube_vert,fragmentShader:oe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:oe.equirect_vert,fragmentShader:oe.equirect_frag},distanceRGBA:{uniforms:nn([Ot.common,Ot.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:oe.distanceRGBA_vert,fragmentShader:oe.distanceRGBA_frag},shadow:{uniforms:nn([Ot.lights,Ot.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:oe.shadow_vert,fragmentShader:oe.shadow_frag}};Gn.physical={uniforms:nn([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ae},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ae},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ae},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ae},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ae},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ae},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ae},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ae},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ae},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ae},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ae},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ae}}]),vertexShader:oe.meshphysical_vert,fragmentShader:oe.meshphysical_frag};const ao={r:0,b:0,g:0},Fi=new Zn,Mg=new Ae;function Sg(r,t,e,n,s,o,l){const c=new ue(0);let h=o===!0?0:1,d,f,m=null,v=0,p=null;function M(_,g){let C=!1,b=g.isScene===!0?g.background:null;b&&b.isTexture&&(b=(g.backgroundBlurriness>0?e:t).get(b)),b===null?y(c,h):b&&b.isColor&&(y(b,1),C=!0);const I=r.xr.getEnvironmentBlendMode();I==="additive"?n.buffers.color.setClear(0,0,0,1,l):I==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,l),(r.autoClear||C)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),b&&(b.isCubeTexture||b.mapping===Lo)?(f===void 0&&(f=new sn(new En(1,1,1),new Ei({name:"BackgroundCubeMaterial",uniforms:Nr(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(N,F,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),Fi.copy(g.backgroundRotation),Fi.x*=-1,Fi.y*=-1,Fi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Fi.y*=-1,Fi.z*=-1),f.material.uniforms.envMap.value=b,f.material.uniforms.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(Fi)),f.material.toneMapped=_e.getTransfer(b.colorSpace)!==Me,(m!==b||v!==b.version||p!==r.toneMapping)&&(f.material.needsUpdate=!0,m=b,v=b.version,p=r.toneMapping),f.layers.enableAll(),_.unshift(f,f.geometry,f.material,0,0,null)):b&&b.isTexture&&(d===void 0&&(d=new sn(new Io(2,2),new Ei({name:"BackgroundMaterial",uniforms:Nr(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),Object.defineProperty(d.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(d)),d.material.uniforms.t2D.value=b,d.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,d.material.toneMapped=_e.getTransfer(b.colorSpace)!==Me,b.matrixAutoUpdate===!0&&b.updateMatrix(),d.material.uniforms.uvTransform.value.copy(b.matrix),(m!==b||v!==b.version||p!==r.toneMapping)&&(d.material.needsUpdate=!0,m=b,v=b.version,p=r.toneMapping),d.layers.enableAll(),_.unshift(d,d.geometry,d.material,0,0,null))}function y(_,g){_.getRGB(ao,Mu(r)),n.buffers.color.setClear(ao.r,ao.g,ao.b,g,l)}return{getClearColor:function(){return c},setClearColor:function(_,g=1){c.set(_),h=g,y(c,h)},getClearAlpha:function(){return h},setClearAlpha:function(_){h=_,y(c,h)},render:M}}function bg(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},s=v(null);let o=s,l=!1;function c(P,W,O,B,A){let Z=!1;const at=m(B,O,W);o!==at&&(o=at,d(o.object)),Z=p(P,B,O,A),Z&&M(P,B,O,A),A!==null&&t.update(A,r.ELEMENT_ARRAY_BUFFER),(Z||l)&&(l=!1,I(P,W,O,B),A!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(A).buffer))}function h(){return r.createVertexArray()}function d(P){return r.bindVertexArray(P)}function f(P){return r.deleteVertexArray(P)}function m(P,W,O){const B=O.wireframe===!0;let A=n[P.id];A===void 0&&(A={},n[P.id]=A);let Z=A[W.id];Z===void 0&&(Z={},A[W.id]=Z);let at=Z[B];return at===void 0&&(at=v(h()),Z[B]=at),at}function v(P){const W=[],O=[],B=[];for(let A=0;A<e;A++)W[A]=0,O[A]=0,B[A]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:O,attributeDivisors:B,object:P,attributes:{},index:null}}function p(P,W,O,B){const A=o.attributes,Z=W.attributes;let at=0;const ot=O.getAttributes();for(const Y in ot)if(ot[Y].location>=0){const rt=A[Y];let q=Z[Y];if(q===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(q=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(q=P.instanceColor)),rt===void 0||rt.attribute!==q||q&&rt.data!==q.data)return!0;at++}return o.attributesNum!==at||o.index!==B}function M(P,W,O,B){const A={},Z=W.attributes;let at=0;const ot=O.getAttributes();for(const Y in ot)if(ot[Y].location>=0){let rt=Z[Y];rt===void 0&&(Y==="instanceMatrix"&&P.instanceMatrix&&(rt=P.instanceMatrix),Y==="instanceColor"&&P.instanceColor&&(rt=P.instanceColor));const q={};q.attribute=rt,rt&&rt.data&&(q.data=rt.data),A[Y]=q,at++}o.attributes=A,o.attributesNum=at,o.index=B}function y(){const P=o.newAttributes;for(let W=0,O=P.length;W<O;W++)P[W]=0}function _(P){g(P,0)}function g(P,W){const O=o.newAttributes,B=o.enabledAttributes,A=o.attributeDivisors;O[P]=1,B[P]===0&&(r.enableVertexAttribArray(P),B[P]=1),A[P]!==W&&(r.vertexAttribDivisor(P,W),A[P]=W)}function C(){const P=o.newAttributes,W=o.enabledAttributes;for(let O=0,B=W.length;O<B;O++)W[O]!==P[O]&&(r.disableVertexAttribArray(O),W[O]=0)}function b(P,W,O,B,A,Z,at){at===!0?r.vertexAttribIPointer(P,W,O,A,Z):r.vertexAttribPointer(P,W,O,B,A,Z)}function I(P,W,O,B){y();const A=B.attributes,Z=O.getAttributes(),at=W.defaultAttributeValues;for(const ot in Z){const Y=Z[ot];if(Y.location>=0){let st=A[ot];if(st===void 0&&(ot==="instanceMatrix"&&P.instanceMatrix&&(st=P.instanceMatrix),ot==="instanceColor"&&P.instanceColor&&(st=P.instanceColor)),st!==void 0){const rt=st.normalized,q=st.itemSize,Q=t.get(st);if(Q===void 0)continue;const Ct=Q.buffer,J=Q.type,et=Q.bytesPerElement,Mt=J===r.INT||J===r.UNSIGNED_INT||st.gpuType===iu;if(st.isInterleavedBufferAttribute){const bt=st.data,Pt=bt.stride,It=st.offset;if(bt.isInstancedInterleavedBuffer){for(let zt=0;zt<Y.locationSize;zt++)g(Y.location+zt,bt.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=bt.meshPerAttribute*bt.count)}else for(let zt=0;zt<Y.locationSize;zt++)_(Y.location+zt);r.bindBuffer(r.ARRAY_BUFFER,Ct);for(let zt=0;zt<Y.locationSize;zt++)b(Y.location+zt,q/Y.locationSize,J,rt,Pt*et,(It+q/Y.locationSize*zt)*et,Mt)}else{if(st.isInstancedBufferAttribute){for(let bt=0;bt<Y.locationSize;bt++)g(Y.location+bt,st.meshPerAttribute);P.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let bt=0;bt<Y.locationSize;bt++)_(Y.location+bt);r.bindBuffer(r.ARRAY_BUFFER,Ct);for(let bt=0;bt<Y.locationSize;bt++)b(Y.location+bt,q/Y.locationSize,J,rt,q*et,q/Y.locationSize*bt*et,Mt)}}else if(at!==void 0){const rt=at[ot];if(rt!==void 0)switch(rt.length){case 2:r.vertexAttrib2fv(Y.location,rt);break;case 3:r.vertexAttrib3fv(Y.location,rt);break;case 4:r.vertexAttrib4fv(Y.location,rt);break;default:r.vertexAttrib1fv(Y.location,rt)}}}}C()}function N(){G();for(const P in n){const W=n[P];for(const O in W){const B=W[O];for(const A in B)f(B[A].object),delete B[A];delete W[O]}delete n[P]}}function F(P){if(n[P.id]===void 0)return;const W=n[P.id];for(const O in W){const B=W[O];for(const A in B)f(B[A].object),delete B[A];delete W[O]}delete n[P.id]}function z(P){for(const W in n){const O=n[W];if(O[P.id]===void 0)continue;const B=O[P.id];for(const A in B)f(B[A].object),delete B[A];delete O[P.id]}}function G(){D(),l=!0,o!==s&&(o=s,d(o.object))}function D(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:c,reset:G,resetDefaultState:D,dispose:N,releaseStatesOfGeometry:F,releaseStatesOfProgram:z,initAttributes:y,enableAttribute:_,disableUnusedAttributes:C}}function wg(r,t,e){let n;function s(h){n=h}function o(h,d){r.drawArrays(n,h,d),e.update(d,n,1)}function l(h,d,f){f!==0&&(r.drawArraysInstanced(n,h,d,f),e.update(d,n,f))}function c(h,d,f){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<f;v++)this.render(h[v],d[v]);else{m.multiDrawArraysWEBGL(n,h,0,d,0,f);let v=0;for(let p=0;p<f;p++)v+=d[p];e.update(v,n,1)}}this.setMode=s,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Eg(r,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const c=o(l);c!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",c,"instead."),l=c);const h=e.logarithmicDepthBuffer===!0,d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),v=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),g=f>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:o,precision:l,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:v,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:_,vertexTextures:g,maxSamples:C}}function Tg(r){const t=this;let e=null,n=0,s=!1,o=!1;const l=new vi,c=new ae,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(m,v){const p=m.length!==0||v||n!==0||s;return s=v,n=m.length,p},this.beginShadows=function(){o=!0,f(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(m,v){e=f(m,v,0)},this.setState=function(m,v,p){const M=m.clippingPlanes,y=m.clipIntersection,_=m.clipShadows,g=r.get(m);if(!s||M===null||M.length===0||o&&!_)o?f(null):d();else{const C=o?0:n,b=C*4;let I=g.clippingState||null;h.value=I,I=f(M,v,b,p);for(let N=0;N!==b;++N)I[N]=e[N];g.clippingState=I,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=C}};function d(){h.value!==e&&(h.value=e,h.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function f(m,v,p,M){const y=m!==null?m.length:0;let _=null;if(y!==0){if(_=h.value,M!==!0||_===null){const g=p+y*4,C=v.matrixWorldInverse;c.getNormalMatrix(C),(_===null||_.length<g)&&(_=new Float32Array(g));for(let b=0,I=p;b!==y;++b,I+=4)l.copy(m[b]).applyMatrix4(C,c),l.normal.toArray(_,I),_[I+3]=l.constant}h.value=_,h.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,_}}function Ag(r){let t=new WeakMap;function e(l,c){return c===Ya?l.mapping=Rr:c===ja&&(l.mapping=Ir),l}function n(l){if(l&&l.isTexture){const c=l.mapping;if(c===Ya||c===ja)if(t.has(l)){const h=t.get(l).texture;return e(h,l.mapping)}else{const h=l.image;if(h&&h.height>0){const d=new zp(h.height);return d.fromEquirectangularTexture(r,l),t.set(l,d),l.addEventListener("dispose",s),e(d.texture,l.mapping)}else return null}}return l}function s(l){const c=l.target;c.removeEventListener("dispose",s);const h=t.get(c);h!==void 0&&(t.delete(c),h.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Eu extends Su{constructor(t=-1,e=1,n=1,s=-1,o=.1,l=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=l,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,l){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=l,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,l=n+t,c=s+e,h=s-e;if(this.view!==null&&this.view.enabled){const d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=d*this.view.offsetX,l=o+d*this.view.width,c-=f*this.view.offsetY,h=c-f*this.view.height}this.projectionMatrix.makeOrthographic(o,l,c,h,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Er=4,lh=[.125,.215,.35,.446,.526,.582],Gi=20,Pa=new Eu,ch=new ue;let La=null,Ra=0,Ia=0,Da=!1;const Bi=(1+Math.sqrt(5))/2,Sr=1/Bi,hh=[new nt(1,1,1),new nt(-1,1,1),new nt(1,1,-1),new nt(-1,1,-1),new nt(0,Bi,Sr),new nt(0,Bi,-Sr),new nt(Sr,0,Bi),new nt(-Sr,0,Bi),new nt(Bi,Sr,0),new nt(-Bi,Sr,0)];class uh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){La=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ph(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=fh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(La,Ra,Ia),this._renderer.xr.enabled=Da,t.scissorTest=!1,lo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Rr||t.mapping===Ir?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),La=this._renderer.getRenderTarget(),Ra=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:On,minFilter:On,generateMipmaps:!1,type:So,format:Wn,colorSpace:Ti,depthBuffer:!1},s=dh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=dh(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Cg(o)),this._blurMaterial=Pg(o,t,e)}return s}_compileMaterial(t){const e=new sn(this._lodPlanes[0],t);this._renderer.compile(e,Pa)}_sceneToCubeUV(t,e,n,s){const c=new Tn(90,1,e,n),h=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,m=f.autoClear,v=f.toneMapping;f.getClearColor(ch),f.toneMapping=Si,f.autoClear=!1;const p=new vu({name:"PMREM.Background",side:un,depthWrite:!1,depthTest:!1}),M=new sn(new En,p);let y=!1;const _=t.background;_?_.isColor&&(p.color.copy(_),t.background=null,y=!0):(p.color.copy(ch),y=!0);for(let g=0;g<6;g++){const C=g%3;C===0?(c.up.set(0,h[g],0),c.lookAt(d[g],0,0)):C===1?(c.up.set(0,0,h[g]),c.lookAt(0,d[g],0)):(c.up.set(0,h[g],0),c.lookAt(0,0,d[g]));const b=this._cubeSize;lo(s,C*b,g>2?b:0,b,b),f.setRenderTarget(s),y&&f.render(M,c),f.render(t,c)}M.geometry.dispose(),M.material.dispose(),f.toneMapping=v,f.autoClear=m,t.background=_}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Rr||t.mapping===Ir;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ph()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=fh());const o=s?this._cubemapMaterial:this._equirectMaterial,l=new sn(this._lodPlanes[0],o),c=o.uniforms;c.envMap.value=t;const h=this._cubeSize;lo(e,0,0,3*h,2*h),n.setRenderTarget(e),n.render(l,Pa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),l=hh[(s-1)%hh.length];this._blur(t,s-1,s,o,l)}e.autoClear=n}_blur(t,e,n,s,o){const l=this._pingPongRenderTarget;this._halfBlur(t,l,e,n,s,"latitudinal",o),this._halfBlur(l,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,l,c){const h=this._renderer,d=this._blurMaterial;l!=="latitudinal"&&l!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,m=new sn(this._lodPlanes[s],d),v=d.uniforms,p=this._sizeLods[n]-1,M=isFinite(o)?Math.PI/(2*p):2*Math.PI/(2*Gi-1),y=o/M,_=isFinite(o)?1+Math.floor(f*y):Gi;_>Gi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Gi}`);const g=[];let C=0;for(let z=0;z<Gi;++z){const G=z/y,D=Math.exp(-G*G/2);g.push(D),z===0?C+=D:z<_&&(C+=2*D)}for(let z=0;z<g.length;z++)g[z]=g[z]/C;v.envMap.value=t.texture,v.samples.value=_,v.weights.value=g,v.latitudinal.value=l==="latitudinal",c&&(v.poleAxis.value=c);const{_lodMax:b}=this;v.dTheta.value=M,v.mipInt.value=b-n;const I=this._sizeLods[s],N=3*I*(s>b-Er?s-b+Er:0),F=4*(this._cubeSize-I);lo(e,N,F,3*I,2*I),h.setRenderTarget(e),h.render(m,Pa)}}function Cg(r){const t=[],e=[],n=[];let s=r;const o=r-Er+1+lh.length;for(let l=0;l<o;l++){const c=Math.pow(2,s);e.push(c);let h=1/c;l>r-Er?h=lh[l-r+Er-1]:l===0&&(h=0),n.push(h);const d=1/(c-2),f=-d,m=1+d,v=[f,f,m,f,m,m,f,f,m,m,f,m],p=6,M=6,y=3,_=2,g=1,C=new Float32Array(y*M*p),b=new Float32Array(_*M*p),I=new Float32Array(g*M*p);for(let F=0;F<p;F++){const z=F%3*2/3-1,G=F>2?0:-1,D=[z,G,0,z+2/3,G,0,z+2/3,G+1,0,z,G,0,z+2/3,G+1,0,z,G+1,0];C.set(D,y*M*F),b.set(v,_*M*F);const P=[F,F,F,F,F,F];I.set(P,g*M*F)}const N=new on;N.setAttribute("position",new xn(C,y)),N.setAttribute("uv",new xn(b,_)),N.setAttribute("faceIndex",new xn(I,g)),t.push(N),s>Er&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function dh(r,t,e){const n=new Yi(r,t,e);return n.texture.mapping=Lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function lo(r,t,e,n,s){r.viewport.set(t,e,n,s),r.scissor.set(t,e,n,s)}function Pg(r,t,e){const n=new Float32Array(Gi),s=new nt(0,1,0);return new Ei({name:"SphericalGaussianBlur",defines:{n:Gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function fh(){return new Ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ph(){return new Ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function cl(){return`

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
	`}function Lg(r){let t=new WeakMap,e=null;function n(c){if(c&&c.isTexture){const h=c.mapping,d=h===Ya||h===ja,f=h===Rr||h===Ir;if(d||f){let m=t.get(c);const v=m!==void 0?m.texture.pmremVersion:0;if(c.isRenderTargetTexture&&c.pmremVersion!==v)return e===null&&(e=new uh(r)),m=d?e.fromEquirectangular(c,m):e.fromCubemap(c,m),m.texture.pmremVersion=c.pmremVersion,t.set(c,m),m.texture;if(m!==void 0)return m.texture;{const p=c.image;return d&&p&&p.height>0||f&&p&&s(p)?(e===null&&(e=new uh(r)),m=d?e.fromEquirectangular(c):e.fromCubemap(c),m.texture.pmremVersion=c.pmremVersion,t.set(c,m),c.addEventListener("dispose",o),m.texture):null}}}return c}function s(c){let h=0;const d=6;for(let f=0;f<d;f++)c[f]!==void 0&&h++;return h===d}function o(c){const h=c.target;h.removeEventListener("dispose",o);const d=t.get(h);d!==void 0&&(t.delete(h),d.dispose())}function l(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:l}}function Rg(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=r.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Ig(r,t,e,n){const s={},o=new WeakMap;function l(m){const v=m.target;v.index!==null&&t.remove(v.index);for(const M in v.attributes)t.remove(v.attributes[M]);for(const M in v.morphAttributes){const y=v.morphAttributes[M];for(let _=0,g=y.length;_<g;_++)t.remove(y[_])}v.removeEventListener("dispose",l),delete s[v.id];const p=o.get(v);p&&(t.remove(p),o.delete(v)),n.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,e.memory.geometries--}function c(m,v){return s[v.id]===!0||(v.addEventListener("dispose",l),s[v.id]=!0,e.memory.geometries++),v}function h(m){const v=m.attributes;for(const M in v)t.update(v[M],r.ARRAY_BUFFER);const p=m.morphAttributes;for(const M in p){const y=p[M];for(let _=0,g=y.length;_<g;_++)t.update(y[_],r.ARRAY_BUFFER)}}function d(m){const v=[],p=m.index,M=m.attributes.position;let y=0;if(p!==null){const C=p.array;y=p.version;for(let b=0,I=C.length;b<I;b+=3){const N=C[b+0],F=C[b+1],z=C[b+2];v.push(N,F,F,z,z,N)}}else if(M!==void 0){const C=M.array;y=M.version;for(let b=0,I=C.length/3-1;b<I;b+=3){const N=b+0,F=b+1,z=b+2;v.push(N,F,F,z,z,N)}}else return;const _=new(du(v)?yu:xu)(v,1);_.version=y;const g=o.get(m);g&&t.remove(g),o.set(m,_)}function f(m){const v=o.get(m);if(v){const p=m.index;p!==null&&v.version<p.version&&d(m)}else d(m);return o.get(m)}return{get:c,update:h,getWireframeAttribute:f}}function Dg(r,t,e){let n;function s(m){n=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function h(m,v){r.drawElements(n,v,o,m*l),e.update(v,n,1)}function d(m,v,p){p!==0&&(r.drawElementsInstanced(n,v,o,m*l,p),e.update(v,n,p))}function f(m,v,p){if(p===0)return;const M=t.get("WEBGL_multi_draw");if(M===null)for(let y=0;y<p;y++)this.render(m[y]/l,v[y]);else{M.multiDrawElementsWEBGL(n,v,0,o,m,0,p);let y=0;for(let _=0;_<p;_++)y+=v[_];e.update(y,n,1)}}this.setMode=s,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=f}function Ng(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,l,c){switch(e.calls++,l){case r.TRIANGLES:e.triangles+=c*(o/3);break;case r.LINES:e.lines+=c*(o/2);break;case r.LINE_STRIP:e.lines+=c*(o-1);break;case r.LINE_LOOP:e.lines+=c*o;break;case r.POINTS:e.points+=c*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",l);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Og(r,t,e){const n=new WeakMap,s=new Ve;function o(l,c,h){const d=l.morphTargetInfluences,f=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,m=f!==void 0?f.length:0;let v=n.get(c);if(v===void 0||v.count!==m){let D=function(){z.dispose(),n.delete(c),c.removeEventListener("dispose",D)};v!==void 0&&v.texture.dispose();const p=c.morphAttributes.position!==void 0,M=c.morphAttributes.normal!==void 0,y=c.morphAttributes.color!==void 0,_=c.morphAttributes.position||[],g=c.morphAttributes.normal||[],C=c.morphAttributes.color||[];let b=0;p===!0&&(b=1),M===!0&&(b=2),y===!0&&(b=3);let I=c.attributes.position.count*b,N=1;I>t.maxTextureSize&&(N=Math.ceil(I/t.maxTextureSize),I=t.maxTextureSize);const F=new Float32Array(I*N*4*m),z=new pu(F,I,N,m);z.type=yi,z.needsUpdate=!0;const G=b*4;for(let P=0;P<m;P++){const W=_[P],O=g[P],B=C[P],A=I*N*4*P;for(let Z=0;Z<W.count;Z++){const at=Z*G;p===!0&&(s.fromBufferAttribute(W,Z),F[A+at+0]=s.x,F[A+at+1]=s.y,F[A+at+2]=s.z,F[A+at+3]=0),M===!0&&(s.fromBufferAttribute(O,Z),F[A+at+4]=s.x,F[A+at+5]=s.y,F[A+at+6]=s.z,F[A+at+7]=0),y===!0&&(s.fromBufferAttribute(B,Z),F[A+at+8]=s.x,F[A+at+9]=s.y,F[A+at+10]=s.z,F[A+at+11]=B.itemSize===4?s.w:1)}}v={count:m,texture:z,size:new yt(I,N)},n.set(c,v),c.addEventListener("dispose",D)}if(l.isInstancedMesh===!0&&l.morphTexture!==null)h.getUniforms().setValue(r,"morphTexture",l.morphTexture,e);else{let p=0;for(let y=0;y<d.length;y++)p+=d[y];const M=c.morphTargetsRelative?1:1-p;h.getUniforms().setValue(r,"morphTargetBaseInfluence",M),h.getUniforms().setValue(r,"morphTargetInfluences",d)}h.getUniforms().setValue(r,"morphTargetsTexture",v.texture,e),h.getUniforms().setValue(r,"morphTargetsTextureSize",v.size)}return{update:o}}function Ug(r,t,e,n){let s=new WeakMap;function o(h){const d=n.render.frame,f=h.geometry,m=t.get(h,f);if(s.get(m)!==d&&(t.update(m),s.set(m,d)),h.isInstancedMesh&&(h.hasEventListener("dispose",c)===!1&&h.addEventListener("dispose",c),s.get(h)!==d&&(e.update(h.instanceMatrix,r.ARRAY_BUFFER),h.instanceColor!==null&&e.update(h.instanceColor,r.ARRAY_BUFFER),s.set(h,d))),h.isSkinnedMesh){const v=h.skeleton;s.get(v)!==d&&(v.update(),s.set(v,d))}return m}function l(){s=new WeakMap}function c(h){const d=h.target;d.removeEventListener("dispose",c),e.remove(d.instanceMatrix),d.instanceColor!==null&&e.remove(d.instanceColor)}return{update:o,dispose:l}}class Tu extends dn{constructor(t,e,n,s,o,l,c,h,d,f){if(f=f!==void 0?f:Cr,f!==Cr&&f!==fs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&f===Cr&&(n=Dr),n===void 0&&f===fs&&(n=xs),super(null,s,o,l,c,h,f,n,d),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=c!==void 0?c:An,this.minFilter=h!==void 0?h:An,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Au=new dn,Cu=new Tu(1,1);Cu.compareFunction=uu;const Pu=new pu,Lu=new Mp,Ru=new bu,mh=[],_h=[],gh=new Float32Array(16),vh=new Float32Array(9),xh=new Float32Array(4);function Ur(r,t,e){const n=r[0];if(n<=0||n>0)return r;const s=t*e;let o=mh[s];if(o===void 0&&(o=new Float32Array(s),mh[s]=o),t!==0){n.toArray(o,0);for(let l=1,c=0;l!==t;++l)c+=e,r[l].toArray(o,c)}return o}function Ue(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function ze(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Do(r,t){let e=_h[t];e===void 0&&(e=new Int32Array(t),_h[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function zg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Fg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;r.uniform2fv(this.addr,t),ze(e,t)}}function kg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;r.uniform3fv(this.addr,t),ze(e,t)}}function Bg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;r.uniform4fv(this.addr,t),ze(e,t)}}function Hg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Ue(e,n))return;xh.set(n),r.uniformMatrix2fv(this.addr,!1,xh),ze(e,n)}}function Gg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Ue(e,n))return;vh.set(n),r.uniformMatrix3fv(this.addr,!1,vh),ze(e,n)}}function Vg(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Ue(e,n))return;gh.set(n),r.uniformMatrix4fv(this.addr,!1,gh),ze(e,n)}}function Wg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Zg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;r.uniform2iv(this.addr,t),ze(e,t)}}function Xg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;r.uniform3iv(this.addr,t),ze(e,t)}}function qg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;r.uniform4iv(this.addr,t),ze(e,t)}}function Yg(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function jg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;r.uniform2uiv(this.addr,t),ze(e,t)}}function Kg(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;r.uniform3uiv(this.addr,t),ze(e,t)}}function $g(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;r.uniform4uiv(this.addr,t),ze(e,t)}}function Jg(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s);const o=this.type===r.SAMPLER_2D_SHADOW?Cu:Au;e.setTexture2D(t||o,s)}function Qg(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Lu,s)}function tv(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Ru,s)}function ev(r,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(r.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Pu,s)}function nv(r){switch(r){case 5126:return zg;case 35664:return Fg;case 35665:return kg;case 35666:return Bg;case 35674:return Hg;case 35675:return Gg;case 35676:return Vg;case 5124:case 35670:return Wg;case 35667:case 35671:return Zg;case 35668:case 35672:return Xg;case 35669:case 35673:return qg;case 5125:return Yg;case 36294:return jg;case 36295:return Kg;case 36296:return $g;case 35678:case 36198:case 36298:case 36306:case 35682:return Jg;case 35679:case 36299:case 36307:return Qg;case 35680:case 36300:case 36308:case 36293:return tv;case 36289:case 36303:case 36311:case 36292:return ev}}function iv(r,t){r.uniform1fv(this.addr,t)}function rv(r,t){const e=Ur(t,this.size,2);r.uniform2fv(this.addr,e)}function sv(r,t){const e=Ur(t,this.size,3);r.uniform3fv(this.addr,e)}function ov(r,t){const e=Ur(t,this.size,4);r.uniform4fv(this.addr,e)}function av(r,t){const e=Ur(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function lv(r,t){const e=Ur(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function cv(r,t){const e=Ur(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function hv(r,t){r.uniform1iv(this.addr,t)}function uv(r,t){r.uniform2iv(this.addr,t)}function dv(r,t){r.uniform3iv(this.addr,t)}function fv(r,t){r.uniform4iv(this.addr,t)}function pv(r,t){r.uniform1uiv(this.addr,t)}function mv(r,t){r.uniform2uiv(this.addr,t)}function _v(r,t){r.uniform3uiv(this.addr,t)}function gv(r,t){r.uniform4uiv(this.addr,t)}function vv(r,t,e){const n=this.cache,s=t.length,o=Do(e,s);Ue(n,o)||(r.uniform1iv(this.addr,o),ze(n,o));for(let l=0;l!==s;++l)e.setTexture2D(t[l]||Au,o[l])}function xv(r,t,e){const n=this.cache,s=t.length,o=Do(e,s);Ue(n,o)||(r.uniform1iv(this.addr,o),ze(n,o));for(let l=0;l!==s;++l)e.setTexture3D(t[l]||Lu,o[l])}function yv(r,t,e){const n=this.cache,s=t.length,o=Do(e,s);Ue(n,o)||(r.uniform1iv(this.addr,o),ze(n,o));for(let l=0;l!==s;++l)e.setTextureCube(t[l]||Ru,o[l])}function Mv(r,t,e){const n=this.cache,s=t.length,o=Do(e,s);Ue(n,o)||(r.uniform1iv(this.addr,o),ze(n,o));for(let l=0;l!==s;++l)e.setTexture2DArray(t[l]||Pu,o[l])}function Sv(r){switch(r){case 5126:return iv;case 35664:return rv;case 35665:return sv;case 35666:return ov;case 35674:return av;case 35675:return lv;case 35676:return cv;case 5124:case 35670:return hv;case 35667:case 35671:return uv;case 35668:case 35672:return dv;case 35669:case 35673:return fv;case 5125:return pv;case 36294:return mv;case 36295:return _v;case 36296:return gv;case 35678:case 36198:case 36298:case 36306:case 35682:return vv;case 35679:case 36299:case 36307:return xv;case 35680:case 36300:case 36308:case 36293:return yv;case 36289:case 36303:case 36311:case 36292:return Mv}}class bv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=nv(e.type)}}class wv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Sv(e.type)}}class Ev{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,l=s.length;o!==l;++o){const c=s[o];c.setValue(t,e[c.id],n)}}}const Na=/(\w+)(\])?(\[|\.)?/g;function yh(r,t){r.seq.push(t),r.map[t.id]=t}function Tv(r,t,e){const n=r.name,s=n.length;for(Na.lastIndex=0;;){const o=Na.exec(n),l=Na.lastIndex;let c=o[1];const h=o[2]==="]",d=o[3];if(h&&(c=c|0),d===void 0||d==="["&&l+2===s){yh(e,d===void 0?new bv(c,r,t):new wv(c,r,t));break}else{let m=e.map[c];m===void 0&&(m=new Ev(c),yh(e,m)),e=m}}}class vo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),l=t.getUniformLocation(e,o.name);Tv(o,l,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,l=e.length;o!==l;++o){const c=e[o],h=n[c.id];h.needsUpdate!==!1&&c.setValue(t,h.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const l=t[s];l.id in e&&n.push(l)}return n}}function Mh(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const Av=37297;let Cv=0;function Pv(r,t){const e=r.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let l=s;l<o;l++){const c=l+1;n.push(`${c===t?">":" "} ${c}: ${e[l]}`)}return n.join(`
`)}function Lv(r){const t=_e.getPrimaries(_e.workingColorSpace),e=_e.getPrimaries(r);let n;switch(t===e?n="":t===Eo&&e===wo?n="LinearDisplayP3ToLinearSRGB":t===wo&&e===Eo&&(n="LinearSRGBToLinearDisplayP3"),r){case Ti:case Ro:return[n,"LinearTransferOETF"];case Hn:case ol:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Sh(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),s=r.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const l=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Pv(r.getShaderSource(t),l)}else return s}function Rv(r,t){const e=Lv(t);return`vec4 ${r}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Iv(r,t){let e;switch(t){case tu:e="Linear";break;case kf:e="Reinhard";break;case Bf:e="OptimizedCineon";break;case Hf:e="ACESFilmic";break;case Vf:e="AgX";break;case Wf:e="Neutral";break;case Gf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Dv(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function Nv(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ov(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=r.getActiveAttrib(t,s),l=o.name;let c=1;o.type===r.FLOAT_MAT2&&(c=2),o.type===r.FLOAT_MAT3&&(c=3),o.type===r.FLOAT_MAT4&&(c=4),e[l]={type:o.type,location:r.getAttribLocation(t,l),locationSize:c}}return e}function os(r){return r!==""}function bh(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Uv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(r){return r.replace(Uv,Fv)}const zv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Fv(r,t){let e=oe[t];if(e===void 0){const n=zv.get(t);if(n!==void 0)e=oe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Qa(e)}const kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Eh(r){return r.replace(kv,Bv)}function Bv(r,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function Th(r){let t=`precision ${r.precision} float;
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
#define LOW_PRECISION`),t}function Hv(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Jh?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===uf?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===ri&&(t="SHADOWMAP_TYPE_VSM"),t}function Gv(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Rr:case Ir:t="ENVMAP_TYPE_CUBE";break;case Lo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Vv(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Ir:t="ENVMAP_MODE_REFRACTION";break}return t}function Wv(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Qh:t="ENVMAP_BLENDING_MULTIPLY";break;case zf:t="ENVMAP_BLENDING_MIX";break;case Ff:t="ENVMAP_BLENDING_ADD";break}return t}function Zv(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Xv(r,t,e,n){const s=r.getContext(),o=e.defines;let l=e.vertexShader,c=e.fragmentShader;const h=Hv(e),d=Gv(e),f=Vv(e),m=Wv(e),v=Zv(e),p=Dv(e),M=Nv(o),y=s.createProgram();let _,g,C=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(_=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(os).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M].filter(os).join(`
`),g.length>0&&(g+=`
`)):(_=[Th(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+f:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),g=[Th(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,M,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+d:"",e.envMap?"#define "+f:"",e.envMap?"#define "+m:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+h:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Si?"#define TONE_MAPPING":"",e.toneMapping!==Si?oe.tonemapping_pars_fragment:"",e.toneMapping!==Si?Iv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",oe.colorspace_pars_fragment,Rv("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),l=Qa(l),l=bh(l,e),l=wh(l,e),c=Qa(c),c=bh(c,e),c=wh(c,e),l=Eh(l),c=Eh(c),e.isRawShaderMaterial!==!0&&(C=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",e.glslVersion===Gc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Gc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const b=C+_+l,I=C+g+c,N=Mh(s,s.VERTEX_SHADER,b),F=Mh(s,s.FRAGMENT_SHADER,I);s.attachShader(y,N),s.attachShader(y,F),e.index0AttributeName!==void 0?s.bindAttribLocation(y,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(y,0,"position"),s.linkProgram(y);function z(W){if(r.debug.checkShaderErrors){const O=s.getProgramInfoLog(y).trim(),B=s.getShaderInfoLog(N).trim(),A=s.getShaderInfoLog(F).trim();let Z=!0,at=!0;if(s.getProgramParameter(y,s.LINK_STATUS)===!1)if(Z=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(s,y,N,F);else{const ot=Sh(s,N,"vertex"),Y=Sh(s,F,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(y,s.VALIDATE_STATUS)+`

Material Name: `+W.name+`
Material Type: `+W.type+`

Program Info Log: `+O+`
`+ot+`
`+Y)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(B===""||A==="")&&(at=!1);at&&(W.diagnostics={runnable:Z,programLog:O,vertexShader:{log:B,prefix:_},fragmentShader:{log:A,prefix:g}})}s.deleteShader(N),s.deleteShader(F),G=new vo(s,y),D=Ov(s,y)}let G;this.getUniforms=function(){return G===void 0&&z(this),G};let D;this.getAttributes=function(){return D===void 0&&z(this),D};let P=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(y,Av)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(y),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Cv++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=N,this.fragmentShader=F,this}let qv=0;class Yv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),l=this._getShaderCacheForMaterial(t);return l.has(s)===!1&&(l.add(s),s.usedTimes++),l.has(o)===!1&&(l.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new jv(t),e.set(t,n)),n}}class jv{constructor(t){this.id=qv++,this.code=t,this.usedTimes=0}}function Kv(r,t,e,n,s,o,l){const c=new _u,h=new Yv,d=new Set,f=[],m=s.logarithmicDepthBuffer,v=s.vertexTextures;let p=s.precision;const M={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(D){return d.add(D),D===0?"uv":`uv${D}`}function _(D,P,W,O,B){const A=O.fog,Z=B.geometry,at=D.isMeshStandardMaterial?O.environment:null,ot=(D.isMeshStandardMaterial?e:t).get(D.envMap||at),Y=ot&&ot.mapping===Lo?ot.image.height:null,st=M[D.type];D.precision!==null&&(p=s.getMaxPrecision(D.precision),p!==D.precision&&console.warn("THREE.WebGLProgram.getParameters:",D.precision,"not supported, using",p,"instead."));const rt=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,q=rt!==void 0?rt.length:0;let Q=0;Z.morphAttributes.position!==void 0&&(Q=1),Z.morphAttributes.normal!==void 0&&(Q=2),Z.morphAttributes.color!==void 0&&(Q=3);let Ct,J,et,Mt;if(st){const Re=Gn[st];Ct=Re.vertexShader,J=Re.fragmentShader}else Ct=D.vertexShader,J=D.fragmentShader,h.update(D),et=h.getVertexShaderID(D),Mt=h.getFragmentShaderID(D);const bt=r.getRenderTarget(),Pt=B.isInstancedMesh===!0,It=B.isBatchedMesh===!0,zt=!!D.map,it=!!D.matcap,vt=!!ot,xt=!!D.aoMap,w=!!D.lightMap,tt=!!D.bumpMap,K=!!D.normalMap,T=!!D.displacementMap,S=!!D.emissiveMap,k=!!D.metalnessMap,X=!!D.roughnessMap,$=D.anisotropy>0,V=D.clearcoat>0,ft=D.iridescence>0,lt=D.sheen>0,pt=D.transmission>0,Et=$&&!!D.anisotropyMap,wt=V&&!!D.clearcoatMap,Tt=V&&!!D.clearcoatNormalMap,Ht=V&&!!D.clearcoatRoughnessMap,Ft=ft&&!!D.iridescenceMap,Dt=ft&&!!D.iridescenceThicknessMap,Kt=lt&&!!D.sheenColorMap,Gt=lt&&!!D.sheenRoughnessMap,re=!!D.specularMap,se=!!D.specularColorMap,Jt=!!D.specularIntensityMap,Bt=pt&&!!D.transmissionMap,R=pt&&!!D.thicknessMap,ut=!!D.gradientMap,St=!!D.alphaMap,Rt=D.alphaTest>0,Nt=!!D.alphaHash,ne=!!D.extensions;let ce=Si;D.toneMapped&&(bt===null||bt.isXRRenderTarget===!0)&&(ce=r.toneMapping);const ge={shaderID:st,shaderType:D.type,shaderName:D.name,vertexShader:Ct,fragmentShader:J,defines:D.defines,customVertexShaderID:et,customFragmentShaderID:Mt,isRawShaderMaterial:D.isRawShaderMaterial===!0,glslVersion:D.glslVersion,precision:p,batching:It,instancing:Pt,instancingColor:Pt&&B.instanceColor!==null,instancingMorph:Pt&&B.morphTexture!==null,supportsVertexTextures:v,outputColorSpace:bt===null?r.outputColorSpace:bt.isXRRenderTarget===!0?bt.texture.colorSpace:Ti,alphaToCoverage:!!D.alphaToCoverage,map:zt,matcap:it,envMap:vt,envMapMode:vt&&ot.mapping,envMapCubeUVHeight:Y,aoMap:xt,lightMap:w,bumpMap:tt,normalMap:K,displacementMap:v&&T,emissiveMap:S,normalMapObjectSpace:K&&D.normalMapType===rp,normalMapTangentSpace:K&&D.normalMapType===hu,metalnessMap:k,roughnessMap:X,anisotropy:$,anisotropyMap:Et,clearcoat:V,clearcoatMap:wt,clearcoatNormalMap:Tt,clearcoatRoughnessMap:Ht,iridescence:ft,iridescenceMap:Ft,iridescenceThicknessMap:Dt,sheen:lt,sheenColorMap:Kt,sheenRoughnessMap:Gt,specularMap:re,specularColorMap:se,specularIntensityMap:Jt,transmission:pt,transmissionMap:Bt,thicknessMap:R,gradientMap:ut,opaque:D.transparent===!1&&D.blending===Ar&&D.alphaToCoverage===!1,alphaMap:St,alphaTest:Rt,alphaHash:Nt,combine:D.combine,mapUv:zt&&y(D.map.channel),aoMapUv:xt&&y(D.aoMap.channel),lightMapUv:w&&y(D.lightMap.channel),bumpMapUv:tt&&y(D.bumpMap.channel),normalMapUv:K&&y(D.normalMap.channel),displacementMapUv:T&&y(D.displacementMap.channel),emissiveMapUv:S&&y(D.emissiveMap.channel),metalnessMapUv:k&&y(D.metalnessMap.channel),roughnessMapUv:X&&y(D.roughnessMap.channel),anisotropyMapUv:Et&&y(D.anisotropyMap.channel),clearcoatMapUv:wt&&y(D.clearcoatMap.channel),clearcoatNormalMapUv:Tt&&y(D.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&y(D.clearcoatRoughnessMap.channel),iridescenceMapUv:Ft&&y(D.iridescenceMap.channel),iridescenceThicknessMapUv:Dt&&y(D.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(D.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&y(D.sheenRoughnessMap.channel),specularMapUv:re&&y(D.specularMap.channel),specularColorMapUv:se&&y(D.specularColorMap.channel),specularIntensityMapUv:Jt&&y(D.specularIntensityMap.channel),transmissionMapUv:Bt&&y(D.transmissionMap.channel),thicknessMapUv:R&&y(D.thicknessMap.channel),alphaMapUv:St&&y(D.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(K||$),vertexColors:D.vertexColors,vertexAlphas:D.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(zt||St),fog:!!A,useFog:D.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:D.flatShading===!0,sizeAttenuation:D.sizeAttenuation===!0,logarithmicDepthBuffer:m,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:q,morphTextureStride:Q,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numClippingPlanes:l.numPlanes,numClipIntersection:l.numIntersection,dithering:D.dithering,shadowMapEnabled:r.shadowMap.enabled&&W.length>0,shadowMapType:r.shadowMap.type,toneMapping:ce,useLegacyLights:r._useLegacyLights,decodeVideoTexture:zt&&D.map.isVideoTexture===!0&&_e.getTransfer(D.map.colorSpace)===Me,premultipliedAlpha:D.premultipliedAlpha,doubleSided:D.side===_n,flipSided:D.side===un,useDepthPacking:D.depthPacking>=0,depthPacking:D.depthPacking||0,index0AttributeName:D.index0AttributeName,extensionClipCullDistance:ne&&D.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:ne&&D.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:D.customProgramCacheKey()};return ge.vertexUv1s=d.has(1),ge.vertexUv2s=d.has(2),ge.vertexUv3s=d.has(3),d.clear(),ge}function g(D){const P=[];if(D.shaderID?P.push(D.shaderID):(P.push(D.customVertexShaderID),P.push(D.customFragmentShaderID)),D.defines!==void 0)for(const W in D.defines)P.push(W),P.push(D.defines[W]);return D.isRawShaderMaterial===!1&&(C(P,D),b(P,D),P.push(r.outputColorSpace)),P.push(D.customProgramCacheKey),P.join()}function C(D,P){D.push(P.precision),D.push(P.outputColorSpace),D.push(P.envMapMode),D.push(P.envMapCubeUVHeight),D.push(P.mapUv),D.push(P.alphaMapUv),D.push(P.lightMapUv),D.push(P.aoMapUv),D.push(P.bumpMapUv),D.push(P.normalMapUv),D.push(P.displacementMapUv),D.push(P.emissiveMapUv),D.push(P.metalnessMapUv),D.push(P.roughnessMapUv),D.push(P.anisotropyMapUv),D.push(P.clearcoatMapUv),D.push(P.clearcoatNormalMapUv),D.push(P.clearcoatRoughnessMapUv),D.push(P.iridescenceMapUv),D.push(P.iridescenceThicknessMapUv),D.push(P.sheenColorMapUv),D.push(P.sheenRoughnessMapUv),D.push(P.specularMapUv),D.push(P.specularColorMapUv),D.push(P.specularIntensityMapUv),D.push(P.transmissionMapUv),D.push(P.thicknessMapUv),D.push(P.combine),D.push(P.fogExp2),D.push(P.sizeAttenuation),D.push(P.morphTargetsCount),D.push(P.morphAttributeCount),D.push(P.numDirLights),D.push(P.numPointLights),D.push(P.numSpotLights),D.push(P.numSpotLightMaps),D.push(P.numHemiLights),D.push(P.numRectAreaLights),D.push(P.numDirLightShadows),D.push(P.numPointLightShadows),D.push(P.numSpotLightShadows),D.push(P.numSpotLightShadowsWithMaps),D.push(P.numLightProbes),D.push(P.shadowMapType),D.push(P.toneMapping),D.push(P.numClippingPlanes),D.push(P.numClipIntersection),D.push(P.depthPacking)}function b(D,P){c.disableAll(),P.supportsVertexTextures&&c.enable(0),P.instancing&&c.enable(1),P.instancingColor&&c.enable(2),P.instancingMorph&&c.enable(3),P.matcap&&c.enable(4),P.envMap&&c.enable(5),P.normalMapObjectSpace&&c.enable(6),P.normalMapTangentSpace&&c.enable(7),P.clearcoat&&c.enable(8),P.iridescence&&c.enable(9),P.alphaTest&&c.enable(10),P.vertexColors&&c.enable(11),P.vertexAlphas&&c.enable(12),P.vertexUv1s&&c.enable(13),P.vertexUv2s&&c.enable(14),P.vertexUv3s&&c.enable(15),P.vertexTangents&&c.enable(16),P.anisotropy&&c.enable(17),P.alphaHash&&c.enable(18),P.batching&&c.enable(19),D.push(c.mask),c.disableAll(),P.fog&&c.enable(0),P.useFog&&c.enable(1),P.flatShading&&c.enable(2),P.logarithmicDepthBuffer&&c.enable(3),P.skinning&&c.enable(4),P.morphTargets&&c.enable(5),P.morphNormals&&c.enable(6),P.morphColors&&c.enable(7),P.premultipliedAlpha&&c.enable(8),P.shadowMapEnabled&&c.enable(9),P.useLegacyLights&&c.enable(10),P.doubleSided&&c.enable(11),P.flipSided&&c.enable(12),P.useDepthPacking&&c.enable(13),P.dithering&&c.enable(14),P.transmission&&c.enable(15),P.sheen&&c.enable(16),P.opaque&&c.enable(17),P.pointsUvs&&c.enable(18),P.decodeVideoTexture&&c.enable(19),P.alphaToCoverage&&c.enable(20),D.push(c.mask)}function I(D){const P=M[D.type];let W;if(P){const O=Gn[P];W=Dp.clone(O.uniforms)}else W=D.uniforms;return W}function N(D,P){let W;for(let O=0,B=f.length;O<B;O++){const A=f[O];if(A.cacheKey===P){W=A,++W.usedTimes;break}}return W===void 0&&(W=new Xv(r,P,D,o),f.push(W)),W}function F(D){if(--D.usedTimes===0){const P=f.indexOf(D);f[P]=f[f.length-1],f.pop(),D.destroy()}}function z(D){h.remove(D)}function G(){h.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:I,acquireProgram:N,releaseProgram:F,releaseShaderCache:z,programs:f,dispose:G}}function $v(){let r=new WeakMap;function t(o){let l=r.get(o);return l===void 0&&(l={},r.set(o,l)),l}function e(o){r.delete(o)}function n(o,l,c){r.get(o)[l]=c}function s(){r=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function Jv(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Ah(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Ch(){const r=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function l(m,v,p,M,y,_){let g=r[t];return g===void 0?(g={id:m.id,object:m,geometry:v,material:p,groupOrder:M,renderOrder:m.renderOrder,z:y,group:_},r[t]=g):(g.id=m.id,g.object=m,g.geometry=v,g.material=p,g.groupOrder=M,g.renderOrder=m.renderOrder,g.z=y,g.group=_),t++,g}function c(m,v,p,M,y,_){const g=l(m,v,p,M,y,_);p.transmission>0?n.push(g):p.transparent===!0?s.push(g):e.push(g)}function h(m,v,p,M,y,_){const g=l(m,v,p,M,y,_);p.transmission>0?n.unshift(g):p.transparent===!0?s.unshift(g):e.unshift(g)}function d(m,v){e.length>1&&e.sort(m||Jv),n.length>1&&n.sort(v||Ah),s.length>1&&s.sort(v||Ah)}function f(){for(let m=t,v=r.length;m<v;m++){const p=r[m];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:c,unshift:h,finish:f,sort:d}}function Qv(){let r=new WeakMap;function t(n,s){const o=r.get(n);let l;return o===void 0?(l=new Ch,r.set(n,[l])):s>=o.length?(l=new Ch,o.push(l)):l=o[s],l}function e(){r=new WeakMap}return{get:t,dispose:e}}function t0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new nt,color:new ue};break;case"SpotLight":e={position:new nt,direction:new nt,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new nt,color:new ue,distance:0,decay:0};break;case"HemisphereLight":e={direction:new nt,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":e={color:new ue,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return r[t.id]=e,e}}}function e0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let n0=0;function i0(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function r0(r){const t=new t0,e=e0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let d=0;d<9;d++)n.probe.push(new nt);const s=new nt,o=new Ae,l=new Ae;function c(d,f){let m=0,v=0,p=0;for(let W=0;W<9;W++)n.probe[W].set(0,0,0);let M=0,y=0,_=0,g=0,C=0,b=0,I=0,N=0,F=0,z=0,G=0;d.sort(i0);const D=f===!0?Math.PI:1;for(let W=0,O=d.length;W<O;W++){const B=d[W],A=B.color,Z=B.intensity,at=B.distance,ot=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)m+=A.r*Z*D,v+=A.g*Z*D,p+=A.b*Z*D;else if(B.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(B.sh.coefficients[Y],Z);G++}else if(B.isDirectionalLight){const Y=t.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*D),B.castShadow){const st=B.shadow,rt=e.get(B);rt.shadowBias=st.bias,rt.shadowNormalBias=st.normalBias,rt.shadowRadius=st.radius,rt.shadowMapSize=st.mapSize,n.directionalShadow[M]=rt,n.directionalShadowMap[M]=ot,n.directionalShadowMatrix[M]=B.shadow.matrix,b++}n.directional[M]=Y,M++}else if(B.isSpotLight){const Y=t.get(B);Y.position.setFromMatrixPosition(B.matrixWorld),Y.color.copy(A).multiplyScalar(Z*D),Y.distance=at,Y.coneCos=Math.cos(B.angle),Y.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),Y.decay=B.decay,n.spot[_]=Y;const st=B.shadow;if(B.map&&(n.spotLightMap[F]=B.map,F++,st.updateMatrices(B),B.castShadow&&z++),n.spotLightMatrix[_]=st.matrix,B.castShadow){const rt=e.get(B);rt.shadowBias=st.bias,rt.shadowNormalBias=st.normalBias,rt.shadowRadius=st.radius,rt.shadowMapSize=st.mapSize,n.spotShadow[_]=rt,n.spotShadowMap[_]=ot,N++}_++}else if(B.isRectAreaLight){const Y=t.get(B);Y.color.copy(A).multiplyScalar(Z),Y.halfWidth.set(B.width*.5,0,0),Y.halfHeight.set(0,B.height*.5,0),n.rectArea[g]=Y,g++}else if(B.isPointLight){const Y=t.get(B);if(Y.color.copy(B.color).multiplyScalar(B.intensity*D),Y.distance=B.distance,Y.decay=B.decay,B.castShadow){const st=B.shadow,rt=e.get(B);rt.shadowBias=st.bias,rt.shadowNormalBias=st.normalBias,rt.shadowRadius=st.radius,rt.shadowMapSize=st.mapSize,rt.shadowCameraNear=st.camera.near,rt.shadowCameraFar=st.camera.far,n.pointShadow[y]=rt,n.pointShadowMap[y]=ot,n.pointShadowMatrix[y]=B.shadow.matrix,I++}n.point[y]=Y,y++}else if(B.isHemisphereLight){const Y=t.get(B);Y.skyColor.copy(B.color).multiplyScalar(Z*D),Y.groundColor.copy(B.groundColor).multiplyScalar(Z*D),n.hemi[C]=Y,C++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ot.LTC_FLOAT_1,n.rectAreaLTC2=Ot.LTC_FLOAT_2):(n.rectAreaLTC1=Ot.LTC_HALF_1,n.rectAreaLTC2=Ot.LTC_HALF_2)),n.ambient[0]=m,n.ambient[1]=v,n.ambient[2]=p;const P=n.hash;(P.directionalLength!==M||P.pointLength!==y||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==C||P.numDirectionalShadows!==b||P.numPointShadows!==I||P.numSpotShadows!==N||P.numSpotMaps!==F||P.numLightProbes!==G)&&(n.directional.length=M,n.spot.length=_,n.rectArea.length=g,n.point.length=y,n.hemi.length=C,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=I,n.pointShadowMap.length=I,n.spotShadow.length=N,n.spotShadowMap.length=N,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=I,n.spotLightMatrix.length=N+F-z,n.spotLightMap.length=F,n.numSpotLightShadowsWithMaps=z,n.numLightProbes=G,P.directionalLength=M,P.pointLength=y,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=C,P.numDirectionalShadows=b,P.numPointShadows=I,P.numSpotShadows=N,P.numSpotMaps=F,P.numLightProbes=G,n.version=n0++)}function h(d,f){let m=0,v=0,p=0,M=0,y=0;const _=f.matrixWorldInverse;for(let g=0,C=d.length;g<C;g++){const b=d[g];if(b.isDirectionalLight){const I=n.directional[m];I.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(_),m++}else if(b.isSpotLight){const I=n.spot[p];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(_),I.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),I.direction.sub(s),I.direction.transformDirection(_),p++}else if(b.isRectAreaLight){const I=n.rectArea[M];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(_),l.identity(),o.copy(b.matrixWorld),o.premultiply(_),l.extractRotation(o),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),I.halfWidth.applyMatrix4(l),I.halfHeight.applyMatrix4(l),M++}else if(b.isPointLight){const I=n.point[v];I.position.setFromMatrixPosition(b.matrixWorld),I.position.applyMatrix4(_),v++}else if(b.isHemisphereLight){const I=n.hemi[y];I.direction.setFromMatrixPosition(b.matrixWorld),I.direction.transformDirection(_),y++}}}return{setup:c,setupView:h,state:n}}function Ph(r){const t=new r0(r),e=[],n=[];function s(){e.length=0,n.length=0}function o(f){e.push(f)}function l(f){n.push(f)}function c(f){t.setup(e,f)}function h(f){t.setupView(e,f)}return{init:s,state:{lightsArray:e,shadowsArray:n,lights:t,transmissionRenderTarget:null},setupLights:c,setupLightsView:h,pushLight:o,pushShadow:l}}function s0(r){let t=new WeakMap;function e(s,o=0){const l=t.get(s);let c;return l===void 0?(c=new Ph(r),t.set(s,[c])):o>=l.length?(c=new Ph(r),l.push(c)):c=l[o],c}function n(){t=new WeakMap}return{get:e,dispose:n}}class o0 extends Ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=np,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class a0 extends Ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const l0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,c0=`uniform sampler2D shadow_pass;
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
}`;function h0(r,t,e){let n=new ll;const s=new yt,o=new yt,l=new Ve,c=new o0({depthPacking:ip}),h=new a0,d={},f=e.maxTextureSize,m={[wi]:un,[un]:wi,[_n]:_n},v=new Ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:l0,fragmentShader:c0}),p=v.clone();p.defines.HORIZONTAL_PASS=1;const M=new on;M.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new sn(M,v),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jh;let g=this.type;this.render=function(F,z,G){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||F.length===0)return;const D=r.getRenderTarget(),P=r.getActiveCubeFace(),W=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Mi),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const B=g!==ri&&this.type===ri,A=g===ri&&this.type!==ri;for(let Z=0,at=F.length;Z<at;Z++){const ot=F[Z],Y=ot.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",ot,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const st=Y.getFrameExtents();if(s.multiply(st),o.copy(Y.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(o.x=Math.floor(f/st.x),s.x=o.x*st.x,Y.mapSize.x=o.x),s.y>f&&(o.y=Math.floor(f/st.y),s.y=o.y*st.y,Y.mapSize.y=o.y)),Y.map===null||B===!0||A===!0){const q=this.type!==ri?{minFilter:An,magFilter:An}:{};Y.map!==null&&Y.map.dispose(),Y.map=new Yi(s.x,s.y,q),Y.map.texture.name=ot.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const rt=Y.getViewportCount();for(let q=0;q<rt;q++){const Q=Y.getViewport(q);l.set(o.x*Q.x,o.y*Q.y,o.x*Q.z,o.y*Q.w),O.viewport(l),Y.updateMatrices(ot,q),n=Y.getFrustum(),I(z,G,Y.camera,ot,this.type)}Y.isPointLightShadow!==!0&&this.type===ri&&C(Y,G),Y.needsUpdate=!1}g=this.type,_.needsUpdate=!1,r.setRenderTarget(D,P,W)};function C(F,z){const G=t.update(y);v.defines.VSM_SAMPLES!==F.blurSamples&&(v.defines.VSM_SAMPLES=F.blurSamples,p.defines.VSM_SAMPLES=F.blurSamples,v.needsUpdate=!0,p.needsUpdate=!0),F.mapPass===null&&(F.mapPass=new Yi(s.x,s.y)),v.uniforms.shadow_pass.value=F.map.texture,v.uniforms.resolution.value=F.mapSize,v.uniforms.radius.value=F.radius,r.setRenderTarget(F.mapPass),r.clear(),r.renderBufferDirect(z,null,G,v,y,null),p.uniforms.shadow_pass.value=F.mapPass.texture,p.uniforms.resolution.value=F.mapSize,p.uniforms.radius.value=F.radius,r.setRenderTarget(F.map),r.clear(),r.renderBufferDirect(z,null,G,p,y,null)}function b(F,z,G,D){let P=null;const W=G.isPointLight===!0?F.customDistanceMaterial:F.customDepthMaterial;if(W!==void 0)P=W;else if(P=G.isPointLight===!0?h:c,r.localClippingEnabled&&z.clipShadows===!0&&Array.isArray(z.clippingPlanes)&&z.clippingPlanes.length!==0||z.displacementMap&&z.displacementScale!==0||z.alphaMap&&z.alphaTest>0||z.map&&z.alphaTest>0){const O=P.uuid,B=z.uuid;let A=d[O];A===void 0&&(A={},d[O]=A);let Z=A[B];Z===void 0&&(Z=P.clone(),A[B]=Z,z.addEventListener("dispose",N)),P=Z}if(P.visible=z.visible,P.wireframe=z.wireframe,D===ri?P.side=z.shadowSide!==null?z.shadowSide:z.side:P.side=z.shadowSide!==null?z.shadowSide:m[z.side],P.alphaMap=z.alphaMap,P.alphaTest=z.alphaTest,P.map=z.map,P.clipShadows=z.clipShadows,P.clippingPlanes=z.clippingPlanes,P.clipIntersection=z.clipIntersection,P.displacementMap=z.displacementMap,P.displacementScale=z.displacementScale,P.displacementBias=z.displacementBias,P.wireframeLinewidth=z.wireframeLinewidth,P.linewidth=z.linewidth,G.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const O=r.properties.get(P);O.light=G}return P}function I(F,z,G,D,P){if(F.visible===!1)return;if(F.layers.test(z.layers)&&(F.isMesh||F.isLine||F.isPoints)&&(F.castShadow||F.receiveShadow&&P===ri)&&(!F.frustumCulled||n.intersectsObject(F))){F.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,F.matrixWorld);const B=t.update(F),A=F.material;if(Array.isArray(A)){const Z=B.groups;for(let at=0,ot=Z.length;at<ot;at++){const Y=Z[at],st=A[Y.materialIndex];if(st&&st.visible){const rt=b(F,st,D,P);F.onBeforeShadow(r,F,z,G,B,rt,Y),r.renderBufferDirect(G,null,B,rt,F,Y),F.onAfterShadow(r,F,z,G,B,rt,Y)}}}else if(A.visible){const Z=b(F,A,D,P);F.onBeforeShadow(r,F,z,G,B,Z,null),r.renderBufferDirect(G,null,B,Z,F,null),F.onAfterShadow(r,F,z,G,B,Z,null)}}const O=F.children;for(let B=0,A=O.length;B<A;B++)I(O[B],z,G,D,P)}function N(F){F.target.removeEventListener("dispose",N);for(const G in d){const D=d[G],P=F.target.uuid;P in D&&(D[P].dispose(),delete D[P])}}}function u0(r){function t(){let R=!1;const ut=new Ve;let St=null;const Rt=new Ve(0,0,0,0);return{setMask:function(Nt){St!==Nt&&!R&&(r.colorMask(Nt,Nt,Nt,Nt),St=Nt)},setLocked:function(Nt){R=Nt},setClear:function(Nt,ne,ce,ge,Re){Re===!0&&(Nt*=ge,ne*=ge,ce*=ge),ut.set(Nt,ne,ce,ge),Rt.equals(ut)===!1&&(r.clearColor(Nt,ne,ce,ge),Rt.copy(ut))},reset:function(){R=!1,St=null,Rt.set(-1,0,0,0)}}}function e(){let R=!1,ut=null,St=null,Rt=null;return{setTest:function(Nt){Nt?Mt(r.DEPTH_TEST):bt(r.DEPTH_TEST)},setMask:function(Nt){ut!==Nt&&!R&&(r.depthMask(Nt),ut=Nt)},setFunc:function(Nt){if(St!==Nt){switch(Nt){case Lf:r.depthFunc(r.NEVER);break;case Rf:r.depthFunc(r.ALWAYS);break;case If:r.depthFunc(r.LESS);break;case Mo:r.depthFunc(r.LEQUAL);break;case Df:r.depthFunc(r.EQUAL);break;case Nf:r.depthFunc(r.GEQUAL);break;case Of:r.depthFunc(r.GREATER);break;case Uf:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}St=Nt}},setLocked:function(Nt){R=Nt},setClear:function(Nt){Rt!==Nt&&(r.clearDepth(Nt),Rt=Nt)},reset:function(){R=!1,ut=null,St=null,Rt=null}}}function n(){let R=!1,ut=null,St=null,Rt=null,Nt=null,ne=null,ce=null,ge=null,Re=null;return{setTest:function(me){R||(me?Mt(r.STENCIL_TEST):bt(r.STENCIL_TEST))},setMask:function(me){ut!==me&&!R&&(r.stencilMask(me),ut=me)},setFunc:function(me,Ee,Se){(St!==me||Rt!==Ee||Nt!==Se)&&(r.stencilFunc(me,Ee,Se),St=me,Rt=Ee,Nt=Se)},setOp:function(me,Ee,Se){(ne!==me||ce!==Ee||ge!==Se)&&(r.stencilOp(me,Ee,Se),ne=me,ce=Ee,ge=Se)},setLocked:function(me){R=me},setClear:function(me){Re!==me&&(r.clearStencil(me),Re=me)},reset:function(){R=!1,ut=null,St=null,Rt=null,Nt=null,ne=null,ce=null,ge=null,Re=null}}}const s=new t,o=new e,l=new n,c=new WeakMap,h=new WeakMap;let d={},f={},m=new WeakMap,v=[],p=null,M=!1,y=null,_=null,g=null,C=null,b=null,I=null,N=null,F=new ue(0,0,0),z=0,G=!1,D=null,P=null,W=null,O=null,B=null;const A=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,at=0;const ot=r.getParameter(r.VERSION);ot.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(ot)[1]),Z=at>=1):ot.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(ot)[1]),Z=at>=2);let Y=null,st={};const rt=r.getParameter(r.SCISSOR_BOX),q=r.getParameter(r.VIEWPORT),Q=new Ve().fromArray(rt),Ct=new Ve().fromArray(q);function J(R,ut,St,Rt){const Nt=new Uint8Array(4),ne=r.createTexture();r.bindTexture(R,ne),r.texParameteri(R,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(R,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ce=0;ce<St;ce++)R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY?r.texImage3D(ut,0,r.RGBA,1,1,Rt,0,r.RGBA,r.UNSIGNED_BYTE,Nt):r.texImage2D(ut+ce,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Nt);return ne}const et={};et[r.TEXTURE_2D]=J(r.TEXTURE_2D,r.TEXTURE_2D,1),et[r.TEXTURE_CUBE_MAP]=J(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),et[r.TEXTURE_2D_ARRAY]=J(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),et[r.TEXTURE_3D]=J(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),l.setClear(0),Mt(r.DEPTH_TEST),o.setFunc(Mo),tt(!1),K(uc),Mt(r.CULL_FACE),xt(Mi);function Mt(R){d[R]!==!0&&(r.enable(R),d[R]=!0)}function bt(R){d[R]!==!1&&(r.disable(R),d[R]=!1)}function Pt(R,ut){return f[R]!==ut?(r.bindFramebuffer(R,ut),f[R]=ut,R===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=ut),R===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=ut),!0):!1}function It(R,ut){let St=v,Rt=!1;if(R){St=m.get(ut),St===void 0&&(St=[],m.set(ut,St));const Nt=R.textures;if(St.length!==Nt.length||St[0]!==r.COLOR_ATTACHMENT0){for(let ne=0,ce=Nt.length;ne<ce;ne++)St[ne]=r.COLOR_ATTACHMENT0+ne;St.length=Nt.length,Rt=!0}}else St[0]!==r.BACK&&(St[0]=r.BACK,Rt=!0);Rt&&r.drawBuffers(St)}function zt(R){return p!==R?(r.useProgram(R),p=R,!0):!1}const it={[Hi]:r.FUNC_ADD,[ff]:r.FUNC_SUBTRACT,[pf]:r.FUNC_REVERSE_SUBTRACT};it[mf]=r.MIN,it[_f]=r.MAX;const vt={[gf]:r.ZERO,[vf]:r.ONE,[xf]:r.SRC_COLOR,[Xa]:r.SRC_ALPHA,[Ef]:r.SRC_ALPHA_SATURATE,[bf]:r.DST_COLOR,[Mf]:r.DST_ALPHA,[yf]:r.ONE_MINUS_SRC_COLOR,[qa]:r.ONE_MINUS_SRC_ALPHA,[wf]:r.ONE_MINUS_DST_COLOR,[Sf]:r.ONE_MINUS_DST_ALPHA,[Tf]:r.CONSTANT_COLOR,[Af]:r.ONE_MINUS_CONSTANT_COLOR,[Cf]:r.CONSTANT_ALPHA,[Pf]:r.ONE_MINUS_CONSTANT_ALPHA};function xt(R,ut,St,Rt,Nt,ne,ce,ge,Re,me){if(R===Mi){M===!0&&(bt(r.BLEND),M=!1);return}if(M===!1&&(Mt(r.BLEND),M=!0),R!==df){if(R!==y||me!==G){if((_!==Hi||b!==Hi)&&(r.blendEquation(r.FUNC_ADD),_=Hi,b=Hi),me)switch(R){case Ar:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case dc:r.blendFunc(r.ONE,r.ONE);break;case fc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case pc:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}else switch(R){case Ar:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case dc:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case fc:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case pc:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",R);break}g=null,C=null,I=null,N=null,F.set(0,0,0),z=0,y=R,G=me}return}Nt=Nt||ut,ne=ne||St,ce=ce||Rt,(ut!==_||Nt!==b)&&(r.blendEquationSeparate(it[ut],it[Nt]),_=ut,b=Nt),(St!==g||Rt!==C||ne!==I||ce!==N)&&(r.blendFuncSeparate(vt[St],vt[Rt],vt[ne],vt[ce]),g=St,C=Rt,I=ne,N=ce),(ge.equals(F)===!1||Re!==z)&&(r.blendColor(ge.r,ge.g,ge.b,Re),F.copy(ge),z=Re),y=R,G=!1}function w(R,ut){R.side===_n?bt(r.CULL_FACE):Mt(r.CULL_FACE);let St=R.side===un;ut&&(St=!St),tt(St),R.blending===Ar&&R.transparent===!1?xt(Mi):xt(R.blending,R.blendEquation,R.blendSrc,R.blendDst,R.blendEquationAlpha,R.blendSrcAlpha,R.blendDstAlpha,R.blendColor,R.blendAlpha,R.premultipliedAlpha),o.setFunc(R.depthFunc),o.setTest(R.depthTest),o.setMask(R.depthWrite),s.setMask(R.colorWrite);const Rt=R.stencilWrite;l.setTest(Rt),Rt&&(l.setMask(R.stencilWriteMask),l.setFunc(R.stencilFunc,R.stencilRef,R.stencilFuncMask),l.setOp(R.stencilFail,R.stencilZFail,R.stencilZPass)),S(R.polygonOffset,R.polygonOffsetFactor,R.polygonOffsetUnits),R.alphaToCoverage===!0?Mt(r.SAMPLE_ALPHA_TO_COVERAGE):bt(r.SAMPLE_ALPHA_TO_COVERAGE)}function tt(R){D!==R&&(R?r.frontFace(r.CW):r.frontFace(r.CCW),D=R)}function K(R){R!==cf?(Mt(r.CULL_FACE),R!==P&&(R===uc?r.cullFace(r.BACK):R===hf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):bt(r.CULL_FACE),P=R}function T(R){R!==W&&(Z&&r.lineWidth(R),W=R)}function S(R,ut,St){R?(Mt(r.POLYGON_OFFSET_FILL),(O!==ut||B!==St)&&(r.polygonOffset(ut,St),O=ut,B=St)):bt(r.POLYGON_OFFSET_FILL)}function k(R){R?Mt(r.SCISSOR_TEST):bt(r.SCISSOR_TEST)}function X(R){R===void 0&&(R=r.TEXTURE0+A-1),Y!==R&&(r.activeTexture(R),Y=R)}function $(R,ut,St){St===void 0&&(Y===null?St=r.TEXTURE0+A-1:St=Y);let Rt=st[St];Rt===void 0&&(Rt={type:void 0,texture:void 0},st[St]=Rt),(Rt.type!==R||Rt.texture!==ut)&&(Y!==St&&(r.activeTexture(St),Y=St),r.bindTexture(R,ut||et[R]),Rt.type=R,Rt.texture=ut)}function V(){const R=st[Y];R!==void 0&&R.type!==void 0&&(r.bindTexture(R.type,null),R.type=void 0,R.texture=void 0)}function ft(){try{r.compressedTexImage2D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function lt(){try{r.compressedTexImage3D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function pt(){try{r.texSubImage2D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Et(){try{r.texSubImage3D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function wt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Tt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ht(){try{r.texStorage2D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Ft(){try{r.texStorage3D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Dt(){try{r.texImage2D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Kt(){try{r.texImage3D.apply(r,arguments)}catch(R){console.error("THREE.WebGLState:",R)}}function Gt(R){Q.equals(R)===!1&&(r.scissor(R.x,R.y,R.z,R.w),Q.copy(R))}function re(R){Ct.equals(R)===!1&&(r.viewport(R.x,R.y,R.z,R.w),Ct.copy(R))}function se(R,ut){let St=h.get(ut);St===void 0&&(St=new WeakMap,h.set(ut,St));let Rt=St.get(R);Rt===void 0&&(Rt=r.getUniformBlockIndex(ut,R.name),St.set(R,Rt))}function Jt(R,ut){const Rt=h.get(ut).get(R);c.get(ut)!==Rt&&(r.uniformBlockBinding(ut,Rt,R.__bindingPointIndex),c.set(ut,Rt))}function Bt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},Y=null,st={},f={},m=new WeakMap,v=[],p=null,M=!1,y=null,_=null,g=null,C=null,b=null,I=null,N=null,F=new ue(0,0,0),z=0,G=!1,D=null,P=null,W=null,O=null,B=null,Q.set(0,0,r.canvas.width,r.canvas.height),Ct.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),l.reset()}return{buffers:{color:s,depth:o,stencil:l},enable:Mt,disable:bt,bindFramebuffer:Pt,drawBuffers:It,useProgram:zt,setBlending:xt,setMaterial:w,setFlipSided:tt,setCullFace:K,setLineWidth:T,setPolygonOffset:S,setScissorTest:k,activeTexture:X,bindTexture:$,unbindTexture:V,compressedTexImage2D:ft,compressedTexImage3D:lt,texImage2D:Dt,texImage3D:Kt,updateUBOMapping:se,uniformBlockBinding:Jt,texStorage2D:Ht,texStorage3D:Ft,texSubImage2D:pt,texSubImage3D:Et,compressedTexSubImage2D:wt,compressedTexSubImage3D:Tt,scissor:Gt,viewport:re,reset:Bt}}function d0(r,t,e,n,s,o,l){const c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),d=new yt,f=new WeakMap;let m;const v=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(T,S){return p?new OffscreenCanvas(T,S):Ao("canvas")}function y(T,S,k){let X=1;const $=K(T);if(($.width>k||$.height>k)&&(X=k/Math.max($.width,$.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const V=Math.floor(X*$.width),ft=Math.floor(X*$.height);m===void 0&&(m=M(V,ft));const lt=S?M(V,ft):m;return lt.width=V,lt.height=ft,lt.getContext("2d").drawImage(T,0,0,V,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+V+"x"+ft+")."),lt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),T;return T}function _(T){return T.generateMipmaps&&T.minFilter!==An&&T.minFilter!==On}function g(T){r.generateMipmap(T)}function C(T,S,k,X,$=!1){if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let V=S;if(S===r.RED&&(k===r.FLOAT&&(V=r.R32F),k===r.HALF_FLOAT&&(V=r.R16F),k===r.UNSIGNED_BYTE&&(V=r.R8)),S===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(V=r.R8UI),k===r.UNSIGNED_SHORT&&(V=r.R16UI),k===r.UNSIGNED_INT&&(V=r.R32UI),k===r.BYTE&&(V=r.R8I),k===r.SHORT&&(V=r.R16I),k===r.INT&&(V=r.R32I)),S===r.RG&&(k===r.FLOAT&&(V=r.RG32F),k===r.HALF_FLOAT&&(V=r.RG16F),k===r.UNSIGNED_BYTE&&(V=r.RG8)),S===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(V=r.RG8UI),k===r.UNSIGNED_SHORT&&(V=r.RG16UI),k===r.UNSIGNED_INT&&(V=r.RG32UI),k===r.BYTE&&(V=r.RG8I),k===r.SHORT&&(V=r.RG16I),k===r.INT&&(V=r.RG32I)),S===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(V=r.RGB9_E5),S===r.RGBA){const ft=$?bo:_e.getTransfer(X);k===r.FLOAT&&(V=r.RGBA32F),k===r.HALF_FLOAT&&(V=r.RGBA16F),k===r.UNSIGNED_BYTE&&(V=ft===Me?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(V=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(V=r.RGB5_A1)}return(V===r.R16F||V===r.R32F||V===r.RG16F||V===r.RG32F||V===r.RGBA16F||V===r.RGBA32F)&&t.get("EXT_color_buffer_float"),V}function b(T,S){return _(T)===!0||T.isFramebufferTexture&&T.minFilter!==An&&T.minFilter!==On?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function I(T){const S=T.target;S.removeEventListener("dispose",I),F(S),S.isVideoTexture&&f.delete(S)}function N(T){const S=T.target;S.removeEventListener("dispose",N),G(S)}function F(T){const S=n.get(T);if(S.__webglInit===void 0)return;const k=T.source,X=v.get(k);if(X){const $=X[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&z(T),Object.keys(X).length===0&&v.delete(k)}n.remove(T)}function z(T){const S=n.get(T);r.deleteTexture(S.__webglTexture);const k=T.source,X=v.get(k);delete X[S.__cacheKey],l.memory.textures--}function G(T){const S=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(S.__webglFramebuffer[X]))for(let $=0;$<S.__webglFramebuffer[X].length;$++)r.deleteFramebuffer(S.__webglFramebuffer[X][$]);else r.deleteFramebuffer(S.__webglFramebuffer[X]);S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer[X])}else{if(Array.isArray(S.__webglFramebuffer))for(let X=0;X<S.__webglFramebuffer.length;X++)r.deleteFramebuffer(S.__webglFramebuffer[X]);else r.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&r.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&r.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let X=0;X<S.__webglColorRenderbuffer.length;X++)S.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(S.__webglColorRenderbuffer[X]);S.__webglDepthRenderbuffer&&r.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=T.textures;for(let X=0,$=k.length;X<$;X++){const V=n.get(k[X]);V.__webglTexture&&(r.deleteTexture(V.__webglTexture),l.memory.textures--),n.remove(k[X])}n.remove(T)}let D=0;function P(){D=0}function W(){const T=D;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),D+=1,T}function O(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function B(T,S){const k=n.get(T);if(T.isVideoTexture&&w(T),T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){const X=T.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(k,T,S);return}}e.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+S)}function A(T,S){const k=n.get(T);if(T.version>0&&k.__version!==T.version){Q(k,T,S);return}e.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+S)}function Z(T,S){const k=n.get(T);if(T.version>0&&k.__version!==T.version){Q(k,T,S);return}e.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+S)}function at(T,S){const k=n.get(T);if(T.version>0&&k.__version!==T.version){Ct(k,T,S);return}e.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+S)}const ot={[Ka]:r.REPEAT,[Xi]:r.CLAMP_TO_EDGE,[$a]:r.MIRRORED_REPEAT},Y={[An]:r.NEAREST,[Zf]:r.NEAREST_MIPMAP_NEAREST,[Hs]:r.NEAREST_MIPMAP_LINEAR,[On]:r.LINEAR,[ra]:r.LINEAR_MIPMAP_NEAREST,[qi]:r.LINEAR_MIPMAP_LINEAR},st={[sp]:r.NEVER,[up]:r.ALWAYS,[op]:r.LESS,[uu]:r.LEQUAL,[ap]:r.EQUAL,[hp]:r.GEQUAL,[lp]:r.GREATER,[cp]:r.NOTEQUAL};function rt(T,S){if(S.type===yi&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===On||S.magFilter===ra||S.magFilter===Hs||S.magFilter===qi||S.minFilter===On||S.minFilter===ra||S.minFilter===Hs||S.minFilter===qi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(T,r.TEXTURE_WRAP_S,ot[S.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,ot[S.wrapT]),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,ot[S.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,Y[S.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,Y[S.minFilter]),S.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,st[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===An||S.minFilter!==Hs&&S.minFilter!==qi||S.type===yi&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");r.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function q(T,S){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",I));const X=S.source;let $=v.get(X);$===void 0&&($={},v.set(X,$));const V=O(S);if(V!==T.__cacheKey){$[V]===void 0&&($[V]={texture:r.createTexture(),usedTimes:0},l.memory.textures++,k=!0),$[V].usedTimes++;const ft=$[T.__cacheKey];ft!==void 0&&($[T.__cacheKey].usedTimes--,ft.usedTimes===0&&z(S)),T.__cacheKey=V,T.__webglTexture=$[V].texture}return k}function Q(T,S,k){let X=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(X=r.TEXTURE_3D);const $=q(T,S),V=S.source;e.bindTexture(X,T.__webglTexture,r.TEXTURE0+k);const ft=n.get(V);if(V.version!==ft.__version||$===!0){e.activeTexture(r.TEXTURE0+k);const lt=_e.getPrimaries(_e.workingColorSpace),pt=S.colorSpace===xi?null:_e.getPrimaries(S.colorSpace),Et=S.colorSpace===xi||lt===pt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);let wt=y(S.image,!1,s.maxTextureSize);wt=tt(S,wt);const Tt=o.convert(S.format,S.colorSpace),Ht=o.convert(S.type);let Ft=C(S.internalFormat,Tt,Ht,S.colorSpace,S.isVideoTexture);rt(X,S);let Dt;const Kt=S.mipmaps,Gt=S.isVideoTexture!==!0&&Ft!==cu,re=ft.__version===void 0||$===!0,se=V.dataReady,Jt=b(S,wt);if(S.isDepthTexture)Ft=r.DEPTH_COMPONENT16,S.type===yi?Ft=r.DEPTH_COMPONENT32F:S.type===Dr?Ft=r.DEPTH_COMPONENT24:S.type===xs&&(Ft=r.DEPTH24_STENCIL8),re&&(Gt?e.texStorage2D(r.TEXTURE_2D,1,Ft,wt.width,wt.height):e.texImage2D(r.TEXTURE_2D,0,Ft,wt.width,wt.height,0,Tt,Ht,null));else if(S.isDataTexture)if(Kt.length>0){Gt&&re&&e.texStorage2D(r.TEXTURE_2D,Jt,Ft,Kt[0].width,Kt[0].height);for(let Bt=0,R=Kt.length;Bt<R;Bt++)Dt=Kt[Bt],Gt?se&&e.texSubImage2D(r.TEXTURE_2D,Bt,0,0,Dt.width,Dt.height,Tt,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Bt,Ft,Dt.width,Dt.height,0,Tt,Ht,Dt.data);S.generateMipmaps=!1}else Gt?(re&&e.texStorage2D(r.TEXTURE_2D,Jt,Ft,wt.width,wt.height),se&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,wt.width,wt.height,Tt,Ht,wt.data)):e.texImage2D(r.TEXTURE_2D,0,Ft,wt.width,wt.height,0,Tt,Ht,wt.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Gt&&re&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Jt,Ft,Kt[0].width,Kt[0].height,wt.depth);for(let Bt=0,R=Kt.length;Bt<R;Bt++)Dt=Kt[Bt],S.format!==Wn?Tt!==null?Gt?se&&e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Bt,0,0,0,Dt.width,Dt.height,wt.depth,Tt,Dt.data,0,0):e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Bt,Ft,Dt.width,Dt.height,wt.depth,0,Dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?se&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Bt,0,0,0,Dt.width,Dt.height,wt.depth,Tt,Ht,Dt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Bt,Ft,Dt.width,Dt.height,wt.depth,0,Tt,Ht,Dt.data)}else{Gt&&re&&e.texStorage2D(r.TEXTURE_2D,Jt,Ft,Kt[0].width,Kt[0].height);for(let Bt=0,R=Kt.length;Bt<R;Bt++)Dt=Kt[Bt],S.format!==Wn?Tt!==null?Gt?se&&e.compressedTexSubImage2D(r.TEXTURE_2D,Bt,0,0,Dt.width,Dt.height,Tt,Dt.data):e.compressedTexImage2D(r.TEXTURE_2D,Bt,Ft,Dt.width,Dt.height,0,Dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?se&&e.texSubImage2D(r.TEXTURE_2D,Bt,0,0,Dt.width,Dt.height,Tt,Ht,Dt.data):e.texImage2D(r.TEXTURE_2D,Bt,Ft,Dt.width,Dt.height,0,Tt,Ht,Dt.data)}else if(S.isDataArrayTexture)Gt?(re&&e.texStorage3D(r.TEXTURE_2D_ARRAY,Jt,Ft,wt.width,wt.height,wt.depth),se&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,wt.width,wt.height,wt.depth,Tt,Ht,wt.data)):e.texImage3D(r.TEXTURE_2D_ARRAY,0,Ft,wt.width,wt.height,wt.depth,0,Tt,Ht,wt.data);else if(S.isData3DTexture)Gt?(re&&e.texStorage3D(r.TEXTURE_3D,Jt,Ft,wt.width,wt.height,wt.depth),se&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,wt.width,wt.height,wt.depth,Tt,Ht,wt.data)):e.texImage3D(r.TEXTURE_3D,0,Ft,wt.width,wt.height,wt.depth,0,Tt,Ht,wt.data);else if(S.isFramebufferTexture){if(re)if(Gt)e.texStorage2D(r.TEXTURE_2D,Jt,Ft,wt.width,wt.height);else{let Bt=wt.width,R=wt.height;for(let ut=0;ut<Jt;ut++)e.texImage2D(r.TEXTURE_2D,ut,Ft,Bt,R,0,Tt,Ht,null),Bt>>=1,R>>=1}}else if(Kt.length>0){if(Gt&&re){const Bt=K(Kt[0]);e.texStorage2D(r.TEXTURE_2D,Jt,Ft,Bt.width,Bt.height)}for(let Bt=0,R=Kt.length;Bt<R;Bt++)Dt=Kt[Bt],Gt?se&&e.texSubImage2D(r.TEXTURE_2D,Bt,0,0,Tt,Ht,Dt):e.texImage2D(r.TEXTURE_2D,Bt,Ft,Tt,Ht,Dt);S.generateMipmaps=!1}else if(Gt){if(re){const Bt=K(wt);e.texStorage2D(r.TEXTURE_2D,Jt,Ft,Bt.width,Bt.height)}se&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Tt,Ht,wt)}else e.texImage2D(r.TEXTURE_2D,0,Ft,Tt,Ht,wt);_(S)&&g(X),ft.__version=V.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function Ct(T,S,k){if(S.image.length!==6)return;const X=q(T,S),$=S.source;e.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+k);const V=n.get($);if($.version!==V.__version||X===!0){e.activeTexture(r.TEXTURE0+k);const ft=_e.getPrimaries(_e.workingColorSpace),lt=S.colorSpace===xi?null:_e.getPrimaries(S.colorSpace),pt=S.colorSpace===xi||ft===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt);const Et=S.isCompressedTexture||S.image[0].isCompressedTexture,wt=S.image[0]&&S.image[0].isDataTexture,Tt=[];for(let R=0;R<6;R++)!Et&&!wt?Tt[R]=y(S.image[R],!0,s.maxCubemapSize):Tt[R]=wt?S.image[R].image:S.image[R],Tt[R]=tt(S,Tt[R]);const Ht=Tt[0],Ft=o.convert(S.format,S.colorSpace),Dt=o.convert(S.type),Kt=C(S.internalFormat,Ft,Dt,S.colorSpace),Gt=S.isVideoTexture!==!0,re=V.__version===void 0||X===!0,se=$.dataReady;let Jt=b(S,Ht);rt(r.TEXTURE_CUBE_MAP,S);let Bt;if(Et){Gt&&re&&e.texStorage2D(r.TEXTURE_CUBE_MAP,Jt,Kt,Ht.width,Ht.height);for(let R=0;R<6;R++){Bt=Tt[R].mipmaps;for(let ut=0;ut<Bt.length;ut++){const St=Bt[ut];S.format!==Wn?Ft!==null?Gt?se&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut,0,0,St.width,St.height,Ft,St.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut,Kt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?se&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut,0,0,St.width,St.height,Ft,Dt,St.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut,Kt,St.width,St.height,0,Ft,Dt,St.data)}}}else{if(Bt=S.mipmaps,Gt&&re){Bt.length>0&&Jt++;const R=K(Tt[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,Jt,Kt,R.width,R.height)}for(let R=0;R<6;R++)if(wt){Gt?se&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,0,0,Tt[R].width,Tt[R].height,Ft,Dt,Tt[R].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,Kt,Tt[R].width,Tt[R].height,0,Ft,Dt,Tt[R].data);for(let ut=0;ut<Bt.length;ut++){const Rt=Bt[ut].image[R].image;Gt?se&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut+1,0,0,Rt.width,Rt.height,Ft,Dt,Rt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut+1,Kt,Rt.width,Rt.height,0,Ft,Dt,Rt.data)}}else{Gt?se&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,0,0,Ft,Dt,Tt[R]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,0,Kt,Ft,Dt,Tt[R]);for(let ut=0;ut<Bt.length;ut++){const St=Bt[ut];Gt?se&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut+1,0,0,Ft,Dt,St.image[R]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+R,ut+1,Kt,Ft,Dt,St.image[R])}}}_(S)&&g(r.TEXTURE_CUBE_MAP),V.__version=$.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function J(T,S,k,X,$,V){const ft=o.convert(k.format,k.colorSpace),lt=o.convert(k.type),pt=C(k.internalFormat,ft,lt,k.colorSpace);if(!n.get(S).__hasExternalTextures){const wt=Math.max(1,S.width>>V),Tt=Math.max(1,S.height>>V);$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?e.texImage3D($,V,pt,wt,Tt,S.depth,0,ft,lt,null):e.texImage2D($,V,pt,wt,Tt,0,ft,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,T),xt(S)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,$,n.get(k).__webglTexture,0,vt(S)):($===r.TEXTURE_2D||$>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,$,n.get(k).__webglTexture,V),e.bindFramebuffer(r.FRAMEBUFFER,null)}function et(T,S,k){if(r.bindRenderbuffer(r.RENDERBUFFER,T),S.depthBuffer&&!S.stencilBuffer){let X=r.DEPTH_COMPONENT24;if(k||xt(S)){const $=S.depthTexture;$&&$.isDepthTexture&&($.type===yi?X=r.DEPTH_COMPONENT32F:$.type===Dr&&(X=r.DEPTH_COMPONENT24));const V=vt(S);xt(S)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,V,X,S.width,S.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,V,X,S.width,S.height)}else r.renderbufferStorage(r.RENDERBUFFER,X,S.width,S.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,T)}else if(S.depthBuffer&&S.stencilBuffer){const X=vt(S);k&&xt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,S.width,S.height):xt(S)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,X,r.DEPTH24_STENCIL8,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,T)}else{const X=S.textures;for(let $=0;$<X.length;$++){const V=X[$],ft=o.convert(V.format,V.colorSpace),lt=o.convert(V.type),pt=C(V.internalFormat,ft,lt,V.colorSpace),Et=vt(S);k&&xt(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Et,pt,S.width,S.height):xt(S)?c.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Et,pt,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,pt,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Mt(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),B(S.depthTexture,0);const X=n.get(S.depthTexture).__webglTexture,$=vt(S);if(S.depthTexture.format===Cr)xt(S)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,X,0);else if(S.depthTexture.format===fs)xt(S)?c.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function bt(T){const S=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");Mt(S.__webglFramebuffer,T)}else if(k){S.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[X]),S.__webglDepthbuffer[X]=r.createRenderbuffer(),et(S.__webglDepthbuffer[X],T,!1)}else e.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=r.createRenderbuffer(),et(S.__webglDepthbuffer,T,!1);e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pt(T,S,k){const X=n.get(T);S!==void 0&&J(X.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&bt(T)}function It(T){const S=T.texture,k=n.get(T),X=n.get(S);T.addEventListener("dispose",N);const $=T.textures,V=T.isWebGLCubeRenderTarget===!0,ft=$.length>1;if(ft||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=S.version,l.memory.textures++),V){k.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[lt]=[];for(let pt=0;pt<S.mipmaps.length;pt++)k.__webglFramebuffer[lt][pt]=r.createFramebuffer()}else k.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let lt=0;lt<S.mipmaps.length;lt++)k.__webglFramebuffer[lt]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(ft)for(let lt=0,pt=$.length;lt<pt;lt++){const Et=n.get($[lt]);Et.__webglTexture===void 0&&(Et.__webglTexture=r.createTexture(),l.memory.textures++)}if(T.samples>0&&xt(T)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let lt=0;lt<$.length;lt++){const pt=$[lt];k.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[lt]);const Et=o.convert(pt.format,pt.colorSpace),wt=o.convert(pt.type),Tt=C(pt.internalFormat,Et,wt,pt.colorSpace,T.isXRRenderTarget===!0),Ht=vt(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ht,Tt,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,k.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),et(k.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(V){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),rt(r.TEXTURE_CUBE_MAP,S);for(let lt=0;lt<6;lt++)if(S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)J(k.__webglFramebuffer[lt][pt],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,pt);else J(k.__webglFramebuffer[lt],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);_(S)&&g(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,pt=$.length;lt<pt;lt++){const Et=$[lt],wt=n.get(Et);e.bindTexture(r.TEXTURE_2D,wt.__webglTexture),rt(r.TEXTURE_2D,Et),J(k.__webglFramebuffer,T,Et,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),_(Et)&&g(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(lt=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,X.__webglTexture),rt(lt,S),S.mipmaps&&S.mipmaps.length>0)for(let pt=0;pt<S.mipmaps.length;pt++)J(k.__webglFramebuffer[pt],T,S,r.COLOR_ATTACHMENT0,lt,pt);else J(k.__webglFramebuffer,T,S,r.COLOR_ATTACHMENT0,lt,0);_(S)&&g(lt),e.unbindTexture()}T.depthBuffer&&bt(T)}function zt(T){const S=T.textures;for(let k=0,X=S.length;k<X;k++){const $=S[k];if(_($)){const V=T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,ft=n.get($).__webglTexture;e.bindTexture(V,ft),g(V),e.unbindTexture()}}}function it(T){if(T.samples>0&&xt(T)===!1){const S=T.textures,k=T.width,X=T.height;let $=r.COLOR_BUFFER_BIT;const V=[],ft=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=n.get(T),pt=S.length>1;if(pt)for(let Et=0;Et<S.length;Et++)e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,lt.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglFramebuffer);for(let Et=0;Et<S.length;Et++){V.push(r.COLOR_ATTACHMENT0+Et),T.depthBuffer&&V.push(ft);const wt=lt.__ignoreDepthValues!==void 0?lt.__ignoreDepthValues:!1;if(wt===!1&&(T.depthBuffer&&($|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&lt.__isTransmissionRenderTarget!==!0&&($|=r.STENCIL_BUFFER_BIT)),pt&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Et]),wt===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[ft]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[ft])),pt){const Tt=n.get(S[Et]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Tt,0)}r.blitFramebuffer(0,0,k,X,0,0,k,X,$,r.NEAREST),h&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,V)}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),pt)for(let Et=0;Et<S.length;Et++){e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.RENDERBUFFER,lt.__webglColorRenderbuffer[Et]);const wt=n.get(S[Et]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,lt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Et,r.TEXTURE_2D,wt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,lt.__webglMultisampledFramebuffer)}}function vt(T){return Math.min(s.maxSamples,T.samples)}function xt(T){const S=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function w(T){const S=l.render.frame;f.get(T)!==S&&(f.set(T,S),T.update())}function tt(T,S){const k=T.colorSpace,X=T.format,$=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Ti&&k!==xi&&(_e.getTransfer(k)===Me?(X!==Wn||$!==bi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function K(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(d.width=T.naturalWidth||T.width,d.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(d.width=T.displayWidth,d.height=T.displayHeight):(d.width=T.width,d.height=T.height),d}this.allocateTextureUnit=W,this.resetTextureUnits=P,this.setTexture2D=B,this.setTexture2DArray=A,this.setTexture3D=Z,this.setTextureCube=at,this.rebindTextures=Pt,this.setupRenderTarget=It,this.updateRenderTargetMipmap=zt,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=bt,this.setupFrameBufferTexture=J,this.useMultisampledRTT=xt}function f0(r,t){function e(n,s=xi){let o;const l=_e.getTransfer(s);if(n===bi)return r.UNSIGNED_BYTE;if(n===ru)return r.UNSIGNED_SHORT_4_4_4_4;if(n===su)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Yf)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Xf)return r.BYTE;if(n===qf)return r.SHORT;if(n===nu)return r.UNSIGNED_SHORT;if(n===iu)return r.INT;if(n===Dr)return r.UNSIGNED_INT;if(n===yi)return r.FLOAT;if(n===So)return r.HALF_FLOAT;if(n===jf)return r.ALPHA;if(n===Kf)return r.RGB;if(n===Wn)return r.RGBA;if(n===$f)return r.LUMINANCE;if(n===Jf)return r.LUMINANCE_ALPHA;if(n===Cr)return r.DEPTH_COMPONENT;if(n===fs)return r.DEPTH_STENCIL;if(n===Qf)return r.RED;if(n===ou)return r.RED_INTEGER;if(n===tp)return r.RG;if(n===au)return r.RG_INTEGER;if(n===lu)return r.RGBA_INTEGER;if(n===sa||n===oa||n===aa||n===la)if(l===Me)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===sa)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===oa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===aa)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===la)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===sa)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===oa)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===aa)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===la)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mc||n===_c||n===gc||n===vc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===mc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_c)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===vc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cu)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(n===xc||n===yc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===xc)return l===Me?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===yc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Mc||n===Sc||n===bc||n===wc||n===Ec||n===Tc||n===Ac||n===Cc||n===Pc||n===Lc||n===Rc||n===Ic||n===Dc||n===Nc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Mc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===bc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ec)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Tc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ac)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Lc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Rc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ic)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Dc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Nc)return l===Me?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ca||n===Oc||n===Uc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===ca)return l===Me?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Uc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ep||n===zc||n===Fc||n===kc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===ca)return o.COMPRESSED_RED_RGTC1_EXT;if(n===zc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Fc)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===kc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===xs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class p0 extends Tn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class as extends $e{constructor(){super(),this.isGroup=!0,this.type="Group"}}const m0={type:"move"};class Oa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new as,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new as,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new as,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,l=null;const c=this._targetRay,h=this._grip,d=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(d&&t.hand){l=!0;for(const y of t.hand.values()){const _=e.getJointPose(y,n),g=this._getHandJoint(d,y);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const f=d.joints["index-finger-tip"],m=d.joints["thumb-tip"],v=f.position.distanceTo(m.position),p=.02,M=.005;d.inputState.pinching&&v>p+M?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!d.inputState.pinching&&v<=p-M&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else h!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(h.matrix.fromArray(o.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,o.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(o.linearVelocity)):h.hasLinearVelocity=!1,o.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(o.angularVelocity)):h.hasAngularVelocity=!1));c!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,this.dispatchEvent(m0)))}return c!==null&&(c.visible=s!==null),h!==null&&(h.visible=o!==null),d!==null&&(d.visible=l!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new as;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const _0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,g0=`
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

}`;class v0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new dn,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,s=new Ei({vertexShader:_0,fragmentShader:g0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new sn(new Io(20,20),s)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class x0 extends $i{constructor(t,e){super();const n=this;let s=null,o=1,l=null,c="local-floor",h=1,d=null,f=null,m=null,v=null,p=null,M=null;const y=new v0,_=e.getContextAttributes();let g=null,C=null;const b=[],I=[],N=new yt;let F=null;const z=new Tn;z.layers.enable(1),z.viewport=new Ve;const G=new Tn;G.layers.enable(2),G.viewport=new Ve;const D=[z,G],P=new p0;P.layers.enable(1),P.layers.enable(2);let W=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let et=b[J];return et===void 0&&(et=new Oa,b[J]=et),et.getTargetRaySpace()},this.getControllerGrip=function(J){let et=b[J];return et===void 0&&(et=new Oa,b[J]=et),et.getGripSpace()},this.getHand=function(J){let et=b[J];return et===void 0&&(et=new Oa,b[J]=et),et.getHandSpace()};function B(J){const et=I.indexOf(J.inputSource);if(et===-1)return;const Mt=b[et];Mt!==void 0&&(Mt.update(J.inputSource,J.frame,d||l),Mt.dispatchEvent({type:J.type,data:J.inputSource}))}function A(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",A),s.removeEventListener("inputsourceschange",Z);for(let J=0;J<b.length;J++){const et=I[J];et!==null&&(I[J]=null,b[J].disconnect(et))}W=null,O=null,y.reset(),t.setRenderTarget(g),p=null,v=null,m=null,s=null,C=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(F),t.setSize(N.width,N.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){o=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){c=J,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return d||l},this.setReferenceSpace=function(J){d=J},this.getBaseLayer=function(){return v!==null?v:p},this.getBinding=function(){return m},this.getFrame=function(){return M},this.getSession=function(){return s},this.setSession=async function(J){if(s=J,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",A),s.addEventListener("inputsourceschange",Z),_.xrCompatible!==!0&&await e.makeXRCompatible(),F=t.getPixelRatio(),t.getSize(N),s.renderState.layers===void 0){const et={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:o};p=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),C=new Yi(p.framebufferWidth,p.framebufferHeight,{format:Wn,type:bi,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let et=null,Mt=null,bt=null;_.depth&&(bt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=_.stencil?fs:Cr,Mt=_.stencil?xs:Dr);const Pt={colorFormat:e.RGBA8,depthFormat:bt,scaleFactor:o};m=new XRWebGLBinding(s,e),v=m.createProjectionLayer(Pt),s.updateRenderState({layers:[v]}),t.setPixelRatio(1),t.setSize(v.textureWidth,v.textureHeight,!1),C=new Yi(v.textureWidth,v.textureHeight,{format:Wn,type:bi,depthTexture:new Tu(v.textureWidth,v.textureHeight,Mt,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const It=t.properties.get(C);It.__ignoreDepthValues=v.ignoreDepthValues}C.isXRRenderTarget=!0,this.setFoveation(h),d=null,l=await s.requestReferenceSpace(c),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function Z(J){for(let et=0;et<J.removed.length;et++){const Mt=J.removed[et],bt=I.indexOf(Mt);bt>=0&&(I[bt]=null,b[bt].disconnect(Mt))}for(let et=0;et<J.added.length;et++){const Mt=J.added[et];let bt=I.indexOf(Mt);if(bt===-1){for(let It=0;It<b.length;It++)if(It>=I.length){I.push(Mt),bt=It;break}else if(I[It]===null){I[It]=Mt,bt=It;break}if(bt===-1)break}const Pt=b[bt];Pt&&Pt.connect(Mt)}}const at=new nt,ot=new nt;function Y(J,et,Mt){at.setFromMatrixPosition(et.matrixWorld),ot.setFromMatrixPosition(Mt.matrixWorld);const bt=at.distanceTo(ot),Pt=et.projectionMatrix.elements,It=Mt.projectionMatrix.elements,zt=Pt[14]/(Pt[10]-1),it=Pt[14]/(Pt[10]+1),vt=(Pt[9]+1)/Pt[5],xt=(Pt[9]-1)/Pt[5],w=(Pt[8]-1)/Pt[0],tt=(It[8]+1)/It[0],K=zt*w,T=zt*tt,S=bt/(-w+tt),k=S*-w;et.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(k),J.translateZ(S),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert();const X=zt+S,$=it+S,V=K-k,ft=T+(bt-k),lt=vt*it/$*X,pt=xt*it/$*X;J.projectionMatrix.makePerspective(V,ft,lt,pt,X,$),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}function st(J,et){et===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(et.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(s===null)return;y.texture!==null&&(J.near=y.depthNear,J.far=y.depthFar),P.near=G.near=z.near=J.near,P.far=G.far=z.far=J.far,(W!==P.near||O!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),W=P.near,O=P.far,z.near=W,z.far=O,G.near=W,G.far=O,z.updateProjectionMatrix(),G.updateProjectionMatrix(),J.updateProjectionMatrix());const et=J.parent,Mt=P.cameras;st(P,et);for(let bt=0;bt<Mt.length;bt++)st(Mt[bt],et);Mt.length===2?Y(P,z,G):P.projectionMatrix.copy(z.projectionMatrix),rt(J,P,et)};function rt(J,et,Mt){Mt===null?J.matrix.copy(et.matrixWorld):(J.matrix.copy(Mt.matrixWorld),J.matrix.invert(),J.matrix.multiply(et.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(et.projectionMatrix),J.projectionMatrixInverse.copy(et.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ja*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(v===null&&p===null))return h},this.setFoveation=function(J){h=J,v!==null&&(v.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return y.texture!==null};let q=null;function Q(J,et){if(f=et.getViewerPose(d||l),M=et,f!==null){const Mt=f.views;p!==null&&(t.setRenderTargetFramebuffer(C,p.framebuffer),t.setRenderTarget(C));let bt=!1;Mt.length!==P.cameras.length&&(P.cameras.length=0,bt=!0);for(let It=0;It<Mt.length;It++){const zt=Mt[It];let it=null;if(p!==null)it=p.getViewport(zt);else{const xt=m.getViewSubImage(v,zt);it=xt.viewport,It===0&&(t.setRenderTargetTextures(C,xt.colorTexture,v.ignoreDepthValues?void 0:xt.depthStencilTexture),t.setRenderTarget(C))}let vt=D[It];vt===void 0&&(vt=new Tn,vt.layers.enable(It),vt.viewport=new Ve,D[It]=vt),vt.matrix.fromArray(zt.transform.matrix),vt.matrix.decompose(vt.position,vt.quaternion,vt.scale),vt.projectionMatrix.fromArray(zt.projectionMatrix),vt.projectionMatrixInverse.copy(vt.projectionMatrix).invert(),vt.viewport.set(it.x,it.y,it.width,it.height),It===0&&(P.matrix.copy(vt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),bt===!0&&P.cameras.push(vt)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")){const It=m.getDepthInformation(Mt[0]);It&&It.isValid&&It.texture&&y.init(t,It,s.renderState)}}for(let Mt=0;Mt<b.length;Mt++){const bt=I[Mt],Pt=b[Mt];bt!==null&&Pt!==void 0&&Pt.update(bt,et,d||l)}y.render(t,P),q&&q(J,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),M=null}const Ct=new wu;Ct.setAnimationLoop(Q),this.setAnimationLoop=function(J){q=J},this.dispose=function(){}}}const ki=new Zn,y0=new Ae;function M0(r,t){function e(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function n(_,g){g.color.getRGB(_.fogColor.value,Mu(r)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function s(_,g,C,b,I){g.isMeshBasicMaterial||g.isMeshLambertMaterial?o(_,g):g.isMeshToonMaterial?(o(_,g),m(_,g)):g.isMeshPhongMaterial?(o(_,g),f(_,g)):g.isMeshStandardMaterial?(o(_,g),v(_,g),g.isMeshPhysicalMaterial&&p(_,g,I)):g.isMeshMatcapMaterial?(o(_,g),M(_,g)):g.isMeshDepthMaterial?o(_,g):g.isMeshDistanceMaterial?(o(_,g),y(_,g)):g.isMeshNormalMaterial?o(_,g):g.isLineBasicMaterial?(l(_,g),g.isLineDashedMaterial&&c(_,g)):g.isPointsMaterial?h(_,g,C,b):g.isSpriteMaterial?d(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function o(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,e(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,e(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===un&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,e(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===un&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,e(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,e(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const C=t.get(g),b=C.envMap,I=C.envMapRotation;if(b&&(_.envMap.value=b,ki.copy(I),ki.x*=-1,ki.y*=-1,ki.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ki.y*=-1,ki.z*=-1),_.envMapRotation.value.setFromMatrix4(y0.makeRotationFromEuler(ki)),_.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap){_.lightMap.value=g.lightMap;const N=r._useLegacyLights===!0?Math.PI:1;_.lightMapIntensity.value=g.lightMapIntensity*N,e(g.lightMap,_.lightMapTransform)}g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,_.aoMapTransform))}function l(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,e(g.map,_.mapTransform))}function c(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function h(_,g,C,b){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*C,_.scale.value=b*.5,g.map&&(_.map.value=g.map,e(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function d(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,e(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,e(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function f(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function m(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function v(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function p(_,g,C){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===un&&_.clearcoatNormalScale.value.negate())),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=C.texture,_.transmissionSamplerSize.value.set(C.width,C.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,g){g.matcap&&(_.matcap.value=g.matcap)}function y(_,g){const C=t.get(g).light;_.referencePosition.value.setFromMatrixPosition(C.matrixWorld),_.nearDistance.value=C.shadow.camera.near,_.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function S0(r,t,e,n){let s={},o={},l=[];const c=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function h(C,b){const I=b.program;n.uniformBlockBinding(C,I)}function d(C,b){let I=s[C.id];I===void 0&&(M(C),I=f(C),s[C.id]=I,C.addEventListener("dispose",_));const N=b.program;n.updateUBOMapping(C,N);const F=t.render.frame;o[C.id]!==F&&(v(C),o[C.id]=F)}function f(C){const b=m();C.__bindingPointIndex=b;const I=r.createBuffer(),N=C.__size,F=C.usage;return r.bindBuffer(r.UNIFORM_BUFFER,I),r.bufferData(r.UNIFORM_BUFFER,N,F),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,b,I),I}function m(){for(let C=0;C<c;C++)if(l.indexOf(C)===-1)return l.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(C){const b=s[C.id],I=C.uniforms,N=C.__cache;r.bindBuffer(r.UNIFORM_BUFFER,b);for(let F=0,z=I.length;F<z;F++){const G=Array.isArray(I[F])?I[F]:[I[F]];for(let D=0,P=G.length;D<P;D++){const W=G[D];if(p(W,F,D,N)===!0){const O=W.__offset,B=Array.isArray(W.value)?W.value:[W.value];let A=0;for(let Z=0;Z<B.length;Z++){const at=B[Z],ot=y(at);typeof at=="number"||typeof at=="boolean"?(W.__data[0]=at,r.bufferSubData(r.UNIFORM_BUFFER,O+A,W.__data)):at.isMatrix3?(W.__data[0]=at.elements[0],W.__data[1]=at.elements[1],W.__data[2]=at.elements[2],W.__data[3]=0,W.__data[4]=at.elements[3],W.__data[5]=at.elements[4],W.__data[6]=at.elements[5],W.__data[7]=0,W.__data[8]=at.elements[6],W.__data[9]=at.elements[7],W.__data[10]=at.elements[8],W.__data[11]=0):(at.toArray(W.__data,A),A+=ot.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,W.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function p(C,b,I,N){const F=C.value,z=b+"_"+I;if(N[z]===void 0)return typeof F=="number"||typeof F=="boolean"?N[z]=F:N[z]=F.clone(),!0;{const G=N[z];if(typeof F=="number"||typeof F=="boolean"){if(G!==F)return N[z]=F,!0}else if(G.equals(F)===!1)return G.copy(F),!0}return!1}function M(C){const b=C.uniforms;let I=0;const N=16;for(let z=0,G=b.length;z<G;z++){const D=Array.isArray(b[z])?b[z]:[b[z]];for(let P=0,W=D.length;P<W;P++){const O=D[P],B=Array.isArray(O.value)?O.value:[O.value];for(let A=0,Z=B.length;A<Z;A++){const at=B[A],ot=y(at),Y=I%N;Y!==0&&N-Y<ot.boundary&&(I+=N-Y),O.__data=new Float32Array(ot.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=I,I+=ot.storage}}}const F=I%N;return F>0&&(I+=N-F),C.__size=I,C.__cache={},this}function y(C){const b={boundary:0,storage:0};return typeof C=="number"||typeof C=="boolean"?(b.boundary=4,b.storage=4):C.isVector2?(b.boundary=8,b.storage=8):C.isVector3||C.isColor?(b.boundary=16,b.storage=12):C.isVector4?(b.boundary=16,b.storage=16):C.isMatrix3?(b.boundary=48,b.storage=48):C.isMatrix4?(b.boundary=64,b.storage=64):C.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",C),b}function _(C){const b=C.target;b.removeEventListener("dispose",_);const I=l.indexOf(b.__bindingPointIndex);l.splice(I,1),r.deleteBuffer(s[b.id]),delete s[b.id],delete o[b.id]}function g(){for(const C in s)r.deleteBuffer(s[C]);l=[],s={},o={}}return{bind:h,update:d,dispose:g}}class b0{constructor(t={}){const{canvas:e=pp(),context:n=null,depth:s=!0,stencil:o=!1,alpha:l=!1,antialias:c=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:d=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:m=!1}=t;this.isWebGLRenderer=!0;let v;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");v=n.getContextAttributes().alpha}else v=l;const p=new Uint32Array(4),M=new Int32Array(4);let y=null,_=null;const g=[],C=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Hn,this._useLegacyLights=!1,this.toneMapping=Si,this.toneMappingExposure=1;const b=this;let I=!1,N=0,F=0,z=null,G=-1,D=null;const P=new Ve,W=new Ve;let O=null;const B=new ue(0);let A=0,Z=e.width,at=e.height,ot=1,Y=null,st=null;const rt=new Ve(0,0,Z,at),q=new Ve(0,0,Z,at);let Q=!1;const Ct=new ll;let J=!1,et=!1;const Mt=new Ae,bt=new yt,Pt=new nt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function zt(){return z===null?ot:1}let it=n;function vt(H,ct){const _t=e.getContext(H,ct);return _t!==null?_t:null}try{const H={alpha:!0,depth:s,stencil:o,antialias:c,premultipliedAlpha:h,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:m};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${sl}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),it===null){const ct="webgl2";if(it=vt(ct,H),it===null)throw vt(ct)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(H){throw console.error("THREE.WebGLRenderer: "+H.message),H}let xt,w,tt,K,T,S,k,X,$,V,ft,lt,pt,Et,wt,Tt,Ht,Ft,Dt,Kt,Gt,re,se,Jt;function Bt(){xt=new Rg(it),xt.init(),w=new Eg(it,xt,t),re=new f0(it,xt),tt=new u0(it),K=new Ng(it),T=new $v,S=new d0(it,xt,tt,T,w,re,K),k=new Ag(b),X=new Lg(b),$=new Bp(it),se=new bg(it,$),V=new Ig(it,$,K,se),ft=new Ug(it,V,$,K),Dt=new Og(it,w,S),Tt=new Tg(T),lt=new Kv(b,k,X,xt,w,se,Tt),pt=new M0(b,T),Et=new Qv,wt=new s0(xt),Ft=new Sg(b,k,X,tt,ft,v,h),Ht=new h0(b,ft,w),Jt=new S0(it,K,w,tt),Kt=new wg(it,xt,K),Gt=new Dg(it,xt,K),K.programs=lt.programs,b.capabilities=w,b.extensions=xt,b.properties=T,b.renderLists=Et,b.shadowMap=Ht,b.state=tt,b.info=K}Bt();const R=new x0(b,it);this.xr=R,this.getContext=function(){return it},this.getContextAttributes=function(){return it.getContextAttributes()},this.forceContextLoss=function(){const H=xt.get("WEBGL_lose_context");H&&H.loseContext()},this.forceContextRestore=function(){const H=xt.get("WEBGL_lose_context");H&&H.restoreContext()},this.getPixelRatio=function(){return ot},this.setPixelRatio=function(H){H!==void 0&&(ot=H,this.setSize(Z,at,!1))},this.getSize=function(H){return H.set(Z,at)},this.setSize=function(H,ct,_t=!0){if(R.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}Z=H,at=ct,e.width=Math.floor(H*ot),e.height=Math.floor(ct*ot),_t===!0&&(e.style.width=H+"px",e.style.height=ct+"px"),this.setViewport(0,0,H,ct)},this.getDrawingBufferSize=function(H){return H.set(Z*ot,at*ot).floor()},this.setDrawingBufferSize=function(H,ct,_t){Z=H,at=ct,ot=_t,e.width=Math.floor(H*_t),e.height=Math.floor(ct*_t),this.setViewport(0,0,H,ct)},this.getCurrentViewport=function(H){return H.copy(P)},this.getViewport=function(H){return H.copy(rt)},this.setViewport=function(H,ct,_t,gt){H.isVector4?rt.set(H.x,H.y,H.z,H.w):rt.set(H,ct,_t,gt),tt.viewport(P.copy(rt).multiplyScalar(ot).round())},this.getScissor=function(H){return H.copy(q)},this.setScissor=function(H,ct,_t,gt){H.isVector4?q.set(H.x,H.y,H.z,H.w):q.set(H,ct,_t,gt),tt.scissor(W.copy(q).multiplyScalar(ot).round())},this.getScissorTest=function(){return Q},this.setScissorTest=function(H){tt.setScissorTest(Q=H)},this.setOpaqueSort=function(H){Y=H},this.setTransparentSort=function(H){st=H},this.getClearColor=function(H){return H.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor.apply(Ft,arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha.apply(Ft,arguments)},this.clear=function(H=!0,ct=!0,_t=!0){let gt=0;if(H){let dt=!1;if(z!==null){const Ut=z.texture.format;dt=Ut===lu||Ut===au||Ut===ou}if(dt){const Ut=z.texture.type,Wt=Ut===bi||Ut===Dr||Ut===nu||Ut===xs||Ut===ru||Ut===su,Xt=Ft.getClearColor(),qt=Ft.getClearAlpha(),Qt=Xt.r,$t=Xt.g,te=Xt.b;Wt?(p[0]=Qt,p[1]=$t,p[2]=te,p[3]=qt,it.clearBufferuiv(it.COLOR,0,p)):(M[0]=Qt,M[1]=$t,M[2]=te,M[3]=qt,it.clearBufferiv(it.COLOR,0,M))}else gt|=it.COLOR_BUFFER_BIT}ct&&(gt|=it.DEPTH_BUFFER_BIT),_t&&(gt|=it.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),it.clear(gt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Et.dispose(),wt.dispose(),T.dispose(),k.dispose(),X.dispose(),ft.dispose(),se.dispose(),Jt.dispose(),lt.dispose(),R.dispose(),R.removeEventListener("sessionstart",Ee),R.removeEventListener("sessionend",Se),Je.stop()};function ut(H){H.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),I=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),I=!1;const H=K.autoReset,ct=Ht.enabled,_t=Ht.autoUpdate,gt=Ht.needsUpdate,dt=Ht.type;Bt(),K.autoReset=H,Ht.enabled=ct,Ht.autoUpdate=_t,Ht.needsUpdate=gt,Ht.type=dt}function Rt(H){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",H.statusMessage)}function Nt(H){const ct=H.target;ct.removeEventListener("dispose",Nt),ne(ct)}function ne(H){ce(H),T.remove(H)}function ce(H){const ct=T.get(H).programs;ct!==void 0&&(ct.forEach(function(_t){lt.releaseProgram(_t)}),H.isShaderMaterial&&lt.releaseShaderCache(H))}this.renderBufferDirect=function(H,ct,_t,gt,dt,Ut){ct===null&&(ct=It);const Wt=dt.isMesh&&dt.matrixWorld.determinant()<0,Xt=bs(H,ct,_t,gt,dt);tt.setMaterial(gt,Wt);let qt=_t.index,Qt=1;if(gt.wireframe===!0){if(qt=V.getWireframeAttribute(_t),qt===void 0)return;Qt=2}const $t=_t.drawRange,te=_t.attributes.position;let be=$t.start*Qt,Qe=($t.start+$t.count)*Qt;Ut!==null&&(be=Math.max(be,Ut.start*Qt),Qe=Math.min(Qe,(Ut.start+Ut.count)*Qt)),qt!==null?(be=Math.max(be,0),Qe=Math.min(Qe,qt.count)):te!=null&&(be=Math.max(be,0),Qe=Math.min(Qe,te.count));const Te=Qe-be;if(Te<0||Te===1/0)return;se.setup(dt,gt,Xt,_t,qt);let tn,ve=Kt;if(qt!==null&&(tn=$.get(qt),ve=Gt,ve.setIndex(tn)),dt.isMesh)gt.wireframe===!0?(tt.setLineWidth(gt.wireframeLinewidth*zt()),ve.setMode(it.LINES)):ve.setMode(it.TRIANGLES);else if(dt.isLine){let ee=gt.linewidth;ee===void 0&&(ee=1),tt.setLineWidth(ee*zt()),dt.isLineSegments?ve.setMode(it.LINES):dt.isLineLoop?ve.setMode(it.LINE_LOOP):ve.setMode(it.LINE_STRIP)}else dt.isPoints?ve.setMode(it.POINTS):dt.isSprite&&ve.setMode(it.TRIANGLES);if(dt.isBatchedMesh)ve.renderMultiDraw(dt._multiDrawStarts,dt._multiDrawCounts,dt._multiDrawCount);else if(dt.isInstancedMesh)ve.renderInstances(be,Te,dt.count);else if(_t.isInstancedBufferGeometry){const ee=_t._maxInstanceCount!==void 0?_t._maxInstanceCount:1/0,qn=Math.min(_t.instanceCount,ee);ve.renderInstances(be,Te,qn)}else ve.render(be,Te)};function ge(H,ct,_t){H.transparent===!0&&H.side===_n&&H.forceSinglePass===!1?(H.side=un,H.needsUpdate=!0,Ai(H,ct,_t),H.side=wi,H.needsUpdate=!0,Ai(H,ct,_t),H.side=_n):Ai(H,ct,_t)}this.compile=function(H,ct,_t=null){_t===null&&(_t=H),_=wt.get(_t),_.init(),C.push(_),_t.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(_.pushLight(dt),dt.castShadow&&_.pushShadow(dt))}),H!==_t&&H.traverseVisible(function(dt){dt.isLight&&dt.layers.test(ct.layers)&&(_.pushLight(dt),dt.castShadow&&_.pushShadow(dt))}),_.setupLights(b._useLegacyLights);const gt=new Set;return H.traverse(function(dt){const Ut=dt.material;if(Ut)if(Array.isArray(Ut))for(let Wt=0;Wt<Ut.length;Wt++){const Xt=Ut[Wt];ge(Xt,_t,dt),gt.add(Xt)}else ge(Ut,_t,dt),gt.add(Ut)}),C.pop(),_=null,gt},this.compileAsync=function(H,ct,_t=null){const gt=this.compile(H,ct,_t);return new Promise(dt=>{function Ut(){if(gt.forEach(function(Wt){T.get(Wt).currentProgram.isReady()&&gt.delete(Wt)}),gt.size===0){dt(H);return}setTimeout(Ut,10)}xt.get("KHR_parallel_shader_compile")!==null?Ut():setTimeout(Ut,10)})};let Re=null;function me(H){Re&&Re(H)}function Ee(){Je.stop()}function Se(){Je.start()}const Je=new wu;Je.setAnimationLoop(me),typeof self<"u"&&Je.setContext(self),this.setAnimationLoop=function(H){Re=H,R.setAnimationLoop(H),H===null?Je.stop():Je.start()},R.addEventListener("sessionstart",Ee),R.addEventListener("sessionend",Se),this.render=function(H,ct){if(ct!==void 0&&ct.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ct.parent===null&&ct.matrixWorldAutoUpdate===!0&&ct.updateMatrixWorld(),R.enabled===!0&&R.isPresenting===!0&&(R.cameraAutoUpdate===!0&&R.updateCamera(ct),ct=R.getCamera()),H.isScene===!0&&H.onBeforeRender(b,H,ct,z),_=wt.get(H,C.length),_.init(),C.push(_),Mt.multiplyMatrices(ct.projectionMatrix,ct.matrixWorldInverse),Ct.setFromProjectionMatrix(Mt),et=this.localClippingEnabled,J=Tt.init(this.clippingPlanes,et),y=Et.get(H,g.length),y.init(),g.push(y),an(H,ct,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(Y,st),this.info.render.frame++,J===!0&&Tt.beginShadows();const _t=_.state.shadowsArray;if(Ht.render(_t,H,ct),J===!0&&Tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(R.enabled===!1||R.isPresenting===!1||R.hasDepthSensing()===!1)&&Ft.render(y,H),_.setupLights(b._useLegacyLights),ct.isArrayCamera){const gt=ct.cameras;for(let dt=0,Ut=gt.length;dt<Ut;dt++){const Wt=gt[dt];Un(y,H,Wt,Wt.viewport)}}else Un(y,H,ct);z!==null&&(S.updateMultisampleRenderTarget(z),S.updateRenderTargetMipmap(z)),H.isScene===!0&&H.onAfterRender(b,H,ct),se.resetDefaultState(),G=-1,D=null,C.pop(),C.length>0?_=C[C.length-1]:_=null,g.pop(),g.length>0?y=g[g.length-1]:y=null};function an(H,ct,_t,gt){if(H.visible===!1)return;if(H.layers.test(ct.layers)){if(H.isGroup)_t=H.renderOrder;else if(H.isLOD)H.autoUpdate===!0&&H.update(ct);else if(H.isLight)_.pushLight(H),H.castShadow&&_.pushShadow(H);else if(H.isSprite){if(!H.frustumCulled||Ct.intersectsSprite(H)){gt&&Pt.setFromMatrixPosition(H.matrixWorld).applyMatrix4(Mt);const Wt=ft.update(H),Xt=H.material;Xt.visible&&y.push(H,Wt,Xt,_t,Pt.z,null)}}else if((H.isMesh||H.isLine||H.isPoints)&&(!H.frustumCulled||Ct.intersectsObject(H))){const Wt=ft.update(H),Xt=H.material;if(gt&&(H.boundingSphere!==void 0?(H.boundingSphere===null&&H.computeBoundingSphere(),Pt.copy(H.boundingSphere.center)):(Wt.boundingSphere===null&&Wt.computeBoundingSphere(),Pt.copy(Wt.boundingSphere.center)),Pt.applyMatrix4(H.matrixWorld).applyMatrix4(Mt)),Array.isArray(Xt)){const qt=Wt.groups;for(let Qt=0,$t=qt.length;Qt<$t;Qt++){const te=qt[Qt],be=Xt[te.materialIndex];be&&be.visible&&y.push(H,Wt,be,_t,Pt.z,te)}}else Xt.visible&&y.push(H,Wt,Xt,_t,Pt.z,null)}}const Ut=H.children;for(let Wt=0,Xt=Ut.length;Wt<Xt;Wt++)an(Ut[Wt],ct,_t,gt)}function Un(H,ct,_t,gt){const dt=H.opaque,Ut=H.transmissive,Wt=H.transparent;_.setupLightsView(_t),J===!0&&Tt.setGlobalState(b.clippingPlanes,_t),Ut.length>0&&ai(dt,Ut,ct,_t),gt&&tt.viewport(P.copy(gt)),dt.length>0&&Fe(dt,ct,_t),Ut.length>0&&Fe(Ut,ct,_t),Wt.length>0&&Fe(Wt,ct,_t),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function ai(H,ct,_t,gt){if((_t.isScene===!0?_t.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget===null){_.state.transmissionRenderTarget=new Yi(1,1,{generateMipmaps:!0,type:xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float")?So:bi,minFilter:qi,samples:4,stencilBuffer:o});const Qt=T.get(_.state.transmissionRenderTarget);Qt.__isTransmissionRenderTarget=!0}const Ut=_.state.transmissionRenderTarget;b.getDrawingBufferSize(bt),Ut.setSize(bt.x,bt.y);const Wt=b.getRenderTarget();b.setRenderTarget(Ut),b.getClearColor(B),A=b.getClearAlpha(),A<1&&b.setClearColor(16777215,.5),b.clear();const Xt=b.toneMapping;b.toneMapping=Si,Fe(H,_t,gt),S.updateMultisampleRenderTarget(Ut),S.updateRenderTargetMipmap(Ut);let qt=!1;for(let Qt=0,$t=ct.length;Qt<$t;Qt++){const te=ct[Qt],be=te.object,Qe=te.geometry,Te=te.material,tn=te.group;if(Te.side===_n&&be.layers.test(gt.layers)){const ve=Te.side;Te.side=un,Te.needsUpdate=!0,Vt(be,_t,gt,Qe,Te,tn),Te.side=ve,Te.needsUpdate=!0,qt=!0}}qt===!0&&(S.updateMultisampleRenderTarget(Ut),S.updateRenderTargetMipmap(Ut)),b.setRenderTarget(Wt),b.setClearColor(B,A),b.toneMapping=Xt}function Fe(H,ct,_t){const gt=ct.isScene===!0?ct.overrideMaterial:null;for(let dt=0,Ut=H.length;dt<Ut;dt++){const Wt=H[dt],Xt=Wt.object,qt=Wt.geometry,Qt=gt===null?Wt.material:gt,$t=Wt.group;Xt.layers.test(_t.layers)&&Vt(Xt,ct,_t,qt,Qt,$t)}}function Vt(H,ct,_t,gt,dt,Ut){H.onBeforeRender(b,ct,_t,gt,dt,Ut),H.modelViewMatrix.multiplyMatrices(_t.matrixWorldInverse,H.matrixWorld),H.normalMatrix.getNormalMatrix(H.modelViewMatrix),dt.onBeforeRender(b,ct,_t,gt,H,Ut),dt.transparent===!0&&dt.side===_n&&dt.forceSinglePass===!1?(dt.side=un,dt.needsUpdate=!0,b.renderBufferDirect(_t,ct,gt,dt,H,Ut),dt.side=wi,dt.needsUpdate=!0,b.renderBufferDirect(_t,ct,gt,dt,H,Ut),dt.side=_n):b.renderBufferDirect(_t,ct,gt,dt,H,Ut),H.onAfterRender(b,ct,_t,gt,dt,Ut)}function Ai(H,ct,_t){ct.isScene!==!0&&(ct=It);const gt=T.get(H),dt=_.state.lights,Ut=_.state.shadowsArray,Wt=dt.state.version,Xt=lt.getParameters(H,dt.state,Ut,ct,_t),qt=lt.getProgramCacheKey(Xt);let Qt=gt.programs;gt.environment=H.isMeshStandardMaterial?ct.environment:null,gt.fog=ct.fog,gt.envMap=(H.isMeshStandardMaterial?X:k).get(H.envMap||gt.environment),gt.envMapRotation=gt.environment!==null&&H.envMap===null?ct.environmentRotation:H.envMapRotation,Qt===void 0&&(H.addEventListener("dispose",Nt),Qt=new Map,gt.programs=Qt);let $t=Qt.get(qt);if($t!==void 0){if(gt.currentProgram===$t&&gt.lightsStateVersion===Wt)return Fr(H,Xt),$t}else Xt.uniforms=lt.getUniforms(H),H.onBuild(_t,Xt,b),H.onBeforeCompile(Xt,b),$t=lt.acquireProgram(Xt,qt),Qt.set(qt,$t),gt.uniforms=Xt.uniforms;const te=gt.uniforms;return(!H.isShaderMaterial&&!H.isRawShaderMaterial||H.clipping===!0)&&(te.clippingPlanes=Tt.uniform),Fr(H,Xt),gt.needsLights=ws(H),gt.lightsStateVersion=Wt,gt.needsLights&&(te.ambientLightColor.value=dt.state.ambient,te.lightProbe.value=dt.state.probe,te.directionalLights.value=dt.state.directional,te.directionalLightShadows.value=dt.state.directionalShadow,te.spotLights.value=dt.state.spot,te.spotLightShadows.value=dt.state.spotShadow,te.rectAreaLights.value=dt.state.rectArea,te.ltc_1.value=dt.state.rectAreaLTC1,te.ltc_2.value=dt.state.rectAreaLTC2,te.pointLights.value=dt.state.point,te.pointLightShadows.value=dt.state.pointShadow,te.hemisphereLights.value=dt.state.hemi,te.directionalShadowMap.value=dt.state.directionalShadowMap,te.directionalShadowMatrix.value=dt.state.directionalShadowMatrix,te.spotShadowMap.value=dt.state.spotShadowMap,te.spotLightMatrix.value=dt.state.spotLightMatrix,te.spotLightMap.value=dt.state.spotLightMap,te.pointShadowMap.value=dt.state.pointShadowMap,te.pointShadowMatrix.value=dt.state.pointShadowMatrix),gt.currentProgram=$t,gt.uniformsList=null,$t}function zr(H){if(H.uniformsList===null){const ct=H.currentProgram.getUniforms();H.uniformsList=vo.seqWithValue(ct.seq,H.uniforms)}return H.uniformsList}function Fr(H,ct){const _t=T.get(H);_t.outputColorSpace=ct.outputColorSpace,_t.batching=ct.batching,_t.instancing=ct.instancing,_t.instancingColor=ct.instancingColor,_t.instancingMorph=ct.instancingMorph,_t.skinning=ct.skinning,_t.morphTargets=ct.morphTargets,_t.morphNormals=ct.morphNormals,_t.morphColors=ct.morphColors,_t.morphTargetsCount=ct.morphTargetsCount,_t.numClippingPlanes=ct.numClippingPlanes,_t.numIntersection=ct.numClipIntersection,_t.vertexAlphas=ct.vertexAlphas,_t.vertexTangents=ct.vertexTangents,_t.toneMapping=ct.toneMapping}function bs(H,ct,_t,gt,dt){ct.isScene!==!0&&(ct=It),S.resetTextureUnits();const Ut=ct.fog,Wt=gt.isMeshStandardMaterial?ct.environment:null,Xt=z===null?b.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Ti,qt=(gt.isMeshStandardMaterial?X:k).get(gt.envMap||Wt),Qt=gt.vertexColors===!0&&!!_t.attributes.color&&_t.attributes.color.itemSize===4,$t=!!_t.attributes.tangent&&(!!gt.normalMap||gt.anisotropy>0),te=!!_t.morphAttributes.position,be=!!_t.morphAttributes.normal,Qe=!!_t.morphAttributes.color;let Te=Si;gt.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Te=b.toneMapping);const tn=_t.morphAttributes.position||_t.morphAttributes.normal||_t.morphAttributes.color,ve=tn!==void 0?tn.length:0,ee=T.get(gt),qn=_.state.lights;if(J===!0&&(et===!0||H!==D)){const Xe=H===D&&gt.id===G;Tt.setState(gt,H,Xe)}let Zt=!1;gt.version===ee.__version?(ee.needsLights&&ee.lightsStateVersion!==qn.state.version||ee.outputColorSpace!==Xt||dt.isBatchedMesh&&ee.batching===!1||!dt.isBatchedMesh&&ee.batching===!0||dt.isInstancedMesh&&ee.instancing===!1||!dt.isInstancedMesh&&ee.instancing===!0||dt.isSkinnedMesh&&ee.skinning===!1||!dt.isSkinnedMesh&&ee.skinning===!0||dt.isInstancedMesh&&ee.instancingColor===!0&&dt.instanceColor===null||dt.isInstancedMesh&&ee.instancingColor===!1&&dt.instanceColor!==null||dt.isInstancedMesh&&ee.instancingMorph===!0&&dt.morphTexture===null||dt.isInstancedMesh&&ee.instancingMorph===!1&&dt.morphTexture!==null||ee.envMap!==qt||gt.fog===!0&&ee.fog!==Ut||ee.numClippingPlanes!==void 0&&(ee.numClippingPlanes!==Tt.numPlanes||ee.numIntersection!==Tt.numIntersection)||ee.vertexAlphas!==Qt||ee.vertexTangents!==$t||ee.morphTargets!==te||ee.morphNormals!==be||ee.morphColors!==Qe||ee.toneMapping!==Te||ee.morphTargetsCount!==ve)&&(Zt=!0):(Zt=!0,ee.__version=gt.version);let fe=ee.currentProgram;Zt===!0&&(fe=Ai(gt,ct,dt));let Ci=!1,yn=!1,zn=!1;const Ie=fe.getUniforms(),Yt=ee.uniforms;if(tt.useProgram(fe.program)&&(Ci=!0,yn=!0,zn=!0),gt.id!==G&&(G=gt.id,yn=!0),Ci||D!==H){Ie.setValue(it,"projectionMatrix",H.projectionMatrix),Ie.setValue(it,"viewMatrix",H.matrixWorldInverse);const Xe=Ie.map.cameraPosition;Xe!==void 0&&Xe.setValue(it,Pt.setFromMatrixPosition(H.matrixWorld)),w.logarithmicDepthBuffer&&Ie.setValue(it,"logDepthBufFC",2/(Math.log(H.far+1)/Math.LN2)),(gt.isMeshPhongMaterial||gt.isMeshToonMaterial||gt.isMeshLambertMaterial||gt.isMeshBasicMaterial||gt.isMeshStandardMaterial||gt.isShaderMaterial)&&Ie.setValue(it,"isOrthographic",H.isOrthographicCamera===!0),D!==H&&(D=H,yn=!0,zn=!0)}if(dt.isSkinnedMesh){Ie.setOptional(it,dt,"bindMatrix"),Ie.setOptional(it,dt,"bindMatrixInverse");const Xe=dt.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),Ie.setValue(it,"boneTexture",Xe.boneTexture,S))}dt.isBatchedMesh&&(Ie.setOptional(it,dt,"batchingTexture"),Ie.setValue(it,"batchingTexture",dt._matricesTexture,S));const ye=_t.morphAttributes;if((ye.position!==void 0||ye.normal!==void 0||ye.color!==void 0)&&Dt.update(dt,_t,fe),(yn||ee.receiveShadow!==dt.receiveShadow)&&(ee.receiveShadow=dt.receiveShadow,Ie.setValue(it,"receiveShadow",dt.receiveShadow)),gt.isMeshGouraudMaterial&&gt.envMap!==null&&(Yt.envMap.value=qt,Yt.flipEnvMap.value=qt.isCubeTexture&&qt.isRenderTargetTexture===!1?-1:1),gt.isMeshStandardMaterial&&gt.envMap===null&&ct.environment!==null&&(Yt.envMapIntensity.value=ct.environmentIntensity),yn&&(Ie.setValue(it,"toneMappingExposure",b.toneMappingExposure),ee.needsLights&&kr(Yt,zn),Ut&&gt.fog===!0&&pt.refreshFogUniforms(Yt,Ut),pt.refreshMaterialUniforms(Yt,gt,ot,at,_.state.transmissionRenderTarget),vo.upload(it,zr(ee),Yt,S)),gt.isShaderMaterial&&gt.uniformsNeedUpdate===!0&&(vo.upload(it,zr(ee),Yt,S),gt.uniformsNeedUpdate=!1),gt.isSpriteMaterial&&Ie.setValue(it,"center",dt.center),Ie.setValue(it,"modelViewMatrix",dt.modelViewMatrix),Ie.setValue(it,"normalMatrix",dt.normalMatrix),Ie.setValue(it,"modelMatrix",dt.matrixWorld),gt.isShaderMaterial||gt.isRawShaderMaterial){const Xe=gt.uniformsGroups;for(let li=0,ln=Xe.length;li<ln;li++){const Es=Xe[li];Jt.update(Es,fe),Jt.bind(Es,fe)}}return fe}function kr(H,ct){H.ambientLightColor.needsUpdate=ct,H.lightProbe.needsUpdate=ct,H.directionalLights.needsUpdate=ct,H.directionalLightShadows.needsUpdate=ct,H.pointLights.needsUpdate=ct,H.pointLightShadows.needsUpdate=ct,H.spotLights.needsUpdate=ct,H.spotLightShadows.needsUpdate=ct,H.rectAreaLights.needsUpdate=ct,H.hemisphereLights.needsUpdate=ct}function ws(H){return H.isMeshLambertMaterial||H.isMeshToonMaterial||H.isMeshPhongMaterial||H.isMeshStandardMaterial||H.isShadowMaterial||H.isShaderMaterial&&H.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(H,ct,_t){T.get(H.texture).__webglTexture=ct,T.get(H.depthTexture).__webglTexture=_t;const gt=T.get(H);gt.__hasExternalTextures=!0,gt.__autoAllocateDepthBuffer=_t===void 0,gt.__autoAllocateDepthBuffer||xt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),gt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(H,ct){const _t=T.get(H);_t.__webglFramebuffer=ct,_t.__useDefaultFramebuffer=ct===void 0},this.setRenderTarget=function(H,ct=0,_t=0){z=H,N=ct,F=_t;let gt=!0,dt=null,Ut=!1,Wt=!1;if(H){const qt=T.get(H);qt.__useDefaultFramebuffer!==void 0?(tt.bindFramebuffer(it.FRAMEBUFFER,null),gt=!1):qt.__webglFramebuffer===void 0?S.setupRenderTarget(H):qt.__hasExternalTextures&&S.rebindTextures(H,T.get(H.texture).__webglTexture,T.get(H.depthTexture).__webglTexture);const Qt=H.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(Wt=!0);const $t=T.get(H).__webglFramebuffer;H.isWebGLCubeRenderTarget?(Array.isArray($t[ct])?dt=$t[ct][_t]:dt=$t[ct],Ut=!0):H.samples>0&&S.useMultisampledRTT(H)===!1?dt=T.get(H).__webglMultisampledFramebuffer:Array.isArray($t)?dt=$t[_t]:dt=$t,P.copy(H.viewport),W.copy(H.scissor),O=H.scissorTest}else P.copy(rt).multiplyScalar(ot).floor(),W.copy(q).multiplyScalar(ot).floor(),O=Q;if(tt.bindFramebuffer(it.FRAMEBUFFER,dt)&&gt&&tt.drawBuffers(H,dt),tt.viewport(P),tt.scissor(W),tt.setScissorTest(O),Ut){const qt=T.get(H.texture);it.framebufferTexture2D(it.FRAMEBUFFER,it.COLOR_ATTACHMENT0,it.TEXTURE_CUBE_MAP_POSITIVE_X+ct,qt.__webglTexture,_t)}else if(Wt){const qt=T.get(H.texture),Qt=ct||0;it.framebufferTextureLayer(it.FRAMEBUFFER,it.COLOR_ATTACHMENT0,qt.__webglTexture,_t||0,Qt)}G=-1},this.readRenderTargetPixels=function(H,ct,_t,gt,dt,Ut,Wt){if(!(H&&H.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xt=T.get(H).__webglFramebuffer;if(H.isWebGLCubeRenderTarget&&Wt!==void 0&&(Xt=Xt[Wt]),Xt){tt.bindFramebuffer(it.FRAMEBUFFER,Xt);try{const qt=H.texture,Qt=qt.format,$t=qt.type;if(Qt!==Wn&&re.convert(Qt)!==it.getParameter(it.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const te=$t===So&&(xt.has("EXT_color_buffer_half_float")||xt.has("EXT_color_buffer_float"));if($t!==bi&&re.convert($t)!==it.getParameter(it.IMPLEMENTATION_COLOR_READ_TYPE)&&$t!==yi&&!te){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ct>=0&&ct<=H.width-gt&&_t>=0&&_t<=H.height-dt&&it.readPixels(ct,_t,gt,dt,re.convert(Qt),re.convert($t),Ut)}finally{const qt=z!==null?T.get(z).__webglFramebuffer:null;tt.bindFramebuffer(it.FRAMEBUFFER,qt)}}},this.copyFramebufferToTexture=function(H,ct,_t=0){const gt=Math.pow(2,-_t),dt=Math.floor(ct.image.width*gt),Ut=Math.floor(ct.image.height*gt);S.setTexture2D(ct,0),it.copyTexSubImage2D(it.TEXTURE_2D,_t,0,0,H.x,H.y,dt,Ut),tt.unbindTexture()},this.copyTextureToTexture=function(H,ct,_t,gt=0){const dt=ct.image.width,Ut=ct.image.height,Wt=re.convert(_t.format),Xt=re.convert(_t.type);S.setTexture2D(_t,0),it.pixelStorei(it.UNPACK_FLIP_Y_WEBGL,_t.flipY),it.pixelStorei(it.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_t.premultiplyAlpha),it.pixelStorei(it.UNPACK_ALIGNMENT,_t.unpackAlignment),ct.isDataTexture?it.texSubImage2D(it.TEXTURE_2D,gt,H.x,H.y,dt,Ut,Wt,Xt,ct.image.data):ct.isCompressedTexture?it.compressedTexSubImage2D(it.TEXTURE_2D,gt,H.x,H.y,ct.mipmaps[0].width,ct.mipmaps[0].height,Wt,ct.mipmaps[0].data):it.texSubImage2D(it.TEXTURE_2D,gt,H.x,H.y,Wt,Xt,ct.image),gt===0&&_t.generateMipmaps&&it.generateMipmap(it.TEXTURE_2D),tt.unbindTexture()},this.copyTextureToTexture3D=function(H,ct,_t,gt,dt=0){const Ut=Math.round(H.max.x-H.min.x),Wt=Math.round(H.max.y-H.min.y),Xt=H.max.z-H.min.z+1,qt=re.convert(gt.format),Qt=re.convert(gt.type);let $t;if(gt.isData3DTexture)S.setTexture3D(gt,0),$t=it.TEXTURE_3D;else if(gt.isDataArrayTexture||gt.isCompressedArrayTexture)S.setTexture2DArray(gt,0),$t=it.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}it.pixelStorei(it.UNPACK_FLIP_Y_WEBGL,gt.flipY),it.pixelStorei(it.UNPACK_PREMULTIPLY_ALPHA_WEBGL,gt.premultiplyAlpha),it.pixelStorei(it.UNPACK_ALIGNMENT,gt.unpackAlignment);const te=it.getParameter(it.UNPACK_ROW_LENGTH),be=it.getParameter(it.UNPACK_IMAGE_HEIGHT),Qe=it.getParameter(it.UNPACK_SKIP_PIXELS),Te=it.getParameter(it.UNPACK_SKIP_ROWS),tn=it.getParameter(it.UNPACK_SKIP_IMAGES),ve=_t.isCompressedTexture?_t.mipmaps[dt]:_t.image;it.pixelStorei(it.UNPACK_ROW_LENGTH,ve.width),it.pixelStorei(it.UNPACK_IMAGE_HEIGHT,ve.height),it.pixelStorei(it.UNPACK_SKIP_PIXELS,H.min.x),it.pixelStorei(it.UNPACK_SKIP_ROWS,H.min.y),it.pixelStorei(it.UNPACK_SKIP_IMAGES,H.min.z),_t.isDataTexture||_t.isData3DTexture?it.texSubImage3D($t,dt,ct.x,ct.y,ct.z,Ut,Wt,Xt,qt,Qt,ve.data):gt.isCompressedArrayTexture?it.compressedTexSubImage3D($t,dt,ct.x,ct.y,ct.z,Ut,Wt,Xt,qt,ve.data):it.texSubImage3D($t,dt,ct.x,ct.y,ct.z,Ut,Wt,Xt,qt,Qt,ve),it.pixelStorei(it.UNPACK_ROW_LENGTH,te),it.pixelStorei(it.UNPACK_IMAGE_HEIGHT,be),it.pixelStorei(it.UNPACK_SKIP_PIXELS,Qe),it.pixelStorei(it.UNPACK_SKIP_ROWS,Te),it.pixelStorei(it.UNPACK_SKIP_IMAGES,tn),dt===0&&gt.generateMipmaps&&it.generateMipmap($t),tt.unbindTexture()},this.initTexture=function(H){H.isCubeTexture?S.setTextureCube(H,0):H.isData3DTexture?S.setTexture3D(H,0):H.isDataArrayTexture||H.isCompressedArrayTexture?S.setTexture2DArray(H,0):S.setTexture2D(H,0),tt.unbindTexture()},this.resetState=function(){N=0,F=0,z=null,tt.reset(),se.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ol?"display-p3":"srgb",e.unpackColorSpace=_e.workingColorSpace===Ro?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class w0 extends $e{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zn,this.environmentIntensity=1,this.environmentRotation=new Zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Xn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let l=1;l<=t;l++)n=this.getPoint(l/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let l;e?l=e:l=t*n[o-1];let c=0,h=o-1,d;for(;c<=h;)if(s=Math.floor(c+(h-c)/2),d=n[s]-l,d<0)c=s+1;else if(d>0)h=s-1;else{h=s;break}if(s=h,n[s]===l)return s/(o-1);const f=n[s],v=n[s+1]-f,p=(l-f)/v;return(s+p)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const l=this.getPoint(s),c=this.getPoint(o),h=e||(l.isVector2?new yt:new nt);return h.copy(c).sub(l).normalize(),h}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new nt,s=[],o=[],l=[],c=new nt,h=new Ae;for(let p=0;p<=t;p++){const M=p/t;s[p]=this.getTangentAt(M,new nt)}o[0]=new nt,l[0]=new nt;let d=Number.MAX_VALUE;const f=Math.abs(s[0].x),m=Math.abs(s[0].y),v=Math.abs(s[0].z);f<=d&&(d=f,n.set(1,0,0)),m<=d&&(d=m,n.set(0,1,0)),v<=d&&n.set(0,0,1),c.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],c),l[0].crossVectors(s[0],o[0]);for(let p=1;p<=t;p++){if(o[p]=o[p-1].clone(),l[p]=l[p-1].clone(),c.crossVectors(s[p-1],s[p]),c.length()>Number.EPSILON){c.normalize();const M=Math.acos(Ge(s[p-1].dot(s[p]),-1,1));o[p].applyMatrix4(h.makeRotationAxis(c,M))}l[p].crossVectors(s[p],o[p])}if(e===!0){let p=Math.acos(Ge(o[0].dot(o[t]),-1,1));p/=t,s[0].dot(c.crossVectors(o[0],o[t]))>0&&(p=-p);for(let M=1;M<=t;M++)o[M].applyMatrix4(h.makeRotationAxis(s[M],p*M)),l[M].crossVectors(s[M],o[M])}return{tangents:s,normals:o,binormals:l}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class hl extends Xn{constructor(t=0,e=0,n=1,s=1,o=0,l=Math.PI*2,c=!1,h=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=l,this.aClockwise=c,this.aRotation=h}getPoint(t,e=new yt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const l=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(l?o=0:o=s),this.aClockwise===!0&&!l&&(o===s?o=-s:o=o-s);const c=this.aStartAngle+t*o;let h=this.aX+this.xRadius*Math.cos(c),d=this.aY+this.yRadius*Math.sin(c);if(this.aRotation!==0){const f=Math.cos(this.aRotation),m=Math.sin(this.aRotation),v=h-this.aX,p=d-this.aY;h=v*f-p*m+this.aX,d=v*m+p*f+this.aY}return n.set(h,d)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class E0 extends hl{constructor(t,e,n,s,o,l){super(t,e,n,n,s,o,l),this.isArcCurve=!0,this.type="ArcCurve"}}function ul(){let r=0,t=0,e=0,n=0;function s(o,l,c,h){r=o,t=c,e=-3*o+3*l-2*c-h,n=2*o-2*l+c+h}return{initCatmullRom:function(o,l,c,h,d){s(l,c,d*(c-o),d*(h-l))},initNonuniformCatmullRom:function(o,l,c,h,d,f,m){let v=(l-o)/d-(c-o)/(d+f)+(c-l)/f,p=(c-l)/f-(h-l)/(f+m)+(h-c)/m;v*=f,p*=f,s(l,c,v,p)},calc:function(o){const l=o*o,c=l*o;return r+t*o+e*l+n*c}}}const co=new nt,Ua=new ul,za=new ul,Fa=new ul;class T0 extends Xn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new nt){const n=e,s=this.points,o=s.length,l=(o-(this.closed?0:1))*t;let c=Math.floor(l),h=l-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/o)+1)*o:h===0&&c===o-1&&(c=o-2,h=1);let d,f;this.closed||c>0?d=s[(c-1)%o]:(co.subVectors(s[0],s[1]).add(s[0]),d=co);const m=s[c%o],v=s[(c+1)%o];if(this.closed||c+2<o?f=s[(c+2)%o]:(co.subVectors(s[o-1],s[o-2]).add(s[o-1]),f=co),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let M=Math.pow(d.distanceToSquared(m),p),y=Math.pow(m.distanceToSquared(v),p),_=Math.pow(v.distanceToSquared(f),p);y<1e-4&&(y=1),M<1e-4&&(M=y),_<1e-4&&(_=y),Ua.initNonuniformCatmullRom(d.x,m.x,v.x,f.x,M,y,_),za.initNonuniformCatmullRom(d.y,m.y,v.y,f.y,M,y,_),Fa.initNonuniformCatmullRom(d.z,m.z,v.z,f.z,M,y,_)}else this.curveType==="catmullrom"&&(Ua.initCatmullRom(d.x,m.x,v.x,f.x,this.tension),za.initCatmullRom(d.y,m.y,v.y,f.y,this.tension),Fa.initCatmullRom(d.z,m.z,v.z,f.z,this.tension));return n.set(Ua.calc(h),za.calc(h),Fa.calc(h)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new nt().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Lh(r,t,e,n,s){const o=(n-t)*.5,l=(s-e)*.5,c=r*r,h=r*c;return(2*e-2*n+o+l)*h+(-3*e+3*n-2*o-l)*c+o*r+e}function A0(r,t){const e=1-r;return e*e*t}function C0(r,t){return 2*(1-r)*r*t}function P0(r,t){return r*r*t}function ls(r,t,e,n){return A0(r,t)+C0(r,e)+P0(r,n)}function L0(r,t){const e=1-r;return e*e*e*t}function R0(r,t){const e=1-r;return 3*e*e*r*t}function I0(r,t){return 3*(1-r)*r*r*t}function D0(r,t){return r*r*r*t}function cs(r,t,e,n,s){return L0(r,t)+R0(r,e)+I0(r,n)+D0(r,s)}class Iu extends Xn{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(cs(t,s.x,o.x,l.x,c.x),cs(t,s.y,o.y,l.y,c.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class N0 extends Xn{constructor(t=new nt,e=new nt,n=new nt,s=new nt){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new nt){const n=e,s=this.v0,o=this.v1,l=this.v2,c=this.v3;return n.set(cs(t,s.x,o.x,l.x,c.x),cs(t,s.y,o.y,l.y,c.y),cs(t,s.z,o.z,l.z,c.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Du extends Xn{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class O0 extends Xn{constructor(t=new nt,e=new nt){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nu extends Xn{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(ls(t,s.x,o.x,l.x),ls(t,s.y,o.y,l.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class U0 extends Xn{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,s=this.v0,o=this.v1,l=this.v2;return n.set(ls(t,s.x,o.x,l.x),ls(t,s.y,o.y,l.y),ls(t,s.z,o.z,l.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ou extends Xn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){const n=e,s=this.points,o=(s.length-1)*t,l=Math.floor(o),c=o-l,h=s[l===0?l:l-1],d=s[l],f=s[l>s.length-2?s.length-1:l+1],m=s[l>s.length-3?s.length-1:l+2];return n.set(Lh(c,h.x,d.x,f.x,m.x),Lh(c,h.y,d.y,f.y,m.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new yt().fromArray(s))}return this}}var tl=Object.freeze({__proto__:null,ArcCurve:E0,CatmullRomCurve3:T0,CubicBezierCurve:Iu,CubicBezierCurve3:N0,EllipseCurve:hl,LineCurve:Du,LineCurve3:O0,QuadraticBezierCurve:Nu,QuadraticBezierCurve3:U0,SplineCurve:Ou});class z0 extends Xn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new tl[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const l=s[o]-n,c=this.curves[o],h=c.getLength(),d=h===0?0:1-l/h;return c.getPointAt(d,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const l=o[s],c=l.isEllipseCurve?t*2:l.isLineCurve||l.isLineCurve3?1:l.isSplineCurve?t*l.points.length:t,h=l.getPoints(c);for(let d=0;d<h.length;d++){const f=h[d];n&&n.equals(f)||(e.push(f),n=f)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new tl[s.type]().fromJSON(s))}return this}}class Rh extends z0{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Du(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new Nu(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,l){const c=new Iu(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(o,l));return this.curves.push(c),this.currentPoint.set(o,l),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ou(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absarc(t+c,e+h,n,s,o,l),this}absarc(t,e,n,s,o,l){return this.absellipse(t,e,n,n,s,o,l),this}ellipse(t,e,n,s,o,l,c,h){const d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(t+d,e+f,n,s,o,l,c,h),this}absellipse(t,e,n,s,o,l,c,h){const d=new hl(t,e,n,s,o,l,c,h);if(this.curves.length>0){const m=d.getPoint(0);m.equals(this.currentPoint)||this.lineTo(m.x,m.y)}this.curves.push(d);const f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Vi extends on{constructor(t=[new yt(0,-.5),new yt(.5,0),new yt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=Ge(s,0,Math.PI*2);const o=[],l=[],c=[],h=[],d=[],f=1/e,m=new nt,v=new yt,p=new nt,M=new nt,y=new nt;let _=0,g=0;for(let C=0;C<=t.length-1;C++)switch(C){case 0:_=t[C+1].x-t[C].x,g=t[C+1].y-t[C].y,p.x=g*1,p.y=-_,p.z=g*0,y.copy(p),p.normalize(),h.push(p.x,p.y,p.z);break;case t.length-1:h.push(y.x,y.y,y.z);break;default:_=t[C+1].x-t[C].x,g=t[C+1].y-t[C].y,p.x=g*1,p.y=-_,p.z=g*0,M.copy(p),p.x+=y.x,p.y+=y.y,p.z+=y.z,p.normalize(),h.push(p.x,p.y,p.z),y.copy(M)}for(let C=0;C<=e;C++){const b=n+C*f*s,I=Math.sin(b),N=Math.cos(b);for(let F=0;F<=t.length-1;F++){m.x=t[F].x*I,m.y=t[F].y,m.z=t[F].x*N,l.push(m.x,m.y,m.z),v.x=C/e,v.y=F/(t.length-1),c.push(v.x,v.y);const z=h[3*F+0]*I,G=h[3*F+1],D=h[3*F+0]*N;d.push(z,G,D)}}for(let C=0;C<e;C++)for(let b=0;b<t.length-1;b++){const I=b+C*t.length,N=I,F=I+t.length,z=I+t.length+1,G=I+1;o.push(N,F,G),o.push(z,G,F)}this.setIndex(o),this.setAttribute("position",new Le(l,3)),this.setAttribute("uv",new Le(c,2)),this.setAttribute("normal",new Le(d,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.points,t.segments,t.phiStart,t.phiLength)}}class ps extends on{constructor(t=1,e=1,n=1,s=32,o=1,l=!1,c=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:l,thetaStart:c,thetaLength:h};const d=this;s=Math.floor(s),o=Math.floor(o);const f=[],m=[],v=[],p=[];let M=0;const y=[],_=n/2;let g=0;C(),l===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(f),this.setAttribute("position",new Le(m,3)),this.setAttribute("normal",new Le(v,3)),this.setAttribute("uv",new Le(p,2));function C(){const I=new nt,N=new nt;let F=0;const z=(e-t)/n;for(let G=0;G<=o;G++){const D=[],P=G/o,W=P*(e-t)+t;for(let O=0;O<=s;O++){const B=O/s,A=B*h+c,Z=Math.sin(A),at=Math.cos(A);N.x=W*Z,N.y=-P*n+_,N.z=W*at,m.push(N.x,N.y,N.z),I.set(Z,z,at).normalize(),v.push(I.x,I.y,I.z),p.push(B,1-P),D.push(M++)}y.push(D)}for(let G=0;G<s;G++)for(let D=0;D<o;D++){const P=y[D][G],W=y[D+1][G],O=y[D+1][G+1],B=y[D][G+1];f.push(P,W,B),f.push(W,O,B),F+=6}d.addGroup(g,F,0),g+=F}function b(I){const N=M,F=new yt,z=new nt;let G=0;const D=I===!0?t:e,P=I===!0?1:-1;for(let O=1;O<=s;O++)m.push(0,_*P,0),v.push(0,P,0),p.push(.5,.5),M++;const W=M;for(let O=0;O<=s;O++){const A=O/s*h+c,Z=Math.cos(A),at=Math.sin(A);z.x=D*at,z.y=_*P,z.z=D*Z,m.push(z.x,z.y,z.z),v.push(0,P,0),F.x=Z*.5+.5,F.y=at*.5*P+.5,p.push(F.x,F.y),M++}for(let O=0;O<s;O++){const B=N+O,A=W+O;I===!0?f.push(A,A+1,B):f.push(A+1,A,B),G+=3}d.addGroup(g,G,I===!0?1:2),g+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ps(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class dl extends ps{constructor(t=1,e=1,n=32,s=1,o=!1,l=0,c=Math.PI*2){super(0,t,e,n,s,o,l,c),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:o,thetaStart:l,thetaLength:c}}static fromJSON(t){return new dl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Uu extends Rh{constructor(t){super(t),this.uuid=Or(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Rh().fromJSON(s))}return this}}const F0={triangulate:function(r,t,e=2){const n=t&&t.length,s=n?t[0]*e:r.length;let o=zu(r,0,s,e,!0);const l=[];if(!o||o.next===o.prev)return l;let c,h,d,f,m,v,p;if(n&&(o=V0(r,t,o,e)),r.length>80*e){c=d=r[0],h=f=r[1];for(let M=e;M<s;M+=e)m=r[M],v=r[M+1],m<c&&(c=m),v<h&&(h=v),m>d&&(d=m),v>f&&(f=v);p=Math.max(d-c,f-h),p=p!==0?32767/p:0}return ms(o,l,e,c,h,p,0),l}};function zu(r,t,e,n,s){let o,l;if(s===tx(r,t,e,n)>0)for(o=t;o<e;o+=n)l=Ih(o,r[o],r[o+1],l);else for(o=e-n;o>=t;o-=n)l=Ih(o,r[o],r[o+1],l);return l&&No(l,l.next)&&(gs(l),l=l.next),l}function Ki(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(No(e,e.next)||we(e.prev,e,e.next)===0)){if(gs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ms(r,t,e,n,s,o,l){if(!r)return;!l&&o&&Y0(r,n,s,o);let c=r,h,d;for(;r.prev!==r.next;){if(h=r.prev,d=r.next,o?B0(r,n,s,o):k0(r)){t.push(h.i/e|0),t.push(r.i/e|0),t.push(d.i/e|0),gs(r),r=d.next,c=d.next;continue}if(r=d,r===c){l?l===1?(r=H0(Ki(r),t,e),ms(r,t,e,n,s,o,2)):l===2&&G0(r,t,e,n,s,o):ms(Ki(r),t,e,n,s,o,1);break}}}function k0(r){const t=r.prev,e=r,n=r.next;if(we(t,e,n)>=0)return!1;const s=t.x,o=e.x,l=n.x,c=t.y,h=e.y,d=n.y,f=s<o?s<l?s:l:o<l?o:l,m=c<h?c<d?c:d:h<d?h:d,v=s>o?s>l?s:l:o>l?o:l,p=c>h?c>d?c:d:h>d?h:d;let M=n.next;for(;M!==t;){if(M.x>=f&&M.x<=v&&M.y>=m&&M.y<=p&&Tr(s,c,o,h,l,d,M.x,M.y)&&we(M.prev,M,M.next)>=0)return!1;M=M.next}return!0}function B0(r,t,e,n){const s=r.prev,o=r,l=r.next;if(we(s,o,l)>=0)return!1;const c=s.x,h=o.x,d=l.x,f=s.y,m=o.y,v=l.y,p=c<h?c<d?c:d:h<d?h:d,M=f<m?f<v?f:v:m<v?m:v,y=c>h?c>d?c:d:h>d?h:d,_=f>m?f>v?f:v:m>v?m:v,g=el(p,M,t,e,n),C=el(y,_,t,e,n);let b=r.prevZ,I=r.nextZ;for(;b&&b.z>=g&&I&&I.z<=C;){if(b.x>=p&&b.x<=y&&b.y>=M&&b.y<=_&&b!==s&&b!==l&&Tr(c,f,h,m,d,v,b.x,b.y)&&we(b.prev,b,b.next)>=0||(b=b.prevZ,I.x>=p&&I.x<=y&&I.y>=M&&I.y<=_&&I!==s&&I!==l&&Tr(c,f,h,m,d,v,I.x,I.y)&&we(I.prev,I,I.next)>=0))return!1;I=I.nextZ}for(;b&&b.z>=g;){if(b.x>=p&&b.x<=y&&b.y>=M&&b.y<=_&&b!==s&&b!==l&&Tr(c,f,h,m,d,v,b.x,b.y)&&we(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;I&&I.z<=C;){if(I.x>=p&&I.x<=y&&I.y>=M&&I.y<=_&&I!==s&&I!==l&&Tr(c,f,h,m,d,v,I.x,I.y)&&we(I.prev,I,I.next)>=0)return!1;I=I.nextZ}return!0}function H0(r,t,e){let n=r;do{const s=n.prev,o=n.next.next;!No(s,o)&&Fu(s,n,n.next,o)&&_s(s,o)&&_s(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),gs(n),gs(n.next),n=r=o),n=n.next}while(n!==r);return Ki(n)}function G0(r,t,e,n,s,o){let l=r;do{let c=l.next.next;for(;c!==l.prev;){if(l.i!==c.i&&$0(l,c)){let h=ku(l,c);l=Ki(l,l.next),h=Ki(h,h.next),ms(l,t,e,n,s,o,0),ms(h,t,e,n,s,o,0);return}c=c.next}l=l.next}while(l!==r)}function V0(r,t,e,n){const s=[];let o,l,c,h,d;for(o=0,l=t.length;o<l;o++)c=t[o]*n,h=o<l-1?t[o+1]*n:r.length,d=zu(r,c,h,n,!1),d===d.next&&(d.steiner=!0),s.push(K0(d));for(s.sort(W0),o=0;o<s.length;o++)e=Z0(s[o],e);return e}function W0(r,t){return r.x-t.x}function Z0(r,t){const e=X0(r,t);if(!e)return t;const n=ku(e,r);return Ki(n,n.next),Ki(e,e.next)}function X0(r,t){let e=t,n=-1/0,s;const o=r.x,l=r.y;do{if(l<=e.y&&l>=e.next.y&&e.next.y!==e.y){const v=e.x+(l-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(v<=o&&v>n&&(n=v,s=e.x<e.next.x?e:e.next,v===o))return s}e=e.next}while(e!==t);if(!s)return null;const c=s,h=s.x,d=s.y;let f=1/0,m;e=s;do o>=e.x&&e.x>=h&&o!==e.x&&Tr(l<d?o:n,l,h,d,l<d?n:o,l,e.x,e.y)&&(m=Math.abs(l-e.y)/(o-e.x),_s(e,r)&&(m<f||m===f&&(e.x>s.x||e.x===s.x&&q0(s,e)))&&(s=e,f=m)),e=e.next;while(e!==c);return s}function q0(r,t){return we(r.prev,r,t.prev)<0&&we(t.next,r,r.next)<0}function Y0(r,t,e,n){let s=r;do s.z===0&&(s.z=el(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==r);s.prevZ.nextZ=null,s.prevZ=null,j0(s)}function j0(r){let t,e,n,s,o,l,c,h,d=1;do{for(e=r,r=null,o=null,l=0;e;){for(l++,n=e,c=0,t=0;t<d&&(c++,n=n.nextZ,!!n);t++);for(h=d;c>0||h>0&&n;)c!==0&&(h===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,c--):(s=n,n=n.nextZ,h--),o?o.nextZ=s:r=s,s.prevZ=o,o=s;e=n}o.nextZ=null,d*=2}while(l>1);return r}function el(r,t,e,n,s){return r=(r-e)*s|0,t=(t-n)*s|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function K0(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function Tr(r,t,e,n,s,o,l,c){return(s-l)*(t-c)>=(r-l)*(o-c)&&(r-l)*(n-c)>=(e-l)*(t-c)&&(e-l)*(o-c)>=(s-l)*(n-c)}function $0(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!J0(r,t)&&(_s(r,t)&&_s(t,r)&&Q0(r,t)&&(we(r.prev,r,t.prev)||we(r,t.prev,t))||No(r,t)&&we(r.prev,r,r.next)>0&&we(t.prev,t,t.next)>0)}function we(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function No(r,t){return r.x===t.x&&r.y===t.y}function Fu(r,t,e,n){const s=uo(we(r,t,e)),o=uo(we(r,t,n)),l=uo(we(e,n,r)),c=uo(we(e,n,t));return!!(s!==o&&l!==c||s===0&&ho(r,e,t)||o===0&&ho(r,n,t)||l===0&&ho(e,r,n)||c===0&&ho(e,t,n))}function ho(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function uo(r){return r>0?1:r<0?-1:0}function J0(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&Fu(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function _s(r,t){return we(r.prev,r,r.next)<0?we(r,t,r.next)>=0&&we(r,r.prev,t)>=0:we(r,t,r.prev)<0||we(r,r.next,t)<0}function Q0(r,t){let e=r,n=!1;const s=(r.x+t.x)/2,o=(r.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function ku(r,t){const e=new nl(r.i,r.x,r.y),n=new nl(t.i,t.x,t.y),s=r.next,o=t.prev;return r.next=t,t.prev=r,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function Ih(r,t,e,n){const s=new nl(r,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function gs(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function nl(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function tx(r,t,e,n){let s=0;for(let o=t,l=e-n;o<e;o+=n)s+=(r[l]-r[o])*(r[o+1]+r[l+1]),l=o;return s}class hs{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return hs.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];Dh(t),Nh(n,t);let l=t.length;e.forEach(Dh);for(let h=0;h<e.length;h++)s.push(l),l+=e[h].length,Nh(n,e[h]);const c=F0.triangulate(n,s);for(let h=0;h<c.length;h+=3)o.push(c.slice(h,h+3));return o}}function Dh(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Nh(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class fl extends on{constructor(t=new Uu([new yt(.5,.5),new yt(-.5,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let c=0,h=t.length;c<h;c++){const d=t[c];l(d)}this.setAttribute("position",new Le(s,3)),this.setAttribute("uv",new Le(o,2)),this.computeVertexNormals();function l(c){const h=[],d=e.curveSegments!==void 0?e.curveSegments:12,f=e.steps!==void 0?e.steps:1,m=e.depth!==void 0?e.depth:1;let v=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,M=e.bevelSize!==void 0?e.bevelSize:p-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,_=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,C=e.UVGenerator!==void 0?e.UVGenerator:ex;let b,I=!1,N,F,z,G;g&&(b=g.getSpacedPoints(f),I=!0,v=!1,N=g.computeFrenetFrames(f,!1),F=new nt,z=new nt,G=new nt),v||(_=0,p=0,M=0,y=0);const D=c.extractPoints(d);let P=D.shape;const W=D.holes;if(!hs.isClockWise(P)){P=P.reverse();for(let vt=0,xt=W.length;vt<xt;vt++){const w=W[vt];hs.isClockWise(w)&&(W[vt]=w.reverse())}}const B=hs.triangulateShape(P,W),A=P;for(let vt=0,xt=W.length;vt<xt;vt++){const w=W[vt];P=P.concat(w)}function Z(vt,xt,w){return xt||console.error("THREE.ExtrudeGeometry: vec does not exist"),vt.clone().addScaledVector(xt,w)}const at=P.length,ot=B.length;function Y(vt,xt,w){let tt,K,T;const S=vt.x-xt.x,k=vt.y-xt.y,X=w.x-vt.x,$=w.y-vt.y,V=S*S+k*k,ft=S*$-k*X;if(Math.abs(ft)>Number.EPSILON){const lt=Math.sqrt(V),pt=Math.sqrt(X*X+$*$),Et=xt.x-k/lt,wt=xt.y+S/lt,Tt=w.x-$/pt,Ht=w.y+X/pt,Ft=((Tt-Et)*$-(Ht-wt)*X)/(S*$-k*X);tt=Et+S*Ft-vt.x,K=wt+k*Ft-vt.y;const Dt=tt*tt+K*K;if(Dt<=2)return new yt(tt,K);T=Math.sqrt(Dt/2)}else{let lt=!1;S>Number.EPSILON?X>Number.EPSILON&&(lt=!0):S<-Number.EPSILON?X<-Number.EPSILON&&(lt=!0):Math.sign(k)===Math.sign($)&&(lt=!0),lt?(tt=-k,K=S,T=Math.sqrt(V)):(tt=S,K=k,T=Math.sqrt(V/2))}return new yt(tt/T,K/T)}const st=[];for(let vt=0,xt=A.length,w=xt-1,tt=vt+1;vt<xt;vt++,w++,tt++)w===xt&&(w=0),tt===xt&&(tt=0),st[vt]=Y(A[vt],A[w],A[tt]);const rt=[];let q,Q=st.concat();for(let vt=0,xt=W.length;vt<xt;vt++){const w=W[vt];q=[];for(let tt=0,K=w.length,T=K-1,S=tt+1;tt<K;tt++,T++,S++)T===K&&(T=0),S===K&&(S=0),q[tt]=Y(w[tt],w[T],w[S]);rt.push(q),Q=Q.concat(q)}for(let vt=0;vt<_;vt++){const xt=vt/_,w=p*Math.cos(xt*Math.PI/2),tt=M*Math.sin(xt*Math.PI/2)+y;for(let K=0,T=A.length;K<T;K++){const S=Z(A[K],st[K],tt);bt(S.x,S.y,-w)}for(let K=0,T=W.length;K<T;K++){const S=W[K];q=rt[K];for(let k=0,X=S.length;k<X;k++){const $=Z(S[k],q[k],tt);bt($.x,$.y,-w)}}}const Ct=M+y;for(let vt=0;vt<at;vt++){const xt=v?Z(P[vt],Q[vt],Ct):P[vt];I?(z.copy(N.normals[0]).multiplyScalar(xt.x),F.copy(N.binormals[0]).multiplyScalar(xt.y),G.copy(b[0]).add(z).add(F),bt(G.x,G.y,G.z)):bt(xt.x,xt.y,0)}for(let vt=1;vt<=f;vt++)for(let xt=0;xt<at;xt++){const w=v?Z(P[xt],Q[xt],Ct):P[xt];I?(z.copy(N.normals[vt]).multiplyScalar(w.x),F.copy(N.binormals[vt]).multiplyScalar(w.y),G.copy(b[vt]).add(z).add(F),bt(G.x,G.y,G.z)):bt(w.x,w.y,m/f*vt)}for(let vt=_-1;vt>=0;vt--){const xt=vt/_,w=p*Math.cos(xt*Math.PI/2),tt=M*Math.sin(xt*Math.PI/2)+y;for(let K=0,T=A.length;K<T;K++){const S=Z(A[K],st[K],tt);bt(S.x,S.y,m+w)}for(let K=0,T=W.length;K<T;K++){const S=W[K];q=rt[K];for(let k=0,X=S.length;k<X;k++){const $=Z(S[k],q[k],tt);I?bt($.x,$.y+b[f-1].y,b[f-1].x+w):bt($.x,$.y,m+w)}}}J(),et();function J(){const vt=s.length/3;if(v){let xt=0,w=at*xt;for(let tt=0;tt<ot;tt++){const K=B[tt];Pt(K[2]+w,K[1]+w,K[0]+w)}xt=f+_*2,w=at*xt;for(let tt=0;tt<ot;tt++){const K=B[tt];Pt(K[0]+w,K[1]+w,K[2]+w)}}else{for(let xt=0;xt<ot;xt++){const w=B[xt];Pt(w[2],w[1],w[0])}for(let xt=0;xt<ot;xt++){const w=B[xt];Pt(w[0]+at*f,w[1]+at*f,w[2]+at*f)}}n.addGroup(vt,s.length/3-vt,0)}function et(){const vt=s.length/3;let xt=0;Mt(A,xt),xt+=A.length;for(let w=0,tt=W.length;w<tt;w++){const K=W[w];Mt(K,xt),xt+=K.length}n.addGroup(vt,s.length/3-vt,1)}function Mt(vt,xt){let w=vt.length;for(;--w>=0;){const tt=w;let K=w-1;K<0&&(K=vt.length-1);for(let T=0,S=f+_*2;T<S;T++){const k=at*T,X=at*(T+1),$=xt+tt+k,V=xt+K+k,ft=xt+K+X,lt=xt+tt+X;It($,V,ft,lt)}}}function bt(vt,xt,w){h.push(vt),h.push(xt),h.push(w)}function Pt(vt,xt,w){zt(vt),zt(xt),zt(w);const tt=s.length/3,K=C.generateTopUV(n,s,tt-3,tt-2,tt-1);it(K[0]),it(K[1]),it(K[2])}function It(vt,xt,w,tt){zt(vt),zt(xt),zt(tt),zt(xt),zt(w),zt(tt);const K=s.length/3,T=C.generateSideWallUV(n,s,K-6,K-3,K-2,K-1);it(T[0]),it(T[1]),it(T[3]),it(T[1]),it(T[2]),it(T[3])}function zt(vt){s.push(h[vt*3+0]),s.push(h[vt*3+1]),s.push(h[vt*3+2])}function it(vt){o.push(vt.x),o.push(vt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return nx(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,l=t.shapes.length;o<l;o++){const c=e[t.shapes[o]];n.push(c)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new tl[s.type]().fromJSON(s)),new fl(n,t.options)}}const ex={generateTopUV:function(r,t,e,n,s){const o=t[e*3],l=t[e*3+1],c=t[n*3],h=t[n*3+1],d=t[s*3],f=t[s*3+1];return[new yt(o,l),new yt(c,h),new yt(d,f)]},generateSideWallUV:function(r,t,e,n,s,o){const l=t[e*3],c=t[e*3+1],h=t[e*3+2],d=t[n*3],f=t[n*3+1],m=t[n*3+2],v=t[s*3],p=t[s*3+1],M=t[s*3+2],y=t[o*3],_=t[o*3+1],g=t[o*3+2];return Math.abs(c-f)<Math.abs(l-d)?[new yt(l,1-h),new yt(d,1-m),new yt(v,1-M),new yt(y,1-g)]:[new yt(c,1-h),new yt(f,1-m),new yt(p,1-M),new yt(_,1-g)]}};function nx(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,s=r.length;n<s;n++){const o=r[n];e.shapes.push(o.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Co extends on{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],h=[],d=[],f=new nt,m=new nt,v=new nt;for(let p=0;p<=n;p++)for(let M=0;M<=s;M++){const y=M/s*o,_=p/n*Math.PI*2;m.x=(t+e*Math.cos(_))*Math.cos(y),m.y=(t+e*Math.cos(_))*Math.sin(y),m.z=e*Math.sin(_),c.push(m.x,m.y,m.z),f.x=t*Math.cos(y),f.y=t*Math.sin(y),v.subVectors(m,f).normalize(),h.push(v.x,v.y,v.z),d.push(M/s),d.push(p/n)}for(let p=1;p<=n;p++)for(let M=1;M<=s;M++){const y=(s+1)*p+M-1,_=(s+1)*(p-1)+M-1,g=(s+1)*(p-1)+M,C=(s+1)*p+M;l.push(y,_,C),l.push(_,g,C)}this.setIndex(l),this.setAttribute("position",new Le(c,3)),this.setAttribute("normal",new Le(h,3)),this.setAttribute("uv",new Le(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Co(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Wi extends Ms{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hu,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Bu extends $e{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const ka=new Ae,Oh=new nt,Uh=new nt;class ix{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.map=null,this.mapPass=null,this.matrix=new Ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ll,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new Ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Oh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Oh),Uh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Uh),e.updateMatrixWorld(),ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ka),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ka)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class rx extends ix{constructor(){super(new Eu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class zh extends Bu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($e.DEFAULT_UP),this.updateMatrix(),this.target=new $e,this.shadow=new rx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sx extends Bu{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Fh{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Ge(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sl);const kh={type:"change"},Ba={type:"start"},Bh={type:"end"},fo=new mu,Hh=new vi,ox=Math.cos(70*fp.DEG2RAD);class ax extends $i{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:rr.ROTATE,MIDDLE:rr.DOLLY,RIGHT:rr.PAN},this.touches={ONE:sr.ROTATE,TWO:sr.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Tt),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Tt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(kh),n.update(),o=s.NONE},this.update=function(){const R=new nt,ut=new ji().setFromUnitVectors(t.up,new nt(0,1,0)),St=ut.clone().invert(),Rt=new nt,Nt=new ji,ne=new nt,ce=2*Math.PI;return function(Re=null){const me=n.object.position;R.copy(me).sub(n.target),R.applyQuaternion(ut),c.setFromVector3(R),n.autoRotate&&o===s.NONE&&O(P(Re)),n.enableDamping?(c.theta+=h.theta*n.dampingFactor,c.phi+=h.phi*n.dampingFactor):(c.theta+=h.theta,c.phi+=h.phi);let Ee=n.minAzimuthAngle,Se=n.maxAzimuthAngle;isFinite(Ee)&&isFinite(Se)&&(Ee<-Math.PI?Ee+=ce:Ee>Math.PI&&(Ee-=ce),Se<-Math.PI?Se+=ce:Se>Math.PI&&(Se-=ce),Ee<=Se?c.theta=Math.max(Ee,Math.min(Se,c.theta)):c.theta=c.theta>(Ee+Se)/2?Math.max(Ee,c.theta):Math.min(Se,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Je=!1;if(n.zoomToCursor&&F||n.object.isOrthographicCamera)c.radius=rt(c.radius);else{const an=c.radius;c.radius=rt(c.radius*d),Je=an!=c.radius}if(R.setFromSpherical(c),R.applyQuaternion(St),me.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),f.set(0,0,0)),n.zoomToCursor&&F){let an=null;if(n.object.isPerspectiveCamera){const Un=R.length();an=rt(Un*d);const ai=Un-an;n.object.position.addScaledVector(I,ai),n.object.updateMatrixWorld(),Je=!!ai}else if(n.object.isOrthographicCamera){const Un=new nt(N.x,N.y,0);Un.unproject(n.object);const ai=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),n.object.updateProjectionMatrix(),Je=ai!==n.object.zoom;const Fe=new nt(N.x,N.y,0);Fe.unproject(n.object),n.object.position.sub(Fe).add(Un),n.object.updateMatrixWorld(),an=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;an!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(an).add(n.object.position):(fo.origin.copy(n.object.position),fo.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(fo.direction))<ox?t.lookAt(n.target):(Hh.setFromNormalAndCoplanarPoint(n.object.up,n.target),fo.intersectPlane(Hh,n.target))))}else if(n.object.isOrthographicCamera){const an=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/d)),an!==n.object.zoom&&(n.object.updateProjectionMatrix(),Je=!0)}return d=1,F=!1,Je||Rt.distanceToSquared(n.object.position)>l||8*(1-Nt.dot(n.object.quaternion))>l||ne.distanceToSquared(n.target)>l?(n.dispatchEvent(kh),Rt.copy(n.object.position),Nt.copy(n.object.quaternion),ne.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Dt),n.domElement.removeEventListener("pointerdown",k),n.domElement.removeEventListener("pointercancel",$),n.domElement.removeEventListener("wheel",lt),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",$),n.domElement.getRootNode().removeEventListener("keydown",Et,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Tt),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=s.NONE;const l=1e-6,c=new Fh,h=new Fh;let d=1;const f=new nt,m=new yt,v=new yt,p=new yt,M=new yt,y=new yt,_=new yt,g=new yt,C=new yt,b=new yt,I=new nt,N=new yt;let F=!1;const z=[],G={};let D=!1;function P(R){return R!==null?2*Math.PI/60*n.autoRotateSpeed*R:2*Math.PI/60/60*n.autoRotateSpeed}function W(R){const ut=Math.abs(R*.01);return Math.pow(.95,n.zoomSpeed*ut)}function O(R){h.theta-=R}function B(R){h.phi-=R}const A=function(){const R=new nt;return function(St,Rt){R.setFromMatrixColumn(Rt,0),R.multiplyScalar(-St),f.add(R)}}(),Z=function(){const R=new nt;return function(St,Rt){n.screenSpacePanning===!0?R.setFromMatrixColumn(Rt,1):(R.setFromMatrixColumn(Rt,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(St),f.add(R)}}(),at=function(){const R=new nt;return function(St,Rt){const Nt=n.domElement;if(n.object.isPerspectiveCamera){const ne=n.object.position;R.copy(ne).sub(n.target);let ce=R.length();ce*=Math.tan(n.object.fov/2*Math.PI/180),A(2*St*ce/Nt.clientHeight,n.object.matrix),Z(2*Rt*ce/Nt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(A(St*(n.object.right-n.object.left)/n.object.zoom/Nt.clientWidth,n.object.matrix),Z(Rt*(n.object.top-n.object.bottom)/n.object.zoom/Nt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function ot(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Y(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?d*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function st(R,ut){if(!n.zoomToCursor)return;F=!0;const St=n.domElement.getBoundingClientRect(),Rt=R-St.left,Nt=ut-St.top,ne=St.width,ce=St.height;N.x=Rt/ne*2-1,N.y=-(Nt/ce)*2+1,I.set(N.x,N.y,1).unproject(n.object).sub(n.object.position).normalize()}function rt(R){return Math.max(n.minDistance,Math.min(n.maxDistance,R))}function q(R){m.set(R.clientX,R.clientY)}function Q(R){st(R.clientX,R.clientX),g.set(R.clientX,R.clientY)}function Ct(R){M.set(R.clientX,R.clientY)}function J(R){v.set(R.clientX,R.clientY),p.subVectors(v,m).multiplyScalar(n.rotateSpeed);const ut=n.domElement;O(2*Math.PI*p.x/ut.clientHeight),B(2*Math.PI*p.y/ut.clientHeight),m.copy(v),n.update()}function et(R){C.set(R.clientX,R.clientY),b.subVectors(C,g),b.y>0?ot(W(b.y)):b.y<0&&Y(W(b.y)),g.copy(C),n.update()}function Mt(R){y.set(R.clientX,R.clientY),_.subVectors(y,M).multiplyScalar(n.panSpeed),at(_.x,_.y),M.copy(y),n.update()}function bt(R){st(R.clientX,R.clientY),R.deltaY<0?Y(W(R.deltaY)):R.deltaY>0&&ot(W(R.deltaY)),n.update()}function Pt(R){let ut=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?B(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(0,n.keyPanSpeed),ut=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?B(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(0,-n.keyPanSpeed),ut=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?O(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(n.keyPanSpeed,0),ut=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?O(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):at(-n.keyPanSpeed,0),ut=!0;break}ut&&(R.preventDefault(),n.update())}function It(R){if(z.length===1)m.set(R.pageX,R.pageY);else{const ut=Jt(R),St=.5*(R.pageX+ut.x),Rt=.5*(R.pageY+ut.y);m.set(St,Rt)}}function zt(R){if(z.length===1)M.set(R.pageX,R.pageY);else{const ut=Jt(R),St=.5*(R.pageX+ut.x),Rt=.5*(R.pageY+ut.y);M.set(St,Rt)}}function it(R){const ut=Jt(R),St=R.pageX-ut.x,Rt=R.pageY-ut.y,Nt=Math.sqrt(St*St+Rt*Rt);g.set(0,Nt)}function vt(R){n.enableZoom&&it(R),n.enablePan&&zt(R)}function xt(R){n.enableZoom&&it(R),n.enableRotate&&It(R)}function w(R){if(z.length==1)v.set(R.pageX,R.pageY);else{const St=Jt(R),Rt=.5*(R.pageX+St.x),Nt=.5*(R.pageY+St.y);v.set(Rt,Nt)}p.subVectors(v,m).multiplyScalar(n.rotateSpeed);const ut=n.domElement;O(2*Math.PI*p.x/ut.clientHeight),B(2*Math.PI*p.y/ut.clientHeight),m.copy(v)}function tt(R){if(z.length===1)y.set(R.pageX,R.pageY);else{const ut=Jt(R),St=.5*(R.pageX+ut.x),Rt=.5*(R.pageY+ut.y);y.set(St,Rt)}_.subVectors(y,M).multiplyScalar(n.panSpeed),at(_.x,_.y),M.copy(y)}function K(R){const ut=Jt(R),St=R.pageX-ut.x,Rt=R.pageY-ut.y,Nt=Math.sqrt(St*St+Rt*Rt);C.set(0,Nt),b.set(0,Math.pow(C.y/g.y,n.zoomSpeed)),ot(b.y),g.copy(C);const ne=(R.pageX+ut.x)*.5,ce=(R.pageY+ut.y)*.5;st(ne,ce)}function T(R){n.enableZoom&&K(R),n.enablePan&&tt(R)}function S(R){n.enableZoom&&K(R),n.enableRotate&&w(R)}function k(R){n.enabled!==!1&&(z.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",X),n.domElement.addEventListener("pointerup",$)),!re(R)&&(Kt(R),R.pointerType==="touch"?Ht(R):V(R)))}function X(R){n.enabled!==!1&&(R.pointerType==="touch"?Ft(R):ft(R))}function $(R){switch(Gt(R),z.length){case 0:n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",X),n.domElement.removeEventListener("pointerup",$),n.dispatchEvent(Bh),o=s.NONE;break;case 1:const ut=z[0],St=G[ut];Ht({pointerId:ut,pageX:St.x,pageY:St.y});break}}function V(R){let ut;switch(R.button){case 0:ut=n.mouseButtons.LEFT;break;case 1:ut=n.mouseButtons.MIDDLE;break;case 2:ut=n.mouseButtons.RIGHT;break;default:ut=-1}switch(ut){case rr.DOLLY:if(n.enableZoom===!1)return;Q(R),o=s.DOLLY;break;case rr.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;Ct(R),o=s.PAN}else{if(n.enableRotate===!1)return;q(R),o=s.ROTATE}break;case rr.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;q(R),o=s.ROTATE}else{if(n.enablePan===!1)return;Ct(R),o=s.PAN}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Ba)}function ft(R){switch(o){case s.ROTATE:if(n.enableRotate===!1)return;J(R);break;case s.DOLLY:if(n.enableZoom===!1)return;et(R);break;case s.PAN:if(n.enablePan===!1)return;Mt(R);break}}function lt(R){n.enabled===!1||n.enableZoom===!1||o!==s.NONE||(R.preventDefault(),n.dispatchEvent(Ba),bt(pt(R)),n.dispatchEvent(Bh))}function pt(R){const ut=R.deltaMode,St={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(ut){case 1:St.deltaY*=16;break;case 2:St.deltaY*=100;break}return R.ctrlKey&&!D&&(St.deltaY*=10),St}function Et(R){R.key==="Control"&&(D=!0,n.domElement.getRootNode().addEventListener("keyup",wt,{passive:!0,capture:!0}))}function wt(R){R.key==="Control"&&(D=!1,n.domElement.getRootNode().removeEventListener("keyup",wt,{passive:!0,capture:!0}))}function Tt(R){n.enabled===!1||n.enablePan===!1||Pt(R)}function Ht(R){switch(se(R),z.length){case 1:switch(n.touches.ONE){case sr.ROTATE:if(n.enableRotate===!1)return;It(R),o=s.TOUCH_ROTATE;break;case sr.PAN:if(n.enablePan===!1)return;zt(R),o=s.TOUCH_PAN;break;default:o=s.NONE}break;case 2:switch(n.touches.TWO){case sr.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;vt(R),o=s.TOUCH_DOLLY_PAN;break;case sr.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xt(R),o=s.TOUCH_DOLLY_ROTATE;break;default:o=s.NONE}break;default:o=s.NONE}o!==s.NONE&&n.dispatchEvent(Ba)}function Ft(R){switch(se(R),o){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;w(R),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;tt(R),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;T(R),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;S(R),n.update();break;default:o=s.NONE}}function Dt(R){n.enabled!==!1&&R.preventDefault()}function Kt(R){z.push(R.pointerId)}function Gt(R){delete G[R.pointerId];for(let ut=0;ut<z.length;ut++)if(z[ut]==R.pointerId){z.splice(ut,1);return}}function re(R){for(let ut=0;ut<z.length;ut++)if(z[ut]==R.pointerId)return!0;return!1}function se(R){let ut=G[R.pointerId];ut===void 0&&(ut=new yt,G[R.pointerId]=ut),ut.set(R.pageX,R.pageY)}function Jt(R){const ut=R.pointerId===z[0]?z[1]:z[0];return G[ut]}n.domElement.addEventListener("contextmenu",Dt),n.domElement.addEventListener("pointerdown",k),n.domElement.addEventListener("pointercancel",$),n.domElement.addEventListener("wheel",lt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",Et,{passive:!0,capture:!0}),this.update()}}let po=null;function pl(r){return po||(po=new Promise(t=>{const e=r.parentElement,n=e.clientWidth||800,s=e.clientHeight||600,o=new b0({canvas:r,antialias:!0,alpha:!1});o.setPixelRatio(Math.min(devicePixelRatio,2)),o.setSize(n,s),o.toneMapping=tu,o.toneMappingExposure=1,Lt.renderer=o;const l=new w0;l.background=new ue(12113128),Lt.scene=l;const c=new Tn(45,n/s,.5,8e3);c.position.set(0,200,350),Lt.camera=c;const h=new ax(c,r);h.enableDamping=!0,h.dampingFactor=.07,h.minDistance=10,h.maxDistance=4e3,h.screenSpacePanning=!0,h.maxPolarAngle=Math.PI/2,Lt.controls=h,l.add(new sx(16777215,.78));const d=new zh(16775924,.95);d.position.set(-250,700,200),l.add(d);const f=new zh(14544639,.4);f.position.set(200,250,-200),l.add(f);const m=new as;l.add(m),Lt.tg=m,window.addEventListener("resize",()=>{const p=e.clientWidth,M=e.clientHeight;!p||!M||(c.aspect=p/M,c.updateProjectionMatrix(),o.setSize(p,M))});function v(){requestAnimationFrame(v),h.update(),o.render(l,c)}v(),t()}),po)}function lx(){if(Lt.tg)for(;Lt.tg.children.length;){const r=Lt.tg.children[0];Lt.tg.remove(r),r.geometry?.dispose(),Array.isArray(r.material)?r.material.forEach(t=>t.dispose()):r.material?.dispose()}}const cx="#f0ede8",hx="#c0bbb5",ux="#0fe300",dx="#0fe300",fx="#0fe300",px="#0fe300",mx="#262626",br="https://overturemaps-tiles-us-west-2-beta.s3.amazonaws.com/2026-05-20.0";function Hu(r,t){const{elevGrid:e,GRID:n,wMm:s,dMm:o,minE:l,elevRange:c,elevScaleMm:h,BASE_H:d}=Lt;if(!e||!n)return d;const f=(r+s/2)/s*(n-1),m=(t+o/2)/o*(n-1),v=Math.max(0,Math.min(n-2,Math.floor(f))),p=Math.max(0,Math.min(n-2,Math.floor(m))),M=f-v,y=m-p,_=e[p*n+v]??l,g=e[p*n+v+1]??l,C=e[(p+1)*n+v]??l,b=e[(p+1)*n+v+1]??l,I=_*(1-M)*(1-y)+g*M*(1-y)+C*(1-M)*y+b*M*y;return d+Math.max(0,Math.min(1,(I-l)/Math.max(.001,c)))*h}function mo(r,t,e){if(!r.positions.length||!r.indices.length)return null;const n=new on;n.setAttribute("position",new xn(r.positions,3)),r.colors&&n.setAttribute("color",new xn(r.colors,3)),n.setIndex(new xn(r.indices,1)),n.computeVertexNormals();const s=new sn(n,t);return s.name=e,s}function _x(r){if(!Lt.tg)return;lx();const t=qh(),e=Lt.tg;function n(o,l,c,h=-8){l.polygonOffset=!0,l.polygonOffsetFactor=h,l.polygonOffsetUnits=h;const d=mo(o,l,c);d&&e.add(d)}const s=(o,l=.95,c=!1)=>new Wi({color:new ue(o),roughness:l,metalness:0,flatShading:c});{const o=new Wi({vertexColors:!0,roughness:.92,metalness:0,flatShading:!0,side:_n,polygonOffset:!0,polygonOffsetFactor:20,polygonOffsetUnits:20}),l=mo(r.TERRAIN,o,"TERRAIN");l&&e.add(l)}{const o=gx(Lt.wMm,Lt.dMm,Lt.zoneType);if(o){const l=new fl(o,{depth:Lt.BASE_H,bevelEnabled:!1});l.rotateX(-Math.PI/2);const c=new sn(l,new Wi({color:new ue(t.cBase),roughness:.55}));c.name="BASE",e.add(c)}}if(vx(t.cBase),r.GROUND.positions.length){const o=new Wi({vertexColors:!0,roughness:.95,metalness:0,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),l=mo(r.GROUND,o,"GROUND");l&&e.add(l)}if(t.grassOn&&(n(r.LAND,s(cx),"LAND",-2),n(r.ROCK,s(hx),"ROCK",-3),n(r.FARM,s(px),"FARM",-4),n(r.GRASS,s(ux),"GRASS",-5),n(r.PARKS,s(fx),"PARKS",-6),n(r.FOREST,s(dx),"FOREST",-7)),t.waterOn){const o=s(t.waterCol,.1);o.side=_n,n(r.WATER,o,"WATER",-8)}if(t.roadsOn){n(r.PED,s(mx,.9),"PEDEST",-9);const o=s(t.roadCol,.85);o.side=_n,n(r.ROADS,o,"ROADS",-10)}if(t.buildOn&&n(r.BUILDINGS,s(t.buildCol,.7),"BUILDINGS",-14),r.GPX.positions.length){const o=new Wi({color:new ue(t.gpxCol),roughness:.3,metalness:.1,polygonOffset:!0,polygonOffsetFactor:-30,polygonOffsetUnits:-30}),l=mo(r.GPX,o,"GPX");l&&e.add(l)}Mx()}function gx(r,t,e){const n=new Uu;if(e==="circ")n.ellipse(0,0,r/2,t/2,0,Math.PI*2,!1,0);else if(e==="hex"){for(let s=0;s<6;s++){const o=s/6*Math.PI*2-Math.PI/6;s===0?n.moveTo(r/2*Math.cos(o),r/2*Math.sin(o)):n.lineTo(r/2*Math.cos(o),r/2*Math.sin(o))}n.closePath()}else n.moveTo(-r/2,-t/2),n.lineTo(r/2,-t/2),n.lineTo(r/2,t/2),n.lineTo(-r/2,t/2),n.closePath();return n}function vx(r){if(!Lt.tg)return;const{wMm:t,dMm:e,BASE_H:n,zoneType:s}=Lt,o=new Wi({color:new ue(r),roughness:.55,side:_n});function l(h,d){return{x:h,z:d,topY:Math.max(n,Hu(h*.98,d*.98))}}function c(h){const d=[],f=[];let m=0;const v=h.length;for(let y=0;y<v;y++){const _=h[y],g=h[(y+1)%v],C=(_.x+g.x)/2,b=(_.z+g.z)/2,I=C*(g.z-_.z)-b*(g.x-_.x),[N,F]=I>=0?[_,g]:[g,_];d.push(N.x,N.topY,N.z,F.x,F.topY,F.z,F.x,0,F.z,N.x,0,N.z),f.push(m,m+1,m+2,m,m+2,m+3),m+=4}if(!d.length)return;const p=new on;p.setAttribute("position",new Le(d,3)),p.setIndex(f),p.computeVertexNormals();const M=new sn(p,o);M.name="WALLS",Lt.tg.add(M)}if(s==="circ"){const d=t/2;c(Array.from({length:512},(f,m)=>{const v=m/512*Math.PI*2;return l(d*Math.cos(v),d*Math.sin(v))}))}else if(s==="hex"){const h=t/2;c(Array.from({length:6},(d,f)=>{const m=f/6*Math.PI*2-Math.PI/6;return l(h*Math.cos(m),h*Math.sin(m))}))}else if(Lt.zonePts&&Lt.zonePts.length>=3&&Lt.bounds){const{bounds:h}=Lt,d=e/(h.maxLat-h.minLat),f=t/(h.maxLon-h.minLon),m=(h.minLat+h.maxLat)/2,v=(h.minLon+h.maxLon)/2;c(Lt.zonePts.map(([p,M])=>l((M-v)*f,-(p-m)*d)))}else{const h=-t/2,d=t/2,f=-e/2,m=e/2;c([l(h,f),l(d,f),l(d,m),l(h,m)])}}const xx=[{n:"Tour Eiffel",lat:48.8584,lon:2.2945,rH:330,rW:125,rD:125,sh:"eiffel",c:"#7a8c9a"},{n:"Arc de Triomphe",lat:48.8738,lon:2.295,rH:50,rW:45,rD:22,sh:"arch",c:"#c8b89a"},{n:"Notre-Dame",lat:48.853,lon:2.3499,rH:69,rW:48,rD:128,sh:"cathedral",c:"#b4a890"},{n:"Sacré-Cœur",lat:48.8867,lon:2.3431,rH:83,rW:42,rD:55,sh:"dome",c:"#f8f4ee"},{n:"Panthéon",lat:48.8462,lon:2.346,rH:83,rW:110,rD:75,sh:"dome",c:"#d8d0c0"},{n:"Invalides",lat:48.8559,lon:2.3124,rH:107,rW:60,rD:60,sh:"dome",c:"#d4b820"},{n:"Tour Montparnasse",lat:48.8422,lon:2.322,rH:210,rW:50,rD:30,sh:"tower",c:"#282828"},{n:"Pyramide Louvre",lat:48.8606,lon:2.3376,rH:21,rW:35,rD:35,sh:"pyramid",c:"#d4d8e0"},{n:"Versailles",lat:48.8048,lon:2.1203,rH:30,rW:400,rD:130,sh:"rect",c:"#f0e8c8"},{n:"Big Ben",lat:51.5007,lon:-.1246,rH:96,rW:15,rD:15,sh:"tower",c:"#d4c878"},{n:"London Eye",lat:51.5033,lon:-.1195,rH:135,rW:120,rD:12,sh:"wheel",c:"#4080c0"},{n:"St Pauls",lat:51.5138,lon:-.0984,rH:111,rW:80,rD:175,sh:"dome",c:"#e0d8c8"},{n:"Empire State",lat:40.7484,lon:-73.9857,rH:443,rW:57,rD:57,sh:"tower",c:"#b0b0c0"},{n:"One WTC",lat:40.7127,lon:-74.0134,rH:541,rW:60,rD:60,sh:"tower",c:"#c0d4e0"},{n:"Statue of Liberty",lat:40.6892,lon:-74.0445,rH:93,rW:14,rD:14,sh:"tower",c:"#78a890"},{n:"Capitol",lat:38.8897,lon:-77.0089,rH:88,rW:229,rD:107,sh:"dome",c:"#f0f0f0"},{n:"Space Needle",lat:47.6205,lon:-122.3493,rH:184,rW:15,rD:15,sh:"tower",c:"#808888"},{n:"CN Tower",lat:43.6426,lon:-79.3871,rH:553,rW:20,rD:20,sh:"tower",c:"#808890"},{n:"Burj Khalifa",lat:25.1972,lon:55.2744,rH:828,rW:57,rD:57,sh:"burj",c:"#c8d8e8"},{n:"Burj Al Arab",lat:25.1411,lon:55.1853,rH:321,rW:60,rD:25,sh:"sail",c:"#f8f8f8"},{n:"Shanghai Tower",lat:31.2354,lon:121.5006,rH:632,rW:57,rD:57,sh:"burj",c:"#d0e8f0"},{n:"Colosseum",lat:41.8902,lon:12.4922,rH:48,rW:188,rD:156,sh:"colosseum",c:"#c8b89a"},{n:"Tower of Pisa",lat:43.7229,lon:10.3966,rH:56,rW:15,rD:15,sh:"tower",c:"#f0ede8"},{n:"St Peters",lat:41.9022,lon:12.4539,rH:136,rW:211,rD:115,sh:"dome",c:"#f0ede8"},{n:"Sagrada Família",lat:41.4036,lon:2.1744,rH:172,rW:90,rD:60,sh:"cathedral",c:"#d4c8a0"},{n:"Brandenburg Gate",lat:52.5163,lon:13.3777,rH:26,rW:65,rD:11,sh:"arch",c:"#d4c8a0"},{n:"Cologne Cathedral",lat:50.9413,lon:6.9583,rH:157,rW:86,rD:145,sh:"cathedral",c:"#909090"},{n:"Parthenon",lat:37.9715,lon:23.7267,rH:13,rW:69,rD:30,sh:"rect",c:"#e8d8b8"},{n:"Great Pyramid",lat:29.9792,lon:31.1342,rH:139,rW:230,rD:230,sh:"pyramid",c:"#d4c060"},{n:"St Basil",lat:55.7525,lon:37.6231,rH:65,rW:40,rD:40,sh:"onion",c:"#c83030"},{n:"Sydney Opera",lat:-33.8568,lon:151.2153,rH:65,rW:183,rD:100,sh:"dome",c:"#f8f8f8"},{n:"Taj Mahal",lat:27.1751,lon:78.0421,rH:73,rW:56,rD:56,sh:"dome",c:"#f8f4ee"},{n:"India Gate",lat:28.6129,lon:77.2295,rH:42,rW:10,rD:10,sh:"arch",c:"#d4b870"},{n:"Tokyo Tower",lat:35.6585,lon:139.7454,rH:333,rW:20,rD:20,sh:"eiffel",c:"#d04030"},{n:"Tokyo Skytree",lat:35.7101,lon:139.8107,rH:634,rW:50,rD:50,sh:"burj",c:"#7090c0"},{n:"Christ Redeemer",lat:-22.9519,lon:-43.2105,rH:39,rW:10,rD:10,sh:"tower",c:"#f0ede8"},{n:"Hagia Sophia",lat:41.0086,lon:28.9802,rH:55,rW:100,rD:75,sh:"dome",c:"#c8b898"},{n:"Pyramid of Sun",lat:19.6921,lon:-98.8445,rH:71,rW:225,rD:222,sh:"pyramid",c:"#c8b070"},{n:"Prague Castle",lat:50.0905,lon:14.4003,rH:48,rW:570,rD:130,sh:"rect",c:"#d8d0b8"}];function Ha(r){const t=[],e=[];let n=0;for(const o of r){const l=o.attributes.position,c=o.index;for(let h=0;h<l.count;h++)t.push(l.getX(h),l.getY(h),l.getZ(h));if(c)for(let h=0;h<c.count;h++)e.push(c.getX(h)+n);else for(let h=0;h<l.count;h++)e.push(h+n);n+=l.count,o.dispose()}const s=new on;return s.setAttribute("position",new Le(t,3)),s.setIndex(e),s.computeVertexNormals(),s}function yx(r,t,e,n){const s=t/2,o=n/2;try{switch(r){case"eiffel":{const l=[new yt(s,0),new yt(s*.82,e*.035),new yt(s*.58,e*.08),new yt(s*.32,e*.135),new yt(s*.265,e*.165),new yt(s*.285,e*.175),new yt(s*.245,e*.188),new yt(s*.18,e*.23),new yt(s*.13,e*.33),new yt(s*.115,e*.348),new yt(s*.13,e*.358),new yt(s*.11,e*.37),new yt(s*.08,e*.43),new yt(s*.048,e*.6),new yt(s*.026,e*.83),new yt(s*.01,e*.94),new yt(0,e)],c=new Vi(l,4);c.rotateY(Math.PI/4);const h=new ps(s*.32,s*.32,e*.012,16,1,!1);h.translate(0,e*.175,0);const d=new ps(s*.145,s*.145,e*.01,16,1,!1);return d.translate(0,e*.358,0),Ha([c,h,d])}case"burj":{const l=[new yt(s,0),new yt(s*.8,e*.15),new yt(s*.55,e*.4),new yt(s*.25,e*.72),new yt(s*.08,e*.9),new yt(s*.02,e)];return new Vi(l,12)}case"dome":{const c=Array.from({length:13},(h,d)=>{const f=d/12*Math.PI/2;return new yt(s*Math.cos(f),e*.75*Math.sin(f))});return c.push(new yt(s*.9,0),new yt(0,0)),new Vi(c,16)}case"onion":{const l=[new yt(s*.3,0),new yt(s*.55,e*.12),new yt(s,e*.4),new yt(s*.55,e*.65),new yt(s*.1,e*.85),new yt(s*.04,e)];return new Vi(l,12)}case"tower":{const l=[new yt(s,0),new yt(s*.65,e*.2),new yt(s*.3,e*.55),new yt(s*.1,e*.8),new yt(s*.03,e)];return new Vi(l,8)}case"pyramid":{const l=new dl(s*Math.SQRT2,e,4);return l.rotateY(Math.PI/4),l.translate(0,e/2,0),l}case"arch":{const l=t*.22,c=e*.78,h=new En(l,c,n);h.translate(-s+l/2,c/2,0);const d=new En(l,c,n);d.translate(s-l/2,c/2,0);const f=new En(t,e*.22,n);return f.translate(0,e*.89,0),Ha([h,d,f])}case"cathedral":{const l=t*.55,c=e*.65,h=t*.14,d=new En(l,c,n);d.translate(0,c/2,0);const f=new En(h,e,h);f.translate(-l/2+h/2,e/2,-o+h/2);const m=new En(h,e,h);return m.translate(l/2-h/2,e/2,-o+h/2),Ha([d,f,m])}case"colosseum":{const l=Math.max(s,o)*.85,c=(Math.max(s,o)-Math.min(s,o)*.4)/2,h=new Co(l,Math.max(c,3),8,32);return h.scale(1,e/(l*.8),o/s),h.translate(0,e/2,0),h}case"sail":{const l=[-s,0,-o,s,0,-o,s,0,o,-s,0,o,0,e,0],c=[0,1,4,1,2,4,2,3,4,3,0,4,0,2,1,0,3,2],h=new on;return h.setAttribute("position",new Le(l,3)),h.setIndex(c),h.computeVertexNormals(),h}case"wheel":{const l=Math.min(s,e/2),c=new Co(l,l*.045,6,36);return c.rotateY(Math.PI/2),c.translate(0,l,0),c}default:{const l=new En(t,e,n);return l.translate(0,e/2,0),l}}}catch{return null}}function Mx(){if(!Lt.tg||!Lt.bounds||!Lt.elevGrid)return;const{bounds:r,wMm:t,dMm:e,mmPerMeter:n}=Lt,s=(r.minLat+r.maxLat)/2,o=(r.minLon+r.maxLon)/2,l=e/(r.maxLat-r.minLat),c=t/(r.maxLon-r.minLon),h=.01;let d=0;for(const f of xx){if(f.lat<r.minLat-h||f.lat>r.maxLat+h||f.lon<r.minLon-h||f.lon>r.maxLon+h)continue;const m=(f.lon-o)*c,v=-(f.lat-s)*l,p=t/2,M=e/2;if(!(m>=-p-1&&m<=p+1&&v>=-M-1&&v<=M+1))continue;const _=Hu(m,v),g=Math.min(t*.25,Math.max(5,f.rH*n*2)),C=Math.min(t*.08,Math.max(1.5,f.rW*n)),b=Math.min(t*.08,Math.max(1.5,f.rD*n)),I=yx(f.sh,C,g,b);if(!I)continue;I.translate(m,_,v);const N=new sn(I,new Wi({color:new ue(f.c),roughness:.7,metalness:.05,flatShading:!0,polygonOffset:!0,polygonOffsetFactor:-20,polygonOffsetUnits:-20}));N.name="LM_"+f.n,Lt.tg.add(N),d++}d&&console.log(`Landmarks: ${d} monument(s)`)}var Lr=Math.pow,Ke=(r,t,e)=>new Promise((n,s)=>{var o=h=>{try{c(e.next(h))}catch(d){s(d)}},l=h=>{try{c(e.throw(h))}catch(d){s(d)}},c=h=>h.done?n(h.value):Promise.resolve(h.value).then(o,l);c((e=e.apply(r,t)).next())}),gn=Uint8Array,us=Uint16Array,Sx=Int32Array,Gu=new gn([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Vu=new gn([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),bx=new gn([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Wu=function(r,t){for(var e=new us(31),n=0;n<31;++n)e[n]=t+=1<<r[n-1];for(var s=new Sx(e[30]),n=1;n<30;++n)for(var o=e[n];o<e[n+1];++o)s[o]=o-e[n]<<5|n;return{b:e,r:s}},Zu=Wu(Gu,2),Xu=Zu.b,wx=Zu.r;Xu[28]=258,wx[258]=28;var Ex=Wu(Vu,0),Tx=Ex.b,qu=new us(32768);for(pe=0;pe<32768;++pe)ii=(pe&43690)>>1|(pe&21845)<<1,ii=(ii&52428)>>2|(ii&13107)<<2,ii=(ii&61680)>>4|(ii&3855)<<4,qu[pe]=((ii&65280)>>8|(ii&255)<<8)>>1;var ii,pe,ds=function(r,t,e){for(var n=r.length,s=0,o=new us(t);s<n;++s)r[s]&&++o[r[s]-1];var l=new us(t);for(s=1;s<t;++s)l[s]=l[s-1]+o[s-1]<<1;var c;{c=new us(1<<t);var h=15-t;for(s=0;s<n;++s)if(r[s])for(var d=s<<4|r[s],f=t-r[s],m=l[r[s]-1]++<<f,v=m|(1<<f)-1;m<=v;++m)c[qu[m]>>h]=d}return c},Ss=new gn(288);for(pe=0;pe<144;++pe)Ss[pe]=8;var pe;for(pe=144;pe<256;++pe)Ss[pe]=9;var pe;for(pe=256;pe<280;++pe)Ss[pe]=7;var pe;for(pe=280;pe<288;++pe)Ss[pe]=8;var pe,Yu=new gn(32);for(pe=0;pe<32;++pe)Yu[pe]=5;var pe,Ax=ds(Ss,9),Cx=ds(Yu,5),Ga=function(r){for(var t=r[0],e=1;e<r.length;++e)r[e]>t&&(t=r[e]);return t},Dn=function(r,t,e){var n=t/8|0;return(r[n]|r[n+1]<<8)>>(t&7)&e},Va=function(r,t){var e=t/8|0;return(r[e]|r[e+1]<<8|r[e+2]<<16)>>(t&7)},Px=function(r){return(r+7)/8|0},Lx=function(r,t,e){(e==null||e>r.length)&&(e=r.length);var n=new gn(e-t);return n.set(r.subarray(t,e)),n},Rx=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],mn=function(r,t,e){var n=new Error(t||Rx[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,mn),!e)throw n;return n},ml=function(r,t,e,n){var s=r.length,o=0;if(!s||t.f&&!t.l)return e||new gn(0);var l=!e||t.i!=2,c=t.i;e||(e=new gn(s*3));var h=function(zt){var it=e.length;if(zt>it){var vt=new gn(Math.max(it*2,zt));vt.set(e),e=vt}},d=t.f||0,f=t.p||0,m=t.b||0,v=t.l,p=t.d,M=t.m,y=t.n,_=s*8;do{if(!v){d=Dn(r,f,1);var g=Dn(r,f+1,3);if(f+=3,g)if(g==1)v=Ax,p=Cx,M=9,y=5;else if(g==2){var N=Dn(r,f,31)+257,F=Dn(r,f+10,15)+4,z=N+Dn(r,f+5,31)+1;f+=14;for(var G=new gn(z),D=new gn(19),P=0;P<F;++P)D[bx[P]]=Dn(r,f+P*3,7);f+=F*3;for(var W=Ga(D),O=(1<<W)-1,B=ds(D,W),P=0;P<z;){var A=B[Dn(r,f,O)];f+=A&15;var C=A>>4;if(C<16)G[P++]=C;else{var Z=0,at=0;for(C==16?(at=3+Dn(r,f,3),f+=2,Z=G[P-1]):C==17?(at=3+Dn(r,f,7),f+=3):C==18&&(at=11+Dn(r,f,127),f+=7);at--;)G[P++]=Z}}var ot=G.subarray(0,N),Y=G.subarray(N);M=Ga(ot),y=Ga(Y),v=ds(ot,M),p=ds(Y,y)}else mn(1);else{var C=Px(f)+4,b=r[C-4]|r[C-3]<<8,I=C+b;if(I>s){c&&mn(0);break}l&&h(m+b),e.set(r.subarray(C,I),m),t.b=m+=b,t.p=f=I*8,t.f=d;continue}if(f>_){c&&mn(0);break}}l&&h(m+131072);for(var st=(1<<M)-1,rt=(1<<y)-1,q=f;;q=f){var Z=v[Va(r,f)&st],Q=Z>>4;if(f+=Z&15,f>_){c&&mn(0);break}if(Z||mn(2),Q<256)e[m++]=Q;else if(Q==256){q=f,v=null;break}else{var Ct=Q-254;if(Q>264){var P=Q-257,J=Gu[P];Ct=Dn(r,f,(1<<J)-1)+Xu[P],f+=J}var et=p[Va(r,f)&rt],Mt=et>>4;et||mn(3),f+=et&15;var Y=Tx[Mt];if(Mt>3){var J=Vu[Mt];Y+=Va(r,f)&(1<<J)-1,f+=J}if(f>_){c&&mn(0);break}l&&h(m+131072);var bt=m+Ct;if(m<Y){var Pt=o-Y,It=Math.min(Y,bt);for(Pt+m<0&&mn(3);m<It;++m)e[m]=n[Pt+m]}for(;m<bt;m+=4)e[m]=e[m-Y],e[m+1]=e[m+1-Y],e[m+2]=e[m+2-Y],e[m+3]=e[m+3-Y];m=bt}}t.l=v,t.p=q,t.b=m,t.f=d,v&&(d=1,t.m=M,t.d=p,t.n=y)}while(!d);return m==e.length?e:Lx(e,0,m)},Ix=new gn(0),Dx=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&mn(6,"invalid gzip data");var t=r[3],e=10;t&4&&(e+=(r[10]|r[11]<<8)+2);for(var n=(t>>3&1)+(t>>4&1);n>0;n-=!r[e++]);return e+(t&2)},Nx=function(r){var t=r.length;return(r[t-4]|r[t-3]<<8|r[t-2]<<16|r[t-1]<<24)>>>0},Ox=function(r,t){return((r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31)&&mn(6,"invalid zlib data"),(r[1]>>5&1)==1&&mn(6,"invalid zlib data: "+(r[1]&32?"need":"unexpected")+" dictionary"),(r[1]>>3&4)+2};function Ux(r,t){return ml(r,{i:2},t,t)}function zx(r,t){var e=Dx(r);return e+8>r.length&&mn(6,"invalid gzip data"),ml(r.subarray(e,-8),{i:2},new gn(Nx(r)),t)}function Fx(r,t){return ml(r.subarray(Ox(r),-4),{i:2},t,t)}function il(r,t){return r[0]==31&&r[1]==139&&r[2]==8?zx(r,t):(r[0]&15)!=8||r[0]>>4>7||(r[0]<<8|r[1])%31?Ux(r,t):Fx(r,t)}var kx=typeof TextDecoder<"u"&&new TextDecoder,Bx=0;try{kx.decode(Ix,{stream:!0}),Bx=1}catch{}var ju=(r,t)=>r*Lr(2,t),is=(r,t)=>Math.floor(r/Lr(2,t)),Po=(r,t)=>ju(r.getUint16(t+1,!0),8)+r.getUint8(t),Ku=(r,t)=>ju(r.getUint32(t+2,!0),16)+r.getUint16(t,!0),Hx=(r,t,e,n,s)=>{if(r!==n.getUint8(s))return r-n.getUint8(s);const o=Po(n,s+1);if(t!==o)return t-o;const l=Po(n,s+4);return e!==l?e-l:0},Gx=(r,t,e,n)=>{const s=$u(r,t|128,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!0}:null},Gh=(r,t,e,n)=>{const s=$u(r,t,e,n);return s?{z:t,x:e,y:n,offset:s[0],length:s[1],isDir:!1}:null},$u=(r,t,e,n)=>{let s=0,o=r.byteLength/17-1;for(;s<=o;){const l=o+s>>1,c=Hx(t,e,n,r,l*17);if(c>0)s=l+1;else if(c<0)o=l-1;else return[Ku(r,l*17+7),r.getUint32(l*17+13,!0)]}return null},Vx=(r,t)=>r.isDir&&!t.isDir?1:!r.isDir&&t.isDir?-1:r.z!==t.z?r.z-t.z:r.x!==t.x?r.x-t.x:r.y-t.y,Ju=(r,t)=>{const e=r.getUint8(t*17);return{z:e&127,x:Po(r,t*17+1),y:Po(r,t*17+4),offset:Ku(r,t*17+7),length:r.getUint32(t*17+13,!0),isDir:e>>7===1}},Vh=r=>{const t=[],e=new DataView(r);for(let n=0;n<e.byteLength/17;n++)t.push(Ju(e,n));return Wx(t)},Wx=r=>{r.sort(Vx);const t=new ArrayBuffer(17*r.length),e=new Uint8Array(t);for(let n=0;n<r.length;n++){const s=r[n];let o=s.z;s.isDir&&(o=o|128),e[n*17]=o,e[n*17+1]=s.x&255,e[n*17+2]=s.x>>8&255,e[n*17+3]=s.x>>16&255,e[n*17+4]=s.y&255,e[n*17+5]=s.y>>8&255,e[n*17+6]=s.y>>16&255,e[n*17+7]=s.offset&255,e[n*17+8]=is(s.offset,8)&255,e[n*17+9]=is(s.offset,16)&255,e[n*17+10]=is(s.offset,24)&255,e[n*17+11]=is(s.offset,32)&255,e[n*17+12]=is(s.offset,48)&255,e[n*17+13]=s.length&255,e[n*17+14]=s.length>>8&255,e[n*17+15]=s.length>>16&255,e[n*17+16]=s.length>>24&255}return t},Zx=(r,t)=>{if(r.byteLength<17)return null;const e=r.byteLength/17,n=Ju(r,e-1);if(n.isDir){const s=n.z,o=t.z-s,l=Math.trunc(t.x/(1<<o)),c=Math.trunc(t.y/(1<<o));return{z:s,x:l,y:c}}return null};function Xx(r){return Ke(this,null,function*(){const t=yield r.getBytes(0,512e3),e=new DataView(t.data),n=e.getUint32(4,!0),s=e.getUint16(8,!0),o=new TextDecoder("utf-8"),l=JSON.parse(o.decode(new DataView(t.data,10,n)));let c=0;l.compression==="gzip"&&(c=2);let h=0;"minzoom"in l&&(h=+l.minzoom);let d=0;"maxzoom"in l&&(d=+l.maxzoom);let f=0,m=0,v=0,p=-180,M=-85,y=180,_=85;if(l.bounds){const C=l.bounds.split(",");p=+C[0],M=+C[1],y=+C[2],_=+C[3]}if(l.center){const C=l.center.split(",");f=+C[0],m=+C[1],v=+C[2]}return{specVersion:e.getUint16(2,!0),rootDirectoryOffset:10+n,rootDirectoryLength:s*17,jsonMetadataOffset:10,jsonMetadataLength:n,leafDirectoryOffset:0,leafDirectoryLength:void 0,tileDataOffset:0,tileDataLength:void 0,numAddressedTiles:0,numTileEntries:0,numTileContents:0,clustered:!1,internalCompression:1,tileCompression:c,tileType:1,minZoom:h,maxZoom:d,minLon:p,minLat:M,maxLon:y,maxLat:_,centerZoom:v,centerLon:f,centerLat:m,etag:t.etag}})}function qx(r,t,e,n,s,o,l){return Ke(this,null,function*(){let c=yield e.getArrayBuffer(t,r.rootDirectoryOffset,r.rootDirectoryLength,r);r.specVersion===1&&(c=Vh(c));const h=Gh(new DataView(c),n,s,o);if(h){let m=(yield t.getBytes(h.offset,h.length,l)).data;const v=new DataView(m);return v.getUint8(0)===31&&v.getUint8(1)===139&&(m=il(new Uint8Array(m))),{data:m}}const d=Zx(new DataView(c),{z:n,x:s,y:o});if(d){const f=Gx(new DataView(c),d.z,d.x,d.y);if(f){let m=yield e.getArrayBuffer(t,f.offset,f.length,r);r.specVersion===1&&(m=Vh(m));const v=Gh(new DataView(m),n,s,o);if(v){let M=(yield t.getBytes(v.offset,v.length,l)).data;const y=new DataView(M);return y.getUint8(0)===31&&y.getUint8(1)===139&&(M=il(new Uint8Array(M))),{data:M}}}}})}var Qu={getHeader:Xx,getZxy:qx};function wr(r,t){return(t>>>0)*4294967296+(r>>>0)}function Yx(r,t){const e=t.buf;let n=e[t.pos++],s=(n&112)>>4;if(n<128||(n=e[t.pos++],s|=(n&127)<<3,n<128)||(n=e[t.pos++],s|=(n&127)<<10,n<128)||(n=e[t.pos++],s|=(n&127)<<17,n<128)||(n=e[t.pos++],s|=(n&127)<<24,n<128)||(n=e[t.pos++],s|=(n&1)<<31,n<128))return wr(r,s);throw new Error("Expected varint not more than 10 bytes")}function rs(r){const t=r.buf;let e=t[r.pos++],n=e&127;return e<128||(e=t[r.pos++],n|=(e&127)<<7,e<128)||(e=t[r.pos++],n|=(e&127)<<14,e<128)||(e=t[r.pos++],n|=(e&127)<<21,e<128)?n:(e=t[r.pos],n|=(e&15)<<28,Yx(n,r))}function jx(r,t,e,n){if(n===0){e===1&&(t[0]=r-1-t[0],t[1]=r-1-t[1]);const s=t[0];t[0]=t[1],t[1]=s}}var Kx=[0,1,5,21,85,341,1365,5461,21845,87381,349525,1398101,5592405,22369621,89478485,357913941,1431655765,5726623061,22906492245,91625968981,366503875925,1466015503701,5864062014805,23456248059221,93824992236885,375299968947541,0x5555555555555];function $x(r,t,e){if(r>26)throw Error("Tile zoom level exceeds max safe number limit (26)");if(t>Lr(2,r)-1||e>Lr(2,r)-1)throw Error("tile x/y outside zoom level bounds");const n=Kx[r],s=Lr(2,r);let o=0,l=0,c=0;const h=[t,e];let d=s/2;for(;d>0;)o=(h[0]&d)>0?1:0,l=(h[1]&d)>0?1:0,c+=d*d*(3*o^l),jx(d,h,o,l),d=d/2;return n+c}function td(r,t){return Ke(this,null,function*(){if(t===1||t===0)return r;if(t===2){if(typeof globalThis.DecompressionStream>"u")return il(new Uint8Array(r));const e=new Response(r).body;if(!e)throw Error("Failed to read response stream");const n=e.pipeThrough(new globalThis.DecompressionStream("gzip"));return new Response(n).arrayBuffer()}throw Error("Compression method not supported")})}function Jx(r){return r===1?".mvt":r===2?".png":r===3?".jpg":r===4?".webp":r===5?".avif":""}var Qx=127;function ty(r,t){let e=0,n=r.length-1;for(;e<=n;){const s=n+e>>1,o=t-r[s].tileId;if(o>0)e=s+1;else if(o<0)n=s-1;else return r[s]}return n>=0&&(r[n].runLength===0||t-r[n].tileId<r[n].runLength)?r[n]:null}var ey=class{constructor(r,t=new Headers){this.url=r,this.customHeaders=t,this.mustReload=!1;let e="";"navigator"in globalThis&&(e=globalThis.navigator.userAgent||"");const n=e.indexOf("Windows")>-1,s=/Chrome|Chromium|Edg|OPR|Brave/.test(e);this.chromeWindowsNoCache=!1,n&&s&&(this.chromeWindowsNoCache=!0)}getKey(){return this.url}setHeaders(r){this.customHeaders=r}getBytes(r,t,e,n){return Ke(this,null,function*(){let s,o;e?o=e:(s=new AbortController,o=s.signal);const l=new Headers(this.customHeaders);l.set("range",`bytes=${r}-${r+t-1}`);let c;this.mustReload?c="reload":this.chromeWindowsNoCache&&(c="no-store");let h=yield fetch(this.url,{signal:o,cache:c,headers:l});if(r===0&&h.status===416){const v=h.headers.get("Content-Range");if(!v||!v.startsWith("bytes */"))throw Error("Missing content-length on 416 response");const p=+v.substr(8);h=yield fetch(this.url,{signal:o,cache:"reload",headers:{range:`bytes=0-${p-1}`}})}let d=h.headers.get("Etag");if(d?.startsWith("W/")&&(d=null),h.status===416||n&&d&&d!==n)throw this.mustReload=!0,new rl(`Server returned non-matching ETag ${n} after one retry. Check browser extensions and servers for issues that may affect correct ETag headers.`);if(h.status>=300)throw Error(`Bad response code: ${h.status}`);const f=h.headers.get("Content-Length");if(h.status===200&&(!f||+f>t))throw s&&s.abort(),Error("Server returned no content-length header or content-length exceeding request. Check that your storage backend supports HTTP Byte Serving.");return{data:yield h.arrayBuffer(),etag:d||void 0,cacheControl:h.headers.get("Cache-Control")||void 0,expires:h.headers.get("Expires")||void 0}})}};function Nn(r,t){const e=r.getUint32(t+4,!0),n=r.getUint32(t+0,!0);return e*Lr(2,32)+n}function ny(r,t){const e=new DataView(r),n=e.getUint8(7);if(n>3)throw Error(`Archive is spec version ${n} but this library supports up to spec version 3`);return{specVersion:n,rootDirectoryOffset:Nn(e,8),rootDirectoryLength:Nn(e,16),jsonMetadataOffset:Nn(e,24),jsonMetadataLength:Nn(e,32),leafDirectoryOffset:Nn(e,40),leafDirectoryLength:Nn(e,48),tileDataOffset:Nn(e,56),tileDataLength:Nn(e,64),numAddressedTiles:Nn(e,72),numTileEntries:Nn(e,80),numTileContents:Nn(e,88),clustered:e.getUint8(96)===1,internalCompression:e.getUint8(97),tileCompression:e.getUint8(98),tileType:e.getUint8(99),minZoom:e.getUint8(100),maxZoom:e.getUint8(101),minLon:e.getInt32(102,!0)/1e7,minLat:e.getInt32(106,!0)/1e7,maxLon:e.getInt32(110,!0)/1e7,maxLat:e.getInt32(114,!0)/1e7,centerZoom:e.getUint8(118),centerLon:e.getInt32(119,!0)/1e7,centerLat:e.getInt32(123,!0)/1e7,etag:t}}function ed(r){const t={buf:new Uint8Array(r),pos:0},e=rs(t),n=[];let s=0;for(let o=0;o<e;o++){const l=rs(t);n.push({tileId:s+l,offset:0,length:0,runLength:1}),s+=l}for(let o=0;o<e;o++)n[o].runLength=rs(t);for(let o=0;o<e;o++)n[o].length=rs(t);for(let o=0;o<e;o++){const l=rs(t);l===0&&o>0?n[o].offset=n[o-1].offset+n[o-1].length:n[o].offset=l-1}return n}function iy(r){const t=new DataView(r);return t.getUint16(2,!0)===2?(console.warn("PMTiles spec version 2 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),2):t.getUint16(2,!0)===1?(console.warn("PMTiles spec version 1 has been deprecated; please see github.com/protomaps/PMTiles for tools to upgrade"),1):3}var rl=class extends Error{};function ry(r,t){return Ke(this,null,function*(){const e=yield r.getBytes(0,16384);if(new DataView(e.data).getUint16(0,!0)!==19792)throw new Error("Wrong magic number for PMTiles archive");if(iy(e.data)<3)return[yield Qu.getHeader(r)];const s=e.data.slice(0,Qx),o=ny(s,e.etag),l=e.data.slice(o.rootDirectoryOffset,o.rootDirectoryOffset+o.rootDirectoryLength),c=`${r.getKey()}|${o.etag||""}|${o.rootDirectoryOffset}|${o.rootDirectoryLength}`,h=ed(yield t(l,o.internalCompression));return[o,[c,h.length,h]]})}function sy(r,t,e,n,s){return Ke(this,null,function*(){const o=yield r.getBytes(e,n,void 0,s.etag),l=yield t(o.data,s.internalCompression),c=ed(l);if(c.length===0)throw new Error("Empty directory is invalid");return c})}var oy=class{constructor(r=100,t=!0,e=td){this.cache=new Map,this.invalidations=new Map,this.maxCacheEntries=r,this.counter=1,this.decompress=e}getHeader(r){return Ke(this,null,function*(){const t=r.getKey(),e=this.cache.get(t);if(e)return e.lastUsed=this.counter++,yield e.data;const n=new Promise((s,o)=>{ry(r,this.decompress).then(l=>{l[1]&&this.cache.set(l[1][0],{lastUsed:this.counter++,data:Promise.resolve(l[1][2])}),s(l[0]),this.prune()}).catch(l=>{o(l)})});return this.cache.set(t,{lastUsed:this.counter++,data:n}),n})}getDirectory(r,t,e,n){return Ke(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,h)=>{sy(r,this.decompress,t,e,n).then(d=>{c(d),this.prune()}).catch(d=>{h(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}getArrayBuffer(r,t,e,n){return Ke(this,null,function*(){const s=`${r.getKey()}|${n.etag||""}|${t}|${e}`,o=this.cache.get(s);if(o)return o.lastUsed=this.counter++,yield o.data;const l=new Promise((c,h)=>{r.getBytes(t,e,void 0,n.etag).then(d=>{c(d.data),this.cache.has(s),this.prune()}).catch(d=>{h(d)})});return this.cache.set(s,{lastUsed:this.counter++,data:l}),l})}prune(){if(this.cache.size>=this.maxCacheEntries){let r=1/0,t;this.cache.forEach((e,n)=>{e.lastUsed<r&&(r=e.lastUsed,t=n)}),t&&this.cache.delete(t)}}invalidate(r){return Ke(this,null,function*(){const t=r.getKey();if(this.invalidations.get(t))return yield this.invalidations.get(t);this.cache.delete(r.getKey());const e=new Promise((n,s)=>{this.getHeader(r).then(o=>{n(),this.invalidations.delete(t)}).catch(o=>{s(o)})});this.invalidations.set(t,e)})}},ay=class{constructor(r,t,e){typeof r=="string"?this.source=new ey(r):this.source=r,e?this.decompress=e:this.decompress=td,t?this.cache=t:this.cache=new oy}getHeader(){return Ke(this,null,function*(){return yield this.cache.getHeader(this.source)})}getZxyAttempt(r,t,e,n){return Ke(this,null,function*(){const s=$x(r,t,e),o=yield this.cache.getHeader(this.source);if(o.specVersion<3)return Qu.getZxy(o,this.source,this.cache,r,t,e,n);if(r<o.minZoom||r>o.maxZoom)return;let l=o.rootDirectoryOffset,c=o.rootDirectoryLength;for(let h=0;h<=3;h++){const d=yield this.cache.getDirectory(this.source,l,c,o),f=ty(d,s);if(f){if(f.runLength>0){const m=yield this.source.getBytes(o.tileDataOffset+f.offset,f.length,n,o.etag);return{data:yield this.decompress(m.data,o.tileCompression),cacheControl:m.cacheControl,expires:m.expires}}l=o.leafDirectoryOffset+f.offset,c=f.length}else return}throw Error("Maximum directory depth exceeded")})}getZxy(r,t,e,n){return Ke(this,null,function*(){try{return yield this.getZxyAttempt(r,t,e,n)}catch(s){if(s instanceof rl)return this.cache.invalidate(this.source),yield this.getZxyAttempt(r,t,e,n);throw s}})}getMetadataAttempt(){return Ke(this,null,function*(){const r=yield this.cache.getHeader(this.source),t=yield this.source.getBytes(r.jsonMetadataOffset,r.jsonMetadataLength,void 0,r.etag),e=yield this.decompress(t.data,r.internalCompression),n=new TextDecoder("utf-8");return JSON.parse(n.decode(e))})}getMetadata(){return Ke(this,null,function*(){try{return yield this.getMetadataAttempt()}catch(r){if(r instanceof rl)return this.cache.invalidate(this.source),yield this.getMetadataAttempt();throw r}})}getTileJson(r){return Ke(this,null,function*(){const t=yield this.getHeader(),e=yield this.getMetadata(),n=Jx(t.tileType);return{tilejson:"3.0.0",scheme:"xyz",tiles:[`${r}/{z}/{x}/{y}${n}`],vector_layers:e.vector_layers,attribution:e.attribution,description:e.description,name:e.name,version:e.version,bounds:[t.minLon,t.minLat,t.maxLon,t.maxLat],center:[t.centerLon,t.centerLat,t.centerZoom],minzoom:t.minZoom,maxzoom:t.maxZoom}})}};const Wa=new Map;function ly(r){return Wa.has(r)||Wa.set(r,new ay(r)),Wa.get(r)}function cy(r,t){const e=[];let n=0;const s=new Uint8Array(r);function o(){let d=0,f=0;for(;n<s.length;){const m=s[n++];if(d|=(m&127)<<f,!(m&128))break;f+=7}return d}function l(){if(n>=s.length)return null;const d=o();return{field:d>>3,wire:d&7}}function c(d){if(d===0)o();else if(d===2){const f=o();n+=f}else d===5?n+=4:d===1&&(n+=8)}function h(){const d=o(),f=new Uint8Array(r,n,d);return n+=d,new TextDecoder().decode(f)}for(;n<s.length;){const d=l();if(!d)break;if(d.field===3&&d.wire===2){const f=o(),m=n+f;let v="";const p=[],M=[],y=[];for(;n<m;){const _=l();if(!_)break;if(_.field===1&&_.wire===2)v=h();else if(_.field===3&&_.wire===2)p.push(h());else if(_.field===4&&_.wire===2){const g=o(),C=n+g;for(;n<C;){const b=l();if(!b)break;if(b.wire===2){const I=o(),N=new Uint8Array(r,n,I);n+=I,M.push(new TextDecoder().decode(N))}else b.field===5&&b.wire===0?M.push(o()!==0):b.field===6&&b.wire===0||b.field===7&&b.wire===0?M.push(o()):c(b.wire)}}else if(_.field===5&&_.wire===0)o();else if(_.field===2&&_.wire===2){const g=o(),C=n+g;let b=0;const I=[],N=[];for(;n<C;){const F=l();if(!F)break;if(F.field===3&&F.wire===0)b=o();else if(F.field===2&&F.wire===2){const z=o(),G=n+z;for(;n<G;)I.push(o())}else if(F.field===4&&F.wire===2){const z=o(),G=n+z;for(;n<G;)N.push(o())}else c(F.wire)}y.push({type:b,tags:I,geom:N})}else c(_.wire)}if(n=m,t&&t!==v)continue;for(const _ of y){const g={};for(let D=0;D<_.tags.length-1;D+=2)g[p[_.tags[D]]]=M[_.tags[D+1]]??null;const C=[];let b=0,I=0,N=[],F=0,z=0,G=0;for(;G<_.geom.length;){if(z===0){const D=_.geom[G++];F=D&7,z=D>>3}if(F===1||F===2){F===1&&N.length>=2&&(C.push(N),N=[]);const D=Wh(_.geom[G++]),P=Wh(_.geom[G++]);b+=D,I+=P,N.push({lat:I,lon:b}),z--}else F===7?(N.length>=2&&(C.push(N),N=[]),z--):(G++,z--)}N.length>=2&&C.push(N),e.push({layer:v,type:_.type,properties:g,rings:C})}}else c(d.wire)}return e}function Wh(r){return r>>1^-(r&1)}function hy(r,t,e,n,s,o){const l=2**e,c=(r+n/o)/l,h=(t+s/o)/l,d=c*360-180;return{lat:Math.atan(Math.sinh(Math.PI*(1-2*h)))*180/Math.PI,lon:d}}async function uy(r,t){const s=[{path:`${br}/buildings.pmtiles`,z:14,name:"building"},{path:`${br}/transportation.pmtiles`,z:14,name:"segment"},{path:`${br}/base.pmtiles`,z:13,name:"water"},{path:`${br}/base.pmtiles`,z:13,name:"land"},{path:`${br}/land_cover.pmtiles`,z:13,name:"land_cover"},{path:`${br}/land_use.pmtiles`,z:13,name:"land_use"}],o=[];let l=0;for(const{path:c,z:h,name:d}of s){try{const f=ly(c),m=(y,_)=>{const g=2**h,C=Math.floor((_+180)/360*g),b=y*Math.PI/180,I=Math.floor((1-Math.log(Math.tan(b)+1/Math.cos(b))/Math.PI)/2*g);return{x:C,y:I}},v=m(r.maxLat,r.minLon),p=m(r.minLat,r.maxLon),M=[];for(let y=v.y;y<=p.y;y++)for(let _=v.x;_<=p.x;_++)M.push((async(g,C)=>{try{const b=await f.getZxy(h,g,C);if(!b)return;const I=cy(b.data,d);for(const N of I){for(const F of N.rings)for(const z of F){const G=hy(g,C,h,z.lon,z.lat,4096);z.lat=G.lat,z.lon=G.lon}o.push(N)}}catch{}})(_,y));await Promise.all(M)}catch{}l++,t(Math.round(l/s.length*100))}return o}function dy(r="terrain3d.stl"){if(!Lt.tg)return;const t=[];new nt;const e=new nt;if(Lt.tg.traverse(p=>{if(!(p instanceof sn))return;const M=p.geometry,y=M.attributes.position;if(!y)return;const _=M.index,g=p.matrixWorld;function C(b){const I=new nt(y.getX(b),y.getY(b),y.getZ(b));return I.applyMatrix4(g),I}if(_)for(let b=0;b<_.count;b+=3)t.push([C(_.getX(b)),C(_.getX(b+1)),C(_.getX(b+2))]);else for(let b=0;b<y.count;b+=3)t.push([C(b),C(b+1),C(b+2)])}),!t.length){alert("Aucune géométrie à exporter. Générez d'abord le terrain 3D.");return}const n=new ArrayBuffer(84+t.length*50),s=new DataView(n),l=new TextEncoder().encode("Terrain3D STL - generated by terrain3d.app");for(let p=0;p<Math.min(l.length,80);p++)s.setUint8(p,l[p]);s.setUint32(80,t.length,!0);let c=84;const h=new nt,d=new nt;for(const[p,M,y]of t){h.subVectors(M,p),d.subVectors(y,p),e.crossVectors(h,d).normalize(),s.setFloat32(c,e.x,!0),c+=4,s.setFloat32(c,e.y,!0),c+=4,s.setFloat32(c,e.z,!0),c+=4;for(const _ of[p,M,y])s.setFloat32(c,_.x,!0),c+=4,s.setFloat32(c,_.y,!0),c+=4,s.setFloat32(c,_.z,!0),c+=4;s.setUint16(c,0,!0),c+=2}const f=new Blob([n],{type:"application/octet-stream"}),m=URL.createObjectURL(f),v=document.createElement("a");v.href=m,v.download=r,v.click(),URL.revokeObjectURL(m),console.log(`STL exporté: ${t.length} triangles, ${(n.byteLength/1024).toFixed(0)} KB`)}function _o(r){throw new Error('Could not dynamically require "'+r+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var nd={exports:{}};/*!

JSZip v3.10.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/main/LICENSE
*/(function(r,t){(function(e){r.exports=e()})(function(){return function e(n,s,o){function l(d,f){if(!s[d]){if(!n[d]){var m=typeof _o=="function"&&_o;if(!f&&m)return m(d,!0);if(c)return c(d,!0);var v=new Error("Cannot find module '"+d+"'");throw v.code="MODULE_NOT_FOUND",v}var p=s[d]={exports:{}};n[d][0].call(p.exports,function(M){var y=n[d][1][M];return l(y||M)},p,p.exports,e,n,s,o)}return s[d].exports}for(var c=typeof _o=="function"&&_o,h=0;h<o.length;h++)l(o[h]);return l}({1:[function(e,n,s){var o=e("./utils"),l=e("./support"),c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";s.encode=function(h){for(var d,f,m,v,p,M,y,_=[],g=0,C=h.length,b=C,I=o.getTypeOf(h)!=="string";g<h.length;)b=C-g,m=I?(d=h[g++],f=g<C?h[g++]:0,g<C?h[g++]:0):(d=h.charCodeAt(g++),f=g<C?h.charCodeAt(g++):0,g<C?h.charCodeAt(g++):0),v=d>>2,p=(3&d)<<4|f>>4,M=1<b?(15&f)<<2|m>>6:64,y=2<b?63&m:64,_.push(c.charAt(v)+c.charAt(p)+c.charAt(M)+c.charAt(y));return _.join("")},s.decode=function(h){var d,f,m,v,p,M,y=0,_=0,g="data:";if(h.substr(0,g.length)===g)throw new Error("Invalid base64 input, it looks like a data url.");var C,b=3*(h=h.replace(/[^A-Za-z0-9+/=]/g,"")).length/4;if(h.charAt(h.length-1)===c.charAt(64)&&b--,h.charAt(h.length-2)===c.charAt(64)&&b--,b%1!=0)throw new Error("Invalid base64 input, bad content length.");for(C=l.uint8array?new Uint8Array(0|b):new Array(0|b);y<h.length;)d=c.indexOf(h.charAt(y++))<<2|(v=c.indexOf(h.charAt(y++)))>>4,f=(15&v)<<4|(p=c.indexOf(h.charAt(y++)))>>2,m=(3&p)<<6|(M=c.indexOf(h.charAt(y++))),C[_++]=d,p!==64&&(C[_++]=f),M!==64&&(C[_++]=m);return C}},{"./support":30,"./utils":32}],2:[function(e,n,s){var o=e("./external"),l=e("./stream/DataWorker"),c=e("./stream/Crc32Probe"),h=e("./stream/DataLengthProbe");function d(f,m,v,p,M){this.compressedSize=f,this.uncompressedSize=m,this.crc32=v,this.compression=p,this.compressedContent=M}d.prototype={getContentWorker:function(){var f=new l(o.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new h("data_length")),m=this;return f.on("end",function(){if(this.streamInfo.data_length!==m.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),f},getCompressedWorker:function(){return new l(o.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},d.createWorkerFrom=function(f,m,v){return f.pipe(new c).pipe(new h("uncompressedSize")).pipe(m.compressWorker(v)).pipe(new h("compressedSize")).withStreamInfo("compression",m)},n.exports=d},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(e,n,s){var o=e("./stream/GenericWorker");s.STORE={magic:"\0\0",compressWorker:function(){return new o("STORE compression")},uncompressWorker:function(){return new o("STORE decompression")}},s.DEFLATE=e("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(e,n,s){var o=e("./utils"),l=function(){for(var c,h=[],d=0;d<256;d++){c=d;for(var f=0;f<8;f++)c=1&c?3988292384^c>>>1:c>>>1;h[d]=c}return h}();n.exports=function(c,h){return c!==void 0&&c.length?o.getTypeOf(c)!=="string"?function(d,f,m,v){var p=l,M=v+m;d^=-1;for(var y=v;y<M;y++)d=d>>>8^p[255&(d^f[y])];return-1^d}(0|h,c,c.length,0):function(d,f,m,v){var p=l,M=v+m;d^=-1;for(var y=v;y<M;y++)d=d>>>8^p[255&(d^f.charCodeAt(y))];return-1^d}(0|h,c,c.length,0):0}},{"./utils":32}],5:[function(e,n,s){s.base64=!1,s.binary=!1,s.dir=!1,s.createFolders=!0,s.date=null,s.compression=null,s.compressionOptions=null,s.comment=null,s.unixPermissions=null,s.dosPermissions=null},{}],6:[function(e,n,s){var o=null;o=typeof Promise<"u"?Promise:e("lie"),n.exports={Promise:o}},{lie:37}],7:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Uint32Array<"u",l=e("pako"),c=e("./utils"),h=e("./stream/GenericWorker"),d=o?"uint8array":"array";function f(m,v){h.call(this,"FlateWorker/"+m),this._pako=null,this._pakoAction=m,this._pakoOptions=v,this.meta={}}s.magic="\b\0",c.inherits(f,h),f.prototype.processChunk=function(m){this.meta=m.meta,this._pako===null&&this._createPako(),this._pako.push(c.transformTo(d,m.data),!1)},f.prototype.flush=function(){h.prototype.flush.call(this),this._pako===null&&this._createPako(),this._pako.push([],!0)},f.prototype.cleanUp=function(){h.prototype.cleanUp.call(this),this._pako=null},f.prototype._createPako=function(){this._pako=new l[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var m=this;this._pako.onData=function(v){m.push({data:v,meta:m.meta})}},s.compressWorker=function(m){return new f("Deflate",m)},s.uncompressWorker=function(){return new f("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(e,n,s){function o(p,M){var y,_="";for(y=0;y<M;y++)_+=String.fromCharCode(255&p),p>>>=8;return _}function l(p,M,y,_,g,C){var b,I,N=p.file,F=p.compression,z=C!==d.utf8encode,G=c.transformTo("string",C(N.name)),D=c.transformTo("string",d.utf8encode(N.name)),P=N.comment,W=c.transformTo("string",C(P)),O=c.transformTo("string",d.utf8encode(P)),B=D.length!==N.name.length,A=O.length!==P.length,Z="",at="",ot="",Y=N.dir,st=N.date,rt={crc32:0,compressedSize:0,uncompressedSize:0};M&&!y||(rt.crc32=p.crc32,rt.compressedSize=p.compressedSize,rt.uncompressedSize=p.uncompressedSize);var q=0;M&&(q|=8),z||!B&&!A||(q|=2048);var Q=0,Ct=0;Y&&(Q|=16),g==="UNIX"?(Ct=798,Q|=function(et,Mt){var bt=et;return et||(bt=Mt?16893:33204),(65535&bt)<<16}(N.unixPermissions,Y)):(Ct=20,Q|=function(et){return 63&(et||0)}(N.dosPermissions)),b=st.getUTCHours(),b<<=6,b|=st.getUTCMinutes(),b<<=5,b|=st.getUTCSeconds()/2,I=st.getUTCFullYear()-1980,I<<=4,I|=st.getUTCMonth()+1,I<<=5,I|=st.getUTCDate(),B&&(at=o(1,1)+o(f(G),4)+D,Z+="up"+o(at.length,2)+at),A&&(ot=o(1,1)+o(f(W),4)+O,Z+="uc"+o(ot.length,2)+ot);var J="";return J+=`
\0`,J+=o(q,2),J+=F.magic,J+=o(b,2),J+=o(I,2),J+=o(rt.crc32,4),J+=o(rt.compressedSize,4),J+=o(rt.uncompressedSize,4),J+=o(G.length,2),J+=o(Z.length,2),{fileRecord:m.LOCAL_FILE_HEADER+J+G+Z,dirRecord:m.CENTRAL_FILE_HEADER+o(Ct,2)+J+o(W.length,2)+"\0\0\0\0"+o(Q,4)+o(_,4)+G+Z+W}}var c=e("../utils"),h=e("../stream/GenericWorker"),d=e("../utf8"),f=e("../crc32"),m=e("../signature");function v(p,M,y,_){h.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=M,this.zipPlatform=y,this.encodeFileName=_,this.streamFiles=p,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}c.inherits(v,h),v.prototype.push=function(p){var M=p.meta.percent||0,y=this.entriesCount,_=this._sources.length;this.accumulate?this.contentBuffer.push(p):(this.bytesWritten+=p.data.length,h.prototype.push.call(this,{data:p.data,meta:{currentFile:this.currentFile,percent:y?(M+100*(y-_-1))/y:100}}))},v.prototype.openedSource=function(p){this.currentSourceOffset=this.bytesWritten,this.currentFile=p.file.name;var M=this.streamFiles&&!p.file.dir;if(M){var y=l(p,M,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:y.fileRecord,meta:{percent:0}})}else this.accumulate=!0},v.prototype.closedSource=function(p){this.accumulate=!1;var M=this.streamFiles&&!p.file.dir,y=l(p,M,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(y.dirRecord),M)this.push({data:function(_){return m.DATA_DESCRIPTOR+o(_.crc32,4)+o(_.compressedSize,4)+o(_.uncompressedSize,4)}(p),meta:{percent:100}});else for(this.push({data:y.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},v.prototype.flush=function(){for(var p=this.bytesWritten,M=0;M<this.dirRecords.length;M++)this.push({data:this.dirRecords[M],meta:{percent:100}});var y=this.bytesWritten-p,_=function(g,C,b,I,N){var F=c.transformTo("string",N(I));return m.CENTRAL_DIRECTORY_END+"\0\0\0\0"+o(g,2)+o(g,2)+o(C,4)+o(b,4)+o(F.length,2)+F}(this.dirRecords.length,y,p,this.zipComment,this.encodeFileName);this.push({data:_,meta:{percent:100}})},v.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},v.prototype.registerPrevious=function(p){this._sources.push(p);var M=this;return p.on("data",function(y){M.processChunk(y)}),p.on("end",function(){M.closedSource(M.previous.streamInfo),M._sources.length?M.prepareNextSource():M.end()}),p.on("error",function(y){M.error(y)}),this},v.prototype.resume=function(){return!!h.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},v.prototype.error=function(p){var M=this._sources;if(!h.prototype.error.call(this,p))return!1;for(var y=0;y<M.length;y++)try{M[y].error(p)}catch{}return!0},v.prototype.lock=function(){h.prototype.lock.call(this);for(var p=this._sources,M=0;M<p.length;M++)p[M].lock()},n.exports=v},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(e,n,s){var o=e("../compressions"),l=e("./ZipFileWorker");s.generateWorker=function(c,h,d){var f=new l(h.streamFiles,d,h.platform,h.encodeFileName),m=0;try{c.forEach(function(v,p){m++;var M=function(C,b){var I=C||b,N=o[I];if(!N)throw new Error(I+" is not a valid compression method !");return N}(p.options.compression,h.compression),y=p.options.compressionOptions||h.compressionOptions||{},_=p.dir,g=p.date;p._compressWorker(M,y).withStreamInfo("file",{name:v,dir:_,date:g,comment:p.comment||"",unixPermissions:p.unixPermissions,dosPermissions:p.dosPermissions}).pipe(f)}),f.entriesCount=m}catch(v){f.error(v)}return f}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(e,n,s){function o(){if(!(this instanceof o))return new o;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files=Object.create(null),this.comment=null,this.root="",this.clone=function(){var l=new o;for(var c in this)typeof this[c]!="function"&&(l[c]=this[c]);return l}}(o.prototype=e("./object")).loadAsync=e("./load"),o.support=e("./support"),o.defaults=e("./defaults"),o.version="3.10.1",o.loadAsync=function(l,c){return new o().loadAsync(l,c)},o.external=e("./external"),n.exports=o},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(e,n,s){var o=e("./utils"),l=e("./external"),c=e("./utf8"),h=e("./zipEntries"),d=e("./stream/Crc32Probe"),f=e("./nodejsUtils");function m(v){return new l.Promise(function(p,M){var y=v.decompressed.getContentWorker().pipe(new d);y.on("error",function(_){M(_)}).on("end",function(){y.streamInfo.crc32!==v.decompressed.crc32?M(new Error("Corrupted zip : CRC32 mismatch")):p()}).resume()})}n.exports=function(v,p){var M=this;return p=o.extend(p||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:c.utf8decode}),f.isNode&&f.isStream(v)?l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):o.prepareContent("the loaded zip file",v,!0,p.optimizedBinaryString,p.base64).then(function(y){var _=new h(p);return _.load(y),_}).then(function(y){var _=[l.Promise.resolve(y)],g=y.files;if(p.checkCRC32)for(var C=0;C<g.length;C++)_.push(m(g[C]));return l.Promise.all(_)}).then(function(y){for(var _=y.shift(),g=_.files,C=0;C<g.length;C++){var b=g[C],I=b.fileNameStr,N=o.resolve(b.fileNameStr);M.file(N,b.decompressed,{binary:!0,optimizedBinaryString:!0,date:b.date,dir:b.dir,comment:b.fileCommentStr.length?b.fileCommentStr:null,unixPermissions:b.unixPermissions,dosPermissions:b.dosPermissions,createFolders:p.createFolders}),b.dir||(M.file(N).unsafeOriginalName=I)}return _.zipComment.length&&(M.comment=_.zipComment),M})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(e,n,s){var o=e("../utils"),l=e("../stream/GenericWorker");function c(h,d){l.call(this,"Nodejs stream input adapter for "+h),this._upstreamEnded=!1,this._bindStream(d)}o.inherits(c,l),c.prototype._bindStream=function(h){var d=this;(this._stream=h).pause(),h.on("data",function(f){d.push({data:f,meta:{percent:0}})}).on("error",function(f){d.isPaused?this.generatedError=f:d.error(f)}).on("end",function(){d.isPaused?d._upstreamEnded=!0:d.end()})},c.prototype.pause=function(){return!!l.prototype.pause.call(this)&&(this._stream.pause(),!0)},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},n.exports=c},{"../stream/GenericWorker":28,"../utils":32}],13:[function(e,n,s){var o=e("readable-stream").Readable;function l(c,h,d){o.call(this,h),this._helper=c;var f=this;c.on("data",function(m,v){f.push(m)||f._helper.pause(),d&&d(v)}).on("error",function(m){f.emit("error",m)}).on("end",function(){f.push(null)})}e("../utils").inherits(l,o),l.prototype._read=function(){this._helper.resume()},n.exports=l},{"../utils":32,"readable-stream":16}],14:[function(e,n,s){n.exports={isNode:typeof Buffer<"u",newBufferFrom:function(o,l){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(o,l);if(typeof o=="number")throw new Error('The "data" argument must not be a number');return new Buffer(o,l)},allocBuffer:function(o){if(Buffer.alloc)return Buffer.alloc(o);var l=new Buffer(o);return l.fill(0),l},isBuffer:function(o){return Buffer.isBuffer(o)},isStream:function(o){return o&&typeof o.on=="function"&&typeof o.pause=="function"&&typeof o.resume=="function"}}},{}],15:[function(e,n,s){function o(N,F,z){var G,D=c.getTypeOf(F),P=c.extend(z||{},f);P.date=P.date||new Date,P.compression!==null&&(P.compression=P.compression.toUpperCase()),typeof P.unixPermissions=="string"&&(P.unixPermissions=parseInt(P.unixPermissions,8)),P.unixPermissions&&16384&P.unixPermissions&&(P.dir=!0),P.dosPermissions&&16&P.dosPermissions&&(P.dir=!0),P.dir&&(N=g(N)),P.createFolders&&(G=_(N))&&C.call(this,G,!0);var W=D==="string"&&P.binary===!1&&P.base64===!1;z&&z.binary!==void 0||(P.binary=!W),(F instanceof m&&F.uncompressedSize===0||P.dir||!F||F.length===0)&&(P.base64=!1,P.binary=!0,F="",P.compression="STORE",D="string");var O=null;O=F instanceof m||F instanceof h?F:M.isNode&&M.isStream(F)?new y(N,F):c.prepareContent(N,F,P.binary,P.optimizedBinaryString,P.base64);var B=new v(N,O,P);this.files[N]=B}var l=e("./utf8"),c=e("./utils"),h=e("./stream/GenericWorker"),d=e("./stream/StreamHelper"),f=e("./defaults"),m=e("./compressedObject"),v=e("./zipObject"),p=e("./generate"),M=e("./nodejsUtils"),y=e("./nodejs/NodejsStreamInputAdapter"),_=function(N){N.slice(-1)==="/"&&(N=N.substring(0,N.length-1));var F=N.lastIndexOf("/");return 0<F?N.substring(0,F):""},g=function(N){return N.slice(-1)!=="/"&&(N+="/"),N},C=function(N,F){return F=F!==void 0?F:f.createFolders,N=g(N),this.files[N]||o.call(this,N,null,{dir:!0,createFolders:F}),this.files[N]};function b(N){return Object.prototype.toString.call(N)==="[object RegExp]"}var I={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(N){var F,z,G;for(F in this.files)G=this.files[F],(z=F.slice(this.root.length,F.length))&&F.slice(0,this.root.length)===this.root&&N(z,G)},filter:function(N){var F=[];return this.forEach(function(z,G){N(z,G)&&F.push(G)}),F},file:function(N,F,z){if(arguments.length!==1)return N=this.root+N,o.call(this,N,F,z),this;if(b(N)){var G=N;return this.filter(function(P,W){return!W.dir&&G.test(P)})}var D=this.files[this.root+N];return D&&!D.dir?D:null},folder:function(N){if(!N)return this;if(b(N))return this.filter(function(D,P){return P.dir&&N.test(D)});var F=this.root+N,z=C.call(this,F),G=this.clone();return G.root=z.name,G},remove:function(N){N=this.root+N;var F=this.files[N];if(F||(N.slice(-1)!=="/"&&(N+="/"),F=this.files[N]),F&&!F.dir)delete this.files[N];else for(var z=this.filter(function(D,P){return P.name.slice(0,N.length)===N}),G=0;G<z.length;G++)delete this.files[z[G].name];return this},generate:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(N){var F,z={};try{if((z=c.extend(N||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:l.utf8encode})).type=z.type.toLowerCase(),z.compression=z.compression.toUpperCase(),z.type==="binarystring"&&(z.type="string"),!z.type)throw new Error("No output type specified.");c.checkSupport(z.type),z.platform!=="darwin"&&z.platform!=="freebsd"&&z.platform!=="linux"&&z.platform!=="sunos"||(z.platform="UNIX"),z.platform==="win32"&&(z.platform="DOS");var G=z.comment||this.comment||"";F=p.generateWorker(this,z,G)}catch(D){(F=new h("error")).error(D)}return new d(F,z.type||"string",z.mimeType)},generateAsync:function(N,F){return this.generateInternalStream(N).accumulate(F)},generateNodeStream:function(N,F){return(N=N||{}).type||(N.type="nodebuffer"),this.generateInternalStream(N).toNodejsStream(F)}};n.exports=I},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(e,n,s){n.exports=e("stream")},{stream:void 0}],17:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c);for(var h=0;h<this.data.length;h++)c[h]=255&c[h]}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data[this.zero+c]},l.prototype.lastIndexOfSignature=function(c){for(var h=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),m=c.charCodeAt(3),v=this.length-4;0<=v;--v)if(this.data[v]===h&&this.data[v+1]===d&&this.data[v+2]===f&&this.data[v+3]===m)return v-this.zero;return-1},l.prototype.readAndCheckSignature=function(c){var h=c.charCodeAt(0),d=c.charCodeAt(1),f=c.charCodeAt(2),m=c.charCodeAt(3),v=this.readData(4);return h===v[0]&&d===v[1]&&f===v[2]&&m===v[3]},l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return[];var h=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./DataReader":18}],18:[function(e,n,s){var o=e("../utils");function l(c){this.data=c,this.length=c.length,this.index=0,this.zero=0}l.prototype={checkOffset:function(c){this.checkIndex(this.index+c)},checkIndex:function(c){if(this.length<this.zero+c||c<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+c+"). Corrupted zip ?")},setIndex:function(c){this.checkIndex(c),this.index=c},skip:function(c){this.setIndex(this.index+c)},byteAt:function(){},readInt:function(c){var h,d=0;for(this.checkOffset(c),h=this.index+c-1;h>=this.index;h--)d=(d<<8)+this.byteAt(h);return this.index+=c,d},readString:function(c){return o.transformTo("string",this.readData(c))},readData:function(){},lastIndexOfSignature:function(){},readAndCheckSignature:function(){},readDate:function(){var c=this.readInt(4);return new Date(Date.UTC(1980+(c>>25&127),(c>>21&15)-1,c>>16&31,c>>11&31,c>>5&63,(31&c)<<1))}},n.exports=l},{"../utils":32}],19:[function(e,n,s){var o=e("./Uint8ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){this.checkOffset(c);var h=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(e,n,s){var o=e("./DataReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.byteAt=function(c){return this.data.charCodeAt(this.zero+c)},l.prototype.lastIndexOfSignature=function(c){return this.data.lastIndexOf(c)-this.zero},l.prototype.readAndCheckSignature=function(c){return c===this.readData(4)},l.prototype.readData=function(c){this.checkOffset(c);var h=this.data.slice(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./DataReader":18}],21:[function(e,n,s){var o=e("./ArrayReader");function l(c){o.call(this,c)}e("../utils").inherits(l,o),l.prototype.readData=function(c){if(this.checkOffset(c),c===0)return new Uint8Array(0);var h=this.data.subarray(this.zero+this.index,this.zero+this.index+c);return this.index+=c,h},n.exports=l},{"../utils":32,"./ArrayReader":17}],22:[function(e,n,s){var o=e("../utils"),l=e("../support"),c=e("./ArrayReader"),h=e("./StringReader"),d=e("./NodeBufferReader"),f=e("./Uint8ArrayReader");n.exports=function(m){var v=o.getTypeOf(m);return o.checkSupport(v),v!=="string"||l.uint8array?v==="nodebuffer"?new d(m):l.uint8array?new f(o.transformTo("uint8array",m)):new c(o.transformTo("array",m)):new h(m)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(e,n,s){s.LOCAL_FILE_HEADER="PK",s.CENTRAL_FILE_HEADER="PK",s.CENTRAL_DIRECTORY_END="PK",s.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK\x07",s.ZIP64_CENTRAL_DIRECTORY_END="PK",s.DATA_DESCRIPTOR="PK\x07\b"},{}],24:[function(e,n,s){var o=e("./GenericWorker"),l=e("../utils");function c(h){o.call(this,"ConvertWorker to "+h),this.destType=h}l.inherits(c,o),c.prototype.processChunk=function(h){this.push({data:l.transformTo(this.destType,h.data),meta:h.meta})},n.exports=c},{"../utils":32,"./GenericWorker":28}],25:[function(e,n,s){var o=e("./GenericWorker"),l=e("../crc32");function c(){o.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}e("../utils").inherits(c,o),c.prototype.processChunk=function(h){this.streamInfo.crc32=l(h.data,this.streamInfo.crc32||0),this.push(h)},n.exports=c},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(h){l.call(this,"DataLengthProbe for "+h),this.propName=h,this.withStreamInfo(h,0)}o.inherits(c,l),c.prototype.processChunk=function(h){if(h){var d=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=d+h.data.length}l.prototype.processChunk.call(this,h)},n.exports=c},{"../utils":32,"./GenericWorker":28}],27:[function(e,n,s){var o=e("../utils"),l=e("./GenericWorker");function c(h){l.call(this,"DataWorker");var d=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,h.then(function(f){d.dataIsReady=!0,d.data=f,d.max=f&&f.length||0,d.type=o.getTypeOf(f),d.isPaused||d._tickAndRepeat()},function(f){d.error(f)})}o.inherits(c,l),c.prototype.cleanUp=function(){l.prototype.cleanUp.call(this),this.data=null},c.prototype.resume=function(){return!!l.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,o.delay(this._tickAndRepeat,[],this)),!0)},c.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(o.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},c.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var h=null,d=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":h=this.data.substring(this.index,d);break;case"uint8array":h=this.data.subarray(this.index,d);break;case"array":case"nodebuffer":h=this.data.slice(this.index,d)}return this.index=d,this.push({data:h,meta:{percent:this.max?this.index/this.max*100:0}})},n.exports=c},{"../utils":32,"./GenericWorker":28}],28:[function(e,n,s){function o(l){this.name=l||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}o.prototype={push:function(l){this.emit("data",l)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(l){this.emit("error",l)}return!0},error:function(l){return!this.isFinished&&(this.isPaused?this.generatedError=l:(this.isFinished=!0,this.emit("error",l),this.previous&&this.previous.error(l),this.cleanUp()),!0)},on:function(l,c){return this._listeners[l].push(c),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(l,c){if(this._listeners[l])for(var h=0;h<this._listeners[l].length;h++)this._listeners[l][h].call(this,c)},pipe:function(l){return l.registerPrevious(this)},registerPrevious:function(l){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=l.streamInfo,this.mergeStreamInfo(),this.previous=l;var c=this;return l.on("data",function(h){c.processChunk(h)}),l.on("end",function(){c.end()}),l.on("error",function(h){c.error(h)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var l=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),l=!0),this.previous&&this.previous.resume(),!l},flush:function(){},processChunk:function(l){this.push(l)},withStreamInfo:function(l,c){return this.extraStreamInfo[l]=c,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var l in this.extraStreamInfo)Object.prototype.hasOwnProperty.call(this.extraStreamInfo,l)&&(this.streamInfo[l]=this.extraStreamInfo[l])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var l="Worker "+this.name;return this.previous?this.previous+" -> "+l:l}},n.exports=o},{}],29:[function(e,n,s){var o=e("../utils"),l=e("./ConvertWorker"),c=e("./GenericWorker"),h=e("../base64"),d=e("../support"),f=e("../external"),m=null;if(d.nodestream)try{m=e("../nodejs/NodejsStreamOutputAdapter")}catch{}function v(M,y){return new f.Promise(function(_,g){var C=[],b=M._internalType,I=M._outputType,N=M._mimeType;M.on("data",function(F,z){C.push(F),y&&y(z)}).on("error",function(F){C=[],g(F)}).on("end",function(){try{var F=function(z,G,D){switch(z){case"blob":return o.newBlob(o.transformTo("arraybuffer",G),D);case"base64":return h.encode(G);default:return o.transformTo(z,G)}}(I,function(z,G){var D,P=0,W=null,O=0;for(D=0;D<G.length;D++)O+=G[D].length;switch(z){case"string":return G.join("");case"array":return Array.prototype.concat.apply([],G);case"uint8array":for(W=new Uint8Array(O),D=0;D<G.length;D++)W.set(G[D],P),P+=G[D].length;return W;case"nodebuffer":return Buffer.concat(G);default:throw new Error("concat : unsupported type '"+z+"'")}}(b,C),N);_(F)}catch(z){g(z)}C=[]}).resume()})}function p(M,y,_){var g=y;switch(y){case"blob":case"arraybuffer":g="uint8array";break;case"base64":g="string"}try{this._internalType=g,this._outputType=y,this._mimeType=_,o.checkSupport(g),this._worker=M.pipe(new l(g)),M.lock()}catch(C){this._worker=new c("error"),this._worker.error(C)}}p.prototype={accumulate:function(M){return v(this,M)},on:function(M,y){var _=this;return M==="data"?this._worker.on(M,function(g){y.call(_,g.data,g.meta)}):this._worker.on(M,function(){o.delay(y,arguments,_)}),this},resume:function(){return o.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(M){if(o.checkSupport("nodestream"),this._outputType!=="nodebuffer")throw new Error(this._outputType+" is not supported by this method");return new m(this,{objectMode:this._outputType!=="nodebuffer"},M)}},n.exports=p},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(e,n,s){if(s.base64=!0,s.array=!0,s.string=!0,s.arraybuffer=typeof ArrayBuffer<"u"&&typeof Uint8Array<"u",s.nodebuffer=typeof Buffer<"u",s.uint8array=typeof Uint8Array<"u",typeof ArrayBuffer>"u")s.blob=!1;else{var o=new ArrayBuffer(0);try{s.blob=new Blob([o],{type:"application/zip"}).size===0}catch{try{var l=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);l.append(o),s.blob=l.getBlob("application/zip").size===0}catch{s.blob=!1}}}try{s.nodestream=!!e("readable-stream").Readable}catch{s.nodestream=!1}},{"readable-stream":16}],31:[function(e,n,s){for(var o=e("./utils"),l=e("./support"),c=e("./nodejsUtils"),h=e("./stream/GenericWorker"),d=new Array(256),f=0;f<256;f++)d[f]=252<=f?6:248<=f?5:240<=f?4:224<=f?3:192<=f?2:1;d[254]=d[254]=1;function m(){h.call(this,"utf-8 decode"),this.leftOver=null}function v(){h.call(this,"utf-8 encode")}s.utf8encode=function(p){return l.nodebuffer?c.newBufferFrom(p,"utf-8"):function(M){var y,_,g,C,b,I=M.length,N=0;for(C=0;C<I;C++)(64512&(_=M.charCodeAt(C)))==55296&&C+1<I&&(64512&(g=M.charCodeAt(C+1)))==56320&&(_=65536+(_-55296<<10)+(g-56320),C++),N+=_<128?1:_<2048?2:_<65536?3:4;for(y=l.uint8array?new Uint8Array(N):new Array(N),C=b=0;b<N;C++)(64512&(_=M.charCodeAt(C)))==55296&&C+1<I&&(64512&(g=M.charCodeAt(C+1)))==56320&&(_=65536+(_-55296<<10)+(g-56320),C++),_<128?y[b++]=_:(_<2048?y[b++]=192|_>>>6:(_<65536?y[b++]=224|_>>>12:(y[b++]=240|_>>>18,y[b++]=128|_>>>12&63),y[b++]=128|_>>>6&63),y[b++]=128|63&_);return y}(p)},s.utf8decode=function(p){return l.nodebuffer?o.transformTo("nodebuffer",p).toString("utf-8"):function(M){var y,_,g,C,b=M.length,I=new Array(2*b);for(y=_=0;y<b;)if((g=M[y++])<128)I[_++]=g;else if(4<(C=d[g]))I[_++]=65533,y+=C-1;else{for(g&=C===2?31:C===3?15:7;1<C&&y<b;)g=g<<6|63&M[y++],C--;1<C?I[_++]=65533:g<65536?I[_++]=g:(g-=65536,I[_++]=55296|g>>10&1023,I[_++]=56320|1023&g)}return I.length!==_&&(I.subarray?I=I.subarray(0,_):I.length=_),o.applyFromCharCode(I)}(p=o.transformTo(l.uint8array?"uint8array":"array",p))},o.inherits(m,h),m.prototype.processChunk=function(p){var M=o.transformTo(l.uint8array?"uint8array":"array",p.data);if(this.leftOver&&this.leftOver.length){if(l.uint8array){var y=M;(M=new Uint8Array(y.length+this.leftOver.length)).set(this.leftOver,0),M.set(y,this.leftOver.length)}else M=this.leftOver.concat(M);this.leftOver=null}var _=function(C,b){var I;for((b=b||C.length)>C.length&&(b=C.length),I=b-1;0<=I&&(192&C[I])==128;)I--;return I<0||I===0?b:I+d[C[I]]>b?I:b}(M),g=M;_!==M.length&&(l.uint8array?(g=M.subarray(0,_),this.leftOver=M.subarray(_,M.length)):(g=M.slice(0,_),this.leftOver=M.slice(_,M.length))),this.push({data:s.utf8decode(g),meta:p.meta})},m.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=m,o.inherits(v,h),v.prototype.processChunk=function(p){this.push({data:s.utf8encode(p.data),meta:p.meta})},s.Utf8EncodeWorker=v},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(e,n,s){var o=e("./support"),l=e("./base64"),c=e("./nodejsUtils"),h=e("./external");function d(y){return y}function f(y,_){for(var g=0;g<y.length;++g)_[g]=255&y.charCodeAt(g);return _}e("setimmediate"),s.newBlob=function(y,_){s.checkSupport("blob");try{return new Blob([y],{type:_})}catch{try{var g=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return g.append(y),g.getBlob(_)}catch{throw new Error("Bug : can't construct the Blob.")}}};var m={stringifyByChunk:function(y,_,g){var C=[],b=0,I=y.length;if(I<=g)return String.fromCharCode.apply(null,y);for(;b<I;)_==="array"||_==="nodebuffer"?C.push(String.fromCharCode.apply(null,y.slice(b,Math.min(b+g,I)))):C.push(String.fromCharCode.apply(null,y.subarray(b,Math.min(b+g,I)))),b+=g;return C.join("")},stringifyByChar:function(y){for(var _="",g=0;g<y.length;g++)_+=String.fromCharCode(y[g]);return _},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&String.fromCharCode.apply(null,new Uint8Array(1)).length===1}catch{return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&String.fromCharCode.apply(null,c.allocBuffer(1)).length===1}catch{return!1}}()}};function v(y){var _=65536,g=s.getTypeOf(y),C=!0;if(g==="uint8array"?C=m.applyCanBeUsed.uint8array:g==="nodebuffer"&&(C=m.applyCanBeUsed.nodebuffer),C)for(;1<_;)try{return m.stringifyByChunk(y,g,_)}catch{_=Math.floor(_/2)}return m.stringifyByChar(y)}function p(y,_){for(var g=0;g<y.length;g++)_[g]=y[g];return _}s.applyFromCharCode=v;var M={};M.string={string:d,array:function(y){return f(y,new Array(y.length))},arraybuffer:function(y){return M.string.uint8array(y).buffer},uint8array:function(y){return f(y,new Uint8Array(y.length))},nodebuffer:function(y){return f(y,c.allocBuffer(y.length))}},M.array={string:v,array:d,arraybuffer:function(y){return new Uint8Array(y).buffer},uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(y)}},M.arraybuffer={string:function(y){return v(new Uint8Array(y))},array:function(y){return p(new Uint8Array(y),new Array(y.byteLength))},arraybuffer:d,uint8array:function(y){return new Uint8Array(y)},nodebuffer:function(y){return c.newBufferFrom(new Uint8Array(y))}},M.uint8array={string:v,array:function(y){return p(y,new Array(y.length))},arraybuffer:function(y){return y.buffer},uint8array:d,nodebuffer:function(y){return c.newBufferFrom(y)}},M.nodebuffer={string:v,array:function(y){return p(y,new Array(y.length))},arraybuffer:function(y){return M.nodebuffer.uint8array(y).buffer},uint8array:function(y){return p(y,new Uint8Array(y.length))},nodebuffer:d},s.transformTo=function(y,_){if(_=_||"",!y)return _;s.checkSupport(y);var g=s.getTypeOf(_);return M[g][y](_)},s.resolve=function(y){for(var _=y.split("/"),g=[],C=0;C<_.length;C++){var b=_[C];b==="."||b===""&&C!==0&&C!==_.length-1||(b===".."?g.pop():g.push(b))}return g.join("/")},s.getTypeOf=function(y){return typeof y=="string"?"string":Object.prototype.toString.call(y)==="[object Array]"?"array":o.nodebuffer&&c.isBuffer(y)?"nodebuffer":o.uint8array&&y instanceof Uint8Array?"uint8array":o.arraybuffer&&y instanceof ArrayBuffer?"arraybuffer":void 0},s.checkSupport=function(y){if(!o[y.toLowerCase()])throw new Error(y+" is not supported by this platform")},s.MAX_VALUE_16BITS=65535,s.MAX_VALUE_32BITS=-1,s.pretty=function(y){var _,g,C="";for(g=0;g<(y||"").length;g++)C+="\\x"+((_=y.charCodeAt(g))<16?"0":"")+_.toString(16).toUpperCase();return C},s.delay=function(y,_,g){setImmediate(function(){y.apply(g||null,_||[])})},s.inherits=function(y,_){function g(){}g.prototype=_.prototype,y.prototype=new g},s.extend=function(){var y,_,g={};for(y=0;y<arguments.length;y++)for(_ in arguments[y])Object.prototype.hasOwnProperty.call(arguments[y],_)&&g[_]===void 0&&(g[_]=arguments[y][_]);return g},s.prepareContent=function(y,_,g,C,b){return h.Promise.resolve(_).then(function(I){return o.blob&&(I instanceof Blob||["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(I))!==-1)&&typeof FileReader<"u"?new h.Promise(function(N,F){var z=new FileReader;z.onload=function(G){N(G.target.result)},z.onerror=function(G){F(G.target.error)},z.readAsArrayBuffer(I)}):I}).then(function(I){var N=s.getTypeOf(I);return N?(N==="arraybuffer"?I=s.transformTo("uint8array",I):N==="string"&&(b?I=l.decode(I):g&&C!==!0&&(I=function(F){return f(F,o.uint8array?new Uint8Array(F.length):new Array(F.length))}(I))),I):h.Promise.reject(new Error("Can't read the data of '"+y+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,setimmediate:54}],33:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./signature"),h=e("./zipEntry"),d=e("./support");function f(m){this.files=[],this.loadOptions=m}f.prototype={checkSignature:function(m){if(!this.reader.readAndCheckSignature(m)){this.reader.index-=4;var v=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+l.pretty(v)+", expected "+l.pretty(m)+")")}},isSignature:function(m,v){var p=this.reader.index;this.reader.setIndex(m);var M=this.reader.readString(4)===v;return this.reader.setIndex(p),M},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var m=this.reader.readData(this.zipCommentLength),v=d.uint8array?"uint8array":"array",p=l.transformTo(v,m);this.zipComment=this.loadOptions.decodeFileName(p)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var m,v,p,M=this.zip64EndOfCentralSize-44;0<M;)m=this.reader.readInt(2),v=this.reader.readInt(4),p=this.reader.readData(v),this.zip64ExtensibleData[m]={id:m,length:v,value:p}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var m,v;for(m=0;m<this.files.length;m++)v=this.files[m],this.reader.setIndex(v.localHeaderOffset),this.checkSignature(c.LOCAL_FILE_HEADER),v.readLocalPart(this.reader),v.handleUTF8(),v.processAttributes()},readCentralDir:function(){var m;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER);)(m=new h({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(m);if(this.centralDirRecords!==this.files.length&&this.centralDirRecords!==0&&this.files.length===0)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var m=this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);if(m<0)throw this.isSignature(0,c.LOCAL_FILE_HEADER)?new Error("Corrupted zip: can't find end of central directory"):new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");this.reader.setIndex(m);var v=m;if(this.checkSignature(c.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===l.MAX_VALUE_16BITS||this.diskWithCentralDirStart===l.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===l.MAX_VALUE_16BITS||this.centralDirRecords===l.MAX_VALUE_16BITS||this.centralDirSize===l.MAX_VALUE_32BITS||this.centralDirOffset===l.MAX_VALUE_32BITS){if(this.zip64=!0,(m=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(m),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,c.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var p=this.centralDirOffset+this.centralDirSize;this.zip64&&(p+=20,p+=12+this.zip64EndOfCentralSize);var M=v-p;if(0<M)this.isSignature(v,c.CENTRAL_FILE_HEADER)||(this.reader.zero=M);else if(M<0)throw new Error("Corrupted zip: missing "+Math.abs(M)+" bytes.")},prepareReader:function(m){this.reader=o(m)},load:function(m){this.prepareReader(m),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},n.exports=f},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utils":32,"./zipEntry":34}],34:[function(e,n,s){var o=e("./reader/readerFor"),l=e("./utils"),c=e("./compressedObject"),h=e("./crc32"),d=e("./utf8"),f=e("./compressions"),m=e("./support");function v(p,M){this.options=p,this.loadOptions=M}v.prototype={isEncrypted:function(){return(1&this.bitFlag)==1},useUTF8:function(){return(2048&this.bitFlag)==2048},readLocalPart:function(p){var M,y;if(p.skip(22),this.fileNameLength=p.readInt(2),y=p.readInt(2),this.fileName=p.readData(this.fileNameLength),p.skip(y),this.compressedSize===-1||this.uncompressedSize===-1)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if((M=function(_){for(var g in f)if(Object.prototype.hasOwnProperty.call(f,g)&&f[g].magic===_)return f[g];return null}(this.compressionMethod))===null)throw new Error("Corrupted zip : compression "+l.pretty(this.compressionMethod)+" unknown (inner file : "+l.transformTo("string",this.fileName)+")");this.decompressed=new c(this.compressedSize,this.uncompressedSize,this.crc32,M,p.readData(this.compressedSize))},readCentralPart:function(p){this.versionMadeBy=p.readInt(2),p.skip(2),this.bitFlag=p.readInt(2),this.compressionMethod=p.readString(2),this.date=p.readDate(),this.crc32=p.readInt(4),this.compressedSize=p.readInt(4),this.uncompressedSize=p.readInt(4);var M=p.readInt(2);if(this.extraFieldsLength=p.readInt(2),this.fileCommentLength=p.readInt(2),this.diskNumberStart=p.readInt(2),this.internalFileAttributes=p.readInt(2),this.externalFileAttributes=p.readInt(4),this.localHeaderOffset=p.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");p.skip(M),this.readExtraFields(p),this.parseZIP64ExtraField(p),this.fileComment=p.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var p=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),p==0&&(this.dosPermissions=63&this.externalFileAttributes),p==3&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||this.fileNameStr.slice(-1)!=="/"||(this.dir=!0)},parseZIP64ExtraField:function(){if(this.extraFields[1]){var p=o(this.extraFields[1].value);this.uncompressedSize===l.MAX_VALUE_32BITS&&(this.uncompressedSize=p.readInt(8)),this.compressedSize===l.MAX_VALUE_32BITS&&(this.compressedSize=p.readInt(8)),this.localHeaderOffset===l.MAX_VALUE_32BITS&&(this.localHeaderOffset=p.readInt(8)),this.diskNumberStart===l.MAX_VALUE_32BITS&&(this.diskNumberStart=p.readInt(4))}},readExtraFields:function(p){var M,y,_,g=p.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});p.index+4<g;)M=p.readInt(2),y=p.readInt(2),_=p.readData(y),this.extraFields[M]={id:M,length:y,value:_};p.setIndex(g)},handleUTF8:function(){var p=m.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=d.utf8decode(this.fileName),this.fileCommentStr=d.utf8decode(this.fileComment);else{var M=this.findExtraFieldUnicodePath();if(M!==null)this.fileNameStr=M;else{var y=l.transformTo(p,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(y)}var _=this.findExtraFieldUnicodeComment();if(_!==null)this.fileCommentStr=_;else{var g=l.transformTo(p,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(g)}}},findExtraFieldUnicodePath:function(){var p=this.extraFields[28789];if(p){var M=o(p.value);return M.readInt(1)!==1||h(this.fileName)!==M.readInt(4)?null:d.utf8decode(M.readData(p.length-5))}return null},findExtraFieldUnicodeComment:function(){var p=this.extraFields[25461];if(p){var M=o(p.value);return M.readInt(1)!==1||h(this.fileComment)!==M.readInt(4)?null:d.utf8decode(M.readData(p.length-5))}return null}},n.exports=v},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(e,n,s){function o(M,y,_){this.name=M,this.dir=_.dir,this.date=_.date,this.comment=_.comment,this.unixPermissions=_.unixPermissions,this.dosPermissions=_.dosPermissions,this._data=y,this._dataBinary=_.binary,this.options={compression:_.compression,compressionOptions:_.compressionOptions}}var l=e("./stream/StreamHelper"),c=e("./stream/DataWorker"),h=e("./utf8"),d=e("./compressedObject"),f=e("./stream/GenericWorker");o.prototype={internalStream:function(M){var y=null,_="string";try{if(!M)throw new Error("No output type specified.");var g=(_=M.toLowerCase())==="string"||_==="text";_!=="binarystring"&&_!=="text"||(_="string"),y=this._decompressWorker();var C=!this._dataBinary;C&&!g&&(y=y.pipe(new h.Utf8EncodeWorker)),!C&&g&&(y=y.pipe(new h.Utf8DecodeWorker))}catch(b){(y=new f("error")).error(b)}return new l(y,_,"")},async:function(M,y){return this.internalStream(M).accumulate(y)},nodeStream:function(M,y){return this.internalStream(M||"nodebuffer").toNodejsStream(y)},_compressWorker:function(M,y){if(this._data instanceof d&&this._data.compression.magic===M.magic)return this._data.getCompressedWorker();var _=this._decompressWorker();return this._dataBinary||(_=_.pipe(new h.Utf8EncodeWorker)),d.createWorkerFrom(_,M,y)},_decompressWorker:function(){return this._data instanceof d?this._data.getContentWorker():this._data instanceof f?this._data:new c(this._data)}};for(var m=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],v=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},p=0;p<m.length;p++)o.prototype[m[p]]=v;n.exports=o},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(e,n,s){(function(o){var l,c,h=o.MutationObserver||o.WebKitMutationObserver;if(h){var d=0,f=new h(M),m=o.document.createTextNode("");f.observe(m,{characterData:!0}),l=function(){m.data=d=++d%2}}else if(o.setImmediate||o.MessageChannel===void 0)l="document"in o&&"onreadystatechange"in o.document.createElement("script")?function(){var y=o.document.createElement("script");y.onreadystatechange=function(){M(),y.onreadystatechange=null,y.parentNode.removeChild(y),y=null},o.document.documentElement.appendChild(y)}:function(){setTimeout(M,0)};else{var v=new o.MessageChannel;v.port1.onmessage=M,l=function(){v.port2.postMessage(0)}}var p=[];function M(){var y,_;c=!0;for(var g=p.length;g;){for(_=p,p=[],y=-1;++y<g;)_[y]();g=p.length}c=!1}n.exports=function(y){p.push(y)!==1||c||l()}}).call(this,typeof ss<"u"?ss:typeof self<"u"?self:typeof window<"u"?window:{})},{}],37:[function(e,n,s){var o=e("immediate");function l(){}var c={},h=["REJECTED"],d=["FULFILLED"],f=["PENDING"];function m(g){if(typeof g!="function")throw new TypeError("resolver must be a function");this.state=f,this.queue=[],this.outcome=void 0,g!==l&&y(this,g)}function v(g,C,b){this.promise=g,typeof C=="function"&&(this.onFulfilled=C,this.callFulfilled=this.otherCallFulfilled),typeof b=="function"&&(this.onRejected=b,this.callRejected=this.otherCallRejected)}function p(g,C,b){o(function(){var I;try{I=C(b)}catch(N){return c.reject(g,N)}I===g?c.reject(g,new TypeError("Cannot resolve promise with itself")):c.resolve(g,I)})}function M(g){var C=g&&g.then;if(g&&(typeof g=="object"||typeof g=="function")&&typeof C=="function")return function(){C.apply(g,arguments)}}function y(g,C){var b=!1;function I(z){b||(b=!0,c.reject(g,z))}function N(z){b||(b=!0,c.resolve(g,z))}var F=_(function(){C(N,I)});F.status==="error"&&I(F.value)}function _(g,C){var b={};try{b.value=g(C),b.status="success"}catch(I){b.status="error",b.value=I}return b}(n.exports=m).prototype.finally=function(g){if(typeof g!="function")return this;var C=this.constructor;return this.then(function(b){return C.resolve(g()).then(function(){return b})},function(b){return C.resolve(g()).then(function(){throw b})})},m.prototype.catch=function(g){return this.then(null,g)},m.prototype.then=function(g,C){if(typeof g!="function"&&this.state===d||typeof C!="function"&&this.state===h)return this;var b=new this.constructor(l);return this.state!==f?p(b,this.state===d?g:C,this.outcome):this.queue.push(new v(b,g,C)),b},v.prototype.callFulfilled=function(g){c.resolve(this.promise,g)},v.prototype.otherCallFulfilled=function(g){p(this.promise,this.onFulfilled,g)},v.prototype.callRejected=function(g){c.reject(this.promise,g)},v.prototype.otherCallRejected=function(g){p(this.promise,this.onRejected,g)},c.resolve=function(g,C){var b=_(M,C);if(b.status==="error")return c.reject(g,b.value);var I=b.value;if(I)y(g,I);else{g.state=d,g.outcome=C;for(var N=-1,F=g.queue.length;++N<F;)g.queue[N].callFulfilled(C)}return g},c.reject=function(g,C){g.state=h,g.outcome=C;for(var b=-1,I=g.queue.length;++b<I;)g.queue[b].callRejected(C);return g},m.resolve=function(g){return g instanceof this?g:c.resolve(new this(l),g)},m.reject=function(g){var C=new this(l);return c.reject(C,g)},m.all=function(g){var C=this;if(Object.prototype.toString.call(g)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=g.length,I=!1;if(!b)return this.resolve([]);for(var N=new Array(b),F=0,z=-1,G=new this(l);++z<b;)D(g[z],z);return G;function D(P,W){C.resolve(P).then(function(O){N[W]=O,++F!==b||I||(I=!0,c.resolve(G,N))},function(O){I||(I=!0,c.reject(G,O))})}},m.race=function(g){var C=this;if(Object.prototype.toString.call(g)!=="[object Array]")return this.reject(new TypeError("must be an array"));var b=g.length,I=!1;if(!b)return this.resolve([]);for(var N=-1,F=new this(l);++N<b;)z=g[N],C.resolve(z).then(function(G){I||(I=!0,c.resolve(F,G))},function(G){I||(I=!0,c.reject(F,G))});var z;return F}},{immediate:36}],38:[function(e,n,s){var o={};(0,e("./lib/utils/common").assign)(o,e("./lib/deflate"),e("./lib/inflate"),e("./lib/zlib/constants")),n.exports=o},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(e,n,s){var o=e("./zlib/deflate"),l=e("./utils/common"),c=e("./utils/strings"),h=e("./zlib/messages"),d=e("./zlib/zstream"),f=Object.prototype.toString,m=0,v=-1,p=0,M=8;function y(g){if(!(this instanceof y))return new y(g);this.options=l.assign({level:v,method:M,chunkSize:16384,windowBits:15,memLevel:8,strategy:p,to:""},g||{});var C=this.options;C.raw&&0<C.windowBits?C.windowBits=-C.windowBits:C.gzip&&0<C.windowBits&&C.windowBits<16&&(C.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new d,this.strm.avail_out=0;var b=o.deflateInit2(this.strm,C.level,C.method,C.windowBits,C.memLevel,C.strategy);if(b!==m)throw new Error(h[b]);if(C.header&&o.deflateSetHeader(this.strm,C.header),C.dictionary){var I;if(I=typeof C.dictionary=="string"?c.string2buf(C.dictionary):f.call(C.dictionary)==="[object ArrayBuffer]"?new Uint8Array(C.dictionary):C.dictionary,(b=o.deflateSetDictionary(this.strm,I))!==m)throw new Error(h[b]);this._dict_set=!0}}function _(g,C){var b=new y(C);if(b.push(g,!0),b.err)throw b.msg||h[b.err];return b.result}y.prototype.push=function(g,C){var b,I,N=this.strm,F=this.options.chunkSize;if(this.ended)return!1;I=C===~~C?C:C===!0?4:0,typeof g=="string"?N.input=c.string2buf(g):f.call(g)==="[object ArrayBuffer]"?N.input=new Uint8Array(g):N.input=g,N.next_in=0,N.avail_in=N.input.length;do{if(N.avail_out===0&&(N.output=new l.Buf8(F),N.next_out=0,N.avail_out=F),(b=o.deflate(N,I))!==1&&b!==m)return this.onEnd(b),!(this.ended=!0);N.avail_out!==0&&(N.avail_in!==0||I!==4&&I!==2)||(this.options.to==="string"?this.onData(c.buf2binstring(l.shrinkBuf(N.output,N.next_out))):this.onData(l.shrinkBuf(N.output,N.next_out)))}while((0<N.avail_in||N.avail_out===0)&&b!==1);return I===4?(b=o.deflateEnd(this.strm),this.onEnd(b),this.ended=!0,b===m):I!==2||(this.onEnd(m),!(N.avail_out=0))},y.prototype.onData=function(g){this.chunks.push(g)},y.prototype.onEnd=function(g){g===m&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=g,this.msg=this.strm.msg},s.Deflate=y,s.deflate=_,s.deflateRaw=function(g,C){return(C=C||{}).raw=!0,_(g,C)},s.gzip=function(g,C){return(C=C||{}).gzip=!0,_(g,C)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(e,n,s){var o=e("./zlib/inflate"),l=e("./utils/common"),c=e("./utils/strings"),h=e("./zlib/constants"),d=e("./zlib/messages"),f=e("./zlib/zstream"),m=e("./zlib/gzheader"),v=Object.prototype.toString;function p(y){if(!(this instanceof p))return new p(y);this.options=l.assign({chunkSize:16384,windowBits:0,to:""},y||{});var _=this.options;_.raw&&0<=_.windowBits&&_.windowBits<16&&(_.windowBits=-_.windowBits,_.windowBits===0&&(_.windowBits=-15)),!(0<=_.windowBits&&_.windowBits<16)||y&&y.windowBits||(_.windowBits+=32),15<_.windowBits&&_.windowBits<48&&!(15&_.windowBits)&&(_.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new f,this.strm.avail_out=0;var g=o.inflateInit2(this.strm,_.windowBits);if(g!==h.Z_OK)throw new Error(d[g]);this.header=new m,o.inflateGetHeader(this.strm,this.header)}function M(y,_){var g=new p(_);if(g.push(y,!0),g.err)throw g.msg||d[g.err];return g.result}p.prototype.push=function(y,_){var g,C,b,I,N,F,z=this.strm,G=this.options.chunkSize,D=this.options.dictionary,P=!1;if(this.ended)return!1;C=_===~~_?_:_===!0?h.Z_FINISH:h.Z_NO_FLUSH,typeof y=="string"?z.input=c.binstring2buf(y):v.call(y)==="[object ArrayBuffer]"?z.input=new Uint8Array(y):z.input=y,z.next_in=0,z.avail_in=z.input.length;do{if(z.avail_out===0&&(z.output=new l.Buf8(G),z.next_out=0,z.avail_out=G),(g=o.inflate(z,h.Z_NO_FLUSH))===h.Z_NEED_DICT&&D&&(F=typeof D=="string"?c.string2buf(D):v.call(D)==="[object ArrayBuffer]"?new Uint8Array(D):D,g=o.inflateSetDictionary(this.strm,F)),g===h.Z_BUF_ERROR&&P===!0&&(g=h.Z_OK,P=!1),g!==h.Z_STREAM_END&&g!==h.Z_OK)return this.onEnd(g),!(this.ended=!0);z.next_out&&(z.avail_out!==0&&g!==h.Z_STREAM_END&&(z.avail_in!==0||C!==h.Z_FINISH&&C!==h.Z_SYNC_FLUSH)||(this.options.to==="string"?(b=c.utf8border(z.output,z.next_out),I=z.next_out-b,N=c.buf2string(z.output,b),z.next_out=I,z.avail_out=G-I,I&&l.arraySet(z.output,z.output,b,I,0),this.onData(N)):this.onData(l.shrinkBuf(z.output,z.next_out)))),z.avail_in===0&&z.avail_out===0&&(P=!0)}while((0<z.avail_in||z.avail_out===0)&&g!==h.Z_STREAM_END);return g===h.Z_STREAM_END&&(C=h.Z_FINISH),C===h.Z_FINISH?(g=o.inflateEnd(this.strm),this.onEnd(g),this.ended=!0,g===h.Z_OK):C!==h.Z_SYNC_FLUSH||(this.onEnd(h.Z_OK),!(z.avail_out=0))},p.prototype.onData=function(y){this.chunks.push(y)},p.prototype.onEnd=function(y){y===h.Z_OK&&(this.options.to==="string"?this.result=this.chunks.join(""):this.result=l.flattenChunks(this.chunks)),this.chunks=[],this.err=y,this.msg=this.strm.msg},s.Inflate=p,s.inflate=M,s.inflateRaw=function(y,_){return(_=_||{}).raw=!0,M(y,_)},s.ungzip=M},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(e,n,s){var o=typeof Uint8Array<"u"&&typeof Uint16Array<"u"&&typeof Int32Array<"u";s.assign=function(h){for(var d=Array.prototype.slice.call(arguments,1);d.length;){var f=d.shift();if(f){if(typeof f!="object")throw new TypeError(f+"must be non-object");for(var m in f)f.hasOwnProperty(m)&&(h[m]=f[m])}}return h},s.shrinkBuf=function(h,d){return h.length===d?h:h.subarray?h.subarray(0,d):(h.length=d,h)};var l={arraySet:function(h,d,f,m,v){if(d.subarray&&h.subarray)h.set(d.subarray(f,f+m),v);else for(var p=0;p<m;p++)h[v+p]=d[f+p]},flattenChunks:function(h){var d,f,m,v,p,M;for(d=m=0,f=h.length;d<f;d++)m+=h[d].length;for(M=new Uint8Array(m),d=v=0,f=h.length;d<f;d++)p=h[d],M.set(p,v),v+=p.length;return M}},c={arraySet:function(h,d,f,m,v){for(var p=0;p<m;p++)h[v+p]=d[f+p]},flattenChunks:function(h){return[].concat.apply([],h)}};s.setTyped=function(h){h?(s.Buf8=Uint8Array,s.Buf16=Uint16Array,s.Buf32=Int32Array,s.assign(s,l)):(s.Buf8=Array,s.Buf16=Array,s.Buf32=Array,s.assign(s,c))},s.setTyped(o)},{}],42:[function(e,n,s){var o=e("./common"),l=!0,c=!0;try{String.fromCharCode.apply(null,[0])}catch{l=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch{c=!1}for(var h=new o.Buf8(256),d=0;d<256;d++)h[d]=252<=d?6:248<=d?5:240<=d?4:224<=d?3:192<=d?2:1;function f(m,v){if(v<65537&&(m.subarray&&c||!m.subarray&&l))return String.fromCharCode.apply(null,o.shrinkBuf(m,v));for(var p="",M=0;M<v;M++)p+=String.fromCharCode(m[M]);return p}h[254]=h[254]=1,s.string2buf=function(m){var v,p,M,y,_,g=m.length,C=0;for(y=0;y<g;y++)(64512&(p=m.charCodeAt(y)))==55296&&y+1<g&&(64512&(M=m.charCodeAt(y+1)))==56320&&(p=65536+(p-55296<<10)+(M-56320),y++),C+=p<128?1:p<2048?2:p<65536?3:4;for(v=new o.Buf8(C),y=_=0;_<C;y++)(64512&(p=m.charCodeAt(y)))==55296&&y+1<g&&(64512&(M=m.charCodeAt(y+1)))==56320&&(p=65536+(p-55296<<10)+(M-56320),y++),p<128?v[_++]=p:(p<2048?v[_++]=192|p>>>6:(p<65536?v[_++]=224|p>>>12:(v[_++]=240|p>>>18,v[_++]=128|p>>>12&63),v[_++]=128|p>>>6&63),v[_++]=128|63&p);return v},s.buf2binstring=function(m){return f(m,m.length)},s.binstring2buf=function(m){for(var v=new o.Buf8(m.length),p=0,M=v.length;p<M;p++)v[p]=m.charCodeAt(p);return v},s.buf2string=function(m,v){var p,M,y,_,g=v||m.length,C=new Array(2*g);for(p=M=0;p<g;)if((y=m[p++])<128)C[M++]=y;else if(4<(_=h[y]))C[M++]=65533,p+=_-1;else{for(y&=_===2?31:_===3?15:7;1<_&&p<g;)y=y<<6|63&m[p++],_--;1<_?C[M++]=65533:y<65536?C[M++]=y:(y-=65536,C[M++]=55296|y>>10&1023,C[M++]=56320|1023&y)}return f(C,M)},s.utf8border=function(m,v){var p;for((v=v||m.length)>m.length&&(v=m.length),p=v-1;0<=p&&(192&m[p])==128;)p--;return p<0||p===0?v:p+h[m[p]]>v?p:v}},{"./common":41}],43:[function(e,n,s){n.exports=function(o,l,c,h){for(var d=65535&o|0,f=o>>>16&65535|0,m=0;c!==0;){for(c-=m=2e3<c?2e3:c;f=f+(d=d+l[h++]|0)|0,--m;);d%=65521,f%=65521}return d|f<<16|0}},{}],44:[function(e,n,s){n.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(e,n,s){var o=function(){for(var l,c=[],h=0;h<256;h++){l=h;for(var d=0;d<8;d++)l=1&l?3988292384^l>>>1:l>>>1;c[h]=l}return c}();n.exports=function(l,c,h,d){var f=o,m=d+h;l^=-1;for(var v=d;v<m;v++)l=l>>>8^f[255&(l^c[v])];return-1^l}},{}],46:[function(e,n,s){var o,l=e("../utils/common"),c=e("./trees"),h=e("./adler32"),d=e("./crc32"),f=e("./messages"),m=0,v=4,p=0,M=-2,y=-1,_=4,g=2,C=8,b=9,I=286,N=30,F=19,z=2*I+1,G=15,D=3,P=258,W=P+D+1,O=42,B=113,A=1,Z=2,at=3,ot=4;function Y(w,tt){return w.msg=f[tt],tt}function st(w){return(w<<1)-(4<w?9:0)}function rt(w){for(var tt=w.length;0<=--tt;)w[tt]=0}function q(w){var tt=w.state,K=tt.pending;K>w.avail_out&&(K=w.avail_out),K!==0&&(l.arraySet(w.output,tt.pending_buf,tt.pending_out,K,w.next_out),w.next_out+=K,tt.pending_out+=K,w.total_out+=K,w.avail_out-=K,tt.pending-=K,tt.pending===0&&(tt.pending_out=0))}function Q(w,tt){c._tr_flush_block(w,0<=w.block_start?w.block_start:-1,w.strstart-w.block_start,tt),w.block_start=w.strstart,q(w.strm)}function Ct(w,tt){w.pending_buf[w.pending++]=tt}function J(w,tt){w.pending_buf[w.pending++]=tt>>>8&255,w.pending_buf[w.pending++]=255&tt}function et(w,tt){var K,T,S=w.max_chain_length,k=w.strstart,X=w.prev_length,$=w.nice_match,V=w.strstart>w.w_size-W?w.strstart-(w.w_size-W):0,ft=w.window,lt=w.w_mask,pt=w.prev,Et=w.strstart+P,wt=ft[k+X-1],Tt=ft[k+X];w.prev_length>=w.good_match&&(S>>=2),$>w.lookahead&&($=w.lookahead);do if(ft[(K=tt)+X]===Tt&&ft[K+X-1]===wt&&ft[K]===ft[k]&&ft[++K]===ft[k+1]){k+=2,K++;do;while(ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&ft[++k]===ft[++K]&&k<Et);if(T=P-(Et-k),k=Et-P,X<T){if(w.match_start=tt,$<=(X=T))break;wt=ft[k+X-1],Tt=ft[k+X]}}while((tt=pt[tt&lt])>V&&--S!=0);return X<=w.lookahead?X:w.lookahead}function Mt(w){var tt,K,T,S,k,X,$,V,ft,lt,pt=w.w_size;do{if(S=w.window_size-w.lookahead-w.strstart,w.strstart>=pt+(pt-W)){for(l.arraySet(w.window,w.window,pt,pt,0),w.match_start-=pt,w.strstart-=pt,w.block_start-=pt,tt=K=w.hash_size;T=w.head[--tt],w.head[tt]=pt<=T?T-pt:0,--K;);for(tt=K=pt;T=w.prev[--tt],w.prev[tt]=pt<=T?T-pt:0,--K;);S+=pt}if(w.strm.avail_in===0)break;if(X=w.strm,$=w.window,V=w.strstart+w.lookahead,ft=S,lt=void 0,lt=X.avail_in,ft<lt&&(lt=ft),K=lt===0?0:(X.avail_in-=lt,l.arraySet($,X.input,X.next_in,lt,V),X.state.wrap===1?X.adler=h(X.adler,$,lt,V):X.state.wrap===2&&(X.adler=d(X.adler,$,lt,V)),X.next_in+=lt,X.total_in+=lt,lt),w.lookahead+=K,w.lookahead+w.insert>=D)for(k=w.strstart-w.insert,w.ins_h=w.window[k],w.ins_h=(w.ins_h<<w.hash_shift^w.window[k+1])&w.hash_mask;w.insert&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[k+D-1])&w.hash_mask,w.prev[k&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=k,k++,w.insert--,!(w.lookahead+w.insert<D)););}while(w.lookahead<W&&w.strm.avail_in!==0)}function bt(w,tt){for(var K,T;;){if(w.lookahead<W){if(Mt(w),w.lookahead<W&&tt===m)return A;if(w.lookahead===0)break}if(K=0,w.lookahead>=D&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+D-1])&w.hash_mask,K=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart),K!==0&&w.strstart-K<=w.w_size-W&&(w.match_length=et(w,K)),w.match_length>=D)if(T=c._tr_tally(w,w.strstart-w.match_start,w.match_length-D),w.lookahead-=w.match_length,w.match_length<=w.max_lazy_match&&w.lookahead>=D){for(w.match_length--;w.strstart++,w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+D-1])&w.hash_mask,K=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart,--w.match_length!=0;);w.strstart++}else w.strstart+=w.match_length,w.match_length=0,w.ins_h=w.window[w.strstart],w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+1])&w.hash_mask;else T=c._tr_tally(w,0,w.window[w.strstart]),w.lookahead--,w.strstart++;if(T&&(Q(w,!1),w.strm.avail_out===0))return A}return w.insert=w.strstart<D-1?w.strstart:D-1,tt===v?(Q(w,!0),w.strm.avail_out===0?at:ot):w.last_lit&&(Q(w,!1),w.strm.avail_out===0)?A:Z}function Pt(w,tt){for(var K,T,S;;){if(w.lookahead<W){if(Mt(w),w.lookahead<W&&tt===m)return A;if(w.lookahead===0)break}if(K=0,w.lookahead>=D&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+D-1])&w.hash_mask,K=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart),w.prev_length=w.match_length,w.prev_match=w.match_start,w.match_length=D-1,K!==0&&w.prev_length<w.max_lazy_match&&w.strstart-K<=w.w_size-W&&(w.match_length=et(w,K),w.match_length<=5&&(w.strategy===1||w.match_length===D&&4096<w.strstart-w.match_start)&&(w.match_length=D-1)),w.prev_length>=D&&w.match_length<=w.prev_length){for(S=w.strstart+w.lookahead-D,T=c._tr_tally(w,w.strstart-1-w.prev_match,w.prev_length-D),w.lookahead-=w.prev_length-1,w.prev_length-=2;++w.strstart<=S&&(w.ins_h=(w.ins_h<<w.hash_shift^w.window[w.strstart+D-1])&w.hash_mask,K=w.prev[w.strstart&w.w_mask]=w.head[w.ins_h],w.head[w.ins_h]=w.strstart),--w.prev_length!=0;);if(w.match_available=0,w.match_length=D-1,w.strstart++,T&&(Q(w,!1),w.strm.avail_out===0))return A}else if(w.match_available){if((T=c._tr_tally(w,0,w.window[w.strstart-1]))&&Q(w,!1),w.strstart++,w.lookahead--,w.strm.avail_out===0)return A}else w.match_available=1,w.strstart++,w.lookahead--}return w.match_available&&(T=c._tr_tally(w,0,w.window[w.strstart-1]),w.match_available=0),w.insert=w.strstart<D-1?w.strstart:D-1,tt===v?(Q(w,!0),w.strm.avail_out===0?at:ot):w.last_lit&&(Q(w,!1),w.strm.avail_out===0)?A:Z}function It(w,tt,K,T,S){this.good_length=w,this.max_lazy=tt,this.nice_length=K,this.max_chain=T,this.func=S}function zt(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=C,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new l.Buf16(2*z),this.dyn_dtree=new l.Buf16(2*(2*N+1)),this.bl_tree=new l.Buf16(2*(2*F+1)),rt(this.dyn_ltree),rt(this.dyn_dtree),rt(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new l.Buf16(G+1),this.heap=new l.Buf16(2*I+1),rt(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new l.Buf16(2*I+1),rt(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function it(w){var tt;return w&&w.state?(w.total_in=w.total_out=0,w.data_type=g,(tt=w.state).pending=0,tt.pending_out=0,tt.wrap<0&&(tt.wrap=-tt.wrap),tt.status=tt.wrap?O:B,w.adler=tt.wrap===2?0:1,tt.last_flush=m,c._tr_init(tt),p):Y(w,M)}function vt(w){var tt=it(w);return tt===p&&function(K){K.window_size=2*K.w_size,rt(K.head),K.max_lazy_match=o[K.level].max_lazy,K.good_match=o[K.level].good_length,K.nice_match=o[K.level].nice_length,K.max_chain_length=o[K.level].max_chain,K.strstart=0,K.block_start=0,K.lookahead=0,K.insert=0,K.match_length=K.prev_length=D-1,K.match_available=0,K.ins_h=0}(w.state),tt}function xt(w,tt,K,T,S,k){if(!w)return M;var X=1;if(tt===y&&(tt=6),T<0?(X=0,T=-T):15<T&&(X=2,T-=16),S<1||b<S||K!==C||T<8||15<T||tt<0||9<tt||k<0||_<k)return Y(w,M);T===8&&(T=9);var $=new zt;return(w.state=$).strm=w,$.wrap=X,$.gzhead=null,$.w_bits=T,$.w_size=1<<$.w_bits,$.w_mask=$.w_size-1,$.hash_bits=S+7,$.hash_size=1<<$.hash_bits,$.hash_mask=$.hash_size-1,$.hash_shift=~~(($.hash_bits+D-1)/D),$.window=new l.Buf8(2*$.w_size),$.head=new l.Buf16($.hash_size),$.prev=new l.Buf16($.w_size),$.lit_bufsize=1<<S+6,$.pending_buf_size=4*$.lit_bufsize,$.pending_buf=new l.Buf8($.pending_buf_size),$.d_buf=1*$.lit_bufsize,$.l_buf=3*$.lit_bufsize,$.level=tt,$.strategy=k,$.method=K,vt(w)}o=[new It(0,0,0,0,function(w,tt){var K=65535;for(K>w.pending_buf_size-5&&(K=w.pending_buf_size-5);;){if(w.lookahead<=1){if(Mt(w),w.lookahead===0&&tt===m)return A;if(w.lookahead===0)break}w.strstart+=w.lookahead,w.lookahead=0;var T=w.block_start+K;if((w.strstart===0||w.strstart>=T)&&(w.lookahead=w.strstart-T,w.strstart=T,Q(w,!1),w.strm.avail_out===0)||w.strstart-w.block_start>=w.w_size-W&&(Q(w,!1),w.strm.avail_out===0))return A}return w.insert=0,tt===v?(Q(w,!0),w.strm.avail_out===0?at:ot):(w.strstart>w.block_start&&(Q(w,!1),w.strm.avail_out),A)}),new It(4,4,8,4,bt),new It(4,5,16,8,bt),new It(4,6,32,32,bt),new It(4,4,16,16,Pt),new It(8,16,32,32,Pt),new It(8,16,128,128,Pt),new It(8,32,128,256,Pt),new It(32,128,258,1024,Pt),new It(32,258,258,4096,Pt)],s.deflateInit=function(w,tt){return xt(w,tt,C,15,8,0)},s.deflateInit2=xt,s.deflateReset=vt,s.deflateResetKeep=it,s.deflateSetHeader=function(w,tt){return w&&w.state?w.state.wrap!==2?M:(w.state.gzhead=tt,p):M},s.deflate=function(w,tt){var K,T,S,k;if(!w||!w.state||5<tt||tt<0)return w?Y(w,M):M;if(T=w.state,!w.output||!w.input&&w.avail_in!==0||T.status===666&&tt!==v)return Y(w,w.avail_out===0?-5:M);if(T.strm=w,K=T.last_flush,T.last_flush=tt,T.status===O)if(T.wrap===2)w.adler=0,Ct(T,31),Ct(T,139),Ct(T,8),T.gzhead?(Ct(T,(T.gzhead.text?1:0)+(T.gzhead.hcrc?2:0)+(T.gzhead.extra?4:0)+(T.gzhead.name?8:0)+(T.gzhead.comment?16:0)),Ct(T,255&T.gzhead.time),Ct(T,T.gzhead.time>>8&255),Ct(T,T.gzhead.time>>16&255),Ct(T,T.gzhead.time>>24&255),Ct(T,T.level===9?2:2<=T.strategy||T.level<2?4:0),Ct(T,255&T.gzhead.os),T.gzhead.extra&&T.gzhead.extra.length&&(Ct(T,255&T.gzhead.extra.length),Ct(T,T.gzhead.extra.length>>8&255)),T.gzhead.hcrc&&(w.adler=d(w.adler,T.pending_buf,T.pending,0)),T.gzindex=0,T.status=69):(Ct(T,0),Ct(T,0),Ct(T,0),Ct(T,0),Ct(T,0),Ct(T,T.level===9?2:2<=T.strategy||T.level<2?4:0),Ct(T,3),T.status=B);else{var X=C+(T.w_bits-8<<4)<<8;X|=(2<=T.strategy||T.level<2?0:T.level<6?1:T.level===6?2:3)<<6,T.strstart!==0&&(X|=32),X+=31-X%31,T.status=B,J(T,X),T.strstart!==0&&(J(T,w.adler>>>16),J(T,65535&w.adler)),w.adler=1}if(T.status===69)if(T.gzhead.extra){for(S=T.pending;T.gzindex<(65535&T.gzhead.extra.length)&&(T.pending!==T.pending_buf_size||(T.gzhead.hcrc&&T.pending>S&&(w.adler=d(w.adler,T.pending_buf,T.pending-S,S)),q(w),S=T.pending,T.pending!==T.pending_buf_size));)Ct(T,255&T.gzhead.extra[T.gzindex]),T.gzindex++;T.gzhead.hcrc&&T.pending>S&&(w.adler=d(w.adler,T.pending_buf,T.pending-S,S)),T.gzindex===T.gzhead.extra.length&&(T.gzindex=0,T.status=73)}else T.status=73;if(T.status===73)if(T.gzhead.name){S=T.pending;do{if(T.pending===T.pending_buf_size&&(T.gzhead.hcrc&&T.pending>S&&(w.adler=d(w.adler,T.pending_buf,T.pending-S,S)),q(w),S=T.pending,T.pending===T.pending_buf_size)){k=1;break}k=T.gzindex<T.gzhead.name.length?255&T.gzhead.name.charCodeAt(T.gzindex++):0,Ct(T,k)}while(k!==0);T.gzhead.hcrc&&T.pending>S&&(w.adler=d(w.adler,T.pending_buf,T.pending-S,S)),k===0&&(T.gzindex=0,T.status=91)}else T.status=91;if(T.status===91)if(T.gzhead.comment){S=T.pending;do{if(T.pending===T.pending_buf_size&&(T.gzhead.hcrc&&T.pending>S&&(w.adler=d(w.adler,T.pending_buf,T.pending-S,S)),q(w),S=T.pending,T.pending===T.pending_buf_size)){k=1;break}k=T.gzindex<T.gzhead.comment.length?255&T.gzhead.comment.charCodeAt(T.gzindex++):0,Ct(T,k)}while(k!==0);T.gzhead.hcrc&&T.pending>S&&(w.adler=d(w.adler,T.pending_buf,T.pending-S,S)),k===0&&(T.status=103)}else T.status=103;if(T.status===103&&(T.gzhead.hcrc?(T.pending+2>T.pending_buf_size&&q(w),T.pending+2<=T.pending_buf_size&&(Ct(T,255&w.adler),Ct(T,w.adler>>8&255),w.adler=0,T.status=B)):T.status=B),T.pending!==0){if(q(w),w.avail_out===0)return T.last_flush=-1,p}else if(w.avail_in===0&&st(tt)<=st(K)&&tt!==v)return Y(w,-5);if(T.status===666&&w.avail_in!==0)return Y(w,-5);if(w.avail_in!==0||T.lookahead!==0||tt!==m&&T.status!==666){var $=T.strategy===2?function(V,ft){for(var lt;;){if(V.lookahead===0&&(Mt(V),V.lookahead===0)){if(ft===m)return A;break}if(V.match_length=0,lt=c._tr_tally(V,0,V.window[V.strstart]),V.lookahead--,V.strstart++,lt&&(Q(V,!1),V.strm.avail_out===0))return A}return V.insert=0,ft===v?(Q(V,!0),V.strm.avail_out===0?at:ot):V.last_lit&&(Q(V,!1),V.strm.avail_out===0)?A:Z}(T,tt):T.strategy===3?function(V,ft){for(var lt,pt,Et,wt,Tt=V.window;;){if(V.lookahead<=P){if(Mt(V),V.lookahead<=P&&ft===m)return A;if(V.lookahead===0)break}if(V.match_length=0,V.lookahead>=D&&0<V.strstart&&(pt=Tt[Et=V.strstart-1])===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]){wt=V.strstart+P;do;while(pt===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]&&pt===Tt[++Et]&&Et<wt);V.match_length=P-(wt-Et),V.match_length>V.lookahead&&(V.match_length=V.lookahead)}if(V.match_length>=D?(lt=c._tr_tally(V,1,V.match_length-D),V.lookahead-=V.match_length,V.strstart+=V.match_length,V.match_length=0):(lt=c._tr_tally(V,0,V.window[V.strstart]),V.lookahead--,V.strstart++),lt&&(Q(V,!1),V.strm.avail_out===0))return A}return V.insert=0,ft===v?(Q(V,!0),V.strm.avail_out===0?at:ot):V.last_lit&&(Q(V,!1),V.strm.avail_out===0)?A:Z}(T,tt):o[T.level].func(T,tt);if($!==at&&$!==ot||(T.status=666),$===A||$===at)return w.avail_out===0&&(T.last_flush=-1),p;if($===Z&&(tt===1?c._tr_align(T):tt!==5&&(c._tr_stored_block(T,0,0,!1),tt===3&&(rt(T.head),T.lookahead===0&&(T.strstart=0,T.block_start=0,T.insert=0))),q(w),w.avail_out===0))return T.last_flush=-1,p}return tt!==v?p:T.wrap<=0?1:(T.wrap===2?(Ct(T,255&w.adler),Ct(T,w.adler>>8&255),Ct(T,w.adler>>16&255),Ct(T,w.adler>>24&255),Ct(T,255&w.total_in),Ct(T,w.total_in>>8&255),Ct(T,w.total_in>>16&255),Ct(T,w.total_in>>24&255)):(J(T,w.adler>>>16),J(T,65535&w.adler)),q(w),0<T.wrap&&(T.wrap=-T.wrap),T.pending!==0?p:1)},s.deflateEnd=function(w){var tt;return w&&w.state?(tt=w.state.status)!==O&&tt!==69&&tt!==73&&tt!==91&&tt!==103&&tt!==B&&tt!==666?Y(w,M):(w.state=null,tt===B?Y(w,-3):p):M},s.deflateSetDictionary=function(w,tt){var K,T,S,k,X,$,V,ft,lt=tt.length;if(!w||!w.state||(k=(K=w.state).wrap)===2||k===1&&K.status!==O||K.lookahead)return M;for(k===1&&(w.adler=h(w.adler,tt,lt,0)),K.wrap=0,lt>=K.w_size&&(k===0&&(rt(K.head),K.strstart=0,K.block_start=0,K.insert=0),ft=new l.Buf8(K.w_size),l.arraySet(ft,tt,lt-K.w_size,K.w_size,0),tt=ft,lt=K.w_size),X=w.avail_in,$=w.next_in,V=w.input,w.avail_in=lt,w.next_in=0,w.input=tt,Mt(K);K.lookahead>=D;){for(T=K.strstart,S=K.lookahead-(D-1);K.ins_h=(K.ins_h<<K.hash_shift^K.window[T+D-1])&K.hash_mask,K.prev[T&K.w_mask]=K.head[K.ins_h],K.head[K.ins_h]=T,T++,--S;);K.strstart=T,K.lookahead=D-1,Mt(K)}return K.strstart+=K.lookahead,K.block_start=K.strstart,K.insert=K.lookahead,K.lookahead=0,K.match_length=K.prev_length=D-1,K.match_available=0,w.next_in=$,w.input=V,w.avail_in=X,K.wrap=k,p},s.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(e,n,s){n.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(e,n,s){n.exports=function(o,l){var c,h,d,f,m,v,p,M,y,_,g,C,b,I,N,F,z,G,D,P,W,O,B,A,Z;c=o.state,h=o.next_in,A=o.input,d=h+(o.avail_in-5),f=o.next_out,Z=o.output,m=f-(l-o.avail_out),v=f+(o.avail_out-257),p=c.dmax,M=c.wsize,y=c.whave,_=c.wnext,g=c.window,C=c.hold,b=c.bits,I=c.lencode,N=c.distcode,F=(1<<c.lenbits)-1,z=(1<<c.distbits)-1;t:do{b<15&&(C+=A[h++]<<b,b+=8,C+=A[h++]<<b,b+=8),G=I[C&F];e:for(;;){if(C>>>=D=G>>>24,b-=D,(D=G>>>16&255)===0)Z[f++]=65535&G;else{if(!(16&D)){if(!(64&D)){G=I[(65535&G)+(C&(1<<D)-1)];continue e}if(32&D){c.mode=12;break t}o.msg="invalid literal/length code",c.mode=30;break t}P=65535&G,(D&=15)&&(b<D&&(C+=A[h++]<<b,b+=8),P+=C&(1<<D)-1,C>>>=D,b-=D),b<15&&(C+=A[h++]<<b,b+=8,C+=A[h++]<<b,b+=8),G=N[C&z];n:for(;;){if(C>>>=D=G>>>24,b-=D,!(16&(D=G>>>16&255))){if(!(64&D)){G=N[(65535&G)+(C&(1<<D)-1)];continue n}o.msg="invalid distance code",c.mode=30;break t}if(W=65535&G,b<(D&=15)&&(C+=A[h++]<<b,(b+=8)<D&&(C+=A[h++]<<b,b+=8)),p<(W+=C&(1<<D)-1)){o.msg="invalid distance too far back",c.mode=30;break t}if(C>>>=D,b-=D,(D=f-m)<W){if(y<(D=W-D)&&c.sane){o.msg="invalid distance too far back",c.mode=30;break t}if(B=g,(O=0)===_){if(O+=M-D,D<P){for(P-=D;Z[f++]=g[O++],--D;);O=f-W,B=Z}}else if(_<D){if(O+=M+_-D,(D-=_)<P){for(P-=D;Z[f++]=g[O++],--D;);if(O=0,_<P){for(P-=D=_;Z[f++]=g[O++],--D;);O=f-W,B=Z}}}else if(O+=_-D,D<P){for(P-=D;Z[f++]=g[O++],--D;);O=f-W,B=Z}for(;2<P;)Z[f++]=B[O++],Z[f++]=B[O++],Z[f++]=B[O++],P-=3;P&&(Z[f++]=B[O++],1<P&&(Z[f++]=B[O++]))}else{for(O=f-W;Z[f++]=Z[O++],Z[f++]=Z[O++],Z[f++]=Z[O++],2<(P-=3););P&&(Z[f++]=Z[O++],1<P&&(Z[f++]=Z[O++]))}break}}break}}while(h<d&&f<v);h-=P=b>>3,C&=(1<<(b-=P<<3))-1,o.next_in=h,o.next_out=f,o.avail_in=h<d?d-h+5:5-(h-d),o.avail_out=f<v?v-f+257:257-(f-v),c.hold=C,c.bits=b}},{}],49:[function(e,n,s){var o=e("../utils/common"),l=e("./adler32"),c=e("./crc32"),h=e("./inffast"),d=e("./inftrees"),f=1,m=2,v=0,p=-2,M=1,y=852,_=592;function g(O){return(O>>>24&255)+(O>>>8&65280)+((65280&O)<<8)+((255&O)<<24)}function C(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new o.Buf16(320),this.work=new o.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function b(O){var B;return O&&O.state?(B=O.state,O.total_in=O.total_out=B.total=0,O.msg="",B.wrap&&(O.adler=1&B.wrap),B.mode=M,B.last=0,B.havedict=0,B.dmax=32768,B.head=null,B.hold=0,B.bits=0,B.lencode=B.lendyn=new o.Buf32(y),B.distcode=B.distdyn=new o.Buf32(_),B.sane=1,B.back=-1,v):p}function I(O){var B;return O&&O.state?((B=O.state).wsize=0,B.whave=0,B.wnext=0,b(O)):p}function N(O,B){var A,Z;return O&&O.state?(Z=O.state,B<0?(A=0,B=-B):(A=1+(B>>4),B<48&&(B&=15)),B&&(B<8||15<B)?p:(Z.window!==null&&Z.wbits!==B&&(Z.window=null),Z.wrap=A,Z.wbits=B,I(O))):p}function F(O,B){var A,Z;return O?(Z=new C,(O.state=Z).window=null,(A=N(O,B))!==v&&(O.state=null),A):p}var z,G,D=!0;function P(O){if(D){var B;for(z=new o.Buf32(512),G=new o.Buf32(32),B=0;B<144;)O.lens[B++]=8;for(;B<256;)O.lens[B++]=9;for(;B<280;)O.lens[B++]=7;for(;B<288;)O.lens[B++]=8;for(d(f,O.lens,0,288,z,0,O.work,{bits:9}),B=0;B<32;)O.lens[B++]=5;d(m,O.lens,0,32,G,0,O.work,{bits:5}),D=!1}O.lencode=z,O.lenbits=9,O.distcode=G,O.distbits=5}function W(O,B,A,Z){var at,ot=O.state;return ot.window===null&&(ot.wsize=1<<ot.wbits,ot.wnext=0,ot.whave=0,ot.window=new o.Buf8(ot.wsize)),Z>=ot.wsize?(o.arraySet(ot.window,B,A-ot.wsize,ot.wsize,0),ot.wnext=0,ot.whave=ot.wsize):(Z<(at=ot.wsize-ot.wnext)&&(at=Z),o.arraySet(ot.window,B,A-Z,at,ot.wnext),(Z-=at)?(o.arraySet(ot.window,B,A-Z,Z,0),ot.wnext=Z,ot.whave=ot.wsize):(ot.wnext+=at,ot.wnext===ot.wsize&&(ot.wnext=0),ot.whave<ot.wsize&&(ot.whave+=at))),0}s.inflateReset=I,s.inflateReset2=N,s.inflateResetKeep=b,s.inflateInit=function(O){return F(O,15)},s.inflateInit2=F,s.inflate=function(O,B){var A,Z,at,ot,Y,st,rt,q,Q,Ct,J,et,Mt,bt,Pt,It,zt,it,vt,xt,w,tt,K,T,S=0,k=new o.Buf8(4),X=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!O||!O.state||!O.output||!O.input&&O.avail_in!==0)return p;(A=O.state).mode===12&&(A.mode=13),Y=O.next_out,at=O.output,rt=O.avail_out,ot=O.next_in,Z=O.input,st=O.avail_in,q=A.hold,Q=A.bits,Ct=st,J=rt,tt=v;t:for(;;)switch(A.mode){case M:if(A.wrap===0){A.mode=13;break}for(;Q<16;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(2&A.wrap&&q===35615){k[A.check=0]=255&q,k[1]=q>>>8&255,A.check=c(A.check,k,2,0),Q=q=0,A.mode=2;break}if(A.flags=0,A.head&&(A.head.done=!1),!(1&A.wrap)||(((255&q)<<8)+(q>>8))%31){O.msg="incorrect header check",A.mode=30;break}if((15&q)!=8){O.msg="unknown compression method",A.mode=30;break}if(Q-=4,w=8+(15&(q>>>=4)),A.wbits===0)A.wbits=w;else if(w>A.wbits){O.msg="invalid window size",A.mode=30;break}A.dmax=1<<w,O.adler=A.check=1,A.mode=512&q?10:12,Q=q=0;break;case 2:for(;Q<16;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(A.flags=q,(255&A.flags)!=8){O.msg="unknown compression method",A.mode=30;break}if(57344&A.flags){O.msg="unknown header flags set",A.mode=30;break}A.head&&(A.head.text=q>>8&1),512&A.flags&&(k[0]=255&q,k[1]=q>>>8&255,A.check=c(A.check,k,2,0)),Q=q=0,A.mode=3;case 3:for(;Q<32;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}A.head&&(A.head.time=q),512&A.flags&&(k[0]=255&q,k[1]=q>>>8&255,k[2]=q>>>16&255,k[3]=q>>>24&255,A.check=c(A.check,k,4,0)),Q=q=0,A.mode=4;case 4:for(;Q<16;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}A.head&&(A.head.xflags=255&q,A.head.os=q>>8),512&A.flags&&(k[0]=255&q,k[1]=q>>>8&255,A.check=c(A.check,k,2,0)),Q=q=0,A.mode=5;case 5:if(1024&A.flags){for(;Q<16;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}A.length=q,A.head&&(A.head.extra_len=q),512&A.flags&&(k[0]=255&q,k[1]=q>>>8&255,A.check=c(A.check,k,2,0)),Q=q=0}else A.head&&(A.head.extra=null);A.mode=6;case 6:if(1024&A.flags&&(st<(et=A.length)&&(et=st),et&&(A.head&&(w=A.head.extra_len-A.length,A.head.extra||(A.head.extra=new Array(A.head.extra_len)),o.arraySet(A.head.extra,Z,ot,et,w)),512&A.flags&&(A.check=c(A.check,Z,et,ot)),st-=et,ot+=et,A.length-=et),A.length))break t;A.length=0,A.mode=7;case 7:if(2048&A.flags){if(st===0)break t;for(et=0;w=Z[ot+et++],A.head&&w&&A.length<65536&&(A.head.name+=String.fromCharCode(w)),w&&et<st;);if(512&A.flags&&(A.check=c(A.check,Z,et,ot)),st-=et,ot+=et,w)break t}else A.head&&(A.head.name=null);A.length=0,A.mode=8;case 8:if(4096&A.flags){if(st===0)break t;for(et=0;w=Z[ot+et++],A.head&&w&&A.length<65536&&(A.head.comment+=String.fromCharCode(w)),w&&et<st;);if(512&A.flags&&(A.check=c(A.check,Z,et,ot)),st-=et,ot+=et,w)break t}else A.head&&(A.head.comment=null);A.mode=9;case 9:if(512&A.flags){for(;Q<16;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(q!==(65535&A.check)){O.msg="header crc mismatch",A.mode=30;break}Q=q=0}A.head&&(A.head.hcrc=A.flags>>9&1,A.head.done=!0),O.adler=A.check=0,A.mode=12;break;case 10:for(;Q<32;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}O.adler=A.check=g(q),Q=q=0,A.mode=11;case 11:if(A.havedict===0)return O.next_out=Y,O.avail_out=rt,O.next_in=ot,O.avail_in=st,A.hold=q,A.bits=Q,2;O.adler=A.check=1,A.mode=12;case 12:if(B===5||B===6)break t;case 13:if(A.last){q>>>=7&Q,Q-=7&Q,A.mode=27;break}for(;Q<3;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}switch(A.last=1&q,Q-=1,3&(q>>>=1)){case 0:A.mode=14;break;case 1:if(P(A),A.mode=20,B!==6)break;q>>>=2,Q-=2;break t;case 2:A.mode=17;break;case 3:O.msg="invalid block type",A.mode=30}q>>>=2,Q-=2;break;case 14:for(q>>>=7&Q,Q-=7&Q;Q<32;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if((65535&q)!=(q>>>16^65535)){O.msg="invalid stored block lengths",A.mode=30;break}if(A.length=65535&q,Q=q=0,A.mode=15,B===6)break t;case 15:A.mode=16;case 16:if(et=A.length){if(st<et&&(et=st),rt<et&&(et=rt),et===0)break t;o.arraySet(at,Z,ot,et,Y),st-=et,ot+=et,rt-=et,Y+=et,A.length-=et;break}A.mode=12;break;case 17:for(;Q<14;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(A.nlen=257+(31&q),q>>>=5,Q-=5,A.ndist=1+(31&q),q>>>=5,Q-=5,A.ncode=4+(15&q),q>>>=4,Q-=4,286<A.nlen||30<A.ndist){O.msg="too many length or distance symbols",A.mode=30;break}A.have=0,A.mode=18;case 18:for(;A.have<A.ncode;){for(;Q<3;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}A.lens[X[A.have++]]=7&q,q>>>=3,Q-=3}for(;A.have<19;)A.lens[X[A.have++]]=0;if(A.lencode=A.lendyn,A.lenbits=7,K={bits:A.lenbits},tt=d(0,A.lens,0,19,A.lencode,0,A.work,K),A.lenbits=K.bits,tt){O.msg="invalid code lengths set",A.mode=30;break}A.have=0,A.mode=19;case 19:for(;A.have<A.nlen+A.ndist;){for(;It=(S=A.lencode[q&(1<<A.lenbits)-1])>>>16&255,zt=65535&S,!((Pt=S>>>24)<=Q);){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(zt<16)q>>>=Pt,Q-=Pt,A.lens[A.have++]=zt;else{if(zt===16){for(T=Pt+2;Q<T;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(q>>>=Pt,Q-=Pt,A.have===0){O.msg="invalid bit length repeat",A.mode=30;break}w=A.lens[A.have-1],et=3+(3&q),q>>>=2,Q-=2}else if(zt===17){for(T=Pt+3;Q<T;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}Q-=Pt,w=0,et=3+(7&(q>>>=Pt)),q>>>=3,Q-=3}else{for(T=Pt+7;Q<T;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}Q-=Pt,w=0,et=11+(127&(q>>>=Pt)),q>>>=7,Q-=7}if(A.have+et>A.nlen+A.ndist){O.msg="invalid bit length repeat",A.mode=30;break}for(;et--;)A.lens[A.have++]=w}}if(A.mode===30)break;if(A.lens[256]===0){O.msg="invalid code -- missing end-of-block",A.mode=30;break}if(A.lenbits=9,K={bits:A.lenbits},tt=d(f,A.lens,0,A.nlen,A.lencode,0,A.work,K),A.lenbits=K.bits,tt){O.msg="invalid literal/lengths set",A.mode=30;break}if(A.distbits=6,A.distcode=A.distdyn,K={bits:A.distbits},tt=d(m,A.lens,A.nlen,A.ndist,A.distcode,0,A.work,K),A.distbits=K.bits,tt){O.msg="invalid distances set",A.mode=30;break}if(A.mode=20,B===6)break t;case 20:A.mode=21;case 21:if(6<=st&&258<=rt){O.next_out=Y,O.avail_out=rt,O.next_in=ot,O.avail_in=st,A.hold=q,A.bits=Q,h(O,J),Y=O.next_out,at=O.output,rt=O.avail_out,ot=O.next_in,Z=O.input,st=O.avail_in,q=A.hold,Q=A.bits,A.mode===12&&(A.back=-1);break}for(A.back=0;It=(S=A.lencode[q&(1<<A.lenbits)-1])>>>16&255,zt=65535&S,!((Pt=S>>>24)<=Q);){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(It&&!(240&It)){for(it=Pt,vt=It,xt=zt;It=(S=A.lencode[xt+((q&(1<<it+vt)-1)>>it)])>>>16&255,zt=65535&S,!(it+(Pt=S>>>24)<=Q);){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}q>>>=it,Q-=it,A.back+=it}if(q>>>=Pt,Q-=Pt,A.back+=Pt,A.length=zt,It===0){A.mode=26;break}if(32&It){A.back=-1,A.mode=12;break}if(64&It){O.msg="invalid literal/length code",A.mode=30;break}A.extra=15&It,A.mode=22;case 22:if(A.extra){for(T=A.extra;Q<T;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}A.length+=q&(1<<A.extra)-1,q>>>=A.extra,Q-=A.extra,A.back+=A.extra}A.was=A.length,A.mode=23;case 23:for(;It=(S=A.distcode[q&(1<<A.distbits)-1])>>>16&255,zt=65535&S,!((Pt=S>>>24)<=Q);){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(!(240&It)){for(it=Pt,vt=It,xt=zt;It=(S=A.distcode[xt+((q&(1<<it+vt)-1)>>it)])>>>16&255,zt=65535&S,!(it+(Pt=S>>>24)<=Q);){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}q>>>=it,Q-=it,A.back+=it}if(q>>>=Pt,Q-=Pt,A.back+=Pt,64&It){O.msg="invalid distance code",A.mode=30;break}A.offset=zt,A.extra=15&It,A.mode=24;case 24:if(A.extra){for(T=A.extra;Q<T;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}A.offset+=q&(1<<A.extra)-1,q>>>=A.extra,Q-=A.extra,A.back+=A.extra}if(A.offset>A.dmax){O.msg="invalid distance too far back",A.mode=30;break}A.mode=25;case 25:if(rt===0)break t;if(et=J-rt,A.offset>et){if((et=A.offset-et)>A.whave&&A.sane){O.msg="invalid distance too far back",A.mode=30;break}Mt=et>A.wnext?(et-=A.wnext,A.wsize-et):A.wnext-et,et>A.length&&(et=A.length),bt=A.window}else bt=at,Mt=Y-A.offset,et=A.length;for(rt<et&&(et=rt),rt-=et,A.length-=et;at[Y++]=bt[Mt++],--et;);A.length===0&&(A.mode=21);break;case 26:if(rt===0)break t;at[Y++]=A.length,rt--,A.mode=21;break;case 27:if(A.wrap){for(;Q<32;){if(st===0)break t;st--,q|=Z[ot++]<<Q,Q+=8}if(J-=rt,O.total_out+=J,A.total+=J,J&&(O.adler=A.check=A.flags?c(A.check,at,J,Y-J):l(A.check,at,J,Y-J)),J=rt,(A.flags?q:g(q))!==A.check){O.msg="incorrect data check",A.mode=30;break}Q=q=0}A.mode=28;case 28:if(A.wrap&&A.flags){for(;Q<32;){if(st===0)break t;st--,q+=Z[ot++]<<Q,Q+=8}if(q!==(4294967295&A.total)){O.msg="incorrect length check",A.mode=30;break}Q=q=0}A.mode=29;case 29:tt=1;break t;case 30:tt=-3;break t;case 31:return-4;case 32:default:return p}return O.next_out=Y,O.avail_out=rt,O.next_in=ot,O.avail_in=st,A.hold=q,A.bits=Q,(A.wsize||J!==O.avail_out&&A.mode<30&&(A.mode<27||B!==4))&&W(O,O.output,O.next_out,J-O.avail_out)?(A.mode=31,-4):(Ct-=O.avail_in,J-=O.avail_out,O.total_in+=Ct,O.total_out+=J,A.total+=J,A.wrap&&J&&(O.adler=A.check=A.flags?c(A.check,at,J,O.next_out-J):l(A.check,at,J,O.next_out-J)),O.data_type=A.bits+(A.last?64:0)+(A.mode===12?128:0)+(A.mode===20||A.mode===15?256:0),(Ct==0&&J===0||B===4)&&tt===v&&(tt=-5),tt)},s.inflateEnd=function(O){if(!O||!O.state)return p;var B=O.state;return B.window&&(B.window=null),O.state=null,v},s.inflateGetHeader=function(O,B){var A;return O&&O.state&&2&(A=O.state).wrap?((A.head=B).done=!1,v):p},s.inflateSetDictionary=function(O,B){var A,Z=B.length;return O&&O.state?(A=O.state).wrap!==0&&A.mode!==11?p:A.mode===11&&l(1,B,Z,0)!==A.check?-3:W(O,B,Z,Z)?(A.mode=31,-4):(A.havedict=1,v):p},s.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(e,n,s){var o=e("../utils/common"),l=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],c=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],h=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],d=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];n.exports=function(f,m,v,p,M,y,_,g){var C,b,I,N,F,z,G,D,P,W=g.bits,O=0,B=0,A=0,Z=0,at=0,ot=0,Y=0,st=0,rt=0,q=0,Q=null,Ct=0,J=new o.Buf16(16),et=new o.Buf16(16),Mt=null,bt=0;for(O=0;O<=15;O++)J[O]=0;for(B=0;B<p;B++)J[m[v+B]]++;for(at=W,Z=15;1<=Z&&J[Z]===0;Z--);if(Z<at&&(at=Z),Z===0)return M[y++]=20971520,M[y++]=20971520,g.bits=1,0;for(A=1;A<Z&&J[A]===0;A++);for(at<A&&(at=A),O=st=1;O<=15;O++)if(st<<=1,(st-=J[O])<0)return-1;if(0<st&&(f===0||Z!==1))return-1;for(et[1]=0,O=1;O<15;O++)et[O+1]=et[O]+J[O];for(B=0;B<p;B++)m[v+B]!==0&&(_[et[m[v+B]]++]=B);if(z=f===0?(Q=Mt=_,19):f===1?(Q=l,Ct-=257,Mt=c,bt-=257,256):(Q=h,Mt=d,-1),O=A,F=y,Y=B=q=0,I=-1,N=(rt=1<<(ot=at))-1,f===1&&852<rt||f===2&&592<rt)return 1;for(;;){for(G=O-Y,P=_[B]<z?(D=0,_[B]):_[B]>z?(D=Mt[bt+_[B]],Q[Ct+_[B]]):(D=96,0),C=1<<O-Y,A=b=1<<ot;M[F+(q>>Y)+(b-=C)]=G<<24|D<<16|P|0,b!==0;);for(C=1<<O-1;q&C;)C>>=1;if(C!==0?(q&=C-1,q+=C):q=0,B++,--J[O]==0){if(O===Z)break;O=m[v+_[B]]}if(at<O&&(q&N)!==I){for(Y===0&&(Y=at),F+=A,st=1<<(ot=O-Y);ot+Y<Z&&!((st-=J[ot+Y])<=0);)ot++,st<<=1;if(rt+=1<<ot,f===1&&852<rt||f===2&&592<rt)return 1;M[I=q&N]=at<<24|ot<<16|F-y|0}}return q!==0&&(M[F+q]=O-Y<<24|64<<16|0),g.bits=at,0}},{"../utils/common":41}],51:[function(e,n,s){n.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(e,n,s){var o=e("../utils/common"),l=0,c=1;function h(S){for(var k=S.length;0<=--k;)S[k]=0}var d=0,f=29,m=256,v=m+1+f,p=30,M=19,y=2*v+1,_=15,g=16,C=7,b=256,I=16,N=17,F=18,z=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],G=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],P=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],W=new Array(2*(v+2));h(W);var O=new Array(2*p);h(O);var B=new Array(512);h(B);var A=new Array(256);h(A);var Z=new Array(f);h(Z);var at,ot,Y,st=new Array(p);function rt(S,k,X,$,V){this.static_tree=S,this.extra_bits=k,this.extra_base=X,this.elems=$,this.max_length=V,this.has_stree=S&&S.length}function q(S,k){this.dyn_tree=S,this.max_code=0,this.stat_desc=k}function Q(S){return S<256?B[S]:B[256+(S>>>7)]}function Ct(S,k){S.pending_buf[S.pending++]=255&k,S.pending_buf[S.pending++]=k>>>8&255}function J(S,k,X){S.bi_valid>g-X?(S.bi_buf|=k<<S.bi_valid&65535,Ct(S,S.bi_buf),S.bi_buf=k>>g-S.bi_valid,S.bi_valid+=X-g):(S.bi_buf|=k<<S.bi_valid&65535,S.bi_valid+=X)}function et(S,k,X){J(S,X[2*k],X[2*k+1])}function Mt(S,k){for(var X=0;X|=1&S,S>>>=1,X<<=1,0<--k;);return X>>>1}function bt(S,k,X){var $,V,ft=new Array(_+1),lt=0;for($=1;$<=_;$++)ft[$]=lt=lt+X[$-1]<<1;for(V=0;V<=k;V++){var pt=S[2*V+1];pt!==0&&(S[2*V]=Mt(ft[pt]++,pt))}}function Pt(S){var k;for(k=0;k<v;k++)S.dyn_ltree[2*k]=0;for(k=0;k<p;k++)S.dyn_dtree[2*k]=0;for(k=0;k<M;k++)S.bl_tree[2*k]=0;S.dyn_ltree[2*b]=1,S.opt_len=S.static_len=0,S.last_lit=S.matches=0}function It(S){8<S.bi_valid?Ct(S,S.bi_buf):0<S.bi_valid&&(S.pending_buf[S.pending++]=S.bi_buf),S.bi_buf=0,S.bi_valid=0}function zt(S,k,X,$){var V=2*k,ft=2*X;return S[V]<S[ft]||S[V]===S[ft]&&$[k]<=$[X]}function it(S,k,X){for(var $=S.heap[X],V=X<<1;V<=S.heap_len&&(V<S.heap_len&&zt(k,S.heap[V+1],S.heap[V],S.depth)&&V++,!zt(k,$,S.heap[V],S.depth));)S.heap[X]=S.heap[V],X=V,V<<=1;S.heap[X]=$}function vt(S,k,X){var $,V,ft,lt,pt=0;if(S.last_lit!==0)for(;$=S.pending_buf[S.d_buf+2*pt]<<8|S.pending_buf[S.d_buf+2*pt+1],V=S.pending_buf[S.l_buf+pt],pt++,$===0?et(S,V,k):(et(S,(ft=A[V])+m+1,k),(lt=z[ft])!==0&&J(S,V-=Z[ft],lt),et(S,ft=Q(--$),X),(lt=G[ft])!==0&&J(S,$-=st[ft],lt)),pt<S.last_lit;);et(S,b,k)}function xt(S,k){var X,$,V,ft=k.dyn_tree,lt=k.stat_desc.static_tree,pt=k.stat_desc.has_stree,Et=k.stat_desc.elems,wt=-1;for(S.heap_len=0,S.heap_max=y,X=0;X<Et;X++)ft[2*X]!==0?(S.heap[++S.heap_len]=wt=X,S.depth[X]=0):ft[2*X+1]=0;for(;S.heap_len<2;)ft[2*(V=S.heap[++S.heap_len]=wt<2?++wt:0)]=1,S.depth[V]=0,S.opt_len--,pt&&(S.static_len-=lt[2*V+1]);for(k.max_code=wt,X=S.heap_len>>1;1<=X;X--)it(S,ft,X);for(V=Et;X=S.heap[1],S.heap[1]=S.heap[S.heap_len--],it(S,ft,1),$=S.heap[1],S.heap[--S.heap_max]=X,S.heap[--S.heap_max]=$,ft[2*V]=ft[2*X]+ft[2*$],S.depth[V]=(S.depth[X]>=S.depth[$]?S.depth[X]:S.depth[$])+1,ft[2*X+1]=ft[2*$+1]=V,S.heap[1]=V++,it(S,ft,1),2<=S.heap_len;);S.heap[--S.heap_max]=S.heap[1],function(Tt,Ht){var Ft,Dt,Kt,Gt,re,se,Jt=Ht.dyn_tree,Bt=Ht.max_code,R=Ht.stat_desc.static_tree,ut=Ht.stat_desc.has_stree,St=Ht.stat_desc.extra_bits,Rt=Ht.stat_desc.extra_base,Nt=Ht.stat_desc.max_length,ne=0;for(Gt=0;Gt<=_;Gt++)Tt.bl_count[Gt]=0;for(Jt[2*Tt.heap[Tt.heap_max]+1]=0,Ft=Tt.heap_max+1;Ft<y;Ft++)Nt<(Gt=Jt[2*Jt[2*(Dt=Tt.heap[Ft])+1]+1]+1)&&(Gt=Nt,ne++),Jt[2*Dt+1]=Gt,Bt<Dt||(Tt.bl_count[Gt]++,re=0,Rt<=Dt&&(re=St[Dt-Rt]),se=Jt[2*Dt],Tt.opt_len+=se*(Gt+re),ut&&(Tt.static_len+=se*(R[2*Dt+1]+re)));if(ne!==0){do{for(Gt=Nt-1;Tt.bl_count[Gt]===0;)Gt--;Tt.bl_count[Gt]--,Tt.bl_count[Gt+1]+=2,Tt.bl_count[Nt]--,ne-=2}while(0<ne);for(Gt=Nt;Gt!==0;Gt--)for(Dt=Tt.bl_count[Gt];Dt!==0;)Bt<(Kt=Tt.heap[--Ft])||(Jt[2*Kt+1]!==Gt&&(Tt.opt_len+=(Gt-Jt[2*Kt+1])*Jt[2*Kt],Jt[2*Kt+1]=Gt),Dt--)}}(S,k),bt(ft,wt,S.bl_count)}function w(S,k,X){var $,V,ft=-1,lt=k[1],pt=0,Et=7,wt=4;for(lt===0&&(Et=138,wt=3),k[2*(X+1)+1]=65535,$=0;$<=X;$++)V=lt,lt=k[2*($+1)+1],++pt<Et&&V===lt||(pt<wt?S.bl_tree[2*V]+=pt:V!==0?(V!==ft&&S.bl_tree[2*V]++,S.bl_tree[2*I]++):pt<=10?S.bl_tree[2*N]++:S.bl_tree[2*F]++,ft=V,wt=(pt=0)===lt?(Et=138,3):V===lt?(Et=6,3):(Et=7,4))}function tt(S,k,X){var $,V,ft=-1,lt=k[1],pt=0,Et=7,wt=4;for(lt===0&&(Et=138,wt=3),$=0;$<=X;$++)if(V=lt,lt=k[2*($+1)+1],!(++pt<Et&&V===lt)){if(pt<wt)for(;et(S,V,S.bl_tree),--pt!=0;);else V!==0?(V!==ft&&(et(S,V,S.bl_tree),pt--),et(S,I,S.bl_tree),J(S,pt-3,2)):pt<=10?(et(S,N,S.bl_tree),J(S,pt-3,3)):(et(S,F,S.bl_tree),J(S,pt-11,7));ft=V,wt=(pt=0)===lt?(Et=138,3):V===lt?(Et=6,3):(Et=7,4)}}h(st);var K=!1;function T(S,k,X,$){J(S,(d<<1)+($?1:0),3),function(V,ft,lt,pt){It(V),Ct(V,lt),Ct(V,~lt),o.arraySet(V.pending_buf,V.window,ft,lt,V.pending),V.pending+=lt}(S,k,X)}s._tr_init=function(S){K||(function(){var k,X,$,V,ft,lt=new Array(_+1);for(V=$=0;V<f-1;V++)for(Z[V]=$,k=0;k<1<<z[V];k++)A[$++]=V;for(A[$-1]=V,V=ft=0;V<16;V++)for(st[V]=ft,k=0;k<1<<G[V];k++)B[ft++]=V;for(ft>>=7;V<p;V++)for(st[V]=ft<<7,k=0;k<1<<G[V]-7;k++)B[256+ft++]=V;for(X=0;X<=_;X++)lt[X]=0;for(k=0;k<=143;)W[2*k+1]=8,k++,lt[8]++;for(;k<=255;)W[2*k+1]=9,k++,lt[9]++;for(;k<=279;)W[2*k+1]=7,k++,lt[7]++;for(;k<=287;)W[2*k+1]=8,k++,lt[8]++;for(bt(W,v+1,lt),k=0;k<p;k++)O[2*k+1]=5,O[2*k]=Mt(k,5);at=new rt(W,z,m+1,v,_),ot=new rt(O,G,0,p,_),Y=new rt(new Array(0),D,0,M,C)}(),K=!0),S.l_desc=new q(S.dyn_ltree,at),S.d_desc=new q(S.dyn_dtree,ot),S.bl_desc=new q(S.bl_tree,Y),S.bi_buf=0,S.bi_valid=0,Pt(S)},s._tr_stored_block=T,s._tr_flush_block=function(S,k,X,$){var V,ft,lt=0;0<S.level?(S.strm.data_type===2&&(S.strm.data_type=function(pt){var Et,wt=4093624447;for(Et=0;Et<=31;Et++,wt>>>=1)if(1&wt&&pt.dyn_ltree[2*Et]!==0)return l;if(pt.dyn_ltree[18]!==0||pt.dyn_ltree[20]!==0||pt.dyn_ltree[26]!==0)return c;for(Et=32;Et<m;Et++)if(pt.dyn_ltree[2*Et]!==0)return c;return l}(S)),xt(S,S.l_desc),xt(S,S.d_desc),lt=function(pt){var Et;for(w(pt,pt.dyn_ltree,pt.l_desc.max_code),w(pt,pt.dyn_dtree,pt.d_desc.max_code),xt(pt,pt.bl_desc),Et=M-1;3<=Et&&pt.bl_tree[2*P[Et]+1]===0;Et--);return pt.opt_len+=3*(Et+1)+5+5+4,Et}(S),V=S.opt_len+3+7>>>3,(ft=S.static_len+3+7>>>3)<=V&&(V=ft)):V=ft=X+5,X+4<=V&&k!==-1?T(S,k,X,$):S.strategy===4||ft===V?(J(S,2+($?1:0),3),vt(S,W,O)):(J(S,4+($?1:0),3),function(pt,Et,wt,Tt){var Ht;for(J(pt,Et-257,5),J(pt,wt-1,5),J(pt,Tt-4,4),Ht=0;Ht<Tt;Ht++)J(pt,pt.bl_tree[2*P[Ht]+1],3);tt(pt,pt.dyn_ltree,Et-1),tt(pt,pt.dyn_dtree,wt-1)}(S,S.l_desc.max_code+1,S.d_desc.max_code+1,lt+1),vt(S,S.dyn_ltree,S.dyn_dtree)),Pt(S),$&&It(S)},s._tr_tally=function(S,k,X){return S.pending_buf[S.d_buf+2*S.last_lit]=k>>>8&255,S.pending_buf[S.d_buf+2*S.last_lit+1]=255&k,S.pending_buf[S.l_buf+S.last_lit]=255&X,S.last_lit++,k===0?S.dyn_ltree[2*X]++:(S.matches++,k--,S.dyn_ltree[2*(A[X]+m+1)]++,S.dyn_dtree[2*Q(k)]++),S.last_lit===S.lit_bufsize-1},s._tr_align=function(S){J(S,2,3),et(S,b,W),function(k){k.bi_valid===16?(Ct(k,k.bi_buf),k.bi_buf=0,k.bi_valid=0):8<=k.bi_valid&&(k.pending_buf[k.pending++]=255&k.bi_buf,k.bi_buf>>=8,k.bi_valid-=8)}(S)}},{"../utils/common":41}],53:[function(e,n,s){n.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(e,n,s){(function(o){(function(l,c){if(!l.setImmediate){var h,d,f,m,v=1,p={},M=!1,y=l.document,_=Object.getPrototypeOf&&Object.getPrototypeOf(l);_=_&&_.setTimeout?_:l,h={}.toString.call(l.process)==="[object process]"?function(I){process.nextTick(function(){C(I)})}:function(){if(l.postMessage&&!l.importScripts){var I=!0,N=l.onmessage;return l.onmessage=function(){I=!1},l.postMessage("","*"),l.onmessage=N,I}}()?(m="setImmediate$"+Math.random()+"$",l.addEventListener?l.addEventListener("message",b,!1):l.attachEvent("onmessage",b),function(I){l.postMessage(m+I,"*")}):l.MessageChannel?((f=new MessageChannel).port1.onmessage=function(I){C(I.data)},function(I){f.port2.postMessage(I)}):y&&"onreadystatechange"in y.createElement("script")?(d=y.documentElement,function(I){var N=y.createElement("script");N.onreadystatechange=function(){C(I),N.onreadystatechange=null,d.removeChild(N),N=null},d.appendChild(N)}):function(I){setTimeout(C,0,I)},_.setImmediate=function(I){typeof I!="function"&&(I=new Function(""+I));for(var N=new Array(arguments.length-1),F=0;F<N.length;F++)N[F]=arguments[F+1];var z={callback:I,args:N};return p[v]=z,h(v),v++},_.clearImmediate=g}function g(I){delete p[I]}function C(I){if(M)setTimeout(C,0,I);else{var N=p[I];if(N){M=!0;try{(function(F){var z=F.callback,G=F.args;switch(G.length){case 0:z();break;case 1:z(G[0]);break;case 2:z(G[0],G[1]);break;case 3:z(G[0],G[1],G[2]);break;default:z.apply(c,G)}})(N)}finally{g(I),M=!1}}}}function b(I){I.source===l&&typeof I.data=="string"&&I.data.indexOf(m)===0&&C(+I.data.slice(m.length))}})(typeof self>"u"?o===void 0?this:o:self)}).call(this,typeof ss<"u"?ss:typeof self<"u"?self:typeof window<"u"?window:{})},{}]},{},[10])(10)})})(nd);var fy=nd.exports;const py=Xh(fy);async function my(r){if(!Lt.tg||!Lt.tg.children.length){alert("Générez d'abord le terrain 3D.");return}const t=[];let e=1;if(Lt.tg.traverse(p=>{if(!(p instanceof sn))return;const M=p.geometry.clone();p.updateWorldMatrix(!0,!1),M.applyMatrix4(p.matrixWorld);const y=M.attributes.position,_=M.index;if(!y||y.count<3){M.dispose();return}let g="E4DFD8";const C=Array.isArray(p.material)?p.material[0]:p.material;C&&"color"in C&&(g=C.color.getHexString().toUpperCase());let b="";for(let N=0;N<y.count;N++)b+=`<vertex x="${y.getX(N).toFixed(4)}" y="${y.getZ(N).toFixed(4)}" z="${y.getY(N).toFixed(4)}"/>`;let I="";if(_)for(let N=0;N<_.count;N+=3)I+=`<triangle v1="${_.getX(N)}" v2="${_.getX(N+1)}" v3="${_.getX(N+2)}"/>`;else for(let N=0;N<y.count;N+=3)I+=`<triangle v1="${N}" v2="${N+1}" v3="${N+2}"/>`;M.dispose(),I&&t.push({id:e++,name:p.name||"mesh",col:g,vx:b,tr:I})}),!t.length){alert("Aucun maillage à exporter.");return}const n=t.map(p=>`<basematerials id="${p.id+1e3}"><base name="${p.name}" displaycolor="#${p.col}"/></basematerials>`).join(`
`),s=t.map(p=>`<object id="${p.id}" type="model" p:pid="${p.id+1e3}" p:pindex="0"><mesh><vertices>${p.vx}</vertices><triangles>${p.tr}</triangles></mesh></object>`).join(`
`),o=t.map(p=>`<item objectid="${p.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`).join(`
`),l=['<?xml version="1.0" encoding="UTF-8"?>','<model unit="millimeter" xml:lang="en-US"','  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02"','  xmlns:p="http://schemas.microsoft.com/3dmanufacturing/production/2015/06">','  <metadata name="Title">Terrain3D</metadata>',"  <resources>",n,s,"  </resources>","  <build>",o,"  </build>","</model>"].join(`
`),c=['<?xml version="1.0" encoding="UTF-8"?>','<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">','  <Relationship Target="/3D/3dmodel.model" Id="rel0"','    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',"</Relationships>"].join(`
`),h=['<?xml version="1.0" encoding="UTF-8"?>','<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">','  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>','  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',"</Types>"].join(`
`),d=new py;d.file("[Content_Types].xml",h),d.folder("_rels").file(".rels",c),d.folder("3D").file("3dmodel.model",l);const f=await d.generateAsync({type:"blob",compression:"DEFLATE",compressionOptions:{level:6}}),m=URL.createObjectURL(f),v=document.createElement("a");v.href=m,v.download=`Terrain3D_${Date.now()}.3mf`,document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(m)}const _y=.05;function gy(){return new Worker(new URL("/assets/terrain.worker-DyK8qd_U.js",import.meta.url),{type:"module"})}function vy(){return new Worker(new URL("/assets/geometry.worker-B3F1NWfB.js",import.meta.url),{type:"module"})}async function _l(){if(!Lt.bounds){ic("ZONE MANQUANTE",`Dessinez d'abord une zone sur l'onglet "Sélection de la zone".`);return}if(Lt.generating)return;Lt.generating=!0;const r=document.getElementById("btn-gen"),t=document.getElementById("btn-stl"),e=document.getElementById("btn-export");r.disabled=!0,t.disabled=!0,e.disabled=!0,document.getElementById("empty3d").classList.add("h"),ia(!0);try{const n=document.getElementById("c3d");await pl(n);const s=qh(),{bounds:o,wMm:l,dMm:c}=Lt,{minLat:h,maxLat:d,minLon:f,maxLon:m}=o,v=(h+d)/2,p=(f+m)/2,M=(m-f)*Math.cos(v*Math.PI/180)*111320;Lt.mmPerMeter=l/M,Lt.BASE_H=s.baseH,ui(5,"ÉLÉVATION","Téléchargement des tuiles d'altitude…");const y=s.terrainRes,_=await new Promise((G,D)=>{const P=gy();P.onmessage=O=>{O.data.type==="PROGRESS"?ui(5+O.data.pct*.2,"ÉLÉVATION","Altitude…"):O.data.type==="TERRAIN_READY"?(P.terminate(),G(O.data)):O.data.type==="ERROR"&&(P.terminate(),D(new Error(O.data.message)))},P.onerror=O=>{P.terminate(),D(O)};const W={type:"BUILD_TERRAIN",bounds:o,GRID:y,elevZoom:s.elevZoom};P.postMessage(W)});Lt.elevGrid=_.elevGrid,Lt.GRID=_.GRID,Lt.minE=_.minE,Lt.elevRange=_.elevRange;const C=(d-h)*111320,b=Math.max(M,C),I=Math.max(l,c),N=_.elevRange/b*I*s.exag;Lt.elevScaleMm=Math.max(1,Math.min(I*.5,N)),s.smooth>0&&xy(Lt.elevGrid,y,s.smooth),ui(30,"DONNÉES","Chargement des données cartographiques…");const F=await uy(o,G=>{ui(30+G*.3,"DONNÉES","Données carto…")});ui(60,"GÉOMÉTRIE","Génération des géométries 3D…");const z=await new Promise((G,D)=>{const P=vy();P.onmessage=O=>{O.data.type==="GEO_PROGRESS"?ui(60+O.data.pct*.35,"GÉOMÉTRIE",`${O.data.step}…`):O.data.type==="GEOMETRY_READY"?(P.terminate(),G(O.data)):O.data.type==="ERROR"&&(P.terminate(),D(new Error(O.data.message)))},P.onerror=O=>{P.terminate(),D(O)};const W={type:"BUILD_GEOMETRY",elevGrid:Lt.elevGrid,GRID:Lt.GRID,wMm:l,dMm:c,BASE_H:Lt.BASE_H,MIN_SURF:_y,elevScaleMm:Lt.elevScaleMm,minE:Lt.minE,elevRange:Lt.elevRange,features:F,gpxPoints:Lt.gpxPoints,bounds:o,settings:s,zoneType:Lt.zoneType,zonePts:Lt.zonePts,mmPerMeter:Lt.mmPerMeter};P.postMessage(W)});ui(95,"SCÈNE","Construction de la scène 3D…"),_x(z),ui(100,"TERMINÉ","Modèle 3D prêt."),Lt.generated=!0,Lt.generating=!1,setTimeout(()=>{ia(!1),document.getElementById("hint3d").style.display="block",yy(_.minE,_.maxE,Lt.elevScaleMm,l,c),t.disabled=!1,e.disabled=!1},600)}catch(n){Lt.generating=!1,ia(!1),ic("ERREUR",String(n)),console.error(n)}finally{r.disabled=!1}}function xy(r,t,e){const n=new Float32Array(r.length);for(let s=0;s<e;s++){for(let o=0;o<t;o++)for(let l=0;l<t;l++){let c=0,h=0;for(let d=-1;d<=1;d++)for(let f=-1;f<=1;f++){const m=o+d,v=l+f;m>=0&&m<t&&v>=0&&v<t&&(c+=r[m*t+v],h++)}n[o*t+l]=c/h}r.set(n)}}function yy(r,t,e,n,s){const o=document.getElementById("render-info");o&&(o.innerHTML=`
    Alt. <span style="color:var(--cyan)">${Math.round(r)}–${Math.round(t)}</span> m<br>
    Relief <span style="color:var(--cyan)">${e.toFixed(1)}</span> mm<br>
    Modèle <span style="color:var(--cyan)">${n}×${s}</span> mm
  `)}function My(){const r=document.getElementById("zone-footer"),t=document.getElementById("zone-dims");!r||!t||(Lt.bounds?(t.textContent=`${Lt.wMm} × ${Lt.dMm} mm`,r.classList.add("visible"),document.getElementById("tab-params-btn")?.removeAttribute("disabled")):(r.classList.remove("visible"),document.getElementById("tab-params-btn")?.setAttribute("disabled",""),document.getElementById("tab-render-btn")?.setAttribute("disabled","")))}$d();tf(My);document.querySelectorAll(".tab-btn").forEach(r=>{r.addEventListener("click",()=>{const t=r.dataset.tab;if(!(!t||r.disabled)&&(vs(t),t==="render")){const e=document.getElementById("c3d");e&&pl(e)}})});document.getElementById("btn-next-tab")?.addEventListener("click",()=>{Lt.bounds&&vs("params")});document.getElementById("btn-next-render")?.addEventListener("click",()=>{document.getElementById("tab-render-btn")?.removeAttribute("disabled"),vs("render");const r=document.getElementById("c3d");r&&pl(r),_l()});document.getElementById("btn-back-zone")?.addEventListener("click",()=>vs("zone"));document.getElementById("btn-back-params")?.addEventListener("click",()=>vs("params"));document.getElementById("btn-gen")?.addEventListener("click",_l);document.getElementById("btn-stl")?.addEventListener("click",()=>dy("terrain3d.stl"));document.getElementById("btn-export")?.addEventListener("click",()=>my());let Zh;document.querySelectorAll("#params-col input, #params-col select").forEach(r=>{r.addEventListener("change",()=>{clearTimeout(Zh),Zh=setTimeout(()=>{Lt.generated&&Lt.tg&&_l()},700)}),r.addEventListener("input",()=>{if(r.type==="range"){const t=document.getElementById(`${r.id}-v`);t&&(t.textContent=r.value)}})});
