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
    picketWidth: '5.5',
  };

  const VPF_ASSEMBLY = {
    front: '../asm-heritage-hrtg-frame.svg',
    back: '../asm-heritage-hrtg-frame-back.svg',
  };

  const VPF_CAPABILITIES = {
    pickets: true,
    /** 3.5″ (1x4) / 5.5″ (1x6) toggle — standard fill only; HF and fabric/wire lines don't get this control. */
    picketWidth: true,
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

  /** Horizontal picket line — same as HF_CAPABILITIES but shows the Pickets/fill panel (spacing menu). */
  const HF_PICKET_CAPABILITIES = {
    ...HF_CAPABILITIES,
    pickets: true,
  };

  /** Welded wire — wire grid + finish toggles in the Pickets panel slot; trim sandwiches mesh. */
  const FABRIC_WIRE_CAPABILITIES = {
    pickets: true,
    wireGrid: true,
    wireFinish: true,
    latticeGrid: false,
    trim: true,
    stain: false,
    cap: false,
    railCount: false,
    templates: true,
    back: false,
  };

  /** Lattice privacy panel — opening size + slat material; trim sandwiches panel. */
  const FABRIC_LATTICE_CAPABILITIES = {
    pickets: true,
    wireGrid: false,
    wireFinish: false,
    latticeGrid: true,
    latticeMaterial: true,
    trim: true,
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
      trail: 'Board, picket & split rail',
      styleOrder: [
        'hf-board-fence',
        'hf-horizontal-picket',
        'hf-split-rail',
        'hf-composite-vinyl',
      ],
    },
    fabric: {
      id: 'fabric',
      code: 'Fabric',
      label: 'Fabric Fence',
      trail: 'Mesh, lattice & chain link',
      styleOrder: ['fabric-welded-wire', 'fabric-lattice', 'fabric-chain-link'],
    },
    'hand-guardrail': {
      id: 'hand-guardrail',
      code: 'Hand',
      label: 'Hand / Guardrail',
      trail: 'Guardrail — parked',
      styleOrder: ['hand-wood-baluster', 'hand-cable-metal'],
      /** Owner 2026-08-02: parked until Vertical / Horizontal / Fabric are finished. */
      disabled: true,
    },
    community: {
      id: 'community',
      code: 'HOA',
      label: 'Community / HOA',
      trail: 'Partner community builds',
      styleOrder: ['hoa-si-view'],
    },
  };

  /** L2 — fence style within a category. */
  const STYLES = {
    'vpf-natural-wood': {
      id: 'vpf-natural-wood',
      category: 'vpf',
      label: 'Cedar Picket',
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
    /** Community / HOA — same VPF heritage art; filtered + locked via community-presets/*.json */
    'hoa-si-view': {
      id: 'hoa-si-view',
      category: 'community',
      label: 'Si View Community',
      code: 'SV',
      description: 'Standard Si View Privacy Fence — approved 6′ cedar privacy for Si View Community (North Bend).',
      mode: 'vpf-heritage',
      renderMode: 'stack',
      assembly: VPF_ASSEMBLY,
      communityPreset: 'si-view',
      templateOrder: ['default'],
      defaults: {
        ...MATERIAL_DEFAULTS,
        fenceHeight: '6ft',
        posts: 'pt-incised',
        rails: 'cedar',
        trim: 'cedar-1t',
        railCap: 'on',
        capMode: 'match-rails',
        postCaps: 'none',
        brackets: 'none',
        picketFill: 'standard',
        picketSpacing: '1-16-privacy',
        picketWidth: '5.5',
        stainFrame: 'pt-brown',
        stainPicket: 'pt-brown',
      },
      capabilities: VPF_CAPABILITIES,
    },
    'hf-board-fence': {
      id: 'hf-board-fence',
      category: 'horizontal',
      label: 'Board fence',
      code: 'HSB',
      description:
        'Horizontal split board — Base through Rancher templates; PT posts, spaced boards in 4′ fill zone. Cross-buck is a template here, not a separate Style.',
      mode: 'hf-frame',
      /** One unified assembly — templates are starting presets, not separate SVG branches. */
      assembly: {
        front: '../../../hf/board-fence/asm-hf-board-fence-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default', 'homesteader', 'rancher', 'cross-buck'],
      defaults: {
        posts: 'pt-incised',
        rails: 'pt-appearance',
        trim: 'none',
        capMode: 'match-rails',
        boardStack: 'split',
        boardCount: 2,
        postSize: '4x6',
        boardSize: '2x6',
        fenceHeight: '4ft',
      },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
    },
    'hf-horizontal-picket': {
      id: 'hf-horizontal-picket',
      category: 'horizontal',
      label: 'Horizontal Picket',
      code: 'HPF',
      description:
        'Cedar pickets laid on their side, stacked full post-to-post — 4×4 posts standard (4×6 optional), same gap/spacing menu as vertical cedar picket.',
      mode: 'hf-frame',
      assembly: {
        front: '../../../hf/horizontal-picket/asm-hf-horizontal-picket-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails', picketFill: 'standard' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_PICKET_CAPABILITIES,
    },
    /**
     * True split-rail — rustic round/faceted timber rails let into mortised
     * posts. No art exists yet (owner correction, 2026-07-03) — kept as a
     * disabled placeholder rather than faking it with board/rail geometry.
     * Do not point this at the Homesteader assembly; that preset moved to
     * `hf-board-fence` above (it's a split *board* line, not real split rail).
     */
    'hf-split-rail': {
      id: 'hf-split-rail',
      category: 'horizontal',
      label: 'Split rail',
      code: 'HSR',
      description: 'Rustic horizontal split rail line with mortised posts.',
      mode: 'hf-frame',
      assembly: {
        front: '../../../hf/split-rail/asm-hf-split-rail-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
    },
    'fabric-welded-wire': {
      id: 'fabric-welded-wire',
      category: 'fabric',
      label: 'Welded wire',
      code: 'WWR',
      description:
        'Welded wire fabric — 4×4 posts, 2×4 rails, 1×4 trim sandwiches mesh at rail connections; square mesh; galvanized or vinyl-coated wire.',
      mode: 'fabric-frame',
      assembly: {
        front: '../../../fabric/welded-wire/asm-fabric-welded-wire-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default'],
      defaults: {
        ...MATERIAL_DEFAULTS,
        trim: 'pt-2t',
        capMode: 'match-rails',
        fabricWireGrid: 'grid-2',
        fabricWireFinish: 'galvanized',
      },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: FABRIC_WIRE_CAPABILITIES,
    },
    'fabric-lattice': {
      id: 'fabric-lattice',
      category: 'fabric',
      label: 'Lattice',
      code: 'LAT',
      description:
        'Lattice privacy panel — 4×4 posts, 2×4 rails, 1×4 trim sandwiches panel; composite or cedar crisscross infill.',
      mode: 'fabric-frame',
      assembly: {
        front: '../../../fabric/lattice/asm-fabric-lattice-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default'],
      defaults: {
        ...MATERIAL_DEFAULTS,
        trim: 'pt-2t',
        capMode: 'match-rails',
        fabricLatticeGrid: 'grid-2',
        fabricLatticeMaterial: 'composite',
      },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: FABRIC_LATTICE_CAPABILITIES,
    },
    /**
     * DEPRECATED as a Style (owner 2026-08-02). Cross-buck is a Board fence
     * template (`hf-board-fence` → `cross-buck`), not its own Style.
     * Kept disabled so old links/docs do not resurrect a fourth HF style.
     */
    'hf-cross-buck': {
      id: 'hf-cross-buck',
      category: 'horizontal',
      label: 'Cross-buck (deprecated style)',
      code: 'HXB',
      description:
        'Deprecated — use Board fence → Cross-buck template. Not a standalone Style.',
      mode: 'stub',
      assembly: null,
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
      disabled: true,
    },
    /**
     * Horizontal composite / vinyl — Visionary pilot. Stub until HCV systems ship.
     */
    'hf-composite-vinyl': {
      id: 'hf-composite-vinyl',
      category: 'horizontal',
      label: 'Composite / vinyl',
      code: 'HCV',
      description: 'Composite or vinyl horizontal systems — coming soon (Visionary pilot).',
      mode: 'stub',
      assembly: null,
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
      disabled: true,
    },
    /**
     * Chain link — fabric CLNK. Stub until chainlink mesh assembly ships.
     */
    'fabric-chain-link': {
      id: 'fabric-chain-link',
      category: 'fabric',
      label: 'Chain link',
      code: 'CLNK',
      description: 'Chain-link mesh between posts.',
      mode: 'fabric-frame',
      assembly: {
        front: '../../../fabric/welded-wire/asm-fabric-welded-wire-frame.svg',
        back: null,
      },
      templateOrder: ['base', 'default'],
      defaults: {
        ...MATERIAL_DEFAULTS,
        trim: 'none',
        capMode: 'match-rails',
        fabricWireFinish: 'galvanized',
      },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: FABRIC_WIRE_CAPABILITIES,
    },
    'hand-wood-baluster': {
      id: 'hand-wood-baluster',
      category: 'hand-guardrail',
      label: 'Wood baluster',
      code: 'HWB',
      description: 'Wood baluster guardrail — parked until further notice.',
      mode: 'stub',
      assembly: null,
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
      disabled: true,
    },
    'hand-cable-metal': {
      id: 'hand-cable-metal',
      category: 'hand-guardrail',
      label: 'Cable / metal',
      code: 'HCAB',
      description: 'Cable or metal guardrail — parked until further notice.',
      mode: 'stub',
      assembly: null,
      templateOrder: ['base', 'default'],
      defaults: { ...MATERIAL_DEFAULTS, capMode: 'match-rails' },
      module: { w: 112, h: 96, grassBottomY: 96 },
      capabilities: HF_CAPABILITIES,
      disabled: true,
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
    'hoa-si-view': {
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Si View approved build — Heritage hybrid frame, privacy spacing.',
        framePreset: 'heritage-vpf',
        defaults: {
          ...MATERIAL_DEFAULTS,
          fenceHeight: '6ft',
          posts: 'pt-incised',
          rails: 'pt-incised',
          trim: 'pt-1t',
          picketSpacing: '1-16-privacy',
          picketWidth: '5.5',
          railCap: 'on',
          capMode: 'match-rails',
          postCaps: 'none',
          stainFrame: 'pt-brown',
          stainPicket: 'pt-brown',
        },
      },
    },
    'hf-board-fence': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum board fence — PT incised posts, PT appearance boards, 2× 2×4.',
        framePreset: null,
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-appearance',
          trim: 'none',
          capMode: 'match-rails',
          boardStack: 'split',
          boardCount: 2,
          postSize: '4x4',
          boardSize: '2x4',
          fenceHeight: '4ft',
        },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard board fence — PT incised posts, PT appearance 2× 2×6 on 4×6 posts.',
        framePreset: null,
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-appearance',
          trim: 'none',
          capMode: 'match-rails',
          boardStack: 'split',
          boardCount: 2,
          postSize: '4x6',
          boardSize: '2x6',
          fenceHeight: '4ft',
        },
      },
      homesteader: {
        id: 'homesteader',
        label: 'Homesteader',
        slot: 'upgrade-a',
        description: 'Homesteader — 3× 2×6 boards, 4×6 posts, evenly spaced in 4′ zone.',
        framePreset: null,
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-appearance',
          trim: 'none',
          capMode: 'match-rails',
          boardStack: 'split',
          boardCount: 3,
          postSize: '4x6',
          boardSize: '2x6',
          fenceHeight: '4ft',
        },
      },
      rancher: {
        id: 'rancher',
        label: 'Rancher',
        slot: 'upgrade-b',
        description: 'Rancher premium — 4× 2×6 boards, 4×6 posts, evenly spaced in 4′ zone.',
        framePreset: null,
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-appearance',
          trim: 'none',
          capMode: 'match-rails',
          boardStack: 'split',
          boardCount: 4,
          postSize: '4x6',
          boardSize: '2x6',
          fenceHeight: '4ft',
        },
      },
      /**
       * Cross-buck — X-rail / Statesmen pattern as a Board fence variation.
       * Owner 2026-08-02: not a separate Style. Disabled until geometry ships.
       */
      'cross-buck': {
        id: 'cross-buck',
        label: 'Cross-buck',
        slot: 'upgrade-c',
        description: 'Cross-buck / X-rail board variation — coming soon.',
        framePreset: null,
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-appearance',
          trim: 'none',
          capMode: 'match-rails',
          boardStack: 'split',
          boardCount: 2,
          postSize: '4x6',
          boardSize: '2x6',
          fenceHeight: '4ft',
        },
        disabled: true,
      },
    },
    'hf-horizontal-picket': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum horizontal picket — PT frame, privacy spacing.',
        framePreset: null,
        assembly: {
          front: '../../../hf/horizontal-picket/asm-hf-horizontal-picket-frame.svg',
          back: null,
        },
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-incised',
          trim: 'none',
          capMode: 'match-rails',
          picketFill: 'standard',
          picketSpacing: '1-16-privacy',
        },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard horizontal picket quote build — cedar, privacy spacing.',
        framePreset: null,
        assembly: {
          front: '../../../hf/horizontal-picket/asm-hf-horizontal-picket-frame.svg',
          back: null,
        },
        defaults: {
          ...MATERIAL_DEFAULTS,
          trim: 'none',
          capMode: 'match-rails',
          picketFill: 'standard',
          picketSpacing: '1-16-privacy',
        },
      },
    },
    /** Placeholder only — style is disabled until real split-rail art exists. */
    'hf-split-rail': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum split-rail — PT posts and rails.',
        framePreset: 'split-rail',
        assembly: {
          front: '../../../hf/split-rail/asm-hf-split-rail-frame.svg',
          back: null,
        },
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
        disabled: false,
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard split-rail line.',
        framePreset: 'split-rail',
        assembly: {
          front: '../../../hf/split-rail/asm-hf-split-rail-frame.svg',
          back: null,
        },
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
        disabled: false,
      },
    },
    'fabric-welded-wire': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum welded wire — PT frame, 2″ mesh, no trim sandwich.',
        framePreset: null,
        assembly: {
          front: '../../../fabric/welded-wire/asm-fabric-welded-wire-frame.svg',
          back: null,
        },
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-incised',
          trim: 'none',
          capMode: 'match-rails',
          fabricWireGrid: 'grid-2',
          fabricWireFinish: 'galvanized',
        },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard welded wire — PT frame + 2T trim sandwich, 2″ galvanized mesh.',
        framePreset: null,
        assembly: {
          front: '../../../fabric/welded-wire/asm-fabric-welded-wire-frame.svg',
          back: null,
        },
        defaults: {
          ...MATERIAL_DEFAULTS,
          trim: 'pt-2t',
          capMode: 'match-rails',
          fabricWireGrid: 'grid-2',
          fabricWireFinish: 'galvanized',
        },
      },
    },
    'fabric-lattice': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum lattice — PT frame, composite panel, no trim sandwich.',
        framePreset: null,
        assembly: {
          front: '../../../fabric/lattice/asm-fabric-lattice-frame.svg',
          back: null,
        },
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-incised',
          trim: 'none',
          capMode: 'match-rails',
          fabricLatticeGrid: 'grid-2',
          fabricLatticeMaterial: 'composite',
        },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard lattice screen — PT frame + 2T trim sandwich, composite 2″ openings.',
        framePreset: null,
        assembly: {
          front: '../../../fabric/lattice/asm-fabric-lattice-frame.svg',
          back: null,
        },
        defaults: {
          ...MATERIAL_DEFAULTS,
          trim: 'pt-2t',
          capMode: 'match-rails',
          fabricLatticeGrid: 'grid-2',
          fabricLatticeMaterial: 'composite',
        },
      },
    },
    /** Placeholder — style disabled until CVNL geometry ships. */
    'vpf-composite-vinyl': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum composite / vinyl vertical picket. Coming soon.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', railCap: 'off' },
        disabled: true,
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard composite / vinyl vertical picket. Coming soon.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS },
        disabled: true,
      },
    },
    'hf-cross-buck': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum cross-buck — coming soon.',
        framePreset: null,
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
        disabled: true,
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard cross-buck line. Coming soon.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
        disabled: true,
      },
    },
    'hf-composite-vinyl': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum horizontal composite / vinyl. Coming soon.',
        framePreset: null,
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
        disabled: true,
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard horizontal composite / vinyl. Coming soon.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
        disabled: true,
      },
    },
    'fabric-chain-link': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum chain link.',
        framePreset: null,
        defaults: {
          posts: 'pt-incised',
          rails: 'pt-incised',
          trim: 'none',
          capMode: 'match-rails',
          fabricWireFinish: 'galvanized',
        },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard chain link.',
        framePreset: null,
        defaults: {
          ...MATERIAL_DEFAULTS,
          trim: 'none',
          capMode: 'match-rails',
          fabricWireFinish: 'galvanized',
        },
      },
    },
    'hand-wood-baluster': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum wood baluster guardrail.',
        framePreset: null,
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard wood baluster guardrail.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
      },
    },
    'hand-cable-metal': {
      base: {
        id: 'base',
        label: 'Base',
        slot: 'base',
        description: 'Minimum cable / metal guardrail.',
        framePreset: null,
        defaults: { posts: 'pt-incised', rails: 'pt-incised', trim: 'none', capMode: 'match-rails' },
      },
      default: {
        id: 'default',
        label: 'Default',
        slot: 'default',
        description: 'Standard cable / metal guardrail.',
        framePreset: null,
        defaults: { ...MATERIAL_DEFAULTS, trim: 'none', capMode: 'match-rails' },
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
