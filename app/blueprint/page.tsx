'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { MembershipGate } from '@/components/ff/membership-gate'
import { SiteShell } from '@/components/ff/site-shell'
import {
  FenceConfiguration,
  PricingBreakdown,
  calculateBaselineFenceQuote,
} from '@/lib/pricing-engine'
import { BomCalculationResult, SupportedVendor } from '@/lib/bom-engine'

const SECTIONS = [
  { id: 'visual', short: 'Visual', full: 'Visual Blueprint' },
  { id: 'material', short: 'Material', full: 'Material Cost' },
  { id: 'labor', short: 'Labor', full: 'Labor Estimate' },
  { id: 'total', short: 'Total', full: 'Final Price' },
] as const

function FenceFolioPageInner() {
  const [showPricing, setShowPricing] = useState(true)
  const [loadedFromStorage, setLoadedFromStorage] = useState(false)

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

  const [bomData, setBomData] = useState<BomCalculationResult | null>(null)
  const [selectedVendor, setSelectedVendor] = useState<SupportedVendor | 'cheapest'>('homeDepot')

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('ff_active_draft')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.config) {
          setConfig(parsed.config)
          setLoadedFromStorage(true)
        }
        if (parsed.bomData) {
          setBomData(parsed.bomData)
        }
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    let isCancelled = false;
    fetch('/api/bom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config, vendor: selectedVendor }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data?.success && data?.data) {
          setBomData(data.data)
        }
      })
      .catch((err) => console.error('Error fetching BOM for blueprint:', err));

    return () => {
      isCancelled = true;
    };
  }, [config, selectedVendor])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fromQuery = new URLSearchParams(window.location.search).get('section')
    const fromHash = window.location.hash.replace('#', '')
    const target = fromQuery || fromHash
    if (!target) return
    const el = document.getElementById(target)
    if (el) {
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [loadedFromStorage])

  const pricing: PricingBreakdown = calculateBaselineFenceQuote(config)

  const handlePrint = () => {
    window.print()
  }

  const postCount = Math.ceil(config.linearFeet / (config.postSpacingFt || 8)) + 1
  const railLengthEach = config.postSpacingFt || 8
  const total2x4Rails = postCount * config.railCount
  const picketCount =
    Math.ceil((config.linearFeet * 12) / 5.5) *
    (config.fillPattern === 'board-on-board' ? 1.2 : 1)
  const concreteBags = postCount * 2

  const materialRows = pricing.itemizedMetrics.filter(
    (m) => m.category === 'Materials' || m.category === 'Gates',
  )
  const materialMid = Math.round(
    (pricing.materialsCostMin + pricing.materialsCostMax) / 2,
  )
  const laborMid = Math.round((pricing.laborCostMin + pricing.laborCostMax) / 2)
  const adminMid = pricing.adminPermitCost
  const totalMid = Math.round((pricing.totalMin + pricing.totalMax) / 2)

  return (
    <SiteShell
      width="hub"
      printHideChrome
      contained={false}
      bleed={
        <section className="bg-[#102B1E] border-2 border-[#141B16] rounded-md py-3 px-4 shadow-xl sticky top-0 z-40 print:hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[#FAF6EE]">
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/designer"
                className="bg-[#111713] hover:bg-[#222E25] border border-white/20 text-[#FAF6EE] px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition"
              >
                <span>←</span>
                <span>Back to Design</span>
              </Link>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-xs text-[#4ADE80] font-bold uppercase tracking-wide">
                Fence-Folio
              </span>
              {loadedFromStorage && (
                <span className="text-[10px] text-[#E5B842]/80 font-light">Draft loaded</span>
              )}
            </div>

            <nav
              className="flex items-center gap-1.5 flex-wrap"
              aria-label="Fence-Folio sections"
            >
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide bg-[#111713] border border-white/15 text-[#FAF6EE]/80 hover:text-[#E5B842] hover:border-[#E5B842]/50 transition"
                  title={s.full}
                >
                  <span className="sm:hidden">{s.short}</span>
                  <span className="hidden sm:inline">{s.full}</span>
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#111713] px-3 py-1.5 rounded-full border border-white/20 text-xs">
                <span className="text-white/70 font-light">Pricing:</span>
                <button
                  type="button"
                  onClick={() => setShowPricing(!showPricing)}
                  className={`px-3 py-0.5 rounded-full font-bold transition ${
                    showPricing
                      ? 'bg-[#4ADE80] text-[#141B16]'
                      : 'bg-[#E5B842] text-[#141B16]'
                  }`}
                >
                  {showPricing ? 'ON' : 'OFF (ARC)'}
                </button>
              </div>

              <button
                type="button"
                onClick={handlePrint}
                className="bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] font-bold text-xs uppercase px-5 py-2 rounded border-2 border-[#141B16] shadow-lg flex items-center gap-1.5 transition active:scale-95"
              >
                <span>Print Letter PDF</span>
              </button>
            </div>
          </div>
        </section>
      }
    >
      <div className="w-full relative print:m-0 print:p-0">
        <span className="corner-mark-out tl c-forest print:hidden" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-gold print:hidden" style={{ zIndex: 2 }} />

        <div className="w-full space-y-6 sm:space-y-8 print:space-y-4">
          {/* Header plate */}
          <header className="bg-[#FAF6EE] border-2 border-[#141B16] rounded-sm shadow-lg p-5 sm:p-8 print:shadow-none print:border print:p-4">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-[#141B16] pb-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#16432D]/70 font-bold mb-1">
                  Fence Frames · Output Packet
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-[#141B16]">
                  Fence-Folio
                </h1>
                <p className="text-sm text-gray-700 font-light mt-1 max-w-xl">
                  Your fence look, what to buy, install labor, and one combined estimate — ready for
                  HOA review or contractor bids.
                </p>
              </div>
              <div className="bg-[#141B16] text-[#FAF6EE] p-3 rounded text-right font-mono text-[11px] min-w-[180px]">
                <div className="text-[#E5B842] font-bold text-xs">DOC #FF-98045-8912</div>
                <div>
                  {config.linearFeet} LF · {config.heightFt}&apos; Heritage
                </div>
                <div className="text-[#4ADE80] font-bold mt-1">Si View ARC Ready</div>
              </div>
            </div>

            <section className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white p-3.5 border border-[#141B16]/30 text-xs">
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-light">Project</span>
                <strong className="text-[#141B16]">Si View Lot Fence</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-light">Community</span>
                <strong className="text-[#141B16]">Si View HOA · North Bend, WA</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-light">Style</span>
                <strong className="text-[#141B16]">Heritage Board-on-Board</strong>
              </div>
              <div>
                <span className="text-gray-500 block text-[10px] uppercase font-light">Run</span>
                <strong className="text-[#141B16]">
                  {config.linearFeet} LF · {config.heightFt}&apos; tall
                </strong>
              </div>
            </section>
          </header>

          {/* 1. VISUAL */}
          <section
            id="visual"
            className="scroll-mt-28 bg-[#FAF6EE] border-2 border-[#141B16] rounded-sm shadow-lg p-5 sm:p-6 print:shadow-none print:break-inside-avoid"
          >
            <div className="flex justify-between items-center mb-3 border-b border-[#141B16]/20 pb-2 gap-2 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#16432D]/60 font-bold">
                  Visual
                </p>
                <h2 className="font-bold text-base sm:text-lg uppercase text-[#141B16]">
                  Visual Blueprint
                </h2>
              </div>
              <span className="text-[10px] text-gray-500 font-mono">
                Front &amp; back · {config.postSpacingFt}&apos;-0&quot; typical bay
              </span>
            </div>

            <div className="w-full flex items-center justify-center py-2 bg-white border border-[#141B16]/15 rounded">
              <svg
                viewBox="0 0 740 240"
                className="w-full h-auto max-h-[420px]"
                role="img"
                aria-label="Fence front and back visual"
              >
                <defs>
                  <pattern id="ffFolioGrid" width="16" height="16" patternUnits="userSpaceOnUse">
                    <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E5E7EB" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="740" height="240" fill="#FAFAFA" />
                <rect x="0" y="0" width="740" height="240" fill="url(#ffFolioGrid)" />

                <line x1="20" y1="190" x2="720" y2="190" stroke="#16A34A" strokeWidth="2.5" />
                <text x="30" y="205" fill="#16A34A" fontSize="9" fontWeight="bold">
                  GROUND LINE
                </text>

                <g stroke="#2563EB" strokeWidth="1.2" fill="#2563EB" fontSize="9" textAnchor="middle">
                  <line x1="45" y1="50" x2="45" y2="190" />
                  <line x1="40" y1="50" x2="50" y2="50" />
                  <line x1="40" y1="190" x2="50" y2="190" />
                  <text x="35" y="125" textAnchor="end">
                    {config.heightFt}&apos;-0&quot;
                  </text>
                  <line x1="90" y1="35" x2="370" y2="35" />
                  <line x1="90" y1="30" x2="90" y2="40" />
                  <line x1="370" y1="30" x2="370" y2="40" />
                  <text x="230" y="28">
                    {config.postSpacingFt}&apos;-0&quot; POST SPAN
                  </text>
                </g>

                <g transform="translate(80, 0)">
                  <text
                    x="145"
                    y="48"
                    fill="#141B16"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    FRONT (STREET SIDE)
                  </text>
                  <rect x="0" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                  <rect x="274" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                  <polygon points="-2,45 8,36 18,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                  <polygon points="272,45 282,36 292,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                  {Array.from({ length: 14 }).map((_, i) => (
                    <rect
                      key={`v-p-${i}`}
                      x={18 + i * 18}
                      y="50"
                      width="20"
                      height="140"
                      fill="#E8C59A"
                      stroke="#141B16"
                      strokeWidth="1.2"
                    />
                  ))}
                  <rect x="-4" y="44" width="298" height="6" fill="#8C5832" stroke="#141B16" strokeWidth="1.2" />
                </g>

                <g transform="translate(420, 0)">
                  <text
                    x="145"
                    y="48"
                    fill="#141B16"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    BACK (YARD SIDE)
                  </text>
                  <rect x="0" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                  <rect x="274" y="45" width="16" height="145" fill="#D49B5B" stroke="#141B16" strokeWidth="1.5" />
                  <polygon points="-2,45 8,36 18,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                  <polygon points="272,45 282,36 292,45" fill="#B87B44" stroke="#141B16" strokeWidth="1.2" />
                  <rect x="16" y="65" width="258" height="12" fill="#B87B44" stroke="#141B16" strokeWidth="1.5" />
                  <rect x="16" y="115" width="258" height="12" fill="#B87B44" stroke="#141B16" strokeWidth="1.5" />
                  <rect x="16" y="165" width="258" height="12" fill="#B87B44" stroke="#141B16" strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </section>

          {/* 2. MATERIAL */}
          <section
            id="material"
            className="scroll-mt-28 bg-[#FAF6EE] border-2 border-[#141B16] rounded-sm shadow-lg p-5 sm:p-6 print:shadow-none print:break-inside-avoid"
          >
            <div className="flex justify-between items-center mb-3 border-b-2 border-[#141B16] pb-2 gap-2 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#16432D]/60 font-bold">
                  Material
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="font-bold text-base sm:text-lg uppercase text-[#141B16]">
                    Material Cost &amp; BOM Takeoff
                  </h2>
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                    33.33% Fastener Waste Buffer Active
                  </span>
                </div>
              </div>
              {showPricing ? (
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Multi-vendor selector */}
                  <div className="flex items-center gap-1 bg-[#141B16]/5 p-0.5 rounded border border-[#141B16]/20 text-[10px] font-mono print:hidden">
                    {(['homeDepot', 'lowes', 'dunnLumber', 'chinook', 'cheapest'] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => setSelectedVendor(v)}
                        className={`px-2 py-0.5 rounded transition ${
                          selectedVendor === v
                            ? 'bg-[#141B16] text-[#FAF6EE] font-bold'
                            : 'text-[#141B16]/70 hover:text-[#141B16]'
                        }`}
                      >
                        {v === 'homeDepot' ? 'HD' : v === 'lowes' ? "Lowe's" : v === 'dunnLumber' ? 'Dunn' : v === 'chinook' ? 'Chinook' : 'Low'}
                      </button>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-[#16432D]">
                    ${(bomData ? bomData.totals.mBurdenedUsd : pricing.materialsCostMin).toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                  Quantities only (pricing hidden)
                </span>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light">
                <thead>
                  <tr className="border-b-2 border-gray-300 text-[10px] text-gray-500 uppercase">
                    <th className="pb-1 pr-2">Item / Specification</th>
                    <th className="pb-1 pr-2">Category</th>
                    <th className="pb-1 text-center">Qty / Spec</th>
                    {showPricing && <th className="pb-1 text-right">Unit Price</th>}
                    {showPricing && <th className="pb-1 text-right">Est. Total</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bomData?.items && bomData.items.length > 0 ? (
                    bomData.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-amber-50/50">
                        <td className="py-2 font-bold text-[#141B16]">
                          <div>{item.displayName}</div>
                          <div className="text-[10px] text-gray-500 font-mono font-normal">
                            {item.calcNotes}
                          </div>
                        </td>
                        <td className="py-2 text-gray-600 capitalize">{item.category}</td>
                        <td className="py-2 text-center font-mono">
                          <span className="font-bold">
                            {item.bufferedQuantity} {item.unit}
                          </span>
                          {item.wastePercent > 0 && (
                            <span className="ml-1 text-[9px] text-amber-700 font-bold bg-amber-100 px-1 py-0.5 rounded">
                              +33.33% buffer
                            </span>
                          )}
                        </td>
                        {showPricing && (
                          <td className="py-2 text-right font-mono text-gray-700">
                            ${item.selectedUnitPrice.toFixed(2)}
                          </td>
                        )}
                        {showPricing && (
                          <td className="py-2 text-right font-bold font-mono text-[#141B16]">
                            ${item.lineTotalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr>
                        <td className="py-2 font-bold text-[#141B16]">Posts</td>
                        <td className="py-2">Structural posts &amp; concrete</td>
                        <td className="py-2 font-mono text-center">{postCount} posts · {concreteBags} bags</td>
                        {showPricing && <td className="py-2 text-right font-mono">—</td>}
                        {showPricing && (
                          <td className="py-2 text-right font-bold font-mono">
                            ${materialRows[1]?.totalEst.toLocaleString() ?? '—'}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-[#141B16]">Rails</td>
                        <td className="py-2">Horizontal rails &amp; top cap</td>
                        <td className="py-2 font-mono text-center">{total2x4Rails}× 2x4×{railLengthEach}&apos;</td>
                        {showPricing && <td className="py-2 text-right font-mono">—</td>}
                        {showPricing && (
                          <td className="py-2 text-right font-bold font-mono">
                            ${materialRows[2]?.totalEst.toLocaleString() ?? '—'}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className="py-2 font-bold text-[#141B16]">Pickets</td>
                        <td className="py-2">Board-on-board fill</td>
                        <td className="py-2 font-mono text-center">{Math.round(picketCount)}× 1x6×6&apos; cedar</td>
                        {showPricing && <td className="py-2 text-right font-mono">—</td>}
                        {showPricing && (
                          <td className="py-2 text-right font-bold font-mono">
                            ${materialRows[3]?.totalEst.toLocaleString() ?? '—'}
                          </td>
                        )}
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {showPricing && (
              <div className="mt-4 pt-3 border-t border-[#141B16]/20 flex justify-between items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase text-gray-500 font-bold">
                  Raw Material Cost (MC)
                  {bomData && ` · ${selectedVendor === 'homeDepot' ? 'Home Depot' : selectedVendor === 'lowes' ? "Lowe's" : selectedVendor === 'dunnLumber' ? 'Dunn Lumber' : selectedVendor === 'chinook' ? 'Chinook Lumber' : 'Lowest Multi-Vendor'}`}
                </span>
                <div className="text-right">
                  <span className="text-lg font-bold text-[#141B16] font-mono">
                    ${(bomData ? bomData.totals.mcUsd : materialMid).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-gray-500 block">
                    Burdened M (1.25×): ${(bomData ? bomData.totals.mBurdenedUsd : Math.round(materialMid * 1.25)).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* 3. LABOR */}
          <section
            id="labor"
            className="scroll-mt-28 bg-[#FAF6EE] border-2 border-[#141B16] rounded-sm shadow-lg p-5 sm:p-6 print:shadow-none print:break-inside-avoid"
          >
            <div className="flex justify-between items-center mb-3 border-b-2 border-[#141B16] pb-2 gap-2 flex-wrap">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#16432D]/60 font-bold">
                  Labor
                </p>
                <h2 className="font-bold text-base sm:text-lg uppercase text-[#141B16]">
                  Labor Estimate
                </h2>
              </div>
              {showPricing ? (
                <span className="text-sm font-bold text-[#16432D]">
                  ${pricing.laborCostMin.toLocaleString()} – $
                  {pricing.laborCostMax.toLocaleString()}
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                  Hidden for ARC clean mode
                </span>
              )}
            </div>

            <p className="text-sm text-gray-700 font-light mb-4">
              Install work kept separate from materials so you can see what you are buying versus
              what it costs to put the fence in the ground.
            </p>

            {showPricing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#E8F5EE] p-4 rounded border border-[#4ADE80]/25">
                  <strong className="text-[#16432D] block mb-1">Site prep &amp; posts</strong>
                  <span className="text-[#1A1A1A] font-light">
                    Digging, setting posts, concrete cure time for {postCount} posts.
                  </span>
                </div>
                <div className="bg-[#E8F5EE] p-4 rounded border border-[#4ADE80]/25">
                  <strong className="text-[#16432D] block mb-1">Framing &amp; hang</strong>
                  <span className="text-[#1A1A1A] font-light">
                    Rails, pickets, gates, and finish for {config.linearFeet} LF.
                  </span>
                </div>
                <div className="sm:col-span-2 mt-1 pt-3 border-t border-[#141B16]/15 flex justify-between items-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Labor subtotal</span>
                  <span className="text-lg font-bold text-[#141B16]">~${laborMid.toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-600 font-light">
                Turn pricing ON to see the labor range for contractor bidding.
              </p>
            )}
          </section>

          {/* FINAL PRICE */}
          <section
            id="total"
            className="scroll-mt-28 bg-[#102B1E] border-2 border-[#141B16] rounded-sm shadow-lg p-5 sm:p-8 text-[#FAF6EE] print:shadow-none print:break-inside-avoid print:bg-white print:text-[#141B16]"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#4ADE80] font-bold print:text-[#16432D]">
                  Fence-Folio
                </p>
                <h2 className="font-bold text-xl sm:text-2xl uppercase text-[#4ADE80] print:text-[#141B16]">
                  Final Price
                </h2>
                <p className="text-sm font-light text-[#DBD0BD] mt-1 max-w-md print:text-gray-600">
                  Material + labor rolled into one estimate. Range is about ±15% for real-world bids.
                </p>
              </div>
              {showPricing && (
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-[#4ADE80] print:text-[#16A34A]">
                    ${pricing.totalMin.toLocaleString()} – ${pricing.totalMax.toLocaleString()}
                  </div>
                  <div className="text-xs font-mono text-[#DBD0BD] print:text-gray-600 mt-1">
                    ~${totalMid.toLocaleString()} mid · ${pricing.pricePerLfMin}–$
                    {pricing.pricePerLfMax} / LF
                  </div>
                </div>
              )}
            </div>

            {showPricing && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-black/30 print:bg-gray-50 p-3 rounded border border-white/10 print:border-gray-200">
                  <span className="text-[#E5B842] print:text-[#16432D] font-bold uppercase text-[10px] block mb-1">
                    Material
                  </span>
                  <span className="text-lg font-bold">~${materialMid.toLocaleString()}</span>
                </div>
                <div className="bg-black/30 print:bg-gray-50 p-3 rounded border border-white/10 print:border-gray-200">
                  <span className="text-[#E5B842] print:text-[#16432D] font-bold uppercase text-[10px] block mb-1">
                    Labor
                  </span>
                  <span className="text-lg font-bold">~${laborMid.toLocaleString()}</span>
                </div>
                <div className="bg-black/30 print:bg-gray-50 p-3 rounded border border-white/10 print:border-gray-200">
                  <span className="text-[#E5B842] print:text-[#16432D] font-bold uppercase text-[10px] block mb-1">
                    Admin / overhead
                  </span>
                  <span className="text-lg font-bold">~${adminMid.toLocaleString()}</span>
                </div>
              </div>
            )}

            {!showPricing && (
              <p className="text-sm font-light text-[#DBD0BD] print:text-gray-600">
                Pricing hidden for a clean ARC submittal. Quantities stay in Material above.
              </p>
            )}

            <footer className="mt-6 pt-4 border-t border-white/20 print:border-gray-300 text-[10px] text-[#DBD0BD] print:text-gray-600 flex flex-wrap justify-between gap-3">
              <div>
                <strong className="text-[#FAF6EE] print:text-[#141B16] block uppercase">
                  HOA note
                </strong>
                Specs meet Si View Section 4.2 architectural standards for review.
              </div>
              <div className="text-right font-mono">Fence Frames · Two Lew Builders LLC</div>
            </footer>
          </section>
        </div>
      </div>
    </SiteShell>
  )
}

export default function FenceFolioPage() {
  return (
    <MembershipGate next="/blueprint">
      <FenceFolioPageInner />
    </MembershipGate>
  )
}
