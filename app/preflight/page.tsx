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
      { name: 'ZIP Code & HOA Search Input', type: 'Text Input + Auto-complete', purpose: 'Matches user to city/HOA pre-approved fence codes.' },
      { name: '3-Pillar Step Cards (Find, Frame, Fence)', type: 'Interactive Hover Cards', purpose: 'Educates visitors on the 3-step workflow.' },
      { name: 'Featured Style Carousels', type: 'Clickable Filter Chips', purpose: 'Quick jump into pre-set fence architectures.' },
      { name: 'Footer Legal & Navigation Hub', type: 'Link Columns', purpose: 'Access to sitemap, HOA directory, contractor onboarding.' },
    ],
    specialNotes: [
      'Pre-loads Rowdies 700/400/300 font.',
      'Protected with search engine noindex meta tags for stealth staging.',
      'Fully responsive with mobile stacked layout.',
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
      { name: 'Design Architecture Dropdown', type: 'Select Dropdown', purpose: 'Switches between Heritage, Good Neighbor, Flat Top, Gothic styles.' },
      { name: 'Linear Footage Slider', type: 'Range Slider (10-400 LF)', purpose: 'Updates run length and recalculates all 8 pricing metrics in real time.' },
      { name: 'Sub-Flip Tabs (1 to 8)', type: 'Accordion Horizontal Bar', purpose: 'Controls Height, Posts, Rails, Fill, Stain, Trim, Fasteners, Gates.' },
      { name: 'Dual CAD Canvas View Toggles', type: 'Segmented Button', purpose: 'Switches between Dual View, Front Street Face, and Back Framing View.' },
      { name: 'Zoom Controller (+/-)', type: 'Scale Controls (60% to 180%)', purpose: 'Scales SVG drafting board for high-DPI inspection.' },
      { name: 'Custom Gate Studio Modal', type: 'Modal Dialog', purpose: 'Adds 4ft/5ft Walk Gates and 10ft/12ft Double Drive Gates.' },
      { name: 'Material Takeoff Drawer', type: 'Collapsible Table', purpose: 'Displays itemized cost breakdown per LF and totals.' },
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
      { name: 'Itemized Materials Takeoff', type: 'Architectural Data Grid', purpose: 'Lists post count, 2x4 rails, pickets, brackets, and fastener counts.' },
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
      { name: 'Auth Mode Switcher', type: 'Tabs (Sign In / Create Account)', purpose: 'Toggles between existing account login and 1-tap registration.' },
      { name: 'Hybrid Channel (Phone / Email)', type: 'Segmented Toggle', purpose: 'Allows passwordless SMS OTP verification or standard email login.' },
      { name: 'Draft Summary Preview Card', type: 'Read-only Card', purpose: 'Displays the fence design currently held in memory so the user knows what is being saved.' },
    ],
    specialNotes: [
      'Guest Draft Hydration Pattern: Migrates sessionStorage into Supabase saved_builds on auth.',
      'Zero PCI liability ($0 cost for homeowners).',
    ],
    specsFile: 'page-vault/specs-lvl-1/CORE-02-Auth-Gate.md',
  },
  {
    id: 'HOME-01',
    tier: 'Tier 1 (Core)',
    title: 'Homeowner Account Showcase & Bid Tracker',
    route: '/homeowner',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'The homeowner client cockpit. Manages saved Fence-Folios, PDF submittal packets, and live bids from the 3 matched local contractors.',
    outboundLinks: [
      { label: 'Open in Designer', route: '/designer', trigger: 'Edit Saved Folio' },
      { label: 'View Static Folio', route: '/folio/preview', trigger: 'Shareable Link CTA' },
      { label: 'ARC Submittal Packet', route: '/blueprint', trigger: 'Download ARC PDF' },
    ],
    controls: [
      { name: 'Saved Builds Grid', type: 'Card Grid', purpose: 'Lists all authored fences with thumbnail preview, LF, and total estimated price.' },
      { name: 'Contractor Bid Scramble Feed', type: 'Live Status Tracker', purpose: 'Shows which of the 3 local contractors have accepted the lead and submitted bids.' },
      { name: 'Share Folio Link Generator', type: '1-Click Copy Link', purpose: 'Creates a public read-only viewer link for family or HOA board members.' },
    ],
    specialNotes: [
      'Supabase Row-Level Security ensures homeowners only see their own builds.',
    ],
    specsFile: 'page-vault/specs-lvl-1/HOME-01-Homeowner-Showcase.md',
  },
  {
    id: 'DSGN-01',
    tier: 'Tier 1 (Core)',
    title: 'Design Suite Hub & Architecture Catalog',
    route: '/catalog',
    pillar: 'Frame It (Ember Orange)',
    pillarColor: '#F27A22',
    purpose: 'The visual style discovery depot. Showcases all architectural categories (Vertical, Horizontal, Fabric, Lattice) with 1-click launch into The Designer.',
    outboundLinks: [
      { label: 'Load in Designer', route: '/designer', trigger: 'Customize This Style CTA' },
      { label: 'Style Deep Dive', route: '/catalog/heritage', trigger: 'Style Detail Card' },
    ],
    controls: [
      { name: 'Category Filter Chips', type: 'Filter Pill Bar', purpose: 'Filter styles by Vertical Privacy, Horizontal Modern, Ranch Wire, Craftsman.' },
      { name: 'HOA Filter Toggle', type: 'Checkbox', purpose: 'Show only styles with verified Si View HOA pre-approval.' },
      { name: 'Interactive Card Previews', type: 'Hover Cards with Badges', purpose: 'Displays base pricing $/LF, durability rating, and wood grade.' },
    ],
    specialNotes: [
      'Every card connects parametrically to the Designer engine.',
    ],
    specsFile: 'page-vault/specs-lvl-1/DSGN-01-Design-Suite-Hub.md',
  },
  {
    id: 'GEO-CIT-01',
    tier: 'Tier 1 (Core)',
    title: 'North Bend City Hub (98045)',
    route: '/wa/king-county/north-bend',
    pillar: 'Find It (Sun Gold)',
    pillarColor: '#E5B842',
    purpose: 'Hyper-local geographic landing hub for North Bend, WA. Features local wind-load requirements (Mt. Si winds), setback bylaws, and local builder directory.',
    outboundLinks: [
      { label: 'Si View HOA Hub', route: '/wa/king-county/north-bend/si-view', trigger: 'Featured Community Card' },
      { label: 'Launch City Designer', route: '/designer', trigger: 'Design North Bend Compliant Fence' },
    ],
    controls: [
      { name: 'City Bylaws Accordion', type: 'Expandable Specs', purpose: 'Displays max heights (6ft rear, 4ft front setback), permit thresholds.' },
      { name: 'Active Communities List', type: 'Community Selector', purpose: 'Direct access to Si View, Forster Woods, Riverbend.' },
    ],
    specialNotes: [
      'Targeted for #1 Google Rank for "North Bend fence builder" & "North Bend fence cost".',
    ],
    specsFile: 'page-vault/specs-lvl-1/GEO-CIT-01-North-Bend-City-Hub.md',
  },
  {
    id: 'GEO-COM-01',
    tier: 'Tier 1 (Core)',
    title: 'Si View Community Hub (HOA Pre-Approved)',
    route: '/wa/king-county/north-bend/si-view',
    pillar: 'Find It (Sun Gold)',
    pillarColor: '#E5B842',
    purpose: 'The canonical HOA submittal and pre-approval hub for the Si View community. Guaranteed 100% ARC approval on authored Heritage standards.',
    outboundLinks: [
      { label: 'Author Si View Blueprint', route: '/designer', trigger: 'Customize Pre-Approved Si View Fence' },
      { label: 'Print ARC Sheet', route: '/blueprint', trigger: 'Download Si View ARC Packet' },
    ],
    controls: [
      { name: 'Pre-Approved Design Badges', type: 'Visual Tags', purpose: 'Highlights 3-Rail Heritage Cedar as standard Si View design.' },
      { name: 'HOA Setback Rule Table', type: 'Specification Grid', purpose: 'Displays property line setbacks, corner lot visibility triangles, and color rules.' },
    ],
    specialNotes: [
      'Eliminates HOA rejection risk for Si View homeowners.',
    ],
    specsFile: 'page-vault/specs-lvl-1/GEO-COM-01-Si-View-Community.md',
  },
  {
    id: 'PRO-04',
    tier: 'Tier 1 (Core)',
    title: 'Contractor Marketplace & Dispatch Center',
    route: '/contractors',
    pillar: 'Portals & Auth (Royal Blue)',
    pillarColor: '#3B82F6',
    purpose: 'Contractor onboarding and dispatch hub. Explains the 3-seat scramble lead dispatch model, guaranteed 100% material takeoff accuracy, and Stripe payouts.',
    outboundLinks: [
      { label: 'Contractor Apply / Sign In', route: '/log-in', trigger: 'Join Contractor Network CTA' },
      { label: 'Preview Lead Format', route: '/contractors/match', trigger: 'View Sample ARC Lead Packet' },
    ],
    controls: [
      { name: 'Lead Velocity Calculator', type: 'Interactive Slider', purpose: 'Estimates contractor monthly earnings based on 3-seat scramble close rates.' },
      { name: 'Coverage Area Map Selector', type: 'ZIP Multi-Select', purpose: 'Contractors select their working territory (e.g. 98045, 98027, 98065).' },
    ],
    specialNotes: [
      'Contractors buy leads via Stripe Hosted Checkout with maximum 3 contractors per bid lead.',
    ],
    specsFile: 'page-vault/specs-lvl-1/PRO-04-Marketplace-Dispatch.md',
  },
  {
    id: 'PRO-05',
    tier: 'Tier 1 (Core)',
    title: 'Targeted Match & 3-Seat SMS Scramble',
    route: '/contractors/match',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'The high-velocity dispatch matching engine. Alerts the top 3 vetted local builders via Telnyx SMS the moment a homeowner saves an ARC Blueprint.',
    outboundLinks: [
      { label: 'View Blueprint Packet', route: '/blueprint', trigger: 'Inspect Full Architectural Specs' },
      { label: 'Homeowner Dashboard', route: '/homeowner', trigger: 'Track Bid Responses' },
    ],
    controls: [
      { name: 'Seat Claim Countdown Timer', type: 'Live 15-Minute Clock', purpose: 'Creates urgency for contractors to claim one of the 3 available bidding seats.' },
      { name: 'Lead Packet Breakdown', type: 'Summary Specs', purpose: 'Shows linear footage, height, wood grade, gate count, and city without disclosing address until claimed.' },
    ],
    specialNotes: [
      'Telnyx SMS integration triggers real-time text alerts to on-duty local contractors.',
    ],
    specsFile: 'page-vault/specs-lvl-1/PRO-05-Targeted-Match-SMS-Scramble.md',
  },
]

