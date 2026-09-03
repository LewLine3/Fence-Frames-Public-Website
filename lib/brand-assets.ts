/**
 * Brand mark paths — keep favicon (tiny) and display logo (mid/large) separate.
 * Favicon: boxed trial dual-F for tabs / apple-touch / app icons.
 * Logo: transparent dual-F fence mark for nav, footer, and other mid-to-large placements.
 */
export const BRAND_ASSETS = {
  /** Mid-to-large UI logo (nav, footer, marketing chrome) — transparent PNG. */
  logo: '/images/brand/logo-dual-f.png',
  /** Tiny tab / device icons only — boxed mark is OK here. */
  favicon: '/images/brand/favicon-trial-ff.png',
} as const
