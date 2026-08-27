'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SiteNav } from '@/components/ff/site-nav'
import { TopTitleBar } from '@/components/designer/top-title-bar'
import { LeftOptionRail } from '@/components/designer/left-option-rail'
import { DesignerCanvas } from '@/components/designer/designer-canvas'
import { BottomControlHud } from '@/components/designer/bottom-control-hud'
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
  const [config, setConfig] = useState<FenceConfiguration>(HERITAGE_BLANK_DEFAULT)
  const [viewAngle, setViewAngle] = useState<'both' | 'front' | 'back'>('both')
  const [zoomLevel, setZoomLevel] = useState<number>(1.0)

  // Real-time Pricing Engines (Canonical Multiplier + Discrete Trial Labor)
  const pricing = calculateBaselineFenceQuote(config)
  const trialPricing = calculateOptionSetLaborQuote(config)

  const handleConfigChange = (updated: Partial<FenceConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...updated }))
  }

  const handleResetDefaults = () => {
    setConfig(HERITAGE_BLANK_DEFAULT)
  }

  const handleSaveToFolio = () => {
    try {
      sessionStorage.setItem('ff-locked-draft', JSON.stringify(config))
    } catch (e) {
      console.warn('[DesignerPage] sessionStorage unavailable', e)
    }
    router.push('/auth-gate.html')
  }

  return (
    <div className="h-screen h-[100dvh] w-full overflow-hidden flex flex-col select-none bg-[#F4ECDC] text-[#1A1A1A] font-['Rowdies'] page-canvas-ground">
      {/* 1. Master Universal Header */}
      <SiteNav />

      {/* 2. Top Thin Title Bar with Fast Chapter Jumps */}
      <TopTitleBar
        config={config}
        viewAngle={viewAngle}
        onViewAngleChange={setViewAngle}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
      />

      {/* 3. Main Studio Workspace (Left Option Rail + 2D CAD Stage) */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden relative p-2 md:p-3 gap-3">
        {/* Infinite Left Scroll Rail */}
        <LeftOptionRail config={config} onChange={handleConfigChange} />

        {/* Central 2D Vector CAD Elevation Stage */}
        <section className="flex-1 h-full min-w-0 flex flex-col">
          <DesignerCanvas
            config={config}
            viewAngle={viewAngle}
            onViewAngleChange={setViewAngle}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
          />
        </section>
      </main>

      {/* 4. Bottom Control HUD with Math Model Comparison (Zero Marketing Footer) */}
      <BottomControlHud
        config={config}
        pricing={pricing}
        trialPricing={trialPricing}
        onChange={handleConfigChange}
        onResetDefaults={handleResetDefaults}
        onSaveToFolio={handleSaveToFolio}
      />
    </div>
  )
}
