/**
 * ┌─────────────────────────────────────────────────────────────────┐
 * │  FENCE FRAMES — SITE BUILDER SERVER                             │
 * │  Port: 3031   |   Zero npm dependencies (Node built-ins only)   │
 * │                                                                 │
 * │  Start: node site-builder-server.js                             │
 * │  Dashboard: http://localhost:3031                               │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * ENDPOINTS:
 *   GET  /                     → HTML dashboard (live page registry + inbox)
 *   GET  /api/registry         → Full site-registry.json
 *   GET  /api/inbox            → founder-feedback-inbox.json
 *   POST /api/dispatch         → Submit edit request (writes to inbox)
 *   POST /api/dispatch-feedback → Submit edit request alias
 *   GET  /api/export/:pageId   → Generate AI-readable edit export for a page
 *   POST /api/export/bulk      → Body: { pageIds: [...] } → bulk export
 *   GET  /api/status           → Server health check
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────────────────────────────────
const PORT          = 3031;
const ROOT          = __dirname;
const REGISTRY_FILE = path.join(ROOT, 'site-registry.json');
const INBOX_FILE    = path.join(ROOT, 'founder-feedback-inbox.json');
const EXPORTS_DIR   = path.join(ROOT, '_exports');

// Ensure _exports directory exists
if (!fs.existsSync(EXPORTS_DIR)) fs.mkdirSync(EXPORTS_DIR, { recursive: true });

// ─── Helpers ─────────────────────────────────────────────────────────────────
function readJSON(filePath) {
  try { return JSON.parse(fs.readFileSync(filePath, 'utf8')); }
  catch (e) { return null; }
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function send(res, status, contentType, body) {
  const buf = typeof body === 'string' ? Buffer.from(body, 'utf8') : body;
  res.writeHead(status, {
    'Content-Type': contentType,
    'Content-Length': buf.length,
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-cache'
  });
  res.end(buf);
}

function sendJSON(res, status, obj) {
  send(res, status, 'application/json; charset=utf-8', JSON.stringify(obj, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(body ? JSON.parse(body) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

// ─── Export Generator ────────────────────────────────────────────────────────
function generateExport(page, inboxEntries) {
  const now      = new Date().toISOString();
  const dateTag  = now.slice(0, 10).replace(/-/g, '');
  const exportId = `EXP-${dateTag}-${page.pageId}`;

  const renderNote = page.renderType === 'STATIC'
    ? `RENDER_TYPE is STATIC — edit the HTML file directly at the path above.`
    : page.renderType === 'REACT'
    ? `RENDER_TYPE is REACT — edit the .tsx component, then run: next build`
    : `RENDER_TYPE is REACT-PLANNED — currently static HTML. Edit the HTML file.
   NOTE: This page is earmarked for React conversion. Avoid deep HTML hacks.`;

  const matching = (inboxEntries || []).filter(e => e.pageId === page.pageId);

  let pendingEditsBlock = '';
  if (matching.length === 0) {
    pendingEditsBlock = '  (no pending inbox edits for this page)\n';
  } else {
    matching.forEach(entry => {
      pendingEditsBlock += `\n  [${entry.received_at || entry.timestamp || 'unknown time'}]\n`;
      if (entry.pageWide) pendingEditsBlock += `  PAGE-WIDE: "${entry.pageWide}"\n`;
      if (entry.sections) {
        Object.entries(entry.sections).forEach(([secId, note]) => {
          pendingEditsBlock += `  ${secId.padEnd(20)} "${note}"\n`;
        });
      }
    });
  }

  let sectionMapBlock = '';
  if (page.sections) {
    Object.entries(page.sections).forEach(([secId, label]) => {
      sectionMapBlock += `  ${secId.padEnd(20)} ${label}\n`;
    });
  } else {
    sectionMapBlock = '  (no section map defined — add sections to site-registry.json)\n';
  }

  const divider = '━'.repeat(60);
  const thin    = '─'.repeat(60);

  const exportText = `${divider}
FENCE FRAMES — SITE BUILDER EDIT EXPORT
${divider}
EXPORT_ID:       ${exportId}
GENERATED:       ${now}
PAGE:            ${page.pageTitle}
PAGE_ID:         ${page.pageId}
TIER:            ${page.tier}
ROUTE:           ${page.route}
SRC_FILE:        ${page.srcFile}
RENDER_TYPE:     ${page.renderType}
STATUS:          ${page.status}

URLS:
  STAGING:       ${page.stagingUrl || 'http://localhost:8080' + page.route}
  PRE-FLIGHT:    ${page.preflightUrl || 'http://localhost:8080/founder-preflight-studio.html?page=' + page.pageId}
  DEPLOYMENT:    ${page.deploymentUrl || 'https://www.fenceframes.com' + page.route}

DESCRIPTION:
  ${page.description || '(none)'}

${thin}
PENDING EDITS FROM INBOX:
${thin}
${pendingEditsBlock}
${thin}
RENDER INSTRUCTIONS:
${thin}
  ${renderNote}

${thin}
SECTION MAP:
${thin}
${sectionMapBlock}
${divider}
`;

  const fileName = `${exportId}.md`;
  const filePath = path.join(EXPORTS_DIR, fileName);
  fs.writeFileSync(filePath, exportText, 'utf8');

  return { exportId, fileName, filePath, exportText };
}

// ─── Dashboard HTML ───────────────────────────────────────────────────────────
function buildDashboard() {
  const registry = readJSON(REGISTRY_FILE) || { pages: [] };
  const inbox    = readJSON(INBOX_FILE) || [];

  const renderBadge = (type) => {
    if (type === 'STATIC')        return `<span class="badge badge-static">STATIC</span>`;
    if (type === 'REACT')         return `<span class="badge badge-react">REACT</span>`;
    if (type === 'REACT-PLANNED') return `<span class="badge badge-planned">REACT-PLANNED</span>`;
    return `<span class="badge">${type}</span>`;
  };

  const tierBadge = (tier) => {
    if (tier === 'Tier-1') return `<span class="badge tier-1">Tier 1 Public</span>`;
    if (tier === 'Tier-2') return `<span class="badge tier-2">Tier 2 Engine</span>`;
    if (tier === 'Tier-3') return `<span class="badge tier-3">Tier 3 HOA</span>`;
    return `<span class="badge">${tier}</span>`;
  };

  const statusBadge = (s) => {
    const cls = s === 'live' ? 'status-live' : s === 'draft' ? 'status-draft' : 'status-wip';
    return `<span class="status ${cls}">${s}</span>`;
  };

  const pageRows = registry.pages.map(p => {
    const inboxCount = inbox.filter(e => e.pageId === p.pageId).length;
    const inboxBadge = inboxCount > 0
      ? `<span class="inbox-count">${inboxCount} pending</span>` : '';
    
    const stagingUrl = p.stagingUrl || `http://localhost:8080${p.route}`;
    const preflightUrl = p.preflightUrl || `http://localhost:8080/founder-preflight-studio.html?page=${p.pageId}`;
    const deployUrl = p.deploymentUrl || `https://www.fenceframes.com${p.route}`;

    return `
      <tr data-tier="${p.tier}">
        <td class="page-id">${p.pageId}</td>
        <td>
          <div class="page-title">${p.pageTitle}</div>
          <div class="small">${p.description || ''}</div>
        </td>
        <td>${tierBadge(p.tier)}</td>
        <td class="mono">${p.route}</td>
        <td>${renderBadge(p.renderType)}</td>
        <td>${statusBadge(p.status)}</td>
        <td class="action-links">
          <a class="btn-link btn-staging" href="${stagingUrl}" target="_blank" title="View Current State in Local Staging">👁️ Staging</a>
          <a class="btn-link btn-preflight" href="${preflightUrl}" target="_blank" title="Open in Founder Pre-Flight Studio Editor">🛠️ Pre-Flight</a>
          <a class="btn-link btn-deploy" href="${deployUrl}" target="_blank" title="Open Final Production Deployment URL">🌐 Live Site</a>
        </td>
        <td>
          ${inboxBadge}
          <a class="btn-export" href="/api/export/${p.pageId}" target="_blank">Export AI Edit</a>
        </td>
      </tr>`;
  }).join('');

  const inboxRows = inbox.length === 0
    ? `<tr><td colspan="5" style="color:#666;font-style:italic">Inbox is empty</td></tr>`
    : inbox.map((e) => `
      <tr>
        <td class="page-id">${e.pageId || '—'}</td>
        <td>${e.pageTitle || '—'}</td>
        <td class="mono small">${e.received_at || e.timestamp || '—'}</td>
        <td class="mono small">${e.pageWide || '—'}</td>
        <td>
          ${e.pageId ? `<a class="btn-export" href="/api/export/${e.pageId}" target="_blank">Export AI Edit</a>` : ''}
        </td>
      </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fence Frames — Master Site Builder Dashboard</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&family=Fira+Mono:wght@400;500&display=swap');
  :root {
    --ink: #080D0A;
    --gold: #E5B842;
    --ember: #F27A22;
    --green: #4ADE80;
    --ivory: #FAF6EE;
    --dim: #101712;
    --muted: #888;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--ink); color: var(--ivory); font-family: 'Rowdies', sans-serif; font-weight: 300; padding: 0; }
  header {
    background: var(--dim); border-bottom: 2px solid var(--gold);
    padding: 18px 32px; display: flex; align-items: center; gap: 16px;
  }
  header h1 { font-size: 1.4rem; font-weight: 700; color: var(--gold); letter-spacing: 0.03em; }
  header .sub { font-size: 0.8rem; color: var(--muted); font-weight: 300; margin-top: 2px; }
  .port-badge {
    margin-left: auto; background: var(--green); color: var(--ink);
    font-weight: 700; font-size: 0.75rem; padding: 4px 10px; border-radius: 4px;
    border: 2px solid var(--ink);
  }
  main { padding: 28px 32px; }
  h2 { font-size: 1.1rem; font-weight: 700; color: var(--gold); text-transform: uppercase;
       letter-spacing: 0.08em; margin-bottom: 14px; border-bottom: 1px solid #26332A; padding-bottom: 8px; display: flex; align-items: center; justify-content: space-between; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 36px; }
  th { font-size: 0.7rem; font-weight: 400; color: var(--muted); text-transform: uppercase;
       letter-spacing: 0.1em; padding: 10px 10px; text-align: left; border-bottom: 1px solid #26332A; }
  td { padding: 12px 10px; border-bottom: 1px solid #162019; font-size: 0.85rem; vertical-align: middle; }
  tr:hover td { background: #121A14; }
  .mono { font-family: 'Fira Mono', monospace; font-size: 0.78rem; }
  .small { font-size: 0.7rem; color: var(--muted); margin-top: 2px; }
  .page-id { font-family: 'Fira Mono', monospace; font-size: 0.75rem; color: var(--gold); font-weight: 500; }
  .page-title { font-weight: 700; color: #fff; }
  .badge { display: inline-block; padding: 3px 8px; border-radius: 3px; font-size: 0.68rem;
           font-weight: 400; letter-spacing: 0.05em; border: 1px solid currentColor; }
  .badge-static  { color: #aaa; border-color: #555; }
  .badge-react   { color: #60a5fa; border-color: #3b82f6; }
  .badge-planned { color: var(--gold); border-color: var(--gold); }
  .tier-1 { background: rgba(74,222,128,0.12); color: var(--green); border-color: var(--green); }
  .tier-2 { background: rgba(96,165,250,0.12); color: #60a5fa; border-color: #3b82f6; }
  .tier-3 { background: rgba(229,184,66,0.12); color: var(--gold); border-color: var(--gold); }
  .status { font-size: 0.68rem; padding: 2px 8px; border-radius: 3px; font-weight: 400; }
  .status-live  { background: rgba(74,222,128,0.15); color: var(--green); }
  .status-draft { background: rgba(245,158,11,0.1); color: #f59e0b; }
  .status-wip   { background: rgba(239,68,68,0.1);  color: #ef4444; }
  .inbox-count { background: rgba(242,122,34,0.2); color: var(--ember);
                 font-size: 0.7rem; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--ember); margin-right: 6px; }
  .action-links { display: flex; gap: 6px; flex-wrap: wrap; }
  .btn-link {
    display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px;
    border-radius: 4px; font-size: 0.7rem; font-weight: 400; text-decoration: none;
    transition: transform 0.1s, background 0.15s; border: 1px solid transparent;
  }
  .btn-link:hover { transform: translateY(-1px); }
  .btn-staging  { background: #18281E; color: var(--green); border-color: rgba(74,222,128,0.4); }
  .btn-preflight{ background: #262215; color: var(--gold); border-color: rgba(229,184,66,0.5); }
  .btn-deploy   { background: #1B2332; color: #60a5fa; border-color: rgba(96,165,250,0.5); }
  .btn-export {
    display: inline-block; padding: 4px 10px; background: transparent;
    border: 1.5px solid var(--green); color: var(--green); border-radius: 3px;
    font-family: 'Rowdies', sans-serif; font-size: 0.7rem; font-weight: 400;
    cursor: pointer; text-decoration: none; transition: background 0.15s;
  }
  .btn-export:hover { background: rgba(74,222,128,0.15); }
  .filter-bar { display: flex; gap: 8px; margin-bottom: 16px; }
  .filter-btn {
    background: #141C16; color: var(--muted); border: 1px solid #26332A;
    padding: 6px 14px; border-radius: 4px; font-family: 'Rowdies', sans-serif;
    font-size: 0.75rem; cursor: pointer; transition: all 0.15s;
  }
  .filter-btn.active, .filter-btn:hover { background: var(--gold); color: var(--ink); border-color: var(--gold); font-weight: 700; }
  .endpoints { background: var(--dim); border: 1px solid #26332A; border-radius: 6px;
               padding: 16px 20px; margin-bottom: 32px; font-family: 'Fira Mono', monospace; font-size: 0.78rem; }
  .endpoints h3 { font-family: 'Rowdies', sans-serif; font-size: 0.85rem; font-weight: 700;
                  color: var(--gold); margin-bottom: 12px; letter-spacing: 0.05em; }
  .ep-row { display: flex; gap: 16px; padding: 4px 0; border-bottom: 1px solid #1a241c; }
  .ep-row:last-child { border-bottom: none; }
  .ep-method { color: var(--green); min-width: 45px; font-weight: 700; }
  .ep-path { color: var(--ivory); }
  .ep-desc { color: var(--muted); margin-left: auto; font-size: 0.72rem; }
</style>
<script>
  function filterTier(tier) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');

    const rows = document.querySelectorAll('tbody tr[data-tier]');
    rows.forEach(r => {
      if (tier === 'ALL' || r.getAttribute('data-tier') === tier) {
        r.style.display = '';
      } else {
        r.style.display = 'none';
      }
    });
  }
</script>
</head>
<body>
<header>
  <div>
    <h1>⬡ Fence Frames — Site Builder Dashboard</h1>
    <div class="sub">Master Registry & Dispatch Control Hub &nbsp;·&nbsp; Tiers 1, 2, & 3</div>
  </div>
  <div class="port-badge">:3031</div>
</header>
<main>

  <div class="endpoints">
    <h3>SERVER API ENDPOINTS</h3>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/registry</span><span class="ep-desc">Master site-registry.json</span></div>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/inbox</span><span class="ep-desc">Feedback & Edit Inbox</span></div>
    <div class="ep-row"><span class="ep-method">POST</span><span class="ep-path">/api/dispatch</span><span class="ep-desc">Submit edit request to inbox</span></div>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/export/:pageId</span><span class="ep-desc">Generate AI edit export file (_exports/EXP-*.md)</span></div>
  </div>

  <h2>
    <span>Page Registry (${registry.pages.length} Total Pages)</span>
    <div class="filter-bar">
      <button class="filter-btn active" onclick="filterTier('ALL')">ALL (${registry.pages.length})</button>
      <button class="filter-btn" onclick="filterTier('Tier-1')">Tier 1 Public</button>
      <button class="filter-btn" onclick="filterTier('Tier-2')">Tier 2 Engine</button>
      <button class="filter-btn" onclick="filterTier('Tier-3')">Tier 3 HOA</button>
    </div>
  </h2>

  <table>
    <thead>
      <tr>
        <th>Page ID</th><th>Title & Description</th><th>Tier</th><th>Route</th>
        <th>Type</th><th>Status</th><th>Direct Action Links</th><th>Export</th>
      </tr>
    </thead>
    <tbody>${pageRows}</tbody>
  </table>

  <h2>Edit Inbox (${inbox.length} Items)</h2>
  <table>
    <thead>
      <tr><th>Page ID</th><th>Title</th><th>Received</th><th>Note</th><th>Export</th></tr>
    </thead>
    <tbody>${inboxRows}</tbody>
  </table>

</main>
</body>
</html>`;
}

// ─── Router ───────────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const url      = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = decodeURIComponent(url.pathname);
  const method   = req.method;

  // CORS preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' });
    res.end(); return;
  }

  // ── GET / → Dashboard
  if (method === 'GET' && pathname === '/') {
    return send(res, 200, 'text/html; charset=utf-8', buildDashboard());
  }

  // ── GET /api/status
  if (method === 'GET' && pathname === '/api/status') {
    return sendJSON(res, 200, { ok: true, server: 'site-builder', port: PORT, time: new Date().toISOString() });
  }

  // ── GET /api/registry
  if (method === 'GET' && pathname === '/api/registry') {
    const registry = readJSON(REGISTRY_FILE);
    if (!registry) return sendJSON(res, 500, { error: 'site-registry.json not found' });
    return sendJSON(res, 200, registry);
  }

  // ── GET /api/inbox
  if (method === 'GET' && pathname === '/api/inbox') {
    const inbox = readJSON(INBOX_FILE) || [];
    return sendJSON(res, 200, inbox);
  }

  // ── POST /api/dispatch & /api/dispatch-feedback
  if (method === 'POST' && (pathname === '/api/dispatch' || pathname === '/api/dispatch-feedback')) {
    try {
      const data = await parseBody(req);
      data.received_at = new Date().toISOString();
      const inbox = readJSON(INBOX_FILE) || [];
      inbox.push(data);
      writeJSON(INBOX_FILE, inbox);
      console.log(`[DISPATCH] #${data.pageId} → "${data.pageTitle}"`);
      return sendJSON(res, 200, { success: true, count: inbox.length, entry: data });
    } catch (e) {
      return sendJSON(res, 400, { error: e.message });
    }
  }

  // ── POST /api/export/bulk
  if (method === 'POST' && pathname === '/api/export/bulk') {
    try {
      const body     = await parseBody(req);
      const pageIds  = Array.isArray(body.pageIds) ? body.pageIds : [];
      const registry = readJSON(REGISTRY_FILE) || { pages: [] };
      const inbox    = readJSON(INBOX_FILE) || [];
      const results  = [];

      for (const pid of pageIds) {
        const page = registry.pages.find(p => p.pageId === pid);
        if (!page) { results.push({ pageId: pid, error: 'not found in registry' }); continue; }
        const exp = generateExport(page, inbox);
        results.push({ pageId: pid, exportId: exp.exportId, file: exp.fileName });
        console.log(`[EXPORT] Bulk: ${exp.exportId} → ${exp.fileName}`);
      }
      return sendJSON(res, 200, { success: true, exports: results });
    } catch (e) {
      return sendJSON(res, 400, { error: e.message });
    }
  }

  // ── GET /api/export/:pageId
  const exportMatch = pathname.match(/^\/api\/export\/([A-Z0-9\-]+)$/);
  if (method === 'GET' && exportMatch) {
    const pageId   = exportMatch[1];
    const registry = readJSON(REGISTRY_FILE) || { pages: [] };
    const inbox    = readJSON(INBOX_FILE) || [];
    const page     = registry.pages.find(p => p.pageId === pageId);

    if (!page) return sendJSON(res, 404, { error: `Page "${pageId}" not found in site-registry.json` });

    const exp = generateExport(page, inbox);
    console.log(`[EXPORT] ${exp.exportId} → _exports/${exp.fileName}`);

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${exp.fileName}"`,
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(exp.exportText);
  }

  sendJSON(res, 404, { error: `Route not found: ${method} ${pathname}` });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('┌──────────────────────────────────────────────────┐');
  console.log('│  FENCE FRAMES — SITE BUILDER SERVER               │');
  console.log(`│  http://localhost:${PORT}  (all interfaces)        │`);
  console.log('│                                                    │');
  console.log('│  Dashboard:   http://localhost:3031/               │');
  console.log('│  Registry:    http://localhost:3031/api/registry   │');
  console.log('│  Inbox:       http://localhost:3031/api/inbox      │');
  console.log('│  Export page: http://localhost:3031/api/export/:id │');
  console.log('└──────────────────────────────────────────────────┘');
  console.log('');
});

server.on('error', err => {
  if (err.code === 'EADDRINUSE') {
    console.error(`[ERROR] Port ${PORT} is already in use.`);
  } else {
    console.error('[ERROR]', err.message);
  }
  process.exit(1);
});
