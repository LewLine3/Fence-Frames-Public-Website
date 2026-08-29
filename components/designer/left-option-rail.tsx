'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'
import { useInfiniteLoop } from '@/hooks/use-infinite-loop'

interface LeftOptionRailProps {
  config: FenceConfiguration;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  activeChapter?: string | null;
  onSelectChapter?: (chapterId: string | null) => void;
  onResetDefaults?: () => void;
}

export const CHAPTERS = [
  { id: 'height', num: '01', label: 'Height & Spacing', icon: '📐', preview: "6' Std · 8' Bay" },
  { id: 'posts', num: '02', label: 'Posts & Caps', icon: '🪵', preview: '4x4 Cedar · Pyramid' },
  { id: 'rails', num: '03', label: 'Rails & Framing', icon: '🪜', preview: '3-Rail · 2x6 Cap' },
  { id: 'pickets', num: '04', label: 'Pickets & Infill', icon: '🌲', preview: 'Board-on-Board' },
  { id: 'stain', num: '05', label: 'Stain & Finish', icon: '🎨', preview: 'Cedar Natural' },
  { id: 'trim', num: '06', label: 'Trim & Facia', icon: '📏', preview: 'Clean Line' },
  { id: 'gates', num: '07', label: 'Gates & Access', icon: '🚪', preview: 'Walk & Drive Gates' },
  { id: 'hardware', num: '08', label: 'Hardware & Ties', icon: '🔩', preview: 'Black Powder' },
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
      return (walk + drive) > 0 ? `$${walk + drive}` : '$385/ea'
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

  // Hook for infinite vertical scroll in overview mode
  const { containerRef, tripled, handleScroll } = useInfiniteLoop(CHAPTERS, 'y')

  // Get active preview string dynamically based on config
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

  return (
    <aside
      className="hidden md:flex w-[250px] lg:w-[280px] flex-shrink-0 flex-col justify-between select-none font-['Rowdies'] relative z-30 h-full min-h-0"
      suppressHydrationWarning
      style={{
        backgroundColor: '#1C180E',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.40) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.40) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, 0.85) 2px, transparent 2px), linear-gradient(90deg, rgba(0, 0, 0, 0.85) 2px, transparent 2px), linear-gradient(145deg, #0D120F 0%, #1A170F 30%, #3D3014 65%, #594418 100%)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px, 100% 100%',
        backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0',
        borderRight: '3px solid #F27A22',
        boxShadow: 'inset -1px 0 0 #000, 1px 0 0 0 #000, 5px 0 18px rgba(0, 0, 0, 0.65)',
      }}
    >
      {/* 1. TOP HEADER OF LSB */}
      <div className="px-3.5 py-2.5 bg-[#0D120F]/90 backdrop-blur-md border-b-[2px] border-[#000]/60 flex items-center justify-between flex-shrink-0 shadow-md">
        {active ? (
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setActive(null)}
              className="flex items-center gap-1.5 text-[10px] text-[#E5B842] hover:text-white transition font-bold uppercase bg-[#141B16] px-2.5 py-1 rounded-lg border border-white/10 shadow-sm"
              title="Return to all options"
            >
              <span>◀</span>
              <span>All Options</span>
            </button>
            <span className="text-xs bg-[#E5B842] text-[#141B16] font-bold px-2 py-0.5 rounded-md font-mono shadow-sm">
              {CHAPTERS.find((c) => c.id === active)?.num}
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-xs font-bold text-[#E5B842] uppercase tracking-wider">
                Option Circuit
              </span>
            </div>
            <span className="text-[9px] bg-black/70 text-[#E5B842] border border-[#E5B842]/40 px-2 py-0.5 rounded-md font-mono font-bold">
              01–08 LOOP
            </span>
          </>
        )}
      </div>

      {/* 2. MAIN SCROLL BODY (Invisible Scrollbar + Generous Floating Card Spacing) */}
      <div
        ref={!active ? containerRef : undefined}
        onScroll={!active ? handleScroll : undefined}
        className="flex-1 overflow-y-auto no-scrollbar p-3.5 scroll-smooth relative"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          maskImage:
            'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 20px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 20px), transparent)',
        }}
      >
        {/* A. OVERVIEW MODE: LARGE FREE-FLOATING CIRCUIT PILL CARDS */}
        {!active && (
          <div className="pt-2 pb-4 space-y-4">
            {tripled.map((ch, idx) => {
              const costMetric = getChapterCostMetric(ch.id, config)
              return (
                <button
                  key={`${ch.id}-${idx}`}
                  onClick={() => setActive(ch.id)}
                  className="w-full p-3.5 rounded-2xl border-2 border-[#1A1A1A] hover:border-[#E5B842] text-left transition-all duration-200 flex flex-col justify-between relative group gap-3 bg-gradient-to-b from-[#1E2B22] to-[#121B14] hover:from-[#283C2F] hover:to-[#17251B] text-white shadow-[0_10px_24px_rgba(0,0,0,0.65)] hover:shadow-[0_14px_32px_rgba(0,0,0,0.85)] hover:-translate-y-1 cursor-pointer"
                >
                  {/* Card Top Strip with 2-Digit Circuit Badge */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl leading-none filter drop-shadow">{ch.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wide text-[#FAF6EE] group-hover:text-[#E5B842] transition-colors">
                        {ch.label}
                      </span>
                    </div>

                    {/* Circuit Number Pill */}
                    <span className="w-7 h-7 rounded-xl bg-black/70 border border-[#E5B842]/50 text-[#E5B842] font-mono font-bold text-xs flex items-center justify-center shadow-inner group-hover:border-[#E5B842] group-hover:scale-105 transition-transform">
                      {ch.num}
                    </span>
                  </div>

                  {/* Card Bottom Value Pill & Direct Cost Metric */}
                  <div className="flex items-center justify-between text-[10px] w-full pt-2 border-t border-white/10">
                    <span className="text-[#E5B842] font-semibold truncate max-w-[115px] bg-black/50 px-2 py-1 rounded-md border border-white/10 shadow-inner">
                      {getChapterValue(ch.id)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#4ADE80] font-mono font-bold bg-[#141B16] px-2 py-1 rounded-md border border-[#4ADE80]/40 shadow-sm">
                        {costMetric}
                      </span>
                      <span className="text-[11px] text-[#F27A22] font-bold group-hover:translate-x-1 transition-transform">
                        ▶
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* B. ACTIVE IN-PLACE CONFIGURATION VIEW */}
        {active && (
          <div className="pt-1 pb-2 space-y-3 animate-in fade-in duration-150">
            {/* Active Header Badge (Detached Floating Card) */}
            <div className="p-3 bg-gradient-to-b from-[#243527] to-[#141B16] rounded-2xl border-2 border-[#E5B842] shadow-[0_6px_16px_rgba(0,0,0,0.6)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl filter drop-shadow">
                  {CHAPTERS.find((c) => c.id === active)?.icon}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#E5B842] uppercase tracking-tight">
                    {CHAPTERS.find((c) => c.id === active)?.label}
                  </div>
                  <div className="text-[8px] text-white/60 font-light">
                    {CHAPTERS.find((c) => c.id === active)?.preview}
                  </div>
                </div>
              </div>
            </div>

            {/* 1. HEIGHT & SPACING */}
            {active === 'height' && (
              <div className="space-y-3 text-white">
                <div>
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Finished Height:
                  </label>
                  <div className="grid grid-cols-4 gap-1">
                    {[4, 5, 6, 8].map((h) => (
                      <button
                        key={h}
                        onClick={() => onChange({ heightFt: h })}
                        className={`py-2 text-xs rounded-lg border font-bold text-center transition ${
                          config.heightFt === h
                            ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-inner'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {h}&apos;
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Post Spacing (On-Center):
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { sp: 8, label: "8' Standard (Image Scale)" },
                      { sp: 6, label: "6' High-Wind Span" },
                    ].map((item) => (
                      <button
                        key={item.sp}
                        onClick={() => onChange({ postSpacingFt: item.sp })}
                        className={`py-2 px-2 text-[10px] rounded-lg border text-left transition ${
                          config.postSpacingFt === item.sp
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. POSTS & CAPS */}
            {active === 'posts' && (
              <div className="space-y-3 text-white">
                <div>
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Post Dimension:
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: '4x4-cedar', label: '🪵 4x4 Incense Cedar', desc: 'Natural beauty & rot resistance' },
                      { id: '4x6-cedar', label: '🪵 6x6 Heavy Timber', desc: 'Maximum structural heft' },
                      { id: 'postmaster-steel', label: '🔩 PostMaster Steel', desc: 'Lifetime storm-proof' },
                      { id: '4x4-pt', label: '🪵 4x4 Ground Treated', desc: 'High ground moisture' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onChange({ postType: p.id as any })}
                        className={`p-2 rounded-lg border text-left transition flex flex-col justify-between ${
                          config.postType === p.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <span className="text-xs">{p.label}</span>
                        <span className="text-[8px] opacity-70 font-light mt-0.5">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Architectural Post Cap:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'cedar-pyramid', label: 'Cedar Cap' },
                      { id: 'copper-pyramid', label: 'Copper Metal' },
                      { id: 'metal-black', label: 'Black Powder' },
                      { id: 'solar-led', label: 'Solar LED' },
                      { id: 'none', label: 'Flush Cut' },
                    ].map((cap) => (
                      <button
                        key={cap.id}
                        onClick={() => onChange({ postCap: cap.id as any })}
                        className={`py-1.5 px-1.5 text-[9px] rounded-md border text-center transition truncate ${
                          config.postCap === cap.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {cap.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. RAILS & FRAMING */}
            {active === 'rails' && (
              <div className="space-y-3 text-white">
                <div>
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Rail Count:
                  </label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { count: 2, label: '2-Rail' },
                      { count: 3, label: '3-Rail' },
                      { count: 4, label: '4-Rail' },
                    ].map((r) => (
                      <button
                        key={r.count}
                        onClick={() => onChange({ railCount: r.count as any })}
                        className={`py-2 text-xs rounded-lg border font-bold text-center transition ${
                          config.railCount === r.count
                            ? 'bg-[#F27A22] text-white border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="flex items-center gap-2 p-2 bg-[#1C241E] rounded-lg border border-white/10 text-xs text-white cursor-pointer hover:border-white/30">
                    <input
                      type="checkbox"
                      checked={config.topCap}
                      onChange={(e) => onChange({ topCap: e.target.checked })}
                      className="accent-[#F27A22] w-4 h-4"
                    />
                    <div>
                      <div className="font-bold text-[11px]">2x6 Cap Board</div>
                      <div className="text-[8px] text-white/50">Protects end grain</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* 4. PICKETS & INFILL */}
            {active === 'pickets' && (
              <div className="space-y-3 text-white">
                <div>
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Picket Infill:
                  </label>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: 'board-on-board', label: '🌲 Board-on-Board (100%)', desc: 'Overlapping dual row' },
                      { id: 'flat-top-privacy', label: '🌲 Standard Flat (1/2″)', desc: 'Single row standard' },
                      { id: 'shadowbox', label: '🌲 Shadowbox Airflow', desc: 'Alternating airflow' },
                      { id: 'butt-joint', label: '🌲 Solid Butt Joint', desc: 'Edge-to-edge flush' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => onChange({ fillPattern: f.id })}
                        className={`p-2 rounded-lg border text-left transition flex flex-col justify-between ${
                          config.fillPattern === f.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <span className="text-xs">{f.label}</span>
                        <span className="text-[8px] opacity-70 font-light mt-0.5">{f.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                    Lumber Grade:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'tight-knot', label: 'Tight-Knot (Std)' },
                      { id: 'clear-cedar', label: 'Clear Cedar (Prem)' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => onChange({ woodGrade: g.id as any })}
                        className={`p-2 rounded-lg border text-center text-xs transition ${
                          config.woodGrade === g.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. STAIN & FINISH */}
            {active === 'stain' && (
              <div className="space-y-3 text-white">
                <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                  Factory Stain Tone:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'cedar-natural', label: 'Cedar Natural', color: '#B87B44' },
                    { id: 'clear-seal', label: 'Clear Seal', color: '#C9A982' },
                    { id: 'chestnut-brown', label: 'Chestnut', color: '#784626' },
                    { id: 'redwood', label: 'Redwood', color: '#8E3826' },
                    { id: 'dark-walnut', label: 'Dark Walnut', color: '#42281D' },
                    { id: 'none', label: 'Raw Wood', color: '#D8C3A5' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onChange({ stainType: s.id as any })}
                      className={`p-2 rounded-lg border text-left transition flex items-center gap-1.5 ${
                        config.stainType === s.id
                          ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                          : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <div className="text-[10px] truncate">{s.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 6. TRIM & FACIA */}
            {active === 'trim' && (
              <div className="space-y-3 text-white">
                <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                  Trim Style:
                </label>
                <div className="flex flex-col gap-1.5">
                  {[
                    { id: 'none', label: 'Clean Standard Line' },
                    { id: 'kickboard-2x6', label: '2x6 Bottom Rot Board' },
                    { id: 'picture-frame-trim', label: 'Full Picture Frame Trim' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => onChange({ trimStyle: t.id as any })}
                      className={`p-2 text-xs rounded-lg border text-left transition ${
                        config.trimStyle === t.id
                          ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                          : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 7. GATES */}
            {active === 'gates' && (
              <div className="space-y-2.5 text-white">
                <div className="p-2.5 bg-[#1C241E] rounded-lg border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">4ft Walk Gate</div>
                    <div className="text-[8px] text-white/50">Steel anti-sag frame</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        onChange({
                          gates: {
                            ...config.gates,
                            walkGates: Math.max(0, (config.gates?.walkGates || 0) - 1),
                          },
                        })
                      }
                      className="w-6 h-6 bg-[#141B16] rounded border border-white/20 font-bold hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-[#E5B842] text-xs">
                      {config.gates?.walkGates || 0}
                    </span>
                    <button
                      onClick={() =>
                        onChange({
                          gates: {
                            ...config.gates,
                            walkGates: Math.min(6, (config.gates?.walkGates || 0) + 1),
                          },
                        })
                      }
                      className="w-6 h-6 bg-[#141B16] rounded border border-white/20 font-bold hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-2.5 bg-[#1C241E] rounded-lg border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">10ft Drive Gate</div>
                    <div className="text-[8px] text-white/50">Double swing + drop rod</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        onChange({
                          gates: {
                            ...config.gates,
                            driveGates: Math.max(0, (config.gates?.driveGates || 0) - 1),
                          },
                        })
                      }
                      className="w-6 h-6 bg-[#141B16] rounded border border-white/20 font-bold hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="w-5 text-center font-bold text-[#E5B842] text-xs">
                      {config.gates?.driveGates || 0}
                    </span>
                    <button
                      onClick={() =>
                        onChange({
                          gates: {
                            ...config.gates,
                            driveGates: Math.min(4, (config.gates?.driveGates || 0) + 1),
                          },
                        })
                      }
                      className="w-6 h-6 bg-[#141B16] rounded border border-white/20 font-bold hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 8. HARDWARE */}
            {active === 'hardware' && (
              <div className="space-y-3 text-white">
                <label className="text-[9px] text-white/70 uppercase tracking-wide block mb-1.5">
                  Hardware Fastener Tier:
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { id: 'black-powder', label: 'Black' },
                    { id: 'galvanized', label: 'Galv' },
                    { id: 'stainless-steel', label: 'Stainless' },
                  ].map((hw) => (
                    <button
                      key={hw.id}
                      onClick={() => onChange({ hardwareTier: hw.id as any })}
                      className={`py-2 text-[10px] rounded-lg border text-center font-bold transition ${
                        config.hardwareTier === hw.id
                          ? 'bg-[#F27A22] text-white border-[#1A1A1A]'
                          : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      {hw.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sequential Step Footer */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-1">
              <button
                disabled={!prevChapter}
                onClick={() => prevChapter && setActive(prevChapter)}
                className="px-2 py-1 bg-[#1C241E] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-[#1C241E] text-white text-[9px] rounded-md border border-white/10 transition"
              >
                ◀ Prev
              </button>
              <button
                onClick={() => setActive(null)}
                className="flex-1 py-1 bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] text-[10px] font-bold rounded-md border border-[#1A1A1A] transition text-center shadow"
              >
                Done ✓
              </button>
              <button
                disabled={!nextChapter}
                onClick={() => nextChapter && setActive(nextChapter)}
                className="px-2 py-1 bg-[#1C241E] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-[#1C241E] text-white text-[9px] rounded-md border border-white/10 transition"
              >
                Next ▶
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. STUDIO HUB NEXUS (Bottom-Left Corner Anchor) */}
      <div className="p-2.5 bg-[#0D130F] border-t-[2.5px] border-[#1A1A1A] flex flex-col gap-1.5 flex-shrink-0 z-10 shadow-inner">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-[4px] bg-[#E5B842] text-[#141B16] flex items-center justify-center font-bold text-xs shadow">
            FF
          </div>
          <div>
            <div className="text-[10px] font-bold text-white uppercase tracking-wider leading-tight">
              Studio Hub
            </div>
            <div className="text-[8px] text-[#4ADE80] font-mono leading-none">
              CONTINUUM ACTIVE
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[8px] text-white/50">
          <button
            onClick={() => setActive(active ? null : 'height')}
            className="hover:text-[#E5B842] transition"
          >
            {active ? '✕ View All' : '☰ Open Options'}
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
