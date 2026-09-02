'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

interface HoaSpec {
  label: string
  value: string
}

interface HoaCommunity {
  slug: string
  name: string
  status: 'live' | 'stub' | 'soon'
  statusLabel: string
  summary: string
  specs: HoaSpec[]
  href: string | null
}

const NORTH_BEND_HOAS: HoaCommunity[] = [
  {
    slug: 'si-view',
    name: 'Si View Community HOA',
    status: 'live',
    statusLabel: 'ARC Certified',
    summary: '4 pre-approved ARC designs (Designs 01–04) with zero-rejection submittal guarantee.',
    specs: [
      { label: 'Max Height', value: '6′ Solid Privacy' },
      { label: 'Material', value: 'Tight-Knot Western Red Cedar' },
      { label: 'Restriction', value: 'No gates on greenbelt perimeter runs' },
    ],
    href: '/wa/king-county/north-bend/si-view',
  },
  {
    slug: 'forster-woods',
    name: 'Forster Woods HOA',
    status: 'stub',
    statusLabel: 'Guide Stub',
    summary: 'Architectural review board checklist with good-neighbor alternating pickets on dividing lot lines.',
    specs: [
      { label: 'Max Height', value: '6′ Privacy' },
      { label: 'Style', value: 'Alternating shadowbox or picture frame' },
      { label: 'Hardware', value: 'Black powder-coated required' },
    ],
    href: '/wa/king-county/north-bend/si-view',
  },
  {
    slug: 'riverbend',
    name: 'Riverbend Community',
    status: 'stub',
    statusLabel: 'Guide Stub',
    summary: 'River valley natural stain requirements with semi-transparent cedar sealer mandates.',
    specs: [
      { label: 'Max Height', value: '6′ Standard' },
      { label: 'Finish', value: 'Natural wood tones only' },
      { label: 'Framing', value: '2×4 rails with Simpson brackets' },
    ],
    href: '/wa/king-county/north-bend/si-view',
  },
  {
    slug: 'wilderness-rim',
    name: 'Wilderness Rim',
    status: 'soon',
    statusLabel: 'Coming Soon',
    summary: 'Mountain boundary lot guidelines, wildlife corridors, and heavy snow load post spacing.',
    specs: [
      { label: 'Target Intake', value: 'Wave 2' },
      { label: 'Coverage', value: 'Intake in progress' },
    ],
    href: null,
  },
  {
    slug: 'cedar-landing',
    name: 'Cedar Landing',
    status: 'soon',
    statusLabel: 'Coming Soon',
    summary: 'Modern master-planned neighborhood standards with uniform perimeter staining rules.',
    specs: [
      { label: 'Target Intake', value: 'Wave 2' },
      { label: 'Coverage', value: 'Intake in progress' },
    ],
    href: null,
  },
  {
    slug: 'timberstone',
    name: 'Timberstone',
    status: 'soon',
    statusLabel: 'Coming Soon',
    summary: 'Architectural guidelines for modern horizontal and clear cedar privacy fences.',
    specs: [
      { label: 'Target Intake', value: 'Wave 2' },
      { label: 'Coverage', value: 'Intake in progress' },
    ],
    href: null,
  },
]

const STATUS_STYLE: Record<HoaCommunity['status'], { bg: string; color: string; border: string }> = {
  live: { bg: '#E6F4EA', color: '#137333', border: '#137333' },
  stub: { bg: '#FEF7E0', color: '#B06000', border: '#B06000' },
  soon: { bg: '#F1ECE1', color: '#777777', border: '#CCCCCC' },
}

const cardShell: React.CSSProperties = {
  background: '#FAF6EE',
  backgroundImage:
    'linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  border: '2.5px solid var(--ink)',
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
}

