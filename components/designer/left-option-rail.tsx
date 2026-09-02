'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'
import { useInfiniteLoop } from '@/hooks/use-infinite-loop'
import { ChapterConfigPanel } from '@/components/designer/chapter-config-panel'
import { cn } from '@/lib/utils'

interface LeftOptionRailProps {
  config: FenceConfiguration
  onChange: (updated: Partial<FenceConfiguration>) => void
  activeChapter?: string | null
  onSelectChapter?: (chapterId: string | null) => void
  onResetDefaults?: () => void
}

export const CHAPTERS = [
  { id: 'height', num: '01', menuLabel: 'GENERAL', label: 'Height & Spacing', icon: '📐', preview: "6' Std · 8' Bay" },
  { id: 'posts', num: '02', menuLabel: 'POSTS', label: 'Posts & Caps', icon: '🪵', preview: '4x4 Cedar · Pyramid' },
  { id: 'rails', num: '03', menuLabel: 'RAILS', label: 'Rails & Framing', icon: '🪜', preview: '3-Rail · 2x6 Cap' },
  { id: 'pickets', num: '04', menuLabel: 'PICKETS / FILL', label: 'Pickets & Infill', icon: '🌲', preview: 'Board-on-Board' },
  { id: 'stain', num: '05', menuLabel: 'STAIN', label: 'Stain & Finish', icon: '🎨', preview: 'Cedar Natural' },
  { id: 'trim', num: '06', menuLabel: 'TRIM', label: 'Trim & Facia', icon: '📏', preview: 'Clean Line' },
  { id: 'gates', num: '07', menuLabel: 'GATES', label: 'Gates & Access', icon: '🚪', preview: 'Walk & Drive Gates' },
  { id: 'hardware', num: '08', menuLabel: 'HARDWARE', label: 'Hardware & Ties', icon: '🔩', preview: 'Black Powder' },
]

export function getChapterCostMetric(id: string, config: FenceConfiguration): string {
  switch (id) {
    case 'height': {
      const base = config.heightFt === 4 ? 14 : config.heightFt === 6 ? 18 : 26
      const grade = config.woodGrade === 'clear-cedar' ? 7.5 : config.woodGrade === 'tight-knot' ? 2.5 : 0
      return `$${(base + grade).toFixed(2)}/LF`
    }
    case 'posts': {
      let post = 6.5
      if (config.postType === '4x6-cedar') post += 2.2
      if (config.postType === 'postmaster-steel') post += 4.2
      if (config.postCap !== 'none') post += 1.1
      return `$${post.toFixed(2)}/LF`
    }
    case 'rails': {
      let rail = config.railCount === 2 ? 4.0 : 5.8
      if (config.topCap) rail += 2.25
      return `$${rail.toFixed(2)}/LF`
    }
    case 'pickets': {
      let fill = 8.5
      if (config.fillPattern === 'board-on-board') fill = 12.0
      else if (config.fillPattern === 'shadowbox') fill = 11.5
      return `$${fill.toFixed(2)}/LF`
    }
    case 'stain': {
      return config.stainType === 'none' ? '$0.00' : '$4.75/LF'
    }
    case 'trim': {
      if (config.trimStyle === 'picture-frame-trim') return '$3.20/LF'
      if (config.trimStyle === 'kickboard-2x6') return '$2.80/LF'
      return '$0.00'
    }
    case 'gates': {
      const walk = (config.gates?.walkGates || 0) * 385
      const drive = (config.gates?.driveGates || 0) * 850
      return walk + drive > 0 ? `$${walk + drive}` : '$385/ea'
    }
    case 'hardware': {
      let hw = 1.4
      if (config.hardwareTier === 'black-powder') hw = 2.4
      if (config.hardwareTier === 'stainless-steel') hw = 3.1
      return `$${hw.toFixed(2)}/LF`
    }
    default:
      return '$0.00'
  }
}

const railShellStyle: React.CSSProperties = {
  backgroundColor: '#1C180E',
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.40) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.40) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.85) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.85) 2px, transparent 2px), linear-gradient(145deg, #0D120F 0%, #1A170F 30%, #3D3014 65%, #594418 100%)',
  backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px, 100% 100%',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0',
  borderRight: '3px solid #F27A22',
  boxShadow: 'inset -1px 0 0 #000, 1px 0 0 0 #000, 5px 0 18px rgba(0, 0, 0, 0.65)',
}

