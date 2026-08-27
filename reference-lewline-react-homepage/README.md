# Reference: Lew-Line Workspace React Home Page

This folder is a **verbatim, inert copy** of the React home page source files from
the "Lew-Line workspace" v0 chat (repo `LewLine3/fence-frames-react-v0`,
branch `v0/lewline-52435401`).

**Nothing in this folder is wired into the live site.** These files are not
imported by `index.html`, `app.js`, or any build process in this repo. They
exist purely as a reference/staging copy so the standalone components (Hero,
FrameIt, FenceIt, FenceFolio, FinalCta, SiteNav, SiteFooter, ModalProvider,
etc.) can be reviewed, compared, or ported into this repo's stack later.

## Contents

- `components/ff/` — the page-section components (hero, frame-it, fence-it,
  fence-folio, final-cta, site-nav, site-footer, modal-provider)
- `components/ui/button.tsx` — shared button primitive (uses `@base-ui/react`,
  `class-variance-authority`, `clsx`, `tailwind-merge` — not installed in this
  repo yet)
- `lib/utils.ts` — `cn()` helper used by `button.tsx`
- `app/page.tsx` — how the above components are composed into the home page
- `app/layout.tsx` — root layout / metadata from the source project
- `app/globals.css`, `styles/ff-source.css`, `styles/ff-overrides.css` —
  the source project's Tailwind v4 + custom CSS (colors, corner marks, nav,
  modal, etc.)

## Notes

- These files assume a Next.js + Tailwind v4 + `@base-ui/react` environment.
  They will not run as-is in this static HTML/CSS repo.
- Image paths (e.g. `/images/hero-carousel/...`) reference assets that live in
  the source project, not this one.
- Do not import from this folder into any live page until a deliberate
  decision is made to port a given component into this repo's stack.
