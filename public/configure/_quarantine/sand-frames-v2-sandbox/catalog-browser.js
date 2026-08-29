/**
 * Sand Frames App — Catalog & HOA Preset Browser Controller
 * Grounded in GREATEST HITS Mockups (Warm Earthy Dark Theme)
 * Location: public/configure/heritage-v2-sandbox/catalog-browser.js
 */

(function () {
  'use strict';

  let activeCategory = 'Wood';
  let searchQuery = '';

  /**
   * Render High-Fidelity SVG Graphic Render for each fence type matching the mockup
   */
  function generateMockupSVG(item) {
    const { renderType, config } = item;
    const stainHex = config.stainHex || '#C88A4B';

    let contentSvg = '';

    if (renderType === 'scalloped-picket') {
      // Scalloped Top Pickets
      let pickets = '';
      const totalPickets = 24;
      for (let i = 0; i < totalPickets; i++) {
        const x = 20 + i * 14;
        const distFromCenter = Math.abs(i - 11.5) / 11.5;
        const topDip = Math.pow(distFromCenter, 2) * 18;
        const y = 30 + (18 - topDip);
        pickets += `<rect x="${x}" y="${y}" width="10" height="${135 - y}" fill="${stainHex}" stroke="#6F4D2A" stroke-width="0.8" rx="1"/>`;
        pickets += `<polygon points="${x},${y} ${x + 5},${y - 6} ${x + 10},${y}" fill="#96693C"/>`;
      }

      contentSvg = `
        <rect width="100%" height="100%" fill="#141210"/>
        <rect x="15" y="50" width="340" height="8" fill="#6F4D2A"/>
        <rect x="15" y="110" width="340" height="8" fill="#6F4D2A"/>
        ${pickets}
        <rect x="10" y="20" width="16" height="120" fill="#5E4022" stroke="#3A2814"/>
        <polygon points="8,20 18,8 28,20" fill="#7A522C"/>
        <rect x="344" y="20" width="16" height="120" fill="#5E4022" stroke="#3A2814"/>
        <polygon points="342,20 352,8 362,20" fill="#7A522C"/>
      `;
    } else if (renderType === 'horizontal-board') {
      // Modern Horizontal Boards
      let boards = '';
      for (let b = 0; b < 7; b++) {
        const y = 25 + b * 16;
        boards += `<rect x="25" y="${y}" width="320" height="14" fill="${stainHex}" stroke="#2A1B0E" stroke-width="0.8" rx="0.5"/>`;
      }
      contentSvg = `
        <rect width="100%" height="100%" fill="#12100E"/>
        <rect x="15" y="15" width="340" height="140" fill="none" stroke="#5E4022" stroke-width="6"/>
        <rect x="180" y="15" width="10" height="140" fill="#5E4022"/>
        ${boards}
      `;
    } else if (renderType === 'welded-wire') {
      // Welded Wire Mesh with Greenery Background
      let mesh = '';
      for (let gx = 30; gx < 340; gx += 16) {
        mesh += `<line x1="${gx}" y1="25" x2="${gx}" y2="140" stroke="#1A1A1A" stroke-width="1.5"/>`;
      }
      for (let gy = 25; gy < 140; gy += 16) {
        mesh += `<line x1="25" y1="${gy}" x2="345" y2="${gy}" stroke="#1A1A1A" stroke-width="1.5"/>`;
      }

      contentSvg = `
        <rect width="100%" height="100%" fill="#121612"/>
        <!-- Background Greenery Foliage -->
        <circle cx="80" cy="110" r="35" fill="#243D28" opacity="0.85"/>
        <circle cx="140" cy="120" r="28" fill="#182E1C" opacity="0.9"/>
        <circle cx="260" cy="105" r="40" fill="#2E4D33" opacity="0.85"/>
        <!-- Wire Mesh Grid -->
        ${mesh}
        <!-- Cedar Frame -->
        <rect x="20" y="20" width="330" height="125" fill="none" stroke="${stainHex}" stroke-width="8" rx="2"/>
        <rect x="180" y="20" width="10" height="125" fill="${stainHex}"/>
      `;
    } else if (renderType === 'dog-ear-privacy') {
      // Dog-Ear Privacy Pine
      let pickets = '';
      for (let i = 0; i < 22; i++) {
        const x = 22 + i * 15;
        pickets += `
          <path d="M ${x} 32 L ${x+3} 25 L ${x+11} 25 L ${x+14} 32 L ${x+14} 140 L ${x} 140 Z" fill="${stainHex}" stroke="#A67B4C" stroke-width="0.8"/>
        `;
      }
      contentSvg = `
        <rect width="100%" height="100%" fill="#141210"/>
        <rect x="15" y="45" width="340" height="8" fill="#96693C"/>
        <rect x="15" y="110" width="340" height="8" fill="#96693C"/>
        ${pickets}
      `;
    } else if (renderType === 'spaced-picket') {
      // Contemporary Spaced Vertical Slats
      let pickets = '';
      for (let i = 0; i < 26; i++) {
        const x = 25 + i * 13;
        pickets += `<rect x="${x}" y="25" width="7" height="115" fill="${stainHex}" stroke="#A86E32" stroke-width="0.5" rx="1"/>`;
      }
      contentSvg = `
        <rect width="100%" height="100%" fill="#141210"/>
        <rect x="15" y="40" width="340" height="8" fill="#6F4D2A"/>
        <rect x="15" y="105" width="340" height="8" fill="#6F4D2A"/>
        ${pickets}
      `;
    } else {
      // Shadowbox alternating boards
      let pickets = '';
      for (let i = 0; i < 18; i++) {
        const x = 25 + i * 18;
        const isBack = i % 2 === 1;
        const fill = isBack ? '#7F5630' : stainHex;
        const shadow = isBack ? 'opacity="0.75"' : '';
        pickets += `<rect x="${x}" y="25" width="14" height="115" fill="${fill}" ${shadow} stroke="#4A331C" stroke-width="0.8"/>`;
      }
      contentSvg = `
        <rect width="100%" height="100%" fill="#141210"/>
        <rect x="15" y="40" width="340" height="8" fill="#5E4022"/>
        <rect x="15" y="105" width="340" height="8" fill="#5E4022"/>
        ${pickets}
      `;
    }

    return `
      <svg width="100%" height="100%" viewBox="0 0 370 170" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        ${contentSvg}
      </svg>
    `;
  }

  /**
   * Render Catalog Card Grid matching mockup
   */
  function renderCatalogCards() {
    const grid = document.getElementById('catalogCardGrid');
    if (!grid) return;

    const presets = window.SandFramesPresets?.CATALOG_PRESETS || [];

    const filtered = presets.filter(item => {
      if (activeCategory !== 'All Fences' && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery) {
        const text = `${item.name} ${item.subtitle} ${item.badges.join(' ')}`.toLowerCase();
        if (!text.includes(searchQuery.toLowerCase())) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column: 1 / -1; padding: 3rem; text-align: center; color: #C4B9A9;">No fences match active filters.</div>`;
      return;
    }

    let html = '';
    filtered.forEach(item => {
      const bannerSvg = generateMockupSVG(item);

      html += `
        <article class="gh-card">
          <!-- Graphic Banner Viewport -->
          <div class="gh-card-banner">
            ${bannerSvg}
          </div>

          <!-- Title & Subtitle -->
          <div>
            <h3 class="gh-card-title">${item.name}</h3>
            <span class="gh-card-subtitle">${item.subtitle}</span>
          </div>

          <!-- Badge Row -->
          <div class="gh-badge-row">
            <span class="gh-price-pill">$${item.priceFt}/ft</span>
            ${item.badges.map(b => `<span class="gh-attribute-pill ${b.includes('HOA Approved') ? 'hoa-approved' : ''}">${b}</span>`).join('')}
          </div>

          <!-- Footer Action Buttons -->
          <div class="gh-card-footer">
            <button class="gh-btn-secondary" onclick="alert('Viewing specs for ${item.name}...')">View Details</button>
            <button class="gh-btn-primary" onclick="applyPresetToWorkspace('${item.id}')">Add to Workspace</button>
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;
  }

  /**
   * Apply Preset to Central Workspace State
   */
  window.applyPresetToWorkspace = function (presetId) {
    const presets = window.SandFramesPresets?.CATALOG_PRESETS || [];
    const item = presets.find(p => p.id === presetId);
    if (!item) return;

    try {
      localStorage.setItem('sand_frames_active_config', JSON.stringify({
        ...item.config,
        presetName: item.name
      }));
    } catch (e) {}

    alert(`✓ Added "${item.name}" ($${item.priceFt}/ft) to your Sand Frames Workspace! Switching to Designer Workspace...`);
    window.location.href = 'designer-workspace.html';
  };

  /**
   * Bind Interactivity
   */
  function bindEvents() {
    const searchInput = document.getElementById('ghSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCatalogCards();
      });
    }

    document.querySelectorAll('.gh-category-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.gh-category-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        activeCategory = pill.getAttribute('data-cat') || 'Wood';
        renderCatalogCards();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    renderCatalogCards();
  });

})();
