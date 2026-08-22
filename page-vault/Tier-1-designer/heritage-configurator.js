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
  /** Terracotta mid — sync with scripts/lib/cedar-stains.js (street ref ~#cc8254). */
  cedar: '#c88254',
  cedarTrim: '#c88254',
  cedarRail: '#c88254',
  pt: '#6c4834',
  /** Rails + cap when whole-fence PT stain — slightly darker / redder than picket+trim tint. */
  ptRail: '#573026',
  ptTrim: '#755038',
};

/**
 * Si View HOA face — terracotta family with readable contrast.
 * Pickets lighter; rails/trim/posts same mid-dark (posts no longer near-black).
 */
const SI_VIEW_FACE = {
  picket: '#b06840',
  rail: '#8a4e2c',
  trim: '#8a4e2c',
  post: '#8a4e2c',
  cap: '#8a4e2c',
};

/**
 * Si View only — board edges. Use non-scaling stroke so lines stay visible
 * at phone fit (~1 px/in); inch stroke-widths vanish at that zoom.
 */
const SI_VIEW_OUTLINE = {
  color: '#0c0a08',
  width: '1.25',
  nonScaling: true,
};

/**
 * Fence height above grade — art is authored at 6′; shorter heights cut from the top
 * (posts clip/shorten at grade, top hardware translates, pickets clip). See heightDy.
 */
const FENCE_HEIGHT_DY_IN = {
  '6ft': 0,
  '5ft': 12,
  '4ft': 24,
};

/** Panel length — art is authored at 8′ bay; 6′ pulls the right post in (left fixed). */
const PANEL_LENGTH_DX_IN = {
  '8ft': 0,
  '6ft': 24,
};

/** First picket x to hide for 6′ (user pickets 12–16: 11th full through right rip). */
const PANEL_6FT_PICKET_HIDE_X = 74.03125;

const POST_SHELL_TOP_Y = 12;
const POST_SHELL_H = 72;
const RAIL_FIELD_X = 11.3125;
const RAIL_FIELD_W = 89.375;
const RIGHT_POST_X = 100.5;

function resolveFenceHeightDy(fenceHeight) {
  const key = fenceHeight || '6ft';
  return Object.prototype.hasOwnProperty.call(FENCE_HEIGHT_DY_IN, key)
    ? FENCE_HEIGHT_DY_IN[key]
    : 0;
}

function resolvePanelLengthDx(panelLength) {
  const key = panelLength || '8ft';
  return Object.prototype.hasOwnProperty.call(PANEL_LENGTH_DX_IN, key)
    ? PANEL_LENGTH_DX_IN[key]
    : 0;
}

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
  const width = pickets.getAttribute('data-active-width') || pickets.getAttribute('data-default-width') || '5.5';
  applyPicketFill(root, fill, spacingId, width);
}

/** 3.5″ (1x4) / 5.5″ (1x6) toggle — standard fill only (see applyPicketFill's width match). */
function applyPicketWidth(root, widthId) {
  const pickets = byId(root, 'Picket-Groups');
  if (!pickets) return;
  const fill =
    pickets.getAttribute('data-active-fill') ||
    pickets.getAttribute('data-default-fill') ||
    'standard';
  const spacing =
    pickets.getAttribute('data-active-spacing') ||
    pickets.getAttribute('data-default-spacing') ||
    '1-16-privacy';
  applyPicketFill(root, fill, spacing, widthId);
}

function applyPicketFill(root, fillId, spacingId, widthId) {
  const pickets = byId(root, 'Picket-Groups');
  if (!pickets) return;
  const fill = fillId || pickets.getAttribute('data-default-fill') || 'standard';
  const spacing = spacingId || pickets.getAttribute('data-default-spacing') || '1-16-privacy';
  const width = widthId || pickets.getAttribute('data-active-width') || pickets.getAttribute('data-default-width') || '5.5';
  pickets.querySelectorAll('.picket-fill-layer, .picket-spacing-layer').forEach((layer) => {
    const layerFill = layer.dataset.picketFill || 'standard';
    if (layerFill !== fill) {
      layer.style.display = 'none';
      return;
    }
    if (layerFill === 'standard') {
      /** `data-picket-width-locked` is reserved for a future width-locked standard-fill variant;
       *  today gothic/shadowbox/board-on-board (locked to 5.5″) live in the `else` branch below since
       *  they aren't tagged `data-picket-fill="standard"` — this check is a no-op until one exists. */
      const layerWidth = layer.dataset.picketWidth || '5.5';
      const widthMatches = layer.dataset.picketWidthLocked === 'true' || layerWidth === width;
      layer.style.display = layer.dataset.picketSpacing === spacing && widthMatches ? '' : 'none';
    } else {
      /** Gothic + dual-row fills are 5.5″ privacy layout in v1 — width/spacing toggles have no effect. */
      layer.style.display = '';
    }
  });
  pickets.setAttribute('data-active-fill', fill);
  if (fill === 'standard') {
    pickets.setAttribute('data-active-spacing', spacing);
    pickets.setAttribute('data-active-width', width);
  }
}

function applyPicketClip(root, line) {
  const pickets =
    byId(root, 'Picket-Groups') || root.querySelector('[data-layer-id="pickets"]');
  if (!pickets) return;
  const clipRect = ensurePicketClip(root);
  const fieldW = line.picketFieldW != null ? line.picketFieldW : RAIL_FIELD_W;
  clipRect.setAttribute('x', String(RAIL_FIELD_X));
  clipRect.setAttribute('y', String(line.picketTopY));
  clipRect.setAttribute('width', String(fieldW));
  clipRect.setAttribute('height', String(line.picketBottomY - line.picketTopY));
  pickets.setAttribute('clip-path', 'url(#picket-field-clip-dynamic)');
}

