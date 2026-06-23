/* ════════════════════════════════════════════
   3MF EXPORT — Format multi-matière pour AMS (Bambu Lab, etc.)
   Chaque mesh Three.js devient un objet 3MF avec sa couleur propre.
   Coordonnées converties Y-up (Three.js) → Z-up (3MF).
   ════════════════════════════════════════════ */

import JSZip from 'jszip';
import * as THREE from 'three';
import { state } from '../state';

interface MeshObj {
  id: number;
  name: string;
  col: string;
  vx: string;
  tr: string;
}

export async function export3MF(filename?: string): Promise<void> {
  if (!state.tg || !state.tg.children.length) {
    alert('Générez d\'abord le terrain 3D.');
    return;
  }

  const objects: MeshObj[] = [];
  let oid = 1;

  state.tg.traverse(obj => {
    if (!(obj instanceof THREE.Mesh)) return;
    const geo = (obj.geometry as THREE.BufferGeometry).clone();
    obj.updateWorldMatrix(true, false);
    geo.applyMatrix4(obj.matrixWorld);

    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const idxAttr = geo.index;
    if (!posAttr || posAttr.count < 3) { geo.dispose(); return; }

    // Couleur du matériau (vertex colors → couleur fixe de repli)
    let col = 'E4DFD8';
    const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
    if (mat && 'color' in mat) {
      col = (mat as THREE.MeshStandardMaterial).color.getHexString().toUpperCase();
    }

    // Convertir vertices Three.js (Y-up) → 3MF (Z-up) : x=X, y=Z, z=Y
    let vx = '';
    for (let i = 0; i < posAttr.count; i++) {
      vx += `<vertex x="${posAttr.getX(i).toFixed(4)}" y="${posAttr.getZ(i).toFixed(4)}" z="${posAttr.getY(i).toFixed(4)}"/>`;
    }

    let tr = '';
    if (idxAttr) {
      for (let i = 0; i < idxAttr.count; i += 3) {
        tr += `<triangle v1="${idxAttr.getX(i)}" v2="${idxAttr.getX(i + 1)}" v3="${idxAttr.getX(i + 2)}"/>`;
      }
    } else {
      for (let i = 0; i < posAttr.count; i += 3) {
        tr += `<triangle v1="${i}" v2="${i + 1}" v3="${i + 2}"/>`;
      }
    }

    geo.dispose();
    if (!tr) return;
    objects.push({ id: oid++, name: obj.name || 'mesh', col, vx, tr });
  });

  if (!objects.length) {
    alert('Aucun maillage à exporter.');
    return;
  }

  // Matériaux (un par mesh pour multi-couleur AMS)
  const matGroups = objects.map(o =>
    `<basematerials id="${o.id + 1000}"><base name="${o.name}" displaycolor="#${o.col}"/></basematerials>`,
  ).join('\n');

  // Objets
  const resObjs = objects.map(o =>
    `<object id="${o.id}" type="model" pid="${o.id + 1000}" pindex="0">` +
    `<mesh><vertices>${o.vx}</vertices><triangles>${o.tr}</triangles></mesh></object>`,
  ).join('\n');

  // Items de build
  const buildItems = objects.map(o =>
    `<item objectid="${o.id}" transform="1 0 0 0 1 0 0 0 1 0 0 0"/>`,
  ).join('\n');

  const model = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<model unit="millimeter" xml:lang="en-US"',
    '  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">',
    '  <metadata name="Title">Terrain3D</metadata>',
    '  <resources>',
    matGroups,
    resObjs,
    '  </resources>',
    '  <build>',
    buildItems,
    '  </build>',
    '</model>',
  ].join('\n');

  const rels = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    '  <Relationship Target="/3D/3dmodel.model" Id="rel0"',
    '    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>',
    '</Relationships>',
  ].join('\n');

  const ct = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
    '  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
    '  <Default Extension="model" ContentType="application/vnd.ms-3mfdocument"/>',
    '</Types>',
  ].join('\n');

  const zip = new JSZip();
  zip.file('[Content_Types].xml', ct);
  zip.folder('_rels')!.file('.rels', rels);
  zip.folder('3D')!.file('3dmodel.model', model);

  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 6 } });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename ?? `Terrain3D_${Date.now()}.3mf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
