// =============================================================================
// Fence Frames — Master 8-Metric Pricing Engine
// =============================================================================

export type FenceStyleCategory = 'vertical-picket' | 'horizontal-board' | 'fabric-wire' | 'lattice-craftsman';

export interface FenceConfiguration {
  // 1. General & Layout
  heightFt: number; // 4, 5, 6, 8
  postSpacingFt: number; // 6, 8
  linearFeet: number;
  woodGrade: 'tight-knot' | 'clear-cedar' | 'pressure-treated';

  // 2. Posts & Footings
  postType: '4x4-cedar' | '4x6-cedar' | '4x4-pt' | 'postmaster-steel';
  postCap: 'none' | 'cedar-pyramid' | 'copper-pyramid' | 'metal-black' | 'solar-led';
  footingDepthInches: 24 | 30 | 36;

  // 3. Rails & Framing
  railCount: 2 | 3 | 4;
  topCap: boolean;

  // 4. Fill Material (Dynamically switches based on fenceStyleCategory)
  fenceStyleCategory: FenceStyleCategory;
  /** Heritage: standard | gothic | board-on-board | shadowbox; Next aliases: flat-top-privacy, butt-joint */
  fillPattern: string;
  fenceStyle?: string; // legacy support
  /** Heritage picketSpacing IDs */
  picketSpacing?: '1-16-privacy' | 'gap-0-5' | 'gap-1' | 'gap-3' | 'gap-5-5';
  /** Heritage picketWidth — inches as string */
  picketWidth?: '3.5' | '5.5';

  // 5. Stain & Sealant
  stainType: 'none' | 'clear-seal' | 'cedar-natural' | 'chestnut-brown' | 'redwood' | 'dark-walnut';

  // 6. Trim & Facia
  trimStyle: 'none' | 'standard-1x4' | 'picture-frame-trim' | 'kickboard-2x6';

  // 7. Hardware & Fasteners
  hardwareTier: 'galvanized' | 'black-powder' | 'stainless-steel';
  /** Heritage bracket IDs (+ simpson-tie Next alias) */
  bracketType?:
    | 'none'
    | 'u-black'
    | 'u-galv'
    | 'l-1'
    | 'l-2'
    | 'l-4'
    | 'l-6'
    | 'poly-u'
    | 'wood-2x2'
    | 'wood-2x4'
    | 'simpson-tie';

  // 8. Gates & Access
  gates: {
    walkGates: number; // 4ft or 5ft walk gates
    driveGates: number; // 10ft or 12ft drive gates
  };
}

export interface PricingBreakdown {
  materialsCostMin: number;
  materialsCostMax: number;
  laborCostMin: number;
  laborCostMax: number;
  adminPermitCost: number;
  pricePerLfMin: number;
  pricePerLfMax: number;
  totalMin: number;
  totalMax: number;
  itemizedMetrics: Array<{
    metricNumber: number;
    metricName: string;
    category: 'Materials' | 'Labor' | 'Admin' | 'Gates';
    costPerLf: number;
    totalEst: number;
    details: string;
  }>;
  itemizedItems?: Array<{
    name: string;
    category: 'Materials' | 'Labor' | 'Admin & Setup' | 'Gates';
    costPerLf: number;
    totalEst: number;
  }>;
}

/**
 * MASTER 8-METRIC PRICING CALCULATION
 */
