'use client'

import React from 'react'
import { Minus, Plus } from 'lucide-react'
import { FENCE_SPEC, VIEW_TABS, type ElevationMode, type ViewTab } from '@/lib/toolbar/spec'
import { cn } from '@/lib/utils'

interface SubHeaderRibbonProps {
  mode: ElevationMode
  onModeChange: (mode: ElevationMode) => void
  activeTab: ViewTab
  onTabChange: (tab: ViewTab) => void
  zoom: number
  onZoomChange: (zoom: number) => void
}

const MODE_STYLES: Record<ElevationMode, string> = {
  dual: 'bg-accent-gold text-panel-charcoal',
  front: 'bg-accent-forest text-panel-charcoal',
  back: 'bg-toolbar-orange text-panel-charcoal',
}

const TAB_SHORT: Record<ViewTab, string> = {
  '2D Canvas': '2D',
  Blueprint: 'BP',
  Takeoff: 'TO',
  Ledger: 'LD',
}

export function SubHeaderRibbon({
  mode,
  onModeChange,
  activeTab,
  onTabChange,
  zoom,
  onZoomChange,
}: SubHeaderRibbonProps) {
  return (
    <aside
      className="pointer-events-auto absolute right-2 top-1/2 z-30 flex w-[52px] -translate-y-1/2 flex-col items-stretch gap-2 rounded-xl border-2 border-[#1A1A1A] px-1.5 py-2 shadow-[3px_3px_0_#1A1A1A] font-['Rowdies'] select-none"
      style={{
        background: 'linear-gradient(180deg, #1C241E 0%, #121814 100%)',
      }}
      aria-label="Elevation toolbar"
    >
      {/* Spec badge */}
      <div className="rounded-md bg-accent-forest px-1 py-1.5 text-center text-[8px] font-bold leading-tight text-panel-charcoal">
        {FENCE_SPEC.style.split(' ')[0]}
      </div>

      {/* Quick chips stacked */}
      <div className="flex flex-col gap-1 border-b border-white/10 pb-2">
        {FENCE_SPEC.chips.map((chip) => (
          <span
            key={chip.label}
            className="rounded-md bg-canvas-ivory/90 px-1 py-1 text-center text-[8px] font-semibold leading-none text-panel-charcoal"
            title={`${chip.label}: ${chip.value}`}
          >
            {chip.value}
          </span>
        ))}
      </div>

      {/* View tabs — vertical */}
      <div className="flex flex-col gap-1 border-b border-white/10 pb-2">
        {VIEW_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            title={tab}
            className={cn(
              'rounded-md px-1 py-1.5 text-[8px] font-bold uppercase leading-none tracking-wide transition-colors cursor-pointer',
              activeTab === tab
                ? 'bg-[#E5B842] text-[#141B16]'
                : 'bg-canvas-ivory/10 text-canvas-ivory/70 hover:text-canvas-ivory hover:bg-canvas-ivory/15',
            )}
          >
            {TAB_SHORT[tab]}
          </button>
        ))}
      </div>

      {/* Dual / Front / Back */}
      <div className="flex flex-col overflow-hidden rounded-md text-[8px] font-bold leading-none border border-white/10">
        {(['front', 'dual', 'back'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onModeChange(option)}
            className={cn(
              'px-1 py-1.5 uppercase transition-colors cursor-pointer',
              mode === option
                ? MODE_STYLES[option]
                : 'bg-transparent text-canvas-ivory/60 hover:text-canvas-ivory hover:bg-canvas-ivory/10',
            )}
          >
            {option === 'dual' ? '2×' : option === 'front' ? 'F' : 'B'}
          </button>
        ))}
      </div>

      {/* Zoom */}
      <div className="mt-auto flex flex-col items-center gap-1 rounded-md bg-canvas-ivory/10 px-1 py-1.5">
        <button
          type="button"
          onClick={() => onZoomChange(Math.min(200, zoom + 10))}
          className="flex size-5 items-center justify-center text-canvas-ivory/70 hover:text-canvas-ivory cursor-pointer"
          aria-label="Zoom in"
        >
          <Plus className="size-3" />
        </button>
        <span className="w-full text-center text-[8px] font-semibold leading-none text-canvas-ivory font-mono">
          {zoom}
        </span>
        <button
          type="button"
          onClick={() => onZoomChange(Math.max(50, zoom - 10))}
          className="flex size-5 items-center justify-center text-canvas-ivory/70 hover:text-canvas-ivory cursor-pointer"
          aria-label="Zoom out"
        >
          <Minus className="size-3" />
        </button>
      </div>
    </aside>
  )
}
