/**
 * Heritage VPF — Component Catalog (sym atom inventory).
 * Loads component-catalog-data.json and renders browsable part cards.
 */
(function initComponentCatalog(global) {
  const DATA_URL = 'component-catalog-data.json';
  const COMP_BASE = '../../../../components/';

  let catalog = { components: [], categories: [], meta: {} };
  let filters = { category: 'all', tier: 'all', ready: 'all', q: '' };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function badgeClass(c) {
    if (c.v1Ready && c.wiredInPilot) return 'badge--live';
    if (c.v1Ready) return 'badge--art';
    return 'badge--pending';
  }

  function badgeLabel(c) {
    if (c.v1Ready && c.wiredInPilot) return 'V1 · Live';
    if (c.v1Ready) return 'V1 · Art only';
    return 'Backlog';
  }

  function filteredComponents() {
    return catalog.components.filter((c) => {
      if (filters.category !== 'all' && c.category !== filters.category) return false;
      if (filters.tier !== 'all' && c.tier !== filters.tier) return false;
      if (filters.ready === 'live' && !(c.v1Ready && c.wiredInPilot)) return false;
      if (filters.ready === 'art' && !c.v1Ready) return false;
      if (filters.ready === 'backlog' && c.v1Ready) return false;
      if (filters.q) {
        const hay = `${c.id} ${c.label} ${c.category} ${c.notes || ''}`.toLowerCase();
        if (!hay.includes(filters.q.toLowerCase())) return false;
      }
      return true;
    });
  }

  function renderStats(list) {
    const el = document.getElementById('cc-stats');
    if (!el) return;
    const live = catalog.components.filter((c) => c.v1Ready && c.wiredInPilot).length;
    const art = catalog.components.filter((c) => c.v1Ready).length;
    el.textContent = `${list.length} shown · ${live} live in pilot · ${art} V1 art ready · ${catalog.components.length} total`;
  }

  function renderGrid() {
    const grid = document.getElementById('cc-grid');
    const list = filteredComponents();
    renderStats(list);
    if (!grid) return;
    if (!list.length) {
      grid.innerHTML = '<p class="cc-empty">No components match the current filters.</p>';
      return;
    }
    grid.innerHTML = list
      .map((c) => {
        const src = `${COMP_BASE}${c.path}`;
        return `
      <article class="cc-card" data-id="${escapeHtml(c.id)}">
        <div class="cc-card__media">
          <img class="cc-card__svg" src="${escapeHtml(src)}" alt="${escapeHtml(c.label)}" loading="lazy" />
        </div>
        <header class="cc-card__head">
          <h2 class="cc-card__title">${escapeHtml(c.label)}</h2>
          <span class="cc-badge ${badgeClass(c)}">${badgeLabel(c)}</span>
        </header>
        <div class="cc-card__body">
          <p class="cc-card__id"><code>${escapeHtml(c.id)}</code></p>
          <p class="cc-card__meta">${escapeHtml(c.category)} · ${escapeHtml(c.tier)}</p>
          ${c.notes ? `<p class="cc-card__note">${escapeHtml(c.notes)}</p>` : ''}
        </div>
      </article>`;
      })
      .join('');
  }

  function wireFilters() {
    const cat = document.getElementById('cc-filter-category');
    const tier = document.getElementById('cc-filter-tier');
    const ready = document.getElementById('cc-filter-ready');
    const search = document.getElementById('cc-search');

    if (cat) {
      cat.innerHTML =
        '<option value="all">All categories</option>' +
        catalog.categories.map((c) => `<option value="${c.id}">${escapeHtml(c.label)}</option>`).join('');
      cat.addEventListener('change', () => {
        filters.category = cat.value;
        renderGrid();
      });
    }
    if (tier) {
      tier.addEventListener('change', () => {
        filters.tier = tier.value;
        renderGrid();
      });
    }
    if (ready) {
      ready.addEventListener('change', () => {
        filters.ready = ready.value;
        renderGrid();
      });
    }
    if (search) {
      search.addEventListener('input', () => {
        filters.q = search.value.trim();
        renderGrid();
      });
    }
  }

  async function load() {
    const res = await fetch(DATA_URL);
    if (!res.ok) throw new Error(`Failed to load ${DATA_URL}`);
    catalog = await res.json();
    wireFilters();
    renderGrid();
  }

  global.ComponentCatalog = { load, render: renderGrid, getData: () => catalog };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => load().catch(console.error));
  } else {
    load().catch(console.error);
  }
})(window);