export default function CityHubPage({ params }: { params: Promise<{ county: string; city: string }> }) {
  const resolvedParams = use(params)
  const citySlug = resolvedParams.city || 'north-bend'
  const cityName = citySlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <SiteShell width="hub">
      {/* ── BREADCRUMBS ── */}
      <div className="text-xs text-[#16432D]/60 mb-4 flex items-center gap-2" style={{ ...rowdies(300) }}>
        <Link href="/" className="hover:text-[#E5B842] text-[#16432D]">
          Home
        </Link>
        <span>/</span>
        <Link href="/wa" className="hover:text-[#E5B842] text-[#16432D]">
          Washington
        </Link>
        <span>/</span>
        <Link href="/wa/king-county" className="hover:text-[#E5B842] text-[#16432D]">
          King County
        </Link>
        <span>/</span>
        <span className="text-[#E5B842]">
          {cityName} (98045)
        </span>
      </div>

      {/* ── TWO-COLUMN: CITY INTRO (LEFT) + HOA DIRECTORY (RIGHT) ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-10 items-start">
        {/* Left — city intro */}
        <div
          className="has-outside-corners rounded-lg relative overflow-hidden"
          style={{
            ...cardShell,
            backgroundImage:
              "url('/images/textures/trial-finger-joint.png'), linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)",
            backgroundSize: 'cover, 20px 20px, 20px 20px',
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.72rem',
                  background: 'rgba(229,184,66,0.18)',
                  border: '1.5px solid #E5B842',
                  color: '#B8860B',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}
              >
                🏛️ Flagship City Hub
              </span>
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.72rem',
                  background: 'rgba(74,222,128,0.12)',
                  border: '1.5px solid #4ADE80',
                  color: '#16432D',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                }}
              >
                King County · ZIP 98045
              </span>
            </div>

            <h1 style={{ ...rowdies(700), fontSize: '2rem', color: '#1A1A1A', lineHeight: 1.15, marginBottom: '0.5rem' }}>
              {cityName}, WA
              <span style={{ display: 'block', color: '#E5B842', fontSize: '1.35rem', marginTop: '0.15rem' }}>
                Fence Regulations &amp; Communities
              </span>
            </h1>

            <p style={{ ...rowdies(300), fontSize: '0.92rem', color: '#444', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
              Select your HOA community to view pre-approved standards and ARC submittal packets. Municipal building
              guidelines and wind corridor requirements are listed below.
            </p>

            <div
              className="rounded-lg p-4"
              style={{
                background: '#EFE8D8',
                border: '2px solid #E5B842',
              }}
            >
              <p style={{ ...rowdies(400), fontSize: '0.82rem', color: '#1A1A1A', margin: '0 0 0.65rem', lineHeight: 1.45 }}>
                <strong style={{ color: '#E5B842' }}>HOA not listed?</strong> Start a build using North Bend municipal
                codes only — no community-specific ARC preset required.
              </p>
              <Link
                href="/designer?city=north-bend"
                style={{
                  ...rowdies(700),
                  fontSize: '0.82rem',
                  backgroundColor: '#E5B842',
                  color: '#141B16',
                  padding: '0.6rem 1rem',
                  borderRadius: 4,
                  textDecoration: 'none',
                  border: '2px solid #141B16',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                }}
              >
                Start Municipal Build →
              </Link>
            </div>
          </div>
        </div>

        {/* Right — single HOA directory card */}
        <div className="has-outside-corners rounded-lg relative overflow-hidden" style={cardShell}>
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div
            style={{
              background: 'var(--ink)',
              borderBottom: '2px solid var(--ink)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <h2 style={{ ...rowdies(700), fontSize: '1rem', color: '#E5B842', margin: 0 }}>
              HOA Communities in {cityName}
            </h2>
            <span style={{ ...rowdies(400), fontSize: '0.72rem', color: '#4ADE80' }}>
              {NORTH_BEND_HOAS.filter((h) => h.status === 'live').length} live · {NORTH_BEND_HOAS.length} total
            </span>
          </div>

          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {NORTH_BEND_HOAS.map((hoa, index) => {
              const statusStyle = STATUS_STYLE[hoa.status]
              const isLast = index === NORTH_BEND_HOAS.length - 1

              return (
                <li
                  key={hoa.slug}
                  style={{
                    padding: '1rem 1.1rem',
                    borderBottom: isLast ? 'none' : '1px solid rgba(22,67,45,0.12)',
                    background: hoa.status === 'live' ? 'rgba(74,222,128,0.04)' : '#FFFFFF',
                  }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1.5">
                    <h3 style={{ ...rowdies(700), fontSize: '1rem', color: '#1A1A1A', margin: 0 }}>{hoa.name}</h3>
                    <span
                      style={{
                        ...rowdies(700),
                        fontSize: '0.65rem',
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.border}`,
                        padding: '0.15rem 0.5rem',
                        borderRadius: 3,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {hoa.statusLabel}
                    </span>
                  </div>

                  <p style={{ ...rowdies(300), fontSize: '0.78rem', color: '#555', margin: '0 0 0.5rem', lineHeight: 1.4 }}>
                    {hoa.summary}
                  </p>

                  <ul style={{ listStyle: 'none', margin: '0 0 0.65rem', padding: 0 }}>
                    {hoa.specs.map((spec) => (
                      <li
                        key={spec.label}
                        className="flex justify-between gap-3"
                        style={{
                          ...rowdies(300),
                          fontSize: '0.75rem',
                          color: '#666',
                          padding: '0.2rem 0',
                          borderBottom: '1px dotted #e6ddcf',
                        }}
                      >
                        <span>{spec.label}</span>
                        <strong style={{ color: '#1A1A1A', textAlign: 'right' }}>{spec.value}</strong>
                      </li>
                    ))}
                  </ul>

                  {hoa.href ? (
                    <Link
                      href={hoa.href}
                      style={{
                        ...rowdies(700),
                        fontSize: '0.78rem',
                        backgroundColor: hoa.status === 'live' ? '#4ADE80' : '#E5B842',
                        color: '#141B16',
                        padding: '0.45rem 0.75rem',
                        borderRadius: 4,
                        textDecoration: 'none',
                        border: '2px solid #141B16',
                        display: 'inline-block',
                      }}
                    >
                      View {hoa.name.split(' ')[0]} Standards →
                    </Link>
                  ) : (
                    <span
                      style={{
                        ...rowdies(400),
                        fontSize: '0.75rem',
                        color: '#888',
                        background: '#EFE8D8',
                        border: '1px solid #CCC',
                        padding: '0.4rem 0.75rem',
                        borderRadius: 4,
                        display: 'inline-block',
                      }}
                    >
                      Guide in intake
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ── BOTTOM: MUNICIPAL REGULATIONS + WIND ADVISORY ── */}
      <section
        className="has-outside-corners p-6 sm:p-8 rounded-lg mb-4"
        style={{
          ...cardShell,
          border: '2px solid #4ADE80',
        }}
      >
        <span className="corner-mark-out tl c-forest" />
        <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

        <div className="mb-5">
          <span style={{ ...rowdies(700), fontSize: '0.75rem', color: '#E5B842', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            City of {cityName} · Municipal Code Title 18
          </span>
          <h2 style={{ ...rowdies(700), fontSize: '1.35rem', color: '#16432D', margin: '0.15rem 0 0' }}>
            Residential Fence Bylaws &amp; Setbacks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { badge: 'Backyard Privacy', val: '6′ Max', desc: 'Permit-exempt for standard rear and side yards up to property line.' },
            { badge: 'Front Yard Setback', val: '4′ Max', desc: 'Fences within the 15-foot front setback capped at 48 inches.' },
            { badge: 'Corner Lot Visibility', val: '25′ Clear Zone', desc: 'Sight triangle at street intersections; max 36″ in clear zone.' },
            { badge: 'Underground Utilities', val: 'Call 811', desc: 'Washington 811 locate call required 48 business hours before excavation.' },
          ].map((rule) => (
            <div
              key={rule.badge}
              className="rounded p-4"
              style={{ background: '#FFFFFF', border: '2px solid var(--ink)', boxShadow: '2px 2px 0 var(--ink)' }}
            >
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.65rem',
                  color: '#16432D',
                  background: 'rgba(74,222,128,0.12)',
                  border: '1px solid rgba(22,67,45,0.25)',
                  padding: '0.1rem 0.45rem',
                  borderRadius: 3,
                  display: 'inline-block',
                  marginBottom: '0.35rem',
                }}
              >
                {rule.badge}
              </span>
              <div style={{ ...rowdies(700), fontSize: '1.2rem', color: '#1A1A1A', marginBottom: '0.2rem' }}>{rule.val}</div>
              <p style={{ ...rowdies(300), fontSize: '0.78rem', color: '#555', margin: 0, lineHeight: 1.4 }}>{rule.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="has-outside-corners rounded-lg p-4 flex flex-col sm:flex-row items-start gap-3"
          style={{
            background: '#FAF6EE',
            border: '2px solid #F27A22',
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />
          <span className="text-2xl shrink-0">🌪️</span>
          <div>
            <h3 style={{ ...rowdies(700), fontSize: '0.95rem', color: '#F27A22', marginBottom: '0.15rem' }}>
              Mt. Si Wind Corridor Structural Advisory (80 MPH Exposure B)
            </h3>
            <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#444', margin: 0, lineHeight: 1.45 }}>
              City of North Bend engineering standards recommend 3-rail horizontal framing, 4×4 PT incised posts, and
              30″–36″ concrete footing depth to prevent wind blow-over during Snoqualmie Pass east wind events.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
