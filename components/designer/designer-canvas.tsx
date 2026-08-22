'use client'

import React, { useState } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface DesignerCanvasProps {
  config: FenceConfiguration;
}

export function DesignerCanvas({ config }: DesignerCanvasProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [viewAngle, setViewAngle] = useState<'both' | 'front' | 'back'>('both')

  // Color mapping based on stain selection
  const getWoodFill = () => {
    switch (config.stainType) {
      case 'clear-seal': return '#C9A982';
      case 'cedar-natural': return '#B87B44';
      case 'chestnut-brown': return '#784626';
      case 'redwood': return '#8E3826';
      case 'dark-walnut': return '#42281D';
      default: return '#D8C3A5'; // Natural / Unfinished
    }
  }

  const getPostCapFill = () => {
    switch (config.postCap) {
      case 'copper-pyramid': return '#C87548';
      case 'metal-black': return '#1F2421';
      case 'solar-led': return '#334155';
      default: return getWoodFill();
    }
  }

  // Picket spacing & rendering math
  const picketCount = 16;
  const postSpacingPx = 360;
  const fenceHeightPx = config.heightFt * 40; // 4ft -> 160px, 6ft -> 240px, 8ft -> 320px
  const groundY = 380;
  const fenceTopY = groundY - fenceHeightPx;

  return (
    <div className="relative w-full bg-[#18201B] border-2 border-[#141B16] rounded-md overflow-hidden flex flex-col items-center justify-between p-4 shadow-2xl">
      {/* Top Canvas Toolbar */}
      <div className="w-full flex items-center justify-between z-10 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-['Rowdies'] font-bold text-xs uppercase px-2.5 py-1 bg-[#E5B842] text-[#141B16] rounded">
            2D CAD Drafting Board
          </span>
          <span className="text-xs text-white/70 font-['Rowdies'] font-light">
            Scale: 1/2&quot; = 1&apos;-0&quot; · Dual Front &amp; Back Submittal Elevation
          </span>
        </div>

        {/* View Toggle & Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex bg-[#111713] p-0.5 rounded border border-white/15 text-xs font-['Rowdies'] font-normal">
            <button
              onClick={() => setViewAngle('both')}
              className={`px-2.5 py-1 rounded transition ${viewAngle === 'both' ? 'bg-[#F27A22] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Dual View
            </button>
            <button
              onClick={() => setViewAngle('front')}
              className={`px-2.5 py-1 rounded transition ${viewAngle === 'front' ? 'bg-[#F27A22] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Front
            </button>
            <button
              onClick={() => setViewAngle('back')}
              className={`px-2.5 py-1 rounded transition ${viewAngle === 'back' ? 'bg-[#F27A22] text-white' : 'text-white/60 hover:text-white'}`}
            >
              Framing (Back)
            </button>
          </div>

          <div className="flex items-center bg-[#111713] border border-white/15 rounded p-0.5 text-xs text-white font-['Rowdies'] font-bold">
            <button onClick={() => setZoomLevel(Math.max(0.6, zoomLevel - 0.15))} className="px-2 py-0.5 hover:bg-white/10 rounded">-</button>
            <span className="px-1.5 text-white/70">{Math.round(zoomLevel * 100)}%</span>
            <button onClick={() => setZoomLevel(Math.min(1.8, zoomLevel + 0.15))} className="px-2 py-0.5 hover:bg-white/10 rounded">+</button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="w-full flex-1 flex items-center justify-center overflow-x-auto py-8 min-h-[420px]">
        <div style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.15s ease' }}>
          <svg width="860" height="440" viewBox="0 0 860 440" className="drop-shadow-2xl">
            {/* Background Grid & Drafting Markers */}
            <defs>
              <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              </pattern>
              <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16432D" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="860" height="440" fill="#141B16" />
            <rect x="0" y="0" width="860" height="440" fill="url(#cadGrid)" />

            {/* Left Height Dimension Ruler (0' to 8') */}
            <g className="font-['Rowdies'] text-[10px] fill-white/50">
              <line x1="45" y1={groundY} x2="45" y2={groundY - 320} stroke="#E5B842" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="35" y={groundY + 4} textAnchor="end">0&apos;</text>
              <text x="35" y={groundY - 80 + 4} textAnchor="end">2&apos;</text>
              <text x="35" y={groundY - 160 + 4} textAnchor="end">4&apos;</text>
              <text x="35" y={groundY - 240 + 4} textAnchor="end">6&apos;</text>
              <text x="35" y={groundY - 320 + 4} textAnchor="end">8&apos;</text>
              
              {/* Target Height Indicator */}
              <rect x="15" y={fenceTopY - 10} width="45" height="18" fill="#E5B842" rx="3" />
              <text x="37" y={fenceTopY + 3} fill="#141B16" fontWeight="bold" textAnchor="middle">{config.heightFt}&apos;-0&quot;</text>
            </g>

            {/* Ground / Turf Line */}
            <line x1="50" y1={groundY} x2="820" y2={groundY} stroke="#4ADE80" strokeWidth="3" />
            <rect x="50" y={groundY} width="770" height="35" fill="url(#grassGrad)" opacity="0.3" />

            {/* ================================================================= */}
            {/* FRONT ELEVATION (LEFT RUN) */}
            {/* ================================================================= */}
            {(viewAngle === 'both' || viewAngle === 'front') && (
              <g transform={viewAngle === 'both' ? 'translate(80, 0)' : 'translate(250, 0)'}>
                <text x="180" y="45" fill="#E5B842" className="font-['Rowdies'] font-bold text-xs uppercase" textAnchor="middle">
                  FRONT ELEVATION (Street / Neighbor Face)
                </text>

                {/* Posts (Left, Right) */}
                <rect x="0" y={fenceTopY - 15} width="22" height={fenceHeightPx + 15} fill={config.woodGrade === 'clear-cedar' ? '#C29B72' : '#A07850'} stroke="#141B16" strokeWidth="1.5" rx="1" />
                <rect x={postSpacingPx} y={fenceTopY - 15} width="22" height={fenceHeightPx + 15} fill={config.woodGrade === 'clear-cedar' ? '#C29B72' : '#A07850'} stroke="#141B16" strokeWidth="1.5" rx="1" />

                {/* Post Caps */}
                {config.postCap !== 'none' && (
                  <>
                    <polygon points={`-2,${fenceTopY - 15} 11,${fenceTopY - 27} 24,${fenceTopY - 15}`} fill={getPostCapFill()} stroke="#141B16" strokeWidth="1.5" />
                    <polygon points={`${postSpacingPx - 2},${fenceTopY - 15} ${postSpacingPx + 11},${fenceTopY - 27} ${postSpacingPx + 24},${fenceTopY - 15}`} fill={getPostCapFill()} stroke="#141B16" strokeWidth="1.5" />
                  </>
                )}

                {/* Bottom Kickboard if selected */}
                {config.trimStyle === 'kickboard-2x6' && (
                  <rect x="22" y={groundY - 24} width={postSpacingPx - 22} height="22" fill="#5C3A21" stroke="#141B16" strokeWidth="1.5" />
                )}

                {/* Pickets Run */}
                {Array.from({ length: picketCount }).map((_, i) => {
                  const picketW = (postSpacingPx - 26) / picketCount;
                  const px = 24 + i * picketW;
                  return (
                    <g key={`picket-front-${i}`}>
                      <rect
                        x={px}
                        y={fenceTopY}
                        width={picketW - 1.5}
                        height={fenceHeightPx - (config.trimStyle === 'kickboard-2x6' ? 24 : 0)}
                        fill={getWoodFill()}
                        stroke="#141B16"
                        strokeWidth="1.2"
                      />
                      {/* Wood grain micro lines */}
                      <line x1={px + picketW * 0.4} y1={fenceTopY + 10} x2={px + picketW * 0.4} y2={groundY - 10} stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
                    </g>
                  );
                })}

                {/* Top Cap Rail if selected */}
                {config.topCap && (
                  <rect x="-4" y={fenceTopY - 8} width={postSpacingPx + 30} height="9" fill="#8C5832" stroke="#141B16" strokeWidth="1.5" rx="1" />
                )}

                {/* Picture Frame Top/Bottom Trim if selected */}
                {config.trimStyle === 'picture-frame-trim' && (
                  <>
                    <rect x="22" y={fenceTopY} width={postSpacingPx - 22} height="12" fill="#5C3A21" stroke="#141B16" strokeWidth="1.2" />
                    <rect x="22" y={groundY - 14} width={postSpacingPx - 22} height="12" fill="#5C3A21" stroke="#141B16" strokeWidth="1.2" />
                  </>
                )}
              </g>
            )}

            {/* ================================================================= */}
            {/* BACK ELEVATION (RIGHT RUN — FRAMING & RAILS) */}
            {/* ================================================================= */}
            {(viewAngle === 'both' || viewAngle === 'back') && (
              <g transform={viewAngle === 'both' ? 'translate(480, 0)' : 'translate(250, 0)'}>
                <text x="180" y="45" fill="#4ADE80" className="font-['Rowdies'] font-bold text-xs uppercase" textAnchor="middle">
                  BACK ELEVATION (Internal Framing &amp; Rails)
                </text>

                {/* Back Pickets Layer (faint background) */}
                <rect x="24" y={fenceTopY} width={postSpacingPx - 26} height={fenceHeightPx} fill={getWoodFill()} opacity="0.85" />

                {/* Posts (Left, Right) */}
                <rect x="0" y={fenceTopY - 15} width="22" height={fenceHeightPx + 15} fill={config.woodGrade === 'clear-cedar' ? '#C29B72' : '#A07850'} stroke="#141B16" strokeWidth="1.5" rx="1" />
                <rect x={postSpacingPx} y={fenceTopY - 15} width="22" height={fenceHeightPx + 15} fill={config.woodGrade === 'clear-cedar' ? '#C29B72' : '#A07850'} stroke="#141B16" strokeWidth="1.5" rx="1" />

                {/* Horizontal 2x4 3-Rail System */}
                {/* Top Rail */}
                <rect x="18" y={fenceTopY + 20} width={postSpacingPx - 14} height="16" fill="#8C5832" stroke="#141B16" strokeWidth="1.5" rx="1" />
                {/* Mid Rail */}
                {config.railCount >= 3 && (
                  <rect x="18" y={fenceTopY + (fenceHeightPx / 2) - 8} width={postSpacingPx - 14} height="16" fill="#8C5832" stroke="#141B16" strokeWidth="1.5" rx="1" />
                )}
                {/* Bottom Rail */}
                <rect x="18" y={groundY - 36} width={postSpacingPx - 14} height="16" fill="#8C5832" stroke="#141B16" strokeWidth="1.5" rx="1" />

                {/* Simpson Brackets / Ties */}
                {config.hardwareTier !== 'galvanized' && (
                  <>
                    <rect x="18" y={fenceTopY + 20} width="6" height="16" fill="#141B16" />
                    <rect x={postSpacingPx - 2} y={fenceTopY + 20} width="6" height="16" fill="#141B16" />
                    <rect x="18" y={groundY - 36} width="6" height="16" fill="#141B16" />
                    <rect x={postSpacingPx - 2} y={groundY - 36} width="6" height="16" fill="#141B16" />
                  </>
                )}

                {/* Top Cap */}
                {config.topCap && (
                  <rect x="-4" y={fenceTopY - 8} width={postSpacingPx + 30} height="9" fill="#8C5832" stroke="#141B16" strokeWidth="1.5" rx="1" />
                )}
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Live Spec Readout Badge Strip */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-2 pt-3 border-t border-white/10 text-center font-['Rowdies'] text-xs">
        <div className="bg-[#111713] py-1.5 px-3 rounded border border-white/10">
          <span className="text-white/60 block text-[10px] uppercase">Height &amp; Spacing</span>
          <span className="text-[#E5B842] font-bold">{config.heightFt}&apos; Tall · {config.postSpacingFt}&apos; Posts</span>
        </div>
        <div className="bg-[#111713] py-1.5 px-3 rounded border border-white/10">
          <span className="text-white/60 block text-[10px] uppercase">Lumber Grade</span>
          <span className="text-[#4ADE80] font-bold">{config.woodGrade.replace('-', ' ').toUpperCase()}</span>
        </div>
        <div className="bg-[#111713] py-1.5 px-3 rounded border border-white/10">
          <span className="text-white/60 block text-[10px] uppercase">Framing System</span>
          <span className="text-white font-bold">{config.railCount}-Rail · {config.topCap ? 'Top Cap' : 'Standard'}</span>
        </div>
        <div className="bg-[#111713] py-1.5 px-3 rounded border border-white/10">
          <span className="text-white/60 block text-[10px] uppercase">Finish &amp; Stain</span>
          <span className="text-[#F27A22] font-bold">{config.stainType.replace('-', ' ').toUpperCase()}</span>
        </div>
      </div>
    </div>
  )
}
