'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

interface LeadProject {
  id: string
  jobCode: string
  city: string
  neighborhood: string
  footage: number
  style: string
  estBudget: string
  seatCost: number
  seatsClaimed: number
  seatsTotal: number
  timeLeft: string
  status: 'active' | 'filled'
  postedAgo: string
}

const MARKETPLACE_PROJECTS: LeadProject[] = [
  {
    id: 'lead-98045-8921',
    jobCode: 'JOB #NB-8921',
    city: 'North Bend, WA 98045',
    neighborhood: 'Si View Community (Lot 42)',
    footage: 140,
    style: "6' Heritage Cedar 3-Rail Privacy (Si View Section 4.2 Approved)",
    estBudget: '$6,720 ($48.00 / LF)',
    seatCost: 39,
    seatsClaimed: 2,
    seatsTotal: 3,
    timeLeft: '46h 18m left',
    status: 'active',
    postedAgo: '42m ago',
  },
  {
    id: 'lead-98065-4412',
    jobCode: 'JOB #SN-4412',
    city: 'Snoqualmie, WA 98065',
    neighborhood: 'Snoqualmie Ridge (Cascade View)',
    footage: 180,
    style: "6' Horizon Modern Horizontal Stack (Pre-Stained Chestnut)",
    estBudget: '$10,080 ($56.00 / LF)',
    seatCost: 69,
    seatsClaimed: 1,
    seatsTotal: 3,
    timeLeft: '68h 12m left',
    status: 'active',
    postedAgo: '2h ago',
  },
  {
    id: 'lead-98027-1193',
    jobCode: 'JOB #IS-1193',
    city: 'Issaquah, WA 98027',
    neighborhood: 'Issaquah Highlands (Squak Valley)',
    footage: 95,
    style: "6' Estate Picture Frame with 2x4 Top Cap",
    estBudget: '$4,940 ($52.00 / LF)',
    seatCost: 39,
    seatsClaimed: 3,
    seatsTotal: 3,
    timeLeft: 'FILLED (Linger 24h)',
    status: 'filled',
    postedAgo: '14h ago',
  },
  {
    id: 'lead-98038-7724',
    jobCode: 'JOB #MV-7724',
    city: 'Maple Valley, WA 98038',
    neighborhood: 'Cedar Creek Greenbelt Reserve',
    footage: 220,
    style: "6' Good Neighbor Alternating Shadowbox with 2x12 Kickboard",
    estBudget: '$10,560 ($48.00 / LF)',
    seatCost: 69,
    seatsClaimed: 0,
    seatsTotal: 3,
    timeLeft: '71h 50m left',
    status: 'active',
    postedAgo: '10m ago',
  },
]

