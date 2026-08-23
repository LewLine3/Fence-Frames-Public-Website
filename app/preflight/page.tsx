'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface PageSpec {
  id: string;
  tier: string;
  title: string;
  route: string;
  pillar: string;
  pillarColor: string;
  purpose: string;
  outboundLinks: Array<{ label: string; route: string; trigger: string }>;
  controls: Array<{ name: string; type: string; purpose: string }>;
  specialNotes: string[];
}

const PAGE_REGISTRY: PageSpec[] = [
  {
    id: 'CORE-01',
    tier: 'Tier 1 (Core)',
    title: 'Master Homepage & Brand Portal',
    route: '/',
    pillar: 'Multi-Pillar Convergence',
    pillarColor: '#E5B842',
    purpose: 'The central front door for Fence Frames. Converts visitors into active design sessions via 3 clear pathways (Code/HOA Matcher, Design Catalog, Instant Configurator).',
    outboundLinks: [
      { label: 'Start Designing', route: '/designer', trigger: 'Hero Primary CTA button' },
      { label: 'Si View HOA Hub', route: '/wa/king-county/north-bend/si-view', trigger: 'Featured HOA Card' },
      { label: 'Browse 12+ Styles', route: '/catalog', trigger: 'Frame It Catalog section' },
      { label: 'Contractor Portal', route: '/contractors', trigger: 'Nav link & Footer link' },
    ],
    controls: [
      { name: 'ZIP Code & HOA Search Input', type: 'Text Input + Matcher', purpose: 'Matches user to city/HOA pre-approved fence codes.' },
      { name: '3-Pillar Step Cards (Find, Frame, Fence)', type: 'Interactive Hover Cards', purpose: 'Educates visitors on the 3-step workflow.' },
      { name: 'Featured Style Carousels', type: 'Clickable Filter Chips', purpose: 'Quick jump into pre-set fence architectures.' },
    ],
    specialNotes: [
      'Pre-loads Rowdies 700/400/300 font.',
      'Protected with search engine noindex meta tags for stealth staging.',
      'Fluidly responsive on mobile, tablet, and widescreen desktop.',
    ],
  },
  {
    id: 'DSGN-03',
    tier: 'Tier 1 (Core)',
    title: 'The Universal 2D Designer Configurator',
    route: '/designer',
    pillar: 'Frame It (Ember Orange)',
    pillarColor: '#F27A22',
    purpose: 'The universal parametric CAD engine. Renders dual Front & Back elevations in real time with 8 pricing metrics, dynamic style switching, and live BOM calculation.',
    outboundLinks: [
      { label: 'Portrait ARC Blueprint', route: '/blueprint', trigger: 'Save Fence-Folio & Get Blueprint CTA' },
      { label: 'Auth Gate', route: '/log-in', trigger: 'Guest draft preservation bridge' },
      { label: 'Contractor Targeted Match', route: '/contractors/match', trigger: 'Match 3 Local Builders CTA' },
    ],
    controls: [
      { name: 'Linear Footage Slider (10-400 LF)', type: 'Range Slider', purpose: 'Recalculates all 8 pricing metrics in real time.' },
      { name: 'Sub-Flip Tabs (Metrics #1 to #8)', type: 'Accordion Horizontal Bar', purpose: 'Controls Height, Posts, Rails, Fill, Stain, Trim, Fasteners, Gates.' },
      { name: 'Dual CAD Canvas View Toggles', type: 'Segmented Button', purpose: 'Switches between Dual View, Front Street Face, and Back Framing View.' },
      { name: 'Custom Gate Studio Modal', type: 'Modal Dialog', purpose: 'Adds 4ft/5ft Walk Gates and 10ft/12ft Double Drive Gates.' },
      { name: 'Material Takeoff Drawer', type: 'Collapsible Grid', purpose: 'Displays itemized $/LF and subtotal breakdowns.' },
    ],
    specialNotes: [
      'Strictly implements the Canonical 8-Metric Pricing Architecture.',
      'Metric #4 (Fill Material) dynamically morphs options when changing from Vertical to Horizontal, Fabric, or Lattice.',
      'Saves full design state into browser sessionStorage for zero-data-loss auth handoff.',
    ],
  },
  {
    id: 'CORE-03',
    tier: 'Tier 1 (Core)',
    title: 'Portrait 8.5" × 11" ARC Blueprint',
    route: '/blueprint',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'The official architectural submittal document for HOA ARC committees, city building departments, and contractor bidding sheets.',
    outboundLinks: [
      { label: 'Back to Designer', route: '/designer', trigger: 'Edit Design Parameters button' },
      { label: 'Homeowner Dashboard', route: '/homeowner', trigger: 'Save to My Account CTA' },
      { label: 'Contractor Scramble', route: '/contractors/match', trigger: 'Request 3 Bids with this Blueprint' },
    ],
    controls: [
      { name: 'Print Blueprint Button', type: 'Dedicated Print CTA', purpose: 'Triggers browser window.print() formatted for portrait 8.5x11 PDF.' },
      { name: 'Pricing ON / OFF Toggle', type: 'Compliance Switch', purpose: 'Hides dollar amounts when submitting to HOA ARC committees (as required by law).' },
      { name: 'HOA Pre-Approval Stamp', type: 'Verified Badge', purpose: 'Displays Si View ARC pre-approval stamp and setback notes.' },
    ],
    specialNotes: [
      'Implements clean CSS @media print layout with page-break-inside avoid.',
      'Supports dual-mode: Pricing OFF (for HOA review) vs Pricing ON (for contractor quotes).'
    ],
  },
  {
    id: 'HOME-01',
    tier: 'Tier 1 (Core)',
    title: 'Homeowner Command Center & Showcase Dashboard',
    route: '/homeowner',
    pillar: 'Portals & Homeowner Hub (Royal Blue)',
    pillarColor: '#3B82F6',
    purpose: 'The authenticated homeowner command center. Houses saved Fence-Folios, tracks Si View ARC approval status, and monitors real-time contractor bids.',
    outboundLinks: [
      { label: 'Start New Build', route: '/designer', trigger: 'Header Primary CTA' },
      { label: 'View 8.5x11 Blueprint', route: '/blueprint', trigger: 'Project Card View Blueprint' },
      { label: 'Marketplace Bids', route: '/contractors/match', trigger: 'Review Bids & Claim Seat' },
    ],
    controls: [
      { name: 'Saved Builds Gallery', type: 'Tactile Card List', purpose: 'Displays saved configurations with 50% corner marks and live pricing.' },
      { name: 'ARC Status Card', type: 'Verified Status Plate', purpose: 'Shows Si View Section 4.2 compliance and downloads signed ARC packets.' },
      { name: 'Live 3-Seat Bid Tracker', type: 'Scramble Dispatch Plate', purpose: 'Displays received contractor bids, $/LF rates, and lock schedule button.' },
    ],
    specialNotes: [
      'Generated via Google Stitch with Architectural Command Design System.',
      'Features signature green CAD grid (70% major / 40% minor) and solid card fills.',
      'Integrated zero-data-loss auth hydration from sessionStorage.',
    ],
  },
]

