'use client'

import React, { useState, useRef } from 'react'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'

interface BottomCarouselHudProps {
  config: FenceConfiguration;
  pricing: PricingBreakdown;
  trialPricing?: PricingBreakdown;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  onResetDefaults: () => void;
  onSaveToFolio: () => void;
  onOpenLedgerModal?: () => void;
}

export function BottomCarouselHud({
  config,
  pricing,
  trialPricing,
  onChange,
  onResetDefaults,
  onSaveToFolio,
  onOpenLedgerModal,
}: BottomCarouselHudProps) {
  const [activeMathModel, setActiveMathModel] = useState<'canonical' | 'trial'>('canonical')
  const [showLaborDetail, setShowLaborDetail] = useState<boolean>(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const activePricing = activeMathModel === 'trial' && trialPricing ? trialPricing : pricing

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <footer className="w-full bg-[#141B16] border-t-[2.5px] border-[#1A1A1A] p-2 md:p-3 flex-shrink-0 z-40 shadow-2xl font-['Rowdies'] relative select-none">
      <div className="max-w-[1560px] mx-auto flex items-center gap-2">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => scrollCarousel('left')}
          className="hidden sm:flex w-8 h-full min-h-[90px] bg-[#1C241E] hover:bg-[#253328] text-white/70 hover:text-[#E5B842] border border-white/10 rounded-[4px] items-center justify-center text-sm transition flex-shrink-0"
          title="Scroll Left"
        >
          ◀
        </button>

        {/* Endless Horizontal Card Carousel Track */}
        <div
          ref={carouselRef}
          className="flex-1 flex items-stretch gap-3 overflow-x-auto cad-scrollbar scroll-smooth py-1 px-1"
        >

          {/* CARD 1: PRICING CALCULATOR (Primary Card as in Mockup) */}
          <div className="min-w-[340px] sm:min-w-[380px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-[5px] p-2.5 shadow-md flex flex-col justify-between flex-shrink-0 has-outside-corners relative">
            <div className="corner-mark-out tl" />
            <div className="corner-mark-out br" />

            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                <span className="font-bold text-[#E5B842] uppercase tracking-wide">
                  Pricing Calculator
                </span>
              </div>

              {/* Math Model Toggle */}
              <div className="flex bg-[#141B16] p-0.5 rounded border border-white/10 text-[9px]">
                <button
                  onClick={() => setActiveMathModel('canonical')}
                  className={`px-1.5 py-0.5 rounded transition ${
                    activeMathModel === 'canonical' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/60'
                  }`}
                >
                  Canon (2×M)
                </button>
                <button
                  onClick={() => setActiveMathModel('trial')}
                  className={`px-1.5 py-0.5 rounded transition ${
                    activeMathModel === 'trial' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/60'
                  }`}
                >
                  Trial (Per-Part)
                </button>
              </div>
            </div>

            {/* Slider & Presets */}
            <div className="py-2 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] text-white/70 font-light">Total Linear Feet:</span>
                <span className="text-xs font-bold text-white bg-[#141B16] px-2 py-0.5 rounded border border-white/15">
                  {config.linearFeet} LF
                </span>
              </div>

              <input
                type="range"
                min="8"
                max="300"
                step="1"
                value={config.linearFeet}
                onChange={(e) => onChange({ linearFeet: Number(e.target.value) })}
                className="w-full h-1.5 bg-[#141B16] rounded-lg appearance-none cursor-pointer accent-[#F27A22]"
              />

              <div className="flex items-center gap-1">
                {[8, 48, 96, 120, 200].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => onChange({ linearFeet: preset })}
                    className={`px-1.5 py-0.5 text-[9px] rounded border transition ${
                      config.linearFeet === preset
                        ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                        : 'bg-[#141B16] hover:bg-[#F27A22] hover:text-white text-white/80 border-white/10'
                    }`}
                  >
                    {preset === 8 ? '8 LF (Bay)' : `${preset} LF`}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimate Readout */}
            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[9px] text-[#DBD0BD] uppercase font-light block">
                  Estimate (±15% Range)
                </span>
                <span className="text-sm font-bold text-[#4ADE80]">
                  ${activePricing.totalMin.toLocaleString()} — ${activePricing.totalMax.toLocaleString()}
                </span>
              </div>

              <span className="text-[9px] text-white/60 font-mono">
                ${activePricing.pricePerLfMin.toFixed(2)}/LF
              </span>
            </div>
          </div>

          {/* CARD 2: YOUR JOB SPECS (Blueprint Specs) */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-[5px] p-2.5 shadow-md flex flex-col justify-between flex-shrink-0 has-outside-corners">
            <div className="corner-mark-out tl" />
            <div className="corner-mark-out br" />

            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs">
              <span className="font-bold text-[#E5B842] uppercase tracking-wide">
                Your Job Specs
              </span>
              <span className="text-[9px] text-[#4ADE80] font-mono">PASSED ARC-01</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 py-2 text-[10px] text-white/80">
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-white/40 block text-[8px]">HEIGHT / BAY</span>
                <span className="font-bold text-[#E5B842]">{config.heightFt}&apos; Finished · {config.postSpacingFt}&apos; Bay</span>
              </div>
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-white/40 block text-[8px]">POST SPEC</span>
                <span className="font-bold text-white">{config.postType.split('-')[0].toUpperCase()} ({config.postCap})</span>
              </div>
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-white/40 block text-[8px]">RAILS &amp; TOP CAP</span>
                <span className="font-bold text-white">{config.railCount}-Rail 2x4 {config.topCap ? '+ 2x6 Cap' : ''}</span>
              </div>
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-white/40 block text-[8px]">PICKET INFILL</span>
                <span className="font-bold text-[#4ADE80]">{config.fillPattern === 'board-on-board' ? 'Board-on-Board' : 'Standard'}</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-white/60">
              <span>Finish: <strong className="text-white">{config.stainType.replace('-', ' ')}</strong></span>
              <span>Gates: <strong className="text-[#E5B842]">{config.gates?.walkGates || 0} Walk</strong></span>
            </div>
          </div>

          {/* CARD 3: SAVE TO FOLIO & CONTRACTOR 3-BID */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-[5px] p-2.5 shadow-md flex flex-col justify-between flex-shrink-0 has-outside-corners">
            <div className="corner-mark-out tl" />
            <div className="corner-mark-out br" />

            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs">
              <span className="font-bold text-[#4ADE80] uppercase tracking-wide">
                Save &amp; Contractor Dispatch
              </span>
              <span className="text-[9px] text-[#E5B842] font-mono">DRAFT ACTIVE</span>
            </div>

            <div className="py-2 text-[10px] text-white/70 space-y-1">
              <p>Lock your 2D submittal blueprint and get 3 matched local contractor bids with 72-hr price lock.</p>
              <div className="flex items-center gap-2 text-[9px] text-white/50">
                <span>🛡️ 72-Hour Refund Guarantee</span>
                <span>📋 HOA Ready</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-white/10 flex items-center gap-2">
              <button
                onClick={onResetDefaults}
                className="px-2 py-1 bg-[#141B16] hover:bg-white/10 text-white/70 hover:text-white text-[10px] rounded border border-white/15"
                title="Restore Heritage 8 LF blank default"
              >
                ↺ Reset
              </button>
              <button
                onClick={onSaveToFolio}
                className="flex-1 btn-chamfer bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] font-bold text-xs py-1.5 border border-[#1A1A1A] transition text-center shadow-md"
              >
                Save to Folio →
              </button>
            </div>
          </div>

          {/* CARD 4: MATERIAL & LABOR LEDGER SUMMARY */}
          <div className="min-w-[280px] sm:min-w-[320px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-[5px] p-2.5 shadow-md flex flex-col justify-between flex-shrink-0 has-outside-corners">
            <div className="corner-mark-out tl" />
            <div className="corner-mark-out br" />

            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-xs">
              <span className="font-bold text-[#E5B842] uppercase tracking-wide">
                Material &amp; Labor Takeoff
              </span>
              <button
                onClick={onOpenLedgerModal}
                className="text-[9px] text-[#F27A22] hover:underline font-bold"
              >
                View Full BOM ↗
              </button>
            </div>

            <div className="grid grid-cols-3 gap-1 py-2 text-center text-[10px]">
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-[8px] text-white/40 block">BURDENED MAT</span>
                <span className="font-bold text-white">${activePricing.materialsCostMin}</span>
              </div>
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-[8px] text-white/40 block">LABOR COST</span>
                <span className="font-bold text-[#E5B842]">${activePricing.laborCostMin}</span>
              </div>
              <div className="p-1 bg-[#141B16] rounded border border-white/5">
                <span className="text-[8px] text-white/40 block">ADMIN / HOA</span>
                <span className="font-bold text-[#4ADE80]">${activePricing.adminPermitCost}</span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-white/50">
              <span>BOM Parts: {Math.ceil(config.linearFeet / 8) + 1} Posts · {config.linearFeet * 2} Pickets</span>
              <span className="text-[#4ADE80]">Synced to Canvas</span>
            </div>
          </div>

        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => scrollCarousel('right')}
          className="hidden sm:flex w-8 h-full min-h-[90px] bg-[#1C241E] hover:bg-[#253328] text-white/70 hover:text-[#E5B842] border border-white/10 rounded-[4px] items-center justify-center text-sm transition flex-shrink-0"
          title="Scroll Right"
        >
          ▶
        </button>

      </div>
    </footer>
  )
}