export function calculateBaselineFenceQuote(config: FenceConfiguration): PricingBreakdown {
  const lf = Math.max(1, config.linearFeet);
  const postCount = Math.ceil(lf / (config.postSpacingFt || 8)) + 1;

  // Metric 1: General Base Rate
  let m1Base = config.heightFt === 4 ? 14.00 : config.heightFt === 5 ? 16.00 : config.heightFt === 6 ? 18.00 : 26.00;
  if (config.woodGrade === 'clear-cedar') m1Base += 7.50;
  if (config.woodGrade === 'tight-knot') m1Base += 2.50;

  // Metric 2: Posts & Footings
  let m2PostPerLf = 6.50;
  if (config.postType === '4x6-cedar') m2PostPerLf += 2.20;
  if (config.postType === 'postmaster-steel') m2PostPerLf += 4.20;
  if (config.postCap !== 'none') m2PostPerLf += 1.10;

  // Metric 3: Rails & Framing
  let m3RailPerLf = config.railCount === 2 ? 4.00 : config.railCount === 4 ? 7.40 : 5.80;
  if (config.topCap) m3RailPerLf += 2.25;

  // Metric 4: Fill Material (Keyed to Style Category)
  let m4FillPerLf = 8.50;
  if (config.fillPattern === 'board-on-board') m4FillPerLf = 12.00;
  else if (config.fillPattern === 'shadowbox') m4FillPerLf = 11.50;
  else if (config.fillPattern === 'gothic') m4FillPerLf = 9.50;
  else if (config.fillPattern === 'butt-joint') m4FillPerLf = 10.00;
  else if (config.fenceStyleCategory === 'horizontal-board') m4FillPerLf = 13.50;
  else if (config.fenceStyleCategory === 'fabric-wire') m4FillPerLf = 7.20;
  else if (config.fenceStyleCategory === 'lattice-craftsman') m4FillPerLf = 10.00;

  if (config.picketWidth === '3.5') m4FillPerLf += 0.80;
  if (config.picketSpacing === 'gap-1') m4FillPerLf -= 0.40;
  if (config.picketSpacing === 'gap-3') m4FillPerLf -= 1.20;

  // Metric 5: Stain & Sealant
  const m5StainPerLf = config.stainType !== 'none' ? 4.75 : 0;

  // Metric 6: Trim & Facia
  let m6TrimPerLf = 0;
  if (config.trimStyle === 'picture-frame-trim') m6TrimPerLf = 3.20;
  if (config.trimStyle === 'kickboard-2x6') m6TrimPerLf = 2.80;

  // Metric 7: Hardware & Fasteners
  let m7HwPerLf = 1.40;
  if (config.hardwareTier === 'black-powder') m7HwPerLf = 2.40;
  if (config.hardwareTier === 'stainless-steel') m7HwPerLf = 3.10;
  if (config.bracketType && config.bracketType !== 'none') {
    if (config.bracketType === 'u-black') m7HwPerLf += 0.85;
    else if (config.bracketType === 'u-galv') m7HwPerLf += 0.65;
    else if (config.bracketType === 'simpson-tie') m7HwPerLf += 1.10;
    else if (config.bracketType.startsWith('wood-')) m7HwPerLf += 0.45;
    else m7HwPerLf += 0.55;
  }

  // Metric 8: Gates & Access
  const walkGateTotal = (config.gates?.walkGates || 0) * 385.00;
  const driveGateTotal = (config.gates?.driveGates || 0) * 850.00;
  const m8GatesTotal = walkGateTotal + driveGateTotal;

  // Admin & Municipal Submittal buffer
  const adminPerLf = 2.10;

  // Canonical Quote Math Engine (monetization_rules.md)
  // MC = Raw material costs from BOM
  const rawMaterials = (m1Base + m2PostPerLf + m3RailPerLf + m4FillPerLf + m5StainPerLf + m6TrimPerLf + m7HwPerLf) * lf + m8GatesTotal;
  
  // M = MC * 1.25 (Tax, procurement, job-site delivery margin)
  const M = rawMaterials * 1.25;
  // L = M * 2.0 (Labor = 2x burdened material cost)
  const L = M * 2.0;
  // A = (M + L) * 0.10 (10% Administrative & overhead cost)
  const A = (M + L) * 0.10;

  const quotedMid = M + L + A;
  const totalMin = Math.round(quotedMid * 0.85); // -15%
  const totalMax = Math.round(quotedMid * 1.15); // +15%

  const pricePerLfMin = Number((totalMin / lf).toFixed(2));
  const pricePerLfMax = Number((totalMax / lf).toFixed(2));

  const totalMaterials = Math.round(M);
  const totalLabor = Math.round(L);
  const totalAdmin = Math.round(A);

  const itemizedMetrics: PricingBreakdown['itemizedMetrics'] = [
    {
      metricNumber: 1,
      metricName: 'General Layout & Height',
      category: 'Materials',
      costPerLf: Number(m1Base.toFixed(2)),
      totalEst: Math.round(m1Base * lf),
      details: `${config.heightFt}ft Height · ${config.linearFeet} LF Run · ${config.woodGrade.replace('-', ' ').toUpperCase()}`
    },
    {
      metricNumber: 2,
      metricName: 'Posts & Footings',
      category: 'Materials',
      costPerLf: Number(m2PostPerLf.toFixed(2)),
      totalEst: Math.round(m2PostPerLf * lf),
      details: `${postCount}x ${config.postType.replace('-', ' ').toUpperCase()} Posts (${config.postSpacingFt}ft OC) · ${config.postCap} Caps`
    },
    {
      metricNumber: 3,
      metricName: 'Rails & Framing',
      category: 'Materials',
      costPerLf: Number(m3RailPerLf.toFixed(2)),
      totalEst: Math.round(m3RailPerLf * lf),
      details: `${config.railCount}-Rail 2x4 Horizontal Support · ${config.topCap ? 'Top Cap 2x4' : 'Standard'}`
    },
    {
      metricNumber: 4,
      metricName: 'Fill Material',
      category: 'Materials',
      costPerLf: Number(m4FillPerLf.toFixed(2)),
      totalEst: Math.round(m4FillPerLf * lf),
      details: `${config.fenceStyleCategory.replace('-', ' ').toUpperCase()} · Pattern: ${config.fillPattern.replace('-', ' ').toUpperCase()}`
    },
    {
      metricNumber: 5,
      metricName: 'Stain & UV Protection',
      category: 'Materials',
      costPerLf: Number(m5StainPerLf.toFixed(2)),
      totalEst: Math.round(m5StainPerLf * lf),
      details: config.stainType !== 'none' ? `Factory Pre-Stain: ${config.stainType.replace('-', ' ').toUpperCase()}` : 'Unfinished / Raw Wood'
    },
    {
      metricNumber: 6,
      metricName: 'Trim & Facia',
      category: 'Materials',
      costPerLf: Number(m6TrimPerLf.toFixed(2)),
      totalEst: Math.round(m6TrimPerLf * lf),
      details: config.trimStyle.replace('-', ' ').toUpperCase()
    },
    {
      metricNumber: 7,
      metricName: 'Hardware & Fasteners',
      category: 'Materials',
      costPerLf: Number(m7HwPerLf.toFixed(2)),
      totalEst: Math.round(m7HwPerLf * lf),
      details: `Fastener Tier: ${config.hardwareTier.replace('-', ' ').toUpperCase()}`
    },
    {
      metricNumber: 8,
      metricName: 'Gates & Access',
      category: 'Gates',
      costPerLf: Number((m8GatesTotal / lf).toFixed(2)),
      totalEst: m8GatesTotal,
      details: `${config.gates.walkGates || 0}x Walk Gate(s) · ${config.gates.driveGates || 0}x Double Drive Gate(s)`
    },
  ];

  return {
    materialsCostMin: Math.round(totalMaterials * 0.95),
    materialsCostMax: Math.round(totalMaterials * 1.05),
    laborCostMin: Math.round(totalLabor * 0.95),
    laborCostMax: Math.round(totalLabor * 1.10),
    adminPermitCost: totalAdmin,
    pricePerLfMin,
    pricePerLfMax,
    totalMin,
    totalMax,
    itemizedMetrics,
    itemizedItems: itemizedMetrics.map(m => ({
      name: `Metric #${m.metricNumber}: ${m.metricName} (${m.details})`,
      category: (m.category === 'Admin' ? 'Admin & Setup' : m.category) as 'Materials' | 'Labor' | 'Admin & Setup' | 'Gates',
      costPerLf: m.costPerLf,
      totalEst: m.totalEst,
    }))
  };
}

