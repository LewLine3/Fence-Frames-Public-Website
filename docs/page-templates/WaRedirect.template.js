/**
 * TEMPLATE — static page slug `wa` (path /wa)
 * S1: 301-equivalent client redirect → /wa/king-county
 *
 * Studio: Add blank page, set URL to /wa, sync, paste into generated page file.
 * Prefer Wix SEO redirect / router 301 when available; this is the Velo stub.
 */

import wixLocation from 'wix-location';
import { FF_COUNTY_HUB } from 'public/ffRedirectMap';

$w.onReady(function () {
  wixLocation.to(FF_COUNTY_HUB);
});
