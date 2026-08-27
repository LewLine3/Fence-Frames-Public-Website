# ROXY — New chat starter (paste this)

Copy everything below the line into a **new Cursor chat** to continue Tier-1 work with the locked active plan.

---

You are continuing Fence Frames Tier-1 public site work on branch **`staging`**.

## Active plan (read first)

1. [`docs/plans/ACTIVE-PLAN-tier1-html-first.md`](docs/plans/ACTIVE-PLAN-tier1-html-first.md) — **current active plan for ALL tiers**
2. [`docs/plans/heritage-designer-modernize.md`](docs/plans/heritage-designer-modernize.md) — designer product locks (separate / deferred workspace for full configurator)
3. [`docs/plans/heritage-designer-chat-decisions.md`](docs/plans/heritage-designer-chat-decisions.md) — decision snapshot
4. [`docs/plans/STITCH-MASTER-PACKETS-LVL1.md`](docs/plans/STITCH-MASTER-PACKETS-LVL1.md) — Google Stitch LVL 1 packet briefs + WEB-BUILDER batch sequence

## Visual / component reference files (open these)

**Live demos & prototypes**

- `D:\Lew-Line-Workspaces\_Publications-Demos-and-Exports\Live-Demos-and-Prototypes\12-component-inventory-studio.html`
- `D:\Lew-Line-Workspaces\_Publications-Demos-and-Exports\Live-Demos-and-Prototypes\01-interactive-architecture-canvas.html`

**Trials (Green Print / grid / background)**

- `D:\Lew-Line-Workspaces\Fence-Frames-Public-Website\trials\homepage-wireframes-lab.html`
- `D:\Lew-Line-Workspaces\Fence-Frames-Public-Website\trials\pure-original-background-lab.html`
- `D:\Lew-Line-Workspaces\Fence-Frames-Public-Website\trials\grid-alignment-lab.html`

**Design law**

- `D:\Lew-Line-Workspaces\FenceBook\docs\DESIGN-RULES.md` (and SPOKE-DESIGN-SYSTEM.md if present)
- Site chrome: `public/element-header-footer.html` + `public/js/ff-site-header.js` (prefer repo files over Drive when both exist)

## Strategy (Two-Sweep — do not ignore)

### Phase 1 — HTML/CSS sweep (now)

- Outer shells, canvas grids, card containers = **semantic HTML + Tailwind/CSS**.
- Interactive controls start as **fully styled HTML placeholder cards** so pages can ship as static prototypes.
- Mark every upgradable control with stable `id` / `class` / **`data-interactive-target="..."`** for Phase 2.

### Phase 2 — React upgrade sweep (later)

- Mount **React/TSX** into those targets for stateful user controls (OTP, toggles, carousels, drawers, timers, claim CTAs, etc.).
- Do **not** rebuild whole pages as App Router React as the first Keep unless the owner overrides.

## Cadence

- **One page at a time** → owner Keep/Park → push **`staging`**.
- Sync to `main` only when owner says so.
- Prefer **pnpm**. Fence Frames branding only (no Two Lew / TLB logos). Never Fence Foundry. Folio = widget chrome only.
- **Typography:** Rowdies 700 / 400 / 300 only.
- **Corners:** workspace law prefers **50% wall-span** outside marks when used; Stitch packets mention 35% — follow **DESIGN-RULES / AGENTS** unless owner says otherwise.
- **3-pillar colors:** Find `#E5B842` · Frame `#F27A22` · Fence `#4ADE80`.

## Batch 1 sequence (WEB-BUILDER)

Skip homepage (live on staging). Skip full DSGN-03 designer/configure (separate workspace — use CTA placeholders to `/configure` or `/designer`).

1. CORE-02 Auth Gate — `/log-in` (wireframe: `public/auth-gate.html`)
2. CORE-03 Blueprint — `/blueprint` (`public/blueprint-standalone.html`)
3. DSGN-01 Design Suite Hub — `/frame` & `/catalog` (`public/catalog-hub.html`)
4. DSGN-02 Catalog carousel — `/fence-designs` (`catalog-hub` / `catalog-detail`)
5. GEO-COM-01 Si View — `/wa/king/north-bend/si-view` (`public/geo-si-view.html`)
6. HOME-01 Homeowner — `/homeowner` (`public/homeowner-dashboard.html`)
7. HOME-02 Folio — `/homeowner/folio/[id]`
8. PRO-04 Contractors dispatch — `/contractors/projects` (`public/contractors-hub.html`)
9. PRO-05 Match scramble — `/contractor/match/[jobId]` (`public/contractor-match.html`)

Also planned in Stitch pack but not in Batch 1 start list: GEO-CIT-01 North Bend city hub.

## Immediate ask

Read the plan docs + skim the five reference HTML labs above. Sync `git status` on `staging`. Confirm starting **PAGE 1: CORE-02 Auth Gate (`/log-in`)** as Phase 1 HTML shell with `data-interactive-target` placeholders (unless owner names a different page).

## Chat title suggestion

`Tier-1 HTML-first + React controls`
