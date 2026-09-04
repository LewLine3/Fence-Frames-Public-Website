# FENCE FRAMES — AGENT CONSTITUTION & CANON DIRECTIVES

> **MANDATORY SYSTEM DIRECTIVE FOR ALL FENCE FRAMES TASKS:**  
> This file defines the immutable governance, strategy, pricing math, and architectural laws of the **Fence Frames** project. All agents MUST read and follow these directives without deviation.

---

## 1. Governance & Source of Truth (`GOVERNANCE.md`)

- **Supreme Canon Baseline:** `public/configure/heritage-v1/` and `assets/fence-svg/pilot-fences/vpf/heritage/preview/` in the `FenceBook` repository constitute the authoritative, primary visual rendering, layout, and component law.
- **Sand Frames Quarantined & Erased:** `heritage-v2-sandbox` is 100% quarantined under `public/configure/_quarantine/sand-frames-v2-sandbox/`. **NEVER** use Sand Frames scratch math, arbitrary multipliers (`1.06`, `2.10`, `0.05`), or temporary UI layouts. Do NOT touch or alter original Fence Frames math without explicit owner instruction.
- **Order of Precedence on Conflict:**
  1. **Graduated Company Law:** `Fence Frames/` repo (`CANON-INDEX.md`)
  2. **Binding Strategy References:** `BINDING-001` (`Obsidian/Fence Frames/FF Plan Friends and Family Edition 7-02.md`)
  3. **Working Handbook:** `FenceBook/docs/handbook/` (specifically LOCKED sections like `monetization_rules.md` and `06-lead-pricing-and-quote-math.md`)
  4. **Owner Directives:** Owner retains final approval and decision authority over all merges and code changes.

---

## 2. Business Model & Strategy (`BINDING-001`)

- **Core Mission:** Bring transparency to the fence market. Homeowners design their exact fence (style, height, materials) with real-time vector elevation (front & back), receiving an **honest price range (±15%)** before contacting contractors.
- **The Visual Blueprint:** The homeowner's finished design generates a **visual blueprint** with an itemized material takeoff. Contractors purchase pre-qualified leads knowing the exact visual blueprint and quote range.
- **Homeowner / Contractor Value Prop:**
  - Homeowners use the tool **for free**.
  - Contractors pay per lead (seat purchases: max 3 shared or 1 exclusive).
  - Contractors get **free zero-fee browsing** of the lead board (no subscription, no credit card required to view).
  - **72-hour refund rule:** Contractors have 72 hours to claim a refund on invalid leads.
- **The HOA Strategy (Game-Changer):** Provide HOAs free, high-quality approved fence design packets and guardrail configurators in exchange for an official website backlink, establishing local SEO dominance and guaranteed compliance.

---

## 3. Canonical Quote Math Engine & Dual-Calculation Directive