function ensurePostHeightClip(svgRoot) {
  const svg = svgRoot.ownerSVGElement || svgRoot;
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.insertBefore(defs, svg.firstElementChild);
  }
  let clip = defs.querySelector('#post-height-clip-dynamic');
  if (!clip) {
    clip = document.createElementNS(SVG_NS, 'clipPath');
    clip.id = 'post-height-clip-dynamic';
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.id = 'post-height-clip-rect';
    clip.appendChild(rect);
    defs.appendChild(clip);
  }
  return clip.querySelector('rect');
}

/** Clip posts from the top so bottoms stay on grade (no squash). */
function applyPostHeightClip(root, heightDy) {
  const posts = byId(root, 'Post-Groups');
  if (!posts) return;
  if (!heightDy) {
    posts.removeAttribute('clip-path');
    return;
  }
  const clipRect = ensurePostHeightClip(root);
  clipRect.setAttribute('x', '0');
  clipRect.setAttribute('y', String(POST_SHELL_TOP_Y + heightDy));
  clipRect.setAttribute('width', '112');
  clipRect.setAttribute('height', String(POST_SHELL_H - heightDy));
  posts.setAttribute('clip-path', 'url(#post-height-clip-dynamic)');
}

function ensurePanelLengthClip(svgRoot) {
  const svg = svgRoot.ownerSVGElement || svgRoot;
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS(SVG_NS, 'defs');
    svg.insertBefore(defs, svg.firstElementChild);
  }
  let clip = defs.querySelector('#panel-length-clip-dynamic');
  if (!clip) {
    clip = document.createElementNS(SVG_NS, 'clipPath');
    clip.id = 'panel-length-clip-dynamic';
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.id = 'panel-length-clip-rect';
    clip.appendChild(rect);
    defs.appendChild(clip);
  }
  return clip.querySelector('rect');
}

/**
 * 6′ panel: drop full pickets from #12 on, but keep the right rip-cut board and
 * slide it left so it meets the new right post (fills the blank gap).
 */
function applyPanelLengthPicketVisibility(root, panelDx) {
  const pickets =
    byId(root, 'Picket-Groups') || root.querySelector('[data-layer-id="pickets"]');
  if (!pickets) return;

  const rightCuts = pickets.querySelectorAll('[data-picket-cut="right"]');
  const rightRipBaseXs = new Set();
  rightCuts.forEach((el) => {
    el.dataset.panelRightRip = 'true';
    const x = Number(el.getAttribute('x'));
    if (Number.isFinite(x)) rightRipBaseXs.add(x);
    let sib = el.nextElementSibling;
    while (
      sib &&
      !sib.hasAttribute('data-picket-cut') &&
      sib.getAttribute('data-picket-row-shell') !== 'true'
    ) {
      sib.dataset.panelRightRip = 'true';
      const sx = Number(sib.getAttribute('x'));
      if (Number.isFinite(sx)) rightRipBaseXs.add(sx);
      sib = sib.nextElementSibling;
    }
  });

  const isRightRipEl = (el) => {
    if (el.dataset.panelRightRip === 'true') return true;
    if (el.getAttribute('data-picket-cut') === 'right') return true;
    const x = Number(el.dataset.baseX != null ? el.dataset.baseX : el.getAttribute('x'));
    if (!Number.isFinite(x)) return false;
    for (const rx of rightRipBaseXs) {
      if (Math.abs(x - rx) < 0.01) return true;
    }
    return false;
  };

  pickets.querySelectorAll('rect, path').forEach((el) => {
    if (el.getAttribute('data-picket-row-shell') === 'true') {
      if (panelDx) {
        if (!el.dataset.baseWidth) {
          el.dataset.baseWidth = el.getAttribute('width') || String(RAIL_FIELD_W);
        }
        el.setAttribute('width', String(RAIL_FIELD_W - panelDx));
      } else if (el.dataset.baseWidth) {
        el.setAttribute('width', el.dataset.baseWidth);
      }
      return;
    }

    if (el.dataset.baseX == null) {
      const xAttr = el.getAttribute('x');
      if (xAttr != null && Number.isFinite(Number(xAttr))) {
        el.dataset.baseX = xAttr;
      }
    }
    const baseX = el.dataset.baseX != null ? Number(el.dataset.baseX) : NaN;
    const rightRip = isRightRipEl(el);

    if (!panelDx) {
      el.style.display = '';
      if (el.dataset.baseX != null && el.hasAttribute('x')) {
        el.setAttribute('x', el.dataset.baseX);
      }
      if (el.dataset.panelRipMoved === 'true') {
        el.removeAttribute('transform');
        delete el.dataset.panelRipMoved;
      }
      return;
    }

    if (rightRip) {
      el.style.display = '';
      if (el.hasAttribute('x') && Number.isFinite(baseX)) {
        el.setAttribute('x', String(baseX - panelDx));
      } else {
        el.setAttribute('transform', `translate(${-panelDx} 0)`);
        el.dataset.panelRipMoved = 'true';
      }
      return;
    }

    if (Number.isFinite(baseX) && baseX >= PANEL_6FT_PICKET_HIDE_X) {
      el.style.display = 'none';
    } else {
      el.style.display = '';
    }
  });
}

