# 🏡 Fence Frames — Public Website (100% Next.js Architecture)

**Live Edge Staging:** Vercel Edge Staging  
**Primary Tech Stack:** **100% Next.js (App Router)** · React 18 · TypeScript · Tailwind CSS

---

## 🏛️ 100% Next.js Production Architecture

All public routes and interactive pages are built as **Next.js App Router components** under `app/`:

| Next.js Route | Component Path | Purpose |
| :--- | :--- | :--- |
| **`/`** | `app/page.tsx` | Master Homepage with 3-Pillar Customer Journey & ZIP/HOA Search |
| **`/designer`** | `app/designer/page.tsx` | Parametric React CAD Configurator with live SVG elevation stage |
| **`/auth-gate`** | `app/auth-gate/page.tsx` | Auth Gate v2 with parchment grid background and modal PIN gate |
| **`/wa/[county]/[city]/[community]`** | `app/wa/[county]/[city]/[community]/page.tsx` | Dynamic community guides with pre-approved HOA guidelines |
| **`/contractors`** | `app/contractors/page.tsx` | Contractor onboarding and territory dispatch portal |

> **Note on Standalone HTML Files**: Standalone `.html` files located in `public/` or `_Platform/demos/` serve purely as **design prototypes, wireframe testbeds, and visual references** for AI agents and designers. All production functionality is strictly compiled in **Next.js React**.

---

## 📖 Canonical Documentation & Spec Hub

- 🏛️ **Master AI Context Hub**: [`docs/HANDBOOK-PILLARS-AI-CONTEXT-INDEX.md`](docs/HANDBOOK-PILLARS-AI-CONTEXT-INDEX.md)
- 🎨 **Design Rules & Brand Law**: [`docs/DESIGN-RULES.md`](docs/DESIGN-RULES.md)
- 🌐 **Site Architecture & Routing**: [`docs/site-architecture.md`](docs/site-architecture.md)
- 🔩 **Component Encyclopedia**: [`docs/component-tracker.md`](docs/component-tracker.md)

> **📚 Full Canonical Documentation** lives in the **FenceBook** repo (`D:\Lew-Line-Workspaces\FenceBook\docs\`).
> Start with [`FenceBook/docs/INDEX.md`](file:///D:/Lew-Line-Workspaces/FenceBook/docs/INDEX.md) for the master navigation index, tier system, and handbook sections §01–§18.
> This repo's `docs/` folder contains only **implementation-specific** specs, trackers, and design rules needed during active development.
