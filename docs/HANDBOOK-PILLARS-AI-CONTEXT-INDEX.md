# 🏛️ Fence Frames: Handbook Clusters & AI Context Index

> **PURPOSE**: Fast-boot context priming document for AI coding agents, subagents, and human operators. Every business pillar is mapped with its canonical handbook sections, supporting engineering specs, Next.js routes, visual prototypes, and component dependencies.

---

## 🌟 Cluster 1: Brand Identity, Legal & DNA Law

| Resource Type | Resource Name / Location | Description & Key Rules |
| :--- | :--- | :--- |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/00-handbook.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/00-handbook.md) | Master Handbook preamble & governance write lock. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/02-brand-and-domains.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/02-brand-and-domains.md) | Company name: **Fence Frames**, Tagline: *Frame Your Vision \| Find Your Fence*. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/15-legal-and-entity.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/15-legal-and-entity.md) | Entity structure: Fence Frames LLC. Disclaimer: Independent marketplace. |
| **Canonical Law** | [`FenceBook/docs/DESIGN-RULES.md`](file:///D:/Lew-Line-Workspaces/FenceBook/docs/DESIGN-RULES.md) | **Rowdies Typography Law** (700 Bold / 400 Reg / 300 Light), **3-Pillar Colors**, **50% Outside Corner Markers**. |
| **Visual Assets** | [`Fence-Frames-Public-Website/public/images/ui/drafts/`](file:///D:/Lew-Line-Workspaces/Fence-Frames-Public-Website/public/images/ui/drafts) | Vector wood brand marks (`brand-icon-wood-golden-cedar.svg`, `circular-medallion-*.svg`). |
| **Interactive Demo** | [`_Platform/demos/06-design-system-and-cards-guide.html`](file:///D:/Lew-Line-Workspaces/_Platform/demos/06-design-system-and-cards-guide.html) | Live interactive design system showcase (Port `8080`). |

---

## 🧭 Cluster 2: 3-Pillar Customer Journey & Site Architecture (100% Next.js)

| Resource Type | Resource Name / Location | Description & Key Rules |
| :--- | :--- | :--- |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/00-master-site-index.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/00-master-site-index.md) | Master site index and flow architecture. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/03-landing-page-spec.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/03-landing-page-spec.md) | Hero section, 3-step value proposition, community search bar. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/04-hoa-communities-spec.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/04-hoa-communities-spec.md) | Community guides (Si View pilot, Klahanie, Snoqualmie Ridge). |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/11-hoa-and-geography.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/11-hoa-and-geography.md) | Geographic clustering and pilot rollout boundaries. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/12-seo-and-site-architecture.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/12-seo-and-site-architecture.md) | Geo URLs: `/wa/[county]/[city]/[community]` + flat `/configure`. |
| **Engineering Spec**| [`Fence-Frames-Public-Website/docs/site-architecture.md`](file:///D:/Lew-Line-Workspaces/Fence-Frames-Public-Website/docs/site-architecture.md) | Full 16.5 KB URL hierarchy, simple vs complex city tiers. |
| **Next.js Page** | `app/page.tsx` & `app/auth-gate/page.tsx` | Master Homepage and Auth Gate v2 with parchment grid background. |
| **Next.js Page** | `app/wa/[county]/[city]/[community]/page.tsx` | Dynamic community guides with HOA pre-approvals. |
| **Interactive Demo** | [`_Platform/demos/02-fence-frames-homepage-live.html`](file:///D:/Lew-Line-Workspaces/_Platform/demos/02-fence-frames-homepage-live.html) | Live homepage prototype with graduated cards. |

---

## 📐 Cluster 3: Parametric CAD Configurator & Blueprint Engine

| Resource Type | Resource Name / Location | Description & Key Rules |
| :--- | :--- | :--- |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/01-designer-spec.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/01-designer-spec.md) | Step 2 CAD Configurator UI, elevation stage, rail choices. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/02-blueprint-mode-spec.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/02-blueprint-mode-spec.md) | Step 3 Portrait/Landscape ARC Blueprint view with BOM ledger. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/13-product-and-configurator.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/13-product-and-configurator.md) | Style catalog, dimensions, wood grades (`tight-knot`, `clear-cedar`, `pressure-treated`). |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/14-art-and-svg-pipeline.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/14-art-and-svg-pipeline.md) | Parametric SVG assembly pipeline, coordinates, layer ordering. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/17-design-system-and-components.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/17-design-system-and-components.md) | Graduated cards, 50% corner marks, docked explainer plates. |
| **Engineering Spec**| [`Fence-Frames-Public-Website/docs/component-tracker.md`](file:///D:/Lew-Line-Workspaces/Fence-Frames-Public-Website/docs/component-tracker.md) | Physical and UI component encyclopedia. |
| **Next.js Page** | `app/designer/page.tsx` | Full React CAD Configurator route. |
| **Next.js Components**| `components/toolbar/elevation-stage.tsx`, `components/designer/left-option-rail.tsx` | Elevation visualizer with live wood grade switcher. |
| **Interactive Demo** | [`_Platform/demos/03-heritage-v1-full-configurator.html`](file:///D:/Lew-Line-Workspaces/_Platform/demos/03-heritage-v1-full-configurator.html) | Standalone interactive CAD configurator prototype. |
| **Interactive Demo** | [`_Platform/demos/04-heritage-portrait-arc-blueprint.html`](file:///D:/Lew-Line-Workspaces/_Platform/demos/04-heritage-portrait-arc-blueprint.html) | ARC Portrait blueprint prototype with bill of materials. |

---

## 🤝 Cluster 4: Marketplace, Contractors & Monetization Mechanics

| Resource Type | Resource Name / Location | Description & Key Rules |
| :--- | :--- | :--- |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/05-contractors-hub-spec.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/05-contractors-hub-spec.md) | Contractor onboarding portal & territory claiming. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/05-marketplace-mechanics.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/05-marketplace-mechanics.md) | Matched lead distribution, quote generation, SMS dispatch scramble. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/06-lead-pricing-and-quote-math.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/06-lead-pricing-and-quote-math.md) | Lead fee tiers, commission structure, unit economics. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/08-contractors-and-verification.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/08-contractors-and-verification.md) | Contractor license verification, WA L&I checks, insurance gates. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/monetization_rules.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/monetization_rules.md) | Platform fee collection, Stripe split-payments, payout rules. |
| **Engineering Spec**| [`FenceBook/docs/plan-fulfillment.md`](file:///D:/Lew-Line-Workspaces/FenceBook/docs/plan-fulfillment.md) | Order fulfillment, blueprint delivery, and BOM workflow. |
| **Engineering Spec**| [`FenceBook/docs/contractor-outreach-tracker.md`](file:///D:/Lew-Line-Workspaces/FenceBook/docs/contractor-outreach-tracker.md) | Partner pipeline and CRM outreach list. |
| **Next.js Page** | `app/contractors/page.tsx` | Contractor registration and territory claiming portal. |
| **Interactive Demo** | [`_Platform/demos/07-style-match-wizard-demo.html`](file:///D:/Lew-Line-Workspaces/_Platform/demos/07-style-match-wizard-demo.html) | Style matcher & contractor pairing prototype. |

---

## ⚙️ Cluster 5: Platform Engineering, Data & Infrastructure

| Resource Type | Resource Name / Location | Description & Key Rules |
| :--- | :--- | :--- |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/01-documentation-and-canon.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/01-documentation-and-canon.md) | Multi-repo documentation rules, sync locks, and change protocols. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/04-public-urls-and-hosting.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/04-public-urls-and-hosting.md) | Vercel edge deployment on `staging` and `main` branches. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/09-notifications-and-ops.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/09-notifications-and-ops.md) | SMS alerts (Telnyx), Resend email notifications, admin webhooks. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/16-roadmap-and-phases.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/16-roadmap-and-phases.md) | Soft-launch (Si View) -> Sammamish expansion -> WA statewide rollout. |
| **Handbook Entry** | [`Document-Hub-FB/02-Handbook/18-database-and-schema.md`](file:///D:/Lew-Line-Workspaces/FenceBook/Document-Hub-FB/02-Handbook/18-database-and-schema.md) | Supabase PostgreSQL schema, Airtable CMS syncing, RLS security policies. |
| **Platform Vault** | [`_Platform/README.md`](file:///D:/Lew-Line-Workspaces/_Platform/README.md) | Master scripts library, interactive tools, and demos. |
| **Automation Tool** | [`_Platform/scripts/sync/sync-docs-to-obsidian.ps1`](file:///D:/Lew-Line-Workspaces/_Platform/scripts/sync/sync-docs-to-obsidian.ps1) | Automated `Repo -> Obsidian` single-source-of-truth mirror script. |
| **Tana API Bridge** | [`_Platform/mcp-tana-bridge/server.mjs`](file:///D:/Lew-Line-Workspaces/_Platform/mcp-tana-bridge/server.mjs) | Port `8085` MCP and Tana Shippable REST server. |
