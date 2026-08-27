'use client'

import React, { useState } from 'react'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'

interface BottomControlHudProps {
  config: FenceConfiguration;
  pricing: PricingBreakdown;
  trialPricing?: PricingBreakdown;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  onResetDefaults: () => void;
  onSaveToFolio: () => void;
}

export function BottomControlHud({
  config,
  pricing,
  trialPricing,
  onChange,
  onResetDefaults,
  onSaveToFolio,
}: BottomControlHudProps) {
  const [activeMathModel, setActiveMathModel] = useState<'canonical' | 'trial'>('canonical')
  const [showLaborDetail, setShowLaborDetail] = useState<boolean>(false)

  const activePricing = activeMathModel === 'trial' && trialPricing ? trialPricing : pricing

  return (
    <footer className="w-full bg-[#141B16] border-t-[2.5px] border-[#1A1A1A] p-2 md:p-3 flex-shrink-0 z-40 shadow-2xl font-['Rowdies']">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        
        {/* Linear Feet Horizontal Slider & Presets */}
        <div className="w-full lg:w-auto flex-1 flex flex-col sm:flex-row items-center gap-3 bg-[#1C241E] p-2 rounded-[5px] border border-white/10">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-bold text-[#E5B842] uppercase">Linear Feet:</span>
            <span className="text-sm font-bold text-white bg-[#141B16] px-2.5 py-0.5 rounded border border-white/15">
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
            className="w-full sm:flex-1 h-2 bg-[#141B16] rounded-lg appearance-none cursor-pointer accent-[#F27A22]"
          />

          {/* Preset Pills */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {[8, 48, 96, 120, 200].map((preset) => (
              <button
                key={preset}
                onClick={() => onChange({ linearFeet: preset })}
                className={`px-1.5 py-0.5 text-[10px] rounded border transition ${
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

        {/* Live Pricing Engine HUD with Math Model Comparison */}
        <div className="w-full lg:w-auto flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
          
          {/* Math Model Comparison Switch (Canon 2xM vs Trial Discrete Labor) */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center bg-[#1C241E] p-0.5 rounded border border-white/15 text-[10px]">
              <button
                onClick={() => setActiveMathModel('canonical')}
                className={`px-2 py-0.5 rounded transition ${
                  activeMathModel === 'canonical'
                    ? 'bg-[#E5B842] text-[#141B16] font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Canon (2×M)
              </button>
              <button
                onClick={() => setActiveMathModel('trial')}
                className={`px-2 py-0.5 rounded transition ${
                  activeMathModel === 'trial'
                    ? 'bg-[#F27A22] text-white font-bold'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Trial (Per-Part)
              </button>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] text-white/60">
              {activeMathModel === 'canonical' ? (
                <span>Burdened Mat · 2× Labor · 10% Admin</span>
              ) : (
                <button
                  onClick={() => setShowLaborDetail(!showLaborDetail)}
                  className="text-[#F27A22] hover:underline"
                >
                  {showLaborDetail ? 'Hide Unit Rates ▲' : 'Inspect Unit Labor Rates ▼'}
                </button>
              )}
            </div>
          </div>

          {/* Pricing Numbers Readout */}
          <div className="flex flex-col text-right">
            <span className="text-[9px] text-[#DBD0BD] uppercase font-light tracking-wider">
              {activeMathModel === 'canonical' ? 'Canonical Estimate (±15%)' : 'Trial Labor Estimate'}
            </span>
            <span
              className={`text-base md:text-lg font-bold tracking-wide leading-tight ${
                activeMathModel === 'canonical' ? 'text-[#4ADE80]' : 'text-[#F27A22]'
              }`}
            >
              ${activePricing.totalMin.toLocaleString()} — ${activePricing.totalMax.toLocaleString()}
            </span>
            <span className="text-[9px] font-mono text-white/70">
              ${activePricing.pricePerLfMin.toFixed(2)} — ${activePricing.pricePerLfMax.toFixed(2)} / LF
            </span>
          </div>

          {/* Action Gateways */}
          <div className="flex items-center gap-2">
            <button
              onClick={onResetDefaults}
              className="px-2.5 py-1.5 bg-[#1C241E] hover:bg-white/10 text-white/80 hover:text-white text-xs rounded border border-white/20 transition"
              title="Restore blank Heritage default option set"
            >
              ↺ Reset
            </button>

            <button
              onClick={onSaveToFolio}
              className="btn-chamfer bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] font-bold text-xs px-3.5 py-2 border-[1.5px] border-[#1A1A1A] transition shadow-md"
            >
              Save to Folio →
            </button>
          </div>
        </div>

      </div>

      {/* Trial Unit Labor Inspection Drawer */}
      {showLaborDetail && activeMathModel === 'trial' && (
        <div className="max-w-[1440px] mx-auto mt-2 p-3 bg-[#1C241E] border border-[#F27A22]/40 rounded-[5px] text-xs text-white/80 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          <div className="p-1.5 bg-[#141B16] rounded border border-white/5">
            <div className="text-[10px] text-white/50">Post Dig & Set</div>
            <div className="font-bold text-[#E5B842]">$38.00 / hole</div>
          </div>
          <div className="p-1.5 bg-[#141B16] rounded border border-white/5">
            <div className="text-[10px] text-white/50">Rail Framing</div>
            <div className="font-bold text-[#E5B842]">$7.50 / LF</div>
          </div>
          <div className="p-1.5 bg-[#141B16] rounded border border-white/5">
            <div className="text-[10px] text-white/50">Picket Nailing</div>
            <div className="font-bold text-[#E5B842]">$6.25 / LF</div>
          </div>
          <div className="p-1.5 bg-[#141B16] rounded border border-white/5">
            <div className="text-[10px] text-white/50">Field Staining</div>
            <div className="font-bold text-[#E5B842]">$3.25 / LF</div>
          </div>
          <div className="p-1.5 bg-[#141B16] rounded border border-white/5">
            <div className="text-[10px] text-white/50">Trim Install</div>
            <div className="font-bold text-[#E5B842]">$2.00 / LF</div>
          </div>
          <div className="p-1.5 bg-[#141B16] rounded border border-white/5">
            <div className="text-[10px] text-white/50">Gate Hanging</div>
            <div className="font-bold text-[#E5B842]">$120 / walk · $240 / drive</div>
          </div>
        </div>
      )}
    </footer>
  )
}
