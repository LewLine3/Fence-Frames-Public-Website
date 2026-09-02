'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

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
  const [search, setSearch] = useState<string>('')

  const filteredCounties = WA_COUNTIES.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.region.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── BREADCRUMBS ── */}
        <div className="text-xs text-white/50 mb-4 flex items-center gap-2" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-white/70">Home</Link>
          <span>/</span>
          <span className="text-[#E5B842]">Washington State Directory</span>
        </div>

        {/* ── HEADER BANNER ── */}
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
                <span>📍</span>
                <span>Pillar 1 · Find It</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.4rem', color: '#E5B842', lineHeight: 1.15, marginBottom: '0.4rem' }}>
                Washington State Fence Codes &amp; HOA Directory
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
                Explore building codes, frost depth guidelines, municipal setback exemptions, and pre-approved HOA bylaws across 39 Washington counties.
              </p>
            </div>

            {/* County Quick Search */}
            <div className="min-w-[280px]">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Washington counties..."
                className="w-full bg-[#0E1510] border-2 border-[#E5B842] text-white rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-[#4ADE80]"
                style={{ ...rowdies(300) }}
              />
            </div>
          </div>
        </section>

        {/* ── COUNTIES GRID ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCounties.map((county) => (
            <Link
              key={county.slug}
              href={`/wa/${county.slug}`}
              className="has-outside-corners flex flex-col justify-between p-6 rounded-lg transition-transform hover:-translate-y-1 relative"
              style={{
                background: '#121814',
                backgroundImage:
                  'linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                border: county.isFlagship ? '2.5px solid #E5B842' : '2px solid var(--ink)',
                boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
                textDecoration: 'none',
              }}
            >
              <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
              <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span style={{ ...rowdies(400), fontSize: '0.72rem', color: '#4ADE80', textTransform: 'uppercase' }}>
                    {county.region}
                  </span>
                  {county.isFlagship && (
                    <span style={{ ...rowdies(700), fontSize: '0.65rem', background: '#E5B842', color: '#141B16', padding: '0.15rem 0.45rem', borderRadius: 3 }}>
                      FLAGSHIP PILOT
                    </span>
                  )}
                </div>

                <h3 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#FAF6EE', marginBottom: '0.4rem' }}>
                  {county.name}
                </h3>

                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#B5C2BA', marginBottom: '1rem', lineHeight: 1.4 }}>
                  {county.windExposure}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span style={{ ...rowdies(400), color: '#E5B842' }}>
                  {county.activeCities} Active Cities · {county.activeHoas} HOAs
                </span>
                <span className="text-[#4ADE80] font-bold">Explore Hub →</span>
              </div>
            </Link>
          ))}
        </section>

        {/* ── WASHINGTON STRUCTURAL GUIDELINES ADVISORY ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8"
          style={{
            background: '#0F1A12',
            border: '2px solid #4ADE80',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-forest" />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <h2 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#4ADE80', marginBottom: '0.6rem' }}>
            Washington State Residential Fencing Structural Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#DBD0BD]" style={{ ...rowdies(300) }}>
            <div className="bg-[#09100C] p-4 rounded border border-white/5">
              <strong className="text-white block mb-1">Permit Exemption Rule:</strong>
              Fences up to 6ft in rear/side yards and 4ft in front yard setbacks are universally permit-exempt across most WA municipal jurisdictions unless located in a critical shoreline or wetland buffer.
            </div>
            <div className="bg-[#09100C] p-4 rounded border border-white/5">
              <strong className="text-white block mb-1">Frost Depth &amp; Post Embedment:</strong>
              Standard Western Washington frost line requires 24" minimum post depth with 50lb quick-set concrete collars. Mountain foothills (North Bend, Gold Bar) require 30"–36" depth.
            </div>
            <div className="bg-[#09100C] p-4 rounded border border-white/5">
              <strong className="text-white block mb-1">Rot-Barrier Law (WAC Code):</strong>
              Un-treated Western Red Cedar pickets must maintain a 2" clearance above finish soil grade or rest upon a ground-contact pressure-treated bottom kickboard.
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
