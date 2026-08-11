/**
 * Bundle Standalone Review App Script
 * Reads index.html, styles.css, app.js, and data/component-manifest.json
 * Combines everything into standalone-review-app.html (100% Single File Bundle)
 */

const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '..');
const manifestPath = path.join(baseDir, 'data', 'component-manifest.json');
const cssPath = path.join(baseDir, 'styles.css');
const appJsPath = path.join(baseDir, 'app.js');
const standalonePath = path.join(baseDir, 'standalone-review-app.html');

const components = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const cssContent = fs.readFileSync(cssPath, 'utf8');
let appJsContent = fs.readFileSync(appJsPath, 'utf8');

// Embed components array into embeddedComponents constant inside appJs
const embeddedArrayString = JSON.stringify(components, null, 2);
appJsContent = appJsContent.replace(
  /let components = \[\];/,
  `let components = JSON.parse(localStorage.getItem('ff_qc_review_state')) || ${embeddedArrayString};`
);

// Clear localStorage force reload on first launch if stale
const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>Fence Frames — Universal Component Review Workbench (Portable)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <style>
${cssContent}
  </style>
</head>
<body>
  <div class="app-container" id="appContainer">
    <div class="drag-drop-overlay" id="dragOverlay">
      <div class="drag-drop-icon">📥</div>
      <div class="drag-drop-title">Drop Component JSON / Batch File Here</div>
      <div class="drag-drop-subtitle">Inflow from Antigravity, Cursor, Vercel, or custom batch file</div>
    </div>

    <!-- Main Header -->
    <header class="app-header">
      <div class="brand">
        <div class="logo-icon">🪵</div>
        <div class="brand-text">
          <h1>Fence Frames <span>Universal Workbench</span></h1>
          <p class="subtitle">Universal Inflow/Outflow Component Review Engine</p>
        </div>
      </div>

      <div class="header-stats">
        <div class="stat-badge total"><span class="label">Total Scoped</span><span class="value" id="statTotal">0</span></div>
        <div class="stat-badge accepted"><span class="label">Accepted</span><span class="value" id="statAccepted">0</span></div>
        <div class="stat-badge needs-work"><span class="label">Needs Work</span><span class="value" id="statNeedsWork">0</span></div>
        <div class="stat-badge pending"><span class="label">Pending</span><span class="value" id="statPending">0</span></div>
      </div>

      <div class="header-actions">
        <button id="btnResetCache" class="btn btn-reset-cache" title="Reload Fresh Batch from Disk [Hotkey 'R']"><span class="icon">🔄</span> Reload [R]</button>
        <button id="btnDisapproveBatch" class="btn btn-disapprove-batch" title="Disapprove & Reject Whole Batch at Once [Hotkey 'B']"><span class="icon">⚠️</span> Reject Batch [B]</button>
        <button id="btnKillBatch" class="btn btn-kill-batch" title="Purge / Clear Active Batch [Hotkey 'K']"><span class="icon">🗑️</span> Kill Batch [K]</button>

        <div class="filter-group">
          <label for="filterSelect">Filter:</label>
          <select id="filterSelect" class="styled-select">
            <option value="pending">Pending Only</option>
            <option value="all">All Components</option>
            <option value="accepted">100% Accepted</option>
            <option value="needs_work">Needs Work</option>
            <option value="scrapped">Scrapped</option>
            <option value="issue_positioning">Flagged: Positioning</option>
            <option value="issue_dimensions">Flagged: Dimensions</option>
            <option value="issue_color">Flagged: Color</option>
            <option value="issue_shell_outline">Flagged: Shell/Outline</option>
            <option value="issue_texture">Flagged: Texture</option>
          </select>
        </div>

        <button id="btnAIFixPrompt" onclick="if(window.openShipAllModal)window.openShipAllModal()" class="btn btn-ai-prompt" title="Ship All Decisions & Export Outflow Package [Hotkey 'S' or 'E']"><span class="icon">🚢</span> Ship All [S]</button>
        <button id="btnPasteInflow" class="btn btn-secondary" title="Paste JSON Inflow Batch"><span class="icon">📥</span> Inflow</button>
        <button id="btnExportJSON" class="btn btn-secondary" title="Export Outflow JSON"><span class="icon">💾</span> State</button>
        <button id="btnImportJSON" class="btn btn-icon-only" title="Import JSON File">📂</button>
        <input type="file" id="fileInput" accept=".json,.csv" style="display:none;">
      </div>
    </header>

    <!-- Main Workspace -->
    <main class="workspace">
      <!-- Left Slideshow Section -->
      <section class="slideshow-panel">
        <div class="component-meta-header">
          <div class="title-group">
            <span class="comp-id" id="compId">COMP-000</span>
            <h2 id="compName">Loading Component...</h2>
          </div>
          <div class="tags-group">
            <span class="badge category" id="compCategory">Category</span>
            <span class="badge line" id="compLine">Product Line</span>
            <span class="badge version" id="compVersion">v2</span>
          </div>
        </div>

        <div class="version-tabs">
          <button class="tab-btn active" data-view="v2">v2 (Current Edited Version)</button>
          <button class="tab-btn" data-view="v1">v1 (Original Legacy Version)</button>
          <button class="tab-btn" data-view="split">Side-by-Side Compare</button>
        </div>

        <div class="preview-stage" id="previewStage">
          <div class="svg-container" id="svgContainer"></div>
          <canvas id="drawingCanvas"></canvas>
          <div class="drawing-toolbar">
            <span class="toolbar-title">🎨 Canvas Drawing:</span>
            <button class="tool-btn active" data-tool="brush">🖌️ Pen</button>
            <button class="tool-btn" data-tool="arrow">➡️ Arrow</button>
            <button class="tool-btn" data-tool="box">🔲 Box</button>
            <div class="color-palette">
              <span class="color-swatch active" data-color="#ef4444" style="background:#ef4444;"></span>
              <span class="color-swatch" data-color="#eab308" style="background:#eab308;"></span>
              <span class="color-swatch" data-color="#06b6d4" style="background:#06b6d4;"></span>
              <span class="color-swatch" data-color="#ffffff" style="background:#ffffff;"></span>
            </div>
            <div class="size-picker">
              <button class="size-btn active" data-size="3">S</button>
              <button class="size-btn" data-size="6">M</button>
              <button class="size-btn" data-size="10">L</button>
            </div>
            <button id="btnClearCanvas" class="tool-action-btn">🗑️ Clear</button>
          </div>
        </div>

        <div class="slideshow-nav">
          <button id="btnPrev" class="nav-btn"><span>⬅️ Previous</span></button>
          
          <div class="hotkey-legend-inline">
            <span class="hk-badge">← Prev</span>
            <span class="hk-badge">→ / Space</span>
            <span class="hk-badge accept">A Accept</span>
            <span class="hk-badge work">N Needs Work</span>
            <span class="hk-badge disprove">D Disprove</span>
            <span class="hk-badge num">1-5 Categories</span>
          </div>

          <div class="slide-indicator"><span id="currentSlideNum">1</span> / <span id="totalSlideNum">1</span></div>
          <button id="btnNext" class="nav-btn"><span>Next ➡️</span></button>
        </div>
      </section>

      <!-- Right QC Sidebar -->
      <aside class="qc-panel">
        <div class="panel-card specs-card">
          <h3>📐 Component Specifications</h3>
          <ul class="specs-list 2-col">
            <li><strong>Dimensions:</strong> <span id="specDimensions">-</span></li>
            <li><strong>Material:</strong> <span id="specMaterial">-</span></li>
            <li><strong>Color:</strong> <span id="specColor">-</span></li>
            <li><strong>Texture:</strong> <span id="specTexture">-</span></li>
            <li><strong>Shell Profile:</strong> <span id="specShell">-</span></li>
            <li><strong>Positioning:</strong> <span id="specPositioning">-</span></li>
          </ul>
        </div>

        <!-- CARD 1: Quality Review Decision (Bulleted Flex Row Inline 3 Columns) -->
        <div class="panel-card decision-card">
          <h3>⚡ Quality Review Decision</h3>
          <div class="decision-buttons" style="display: flex !important; flex-direction: row !important; flex-wrap: nowrap !important; width: 100% !important; gap: 6px !important;">
            <button id="btnAccept" class="btn-decision btn-accept" style="flex: 1 1 33.33% !important; width: 33.33% !important;"><span class="icon">✅</span><span class="text">ACCEPT</span><span class="hotkey">[A]</span></button>
            <button id="btnNeedsWork" class="btn-decision btn-work" style="flex: 1 1 33.33% !important; width: 33.33% !important;"><span class="icon">⚠️</span><span class="text">REWORK</span><span class="hotkey">[N]</span></button>
            <button id="btnDisprove" class="btn-decision btn-disprove" style="flex: 1 1 33.33% !important; width: 33.33% !important;"><span class="icon">❌</span><span class="text">SCRAP</span><span class="hotkey">[D]</span></button>
          </div>
        </div>

        <div class="panel-card categories-card">
          <h3>🛠️ Rework Reasons Required <span class="hotkey-hint">(Keys 1 - 6)</span></h3>
          <div class="category-checkboxes 2-col-grid">
            <label class="checkbox-tile"><input type="checkbox" id="chkPositioning" data-issue="positioning"><div class="tile-content"><span class="title"><span class="hk-num">[1]</span> 📐 Positioning</span><span class="desc">Alignment & placement</span></div></label>
            <label class="checkbox-tile"><input type="checkbox" id="chkDimensions" data-issue="dimensions"><div class="tile-content"><span class="title"><span class="hk-num">[2]</span> 📏 Dimensions</span><span class="desc">Scale & thickness</span></div></label>
            <label class="checkbox-tile"><input type="checkbox" id="chkColor" data-issue="color"><div class="tile-content"><span class="title"><span class="hk-num">[3]</span> 🎨 Color</span><span class="desc">Stain & finish match</span></div></label>
            <label class="checkbox-tile"><input type="checkbox" id="chkShell" data-issue="shell_outline"><div class="tile-content"><span class="title"><span class="hk-num">[4]</span> 🔲 Shell / Outline</span><span class="desc">Profile & geometry</span></div></label>
            <label class="checkbox-tile" style="grid-column: span 2;"><input type="checkbox" id="chkTexture" data-issue="texture"><div class="tile-content"><span class="title"><span class="hk-num">[5]</span> 🧵 Texture</span><span class="desc">Wood grain pattern & surface bump</span></div></label>
          </div>
          <div class="notebox-group">
            <label for="txtNotes"><span class="hk-num">[6]</span> ✏️ Something Else (Notes Box):</label>
            <textarea id="txtNotes" placeholder="Type instructions or notes for AI / CAD technician..."></textarea>
          </div>
        </div>
      </aside>
    </main>

    <!-- Bottom Thumbnail Carousel -->
    <footer class="carousel-footer">
      <div class="carousel-container" id="carouselStrip"></div>
    </footer>
  </div>

  <div id="exportModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3 id="modalTitle">📋 Outflow Action Plan</h3>
        <button class="close-btn" id="btnCloseModal">&times;</button>
      </div>
      <div class="modal-body">
        <p id="modalDesc" style="font-size:12px; color:var(--text-secondary);">Copy this structured prompt directly into Antigravity or Cursor to execute AI component fixes:</p>
        <textarea id="markdownReportText"></textarea>
      </div>
      <div class="modal-footer">
        <button id="btnCopyMarkdown" class="btn btn-primary">Copy to Clipboard</button>
        <button id="btnDownloadMarkdown" class="btn btn-secondary">Download .md</button>
      </div>
    </div>
  </div>

  <div id="inflowModal" class="modal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>📥 Inflow Component Batch (JSON)</h3>
        <button class="close-btn" id="btnCloseInflowModal">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size:12px; color:var(--text-secondary);">Paste raw JSON batch array from Antigravity, Cursor, Vercel, or custom workflow:</p>
        <textarea id="inflowJsonText" placeholder='[ { "id": "COMP-999", "name": "New Component", ... } ]'></textarea>
      </div>
      <div class="modal-footer">
        <button id="btnApplyInflow" class="btn btn-primary">Import & Append Inflow Batch</button>
      </div>
    </div>
  </div>

  <script>
    const embeddedComponents = ${embeddedArrayString};
  </script>
  <script>
${appJsContent}
  </script>
</body>
</html>`;

fs.writeFileSync(standalonePath, fullHtml, 'utf8');
console.log(`[SUCCESS] Bundled 100% self-contained standalone-review-app.html with ${components.length} components!`);
