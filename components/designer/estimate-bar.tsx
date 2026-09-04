'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'
import { BomCalculationResult, SupportedVendor } from '@/lib/bom-engine'

interface EstimateBarProps {
  config: FenceConfiguration;
  pricing: PricingBreakdown;
  onOpenContractorMatch: () => void;
}

const VENDOR_LABELS: Record<SupportedVendor | 'cheapest', string> = {
  homeDepot: 'Home Depot',
  lowes: "Lowe's",
  dunnLumber: 'Dunn Lumber',
  chinook: 'Chinook Lumber',
  cheapest: 'Lowest Price',
};

export function EstimateBar({ config, pricing, onOpenContractorMatch }: EstimateBarProps) {
  const router = useRouter()
  const [activeDrawer, setActiveDrawer] = useState<'none' | 'bom' | 'ledger'>('none')
  const [selectedVendor, setSelectedVendor] = useState<SupportedVendor | 'cheapest'>('homeDepot')
  const [bomData, setBomData] = useState<BomCalculationResult | null>(null)
  const [isLoadingBom, setIsLoadingBom] = useState(false)

  // Fetch live BOM calculation from Supabase endpoint
  useEffect(() => {
    if (activeDrawer !== 'bom') return;

    let isCancelled = false;
    setIsLoadingBom(true);

    fetch('/api/bom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config, vendor: selectedVendor }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!isCancelled && data?.success && data?.data) {
          setBomData(data.data);
        }
      })
      .catch((err) => console.error('Error fetching live BOM:', err))
      .finally(() => {
        if (!isCancelled) setIsLoadingBom(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [activeDrawer, config, selectedVendor]);

  const handleSaveAndProceed = () => {
    // 1. Save draft state into browser sessionStorage for instant hydration
    try {
      sessionStorage.setItem('ff_active_draft', JSON.stringify({ config, pricing, bomData, timestamp: Date.now() }))
    } catch (err) {}

    // 2. Navigate to Portrait ARC Blueprint sheet
    router.push('/blueprint')
  }

  return (
    <div className="w-full bg-[#141B16] border-2 border-[#141B16] rounded-md text-white shadow-2xl overflow-hidden flex flex-col">
      {/* Drawer Breakdown (if toggled) */}
      {activeDrawer === 'bom' && (
        <div className="p-4 bg-[#111713] border-b border-white/10 max-h-80 overflow-y-auto">
          <div className="flex flex-wrap justify-between items-center mb-3 gap-2">
            <div className="flex items-center gap-3">
              <h4 className="font-['Rowdies'] font-bold text-xs text-[#E5B842] uppercase flex items-center gap-2">
                <span>📋 Live Supabase BOM Takeoff ({config.linearFeet} LF)</span>
                <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded font-mono font-normal">
                  33.33% Fastener Buffer Active
                </span>
              </h4>
              {isLoadingBom && <span className="text-[10px] text-white/50 animate-pulse">Syncing...</span>}
            </div>

            {/* Vendor Selector Tabs */}
            <div className="flex items-center gap-1 bg-[#1C241E] p-0.5 rounded border border-white/15 text-[11px] font-['Rowdies']">
              {(['homeDepot', 'lowes', 'dunnLumber', 'chinook', 'cheapest'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setSelectedVendor(v)}
                  className={`px-2 py-1 rounded transition text-[10px] ${
                    selectedVendor === v
                      ? 'bg-[#E5B842] text-[#141B16] font-bold shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {VENDOR_LABELS[v]}
                </button>
              ))}
              <button onClick={() => setActiveDrawer('none')} className="text-white/50 hover:text-white px-2 text-xs ml-1">
                ✕
              </button>
            </div>
          </div>

          <table className="w-full text-xs font-['Rowdies'] font-light">
            <thead>
              <tr className="border-b border-white/15 text-left text-white/50 text-[10px]">
                <th className="pb-1.5">Component / Specification</th>
                <th className="pb-1.5">Category</th>
                <th className="pb-1.5 text-center">Takeoff Qty</th>
                <th className="pb-1.5 text-right">Vendor Price ({VENDOR_LABELS[selectedVendor]})</th>
                <th className="pb-1.5 text-right">Total Est</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {bomData?.items && bomData.items.length > 0 ? (
                bomData.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-1.5 font-normal text-white/90">
                      <div>{item.displayName}</div>
                      <div className="text-[9px] text-white/40 font-mono">{item.calcNotes}</div>
                    </td>
                    <td className="py-1.5 text-white/60 capitalize">{item.category}</td>
                    <td className="py-1.5 text-center font-mono">
                      <span className="font-bold text-white/90">
                        {item.bufferedQuantity} {item.unit}
                      </span>
                      {item.wastePercent > 0 && (
                        <span className="ml-1 text-[9px] text-amber-400 font-normal">
                          (+33.33% buffer)
                        </span>
                      )}
                    </td>
                    <td className="py-1.5 text-right text-[#E5B842] font-mono">
                      ${item.selectedUnitPrice.toFixed(2)} / {item.unit}
                    </td>
                    <td className="py-1.5 text-right font-bold text-white font-mono">
                      ${item.lineTotalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))
              ) : (
                (pricing.itemizedItems || []).map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-1.5 font-normal text-white/90">{item.name}</td>
                    <td className="py-1.5 text-white/60">{item.category}</td>
                    <td className="py-1.5 text-center font-mono">—</td>
                    <td className="py-1.5 text-right text-[#E5B842]">${item.costPerLf.toFixed(2)}/LF</td>
                    <td className="py-1.5 text-right font-bold text-white">${item.totalEst.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
            {bomData && (
              <tfoot>
                <tr className="border-t border-white/20 text-xs font-mono font-bold text-[#E5B842]">
                  <td colSpan={2} className="pt-2 uppercase tracking-wide">
                    Raw Material Cost (MC): ${bomData.totals.mcUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="pt-2 text-center text-white/70">
                    Burdened M (1.25×): ${bomData.totals.mBurdenedUsd.toLocaleString()}
                  </td>
                  <td className="pt-2 text-right text-white/70">
                    Labor L (2×): ${bomData.totals.laborUsd.toLocaleString()}
                  </td>
                  <td className="pt-2 text-right text-emerald-400 text-sm">
                    Mid: ${bomData.totals.quotedMidUsd.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            )}
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
              📋 Material
            </button>
            <button
              onClick={handleSaveAndProceed}
              className="px-3 py-1.5 text-white/80 hover:text-white transition"
            >
              📐 Fence-Folio
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
                ${(bomData ? bomData.totals.displayLowUsd : pricing.totalMin).toLocaleString()} – ${(bomData ? bomData.totals.displayHighUsd : pricing.totalMax).toLocaleString()}
              </span>
              <span className="text-xs font-['Rowdies'] font-normal text-[#E5B842]">
                (${bomData ? bomData.totals.pricePerLfLow : pricing.pricePerLfMin} – ${bomData ? bomData.totals.pricePerLfHigh : pricing.pricePerLfMax}/LF)
              </span>
            </div>
          </div>

          {/* Primary Save & Export CTA */}
          <button
            onClick={handleSaveAndProceed}
            className="bg-[#4ADE80] hover:bg-[#3ec470] active:scale-[0.98] text-[#141B16] font-['Rowdies'] font-bold text-xs uppercase px-5 py-3 rounded-md border-2 border-[#141B16] shadow-lg flex items-center gap-2 transition"
          >
            <span>Open Fence-Folio</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
