'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface LeftOptionRailProps {
  config: FenceConfiguration;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  activeChapter?: string | null;
  onSelectChapter?: (chapterId: string | null) => void;
}

const CHAPTERS = [
  { id: 'height', label: 'Height & Spacing', icon: '📐', subtitle: '4ft, 6ft, 8ft · 6ft/8ft Bay' },
  { id: 'posts', label: 'Posts & Caps', icon: '🪵', subtitle: '4x4, 6x6, PostMaster · Caps' },
  { id: 'rails', label: 'Rails & Framing', icon: '🪜', subtitle: '2-Rail, 3-Rail · Top Cap' },
  { id: 'pickets', label: 'Pickets & Infill', icon: '🌲', subtitle: 'Board-on-Board, Privacy, Gaps' },
  { id: 'stain', label: 'Stain & Finish', icon: '🎨', subtitle: 'Natural Cedar, Chestnut, Walnut' },
  { id: 'trim', label: 'Trim & Facia', icon: '📏', subtitle: 'Picture Frame, Kickboard' },
  { id: 'gates', label: 'Gates & Access', icon: '🚪', subtitle: 'Walk & Double Drive Gates' },
  { id: 'hardware', label: 'Hardware & Ties', icon: '🔩', subtitle: 'Black Powder, Simpson Ties' },
]

