/**
 * Community preset loader — HOA-filtered configurator mode.
 * Enter via Fence Type → Community / HOA → style (e.g. Si View Community),
 * or URL ?community_preset=si-view / embed-host boot.communityPreset.
 */
(function initCommunityPreset(global) {
  const BASE = 'community-presets/';

  function getSlug() {
    const params = new URLSearchParams(global.location.search);
    const fromUrl = params.get('community_preset');
    if (fromUrl) return fromUrl.trim();
    if (global.FenceFramesEmbed && global.FenceFramesEmbed.boot) {
      return global.FenceFramesEmbed.boot.communityPreset;
    }
    return null;
  }

  async function load(slug) {
    if (!slug) return null;
    const res = await fetch(`${BASE}${encodeURIComponent(slug)}.json`, { cache: 'no-cache' });
    if (!res.ok) {
      console.warn('[CommunityPreset] missing preset:', slug, res.status);
      return null;
    }
    const data = await res.json();
    if (data.slug && data.slug !== slug) {
      console.warn('[CommunityPreset] slug mismatch', slug, data.slug);
    }
    return data;
  }

  async function listManifest() {
    try {
      const res = await fetch(`${BASE}manifest.json`, { cache: 'no-cache' });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data.presets) ? data.presets : [];
    } catch (err) {
      console.warn('[CommunityPreset] manifest load failed', err);
      return [];
    }
  }

  function hideElement(id) {
    /* B2 shell stays mounted — community mode swaps its body, never removes the panel. */
    if (id === 'templates-panel') return;
    const el = global.document.getElementById(id);
    if (el) el.classList.add('community-preset-hidden');
  }

  function setB2Mode(mode) {
    const panel = global.document.getElementById('templates-panel');
    const title = global.document.getElementById('b2-panel-title');
    const templatesBody = global.document.getElementById('templates-panel-body');
    const communityBody = global.document.getElementById('community-preset-banner');
    const isCommunity = mode === 'community';
    if (panel) {
      panel.classList.remove('pilot-hidden', 'community-preset-hidden');
      panel.hidden = false;
      panel.setAttribute('data-panel-mode', isCommunity ? 'community' : 'templates');
      panel.setAttribute('aria-label', isCommunity ? 'Community program' : 'Fence templates');
    }
    if (title) title.textContent = isCommunity ? 'Community Partner' : 'Templates';
    if (templatesBody) templatesBody.hidden = isCommunity;
    if (communityBody) communityBody.hidden = !isCommunity;
    const expandBtn = panel && panel.querySelector('.mini-panel-expand');
    if (expandBtn) {
      const label = expandBtn.getAttribute('aria-label') || '';
      expandBtn.setAttribute(
        'aria-label',
        label.replace(/templates|community partner/i, isCommunity ? 'community partner' : 'templates')
      );
    }
  }

  function applyUi(preset) {
    if (!preset) return;
    global.document.documentElement.dataset.communityPreset = preset.slug;

    const hide = preset.configurator && preset.configurator.hide ? preset.configurator.hide : {};
    (hide.controls || []).forEach(hideElement);
    /* Templates stay in the same B2 slot — community mode swaps the body, not the panel. */

    setB2Mode('community');
    const banner = global.document.getElementById('community-preset-banner');
    if (banner && preset.copy) {
      const headline = global.document.getElementById('community-preset-headline');
      const subhead = global.document.getElementById('community-preset-subhead');
      const disclaimer = global.document.getElementById('community-preset-disclaimer');
      if (headline) headline.textContent = preset.copy.headline || preset.displayName || '';
      if (subhead) subhead.textContent = preset.copy.subhead || '';
      if (disclaimer) disclaimer.textContent = preset.copy.disclaimer || '';
    }

    const desc = global.document.getElementById('fence-style-desc');
    if (desc && preset.copy && preset.copy.headline) {
      desc.textContent = preset.copy.headline;
    }
  }

  function clearUi() {
    delete global.document.documentElement.dataset.communityPreset;
    global.document.querySelectorAll('.community-preset-hidden').forEach((el) => {
      el.classList.remove('community-preset-hidden');
    });
    setB2Mode('templates');
    const headline = global.document.getElementById('community-preset-headline');
    const subhead = global.document.getElementById('community-preset-subhead');
    const disclaimer = global.document.getElementById('community-preset-disclaimer');
    if (headline) headline.textContent = '';
    if (subhead) subhead.textContent = '';
    if (disclaimer) disclaimer.textContent = '';
  }

  function applyDefaults(preset, applyMaterialDefaults, els) {
    if (!preset || !preset.configurator || !preset.configurator.defaults) return;
    const d = preset.configurator.defaults;
    if (typeof applyMaterialDefaults === 'function') applyMaterialDefaults(d);
    if (els.stainFrameEl && d.stainFrame) els.stainFrameEl.value = d.stainFrame;
    if (els.stainPicketEl && d.stainPicket) els.stainPicketEl.value = d.stainPicket;
    if (els.stainTrimEl && d.stainTrim) els.stainTrimEl.value = d.stainTrim;
  }

  const LOCK_FIELD_MAP = {
    fenceHeight: 'fenceHeightEl',
    panelLength: 'panelLengthEl',
    picketFill: 'picketFillEl',
    picketSpacing: 'picketSpacingEl',
    picketWidth: 'picketWidthEl',
    posts: 'postsEl',
    rails: 'railsEl',
    trim: 'trimEl',
    railCap: 'railCapEl',
    stainFrame: 'stainFrameEl',
    stainPicket: 'stainPicketEl',
  };

  function lockControls(preset, els) {
    if (!preset || !preset.configurator) return;
    const lock = preset.configurator.lock || {};
    Object.keys(lock).forEach((key) => {
      const elKey = LOCK_FIELD_MAP[key];
      const el = elKey && els[elKey] ? els[elKey] : null;
      if (el) el.disabled = true;
    });
    const hide = preset.configurator.hide || {};
    (hide.controls || []).forEach((id) => {
      const el = global.document.getElementById(id);
      if (!el) return;
      el.querySelectorAll('select, button, input').forEach((control) => {
        control.disabled = true;
      });
    });
  }

  function unlockControls(els) {
    Object.keys(LOCK_FIELD_MAP).forEach((key) => {
      const elKey = LOCK_FIELD_MAP[key];
      const el = elKey && els[elKey] ? els[elKey] : null;
      if (el) el.disabled = false;
    });
  }

  global.CommunityPreset = {
    getSlug,
    load,
    listManifest,
    applyUi,
    clearUi,
    applyDefaults,
    lockControls,
    unlockControls,
  };
})(typeof window !== 'undefined' ? window : global);
