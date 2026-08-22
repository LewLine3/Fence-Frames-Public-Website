# `PRO-05`: ⚡ Targeted Match SMS Scramble Specification

> **Page ID**: `PRO-05`  
> **Route**: `/contractor/match` & `/contractor/match/[jobId]` (`app/contractor/match/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟢 Fence It & SMS Lead Scramble (Bright Forest Green `#4ADE80`)  
> **Status**: 🟠 **In Progress**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The dedicated, high-urgency claim screen triggered when a homeowner saves a verified fence build. Dispatches instant SMS alerts via Telnyx to verified contractors servicing that exact municipality.
- **The Capped 3-Seat Scramble Engine**:
  - The first 3 contractors who click the SMS link and claim a seat ($19–$49) receive exclusive access to the homeowner's contact information, official 8.5x11 ARC blueprint, and itemized lumber BOM.
  - Once 3 seats are filled, the scramble is permanently locked, preventing lead oversaturation and ensuring homeowners receive competitive bids without getting spam calls.
- **Zero-Speculation Guarantee**: Contractors only bid on jobs with pre-agreed dimensions, verified HOA approval, and complete material takeoffs.

---

## 2. Design System & Homepage Theme Alignment
Inherits the full homepage visual identity and Design System Law:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Scramble headline (*"⚡ 3-SEAT LEAD SCRAMBLE ACTIVE"*), live timer digits (`23:42`), claim CTA button.
  - `Rowdies Regular (400)`: Seat status indicators, price per foot badges, property specs.
  - `Rowdies Light (300)`: Lead verification details, homeowner notes, terms of service.
- **Color Palette & Theme Tokens**:
  - Primary Accent: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Urgency Accent: Ember Orange (`#F27A22` / `var(--ember)`).
  - Seat Open Highlight: Sun Gold (`#E5B842` / `var(--gold-sun)`).
  - Background Ground: Dark Ink (`#141B16`) with 25px minor / 100px major drafting grid.
  - Cards: High-res Cedar Wood Grain cards with solid `#141B16` title bars and 50% perimeter outside corner markers.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Scramble Urgency & Live Countdown Banner
- **Scramble Header**: `⚡ NEW VERIFIED LEAD: SI VIEW (NORTH BEND, WA)` (Rowdies 700, 2.0rem, Ember Orange).
- **Live Expiration Countdown Clock**:
  - `[ ⏱️ 23m 42s Remaining to Claim Before Public Release ]` (Rowdies 700, pulses when under 5 minutes).
- **Property Specs Quick-Bar**:
  - `140 Linear Feet` • `6ft Height` • `Si View Design 01 (Heritage Cedar)` • `Est. $6,720 Budget`.

### B. The 3-Seat Capped Allocation Widget
Visual 3-seat allocation card (`.has-outside-corners`):
1. **Seat 1 (Claimed)**: `🟢 SEAT 1: CLAIMED` (Cascade Fence Co. • Claimed 4m ago).
2. **Seat 2 (Claimed)**: `🟢 SEAT 2: CLAIMED` (Cedar Craft WA • Claimed 1m ago).
3. **Seat 3 (Available)**: `🟡 SEAT 3: OPEN (FINAL SEAT AVAILABLE!)` (Highlighted with pulsing Sun Gold border).

### C. Claim Action & 1-Click Checkout Module
- **Primary CTA Button**:
  - `[ ⚡ CLAIM FINAL SEAT FOR $39 & UNLOCK HOMEOWNER CONTACT ➔ ]` (Bright Green `#4ADE80`, Rowdies 700, 2px ink border).
- **Verified Deliverables Checklist**:
  - ✓ Instant unlock of Homeowner Name, Phone, and Property Address.
  - ✓ Unmasked 8.5x11 ARC Blueprint & Drawing Packet.
  - ✓ Exact Itemized Lumber & Hardware Takeoff (BOM).
  - ✓ Zero lead reselling — capped strictly to these 3 contractors.

### D. Locked Out / Filled State (When 3 Seats Claimed)
- If a contractor arrives after Seat 3 is claimed:
  - Banner shifts to `🔒 SCRAMBLE FILLED: All 3 Contractor Seats Claimed for Job #NB-8921`.
  - Action: `[ 🔔 Set Alerts for Next North Bend Lead ]` (Routes to `PRO-02`).

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - heading: { text: "⚡ VERIFIED LEAD SCRAMBLE: SI VIEW (NORTH BEND)", level: 1 }
  - alert: { text: "⏱️ LIVE COUNTDOWN: 23m 42s Remaining to Claim Before Public Release", type: "warning" }
  - text: "Specs: 140 LF • 6ft Clear Cedar Horizontal • Est. Budget: $6,720"
  - spacer: { size: "medium" }
  - row:
      - card: { title: "🟢 SEAT 1: CLAIMED", body: "Cascade Fence Co. (Claimed 4m ago)" }
      - card: { title: "🟢 SEAT 2: CLAIMED", body: "Cedar Craft WA (Claimed 1m ago)" }
      - card: { title: "🟡 SEAT 3: OPEN!", body: "FINAL SEAT AVAILABLE TO CLAIM!" }
  - spacer: { size: "small" }
  - card:
      title: "CLAIM DELIVERABLES: Homeowner Contact + 8.5x11 ARC Blueprint + Itemized BOM"
      button: { label: "⚡ CLAIM FINAL SEAT FOR ## 5. Comprehensive Linking9 & UNLOCK CONTACT ➔", variant: "primary" }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger | Passed State |
| :--- | :--- | :--- | :--- |
| **Telnyx SMS Alert** | Direct SMS | Contractor taps SMS link on mobile | `?jobId=NB-8921&token=sms_981` |
| **Marketplace Dispatch** | `PRO-04` | Clicking *"Claim Seat ($39)"* | `/contractor/match/NB-8921` |
| **Contractor Lead Feed** | `PRO-03` | Real-time lead push notification | Job ID payload |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `CLAIM FINAL SEAT ($39)` | Stripe 1-Click / Success | `/homeowner/folio/[id]` | Unlocks unmasked homeowner contact & full Folio |
| `Set Alerts for Next Lead`| `/partners/contractor` | `PRO-02` | Opens city notification matrix |
| `Back to Dispatch` | `/contractors` | `PRO-04` | Returns to public lead feed |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the Targeted Match SMS Scramble Landing Screen (PRO-05) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for headline, live timer numbers (23:42), seat labels, and claim button. Rowdies Regular (400) for property specs and checklist points.
- COLOR PALETTE:
  - Primary Action CTA: Bright Forest Green (#4ADE80)
  - Urgency Accent: Ember Orange (#F27A22)
  - Open Seat Highlight: Sun Gold (#E5B842)
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Cards: Cedar Wood Grain backdrops with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT:
1. HEADER: Scramble urgency headline ("⚡ NEW VERIFIED LEAD: SI VIEW, NORTH BEND"), live countdown timer clock, and property specs badge (140 LF, $6,720 budget).
2. 3-SEAT ALLOCATION WIDGET:
   - Seat 1 (Claimed by Cascade Fence Co.).
   - Seat 2 (Claimed by Cedar Craft WA).
   - Seat 3 (Pulsing Gold OPEN badge: "FINAL SEAT AVAILABLE!").
3. CLAIM CARD: Checklist of verified deliverables (Homeowner Phone/Email, 8.5x11 ARC Blueprint, Itemized BOM) + Bright Green "⚡ CLAIM FINAL SEAT FOR $39 & UNLOCK CONTACT ➔" button.

Output full, modern, production-ready React / Tailwind JSX code with live countdown timer and seat claim state.
```
