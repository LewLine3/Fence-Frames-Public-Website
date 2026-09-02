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
  GeoRuleGrid,
  GeoTitleBar,
  geoCtaStyle,
  rowdies,
  GEO,
} from '@/components/ff/geo-hub'

interface HoaCommunity {
  slug: string
  name: string
  status: 'live' | 'stub' | 'soon'
  statusLabel: string
  summary: string
  href: string | null
}

const NORTH_BEND_HOAS: HoaCommunity[] = [
  {
    slug: 'si-view',
    name: 'Si View Community HOA',
    status: 'live',
    statusLabel: 'ARC Certified',
    summary: '4 pre-approved ARC designs with zero-rejection submittal guarantee.',
    href: '/wa/king-county/north-bend/si-view',
  },
  {
    slug: 'forster-woods',
    name: 'Forster Woods HOA',
    status: 'stub',
    statusLabel: 'Guide Stub',
    summary: 'Good-neighbor alternating pickets on dividing lot lines.',
    href: '/wa/king-county/north-bend/si-view',
  },
  {
    slug: 'riverbend',
    name: 'Riverbend Community',
    status: 'stub',
    statusLabel: 'Guide Stub',
    summary: 'Natural stain requirements with semi-transparent cedar sealer.',
    href: '/wa/king-county/north-bend/si-view',
  },
  {
    slug: 'wilderness-rim',
    name: 'Wilderness Rim',
    status: 'soon',
    statusLabel: 'Coming Soon',
    summary: 'Mountain boundary lot guidelines and heavy snow load post spacing.',
    href: null,
  },
  {
    slug: 'cedar-landing',
    name: 'Cedar Landing',
    status: 'soon',
    statusLabel: 'Coming Soon',
    summary: 'Modern master-planned neighborhood perimeter staining rules.',
    href: null,
  },
  {
    slug: 'timberstone',
    name: 'Timberstone',
    status: 'soon',
    statusLabel: 'Coming Soon',
    summary: 'Modern horizontal and clear cedar privacy fence standards.',
    href: null,
  },
]

const STATUS_VARIANT = {
  live: 'live' as const,
  stub: 'stub' as const,
  soon: 'soon' as const,
}