- **Supreme Canon Baseline:** **Dynamic Labor Math (V2.0)** is the **New Official Canon** for all quote and labor calculations.
- **Dual-Calculation Mandate (Until Further Notice):** Every pricing run MUST execute **both** calculation engines in parallel:
  1. **Dynamic Labor Math (Client-Facing / Official Canon):**
     - Raw Material Cost ($MC$) from catalog BOM quantities.
     - Burdened Material Cost ($M = MC \times 1.25$, tax, procurement, job-site delivery).
     - Discrete Component Labor ($L$) calculated from itemized trade rates ($75.00/hr loaded shop rate, $30.00/hr direct installer wage):
       - Post Hole & Concrete: $0.50$ hr / post ($38.00 / hole)
       - 2x4 Rail Framing: $0.10$ hr / LF ($7.50 / LF)
       - Vertical Infill Pickets: $0.083$ hr / LF ($6.25 / LF)
       - Horizontal Infill Boards: $0.113$ hr / LF ($8.50 / LF)
       - Welded Wire Fabric: $0.067$ hr / LF ($5.00 / LF)
       - 2x4 Top Cap (Amortized): $0.073$ hr / board ($5.50 / 8' board = $0.69 / LF)
       - Picture-Frame Trim: $0.027$ hr / LF ($2.00 / LF)
       - Stain Application: $0.043$ hr / LF ($3.25 / LF)
       - Walk Gate: 1.60 hrs ($120.00 / gate); Double Drive Gate: 3.20 hrs ($240.00 / gate)
     - **Terrain Dynamic Span Reduction** ($8.0'$ level, $7.5'$ moderate slope [+7% posts], $7.0'$ steep incline [+14% posts]) and **+1 Boundary Post Law** ($Q_{\text{post}} = \lceil L / P_{\text{effective}} \rceil + 1$).
     - Total Direct Labor $L = \sum(\text{Task Hours} \times \text{Rate})$. Admin overhead $A = (M + L) \times 0.15$.
     - $\text{Quoted Mid} = M + L + A$. Homeowner display range $= \text{Quoted Mid} \pm 15\%$.
  2. **Legacy Material-Focused Math (Admin Sanity Check Benchmark):**
     - $M = MC \times 1.25$
     - $L_{\text{legacy}} = M \times 2.0$ (or $2.06$)
     - $A_{\text{legacy}} = (M + L_{\text{legacy}}) \times 0.15$
     - $\text{Quoted Mid}_{\text{legacy}} = M + L_{\text{legacy}} + A_{\text{legacy}}$
- **Visibility Enforcement Law:**
  - **Client / Homeowner UI:** Displays **ONLY Dynamic Labor Math** ($\pm 15\%$ range). Never expose Legacy Math or raw macro multipliers to clients.
  - **Admin & Estimator Dashboards:** Display **BOTH calculations side-by-side**, presenting Dynamic Labor vs. Legacy Material Benchmark for variance tracking and margin sanity checks.

---

## 4. Visual UI & Code Preservation Policy

- **Design Lock:** The visual UI, CSS theme tokens, typography, panel layout, SVG elevation engine, and stack composer of original Canon `heritage-v1` must remain **completely untouched**.
- **Owner Sign-off:** No backend or math refactoring may be merged into Canon without line-by-line itemized owner review and approval.

---

## 5. Universal Vector Component & Elevation Standard (`104 × 78` & Shell Law)

- **Master Artboard Dimensions**: All fence elevation components must be authored on an exact **`104 × 78 inch`** canvas (`viewBox="0 0 104 78"`), with a **100% transparent background** (never bake sky or dark backdrops into component SVGs).
- **Aspect Ratio Preservation**: Preserves the exact **$4 : 3$ multiplier** of the standard $8\text{ ft} \times 6\text{ ft}$ ($96″ \times 72″$) fence panel ($104 / 78 = 4/3$).
- **Horizontal Coordinates (X-Axis: 0 → 104″)**:
  - `0.00″ → 4.00″`: Left breathing room margin ($4.00″$).
  - `4.00″ → 100.00″`: **$96.00″$ Fence Core**. Left edge of left post shell is at $X = 4.00″$; right edge of right post shell is at $X = 100.00″$.
  - `100.00″ → 104.00″`: Right breathing room margin ($4.00″$).
- **Vertical Coordinates (Y-Axis: 0 → 78″)**:
  - `0.00″ → 6.00″`: **Cap Headroom**. $6.00″$ maximum vertical clearance dedicated to post caps (pyramids, solar LEDs, finials). $Y = 0.00″$ is absolute cap apex ceiling.
  - `6.00″ → 78.00″`: **$72.00″$ Fence Height** ($6\text{ ft}$ panel). Post tops and rail cap sit at $Y = 6.00″$; bottom of posts, trim, and pickets reach ground baseline at $Y = 78.00″$.
  - `Y = 78.00″`: **Ground Baseline**. Absolute bottom of canvas; **zero added height below**.
- **The Immutable Shell Law**:
  - All dimensional coordinates measure to the **outer edge of the component black shell** (`fill="#000000"` or `#120908`).
  - The shell is the true architectural object; inner wood fills (`fill="#c88254"`, inset by $0.1875″$) and wood grain patterns are cosmetic detailing layers.
  - **Never use SVG strokes** for timber bounding boxes; SVG centered strokes distort real-world physical dimensions.
  - Pickets in privacy mode render over a single continuous black backing bay shell to avoid double-shell collision.

---

## 6. Procedural Grain Engine & Art Style Law (`CANON-SVG-ART-STYLE-GUIDE.md`)

- **Master Specification**: All artwork MUST follow [`docs/CANON-SVG-ART-STYLE-GUIDE.md`](file:///d:/Lew-Line-Workspaces/Fence-Frames-Public-Website/docs/CANON-SVG-ART-STYLE-GUIDE.md).
- **Procedural Grain Engine**: All timber grain must be generated by `flow-grain.js` (`flowGrainPatternPaths`, `flowGrainPostPatternPaths`, `flowGrainCapPatternPaths`).
- **No Synthetic Wallpaper or Béziers**: NEVER hand-code arbitrary 3-point quadratic Béziers (`Q 6 1.1 12 0.7`) or raster PNG patterns.
- **Knot Physics & Deflection**: Knots must feature 4 concentric degradation rings (`#4a3018` to `#785030`); harmonic streamlines must deflect around knots using Gaussian falloff and smoothstep blending (`bumpScale: 1.35`).
- **Color Tokens**:
  - Western Red Cedar: `STAIN_CEDAR_PICKET = '#c88254'` with `cedar-rail-shine` (`#dca070` $\to$ `#c88254` $\to$ `#b06e42`).
  - Pressure-Treated: `STAIN_PT = '#6c4834'` / `STAIN_PT_TRIM = '#755038'` with `pt-board-shine`. **Never use olive-green `#7a855c`**.
- **Top Specular Sheen**: All horizontal rails and boards must include the top sunlit specular sheen band (`<rect width="..." height="0.1875" fill="#f0c090" opacity="0.07"/>`).
- **Dual-Scope ViewBox Scopes**:
  - Assemblies: `viewBox="0 0 104 78"` artboard with black structural shell fusion and toggleable `<g id="fasteners" class="structural-hardware">`.
  - Modular Sym-Atoms: Local bounding boxes (Posts: `0 0 5.5 72`, Boards: `0 0 85.375 5.5`, 4×6 Caps: `0 0 6.25 3.5`, Fasteners: `0 0 1 1`).

---

## 7. Board Fence Window Geometry & 4ft Default Standard

- **4ft Default Mandatory**: All board fences (Horizontal Split Board: Rancher `HSB-RNCH`, Homesteader `HSB-HMST`) MUST default to **4 ft (48")** in all elevations, initial state configurators, and catalogs. 5ft and 6ft exist as non-recommended options and must never be the default display.
- **Triple Rail (3-Rail) Standard**: One board flush with post tops ($Y = 78 - H$), next two boards split interior space between ground baseline ($Y=78.00″$) and bottom of top board into **3 equal-sized windows** ($W_3 = (H - 16.50″) / 3$). At 4ft, $W_3 = 10.50″$.
- **Two Rail (2-Rail)**: Rails sit centered exactly at the midpoints of the windows created by triple rail ($M_1 = 40.75″$, $M_2 = 56.75″$ at 4ft).
- **Quad Rail (4-Rail)**: One board flush with post tops, remaining 3 rails split space into **4 equal quadrants** ($W_4 = (H - 22.00″) / 4$). At 4ft, $W_4 = 6.50″$.



