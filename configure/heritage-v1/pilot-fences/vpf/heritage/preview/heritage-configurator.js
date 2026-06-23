/**
 * Heritage pilot preview — apply configurator material slots to assembly SVG.
 * Requires same-origin serve (npx serve assets/fence-svg).
 */

const MATERIAL = {
  CEDAR: 'cedar',
  PT: 'pt',
  NONE: 'none',
};

const RAIL_CAP_MODE = {
  AUTO: 'auto',
  CEDAR: 'cedar',
  PT: 'pt',
  MATCH_RAILS: 'match-rails',
};

const STAIN = {
  cedar: '#b8886b',
  cedarTrim: '#a37e54',
  cedarRail: '#ae9162',
  pt: '#6c4834',
  ptTrim: '#755038',
};

/** VPF rail-frame presets — geometry on shared picket assembly (112×96 module). */
const VPF_FRAME_PRESETS = {
  'heritage-vpf': {
    id: 'heritage-vpf',
    preset: 'hrtg',
    label: 'Default frame',
    code: 'HRTG',
    railCount: 2,
    showCap: true,
    showMiddle: false,
    bottomLayout: 'heritage',
    topRailDy: 0,
    picketTopY: 13.3125,
    picketBottomY: 82.75,
    topNailBaseY: 15.0625,
  },
  lineage: {
    id: 'lineage',
    preset: 'lineage',
    label: 'Lineage',
    code: 'LING',
    railCount: 2,
    showCap: true,
    showMiddle: false,
    bottomLayout: 'heritage',
    topRailDy: 0,
    picketTopY: 13.3125,
    picketBottomY: 82.75,
    topNailBaseY: 15.0625,
  },
  legacy: {
    id: 'legacy',
    preset: 'legacy',
    label: 'Legacy',
    code: 'LGCY',
    railCount: 3,
    showCap: true,
    showMiddle: true,
    bottomLayout: 'legacy',
    topRailDy: 0,
    picketTopY: 13.3125,
    picketBottomY: 82.75,
    topNailBaseY: 15.0625,
  },
  traditions: {
    id: 'traditions',
    preset: 'traditions',
    label: 'Traditions',
    code: 'TRAD',
    railCount: 2,
    showCap: false,
    showMiddle: false,
    bottomLayout: 'heritage',
    /** Top rail shell 12″ below picket top (post top) — narrow-set TRAD line. */
    topRailDy: 10.6875,
    picketTopY: 12,
    picketBottomY: 82.75,
    topNailBaseY: 25.8125,
  },
};

const SVG_NS = 'http://www.w3.org/2000/svg';

function resolveVpfLine(frameKey) {
  return VPF_FRAME_PRESETS[frameKey] || VPF_FRAME_PRESETS['heritage-vpf'];
}

/** Frame preset + manual rail-count override (Rails → Rail count). */
function resolveEffectiveVpfLine(frameKey, railCount) {
  const base = resolveVpfLine(frameKey);
  const count =
    railCount != null && railCount !== '' ? Number(railCount) : base.railCount;
  if (count >= 3) {
    return {
      ...base,
      railCount: 3,
      showMiddle: true,
      bottomLayout: 'legacy',
    };
  }
  return {
    ...base,
    railCount: 2,
    showMiddle: false,
    bottomLayout: 'heritage',
  };
}

/** @deprecated alias */
const VPF_PILOT_LINES = VPF_FRAME_PRESETS;

function parseTrimPackage(trim) {
  if (!trim || trim === MATERIAL.NONE) return { tier: 'none', material: null };
  if (trim === MATERIAL.CEDAR) return { tier: '1t', material: MATERIAL.CEDAR };
  if (trim === MATERIAL.PT) return { tier: '1t', material: MATERIAL.PT };
  const [material, tier] = String(trim).split('-');
  if (
    (material === MATERIAL.CEDAR || material === MATERIAL.PT) &&
    (tier === '1t' || tier === '2t' || tier === '3t')
  ) {
    return { tier, material };
  }
  return { tier: 'none', material: null };
}

