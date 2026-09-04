# FENCE FRAMES — CANONICAL SVG ART STYLE & VECTOR PIPELINE GUIDE

> **MANDATORY SYSTEM DIRECTIVE FOR ALL VECTOR ARTWORK & COMPONENT AUTHORING**  
> **Status:** IMMUTABLE CANON LAW  
> **Engine Source of Truth:** `scripts/lib/flow-grain.js`, `scripts/lib/cedar-stains.js`, `scripts/lib/cedar-shine.js`  
> **Canonical Baseline:** `public/configure/heritage-v1/` and `assets/fence-svg/pilot-fences/vpf/heritage/preview/`

---

## 1. Architectural Philosophy: Wood-First Millwork vs. Synthetic Ribbons

All vector components in the Fence Frames platform represent real, physical outdoor timber structures.
Past AI failures occurred when agents generated flat vector cartons, arbitrary 3-point quadratic Béziers (`Q 6 1.1 12 0.7`), or olive-green synthetic fills. These looked like synthetic 1970s ribbon wallpaper rather than exterior architectural wood.

### Core Tenets:
1. **100% Procedural Vector Grain**: No raster PNG/JPG image patterns (`<image href="...">`). No hand-drawn arbitrary Béziers. All grain paths must be calculated by the procedural harmonic wave engine (`flow-grain.js`).
2. **Deflecting Streamline Physics**: Wood grain lines flow smoothly along the board length and **deflect organically around knot blemishes**.
3. **Multi-Harmonic Density**: Grain paths are sampled at $1/32″$ precision grid intervals with micro-jitter harmonics ($n=1, 2, 3$).
4. **Specular Edge Chamfers**: Sunlight catches top edges. Every horizontal board incorporates a subtle specular sheen band (`#f0c090` at 7% opacity).
5. **Authentic Color Chemistry**: Color tokens are calibrated directly against physical Pacific Northwest Western Red Cedar and incised ground-contact Hem-Fir Pressure-Treated lumber.

---

## 2. Procedural Grain Mathematics (`flow-grain.js`)

