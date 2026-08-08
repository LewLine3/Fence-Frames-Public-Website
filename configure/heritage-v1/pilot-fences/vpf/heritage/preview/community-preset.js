/**
 * Community preset loader — HOA-filtered configurator mode.
 * URL: ?community_preset=si-view (or embed-host boot.communityPreset)
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

  function hideElement(id) {
    const el = global.document.getElementById(id);
    if (el) el.classList.add('community-preset-hidden');
  }

  function applyUi(preset) {
    if (!preset) return;
    global.document.documentElement.dataset.communityPreset = preset.slug;

    const hide = preset.configurator && preset.configurator.hide ? preset.configurator.hide : {};
    (hide.controls || []).forEach(hideElement);
    if (hide.templates && hide.templates.length) {
      hideElement('templates-panel');
    }

    const banner = global.document.getElementById('community-preset-banner');
    if (banner && preset.copy) {
      banner.hidden = false;
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
    picketFill: 'picketFillEl',
    picketSpacing: 'picketSpacingEl',
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
    (preset.configurator.hide.controls || []).forEach((id) => {
      const el = global.document.getElementById(id);
      if (!el) return;
      el.querySelectorAll('select, button, input').forEach((control) => {
        control.disabled = true;
      });
    });
  }

  global.CommunityPreset = {
    getSlug,
    load,
    applyUi,
    applyDefaults,
    lockControls,
  };
})(typeof window !== 'undefined' ? window : global);
