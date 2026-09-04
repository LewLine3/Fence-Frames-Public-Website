---
title: "Fence Frames Public Website — Workspace Dashboard & Component Sync"
type: dashboard
category: fence-frames
updated: 2026-09-03
tags: [supabase, components, heritage, horizontal-fence, rancher, homesteader, horizontal-picket, catalog, pricing]
---

# Fence Frames Public Website — Workspace Dashboard

**Focus:** Public web app (`Fence-Frames-Public-Website`), Next.js 16.3 Turbopack, Supabase unified master database (`hikpszwtglrkfgivcdaa`), component encyclopedia, multi-vendor pricing, Batch 2 Horizontal Fence (HF), and pilot previews.

## Current State & Counts
- **Database Ref:** `hikpszwtglrkfgivcdaa` (`https://hikpszwtglrkfgivcdaa.supabase.co`)
- **Validation Suite:** `23 Passed, 0 Failed` (`node scripts/verify-supabase-master.mjs`)
- **Components Active:** **52 components** across 8 categories in `component_encyclopedia` (Batch 1 Heritage V1 + Batch 2 Horizontal Fence)
- **Vendor Price Points:** **186 prices** across Home Depot, Lowe's, Dunn Lumber, Chinook in `component_vendor_pricing`
- **Storage Assets:** **42 SVGs** active in public `component-svgs` bucket (25 Batch 1 + 17 Batch 2)
- **Style Recipes Active:** **24 recipes** across `heritage-v1`, `rancher-v1` (`HSB-RNCH`), `homesteader-v1` (`HSB-HMST`), and `horizontal-picket-v1` (`HPF-HPKT`)
- **Communities & Slots:** 4 Snoqualmie Valley HOAs (Si View, Forster Woods, Riverbend, Snoqualmie Ridge); 6 active Si View CC&R slots
- **Production Build:** `corepack pnpm build` passed (25/25 static pages compiled in 6.6s)

## Latest Migrations & Tools
1. [`20260903000001_unified_master_schema.sql`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/supabase/migrations/20260903000001_unified_master_schema.sql) — 5 core domains & atomic stored procedures
2. [`20260903000002_batch1_heritage_components.sql`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/supabase/migrations/20260903000002_batch1_heritage_components.sql) — Batch 1 Heritage V1 full component suite & 4-vendor pricing
3. [`20260903000003_batch2_horizontal_fence_components.sql`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/supabase/migrations/20260903000003_batch2_horizontal_fence_components.sql) — Batch 2 Horizontal Fence (HF) full component suite (4×6 posts, 2×6 split boards, 2×4 center trim, HeadLOK timber screws, 4×6 caps), 4-vendor pricing, and style recipes for Rancher (`HSB-RNCH`), Homesteader (`HSB-HMST`), and Horizontal Picket (`HPF-HPKT`)
4. [`batch2-component-test-studio.html`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/public/batch2-component-test-studio.html) — Interactive Batch 2 component tester with live SVG elevation, 2-pass shell/details toggle, blueprint dimension X-ray, multi-vendor pricing & canonical quote math
5. [`fence-folio-blueprint-prototype.html`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/public/fence-folio-blueprint-prototype.html) — Polished 4-sheet architectural plan set: Sheet A1 with centered 96″ fence panel, balanced dual-sided 5-line specification callouts (3 Left, 3 Right: `Material`, `Species`, `Dimensions`, `Detail`, `Stain`), authentic 15-pattern picket system (only 4 sparse knots across 16 pickets, non-repeating wavy cedar grain, pronounced dark vertical seam gaps, and cohesive low-contrast cedar palette); Sheet S1 Framing & Fasteners X-Ray with reactive 45° toe-screw vs Simpson FB24Z toggle; Sheet D1 Dimensions & Section Details; Sheet B1 BOM Takeoff with 33.33% fastener waste & $75/hr labor schedule. Strict 8.5" × 11" landscape 1-page per sheet printing with zero overflow. Mirrored from `FenceBook` source of truth.

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
  - **Pass 1 (Structural Silhouette)**: All black shells render together, merging overlapping joints (horizontal members extend $0.1875″$ into post shells) into a solid frame without collision lines.
  - **Pass 2 (Surface & Color Details)**: Inset wood fills, wood grain/knots, and hardware fasteners (HeadLOK timber screws) render in place. Two-Tone is natively supported.

## Batch 2 Styles & Specifications
- **Rancher (`HSB-RNCH`)**: 4×6 posts (5.5″ wide face), 3× 2×6 Western Red Cedar horizontal boards in tight vertical butt stack (bottom-anchored at Y=60..76.5), 2×4 center vertical stiffener trim batten (X=50.25..53.75), FastenMaster HeadLOK 2-7/8″ structural timber screws, 4×6 pyramid caps.
- **Homesteader (`HSB-HMST`)**: 4×6 posts (5.5″ wide face), 3× 2×6 split horizontal boards with equal 13.875″ open view gaps, 2×4 center vertical trim, HeadLOK screws, 4×6 pyramid caps.
- **Horizontal Picket (`HPF-HPKT`)**: 4×6 posts (5.5″ wide face), 12× 1×6 horizontal cedar pickets with contemporary 0.5″ reveal gaps, 2×4 center vertical trim, HeadLOK screws, 4×6 pyramid caps.

## Sync & Deployment Status
- **FenceBook**: `main` branch up-to-date with Batch 1 backcheck (dog-eared & gothic pickets with 15 multi-variant grain patterns), Batch 2 procedural flow-grain alignment (harmonic sine waves, 4-ring knot deflectors, top sheen band), `CANON-SVG-ART-STYLE-GUIDE.md`, updated handbook docs, and refreshed Supabase Storage bucket.
- **Fence-Frames-Public-Website**: Mirrored to `public/configure/heritage-v1/components/`, `public/assets/fence-svg/`, `docs/CANON-SVG-ART-STYLE-GUIDE.md`, `supabase/migrations/`, and verified with `corepack pnpm build` (25/25 static routes). Pushed to `staging` and `main` branches.
- **Public Prototype Routes**:
  - `http://localhost:3000/batch2-component-test-studio.html`

