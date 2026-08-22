'use client'

import React, { useState } from 'react'
import { FenceConfiguration, FenceStyleCategory } from '@/lib/pricing-engine'

interface SubFlipsPanelProps {
  config: FenceConfiguration;
  onChange: (updated: Partial<FenceConfiguration>) => void;
  onOpenGateModal?: () => void;
}

type TabType = '1-general' | '2-posts' | '3-rails' | '4-fill' | '5-stain' | '6-trim' | '7-hardware' | '8-gates';

export function SubFlipsPanel({ config, onChange, onOpenGateModal }: SubFlipsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('1-general')

  const tabs: Array<{ id: TabType; num: number; label: string; icon: string }> = [
    { id: '1-general', num: 1, label: 'General & Specs', icon: '📐' },
    { id: '2-posts', num: 2, label: 'Posts & Footings', icon: '🪵' },
    { id: '3-rails', num: 3, label: 'Rails & Frame', icon: '🛠️' },
    { id: '4-fill', num: 4, label: 'Fill Material', icon: '🌲' },
    { id: '5-stain', num: 5, label: 'Stain & Seal', icon: '🎨' },
    { id: '6-trim', num: 6, label: 'Trim & Facia', icon: '✨' },
    { id: '7-hardware', num: 7, label: 'Fasteners & Ties', icon: '🔩' },
    { id: '8-gates', num: 8, label: 'Gates & Access', icon: '🚪' },
  ]

  return (
    <div className="w-full bg-[#141B16] border-2 border-[#141B16] rounded-md overflow-hidden text-white flex flex-col shadow-xl">
      {/* 8-Metric Tabs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 border-b border-white/10 bg-[#111713] text-xs font-['Rowdies'] font-normal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-1.5 text-center flex flex-col items-center justify-center gap-0.5 transition border-r border-white/5 last:border-r-0 ${
              activeTab === tab.id
                ? 'bg-[#F27A22] text-white font-bold shadow-inner'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="text-[11px] leading-tight">#{tab.num} {tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Metric Panel Content */}
      <div className="p-4 bg-[#1C241E] min-h-[190px]">
        {/* METRIC 1: GENERAL & SPECS */}
        {activeTab === '1-general' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Metric #1 · Fence Height
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[4, 5, 6, 8].map((h) => (
                  <button
                    key={h}
                    onClick={() => onChange({ heightFt: h })}
                    className={`py-2 text-xs font-['Rowdies'] rounded border ${
                      config.heightFt === h
                        ? 'bg-[#E5B842] text-[#141B16] font-bold border-[#E5B842]'
                        : 'bg-[#111713] text-white/80 border-white/15 hover:border-white/40'
                    }`}
                  >
                    {h}&apos; FT
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Post Spacing (On Center)
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[6, 8].map((sp) => (
                  <button
                    key={sp}
                    onClick={() => onChange({ postSpacingFt: sp })}
                    className={`py-2 text-xs font-['Rowdies'] rounded border ${
                      config.postSpacingFt === sp
                        ? 'bg-[#E5B842] text-[#141B16] font-bold border-[#E5B842]'
                        : 'bg-[#111713] text-white/80 border-white/15 hover:border-white/40'
                    }`}
                  >
                    {sp}&apos; Standard
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Lumber Grade
              </label>
              <select
                value={config.woodGrade}
                onChange={(e) => onChange({ woodGrade: e.target.value as any })}
                className="w-full bg-[#111713] border border-white/20 text-white rounded p-2 text-xs font-['Rowdies'] focus:outline-none focus:border-[#E5B842]"
              >
                <option value="tight-knot">Tight Knot Western Red Cedar (Standard)</option>
                <option value="clear-cedar">Clear Architectural Cedar (Premium +$7.50/LF)</option>
                <option value="pressure-treated">Pressure Treated Pine (Economy)</option>
              </select>
            </div>
          </div>
        )}

        {/* METRIC 2: POSTS & FOOTINGS */}
        {activeTab === '2-posts' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Metric #2 · Structural Post
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '4x4-cedar', label: '4x4 WRC Cedar' },
                  { id: '4x6-cedar', label: '4x6 Heavy Wind' },
                  { id: '4x4-pt', label: '4x4 PT Ground' },
                  { id: 'postmaster-steel', label: 'PostMaster Steel' },
                ].map((post) => (
                  <button
                    key={post.id}
                    onClick={() => onChange({ postType: post.id as any })}
                    className={`py-2 px-2 text-xs font-['Rowdies'] rounded border text-left ${
                      config.postType === post.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15 hover:border-white/40'
                    }`}
                  >
                    {post.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Concrete Footing Depth
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[24, 30, 36].map((depth) => (
                  <button
                    key={depth}
                    onClick={() => onChange({ footingDepthInches: depth as any })}
                    className={`py-2 text-xs font-['Rowdies'] rounded border ${
                      (config.footingDepthInches || 30) === depth
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15'
                    }`}
                  >
                    {depth}&quot; Deep
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Post Top Cap
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Square Cut' },
                  { id: 'cedar-pyramid', label: 'Cedar Pyramid' },
                  { id: 'copper-pyramid', label: 'Copper Shield' },
                  { id: 'metal-black', label: 'Black Metal' },
                ].map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => onChange({ postCap: cap.id as any })}
                    className={`py-2 px-2 text-xs font-['Rowdies'] rounded border text-left ${
                      config.postCap === cap.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15'
                    }`}
                  >
                    {cap.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* METRIC 3: RAILS & FRAME */}
        {activeTab === '3-rails' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Metric #3 · Horizontal Rail Count (2x4s)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onChange({ railCount: 2 })}
                  className={`p-2.5 text-xs font-['Rowdies'] rounded border text-left ${
                    config.railCount === 2
                      ? 'bg-[#4ADE80] text-[#141B16] font-bold border-[#4ADE80]'
                      : 'bg-[#111713] text-white/80 border-white/15'
                  }`}
                >
                  <span className="block font-bold">2-Rail Standard</span>
                  <span className="text-[10px] opacity-75">For 4ft and 5ft fences</span>
                </button>
                <button
                  onClick={() => onChange({ railCount: 3 })}
                  className={`p-2.5 text-xs font-['Rowdies'] rounded border text-left ${
                    config.railCount === 3
                      ? 'bg-[#4ADE80] text-[#141B16] font-bold border-[#4ADE80]'
                      : 'bg-[#111713] text-white/80 border-white/15'
                  }`}
                >
                  <span className="block font-bold">3-Rail Reinforced</span>
                  <span className="text-[10px] opacity-75">Standard for 6ft / 8ft</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Top Cap Rail (2x4 / 2x6)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onChange({ topCap: false })}
                  className={`py-2 px-3 text-xs font-['Rowdies'] rounded border text-center ${
                    !config.topCap
                      ? 'bg-[#E5B842] text-[#141B16] font-bold border-[#E5B842]'
                      : 'bg-[#111713] text-white/80 border-white/15'
                  }`}
                >
                  No Top Cap
                </button>
                <button
                  onClick={() => onChange({ topCap: true })}
                  className={`py-2 px-3 text-xs font-['Rowdies'] rounded border text-center ${
                    config.topCap
                      ? 'bg-[#E5B842] text-[#141B16] font-bold border-[#E5B842]'
                      : 'bg-[#111713] text-white/80 border-white/15'
                  }`}
                >
                  + Top Cap 2x4 (+$2.25/LF)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* METRIC 4: FILL MATERIAL (DYNAMICALLY SWITCHES OPTION SET BY STYLE) */}
        {activeTab === '4-fill' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase">
                Metric #4 · Fill Material System (Selected Style: <span className="text-[#4ADE80] font-bold">{config.fenceStyleCategory?.toUpperCase() || 'VERTICAL PICKET'}</span>)
              </label>

              {/* Style Category Switcher */}
              <div className="flex gap-1 bg-[#111713] p-1 rounded border border-white/10 text-xs">
                {[
                  { id: 'vertical-picket', label: 'Vertical Picket' },
                  { id: 'horizontal-board', label: 'Horizontal Board' },
                  { id: 'fabric-wire', label: 'Fabric / Wire' },
                  { id: 'lattice-craftsman', label: 'Lattice Craftsman' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      const newCat = cat.id as FenceStyleCategory;
                      const defaultPattern =
                        newCat === 'vertical-picket' ? 'board-on-board' :
                        newCat === 'horizontal-board' ? 'horizontal-slat' :
                        newCat === 'fabric-wire' ? 'welded-wire-black' : 'square-lattice';
                      onChange({ fenceStyleCategory: newCat, fillPattern: defaultPattern });
                    }}
                    className={`px-2.5 py-1 rounded transition text-[11px] ${
                      (config.fenceStyleCategory || 'vertical-picket') === cat.id
                        ? 'bg-[#4ADE80] text-[#141B16] font-bold'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* DYNAMIC OPTION SET 4A: VERTICAL PICKETS */}
            {(config.fenceStyleCategory === 'vertical-picket' || !config.fenceStyleCategory) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'board-on-board', label: 'Board-on-Board', desc: '100% Privacy with 1.5" overlap (No shrinkage gaps)' },
                  { id: 'flat-top-privacy', label: 'Solid Flat Top', desc: 'Tight butted 1x6 Western Red Cedar' },
                  { id: 'dog-eared', label: 'Classic Dog-Eared', desc: 'Beveled top corners for traditional shadow' },
                  { id: 'shadowbox', label: 'Alternating Shadowbox', desc: 'Semi-privacy with Pacific Northwest airflow' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ fillPattern: opt.id })}
                    className={`p-3 rounded border text-left flex flex-col justify-between transition ${
                      config.fillPattern === opt.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22] shadow-lg'
                        : 'bg-[#111713] text-white/80 border-white/15 hover:border-white/40'
                    }`}
                  >
                    <span className="block font-bold text-xs">{opt.label}</span>
                    <span className="block text-[10px] opacity-75 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* DYNAMIC OPTION SET 4B: HORIZONTAL BOARDS */}
            {config.fenceStyleCategory === 'horizontal-board' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'horizontal-slat', label: '1x6 Modern Horizontal Siding', desc: 'Clean contemporary tongue-and-groove or shiplap' },
                  { id: 'narrow-slat-1x4', label: '1x4 Narrow Slat Siding', desc: 'Architectural modern high-density slat facade' },
                  { id: 'alternating-1x4-1x6', label: 'Alternating 1x4 / 1x6 Pattern', desc: 'Custom variable rhythm modern cedar wall' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ fillPattern: opt.id })}
                    className={`p-3 rounded border text-left flex flex-col justify-between transition ${
                      config.fillPattern === opt.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15 hover:border-white/40'
                    }`}
                  >
                    <span className="block font-bold text-xs">{opt.label}</span>
                    <span className="block text-[10px] opacity-75 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* DYNAMIC OPTION SET 4C: FABRIC & WELDED WIRE */}
            {config.fenceStyleCategory === 'fabric-wire' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'welded-wire-black', label: 'Black Vinyl Welded Wire (2"x4")', desc: 'Invisible perimeter containment with cedar framing' },
                  { id: 'hog-wire-galv', label: '6-Gauge Heavy Hog Wire Grid', desc: 'Modern farmhouse view-preservation panel' },
                  { id: 'hardware-cloth', label: '1/2" Anti-Rodent Wire Mesh', desc: 'Garden and critter protective barrier' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ fillPattern: opt.id })}
                    className={`p-3 rounded border text-left flex flex-col justify-between transition ${
                      config.fillPattern === opt.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15'
                    }`}
                  >
                    <span className="block font-bold text-xs">{opt.label}</span>
                    <span className="block text-[10px] opacity-75 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            )}

            {/* DYNAMIC OPTION SET 4D: LATTICE & CRAFTSMAN */}
            {config.fenceStyleCategory === 'lattice-craftsman' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'square-lattice', label: 'Square Craftsman Lattice Panel', desc: 'Modern geometric privacy grid' },
                  { id: 'diagonal-lattice', label: 'Classic Diagonal Diamond Lattice', desc: 'Traditional cottage garden pattern' },
                  { id: 'horizontal-top-lattice', label: 'Solid Base with Top Lattice Accent', desc: '5ft Solid Privacy + 1ft Lattice Topper' },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => onChange({ fillPattern: opt.id })}
                    className={`p-3 rounded border text-left flex flex-col justify-between transition ${
                      config.fillPattern === opt.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15'
                    }`}
                  >
                    <span className="block font-bold text-xs">{opt.label}</span>
                    <span className="block text-[10px] opacity-75 mt-1">{opt.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* METRIC 5: STAIN & SEAL */}
        {activeTab === '5-stain' && (
          <div>
            <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-2">
              Metric #5 · Factory Pre-Stain &amp; UV Sealant
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { id: 'none', label: 'Unfinished / Raw', color: '#D8C3A5' },
                { id: 'clear-seal', label: 'Clear Seal', color: '#C9A982' },
                { id: 'cedar-natural', label: 'Cedar Natural', color: '#B87B44' },
                { id: 'chestnut-brown', label: 'Chestnut Brown', color: '#784626' },
                { id: 'redwood', label: 'Redwood Rich', color: '#8E3826' },
                { id: 'dark-walnut', label: 'Dark Walnut', color: '#42281D' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => onChange({ stainType: st.id as any })}
                  className={`p-2 rounded border text-center flex flex-col items-center gap-1.5 transition ${
                    config.stainType === st.id
                      ? 'border-[#4ADE80] bg-[#111713] ring-2 ring-[#4ADE80]'
                      : 'border-white/10 bg-[#111713] hover:border-white/30'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full border border-black/40 shadow-inner" style={{ backgroundColor: st.color }} />
                  <span className="text-[11px] font-['Rowdies'] font-normal leading-tight text-white/90">{st.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* METRIC 6: TRIM & FACIA */}
        {activeTab === '6-trim' && (
          <div>
            <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
              Metric #6 · Trim &amp; Rot Protection
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'Clean Edge (No Trim)', desc: 'Standard exposed picket ends' },
                { id: 'picture-frame-trim', label: '1x4 Face Trim (Top/Bottom)', desc: 'Framed architectural picture-frame look' },
                { id: 'kickboard-2x6', label: '2x6 PT Rot Kickboard', desc: 'Prevents ground moisture contact' },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => onChange({ trimStyle: t.id as any })}
                  className={`p-2.5 rounded border text-left ${
                    config.trimStyle === t.id
                      ? 'bg-[#E5B842] text-[#141B16] font-bold border-[#E5B842]'
                      : 'bg-[#111713] text-white/80 border-white/15'
                  }`}
                >
                  <span className="block font-bold text-xs">{t.label}</span>
                  <span className="block text-[10px] opacity-75">{t.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* METRIC 7: HARDWARE & FASTENERS */}
        {activeTab === '7-hardware' && (
          <div>
            <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
              Metric #7 · Fasteners &amp; Structural Ties
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'galvanized', label: 'Hot-Dipped Galvanized', desc: 'Standard building code' },
                { id: 'black-powder', label: 'Black Powder Simpson Ties', desc: 'Architectural black accents' },
                { id: 'stainless-steel', label: '316 Marine Stainless Steel', desc: 'Max anti-rust longevity' },
              ].map((hw) => (
                <button
                  key={hw.id}
                  onClick={() => onChange({ hardwareTier: hw.id as any })}
                  className={`p-2.5 rounded border text-left ${
                    config.hardwareTier === hw.id
                      ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                      : 'bg-[#111713] text-white/80 border-white/15'
                  }`}
                >
                  <span className="block font-bold text-xs">{hw.label}</span>
                  <span className="block text-[10px] opacity-75">{hw.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* METRIC 8: GATES & ACCESS */}
        {activeTab === '8-gates' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase">
                Metric #8 · Gates &amp; Access Openings
              </label>
              {onOpenGateModal && (
                <button
                  onClick={onOpenGateModal}
                  className="bg-[#E5B842] text-[#141B16] font-bold text-xs px-3 py-1 rounded"
                >
                  Open Dedicated Gate Studio →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#111713] p-3 rounded border border-white/10 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-sm text-white">4ft Pedestrian Walk Gate</span>
                  <span className="text-[11px] text-white/60">T-Hinges, self-latch &amp; anti-sag brace ($385 ea)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onChange({ gates: { ...config.gates, walkGates: Math.max(0, (config.gates?.walkGates || 0) - 1) } })}
                    className="w-7 h-7 bg-[#1C241E] text-white rounded font-bold hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-bold text-[#4ADE80]">{config.gates?.walkGates || 0}</span>
                  <button
                    onClick={() => onChange({ gates: { ...config.gates, walkGates: (config.gates?.walkGates || 0) + 1 } })}
                    className="w-7 h-7 bg-[#1C241E] text-white rounded font-bold hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="bg-[#111713] p-3 rounded border border-white/10 flex items-center justify-between">
                <div>
                  <span className="block font-bold text-sm text-white">10ft-12ft Double Drive Gate</span>
                  <span className="text-[11px] text-white/60">6x6 posts, drop-rod &amp; heavy hardware ($850 ea)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onChange({ gates: { ...config.gates, driveGates: Math.max(0, (config.gates?.driveGates || 0) - 1) } })}
                    className="w-7 h-7 bg-[#1C241E] text-white rounded font-bold hover:bg-white/10"
                  >
                    -
                  </button>
                  <span className="w-5 text-center font-bold text-[#4ADE80]">{config.gates?.driveGates || 0}</span>
                  <button
                    onClick={() => onChange({ gates: { ...config.gates, driveGates: (config.gates?.driveGates || 0) + 1 } })}
                    className="w-7 h-7 bg-[#1C241E] text-white rounded font-bold hover:bg-white/10"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
