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
    <section className="w-full bg-[#1A1A1A] border-b-[2px] border-[#141B16] px-3 md:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 z-30 flex-shrink-0 text-white font-['Rowdies'] shadow-md">
      
      {/* 1. Left: Fence Style & Type (Changes Whole Option Set) */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-[#16432D] border border-[#4ADE80]/40 px-2.5 py-1 rounded-[4px] text-xs shadow-sm">
          <span className="text-[#E5B842] font-bold tracking-wide">HERITAGE</span>
          <span className="text-white/80 font-light text-[11px]">Vertical Cedar Picket</span>
        </div>

        {/* Quick Jump Dropdown Triggers */}
        <div className="hidden xl:flex items-center gap-1 text-xs text-white/60">
          <button
            onClick={() => onSelectChapter?.('height')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition text-[10px]"
          >
            Height: <span className="text-white font-bold">{config.heightFt}&apos;</span> ▼
          </button>
          <button
            onClick={() => onSelectChapter?.('posts')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition text-[10px]"
          >
            Posts: <span className="text-white font-bold">{config.postType.split('-')[0]}</span> ▼
          </button>
          <button
            onClick={() => onSelectChapter?.('pickets')}
            className="px-2 py-0.5 bg-[#141B16] hover:bg-[#253328] hover:text-[#E5B842] border border-white/10 rounded-[3px] transition text-[10px]"
          >
            Pickets: <span className="text-white font-bold">{config.fillPattern === 'board-on-board' ? 'BoB' : 'Std'}</span> ▼
          </button>
        </div>
      </div>

      {/* 2. Center: View Pills (As in Mockup: 2D Canvas, Blueprint, Material List, Project Ledger) */}
      <div className="flex items-center bg-[#141B16] p-0.5 rounded-[5px] border border-white/15 text-xs">
        <button
          onClick={() => onViewModeChange?.('canvas')}
          className={`px-3 py-1 rounded-[4px] flex items-center gap-1.5 transition ${
            activeViewMode === 'canvas'
              ? 'bg-[#E5B842] text-[#141B16] font-bold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <span>🎨</span>
          <span>2D Canvas</span>
        </button>
        <button
          onClick={() => onViewModeChange?.('blueprint')}
          className={`px-3 py-1 rounded-[4px] flex items-center gap-1.5 transition ${
            activeViewMode === 'blueprint'
              ? 'bg-[#E5B842] text-[#141B16] font-bold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <span>📐</span>
          <span>Blueprint</span>
        </button>
        <button
          onClick={() => onViewModeChange?.('materials')}
          className={`px-3 py-1 rounded-[4px] flex items-center gap-1.5 transition ${
            activeViewMode === 'materials'
              ? 'bg-[#E5B842] text-[#141B16] font-bold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <span>📋</span>
          <span>Material List</span>
        </button>
        <button
          onClick={() => onViewModeChange?.('ledger')}
          className={`px-3 py-1 rounded-[4px] flex items-center gap-1.5 transition ${
            activeViewMode === 'ledger'
              ? 'bg-[#E5B842] text-[#141B16] font-bold shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <span>📑</span>
          <span>Project Ledger</span>
        </button>
      </div>

      {/* 3. Right: Elevation Angle Switch & Continuous Zoom Controls */}
      <div className="flex items-center gap-2 text-xs">
        <div className="flex bg-[#141B16] p-0.5 rounded-[4px] border border-white/15">
          <button
            onClick={() => onViewAngleChange('both')}
            className={`px-2.5 py-0.5 rounded transition ${
              viewAngle === 'both' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            Dual View
          </button>
          <button
            onClick={() => onViewAngleChange('front')}
            className={`px-2.5 py-0.5 rounded transition ${
              viewAngle === 'front' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => onViewAngleChange('back')}
            className={`px-2.5 py-0.5 rounded transition ${
              viewAngle === 'back' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/70 hover:text-white'
            }`}
          >
            Framing (Back)
          </button>
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
