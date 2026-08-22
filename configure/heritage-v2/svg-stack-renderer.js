/**
 * FenceBook Heritage V2 — SVG Component Stack Renderer
 * Location: public/configure/heritage-v2/svg-stack-renderer.js
 *
 * Composites pre-drawn, high-resolution SVG artwork files into stacked layers:
 * Layer 1: Ground & Grass Base
 * Layer 2: 4x4 Support Posts
 * Layer 3: Horizontal 2x4 Rails
 * Layer 4: Vertical Picket Fill Pattern
 * Layer 5: Cap Rail / Post Caps
 *
 * Applies dynamic stain color tints smoothly via SVG CSS filters / overlays.
 */

(function (exports) {
  'use strict';

  // --- PRE-DRAWN SVG ASSET MANIFEST ---
  const ASSET_BASE = '../heritage-v1/components/';

  const STYLE_ASSET_MAP = {
    'heritage-cedar': {
      label: 'Heritage Privacy (Flat Top)',
      posts: ASSET_BASE + 'posts/sym-post-cedar-4x4.svg',
      rails: [
        ASSET_BASE + 'rails/sym-rail-bottom-heritage.svg',
        ASSET_BASE + 'rails/sym-rail-middle-heritage.svg',
        ASSET_BASE + 'rails/sym-rail-top-heritage.svg'
      ],
      pickets: ASSET_BASE + 'pickets/sym-picket-cedar-flat-top-heritage.svg',
      capRail: ASSET_BASE + 'rails/sym-rail-cap-ref-1.5.svg',
      postCap: ASSET_BASE + 'caps/sym-post-cap-cedar-pyramid.svg',
      ground: ASSET_BASE + 'fill/ground/sym-grass-front-heritage.svg'
    },
    'craftsman-cedar': {
      label: 'Craftsman Cap Rail',
      posts: ASSET_BASE + 'posts/sym-post-cedar-4x4.svg',
      rails: [
        ASSET_BASE + 'rails/sym-rail-bottom-heritage.svg',
        ASSET_BASE + 'rails/sym-rail-top-heritage.svg'
      ],
      pickets: ASSET_BASE + 'pickets/sym-picket-cedar-board-on-board-heritage.svg',
      capRail: ASSET_BASE + 'rails/sym-rail-cap-ref-1.5.svg',
      postCap: null,
      ground: ASSET_BASE + 'fill/ground/sym-grass-front-heritage.svg'
    },
    'modern-picket': {
      label: 'Modern Gothic Picket',
      posts: ASSET_BASE + 'posts/sym-post-pt-4x4.svg',
      rails: [
        ASSET_BASE + 'rails/sym-rail-bottom-heritage.svg',
        ASSET_BASE + 'rails/sym-rail-top-heritage.svg'
      ],
      pickets: ASSET_BASE + 'pickets/sym-picket-cedar-gothic-heritage.svg',
      capRail: null,
      postCap: ASSET_BASE + 'caps/sym-post-cap-cedar-pyramid.svg',
      ground: ASSET_BASE + 'fill/ground/sym-grass-front-heritage.svg'
    },
    'horizontal-slatted': {
      label: 'Horizontal Shadowbox',
      posts: ASSET_BASE + 'posts/sym-post-cedar-4x4.svg',
      rails: [
        ASSET_BASE + 'rails/sym-rail-bottom-heritage.svg',
        ASSET_BASE + 'rails/sym-rail-top-heritage.svg'
      ],
      pickets: ASSET_BASE + 'pickets/sym-picket-cedar-shadowbox-heritage.svg',
      capRail: ASSET_BASE + 'rails/sym-rail-cap-ref-1.5.svg',
      postCap: null,
      ground: ASSET_BASE + 'fill/ground/sym-grass-front-heritage.svg'
    }
  };

  // --- STAIN TINT CONFIGURATIONS ---
  const STAIN_TINTS = {
    'warm-amber': { label: 'Warm Amber (Signature Gold)', hex: '#E08230', blend: 'multiply', opacity: 0.35 },
    'natural-cedar': { label: 'Natural Cedar', hex: '#C88A4B', blend: 'multiply', opacity: 0.25 },
    'dark-walnut': { label: 'Dark Walnut', hex: '#3E2A1D', blend: 'multiply', opacity: 0.55 },
    'weathered-gray': { label: 'Weathered Gray', hex: '#6C757D', blend: 'color', opacity: 0.45 },
    'unstained': { label: 'Unstained Cedar', hex: 'transparent', blend: 'normal', opacity: 0 }
  };

  /**
   * Renders the stacked SVG container into a target DOM element
   * @param {HTMLElement} container - DOM element to receive stacked SVG view
   * @param {Object} options - { styleKey, stainKey, height, panels }
   */
  function renderSvgStack(container, options = {}) {
    if (!container) return;

    const styleKey = options.styleKey || 'heritage-cedar';
    const stainKey = options.stainKey || 'warm-amber';

    const assets = STYLE_ASSET_MAP[styleKey] || STYLE_ASSET_MAP['heritage-cedar'];
    const stain = STAIN_TINTS[stainKey] || STAIN_TINTS['warm-amber'];

    let html = `
      <div class="svg-stack-viewport" style="position: relative; width: 100%; height: 100%; min-height: 340px; background: radial-gradient(circle at center, rgba(33, 36, 44, 0.8) 0%, rgba(18, 19, 22, 0.95) 100%); overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--color-card-border);">
        
        <!-- Stack Layer 1: Ground & Grass -->
        <div class="svg-layer layer-ground" style="position: absolute; bottom: 0; left: 0; width: 100%; z-index: 1;">
          <img src="${assets.ground}" alt="Grass Ground Base" style="width: 100%; height: auto; display: block;" />
        </div>

        <!-- Wood Filter Overlay Container -->
        <div class="svg-wood-stack" style="position: absolute; bottom: 40px; left: 5%; width: 90%; height: 75%; z-index: 2; display: flex; align-items: flex-end; justify-content: center;">
          
          <!-- Layer 2: 4x4 Support Posts -->
          <img class="svg-layer-img layer-posts" src="${assets.posts}" alt="Posts Layer" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 2;" />

          <!-- Layer 3: Horizontal Rails -->
          ${assets.rails.map(railPath => `
            <img class="svg-layer-img layer-rails" src="${railPath}" alt="Rails Layer" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 3;" />
          `).join('')}

          <!-- Layer 4: Pickets Fill -->
          <img class="svg-layer-img layer-pickets" src="${assets.pickets}" alt="Pickets Layer" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 4;" />

          <!-- Layer 5: Cap Rail -->
          ${assets.capRail ? `
            <img class="svg-layer-img layer-cap-rail" src="${assets.capRail}" alt="Cap Rail Layer" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 5;" />
          ` : ''}

          <!-- Layer 6: Post Caps -->
          ${assets.postCap ? `
            <img class="svg-layer-img layer-post-caps" src="${assets.postCap}" alt="Post Caps Layer" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 100%; object-fit: contain; z-index: 6;" />
          ` : ''}

          <!-- Dynamic Stain Color Tint Overlay -->
          <div class="stain-tint-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: ${stain.hex}; mix-blend-mode: ${stain.blend}; opacity: ${stain.opacity}; pointer-events: none; z-index: 7;"></div>
        </div>

        <!-- High-End Badges -->
        <div style="position: absolute; top: 16px; left: 16px; z-index: 10; display: flex; gap: 8px;">
          <span style="background: var(--color-badge-bg); border: 1px solid var(--color-badge-border); color: var(--color-badge-text); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
            ${assets.label}
          </span>
          <span style="background: rgba(224, 130, 48, 0.15); border: 1px solid var(--color-gold); color: #FFF; padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 600;">
            ${stain.label}
          </span>
        </div>

        <div style="position: absolute; bottom: 16px; right: 16px; z-index: 10; font-size: 0.75rem; color: var(--text-muted); background: rgba(0,0,0,0.6); padding: 4px 10px; border-radius: var(--radius-sm); backdrop-filter: blur(4px);">
          Pre-Drawn Vector SVG Stack — Sharp & Instant
        </div>

      </div>
    `;

    container.innerHTML = html;
  }

  exports.STYLE_ASSET_MAP = STYLE_ASSET_MAP;
  exports.STAIN_TINTS = STAIN_TINTS;
  exports.renderSvgStack = renderSvgStack;

})(typeof exports !== 'undefined' ? exports : (typeof window !== 'undefined' ? (window.SvgStackRenderer = {}) : this));