/** User rail-cap toggle (`on` / `off`) — independent of frame preset defaults. */
function resolveRailCapEnabled(state, line) {
  if (state && state.railCap === 'on') return true;
  if (state && state.railCap === 'off') return false;
  return line ? Boolean(line.showCap) : false;
}

function resolveRailCapMaterial({ rails, trim, capMode }) {
  const mode = capMode || RAIL_CAP_MODE.AUTO;
  if (mode === RAIL_CAP_MODE.CEDAR) return MATERIAL.CEDAR;
  if (mode === RAIL_CAP_MODE.PT) return MATERIAL.PT;
  if (mode === RAIL_CAP_MODE.MATCH_RAILS) {
    return rails === MATERIAL.PT ? MATERIAL.PT : MATERIAL.CEDAR;
  }
  const { material } = parseTrimPackage(trim);
  if (material) return material;
  return rails === MATERIAL.PT ? MATERIAL.PT : MATERIAL.CEDAR;
}

function getMaterialWarnings({ rails, trim, capMode, side }) {
  const warnings = [];
  const { material: trimMat } = parseTrimPackage(trim);
  if (!trimMat) return warnings;
  if (rails !== MATERIAL.PT || trimMat !== MATERIAL.CEDAR) return warnings;

  const cap = resolveRailCapMaterial({ rails, trim, capMode });

  const capFollowsTrim =
    capMode === RAIL_CAP_MODE.AUTO || cap === MATERIAL.CEDAR;

  if (capFollowsTrim) {
    warnings.push({
      id: 'cap-follows-trim',
      title: 'PT rails + cedar trim',
      message:
        'Rail cap follows cedar trim (default). Front: cap and trim match cedar; PT rails stay brown and will not match the trim boards. Back: you mostly see PT rails and posts — cedar cap may peek at the top only.',
    });
  } else {
    warnings.push({
      id: 'cap-follows-rails',
      title: 'PT rails + cedar trim',
      message:
        'Rail cap matches PT rails. Front: cap and rails match, but the cap will not match cedar trim on the pickets. Back: frame reads consistent PT; cedar trim is hidden behind the rails.',
    });
  }

  if (side === 'back' && capFollowsTrim) {
    warnings.push({
      id: 'back-view-trim-cap',
      title: 'Why the back looks different',
      message:
        'With cap on trim, the back is mostly PT frame. That is the tradeoff for a cedar cap and trim package on the front.',
    });
  }
  return warnings;
}

function byId(root, id) {
  return root.querySelector(`#${id}`);
}

function applyFrameMaterial(root, rails, railsUi, railCount = 2) {
  const isCedar = rails === MATERIAL.CEDAR;
  const isPtAppearance = railsUi === 'pt-appearance';
  const isPtIncised = rails === MATERIAL.PT && !isPtAppearance;

  for (const [id, show] of [
    ['fill-top-rail-cedar', isCedar],
    ['fill-top-rail-pt-appearance', isPtAppearance],
    ['fill-top-rail-pt-incised', isPtIncised],
    ['fill-middle-rail-cedar', isCedar],
    ['fill-middle-rail-pt-appearance', isPtAppearance],
    ['fill-middle-rail-pt-incised', isPtIncised],
    ['fill-bottom-rail-cedar', isCedar],
    ['fill-bottom-rail-pt-appearance', isPtAppearance],
    ['fill-bottom-rail-pt-incised', isPtIncised],
    ['fill-bottom-rail-legacy-cedar', isCedar],
    ['fill-bottom-rail-legacy-pt-appearance', isPtAppearance],
    ['fill-bottom-rail-legacy-pt-incised', isPtIncised],
    ['fill-top-rail-pt', isPtIncised],
    ['fill-bottom-rail-pt', isPtIncised],
  ]) {
    const el = byId(root, id);
    if (el) el.style.display = show ? '' : 'none';
  }

  root.querySelectorAll('[data-frame-material]').forEach((group) => {
    const mat = group.getAttribute('data-frame-material');
    const ptStyle = group.getAttribute('data-frame-pt-style');
    let show = false;
    if (mat === MATERIAL.CEDAR) show = isCedar;
    else if (ptStyle === 'appearance') show = isPtAppearance;
    else if (ptStyle === 'incised') show = isPtIncised;
    group.style.display = show ? '' : 'none';
  });
}

