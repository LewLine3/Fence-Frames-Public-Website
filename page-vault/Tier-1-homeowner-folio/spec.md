# `HOME-02`: 📄 Static Portrait Fence-Folio Specification

> **Page ID**: `HOME-02`  
> **Route**: `/homeowner/folio/[id]` (`app/homeowner/folio/[id]/page.tsx`)  
> **Format**: **8.5" x 11" Multi-Page Portrait Submittal Flipbook**  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟢 Fence It (Bright Forest Green `#4ADE80`)  
> **Status**: 🟠 **In Progress**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The complete, unlocked end-product submittal packet for homeowners. Compiles the user's customized design into a multi-page, 8.5" x 11" Portrait PDF document ready for print, HOA Architectural Review Committee (ARC) submission, and contractor bidding.
- **The 6-Chapter Spine Architecture**:
  1. **Cover Page**: Project presentation, property metadata, and full-bleed hero render.
  2. **Community & HOA Standards**: Localized bylaws, approved designs, and ARC compliance certificate.
  3. **Materials & Takeoff**: Itemized lumber, hardware, and concrete takeoffs.
  4. **ARC Blueprint & BOM**: Exploded 2D CAD elevation drawing with engineering dimensions.
  5. **Add-ons & Gates**: Walk gate, mower gate, and hardware specifications.
  6. **Financial Ledger**: Material costs, labor breakdown, and administrative fees.
- **Sub-Flip Assembly Stages**: General $\rightarrow$ Framing $\rightarrow$ Fill & Trim $\rightarrow$ Finish (Stain & Seal).

---

## 2. Design System & Homepage Theme Alignment
Strictly follows the **Fence Frames Design System Law** with multi-page print optimization:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Cover title block (*"FENCE-FOLIO SUBMITTAL PACKET"*), chapter headings, total financial sums.
  - `Rowdies Regular (400)`: Chapter tab navigation, table column headers, dimension callouts.
  - `Rowdies Light (300)`: Legal disclaimers, HOA bylaws citations, material grade notes.
- **Color Palette & Theme Tokens**:
  - Paper Ground: Architectural White (`#FFFFFF`) with subtle parchment border.
  - Spine Navigation & Accents: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Linework & Title Block: Solid Ink (`#141B16`).
  - Screen Controls Ground: Dark Ink (`#141B16`) with 50% perimeter outside corner markers.
- **Print Optimization**:
  - CSS `@media print` with zero margin bleed, page breaks between chapters, and high-DPI vector rendering.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Top Screen Action Toolbar (Hidden in Print)
- **Chapter Pill Navigation Bar**:
  - `[ 1. Cover ]` • `[ 2. Community ]` • `[ 3. Materials ]` • `[ 4. Blueprint ]` • `[ 5. Gates ]` • `[ 6. Ledger ]`
- **Sub-Flip Tabs (When Chapter 4 Active)**:
  - `[ General ]` • `[ Framing ]` • `[ Fill & Trim ]` • `[ Finish ]`
- **Export Action Buttons**:
  - `[ 🖨️ Print Full Packet (8.5x11) ]` (Triggers browser print with portrait orientation).
  - `[ 💾 Download PDF Document ]` (Exports compiled PDF).
  - `[ ✏️ Re-Open in Designer ]` (Routes back to `/designer/[fencestyle]`).
  - `[ ⚡ Dispatch to Contractors ]` (Routes to `/contractors`).

### B. Multi-Page Document Structure (8.5" x 11" Portrait Canvas)

#### Sheet 1: Presentation Cover
- Header: Fence Frames Architectural Wordmark + "OFFICIAL HOA SUBMITTAL PACKET".
- Metadata Block: Property Address (`1420 Mt Si Blvd, North Bend, WA`), Homeowner Name, Date, Auth Hash (`#FF-98045-8912`).
- Center: Full 320px high-resolution rendering of the configured fence style in full color.
- Footer: "Certified Compliant with Si View HOA Architectural Review Guidelines."