export default function PreflightReviewStudio() {
  const [currentIndex, setCurrentIndex] = useState<number>(1) // Default to Designer (DSGN-03)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [zoomScale, setZoomScale] = useState<number>(0.75)
  const [approvals, setApprovals] = useState<Record<string, { status: 'approved' | 'changes-requested' | 'pending'; note: string }>>({})

  const currentPage = PAGE_REGISTRY[currentIndex]

  // Load approvals from localStorage
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
    <div className="min-h-screen bg-[#0E1310] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      {/* Top Studio Control Cockpit */}
      <header className="bg-[#141B16] border-b-2 border-[#E5B842]/40 px-4 py-3 sticky top-0 z-50 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Studio Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="font-['Rowdies'] font-bold text-sm text-[#E5B842] flex items-center gap-1.5 hover:opacity-80">
            <span>🌲</span>
            <span>FENCE FRAMES</span>
          </Link>
          <span className="text-white/30">|</span>
          <span className="text-xs font-bold text-white bg-[#1C241E] px-2.5 py-1 rounded border border-white/10">
            FOUNDER PRE-FLIGHT REVIEW COCKPIT
          </span>
        </div>

        {/* Slideshow Step Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="px-3 py-1.5 bg-[#1C241E] disabled:opacity-30 hover:bg-[#26332A] rounded border border-white/15 text-xs font-bold transition"
          >
            ◀ Prev Page
          </button>

          <select
            value={currentIndex}
            onChange={(e) => setCurrentIndex(Number(e.target.value))}
            className="bg-[#1C241E] border border-[#E5B842] text-xs font-bold text-[#E5B842] rounded px-3 py-1.5 focus:outline-none"
          >
            {PAGE_REGISTRY.map((p, idx) => (
              <option key={p.id} value={idx}>
                [{idx + 1}/10] {p.id}: {p.title}
              </option>
            ))}
          </select>

          <button
            onClick={() => setCurrentIndex((prev) => Math.min(PAGE_REGISTRY.length - 1, prev + 1))}
            disabled={currentIndex === PAGE_REGISTRY.length - 1}
            className="px-3 py-1.5 bg-[#1C241E] disabled:opacity-30 hover:bg-[#26332A] rounded border border-white/15 text-xs font-bold transition"
          >
            Next Page ▶
          </button>
        </div>

        {/* Viewport & Zoom Controls */}
        <div className="flex items-center gap-2">
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

          <div className="flex items-center bg-[#111713] border border-white/15 rounded p-0.5 text-xs text-white">
            <button onClick={() => setZoomScale(Math.max(0.4, zoomScale - 0.1))} className="px-2 py-0.5 hover:bg-white/10 rounded">-</button>
            <span className="px-1.5 text-white/70">{Math.round(zoomScale * 100)}%</span>
            <button onClick={() => setZoomScale(Math.min(1.2, zoomScale + 0.1))} className="px-2 py-0.5 hover:bg-white/10 rounded">+</button>
          </div>
        </div>
      </header>

      {/* Main 2-Column Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden min-h-[calc(100vh-65px)]">
        {/* =================================================================== */}
        {/* LEFT COLUMN: LIVE ZOOMED INTERACTIVE IFRAME PREVIEW */}
        {/* =================================================================== */}
        <section className="lg:col-span-7 bg-[#141815] border-r-2 border-white/10 p-4 flex flex-col items-center justify-start overflow-auto">
          <div className="w-full flex items-center justify-between mb-2 text-xs font-light text-white/60">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
              <span>Live Interactive Sandbox: <strong className="text-white font-normal">{currentPage.route}</strong></span>
            </div>
            <a
              href={currentPage.route}
              target="_blank"
              rel="noreferrer"
              className="text-[#E5B842] hover:underline font-normal flex items-center gap-1"
            >
              <span>Open Full Tab</span>
              <span>↗</span>
            </a>
          </div>

          {/* Iframe Viewport Container */}
          <div
            className="w-full h-full bg-[#111713] rounded-lg border-2 border-white/20 shadow-2xl overflow-hidden flex items-center justify-center p-2"
            style={{ minHeight: '680px' }}
          >
            <div
              style={{
                width: getViewportWidth(),
                height: '100%',
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top center',
                transition: 'transform 0.15s ease, width 0.2s ease',
              }}
              className="w-full h-full rounded border border-white/10 overflow-hidden bg-black"
            >
              <iframe
                src={currentPage.route}
                title={currentPage.title}
                className="w-full h-[950px] border-0"
              />
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: INSPECTOR, METRICS, CONTROLS & FOUNDER APPROVAL */}
        {/* =================================================================== */}
        <aside className="lg:col-span-5 bg-[#111713] p-5 overflow-y-auto max-h-[calc(100vh-65px)] flex flex-col gap-5">
          {/* Header Card */}
          <div className="bg-[#18201B] border-2 border-[#141B16] p-4 rounded-md shadow-lg">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#E5B842] text-[#141B16] rounded">
                {currentPage.id} · {currentPage.tier}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded text-white" style={{ backgroundColor: currentPage.pillarColor }}>
                {currentPage.pillar}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1.5">{currentPage.title}</h2>
            <p className="text-xs text-white/80 font-light leading-relaxed">{currentPage.purpose}</p>
          </div>

          {/* 1. Outbound Routing & Link Map */}
          <div className="bg-[#18201B] border border-white/10 p-4 rounded-md">
            <h3 className="text-xs font-bold text-[#E5B842] uppercase mb-2 flex items-center gap-1.5">
              <span>🗺️</span>
              <span>Outbound Link &amp; Action Map</span>
            </h3>
            <ul className="space-y-2 text-xs font-light">
              {currentPage.outboundLinks.map((link, idx) => (
                <li key={idx} className="bg-[#111713] p-2.5 rounded border border-white/5 flex flex-col gap-0.5">
                  <div className="flex justify-between items-center">
                    <strong className="font-normal text-white">{link.label}</strong>
                    <span className="text-[10px] text-[#4ADE80] font-mono">{link.route}</span>
                  </div>
                  <span className="text-[10px] text-white/50">Trigger: {link.trigger}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Interactive Controls & UI Elements */}
          <div className="bg-[#18201B] border border-white/10 p-4 rounded-md">
            <h3 className="text-xs font-bold text-[#F27A22] uppercase mb-2 flex items-center gap-1.5">
              <span>🎛️</span>
              <span>Interactive Controls &amp; Form Elements</span>
            </h3>
            <div className="space-y-2 text-xs font-light">
              {currentPage.controls.map((ctrl, idx) => (
                <div key={idx} className="bg-[#111713] p-2.5 rounded border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <strong className="font-normal text-white/95">{ctrl.name}</strong>
                    <span className="text-[10px] bg-[#242C26] px-2 py-0.5 rounded text-white/70">{ctrl.type}</span>
                  </div>
                  <p className="text-[11px] text-white/60">{ctrl.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Special Architectural & Compliance Notes */}
          <div className="bg-[#18201B] border border-white/10 p-4 rounded-md">
            <h3 className="text-xs font-bold text-[#4ADE80] uppercase mb-2 flex items-center gap-1.5">
              <span>⚖️</span>
              <span>Architectural &amp; Compliance Notes</span>
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-white/80 font-light">
              {currentPage.specialNotes.map((note, idx) => (
                <li key={idx} className="leading-snug">{note}</li>
              ))}
            </ul>
          </div>

          {/* 4. Founder Approval & Feedback Console */}
          <div className="bg-[#1C2620] border-2 border-[#E5B842] p-4 rounded-md shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#E5B842] uppercase flex items-center gap-1.5">
                <span>🛡️</span>
                <span>Founder Sign-off &amp; Review Console</span>
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
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

            {/* Founder Note Textarea */}
            <textarea
              value={currentApproval.note}
              onChange={(e) => handleUpdateNote(currentPage.id, e.target.value)}
              placeholder="Add founder review feedback or copy tweak instructions here..."
              rows={3}
              className="w-full bg-[#111713] border border-white/20 text-white rounded p-2.5 text-xs font-light focus:outline-none focus:border-[#E5B842]"
            />

            {/* Approval Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleUpdateStatus(currentPage.id, 'approved')}
                className="flex-1 bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] font-bold text-xs py-2 rounded border border-[#141B16] transition"
              >
                ✓ Approve Page for Production
              </button>
              <button
                onClick={() => handleUpdateStatus(currentPage.id, 'changes-requested')}
                className="flex-1 bg-[#2C1818] hover:bg-[#3D1E1E] text-[#EF4444] font-bold text-xs py-2 rounded border border-[#EF4444]/40 transition"
              >
                ⚠️ Request Edits
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
