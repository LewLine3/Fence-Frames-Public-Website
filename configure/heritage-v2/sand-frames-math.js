/**
 * FenceBook Heritage V2 Configurator — Pure Math Calculation Engine
 * Location: public/configure/heritage-v2/sand-frames-math.js
 *
 * Implements:
 * Layer A: Geometry & Takeoff (linear ft, height, picket style, cap rail, gates)
 * Layer B: Component BOM Yields (Posts, 2x4 Rails, Cap Rails, Pickets, Concrete, Fasteners, Stain)
 * Layer C: Stock Cut-List Optimizer & Bottom-Up Financial Roll-Up (8% waste, labor multiplier, gate costs, price bounds)
 *
 * Dual-module format: Works seamlessly in Node.js (CommonJS) and browser contexts.
 */

(function (exports) {
  'use strict';

  // --- FASTENER OPTIONS ---
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

  // --- DEFAULT VENDOR SKU UNIT PRICES ---
  const DEFAULT_SKU_PRICES = {
    post: 15.50,         // 4x4x8' PT Incised Post ($15.50)
    rail: 8.00,          // 2x4x8' PT Incised Rail ($8.00)
    capRail: 8.00,       // 2x4x8' PT Incised Cap Rail ($8.00)
    picket1x6: 4.25,     // 1x6 (5.5") Cedar Picket ($4.25)
    picket1x4: 3.10,     // 1x4 (3.5") Cedar Picket ($3.10)
    concreteBag: 5.25,   // 60lb High-Strength Concrete Bag (2 per post)
    gravelBag: 4.85,     // 50lb Crushed Gravel Bag for post base (0.5 bag per post)
    framingFastener: 28.50,
    fillFastener: 54.00,
    trimFastener: 38.00,
    stainGallon: 45.00
  };

  // --- SEASONAL LABOR ADJUSTMENT FACTORS ---
  const SEASON_LABOR_ADJUSTMENTS = {
    summer: 1.00,
    spring: 1.10,
    fall: 1.10,
    winter: 1.25
  };

  // --- PICKET LAYOUT YIELD PROFILES ---
  const PICKET_PROFILES = {
    'heritage-cedar': { width: 5.5, gap: 1 / 16, picketsPerPanel: 16, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x6, label: '1x6 (5.5") Cedar - Heritage Privacy' },
    'craftsman-cedar': { width: 5.5, gap: 0.25, picketsPerPanel: 15, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x6, label: '1x6 (5.5") Cedar - Craftsman Cap Rail' },
    'modern-picket': { width: 3.5, gap: 0.5, picketsPerPanel: 21, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x4, label: '1x4 (3.5") Cedar - Modern Picket' },
    'horizontal-slatted': { width: 5.5, gap: 0.5, picketsPerPanel: 13, defaultSkuPrice: DEFAULT_SKU_PRICES.picket1x6, label: '1x6 Horizontal Slatted Cedar' }
  };

  // --- GATE PRICING CONSTANTS ---
  const GATE_COSTS = {
    man: 350.00,
    mower: 475.00,
    vehicle: 850.00
  };

  const STOCK_LUMBER_LENGTHS = [8, 10, 12, 16, 20];

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

  function calculateBOMTakeoff(config = {}) {
    const lnFt = Number(config.lnFt || 0);
    const height = Number(config.height || 6);
    const geometry = calculateFenceGeometry({ lnFt });
    const { panels, posts } = geometry;

    const styleKey = config.styleKey || 'heritage-cedar';
    const picketProfile = PICKET_PROFILES[styleKey] || PICKET_PROFILES['heritage-cedar'];

    const railsPerPanel = config.railsPerPanel !== undefined ? Number(config.railsPerPanel) : (height >= 6 ? 3 : 2);
    const capRailEnabled = Boolean(config.capRail);
    const includeStain = config.includeStain !== false;

    const qPost = posts;
    const qRail = panels * railsPerPanel;
    const qCapRail = capRailEnabled ? panels : 0;
    const qPicket = panels * picketProfile.picketsPerPanel;

    const qConcreteBags = posts * 2;
    const qGravelBags = Math.ceil(posts * 0.5);

    const framingOption = FASTENER_OPTIONS.framing['exterior-screws'];
    const fillOption = FASTENER_OPTIONS.fill['stainless-ring-shank'];
    const trimOption = FASTENER_OPTIONS.trim['stainless-trim-nails'];

    const qFramingBoxes = Math.ceil(lnFt / 50);
    const qFillBoxes = Math.ceil(lnFt / 100);
    const qTrimBoxes = capRailEnabled ? Math.ceil(lnFt / 100) : 0;

    const rawStainCoverage = (lnFt * height * 2.2) / 150;
    const qStainGallons = includeStain ? Math.ceil(Number(rawStainCoverage.toFixed(6))) : 0;

    const prices = { ...DEFAULT_SKU_PRICES, ...config.customSkuPrices };
    const picketPrice = picketProfile.defaultSkuPrice;

    const items = [
      { id: 'post', label: '4x4x8\' PT Posts', qty: qPost, unit: 'post', unitPrice: prices.post, totalCost: qPost * prices.post },
      { id: 'rail', label: '2x4x8\' PT Rails', qty: qRail, unit: 'rail', unitPrice: prices.rail, totalCost: qRail * prices.rail },
      { id: 'capRail', label: '2x4x8\' Cap Rail', qty: qCapRail, unit: 'rail', unitPrice: prices.capRail, totalCost: qCapRail * prices.capRail },
      { id: 'picket', label: picketProfile.label, qty: qPicket, unit: 'picket', unitPrice: picketPrice, totalCost: qPicket * picketPrice },
      { id: 'concrete', label: '60lb Concrete Bags', qty: qConcreteBags, unit: 'bag', unitPrice: prices.concreteBag, totalCost: qConcreteBags * prices.concreteBag },
      { id: 'gravel', label: '50lb Crushed Gravel Bags', qty: qGravelBags, unit: 'bag', unitPrice: prices.gravelBag, totalCost: qGravelBags * prices.gravelBag },
      { id: 'framingFastener', label: `Framing: ${framingOption.label}`, qty: qFramingBoxes, unit: 'box', unitPrice: framingOption.price, totalCost: qFramingBoxes * framingOption.price },
      { id: 'fillFastener', label: `Picket Fill: ${fillOption.label}`, qty: qFillBoxes, unit: 'box', unitPrice: fillOption.price, totalCost: qFillBoxes * fillOption.price },
      { id: 'stain', label: 'Wood Stain Gallons', qty: qStainGallons, unit: 'gallon', unitPrice: prices.stainGallon, totalCost: qStainGallons * prices.stainGallon }
    ];

    const netMaterialCost = items.reduce((sum, item) => sum + item.totalCost, 0);

    return {
      geometry,
      picketProfile,
      quantities: {
        posts: qPost,
        rails: qRail,
        capRails: qCapRail,
        pickets: qPicket,
        concreteBags: qConcreteBags,
        gravelBags: qGravelBags,
        screwBoxes: qFramingBoxes,
        ringShankNailBoxes: qFillBoxes,
        stainGallons: qStainGallons
      },
      items,
      netMaterialCost
    };
  }

  function calculateFinancialRollup(bomResult, options = {}) {
    const netMaterialCost = bomResult?.netMaterialCost || 0;
    const lnFt = bomResult?.geometry?.lnFt || 1;

    const manGates = Number(options.manGates || 0);
    const mowerGates = Number(options.mowerGates || 0);
    const vehicleGates = Number(options.vehicleGates || 0);

    const seasonKey = String(options.season || 'summer').toLowerCase();
    const seasonFactor = SEASON_LABOR_ADJUSTMENTS[seasonKey] || 1.00;

    const wasteBufferFactor = 1.08;
    const baseLaborMultiplier = 2.50;
    const laborMultiplier = baseLaborMultiplier * seasonFactor;

    const adminFeeFactor = 1.05;
    const lowBoundFactor = 0.95;
    const highBoundFactor = 1.16;

    const cMaterial = netMaterialCost;
    const cMatBuffered = cMaterial * wasteBufferFactor;
    const cInstalledBase = cMatBuffered * laborMultiplier;
    const cGates = (manGates * GATE_COSTS.man) + (mowerGates * GATE_COSTS.mower) + (vehicleGates * GATE_COSTS.vehicle);

    const cSub = (cInstalledBase + cGates) * adminFeeFactor;

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
      }
    };
  }

  function calculateFenceProject(input = {}) {
    const bom = calculateBOMTakeoff(input);
    const financials = calculateFinancialRollup(bom, input);

    return {
      bom,
      financials
    };
  }

  exports.DEFAULT_SKU_PRICES = DEFAULT_SKU_PRICES;
  exports.PICKET_PROFILES = PICKET_PROFILES;
  exports.GATE_COSTS = GATE_COSTS;
  exports.calculateFenceGeometry = calculateFenceGeometry;
  exports.calculateBOMTakeoff = calculateBOMTakeoff;
  exports.calculateFinancialRollup = calculateFinancialRollup;
  exports.calculateFenceProject = calculateFenceProject;

})(typeof exports !== 'undefined' ? exports : (typeof window !== 'undefined' ? (window.SandFramesMath = {}) : this));
