# `CORE-01`: 🏡 Master Homepage Specification

> **Page ID**: `CORE-01`  
> **Route**: `/` (`app/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟡 Find It / 🟠 Frame It / 🟢 Fence It (Universal Front Door)  
> **Status**: 🔵 **Working / Needs Tweaks**

---

## 1. Purpose & Business Engine
- **Primary Goal**: High-converting, brand-defining entryway for Fence Frames. Introduces the 3-Pillar methodology (Find It, Frame It, Fence It), routes users instantly to their specific community guidelines, or drops them directly into pre-built catalogs and live CAD design.
- **Conversion Flywheel**: Search ZIP/HOA $\rightarrow$ Auto-detect localized bylaws $\rightarrow$ Choose Pathway (Browse Catalog, Custom Designer, Guided Wizard) $\rightarrow$ Save & Unlock ARC Blueprint.
- **Audience**: Homeowners seeking compliant fence replacement, licensed contractors looking for verified takeoffs, and HOA board members exploring the Community Partner Program.

---

## 2. Design System & Homepage Theme Alignment
Strictly adheres to the **Fence Frames Design System Law** and canonical homepage theme:
- **Typography Hierarchy (Rowdies Only)**:
  - `Rowdies Bold (700)`: Main hero headline (*"FRAME YOUR VISION | FIND YOUR FENCE"*), pillar title bars, Wood Grain Card headers, CTA buttons.
  - `Rowdies Regular (400)`: Search inputs, dropdown selects, step badges, feature labels.
  - `Rowdies Light (300)`: Value proposition paragraphs, trust badges, secondary descriptions.
- **Color Palette & Theme Tokens**:
  - Ground: Drafting Grid on Dark Ink (`#141B16`) with Parchment undertones (`#F4ECDC`).
  - Step 1 (Find It): Sun Gold (`#E5B842` / `var(--gold-sun)`).
  - Step 2 (Frame It): Ember Orange (`#F27A22` / `var(--ember)`).
  - Step 3 (Fence It): Bright Forest Green (`#4ADE80` / `var(--forest-bright)`).
  - Portal & Account Accents: Royal Blue (`#3B82F6`).
  - Inputs & Text Fill: Crisp Ivory (`#FAF6EE`) with solid 2px ink borders.
- **Card Standards**:
  - **Wood Grain Hero Card**: Natural cedar grain background with solid `#141B16` title bar, gold font, and 50% perimeter outside corner markers.
  - **Docked Explainer Plates**: Flushed seamlessly to the bottom of images, black fill, white Rowdies Light text, continuous thin green border (`1.5px solid var(--forest-bright)`).

---

## 3. Specific Controls & UI Elements Breakdown

### A. Global Navigation Header
- **Brand Wordmark**: "FENCE FRAMES" in Rowdies Bold (700) with ember orange framing compass icon.
- **Navigation Links**:
  - `Catalog` $\rightarrow$ Routes to `/catalog` (`DSGN-01`)
  - `Designer` $\rightarrow$ Routes to `/designer` (`DSGN-03`)
  - `Partners / Pro Portal` $\rightarrow$ Routes to `/partners` (`PRO-01`)
- **Auth Button**: `Log In / Sign Up` in Rowdies Regular (400), royal blue accent, routing to `/log-in` (`CORE-02`).

### B. Hero Section (2-Column Responsive Split)
- **Left Column (55% Hero Narrative & Location Matcher)**:
  - Tagline Pill: `[ WA PILOT • KING COUNTY LIVE ]` in Sun Gold border.
  - Main Headline: `FRAME YOUR VISION | FIND YOUR FENCE` (Rowdies 700, 2.75rem).
  - Subtext: "The architectural standard for residential fence design, HOA compliance, and verified contractor takeoff." (Rowdies 300).
  - **Find It Quick-Search Input Bar**:
    - Input: ZIP Code / Community Name (`placeholder="Enter ZIP (e.g. 98045) or HOA (e.g. Si View)..."`).
    - Button: `FIND MY CODE →` (Sun Gold background, Rowdies 700, black border).
    - Micro-Readout: "Instant match for height limits, setbacks, and pre-approved styles."

### C. Right Column (45% Wood Grain Card & 3-Pillar Launcher)
- **Graduated Wood Grain Card (`.has-outside-corners`)**:
  - Title Bar: `START YOUR BUILD` (Rowdies 700, Gold on Black).
  - Docked Media Preview: 180px high-res live render of Si View Heritage Picket fence with docked explainer plate.
  - **3 Pathway Launch Buttons**:
    1. 🟡 `1. Find It` $\rightarrow$ Quick ZIP jump to City/HOA hub (`GEO-CIT-01` / `GEO-COM-01`).
    2. 🟠 `2. Frame It` $\rightarrow$ Direct jump to Pre-Built Catalog (`DSGN-02`) or Designer (`DSGN-03`).
    3. 🟢 `3. Fence It` $\rightarrow$ Direct jump to 8.5x11 Blueprint Submittal (`CORE-03`).

### D. 3-Pillar Feature Showcase Strip
- **Card 1 (🟡 Find It — Code & HOA Matcher)**: Explains zero-guesswork compliance, city height limits, and ARC guidelines.
- **Card 2 (🟠 Frame It — 2D Configurator & Catalog)**: Explains the live 2D CAD visualizer, real-time footage slider, and material takeoffs.
- **Card 3 (🟢 Fence It — ARC Blueprint & Verified Takeoffs)**: Explains the 8.5x11 printable submittal packet and contractor bid scramble.

### E. Flagship Pilot Spotlight (Si View Community)
- Featured badge: `FLAGSHIP COMMUNITY: SI VIEW (NORTH BEND, WA)`.
- 4 pre-approved design thumbnail cards with 1-click configure triggers.

### F. Global Footer
- Municipal directory tree links (`/wa/king/north-bend`, `/wa/snohomish/everett`, etc.).
- B2B Links: Contractor Onboarding, HOA Partnership Deck, Admin Portal.
- Legal & Copyright notice.

---

## 4. Visual Wireframe & Obsidian UI Sketch

```ui-sketch
viewport: desktop
screen:
  - navbar:
      brand: "FENCE FRAMES"
      links:
        - "Catalog"
        - "Designer"
        - "Partners"
      button:
        label: "Log In / Sign Up"
        variant: "primary"
  - spacer: { size: "small" }
  - row:
      - col:
          - badge: { label: "WA PILOT • KING COUNTY LIVE", color: "yellow" }
          - heading:
              text: "FRAME YOUR VISION | FIND YOUR FENCE"
              level: 1
          - text: "The architectural standard for residential fence design, HOA compliance, and verified contractor takeoff."
          - spacer: { size: "small" }
          - row:
              - input:
                  label: "Find Local Guidelines"
                  placeholder: "Enter ZIP (e.g. 98045) or HOA (e.g. Si View)..."
              - button:
                  label: "FIND CODE →"
                  variant: "primary"
      - col:
          - card:
              title: "START YOUR BUILD"
              body: "180px High-Res Live Render (Si View Heritage Picket)"
              button:
                label: "Launch Configurator →"
                variant: "primary"
  - spacer: { size: "medium" }
  - heading: { text: "THE 3-PILLAR PROCESS", level: 2 }
  - row:
      - card:
          title: "1. FIND IT"
          body: "City building codes, frost lines, and pre-approved HOA guidelines."
          badge: { label: "Step 1 • Sun Gold", color: "yellow" }
      - card:
          title: "2. FRAME IT"
          body: "2D interactive CAD configurator, footage slider, and material takeoff."
          badge: { label: "Step 2 • Ember Orange", color: "orange" }
      - card:
          title: "3. FENCE IT"
          body: "Official 8.5x11 ARC Blueprint submittals and contractor bid scramble."
          badge: { label: "Step 3 • Forest Green", color: "green" }
  - spacer: { size: "medium" }
  - footer:
      links:
        - "Washington Directory (/wa)"
        - "Si View HOA Guide"
        - "Contractor Partner Program"
```

```
┌────────────────────────────────────────────────────────────────────────┐
│ [LOGO: FENCE FRAMES]   [Catalog]  [Designer]  [Partners]   [ 🔵 Log In ]│
├────────────────────────────────────────────────────────────────────────┤
│ LEFT (55%): HERO & LOCATION SEARCH    │ RIGHT (45%): WOOD GRAIN CARD   │
│                                       │ ┌────────────────────────────┐ │
│ 🟡 [ WA PILOT • KING COUNTY LIVE ]    │ │ 🟫 TITLE: START YOUR BUILD │ │
│                                       │ ├────────────────────────────┤ │
│ <h1>FRAME YOUR VISION |               │ │ [ 🖼️ 180px FENCE PREVIEW ] │ │
│     FIND YOUR FENCE</h1>              │ ├────────────────────────────┤ │
│ "Architectural compliance, real-time  │ │ 🟢 Docked Explainer Plate  │ │
│  takeoffs, verified contractors."     │ ├────────────────────────────┤ │
│                                       │ │ [ 🟡 1. Find It (HOA Match)]│
│ ┌───────────────────────┬───────────┐ │ │ [ 🟠 2. Frame It (Designer)]│
│ │ Enter ZIP or HOA...   │ FIND CODE │ │ │ [ 🟢 3. Fence It (Blueprint]│
│ └───────────────────────┴───────────┘ │ └────────────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ THE 3-PILLAR PROCESS:                                                  │
│ ┌─────────────────────┐ ┌─────────────────────┐ ┌────────────────────┐ │
│ │ 🟡 1. FIND IT       │ │ 🟠 2. FRAME IT      │ │ 🟢 3. FENCE IT     │ │
│ │ City Bylaws & HOAs  │ │ Live 2D Configurator│ │ 8.5x11 ARC Blueprint│ │
│ └─────────────────────┘ └─────────────────────┘ └────────────────────┘ │
├────────────────────────────────────────────────────────────────────────┤
│ FOOTER: Statewide SEO Tree • Partner Program • Contractor Network      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
- Global Brand Links / Direct URL entry (`/`).
- Header Logo click from any sub-page.

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Parameters |
| :--- | :--- | :--- | :--- |
| `FIND CODE →` Button | `/wa/king/north-bend` | `GEO-CIT-01` | `?zip=98045` or search query |
| `Si View` Community Card | `/wa/king/north-bend/si-view` | `GEO-COM-01` | Pre-loads Si View preset |
| `Catalog` Nav Link | `/catalog` | `DSGN-01` | None |
| `Designer` Nav Link | `/designer` | `DSGN-03` | None (loads default 120 LF) |
| `Log In / Sign Up` Button | `/log-in` | `CORE-02` | `?redirect=/` |
| `Partners` Nav Link | `/partners` | `PRO-01` | None |

---

## 6. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js (App Router) and Tailwind CSS engineer designing the Master Homepage (CORE-01) for Fence Frames ("FRAME YOUR VISION | FIND YOUR FENCE").

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies font family exclusively ('Rowdies', sans-serif). Rowdies Bold (700) for hero titles, wordmark, and action buttons. Rowdies Regular (400) for search inputs and navigation links. Rowdies Light (300) for body copy.
- COLOR PALETTE:
  - Step 1 (Find It): Sun Gold (#E5B842)
  - Step 2 (Frame It): Ember Orange (#F27A22)
  - Step 3 (Fence It): Bright Forest Green (#4ADE80)
  - Background Ground: Dark Ink (#141B16) with 25px minor / 100px major drafting grid
  - Card Fill: Solid Charcoal (#242220) and Ivory Fill (#FAF6EE)
  - Card Borders: Solid 2px #141B16 with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT:
1. HEADER: Brand logo ("FENCE FRAMES"), Catalog, Designer, Partners links, and Royal Blue "Log In" button.
2. 2-COLUMN HERO (55% / 45%):
   - Left: Tagline pill, <h1>FRAME YOUR VISION | FIND YOUR FENCE</h1>, description, and Sun Gold ZIP/HOA search bar with "FIND CODE →" button.
   - Right: Graduated Wood Grain Card with 180px docked media preview, docked explainer plate (1.5px green border), and 3 action buttons for Find It, Frame It, and Fence It.
3. 3-PILLAR FEATURE GRID: Sun Gold, Ember Orange, and Forest Green feature cards with 50% corner markers.
4. FOOTER: Navigation directory, B2B partner links, and copyright.

Output full, modern, production-ready React / Tailwind JSX code with responsive mobile breakpoints.
```