All components MUST utilize the procedural grain algorithms exported from [`scripts/lib/flow-grain.js`](file:///d:/Lew-Line-Workspaces/FenceBook/scripts/lib/flow-grain.js).

### A. Harmonic Wave Formula
Streamlines are calculated by summing harmonic sine waves across the member axis:
$$y(x) = y_{\text{base}} + \sum_{i} A_i \sin\left(\frac{2\pi n_i x}{W_{\text{period}}} + \phi_i\right) + \Delta_{\text{knot}}(x)$$

### B. Knot Physics & Organic Deflection
Knots are physical impediments in the timber. Streamlines do not pass through knots; they divert around them using Gaussian falloff and smoothstep blending:

```javascript
function knotBumpOffset(x, baseY, knot, patternTileW) {
  const edgeFade = Math.sin((Math.PI * x) / patternTileW);
  if (edgeFade < 0.001) return 0;

  const nx = (x - knot.cx) / (knot.rx * knot.hSpread);
  const lateral = Math.exp(-0.38 * nx * nx);
  if (lateral < 0.008) return 0;

  const blend = smoothstep(Math.min(1, lateral * 0.95)) * edgeFade;
  const bump = knot.ry * knot.clearance * knot.bumpScale * lateral * blend;
  const sign = baseY <= knot.cy ? -1 : 1;
  return sign * bump;
}
```

### C. 4-Ring Concentric Knot Anatomy
Never draw knots as solid black dots. Real timber knots have four concentric degradation rings:

| Ring Scale | Western Red Cedar Fill | Opacity | Pressure-Treated Fill | Opacity |
| :--- | :--- | :--- | :--- | :--- |
| **0.48×** (Core) | `#4a3018` | 98% | `#382010` | 100% |
| **0.66×** (Heartwood) | `#553820` | 88% | `#422818` | 90% |
| **0.82×** (Transition) | `#664028` | 62% | `#503020` | 65% |
| **1.00×** (Halo) | `#785030` | 38% | `#5e3828` | 40% |

### D. Tile Dimensions & Knot Phasing
- **Horizontal Members (Rails, Boards, Pickets)**:
  - Standard repeat width: **`24.00″`** (`FLOW_TILE_W = 24`).
  - Divided into two $12.00″$ half-panels:
    - Left half ($0″ \to 12″$): Contains **Primary Knot** (`cx = 8.00″, cy = 1.05″, rx = 0.78″, ry = 0.27″`). Full wave amplitude ($1.0\times$).
    - Right half ($12″ \to 24″$): Contains **Secondary Knot** (`cx = 14.55″, cy = 2.38″, rx = 0.34″, ry = 0.16″`). Straighter grain amplitude ($0.28\times$).
  - Top specular sheen band: `<rect x="0" y="0" width="24" height="0.1875" fill="#f0c090" opacity="0.07"/>`.
- **Vertical Posts & Center Trim**:
  - Repeat height: **`24.00″`** (`POST_TILE_H = 24`).
  - 4×6 post face width: $5.125″$ fill.
  - Primary knot at top half ($Y = 7.85″$), secondary knot at bottom half ($Y = 14.72″$).

---

## 3. Color Chemistry & Stain Palette Law (`cedar-stains.js`)

Never guess hex colors or use generic CSS colors (`#8B4513`, `#A0522D`). All components must strictly reference canonical tokens:

### A. Western Red Cedar (Si View Street Reference)
- **Base Wood Fill**: `STAIN_CEDAR_PICKET = '#c88254'` (canonical terracotta midtone).
- **Linear Gradient Shine (`cedar-rail-shine`)**:
  ```xml
  <linearGradient id="cedar-rail-shine" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
    <stop offset="0%" stop-color="#dca070" stop-opacity="1"/>
    <stop offset="55%" stop-color="#c88254" stop-opacity="1"/>
    <stop offset="100%" stop-color="#b06e42" stop-opacity="1"/>
  </linearGradient>
  ```
- **Rail & Post Cap Wood Skirt**: `STAIN_CEDAR_CAP = '#be784c'` (hair darker at structural junctions).
- **Cedar Grain Palette (`PALETTE_CEDAR_RAIL`)**:
  - Shadow streamlines: `#120908` (85% opacity)
  - Dark tan streamlines: `#6b4f3a` (75% opacity)
  - Mid tan streamlines: `#8a6548` (70% opacity)
  - Sunlight highlights: `#d4b078` (62% opacity)
  - Top edge sheen: `#f0c090` (7% opacity)

### B. Pressure-Treated (Ground-Contact Hem-Fir)
- **Ground-Contact Framing & Posts**: `STAIN_PT = '#6c4834'` (warm chocolate/sienna).
- **Appearance Trim & Fascia**: `STAIN_PT_TRIM = '#755038'` (rich lifted brown).
- **PT Board Shine (`pt-board-shine`)**:
  ```xml
  <linearGradient id="pt-board-shine" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#78533c"/>
    <stop offset="55%" stop-color="#6c4834"/>
    <stop offset="100%" stop-color="#543725"/>
  </linearGradient>
  ```
- **PT Grain Palette (`PALETTE_PT_APPEARANCE`)**:
  - Shadow lines: `#000000`
  - Dark tan lines: `#2a1810`
  - Mid tan lines: `#3d2418`
  - Highlight lines: `#5a3828`
- **FORBIDDEN**: **Never use olive-green `#7a855c`**. Modern PT lumber in the Pacific Northwest is treated with warm copper preservative formulations that weather to rich chocolate brown.

### C. Post Cap Specialty Materials
- **Copper Pyramid**:
  - Body Gradient: `#e8b87a` (0%) $\to$ `#c97840` (28%) $\to$ `#b87333` (58%) $\to$ `#8b5a2b` (100%).
  - Facet Highlight: `#f0d4a8` (70% opacity at top) $\to$ `#b87333` (0% opacity at base).
- **Black Galvanized Steel / Metal Pyramid**:
  - Body Gradient: `#5c6370` (0%) $\to$ `#374151` (35%) $\to$ `#1f2937` (72%) $\to$ `#111827` (100%).
  - Highlight Edge: `#6b7280` (55% opacity) $\to$ `#111827` (0% opacity).
- **Solar LED Pyramid**:
  - Housing: `#3d4450` $\to$ `#252a33` $\to$ `#15181e`.
  - Amber Lens: `#fff4d6` $\to$ `#f5c842` $\to$ `#d4921a` (95% opacity).
  - Photovoltaic Cell: `#1e3a5f` $\to$ `#0f172a` $\to$ `#334155`.

---

## 4. Dimensional Standards: Shell Law & Dual ViewBox Scopes

Components must be authored cleanly across two distinct scopes: **Canvas Assemblies** and **Modular Symbol Atoms**.

### Scope A: Canvas Assemblies (`104 × 78` Artboard)
Used for full elevation previews, designer canvases, and export blueprints.
- **`viewBox="0 0 104 78"`**: 100% transparent background.
- **Breathing Room**: $4.00″$ left margin ($X = 0 \to 4$), $4.00″$ right margin ($X = 100 \to 104$).
- **$96.00″$ Fence Core**: Left post outer edge sits at $X = 4.00″$; right post outer edge sits at $X = 100.00″$.
- **$6.00″$ Cap Headroom**: Apex of post caps clearance zone ($Y = 0.00 \to 6.00″$). Post tops sit at $Y = 6.00″$.
- **$72.00″$ Fence Height**: Bottom of posts and pickets reach ground baseline at $Y = 78.00″$.

### Scope B: Modular Symbol Atoms (Tight Local Bounding Boxes)
Used for modular composition, catalog inspection, and dynamic CAD placement.
Atoms MUST NOT be trapped inside empty $104 \times 78$ canvas padding. They must use their exact physical bounding boxes:

| Component Type | Nominal Timber | Actual Dimensions (W × H) | Canonical ViewBox |
| :--- | :--- | :--- | :--- |
| **4×6 Post** | 4×6 Timber | $5.50″ \times 72.00″$ | `viewBox="0 0 5.5 72"` |
| **4×4 Post** | 4×4 Timber | $3.50″ \times 72.00″$ | `viewBox="0 0 3.5 72"` |
| **2×6 Horizontal Board** | 2×6 S4S Lumber | $85.375″ \times 5.50″$ (with overlap) | `viewBox="0 0 85.375 5.5"` |
| **2×4 Horizontal Board** | 2×4 S4S Lumber | $85.375″ \times 3.50″$ (with overlap) | `viewBox="0 0 85.375 3.5"` |
| **1×6 Horizontal Picket** | 1×6 Cedar Picket | $85.375″ \times 5.50″$ (with overlap) | `viewBox="0 0 85.375 5.5"` |
| **1×6 Vertical Picket** | 1×6 Cedar Picket | $5.50″ \times 72.00″$ | `viewBox="0 0 5.5 72"` |
| **2×4 Center Trim** | 2×4 S4S Lumber | $3.50″ \times 72.00″$ | `viewBox="0 0 3.5 72"` |
| **4×6 Wood/Copper Cap** | Cap for 4×6 | $6.25″ \times 3.50″$ ($0.375″$ overhang) | `viewBox="0 0 6.25 3.5"` |
| **4×6 Metal Cap** | Slip-fit 4×6 | $5.875″ \times 3.50″$ ($0.1875″$ overhang) | `viewBox="0 0 5.875 3.5"` |
| **4×6 Solar Cap** | Solar LED 4×6 | $6.25″ \times 4.25″$ | `viewBox="0 0 6.25 4.25"` |
| **Structural Fastener** | HeadLOK screw | $1.00″ \times 1.00″$ (detail cell) | `viewBox="0 0 1 1"` |

### The Two Laws of Vector Geometry
1. **The Inset Law**: The black outer shell (`fill="#000000"`) defines the physical boundary. The colored wood fill is inset by exactly **`0.1875″`** ($3/16″$) on all interior edges:
   $$\text{fill\_x} = \text{shell\_x} + 0.1875″, \quad \text{fill\_w} = \text{shell\_w} - 2(0.1875″)$$
2. **The Overlap Law**: Horizontal infill members (rails, boards, horizontal pickets) extend into the post shells by **`0.1875″`** on each side ($85.00″ \text{ bay} + 2 \times 0.1875″ = 85.375″$). This guarantees continuous 2-pass shell fusion with **zero hairline rendering gaps** on Retina/high-DPI screens.
3. **No SVG Strokes**: Never use `stroke="..."` on timber bounding boxes. SVG strokes expand symmetrically from the centerline, bleeding outside physical coordinates and distorting physical millimeter dimensions.

---

## 5. Architectural Layer Composition (2-Pass Stack)

Every assembly SVG must organize elements into clean architectural passes:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 78" width="104in" height="78in">
  <defs>
    <!-- Shines and Procedural Flow Grain Patterns -->
  </defs>

  <g id="master-assembly">
    <!-- PASS 1: Unified Structural Shells (Fuses into one seamless silhouette) -->
    <g id="shell">
      <rect x="4.00" y="6.00" width="5.50" height="72.00" fill="#000000"/>
      <rect x="94.50" y="6.00" width="5.50" height="72.00" fill="#000000"/>
      <rect x="9.3125" y="60.00" width="85.375" height="5.50" fill="#000000"/>
      <!-- ... -->
    </g>

    <!-- PASS 2: Surface, Detailing & Hardware -->
    <g id="details">
      <g id="posts" data-slot="post-material">
        <!-- Post Wood Fills + Vertical Grain Overlays -->
      </g>
      <g id="horizontal-members" data-slot="board-material">
        <!-- Board Fills + Horizontal Flow Grain Overlays -->
      </g>
      <g id="center-trim" data-slot="trim-material">
        <!-- Center Stiffener Wood Fill + Vertical Grain -->
      </g>
      <g id="caps" data-slot="post-cap-material">
        <!-- Post Cap Fills, Highlights, and Lenses -->
      </g>
      <!-- Hardware Layer: Toggleable architectural detail -->
      <g id="fasteners" class="structural-hardware" data-slot="fastener-hardware">
        <!-- HeadLOK Structural Screws -->
      </g>
    </g>
  </g>
</svg>
```

---

## 6. How Future Agents Must Build New Components

Whenever a task requests creating new fence styles or component batches:
1. **Never write raw SVG by hand with arbitrary quadratic curves**.
2. **Import or call `flow-grain.js`**:
   - `flowGrainPatternPaths(tileH, { palette })` for horizontal members.
   - `flowGrainPostPatternPaths(tileW, tileH, { palette })` for vertical members.
   - `flowGrainCapPatternPaths(tileH, { palette })` for post caps.
3. **Use canonical stain tokens** from `cedar-stains.js` (`STAIN_CEDAR_RAIL`, `STAIN_PT`, `CEDAR_RAIL_SHINE`, etc.).
4. **Generate dual-scope files**:
   - Export modular sym-atoms to `affinity-libraries/clean/components/sym-atoms/` and `assets/fence-svg/components/`.
   - Export full $104 \times 78$ assemblies to `affinity-libraries/clean/components/frames/` and `assets/fence-svg/pilot-fences/`.
5. **Sync cross-repo and cloud**:
   - Mirror assets to `Fence-Frames-Public-Website`.
   - Upload new SVG assets to Supabase Storage `component-svgs` bucket using `upload-batch*-svgs.mjs`.

---

## 7. Board Fence Geometry, Window Spacing & Height Standards

> **DIRECT OWNER MANDATE (Binding Law for All Board Fences)**:  
> All board fences (Horizontal Split Board: Rancher `HSB-RNCH`, Homesteader `HSB-HMST`) are governed by the 4ft default height and strict window-splitting mathematics.

### A. The 4-Foot Default Standard
1. **Default Display**: All board fences default to **4 ft (48 inches)** above ground grade ($Y = 30.00″ \to 78.00″$).
2. **Non-Recommended Options**: While 5 ft ($60″$) and 6 ft ($72″$) options exist in the engineering system, they are **not recommended** and MUST NOT be presented as defaults in previews, marketing, or configurator initial states.
3. **Canvas Ground Baseline**: The ground baseline remains absolute at **`Y = 78.00″`** across all heights. A 4ft fence has post tops at $Y = 30.00″$; post caps sit from $Y = 26.50″ \to 30.00″$.

### B. Triple Rail (3-Rail) [Baseline Configuration]
- **Top Board**: Top edge is flush with post tops ($Y = 78.00 - H$). Bottom edge is at $Y = 78.00 - H + 5.50″$.
- **Interior Space**: $S = 78.00 - (Y_{\text{post\_top}} + 5.50″) = H - 5.50″$.
- **Window Daylight**: $D_3 = S - 2(5.50″) = H - 16.50″$.
- **Window Height**: **$W_3 = (H - 16.50″) / 3$**.
- The next two boards split the interior space into **3 equal-sized windows**:
  - Window 1: $[Y_{\text{top\_board\_bottom}}, Y_{\text{top\_board\_bottom}} + W_3]$. Midpoint: $M_1 = Y_{\text{top\_board\_bottom}} + W_3 / 2$.
  - Board 2: $[Y_{\text{top\_board\_bottom}} + W_3, Y_{\text{top\_board\_bottom}} + W_3 + 5.50″]$.
  - Window 2: $[Y_{\text{board2\_bottom}}, Y_{\text{board2\_bottom}} + W_3]$. Midpoint: $M_2 = Y_{\text{board2\_bottom}} + W_3 / 2$.
  - Board 3: $[Y_{\text{board2\_bottom}} + W_3, Y_{\text{board2\_bottom}} + W_3 + 5.50″]$.
  - Window 3: $[Y_{\text{board3\_bottom}}, 78.00″]$ (clearance to ground baseline = $W_3$).

### C. Two Rail (2-Rail) Configuration
- Rails sit **centered exactly at the midpoints of the windows created by the triple rail configuration**:
  - Rail 1: Centered at Window 1 Midpoint ($M_1$). $Y = M_1 - 2.75″ \to M_1 + 2.75″$.
  - Rail 2: Centered at Window 2 Midpoint ($M_2$). $Y = M_2 - 2.75″ \to M_2 + 2.75″$.

### D. Quad Rail (4-Rail) Configuration
- Top board flush with post tops. The remaining 3 rails split the interior space into **4 equal quadrants**:
  - Quadrant Daylight: $D_4 = S - 3(5.50″) = H - 22.00″$.
  - Quadrant Height: **$W_4 = (H - 22.00″) / 4$**.
  - Board 1 (Top): $Y = Y_{\text{post\_top}} \to Y_{\text{post\_top}} + 5.50″$.
  - Board 2: $Y = Y_{\text{post\_top}} + 5.50″ + W_4 \to + 11.00″ + W_4$.
  - Board 3: $Y = Y_{\text{post\_top}} + 11.00″ + 2W_4 \to + 16.50″ + 2W_4$.
  - Board 4: $Y = Y_{\text{post\_top}} + 16.50″ + 3W_4 \to + 22.00″ + 3W_4$.
  - Ground Clearance (Quadrant 4): $W_4$.

### E. Master Coordinate Matrix ($104 \times 78$ Artboard Standard)

| Fence Height | Config | Window / Quad Height | Board 1 Y | Board 2 Y | Board 3 Y | Board 4 Y | Ground Gap |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **4 ft ($48″$) [DEFAULT]** | **3-Rail** | **`10.50″`** | `30.00″` | `46.00″` | `62.00″` | — | `10.50″` |
| **4 ft ($48″$)** | **2-Rail** | midpoints ($40.75″, 56.75″$) | `38.00″` | `54.00″` | — | — | `18.50″` |
| **4 ft ($48″$)** | **4-Rail** | **`6.50″`** | `30.00″` | `42.00″` | `54.00″` | `66.00″` | `6.50″` |
| 5 ft ($60″$) [Option] | 3-Rail | `14.50″` | `18.00″` | `38.00″` | `58.00″` | — | `14.50″` |
| 5 ft ($60″$) [Option] | 2-Rail | midpoints ($30.75″, 50.75″$) | `28.00″` | `48.00″` | — | — | `24.50″` |
| 5 ft ($60″$) [Option] | 4-Rail | `9.50″` | `18.00″` | `33.00″` | `48.00″` | `63.00″` | `9.50″` |
| 6 ft ($72″$) [Option] | 3-Rail | `18.50″` | `6.00″` | `30.00″` | `54.00″` | — | `18.50″` |
| 6 ft ($72″$) [Option] | 2-Rail | midpoints ($20.75″, 44.75″$) | `18.00″` | `42.00″` | — | — | `30.50″` |
| 6 ft ($72″$) [Option] | 4-Rail | `12.50″` | `6.00″` | `24.00″` | `42.00″` | `60.00″` | `12.50″` |

