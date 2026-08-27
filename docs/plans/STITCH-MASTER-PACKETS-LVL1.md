# Google Stitch Master Prompt Packets — LVL 1 (reference)

Canonical target: Complete 12-page LVL 1 build suite.  
Design law: FenceBook `docs/DESIGN-RULES.md` & SPOKE-DESIGN-SYSTEM.md.  
**Build strategy:** Two-Sweep (Phase 1 semantic HTML/CSS + placeholder cards → Phase 2 React interactive upgrade).

This file is the **repo-side index** of the Stitch / WEB-BUILDER packet content the owner pasted. Full packet prose lives in chat history; agents should follow **ACTIVE-PLAN** + this index + wireframe HTML in `public/`.

## Global rules (every packet)

1. **Phase 1:** HTML/CSS layouts, grids, cards; interactive bits as styled **placeholder cards**.
2. **Phase 2 prep:** `id`, `class`, `data-interactive-target="..."` on every placeholder.
3. **Chrome:** Prefer repo `element-header-footer.html` / `ff-site-header.js`; Drive copy only if repo missing.
4. **Rowdies only** (700 / 400 / 300). Dead: Montegrin, Montagu Slab, Black Ops One, Inter/Roboto/Fira (unless code readout).
5. **Pillars:** Find `#E5B842` · Frame `#F27A22` · Fence `#4ADE80` · Auth blue `#3B82F6`.
6. **Cards:** 5px radius, 2.5px ink; outside corners when used — **site law 50% span** (Stitch text may say 35%; prefer DESIGN-RULES).
7. **Brand firewall:** Fence Frames LLC only — no Two Lew / “Powered by TLB”.

## Visual labs to open before building

| File | Role |
| --- | --- |
| `D:\Lew-Line-Workspaces\_Publications-Demos-and-Exports\Live-Demos-and-Prototypes\12-component-inventory-studio.html` | Component inventory |
| `D:\Lew-Line-Workspaces\_Publications-Demos-and-Exports\Live-Demos-and-Prototypes\01-interactive-architecture-canvas.html` | Architecture canvas |
| `...\Fence-Frames-Public-Website\trials\homepage-wireframes-lab.html` | Homepage wireframes |
| `...\Fence-Frames-Public-Website\trials\pure-original-background-lab.html` | Background / parchment |
| `...\Fence-Frames-Public-Website\trials\grid-alignment-lab.html` | Green Print grid alignment |

## Packet map

| Packet | Code | Route(s) | Priority |
| --- | --- | --- | --- |
| 01 | DSGN-03 Designer | `/designer` `/configure` | Deferred — separate workspace; CTA placeholders only |
| 02 | CORE-03 Blueprint | `/blueprint` | LVL 1 |
| 03 | CORE-02 Auth | `/log-in` `/sign-up` | LVL 1 — **Batch 1 start** |
| 04 | HOME-01 Homeowner | `/homeowner` | LVL 1 |
| 05 | HOME-02 Folio | `/homeowner/folio/[id]` | LVL 1 |
| 06 | DSGN-02 Catalog carousel | `/fence-designs` | LVL 1 |
| 07 | DSGN-01 Design hub | `/frame` `/catalog` | LVL 1 |
| 08 | GEO-COM-01 Si View | `/wa/king/north-bend/si-view` | LVL 1 |
| 09 | GEO-CIT-01 North Bend | `/wa/king/north-bend` | LVL 1 |
| 10 | CORE-01 Home | `/` | **Skip** — live on staging |
| 11 | PRO-04 Dispatch | `/contractors/projects` | LVL 1 |
| 12 | PRO-05 Match | `/contractor/match/[jobId]` | LVL 1 |

## WEB-BUILDER Batch 1 order

1. CORE-02 `/log-in`  
2. CORE-03 `/blueprint`  
3. DSGN-01 `/frame` & `/catalog`  
4. DSGN-02 `/fence-designs`  
5. GEO-COM-01 Si View  
6. HOME-01 `/homeowner`  
7. HOME-02 Folio  
8. PRO-04 `/contractors/projects`  
9. PRO-05 match scramble  

## Related active plans

- [`ACTIVE-PLAN-tier1-html-first.md`](./ACTIVE-PLAN-tier1-html-first.md)
- [`ROXY-new-chat-starter.md`](./ROXY-new-chat-starter.md)
- [`heritage-designer-modernize.md`](./heritage-designer-modernize.md)
