'use client'

import React from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface TopTitleBarProps {
  config: FenceConfiguration;
  viewAngle: 'both' | 'front' | 'back';
  onViewAngleChange: (angle: 'both' | 'front' | 'back') => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
}

export function TopTitleBar({
  config,
  viewAngle,
  onViewAngleChange,
  zoomLevel,
  onZoomChange,
}: TopTitleBarProps) {
  const scrollToChapter = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('ring-2', 'ring-[#E5B842]')
      setTimeout(() => el.classList.remove('ring-2', 'ring-[#E5B842]'), 1200)
    }
  }

  const handleZoom = (delta: number) => {
    const next = Math.max(0.6, Math.min(1.6, Number((zoomLevel + delta).toFixed(2))))
    onZoomChange(next)
  }

  return (
    <section className="w-full bg-[#1A1A1A] border-b-[2px] border-[#141B16] px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 z-30 flex-shrink-0 text-white font-['Rowdies']">
      <div className="flex items-center gap-3">
        {/* Active Style Badge */}
        <div className="flex items-center gap-2 bg-[#16432D] border border-[#4ADE80]/40 px-2.5 py-0.5 rounded-[4px] text-xs shadow-sm">
          <span className="text-[#E5B842] font-bold">HERITAGE</span>
          <span className="text-white/80 font-light text-[11px]">Vertical Picket (Cedar)</span>
        </div>

        {/* Quick Chapter Dropdown Jumps */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs text-white/70">
          <span className="text-[10px] text-[#E5B842] uppercase font-bold mr-1">JUMP:</span>
          <button
            onClick={() => scrollToChapter('ch-height')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition"
          >
            Height <span className="text-white font-bold">{config.heightFt}&apos;</span> ▼
          </button>
          <button
            onClick={() => scrollToChapter('ch-posts')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition"
          >
            Posts <span className="text-white font-bold">{config.postType.split('-')[0]}</span> ▼
          </button>
          <button
            onClick={() => scrollToChapter('ch-rails')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition"
          >
            Rails <span className="text-white font-bold">{config.railCount}-Rail</span> ▼
          </button>
          <button
            onClick={() => scrollToChapter('ch-fill')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition"
          >
            Pickets <span className="text-white font-bold">{config.fillPattern === 'board-on-board' ? 'BoB' : 'Standard'}</span> ▼
          </button>
          <button
            onClick={() => scrollToChapter('ch-stain')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition"
          >
            Stain <span className="text-white font-bold">{config.stainType === 'none' ? 'Natural' : config.stainType.split('-')[0]}</span> ▼
          </button>
          <button
            onClick={() => scrollToChapter('ch-gates')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition"
          >
            Gates <span className="text-white font-bold">{config.gates?.walkGates || 0} Walk</span> ▼
          </button>
        </div>
      </div>

      {/* Right Controls: View Angle & Zoom */}
      <div className="flex items-center gap-2 text-xs">
        <div className="flex bg-[#141B16] p-0.5 rounded-[4px] border border-white/15">
          <button
            onClick={() => onViewAngleChange('both')}
            className={`px-2 py-0.5 rounded transition ${
              viewAngle === 'both' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            Dual View
          </button>
          <button
            onClick={() => onViewAngleChange('front')}
            className={`px-2 py-0.5 rounded transition ${
              viewAngle === 'front' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => onViewAngleChange('back')}
            className={`px-2 py-0.5 rounded transition ${
              viewAngle === 'back' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            Framing (Back)
          </button>
        </div>

        <div className="flex items-center bg-[#141B16] border border-white/15 rounded-[4px] p-0.5">
          <button onClick={() => handleZoom(-0.1)} className="px-2 py-0.5 text-white/80 hover:text-white hover:bg-white/10 rounded font-bold">-</button>
          <span className="px-1.5 text-white/80 text-[11px] min-w-[2.8rem] text-center">{Math.round(zoomLevel * 100)}%</span>
          <button onClick={() => handleZoom(0.1)} className="px-2 py-0.5 text-white/80 hover:text-white hover:bg-white/10 rounded font-bold">+</button>
        </div>
      </div>
    </section>
  )
}