/**
 * Shorten bay from the right (left post fixed). Rails/trim/pickets/cap clip;
 * right post translates inward.
 */
function applyPanelLength(root, state) {
  const panelDx = resolvePanelLengthDx(state && state.panelLength);
  const rightPost = byId(root, 'Right-Post-Group');
  setGroupTranslate(rightPost, 0, -panelDx);

  const clipTargets = [
    byId(root, 'Rail-Groups'),
    byId(root, 'Trim-Group'),
    byId(root, 'shell-cap-ref'),
    byId(root, 'fill-cap'),
  ].filter(Boolean);

  if (!panelDx) {
    clipTargets.forEach((el) => el.removeAttribute('clip-path'));
    applyPanelLengthPicketVisibility(root, 0);
    return;
  }

  const clipRect = ensurePanelLengthClip(root);
  const clipRight = RIGHT_POST_X - panelDx;
  clipRect.setAttribute('x', '0');
  clipRect.setAttribute('y', '0');
  clipRect.setAttribute('width', String(clipRight));
  clipRect.setAttribute('height', '96');
  clipTargets.forEach((el) => {
    el.setAttribute('clip-path', 'url(#panel-length-clip-dynamic)');
  });
  applyPanelLengthPicketVisibility(root, panelDx);
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

function setGroupTranslate(el, dy, dx = 0) {
  if (!el) return;
  if (dy || dx) el.setAttribute('transform', `translate(${dx} ${dy})`);
  else el.removeAttribute('transform');
}

/** Apply VPF sub-line rail geometry on the shared Heritage assembly. */
function applyVpfLine(root, fenceLine, railCount, state) {
  const line = resolveEffectiveVpfLine(fenceLine, railCount);
  const heightDy = resolveFenceHeightDy(state && state.fenceHeight);
  const panelDx = resolvePanelLengthDx(state && state.panelLength);
  const topDy = (line.topRailDy || 0) + heightDy;
  const clipLine = {
    ...line,
    picketTopY: line.picketTopY + heightDy,
    topNailBaseY: line.topNailBaseY + heightDy,
    picketFieldW: RAIL_FIELD_W - panelDx,
    heightDy,
    panelDx,
  };

  const capShell = byId(root, 'shell-cap-ref');
  const capFill = byId(root, 'fill-cap');
  const showRailCap = state ? resolveRailCapEnabled(state, line) : Boolean(line.showCap);
  if (capShell) capShell.style.display = showRailCap ? '' : 'none';
  if (capFill) capFill.style.display = showRailCap ? '' : 'none';

  setGroupTranslate(capShell, heightDy);
  setGroupTranslate(capFill, heightDy);
  setGroupTranslate(byId(root, 'Top-Rail-Group'), topDy);
  setGroupTranslate(byId(root, 'Top-Trim-Group'), topDy);
  setGroupTranslate(byId(root, 'Middle-Rail-Group'), heightDy);
  setGroupTranslate(byId(root, 'Middle-Trim-Group'), heightDy);

  const middle = byId(root, 'Middle-Rail-Group');
  const bottomHeritage = byId(root, 'Bottom-Rail-Group');
  const bottomLegacy = byId(root, 'Bottom-Rail-Legacy-Group');
  if (middle) middle.style.display = line.showMiddle ? '' : 'none';
  if (bottomHeritage) bottomHeritage.style.display = line.bottomLayout === 'heritage' ? '' : 'none';
  if (bottomLegacy) bottomLegacy.style.display = line.bottomLayout === 'legacy' ? '' : 'none';

  applyPostHeightClip(root, heightDy);
  applyPicketClip(root, clipLine);
  applyNailLine(root, clipLine);

  const railGroups = byId(root, 'Rail-Groups');
  if (railGroups) {
    railGroups.setAttribute('data-vpf-preset', line.preset);
    railGroups.setAttribute('data-rail-count', String(line.railCount));
    railGroups.setAttribute('data-fence-line', line.id);
    railGroups.setAttribute('data-fence-height-dy', String(heightDy));
  }
  const asmRoot = root.id?.startsWith('asm-') ? root : root.querySelector('[id^="asm-"]');
  if (asmRoot) {
    asmRoot.setAttribute('data-fence-line', line.id);
    asmRoot.setAttribute('data-fence-height-dy', String(heightDy));
  }
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
  applyStain(root, state);
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

/**
 * Horizontal picket fence — same spacing menu as VPF pickets (rotated 90°),
 * baked as toggle groups (see HORIZONTAL_PICKET_SPACING_* in hf-frame-geometry.js
 * / build-hf-frames.js). No-op if the loaded assembly has no picket-spacing groups.
 */
function applyHfPicketSpacing(root, state) {
  const groups = root.querySelectorAll('[data-hf-picket-spacing]');
  if (!groups.length) return;
  const active = state.picketSpacing || '1-16-privacy';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-hf-picket-spacing') === active ? '' : 'none';
  });
}

/**
 * Active HF scope — unified board-fence assemblies nest post/board toggles under
 * `data-hf-board-stack` (butt = Rancher, split = Homesteader). Single-preset
 * assemblies (horizontal picket, legacy compare pages) have no stack groups.
 */
