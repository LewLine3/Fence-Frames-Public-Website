---
title: "Walkthrough — Tier-1 HTML-first session"
type: reference
category: fence-frames
updated: 2026-08-26
tags: [walkthrough, tier-1, auth-gate]
---

# Walkthrough

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

## Next
- Owner Keep/Park on Auth Gate → then CORE-03 Blueprint.
