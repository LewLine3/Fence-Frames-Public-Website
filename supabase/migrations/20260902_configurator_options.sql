-- Fence Frames — Configurator options catalog (Supabase scaffold)
-- Ready for owner sign-off before apply. Does NOT auto-run.
-- Maps Heritage VPF option IDs + Next designer patches for migration
-- from hardcoded React catalog (lib/configurator/options-catalog.ts)
-- and eventual Airtable Build Slots sync.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- components: part keys, unit costs, SVG paths (Rule 04)
-- ---------------------------------------------------------------------------
create table if not exists public.components (
  id uuid primary key default gen_random_uuid(),
  part_key text not null unique,
  chapter text not null check (chapter in (
    'height', 'posts', 'rails', 'pickets', 'stain', 'trim', 'gates', 'hardware'
  )),
  label text not null,
  description text,
  heritage_id text,
  svg_path text,
  color_preview text,
  cost_label text,
  unit_material_cost numeric(10, 2),
  unit_labor_cost numeric(10, 2),
  cost_per_lf numeric(10, 2),
  config_patch jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  enabled boolean not null default true,
  source text not null default 'seed' check (source in ('seed', 'airtable', 'manual')),
  airtable_record_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists components_chapter_idx on public.components (chapter, sort_order);
create index if not exists components_heritage_idx on public.components (heritage_id);

-- ---------------------------------------------------------------------------
-- labor_rates: discrete labor schedule
-- ---------------------------------------------------------------------------
create table if not exists public.labor_rates (
  id uuid primary key default gen_random_uuid(),
  rate_key text not null unique,
  label text not null,
  unit text not null check (unit in ('per_post', 'per_lf', 'per_gate', 'flat')),
  amount_min numeric(10, 2) not null,
  amount_max numeric(10, 2) not null,
  notes text,
  enabled boolean not null default true,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Seed note: populate from lib/configurator/options-catalog.ts via
-- scripts/seed-configurator-options.ts (to be added after owner approves).
-- Until then the Next designer reads the TypeScript catalog in-process.
-- ---------------------------------------------------------------------------

comment on table public.components is
  'Configurator option catalog. Next.js currently seeds from TS; this table is the live target.';

comment on column public.components.config_patch is
  'Partial FenceConfiguration JSON applied when the option is selected.';

comment on column public.components.svg_path is
  'Public path under /configure/heritage-v1/components/...';
