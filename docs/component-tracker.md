---
type: tracker
category: configurator
parent: "[[Fence Frames — Launch Tracker]]"
repo_mirror: FenceBook/scripts/lib/configurator-catalog.js
updated: 2026-07-05
tags: [fence-frames, configurator, components, tracker]
---

# Fence Frames — Component tracker

One checkbox = **V1 ready** for that item (art on disk · pilot/canvas wired · in `catalog-data.json` · Airtable Art Part if applicable).

**Legend:** `[x]` = done · `[ ]` = still needed · *italic* = config-only (no SVG atom)

**Run after art changes:** `npm run save:components` (FenceBook repo)

---

## Frame assemblies

- [x] Heritage HRTG — front (`asm-heritage-hrtg-frame.svg`) — live PILOT stack composer
- [x] Heritage HRTG — back (`asm-heritage-hrtg-frame-back.svg`) — live PILOT
- [x] Heritage default frame (`asm-vpf-frame-hrtg.svg`) — template switcher
- [x] Traditions frame (`asm-vpf-frame-traditions.svg`) — template switcher
- [x] Lineage frame (`asm-vpf-frame-lineage.svg`) — template switcher
- [x] Legacy / triple-rail frame (`asm-vpf-frame-legacy.svg`) — template switcher
- [x] HF Rancher frame (`asm-hf-rancher-frame.svg`) — live HF pilot (2026-07-05 ship)
- [x] HF Homesteader frame (`asm-hf-homesteader-frame.svg`) — live HF pilot

---

## Sym atoms — Posts

- [x] Post — PT 4×4 (`sym-post-pt-4x4`)
- [x] Post — Cedar 4×4 (`sym-post-cedar-4x4`)

## Sym atoms — Post caps

- [x] Post cap — Cedar pyramid (`sym-post-cap-cedar-pyramid`)
- [x] Post cap — Metal pyramid black (`sym-post-cap-metal-pyramid`)
- [x] Post cap — Solar pyramid (`sym-post-cap-solar-pyramid`)
- [x] Post cap — Copper over wood (`sym-post-cap-copper-pyramid`)

## Sym atoms — Ground

- [x] Ground — grass (`sym-ground-grass-heritage`)

## Sym atoms — Pickets

- [x] Picket — flat top (`sym-picket-cedar-flat-top-heritage`)
- [x] Picket — gothic (`sym-picket-cedar-gothic-heritage`)
- [x] Picket — shadowbox (`sym-picket-cedar-shadowbox-heritage`)
- [x] Picket — board on board (`sym-picket-cedar-board-on-board-heritage`)

## Sym atoms — Rails

- [x] Top rail — standard (`sym-rail-top-heritage`)
- [x] Top rail — lowered / Traditions (`sym-rail-top-lowered`)
- [x] Bottom rail — standard (`sym-rail-bottom-heritage`)
- [x] Bottom rail — lowered / Lineage·Legacy (`sym-rail-bottom-lowered`)
- [x] Middle rail — triple-rail (`sym-rail-middle-heritage`)
- [x] Rail cap — 1.5″ ref (`sym-rail-cap-ref-1.5`)

## Sym atoms — Trim

- [x] Trim — top cedar 1T (`sym-trim-top-cedar`)
- [x] Trim — top PT 1T (`sym-trim-top-pt`)
- [x] Trim — bottom cedar 2T (`sym-trim-bottom-cedar`)
- [x] Trim — bottom PT 2T (`sym-trim-bottom-pt`)

## Sym atoms — Brackets

- [x] Bracket — U fence black (`sym-bracket-u-2x4-black`)
- [x] Bracket — U fence galvanized (`sym-bracket-u-2x4-galv`)
- [x] Bracket — L angle 1″ (`sym-bracket-l-1in`)
- [x] Bracket — L angle 2″ (`sym-bracket-l-2in`)
- [x] Bracket — L angle 4″ (`sym-bracket-l-4in`)
- [x] Bracket — L angle 6″ (`sym-bracket-l-6in`)
- [x] Bracket — poly U (`sym-bracket-poly-u`)
- [x] Bracket — wood block 2×2 PT (`sym-bracket-wood-block-2x2-pt`)
- [x] Bracket — wood block 2×2 cedar (`sym-bracket-wood-block-2x2-cedar`)
- [x] Bracket — wood block 2×4 PT (`sym-bracket-wood-block-2x4-pt`)
- [x] Bracket — wood block 2×4 cedar (`sym-bracket-wood-block-2x4-cedar`)

---

