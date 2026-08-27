# Fence Frames — UI & Design System Rules (Canonical Agent Law)

> **MANDATORY FOR ALL AGENTS**: Every agent working on UI, layouts, styles, or copy for Fence Frames MUST read, follow, and strictly adhere to the rules in this document. Do not invent custom fonts, unapproved color schemes, or deviate from the graduated card standards without explicit owner instruction.

> **Green Print React/HTML library:** `FenceBook/docs/gemini-memory-pack/hub-and-spoke/SPOKE-DESIGN-SYSTEM.md`  
> Prefer Green Print crop-marks (35% / wood→green TR+BL · green plate→orange TL+BR) for new React/demo work. Legacy 50% `.corner-mark-out` below until unified via HRQ.

---

## 1. Core Brand & Phase Color Rules

| Phase / Pillar | Role / Step | Color Name | Hex Code | CSS Variable | Text Styling Rule |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Find It** | Step 1: HOA & Code Verification | **Sun Gold** | `#E5B842` | `var(--gold-sun)` | Gold text, `font-weight: 400`, slightly larger (`1.15rem`) in body |
| **Frame It** | Step 2: Catalog / Wizard / Designer | **Ember Orange** | `#F27A22` | `var(--ember)` / `#F27A22` | Orange text, `font-weight: 400`, slightly larger (`1.15rem`) in body |
| **Fence It** | Step 3: Fence-Folio / Blueprint / Ledger | **Bright Green** | `#4ADE80` | `var(--forest-bright)` / `#4ADE80` | Green text, `font-weight: 400`, slightly larger (`1.15rem`) in body |

### Supporting Palette:
- **Canvas Dark Forest**: `#16432D` (`var(--forest-deep)`), `#141B16` (`var(--ink-forest)`)
- **Parchment Base**: `#F4ECDC` (`var(--bg)`), Soft Ivory `#FAF6EE` (`var(--bg-soft)`)
- **Ink / Black**: `#1A1A1A` (`var(--ink)`)
- **Faint Drafting Grid**: `rgba(255, 255, 255, 0.08)` (20px snap grid on dark textures) or `rgba(22, 67, 45, 0.70)` on parchment.

---

## 2. Global Typography Law (Pure Rowdies Standard)

The entire design system strictly utilizes the **Rowdies** typeface across all UI layers. **Montegrin (Montagu Slab) and Black Ops One are permanently dead.** No random Inter, Roboto, or Fira Code unless explicitly requested for raw monospace code readouts.

| Font Weight | Numeric | Permitted Elements & Usage |
| :--- | :--- | :--- |
| **Rowdies Bold** | `700` | **Main Branding & Hero Headlines**: Page hero headlines (`h1`), top card title bars, main brand wordmarks (`FENCE FRAMES`). |
| **Rowdies Regular** | `400` | **Sub-Branding, Buttons, Sub-Headers & Keywords**: All action button labels (*Find It*, *Frame It*, *Fence It*), sub-headers (`h2`, `h3`, `h4`), field labels (*Washington ZIP*, *Community / HOA*), dropdown selects, step badges (`[Step 1 / 3]`), and highlighted keywords. |
| **Rowdies Light** | `300` | **Body Text & Explanatory Paragraphs**: All descriptive body paragraphs, hero narrative explanations, live validation feedback readouts. |

---

## 3. Graduated Card & Container Architecture

Agents must use the established graduated box patterns:

### A. Wood Grain Card Standard (Right Hero Column)
- **Background**: High-res cedar/wood grain texture (`images/card-trials/pexels-sergeispas-1151756-34615194.jpg` or cedar asset).
- **Perimeter**: Solid ink border (`2.5px solid var(--ink)`), corner radius (`var(--radius)`).
- **Title Bar**: Solid Black background (`var(--ink)`), Gold font (`var(--gold-sun)`), `font-weight: 700`, with step badge (`[Step 1 / 3]`).
- **Corner Accents**: Outside corner chamfer marks (`.corner-mark-out`) in gold (`c-gold`) and green (`c-forest`).

### B. Docked Media & Explainer Plate
- **Image Viewport**: Shrunk viewport (`180px` height) with dark forest background and graphic overlay. Top corners rounded, bottom corners square (`0`). Thin green border (`1.5px solid var(--forest-bright)`).
- **Docked Explainer Box**: Positioned immediately flush to the bottom of the image (no margin). Top corners square (`0`), bottom corners rounded. Solid black background (`var(--ink)`), white Rowdies Light text (`#FFFFFF`, `300`), thin green perimeter border (`1.5px solid var(--forest-bright)`). **No thick vertical left line.**

### C. Search & Control Box (Translucent Dark Plate)
- **Background**: Solid black (`var(--ink)`) or frosted dark plate with `backdrop-filter: blur(5px)`.
- **Border**: `2px solid var(--gold-sun)` perimeter.
- **Labels / Headers**: Gold (`var(--gold-sun)`), `font-family: 'Rowdies'`, `font-weight: 400`, uppercase.
- **Input Fields**: Crisp ivory/parchment background (`#FAF6EE`), black ink border, Rowdies text.

