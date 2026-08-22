# `DSGN-01`: 🖼️ Design Suite Hub Specification

> **Page ID**: `DSGN-01`  
> **Route**: `/catalog` & `/design` (`app/catalog/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟠 Frame It (Ember Orange `#F27A22`)  
> **Status**: 🔵 **Working / Needs Tweaks**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The central landing hub for the **Frame It** design ecosystem. Welcomes homeowners who want to explore residential fencing options and routes them into their optimal workflow:
  1. **Pre-Built Curated Catalog (`DSGN-02`)**: For users who want pre-designed, ready-to-order fences.
  2. **The Designer Configurator (`DSGN-03`)**: For users who want full 2D CAD customization and live footage sliding.
  3. **The Guided Style Match Wizard (`DSGN-05`)**: For users who want a 4-step questionnaire to find the right fence for their pets, terrain, and budget.
- **Conversion Philosophy**: Zero dead ends. Every pathway funnels cleanly into The Designer and converges on the Auth Gate to compile the Fence-Folio.

---

## 2. Design System & Homepage Theme Alignment
Inherits the full homepage visual identity and Design System Law:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Hub headline (*"CHOOSE YOUR DESIGN PATHWAY"*), pathway card titles, action buttons.
  - `Rowdies Regular (400)`: Style family filter chips, step badges, feature bullet points.
  - `Rowdies Light (300)`: Descriptions, guidance notes, and comparative readouts.
- **Color Palette & Theme Tokens**:
  - Primary Accent: Ember Orange (`#F27A22` / `var(--ember)`).
  - Secondary Accent: Sun Gold (`#E5B842` / `var(--gold-sun)`).
  - Background Ground: Dark Ink (`#141B16`) with 25px minor / 100px major drafting grid.
  - Cards: High-res Cedar Wood Grain cards with solid black ink title bars and 50% outside corner markers.
  - Docked Explainer Plates: Black fill, white Rowdies Light text, 1.5px green border.

---

## 3. Specific Controls & UI Elements Breakdown

### A. Hub Header & Quick Filter Strip
- **Main Headline**: `EXPLORE FENCE STYLES & DESIGN TOOLS` (Rowdies 700, 2.2rem, Ember Orange).
- **Subtext**: "Select a curated pre-built fence, design your own with live 2D CAD, or let our guided wizard match your property."
- **Style Category Quick-Filter Chips**:
  - `[ All Styles ]` • `[ 🌲 Vertical Privacy ]` • `[ 🌅 Horizontal Modern ]` • `[ 🖼️ Picture Frame ]` • `[ 🤝 Good Neighbor ]`

### B. The 3 Master Pathway Cards (Responsive 3-Column Grid)

#### 1. Pathway Card 1 · Pre-Built Catalog Carousel (`DSGN-02`)
- **Card Header**: `🗂️ PRE-BUILT CATALOG` (Rowdies 700, Gold on Black).
- **Hero Render**: Curated 3-card preview of popular horizontal and vertical assemblies.
- **Key Features**:
  - ✓ 100% pre-configured materials and finishes.
  - ✓ Curated styles with instant linear foot pricing ($42–$65/LF).
  - ✓ 1-click launch into footage sliding.
- **CTA Button**: `BROWSE PRE-BUILT LOOKS →` (Ember Orange background, routes to `/catalog/all`).

#### 2. Pathway Card 2 · The Designer Configurator (`DSGN-03`)
- **Card Header**: `📐 CUSTOM 2D DESIGNER` (Rowdies 700, Gold on Black).
- **Hero Render**: Live 2D CAD visualizer preview showing front/back ruler elevation.
- **Key Features**:
  - ✓ Real-time interactive footage slider (10 to 300 LF).
  - ✓ Customize posts, rails, pickets, caps, stains, and gates.
  - ✓ Instant live price estimator and unmasked BOM takeoff.
- **CTA Button**: `LAUNCH LIVE DESIGNER →` (Bright Green `#4ADE80` background, routes to `/designer`).

#### 3. Pathway Card 3 · Style Match Wizard (`DSGN-05`)
- **Card Header**: `🧭 STYLE MATCH WIZARD` (Rowdies 700, Gold on Black).
- **Hero Render**: Holographic compass icon with 4-step questionnaire preview.
- **Key Features**:
  - ✓ 4 simple questions (Purpose, Wind/Terrain, HOA, Budget).
  - ✓ Instant recommendations tailored to your local building codes.
  - ✓ Direct export into The Designer.
- **CTA Button**: `START 60-SEC QUIZ →` (Sun Gold `#E5B842` background, routes to `/wizard`).

### C. Bottom HOA Fast-Track Banner
- "Designing for a specific neighborhood? **Search your HOA Community (e.g. Si View, Riverbend, Highlands) →**" (Routes to `/wa/king/north-bend/si-view`).

---

## 4. Page Layout Wireframe (ASCII)

```ui-sketch
viewport: desktop
screen:
  - heading: { text: "EXPLORE FENCE STYLES & DESIGN TOOLS", level: 1 }
  - text: "Choose how you want to design your fence today:"
  - row:
      - badge: { label: "All Styles", color: "blue" }
      - badge: { label: "Vertical Privacy", color: "gray" }
      - badge: { label: "Horizontal Modern", color: "gray" }
      - badge: { label: "Picture Frame", color: "gray" }
  - spacer: { size: "medium" }
  - row:
      - card:
          title: "🗂️ PRE-BUILT CATALOG"
          body: "Pre-configured, ready-to-order curated looks."
          button: { label: "Browse Catalog →", variant: "primary" }
      - card:
          title: "📐 CUSTOM 2D DESIGNER"
          body: "Live 2D CAD visualizer, footage slider, and BOM."
          button: { label: "Launch Designer →", variant: "primary" }
      - card:
          title: "🧭 STYLE MATCH WIZARD"
          body: "4-step property questionnaire for wind, pets & budget."
          button: { label: "Start Quiz →", variant: "primary" }
```

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Trigger Action |
| :--- | :--- | :--- |
| **Master Homepage** | `CORE-01` | Header link *"Catalog"* or *"Start Your Build"* |
| **Homeowner Showcase** | `HOME-01` | *"Start a New Build"* button |
| **City Hubs** | `GEO-CIT-01` | *"Explore All Fence Styles"* button |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Parameters |
| :--- | :--- | :--- | :--- |
| `BROWSE PRE-BUILT LOOKS →` | `/catalog/[fencestyle]` | `DSGN-02` | `?filter=all` or selected chip |
| `LAUNCH LIVE DESIGNER →` | `/designer` | `DSGN-03` | Defaults to 120 LF Cedar Picket |
| `START 60-SEC QUIZ →` | `/wizard` | `DSGN-05` | Boots quiz state |
| `Search HOA Community →` | `/wa/king/north-bend/si-view` | `GEO-COM-01` | Loads Si View guidelines |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the Design Suite Hub (DSGN-01) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for headline, card headers, and button text. Rowdies Regular (400) for category chips and feature bullet points. Rowdies Light (300) for descriptions.
- COLOR PALETTE (Frame It):
  - Primary Accent: Ember Orange (#F27A22)
  - Secondary Accent: Sun Gold (#E5B842)
  - Action CTA: Bright Green (#4ADE80)
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Card Backdrops: High-res Cedar Wood Grain cards with 50% perimeter outside corner markers

### PAGE LAYOUT:
1. HEADER: Headline "EXPLORE FENCE STYLES & DESIGN TOOLS" + horizontal category filter chips (Vertical, Horizontal, Picture Frame, Good Neighbor).
2. 3-COLUMN RESPONSIVE GRID:
   - Card 1: "PRE-BUILT CATALOG" (Pre-configured assemblies) + Ember Orange "BROWSE CATALOG →" button.
   - Card 2: "CUSTOM 2D DESIGNER" (Live 2D CAD configurator & BOM) + Bright Green "LAUNCH DESIGNER →" button.
   - Card 3: "STYLE MATCH WIZARD" (4-step guided quiz) + Sun Gold "START QUIZ →" button.
3. DOCKED PLATES: Every card features a black docked explainer plate with 1.5px green border.
4. HOA FOOTER CALLOUT: Fast-track link to localized HOA community presets.

Output full, modern, production-ready React / Tailwind JSX code with responsive breakpoints.
```
