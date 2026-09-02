'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

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
  const isKingCounty = countySlug === 'king-county'

  return (
    <div
      className="min-h-screen flex flex-col font-['Rowdies']"
      style={{
        backgroundColor: '#F4ECDC',
        backgroundImage: `linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)`,
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        color: '#1A1A1A',
      }}
    >
      <SiteNav />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── BREADCRUMBS ── */}
        <div className="text-xs text-[#16432D]/60 mb-4 flex items-center gap-2" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-[#16432D]">Home</Link>
          <span>/</span>
          <Link href="/wa" className="hover:text-[#E5B842] text-[#16432D]">Washington</Link>
          <span>/</span>
          <span className="text-[#E5B842] capitalize">{countySlug.replace('-', ' ')}</span>
        </div>

        {/* ── COUNTY HERO BANNER ── */}
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

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#E5B842]/20 border border-[#E5B842] px-3 py-1 rounded text-xs text-[#E5B842] font-bold uppercase tracking-wider mb-3">
              <span>📍</span>
              <span>King County Flagship Hub</span>
            </div>
            <h1 style={{ ...rowdies(700), fontSize: '2.4rem', color: '#E5B842', lineHeight: 1.15, marginBottom: '0.4rem' }}>
              King County, WA Fence Codes &amp; Municipalities
            </h1>
            <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
              Select your city or municipality below to view local fence building permit limits, wind corridor requirements, and pre-approved HOA designs.
            </p>
          </div>
        </section>

        {/* ── CITIES GRID ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {KING_COUNTY_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/wa/king-county/${city.slug}`}
              className="has-outside-corners flex flex-col justify-between p-6 rounded-lg transition-transform hover:-translate-y-1 relative"
              style={{
                background: '#FAF6EE',
                backgroundImage:
                  'linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                border: city.isFlagship ? '2.5px solid #E5B842' : '2px solid var(--ink)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
                textDecoration: 'none',
              }}
            >
              <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
              <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ ...rowdies(700), fontSize: '0.72rem', color: '#4ADE80' }}>
                    ZIP: {city.zip}
                  </span>
                  {city.isFlagship && (
                    <span style={{ ...rowdies(700), fontSize: '0.65rem', background: '#E5B842', color: '#141B16', padding: '0.15rem 0.45rem', borderRadius: 3 }}>
                      FLAGSHIP PILOT
                    </span>
                  )}
                </div>

                <h3 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#1A1A1A', marginBottom: '0.3rem' }}>
                  {city.name}, WA
                </h3>

                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#444', marginBottom: '0.8rem', lineHeight: 1.4 }}>
                  {city.description}
                </p>

                <div className="bg-[#EFE8D8] p-2 rounded text-[11px] text-[#E5B842] mb-3 inline-block" style={{ ...rowdies(400) }}>
                  🌪️ Wind: {city.windRating}
                </div>
              </div>

              <div className="pt-3 border-t border-[#16432D]/15 flex items-center justify-between text-xs">
                <span style={{ ...rowdies(400), color: '#333' }}>
                  {city.hoasCount} Active HOA Communities
                </span>
                <span className="text-[#4ADE80] font-bold">View City Hub →</span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── KING COUNTY ZONING OVERVIEW ── */}
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
            King County Residential Fence Code (Title 21A Summary)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#333]" style={{ ...rowdies(300) }}>
            <div className="bg-[#F4ECDC] p-4 rounded border border-[#16432D]/15">
              <strong className="text-[#1A1A1A] block mb-1">Backyard Height (6ft Max):</strong>
              Per Title 21A.14.210, fences in rear and side interior setbacks may not exceed 6ft in height without an architectural variance permit.
            </div>
            <div className="bg-[#F4ECDC] p-4 rounded border border-[#16432D]/15">
              <strong className="text-[#1A1A1A] block mb-1">Front Yard Setback (4ft Max):</strong>
              Fences in front yard street setbacks must not exceed 42"–48" in height to preserve driver sightline triangles at driveway intersections.
            </div>
            <div className="bg-[#F4ECDC] p-4 rounded border border-[#16432D]/15">
              <strong className="text-[#1A1A1A] block mb-1">Clearance Over Property Line:</strong>
              Posts and footing concrete must be contained entirely within the surveyed property parcel unless a recorded Good Neighbor Agreement exists.
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
