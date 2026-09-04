/**
 * Fence Frames — Canonical Bill of Materials (BOM) & Fastener Waste Engine
 * Governed by: Canon Heritage V1 Law, Handbook §05, §06, §18, ADR-001 §A5
 * 
 * Rules:
 * 1. Fastener Waste Logic: Canonical 33.33% Contractor Waste Buffer (+33.33% on all framing, picket, and trim fasteners).
 * 2. +1 Boundary Post Law: postCount = ceil(lf / effectiveSpan) + 1.
 * 3. Canonical Quote Formula:
 *    MC = Raw Material Cost from BOM (catalog × quantities)
 *    M  = MC × 1.25          (Tax, procurement, job-site delivery margin)
 *    L  = M × 2.0           (Labor = 2× burdened material cost or discrete labor schedule)
 *    A  = (M + L) × 0.15     (15% Administrative & overhead cost)
 *    quoted_mid   = M + L + A
 *    display_low  = quoted_mid × 0.85   (-15%)
 *    display_high = quoted_mid × 1.15   (+15%)
 */

import { FenceConfiguration } from './pricing-engine';

export type SupportedVendor = 'homeDepot' | 'lowes' | 'dunnLumber' | 'chinook';

export interface VendorPriceMap {
  homeDepot?: number;
  lowes?: number;
  dunnLumber?: number;
  chinook?: number;
  cheapest?: number;
  cheapestVendor?: SupportedVendor;
}

export interface BomLineItem {
  sku: string;
  category: string;
  displayName: string;
  description?: string;
  unit: string;
  qtyBasis: string;
  rawQuantity: number;
  wastePercent: number; // 33.33% for fasteners, 0% for structural timber
  bufferedQuantity: number;
  calcNotes: string;
  vendorPricing: VendorPriceMap;
  selectedUnitPrice: number;
  lineTotalUsd: number;
  installHoursUnit?: number;
  laborUnitRateCents?: number;
}

export interface MultiVendorQuoteTotals {
  vendor: SupportedVendor | 'cheapest';
  mcUsd: number;
  mBurdenedUsd: number;
  laborUsd: number;
  adminUsd: number;
  quotedMidUsd: number;
  displayLowUsd: number;
  displayHighUsd: number;
  pricePerLfMid: number;
  pricePerLfLow: number;
  pricePerLfHigh: number;
}

export interface BomCalculationResult {
  config: FenceConfiguration;
  selectedVendor: SupportedVendor | 'cheapest';
  items: BomLineItem[];
  totals: MultiVendorQuoteTotals;
  vendorComparison: Record<SupportedVendor | 'cheapest', MultiVendorQuoteTotals>;
  fastenerSummary: {
    totalFramingFasteners: number;
    totalPicketFasteners: number;
    totalTrimFasteners: number;
    wasteMultiplier: number;
  };
}

export const FASTENER_WASTE_MULTIPLIER = 1.3333; // Canonical 33.33% contractor buffer

/**
 * Derives the required BOM items, raw quantities, and 33.33% fastener buffers
 * for any given fence configuration.
 */
