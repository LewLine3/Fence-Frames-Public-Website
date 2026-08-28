'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SiteNav } from '@/components/ff/site-nav'
import { TopTitleBar } from '@/components/designer/top-title-bar'
import { LeftOptionRail } from '@/components/designer/left-option-rail'
import { DesignerCanvas } from '@/components/designer/designer-canvas'
import { BottomCarouselHud } from '@/components/designer/bottom-carousel-hud'
import {
  FenceConfiguration,
  calculateBaselineFenceQuote,
  calculateOptionSetLaborQuote,
} from '@/lib/pricing-engine'

const HERITAGE_BLANK_DEFAULT: FenceConfiguration = {
  heightFt: 6,
  postSpacingFt: 8,
  linearFeet: 8,
  woodGrade: 'tight-knot',
  postType: '4x4-cedar',
  postCap: 'cedar-pyramid',
  footingDepthInches: 30,
  railCount: 3,
  topCap: true,
  fenceStyleCategory: 'vertical-picket',
  fillPattern: 'board-on-board',
  fenceStyle: 'heritage',
  stainType: 'cedar-natural',
  trimStyle: 'none',
  hardwareTier: 'black-powder',
  gates: {
    walkGates: 0,
    driveGates: 0,
  },
}

export default function DesignerPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [config, setConfig] = useState<FenceConfiguration>(HERITAGE_BLANK_DEFAULT)
  const [viewAngle, setViewAngle] = useState<'both' | 'front' | 'back'>('both')
  const [zoomLevel, setZoomLevel] = useState<number>(1.0)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [activeViewMode, setActiveViewMode] = useState<'canvas' | 'blueprint' | 'materials' | 'ledger'>('canvas')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Real-time Pricing Engines (Canonical Multiplier + Discrete Trial Labor)
  const pricing = calculateBaselineFenceQuote(config)
  const trialPricing = calculateOptionSetLaborQuote(config)

  const handleConfigChange = (updated: Partial<FenceConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...updated }))
  }

  const handleResetDefaults = () => {
    setConfig(HERITAGE_BLANK_DEFAULT)
    setActiveChapter(null)
  }

  const handleSaveToFolio = () => {
    try {
      sessionStorage.setItem('ff-locked-draft', JSON.stringify(config))
    } catch (e) {
      console.warn('[DesignerPage] sessionStorage unavailable', e)
    }
    router.push('/auth-gate.html')
  }

  const handleViewModeChange = (mode: 'canvas' | 'blueprint' | 'materials' | 'ledger') => {
    setActiveViewMode(mode)
    if (mode === 'blueprint') {
      router.push('/blueprint')
    }
  }

  return (
    <div
      className="h-screen h-[100dvh] w-full overflow-hidden flex flex-col select-none text-[#1A1A1A] font-['Rowdies']"
      suppressHydrationWarning
      style={{
        backgroundColor: '#F4ECDC',
        backgroundImage:
          'linear-gradient(rgba(46, 139, 78, 0.50) 1px, transparent 1px), linear-gradient(90deg, rgba(46, 139, 78, 0.50) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)',
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        backgroundPosition: '0 0',
      }}
    >
      
      {/* 1. Master Universal Header */}
      <SiteNav />

      {/* Main Studio Workspace */}
      <div className="flex-1 flex flex-row overflow-hidden relative min-h-0 w-full">
        {/* Left Column: Full-Height Continuous Option Stream + Corner Hub Anchor */}
      <LeftOptionRail
        config={config}
        onChange={handleConfigChange}
        activeChapter={activeChapter}
        onSelectChapter={setActiveChapter}
        onResetDefaults={handleResetDefaults}
      />

      {/* 2. Right Section: Top Title Bar + 2D CAD Stage + Bottom Flow */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0 h-full">
        
        {/* Top Thin Title Bar (Acts as standalone minimal nav) */}
        <TopTitleBar
          config={config}
          viewAngle={viewAngle}
          onViewAngleChange={setViewAngle}
          zoomLevel={zoomLevel}
          onZoomChange={setZoomLevel}
          activeViewMode={activeViewMode}
          onViewModeChange={handleViewModeChange}
          onSelectChapter={(ch) => setActiveChapter(ch)}
        />

        {/* Upper 2D Vector CAD Elevation Stage */}
        <section className="flex-1 h-full min-w-0 p-2 overflow-hidden flex flex-col">
          <DesignerCanvas
            config={config}
            viewAngle={viewAngle}
            onViewAngleChange={setViewAngle}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
          />
        </section>

        {/* Bottom Horizontal Endless Card Flow (from corner hub junction to screen edge) */}
        <BottomCarouselHud
          config={config}
          pricing={pricing}
          trialPricing={trialPricing}
          onChange={handleConfigChange}
          onResetDefaults={handleResetDefaults}
          onSaveToFolio={handleSaveToFolio}
          onOpenLedgerModal={() => handleViewModeChange('blueprint')}
          activeChapter={activeChapter}
          onSelectChapter={setActiveChapter}
        />
      </div>
    </div>
  </div>
)
}
