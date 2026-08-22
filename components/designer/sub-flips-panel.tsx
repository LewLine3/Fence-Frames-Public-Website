'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface SubFlipsPanelProps {
  config: FenceConfiguration;
  onChange: (updated: Partial<FenceConfiguration>) => void;
}

type TabType = 'general' | 'posts' | 'rails' | 'pickets' | 'stain' | 'trim' | 'hardware';

export function SubFlipsPanel({ config, onChange }: SubFlipsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('general')

  const tabs: Array<{ id: TabType; label: string; icon: string }> = [
    { id: 'general', label: '1. General', icon: '📐' },
    { id: 'posts', label: '2. Posts & Caps', icon: '🪵' },
    { id: 'rails', label: '3. Rails & Frame', icon: '🛠️' },
    { id: 'pickets', label: '4. Pickets & Face', icon: '🌲' },
    { id: 'stain', label: '5. Stain & Finish', icon: '🎨' },
    { id: 'trim', label: '6. Trim & Facia', icon: '✨' },
    { id: 'hardware', label: '7. Hardware', icon: '🔩' },
  ]

  return (
    <div className="w-full bg-[#141B16] border-2 border-[#141B16] rounded-md overflow-hidden text-white flex flex-col shadow-xl">
      {/* Sub-Flip Tabs Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 border-b border-white/10 bg-[#111713] text-xs font-['Rowdies'] font-normal">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2.5 px-2 text-center flex items-center justify-center gap-1 transition border-r border-white/5 last:border-r-0 ${
              activeTab === tab.id
                ? 'bg-[#F27A22] text-white font-bold shadow-inner'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Panel Content */}
      <div className="p-4 bg-[#1C241E] min-h-[190px]">
        {/* 1. GENERAL TAB */}
        {activeTab === 'general' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Fence Height
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
                Post-to-Post Spacing
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
                <option value="clear-cedar">Clear Architectural Cedar (Premium +$8.50/LF)</option>
                <option value="pressure-treated">Pressure Treated Pine (Economy)</option>
              </select>
            </div>
          </div>
        )}

        {/* 2. POSTS & CAPS TAB */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Structural Post Size
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
                Decorative Post Cap
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Square Cut / None' },
                  { id: 'cedar-pyramid', label: 'Cedar Pyramid' },
                  { id: 'copper-pyramid', label: 'Copper Shield' },
                  { id: 'metal-black', label: 'Black Powder Metal' },
                ].map((cap) => (
                  <button
                    key={cap.id}
                    onClick={() => onChange({ postCap: cap.id as any })}
                    className={`py-2 px-2 text-xs font-['Rowdies'] rounded border text-left ${
                      config.postCap === cap.id
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15 hover:border-white/40'
                    }`}
                  >
                    {cap.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3. RAILS & FRAME TAB */}
        {activeTab === 'rails' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Horizontal Rail Count (2x4s)
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

        {/* 4. PICKETS & FACE TAB */}
        {activeTab === 'pickets' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Picket Cut &amp; Top Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['flat-top', 'dog-eared', 'gothic'].map((st) => (
                  <button
                    key={st}
                    onClick={() => onChange({ fenceStyle: st })}
                    className={`py-2 px-2 text-xs font-['Rowdies'] rounded border capitalize text-center ${
                      config.fenceStyle === st
                        ? 'bg-[#F27A22] text-white font-bold border-[#F27A22]'
                        : 'bg-[#111713] text-white/80 border-white/15'
                    }`}
                  >
                    {st.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
                Face Layup / Pattern
              </label>
              <select
                value={config.fenceType}
                onChange={(e) => onChange({ fenceType: e.target.value as any })}
                className="w-full bg-[#111713] border border-white/20 text-white rounded p-2 text-xs font-['Rowdies'] focus:outline-none focus:border-[#F27A22]"
              >
                <option value="vertical">Solid Vertical Privacy (1x6 Tight Butted)</option>
                <option value="picture-frame">Picture Frame Heritage (Trimmed)</option>
                <option value="horizontal">Horizontal Board / Modern Shadowbox</option>
              </select>
            </div>
          </div>
        )}

        {/* 5. STAIN & FINISH TAB */}
        {activeTab === 'stain' && (
          <div>
            <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-2">
              Factory Pre-Stain &amp; UV Sealant (Adds 7+ Years Lifespan)
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

        {/* 6. TRIM & FACIA TAB */}
        {activeTab === 'trim' && (
          <div>
            <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
              Trim &amp; Base Protection
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: 'none', label: 'Clean Edge (No Trim)', desc: 'Standard exposed picket ends' },
                { id: 'picture-frame-trim', label: '1x4 Face Trim (Top/Bottom)', desc: 'Framed architectural look' },
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

        {/* 7. HARDWARE TAB */}
        {activeTab === 'hardware' && (
          <div>
            <label className="block text-xs font-['Rowdies'] font-normal text-[#E5B842] uppercase mb-1.5">
              Fastener &amp; Bracket Tier
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
      </div>
    </div>
  )
}
