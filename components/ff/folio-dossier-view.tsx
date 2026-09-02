'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'
import type { SavedFolio } from '@/lib/saved-folios'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

interface FolioDossierViewProps {
  folio: SavedFolio
}

export function FolioDossierView({ folio }: FolioDossierViewProps) {
  const [activeChapter, setActiveChapter] = useState<number>(0)
  const [cleanMode, setCleanMode] = useState<boolean>(false)

  const estPricePerLf = folio.lf > 0 ? Math.round((folio.costMin + folio.costMax) / 2 / folio.lf) : 48
  const totalEst = folio.lf * estPricePerLf
  const minEst = folio.costMin
  const maxEst = folio.costMax

  const chapters = [
    { id: 'cover', tab: '1. Cover Sheet', title: `${folio.style} — ${folio.height}' Privacy Showcase`, code: 'SHEET A-01 · ELEVATION & SPECS', badge: 'ARCHITECTURAL COVER' },
    { id: 'community', tab: '2. Community Rules', title: `${folio.community.split('·')[0].trim()} CC&R Compliance`, code: 'SHEET A-02 · ARC VERIFICATION', badge: '🏛️ PRE-APPROVED' },
    { id: 'materials', tab: '3. Material List / BOM', title: 'Parametric Lumber & Fastener Takeoff', code: 'SHEET M-01 · BILL OF MATERIALS', badge: 'QUANTITY VERIFIED' },
    { id: 'blueprint', tab: '4. Builder Blueprint', title: '1:24 Scale Structural Framing Model', code: 'SHEET B-01 · CONSTRUCTION BLUEPRINT', badge: 'PERMIT READY' },
    { id: 'addons', tab: '5. Add-ons & Hardware', title: 'Rot-Barrier Kickboard & Simpson Ties', code: 'SHEET X-01 · HARDWARE & EXTRAS', badge: 'MODULAR SPECS' },
    { id: 'ledger', tab: '6. Pricing Ledger', title: 'Itemized Labor & Material Pricing Breakdown', code: 'SHEET L-01 · COST LEDGER', badge: '±15% TRANSPARENCY' },
  ]

  const current = chapters[activeChapter]

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-4">
          <Link href="/homeowner" style={{ ...rowdies(400), fontSize: '0.8rem', color: '#4ADE80', textDecoration: 'none' }}>
            ← Back to My Fence-Folios
          </Link>
        </div>

        <section
          className="has-outside-corners p-4 sm:p-6 rounded-lg mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4"
          style={{ background: '#121A14', border: '2px solid var(--ink)', boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span style={{ ...rowdies(700), fontSize: '1.25rem', color: '#4ADE80' }}>FENCE-FOLIO™</span>
              <span style={{ ...rowdies(700), fontSize: '0.72rem', background: '#D9B872', color: '#141B16', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                DOSSIER ID: {folio.id}
              </span>
            </div>
            <p style={{ ...rowdies(700), fontSize: '0.95rem', color: '#E5B842', margin: '0 0 0.25rem' }}>{folio.name}</p>
            <p style={{ ...rowdies(300), fontSize: '0.85rem', color: '#DBD0BD', margin: 0 }}>
              {folio.community} · {folio.location} · {folio.lf} LF {folio.style}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-[#0A0F0C] border border-white/20 px-3 py-1.5 rounded-lg">
              <span style={{ ...rowdies(400), fontSize: '0.75rem', color: cleanMode ? '#4ADE80' : '#DBD0BD' }}>
                {cleanMode ? '🔒 ARC Clean Mode (Pricing Hidden)' : '💵 Contractor Bidding Mode'}
              </span>
              <button
                type="button"
                onClick={() => setCleanMode(!cleanMode)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${cleanMode ? 'bg-[#4ADE80]' : 'bg-white/20'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-[#141B16] transform transition-transform ${cleanMode ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="bg-[#E5B842] hover:bg-[#d6a836] text-[#141B16] px-4 py-2 rounded text-xs font-bold transition flex items-center gap-1.5 cursor-pointer uppercase"
            >
              <span>🖨️</span>
              <span>Print 8.5&quot; × 11&quot; PDF</span>
            </button>

            <Link
              href="/designer"
              className="bg-[#F27A22] hover:bg-[#db6818] text-[#141B16] px-4 py-2 rounded text-xs font-bold transition flex items-center gap-1.5 uppercase"
              style={{ textDecoration: 'none' }}
            >
              <span>✏️</span>
              <span>Edit in Designer</span>
            </Link>
          </div>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 border-b border-white/10">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setActiveChapter(idx)}
              style={{
                ...rowdies(activeChapter === idx ? 700 : 400),
                fontSize: '0.85rem',
                padding: '0.5rem 1rem',
                borderRadius: 4,
                border: activeChapter === idx ? '2px solid #4ADE80' : '1.5px solid rgba(255,255,255,0.12)',
                background: activeChapter === idx ? '#16432D' : 'rgba(14,24,18,0.7)',
                color: activeChapter === idx ? '#4ADE80' : '#DBD0BD',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {ch.tab}
            </button>
          ))}
        </div>

        <div
          className="has-outside-corners ff-card-inner rounded-lg relative"
          style={{
            background: '#16432D',
            backgroundImage: 'linear-gradient(rgba(74,222,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.12) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 12px 36px rgba(0,0,0,0.4)',
            minHeight: '620px',
          }}
        >
          <span className="corner-mark-out tl c-orange" />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-[#E5B842]/30 gap-3">
            <div>
              <span style={{ ...rowdies(700), fontSize: '0.75rem', color: '#E5B842', letterSpacing: '0.08em' }}>{current.code}</span>
              <h2 style={{ ...rowdies(700), fontSize: '1.7rem', color: '#FFFFFF', margin: '0.2rem 0' }}>{current.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ ...rowdies(700), fontSize: '0.75rem', background: '#D9B872', color: '#141B16', padding: '0.25rem 0.65rem', borderRadius: 3 }}>{current.badge}</span>
              {!cleanMode && (
                <div className="bg-[#0F2417] border border-[#E5B842] px-3 py-1 rounded text-right">
                  <span style={{ ...rowdies(400), fontSize: '0.62rem', color: '#E5B842', display: 'block' }}>EST. MID QUOTE</span>
                  <span style={{ ...rowdies(700), fontSize: '1.1rem', color: '#4ADE80' }}>
                    ${minEst.toLocaleString()} – ${maxEst.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {activeChapter === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 bg-[#10261A] border-2 border-[#141B16] rounded-lg ff-card-inner flex flex-col items-center justify-center min-h-[360px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={folio.thumbnail} alt={folio.name} style={{ maxHeight: 260, maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))' }} />
                <span style={{ ...rowdies(400), fontSize: '0.75rem', color: '#A5D6A7', marginTop: '1rem' }}>{folio.specs}</span>
              </div>
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="bg-[#0A0F0C] ff-card-inner rounded border border-white/10">
                  <h4 style={{ ...rowdies(700), fontSize: '0.9rem', color: '#E5B842', marginBottom: '0.5rem' }}>Project Architectural Takeoff</h4>
                  <ul className="space-y-1.5 text-xs text-[#DBD0BD]" style={{ ...rowdies(300) }}>
                    <li><strong>Total Linear Footage:</strong> {folio.lf} LF</li>
                    <li><strong>Finished Height:</strong> {folio.height}ft</li>
                    <li><strong>Style Package:</strong> {folio.style}</li>
                    <li><strong>Saved:</strong> {folio.savedDate}</li>
                  </ul>
                </div>
                <div className="bg-[#0A0F0C] ff-card-inner rounded border border-[#4ADE80]/30">
                  <h4 style={{ ...rowdies(700), fontSize: '0.9rem', color: '#4ADE80', marginBottom: '0.3rem' }}>ARC Compliance Status</h4>
                  <p style={{ ...rowdies(300), fontSize: '0.8rem', color: '#FAF6EE', margin: 0 }}>
                    {folio.arcStatus === 'pre-approved'
                      ? `✓ Pre-approved for ${folio.community}. Ready for ARC submittal packet export.`
                      : '⏳ Pending HOA committee review.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeChapter === 1 && (
            <div className="bg-[#0A0F0C] ff-card-inner rounded-lg border border-white/10">
              <h3 style={{ ...rowdies(700), fontSize: '1.1rem', color: '#E5B842', marginBottom: '0.5rem' }}>{folio.community} Bylaw Matrix</h3>
              <p style={{ ...rowdies(300), fontSize: '0.85rem', color: '#DBD0BD', margin: 0 }}>{folio.specs}</p>
            </div>
          )}

          {activeChapter === 2 && (
            <div className="bg-[#0A0F0C] ff-card-inner rounded-lg border border-white/10">
              <p style={{ ...rowdies(300), fontSize: '0.85rem', color: '#DBD0BD', margin: 0 }}>
                Parametric BOM generated for {folio.lf} LF · {folio.height}ft {folio.style}. Full lumber takeoff unlocks when connected to FenceBook catalog.
              </p>
            </div>
          )}

          {activeChapter === 3 && (
            <div className="bg-[#10261A] border-2 border-[#141B16] rounded-lg ff-card-inner flex flex-col items-center justify-center min-h-[380px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/ai-generated-fences/Rancher Fence Illustration.jpg" alt="Blueprint elevation" style={{ maxHeight: 300, maxWidth: '100%', objectFit: 'contain', filter: 'brightness(0.95)' }} />
            </div>
          )}

          {activeChapter === 4 && (
            <div className="bg-[#0A0F0C] ff-card-inner rounded border border-white/10">
              <p style={{ ...rowdies(300), fontSize: '0.85rem', color: '#DBD0BD', margin: 0 }}>Add-ons chapter — gates, kickboards, and hardware specs from your designer session.</p>
            </div>
          )}

          {activeChapter === 5 && (
            <div className="bg-[#0A0F0C] ff-card-inner rounded-lg border border-white/10">
              <h3 style={{ ...rowdies(700), fontSize: '1.1rem', color: '#E5B842' }}>Itemized Ledger ({folio.lf} LF)</h3>
              <p style={{ ...rowdies(300), fontSize: '0.85rem', color: '#4ADE80', marginTop: '0.5rem' }}>
                ${minEst.toLocaleString()} – ${maxEst.toLocaleString()} total (${Math.round(minEst / folio.lf)} – ${Math.round(maxEst / folio.lf)} / LF)
              </p>
            </div>
          )}

          <div className="flex justify-between items-center mt-8 pt-4 border-t border-[#E5B842]/30 text-xs text-[#A5D6A7]">
            <span>Page {activeChapter + 1} of {chapters.length}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => setActiveChapter((c) => Math.max(0, c - 1))} disabled={activeChapter === 0} className="bg-[#0E2417] border border-white/20 disabled:opacity-30 text-white px-3 py-1 rounded cursor-pointer">
                &lt; Previous Sheet
              </button>
              <button type="button" onClick={() => setActiveChapter((c) => Math.min(chapters.length - 1, c + 1))} disabled={activeChapter === chapters.length - 1} className="bg-[#E5B842] text-[#141B16] font-bold px-3 py-1 rounded cursor-pointer">
                Next Sheet &gt;
              </button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
