# Supabase (scaffolds)

Migrations here are **owner-approved apply only** — not auto-run from the Next app.

| Migration | Purpose |
|---|---|
| `migrations/20260902_configurator_options.sql` | `components` + `labor_rates` tables for the designer options catalog |

Until applied + seeded, the designer reads `lib/configurator/options-catalog.ts` in-process.