export function generateFenceBomRequirements(config: FenceConfiguration) {
  const lf = Math.max(1, config.linearFeet || 100);

  // Universal Terrain Span Engine: 8ft (flat), 7.5ft (moderate), 7.0ft (steep)
  const effectiveSpan =
    config.terrain === 'steep' ? 7.0 : config.terrain === 'moderate' ? 7.5 : (config.postSpacingFt || 8.0);
  
  // The +1 Boundary Post Law
  const bays = Math.ceil(lf / effectiveSpan);
  const postCount = bays + 1;
  const railCount = config.railCount || 3;
  const totalRails = bays * railCount;

  // 1. Post Selection
  let postSku = 'post-4x4-cedar';
  if (config.postType === '4x4-pt') postSku = 'post-4x4-pt-incised';
  else if (config.postType === '4x6-cedar') postSku = 'post-4x6-cedar';
  else if (config.postType === '4x4-cedar') postSku = 'post-4x4-cedar';

  // 2. Post Cap Selection
  let capSku: string | null = null;
  if (config.postCap && config.postCap !== 'none') {
    if (config.postCap === 'cedar-pyramid') capSku = 'post-cap-cedar-pyramid';
    else if (config.postCap === 'metal-black') capSku = 'post-cap-metal-pyramid';
    else if (config.postCap === 'copper-pyramid') capSku = 'post-cap-copper-pyramid';
    else if (config.postCap === 'solar-led') capSku = 'post-cap-solar-pyramid';
  }

  // 3. Rails & Rail Cap
  const railSku = 'rail-2x4-cedar';
  const hasTopCap = !!config.topCap;
  const topCapSku = hasTopCap ? 'rail-cap-2x4-cedar' : null;

  // 4. Pickets Selection & Density Calculation
  // Standard 8ft bay = 96". 1x6 picket is nominal 5.5" width.
  // Standard gap/spacing is 1/16" privacy (~17 pickets per bay)
  let picketsPerBay = 17;
  let picketSku = 'picket-cedar-flat-1x6';

  if (config.fillPattern === 'board-on-board') {
    picketSku = 'picket-cedar-board-on-board-1x6';
    picketsPerBay = Math.ceil(17 * 1.25); // Overlapping 1" joint (+25%) = 21 pickets/bay
  } else if (config.fillPattern === 'shadowbox') {
    picketSku = 'picket-cedar-shadowbox-1x6';
    picketsPerBay = 20; // Alternating front/back with overlap
  } else if (config.fillPattern === 'gothic') {
    picketSku = 'picket-cedar-gothic-1x6';
    picketsPerBay = 17;
  } else if (config.fillPattern === 'dogear') {
    picketSku = 'picket-cedar-dogear-1x6';
    picketsPerBay = 17;
  }

  if (config.picketWidth === '3.5') {
    picketSku = 'picket-cedar-flat-1x4';
    picketsPerBay = Math.ceil(picketsPerBay * (5.5 / 3.5));
  }

  const totalPickets = bays * picketsPerBay;

  // 5. Brackets vs Toenail Framing
  let bracketSku: string | null = null;
  let bracketCount = 0;
  const isBracketFraming = config.bracketType && config.bracketType !== 'none';

  if (isBracketFraming) {
    if (config.bracketType === 'u-black') bracketSku = 'bracket-u-2x4-black';
    else if (config.bracketType === 'u-galv' || config.bracketType === 'simpson-tie') bracketSku = 'bracket-u-2x4-galv';
    else if (config.bracketType === 'wood-2x2') bracketSku = 'bracket-wood-block-2x2-cedar';
    else if (config.bracketType === 'wood-2x4') bracketSku = 'bracket-wood-block-2x4-cedar';
    else if (config.bracketType === 'poly-u') bracketSku = 'bracket-hidden-hanger';
    else bracketSku = 'bracket-u-2x4-galv';

    bracketCount = totalRails * 2; // 2 brackets per rail (both ends)
  }

  // 6. Trim Selection
  let trimSku: string | null = null;
  let trimCount = 0;
  let trimTiers = 0;

  if (config.trimStyle === 'standard-1x4') {
    trimSku = 'trim-1x4-cedar-1tier';
    trimCount = bays;
    trimTiers = 1;
  } else if (config.trimStyle === 'picture-frame-trim') {
    trimSku = 'trim-1x4-cedar-2tier';
    trimCount = bays * 2;
    trimTiers = 2;
  }

  // 7. Concrete & Base
  const concreteBags = postCount * 2; // 2 bags (60 lb) = 120 lb per post
  const aggregateBags = postCount * 1; // 1 bag (50 lb) per post

  // 8. FASTENERS WITH CANONICAL 33.33% WASTE LOGIC
  // Framing Fasteners:
  // - Toenail: 6 screws per rail (3 per rail end). Base = totalRails * 6
  // - Bracket: 6 screws per bracket (4 into post, 2 into rail). Base = bracketCount * 6
  const rawFramingScrews = isBracketFraming ? bracketCount * 6 : totalRails * 6;
  const bufferedFramingScrews = Math.ceil(rawFramingScrews * FASTENER_WASTE_MULTIPLIER);

  // Picket Fasteners:
  // - 2 ring-shank nails per rail contact. For 3 rails = 6 nails/picket.
  const nailsPerPicket = railCount * 2;
  const rawPicketNails = totalPickets * nailsPerPicket;
  const bufferedPicketNails = Math.ceil(rawPicketNails * FASTENER_WASTE_MULTIPLIER);

  // Trim Fasteners:
  // - 16 washer screws/trim nails per board (spaced 11" OC)
  const rawTrimFasteners = trimTiers > 0 ? bays * trimTiers * 16 : 0;
  const bufferedTrimFasteners = Math.ceil(rawTrimFasteners * FASTENER_WASTE_MULTIPLIER);

  // 9. Gates
  const walkGates = config.gates?.walkGates || 0;
  const driveGates = config.gates?.driveGates || 0;

  return {
    lf,
    effectiveSpan,
    bays,
    postCount,
    railCount,
    totalRails,
    hasTopCap,
    postSku,
    capSku,
    railSku,
    topCapSku,
    picketSku,
    totalPickets,
    picketsPerBay,
    bracketSku,
    bracketCount,
    isBracketFraming,
    trimSku,
    trimCount,
    trimTiers,
    concreteBags,
    aggregateBags,
    rawFramingScrews,
    bufferedFramingScrews,
    rawPicketNails,
    bufferedPicketNails,
    rawTrimFasteners,
    bufferedTrimFasteners,
    walkGates,
    driveGates,
  };
}

