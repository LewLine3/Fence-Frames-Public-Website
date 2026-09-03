# Configurator catalog (Next.js)

Single source of truth for designer option menus.

| File | Role |
|---|---|
| `options-catalog.ts` | Chapter defs, option IDs, Heritage aliases, SVG thumb paths, `FenceConfiguration` patches |
| `seed-components.ts` | Flattens the catalog into rows shaped for `public.components` (Supabase) |

UI consumers:
- `components/designer/chapter-config-panel.tsx` (left-rail detail)
- `components/designer/module-dock.tsx` (docked calculator / templates / AI modules)
- `components/designer/left-option-rail.tsx` (chapter list)

Live art stays under `/configure/heritage-v1/components/`. Supabase migration scaffold: `supabase/migrations/20260902_configurator_options.sql`.
