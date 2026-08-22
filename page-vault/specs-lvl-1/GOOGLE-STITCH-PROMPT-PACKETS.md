# 🧵 Fence Frames — Google Stitch Master Prompt Packets
> **Canonical Target**: Complete 12-Page LVL 1 Build Suite  
> **Design Law Reference**: [`FenceBook/docs/DESIGN-RULES.md`](file:///c:/Users/TwoLe/Lew-Line-Workspaces/FenceBook/docs/DESIGN-RULES.md)

---

## 📋 Global Design Token System (Included in Every Packet)
- **Typography**: Rowdies font family exclusively (`'Rowdies', sans-serif`).
  - `700 Bold`: Headlines, main hero titles, card title bars, brand wordmarks.
  - `400 Regular`: Sub-headings, buttons, field labels (ZIP, HOA), step names, dropdown selects.
  - `300 Light`: Body paragraphs, descriptions, live feedback readouts.
- **Pillar Color Palette**:
  - 🟡 **Find It (Step 1)**: Sun Gold (`#E5B842` / `var(--gold-sun)`)
  - 🟠 **Frame It (Step 2)**: Ember Orange (`#F27A22` / `var(--ember)`)
  - 🟢 **Fence It (Step 3)**: Bright Forest Green (`#4ADE80` / `var(--forest-bright)`)
  - 🔵 **Portals & Auth**: Royal Blue (`#3B82F6`)
  - ⬛ **Surfaces & Linework**: Solid Ink (`#141B16`), Ivory Fill (`#FAF6EE`), Parchment Ground (`#F4ECDC`)
- **Graduated Card & Outside Corner Law**:
  - Solid 2px ink borders, 50% perimeter wall span on outside corner marks, docked explainer plates flushed seamlessly to image bottoms.

---

# 🚀 STAGE 1: CORE ENGINE & MATH PROOF

---

### 📦 Packet 01 · `DSGN-03`: The Designer Configurator
**Route**: `/designer` & `/designer/[fencestyle]` (`app/designer/page.tsx`)  
**Pillar**: 🟠 Frame It (Ember Orange `#F27A22`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js (App Router) and Tailwind CSS engineer designing the universal 2D interactive fence configurator ("The Designer") for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family only. Rowdies Bold (700) for headlines, titles, linear footage numbers, and live price totals. Rowdies Regular (400) for button labels, tab buttons, and dropdowns. Rowdies Light (300) for explanations.
- COLOR PALETTE (Frame It):
  - Primary Accent: Ember Orange (#F27A22)
  - Secondary Accent: Sun Gold (#E5B842)
  - Action CTA: Bright Green (#4ADE80) with 2px solid #141B16 border
  - Background Ground: Dark Ink (#141B16) with subtle drafting grid
  - Card Fill: Charcoal Solid (#242220) and Ivory Fill (#FAF6EE)

### PAGE LAYOUT & COMPONENT HIERARCHY:
1. TOP HEADER & CONTROLS STRIP:
   - Fence Type Dropdown (Vertical Fence, Horizontal Board, Picture Frame)
   - Fence Style Selector (Cedar Picket, Shiplap, Good Neighbor)
   - Project Specs: Checkboxes (New Install, Repair, Demo), ZIP Code input (e.g. 98045), Community indicator (e.g. Si View HOA), Linear Footage input.
   - Design Gate Widget: Selects for Walk Gate (4ft, 5ft), Double Drive Gate (10ft, 12ft) + CTA "DESIGN GATE".
2. LEFT VERTICAL SUB-FLIPS (Accordion Tabs):
   - [ General | Posts | Rails | Pickets | Stain | Trim | Hardware ]
3. CENTER DRAFTING BOARD (Live 2D Canvas):
   - Dual FRONT and BACK SVG elevations side-by-side with 2ft ruler grids (0' to 8' scale) over clean grass turf line.
   - Real-time zoom controls (.5x, .75x, 1x, 1.5x, 2x).
4. BOTTOM CALCULATOR & ESTIMATE BAR:
   - Left: "Your Design" with Blueprint, Mat List, Ledger quick tabs + Green CTA: "FIND A FENCE BUILDER".
   - Center: Itemized breakdown table (General $42.00/LF, Rails, Stain, Hardware, Admin +$2.10/LF).
   - Right: Real-time Price Box (Per LF: $37.49 - $50.72 • Total Range: $299.88 - $405.72 for 8 LF).
   - "Save Fence-Folio & Get Blueprint" CTA button routing to Auth Gate (/log-in).

### REACT STATE HOOKS:
- const [fenceStyle, setFenceStyle] = useState('cedar-picket');
- const [linearFeet, setLinearFeet] = useState(120);
- const [height, setHeight] = useState('6ft');
- const [activeSubFlip, setActiveSubFlip] = useState('general');
- const [zoom, setZoom] = useState(1);

Output full, modern, production-ready React / Tailwind JSX code with interactive states.
```

---

### 📦 Packet 02 · `CORE-03`: Portrait ARC Architectural Blueprint
**Route**: `/blueprint` (`app/blueprint/page.tsx`)  
**Pillar**: 🟢 Fence It (Forest Green `#4ADE80`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the official 8.5" x 11" Portrait Architectural Blueprint Submittal sheet for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family only. Rowdies Bold (700) for title block, section titles, and total calculations. Rowdies Regular (400) for table headers, BOM items, and dimension markers. Monospace code font for lumberyard SKU codes.
- COLOR PALETTE (Fence It):
  - Paper Ground: Architectural White (#FFFFFF) with subtle parchment grid
  - Dimension Callouts & Border Accents: Forest Green (#4ADE80)
  - Drawing Linework & Title Block: Solid Ink (#141B16)

### PAGE LAYOUT (8.5" x 11" Portrait Printable Canvas):
1. TOP ACTION TOOLBAR (Hidden in @media print):
   - [ 🖨️ Print 8.5x11 ]
   - [ Pricing Toggle: ON (Full Ledger) / OFF (Clean ARC Submittal) ]
   - [ 💾 Export PDF ]
2. ARCHITECTURAL TITLE BLOCK (Top of Sheet):
   - Project: Si View Lot #42 Fence Replacement
   - Location: North Bend, WA 98045
   - Date, Scale (1/2" = 1'-0"), Sheet 1 of 1, Auth Hash: #FF-8921-WA
3. 2D CAD ELEVATION DRAWING (Center):
   - Detailed exploded elevation showing 4x4 posts, 2x4 framing rails, 1x6 cedar pickets, and 1x4 trim caps.
   - Dimension lines: 6'-0" Height callout, Post-to-post 6'-0" O.C. spacing, 2" ground clearance.
4. ITEMIZED BILL OF MATERIALS (BOM) TABLE (Bottom):
   - Columns: Item #, Description, Dimension/Spec, Quantity, Unit, Category (Mat/Lab/Adm).
   - Dynamic toggle hides cost columns when Pricing Toggle is OFF for clean ARC HOA submission.

Output full, modern, production-ready React / Tailwind JSX code with @media print CSS rules for clean 8.5x11 pagination.
```

---

# 🚀 STAGE 2: LEAD PROTECTION & ACCOUNT COMPILATION

---

### 📦 Packet 03 · `CORE-02`: Auth & Backcheck Gate
**Route**: `/log-in` & `/sign-up` (`app/log-in/page.tsx`)  
**Pillar**: 🔵 Portals & Accounts (Royal Blue `#3B82F6`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the high-converting Auth & Backcheck Gate for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for modal headers and OTP digits. Rowdies Regular (400) for input labels, submit buttons, and toggle links. Rowdies Light (300) for subtext and security guarantees.
- COLOR PALETTE:
  - Header & Primary Action: Royal Blue (#3B82F6) & Ember Orange (#F27A22)
  - Background Ground: Frosted dark ink backdrop with wood grain card container
  - Inputs: Ivory (#FAF6EE) with solid 2px ink borders

### PAGE LAYOUT & FUNCTIONALITY:
1. VALUE-LOCK INTERCEPT CARD:
   - Header: "🔒 Save Your Custom Fence-Folio & Unlock ARC Blueprint"
   - Subtext: "Instant access to your official 8.5x11 architectural blueprint, itemized BOM, and contractor pricing."
2. 2-STEP SMS OTP VERIFICATION:
   - Step 1: Full Name, Email Address, Mobile Phone Number, Property ZIP Code.
   - Step 2: 6-Digit SMS OTP verification code with 60-second resend timer.
3. ROLE SWITCHING FOOTER:
   - Link: "Are you a verified fence contractor or HOA manager? Switch to Partner Portal →"

### REACT STATE HOOKS:
- const [step, setStep] = useState<'details' | 'otp'>('details');
- const [phone, setPhone] = useState('');
- const [otp, setOtp] = useState(['', '', '', '', '', '']);

Output full, modern, production-ready React / Tailwind JSX code with OTP input autofocus handling.
```

---

### 📦 Packet 04 · `HOME-01`: Homeowner Account & Showcase
**Route**: `/homeowner` (`app/homeowner/page.tsx`)  
**Pillar**: 🔵 Portals & Accounts (Royal Blue `#3B82F6`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the Homeowner Dashboard & Saved Folio Showcase for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for project names and price readouts. Rowdies Regular (400) for status badges and button controls.
- COLOR PALETTE:
  - Accent: Royal Blue (#3B82F6) and Sun Gold (#E5B842)
  - Card Fill: Charcoal Solid (#242220) with wood grain borders

### PAGE LAYOUT:
1. HEADER:
   - Welcome banner: "Welcome back, [Homeowner Name]" • Property: 1420 Mt Si Blvd, North Bend, WA
2. SAVED FENCE-FOLIO GALLERY (3–5 Project Cards):
   - Card Top: Style preview thumbnail (e.g. Si View Design 01 Horizontal Cedar).
   - Card Mid: Specs summary (120 LF • 6ft Height • Natural Cedar Stain • Est. $5,760).
   - Card Actions:
     - [ 📄 View Portrait PDF ]
     - [ ✏️ Re-Open in Designer (/designer/[fencestyle]) ]
     - [ ⚡ Request Contractor Bids (/contractors) ]
3. ACTIVE BID & PERMIT STATUS TRACKER:
   - Status chips: 🟢 ARC Approved • 🟡 2 Contractor Bids Received ($48/LF, $52/LF).

Output full, modern, production-ready React / Tailwind JSX code with interactive project switching.
```

---

### 📦 Packet 05 · `HOME-02`: Static Portrait Fence-Folio (8.5x11 PDF)
**Route**: `/homeowner/folio/[id]` (`app/homeowner/folio/[id]/page.tsx`)  
**Pillar**: 🟢 Fence It (Forest Green `#4ADE80`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the multi-page 8.5" x 11" Portrait Fence-Folio Document Viewer & PDF Export for Fence Frames.

### DESIGN SYSTEM LAW:
- 6-CHAPTER SPINE NAVIGATION:
  1. Cover Page · 2. Community & HOA Guidelines · 3. Materials & Takeoff · 4. ARC Blueprint & BOM · 5. Add-ons & Gates · 6. Financial Ledger
- SUB-FLIP STAGES: General → Framing → Fill & Trim → Finish
- TYPOGRAPHY: Pure Rowdies (700/400/300) with clean print margins.

### PAGE LAYOUT:
1. TOP FOLIO CONTROLS:
   - Chapter pill navigation bar (Cover, Community, Materials, Blueprint, Gates, Ledger).
   - Export buttons: [ 🖨️ Print Full Folio ] [ 📄 Download PDF ].
2. PAGE VIEWER (8.5x11 Portrait Pages):
   - Page 1: Formal Presentation Cover with project title, homeowner name, location, and hero fence render.
   - Page 2: HOA Community Compliance Certificate (Si View ARC Standard).
   - Page 3: Architectural CAD Drawing & Itemized Bill of Materials.
   - Page 4: Complete Labor & Materials Cost Ledger.

Output full, modern, production-ready React / Tailwind JSX code optimized for screen review and print rendering.
```

---

# 🚀 STAGE 3: TOP-OF-FUNNEL DISCOVERY & ENTRYWAYS

---

### 📦 Packet 06 · `DSGN-02`: Pre-Built Catalog Carousel
**Route**: `/catalog/[fencestyle]` (`app/catalog/[fencestyle]/page.tsx`)  
**Pillar**: 🟠 Frame It (Ember Orange `#F27A22`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the Pre-Built Fence Catalog Carousel for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for fence style titles and pricing. Rowdies Regular (400) for filter chips and buttons.
- COLOR PALETTE: Ember Orange (#F27A22) with Wood Grain Cards and Sun Gold (#E5B842) labels.

### PAGE LAYOUT:
1. FILTER & SEARCH BAR:
   - Style Family Dropdown (Vertical Privacy, Modern Horizontal, Picture Frame, Welded Wire).
   - Height Filters (4ft, 5ft, 6ft) • Budget Range Slider.
2. PRE-BUILT CAROUSEL DISPLAY:
   - Desktop: 3 pre-built fence cards displayed side-by-side with Left/Right chevron arrows.
   - Mobile: 1-card swipe carousel.
3. WOOD GRAIN CARD COMPONENT (For each pre-built option):
   - Top: Cedar Wood Grain header with style title ("Horizon Modern Horizontal #01").
   - Center: High-res front/back elevation render.
   - Bottom Docked Explainer Plate: Specs (6ft clear cedar, 1x6 boards, 2x4 top cap) + Base Price ($48/LF).
   - CTA: "Customize Footage in Designer →" (Deep-links to /designer/[fencestyle]).

Output full, modern, production-ready React / Tailwind JSX code with carousel navigation logic.
```

---

### 📦 Packet 07 · `DSGN-01`: Design Suite Hub
**Route**: `/catalog` (`app/catalog/page.tsx`)  
**Pillar**: 🟠 Frame It (Ember Orange `#F27A22`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the Design Suite Hub front door for Fence Frames.

### DESIGN SYSTEM LAW:
- 3-PILLAR PATHWAY CARDS:
  1. Card 1: 🗂️ "Browse Pre-Built Catalog" → Routes to /catalog/all (Pre-assembled curated looks).
  2. Card 2: 📐 "Launch Custom Designer" → Routes to /designer (Live 2D CAD configurator).
  3. Card 3: 🧭 "Take Style Match Wizard" → Routes to /wizard (4-step guided quiz).
- TYPOGRAPHY: Rowdies Bold (700) for card titles; Rowdies Regular (400) for action buttons.
- CARD STANDARDS: Wood Grain backdrops with 50% outside corner markers.

Output full, modern, production-ready React / Tailwind JSX code with 3-card responsive grid layout.
```

---

### 📦 Packet 08 · `GEO-COM-01`: Si View Flagship HOA Community Hub
**Route**: `/wa/king/north-bend/si-view` (`app/[state]/[county]/[city]/[community]/page.tsx`)  
**Pillar**: 🟡 Find It (Sun Gold `#E5B842`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the flagship HOA Community landing page for Si View in North Bend, WA.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for community headlines; Rowdies Regular (400) for ARC guideline points.
- COLOR PALETTE (Find It): Sun Gold (#E5B842) headers, Forest Green (#4ADE80) approval badges, Dark Ink (#141B16) background.

### PAGE LAYOUT:
1. BREADCRUMB & HEADER:
   - Breadcrumb: Washington > King County > North Bend > Si View HOA
   - Hero: "Si View HOA Pre-Approved Fence Standards (North Bend, WA)"
   - Subtext: "Architectural Review Committee (ARC) pre-certified fence specifications and 1-click submittal builder."
2. 4-CARD PRE-APPROVED DESIGNS GRID:
   - Card 1: Si View Design 01 · 6ft Heritage Solid Vertical Cedar Privacy
   - Card 2: Si View Design 02 · 6ft Picture Frame Architectural with 2x4 Top Cap
   - Card 3: Si View Design 03 · 6ft Horizon Modern Horizontal Shiplap
   - Card 4: Si View Design 04 · 6ft Homestead Good Neighbor Alternating Pickets
3. CARD ACTION:
   - Button on each card: "Configure This Style in Designer →" (Routes to /designer/si-view-design-01).
4. COMMUNITY GUIDELINES SIDEBAR:
   - Height limits (6ft backyard, 4ft front yard), approved stain colors (SW-3558 Asteroid, Natural Cedar), setback requirements.

Output full, modern, production-ready React / Tailwind JSX code with SEO meta tags and breadcrumb markup.
```

---

### 📦 Packet 09 · `GEO-CIT-01`: North Bend Flagship City Hub
**Route**: `/wa/king/north-bend` (`app/[state]/[county]/[city]/page.tsx`)  
**Pillar**: 🟡 Find It (Sun Gold `#E5B842`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the North Bend City Guide & Contractor Directory hub for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for city titles; Rowdies Regular (400) for municipal code tables.
- COLOR PALETTE (Find It): Sun Gold (#E5B842) and Forest Green (#4ADE80).

### PAGE LAYOUT:
1. CITY HERO:
   - "North Bend, WA Fence Regulations & Verified Contractor Directory"
   - Municipal wind load advisory (Mt. Si valley gusts: 80mph exposure B).
2. ACTIVE HOA COMMUNITIES GRID:
   - Cards for Riverbend, Si View (Flagship), and Forster Woods linking to their community pages.
3. LOCAL LICENSED CONTRACTOR SHOWCASE:
   - 3 verified contractor profile cards with L&I license badges, verified reviews, and "Request Bid" buttons.
4. MUNICIPAL CODE SUMMARY TABLE:
   - Setbacks, permit thresholds, corner lot visibility rules.

Output full, modern, production-ready React / Tailwind JSX code.
```

---

### 📦 Packet 10 · `CORE-01`: Master Homepage
**Route**: `/` (`app/page.tsx`)  
**Pillar**: 🟡 Find It / 🟠 Frame It / 🟢 Fence It | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the Master Homepage for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for main hero headline ("FRAME YOUR VISION | FIND YOUR FENCE"). Rowdies Regular (400) for search inputs and CTAs. Rowdies Light (300) for value proposition body text.
- 2-COLUMN HERO LAYOUT:
  - Left (55%): Headline, value narrative, and ZIP Code / HOA Search bar (Find It in Sun Gold #E5B842).
  - Right (45%): Wood Grain Card featuring live 180px docked media preview and 3-step pathway launcher (Find It, Frame It, Fence It).
- HEADER & FOOTER:
  - Header: Fence Frames brand logo, Catalog link, Designer link, Partners link, Sign In button.
  - Footer: Multi-state directory links (/wa/king/north-bend), HOA partner program, copyright.

Output full, modern, production-ready React / Tailwind JSX code with responsive breakpoints.
```

---

# 🚀 STAGE 4: MARKETPLACE MONETIZATION

---

### 📦 Packet 11 · `PRO-04`: Marketplace Dispatch Center
**Route**: `/contractors` (`app/contractors/page.tsx`)  
**Pillar**: 🟢 Fence It (Forest Green `#4ADE80`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the Marketplace Dispatch Center for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for dispatch titles; Rowdies Regular (400) for filter toggles and bid buttons.
- COLOR PALETTE: Forest Green (#4ADE80) and Charcoal Solid (#242220).

### PAGE LAYOUT:
1. DISPATCH HEADER:
   - "Verified Fence Contractor Marketplace — North Bend & King County"
2. PROJECT LEAD BOARD (Homeowner Pre-Scoped Jobs):
   - Lead Cards showing: Job #, City/ZIP, Fence Style, Linear Footage, Verified BOM Status, Target Install Date.
   - Status Badge: ⚡ "3 Seats Available" / "2 Seats Remaining" / "FILLED (72-hr limit)".
3. CONTRACTOR ACTION:
   - [ ⚡ Claim Job Seat ($29) ]
   - [ 📄 Download Verified Blueprint & BOM Takeoff ]

Output full, modern, production-ready React / Tailwind JSX code.
```

---

### 📦 Packet 12 · `PRO-05`: Targeted Match SMS Scramble
**Route**: `/contractor/match` (`app/contractor/match/page.tsx`)  
**Pillar**: 🟢 Fence It (Forest Green `#4ADE80`) | **Priority**: `[LVL 1]`

```text
You are an expert Next.js and Tailwind CSS engineer building the Targeted Match SMS Scramble Landing Screen for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Rowdies Bold (700) for timer readouts and seat counters. Rowdies Regular (400) for claim buttons.
- COLOR PALETTE: Bright Green (#4ADE80) and Ember Orange (#F27A22) with dark security plates.

### PAGE LAYOUT:
1. URGENCY & CLAIM BANNER:
   - "⚡ New Scramble Lead: 140 LF Clear Cedar Privacy in Si View (North Bend)"
   - Live Countdown Timer: [ 23m 42s remaining to claim ].
2. 3-SEAT CAPPED ALLOCATION WIDGET:
   - Seat 1: 🟢 Claimed by Cascade Fence Co.
   - Seat 2: 🟢 Claimed by Cedar Craft WA
   - Seat 3: 🟡 OPEN (1 Seat Left!)
3. CLAIM ACTION:
   - CTA Button: "Claim Final Seat for $39 & Receive Homeowner Contact" (Stripe 1-click checkout).
   - Guaranteed scope: Verified ARC Blueprint + itemized BOM included.

Output full, modern, production-ready React / Tailwind JSX code with live countdown timer and seat claim state.
```
