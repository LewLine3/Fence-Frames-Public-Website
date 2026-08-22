/* ==========================================================================
   Fence Frames — Detail Wizard Engine (`wizard.js`)
   3-Row Vertical Layout & Dual Front/Back Visualizer:
   - Row 1: Dual Equal Ratio Front & Back SVG Visualizer Boxes (112x86 Module Aspect Ratio)
   - Row 2: Styled Options Toolbar for CURRENT SLIDE ONLY + Back / Next Stage Navigation
   - Row 3: Deep Component Architectural & Structural Explanation Panel
   - Grounded strictly in official designer registry (pilot-configurator-registry.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Official Deep Component Explanations Dictionary
  const OPTION_EXPLANATIONS = {
    // Stage 1: Style Line & Height
    'vpf-natural-wood': {
      title: 'Vertical Cedar Picket Fence (VPF — Natural Wood)',
      text: 'The standard vertical picket design. Features 4x4 pressure-treated wood posts, 2x4 cedar horizontal stringers, and vertical Western Red Cedar pickets. Fully customizable with trim, caps, and stain.'
    },
    'hf-board-fence': {
      title: 'Horizontal Board Fence (HF — Board Fence)',
      text: 'Modern horizontal board layout with pickets laid flat from post to post. Creates clean horizontal sightlines popular in modern PNW architecture.'
    },
    'fabric-welded-wire': {
      title: 'Welded Wire Fabric Fence (WWR)',
      text: 'Heavy gauge steel welded wire mesh framed between 4x4 PT posts and 2x4 cedar rails. Ideal for open view corridors, pet containment, and garden perimeters.'
    },
    'fabric-lattice': {
      title: 'Lattice Panel Frame (LAT)',
      text: 'Privacy lattice panel framed inside 2x4 cedar rails. Provides partial wind diffusion and semi-private garden screening.'
    },
    'hoa-si-view': {
      title: 'Si View Approved Community Privacy Fence (North Bend, WA)',
      text: 'Pre-approved 6ft cedar privacy fence for Si View Community. Spec: 4x4 PT Incised Posts, 2x4 Cedar 3-Rail Frame, Flat Top Cedar Pickets, and Sherwin-Williams Asteroid SW-3558 stain.'
    },
    '6ft': {
      title: '6′ Full Privacy (72″ Height)',
      text: 'Standard 6-foot full privacy perimeter height. Provides maximum visual screening for backyard living spaces.'
    },
    '5ft': {
      title: '5′ Semi-Privacy (60″ Height)',
      text: '5-foot semi-privacy height. Approved maximum fence height for Si View HOA property perimeters.'
    },

    // Stage 2: Posts
    'pt-incised': {
      title: '4x4 Pressure-Treated Incised Wood Post (`pt-incised`)',
      text: 'Incised pressure-treated wood post. Micro-incisions allow preservative treatment to penetrate deep into the wood core, protecting against soil moisture rot in Pacific Northwest ground contact.'
    },
    'pt-appearance': {
      title: '4x4 PT Appearance Grade Wood Post (`pt-appearance`)',
      text: 'Smooth appearance grade pressure treated post without surface incisions. Provides a cleaner visual finish while retaining basic ground-contact rot treatment.'
    },

    // Stage 3: Framing & Rails
    'three-rail-standard': {
      title: '2x4 Cedar 3-Rail Frame (`three-rail-standard`)',
      text: 'Triple horizontal 2x4 cedar stringers (Top, Middle, Bottom). Essential for 6ft panels to prevent center bow and maintain rigid picket alignment over 8ft post spans.'
    },
    'two-rail-standard': {
      title: '2x4 Cedar 2-Rail Frame (`two-rail-standard`)',
      text: 'Dual horizontal 2x4 cedar stringers. Suitable for lower 4ft and 5ft fence heights with lighter structural loads.'
    },
    'cap-on': {
      title: '2x4 Cedar Top Cap Rail (`railCap: on`)',
      text: '2x4 Cedar cap rail laid flat across the top of all pickets. Protects picket end-grain from rain soak while providing a finished architectural top edge.'
    },
    'cap-off': {
      title: 'No Top Cap Rail (`railCap: off`)',
      text: 'Exposes clean vertical picket tops without a top cap rail.'
    },

    // Stage 4: Pickets
    'flat-top-cedar': {
      title: 'Flat Top Cedar Pickets (`flat-top-cedar`)',
      text: 'Clean square-cut Western Red Cedar pickets. Standard approved picket cut for Si View HOA.'
    },
    'dog-eared-cedar': {
      title: 'Dog Eared Cedar Pickets (`dog-eared-cedar`)',
      text: 'Classic chamfered corner picket tops providing traditional suburban aesthetic.'
    },
    'gothic-cedar': {
      title: 'Gothic Point Cedar Pickets (`gothic-cedar`)',
      text: 'Decorative arch-pointed picket tops for classic craftsman architecture.'
    },
    'board-on-board-heritage': {
      title: 'Board-on-Board Overlapping Pickets (`board-on-board-heritage`)',
      text: 'Overlapping picket placement eliminating gaps when wood shrinks in summer heat. Guarantees 100% complete visual privacy.'
    },
    'width-5.5': {
      title: '5.5″ Width Pickets (1x6 Boards)',
      text: '16 pickets per 8ft panel section. Creates a bold, wide-plank appearance.'
    },
    'width-3.5': {
      title: '3.5″ Width Pickets (1x4 Boards)',
      text: '23 pickets per 8ft panel section. Finer vertical grain texture.'
    },

    // Stage 5: Trim Profile
    'cedar-1t': {
      title: 'Cedar 1-Trim Bottom Board (`cedar-1t`)',
      text: '1x4 Cedar rot board along the bottom base line. Elevates vertical pickets 2 inches above soil and grass moisture.'
    },
    'cedar-2t': {
      title: 'Cedar 2-Trim Top & Bottom Boards (`cedar-2t`)',
      text: 'Dual 1x4 Cedar trim boards sandwiching top and bottom picket ends for picture-frame architectural finish.'
    },
    'trim-none': {
      title: 'No Trim Board (`none`)',
      text: 'Pickets extend cleanly to base line without bottom rot board.'
    },

    // Stage 6: Caps & Brackets
    'cap-none': { title: 'No Post Caps (`none`)', text: 'Flat square-cut post tops.' },
    'cedar-pyramid': { title: 'Cedar Pyramid Post Cap (`cedar-pyramid`)', text: 'Molded solid cedar pyramid cap shedding rain off post top.' },
    'copper-pyramid': { title: 'Copper Pyramid Post Cap (`copper-pyramid`)', text: 'Real copper post cap that develops a rich natural patina.' },
    'solar-pyramid': { title: 'Solar LED Pyramid Cap (`solar-pyramid`)', text: 'Solar powered LED illuminated post cap for night ambient lighting.' },

    // Stage 7: Stain Finish
    'cedar-natural': {
      title: 'Natural Cedar Transparent Sealant (`cedar-natural`)',
      text: 'Clear penetrating oil sealer highlighting Western Red Cedar red and gold wood grain.'
    },
    'pt-brown': {
      title: 'PT Brown Semi-Transparent Stain (`pt-brown`)',
      text: 'Rich pressure-treated brown oil stain providing deep tone uniform coverage.'
    },
    'asteroid-sw-3558': {
      title: 'Sherwin-Williams SW-3558 Asteroid Stain (`asteroid-sw-3558`)',
      text: 'Sherwin-Williams Woodscapes semi-transparent stain formula 3558-789 ("Asteroid"). Mandatory approved stain tone for Si View HOA.'
    },

    // Stage 8: Takeoff
    'takeoff-stage': {
      title: 'King County Supply Yard Material Takeoff',
      text: 'Real-time itemized materials cost comparison across Home Depot, Lowe\'s, Dunn Lumber (King Co.), and Chinook Lumber.'
    }
  };

  // State Management
  const state = {
    currentStep: 1,
    totalSteps: 8,
    styleLine: 'vpf-natural-wood',
    lengthFt: 50,
    fenceHeight: '6ft',
    communityPresetKey: 'open',
    posts: 'pt-incised',
    rails: 'three-rail-standard',
    railCap: 'on',
    picketStyle: 'flat-top-cedar',
    picketWidth: '5.5',
    picketSpacing: '1-16-privacy',
    trim: 'cedar-1t',
    postCaps: 'none',
    brackets: 'none',
    stain: 'cedar-natural',
    activeOptionKey: 'vpf-natural-wood',
    
    isLoggedIn: false,
    pricingOn: true
  };

  // Supply Yard Pricing Rates
  const vendorRates = {
    'hd': { name: "Home Depot", factor: 1.0 },
    'lowes': { name: "Lowe's", factor: 1.03 },
    'dunn': { name: "Dunn Lumber (King Co.)", factor: 0.96 },
    'chinook': { name: "Chinook Lumber (King Co.)", factor: 0.98 }
  };

  // DOM Selectors
  const elements = {
    stepperItems: document.querySelectorAll('.step-item'),
    stepperDividers: document.querySelectorAll('.step-divider'),
    btnPrev: document.getElementById('btnPrev'),
    btnNext: document.getElementById('btnNext'),
    
    // Front & Back SVG Layers
    frontSvg: document.getElementById('frontSvgCanvas'),
    backSvg: document.getElementById('backSvgCanvas'),

    // Toolbar Container & Explanation
    toolbarOptionsContainer: document.getElementById('toolbarOptionsContainer'),
    toolbarStageTitle: document.getElementById('toolbarStageTitle'),
    explanationTitle: document.getElementById('explanationTitle'),
    explanationBody: document.getElementById('explanationBody'),

    // Specs & Quote Readouts
    specLengthDisplay: document.getElementById('specLengthDisplay'),
    specHeightDisplay: document.getElementById('specHeightDisplay'),
    specPostDisplay: document.getElementById('specPostDisplay'),
    specPicketDisplay: document.getElementById('specPicketDisplay'),
    quoteDisplayRange: document.getElementById('quoteDisplayRange'),
    quoteMcDisplay: document.getElementById('quoteMcDisplay'),
    quoteMidDisplay: document.getElementById('quoteMidDisplay'),
    hoaVarianceBadge: document.getElementById('hoaVarianceBadge'),

    // Vendor Grid
    vendorBoxes: {
      hd: document.getElementById('vbox-hd'),
      lowes: document.getElementById('vbox-lowes'),
      dunn: document.getElementById('vbox-dunn'),
      chinook: document.getElementById('vbox-chinook')
    },

    // Actions & Modals
    btnSaveDesign: document.getElementById('btnSaveDesign'),
    btnPrintArc: document.getElementById('btnPrintArc'),
    btnMatchContractors: document.getElementById('btnMatchContractors'),
    lateGateModal: document.getElementById('lateGateModal'),
    btnCloseLateGate: document.getElementById('btnCloseLateGate'),
    lateGateForm: document.getElementById('lateGateForm'),
    arcSpecModal: document.getElementById('arcSpecModal'),
    btnCloseArcSpec: document.getElementById('btnCloseArcSpec'),
    btnExecutePrint: document.getElementById('btnExecutePrint'),
    arcModalContent: document.getElementById('arcModalContent')
  };

  // Canonical Quote Math Engine (§03)
  function computeQuoteSummary() {
    const L_ft = state.lengthFt;
    const heightIn = (state.fenceHeight === '4ft') ? 48 : ((state.fenceHeight === '5ft') ? 60 : 72);
    const heightFactor = heightIn / 72.0;

    const panelCount = Math.max(1, Math.ceil(L_ft / 8));
    const postCount = panelCount + 1;
    const postCostEach = (state.posts === 'pt-incised') ? 28.50 : 34.00;
    const totalPostsMc = postCount * postCostEach;

    const railMultiplier = (state.rails === 'three-rail-standard') ? 3 : 2;
    const railCostEach = 18.50;
    let totalRailsMc = panelCount * railMultiplier * railCostEach;
    if (state.railCap === 'on') totalRailsMc += panelCount * 14.50;

    const perPanelPickets = (state.picketWidth === '3.5') ? 23 : 16;
    const totalPickets = perPanelPickets * panelCount;
    let picketCostEach = 4.80 * heightFactor;
    if (state.picketStyle === 'board-on-board-heritage') picketCostEach *= 1.3;
    const totalPicketsMc = totalPickets * picketCostEach;

    let trimMc = 0;
    if (state.trim === 'cedar-1t') trimMc += panelCount * 18.00;
    if (state.trim === 'cedar-2t') trimMc += panelCount * 32.00;

    let hardwareMc = postCount * 4.50;
    if (state.brackets !== 'none') hardwareMc += postCount * 6.50;
    if (state.postCaps === 'copper-pyramid') hardwareMc += postCount * 12.00;
    if (state.postCaps === 'solar-pyramid') hardwareMc += postCount * 18.00;

    let stainMc = L_ft * 4.50 * heightFactor;

    const MC = totalPostsMc + totalRailsMc + totalPicketsMc + trimMc + hardwareMc + stainMc;
    const M = MC * 1.25;
    const L = M * 2.0;
    const A = (M + L) * 0.15;
    const quotedMid = M + L + A;
    const displayLow = Math.round(quotedMid * 0.85);
    const displayHigh = Math.round(quotedMid * 1.15);

    return { MC: Math.round(MC), M: Math.round(M), L: Math.round(L), A: Math.round(A), quotedMid: Math.round(quotedMid), displayLow, displayHigh, postCount, totalPickets };
  }

  // Render Front & Back SVG Visualizer Layers (112x86 aspect ratio)
  function renderSvgCanvases() {
    const step = state.currentStep;
    const stainColor = (state.stain === 'cedar-natural') ? '#d97706' : ((state.stain === 'pt-brown') ? '#78350f' : '#475569');

    // FRONT VIEW SVG (Pickets in front of rails, trim in front)
    if (elements.frontSvg) {
      elements.frontSvg.innerHTML = `
        <rect x="0" y="300" width="800" height="100" fill="#1b2430" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#10b981" stroke-width="3" stroke-dasharray="8 4" />
        
        <!-- Step 2+: Posts (Behind on Front View) -->
        <g style="display: ${step >= 2 ? 'block' : 'none'}; opacity: ${step === 2 ? 1 : 0.4};">
          <rect x="80" y="60" width="24" height="240" fill="#475569" rx="2" />
          <rect x="388" y="60" width="24" height="240" fill="#475569" rx="2" />
          <rect x="696" y="60" width="24" height="240" fill="#475569" rx="2" />
        </g>

        <!-- Step 3+: Rails -->
        <g style="display: ${step >= 3 ? 'block' : 'none'}; opacity: ${step === 3 ? 1 : 0.6};">
          <rect x="80" y="80" width="640" height="16" fill="#334155" />
          <rect x="80" y="180" width="640" height="16" fill="#334155" />
          <rect x="80" y="280" width="640" height="16" fill="#334155" />
          ${state.railCap === 'on' ? '<rect x="76" y="66" width="648" height="14" fill="#94a3b8" rx="1" />' : ''}
        </g>

        <!-- Step 4+: Pickets (Front View: Pickets Cover Rails) -->
        <g style="display: ${step >= 4 ? 'block' : 'none'};">
          ${[110, 142, 174, 206, 238, 270, 302, 334, 420, 452, 484, 516, 548, 580, 612, 644].map(x => 
            `<rect x="${x}" y="70" width="${state.picketWidth === '3.5' ? 20 : 28}" height="225" fill="${stainColor}" rx="1" />`
          ).join('')}
        </g>

        <!-- Step 5+: Trim Profile -->
        <g style="display: ${step >= 5 ? 'block' : 'none'};">
          ${state.trim.includes('1t') || state.trim.includes('2t') ? '<rect x="80" y="282" width="640" height="16" fill="#92400e" />' : ''}
          ${state.trim.includes('2t') ? '<rect x="80" y="70" width="640" height="16" fill="#92400e" />' : ''}
        </g>

        <!-- Step 6+: Post Caps -->
        <g style="display: ${step >= 6 ? 'block' : 'none'};">
          ${state.postCaps === 'cedar-pyramid' ? '<polygon points="80,60 92,44 104,60" fill="#d97706"/><polygon points="388,60 400,44 412,60" fill="#d97706"/><polygon points="696,60 708,44 720,60" fill="#d97706"/>' : ''}
          ${state.postCaps === 'copper-pyramid' ? '<polygon points="80,60 92,44 104,60" fill="#b45309"/><polygon points="388,60 400,44 412,60" fill="#b45309"/><polygon points="696,60 708,44 720,60" fill="#b45309"/>' : ''}
        </g>
      `;
    }

    // BACK VIEW SVG (Posts & Rails in FRONT of Pickets)
    if (elements.backSvg) {
      elements.backSvg.innerHTML = `
        <rect x="0" y="300" width="800" height="100" fill="#1b2430" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#10b981" stroke-width="3" stroke-dasharray="8 4" />
        
        <!-- Step 4+: Pickets (Behind on Back View) -->
        <g style="display: ${step >= 4 ? 'block' : 'none'};">
          ${[110, 142, 174, 206, 238, 270, 302, 334, 420, 452, 484, 516, 548, 580, 612, 644].map(x => 
            `<rect x="${x}" y="70" width="${state.picketWidth === '3.5' ? 20 : 28}" height="225" fill="${stainColor}" opacity="0.8" rx="1" />`
          ).join('')}
        </g>

        <!-- Step 3+: Rails (In Front on Back View) -->
        <g style="display: ${step >= 3 ? 'block' : 'none'};">
          <rect x="80" y="80" width="640" height="16" fill="#334155" />
          <rect x="80" y="180" width="640" height="16" fill="#334155" />
          <rect x="80" y="280" width="640" height="16" fill="#334155" />
        </g>

        <!-- Step 2+: Posts (In Front on Back View) -->
        <g style="display: ${step >= 2 ? 'block' : 'none'};">
          <rect x="80" y="60" width="24" height="240" fill="#475569" rx="2" />
          <rect x="388" y="60" width="24" height="240" fill="#475569" rx="2" />
          <rect x="696" y="60" width="24" height="240" fill="#475569" rx="2" />
        </g>
      `;
    }
  }

  // Render Row 2 Options Toolbar ONLY for CURRENT SLIDE
  function renderCurrentSlideToolbar() {
    const step = state.currentStep;
    let toolbarHtml = '';
    let stageTitle = '';

    if (step === 1) {
      stageTitle = 'Stage 1: Style Line & Height';
      toolbarHtml = `
        <label class="option-pill ${state.styleLine === 'vpf-natural-wood' ? 'active' : ''}">
          <input type="radio" name="styleLine" value="vpf-natural-wood" ${state.styleLine === 'vpf-natural-wood' ? 'checked' : ''}> VPF Cedar Picket
        </label>
        <label class="option-pill ${state.styleLine === 'hf-board-fence' ? 'active' : ''}">
          <input type="radio" name="styleLine" value="hf-board-fence" ${state.styleLine === 'hf-board-fence' ? 'checked' : ''}> HF Board Fence
        </label>
        <label class="option-pill ${state.styleLine === 'fabric-welded-wire' ? 'active' : ''}">
          <input type="radio" name="styleLine" value="fabric-welded-wire" ${state.styleLine === 'fabric-welded-wire' ? 'checked' : ''}> Welded Wire
        </label>
        <label class="option-pill ${state.styleLine === 'hoa-si-view' ? 'active' : ''}">
          <input type="radio" name="styleLine" value="hoa-si-view" ${state.styleLine === 'hoa-si-view' ? 'checked' : ''}> Si View HOA
        </label>
        <div style="height: 20px; width: 1px; background: var(--ui-outline-soft); margin: 0 0.5rem;"></div>
        <label class="option-pill ${state.fenceHeight === '6ft' ? 'active' : ''}">
          <input type="radio" name="fenceHeight" value="6ft" ${state.fenceHeight === '6ft' ? 'checked' : ''}> 6′ Privacy
        </label>
        <label class="option-pill ${state.fenceHeight === '5ft' ? 'active' : ''}">
          <input type="radio" name="fenceHeight" value="5ft" ${state.fenceHeight === '5ft' ? 'checked' : ''}> 5′ Semi-Privacy
        </label>
      `;
    } else if (step === 2) {
      stageTitle = 'Stage 2: Structural 4x4 Posts';
      toolbarHtml = `
        <label class="option-pill ${state.posts === 'pt-incised' ? 'active' : ''}">
          <input type="radio" name="posts" value="pt-incised" ${state.posts === 'pt-incised' ? 'checked' : ''}> 4x4 PT Incised Wood (`pt-incised`)
        </label>
        <label class="option-pill ${state.posts === 'pt-appearance' ? 'active' : ''}">
          <input type="radio" name="posts" value="pt-appearance" ${state.posts === 'pt-appearance' ? 'checked' : ''}> 4x4 PT Appearance (`pt-appearance`)
        </label>
      `;
    } else if (step === 3) {
      stageTitle = 'Stage 3: Horizontal Framing & Top Cap';
      toolbarHtml = `
        <label class="option-pill ${state.rails === 'three-rail-standard' ? 'active' : ''}">
          <input type="radio" name="rails" value="three-rail-standard" ${state.rails === 'three-rail-standard' ? 'checked' : ''}> 2x4 Cedar 3-Rail
        </label>
        <label class="option-pill ${state.rails === 'two-rail-standard' ? 'active' : ''}">
          <input type="radio" name="rails" value="two-rail-standard" ${state.rails === 'two-rail-standard' ? 'checked' : ''}> 2x4 Cedar 2-Rail
        </label>
        <div style="height: 20px; width: 1px; background: var(--ui-outline-soft); margin: 0 0.5rem;"></div>
        <label class="option-pill ${state.railCap === 'on' ? 'active' : ''}">
          <input type="radio" name="railCap" value="on" ${state.railCap === 'on' ? 'checked' : ''}> Top Cap Rail ON
        </label>
        <label class="option-pill ${state.railCap === 'off' ? 'active' : ''}">
          <input type="radio" name="railCap" value="off" ${state.railCap === 'off' ? 'checked' : ''}> Cap Rail OFF
        </label>
      `;
    } else if (step === 4) {
      stageTitle = 'Stage 4: Cedar Pickets & Width';
      toolbarHtml = `
        <label class="option-pill ${state.picketStyle === 'flat-top-cedar' ? 'active' : ''}">
          <input type="radio" name="picketStyle" value="flat-top-cedar" ${state.picketStyle === 'flat-top-cedar' ? 'checked' : ''}> Flat Top Cedar
        </label>
        <label class="option-pill ${state.picketStyle === 'dog-eared-cedar' ? 'active' : ''}">
          <input type="radio" name="picketStyle" value="dog-eared-cedar" ${state.picketStyle === 'dog-eared-cedar' ? 'checked' : ''}> Dog Eared Cedar
        </label>
        <label class="option-pill ${state.picketStyle === 'board-on-board-heritage' ? 'active' : ''}">
          <input type="radio" name="picketStyle" value="board-on-board-heritage" ${state.picketStyle === 'board-on-board-heritage' ? 'checked' : ''}> Board-on-Board
        </label>
        <div style="height: 20px; width: 1px; background: var(--ui-outline-soft); margin: 0 0.5rem;"></div>
        <label class="option-pill ${state.picketWidth === '5.5' ? 'active' : ''}">
          <input type="radio" name="picketWidth" value="5.5" ${state.picketWidth === '5.5' ? 'checked' : ''}> 5.5″ (1x6)
        </label>
        <label class="option-pill ${state.picketWidth === '3.5' ? 'active' : ''}">
          <input type="radio" name="picketWidth" value="3.5" ${state.picketWidth === '3.5' ? 'checked' : ''}> 3.5″ (1x4)
        </label>
      `;
    } else if (step === 5) {
      stageTitle = 'Stage 5: Trim Board Profile';
      toolbarHtml = `
        <label class="option-pill ${state.trim === 'cedar-1t' ? 'active' : ''}">
          <input type="radio" name="trim" value="cedar-1t" ${state.trim === 'cedar-1t' ? 'checked' : ''}> Cedar 1-Trim Bottom Board (`cedar-1t`)
        </label>
        <label class="option-pill ${state.trim === 'cedar-2t' ? 'active' : ''}">
          <input type="radio" name="trim" value="cedar-2t" ${state.trim === 'cedar-2t' ? 'checked' : ''}> Cedar 2-Trim Top/Bottom (`cedar-2t`)
        </label>
        <label class="option-pill ${state.trim === 'none' ? 'active' : ''}">
          <input type="radio" name="trim" value="none" ${state.trim === 'none' ? 'checked' : ''}> No Trim (`none`)
        </label>
      `;
    } else if (step === 6) {
      stageTitle = 'Stage 6: Post Caps & Rail Brackets';
      toolbarHtml = `
        <label class="option-pill ${state.postCaps === 'none' ? 'active' : ''}">
          <input type="radio" name="postCaps" value="none" ${state.postCaps === 'none' ? 'checked' : ''}> No Caps
        </label>
        <label class="option-pill ${state.postCaps === 'cedar-pyramid' ? 'active' : ''}">
          <input type="radio" name="postCaps" value="cedar-pyramid" ${state.postCaps === 'cedar-pyramid' ? 'checked' : ''}> Cedar Pyramid
        </label>
        <label class="option-pill ${state.postCaps === 'copper-pyramid' ? 'active' : ''}">
          <input type="radio" name="postCaps" value="copper-pyramid" ${state.postCaps === 'copper-pyramid' ? 'checked' : ''}> Copper Pyramid
        </label>
        <label class="option-pill ${state.postCaps === 'solar-pyramid' ? 'active' : ''}">
          <input type="radio" name="postCaps" value="solar-pyramid" ${state.postCaps === 'solar-pyramid' ? 'checked' : ''}> Solar LED Cap
        </label>
      `;
    } else if (step === 7) {
      stageTitle = 'Stage 7: Stain & Protective Sealant';
      toolbarHtml = `
        <label class="option-pill ${state.stain === 'cedar-natural' ? 'active' : ''}">
          <input type="radio" name="stain" value="cedar-natural" ${state.stain === 'cedar-natural' ? 'checked' : ''}> Natural Cedar Sealer
        </label>
        <label class="option-pill ${state.stain === 'pt-brown' ? 'active' : ''}">
          <input type="radio" name="stain" value="pt-brown" ${state.stain === 'pt-brown' ? 'checked' : ''}> PT Brown Stain
        </label>
        <label class="option-pill ${state.stain === 'asteroid-sw-3558' ? 'active' : ''}">
          <input type="radio" name="stain" value="asteroid-sw-3558" ${state.stain === 'asteroid-sw-3558' ? 'checked' : ''}> SW Asteroid SW-3558 (Si View Formula)
        </label>
      `;
    } else if (step === 8) {
      stageTitle = 'Stage 8: Supply Yard Takeoff';
      toolbarHtml = `
        <span class="badge badge-teal">Live Price Engines:</span>
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">Home Depot · Lowe's · Dunn Lumber (King Co.) · Chinook Lumber</span>
      `;
    }

    if (elements.toolbarStageTitle) elements.toolbarStageTitle.textContent = stageTitle;
    if (elements.toolbarOptionsContainer) elements.toolbarOptionsContainer.innerHTML = toolbarHtml;

    // Update Row 3 Explanation Panel
    const exp = OPTION_EXPLANATIONS[state.activeOptionKey] || OPTION_EXPLANATIONS[state.styleLine] || { title: 'Component Specification', text: 'Select an option to view structural engineering details.' };
    if (elements.explanationTitle) elements.explanationTitle.textContent = exp.title;
    if (elements.explanationBody) elements.explanationBody.textContent = exp.text;
  }

  // Master UI Sync
  function renderUI() {
    const calc = computeQuoteSummary();

    // Stepper header
    elements.stepperItems.forEach((item, idx) => {
      const stepNum = idx + 1;
      item.classList.remove('active', 'completed');
      if (stepNum === state.currentStep) item.classList.add('active');
      else if (stepNum < state.currentStep) item.classList.add('completed');
    });

    elements.stepperDividers.forEach((div, idx) => {
      if (idx < state.currentStep - 1) div.classList.add('active');
      else div.classList.remove('active');
    });

    // Specs
    elements.specLengthDisplay.textContent = `${state.lengthFt} ft`;
    elements.specHeightDisplay.textContent = state.fenceHeight;
    elements.specPostDisplay.textContent = (state.posts === 'pt-incised') ? '4x4 PT Incised' : '4x4 PT Appearance';
    elements.specPicketDisplay.textContent = (state.picketStyle === 'flat-top-cedar') ? 'Flat Top Cedar' : 'Board-on-Board';

    // Quote
    elements.quoteDisplayRange.textContent = `$${calc.displayLow.toLocaleString()} – $${calc.displayHigh.toLocaleString()}`;
    elements.quoteMcDisplay.textContent = `$${calc.MC.toLocaleString()}`;
    elements.quoteMidDisplay.textContent = `$${calc.quotedMid.toLocaleString()}`;

    // Render Row 2 Toolbar & Row 3 Explanation
    renderCurrentSlideToolbar();

    // Render Row 1 Dual Visualizers
    renderSvgCanvases();
  }

  function goToStep(step) {
    if (step < 1) step = 1;
    if (step > state.totalSteps) step = state.totalSteps;
    state.currentStep = step;
    renderUI();
  }

  if (elements.btnPrev) elements.btnPrev.addEventListener('click', () => goToStep(state.currentStep - 1));
  if (elements.btnNext) elements.btnNext.addEventListener('click', () => goToStep(state.currentStep + 1));

  elements.stepperItems.forEach((item, idx) => {
    item.addEventListener('click', () => goToStep(idx + 1));
  });

  // Dynamic Radio Inputs Listener for Toolbar
  document.addEventListener('change', (e) => {
    const target = e.target;
    state.activeOptionKey = target.value;

    if (target.name === 'styleLine') state.styleLine = target.value;
    if (target.name === 'fenceHeight') state.fenceHeight = target.value;
    if (target.name === 'posts') state.posts = target.value;
    if (target.name === 'rails') state.rails = target.value;
    if (target.name === 'railCap') state.railCap = target.value;
    if (target.name === 'picketStyle') state.picketStyle = target.value;
    if (target.name === 'picketWidth') state.picketWidth = target.value;
    if (target.name === 'trim') state.trim = target.value;
    if (target.name === 'postCaps') state.postCaps = target.value;
    if (target.name === 'stain') state.stain = target.value;

    renderUI();
  });

  // Late Gate Auth Trigger
  function triggerLateGateModal(actionName) {
    if (state.isLoggedIn) {
      alert(`[Authorized] '${actionName}' executed!`);
      return;
    }
    document.getElementById('lateGateActionName').textContent = actionName;
    elements.lateGateModal.classList.add('active');
  }

  if (elements.btnSaveDesign) elements.btnSaveDesign.addEventListener('click', () => triggerLateGateModal('Save Design'));
  if (elements.btnMatchContractors) elements.btnMatchContractors.addEventListener('click', () => triggerLateGateModal('Match Local Contractors (3-Seat Scramble)'));
  if (elements.btnCloseLateGate) elements.btnCloseLateGate.addEventListener('click', () => elements.lateGateModal.classList.remove('active'));

  if (elements.lateGateForm) {
    elements.lateGateForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('gateUserEmail').value;
      if (email) {
        state.isLoggedIn = true;
        elements.lateGateModal.classList.remove('active');
        alert(`🎉 Welcome ${email}! Access unlocked.`);
      }
    });
  }

  if (elements.btnPrintArc) elements.btnPrintArc.addEventListener('click', () => {
    if (!state.isLoggedIn) triggerLateGateModal('Create Printable ARC Spec Sheet (PDF)');
    else window.print();
  });

  // Boot
  renderUI();
});
