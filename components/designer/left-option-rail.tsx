'use client'

import React from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface LeftOptionRailProps {
  config: FenceConfiguration;
  onChange: (updated: Partial<FenceConfiguration>) => void;
}

export function LeftOptionRail({ config, onChange }: LeftOptionRailProps) {
  return (
    <aside
      id="leftRail"
      className="w-full md:w-[340px] lg:w-[370px] flex-shrink-0 bg-[#141B16] border-[2.5px] border-[#1A1A1A] rounded-[5px] shadow-2xl flex flex-col overflow-hidden has-outside-corners"
    >
      {/* 50% Wall-Span Chamfer Marks */}
      <div className="corner-mark-out tl" />
      <div className="corner-mark-out br" />

      {/* Rail Header */}
      <div className="bg-[#1A1A1A] text-[#E5B842] px-3.5 py-2 border-b-[2px] border-[#141B16] flex items-center justify-between flex-shrink-0 font-['Rowdies']">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F27A22] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Configuration Chapters</span>
        </div>
        <span className="text-[10px] bg-[#FAF6EE]/10 text-[#FAF6EE] px-1.5 py-0.5 rounded border border-white/10">
          8 METRICS LIVE
        </span>
      </div>

      {/* Scrollable Infinite Chapters Container */}
      <div className="flex-1 overflow-y-auto cad-scrollbar p-3 space-y-3 bg-[#18201B] font-['Rowdies']">
        
        {/* CHAPTER 1: HEIGHT & SPACING */}
        <div id="ch-height" className="bg-[#141B16] border border-white/10 rounded-[4px] p-2.5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#E5B842] uppercase">#1 · Height &amp; Post Spacing</span>
            <span className="text-[9px] text-white/50 font-light">HOA standard 6&apos;</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {[4, 5, 6, 8].map((h) => (
              <button
                key={h}
                onClick={() => onChange({ heightFt: h })}
                className={`py-1.5 text-xs rounded-[3px] border font-bold text-center transition ${
                  config.heightFt === h
                    ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-inner'
                    : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                }`}
              >
                {h}&apos; FT
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 pt-1.5 border-t border-white/5">
            <span className="text-[10px] font-light">Post Spacing (O.C.):</span>
            <div className="flex gap-1">
              {[6, 8].map((sp) => (
                <button
                  key={sp}
                  onClick={() => onChange({ postSpacingFt: sp })}
                  className={`px-2 py-0.5 text-[10px] rounded-[3px] border transition ${
                    config.postSpacingFt === sp
                      ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A]'
                      : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                  }`}
                >
                  {sp}&apos; Bay
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CHAPTER 2: POSTS & FOOTINGS */}
        <div id="ch-posts" className="bg-[#141B16] border border-white/10 rounded-[4px] p-2.5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#E5B842] uppercase">#2 · Posts &amp; Footings</span>
            <span className="text-[9px] text-[#4ADE80] font-light">Structural Grade</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {[
              { id: '4x4-cedar', label: '🪵 4x4 Incense Cedar' },
              { id: '4x6-cedar', label: '🪵 6x6 Heavy Timber' },
              { id: 'postmaster-steel', label: '🔩 PostMaster Steel' },
              { id: '4x4-pt', label: '🪵 4x4 Ground Treated' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => onChange({ postType: p.id as any })}
                className={`py-1.5 px-2 text-[10.5px] rounded-[3px] border text-left transition ${
                  config.postType === p.id
                    ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                    : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 pt-1.5 border-t border-white/5">
            <span className="text-[10px] font-light">Post Cap Style:</span>
            <select
              value={config.postCap}
              onChange={(e) => onChange({ postCap: e.target.value as any })}
              className="bg-[#1C241E] border border-white/20 text-white text-[10px] px-1.5 py-0.5 rounded-[3px] focus:outline-none focus:border-[#E5B842]"
            >
              <option value="cedar-pyramid">Cedar Pyramid</option>
              <option value="copper-pyramid">Copper Metal Pyramid</option>
              <option value="metal-black">Black Powder Metal</option>
              <option value="solar-led">Solar LED Light Cap</option>
              <option value="none">Flush Cut (None)</option>
            </select>
          </div>
        </div>

        {/* CHAPTER 3: RAILS & FRAMING */}
        <div id="ch-rails" className="bg-[#141B16] border border-white/10 rounded-[4px] p-2.5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#E5B842] uppercase">#3 · Rails &amp; Framing</span>
            <span className="text-[9px] text-white/50 font-light">2x4 Western Cedar</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 mb-2">
            {[
              { count: 2, label: '2-Rail' },
              { count: 3, label: '3-Rail (Std)' },
              { count: 4, label: '4-Rail (Hvy)' },
            ].map((r) => (
              <button
                key={r.count}
                onClick={() => onChange({ railCount: r.count as any })}
                className={`py-1.5 text-xs rounded-[3px] border font-bold text-center transition ${
                  config.railCount === r.count
                    ? 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-inner'
                    : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-white/5">
            <label className="flex items-center gap-1.5 text-[10px] text-white/80 cursor-pointer">
              <input
                type="checkbox"
                checked={config.topCap}
                onChange={(e) => onChange({ topCap: e.target.checked })}
                className="accent-[#F27A22]"
              />
              <span>2x6 Top Rail Cap</span>
            </label>
            <label className="flex items-center gap-1.5 text-[10px] text-white/80 cursor-pointer">
              <input
                type="checkbox"
                checked={config.trimStyle === 'kickboard-2x6'}
                onChange={(e) => onChange({ trimStyle: e.target.checked ? 'kickboard-2x6' : 'none' })}
                className="accent-[#F27A22]"
              />
              <span>2x6 Bottom Kick</span>
            </label>
          </div>
        </div>

        {/* CHAPTER 4: FILL & PICKETS */}
        <div id="ch-fill" className="bg-[#141B16] border border-white/10 rounded-[4px] p-2.5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#E5B842] uppercase">#4 · Fill Material &amp; Pattern</span>
            <span className="text-[9px] text-[#4ADE80] font-light">1x4 / 1x6 Cedar</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {[
              { id: 'board-on-board', label: '🌲 Board-on-Board (Full)' },
              { id: 'flat-top-privacy', label: '🌲 Standard 1/2″ Gap' },
              { id: 'shadowbox', label: '🌲 Shadowbox (Semi-Air)' },
              { id: 'butt-joint', label: '🌲 Solid Butt Joint' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => onChange({ fillPattern: f.id })}
                className={`py-1.5 px-2 text-[10px] rounded-[3px] border text-left transition ${
                  config.fillPattern === f.id
                    ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                    : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 pt-1.5 border-t border-white/5">
            <span className="text-[10px] font-light">Lumber Grade:</span>
            <div className="flex gap-1">
              {[
                { id: 'tight-knot', label: 'Tight-Knot' },
                { id: 'clear-cedar', label: 'Clear Architectural' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => onChange({ woodGrade: g.id as any })}
                  className={`px-2 py-0.5 text-[10px] rounded-[3px] border transition ${
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

        {/* CHAPTER 5: STAIN & SEALANT */}
        <div id="ch-stain" className="bg-[#141B16] border border-white/10 rounded-[4px] p-2.5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#E5B842] uppercase">#5 · Stain &amp; Wood Finish</span>
            <span className="text-[9px] text-white/50 font-light">Penetrating Oil</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'cedar-natural', label: 'Cedar', color: '#B87B44' },
              { id: 'clear-seal', label: 'Clear', color: '#C9A982' },
              { id: 'chestnut-brown', label: 'Chestnut', color: '#784626' },
              { id: 'redwood', label: 'Redwood', color: '#8E3826' },
              { id: 'dark-walnut', label: 'Walnut', color: '#42281D' },
              { id: 'none', label: 'Natural', color: '#D8C3A5' },
            ].map((s) => (
              <button
                key={s.id}
                onClick={() => onChange({ stainType: s.id as any })}
                className={`py-1 px-1.5 text-[10px] rounded-[3px] border flex items-center gap-1 transition ${
                  config.stainType === s.id
                    ? 'bg-[#F27A22] text-white font-bold border-[#1A1A1A] shadow-inner'
                    : 'bg-[#1C241E] text-white/80 border-white/15 hover:border-white/40'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" style={{ backgroundColor: s.color }} />
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* CHAPTER 6: GATES & ACCESS */}
        <div id="ch-gates" className="bg-[#141B16] border border-white/10 rounded-[4px] p-2.5 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#E5B842] uppercase">#6 · Gates &amp; Access Ports</span>
            <span className="text-[9px] text-[#4ADE80] font-light">Anti-Sag Hardware</span>
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 mb-2">
            <span className="text-[10px] font-light">Standard Walk Gates (4&apos; Wide):</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  onChange({
                    gates: {
                      ...config.gates,
                      walkGates: Math.max(0, (config.gates?.walkGates || 0) - 1),
                    },
                  })
                }
                className="w-5 h-5 bg-[#1C241E] rounded border border-white/15 font-bold text-center hover:bg-white/10"
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-[#E5B842]">
                {config.gates?.walkGates ?? 0}
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
                className="w-5 h-5 bg-[#1C241E] rounded border border-white/15 font-bold text-center hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/80">
            <span className="text-[10px] font-light">Driveway Double Gates (10&apos; Wide):</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() =>
                  onChange({
                    gates: {
                      ...config.gates,
                      driveGates: Math.max(0, (config.gates?.driveGates || 0) - 1),
                    },
                  })
                }
                className="w-5 h-5 bg-[#1C241E] rounded border border-white/15 font-bold text-center hover:bg-white/10"
              >
                -
              </button>
              <span className="w-6 text-center font-bold text-[#E5B842]">
                {config.gates?.driveGates ?? 0}
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
                className="w-5 h-5 bg-[#1C241E] rounded border border-white/15 font-bold text-center hover:bg-white/10"
              >
                +
              </button>
            </div>
          </div>
        </div>

      </div>
    </aside>
  )
}