function hfActiveScope(root, state) {
  const asmRoot = root.querySelector('[data-hf-preset]') || root;
  let scope = asmRoot;

  const stackGroups = asmRoot.querySelectorAll('[data-hf-board-stack]');
  if (stackGroups.length >= 2) {
    const active =
      state.boardStack || asmRoot.getAttribute('data-board-stack') || 'split';
    scope =
      Array.from(stackGroups).find((g) => g.getAttribute('data-hf-board-stack') === active) ||
      scope;
  }

  const countGroups = scope.querySelectorAll('[data-hf-board-count]');
  if (countGroups.length >= 2) {
    const active = String(
      state.boardCount ?? asmRoot.getAttribute('data-board-count') ?? '2'
    );
    scope =
      Array.from(countGroups).find((g) => g.getAttribute('data-hf-board-count') === active) ||
      scope;
  } else if (countGroups.length === 1) {
    scope = countGroups[0];
  }

  return scope;
}

/**
 * HF board-stack runtime toggle (legacy butt / split) — only when both are baked.
 */
function applyHfBoardStack(root, state) {
  const asmRoot = root.querySelector('[data-hf-preset]') || root;
  const groups = asmRoot.querySelectorAll('[data-hf-board-stack]');
  if (groups.length < 2) return;
  const active =
    state.boardStack || asmRoot.getAttribute('data-board-stack') || 'split';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-hf-board-stack') === active ? '' : 'none';
  });
}

/**
 * HF board-count runtime toggle (2 / 3 / 4 rails) — unified board-fence assembly.
 */
function applyHfBoardCount(root, state) {
  const asmRoot = root.querySelector('[data-hf-preset]') || root;
  let stackScope = asmRoot;
  const stackGroups = asmRoot.querySelectorAll('[data-hf-board-stack]');
  if (stackGroups.length >= 2) {
    const stackActive =
      state.boardStack || asmRoot.getAttribute('data-board-stack') || 'split';
    stackScope =
      Array.from(stackGroups).find(
        (g) => g.getAttribute('data-hf-board-stack') === stackActive
      ) || stackScope;
  }

  const groups = stackScope.querySelectorAll('[data-hf-board-count]');
  if (groups.length < 2) return;
  const active = String(state.boardCount ?? asmRoot.getAttribute('data-board-count') ?? '2');
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-hf-board-count') === active ? '' : 'none';
  });
}

/**
 * HF post-size runtime toggle (4×4 / 4×6) — baked as `data-hf-post-size`
 * groups bundling posts + infill + splice lines for that size (see
 * hfPostSizeVariantsMarkup in build-hf-frames.js). No-op if the loaded
 * assembly only has one size baked in — no-op when groups.length < 2.
 */
function applyHfPostSize(root, state) {
  const scope = hfActiveScope(root, state);
  const groups = scope.querySelectorAll('[data-hf-post-size]');
  if (groups.length < 2) return;
  const asmRoot = root.querySelector('[data-hf-preset]') || root;
  const active =
    state.postSize || asmRoot.getAttribute('data-post-size') || '4x4';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-hf-post-size') === active ? '' : 'none';
  });
}

/**
 * HF board-size runtime toggle (2×4 / 2×6) — baked as `data-hf-board-size`
 * groups bundling board infill + splice lines for that size (see
 * hfBoardSizeVariantsMarkup in build-hf-frames.js). No-op if the loaded
 * assembly only has one size baked in — no-op when groups.length < 2.
 */
function applyHfBoardSize(root, state) {
  const scope = hfActiveScope(root, state);
  const groups = scope.querySelectorAll('[data-hf-board-size]');
  if (groups.length < 2) return;
  const asmRoot = root.querySelector('[data-hf-preset]') || root;
  const active =
    state.boardSize || asmRoot.getAttribute('data-board-size') || '2x4';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-hf-board-size') === active ? '' : 'none';
  });
}

/** HF horizontal frame — posts + board fills share the Boards material slot; pickets stay cedar. */
function applyHfFrameMaterials(root, state) {
  applyHfBoardStack(root, state);
  applyHfBoardCount(root, state);
  applyHfPostSize(root, state);
  applyHfBoardSize(root, state);
  applyPostsMaterial(root, state);
  const { isCedar, isPtAppearance, isPtIncised } = resolveMaterialUi({
    railsUi: state.railsUi,
    rails: state.rails,
  });
  const isPicketAssembly = root.getAttribute('data-hf-kind') === 'picket';

  root.querySelectorAll('[data-hf-material]').forEach((group) => {
    const mat = group.getAttribute('data-hf-material');
    const ptStyle = group.getAttribute('data-hf-pt-style');
    let show = false;
    /** Horizontal picket infill = same flat cedar face as VPF pickets, not board/rail PT texture. */
    if (isPicketAssembly && group.closest('[data-hf-kind="picket"]')) {
      show = mat === MATERIAL.CEDAR;
    } else if (mat === MATERIAL.CEDAR) show = isCedar;
    else if (ptStyle === 'appearance') show = isPtAppearance;
    else if (ptStyle === 'incised') show = isPtIncised;
    group.style.display = show ? '' : 'none';
  });

  applyHfPicketSpacing(root, state);
}

/**
 * Fabric welded-wire grid runtime toggle — baked as `data-fabric-wire-grid`
 * groups (see build-fabric-frames.js / welded-wire-mesh.js).
 */
function applyFabricWireGrid(root, state) {
  const groups = root.querySelectorAll('[data-fabric-wire-grid]');
  if (!groups.length) return;
  const active = state.fabricWireGrid || 'grid-4';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-fabric-wire-grid') === active ? '' : 'none';
  });
}

