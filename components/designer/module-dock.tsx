'use client'

import React, { useMemo, useState } from 'react'
import { FenceConfiguration, PricingBreakdown } from '@/lib/pricing-engine'
import { useInfiniteLoop } from '@/hooks/use-infinite-loop'
import { cn } from '@/lib/utils'

type ModuleId = 'calculator' | 'templates' | 'ai'

interface DesignerTemplate {
  id: string
  label: string
  blurb: string
  patch: Partial<FenceConfiguration>
}

interface ModuleDockProps {
  config: FenceConfiguration
  pricing: PricingBreakdown
  trialPricing?: PricingBreakdown
  onChange: (updated: Partial<FenceConfiguration>) => void
  onResetDefaults: () => void
  onSaveToFolio: () => void
}

const MODULES: { id: ModuleId; title: string; tone: 'brown' | 'tan' }[] = [
  { id: 'calculator', title: 'Price Calculator', tone: 'brown' },
  { id: 'templates', title: 'Template Starts', tone: 'tan' },
  { id: 'ai', title: 'AI Assist', tone: 'brown' },
]

const TEMPLATES: DesignerTemplate[] = [
  {
    id: 'heritage-privacy',
    label: 'Heritage Privacy 6′',
    blurb: 'Board-on-board · 3-rail · cedar natural',
    patch: {
      heightFt: 6,
      railCount: 3,
      topCap: true,
      fillPattern: 'board-on-board',
      fenceStyleCategory: 'vertical-picket',
      stainType: 'cedar-natural',
      picketSpacing: '1-16-privacy',
    },
  },
  {
    id: 'neighbor-friendly',
    label: 'Neighbor-Friendly Gap',
    blurb: '1″ gap fill · clear seal',
    patch: {
      heightFt: 6,
      railCount: 3,
      topCap: true,
      fillPattern: 'flat-top-privacy',
      fenceStyleCategory: 'vertical-picket',
      stainType: 'clear-seal',
      picketSpacing: 'gap-1',
    },
  },
  {
    id: 'dark-walnut',
    label: 'Dark Walnut Statement',
    blurb: 'Privacy BoB · dark walnut stain',
    patch: {
      heightFt: 6,
      railCount: 3,
      topCap: true,
      fillPattern: 'board-on-board',
      stainType: 'dark-walnut',
      picketSpacing: '1-16-privacy',
    },
  },
  {
    id: 'open-rail',
    label: 'Open 2-Rail Look',
    blurb: '2-rail · no top cap · natural cedar',
    patch: {
      heightFt: 5,
      railCount: 2,
      topCap: false,
      fillPattern: 'flat-top-privacy',
      stainType: 'cedar-natural',
      picketSpacing: 'gap-3',
    },
  },
]

const SHELL = {
  brown: {
    bg: 'linear-gradient(180deg, #5C4030 0%, #3D2414 100%)',
    fg: '#FFFFFF',
    muted: 'rgba(255,255,255,0.72)',
    chip: 'rgba(0,0,0,0.35)',
    accent: '#D9B872',
  },
  tan: {
    bg: 'linear-gradient(180deg, #E8D4BC 0%, #DCC4A4 100%)',
    fg: '#1A1A1A',
    muted: 'rgba(26,26,26,0.68)',
    chip: 'rgba(255,255,255,0.45)',
    accent: '#3D2414',
  },
} as const

