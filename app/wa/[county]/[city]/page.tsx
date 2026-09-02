'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function CityHubPage({ params }: { params: Promise<{ county: string; city: string }> }) {
  const resolvedParams = use(params)
  const citySlug = resolvedParams.city || 'north-bend'
  const isNorthBend = citySlug === 'north-bend'

  return (
    <SiteShell width="hub">
{/* ── BREADCRUMBS ── */}
        <div className="text-xs text-[#16432D]/60 mb-4 flex items-center gap-2" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-[#16432D]">Home</Link>
          <span>/</span>
          <Link href="/wa" className="hover:text-[#E5B842] text-[#16432D]">Washington</Link>
          <span>/</span>
          <Link href="/wa/king-county" className="hover:text-[#E5B842] text-[#16432D]">King County</Link>
          <span>/</span>
          <span className="text-[#E5B842] capitalize">{citySlug.replace('-', ' ')} (98045)</span>
        </div>

        {/* ── CITY HERO BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-10 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#1C150A',
            backgroundImage:
              'linear-gradient(rgba(229,184,66,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(229,184,66,0.08) 1px, transparent 1px), linear-gradient(180deg, #181208 0%, #291C0E 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#E5B842]/20 border border-[#E5B842] px-3 py-1 rounded text-xs text-[#E5B842] font-bold uppercase tracking-wider mb-3">
                <span>🏔️</span>
                <span>Flagship City Hub · North Bend, WA</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.4rem', color: '#E5B842', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                North Bend, WA Fence Regulations &amp; Communities
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
                Municipal building guidelines, Mt. Si wind corridor engineering requirements, and pre-approved HOA standards for ZIP code 98045.
              </p>
            </div>

            {/* Quick Configurator Trigger */}
            <Link
              href="/designer?preset=si-view-design-01"
              style={{
                ...rowdies(700),
                fontSize: '0.95rem',
                backgroundColor: '#F27A22',
                color: '#141B16',
                padding: '0.85rem 1.4rem',
                borderRadius: 4,
                textAlign: 'center',
                textDecoration: 'none',
                border: '2px solid #141B16',
                boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                display: 'inline-block',
                textTransform: 'uppercase',
                flexShrink: 0,
              }}
            >
              Start North Bend Build →
            </Link>
          </div>
        </section>

        {/* ── MT. SI WIND ADVISORY PLATE ── */}
        <section
          className="has-outside-corners p-5 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: '#26150D',
            border: '2px solid #F27A22',
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="flex items-start gap-3">
            <span className="text-2xl">🌪️</span>
            <div>
              <h3 style={{ ...rowdies(700), fontSize: '1rem', color: '#F27A22', marginBottom: '0.15rem' }}>
                Mt. Si Wind Corridor Structural Advisory (80 MPH Exposure B)
              </h3>
              <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#FAF6EE', margin: 0 }}>
                City of North Bend engineering standards recommend 3-rail horizontal framing, 4x4 PT incised posts, and 30"–36" concrete footing depth to prevent wind blow-over during Snoqualmie Pass east wind events.
              </p>
            </div>
          </div>
        </section>

        {/* ── ACTIVE HOA COMMUNITIES GRID ── */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#E5B842' }}>
              North Bend HOA Communities with Pre-Approved Standards
            </h2>
            <span style={{ ...rowdies(400), fontSize: '0.8rem', color: '#4ADE80' }}>
              3 Partnered Associations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Si View Community (Flagship) */}
            <div
              className="has-outside-corners p-6 rounded-lg flex flex-col justify-between relative"
              style={{
                background: '#16432D',
                backgroundImage:
                  'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                border: '2.5px solid #4ADE80',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <span className="corner-mark-out tl c-orange" />
              <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ ...rowdies(700), fontSize: '0.72rem', color: '#E5B842' }}>
                    FLAGSHIP HOA
                  </span>
                  <span style={{ ...rowdies(700), fontSize: '0.65rem', background: '#4ADE80', color: '#141B16', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                    ARC CERTIFIED
                  </span>
                </div>

                <h3 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.3rem' }}>
                  Si View Community HOA
                </h3>

                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#FAF6EE', marginBottom: '1rem', lineHeight: 1.45 }}>
                  Section 4.2 pre-approved standards: 4 specific styles (Designs 01–04) with zero-rejection ARC submittal guarantee.
                </p>

                <div className="bg-[#0D1F15] p-2.5 rounded text-[11px] text-[#A5D6A7] mb-4 space-y-1" style={{ ...rowdies(300) }}>
                  <div>✓ Max Height: 6ft Solid Privacy</div>
                  <div>✓ Approved: Tight-Knot Western Red Cedar</div>
                  <div>✓ No Gates on designated greenbelt perimeter runs</div>
                </div>
              </div>

              <Link
                href="/wa/king-county/north-bend/si-view"
                style={{
                  ...rowdies(700),
                  fontSize: '0.85rem',
                  backgroundColor: '#4ADE80',
                  color: '#141B16',
                  padding: '0.65rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid #141B16',
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                View Si View Standards →
              </Link>
            </div>

            {/* Riverbend Community */}
            <div
              className="has-outside-corners p-6 rounded-lg flex flex-col justify-between relative"
              style={{
                background: '#FAF6EE',
                border: '2px solid var(--ink)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
              }}
            >
              <span className="corner-mark-out tl c-gold" />
              <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

              <div>
                <span style={{ ...rowdies(700), fontSize: '0.72rem', color: '#E5B842' }}>
                  COMMUNITY #02
                </span>
                <h3 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#1A1A1A', margin: '0.2rem 0 0.4rem 0' }}>
                  Riverbend Community
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#444', marginBottom: '1rem', lineHeight: 1.45 }}>
                  River valley natural stain requirements with semi-transparent cedar sealer mandates and 6ft height limits.
                </p>
                <div className="bg-[#EFE8D8] p-2.5 rounded text-[11px] text-[#333] mb-4 space-y-1" style={{ ...rowdies(300) }}>
                  <div>✓ Natural wood tones only</div>
                  <div>✓ 2x4 framing rails with Simpson brackets</div>
                </div>
              </div>

              <Link
                href="/wa/king-county/north-bend/si-view"
                style={{
                  ...rowdies(400),
                  fontSize: '0.8rem',
                  backgroundColor: '#141B16',
                  color: '#E5B842',
                  padding: '0.55rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1.5px solid #E5B842',
                  display: 'block',
                }}
              >
                View Riverbend Specs →
              </Link>
            </div>

            {/* Forster Woods Community */}
            <div
              className="has-outside-corners p-6 rounded-lg flex flex-col justify-between relative"
              style={{
                background: '#FAF6EE',
                border: '2px solid var(--ink)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
              }}
            >
              <span className="corner-mark-out tl c-gold" />
              <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

              <div>
                <span style={{ ...rowdies(700), fontSize: '0.72rem', color: '#E5B842' }}>
                  COMMUNITY #03
                </span>
                <h3 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#1A1A1A', margin: '0.2rem 0 0.4rem 0' }}>
                  Forster Woods HOA
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#444', marginBottom: '1rem', lineHeight: 1.45 }}>
                  Architectural review board checklist requiring Good Neighbor alternating pickets on all dividing lot lines.
                </p>
                <div className="bg-[#EFE8D8] p-2.5 rounded text-[11px] text-[#333] mb-4 space-y-1" style={{ ...rowdies(300) }}>
                  <div>✓ Alternating shadowbox or picture frame</div>
                  <div>✓ Black powder hardware required</div>
                </div>
              </div>

              <Link
                href="/wa/king-county/north-bend/si-view"
                style={{
                  ...rowdies(400),
                  fontSize: '0.8rem',
                  backgroundColor: '#141B16',
                  color: '#E5B842',
                  padding: '0.55rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1.5px solid #E5B842',
                  display: 'block',
                }}
              >
                View Forster Woods Specs →
              </Link>
            </div>
          </div>
        </section>

        {/* ── VERIFIED CONTRACTORS SHOWCASE ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8"
          style={{
            background: '#EFE8D8',
            border: '2px solid var(--ink)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          }}
        >
          <span className="corner-mark-out tl c-gold" />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#E5B842', margin: 0 }}>
                Verified North Bend Fence Contractors (Anti-Monopoly 3-Seat Roster)
              </h2>
              <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#333', margin: '0.2rem 0 0 0' }}>
                All contractors hold active WA L&amp;I licenses, $1M general liability insurance, and build from Fence Frames ARC Blueprints.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { name: 'Cascade Fence & Deck', ubi: 'WA L&I #CASCAD*891K2', rating: '4.9 ★ (42 Reviews)', exp: '14 Yrs Local North Bend' },
              { name: 'Snoqualmie Valley Fencing', ubi: 'WA L&I #SNOQV*221L9', rating: '5.0 ★ (28 Reviews)', exp: '9 Yrs Valley Specialist' },
              { name: 'Mt. Si Woodworks', ubi: 'WA L&I #MTSIW*774P1', rating: '4.8 ★ (35 Reviews)', exp: '11 Yrs Custom Timber' },
            ].map((pro) => (
              <div key={pro.name} className="bg-[#FAF6EE] p-4 rounded-lg border border-[#16432D]/15 flex flex-col justify-between">
                <div>
                  <h4 style={{ ...rowdies(700), fontSize: '1rem', color: '#1A1A1A', marginBottom: '0.2rem' }}>
                    {pro.name}
                  </h4>
                  <div style={{ ...rowdies(300), fontSize: '0.72rem', color: '#E5B842', marginBottom: '0.4rem' }}>
                    {pro.ubi} · {pro.rating}
                  </div>
                  <p style={{ ...rowdies(300), fontSize: '0.78rem', color: '#444' }}>
                    {pro.exp} · Specializing in Mt. Si wind corridor reinforced 3-rail cedar installations.
                  </p>
                </div>
                <Link
                  href="/contractor/match"
                  className="mt-3 bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] font-bold p-2 rounded text-center transition"
                  style={{ textDecoration: 'none', ...rowdies(700), fontSize: '0.75rem' }}
                >
                  ⚡ Request Pre-Scoped Bid
                </Link>
              </div>
            ))}
          </div>
        </section>
    </SiteShell>
  )
}