function applyRailLayout(root, railCount = 2, frameKey = 'heritage-vpf', state) {
  applyVpfLine(root, frameKey, railCount, state);
}

function ensurePicketClip(svgRoot) {
  const svg = svgRoot.ownerSVGElement || svgRoot;
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.insertBefore(defs, svg.firstElementChild);
  }
  let clip = defs.querySelector('#picket-field-clip-dynamic');
  if (!clip) {
    clip = document.createElementNS(SVG_NS, 'clipPath');
    clip.id = 'picket-field-clip-dynamic';
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.id = 'picket-field-clip-rect';
    clip.appendChild(rect);
    defs.appendChild(clip);
  }
  return clip.querySelector('rect');
}

function forEachNailGroup(root, fn) {
  root.querySelectorAll('.picket-nails, #Picket-Nails').forEach(fn);
}

function applyPicketSpacing(root, spacingId) {
  const pickets = byId(root, 'Picket-Groups');
  if (!pickets) return;
  const fill =
    pickets.getAttribute('data-active-fill') ||
    pickets.getAttribute('data-default-fill') ||
    'standard';
  applyPicketFill(root, fill, spacingId);
}

function applyPicketFill(root, fillId, spacingId) {
  const pickets = byId(root, 'Picket-Groups');
  if (!pickets) return;
  const fill = fillId || pickets.getAttribute('data-default-fill') || 'standard';
  const spacing = spacingId || pickets.getAttribute('data-default-spacing') || '1-16-privacy';
  pickets.querySelectorAll('.picket-fill-layer, .picket-spacing-layer').forEach((layer) => {
    const layerFill = layer.dataset.picketFill || 'standard';
    if (layerFill !== fill) {
      layer.style.display = 'none';
      return;
    }
    if (layerFill === 'standard') {
      layer.style.display = layer.dataset.picketSpacing === spacing ? '' : 'none';
    } else {
      layer.style.display = '';
    }
  });
  pickets.setAttribute('data-active-fill', fill);
  if (fill === 'standard') {
    pickets.setAttribute('data-active-spacing', spacing);
  }
}

function applyPicketClip(root, line) {
  const pickets = byId(root, 'Picket-Groups');
  if (!pickets) return;
  const clipRect = ensurePicketClip(root);
  clipRect.setAttribute('x', '11.3125');
  clipRect.setAttribute('y', String(line.picketTopY));
  clipRect.setAttribute('width', '89.375');
  clipRect.setAttribute('height', String(line.picketBottomY - line.picketTopY));
  pickets.setAttribute('clip-path', 'url(#picket-field-clip-dynamic)');
}

function cacheNailBaselines(root) {
  forEachNailGroup(root, (nails) => {
    if (nails.dataset.baselinesCached === 'true') return;
    nails.querySelectorAll('.picket-nail').forEach((g) => {
      const c = g.querySelector('circle');
      if (c) g.dataset.baseCy = c.getAttribute('cy');
    });
    nails.dataset.baselinesCached = 'true';
  });
}

function applyNailLine(root, line) {
  cacheNailBaselines(root);
  forEachNailGroup(root, (nails) => {
    nails.querySelectorAll('.picket-nail').forEach((g) => {
      const baseCy = Number(g.dataset.baseCy);
      if (!Number.isFinite(baseCy)) return;
      const isTopRow = baseCy < 20;
      const cy = isTopRow ? line.topNailBaseY : baseCy;
      g.querySelectorAll('circle').forEach((c) => c.setAttribute('cy', String(cy)));
    });
  });
}

function setGroupTranslate(el, dy) {
  if (!el) return;
  if (dy) el.setAttribute('transform', `translate(0 ${dy})`);
  else el.removeAttribute('transform');
}

