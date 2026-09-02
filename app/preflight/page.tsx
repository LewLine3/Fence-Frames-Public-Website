'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface PageSpec {
  id: string;
  tier: string;
  status: 'live' | 'in-progress' | 'spec-ready';
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
  // --- CORE & LIVE ROUTES ---
  {
    id: 'CORE-01',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'Master Homepage & Brand Portal',
    route: '/',
    pillar: 'Multi-Pillar Convergence',
    pillarColor: '#E5B842',
    purpose: 'Universal front door for Fence Frames. Converts visitors into active design sessions via 3 clear pathways (Code/HOA Matcher, Design Catalog, Instant Configurator).',
    outboundLinks: [
      { label: 'Start Designing', route: '/designer', trigger: 'Hero Primary CTA' },
      { label: 'Si View HOA Hub', route: '/wa/king-county/north-bend/si-view', trigger: 'Featured HOA Card' },
      { label: 'Browse Catalog', route: '/catalog', trigger: 'Frame It Catalog section' },
      { label: 'Contractor Marketplace', route: '/contractors/projects', trigger: 'Nav & Footer links' },
    ],
    controls: [
      { name: 'ZIP Code & HOA Search Input', type: 'Text Input + Matcher', purpose: 'Matches user to city/HOA pre-approved fence codes.' },
      { name: '3-Pillar Step Cards (Find, Frame, Fence)', type: 'Interactive Step Cards', purpose: 'Educates visitors on the 3-step customer journey.' },
      { name: '15-Style Cycling Slideshow', type: 'Interactive Carousel', purpose: 'Live preview of flagship fence styles with wood grain framing.' },
      { name: 'Fence-Folio Chapter Viewer', type: '6-Chapter Viewer', purpose: 'Interactive preview of the multi-page deliverables.' },
    ],
    specialNotes: [
      'Pre-loads Rowdies 700/400/300 font tokens.',
      'Signature 25px minor / 100px major green drafting grid background.',
      'Zero-data-loss guest session storage integration.',
    ],
  },
  {
    id: 'DSGN-03',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'The Universal 2D CAD Designer',
    route: '/designer',
    pillar: 'Frame It (Ember Orange)',
    pillarColor: '#F27A22',
    purpose: 'Universal parametric 2D CAD engine. Renders dual Front & Back elevations in real time with 8 pricing metrics, dynamic stain shader, and live BOM calculation.',
    outboundLinks: [
      { label: 'Portrait ARC Blueprint', route: '/blueprint', trigger: 'Save Fence-Folio & Get Blueprint CTA' },
      { label: 'Auth Gate', route: '/auth-gate', trigger: 'Guest draft preservation bridge' },
      { label: 'Contractor Targeted Match', route: '/contractor/match', trigger: 'Match 3 Local Builders CTA' },
    ],
    controls: [
      { name: 'Linear Footage Slider (10-400 LF)', type: 'Range Slider', purpose: 'Recalculates all 8 pricing metrics in real time.' },
      { name: 'Sub-Flip Rail (Metrics #1 to #8)', type: 'Accordion Horizontal Bar', purpose: 'Controls Height, Posts, Rails, Fill, Stain, Trim, Fasteners, Gates.' },
      { name: 'CAD Elevation Stage (Dual / Front / Back)', type: 'Vector Elevation Stage', purpose: 'Real-time SVG rendering with 50-200% zoom and dynamic stain shader.' },
      { name: 'Custom Gate Studio Modal', type: 'Modal Dialog', purpose: 'Adds 4ft/5ft Walk Gates and 10ft/12ft Double Drive Gates.' },
      { name: 'Live Estimate HUD', type: 'Endless Bottom Carousel', purpose: 'Displays itemized $/LF and subtotal breakdowns.' },
    ],
    specialNotes: [
      'Strictly implements the Canonical 8-Metric Pricing Architecture.',
      'Saves full design state into browser sessionStorage for zero-data-loss auth handoff.',
      'Dual 8:3 and 4:3 CAD viewports with 112×96 standard viewBox.',
    ],
  },
  {
    id: 'CORE-03',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'Portrait 8.5" × 11" ARC Blueprint',
    route: '/blueprint',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'Official architectural submittal document for HOA ARC committees, city building departments, and contractor bidding sheets.',
    outboundLinks: [
      { label: 'Back to Designer', route: '/designer', trigger: 'Edit Design Parameters button' },
      { label: 'Homeowner Dashboard', route: '/homeowner', trigger: 'Save to My Account CTA' },
      { label: 'Contractor Scramble', route: '/contractor/match', trigger: 'Request 3 Bids with this Blueprint' },
    ],
    controls: [
      { name: 'Print Blueprint Button', type: 'Dedicated Print CTA', purpose: 'Triggers browser window.print() formatted for portrait 8.5x11 PDF.' },
      { name: 'Pricing ON / OFF Toggle', type: 'Compliance Switch', purpose: 'Hides dollar amounts when submitting to HOA ARC committees (as required by law).' },
      { name: 'HOA Pre-Approval Stamp', type: 'Verified Badge', purpose: 'Displays Si View ARC pre-approval stamp and setback notes.' },
      { name: 'Parametric BOM Takeoff Table', type: 'Takeoff Ledger', purpose: 'Lists itemized lumber counts, post depth, fasteners, and stain gallons.' },
    ],
    specialNotes: [
      'Implements clean CSS @media print layout with page-break-inside avoid.',
      'Strict PE Stamp liability disclaimer per Handbook §15.',
    ],
  },
  {
    id: 'CORE-02',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'SMS OTP Auth Gate & Draft Preserver',
    route: '/auth-gate',
    pillar: 'Portals & Auth (Royal Blue)',
    pillarColor: '#3B82F6',
    purpose: 'Frictionless 2-step SMS OTP authentication intercepting unauthenticated users attempting to save custom builds, unmask lumber BOM, or download ARC Blueprints.',
    outboundLinks: [
      { label: 'Homeowner Dashboard', route: '/homeowner', trigger: 'On successful phone verification' },
      { label: 'ARC Blueprint', route: '/blueprint', trigger: 'Direct blueprint unlock' },
    ],
    controls: [
      { name: 'Role Gateway Selector', type: 'Tab Switcher', purpose: 'Switches between Homeowner, HOA Board, and Contractor Dispatch modes.' },
      { name: 'Phone Input + SMS OTP Flow', type: '2-Step Verification', purpose: 'Sends 6-digit pin via Telnyx with 120s countdown timer.' },
      { name: 'Locked Draft Preview', type: 'CAD Elevation Thumbnail', purpose: 'Shows live preview of the drafted fence before auth completion.' },
    ],
    specialNotes: [
      'Zero-data-loss architecture: preserves guest sessionStorage through authentication.',
      'A2P 10DLC compliant transactional SMS dispatch.',
    ],
  },
  {
    id: 'HOME-01',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'Homeowner Command Center & Dashboard',
    route: '/homeowner',
    pillar: 'Portals & Homeowner Hub (Royal Blue)',
    pillarColor: '#3B82F6',
    purpose: 'Authenticated homeowner command center. Houses saved Fence-Folios, tracks Si View ARC approval status, and monitors real-time contractor bids.',
    outboundLinks: [
      { label: 'Start New Build', route: '/designer', trigger: 'Header Primary CTA' },
      { label: 'View 8.5x11 Blueprint', route: '/blueprint', trigger: 'Project Card View Blueprint' },
      { label: 'Marketplace Bids', route: '/contractor/match', trigger: 'Review Bids & Claim Seat' },
    ],
    controls: [
      { name: 'Saved Builds Gallery', type: 'Tactile Card List', purpose: 'Displays saved configurations with 50% corner marks and live pricing.' },
      { name: 'ARC Status Card', type: 'Verified Status Plate', purpose: 'Shows Si View Section 4.2 compliance and downloads signed ARC packets.' },
      { name: 'Live 3-Seat Bid Tracker', type: 'Scramble Dispatch Plate', purpose: 'Displays received contractor bids, $/LF rates, and lock schedule button.' },
    ],
    specialNotes: [
      'Features signature green CAD grid and solid card fills.',
      'Hydrates user builds from Supabase database or local session.',
    ],
  },
  {
    id: 'LEGAL-01',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'Terms of Service & Brand Firewall',
    route: '/terms',
    pillar: 'Legal & Governance',
    pillarColor: '#64748B',
    purpose: 'Terms of Service defining platform rules, professional engineering (PE) disclaimers, contractor marketplace liability limits, and the Brand Firewall disclosure.',
    outboundLinks: [
      { label: 'Privacy Policy', route: '/privacy', trigger: 'Footer link & cross-reference' },
      { label: 'Homepage', route: '/', trigger: 'Header wordmark' },
    ],
    controls: [
      { name: 'PE Stamp Liability Notice', type: 'Callout Plate', purpose: 'Clarifies that platform documents are architectural guides, not PE certified.' },
      { name: 'Brand Firewall Disclosure', type: 'Docked Plate', purpose: 'Affirms independence from specific contractor entities per Handbook §15.' },
    ],
    specialNotes: [
      'Strictly aligned with Handbook §15 (Legal & Entity) and §10 (Disputes).',
    ],
  },
  {
    id: 'LEGAL-02',
    tier: 'Tier 1 (Core)',
    status: 'live',
    title: 'Privacy Policy & Data Security',
    route: '/privacy',
    pillar: 'Legal & Governance',
    pillarColor: '#64748B',
    purpose: 'Privacy policy detailing guest sessionStorage handling, Supabase RLS encryption, Stripe PCI compliance, and Telnyx A2P 10DLC SMS consent.',
    outboundLinks: [
      { label: 'Terms of Service', route: '/terms', trigger: 'Footer link & cross-reference' },
      { label: 'Homepage', route: '/', trigger: 'Header wordmark' },
    ],
    controls: [
      { name: 'SMS Consent & Opt-Out Terms', type: 'Section block', purpose: 'Complies with CTIA and Telnyx 10DLC requirements.' },
      { name: 'Data Access & Deletion Rights', type: 'Action contact', purpose: 'Provides direct privacy request intake.' },
    ],
    specialNotes: [
      'Zero third-party advertising cookies or trackers.',
    ],
  },

  // --- SPRINT 2: DESIGN SUITE HUB & MODALITIES ---
  {
    id: 'DSGN-01',
    tier: 'Tier 2 (Design Hub)',
    status: 'live',
    title: 'Design Suite Hub (Frame Chooser)',
    route: '/frame',
    pillar: 'Frame It (Ember Orange)',
    pillarColor: '#F27A22',
    purpose: 'Central design gateway routing homeowners to (1) Pre-Built Catalog (/catalog), (2) Custom 2D CAD Designer (/designer), or (3) Guided Style Match Wizard (/wizard).',
    outboundLinks: [
      { label: 'Pre-Built Catalog', route: '/catalog', trigger: 'Catalog Pathway Card' },
      { label: 'CAD Designer Studio', route: '/designer', trigger: 'Custom CAD Pathway Card' },
      { label: 'Style Match Wizard', route: '/wizard', trigger: 'Guided Match Pathway Card' },
    ],
    controls: [
      { name: '3-Pathway Decision Matrix', type: 'Graduated Card Triad', purpose: 'Guides homeowners to the right design modality based on customization need.' },
      { name: 'HOA Code Preset Filter', type: 'Dropdown Selector', purpose: 'Filters design paths by local Washington HOA guidelines.' },
    ],
    specialNotes: ['Governed by Handbook §01 and Spec DSGN-01.'],
  },
  {
    id: 'DSGN-02',
    tier: 'Tier 2 (Catalog)',
    status: 'live',
    title: 'Pre-Built Fence Catalog Carousel',
    route: '/catalog',
    pillar: 'Frame It (Ember Orange)',
    pillarColor: '#F27A22',
    purpose: 'Curated 12+ pre-configured fence styles in a responsive carousel (3 cards desktop / 1 card swipe mobile) with instant footage sliders and 1-click CAD customization.',
    outboundLinks: [
      { label: 'Open in CAD Designer', route: '/designer', trigger: 'Customize Footage in Designer CTA' },
      { label: 'Get Instant Blueprint', route: '/blueprint', trigger: 'Quick Blueprint CTA' },
    ],
    controls: [
      { name: 'Style Filter Chips', type: 'Pill Bar', purpose: 'Filters by Privacy, Semi-Privacy, Picket, Split Rail, and Modern Horizontal.' },
      { name: 'Interactive Footage Counter', type: 'Quick Slider', purpose: 'Adjusts LF on the fly with live $/LF price updates.' },
    ],
    specialNotes: ['Governed by Spec DSGN-02.'],
  },
  {
    id: 'DSGN-WIZ',
    tier: 'Tier 2 (Wizard)',
    status: 'live',
    title: 'Guided Detail Style Wizard',
    route: '/wizard',
    pillar: 'Frame It (Ember Orange)',
    pillarColor: '#F27A22',
    purpose: '4-step progressive questionnaire (Pets & Security, Terrain Slope, Privacy Needs, Budget Target) with progressive SVG reveal across the 8 takeoff categories.',
    outboundLinks: [
      { label: 'View Matched Design', route: '/designer', trigger: 'Complete Wizard CTA' },
      { label: 'Download Matched Blueprint', route: '/blueprint', trigger: 'Direct Blueprint Export' },
    ],
    controls: [
      { name: 'Progressive Step Indicator', type: '4-Step Stepper', purpose: 'Guides user through simple non-technical questions.' },
      { name: 'Dynamic SVG Live Builder', type: 'Reactive SVG Canvas', purpose: 'Visualizes fence assembling itself with each answer.' },
    ],
    specialNotes: ['Optimized for non-technical homeowners.'],
  },
  {
    id: 'HOME-02',
    tier: 'Tier 2 (Dossier)',
    status: 'live',
    title: 'Unified Fence-Folio Output Dossier',
    route: '/fence-folio',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'Multi-chapter 8.5" × 11" submittal flipbook and print sheet containing: Builders Blueprint, Pricing Ledger, Material List / BOM, and Community Specs.',
    outboundLinks: [
      { label: 'Edit in Designer', route: '/designer', trigger: 'Revise Specs button' },
      { label: 'Dispatch to Contractors', route: '/contractor/match', trigger: 'Get 3 Bids CTA' },
    ],
    controls: [
      { name: 'Chapter Flip Tabs (1-6)', type: 'Tab Navigation', purpose: 'Switches between Cover, Community, Materials, Blueprint, Add-ons, and Ledger.' },
      { name: 'ARC Clean Mode Toggle', type: 'Toggle Switch', purpose: 'Strips pricing data for formal HOA ARC review submissions.' },
    ],
    specialNotes: ['Governed by Handbook §02 and Spec HOME-02 / CORE-03.'],
  },

  // --- SPRINT 3: GEO SEO DIRECTORY ---
  {
    id: 'GEO-DIR',
    tier: 'Tier 3 (Geo SEO)',
    status: 'live',
    title: 'Washington State Directory (Find Hub)',
    route: '/wa',
    pillar: 'Find It (Sun Gold)',
    pillarColor: '#E5B842',
    purpose: 'State-level hub listing active Washington counties, regional search, climate/frost line advisories, and municipal zoning directory.',
    outboundLinks: [
      { label: 'King County Directory', route: '/wa/king-county', trigger: 'County Card' },
      { label: 'North Bend City Hub', route: '/wa/king-county/north-bend', trigger: 'Featured City' },
    ],
    controls: [
      { name: 'County Grid & Search Bar', type: 'Searchable Directory', purpose: 'Filters 39 WA counties by regional coverage density.' },
      { name: 'Frost Line & Wind Load Map', type: 'Regional Info Map', purpose: 'Shows WA structural building advisories.' },
    ],
    specialNotes: ['Statically pre-rendered with generateStaticParams for high-speed SEO.'],
  },
  {
    id: 'GEO-CIT-01',
    tier: 'Tier 3 (Geo SEO)',
    status: 'live',
    title: 'North Bend Flagship City Hub',
    route: '/wa/king-county/north-bend',
    pillar: 'Find It (Sun Gold)',
    pillarColor: '#E5B842',
    purpose: 'Municipal guide for North Bend, WA: building codes, Mt. Si wind load advisories (80mph exposure B), active HOA grid, and verified contractor directory.',
    outboundLinks: [
      { label: 'Si View Community Hub', route: '/wa/king-county/north-bend/si-view', trigger: 'Featured HOA Community' },
      { label: 'Launch Configurator with City Preset', route: '/designer?city=north-bend', trigger: 'Start City Build CTA' },
    ],
    controls: [
      { name: 'North Bend Code Summary Plate', type: 'Zoning Info Plate', purpose: 'Lists 6ft backyard / 4ft front yard height limits and permit exemptions.' },
      { name: 'Active HOA Directory Grid', type: 'Community Card Grid', purpose: 'Lists all HOAs in North Bend with pre-approved design links.' },
    ],
    specialNotes: ['Governed by Spec GEO-CIT-01.'],
  },
  {
    id: 'GEO-COM-01',
    tier: 'Tier 3 (Geo SEO)',
    status: 'live',
    title: 'Si View Flagship Community & HOA Hub',
    route: '/wa/king-county/north-bend/si-view',
    pillar: 'Find It (Sun Gold)',
    pillarColor: '#E5B842',
    purpose: 'Flagship HOA landing page: pre-approved designs (Designs 01–04), Fact-Matrix source badges, CC&R summary, and 1-click pre-seeded Designer launch.',
    outboundLinks: [
      { label: 'Open Si View Pre-Approved Design 01', route: '/designer?preset=si-view-design-01', trigger: 'Design 01 Quick Launch' },
      { label: 'Download Si View ARC Form', route: '/blueprint?hoa=si-view', trigger: 'ARC Packet CTA' },
    ],
    controls: [
      { name: '4 Pre-Approved Style Cards', type: 'Style Presets', purpose: 'Pre-seeds the 2D CAD Configurator with Si View Section 4.2 compliant specs.' },
      { name: 'CC&R Fact-Matrix Badge', type: 'Verified Badge Plate', purpose: 'Displays exact citations to Si View ARC guidelines.' },
    ],
    specialNotes: ['Governed by Spec GEO-COM-01.'],
  },

  // --- SPRINT 4: MARKETPLACE & CONTRACTORS ---
  {
    id: 'PRO-04',
    tier: 'Tier 4 (Marketplace)',
    status: 'spec-ready',
    title: 'Contractors / Projects Marketplace Dispatch',
    route: '/contractors/projects',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'Public contractor lead feed; 3-seat capped scramble lead board ($19–$99), 1 exclusive option ($79–$399), FILLED board linger (24h/72h), and verified BOM takeoff downloads.',
    outboundLinks: [
      { label: 'Claim Lead Seat', route: '/contractor/match', trigger: 'Claim 1 of 3 Seats button' },
      { label: 'Contractor Onboarding', route: '/contractors/onboarding', trigger: 'Join Verified Network CTA' },
    ],
    controls: [
      { name: '3-Seat Monopoly Scramble Counter', type: 'Live Seat Tracker', purpose: 'Shows remaining claimable spots (e.g. 2 of 3 Spots Remaining).' },
      { name: 'Project Takeoff Preview', type: 'BOM Summary Card', purpose: 'Displays LF, height, wood species, and estimated mid-quote.' },
    ],
    specialNotes: ['Strict Anti-Monopoly 3-Seat Cap enforced via Supabase purchase_lead_seat.'],
  },
  {
    id: 'PRO-05',
    tier: 'Tier 4 (Marketplace)',
    status: 'spec-ready',
    title: 'Targeted Match SMS Scramble Landing',
    route: '/contractor/match',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'High-urgency claim screen triggered via SMS alerts (Telnyx). 3-seat allocation countdown timer, 1-click Stripe claim, atomic Supabase purchase_lead_seat lock.',
    outboundLinks: [
      { label: 'Homeowner Contact Unlocked', route: '/contractors/projects', trigger: 'On successful Stripe checkout' },
    ],
    controls: [
      { name: '72-Hour Urgency Countdown Timer', type: 'Countdown Timer', purpose: 'Creates urgency before unallocated leads recycle.' },
      { name: '1-Click Stripe Seat Purchase', type: 'Stripe Payment Button', purpose: 'Claims 1 of 3 contractor seats with instant BOM takeoff unlock.' },
    ],
    specialNotes: ['Governed by Spec PRO-05.'],
  },
  {
    id: 'PRO-06',
    tier: 'Tier 4 (Marketplace)',
    status: 'spec-ready',
    title: 'Contractor Onboarding & WA Verification',
    route: '/contractors/onboarding',
    pillar: 'Fence It (Forest Green)',
    pillarColor: '#4ADE80',
    purpose: 'Contractor profile setup, WA L&I license verification, insurance check, Stripe card-on-file, and "First Spot Free" 1-ticket credit claim.',
    outboundLinks: [
      { label: 'Marketplace Lead Board', route: '/contractors/projects', trigger: 'On verification approval' },
    ],
    controls: [
      { name: 'WA L&I License Input', type: 'Verified License Lookup', purpose: 'Validates contractor active standing in Washington State.' },
      { name: '1st Spot Free Credit Claim', type: 'Promotion Plate', purpose: 'Grants 1 free lead claim credit to newly verified contractors.' },
    ],
    specialNotes: ['Governed by Handbook §08.'],
  },
  {
    id: 'ADM-01',
    tier: 'Tier 5 (Admin)',
    status: 'spec-ready',
    title: 'Admin Control Panel & Lead Review',
    route: '/admin',
    pillar: 'Admin Control',
    pillarColor: '#0F172A',
    purpose: 'Internal admin panel for Lead Review, Contractor Flag Queue, and Global SMS Kill Switches.',
    outboundLinks: [
      { label: 'Public Homepage', route: '/', trigger: 'Header Exit link' },
    ],
    controls: [
      { name: 'Lead Approval Queue', type: 'Action Table', purpose: 'Allows admin to review homeowner builds before SMS broadcast.' },
      { name: 'SMS Global Kill Switch', type: 'Safety Toggle', purpose: 'Instantly halts all automated Telnyx outgoing broadcasts.' },
    ],
    specialNotes: ['Protected by Supabase Admin role RLS.'],
  },
]

