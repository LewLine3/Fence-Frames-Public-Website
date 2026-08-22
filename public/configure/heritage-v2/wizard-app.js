/**
 * FenceBook Heritage V2 — 3-Step Wizard Controller
 * Location: public/configure/heritage-v2/wizard-app.js
 */

(function () {
  'use strict';

  // --- STATE ---
  const state = {
    currentStep: 1,
    styleKey: 'heritage-cedar',
    lnFt: 120,
    height: 6,
    manGates: 1,
    mowerGates: 0,
    vehicleGates: 0,
    stainKey: 'warm-amber',
    customerName: '',
    customerEmail: '',
    customerPhone: ''
  };

  // Preset Configurations
  const PRESETS = [
    {
      id: 'heritage-cedar',
      badge: 'Signature Best-Seller',
      title: 'The Heritage Cedar Privacy',
      desc: 'Clean 1x6 Western Red Cedar privacy pickets with 4x4 pressure-treated posts and 3-rail construction.',
      basePricePerLF: '$38 - $44 / LF',
      height: 6,
      capRail: false
    },
    {
      id: 'craftsman-cedar',
      badge: 'Premium Architectural',
      title: 'The Craftsman Cap Rail',
      desc: 'Elegant board-on-board cedar pickets crowned with a 2x4 protective top cap rail.',
      basePricePerLF: '$44 - $52 / LF',
      height: 6,
      capRail: true
    },
    {
      id: 'modern-picket',
      badge: 'Contemporary Classic',
      title: 'The Modern Gothic Picket',
      desc: 'Sleek 1x4 gothic-top cedar pickets with 1/2" spacing for airflow and partial visibility.',
      basePricePerLF: '$32 - $38 / LF',
      height: 4,
      capRail: false
    },
    {
      id: 'horizontal-slatted',
      badge: 'Modern Shadowbox',
      title: 'The Horizontal Shadowbox',
      desc: 'Modern horizontal slatted cedar design offering privacy from front angles with architectural depth.',
      basePricePerLF: '$48 - $56 / LF',
      height: 6,
      capRail: true
    }
  ];

  // DOM Elements Cache
  let elements = {};

  function init() {
    cacheElements();
    bindEvents();
    renderCurrentStep();
    updateCalculationsAndPreview();
  }

  function cacheElements() {
    elements = {
      stepItems: document.querySelectorAll('.step-item'),
      stepContainer: document.getElementById('wizardStepContent'),
      svgContainer: document.getElementById('svgViewportContainer'),
      
      // Summary elements
      summaryStyleName: document.getElementById('summaryStyleName'),
      summaryLnFt: document.getElementById('summaryLnFt'),
      summaryPosts: document.getElementById('summaryPosts'),
      summaryRails: document.getElementById('summaryRails'),
      summaryPickets: document.getElementById('summaryPickets'),
      summaryGates: document.getElementById('summaryGates'),
      summaryStain: document.getElementById('summaryStain'),
      priceEstimateAmount: document.getElementById('priceEstimateAmount'),
      priceRangeSubtext: document.getElementById('priceRangeSubtext'),

      // Buttons
      btnBack: document.getElementById('btnBack'),
      btnNext: document.getElementById('btnNext'),
      btnGetQuote: document.getElementById('btnGetQuote'),

      // Modal
      quoteModal: document.getElementById('quoteModal'),
      modalCloseBtn: document.getElementById('modalCloseBtn'),
      quoteForm: document.getElementById('quoteForm')
    };
  }

  function bindEvents() {
    // Stepper navigation clicks
    elements.stepItems.forEach(item => {
      item.addEventListener('click', () => {
        const stepNum = parseInt(item.getAttribute('data-step'), 10);
        if (stepNum) {
          goToStep(stepNum);
        }
      });
    });

    if (elements.btnBack) {
      elements.btnBack.addEventListener('click', () => goToStep(state.currentStep - 1));
    }
    if (elements.btnNext) {
      elements.btnNext.addEventListener('click', () => goToStep(state.currentStep + 1));
    }
    if (elements.btnGetQuote) {
      elements.btnGetQuote.addEventListener('click', openQuoteModal);
    }
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeQuoteModal);
    }
    if (elements.quoteForm) {
      elements.quoteForm.addEventListener('submit', handleQuoteSubmission);
    }
  }

  function goToStep(step) {
    if (step < 1 || step > 3) return;
    state.currentStep = step;
    renderCurrentStep();
    updateStepperUI();
  }

  function updateStepperUI() {
    elements.stepItems.forEach(item => {
      const stepNum = parseInt(item.getAttribute('data-step'), 10);
      item.classList.remove('active', 'completed');
      if (stepNum === state.currentStep) {
        item.classList.add('active');
      } else if (stepNum < state.currentStep) {
        item.classList.add('completed');
      }
    });

    // Nav button visibility
    if (elements.btnBack) {
      elements.btnBack.style.visibility = state.currentStep === 1 ? 'hidden' : 'visible';
    }
    if (elements.btnNext) {
      elements.btnNext.style.display = state.currentStep === 3 ? 'none' : 'flex';
    }
    if (elements.btnGetQuote) {
      elements.btnGetQuote.style.display = state.currentStep === 3 ? 'flex' : 'none';
    }
  }

  function renderCurrentStep() {
    const container = elements.stepContainer;
    if (!container) return;

    if (state.currentStep === 1) {
      container.innerHTML = renderStep1HTML();
      bindStep1Events();
    } else if (state.currentStep === 2) {
      container.innerHTML = renderStep2HTML();
      bindStep2Events();
    } else if (state.currentStep === 3) {
      container.innerHTML = renderStep3HTML();
      bindStep3Events();
    }
  }

  /* STEP 1: STYLE SELECTION */
  function renderStep1HTML() {
    return `
      <div class="step-heading-group">
        <h2 class="step-title">1. Select Your Fence Package</h2>
        <p class="step-description">Choose from our battle-tested, signature Pacific Northwest fence designs.</p>
      </div>
      <div class="presets-grid">
        ${PRESETS.map(p => `
          <div class="preset-card ${state.styleKey === p.id ? 'selected' : ''}" data-style="${p.id}">
            <span class="preset-badge">${p.badge}</span>
            <div class="preset-card-title">${p.title}</div>
            <div class="preset-card-desc">${p.desc}</div>
            <div class="preset-card-price">${p.basePricePerLF}</div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function bindStep1Events() {
    const cards = elements.stepContainer.querySelectorAll('.preset-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const style = card.getAttribute('data-style');
        state.styleKey = style;
        const selectedPreset = PRESETS.find(p => p.id === style);
        if (selectedPreset) {
          state.height = selectedPreset.height;
        }
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        updateCalculationsAndPreview();
      });
    });
  }

  /* STEP 2: PROPERTY RUN SPECS */
  function renderStep2HTML() {
    return `
      <div class="step-heading-group">
        <h2 class="step-title">2. Property Run & Gates</h2>
        <p class="step-description">Enter your total linear footage run and required access gates.</p>
      </div>
      <div class="form-card">
        <div>
          <div class="form-label-group">
            <label class="form-label">Total Fence Run Footage</label>
            <span class="form-val-display" id="valDisplayLnFt">${state.lnFt} LF</span>
          </div>
          <input type="range" class="range-slider" id="sliderLnFt" min="20" max="400" step="5" value="${state.lnFt}" style="margin-top: 12px;" />
        </div>

        <div>
          <div class="form-label-group" style="margin-bottom: 12px;">
            <label class="form-label">Access Gate Package</label>
          </div>
          <div class="gate-counter-grid">
            <div class="gate-counter-card">
              <div>
                <div style="font-weight: 600; font-size: 0.9rem;">4' Walk Gate</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">$350 each</div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="counter-btn" id="btnDecMan">-</button>
                <span class="counter-num" id="numManGates">${state.manGates}</span>
                <button class="counter-btn" id="btnIncMan">+</button>
              </div>
            </div>

            <div class="gate-counter-card">
              <div>
                <div style="font-weight: 600; font-size: 0.9rem;">5' Mower Gate</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">$475 each</div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="counter-btn" id="btnDecMower">-</button>
                <span class="counter-num" id="numMowerGates">${state.mowerGates}</span>
                <button class="counter-btn" id="btnIncMower">+</button>
              </div>
            </div>

            <div class="gate-counter-card">
              <div>
                <div style="font-weight: 600; font-size: 0.9rem;">Double Vehicle Gate</div>
                <div style="font-size: 0.75rem; color: var(--text-muted);">$850 each</div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <button class="counter-btn" id="btnDecVehicle">-</button>
                <span class="counter-num" id="numVehicleGates">${state.vehicleGates}</span>
                <button class="counter-btn" id="btnIncVehicle">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function bindStep2Events() {
    const sliderLnFt = document.getElementById('sliderLnFt');
    const valDisplayLnFt = document.getElementById('valDisplayLnFt');

    if (sliderLnFt) {
      sliderLnFt.addEventListener('input', (e) => {
        state.lnFt = parseInt(e.target.value, 10);
        if (valDisplayLnFt) valDisplayLnFt.textContent = `${state.lnFt} LF`;
        updateCalculationsAndPreview();
      });
    }

    // Gate Counters
    bindCounter('btnDecMan', 'btnIncMan', 'numManGates', 'manGates');
    bindCounter('btnDecMower', 'btnIncMower', 'numMowerGates', 'mowerGates');
    bindCounter('btnDecVehicle', 'btnIncVehicle', 'numVehicleGates', 'vehicleGates');
  }

  function bindCounter(btnDecId, btnIncId, numId, stateKey) {
    const btnDec = document.getElementById(btnDecId);
    const btnInc = document.getElementById(btnIncId);
    const numDisplay = document.getElementById(numId);

    if (btnDec) {
      btnDec.addEventListener('click', () => {
        if (state[stateKey] > 0) {
          state[stateKey]--;
          if (numDisplay) numDisplay.textContent = state[stateKey];
          updateCalculationsAndPreview();
        }
      });
    }
    if (btnInc) {
      btnInc.addEventListener('click', () => {
        state[stateKey]++;
        if (numDisplay) numDisplay.textContent = state[stateKey];
        updateCalculationsAndPreview();
      });
    }
  }

  /* STEP 3: STAIN & FINISH */
  function renderStep3HTML() {
    const stains = window.SvgStackRenderer?.STAIN_TINTS || {};
    return `
      <div class="step-heading-group">
        <h2 class="step-title">3. Protective Stain & Finish</h2>
        <p class="step-description">Select an oil-based semi-transparent stain finish protecting against PNW rain & UV.</p>
      </div>
      <div class="form-card">
        <label class="form-label">Stain Palette Options</label>
        <div class="stain-swatches-grid">
          ${Object.keys(stains).map(key => `
            <div class="stain-chip ${state.stainKey === key ? 'selected' : ''}" data-stain="${key}">
              <div class="stain-color-preview" style="background-color: ${stains[key].hex === 'transparent' ? '#D9A066' : stains[key].hex};"></div>
              <div class="stain-chip-title">${stains[key].label}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function bindStep3Events() {
    const chips = elements.stepContainer.querySelectorAll('.stain-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const stain = chip.getAttribute('data-stain');
        state.stainKey = stain;
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        updateCalculationsAndPreview();
      });
    });
  }

  /* CALCULATION & PREVIEW RENDERER */
  function updateCalculationsAndPreview() {
    // 1. Render Pre-Drawn Stacked SVG Preview
    if (window.SvgStackRenderer && elements.svgContainer) {
      window.SvgStackRenderer.renderSvgStack(elements.svgContainer, {
        styleKey: state.styleKey,
        stainKey: state.stainKey,
        height: state.height,
        lnFt: state.lnFt
      });
    }

    // 2. Run Pure Math Backend Engine
    if (window.SandFramesMath) {
      const selectedPreset = PRESETS.find(p => p.id === state.styleKey);
      const calcResult = window.SandFramesMath.calculateFenceProject({
        lnFt: state.lnFt,
        height: state.height,
        styleKey: state.styleKey,
        capRail: selectedPreset?.capRail || false,
        manGates: state.manGates,
        mowerGates: state.mowerGates,
        vehicleGates: state.vehicleGates
      });

      updateSummaryUI(calcResult, selectedPreset);
    }
  }

  function updateSummaryUI(calcResult, preset) {
    if (!calcResult) return;

    const { bom, financials } = calcResult;

    if (elements.summaryStyleName) elements.summaryStyleName.textContent = preset?.title || 'Heritage Cedar';
    if (elements.summaryLnFt) elements.summaryLnFt.textContent = `${state.lnFt} LF`;
    if (elements.summaryPosts) elements.summaryPosts.textContent = `${bom.quantities.posts} posts (4x4 PT)`;
    if (elements.summaryRails) elements.summaryRails.textContent = `${bom.quantities.rails} rails (2x4 PT)`;
    if (elements.summaryPickets) elements.summaryPickets.textContent = `${bom.quantities.pickets} pickets`;

    const totalGates = state.manGates + state.mowerGates + state.vehicleGates;
    if (elements.summaryGates) elements.summaryGates.textContent = totalGates > 0 ? `${totalGates} gate(s)` : 'None';

    const stainObj = window.SvgStackRenderer?.STAIN_TINTS[state.stainKey];
    if (elements.summaryStain) elements.summaryStain.textContent = stainObj?.label || 'Warm Amber';

    if (elements.priceEstimateAmount) {
      elements.priceEstimateAmount.textContent = `$${financials.costs.projectSubtotal.toLocaleString()}`;
    }
    if (elements.priceRangeSubtext) {
      elements.priceRangeSubtext.textContent = `Estimated Range: $${financials.costs.lowBound.toLocaleString()} – $${financials.costs.highBound.toLocaleString()} ($${financials.costs.midPerLF}/LF installed)`;
    }
  }

  /* MODAL HANDLERS */
  function openQuoteModal() {
    if (elements.quoteModal) {
      elements.quoteModal.classList.add('active');
    }
  }

  function closeQuoteModal() {
    if (elements.quoteModal) {
      elements.quoteModal.classList.remove('active');
    }
  }

  function handleQuoteSubmission(e) {
    e.preventDefault();
    const name = document.getElementById('inputName')?.value || '';
    const email = document.getElementById('inputEmail')?.value || '';
    const phone = document.getElementById('inputPhone')?.value || '';

    alert(`Thank you, ${name}! Your fence estimate quote request for ${state.lnFt} LF of ${PRESETS.find(p => p.id === state.styleKey)?.title} has been submitted. We will contact you at ${phone || email} shortly!`);
    closeQuoteModal();
  }

  // DOM Content Loaded Init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
