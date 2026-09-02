'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function FenceFolioDossierPage() {
  const [activeChapter, setActiveChapter] = useState<number>(0)
  const [cleanMode, setCleanMode] = useState<boolean>(false)
  const [footage, setFootage] = useState<number>(120)

  const estPricePerLf = 48
  const totalEst = footage * estPricePerLf
  const minEst = Math.round(totalEst * 0.85)
  const maxEst = Math.round(totalEst * 1.15)

  const chapters = [
    {
      id: 'cover',
      tab: '1. Cover Sheet',
      title: "Heritage Cedar — 6' Privacy Showcase",
      code: 'SHEET A-01 · ELEVATION & SPECS',
      badge: 'ARCHITECTURAL COVER',
    },
    {
      id: 'community',
      tab: '2. Community Rules',
      title: 'Si View HOA Section 4.2 CC&R Compliance',
      code: 'SHEET A-02 · ARC VERIFICATION',
      badge: '🏛️ PRE-APPROVED',
    },
    {
      id: 'materials',
      tab: '3. Material List / BOM',
      title: 'Parametric Lumber & Fastener Takeoff',
      code: 'SHEET M-01 · BILL OF MATERIALS',
      badge: 'QUANTITY VERIFIED',
    },
    {
      id: 'blueprint',
      tab: '4. Builder Blueprint',
      title: '1:24 Scale Structural Framing Model',
      code: 'SHEET B-01 · CONSTRUCTION BLUEPRINT',
      badge: 'PERMIT READY',
    },
    {
      id: 'addons',
      tab: '5. Add-ons & Hardware',
      title: 'Rot-Barrier Kickboard & Simpson Ties',
      code: 'SHEET X-01 · HARDWARE & EXTRAS',
      badge: 'MODULAR SPECS',
    },
    {
      id: 'ledger',
      tab: '6. Pricing Ledger',
      title: 'Itemized Labor & Material Pricing Breakdown',
      code: 'SHEET L-01 · COST LEDGER',
      badge: '±15% TRANSPARENCY',
    },
  ]

  const current = chapters[activeChapter]

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── TOP CONTROL BAR ── */}
        <section
          className="has-outside-corners p-4 sm:p-6 rounded-lg mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{
            background: '#121A14',
            border: '2px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span style={{ ...rowdies(700), fontSize: '1.25rem', color: '#4ADE80' }}>
                FENCE-FOLIO™
              </span>
              <span style={{ ...rowdies(700), fontSize: '0.72rem', background: '#D9B872', color: '#141B16', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                DOSSIER ID: FF-98045-8912
              </span>
            </div>
            <p style={{ ...rowdies(300), fontSize: '0.85rem', color: '#DBD0BD', margin: 0 }}>
              Si View Community Lot #42 · North Bend, WA 98045 · 120 LF Heritage 3-Rail
            </p>
          </div>

          {/* Compliance & Action Toggles */}
          <div className="flex flex-wrap items-center gap-3">
            {/* ARC Clean Mode Toggle */}
            <div className="flex items-center gap-2 bg-[#0A0F0C] border border-white/20 px-3 py-1.5 rounded-lg">
              <span style={{ ...rowdies(400), fontSize: '0.75rem', color: cleanMode ? '#4ADE80' : '#DBD0BD' }}>
                {cleanMode ? '🔒 ARC Clean Mode (Pricing Hidden)' : '💵 Contractor Bidding Mode'}
              </span>
              <button
                type="button"
                onClick={() => setCleanMode(!cleanMode)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  cleanMode ? 'bg-[#4ADE80]' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#141B16] transform transition-transform ${
                    cleanMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Print PDF Button */}
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-[#E5B842] hover:bg-[#d6a836] text-[#141B16] px-4 py-2 rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer uppercase"
            >
              <span>🖨️</span>
              <span>Print 8.5" × 11" PDF</span>
            </button>

            {/* Dispatch CTA */}
            <Link
              href="/contractor/match"
              className="bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] px-4 py-2 rounded text-xs font-bold transition flex items-center gap-1.5 uppercase"
              style={{ textDecoration: 'none' }}
            >
              <span>🔨</span>
              <span>Get 3 Local Bids</span>
            </Link>
          </div>
        </section>

        {/* ── CHAPTER NAVIGATION TABS ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-white/10">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapter(idx)}
              style={{
                ...rowdies(activeChapter === idx ? 700 : 400),
                fontSize: '0.85rem',
                padding: '0.5rem 1rem',
                borderRadius: 4,
                border: activeChapter === idx ? '2px solid #4ADE80' : '1.5px solid rgba(255,255,255,0.12)',
                background: activeChapter === idx ? '#16432D' : 'rgba(14,24,18,0.7)',
                color: activeChapter === idx ? '#4ADE80' : '#DBD0BD',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {ch.tab}
            </button>
          ))}
        </div>

        {/* ── MAIN DOSSIER SHEET (8.5" x 11" Canvas Representation) ── */}
        <div
          className="has-outside-corners p-6 sm:p-10 rounded-lg relative"
          style={{
            background: '#16432D',
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
            minHeight: '620px',
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

          {/* Sheet Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E5B842]/30 gap-3">
            <div>
              <span style={{ ...rowdies(700), fontSize: '0.75rem', color: '#E5B842', letterSpacing: '0.08em' }}>
                {current.code}
              </span>
              <h2 style={{ ...rowdies(700), fontSize: '1.7rem', color: '#FFFFFF', margin: '0.2rem 0' }}>
                {current.title}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.75rem',
                  background: '#D9B872',
                  color: '#141B16',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 3,
                }}
              >
                {current.badge}
              </span>

              {!cleanMode && (
                <div className="bg-[#0F2417] border border-[#E5B842] px-3 py-1 rounded text-right">
                  <span style={{ ...rowdies(400), fontSize: '0.62rem', color: '#E5B842', display: 'block' }}>EST. MID QUOTE</span>
                  <span style={{ ...rowdies(700), fontSize: '1.1rem', color: '#4ADE80' }}>
                    ${minEst.toLocaleString()} – ${maxEst.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* ── DYNAMIC CHAPTER CONTENT ── */}

          {/* CHAPTER 1: COVER */}
          {activeChapter === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 bg-[#10261A] border-2 border-[#141B16] rounded-lg p-6 flex flex-col items-center justify-center min-h-[360px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/catalog-vpf-natural.svg"
                  alt="Heritage Cedar Front Elevation"
                  style={{ maxHeight: 260, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))' }}
                />
                <span style={{ ...rowdies(400), fontSize: '0.75rem', color: '#A5D6A7', marginTop: '1rem' }}>
                  Front Street Elevation · 6ft Solid Clear Cedar Pickets with 2x4 Top Cap
                </span>
              </div>

              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="bg-[#0A0F0C] p-4 rounded border border-white/10">
                  <h4 style={{ ...rowdies(700), fontSize: '0.9rem', color: '#E5B842', marginBottom: '0.5rem' }}>
                    Project Architectural Takeoff
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[#DBD0BD]" style={{ ...rowdies(300) }}>
                    <li><strong>Total Linear Footage:</strong> {footage} LF</li>
                    <li><strong>Finished Height:</strong> 6ft (72")</li>
                    <li><strong>Infill Pickets:</strong> 1x6 Clear Tight-Knot Western Red Cedar</li>
                    <li><strong>Post Specification:</strong> 4x4 Pressure Treated Ground Contact (36" Depth)</li>
                    <li><strong>Framing Rails:</strong> 2x4 Western Red Cedar (3-Rail Heavy Duty)</li>
                    <li><strong>Finish / Sealant:</strong> Factory Cedar Natural UV Pre-Stain</li>
                  </ul>
                </div>

                <div className="bg-[#0A0F0C] p-4 rounded border border-[#4ADE80]/30">
                  <h4 style={{ ...rowdies(700), fontSize: '0.9rem', color: '#4ADE80', marginBottom: '0.3rem' }}>
                    Si View ARC Compliance Status
                  </h4>
                  <p style={{ ...rowdies(300), fontSize: '0.8rem', color: '#FAF6EE', margin: 0 }}>
                    ✓ 100% compliant with Si View Section 4.2 guidelines. Approved for direct submittal to the Architectural Review Committee without modification.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 2: COMMUNITY */}
          {activeChapter === 1 && (
            <div className="space-y-4">
              <div className="bg-[#0A0F0C] p-6 rounded-lg border border-white/10">
                <h3 style={{ ...rowdies(700), fontSize: '1.1rem', color: '#E5B842', marginBottom: '0.5rem' }}>
                  Si View HOA (North Bend, WA) Bylaw Matrix
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mt-4">
                  <div className="bg-[#121814] p-3.5 rounded border border-white/5">
                    <strong className="text-[#4ADE80] block mb-1">Max Height Limit:</strong>
                    6ft for backyard perimeter; 4ft maximum for any front yard setback.
                  </div>
                  <div className="bg-[#121814] p-3.5 rounded border border-white/5">
                    <strong className="text-[#4ADE80] block mb-1">Approved Species:</strong>
                    Western Red Cedar only. Vinyl and chain link are strictly prohibited.
                  </div>
                  <div className="bg-[#121814] p-3.5 rounded border border-white/5">
                    <strong className="text-[#4ADE80] block mb-1">Facing Orientation:</strong>
                    Good street face must point outward towards neighboring parcels or rights-of-way.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHAPTER 3: MATERIALS LIST / BOM */}
          {activeChapter === 2 && (
            <div className="bg-[#0A0F0C] p-6 rounded-lg border border-white/10 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse" style={{ ...rowdies(300) }}>
                <thead>
                  <tr className="border-b border-white/20 text-[#E5B842]" style={{ ...rowdies(700) }}>
                    <th className="py-2.5 px-3">Item #</th>
                    <th className="py-2.5 px-3">Component Description</th>
                    <th className="py-2.5 px-3">Quantity</th>
                    <th className="py-2.5 px-3">Unit</th>
                    {!cleanMode && <th className="py-2.5 px-3 text-right">Est. Cost</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[#DBD0BD]">
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#4ADE80]">01</td>
                    <td className="py-2.5 px-3 font-bold text-white">4x4x9' Pressure Treated Posts (Ground Contact)</td>
                    <td className="py-2.5 px-3">16</td>
                    <td className="py-2.5 px-3">EA</td>
                    {!cleanMode && <td className="py-2.5 px-3 text-right">$576.00</td>}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#4ADE80]">02</td>
                    <td className="py-2.5 px-3 font-bold text-white">2x4x8' Western Red Cedar Rails (S4S)</td>
                    <td className="py-2.5 px-3">45</td>
                    <td className="py-2.5 px-3">EA</td>
                    {!cleanMode && <td className="py-2.5 px-3 text-right">$810.00</td>}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#4ADE80]">03</td>
                    <td className="py-2.5 px-3 font-bold text-white">1x6x6' Tight-Knot Western Red Cedar Pickets</td>
                    <td className="py-2.5 px-3">270</td>
                    <td className="py-2.5 px-3">EA</td>
                    {!cleanMode && <td className="py-2.5 px-3 text-right">$1,620.00</td>}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#4ADE80]">04</td>
                    <td className="py-2.5 px-3 font-bold text-white">Simpson Strong-Tie FB24 Fence Brackets (Galvanized)</td>
                    <td className="py-2.5 px-3">90</td>
                    <td className="py-2.5 px-3">EA</td>
                    {!cleanMode && <td className="py-2.5 px-3 text-right">$135.00</td>}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-mono text-[#4ADE80]">05</td>
                    <td className="py-2.5 px-3 font-bold text-white">50lb Quick-Set Concrete Bags</td>
                    <td className="py-2.5 px-3">32</td>
                    <td className="py-2.5 px-3">BAG</td>
                    {!cleanMode && <td className="py-2.5 px-3 text-right">$240.00</td>}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* CHAPTER 4: BLUEPRINT */}
          {activeChapter === 3 && (
            <div className="bg-[#10261A] border-2 border-[#141B16] rounded-lg p-6 flex flex-col items-center justify-center min-h-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ai-generated-fences/Rancher Fence Illustration.jpg"
                alt="Detailed Architectural Structural Flow"
                style={{ maxHeight: 300, maxWidth: '100%', objectFit: 'contain', filter: 'brightness(0.95)' }}
              />
              <span style={{ ...rowdies(400), fontSize: '0.78rem', color: '#A5D6A7', marginTop: '1rem' }}>
                Sheet B-01 · 1:24 Engineering Elevation &amp; Post Footing Geometry (80mph Mt. Si Wind Exposure B Rated)
              </span>
            </div>
          )}

          {/* CHAPTER 5: ADD-ONS */}
          {activeChapter === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#0A0F0C] p-4 rounded border border-white/10">
                <h4 style={{ ...rowdies(700), fontSize: '0.95rem', color: '#E5B842', marginBottom: '0.3rem' }}>
                  2x12 Ground Rot-Barrier Kickboard
                </h4>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#DBD0BD' }}>
                  Ground-contact treated lumber base elevates cedar pickets 2" above moist soil, doubling lifespan.
                </p>
              </div>
              <div className="bg-[#0A0F0C] p-4 rounded border border-white/10">
                <h4 style={{ ...rowdies(700), fontSize: '0.95rem', color: '#E5B842', marginBottom: '0.3rem' }}>
                  Custom 4ft Walk Gate Studio Kit
                </h4>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#DBD0BD' }}>
                  Internal diagonal anti-sag steel turnbuckle brace with self-closing heavy-duty black powder hinges.
                </p>
              </div>
            </div>
          )}

          {/* CHAPTER 6: PRICING LEDGER */}
          {activeChapter === 5 && (
            <div className="bg-[#0A0F0C] p-6 rounded-lg border border-white/10 space-y-4">
              <h3 style={{ ...rowdies(700), fontSize: '1.1rem', color: '#E5B842' }}>
                Itemized Construction Task Ledger (120 LF)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs" style={{ ...rowdies(300) }}>
                <div className="bg-[#121814] p-3 rounded border border-white/5">
                  <strong className="text-white block">Materials:</strong>
                  ${Math.round(totalEst * 0.45).toLocaleString()}
                </div>
                <div className="bg-[#121814] p-3 rounded border border-white/5">
                  <strong className="text-white block">Framing Labor:</strong>
                  ${Math.round(totalEst * 0.35).toLocaleString()}
                </div>
                <div className="bg-[#121814] p-3 rounded border border-white/5">
                  <strong className="text-white block">Site Prep &amp; Post Augering:</strong>
                  ${Math.round(totalEst * 0.12).toLocaleString()}
                </div>
                <div className="bg-[#121814] p-3 rounded border border-white/5">
                  <strong className="text-white block">Platform &amp; Admin:</strong>
                  ${Math.round(totalEst * 0.08).toLocaleString()}
                </div>
              </div>
            </div>
          )}

          {/* Sheet Footer Bar */}
          <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5B842]/30 text-xs text-[#A5D6A7]">
            <span>Page {activeChapter + 1} of {chapters.length}</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setActiveChapter((c) => Math.max(0, c - 1))}
                disabled={activeChapter === 0}
                className="bg-[#0E2417] border border-white/20 disabled:opacity-30 text-white px-3 py-1 rounded cursor-pointer"
              >
                &lt; Previous Sheet
              </button>
              <button
                type="button"
                onClick={() => setActiveChapter((c) => Math.min(chapters.length - 1, c + 1))}
                disabled={activeChapter === chapters.length - 1}
                className="bg-[#E5B842] text-[#141B16] font-bold px-3 py-1 rounded cursor-pointer"
              >
                Next Sheet &gt;
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
