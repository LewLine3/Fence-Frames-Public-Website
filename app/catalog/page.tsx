'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

interface FenceStyle {
  id: string
  name: string
  category: 'vertical' | 'horizontal' | 'picture-frame' | 'good-neighbor' | 'picket' | 'split-rail'
  pricePerLf: number
  height: string
  lumber: string
  framing: string
  stain: string
  img: string
  badge: string
  hoaApproved?: boolean
  description: string
}

const CATALOG_STYLES: FenceStyle[] = [
  {
    id: 'si-view-heritage-01',
    name: "Heritage Cedar 6' Privacy (Si View Preset)",
    category: 'vertical',
    pricePerLf: 48,
    height: "6' Height",
    lumber: 'Clear WRC Pickets',
    framing: '2x4 Cedar 3-Rail',
    stain: 'Factory Cedar Natural',
    img: '/images/catalog-vpf-natural.svg',
    badge: '🏛️ HOA APPROVED',
    hoaApproved: true,
    description: 'The canonical Si View Section 4.2 pre-approved architectural standard. Full privacy tight-knot cedar with cedar top cap.',
  },
  {
    id: 'horizon-modern-02',
    name: "Horizon Modern Horizontal Stack",
    category: 'horizontal',
    pricePerLf: 56,
    height: "6' Height",
    lumber: '1x6 Stacked Cedar',
    framing: '4x4 PT Posts (Hidden)',
    stain: 'Chestnut Brown Pre-Stain',
    img: '/images/hero-carousel/horizontal-01.png',
    badge: '⭐ POPULAR',
    description: 'Clean architectural horizontal lines with intentional 1/4" shadow reveal gaps. Clean street face and modern aesthetic.',
  },
  {
    id: 'estate-picture-frame-03',
    name: "Estate Picture Frame with 2x4 Cap",
    category: 'picture-frame',
    pricePerLf: 52,
    height: "6' Height",
    lumber: '1x6 Inset Pickets',
    framing: 'Full 2x4 Picture Frame',
    stain: 'Clear Natural Seal',
    img: '/images/hero-carousel/vertical-01.png',
    badge: '👑 PREMIUM',
    description: 'Fully enclosed border framing holding infill pickets cleanly in place. Identical high-end finish on both street and yard faces.',
  },
  {
    id: 'good-neighbor-shadowbox-04',
    name: "Good Neighbor Shadowbox Alternating",
    category: 'good-neighbor',
    pricePerLf: 46,
    height: "6' Height",
    lumber: '1x6 Alternating Boards',
    framing: '2x4 Cedar 3-Rail',
    stain: 'Dark Walnut Pre-Stain',
    img: '/images/hero-carousel/vertical-02.png',
    badge: '🤝 50/50 SHARED',
    description: 'Alternating pickets allow air flow while maintaining visual privacy. Perfect for shared property lines with adjoining neighbors.',
  },
  {
    id: 'pnw-classic-picket-05',
    name: "PNW Classic 4ft Front Yard Picket",
    category: 'picket',
    pricePerLf: 38,
    height: "4' Height",
    lumber: '1x4 French Gothic Pickets',
    framing: '2x4 Cedar 2-Rail',
    stain: 'Clear Sealant',
    img: '/images/hero-carousel/vertical-04.jpg',
    badge: '🏡 FRONT YARD',
    description: 'Traditional open front-yard charm compliant with King County 4ft front yard setback zoning guidelines.',
  },
  {
    id: 'cedar-lattice-top-06',
    name: "Cedar Garden Lattice-Top Privacy",
    category: 'vertical',
    pricePerLf: 54,
    height: "6' Height",
    lumber: '5ft Solid + 1ft Lattice',
    framing: 'Heavy-Duty Diagonal',
    stain: 'Factory Cedar Natural',
    img: '/images/hero-carousel/vertical-03.png',
    badge: '🌿 GARDEN',
    description: '5ft solid privacy board topped with an integrated 1ft diagonal diamond lattice panel for sun penetration and climbing vines.',
  },
  {
    id: 'modern-horizontal-kickboard-07',
    name: "Modern Slat with Rot-Barrier Kickboard",
    category: 'horizontal',
    pricePerLf: 58,
    height: "6' Height",
    lumber: '1x4 Modern Slats',
    framing: '2x12 PT Kickboard Base',
    stain: 'Redwood Stain',
    img: '/images/hero-carousel/horizontal-03.jpg',
    badge: '🛡️ ROT-PROOF',
    description: 'Ground-contact pressure treated 2x12 kickboard preserves upper cedar slats from wet soil rot and string trimmer damage.',
  },
  {
    id: 'split-rail-farm-08',
    name: "Split Rail 3-Rail Cedar Perimeter",
    category: 'split-rail',
    pricePerLf: 32,
    height: "4' Height",
    lumber: 'Genuine Cedar Split Rails',
    framing: 'Mortised Cedar Posts',
    stain: 'Natural Weathering',
    img: '/images/hero-carousel/horizontal-05.jpg',
    badge: '🌲 RUSTIC',
    description: 'Traditional Pacific Northwest rustic split rail fencing. Ideal for acreage, property boundaries, and greenbelt buffers.',
  },
]

