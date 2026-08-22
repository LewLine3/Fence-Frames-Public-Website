'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'

interface EstimateBarProps {
  config: FenceConfiguration;
  pricing: PricingBreakdown;
  onOpenContractorMatch: () => void;
}

export function EstimateBar({ config, pricing, onOpenContractorMatch }: EstimateBarProps) {
  const router = useRouter()
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'bom' | 'ledger'>('none')

  const handleSaveAndProceed = () => {
    // 1. Save draft state into browser sessionStorage for instant hydration
    try {
      sessionStorage.setItem('ff_active_draft', JSON.stringify({ config, pricing, timestamp: Date.now() }))
    } catch (err) {}

    // 2. Navigate to Portrait ARC Blueprint sheet
    router.push('/blueprint')
  }

  return (
    <div className="w-full bg-[#141B16] border-2 border-[#141B16] rounded-md text-white shadow-2xl overflow-hidden flex flex-col">
      {/* Drawer Breakdown (if toggled) */}
      {activeDrawer === 'bom' && (
        <div className="p-4 bg-[#111713] border-b border-white/10 max-h-60 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-['Rowdies'] font-bold text-xs text-[#E5B842] uppercase">
              Itemized Materials &amp; Labor Takeoff ({config.linearFeet} LF)
            </h4>
            <button onClick={() => setActiveDrawer('none')} className="text-white/60 hover:text-white text-xs font-['Rowdies']">
              ✕ Close
            </button>
          </div>
          <table className="w-full text-xs font-['Rowdies'] font-light">
            <thead>
              <tr className="border-b border-white/15 text-left text-white/50 text-[10px]">
                <th className="pb-1.5">Item / Task Description</th>
                <th className="pb-1.5">Category</th>
                <th className="pb-1.5 text-right">Cost / LF</th>
                <th className="pb-1.5 text-right">Estimated Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pricing.itemizedItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="py-1.5 font-normal text-white/90">{item.name}</td>
                  <td className="py-1.5 text-white/60">{item.category}</td>
                  <td className="py-1.5 text-right text-[#E5B842]">${item.costPerLf.toFixed(2)}/LF</td>
                  <td className="py-1.5 text-right font-bold text-white">${item.totalEst.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Main Bar */}
      <div className="p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Left Side: Design Tools & Quick Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-[#1C241E] p-1 rounded border border-white/10 text-xs font-['Rowdies']">
            <button
              onClick={() => setActiveDrawer(activeDrawer === 'bom' ? 'none' : 'bom')}
              className={`px-3 py-1.5 rounded transition ${activeDrawer === 'bom' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/80 hover:text-white'}`}
            >
              📋 Material Takeoff (BOM)
            </button>
            <button
              onClick={handleSaveAndProceed}
              className="px-3 py-1.5 text-white/80 hover:text-white transition"
            >
              📐 ARC Blueprint Preview
            </button>
          </div>

          <button
            onClick={onOpenContractorMatch}
            className="bg-[#1C241E] hover:bg-[#26332A] border border-[#4ADE80] text-[#4ADE80] px-3 py-1.5 rounded text-xs font-['Rowdies'] font-normal flex items-center gap-1.5 transition"
          >
            <span>⚡</span>
            <span>Match 3 Local Builders</span>
          </button>
        </div>

        {/* Right Side: Live Price Box & Action Button */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Price Box */}
          <div className="text-right">
            <div className="text-[10px] font-['Rowdies'] font-normal text-white/60 uppercase">
              Live Contractor Estimate Range
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg md:text-xl font-['Rowdies'] font-bold text-[#4ADE80]">
                ${pricing.totalMin.toLocaleString()} – ${pricing.totalMax.toLocaleString()}
              </span>
              <span className="text-xs font-['Rowdies'] font-normal text-[#E5B842]">
                (${pricing.pricePerLfMin} – ${pricing.pricePerLfMax}/LF)
              </span>
            </div>
          </div>

          {/* Primary Save & Export CTA */}
          <button
            onClick={handleSaveAndProceed}
            className="bg-[#4ADE80] hover:bg-[#3ec470] active:scale-[0.98] text-[#141B16] font-['Rowdies'] font-bold text-xs uppercase px-5 py-3 rounded-md border-2 border-[#141B16] shadow-lg flex items-center gap-2 transition"
          >
            <span>Save Fence-Folio &amp; Get Blueprint</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
