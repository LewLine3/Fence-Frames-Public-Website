/**
 * Generator script for AI (Antigravity / Cursor) to inject a new component batch into the review manifest
 * Usage: node generate-ai-batch.js "Batch 2 - Solar & Decorative Accents"
 */

const fs = require('fs');
const path = require('path');
const { addComponentsToManifest, createComponent } = require('./create-batch.js');

const batchName = process.argv[2] || "Batch 2 - Decorative Accents";

console.log(`Generating AI Component Batch: "${batchName}"...`);

// Sample generated batch items
const newBatchItems = [
  createComponent(
    "COMP-201",
    "Horizon Vertical Lattice Screen Insert 4x6",
    "Accessories",
    "Horizon",
    '48" W x 72" H',
    "Powder-Coated Aluminum",
    "#1e293b",
    "Geometric Diamond Lattice Pattern",
    "Framed Screen Panel",
    "Post Slot Channel Insert",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Thin Frame (Prone to Sagging)</text><rect x="200" y="120" width="400" height="300" fill="none" stroke="#64748b" stroke-width="2"/><line x1="200" y1="120" x2="600" y2="420" stroke="#64748b" stroke-width="2"/><line x1="600" y1="120" x2="200" y2="420" stroke="#64748b" stroke-width="2"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Heavy-Duty Reinforced Frame & Laser Diamond Lattice</text><rect x="180" y="100" width="440" height="340" fill="none" stroke="#38bdf8" stroke-width="6" rx="4"/><g stroke="#0284c7" stroke-width="3" fill="none"><path d="M 220 100 L 620 340 M 300 100 L 620 260 M 380 100 L 620 180 M 180 180 L 500 440 M 180 260 L 420 440 M 180 340 L 340 440"/><path d="M 580 100 L 180 340 M 500 100 L 180 260 M 420 100 L 180 180 M 620 180 L 300 440 M 620 260 L 380 440 M 620 340 L 460 440"/></g></svg>`
  ),
  createComponent(
    "COMP-202",
    "Rancher Heavy-Duty Gate Hinge Pair 8\"",
    "Brackets & Fasteners",
    "Rancher",
    '8" L x 4.5" W',
    "Forged Iron & Stainless Pivot Pin",
    "#090d16",
    "Textured Matte Black Powder Coat",
    "Heavy Strap Hinge",
    "Post-to-Gate Frame Mount",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Short Pivot Pin (Weight Binding Hazard)</text><rect x="300" y="200" width="200" height="50" fill="#475569"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Forged Iron 8" Strap Hinge & Ball-Bearing Pivot</text><path d="M 150 210 L 380 210 L 420 230 L 420 270 L 380 290 L 150 290 Z" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><circle cx="400" cy="250" r="16" fill="#38bdf8"/><rect x="416" y="210" width="230" height="80" fill="#1e293b" stroke="#f59e0b" stroke-width="2" rx="4"/><circle cx="200" cy="250" r="6" fill="#f59e0b"/><circle cx="280" cy="250" r="6" fill="#f59e0b"/><circle cx="360" cy="250" r="6" fill="#f59e0b"/><circle cx="480" cy="250" r="6" fill="#f59e0b"/><circle cx="560" cy="250" r="6" fill="#f59e0b"/></svg>`
  ),
  createComponent(
    "COMP-203",
    "Heritage Garden Tool Rack Shelf 36\"",
    "Accessories",
    "Heritage",
    '36" W x 10" D x 6" H',
    "Western Red Cedar & Brass Hooks",
    "#92400e",
    "Smooth Stained Wood & Brushed Brass",
    "Slotted Shelf with Lower Hook Rail",
    "Mid-Rail Fence Mount",
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#1e293b"/><text x="400" y="80" text-anchor="middle" fill="#ef4444" font-size="20" font-family="sans-serif" font-weight="bold">v1 Unslotted Solid Board (Water Pooling Issue)</text><rect x="200" y="220" width="400" height="40" fill="#78350f"/></svg>`,
    `<svg viewBox="0 0 800 500" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="500" fill="#0f172a"/><text x="400" y="80" text-anchor="middle" fill="#22c55e" font-size="20" font-family="sans-serif" font-weight="bold">v2 Slotted Drainage Shelf & Brass Tool Hooks</text><rect x="150" y="200" width="500" height="25" fill="#b45309" stroke="#78350f" stroke-width="2" rx="2"/><g fill="#0284c7"><rect x="200" y="205" width="20" height="15" rx="2"/><rect x="260" y="205" width="20" height="15" rx="2"/><rect x="320" y="205" width="20" height="15" rx="2"/><rect x="380" y="205" width="20" height="15" rx="2"/><rect x="440" y="205" width="20" height="15" rx="2"/><rect x="500" y="205" width="20" height="15" rx="2"/><rect x="560" y="205" width="20" height="15" rx="2"/></g><rect x="170" y="225" width="460" height="15" fill="#78350f"/><path d="M 220 240 Q 220 270 200 270" stroke="#f59e0b" stroke-width="4" fill="none"/><path d="M 320 240 Q 320 270 300 270" stroke="#f59e0b" stroke-width="4" fill="none"/><path d="M 420 240 Q 420 270 400 270" stroke="#f59e0b" stroke-width="4" fill="none"/><path d="M 520 240 Q 520 270 500 270" stroke="#f59e0b" stroke-width="4" fill="none"/></svg>`
  )
];

addComponentsToManifest(newBatchItems);
console.log(`[SUCCESS] New AI component batch generated and appended!`);
