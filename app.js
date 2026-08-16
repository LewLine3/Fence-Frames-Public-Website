/**
 * Fence Frames — Landing Page Controller
 * Frame Your Vision | Find Your Fence
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initNavDropdowns();
  initNavFindZip();
  initSmoothScroll();
  initScrollReveal();
  initHeroSlider();
  initFenceHandbook();
});

/**
 * Served ZIP lookup — mirrors community-presets/served-locations.json.
 * Real pilot: Si View, North Bend, WA (98045).
 */
const SERVED_ZIPS = {
  '98045': {
    community: 'si-view',
    name: 'Si View \u2014 North Bend, WA',
    note: 'Standard Si View Privacy Fence preset is ready to go.',
    href: '#hoa'
  }
};

const ZIP_COLORS = {
  ok: '#d9b872',
  info: '#c4b294',
  warn: '#e8a070'
};

function checkZip(e) {
  e.preventDefault();
  const input = document.getElementById('zip-input');
  const select = document.getElementById('community-select');
  const out = document.getElementById('zip-result');
  if (!input || !out) return false;
  const val = (input.value || '').trim();
  const community = select ? select.value : '';
  out.classList.add('show');

  if (!/^\d{5}$/.test(val)) {
    if (community === 'no-hoa') {
      out.textContent = 'No HOA? You\u2019re free to design anything \u2014 add your ZIP and we\u2019ll price it for your area.';
      out.style.color = ZIP_COLORS.info;
      return false;
    }
    out.textContent = 'Enter a 5-digit ZIP code to see your area.';
    out.style.color = ZIP_COLORS.warn;
    return false;
  }

  const served = SERVED_ZIPS[val];
  if (served) {
    if (select && !community) select.value = served.community;
    out.textContent = '\u2713 Great news \u2014 we\u2019re live in ' + served.name + '. ' + served.note;
    out.style.color = ZIP_COLORS.ok;
  } else if (community === 'no-hoa') {
    out.textContent = 'No HOA means no design limits \u2014 explore every style now; local pricing for ' + val + ' is on the way.';
    out.style.color = ZIP_COLORS.info;
  } else {
    out.textContent = 'We\u2019re expanding toward ' + val + '. Drop it in and we\u2019ll notify you at launch \u2014 you can still explore designs and pricing now.';
    out.style.color = ZIP_COLORS.info;
  }

  syncFenceFolioCommunity(val, served ? served.community : community);
  return false;
}

function lockNavCommunity() {
  const wrap = document.getElementById('nav-find-community');
  const select = document.getElementById('nav-community-select');
  if (!wrap || !select) return;
  wrap.dataset.locked = 'true';
  select.disabled = true;
  select.innerHTML = '<option value="">Enter ZIP to unlock</option>';
}

function unlockNavCommunity(zip) {
  const wrap = document.getElementById('nav-find-community');
  const select = document.getElementById('nav-community-select');
  if (!wrap || !select) return;
  wrap.dataset.locked = 'false';
  select.disabled = false;
  select.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select community';
  select.appendChild(placeholder);

  const noHoa = document.createElement('option');
  noHoa.value = 'no-hoa';
  noHoa.textContent = 'No HOA / open design';
  select.appendChild(noHoa);

  const served = SERVED_ZIPS[zip];
  if (served) {
    const opt = document.createElement('option');
    opt.value = served.community;
    opt.textContent = served.name;
    select.appendChild(opt);
    select.value = served.community;
  } else {
    const soon = document.createElement('option');
    soon.value = '';
    soon.disabled = true;
    soon.textContent = 'More communities coming soon';
    select.appendChild(soon);
  }
}

