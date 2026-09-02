'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const SI_VIEW_DESIGNS = [
  {
    id: 'si-view-design-01',
    code: 'DESIGN 01',
    name: 'Solid Heritage Cedar Privacy',
    price: '$44.00',
    specs: "6' Solid Vertical Pickets • 2x4 Top Cap • 4x4 PT Posts",
    status: '100% PRE-APPROVED',
    img: '/images/catalog-vpf-natural.svg',
    desc: 'The canonical Si View baseline. Full visual screening with 1x6 tight knot cedar pickets and heavy-duty 3-rail framing.',
  },
  {
    id: 'si-view-design-02',
    code: 'DESIGN 02',
    name: 'Estate Picture Frame w/ Top Cap',
    price: '$52.00',
    specs: "6' Fully Enclosed Frame • Fascia Trim • Continuous Cap",
    status: '100% PRE-APPROVED',
    img: '/images/hero-carousel/vertical-01.png',
    desc: 'Premium framed aesthetic enclosing all picket ends inside perimeter trim for identical street and yard face elegance.',
  },
  {
    id: 'si-view-design-03',
    code: 'DESIGN 03',
    name: 'Horizon Modern Horizontal Stack',
    price: '$56.00',
    specs: "6' Horizontal Cedar Slats • 1/4\" Reveal • Hidden Posts",
    status: '100% PRE-APPROVED',
    img: '/images/hero-carousel/horizontal-01.png',
    desc: 'Contemporary horizontal architecture approved under Si View 2024 Design Guidelines Amendment with factory pre-stain.',
  },
  {
    id: 'si-view-design-04',
    code: 'DESIGN 04',
    name: 'Good Neighbor Alternating Shadowbox',
    price: '$48.00',
    specs: "6' Alternating 1x6 Boards • Wind Flow Relief • 50/50 Look",
    status: '100% PRE-APPROVED',
    img: '/images/hero-carousel/vertical-02.png',
    desc: 'Equal-appearance fencing on both property sides. Allows high-wind mountain airflow through alternating board baffles.',
  },
]

