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
    <div className="aspect-[4/3] h-full min-w-0 flex-1 overflow-hidden rounded-lg border-2 border-canvas-grid bg-canvas-ivory flex flex-col justify-between shadow-md select-none">
      <div className="flex h-full flex-col">
        {/* Card Header Strip */}
        <div
          className={cn(
            'flex h-6 shrink-0 items-center justify-between px-2 text-[10px] font-bold uppercase leading-none text-canvas-ivory font-[\'Rowdies\']',
            accent,
          )}
        >
          <span>{label}</span>
        </div>

        {/* Vector Display Area */}
        <div className="relative min-h-0 flex-1 flex items-center justify-center overflow-hidden">
          {svgHtml ? (
            <div
              ref={hostRef}
              className="w-full h-full flex items-center justify-center p-2 [&_svg]:max-h-full [&_svg]:max-w-full [&_svg]:w-full [&_svg]:h-full [&_svg]:object-contain"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          ) : src ? (
            <Image src={src} alt={alt} fill className="object-contain p-2" />
          ) : (
            <div className="text-[10px] text-panel-charcoal/60 font-mono">Elevation Vector</div>
          )}
        </div>
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
  const [frontSvgText, setFrontSvgText] = useState<string>(propFrontSvg || '')
  const [backSvgText, setBackSvgText] = useState<string>(propBackSvg || '')

  const frontHostRef = useRef<HTMLDivElement>(null)
  const backHostRef = useRef<HTMLDivElement>(null)

  // Fetch authentic Heritage vector SVGs if not provided as props
  useEffect(() => {
    if (propFrontSvg && propBackSvg) {
      setFrontSvgText(propFrontSvg)
      setBackSvgText(propBackSvg)
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
        setFrontSvgText(front)
        setBackSvgText(back)
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

      // Pickets
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

      // Rails
      const middleRail = svg.querySelector('#middle-rail, [id*="rail-middle"], [id*="rail-mid"]')
      if (middleRail) {
        (middleRail as HTMLElement).style.display = config.railCount >= 3 ? '' : 'none'
      }

      // Top Cap
      const topCapEl = svg.querySelector('#top-cap, [id*="rail-cap"]')
      if (topCapEl) {
        (topCapEl as HTMLElement).style.display = config.topCap ? '' : 'none'
      }

      // Post Caps
      const capGroups = svg.querySelectorAll('[id*="cap"], [data-slot="post-cap-material"]')
      capGroups.forEach((el) => {
        if (config.postCap === 'none') {
          (el as HTMLElement).style.display = 'none'
        } else {
          (el as HTMLElement).style.display = ''
        }
      })

      // Stain gradients
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
    <div className="flex h-full min-h-0 w-full items-center justify-center overflow-hidden bg-canvas-grid/5 p-3 relative">
      <div
        className={cn(
          'mx-auto grid h-full w-full gap-3 transition-all duration-150',
          'aspect-[4/3] grid-cols-1 max-w-[min(100%,calc((100dvh-198px)*1.333))]',
          isDual &&
            'lg:aspect-[8/3] lg:grid-cols-2 lg:max-w-[min(100%,calc((100dvh-198px)*2.667))]',
        )}
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
      >
        {/* Front Elevation (Street Face) */}
        <div className={cn(frontVisible, 'h-full min-w-0 flex-1')}>
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
        <div className={cn(backVisible, 'h-full min-w-0 flex-1')}>
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
