/**
 * Inject Test Component script for user test run
 */
const fs = require('fs');
const path = require('path');

const manifestPath = path.join(__dirname, '..', 'data', 'component-manifest.json');

let components = [];
if (fs.existsSync(manifestPath)) {
  try { components = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch(e){}
}

const testComponent = {
  id: "COMP-301",
  name: "Heritage Decorative Solar Post Cap v2",
  category: "Accessories",
  productLine: "Heritage",
  version: "v2 (Edited)",
  originalVersion: "v1 (Legacy)",
  dimensions: '5.5" W x 5.5" D x 4.0" H',
  material: "Western Red Cedar & Frosted Glass",
  color: "#92400e",
  texture: "Rough-Sawn Cedar & Warm Glow",
  shellType: "Stepped Pyramid Bevel Cap",
  positioning: "Top Post Mount - Flush Fit",
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
    <text x="400" y="70" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Legacy (Misaligned Housing & Harsh Cool Light)</text>
    <!-- Post -->
    <rect x="350" y="220" width="100" height="240" fill="#475569"/>
    <!-- Flawed Cap -->
    <rect x="320" y="160" width="160" height="60" fill="#a16207" stroke="#ef4444" stroke-width="3"/>
    <circle cx="400" cy="190" r="30" fill="#67e8f9" opacity="0.8"/>
  </svg>`,
  v2_preview: `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cedarWarm" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#b45309" />
        <stop offset="50%" stop-color="#78350f" />
        <stop offset="100%" stop-color="#451a03" />
      </linearGradient>
      <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.9"/>
        <stop offset="60%" stop-color="#f59e0b" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#d97706" stop-opacity="0"/>
      </radialGradient>
      <pattern id="cedarGrain" width="30" height="8" patternUnits="userSpaceOnUse">
        <path d="M 0 4 Q 8 1, 15 4 T 30 4" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.2"/>
      </pattern>
    </defs>
    <rect width="800" height="500" fill="#0f172a"/>
    <text x="400" y="60" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Heritage Stepped Pyramid Solar Cap (Warm Amber Glow)</text>
    
    <!-- Warm Ambient Glow Circle -->
    <circle cx="400" cy="180" r="140" fill="url(#amberGlow)"/>

    <!-- 4x4 / 5x5 Fence Post -->
    <rect x="330" y="240" width="140" height="220" fill="url(#cedarWarm)" stroke="#451a03" stroke-width="3"/>
    <rect x="330" y="240" width="140" height="220" fill="url(#cedarGrain)" opacity="0.5"/>

    <!-- Post Skirt Base -->
    <polygon points="310,245 490,245 470,225 330,225" fill="#78350f" stroke="#f59e0b" stroke-width="2"/>

    <!-- Frosted Lens Box -->
    <rect x="345" y="170" width="110" height="55" fill="#fef08a" opacity="0.85" rx="3" stroke="#f59e0b" stroke-width="2"/>
    <line x1="400" y1="170" x2="400" y2="225" stroke="#b45309" stroke-width="2"/>

    <!-- Stepped Pyramid Cedar Roof Top -->
    <polygon points="320,170 480,170 450,135 350,135" fill="url(#cedarWarm)" stroke="#f59e0b" stroke-width="2"/>
    <polygon points="350,135 450,135 430,115 370,115" fill="#b45309" stroke="#f59e0b" stroke-width="2"/>

    <!-- Solar Cell Plate -->
    <rect x="375" y="110" width="50" height="8" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" rx="1"/>
  </svg>`
};

// Insert at start of manifest
const idx = components.findIndex(c => c.id === testComponent.id);
if (idx >= 0) {
  components[idx] = testComponent;
} else {
  components.unshift(testComponent);
}

fs.writeFileSync(manifestPath, JSON.stringify(components, null, 2), 'utf8');
console.log(`[SUCCESS] Test component COMP-301 injected at start of queue! Total items: ${components.length}`);
