/**
 * Fence Frames — Landing Page Controller
 * Frame Your Vision | Find Your Fence
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initSmoothScroll();
  initScrollReveal();
  initGridLock();
});

/**
 * Served ZIP lookup — mirrors community-presets/served-locations.json.
 * Real pilot: Si View, North Bend, WA (98045). Everything else is a
 * friendly waitlist response, no fabricated coverage.
 */
const SERVED_ZIPS = {
  '98045': { name: 'Si View \u2014 North Bend, WA', note: 'Standard Si View Privacy Fence preset is ready to go.' }
};

function checkZip(e) {
  e.preventDefault();
  const input = document.getElementById('zip-input');
  const out = document.getElementById('zip-result');
  const val = (input.value || '').trim();
  out.classList.add('show');

  if (!/^\d{5}$/.test(val)) {
    out.textContent = 'Enter a 5-digit ZIP code to see your area.';
    out.style.color = '#e2813f';
    return false;
  }

  const served = SERVED_ZIPS[val];
  if (served) {
    out.textContent = '\u2713 Great news \u2014 we\u2019re live in ' + served.name + '. ' + served.note;
    out.style.color = '#86e0b4';
  } else {
    out.textContent = 'We\u2019re expanding toward ' + val + '. Drop it in and we\u2019ll notify you at launch \u2014 you can still explore designs and pricing now.';
    out.style.color = '#d8c3ab';
  }
  return false;
}

/**
 * Mobile nav toggle
 */
function initNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
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
      if (targetId === '#') return;
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
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

/**
 * Grid lock — every .grid-box outer edge lands on major lines (100, 200, …).
 * Page grid origin stays fixed at 0,0. Boxes grow to the next major (ceil).
 * Vertical uses translateY + marginBottom so sibling margin-collapse can’t
 * leave tops on 570 / 870 / etc.
 */
function initGridLock() {
  const majorFromCss = () => {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--grid-major')
      .trim();
    const n = parseFloat(raw);
    return Number.isFinite(n) && n > 0 ? n : 100;
  };

  const boxes = () => Array.from(document.querySelectorAll('.grid-box'));

  function clear(el) {
    el.style.marginLeft = '';
    el.style.marginBottom = '';
    el.style.width = '';
    el.style.maxWidth = '';
    el.style.minHeight = '';
    el.style.height = '';
    el.style.position = '';
    el.style.top = '';
  }

  function snapOne(el, major) {
    const rect = el.getBoundingClientRect();
    const left = rect.left + window.scrollX;
    const top = rect.top + window.scrollY;

    const snapLeft = Math.round(left / major) * major;
    const snapTop = Math.round(top / major) * major;

    let snapW = Math.max(major, Math.ceil(rect.width / major) * major);
    let snapH = Math.max(major, Math.ceil(rect.height / major) * major);

    const wrap = el.closest('.wrap');
    if (wrap) {
      const wr = wrap.getBoundingClientRect();
      const wrapLeft = wr.left + window.scrollX;
      const wrapRight = wrapLeft + wr.width;
      const maxRight = Math.floor(wrapRight / major) * major;
      const maxW = Math.max(major, maxRight - snapLeft);
      snapW = Math.min(snapW, maxW);
    }

    const dx = snapLeft - left;
    const dy = snapTop - top;
    const dH = snapH - rect.height;

    el.style.boxSizing = 'border-box';
    el.style.position = 'relative';
    el.style.top = dy ? `${dy}px` : '';
    el.style.marginLeft = `${dx}px`;
    el.style.width = `${snapW}px`;
    el.style.maxWidth = 'none';
    el.style.minHeight = `${snapH}px`;
    // Reserve flow space for the visual shift + height grow (avoids margin-collapse)
    el.style.marginBottom = `${dy + dH}px`;
  }

  function lock() {
    const major = majorFromCss();
    const list = boxes();
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    list.forEach(clear);
    void document.body.offsetHeight;
    list.forEach((el) => snapOne(el, major));
  }

  lock();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(lock).catch(() => {});
  }
  window.addEventListener('load', lock);
  let t = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(t);
    t = window.setTimeout(lock, 100);
  });
}
