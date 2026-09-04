---
title: "Walkthrough — Post-Migration Integration Steps (Live Supabase Catalog, Multi-Vendor Pricing, Canonical BOM & RLS)"
type: reference
category: fence-frames
updated: 2026-09-03
tags: [walkthrough, supabase, catalog, pricing, bom, leads, rls, auth]
---

# Walkthrough — Post-Migration Integration Steps

## 2026-09-03 — Post-Migration Integration & Gap Closure (Supabase `hikpszwtglrkfgivcdaa`)

### 1. Supabase Master Database Review & Migration `20260903000004`
- **Reviewed Schema:** Inspected `hikpszwtglrkfgivcdaa` and verified completion of Batch 1 Heritage schema and 4-vendor pricing (`20260903000002_batch1_heritage_components.sql`).
- **Gap A Closed (Automatic Auth Trigger):**
  - Authored and applied trigger function `public.handle_new_user()` firing `AFTER INSERT ON auth.users`.
  - Automatically provisions a corresponding row in `public.profiles` (`auth_user_id`, `role`, `email`, `full_name`, `phone_e164`).
  - Supports SMS OTP, Magic Link, and OAuth with phone/email fallback.
- **Gap B Closed (Identity Table Row-Level Security & Anonymized Lead Board):**
  - Enabled RLS and created granular security policies on `profiles`, `contractors`, `contractor_credit_ledger`, `saved_designs`, `projects`, and `project_tickets`.
  - Contractors can only read and edit their own account profile and credit ledger.
  - Homeowners can only access and modify their own saved designs.
  - Created updatable `public.leads` view with an `INSTEAD OF INSERT` trigger to synchronize `quoted_mid_cents`, `quoted_low_cents`, and `quoted_high_cents` into `public.projects`.
  - **Zero-Fee Lead Board Browsing:** Masked PII (`homeowner_name = 'Homeowner (Claim to View)'`, `homeowner_phone = '***-***-****'`, `homeowner_email = 'contact@anonymized.fenceframes.com'`, `street_address = 'Address on file (Claim to Unmask)'`) for anonymous contractors, automatically unmasked only when a contractor holds an active claimed ticket in `project_tickets` or for admin users.
  - Updated `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` and `lib/supabase/client.ts` to the genuine Supabase anon key (`role: anon`) so client-side anonymous browsing correctly enforces RLS.

### 2. Next.js App Router API Routes
- **`GET /api/catalog` ([`app/api/catalog/route.ts`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/app/api/catalog/route.ts)):**
  - Pulls live component catalog data from `component_encyclopedia` joined with `component_vendor_pricing(*)`.
  - Aggregates multi-vendor price points across Home Depot, Lowe's, Dunn Lumber, and Chinook Lumber.
  - Supports query filters: `category`, `sku`, `heritage_only`.
- **`POST /api/bom` & `GET /api/bom` ([`app/api/bom/route.ts`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/app/api/bom/route.ts)):**
  - Implements the Canonical BOM & Fastener Waste Engine ([`lib/bom-engine.ts`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/lib/bom-engine.ts)).
  - Calculates physical quantities: bays, posts (+1 Boundary Post Law), rails, rail caps, pickets (with Board-on-Board 1.25× overlap factor or Shadowbox alternation), caps, concrete, and crushed aggregate base.
  - **Canonical 33.33% Fastener Waste Logic:**
    - Framing Screws: `6/rail` (toenail) or `6/bracket` with `+33.33% contractor buffer`.
    - Picket Fasteners: `2 nails/rail contact` (6/picket on 3-rail) with `+33.33% contractor buffer`.
    - Trim Fasteners: `16 screws/board` with `+33.33% contractor buffer`.
  - Computes raw material cost (MC) across all 4 vendors, burdened materials ($M = MC \times 1.25$), labor ($L = M \times 2.0$), admin ($A = (M + L) \times 0.15$), and canonical estimate range ($quoted\_mid = M + L + A$, display low $-15\%$, display high $+15\%$).
- **`GET /api/leads` & `POST /api/leads` ([`app/api/leads/route.ts`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/app/api/leads/route.ts)):**
  - Full lead record persistence with quote mid, low, and high ranges directly stored and queryable via `leads`.

### 3. Client-Side Configurator & Blueprint Takeoff Integration
- **Estimate Bar ([`components/designer/estimate-bar.tsx`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/components/designer/estimate-bar.tsx)):**
  - Wired live reactive BOM drawer: clicking "📋 Material" fetches live Supabase takeoff from `/api/bom`.
  - Features real-time multi-vendor toggle tabs (`Home Depot`, `Lowe's`, `Dunn Lumber`, `Chinook`, `Lowest Price`).
  - Renders line-item takeoff with "+33.33% contractor buffer" badges on all fastener lines.
- **Fence-Folio Blueprint Page ([`app/blueprint/page.tsx`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/app/blueprint/page.tsx)):**
  - Section 2 (Material Cost) upgraded to display the live itemized BOM takeoff with 33.33% contractor buffer tags and multi-vendor selector tabs.

### 4. Verification & Testing
- **Automated Integration Test Suite ([`scripts/test-integration-post-migration.mjs`](file:///d:/Lew-Line-Workspaces/FenceBook/scripts/test-integration-post-migration.mjs)):**
  - Ran against live Supabase database `hikpszwtglrkfgivcdaa`:
    - Test 1: Live catalog & 4-vendor pricing extraction (`4/4 vendors confirmed`).
    - Test 2: Canonical 33.33% fastener waste calculation & quote math formulas.
    - Test 3: Lead record persistence in `leads` table with quote mid/low/high ranges and `quoted_mid_cents` synchronization into `projects`.
    - Test 4: Anonymous PII masking on lead board browsing vs unmasking.
    - Test 5: Automatic profile generation trigger & `purchase_lead_seat` RPC validation.
  - **Result: 22 Passed, 0 Failed.**
- **Production Build:** Ran `next build` in `Fence-Frames-Public-Website` — compiled 25/25 routes with zero errors.
- **Multi-Repo Synchronization:** Committed and pushed to `FenceBook` (`main`) and `Fence-Frames-Public-Website` (`staging`).
