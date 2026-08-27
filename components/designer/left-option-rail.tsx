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
  { id: 'height', num: '#1', label: 'Height & Spacing', icon: '📐', preview: "6' Standard · 8' Bay" },
  { id: 'posts', num: '#2', label: 'Posts & Caps', icon: '🪵', preview: '4x4 Incense Cedar · Pyramid' },
  { id: 'rails', num: '#3', label: 'Rails & Framing', icon: '🪜', preview: '3-Rail 2x4 · 2x6 Cap' },
  { id: 'pickets', num: '#4', label: 'Pickets & Infill', icon: '🌲', preview: 'Board-on-Board 100%' },
  { id: 'stain', num: '#5', label: 'Stain & Finish', icon: '🎨', preview: 'Natural Cedar Penetrating' },
  { id: 'trim', num: '#6', label: 'Trim & Facia', icon: '📏', preview: 'Clean Standard Line' },
  { id: 'gates', num: '#7', label: 'Gates & Access', icon: '🚪', preview: 'Walk & Drive Gates' },
  { id: 'hardware', num: '#8', label: 'Hardware & Ties', icon: '🔩', preview: 'Black Powder · Simpson' },
]

export function LeftOptionRail({
  config,
  onChange,
  activeChapter: controlledChapter,
  onSelectChapter,
  onResetDefaults,
}: LeftOptionRailProps) {
  const [internalActive, setInternalActive] = useState<string | null>('pickets')

  const active = controlledChapter !== undefined ? controlledChapter : internalActive

  const setActive = (id: string | null) => {
    if (onSelectChapter) onSelectChapter(id)
    else setInternalActive(id)
  }

  // Get active preview string dynamically based on config
  const getChapterValue = (id: string) => {
    switch (id) {
      case 'height':
        return `${config.heightFt}' Finished · ${config.postSpacingFt}' Bay`
      case 'posts':
        return `${config.postType.split('-')[0].toUpperCase()} · ${config.postCap.split('-')[0]}`
      case 'rails':
        return `${config.railCount}-Rail ${config.topCap ? '+ 2x6 Cap' : ''}`
      case 'pickets':
        return config.fillPattern === 'board-on-board' ? 'Board-on-Board' : 'Standard 1/2″'
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

  return (
    <div className="relative flex h-full z-30 font-['Rowdies'] select-none">
      
      {/* 1. Full-Height Vertical Option Stream + Corner Hub Anchor */}
      <aside className="w-[180px] sm:w-[200px] md:w-[220px] bg-[#141B16] border-r-[2.5px] border-[#1A1A1A] flex flex-col justify-between shadow-2xl flex-shrink-0 relative has-outside-corners">
        <div className="corner-mark-out tl" />
        
        {/* Stream Top Header */}
        <div className="px-3 py-2 bg-[#1A1A1A] border-b-[2px] border-[#141B16] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
            <span className="text-[10px] font-bold text-[#E5B842] uppercase tracking-wider">
              Option Sets
            </span>
          </div>
          <span className="text-[8px] bg-white/10 text-white/70 px-1 py-0.5 rounded font-mono">
            8 LIVE
          </span>
        </div>

        {/* Endless Vertical Scroll Stream with Seamless Gradient Mask Fade */}
        <div
          className="flex-1 overflow-y-auto cad-scrollbar p-2 space-y-1.5 scroll-smooth relative"
          style={{
            maskImage:
              'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 20px), transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, black 16px, black calc(100% - 20px), transparent)',
          }}
        >
          <div className="pt-2 pb-3 space-y-1.5">
            {CHAPTERS.map((ch) => {
              const isSelected = active === ch.id
              return (
                <button
                  key={ch.id}
                  onClick={() => setActive(isSelected ? null : ch.id)}
                  className={`w-full p-2 rounded-[5px] border text-left transition flex flex-col justify-between relative group ${
                    isSelected
                      ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-md'
                      : 'bg-[#1C241E] hover:bg-[#243327] text-white/80 border-white/10 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm leading-none">{ch.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-tight line-clamp-1">
                        {ch.label}
                      </span>
                    </div>
                    <span className="text-[8px] opacity-60 font-mono">{ch.num}</span>
                  </div>

                  <div className="flex items-center justify-between text-[9px] w-full pt-1 border-t border-white/10">
                    <span className="text-white/70 font-light truncate max-w-[130px]">
                      {getChapterValue(ch.id)}
                    </span>
                    <span className="text-[#E5B842] text-[8px] group-hover:translate-x-0.5 transition-transform">
                      {isSelected ? '◀' : '▶'}
                    </span>
                  </div>

                  {isSelected && (
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-4 bg-[#E5B842] rounded-l-sm" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. THE CORNER HUB (Bottom-Left Nexus where Left Rail & Bottom Stream Meet) */}
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
              {active ? '✕ Dock Menu' : '☰ Open Options'}
            </button>
            <button
              onClick={onResetDefaults}
              className="hover:text-[#F27A22] transition"
              title="Reset to 8 LF standard"
            >
              ↺ Reset
            </button>
          </div>
        </div>
      </aside>

      {/* 3. Flyout Option Takeover Drawer (Emerges smoothly over the Canvas on Demand) */}
      {active && (
        <aside className="w-[280px] sm:w-[320px] md:w-[360px] bg-[#141B16]/98 border-r-[2.5px] border-[#1A1A1A] flex flex-col shadow-2xl flex-shrink-0 z-40 animate-in slide-in-from-left duration-200">
          {/* Drawer Header */}
          <div className="bg-[#1A1A1A] px-3 py-2 border-b-[2px] border-[#141B16] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-base">
                {CHAPTERS.find((c) => c.id === active)?.icon || '⚙️'}
              </span>
              <div>
                <h3 className="text-xs font-bold text-[#E5B842] uppercase tracking-wider">
                  {CHAPTERS.find((c) => c.id === active)?.label}
                </h3>
                <p className="text-[8px] text-white/50 font-light">
                  {CHAPTERS.find((c) => c.id === active)?.preview}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActive(null)}
              className="w-6 h-6 rounded bg-[#1C241E] hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center text-xs border border-white/10"
              title="Close drawer"
            >
              ✕
            </button>
          </div>

          {/* Drawer Options */}
          <div className="flex-1 overflow-y-auto cad-scrollbar p-3 space-y-3.5 bg-[#18201B]">
            
            {/* HEIGHT & SPACING */}
            {active === 'height' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Finished Height Above Grade:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[4, 5, 6, 8].map((h) => (
                      <button
                        key={h}
                        onClick={() => onChange({ heightFt: h })}
                        className={`py-2 text-xs rounded-[4px] border font-bold text-center transition ${
                          config.heightFt === h
                            ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-inner'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {h}&apos; FT
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Post-to-Post Spacing (On-Center):
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { sp: 8, label: '8ft Standard (Accurate to Image)' },
                      { sp: 6, label: '6ft High-Wind Span' },
                    ].map((item) => (
                      <button
                        key={item.sp}
                        onClick={() => onChange({ postSpacingFt: item.sp })}
                        className={`py-2 px-2 text-[10px] rounded-[4px] border text-left transition ${
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

            {/* POSTS & CAPS */}
            {active === 'posts' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Post Dimension &amp; Material:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: '4x4-cedar', label: '🪵 4x4 Incense Cedar', desc: 'Natural beauty & rot resistance' },
                      { id: '4x6-cedar', label: '🪵 6x6 Heavy Timber', desc: 'Maximum structural heft' },
                      { id: 'postmaster-steel', label: '🔩 PostMaster Steel', desc: 'Lifetime storm-proof' },
                      { id: '4x4-pt', label: '🪵 4x4 Ground Treated', desc: 'High ground moisture' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onChange({ postType: p.id as any })}
                        className={`p-2 rounded-[4px] border text-left transition flex flex-col justify-between ${
                          config.postType === p.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
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
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Architectural Post Cap:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'cedar-pyramid', label: 'Cedar Pyramid (Std)' },
                      { id: 'copper-pyramid', label: 'Copper Metal Pyramid' },
                      { id: 'metal-black', label: 'Black Powder Metal' },
                      { id: 'solar-led', label: 'Solar LED Light Cap' },
                      { id: 'none', label: 'Flush Cut (None)' },
                    ].map((cap) => (
                      <button
                        key={cap.id}
                        onClick={() => onChange({ postCap: cap.id as any })}
                        className={`py-1.5 px-2 text-[10px] rounded-[3px] border text-left transition ${
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

            {/* RAILS & FRAMING */}
            {active === 'rails' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Horizontal Rail Count:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { count: 2, label: '2-Rail' },
                      { count: 3, label: '3-Rail' },
                      { count: 4, label: '4-Rail' },
                    ].map((r) => (
                      <button
                        key={r.count}
                        onClick={() => onChange({ railCount: r.count as any })}
                        className={`py-2 text-xs rounded-[4px] border font-bold text-center transition ${
                          config.railCount === r.count
                            ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-inner'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="flex items-center gap-2 p-2 bg-[#1C241E] rounded-[4px] border border-white/10 text-xs text-white cursor-pointer hover:border-white/30">
                    <input
                      type="checkbox"
                      checked={config.topCap}
                      onChange={(e) => onChange({ topCap: e.target.checked })}
                      className="accent-[#F27A22] w-4 h-4"
                    />
                    <div>
                      <div className="font-bold">2x6 Top Rail Cap Board</div>
                      <div className="text-[8px] text-white/50">Protects end grain from rain decay</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* PICKETS & INFILL */}
            {active === 'pickets' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Picket Infill Pattern:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'board-on-board', label: '🌲 Board-on-Board (100%)', desc: 'Overlapping dual row' },
                      { id: 'flat-top-privacy', label: '🌲 Standard Flat (1/2″)', desc: 'Single row standard' },
                      { id: 'shadowbox', label: '🌲 Shadowbox', desc: 'Alternating airflow' },
                      { id: 'butt-joint', label: '🌲 Solid Butt Joint', desc: 'Edge-to-edge flush' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => onChange({ fillPattern: f.id })}
                        className={`p-2 rounded-[4px] border text-left transition flex flex-col justify-between ${
                          config.fillPattern === f.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
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
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Lumber Grade:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'tight-knot', label: 'Tight-Knot Cedar (Std)', desc: 'Warm rustic grain' },
                      { id: 'clear-cedar', label: 'Clear Cedar (Prem)', desc: 'Knot-free vertical' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => onChange({ woodGrade: g.id as any })}
                        className={`p-2 rounded-[4px] border text-left transition ${
                          config.woodGrade === g.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <div className="text-xs">{g.label}</div>
                        <div className="text-[8px] opacity-70 font-light">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STAIN & FINISH */}
            {active === 'stain' && (
              <div className="space-y-3">
                <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                  Factory Pre-Stain Finish:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'cedar-natural', label: 'Cedar Natural', color: '#B87B44' },
                    { id: 'clear-seal', label: 'Clear Sealant', color: '#C9A982' },
                    { id: 'chestnut-brown', label: 'Chestnut Brown', color: '#784626' },
                    { id: 'redwood', label: 'Redwood Tone', color: '#8E3826' },
                    { id: 'dark-walnut', label: 'Dark Walnut', color: '#42281D' },
                    { id: 'none', label: 'Unfinished / Raw', color: '#D8C3A5' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onChange({ stainType: s.id as any })}
                      className={`p-2 rounded-[4px] border text-left transition flex items-center gap-2 ${
                        config.stainType === s.id
                          ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                          : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <div className="text-xs truncate">{s.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GATES */}
            {active === 'gates' && (
              <div className="space-y-3">
                <div className="p-2.5 bg-[#1C241E] rounded-[4px] border border-white/10 flex items-center justify-between">
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
                    <span className="w-6 text-center font-bold text-[#E5B842] text-xs">
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

                <div className="p-2.5 bg-[#1C241E] rounded-[4px] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">10ft Double Drive Gate</div>
                    <div className="text-[8px] text-white/50">Drop rod + strap hinges</div>
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
                    <span className="w-6 text-center font-bold text-[#E5B842] text-xs">
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

            {/* TRIM & HARDWARE */}
            {(active === 'trim' || active === 'hardware') && (
              <div className="space-y-3">
                <div>
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Facia &amp; Trim:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'none', label: 'Clean Standard' },
                      { id: 'kickboard-2x6', label: '2x6 Rot Board' },
                      { id: 'picture-frame-trim', label: 'Picture Frame' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        onClick={() => onChange({ trimStyle: t.id as any })}
                        className={`p-2 text-xs rounded-[4px] border text-left transition ${
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

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[9px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Hardware:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'black-powder', label: 'Black' },
                      { id: 'galvanized', label: 'Galv' },
                      { id: 'stainless-steel', label: 'Stainless' },
                    ].map((hw) => (
                      <button
                        key={hw.id}
                        onClick={() => onChange({ hardwareTier: hw.id as any })}
                        className={`py-1.5 text-[10px] rounded-[3px] border text-center font-bold transition ${
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
              </div>
            )}

          </div>
        </aside>
      )}

    </div>
  )
}