function checkNavZip(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('nav-zip-input');
  const select = document.getElementById('nav-community-select');
  const out = document.getElementById('nav-zip-result');
  if (!input || !out) return false;
  const val = (input.value || '').trim();
  const community = select && !select.disabled ? select.value : '';

  if (!/^\d{5}$/.test(val)) {
    lockNavCommunity();
    out.textContent = 'Enter a 5-digit ZIP code to unlock communities.';
    out.style.color = ZIP_COLORS.warn;
    return false;
  }

  unlockNavCommunity(val);
  const served = SERVED_ZIPS[val];
  if (served) {
    out.textContent = '\u2713 Live in ' + served.name + '. Pick a community below or open Communities.';
    out.style.color = ZIP_COLORS.ok;
  } else if (community === 'no-hoa') {
    out.textContent = 'No HOA for ' + val + ' \u2014 you can design freely while we expand pricing there.';
    out.style.color = ZIP_COLORS.info;
  } else {
    out.textContent = 'Expanding toward ' + val + '. Communities unlock as we launch \u2014 No HOA is available now.';
    out.style.color = ZIP_COLORS.info;
  }

  syncFenceFolioCommunity(val, served ? served.community : community);
  return false;
}

function initNavFindZip() {
  const input = document.getElementById('nav-zip-input');
  if (!input) return;
  let timer = null;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const val = (input.value || '').trim();
      if (/^\d{5}$/.test(val)) checkNavZip();
      else lockNavCommunity();
    }, 280);
  });
}

/**
 * Dropdown menus — one open at a time; click outside / Esc closes.
 */
function initNavDropdowns() {
  const dropdowns = Array.from(document.querySelectorAll('.nav-dd'));
  if (!dropdowns.length) return;

  function closeAll(except) {
    dropdowns.forEach((dd) => {
      if (dd === except) return;
      dd.classList.remove('is-open');
      const btn = dd.querySelector('.nav-dd-trigger');
      const panel = dd.querySelector('.nav-dd-panel');
      if (btn) btn.setAttribute('aria-expanded', 'false');
      if (panel) panel.hidden = true;
    });
  }

  dropdowns.forEach((dd) => {
    const btn = dd.querySelector('.nav-dd-trigger');
    const panel = dd.querySelector('.nav-dd-panel');
    if (!btn || !panel) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const willOpen = panel.hidden;
      closeAll(willOpen ? dd : null);
      panel.hidden = !willOpen;
      dd.classList.toggle('is-open', willOpen);
      btn.setAttribute('aria-expanded', String(willOpen));
    });

    panel.addEventListener('click', (e) => e.stopPropagation());
  });

  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAll();
  });

  document.querySelectorAll('.nav-dd-panel a[href^="#"]').forEach((a) => {
    a.addEventListener('click', () => closeAll());
  });
}

/**
 * Mobile nav toggle — expands the three zones under the bar
 */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const inner = document.querySelector('.nav-inner');
  if (!toggle || !inner) return;

  toggle.addEventListener('click', () => {
    const isOpen = inner.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  inner.querySelectorAll('a[href]').forEach((a) => {
    a.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 860px)').matches) {
        inner.classList.remove('mobile-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Smooth scroll for in-page anchors
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/**
 * Scroll reveal — progressive enhancement only (see .js .reveal in CSS)
 */
function initScrollReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  nodes.forEach((el) => io.observe(el));
  window.setTimeout(() => {
    nodes.forEach((el) => el.classList.add('in'));
  }, 2500);
}

/**
 * Hero Endless Fence Gallery Slider Controller
 */
let currentHeroSlide = 0;
const TOTAL_HERO_SLIDES = 5;
let heroSliderTimer = null;
let isSliderPaused = false;

function initHeroSlider() {
  const sliderCard = document.getElementById('hero-slider-card');
  if (!sliderCard) return;

  const viewport = document.getElementById('hero-slider-viewport');
  if (viewport) {
    viewport.addEventListener('mouseenter', () => { isSliderPaused = true; });
    viewport.addEventListener('mouseleave', () => { isSliderPaused = false; });
    viewport.addEventListener('focusin', () => { isSliderPaused = true; });
    viewport.addEventListener('focusout', () => { isSliderPaused = false; });

    // Touch / swipe support
    let startX = 0;
    viewport.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSliderPaused = true;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (diff > 40) navigateHeroSlider(-1);
      else if (diff < -40) navigateHeroSlider(1);
      isSliderPaused = false;
    }, { passive: true });

    // Keyboard navigation
    viewport.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateHeroSlider(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateHeroSlider(1);
      }
    });
  }

  startHeroSliderTimer();
}

