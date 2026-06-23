/**
 * Stack composer — fetch sym overlays, merge defs, stack at fixed module coords.
 * Visibility toggles only; placement is manifest-driven (build-time geometry).
 */
(function initStackComposer(global) {
  const Manifest = global.StackComposerManifest;
  if (!Manifest) throw new Error('stack-composer-manifest.js must load before stack-composer.js');

  const { MODULE } = Manifest;
  const symCache = new Map();

  /** Sync with scripts/lib/heritage-background.js SKY_PLATE_STOPS */
  const SKY_PLATE = {
    dark: '#353330',
    mid: '#3d3a35',
    fadeTan: '#45372a',
  };
  const SKY_FADE_MASK_GRADIENT_ID = 'heritage-sky-fade-mask';
  const SKY_PLATE_MASK_ID = 'heritage-sky-plate-mask';
  const SKY_TEXTURE_TILE = 0.375;
  const SKY_GRADIENT_ID = 'heritage-sky-plate';
  const SKY_TEXTURE_A_ID = 'heritage-sky-texture-a';
  const SKY_TEXTURE_B_ID = 'heritage-sky-texture-b';
  const SKY_GRAIN_FILTER_ID = 'heritage-sky-grain-filter';
  /** VBI display crop — sync heritage-pilot CONTENT_H_IN (112×86). */
  const MODULE_DISPLAY_H = 86;
  /** Full crop height so sky gradient fills VB1 top edge (grass/dirt draw above y=84). */
  const SKY_PLATE_H = MODULE_DISPLAY_H;

  const ID_REF_ATTRS = ['href', 'xlink:href'];
  const URL_FRAGMENT_ATTRS = [
    'fill',
    'stroke',
    'clip-path',
    'mask',
    'filter',
    'marker-start',
    'marker-mid',
    'marker-end',
    ...ID_REF_ATTRS,
  ];

  function isHexColor(value) {
    return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(String(value).trim());
  }

  function shouldRewriteAttr(name, value) {
    if (!value) return false;
    if (ID_REF_ATTRS.includes(name)) {
      return String(value).startsWith('#') && !isHexColor(value);
    }
    if (URL_FRAGMENT_ATTRS.includes(name)) {
      return String(value).includes('url(#');
    }
    return String(value).includes('url(#');
  }

  function rewriteUrlRefs(value, prefix, attrName) {
    let out = String(value).replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`);
    if (ID_REF_ATTRS.includes(attrName) && out.startsWith('#') && !isHexColor(out)) {
      out = `#${prefix}${out.slice(1)}`;
    }
    return out;
  }

  function rewriteUrlRefsInFragment(doc, prefix) {
    doc.querySelectorAll('*').forEach((el) => {
      for (const name of el.getAttributeNames()) {
        const value = el.getAttribute(name);
        if (shouldRewriteAttr(name, value)) {
          el.setAttribute(name, rewriteUrlRefs(value, prefix, name));
        }
      }
    });
  }

  function canUseStack(state, HC) {
    const plan = Manifest.resolveStackPlan(state, HC);
    return !plan.fallback;
  }

  function parseViewBox(svgEl) {
    const vb = svgEl.getAttribute('viewBox');
    if (!vb) return { x: 0, y: 0, w: MODULE.w, h: MODULE.h };
    const [x, y, w, h] = vb.trim().split(/\s+/).map(Number);
    return { x, y, w, h };
  }

  function prefixIdsInFragment(doc, prefix) {
    doc.querySelectorAll('[id]').forEach((el) => {
      el.id = `${prefix}${el.id}`;
    });
    rewriteUrlRefsInFragment(doc, prefix);
  }

  async function fetchSymDocument(url) {
    if (symCache.has(url)) return symCache.get(url).cloneNode(true);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Stack composer: failed to fetch ${url} (${res.status})`);
    const text = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'image/svg+xml');
    const err = doc.querySelector('parsererror');
    if (err) throw new Error(`Stack composer: invalid SVG ${url}`);
    symCache.set(url, doc.documentElement.cloneNode(true));
    return doc.documentElement.cloneNode(true);
  }

  function extractSymContent(symRoot, layerId) {
    const prefix = `sc-${layerId}-`;
    const ns = 'http://www.w3.org/2000/svg';
    const wrapper = document.createElementNS(ns, 'g');
    const defsSrc = symRoot.querySelector('defs');
    if (defsSrc) {
      const defsClone = defsSrc.cloneNode(true);
      prefixIdsInFragment(defsClone, prefix);
      wrapper.appendChild(defsClone);
    }
    const main =
      symRoot.querySelector('[id^="sym-"]') ||
      symRoot.querySelector('g') ||
      symRoot;
    if (main.nodeType === Node.ELEMENT_NODE && main !== symRoot) {
      const mainClone = main.cloneNode(true);
      prefixIdsInFragment(mainClone, prefix);
      wrapper.appendChild(mainClone);
    } else {
      for (const child of main.childNodes) {
        if (child.nodeName === 'defs') continue;
        const childClone = child.cloneNode(true);
        if (childClone.nodeType === Node.ELEMENT_NODE) {
          prefixIdsInFragment(childClone, prefix);
        }
        wrapper.appendChild(childClone);
      }
    }
    return wrapper;
  }

  function layerSignature(layer) {
    if (layer.kind === 'placed' && layer.place) {
      return `${layer.id}:${layer.path}@${layer.place.y}+${layer.dy || 0}`;
    }
    return `${layer.id}:${layer.path}`;
  }

  function buildNestedSvg(content, viewBox, placement) {
    const ns = 'http://www.w3.org/2000/svg';
    const nested = document.createElementNS(ns, 'svg');
    nested.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    if (placement) {
      nested.setAttribute('x', String(placement.x));
      nested.setAttribute('y', String(placement.y + (placement.dy || 0)));
      nested.setAttribute('width', String(placement.w));
      nested.setAttribute('height', String(placement.h));
    } else {
      nested.setAttribute('x', '0');
      nested.setAttribute('y', '0');
      nested.setAttribute('width', String(MODULE.w));
      nested.setAttribute('height', String(MODULE.h));
    }
    while (content.firstChild) nested.appendChild(content.firstChild);
    return nested;
  }

  async function buildLayerNode(layer) {
    const symRoot = await fetchSymDocument(layer.path);
    const viewBox = parseViewBox(symRoot);
    const content = extractSymContent(symRoot, layer.id);
    const placement = layer.kind === 'placed' ? { ...layer.place, dy: layer.dy || 0 } : null;
    const nested = buildNestedSvg(content, viewBox, placement);
    const wrap = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    wrap.setAttribute('class', 'stack-layer');
    wrap.setAttribute('data-layer-id', layer.id);
    wrap.setAttribute('data-stack-path', layer.path);
    wrap.style.display = layer.visible ? '' : 'none';
    if (layer.mirrorX && placement) {
      const px = placement.x + placement.w;
      const py = placement.y + (placement.dy || 0);
      wrap.setAttribute('transform', `translate(${px} ${py}) scale(-1 1)`);
      nested.setAttribute('x', '0');
      nested.setAttribute('y', '0');
    }
    wrap.appendChild(nested);
    return wrap;
  }

  function createRootSvg() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('xmlns', ns);
    svg.setAttribute('viewBox', `0 0 ${MODULE.w} ${MODULE_DISPLAY_H}`);
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('id', 'fence-stack-composed');
    svg.setAttribute('data-render-mode', 'stack');
    svg.setAttribute('preserveAspectRatio', 'none');
    const defs = document.createElementNS(ns, 'defs');
    appendSkyPlateDefs(defs);
    svg.appendChild(defs);
    const root = document.createElementNS(ns, 'g');
    root.setAttribute('id', 'stack-root');
    appendSkyBackground(root);
    svg.appendChild(root);
    return svg;
  }

  function elNS(tag) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
  }

  function appendSkyPlateDefs(defsEl) {
    const grad = elNS('linearGradient');
    grad.id = SKY_GRADIENT_ID;
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', '0');
    grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0');
    grad.setAttribute('y2', String(SKY_PLATE_H));
    [
      ['0%', SKY_PLATE.dark, '1'],
      ['48%', SKY_PLATE.mid, '1'],
      ['100%', SKY_PLATE.fadeTan, '0'],
    ].forEach(([offset, color, opacity]) => {
      const stop = elNS('stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', color);
      stop.setAttribute('stop-opacity', opacity);
      grad.appendChild(stop);
    });
    defsEl.appendChild(grad);

    const fadeMaskGrad = elNS('linearGradient');
    fadeMaskGrad.id = SKY_FADE_MASK_GRADIENT_ID;
    fadeMaskGrad.setAttribute('gradientUnits', 'userSpaceOnUse');
    fadeMaskGrad.setAttribute('x1', '0');
    fadeMaskGrad.setAttribute('y1', '0');
    fadeMaskGrad.setAttribute('x2', '0');
    fadeMaskGrad.setAttribute('y2', String(SKY_PLATE_H));
    [
      ['0%', '1'],
      ['52%', '0.94'],
      ['100%', '0'],
    ].forEach(([offset, opacity]) => {
      const stop = elNS('stop');
      stop.setAttribute('offset', offset);
      stop.setAttribute('stop-color', '#ffffff');
      stop.setAttribute('stop-opacity', opacity);
      fadeMaskGrad.appendChild(stop);
    });
    defsEl.appendChild(fadeMaskGrad);

    const plateMask = elNS('mask');
    plateMask.id = SKY_PLATE_MASK_ID;
    plateMask.setAttribute('maskUnits', 'userSpaceOnUse');
    const maskRect = elNS('rect');
    maskRect.setAttribute('x', '0');
    maskRect.setAttribute('y', '0');
    maskRect.setAttribute('width', String(MODULE.w));
    maskRect.setAttribute('height', String(SKY_PLATE_H));
    maskRect.setAttribute('fill', `url(#${SKY_FADE_MASK_GRADIENT_ID})`);
    plateMask.appendChild(maskRect);
    defsEl.appendChild(plateMask);

    const tile = String(SKY_TEXTURE_TILE);
    const patternA = elNS('pattern');
    patternA.id = SKY_TEXTURE_A_ID;
    patternA.setAttribute('patternUnits', 'userSpaceOnUse');
    patternA.setAttribute('width', tile);
    patternA.setAttribute('height', tile);
    patternA.setAttribute('patternTransform', 'rotate(32)');
    const patARect = elNS('rect');
    patARect.setAttribute('width', tile);
    patARect.setAttribute('height', tile);
    patARect.setAttribute('fill', 'none');
    const patALine = elNS('line');
    patALine.setAttribute('x1', '0');
    patALine.setAttribute('y1', '0');
    patALine.setAttribute('x2', '0');
    patALine.setAttribute('y2', tile);
    patALine.setAttribute('stroke', '#1c1a18');
    patALine.setAttribute('stroke-width', '0.03125');
    patALine.setAttribute('stroke-opacity', '0.28');
    patternA.appendChild(patARect);
    patternA.appendChild(patALine);
    defsEl.appendChild(patternA);

    const patternB = elNS('pattern');
    patternB.id = SKY_TEXTURE_B_ID;
    patternB.setAttribute('patternUnits', 'userSpaceOnUse');
    patternB.setAttribute('width', tile);
    patternB.setAttribute('height', tile);
    patternB.setAttribute('patternTransform', 'rotate(-32)');
    const patBRect = elNS('rect');
    patBRect.setAttribute('width', tile);
    patBRect.setAttribute('height', tile);
    patBRect.setAttribute('fill', 'none');
    const patBLine = elNS('line');
    patBLine.setAttribute('x1', '0');
    patBLine.setAttribute('y1', '0');
    patBLine.setAttribute('x2', '0');
    patBLine.setAttribute('y2', tile);
    patBLine.setAttribute('stroke', '#141312');
    patBLine.setAttribute('stroke-width', '0.03125');
    patBLine.setAttribute('stroke-opacity', '0.18');
    patternB.appendChild(patBRect);
    patternB.appendChild(patBLine);
    defsEl.appendChild(patternB);

    const filter = elNS('filter');
    filter.id = SKY_GRAIN_FILTER_ID;
    filter.setAttribute('x', '0');
    filter.setAttribute('y', '0');
    filter.setAttribute('width', '100%');
    filter.setAttribute('height', '100%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    const turbulence = elNS('feTurbulence');
    turbulence.setAttribute('type', 'fractalNoise');
    turbulence.setAttribute('baseFrequency', '0.85');
    turbulence.setAttribute('numOctaves', '3');
    turbulence.setAttribute('seed', '11');
    turbulence.setAttribute('stitchTiles', 'stitch');
    turbulence.setAttribute('result', 'noise');
    const colorMatrix = elNS('feColorMatrix');
    colorMatrix.setAttribute('in', 'noise');
    colorMatrix.setAttribute('type', 'matrix');
    colorMatrix.setAttribute(
      'values',
      '0 0 0 0 0.42 0 0 0 0 0.40 0 0 0 0 0.38 0 0 0 0.055 0'
    );
    colorMatrix.setAttribute('result', 'grain');
    filter.appendChild(turbulence);
    filter.appendChild(colorMatrix);
    defsEl.appendChild(filter);
  }

  function skyPlateRect(fill) {
    const rect = elNS('rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', String(MODULE.w));
    rect.setAttribute('height', String(SKY_PLATE_H));
    rect.setAttribute('fill', fill);
    return rect;
  }

  function appendSkyBackground(stackRoot) {
    const bg = elNS('g');
    bg.id = 'Background-Group';
    bg.setAttribute('data-slot', 'background');
    bg.setAttribute('data-bg-tone', 'charcoal-plate');
    bg.setAttribute('data-bg-texture', 'crosshatch-grain');
    bg.setAttribute('class', 'stack-layer');
    bg.setAttribute('data-layer-id', 'background');
    bg.setAttribute('mask', `url(#${SKY_PLATE_MASK_ID})`);
    bg.appendChild(skyPlateRect(`url(#${SKY_GRADIENT_ID})`));
    const texA = skyPlateRect(`url(#${SKY_TEXTURE_A_ID})`);
    texA.setAttribute('opacity', '0.42');
    bg.appendChild(texA);
    const texB = skyPlateRect(`url(#${SKY_TEXTURE_B_ID})`);
    texB.setAttribute('opacity', '0.32');
    bg.appendChild(texB);
    const grainRect = skyPlateRect('');
    grainRect.removeAttribute('fill');
    grainRect.setAttribute('filter', `url(#${SKY_GRAIN_FILTER_ID})`);
    grainRect.setAttribute('opacity', '0.85');
    bg.appendChild(grainRect);
    stackRoot.appendChild(bg);
  }

  function hoistLayerDefs(svg, layerNode) {
    const defs = svg.querySelector('defs');
    layerNode.querySelectorAll(':scope > svg > defs, :scope defs').forEach((d) => {
      while (d.firstChild) defs.appendChild(d.firstChild);
      d.remove();
    });
  }

  /**
   * Full render into host element.
   * @param {HTMLElement} host
   * @param {object} state
   * @param {object} HC — HeritageConfigurator
   */
  async function render(host, state, HC) {
    const plan = Manifest.resolveStackPlan(state, HC);
    if (plan.fallback) {
      throw new Error(`stack-composer: cannot render (${plan.fallbackReason || 'fallback'})`);
    }

    const svg = createRootSvg();
    const stackRoot = svg.querySelector('#stack-root');
    const signature = plan.layers.map(layerSignature).join('|');

    for (const layer of plan.layers) {
      const node = await buildLayerNode(layer);
      hoistLayerDefs(svg, node);
      stackRoot.appendChild(node);
    }

    svg.setAttribute('data-stack-signature', signature);
    svg.setAttribute(
      'data-fence-line',
      HC.resolveEffectiveVpfLine(state.framePreset, state.railCount).id
    );
    host.replaceChildren(svg);
    return svg;
  }

  function applyStackConfigurator(host, state, HC) {
    const svg = host.querySelector('[data-render-mode="stack"]');
    if (!svg) return;
    const line = HC.resolveEffectiveVpfLine(
      state.framePreset || state.fenceLine || 'heritage-vpf',
      state.railCount
    );
    HC.applyStackMaterials(svg, state, line);
  }

  /**
   * Update visibility without refetch when layer paths unchanged.
   */
  function updateVisibility(host, state, HC) {
    const svg = host.querySelector('[data-render-mode="stack"]');
    if (!svg) return false;

    const plan = Manifest.resolveStackPlan(state, HC);
    if (plan.fallback) return false;

    const wanted = new Map(plan.layers.map((l) => [l.id, l]));
    svg.querySelectorAll('.stack-layer').forEach((el) => {
      const id = el.getAttribute('data-layer-id');
      if (id === 'background') return;
      const layer = wanted.get(id);
      if (!layer) {
        el.style.display = 'none';
        return;
      }
      el.style.display = layer.visible ? '' : 'none';
      const nested = el.querySelector('svg');
      if (nested && layer.kind === 'placed' && layer.place) {
        const y = layer.place.y + (layer.dy || 0);
        nested.setAttribute('y', String(y));
      }
    });

    const line = HC.resolveEffectiveVpfLine(state.framePreset, state.railCount);
    svg.setAttribute('data-fence-line', line.id);
    return true;
  }

  /**
   * Re-render if layer paths changed (trim material, picket style, frame preset rail layout).
   */
  async function sync(host, state, HC) {
    const plan = Manifest.resolveStackPlan(state, HC);
    if (plan.fallback) return { ok: false, reason: plan.fallbackReason };

    const svg = host.querySelector('[data-render-mode="stack"]');
    const signature = plan.layers.map(layerSignature).join('|');
    if (svg && svg.getAttribute('data-stack-signature') === signature) {
      updateVisibility(host, state, HC);
      applyStackConfigurator(host, state, HC);
      return { ok: true, rebuilt: false };
    }

    await render(host, state, HC);
    applyStackConfigurator(host, state, HC);
    return { ok: true, rebuilt: true };
  }

  global.StackComposer = {
    canUseStack,
    render,
    sync,
    updateVisibility,
    applyStackConfigurator,
    clearCache: () => symCache.clear(),
  };
})(window);
