/**
 * Component Scoper Script for Fence Frames Review Workflow
 * Ingests project batch data and outputs unified component-manifest.json
 */
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'data');
const outputFile = path.join(targetDir, 'component-manifest.json');

// Base components catalog with high detail SVG preview renders & v1 vs v2 comparisons
const defaultComponents = [
  {
    id: "COMP-101",
    name: "Heritage Cap Rail 2x4",
    category: "Rails & Caps",
    productLine: "Heritage",
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions: '3.5" W x 1.5" H x 96" L',
    material: "Western Red Cedar",
    color: "#8B5A2B",
    texture: "Rough-Sawn Grain",
    shellType: "Beveled Cap Profile",
    positioning: "Top Rail Mount - Flush Offset",
    status: "pending",
    issues: {
      positioning: false,
      dimensions: false,
      color: false,
      shell_outline: false,
      texture: false,
      something_else: ""
    },
    markupImage: null,
    v1_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#1e293b"/>
      <g stroke="#334155" stroke-width="1">
        <line x1="0" y1="100" x2="800" y2="100" />
        <line x1="0" y1="200" x2="800" y2="200" />
        <line x1="0" y1="300" x2="800" y2="300" />
        <line x1="0" y1="400" x2="800" y2="400" />
      </g>
      <!-- Fence Section -->
      <rect x="100" y="150" width="40" height="300" fill="#475569" rx="4"/>
      <rect x="660" y="150" width="40" height="300" fill="#475569" rx="4"/>
      <!-- Pickets -->
      <g fill="#94a3b8" opacity="0.6">
        <rect x="150" y="180" width="60" height="260"/>
        <rect x="220" y="180" width="60" height="260"/>
        <rect x="290" y="180" width="60" height="260"/>
        <rect x="360" y="180" width="60" height="260"/>
        <rect x="430" y="180" width="60" height="260"/>
        <rect x="500" y="180" width="60" height="260"/>
        <rect x="570" y="180" width="60" height="260"/>
      </g>
      <!-- V1 Rail (Flat, mismatched color) -->
      <rect x="100" y="160" width="600" height="25" fill="#a16207" stroke="#78350f" stroke-width="2"/>
      <text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="18" font-family="sans-serif" font-weight="bold">v1 Original (Legacy Unaligned Cap)</text>
    </svg>`,
    v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cedarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#b45309" />
          <stop offset="50%" stop-color="#78350f" />
          <stop offset="100%" stop-color="#451a03" />
        </linearGradient>
        <pattern id="woodGrain" width="40" height="10" patternUnits="userSpaceOnUse">
          <path d="M 0 5 Q 10 2, 20 5 T 40 5" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1.5"/>
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#0f172a"/>
      <!-- Grid -->
      <g stroke="#1e293b" stroke-width="1">
        <line x1="0" y1="100" x2="800" y2="100" />
        <line x1="0" y1="200" x2="800" y2="200" />
        <line x1="0" y1="300" x2="800" y2="300" />
        <line x1="0" y1="400" x2="800" y2="400" />
      </g>
      <!-- Fence Section -->
      <rect x="100" y="130" width="45" height="320" fill="#334155" rx="4"/>
      <rect x="655" y="130" width="45" height="320" fill="#334155" rx="4"/>
      <!-- Pickets -->
      <g fill="#78350f" stroke="#451a03" stroke-width="1.5">
        <rect x="150" y="160" width="60" height="280"/>
        <rect x="220" y="160" width="60" height="280"/>
        <rect x="290" y="160" width="60" height="280"/>
        <rect x="360" y="160" width="60" height="280"/>
        <rect x="430" y="160" width="60" height="280"/>
        <rect x="500" y="160" width="60" height="280"/>
        <rect x="570" y="160" width="60" height="280"/>
      </g>
      <!-- V2 Beveled Cap Rail -->
      <polygon points="90,135 710,135 700,165 100,165" fill="url(#cedarGrad)" stroke="#f59e0b" stroke-width="2"/>
      <rect x="90" y="135" width="620" height="30" fill="url(#woodGrain)" opacity="0.4"/>
      <text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="18" font-family="sans-serif" font-weight="bold">v2 Beveled Cap Rail (Precision Positioned)</text>
    </svg>`
  },
  {
    id: "COMP-102",
    name: "Horizon Aluminum Slat Panel 6ft",
    category: "Pickets & Panels",
    productLine: "Horizon",
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions: '72" W x 72" H',
    material: "Architectural Aluminum",
    color: "#1e293b",
    texture: "Satin Powdercoat",
    shellType: "Interlocking Channel",
    positioning: "Post Channel Groove Insert",
    status: "pending",
    issues: {
      positioning: false,
      dimensions: false,
      color: false,
      shell_outline: false,
      texture: false,
      something_else: ""
    },
    markupImage: null,
    v1_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#1e293b"/>
      <text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="18" font-family="sans-serif">v1 Gapped Slats</text>
      <rect x="150" y="120" width="500" height="300" fill="#334155" stroke="#94a3b8" stroke-width="2"/>
      <line x1="150" y1="180" x2="650" y2="180" stroke="#64748b" stroke-width="4"/>
      <line x1="150" y1="240" x2="650" y2="240" stroke="#64748b" stroke-width="4"/>
      <line x1="150" y1="300" x2="650" y2="300" stroke="#64748b" stroke-width="4"/>
    </svg>`,
    v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#0f172a"/>
      <text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="18" font-family="sans-serif" font-weight="bold">v2 Interlocking Matte Black Slats</text>
      <!-- Posts -->
      <rect x="120" y="100" width="40" height="340" fill="#0f172a" stroke="#38bdf8" stroke-width="2" rx="2"/>
      <rect x="640" y="100" width="40" height="340" fill="#0f172a" stroke="#38bdf8" stroke-width="2" rx="2"/>
      <!-- Interlocking Slats -->
      <g fill="#1e293b" stroke="#475569" stroke-width="2">
        <rect x="160" y="110" width="480" height="35" rx="3"/>
        <rect x="160" y="150" width="480" height="35" rx="3"/>
        <rect x="160" y="190" width="480" height="35" rx="3"/>
        <rect x="160" y="230" width="480" height="35" rx="3"/>
        <rect x="160" y="270" width="480" height="35" rx="3"/>
        <rect x="160" y="310" width="480" height="35" rx="3"/>
        <rect x="160" y="350" width="480" height="35" rx="3"/>
        <rect x="160" y="390" width="480" height="35" rx="3"/>
      </g>
    </svg>`
  },
  {
    id: "COMP-103",
    name: "Solar LED Post Cap Light 5x5",
    category: "Accessories",
    productLine: "Rancher",
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions: '5.5" W x 5.5" D x 3.2" H',
    material: "UV Polycarbonate & Bronze Alloy",
    color: "#d97706",
    texture: "Frosted Lens & Brushed Metal",
    shellType: "Square Pyramidal Cap",
    positioning: "Top Post Mount",
    status: "pending",
    issues: {
      positioning: false,
      dimensions: false,
      color: false,
      shell_outline: false,
      texture: false,
      something_else: ""
    },
    markupImage: null,
    v1_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#1e293b"/>
      <text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="18" font-family="sans-serif">v1 Oversized Solar Housing</text>
      <rect x="350" y="200" width="100" height="250" fill="#475569"/>
      <polygon points="320,200 480,200 400,120" fill="#fbbf24" opacity="0.6"/>
    </svg>`,
    v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#0f172a"/>
      <text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="18" font-family="sans-serif" font-weight="bold">v2 Low-Profile Warm Amber Solar LED Cap</text>
      <!-- Post -->
      <rect x="340" y="220" width="120" height="240" fill="#334155" stroke="#475569" stroke-width="3"/>
      <!-- Glow -->
      <circle cx="400" cy="180" r="90" fill="#f59e0b" opacity="0.25"/>
      <!-- Solar Cap -->
      <polygon points="320,220 480,220 450,170 350,170" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>
      <rect x="360" y="150" width="80" height="20" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" rx="2"/>
      <polygon points="350,220 450,220 440,190 360,190" fill="#fbbf24" opacity="0.8"/>
    </svg>`
  },
  {
    id: "COMP-104",
    name: "Heavy-Duty Rail Bracket Hanger 2\"",
    category: "Brackets & Fasteners",
    productLine: "Universal",
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions: '2.1" W x 3.8" H x 1.8" D',
    material: "Powder-Coated Stainless Steel",
    color: "#334155",
    texture: "Matte Texture",
    shellType: "U-Channel Flanged",
    positioning: "Post-to-Rail Joint Mount",
    status: "pending",
    issues: {
      positioning: false,
      dimensions: false,
      color: false,
      shell_outline: false,
      texture: false,
      something_else: ""
    },
    markupImage: null,
    v1_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#1e293b"/>
      <text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="18" font-family="sans-serif">v1 Silver Bracket (High Visibility Hazard)</text>
      <rect x="360" y="180" width="80" height="140" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/>
    </svg>`,
    v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#0f172a"/>
      <text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="18" font-family="sans-serif" font-weight="bold">v2 Concealed Matte Powder-Coated Bracket</text>
      <rect x="250" y="160" width="100" height="280" fill="#475569" stroke="#64748b" stroke-width="2"/>
      <rect x="350" y="240" width="250" height="60" fill="#b45309" stroke="#78350f" stroke-width="2"/>
      <!-- Concealed Bracket -->
      <path d="M 345 235 L 375 235 L 375 305 L 345 305 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
      <circle cx="360" cy="255" r="4" fill="#38bdf8"/>
      <circle cx="360" cy="285" r="4" fill="#38bdf8"/>
    </svg>`
  },
  {
    id: "COMP-105",
    name: "Cedar Planter Box Hanger 24\"",
    category: "Accessories",
    productLine: "Heritage",
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions: '24" W x 8" D x 7" H',
    material: "Red Cedar & Forged Iron Arms",
    color: "#92400e",
    texture: "Natural Wood & Textured Iron",
    shellType: "Tapered Planter Box",
    positioning: "Top Rail Suspended",
    status: "pending",
    issues: {
      positioning: false,
      dimensions: false,
      color: false,
      shell_outline: false,
      texture: false,
      something_else: ""
    },
    markupImage: null,
    v1_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#1e293b"/>
      <text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="18" font-family="sans-serif">v1 Shallow Hanging Box</text>
      <rect x="280" y="200" width="240" height="70" fill="#78350f"/>
    </svg>`,
    v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#0f172a"/>
      <text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="18" font-family="sans-serif" font-weight="bold">v2 Deep Tapered Cedar Planter with Iron Hanger Arms</text>
      <!-- Rail -->
      <rect x="100" y="140" width="600" height="30" fill="#451a03" stroke="#78350f" stroke-width="2"/>
      <!-- Hanger Hooks -->
      <path d="M 280 130 L 280 170 L 260 210" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
      <path d="M 520 130 L 520 170 L 540 210" fill="none" stroke="#64748b" stroke-width="5" stroke-linecap="round"/>
      <!-- Tapered Planter Box -->
      <polygon points="250,200 550,200 520,310 280,310" fill="#b45309" stroke="#78350f" stroke-width="3"/>
      <!-- Plants/Foliage -->
      <circle cx="320" cy="180" r="30" fill="#16a34a"/>
      <circle cx="370" cy="170" r="35" fill="#22c55e"/>
      <circle cx="430" cy="175" r="32" fill="#15803d"/>
      <circle cx="480" cy="180" r="28" fill="#4ade80"/>
    </svg>`
  },
  {
    id: "COMP-106",
    name: "Weathered Oak Grain Finish Surface",
    category: "Textures & Finishes",
    productLine: "Rancher",
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions: "Full Surface Texture Pattern",
    material: "Composite Poly-Grain Stained",
    color: "#78350f",
    texture: "Deep Embossed Weathered Oak",
    shellType: "Surface Layer Finish",
    positioning: "Applied to all Exterior Faces",
    status: "pending",
    issues: {
      positioning: false,
      dimensions: false,
      color: false,
      shell_outline: false,
      texture: false,
      something_else: ""
    },
    markupImage: null,
    v1_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="500" fill="#1e293b"/>
      <text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="18" font-family="sans-serif">v1 Flat Brown Color (No Texture Bump)</text>
      <rect x="200" y="140" width="400" height="260" fill="#854d0e"/>
    </svg>`,
    v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oakBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#a16207" />
          <stop offset="50%" stop-color="#78350f" />
          <stop offset="100%" stop-color="#451a03" />
        </linearGradient>
        <pattern id="oakPattern" width="120" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 10 Q 30 0, 60 10 T 120 10" fill="none" stroke="#292524" stroke-width="2" opacity="0.5"/>
          <path d="M 0 25 Q 40 35, 80 25 T 120 25" fill="none" stroke="#1c1917" stroke-width="1.5" opacity="0.6"/>
          <circle cx="60" cy="20" r="6" fill="none" stroke="#451a03" stroke-width="2" opacity="0.7"/>
        </pattern>
      </defs>
      <rect width="800" height="500" fill="#0f172a"/>
      <text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="18" font-family="sans-serif" font-weight="bold">v2 Deep Weathered Oak Embossed Texture</text>
      <rect x="200" y="140" width="400" height="260" fill="url(#oakBase)" rx="8" stroke="#f59e0b" stroke-width="2"/>
      <rect x="200" y="140" width="400" height="260" fill="url(#oakPattern)" rx="8"/>
    </svg>`
  }
];

// Ensure directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Write manifest file
fs.writeFileSync(outputFile, JSON.stringify(defaultComponents, null, 2), 'utf-8');
console.log(`[SUCCESS] Scoped ${defaultComponents.length} components into ${outputFile}`);
