'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SiteNav } from '@/components/ff/site-nav'
import { SubHeaderRibbon } from '@/components/toolbar/sub-header-ribbon'
import { ElevationStage } from '@/components/toolbar/elevation-stage'
import { LeftOptionRail } from '@/components/designer/left-option-rail'
import { BottomCarouselHud } from '@/components/designer/bottom-carousel-hud'
import { type ElevationMode, type ViewTab } from '@/lib/toolbar/spec'
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
  const [elevationMode, setElevationMode] = useState<ElevationMode>('dual')
  const [zoomPercent, setZoomPercent] = useState<number>(100)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ViewTab>('2D Canvas')

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

  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab)
    if (tab === 'Blueprint' || tab === 'Ledger') {
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

        {/* 2. Right Section: 30px Sub-Header Ribbon + 8:3 Dual CAD Stage + Bottom Flow */}
        <div className="flex-1 flex flex-col overflow-hidden relative min-w-0 h-full">
          {/* Ultra-thin 30px Sub-Header Ribbon */}
          <SubHeaderRibbon
            mode={elevationMode}
            onModeChange={setElevationMode}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            zoom={zoomPercent}
            onZoomChange={setZoomPercent}
          />

          {/* Strictly Proportional 8:3 Dual / 4:3 Single CAD Elevation Stage */}
          <section className="flex-1 h-full min-w-0 overflow-hidden flex flex-col">
            <ElevationStage
              mode={elevationMode}
              zoom={zoomPercent}
              config={config}
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
            onOpenLedgerModal={() => handleTabChange('Blueprint')}
            activeChapter={activeChapter}
            onSelectChapter={setActiveChapter}
          />
        </div>
      </div>
    </div>
  )
}

