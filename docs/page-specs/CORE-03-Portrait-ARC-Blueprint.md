# `CORE-03`: 📄 Portrait ARC Architectural Blueprint Specification

> **Page ID**: `CORE-03`  
> **Route**: `/blueprint` & `/blueprint/[id]` (`app/blueprint/page.tsx`)  
> **Format**: **8.5" x 11" Portrait ARC Submittal Engine**  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟢 Fence It (Bright Forest Green `#4ADE80`)  
> **Status**: 🔵 **Working / Needs Tweaks**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The platform's premier tangible product — generating official, architectural-grade submittal drawings formatted precisely for HOA Architectural Review Committees (ARC), city permitting departments, and contractor takeoffs.
- **2-Tier Structure**:
  - **Page 1**: Formal Title Block + Exploded 2D CAD Elevation Drawing + Itemized Bill of Materials (BOM).
  - **Pages 2+**: Step-by-Step Wizard Assembly breakdown (General, Posts, Rails, Pickets, Trim, Finish) and sub-ledgers.
- **The ARC Clean Mode Switch**: Homeowners can toggle pricing visibility with a single switch to produce an un-priced, purely technical submittal for HOA reviewers.

---

## 2. Visual Blueprint Render & Submittal Sheet

![Portrait ARC Architectural Blueprint Engine](file:///c:/Users/TwoLe/Lew-Line-Workspaces/Fence%20Frames%20(Antigravity)/Obsidian-Fence-Frames/assets/Fence-Frames-bluprint-portrait-screenshot.png)

---

## 3. Design System & Homepage Theme Alignment
Strictly follows the **Fence Frames Design System Law** with print-optimized styling:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Title block headers, sheet title (*"ARCHITECTURAL SUBMITTAL & MATERIAL SPECIFICATION"*), section titles, and BOM totals.
  - `Rowdies Regular (400)`: Table headers, BOM descriptions, dimension callouts (e.g. `6'-0" O.C.`, `R 1/2"`), and toolbar controls.
  - `Monospace Code Font ('Fira Code')`: Lumberyard SKUs, fastener part numbers, and engineering tolerance notes.
- **Color Palette & Blueprint Tokens**:
  - Paper Ground: Architectural White (`#FFFFFF`) with subtle drafting grid lines.
  - Drawing Linework & Title Block: Solid Ink (`#141B16`).
  - Dimension Callouts & Border Accents: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Wood Component Fills: Natural Cedar Amber (`#D49B5B`) with dark framing borders.
- **Print Optimization**:
  - Exact `@media print` CSS rules enforcing 0.5in portrait margins, page-break-after between sheets, and hiding screen-only toolbar controls.

---

## 4. Specific Controls & UI Elements Breakdown

### A. Top Action Toolbar (Screen Only, Hidden in Print)
- **Print Button**: `[ 🖨️ Print 8.5x11 Sheet ]` (Triggers browser print dialog with pre-set portrait dimensions).
- **Pricing Mode Toggle Switch**:
  - State `ON`: Displays complete cost columns, labor estimates, and administrative markup.
  - State `OFF` (ARC Mode): Completely hides all dollar amounts and financial ledgers, generating a 100% clean architectural drawing for HOA boards.
- **Export PDF Button**: `[ 💾 Download Submittal PDF ]`.
- **Edit in Designer Button**: `[ ✏️ Modify in Designer ]` (Returns state to `/designer/[fencestyle]`).

### B. Sheet 1: Architectural Submittal & BOM (8.5" x 11" Canvas)
- **Architectural Title Block**:
  - Project Name: `Si View Lot #42 Fence Replacement`
  - Property Address: `1420 Mt Si Blvd, North Bend, WA 98045`
  - HOA Chapter: `Si View HOA ARC Committee` • Jurisdiction: `City of North Bend`
  - Scale: `1/2" = 1'-0"` • Date • Sheet `1 of 3` • Auth Hash: `#FF-98045-8912`
- **2D CAD Exploded Elevation Drawing (Center Viewport)**:
  - 8ft fence bay rendered in high-contrast architectural linework showing posts, top rail, bottom rail, pickets, and fascia trim.
  - Dimension Callouts:
    - Vertical height marker (`6'-0"`).
    - Post-to-post spacing (`6'-0"` or `8'-0"` O.C.).
    - Ground clearance (`2.0"` min gap).
    - Top cap radius (`R 1/2"`).
- **Itemized Bill of Materials (BOM) Table**:
  - Columns: `#`, `Component Description`, `Spec / Grade`, `Qty`, `Unit`, `Category (Mat/Lab)`, `[Cost]` *(Hidden if ARC Mode)*.
  - Post Line Item: `4x4x8 Incised Pressure Treated Ground Contact Posts` (Qty: 21).
  - Rail Line Item: `2x4x8 S4S Rough Sawn Western Red Cedar Rails` (Qty: 40).
  - Picket Line Item: `1x6x6 Clear Cedar Tongue & Groove Vertical Pickets` (Qty: 240).
  - Hardware / Concrete: `Fasteners, 1x4 rot board, 50lb Quikrete concrete bags`.

### C. Sheets 2 & 3: Step-by-Step Sub-Flip Assembly Breakdown
- **General Stage**: Elevation management, raked vs. stepped terrain notes.
- **Framing Stage**: Post footing depth (24"), aggregate base (4"), fastener schedule (3" stainless screws).
- **Fill & Trim Stage**: Picket spacing (1/16" privacy gap), trim fascia cap specs.
- **Finish Stage**: Approved stain specification (`Sherwin-Williams SW-3558 Asteroid` or `Natural Cedar Semi-Transparent`).

---

## 5. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - row:
      - button: { label: "🖨️ Print 8.5x11 Sheet", variant: "primary" }
      - toggle: { label: "Pricing / Full Ledger Mode", checked: true }
      - button: { label: "💾 Download PDF", variant: "secondary" }
  - spacer: { size: "small" }
  - card:
      title: "ARCHITECTURAL SUBMITTAL & MATERIAL SPECIFICATION"
      body: "Project: Si View Lot #42 • City: North Bend, WA • Scale: 1/2" = 1'-0" • Auth #FF-98045"
  - image: { label: "2D CAD Exploded Bay Elevation Drawing (6'-0" Height • 6'-0" O.C. Spacing)" }
  - spacer: { size: "small" }
  - table:
      headers: ["#", "Item Description", "Spec / Grade", "Qty", "Unit", "Category"]
      rows:
        - ["01", "4x4x8 PT Posts (Incised)", "Ground Contact", "21", "EA", "Materials"]
        - ["02", "2x4x8 Cedar Rails", "S4S Rough Sawn", "40", "EA", "Materials"]
        - ["03", "1x6x6 Clear Cedar Pickets", "Tongue & Groove", "240", "EA", "Materials"]
        - ["04", "Fasteners & Concrete", "50lb Quikrete", "42", "Bags", "Materials"]
```

## 6. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Trigger Action | Passed Payload |
| :--- | :--- | :--- | :--- |
| **Homeowner Showcase** | `HOME-01` | Clicking *"View Portrait PDF"* | Folio ID & Auth Token |
| **The Designer** | `DSGN-03` | Clicking *"View Blueprint Preview"* | Live Designer state JSON |
| **Pre-Built Catalog** | `DSGN-02` | Clicking *"View Blueprint Specs"* | Pre-built style SKU |

### Outbound Links (Destinations):
| Destination Page | Page ID | Trigger Action | Passed State / Action |
| :--- | :--- | :--- | :--- |
| **Homeowner Showcase** | `HOME-01` | Clicking *"Back to Showcase"* | Preserves user session |
| **The Designer** | `DSGN-03` | Clicking *"Modify in Designer"* | Re-loads current BOM into live canvas |
| **Marketplace Dispatch** | `PRO-04` | Clicking *"Request Contractor Bids"* | Dispatches verified BOM to local pros |
| **Auth Gate** | `CORE-02` | Unauthenticated click on *"Download Official PDF"* | Intercepts with SMS OTP |

---

## 7. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer building the official 8.5" x 11" Portrait Architectural Blueprint Submittal sheet (CORE-03) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for title block, sheet headers, and total footages. Rowdies Regular (400) for table headers, BOM items, and dimension callouts. Monospace code font ('Fira Code') for lumber SKUs.
- COLOR PALETTE (Fence It):
  - Paper Ground: Architectural White (#FFFFFF)
  - Linework & Title Block: Solid Ink (#141B16)
  - Dimension Callouts: Bright Forest Green (#4ADE80)
  - Drawing fills: Cedar Amber (#D49B5B) with dark ink strokes

### PAGE LAYOUT:
1. SCREEN TOOLBAR: Print 8.5x11 button, Pricing Toggle (ON: Full Ledger / OFF: Clean ARC Mode), Export PDF, and "Modify in Designer" button.
2. 8.5x11 PORTRAIT SHEET (Page 1):
   - Formal architectural title block: Project Name, Property Address, HOA Chapter, Scale (1/2" = 1'-0"), Sheet 1 of 3, Auth Hash.
   - 2D CAD elevation drawing with 6'-0" height, 6'-0" post O.C. spacing, and ground clearance dimensions.
   - Itemized Bill of Materials (BOM) table listing Posts, Rails, Pickets, Trim, and Fasteners.
3. SUB-FLIP BREAKDOWN (Pages 2 & 3): Assembly stages (General, Posts, Rails, Pickets, Stain, Trim, Hardware).
4. PRINT STYLES: @media print CSS enforcing exact 0.5in portrait margins and hiding toolbar.

Output full, modern, production-ready React / Tailwind JSX code.
```