### D. Action Buttons
- **Borders**: Every button must have a crisp, solid black border (`2px solid var(--ink)`).
- **Typography**: Rowdies Regular (`400`), uppercase, centered.
- **Color Coding**:
  - *Find It*: Gold button (`btn-gold`).
  - *Frame It*: Orange / Ember button (`btn-ember`).
  - *Fence It*: Green / Forest button (`btn-forest`).
- **Button Ticket Cuts**: Perimeter stroke following the 45-degree chamfers cleanly (`.btn-cut-outlined`).

---

## 5. Outside Corner Marker Law (50% Span & Docked Taper)

Outside corner markers (`.corner-mark-out`) must adhere to strict geometric constraints:

1. **Outside Docking**: Markers dock directly to the exterior perimeter of cards/containers using parent `.has-outside-corners`.
2. **50% Wall Span (Independent Legs)**:
   - Each corner element spans **exactly 50% width and 50% height** (`width: 50%; height: 50%;`) of the attached container.
   - Legs measure this 50% mark independently, scaling naturally to wide or tall rectangles.
3. **Docked Taper Termination**:
   - At the 50% termination mark, each run finishes with a sharp angled taper.
   - **The longer side of the taper must ALWAYS be on the docked (card) side**, so the flush inner edge runs the full 50% distance and the sharp point terminates touching the container wall.
   - The taper cut / dead space is on the exterior side, keeping the card boundary completely clean.

### Canonical Corner Mark CSS:
```css
.has-outside-corners { position: relative; }
.corner-mark-out {
  position: absolute;
  width: 50%;
  height: 50%;
  pointer-events: none;
  z-index: 15;
  --mark-th: 5.5px;
  --mark-tip: 24px;
  --mark-c: var(--gold-sun);
}
.corner-mark-out::before, .corner-mark-out::after {
  content: "";
  position: absolute;
  background: var(--mark-c);
}

/* Top-Left (.tl) */
.corner-mark-out.tl { top: calc(-1 * var(--mark-th)); left: calc(-1 * var(--mark-th)); }
.corner-mark-out.tl::before { top: 0; left: 0; width: 100%; height: var(--mark-th); clip-path: polygon(0 0, calc(100% - var(--mark-tip)) 0, 100% 100%, 0 100%); }
.corner-mark-out.tl::after { top: 0; left: 0; width: var(--mark-th); height: 100%; clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - var(--mark-tip))); }

/* Top-Right (.tr) */
.corner-mark-out.tr { top: calc(-1 * var(--mark-th)); right: calc(-1 * var(--mark-th)); }
.corner-mark-out.tr::before { top: 0; right: 0; width: 100%; height: var(--mark-th); clip-path: polygon(var(--mark-tip) 0, 100% 0, 100% 100%, 0 100%); }
.corner-mark-out.tr::after { top: 0; right: 0; width: var(--mark-th); height: 100%; clip-path: polygon(0 0, 100% 0, 0 100%, 0 calc(100% - var(--mark-tip))); }

/* Bottom-Left (.bl) */
.corner-mark-out.bl { bottom: calc(-1 * var(--mark-th)); left: calc(-1 * var(--mark-th)); }
.corner-mark-out.bl::before { bottom: 0; left: 0; width: 100%; height: var(--mark-th); clip-path: polygon(0 0, 100% 0, calc(100% - var(--mark-tip)) 100%, 0 100%); }
.corner-mark-out.bl::after { bottom: 0; left: 0; width: var(--mark-th); height: 100%; clip-path: polygon(0 var(--mark-tip), 100% 0, 100% 100%, 0 100%); }

/* Bottom-Right (.br) */
.corner-mark-out.br { bottom: calc(-1 * var(--mark-th)); right: calc(-1 * var(--mark-th)); }
.corner-mark-out.br::before { bottom: 0; right: 0; width: 100%; height: var(--mark-th); clip-path: polygon(0 0, 100% 0, 100% 100%, var(--mark-tip) 100%); }
.corner-mark-out.br::after { bottom: 0; right: 0; width: var(--mark-th); height: 100%; clip-path: polygon(0 0, 100% var(--mark-tip), 100% 100%, 0 100%); }
```

---

## 6. Visual Reference Guide

For live interactive viewing of all approved cards, color swatches, buttons, and typography:
👉 Open **`Fence-Frames-Public-Website/design-system-guide.html`** or view via local server at `http://localhost:8080/design-system-guide.html`.

---

## 7. Artifacts Maintenance & Mandatory Chat Dashboard Law

- **Startup Trigger**: In **every new chat session**, after the initial 1–2 user prompts (once the task and focus area are understood), the agent MUST proactively create and pin a custom, task-tailored **`workspace_dashboard.md`** in the chat's Artifacts display panel.
- **Core Pinned Artifacts**:
  1. `workspace_dashboard.md` (Active links, endpoints, file shortcuts)
  2. `design_system_and_graduated_cards.md` (Design rules & typography matrix)
  3. `component_cheat_sheet.md` (Copy-paste ready HTML/CSS snippets)
  4. `asset_and_image_registry.md` (Approved textures & icons catalog)
  5. `walkthrough.md` (Real-time changelog and session summary)