/**
 * Calculates the complete BOM takeoff with live multi-vendor pricing from Supabase.
 */
export function calculateBomFromCatalog(
  config: FenceConfiguration,
  catalogMap: Map<string, { component: any; pricing: Record<string, number> }>,
  selectedVendor: SupportedVendor | 'cheapest' = 'homeDepot'
): BomCalculationResult {
  const req = generateFenceBomRequirements(config);
  const items: BomLineItem[] = [];

  const addLine = (
    sku: string,
    rawQty: number,
    bufferedQty: number,
    wastePercent: number,
    calcNotes: string,
    defaultCategory: string,
    defaultName: string,
    unit = 'ea'
  ) => {
    if (bufferedQty <= 0) return;

    const catalogEntry = catalogMap.get(sku);
    const comp = catalogEntry?.component;
    const vendorPrices = catalogEntry?.pricing || {};

    const priceHomeDepot = vendorPrices['homeDepot'] || 0;
    const priceLowes = vendorPrices['lowes'] || 0;
    const priceDunn = vendorPrices['dunnLumber'] || 0;
    const priceChinook = vendorPrices['chinook'] || 0;

    const validPrices: { vendor: SupportedVendor; price: number }[] = [];
    if (priceHomeDepot > 0) validPrices.push({ vendor: 'homeDepot', price: priceHomeDepot });
    if (priceLowes > 0) validPrices.push({ vendor: 'lowes', price: priceLowes });
    if (priceDunn > 0) validPrices.push({ vendor: 'dunnLumber', price: priceDunn });
    if (priceChinook > 0) validPrices.push({ vendor: 'chinook', price: priceChinook });

    validPrices.sort((a, b) => a.price - b.price);
    const cheapest = validPrices[0] || { vendor: 'homeDepot' as SupportedVendor, price: 0 };

    const vendorPricing: VendorPriceMap = {
      homeDepot: priceHomeDepot,
      lowes: priceLowes,
      dunnLumber: priceDunn,
      chinook: priceChinook,
      cheapest: cheapest.price,
      cheapestVendor: cheapest.vendor,
    };

    let unitPrice = priceHomeDepot;
    if (selectedVendor === 'cheapest') {
      unitPrice = cheapest.price;
    } else if (vendorPricing[selectedVendor] && vendorPricing[selectedVendor]! > 0) {
      unitPrice = vendorPricing[selectedVendor]!;
    } else if (cheapest.price > 0) {
      unitPrice = cheapest.price;
    }

    const lineTotalUsd = Number((bufferedQty * unitPrice).toFixed(2));

    items.push({
      sku,
      category: comp?.category || defaultCategory,
      displayName: comp?.display_name || defaultName,
      description: comp?.description_body || '',
      unit: comp?.unit_of_measure || unit,
      qtyBasis: comp?.qty_basis || 'fixed',
      rawQuantity: rawQty,
      wastePercent,
      bufferedQuantity: bufferedQty,
      calcNotes,
      vendorPricing,
      selectedUnitPrice: unitPrice,
      lineTotalUsd,
      installHoursUnit: Number(comp?.install_hours_unit || 0),
      laborUnitRateCents: Number(comp?.labor_unit_rate_cents || 0),
    });
  };

  // 1. Posts
  addLine(
    req.postSku,
    req.postCount,
    req.postCount,
    0,
    `${req.postCount} posts (${req.effectiveSpan}ft span · ${req.bays} bays + 1 boundary post)`,
    'posts',
    'Post Timber (8ft)',
    'ea'
  );

  // 2. Post Caps
  if (req.capSku) {
    addLine(
      req.capSku,
      req.postCount,
      req.postCount,
      0,
      `1 cap per post (${req.postCount} posts)`,
      'caps',
      'Post Pyramid Cap',
      'ea'
    );
  }

  // 3. Rails & Top Cap
  addLine(
    req.railSku,
    req.totalRails,
    req.totalRails,
    0,
    `${req.totalRails} rails (${req.railCount} rails × ${req.bays} bays)`,
    'rails',
    '2×4 Cedar Rail (8ft)',
    'ea'
  );

  if (req.topCapSku) {
    addLine(
      req.topCapSku,
      req.bays,
      req.bays,
      0,
      `1 top rail cap per bay (${req.bays} bays)`,
      'rails',
      '2×4 Cedar Rail Cap (8ft)',
      'ea'
    );
  }

  // 4. Pickets
  addLine(
    req.picketSku,
    req.totalPickets,
    req.totalPickets,
    0,
    `${req.totalPickets} pickets (${req.picketsPerBay}/bay across ${req.bays} bays)`,
    'pickets',
    'Cedar Fence Picket (6ft)',
    'ea'
  );

  // 5. Brackets
  if (req.bracketSku && req.bracketCount > 0) {
    addLine(
      req.bracketSku,
      req.bracketCount,
      req.bracketCount,
      0,
      `2 brackets per rail (${req.bracketCount} total brackets)`,
      'brackets',
      '2×4 Rail Hanger Bracket',
      'ea'
    );
  }

  // 6. Trim
  if (req.trimSku && req.trimCount > 0) {
    addLine(
      req.trimSku,
      req.trimCount,
      req.trimCount,
      0,
      `${req.trimTiers}-tier fascia trim (${req.trimCount} boards)`,
      'trim',
      '1×4 Cedar Fascia Trim',
      'ea'
    );
  }

  // 7. Concrete & Aggregate Base
  addLine(
    'concrete-post-set',
    req.concreteBags,
    req.concreteBags,
    0,
    `2 bags (120 lb) per post (${req.postCount} posts = ${req.concreteBags} bags)`,
    'hardware',
    'Quikrete Post-Set Concrete (60 lb)',
    'bag'
  );

  addLine(
    'aggregate-base',
    req.aggregateBags,
    req.aggregateBags,
    0,
    `1 bag crushed drainage base per post (${req.aggregateBags} bags)`,
    'hardware',
    'Crushed Gravel Drainage Base (50 lb)',
    'bag'
  );

  // 8. FASTENERS WITH CANONICAL 33.33% WASTE LOGIC
  addLine(
    'fastener-framing',
    req.rawFramingScrews,
    req.bufferedFramingScrews,
    33.33,
    req.isBracketFraming
      ? `6/bracket (${req.rawFramingScrews} base + 33.33% contractor buffer = ${req.bufferedFramingScrews})`
      : `6/rail (${req.rawFramingScrews} base + 33.33% contractor buffer = ${req.bufferedFramingScrews})`,
    'hardware',
    'Framing Screws / Structural Fasteners',
    'ea'
  );

  addLine(
    'fastener-fill',
    req.rawPicketNails,
    req.bufferedPicketNails,
    33.33,
    `${req.railCount * 2}/picket (${req.rawPicketNails.toLocaleString()} base + 33.33% contractor buffer = ${req.bufferedPicketNails.toLocaleString()})`,
    'hardware',
    'Picket Nails (2″ Stainless Steel Ring)',
    'ea'
  );

  if (req.bufferedTrimFasteners > 0) {
    addLine(
      'fastener-trim',
      req.rawTrimFasteners,
      req.bufferedTrimFasteners,
      33.33,
      `16/board (${req.rawTrimFasteners} base + 33.33% contractor buffer = ${req.bufferedTrimFasteners})`,
      'hardware',
      'Trim Fasteners (Washer Screws / DA Nails)',
      'ea'
    );
  }

  // 9. Gate Hardware Kits
  if (req.walkGates > 0) {
    addLine(
      'gate-walk-hardware-kit',
      req.walkGates,
      req.walkGates,
      0,
      `${req.walkGates}× Standard Walk Gate Assembly Kit (T-hinges, latch, handle)`,
      'hardware',
      'Walk Gate Hardware Assembly Kit',
      'ea'
    );
  }

  if (req.driveGates > 0) {
    addLine(
      'gate-double-drive-hardware-kit',
      req.driveGates,
      req.driveGates,
      0,
      `${req.driveGates}× Double Drive Gate Kit (4 heavy hinges, drop rod, latch)`,
      'hardware',
      'Double Drive Gate Hardware Kit',
      'ea'
    );
  }

  // Calculate totals for all 4 vendors + cheapest
  const vendors: (SupportedVendor | 'cheapest')[] = ['homeDepot', 'lowes', 'dunnLumber', 'chinook', 'cheapest'];
  const comparison: Record<string, MultiVendorQuoteTotals> = {};

  for (const v of vendors) {
    let mc = 0;
    for (const item of items) {
      const price = v === 'cheapest' ? (item.vendorPricing.cheapest || item.selectedUnitPrice) : (item.vendorPricing[v] || item.selectedUnitPrice);
      mc += item.bufferedQuantity * (price || 0);
    }
    mc = Number(mc.toFixed(2));

    // M = MC * 1.25 (Tax, procurement, job-site delivery margin)
    const m = Number((mc * 1.25).toFixed(2));
    // L = M * 2.0 (Labor = 2x burdened material cost)
    const l = Number((m * 2.0).toFixed(2));
    // A = (M + L) * 0.15 (15% Admin & overhead)
    const a = Number(((m + l) * 0.15).toFixed(2));

    const mid = Math.round(m + l + a);
    const low = Math.round(mid * 0.85);
    const high = Math.round(mid * 1.15);

    comparison[v] = {
      vendor: v,
      mcUsd: mc,
      mBurdenedUsd: m,
      laborUsd: l,
      adminUsd: a,
      quotedMidUsd: mid,
      displayLowUsd: low,
      displayHighUsd: high,
      pricePerLfMid: Number((mid / req.lf).toFixed(2)),
      pricePerLfLow: Number((low / req.lf).toFixed(2)),
      pricePerLfHigh: Number((high / req.lf).toFixed(2)),
    };
  }

  const activeTotals = comparison[selectedVendor] || comparison['homeDepot'];

  return {
    config,
    selectedVendor,
    items,
    totals: activeTotals,
    vendorComparison: comparison as Record<SupportedVendor | 'cheapest', MultiVendorQuoteTotals>,
    fastenerSummary: {
      totalFramingFasteners: req.bufferedFramingScrews,
      totalPicketFasteners: req.bufferedPicketNails,
      totalTrimFasteners: req.bufferedTrimFasteners,
      wasteMultiplier: FASTENER_WASTE_MULTIPLIER,
    },
  };
}
