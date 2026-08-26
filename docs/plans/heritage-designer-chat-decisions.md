# Heritage Designer — Chat Decisions Snapshot

Captured from the Tier-1 / Heritage designer planning chat before implementation.
Canonical plan: [`heritage-designer-modernize.md`](./heritage-designer-modernize.md).

**Date:** 2026-08-26  
**Branch intent:** commit plan only; implementation starts after owner says go.  
**Asset authoring source:** `D:\Lew-Line-Workspaces\Design\FenceBook\public\configure\heritage-v1`  
**Live preview hosts (when up):** `:5199` / `:5200`

---

## Direction

- Rebuild React `/designer` as Green Print (cream `#F4ECDC` + green technical grid), not charcoal-page Heritage HTML port.
- Heritage pack = guts (SVGs, registry, pricing equation, stack logic later).
- Designer = **build tool only**. Blueprint / Materials / Ledger = **Fence-Folio** exits.
- StudioConfigurator `.txt` mock = layout sketch only (accordion explode); scrap Unsplash / Folio-mixed chapters.

## Locked product calls

| Topic | Decision |
| --- | --- |
| Defaults | Vertical picket + cedar picket ≡ **Heritage**; each style boots with **full default option set** selected; Reset → that style’s defaults |
| Templates | **No** in-designer templates; Catalog/Wizard link for other styles |
| Controls | **All** configure controls in left scrolling menu (incl. LF); strip = total readout + Reset + Folio/Catalog only |
| LF | Base **8** (one panel in viewBox); panel bay vs LF independent |
| Pricing | Original equation in **isolated** module; no “TRIAL” UI badge; expect many changes |
| Session | Session memory for active fence; permanent save needs account |
| Folio / auth | Guests: **blurred doc teaser** + sign-in focus; preserve fence draft through signup; members save to homeowner dashboard |
| Nav | Same **site-wide SiteNav** |
| Phone | Nav stays; footer gone; lower half = control console; title/lower info → dropdown or thin bar |
| Footer (md+) | Only if it does **not** force scroll |
| SVG well | Dark (not cream): default forest → charcoal gradient |
| Corners | Try 50% outside corner marks on plates; drop if cramped; Rowdies only |
| Elevation | Dual-card container continuum: grow/shrink together → poof back away → front centers/grows → shrink → poof phone two-row + flip |
| Accordion vs thin bar | Provisional both; **final call at Keep/Park after seeing** |
| First Keep SVG | Style-scoped controls; static front/back OK; live stack-composer = later Keep |

## Chapters (left menu)

1. Height, panel length & linear feet  
2. Posts  
3. Rails / frame  
4. Pickets / fill  
5. Trim  
6. Cap & finish / stain  
7. Gates  

## Explicit non-goals (first Keep)

- Full dark Heritage toolbox CSS port  
- Unsplash dual-photo canvas  
- In-designer templates / BOM calculator  
- Blueprint / Materials / Ledger as designer modes  
- Shared SiteNav rewrite  
- Staging push until phone + tablet + desktop Keep  

## Related context (same chat era)

- Tier-1 ship cadence still one-page-at-a-time to `staging`; log-in React in progress separately.  
- Do not mix unrelated dirty header/HTML work into the designer plan commit.  
- Prefer `pnpm` for this Next app.
