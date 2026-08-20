# 📦 Fence Frames — Graduated Asset Registry & Pooling System

**Authority:** Public Website Asset Management Standard  
**Master Manifest:** [`graduated-assets.json`](./graduated-assets.json)  
**Status:** Canonical & Auto-Graduated

---

## 🎯 Purpose & Auto-Graduation Law

This directory and the accompanying [`graduated-assets.json`](./graduated-assets.json) manifest serve as the **single centralized pool** for all handbook-acceptable and approved visual assets across the Fence Frames website and configurator.

> [!IMPORTANT]
> **Zero-Questionnaire Graduation Rule**:  
> Any texture, background, decorative graphic, hero visual, or fence component placed into the graduated folders below and indexed in `graduated-assets.json` is **immediately authorized, handbook-acceptable, and graduated for production use**. You and agents can add assets here freely without needing to create or pass a decision questionnaire or wait for a rewrite lock session!

---

## 📁 4 Core Graduated Asset Folders

All approved images, SVGs, and visual assets are organized under `Fence-Frames-Public-Website/images/graduated/`:

```
Fence-Frames-Public-Website/images/graduated/
├── backgrounds/                   # Card backgrounds, textures, drafting grids, canvas
│   ├── wood-grain/                # Cedar, walnut, pale pine textures
│   ├── stone-concrete/            # Slate, stone, concrete textures
│   ├── parchment-canvas/          # Base parchment canvas backgrounds
│   └── drafting-grids/            # Engineering and architectural grid patterns
│
├── decorative/                    # Site illustrations, step art, badges, holographic overlays
│   ├── pillar-badges/             # High-res badges (Find It, Frame It, Fence It)
│   ├── step-illustrations/        # Docked explainer illustrations (Step 1 Matcher, etc.)
│   ├── icons/                     # Vector icons and symbol markers
│   ├── holographic/               # Holographic fence icons and overlays
│   └── overlays/                  # Light flares, stamps, corner marks
│
├── hero-images/                   # Style line hero photography, elevations, & showcase renders
│   ├── classic-privacy/           # Vertical Cedar Picket Fence (VPF)
│   ├── modern-horizontal/         # Horizontal Board Fence (HF)
│   ├── board-on-board/            # Overlapping Board-on-Board Pickets
│   ├── picture-frame/             # Picture Frame & Estate Trim Styles
│   ├── garden-lattice/            # Lattice Panel Frame (LAT)
│   ├── welded-wire/               # Welded Wire / Hog Wire Mesh (WWR)
│   ├── traditional-picket/        # Dog-eared & Gothic Point Pickets
│   ├── ranch-split-rail/          # Ranch, Post & Rail, Split Rail
│   ├── modern-steel/              # Black Steel Posts & Metal Framing
│   ├── shadowbox/                 # Alternating Board Semi-Privacy
│   └── si-view-community/         # Si View HOA Approved Community Style
│
└── components/                    # Configurator 8-Category Component Cutouts & SVGs
    ├── general/                   # Elevation templates, viewBox modules (112×96), site lines
    ├── posts/                     # 4x4 PT Incised, smooth appearance, steel posts, caps
    ├── rails/                     # 2-rail, 3-rail, 4-rail stringers, brackets, clips
    ├── fill/                      # Vertical pickets, horizontal boards, lattice, wire infill
    ├── trim/                      # 1x4 rot boards, 1-trim, 2-trim, top fascia caps
    ├── stain/                     # Natural cedar, SW-3558 Asteroid, PT brown swatches
    ├── hardware/                  # Fasteners, ties, brackets, post anchors, screws
    └── gates/                     # Walk gates, drive gates, hinges, latches, drop rods
```

---

## 🛠️ How to Add a New Asset (For User or Agent)

Adding a new approved asset to the design system requires just two simple steps:

1. **Place the Image File**:
   - For a texture or background: save in `images/graduated/backgrounds/{category}/` (e.g. `images/graduated/backgrounds/wood-grain/dark-walnut-grain.jpg`).
   - For a badge, step icon, or decorative visual: save in `images/graduated/decorative/{type}/`.
   - For a fence style hero render: save in `images/graduated/hero-images/{style}/`.
   - For a configurator structural component: save in `images/graduated/components/{category}/`.

2. **Add Entry to [`graduated-assets.json`](./graduated-assets.json)**:
   ```json
   {
     "id": "hero-classic-cedar",
     "name": "Classic Cedar Privacy Hero",
     "category": "hero_image",
     "path": "images/graduated/hero-images/classic-privacy/catalog-vpf-natural.svg",
     "usage": "Hero visual for Greatest Hits Catalog and Style Line Step 1",
     "status": "graduated_canon",
     "added_at": "2026-08-17"
   }
   ```

All assets inside the graduated folder tree inherit automatic graduation status once registered.
