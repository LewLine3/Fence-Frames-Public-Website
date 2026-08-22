'use client'

import React from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface HeaderControlsProps {
  config: FenceConfiguration;
  zipCode: string;
  onZipChange: (zip: string) => void;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  onOpenGateModal: () => void;
}

export function HeaderControls({
  config,
  zipCode,
  onZipChange,
  onChange,
  onOpenGateModal,
}: HeaderControlsProps) {
  const totalGates = (config.gates.walkGates || 0) + (config.gates.driveGates || 0);

  return (
    <div className="w-full bg-[#141B16] border-2 border-[#141B16] rounded-md p-3.5 text-white shadow-xl flex flex-col gap-3">
      {/* Top Row: Style Preset + ZIP + HOA Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <span className="text-[10px] uppercase font-['Rowdies'] font-normal text-[#E5B842] block mb-1">
              Design Architecture
            </span>
            <select
              value={config.fenceStyle}
              onChange={(e) => onChange({ fenceStyle: e.target.value })}
              className="bg-[#1C241E] border border-[#E5B842]/40 text-[#FAF6EE] rounded px-3 py-1.5 text-xs font-['Rowdies'] font-bold focus:outline-none focus:border-[#E5B842]"
            >
              <option value="heritage">Heritage 3-Rail Full Privacy (Si View ARC Standard)</option>
              <option value="good-neighbor">Good Neighbor (Alternating Pickets)</option>
              <option value="flat-top">Solid Cedar Board-on-Board</option>
              <option value="dog-eared">Classic Dog-Eared Privacy</option>
              <option value="gothic">Pacific Northwest Gothic Picket</option>
            </select>
          </div>

          <div>
            <span className="text-[10px] uppercase font-['Rowdies'] font-normal text-[#E5B842] block mb-1">
              Project Location
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={zipCode}
                onChange={(e) => onZipChange(e.target.value)}
                placeholder="ZIP Code"
                maxLength={5}
                className="w-20 bg-[#1C241E] border border-white/20 text-white rounded px-2.5 py-1.5 text-xs font-['Rowdies'] text-center focus:outline-none focus:border-[#E5B842]"
              />
              <span className="text-xs text-white/80 font-['Rowdies'] font-light">
                {zipCode === '98045' ? '📍 North Bend, WA' : zipCode === '98027' ? '📍 Issaquah, WA' : '📍 King County, WA'}
              </span>
            </div>
          </div>
        </div>

        {/* HOA Badge indicator */}
        <div className="flex items-center gap-2">
          <div className="bg-[#0E2417] border border-[#4ADE80] px-3 py-1.5 rounded flex items-center gap-1.5">
            <span className="text-[#4ADE80] text-sm">✓</span>
            <span className="text-xs font-['Rowdies'] font-normal text-white">
              <strong className="text-[#4ADE80]">Si View ARC</strong> Pre-Approved
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Row: Linear Footage Slider + Gate Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* LF Slider */}
        <div className="flex-1 min-w-[280px] flex items-center gap-3">
          <div className="bg-[#1C241E] border border-[#E5B842] px-3 py-1 rounded text-center min-w-[90px]">
            <span className="text-[10px] font-['Rowdies'] uppercase text-[#E5B842] block">Total Run</span>
            <span className="text-sm font-['Rowdies'] font-bold text-white">{config.linearFeet} LF</span>
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <div className="flex justify-between text-[10px] font-['Rowdies'] text-white/60">
              <span>10 LF (Patch)</span>
              <span>150 LF (Suburban Yard)</span>
              <span>400 LF (Acreage)</span>
            </div>
            <input
              type="range"
              min={10}
              max={400}
              step={5}
              value={config.linearFeet}
              onChange={(e) => onChange({ linearFeet: Number(e.target.value) })}
              className="w-full h-2 bg-[#111713] rounded-lg appearance-none cursor-pointer accent-[#E5B842]"
            />
          </div>
        </div>

        {/* Gate Trigger Button */}
        <button
          onClick={onOpenGateModal}
          className="bg-[#1C241E] hover:bg-[#26332A] border-2 border-[#F27A22] text-[#FAF6EE] px-4 py-2 rounded text-xs font-['Rowdies'] font-bold flex items-center gap-2 transition shadow-md"
        >
          <span>🚪</span>
          <span>{totalGates > 0 ? `${totalGates} Custom Gates Configured` : '+ Add Gates (Walk / Drive)'}</span>
        </button>
      </div>
    </div>
  )
}