function applyFabricWireGauge(root, state) {
  const groups = root.querySelectorAll('[data-fabric-wire-gauge]');
  if (!groups.length) return;
  const active = state.fabricWireGauge || '14ga';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-fabric-wire-gauge') === active ? '' : 'none';
  });
}

function applyFabricWireFinish(root, state) {
  const groups = root.querySelectorAll('[data-fabric-wire-finish]');
  if (!groups.length) return;
  const active = state.fabricWireFinish || 'galvanized';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-fabric-wire-finish') === active ? '' : 'none';
  });
}

function applyFabricLatticeGrid(root, state) {
  const groups = root.querySelectorAll('[data-fabric-lattice-grid]');
  if (!groups.length) return;
  const active = state.fabricLatticeGrid || 'grid-2';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-fabric-lattice-grid') === active ? '' : 'none';
  });
}

function applyFabricLatticeMaterial(root, state) {
  const groups = root.querySelectorAll('[data-fabric-lattice-material]');
  if (!groups.length) return;
  const active = state.fabricLatticeMaterial || 'cedar';
  groups.forEach((g) => {
    g.style.display = g.getAttribute('data-fabric-lattice-material') === active ? '' : 'none';
  });
}

/** Fabric trim sandwich — 1×4 strips hide fabric-to-rail connections (2T = top + bottom). */
function applyFabricTrim(root, state) {
  const group = byId(root, 'Trim-Group');
  if (!group) return;

  const { tier, material } = parseTrimPackage(state.trim);
  const showTop = tier === '1t' || tier === '2t' || tier === '3t';
  const showBottom = tier === '2t' || tier === '3t';

  group.style.display = showTop || showBottom ? '' : 'none';

  const top = byId(root, 'Top-Trim-Group');
  const bottom = byId(root, 'Bottom-Trim-Group');
  if (top) top.style.display = showTop ? '' : 'none';
  if (bottom) bottom.style.display = showBottom ? '' : 'none';

  for (const groupId of ['Top-Trim-Group', 'Bottom-Trim-Group']) {
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

/** Fabric frame — posts + 2×4 rails share the Rails material slot; infill + trim toggles separately. */
function applyFabricFrameMaterials(root, state) {
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

  const fabricEl = root.getAttribute('data-fabric-kind') ? root : root.querySelector('[data-fabric-kind="welded-wire"], [data-fabric-kind="lattice"], [data-fabric-preset]');
  const fabricKind = fabricEl ? (fabricEl.getAttribute('data-fabric-kind') || fabricEl.getAttribute('data-fabric-preset')) : null;
  if (fabricKind === 'welded-wire') {
    applyFabricWireGrid(root, state);
    applyFabricWireGauge(root, state);
    applyFabricWireFinish(root, state);
  } else if (fabricKind === 'lattice') {
    applyFabricLatticeGrid(root, state);
    applyFabricLatticeMaterial(root, state);
  }
  applyFabricTrim(root, state);
  applyStain(root, state);

  // Front vs Back Z-layering directive:
  // Front side: Fabric infill sits OVER posts & rails, but UNDER front trim package.
  // Back side: Fabric infill sits BEHIND posts & rails (covered by posts & rails).
  const isBack = state.side === 'back';
  const infillVariants = root.querySelector('[data-fabric-kind$="-variants"]');
  const postsGroup = root.querySelector('#Post-Groups');
  const trimGroup = root.querySelector('#Trim-Group');
  if (infillVariants && postsGroup) {
    const parent = infillVariants.parentNode;
    if (isBack) {
      parent.insertBefore(infillVariants, postsGroup);
    } else if (trimGroup) {
      parent.insertBefore(infillVariants, trimGroup);
    }
  }
}

function detectPilotMode(svgRoot, state) {
  if (state && state.pilotMode) return state.pilotMode;
  if (typeof PilotConfiguratorRegistry !== 'undefined' && state) {
    const s = PilotConfiguratorRegistry.getStyle(state.styleId || state.currentStyleId);
    if (s && s.mode) return s.mode;
  }
  if (svgRoot.querySelector('[data-fabric-preset], [data-fabric-kind]')) return 'fabric-frame';
  if (svgRoot.querySelector('[data-hf-preset], [data-hf-kind]')) return 'hf-frame';
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

/**
 * Stain — opaque solid base under grain/texture (not multiply overlay).
 *
 * Original baked fills differ per member (PT posts dark, cedar pickets mid, …).
 * A translucent multiply on top cannot unify them. Instead we:
 *   1. Recolor solid fills to the target (blocking original color)
 *   2. Paint an opaque <rect data-stain-base> behind grain (url() patterns stay)
 * Grain/stroke patterns remain visible on top; no mix-blend multiply.
 */
const STAIN_FRAME_TARGET = {
  'pt-brown': STAIN.pt,
  'cedar-natural': STAIN.cedar,
};
const STAIN_PICKET_TARGET = {
  'cedar-natural': STAIN.cedar,
  'pt-brown': STAIN.pt,
};
const STAIN_TRIM_TARGET = {
  'cedar-trim': STAIN.cedarTrim,
  'pt-trim': STAIN.ptTrim,
  'cedar-natural': STAIN.cedar,
  'pt-brown': STAIN.pt,
};

/**
 * Resolve stain tints for frame / pickets / trim / cap.
 * Whole-fence rule: when trim is follow-rail-trim (default) or as-material,
 * inherit frame stain, else picket stain. If frame is as-material but pickets
 * are stained, carry picket tint onto posts, rails, and cap too.
 * Si View: cedar-natural uses a stepped terracotta hierarchy for contrast.
 */
function resolveStainColors(state) {
  const picketColor = STAIN_PICKET_TARGET[state.stainPicket] || null;
  let frameColor = STAIN_FRAME_TARGET[state.stainFrame] || null;
  if (!frameColor && picketColor) frameColor = picketColor;

  let trimColor = STAIN_TRIM_TARGET[state.stainTrim] || null;
  const trimFollow =
    !state.stainTrim ||
    state.stainTrim === 'follow-rail-trim' ||
    state.stainTrim === 'as-material';
  if (!trimColor && trimFollow) {
    trimColor = frameColor || picketColor;
  }

  const railCapBase = frameColor || picketColor;
  const siView =
    state.communitySlug === 'si-view' &&
    (frameColor === STAIN.cedar || picketColor === STAIN.cedar || trimColor === STAIN.cedar);

  if (siView) {
    return {
      frameColor: SI_VIEW_FACE.post,
      railColor: SI_VIEW_FACE.rail,
      picketColor: SI_VIEW_FACE.picket,
      trimColor: SI_VIEW_FACE.trim,
      capColor: SI_VIEW_FACE.cap,
      outline: SI_VIEW_OUTLINE,
    };
  }

  return {
    frameColor,
    railColor: railCapBase,
    picketColor,
    trimColor,
    capColor: railCapBase,
    outline: null,
  };
}

function clearLegacyStainOverlay(group) {
  group.querySelectorAll(':scope > rect[data-stain-overlay]').forEach((el) => el.remove());
}

function restoreOriginalFills(group) {
  group.querySelectorAll('[data-fill-original]').forEach((el) => {
    el.setAttribute('fill', el.getAttribute('data-fill-original'));
    el.removeAttribute('data-fill-original');
  });
}

function restoreOriginalStrokes(group) {
  group.querySelectorAll('[data-outline-applied]').forEach((el) => {
    const s = el.getAttribute('data-stroke-original');
    const w = el.getAttribute('data-stroke-width-original');
    const ve = el.getAttribute('data-vector-effect-original');
    if (s) el.setAttribute('stroke', s);
    else el.removeAttribute('stroke');
    if (w) el.setAttribute('stroke-width', w);
    else el.removeAttribute('stroke-width');
    if (ve) el.setAttribute('vector-effect', ve);
    else el.removeAttribute('vector-effect');
    el.removeAttribute('data-stroke-original');
    el.removeAttribute('data-stroke-width-original');
    el.removeAttribute('data-vector-effect-original');
    el.removeAttribute('data-outline-applied');
    el.removeAttribute('paint-order');
  });
}

function restoreGrainOverlays(group) {
  group.querySelectorAll('[data-grain-hidden]').forEach((el) => {
    const prev = el.getAttribute('data-display-original');
    if (prev) el.style.display = prev;
    else el.style.removeProperty('display');
    el.removeAttribute('data-display-original');
    el.removeAttribute('data-grain-hidden');
  });
  group.querySelectorAll('[data-grain-faded]').forEach((el) => {
    const prev = el.getAttribute('data-opacity-original');
    if (prev !== null && prev !== '') el.setAttribute('opacity', prev);
    else el.removeAttribute('opacity');
    el.removeAttribute('data-opacity-original');
    el.removeAttribute('data-grain-faded');
  });
}

/** Hide url() grain/texture overlays so solid boards + outlines read as separate pickets. */
function hideGrainOverlays(group) {
  group.querySelectorAll('rect, path, polygon, circle, ellipse').forEach((el) => {
    if (el.hasAttribute('data-stain-base') || el.hasAttribute('data-stain-overlay')) return;
    const fill = el.getAttribute('fill') || '';
    if (!fill.startsWith('url(')) return;
    if (!el.hasAttribute('data-grain-hidden')) {
      el.setAttribute('data-display-original', el.style.display || '');
      el.setAttribute('data-grain-hidden', '1');
    }
    el.style.display = 'none';
  });
}

/** Soften url() grain overlays (e.g. PT post hatch at 50%). */
function fadeGrainOverlays(group, opacity) {
  const op = typeof opacity === 'number' ? opacity : 0.5;
  group.querySelectorAll('rect, path, polygon, circle, ellipse').forEach((el) => {
    if (el.hasAttribute('data-stain-base') || el.hasAttribute('data-stain-overlay')) return;
    if (el.hasAttribute('data-grain-hidden')) return;
    const fill = el.getAttribute('fill') || '';
    if (!fill.startsWith('url(')) return;
    if (!el.hasAttribute('data-grain-faded')) {
      el.setAttribute(
        'data-opacity-original',
        el.getAttribute('opacity') != null ? el.getAttribute('opacity') : ''
      );
      el.setAttribute('data-grain-faded', '1');
    }
    el.setAttribute('opacity', String(op));
  });
}

/** Solid fills + pattern boards that bake color into the tile. Keep url() grain when a solid sibling board exists (pickets). */
function recolorSolidFills(group, color) {
  const els = [...group.querySelectorAll('rect, path, polygon, circle, ellipse')];
  const hasSolidBoard = els.some((el) => {
    if (el.hasAttribute('data-stain-base') || el.hasAttribute('data-stain-overlay')) return false;
    if (el.hasAttribute('data-picket-row-shell')) return false;
    if (el.hasAttribute('data-grain-hidden') || el.style.display === 'none') return false;
    const fill = el.getAttribute('fill') || '';
    return fill && fill !== 'none' && fill !== 'transparent' && !fill.startsWith('url(');
  });
  els.forEach((el) => {
    if (el.hasAttribute('data-stain-base') || el.hasAttribute('data-stain-overlay')) return;
    /* Full picket-field shell — not a board; never stain it (fills gaps). */
    if (el.hasAttribute('data-picket-row-shell')) return;
    if (el.hasAttribute('data-grain-hidden') || el.style.display === 'none') return;
    const fill = el.getAttribute('fill');
    if (!fill || fill === 'none' || fill === 'transparent') return;
    if (fill.startsWith('url(')) {
      /* Stroke-only grain over a board: keep. PT board-in-pattern: replace. */
      if (hasSolidBoard) return;
    }
    if (!el.hasAttribute('data-fill-original')) {
      el.setAttribute('data-fill-original', fill);
    }
    el.setAttribute('fill', color);
  });
}

/** Open picket gaps: clear the field shell so sky/bg shows (not stained cedar). */
function clearPicketRowShells(group) {
  group.querySelectorAll('[data-picket-row-shell]').forEach((el) => {
    if (!el.hasAttribute('data-fill-original')) {
      el.setAttribute('data-fill-original', el.getAttribute('fill') || '#000000');
    }
    el.setAttribute('fill', 'none');
  });
}

/** Thicker black board edges. Outline solid boards and visible grain overlays. */
function applyMemberOutlines(group, outline) {
  if (!outline) {
    restoreOriginalStrokes(group);
    return;
  }
  group.querySelectorAll('rect, path, polygon').forEach((el) => {
    if (el.hasAttribute('data-stain-base') || el.hasAttribute('data-stain-overlay')) return;
    if (el.hasAttribute('data-picket-row-shell')) return;
    if (el.hasAttribute('data-grain-hidden') || el.style.display === 'none') return;
    const fill = el.getAttribute('fill') || '';
    if (!fill || fill === 'none' || fill === 'transparent') return;
    if (!el.hasAttribute('data-outline-applied')) {
      el.setAttribute('data-stroke-original', el.getAttribute('stroke') || '');
      el.setAttribute('data-stroke-width-original', el.getAttribute('stroke-width') || '');
      el.setAttribute(
        'data-vector-effect-original',
        el.getAttribute('vector-effect') || ''
      );
      el.setAttribute('data-outline-applied', '1');
    }
    el.setAttribute('stroke', outline.color);
    el.setAttribute('stroke-width', outline.width);
    el.setAttribute('stroke-linejoin', 'miter');
    el.setAttribute('paint-order', 'fill stroke');
    if (outline.nonScaling) {
      el.setAttribute('vector-effect', 'non-scaling-stroke');
    } else {
      el.removeAttribute('vector-effect');
    }
  });
}

function paintSolidBase(group, color, attempt, outline, opts) {
  clearLegacyStainOverlay(group);
  const existing = group.querySelector(':scope > rect[data-stain-base]');
  const stripGrain = !!(opts && opts.stripGrain);
  if (!color || group.style.display === 'none') {
    if (existing) existing.remove();
    restoreGrainOverlays(group);
    restoreOriginalFills(group);
    restoreOriginalStrokes(group);
    return;
  }
  let box;
  try {
    box = group.getBBox();
  } catch (err) {
    box = null;
  }
  if (!box || !box.width || !box.height) {
    if (existing) existing.style.display = 'none';
    const n = attempt || 0;
    if (n < 3 && typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => paintSolidBase(group, color, n + 1, outline, opts));
    }
    return;
  }
  if (stripGrain) hideGrainOverlays(group);
  else restoreGrainOverlays(group);
  if (opts && opts.clearRowShell) clearPicketRowShells(group);
  recolorSolidFills(group, color);
  if (!stripGrain && opts && typeof opts.fadeGrain === 'number') {
    fadeGrainOverlays(group, opts.fadeGrain);
  }
  applyMemberOutlines(group, outline || null);
  /* Si View outlines: skip full-bbox base — it floods picket gaps with the same
   * face color and kills edge contrast between boards. */
  if (outline) {
    if (existing) existing.remove();
    return;
  }
  const rect = existing || document.createElementNS(SVG_NS, 'rect');
  if (!existing) {
    rect.setAttribute('data-stain-base', 'true');
    rect.setAttribute('pointer-events', 'none');
    group.insertBefore(rect, group.firstChild);
  }
  rect.setAttribute('x', String(box.x));
  rect.setAttribute('y', String(box.y));
  rect.setAttribute('width', String(box.width));
  rect.setAttribute('height', String(box.height));
  rect.setAttribute('fill', color);
  rect.setAttribute('fill-opacity', '1');
  rect.style.mixBlendMode = 'normal';
  rect.style.display = '';
  /* Base sits under grain — do not stroke the base (would double-outline). */
  rect.removeAttribute('stroke');
}

function applyStainToSelector(root, selector, color, outline) {
  root.querySelectorAll(selector).forEach((group) => {
    /* Nested material groups: paint leaf only (avoid stacking). */
    if (group.querySelector(selector)) {
      paintSolidBase(group, null);
      return;
    }
    paintSolidBase(group, color, 0, outline);
  });
}

/**
 * Fallback for rail board slots that have no cedar board art baked in yet
 * (sym-rail-{top,middle,bottom}-heritage.svg only ship pt-incised/pt-appearance
 * fill variants — see data-slot="frame-material"). When no material variant is
 * visible under that slot, the black `shell` base (meant to read as a thin
 * board-edge line under real board art) is left fully exposed instead of a
 * board. Recolor the shell to the resolved rail color so it reads as a plain
 * solid board rather than a black bar until real cedar rail art exists.
 */
function paintOrphanFrameShells(root, color, outline, state) {
  /* No explicit stain (as-material) still needs a face color when the board
   * art is missing — fall back to cedar's natural face so it isn't black. */
  const fallback = color || (state && state.rails === MATERIAL.CEDAR ? STAIN.cedarRail : null);
  if (!fallback) return;
  root.querySelectorAll('[data-slot="frame-material"]').forEach((fillWrap) => {
    const hasVisibleMaterial = Array.from(fillWrap.children).some(
      (child) => child.hasAttribute('data-frame-material') && child.style.display !== 'none'
    );
    if (hasVisibleMaterial) return;
    const shell = fillWrap.previousElementSibling;
    if (!shell) return;
    shell.querySelectorAll('rect, path, polygon').forEach((el) => {
      el.setAttribute('fill', fallback);
      if (outline) {
        el.setAttribute('stroke', outline.color);
        el.setAttribute('stroke-width', outline.width);
        if (outline.nonScaling) el.setAttribute('vector-effect', 'non-scaling-stroke');
        else el.removeAttribute('vector-effect');
      } else {
        el.removeAttribute('stroke');
        el.removeAttribute('stroke-width');
        el.removeAttribute('vector-effect');
      }
    });
  });
}

function applyStain(root, state) {
  if (!root) return;
  const { frameColor, railColor, picketColor, trimColor, capColor, outline } =
    resolveStainColors(state);

  root.querySelectorAll('[data-post-material]').forEach((group) => {
    if (group.querySelector('[data-post-material]')) {
      paintSolidBase(group, null);
      return;
    }
    /* Si View: keep PT hatch but at 50% so solid face + thin outlines read. */
    paintSolidBase(
      group,
      frameColor,
      0,
      outline,
      outline ? { fadeGrain: 0.5 } : null
    );
  });
  applyStainToSelector(root, '[data-frame-material]', railColor || frameColor, outline);
  paintOrphanFrameShells(root, railColor || frameColor, outline, state);
  applyStainToSelector(root, '[data-cap-material]', capColor, outline);

  const picketTargets = [
    ...root.querySelectorAll('.picket-fill-layer, [data-layer-id="pickets"]'),
  ];
  picketTargets.forEach((layer) => {
    if (picketTargets.some((other) => other !== layer && layer.contains(other))) {
      paintSolidBase(layer, null);
      return;
    }
    /* Si View: picket grain 50%; clear field shell so gaps are open (sky), not stained. */
    paintSolidBase(
      layer,
      picketColor,
      0,
      outline,
      outline ? { fadeGrain: 0.5, clearRowShell: true } : null
    );
  });

  applyStainToSelector(root, '[data-trim-material]', trimColor, outline);
}

function applyConfiguratorToSvgRoot(svgRoot, state) {
  if (!svgRoot) return;
  const mode = detectPilotMode(svgRoot, state);
  if (mode === 'hf-frame') {
    applyHfFrameMaterials(svgRoot, state);
    return;
  }
  if (mode === 'fabric-frame') {
    applyFabricFrameMaterials(svgRoot, state);
    return;
  }
  const fenceLine = state.framePreset || state.fenceLine || 'heritage-vpf';
  const line = resolveEffectiveVpfLine(fenceLine, state.railCount);
  const showRailCap = resolveRailCapEnabled(state, line);
  const cap = showRailCap ? resolveRailCapMaterial(state) : MATERIAL.NONE;
  applyPostsMaterial(svgRoot, state);
  applyVpfLine(svgRoot, fenceLine, state.railCount, state);
  applyPanelLength(svgRoot, state);
  applyFrameMaterial(svgRoot, state.rails, state.railsUi || state.rails, line.railCount);
  if (showRailCap) {
    applyRailCap(svgRoot, cap, state);
  }
  applyTrim(svgRoot, state);
  applyPicketFill(svgRoot, state.picketFill, state.picketSpacing, state.picketWidth);
  applySideVisibility(svgRoot, state.side);
  const capSlot = svgRoot.querySelector('[data-slot="rail-cap-material"]');
  if (capSlot) capSlot.setAttribute('data-resolved-cap', showRailCap ? cap : MATERIAL.NONE);
  applyStain(svgRoot, state);
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
  FENCE_HEIGHT_DY_IN,
  PANEL_LENGTH_DX_IN,
  PANEL_6FT_PICKET_HIDE_X,
  VPF_FRAME_PRESETS,
  VPF_PILOT_LINES,
  resolveVpfLine,
  resolveEffectiveVpfLine,
  resolveFenceHeightDy,
  resolvePanelLengthDx,
  parseTrimPackage,
  resolveRailCapEnabled,
  resolveRailCapMaterial,
  getMaterialWarnings,
  applyConfiguratorToSvg,
  applyConfiguratorToSvgRoot,
  applyRailCap,
  applyStackMaterials,
  applyStain,
  applyHfFrameMaterials,
  applyFabricFrameMaterials,
  applyFabricWireGrid,
  applyFabricWireFinish,
  applyFabricLatticeGrid,
  applyFabricLatticeMaterial,
  applyFabricTrim,
  applyVpfLine,
  applyPanelLength,
  applyPicketClip,
  applyPostHeightClip,
  applyPanelLengthPicketVisibility,
  detectPilotMode,
  formatTrimLabel,
  renderWarnings,
};
