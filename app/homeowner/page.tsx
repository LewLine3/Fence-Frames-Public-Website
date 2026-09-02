'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'
import { ACCOUNT_ROLES } from '@/lib/account-roles'

interface SavedBuild {
  id: string;
  name: string;
  location: string;
  specs: string;
  style: string;
  height: number;
  lf: number;
  costMin: number;
  costMax: number;
  savedDate: string;
  arcStatus: 'pre-approved' | 'in-review' | 'action-required';
  bidsCount: number;
}

export default function HomeownerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'builds' | 'bids' | 'arc'>('builds')
  const [builds, setBuilds] = useState<SavedBuild[]>([
    {
      id: 'FF-98045-8912',
      name: 'Backyard Perimeter — Si View Heritage 3-Rail',
      location: '1420 Mt Si Blvd, North Bend, WA 98045',
      specs: '120 LF • 6ft Height • Clear Cedar Pickets • Factory Cedar Natural Pre-Stain',
      style: 'Heritage 3-Rail Board-on-Board',
      height: 6,
      lf: 120,
      costMin: 5940,
      costMax: 6825,
      savedDate: 'Aug 22, 2026',
      arcStatus: 'pre-approved',
      bidsCount: 2,
    },
    {
      id: 'FF-98045-3142',
      name: 'Side Lot & Garden Gate — Modern Horizontal Slat',
      location: '1420 Mt Si Blvd, North Bend, WA 98045',
      specs: '45 LF • 4ft Height • 1x6 Horizontal Siding • 1x 4ft Walk Gate',
      style: 'Modern Horizontal Slat',
      height: 4,
      lf: 45,
      costMin: 2250,
      costMax: 2700,
      savedDate: 'Aug 19, 2026',
      arcStatus: 'pre-approved',
      bidsCount: 1,
    }
  ])

  return (
    <SiteShell
      width="dashboard"
      bleed={
        <div
          className="has-outside-corners p-6 sm:p-8 rounded-lg relative overflow-hidden"
          style={{
            backgroundColor: '#102B1E',
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(180deg, #0C1F15 0%, #16432D 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          }}
        >
          <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 bg-[#4ADE80] text-[#141B16] rounded">PILLAR 3 · FENCE IT</span>
                <span className="text-xs font-bold text-[#4ADE80] bg-[#4ADE80]/10 px-2 py-0.5 rounded border border-[#4ADE80]/30">✓ VERIFIED PROPERTY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#FAF6EE] tracking-tight">
                Welcome Back, John Smith
              </h1>
              <p className="text-xs text-white/70 font-light flex items-center gap-1.5 mt-1">
                <span>📍</span>
                <span>1420 Mt Si Blvd, North Bend, WA 98045</span>
                <span className="text-[#E5B842] font-bold">(Si View HOA · Lot #42)</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/designer"
                className="bg-[#E5B842] hover:bg-[#d4a732] text-[#141B16] font-bold text-xs uppercase px-5 py-2.5 rounded border-2 border-[#141B16] shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2"
              >
                <span>+</span>
                <span>Start New Fence Build</span>
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT / MAIN COLUMN (SAVED BUILDS & BLUEPRINTS) */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-2">
            <h2 className="text-sm font-bold uppercase text-[#E5B842] flex items-center gap-2">
              <span>📁</span>
              <span>My Saved Fence-Folios ({builds.length})</span>
            </h2>
            <span className="text-xs text-[#555] font-light font-mono">Zero-Data-Loss Active</span>
          </div>

          <div className="space-y-5">
            {builds.map((b) => (
              <div
                key={b.id}
                className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
                style={{
                  background: '#FAF6EE',
                  border: '2px solid #1A1A1A',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                }}
              >
                <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
                <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

                {/* Ink Title Bar */}
                <div className="bg-[#1A1A1A] text-[#E5B842] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-sm">{b.name}</h3>
                    <span className="text-[10px] text-[#E5B842]/70 font-light">Doc Hash: {b.id} · Saved {b.savedDate}</span>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#4ADE80] text-[#141B16]">
                    ✓ SI VIEW ARC PRE-APPROVED
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs text-[#444] font-light mb-3">
                    {b.specs}
                  </p>

                  <div className="bg-[#E8F5EE] p-3 rounded border border-[#4ADE80]/30 flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-[10px] text-[#444] uppercase block">Contractor Bid Estimate</span>
                      <strong className="text-[#16432D] text-sm">
                        ${b.costMin.toLocaleString()} – ${b.costMax.toLocaleString()}
                      </strong>
                      <span className="text-[11px] text-[#555] font-mono ml-1.5">
                        (${Math.round(b.costMin / b.lf)} – ${Math.round(b.costMax / b.lf)} / LF)
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#444] uppercase block">Marketplace Status</span>
                      <span className="text-xs font-bold text-[#E5B842] flex items-center gap-1 justify-end">
                        <span>⚡</span>
                        <span>{b.bidsCount} Builder Bids Received</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#1A1A1A]/15">
                    <Link
                      href="/blueprint"
                      className="bg-[#141B16] hover:bg-[#242D26] text-[#4ADE80] border border-[#4ADE80]/40 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <span>📄</span>
                      <span>View 8.5&quot; × 11&quot; ARC Blueprint</span>
                    </Link>

                    <Link
                      href="/designer"
                      className="bg-[#16432D] text-[#FAF6EE] border border-[#16432D]/60 px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition"
                    >
                      <span>✏️</span>
                      <span>Modify in Designer</span>
                    </Link>

                    <Link
                      href="/contractors/match"
                      className="bg-[#E5B842] hover:bg-[#d4a732] text-[#141B16] px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 transition shadow"
                    >
                      <span>⚡</span>
                      <span>Review Bids &amp; Claim Seat</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN (ARC & CONTRACTOR BID TRACKER) */}
        <section className="lg:col-span-4 flex flex-col gap-6">

          {/* CARD 1: HOA ARC APPROVAL STATUS */}
          <div
            className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
            style={{ background: '#FAF6EE', border: '2px solid #1A1A1A', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}
          >
            <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />
            <div className="bg-[#1A1A1A] text-[#E5B842] px-4 py-2 text-xs font-bold uppercase flex items-center gap-1.5">
              <span>🏛️</span>
              <span>HOA ARC Approval Status</span>
            </div>
            <div className="p-4">
              <div className="bg-[#E8F5EE] p-3 rounded border border-[#4ADE80]/30 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse"></span>
                  <strong className="text-xs text-[#16432D]">Pre-Approved Architecture</strong>
                </div>
                <p className="text-[11px] text-[#444] font-light leading-snug">
                  Heritage 3-Rail matches Si View HOA Section 4.2 Guidelines. No ARC hearings required.
                </p>
              </div>
              <Link
                href="/blueprint"
                className="w-full bg-[#141B16] hover:bg-[#242D26] text-[#FAF6EE] text-center py-2 rounded text-xs font-bold border border-[#1A1A1A] block transition"
              >
                📥 Download Signed ARC PDF Packet
              </Link>
            </div>
          </div>

          {/* CARD 2: CONTRACTOR BID DISPATCH (3-SEAT SCRAMBLE) */}
          <div
            className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
            style={{ background: '#FAF6EE', border: '2px solid #1A1A1A', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}
          >
            <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />
            <div className="bg-[#1A1A1A] text-[#E5B842] px-4 py-2 flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase flex items-center gap-1.5">
                <span>⚡</span>
                <span>Live Contractor Bids</span>
              </h3>
              <span className="text-[10px] bg-[#E5B842] text-[#141B16] px-1.5 py-0.5 rounded font-bold">2 of 3 Seats</span>
            </div>
            <div className="p-4">
              <div className="space-y-2.5 mb-4">
                <div className="bg-[#E8F5EE] p-2.5 rounded border border-[#4ADE80]/20 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs text-[#1A1A1A]">Cascade Fence Co.</strong>
                    <span className="text-[#16432D] text-xs font-bold">$5,580</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#555]">
                    <span>Start: Sept 12 · ★ 4.9 (42)</span>
                    <span className="font-mono">$46.50 / LF</span>
                  </div>
                </div>

                <div className="bg-[#E8F5EE] p-2.5 rounded border border-[#4ADE80]/20 flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs text-[#1A1A1A]">Mt. Si Woodworks</strong>
                    <span className="text-[#16432D] text-xs font-bold">$5,880</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-[#555]">
                    <span>Start: Sept 05 · ★ 5.0 (28)</span>
                    <span className="font-mono">$49.00 / LF</span>
                  </div>
                </div>
              </div>

              <Link
                href="/contractors/match"
                className="w-full bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] text-center py-2 rounded text-xs font-bold block transition"
              >
                🔒 Accept Bid &amp; Lock Schedule
              </Link>
            </div>
          </div>

          {/* CARD 3: HOMEOWNER TOOLBOX */}
          <div
            className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
            style={{ background: '#FAF6EE', border: '2px solid #1A1A1A', boxShadow: '0 6px 18px rgba(0,0,0,0.12)' }}
          >
            <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />
            <div className="bg-[#1A1A1A] text-[#E5B842] px-4 py-2 text-xs font-bold uppercase flex items-center gap-1.5">
              <span>🧰</span>
              <span>{ACCOUNT_ROLES.founder.name} Toolbox</span>
            </div>
            <div className="p-4 space-y-1.5 text-xs font-light text-[#444]">
              <div className="bg-[#E8F5EE] p-2 rounded border border-[#16432D]/15 hover:bg-[#DDF0E6] cursor-pointer flex justify-between items-center">
                <span>📐 Property Line Setback Estimator</span>
                <span>→</span>
              </div>
              <div className="bg-[#E8F5EE] p-2 rounded border border-[#16432D]/15 hover:bg-[#DDF0E6] cursor-pointer flex justify-between items-center">
                <span>🪵 Wood Species Durability Guide</span>
                <span>→</span>
              </div>
              <div className="bg-[#E8F5EE] p-2 rounded border border-[#16432D]/15 hover:bg-[#DDF0E6] cursor-pointer flex justify-between items-center">
                <span>⚖️ North Bend Permit Bylaws</span>
                <span>→</span>
              </div>
            </div>
          </div>

        </section>

      </div>
    </SiteShell>
  )
}