function startHeroSliderTimer() {
  if (heroSliderTimer) clearInterval(heroSliderTimer);
  heroSliderTimer = setInterval(() => {
    if (!isSliderPaused) {
      navigateHeroSlider(1);
    }
  }, 4500);
}

function goToHeroSlide(index) {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  if (!slides.length) return;

  currentHeroSlide = (index + TOTAL_HERO_SLIDES) % TOTAL_HERO_SLIDES;

  slides.forEach((slide, idx) => {
    if (idx === currentHeroSlide) {
      slide.classList.add('active');
      slide.setAttribute('aria-hidden', 'false');
    } else {
      slide.classList.remove('active');
      slide.setAttribute('aria-hidden', 'true');
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === currentHeroSlide) {
      dot.classList.add('active');
      dot.setAttribute('aria-selected', 'true');
    } else {
      dot.classList.remove('active');
      dot.setAttribute('aria-selected', 'false');
    }
  });
}

function navigateHeroSlider(direction) {
  goToHeroSlide(currentHeroSlide + direction);
}

/**
 * Fence Handbook Interactive Widget Controller
 */
let currentHbPage = 1;
let currentMaterialMode = '8ft';
let currentSubflip = 1;
let currentHoaSec = 1;

const HB_MATERIAL_DATA = {
  '8ft': [
    { item: '4x4 PT Ground Contact Post (8′)', qty: '1 post', cost: '$18.50' },
    { item: '2x4 Western Red Cedar Rail (8′)', qty: '3 rails', cost: '$36.00' },
    { item: '1x6 Western Red Cedar Picket (6′)', qty: '17 pickets', cost: '$127.50' },
    { item: '60lb Rapid-Set Concrete Bag', qty: '1 bag', cost: '$7.50' },
    { item: '304 Stainless Steel Fasteners', qty: '1 box (100ct)', cost: '$22.00' },
    { item: 'Semi-Transparent Wood Stain', qty: '0.5 gal', cost: '$33.50' }
  ],
  '100ft': [
    { item: '4x4 PT Ground Contact Post (8′)', qty: '14 posts', cost: '$259.00' },
    { item: '2x4 Western Red Cedar Rail (8′)', qty: '39 rails', cost: '$468.00' },
    { item: '1x6 Western Red Cedar Picket (6′)', qty: '212 pickets', cost: '$1,590.00' },
    { item: '60lb Rapid-Set Concrete Bag', qty: '14 bags', cost: '$105.00' },
    { item: '304 Stainless Steel Fasteners', qty: '1 box (1500ct)', cost: '$165.00' },
    { item: 'Semi-Transparent Wood Stain', qty: '5.0 gal', cost: '$848.00' }
  ]
};

const HB_MATERIAL_TOTALS = {
  '8ft': '$245.00',
  '100ft': '$3,435.00'
};

function initFenceHandbook() {
  const widget = document.getElementById('fence-handbook-widget');
  if (!widget) return;

  // Bind tab click events
  const tabs = widget.querySelectorAll('.hb-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const page = tab.dataset.page;
      switchHandbookPage(page);
    });
  });

  // Keyboard navigation support for widget
  widget.addEventListener('keydown', (e) => {
    // Avoid intercepting input fields or textareas
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateHandbook(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateHandbook(1);
    } else if (e.key === 'ArrowDown') {
      if (currentHbPage === 4) {
        e.preventDefault();
        const nextSub = currentSubflip >= 4 ? 1 : currentSubflip + 1;
        setSubflip(nextSub);
      } else if (currentHbPage === 'hoa') {
        e.preventDefault();
        const nextSec = currentHoaSec >= 4 ? 1 : currentHoaSec + 1;
        setHoaSection(nextSec);
      }
    } else if (e.key === 'ArrowUp') {
      if (currentHbPage === 4) {
        e.preventDefault();
        const prevSub = currentSubflip <= 1 ? 4 : currentSubflip - 1;
        setSubflip(prevSub);
      } else if (currentHbPage === 'hoa') {
        e.preventDefault();
        const prevSec = currentHoaSec <= 1 ? 4 : currentHoaSec - 1;
        setHoaSection(prevSec);
      }
    }
  });

  // Render initial material takeoff table
  renderMaterialsTable('8ft');
  updateHandbookControls();
}

