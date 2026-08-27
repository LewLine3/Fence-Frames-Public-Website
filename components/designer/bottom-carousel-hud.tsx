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
  const carouselRef = useRef<HTMLDivElement>(null)

  const activePricing = activeMathModel === 'trial' && trialPricing ? trialPricing : pricing

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <footer
      className="w-full bg-[#141B16] border-t-[2px] border-t-[#E5B842] p-2 flex-shrink-0 z-20 shadow-[0_-4px_15px_rgba(0,0,0,0.5)] font-['Rowdies'] select-none flex items-center gap-2"
      style={{
        backgroundColor: '#141B16',
        backgroundImage:
          'linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px), linear-gradient(rgba(229, 184, 66, 0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(229, 184, 66, 0.15) 2px, transparent 2px)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0',
      }}
    >
      
      {/* Left Chevron Button */}
      <button
        onClick={() => scrollCarousel('left')}
        className="hidden sm:flex w-8 h-[96px] bg-[#1C241E] hover:bg-[#253328] text-white/70 hover:text-[#E5B842] border border-white/10 rounded-xl items-center justify-center text-xs transition flex-shrink-0"
        title="Scroll Left"
      >
        ◀
      </button>

      {/* Endless Horizontal Card Carousel Track with Seamless Right/Left Gradient Mask Fade */}
      <div
        ref={carouselRef}
        className="flex-1 flex items-stretch gap-6 overflow-x-auto cad-scrollbar scroll-smooth py-2 px-2 relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 16px, black calc(100% - 24px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 16px, black calc(100% - 24px), transparent)',
        }}
      >

        {/* CARD 1: PRICING CALCULATOR (Primary Card) */}
        <div className="min-w-[320px] sm:min-w-[360px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-2xl p-4 shadow-md flex flex-col justify-between flex-shrink-0 relative">

          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80]" />
              <span className="font-bold text-[#E5B842] uppercase tracking-wide text-[11px]">
                Pricing Calculator
              </span>
            </div>

            {/* Math Model Switcher */}
            <div className="flex bg-[#141B16] p-0.5 rounded border border-white/10 text-[8px]">
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
          <div className="py-1.5 space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[9px] text-white/70 font-light">Linear Footage:</span>
              <span className="text-[11px] font-bold text-white bg-[#141B16] px-1.5 py-0.2 rounded border border-white/15">
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
                  className={`px-1.5 py-0.5 text-[8px] rounded border transition ${
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
          <div className="pt-1 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[8px] text-[#DBD0BD] uppercase font-light block">
                Quote Range (±15%)
              </span>
              <span className="text-xs font-bold text-[#4ADE80]">
                ${activePricing.totalMin.toLocaleString()} — ${activePricing.totalMax.toLocaleString()}
              </span>
            </div>

            <span className="text-[8px] text-white/60 font-mono">
              ${activePricing.pricePerLfMin.toFixed(2)}/LF
            </span>
          </div>
        </div>

        {/* CARD 2: YOUR JOB SPECS */}
        <div className="min-w-[260px] sm:min-w-[290px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-2xl p-4 shadow-md flex flex-col justify-between flex-shrink-0 relative">

          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs">
            <span className="font-bold text-[#E5B842] uppercase tracking-wide text-[11px]">
              Job Specs
            </span>
            <span className="text-[8px] text-[#4ADE80] font-mono">PASSED ARC-01</span>
          </div>

          <div className="grid grid-cols-2 gap-1 py-1.5 text-[9px] text-white/80">
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-white/40 block text-[7px]">HEIGHT / BAY</span>
              <span className="font-bold text-[#E5B842]">{config.heightFt}&apos; Finished · {config.postSpacingFt}&apos; Bay</span>
            </div>
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-white/40 block text-[7px]">POST TIMBER</span>
              <span className="font-bold text-white">{config.postType.split('-')[0].toUpperCase()}</span>
            </div>
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-white/40 block text-[7px]">RAILS &amp; CAP</span>
              <span className="font-bold text-white">{config.railCount}-Rail {config.topCap ? '+ Cap' : ''}</span>
            </div>
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-white/40 block text-[7px]">INFILL</span>
              <span className="font-bold text-[#4ADE80]">{config.fillPattern === 'board-on-board' ? 'BoB' : 'Standard'}</span>
            </div>
          </div>

          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[8px] text-white/60">
            <span>Finish: <strong className="text-white">{config.stainType.replace('-', ' ')}</strong></span>
            <span>Gates: <strong className="text-[#E5B842]">{config.gates?.walkGates || 0} Walk</strong></span>
          </div>
        </div>

        {/* CARD 3: SAVE TO FOLIO & 3-BID DISPATCH */}
        <div className="min-w-[260px] sm:min-w-[290px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-2xl p-4 shadow-md flex flex-col justify-between flex-shrink-0 relative">

          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs">
            <span className="font-bold text-[#4ADE80] uppercase tracking-wide text-[11px]">
              Folio &amp; 3-Bid Dispatch
            </span>
            <span className="text-[8px] text-[#E5B842] font-mono">DRAFT READY</span>
          </div>

          <div className="py-1 text-[9px] text-white/70 space-y-0.5">
            <p className="line-clamp-2">Lock your 2D submittal blueprint and get 3 matched contractor bids.</p>
            <div className="flex items-center gap-1.5 text-[8px] text-white/50 pt-0.5">
              <span>🛡️ 72-Hr Refund Rule</span>
              <span>📋 HOA Spec Ready</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="px-2 py-1.5 bg-[#141B16] hover:bg-white/10 text-white/70 hover:text-white text-[10px] rounded-lg border border-white/15 transition"
              title="Reset 8 LF"
            >
              ↺ Reset
            </button>
            <button
              onClick={onSaveToFolio}
              className="flex-1 rounded-xl bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] font-bold text-xs py-1.5 border border-[#1A1A1A] transition text-center shadow"
            >
              Save to Folio →
            </button>
          </div>
        </div>

        {/* CARD 4: MATERIAL & LABOR TAKEOFF */}
        <div className="min-w-[260px] sm:min-w-[290px] bg-[#1C241E] border-[2px] border-[#1A1A1A] rounded-2xl p-4 shadow-md flex flex-col justify-between flex-shrink-0 relative">

          <div className="flex items-center justify-between pb-1 border-b border-white/10 text-xs">
            <span className="font-bold text-[#E5B842] uppercase tracking-wide text-[11px]">
              Takeoff Ledger
            </span>
            <button
              onClick={onOpenLedgerModal}
              className="text-[8px] text-[#F27A22] hover:underline font-bold"
            >
              Full BOM ↗
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1 py-1.5 text-center text-[9px]">
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-[7px] text-white/40 block">MATERIALS</span>
              <span className="font-bold text-white">${activePricing.materialsCostMin}</span>
            </div>
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-[7px] text-white/40 block">LABOR</span>
              <span className="font-bold text-[#E5B842]">${activePricing.laborCostMin}</span>
            </div>
            <div className="p-1 bg-[#141B16] rounded border border-white/5">
              <span className="text-[7px] text-white/40 block">ADMIN</span>
              <span className="font-bold text-[#4ADE80]">${activePricing.adminPermitCost}</span>
            </div>
          </div>

          <div className="pt-1 border-t border-white/10 flex items-center justify-between text-[8px] text-white/50">
            <span>{Math.ceil(config.linearFeet / 8) + 1} Posts · {config.linearFeet * 2} Pickets</span>
            <span className="text-[#4ADE80]">Synced to Canvas</span>
          </div>
        </div>

      </div>

      {/* Right Chevron Button */}
      <button
        onClick={() => scrollCarousel('right')}
        className="hidden sm:flex w-8 h-[96px] bg-[#1C241E] hover:bg-[#253328] text-white/70 hover:text-[#E5B842] border border-white/10 rounded-xl items-center justify-center text-xs transition flex-shrink-0"
        title="Scroll Right"
      >
        ▶
      </button>

    </footer>
  )
}
