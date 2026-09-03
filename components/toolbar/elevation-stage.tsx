'use client'

import React, { useState, useEffect, useRef } from 'react'
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

/**
 * Display crop: trim empty sky above caps and equal side margins so the
 * fence fills more of the elevation stage while keeping ~the same aspect.
 * Source art remains 112×95; only the rendered viewBox is tightened.
 */
const CAD_DISPLAY_CROP = { x: 7, y: 8, w: 98, h: 86 }

const STAIN_PALETTES: Record<string, { main: string; dark: string; light: string; rail: string }> = {
  'cedar-natural': { main: '#c88254', dark: '#8a4e2c', light: '#dca070', rail: '#b06840' },
  'clear-seal':    { main: '#c9a982', dark: '#9e805e', light: '#e2ccb0', rail: '#b3916d' },
  'chestnut-brown':{ main: '#784626', dark: '#542e15', light: '#995c37', rail: '#64371c' },
  'redwood':       { main: '#8e3826', dark: '#632113', light: '#ab4a35', rail: '#772c1a' },
  'dark-walnut':   { main: '#42281d', dark: '#281710', light: '#5e3a2c', rail: '#341e15' },
  'none':          { main: '#d8c3a5', dark: '#b59f82', light: '#eddcc5', rail: '#c5af92' },
}

const FILL_PATTERN_TO_LAYER: Record<string, string> = {
  'board-on-board': 'board-on-board',
  'flat-top-privacy': 'standard',
  'standard': 'standard',
  'standard-gap': 'standard',
  'gothic': 'gothic',
  'shadowbox': 'shadowbox',
  'butt-joint': 'standard',
}

function normalizeSvgString(raw: string): string {
  if (!raw) return ''
  const crop = `${CAD_DISPLAY_CROP.x} ${CAD_DISPLAY_CROP.y} ${CAD_DISPLAY_CROP.w} ${CAD_DISPLAY_CROP.h}`
  return raw
    .replace(/\swidth="[0-9.]+"/i, '')
    .replace(/\sheight="[0-9.]+"/i, '')
    .replace(/\sviewBox="[^"]*"/i, ` viewBox="${crop}"`)
    .replace(
      /<svg\b/i,
      // xMidYMax docks grass/ground to the bottom edge of the stage
      '<svg preserveAspectRatio="xMidYMax meet" width="100%" height="100%"',
    )
}

function applySvgSlots(svg: SVGSVGElement, config: FenceConfiguration) {
  svg.setAttribute('width', '100%')
  svg.setAttribute('height', '100%')
  svg.setAttribute(
    'viewBox',
    `${CAD_DISPLAY_CROP.x} ${CAD_DISPLAY_CROP.y} ${CAD_DISPLAY_CROP.w} ${CAD_DISPLAY_CROP.h}`,
  )
  svg.setAttribute('preserveAspectRatio', 'xMidYMax meet')
  svg.style.display = 'block'
  svg.style.background = 'transparent'

  // Drop the charcoal sky plate so reverse green-print reads behind the fence art.
  const bgGroup = svg.querySelector('#Background-Group, [data-slot="background"]')
  if (bgGroup) {
    ;(bgGroup as HTMLElement).style.display = 'none'
  }

  const isPT = config.postType.includes('pt') || config.postType.includes('pressure-treated')
  const postMatSelector = isPT ? 'pt' : 'cedar'

  svg.querySelectorAll('[data-post-material]').forEach((el) => {
    const mat = el.getAttribute('data-post-material')
    ;(el as HTMLElement).style.display = mat === postMatSelector ? '' : 'none'
  })

  const isPTRails =
    (config.woodGrade as string) === 'standard-doug-fir' || config.woodGrade === 'pressure-treated'
  const railMatSelector = isPTRails ? 'pt' : 'cedar'

  svg.querySelectorAll('[data-frame-material]').forEach((el) => {
    const mat = el.getAttribute('data-frame-material')
    ;(el as HTMLElement).style.display = mat === railMatSelector ? '' : 'none'
  })

  const middleRailGroup = svg.querySelector('#Middle-Rail-Group, [data-rail-tier="middle"]')
  if (middleRailGroup) {
    ;(middleRailGroup as HTMLElement).style.display = config.railCount >= 3 ? '' : 'none'
  }

  const capGroup = svg.querySelector('#fill-cap, [data-slot="rail-cap-material"]')
  if (capGroup) {
    ;(capGroup as HTMLElement).style.display = config.topCap ? '' : 'none'
  }

  svg.querySelectorAll('[data-cap-material]').forEach((el) => {
    const mat = el.getAttribute('data-cap-material')
    ;(el as HTMLElement).style.display = mat === railMatSelector ? '' : 'none'
  })

  const trimGroup = svg.querySelector('#Trim-Group, [data-slot="trim-package"]')
  if (trimGroup) {
    ;(trimGroup as HTMLElement).style.display =
      config.trimStyle && config.trimStyle !== 'none' ? '' : 'none'
  }

  const targetFill = FILL_PATTERN_TO_LAYER[config.fillPattern] || 'standard'
  const targetSpacing = config.picketSpacing ?? '1-16-privacy'
  const targetWidth = config.picketWidth ?? '5.5'

  svg.querySelectorAll('.picket-fill-layer[data-picket-fill]').forEach((el) => {
    const fill = el.getAttribute('data-picket-fill')
    const spacing = el.getAttribute('data-picket-spacing')
    const width = el.getAttribute('data-picket-width')
    const widthLocked = el.getAttribute('data-picket-width-locked') === 'true'

    let show = fill === targetFill
    if (show && fill === 'standard') {
      // Standard fill has spacing × width variants in the assembly
      if (spacing && spacing !== targetSpacing) show = false
      if (width && width !== targetWidth) show = false
    } else if (show && widthLocked && width && width !== targetWidth) {
      // gothic / shadowbox / BoB locked to their authored width
      show = width === targetWidth || targetWidth === '5.5'
    }

    ;(el as HTMLElement).style.display = show ? '' : 'none'
  })

  const palette = STAIN_PALETTES[config.stainType] || STAIN_PALETTES['cedar-natural']
  svg.querySelectorAll('linearGradient[id*="shine" i]').forEach((grad) => {
    const stops = grad.querySelectorAll('stop')
    if (stops.length >= 3) {
      stops[0].setAttribute('stop-color', palette.light)
      stops[1].setAttribute('stop-color', palette.main)
      stops[2].setAttribute('stop-color', palette.dark)
    } else if (stops.length === 2) {
      stops[0].setAttribute('stop-color', palette.light)
      stops[1].setAttribute('stop-color', palette.main)
    }
  })
}

