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
  specsFile: string;
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
    specsFile: 'page-vault/specs-lvl-1/CORE-01-Master-Homepage.md',
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
      { label: 'Auth Gate (when saving draft)', route: '/log-in', trigger: 'Guest draft preservation bridge' },
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
    specsFile: 'page-vault/specs-lvl-1/DSGN-03-The-Designer-Configurator.md',
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
      'Supports dual-mode: Pricing OFF (for HOA review) vs Pricing ON (for contractor quotes).',
    ],
    specsFile: 'page-vault/specs-lvl-1/CORE-03-Portrait-ARC-Blueprint.md',
  },
  {
    id: 'CORE-02',
    tier: 'Tier 1 (Core)',
    title: 'Auth & Guest Draft Preservation Gate',
    route: '/log-in',
    pillar: 'Portals & Auth (Royal Blue)',
    pillarColor: '#3B82F6',
    purpose: 'Hybrid authentication gate (Email/Password + SMS Phone OTP) that permanently stores guest drafts to the user database without losing work.',
    outboundLinks: [
      { label: 'Homeowner Showcase', route: '/homeowner', trigger: 'Successful Login / Register' },
      { label: 'Return to Designer', route: '/designer', trigger: 'Continue Editing Draft' },
    ],
    controls: [
      { name: 'Auth Mode Switcher', type: 'Tabs (Sign In / Register)', purpose: 'Toggles between existing account login and 1-tap registration.' },
      { name: 'Hybrid Channel (Phone / Email)', type: 'Segmented Toggle', purpose: 'Allows passwordless SMS OTP verification or standard email login.' },
    ],
    specialNotes: [
      'Guest Draft Hydration Pattern: Migrates sessionStorage into Supabase saved_builds on auth.',
      'Zero PCI liability ($0 cost for homeowners).',
    ],
    specsFile: 'page-vault/specs-lvl-1/CORE-02-Auth-Gate.md',
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
    <div className="min-h-screen bg-[#0B100D] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      {/* MASTER TOP STICKY TOOLBAR */}
      <header className="bg-[#141B16] border-b-2 border-[#E5B842]/50 px-4 py-2.5 sticky top-0 z-50 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-sm text-[#E5B842] flex items-center gap-1.5 hover:opacity-80">
            <span>🌲</span>
            <span>FENCE FRAMES</span>
          </Link>
          <span className="text-white/20">|</span>
          <span className="text-xs font-bold text-white bg-[#1C241E] px-2.5 py-1 rounded border border-white/10 flex items-center gap-1.5">
            <span>🚀</span>
            <span>PRE-FLIGHT COCKPIT</span>
          </span>
        </div>

        {/* Slideshow Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 bg-[#1C241E] disabled:opacity-30 hover:bg-[#26332A] rounded border border-white/20 text-xs font-bold transition"
          >
            ◀ Prev
          </button>

          <select
            value={currentIndex}
            onChange={(e) => setCurrentIndex(Number(e.target.value))}
            className="bg-[#1C241E] border-2 border-[#E5B842] text-xs font-bold text-[#E5B842] rounded px-3 py-1.5 focus:outline-none shadow-md"
          >
            {PAGE_REGISTRY.map((p, idx) => (
              <option key={p.id} value={idx}>
                [{idx + 1}/{PAGE_REGISTRY.length}] {p.id}: {p.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(PAGE_REGISTRY.length - 1, prev + 1))}
            disabled={currentIndex === PAGE_REGISTRY.length - 1}
            className="px-3 py-1.5 bg-[#1C241E] disabled:opacity-30 hover:bg-[#26332A] rounded border border-white/20 text-xs font-bold transition"
          >
            Next ▶
          </button>
        </div>

        {/* Controls Suite */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Layout Mode */}
          <div className="flex bg-[#111713] p-0.5 rounded border border-white/15 text-xs">
            <button
              onClick={() => setLayoutMode('full')}
              className={`px-3 py-1 rounded transition flex items-center gap-1 ${layoutMode === 'full' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/70 hover:text-white'}`}
            >
              <span>⛶</span>
              <span>Full View</span>
            </button>
            <button
              onClick={() => setLayoutMode('split')}
              className={`px-3 py-1 rounded transition flex items-center gap-1 ${layoutMode === 'split' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/70 hover:text-white'}`}
            >
              <span>◫</span>
              <span>2-Column</span>
            </button>
          </div>

          {/* Viewport Selector */}
          <div className="flex bg-[#111713] p-0.5 rounded border border-white/15 text-xs">
            <button
              onClick={() => setDeviceView('desktop')}
              className={`px-2.5 py-1 rounded transition ${deviceView === 'desktop' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/60 hover:text-white'}`}
            >
              🖥️ Desktop
            </button>
            <button
              onClick={() => setDeviceView('tablet')}
              className={`px-2.5 py-1 rounded transition ${deviceView === 'tablet' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/60 hover:text-white'}`}
            >
              📱 Tablet
            </button>
            <button
              onClick={() => setDeviceView('mobile')}
              className={`px-2.5 py-1 rounded transition ${deviceView === 'mobile' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/60 hover:text-white'}`}
            >
              📱 Mobile
            </button>
          </div>

          {/* Zoom Suite */}
          <div className="flex items-center bg-[#111713] border border-white/15 rounded p-0.5 text-xs">
            <button onClick={() => setZoomScale(0.5)} className="px-2 py-0.5 text-white/60 hover:text-white rounded">50% (Fit)</button>
            <button onClick={() => setZoomScale(0.75)} className="px-2 py-0.5 text-white/60 hover:text-white rounded">75%</button>
            <button onClick={() => setZoomScale(1.0)} className="px-2 py-0.5 text-white/60 hover:text-white rounded">100%</button>
            <div className="h-3 w-px bg-white/20 mx-1"></div>
            <button onClick={() => setZoomScale(Math.max(0.35, zoomScale - 0.1))} className="px-2 py-0.5 font-bold hover:bg-white/10 rounded">-</button>
            <span className="px-1.5 text-[#E5B842] font-bold min-w-[42px] text-center">{Math.round(zoomScale * 100)}%</span>
            <button onClick={() => setZoomScale(Math.min(1.4, zoomScale + 0.1))} className="px-2 py-0.5 font-bold hover:bg-white/10 rounded">+</button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className={`flex-1 w-full p-4 gap-6 mx-auto ${layoutMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-12 max-w-[1900px]' : 'flex flex-col max-w-[1700px]'}`}>

        {/* 1. LIVE SANDBOX SECTION */}
        <section className={`${layoutMode === 'split' ? 'lg:col-span-7' : 'w-full'} bg-[#141815] border-2 border-white/15 rounded-lg p-4 flex flex-col items-center shadow-2xl relative`}>
          <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-3 pb-2 border-b border-white/10 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#E5B842] text-[#141B16] rounded">
                {currentPage.id} · {currentPage.tier}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: currentPage.pillarColor }}>
                {currentPage.pillar}
              </span>
              <span className="text-white/80 font-bold">{currentPage.title}</span>
            </div>

            <div className="flex items-center gap-3 text-white/60">
              <span>Route: <strong className="text-[#4ADE80] font-mono">{currentPage.route}</strong></span>
              <span className="text-white/20">•</span>
              <span className="text-white/70">Zoom: {Math.round(zoomScale * 100)}%</span>
            </div>
          </div>

          <div className="w-full bg-[#0B100D] rounded-md border border-white/10 p-2 overflow-auto flex items-start justify-center min-h-[720px] max-h-[880px]">
            <div
              style={{
                width: getViewportWidth(),
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease, width 0.2s ease',
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

        {/* 2. INSPECTOR CARDS ROW */}
        <section className={`${layoutMode === 'split' ? 'lg:col-span-5 grid grid-cols-1 overflow-y-auto max-h-[880px]' : 'w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4'} gap-4`}>
          {/* Purpose Card */}
          <div className="bg-[#141B16] border-2 border-white/10 p-4 rounded-lg shadow-lg flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#E5B842] uppercase flex items-center gap-1.5">
              <span>🎯</span>
              <span>Purpose &amp; Target Goal</span>
            </h3>
            <p className="text-xs text-white/80 font-light leading-relaxed">{currentPage.purpose}</p>
          </div>

          {/* Outbound Links */}
          <div className="bg-[#141B16] border-2 border-white/10 p-4 rounded-lg shadow-lg flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#E5B842] uppercase flex items-center gap-1.5">
              <span>🗺️</span>
              <span>Outbound Link Map</span>
            </h3>
            <div className="space-y-2 text-xs font-light max-h-[220px] overflow-y-auto pr-1">
              {currentPage.outboundLinks.map((l, i) => (
                <div key={i} className="bg-[#111713] p-2 rounded border border-white/5 flex flex-col gap-0.5">
                  <div className="flex justify-between items-center">
                    <strong className="font-normal text-white">{l.label}</strong>
                    <span className="text-[10px] text-[#4ADE80] font-mono">{l.route}</span>
                  </div>
                  <span className="text-[9px] text-white/50">Trigger: {l.trigger}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="bg-[#141B16] border-2 border-white/10 p-4 rounded-lg shadow-lg flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#F27A22] uppercase flex items-center gap-1.5">
              <span>🎛️</span>
              <span>Interactive Controls</span>
            </h3>
            <div className="space-y-2 text-xs font-light max-h-[220px] overflow-y-auto pr-1">
              {currentPage.controls.map((c, i) => (
                <div key={i} className="bg-[#111713] p-2 rounded border border-white/5">
                  <div className="flex justify-between items-center mb-0.5">
                    <strong className="font-normal text-white/95">{c.name}</strong>
                    <span className="text-[9px] bg-[#242C26] px-1.5 py-0.5 rounded text-white/70">{c.type}</span>
                  </div>
                  <p className="text-[10px] text-white/60">{c.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Architectural Notes */}
          <div className="bg-[#141B16] border-2 border-white/10 p-4 rounded-lg shadow-lg flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#4ADE80] uppercase flex items-center gap-1.5">
              <span>⚖️</span>
              <span>Architectural &amp; Code Notes</span>
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs text-white/80 font-light max-h-[220px] overflow-y-auto pr-1">
              {currentPage.specialNotes.map((n, i) => (
                <li key={i} className="leading-snug mb-1">{n}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. FOUNDER SIGN-OFF BANNER */}
        <section className="w-full bg-[#18241D] border-2 border-[#E5B842] rounded-lg p-5 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex-1 flex flex-col gap-1.5 w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛡️</span>
              <h3 className="text-sm font-bold text-[#E5B842] uppercase">
                Founder Sign-Off &amp; Feedback Console
              </h3>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded uppercase ${
                  currentApproval.status === 'approved'
                    ? 'bg-[#4ADE80] text-[#141B16]'
                    : currentApproval.status === 'changes-requested'
                    ? 'bg-[#EF4444] text-white'
                    : 'bg-[#E5B842] text-[#141B16]'
                }`}
              >
                {currentApproval.status.replace('-', ' ')}
              </span>
            </div>
            <textarea
              value={currentApproval.note}
              onChange={(e) => handleUpdateNote(currentPage.id, e.target.value)}
              placeholder="Type founder instructions, layout tweaks, or copy refinements for this page..."
              rows={2}
              className="w-full bg-[#111713] border border-white/20 text-white rounded p-2.5 text-xs font-light focus:outline-none focus:border-[#E5B842]"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => handleUpdateStatus(currentPage.id, 'approved')}
              className="w-full sm:w-auto bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] font-bold text-xs uppercase px-6 py-3 rounded-md border-2 border-[#141B16] shadow-lg flex items-center justify-center gap-2 transition"
            >
              <span>✓</span>
              <span>Approve Page for Live</span>
            </button>
            <button
              onClick={() => handleUpdateStatus(currentPage.id, 'changes-requested')}
              className="w-full sm:w-auto bg-[#2C1818] hover:bg-[#3D1E1E] text-[#EF4444] font-bold text-xs uppercase px-5 py-3 rounded-md border border-[#EF4444]/40 transition flex items-center justify-center gap-2"
            >
              <span>⚠️</span>
              <span>Request Edits</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  )
}
