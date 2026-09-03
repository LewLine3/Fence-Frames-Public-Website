'use client'

import React, { useMemo, useState } from 'react'
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
  type: 'calc' | 'swatch' | 'specs' | 'action' | 'takeoff'
  title: string
  subtitle?: string
  badge?: string
  cost?: string
  description?: string
  colorPreview?: string
  thumbSrc?: string
  selected?: boolean
  onSelect?: () => void
}

const GOLD = '#D9B872'
const INK = '#1A1A1A'
const IVORY = '#FAF6EE'
const FOREST = '#16432D'
const EMBER = '#C2622D'
const WOOD_TX = '/images/textures/trial-planks-knots.png'

/** ~1 full card + two peeking neighbors (2–3 visible). */
const SLIDE =
  'w-[42%] min-w-[360px] max-w-[560px] h-[188px] shrink-0 rounded-md overflow-hidden flex flex-col relative border-[2px] border-[#1A1A1A]'

const hatchGold: React.CSSProperties = {
  backgroundColor: GOLD,
  backgroundImage:
    'repeating-linear-gradient(-45deg, rgba(26,26,26,0.12) 0px, rgba(26,26,26,0.12) 1.5px, transparent 1.5px, transparent 10px)',
}

const majorForest: React.CSSProperties = {
  backgroundColor: FOREST,
  backgroundImage:
    'linear-gradient(rgba(217,184,114,0.25) 2px, transparent 2px), linear-gradient(90deg, rgba(217,184,114,0.25) 2px, transparent 2px)',
  backgroundSize: '60px 60px',
}

const microQuad: React.CSSProperties = {
  backgroundColor: '#1F4A32',
  backgroundImage:
    'linear-gradient(rgba(250,246,238,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(250,246,238,0.10) 1px, transparent 1px)',
  backgroundSize: '10px 10px',
}

