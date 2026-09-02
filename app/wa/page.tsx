'use client'

import React, { useMemo, useState } from 'react'
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

interface County {
  slug: string
  name: string
  region: string
  activeCities: number
  activeHoas: number
  windExposure: string
  isFlagship?: boolean
}

const WA_COUNTIES: County[] = [
  { slug: 'king-county', name: 'King County', region: 'Puget Sound / Eastside', activeCities: 14, activeHoas: 84, windExposure: 'Exposure B & C (Mt. Si Corridor)', isFlagship: true },
  { slug: 'pierce-county', name: 'Pierce County', region: 'South Sound', activeCities: 8, activeHoas: 32, windExposure: 'Exposure B (Tacoma / Puyallup Valley)' },
  { slug: 'snohomish-county', name: 'Snohomish County', region: 'North Sound', activeCities: 7, activeHoas: 29, windExposure: 'Exposure B (Everett / Snohomish Basin)' },
  { slug: 'kitsap-county', name: 'Kitsap County', region: 'Peninsula', activeCities: 4, activeHoas: 16, windExposure: 'Marine High-Moisture (Sound Corridor)' },
  { slug: 'thurston-county', name: 'Thurston County', region: 'South Sound / Olympia', activeCities: 3, activeHoas: 12, windExposure: 'Standard Inland Exposure B' },
  { slug: 'whatcom-county', name: 'Whatcom County', region: 'North Border', activeCities: 4, activeHoas: 15, windExposure: 'Bellingham Marine Wind Corridor' },
  { slug: 'skagit-county', name: 'Skagit County', region: 'North Sound Valley', activeCities: 3, activeHoas: 8, windExposure: 'Agricultural High-Wind Plain' },
  { slug: 'clark-county', name: 'Clark County', region: 'SW Washington / Portland Metro', activeCities: 4, activeHoas: 22, windExposure: 'Columbia River Gorge Wind Buffer' },
]

export default function WashingtonDirectoryPage() {
  const [search, setSearch] = useState('')

  const directoryItems = useMemo(() => {
    const filtered = WA_COUNTIES.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.region.toLowerCase().includes(search.toLowerCase())
    )

    return filtered.map((county) => ({
      key: county.slug,
      title: county.name,
      subtitle: county.windExposure,
      meta: `${county.activeCities} cities · ${county.activeHoas} HOAs`,
      badge: county.isFlagship ? 'Flagship Pilot' : county.region,
      badgeVariant: county.isFlagship ? ('flagship' as const) : ('neutral' as const),
      href: `/wa/${county.slug}`,
      isFlagship: county.isFlagship,
    }))
  }, [search])

  const totalCities = WA_COUNTIES.reduce((sum, c) => sum + c.activeCities, 0)
  const totalHoas = WA_COUNTIES.reduce((sum, c) => sum + c.activeHoas, 0)

  return (
    <SiteShell width="hub">
      <GeoBreadcrumbs>
        <GeoCrumbLink href="/">Home</GeoCrumbLink>
        <span>/</span>
        <span className="text-[#E5B842]">Washington State</span>
      </GeoBreadcrumbs>

      <GeoTitleBar
        title="Washington State — Fence Codes &amp; HOA Directory"
        subtitle="Pick a county hub to view municipal fence limits, wind corridors, and pre-approved HOA communities."
      />

      <GeoHubColumns>
        <GeoDirectoryColumn>
          <GeoDirectoryCard
            title="Washington Counties"
            countLabel={`${directoryItems.length} of ${WA_COUNTIES.length} shown`}
            searchPlaceholder="Search counties or regions..."
            searchValue={search}
            onSearchChange={setSearch}
            items={directoryItems}
            surface="doublePlank"
            titleTone="forest"
          />
        </GeoDirectoryColumn>

        <GeoContextColumn>
          <GeoContextCard title="Washington Location Overview" surface="woodPlanks" titleTone="ink">
            <p style={{ ...rowdies(300), fontSize: '0.88rem', color: '#444', margin: '0 0 1rem', lineHeight: 1.5 }}>
              Fence Frames indexes building codes, frost depth guidelines, municipal setback exemptions, and HOA bylaws
              across Washington&apos;s active pilot counties.
            </p>

            <GeoFactRow label="Pilot counties live" value={`${WA_COUNTIES.length} indexed`} />
            <GeoFactRow label="Active cities tracked" value={String(totalCities)} />
            <GeoFactRow label="HOA communities cataloged" value={String(totalHoas)} />
            <GeoFactRow label="Flagship pilot corridor" value="King County · North Bend" />

            <div
              className="rounded-lg ff-card-inner-sm mt-4"
              style={{ background: GEO.cream, border: `2px solid ${GEO.goldSun}` }}
            >
              <p style={{ ...rowdies(400), fontSize: '0.78rem', color: GEO.ink, margin: '0 0 0.35rem' }}>
                Statewide permit baseline
              </p>
              <p style={{ ...rowdies(300), fontSize: '0.75rem', color: '#555', margin: 0, lineHeight: 1.45 }}>
                Most WA jurisdictions exempt rear/side fences up to 6′ and front-yard fences up to 4′ unless you are in a
                critical shoreline or wetland buffer.
              </p>
            </div>
          </GeoContextCard>

          <GeoAdvisorySection
            title="Washington State Residential Fencing Structural Rules"
            surface="microQuad"
          >
            <div className="grid grid-cols-1 gap-3 text-xs text-[#333]" style={rowdies(300)}>
              <div className="p-3 rounded border-2 border-[#1A1A1A]" style={{ background: GEO.creamLight }}>
                <strong className="text-[#1A1A1A] block mb-1">Permit Exemption Rule:</strong>
                Fences up to 6ft in rear/side yards and 4ft in front yard setbacks are universally permit-exempt across
                most WA municipal jurisdictions unless located in a critical shoreline or wetland buffer.
              </div>
              <div className="p-3 rounded border-2 border-[#1A1A1A]" style={{ background: GEO.creamLight }}>
                <strong className="text-[#1A1A1A] block mb-1">Frost Depth &amp; Post Embedment:</strong>
                Standard Western Washington frost line requires 24&quot; minimum post depth with 50lb quick-set concrete
                collars. Mountain foothills (North Bend, Gold Bar) require 30&quot;–36&quot; depth.
              </div>
              <div className="p-3 rounded border-2 border-[#1A1A1A]" style={{ background: GEO.creamLight }}>
                <strong className="text-[#1A1A1A] block mb-1">Rot-Barrier Law (WAC Code):</strong>
                Un-treated Western Red Cedar pickets must maintain a 2&quot; clearance above finish soil grade or rest
                upon a ground-contact pressure-treated bottom kickboard.
              </div>
            </div>
            <div className="mt-4">
              <Link href="/wa/king-county" style={geoCtaStyle('gold')}>
                Open King County Hub →
              </Link>
            </div>
          </GeoAdvisorySection>
        </GeoContextColumn>
      </GeoHubColumns>
    </SiteShell>
  )
}
