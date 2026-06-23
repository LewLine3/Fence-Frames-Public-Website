/**
 * Fence Frames configurator — estimate math (placeholder rates; tune in Airtable later).
 */
(function initPilotPricing(global) {
  const DISCLAIMER =
    'Prices are an estimate and not final or guaranteed. Contractors partnered with Fence-Frames are encouraged to offer bids within this range, but we allow each contractor the final decision. Their pricing can vary due to factors we can\'t predict, including but not limited to terrain, scheduling, seasons, weather, Lumber Market, etc.';

  /** $/linear foot — frame preset / template base (includes default PT incised frame). */
  const BASE_PER_LF = {
    'heritage-vpf': 42,
    traditions: 36,
    lineage: 44,
    legacy: 48,
    base: 36,
    default: 42,
    rancher: 38,
    homesteader: 28,
    statesmen: 42,
    forester: 32,
    'vpf-natural-wood': 42,
    'hf-board-fence': 36,
    'hf-split-rail': 28,
  };

  /** Absolute minimum spec per style — upgrades vs this show +$/lf; optional add-ons always list rate when active. */
  const ABSOLUTE_BASE = {
    'vpf-natural-wood': {
      postsUi: 'pt-incised',
      railsUi: 'pt-incised',
      trim: 'none',
      railCap: 'off',
      postCaps: 'none',
      brackets: 'none',
      picketFill: 'standard',
    },
    'hf-board-fence': {
      postsUi: 'pt-incised',
      railsUi: 'pt-incised',
      trim: 'none',
      railCap: 'off',
      postCaps: 'none',
      brackets: 'none',
      picketFill: 'standard',
    },
    'hf-split-rail': {
      postsUi: 'pt-incised',
      railsUi: 'pt-incised',
      trim: 'none',
      railCap: 'off',
      postCaps: 'none',
      brackets: 'none',
      picketFill: 'standard',
    },
  };

  /** $/linear foot marginal uplift vs baseline PT incised (material + install + overhead share). */
  const POSTS_DELTA = { 'pt-incised': 0, 'pt-appearance': 0.85, cedar: 3.5 };
  const RAILS_DELTA = { 'pt-incised': 0, 'pt-appearance': 0.85, cedar: 2.25 };
  const TRIM_DELTA = {
    none: 0,
    'cedar-1t': 2.5,
    'cedar-2t': 4.75,
    'pt-1t': 1.25,
    'pt-2t': 2.5,
    'pt-3t': 3.75,
    'cedar-3t': 6.5,
  };
  const PICKET_FILL_DELTA = { standard: 0, shadowbox: 5.5, 'board-on-board': 8.5 };
  const CLIENT_JOB_DELTA = { repair: 4.5, demo: 6.5 };

  /**
   * Rail cap — one 2×4 spans ~8′ between posts (96″ interior bay).
   * PT base = material + install labor per board, amortized to $/lf.
   * Cedar = PT base + $1–2/board material premium (shop norm).
   */
  const CAP_FT_PER_BOARD = 8;
  const RAIL_CAP_PT = {
    materialPerBoard: 4.5,
    laborPerBoard: 5.5,
  };
  /** Cedar 2×4 cap material premium vs PT 2×4 (typically $1–2/board). */
  const RAIL_CAP_CEDAR_MATERIAL_PREMIUM_PER_BOARD = 1.5;
  /** PT appearance-grade 2×4 premium vs incised when cap resolves to appearance PT. */
  const RAIL_CAP_PT_APPEARANCE_PREMIUM_PER_BOARD = 0.35;

  const POST_CAP_DELTA = {
    none: 0,
    cedar: 2.75,
    metal: 4.5,
    solar: 14,
    copper: 9.5,
  };
  const BRACKET_DELTA = {
    none: 0,
    'u-black': 1.5,
    'u-galv': 1.75,
    'l-1': 0.85,
    'l-2': 1.1,
    'l-4': 1.65,
    'l-6': 2.25,
    'poly-u': 2.5,
    'wood-2x2': 1.25,
    'wood-2x4': 1.85,
  };

  function resolveAbsoluteBase(input) {
    const styleId = input.styleId || input.pilotId || 'vpf-natural-wood';
    return ABSOLUTE_BASE[styleId] || ABSOLUTE_BASE['vpf-natural-wood'];
  }

  function resolveBaseKey(input) {
    if (input.framePreset && BASE_PER_LF[input.framePreset] != null) return input.framePreset;
    if (input.templateId && BASE_PER_LF[input.templateId] != null) return input.templateId;
    if (input.styleId && BASE_PER_LF[input.styleId] != null) return input.styleId;
    return input.pilotId || 'heritage-vpf';
  }

  function money(n) {
    const v = Math.round(n * 100) / 100;
    return v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  function deltaLabel(amount) {
    if (!amount || Math.abs(amount) < 0.005) return '';
    const sign = amount > 0 ? '+' : '−';
    return `${sign}${money(Math.abs(amount))}`;
  }

  function perLfLabel(amount) {
    if (!amount || Math.abs(amount) < 0.005) return '';
    return `${deltaLabel(amount)}/lf`;
  }

  function legacyRailsFromUi(railsUi) {
    return railsUi === 'cedar' ? 'cedar' : 'pt';
  }

  function trimPackageMaterial(trim) {
    if (!trim || trim === 'none') return null;
    if (trim.startsWith('cedar-')) return 'cedar';
    if (trim.startsWith('pt-')) return 'pt';
    return null;
  }

  /** Mirror heritage-configurator resolveRailCapMaterial for pricing. */
  function resolveRailCapMaterialForPricing(input) {
    const mode = input.capMode || 'match-rails';
    const railsUi = input.railsUi || 'pt-incised';
    const rails = legacyRailsFromUi(railsUi);
    if (mode === 'cedar') return 'cedar';
    if (mode === 'pt') {
      return railsUi === 'pt-appearance' ? 'pt-appearance' : 'pt-incised';
    }
    if (mode === 'match-rails') {
      if (rails === 'cedar') return 'cedar';
      return railsUi === 'pt-appearance' ? 'pt-appearance' : 'pt-incised';
    }
    const trimMat = trimPackageMaterial(input.trim);
    if (trimMat === 'cedar') return 'cedar';
    if (trimMat === 'pt') {
      return railsUi === 'pt-appearance' ? 'pt-appearance' : 'pt-incised';
    }
    if (rails === 'cedar') return 'cedar';
    return railsUi === 'pt-appearance' ? 'pt-appearance' : 'pt-incised';
  }

  function railCapDelta(input) {
    if (input.railCap !== 'on') return 0;
    const mat = input.railCapMaterial || resolveRailCapMaterialForPricing(input);
    const boardsPerLf = 1 / CAP_FT_PER_BOARD;
    let perBoard =
      RAIL_CAP_PT.materialPerBoard + RAIL_CAP_PT.laborPerBoard;
    if (mat === 'cedar') {
      perBoard += RAIL_CAP_CEDAR_MATERIAL_PREMIUM_PER_BOARD;
    } else if (mat === 'pt-appearance') {
      perBoard += RAIL_CAP_PT_APPEARANCE_PREMIUM_PER_BOARD;
    }
    return Math.round(perBoard * boardsPerLf * 100) / 100;
  }

  function railCapBreakdownLabel(input) {
    if (input.railCap !== 'on') return 'Rail cap';
    const mat = input.railCapMaterial || resolveRailCapMaterialForPricing(input);
    if (mat === 'cedar') return 'Rail cap (cedar 2×4)';
    if (mat === 'pt-appearance') return 'Rail cap (PT appearance 2×4)';
    return 'Rail cap (PT 2×4)';
  }

  function postCapDelta(input) {
    const key = input.postCaps || 'none';
    return POST_CAP_DELTA[key] ?? 0;
  }

  function bracketDelta(input) {
    const key = input.brackets || 'none';
    return BRACKET_DELTA[key] ?? 0;
  }

  /**
   * @param {object} input
   * @returns {{ total: number, perLf: number, lnFt: number, basePerLf: number, panels: Record<string, number>, perLfDeltas: Record<string, number>, breakdown: string[] }}
   */
  function computeEstimate(input) {
    const lnFt = Math.max(0, Number(input.lnFt) || 0);
    const baseKey = resolveBaseKey(input);
    const basePerLf = BASE_PER_LF[baseKey] ?? BASE_PER_LF['heritage-vpf'];

    const postsUi = input.postsUi || 'pt-incised';
    const railsUi = input.railsUi || 'pt-incised';
    const trim = input.trim || 'none';
    const picketFill = input.picketFill || 'standard';

    const postsDelta = POSTS_DELTA[postsUi] ?? 0;
    const railsDelta = RAILS_DELTA[railsUi] ?? 0;
    const trimDelta = TRIM_DELTA[trim] ?? 0;
    const picketDelta =
      input.picketsEnabled !== false ? PICKET_FILL_DELTA[picketFill] ?? 0 : 0;
    const capDelta = railCapDelta(input);
    const capMaterial =
      input.railCap === 'on'
        ? input.railCapMaterial || resolveRailCapMaterialForPricing(input)
        : null;
    const pcDelta = postCapDelta(input);
    const bracketD = bracketDelta(input);

    let clientDelta = 0;
    if (input.jobRepair) clientDelta += CLIENT_JOB_DELTA.repair;
    if (input.fenceDemo) clientDelta += CLIENT_JOB_DELTA.demo;

    const perLf =
      basePerLf +
      postsDelta +
      railsDelta +
      trimDelta +
      picketDelta +
      capDelta +
      pcDelta +
      bracketD +
      clientDelta;
    const total = perLf * lnFt;

    const perLfDeltas = {
      TBC: clientDelta,
      TBPV: 0,
      TBPG: 0,
      TBPP: postsDelta,
      TBPR: railsDelta,
      TBPF: picketDelta,
      TBPT: trimDelta,
      TBPS: 0,
      TBPC: capDelta,
      TBPE: bracketD,
      POST_CAPS: pcDelta,
      B2: 0,
    };

    const panels = {
      TBC: clientDelta * lnFt,
      TBPV: 0,
      TBPG: 0,
      TBPP: postsDelta * lnFt,
      TBPR: railsDelta * lnFt,
      TBPF: picketDelta * lnFt,
      TBPT: trimDelta * lnFt,
      TBPS: 0,
      TBPC: capDelta * lnFt,
      TBPE: bracketD * lnFt,
      POST_CAPS: pcDelta * lnFt,
      B2: 0,
    };

    const breakdown = [
      `Base (${baseKey}) · ${money(basePerLf)}/lf × ${lnFt}′ = ${money(basePerLf * lnFt)}`,
    ];
    if (postsDelta) breakdown.push(`Posts · ${perLfLabel(postsDelta)} × ${lnFt}′ = ${money(postsDelta * lnFt)}`);
    if (railsDelta) breakdown.push(`Rails · ${perLfLabel(railsDelta)} × ${lnFt}′ = ${money(railsDelta * lnFt)}`);
    if (trimDelta) breakdown.push(`Trim · ${perLfLabel(trimDelta)} × ${lnFt}′ = ${money(trimDelta * lnFt)}`);
    if (picketDelta) breakdown.push(`Pickets · ${perLfLabel(picketDelta)} × ${lnFt}′ = ${money(picketDelta * lnFt)}`);
    if (capDelta) {
      breakdown.push(
        `${railCapBreakdownLabel(input)} · ${perLfLabel(capDelta)} × ${lnFt}′ = ${money(capDelta * lnFt)}`
      );
    }
    if (pcDelta) breakdown.push(`Post caps · ${perLfLabel(pcDelta)} × ${lnFt}′ = ${money(pcDelta * lnFt)}`);
    if (bracketD) breakdown.push(`Brackets · ${perLfLabel(bracketD)} × ${lnFt}′ = ${money(bracketD * lnFt)}`);
    if (clientDelta) breakdown.push(`Job site · ${perLfLabel(clientDelta)} × ${lnFt}′ = ${money(clientDelta * lnFt)}`);

    return {
      total,
      perLf,
      lnFt,
      basePerLf,
      baseKey,
      railCapMaterial: capMaterial,
      perLfDeltas,
      panels,
      breakdown,
    };
  }

  /**
   * Homeowner display range — monetization_rules.md (±15% on quoted_mid).
   * Pilot maps $/LF total → quoted_mid until W1 BOM backcheck replaces rates.
   */
  function computeQuoteRange(input) {
    const est = computeEstimate(input);
    const quoted_mid = est.total;
    const display_low = Math.round(quoted_mid * 0.85 * 100) / 100;
    const display_high = Math.round(quoted_mid * 1.15 * 100) / 100;
    return {
      ...est,
      quoted_mid,
      display_low,
      display_high,
    };
  }

  function formatQuoteRange(quote) {
    if (!quote || !(quote.lnFt > 0)) return '—';
    return `${money(quote.display_low)} – ${money(quote.display_high)}`;
  }

  global.PilotPricing = {
    DISCLAIMER,
    BASE_PER_LF,
    ABSOLUTE_BASE,
    CLIENT_JOB_DELTA,
    TRIM_DELTA,
    CAP_FT_PER_BOARD,
    RAIL_CAP_PT,
    RAIL_CAP_CEDAR_MATERIAL_PREMIUM_PER_BOARD,
    POST_CAP_DELTA,
    BRACKET_DELTA,
    money,
    deltaLabel,
    perLfLabel,
    resolveBaseKey,
    resolveAbsoluteBase,
    resolveRailCapMaterialForPricing,
    railCapDelta,
    computeEstimate,
    computeQuoteRange,
    formatQuoteRange,
  };
})(typeof window !== 'undefined' ? window : global);
