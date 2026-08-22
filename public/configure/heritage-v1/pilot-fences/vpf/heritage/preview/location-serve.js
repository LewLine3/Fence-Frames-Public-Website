/**
 * Shared location serve lookup — ZIP and state/city are two UIs onto the same map.
 * Used by Project specs, catalog, and home locate strip.
 */
(function initLocationServe(global) {
  const NO_HOA = '__no_hoa__';
  const COMING_SOON = 'Coming soon to your area';
  const DEFAULT_DATA_URL = 'community-presets/served-locations.json';

  let dataPromise = null;
  let cached = null;

  const scriptEl = global.document && global.document.currentScript;
  const scriptBase =
    scriptEl && scriptEl.src ? new URL('.', scriptEl.src).href : '';

  function resolveDataUrl(overrideUrl) {
    if (overrideUrl) return overrideUrl;
    return scriptBase
      ? new URL(DEFAULT_DATA_URL, scriptBase).href
      : DEFAULT_DATA_URL;
  }

  function normalizeZip(raw) {
    if (raw == null) return null;
    const digits = String(raw).replace(/\D/g, '');
    if (digits.length < 5) return null;
    return digits.slice(0, 5);
  }

  function deriveStatesFromZips(zips) {
    const states = {};
    Object.keys(zips || {}).forEach((zip) => {
      (zips[zip] || []).forEach((c) => {
        if (!c || !c.state || !c.city) return;
        if (!states[c.state]) states[c.state] = {};
        if (!states[c.state][c.city]) states[c.state][c.city] = [];
        const list = states[c.state][c.city];
        if (!list.some((x) => x.slug === c.slug)) {
          list.push({ slug: c.slug, name: c.name || c.slug });
        }
      });
    });
    return states;
  }

  function normalizeData(raw) {
    const zips = raw && raw.zips ? raw.zips : {};
    const states =
      raw && raw.states && Object.keys(raw.states).length
        ? raw.states
        : deriveStatesFromZips(zips);
    return { version: (raw && raw.version) || '1', zips, states };
  }

  function load(dataUrl) {
    if (cached) return Promise.resolve(cached);
    if (dataPromise) return dataPromise;
    const url = resolveDataUrl(dataUrl);
    dataPromise = fetch(url, { cache: 'no-cache' })
      .then((res) => {
        if (!res.ok) throw new Error(`served-locations ${res.status}`);
        return res.json();
      })
      .then((json) => {
        cached = normalizeData(json);
        return cached;
      })
      .catch((err) => {
        console.warn('[LocationServe] load failed', err);
        dataPromise = null;
        cached = normalizeData({ zips: {}, states: {} });
        return cached;
      });
    return dataPromise;
  }

  function lookupZip(zipRaw, data) {
    const zip = normalizeZip(zipRaw);
    if (!zip) {
      return { status: 'invalid', zip: null, communities: [] };
    }
    const source = data || cached;
    const communities = source && source.zips ? source.zips[zip] || [] : [];
    if (communities.length) {
      return { status: 'served', zip, communities: communities.slice() };
    }
    return { status: 'unserved', zip, communities: [] };
  }

  function listStates(data) {
    const source = data || cached;
    return Object.keys((source && source.states) || {}).sort();
  }

  function listCities(state, data) {
    const source = data || cached;
    if (!state || !source || !source.states || !source.states[state]) return [];
    return Object.keys(source.states[state]).sort();
  }

  function communitiesForCity(state, city, data) {
    const source = data || cached;
    if (!state || !city || !source || !source.states || !source.states[state]) {
      return { status: 'unserved', communities: [] };
    }
    if (!Object.prototype.hasOwnProperty.call(source.states[state], city)) {
      return { status: 'unserved', communities: [] };
    }
    const communities = source.states[state][city] || [];
    if (communities.length) {
      return { status: 'served', communities: communities.slice() };
    }
    return { status: 'unserved', communities: [] };
  }

  function isNoHoa(value) {
    return value === NO_HOA || value === 'no-hoa' || value === '';
  }

  global.LocationServe = {
    NO_HOA,
    COMING_SOON,
    load,
    normalizeZip,
    lookupZip,
    listStates,
    listCities,
    communitiesForCity,
    isNoHoa,
    /** Test / boot helper — clears cache so the next load() refetches. */
    _resetForTests() {
      cached = null;
      dataPromise = null;
    },
  };
})(typeof window !== 'undefined' ? window : globalThis);
