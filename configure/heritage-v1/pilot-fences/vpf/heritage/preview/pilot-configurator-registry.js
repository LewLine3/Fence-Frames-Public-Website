/**
 * Fence Frames configurator — taxonomy: category → style → template.
 * Loaded by heritage-pilot.html (configurator shell for all pilots).
 *
 * Templates: Base · Default · two marketing upgrades per style.
 * Checklist: pilot-configurator-onboarding.md
 */
(function initPilotRegistry(global) {
  const MATERIAL_DEFAULTS = {
    posts: 'pt-incised',
    rails: 'pt-incised',
    trim: 'pt-1t',
    railCap: 'off',
    capMode: 'match-rails',
    postCaps: 'none',
    brackets: 'none',
    picketFill: 'standard',
    picketSpacing: '1-16-privacy',
  };

  const VPF_ASSEMBLY = {
    front: '../asm-heritage-hrtg-frame.svg',
    back: '../asm-heritage-hrtg-frame-back.svg',
  };

  const VPF_CAPABILITIES = {
    pickets: true,
    trim: true,
    stain: true,
    cap: true,
    railCount: true,
    templates: true,
    back: true,
  };

  const HF_CAPABILITIES = {
    pickets: false,
    trim: false,
    stain: false,
    cap: false,
    railCount: false,
    templates: true,
    back: false,
  };

  const CATEGORIES = {
    vpf: {
      id: 'vpf',
      code: 'VPF',
      label: 'Vertical Fence',
      trail: 'Vertical Picket Fence',
      styleOrder: ['vpf-natural-wood', 'vpf-composite-vinyl'],
    },
    horizontal: {
      id: 'horizontal',
      code: 'HF',
      label: 'Horizontal Fence',
      trail: 'Board & split rail',
      styleOrder: ['hf-board-fence', 'hf-split-rail'],
    },
    fabric: {
      id: 'fabric',
      code: 'Fabric',
      label: 'Fabric Fence',
      trail: 'Mesh & lattice',
      styleOrder: [],
      disabled: true,
    },
    'hand-guardrail': {
      id: 'hand-guardrail',
      code: 'Hand',
      label: 'Hand / Guardrail',
      trail: 'Guardrail',
      styleOrder: [],
      disabled: true,
    },
  };

  /** L2 — fence style within a category. */
  const STYLES = {
    'vpf-natural-wood': {
      id: 'vpf-natural-wood',
      category: 'vpf',
      label: 'Natural wood',
      code: 'WOOD',
      description: '6′ vertical picket fence — PT frame, cedar pickets, configurable rail frame.',
      mode: 'vpf-heritage',
      /** Sym overlay stack (front); monolith fallback for back + non-standard picket spacing. */
      renderMode: 'stack',
      assembly: VPF_ASSEMBLY,
      templateOrder: ['base', 'default', 'lineage', 'legacy'],
      defaults: { ...MATERIAL_DEFAULTS },
      capabilities: VPF_CAPABILITIES,
    },
    'vpf-composite-vinyl': {
      id: 'vpf-composite-vinyl',
      category: 'vpf',
      label: 'Composite / vinyl',
      code: 'CVNL',
      description: 'Composite or vinyl picket systems — coming soon.',
      mode: 'stub',
      assembly: null,
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS },
      capabilities: VPF_CAPABILITIES,
      disabled: true,
    },
    'hf-board-fence': {
      id: 'hf-board-fence',
      category: 'horizontal',
      label: 'Board fence',
      code: 'HSB',
      description:
        'Horizontal split board — 4×6 posts (wide face) · 3× 2×6 boards · ends at post center.',
      mode: 'hf-frame',
      assembly: {
        front: '../../hf/rancher/asm-hf-rancher-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default', 'rancher', 'statesmen'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
    },
    'hf-split-rail': {
      id: 'hf-split-rail',
      category: 'horizontal',
      label: 'Split rail',
      code: 'HSR',
      description: 'Split-rail horizontal line — 3 rails, no picket infill.',
      mode: 'hf-frame',
      assembly: {
        front: '../../hf/homesteader/asm-hf-homesteader-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default', 'homesteader', 'forester'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
    },
  };

  /**
   * L3 — pre-designed templates per style.
   * framePreset → heritage-configurator.js VPF_FRAME_PRESETS key (VPF only).
   */
  const TEMPLATES = {
    'vpf-natural-wood': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Simplest wood frame — Traditions geometry (~TRAD). Cap optional in UI.',
        framePreset: 'traditions',
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', railCap: 'off', capMode: 'match-rails' },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Recommended wood build — Heritage hybrid frame (~HRTG).',
        framePreset: 'heritage-vpf',
        defaults: {
          ...MATERIAL_DEFAULTS,
          picketSpacing: '1-16-privacy',
          railCap: 'on',
          capMode: 'match-rails',
        },
      },
      lineage: {
        id: 'lineage',
        label: 'Lineage',
        slot: 'upgrade-a',
        description: 'Upgrade — Heritage top + cap; heritage bottom rail. PT 2T trim (top + bottom rail).',
        framePreset: 'lineage',
        defaults: { ...MATERIAL_DEFAULTS, trim: 'pt-2t', railCap: 'on', capMode: 'match-rails' },
      },
      legacy: {
        id: 'legacy',
        label: 'Legacy',
        slot: 'upgrade-b',
        description: 'Upgrade — triple rail + cap. PT 3T trim (requires 3-rail Legacy frame).',
        framePreset: 'legacy',
        defaults: { ...MATERIAL_DEFAULTS, trim: 'pt-3t', railCap: 'on', capMode: 'match-rails' },
      },
    },
    'hf-board-fence': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum board fence — PT frame, standard board stack.',
        framePreset: null,
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard board fence quote build.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
      },
      rancher: {
        id: 'rancher',
        label: 'Rancher',
        slot: 'upgrade-a',
        description: 'Rancher upgrade — wide-face posts, tight butt-joint stack.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
      },
      statesmen: {
        id: 'statesmen',
        label: 'Statesmen',
        slot: 'upgrade-b',
        description: 'Statesmen upgrade build — coming soon.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS },
        disabled: true,
      },
    },
    'hf-split-rail': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum split-rail — PT posts and rails.',
        framePreset: null,
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard split-rail line.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
      },
      homesteader: {
        id: 'homesteader',
        label: 'Homesteader',
        slot: 'upgrade-a',
        description: 'Homesteader upgrade — classic 3-rail split line.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
      },
      forester: {
        id: 'forester',
        label: 'Forester',
        slot: 'upgrade-b',
        description: 'Forester upgrade build — coming soon.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS },
        disabled: true,
      },
    },
  };

  function getCategory(id) {
    return CATEGORIES[id] || CATEGORIES.vpf;
  }

  function getStyle(id) {
    return STYLES[id] || STYLES['vpf-natural-wood'];
  }

  function stylesForCategory(categoryId) {
    const cat = getCategory(categoryId);
    return (cat.styleOrder || [])
      .map((id) => STYLES[id])
      .filter((s) => s && !s.disabled);
  }

  function defaultStyleForCategory(categoryId) {
    const styles = stylesForCategory(categoryId);
    return styles[0] || STYLES['vpf-natural-wood'];
  }

  function templatesForStyle(styleId) {
    const style = getStyle(styleId);
    const bucket = TEMPLATES[styleId] || {};
    return (style.templateOrder || [])
      .map((id) => bucket[id])
      .filter(Boolean);
  }

  function getTemplate(styleId, templateId) {
    const bucket = TEMPLATES[styleId];
    if (!bucket) return null;
    return bucket[templateId] || null;
  }

  function defaultTemplateForStyle(styleId) {
    const style = getStyle(styleId);
    const bucket = TEMPLATES[styleId];
    if (!bucket) return null;
    const preferred = bucket.default || bucket.base;
    if (preferred && !preferred.disabled) return preferred;
    return templatesForStyle(styleId).find((t) => !t.disabled) || null;
  }

  /** @deprecated Use getStyle — shim for older references */
  function getPilot(id) {
    return getStyle(id);
  }

  /** @deprecated Use stylesForCategory */
  function linesForCategory(categoryId) {
    return stylesForCategory(categoryId);
  }

  /** @deprecated Use defaultStyleForCategory */
  function defaultPilotForCategory(categoryId) {
    return defaultStyleForCategory(categoryId);
  }

  global.PilotConfiguratorRegistry = {
    CATEGORIES,
    STYLES,
    TEMPLATES,
    MATERIAL_DEFAULTS,
    getCategory,
    getStyle,
    stylesForCategory,
    defaultStyleForCategory,
    templatesForStyle,
    getTemplate,
    defaultTemplateForStyle,
    getPilot,
    linesForCategory,
    defaultPilotForCategory,
    /** @deprecated alias */
    PILOTS: STYLES,
  };
})(typeof window !== 'undefined' ? window : global);
