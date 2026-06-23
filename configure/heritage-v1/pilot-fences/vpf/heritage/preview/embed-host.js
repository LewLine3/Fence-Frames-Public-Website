/**
 * Heritage VPF embed host — iframe contract for P2 (Wix) / P3 (auth).
 * Stub member gates per W2; no Supabase wire in P1.
 */
(function initFenceFramesEmbed(global) {
  const VERSION = '1.0.0';
  const PROTOCOL = 'fenceframes-embed';
  const ALLOWED_ORIGINS = new Set(); // P2 may extend via setAllowedOrigins

  /** @type {{ memberId: string|null, authenticated: boolean }} */
  let memberContext = { memberId: null, authenticated: false };

  const gateCallbacks = {
    saveDesign: null,
    requestContact: null,
    createBlueprint: null,
  };

  let configReader = null;
  let quoteReader = null;
  let resizeObserver = null;

  function parseBootParams() {
    const params = new URLSearchParams(global.location.search);
    return {
      embed: params.get('embed') === '1' || global.document.documentElement.dataset.ffEmbed === '1',
      partnerSlug: params.get('partner_slug') || null,
      channel: params.get('channel') || 'ff',
      communityPreset: params.get('community_preset') || null,
    };
  }

  const boot = parseBootParams();

  function postToParent(type, payload) {
    if (!boot.embed || global.parent === global) return;
    const message = { protocol: PROTOCOL, version: VERSION, type, ...payload };
    try {
      global.parent.postMessage(message, '*');
    } catch (e) {
      console.warn('[FenceFramesEmbed] postMessage failed', e);
    }
  }

  function handleParentMessage(event) {
    const data = event.data;
    if (!data || data.protocol !== PROTOCOL) return;
    if (ALLOWED_ORIGINS.size && !ALLOWED_ORIGINS.has(event.origin)) return;

    if (data.type === 'ff-embed-member-context') {
      memberContext = {
        memberId: data.memberId || null,
        authenticated: Boolean(data.authenticated && data.memberId),
      };
      global.dispatchEvent(
        new CustomEvent('ff-embed-member-context', { detail: { ...memberContext } })
      );
    }
  }

  function requireMember(action) {
    if (memberContext.authenticated) return true;
    postToParent('ff-embed-login-required', { action });
    global.dispatchEvent(new CustomEvent('ff-embed-login-required', { detail: { action } }));
    return false;
  }

  function getConfig() {
    return configReader ? configReader() : null;
  }

  function getQuoteRange() {
    return quoteReader ? quoteReader() : null;
  }

  function notifyConfigChanged() {
    postToParent('ff-embed-config-changed', {
      config: getConfig(),
      quote: getQuoteRange(),
      partnerSlug: boot.partnerSlug,
      channel: boot.channel,
    });
  }

  function postResize() {
    const h = Math.ceil(global.document.documentElement.scrollHeight);
    postToParent('ff-embed-resize', { height: h });
  }

  function wireResizeObserver() {
    if (resizeObserver || !boot.embed) return;
    resizeObserver = new ResizeObserver(() => postResize());
    resizeObserver.observe(global.document.body);
    global.addEventListener('load', postResize);
    global.addEventListener('resize', postResize);
  }

  function init(readers) {
    if (readers) {
      if (typeof readers.getConfig === 'function') configReader = readers.getConfig;
      if (typeof readers.getQuoteRange === 'function') quoteReader = readers.getQuoteRange;
    }
    if (boot.embed) {
      global.addEventListener('message', handleParentMessage);
      wireResizeObserver();
      postToParent('ff-embed-ready', {
        version: VERSION,
        partnerSlug: boot.partnerSlug,
        channel: boot.channel,
      });
    }
  }

  const api = {
    VERSION,
    PROTOCOL,
    boot,
    init,
    getConfig,
    getQuoteRange,
    notifyConfigChanged,
    postResize,
    setAllowedOrigins(origins) {
      origins.forEach((o) => ALLOWED_ORIGINS.add(o));
    },
    setReaders(readers) {
      if (typeof readers.getConfig === 'function') configReader = readers.getConfig;
      if (typeof readers.getQuoteRange === 'function') quoteReader = readers.getQuoteRange;
    },
    member: {
      get context() {
        return { ...memberContext };
      },
      isAuthenticated() {
        return memberContext.authenticated;
      },
      onSaveDesign(fn) {
        gateCallbacks.saveDesign = fn;
      },
      onRequestContact(fn) {
        gateCallbacks.requestContact = fn;
      },
      onCreateBlueprint(fn) {
        gateCallbacks.createBlueprint = fn;
      },
      requestSaveDesign() {
        if (!requireMember('save')) return;
        if (gateCallbacks.saveDesign) gateCallbacks.saveDesign(getConfig(), getQuoteRange());
        else postToParent('ff-embed-gate-stub', { action: 'save', config: getConfig(), quote: getQuoteRange() });
      },
      requestContact() {
        if (!requireMember('contact')) return;
        if (gateCallbacks.requestContact) gateCallbacks.requestContact(getConfig(), getQuoteRange());
        else postToParent('ff-embed-gate-stub', { action: 'contact', config: getConfig(), quote: getQuoteRange() });
      },
      requestCreateBlueprint() {
        if (!requireMember('blueprint')) return;
        if (gateCallbacks.createBlueprint) gateCallbacks.createBlueprint(getConfig(), getQuoteRange());
        else postToParent('ff-embed-gate-stub', { action: 'blueprint', config: getConfig(), quote: getQuoteRange() });
      },
    },
  };

  global.FenceFramesEmbed = api;
})(typeof window !== 'undefined' ? window : global);
