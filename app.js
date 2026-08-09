/**
 * Fence Frames Landing Page Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroVisualizer();
  initFenceCalculator();
  initSmoothScroll();
});

/**
 * Hero Section Interactive Spec Switcher
 */
function initHeroVisualizer() {
  const controlBtns = document.querySelectorAll('.control-btn');
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

  controlBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      controlBtns.forEach(b => b.classList.remove('active'));
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
}

/**
 * Interactive Fence Calculator & Material Estimator
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
    const footage = parseFloat(footageInput.value) || 0;
    const height = parseFloat(heightSelect.value) || 6;
    const isCommercial = styleSelect.value === 'commercial';

    if (footage <= 0) {
      resPosts.textContent = '0';
      resFrames.textContent = '0';
      resBrackets.textContent = '0';
      resWeight.textContent = '0 lbs';
      return;
    }

    // Standard panel width: 6 feet (72 inches) or 8 feet
    const panelWidth = isCommercial ? 8 : 6;
    const frameCount = Math.ceil(footage / panelWidth);
    const postCount = frameCount + 1;
    const bracketCount = frameCount * 4;

    // Weight estimate approx 45 lbs per frame section
    const weightPerFrame = height * (isCommercial ? 9.5 : 7.5);
    const totalWeight = Math.round(frameCount * weightPerFrame);

    resPosts.textContent = postCount.toLocaleString();
    resFrames.textContent = frameCount.toLocaleString();
    resBrackets.textContent = bracketCount.toLocaleString();
    resWeight.textContent = totalWeight.toLocaleString() + ' lbs';
  }

  if (footageInput && heightSelect && styleSelect) {
    footageInput.addEventListener('input', calculate);
    heightSelect.addEventListener('change', calculate);
    styleSelect.addEventListener('change', calculate);
    // Initial run
    calculate();
  }
}

/**
 * Smooth Navigation Scroll
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
