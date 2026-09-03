---
title: "FenceBook Workspace Dashboard — Supabase Master DB & Component Catalog"
type: dashboard
category: fence-frames
updated: 2026-09-03
tags: [supabase, components, heritage, pilot, catalog, pricing]
---

# FenceBook Workspace Dashboard — Supabase Master Database

**Focus:** Supabase unified master database (`hikpszwtglrkfgivcdaa`), component encyclopedia, multi-vendor pricing, and pilot previews.

## Current State & Counts
- **Database Ref:** `hikpszwtglrkfgivcdaa` (`https://hikpszwtglrkfgivcdaa.supabase.co`)
- **Validation Suite:** `23 Passed, 0 Failed` (`node scripts/verify-supabase-master.mjs`)
- **Components Active:** **38 components** across 7 categories in `component_encyclopedia`
- **Vendor Price Points:** **130 prices** across Home Depot, Lowe's, Dunn Lumber, Chinook in `component_vendor_pricing`
- **Storage Assets:** **25 SVGs** active in public `component-svgs` bucket
- **Communities & Slots:** 4 Snoqualmie Valley HOAs (Si View, Forster Woods, Riverbend, Snoqualmie Ridge); 6 active Si View CC&R slots

## Latest Migrations & Tools
1. [`20260903000001_unified_master_schema.sql`](file:///d:/Lew-Line-Workspaces/FenceBook/supabase/migrations/20260903000001_unified_master_schema.sql) — 5 core domains & atomic stored procedures
2. [`20260903000002_batch1_heritage_components.sql`](file:///d:/Lew-Line-Workspaces/FenceBook/supabase/migrations/20260903000002_batch1_heritage_components.sql) — Batch 1 Heritage V1 full component suite & 4-vendor pricing
3. [`upload-batch1-svgs.mjs`](file:///d:/Lew-Line-Workspaces/FenceBook/scripts/upload-batch1-svgs.mjs) — Automated SVG uploader to Supabase Storage
4. [`batch1-component-test-studio.html`](file:///d:/Lew-Line-Workspaces/FenceBook/assets/fence-svg/batch1-component-test-studio.html) — Interactive component tester with live SVG elevation & canonical quote math
5. [`fence-folio-blueprint-prototype.html`](file:///d:/Lew-Line-Workspaces/FenceBook/assets/fence-svg/fence-folio-blueprint-prototype.html) — Single scrollable 4-sheet architectural plan set (A1 Elevation, S1 Framing & Fasteners X-Ray, D1 Dimensions, B1 BOM Takeoff with 33.33% fastener waste & discrete labor)

## Sync & Deployment Status
- **FenceBook**: `main` branch up-to-date (`bf50dc0`) pushed to GitHub.
- **Fence-Frames-Public-Website**: Both `staging` and `main` branches up-to-date (`861c143`) pushed to GitHub.
- **Design**: `main` branch up-to-date (`7e67db3`) pushed to GitHub.
- **Public Prototype Route**: `http://localhost:8080/fence-folio-blueprint-prototype.html` or `http://localhost:3000/fence-folio-blueprint-prototype.html`.

## Deployment Pipeline Protocol (Standard Operating Law)
For all component batches, schemas, and configurator enhancements:
1. **Trial & Asset Build on FenceBook**: Build SVG assets, test manifest coordinates, and construct Supabase migration.
2. **Supabase Cloud Execution**: Apply SQL migration to `hikpszwtglrkfgivcdaa` and upload SVGs to `component-svgs` bucket.
3. **Public Website Mirror & Verification**: Copy test studios and mirror migrations to `Fence-Frames-Public-Website`, run Next.js production verification (`corepack pnpm build`).
4. **Synchronized Push**: Commit and push to `FenceBook/main`, `Fence-Frames-Public-Website/staging`, and `Fence-Frames-Public-Website/main` in lockstep.

## Synchronized Vector Component & Elevation Standard (`104 × 78` & Shell Law)
Codified in `.agents/AGENTS.md`:
- **Canvas Size**: `104 × 78 in` (`viewBox="0 0 104 78"`), 100% transparent background (no baked sky).
- **Aspect Ratio**: Exact **$4:3$ multiplier** preserved from base $96 \times 72$ panel ($104 / 78 = 4/3$).
- **Horizontal Bounds (X: 0 → 104″)**:
  - `0 → 4.00″`: Left breathing room margin ($4.00″$).
  - `4.00″ → 100.00″`: **$96.00″$ Fence Core**. Left edge of left post shell at $X = 4.00″$; right edge of right post shell at $X = 100.00″$.
  - `100.00″ → 104.00″`: Right breathing room margin ($4.00″$).
- **Vertical Bounds (Y: 0 → 78″)**:
  - `0 → 6.00″`: **Cap Headroom**. $6.00″$ vertical clearance for caps (pyramids, solar LEDs, finials). $Y = 0.00″$ is absolute cap ceiling.
  - `6.00″ → 78.00″`: **$72.00″$ Fence Height** ($6\text{ ft}$ panel). Post tops & rail cap sit at $Y = 6.00″$; bottom of posts, trim, and pickets reach ground baseline at $Y = 78.00″$.
  - `Y = 78.00″`: **Ground Baseline**. Absolute bottom of canvas; **zero added height below**.
- **The Shell Law**: All dimensional coordinates measure to the outer edge of the component black shell (`#000000`). Inner wood fills are inset by $0.1875″$ ($3/16″$). No SVG strokes used for geometry.
- **2-Pass Rendering Architecture (Shells → Details)**:
  - **Pass 1 (Structural Silhouette)**: All black shells render together, merging overlapping joints into a solid frame without collision lines.
  - **Pass 2 (Surface & Color Details)**: Inset wood fills, wood grain/knots, and hardware fasteners render in place. Two-Tone (black frame + honey cedar pickets) is natively supported by separating framing shells from picket details.

## Next Pilot Batch
- **Batch 2:** Horizontal Fence (HF) — Rancher (`HSB-RNCH`), Homesteader (`HSB-HMST`), & Horizontal Picket (`HPF-HPKT`)
  - Authored natively on the **`104 × 78` Transparent Standard** with double-layer black shells.
  - 4×6 posts (wide-face 5.5″), 2×6 split horizontal boards, 2×4 boards, HeadLOK structural timber screws, horizontal gap spacers, 4×6 post caps.
  - Linked to `HORIZONTAL_BOARDS_INFILL` labor schedule ($8.50/LF) and `style_recipes`.

