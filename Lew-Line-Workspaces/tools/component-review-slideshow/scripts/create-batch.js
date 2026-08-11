/**
 * Script for AI (Antigravity / Cursor) to generate a new component batch and push to manifest
 * Usage: node create-batch.js --batch "Batch 1"
 */
const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const manifestPath = path.join(dataDir, 'component-manifest.json');

// Ensure data dir exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let existingComponents = [];
if (fs.existsSync(manifestPath)) {
  try {
    existingComponents = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    existingComponents = [];
  }
}

// Helper to create a new component item
function createComponent(id, name, category, productLine, dimensions, material, color, texture, shellType, positioning, v1Svg, v2Svg) {
  return {
    id,
    name,
    category,
    productLine,
    version: "v2 (Edited)",
    originalVersion: "v1 (Legacy)",
    dimensions,
    material,
    color,
    texture,
    shellType,
    positioning,
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
    v1_preview: v1Svg,
    v2_preview: v2Svg
  };
}

// Export module for AI usage or direct execution
module.exports = {
  addComponentsToManifest: function(newComponentArray) {
    newComponentArray.forEach(newItem => {
      const idx = existingComponents.findIndex(c => c.id === newItem.id);
      if (idx >= 0) {
        existingComponents[idx] = newItem;
      } else {
        existingComponents.push(newItem);
      }
    });
    fs.writeFileSync(manifestPath, JSON.stringify(existingComponents, null, 2), 'utf8');
    console.log(`[SUCCESS] Appended/updated ${newComponentArray.length} components in manifest. Total scoped: ${existingComponents.length}`);
  },
  createComponent
};

// If run directly via CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  console.log("AI Component Batch Creator ready. Call addComponentsToManifest([ ... ]) to inject batch items.");
}
