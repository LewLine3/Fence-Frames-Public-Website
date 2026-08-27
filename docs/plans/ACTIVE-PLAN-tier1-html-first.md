# ACTIVE PLAN — Tier-1 HTML-first + React controls

**Status:** Current active plan for **all Tier-1 pages** (supersedes “full React page” assumption).  
**Committed:** staging — update this file when strategy changes.  
**Related:** [`heritage-designer-modernize.md`](./heritage-designer-modernize.md) · [`heritage-designer-chat-decisions.md`](./heritage-designer-chat-decisions.md) · [`STITCH-MASTER-PACKETS-LVL1.md`](./STITCH-MASTER-PACKETS-LVL1.md)  
**New-chat starter:** [`ROXY-new-chat-starter.md`](./ROXY-new-chat-starter.md)

---

## Strategy (locked) — Two-Sweep

### Phase 1 (now) — HTML/CSS + placeholder cards

1. Build every Tier-1 page shell in **semantic HTML + CSS/Tailwind** (layout, Green Print chrome, copy, card containers).
2. Interactive controls ship first as **styled HTML placeholder cards** (buttons, inputs, OTP, toggles, dropdowns, drawers, timers, carousels).
3. Tag every upgradable control with `id` / `class` / **`data-interactive-target="..."`**.

### Phase 2 (later) — React upgrade

4. Mount **React/TSX** into those targets — pretty much **any user control** becomes a React element.
5. Do not rebuild whole pages as App Router React as the first Keep unless the owner overrides.

## Visual / component references (required reading)

| Path | Use |
| --- | --- |
| `D:\Lew-Line-Workspaces\_Publications-Demos-and-Exports\Live-Demos-and-Prototypes\12-component-inventory-studio.html` | Component inventory |
| `D:\Lew-Line-Workspaces\_Publications-Demos-and-Exports\Live-Demos-and-Prototypes\01-interactive-architecture-canvas.html` | Architecture canvas |
| `D:\Lew-Line-Workspaces\Fence-Frames-Public-Website\trials\homepage-wireframes-lab.html` | Homepage wireframes |
| `D:\Lew-Line-Workspaces\Fence-Frames-Public-Website\trials\pure-original-background-lab.html` | Background / parchment |
| `D:\Lew-Line-Workspaces\Fence-Frames-Public-Website\trials\grid-alignment-lab.html` | Grid alignment |

Chrome: `public/element-header-footer.html` + `public/js/ff-site-header.js`.  
Design law: FenceBook `docs/DESIGN-RULES.md` (50% outside corners when used; Rowdies only).

## WEB-BUILDER Batch 1 order (current execution sequence)

Skip CORE-01 Home (live on staging). Skip full DSGN-03 designer (separate workspace — CTA to `/configure` or `/designer` only).

| Turn | Packet | Route | Wireframe |
| --- | --- | --- | --- |
| 1 | CORE-02 Auth | `/log-in` | `public/auth-gate.html` |
| 2 | CORE-03 Blueprint | `/blueprint` | `public/blueprint-standalone.html` |
| 3 | DSGN-01 Hub | `/frame` `/catalog` | `public/catalog-hub.html` |
| 4 | DSGN-02 Catalog | `/fence-designs` | `catalog-hub` / `catalog-detail` |
| 5 | GEO-COM-01 Si View | `/wa/king/north-bend/si-view` | `public/geo-si-view.html` |
| 6 | HOME-01 Homeowner | `/homeowner` | `public/homeowner-dashboard.html` |
| 7 | HOME-02 Folio | `/homeowner/folio/[id]` | folio dossier HTML |
| 8 | PRO-04 Dispatch | `/contractors/projects` | `public/contractors-hub.html` |
| 9 | PRO-05 Match | `/contractor/match/[jobId]` | `public/contractor-match.html` |

Also in Stitch suite: GEO-CIT-01 North Bend (`/wa/king/north-bend`).

## Designer (deferred full build)

Product locks in [`heritage-designer-modernize.md`](./heritage-designer-modernize.md) still apply when that workspace runs.  
Tier-1 marketing pages use **placeholder CTAs** to configure/designer until that Keep lands.

## Cadence

- One page at a time → Keep/Park → push **`staging`**.
- Sync to `main` only when owner says so.
- Prefer **pnpm**. Site-wide nav. Fence Frames only — never Fence Foundry / TLB logos.

## Asset sources

- Heritage configure: `D:\Lew-Line-Workspaces\Design\FenceBook\public\configure\heritage-v1`
- Green Print: cream `#F4ECDC` + green grid; dark wells for fence art

## Explicit non-goals until Phase 1 page is Kept

- Full React App Router rewrite as step one
- Deep Heritage stack-composer before designer workspace Keep
- Regenerating live homepage unless directed
- Handbook/canon law rewrites
