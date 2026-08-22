/**
 * TEMPLATE — City dynamic item page
 * Spec: Design/FenceBook/wix-pages/specs/city.md
 * Copy into generated dynamic page file after Studio sync.
 */

import wixLocation from 'wix-location';
import { FF_PATHS } from 'public/ffSiteChrome';
import {
  applyDisclaimerCopy,
  communityCardBehavior,
  toggleMunicipalSummary,
  buildCommunityPath,
} from 'public/ffGeoShell';

const MEGA_PSEUDO_CITIES = new Set([
  'klahanie',
  'snoqualmie-ridge',
  'issaquah-highlands',
  'lakeland-hills',
  'redmond-ridge',
  'trilogy-at-redmond-ridge',
]);

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
    const name = (item && item.name) || 'City';
    const citySlug = (item && item.slug) || '';
    const countySlug =
      (item && item.county && item.county.slug) ||
      (item && item.countySlug) ||
      'king-county';

    try {
      const title = $w('#pageTitle');
      if (title && 'text' in title) {
        title.text = MEGA_PSEUDO_CITIES.has(citySlug)
          ? `${name} — fence standards & community guide`
          : `${name}, WA — fence & community guides`;
      }
    } catch (e) {
      /* optional */
    }

    try {
      const intro = $w('#introCopy');
      if (intro && 'text' in intro) {
        intro.text = `Browse fence standards guides for communities in ${name}.`;
      }
    } catch (e) {
      /* optional */
    }

    try {
      const heading = $w('#communitiesHeading');
      if (heading && 'text' in heading) heading.text = `Communities in ${name}`;
    } catch (e) {
      /* optional */
    }

    toggleMunicipalSummary('municipalSummary', item && item.municipalSummary);

    // Studio dataset should filter Communities where parentCity = current.
    // onItemReady example for card rules:
    try {
      const repeater = $w('#communityRepeater');
      if (repeater && typeof repeater.onItemReady === 'function') {
        repeater.onItemReady(($item, itemData) => {
          const behavior = communityCardBehavior(itemData);
          try {
            const badge = $item('#cardBadge');
            if (badge && 'text' in badge) badge.text = behavior.badge;
          } catch (e) {
            /* optional */
          }
          try {
            const design = $item('#cardDesignCta');
            if (design) {
              if (behavior.showDesignCta) {
                if (typeof design.expand === 'function') design.expand();
                design.onClick(() => {
                  const preset = itemData.configuratorPresetId;
                  wixLocation.to(
                    preset
                      ? `${FF_PATHS.configure}?community_preset=${encodeURIComponent(preset)}`
                      : FF_PATHS.configure,
                  );
                });
              } else if (typeof design.collapse === 'function') {
                design.collapse();
              }
            }
          } catch (e) {
            /* optional */
          }
          try {
            const link = $item('#cardLink');
            if (link && behavior.linkToCommunity) {
              const href = buildCommunityPath(countySlug, citySlug, itemData.slug);
              link.onClick(() => wixLocation.to(href));
            }
          } catch (e) {
            /* optional */
          }
        });
      }
    } catch (e) {
      console.info('[FF City] bind communityRepeater in Studio', e.message || e);
    }

    console.info('[FF City] shell ready', { citySlug, name });
  } catch (e) {
    console.warn('[FF City] dynamic item unavailable', e);
  }
});
