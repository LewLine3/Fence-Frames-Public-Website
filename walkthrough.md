---
title: "Walkthrough — Frame hub + prior sessions"
type: reference
category: fence-frames
updated: 2026-09-03
tags: [walkthrough, frame, hub]
---

# Walkthrough

## 2026-09-03 — Frame hub: drop comparison fluff

- Removed comparison matrix (2D CAD / timing / slider fluff).
- Folded “best for” + plain bullets into Catalog / Designer / Wizard cards; larger previews.
- No bottom fluff row — pathway cards carry the useful bits only.

## 2026-09-03 — Frame hub layout (catalog up)

- Reworked [`app/frame/page.tsx`](app/frame/page.tsx) so it no longer mirrors the homepage 3-equal-card grid.
- **Top row:** guidance plate (start with Catalog → Designer/Wizard or Fence-Folio) + Catalog card.
- **Bottom row:** Designer + Wizard at full half-width each.
- Fixed main-card padding (removed oversized `p-6/sm:p-10` + clipped `overflow-hidden` on cornered plates).
- Dropped unused style-filter chips and comparison matrix for a cleaner hub.
- Responsive stack via `.frame-hub-top` / `.frame-hub-tools` in `styles/ff-overrides.css`.

## 2026-08-26 — Session start (ROXY starter)

- Loaded [`ROXY-new-chat-starter.md`](docs/plans/ROXY-new-chat-starter.md) + active Tier-1 plan.
- Git: on **`staging`** tracking `origin/staging`. Dirty tree (many HTML wireframes + untracked `app/log-in/`, nav/footer elems, etc.).
- Confirmed Batch 1 turn 1 = **CORE-02 Auth Gate `/log-in`**.
- Findings before Keep:
  - `public/auth-gate.html` = Phase 1 shell (guest draft + SMS OTP UI) but **no** `data-interactive-target` markers yet.
  - Corners are 24px L-marks (not 50% wall-span law).
  - Footer still says “Authored by Two Lew Builders LLC” (brand firewall violation).
  - `app/log-in/page.tsx` already has a full React OTP prototype (ahead of Phase 1 HTML-first cadence).

## 2026-08-26 — CORE-02 Auth Gate Phase 1 (Keep candidate)

- Restyled `public/auth-gate.html` (+ root copy) with **Live Demos ELEM-01** header/footer chrome (`element-header-footer.html` pattern: forest nav + wood brand + ember strip + 4-col footer).
- Added `data-interactive-target` hooks: `auth.draft-summary`, `auth.sign-in-card`, `auth.phone-form`, `auth.phone`, `auth.send-otp`, `auth.otp`, `auth.otp-digits`, `auth.verify`.
- Outside corners → **50% wall-span** `.corner-mark-out` (DESIGN-RULES).
- Footer brand line: Fence Frames only (no TLB wordmark).
- `/log-in` and `/auth-gate` redirect → `/auth-gate.html` (HTML-first).

## 2026-08-26 — Auth Gate card correction (inventory studio)

- Cards now match `12-component-inventory-studio.html`:
  - Draft: **black wood** (`black-wood-grain-h.png`) + opaque **mint** inner plate (black + gold/forest text)
  - Sign-in: **wet wood** (`Wood-wet-card-background.jpg`) + opaque ivory wrap (no transparent grid)
  - Corners: **two diagonal only** (draft TR+BL / sign-in TL+BR), inventory 33% / 5.5px dock outside border

## 2026-08-27 — Auth Gate footer crush + draft CAD grid

- Footer options → Rowdies Light @ ~0.7rem; brand glued to ©/King County (~2px); cols→brand ~3px.
- Draft black plate: beat `styles.css` `.card-solid` cover/min-height; denser white/gold CAD grid (48/16) so frame gutters read.

## 2026-08-31 — Incident Fix: Local File Navigation & Offline Preview

- **Incident:** Opening demo/studio directly from local disk via `file:///` protocol resulted in a blank preview screen, and clicking the top-left Fence Frames logo navigated to `file:///D:/` (browser local directory listing of the D: drive).
- **Diagnosis:**
  1. **Security / Privacy:** Confirmed 100% strictly local to the user's browser. No data was transmitted online. The browser's native `file:///` scheme resolved `<a href="/">` to the local drive root (`file:///D:/`).
  2. **Blank Screen Cause:** `founder-preflight-studio.html` used absolute iframe root paths (`/homepage.html`) and relied on `/api/registry`. When opened without an HTTP server (`file:///`), the iframe resolved to `file:///D:/homepage.html` (missing) and fetch failed.
- **Fixes Applied:**
  1. Created `public/homepage.html` as the standard landing target.
  2. Updated `server.js` to seamlessly resolve static assets from both workspace root and `public/`.
  3. Added `file:` protocol safeguards to `founder-preflight-studio.html`, `demo-founder-preflight.html`, and `ff-site-header.js` (`event.preventDefault()` to prevent drive-root navigation).
  4. Added `DEFAULT_PAGES` offline fallback and relative path resolution in `founder-preflight-studio.html`.
  5. Updated `artifact-triage-studio.html` modal preview to resolve relative URLs when opened via `file:`.

## Next
- Owner Keep/Park on Auth Gate → then CORE-03 Blueprint.
