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

## 3. Canonical Quote Math Engine (`monetization_rules.md` § Quote math engine)

All pricing calculations in Fence Frames MUST adhere strictly to the canonical formula:

```
MC = Raw Material Cost from BOM (catalog × quantities)

M  = MC × 1.25          # Tax, procurement, and job-site delivery margin
L  = M × 2              # Labor = 2× burdened material cost
A  = (M + L) × 0.10     # 10% Administrative & overhead cost

quoted_mid   = M + L + A
display_low  = quoted_mid × 0.85   # (-15%)
display_high = quoted_mid × 1.15   # (+15%)
```

- **UI Display:** Show **range only (±15%)** to homeowners, with standard estimate disclaimers.

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