function switchHandbookPage(pageTarget) {
  const widget = document.getElementById('fence-handbook-widget');
  if (!widget) return;

  // Update current page state
  if (pageTarget === 'hoa') {
    currentHbPage = 'hoa';
  } else {
    currentHbPage = parseInt(pageTarget, 10);
  }

  // Update tabs ARIA, tabindex & active classes
  const tabs = widget.querySelectorAll('.hb-tab');
  tabs.forEach(tab => {
    const isTarget = String(tab.dataset.page) === String(pageTarget);
    tab.classList.toggle('active', isTarget);
    tab.setAttribute('aria-selected', String(isTarget));
    tab.setAttribute('tabindex', isTarget ? '0' : '-1');
  });

  // Update pages display
  const pages = widget.querySelectorAll('.hb-page');
  pages.forEach(p => {
    const isTarget = (pageTarget === 'hoa' && p.id === 'hb-page-hoa') || (p.id === `hb-page-${pageTarget}`);
    if (isTarget) {
      p.hidden = false;
      p.classList.add('active');
    } else {
      p.hidden = true;
      p.classList.remove('active');
    }
  });

  updateHandbookControls();
}

function navigateHandbook(direction) {
  if (currentHbPage === 'hoa') {
    if (direction < 0) switchHandbookPage(2);
    else switchHandbookPage(1);
    return;
  }

  let newPage = currentHbPage + direction;
  if (newPage < 1) newPage = 1;
  if (newPage > 6) newPage = 6;
  switchHandbookPage(newPage);
}

function updateHandbookControls() {
  const indicator = document.getElementById('hb-page-indicator');
  const prevBtn = document.getElementById('hb-prev-btn');
  const nextBtn = document.getElementById('hb-next-btn');
  const edgeFlipBtn = document.getElementById('hb-edge-flip-btn');

  if (indicator && prevBtn && nextBtn) {
    if (currentHbPage === 'hoa') {
      indicator.textContent = 'HOA Fence-Folio Chapter';
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    } else {
      indicator.textContent = `Page ${currentHbPage} of 6`;
      prevBtn.disabled = currentHbPage === 1;
      nextBtn.disabled = currentHbPage === 6;
    }
  }

  // Right Edge Flip Prompt Button Text
  if (edgeFlipBtn) {
    const labelSpan = edgeFlipBtn.querySelector('.hb-edge-label');
    const arrowSpan = edgeFlipBtn.querySelector('.hb-edge-arrow');
    if (currentHbPage === 6) {
      if (labelSpan) labelSpan.textContent = '★ HOA';
      if (arrowSpan) arrowSpan.textContent = '›';
    } else if (currentHbPage === 'hoa') {
      if (labelSpan) labelSpan.textContent = 'Cover';
      if (arrowSpan) arrowSpan.textContent = '↺';
    } else {
      const nextPage = typeof currentHbPage === 'number' ? currentHbPage + 1 : 2;
      if (labelSpan) labelSpan.textContent = `Page ${nextPage}`;
      if (arrowSpan) arrowSpan.textContent = '›';
    }
  }
}

const selectedAddons = {
  stain: false
};

const ADDON_COSTS = {
  stain: 320
};

function toggleAddon(addonKey) {
  if (!(addonKey in selectedAddons)) return;
  selectedAddons[addonKey] = !selectedAddons[addonKey];
  updateAddonUI();
  recalculateLedger();
}

function updateAddonUI() {
  Object.keys(selectedAddons).forEach(key => {
    const isSelected = selectedAddons[key];
    const itemEl = document.getElementById(`addon-item-${key}`);
    const badgeEl = document.getElementById(`addon-badge-${key}`);

    if (itemEl) {
      itemEl.classList.toggle('hb-addon-item--selected', isSelected);
    }
    if (badgeEl) {
      if (isSelected) {
        badgeEl.textContent = '✓ added';
        badgeEl.className = 'hb-badge hb-badge--on';
      } else {
        badgeEl.textContent = 'available';
        badgeEl.className = 'hb-badge hb-badge--available';
      }
    }
  });
}