export function ModuleDock({
  config,
  pricing,
  trialPricing,
  onChange,
  onResetDefaults,
  onSaveToFolio,
}: ModuleDockProps) {
  const [mathModel, setMathModel] = useState<'canonical' | 'trial'>('canonical')
  const [aiPrompt, setAiPrompt] = useState('')

  const activePricing = mathModel === 'trial' && trialPricing ? trialPricing : pricing
  const { containerRef, tripled, handleScroll } = useInfiniteLoop(MODULES, 'x')

  const activeTemplateId = useMemo(() => {
    for (const t of TEMPLATES) {
      const keys = Object.keys(t.patch) as (keyof FenceConfiguration)[]
      const match = keys.every((k) => {
        const want = t.patch[k]
        const have = config[k]
        return want === have
      })
      if (match) return t.id
    }
    return null
  }, [config])

  const scrollModule = (direction: 'left' | 'right') => {
    const el = containerRef.current
    if (!el) return
    el.scrollBy({ left: direction === 'left' ? -el.clientWidth : el.clientWidth, behavior: 'smooth' })
  }

  return (
    <footer
      className="w-full flex-shrink-0 z-20 font-['Rowdies'] select-none flex items-stretch gap-1 px-1 py-1 min-w-0 overflow-hidden border-t-2 border-t-[#1A1A1A]"
      style={{
        backgroundColor: '#F4ECDC',
        backgroundImage:
          'linear-gradient(rgba(46, 139, 78, 0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 139, 78, 0.45) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0',
      }}
    >
      <button
        type="button"
        onClick={() => scrollModule('left')}
        className="hidden sm:flex w-7 shrink-0 self-stretch bg-[#3D2414] hover:bg-[#5C4030] text-white/80 hover:text-white border-2 border-[#8B7355] rounded-xl items-center justify-center text-[11px] shadow-[2px_2px_0_#1A1A1A] cursor-pointer"
        title="Previous module"
      >
        ◀
      </button>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 min-w-0 flex overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth snap-x snap-mandatory"
      >
        {tripled.map((mod, idx) => {
          const shell = SHELL[mod.tone]
          return (
            <section
              key={`${mod.id}-${idx}`}
              className="w-full min-w-full shrink-0 snap-center px-0.5"
              aria-label={mod.title}
            >
              <div
                className="h-[132px] rounded-xl border-2 border-[#1A1A1A] overflow-hidden flex flex-col shadow-[2px_2px_0_#1A1A1A]"
                style={{ background: shell.bg }}
              >
                <div
                  className="flex items-center justify-between px-3 py-1.5 border-b-2 border-[#1A1A1A] flex-shrink-0"
                  style={{ color: shell.fg }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold uppercase tracking-wide text-[12px] truncate">
                      {mod.title}
                    </span>
                    <span
                      className="hidden sm:inline text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-black/20"
                      style={{ background: shell.chip, color: shell.fg }}
                    >
                      {mod.id === 'calculator' ? '01' : mod.id === 'templates' ? '02' : '03'} / 03
                    </span>
                  </div>
                  <span className="text-[9px] font-light truncate" style={{ color: shell.muted }}>
                    Swipe for next module
                  </span>
                </div>

                <div className="flex-1 min-h-0 px-3 py-2">
                  {mod.id === 'calculator' && (
                    <CalculatorBody
                      config={config}
                      activePricing={activePricing}
                      mathModel={mathModel}
                      onMathModel={setMathModel}
                      onChange={onChange}
                      onResetDefaults={onResetDefaults}
                      onSaveToFolio={onSaveToFolio}
                      shell={shell}
                    />
                  )}
                  {mod.id === 'templates' && (
                    <TemplatesBody
                      templates={TEMPLATES}
                      activeId={activeTemplateId}
                      onApply={(patch) => onChange(patch)}
                      shell={shell}
                    />
                  )}
                  {mod.id === 'ai' && (
                    <AiBody
                      prompt={aiPrompt}
                      onPrompt={setAiPrompt}
                      shell={shell}
                    />
                  )}
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => scrollModule('right')}
        className="hidden sm:flex w-7 shrink-0 self-stretch bg-[#3D2414] hover:bg-[#5C4030] text-white/80 hover:text-white border-2 border-[#8B7355] rounded-xl items-center justify-center text-[11px] shadow-[2px_2px_0_#1A1A1A] cursor-pointer"
        title="Next module"
      >
        ▶
      </button>
    </footer>
  )
}

function CalculatorBody({
  config,
  activePricing,
  mathModel,
  onMathModel,
  onChange,
  onResetDefaults,
  onSaveToFolio,
  shell,
}: {
  config: FenceConfiguration
  activePricing: PricingBreakdown
  mathModel: 'canonical' | 'trial'
  onMathModel: (m: 'canonical' | 'trial') => void
  onChange: (updated: Partial<FenceConfiguration>) => void
  onResetDefaults: () => void
  onSaveToFolio: () => void
  shell: (typeof SHELL)['brown']
}) {
  return (
    <div className="h-full flex flex-col justify-between gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[9px] font-light uppercase" style={{ color: shell.muted }}>
            Quote (±15%) · {config.linearFeet} LF
          </div>
          <div className="font-bold text-[18px] leading-tight" style={{ color: shell.fg }}>
            ${activePricing.totalMin.toLocaleString()} — ${activePricing.totalMax.toLocaleString()}
          </div>
        </div>
        <div
          className="flex p-0.5 rounded-lg border border-black/25 text-[8px] shrink-0"
          style={{ background: shell.chip }}
        >
          <button
            type="button"
            onClick={() => onMathModel('canonical')}
            className={cn(
              'px-2 py-0.5 rounded-md transition',
              mathModel === 'canonical' ? 'bg-[#D9B872] text-[#1A1A1A] font-bold' : '',
            )}
            style={mathModel === 'canonical' ? undefined : { color: shell.muted }}
          >
            Canon
          </button>
          <button
            type="button"
            onClick={() => onMathModel('trial')}
            className={cn(
              'px-2 py-0.5 rounded-md transition',
              mathModel === 'trial' ? 'bg-[#D9B872] text-[#1A1A1A] font-bold' : '',
            )}
            style={mathModel === 'trial' ? undefined : { color: shell.muted }}
          >
            Trial
          </button>
        </div>
      </div>

      <input
        type="range"
        min={8}
        max={300}
        step={1}
        value={config.linearFeet}
        onChange={(e) => onChange({ linearFeet: Number(e.target.value) })}
        className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-[#D9B872] bg-black/30"
      />

      <div className="flex items-center gap-1.5 flex-wrap">
        {[8, 48, 96, 120, 200].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange({ linearFeet: preset })}
            className={cn(
              'px-2 py-0.5 text-[9px] rounded-md border transition',
              config.linearFeet === preset
                ? 'bg-[#D9B872] text-[#1A1A1A] font-bold border-[#1A1A1A]'
                : 'border-black/25',
            )}
            style={
              config.linearFeet === preset
                ? undefined
                : { color: shell.fg, background: shell.chip }
            }
          >
            {preset} LF
          </button>
        ))}
        <span className="ml-auto text-[9px] font-mono" style={{ color: shell.muted }}>
          ${activePricing.pricePerLfMin.toFixed(2)}/LF
        </span>
        <button
          type="button"
          onClick={onResetDefaults}
          className="px-1.5 py-0.5 text-[10px] rounded-md border border-black/25"
          style={{ color: shell.fg, background: shell.chip }}
          title="Reset defaults"
        >
          ↺
        </button>
        <button
          type="button"
          onClick={onSaveToFolio}
          className="px-2 py-0.5 text-[10px] font-bold rounded-md border-2 border-[#1A1A1A] bg-[#D9B872] text-[#1A1A1A]"
        >
          Folio →
        </button>
      </div>
    </div>
  )
}

function TemplatesBody({
  templates,
  activeId,
  onApply,
  shell,
}: {
  templates: DesignerTemplate[]
  activeId: string | null
  onApply: (patch: Partial<FenceConfiguration>) => void
  shell: (typeof SHELL)['tan']
}) {
  return (
    <div className="h-full flex gap-2 overflow-x-auto no-scrollbar items-stretch">
      {templates.map((t) => {
        const active = activeId === t.id
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onApply(t.patch)}
            className={cn(
              'min-w-[148px] max-w-[180px] flex-1 rounded-lg border-2 text-left px-2.5 py-2 transition',
              active ? 'border-[#1A1A1A] -translate-y-0.5' : 'border-black/25',
            )}
            style={{
              background: active ? '#D9B872' : shell.chip,
              color: active ? '#1A1A1A' : shell.fg,
              boxShadow: active ? '2px 2px 0 #1A1A1A' : undefined,
            }}
          >
            <div className="text-[11px] font-bold leading-tight">{t.label}</div>
            <div
              className="mt-1 text-[8px] font-light leading-snug line-clamp-2"
              style={{ color: active ? 'rgba(26,26,26,0.7)' : shell.muted }}
            >
              {t.blurb}
            </div>
            <div className="mt-1.5 text-[8px] font-bold">{active ? 'Active ✓' : 'Apply ▶'}</div>
          </button>
        )
      })}
    </div>
  )
}

