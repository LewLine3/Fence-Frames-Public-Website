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