export default function SiViewCommunityPage({
  params,
}: {
  params: Promise<{ county: string; city: string; community: string }>
}) {
  const resolvedParams = use(params)
  const communitySlug = resolvedParams.community || 'si-view'

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
          <Link href="/wa/king-county/north-bend" className="hover:text-[#E5B842] text-[#16432D]">North Bend</Link>
          <span>/</span>
          <span className="text-[#E5B842]">Si View HOA</span>
        </div>

        {/* ── COMMUNITY HERO BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-10 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#16432D',
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(180deg, #102B1E 0%, #16432D 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid #4ADE80',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#4ADE80]/20 border border-[#4ADE80] px-3 py-1 rounded text-xs text-[#4ADE80] font-bold uppercase tracking-wider mb-3">
                <span>🏡</span>
                <span>Si View HOA · Flagship Standards Hub</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.4rem', color: '#FFFFFF', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                Si View HOA Pre-Approved Fence Standards
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
                Verified Section 4.2 architectural guidelines for Si View homeowners. Choose from 4 pre-approved styles for instant ARC submittal approval.
              </p>
            </div>

            {/* ARC Verified Stamp Plate */}
            <div className="bg-[#0B1A12] border-2 border-[#E5B842] p-4 rounded-lg flex flex-col gap-1 text-center min-w-[240px]">
              <span style={{ ...rowdies(700), fontSize: '0.75rem', color: '#E5B842', textTransform: 'uppercase' }}>
                CERTIFIED ARC STATUS
              </span>
              <span style={{ ...rowdies(700), fontSize: '1.1rem', color: '#4ADE80' }}>
                Zero-Rejection Guarantee
              </span>
              <span style={{ ...rowdies(300), fontSize: '0.72rem', color: '#B5C2BA' }}>
                CC&amp;R Section 4.2 Compliant
              </span>
            </div>
          </div>
        </section>

        {/* ── 4 PRE-APPROVED DESIGNS (DESIGNS 01–04) ── */}
        <section className="mb-14">
          <div className="flex justify-between items-center mb-6">
            <h2 style={{ ...rowdies(700), fontSize: '1.5rem', color: '#E5B842' }}>
              4 Certified Si View Architectural Designs
            </h2>
            <span style={{ ...rowdies(400), fontSize: '0.82rem', color: '#4ADE80' }}>
              Select a design to pre-seed the 2D CAD Configurator
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SI_VIEW_DESIGNS.map((d) => (
              <div
                key={d.id}
                className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
                style={{
                  background: '#FAF6EE',
                  border: '2px solid var(--ink)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
                <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

                {/* Ribbon */}
                <div
                  style={{
                    background: '#16432D',
                    color: '#FAF6EE',
                    padding: '0.65rem 1rem',
                    borderBottom: '2px solid var(--ink)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ ...rowdies(700), fontSize: '0.95rem', color: '#E5B842' }}>
                    {d.code}: {d.name}
                  </span>
                  <span style={{ ...rowdies(700), fontSize: '0.75rem', background: '#4ADE80', color: '#141B16', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                    {d.status}
                  </span>
                </div>

                {/* Elevation Render */}
                <div
                  style={{
                    height: 200,
                    background: '#E8F5EE',
                    borderBottom: '2px solid var(--ink)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '1rem',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={d.img}
                    alt={d.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))' }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span style={{ ...rowdies(400), fontSize: '0.75rem', color: '#A5D6A7' }}>
                        {d.specs}
                      </span>
                      <span style={{ ...rowdies(700), fontSize: '1rem', color: '#E5B842' }}>
                        Est. {d.price} / LF
                      </span>
                    </div>

                    <p style={{ ...rowdies(300), fontSize: '0.85rem', lineHeight: 1.45, color: '#333', marginBottom: '1rem' }}>
                      {d.desc}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/designer?preset=${d.id}&hoa=si-view`}
                      style={{
                        ...rowdies(700),
                        fontSize: '0.85rem',
                        backgroundColor: '#F27A22',
                        color: '#141B16',
                        padding: '0.65rem 1rem',
                        borderRadius: 4,
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: '2px solid #141B16',
                        flex: 1,
                        textTransform: 'uppercase',
                        display: 'block',
                      }}
                    >
                      Configure {d.code} in CAD →
                    </Link>
                    <Link
                      href={`/blueprint?preset=${d.id}&hoa=si-view`}
                      style={{
                        ...rowdies(400),
                        fontSize: '0.78rem',
                        backgroundColor: '#141B16',
                        color: '#4ADE80',
                        padding: '0.65rem',
                        borderRadius: 4,
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: '1.5px solid #4ADE80',
                        display: 'block',
                      }}
                    >
                      Instant ARC PDF
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SI VIEW CC&R SECTION 4.2 BYLAW SUMMARY ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8"
          style={{
            background: '#EFE8D8',
            border: '2px solid var(--ink)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          }}
        >
          <span className="corner-mark-out tl c-forest" />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <h2 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#4ADE80', marginBottom: '0.8rem' }}>
            Si View CC&amp;R Section 4.2 Mandatory Fencing Bylaws
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#333]" style={{ ...rowdies(300) }}>
            <div className="bg-[#EFE8D8] p-4 rounded border border-[#16432D]/15">
              <strong className="text-[#1A1A1A] block mb-1">§4.2.1 Permitted Wood Species:</strong>
              All exterior facing pickets, trim boards, and post caps must be manufactured from Western Red Cedar (WRC). Pressure treated lumber is permitted for below-grade posts only.
            </div>
            <div className="bg-[#EFE8D8] p-4 rounded border border-[#16432D]/15">
              <strong className="text-[#1A1A1A] block mb-1">§4.2.2 Greenbelt Buffer Rule:</strong>
              Lots bordering common greenbelts or designated parks may not install solid privacy fencing higher than 4ft along the rear lot line without special ARC review board approval.
            </div>
            <div className="bg-[#EFE8D8] p-4 rounded border border-[#16432D]/15">
              <strong className="text-[#1A1A1A] block mb-1">§4.2.3 Factory Pre-Stain Finish:</strong>
              Fences must be sealed within 60 days of completion using an approved natural cedar tone UV sealer (Cedar Natural, Chestnut Brown, or Clear Seal).
            </div>
          </div>
        </section>
    </SiteShell>
  )
}