function recalculateLedger() {
  const is100ft = currentMaterialMode === '100ft';
  const materials = is100ft ? 3435 : 245;
  const labor = is100ft ? 1050 : 187.5;
  const delivery = is100ft ? 265 : 45;

  let addonsTotal = 0;
  Object.keys(selectedAddons).forEach(key => {
    if (selectedAddons[key]) addonsTotal += ADDON_COSTS[key];
  });

  const subtotal = materials + labor + delivery + addonsTotal;

  // Local price range: -10% low to +12% high rounded to nearest 100
  const rangeLow = Math.floor((subtotal * 0.9) / 100) * 100;
  const rangeHigh = Math.ceil((subtotal * 1.12) / 100) * 100;

  const matEl = document.getElementById('hb-ledger-mat-val');
  const laborEl = document.getElementById('hb-ledger-labor-val');
  const deliveryEl = document.getElementById('hb-ledger-delivery-val');
  const addonsValEl = document.getElementById('hb-ledger-addons-val');
  const subtotalValEl = document.getElementById('hb-ledger-subtotal-val');
  const rangeValEl = document.getElementById('hb-ledger-range-val');

  if (matEl) matEl.textContent = `$${materials.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (laborEl) laborEl.textContent = `$${labor.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (deliveryEl) deliveryEl.textContent = `$${delivery.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (addonsValEl) addonsValEl.textContent = `$${addonsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (subtotalValEl) subtotalValEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (rangeValEl) rangeValEl.textContent = `$${rangeLow.toLocaleString()} – $${rangeHigh.toLocaleString()}`;
}

function setMaterialMode(mode) {
  currentMaterialMode = mode;
  const btn8 = document.getElementById('hb-toggle-8ft');
  const btn100 = document.getElementById('hb-toggle-100ft');

  if (btn8 && btn100) {
    btn8.classList.toggle('active', mode === '8ft');
    btn100.classList.toggle('active', mode === '100ft');
  }

  renderMaterialsTable(mode);
  recalculateLedger();
}

function renderMaterialsTable(mode) {
  const tbody = document.getElementById('hb-materials-tbody');
  const totalEl = document.getElementById('hb-materials-total');
  if (!tbody || !totalEl) return;

  const data = HB_MATERIAL_DATA[mode] || [];
  tbody.innerHTML = data.map(row => `
    <tr>
      <td>${row.item}</td>
      <td class="text-right">${row.qty}</td>
      <td class="text-right">${row.cost}</td>
    </tr>
  `).join('');

  totalEl.textContent = HB_MATERIAL_TOTALS[mode] || '$0.00';
}

function setSubflip(subflipNum) {
  currentSubflip = subflipNum;
  const subtabs = document.querySelectorAll('.hb-subflip-tab');
  const subpanels = document.querySelectorAll('.hb-subflip-panel');

  subtabs.forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.subflip, 10) === subflipNum);
  });

  subpanels.forEach(panel => {
    const isTarget = panel.id === `hb-subflip-${subflipNum}`;
    panel.hidden = !isTarget;
    panel.classList.toggle('active', isTarget);
  });
}

function setHoaSection(secNum) {
  currentHoaSec = secNum;
  const hoatabs = document.querySelectorAll('.hb-hoa-subtab');
  const hoapanels = document.querySelectorAll('.hb-hoa-panel');

  hoatabs.forEach(tab => {
    tab.classList.toggle('active', parseInt(tab.dataset.hoasec, 10) === secNum);
  });

  hoapanels.forEach(panel => {
    const isTarget = panel.id === `hb-hoasec-${secNum}`;
    panel.hidden = !isTarget;
    panel.classList.toggle('active', isTarget);
  });
}

/**
 * Architectural PDF Preview Modal Controller
 */
