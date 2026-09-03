'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
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
  /** When true, pins carousel as a bottom overlay on the elevation canvas. */
  overlay?: boolean
}

interface DynamicCard {
  id: string
  type: 'swatch'
  title: string
  subtitle?: string
  cost?: string
  description?: string
  colorPreview?: string
  thumbSrc?: string
  selected?: boolean
  onSelect?: () => void
}

const GOLD = '#D9B872'
const INK = '#1A1A1A'
const FOREST = '#16432D'
const WOOD_TX = '/images/textures/trial-planks-knots.png'

/** Compact slides — keep fence center clear; neighbors peek from the sides. */
const SLIDE =
  'w-[26%] min-w-[200px] max-w-[280px] h-[118px] shrink-0 rounded-xl overflow-hidden flex flex-col relative border-[2px] border-[#1A1A1A]'

function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#D9B872] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[#1A1A1A] border border-[#1A1A1A]/20">
      {children}
    </span>
  )
}

export function BottomCarouselHud({
  config,
  onChange,
  activeChapter,
  overlay = false,
}: BottomCarouselHudProps) {
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollIdleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Only mount when a chapter that needs option cards is selected.
  const chapterId = activeChapter || null

  const cards: DynamicCard[] = useMemo(() => {
    if (!chapterId) return []

    const list: DynamicCard[] = []

    if (chapterId === 'gates') {
      list.push(
        {
          id: 'gate-walk',
          type: 'swatch',
          title: '4ft Walk Gate',
          subtitle: 'Simpson Strong-Tie',
          cost: '$385/ea',
          description: 'Steel anti-sag frame with padlockable gravity latch.',
          colorPreview: 'linear-gradient(135deg, #D97706, #92400E)',
          selected: (config.gates?.walkGates || 0) > 0,
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
          type: 'swatch',
          title: '10ft Double Drive Gate',
          subtitle: 'Commercial Frame',
          cost: '$850/ea',
          description: 'Heavy duty dual leaf vehicle access gate assembly.',
          colorPreview: 'linear-gradient(135deg, #B45309, #78350F)',
          selected: (config.gates?.driveGates || 0) > 0,
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
        type: 'swatch',
        title: option.label,
        subtitle: option.description,
        cost: option.costLabel,
        description: option.description,
        colorPreview: option.colorPreview,
        thumbSrc: option.thumbSrc,
        selected: option.selectedWhen(config),
        onSelect: () => onChange(option.patch),
      })
    }

    return list
  }, [config, chapterId, onChange])

  const { containerRef, tripled, handleScroll } = useInfiniteLoop(cards, 'x')

  useEffect(() => {
    return () => {
      if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
    }
  }, [])

  if (!chapterId || cards.length === 0) return null

  const onTrackScroll = () => {
    handleScroll()
    setIsScrolling(true)
    if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
    scrollIdleTimer.current = setTimeout(() => setIsScrolling(false), 220)
  }

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.3)
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
    setIsScrolling(true)
    if (scrollIdleTimer.current) clearTimeout(scrollIdleTimer.current)
    scrollIdleTimer.current = setTimeout(() => setIsScrolling(false), 420)
  }

  const chevronClass =
    'hidden sm:flex w-7 h-[118px] bg-[#3D2414]/80 hover:bg-[#5C4030] text-white/80 hover:text-white border-2 border-[#8B7355] rounded-xl items-center justify-center text-[10px] transition flex-shrink-0 shadow-[2px_2px_0_#1A1A1A] cursor-pointer'

  return (
    <footer
      className={cn(
        "w-full flex-shrink-0 z-20 font-['Rowdies'] select-none flex items-end gap-3",
        overlay
          ? 'absolute left-0 right-0 bottom-[6%] pt-0 pb-0 px-2 overflow-visible min-w-0 border-0 bg-transparent pointer-events-none'
          : 'relative py-2 px-3 border-t-[2px] border-t-[#16432D]/40 overflow-hidden min-w-0',
      )}
      style={
        overlay
          ? { backgroundColor: 'transparent', backgroundImage: 'none' }
          : {
              backgroundColor: '#F4ECDC',
              backgroundImage:
                'linear-gradient(rgba(46, 139, 78, 0.50) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 139, 78, 0.50) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)',
              backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
              backgroundPosition: '0 0',
            }
      }
    >
      <button
        onClick={() => scrollCarousel('left')}
        className={cn(chevronClass, 'pointer-events-auto')}
        title="Scroll Left (Infinite)"
      >
        ◀
      </button>

      {/*
        Center of the stage stays clear of the fence: strong side-weighted mask.
        While scrolling, cards go translucent so the elevation reads through.
      */}
      <div
        ref={containerRef}
        onScroll={onTrackScroll}
        className={cn(
          'flex-1 min-w-0 flex items-end gap-6 overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth py-1 px-0.5 relative pointer-events-auto transition-opacity duration-200',
          isScrolling ? 'opacity-40' : 'opacity-90',
        )}
        style={{
          maskImage:
            'linear-gradient(to right, black 0%, black 22%, transparent 36%, transparent 64%, black 78%, black 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, black 0%, black 22%, transparent 36%, transparent 64%, black 78%, black 100%)',
        }}
      >
        {tripled.map((card, idx) => (
          <button
            key={`${card.id}-${idx}`}
            type="button"
            onClick={card.onSelect}
            className={cn(
              SLIDE,
              'text-left cursor-pointer transition-all duration-200',
              card.selected && '-translate-y-1',
              isScrolling && 'scale-[0.96]',
            )}
            style={{
              backgroundColor: '#5C3A22',
              backgroundImage: card.thumbSrc
                ? `linear-gradient(#C8B89A 0 48%, #4A2C1A 48% 100%), url('${card.thumbSrc}')`
                : card.colorPreview
                  ? `${card.colorPreview}`
                  : `linear-gradient(#C8B89A 0 48%, #4A2C1A 48% 100%), url('${WOOD_TX}')`,
              backgroundSize: card.thumbSrc ? '100% 100%, contain' : 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              boxShadow: card.selected ? `2px 2px 0 ${INK}, 0 0 0 2px ${GOLD}` : `2px 2px 0 ${INK}`,
            }}
          >
            <div
              className="flex items-center justify-between px-2.5 py-1 flex-shrink-0 border-b border-[#1A1A1A]"
              style={{ background: FOREST, color: '#FAF6EE' }}
            >
              <span className="font-bold text-[11px] truncate">{card.title}</span>
              {card.cost ? (
                <span className="text-[9px] font-bold shrink-0 ml-2">{card.cost}</span>
              ) : null}
            </div>

            <div className="mt-auto mx-2 mb-2 rounded-lg border border-[#1A1A1A]/35 bg-[#FAF6EE]/95 px-2 py-1.5">
              <GoldBadge>{card.selected ? 'Active' : 'Select'}</GoldBadge>
              <div className="mt-0.5 font-bold text-[12px] leading-tight truncate" style={{ color: FOREST }}>
                {card.title}
              </div>
              <p className="text-[9px] font-light leading-snug text-[#383B3E] line-clamp-1">
                {card.description || card.subtitle}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => scrollCarousel('right')}
        className={cn(chevronClass, 'pointer-events-auto')}
        title="Scroll Right (Infinite)"
      >
        ▶
      </button>
    </footer>
  )
}
