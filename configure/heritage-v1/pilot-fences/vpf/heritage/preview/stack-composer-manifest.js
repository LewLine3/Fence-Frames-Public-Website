/**
 * Stack composer manifest — static module placements (112×95 in).
 * Coords match scripts/lib/heritage-geometry.js buildHeritageGrid(); rebuild when geometry changes.
 * Pilot only stacks layers — no runtime layout math.
 */
(function initStackManifest(global) {
  const MODULE = { w: 112, h: 95 };

  /** @type {Record<string, { x: number, y: number, w: number, h: number }>} */
  const PLACE = {
    postLeft: { x: 8, y: 12, w: 3.5, h: 72 },
    postRight: { x: 100.5, y: 12, w: 3.5, h: 72 },
    cap: { x: 11.3125, y: 12, w: 89.375, h: 1.5 },
    topRail: { x: 11.3125, y: 13.3125, w: 89.375, h: 3.5 },
    middleRail: { x: 11.3125, y: 32.5, w: 89.375, h: 3.5 },
    bottomRail: { x: 11.3125, y: 72, w: 89.375, h: 3.5 },
    bottomRailLegacy: { x: 11.3125, y: 77.5, w: 89.375, h: 3.5 },
  };

  const COMPONENTS_BASE = '../../../../components/';

  const PICKET_SYMS = {
    standard: `${COMPONENTS_BASE}pickets/sym-picket-cedar-flat-top-heritage.svg`,
    gothic: `${COMPONENTS_BASE}pickets/sym-picket-cedar-gothic-heritage.svg`,
    shadowbox: `${COMPONENTS_BASE}pickets/sym-picket-cedar-shadowbox-heritage.svg`,
    'board-on-board': `${COMPONENTS_BASE}pickets/sym-picket-cedar-board-on-board-heritage.svg`,
  };

  const POST_CAP_SYMS = {
    cedar: `${COMPONENTS_BASE}caps/sym-post-cap-cedar-pyramid.svg`,
    metal: `${COMPONENTS_BASE}caps/sym-post-cap-metal-pyramid.svg`,
    solar: `${COMPONENTS_BASE}caps/sym-post-cap-solar-pyramid.svg`,
    copper: `${COMPONENTS_BASE}caps/sym-post-cap-copper-pyramid.svg`,
  };

  const POST_CAP_DIMS = {
    cedar: { w: 4.25, h: 3.5 },
    metal: { w: 3.875, h: 3.5 },
    solar: { w: 4.25, h: 4.25 },
    copper: { w: 4.25, h: 3.5 },
  };

  function postCapPlace(postPlace, capKey) {
    const dims = POST_CAP_DIMS[capKey];
    const cx = postPlace.x + postPlace.w / 2;
    return { x: cx - dims.w / 2, y: postPlace.y - dims.h, w: dims.w, h: dims.h };
  }

  const BRACKET_DIMS = {
    'u-black': { w: 2.5, h: 3.5 },
    'u-galv': { w: 2.5, h: 3.5 },
    'l-1': { w: 1, h: 1 },
    'l-2': { w: 2, h: 2 },
    'l-4': { w: 4, h: 4 },
    'l-6': { w: 6, h: 6 },
    'poly-u': { w: 3, h: 3.5 },
    'wood-2x2': { w: 1.5, h: 6 },
    'wood-2x4': { w: 3.5, h: 6 },
  };

  function resolveBracketPath(key, state) {
    const railsUi = state.railsUi || state.rails || 'pt-incised';
    const cedar = railsUi === 'cedar';
    if (key === 'wood-2x2') {
      return `${COMPONENTS_BASE}brackets/sym-bracket-wood-block-2x2-${cedar ? 'cedar' : 'pt'}.svg`;
    }
    if (key === 'wood-2x4') {
      return `${COMPONENTS_BASE}brackets/sym-bracket-wood-block-2x4-${cedar ? 'cedar' : 'pt'}.svg`;
    }
    const MAP = {
      'u-black': 'sym-bracket-u-2x4-black.svg',
      'u-galv': 'sym-bracket-u-2x4-galv.svg',
      'l-1': 'sym-bracket-l-1in.svg',
      'l-2': 'sym-bracket-l-2in.svg',
      'l-4': 'sym-bracket-l-4in.svg',
      'l-6': 'sym-bracket-l-6in.svg',
      'poly-u': 'sym-bracket-poly-u.svg',
    };
    const file = MAP[key];
    return file ? `${COMPONENTS_BASE}brackets/${file}` : null;
  }

  /** Left-post junction — sym drawn for fill-side view; right post uses mirrorX. */
  function bracketPlace(postPlace, railPlace, key, railDy) {
    const dims = BRACKET_DIMS[key] || { w: 2.5, h: 3.5 };
    const railH = railPlace.h || 3.5;
    const y = railPlace.y + (railDy || 0);
    if (key.startsWith('l-')) {
      return {
        x: postPlace.x + postPlace.w - dims.w * 0.2,
        y: y + railH - dims.h,
        w: dims.w,
        h: dims.h,
      };
    }
    if (key.startsWith('wood-')) {
      return { x: postPlace.x + postPlace.w, y: y - 0.5, w: dims.w, h: dims.h };
    }
    return {
      x: postPlace.x + postPlace.w - 1.625,
      y,
      w: dims.w,
      h: key === 'poly-u' ? 3.5 : 3.5,
    };
  }

  function pushBracketLayers(layers, state, bracketKey, railId, railPlace, railDy) {
    const path = resolveBracketPath(bracketKey, state);
    if (!path) return;
    const wood = bracketKey.startsWith('wood-');
    const z = wood ? 38 : 44;
    const left = bracketPlace(PLACE.postLeft, railPlace, bracketKey, railDy);
    const right = bracketPlace(PLACE.postRight, railPlace, bracketKey, railDy);
    layers.push(
      {
        id: `bracket-${railId}-left`,
        path,
        kind: 'placed',
        place: left,
        z,
        visible: true,
      },
      {
        id: `bracket-${railId}-right`,
        path,
        kind: 'placed',
        place: right,
        mirrorX: true,
        z: z + 1,
        visible: true,
      }
    );
  }

  /**
   * @param {object} state — configurator state (posts, trim, picketFill, framePreset, side, …)
   * @param {object} HC — HeritageConfigurator
   * @returns {{ layers: object[], fallback: boolean, fallbackReason?: string }}
   */
  function resolveStackPlan(state, HC) {
    if (state.side === 'back') {
      return { layers: [], fallback: true, fallbackReason: 'back-view' };
    }
    if (state.picketFill === 'standard' && state.picketSpacing && state.picketSpacing !== '1-16-privacy') {
      return { layers: [], fallback: true, fallbackReason: 'picket-spacing' };
    }

    const line = HC.resolveEffectiveVpfLine(
      state.framePreset || 'heritage-vpf',
      state.railCount
    );
    const { tier, material: trimMat } = HC.parseTrimPackage(state.trim);
    const onFront = state.side !== 'back';
    const showTopTrim = onFront && (tier === '1t' || tier === '2t' || tier === '3t');
    const showBottomTrim = onFront && (tier === '2t' || tier === '3t');
    const showMiddleTrim = onFront && tier === '3t' && line.showMiddle;

    const postsUi = state.postsUi || state.posts || 'pt-incised';
    const postSym =
      postsUi === HC.MATERIAL.CEDAR
        ? `${COMPONENTS_BASE}posts/sym-post-cedar-4x4.svg`
        : `${COMPONENTS_BASE}posts/sym-post-pt-4x4.svg`;

    const picketPath = PICKET_SYMS[state.picketFill] || PICKET_SYMS.standard;

    const trimMatKey = trimMat === HC.MATERIAL.PT ? 'pt' : 'cedar';
    const topTrimPath = `${COMPONENTS_BASE}trim/sym-trim-top-${trimMatKey}.svg`;
    const bottomTrimPath = `${COMPONENTS_BASE}trim/sym-trim-bottom-${trimMatKey}.svg`;

    const railDy = line.topRailDy || 0;
    const bottomPlace =
      line.bottomLayout === 'heritage' ? PLACE.bottomRail : PLACE.bottomRailLegacy;

    /** @type {object[]} */
    const layers = [];

    layers.push({
      id: 'ground',
      path: `${COMPONENTS_BASE}fill/ground/sym-ground-grass-heritage.svg`,
      kind: 'module',
      z: 10,
      visible: true,
    });

    layers.push(
      {
        id: 'post-left',
        path: postSym,
        kind: 'placed',
        place: PLACE.postLeft,
        z: 20,
        visible: true,
      },
      {
        id: 'post-right',
        path: postSym,
        kind: 'placed',
        place: PLACE.postRight,
        z: 21,
        visible: true,
      }
    );

    const postCapKey = state.postCaps || 'none';
    if (onFront && postCapKey !== 'none' && POST_CAP_SYMS[postCapKey]) {
      const capPath = POST_CAP_SYMS[postCapKey];
      layers.push(
        {
          id: 'post-cap-left',
          path: capPath,
          kind: 'placed',
          place: postCapPlace(PLACE.postLeft, postCapKey),
          z: 62,
          visible: true,
        },
        {
          id: 'post-cap-right',
          path: capPath,
          kind: 'placed',
          place: postCapPlace(PLACE.postRight, postCapKey),
          z: 63,
          visible: true,
        }
      );
    }

    if (line.bottomLayout === 'heritage') {
      layers.push({
        id: 'rail-bottom',
        path: `${COMPONENTS_BASE}rails/sym-rail-bottom-heritage.svg`,
        kind: 'placed',
        place: PLACE.bottomRail,
        z: 30,
        visible: true,
      });
    } else {
      layers.push({
        id: 'rail-bottom-legacy',
        path: `${COMPONENTS_BASE}rails/sym-rail-bottom-heritage.svg`,
        kind: 'placed',
        place: PLACE.bottomRailLegacy,
        z: 30,
        visible: true,
      });
    }

    if (line.showMiddle) {
      layers.push({
        id: 'rail-middle',
        path: `${COMPONENTS_BASE}rails/sym-rail-middle-heritage.svg`,
        kind: 'placed',
        place: PLACE.middleRail,
        z: 31,
        visible: true,
      });
    }

    layers.push({
      id: 'rail-top',
      path: `${COMPONENTS_BASE}rails/sym-rail-top-heritage.svg`,
      kind: 'placed',
      place: PLACE.topRail,
      dy: railDy,
      z: 32,
      visible: true,
    });

    if (HC.resolveRailCapEnabled(state, line)) {
      layers.push({
        id: 'rail-cap',
        path: `${COMPONENTS_BASE}rails/sym-rail-cap-ref-1.5.svg`,
        kind: 'placed',
        place: PLACE.cap,
        z: 33,
        visible: true,
      });
    }

    const bracketKey = state.brackets || 'none';
    if (onFront && bracketKey !== 'none') {
      pushBracketLayers(layers, state, bracketKey, 'top', PLACE.topRail, railDy);
      if (line.showMiddle) {
        pushBracketLayers(layers, state, bracketKey, 'middle', PLACE.middleRail, 0);
      }
      const bottomBracketPlace =
        line.bottomLayout === 'heritage' ? PLACE.bottomRail : PLACE.bottomRailLegacy;
      pushBracketLayers(layers, state, bracketKey, 'bottom', bottomBracketPlace, 0);
    }

    layers.push({
      id: 'pickets',
      path: picketPath,
      kind: 'module',
      z: 40,
      visible: onFront,
    });

    if (showBottomTrim) {
      layers.push({
        id: 'trim-bottom',
        path: bottomTrimPath,
        kind: 'placed',
        place: bottomPlace,
        z: 50,
        visible: true,
      });
    }
    if (showTopTrim) {
      layers.push({
        id: 'trim-top',
        path: topTrimPath,
        kind: 'placed',
        place: PLACE.topRail,
        dy: railDy,
        z: 51,
        visible: true,
      });
    }

    if (showMiddleTrim) {
      layers.push({
        id: 'trim-middle',
        path: topTrimPath,
        kind: 'placed',
        place: PLACE.middleRail,
        z: 52,
        visible: true,
      });
    }

    layers.push({
      id: 'grass-front',
      path: `${COMPONENTS_BASE}fill/ground/sym-grass-front-heritage.svg`,
      kind: 'module',
      z: 60,
      visible: true,
    });

    layers.sort((a, b) => a.z - b.z);
    return { layers, fallback: false };
  }

  global.StackComposerManifest = {
    MODULE,
    PLACE,
    COMPONENTS_BASE,
    resolveStackPlan,
  };
})(window);
