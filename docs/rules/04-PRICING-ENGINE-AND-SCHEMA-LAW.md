# 💰 Rule 04: Pricing Engine & Database Schema Law

## 1. Decoupled Pricing Engine (`lib/pricing-engine.ts`)
- Zero math hardcoded in visual buttons or canvas files.
- UI passes active selections -> `calculateProjectPricing(spec)` returns line items.
- Upgrading to Option-Set labor math is a 1-file swap with zero UI rework.

## 2. Database Structure (Supabase / Airtable)
- `components`: Part keys, unit materials cost, unit labor rates, SVG paths.
- `labor_rates`: Discrete labor schedule per post, per LF framing, per LF cladding, per gate.
- `hoa_communities`: Bylaws, height limits, pre-approved design IDs, ARC contacts.
- `contractor_roster`: Claimed cities, license numbers, phone numbers for 3-seat scramble.
