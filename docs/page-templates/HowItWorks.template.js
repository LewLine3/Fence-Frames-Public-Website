/**
 * TEMPLATE — /how-it-works static shell
 * Spec: Design/FenceBook/wix-pages/specs/how-it-works.md
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

  console.info('[FF HowItWorks] stub ready');
});
