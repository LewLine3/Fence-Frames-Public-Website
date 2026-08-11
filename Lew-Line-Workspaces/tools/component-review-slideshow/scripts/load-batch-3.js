/**
 * Load Batch 3 script - Loads 5 new components into manifest
 */
const fs = require('fs');
const path = require('path');
const { addComponentsToManifest, createComponent } = require('./create-batch.js');

console.log('Generating & Loading Batch 3: Horizon & Rancher System Components...');

const batch3Components = [
  createComponent(
    "COMP-401",
    "Horizon Matte Black Aluminum Post Sleeve 5x5",
    "Posts & Columns",
    "Horizon",
    '5.0" W x 5.0" D x 96.0" H',
    "Extruded Architectural Aluminum",
    "#0f172a",
    "Matte Powder Coat",
    "Square Sleeve with Internal Channels",
    "In-Ground Concrete Anchored Post",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="70" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Thin Wall Post (Flexing Under Load)</text><rect x="360" y="140" width="80" height="300" fill="#334155" stroke="#ef4444" stroke-width="2"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="60" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Reinforced Heavy-Gauge Aluminum Post & Channel Grooves</text><rect x="340" y="110" width="120" height="340" fill="#1e293b" stroke="#38bdf8" stroke-width="3" rx="4"/><rect x="350" y="110" width="15" height="340" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/><rect x="435" y="110" width="15" height="340" fill="#0f172a" stroke="#0284c7" stroke-width="1.5"/><circle cx="400" cy="140" r="4" fill="#38bdf8"/><circle cx="400" cy="420" r="4" fill="#38bdf8"/></svg>`
  ),
  createComponent(
    "COMP-402",
    "Rancher Cross-Rail Mortise Lock Bracket",
    "Brackets & Fasteners",
    "Rancher",
    '3.5" W x 4.0" H x 2.5" D',
    "Heavy Cast Aluminum Alloy",
    "#334155",
    "Textured Metallic Slate",
    "Internal Locking Pocket",
    "Post Mortise Cutout Insert",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="70" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Exposed External Bracket</text><rect x="340" y="200" width="120" height="100" fill="#64748b"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="60" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Hidden Mortise Pocket Joint Lock</text><rect x="240" y="140" width="120" height="300" fill="#334155" stroke="#475569" stroke-width="2"/><rect x="360" y="240" width="260" height="60" fill="#b45309" stroke="#78350f" stroke-width="2"/><rect x="335" y="230" width="50" height="80" fill="#0f172a" stroke="#f59e0b" stroke-width="2.5" rx="3"/><circle cx="360" cy="250" r="5" fill="#f59e0b"/><circle cx="360" cy="290" r="5" fill="#f59e0b"/></svg>`
  ),
  createComponent(
    "COMP-403",
    "Heritage Cedar Arched Gate Top Cap 42\"",
    "Rails & Caps",
    "Heritage",
    '42" W x 8" H x 2" D',
    "Western Red Cedar Laminated",
    "#92400e",
    "Satin Cedar Stain",
    "Gently Curved Crown Arch",
    "Top Gate Rail Mounting",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="70" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Flat Top Gate Rail</text><rect x="200" y="180" width="400" height="30" fill="#78350f"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="60" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Elegantly Curved Cedar Arched Gate Crown</text><path d="M 180 220 Q 400 120 620 220 L 620 250 Q 400 150 180 250 Z" fill="#b45309" stroke="#78350f" stroke-width="3"/><g stroke="#451a03" stroke-width="1.5"><line x1="250" y1="205" x2="250" y2="420"/><line x1="320" y1="180" x2="320" y2="420"/><line x1="390" y1="170" x2="390" y2="420"/><line x1="460" y1="175" x2="460" y2="420"/><line x1="530" y1="195" x2="530" y2="420"/></g></svg>`
  ),
  createComponent(
    "COMP-404",
    "Universal Under-Rail LED Strip Housing 8ft",
    "Accessories",
    "Universal",
    '96" L x 0.8" W x 0.6" H',
    "Diffused Acrylic & Aluminum Channel",
    "#0284c7",
    "Frosted Opal Lens",
    "Low-Profile Recessed Channel",
    "Underside Rail Mounting",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="70" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Exposed Bulb Wire Harness</text><rect x="150" y="200" width="500" height="15" fill="#fef08a"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="60" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Recessed Opal Diffused Under-Rail Ambient Lighting</text><rect x="120" y="160" width="560" height="35" fill="#451a03" stroke="#78350f" stroke-width="2"/><rect x="140" y="195" width="520" height="12" fill="#38bdf8" opacity="0.9" rx="2"/><ellipse cx="400" cy="240" rx="280" ry="40" fill="#38bdf8" opacity="0.25"/></svg>`
  ),
  createComponent(
    "COMP-405",
    "Rancher Composite Post Cap Finial Ball",
    "Accessories",
    "Rancher",
    '4.5" W x 4.5" D x 6.5" H',
    "Composite Resin & Bronze Metal Collar",
    "#78350f",
    "Smooth Turned Sphere & Antique Bronze",
    "Spherical Ornamental Finial",
    "Top Post Screw Mount",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="70" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Flat Square Post Top</text><rect x="350" y="200" width="100" height="200" fill="#475569"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="60" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Turned Composite Ball Finial & Antique Bronze Collar</text><rect x="340" y="240" width="120" height="220" fill="#334155" stroke="#475569" stroke-width="2"/><rect x="320" y="220" width="160" height="20" fill="#b45309" stroke="#f59e0b" stroke-width="2" rx="2"/><circle cx="400" cy="150" r="50" fill="#78350f" stroke="#f59e0b" stroke-width="3"/><ellipse cx="385" cy="135" rx="15" ry="10" fill="#f59e0b" opacity="0.3"/></svg>`
  )
];

addComponentsToManifest(batch3Components);
console.log('[SUCCESS] Batch 3 loaded successfully!');
