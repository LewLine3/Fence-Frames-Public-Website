/**
 * BOM calculator — browser-safe material list for the Heritage configurator.
 *
 * Design intent:
 *   - Pure function(s): take (state, encyclopedia) and return counted line items.
 *   - No Node-only imports; use a tiny, hand-ported lookup for picket counts.
 *   - Never invent layout numbers; the picket counts below are copied from
 *     scripts/lib/picket-layout.js for the 89.375" Heritage picket field.
 */
(function initBomCalculator(global) {
  const DEFAULT_POST_SPACING = 8; // feet
  const DEFAULT_FENCE_HEIGHT_IN = 72; // 6'
  const PANELS_LENGTH_LOOKUP = {
    '8ft': 8,
    '6ft': 6,
    '4ft': 4,
    '10ft': 10,
    '12ft': 12,
  };

  /**
   * Picket counts per panel for the fixed 89.375" Heritage picket field.
   * Source: scripts/lib/picket-layout.js picketPositionsInField on a 6' height.
   *   Width 5.5 (1x6): 1-16-privacy=16, gap-0-5=14, gap-1=12, gap-3=9, gap-5-5=7
   *   Width 3.5 (1x4): 1-16-privacy=23, gap-0-5=20, gap-1=18, gap-3=12
   */
  const PICKET_COUNTS_BY_WIDTH_SPACING = {
    '5.5': {
      '1-16-privacy': 16,
      'gap-0-5': 14,
      'gap-1': 12,
      'gap-3': 9,
      'gap-5-5': 7,
    },
    '3.5': {
      '1-16-privacy': 23,
      'gap-0-5': 20,
      'gap-1': 18,
      'gap-3': 12,
    },
  };

  function picketCountFor(width, spacing) {
    const bySpacing = PICKET_COUNTS_BY_WIDTH_SPACING[width] || PICKET_COUNTS_BY_WIDTH_SPACING['5.5'];
    return bySpacing[spacing] || bySpacing['1-16-privacy'];
  }

  function picketWidthFromState(state) {
    // state.picketWidth is the UI config; default to 5.5" if not set.
    const width = state && state.picketWidth;
    if (width === '3.5' || width === '1x4') return '3.5';
    return '5.5';
  }

  function picketSpacingFromState(state) {
    // Si View default; UI may evolve to expose more spacings later.
    return (state && state.picketSpacing) || '1-16-privacy';
  }

  function panelLengthFt(state) {
    if (!state) return DEFAULT_POST_SPACING;
    const val = state.panelLength || state.postSpacing;
    if (val && PANELS_LENGTH_LOOKUP[val]) return PANELS_LENGTH_LOOKUP[val];
    const num = Number(val);
    if (Number.isFinite(num) && num > 0) return num;
    return DEFAULT_POST_SPACING;
  }

  function countPanelsAndPosts(state) {
    const lnFt = Math.max(
      0,
      Number((state && state.lnFt) || (state && state.totalLnFt)) || 0
    );
    if (lnFt <= 0) return { panels: 0, posts: 0, lnFt };
    const panelFt = panelLengthFt(state);
    const panels = Math.max(1, Math.ceil(lnFt / panelFt));
    const posts = panels + 1;
    return { panels, posts, lnFt };
  }

  function qtyFor(row, counts, state) {
    const basis = row.qtyBasis;
    if (!basis || basis === 'fixed') {
      return { qty: Number(row.qtyRate) || 0, basisNote: 'fixed' };
    }
    if (basis === 'perPost') {
      if (row.encyclopediaId === 'topsoil-remediation-bag' || row.encyclopediaId === 'beauty-bark-remediation-bag') {
        const level = (state && (state.remediationLevel || state.remediation)) || 'none';
        if (level === 'none') {
          return { qty: 0, basisNote: 'remediation disabled' };
        }
        const rate = level === 'light' ? 1.0 : 2.0;
        const count = Math.ceil(rate * counts.posts);
        return {
          qty: count,
          basisNote: level === 'light' ? '1 bag per post (light 1:2 to concrete)' : '2 bags per post (full 1:1 to concrete)',
        };
      }
      return { qty: (Number(row.qtyRate) || 1) * counts.posts, basisNote: 'per post' };
    }
    if (basis === 'perPanel') {
      return { qty: (Number(row.qtyRate) || 1) * counts.panels, basisNote: 'per panel' };
    }
    if (basis === 'perLf') {
      return { qty: (Number(row.qtyRate) || 1) * counts.lnFt, basisNote: 'per linear foot' };
    }
    if (basis === 'perPicket') {
      const width = picketWidthFromState(state);
      const spacing = picketSpacingFromState(state);
      const perPanel = picketCountFor(width, spacing);
      return {
        qty: (Number(row.qtyRate) || 1) * perPanel * counts.panels,
        basisNote: `${perPanel} per ${width}″ panel`,
      };
    }
    if (basis === 'coverage') {
      // Stain / coverage items: we don't have a coverage rate yet, so return a note
      // rather than a bogus quantity.
      return {
        qty: null,
        basisNote: 'Coverage rate not set',
        coverageHint: row.qtyCoverageNotes || 'Needs SKU/coverage before quantity can be calculated.',
      };
    }
    return { qty: 0, basisNote: 'unknown basis' };
  }

  function rowById(rows, id) {
    return rows.find((r) => r.encyclopediaId === id) || null;
  }

  function activeRowsForState(rows, groups, state) {
    const candidates = rows.filter((row) => row.heritagePilot && row.qtyBasis);

    // Pick the active picket width; suppress the other width row.
    const activeWidth = picketWidthFromState(state);
    const widthSuppressed = activeWidth === '3.5' ? 'picket-cedar-flat-1x6' : 'picket-cedar-flat-1x4';

    return candidates.filter((row) => {
      if (row.encyclopediaId === widthSuppressed) return false;
      // Include hardware rows even if they are not listed in blueprintGroups.
      if (row.blueprintGroup === 'hardware') return true;
      // Include any row whose group lists it as a component (e.g. rail cap).
      const group = groups && groups[row.blueprintGroup];
      if (!group) return false;
      return (group.encyclopediaIds || []).includes(row.encyclopediaId);
    });
  }

  function extractUnitPrice(row) {
    if (!row || !row.vendorPricing) return null;
    const vp = row.vendorPricing;
    if (vp.homeDepot && typeof vp.homeDepot.price === 'number' && vp.homeDepot.price > 0) {
      return vp.homeDepot.price;
    }
    for (const key of ['lowes', 'dunnLumber', 'chinook']) {
      if (vp[key] && typeof vp[key].price === 'number' && vp[key].price > 0) {
        return vp[key].price;
      }
    }
    return null;
  }

  /**
   * Build a material list for the current build state.
   *
   * @param {object} state - Configurator state (lnFt, picketWidth, picketSpacing, panelLength, etc.)
   * @param {object} encyclopedia - Registry object with rows[] and blueprintGroups{}.
   * @returns {Array<{
   *   encyclopediaId: string,
   *   displayName: string,
   *   blueprintGroup: string,
   *   unit: string,
   *   qty: number|null,
   *   basisNote: string,
   *   bigBoxSku: string|null,
   *   skuStatus: string,
   *   unitPrice: number|null,
   *   lineMaterialCost: number,
   *   coverageHint?: string,
   *   vendorPricing?: {
   *     homeDepot?: {sku: string, price: number},
   *     lowes?: {sku: string, price: number},
   *     dunnLumber?: {sku: string, price: number},
   *     chinook?: {sku: string, price: number}
   *   }
   * }>}
   */
  function computeMaterialList(state, encyclopedia) {
    const rows = (encyclopedia && encyclopedia.rows) || [];
    const groups = (encyclopedia && encyclopedia.blueprintGroups) || {};
    const counts = countPanelsAndPosts(state);
    if (counts.panels === 0) return [];

    const active = activeRowsForState(rows, groups, state);
    return active.map((row) => {
      const qtyInfo = qtyFor(row, counts, state);
      const unitPrice = extractUnitPrice(row);
      const qty = qtyInfo.qty;
      let lineMaterialCost = 0;
      if (unitPrice != null) {
        lineMaterialCost = (qty != null && qty > 0) ? qty * unitPrice : unitPrice;
      }

      return {
        encyclopediaId: row.encyclopediaId,
        displayName: row.displayName,
        blueprintGroup: row.blueprintGroup,
        unit: row.unit || 'ea',
        qty: qtyInfo.qty,
        basisNote: qtyInfo.basisNote,
        bigBoxSku: row.bigBoxSku || null,
        skuStatus: row.skuStatus || 'needs-sku',
        unitPrice: unitPrice,
        lineMaterialCost: Number(lineMaterialCost.toFixed(2)),
        coverageHint: qtyInfo.coverageHint || undefined,
        vendorPricing: row.vendorPricing || null,
      };
    });
  }

  /**
   * Convenience: format qty as a readable string with optional "~" when coverage is not known.
   */
  function formatQty(line) {
    if (line.qty == null) return '—';
    return Number.isInteger(line.qty) ? String(line.qty) : line.qty.toFixed(2);
  }

  global.BomCalculator = {
    computeMaterialList,
    formatQty,
    extractUnitPrice,
    PICKET_COUNTS_BY_WIDTH_SPACING,
    DEFAULT_POST_SPACING,
  };
})(typeof window !== 'undefined' ? window : global);
