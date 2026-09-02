import type { FenceConfiguration } from '@/lib/pricing-engine'

export type ArcStatus = 'pre-approved' | 'in-review' | 'action-required'

export interface SavedFolio {
  id: string
  name: string
  location: string
  community: string
  specs: string
  style: string
  height: number
  lf: number
  costMin: number
  costMax: number
  savedDate: string
  arcStatus: ArcStatus
  bidsCount: number
  thumbnail: string
  config?: FenceConfiguration
}

const STORAGE_KEY = 'ff-saved-folios'

export const SEED_FOLIOS: SavedFolio[] = [
  {
    id: 'FF-98045-8912',
    name: 'Backyard Perimeter — Si View Heritage 3-Rail',
    location: '1420 Mt Si Blvd, North Bend, WA 98045',
    community: 'Si View HOA · Lot #42',
    specs: '120 LF · 6ft Height · Clear Cedar Pickets · Factory Cedar Natural Pre-Stain',
    style: 'Heritage 3-Rail Board-on-Board',
    height: 6,
    lf: 120,
    costMin: 5940,
    costMax: 6825,
    savedDate: 'Aug 22, 2026',
    arcStatus: 'pre-approved',
    bidsCount: 0,
    thumbnail: '/images/catalog-vpf-natural.svg',
  },
  {
    id: 'FF-98045-3142',
    name: 'Side Lot & Garden Gate — Modern Horizontal Slat',
    location: '1420 Mt Si Blvd, North Bend, WA 98045',
    community: 'Si View HOA · Lot #42',
    specs: '45 LF · 4ft Height · 1x6 Horizontal Siding · 1x 4ft Walk Gate',
    style: 'Modern Horizontal Slat',
    height: 4,
    lf: 45,
    costMin: 2250,
    costMax: 2700,
    savedDate: 'Aug 19, 2026',
    arcStatus: 'pre-approved',
    bidsCount: 0,
    thumbnail: '/images/hero-carousel/horizontal-01.png',
  },
]

function readStoredFolios(): SavedFolio[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SavedFolio[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeStoredFolios(folios: SavedFolio[]) {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(folios))
  } catch {
    /* ignore quota errors in demo */
  }
}

/** Merge session saves on top of seed catalog (session wins on id collision). */
export function getSavedFolios(): SavedFolio[] {
  const stored = readStoredFolios()
  const byId = new Map<string, SavedFolio>()
  for (const folio of SEED_FOLIOS) byId.set(folio.id, folio)
  for (const folio of stored) byId.set(folio.id, folio)
  return Array.from(byId.values()).sort((a, b) => (a.savedDate < b.savedDate ? 1 : -1))
}

export function getFolioById(id: string): SavedFolio | undefined {
  return getSavedFolios().find((f) => f.id === id)
}

export function upsertFolio(folio: SavedFolio) {
  const stored = readStoredFolios()
  const seedIds = new Set(SEED_FOLIOS.map((f) => f.id))
  const custom = stored.filter((f) => !seedIds.has(f.id))
  const idx = custom.findIndex((f) => f.id === folio.id)
  if (idx >= 0) custom[idx] = folio
  else custom.unshift(folio)
  writeStoredFolios(custom)
}

function newFolioId(): string {
  const suffix = Math.floor(1000 + Math.random() * 9000)
  return `FF-98045-${suffix}`
}

function formatSavedDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function createFolioFromConfig(config: FenceConfiguration, label?: string): SavedFolio {
  const lf = config.linearFeet ?? 8
  const height = config.heightFt ?? 6
  const mid = Math.round(lf * 48)
  const folio: SavedFolio = {
    id: newFolioId(),
    name: label ?? `Custom Build — ${height}ft ${config.fenceStyleCategory ?? 'Heritage'} Fence`,
    location: '1420 Mt Si Blvd, North Bend, WA 98045',
    community: 'Si View HOA · Lot #42',
    specs: `${lf} LF · ${height}ft Height · ${config.woodGrade ?? 'cedar'} · ${config.stainType ?? 'natural finish'}`,
    style: config.fenceStyle ?? 'heritage',
    height,
    lf,
    costMin: Math.round(mid * 0.85),
    costMax: Math.round(mid * 1.15),
    savedDate: formatSavedDate(new Date()),
    arcStatus: 'pre-approved',
    bidsCount: 0,
    thumbnail: '/images/catalog-vpf-natural.svg',
    config,
  }
  upsertFolio(folio)
  return folio
}

export function folioHref(id: string): string {
  return `/homeowner/folio/${encodeURIComponent(id)}`
}
