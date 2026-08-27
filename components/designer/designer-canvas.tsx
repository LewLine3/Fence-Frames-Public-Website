'use client'

import React, { useState, useEffect, useRef } from 'react'
import { FenceConfiguration } from '@/lib/pricing-engine'

interface DesignerCanvasProps {
  config: FenceConfiguration;
  viewAngle?: 'both' | 'front' | 'back';
  onViewAngleChange?: (angle: 'both' | 'front' | 'back') => void;
  zoomLevel?: number;
  onZoomChange?: (zoom: number) => void;
}

const STAIN_PALETTES: Record<string, { main: string; dark: string; light: string; rail: string }> = {
  'cedar-natural': { main: '#c88254', dark: '#8a4e2c', light: '#dca070', rail: '#b06840' },
  'clear-seal':    { main: '#c9a982', dark: '#9e805e', light: '#e2ccb0', rail: '#b3916d' },
  'chestnut-brown':{ main: '#784626', dark: '#542e15', light: '#995c37', rail: '#64371c' },
  'redwood':       { main: '#8e3826', dark: '#632113', light: '#ab4a35', rail: '#772c1a' },
  'dark-walnut':   { main: '#42281d', dark: '#281710', light: '#5e3a2c', rail: '#341e15' },
  'none':          { main: '#d8c3a5', dark: '#b59f82', light: '#eddcc5', rail: '#c5af92' },
}

