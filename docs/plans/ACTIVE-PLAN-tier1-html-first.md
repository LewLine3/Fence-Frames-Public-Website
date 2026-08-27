# ACTIVE PLAN — Tier-1 HTML-first + React controls

**Status:** Current active plan for **all Tier-1 pages** (supersedes “full React page” assumption).  
**Committed:** staging — update this file when strategy changes.  
**Related:** [`heritage-designer-modernize.md`](./heritage-designer-modernize.md) · [`heritage-designer-chat-decisions.md`](./heritage-designer-chat-decisions.md)  
**New-chat starter:** [`ROXY-new-chat-starter.md`](./ROXY-new-chat-starter.md)

---

## Strategy (locked)

1. **Build every Tier-1 page in HTML first** (layout, Green Print chrome, copy, static structure).
2. **Later sweep:** mount **React elements** into those HTML pages for interactive controls.
3. Pages that were previously planned as full React App Router pages become **HTML shells** with **React islands** where the user can change state.
4. **Rule of thumb:** pretty much **any user control** (inputs, selects, accordions, toggles, estimate interactions, Folio gates, OTP, LF, option sets, flip controls, etc.) is a **React element**. Static marketing/layout stays HTML/CSS.

## Tier-1 page order (unchanged)

| # | Route / surface | HTML-first | React elements (sweep) |
| --- | --- | --- | --- |
| 1 | Home `/` | Keep/Park existing; polish HTML as needed | Interactive CTAs / widgets as needed |
| 2 | Log-in `/log-in` or `auth-gate.html` | HTML gate shell | OTP / auth controls |
| 3 | North Bend geo | HTML | Matchers / forms if any |
| 4 | Si View geo | HTML | Matchers / forms if any |
| 5 | Catalog hub | HTML | Filters / selects |
| 6 | Catalog detail | HTML | Style select / CTAs |
| 7 | **Designer** | HTML studio shell first | **All configure controls**, elevation flip, totals, Folio gates, Reset |
| 8 | Blueprint | HTML doc surface | Print/export controls as needed |
| 9 | Homeowner | HTML dashboard | Account cards / actions |
| 10 | Folio `[id]` | HTML dossier chapters | Chapter nav / save / membership gates |
| 11 | Contractors hub | HTML | Match CTAs |
| 12 | Contractor match | HTML | Match flow controls |

## Designer (still follows heritage-designer-modernize.md)

Product locks in the Heritage designer plan **still apply** (Green Print cream+grid, left menu controls, LF=8, Folio exits, elevation continuum, etc.).  
**Change:** implement **HTML shell first**, then React-mount the control console / option sets / session / pricing readout — not a single full Next page rewrite as the first Keep.

## Cadence

- One page at a time → Keep/Park → push **`staging`** (no feature-branch PR unless owner says otherwise).
- Sync to `main` only when owner says so.
- Prefer **pnpm** for this Next/public site tooling.
- Site-wide header: shared nav (HTML injector and/or React SiteNav — do not invent one-off headers).
- Naming: Fence Frames · Fence-Folio (widget) · FenceBook (hub). Never Fence Foundry.

## Asset sources

- Heritage configure: `D:\Lew-Line-Workspaces\Design\FenceBook\public\configure\heritage-v1`
- Design system: Green Print / Rowdies / 50% corner marks when used / cream `#F4ECDC` + green grid

## Explicit non-goals until HTML pass is Kept

- Full React App Router rewrite of every Tier-1 page as the first step
- Deep stack-composer parametric SVG before designer HTML shell Keep
- Handbook/canon law rewrites
