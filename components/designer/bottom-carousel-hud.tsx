'use client'

import React, { useMemo } from 'react'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'
import { useInfiniteLoop } from '@/hooks/use-infinite-loop'
import { getChapterOptions } from '@/lib/configurator/options-catalog'
import { cn } from '@/lib/utils'

interface BottomCarouselHudProps {
  config: FenceConfiguration
  pricing: PricingBreakdown
  trialPricing?: PricingBreakdown
  onChange: (updated: Partial<FenceConfiguration>) => void
  onResetDefaults: () => void
  onSaveToFolio: () => void
  onOpenLedgerModal?: () => void
  activeChapter?: string | null
  onSelectChapter?: (chapterId: string | null) => void
  /** @deprecated Docked layout is the default — overlay is no longer used. */
  overlay?: boolean
}

interface DynamicCard {
  id: string
  title: string
  subtitle?: string
  cost?: string
  description?: string
  colorPreview?: string
  thumbSrc?: string
  selected?: boolean
  onSelect?: () => void
  tone: 'brown' | 'tan'
}

const INK = '#1A1A1A'

/** Minimal docked slide height — fence sits above this row. */
const SLIDE =
  'w-[22%] min-w-[168px] max-w-[220px] h-[84px] shrink-0 rounded-xl overflow-hidden flex flex-col relative border-2 border-[#1A1A1A]'

const TONE = {
  brown: {
    background: 'linear-gradient(180deg, #5C4030 0%, #3D2414 100%)',
    border: '#3D2414',
    title: '#FFFFFF',
    body: 'rgba(255,255,255,0.78)',
    chip: 'rgba(0,0,0,0.35)',
  },
  tan: {
    background: 'linear-gradient(180deg, #E8D4BC 0%, #DCC4A4 100%)',
    border: '#8B7355',
    title: '#1A1A1A',
    body: 'rgba(26,26,26,0.7)',
    chip: 'rgba(255,255,255,0.4)',
  },
} as const

export function BottomCarouselHud({
  config,
  onChange,
  activeChapter,
}: BottomCarouselHudProps) {
  // Always docked; default to stain options when no chapter is open.
  const chapterId = activeChapter || 'stain'

  const cards: DynamicCard[] = useMemo(() => {
    const list: DynamicCard[] = []
    let toneIdx = 0
    const nextTone = (): 'brown' | 'tan' => {
      const t = toneIdx % 2 === 0 ? 'brown' : 'tan'
      toneIdx += 1
      return t
    }

    if (chapterId === 'gates') {
      list.push(
        {
          id: 'gate-walk',
          title: '4ft Walk Gate',
          subtitle: 'Simpson Strong-Tie',
          cost: '$385/ea',
          description: 'Steel anti-sag frame with padlockable gravity latch.',
          colorPreview: 'linear-gradient(135deg, #D97706, #92400E)',
          selected: (config.gates?.walkGates || 0) > 0,
          tone: nextTone(),
          onSelect: () =>
            onChange({
              gates: {
                walkGates: (config.gates?.walkGates || 0) > 0 ? 0 : 1,
                driveGates: config.gates?.driveGates || 0,
              },
            }),
        },
        {
          id: 'gate-drive',
          title: '10ft Double Drive Gate',
          subtitle: 'Commercial Frame',
          cost: '$850/ea',
          description: 'Heavy duty dual leaf vehicle access gate assembly.',
          colorPreview: 'linear-gradient(135deg, #B45309, #78350F)',
          selected: (config.gates?.driveGates || 0) > 0,
          tone: nextTone(),
          onSelect: () =>
            onChange({
              gates: {
                walkGates: config.gates?.walkGates || 0,
                driveGates: (config.gates?.driveGates || 0) > 0 ? 0 : 1,
              },
            }),
        },
      )
      return list
    }

    for (const option of getChapterOptions(chapterId)) {
      list.push({
        id: option.id,
        title: option.label,
        subtitle: option.description,
        cost: option.costLabel,
        description: option.description,
        colorPreview: option.colorPreview,
        thumbSrc: option.thumbSrc,
        selected: option.selectedWhen(config),
        tone: nextTone(),
        onSelect: () => onChange(option.patch),
      })
    }

    return list
  }, [config, chapterId, onChange])

  const { containerRef, tripled, handleScroll } = useInfiniteLoop(cards, 'x')

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.28)
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const chevronClass =
    'hidden sm:flex w-6 h-[84px] bg-[#3D2414] hover:bg-[#5C4030] text-white/80 hover:text-white border-2 border-[#8B7355] rounded-xl items-center justify-center text-[10px] transition flex-shrink-0 shadow-[2px_2px_0_#1A1A1A] cursor-pointer'

  return (
    <footer
      className="w-full flex-shrink-0 z-20 font-['Rowdies'] select-none flex items-center gap-1.5 px-1.5 py-1 min-w-0 overflow-hidden border-t-2 border-t-[#1A1A1A]"
      style={{
        backgroundColor: '#F4ECDC',
        backgroundImage:
          'linear-gradient(rgba(46, 139, 78, 0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 139, 78, 0.45) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0',
      }}
    >
      <button onClick={() => scrollCarousel('left')} className={chevronClass} title="Scroll Left">
        ◀
      </button>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 min-w-0 flex items-center gap-4 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth"
      >
        {tripled.map((card, idx) => {
          const tone = TONE[card.tone]
          return (
            <button
              key={`${card.id}-${idx}`}
              type="button"
              onClick={card.onSelect}
              className={cn(
                SLIDE,
                'text-left cursor-pointer transition-transform duration-150',
                card.selected && '-translate-y-0.5',
              )}
              style={{
                background: tone.background,
                borderColor: card.selected ? INK : tone.border,
                boxShadow: card.selected
                  ? `2px 2px 0 ${INK}, 0 0 0 2px #D9B872`
                  : `2px 2px 0 ${INK}`,
              }}
            >
              <div className="flex items-center justify-between gap-1 px-2 py-1 border-b border-black/25 flex-shrink-0">
                <div className="flex items-center gap-1.5 min-w-0">
                  {card.thumbSrc ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={card.thumbSrc}
                      alt=""
                      className="w-4 h-4 rounded border border-black/30 object-contain shrink-0 bg-black/20"
                    />
                  ) : card.colorPreview ? (
                    <span
                      className="w-3 h-3 rounded-full border border-black/30 shrink-0"
                      style={{ background: card.colorPreview }}
                    />
                  ) : null}
                  <span
                    className="font-bold uppercase tracking-wide text-[10px] truncate"
                    style={{ color: tone.title }}
                  >
                    {card.title}
                  </span>
                </div>
                {card.cost ? (
                  <span
                    className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0"
                    style={{ background: tone.chip, color: tone.title }}
                  >
                    {card.cost}
                  </span>
                ) : null}
              </div>

              <div className="flex-1 flex flex-col justify-between px-2 py-1 min-h-0">
                <p className="text-[8px] font-light leading-snug line-clamp-2" style={{ color: tone.body }}>
                  {card.description || card.subtitle}
                </p>
                <span className="text-[8px] font-bold" style={{ color: tone.title }}>
                  {card.selected ? 'Active ✓' : 'Select ▶'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <button onClick={() => scrollCarousel('right')} className={chevronClass} title="Scroll Right">
        ▶
      </button>
    </footer>
  )
}
