/**
 * Fence Frames — Component Review Slideshow Logic (Batch Inflow/Outflow Lifecycle)
 * - Individual Item Queue Flow (Decided items move to bins immediately)
 * - Batch Archiving: Shipping a batch archives it and clears queue for next batch.
 * - Supports: 100% Accept, Needs Work (AI Fix), Total Disprove (Scrap), and Ship & Archive Batch.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  let components = null;
  let currentIndex = 0;
  let currentFilter = 'pending';
  let viewMode = 'v2';
  let drawTool = 'brush';
  let strokeColor = '#ef4444';
  let strokeWidth = 3;
  let isDrawing = false;
  let startX = 0;
  let startY = 0;
  let canvasUndoStack = [];

  // DOM Elements
  const elStatTotal = document.getElementById('statTotal');
  const elStatAccepted = document.getElementById('statAccepted');
  const elStatNeedsWork = document.getElementById('statNeedsWork');
  const elStatPending = document.getElementById('statPending');
  const filterSelect = document.getElementById('filterSelect');

  const elCompId = document.getElementById('compId');
  const elCompName = document.getElementById('compName');
  const elCompCategory = document.getElementById('compCategory');
  const elCompLine = document.getElementById('compLine');
  const elCompVersion = document.getElementById('compVersion');

  const svgContainer = document.getElementById('svgContainer');
  const canvas = document.getElementById('drawingCanvas');
  const ctx = canvas.getContext('2d');

  const elCurrentSlideNum = document.getElementById('currentSlideNum');
  const elTotalSlideNum = document.getElementById('totalSlideNum');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');

  const specDimensions = document.getElementById('specDimensions');
  const specMaterial = document.getElementById('specMaterial');
  const specColor = document.getElementById('specColor');
  const specTexture = document.getElementById('specTexture');
  const specShell = document.getElementById('specShell');
  const specPositioning = document.getElementById('specPositioning');

  const btnAccept = document.getElementById('btnAccept');
  const btnNeedsWork = document.getElementById('btnNeedsWork');
  const btnDisprove = document.getElementById('btnDisprove');

  const chkPositioning = document.getElementById('chkPositioning');
  const chkDimensions = document.getElementById('chkDimensions');
  const chkColor = document.getElementById('chkColor');
  const chkShell = document.getElementById('chkShell');
  const chkTexture = document.getElementById('chkTexture');
  const txtNotes = document.getElementById('txtNotes');

  const carouselStrip = document.getElementById('carouselStrip');

  const exportModal = document.getElementById('exportModal');
  const markdownReportText = document.getElementById('markdownReportText');
  const btnAIFixPrompt = document.getElementById('btnAIFixPrompt');
  const btnExportJSON = document.getElementById('btnExportJSON');
  const btnImportJSON = document.getElementById('btnImportJSON');
  const fileInput = document.getElementById('fileInput');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCopyMarkdown = document.getElementById('btnCopyMarkdown');
  const btnDownloadMarkdown = document.getElementById('btnDownloadMarkdown');
  const btnClearCanvas = document.getElementById('btnClearCanvas');
  const btnResetCache = document.getElementById('btnResetCache');
  const btnDisapproveBatch = document.getElementById('btnDisapproveBatch');
  const btnKillBatch = document.getElementById('btnKillBatch');

  // Inflow Modal Elements
  const inflowModal = document.getElementById('inflowModal');
  const btnPasteInflow = document.getElementById('btnPasteInflow');
  const btnCloseInflowModal = document.getElementById('btnCloseInflowModal');
  const btnApplyInflow = document.getElementById('btnApplyInflow');
  const inflowJsonText = document.getElementById('inflowJsonText');

  // Drag & Drop File Handling
  const dragOverlay = document.getElementById('dragOverlay');
  window.addEventListener('dragover', (e) => { e.preventDefault(); dragOverlay.classList.add('active'); });
  dragOverlay.addEventListener('dragleave', () => dragOverlay.classList.remove('active'));
  dragOverlay.addEventListener('drop', (e) => {
    e.preventDefault();
    dragOverlay.classList.remove('active');
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const newItems = JSON.parse(evt.target.result);
          ingestInflowBatch(newItems);
        } catch (err) {
          alert('Invalid JSON inflow file format.');
        }
      };
      reader.readAsText(file);
    }
  });

  if (btnPasteInflow) btnPasteInflow.addEventListener('click', () => inflowModal.classList.add('active'));
  if (btnCloseInflowModal) btnCloseInflowModal.addEventListener('click', () => inflowModal.classList.remove('active'));
  if (btnApplyInflow) {
    btnApplyInflow.addEventListener('click', () => {
      try {
        const parsed = JSON.parse(inflowJsonText.value);
        ingestInflowBatch(parsed);
        inflowModal.classList.remove('active');
        inflowJsonText.value = '';
      } catch (e) {
        alert('Invalid JSON string format.');
      }
    });
  }

  function ingestInflowBatch(newItems) {
    if (!Array.isArray(newItems)) newItems = [newItems];
    components = newItems; // Clean replacement for new batch
    saveState();
    currentFilter = 'pending';
    if (filterSelect) filterSelect.value = 'pending';
    currentIndex = 0;
    renderSlide();
    updateStats();
    alert(`Successfully loaded NEW batch with ${newItems.length} components!`);
  }

  if (btnResetCache) {
    btnResetCache.addEventListener('click', async () => {
      if (confirm('Reload default component manifest batch from disk?')) {
        localStorage.removeItem('ff_qc_review_state');
        await loadManifestData();
        currentFilter = 'pending';
        if (filterSelect) filterSelect.value = 'pending';
        currentIndex = 0;
        renderSlide();
        updateStats();
        alert(`Successfully loaded default manifest batch with ${components.length} components!`);
      }
    });
  }

  if (btnDisapproveBatch) {
    btnDisapproveBatch.addEventListener('click', () => {
      if (!components || components.length === 0) return;
      if (confirm('Reject & Disprove ALL pending components in this batch at once?')) {
        components.forEach(comp => {
          if (comp.status === 'pending') {
            comp.status = 'needs_work';
            comp.issues = {
              positioning: true,
              dimensions: true,
              color: true,
              shell_outline: true,
              texture: true,
              something_else: "TOTAL BATCH REJECTION - Complete System Redo Required"
            };
          }
        });
        saveState();
        currentIndex = 0;
        renderSlide();
        updateStats();
        alert(`All pending components in batch flagged for rework!`);
      }
    });
  }

  if (btnKillBatch) {
    btnKillBatch.addEventListener('click', () => {
      if (confirm('⚠️ PERMANENTLY PURGE/KILL active batch from workspace without exporting?')) {
        localStorage.setItem('ff_qc_review_state', '[]');
        components = [];
        currentIndex = 0;
        renderSlide();
        updateStats();
        alert('Active batch purged from workspace! Ready for next batch inflow.');
      }
    });
  }

  async function loadManifestData() {
    try {
      const res = await fetch('./data/component-manifest.json');
      components = await res.json();
    } catch(e) {
      if (typeof embeddedComponents !== 'undefined' && Array.isArray(embeddedComponents)) {
        components = JSON.parse(JSON.stringify(embeddedComponents));
      } else {
        components = [];
      }
    }
    saveState();
  }

  async function initApp() {
    const saved = localStorage.getItem('ff_qc_review_state');
    if (saved !== null) {
      try {
        components = JSON.parse(saved);
      } catch(e) {
        await loadManifestData();
      }
    } else {
      await loadManifestData();
    }

    if (components === null) {
      components = [];
    }

    setupCanvas();
    bindEvents();
    updateStats();
    renderSlide();
  }

  function getFilteredComponents() {
    if (!components || components.length === 0) return [];
    if (currentFilter === 'all') return components;
    if (currentFilter === 'pending') return components.filter(c => c.status === 'pending');
    if (currentFilter === 'accepted') return components.filter(c => c.status === 'accepted');
    if (currentFilter === 'needs_work') return components.filter(c => c.status === 'needs_work');
    if (currentFilter === 'scrapped') return components.filter(c => c.status === 'scrapped');
    if (currentFilter.startsWith('issue_')) {
      const issueKey = currentFilter.replace('issue_', '');
      return components.filter(c => c.status === 'needs_work' && c.issues && c.issues[issueKey]);
    }
    return components.filter(c => c.status === 'pending');
  }

  function renderSlide() {
    if (!components || components.length === 0) {
      elCompId.textContent = 'NO BATCH';
      elCompName.textContent = 'No Active Batch Loaded';
      elCompCategory.textContent = '-';
      elCompLine.textContent = '-';
      elCompVersion.textContent = '-';

      svgContainer.innerHTML = `
        <div style="color:var(--text-primary); padding:40px; text-align:center;">
          <div style="font-size:56px; margin-bottom:14px;">📥</div>
          <h3 style="color:var(--accent-cyan); font-size:22px; margin-bottom:10px;">Workspace Clear — Ready for Next Batch</h3>
          <p style="color:var(--text-secondary); font-size:13px; max-width:440px; margin:0 auto 20px; line-height:1.5;">
            Paste or drag & drop a new JSON batch file below to review your next set of components!
          </p>
          <div style="display:flex; justify-content:center; gap:12px;">
            <button onclick="document.getElementById('btnPasteInflow').click()" class="btn btn-primary" style="padding:10px 20px; font-size:13px;">📥 Inflow Next Batch (JSON)</button>
            <button onclick="document.getElementById('btnResetCache').click()" class="btn btn-secondary" style="padding:10px 20px; font-size:13px;">🔄 Reload Default Manifest</button>
          </div>
        </div>
      `;

      elCurrentSlideNum.textContent = '0';
      elTotalSlideNum.textContent = '0';
      clearCanvas();
      renderCarousel();
      return;
    }

    const list = getFilteredComponents();
    
    if (list.length === 0) {
      const totalDecided = components.filter(c => c.status !== 'pending').length;
      elCompId.textContent = 'QUEUE EMPTY';
      elCompName.textContent = currentFilter === 'pending' && totalDecided > 0 ? '🎉 All Queue Items Reviewed!' : 'No Components Match Filter';
      elCompCategory.textContent = '-';
      elCompLine.textContent = '-';
      elCompVersion.textContent = '-';

      if (currentFilter === 'pending' && totalDecided > 0) {
        svgContainer.innerHTML = `
          <div style="color:var(--text-primary); padding:40px; text-align:center;">
            <div style="font-size:48px; margin-bottom:12px;">🎉</div>
            <h3 style="color:var(--accent-cyan); margin-bottom:8px;">All Items in Active Batch Reviewed!</h3>
            <p style="color:var(--text-secondary); font-size:13px; max-width:420px; margin:0 auto 16px;">
              Click <strong>"🚢 Ship & Archive Batch [S]"</strong> to export AI repair prompt and clear workspace for your next batch!
            </p>
            <button onclick="window.openShipAllModal()" class="btn btn-ai-prompt" style="padding:10px 20px; font-size:14px;">🚢 Ship & Archive Batch [S]</button>
          </div>
        `;
      } else {
        svgContainer.innerHTML = '<div style="color:var(--text-muted); padding:40px; text-align:center;">No component slides in this view. Change Filter dropdown or Inflow next batch.</div>';
      }

      elCurrentSlideNum.textContent = '0';
      elTotalSlideNum.textContent = '0';
      clearCanvas();
      renderCarousel();
      return;
    }

    if (currentIndex >= list.length) currentIndex = list.length - 1;
    if (currentIndex < 0) currentIndex = 0;
    const comp = list[currentIndex];

    // Meta
    elCompId.textContent = comp.id;
    elCompName.textContent = comp.name;
    elCompCategory.textContent = comp.category || 'General';
    elCompLine.textContent = comp.productLine || 'Fence Frames';
    elCompVersion.textContent = comp.version || 'v2';

    // Specs
    specDimensions.textContent = comp.dimensions || 'N/A';
    specMaterial.textContent = comp.material || 'N/A';
    specColor.textContent = comp.color || 'N/A';
    specTexture.textContent = comp.texture || 'N/A';
    specShell.textContent = comp.shellType || 'N/A';
    specPositioning.textContent = comp.positioning || 'N/A';

    // SVG Render Stage
    if (viewMode === 'v2') {
      svgContainer.innerHTML = comp.v2_preview || '';
    } else if (viewMode === 'v1') {
      svgContainer.innerHTML = comp.v1_preview || '<div style="color:#ef4444; padding:40px;">No v1 preview available</div>';
    } else if (viewMode === 'split') {
      svgContainer.innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; width:100%; height:100%; gap:8px;">
          <div style="height:100%; border-right:1px solid #334155;">${comp.v1_preview || ''}</div>
          <div style="height:100%;">${comp.v2_preview || ''}</div>
        </div>
      `;
    }

    // Update Decision Buttons
    btnAccept.classList.toggle('active', comp.status === 'accepted');
    btnNeedsWork.classList.toggle('active', comp.status === 'needs_work');
    if (btnDisprove) btnDisprove.classList.toggle('active', comp.status === 'scrapped');

    // Update Category Checkboxes
    chkPositioning.checked = !!(comp.issues && comp.issues.positioning);
    chkDimensions.checked = !!(comp.issues && comp.issues.dimensions);
    chkColor.checked = !!(comp.issues && comp.issues.color);
    chkShell.checked = !!(comp.issues && comp.issues.shell_outline);
    chkTexture.checked = !!(comp.issues && comp.issues.texture);
    txtNotes.value = (comp.issues && comp.issues.something_else) ? comp.issues.something_else : '';

    // Slide Counter
    elCurrentSlideNum.textContent = currentIndex + 1;
    elTotalSlideNum.textContent = list.length;

    // Redraw stored canvas drawing if present
    clearCanvas();
    if (comp.markupImage) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0); };
      img.src = comp.markupImage;
    }

    renderCarousel();
  }

  // Canvas Setup & Drawing
  function setupCanvas() {
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
  }

  function startDrawing(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
    canvasUndoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (drawTool === 'brush') {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
    }
  }

  function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (drawTool === 'brush') {
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    } else if (drawTool === 'arrow') {
      if (canvasUndoStack.length > 0) ctx.putImageData(canvasUndoStack[canvasUndoStack.length - 1], 0, 0);
      drawArrow(startX, startY, currentX, currentY);
    } else if (drawTool === 'box') {
      if (canvasUndoStack.length > 0) ctx.putImageData(canvasUndoStack[canvasUndoStack.length - 1], 0, 0);
      ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
    }
  }

  function stopDrawing() {
    if (isDrawing) {
      isDrawing = false;
      saveCanvasToComponent();
    }
  }

  function drawArrow(fromx, fromy, tox, toy) {
    const headlen = 12;
    const dx = tox - fromx;
    const dy = toy - fromy;
    const angle = Math.atan2(dy, dx);

    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvasUndoStack = [];
  }

  function saveCanvasToComponent() {
    const list = getFilteredComponents();
    if (list[currentIndex]) {
      list[currentIndex].markupImage = canvas.toDataURL();
      saveState();
    }
  }

  // Individual Item Decision Handler
  function setDecision(status) {
    const list = getFilteredComponents();
    if (!list[currentIndex]) return;

    const comp = list[currentIndex];

    if (status === 'accepted') {
      comp.status = 'accepted';
      comp.issues = {
        positioning: false,
        dimensions: false,
        color: false,
        shell_outline: false,
        texture: false,
        something_else: comp.issues ? comp.issues.something_else : ""
      };
    } else if (status === 'needs_work') {
      comp.status = 'needs_work';
    } else if (status === 'disprove' || status === 'scrapped') {
      comp.status = 'scrapped';
      comp.issues = {
        positioning: true,
        dimensions: true,
        color: true,
        shell_outline: true,
        texture: true,
        something_else: "TOTAL DISPROVE / SCRAPPED - Complete Component Redo Required"
      };
    }

    saveState();
    updateStats();
    renderSlide();
  }

  function updateCategoryIssue(key, value) {
    const list = getFilteredComponents();
    if (!list[currentIndex]) return;

    const comp = list[currentIndex];
    if (!comp.issues) {
      comp.issues = { positioning: false, dimensions: false, color: false, shell_outline: false, texture: false, something_else: "" };
    }
    comp.issues[key] = value;

    if (comp.issues.positioning || comp.issues.dimensions || comp.issues.color || comp.issues.shell_outline || comp.issues.texture || (comp.issues.something_else && comp.issues.something_else.trim() !== "")) {
      comp.status = 'needs_work';
    }

    saveState();
    updateStats();
    renderSlide();
  }

  function toggleCategoryByKey(key) {
    const list = getFilteredComponents();
    if (!list[currentIndex]) return;
    const comp = list[currentIndex];
    if (!comp.issues) comp.issues = { positioning: false, dimensions: false, color: false, shell_outline: false, texture: false, something_else: "" };
    comp.issues[key] = !comp.issues[key];
    updateCategoryIssue(key, comp.issues[key]);
  }

  function saveState() {
    if (components !== null) {
      localStorage.setItem('ff_qc_review_state', JSON.stringify(components));
    }
  }

  function archiveAndClearBatch() {
    const history = JSON.parse(localStorage.getItem('ff_qc_archived_batches') || '[]');
    history.push({
      shippedAt: new Date().toISOString(),
      items: components
    });
    localStorage.setItem('ff_qc_archived_batches', JSON.stringify(history));
    localStorage.setItem('ff_qc_review_state', '[]');
    components = [];
    currentIndex = 0;
    renderSlide();
    updateStats();
  }

  function updateStats() {
    if (!components) components = [];
    const total = components.length;
    const accepted = components.filter(c => c.status === 'accepted').length;
    const needsWork = components.filter(c => c.status === 'needs_work').length;
    const scrapped = components.filter(c => c.status === 'scrapped').length;
    const pending = total - (accepted + needsWork + scrapped);

    elStatTotal.textContent = total;
    elStatAccepted.textContent = accepted;
    elStatNeedsWork.textContent = needsWork + scrapped;
    elStatPending.textContent = pending;
  }

  function renderCarousel() {
    const list = getFilteredComponents();
    carouselStrip.innerHTML = '';

    if (!list || list.length === 0) return;

    list.forEach((comp, idx) => {
      const card = document.createElement('div');
      card.className = `thumb-card ${idx === currentIndex ? 'active' : ''} ${comp.status}`;
      card.innerHTML = `
        <div class="thumb-title">${comp.name}</div>
        <div class="thumb-meta">
          <span>${comp.id}</span>
          <div class="thumb-status-dot"></div>
        </div>
      `;
      card.addEventListener('click', () => {
        currentIndex = idx;
        renderSlide();
      });
      carouselStrip.appendChild(card);
    });
  }

  // Event Bindings
  function bindEvents() {
    btnPrev.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        renderSlide();
      }
    });

    btnNext.addEventListener('click', () => {
      const list = getFilteredComponents();
      if (currentIndex < list.length - 1) {
        currentIndex++;
        renderSlide();
      }
    });

    btnAccept.addEventListener('click', () => setDecision('accepted'));
    btnNeedsWork.addEventListener('click', () => setDecision('needs_work'));
    if (btnDisprove) btnDisprove.addEventListener('click', () => setDecision('disprove'));

    // Checkboxes
    [chkPositioning, chkDimensions, chkColor, chkShell, chkTexture].forEach(chk => {
      chk.addEventListener('change', (e) => {
        updateCategoryIssue(e.target.dataset.issue, e.target.checked);
      });
    });

    txtNotes.addEventListener('input', (e) => {
      updateCategoryIssue('something_else', e.target.value);
    });

    // Version Tabs
    document.querySelectorAll('.version-tabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.version-tabs .tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        viewMode = e.target.dataset.view;
        renderSlide();
      });
    });

    // Drawing Tools
    document.querySelectorAll('.drawing-toolbar .tool-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.drawing-toolbar .tool-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        drawTool = e.target.dataset.tool;
      });
    });

    document.querySelectorAll('.color-swatch').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        e.target.classList.add('active');
        strokeColor = e.target.dataset.color;
      });
    });

    document.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        strokeWidth = parseInt(e.target.dataset.size, 10);
      });
    });

    btnClearCanvas.addEventListener('click', () => {
      clearCanvas();
      const list = getFilteredComponents();
      if (list[currentIndex]) {
        list[currentIndex].markupImage = null;
        saveState();
      }
    });

    filterSelect.addEventListener('change', (e) => {
      currentFilter = e.target.value;
      currentIndex = 0;
      renderSlide();
    });

    // Keyboard Hotkeys Map
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

      const key = e.key.toLowerCase();

      if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) { currentIndex--; renderSlide(); }
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        const list = getFilteredComponents();
        if (currentIndex < list.length - 1) { currentIndex++; renderSlide(); }
      } else if (key === 'a') {
        setDecision('accepted');
      } else if (key === 'n') {
        setDecision('needs_work');
      } else if (key === 'd' || key === 'x') {
        setDecision('disprove');
      } else if (key === '1') {
        toggleCategoryByKey('positioning');
      } else if (key === '2') {
        toggleCategoryByKey('dimensions');
      } else if (key === '3') {
        toggleCategoryByKey('color');
      } else if (key === '4') {
        toggleCategoryByKey('shell_outline');
      } else if (key === '5') {
        toggleCategoryByKey('texture');
      } else if (key === '6') {
        e.preventDefault();
        txtNotes.focus();
      } else if (key === 'r') {
        if (btnResetCache) btnResetCache.click();
      } else if (key === 'e' || key === 's') {
        if (window.openShipAllModal) window.openShipAllModal();
      } else if (key === 'b') {
        if (btnDisapproveBatch) btnDisapproveBatch.click();
      } else if (key === 'k') {
        if (btnKillBatch) btnKillBatch.click();
      }
    });

    // Export / Import
    if (btnAIFixPrompt) btnAIFixPrompt.addEventListener('click', () => window.openShipAllModal());
    if (btnExportJSON) btnExportJSON.addEventListener('click', exportJSONState);
    if (btnImportJSON) btnImportJSON.addEventListener('click', () => fileInput.click());
    if (fileInput) fileInput.addEventListener('change', importJSONState);
    if (btnCloseModal) btnCloseModal.addEventListener('click', () => exportModal.classList.remove('active'));
    if (btnCopyMarkdown) {
      btnCopyMarkdown.addEventListener('click', () => {
        markdownReportText.select();
        document.execCommand('copy');
        archiveAndClearBatch();
        exportModal.classList.remove('active');
        alert('🚢 Outflow Decision Package copied! Batch archived and workspace cleared for next batch.');
      });
    }
    if (btnDownloadMarkdown) {
      btnDownloadMarkdown.addEventListener('click', () => {
        downloadMarkdownReport();
        archiveAndClearBatch();
        exportModal.classList.remove('active');
        alert('🚢 Outflow Decision Package downloaded! Batch archived and workspace cleared for next batch.');
      });
    }
  }

  // Ship All Decisions Outflow Package Modal
  window.openShipAllModal = function openShipAllModal() {
    if (!components || components.length === 0) return;
    const accepted = components.filter(c => c.status === 'accepted');
    const needsWork = components.filter(c => c.status === 'needs_work');
    const scrapped = components.filter(c => c.status === 'scrapped');
    const pending = components.filter(c => c.status === 'pending');

    let promptText = `# 🚢 Fence Frames Outflow Decision Package\n\n`;
    promptText += `**Audit Timestamp:** ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    promptText += `**Total Scoped:** ${components.length} | **Accepted:** ${accepted.length} | **Needs Work:** ${needsWork.length} | **Scrapped:** ${scrapped.length} | **Pending:** ${pending.length}\n\n`;
    promptText += `---\n\n`;

    if (needsWork.length > 0) {
      promptText += `## 🛠️ 1. Components Needing Specific AI Fixes (${needsWork.length})\n\n`;
      needsWork.forEach((c, i) => {
        promptText += `${i+1}. Component [${c.id}] ${c.name} (${c.productLine} / ${c.category}):\n`;
        if (c.issues && c.issues.positioning) promptText += `   - FIX POSITIONING: Adjust mount alignment, offset, or height placement on fence.\n`;
        if (c.issues && c.issues.dimensions) promptText += `   - FIX DIMENSIONS: Adjust scale, length, height, or wall thickness (Target: ${c.dimensions}).\n`;
        if (c.issues && c.issues.color) promptText += `   - FIX COLOR: Adjust color hue/stain match (Target: ${c.color}).\n`;
        if (c.issues && c.issues.shell_outline) promptText += `   - FIX SHELL / OUTLINE: Adjust profile geometry, bevel, or frame border.\n`;
        if (c.issues && c.issues.texture) promptText += `   - FIX TEXTURE: Adjust wood grain pattern or surface bump (Target: ${c.texture}).\n`;
        if (c.issues && c.issues.something_else) promptText += `   - SPECIFIC INSTRUCTIONS: ${c.issues.something_else}\n`;
        promptText += `\n`;
      });
    }

    if (scrapped.length > 0) {
      promptText += `## ❌ 2. Scrapped / Total Disproved Components (${scrapped.length})\n\n`;
      scrapped.forEach((c, i) => {
        promptText += `${i+1}. Component [${c.id}] ${c.name} (${c.productLine} / ${c.category}): SCRAPPED - Do not attempt edit; requires complete clean-slate re-architecture.\n`;
      });
      promptText += `\n`;
    }

    if (accepted.length > 0) {
      promptText += `## ✅ 3. 100% Accepted Components (${accepted.length})\n\n`;
      accepted.forEach((c, i) => {
        promptText += `${i+1}. Component [${c.id}] ${c.name} — APPROVED FOR PRODUCTION\n`;
      });
      promptText += `\n`;
    }

    promptText += `Please process this outflow decision package, generate v3 fixes for the Needs Work items, and archive the Accepted & Scrapped items.`;

    document.getElementById('modalTitle').textContent = '🚢 Ship & Archive Batch Outflow Package';
    document.getElementById('modalDesc').textContent = 'Copy prompt or download report to archive this batch and clear workspace for next inflow batch:';
    markdownReportText.value = promptText;
    exportModal.classList.add('active');
  }

  function exportJSONState() {
    if (!components || components.length === 0) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(components, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `fence-frames-qc-state-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  function importJSONState(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target.result);
        ingestInflowBatch(imported);
      } catch(err) {
        alert('Error parsing JSON file. Please ensure it is a valid component array.');
      }
    };
    reader.readAsText(file);
  }

  function downloadMarkdownReport() {
    const blob = new Blob([markdownReportText.value], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ship-all-outflow-package.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  initApp();
});
