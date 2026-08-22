/**
 * TEMPLATE — Community dynamic item page (Si View stub first)
 * Spec: Design/FenceBook/wix-pages/specs/community.md
 * Copy into generated dynamic page file after Studio sync.
 */

import {
  applyCommunitySeoGate,
  applyDisclaimerCopy,
  wireCommunityCtas,
} from 'public/ffGeoShell';
import { hideMediaEnginePlaceholders } from 'public/ffSiteChrome';

$w.onReady(async function () {
  applyDisclaimerCopy();
  hideMediaEnginePlaceholders(['btnPacketDownload', 'btnBrochureDownload', 'btnDesignSummary']);

  try {
    const item = await $w('#dynamicDataset').getCurrentItem();
    const name = (item && item.name) || 'Community';
    const locationLabel = (item && item.locationLabel) || '';
    const seoStatus = (item && item.seoStatus) || 'coming_soon';
    const preset = (item && item.configuratorPresetId) || '';

    applyCommunitySeoGate(seoStatus);

    try {
      const title = $w('#pageTitle');
      if (title && 'text' in title) title.text = name;
    } catch (e) {
      /* optional */
    }

    try {
      const sub = $w('#locationLabel');
      if (sub && 'text' in sub) sub.text = locationLabel;
    } catch (e) {
      /* optional */
    }

    try {
      const badge = $w('#partnershipBadge');
      if (badge && 'text' in badge) {
        badge.text =
          seoStatus === 'live' ? 'Community guide' : 'Research / guide stub';
      }
    } catch (e) {
      /* optional */
    }

    try {
      const fact = $w('#factMatrix');
      if (fact && 'text' in fact && !(fact.text || '').trim()) {
        fact.text =
          'Community fence standards summary coming soon. Use Design to explore approved options when a preset is available.';
      }
    } catch (e) {
      /* optional */
    }

    wireCommunityCtas({ configuratorPresetId: preset });

    console.info('[FF Community] shell ready', {
      slug: item && item.slug,
      seoStatus,
      hasPreset: Boolean(String(preset).trim()),
    });
  } catch (e) {
    console.warn('[FF Community] dynamic item unavailable', e);
  }
});
