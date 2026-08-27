# `PRO-04`: 🔨 Marketplace Dispatch Center Specification

> **Page ID**: `PRO-04`  
> **Route**: `/contractors` & `/contractor/dispatch` (`app/contractors/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟢 Fence It & B2B Monetization (Bright Forest Green `#4ADE80`)  
> **Status**: 🟠 **In Progress**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The marketplace dispatch center connecting verified homeowner fence builds to local licensed fence contractors. Eliminates speculative bidding by providing contractors with 100% pre-scoped, verified architectural blueprints and itemized material takeoffs.
- **Monetization Engine**: Houses the **⚡ Targeted Match SMS Scramble Engine**. Contractors purchase capped shared seats ($19–$49) or exclusive rights ($99) to submit bids for pre-qualified projects.
- **The 72-Hour Capped Public Board**: Leads remain active on the board until 3 contractor seats are claimed or 72 hours elapse, preventing lead flooding and ensuring high contractor close rates.

---

## 2. Design System & Homepage Theme Alignment
Inherits the full homepage visual identity and Design System Law:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Dispatch title (*"VERIFIED CONTRACTOR LEAD FEED"*), job titles, linear footages, seat claim CTA buttons.
  - `Rowdies Regular (400)`: Filter chips, verified BOM badges, seat counters (`2 of 3 Seats Claimed`).
  - `Rowdies Light (300)`: Property notes, install date expectations, contractor license disclaimers.
- **Color Palette & Theme Tokens**:
  - Primary Accent: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Urgency Accent: Ember Orange (`#F27A22` / `var(--ember)`).
  - Background Ground: Dark Ink (`#141B16`) with 25px minor / 100px major drafting grid.
  - Cards: High-res Cedar Wood Grain cards with solid `#141B16` title bars and 50% perimeter outside corner markers.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Dispatch Header & City Coverage Bar
- **Dispatch Title**: `VERIFIED FENCE CONTRACTOR DISPATCH` (Rowdies 700, 2.2rem, Forest Green).
- **Service Area Selector**: `Active Territory: [ North Bend & Snoqualmie Valley ▼ ]`.
- **Contractor L&I Status Indicator**: `🟢 WA L&I Verified Contractor • Licensed & Bonded`.

### B. Lead Filter Controls Strip
- **Footage Filter**: `[ All Sizes ]` • `[ < 100 LF ]` • `[ 100–200 LF ]` • `[ > 200 LF ]`.
- **Style Filter**: `[ All Styles ]` • `[ Cedar Privacy ]` • `[ Horizontal ]` • `[ Picture Frame ]`.
- **BOM Status**: `[✓] Show Pre-Scoped Blueprints Only`.

### C. Pre-Scoped Project Cards (Responsive 2-Column Board)
For each project card (`.has-outside-corners`):
1. **Title Bar**: `JOB #NB-8921 • SI VIEW (NORTH BEND, WA)` + Forest Green Pillar Dot.
2. **Project Specs & Render Thumbnail**:
   - Linear Footage: `140 Linear Feet • 6ft Height • Clear Cedar Horizontal`.
   - Verified Deliverables:
     - ✓ `Official 8.5x11 ARC Blueprint Attached`
     - ✓ `Itemized Lumberyard Material Takeoff (BOM) Included`
     - ✓ `HOA ARC Pre-Approved (Zero Review Delay)`
   - Estimated Material & Labor Budget: `$6,720 ($48.00 / LF)`.
3. **Live Seat Scramble & Urgency Widget**:
   - Seat Allocation: `⚡ 1 of 3 Seats Claimed (2 Seats Remaining!)`.
   - Expiration Countdown: `⏱️ 72-hr board limit (46h 18m left)`.
4. **Contractor Action Buttons**:
   - `[ ⚡ CLAIM SEAT FOR $39 → ]` (Routes to 1-click checkout via `/contractor/match`).
   - `[ 📄 View Verified Takeoff & Blueprint ]` (Previews unmasked BOM for active seat holders).

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - heading: { text: "VERIFIED CONTRACTOR DISPATCH CENTER", level: 1 }
  - text: "Territory: North Bend & King County • 🟢 WA L&I Verified Access"
  - row:
      - select: { label: "Filter Footage", options: ["All Sizes", "100–200 LF", "> 200 LF"] }
      - toggle: { label: "Verified Blueprints Only", checked: true }
  - spacer: { size: "medium" }
  - row:
      - card:
          title: "JOB #NB-8921 • SI VIEW HOA"
          body: "140 LF • 6ft Horizontal Cedar • Est. Budget: $6,720 ($48/LF) • ⚡ 1 of 3 Seats Claimed"
          button: { label: "⚡ Claim Seat (## 5. Comprehensive Linking9) →", variant: "primary" }
      - card:
          title: "JOB #NB-8922 • RIVERBEND"
          body: "90 LF • 6ft Heritage Picket • Est. Budget: ## 5. Comprehensive Linking,960 ($44/LF) • ⚡ 2 of 3 Seats Claimed"
          button: { label: "⚡ Claim Final Seat (## 5. Comprehensive Linking9) →", variant: "primary" }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger | Passed Payload |
| :--- | :--- | :--- | :--- |
| **Homeowner Showcase** | `HOME-01` | Homeowner clicks *"Request Contractor Bids"* | Dispatches new project ID to board |
| **The Designer** | `DSGN-03` | Homeowner clicks *"Find a Fence Builder"* | Dispatches configuration JSON |
| **City Hubs** | `GEO-CIT-01` | Contractor selects North Bend directory | Filters dispatch to North Bend |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `CLAIM SEAT ($39) →` | `/contractor/match` | `PRO-05` | Launches 1-click Telnyx SMS scramble claim |
| `View Verified Takeoff`| `/blueprint/[id]` | `CORE-03` | Opens contractor takeoff BOM view |
| `Contractor Setup` | `/partners/contractor` | `PRO-02` | Manages city alert preferences |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the Marketplace Dispatch Center (PRO-04) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for dispatch title, project headers, price numbers ($6,720), and CTA buttons. Rowdies Regular (400) for filter chips, seat count pills, and timer readouts.
- COLOR PALETTE:
  - Primary Accent: Bright Forest Green (#4ADE80)
  - Urgency Highlight: Ember Orange (#F27A22)
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Cards: Cedar Wood Grain backdrops with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT:
1. HEADER: Territory selector ("North Bend & King County"), <h1>VERIFIED CONTRACTOR DISPATCH CENTER</h1>, and contractor WA L&I license verification badge.
2. FILTER TOOLBAR: Linear footage chips, style dropdowns, and "Verified Blueprints Only" toggle.
3. PRE-SCOPED LEAD BOARD (2-Column Grid):
   - Solid Ink Title Bar with Job ID, City, and Green Pillar Dot.
   - 180px 2D visual fence render.
   - Docked Explainer Plate with 1.5px green border showing specs (140 LF, 6ft horizontal, $6,720 budget), verified blueprint checklist, and "⚡ 1 of 3 Seats Claimed" live counter.
   - Action Button Row: Bright Green "⚡ CLAIM SEAT ($39) →" button and "📄 View Verified Takeoff" link.

Output full, modern, production-ready React / Tailwind JSX code with responsive grid layout.
```
