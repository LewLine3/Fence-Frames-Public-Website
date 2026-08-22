# `DSGN-02`: 🗂️ Pre-Built Catalog Carousel Specification

> **Page ID**: `DSGN-02`  
> **Route**: `/catalog/[fencestyle]` (`app/catalog/[fencestyle]/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟠 Frame It (Ember Orange `#F27A22`)  
> **Status**: 🟠 **In Progress**

---

## 1. Purpose & Business Engine
- **Primary Goal**: A curated catalog of fully pre-designed, ready-to-build fence styles. Unlike a static photo showcase, every pre-built item is constructed using the exact same parametric components that power The Designer and the Bill of Materials (BOM) engine.
- **The Carousel Architecture**:
  - **Desktop View**: Shows **3 fences at a time** in a clean horizontal carousel with clickable left/right navigation chevrons.
  - **Mobile View**: Shows **1 fence at a time** with touch-friendly swipe gesture controls.
  - **Curation Strategy**: The first 1–3 groups of fences are strictly owner-curated for popular styles (e.g. Si View Heritage, Horizon Modern Horizontal, Estate Picture Frame). Subsequent pages dynamically generate usable, architecturally valid fence variations from the modular configurator parts library.
- **Conversion Gateway**: Clicking *"Customize Footage in Designer →"* immediately boots **The Designer (`DSGN-03`)** pre-loaded with that exact fence assembly's components.

---

## 2. Design System & Homepage Theme Alignment
Strictly adheres to the **Fence Frames Design System Law** and homepage aesthetic:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Catalog title, fence model names (*"Horizon Modern Horizontal #01"*), price per linear foot readouts (`$48 / LF`).
  - `Rowdies Regular (400)`: Dropdown filters, pagination counters (`1 of 6`), carousel chevrons, card CTA buttons.
  - `Rowdies Light (300)`: Component specifications (pickets, posts, rails, fasteners), style descriptions.
- **Color Palette & Theme Tokens**:
  - Primary Accent: Ember Orange (`#F27A22` / `var(--ember)`).
  - Price Highlight: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Background Ground: Dark Ink (`#141B16`) with subtle drafting grid pattern.
  - Cards: Cedar Wood Grain backdrops with solid black title bars and 50% outside corner markers.
  - Docked Explainer Plates: Black fill, white text, 1.5px green continuous border.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Top Filter & Search Bar
- **Breadcrumb Navigation**: `Catalog > [Style Family: Horizontal Cedar ▼]`
- **Filter Dropdown Selectors**:
  - `Style Category`: All Styles, Vertical Privacy, Modern Horizontal, Picture Frame, Good Neighbor, Welded Wire.
  - `Fence Height`: All Heights, 4ft Front Yard, 5ft Pool, 6ft Privacy.
  - `Post Material`: 4x4 Pressure Treated, Clear Cedar, Steel Posts.
- **Pagination Counter & Jump**: `Showing Styles 1–3 of 12` with quick dot indicators.

### B. Desktop 3-Card Carousel (Mobile 1-Card Swiper)
- **Navigation Controls**:
  - Left Chevron: `[ ◀ Previous 3 ]` (Rowdies 700, disabled on page 1).
  - Right Chevron: `[ Next 3 ▶ ]` (Rowdies 700, loads next curated or procedural group).
- **Each Pre-Built Card Component (`.has-outside-corners`)**:
  1. **Solid Ink Title Bar**: Style Name (e.g. `VPF-01: Heritage Cedar Picket`) + Gold Pillar Corner Dot.
  2. **High-Res Elevation Render**: 240px tall front & back 2D CAD visual representation.
  3. **Docked Explainer Plate (Seamlessly Flushed to Image)**:
     - Component Tags: `6ft Height` • `1x6 Clear Cedar` • `2x4 Framing` • `Natural Stain`
     - Linear Foot Pricing: `Starting at $42.00 / LF` (Bright Green Bold).
     - Material Takeoff Quick-Look: `Posts: 4x4 PT • Rails: 2-Rail • Pickets: T&G`.
  4. **Primary Card Action Button**:
     - `[ 🟠 Customize in Designer → ]` (Deep-links to `/designer/[fencestyle]`).
     - `[ 📄 View Spec Sheet ]` (Opens quick blueprint modal).

### C. Direct Parameterized URL Handling (`/[fencestyle]`)
- Navigating to `/catalog/horizontal-cedar` automatically locks the category filter to Horizontal Cedar and displays the curated horizontal trio.
- Navigating to `/catalog/si-view` filters to Si View HOA pre-approved Designs 01–04.

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - heading: { text: "PRE-BUILT FENCE CATALOG", level: 1 }
  - row:
      - select: { label: "Style Category", options: ["Horizontal Modern", "Vertical Privacy", "Picture Frame"] }
      - select: { label: "Height", options: ["6ft Privacy", "4ft Front Yard", "5ft Pool"] }
      - select: { label: "Post Type", options: ["4x4 PT Incised", "Clear Cedar", "Steel Post"] }
  - spacer: { size: "medium" }
  - row:
      - card:
          title: "HORIZON MODERN 01"
          body: "6ft Horizontal Clear Cedar • $48.00 / LF"
          button: { label: "Customize Footage →", variant: "primary" }
      - card:
          title: "HERITAGE PRIVACY 01"
          body: "6ft Solid Vertical Picket • $42.00 / LF"
          button: { label: "Customize Footage →", variant: "primary" }
      - card:
          title: "ESTATE PICTURE FRAME"
          body: "6ft Picture Frame w/ Top Cap • $56.00 / LF"
          button: { label: "Customize Footage →", variant: "primary" }
  - pagination: { current: 1, total: 4 }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Action | Passed State |
| :--- | :--- | :--- | :--- |
| **Design Suite Hub** | `DSGN-01` | Clicking *"Browse Pre-Built Looks"* | `/catalog/[fencestyle]` |
| **Master Homepage** | `CORE-01` | Clicking *"Frame It"* quick launcher | Pre-selects popular category |
| **Si View Community** | `GEO-COM-01` | Clicking *"View Si View Catalog"* | Locks filter to Si View presets |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `Customize in Designer →` | `/designer/[fencestyle]` | `DSGN-03` | Loads pre-built component manifest into 2D canvas |
| `View Spec Sheet` | Quick Modal / `/blueprint` | `CORE-03` | Pre-populates 8.5x11 blueprint sheet |
| `Save to Account` | `/log-in` | `CORE-02` | Stores style SKU for unauthenticated users |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer building the Pre-Built Fence Catalog Carousel (DSGN-02) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for style names, price per linear foot ($48/LF), and CTA buttons. Rowdies Regular (400) for dropdown filters and pagination numbers. Rowdies Light (300) for component specifications.
- COLOR PALETTE (Frame It):
  - Primary Accent: Ember Orange (#F27A22)
  - Price Tag: Bright Forest Green (#4ADE80)
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Card Backdrops: High-res Cedar Wood Grain cards with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT & CAROUSEL:
1. FILTER TOOLBAR: Dropdown menus for Style Category (Horizontal, Vertical, Picture Frame, Good Neighbor), Height (4ft, 5ft, 6ft), and Post Type + pagination readout (Page 1 of 4).
2. CAROUSEL CONTAINER:
   - Desktop (3 Cards Wide): 3 Wood Grain Cards displayed side-by-side with Left and Right chevron buttons.
   - Mobile: 1 Card wide with horizontal swipe snap.
3. PRE-BUILT CARD SPEC:
   - Solid Ink Title Bar with Style ID and Gold Pillar Corner Dot.
   - 240px Front/Back 2D CAD visual representation.
   - Docked Explainer Plate with 1.5px green border showing specs (1x6 cedar, 2x4 framing, natural stain) + "$48.00 / LF" price.
   - Ember Orange "CUSTOMIZE IN DESIGNER →" button that deep-links to /designer/[fencestyle].

Output full, modern, production-ready React / Tailwind JSX code with interactive carousel state.
```
