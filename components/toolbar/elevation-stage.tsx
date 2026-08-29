'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { type ElevationMode } from '@/lib/toolbar/spec'
import { FenceConfiguration } from '@/lib/pricing-engine'
import { cn } from '@/lib/utils'

interface ElevationStageProps {
  mode: ElevationMode
  zoom: number
  config?: FenceConfiguration
  frontImageSrc?: string
  backImageSrc?: string
  frontSvgHtml?: string
  backSvgHtml?: string
}

const STAIN_PALETTES: Record<string, { main: string; dark: string; light: string; rail: string }> = {
  'cedar-natural': { main: '#c88254', dark: '#8a4e2c', light: '#dca070', rail: '#b06840' },
  'clear-seal':    { main: '#c9a982', dark: '#9e805e', light: '#e2ccb0', rail: '#b3916d' },
  'chestnut-brown':{ main: '#784626', dark: '#542e15', light: '#995c37', rail: '#64371c' },
  'redwood':       { main: '#8e3826', dark: '#632113', light: '#ab4a35', rail: '#772c1a' },
  'dark-walnut':   { main: '#42281d', dark: '#281710', light: '#5e3a2c', rail: '#341e15' },
  'none':          { main: '#d8c3a5', dark: '#b59f82', light: '#eddcc5', rail: '#c5af92' },
}

function normalizeSvgString(raw: string): string {
  if (!raw) return ''
  return raw
    .replace(/\bwidth="[0-9.]+"/gi, 'width="100%"')
    .replace(/\bheight="[0-9.]+"/gi, 'height="100%"')
    .replace(
      /<svg\b/i,
      '<svg preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;max-width:100%;max-height:100%;display:block;"',
    )
}

function ElevationCard({
  src,
  svgHtml,
  alt,
  label,
  accent,
  hostRef,
}: {
  src?: string
  svgHtml?: string
  alt: string
  label: string
  accent: string
  hostRef?: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="w-full h-full max-h-full aspect-[4/3] min-w-0 overflow-hidden rounded-xl border-2 border-canvas-grid bg-canvas-ivory flex flex-col justify-between shadow-2xl select-none">
      {/* Card Header Strip */}
      <div
        className={cn(
          'flex h-6 shrink-0 items-center justify-between px-3 text-[10px] font-bold uppercase leading-none text-canvas-ivory font-[\'Rowdies\'] shadow-sm',
          accent,
        )}
      >
        <span>{label}</span>
        <span className="font-mono text-[9px] opacity-80">112″ × 95″ CAD</span>
      </div>

      {/* Vector Display Area */}
      <div className="relative min-h-0 flex-1 w-full h-full flex items-center justify-center overflow-hidden p-1.5 sm:p-2">
        {svgHtml ? (
          <div
            ref={hostRef}
            className="w-full h-full flex items-center justify-center overflow-hidden [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
            dangerouslySetInnerHTML={{ __html: svgHtml }}
          />
        ) : src ? (
          <Image src={src} alt={alt} fill className="object-contain p-2" />
        ) : (
          <div className="text-[10px] text-panel-charcoal/60 font-mono">Loading Elevation CAD...</div>
        )}
      </div>
    </div>
  )
}