/** Apply VPF sub-line rail geometry on the shared Heritage assembly. */
function applyVpfLine(root, fenceLine, railCount, state) {
  const line = resolveEffectiveVpfLine(fenceLine, railCount);
  const dy = line.topRailDy || 0;

  const capShell = byId(root, 'shell-cap-ref');
  const capFill = byId(root, 'fill-cap');
  const showRailCap = state ? resolveRailCapEnabled(state, line) : Boolean(line.showCap);
  if (capShell) capShell.style.display = showRailCap ? '' : 'none';
  if (capFill) capFill.style.display = showRailCap ? '' : 'none';

  setGroupTranslate(byId(root, 'Top-Rail-Group'), dy);
  setGroupTranslate(byId(root, 'Top-Trim-Group'), dy);

  const middle = byId(root, 'Middle-Rail-Group');
  const bottomHeritage = byId(root, 'Bottom-Rail-Group');
  const bottomLegacy = byId(root, 'Bottom-Rail-Legacy-Group');
  if (middle) middle.style.display = line.showMiddle ? '' : 'none';
  if (bottomHeritage) bottomHeritage.style.display = line.bottomLayout === 'heritage' ? '' : 'none';
  if (bottomLegacy) bottomLegacy.style.display = line.bottomLayout === 'legacy' ? '' : 'none';

  applyPicketClip(root, line);
  applyNailLine(root, line);

  const railGroups = byId(root, 'Rail-Groups');
  if (railGroups) {
    railGroups.setAttribute('data-vpf-preset', line.preset);
    railGroups.setAttribute('data-rail-count', String(line.railCount));
    railGroups.setAttribute('data-fence-line', line.id);
  }
  const asmRoot = root.id?.startsWith('asm-') ? root : root.querySelector('[id^="asm-"]');
  if (asmRoot) asmRoot.setAttribute('data-fence-line', line.id);
}

function applyPostsMaterial(root, state) {
  const ui = state.postsUi || state.posts || 'pt-incised';
  const isCedar = ui === MATERIAL.CEDAR;
  const isPtAppearance = ui === 'pt-appearance';
  const isPtIncised = !isCedar && !isPtAppearance;

  for (const side of ['left', 'right']) {
    for (const [id, show] of [
      [`fill-${side}-post-cedar`, isCedar],
      [`fill-${side}-post-pt-appearance`, isPtAppearance],
      [`fill-${side}-post-pt-incised`, isPtIncised],
    ]) {
      const el = byId(root, id);
      if (el) el.style.display = show ? '' : 'none';
    }
  }

  root.querySelectorAll('[data-post-material]').forEach((group) => {
    const mat = group.getAttribute('data-post-material');
    const ptStyle = group.getAttribute('data-post-pt-style');
    let show = false;
    if (mat === MATERIAL.CEDAR) show = isCedar;
    else if (ptStyle === 'appearance') show = isPtAppearance;
    else if (ptStyle === 'incised') show = isPtIncised;
    group.style.display = show ? '' : 'none';
  });
}

/** Stack composer — posts, rails, cap material slots on merged sym layers. */
function applyStackMaterials(root, state, line) {
  applyPostsMaterial(root, state);
  applyFrameMaterial(
    root,
    state.rails,
    state.railsUi || state.rails,
    line?.railCount ?? state.railCount ?? 2
  );
  const showRailCap = resolveRailCapEnabled(state, line);
  const cap = showRailCap
    ? resolveRailCapMaterial({
        rails: state.rails,
        trim: state.trim,
        capMode: state.capMode,
      })
    : MATERIAL.NONE;
  applyRailCap(root, cap, state);
}

function resolveMaterialUi(state) {
  const ui = state.railsUi || state.postsUi || state.rails || state.posts || 'pt-incised';
  return {
    ui,
    isCedar: ui === MATERIAL.CEDAR,
    isPtAppearance: ui === 'pt-appearance',
    isPtIncised: ui !== MATERIAL.CEDAR && ui !== 'pt-appearance',
  };
}

/** HF horizontal frame — posts + board/rail fills share material slots. */
function applyHfFrameMaterials(root, state) {
  applyPostsMaterial(root, state);
  const { isCedar, isPtAppearance, isPtIncised } = resolveMaterialUi({
    railsUi: state.railsUi,
    rails: state.rails,
  });

  root.querySelectorAll('[data-hf-material]').forEach((group) => {
    const mat = group.getAttribute('data-hf-material');
    const ptStyle = group.getAttribute('data-hf-pt-style');
    let show = false;
    if (mat === MATERIAL.CEDAR) show = isCedar;
    else if (ptStyle === 'appearance') show = isPtAppearance;
    else if (ptStyle === 'incised') show = isPtIncised;
    group.style.display = show ? '' : 'none';
  });
}