export function LeftOptionRail({
  config,
  onChange,
  activeChapter: controlledChapter,
  onSelectChapter,
  onResetDefaults,
}: LeftOptionRailProps) {
  const [internalActive, setInternalActive] = useState<string | null>(null)

  const active = controlledChapter !== undefined ? controlledChapter : internalActive

  const setActive = (id: string | null) => {
    if (onSelectChapter) onSelectChapter(id)
    else setInternalActive(id)
  }

  // Desktop keeps the menu visible while a chapter is open (fly-out).
  // Infinite loop only when the overview list is the primary scroll surface.
  const { containerRef, tripled, handleScroll } = useInfiniteLoop(CHAPTERS, 'y')

  const getChapterValue = (id: string) => {
    switch (id) {
      case 'height':
        return `${config.heightFt}' H · ${config.postSpacingFt}' Bay`
      case 'posts':
        return `${config.postType.split('-')[0].toUpperCase()} · ${config.postCap.split('-')[0]}`
      case 'rails':
        return `${config.railCount}-Rail ${config.topCap ? '+ Cap' : ''}`
      case 'pickets':
        return config.fillPattern === 'board-on-board' ? 'BoB (100%)' : 'Standard 1/2″'
      case 'stain':
        return config.stainType.replace('-', ' ')
      case 'trim':
        return config.trimStyle === 'none' ? 'Clean Line' : config.trimStyle.replace('-', ' ')
      case 'gates':
        return `${config.gates?.walkGates || 0} Walk · ${config.gates?.driveGates || 0} Drive`
      case 'hardware':
        return config.hardwareTier.replace('-', ' ')
      default:
        return ''
    }
  }

  const currentIdx = CHAPTERS.findIndex((c) => c.id === active)
  const prevChapter = currentIdx > 0 ? CHAPTERS[currentIdx - 1].id : null
  const nextChapter = currentIdx >= 0 && currentIdx < CHAPTERS.length - 1 ? CHAPTERS[currentIdx + 1].id : null
  const activeChapterMeta = CHAPTERS.find((c) => c.id === active)

  const panelProps = active
    ? {
        active,
        chapter: activeChapterMeta,
        config,
        onChange,
        onSelectChapter: setActive,
        prevChapter,
        nextChapter,
      }
    : null

  return (
    <aside
      className={cn(
        'hidden md:flex flex-shrink-0 flex-col justify-between select-none font-[\'Rowdies\'] relative z-30 h-full min-h-0',
        // Tablet: compact rail. Desktop: full menu width; fly-out overlays canvas (not layout width).
        'w-[88px] lg:w-[280px]',
      )}
      suppressHydrationWarning
      style={railShellStyle}
    >
      {/* Header */}
      <div
        className="px-2 lg:px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-md"
        style={{
          background: 'linear-gradient(180deg, #1B4332 0%, #142920 100%)',
          borderBottom: '2px solid #1A1A1A',
          boxShadow: 'inset 0 -1px 0 rgba(229,184,66,0.35)',
        }}
      >
        {/* Tablet in-place: show back when drilling in */}
        <div className={cn('w-full', active ? 'flex lg:hidden' : 'hidden')}>
          <button
            onClick={() => setActive(null)}
            className="flex items-center justify-center w-full gap-1 text-[9px] text-[#FAF6EE] hover:text-[#E5B842] transition font-bold uppercase px-1.5 py-1.5 rounded-md border-2 border-[#C4A574]"
            style={{ background: 'linear-gradient(180deg, #3D3014 0%, #2A2218 100%)' }}
            title="Return to all options"
          >
            ◀
          </button>
        </div>

        <div className={cn('w-full items-center justify-between gap-2', active ? 'hidden lg:flex' : 'flex')}>
          <span className="hidden lg:inline text-xs font-bold text-[#E5B842] uppercase tracking-wider">
            Option Menu
          </span>
          <span className="lg:hidden mx-auto text-[9px] font-bold text-[#E5B842]">OPTS</span>
          <span
            className="hidden lg:inline text-[9px] text-[#FAF6EE] border-2 border-[#C4A574] px-2 py-0.5 rounded-md font-mono font-bold shadow-[1px_1px_0_#1A1A1A]"
            style={{ background: 'rgba(0,0,0,0.35)' }}
          >
            01–08 LOOP
          </span>
        </div>
      </div>

      {/* Scroll body */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth relative',
          'px-2 lg:px-4 py-4 lg:py-6',
        )}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 28px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 20px, black calc(100% - 28px), transparent)',
        }}
      >
        {/* Menu list — always on desktop; tablet hides while drilling in */}
        <div className={cn('flex flex-col gap-3 lg:gap-6 pb-8', active ? 'hidden lg:flex' : 'flex')}>
          {tripled.map((ch, idx) => {
            const costMetric = getChapterCostMetric(ch.id, config)
            const liveValue = getChapterValue(ch.id)
            const isSelected = active === ch.id

            return (
              <button
                key={`${ch.id}-${idx}`}
                onClick={() => setActive(ch.id === active ? null : ch.id)}
                className={cn(
                  'w-full rounded-xl text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group',
                  'min-h-[64px] lg:min-h-[96px] gap-2 lg:gap-3 hover:-translate-y-0.5',
                  isSelected && 'ring-2 ring-[#E5B842] ring-offset-1 ring-offset-[#1C180E]',
                )}
                style={{
                  background: isSelected
                    ? 'linear-gradient(180deg, #1B4332 0%, #142920 100%)'
                    : 'linear-gradient(180deg, #4A3A22 0%, #2E2418 55%, #241C12 100%)',
                  border: `2px solid ${isSelected ? '#E5B842' : '#C4A574'}`,
                  boxShadow: '3px 3px 0 #1A1A1A, inset 0 1px 0 rgba(250,246,238,0.12)',
                  padding: '0.75rem 0.65rem',
                }}
                title={ch.menuLabel}
              >
                {/* Compact tablet face */}
                <div className="flex lg:hidden flex-col items-center gap-1 text-center">
                  <span className="text-[#E5B842] font-mono font-bold text-[11px]">{ch.num}</span>
                  <span className="text-[8px] font-bold uppercase text-[#FAF6EE] leading-tight">
                    {ch.menuLabel.split(' ')[0]}
                  </span>
                </div>

                {/* Full desktop face */}
                <div className="hidden lg:flex items-start gap-3 w-full">
                  <span className="text-[#E5B842] text-sm leading-none mt-1 shrink-0 transition-transform group-hover:translate-x-0.5">
                    ▶
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold uppercase tracking-wide text-[#FAF6EE] group-hover:text-[#E5B842] transition-colors leading-tight">
                      {ch.menuLabel}
                    </div>
                    <div className="text-[10px] text-[#DBD0BD]/90 font-light mt-1 truncate">{ch.label}</div>
                  </div>
                  <span
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] border-2 border-[#C4A574]/60"
                    style={{ background: 'rgba(0,0,0,0.45)', color: '#E5B842' }}
                  >
                    {ch.num}
                  </span>
                </div>

                <div className="hidden lg:flex items-center justify-between gap-2 pt-2 border-t border-[#C4A574]/25 w-full">
                  <span
                    className="text-[10px] text-[#FAF6EE] font-semibold truncate max-w-[58%] px-2.5 py-1 rounded-md border border-[#C4A574]/40"
                    style={{ background: 'rgba(0,0,0,0.35)' }}
                  >
                    {liveValue}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border-2 border-[#4ADE80]/50 shrink-0"
                    style={{ background: '#141B16', color: '#4ADE80' }}
                  >
                    {costMetric}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Tablet-only in-place drill-in */}
        {panelProps && (
          <div className="lg:hidden">
            <ChapterConfigPanel {...panelProps} />
          </div>
        )}
      </div>

      {/* Desktop fly-out — preserves left menu, overlays canvas to the right */}
      {panelProps && (
        <div
          className="hidden lg:flex absolute left-full top-0 bottom-0 w-[300px] z-40 flex-col overflow-hidden border-r-[3px] border-[#F27A22] shadow-[8px_0_24px_rgba(0,0,0,0.45)]"
          style={{
            background: 'linear-gradient(180deg, #1A170F 0%, #12100C 100%)',
          }}
        >
          <div
            className="px-3 py-2.5 flex items-center justify-between flex-shrink-0 border-b-2 border-[#1A1A1A]"
            style={{ background: 'linear-gradient(180deg, #1B4332 0%, #142920 100%)' }}
          >
            <span className="text-[11px] font-bold text-[#E5B842] uppercase tracking-wide truncate">
              {activeChapterMeta?.menuLabel}
            </span>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="text-[10px] font-bold text-[#FAF6EE] hover:text-[#E5B842] px-2 py-1 rounded border border-[#C4A574]/60"
              title="Close options"
            >
              ✕
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto no-scrollbar px-3 py-3"
            style={{ scrollbarWidth: 'none' }}
          >
            <ChapterConfigPanel {...panelProps} />
          </div>
        </div>
      )}

      {/* Studio hub */}
      <div
        className="p-2 lg:p-3 flex flex-col gap-1.5 flex-shrink-0 z-10"
        style={{
          background: 'linear-gradient(180deg, #1B4332 0%, #0D130F 100%)',
          borderTop: '2px solid #C4A574',
          boxShadow: 'inset 0 1px 0 rgba(229,184,66,0.2)',
        }}
      >
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <div className="w-6 h-6 rounded-[4px] bg-[#E5B842] text-[#141B16] flex items-center justify-center font-bold text-xs shadow">
            FF
          </div>
          <div className="hidden lg:block">
            <div className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">
              Studio Hub
            </div>
            <div className="text-[8px] text-[#4ADE80] font-mono leading-none">CONTINUUM ACTIVE</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-between pt-1 border-t border-white/10 text-[8px] text-white/50">
          <button
            onClick={() => setActive(active ? null : 'height')}
            className="hover:text-[#E5B842] transition"
          >
            {active ? '✕ Close Panel' : '☰ Open Options'}
          </button>
          <button
            onClick={onResetDefaults}
            className="hover:text-[#F27A22] transition"
            title="Reset to 8 LF standard"
          >
            ↺ Reset 8 LF
          </button>
        </div>
      </div>
    </aside>
  )
}
