'use client'

import React from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface TopTitleBarProps {
  config: FenceConfiguration;
  viewAngle: 'both' | 'front' | 'back';
  onViewAngleChange: (angle: 'both' | 'front' | 'back') => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  activeViewMode?: 'canvas' | 'blueprint' | 'materials' | 'ledger';
  onViewModeChange?: (mode: 'canvas' | 'blueprint' | 'materials' | 'ledger') => void;
  onSelectChapter?: (chapterId: string) => void;
}

export function TopTitleBar({
  config,
  viewAngle,
  onViewAngleChange,
  zoomLevel,
  onZoomChange,
  activeViewMode = 'canvas',
  onViewModeChange,
  onSelectChapter,
}: TopTitleBarProps) {
  const handleZoom = (delta: number) => {
    const next = Math.max(0.6, Math.min(1.6, Number((zoomLevel + delta).toFixed(2))))
    onZoomChange(next)
  }

  return (
    <section
      className="w-full bg-[#1A1A1A] border-b-[2px] border-[#141B16] px-3 md:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 z-30 flex-shrink-0 text-white font-['Rowdies'] shadow-md"
      style={{
        backgroundColor: '#1A1A1A',
        backgroundImage:
          'linear-gradient(rgba(74, 222, 128, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.05) 1px, transparent 1px), linear-gradient(rgba(229, 184, 66, 0.10) 2px, transparent 2px), linear-gradient(90deg, rgba(229, 184, 66, 0.10) 2px, transparent 2px)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0',
      }}
    >
      
      {/* 1. Left: Fence Style & Type (Changes Whole Option Set) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-[#16432D] border border-[#4ADE80]/40 px-2.5 py-1 rounded-[4px] text-xs shadow-sm">
          <span className="text-[#E5B842] font-bold tracking-wide">HERITAGE</span>
          <span className="text-white/80 font-light text-[11px]">Vertical Cedar Picket</span>
        </div>

        {/* Quick Jump Dropdown Triggers */}
        <div className="hidden xl:flex items-center gap-[10px] text-xs text-white/60">
          <button
            onClick={() => onSelectChapter?.('height')}
            className="px-[10px] py-1 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-md transition text-[10px]"
          >
            Height: <span className="text-white font-bold">{config.heightFt}&apos;</span> ▼
          </button>
          <button
            onClick={() => onSelectChapter?.('posts')}
            className="px-[10px] py-1 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-md transition text-[10px]"
          >
            Posts: <span className="text-white font-bold">{config.postType.split('-')[0]}</span> ▼
          </button>
          <button
            onClick={() => onSelectChapter?.('pickets')}
            className="px-[10px] py-1 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-md transition text-[10px]"
          >
            Pickets: <span className="text-white font-bold">{config.fillPattern === 'board-on-board' ? 'BoB' : 'Std'}</span> ▼
          </button>
        </div>
      </div>

      {/* 2. Center: View Modes (Minimal Text Links with 10px Padding) */}
      <div className="flex items-center gap-[10px] text-[10px] text-white/40 uppercase tracking-wider font-bold">
        <button
          onClick={() => onViewModeChange?.('canvas')}
          className={`px-[10px] py-1 rounded-md transition ${activeViewMode === 'canvas' ? 'text-[#E5B842] bg-white/5 font-bold' : 'hover:text-white hover:bg-white/5'}`}
        >
          2D Canvas
        </button>
        <button
          onClick={() => onViewModeChange?.('blueprint')}
          className={`px-[10px] py-1 rounded-md transition ${activeViewMode === 'blueprint' ? 'text-[#E5B842] bg-white/5 font-bold' : 'hover:text-white hover:bg-white/5'}`}
        >
          Blueprint
        </button>
        <button
          onClick={() => onViewModeChange?.('materials')}
          className={`px-[10px] py-1 rounded-md transition ${activeViewMode === 'materials' ? 'text-[#E5B842] bg-white/5 font-bold' : 'hover:text-white hover:bg-white/5'}`}
        >
          Material List
        </button>
        <button
          onClick={() => onViewModeChange?.('ledger')}
          className={`px-[10px] py-1 rounded-md transition ${activeViewMode === 'ledger' ? 'text-[#E5B842] bg-white/5 font-bold' : 'hover:text-white hover:bg-white/5'}`}
        >
          Project Ledger
        </button>
      </div>

      {/* 3. Right: Minimal Elevation Angle Dropdown & Continuous Zoom Controls */}
      <div className="flex items-center gap-3 text-[10px] text-white/50 uppercase font-bold">
        <div className="flex items-center gap-1.5">
          <span>View:</span>
          <select
            value={viewAngle}
            onChange={(e) => onViewAngleChange(e.target.value as any)}
            className="bg-transparent border-none text-[#E5B842] focus:ring-0 cursor-pointer text-[10px] p-0 font-bold uppercase"
          >
            <option value="both" className="bg-[#1C241E]">Dual View</option>
            <option value="front" className="bg-[#1C241E]">Front Only</option>
            <option value="back" className="bg-[#1C241E]">Framing (Back)</option>
          </select>
        </div>

        <div className="flex items-center bg-[#141B16] border border-white/15 rounded-[4px] p-0.5 text-xs text-white">
          <button
            onClick={() => handleZoom(-0.1)}
            className="px-2 py-0.5 hover:bg-white/10 rounded font-bold"
            title="Zoom out"
          >
            -
          </button>
          <span className="px-1 text-white/80 text-[10px] min-w-[2.6rem] text-center font-mono">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => handleZoom(0.1)}
            className="px-2 py-0.5 hover:bg-white/10 rounded font-bold"
            title="Zoom in"
          >
            +
          </button>
        </div>
      </div>

    </section>
  )
}