export function LeftOptionRail({
  config,
  onChange,
  activeChapter: controlledChapter,
  onSelectChapter,
}: LeftOptionRailProps) {
  const [internalActive, setInternalActive] = useState<string | null>('pickets')

  const active = controlledChapter !== undefined ? controlledChapter : internalActive

  const setActive = (id: string | null) => {
    if (onSelectChapter) onSelectChapter(id)
    else setInternalActive(id)
  }

  return (
    <div className="relative flex h-full z-20 font-['Rowdies']">
      {/* 1. Slim Icon & Category Rail (Always Visible on Left) */}
      <aside className="w-[72px] md:w-[84px] bg-[#141B16] border-[2.5px] border-[#1A1A1A] rounded-[5px] flex flex-col items-center py-3 justify-between shadow-2xl flex-shrink-0 has-outside-corners">
        <div className="corner-mark-out tl" />
        <div className="corner-mark-out bl" />

        {/* Top Header Icon */}
        <div className="flex flex-col items-center mb-3 pb-2 border-b border-white/10 w-full">
          <button
            onClick={() => setActive(active ? null : 'pickets')}
            className={`w-10 h-10 rounded-[6px] flex items-center justify-center text-lg transition shadow-md border ${
              active
                ? 'bg-[#E5B842] text-[#141B16] border-[#1A1A1A]'
                : 'bg-[#1C241E] text-white/80 hover:text-white border-white/15'
            }`}
            title="Toggle Option Flyout Drawer"
          >
            ☰
          </button>
          <span className="text-[8px] text-[#E5B842] uppercase font-bold mt-1 tracking-wider">
            Options
          </span>
        </div>

        {/* Chapter Icon Buttons */}
        <div className="flex-1 w-full overflow-y-auto cad-scrollbar flex flex-col items-center gap-2 px-1.5">
          {CHAPTERS.map((ch) => {
            const isSelected = active === ch.id
            return (
              <button
                key={ch.id}
                onClick={() => setActive(isSelected ? null : ch.id)}
                className={`w-full py-2 px-1 rounded-[5px] flex flex-col items-center gap-1 transition text-center border relative ${
                  isSelected
                    ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-inner font-bold'
                    : 'bg-[#1C241E] text-white/70 hover:text-white hover:bg-[#263529] border-white/10'
                }`}
                title={ch.label}
              >
                <span className="text-base leading-none">{ch.icon}</span>
                <span className="text-[8px] uppercase tracking-tight leading-tight line-clamp-1">
                  {ch.label.split(' ')[0]}
                </span>
                {isSelected && (
                  <span className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-1.5 h-3 bg-[#E5B842] rounded-l-sm" />
                )}
              </button>
            )
          })}
        </div>

        {/* Bottom Help Indicator */}
        <div className="pt-2 mt-2 border-t border-white/10 flex flex-col items-center">
          <span className="text-[9px] text-[#4ADE80] font-mono">8 LIVE</span>
        </div>
      </aside>

      {/* 2. Expanded Flyout / Option Set Takeover Drawer */}
      {active && (
        <aside className="w-[300px] sm:w-[340px] md:w-[380px] bg-[#141B16]/98 border-[2.5px] border-[#1A1A1A] ml-2 rounded-[5px] shadow-2xl flex flex-col overflow-hidden has-outside-corners animate-in slide-in-from-left duration-200">
          <div className="corner-mark-out tr" />
          <div className="corner-mark-out br" />

          {/* Flyout Header */}
          <div className="bg-[#1A1A1A] px-3.5 py-2.5 border-b-[2px] border-[#141B16] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {CHAPTERS.find((c) => c.id === active)?.icon || '⚙️'}
              </span>
              <div>
                <h3 className="text-xs font-bold text-[#E5B842] uppercase tracking-wider">
                  {CHAPTERS.find((c) => c.id === active)?.label}
                </h3>
                <p className="text-[9px] text-white/50 font-light">
                  {CHAPTERS.find((c) => c.id === active)?.subtitle}
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

          {/* Option Set Content */}
          <div className="flex-1 overflow-y-auto cad-scrollbar p-3.5 space-y-4 bg-[#18201B]">
            
            {/* CHAPTER: HEIGHT & SPACING */}
            {active === 'height' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Finished Fence Height Above Grade:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
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
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Post-to-Post Spacing (On-Center):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { sp: 8, label: '8ft Standard Bay (Default)' },
                      { sp: 6, label: '6ft High-Wind Bay' },
                    ].map((item) => (
                      <button
                        key={item.sp}
                        onClick={() => onChange({ postSpacingFt: item.sp })}
                        className={`py-2 px-2.5 text-[11px] rounded-[4px] border text-left transition ${
                          config.postSpacingFt === item.sp
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
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

            {/* CHAPTER: POSTS & CAPS */}
            {active === 'posts' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Post Material &amp; Dimension:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: '4x4-cedar', label: '🪵 4x4 Incense Cedar', desc: 'Natural beauty & rot resistance' },
                      { id: '4x6-cedar', label: '🪵 6x6 Heavy Timber', desc: 'Maximum structural heft' },
                      { id: 'postmaster-steel', label: '🔩 PostMaster Steel', desc: 'Lifetime storm-proof' },
                      { id: '4x4-pt', label: '🪵 4x4 Ground Treated', desc: 'High ground moisture' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onChange({ postType: p.id as any })}
                        className={`py-2 px-2.5 rounded-[4px] border text-left transition flex flex-col justify-between ${
                          config.postType === p.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <span className="text-xs">{p.label}</span>
                        <span className="text-[9px] opacity-70 font-light mt-0.5">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Architectural Post Cap:
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'cedar-pyramid', label: 'Cedar Pyramid (Std)' },
                      { id: 'copper-pyramid', label: 'Copper Metal Pyramid' },
                      { id: 'metal-black', label: 'Black Powder Metal' },
                      { id: 'solar-led', label: 'Solar LED Light Cap' },
                      { id: 'none', label: 'Flush Flat Cut (None)' },
                    ].map((cap) => (
                      <button
                        key={cap.id}
                        onClick={() => onChange({ postCap: cap.id as any })}
                        className={`py-1.5 px-2 text-[10.5px] rounded-[3px] border text-left transition ${
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

            {/* CHAPTER: RAILS & FRAMING */}
            {active === 'rails' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Horizontal Rail Count:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { count: 2, label: '2-Rail (Economy)' },
                      { count: 3, label: '3-Rail (Standard)' },
                      { count: 4, label: '4-Rail (Heavy)' },
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

                <div className="pt-2 border-t border-white/10 space-y-2">
                  <label className="flex items-center gap-2 p-2 bg-[#1C241E] rounded-[4px] border border-white/10 text-xs text-white cursor-pointer hover:border-white/30">
                    <input
                      type="checkbox"
                      checked={config.topCap}
                      onChange={(e) => onChange({ topCap: e.target.checked })}
                      className="accent-[#F27A22] w-4 h-4"
                    />
                    <div>
                      <div className="font-bold">2x6 Top Rail Cap Board</div>
                      <div className="text-[9px] text-white/50">Protects end grain from rain decay</div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* CHAPTER: PICKETS & INFILL */}
            {active === 'pickets' && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Picket Infill Pattern:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'board-on-board', label: '🌲 Board-on-Board (100% Privacy)', desc: 'Overlapping dual row — no shrinkage gaps' },
                      { id: 'flat-top-privacy', label: '🌲 Standard Flat Top (1/2″ Gap)', desc: 'Single row standard privacy' },
                      { id: 'shadowbox', label: '🌲 Shadowbox (Semi-Privacy)', desc: 'Alternating sides for airflow' },
                      { id: 'butt-joint', label: '🌲 Solid Butt Joint', desc: 'Edge-to-edge flush boundary' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => onChange({ fillPattern: f.id })}
                        className={`py-2 px-2.5 rounded-[4px] border text-left transition flex flex-col justify-between ${
                          config.fillPattern === f.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <span className="text-xs">{f.label}</span>
                        <span className="text-[9px] opacity-70 font-light mt-0.5">{f.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Western Red Cedar Lumber Grade:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'tight-knot', label: 'Tight-Knot Cedar (Standard)', desc: 'Warm rustic grain' },
                      { id: 'clear-cedar', label: 'Clear Architectural (Premium)', desc: 'Knot-free vertical grain' },
                    ].map((g) => (
                      <button
                        key={g.id}
                        onClick={() => onChange({ woodGrade: g.id as any })}
                        className={`py-2 px-2.5 rounded-[4px] border text-left transition ${
                          config.woodGrade === g.id
                            ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                            : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                        }`}
                      >
                        <div className="text-xs">{g.label}</div>
                        <div className="text-[9px] opacity-70 font-light">{g.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CHAPTER: STAIN & FINISH */}
            {active === 'stain' && (
              <div className="space-y-3">
                <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                  Factory Pre-Stain Penetrating Oil Finish:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'cedar-natural', label: 'Cedar Natural', color: '#B87B44', desc: 'Warm golden honey tone' },
                    { id: 'clear-seal', label: 'Clear Sealant', color: '#C9A982', desc: 'Natural wood preservation' },
                    { id: 'chestnut-brown', label: 'Chestnut Brown', color: '#784626', desc: 'Deep earthy rich tone' },
                    { id: 'redwood', label: 'Redwood Tone', color: '#8E3826', desc: 'Vibrant Pacific redwood' },
                    { id: 'dark-walnut', label: 'Dark Walnut', color: '#42281D', desc: 'Modern espresso dark' },
                    { id: 'none', label: 'Unfinished / Raw', color: '#D8C3A5', desc: 'Naturally weathers to silver' },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => onChange({ stainType: s.id as any })}
                      className={`p-2 rounded-[4px] border text-left transition flex items-center gap-2.5 ${
                        config.stainType === s.id
                          ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                          : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                      }`}
                    >
                      <span
                        className="w-5 h-5 rounded-full border border-white/30 flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: s.color }}
                      />
                      <div>
                        <div className="text-xs">{s.label}</div>
                        <div className="text-[9px] opacity-70 font-light">{s.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CHAPTER: GATES & ACCESS */}
            {active === 'gates' && (
              <div className="space-y-3">
                <div className="p-2.5 bg-[#1C241E] rounded-[4px] border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">4ft Standard Walk Gate</div>
                    <div className="text-[9px] text-white/50">Steel anti-sag frame + latch</div>
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
                    <span className="w-6 text-center font-bold text-[#E5B842] text-sm">
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
                    <div className="text-xs font-bold text-white">10ft Driveway Double Gate</div>
                    <div className="text-[9px] text-white/50">Drop rod + heavy-duty strap hinges</div>
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
                    <span className="w-6 text-center font-bold text-[#E5B842] text-sm">
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

            {/* CHAPTER: TRIM & HARDWARE */}
            {(active === 'trim' || active === 'hardware') && (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Facia &amp; Trim Style:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none', label: 'Clean Standard Line' },
                      { id: 'kickboard-2x6', label: '2x6 Bottom Rot Board' },
                      { id: 'picture-frame-trim', label: 'Full Picture Frame Trim' },
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
                  <label className="text-[10px] text-white/70 font-light uppercase tracking-wide block mb-1.5">
                    Fasteners &amp; Hardware Tier:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'black-powder', label: 'Black Powder' },
                      { id: 'galvanized', label: 'Galvanized' },
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
