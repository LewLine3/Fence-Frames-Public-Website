'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'
import { ACCOUNT_ROLES } from '@/lib/account-roles'
import { folioHref, getSavedFolios, type SavedFolio } from '@/lib/saved-folios'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const cardShell: React.CSSProperties = {
  background: '#FAF6EE',
  backgroundImage:
    'linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  border: '2.5px solid var(--ink)',
  boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
}

function arcLabel(status: SavedFolio['arcStatus']): string {
  switch (status) {
    case 'pre-approved':
      return '✓ ARC Pre-Approved'
    case 'in-review':
      return '⏳ Under HOA Review'
    case 'action-required':
      return '⚠ Action Required'
    default: {
      const _exhaustive: never = status
      return _exhaustive
    }
  }
}

export default function HomeownerDashboardPage() {
  const [builds, setBuilds] = useState<SavedFolio[]>([])

  useEffect(() => {
    setBuilds(getSavedFolios())
  }, [])

  return (
    <SiteShell width="dashboard">
      {/* Welcome header */}
      <section
        className="has-outside-corners rounded-lg relative overflow-hidden mb-8"
        style={{
          ...cardShell,
          backgroundImage:
            "url('/images/textures/trial-finger-joint.png'), linear-gradient(rgba(74,222,128,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.06) 1px, transparent 1px)",
          backgroundSize: 'cover, 20px 20px, 20px 20px',
        }}
      >
        <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

        <div className="ff-card-inner flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.72rem',
                  background: 'rgba(74,222,128,0.15)',
                  border: '1.5px solid #4ADE80',
                  color: '#16432D',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}
              >
                Pillar 3 · Fence It
              </span>
              <span
                style={{
                  ...rowdies(700),
                  fontSize: '0.72rem',
                  background: 'rgba(229,184,66,0.18)',
                  border: '1.5px solid #E5B842',
                  color: '#B8860B',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 4,
                }}
              >
                {ACCOUNT_ROLES.founder.labelWithClarifier}
              </span>
            </div>
            <h1 style={{ ...rowdies(700), fontSize: '2rem', color: '#1A1A1A', marginBottom: '0.35rem' }}>
              Welcome Back, John Smith
            </h1>
            <p style={{ ...rowdies(300), fontSize: '0.88rem', color: '#444', margin: 0 }}>
              📍 1420 Mt Si Blvd, North Bend, WA 98045 ·{' '}
              <span style={{ color: '#E5B842', ...rowdies(400) }}>Si View HOA · Lot #42</span>
            </p>
          </div>

          <Link
            href="/designer"
            style={{
              ...rowdies(700),
              fontSize: '0.82rem',
              backgroundColor: '#E5B842',
              color: '#141B16',
              padding: '0.75rem 1.25rem',
              borderRadius: 4,
              textDecoration: 'none',
              border: '2px solid #141B16',
              boxShadow: '4px 4px 0 #000',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>+</span>
            <span>Start New Fence Build</span>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Saved Fence-Folios */}
        <section className="lg:col-span-8 flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-[#16432D]/15 pb-2 ff-card-inner-sm" style={{ paddingTop: 0, paddingBottom: '0.65rem' }}>
            <h2 style={{ ...rowdies(700), fontSize: '1rem', color: '#E5B842', margin: 0 }}>
              📁 My Saved Fence-Folios ({builds.length})
            </h2>
            <span style={{ ...rowdies(300), fontSize: '0.72rem', color: '#555' }}>Zero-Data-Loss Active</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {builds.map((b) => (
              <article
                key={b.id}
                className="has-outside-corners rounded-lg overflow-hidden relative flex flex-col"
                style={cardShell}
              >
                <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
                <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

                <div className="bg-[var(--ink)] text-[#E5B842] ff-card-inner-sm flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 style={{ ...rowdies(700), fontSize: '0.9rem', margin: 0 }}>{b.name}</h3>
                    <span style={{ ...rowdies(300), fontSize: '0.68rem', color: 'rgba(229,184,66,0.75)' }}>
                      {b.id} · Saved {b.savedDate}
                    </span>
                  </div>
                  <span
                    style={{
                      ...rowdies(700),
                      fontSize: '0.62rem',
                      background: '#4ADE80',
                      color: '#141B16',
                      padding: '0.2rem 0.45rem',
                      borderRadius: 3,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {arcLabel(b.arcStatus)}
                  </span>
                </div>

                {/* Thumbnail */}
                <div className="ff-card-inner-sm flex items-center justify-center bg-[#EFE8D8] border-b border-[#16432D]/10 min-h-[140px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.thumbnail} alt="" style={{ maxHeight: 120, maxWidth: '100%', objectFit: 'contain' }} />
                </div>

                {/* Docked explainer plate */}
                <div
                  className="ff-card-inner-sm"
                  style={{
                    background: '#141B16',
                    borderTop: '1.5px solid #4ADE80',
                    borderBottom: '1.5px solid #4ADE80',
                    color: '#FAF6EE',
                  }}
                >
                  <p style={{ ...rowdies(300), fontSize: '0.78rem', margin: '0 0 0.5rem', lineHeight: 1.45 }}>{b.specs}</p>
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                      <span style={{ ...rowdies(400), fontSize: '0.65rem', color: '#E5B842', display: 'block' }}>Est. Build Range</span>
                      <strong style={{ ...rowdies(700), fontSize: '0.95rem', color: '#4ADE80' }}>
                        ${b.costMin.toLocaleString()} – ${b.costMax.toLocaleString()}
                      </strong>
                      <span style={{ ...rowdies(300), fontSize: '0.68rem', color: '#A5D6A7', marginLeft: '0.35rem' }}>
                        (${Math.round(b.costMin / b.lf)}–${Math.round(b.costMax / b.lf)}/LF)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="ff-card-inner flex flex-wrap gap-2 mt-auto">
                  <Link
                    href={folioHref(b.id)}
                    style={{
                      ...rowdies(700),
                      fontSize: '0.78rem',
                      backgroundColor: '#4ADE80',
                      color: '#141B16',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 4,
                      textDecoration: 'none',
                      border: '2px solid #141B16',
                      flex: '1 1 auto',
                      textAlign: 'center',
                    }}
                  >
                    📄 Open Fence-Folio
                  </Link>
                  <Link
                    href="/designer"
                    style={{
                      ...rowdies(400),
                      fontSize: '0.78rem',
                      backgroundColor: '#16432D',
                      color: '#FAF6EE',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 4,
                      textDecoration: 'none',
                      border: '1.5px solid #16432D',
                    }}
                  >
                    ✏️ Edit
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-5">
          <div className="has-outside-corners rounded-lg overflow-hidden relative" style={cardShell}>
            <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />
            <div className="bg-[var(--ink)] text-[#E5B842] ff-card-inner-sm" style={{ ...rowdies(700), fontSize: '0.78rem' }}>
              🏛️ HOA ARC Approval Status
            </div>
            <div className="ff-card-inner">
              <div className="rounded ff-card-inner-sm mb-3" style={{ background: '#E8F5EE', border: '1px solid rgba(74,222,128,0.3)' }}>
                <strong style={{ ...rowdies(700), fontSize: '0.78rem', color: '#16432D' }}>Pre-Approved Architecture</strong>
                <p style={{ ...rowdies(300), fontSize: '0.75rem', color: '#444', margin: '0.35rem 0 0', lineHeight: 1.45 }}>
                  Heritage 3-Rail matches Si View HOA Section 4.2. Open any Fence-Folio to export the ARC submittal packet.
                </p>
              </div>
              {builds[0] ? (
                <Link
                  href={folioHref(builds[0].id)}
                  style={{
                    ...rowdies(700),
                    fontSize: '0.78rem',
                    background: '#141B16',
                    color: '#FAF6EE',
                    padding: '0.65rem',
                    borderRadius: 4,
                    textDecoration: 'none',
                    border: '2px solid #141B16',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  📥 Open Latest Fence-Folio
                </Link>
              ) : null}
            </div>
          </div>

          <div className="has-outside-corners rounded-lg overflow-hidden relative" style={cardShell}>
            <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />
            <div className="bg-[var(--ink)] text-[#E5B842] ff-card-inner-sm" style={{ ...rowdies(700), fontSize: '0.78rem' }}>
              ⚡ Contractor Bid Dispatch
            </div>
            <div className="ff-card-inner">
              <p style={{ ...rowdies(300), fontSize: '0.8rem', color: '#444', margin: '0 0 0.75rem', lineHeight: 1.45 }}>
                Partner contractor roster is onboarding. When live, saved Fence-Folios dispatch to up to 3 verified seats in your ZIP.
              </p>
              <span
                style={{
                  ...rowdies(400),
                  fontSize: '0.75rem',
                  color: '#888',
                  background: '#EFE8D8',
                  border: '1px solid #CCC',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 4,
                  display: 'block',
                  textAlign: 'center',
                }}
              >
                Bid dispatch — coming with partner launch
              </span>
            </div>
          </div>

          <div className="has-outside-corners rounded-lg overflow-hidden relative" style={cardShell}>
            <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />
            <div className="bg-[var(--ink)] text-[#E5B842] ff-card-inner-sm" style={{ ...rowdies(700), fontSize: '0.78rem' }}>
              🧰 {ACCOUNT_ROLES.founder.name} Toolbox
            </div>
            <div className="ff-card-inner space-y-2">
              {[
                '📐 Property Line Setback Estimator',
                '🪵 Wood Species Durability Guide',
                '⚖️ North Bend Permit Bylaws',
              ].map((label) => (
                <div
                  key={label}
                  className="ff-card-inner-sm rounded cursor-pointer flex justify-between items-center"
                  style={{ background: '#E8F5EE', border: '1px solid rgba(22,67,45,0.12)', ...rowdies(300), fontSize: '0.78rem', color: '#444' }}
                >
                  <span>{label}</span>
                  <span>→</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </SiteShell>
  )
}