export default function PreflightReviewStudio() {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [layoutMode, setLayoutMode] = useState<'full' | 'split'>('full')
  const [zoomScale, setZoomScale] = useState<number>(0.75)
  const [filterPillar, setFilterPillar] = useState<string>('all')
  const [approvals, setApprovals] = useState<Record<string, { status: 'approved' | 'changes-requested' | 'pending'; note: string }>>({})

  const filteredRegistry = PAGE_REGISTRY.filter((p) => {
    if (filterPillar === 'all') return true
    if (filterPillar === 'live') return p.status === 'live'
    if (filterPillar === 'spec') return p.status === 'spec-ready'
    return p.pillar.toLowerCase().includes(filterPillar.toLowerCase())
  })

  const currentPage = filteredRegistry[currentIndex] || filteredRegistry[0] || PAGE_REGISTRY[0]

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

  const liveCount = PAGE_REGISTRY.filter(p => p.status === 'live').length
  const totalCount = PAGE_REGISTRY.length

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-row font-['Rowdies'] overflow-x-hidden">

      {/* MAIN CONTENT AREA (Left) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top Mini Header */}
        <header className="bg-[#101712] border-b border-white/10 px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link href="/" className="text-sm text-[#E5B842] flex items-center gap-1 font-bold mr-2 hover:opacity-80">
              <span>🌲</span>
              <span>FENCE FRAMES</span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-[#E5B842] text-[#141B16] rounded">
              {currentPage.id} · {currentPage.tier}
            </span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded text-white"
              style={{ backgroundColor: currentPage.pillarColor }}
            >
              {currentPage.pillar}
            </span>
            <span
              className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                currentPage.status === 'live'
                  ? 'bg-[#4ADE80] text-[#141B16]'
                  : 'bg-white/10 text-white/70 border border-white/20'
              }`}
            >
              {currentPage.status === 'live' ? '🟢 Live' : '📋 Spec Ready'}
            </span>
            <h1 className="text-white font-bold text-sm truncate max-w-[320px]">{currentPage.title}</h1>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/60">
            {/* Quick Filter Pill */}
            <div className="flex items-center bg-[#0A0F0C] border border-white/15 rounded p-0.5 text-[10px]">
              <button
                onClick={() => { setFilterPillar('all'); setCurrentIndex(0); }}
                className={`px-2 py-0.5 rounded ${filterPillar === 'all' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'text-white/70'}`}
              >
                All ({totalCount})
              </button>
              <button
                onClick={() => { setFilterPillar('live'); setCurrentIndex(0); }}
                className={`px-2 py-0.5 rounded ${filterPillar === 'live' ? 'bg-[#4ADE80] text-[#141B16] font-bold' : 'text-white/70'}`}
              >
                Live ({liveCount})
              </button>
              <button
                onClick={() => { setFilterPillar('spec'); setCurrentIndex(0); }}
                className={`px-2 py-0.5 rounded ${filterPillar === 'spec' ? 'bg-white/20 text-white font-bold' : 'text-white/70'}`}
              >
                Specs ({totalCount - liveCount})
              </button>
            </div>

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
              {currentPage.status === 'live' ? (
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
              ) : (
                <div className="w-full h-[600px] flex flex-col items-center justify-center text-center p-8 bg-[#0E1511] rounded border border-dashed border-white/20">
                  <span className="text-4xl mb-3">📋</span>
                  <h3 className="text-lg font-bold text-[#E5B842] mb-1">{currentPage.title}</h3>
                  <p className="text-xs text-white/60 font-light max-w-md mb-4 leading-relaxed">
                    This route ({currentPage.route}) is fully specified and queued in the Phase 1 build roadmap. Click below to inspect the specifications and data contracts.
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-3 py-1 bg-white/10 border border-white/20 rounded font-mono text-[#4ADE80]">
                      {currentPage.route}
                    </span>
                    <span className="text-xs px-3 py-1 bg-[#F27A22] text-[#141B16] font-bold rounded uppercase">
                      Queued Sprint Item
                    </span>
                  </div>
                </div>
              )}
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
                placeholder="Type quick design feedback for this page..."
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

      {/* ULTRA-TIGHT DOCKED RIGHT VERTICAL RAIL (68px) */}
      <aside className="w-[68px] min-w-[68px] max-w-[68px] bg-[#0E1511]/95 backdrop-blur-md border-l-2 border-[#E5B842]/60 h-screen sticky top-0 right-0 z-50 flex flex-col items-center justify-between py-3 px-1 shadow-[-4px_0_20px_rgba(0,0,0,0.7)] select-none">
        {/* Top Group */}
        <div className="flex flex-col items-center gap-2 w-full">
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
              className="w-11 h-7 rounded bg-[#162019] disabled:opacity-30 hover:bg-[#223026] border border-white/20 text-white font-bold text-xs flex items-center justify-center transition"
            >
              ▲
            </button>

            <select
              value={currentIndex}
              onChange={(e) => setCurrentIndex(Number(e.target.value))}
              title={`Page ${currentIndex + 1} of ${filteredRegistry.length}`}
              className="w-12 h-8 bg-[#162019] border-2 border-[#E5B842] text-[#E5B842] font-bold text-[11px] rounded text-center focus:outline-none cursor-pointer"
            >
              {filteredRegistry.map((p, idx) => (
                <option key={p.id} value={idx}>
                  {idx + 1} {p.status === 'live' ? '●' : '○'}
                </option>
              ))}
            </select>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(filteredRegistry.length - 1, prev + 1))}
              disabled={currentIndex === filteredRegistry.length - 1}
              title="Next Page (▼)"
              className="w-11 h-7 rounded bg-[#162019] disabled:opacity-30 hover:bg-[#223026] border border-white/20 text-white font-bold text-xs flex items-center justify-center transition"
            >
              ▼
            </button>
          </div>
        </div>

        {/* Middle Group */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-8 h-px bg-white/15"></div>

          {/* Layout Toggle */}
          <button
            onClick={() => setLayoutMode(layoutMode === 'full' ? 'split' : 'full')}
            title="Toggle Layout Mode"
            className="w-11 h-9 rounded-lg bg-[#162019] hover:bg-[#223026] border border-white/25 text-[#E5B842] flex flex-col items-center justify-center text-xs transition"
          >
            <span>{layoutMode === 'full' ? '⛶' : '◫'}</span>
            <span className="text-[8px] text-white/60 uppercase">{layoutMode === 'full' ? 'Full' : 'Split'}</span>
          </button>

          {/* Zoom Buttons */}
          <button onClick={() => setZoomScale(0.5)} title="Fit 50%" className="w-11 h-6 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-white/80 text-[10px] font-bold">50%</button>
          <button onClick={() => setZoomScale(0.75)} title="Zoom 75%" className="w-11 h-6 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-[#E5B842] text-[10px] font-bold">75%</button>
          <button onClick={() => setZoomScale(1.0)} title="Zoom 100%" className="w-11 h-6 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-white/80 text-[10px] font-bold">100%</button>

          <div className="flex items-center gap-0.5">
            <button onClick={() => setZoomScale(Math.max(0.35, zoomScale - 0.1))} className="w-5 h-6 rounded bg-[#162019] hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center">-</button>
            <button onClick={() => setZoomScale(Math.min(1.4, zoomScale + 0.1))} className="w-5 h-6 rounded bg-[#162019] hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center">+</button>
          </div>

          <div className="w-8 h-px bg-white/15"></div>

          {/* Viewports */}
          <button onClick={() => setDeviceView('desktop')} title="Desktop" className={`w-11 h-6 rounded text-xs flex items-center justify-center ${deviceView === 'desktop' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'bg-[#162019] text-white/60'}`}>🖥️</button>
          <button onClick={() => setDeviceView('tablet')} title="Tablet" className={`w-11 h-6 rounded text-xs flex items-center justify-center ${deviceView === 'tablet' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'bg-[#162019] text-white/60'}`}>📱</button>
          <button onClick={() => setDeviceView('mobile')} title="Mobile" className={`w-11 h-6 rounded text-xs flex items-center justify-center ${deviceView === 'mobile' ? 'bg-[#E5B842] text-[#141B16] font-bold' : 'bg-[#162019] text-white/60'}`}>📲</button>
        </div>

        {/* Bottom Group */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-8 h-px bg-white/15"></div>
          <button
            onClick={() => handleUpdateStatus(currentPage.id, currentApproval.status === 'approved' ? 'changes-requested' : 'approved')}
            title="Approve / Request Changes"
            className={`w-11 h-9 rounded-lg font-bold text-sm flex items-center justify-center shadow hover:scale-105 transition ${
              currentApproval.status === 'approved' ? 'bg-[#4ADE80] text-[#141B16]' :
              currentApproval.status === 'changes-requested' ? 'bg-[#EF4444] text-white' : 'bg-[#E5B842] text-[#141B16]'
            }`}
          >
            ✓
          </button>
          {currentPage.status === 'live' && (
            <a href={currentPage.route} target="_blank" title="Open Standalone Tab" className="w-11 h-7 rounded bg-[#162019] hover:bg-[#223026] border border-white/20 text-[#4ADE80] flex items-center justify-center text-xs transition">
              ↗
            </a>
          )}
        </div>
      </aside>

    </div>
  )
}
