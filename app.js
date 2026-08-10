/**
 * Fence Frames — Landing Page Controller
 * Frame Your Vision | Find Your Fence
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initSmoothScroll();
  initScrollReveal();
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