export default function CityHubPage({ params }: { params: Promise<{ county: string; city: string }> }) {
  const resolvedParams = use(params)
  const citySlug = resolvedParams.city || 'north-bend'
  const countySlug = resolvedParams.county || 'king-county'
  const cityName = citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const countyLabel = countySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  const [search, setSearch] = useState('')

  const directoryItems = useMemo(() => {
    const filtered = NORTH_BEND_HOAS.filter(
      (hoa) =>
        hoa.name.toLowerCase().includes(search.toLowerCase()) ||
        hoa.summary.toLowerCase().includes(search.toLowerCase()) ||
        hoa.statusLabel.toLowerCase().includes(search.toLowerCase())
    )

    return filtered.map((hoa) => ({
      key: hoa.slug,
      title: hoa.name,
      subtitle: hoa.summary,
      badge: hoa.statusLabel,
      badgeVariant: STATUS_VARIANT[hoa.status],
      href: hoa.href,
      isFlagship: hoa.status === 'live',
    }))
  }, [search])

  const liveCount = NORTH_BEND_HOAS.filter((h) => h.status === 'live').length

  return (
    <SiteShell width="hub">
      <GeoBreadcrumbs>
        <GeoCrumbLink href="/">Home</GeoCrumbLink>
        <span>/</span>
        <GeoCrumbLink href="/wa">Washington</GeoCrumbLink>
        <span>/</span>
        <GeoCrumbLink href={`/wa/${countySlug}`}>{countyLabel}</GeoCrumbLink>
        <span>/</span>
        <span className="text-[#E5B842]">
          {cityName} (98045)
        </span>
      </GeoBreadcrumbs>

      <GeoTitleBar
        title={`${cityName}, WA — Fence Regulations & Communities`}
        subtitle="Pick your HOA community for pre-approved standards, or start a municipal-only build below."
      />

      <GeoHubColumns>
        <GeoDirectoryColumn>
          <GeoDirectoryCard
            title={`HOA Communities in ${cityName}`}
            countLabel={`${liveCount} live · ${directoryItems.length} shown`}
            searchPlaceholder="Search HOA communities..."
            searchValue={search}
            onSearchChange={setSearch}
            items={directoryItems}
            surface="hatchCream"
            titleTone="forest"
          />
        </GeoDirectoryColumn>

        <GeoContextColumn>
          <GeoContextCard title={`${cityName} Location Overview`} surface="woodPlanks" titleTone="ink">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.72rem',
                  background: GEO.goldSun,
                  border: `1.5px solid ${GEO.ink}`,
                  color: GEO.ink,
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}
              >
                Flagship City Hub
              </span>
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.72rem',
                  background: GEO.forest,
                  border: `1.5px solid ${GEO.ink}`,
                  color: GEO.creamLight,
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                }}
              >
                King County · ZIP 98045
              </span>
            </div>

            <p style={{ ...rowdies(300), fontSize: '0.88rem', color: '#444', margin: '0 0 1rem', lineHeight: 1.5 }}>
              North Bend sits in the Mt. Si wind corridor. Municipal Title 18 rules apply city-wide; HOA ARC presets layer
              on top when your community is indexed.
            </p>

            <GeoFactRow label="HOA communities indexed" value={`${NORTH_BEND_HOAS.length} cataloged`} />
            <GeoFactRow label="Live ARC presets" value={`${liveCount} certified`} />
            <GeoFactRow label="Wind exposure" value="80 MPH · Exposure B" />
            <GeoFactRow label="Pilot flagship HOA" value="Si View Community" />

            <div
              className="rounded-lg ff-card-inner-sm mt-4"
              style={{ background: '#EFE8D8', border: `2px solid ${GEO.goldSun}` }}
            >
              <p style={{ ...rowdies(400), fontSize: '0.78rem', color: GEO.ink, margin: '0 0 0.5rem', lineHeight: 1.45 }}>
                <strong style={{ color: GEO.goldSun }}>HOA not listed?</strong> Start a build using North Bend municipal
                codes only — no community-specific ARC preset required.
              </p>
              <Link href="/designer?city=north-bend" style={geoCtaStyle('gold')}>
                Start Municipal Build →
              </Link>
            </div>
          </GeoContextCard>

          <GeoAdvisorySection
            subtitle={`City of ${cityName} · Municipal Code Title 18`}
            title="Residential Fence Bylaws & Setbacks"
            surface="majorForest"
          >
            <GeoRuleGrid
              rules={[
                { badge: 'Backyard Privacy', val: '6′ Max', desc: 'Permit-exempt for standard rear and side yards up to property line.' },
                { badge: 'Front Yard Setback', val: '4′ Max', desc: 'Fences within the 15-foot front setback capped at 48 inches.' },
                { badge: 'Corner Lot Visibility', val: '25′ Clear Zone', desc: 'Sight triangle at street intersections; max 36″ in clear zone.' },
                { badge: 'Underground Utilities', val: 'Call 811', desc: 'Washington 811 locate call required 48 business hours before excavation.' },
              ]}
            />

            <div
              className="rounded-lg ff-card-inner flex flex-col sm:flex-row items-start gap-3 mt-4"
              style={{
                background: GEO.creamLight,
                border: `2px solid ${GEO.ember}`,
              }}
            >
              <span className="text-2xl shrink-0">🌪️</span>
              <div>
                <h3 style={{ ...rowdies(700), fontSize: '0.95rem', color: GEO.ember, marginBottom: '0.15rem' }}>
                  Mt. Si Wind Corridor Structural Advisory (80 MPH Exposure B)
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#444', margin: 0, lineHeight: 1.45 }}>
                  City of North Bend engineering standards recommend 3-rail horizontal framing, 4×4 PT incised posts, and
                  30″–36″ concrete footing depth to prevent wind blow-over during Snoqualmie Pass east wind events.
                </p>
              </div>
            </div>
          </GeoAdvisorySection>
        </GeoContextColumn>
      </GeoHubColumns>
    </SiteShell>
  )
}
