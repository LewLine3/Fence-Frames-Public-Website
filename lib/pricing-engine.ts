// =============================================================================
// Fence Frames — Master Pricing Engine (Baseline & Option-Set Labor Math)
// =============================================================================

export interface FenceConfiguration {
  fenceType: 'vertical' | 'horizontal' | 'picture-frame' | 'split-rail';
  fenceStyle: string; // e.g. 'heritage', 'good-neighbor', 'shadowbox'
  heightFt: number; // 4, 5, 6, 8
  postSpacingFt: number; // 6, 8
  linearFeet: number;
  woodGrade: 'tight-knot' | 'clear-cedar' | 'pressure-treated';
  postType: '4x4-cedar' | '4x6-cedar' | '4x4-pt' | 'postmaster-steel';
  postCap: 'none' | 'cedar-pyramid' | 'copper-pyramid' | 'metal-black' | 'solar-led';
  railCount: 2 | 3 | 4;
  topCap: boolean;
  trimStyle: 'none' | 'standard-1x4' | 'picture-frame-trim' | 'kickboard-2x6';
  stainType: 'none' | 'clear-seal' | 'cedar-natural' | 'chestnut-brown' | 'redwood' | 'dark-walnut';
  hardwareTier: 'galvanized' | 'black-powder' | 'stainless-steel';
  gates: {
    walkGates: number; // count of 4ft or 5ft walk gates
    driveGates: number; // count of 10ft or 12ft drive gates
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
  itemizedItems: Array<{
    name: string;
    category: 'Materials' | 'Labor' | 'Admin & Setup' | 'Gates';
    costPerLf: number;
    totalEst: number;
  }>;
}

/**
 * 1. CANONICAL BASELINE PRICING ENGINE
 * Used for live production and instant UI feedback.
 */
export function calculateBaselineFenceQuote(config: FenceConfiguration): PricingBreakdown {
  const lf = Math.max(1, config.linearFeet);
  
  // Base material rate per LF based on height & style
  let baseMatPerLf = 22.50;
  if (config.heightFt === 4) baseMatPerLf = 18.00;
  if (config.heightFt === 6) baseMatPerLf = 24.50;
  if (config.heightFt === 8) baseMatPerLf = 34.00;

  if (config.woodGrade === 'clear-cedar') baseMatPerLf += 8.50;
  if (config.woodGrade === 'tight-knot') baseMatPerLf += 3.00;

  if (config.postType === '4x6-cedar') baseMatPerLf += 2.80;
  if (config.postType === 'postmaster-steel') baseMatPerLf += 4.50;

  if (config.topCap) baseMatPerLf += 2.25;
  if (config.trimStyle !== 'none') baseMatPerLf += 3.10;
  if (config.postCap !== 'none') baseMatPerLf += 1.20;

  // Stain & Finish per LF
  let stainPerLf = 0;
  if (config.stainType !== 'none') {
    stainPerLf = 4.75;
  }

  // Base Labor rate per LF
  let baseLaborPerLf = 18.00;
  if (config.heightFt === 8) baseLaborPerLf = 24.00;
  if (config.postType === 'postmaster-steel') baseLaborPerLf += 2.00;

  // Admin & layout buffer per LF
  const adminPerLf = 2.10;

  // Gate flat costs
  const walkGateCost = (config.gates.walkGates || 0) * 385.00;
  const driveGateCost = (config.gates.driveGates || 0) * 850.00;
  const totalGatesCost = walkGateCost + driveGateCost;

  const totalMatCost = (baseMatPerLf * lf) + (totalGatesCost * 0.5);
  const totalLaborCost = (baseLaborPerLf * lf) + (stainPerLf * lf) + (totalGatesCost * 0.5);
  const totalAdminCost = adminPerLf * lf;

  const subtotal = totalMatCost + totalLaborCost + totalAdminCost;
  
  // Variance range (-6% to +8% for market variance)
  const totalMin = Math.round(subtotal * 0.94);
  const totalMax = Math.round(subtotal * 1.08);

  const pricePerLfMin = Number((totalMin / lf).toFixed(2));
  const pricePerLfMax = Number((totalMax / lf).toFixed(2));

  return {
    materialsCostMin: Math.round(totalMatCost * 0.95),
    materialsCostMax: Math.round(totalMatCost * 1.05),
    laborCostMin: Math.round(totalLaborCost * 0.95),
    laborCostMax: Math.round(totalLaborCost * 1.10),
    adminPermitCost: Math.round(totalAdminCost),
    pricePerLfMin,
    pricePerLfMax,
    totalMin,
    totalMax,
    itemizedItems: [
      {
        name: `${config.heightFt}ft ${config.woodGrade.replace('-', ' ').toUpperCase()} Framing & Pickets`,
        category: 'Materials',
        costPerLf: Number(baseMatPerLf.toFixed(2)),
        totalEst: Math.round(baseMatPerLf * lf)
      },
      {
        name: `Post Digging, Setting & Framing Installation`,
        category: 'Labor',
        costPerLf: Number(baseLaborPerLf.toFixed(2)),
        totalEst: Math.round(baseLaborPerLf * lf)
      },
      ...(stainPerLf > 0 ? [{
        name: `Pre-Stain / UV Protection (${config.stainType})`,
        category: 'Materials' as const,
        costPerLf: Number(stainPerLf.toFixed(2)),
        totalEst: Math.round(stainPerLf * lf)
      }] : []),
      ...(config.gates.walkGates > 0 ? [{
        name: `Custom Walk Gate (${config.gates.walkGates}x 4ft w/ Hardware)`,
        category: 'Gates' as const,
        costPerLf: Number((walkGateCost / lf).toFixed(2)),
        totalEst: walkGateCost
      }] : []),
      ...(config.gates.driveGates > 0 ? [{
        name: `Double Drive Gate (${config.gates.driveGates}x 10-12ft)`,
        category: 'Gates' as const,
        costPerLf: Number((driveGateCost / lf).toFixed(2)),
        totalEst: driveGateCost
      }] : []),
      {
        name: `ARC Blueprint, Submittal Packet & Municipal Admin`,
        category: 'Admin & Setup',
        costPerLf: adminPerLf,
        totalEst: Math.round(adminPerLf * lf)
      }
    ]
  };
}

/**
 * 2. OPTION-SET DISCRETE LABOR MATH ENGINE (Trial Engine)
 * Breaks down granular labor operations (post holes, framing, face picketing, gate fitting).
 */
export function calculateOptionSetLaborQuote(config: FenceConfiguration): PricingBreakdown {
  const lf = Math.max(1, config.linearFeet);
  const postCount = Math.ceil(lf / (config.postSpacingFt || 8)) + 1;

  // Discrete task rates:
  const costPerPostHole = 38.00; // Digging & concrete pour
  const costPerLfFraming = 7.50; // Setting 2x4 rails & plumb
  const costPerLfPicketing = 6.25; // Nailing pickets & spacing
  const costPerLfTrim = config.trimStyle !== 'none' ? 2.50 : 0;
  const costPerGateHanging = 120.00;

  const totalPostLabor = postCount * costPerPostHole;
  const totalRunLabor = (costPerLfFraming + costPerLfPicketing + costPerLfTrim) * lf;
  const totalGateLabor = (config.gates.walkGates * costPerGateHanging) + (config.gates.driveGates * (costPerGateHanging * 2));

  const totalLabor = totalPostLabor + totalRunLabor + totalGateLabor;

  // Material baseline calculation
  const baseline = calculateBaselineFenceQuote(config);

  const totalCombined = baseline.materialsCostMin + totalLabor + baseline.adminPermitCost;
  const totalMin = Math.round(totalCombined * 0.95);
  const totalMax = Math.round(totalCombined * 1.08);

  return {
    ...baseline,
    laborCostMin: Math.round(totalLabor * 0.95),
    laborCostMax: Math.round(totalLabor * 1.08),
    totalMin,
    totalMax,
    pricePerLfMin: Number((totalMin / lf).toFixed(2)),
    pricePerLfMax: Number((totalMax / lf).toFixed(2)),
  };
}