const timberGrain: React.CSSProperties = {
  backgroundColor: '#6B4A2E',
  backgroundImage: `url('${WOOD_TX}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}

function GoldBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#D9B872] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#1A1A1A] border border-[#1A1A1A]/20">
      {children}
    </span>
  )
}

function TitleBar({
  tone,
  tab,
  children,
}: {
  tone: 'ink' | 'gold'
  tab?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className="flex items-center justify-between px-3 py-1.5 flex-shrink-0 border-b-2 border-[#1A1A1A]"
      style={{
        background: tone === 'ink' ? INK : GOLD,
        color: tone === 'ink' ? GOLD : INK,
        clipPath: tab ? 'polygon(12px 0, 100% 0, 100% 100%, 0 100%, 0 8px)' : undefined,
      }}
    >
      {children}
    </div>
  )
}

function EmberCorner() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0 z-10 h-7 w-7"
      style={{ borderRight: `4px solid ${EMBER}`, borderBottom: `4px solid ${EMBER}` }}
    />
  )
}

function OverlayPlate({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-auto mx-2.5 mb-2.5 rounded-lg border border-black/50 bg-[#141B16]/94 px-3 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
      {children}
    </div>
  )
}

export function BottomCarouselHud({
  config,
  pricing,
  trialPricing,
  onChange,
  onResetDefaults,
  onSaveToFolio,
  onOpenLedgerModal,
  activeChapter,
  overlay = false,
}: BottomCarouselHudProps) {
  const [activeMathModel, setActiveMathModel] = useState<'canonical' | 'trial'>('canonical')

  const activePricing = activeMathModel === 'trial' && trialPricing ? trialPricing : pricing

  const cards: DynamicCard[] = useMemo(() => {
    const list: DynamicCard[] = []

    list.push({
      id: 'pricing-calculator',
      type: 'calc',
      title: 'Pricing Calculator',
      subtitle: `${config.linearFeet} LF Standard`,
    })

    const chapterId = activeChapter || 'stain'
    const chapterOptions = getChapterOptions(chapterId)

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
    } else {
      for (const option of chapterOptions) {
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
    }

    list.push({ id: 'job-specs', type: 'specs', title: 'Job Specs' })
    list.push({ id: 'folio-dispatch', type: 'action', title: 'Folio & 3-Bid' })
    list.push({ id: 'takeoff-ledger', type: 'takeoff', title: 'Fence-Folio' })

    return list
  }, [config, activeChapter, onChange])

  const { containerRef, tripled, handleScroll } = useInfiniteLoop(cards, 'x')

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    const amount = Math.round(el.clientWidth * 0.42)
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  const chevronClass =
    'hidden sm:flex w-8 h-[188px] bg-[#3D2414] hover:bg-[#5C4030] text-white/80 hover:text-white border-2 border-[#8B7355] rounded-md items-center justify-center text-[11px] transition flex-shrink-0 shadow-[3px_3px_0_#1A1A1A] cursor-pointer'

  return (
    <footer
      className={cn(
        "w-full flex-shrink-0 z-20 font-['Rowdies'] select-none flex items-end gap-2",
        overlay
          ? 'absolute left-0 right-0 bottom-[7%] pt-0 pb-0 px-2 overflow-visible min-w-0 border-0 bg-transparent'
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
      <button onClick={() => scrollCarousel('left')} className={chevronClass} title="Scroll Left (Infinite)">
        ◀
      </button>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 min-w-0 flex items-end gap-3 overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth py-1 px-0.5 relative"
      >
        {tripled.map((card, idx) => {
          switch (card.type) {
            case 'calc':
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className={SLIDE}
                  style={{ ...hatchGold, boxShadow: '3px 3px 0 #1A1A1A' }}
                >
                  <TitleBar tone="ink">
                    <span className="font-bold uppercase tracking-wide text-[13px] truncate">
                      Instant 2D Takeoff Calculator
                    </span>
                    <div className="flex bg-black/40 p-0.5 rounded border border-[#D9B872]/40 text-[8px] shrink-0 ml-2">
                      <button
                        onClick={() => setActiveMathModel('canonical')}
                        className={`px-1.5 py-0.5 rounded transition ${
                          activeMathModel === 'canonical' ? 'bg-[#D9B872] text-[#1A1A1A] font-bold' : 'text-[#D9B872]/80'
                        }`}
                      >
                        Canon
                      </button>
                      <button
                        onClick={() => setActiveMathModel('trial')}
                        className={`px-1.5 py-0.5 rounded transition ${
                          activeMathModel === 'trial' ? 'bg-[#D9B872] text-[#1A1A1A] font-bold' : 'text-[#D9B872]/80'
                        }`}
                      >
                        Trial
                      </button>
                    </div>
                  </TitleBar>

                  <div className="flex-1 flex flex-col justify-between px-3 py-2 min-h-0">
                    <div>
                      <GoldBadge>Standard · {config.linearFeet} LF</GoldBadge>
                      <div className="mt-1.5 font-bold text-white text-[20px] leading-tight drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]">
                        ${activePricing.totalMin.toLocaleString()} — ${activePricing.totalMax.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <input
                        type="range"
                        min="8"
                        max="300"
                        step="1"
                        value={config.linearFeet}
                        onChange={(e) => onChange({ linearFeet: Number(e.target.value) })}
                        className="w-full h-1.5 bg-black/35 rounded-lg appearance-none cursor-pointer accent-[#1A1A1A]"
                      />
                      <div className="flex items-center gap-1">
                        {[8, 48, 96, 120, 200].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => onChange({ linearFeet: preset })}
                            className={`px-2 py-0.5 text-[9px] rounded border transition ${
                              config.linearFeet === preset
                                ? 'bg-[#1A1A1A] text-[#D9B872] font-bold border-[#1A1A1A]'
                                : 'bg-white/35 hover:bg-[#1A1A1A] hover:text-[#D9B872] text-[#1A1A1A] border-[#1A1A1A]/40'
                            }`}
                          >
                            {preset} LF
                          </button>
                        ))}
                        <span className="ml-auto text-[9px] font-bold text-[#1A1A1A]">
                          ${activePricing.pricePerLfMin.toFixed(2)}/LF
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )

            case 'swatch':
              return (
                <button
                  key={`${card.id}-${idx}`}
                  type="button"
                  onClick={card.onSelect}
                  className={cn(SLIDE, 'text-left cursor-pointer transition-transform', card.selected && '-translate-y-1')}
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
                    boxShadow: card.selected ? `3px 3px 0 ${INK}, 0 0 0 2px ${GOLD}` : `3px 3px 0 ${INK}`,
                  }}
                >
                  <TitleBar tone="gold">
                    <span className="font-bold text-[13px] truncate">{card.title}</span>
                    {card.cost ? (
                      <span className="text-[10px] font-bold shrink-0 ml-2">{card.cost}</span>
                    ) : null}
                  </TitleBar>

                  <OverlayPlate>
                    <GoldBadge>
                      {card.selected ? 'Active' : 'Select'} · {card.subtitle || card.title}
                    </GoldBadge>
                    <div className="mt-1 font-bold text-[16px] leading-tight" style={{ color: GOLD }}>
                      {card.title}
                    </div>
                    <p className="mt-0.5 text-[11px] font-light leading-snug text-white/90 line-clamp-2">
                      {card.description}
                    </p>
                  </OverlayPlate>
                </button>
              )

            case 'specs':
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className={SLIDE}
                  style={{ ...majorForest, boxShadow: '3px 3px 0 #1A1A1A' }}
                >
                  <TitleBar tone="gold">
                    <span className="font-bold text-[13px]">Job Specs</span>
                    <span className="text-[9px] font-bold uppercase">ARC-01</span>
                  </TitleBar>
                  <div className="flex-1 flex flex-col items-start justify-between px-3 py-2.5 min-h-0">
                    <GoldBadge>
                      {config.heightFt}&apos; H · {config.postSpacingFt}&apos; Bay
                    </GoldBadge>
                    <div>
                      <div className="font-bold text-[18px] leading-tight" style={{ color: GOLD }}>
                        {config.postType.split('-')[0].toUpperCase()} · {config.railCount}-Rail
                        {config.topCap ? ' + Cap' : ''}
                      </div>
                      <div className="mt-1 text-[11px] font-light" style={{ color: IVORY }}>
                        Infill {config.fillPattern === 'board-on-board' ? 'Board-on-Board' : 'Standard'} · Stain{' '}
                        {config.stainType.split('-')[0]} · Gates {config.gates?.walkGates || 0}W
                      </div>
                    </div>
                  </div>
                  <EmberCorner />
                </div>
              )

            case 'action':
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className={SLIDE}
                  style={{ ...timberGrain, boxShadow: '3px 3px 0 #1A1A1A' }}
                >
                  <TitleBar tone="gold" tab>
                    <span className="font-bold text-[13px]">Folio &amp; 3-Bid</span>
                    <span className="text-[9px] font-bold uppercase">Ready</span>
                  </TitleBar>
                  <OverlayPlate>
                    <GoldBadge>Dispatch · Fence-Folio</GoldBadge>
                    <div className="mt-1 font-bold text-[16px] leading-tight" style={{ color: GOLD }}>
                      Open Fence-Folio
                    </div>
                    <p className="mt-0.5 text-[11px] font-light text-white/90">
                      Lock the takeoff and get 3 matched bids. 72-hr refund · ARC ready.
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <button
                        onClick={onResetDefaults}
                        className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] rounded border border-white/25"
                        title="Reset 8 LF"
                      >
                        ↺
                      </button>
                      <button
                        onClick={onSaveToFolio}
                        className="flex-1 rounded bg-[#D9B872] hover:bg-[#E5B842] text-[#1A1A1A] font-bold text-[12px] py-1.5 border-2 border-[#1A1A1A]"
                      >
                        Save to Folio →
                      </button>
                    </div>
                  </OverlayPlate>
                </div>
              )

            case 'takeoff':
              return (
                <div
                  key={`${card.id}-${idx}`}
                  className={SLIDE}
                  style={{ ...microQuad, boxShadow: '3px 3px 0 #1A1A1A' }}
                >
                  <TitleBar tone="gold">
                    <span className="font-bold text-[13px]">Fence-Folio</span>
                    <button
                      onClick={onOpenLedgerModal}
                      className="text-[10px] font-bold hover:underline"
                    >
                      Open ↗
                    </button>
                  </TitleBar>
                  <div className="flex-1 flex flex-col items-start justify-between px-3 py-2.5 min-h-0">
                    <GoldBadge>Materials · Labor · Admin</GoldBadge>
                    <div>
                      <div className="font-bold text-[18px] leading-tight" style={{ color: GOLD }}>
                        ${activePricing.materialsCostMin} · ${activePricing.laborCostMin} · $
                        {activePricing.adminPermitCost}
                      </div>
                      <div className="mt-1 text-[11px] font-light" style={{ color: IVORY }}>
                        {Math.ceil(config.linearFeet / 8) + 1} Posts · {config.linearFeet * 2} Pickets · Synced
                      </div>
                    </div>
                  </div>
                  <EmberCorner />
                </div>
              )

            default: {
              const _never: never = card.type
              return _never
            }
          }
        })}
      </div>

      <button onClick={() => scrollCarousel('right')} className={chevronClass} title="Scroll Right (Infinite)">
        ▶
      </button>
    </footer>
  )
}