function ElevationCard({
  svgHtml,
  alt,
  hostRef,
}: {
  src?: string
  svgHtml?: string
  alt: string
  label: string
  accent: string
  hostRef?: React.RefObject<HTMLDivElement | null>
}) {
  // No chrome plate — fence art is the container edge (strand-docked).
  return (
    <div
      className="relative flex h-full w-full min-h-0 min-w-0 items-end justify-center overflow-hidden bg-transparent select-none"
      aria-label={alt}
    >
      {svgHtml ? (
        <div
          ref={hostRef}
          className="flex h-full w-full items-end justify-center [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:max-h-full [&_svg]:max-w-full"
          dangerouslySetInnerHTML={{ __html: svgHtml }}
        />
      ) : (
        <div className="mb-8 flex flex-col items-center justify-center gap-2 text-[10px] text-[#FAF6EE]/70 font-mono">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-[#4ADE80]" />
          Loading elevation CAD…
        </div>
      )}
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

  useEffect(() => {
    if (propFrontSvg && propBackSvg) {
      setFrontSvgText(normalizeSvgString(propFrontSvg))
      setBackSvgText(normalizeSvgString(propBackSvg))
      return
    }

    let isMounted = true
    Promise.all([
      fetch('/configure/heritage-v1/pilot-fences/vpf/heritage/asm-heritage-hrtg-frame.svg').then((res) =>
        res.ok ? res.text() : Promise.reject('Failed to load Front SVG'),
      ),
      fetch('/configure/heritage-v1/pilot-fences/vpf/heritage/asm-heritage-hrtg-frame-back.svg').then((res) =>
        res.ok ? res.text() : Promise.reject('Failed to load Back SVG'),
      ),
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

  useEffect(() => {
    if (!config) return

    const applyToHost = (hostEl: HTMLElement | null) => {
      if (!hostEl) return
      const svg = hostEl.querySelector('svg')
      if (!svg) return
      applySvgSlots(svg, config)
    }

    applyToHost(frontHostRef.current)
    applyToHost(backHostRef.current)
  }, [config, frontSvgText, backSvgText, mode])

  const showFront = mode !== 'back'
  const showBack = mode !== 'front'
  const isDual = mode === 'dual'

  return (
    // Strand-dock: bottom of fence/grass sits on the brown ground line (slight overlap).
    <div className="absolute inset-0 flex min-h-0 w-full items-end justify-center overflow-hidden pl-0 pr-[56px] pb-0 pt-0 select-none">
      <div
        className={cn(
          'flex h-full w-full min-h-0 items-end justify-center gap-2 transition-transform duration-150',
          isDual ? 'max-w-none' : 'max-w-none',
        )}
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center bottom' }}
      >
        {showFront && (
          <div
            className={cn(
              'flex h-full min-h-0 min-w-0 items-end justify-center',
              isDual ? 'flex-1' : 'h-full w-full',
            )}
          >
            <ElevationCard
              src={frontImageSrc}
              svgHtml={frontSvgText}
              alt="Front elevation (street face) of the fence design"
              label="Front Elevation · Street Face"
              accent="bg-accent-forest"
              hostRef={frontHostRef}
            />
          </div>
        )}

        {showBack && (
          <div
            className={cn(
              'flex h-full min-h-0 min-w-0 items-end justify-center',
              isDual ? 'hidden flex-1 lg:flex' : 'h-full w-full',
            )}
          >
            <ElevationCard
              src={backImageSrc}
              svgHtml={backSvgText}
              alt="Back elevation (framing face) of the fence design"
              label="Back Elevation · Framing Face"
              accent="bg-toolbar-orange"
              hostRef={backHostRef}
            />
          </div>
        )}
      </div>
    </div>
  )
}
