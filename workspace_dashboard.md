---
title: "Fence Frames Public Website — Workspace Dashboard & Component Sync"
type: dashboard
category: fence-frames
updated: 2026-09-03
tags: [supabase, components, heritage, horizontal-fence, catalog, pricing, bom-engine, rls, auth-triggers]
---

# Fence Frames Public Website — Workspace Dashboard

**Focus:** Public web app (`Fence-Frames-Public-Website`), Next.js 16.3 Turbopack, Supabase unified master database (`hikpszwtglrkfgivcdaa`), component encyclopedia, multi-vendor pricing, canonical BOM calculation with 33.33% fastener waste logic, RLS policies, and lead persistence.

## Current State & Counts
- **Database Ref:** `hikpszwtglrkfgivcdaa` (`https://hikpszwtglrkfgivcdaa.supabase.co`)
- **Integration Test Suite:** `25 Passed, 0 Failed` (`node scripts/test-integration-post-migration.mjs`)
- **Canon Pricing Architecture:** **Dynamic Labor Math (V2.0)** is the **New Official Canon**. Both calculations (Dynamic Labor and Legacy Material Math) run concurrently on every calculation cycle. Client sees Dynamic Labor only (±15% range); Admin sees both side-by-side.
- **Components Active:** **52 catalog records** + **34 vector elevation variants** (Batch 1 Heritage V1 + Batch 2 Horizontal Fence Rancher, Homesteader, Horizontal Picket)
- **Batch 2 Architecture:**
  - **4ft Default Mandatory:** Board fences default to 48" height ($Y=30.00″$ post top, $Y=78.00″$ ground baseline).
  - **Window Spacing:** Triple rail divides into 3 equal $10.50″$ windows ($W_3 = (H - 16.50″) / 3$); 2-rail centers at window midpoints ($40.75″, 56.75″$); 4-rail splits into 4 equal $6.50″$ quadrants.
- **Vendor Price Points:** **186 prices** across Home Depot, Lowe's, Dunn Lumber, Chinook in `component_vendor_pricing`
- **Next.js App Router Endpoints:**
  - `GET /api/catalog` — Live component catalog & 4-vendor pricing from Supabase
  - `POST /api/bom` & `GET /api/bom` — Dual-calculation BOM takeoff (Dynamic Labor Canon + Legacy Admin Benchmark) with 33.33% fastener buffer & 4-vendor comparisons
  - `GET /api/leads` & `POST /api/leads` — Lead persistence & zero-fee anonymized board browsing
  - `POST /api/projects` & `POST /api/projects/claim` — Lead persistence & atomic `purchase_lead_seat` claim
- **Production Build:** `next build` passed with zero errors (`25/25` static/dynamic routes compiled cleanly)

## Dual-Calculation Directive & Dynamic Labor Engine
- **Official Canon (Client-Facing):** Dynamic Labor Schedule ($75.00/hr loaded trade rate, $30.00/hr installer wage):
  - Post hole excavation & concrete setting: $0.50$ hr / post ($38.00 / hole)
  - 2x4 rail framing: $0.10$ hr / LF ($7.50 / LF)
  - Infill assembly: $0.083$ hr / LF ($6.25 / LF for vertical pickets; $8.50 / LF for horizontal boards)
  - 2x4 top cap amortized: $0.073$ hr / board ($5.50 / board)
  - Picture-frame trim: $0.027$ hr / LF ($2.00 / LF)
  - Field stain application: $0.043$ hr / LF ($3.25 / LF)
  - Gates: 1.60 hrs ($120.00 walk gate); 3.20 hrs ($240.00 double drive gate)
  - Quote: $M + L + A$ where $A = (M + L) \times 0.15$. Display range: $\pm 15\%$.
- **Admin Benchmark (Internal Only):** Legacy Material-Focused Math ($L_{\text{legacy}} = M \times 2.0$, $A_{\text{legacy}} = (M + L_{\text{legacy}}) \times 0.15$). Executed concurrently on every run to track variances and protect contractor margins.

## Canonical Fastener Waste Logic (33.33% Contractor Buffer)
Codified in `lib/bom-engine.ts`:
- **Waste Multiplier:** `FASTENER_WASTE_MULTIPLIER = 1.3333` (+33.33% contractor buffer).
- **Framing Fasteners:** 6 screws/rail (toenail) or 6 screws/bracket (Simpson FB24Z / U-brackets). `bufferedFramingScrews = Math.ceil(rawFramingScrews * 1.3333)`.
- **Picket Fasteners:** 2 ring-shank nails per rail contact (6 nails/picket on 3-rail). `bufferedPicketNails = Math.ceil(rawPicketNails * 1.3333)`.
- **Trim Fasteners:** 16 washer screws/trim nails per board (11″ OC). `bufferedTrimFasteners = Math.ceil(rawTrimFasteners * 1.3333)`.

## Zero-Fee Lead Board Browsing & Contact Info Protection
- **Anonymized Lead Board:** Unauthenticated/anonymous contractors freely browse active leads with masked homeowner PII:
  - `homeowner_name`: `"Homeowner (Claim to View)"`
  - `homeowner_phone`: `"***-***-****"`
  - `homeowner_email`: `"contact@anonymized.fenceframes.com"`
  - `street_address`: `"Address on file (Claim to Unmask)"`
- **Claimed Ticket Unmasking:** Verified contractors holding an active ticket in `project_tickets` (or service role) automatically view full homeowner contact details.

## Fence-Folio Architectural Blueprint & Dossier (`fence-folio-blueprint-prototype.html`)
- **4-Sheet Continuous Plan Set:**
  - **Sheet A1 (Elevation & Materials):** Centered 96″ panel on `viewBox="0 0 196 78"` with balanced 3-left / 3-right 5-line specification callouts, authentic 15-pattern cedar flow-grain, and privacy-gapped pickets.
  - **Sheet S1 (Structural Framing X-Ray):** Thin-line CAD wireframe (`0.09`–`0.22` pen weights), muted architectural palette (slate `#0c131d`, bronze `#c28546`, galvanized `#cbd5e1`), centered `196 × 78` layout, Simpson FB24Z vs 45° toe-screw reactive toggle, and balanced specification cards.
  - **Sheet D1 (CAD Dimensions & Datums):** Centered `196 × 84` blueprint with thin-line dimension rulers, 96.00″ OC and 89.00″ clear bay spans, and attachment centerline badges.
  - **Sheet B1 (BOM Takeoff & Labor Dossier):** Pillar 1 material BOM with 33.33% contractor waste buffer, Pillar 2 loaded $75/hr labor schedule, and canonical quote math engine.
- **Print Preview Fit:** 100% exact 1-page fit per sheet for all 4 pages on 8.5″ × 11″ landscape (`diff: 0px`, `isOverflowing: false`).
- **Mirrored Locations:** `FenceBook/assets/fence-svg/`, `_Platform/demos/`, and `Fence-Frames-Public-Website/public/` (all SHA-256 verified).