function detectPilotMode(svgRoot, state) {
  if (state.pilotMode) return state.pilotMode;
  if (svgRoot.querySelector('[data-hf-preset]')) return 'hf-frame';
  return 'vpf-heritage';
}

function isPtAppearanceCap({ trim, capMaterial, railsUi, rails }) {
  if (capMaterial !== MATERIAL.PT) return false;
  const { material: trimMat } = parseTrimPackage(trim);
  if (trimMat === MATERIAL.PT) return true;
  const ui = railsUi || rails;
  return ui === 'pt-appearance';
}

function applyRailCap(root, capMaterial, state) {
  const capSlot = root.querySelector('[data-slot="rail-cap-material"]');
  const cedar = capSlot
    ? capSlot.querySelector('[data-cap-material="cedar"]')
    : byId(root, 'fill-cap-cedar');
  const ptAppearance = capSlot
    ? capSlot.querySelector('[data-cap-material="pt"][data-cap-pt-style="appearance"]')
    : byId(root, 'fill-cap-pt-appearance');
  const ptIncised = capSlot
    ? capSlot.querySelector('[data-cap-material="pt"][data-cap-pt-style="incised"]')
    : byId(root, 'fill-cap-pt-incised');
  const legacyPt = byId(root, 'fill-cap-pt');

  const showCedar = capMaterial === MATERIAL.CEDAR;
  const showPtAppearance = isPtAppearanceCap({
    trim: state.trim,
    capMaterial,
    railsUi: state.railsUi,
    rails: state.rails,
  });
  const showPtIncised = capMaterial === MATERIAL.PT && !showPtAppearance;

  if (cedar) cedar.style.display = showCedar ? '' : 'none';
  if (ptAppearance) ptAppearance.style.display = showPtAppearance ? '' : 'none';
  if (ptIncised) ptIncised.style.display = showPtIncised ? '' : 'none';
  if (legacyPt) legacyPt.style.display = showPtIncised ? '' : 'none';
  if (capSlot) capSlot.setAttribute('data-resolved-cap', capMaterial);
}

function applyTrim(root, state) {
  const group = byId(root, 'Trim-Group');
  if (!group) return;

  const { tier, material } = parseTrimPackage(state.trim);
  const line = resolveEffectiveVpfLine(
    state.framePreset || state.fenceLine || 'heritage-vpf',
    state.railCount
  );
  const hasMiddleRail = Boolean(line.showMiddle);
  const onFront = state.side === 'front';
  const showTop = onFront && (tier === '1t' || tier === '2t' || tier === '3t');
  const showBottom = onFront && (tier === '2t' || tier === '3t');
  /** 3T trim middle board only when Legacy (or other) frame exposes Middle-Rail-Group. */
  const showMiddle = onFront && tier === '3t' && hasMiddleRail;

  group.style.display = showTop || showBottom || showMiddle ? '' : 'none';

  const top = byId(root, 'Top-Trim-Group');
  const bottomHeritage = byId(root, 'Bottom-Trim-Group');
  const bottomLegacy = byId(root, 'Bottom-Trim-Legacy-Group');
  const middle = byId(root, 'Middle-Trim-Group');
  const useLegacyBottom = line.bottomLayout === 'legacy';

  if (top) top.style.display = showTop ? '' : 'none';
  if (middle) middle.style.display = showMiddle ? '' : 'none';
  if (bottomHeritage) {
    bottomHeritage.style.display = showBottom && !useLegacyBottom ? '' : 'none';
  }
  if (bottomLegacy) {
    bottomLegacy.style.display = showBottom && useLegacyBottom ? '' : 'none';
  }

  for (const groupId of [
    'Top-Trim-Group',
    'Middle-Trim-Group',
    'Bottom-Trim-Group',
    'Bottom-Trim-Legacy-Group',
  ]) {
    const trimRoot = byId(root, groupId);
    if (!trimRoot) continue;
    const cedar = trimRoot.querySelector('[data-trim-material="cedar"]');
    const pt = trimRoot.querySelector('[data-trim-material="pt"]');
    if (cedar) cedar.style.display = material === MATERIAL.CEDAR ? '' : 'none';
    if (pt) pt.style.display = material === MATERIAL.PT ? '' : 'none';
  }

  group.setAttribute('data-resolved-tier', tier);
  group.setAttribute('data-resolved-material', material || MATERIAL.NONE);
}

