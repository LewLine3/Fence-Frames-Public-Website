'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'
import { DesignerCanvas } from '@/components/designer/designer-canvas'
import { SubFlipsPanel } from '@/components/designer/sub-flips-panel'
import { HeaderControls } from '@/components/designer/header-controls'
import { EstimateBar } from '@/components/designer/estimate-bar'
import { GateModal } from '@/components/designer/gate-modal'
import {
  FenceConfiguration,
  calculateBaselineFenceQuote,
} from '@/lib/pricing-engine'

export default function DesignerPage() {
  const [zipCode, setZipCode] = useState<string>('98045')
  const [isGateModalOpen, setIsGateModalOpen] = useState<boolean>(false)

  // Master Fence Configuration State
  const [config, setConfig] = useState<FenceConfiguration>({
    fenceType: 'vertical',
    fenceStyle: 'heritage',
    heightFt: 6,
    postSpacingFt: 8,
    linearFeet: 120,
    woodGrade: 'tight-knot',
    postType: '4x4-cedar',
    postCap: 'cedar-pyramid',
    railCount: 3,
    topCap: true,
    trimStyle: 'none',
    stainType: 'cedar-natural',
    hardwareTier: 'black-powder',
    gates: {
      walkGates: 1,
      driveGates: 0,
    },
  })

  // Real-time Pricing Engine Calculation
  const pricing = calculateBaselineFenceQuote(config)

  const handleConfigChange = (updated: Partial<FenceConfiguration>) => {
    setConfig((prev) => ({ ...prev, ...updated }))
  }

  const handleUpdateGates = (walk: number, drive: number) => {
    setConfig((prev) => ({
      ...prev,
      gates: { walkGates: walk, driveGates: drive },
    }))
  }

  return (
    <div id="top" className="min-h-screen bg-[#111713] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-5">
        {/* Visual Breadcrumb Navigation */}
        <nav aria-label="Breadcrumbs" className="text-xs font-['Rowdies'] font-light text-white/60 flex items-center gap-2">
          <Link href="/" className="hover:text-[#E5B842] transition">🏠 Home</Link>
          <span>/</span>
          <Link href="/catalog" className="hover:text-[#E5B842] transition">Catalog</Link>
          <span>/</span>
          <span className="text-[#E5B842] font-normal">2D Fence Designer (DSGN-03)</span>
        </nav>

        {/* 1. Header Controls (Style, ZIP, LF Slider, Gates) */}
        <HeaderControls
          config={config}
          zipCode={zipCode}
          onZipChange={setZipCode}
          onChange={handleConfigChange}
          onOpenGateModal={() => setIsGateModalOpen(true)}
        />

        {/* 2. 2D Drafting Board (Dual Front & Back SVG Elevation) */}
        <DesignerCanvas config={config} />

        {/* 3. Sub-Flips Panel (Accordion Configuration Tabs) */}
        <SubFlipsPanel config={config} onChange={handleConfigChange} />

        {/* 4. Bottom Estimate Bar & Takeoff Breakdown */}
        <EstimateBar
          config={config}
          pricing={pricing}
          onOpenContractorMatch={() => {
            alert('⚡ Targeted Match: Searching 3 vetted contractors in ' + (zipCode || 'your area') + '...')
          }}
        />
      </main>

      {/* Gate Configuration Modal */}
      <GateModal
        isOpen={isGateModalOpen}
        onClose={() => setIsGateModalOpen(false)}
        walkGates={config.gates.walkGates}
        driveGates={config.gates.driveGates}
        onUpdateGates={handleUpdateGates}
      />

      <SiteFooter />
    </div>
  )
}
