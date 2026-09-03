'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'
import { useInfiniteLoop } from '@/hooks/use-infinite-loop'
import { ChapterConfigPanel } from '@/components/designer/chapter-config-panel'
import {
  CHAPTERS,
  getChapterCostMetric,
  getChapterLivePreview,
} from '@/lib/configurator/options-catalog'
import { cn } from '@/lib/utils'

interface LeftOptionRailProps {
  config: FenceConfiguration
  onChange: (updated: Partial<FenceConfiguration>) => void
  activeChapter?: string | null
  onSelectChapter?: (chapterId: string | null) => void
  onResetDefaults?: () => void
}

export { CHAPTERS, getChapterCostMetric }

/** Dark brown + light tan cycle on the green rail. */
const MENU_TONES = [
  {
    id: 'brown',
    background: 'linear-gradient(180deg, #5C4030 0%, #3D2414 100%)',
    border: '#3D2414',
    label: '#FFFFFF',
    sub: 'rgba(255,255,255,0.75)',
    chipBorder: 'rgba(196,165,116,0.45)',
  },
  {
    id: 'tan',
    background: 'linear-gradient(180deg, #E8D4BC 0%, #DCC4A4 100%)',
    border: '#8B7355',
    label: '#1A1A1A',
    sub: 'rgba(26,26,26,0.65)',
    chipBorder: 'rgba(61,36,20,0.35)',
  },
] as const

function menuToneForChapter(num: string) {
  const n = Math.max(1, parseInt(num, 10) || 1)
  return MENU_TONES[(n - 1) % MENU_TONES.length]
}

const railShellStyle: React.CSSProperties = {
  backgroundColor: '#1C180E',
  backgroundImage:
    'linear-gradient(rgba(0, 0, 0, 0.40) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.40) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.85) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.85) 2px, transparent 2px), linear-gradient(145deg, #0D120F 0%, #142920 28%, #1B4332 58%, #3D3014 100%)',
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

  // Infinite loop only on the main chapter list (in-rail drill-in replaces it).
  const { containerRef, tripled, handleScroll } = useInfiniteLoop(CHAPTERS, 'y')

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
        "hidden md:flex flex-shrink-0 flex-col justify-between select-none font-['Rowdies'] relative z-30 h-full min-h-0",
        'w-[88px] lg:w-[300px]',
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
        {active ? (
          <button
            onClick={() => setActive(null)}
            className="flex items-center justify-center w-full gap-2 text-[10px] lg:text-[11px] text-[#FAF6EE] hover:text-[#E5B842] transition font-bold uppercase px-2 py-2 rounded-md border-2 border-[#C4A574]"
            style={{ background: 'linear-gradient(180deg, #3D3014 0%, #2A2218 100%)' }}
            title="Return to all options"
          >
            <span>◀</span>
            <span className="hidden lg:inline truncate">
              Back · {activeChapterMeta?.menuLabel ?? 'Menu'}
            </span>
          </button>
        ) : (
          <div className="w-full flex items-center justify-between gap-2">
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
        )}
      </div>

      {/* Scroll body — main menu OR in-rail detail (no side fly-out) */}
      <div
        ref={active ? undefined : containerRef}
        onScroll={active ? undefined : handleScroll}
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth relative',
          'px-2 lg:px-4 py-4 lg:py-5',
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
        {!active && (
          <div className="flex flex-col gap-3 lg:gap-4 pb-8">
            {tripled.map((ch, idx) => {
              const costMetric = getChapterCostMetric(ch.id, config)
              const liveValue = getChapterLivePreview(ch.id, config)
              const tone = menuToneForChapter(ch.num)

              return (
                <button
                  key={`${ch.id}-${idx}`}
                  onClick={() => setActive(ch.id)}
                  className={cn(
                    'w-full rounded-xl text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group',
                    'min-h-[64px] lg:min-h-[100px] gap-2 lg:gap-3 hover:-translate-y-0.5',
                  )}
                  style={{
                    background: tone.background,
                    border: `2px solid ${tone.border}`,
                    boxShadow: '3px 3px 0 #1A1A1A, inset 0 1px 0 rgba(250,246,238,0.18)',
                    padding: '0.85rem 0.7rem',
                  }}
                  title={ch.menuLabel}
                >
                  {/* Compact tablet face */}
                  <div className="flex lg:hidden flex-col items-center gap-1 text-center">
                    <span className="font-mono font-bold text-[11px] drop-shadow-sm" style={{ color: tone.label }}>
                      {ch.num}
                    </span>
                    <span className="text-[8px] font-bold uppercase leading-tight" style={{ color: tone.label }}>
                      {ch.menuLabel.split(' ')[0]}
                    </span>
                  </div>

                  {/* Full desktop face */}
                  <div className="hidden lg:flex items-start gap-3 w-full">
                    <span className="text-sm leading-none mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 font-bold" style={{ color: tone.label }}>
                      ▶
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-bold uppercase tracking-wide leading-tight"
                        style={{ color: tone.label }}
                      >
                        {ch.menuLabel}
                      </div>
                      <div className="text-[10px] font-light mt-1 truncate" style={{ color: tone.sub }}>
                        {ch.label}
                      </div>
                    </div>
                    <span
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-[11px] border-2"
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        color: '#E5B842',
                        borderColor: tone.chipBorder,
                      }}
                    >
                      {ch.num}
                    </span>
                  </div>

                  <div className="hidden lg:flex items-center justify-between gap-2 pt-2 border-t border-black/25 w-full">
                    <span
                      className="text-[10px] text-[#FAF6EE] font-semibold truncate max-w-[58%] px-2.5 py-1 rounded-md border"
                      style={{ background: 'rgba(0,0,0,0.35)', borderColor: tone.chipBorder }}
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
        )}

        {/* In-rail detail menu (replaces main list) */}
        {panelProps && <ChapterConfigPanel {...panelProps} />}
      </div>

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
