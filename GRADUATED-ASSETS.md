# 📦 Fence Frames — Graduated Asset Registry & Pooling System

**Authority:** Public Website Asset Management Standard  
**Master Manifest:** [`graduated-assets.json`](./graduated-assets.json)  
**Status:** Canonical & Auto-Graduated

---

## 🎯 Purpose & Auto-Graduation Law

This directory and the accompanying [`graduated-assets.json`](./graduated-assets.json) manifest serve as the **single centralized pool** for all handbook-acceptable and approved visual assets across the Fence Frames website and configurator.

> [!IMPORTANT]
> **Zero-Questionnaire Graduation Rule**:  
> Any texture, background, decorative image, or fence component placed into the graduated folders below and indexed in `graduated-assets.json` is **immediately authorized, handbook-acceptable, and graduated for production use**. You and agents can add assets here freely without needing to create or pass a decision questionnaire or wait for a rewrite lock session!

---

## 📁 3 Core Graduated Asset Folders

```
Fence-Frames-Public-Website/images/
├── graduated-textures/       # Approved card backgrounds, wood grains, parchment, stone, plates
│   ├── cedar-hero-woodgrain.jpg
│   ├── wood-grain-pale.jpg
│   └── [subfolders: wood-grain/, stone/, composite/]
├── decorative/               # Approved site illustrations, badges, step art, holographic overlays
│   ├── step1-matcher-illustration.png
│   ├── find-it-detailed.png
│   ├── frame-it-detailed.png
│   ├── fence-it-detailed.png
│   └── [subfolders: badges/, icons/, overlays/]
└── fence-components/         # Completed fence photography, component cutouts, style presets
    ├── modern-black-steel-fence-frame.png
    ├── steel-gate-frame-assembly.png
    └── [subfolders: vpf-heritage/, modern-steel/, gates/, hardware/]
```

---

## 🛠️ How to Add a New Asset (For User or Agent)

Adding a new approved asset to the design system requires just two simple steps:

1. **Place the Image File**:
   - For a card background or texture: save in `images/graduated-textures/` (e.g. `images/graduated-textures/dark-walnut-grain.jpg`).
   - For a badge, step icon, or decorative visual: save in `images/decorative/`.
   - For a fence photo or structural component: save in `images/fence-components/`.

2. **Add Entry to [`graduated-assets.json`](./graduated-assets.json)**:
   ```json
   {
     "id": "tex-dark-walnut",
     "name": "Dark Walnut Grain",
     "category": "wood_grain",
     "path": "images/graduated-textures/dark-walnut-grain.jpg",
     "usage": "Dark wood alternative for card backgrounds and headers",
     "status": "graduated_canon",
     "added_at": "2026-08-17"
   }
   ```

---

## 🌳 Future Subfolder Branching Architecture

As the asset library grows, subfolders can be created inside each primary pool:
- `images/graduated-textures/` $\rightarrow$ `wood-grain/`, `stone/`, `metal/`, `composite/`
- `images/decorative/` $\rightarrow$ `step-illustrations/`, `pillar-badges/`, `icons/`, `holographic/`
- `images/fence-components/` $\rightarrow$ `vpf-heritage/`, `modern-steel/`, `gates/`, `caps/`, `hardware/`

All subfolder assets inherit the same automatic graduation status once registered in `graduated-assets.json`.
