'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function TargetedMatchScramblePage() {
  const [timeLeft, setTimeLeft] = useState(1422) // seconds
  const [claimed, setClaimed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      <main className="flex-1 max-w-[1100px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── HIGH URGENCY HEADER ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#26150D',
            backgroundImage:
              'linear-gradient(rgba(242,122,34,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(242,122,34,0.12) 1px, transparent 1px), linear-gradient(180deg, #1C0F08 0%, #2E180E 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid #F27A22',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F27A22]/20 border border-[#F27A22] px-3 py-1 rounded text-xs text-[#F27A22] font-bold uppercase tracking-wider mb-3 animate-pulse">
                <span>⚡</span>
                <span>Targeted Match SMS Scramble Active</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.2rem', color: '#FAF6EE', lineHeight: 1.15, marginBottom: '0.4rem' }}>
                New Verified Lead: Si View (North Bend, WA)
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.92rem', color: '#DBD0BD', margin: 0 }}>
                140 LF Heritage Cedar 3-Rail Privacy · Si View Lot #42 · Pre-Approved Section 4.2 Blueprint Attached.
              </p>
            </div>

            {/* Countdown Clock */}
            <div className="bg-[#120B06] border-2 border-[#F27A22] p-4 rounded-lg flex flex-col items-center justify-center min-w-[200px] text-center shadow-lg">
              <span style={{ ...rowdies(700), fontSize: '0.7rem', color: '#E5B842', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                TIME TO CLAIM
              </span>
              <span style={{ ...rowdies(700), fontSize: '2rem', color: '#F27A22', lineHeight: 1.1 }}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span style={{ ...rowdies(300), fontSize: '0.68rem', color: '#B5C2BA' }}>
                Before public marketplace release
              </span>
            </div>
          </div>
        </section>

        {/* ── 3-SEAT ALLOCATION WIDGET ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8"
          style={{
            background: '#121814',
            border: '2px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-gold" />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <h2 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#E5B842', marginBottom: '1rem' }}>
            3-Seat Monopoly Scramble Status (Strict 3-Contractor Cap)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Seat 1: Claimed */}
            <div className="bg-[#0A140E] p-4 rounded-lg border border-[#4ADE80]/40 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <strong style={{ ...rowdies(700), fontSize: '0.9rem', color: '#4ADE80' }}>
                  🟢 SEAT 1: CLAIMED
                </strong>
                <span style={{ ...rowdies(300), fontSize: '0.72rem', color: '#8E9A92' }}>4m ago</span>
              </div>
              <span style={{ ...rowdies(300), fontSize: '0.8rem', color: '#DBD0BD' }}>
                Cascade Fence Co. · WA L&amp;I Verified
              </span>
            </div>

            {/* Seat 2: Claimed */}
            <div className="bg-[#0A140E] p-4 rounded-lg border border-[#4ADE80]/40 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <strong style={{ ...rowdies(700), fontSize: '0.9rem', color: '#4ADE80' }}>
                  🟢 SEAT 2: CLAIMED
                </strong>
                <span style={{ ...rowdies(300), fontSize: '0.72rem', color: '#8E9A92' }}>1m ago</span>
              </div>
              <span style={{ ...rowdies(300), fontSize: '0.8rem', color: '#DBD0BD' }}>
                Cedar Craft WA · WA L&amp;I Verified
              </span>
            </div>

            {/* Seat 3: Open (Urgent) */}
            <div className="bg-[#1C140A] p-4 rounded-lg border-2 border-[#E5B842] flex flex-col gap-1 animate-pulse">
              <div className="flex justify-between items-center">
                <strong style={{ ...rowdies(700), fontSize: '0.9rem', color: '#E5B842' }}>
                  🟡 SEAT 3: OPEN (FINAL!)
                </strong>
                <span style={{ ...rowdies(700), fontSize: '0.72rem', color: '#F27A22' }}>$39.00</span>
              </div>
              <span style={{ ...rowdies(300), fontSize: '0.8rem', color: '#FAF6EE' }}>
                1 Final Seat Available in North Bend
              </span>
            </div>
          </div>

          {/* Claim Action */}
          {!claimed ? (
            <div className="bg-[#0D140F] p-6 rounded-lg border border-[#4ADE80]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 style={{ ...rowdies(700), fontSize: '1.1rem', color: '#FAF6EE', marginBottom: '0.2rem' }}>
                  Ready to Claim the Final Seat on This Project?
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#B5C2BA', margin: 0 }}>
                  Instant unlock of homeowner name, phone, verified 8.5" × 11" ARC Blueprint, and itemized lumber BOM.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setClaimed(true)}
                style={{
                  ...rowdies(700),
                  fontSize: '0.95rem',
                  backgroundColor: '#4ADE80',
                  color: '#141B16',
                  padding: '0.85rem 1.6rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  border: '2px solid #141B16',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                  flexShrink: 0,
                }}
              >
                ⚡ Claim Final Seat for $39 →
              </button>
            </div>
          ) : (
            <div className="bg-[#0E2417] p-6 rounded-lg border-2 border-[#4ADE80] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <h3 style={{ ...rowdies(700), fontSize: '1.2rem', color: '#4ADE80', margin: 0 }}>
                  Seat 3 Successfully Claimed! Homeowner Contact Unlocked
                </h3>
              </div>
              <div className="bg-[#07130C] p-4 rounded border border-white/10 text-xs text-[#FAF6EE] space-y-1.5" style={{ ...rowdies(300) }}>
                <div><strong>Homeowner:</strong> Sarah Jenkins (Si View HOA Lot #42)</div>
                <div><strong>Phone:</strong> (425) 555-0192 · Verified Mobile (SMS Opted In)</div>
                <div><strong>Address:</strong> 1420 Mt Si Blvd, North Bend, WA 98045</div>
                <div><strong>Download Blueprint:</strong> <Link href="/blueprint" className="text-[#4ADE80] underline font-bold">Si View Lot #42 ARC Blueprint (PDF)</Link></div>
              </div>
            </div>
          )}
        </section>

        {/* ── GUARANTEE POLICY ── */}
        <section
          className="has-outside-corners p-5 rounded-lg text-xs text-[#DBD0BD]"
          style={{
            background: '#0D140F',
            border: '1.5px solid rgba(255,255,255,0.1)',
          }}
        >
          <h4 style={{ ...rowdies(700), fontSize: '0.85rem', color: '#E5B842', marginBottom: '0.3rem' }}>
            Fence Frames Contractor Protection &amp; Dispute Policy
          </h4>
          <p style={{ ...rowdies(300), margin: 0, lineHeight: 1.45 }}>
            Every lead is protected under Master Handbook §10. If the homeowner does not respond after 3 verified outreach attempts within 72 hours, 100% of your seat purchase ($39.00) is credited back to your contractor wallet automatically.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