/**
 * 8-METRIC OPTION-SET DISCRETE LABOR ENGINE (Trial Engine)
 */
export function calculateOptionSetLaborQuote(config: FenceConfiguration): PricingBreakdown {
  const lf = Math.max(1, config.linearFeet);
  const postCount = Math.ceil(lf / (config.postSpacingFt || 8)) + 1;

  // Metric 2 Labor: Post hole digging & concrete setting ($38/hole)
  const m2PostLabor = postCount * 38.00;

  // Metric 3 Labor: Rail framing ($7.50/LF)
  const m3RailLabor = lf * 7.50;

  // Metric 4 Labor: Fill attachment (Pickets $6.25/LF, Horizontal $8.50/LF, Wire $5.00/LF)
  let m4FillLaborRate = 6.25;
  if (config.fenceStyleCategory === 'horizontal-board') m4FillLaborRate = 8.50;
  if (config.fenceStyleCategory === 'fabric-wire') m4FillLaborRate = 5.00;
  const m4FillLabor = lf * m4FillLaborRate;

  // Metric 5 Labor: Staining ($3.25/LF)
  const m5StainLabor = config.stainType !== 'none' ? lf * 3.25 : 0;

  // Metric 6 Labor: Trim installation ($2.00/LF)
  const m6TrimLabor = config.trimStyle !== 'none' ? lf * 2.00 : 0;

  // Metric 8 Labor: Gate hanging ($120/walk gate, $240/drive gate)
  const m8GateLabor = ((config.gates.walkGates || 0) * 120.00) + ((config.gates.driveGates || 0) * 240.00);

  const totalDiscreteLabor = m2PostLabor + m3RailLabor + m4FillLabor + m5StainLabor + m6TrimLabor + m8GateLabor;

  const baseline = calculateBaselineFenceQuote(config);
  const totalCombined = baseline.materialsCostMin + totalDiscreteLabor + baseline.adminPermitCost;

  return {
    ...baseline,
    laborCostMin: Math.round(totalDiscreteLabor * 0.95),
    laborCostMax: Math.round(totalDiscreteLabor * 1.08),
    totalMin: Math.round(totalCombined * 0.95),
    totalMax: Math.round(totalCombined * 1.08),
    pricePerLfMin: Number((Math.round(totalCombined * 0.95) / lf).toFixed(2)),
    pricePerLfMax: Number((Math.round(totalCombined * 1.08) / lf).toFixed(2)),
  };
}
