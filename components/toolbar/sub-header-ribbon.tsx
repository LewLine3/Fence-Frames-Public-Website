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

export function SubHeaderRibbon({
  mode,
  onModeChange,
  activeTab,
  onTabChange,
  zoom,
  onZoomChange,
}: SubHeaderRibbonProps) {
  return (
    <div className="flex h-[30px] min-h-[30px] max-h-[30px] flex-shrink-0 items-center justify-between gap-2 bg-panel-slate px-2 text-panel-charcoal font-['Rowdies'] select-none">
      {/* Left: Spec Badge & Quick-Jump Chips */}
      <div className="flex min-w-0 items-center gap-1.5 overflow-hidden">
        <span className="shrink-0 rounded-sm bg-accent-forest px-1.5 py-0.5 text-[9px] font-bold leading-none text-panel-charcoal">
          {FENCE_SPEC.style}
        </span>
        <div className="hidden items-center gap-1 sm:flex">
          {FENCE_SPEC.chips.map((chip) => (
            <span
              key={chip.label}
              className="shrink-0 rounded-sm bg-canvas-ivory/90 px-1.5 py-0.5 text-[9px] font-semibold leading-none text-panel-charcoal"
            >
              {chip.label}: {chip.value}
            </span>
          ))}
        </div>
      </div>

      {/* Center: View Mode Tabs */}
      <div className="hidden items-center gap-3 md:flex">
        {VIEW_TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={cn(
              'relative py-1 text-[9px] font-semibold uppercase leading-none tracking-wide text-canvas-ivory/60 transition-colors hover:text-canvas-ivory cursor-pointer',
              activeTab === tab && 'text-canvas-ivory font-bold',
            )}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-accent-gold" />
            )}
          </button>
        ))}
      </div>

      {/* Right: Dual / Front / Back Toggle Pill + Zoom Controls */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="flex items-center overflow-hidden rounded-sm text-[9px] font-bold leading-none">
          {(['dual', 'front', 'back'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onModeChange(option)}
              className={cn(
                'px-1.5 py-1 uppercase transition-colors cursor-pointer',
                mode === option ? MODE_STYLES[option] : 'bg-canvas-ivory/10 text-canvas-ivory/60 hover:text-canvas-ivory',
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-sm bg-canvas-ivory/10 px-1 py-0.5">
          <button
            type="button"
            onClick={() => onZoomChange(Math.max(50, zoom - 10))}
            className="flex size-4 items-center justify-center text-canvas-ivory/70 hover:text-canvas-ivory cursor-pointer"
            aria-label="Zoom out"
          >
            <Minus className="size-3" />
          </button>
          <span className="w-8 text-center text-[9px] font-semibold leading-none text-canvas-ivory font-mono">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => onZoomChange(Math.min(200, zoom + 10))}
            className="flex size-4 items-center justify-center text-canvas-ivory/70 hover:text-canvas-ivory cursor-pointer"
            aria-label="Zoom in"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
