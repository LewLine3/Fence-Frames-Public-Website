# `GEO-COM-01`: 🏡 Si View Flagship HOA Community Specification

> **Page ID**: `GEO-COM-01`  
> **Route**: `/wa/king/north-bend/si-view` (`app/[state]/[county]/[city]/[community]/page.tsx`)  
> **Priority Level**: **`[LVL 1]`** (MVP Phase 1 Launch Blocker)  
> **Pillar**: 🟡 Find It (Sun Gold `#E5B842`)  
> **Status**: 🔵 **Working / Needs Tweaks**

---

## 1. Purpose & Business Engine
- **Primary Goal**: The flagship HOA community landing page showcasing pre-approved styles (Designs 01–04) for Si View in North Bend, Washington.
- **Conversion Flywheel**: Homeowners in Si View see their exact neighborhood guidelines, review ARC-approved designs, and launch directly into **The Designer** pre-seeded with that exact specification.
- **HOA Chapter Integration**: Directly bound to the **Si View HOA Admin Portal (`HOA-01`)** for 1-click submittal stamping and zero-guesswork compliance.

---

## 2. Visual Interface & Si View Community Standards

```ui-sketch
viewport: desktop
screen:
  - breadcrumb: { items: ["Washington", "King County", "North Bend", "Si View HOA"] }
  - heading: { text: "SI VIEW HOA PRE-APPROVED FENCE STANDARDS", level: 1 }
  - badge: { label: "🟢 Certified ARC Standard • Zero-Rejection Guarantee", color: "green" }
  - spacer: { size: "medium" }
  - row:
      - card:
          title: "DESIGN 01: SOLID PRIVACY"
          body: "6ft Solid Vertical Cedar • Est. $44.00 / LF"
          button: { label: "Configure Design 01 →", variant: "primary" }
      - card:
          title: "DESIGN 02: PICTURE FRAME"
          body: "6ft Picture Frame w/ Top Cap • Est. $52.00 / LF"
          button: { label: "Configure Design 02 →", variant: "primary" }
  - spacer: { size: "small" }
  - row:
      - card:
          title: "DESIGN 03: MODERN HORIZONTAL"
          body: "6ft Horizontal Shiplap • Est. $56.00 / LF"
          button: { label: "Configure Design 03 →", variant: "primary" }
      - card:
          title: "DESIGN 04: GOOD NEIGHBOR"
          body: "6ft Alternating Pickets • Est. $48.00 / LF"
          button: { label: "Configure Design 04 →", variant: "primary" }
```

## 6. Comprehensive Linking & Routing Matrix

### Inbound Links (Sources):
| Source Page | Page ID | Route / Trigger | Passed Payload |
| :--- | :--- | :--- | :--- |
| **North Bend City Hub** | `GEO-CIT-01` | Clicking *"Si View Standards"* | Loads Si View catalog |
| **Master Homepage** | `CORE-01` | ZIP Search `98045` $\rightarrow$ *"Si View"* | Pre-selects Si View |
| **Design Suite Hub** | `DSGN-01` | *"Search HOA Community"* link | None |

### Outbound Links (Destinations):
| Trigger Element | Destination Page | Page ID | Passed State / Action |
| :--- | :--- | :--- | :--- |
| `CONFIGURE DESIGN 01 →` | `/designer/si-view-design-01` | `DSGN-03` | Pre-seeds Designer with Design 01 specs |
| `CONFIGURE DESIGN 02 →` | `/designer/si-view-design-02` | `DSGN-03` | Pre-seeds Designer with Design 02 specs |
| `CONFIGURE DESIGN 03 →` | `/designer/si-view-design-03` | `DSGN-03` | Pre-seeds Designer with Design 03 specs |
| `CONFIGURE DESIGN 04 →` | `/designer/si-view-design-04` | `DSGN-03` | Pre-seeds Designer with Design 04 specs |
| `HOA ARC Portal Link` | `/partner/hoa` | `HOA-01` | Routes to Si View HOA board management |

---

## 7. Google Stitch Copy-Paste Prompt Packet

```text
You are an expert Next.js and Tailwind CSS engineer designing the Si View Flagship HOA Community Page (GEO-COM-01) for Fence Frames.

### DESIGN SYSTEM LAW:
- TYPOGRAPHY: Pure Rowdies font family ('Rowdies', sans-serif). Rowdies Bold (700) for headline, design titles (Designs 01–04), and CTA buttons. Rowdies Regular (400) for breadcrumbs, specs, and stain chips. Rowdies Light (300) for bylaws text.
- COLOR PALETTE (Find It):
  - Primary Accent: Sun Gold (#E5B842)
  - Approval Badge: Bright Forest Green (#4ADE80)
  - Background Ground: Dark Ink (#141B16) with drafting grid pattern
  - Card Backdrops: High-res Cedar Wood Grain cards with 50% perimeter outside corner markers (.has-outside-corners)

### PAGE LAYOUT:
1. HEADER: Breadcrumb (WA > King > North Bend > Si View), <h1>SI VIEW HOA PRE-APPROVED FENCE STANDARDS</h1>, and "🟢 Certified ARC Standard" badge.
2. 4-CARD PRE-APPROVED DESIGNS GRID (2x2):
   - Card 1: Si View Design 01 (Solid Privacy) + "$44/LF" + Ember Orange "CONFIGURE DESIGN 01 →" button.
   - Card 2: Si View Design 02 (Picture Frame) + "$52/LF" + "CONFIGURE DESIGN 02 →" button.
   - Card 3: Si View Design 03 (Modern Horizontal) + "$56/LF" + "CONFIGURE DESIGN 03 →" button.
   - Card 4: Si View Design 04 (Good Neighbor) + "$48/LF" + "CONFIGURE DESIGN 04 →" button.
3. DOCKED PLATES: Every design card features a black docked explainer plate with 1.5px green border.
4. GUIDELINES SIDEBAR: Approved stain chips (SW-3558 Asteroid, Natural Cedar), height rules, and setbacks.

Output full, modern, production-ready React / Tailwind JSX code with responsive breakpoints.
```