export default function MarketplaceProjectsPage() {
  const [filterFootage, setFilterFootage] = useState<string>('all')

  const filteredProjects = MARKETPLACE_PROJECTS.filter((p) => {
    if (filterFootage === 'small') return p.footage < 100
    if (filterFootage === 'medium') return p.footage >= 100 && p.footage <= 180
    if (filterFootage === 'large') return p.footage > 180
    return true
  })

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── BREADCRUMBS ── */}
        <div className="text-xs text-white/50 mb-4 flex items-center gap-2" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-white/70">Home</Link>
          <span>/</span>
          <span className="text-[#4ADE80]">Contractor Marketplace Dispatch</span>
        </div>

        {/* ── HEADER BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-10 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#10261A',
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(180deg, #0C1E15 0%, #133323 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#4ADE80]/20 border border-[#4ADE80] px-3 py-1 rounded text-xs text-[#4ADE80] font-bold uppercase tracking-wider mb-3">
                <span>⚡</span>
                <span>Pillar 3 · Contractor Marketplace Dispatch</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.4rem', color: '#4ADE80', lineHeight: 1.15, marginBottom: '0.4rem' }}>
                Verified Contractor Lead Feed
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
                100% pre-scoped fence builds with attached 8.5" × 11" ARC Blueprints and itemized lumber takeoffs. Strictly capped at 3 contractor seats per project.
              </p>
            </div>

            {/* Anti-Angi Monopoly Badge */}
            <div className="bg-[#0A140E] border-2 border-[#E5B842] p-4 rounded-lg flex flex-col gap-1 text-center min-w-[240px]">
              <span style={{ ...rowdies(700), fontSize: '0.75rem', color: '#E5B842', textTransform: 'uppercase' }}>
                ANTI-MONOPOLY PROMISE
              </span>
              <span style={{ ...rowdies(700), fontSize: '1.1rem', color: '#4ADE80' }}>
                Max 3 Seats Per Lead
              </span>
              <span style={{ ...rowdies(300), fontSize: '0.72rem', color: '#B5C2BA' }}>
                Zero Lead Reselling · 72-Hr Limit
              </span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span style={{ ...rowdies(400), fontSize: '0.85rem', color: '#E5B842', marginRight: '0.5rem' }}>
                Footage:
              </span>
              {[
                { id: 'all', label: 'All Sizes' },
                { id: 'small', label: '< 100 LF' },
                { id: 'medium', label: '100–180 LF' },
                { id: 'large', label: '> 180 LF' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilterFootage(f.id)}
                  style={{
                    ...rowdies(filterFootage === f.id ? 700 : 400),
                    fontSize: '0.8rem',
                    padding: '0.35rem 0.8rem',
                    borderRadius: 4,
                    border: filterFootage === f.id ? '1.5px solid #4ADE80' : '1.5px solid rgba(255,255,255,0.15)',
                    background: filterFootage === f.id ? '#4ADE80' : 'rgba(20,27,22,0.6)',
                    color: filterFootage === f.id ? '#141B16' : '#DBD0BD',
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <Link
              href="/contractors/onboarding"
              className="text-xs text-[#E5B842] hover:underline"
              style={{ ...rowdies(400) }}
            >
              Verify Your WA L&amp;I License →
            </Link>
          </div>
        </section>

        {/* ── PROJECT LEADS GRID ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredProjects.map((project) => {
            const isFilled = project.status === 'filled'
            const seatsRemaining = project.seatsTotal - project.seatsClaimed

            return (
              <div
                key={project.id}
                className="has-outside-corners flex flex-col justify-between p-6 rounded-lg relative"
                style={{
                  background: isFilled ? '#141815' : '#121814',
                  backgroundImage:
                    'linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  border: isFilled ? '2px solid rgba(255,255,255,0.1)' : '2px solid var(--ink)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                  opacity: isFilled ? 0.75 : 1,
                }}
              >
                <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
                <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

                <div>
                  {/* Top Header */}
                  <div className="flex justify-between items-center mb-3">
                    <span style={{ ...rowdies(700), fontSize: '0.8rem', color: isFilled ? '#888' : '#4ADE80' }}>
                      {project.jobCode} · {project.neighborhood}
                    </span>
                    <span
                      style={{
                        ...rowdies(700),
                        fontSize: '0.7rem',
                        background: isFilled ? '#333' : '#E5B842',
                        color: '#141B16',
                        padding: '0.15rem 0.5rem',
                        borderRadius: 3,
                      }}
                    >
                      {project.postedAgo}
                    </span>
                  </div>

                  {/* Project Location & Specs */}
                  <h3 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#FAF6EE', marginBottom: '0.3rem' }}>
                    {project.footage} LF · {project.city}
                  </h3>

                  <p style={{ ...rowdies(300), fontSize: '0.84rem', color: '#DBD0BD', marginBottom: '1rem', lineHeight: 1.45 }}>
                    {project.style}
                  </p>

                  {/* Verified Badges */}
                  <div className="bg-[#0A0F0C] p-3 rounded border border-white/10 mb-4 space-y-1 text-xs text-[#B5C2BA]" style={{ ...rowdies(300) }}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#4ADE80]">✓</span>
                      <span><strong>Official ARC Blueprint Attached</strong> (8.5" × 11" PDF)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#4ADE80]">✓</span>
                      <span><strong>Itemized Lumber Takeoff (BOM)</strong> (Quantities verified)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#4ADE80]">✓</span>
                      <span><strong>Homeowner Budget:</strong> {project.estBudget}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div style={{ ...rowdies(700), fontSize: '0.82rem', color: isFilled ? '#EF4444' : seatsRemaining === 1 ? '#F27A22' : '#E5B842' }}>
                      {isFilled ? '🔒 ALL 3 SEATS CLAIMED (CLOSED)' : `⚡ ${project.seatsClaimed} of ${project.seatsTotal} Seats Claimed (${seatsRemaining} Left!)`}
                    </div>
                    <span style={{ ...rowdies(300), fontSize: '0.72rem', color: '#8E9A92' }}>
                      {project.timeLeft}
                    </span>
                  </div>

                  {!isFilled ? (
                    <Link
                      href={`/contractor/match/${project.id}`}
                      style={{
                        ...rowdies(700),
                        fontSize: '0.82rem',
                        backgroundColor: '#4ADE80',
                        color: '#141B16',
                        padding: '0.6rem 1rem',
                        borderRadius: 4,
                        textAlign: 'center',
                        textDecoration: 'none',
                        border: '2px solid #141B16',
                        display: 'inline-block',
                        textTransform: 'uppercase',
                        boxShadow: '0 3px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      Claim Seat (${project.seatCost}) →
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="bg-[#222] text-white/40 px-4 py-2 rounded text-xs font-bold border border-white/10 cursor-not-allowed"
                    >
                      Board Closed
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
