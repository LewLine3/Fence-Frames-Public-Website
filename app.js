/**
 * Fence Frames Landing Page Interactive Controller (Antigravity Edition)
 * Frame Your Vision | Find Your Fence
 */

document.addEventListener('DOMContentLoaded', () => {
  initZipLookup();
  initHeroVisualizer();
  initCatalogFilters();
  initBlueprintInspector();
  initFenceCalculator();
  initSmoothScroll();
  initModals();
});

/**
 * Served ZIP Code Map & Community Resolver
 */
const SERVED_COMMUNITIES = {
  '98045': {
    name: 'Si View — North Bend, WA',
    county: 'King County',
    bylaws: '6ft Max Height | Steel Frame & Cedar VPF Approved',
    preset: 'heritage-v1'
  },
  '98065': {
    name: 'Snoqualmie Ridge — Snoqualmie, WA',
    county: 'King County',
    bylaws: 'Architectural Review Board Approved | Top Rail Accent',
    preset: 'craftsman-v1'
  },
  '98027': {
    name: 'Issaquah Highlands — Issaquah, WA',
    county: 'King County',
    bylaws: 'Horizontal Architectural Slat Spec Matched',
    preset: 'horizon-v1'
  },
  '98052': {
    name: 'Redmond Ridge — Redmond, WA',
    county: 'King County',
    bylaws: 'Zero-Sag Heavy Steel Post Spec Compliant',
    preset: 'heritage-v1'
  }
};

function initZipLookup() {
  const zipInput = document.getElementById('locateZip');
  const zipBtn = document.getElementById('locateBtn');
  const banner = document.getElementById('zipBanner');
  const modalOverlay = document.getElementById('unservedModal');

  if (!zipInput || !zipBtn) return;

  function handleLookup() {
    const zip = zipInput.value.trim();
    if (!zip) return;

    if (SERVED_COMMUNITIES[zip]) {
      const comm = SERVED_COMMUNITIES[zip];
      banner.style.display = 'flex';
      banner.innerHTML = `
        <div class="zip-result-info">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div>
            <div class="zip-result-title">SERVED LOCATION: ${comm.name}</div>
            <div class="zip-result-desc">${comm.bylaws}</div>
          </div>
        </div>
        <a href="#configurator" class="btn btn-sm btn-gold">Launch Preset</a>
      `;
    } else {
      banner.style.display = 'none';
      if (modalOverlay) {
        document.getElementById('unservedZipDisplay').textContent = zip;
        modalOverlay.classList.add('active');
      }
    }
  }

  zipBtn.addEventListener('click', handleLookup);
  zipInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleLookup();
  });
}

/**
 * Hero Section Dual-Mode Structural Visualizer Controller
 */
function initHeroVisualizer() {
  const finishBtns = document.querySelectorAll('.control-btn[data-finish]');
  const infillBtns = document.querySelectorAll('.control-btn[data-infill]');
  const explodeBtn = document.getElementById('explodeToggleBtn');
  const viewport = document.getElementById('heroVisualizerViewport');
  const frameOutline = document.getElementById('frameOutline');
  const pickets = document.querySelectorAll('.picket');
  const finishLabel = document.getElementById('finishLabel');

  const finishes = {
    black: {
      color: '#38bdf8',
      glow: '0 0 30px rgba(56, 189, 248, 0.4)',
      name: 'Matte Black Structural Steel',
      picketColor: 'rgba(255, 255, 255, 0.15)'
    },
    bronze: {
      color: '#f59e0b',
      glow: '0 0 30px rgba(245, 158, 11, 0.4)',
      name: 'Textured Bronze Anodized',
      picketColor: 'rgba(245, 158, 11, 0.2)'
    },
    silver: {
      color: '#94a3b8',
      glow: '0 0 30px rgba(148, 163, 184, 0.3)',
      name: 'Industrial Silver Galvanized',
      picketColor: 'rgba(255, 255, 255, 0.3)'
    }
  };

  finishBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      finishBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const finishKey = btn.getAttribute('data-finish');
      const finishConfig = finishes[finishKey] || finishes.black;

      if (frameOutline) {
        frameOutline.style.borderColor = finishConfig.color;
        frameOutline.style.boxShadow = finishConfig.glow;
      }

      pickets.forEach(picket => {
        picket.style.background = finishConfig.picketColor;
      });

      if (finishLabel) {
        finishLabel.textContent = finishConfig.name;
      }
    });
  });

  if (infillBtns.length > 0) {
    infillBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        infillBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const infill = btn.getAttribute('data-infill');
        
        pickets.forEach(picket => {
          if (infill === 'horizontal') {
            picket.style.transform = 'rotate(90deg) scale(0.8)';
          } else if (infill === 'mesh') {
            picket.style.borderRadius = '0px';
            picket.style.opacity = '0.5';
          } else {
            picket.style.transform = 'none';
            picket.style.borderRadius = '4px';
            picket.style.opacity = '1';
          }
        });
      });
    });
  }

  if (explodeBtn && viewport) {
    explodeBtn.addEventListener('click', () => {
      viewport.classList.toggle('exploded-mode');
      explodeBtn.classList.toggle('active');
      if (viewport.classList.contains('exploded-mode')) {
        explodeBtn.textContent = 'Collapse Assembly';
      } else {
        explodeBtn.textContent = '3D Exploded View';
      }
    });
  }
}

