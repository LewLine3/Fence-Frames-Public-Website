/**
 * TEMPLATE — /design catalog shell
 * Phase A (DEV): Type → Style browse lives at FenceBook
 *   http://127.0.0.1:5199/preview/catalog-browse.html
 * When shipping: host that static page (or its Public-Website copy) in an
 * iframe / html component — do not rebuild the Heritage configurator here.
 * W9 later: curated builds filter embed (Supabase) — not this Phase A page.
 */

import { wireSiteChrome, hideMediaEnginePlaceholders, FF_PATHS } from 'public/ffSiteChrome';
import wixLocation from 'wix-location';

$w.onReady(function () {
  wireSiteChrome();
  hideMediaEnginePlaceholders();

  try {
    const cta = $w('#ctaDesign');
    if (cta) cta.onClick(() => wixLocation.to(FF_PATHS.configure));
  } catch (e) {
    /* optional */
  }

  try {
    const note = $w('#designStubNote');
    if (note && 'text' in note) {
      note.text =
        'Browse fence types and styles in the design catalog (shipping next). Open the configurator to build a fence now.';
    }
  } catch (e) {
    /* optional */
  }

  console.info(
    '[FF Design] stub ready — Phase A Type→Style catalog on :5199/preview/catalog-browse.html; W9 curated gallery later'
  );
});
