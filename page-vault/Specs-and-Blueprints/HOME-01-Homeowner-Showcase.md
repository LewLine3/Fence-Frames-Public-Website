# `HOME-01`: 👤 Homeowner Showcase & Dashboard Specification

> **Page ID**: `HOME-01`  
> **Route**: `/homeowner` & `/homeowner/projects` (`app/homeowner/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🔵 Portals & Homeowner Hub (Royal Blue `#3B82F6`)  
> **Status**: 🟠 **In Progress**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The authenticated homeowner dashboard and central command center. Houses the homeowner's library of saved Fence-Folios, tracks ARC compliance approval status with their local HOA, and manages contractor bids received via Targeted Match.
- **The Customer Experience**: Provides persistent, passwordless access to official 8.5x11 architectural blueprints, itemized lumber takeoffs, and 1-click bid requests.
- **Conversion Engine**: Connects pre-scoped, verified builds directly to the **Marketplace Dispatch (`PRO-04`)** to generate high-intent contractor revenue.

---

## 2. Design System & Homepage Theme Alignment
Inherits the full homepage visual identity and Design System Law:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Dashboard headline (*"MY SAVED FENCE-FOLIOS"*), project names, price estimates, action buttons.
  - `Rowdies Regular (400)`: Project specs chips (120 LF, 6ft Height), ARC status pills, bid counter.
  - `Rowdies Light (300)`: Timestamps, HOA notes, contractor bid descriptions.
- **Color Palette & Theme Tokens**:
  - Primary Accent: Royal Blue (`#3B82F6`) and Sun Gold (`#E5B842`).
  - Action Highlight: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Background Ground: Dark Ink (`#141B16`) with 25px minor / 100px major drafting grid.
  - Cards: High-res Cedar Wood Grain backdrops with solid `#141B16` title bars, gold font, and 50% perimeter outside corner markers.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Homeowner Welcome & Property Header
- **User Greeting**: `Welcome back, [John Smith]` (Rowdies 700, 1.8rem).
- **Property Location Chip**: `📍 1420 Mt Si Blvd, North Bend, WA 98045 (Si View HOA)`.
- **Primary Header Action**: `[ + START NEW FENCE BUILD ]` (Routes to `/catalog` or `/designer`).

### B. Saved Fence-Folio Card Gallery (3–5 Projects)
For each saved project card (`.has-outside-corners`):
1. **Title Bar**: Project Name (e.g. `Build #1: Backyard Perimeter — Si View Design 01`) + Royal Blue Pillar Dot.
2. **Project 2D Visual Thumbnail**: 180px front/back render of the configured fence.
3. **Docked Explainer Specs Plate**:
   - Footage & Dimensions: `120 Linear Feet • 6ft Height • Clear Cedar Pickets`
   - Finish: `Sherwin-Williams SW-3558 Asteroid Stain`
   - Estimated Cost: `$5,760 ($48.00 / LF)` (Bright Green Bold).
   - Saved Timestamp: `Saved on Aug 20, 2026 • Auth Hash #FF-98045-8912`
4. **Project Card Action Strip**:
   - `[ 📄 View 8.5x11 PDF ]` $\rightarrow$ Opens full submittal flipbook (`HOME-02` / `CORE-03`).
   - `[ ✏️ Edit in Designer ]` $\rightarrow$ Re-opens configuration in `/designer/[fencestyle]`.
   - `[ ⚡ Request Contractor Bids ]` $\rightarrow$ Launches Targeted Match dispatch (`PRO-04`).
   - `[ 🗑️ Delete Build ]` $\rightarrow$ With confirmation modal.

### C. Active HOA ARC & Contractor Bid Tracker
- **ARC Status Pill**:
  - 🟢 `ARC Pre-Approved (Si View Standard Match)` or 🟡 `Under HOA Committee Review`.
- **Contractor Bid Counter & Drawer**:
  - `⚡ 2 Bids Received for this Build`:
    - Contractor A: `Cascade Fence Co. • $46.50 / LF ($5,580 Total) • Start: Sept 12`
    - Contractor B: `Mt. Si Woodworks • $49.00 / LF ($5,880 Total) • Start: Sept 05`
  - Action: `[ 📞 Contact Contractor ]` / `[ 🤝 Accept Bid ]`.

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - heading: { text: "MY SAVED FENCE-FOLIOS", level: 1 }
  - text: "Property: 1420 Mt Si Blvd, North Bend, WA 98045 (Si View HOA)"
  - row:
      - button: { label: "+ Start New Fence Build", variant: "primary" }
  - spacer: { size: "medium" }
  - row:
      - card:
          title: "BUILD #1: BACKYARD PERIMETER"
          body: "120 LF • 6ft Clear Cedar • Est. $5,760 ($48/LF) • Status: 🟢 ARC Approved"
          button: { label: "⚡ Request Contractor Bids", variant: "primary" }
      - card:
          title: "BUILD #2: FRONT COURTYARD"
          body: "40 LF • 4ft Horizontal Cedar • Est. ```
┌────────────────────────────────────────────────────────────────────────┐
│ [HEADER: FENCE FRAMES]   [Dashboard (Active)]   [Catalog]   [ 👤 John ]│
├────────────────────────────────────────────────────────────────────────┤
│ <h1>MY SAVED FENCE-FOLIOS</h1>                                         │
│ 📍 Property: 1420 Mt Si Blvd, North Bend, WA 98045 (Si View HOA)       │
│                                           [ + START NEW FENCE BUILD ]  │
├────────────────────────────────────────────────────────────────────────┤
│ SAVED PROJECTS (2 ACTIVE BUILDS):                                      │
│                                                                        │
│ ┌──────────────────────────────────┐ ┌───────────────────────────────┐ │
│ │ 🟫 BUILD #1: BACKYARD PERIMETER  │ │ 🟫 BUILD #2: FRONT COURTYARD  │ │
│ ├──────────────────────────────────┤ ├───────────────────────────────┤ │
│ │ [ 🖼️ Si View Heritage 2D Render] │ │ [ 🖼️ Horizontal Cedar Render ]│ │
│ ├──────────────────────────────────┤ ├───────────────────────────────┤ │
│ │ 🟢 Docked Plate:                 │ │ 🟢 Docked Plate:              │ │
│ │ 120 LF • 6ft Clear Cedar         │ │ 40 LF • 4ft Horizontal Cedar  │ │
│ │ Est. $5,760 ($48.00 / LF)        │ │ Est. $2,100 ($52.50 / LF)     │ │
│ │ Status: 🟢 ARC Approved (Si View)│ │ Status: 🟡 Pending HOA Review │ │
│ ├──────────────────────────────────┤ ├───────────────────────────────┤ │
│ │ [ 📄 View PDF ] [ ✏️ Edit Build ] │ │ [ 📄 View PDF ] [ ✏️ Edit ]   │ │
│ │ [ ⚡ REQUEST CONTRACTOR BIDS ]   │ │ [ ⚡ REQUEST CONTRACTOR BIDS ]│ │
│ └──────────────────────────────────┘ └───────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ ⚡ LIVE BIDS (2 CONTRACTORS READY):                                    │
│ - Cascade Fence Co. ($46.50/LF) [ 📞 Contact ] [ 🤝 Accept Bid ]       │
│ - Mt. Si Woodworks ($49.00/LF)  [ 📞 Contact ] [ 🤝 Accept Bid ]       │
└────────────────────────────────────────────────────────────────────────┘
```

---

,100 ($52.50/LF) • Status: 🟡 Pending Review"
          button: { label: "⚡ Request Contractor Bids", variant: "primary" }
  - spacer: { size: "small" }
  - alert: { text: "⚡ 2 Bids Received from Verified North Bend Contractors ($46.50/LF, $49.00/LF)", type: "info" }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger | Passed Payload |
| :--- | :--- | :--- | :--- |
| **Auth Gate** | `CORE-02` | Successful OTP login/save | Newly compiled Folio ID |
| **Master Homepage** | `CORE-01` | Header click on *"Account"* | User session token |
| **Portrait Blueprint** | `CORE-03` | Clicking *"Back to Showcase"* | Preserves active project |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `View 8.5x11 PDF` | `/homeowner/folio/[id]` | `HOME-02` | Loads multi-page portrait flipbook |
| `Edit in Designer` | `/designer/[fencestyle]` | `DSGN-03` | Re-seeds 2D canvas with saved parameters |
| `REQUEST CONTRACTOR BIDS` | `/contractors` | `PRO-04` | Dispatches verified project to marketplace |
| `+ START NEW BUILD` | `/catalog` | `DSGN-01` | Starts new fresh session |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the Homeowner Showcase & Dashboard (HOME-01) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for project titles, cost numbers ($5,760), and CTA buttons. Rowdies Regular (400) for spec chips, status pills, and navigation. Rowdies Light (300) for timestamps and bid notes.
- COLOR PALETTE:
  - Primary Accent: Royal Blue (#3B82F6) and Sun Gold (#E5B842)
  - Action CTA: Bright Forest Green (#4ADE80) with 2px solid #141B16 border
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Project Cards: Cedar Wood Grain backdrops with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT:
1. HEADER: User greeting ("Welcome back, John Smith"), property address badge (Si View HOA, North Bend, WA), and "+ START NEW FENCE BUILD" button.
2. SAVED FENCE-FOLIO GALLERY (2-Column Grid):
   - Solid Ink Title Bar with Style Name and Royal Blue Pillar Dot.
   - 180px 2D visual fence render.
   - Docked Explainer Plate with 1.5px green border showing specs (120 LF, 6ft height, natural stain) + "$5,760 Total" + ARC Approval Status badge.
   - Action Button Row: [ View 8.5x11 PDF ] [ Edit in Designer ] and Bright Green [ REQUEST CONTRACTOR BIDS ].
3. LIVE CONTRACTOR BID DRAWER: Itemized contractor bids with verified licenses, pricing per LF, and "Accept Bid" actions.

Output full, modern, production-ready React / Tailwind JSX code with interactive project selection.
```