export default function PreflightReviewStudio() {
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [layoutMode, setLayoutMode] = useState<'full' | 'split'>('full')
  const [zoomScale, setZoomScale] = useState<number>(0.75)
  const [approvals, setApprovals] = useState<Record<string, { status: 'approved' | 'changes-requested' | 'pending'; note: string }>>({})

  const currentPage = PAGE_REGISTRY[currentIndex] || PAGE_REGISTRY[0]

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ff_founder_approvals')
      if (saved) setApprovals(JSON.parse(saved))
    } catch (e) {}
  }, [])

  const handleUpdateStatus = (pageId: string, status: 'approved' | 'changes-requested') => {
    const updated = {
      ...approvals,
      [pageId]: {
        status,
        note: approvals[pageId]?.note || '',
      },
    }
    setApprovals(updated)
    try {
      localStorage.setItem('ff_founder_approvals', JSON.stringify(updated))
    } catch (e) {}
  }

  const handleUpdateNote = (pageId: string, note: string) => {
    const updated = {
      ...approvals,
      [pageId]: {
        status: approvals[pageId]?.status || 'pending',
        note,
      },
    }
    setApprovals(updated)
    try {
      localStorage.setItem('ff_founder_approvals', JSON.stringify(updated))
    } catch (e) {}
  }

  const getViewportWidth = () => {
    if (deviceView === 'mobile') return '390px'
    if (deviceView === 'tablet') return '768px'
    return '100%'
  }

  const currentApproval = approvals[currentPage.id] || { status: 'pending', note: '' }

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-row font-['Rowdies'] overflow-x-hidden">

      {/* MAIN CONTENT AREA (Left) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Mini Header */}
        <header className="bg-[#101712] border-b border-white/10 px-4 py-2 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link href="/" className="text-sm text-[#E5B842] flex items-center gap-1 font-bold mr-2 hover:opacity-80">
              <span>🌲</span>
              <span>FENCE FRAMES</span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#E5B842] text-[#141B16] rounded">
              {currentPage.id} · {currentPage.tier}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: currentPage.pillarColor }}>
              {currentPage.pillar}
            </span>
            <h1 className="text-white font-bold text-sm">{currentPage.title}</h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/60">
            <span>Route: <strong className="text-[#4ADE80] font-mono">{currentPage.route}</strong></span>
            <span className="text-white/20">•</span>
            <span className="text-white/70">Zoom: {Math.round(zoomScale * 100)}%</span>
          </div>
        </header>

        {/* Workspace Grid */}
        <main className={`flex-1 w-full p-3.5 gap-4 mx-auto ${layoutMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-12 max-w-[1950px]' : 'flex flex-col max-w-[1900px]'}`}>

          {/* SANDBOX SECTION */}
          <section className={`${layoutMode === 'split' ? 'lg:col-span-7' : 'w-full'} bg-[#101712] border-2 border-white/15 rounded-lg p-2.5 flex flex-col items-center shadow-2xl relative`}>
            <div className="w-full bg-[#060A08] rounded border border-white/10 p-1 overflow-auto flex items-start justify-center min-h-[720px] max-h-[880px]">
              <div
                style={{
                  width: getViewportWidth(),
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'top center',
                  transition: 'transform 0.12s ease, width 0.15s ease',
                }}
                className="rounded shadow-2xl border border-white/10 overflow-hidden bg-black flex flex-col"
              >
                <iframe
                  src={currentPage.route}
                  title={currentPage.title}
                  className="w-full h-[1200px] border-0"
                />
              </div>
            </div>
          </section>

          {/* INSPECTOR CARDS */}
          <section className={`${layoutMode === 'split' ? 'lg:col-span-5 grid grid-cols-1 overflow-y-auto max-h-[880px]' : 'w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'} gap-3.5`}>
            {/* Purpose Card */}
            <div className="bg-[#121814] border border-white/10 p-3.5 rounded-lg shadow flex flex-col gap-1.5">
              <h3 className="text-xs font-bold text-[#E5B842] uppercase flex items-center gap-1">
                <span>🎯</span>
                <span>Purpose &amp; Goal</span>
              </h3>
              <p className="text-xs text-white/80 font-light leading-relaxed">{currentPage.purpose}</p>
            </div>

            {/* Outbound Links */}
            <div className="bg-[#121814] border border-white/10 p-3.5 rounded-lg shadow flex flex-col gap-1.5">
              <h3 className="text-xs font-bold text-[#E5B842] uppercase flex items-center gap-1">
                <span>🗺️</span>
                <span>Outbound Links</span>
              </h3>
              <div className="space-y-1.5 text-xs font-light max-h-[200px] overflow-y-auto pr-1">
                {currentPage.outboundLinks.map((l, i) => (
                  <div key={i} className="bg-[#0A0F0C] p-2 rounded border border-white/5 flex flex-col gap-0.5">
                    <div className="flex justify-between items-center">
                      <strong className="font-normal text-white">{l.label}</strong>
                      <span className="text-[10px] text-[#4ADE80] font-mono">{l.route}</span>
                    </div>
                    <span className="text-[9px] text-white/50">Trigger: {l.trigger}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-[#121814] border border-white/10 p-3.5 rounded-lg shadow flex flex-col gap-1.5">
              <h3 className="text-xs font-bold text-[#F27A22] uppercase flex items-center gap-1">
                <span>🎛️</span>
                <span>Controls</span>
              </h3>
              <div className="space-y-1.5 text-xs font-light max-h-[200px] overflow-y-auto pr-1">
                {currentPage.controls.map((c, i) => (
                  <div key={i} className="bg-[#0A0F0C] p-2 rounded border border-white/5">
                    <div className="flex justify-between items-center mb-0.5">
                      <strong className="font-normal text-white/95">{c.name}</strong>
                      <span className="text-[9px] bg-[#1E2820] px-1.5 py-0.5 rounded text-white/70">{c.type}</span>
                    </div>
                    <p className="text-[10px] text-white/60">{c.purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="bg-[#121814] border border-white/10 p-3.5 rounded-lg shadow flex flex-col gap-1.5">
              <h3 className="text-xs font-bold text-[#4ADE80] uppercase flex items-center gap-1">
                <span>⚖️</span>
                <span>Architecture Notes</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-white/80 font-light max-h-[200px] overflow-y-auto pr-1">
                {currentPage.specialNotes.map((n, i) => (
                  <li key={i} className="leading-snug mb-1">{n}</li>
                ))}
              </ul>
            </div>
          </section>

          {/* FOUNDER BANNER */}
          <section className="w-full bg-[#141E17] border border-[#E5B842]/60 rounded-lg p-3.5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-3 mb-6">
            <div className="flex-1 flex flex-col gap-1 w-full">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#E5B842] uppercase">Founder Feedback</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${currentApproval.status === 'approved' ? 'bg-[#4ADE80] text-[#141B16]' : currentApproval.status === 'changes-requested' ? 'bg-[#EF4444] text-white' : 'bg-[#E5B842] text-[#141B16]'}`}>
                  {currentApproval.status.replace('-', ' ')}
                </span>
              </div>
              <input
                type="text"
                value={currentApproval.note}
                onChange={(e) => handleUpdateNote(currentPage.id, e.target.value)}
                placeholder="Type quick design feedback..."
                className="w-full bg-[#0A0F0C] border border-white/20 text-white rounded px-3 py-1.5 text-xs font-light focus:outline-none focus:border-[#E5B842]"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <button
                onClick={() => handleUpdateStatus(currentPage.id, 'approved')}
                className="bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] font-bold text-xs uppercase px-4 py-2 rounded border border-[#141B16] transition flex items-center gap-1"
              >
                <span>✓</span>
                <span>Approve</span>
              </button>
              <button
                onClick={() => handleUpdateStatus(currentPage.id, 'changes-requested')}
                className="bg-[#2C1818] hover:bg-[#3D1E1E] text-[#EF4444] font-bold text-xs uppercase px-3 py-2 rounded border border-[#EF4444]/40 transition"
              >
                ⚠️ Request Edits
              </button>
            </div>
          </section>

        </main>
      </div>

      {/* ULTRA-TIGHT DOCKED RIGHT VERTICAL RAIL (60px) */}
      <aside className="w-[60px] min-w-[60px] max-w-[60px] bg-[#0E1511]/95 backdrop-blur-md border-l-2 border-[#E5B842]/60 h-screen sticky top-0 right-0 z-50 flex flex-col items-center justify-between py-3 px-1 shadow-[-4px_0_20px_rgba(0,0,0,0.7)] select-none">
        {/* Top Group */}
        <div className="flex flex-col items-center gap-3 w-full">
          <Link href="/" className="w-10 h-10 rounded-lg bg-[#141B16] border border-[#E5B842] flex items-center justify-center text-base hover:scale-105 transition shadow" title="Fence Frames Home">
            🌲
          </Link>
          <div className="w-8 h-px bg-white/15"></div>

          {/* Slideshow Up/Down */}
          <div className="flex flex-col items-center gap-1 w-full">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              title="Previous Page (▲)"
              className="w-10 h-8 rounded bg-[#162019] disabled:opacity-30 hover:bg-[#223026] border border-white/20 text-white font-bold text-xs flex items-center justify-center transition"
            >
              ▲
            </button>

            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              title={`Page ${currentIndex + 1} of ${PAGE_REGISTRY.length}`}
              className="w-10 h-8 bg-[#162019] border-2 border-[#E5B842] text-[#E5B842] font-bold text-[11px] rounded text-center focus:outline-none cursor-pointer"
            >
              {PAGE_REGISTRY.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {idx + 1}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(PAGE_REGISTRY.length - 1, prev + 1))}
              disabled={currentIndex === PAGE_REGISTRY.length - 1}
              title="Next Page (▼)"
              className="w-10 h-8 rounded bg-[#162019] disabled:opacity-30 hover:bg-[#223026] border border-white/20 text-white font-bold text-xs flex items-center justify-center transition"
            >
              ▼
            </button>
          </div>
        </div>

        {/* Middle Group */}
        <div className="flex flex-col items-center gap-2.5 w-full">
          <div className="w-8 h-px bg-white/15"></div>

          {/* Layout Toggle */}
          <button
            onClick={() => setLayoutMode(layoutMode === 'full' ? 'split' : 'full')}
            title="Toggle Layout Mode"
            className="w-10 h-10 rounded-lg bg-[#162019] hover:bg-[#223026] border border-white/25 text-[#E5B842] flex flex-col items-center justify-center text-xs transition"
          >
            <span>{layoutMode === 'full' ? '⛶' : '◫'}</span>
            <span className="text-[8px] text-white/60 uppercase">{layoutMode === 'full' ? 'Full' : 'Split'}</span>
          </button>

          {/* Zoom Buttons */}
          <button onClick={() => setZoomScale(0.5)} title="Fit 50%" className="w-10 h-7 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-white/80 text-[10px] font-bold">50%</button>
          <button onClick={() => setZoomScale(0.75)} title="Zoom 75%" className="w-10 h-7 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-[#E5B842] text-[10px] font-bold">75%</button>
          <button onClick={() => setZoomScale(1.0)} title="Zoom 100%" className="w-10 h-7 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-white/80 text-[10px] font-bold">100%</button>

          <div className="flex items-center gap-1">
            <button onClick={() => setZoomScale(Math.max(0.35, zoomScale - 0.1))} className="w-4 h-6 rounded bg-[#162019] hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center">-</button>
            <button onClick={() => setZoomScale(Math.min(1.4, zoomScale + 0.1))} className="w-4 h-6 rounded bg-[#162019] hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center">+</button>
          </div>

          <div className="w-8 h-px bg-white/15"></div>

          {/* Viewports */}
          <button onClick={() => setDeviceView('desktop')} title="Desktop" className={`w-10 h-7 rounded text-xs flex items-center justify-center ${deviceView === 'desktop' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'bg-[#162019] text-white/60'}`}>🖥️</button>
          <button onClick={() => setDeviceView('tablet')} title="Tablet" className={`w-10 h-7 rounded text-xs flex items-center justify-center ${deviceView === 'tablet' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'bg-[#162019] text-white/60'}`}>📱</button>
          <button onClick={() => setDeviceView('mobile')} title="Mobile" className={`w-10 h-7 rounded text-xs flex items-center justify-center ${deviceView === 'mobile' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'bg-[#162019] text-white/60'}`}>📲</button>
        </div>

        {/* Bottom Group */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-8 h-px bg-white/15"></div>
          <button
            onClick={() => handleUpdateStatus(currentPage.id, currentApproval.status === 'approved' ? 'changes-requested' : 'approved')}
            title="Approve / Request Changes"
            className={`w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center shadow hover:scale-105 transition ${
              currentApproval.status === 'approved' ? 'bg-[#4ADE80] text-[#141B16]' :
              currentApproval.status === 'changes-requested' ? 'bg-[#EF4444] text-white' : 'bg-[#E5B842] text-[#141B16]'
            }`}
          >
            ✓
          </button>
          <a href={currentPage.route} target="_blank" title="Open Standalone Tab" className="w-10 h-8 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-[#4ADE80] flex items-center justify-center text-xs transition">
            ↗
          </a>
        </div>
      </aside>

    </div>
  )
}
