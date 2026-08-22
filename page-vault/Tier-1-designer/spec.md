# `DSGN-03`: 📐 The Designer Configurator Specification

> **Page ID**: `DSGN-03`  
> **Route**: `/designer` & `/designer/[fencestyle]` (`app/designer/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟠 Frame It (Ember Orange `#F27A22`)  
> **Status**: 🔵 **Working / Needs Tweaks**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The universal CAD and parametric design engine for Fence Frames. Serves as the single convergence point for all discovery pathways (Catalog, Wizard, Community Presets) and compiles live architectural assemblies in real time.
- **The Guest Experience**: 100% interactive without requiring an account. Homeowners and contractors can slide linear footage, customize post styles, change pickets, select stains, and watch real-time pricing updates calculate live.
- **The Single Ship Point**: When a user is satisfied with their design and clicks *"Save Fence-Folio & Get Blueprint"*, the full state payload is bundled and shipped into the **Auth Gate (`CORE-02`)** to create a verified account and unlock the 8.5x11 ARC Blueprint.

---

## 2. Visual Interface & Live Canvas Module

```ui-sketch
viewport: desktop
screen:
  - row:
      - select: { label: "Fence Style", options: ["Vertical Cedar Picket", "Horizontal Shiplap", "Picture Frame"] }
      - input: { label: "ZIP Code", placeholder: "98045" }
      - input: { label: "Linear Feet", placeholder: "120" }
      - select: { label: "Gates", options: ["1 Walk Gate (4ft)", "None", "Double Drive (10ft)"] }
  - spacer: { size: "small" }
  - row:
      - col:
          - card:
              title: "SUB-FLIP CONTROLS"
              body: "General • Posts • Rails • Pickets • Stain • Trim • Hardware"
      - col:
          - card:
              title: "LIVE 2D DRAFTING BOARD"
              body: "Dual Front & Back Viewports • 0' to 8' Ruler Grid • Grass Turf Line"
  - spacer: { size: "small" }
  - row:
      - stat: { label: "Estimated Price / LF", value: "## 6. Comprehensive Linking7.49 – $50.72" }
      - stat: { label: "120 LF Total Estimate", value: "$4,498 – $6,086" }
      - button: { label: "🟢 SAVE FENCE-FOLIO & GET BLUEPRINT", variant: "primary" }
```

## 6. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger | Passed State / Parameters |
| :--- | :--- | :--- | :--- |
| **Pre-Built Catalog** | `DSGN-02` | Clicking *"Customize in Designer"* | `/designer/[fencestyle]` (Loads pre-built SKU) |
| **Design Suite Hub** | `DSGN-01` | Clicking *"Launch Custom Designer"* | `/designer` (Loads default Cedar Picket) |
| **Style Wizard** | `DSGN-05` | Completing 4-step quiz | `/designer/[fencestyle]?preset=privacy` |
| **Si View Community** | `GEO-COM-01` | Clicking *"Configure Design 01"* | `/designer/si-view-design-01` |
| **Homeowner Account** | `HOME-01` | Clicking *"Edit Build"* on saved Folio | Re-opens saved Folio state |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Result |
| :--- | :--- | :--- | :--- |
| `SAVE FENCE-FOLIO & GET BLUEPRINT` | `/log-in` | `CORE-02` | Ships full configuration JSON to Auth Gate |
| `FIND A FENCE BUILDER` | `/contractors` | `PRO-04` | Dispatches verified footage & BOM to local pros |
| `BLUEPRINT` Sub-Tab | `/blueprint` | `CORE-03` | Opens full 8.5x11 architectural sheet view |

---

## 7. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js (App Router) and Tailwind CSS engineer designing the core 2D interactive fence configurator ("The Designer" - DSGN-03) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for headline readouts, footage numbers (120 LF), and price totals ($5,760). Rowdies Regular (400) for sub-flip tabs, dropdowns, and button labels. Rowdies Light (300) for dimensions.
- COLOR PALETTE (Frame It):
  - Primary Accent: Ember Orange (#F27A22)
  - Secondary Accent: Sun Gold (#E5B842)
  - Action CTA: Bright Forest Green (#4ADE80) with 2px solid #141B16 border
  - Background Ground: Dark Ink (#141B16) with subtle drafting grid pattern
  - Controls Fill: Charcoal Solid (#242220) and Ivory (#FAF6EE) with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT & COMPONENT HIERARCHY:
1. TOP CONTROLS STRIP:
   - Fence Type & Style dropdowns (Vertical Cedar, Horizontal Board, Picture Frame).
   - Project Specs: Checkboxes (New Install, Repair, Demo), Location ZIP, Community indicator, Linear FT input.
   - Gate Studio: Walk Gate and Mower Gate selects + "DESIGN GATE" CTA.
2. LEFT SUB-FLIP TABS: Accordion buttons for [ General | Posts | Rails | Pickets | Stain | Trim | Hardware ].
3. CENTER 2D CANVAS BOARD:
   - Dual FRONT and BACK SVG visualizer side-by-side with 2ft ruler grids (0' to 8' scale) over grass turf line.
   - Zoom controls (.5x, .75x, 1x, 1.5x, 2x).
4. BOTTOM ESTIMATE STRIP:
   - Itemized breakdown table (General $42.00/LF, Rails, Stain, Hardware, Admin +$2.10/LF).
   - Real-time Price Box (Per LF: $37.49 - $50.72 • Total: $4,498 - $6,086 for 120 LF).
   - Bright Green "SAVE FENCE-FOLIO & GET BLUEPRINT" button routing to /log-in.

Output full, modern, production-ready React / Tailwind JSX code with interactive state hooks.
```
