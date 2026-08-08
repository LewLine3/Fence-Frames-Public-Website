/**
 * Gate catalog v1 — man-gate design pricing + default $/gate for mower & vehicle
 * until those types have their own designer.
 * Spec: docs/gates/man-gate-catalog-v1.md
 */
(function initFFManGateCatalog(global) {
  const FRAME_BASE = { 'MG-Z': 320, 'MG-X': 360, 'MG-STL': 420 };
  const WIDTH_DELTA = { 36: 0, 42: 40, 48: 80 };
  const HARDWARE_PRICE = { good: 35, better: 55, best: 95 };
  const ARCH_PRICE = 45;
  const CABLE_PRICE = 18;
  const TRIM_MATCH_PRICE = 40;

  /** Flat placeholder charges until mower / vehicle gates are designed in studio. */
  const DEFAULT_GATE_CHARGE = {
    mower: 650,
    vehicle: 1200,
  };

  const HARDWARE = {
    good: {
      label: 'Good',
      hingeSku: 'Everbilt 33685',
      latchSku: 'Everbilt 33685',
      notes: 'Galvanized tee + latch + pull',
    },
    better: {
      label: 'Better',
      hingeSku: 'National Hardware N109-306',
      latchSku: 'National Hardware N109-306',
      notes: 'Black decorative / padlockable set',
    },
    best: {
      label: 'Best',
      hingeSku: 'Peak 2440',
      latchSku: 'Peak 2440 + latch upgrade',
      notes: 'Steel corner brackets w/ welded hinges',
    },
  };

  const FRAME_LABEL = {
    'MG-Z': 'Classic Z',
    'MG-X': 'Cross brace',
    'MG-STL': 'Steel corners',
  };

  function clampCount(n) {
    return Math.max(0, Math.min(3, Number(n) || 0));
  }

  function leafWidth(openingIn) {
    return Number(openingIn) - 2;
  }

  function computeManGateTotal(input) {
    const count = clampCount(input.gateManCount);
    if (!count) return { perGate: 0, count: 0, total: 0, lines: [] };

    const frame = input.gateFrame || 'MG-Z';
    const opening = Number(input.gateOpening) || 36;
    const hardware = input.gateHardware || 'better';

    let per =
      (FRAME_BASE[frame] ?? FRAME_BASE['MG-Z']) +
      (WIDTH_DELTA[opening] ?? 0) +
      (HARDWARE_PRICE[hardware] ?? HARDWARE_PRICE.better);

    if (input.gatePicketTop === 'arched') per += ARCH_PRICE;
    if (input.gateCable === 'kit') per += CABLE_PRICE;
    if (input.gateTrim === 'match') per += TRIM_MATCH_PRICE;

    const hwLabel = HARDWARE[hardware]?.label || hardware;
    const frameLabel = FRAME_LABEL[frame] || frame;
    const lines = [
      `Man gate × ${count} · ${frameLabel} · ${opening}″ · ${hwLabel}`,
    ];
    if (input.gatePicketTop === 'arched') lines.push('Arched picket top (gate only)');
    if (input.gateCable === 'kit') lines.push('Anti-sag cable kit');
    if (input.gateTrim === 'match') lines.push('Match fence trim');

    return { perGate: per, count, total: per * count, lines };
  }

  function computeGateTotal(input) {
    const man = computeManGateTotal(input);
    const mowerCount = clampCount(input.gateMowerCount);
    const vehicleCount = clampCount(input.gateVehicleCount);
    const mowerPer = DEFAULT_GATE_CHARGE.mower;
    const vehiclePer = DEFAULT_GATE_CHARGE.vehicle;
    const mowerTotal = mowerPer * mowerCount;
    const vehicleTotal = vehiclePer * vehicleCount;
    const lines = man.lines.slice();
    if (mowerCount) {
      lines.push(`Mower gate × ${mowerCount} · default until designed`);
    }
    if (vehicleCount) {
      lines.push(`Vehicle gate × ${vehicleCount} · default until designed`);
    }
    return {
      man,
      mower: { perGate: mowerPer, count: mowerCount, total: mowerTotal },
      vehicle: { perGate: vehiclePer, count: vehicleCount, total: vehicleTotal },
      total: man.total + mowerTotal + vehicleTotal,
      lines,
      perGate: man.perGate,
      count: man.count + mowerCount + vehicleCount,
    };
  }

  function formatSummary(input) {
    const man = clampCount(input.gateManCount);
    const mower = clampCount(input.gateMowerCount);
    const vehicle = clampCount(input.gateVehicleCount);
    if (!man && !mower && !vehicle) return 'No gates';
    const parts = [];
    if (man) {
      const frame = input.gateFrame || 'MG-Z';
      const opening = Number(input.gateOpening) || 36;
      const hardware = input.gateHardware || 'better';
      const hwLabel = HARDWARE[hardware]?.label || hardware;
      const frameLabel = FRAME_LABEL[frame] || frame;
      parts.push(
        man === 1
          ? `1 × ${opening}″ ${frameLabel} · ${hwLabel}`
          : `${man} man · ${opening}″ ${frameLabel}`
      );
    }
    if (mower) parts.push(`${mower} mower`);
    if (vehicle) parts.push(`${vehicle} vehicle`);
    return parts.join(' · ');
  }

  const api = {
    FRAMES: ['MG-Z', 'MG-X', 'MG-STL'],
    FRAME_LABEL,
    WIDTHS: [36, 42, 48],
    HARDWARE,
    CABLE: { none: null, kit: 'Everbilt 24426' },
    DEFAULT_GATE_CHARGE,
    defaults: {
      frame: 'MG-Z',
      opening: 36,
      picketTop: 'flat',
      cable: 'none',
      trim: 'none',
      swing: 'out',
      hand: 'RH',
      hardware: 'better',
    },
    leafWidth,
    computeManGateTotal,
    computeGateTotal,
    formatSummary,
  };

  global.FFManGateCatalog = api;
})(typeof window !== 'undefined' ? window : globalThis);
