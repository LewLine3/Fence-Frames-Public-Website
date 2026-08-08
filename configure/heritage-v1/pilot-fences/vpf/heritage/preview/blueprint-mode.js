/**
 * Blueprint mode — Choice A print-first layout.
 * Top band: General · Posts · Rails
 * Bottom band: Pickets · Trim · Finish
 * All category copy always visible. Continuous multi-panel run in the middle.
 * Editing stays in Configure.
 */
(function initBlueprintMode(global) {
  const TOP_IDS = ['general', 'posts', 'rails'];
  const BOT_IDS = ['pickets', 'trim', 'finish'];
  /**
   * Fallback card order, used only when the loaded catalog is the built-in
   * DEFAULT_COMPONENTS set. A community catalog owns its own card order via
   * `components[]` — see cardIdsForDocuments().
   */
  const DETAIL_IDS = ['general', 'posts', 'rails', 'pickets', 'trim', 'hardware', 'paintStainSeal', 'finishCosts', 'gates', 'communitySpecs'];
  /** Heritage module inches — left post shell ends here; follow-on panels crop after it. */
  const MODULE_W_IN = 112;
  const MODULE_H_IN = 95;
  const LEFT_POST_X_IN = 8;
  const LEFT_POST_W_IN = 3.5;
  const RIGHT_POST_X_IN = 100.5;
  const JOIN_X_IN = LEFT_POST_X_IN + LEFT_POST_W_IN; /* 11.5 — omit duplicated left post */
  /** Distance left-post → right-post; next bay shares the right post. */
  const BAY_STEP_IN = RIGHT_POST_X_IN - LEFT_POST_X_IN; /* 92.5 */
  /** Fixed 3-bay run: middle panel reserved for future incline/rake detail. */
  const RUN_PANEL_COUNT = 3;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const FOOTING_DEPTH_DEFAULT_IN = 24;

  /**
   * Detail Mode "building blocks": each card's image shows only the frame
   * pieces built up through that stage — not a dim/highlight of one full
   * assembly. Background/ground/grass are scenery, not build stages, so
   * they stay visible throughout. `groups: 'all'` means every stage group
   * (i.e. the fully framed fence). `stained` controls whether the CURRENT
   * (customer-picked) stain/paint is shown — General through Hardware always
   * render each material's default/as-built face (posts/rails/pickets/trim
   * in their own natural color+texture) regardless of what's actually
   * selected, so a Si View (or any stained/painted) build doesn't "spoil"
   * the un-stained stages. Only Paint/Stain/Seal and everything after it
   * switches to the real current stain — see buildDetailImage's `stained`
   * branch, which force-clears stain to as-material on the clone for every
   * `stained: false` stage instead of merely skipping a re-apply (the clone
   * is cut from the live canvas, which always shows the real current stain
   * baked in, so skipping isn't enough to get back to default).
   *
   * The live configurator renders each fence piece as its own "stack layer"
   * (post-left/post-right/rail-bottom/rail-top/rail-cap/pickets/trim-*),
   * and the ids on those layers are generated at runtime (e.g.
   * `sc-rail-top-fill`) — they do NOT match the static asset SVG's group
   * ids (`Rail-Groups`, etc). Select by id-prefix / class instead of a
   * fixed id so this survives whichever rail-count/trim-tier combo is active.
   */
  const BUILD_STAGE_GROUPS = ['Post-Groups', 'Rail-Groups', 'Picket-Groups', 'Trim-Group'];
  const BUILD_STAGE_SELECTORS = {
    'Post-Groups': '[id^="sc-post-"]',
    'Rail-Groups': '[id^="sc-rail-"]',
    'Picket-Groups': '[id^="sc-pickets-"], .picket-nails',
    'Trim-Group': '[id^="sc-trim-"], .trim-nails',
  };
  const BUILD_STAGES = {
    general: { groups: 'all', stained: false },
    posts: { groups: ['Post-Groups'], stained: false },
    rails: { groups: ['Post-Groups', 'Rail-Groups'], stained: false },
    pickets: { groups: ['Post-Groups', 'Rail-Groups', 'Picket-Groups'], stained: false },
    trim: { groups: 'all', stained: false },
    hardware: { groups: 'all', stained: false },
    paintStainSeal: { groups: 'all', stained: true },
    finishCosts: { groups: 'all', stained: true },
    gates: { groups: 'all', stained: true },
    communitySpecs: { groups: 'all', stained: true },
  };
  /** Crop the detail-card image tight to the fence itself (post top → grass line) so it lines up flush with the top of its text card, instead of carrying the source SVG's empty sky margin. */
  /* Include posts (y 12→84) + cap/grass margins — avoid clipping fence height. */
  const DETAIL_CROP_TOP_IN = 6;
  const DETAIL_CROP_BOTTOM_IN = 92;
  const DETAIL_CROP_H_IN = DETAIL_CROP_BOTTOM_IN - DETAIL_CROP_TOP_IN;

  const DEFAULT_COMPONENTS = [
    {
      id: 'general',
      label: 'General',
      bullets: ['Height | Panel length', 'Terrain / elevation', 'Footing depth'],
      body: '',
      src: '',
    },
    {
      id: 'posts',
      label: 'Posts',
      bullets: ['Post material from controls'],
      body: 'Post size and material for the selected build.',
      src: 'Live configurator',
    },
    {
      id: 'rails',
      label: 'Rails',
      bullets: ['Rail material from controls'],
      body: 'Rail and cap selections for this frame.',
      src: 'Live configurator',
    },
    {
      id: 'pickets',
      label: 'Pickets',
      bullets: ['Fill, width, and spacing from controls'],
      body: 'Picket face for the selected style.',
      src: 'Live configurator',
    },
    {
      id: 'trim',
      label: 'Trim',
      bullets: ['Trim from controls'],
      body: 'Trim tiers selected for this panel.',
      src: 'Live configurator',
    },
    {
      id: 'finish',
      label: 'Finish',
      bullets: ['Stain from controls'],
      body: 'Finish / stain selections for frame, pickets, and trim.',
      src: 'Live configurator',
    },
  ];

  const LABEL = {
    cedar: 'Cedar',
    'pt-incised': 'PT incised',
    'pt-appearance': 'PT appearance',
    none: 'None',
    'cedar-1t': 'Cedar 1-tier',
    'cedar-2t': 'Cedar 2-tier',
    'cedar-3t': 'Cedar 3-tier',
    'pt-1t': 'PT 1-tier',
    'pt-2t': 'PT 2-tier',
    'pt-3t': 'PT 3-tier',
    'as-material': 'As material',
    'pt-brown': 'PT brown',
    'cedar-natural': 'Cedar natural',
    custom: 'Custom',
    'follow-rail-trim': 'Follow rail / trim',
    standard: 'Standard privacy',
    gothic: 'Gothic peaked',
    shadowbox: 'Shadowbox',
    'board-on-board': 'Board on board',
    '1-16-privacy': '≤¼″ privacy gap',
    '4ft': '4′',
    '5ft': '5′',
    '6ft': '6′',
    '8ft': '8′',
    on: 'Rail cap on',
    off: 'Rail cap off',
    'coated-screw-8-10': '#8–#10 Exterior coated screws',
    'galv-nail-10-5-12': '10.5–12 ga Galvanized nails',
    'ss-nail-10-5-12': '10.5–12 ga Stainless steel nails',
    'galv-ring-12-15': '12–15 ga Galvanized ring shank nails',
    'ss-ring-12-15': '12–15 ga Stainless steel ring shank nails',
    'coated-trim-screw-5-7': '#5–#7 Exterior trim head screws',
    'ss-trim-screw-5-7': '#5–#7 Stainless trim head screws',
    'galv-trim-nail-15': '15 ga Electro-galvanized trim nails',
    'ss-trim-nail-15': '15 ga Stainless steel trim nails',
  };

  function labelOf(value) {
    if (value == null || value === '') return '—';
    return LABEL[value] || String(value);
  }

  let catalog = { components: DEFAULT_COMPONENTS.slice() };
  let catalogIsDefault = true;
  let encyclopedia = { rows: [], blueprintGroups: {} };
  let lockedId = null;
  let getState = () => ({});
  let onModeChange = null;

  /**
   * Card ids that don't match a registry `blueprintGroup` key one-for-one.
   * `finish` predates the paintStainSeal / finishCosts split: the group still
   * carries the stain row (and its 60-day deadline copy), so the live
   * Paint / Stain / Seal card reads from it. `finishCosts` is closing costs,
   * not a material, so it stays unmapped.
   */
  const CARD_GROUP_ALIAS = { paintStainSeal: 'finish' };

  function encyclopediaRowForGroup(groupId) {
    const key = CARD_GROUP_ALIAS[groupId] || groupId;
    const map = encyclopedia.blueprintGroups && encyclopedia.blueprintGroups[key];
    const preferId = map && map.preferBodyFrom;
    const rows = encyclopedia.rows || [];
    if (preferId) {
      const hit = rows.find((r) => r.encyclopediaId === preferId);
      if (hit) return hit;
    }
    return rows.find((r) => r.blueprintGroup === key && r.siViewDefault) || null;
  }

  /**
   * `skuSource: true` rewrites the card's provenance line to the material
   * catalog SKU — right for the internal Schedule, wrong for the
   * customer-facing documents, where the authored source (the HOA guideline
   * the rule came from) is the point.
   */
  function applyEncyclopediaCopy(component, opts) {
    const row = encyclopediaRowForGroup(component.id);
    if (!row) return component;
    const skuSource = !!(opts && opts.skuSource);
    return {
      ...component,
      body: row.bodyShort || component.body,
      installNote: row.installNote || component.installNote,
      src: skuSource
        ? row.bigBoxSku
          ? `Material Catalog · HD ${row.bigBoxSku}`
          : row.skuStatus === 'needs-sku'
            ? 'Encyclopedia · needs-sku'
            : component.src
        : component.src,
      encyclopediaId: row.encyclopediaId,
    };
  }

  function mode() {
    return global.document.documentElement.getAttribute('data-view-mode') || 'configure';
  }

  /** Swap y1/y2 on all heritage-sky-plate gradients so the sky gradient flips vertically. */
  function syncSkyGradientFlip() {
    const bp = mode() === 'blueprint';
    global.document.querySelectorAll('linearGradient[id*="heritage-sky-plate"]').forEach((grad) => {
      const y1 = parseFloat(grad.getAttribute('y1'));
      const y2 = parseFloat(grad.getAttribute('y2'));
      if (Number.isNaN(y1) || Number.isNaN(y2)) return;
      const currentlyFlipped = y1 > y2;
      if (bp !== currentlyFlipped) {
        grad.setAttribute('y1', String(y2));
        grad.setAttribute('y2', String(y1));
      }
    });
  }

  /**
   * 'schedule' = ARCHIVED Choice A landscape layout. Not on the live toggle.
   * Recover via ?view=schedule / setBlueprintView('schedule'). See
   * preview/archived/blueprint-schedule/README.md and
   * docs/HOA/si-view/BLUEPRINT-SCHEDULE-LAYOUT.md.
   */
  let blueprintView = 'blueprint';
  let showBlueprintToggle = true;
  let pricingEnabled = true; // Default is Pricing ON (displays Mat., Lab., and Adm. figures)

  function isPricingEnabled() {
    return pricingEnabled;
  }

  function setPricingEnabled(enabled) {
    pricingEnabled = !!enabled;
    syncPricingState();
  }

  function togglePricing() {
    setPricingEnabled(!pricingEnabled);
  }

  function syncPricingState() {
    const root = global.document.documentElement;
    if (root) {
      root.classList.toggle('pricing-off', !pricingEnabled);
      root.setAttribute('data-pricing-mode', pricingEnabled ? 'on' : 'off');
    }
    const buttons = global.document.querySelectorAll('[data-pricing-toggle]');
    buttons.forEach((btn) => {
      btn.setAttribute('aria-pressed', pricingEnabled ? 'true' : 'false');
      btn.classList.toggle('is-pricing-off', !pricingEnabled);
      btn.textContent = pricingEnabled ? 'Pricing: ON' : 'Pricing: OFF';
    });
  }

  function getBlueprintView() {
    return blueprintView;
  }

  function setBlueprintView(view) {
    if (!['schedule', 'blueprint', 'materialList', 'ledger'].includes(view)) return;
    blueprintView = view;
    syncBlueprintViewToggle();
    if (mode() !== 'blueprint') {
      setMode('blueprint');
    } else {
      renderBlueprintView();
    }
    syncProductNavHighlight();
  }

  const VIEW_LABELS = {
    schedule: 'Schedule',
    blueprint: 'Fence Blueprint',
    materialList: 'Material List',
    ledger: 'Project Ledger',
  };

  function syncBlueprintViewToggle() {
    /* Only hide legacy S0 header toggles — never the B-MEMBER footer entry row. */
    global.document.querySelectorAll('#app-site-header .blueprint-view-toggle').forEach((segments) => {
      segments.hidden = !showBlueprintToggle;
    });
    const viewMode = mode();
    const buttons = global.document.querySelectorAll('[data-bp-view-btn]');
    let focusSet = false;
    buttons.forEach((btn) => {
      const on = viewMode === 'blueprint' && btn.getAttribute('data-bp-view-btn') === blueprintView;
      btn.setAttribute('aria-selected', on ? 'true' : 'false');
      btn.classList.toggle('is-active', on);
      if (on) {
        btn.setAttribute('tabindex', '0');
        focusSet = true;
      } else {
        btn.setAttribute('tabindex', '-1');
      }
    });
    /* When no doc is selected (configure/catalog), keep first tab in tab order. */
    if (!focusSet && buttons.length) {
      buttons[0].setAttribute('tabindex', '0');
    }
  }

  function announceBlueprintView() {
    const status = global.document.getElementById('blueprint-view-status');
    if (!status) return;
    status.textContent = `${VIEW_LABELS[blueprintView] || blueprintView} view`;
  }

  /** Arrow/Home/End movement inside the view tablist, per the tabs pattern. */
  function wireViewTablistKeys() {
    global.document.querySelectorAll('.design-docs-actions.blueprint-view-toggle, .blueprint-view-toggle').forEach((toggle) => {
      toggle.addEventListener('keydown', (e) => {
        const keys = ['ArrowRight', 'ArrowLeft', 'Home', 'End'];
        if (!keys.includes(e.key)) return;
        const tabs = Array.from(toggle.querySelectorAll('[data-bp-view-btn]'));
        if (!tabs.length) return;
        const from = tabs.indexOf(global.document.activeElement);
        let next;
        if (e.key === 'Home') next = 0;
        else if (e.key === 'End') next = tabs.length - 1;
        else if (from === -1) next = 0;
        else next = (from + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        e.preventDefault();
        setBlueprintView(tabs[next].getAttribute('data-bp-view-btn'));
        tabs[next].focus();
      });
    });
  }

  function renderBlueprintView() {
    const overlay = global.document.getElementById('blueprint-overlay');
    const detailRoot = global.document.getElementById('blueprint-detail');
    const materialsRoot = global.document.getElementById('blueprint-materials');
    const ledgerRoot = global.document.getElementById('blueprint-ledger');
    if (overlay) overlay.hidden = blueprintView !== 'schedule';
    if (detailRoot) detailRoot.hidden = blueprintView !== 'blueprint';
    if (materialsRoot) materialsRoot.hidden = blueprintView !== 'materialList';
    if (ledgerRoot) ledgerRoot.hidden = blueprintView !== 'ledger';
    global.document.documentElement.setAttribute('data-bp-view', blueprintView);
    if (blueprintView === 'schedule') {
      /* ARCHIVED path — only reachable by calling setBlueprintView('schedule') directly. */
      renderSchedule();
      syncRunStrip(true);
    } else if (blueprintView === 'materialList') {
      clearActive();
      renderMaterialListMode();
    } else if (blueprintView === 'ledger') {
      clearActive();
      renderLedgerMode();
    } else {
      clearActive();
      renderDetailMode();
    }
    announceBlueprintView();
    syncSkyGradientFlip();
  }

  function initialBlueprintViewFromUrl() {
    try {
      const params = new URLSearchParams(global.location.search);
      return params.get('view');
    } catch (e) {
      return null;
    }
  }

  function setMode(next) {
    let value = 'configure';
    if (next === 'blueprint') value = 'blueprint';
    else if (next === 'catalog') value = 'catalog';
    global.document.documentElement.setAttribute('data-view-mode', value);
    syncModeButtons(value);
    syncProductNavHighlight();
    syncViewRailForMode(value);
    const detailRoot = global.document.getElementById('blueprint-detail');
    const materialsRoot = global.document.getElementById('blueprint-materials');
    const ledgerRoot = global.document.getElementById('blueprint-ledger');
    const catalogStub = global.document.getElementById('catalog-stub');
    if (catalogStub) catalogStub.hidden = value !== 'catalog';
    if (value === 'blueprint') {
      renderBlueprintView();
    } else {
      lockedId = null;
      syncRunStrip(false);
      showOverlay(false);
      clearActive();
      if (detailRoot) detailRoot.hidden = true;
      if (materialsRoot) materialsRoot.hidden = true;
      if (ledgerRoot) ledgerRoot.hidden = true;
      syncSkyGradientFlip();
    }
    if (typeof onModeChange === 'function') onModeChange(value);
  }

  /** Zoom / F-B rail is configure-only — hide from a11y tree in blueprint/catalog. */
  function syncViewRailForMode(value) {
    const rail = global.document.getElementById('view-rail');
    if (!rail) return;
    const hide = value === 'blueprint' || value === 'catalog';
    rail.hidden = hide;
    rail.setAttribute('aria-hidden', hide ? 'true' : 'false');
  }

  function syncModeButtons(value) {
    global.document.querySelectorAll('[data-view-mode-btn]').forEach((btn) => {
      const on = btn.getAttribute('data-view-mode-btn') === value;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  /** Site header Catalog / Designer highlight + design-doc segments. */
  function syncProductNavHighlight() {
    const viewMode = mode();
    global.document.querySelectorAll('#app-site-header [data-nav-action]').forEach((el) => {
      const action = el.getAttribute('data-nav-action');
      let on = false;
      if (action === 'designer') on = viewMode === 'configure' || viewMode === 'blueprint';
      else if (action === 'catalog') on = viewMode === 'catalog';
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
      el.classList.toggle('is-active', on);
    });
    syncBlueprintViewToggle();
  }

  function handleNavAction(action) {
    if (action === 'designer') setMode('configure');
    else if (action === 'catalog') setMode('catalog');
  }

  function showOverlay(on) {
    const overlay = global.document.getElementById('blueprint-overlay');
    if (overlay) overlay.hidden = !on;
  }

  function clearActive() {
    const root = global.document.getElementById('blueprint-overlay');
    if (!root) return;
    root.querySelectorAll('.bp-group').forEach((g) => {
      g.classList.remove('is-active', 'is-locked');
    });
    const canvas = global.document.getElementById('canvas-wrap');
    if (canvas) canvas.removeAttribute('data-bp-hover');
  }

  function setActive(id) {
    const root = global.document.getElementById('blueprint-overlay');
    const canvas = global.document.getElementById('canvas-wrap');
    if (!root) return;
    if (!id) {
      clearActive();
      return;
    }
    root.querySelectorAll('.bp-group').forEach((g) => {
      const on = g.getAttribute('data-bp') === id;
      g.classList.toggle('is-active', on);
      g.classList.toggle('is-locked', on && lockedId === id);
    });
    if (canvas) canvas.setAttribute('data-bp-hover', id);
  }

  function footingFromState(state) {
    const raw = state && (state.footingDepthIn || state.footingDepth);
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0) {
      return { inches: n, assumed: false, status: 'ok' };
    }
    return { inches: FOOTING_DEPTH_DEFAULT_IN, assumed: true, status: 'assumed' };
  }

  /** @returns {{ text: string, status: 'ok'|'assumed'|'alert' }} */
  /**
   * `decisionId` is the stable key for a decision line — Ledger pricing keys
   * off it, never off `text`. Copy edits must not silently repoint a price.
   */
  function bullet(text, status, decisionId) {
    const b = { text: String(text), status: status || 'ok' };
    if (decisionId) b.decisionId = decisionId;
    return b;
  }

  function footingDepthBullet(state) {
    const f = footingFromState(state);
    return bullet(
      `Footing depth [${f.inches}″] · Aggregate [2–4″] · Concrete [120 lb]`,
      f.status,
      'posts.footing'
    );
  }

  function postTopExposureBullet(state) {
    if (state.postCaps && state.postCaps !== 'none') {
      return bullet(`Post Top Exposure — Cap · ${labelOf(state.postCaps)}`, 'ok', 'posts.topExposure');
    }
    return bullet('Post Top Exposure — Level w/ Top of fence', 'ok', 'posts.topExposure');
  }

  function postMaterialBullet(state) {
    const key = state.postsUi || state.posts;
    if (key === 'pt-appearance') {
      return bullet('Post Material — [4×4] PT (Appearance) Ground Contact Rated', 'ok', 'posts.material');
    }
    if (key === 'cedar') {
      return bullet('Post Material — [4×4] Cedar', 'ok', 'posts.material');
    }
    /* Default Si View / pt-incised */
    return bullet('Post Material — [4×4] PT (Incised) Ground Contact Rated', 'ok', 'posts.material');
  }

  function railMaterialBullet(state) {
    const key = state.railsUi || state.rails;
    if (key === 'pt-incised' || key === 'pt-appearance') {
      return bullet('Rail Material — PT [2×4] S4S', 'ok', 'rails.material');
    }
    /* Default Si View / cedar */
    return bullet('Rail Material — Cedar [2×4] S4S', 'ok', 'rails.material');
  }

  /** Always 3 bays for now — middle bay is the future incline/rake detail slot. */
  function resolveRunPanelCount() {
    return RUN_PANEL_COUNT;
  }

  function prefixIdsInFragment(root, prefix) {
    prefixIdsAcrossRoots([root], prefix);
  }

  /**
   * Same rewrite as prefixIdsInFragment but spans multiple roots that share
   * one id namespace (e.g. a <defs> block built separately from the content
   * fragment that references it). Without this, ids that live only in one
   * root (gradients/patterns in `defs`) never make it into that root's own
   * localIds scan when called alone, AND — the actual bug this fixes —
   * calling prefixIdsInFragment on `defs` and `contentFrag` separately (or
   * not at all on `defs`) leaves every clone's gradient/pattern ids bare
   * (e.g. "sc-trim-top-cedar-trim-shine"), so ~10 Blueprint cards each clone
   * their own copy of the same bare id into one document — a duplicate-ID
   * pile where which element `fill="url(#...)"` actually resolves to is
   * undefined per-browser (surfaced as trim/rail-cap boards rendering as
   * solid black shells: the gradient/pattern fill silently resolved to
   * nothing or to a mismatched sibling card's def instead of its own).
   */
  function prefixIdsAcrossRoots(roots, prefix) {
    const localIds = new Set();
    roots.forEach((root) => {
      root.querySelectorAll('[id]').forEach((el) => {
        localIds.add(el.getAttribute('id'));
      });
    });
    roots.forEach((root) => {
      root.querySelectorAll('[id]').forEach((el) => {
        const id = el.getAttribute('id');
        el.setAttribute('id', `${prefix}${id}`);
      });
    });
    roots.forEach((root) => {
      root.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes || []).forEach((attr) => {
          const v = attr.value;
          if (!v) return;
          if (v.indexOf('url(') !== -1) {
            el.setAttribute(
              attr.name,
              v.replace(/url\(\s*(['"]?)#([^)'"]+)\1\s*\)/g, (m, q, id) => {
                if (!localIds.has(id)) return m;
                return `url(${q}#${prefix}${id}${q})`;
              })
            );
          }
          if ((attr.name === 'href' || attr.name === 'xlink:href') && v.charAt(0) === '#') {
            const id = v.slice(1);
            if (localIds.has(id)) el.setAttribute(attr.name, `#${prefix}${id}`);
          }
        });
      });
    });
  }

  function liveBullets(id, state) {
    switch (id) {
      case 'general':
        return [
          bullet(
            `Height [${labelOf(state.fenceHeight)}] | Panel length [${labelOf(state.panelLength) || '8′'}]`,
            'ok',
            'general.dimensions'
          ),
          bullet(
            'Terrain / elevation management — Hybrid (top rail runs level, bottom rail angles with ground); contractor best effort to keep raked rails as continuous as terrain allows',
            'assumed',
            'general.terrain'
          ),
        ];
      case 'posts':
        return [
          postMaterialBullet(state),
          postTopExposureBullet(state),
          footingDepthBullet(state),
          bullet(
            `Framing Fasteners — ${labelOf(state.framingFasteners) || '#8–#10 Exterior coated screws'}`,
            state.framingFasteners && String(state.framingFasteners).startsWith('ss-')
              ? 'assumed'
              : 'ok',
            'posts.framingFasteners'
          ),
        ];
      case 'rails':
        return [
          railMaterialBullet(state),
          bullet(
            'Rail Profile — Two [2×4] framing rails (nailers) mount to interior of posts (in-line). Vertically (on edge), flush with homeowner side of posts',
            'ok',
            'rails.profile'
          ),
          bullet(
            'Rail Cap Profile — Cedar [2×4] mounted flat above top rail. Bridges top rail (bottom face) to post top (top face); mounting on posts',
            'ok',
            'rails.capProfile'
          ),
        ];
      case 'pickets':
        return [
          bullet('Picket Material — Cedar Flat Top Pickets [5.5 × ⅝ × 6′]', 'ok', 'pickets.material'),
          bullet('Picket Spacing — Standard [⅛″] privacy gap', 'ok', 'pickets.spacing'),
          bullet('Arrangement — Standard Layout In-fill Style', 'ok', 'pickets.arrangement'),
          bullet(
            `Fill Material Fasteners — ${labelOf(state.fillFasteners) || '12–15 ga Galvanized ring shank nails'}`,
            state.fillFasteners && String(state.fillFasteners).startsWith('ss-')
              ? 'assumed'
              : 'ok',
            'pickets.fillFasteners'
          ),
        ];
      case 'trim':
        return [
          bullet(`Trim · ${labelOf(state.trim)}`, 'ok', 'trim.spec'),
          bullet(
            `Trim Fasteners — ${labelOf(state.trimFasteners) || '15 ga Electro-galvanized trim nails'}`,
            state.trimFasteners && String(state.trimFasteners).startsWith('ss-')
              ? 'assumed'
              : 'ok',
            'trim.fasteners'
          ),
        ];
      default:
        return null;
    }
  }

  function mergeComponents(state, opts) {
    const list = (catalog.components || DEFAULT_COMPONENTS).filter((c) => c.visible !== false);
    return list.map((c) => {
      const withEnc = applyEncyclopediaCopy(c, opts);
      const live = liveBullets(c.id, state);
      return {
        ...withEnc,
        /* null = fall back to catalog; [] = intentionally no bullets */
        bullets: live != null ? live : withEnc.bullets || [],
      };
    });
  }

  /**
   * Ordered cards for the portrait documents (Blueprint / Ledger), taken from
   * the catalog so a community can reorder or add cards without a code edit.
   * Only the built-in default catalog falls back to the DETAIL_IDS order.
   * `scheduleOnly` cards are skipped — they exist for the archived landscape
   * Schedule only (see SCHEDULE_ONLY_FALLBACK_IDS).
   */
  function cardsForDocuments(state) {
    const merged = mergeComponents(state).filter((c) => !isScheduleOnly(c));
    if (!catalogIsDefault) return merged;
    const byId = Object.create(null);
    merged.forEach((c) => {
      byId[c.id] = c;
    });
    return DETAIL_IDS.map((id) => byId[id]).filter(Boolean);
  }

  /**
   * Catalogs authored before the flag existed don't mark `finish` as
   * schedule-only, and rendering it would duplicate Paint / Stain / Seal.
   */
  const SCHEDULE_ONLY_FALLBACK_IDS = ['finish'];

  function isScheduleOnly(c) {
    if (c.scheduleOnly === true) return true;
    if (c.scheduleOnly === false) return false;
    return SCHEDULE_ONLY_FALLBACK_IDS.includes(c.id);
  }

  /**
   * `sectionId` / `index` are only used to synthesize a fallback `decisionId`
   * for catalog-authored bullets that don't declare one. Positional keys are
   * weak but still beat keying pricing off display copy.
   */
  function normalizeBullet(line, sectionId, index) {
    const fallbackId =
      sectionId != null && index != null ? `${sectionId}.line${index + 1}` : null;
    if (line && typeof line === 'object' && line.text != null) {
      return {
        text: String(line.text),
        status: line.status === 'assumed' || line.status === 'alert' ? line.status : 'ok',
        decisionId: line.decisionId || fallbackId,
      };
    }
    return {
      text: String(line == null ? '' : line),
      status: 'ok',
      decisionId: fallbackId,
    };
  }

  /** `<h3>` title + optional provenance line, shared by cards and Ledger sections. */
  function buildCardHeadEl(c) {
    const head = global.document.createElement('h3');
    head.className = 'bp-group__head';
    const title = global.document.createElement('span');
    title.className = 'bp-group__title';
    title.textContent = c.label;
    head.appendChild(title);
    if (c.src) {
      const src = global.document.createElement('span');
      src.className = 'bp-group__src';
      src.textContent = c.src;
      head.appendChild(src);
    }
    return head;
  }

  function buildBulletListEl(c) {
    const ul = global.document.createElement('ul');
    ul.className = 'bp-group__items';
    (c.bullets || []).forEach((line, i) => {
      const b = normalizeBullet(line, c.id, i);
      const li = global.document.createElement('li');
      li.className = 'bp-bullet-item';
      li.innerHTML =
        `<span class="bp-bullet-text">${escapeHtml(b.text)}</span> ` +
        `<span class="bp-badge bp-badge--lab">Lab.</span> ` +
        `<span class="bp-badge bp-badge--adm">Adm.</span>`;
      li.setAttribute('data-status', b.status);
      ul.appendChild(li);
    });
    return ul;
  }

  /**
   * One card factory for both the archived Schedule and the portrait
   * documents. Options:
   * - `interactive` — Schedule only: hover/click highlight + `data-bp` hook.
   *   The portrait documents deliberately omit it (no `data-bp` collision with
   *   the Schedule page, and printed documents have no hover state).
   * - `bulletsOnlyIds` — Schedule only: ids whose card shows schedule lines
   *   with no encyclopedia body beneath, to keep the landscape grid on one page.
   */
  function buildCardEl(c, opts) {
    const options = opts || {};
    const group = global.document.createElement('article');
    group.className = 'bp-group';
    if (options.interactive) group.setAttribute('data-bp', c.id);

    group.appendChild(buildCardHeadEl(c));

    /* Schedule always renders the list (even empty) to keep its grid rows even. */
    if (options.interactive || (c.bullets || []).length) {
      group.appendChild(buildBulletListEl(c));
    }

    const suppressBody = (options.bulletsOnlyIds || []).includes(c.id);
    if (!suppressBody && (c.body || c.installNote)) {
      const detail = global.document.createElement('div');
      detail.className = 'bp-group__detail';
      if (c.body) {
        const p = global.document.createElement('p');
        p.textContent = c.body;
        detail.appendChild(p);
      }
      if (c.installNote) {
        const note = global.document.createElement('p');
        note.className = 'bp-install';
        note.textContent = c.installNote;
        detail.appendChild(note);
      }
      group.appendChild(detail);
    }

    if (options.interactive) {
      group.addEventListener('mouseenter', () => {
        if (!lockedId) setActive(c.id);
      });
      group.addEventListener('mouseleave', () => {
        if (!lockedId) setActive(null);
      });
      group.addEventListener('click', (e) => {
        e.stopPropagation();
        lockedId = lockedId === c.id ? null : c.id;
        if (lockedId) setActive(lockedId);
        else setActive(null);
      });
    }

    return group;
  }

  /** ARCHIVED Schedule card — interactive, body suppressed on the dense ids. */
  const SCHEDULE_BULLETS_ONLY_IDS = ['general', 'posts', 'rails', 'pickets'];

  function buildGroupEl(c) {
    return buildCardEl(c, { interactive: true, bulletsOnlyIds: SCHEDULE_BULLETS_ONLY_IDS });
  }

  function buildDetailCardEl(c) {
    return buildCardEl(c, {});
  }

  function sourceSvgForRun() {
    const host = global.document.getElementById('preview-host');
    if (!host) return null;
    return host.querySelector('svg');
  }

  /**
   * Continuous 3-bay run as ONE SVG (shared defs → textures work).
   * Bay i translates by i * BAY_STEP so right post of bay N = left post of bay N+1.
   * Bays 2–3 clip away the duplicated left post. Middle bay marked for future incline.
   * Extracted so both the (archived) Schedule run strip and Material List mode
   * can build this same image without duplicating the logic. `prefix` keeps
   * cloned ids distinct when both callers happen to render at once.
   */
  function buildRunStripSvg(prefix) {
    const idPrefix = prefix || 'bp';
    const source = sourceSvgForRun();
    if (!source) return null;

    const vb0 = source.getAttribute('viewBox') || `0 0 ${MODULE_W_IN} ${MODULE_H_IN}`;
    const parts = vb0.trim().split(/[\s,]+/).map(Number);
    const vbY = Number.isFinite(parts[1]) ? parts[1] : 0;
    const vbH = Number.isFinite(parts[3]) ? parts[3] : MODULE_H_IN;
    const runW = MODULE_W_IN + (RUN_PANEL_COUNT - 1) * BAY_STEP_IN;

    const run = global.document.createElementNS(SVG_NS, 'svg');
    run.setAttribute('viewBox', `0 ${vbY} ${runW} ${vbH}`);
    run.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    run.setAttribute('class', 'blueprint-run-svg');
    run.setAttribute('aria-label', 'Continuous three-panel fence run');

    const defs = global.document.createElementNS(SVG_NS, 'defs');
    const srcDefs = source.querySelector('defs');
    if (srcDefs) {
      Array.from(srcDefs.childNodes).forEach((node) => {
        defs.appendChild(node.cloneNode(true));
      });
    }
    const clip = global.document.createElementNS(SVG_NS, 'clipPath');
    clip.setAttribute('id', `${idPrefix}-run-ext-clip`);
    clip.setAttribute('clipPathUnits', 'userSpaceOnUse');
    const clipRect = global.document.createElementNS(SVG_NS, 'rect');
    clipRect.setAttribute('x', String(JOIN_X_IN));
    clipRect.setAttribute('y', String(vbY));
    clipRect.setAttribute('width', String(MODULE_W_IN - JOIN_X_IN));
    clipRect.setAttribute('height', String(vbH));
    clip.appendChild(clipRect);
    defs.appendChild(clip);
    run.appendChild(defs);

    for (let i = 0; i < RUN_PANEL_COUNT; i += 1) {
      const g = global.document.createElementNS(SVG_NS, 'g');
      g.setAttribute('transform', `translate(${i * BAY_STEP_IN},0)`);
      g.setAttribute('data-bp-panel', String(i + 1));
      if (i === 1) g.setAttribute('data-bp-elev-slot', 'middle');
      if (i > 0) g.setAttribute('clip-path', `url(#${idPrefix}-run-ext-clip)`);

      Array.from(source.children).forEach((child) => {
        if (String(child.localName || child.nodeName).toLowerCase() === 'defs') return;
        const frag = child.cloneNode(true);
        /* Drop source overlays — bbox was for the live 1-bay SVG; re-stain the run below. */
        frag.querySelectorAll('rect[data-stain-overlay]').forEach((el) => el.remove());
        prefixIdsInFragment(frag, `${idPrefix}${i}-`);
        g.appendChild(frag);
      });
      run.appendChild(g);
    }

    return run;
  }

  function paintRunStripSvg(svg) {
    if (!svg) return;
    const HC = global.HeritageConfigurator;
    const state = typeof getState === 'function' ? getState() : {};
    const paint = () => {
      if (HC && typeof HC.applyStain === 'function') {
        HC.applyStain(svg, { ...state, side: state.side || 'front' });
      }
    };
    paint();
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => requestAnimationFrame(paint));
    }
  }

  /** ARCHIVED entry point — Choice A schedule run strip. Not wired to the current toggle. */
  function syncRunStrip(on) {
    const strip = global.document.getElementById('blueprint-run-strip');
    const panels = global.document.getElementById('blueprint-run-panels');
    if (!strip || !panels) return;
    if (!on) {
      strip.hidden = true;
      strip.setAttribute('aria-hidden', 'true');
      panels.innerHTML = '';
      return;
    }
    panels.innerHTML = '';
    const run = buildRunStripSvg('bp');
    if (!run) {
      strip.hidden = true;
      return;
    }
    panels.appendChild(run);
    strip.hidden = false;
    strip.setAttribute('aria-hidden', 'false');
    paintRunStripSvg(run);
  }

  /**
   * Build a single-panel SVG clone for a Blueprint "building blocks" card:
   * only the frame pieces built up through `stageId` are shown (see
   * BUILD_STAGES), cropped tight to the fence so it sits flush with the
   * text card next to it. Does not translate or clip the panel — it stays
   * a one-bay view.
   */
  function buildDetailImage(stageId, idPrefix) {
    const source = sourceSvgForRun();
    if (!source) return null;

    const stage = BUILD_STAGES[stageId] || { groups: 'all', stained: false };

    const svg = global.document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('viewBox', `0 ${DETAIL_CROP_TOP_IN} ${MODULE_W_IN} ${DETAIL_CROP_H_IN}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('class', 'bp-detail-svg');
    svg.setAttribute('aria-label', 'Detail panel');

    const defs = global.document.createElementNS(SVG_NS, 'defs');
    const srcDefs = source.querySelector('defs');
    if (srcDefs) {
      Array.from(srcDefs.childNodes).forEach((node) => {
        defs.appendChild(node.cloneNode(true));
      });
    }
    svg.appendChild(defs);

    const contentFrag = global.document.createDocumentFragment();
    Array.from(source.children).forEach((child) => {
      if (String(child.localName || child.nodeName).toLowerCase() === 'defs') return;
      const clone = child.cloneNode(true);
      clone.querySelectorAll('rect[data-stain-overlay]').forEach((el) => el.remove());
      contentFrag.appendChild(clone);
    });

    if (stage.groups !== 'all') {
      BUILD_STAGE_GROUPS.forEach((gid) => {
        if (stage.groups.includes(gid)) return;
        contentFrag.querySelectorAll(BUILD_STAGE_SELECTORS[gid]).forEach((el) => {
          el.style.display = 'none';
        });
      });
    }

    /* defs + content share one id namespace here (gradients/patterns live
     * only in defs, but content's fill="url(#...)" needs to follow them) —
     * see prefixIdsAcrossRoots for why defs can't be skipped or prefixed
     * separately. */
    prefixIdsAcrossRoots([defs, contentFrag], idPrefix);
    svg.appendChild(contentFrag);

    const HC = global.HeritageConfigurator;
    if (HC && typeof HC.applyStain === 'function') {
      const state = typeof getState === 'function' ? getState() : {};
      /* This clone is cut from the live canvas, which always shows whatever
       * stain/paint is currently picked baked in — so a `stained: false`
       * stage can't just skip re-staining, it has to force the clone back
       * to each material's default/as-built face (and drop the community
       * face override) or a Si View build would show its stain on every
       * card, not just from Paint/Stain/Seal onward. */
      const paintState = stage.stained
        ? { ...state, side: state.side || 'front' }
        : {
            ...state,
            side: state.side || 'front',
            stainFrame: 'as-material',
            stainPicket: 'as-material',
            stainTrim: 'follow-rail-trim',
            communitySlug: null,
          };
      const paint = () => HC.applyStain(svg, paintState);
      paint();
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(() => requestAnimationFrame(paint));
      }
    }

    return svg;
  }

  /**
   * ARCHIVED — Choice A landscape schedule renderer. Not wired to the current
   * Blueprint/Material List toggle; kept working in case this layout gets reused.
   * See docs/HOA/si-view/BLUEPRINT-DETAIL-MODE-PLAN.md.
   */
  function renderSchedule() {
    const top = global.document.getElementById('blueprint-band-top');
    const bot = global.document.getElementById('blueprint-band-bot');
    const callouts = global.document.getElementById('blueprint-callouts');
    /* Legacy single schedule (pre–Choice A) */
    const legacy = global.document.getElementById('blueprint-schedule');
    if (!top && !bot && !legacy) return;

    const state = typeof getState === 'function' ? getState() : {};
    const components = mergeComponents(state, { skuSource: true });
    const byId = Object.create(null);
    components.forEach((c) => {
      byId[c.id] = c;
    });

    function fillBand(el, ids) {
      if (!el) return;
      el.innerHTML = '';
      ids.forEach((id) => {
        const c = byId[id] || DEFAULT_COMPONENTS.find((d) => d.id === id);
        if (c) el.appendChild(buildGroupEl(c));
      });
    }

    if (top || bot) {
      fillBand(top, TOP_IDS);
      fillBand(bot, BOT_IDS);
    } else if (legacy) {
      legacy.innerHTML = '';
      components.forEach((c) => legacy.appendChild(buildGroupEl(c)));
    }

    if (callouts) {
      callouts.innerHTML = '';
      const footing = footingFromState(state);
      const mark = global.document.createElement('div');
      mark.className =
        'bp-callout bp-callout--footing' + (footing.assumed ? ' bp-callout--assumed' : ' bp-callout--documented');
      mark.setAttribute('data-bp', 'posts');
      mark.innerHTML = `<span class="bp-callout__label"><span class="bp-status-dot bp-status-dot--${footing.status}" aria-hidden="true"></span>Footing [${footing.inches}″]</span>`;
      callouts.appendChild(mark);
    }

    renderMaterialList();

    if (lockedId) setActive(lockedId);
  }

  /**
   * Vendors shown on the Material List. Home Depot / Lowe's both store SKUs
   * but no direct product URL in Airtable, so `url()` builds a search-results
   * link from the SKU (always resolves, even if not the exact product page).
   * Dunn Lumber / Chinook are regional pro yards with no public per-SKU
   * catalog page, so they render as text (price + SKU) with no link.
   */
  const VENDOR_DISPLAY = {
    homeDepot: { label: 'Home Depot', url: (sku) => `https://www.homedepot.com/s/${encodeURIComponent(sku)}` },
    lowes: { label: "Lowe's", url: (sku) => `https://www.lowes.com/search?searchTerm=${encodeURIComponent(sku)}` },
    dunnLumber: { label: 'Dunn Lumber', url: null },
    chinook: { label: 'Chinook', url: null },
  };
  const VENDOR_ORDER = ['homeDepot', 'lowes', 'dunnLumber', 'chinook'];

  function supplierMetricsFor(line) {
    const group = line.blueprintGroup || 'general';
    let estWeightLbs = 0;
    let fastenerSpec = 'Standard Galv / Exterior Screws';
    const qty = line.qty || 1;

    if (group === 'posts') {
      estWeightLbs = Math.round(qty * 28);
      fastenerSpec = '10.5–12 ga Galv / SS Nails & Post Anchors';
    } else if (group === 'rails') {
      estWeightLbs = Math.round(qty * 14);
      fastenerSpec = '#8–#10 Exterior Coated Screws';
    } else if (group === 'pickets') {
      estWeightLbs = Math.round(qty * 4.5);
      fastenerSpec = '12–15 ga Stainless Steel Ring Shank Nails';
    } else if (group === 'trim') {
      estWeightLbs = Math.round(qty * 6);
      fastenerSpec = '#5–#7 Stainless / Coated Trim Screws';
    } else {
      estWeightLbs = Math.round(qty * 10);
      fastenerSpec = 'Exterior Coated Hardware';
    }

    return { estWeightLbs, fastenerSpec };
  }

  function buildVendorPricingEl(vendorPricing) {
    const wrap = global.document.createElement('div');
    wrap.className = 'bp-vendor-list';
    VENDOR_ORDER.forEach((key) => {
      const entry = vendorPricing && vendorPricing[key];
      if (!entry || entry.price == null) return;
      const display = VENDOR_DISPLAY[key];
      const row = global.document.createElement('div');
      row.className = 'bp-vendor-row';

      const nameEl = display.url
        ? global.document.createElement('a')
        : global.document.createElement('span');
      nameEl.className = 'bp-vendor-name';
      nameEl.textContent = display.label;
      if (display.url && entry.sku) {
        nameEl.setAttribute('href', display.url(entry.sku));
        nameEl.setAttribute('target', '_blank');
        nameEl.setAttribute('rel', 'noopener');
        nameEl.classList.add('bp-vendor-name--link');
      }
      row.appendChild(nameEl);

      const priceEl = global.document.createElement('span');
      priceEl.className = 'bp-vendor-price price-val';
      priceEl.textContent = `$${Number(entry.price).toFixed(2)}`;
      row.appendChild(priceEl);

      if (entry.sku) {
        const skuEl = global.document.createElement('span');
        skuEl.className = 'bp-vendor-sku';
        skuEl.textContent = `SKU ${entry.sku}`;
        row.appendChild(skuEl);
      }
      wrap.appendChild(row);
    });

    // Add Local Lumber Yard direct price estimation if available
    if (!vendorPricing.dunnLumber && !vendorPricing.chinook) {
      const localRow = global.document.createElement('div');
      localRow.className = 'bp-vendor-row bp-vendor-row--local';
      localRow.innerHTML = '<span class="bp-vendor-name">Local Yard</span> <span class="bp-vendor-price price-val">Direct Quote</span>';
      wrap.appendChild(localRow);
    }
    return wrap;
  }

  /**
   * @param {{ className: string, caption?: string, columns: Array<{ className: string, label: string }> }} spec
   */
  function buildDocTable(spec) {
    const table = global.document.createElement('table');
    table.className = spec.className;
    const caption = spec.caption
      ? `<caption class="bp-table-caption">${escapeHtml(spec.caption)}</caption>`
      : '';
    const cols = spec.columns
      .map((col) => `<th class="${col.className}" scope="col">${escapeHtml(col.label)}</th>`)
      .join('');
    table.innerHTML = `${caption}<thead><tr>${cols}</tr></thead>`;
    return table;
  }

  const MATERIAL_LIST_COLUMNS = [
    { className: 'bp-material-list__col-item', label: 'Item & Tags' },
    { className: 'bp-material-list__col-qty', label: 'Qty' },
    { className: 'bp-material-list__col-unit', label: 'Unit' },
    { className: 'bp-material-list__col-metrics', label: 'Weight & Fasteners' },
    { className: 'bp-material-list__col-pricing', label: 'Supplier Pricing' },
  ];

  const MATERIAL_LIST_EMPTY_MSG = 'Enter a total run length to see the material list.';

  /** Single BOM entry point — both Material List renderers read through this. */
  function materialListLines(state) {
    const calc = global.BomCalculator;
    if (!calc || typeof calc.computeMaterialList !== 'function') return null;
    return calc.computeMaterialList(state, encyclopedia);
  }

  function buildMaterialListEl(lines, caption) {
    const table = buildDocTable({
      className: 'bp-material-list__table',
      caption: caption,
      columns: MATERIAL_LIST_COLUMNS,
    });

    const tbody = global.document.createElement('tbody');
    lines.forEach((line) => {
      const tr = global.document.createElement('tr');
      tr.className = 'bp-material-list__row';
      if (line.skuStatus === 'needs-sku' || line.skuStatus === 'n/a-custom') {
        tr.classList.add('bp-material-list__row--needs-sku');
      }

      const qtyText = line.qty == null ? '—' : line.qty;
      const metrics = supplierMetricsFor(line);

      tr.innerHTML =
        `<td class="bp-material-list__item">` +
          `<span class="bp-item-title">${escapeHtml(line.displayName)}</span> ` +
          `<span class="bp-badge bp-badge--mat">Mat.</span> ` +
          `<span class="bp-badge bp-badge--adm">Adm.</span>` +
        `</td>` +
        `<td class="bp-material-list__qty" data-label="Qty">${escapeHtml(String(qtyText))}</td>` +
        `<td class="bp-material-list__unit" data-label="Unit">${escapeHtml(line.unit)}</td>` +
        `<td class="bp-material-list__metrics" data-label="Metrics">` +
          `<div class="bp-metric-weight">${metrics.estWeightLbs} lbs est.</div>` +
          `<div class="bp-metric-fastener">${escapeHtml(metrics.fastenerSpec)}</div>` +
        `</td>` +
        `<td class="bp-material-list__pricing"></td>`;

      const pricingCell = tr.querySelector('.bp-material-list__pricing');
      if (line.vendorPricing) {
        pricingCell.appendChild(buildVendorPricingEl(line.vendorPricing));
      } else {
        const fallback =
          line.skuStatus === 'linked' && line.bigBoxSku
            ? `HD ${line.bigBoxSku}`
            : line.skuStatus === 'n/a-custom'
              ? 'N/A'
              : 'needs-sku';
        pricingCell.innerHTML = `<span class="price-val">${escapeHtml(fallback)}</span>`;
      }
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMaterialList() {
    const root = global.document.getElementById('blueprint-material-list');
    if (!root) return;
    const body = root.querySelector('.bp-material-list__body');
    if (!body) return;
    body.innerHTML = '';

    const state = typeof getState === 'function' ? getState() : {};
    const lines = materialListLines(state);
    if (!lines) {
      body.textContent = 'Material list calculator unavailable.';
      return;
    }
    if (!lines.length) {
      body.textContent = MATERIAL_LIST_EMPTY_MSG;
      return;
    }
    body.appendChild(
      buildMaterialListEl(lines, 'Itemized material takeoff for the current design.')
    );
  }

  /**
   * Blueprint mode renderer: Multi-page Portrait ARC Blueprint & Detail Wizard view.
   * Page 1: Forced 1-Page ARC Architectural Blueprint & Material List (break-after: page)
   * Pages 2+: 8 Detail Wizard categories formatted 4 per page in a 2-column card grid (break-inside: avoid)
   */
  function renderDetailMode() {
    const root = global.document.getElementById('blueprint-detail');
    if (!root) return;
    root.innerHTML = '';
    root.className = 'bp-document-container' + (!pricingEnabled ? ' pricing-off' : '');

    const state = typeof getState === 'function' ? getState() : {};

    // --- PAGE 1: Forced 1-Page ARC Architectural Blueprint & Material List ---
    const page1 = global.document.createElement('section');
    page1.className = 'bp-print-page bp-page-1';

    const p1Header = global.document.createElement('header');
    p1Header.className = 'bp-page-header';
    p1Header.innerHTML =
      '<div class="bp-page-title-row">' +
        '<h2>Page 1 — ARC Architectural Blueprint & Material Takeoff</h2>' +
        '<span class="bp-tag-arc">ARC / HOA SUBMISSION FILE</span>' +
      '</div>';
    page1.appendChild(p1Header);

    // Top Half: Exploded 2D Blueprint Diagram
    const topHalf = global.document.createElement('div');
    topHalf.className = 'bp-page1-top';
    const diagramHead = global.document.createElement('h3');
    diagramHead.className = 'bp-section-subtitle';
    diagramHead.textContent = '2D Architectural Wireframe Diagram';
    topHalf.appendChild(diagramHead);

    const diagramSvg = buildRunStripSvg('p1-diag');
    if (diagramSvg) {
      topHalf.appendChild(diagramSvg);
      paintRunStripSvg(diagramSvg);
    }
    page1.appendChild(topHalf);

    // Bottom Half: Itemized Material List (Mat. & Adm.) + Supplier Metrics
    const bottomHalf = global.document.createElement('div');
    bottomHalf.className = 'bp-page1-bottom';
    const matHead = global.document.createElement('h3');
    matHead.className = 'bp-section-subtitle';
    matHead.textContent = 'Itemized Takeoff & Airtable Supplier Metrics';
    bottomHalf.appendChild(matHead);

    const lines = materialListLines(state) || [];
    if (lines.length) {
      bottomHalf.appendChild(buildMaterialListEl(lines, 'ARC Specification Takeoff'));
    } else {
      const p = global.document.createElement('p');
      p.className = 'bp-material-list__placeholder';
      p.textContent = MATERIAL_LIST_EMPTY_MSG;
      bottomHalf.appendChild(p);
    }
    page1.appendChild(bottomHalf);
    root.appendChild(page1);

    // --- PAGES 2+: Detail Wizard Print Breakdown (4 Categories Per Page) ---
    const cards = cardsForDocuments(state);
    const CATEGORIES_PER_PAGE = 4;
    const totalDetailPages = Math.ceil(cards.length / CATEGORIES_PER_PAGE);

    for (let pageIdx = 0; pageIdx < totalDetailPages; pageIdx += 1) {
      const pageNum = pageIdx + 2;
      const pageSec = global.document.createElement('section');
      pageSec.className = `bp-print-page bp-page-detail bp-page-${pageNum}`;

      const pHeader = global.document.createElement('header');
      pHeader.className = 'bp-page-header';
      pHeader.innerHTML =
        `<div class="bp-page-title-row">` +
          `<h2>Page ${pageNum} — Detail Wizard Category Breakdown</h2>` +
          `<span class="bp-page-counter">Page ${pageNum} of ${totalDetailPages + 1}</span>` +
        `</div>`;
      pageSec.appendChild(pHeader);

      const grid = global.document.createElement('div');
      grid.className = 'bp-detail-grid';

      const pageCards = cards.slice(pageIdx * CATEGORIES_PER_PAGE, (pageIdx + 1) * CATEGORIES_PER_PAGE);
      pageCards.forEach((component, cardIdx) => {
        const globalIdx = pageIdx * CATEGORIES_PER_PAGE + cardIdx;
        const id = component.id;

        const cardContainer = global.document.createElement('article');
        cardContainer.className = 'bp-category-card';

        const textSide = global.document.createElement('div');
        textSide.className = 'bp-detail-text';
        textSide.appendChild(buildDetailCardEl(component));

        const imageSide = global.document.createElement('div');
        imageSide.className = 'bp-detail-image';
        const img = buildDetailImage(id, `detail-${globalIdx}-`);
        if (img) imageSide.appendChild(img);

        cardContainer.appendChild(textSide);
        cardContainer.appendChild(imageSide);
        grid.appendChild(cardContainer);
      });

      pageSec.appendChild(grid);
      root.appendChild(pageSec);
    }
  }

  /** Material List mode renderer: fence run image + the full itemized BOM table. No rules prose. */
  function renderMaterialListMode() {
    const root = global.document.getElementById('blueprint-materials');
    if (!root) return;
    root.innerHTML = '';

    const state = typeof getState === 'function' ? getState() : {};
    const lines = materialListLines(state) || [];

    const imageWrap = global.document.createElement('div');
    imageWrap.className = 'bp-materials-image';
    const run = buildRunStripSvg('ml');
    if (run) {
      imageWrap.appendChild(run);
      paintRunStripSvg(run);
    }
    root.appendChild(imageWrap);

    const listWrap = global.document.createElement('div');
    listWrap.className = 'bp-materials-list';
    const head = global.document.createElement('div');
    head.className = 'bp-material-list__head';
    head.innerHTML =
      '<h3 class="bp-material-list__title">Material list</h3>' +
      '<span class="bp-material-list__src">Based on current design</span>';
    listWrap.appendChild(head);
    if (lines.length) {
      listWrap.appendChild(
        buildMaterialListEl(lines, 'Itemized material takeoff for the current design.')
      );
    } else {
      const p = global.document.createElement('p');
      p.className = 'bp-material-list__placeholder';
      p.textContent = MATERIAL_LIST_EMPTY_MSG;
      listWrap.appendChild(p);
    }
    root.appendChild(listWrap);
  }

  function formatMoney(n) {
    return `$${(Number(n) || 0).toFixed(2)}`;
  }

  function formatHours(n) {
    return `${(Number(n) || 0).toFixed(1)} hrs`;
  }

  const LEDGER_COLUMNS = [
    { className: 'ledger-table__col-decision', label: 'Decision' },
    { className: 'ledger-table__col-material', label: 'Material' },
    { className: 'ledger-table__col-hours', label: 'Labor (hrs)' },
    { className: 'ledger-table__col-labor', label: 'Labor' },
    { className: 'ledger-table__col-total', label: 'Total' },
  ];

  /**
   * Cost lookup for one Ledger line item, connected to BomCalculator material lines
   * and the 3-Layer Math Engine (6% waste buffer, 2.1x labor multiplier, $75/hr trade rate).
   *
   * @param {{ sectionId: string, isPrimary: boolean, sectionMatCost: number, state: object }} ref
   */
  function ledgerLinePrice(ref) {
    if (!ref || !ref.isPrimary || !ref.sectionMatCost || ref.sectionMatCost <= 0) {
      return { materialCost: 0, laborHours: 0, laborCost: 0, total: 0 };
    }
    const materialCost = ref.sectionMatCost;
    // Labor cost derived from 2.1x installed multiplier over 1.06 buffered material:
    // Total Installed = materialCost * 1.06 * 2.1 = materialCost * 2.226
    // Labor Portion = Total Installed - materialCost = materialCost * 1.226
    const laborCost = materialCost * 1.226;
    const laborHours = laborCost / 75.0; // Standard trade rate ($75/hr)
    const total = materialCost + laborCost;

    return {
      materialCost: Number(materialCost.toFixed(2)),
      laborHours: Number(laborHours.toFixed(1)),
      laborCost: Number(laborCost.toFixed(2)),
      total: Number(total.toFixed(2)),
    };
  }

  function getMaterialLinesForSection(sectionId, materialLines) {
    if (!Array.isArray(materialLines)) return [];
    const groupKey = sectionId === 'paintStainSeal' ? 'finish' : sectionId;
    return materialLines.filter((line) => line.blueprintGroup === groupKey);
  }

  /**
   * Ledger mode: every configurator decision rendered as a priced
   * line item — Material $ / Labor hrs / Labor $ / Line total — with a
   * section subtotal, grand total, and financial estimate range bounds.
   */
  function renderLedgerMode() {
    const root = global.document.getElementById('blueprint-ledger');
    if (!root) return;
    root.innerHTML = '';

    const state = typeof getState === 'function' ? getState() : {};
    const showStatus = !!(global.document.documentElement.dataset.communityPreset);
    const materialLines = materialListLines(state) || [];

    let totalNetMaterial = 0;
    let grandTotal = 0;

    cardsForDocuments(state).forEach((component) => {
      const id = component.id;
      const bullets = (component.bullets || []).map((line, i) => normalizeBullet(line, id, i));
      const secMatLines = getMaterialLinesForSection(id, materialLines);
      const secMatCost = secMatLines.reduce((sum, l) => sum + (l.lineMaterialCost || 0), 0);

      totalNetMaterial += secMatCost;

      const section = global.document.createElement('section');
      section.className = 'ledger-section';
      section.setAttribute('data-ledger-section', id);
      section.appendChild(buildCardHeadEl(component));

      const table = buildDocTable({
        className: 'ledger-table',
        caption: `${component.label} — priced decisions`,
        columns: LEDGER_COLUMNS,
      });
      const tbody = global.document.createElement('tbody');

      let sectionTotal = 0;
      if (bullets.length) {
        bullets.forEach((b, idx) => {
          const isPrimary = idx === 0;
          const price = ledgerLinePrice({
            sectionId: id,
            isPrimary: isPrimary,
            sectionMatCost: secMatCost,
            state: state,
          });
          sectionTotal += price.total;
          const dot = showStatus
            ? `<span class="bp-status-dot bp-status-dot--${b.status}" aria-hidden="true"></span>`
            : '';
          const tr = global.document.createElement('tr');
          tr.className = 'ledger-row';
          if (b.decisionId) tr.setAttribute('data-decision-id', b.decisionId);
          tr.innerHTML =
            `<td class="ledger-row__decision">${dot}${escapeHtml(b.text)}</td>` +
            `<td class="ledger-row__material" data-label="Material">${formatMoney(price.materialCost)}</td>` +
            `<td class="ledger-row__hours" data-label="Labor (hrs)">${formatHours(price.laborHours)}</td>` +
            `<td class="ledger-row__labor" data-label="Labor">${formatMoney(price.laborCost)}</td>` +
            `<td class="ledger-row__total" data-label="Total">${formatMoney(price.total)}</td>`;
          tbody.appendChild(tr);
        });
      } else {
        const tr = global.document.createElement('tr');
        tr.className = 'ledger-row ledger-row--empty';
        tr.innerHTML = '<td colspan="5">No priced decisions for this section yet.</td>';
        tbody.appendChild(tr);
      }

      const subtotalRow = global.document.createElement('tr');
      subtotalRow.className = 'ledger-row ledger-row--subtotal';
      subtotalRow.innerHTML =
        '<td class="ledger-row__decision" colspan="4">Subtotal</td>' +
        `<td class="ledger-row__total">${formatMoney(sectionTotal)}</td>`;
      tbody.appendChild(subtotalRow);

      grandTotal += sectionTotal;

      table.appendChild(tbody);
      section.appendChild(table);
      root.appendChild(section);
    });

    // Financial Bounds Rollup (sand_frames_math_spec.md)
    const lnFt = Math.max(1, Number(state.lnFt || state.totalLnFt || 50));
    const bufferedMat = totalNetMaterial * 1.06;
    const installedBase = bufferedMat * 2.1;
    const projectSubtotal = installedBase * 1.05; // 5% Admin Fee
    const lowBound = projectSubtotal * 0.95;
    const highBound = projectSubtotal * 1.12;

    const lowPerLF = lowBound / lnFt;
    const highPerLF = highBound / lnFt;
    const midPerLF = projectSubtotal / lnFt;

    const grandSection = global.document.createElement('section');
    grandSection.className = 'ledger-grand-total';
    grandSection.innerHTML =
      '<div class="ledger-grand-total__summary">' +
        `<div class="ledger-grand-total__row"><span>Net Material Cost:</span> <strong>${formatMoney(totalNetMaterial)}</strong></div>` +
        `<div class="ledger-grand-total__row"><span>Buffered Material (+6% Waste):</span> <strong>${formatMoney(bufferedMat)}</strong></div>` +
        `<div class="ledger-grand-total__row"><span>Installed Labor & Base:</span> <strong>${formatMoney(installedBase)}</strong></div>` +
        `<div class="ledger-grand-total__row ledger-grand-total__row--sub"><span>Project Subtotal (+5% Admin):</span> <strong>${formatMoney(projectSubtotal)} (${formatMoney(midPerLF)}/LF)</strong></div>` +
      '</div>' +
      '<div class="ledger-grand-total__range">' +
        '<span class="ledger-grand-total__label">Estimated Range</span>' +
        `<span class="ledger-grand-total__value">${formatMoney(lowBound)} – ${formatMoney(highBound)}</span>` +
        `<span class="ledger-grand-total__subtext">(${formatMoney(lowPerLF)}/LF – ${formatMoney(highPerLF)}/LF)</span>` +
      '</div>';
    root.appendChild(grandSection);
  }

  async function loadEncyclopedia(url) {
    const path = url || 'component-encyclopedia-registry.json';
    try {
      const res = await fetch(path, { cache: 'no-cache' });
      if (!res.ok) throw new Error(String(res.status));
      encyclopedia = await res.json();
      if (!Array.isArray(encyclopedia.rows)) encyclopedia.rows = [];
      if (!encyclopedia.blueprintGroups) encyclopedia.blueprintGroups = {};
    } catch (err) {
      console.warn('[BlueprintMode] encyclopedia load failed', path, err);
      encyclopedia = { rows: [], blueprintGroups: {} };
    }
    return encyclopedia;
  }

  async function loadCatalog(url) {
    if (!url) {
      catalog = { components: DEFAULT_COMPONENTS.slice() };
      catalogIsDefault = true;
      return catalog;
    }
    try {
      const res = await fetch(url, { cache: 'no-cache' });
      if (!res.ok) throw new Error(String(res.status));
      catalog = await res.json();
      catalogIsDefault = false;
      if (!Array.isArray(catalog.components) || !catalog.components.length) {
        catalog.components = DEFAULT_COMPONENTS.slice();
        catalogIsDefault = true;
      }
    } catch (err) {
      console.warn('[BlueprintMode] catalog load failed', url, err);
      catalog = { components: DEFAULT_COMPONENTS.slice() };
      catalogIsDefault = true;
    }
    return catalog;
  }

  function wireChrome() {
    global.document.querySelectorAll('[data-view-mode-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setMode(btn.getAttribute('data-view-mode-btn')));
    });
    global.document.querySelectorAll('[data-nav-action]').forEach((btn) => {
      btn.addEventListener('click', () => handleNavAction(btn.getAttribute('data-nav-action')));
    });
    const back = global.document.getElementById('blueprint-back-to-config');
    if (back) {
      back.addEventListener('click', () => setMode('configure'));
    }
    const detailBack = global.document.getElementById('blueprint-detail-back-to-config');
    if (detailBack) {
      detailBack.addEventListener('click', () => setMode('configure'));
    }
    global.document.querySelectorAll('[data-bp-view-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setBlueprintView(btn.getAttribute('data-bp-view-btn')));
    });
    wireViewTablistKeys();
    global.document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (mode() === 'blueprint') {
        if (lockedId) {
          lockedId = null;
          setActive(null);
        } else {
          setMode('configure');
        }
      } else if (mode() === 'catalog') {
        setMode('configure');
      }
    });
  }

  function initialModeFromUrl() {
    try {
      const params = new URLSearchParams(global.location.search);
      const modeParam = params.get('mode');
      const viewParam = params.get('view');
      if (modeParam === 'catalog' || viewParam === 'catalog') return 'catalog';
      if (modeParam === 'blueprint') return 'blueprint';
      /* Showcase / deep links: ?view=blueprint|materialList|ledger|schedule */
      if (['schedule', 'blueprint', 'materialList', 'ledger'].includes(viewParam)) return 'blueprint';
      return 'configure';
    } catch (e) {
      return 'configure';
    }
  }

  function init(opts) {
    opts = opts || {};
    if (typeof opts.getState === 'function') getState = opts.getState;
    if (typeof opts.onModeChange === 'function') onModeChange = opts.onModeChange;
    wireChrome();
    const bootMode = opts.initialMode || initialModeFromUrl();
    const initialView = opts.initialBlueprintView || initialBlueprintViewFromUrl() || (global.window && global.window.__initialBlueprintView) || 'blueprint';
    blueprintView = ['schedule', 'blueprint', 'materialList', 'ledger'].includes(initialView) ? initialView : 'blueprint';
    if (typeof opts.showBlueprintToggle === 'boolean') {
      showBlueprintToggle = opts.showBlueprintToggle;
    } else if (global.window && typeof global.window.__showBlueprintToggle === 'boolean') {
      showBlueprintToggle = global.window.__showBlueprintToggle;
    }
    syncBlueprintViewToggle();
    setMode('configure');
    const encyclopediaUrl = opts.encyclopediaUrl || 'component-encyclopedia-registry.json';
    return Promise.all([loadCatalog(opts.catalogUrl), loadEncyclopedia(encyclopediaUrl)]).then(() => {
      if (bootMode === 'blueprint') setMode('blueprint');
      else if (bootMode === 'catalog') setMode('catalog');
      return api;
    });
  }

  function enter() {
    setMode('blueprint');
  }

  function exit() {
    setMode('configure');
  }

  function refresh() {
    if (mode() === 'blueprint') {
      renderBlueprintView();
    }
  }

  const api = {
    init,
    enter,
    exit,
    refresh,
    setMode,
    getMode: mode,
    setBlueprintView,
    getBlueprintView,
    syncProductNavHighlight,
    handleNavAction,
    loadCatalog,
    loadEncyclopedia,
    syncRunStrip,
    renderMaterialList,
    buildDetailImage,
    renderDetailMode,
    renderMaterialListMode,
    renderLedgerMode,
  };

  global.BlueprintMode = api;
})(typeof window !== 'undefined' ? window : global);