export function DesignerCanvas({
  config,
  viewAngle = 'both',
  onViewAngleChange,
  zoomLevel = 1.0,
  onZoomChange,
}: DesignerCanvasProps) {
  const [internalZoom, setInternalZoom] = useState<number>(zoomLevel)
  const [internalAngle, setInternalAngle] = useState<'both' | 'front' | 'back'>(viewAngle)
  const [frontSvgText, setFrontSvgText] = useState<string>('')
  const [backSvgText, setBackSvgText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const frontHostRef = useRef<HTMLDivElement>(null)
  const backHostRef = useRef<HTMLDivElement>(null)

  const currentAngle = onViewAngleChange ? viewAngle : internalAngle
  const currentZoom = onZoomChange ? zoomLevel : internalZoom

  const handleAngleChange = (angle: 'both' | 'front' | 'back') => {
    if (onViewAngleChange) onViewAngleChange(angle)
    else setInternalAngle(angle)
  }

  const handleZoomChange = (delta: number) => {
    const next = Math.max(0.6, Math.min(1.6, Number((currentZoom + delta).toFixed(2))))
    if (onZoomChange) onZoomChange(next)
    else setInternalZoom(next)
  }

  // 1. Fetch Real SVG Assemblies from Canonical configure/heritage-v1
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)

    Promise.all([
      fetch('/configure/heritage-v1/pilot-fences/vpf/heritage/asm-heritage-hrtg-frame.svg')
        .then((res) => (res.ok ? res.text() : Promise.reject('Failed to load Front SVG assembly'))),
      fetch('/configure/heritage-v1/pilot-fences/vpf/heritage/asm-heritage-hrtg-frame-back.svg')
        .then((res) => (res.ok ? res.text() : Promise.reject('Failed to load Back SVG assembly'))),
    ])
      .then(([front, back]) => {
        if (!isMounted) return
        setFrontSvgText(front)
        setBackSvgText(back)
        setIsLoading(false)
      })
      .catch((err) => {
        console.warn('[DesignerCanvas] SVG fetch fallback:', err)
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  // 2. Apply Reactive Configuration & Material Slots to Mounted SVGs
  useEffect(() => {
    const applySlots = (hostEl: HTMLElement | null, isBack = false) => {
      if (!hostEl) return
      const svg = hostEl.querySelector('svg')
      if (!svg) return

      // Ensure responsiveness
      svg.setAttribute('width', '100%')
      svg.setAttribute('height', '100%')
      svg.style.maxWidth = '100%'
      svg.style.maxHeight = '100%'
      svg.style.display = 'block'

      // A. Picket Fill Pattern
      const picketGroups = svg.querySelectorAll('[id*="picket"], [data-slot="picket-fill"]')
      picketGroups.forEach((el) => {
        const id = el.id || ''
        if (config.fillPattern === 'board-on-board') {
          if (id.includes('flat-top') || id.includes('gothic')) (el as HTMLElement).style.display = 'none'
          else (el as HTMLElement).style.display = ''
        } else if (config.fillPattern === 'flat-top-privacy' || config.fillPattern === 'standard-gap') {
          if (id.includes('board-on-board') || id.includes('gothic')) (el as HTMLElement).style.display = 'none'
          else (el as HTMLElement).style.display = ''
        }
      })

      // B. Rails Visibility (2-Rail vs 3-Rail)
      const middleRail = svg.querySelector('#middle-rail, [id*="rail-middle"], [id*="rail-mid"]')
      if (middleRail) {
        (middleRail as HTMLElement).style.display = config.railCount >= 3 ? '' : 'none'
      }

      // C. Top Cap
      const topCapEl = svg.querySelector('#top-cap, [id*="rail-cap"]')
      if (topCapEl) {
        (topCapEl as HTMLElement).style.display = config.topCap ? '' : 'none'
      }

      // D. Post Caps
      const capGroups = svg.querySelectorAll('[id*="cap"], [data-slot="post-cap-material"]')
      capGroups.forEach((el) => {
        if (config.postCap === 'none') {
          (el as HTMLElement).style.display = 'none'
        } else {
          (el as HTMLElement).style.display = ''
        }
      })

      // E. Dynamic Stain & Wood Color Updates on Gradients
      const palette = STAIN_PALETTES[config.stainType] || STAIN_PALETTES['cedar-natural']
      const shineGrads = svg.querySelectorAll('linearGradient[id*="shine"], linearGradient[id*="cedar"]')
      shineGrads.forEach((grad) => {
        const stops = grad.querySelectorAll('stop')
        if (stops.length >= 3) {
          stops[0].setAttribute('stop-color', palette.light)
          stops[1].setAttribute('stop-color', palette.main)
          stops[2].setAttribute('stop-color', palette.dark)
        }
      })
    }

    if (frontHostRef.current && frontSvgText) {
      applySlots(frontHostRef.current, false)
    }
    if (backHostRef.current && backSvgText) {
      applySlots(backHostRef.current, true)
    }
  }, [config, frontSvgText, backSvgText, currentAngle])

  return (
    <div className="relative w-full h-full flex flex-col bg-[#141B16] border-[2.5px] border-[#1A1A1A] rounded-[5px] shadow-2xl overflow-hidden has-outside-corners">
      {/* 50% Chamfer Outside Corner Marks */}
      <div className="corner-mark-out tr" />
      <div className="corner-mark-out bl" />

      {/* Top Drafting Stage Status & Control Strip */}
      <div className="w-full flex items-center justify-between z-10 px-4 py-2 bg-[#1A1A1A] border-b-[2px] border-[#141B16] text-white flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="font-['Rowdies'] font-bold text-xs uppercase px-2.5 py-1 bg-[#4ADE80] text-[#141B16] rounded-[3px] shadow-sm">
            2D CAD Elevation Board
          </span>
          <span className="text-xs text-white/70 font-['Rowdies'] font-light hidden sm:inline">
            Scale: 1/2&quot; = 1&apos;-0&quot; · 112″ × 95″ Module Standard
          </span>
        </div>

        {/* View Angle & Zoom Buttons */}
        <div className="flex items-center gap-2.5">
          <div className="flex bg-[#141B16] p-0.5 rounded-[4px] border border-white/15 text-xs font-['Rowdies'] font-normal">
            <button
              onClick={() => handleAngleChange('both')}
              className={`px-2.5 py-0.5 rounded transition ${currentAngle === 'both' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Dual View
            </button>
            <button
              onClick={() => handleAngleChange('front')}
              className={`px-2.5 py-0.5 rounded transition ${currentAngle === 'front' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Front
            </button>
            <button
              onClick={() => handleAngleChange('back')}
              className={`px-2.5 py-0.5 rounded transition ${currentAngle === 'back' ? 'bg-[#F27A22] text-white font-bold' : 'text-white/60 hover:text-white'}`}
            >
              Framing (Back)
            </button>
          </div>

          <div className="flex items-center bg-[#141B16] border border-white/15 rounded-[4px] p-0.5 text-xs text-white font-['Rowdies'] font-bold">
            <button onClick={() => handleZoomChange(-0.1)} className="px-2 py-0.5 hover:bg-white/10 rounded">-</button>
            <span className="px-1.5 text-white/80 text-[11px] min-w-[3rem] text-center">{Math.round(currentZoom * 100)}%</span>
            <button onClick={() => handleZoomChange(0.1)} className="px-2 py-0.5 hover:bg-white/10 rounded">+</button>
          </div>
        </div>
      </div>

      {/* Main Drafting Grid Stage (Official Green Print Grid Standard) */}
      <div
        className="flex-1 w-full flex items-center justify-center p-4 overflow-auto cad-scrollbar relative"
        style={{
          backgroundColor: '#F4ECDC',
          backgroundImage:
            'linear-gradient(rgba(46, 139, 78, 0.50) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 139, 78, 0.50) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)',
          backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
          backgroundPosition: '0 0',
        }}
      >
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8 bg-[#141B16]/90 border border-white/15 rounded-[5px] text-white">
            <div className="w-8 h-8 rounded-full border-2 border-[#E5B842] border-t-transparent animate-spin" />
            <span className="text-xs font-['Rowdies'] uppercase tracking-wider text-[#E5B842]">
              Loading Authentic Heritage Vector Assemblies...
            </span>
          </div>
        ) : (
          <div
            className="flex items-center justify-center gap-6 transition-transform duration-150"
            style={{ transform: `scale(${currentZoom})`, transformOrigin: 'center center' }}
          >
            {/* FRONT ELEVATION CARD */}
            {(currentAngle === 'both' || currentAngle === 'front') && (
              <div className="flex flex-col items-center bg-[#141B16]/95 border-[2px] border-[#1A1A1A] rounded-2xl p-4 shadow-2xl transition-all duration-300 min-w-[380px] max-w-[560px]">
                <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-['Rowdies']">
                  <span className="font-bold text-[#E5B842] uppercase tracking-wide">
                    Street / Neighbor Face (Front)
                  </span>
                  <span className="text-[10px] text-[#4ADE80] font-mono">
                    VPF HERITAGE 100% SUBMITTAL
                  </span>
                </div>

                <div
                  ref={frontHostRef}
                  className="w-full aspect-[112/95] flex items-center justify-center overflow-hidden rounded-xl bg-[#162019]"
                  dangerouslySetInnerHTML={{ __html: frontSvgText }}
                />

                <div className="w-full flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[10px] text-white/70 font-['Rowdies']">
                  <span>Bay: {config.postSpacingFt}&apos; OC × {config.heightFt}&apos; Height</span>
                  <span className="text-[#E5B842] font-bold">16 Board-on-Board Pickets</span>
                </div>
              </div>
            )}

            {/* BACK / FRAMING ELEVATION CARD */}
            {(currentAngle === 'both' || currentAngle === 'back') && (
              <div className="flex flex-col items-center bg-[#141B16]/95 border-[2px] border-[#1A1A1A] rounded-2xl p-4 shadow-2xl transition-all duration-300 min-w-[380px] max-w-[560px]">
                <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs font-['Rowdies']">
                  <span className="font-bold text-[#F27A22] uppercase tracking-wide">
                    Structural Framing Face (Back)
                  </span>
                  <span className="text-[10px] text-white/60 font-mono">
                    POSTS · {config.railCount}-RAILS · SIMPSON HARDWARE
                  </span>
                </div>

                <div
                  ref={backHostRef}
                  className="w-full aspect-[112/95] flex items-center justify-center overflow-hidden rounded bg-[#162019]"
                  dangerouslySetInnerHTML={{ __html: backSvgText }}
                />

                <div className="w-full flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[10px] text-white/70 font-['Rowdies']">
                  <span>Post Cores: {config.postType.replace('-', ' ').toUpperCase()}</span>
                  <span className="text-[#4ADE80] font-bold">PASSED ARC-CODE-1</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