#### Sheet 2: Community HOA Compliance Certificate
- Official Si View HOA chapter header.
- Pre-approved specification checklist (Height: 6ft, Material: Western Red Cedar, Post: Incised PT 4x4, Stain: SW-3558 Asteroid).
- Formal ARC submittal sign-off block for committee review and approval stamp.

#### Sheet 3: Exploded 2D CAD Blueprint & BOM
- Exploded CAD elevation drawing with 6'-0" height, 6'-0" O.C. spacing, and ground clearance.
- Itemized Bill of Materials (BOM) listing posts, rails, pickets, caps, fasteners, and concrete bags.

#### Sheet 4: Itemized Cost Ledger (Pricing Mode)
- Full breakdown: Materials Cost ($2,840), Labor Estimate ($2,400), Administrative & Permitting ($520) = Total: $5,760 ($48/LF).

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - row:
      - badge: { label: "1. Cover", color: "green" }
      - badge: { label: "2. Community Standards", color: "gray" }
      - badge: { label: "3. Materials Takeoff", color: "gray" }
      - badge: { label: "4. ARC Blueprint", color: "gray" }
      - badge: { label: "5. Gates", color: "gray" }
      - badge: { label: "6. Ledger", color: "gray" }
      - button: { label: "🖨️ Print Full Packet", variant: "primary" }
  - spacer: { size: "small" }
  - card:
      title: "OFFICIAL HOA FENCE-FOLIO SUBMITTAL PACKET"
      body: "Project: Backyard Perimeter • Lot #42 • Homeowner: John Smith • North Bend, WA"
  - image: { label: "High-Resolution Render: Si View Heritage Cedar Fence" }
  - text: "Certified Compliant with Si View HOA Architectural Review Board Guidelines."
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger | Passed Payload |
| :--- | :--- | :--- | :--- |
| **Homeowner Showcase** | `HOME-01` | Clicking *"View 8.5x11 PDF"* | Folio ID & Auth Token |
| **Auth Gate** | `CORE-02` | Immediate post-login redirect | Unlocked Folio state |
| **Portrait Blueprint** | `CORE-03` | Clicking *"View Full Flipbook"* | Blueprint ID |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `Re-Open in Designer` | `/designer/[fencestyle]` | `DSGN-03` | Loads saved Folio configuration into live canvas |
| `Dispatch to Contractors`| `/contractors` | `PRO-04` | Dispatches verified Folio to contractor lead feed |
| `Back to Dashboard` | `/homeowner` | `HOME-01` | Returns to saved project gallery |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the multi-page 8.5" x 11" Portrait Fence-Folio Flipbook Viewer (HOME-02) for Fence Frames.

### DESIGN SYSTEM LAW:
- 6-CHAPTER SPINE NAVIGATION:
  1. Cover Page · 2. Community & HOA Standards · 3. Materials & Takeoff · 4. ARC Blueprint & BOM · 5. Add-ons & Gates · 6. Financial Ledger
- SUB-FLIP STAGES: General → Framing → Fill & Trim → Finish
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for title block, chapter titles, and cost totals. Rowdies Regular (400) for chapter tabs and table headers.
- COLOR PALETTE (Fence It):
  - Paper Ground: Architectural White (#FFFFFF)
  - Spine Accent: Bright Forest Green (#4ADE80)
  - Drawing Linework & Title Block: Solid Ink (#141B16)

### PAGE LAYOUT:
1. SCREEN CONTROLS BAR: Horizontal chapter pill tabs (Cover, Community, Materials, Blueprint, Gates, Ledger), Print 8.5x11 button, Download PDF button, and "Edit in Designer" button.
2. 8.5x11 PORTRAIT PAGES:
   - Sheet 1 (Cover): Title block, property metadata (North Bend, WA), high-res hero fence render, and HOA compliance badge.
   - Sheet 2 (Community): Si View HOA ARC rules, pre-approved specs, and committee approval block.
   - Sheet 3 (Blueprint): Exploded CAD elevation + itemized BOM.
   - Sheet 4 (Ledger): Cost breakdown for materials, labor, and admin.
3. PRINT STYLES: @media print CSS enforcing clean 0.5in portrait margins and page breaks.

Output full, modern, production-ready React / Tailwind JSX code with active chapter switching.
```