/**
 * Dynamic Design Catalog Filtering
 */
function initCatalogFilters() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.catalog-card');

  if (tabs.length === 0) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease-out';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * ARC Architectural Blueprint & HOA Inspector (Antigravity Signature)
 */
function initBlueprintInspector() {
  const windBtn = document.getElementById('toggleWindSimBtn');
  const windBox = document.getElementById('windSimBox');
  const viewToggleBtn = document.getElementById('blueprintViewToggle');
  const priceElements = document.querySelectorAll('.bp-price-tag');

  if (windBtn && windBox) {
    windBtn.addEventListener('click', () => {
      windBox.classList.toggle('simulating');
      windBtn.classList.toggle('active');
      if (windBox.classList.contains('simulating')) {
        windBtn.innerHTML = '🛑 Stop 150 MPH Wind Test';
      } else {
        windBtn.innerHTML = '💨 Run 150 MPH Wind Simulation';
      }
    });
  }

  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
      const isHOAMode = viewToggleBtn.getAttribute('data-mode') === 'hoa';
      if (isHOAMode) {
        viewToggleBtn.setAttribute('data-mode', 'quote');
        viewToggleBtn.textContent = 'Switch to Clean HOA View (Non-Priced)';
        priceElements.forEach(el => el.style.display = 'inline-block');
      } else {
        viewToggleBtn.setAttribute('data-mode', 'hoa');
        viewToggleBtn.textContent = 'Switch to Priced Contractor Quote';
        priceElements.forEach(el => el.style.display = 'none');
      }
    });
  }
}

/**
 * Interactive Job Material Estimator
 */
function initFenceCalculator() {
  const footageInput = document.getElementById('calcFootage');
  const heightSelect = document.getElementById('calcHeight');
  const styleSelect = document.getElementById('calcStyle');

  const resPosts = document.getElementById('resPosts');
  const resFrames = document.getElementById('resFrames');
  const resBrackets = document.getElementById('resBrackets');
  const resWeight = document.getElementById('resWeight');

  function calculate() {
    if (!footageInput) return;
    const footage = parseFloat(footageInput.value) || 0;
    const height = parseFloat(heightSelect ? heightSelect.value : 6) || 6;
    const isCommercial = styleSelect && styleSelect.value === 'commercial';

    if (footage <= 0) {
      if (resPosts) resPosts.textContent = '0';
      if (resFrames) resFrames.textContent = '0';
      if (resBrackets) resBrackets.textContent = '0';
      if (resWeight) resWeight.textContent = '0 lbs';
      return;
    }

    const panelWidth = isCommercial ? 8 : 6;
    const frameCount = Math.ceil(footage / panelWidth);
    const postCount = frameCount + 1;
    const bracketCount = frameCount * 4;

    const weightPerFrame = height * (isCommercial ? 9.5 : 7.5);
    const totalWeight = Math.round(frameCount * weightPerFrame);

    if (resPosts) resPosts.textContent = postCount.toLocaleString();
    if (resFrames) resFrames.textContent = frameCount.toLocaleString();
    if (resBrackets) resBrackets.textContent = bracketCount.toLocaleString();
    if (resWeight) resWeight.textContent = totalWeight.toLocaleString() + ' lbs';
  }

  if (footageInput) {
    footageInput.addEventListener('input', calculate);
    if (heightSelect) heightSelect.addEventListener('change', calculate);
    if (styleSelect) styleSelect.addEventListener('change', calculate);
    calculate();
  }
}

/**
 * Modals Handler
 */
function initModals() {
  const closeBtns = document.querySelectorAll('.modal-close');
  const overlays = document.querySelectorAll('.modal-overlay');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(o => o.classList.remove('active'));
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

/**
 * Smooth Scroll
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
