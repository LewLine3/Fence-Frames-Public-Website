'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function TargetedMatchScramblePage() {
  const params = useParams()
  const routeJobId = (params?.jobId as string) || (params?.id as string) || ''

  const [timeLeft, setTimeLeft] = useState(1422) // seconds
  const [claimed, setClaimed] = useState(false)
  const [isClaiming, setIsClaiming] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)
  const [homeownerData, setHomeownerData] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch project from API or fallback
  useEffect(() => {
    let isMounted = true
    async function fetchProject() {
      try {
        const res = await fetch('/api/projects')
        const data = await res.json()
        if (data?.projects?.length > 0 && isMounted) {
          const match = routeJobId
            ? data.projects.find((p: any) => p.id === routeJobId || p.jobCode.includes(routeJobId))
            : data.projects[0]
          if (match) {
            setProject(match)
          }
        }
      } catch (err) {
        console.warn('Could not load project for match page:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchProject()
    return () => {
      isMounted = false
    }
  }, [routeJobId])

  const targetProjectId = project?.id || (routeJobId && routeJobId.startsWith('lead-') ? null : routeJobId) || 'a2afc760-b068-4d3b-8202-80169fac68b8'

  const handleClaimSeat = async () => {
    setIsClaiming(true)
    setClaimError(null)
    try {
      const res = await fetch('/api/projects/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: targetProjectId,
          ticketType: 'shared',
          paymentMethod: 'stripe',
        }),
      })
      const data = await res.json()
      if (data?.success) {
        if (data.homeowner) setHomeownerData(data.homeowner)
        setClaimed(true)
        if (project) {
          setProject({
            ...project,
            seatsClaimed: Math.min(3, (project.seatsClaimed || 0) + 1),
          })
        }
      } else {
        setClaimError(data?.error || 'Failed to claim seat')
      }
    } catch (err: any) {
      setClaimError(err?.message || 'Error claiming lead seat')
    } finally {
      setIsClaiming(false)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <SiteShell width="folio">
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
                {project ? `${project.jobCode} · ${project.city}` : 'New Verified Lead: Si View (North Bend, WA)'}
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.92rem', color: '#DBD0BD', margin: 0 }}>
                {project ? `${project.footage} LF · ${project.style} · ${project.neighborhood} · Official Blueprint Attached` : '140 LF Heritage Cedar 3-Rail Privacy · Si View Lot #42 · Pre-Approved Section 4.2 Blueprint Attached.'}
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
            {/* Seat 1 */}
            <div className={`p-4 rounded-lg border flex flex-col gap-1 ${
              (project?.seatsClaimed || 0) >= 1
                ? 'bg-[#0A140E] border-[#4ADE80]/40'
                : 'bg-[#1C140A] border-2 border-[#E5B842] animate-pulse'
            }`}>
              <div className="flex justify-between items-center">
                <strong style={{ ...rowdies(700), fontSize: '0.9rem', color: (project?.seatsClaimed || 0) >= 1 ? '#4ADE80' : '#E5B842' }}>
                  {(project?.seatsClaimed || 0) >= 1 ? '🟢 SEAT 1: CLAIMED' : '🟡 SEAT 1: OPEN'}
                </strong>
                <span style={{ ...rowdies(300), fontSize: '0.72rem', color: (project?.seatsClaimed || 0) >= 1 ? '#8E9A92' : '#F27A22' }}>
                  {(project?.seatsClaimed || 0) >= 1 ? 'Claimed' : `$${project?.seatCost || 39}.00`}
                </span>
              </div>
              <span style={{ ...rowdies(300), fontSize: '0.8rem', color: '#DBD0BD' }}>
                {(project?.seatsClaimed || 0) >= 1 ? 'Cascade Fence Co. · WA L&I Verified' : 'Available for Verified Contractor'}
              </span>
            </div>

            {/* Seat 2 */}
            <div className={`p-4 rounded-lg border flex flex-col gap-1 ${
              (project?.seatsClaimed || 0) >= 2
                ? 'bg-[#0A140E] border-[#4ADE80]/40'
                : 'bg-[#1C140A] border-2 border-[#E5B842]'
            }`}>
              <div className="flex justify-between items-center">
                <strong style={{ ...rowdies(700), fontSize: '0.9rem', color: (project?.seatsClaimed || 0) >= 2 ? '#4ADE80' : '#E5B842' }}>
                  {(project?.seatsClaimed || 0) >= 2 ? '🟢 SEAT 2: CLAIMED' : '🟡 SEAT 2: OPEN'}
                </strong>
                <span style={{ ...rowdies(300), fontSize: '0.72rem', color: (project?.seatsClaimed || 0) >= 2 ? '#8E9A92' : '#F27A22' }}>
                  {(project?.seatsClaimed || 0) >= 2 ? 'Claimed' : `$${project?.seatCost || 39}.00`}
                </span>
              </div>
              <span style={{ ...rowdies(300), fontSize: '0.8rem', color: '#DBD0BD' }}>
                {(project?.seatsClaimed || 0) >= 2 ? 'Cedar Craft WA · WA L&I Verified' : 'Available for Verified Contractor'}
              </span>
            </div>

            {/* Seat 3 */}
            <div className={`p-4 rounded-lg border flex flex-col gap-1 ${
              (project?.seatsClaimed || 0) >= 3
                ? 'bg-[#0A140E] border-[#4ADE80]/40'
                : 'bg-[#1C140A] border-2 border-[#E5B842] animate-pulse'
            }`}>
              <div className="flex justify-between items-center">
                <strong style={{ ...rowdies(700), fontSize: '0.9rem', color: (project?.seatsClaimed || 0) >= 3 ? '#4ADE80' : '#E5B842' }}>
                  {(project?.seatsClaimed || 0) >= 3 ? '🟢 SEAT 3: CLAIMED' : '🟡 SEAT 3: OPEN (FINAL!)'}
                </strong>
                <span style={{ ...rowdies(700), fontSize: '0.72rem', color: (project?.seatsClaimed || 0) >= 3 ? '#8E9A92' : '#F27A22' }}>
                  {(project?.seatsClaimed || 0) >= 3 ? 'Claimed' : `$${project?.seatCost || 39}.00`}
                </span>
              </div>
              <span style={{ ...rowdies(300), fontSize: '0.8rem', color: '#FAF6EE' }}>
                {(project?.seatsClaimed || 0) >= 3 ? 'Filled · Closed to new contractors' : '1 Final Seat Available'}
              </span>
            </div>
          </div>

          {claimError ? (
            <div className="mb-4 bg-red-950/70 border border-red-500/60 p-3.5 rounded text-sm text-red-200">
              ⚠️ <strong>Error:</strong> {claimError}
            </div>
          ) : null}

          {/* Claim Action */}
          {!claimed ? (
            <div className="bg-[#0D140F] p-6 rounded-lg border border-[#4ADE80]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 style={{ ...rowdies(700), fontSize: '1.1rem', color: '#FAF6EE', marginBottom: '0.2rem' }}>
                  {(project?.seatsClaimed || 0) >= 3
                    ? 'All 3 Seats On This Lead Are Claimed'
                    : 'Ready to Claim Your Seat on This Project?'}
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#B5C2BA', margin: 0 }}>
                  {(project?.seatsClaimed || 0) >= 3
                    ? 'Strict Anti-Monopoly 3-Seat Cap reached. Browse available leads on the dispatch board.'
                    : 'Instant unlock of homeowner name, phone, verified 8.5" × 11" ARC Blueprint, and itemized lumber BOM.'}
                </p>
              </div>

              {(project?.seatsClaimed || 0) < 3 ? (
                <button
                  type="button"
                  disabled={isClaiming}
                  onClick={handleClaimSeat}
                  style={{
                    ...rowdies(700),
                    fontSize: '0.95rem',
                    backgroundColor: '#4ADE80',
                    color: '#141B16',
                    padding: '0.85rem 1.6rem',
                    borderRadius: 4,
                    textAlign: 'center',
                    border: '2px solid #141B16',
                    cursor: isClaiming ? 'wait' : 'pointer',
                    opacity: isClaiming ? 0.7 : 1,
                    textTransform: 'uppercase',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
                    flexShrink: 0,
                  }}
                >
                  {isClaiming ? '⚡ Claiming Seat...' : `⚡ Claim Seat for $${project?.seatCost || 39} →`}
                </button>
              ) : (
                <Link
                  href="/contractors/projects"
                  style={{
                    ...rowdies(700),
                    fontSize: '0.9rem',
                    backgroundColor: '#333',
                    color: '#FFF',
                    padding: '0.75rem 1.4rem',
                    borderRadius: 4,
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  Return to Dispatch Board →
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-[#0E2417] p-6 rounded-lg border-2 border-[#4ADE80] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                <h3 style={{ ...rowdies(700), fontSize: '1.2rem', color: '#4ADE80', margin: 0 }}>
                  Seat Successfully Claimed! Homeowner Contact Unlocked
                </h3>
              </div>
              <div className="bg-[#07130C] p-4 rounded border border-white/10 text-xs text-[#FAF6EE] space-y-1.5" style={{ ...rowdies(300) }}>
                <div><strong>Homeowner:</strong> {homeownerData?.name || 'Sarah Jenkins (Si View HOA Lot #42)'}</div>
                <div><strong>Phone:</strong> {homeownerData?.phone || '(425) 555-0192 · Verified Mobile (SMS Opted In)'}</div>
                <div><strong>Email:</strong> {homeownerData?.email || 'homeowner@domain.com'}</div>
                <div><strong>Address:</strong> {homeownerData?.address || (project ? `${project.city}` : '1420 Mt Si Blvd, North Bend, WA 98045')}</div>
                <div><strong>Download Blueprint:</strong> <Link href={`/blueprint?id=${targetProjectId}`} className="text-[#4ADE80] underline font-bold">Verified ARC Blueprint &amp; Takeoff (PDF)</Link></div>
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
    </SiteShell>
  )
}
