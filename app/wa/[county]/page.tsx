'use client'

import React, { useMemo, useState, use } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'
import {
  GeoAdvisorySection,
  GeoBreadcrumbs,
  GeoContextCard,
  GeoCrumbLink,
  GeoDirectoryCard,
  GeoDirectoryColumn,
  GeoContextColumn,
  GeoFactRow,
  GeoHubColumns,
  GeoTitleBar,
  geoCtaStyle,
  rowdies,
  GEO,
} from '@/components/ff/geo-hub'

interface City {
  slug: string
  name: string
  zip: string
  hoasCount: number
  windRating: string
  isFlagship?: boolean
  description: string
}

const KING_COUNTY_CITIES: City[] = [
  { slug: 'north-bend', name: 'North Bend', zip: '98045', hoasCount: 14, windRating: '80mph Mt. Si Corridor', isFlagship: true, description: 'Flagship pilot city featuring Si View, Riverbend, and Forster Woods HOA pre-approved designs.' },
  { slug: 'snoqualmie', name: 'Snoqualmie', zip: '98065', hoasCount: 18, windRating: '75mph Ridge Exposure', description: 'Extensive Snoqualmie Ridge ARC guidelines with strict natural cedar staining standards.' },
  { slug: 'issaquah', name: 'Issaquah', zip: '98027', hoasCount: 16, windRating: '65mph Squak/Tiger Mountain', description: 'Issaquah Highlands and Talus mountain architectural compliance codes.' },
  { slug: 'maple-valley', name: 'Maple Valley', zip: '98038', hoasCount: 12, windRating: '60mph Sound Inland', description: 'Cedar River greenbelt buffer guidelines and rural residential lot perimeter rules.' },
  { slug: 'renton', name: 'Renton', zip: '98058', hoasCount: 9, windRating: '55mph Standard Metro', description: 'Highlands residential zoning height rules and good neighbor 50/50 fence laws.' },
  { slug: 'bellevue', name: 'Bellevue', zip: '98004', hoasCount: 11, windRating: '55mph Lake Washington', description: 'Estate boundary picture frame fencing and Lake Washington setback rules.' },
]

export default function CountyHubPage({ params }: { params: Promise<{ county: string }> }) {
  const resolvedParams = use(params)
  const countySlug = resolvedParams.county || 'king-county'
  const countyLabel = countySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const [search, setSearch] = useState('')

  const directoryItems = useMemo(() => {
    const filtered = KING_COUNTY_CITIES.filter(
      (city) =>
        city.name.toLowerCase().includes(search.toLowerCase()) ||
        city.zip.includes(search) ||
        city.description.toLowerCase().includes(search.toLowerCase())
    )

    return filtered.map((city) => ({
      key: city.slug,
      title: `${city.name}, WA`,
      subtitle: city.description,
      meta: `${city.hoasCount} HOAs · ZIP ${city.zip}`,
      badge: city.isFlagship ? 'Flagship Pilot' : `Wind ${city.windRating.split(' ')[0]}`,
      badgeVariant: city.isFlagship ? ('flagship' as const) : ('neutral' as const),
      href: `/wa/${countySlug}/${city.slug}`,
      isFlagship: city.isFlagship,
    }))
  }, [countySlug, search])

  const totalHoas = KING_COUNTY_CITIES.reduce((sum, c) => sum + c.hoasCount, 0)

  return (
    <SiteShell width="hub">
      <GeoBreadcrumbs>
        <GeoCrumbLink href="/">Home</GeoCrumbLink>
        <span>/</span>
        <GeoCrumbLink href="/wa">Washington</GeoCrumbLink>
        <span>/</span>
        <span className="text-[#E5B842]">{countyLabel}</span>
      </GeoBreadcrumbs>

      <GeoTitleBar
        title={`${countyLabel} — Fence Codes & Municipalities`}
        subtitle="Select a city hub to view local permit limits, wind requirements, and HOA community directories."
      />

      <GeoHubColumns>
        <GeoDirectoryColumn>
          <GeoDirectoryCard
            title={`Cities in ${countyLabel}`}
            countLabel={`${directoryItems.length} of ${KING_COUNTY_CITIES.length} shown`}
            searchPlaceholder="Search cities or ZIP codes..."
            searchValue={search}
            onSearchChange={setSearch}
            items={directoryItems}
            surface="tanBlackGrid"
            titleTone="ember"
          />
        </GeoDirectoryColumn>

        <GeoContextColumn>
          <GeoContextCard title={`${countyLabel} Location Overview`} surface="woodPlanks" titleTone="ink">
            <p style={{ ...rowdies(300), fontSize: '0.88rem', color: '#444', margin: '0 0 1rem', lineHeight: 1.5 }}>
              King County Title 21A governs rear-yard height limits, front setback caps, and property-line footing
              placement before you layer HOA ARC standards on top.
            </p>

            <GeoFactRow label="Indexed cities" value={String(KING_COUNTY_CITIES.length)} />
            <GeoFactRow label="HOA communities tracked" value={String(totalHoas)} />
            <GeoFactRow label="Flagship city pilot" value="North Bend (98045)" />
            <GeoFactRow label="Dominant wind corridor" value="Mt. Si · 80 MPH Exposure B" />

            <div
              className="rounded-lg ff-card-inner-sm mt-4"
              style={{ background: '#EFE8D8', border: `2px solid ${GEO.goldSun}` }}
            >
              <p style={{ ...rowdies(400), fontSize: '0.78rem', color: GEO.ink, margin: '0 0 0.5rem', lineHeight: 1.45 }}>
                <strong style={{ color: GEO.goldSun }}>Need municipal-only guidance?</strong> Start a build without an
                HOA preset if your community is not yet indexed.
              </p>
              <Link href="/designer?county=king-county" style={geoCtaStyle('gold')}>
                County Municipal Build →
              </Link>
            </div>
          </GeoContextCard>

          <GeoAdvisorySection
            subtitle="King County · Title 21A Summary"
            title="Residential Fence Code Highlights"
            surface="hatchForest"
          >
            <div className="grid grid-cols-1 gap-3 text-xs text-[#333]" style={rowdies(300)}>
              <div className="p-3 rounded border-2 border-[#1A1A1A]" style={{ background: GEO.creamLight }}>
                <strong className="text-[#1A1A1A] block mb-1">Backyard Height (6ft Max):</strong>
                Per Title 21A.14.210, fences in rear and side interior setbacks may not exceed 6ft in height without an
                architectural variance permit.
              </div>
              <div className="p-3 rounded border-2 border-[#1A1A1A]" style={{ background: GEO.creamLight }}>
                <strong className="text-[#1A1A1A] block mb-1">Front Yard Setback (4ft Max):</strong>
                Fences in front yard street setbacks must not exceed 42&quot;–48&quot; in height to preserve driver
                sightline triangles at driveway intersections.
              </div>
              <div className="p-3 rounded border-2 border-[#1A1A1A]" style={{ background: GEO.creamLight }}>
                <strong className="text-[#1A1A1A] block mb-1">Clearance Over Property Line:</strong>
                Posts and footing concrete must be contained entirely within the surveyed property parcel unless a
                recorded Good Neighbor Agreement exists.
              </div>
            </div>
          </GeoAdvisorySection>
        </GeoContextColumn>
      </GeoHubColumns>
    </SiteShell>
  )
}