## Decorative / legacy component SVGs (Airtable Selection rows)

- [ ] Rail — two rail standard (`component-rail-cedar-two-rail-standard`)
- [ ] Rail — two rail narrow (`component-rail-cedar-two-rail-narrow`)
- [ ] Rail — two rail wide (`component-rail-cedar-two-rail-wide`)
- [ ] Rail — three rail standard (`component-rail-cedar-three-rail-standard`)
- [ ] Picket — flat top (`component-picket-cedar-flat-top`)
- [ ] Picket — gothic (`component-picket-cedar-gothic`)
- [ ] Picket — dog eared (`component-picket-cedar-dog-eared`)
- [ ] Trim — post trim package (`component-trim-cedar-post-trim`)
- [ ] Trim — picture frame package (`component-trim-cedar-picture-frame-trim-package`)
- [ ] Trim — two rail horizontal (`component-trim-cedar-two-rail-horizontal`)
- [ ] Trim — three rail horizontal (`component-trim-cedar-three-rail-horizontal`)
- [ ] Trim — custom (`component-trim-cedar-custom`)
- [ ] Cap — cedar post cap (`component-cap-cedar-cedar-post`)
- [ ] Cap — rail cap craftsman (`component-cap-cedar-rail-cap-craftsman`)
- [ ] Cap — rail cap simple (`component-cap-cedar-rail-cap-simple`)
- [ ] Cap — aluminum metal post (`component-cap-aluminum-metal-post`)
- [ ] Cap — mixed other (`component-cap-mixed-other`)

---

## Heritage VPF — 25 build slots (`VPF-HRTG-1Tc-SCR`)

Tier **1** = must ship for Heritage v1 · Tier **2** = document or hide behind More options

### Tier 1 — product controls

- [x] Post caps — TBPP (slot 8) — *pilot UI + sym live; Airtable link pending*
- [x] Picket top detail — flat / gothic / etc. — TBPF (slot 11)
- [x] Picket spacing — privacy standard — TBPF (slot 12)
- [x] Picket arrangement — privacy — TBPF (slot 14)
- [x] Paint / stain / seal — TBPS (slot 16)
- [x] Gates — none / add gate — TBPG (slot 17)
- [x] Rail arrangement — two rail Heritage — TBPR (slot 23)
- [x] Trim package — 1T / 2T / post trim — TBPT (slot 24)
- [x] Rail cap — SRC craftsman — TBPR (slot 25)
- [x] Fence height — 4′ / 5′ / 6′ — TBPG (slot 3)
- [x] Posts material — PT incised / appearance / cedar — TBPP (grouped)
- [x] Rails material — PT / cedar — TBPR (grouped)
- [x] Templates — Base / Default / Lineage / Legacy (grouped)

### Tier 2 — BOM / advanced

- [ ] Brackets — fence style — TBPE (slot 1)
- [ ] Fastener locations — face & hidden (slot 2) — *config*
- [ ] Soil amendments (slot 5) — *config*
- [ ] Rail bracing — no bracing default (slot 6)
- [ ] Post spacing — 6′ / 8′ (slot 7) — *config*
- [ ] Post attachment (slot 9) — *config*
- [ ] Picket width — 5.5″ standard (slot 10) — *retile math*
- [ ] Picket fastener type — HDG siding nails (slot 13)
- [ ] Panel detail (slot 15) — *config*
- [ ] Gate style / latch / hinges (slots 18–20) — when gates enabled
- [ ] Framing fastener type — HDG ring shank (slot 21)
- [ ] Post height — level with panel (slot 22) — *config*
- [ ] Fence type — VPF implicit (slot 4) — *config*

---

## HF scaffold lines (not V1)

- [ ] Forester — horizontal picket (`HPF`)
- [ ] Statesmen — cross buck (`HXB`)
- [ ] Visionary — composite/vinyl (`HCV`)

---

## Platform / data backlog

- [ ] Deduplicate Heritage Build Slot rows in Airtable (50 → 25)
- [ ] Repeat slot reconciliation for 2–3 more VPF variants
- [ ] Full HF Build Slot pass — Rancher + Homesteader
- [ ] Wire pilot from Build Slots + Supabase (replace hardcoded TB panels)
- [ ] Graduate priority syms to `library/atoms/` (vetted tier)

---

## Related

- [[Build Slots — Heritage VPF Checklist]]
- [[Fence Frames — Launch Tracker]]
- Repo: `FenceBook/docs/heritage-vpf-hrtg-1tc-scr-reconciliation.md`
