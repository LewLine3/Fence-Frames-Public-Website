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

function sendText(res, status, text) {
  send(res, status, 'text/plain; charset=utf-8', text);
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
  const now    = new Date().toISOString();
  const dateTag = now.slice(0, 10).replace(/-/g, '');
  const exportId = `EXP-${dateTag}-${page.pageId}`;

  const renderNote = page.renderType === 'STATIC'
    ? `RENDER_TYPE is STATIC — edit the HTML file directly at the path above.`
    : page.renderType === 'REACT'
    ? `RENDER_TYPE is REACT — edit the .tsx component, then run: next build`
    : `RENDER_TYPE is REACT-PLANNED — currently static HTML. Edit the HTML file.
   NOTE: This page is earmarked for React conversion. Avoid deep HTML hacks.`;

  // Filter inbox entries matching this pageId
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
EXPORT_ID:    ${exportId}
GENERATED:    ${now}
TARGET_CHAT:  Site Builder Tier 1 (fa728b70-d21b-44f4-9d79-24bde129de05)

PAGE:         ${page.pageTitle}
PAGE_ID:      ${page.pageId}
TIER:         ${page.tier}
ROUTE:        ${page.route}
SRC_FILE:     ${page.srcFile}
RENDER_TYPE:  ${page.renderType}
STATUS:       ${page.status}

FULL_PATH:
  D:\\Lew-Line-Workspaces\\Fence-Frames-Public-Website\\${page.srcFile.replace(/\//g, '\\\\')}

DESCRIPTION:
  ${page.description || '(none)'}

${thin}
PENDING EDITS FROM INBOX:
${thin}
${pendingEditsBlock}
${thin}
RENDER INSTRUCTIONS FOR CURSOR:
${thin}
  ${renderNote}

${thin}
SECTION MAP:
${thin}
${sectionMapBlock}
${thin}
HOW TO USE THIS EXPORT IN CURSOR:
${thin}
  1. Open Cursor and attach this file (or paste its contents into the chat).
  2. Tell Cursor: "Apply the pending edits above to the SRC_FILE."
  3. If RENDER_TYPE is REACT or REACT-PLANNED, note the component boundary.
  4. After edits, run verification (build check / browser test).
  5. Mark inbox entries as resolved by clearing founder-feedback-inbox.json
     or calling POST /api/inbox/clear on the site-builder-server.
${divider}
`;

  // Save to disk
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
    if (type === 'STATIC')         return `<span class="badge badge-static">STATIC</span>`;
    if (type === 'REACT')          return `<span class="badge badge-react">REACT</span>`;
    if (type === 'REACT-PLANNED')  return `<span class="badge badge-planned">REACT-PLANNED</span>`;
    return `<span class="badge">${type}</span>`;
  };

  const statusBadge = (s) => {
    const cls = s === 'live' ? 'status-live' : s === 'draft' ? 'status-draft' : 'status-wip';
    return `<span class="status ${cls}">${s}</span>`;
  };

  const pageRows = registry.pages.map(p => {
    const inboxCount = inbox.filter(e => e.pageId === p.pageId).length;
    const inboxBadge = inboxCount > 0
      ? `<span class="inbox-count">${inboxCount} pending</span>` : '';
    return `
      <tr>
        <td class="page-id">${p.pageId}</td>
        <td>${p.pageTitle}</td>
        <td class="mono">${p.route}</td>
        <td>${renderBadge(p.renderType)}</td>
        <td>${statusBadge(p.status)}</td>
        <td class="mono small">${p.srcFile}</td>
        <td>${inboxBadge}</td>
        <td>
          <a class="btn-export" href="/api/export/${p.pageId}" target="_blank">Export</a>
        </td>
      </tr>`;
  }).join('');

  const inboxRows = inbox.length === 0
    ? `<tr><td colspan="5" style="color:#666;font-style:italic">Inbox is empty</td></tr>`
    : inbox.map((e, i) => `
      <tr>
        <td class="page-id">${e.pageId || '—'}</td>
        <td>${e.pageTitle || '—'}</td>
        <td class="mono small">${e.received_at || e.timestamp || '—'}</td>
        <td class="mono small">${e.pageWide || '—'}</td>
        <td>
          ${e.pageId ? `<a class="btn-export" href="/api/export/${e.pageId}" target="_blank">Export</a>` : ''}
        </td>
      </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Fence Frames — Site Builder Dashboard</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Rowdies:wght@300;400;700&family=Fira+Mono:wght@400;500&display=swap');
  :root {
    --ink: #0D0D0D;
    --gold: #E5B842;
    --ember: #F27A22;
    --green: #4ADE80;
    --ivory: #FAF6EE;
    --dim: #1a1a1a;
    --muted: #555;
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
  h2 { font-size: 1rem; font-weight: 400; color: var(--gold); text-transform: uppercase;
       letter-spacing: 0.08em; margin-bottom: 14px; border-bottom: 1px solid #333; padding-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 36px; }
  th { font-size: 0.7rem; font-weight: 400; color: var(--muted); text-transform: uppercase;
       letter-spacing: 0.1em; padding: 8px 10px; text-align: left; border-bottom: 1px solid #2a2a2a; }
  td { padding: 10px 10px; border-bottom: 1px solid #1e1e1e; font-size: 0.85rem; vertical-align: middle; }
  tr:hover td { background: #161616; }
  .mono { font-family: 'Fira Mono', monospace; font-size: 0.78rem; }
  .small { font-size: 0.7rem; color: var(--muted); }
  .page-id { font-family: 'Fira Mono', monospace; font-size: 0.72rem; color: var(--gold); font-weight: 500; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 3px; font-size: 0.68rem;
           font-weight: 400; letter-spacing: 0.05em; border: 1px solid currentColor; }
  .badge-static  { color: #aaa; border-color: #555; }
  .badge-react   { color: #60a5fa; border-color: #3b82f6; }
  .badge-planned { color: var(--gold); border-color: var(--gold); }
  .status { font-size: 0.68rem; padding: 2px 8px; border-radius: 3px; }
  .status-live  { background: rgba(74,222,128,0.15); color: var(--green); }
  .status-draft { background: rgba(245,158,11,0.1); color: #f59e0b; }
  .status-wip   { background: rgba(239,68,68,0.1);  color: #ef4444; }
  .inbox-count { background: rgba(242,122,34,0.2); color: var(--ember);
                 font-size: 0.7rem; padding: 2px 8px; border-radius: 3px; border: 1px solid var(--ember); }
  .btn-export {
    display: inline-block; padding: 4px 12px; background: transparent;
    border: 1.5px solid var(--green); color: var(--green); border-radius: 3px;
    font-family: 'Rowdies', sans-serif; font-size: 0.72rem; font-weight: 400;
    cursor: pointer; text-decoration: none; transition: background 0.15s;
  }
  .btn-export:hover { background: rgba(74,222,128,0.12); }
  .legend { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--muted); }
  .endpoints { background: var(--dim); border: 1px solid #2a2a2a; border-radius: 6px;
               padding: 16px 20px; margin-bottom: 32px; font-family: 'Fira Mono', monospace; font-size: 0.78rem; }
  .endpoints h3 { font-family: 'Rowdies', sans-serif; font-size: 0.8rem; font-weight: 400;
                  color: var(--gold); margin-bottom: 12px; letter-spacing: 0.05em; }
  .ep-row { display: flex; gap: 16px; padding: 4px 0; border-bottom: 1px solid #1e1e1e; }
  .ep-row:last-child { border-bottom: none; }
  .ep-method { color: var(--green); min-width: 40px; }
  .ep-path { color: var(--ivory); }
  .ep-desc { color: var(--muted); margin-left: auto; font-size: 0.72rem; }
</style>
</head>
<body>
<header>
  <div>
    <h1>⬡ Fence Frames — Site Builder</h1>
    <div class="sub">Edit dispatch hub &nbsp;·&nbsp; Tier-1 Public Site</div>
  </div>
  <div class="port-badge">:3031</div>
</header>
<main>

  <div class="endpoints">
    <h3>API ENDPOINTS</h3>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/registry</span><span class="ep-desc">Full site-registry.json</span></div>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/inbox</span><span class="ep-desc">Feedback inbox</span></div>
    <div class="ep-row"><span class="ep-method">POST</span><span class="ep-path">/api/dispatch</span><span class="ep-desc">Submit an edit request</span></div>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/export/:pageId</span><span class="ep-desc">Generate AI export file (saves to _exports/)</span></div>
    <div class="ep-row"><span class="ep-method">POST</span><span class="ep-path">/api/export/bulk</span><span class="ep-desc">Body: { pageIds: [...] } — bulk export</span></div>
    <div class="ep-row"><span class="ep-method">GET</span><span class="ep-path">/api/status</span><span class="ep-desc">Health check</span></div>
  </div>

  <div class="legend">
    <div class="legend-item"><span class="badge badge-static">STATIC</span> Plain HTML — edit file directly</div>
    <div class="legend-item"><span class="badge badge-react">REACT</span> Next.js component — next build required</div>
    <div class="legend-item"><span class="badge badge-planned">REACT-PLANNED</span> Static now, React later — avoid deep HTML hacks</div>
  </div>

  <h2>Page Registry</h2>
  <table>
    <thead>
      <tr>
        <th>Page ID</th><th>Title</th><th>Route</th><th>Render Type</th>
        <th>Status</th><th>Src File</th><th>Inbox</th><th>Export</th>
      </tr>
    </thead>
    <tbody>${pageRows}</tbody>
  </table>

  <h2>Edit Inbox</h2>
  <table>
    <thead>
      <tr><th>Page ID</th><th>Title</th><th>Received</th><th>Page-Wide Note</th><th>Export</th></tr>
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

  // ── GET /api/export/:pageId  (must come after /api/export/bulk check)
  const exportMatch = pathname.match(/^\/api\/export\/([A-Z0-9\-]+)$/);
  if (method === 'GET' && exportMatch) {
    const pageId   = exportMatch[1];
    const registry = readJSON(REGISTRY_FILE) || { pages: [] };
    const inbox    = readJSON(INBOX_FILE) || [];
    const page     = registry.pages.find(p => p.pageId === pageId);

    if (!page) return sendJSON(res, 404, { error: `Page "${pageId}" not found in site-registry.json` });

    const exp = generateExport(page, inbox);
    console.log(`[EXPORT] ${exp.exportId} → _exports/${exp.fileName}`);

    // Return as plain text AND save to disk
    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Disposition': `attachment; filename="${exp.fileName}"`,
      'Access-Control-Allow-Origin': '*'
    });
    return res.end(exp.exportText);
  }

  // ── 404
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
    console.error(`[ERROR] Port ${PORT} is already in use. Kill the other process or change PORT.`);
  } else {
    console.error('[ERROR]', err.message);
  }
  process.exit(1);
});
