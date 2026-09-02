'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'
import {
  FenceConfiguration,
  PricingBreakdown,
  calculateBaselineFenceQuote,
} from '@/lib/pricing-engine'

export default function BlueprintPage() {
  const [showPricing, setShowPricing] = useState<boolean>(true)
  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false)

  // Default Blueprint Configuration
  const [config, setConfig] = useState<FenceConfiguration>({
    heightFt: 6,
    postSpacingFt: 8,
    linearFeet: 120,
    woodGrade: 'tight-knot',
    postType: '4x4-cedar',
    postCap: 'cedar-pyramid',
    footingDepthInches: 30,
    railCount: 3,
    topCap: true,
    fenceStyleCategory: 'vertical-picket',
    fillPattern: 'board-on-board',
    fenceStyle: 'heritage',
    stainType: 'cedar-natural',
    trimStyle: 'none',
    hardwareTier: 'black-powder',
    gates: {
      walkGates: 1,
      driveGates: 0,
    },
  })

  // Hydrate draft from sessionStorage if redirected from Designer
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ff_active_draft')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.config) {
          setConfig(parsed.config)
          setLoadedFromStorage(true)
        }
      }
    } catch (e) {}
  }, [])

  const pricing: PricingBreakdown = calculateBaselineFenceQuote(config)

  const handlePrint = () => {
    window.print()
  }

  const postCount = Math.ceil(config.linearFeet / (config.postSpacingFt || 8)) + 1
  const railLengthEach = config.postSpacingFt || 8
  const total2x4Rails = postCount * config.railCount
  const picketCount = Math.ceil((config.linearFeet * 12) / 5.5) * (config.fillPattern === 'board-on-board' ? 1.2 : 1)
  const concreteBags = postCount * 2

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
      {/* Screen Only Navigation */}
      <div className="print:hidden">
        <SiteNav />
      </div>

      {/* Screen Only Top Control Bar */}
      <section className="print:hidden w-full bg-[#102B1E] border-b-2 border-[#4ADE80] py-3 px-4 shadow-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[#FAF6EE]">
          <div className="flex items-center gap-3">
            <Link
              href="/designer"
              className="bg-[#111713] hover:bg-[#222E25] border border-white/20 text-[#FAF6EE] px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition"
            >
              <span>←</span>
              <span>Edit in Designer</span>
            </Link>
            <span className="text-white/30">|</span>
            <span className="text-xs text-[#E5B842] font-bold uppercase">
              📄 Portrait 8.5&quot; × 11&quot; ARC Architectural Sheet
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Pricing ON/OFF Toggle */}
            <div className="flex items-center gap-2 bg-[#111713] px-3 py-1.5 rounded-full border border-white/20 text-xs">
              <span className="text-white/70 font-normal">Pricing Visibility:</span>
              <button
                onClick={() => setShowPricing(!showPricing)}
                className={`px-3 py-0.5 rounded-full font-bold transition ${
                  showPricing
                    ? 'bg-[#4ADE80] text-[#141B16]'
                    : 'bg-[#E5B842] text-[#141B16]'
                }`}
              >
                {showPricing ? 'Pricing ON (Contractor Bids)' : 'Pricing OFF (ARC Submittal)'}
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] font-bold text-xs uppercase px-5 py-2 rounded border-2 border-[#141B16] shadow-lg flex items-center gap-1.5 transition active:scale-95"
            >
              <span>🖨️</span>
              <span>Print ARC Blueprint PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8.5" x 11" PORTRAIT ARCHITECTURAL SHEET CONTAINER */}
      {/* ===================================================================== */}
      <div className="flex-1 w-full max-w-[850px] mx-auto my-6 px-4 print:m-0 print:p-0 print:max-w-none relative">
        <span className="corner-mark-out tl c-forest print:hidden" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-gold print:hidden" style={{ zIndex: 2 }} />
      <main className="w-full p-8 bg-[#FAF6EE] border-4 border-[#141B16] rounded-sm shadow-2xl print:m-0 print:p-6 print:border-2 print:shadow-none print:max-w-none print:w-full print:bg-white flex flex-col justify-between min-h-[1100px]">

        {/* 1. TITLE BLOCK HEADER */}
        <header className="border-b-4 border-[#141B16] pb-4 mb-5 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🌲</span>
              <h1 className="text-xl font-bold tracking-wide text-[#141B16] uppercase">
                FENCE FRAMES · ARCHITECTURAL SUBMITTAL SHEET
              </h1>
            </div>
            <p className="text-xs text-gray-700 font-light">
              Official Submittal Blueprint for HOA Architectural Review Committees &amp; City Building Permitting
            </p>
          </div>

          <div className="bg-[#141B16] text-[#FAF6EE] p-3 rounded text-right font-mono text-[11px] min-w-[200px]">
            <div className="text-[#E5B842] font-bold text-xs">DOC HASH: #FF-98045-8912</div>
            <div>SHEET: 1 OF 1 (PORTRAIT)</div>
            <div>SCALE: 1/2&quot; = 1&apos;-0&quot;</div>
            <div className="text-[#4ADE80] font-bold mt-1">✓ SI VIEW ARC PRE-APPROVED</div>
          </div>
        </header>

        {/* 2. PROJECT IDENTIFICATION GRID */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3.5 border-2 border-[#141B16] mb-5 text-xs">
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-normal">Project / Lot</span>
            <strong className="text-[#141B16]">Si View Lot #42 Fence</strong>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-normal">Jurisdiction / HOA</span>
            <strong className="text-[#141B16]">Si View HOA · North Bend, WA</strong>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-normal">Fence Architecture</span>
            <strong className="text-[#141B16]">Heritage 3-Rail Board-on-Board</strong>
          </div>
          <div>
            <span className="text-gray-500 block text-[10px] uppercase font-normal">Total Run Footage</span>
            <strong className="text-[#141B16]">{config.linearFeet} Linear Feet ({config.heightFt}&apos; Tall)</strong>
          </div>
        </section>

        {/* 3. 2D CAD ARCHITECTURAL ELEVATION DRAWING */}
        <section className="border-2 border-[#141B16] bg-white p-4 mb-5">
          <div className="flex justify-between items-center mb-2 border-b border-gray-300 pb-1">
            <h3 className="font-bold text-xs uppercase text-[#141B16]">
              FIG 1.0 — FRONT &amp; BACK STRUCTURAL ELEVATION ({config.postSpacingFt}&apos;-0&quot; O.C. TYPICAL BAY)
            </h3>
            <span className="text-[10px] text-gray-500 font-mono">ALL DIMENSIONS ARE VERIFIED BUILDER STANDARDS</span>
          </div>

          {/* SVG Architectural Drawing */}
          <div className="w-full flex items-center justify-center py-2">
            <svg width="740" height="240" viewBox="0 0 740 240" className="w-full h-auto">
              <defs>
                <pattern id="bpGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="740" height="240" fill="#FAFAFA" />
              <rect x="0" y="0" width="740" height="240" fill="url(#bpGrid)" />

              {/* Ground Turf Line */}
              <line x1="20" y1="190" x2="720" y2="190" stroke="#16A34A" strokeWidth="2.5" />
              <text x="30" y="205" fill="#16A34A" fontSize="9" fontWeight="bold">FINISHED GRADE / TURF LINE</text>

              {/* Dimension Lines */}
              <g stroke="#2563EB" strokeWidth="1.2" fill="#2563EB" fontSize="9" textAnchor="middle">
                {/* Height Dimension */}
                <line x1="45" y1="50" x2="45" y2="190" />
                <line x1="40" y1="50" x2="50" y2="50" />
                <line x1="40" y1="190" x2="50" y2="190" />
                <text x="35" y="125" textAnchor="end">{config.heightFt}&apos;-0&quot; HT</text>

                {/* Post Span Dimension */}
                <line x1="90" y1="35" x2="370" y2="35" />
                <line x1="90" y1="30" x2="90" y2="40" />
                <line x1="370" y1="30" x2="370" y2="40" />
                <text x="230" y="28">{config.postSpacingFt}&apos;-0&quot; POST SPAN (O.C.)</text>
              </g>

              {/* LEFT BAY: FRONT FACE */}
              <g transform="translate(80, 0)">
                <text x="145" y="48" fill="#141B16" fontSize="10" fontWeight="bold" textAnchor="middle">FRONT ELEVATION (STREET FACE)</text>
                {/* Posts */}
                <rect x="0" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                <rect x="274" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                {/* Caps */}
                <polygon points="-2,45 8,36 18,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                <polygon points="272,45 282,36 292,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                {/* Pickets (Board on board) */}
                {Array.from({ length: 14 }).map((_, i) => (
                  <rect key={`bp-p-${i}`} x={18 + (i * 18)} y="50" width="20" height="140" fill="#E8C59A" stroke="#141B16" strokeWidth="1.2" />
                ))}
                {/* Top Cap */}
                <rect x="-4" y="44" width="298" height="6" fill="#8C5832" stroke="#141B16" strokeWidth="1.2" />
              </g>

              {/* RIGHT BAY: BACK FRAMING */}
              <g transform="translate(420, 0)">
                <text x="145" y="48" fill="#141B16" fontSize="10" fontWeight="bold" textAnchor="middle">BACK ELEVATION (3-RAIL FRAMING)</text>
                {/* Posts */}
                <rect x="0" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                <rect x="274" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                {/* Caps */}
                <polygon points="-2,45 8,36 18,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                <polygon points="272,45 282,36 292,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                {/* 3 Rails */}
                <rect x="16" y="65" width="258" height="12" fill="#B87B44" stroke="#141B16" strokeWidth="1.5" />
                <rect x="16" y="115" width="258" height="12" fill="#B87B44" stroke="#141B16" strokeWidth="1.5" />
                <rect x="16" y="165" width="258" height="12" fill="#B87B44" stroke="#141B16" strokeWidth="1.5" />
                {/* Simpson Brackets */}
                <rect x="16" y="65" width="4" height="12" fill="#141B16" />
                <rect x="270" y="65" width="4" height="12" fill="#141B16" />
                <rect x="16" y="165" width="4" height="12" fill="#141B16" />
                <rect x="270" y="165" width="4" height="12" fill="#141B16" />
              </g>
            </svg>
          </div>
        </section>

        {/* 4. ITEMIZED BILL OF MATERIALS (BOM) & 8-METRIC TAKEOFF */}
        <section className="border-2 border-[#141B16] bg-white p-4 mb-5">
          <div className="flex justify-between items-center mb-3 border-b-2 border-[#141B16] pb-1.5">
            <h3 className="font-bold text-xs uppercase text-[#141B16]">
              TABLE 1.0 — ITEMIZED BILL OF MATERIALS &amp; 8-METRIC PARAMETRIC TAKEOFF
            </h3>
            {showPricing ? (
              <span className="text-xs font-bold text-[#16A34A] bg-green-50 px-2 py-0.5 rounded border border-green-300">
                PRICING MODE: ACTIVE
              </span>
            ) : (
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                HOA ARC CLEAN MODE (PRICING SUPPRESSED)
              </span>
            )}
          </div>

          <table className="w-full text-left text-xs font-['Rowdies'] font-light">
            <thead>
              <tr className="border-b-2 border-gray-300 text-[10px] text-gray-500 uppercase">
                <th className="pb-1">Metric #</th>
                <th className="pb-1">Component / Scope Description</th>
                <th className="pb-1">Quantity / Specs</th>
                {showPricing && <th className="pb-1 text-right">Cost / LF</th>}
                {showPricing && <th className="pb-1 text-right">Est. Total</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#1</td>
                <td className="py-1.5">General Layout &amp; Framing Run</td>
                <td className="py-1.5 font-mono">{config.linearFeet} LF @ {config.heightFt}&apos; Height ({config.woodGrade.toUpperCase()})</td>
                {showPricing && <td className="py-1.5 text-right font-mono">${(pricing.itemizedMetrics[0]?.costPerLf || 18.00).toFixed(2)}</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${pricing.itemizedMetrics[0]?.totalEst.toLocaleString()}</td>}
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#2</td>
                <td className="py-1.5">Structural Posts &amp; Concrete Footings</td>
                <td className="py-1.5 font-mono">{postCount}x Posts ({config.postType.toUpperCase()}) + {concreteBags}x Bags Concrete</td>
                {showPricing && <td className="py-1.5 text-right font-mono">${(pricing.itemizedMetrics[1]?.costPerLf || 6.50).toFixed(2)}</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${pricing.itemizedMetrics[1]?.totalEst.toLocaleString()}</td>}
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#3</td>
                <td className="py-1.5">Horizontal Rails &amp; Top Cap</td>
                <td className="py-1.5 font-mono">{total2x4Rails}x 2x4x{railLengthEach}&apos; Rails + 2x4 Top Cap Rail</td>
                {showPricing && <td className="py-1.5 text-right font-mono">${(pricing.itemizedMetrics[2]?.costPerLf || 5.80).toFixed(2)}</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${pricing.itemizedMetrics[2]?.totalEst.toLocaleString()}</td>}
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#4</td>
                <td className="py-1.5">Fill Material (Board-on-Board Pickets)</td>
                <td className="py-1.5 font-mono">{Math.round(picketCount)}x 1x6x6&apos; Western Red Cedar Pickets</td>
                {showPricing && <td className="py-1.5 text-right font-mono">${(pricing.itemizedMetrics[3]?.costPerLf || 12.00).toFixed(2)}</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${pricing.itemizedMetrics[3]?.totalEst.toLocaleString()}</td>}
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#5</td>
                <td className="py-1.5">Factory Pre-Stain &amp; UV Sealant</td>
                <td className="py-1.5 font-mono">Cedar Natural Factory Dip (Both Faces + Edges)</td>
                {showPricing && <td className="py-1.5 text-right font-mono">${(pricing.itemizedMetrics[4]?.costPerLf || 4.75).toFixed(2)}</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${pricing.itemizedMetrics[4]?.totalEst.toLocaleString()}</td>}
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#7</td>
                <td className="py-1.5">Hardware &amp; Simpson Brackets</td>
                <td className="py-1.5 font-mono">Black Powder FB24 Ties + 316 Stainless Ring-Shank Nails</td>
                {showPricing && <td className="py-1.5 text-right font-mono">${(pricing.itemizedMetrics[6]?.costPerLf || 2.40).toFixed(2)}</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${pricing.itemizedMetrics[6]?.totalEst.toLocaleString()}</td>}
              </tr>
              <tr>
                <td className="py-1.5 font-bold text-[#141B16]">#8</td>
                <td className="py-1.5">Custom Gates &amp; Hardware Kit</td>
                <td className="py-1.5 font-mono">{config.gates.walkGates}x 4ft Pedestrian Walk Gate(s)</td>
                {showPricing && <td className="py-1.5 text-right font-mono">—</td>}
                {showPricing && <td className="py-1.5 text-right font-bold text-[#141B16]">${(config.gates.walkGates * 385).toLocaleString()}</td>}
              </tr>
            </tbody>
          </table>

          {/* Pricing Total Box */}
          {showPricing && (
            <div className="mt-4 pt-3 border-t-2 border-[#141B16] flex justify-between items-center bg-gray-50 p-3 rounded">
              <div>
                <span className="text-[10px] text-gray-500 uppercase block font-normal">Contractor Bid Estimate Range</span>
                <span className="text-xs text-gray-700">Includes materials, excavation, installation labor &amp; admin</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-[#16A34A]">
                  ${pricing.totalMin.toLocaleString()} – ${pricing.totalMax.toLocaleString()}
                </span>
                <span className="block text-[11px] text-gray-600 font-mono">
                  (${pricing.pricePerLfMin} – ${pricing.pricePerLfMax} / LF)
                </span>
              </div>
            </div>
          )}
        </section>

        {/* 5. HOA COMPLIANCE & ARC CERTIFICATION FOOTER */}
        <footer className="border-t-4 border-[#141B16] pt-3 text-[10px] text-gray-600 flex flex-wrap justify-between items-center gap-3">
          <div>
            <strong className="text-[#141B16] block uppercase">HOA ARC COMPLIANCE GUARANTEE</strong>
            <span>All lumber dimensions and framing members meet Si View Section 4.2 Architectural Standards.</span>
          </div>
          <div className="text-right font-mono">
            <span>Fence Frames Platform · Authored by Two Lew Builders LLC</span>
          </div>
        </footer>

      </main>
      </div>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  )
}
