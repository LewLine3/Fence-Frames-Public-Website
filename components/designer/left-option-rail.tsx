'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface LeftOptionRailProps {
  config: FenceConfiguration;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  activeChapter?: string | null;
  onSelectChapter?: (chapterId: string | null) => void;
  onResetDefaults?: () => void;
}

export const CHAPTERS = [
  { id: 'height', num: '#1', label: 'Height & Spacing', icon: '📐', preview: "6' Std · 8' Bay" },
  { id: 'posts', num: '#2', label: 'Posts & Caps', icon: '🪵', preview: '4x4 Cedar · Pyramid' },
  { id: 'rails', num: '#3', label: 'Rails & Framing', icon: '🪜', preview: '3-Rail · 2x6 Cap' },
  { id: 'pickets', num: '#4', label: 'Pickets & Infill', icon: '🌲', preview: 'Board-on-Board' },
  { id: 'stain', num: '#5', label: 'Stain & Finish', icon: '🎨', preview: 'Cedar Natural' },
  { id: 'trim', num: '#6', label: 'Trim & Facia', icon: '📏', preview: 'Clean Line' },
  { id: 'gates', num: '#7', label: 'Gates & Access', icon: '🚪', preview: 'Walk & Drive Gates' },
  { id: 'hardware', num: '#8', label: 'Hardware & Ties', icon: '🔩', preview: 'Black Powder' },
]

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
      className="w-[240px] flex-shrink-0 flex flex-col justify-between select-none font-['Rowdies'] relative z-30 h-full"
      suppressHydrationWarning
      style={{
        backgroundColor: '#141B16',
        backgroundImage:
          'linear-gradient(rgba(74, 222, 128, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.08) 1px, transparent 1px), linear-gradient(rgba(229, 184, 66, 0.15) 2px, transparent 2px), linear-gradient(90deg, rgba(229, 184, 66, 0.15) 2px, transparent 2px)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0',
        borderRight: '3px solid #F27A22',
        boxShadow: 'inset -1px 0 0 #000, 1px 0 0 0 #000, 5px 0 15px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* 1. TOP HEADER OF LSB */}
      <div className="px-3 py-2 bg-[#1A1A1A] border-b-[2px] border-[#141B16] flex items-center justify-between flex-shrink-0">
        {active ? (
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => setActive(null)}
              className="flex items-center gap-1 text-[10px] text-[#E5B842] hover:text-white transition font-bold uppercase"
              title="Return to all options"
            >
              <span>◀</span>
              <span>All Options</span>
            </button>
            <span className="text-[9px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded font-mono">
              {CHAPTERS.find((c) => c.id === active)?.num}
            </span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-[10px] font-bold text-[#E5B842] uppercase tracking-wider">
                Option Sets
              </span>
            </div>
            <span className="text-[8px] bg-white/10 text-white/70 px-1.5 py-0.5 rounded font-mono">
              8 LIVE
            </span>
          </>
        )}
      </div>

      {/* 2. MAIN SCROLL BODY (In-Place Mode: Overview List vs Active Item Controls) */}
      <div
        className="flex-1 overflow-y-auto cad-scrollbar p-2.5 space-y-2.5 scroll-smooth relative"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 12px, black calc(100% - 16px), transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 12px, black calc(100% - 16px), transparent)',
        }}
      >
        {/* A. OVERVIEW MODE: SEPARATE CARDS WITH SPACING */}
        {!active && (
          <div className="pt-1 pb-2 space-y-2.5">
            {CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActive(ch.id)}
                className="w-full p-2.5 rounded-xl border text-left transition flex flex-col justify-between relative group gap-1.5 bg-[#1C241E] hover:bg-[#253328] text-white/90 border-white/10 hover:border-[#E5B842]/50 shadow-md"
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{ch.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-tight line-clamp-1">
                      {ch.label}
                    </span>
                  </div>
                  <span className="text-[8px] opacity-60 font-mono">{ch.num}</span>
                </div>

                <div className="flex items-center justify-between text-[9px] w-full pt-1 border-t border-white/10">
                  <span className="text-[#E5B842] font-light truncate max-w-[150px]">
                    {getChapterValue(ch.id)}
                  </span>
                  <span className="text-white/40 text-[9px] group-hover:text-[#F27A22] group-hover:translate-x-0.5 transition-all">
                    Edit ▶
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* B. ACTIVE IN-PLACE CONFIGURATION VIEW */}
        {active && (
          <div className="pt-1 pb-2 space-y-3 animate-in fade-in duration-150">
            {/* Active Header Badge */}
            <div className="p-2 bg-[#1C241E] rounded-lg border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">
                  {CHAPTERS.find((c) => c.id === active)?.icon}
                </span>
                <div>
                  <div className="text-[11px] font-bold text-[#E5B842] uppercase tracking-tight">
                    {CHAPTERS.find((c) => c.id === active)?.label}
                  </div>
                  <div className="text-[8px] text-white/50">
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
