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

## Sync & Deployment Status
- **FenceBook**: `main` branch up-to-date (`7c56be4`) pushed to GitHub.
- **Fence-Frames-Public-Website**: Both `staging` and `main` branches up-to-date (`7690edd`) pushed to GitHub. Next.js production build verified (25/25 routes).
- **Public Studio Route**: `https://<public-domain>/batch1-component-test-studio.html` or `http://localhost:3000/batch1-component-test-studio.html`.

## Deployment Pipeline Protocol (Standard Operating Law)
For all component batches, schemas, and configurator enhancements:
1. **Trial & Asset Build on FenceBook**: Build SVG assets, test manifest coordinates, and construct Supabase migration.
2. **Supabase Cloud Execution**: Apply SQL migration to `hikpszwtglrkfgivcdaa` and upload SVGs to `component-svgs` bucket.
3. **Public Website Mirror & Verification**: Copy test studios and mirror migrations to `Fence-Frames-Public-Website`, run Next.js production verification (`corepack pnpm build`).
4. **Synchronized Push**: Commit and push to `FenceBook/main`, `Fence-Frames-Public-Website/staging`, and `Fence-Frames-Public-Website/main` in lockstep.

## Next Pilot Batch
- **Batch 2:** Horizontal Fence (HF) — Rancher (`HSB-RNCH`), Homesteader (`HSB-HMST`), & Horizontal Picket (`HPF-HPKT`)
  - 4×6 posts (wide-face 5.5″), 2×6 split horizontal boards, 2×4 boards, HeadLOK structural timber screws, horizontal gap spacers, 4×6 post caps.
  - Linked to `HORIZONTAL_BOARDS_INFILL` labor schedule ($8.50/LF) and `style_recipes`.