export default function PreBuiltCatalogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [linearFootage, setLinearFootage] = useState<number>(120)
  const [carouselIndex, setCarouselIndex] = useState<number>(0)

  const filteredStyles = CATALOG_STYLES.filter((s) => {
    if (activeCategory === 'all') return true
    return s.category === activeCategory
  })

  // Desktop shows 3 cards at a time
  const visibleStyles = filteredStyles.slice(carouselIndex, carouselIndex + 3)
  const maxPages = Math.ceil(filteredStyles.length / 3)

  const handleNext = () => {
    if (carouselIndex + 3 < filteredStyles.length) {
      setCarouselIndex((prev) => prev + 3)
    }
  }

  const handlePrev = () => {
    if (carouselIndex - 3 >= 0) {
      setCarouselIndex((prev) => prev - 3)
    }
  }

  return (
    <SiteShell width="catalog">
{/* ── HEADER BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-10 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#1C130B',
            backgroundImage:
              'linear-gradient(rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(180deg, #181008 0%, #26160C 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#E5B842]/20 border border-[#E5B842] px-3 py-1 rounded text-xs text-[#E5B842] font-bold uppercase tracking-wider mb-3">
                <span>🗂️</span>
                <span>Greatest Hits Catalog</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.4rem', color: '#E5B842', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                Pre-Engineered Fence Catalog
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
                Every design is built with authentic parametric parts. Select a style, adjust your footage, and launch directly into 2D CAD.
              </p>
            </div>

            {/* Interactive Footage Controller */}
            <div
              className="bg-[#16432D] border-2 border-[#E5B842] p-4 rounded-lg flex flex-col gap-2 min-w-[280px]"
              style={{ boxShadow: '0 6px 16px rgba(0,0,0,0.4)' }}
            >
              <div className="flex justify-between items-center text-xs">
                <span style={{ ...rowdies(700), color: '#E5B842', textTransform: 'uppercase' }}>
                  Project Linear Footage
                </span>
                <span className="text-[#4ADE80] font-bold text-sm">{linearFootage} LF</span>
              </div>
              <input
                type="range"
                min="20"
                max="300"
                step="10"
                value={linearFootage}
                onChange={(e) => setLinearFootage(Number(e.target.value))}
                className="w-full accent-[#E5B842] cursor-pointer"
              />
              <span style={{ ...rowdies(300), fontSize: '0.75rem', color: '#B5C2BA' }}>
                Estimates recalculate live for all styles below
              </span>
            </div>
          </div>

          {/* Filter Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span style={{ ...rowdies(400), fontSize: '0.85rem', color: '#E5B842', marginRight: '0.5rem' }}>
                Style:
              </span>
              {[
                { id: 'all', label: 'All (8)' },
                { id: 'vertical', label: '🌲 Vertical' },
                { id: 'horizontal', label: '🌅 Horizontal' },
                { id: 'picture-frame', label: '🖼️ Picture Frame' },
                { id: 'good-neighbor', label: '🤝 Good Neighbor' },
                { id: 'picket', label: '🏡 Picket' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(c.id)
                    setCarouselIndex(0)
                  }}
                  style={{
                    ...rowdies(activeCategory === c.id ? 700 : 400),
                    fontSize: '0.8rem',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 4,
                    border: activeCategory === c.id ? '1.5px solid #E5B842' : '1.5px solid rgba(22,67,45,0.40)',
                    background: activeCategory === c.id ? '#E5B842' : 'rgba(22,67,45,0.15)',
                    color: activeCategory === c.id ? '#141B16' : '#16432D',
                    cursor: 'pointer',
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Carousel Page Chevrons */}
            <div className="flex items-center gap-2">
              <span style={{ ...rowdies(400), fontSize: '0.8rem', color: '#DBD0BD' }}>
                Page {Math.floor(carouselIndex / 3) + 1} of {maxPages || 1}
              </span>
              <button
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                className="bg-[#16432D] border border-[#16432D] hover:border-[#E5B842] disabled:opacity-30 text-[#E5B842] px-3 py-1 rounded text-xs font-bold cursor-pointer transition"
              >
                ◀ Prev 3
              </button>
              <button
                onClick={handleNext}
                disabled={carouselIndex + 3 >= filteredStyles.length}
                className="bg-[#16432D] border border-[#16432D] hover:border-[#E5B842] disabled:opacity-30 text-[#E5B842] px-3 py-1 rounded text-xs font-bold cursor-pointer transition"
              >
                Next 3 ▶
              </button>
            </div>
          </div>
        </section>

        {/* ── 3-CARD RESPONSIVE CAROUSEL GRID ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {visibleStyles.map((style) => {
            const estTotal = style.pricePerLf * linearFootage
            const estRangeMin = Math.round(estTotal * 0.85)
            const estRangeMax = Math.round(estTotal * 1.15)

            return (
              <div
                key={style.id}
                className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
                style={{
                  background: '#FAF6EE',
                  border: '2.5px solid #1A1A1A',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                }}
              >
                <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
                <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

                {/* Ink Title Bar */}
                <div
                  style={{
                    background: '#1A1A1A',
                    color: '#E5B842',
                    padding: '0.65rem 1rem',
                    borderBottom: '2.5px solid var(--ink)',
                    ...rowdies(700),
                    fontSize: '0.92rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span className="truncate pr-2">{style.name}</span>
                  <span style={{ fontSize: '0.72rem', background: '#16432D', color: '#4ADE80', padding: '0.15rem 0.45rem', borderRadius: 3, flexShrink: 0, border: '1px solid rgba(74,222,128,0.4)' }}>
                    ${style.pricePerLf}/LF
                  </span>
                </div>

                {/* Elevation Render */}
                <div
                  style={{
                    height: 200,
                    background: '#10261A',
                    backgroundImage:
                      'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                    borderBottom: '2.5px solid var(--ink)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.75rem',
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={style.img}
                    alt={style.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      ...rowdies(700),
                      fontSize: '0.68rem',
                      background: '#141B16',
                      color: style.hoaApproved ? '#4ADE80' : '#E5B842',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 3,
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    {style.badge}
                  </span>
                </div>

                {/* Takeoff Specs & Price Plate */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Live Estimate Readout */}
                    <div
                      className="bg-[#E8F5EE] border border-[#4ADE80]/50 rounded p-2.5 mb-3 flex items-center justify-between"
                    >
                      <span style={{ ...rowdies(400), fontSize: '0.75rem', color: '#444' }}>
                        {linearFootage} LF Total Estimate:
                      </span>
                      <span style={{ ...rowdies(700), fontSize: '1.05rem', color: '#4ADE80' }}>
                        ${estRangeMin.toLocaleString()} – ${estRangeMax.toLocaleString()}
                      </span>
                    </div>

                    <p style={{ ...rowdies(300), fontSize: '0.84rem', lineHeight: 1.45, color: '#333', marginBottom: '0.8rem' }}>
                      {style.description}
                    </p>

                    {/* Spec Bullets */}
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-[#444] mb-4" style={{ ...rowdies(300) }}>
                      <div className="bg-[#EFE8D8] p-1.5 rounded border border-[#16432D]/20">
                        <strong className="text-[#1A1A1A] block">Height:</strong> {style.height}
                      </div>
                      <div className="bg-[#EFE8D8] p-1.5 rounded border border-[#16432D]/20">
                        <strong className="text-[#1A1A1A] block">Lumber:</strong> {style.lumber}
                      </div>
                      <div className="bg-[#EFE8D8] p-1.5 rounded border border-[#16432D]/20">
                        <strong className="text-[#1A1A1A] block">Framing:</strong> {style.framing}
                      </div>
                      <div className="bg-[#EFE8D8] p-1.5 rounded border border-[#16432D]/20">
                        <strong className="text-[#1A1A1A] block">Finish:</strong> {style.stain}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/designer?preset=${style.id}&lf=${linearFootage}`}
                      style={{
                        ...rowdies(700),
                        fontSize: '0.85rem',
                        backgroundColor: '#F27A22',
                        color: '#141B16',
                        padding: '0.65rem 0.8rem',
                        borderRadius: 4,
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: '2px solid #141B16',
                        display: 'block',
                        textTransform: 'uppercase',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      Customize in CAD Designer →
                    </Link>
                    <Link
                      href={`/blueprint?preset=${style.id}&lf=${linearFootage}`}
                      style={{
                        ...rowdies(400),
                        fontSize: '0.78rem',
                        backgroundColor: '#141B16',
                        color: '#4ADE80',
                        padding: '0.45rem 0.8rem',
                        borderRadius: 4,
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: '1.5px solid #4ADE80',
                        display: 'block',
                      }}
                    >
                      Instant ARC Blueprint PDF
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
    </SiteShell>
  )
}
