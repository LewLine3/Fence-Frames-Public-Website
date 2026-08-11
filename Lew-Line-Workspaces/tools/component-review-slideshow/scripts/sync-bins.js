/**
 * 3-Bin Automated Sorting Engine for Fence Frames Component Review Workflow
 * Bins:
 *  1. Accepted Bin (accepted-components.json)
 *  2. Rework Queue (rework-queue.json & rework-action-plan.md)
 *  3. Pending Manifest (component-manifest.json)
 */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const manifestPath = path.join(dataDir, 'component-manifest.json');
const acceptedPath = path.join(dataDir, 'accepted-components.json');
const reworkPath = path.join(dataDir, 'rework-queue.json');
const actionPlanPath = path.join(dataDir, 'rework-action-plan.md');

function runBinSync() {
  if (!fs.existsSync(manifestPath)) {
    console.log("No component-manifest.json found to sync.");
    return;
  }

  let allComponents = [];
  try {
    allComponents = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (e) {
    console.error("Failed to parse component-manifest.json:", e);
    return;
  }

  // Load existing accepted bin if present
  let acceptedBin = [];
  if (fs.existsSync(acceptedPath)) {
    try { acceptedBin = JSON.parse(fs.readFileSync(acceptedPath, 'utf8')); } catch(e){}
  }

  // Separate components by status
  const pendingQueue = [];
  const reworkQueue = [];

  allComponents.forEach(comp => {
    if (comp.status === 'accepted') {
      const idx = acceptedBin.findIndex(a => a.id === comp.id);
      if (idx >= 0) {
        acceptedBin[idx] = comp;
      } else {
        acceptedBin.push(comp);
      }
    } else if (comp.status === 'needs_work') {
      reworkQueue.push(comp);
      pendingQueue.push(comp); // keep in active manifest so user can re-examine if needed
    } else {
      pendingQueue.push(comp);
    }
  });

  // Filter pendingQueue to exclude accepted items
  const activeManifest = allComponents.filter(c => c.status !== 'accepted');

  // Save Bins
  fs.writeFileSync(acceptedPath, JSON.stringify(acceptedBin, null, 2), 'utf8');
  fs.writeFileSync(reworkPath, JSON.stringify(reworkQueue, null, 2), 'utf8');
  fs.writeFileSync(manifestPath, JSON.stringify(activeManifest, null, 2), 'utf8');

  // Generate AI Rework Action Plan Markdown file
  let md = `# AI Rework Action Plan (Generated ${new Date().toLocaleString()})\n\n`;
  md += `**Items Needing Work:** ${reworkQueue.length}\n`;
  md += `**Items 100% Accepted:** ${acceptedBin.length}\n\n`;
  md += `---\n\n`;

  if (reworkQueue.length === 0) {
    md += `🎉 **All components are 100% Accepted! No rework required.**\n`;
  } else {
    reworkQueue.forEach((comp, idx) => {
      md += `### 🛠️ ${idx + 1}. [${comp.id}] ${comp.name}\n`;
      md += `- **Product Line:** ${comp.productLine} | **Category:** ${comp.category}\n`;
      md += `- **Target Specs:** ${comp.dimensions} | ${comp.material} | ${comp.color} | ${comp.texture}\n`;
      md += `- **Flagged Issue Categories:**\n`;
      if (comp.issues) {
        if (comp.issues.positioning) md += `  - 📐 **POSITIONING**: Adjust mount offset, alignment, or height on fence.\n`;
        if (comp.issues.dimensions) md += `  - 📏 **DIMENSIONS**: Scale, length, height, or wall thickness mismatch.\n`;
        if (comp.issues.color) md += `  - 🎨 **COLOR**: Adjust color stain, tone, or powder-coat finish.\n`;
        if (comp.issues.shell_outline) md += `  - 🔲 **SHELL / OUTLINE**: Adjust profile bevel, cutouts, or edge border.\n`;
        if (comp.issues.texture) md += `  - 🧵 **TEXTURE**: Adjust wood grain pattern or surface bump.\n`;
        if (comp.issues.something_else) md += `  - ✏️ **NOTES**: ${comp.issues.something_else}\n`;
      }
      if (comp.markupImage) {
        md += `- **Visual Canvas Annotation Attached**: Yes (Drawing overlay present)\n`;
      }
      md += `\n`;
    });
    md += `---\n`;
    md += `> **Instruction for AI (Antigravity / Cursor):** Please examine each flagged item above, edit the component SVG/specs in codebase, update the version to v3, and clear the issue flags once resolved.\n`;
  }

  fs.writeFileSync(actionPlanPath, md, 'utf8');

  console.log(`[BIN SYNC COMPLETE]`);
  console.log(`  -> 🟢 Accepted Bin: ${acceptedBin.length} items`);
  console.log(`  -> ⚠️ Rework Queue: ${reworkQueue.length} items`);
  console.log(`  -> 📋 Active Review Manifest: ${activeManifest.length} items remaining`);
}

if (require.main === module) {
  runBinSync();
}

module.exports = { runBinSync };
