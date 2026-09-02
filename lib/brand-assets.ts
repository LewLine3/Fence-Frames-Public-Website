/**
 * Brand mark paths — keep favicon (tiny) and display logo (mid/large) separate.
 * Favicon: committed trial orange dual-F for tabs / apple-touch / app icons.
 * Logo: detailed dual-F fence mark for nav, footer, and other mid-to-large placements.
 */
export const BRAND_ASSETS = {
  /** Mid-to-large UI logo (nav, footer, marketing chrome). */
  logo: '/images/brand/logo-dual-f.jpg',
  /** Tiny tab / device icons only — do not use as UI logo. */
  favicon: '/images/brand/favicon-trial-ff.png',
} as const
