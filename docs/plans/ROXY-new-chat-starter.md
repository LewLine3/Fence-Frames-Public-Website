# ROXY — New chat starter (paste this)

Copy everything below the line into a **new Cursor chat** to continue Tier-1 work with the locked active plan.

---

You are continuing Fence Frames Tier-1 public site work on branch **`staging`**.

## Active plan (read first)

1. [`docs/plans/ACTIVE-PLAN-tier1-html-first.md`](docs/plans/ACTIVE-PLAN-tier1-html-first.md) — **current active plan for ALL tiers**
2. [`docs/plans/heritage-designer-modernize.md`](docs/plans/heritage-designer-modernize.md) — designer product locks
3. [`docs/plans/heritage-designer-chat-decisions.md`](docs/plans/heritage-designer-chat-decisions.md) — decision snapshot

## Strategy change (do not ignore)

- **HTML first** for every Tier-1 page (structure, Green Print layout, copy).
- **Then** a second pass mounts **React elements** into those HTML pages.
- Pages once planned as “full React sites” are now **HTML pages + React control islands**.
- **Any user control** (forms, OTP, option sets, LF, accordions, toggles, estimate interactions, Folio membership gates, front/back flip, Reset, etc.) should be implemented as a **React element** in the sweep — not as a reason to rebuild the whole page in App Router first.

## Cadence

- One page at a time → owner Keep/Park → push straight to **`staging`**.
- Sync to `main` only when owner says so.
- Prefer **pnpm**. Site-wide nav consistency. No Fence Foundry. Folio = widget chrome only.

## Designer specifics (when on page 7)

- Cream `#F4ECDC` + green grid page; dark forest→charcoal well behind fence SVG.
- All configure controls in left scrolling menu; LF default 8; each style has full default option set.
- No in-designer templates; Catalog/Wizard for other styles.
- Blueprint / Materials / Ledger = Fence-Folio exits (blurred teaser + sign-in for guests; preserve draft through signup).
- Elevation continuum: two cards grow/shrink together → poof to centered front → shrink → phone two-row + flip.
- Assets from `D:\Lew-Line-Workspaces\Design\FenceBook\public\configure\heritage-v1`.

## Immediate ask

Read the three plan docs above, sync with `git status` on `staging`, then ask which Tier-1 page to build next in **HTML first** (or continue the current page). Do not assume full-React page rewrites unless the owner overrides the active plan.

## Chat title suggestion

`Tier-1 HTML-first + React controls`
