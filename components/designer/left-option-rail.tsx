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

const GOLD = '#D9B872'
const INK = '#1A1A1A'
const FOREST = '#1B4332'
const FOREST_DEEP = '#16432D'
const WOOD_TX = '/images/textures/trial-planks-knots.png'

type ChapterSkin = {
  id: string
  headerBg: string
  headerFg: string
  body: React.CSSProperties
  titleColor: string
  subColor: string
  useOverlay?: boolean
}

/** Inventory-lab skins for vertical option cards (cycles by chapter #). */
const CHAPTER_SKINS: ChapterSkin[] = [
  {
    id: 'woodPlanks',
    headerBg: FOREST,
    headerFg: '#FAF6EE',
    body: {
      backgroundColor: '#E8DCC8',
      backgroundImage: `linear-gradient(rgba(232,220,200,0.55), rgba(232,220,200,0.55)), url('${WOOD_TX}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    titleColor: FOREST_DEEP,
    subColor: 'rgba(22,67,45,0.75)',
  },
  {
    id: 'tanBlackGrid',
    headerBg: FOREST,
    headerFg: '#FAF6EE',
    body: {
      backgroundColor: '#E8DCC8',
      backgroundImage:
        'linear-gradient(rgba(26,26,26,0.18) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(26,26,26,0.18) 1.5px, transparent 1.5px)',
      backgroundSize: '28px 28px',
    },
    titleColor: FOREST_DEEP,
    subColor: 'rgba(22,67,45,0.75)',
  },
  {
    id: 'hatchCream',
    headerBg: FOREST,
    headerFg: '#FAF6EE',
    body: {
      backgroundColor: '#FAF6EE',
      backgroundImage:
        'repeating-linear-gradient(45deg, rgba(22,67,45,0.12) 0px, rgba(22,67,45,0.12) 1.5px, transparent 1.5px, transparent 10px)',
    },
    titleColor: FOREST_DEEP,
    subColor: 'rgba(22,67,45,0.75)',
  },
  {
    id: 'doublePlank',
    headerBg: FOREST,
    headerFg: '#FAF6EE',
    body: {
      backgroundColor: '#D8C7A5',
      backgroundImage:
        'repeating-linear-gradient(0deg, rgba(26,26,26,0.16) 0px, rgba(26,26,26,0.16) 2px, transparent 2px, transparent 28px)',
    },
    titleColor: FOREST_DEEP,
    subColor: 'rgba(22,67,45,0.75)',
  },
  {
    id: 'hatchGold',
    headerBg: INK,
    headerFg: GOLD,
    body: {
      backgroundColor: GOLD,
      backgroundImage:
        'repeating-linear-gradient(-45deg, rgba(26,26,26,0.12) 0px, rgba(26,26,26,0.12) 1.5px, transparent 1.5px, transparent 10px)',
    },
    titleColor: '#FFFFFF',
    subColor: 'rgba(26,26,26,0.7)',
  },
  {
    id: 'overlayWood',
    headerBg: FOREST,
    headerFg: '#FAF6EE',
    body: {
      backgroundColor: '#6B4A2E',
      backgroundImage: `url('${WOOD_TX}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    titleColor: FOREST_DEEP,
    subColor: 'rgba(56,59,62,0.85)',
    useOverlay: true,
  },
  {
    id: 'majorForest',
    headerBg: GOLD,
    headerFg: INK,
    body: {
      backgroundColor: FOREST_DEEP,
      backgroundImage:
        'linear-gradient(rgba(217,184,114,0.25) 2px, transparent 2px), linear-gradient(90deg, rgba(217,184,114,0.25) 2px, transparent 2px)',
      backgroundSize: '48px 48px',
    },
    titleColor: GOLD,
    subColor: 'rgba(250,246,238,0.75)',
  },
  {
    id: 'inkOverlayWood',
    headerBg: INK,
    headerFg: GOLD,
    body: {
      backgroundColor: '#5C3A22',
      backgroundImage: `linear-gradient(#C8B89A 0 45%, #4A2C1A 45% 100%), url('${WOOD_TX}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    titleColor: INK,
    subColor: 'rgba(56,59,62,0.85)',
    useOverlay: true,
  },
]

function skinForChapter(num: string): ChapterSkin {
  const n = Math.max(1, parseInt(num, 10) || 1)
  return CHAPTER_SKINS[(n - 1) % CHAPTER_SKINS.length]
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

  const { containerRef, tripled, handleScroll } = useInfiniteLoop(CHAPTERS, 'y')

  const currentIdx = CHAPTERS.findIndex((c) => c.id === active)
  const prevChapter = currentIdx > 0 ? CHAPTERS[currentIdx - 1].id : null
  const nextChapter =
    currentIdx >= 0 && currentIdx < CHAPTERS.length - 1 ? CHAPTERS[currentIdx + 1].id : null
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
            className="flex items-center justify-center w-full gap-2 text-[10px] lg:text-[11px] text-[#FAF6EE] hover:text-[#E5B842] transition font-bold uppercase px-2 py-2 rounded-xl border-2 border-[#C4A574]"
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
              className="hidden lg:inline text-[9px] text-[#FAF6EE] border-2 border-[#C4A574] px-2 py-0.5 rounded-full font-mono font-bold shadow-[1px_1px_0_#1A1A1A]"
              style={{ background: 'rgba(0,0,0,0.35)' }}
            >
              01–08 LOOP
            </span>
          </div>
        )}
      </div>

      <div
        ref={active ? undefined : containerRef}
        onScroll={active ? undefined : handleScroll}
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden no-scrollbar scroll-smooth relative',
          'px-2 lg:px-3 py-4 lg:py-5',
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
          <div className="flex flex-col gap-3 lg:gap-3.5 pb-8">
            {tripled.map((ch, idx) => {
              const costMetric = getChapterCostMetric(ch.id, config)
              const liveValue = getChapterLivePreview(ch.id, config)
              const skin = skinForChapter(ch.num)

              return (
                <button
                  key={`${ch.id}-${idx}`}
                  onClick={() => setActive(ch.id)}
                  className={cn(
                    'w-full text-left transition-all duration-200 cursor-pointer group overflow-hidden',
                    'rounded-2xl border-2 border-[#1A1A1A]',
                    'min-h-[72px] lg:min-h-[132px]',
                    'hover:-translate-y-0.5',
                  )}
                  style={{
                    boxShadow: '3px 3px 0 #1A1A1A',
                  }}
                  title={ch.menuLabel}
                >
                  {/* Compact tablet face */}
                  <div
                    className="flex lg:hidden flex-col items-stretch overflow-hidden rounded-2xl"
                    style={{ minHeight: 72 }}
                  >
                    <div
                      className="px-1.5 py-1.5 text-center border-b-2 border-[#1A1A1A]"
                      style={{ background: skin.headerBg, color: skin.headerFg }}
                    >
                      <span className="font-mono font-bold text-[11px] block">{ch.num}</span>
                    </div>
                    <div
                      className="flex-1 flex items-center justify-center px-1 py-1.5"
                      style={skin.body}
                    >
                      <span
                        className="text-[8px] font-bold uppercase leading-tight text-center"
                        style={{ color: skin.titleColor }}
                      >
                        {ch.menuLabel.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Full desktop face — inventory lab layout */}
                  <div className="hidden lg:flex flex-col h-full min-h-[132px] overflow-hidden rounded-2xl">
                    <div
                      className="flex items-center justify-between px-3 py-2 border-b-2 border-[#1A1A1A] flex-shrink-0"
                      style={{ background: skin.headerBg, color: skin.headerFg }}
                    >
                      <span className="font-bold uppercase tracking-wide text-[12px] truncate">
                        {ch.menuLabel}
                      </span>
                      <span className="font-mono text-[10px] font-bold opacity-80 shrink-0 ml-2">
                        #{ch.num}
                      </span>
                    </div>

                    <div
                      className="flex-1 flex flex-col justify-between px-2.5 py-2.5 min-h-0"
                      style={skin.body}
                    >
                      {skin.useOverlay ? (
                        <div className="mt-auto rounded-xl border border-[#1A1A1A]/50 bg-[#FAF6EE]/95 px-2.5 py-2 shadow-sm">
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#D9B872] px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#1A1A1A] border border-[#1A1A1A]/15">
                            {liveValue}
                          </span>
                          <div
                            className="mt-1 font-bold text-[14px] leading-tight truncate"
                            style={{ color: skin.titleColor }}
                          >
                            {ch.label}
                          </div>
                          <div className="mt-0.5 text-[10px] font-light truncate" style={{ color: skin.subColor }}>
                            {costMetric}
                          </div>
                        </div>
                      ) : (
                        <>
                          <span className="inline-flex self-start items-center gap-1 rounded-full bg-[#D9B872] px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#1A1A1A] border border-[#1A1A1A]/15">
                            {liveValue} · {costMetric}
                          </span>
                          <div
                            className="mt-2 font-bold text-[15px] leading-tight"
                            style={{ color: skin.titleColor }}
                          >
                            {ch.label}
                          </div>
                          <div
                            className="mt-0.5 text-[10px] font-light truncate"
                            style={{ color: skin.subColor }}
                          >
                            {ch.preview}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {panelProps && <ChapterConfigPanel {...panelProps} />}
      </div>

      <div
        className="p-2 lg:p-3 flex flex-col gap-1.5 flex-shrink-0 z-10"
        style={{
          background: 'linear-gradient(180deg, #1B4332 0%, #0D130F 100%)',
          borderTop: '2px solid #C4A574',
          boxShadow: 'inset 0 1px 0 rgba(229,184,66,0.2)',
        }}
      >
        <div className="flex items-center gap-2 justify-center lg:justify-start">
          <div className="w-6 h-6 rounded-xl bg-[#E5B842] text-[#141B16] flex items-center justify-center font-bold text-xs shadow">
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
