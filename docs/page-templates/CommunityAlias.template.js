/**
 * TEMPLATE — `/community/{slug}` alias (O-Alias / W2)
 *
 * Preferred Studio setup:
 *   A) Custom router prefix `community` with router.js using resolveCommunityAlias
 *   B) Dynamic page + Velo redirect (below) if router UI is deferred
 *
 * Pilot: /community/si-view → /wa/king-county/north-bend/si-view
 */

import wixLocation from 'wix-location';
import { resolveCommunityAlias, FF_COUNTY_HUB } from 'public/ffRedirectMap';

$w.onReady(function () {
  const path = wixLocation.path || [];
  // path examples: ['community', 'si-view'] or ['si-view'] depending on page URL config
  let slug = '';
  if (path.length >= 2 && path[0] === 'community') slug = path[1];
  else if (path.length === 1) slug = path[0];
  else {
    const q = wixLocation.query || {};
    slug = q.slug || '';
  }

  const target = resolveCommunityAlias(slug);
  if (target) {
    wixLocation.to(target);
    return;
  }

  console.warn('[FF alias] unknown community slug', slug);
  wixLocation.to(FF_COUNTY_HUB);
});
