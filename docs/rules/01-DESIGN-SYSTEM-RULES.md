# 🎨 Rule 01: Typography Hierarchy & Text Token Architecture

## 1. Heading Scale (Rowdies Bold 700 & Regular 400)
- **H1 (Hero & Page Title)**: `2.3rem–2.8rem` (Bold 700) — Single H1 per page.
- **H2 (Section Landmarks)**: `1.8rem–2.2rem` (Bold 700) — Major 3-pillar section dividers.
- **H3 (Cards & Modules)**: `1.25rem–1.5rem` (Bold 700) — Graduated card titles, dossier chapter names.
- **H4 (Sub-Panels & Groups)**: `1.05rem–1.2rem` (Regular 400 / Bold 700) — Takeoff groups, materials schedules.
- **H5 (Technical Headers)**: `0.9rem–1.0rem` (Regular 400) — Form fieldsets, specification labels.
- **H6 (Micro Headers)**: `0.75rem–0.85rem` (Bold 700, Uppercase) — Step badges, sub-ledger tags.

## 2. Body Text Scale (Rowdies Light 300 & Regular 400)
- **P1 (Lead / Subhead Paragraph)**: `1.15rem–1.25rem` (Light 300) — Hero narrative intro, flagship value statements.
- **P2 (Standard Body Copy)**: `0.95rem–1.05rem` (Light 300) — Explainer paragraphs, card body copy, about text.
- **P3 (Compact Explainer)**: `0.85rem–0.92rem` (Light 300) — Docked explainer plates, modal descriptions.
- **P4 (Fine Print & Line-Items)**: `0.75rem–0.82rem` (Light 300) — Takeoff line-items, CAD ruler captions, legal notes.
- **P-Badge / Tag**: `0.75rem–0.85rem` (Regular 400) — Pill badges, ZIP tags, contractor seats.

## 3. The 3-Pillar Color Mapping
- **Find It (Step 1 · Location / HOA)**: Sun Gold (`#E5B842` / `var(--gold-sun)`).
- **Frame It (Step 2 · Designer / Catalog)**: Ember Orange (`#F27A22` / `var(--ember)`).
- **Fence It (Step 3 · Blueprint / Pricing)**: Forest Green (`#16432D`) / Bright Green (`#4ADE80`).

## 4. Outside Corner Marker Law
- 50% wall span termination with longer docked taper touching card edges (`.has-outside-corners`, `.corner-mark-out`).

## 5. Status Badges & "Unlocking Soon" Staging Overlays
For features launching in Tier 2 (like the Guided Wizard or Contractor 3-Seat Scramble), use these locked status badges:

### A. The Corner Badge (`.badge-status`)
- `.badge-status.badge-coming-soon`: Sun Gold fill or outline, black text, 10px uppercase, Rowdies 400.
  - Text: `⚡ UNLOCKING SOON` or `🔒 PHASE 2 BETA`
- `.badge-status.badge-active`: Bright Green fill (`#4ADE80`), black text.
  - Text: `● LIVE` or `✓ HOA APPROVED`

### B. The Interactive Lead-Capture Pattern
- Keep the button clickable! When clicked, open the `#modal-coming-soon` modal:
  *"This module unlocks in Phase 2. Enter your phone/email to get notified when it goes live."*
