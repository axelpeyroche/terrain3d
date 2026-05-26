/* ════════════════════════════════════════════
   SCENE SETUP — Three.js renderer, camera, lights, controls
   ════════════════════════════════════════════ */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { state } from '../state';

let _promise: Promise<void> | null = null;

export function ensureThree(canvas: HTMLCanvasElement): Promise<void> {
  if (_promise) return _promise;
  _promise = new Promise(res => {
    const vp = canvas.parentElement!;
    const W = vp.clientWidth || 800, H = vp.clientHeight || 600;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1.0;
    state.renderer = renderer;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xb8d4e8);
    state.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.5, 8000);
    camera.position.set(0, 200, 350);
    state.camera = camera;

    // Controls
    const ctrl = new OrbitControls(camera, canvas);
    ctrl.enableDamping = true;
    ctrl.dampingFactor = 0.07;
    ctrl.minDistance = 10;
    ctrl.maxDistance = 4000;
    ctrl.screenSpacePanning = true;
    ctrl.maxPolarAngle = Math.PI / 2; // bloque strictement à l'horizontale
    state.controls = ctrl;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.78));
    const sun = new THREE.DirectionalLight(0xfffaf4, 0.95);
    sun.position.set(-250, 700, 200);
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xddeeff, 0.40);
    fill.position.set(200, 250, -200);
    scene.add(fill);

    // Terrain group
    const tg = new THREE.Group();
    scene.add(tg);
    state.tg = tg;

    // Resize
    window.addEventListener('resize', () => {
      const W2 = vp.clientWidth, H2 = vp.clientHeight;
      if (!W2 || !H2) return;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    });

    // Render loop
    function loop() {
      requestAnimationFrame(loop);
      ctrl.update();
      renderer.render(scene, camera);
    }
    loop();
    res();
  });
  return _promise;
}

export function clearTG() {
  if (!state.tg) return;
  while (state.tg.children.length) {
    const obj = state.tg.children[0] as THREE.Mesh;
    state.tg.remove(obj);
    obj.geometry?.dispose();
    if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
    else (obj.material as THREE.Material)?.dispose();
  }
}
