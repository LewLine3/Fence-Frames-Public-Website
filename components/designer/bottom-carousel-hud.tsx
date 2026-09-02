'use client'

import React, { useState, useMemo } from 'react'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'
import { useInfiniteLoop } from '@/hooks/use-infinite-loop'
import { cn } from '@/lib/utils'

interface BottomCarouselHudProps {
  config: FenceConfiguration;
  pricing: PricingBreakdown;
  trialPricing?: PricingBreakdown;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  onResetDefaults: () => void;
  onSaveToFolio: () => void;
  onOpenLedgerModal?: () => void;
  activeChapter?: string | null;
  onSelectChapter?: (chapterId: string | null) => void;
  /** When true, pins carousel as a bottom overlay on the elevation canvas. */
  overlay?: boolean;
}

interface DynamicCard {
  id: string;
  type: 'calc' | 'swatch' | 'specs' | 'action' | 'takeoff';
  title: string;
  subtitle?: string;
  badge?: string;
  cost?: string;
  description?: string;
  colorPreview?: string;
  selected?: boolean;
  onSelect?: () => void;
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
  onSelectChapter,
  overlay = false,
}: BottomCarouselHudProps) {
  const [activeMathModel, setActiveMathModel] = useState<'canonical' | 'trial'>('canonical')

  const activePricing = activeMathModel === 'trial' && trialPricing ? trialPricing : pricing

  // Dynamic cards spawned based on active selection / chapter
  const cards: DynamicCard[] = useMemo(() => {
    const list: DynamicCard[] = []

    // 1. PRIMARY CARD: PRICING CALCULATOR (Always present)
    list.push({
      id: 'pricing-calculator',
      type: 'calc',
      title: 'Pricing Calculator',
      subtitle: `${config.linearFeet} LF Standard`,
    })

    // 2. DYNAMIC CARDS SPAWNED BY CURRENTLY ACTIVE CHAPTER
    if (activeChapter === 'stain' || !activeChapter) {
      list.push(
        {
          id: 'stain-cedar-natural',
          type: 'swatch',
          title: 'Cedar Natural',
          subtitle: 'Pro Wood Stain',
          cost: '+$4.75/LF',
          description: 'Warm golden honey stain, 3-yr UV & water seal.',
          colorPreview: 'linear-gradient(135deg, #C68A4C, #A46932)',
          selected: config.stainType === 'cedar-natural',
          onSelect: () => onChange({ stainType: 'cedar-natural' }),
        },
        {
          id: 'stain-chestnut-brown',
          type: 'swatch',
          title: 'Chestnut Brown',
          subtitle: 'Pro Wood Stain',
          cost: '+$4.75/LF',
          description: 'Deep rich chestnut tone with moisture shield.',
          colorPreview: 'linear-gradient(135deg, #633E26, #422613)',
          selected: config.stainType === 'chestnut-brown',
          onSelect: () => onChange({ stainType: 'chestnut-brown' }),
        },
        {
          id: 'stain-redwood',
          type: 'swatch',
          title: 'Redwood Tone',
          subtitle: 'Pro Wood Stain',
          cost: '+$4.75/LF',
          description: 'Classic vibrant Pacific redwood tone.',
          colorPreview: 'linear-gradient(135deg, #8B3A2B, #622216)',
          selected: config.stainType === 'redwood',
          onSelect: () => onChange({ stainType: 'redwood' }),
        },
        {
          id: 'stain-dark-walnut',
          type: 'swatch',
          title: 'Dark Walnut',
          subtitle: 'Pro Wood Stain',
          cost: '+$4.75/LF',
          description: 'Architectural charcoal-walnut modern finish.',
          colorPreview: 'linear-gradient(135deg, #2E2219, #18120C)',
          selected: config.stainType === 'dark-walnut',
          onSelect: () => onChange({ stainType: 'dark-walnut' }),
        },
        {
          id: 'stain-clear-seal',
          type: 'swatch',
          title: 'Clear Sealant',
          subtitle: 'Pro Seal',
          cost: '+$4.75/LF',
          description: 'Preserves raw natural wood grain with sealant.',
          colorPreview: 'linear-gradient(135deg, #E3CEAA, #C7AE83)',
          selected: config.stainType === 'clear-seal',
          onSelect: () => onChange({ stainType: 'clear-seal' }),
        },
        {
          id: 'stain-none',
          type: 'swatch',
          title: 'Raw / Unfinished',
          subtitle: 'Natural Cedar',
          cost: '$0.00',
          description: 'Unfinished natural cedar for weathered silver look.',
          colorPreview: 'linear-gradient(135deg, #DEC396, #BFA06C)',
          selected: config.stainType === 'none',
          onSelect: () => onChange({ stainType: 'none' }),
        },
      )
    } else if (activeChapter === 'posts') {
      list.push(
        {
          id: 'post-4x4-cedar',
          type: 'swatch',
          title: '4x4 Incense Cedar',
          subtitle: 'Timber Post',
          cost: 'Included',
          description: 'Natural rot-resistant 4x4 western red cedar core.',
          colorPreview: 'linear-gradient(135deg, #A87D48, #825A27)',
          selected: config.postType === '4x4-cedar',
          onSelect: () => onChange({ postType: '4x4-cedar' }),
        },
        {
          id: 'post-4x6-cedar',
          type: 'swatch',
          title: '4x6 Heavy Timber',
          subtitle: 'High Wind Core',
          cost: '+$2.20/LF',
          description: '50% higher lateral load resistance for wind zones.',
          colorPreview: 'linear-gradient(135deg, #916839, #6D481C)',
          selected: config.postType === '4x6-cedar',
          onSelect: () => onChange({ postType: '4x6-cedar' }),
        },
        {
          id: 'post-steel',
          type: 'swatch',
          title: 'PostMaster Steel',
          subtitle: 'Concealed In-Line',
          cost: '+$4.20/LF',
          description: 'Heavy-gauge galvanized in-line steel fence posts.',
          colorPreview: 'linear-gradient(135deg, #6B7280, #374151)',
          selected: config.postType === 'postmaster-steel',
          onSelect: () => onChange({ postType: 'postmaster-steel' }),
        },
        {
          id: 'cap-pyramid-cedar',
          type: 'swatch',
          title: 'Cedar Pyramid Cap',
          subtitle: 'Post Topper',
          cost: '+$1.10/LF',
          description: 'Mitered 4-way water shed cap for post longevity.',
          colorPreview: 'linear-gradient(135deg, #B58852, #8F622C)',
          selected: config.postCap === 'cedar-pyramid',
          onSelect: () => onChange({ postCap: 'cedar-pyramid' }),
        },
        {
          id: 'cap-copper',
          type: 'swatch',
          title: 'Copper Pyramid Cap',
          subtitle: 'Architectural Cap',
          cost: '+$1.80/LF',
          description: 'Solid copper cap that develops natural patina.',
          colorPreview: 'linear-gradient(135deg, #B87333, #8C4E19)',
          selected: config.postCap === 'copper-pyramid',
          onSelect: () => onChange({ postCap: 'copper-pyramid' }),
        },
        {
          id: 'cap-solar-led',
          type: 'swatch',
          title: 'Solar LED Cap',
          subtitle: 'Ambient Lighting',
          cost: '+$3.20/LF',
          description: 'Built-in dusk-to-dawn perimeter lighting topper.',
          colorPreview: 'linear-gradient(135deg, #F59E0B, #1F2937)',
          selected: config.postCap === 'solar-led',
          onSelect: () => onChange({ postCap: 'solar-led' }),
        },
      )
    } else if (activeChapter === 'pickets') {
      list.push(
        {
          id: 'picket-bob',
          type: 'swatch',
          title: 'Board-on-Board',
          subtitle: '100% Total Privacy',
          cost: '+$12.00/LF',
          description: '16 pickets/bay with 1.5″ overlap for zero sightlines.',
          colorPreview: 'linear-gradient(135deg, #9C713D, #6B4920)',
          selected: config.fillPattern === 'board-on-board',
          onSelect: () => onChange({ fillPattern: 'board-on-board' }),
        },
        {
          id: 'picket-flat-top',
          type: 'swatch',
          title: 'Flat Top 1/2″ Gap',
          subtitle: 'Standard Airflow',
          cost: '+$8.50/LF',
          description: '14 pickets/bay with clean breeze ventilation spacing.',
          colorPreview: 'linear-gradient(135deg, #B3864E, #7D5523)',
          selected: config.fillPattern === 'flat-top-privacy',
          onSelect: () => onChange({ fillPattern: 'flat-top-privacy' }),
        },
        {
          id: 'picket-shadowbox',
          type: 'swatch',
          title: 'Shadowbox Alternating',
          subtitle: 'Good Neighbor',
          cost: '+$11.50/LF',
          description: 'Alternating pickets on front and back for airflow.',
          colorPreview: 'linear-gradient(135deg, #875F2F, #573A15)',
          selected: config.fillPattern === 'shadowbox',
          onSelect: () => onChange({ fillPattern: 'shadowbox' }),
        },
        {
          id: 'lumber-tight-knot',
          type: 'swatch',
          title: 'Tight-Knot Cedar',
          subtitle: 'Lumber Grade',
          cost: '+$2.50/LF',
          description: 'Authentic PNW character grain with tight sound knots.',
          colorPreview: 'linear-gradient(135deg, #C2965D, #8C6531)',
          selected: config.woodGrade === 'tight-knot',
          onSelect: () => onChange({ woodGrade: 'tight-knot' }),
        },
        {
          id: 'lumber-clear-cedar',
          type: 'swatch',
          title: 'Clear Architectural',
          subtitle: 'Knot-Free Select',
          cost: '+$7.50/LF',
          description: 'Select knot-free vertical grain cedar pickets.',
          colorPreview: 'linear-gradient(135deg, #E0B47A, #A67D45)',
          selected: config.woodGrade === 'clear-cedar',
          onSelect: () => onChange({ woodGrade: 'clear-cedar' }),
        },
      )
    } else if (activeChapter === 'rails') {
      list.push(
        {
          id: 'rail-3',
          type: 'swatch',
          title: '3-Rail Structural',
          subtitle: 'Heavy Duty',
          cost: '$5.80/LF',
          description: '3 horizontal 2x4 rails backing full picket length.',
          colorPreview: 'linear-gradient(135deg, #A87D48, #6B4920)',
          selected: config.railCount === 3,
          onSelect: () => onChange({ railCount: 3 }),
        },
        {
          id: 'rail-2',
          type: 'swatch',
          title: '2-Rail Minimalist',
          subtitle: 'Low Profile',
          cost: '$4.00/LF',
          description: '2 horizontal 2x4 rails for 4ft low-profile perimeters.',
          colorPreview: 'linear-gradient(135deg, #B58852, #8F622C)',
          selected: config.railCount === 2,
          onSelect: () => onChange({ railCount: 2 }),
        },
        {
          id: 'rail-top-cap',
          type: 'swatch',
          title: '2x6 Continuous Cap',
          subtitle: 'Weather Shield',
          cost: '+$2.25/LF',
          description: 'Protective top cap board preventing end-grain rot.',
          colorPreview: 'linear-gradient(135deg, #7D5523, #4E3211)',
          selected: config.topCap,
          onSelect: () => onChange({ topCap: !config.topCap }),
        },
      )
    } else if (activeChapter === 'hardware') {
      list.push(
        {
          id: 'hw-black-powder',
          type: 'swatch',
          title: 'Black Powder Coat',
          subtitle: 'Architectural Fasteners',
          cost: '+$2.40/LF',
          description: 'Black ceramic-coated structural screws and Simpson ties.',
          colorPreview: 'linear-gradient(135deg, #2D3748, #1A202C)',
          selected: config.hardwareTier === 'black-powder',
          onSelect: () => onChange({ hardwareTier: 'black-powder' }),
        },
        {
          id: 'hw-galvanized',
          type: 'swatch',
          title: 'Hot-Dip Galvanized',
          subtitle: 'Standard Zinc',
          cost: '$1.40/LF',
          description: 'Corrosion resistant hot-dip galvanized fasteners.',
          colorPreview: 'linear-gradient(135deg, #9CA3AF, #6B7280)',
          selected: config.hardwareTier === 'galvanized',
          onSelect: () => onChange({ hardwareTier: 'galvanized' }),
        },
        {
          id: 'hw-stainless',
          type: 'swatch',
          title: '316 Marine Stainless',
          subtitle: 'Coastal Grade',
          cost: '+$3.10/LF',
          description: 'Maximum salt-air and moisture endurance warranty.',
          colorPreview: 'linear-gradient(135deg, #E5E7EB, #9CA3AF)',
          selected: config.hardwareTier === 'stainless-steel',
          onSelect: () => onChange({ hardwareTier: 'stainless-steel' }),
        },
      )
    } else if (activeChapter === 'gates') {
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
                ...config.gates,
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
                ...config.gates,
                walkGates: config.gates?.walkGates || 0,
                driveGates: (config.gates?.driveGates || 0) > 0 ? 0 : 1,
              },
            }),
        },
      )
    } else if (activeChapter === 'height') {
      list.push(
        {
          id: 'h-6ft',
          type: 'swatch',
          title: '6ft Finished Height',
          subtitle: 'Residential Standard',
          cost: '$18.00/LF',
          description: 'Standard privacy height for suburban residential lots.',
          colorPreview: 'linear-gradient(135deg, #4ADE80, #166534)',
          selected: config.heightFt === 6,
          onSelect: () => onChange({ heightFt: 6 }),
        },
        {
          id: 'h-8ft',
          type: 'swatch',
          title: '8ft Max Privacy',
          subtitle: 'Boundary Screen',
          cost: '$26.00/LF',
          description: 'Maximum height privacy fence for perimeter boundary.',
          colorPreview: 'linear-gradient(135deg, #22C55E, #14532D)',
          selected: config.heightFt === 8,
          onSelect: () => onChange({ heightFt: 8 }),
        },
        {
          id: 'h-4ft',
          type: 'swatch',
          title: '4ft Low-Profile',
          subtitle: 'Front Yard Code',
          cost: '$14.00/LF',
          description: 'HOA & city ARC compliant front perimeter height.',
          colorPreview: 'linear-gradient(135deg, #86EFAC, #15803D)',
          selected: config.heightFt === 4,
          onSelect: () => onChange({ heightFt: 4 }),
        },
        {
          id: 'bay-8ft',
          type: 'swatch',
          title: '8ft Post Spacing',
          subtitle: 'Standard 112″ Bay',
          cost: 'Included',
          description: 'Standard 8ft on-center post spacing module.',
          colorPreview: 'linear-gradient(135deg, #A87D48, #6B4920)',
          selected: config.postSpacingFt === 8,
          onSelect: () => onChange({ postSpacingFt: 8 }),
        },
      )
    } else if (activeChapter === 'trim') {
      list.push(
        {
          id: 'trim-none',
          type: 'swatch',
          title: 'Clean Line (No Trim)',
          subtitle: 'Modern Minimalist',
          cost: '$0.00',
          description: 'Exposed picket ends for clean contemporary profile.',
          colorPreview: 'linear-gradient(135deg, #71717A, #3F3F46)',
          selected: config.trimStyle === 'none',
          onSelect: () => onChange({ trimStyle: 'none' }),
        },
        {
          id: 'trim-facia',
          type: 'swatch',
          title: '1x4 Facia Trim',
          subtitle: 'Top & Bottom Border',
          cost: '+$1.80/LF',
          description: 'Finished dimensional 1x4 horizontal fascia trim band.',
          colorPreview: 'linear-gradient(135deg, #A87D48, #6B4920)',
          selected: config.trimStyle === 'standard-1x4',
          onSelect: () => onChange({ trimStyle: 'standard-1x4' }),
        },
        {
          id: 'trim-kickboard',
          type: 'swatch',
          title: '2x6 Rot Kickboard',
          subtitle: 'Ground Protection',
          cost: '+$2.80/LF',
          description: 'Sacrificial ground-contact board protecting pickets.',
          colorPreview: 'linear-gradient(135deg, #78350F, #451A03)',
          selected: config.trimStyle === 'kickboard-2x6',
          onSelect: () => onChange({ trimStyle: 'kickboard-2x6' }),
        },
      )
    }

    // 3. JOB SPECS SUMMARY CARD
    list.push({
      id: 'job-specs',
      type: 'specs',
      title: 'Job Specs',
    })

    // 4. FOLIO & 3-BID DISPATCH CARD
    list.push({
      id: 'folio-dispatch',
      type: 'action',
      title: 'Folio & 3-Bid',
    })

    // 5. TAKEOFF LEDGER CARD
    list.push({
      id: 'takeoff-ledger',
      type: 'takeoff',
      title: 'Takeoff Ledger',
    })

    return list
  }, [config, activeChapter, onChange])

  // Hook for infinite horizontal scroll in the bottom carousel
  const { containerRef, tripled, handleScroll } = useInfiniteLoop(cards, 'x')

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -248 : 248
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const cardShell = (selected?: boolean): React.CSSProperties => ({
    background: selected
      ? 'linear-gradient(180deg, #1B4332 0%, #142920 100%)'
      : 'linear-gradient(180deg, #4A3A22 0%, #2E2418 55%, #241C12 100%)',
    border: `2px solid ${selected ? '#E5B842' : '#C4A574'}`,
    boxShadow: selected
      ? '3px 3px 0 #1A1A1A, 0 0 14px rgba(229,184,66,0.28), inset 0 1px 0 rgba(250,246,238,0.12)'
      : '3px 3px 0 #1A1A1A, inset 0 1px 0 rgba(250,246,238,0.12)',
  })

  const titleBarStyle: React.CSSProperties = {
    background: 'linear-gradient(180deg, #1B4332 0%, #142920 100%)',
    borderBottom: '2px solid #1A1A1A',
    boxShadow: 'inset 0 -1px 0 rgba(74,222,128,0.35)',
  }

  return (
    <footer
      className={cn(
        "w-full flex-shrink-0 z-20 font-['Rowdies'] select-none flex items-end gap-2",
        overlay
          ? 'absolute left-0 right-0 bottom-[28%] pt-0 pb-0 px-2 overflow-visible min-w-0 border-0 bg-transparent'
          : 'relative py-2 px-3 border-t-[2px] border-t-[#16432D]/40 shadow-[0_-6px_20px_rgba(22,67,45,0.15)] overflow-hidden min-w-0',
      )}
      style={
        overlay
          ? { backgroundColor: 'transparent', backgroundImage: 'none' }
          : {
              backgroundColor: '#F4ECDC',
              backgroundImage:
                'linear-gradient(rgba(46, 139, 78, 0.40) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 139, 78, 0.40) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)',
              backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
              backgroundPosition: '0 0',
            }
      }
    >
      {/* Left Chevron Button */}
      <button
        onClick={() => scrollCarousel('left')}
        className="hidden sm:flex w-7 h-[118px] bg-[#141B16] hover:bg-[#1C241E] text-white/70 hover:text-[#E5B842] border-2 border-[#C4A574] rounded-xl items-center justify-center text-[10px] transition flex-shrink-0 shadow-[3px_3px_0_#1A1A1A] cursor-pointer"
        title="Scroll Left (Infinite)"
      >
        ◀
      </button>

      {/* Endless Horizontal Card Carousel Track with Infinite Loop Wrapping */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 min-w-0 flex items-end gap-2.5 overflow-x-auto overflow-y-visible no-scrollbar scroll-smooth py-1 px-0.5 relative max-h-[140px]"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 16px, black calc(100% - 24px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 16px, black calc(100% - 24px), transparent)',
        }}
      >
        {tripled.map((card, idx) => {
          // A. PRICING CALCULATOR CARD
          if (card.type === 'calc') {
            return (
              <div
                key={`${card.id}-${idx}`}
                className="min-w-[248px] sm:min-w-[268px] h-[118px] rounded-xl flex flex-col flex-shrink-0 relative overflow-hidden"
                style={cardShell()}
              >
                <div
                  className="flex items-center justify-between px-2.5 py-1.5 flex-shrink-0"
                  style={titleBarStyle}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                    <span className="font-bold text-[#E5B842] uppercase tracking-wide text-[10px]">
                      Pricing Calculator
                    </span>
                  </div>

                  <div className="flex bg-black/40 p-0.5 rounded border border-[#C4A574]/40 text-[7px]">
                    <button
                      onClick={() => setActiveMathModel('canonical')}
                      className={`px-1.5 py-0.5 rounded transition ${
                        activeMathModel === 'canonical'
                          ? 'bg-[#E5B842] text-[#141B16] font-bold'
                          : 'text-[#FAF6EE]/70'
                      }`}
                    >
                      Canon
                    </button>
                    <button
                      onClick={() => setActiveMathModel('trial')}
                      className={`px-1.5 py-0.5 rounded transition ${
                        activeMathModel === 'trial'
                          ? 'bg-[#F27A22] text-white font-bold'
                          : 'text-[#FAF6EE]/70'
                      }`}
                    >
                      Trial
                    </button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between px-2.5 py-1.5 min-h-0">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[8px] text-[#DBD0BD] font-light">Linear Footage:</span>
                      <span className="text-[10px] font-bold text-[#FAF6EE] bg-black/35 px-1.5 py-0.5 rounded border border-[#C4A574]/40">
                        {config.linearFeet} LF
                      </span>
                    </div>

                    <input
                      type="range"
                      min="8"
                      max="300"
                      step="1"
                      value={config.linearFeet}
                      onChange={(e) => onChange({ linearFeet: Number(e.target.value) })}
                      className="w-full h-1 bg-black/40 rounded-lg appearance-none cursor-pointer accent-[#F27A22]"
                    />

                    <div className="flex items-center gap-1">
                      {[8, 48, 96, 120, 200].map((preset) => (
                        <button
                          key={preset}
                          onClick={() => onChange({ linearFeet: preset })}
                          className={`px-1.5 py-0.5 text-[7px] rounded border transition ${
                            config.linearFeet === preset
                              ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                              : 'bg-black/35 hover:bg-[#F27A22] hover:text-white text-[#FAF6EE]/80 border-[#C4A574]/40'
                          }`}
                        >
                          {preset === 8 ? '8 LF' : `${preset} LF`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 border-t border-[#C4A574]/25 flex items-center justify-between">
                    <div>
                      <span className="text-[7px] text-[#DBD0BD] uppercase font-light block leading-none">
                        Quote (±15%)
                      </span>
                      <span className="text-[11px] font-bold text-[#4ADE80]">
                        ${activePricing.totalMin.toLocaleString()} — $
                        {activePricing.totalMax.toLocaleString()}
                      </span>
                    </div>

                    <span className="text-[7px] text-[#FAF6EE]/60 font-mono">
                      ${activePricing.pricePerLfMin.toFixed(2)}/LF
                    </span>
                  </div>
                </div>
              </div>
            )
          }

          // B. DYNAMIC SWATCH & INSPECTION CARDS
          if (card.type === 'swatch') {
            return (
              <button
                key={`${card.id}-${idx}`}
                onClick={card.onSelect}
                className={`min-w-[176px] sm:min-w-[192px] h-[118px] rounded-xl flex flex-col flex-shrink-0 text-left transition-all duration-200 cursor-pointer overflow-hidden ${
                  card.selected ? '-translate-y-1' : 'hover:-translate-y-0.5'
                }`}
                style={cardShell(card.selected)}
              >
                <div
                  className="flex items-center justify-between px-2.5 py-1.5 w-full flex-shrink-0"
                  style={titleBarStyle}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    {card.colorPreview && (
                      <span
                        className="w-3 h-3 rounded-full border border-white/30 shadow-sm shrink-0"
                        style={{ background: card.colorPreview }}
                      />
                    )}
                    <span className="font-bold uppercase tracking-wide text-[10px] truncate text-[#E5B842]">
                      {card.title}
                    </span>
                  </div>

                  <span
                    className={`text-[8px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                      card.selected
                        ? 'bg-[#E5B842] text-[#141B16]'
                        : 'bg-black/50 text-[#4ADE80] border border-[#4ADE80]/40'
                    }`}
                  >
                    {card.cost}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-between px-2.5 py-1.5 min-h-0">
                  <div className="text-[8px] text-[#DBD0BD] line-clamp-3 leading-snug font-light">
                    {card.description}
                  </div>

                  <div className="pt-1 border-t border-[#C4A574]/25 flex items-center justify-between text-[7px]">
                    <span className="text-[#FAF6EE]/55">{card.subtitle}</span>
                    <span
                      className={`font-bold flex items-center gap-0.5 ${
                        card.selected ? 'text-[#E5B842]' : 'text-[#4ADE80]'
                      }`}
                    >
                      {card.selected ? 'Active ✓' : 'Select ▶'}
                    </span>
                  </div>
                </div>
              </button>
            )
          }

          // C. JOB SPECS CARD
          if (card.type === 'specs') {
            return (
              <div
                key={`${card.id}-${idx}`}
                className="min-w-[192px] sm:min-w-[208px] h-[118px] rounded-xl flex flex-col flex-shrink-0 relative overflow-hidden"
                style={cardShell()}
              >
                <div
                  className="flex items-center justify-between px-2.5 py-1.5 flex-shrink-0"
                  style={titleBarStyle}
                >
                  <span className="font-bold text-[#E5B842] uppercase tracking-wide text-[10px]">
                    Job Specs
                  </span>
                  <span className="text-[7px] text-[#4ADE80] font-mono">PASSED ARC-01</span>
                </div>

                <div className="flex-1 flex flex-col justify-between px-2.5 py-1.5 min-h-0">
                  <div className="grid grid-cols-2 gap-1 text-[8px] text-[#FAF6EE]/85">
                    <div className="p-1 px-1.5 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[#FAF6EE]/40 block text-[6px]">HEIGHT / BAY</span>
                      <span className="font-bold text-[#E5B842] truncate block">
                        {config.heightFt}&apos; · {config.postSpacingFt}&apos; Bay
                      </span>
                    </div>
                    <div className="p-1 px-1.5 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[#FAF6EE]/40 block text-[6px]">POST TIMBER</span>
                      <span className="font-bold text-[#FAF6EE] truncate block">
                        {config.postType.split('-')[0].toUpperCase()}
                      </span>
                    </div>
                    <div className="p-1 px-1.5 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[#FAF6EE]/40 block text-[6px]">RAILS &amp; CAP</span>
                      <span className="font-bold text-[#FAF6EE] truncate block">
                        {config.railCount}-Rail {config.topCap ? '+ Cap' : ''}
                      </span>
                    </div>
                    <div className="p-1 px-1.5 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[#FAF6EE]/40 block text-[6px]">INFILL</span>
                      <span className="font-bold text-[#4ADE80] truncate block">
                        {config.fillPattern === 'board-on-board' ? 'BoB' : 'Std'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-[#C4A574]/25 flex items-center justify-between text-[7px] text-[#FAF6EE]/60">
                    <span>
                      Stain: <strong className="text-[#FAF6EE]">{config.stainType.split('-')[0]}</strong>
                    </span>
                    <span>
                      Gates:{' '}
                      <strong className="text-[#E5B842]">{config.gates?.walkGates || 0}W</strong>
                    </span>
                  </div>
                </div>
              </div>
            )
          }

          // D. FOLIO & 3-BID DISPATCH CARD
          if (card.type === 'action') {
            return (
              <div
                key={`${card.id}-${idx}`}
                className="min-w-[192px] sm:min-w-[208px] h-[118px] rounded-xl flex flex-col flex-shrink-0 relative overflow-hidden"
                style={cardShell()}
              >
                <div
                  className="flex items-center justify-between px-2.5 py-1.5 flex-shrink-0"
                  style={titleBarStyle}
                >
                  <span className="font-bold text-[#4ADE80] uppercase tracking-wide text-[10px]">
                    Folio &amp; 3-Bid
                  </span>
                  <span className="text-[7px] text-[#E5B842] font-mono">READY</span>
                </div>

                <div className="flex-1 flex flex-col justify-between px-2.5 py-1.5 min-h-0">
                  <div className="text-[8px] text-[#DBD0BD] space-y-1 font-light">
                    <p className="line-clamp-2">Lock 2D blueprint &amp; get 3 matched bids.</p>
                    <div className="flex items-center gap-1.5 text-[7px] text-[#FAF6EE]/50">
                      <span>🛡️ 72-Hr Refund</span>
                      <span>📋 ARC Ready</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-[#C4A574]/25 flex items-center gap-1.5">
                    <button
                      onClick={onResetDefaults}
                      className="px-1.5 py-1 bg-black/40 hover:bg-white/10 text-[#FAF6EE]/70 hover:text-white text-[9px] rounded-lg border border-[#C4A574]/40 transition"
                      title="Reset 8 LF"
                    >
                      ↺
                    </button>
                    <button
                      onClick={onSaveToFolio}
                      className="flex-1 rounded-lg bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] font-bold text-[10px] py-1.5 border-2 border-[#1A1A1A] transition text-center shadow"
                    >
                      Save to Folio →
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          // E. TAKEOFF LEDGER CARD
          if (card.type === 'takeoff') {
            return (
              <div
                key={`${card.id}-${idx}`}
                className="min-w-[192px] sm:min-w-[208px] h-[118px] rounded-xl flex flex-col flex-shrink-0 relative overflow-hidden"
                style={cardShell()}
              >
                <div
                  className="flex items-center justify-between px-2.5 py-1.5 flex-shrink-0"
                  style={titleBarStyle}
                >
                  <span className="font-bold text-[#E5B842] uppercase tracking-wide text-[10px]">
                    Takeoff Ledger
                  </span>
                  <button
                    onClick={onOpenLedgerModal}
                    className="text-[7px] text-[#F27A22] hover:underline font-bold"
                  >
                    Full BOM ↗
                  </button>
                </div>

                <div className="flex-1 flex flex-col justify-between px-2.5 py-1.5 min-h-0">
                  <div className="grid grid-cols-3 gap-1 text-center text-[8px]">
                    <div className="p-1 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[6px] text-[#FAF6EE]/40 block">MATERIALS</span>
                      <span className="font-bold text-[#FAF6EE]">${activePricing.materialsCostMin}</span>
                    </div>
                    <div className="p-1 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[6px] text-[#FAF6EE]/40 block">LABOR</span>
                      <span className="font-bold text-[#E5B842]">${activePricing.laborCostMin}</span>
                    </div>
                    <div className="p-1 bg-black/35 rounded border border-[#C4A574]/25">
                      <span className="text-[6px] text-[#FAF6EE]/40 block">ADMIN</span>
                      <span className="font-bold text-[#4ADE80]">
                        ${activePricing.adminPermitCost}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-[#C4A574]/25 flex items-center justify-between text-[7px] text-[#FAF6EE]/50">
                    <span>
                      {Math.ceil(config.linearFeet / 8) + 1} Posts · {config.linearFeet * 2} Pickets
                    </span>
                    <span className="text-[#4ADE80]">Synced</span>
                  </div>
                </div>
              </div>
            )
          }

          return null
        })}
      </div>

      {/* Right Chevron Button */}
      <button
        onClick={() => scrollCarousel('right')}
        className="hidden sm:flex w-7 h-[118px] bg-[#141B16] hover:bg-[#1C241E] text-white/70 hover:text-[#E5B842] border-2 border-[#C4A574] rounded-xl items-center justify-center text-[10px] transition flex-shrink-0 shadow-[3px_3px_0_#1A1A1A] cursor-pointer"
        title="Scroll Right (Infinite)"
      >
        ▶
      </button>
    </footer>
  )
}