export function ElevationStage({
  mode,
  zoom,
  config,
  frontImageSrc = '/elevations/front-elevation.png',
  backImageSrc = '/elevations/back-elevation.png',
  frontSvgHtml: propFrontSvg,
  backSvgHtml: propBackSvg,
}: ElevationStageProps) {
  const [frontSvgText, setFrontSvgText] = useState<string>(propFrontSvg ? normalizeSvgString(propFrontSvg) : '')
  const [backSvgText, setBackSvgText] = useState<string>(propBackSvg ? normalizeSvgString(propBackSvg) : '')

  const frontHostRef = useRef<HTMLDivElement>(null)
  const backHostRef = useRef<HTMLDivElement>(null)

  // Fetch authentic Heritage vector SVGs if not provided as props
  useEffect(() => {
    if (propFrontSvg && propBackSvg) {
      setFrontSvgText(normalizeSvgString(propFrontSvg))
      setBackSvgText(normalizeSvgString(propBackSvg))
      return
    }

    let isMounted = true
    Promise.all([
      fetch('/configure/heritage-v1/pilot-fences/vpf/heritage/asm-heritage-hrtg-frame.svg')
        .then((res) => (res.ok ? res.text() : Promise.reject('Failed to load Front SVG'))),
      fetch('/configure/heritage-v1/pilot-fences/vpf/heritage/asm-heritage-hrtg-frame-back.svg')
        .then((res) => (res.ok ? res.text() : Promise.reject('Failed to load Back SVG'))),
    ])
      .then(([front, back]) => {
        if (!isMounted) return
        setFrontSvgText(normalizeSvgString(front))
        setBackSvgText(normalizeSvgString(back))
      })
      .catch((err) => {
        console.warn('[ElevationStage] SVG fetch fallback:', err)
      })

    return () => {
      isMounted = false
    }
  }, [propFrontSvg, propBackSvg])

  // Apply dynamic material & geometry slots to mounted SVGs
  useEffect(() => {
    if (!config) return

    const applySlots = (hostEl: HTMLElement | null) => {
      if (!hostEl) return
      const svg = hostEl.querySelector('svg')
      if (!svg) return

      svg.setAttribute('width', '100%')
      svg.setAttribute('height', '100%')
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
      svg.style.maxWidth = '100%'
      svg.style.maxHeight = '100%'
      svg.style.display = 'block'

      // 1. Post Materials & Styles (Cedar vs PT vs Steel)
      const isPT = config.postType.includes('pt') || config.postType.includes('pressure-treated')
      const postMatSelector = isPT ? 'pt' : 'cedar'
      
      const postElements = svg.querySelectorAll('[data-post-material]')
      postElements.forEach((el) => {
        const mat = el.getAttribute('data-post-material')
        ;(el as HTMLElement).style.display = mat === postMatSelector ? '' : 'none'
      })

      // 2. Rails Visibility & Counts
      const isPTRails = config.woodGrade === 'standard-doug-fir'
      const railMatSelector = isPTRails ? 'pt' : 'cedar'
      
      const railElements = svg.querySelectorAll('[data-frame-material]')
      railElements.forEach((el) => {
        const mat = el.getAttribute('data-frame-material')
        ;(el as HTMLElement).style.display = mat === railMatSelector ? '' : 'none'
      })

      const middleRailGroup = svg.querySelector('#Middle-Rail-Group, [data-rail-tier="middle"]')
      if (middleRailGroup) {
        (middleRailGroup as HTMLElement).style.display = config.railCount >= 3 ? '' : 'none'
      }

      // 3. Top Cap & Post Caps
      const capGroup = svg.querySelector('#fill-cap, [data-slot="rail-cap-material"]')
      if (capGroup) {
        (capGroup as HTMLElement).style.display = config.topCap ? '' : 'none'
      }

      const capMatElements = svg.querySelectorAll('[data-cap-material]')
      capMatElements.forEach((el) => {
        const mat = el.getAttribute('data-cap-material')
        ;(el as HTMLElement).style.display = mat === railMatSelector ? '' : 'none'
      })

      // 4. Trim Packages
      const trimGroup = svg.querySelector('#Trim-Group, [data-slot="trim-package"]')
      if (trimGroup) {
        (trimGroup as HTMLElement).style.display = config.trimStyle && config.trimStyle !== 'none' ? '' : 'none'
      }

      // 5. Picket Patterns
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

      // 6. Dynamic Stain & Wood Color Updates on Gradients
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

    if (frontHostRef.current && frontSvgText) applySlots(frontHostRef.current)
    if (backHostRef.current && backSvgText) applySlots(backHostRef.current)
  }, [config, frontSvgText, backSvgText, mode])

  const isDual = mode === 'dual'
  const frontVisible = mode !== 'back' ? 'flex' : 'hidden'
  const backVisible = mode === 'front' ? 'hidden' : isDual ? 'hidden lg:flex' : 'flex'

  return (
    <div className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-canvas-grid/5 p-2 sm:p-3 relative select-none">
      <div
        className={cn(
          'w-full h-full max-h-full flex items-center justify-center gap-3 sm:gap-4 transition-all duration-150',
        )}
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
      >
        {/* Front Elevation (Street Face) */}
        <div className={cn(frontVisible, 'h-full max-h-full min-w-0 flex-1 flex items-center justify-center')}>
          <ElevationCard
            src={frontImageSrc}
            svgHtml={frontSvgText}
            alt="Front elevation (street face) of the fence design"
            label="Front Elevation · Street Face"
            accent="bg-accent-forest"
            hostRef={frontHostRef}
          />
        </div>

        {/* Back Elevation (Framing Face) */}
        <div className={cn(backVisible, 'h-full max-h-full min-w-0 flex-1 flex items-center justify-center')}>
          <ElevationCard
            src={backImageSrc}
            svgHtml={backSvgText}
            alt="Back elevation (framing face) of the fence design"
            label="Back Elevation · Framing Face"
            accent="bg-toolbar-orange"
            hostRef={backHostRef}
          />
        </div>
      </div>
    </div>
  )
}
