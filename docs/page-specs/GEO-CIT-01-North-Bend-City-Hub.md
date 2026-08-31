# `GEO-CIT-01`: 🏔️ North Bend Flagship City Hub Specification

> **Page ID**: `GEO-CIT-01`  
> **Route**: `/wa/king/north-bend` (`app/[state]/[county]/[city]/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟡 Find It (Sun Gold `#E5B842`)  
> **Status**: 🔵 **Working / Needs Tweaks**

---

## 1. Purpose & Business Engine
- **Primary Goal**: Flagship municipal hub for North Bend, Washington (King County). Acts as the authoritative local guide for city building codes, frost lines, Mt. Si valley wind load advisories (80mph exposure B), and active HOA communities.
- **Conversion Engine**: Connects local residents directly to their specific neighborhood guidelines (Si View, Riverbend, Forster Woods) or verified local fence builders.
- **SEO & Traffic Anchor**: Powers programmatic multi-state location discovery (`/{state}/{county}/{city}`).

---

## 2. Design System & Homepage Theme Alignment
Inherits the full homepage visual identity and Design System Law:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: City hero headline (*"NORTH BEND, WA FENCE REGULATIONS & COMMUNITIES"*), community card titles, contractor names.
  - `Rowdies Regular (400)`: Municipal code labels (Setbacks, Height Limits), breadcrumbs, action buttons.
  - `Rowdies Light (300)`: Bylaws citations, wind load descriptions, contractor license numbers.
- **Color Palette & Theme Tokens**:
  - Primary Accent: Sun Gold (`#E5B842` / `var(--gold-sun)`).
  - Verified Badge: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Background Ground: Dark Ink (`#141B16`) with 25px minor / 100px major drafting grid.
  - Cards: High-res Cedar Wood Grain cards with solid `#141B16` title bars and 50% perimeter outside corner markers.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Breadcrumb & City Hero Header
- **Breadcrumb Navigation**: `Washington > King County > North Bend (98045)`
- **City Headline**: `NORTH BEND, WA FENCE CODES & LOCAL CONTRACTORS` (Rowdies 700, 2.2rem, Sun Gold).
- **Mt. Si Wind Advisory Card**:
  - `⚠️ Municipal Advisory`: Mt. Si wind corridor requires 3-rail framing or 2-rail with 4x4 PT incised posts at 24" footing depth for 80mph gusts.

### B. 3 Flagship Pilot Communities Grid (Responsive 3-Column)
1. **Community Card 1 · Si View HOA (Flagship)**:
   - Header: `🏡 SI VIEW COMMUNITY` + Gold Pillar Dot.
   - Specs: 4 Pre-Approved ARC Designs (Designs 01–04) • Clear Cedar Privacy & Picture Frame.
   - CTA: `[ 🟡 View Si View Standards → ]` (Routes to `GEO-COM-01`).
2. **Community Card 2 · Riverbend HOA**:
   - Header: `🏡 RIVERBEND COMMUNITY` + Gold Pillar Dot.
   - Specs: Strict semi-transparent natural cedar staining requirements • 6ft max height.
   - CTA: `[ 🟡 View Riverbend Standards → ]`.
3. **Community Card 3 · Forster Woods HOA**:
   - Header: `🏡 FORSTER WOODS` + Gold Pillar Dot.
   - Specs: Architectural review board checklist & good neighbor alternating pickets.
   - CTA: `[ 🟡 View Forster Woods Standards → ]`.

### C. Verified North Bend Fence Contractor Showcase
- 3 Licensed Contractor Profile Cards (`.has-outside-corners`):
  - **Cascade Fence & Deck**: `WA L&I #CASCAD*891K2` • 4.9 ★ (42 Reviews) • `[ ⚡ Request Pre-Scoped Bid ]`
  - **Snoqualmie Valley Fencing**: `WA L&I #SNOQV*221L9` • 5.0 ★ (28 Reviews) • `[ ⚡ Request Pre-Scoped Bid ]`
  - **Mt. Si Woodworks**: `WA L&I #MTSIW*774P1` • 4.8 ★ (35 Reviews) • `[ ⚡ Request Pre-Scoped Bid ]`

### D. Municipal Bylaws Quick-Reference Table
- Backyard Max Height: `6'-0"` (No permit required).
- Front Yard Max Height: `4'-0"` (Within 15ft property setback).
- Corner Lot Visibility Triangle: `25ft clear vision triangle required at intersections`.

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - breadcrumb: { items: ["Washington", "King County", "North Bend (98045)"] }
  - heading: { text: "NORTH BEND, WA FENCE REGULATIONS & DIRECTORY", level: 1 }
  - alert: { text: "⚠️ Mt. Si wind exposure standards require 24" footings and 3-rail construction.", type: "warning" }
  - spacer: { size: "medium" }
  - row:
      - card:
          title: "SI VIEW COMMUNITY"
          body: "4 Pre-Approved ARC Standards (Designs 01–04)"
          button: { label: "View Standards →", variant: "primary" }
      - card:
          title: "RIVERBEND HOA"
          body: "Semi-transparent cedar staining rules"
          button: { label: "View Rules →", variant: "primary" }
      - card:
          title: "FORSTER WOODS"
          body: "Good neighbor alternating picket ARB checklist"
          button: { label: "View Rules →", variant: "primary" }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger |
| :--- | :--- | :--- |
| **Master Homepage** | `CORE-01` | Entering ZIP `98045` or searching *"North Bend"* |
| **State Directory** | `GEO-ST-01` | Drilling down Washington > King County |
| **Marketplace Dispatch** | `PRO-04` | City filter link |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `SI VIEW STANDARDS →` | `/wa/king/north-bend/si-view` | `GEO-COM-01` | Loads Si View ARC preset |
| `RIVERBEND RULES →` | `/wa/king/north-bend/riverbend` | `GEO-COM-03` | Loads Riverbend preset |
| `Request Pre-Scoped Bid`| `/contractors` | `PRO-04` | Filters lead dispatch to North Bend pros |
| `Customize Style` | `/designer` | `DSGN-03` | Pre-seeds North Bend wind load specs |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the North Bend Flagship City Hub (GEO-CIT-01) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for city headline, community titles, and contractor names. Rowdies Regular (400) for breadcrumbs, bylaws table, and buttons. Rowdies Light (300) for descriptions.
- COLOR PALETTE (Find It):
  - Primary Accent: Sun Gold (#E5B842)
  - Secondary Accent: Bright Green (#4ADE80)
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Card Backdrops: Cedar Wood Grain cards with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT:
1. HEADER: Breadcrumb (WA > King > North Bend), <h1>NORTH BEND, WA FENCE REGULATIONS & DIRECTORY</h1>, and Mt. Si wind advisory callout box (80mph gusts).
2. 3-COLUMN COMMUNITY GRID:
   - Card 1: Si View HOA (Flagship) + Sun Gold "VIEW SI VIEW STANDARDS →" button routing to /wa/king/north-bend/si-view.
   - Card 2: Riverbend HOA + "VIEW RIVERBEND RULES →" button.
   - Card 3: Forster Woods HOA + "VIEW FORSTER WOODS RULES →" button.
3. LOCAL CONTRACTOR SHOWCASE: 3 verified contractor cards with WA L&I license badges, review ratings, and "Request Pre-Scoped Bid" actions.
4. MUNICIPAL CODE TABLE: Clear table of setback and height rules (6ft backyard, 4ft front yard).

Output full, modern, production-ready React / Tailwind JSX code with responsive breakpoints.
```
