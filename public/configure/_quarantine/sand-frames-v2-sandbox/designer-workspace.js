/**
 * Sand Frames App — Designer Workspace Mode 1 Controller
 * Location: public/configure/heritage-v2-sandbox/designer-workspace.js
 *
 * Connects UI inputs to pure math calculation engine (sand-frames-math.js)
 * and renders live interactive SVG fence elevation, dimensional callouts,
 * and financial roll-up metrics.
 */

(function () {
  'use strict';

  // --- STAIN PALETTE DEFINITIONS ---
  const STAIN_PALETTE = {
    'warm-amber': { label: 'Warm Amber (Signature)', hex: '#E08230', border: '#C0681B' },
    'natural-cedar': { label: 'Natural Cedar', hex: '#C88A4B', border: '#A86E32' },
    'dark-walnut': { label: 'Dark Walnut', hex: '#4A3525', border: '#322216' },
    'weathered-gray': { label: 'Weathered Gray', hex: '#7B8288', border: '#5C6368' },
    'clear-coat': { label: 'Clear Coat Cedar', hex: '#D4A86A', border: '#B68A4C' },
    'unstained': { label: 'Unstained Cedar', hex: '#D9A066', border: '#BC8248' }
  };

  // --- WORKSPACE CENTRAL STATE ---
  const state = {
    lnFt: 120,
    height: 6,
    panelLength: 8,
    picketWidth: '1x6',      // '1x6' or '1x4'
    picketGap: 'privacy',    // 'privacy', 'gap-0.5', 'gap-1.0'
    picketStyle: '1x6-privacy',
    capRail: true,
    railsPerPanel: 3,
    stainKey: 'warm-amber',
    stainHex: '#E08230',
    remediationLevel: 'none',// 'none', 'light', 'full'
    postType: '4x4-pt-cedar',
    framingFastener: 'exterior-screws',
    fillFastener: 'stainless-ring-shank',
    trimFastener: 'stainless-trim-nails',
    season: 'summer',
    manGates: 1,
    mowerGates: 0,
    vehicleGates: 0,
    activeView: 'elevation'  // 'elevation' or 'section'
  };

  // Cached Calculation Results
  let calcResults = null;

  /**
   * Derive picketStyle key from width + gap
   */
  function syncPicketStyleKey() {
    if (state.picketWidth === '1x4') {
      state.picketStyle = '1x4-privacy';
    } else {
      if (state.picketGap === 'gap-0.5') {
        state.picketStyle = '1x6-gap-0.5';
      } else if (state.picketGap === 'gap-1.0') {
        state.picketStyle = '1x6-gap-1.0';
      } else {
        state.picketStyle = '1x6-privacy';
      }
    }
  }

  /**
   * Recalculate pure math using SandFramesMath engine
   */
  function updateCalculations() {
    syncPicketStyleKey();

    if (window.SandFramesMath && typeof window.SandFramesMath.calculateFenceProject === 'function') {
      calcResults = window.SandFramesMath.calculateFenceProject({
        lnFt: state.lnFt,
        height: state.height,
        panelLength: state.panelLength,
        picketStyle: state.picketStyle,
        capRail: state.capRail,
        railsPerPanel: state.railsPerPanel,
        remediationLevel: state.remediationLevel,
        framingFastener: state.framingFastener,
        fillFastener: state.fillFastener,
        trimFastener: state.trimFastener,
        season: state.season,
        manGates: state.manGates,
        mowerGates: state.mowerGates,
        vehicleGates: state.vehicleGates
      });
    }

    renderHeaderMetrics();
    renderCanvasSVG();
    renderBOMSummary();
  }

  /**
   * Render Top Header Metrics & Financial Bounds
   */
  function renderHeaderMetrics() {
    if (!calcResults) return;

    const { geometry, financials } = calcResults;
    const { lnFt, panels, posts } = geometry;
    const { costs } = financials;

    // Update Badges & Inputs
    const lnFtVal = document.getElementById('lnFtVal');
    const lnFtSlider = document.getElementById('lnFtSlider');
    const lnFtInput = document.getElementById('lnFtInput');
    const panelBadge = document.getElementById('panelBadge');
    const postBadge = document.getElementById('postBadge');

    if (lnFtVal) lnFtVal.textContent = `${lnFt} LF`;
    if (lnFtSlider && Number(lnFtSlider.value) !== lnFt) lnFtSlider.value = lnFt;
    if (lnFtInput && Number(lnFtInput.value) !== lnFt) lnFtInput.value = lnFt;
    if (panelBadge) panelBadge.textContent = `${panels} Panels`;
    if (postBadge) postBadge.textContent = `${posts} Posts`;

    // Update Financial Metric Display
    const subtotalEl = document.getElementById('subtotalVal');
    const midPerLFEl = document.getElementById('midPerLFVal');
    const rangeBoundsEl = document.getElementById('rangeBoundsVal');

    if (subtotalEl) subtotalEl.textContent = `$${costs.projectSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (midPerLFEl) midPerLFEl.textContent = `$${costs.midPerLF.toFixed(2)} / LF`;
    if (rangeBoundsEl) rangeBoundsEl.textContent = `$${costs.lowBound.toLocaleString()} – $${costs.highBound.toLocaleString()}`;
  }

  /**
   * Render Live Interactive SVG Fence Elevation Canvas
   */
  function renderCanvasSVG() {
    const container = document.getElementById('svgCanvasContainer');
    if (!container) return;

    const fenceHeightFt = state.height;
    const panelCountShow = 3; // Show 3 representative panels in canvas
    const panelWidthPx = 220;
    const postWidthPx = 18;
    const canvasHeightPx = 360;
    const fenceTopY = 60;
    const fenceBottomY = fenceTopY + (fenceHeightFt * 32); // 32px per foot scale
    const groundY = fenceBottomY + 12;
    const footingBottomY = groundY + 70;

    const totalWidthPx = (panelCountShow * panelWidthPx) + ((panelCountShow + 1) * postWidthPx) + 80;

    const stain = STAIN_PALETTE[state.stainKey] || STAIN_PALETTE['warm-amber'];
    const picketFill = stain.hex;
    const picketStroke = stain.border;

    let svgHtml = `
      <svg width="100%" height="100%" viewBox="0 0 ${totalWidthPx} ${canvasHeightPx + 40}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Linear Gradients for Real Wood & Post Finish -->
          <linearGradient id="stainGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${picketFill}" stop-opacity="0.95"/>
            <stop offset="50%" stop-color="${picketFill}" stop-opacity="1.0"/>
            <stop offset="100%" stop-color="${picketStroke}" stop-opacity="0.9"/>
          </linearGradient>
          
          <linearGradient id="postGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#8C6239"/>
            <stop offset="50%" stop-color="#A57547"/>
            <stop offset="100%" stop-color="#6F4D2A"/>
          </linearGradient>

          <pattern id="concretePattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#5A626A"/>
            <circle cx="2" cy="2" r="1" fill="#889098"/>
            <circle cx="6" cy="6" r="1.2" fill="#444A50"/>
          </pattern>
        </defs>

        <!-- Ground Line & Soil -->
        <rect x="0" y="${groundY}" width="${totalWidthPx}" height="${footingBottomY - groundY + 40}" fill="#181D23" opacity="0.6"/>
        <line x1="0" y1="${groundY}" x2="${totalWidthPx}" y2="${groundY}" stroke="#5C6368" stroke-width="3" stroke-dasharray="6,4"/>
        <text x="15" y="${groundY + 18}" fill="#889098" font-size="11" font-family="var(--font-mono)">GRADE LEVEL</text>
    `;

    // Render Posts & Footings
    let currentX = 40;
    const postPositions = [];

    for (let p = 0; p <= panelCountShow; p++) {
      postPositions.push(currentX);

      // Concrete Footing Hole Below Ground
      svgHtml += `
        <path d="M ${currentX - 12} ${groundY} L ${currentX + postWidthPx + 12} ${groundY} L ${currentX + postWidthPx + 8} ${footingBottomY} L ${currentX - 8} ${footingBottomY} Z" fill="url(#concretePattern)" stroke="#3A4046" stroke-width="1.5"/>
      `;

      // Wooden Post (Extends from top cap down into footing)
      svgHtml += `
        <rect x="${currentX}" y="${fenceTopY - (state.capRail ? 8 : 4)}" width="${postWidthPx}" height="${footingBottomY - fenceTopY}" fill="url(#postGrad)" stroke="#4A331C" stroke-width="1.5" rx="1"/>
      `;

      // Post Cap Pyramid Top if no cap rail
      if (!state.capRail) {
        svgHtml += `
          <polygon points="${currentX - 2},${fenceTopY - 4} ${currentX + (postWidthPx / 2)},${fenceTopY - 12} ${currentX + postWidthPx + 2},${fenceTopY - 4}" fill="#6F4D2A" stroke="#4A331C" stroke-width="1.5"/>
        `;
      }

      currentX += postWidthPx + panelWidthPx;
    }

    // Render Panels (Rails & Pickets)
    for (let i = 0; i < panelCountShow; i++) {
      const panelStartX = postPositions[i] + postWidthPx;
      const panelWidth = panelWidthPx;

      // Render Horizontal 2x4 Rails
      const railCount = state.railsPerPanel;
      const railYPositions = [];
      if (railCount === 2) {
        railYPositions.push(fenceTopY + 24, fenceBottomY - 24);
      } else {
        railYPositions.push(fenceTopY + 24, fenceTopY + ((fenceBottomY - fenceTopY) / 2), fenceBottomY - 24);
      }

      railYPositions.forEach(ry => {
        svgHtml += `
          <rect x="${panelStartX}" y="${ry - 6}" width="${panelWidth}" height="12" fill="#96693C" stroke="#5E4022" stroke-width="1"/>
        `;
      });

      // Render Pickets
      const is1x4 = state.picketWidth === '1x4';
      const picketWidthPx = is1x4 ? 9 : 14;
      let gapPx = 1;
      if (state.picketGap === 'gap-0.5') gapPx = 3;
      if (state.picketGap === 'gap-1.0') gapPx = 6;

      const picketsPerPanel = Math.floor(panelWidth / (picketWidthPx + gapPx));
      const actualStep = panelWidth / picketsPerPanel;

      for (let k = 0; k < picketsPerPanel; k++) {
        const px = panelStartX + (k * actualStep) + (gapPx / 2);
        svgHtml += `
          <rect x="${px}" y="${fenceTopY}" width="${picketWidthPx}" height="${fenceBottomY - fenceTopY}" fill="url(#stainGrad)" stroke="${picketStroke}" stroke-width="0.8" rx="0.5"/>
        `;
      }

      // Render Cap Rail across panel top
      if (state.capRail) {
        svgHtml += `
          <rect x="${panelStartX - postWidthPx}" y="${fenceTopY - 10}" width="${panelWidth + (postWidthPx * 2)}" height="10" fill="#7A522C" stroke="#4A3118" stroke-width="1.5" rx="1"/>
        `;
      }

      // Panel Dimension Callout Arrow
      svgHtml += `
        <line x1="${panelStartX}" y1="${fenceTopY - 24}" x2="${panelStartX + panelWidth}" y2="${fenceTopY - 24}" stroke="var(--color-cedar-glow)" stroke-width="1.5" stroke-dasharray="3,3"/>
        <text x="${panelStartX + (panelWidth / 2)}" y="${fenceTopY - 30}" fill="var(--color-warm-tan)" font-size="12" font-weight="600" text-anchor="middle" font-family="var(--font-mono)">8'0" PANEL</text>
      `;
    }

    // Height Dimension Callout (Left side)
    const leftX = 18;
    svgHtml += `
      <line x1="${leftX}" y1="${fenceTopY}" x2="${leftX}" y2="${fenceBottomY}" stroke="var(--color-emerald-glow)" stroke-width="1.5"/>
      <text x="${leftX}" y="${fenceTopY + ((fenceBottomY - fenceTopY) / 2)}" fill="var(--color-emerald-glow)" font-size="12" font-weight="700" text-anchor="middle" transform="rotate(-90 ${leftX} ${fenceTopY + ((fenceBottomY - fenceTopY) / 2)})" font-family="var(--font-mono)">${state.height}'0" HEIGHT</text>
    `;

    svgHtml += `</svg>`;
    container.innerHTML = svgHtml;
  }

  /**
   * Render Bottom/Sidebar BOM Itemization Breakdown
   */
  function renderBOMSummary() {
    if (!calcResults) return;

    const { bom, financials } = calcResults;
    const listEl = document.getElementById('bomItemsList');
    if (!listEl) return;

    let html = '';
    bom.items.forEach(item => {
      html += `
        <div class="component-row" style="justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.08);">
          <div style="display: flex; flex-direction: column;">
            <span style="font-size: var(--text-sm); font-weight: 500;">${item.label}</span>
            <span class="text-xs text-muted">${item.qty} ${item.unit}${item.qty > 1 ? 's' : ''} @ $${item.unitPrice.toFixed(2)}</span>
          </div>
          <span class="font-mono text-sm" style="color: var(--color-warm-tan); font-weight: 600;">$${item.totalCost.toFixed(2)}</span>
        </div>
      `;
    });

    listEl.innerHTML = html;

    // Update Breakdown Cost Pills
    const matCostEl = document.getElementById('netMatCostVal');
    const laborCostEl = document.getElementById('installedBaseVal');
    const gateCostEl = document.getElementById('gateCostVal');

    if (matCostEl) matCostEl.textContent = `$${financials.costs.netMaterialCost.toLocaleString()}`;
    if (laborCostEl) laborCostEl.textContent = `$${financials.costs.installedBaseCost.toLocaleString()}`;
    if (gateCostEl) gateCostEl.textContent = `$${financials.costs.gateCost.toLocaleString()}`;
  }

  /**
   * Setup Event Listeners for Left Control Panel
   */
  function bindEventListeners() {
    // 1. Linear Feet Controls
    const slider = document.getElementById('lnFtSlider');
    const input = document.getElementById('lnFtInput');

    if (slider) {
      slider.addEventListener('input', (e) => {
        state.lnFt = Math.max(10, Math.min(400, Number(e.target.value) || 120));
        updateCalculations();
      });
    }

    if (input) {
      input.addEventListener('change', (e) => {
        state.lnFt = Math.max(10, Math.min(400, Number(e.target.value) || 120));
        updateCalculations();
      });
    }

    // 2. Height Selector Pills
    document.querySelectorAll('[data-height-btn]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('[data-height-btn]').forEach(b => b.classList.remove('btn-primary'));
        document.querySelectorAll('[data-height-btn]').forEach(b => b.classList.add('btn-secondary'));
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');

        state.height = Number(btn.getAttribute('data-height-btn')) || 6;
        state.railsPerPanel = state.height >= 6 ? 3 : 2;
        updateCalculations();
      });
    });

    // 3. Picket Width Options
    document.querySelectorAll('[data-picket-width]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-picket-width]').forEach(b => b.classList.remove('btn-primary'));
        document.querySelectorAll('[data-picket-width]').forEach(b => b.classList.add('btn-secondary'));
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');

        state.picketWidth = btn.getAttribute('data-picket-width');
        updateCalculations();
      });
    });

    // 4. Picket Gap Options
    document.querySelectorAll('[data-picket-gap]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-picket-gap]').forEach(b => b.classList.remove('btn-primary'));
        document.querySelectorAll('[data-picket-gap]').forEach(b => b.classList.add('btn-secondary'));
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');

        state.picketGap = btn.getAttribute('data-picket-gap');
        updateCalculations();
      });
    });

    // 5. Cap Rail Toggle
    const capToggle = document.getElementById('capRailToggle');
    if (capToggle) {
      capToggle.addEventListener('change', (e) => {
        state.capRail = e.target.checked;
        updateCalculations();
      });
    }

    // 6. Stain Color Swatches
    document.querySelectorAll('[data-stain-swatch]').forEach(swatch => {
      swatch.addEventListener('click', () => {
        document.querySelectorAll('[data-stain-swatch]').forEach(s => s.classList.remove('glass-card-selected'));
        swatch.classList.add('glass-card-selected');

        state.stainKey = swatch.getAttribute('data-stain-swatch');
        updateCalculations();
      });
    });

    // 7. Ground Remediation Options
    document.querySelectorAll('[data-remediation]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-remediation]').forEach(b => b.classList.remove('btn-primary'));
        document.querySelectorAll('[data-remediation]').forEach(b => b.classList.add('btn-secondary'));
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');

        state.remediationLevel = btn.getAttribute('data-remediation');
        updateCalculations();
      });
    });

    // 8. Gate Counter Inputs
    const manGateInput = document.getElementById('manGateCount');
    const mowerGateInput = document.getElementById('mowerGateCount');
    const vehicleGateInput = document.getElementById('vehicleGateCount');

    if (manGateInput) {
      manGateInput.addEventListener('change', (e) => {
        state.manGates = Math.max(0, Number(e.target.value) || 0);
        updateCalculations();
      });
    }
    if (mowerGateInput) {
      mowerGateInput.addEventListener('change', (e) => {
        state.mowerGates = Math.max(0, Number(e.target.value) || 0);
        updateCalculations();
      });
    }
    if (vehicleGateInput) {
      vehicleGateInput.addEventListener('change', (e) => {
        state.vehicleGates = Math.max(0, Number(e.target.value) || 0);
        updateCalculations();
      });
    }

    // 9. Theme Switcher
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const current = html.getAttribute('data-theme');
        html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
      });
    }
  }

  // --- INITIALIZE ON DOM READY ---
  document.addEventListener('DOMContentLoaded', () => {
    bindEventListeners();
    updateCalculations();
  });

})();
