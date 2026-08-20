/**
 * TEMPLATE — County dynamic item page
 *
 * Studio:
 *   1. Create CMS dynamic page for Counties → URL /wa/{slug}
 *   2. Sync to Git; rename this code into the generated page file
 *   3. Wire datasets + element IDs per Design/FenceBook/wix-pages/specs/county.md
 *
 * Do NOT commit this file as a live page name — Wix ignores orphan page files.
 */

import wixLocation from 'wix-location';
import wixData from 'wix-data';
import { FF_PATHS } from 'public/ffSiteChrome';
import { applyDisclaimerCopy, buildCityPath } from 'public/ffGeoShell';

const COUNTY_SLUG_FALLBACK = 'king-county';

$w.onReady(async function () {
  applyDisclaimerCopy();

  try {
    const cta = $w('#ctaConfigure');
    if (cta) cta.onClick(() => wixLocation.to(FF_PATHS.configure));
  } catch (e) {
    /* optional */
  }

  try {
    const item = await $w('#dynamicDataset').getCurrentItem();
    const name = (item && item.name) || 'King County';
    const slug = (item && item.slug) || COUNTY_SLUG_FALLBACK;
    const zone = (item && item.zone) || '';

    try {
      const title = $w('#pageTitle');
      if (title && 'text' in title) {
        title.text = `${name} fence standards & local guides`;
      }
    } catch (e) {
      /* optional */
    }

    try {
      const badge = $w('#zoneBadge');
      if (badge && 'text' in badge && zone) badge.text = String(zone);
    } catch (e) {
      /* optional */
    }

    // City repeater: prefer Studio dataset filter. Fallback fill if #cityRepeater unbound.
    try {
      const repeater = $w('#cityRepeater');
      if (repeater && typeof repeater.data === 'undefined') {
        const cities = await wixData
          .query('Cities')
          .ascending('name')
          .limit(50)
          .find();
        // When using code-driven repeater, connect onItemReady in Studio or:
        repeater.data = cities.items.map((c) => ({
          _id: c._id,
          name: c.name,
          slug: c.slug,
          seoStatus: c.seoStatus,
          href: buildCityPath(slug, c.slug),
        }));
      }
    } catch (e) {
      console.info('[FF County] use Studio dataset for city grid', e.message || e);
    }

    console.info('[FF County] shell ready', { slug, name });
  } catch (e) {
    console.warn('[FF County] dynamic item unavailable', e);
  }
});
