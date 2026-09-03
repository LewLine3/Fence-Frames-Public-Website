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
import { createFolioFromConfig, folioHref } from '@/lib/saved-folios'
import { DESIGNER_GROUND_BROWN, greenPrintBackground } from '@/lib/green-print'

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
  picketSpacing: '1-16-privacy',
  picketWidth: '5.5',
  bracketType: 'none',
  gates: {
    walkGates: 0,
    driveGates: 0,
  },
}

export default function DesignerPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [config, setConfig] = useState<FenceConfiguration>(HERITAGE_BLANK_DEFAULT)
  const [elevationMode, setElevationMode] = useState<ElevationMode>('front')
  const [zoomPercent, setZoomPercent] = useState<number>(100)
  const [activeChapter, setActiveChapter] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ViewTab>('Design')

  useEffect(() => {
    setIsMounted(true)
  }, [])

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
    const folio = createFolioFromConfig(config)
    try {
      sessionStorage.setItem('ff-locked-draft', JSON.stringify(config))
    } catch (e) {
      console.warn('[DesignerPage] sessionStorage unavailable', e)
    }
    router.push(folioHref(folio.id))
  }

  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab)
    if (tab === 'Fence-Folio') {
      router.push('/blueprint')
    }
  }

  return (
    <div
      className="h-screen h-[100dvh] w-full overflow-hidden flex flex-col select-none text-[#1A1A1A] font-['Rowdies'] relative"
      suppressHydrationWarning
      style={greenPrintBackground}
    >
      <SiteNav />

      <div className="flex-1 flex flex-row overflow-hidden relative min-h-0 w-full">
        <LeftOptionRail
          config={config}
          onChange={handleConfigChange}
          activeChapter={activeChapter}
          onSelectChapter={setActiveChapter}
          onResetDefaults={handleResetDefaults}
        />

        {/* Stage column: fence fills remaining height; carousel is a docked bottom row */}
        <div
          className="flex-1 flex flex-col overflow-hidden relative min-w-0 h-full"
          style={greenPrintBackground}
        >
          <section className="flex-1 min-h-0 min-w-0 overflow-hidden relative">
            <ElevationStage mode={elevationMode} zoom={zoomPercent} config={config} />

            <SubHeaderRibbon
              mode={elevationMode}
              onModeChange={setElevationMode}
              activeTab={activeTab}
              onTabChange={handleTabChange}
              zoom={zoomPercent}
              onZoomChange={setZoomPercent}
            />
          </section>

          {/* Ground strand — fence grass docks onto this line above the carousel */}
          <div
            aria-hidden
            className="pointer-events-none flex-shrink-0 w-full z-30"
            style={{
              height: 6,
              background: DESIGNER_GROUND_BROWN,
              boxShadow: '0 -1px 0 #1A1A1A, inset 0 1px 0 rgba(250,246,238,0.12)',
            }}
          />

          <BottomCarouselHud
            config={config}
            pricing={pricing}
            trialPricing={trialPricing}
            onChange={handleConfigChange}
            onResetDefaults={handleResetDefaults}
            onSaveToFolio={handleSaveToFolio}
            onOpenLedgerModal={() => handleTabChange('Fence-Folio')}
            activeChapter={activeChapter}
            onSelectChapter={setActiveChapter}
          />
        </div>
      </div>
    </div>
  )
}
