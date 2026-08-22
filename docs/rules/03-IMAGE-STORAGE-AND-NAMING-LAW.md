# 🖼️ Rule 03: Image Taxonomy, Prefix & Naming Law

## 1. The 4-Category Prefix System (SEO-Optimized & Structured)

Every image must use one of these 4 clean category prefixes. This organizes files alphabetically in folders without hurting Google SEO:

| Prefix | Category / Usage | Naming Formula | Example Filename |
| :--- | :--- | :--- | :--- |
| **`fence-`** | **Actual Fence Photos & Renders** (Image boxes, style showcases, carousel previews) | `fence-[style]-[height]-[feature]-[location].[ext]` | `fence-heritage-cedar-privacy-6ft-north-bend.jpg` |
| **`card-`** | **Card Backgrounds & Textures** (Cedar planks, blueprint mats, card covers) | `card-bg-[texture]-[color].[ext]` | `card-bg-western-red-cedar-planks.jpg` |
| **`dossier-`**| **CAD Blueprints & Submittals** (Exploded views, elevations, chapter sheets) | `dossier-[ch#]-[name]-[view].[ext]` | `dossier-ch4-heritage-elevation-cad-ruler.svg` |
| **`ui-`** | **Icons, Stamps & Badges** (Holographic pins, ticket cuts, approval stamps) | `ui-[type]-[name].[ext]` | `ui-icon-find-it-holographic-pin.png` |

## 2. Directory Structure in `public/images/`
```
public/images/
 ├── fences/     --> (All fence-*.jpg photos & renders)
 ├── cards/      --> (All card-bg-*.jpg textures & mats)
 ├── dossier/    --> (All dossier-ch*.svg blueprints & sheets)
 └── ui/         --> (All ui-icon-*.png badges & stamps)
```

## 3. Contextual Alt Text Law
Every `<img>` and `<Image />` component MUST have descriptive alt text matching its prefix intent:
- For `fence-`: `alt="6-foot Western Red Cedar privacy fence with rot-barrier kickboard installed in North Bend WA"`
- For `card-`: `alt="Western Red Cedar wood plank texture background"`
- For `dossier-`: `alt="Architectural CAD elevation blueprint with 0 to 8 foot measurement rulers"`
- For `ui-`: `alt="Si View HOA pre-approved compliance stamp"`
