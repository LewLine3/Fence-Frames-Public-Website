'use client'

import React from 'react'
import type { FenceConfiguration } from '@/lib/pricing-engine'

export interface ChapterMeta {
  id: string
  num: string
  menuLabel: string
  label: string
  icon: string
  preview: string
}

interface ChapterConfigPanelProps {
  active: string
  chapter?: ChapterMeta
  config: FenceConfiguration
  onChange: (updated: Partial<FenceConfiguration>) => void
  onSelectChapter: (id: string | null) => void
  prevChapter: string | null
  nextChapter: string | null
}

export function ChapterConfigPanel({
  active,
  chapter,
  config,
  onChange,
  onSelectChapter,
  prevChapter,
  nextChapter,
}: ChapterConfigPanelProps) {
  return (
    <div className="pt-1 pb-2 space-y-3 animate-in fade-in duration-150">
            {/* Active Header Badge (Detached Floating Card) */}
            <div
              className="p-3.5 rounded-xl flex items-center justify-between shadow-[3px_3px_0_#1A1A1A]"
              style={{
                background: 'linear-gradient(180deg, #1B4332 0%, #142920 100%)',
                border: '2px solid #C4A574',
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[#E5B842] text-sm shrink-0">▶</span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[#E5B842] uppercase tracking-tight truncate">
                    {chapter?.menuLabel}
                  </div>
                  <div className="text-[9px] text-[#DBD0BD] font-light truncate">
                    {chapter?.label} ·{' '}
                    {chapter?.preview}
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
                onClick={() => prevChapter && onSelectChapter(prevChapter)}
                className="px-2 py-1 bg-[#1C241E] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-[#1C241E] text-white text-[9px] rounded-md border border-white/10 transition"
              >
                ◀ Prev
              </button>
              <button
                onClick={() => onSelectChapter(null)}
                className="flex-1 py-1 bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] text-[10px] font-bold rounded-md border border-[#1A1A1A] transition text-center shadow"
              >
                Done ✓
              </button>
              <button
                disabled={!nextChapter}
                onClick={() => nextChapter && onSelectChapter(nextChapter)}
                className="px-2 py-1 bg-[#1C241E] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-[#1C241E] text-white text-[9px] rounded-md border border-white/10 transition"
              >
                Next ▶
              </button>
            </div>
    </div>
  )
}
