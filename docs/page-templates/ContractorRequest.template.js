/**
 * TEMPLATE — /contractors/request (homeowner contractor contact stub)
 *
 * Studio: create blank page URL /contractors/request · sync · paste.
 * Not a public contractor directory. Gate B: prompt login before real submit (P3).
 *
 * Form element IDs (match Home demo):
 *   #reqName #reqEmail #reqZip #reqDesign #reqTimeline #reqOptIn
 *   #btnContractorSubmit
 */

import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import { wireSiteChrome, FF_PATHS } from 'public/ffSiteChrome';

$w.onReady(function () {
  wireSiteChrome();

  try {
    const submit = $w('#btnContractorSubmit');
    if (submit) {
      submit.onClick(async () => {
        try {
          const loggedIn = await wixUsers.currentUser.loggedIn;
          if (!loggedIn) {
            await wixUsers.promptLogin();
          }
          // P3: create lead / notify — stub for now
          console.info('[FF contractors] request submitted (stub)');
          wixLocation.to(FF_PATHS.home);
        } catch (e) {
          console.warn('[FF contractors] login/submit cancelled', e);
        }
      });
    }
  } catch (e) {
    /* page not wired yet */
  }

  console.info('[FF ContractorRequest] stub ready');
});
