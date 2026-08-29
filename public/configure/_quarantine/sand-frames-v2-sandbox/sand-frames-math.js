/**
 * Sand Frames App — Pure Math Calculation Engine
 * Sandbox module: FenceBook/public/configure/heritage-v2-sandbox/sand-frames-math.js
 *
 * Implements the 3-Layer Component Encyclopedia & Material Vendor SKU Spine architecture:
 * Layer A: Geometry & Slot Takeoff (lnFt, height, picket style, cap rail, gates)
 * Layer B: Component BOM Yields (Posts, 2x4 Rails, Cap Rails, Pickets, Concrete, Fasteners, Stain)
 * Layer C: Stock Cut-List Optimizer & Bottom-Up Financial Roll-Up (+6% waste, 2.1x labor, 5% admin, 0.95x-1.12x bounds)
 *
 * Dual-module format: Works seamlessly in Node.js (CommonJS) and browser contexts.
 */

(function (exports) {
  'use strict';

  // --- FASTENER OPTIONS (3-TIER SYSTEM WITH STAINLESS STEEL OPTIONS) ---
  const FASTENER_OPTIONS = {
    framing: {
      'exterior-screws': { label: '#8-#10 Exterior Coated Screws (3")', price: 28.50, unit: 'box' },
      'hdg-framing-nails': { label: '10.5-12 ga HDG Framing Nails', price: 32.00, unit: 'box' },
      'stainless-framing-nails': { label: '10.5-12 ga Stainless Steel Framing Nails', price: 78.00, unit: 'box' }
    },
    fill: {
      'hdg-ring-shank': { label: '12-15 ga HDG Ring Shank Siding Nails', price: 26.00, unit: 'box' },
      'stainless-ring-shank': { label: '12-15 ga Stainless Steel Ring Shank Siding Nails', price: 54.00, unit: 'box' }
    },
    trim: {
      'galv-trim-nails': { label: '15 ga Electro-Galv Trim Nails', price: 18.00, unit: 'box' },
      'stainless-trim-nails': { label: '15 ga Stainless Steel Trim Nails', price: 38.00, unit: 'box' }
    }
  };

  // --- DEFAULT VENDOR SKU UNIT PRICES (Ground-Truth Baseline) ---
  const DEFAULT_SKU_PRICES = {
    post: 15.50,         // 4x4x8' PT Incised Post ($15.50)
    rail: 8.00,          // 2x4x8' PT Incised Rail ($8.00)
    capRail: 8.00,       // 2x4x8' PT Incised Cap Rail ($8.00)
    picket1x6: 4.25,     // 1x6 (5.5") Cedar Picket ($4.25)
    picket1x4: 3.10,     // 1x4 (3.5") Cedar Picket ($3.10)
    concreteBag: 5.25,   // 60lb High-Strength Concrete Bag (2 per post)
    gravelBag: 4.85,     // 50lb Crushed Gravel / Rock Bag for post base (0.5 bag per post)
    framingFastener: 28.50, // Framing Fasteners (Exterior Coated Screws)
    fillFastener: 54.00,    // Fill Fasteners (12-15 ga Stainless Steel Ring Shank Siding Nails)
    trimFastener: 38.00,    // Trim Fasteners (15 ga Stainless Steel Trim Nails)
    stainGallon: 45.00,  // Wood Stain (gallon per ~150 sq ft coverage)
    topsoilBag: 2.87,    // Topsoil 1 cu ft bag for ground remediation
    beautyBarkBag: 3.97  // Beauty Bark 2 cu ft bag for ground remediation
  };

  // --- SEASONAL LABOR ADJUSTMENT FACTORS ---
  const SEASON_LABOR_ADJUSTMENTS = {
    summer: 1.00, // Baseline dry summer build conditions
    spring: 1.10, // Rain delays & wet soil (+10% labor time)
    fall: 1.10,   // Rain & decreasing daylight (+10% labor time)
    winter: 1.25  // Muddy/frozen soil, short daylight, heavy rain (+25% labor time)
  };

  // --- PICKET LAYOUT YIELD PROFILES ---
  const PICKET_PROFILES = {
    '1x6-privacy': { width: 5.5, gap: 1 / 16, picketsPerPanel: 16, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x6, label: '1x6 (5.5") Cedar - Privacy (1/16" gap)' },
    '1x6-gap-0.5': { width: 5.5, gap: 0.5, picketsPerPanel: 14, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x6, label: '1x6 (5.5") Cedar - 1/2" Gap' },
    '1x6-gap-1.0': { width: 5.5, gap: 1.0, picketsPerPanel: 12, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x6, label: '1x6 (5.5") Cedar - 1" Gap' },
    '1x4-privacy': { width: 3.5, gap: 1 / 16, picketsPerPanel: 23, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x4, label: '1x4 (3.5") Cedar - Privacy (1/16" gap)' }
  };

  // --- GATE PRICING CONSTANTS ---
  const GATE_COSTS = {
    man: 350.00,
    mower: 475.00,
    vehicle: 850.00
  };

  // --- STOCK LUMBER LENGTHS (FT) ---
  const STOCK_LUMBER_LENGTHS = [8, 10, 12, 16, 20];

  /**
   * 1. Panel & Post Geometry
   * @param {Object} params
   * @param {number} params.lnFt - Total linear footage of fence run
   * @param {number} [params.panelLength=8] - Standard panel length in feet (default 8)
   * @returns {{ lnFt: number, panels: number, posts: number, panelLength: number }}
   */
  function calculateFenceGeometry(params) {
    const lnFt = Number(params?.lnFt || 0);
    const panelLength = Number(params?.panelLength || 8);
    if (lnFt <= 0) {
      return { lnFt: 0, panels: 0, posts: 0, panelLength };
    }
    const panels = Math.ceil(lnFt / panelLength);
    const posts = panels + 1;
    return { lnFt, panels, posts, panelLength };
  }

  /**
   * 2. Component Bill of Materials (BOM) Takeoff
   * @param {Object} config
   * @param {number} config.lnFt - Total linear footage
   * @param {number} [config.height=6] - Fence height in feet (default 6)
   * @param {string} [config.picketStyle='1x6-privacy'] - Key from PICKET_PROFILES
   * @param {boolean} [config.capRail=false] - Whether cap rail is enabled
   * @param {number} [config.railsPerPanel=3] - Number of horizontal 2x4 rails per panel
   * @param {boolean} [config.includeStain=true] - Whether stain coverage is included
   * @param {string} [config.framingFastener='exterior-screws'] - Key from FASTENER_OPTIONS.framing
   * @param {string} [config.fillFastener='stainless-ring-shank'] - Key from FASTENER_OPTIONS.fill
   * @param {string} [config.trimFastener='stainless-trim-nails'] - Key from FASTENER_OPTIONS.trim
   * @param {Object} [config.customSkuPrices] - Override prices for SKUs
   * @returns {Object} Full BOM Breakdown
   */
  function calculateBOMTakeoff(config = {}) {
    const lnFt = Number(config.lnFt || 0);
    const height = Number(config.height || 6);
    const geometry = calculateFenceGeometry({ lnFt });
    const { panels, posts } = geometry;

    const picketStyleKey = config.picketStyle || '1x6-privacy';
    const picketProfile = PICKET_PROFILES[picketStyleKey] || PICKET_PROFILES['1x6-privacy'];

    const railsPerPanel = config.railsPerPanel !== undefined ? Number(config.railsPerPanel) : (height >= 6 ? 3 : 2);
    const capRailEnabled = Boolean(config.capRail);
    const includeStain = config.includeStain !== false;

    // Component Quantities
    const qPost = posts;
    const qRail = panels * railsPerPanel;
    const qCapRail = capRailEnabled ? panels : 0;
    const qPicket = panels * picketProfile.picketsPerPanel;

    // Footing & Post Base
    const qConcreteBags = posts * 2; // 2x 60lb bags per post
    const qGravelBags = Math.ceil(posts * 0.5); // 0.5 bag (50lb/0.5 cu ft) crushed rock base per post

    // Fastener selections
    const framingOption = FASTENER_OPTIONS.framing[config.framingFastener] || FASTENER_OPTIONS.framing['exterior-screws'];
    const fillOption = FASTENER_OPTIONS.fill[config.fillFastener] || FASTENER_OPTIONS.fill['stainless-ring-shank'];
    const trimOption = FASTENER_OPTIONS.trim[config.trimFastener] || FASTENER_OPTIONS.trim['stainless-trim-nails'];

    const qFramingBoxes = Math.ceil(lnFt / 50);  // 1 box per 50 LF
    const qFillBoxes = Math.ceil(lnFt / 100);    // 1 box per 100 LF
    const qTrimBoxes = capRailEnabled ? Math.ceil(lnFt / 100) : 0;

    // Stain coverage: Surface area multiplier 2.2x (both sides + top/edges), 1 gal covers ~150 sq ft
    const rawStainCoverage = (lnFt * height * 2.2) / 150;
    const qStainGallons = includeStain ? Math.ceil(Number(rawStainCoverage.toFixed(6))) : 0;

    // Ground Remediation Bags (Light = 1 bag/post [1:2 concrete]; Full = 2 bags/post [1:1 concrete])
    const remediationLevel = config.remediationLevel || config.remediation || 'none';
    const remRate = remediationLevel === 'light' ? 1.0 : (remediationLevel === 'full' ? 2.0 : 0);
    const qTopsoilBags = Math.ceil(posts * remRate);
    const qBeautyBarkBags = Math.ceil(posts * remRate);

    // Prices (default or user overrides)
    const prices = { ...DEFAULT_SKU_PRICES, ...config.customSkuPrices };
    const picketPrice = config.customSkuPrices?.picket || (config.customSkuPrices?.[picketStyleKey === '1x4-privacy' ? 'picket1x4' : 'picket1x6']) || picketProfile.defaultSkuPrice;

    const items = [
      { id: 'post', label: '4x4x8\' PT Posts', qty: qPost, unit: 'post', unitPrice: prices.post, totalCost: qPost * prices.post },
      { id: 'rail', label: '2x4x8\' PT Rails', qty: qRail, unit: 'rail', unitPrice: prices.rail, totalCost: qRail * prices.rail },
      { id: 'capRail', label: '2x4x8\' Cap Rail', qty: qCapRail, unit: 'rail', unitPrice: prices.capRail, totalCost: qCapRail * prices.capRail },
      { id: 'picket', label: picketProfile.label, qty: qPicket, unit: 'picket', unitPrice: picketPrice, totalCost: qPicket * picketPrice },
      { id: 'concrete', label: '60lb Concrete Bags (2 per post)', qty: qConcreteBags, unit: 'bag', unitPrice: prices.concreteBag, totalCost: qConcreteBags * prices.concreteBag },
      { id: 'gravel', label: '50lb Crushed Gravel Bags (post base)', qty: qGravelBags, unit: 'bag', unitPrice: prices.gravelBag, totalCost: qGravelBags * prices.gravelBag },
      { id: 'framingFastener', label: `Framing: ${framingOption.label}`, qty: qFramingBoxes, unit: 'box', unitPrice: framingOption.price, totalCost: qFramingBoxes * framingOption.price },
      { id: 'fillFastener', label: `Picket Fill: ${fillOption.label}`, qty: qFillBoxes, unit: 'box', unitPrice: fillOption.price, totalCost: qFillBoxes * fillOption.price },
      { id: 'trimFastener', label: `Trim/Cap: ${trimOption.label}`, qty: qTrimBoxes, unit: 'box', unitPrice: trimOption.price, totalCost: qTrimBoxes * trimOption.price },
      { id: 'stain', label: 'Stain Gallons', qty: qStainGallons, unit: 'gallon', unitPrice: prices.stainGallon, totalCost: qStainGallons * prices.stainGallon }
    ];

    if (qTopsoilBags > 0) {
      items.push({ id: 'topsoil', label: `Topsoil Bags (${remediationLevel} remediation)`, qty: qTopsoilBags, unit: 'bag', unitPrice: prices.topsoilBag, totalCost: qTopsoilBags * prices.topsoilBag });
    }
    if (qBeautyBarkBags > 0) {
      items.push({ id: 'beautyBark', label: `Beauty Bark Bags (${remediationLevel} remediation)`, qty: qBeautyBarkBags, unit: 'bag', unitPrice: prices.beautyBarkBag, totalCost: qBeautyBarkBags * prices.beautyBarkBag });
    }

    const netMaterialCost = items.reduce((sum, item) => sum + item.totalCost, 0);

    return {
      geometry,
      picketProfile,
      fasteners: {
        framing: framingOption,
        fill: fillOption,
        trim: trimOption
      },
      quantities: {
        posts: qPost,
        rails: qRail,
        capRails: qCapRail,
        pickets: qPicket,
        concreteBags: qConcreteBags,
        gravelBags: qGravelBags,
        screwBoxes: qFramingBoxes,
        ringShankNailBoxes: qFillBoxes,
        trimFastenerBoxes: qTrimBoxes,
        stainGallons: qStainGallons,
        topsoilBags: qTopsoilBags,
        beautyBarkBags: qBeautyBarkBags
      },
      items,
      netMaterialCost
    };
  }

  /**
   * 3. Stock Length Cut-List Optimizer
   * Optimizes board purchasing for required cut lengths using First Fit Decreasing (FFD) strategy
   * over available stock lumber lengths (e.g. 8ft, 10ft, 12ft, 16ft, 20ft).
   *
   * @param {Object} params
   * @param {number[]} params.cuts - Array of required cut lengths in feet (e.g., [8, 8, 8, 6.5, 4.2])
   * @param {number[]} [params.stockLengths=[8, 10, 12, 16, 20]] - Available stock lengths in feet
   * @param {number} [params.kerf=0.125 / 12] - Saw blade kerf in feet (default 1/8 inch = 0.0104 ft)
   * @returns {Object} Optimization breakdown (purchased boards, scrap waste %, total stock ft, cut ft used)
   */
  function optimizeCutList(params = {}) {
    const rawCuts = params.cuts || [];
    const stockLengths = (params.stockLengths || STOCK_LUMBER_LENGTHS).slice().sort((a, b) => a - b);
    const kerf = params.kerf !== undefined ? Number(params.kerf) : (0.125 / 12); // 1/8" kerf in feet

    if (rawCuts.length === 0) {
      return {
        boardsPurchased: [],
        boardSummary: {},
        totalStockFt: 0,
        totalCutFtUsed: 0,
        scrapWasteFt: 0,
        scrapWastePct: 0
      };
    }

    // Filter valid cuts & sort descending for First Fit Decreasing
    const cuts = rawCuts.filter(c => Number(c) > 0).sort((a, b) => b - a);
    const maxStock = stockLengths[stockLengths.length - 1];

    // Verify all cuts fit in max stock length
    for (const cut of cuts) {
      if (cut > maxStock) {
        throw new Error(`Cut length ${cut}ft exceeds maximum stock length of ${maxStock}ft`);
      }
    }

    // We evaluate single-stock length strategies and a hybrid FFD bin-packing strategy to find minimum total stock ft
    let bestSolution = null;

    // Strategy A: Evaluate uniform stock length selection for each available stock length
    for (const stockLen of stockLengths) {
      const validCuts = cuts.filter(c => c <= stockLen);
      if (validCuts.length !== cuts.length) continue; // Skip if any cut is longer than this stock length

      const bins = [];
      for (const cut of cuts) {
        let placed = false;
        for (const bin of bins) {
          const spaceNeeded = bin.cuts.length > 0 ? (cut + kerf) : cut;
          if (bin.remainingSpace >= spaceNeeded) {
            bin.cuts.push(cut);
            bin.remainingSpace -= spaceNeeded;
            placed = true;
            break;
          }
        }
        if (!placed) {
          bins.push({
            stockLength: stockLen,
            cuts: [cut],
            remainingSpace: stockLen - cut
          });
        }
      }

      const totalStockFt = bins.length * stockLen;
      const totalCutFtUsed = cuts.reduce((sum, c) => sum + c, 0);
      const scrapWasteFt = Math.max(totalStockFt - totalCutFtUsed, 0);
      const scrapWastePct = totalStockFt > 0 ? (scrapWasteFt / totalStockFt) * 100 : 0;

      if (!bestSolution || totalStockFt < bestSolution.totalStockFt) {
        bestSolution = {
          bins,
          stockLen,
          totalStockFt,
          totalCutFtUsed,
          scrapWasteFt,
          scrapWastePct
        };
      }
    }

    // Strategy B: Flexible multi-stock FFD Bin Packing (choosing smallest stock length that fits remaining cuts in a bin)
    const flexBins = [];
    const remainingCuts = [...cuts];

    while (remainingCuts.length > 0) {
      // Pick largest remaining cut
      const firstCut = remainingCuts.shift();
      // Find smallest stock length that holds this cut
      const stockLen = stockLengths.find(l => l >= firstCut) || maxStock;
      const bin = {
        stockLength: stockLen,
        cuts: [firstCut],
        remainingSpace: stockLen - firstCut
      };

      // Try to pack as many of remaining cuts into this bin as possible
      for (let i = 0; i < remainingCuts.length;) {
        const nextCut = remainingCuts[i];
        const spaceNeeded = nextCut + kerf;
        if (bin.remainingSpace >= spaceNeeded) {
          bin.cuts.push(nextCut);
          bin.remainingSpace -= spaceNeeded;
          remainingCuts.splice(i, 1); // remove packed cut
        } else {
          i++;
        }
      }
      flexBins.push(bin);
    }

    const flexTotalStockFt = flexBins.reduce((sum, b) => sum + b.stockLength, 0);
    const flexTotalCutFt = cuts.reduce((sum, c) => sum + c, 0);
    const flexScrapFt = Math.max(flexTotalStockFt - flexTotalCutFt, 0);
    const flexScrapPct = flexTotalStockFt > 0 ? (flexScrapFt / flexTotalStockFt) * 100 : 0;

    if (!bestSolution || flexTotalStockFt < bestSolution.totalStockFt) {
      bestSolution = {
        bins: flexBins,
        stockLen: 'mixed',
        totalStockFt: flexTotalStockFt,
        totalCutFtUsed: flexTotalCutFt,
        scrapWasteFt: flexScrapFt,
        scrapWastePct: flexScrapPct
      };
    }

    // Format board summary counts e.g. { '8': 6, '16': 2 }
    const boardSummary = {};
    for (const bin of bestSolution.bins) {
      const lenKey = String(bin.stockLength);
      boardSummary[lenKey] = (boardSummary[lenKey] || 0) + 1;
    }

    return {
      boardsPurchased: bestSolution.bins,
      boardSummary,
      totalStockFt: bestSolution.totalStockFt,
      totalCutFtUsed: bestSolution.totalCutFtUsed,
      scrapWasteFt: Number(bestSolution.scrapWasteFt.toFixed(2)),
      scrapWastePct: Number(bestSolution.scrapWastePct.toFixed(2))
    };
  }

  /**
   * 4. Bottom-Up Financial Cost Roll-Up Engine
   * Applies 8% waste buffer, 2.50x labor multiplier, gate costs, 5% admin fee, and Low/High bounds (0.95x - 1.16x).
   *
   * @param {Object} bomResult - Result object from calculateBOMTakeoff
   * @param {Object} options
   * @param {number} [options.manGates=0] - Number of 4ft man gates ($350 each)
   * @param {number} [options.mowerGates=0] - Number of 5ft mower gates ($475 each)
   * @param {number} [options.vehicleGates=0] - Number of double vehicle gates ($850 each)
   * @param {number} [options.wasteBufferFactor=1.08] - Waste buffer multiplier (default 1.08 = 8%)
   * @param {number} [options.laborMultiplier=2.50] - Installed labor multiplier (default 2.50)
   * @param {number} [options.adminFeeFactor=1.05] - Admin fee multiplier (default 1.05 = 5%)
   * @param {number} [options.lowBoundFactor=0.95] - Low bound factor (default 0.95)
   * @param {number} [options.highBoundFactor=1.16] - High bound factor (default 1.16)
   * @returns {Object} Detailed Financial Summary & Price Bounds
   */
  function calculateFinancialRollup(bomResult, options = {}) {
    const netMaterialCost = bomResult?.netMaterialCost || 0;
    const lnFt = bomResult?.geometry?.lnFt || 1;

    const manGates = Number(options.manGates || 0);
    const mowerGates = Number(options.mowerGates || 0);
    const vehicleGates = Number(options.vehicleGates || 0);

    const seasonKey = String(options.season || 'summer').toLowerCase();
    const seasonFactor = SEASON_LABOR_ADJUSTMENTS[seasonKey] || 1.00;

    const wasteBufferFactor = options.wasteBufferFactor !== undefined ? Number(options.wasteBufferFactor) : 1.08;
    const baseLaborMultiplier = options.laborMultiplier !== undefined ? Number(options.laborMultiplier) : 2.50;
    const laborMultiplier = baseLaborMultiplier * seasonFactor;

    const adminFeeFactor = options.adminFeeFactor !== undefined ? Number(options.adminFeeFactor) : 1.05;
    const lowBoundFactor = options.lowBoundFactor !== undefined ? Number(options.lowBoundFactor) : 0.95;
    const highBoundFactor = options.highBoundFactor !== undefined ? Number(options.highBoundFactor) : 1.16;

    // Step 1: Net Material Cost ($C_material)
    const cMaterial = netMaterialCost;

    // Step 2: Waste Buffer ($C_mat_buffered)
    const cMatBuffered = cMaterial * wasteBufferFactor;

    // Step 3: Installed Base Cost ($C_installed_base)
    const cInstalledBase = cMatBuffered * laborMultiplier;

    // Step 4: Gate Add-Ons ($C_gates)
    const cGates = (manGates * GATE_COSTS.man) + (mowerGates * GATE_COSTS.mower) + (vehicleGates * GATE_COSTS.vehicle);

    // Step 5: Subtotal ($C_sub) with Admin Fee
    const cSub = (cInstalledBase + cGates) * adminFeeFactor;

    // Step 6: Low & High Estimate Range Bounds
    const cLow = cSub * lowBoundFactor;
    const cHigh = cSub * highBoundFactor;

    return {
      lnFt,
      gateBreakdown: {
        manGates,
        mowerGates,
        vehicleGates,
        totalGateCost: cGates
      },
      costs: {
        netMaterialCost: Number(cMaterial.toFixed(2)),
        bufferedMaterialCost: Number(cMatBuffered.toFixed(2)),
        installedBaseCost: Number(cInstalledBase.toFixed(2)),
        gateCost: Number(cGates.toFixed(2)),
        projectSubtotal: Number(cSub.toFixed(2)),
        lowBound: Number(cLow.toFixed(2)),
        highBound: Number(cHigh.toFixed(2)),
        lowPerLF: Number((cLow / lnFt).toFixed(2)),
        highPerLF: Number((cHigh / lnFt).toFixed(2)),
        midPerLF: Number((cSub / lnFt).toFixed(2))
      },
      factors: {
        wasteBufferFactor,
        laborMultiplier,
        adminFeeFactor,
        lowBoundFactor,
        highBoundFactor
      }
    };
  }

  /**
   * Combined Master Calculation Function: Fence Run -> BOM -> Stock Cut List -> Financials
   * @param {Object} input
   * @returns {Object} Complete Calculation Result
   */
  function calculateFenceProject(input = {}) {
    const bom = calculateBOMTakeoff(input);

    // Calculate cut list for rails (each panel requires 8ft rails)
    const railCuts = Array(bom.quantities.rails).fill(8);
    const cutListOptimization = optimizeCutList({ cuts: railCuts });

    const financials = calculateFinancialRollup(bom, input);

    return {
      bom,
      cutListOptimization,
      financials
    };
  }

  // Export functions to CommonJS module or global window/exports object
  exports.DEFAULT_SKU_PRICES = DEFAULT_SKU_PRICES;
  exports.FASTENER_OPTIONS = FASTENER_OPTIONS;
  exports.PICKET_PROFILES = PICKET_PROFILES;
  exports.GATE_COSTS = GATE_COSTS;
  exports.STOCK_LUMBER_LENGTHS = STOCK_LUMBER_LENGTHS;
  exports.calculateFenceGeometry = calculateFenceGeometry;
  exports.calculateBOMTakeoff = calculateBOMTakeoff;
  exports.optimizeCutList = optimizeCutList;
  exports.calculateFinancialRollup = calculateFinancialRollup;
  exports.calculateFenceProject = calculateFenceProject;

})(typeof exports !== 'undefined' ? exports : (typeof window !== 'undefined' ? (window.SandFramesMath = {}) : this));
