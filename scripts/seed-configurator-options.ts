import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CHAPTERS } from '../lib/configurator/options-catalog.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from FenceBook/config/supabase.env
const envPath = path.resolve(__dirname, '../../FenceBook/config/supabase.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing SUPABASE_URL or server key in FenceBook/config/supabase.env');
  process.exit(1);
}

interface OptionRow {
  part_key: string;
  chapter: string;
  label: string;
  description: string | null;
  heritage_id: string | null;
  svg_path: string | null;
  color_preview: string | null;
  cost_label: string | null;
  config_patch: Record<string, any>;
  sort_order: number;
  enabled: boolean;
}

const optionRows: OptionRow[] = [];
let sortCounter = 0;

for (const ch of CHAPTERS) {
  for (const grp of ch.groups || []) {
    for (const opt of grp.options || []) {
      sortCounter += 10;
      optionRows.push({
        part_key: `${ch.id}__${opt.id}`,
        chapter: ch.id,
        label: opt.label,
        description: opt.description || null,
        heritage_id: opt.heritageId || null,
        svg_path: opt.thumbSrc || null,
        color_preview: opt.colorPreview || null,
        cost_label: opt.costLabel || null,
        config_patch: opt.patch || {},
        sort_order: sortCounter,
        enabled: true,
      });
    }
  }
}

console.log(`Found ${optionRows.length} configurator options across ${CHAPTERS.length} chapters.`);

async function upsertBatched(rows: OptionRow[], batchSize = 30) {
  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    const endpoint = `${url}/rest/v1/configurator_options?on_conflict=part_key`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: key!,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(chunk),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to upsert configurator_options (${res.status}): ${text}`);
    }

    const data = await res.json();
    console.log(`  ✓ upserted batch ${Math.floor(i / batchSize) + 1}: ${data.length} options`);
  }
}

upsertBatched(optionRows)
  .then(() => console.log('🎉 Successfully seeded configurator_options table in Supabase!'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