function openPdfPreview() {
  const modal = document.getElementById('hb-pdf-modal');
  if (!modal) return;

  // Populate dynamic material schedule in PDF modal
  const tbody = document.getElementById('hb-pdf-mat-tbody');
  const matTotal = document.getElementById('hb-pdf-mat-total');
  const addonsTotalEl = document.getElementById('hb-pdf-addons-total');
  const subtotalEl = document.getElementById('hb-pdf-subtotal');

  const mode = currentMaterialMode || '100ft';
  const data = HB_MATERIAL_DATA[mode] || [];
  if (tbody) {
    tbody.innerHTML = data.map(row => `
      <tr>
        <td>${row.item}</td>
        <td class="text-right">${row.qty}</td>
        <td class="text-right">${row.cost}</td>
      </tr>
    `).join('');
  }

  const is100ft = mode === '100ft';
  const materials = is100ft ? 3435 : 245;
  const labor = is100ft ? 1050 : 187.5;
  const delivery = is100ft ? 265 : 45;

  let addonsSum = 0;
  Object.keys(selectedAddons).forEach(key => {
    if (selectedAddons[key]) addonsSum += ADDON_COSTS[key];
  });

  const subtotal = materials + labor + delivery + addonsSum;

  if (matTotal) matTotal.textContent = `$${materials.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (addonsTotalEl) addonsTotalEl.textContent = `$${addonsSum.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

  modal.hidden = false;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closePdfPreview() {
  const modal = document.getElementById('hb-pdf-modal');
  if (!modal) return;
  modal.hidden = true;
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function triggerPrint() {
  window.print();
}

// Close PDF modal on Escape key press
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePdfPreview();
  }
});

/**
 * Auto-syncs Fence-Folio widget when a user checks location/ZIP.
 */
function syncFenceFolioCommunity(zip, communityKey) {
  const widget = document.getElementById('fence-handbook-widget');
  if (!widget) return;

  const tagEl = widget.querySelector('.bp-tag');
  const exemplarTagEl = widget.querySelector('.hb-exemplar-tag');
  const statusValEl = widget.querySelector('.status-val');
  const subTitleEl = widget.querySelector('#hb-page-2 .hb-page-sub');

  const isSiView = zip === '98045' || communityKey === 'si-view';
  const isNoHoa = communityKey === 'no-hoa';

  if (isSiView) {
    if (tagEl) {
      tagEl.textContent = 'HOA READY';
      tagEl.style.background = 'var(--gold)';
      tagEl.style.color = 'var(--forest-deep)';
    }
    if (exemplarTagEl) exemplarTagEl.textContent = 'Exemplar: Si View';
    if (statusValEl) statusValEl.textContent = 'Pre-Checked HOA';
    if (subTitleEl) subTitleEl.textContent = 'Si View — North Bend, WA Pre-Checked Rules';
  } else if (isNoHoa) {
    if (tagEl) {
      tagEl.textContent = 'OPEN DESIGN';
      tagEl.style.background = '#2f5d3a';
      tagEl.style.color = '#a3e8b5';
    }
    if (exemplarTagEl) exemplarTagEl.textContent = `ZIP: ${zip || 'Open'}`;
    if (statusValEl) statusValEl.textContent = 'No HOA Limits';
    if (subTitleEl) subTitleEl.textContent = `Unrestricted Yard Layout — ZIP ${zip || 'Custom'}`;
  } else if (zip) {
    if (tagEl) {
      tagEl.textContent = 'LOCAL READY';
      tagEl.style.background = 'var(--gold)';
      tagEl.style.color = 'var(--forest-deep)';
    }
    if (exemplarTagEl) exemplarTagEl.textContent = `ZIP ${zip}`;
    if (statusValEl) statusValEl.textContent = `Priced for ${zip}`;
    if (subTitleEl) subTitleEl.textContent = `Local Code Benchmark — ZIP ${zip}`;
  }

  // Trigger pulse highlight animation on widget
  widget.classList.remove('hb-sync-pulse');
  void widget.offsetWidth; // Force reflow
  widget.classList.add('hb-sync-pulse');
}




