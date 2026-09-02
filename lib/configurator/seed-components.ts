/**
 * Flatten CHAPTER_DEFS into rows shaped for public.components seeding.
 * Run later with service-role after owner approves Supabase migration.
 * Does not write to the database by itself.
 */

import { CHAPTER_DEFS } from '@/lib/configurator/options-catalog'

export interface ComponentSeedRow {
  part_key: string
  chapter: string
  label: string
  description?: string
  heritage_id?: string
  svg_path?: string
  color_preview?: string
  cost_label?: string
  config_patch: Record<string, unknown>
  sort_order: number
  source: 'seed'
}

export function buildComponentSeedRows(): ComponentSeedRow[] {
  const rows: ComponentSeedRow[] = []
  let sort = 0

  for (const chapter of CHAPTER_DEFS) {
    for (const group of chapter.groups) {
      for (const option of group.options) {
        rows.push({
          part_key: option.id,
          chapter: chapter.id,
          label: option.label,
          description: option.description,
          heritage_id: option.heritageId,
          svg_path: option.thumbSrc,
          color_preview: option.colorPreview,
          cost_label: option.costLabel,
          config_patch: option.patch as Record<string, unknown>,
          sort_order: sort++,
          source: 'seed',
        })
      }
    }
  }

  return rows
}

/** Dev helper — node -e / future CLI */
export function printSeedSummary() {
  const rows = buildComponentSeedRows()
  const byChapter = rows.reduce<Record<string, number>>((acc, row) => {
    acc[row.chapter] = (acc[row.chapter] || 0) + 1
    return acc
  }, {})
  return { total: rows.length, byChapter, withSvg: rows.filter((r) => r.svg_path).length }
}