function AiBody({
  prompt,
  onPrompt,
  shell,
}: {
  prompt: string
  onPrompt: (v: string) => void
  shell: (typeof SHELL)['brown']
}) {
  return (
    <div className="h-full flex flex-col justify-between gap-2">
      <div className="flex items-center gap-2">
        <span
          className="text-[8px] font-bold uppercase px-2 py-0.5 rounded-full border border-black/20"
          style={{ background: '#D9B872', color: '#1A1A1A' }}
        >
          Preview · Not live yet
        </span>
        <span className="text-[9px] font-light" style={{ color: shell.muted }}>
          Ask for HOA-safe tweaks, privacy, or stain ideas.
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => onPrompt(e.target.value)}
          placeholder="e.g. Make it darker and more private for a side yard…"
          className="flex-1 min-w-0 rounded-lg border-2 border-[#1A1A1A] bg-[#FAF6EE] text-[#1A1A1A] text-[11px] font-light px-2.5 py-2 outline-none"
        />
        <button
          type="button"
          disabled
          className="shrink-0 rounded-lg border-2 border-[#1A1A1A] bg-[#D9B872]/50 text-[#1A1A1A] font-bold text-[11px] px-3 py-2 cursor-not-allowed opacity-70"
          title="AI assist coming soon"
        >
          Ask AI
        </button>
      </div>
    </div>
  )
}