function applySideVisibility(root, side) {
  root.querySelectorAll('.picket-fill-layer, .picket-spacing-layer').forEach((layer) => {
    if (layer.style.display === 'none') return;
    layer.querySelectorAll('.picket-nails, #Picket-Nails').forEach((nails) => {
      nails.style.display = side === 'front' ? '' : 'none';
    });
  });
  const legacyNails = byId(root, 'Picket-Nails');
  if (legacyNails && !legacyNails.closest('.picket-spacing-layer')) {
    legacyNails.style.display = side === 'front' ? '' : 'none';
  }
  root.querySelectorAll('.trim-nails, [data-slot="trim-nails"]').forEach((nails) => {
    if (nails.closest('[data-trim-tier]')?.style.display === 'none') return;
    nails.style.display = side === 'front' ? '' : 'none';
  });
}

function applyConfiguratorToSvgRoot(svgRoot, state) {
  if (!svgRoot) return;
  const mode = detectPilotMode(svgRoot, state);
  if (mode === 'hf-frame') {
    applyHfFrameMaterials(svgRoot, state);
    return;
  }
  const fenceLine = state.framePreset || state.fenceLine || 'heritage-vpf';
  const line = resolveEffectiveVpfLine(fenceLine, state.railCount);
  const showRailCap = resolveRailCapEnabled(state, line);
  const cap = showRailCap ? resolveRailCapMaterial(state) : MATERIAL.NONE;
  applyPostsMaterial(svgRoot, state);
  applyVpfLine(svgRoot, fenceLine, state.railCount, state);
  applyFrameMaterial(svgRoot, state.rails, state.railsUi || state.rails, line.railCount);
  if (showRailCap) {
    applyRailCap(svgRoot, cap, state);
  }
  applyTrim(svgRoot, state);
  applyPicketFill(svgRoot, state.picketFill, state.picketSpacing);
  applySideVisibility(svgRoot, state.side);
  const capSlot = svgRoot.querySelector('[data-slot="rail-cap-material"]');
  if (capSlot) capSlot.setAttribute('data-resolved-cap', showRailCap ? cap : MATERIAL.NONE);
}

function applyConfiguratorToSvg(doc, state) {
  if (!doc) return;
  const svg = doc.getElementById('preview-host')?.querySelector('svg');
  if (!svg) return;
  applyConfiguratorToSvgRoot(svg, state);
}

function formatTrimLabel(trim) {
  const { tier, material } = parseTrimPackage(trim);
  if (tier === 'none') return 'none';
  const mat = material === MATERIAL.PT ? 'PT' : 'cedar';
  return `${mat} ${tier.toUpperCase()}`;
}

function renderWarnings(container, state) {
  if (!container) return;
  const warnings = getMaterialWarnings(state);
  container.innerHTML = '';
  if (!warnings.length) {
    container.hidden = true;
    return;
  }
  container.hidden = false;
  for (const w of warnings) {
    const el = document.createElement('div');
    el.className = 'warn-card';
    el.innerHTML = `<strong>${w.title}</strong><p>${w.message}</p>`;
    container.appendChild(el);
  }
}

window.HeritageConfigurator = {
  MATERIAL,
  RAIL_CAP_MODE,
  STAIN,
  VPF_FRAME_PRESETS,
  VPF_PILOT_LINES,
  resolveVpfLine,
  resolveEffectiveVpfLine,
  parseTrimPackage,
  resolveRailCapEnabled,
  resolveRailCapMaterial,
  getMaterialWarnings,
  applyConfiguratorToSvg,
  applyConfiguratorToSvgRoot,
  applyRailCap,
  applyStackMaterials,
  applyHfFrameMaterials,
  applyVpfLine,
  detectPilotMode,
  formatTrimLabel,
  renderWarnings,
};
