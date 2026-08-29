/**
 * Sand Frames App — Catalog Presets Data (Matching GREATEST HITS Mockup)
 * Location: public/configure/heritage-v2-sandbox/catalog-presets-data.js
 */

(function (exports) {
  'use strict';

  const MOCKUP_PRESETS = [
    {
      id: 'premium-cedar-picket',
      name: 'Premium Cedar Picket',
      subtitle: 'Classic scalloped design, durable cedar',
      category: 'Wood',
      style: 'Picket',
      privacy: 'Semi-Privacy',
      priceFt: 42,
      badges: ['Best Seller', 'HOA Approved', 'Semi-Privacy'],
      renderType: 'scalloped-picket',
      config: {
        height: 4,
        panelLength: 8,
        picketWidth: '1x4',
        picketGap: 'gap-0.5',
        picketStyle: '1x4-privacy',
        capRail: false,
        railsPerPanel: 2,
        stainKey: 'natural-cedar',
        stainHex: '#C88A4B'
      }
    },
    {
      id: 'modern-board-fence',
      name: 'Modern Board Fence',
      subtitle: 'Contemporary style, solid panels',
      category: 'Wood',
      style: 'Horizontal',
      privacy: 'Full Privacy',
      priceFt: 58,
      badges: ['Full Privacy', 'Sleek Design'],
      renderType: 'horizontal-board',
      config: {
        height: 6,
        panelLength: 8,
        picketWidth: '1x6',
        picketGap: 'privacy',
        picketStyle: '1x6-privacy',
        capRail: true,
        railsPerPanel: 3,
        stainKey: 'dark-walnut',
        stainHex: '#4A3525'
      }
    },
    {
      id: 'welded-wire-accent',
      name: 'Welded Wire Accent',
      subtitle: 'Stylish security, landscape view',
      category: 'Metal',
      style: 'Wire Accent',
      privacy: 'Open View',
      priceFt: 36,
      badges: ['Trending', 'Security', 'Open View'],
      renderType: 'welded-wire',
      config: {
        height: 4,
        panelLength: 8,
        picketWidth: '1x4',
        picketGap: 'gap-1.0',
        picketStyle: '1x4-privacy',
        capRail: true,
        railsPerPanel: 2,
        stainKey: 'natural-cedar',
        stainHex: '#A06E3B'
      }
    },
    {
      id: 'classic-privacy-pine',
      name: 'Classic Privacy Pine',
      subtitle: 'Dog-ear pine fence',
      category: 'Wood',
      style: 'Privacy',
      privacy: 'Full Privacy',
      priceFt: 32,
      badges: ['Popular', 'Full Privacy', 'HOA Approved'],
      renderType: 'dog-ear-privacy',
      config: {
        height: 6,
        panelLength: 8,
        picketWidth: '1x6',
        picketGap: 'privacy',
        picketStyle: '1x6-privacy',
        capRail: false,
        railsPerPanel: 3,
        stainKey: 'unstained',
        stainHex: '#D9A066'
      }
    },
    {
      id: 'contemporary-spaced-picket',
      name: 'Contemporary Spaced Picket',
      subtitle: 'Vertical cedar slats',
      category: 'Wood',
      style: 'Spaced Picket',
      privacy: 'Semi-Privacy',
      priceFt: 45,
      badges: ['Modern Style', 'Semi-Privacy', 'Designer Pick'],
      renderType: 'spaced-picket',
      config: {
        height: 6,
        panelLength: 8,
        picketWidth: '1x4',
        picketGap: 'gap-0.5',
        picketStyle: '1x4-privacy',
        capRail: true,
        railsPerPanel: 3,
        stainKey: 'warm-amber',
        stainHex: '#E08230'
      }
    },
    {
      id: 'shadowbox-wood',
      name: 'Shadowbox Wood',
      subtitle: 'Alternating boards',
      category: 'Wood',
      style: 'Shadowbox',
      privacy: 'Full Privacy',
      priceFt: 51,
      badges: ['Shadowbox', 'Full Privacy', 'Sturdy'],
      renderType: 'shadowbox',
      config: {
        height: 6,
        panelLength: 8,
        picketWidth: '1x6',
        picketGap: 'privacy',
        picketStyle: '1x6-privacy',
        capRail: true,
        railsPerPanel: 3,
        stainKey: 'warm-amber',
        stainHex: '#C88A4B'
      }
    }
  ];

  exports.CATALOG_PRESETS = MOCKUP_PRESETS;

})(typeof exports !== 'undefined' ? exports : (window.SandFramesPresets = {}));
