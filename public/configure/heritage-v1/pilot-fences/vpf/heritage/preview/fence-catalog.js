/**
 * Greatest Hits Fence Catalog — grid renderer for heritage-pilot.html #catalog-view.
 * Depends on fence-catalog-data.js (window.FenceCatalogData).
 */
(function initFenceCatalog(global) {
  const TAG_ALL = 'all';

  let state = {
    category: 'all',
    style: 'all',
    tag: TAG_ALL,
    q: '',
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getBuilds() {
    return global.FenceCatalogData ? global.FenceCatalogData.getAllBuilds() : [];
  }

  function filteredBuilds() {
    const q = state.q.trim().toLowerCase();
    return getBuilds().filter((b) => {
      if (state.category !== 'all' && b.category !== state.category) return false;
      if (state.style !== 'all' && b.style !== state.style) return false;
      if (state.tag !== TAG_ALL && !(b.tags || []).includes(state.tag)) return false;
      if (q) {
        const hay = [
          b.id,
          b.title,
          b.description,
          b.category,
          b.style,
          b.template,
          ...(b.tags || []),
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }

  function renderCard(build) {
    const tags = (build.tags || [])
      .map((t) => `<span class="card-tag">${escapeHtml(t)}</span>`)
      .join('');
    const thumb = build.thumbSrc
      ? `<img class="card-svg-thumb" src="${escapeHtml(build.thumbSrc)}" alt="" loading="lazy" />`
      : '<div class="card-svg-thumb" aria-hidden="true"></div>';

    return `
      <article class="fence-catalog-card" data-build-id="${escapeHtml(build.id)}" tabindex="0" role="button" aria-label="Load ${escapeHtml(build.title)}">
        <div class="card-media-wrapper">${thumb}</div>
        <header class="card-panel-header">
          <h2 class="card-title">${escapeHtml(build.title)}</h2>
        </header>
        <div class="card-content">
          <div class="card-price-tags-row">
            ${build.priceRange ? `<span class="card-price-range-badge">${escapeHtml(build.priceRange)}</span>` : ''}
          </div>
          <div class="card-tags-row">${tags}</div>
          <p class="card-desc">${escapeHtml(build.description || '')}</p>
          <div class="card-action-bar">
            <span class="btn-card-inspect">Inspect in Designer →</span>
          </div>
        </div>
      </article>`;
  }

  function updateCount(n) {
    const el = document.getElementById('catalog-results-count');
    if (el) {
      el.textContent = `${n} Fence Design${n === 1 ? '' : 's'} Available`;
    }
  }

  function renderGrid() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;
    const list = filteredBuilds();
    updateCount(list.length);
    grid.innerHTML = list.length
      ? list.map(renderCard).join('')
      : '<p class="card-desc" style="grid-column:1/-1;padding:1rem;">No builds match the current filters.</p>';

    grid.querySelectorAll('.fence-catalog-card').forEach((card) => {
      const id = card.getAttribute('data-build-id');
      const open = () => {
        if (typeof global.loadCatalogBuild === 'function') {
          global.loadCatalogBuild(id);
        }
      };
      card.addEventListener('click', open);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function setTagChip(activeTag) {
    state.tag = activeTag;
    document.querySelectorAll('#catalog-tag-chips .tag-chip').forEach((chip) => {
      const t = chip.getAttribute('data-tag');
      chip.classList.toggle('active', t === activeTag);
    });
    renderGrid();
  }

  function wireFilters() {
    const cat = document.getElementById('catalog-category-filter');
    const style = document.getElementById('catalog-style-filter');
    const search = document.getElementById('catalog-search-input');
    const chips = document.getElementById('catalog-tag-chips');

    if (cat) {
      cat.addEventListener('change', () => {
        state.category = cat.value;
        renderGrid();
      });
    }
    if (style) {
      style.addEventListener('change', () => {
        state.style = style.value;
        renderGrid();
      });
    }
    if (search) {
      search.addEventListener('input', () => {
        state.q = search.value;
        renderGrid();
      });
    }
    if (chips) {
      chips.addEventListener('click', (e) => {
        const chip = e.target.closest('.tag-chip');
        if (!chip) return;
        setTagChip(chip.getAttribute('data-tag') || TAG_ALL);
      });
    }
  }

  function render() {
    renderGrid();
  }

  global.FenceCatalog = {
    render,
    getState: () => ({ ...state }),
    setFilters: (next) => {
      state = { ...state, ...next };
      renderGrid();
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', wireFilters);
  } else {
    wireFilters();
  }
})(window);
