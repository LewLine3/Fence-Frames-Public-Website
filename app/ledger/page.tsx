'use client'

import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})


const footage = 120
const estPricePerLf = 48
const totalEst = footage * estPricePerLf
const minEst = Math.round(totalEst * 0.85)
const maxEst = Math.round(totalEst * 1.15)

const ledgerLines = [
  { label: 'Materials', pct: 0.45 },
  { label: 'Framing Labor', pct: 0.35 },
  { label: 'Site Prep & Post Augering', pct: 0.12 },
  { label: 'Platform & Admin', pct: 0.08 },
]

export default function LedgerPage() {
  return (
    <SiteShell width="folio">
<div className="text-xs text-[#16432D]/60 mb-4 flex items-center gap-2 flex-wrap" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-[#16432D]">Home</Link>
          <span>/</span>
          <Link href="/fence-folio" className="hover:text-[#E5B842] text-[#16432D]">Fence-Folio</Link>
          <span>/</span>
          <span className="text-[#E5B842]">Project Ledger</span>
        </div>

        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#102B1E',
            backgroundImage:
              'linear-gradient(rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.08) 1px, transparent 1px), linear-gradient(180deg, #0C1F15 0%, #16432D 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />
          <div className="inline-flex items-center gap-2 bg-[#4ADE80]/20 border border-[#4ADE80] px-3 py-1 rounded text-xs text-[#4ADE80] font-bold uppercase tracking-wider mb-3">
            <span>💰</span>
            <span>Fence-Folio · Sheet L-01</span>
          </div>
          <h1 style={{ ...rowdies(700), fontSize: '2rem', color: '#4ADE80', marginBottom: '0.35rem' }}>
            Project Pricing Ledger
          </h1>
          <p style={{ ...rowdies(300), fontSize: '0.92rem', color: '#DBD0BD', margin: 0 }}>
            Itemized labor and material breakdown with transparent ±15% estimate range for contractor handoff.
          </p>
        </section>

        <div
          className="has-outside-corners rounded-lg relative overflow-hidden"
          style={{ background: '#FAF6EE', border: '2px solid #1A1A1A', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />
          <div className="bg-[#1A1A1A] text-[#E5B842] px-5 py-3 flex flex-wrap justify-between gap-2 items-center">
            <span style={{ ...rowdies(700), fontSize: '1rem' }}>Itemized Construction Task Ledger ({footage} LF)</span>
            <span style={{ ...rowdies(700), fontSize: '0.85rem', color: '#4ADE80' }}>
              ${minEst.toLocaleString()} – ${maxEst.toLocaleString()} total
            </span>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-6" style={{ ...rowdies(300) }}>
              {ledgerLines.map((line) => (
                <div key={line.label} className="bg-[#E8F5EE] p-4 rounded border border-[#4ADE80]/25">
                  <strong className="text-[#16432D] block mb-1">{line.label}</strong>
                  <span className="text-[#1A1A1A] text-sm font-bold">
                    ${Math.round(totalEst * line.pct).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
            <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#555', margin: 0, lineHeight: 1.5 }}>
              Estimates include materials, excavation, installation labor, and platform admin. Actual contractor bids
              may vary based on site conditions. This ledger is chapter 6 of your Fence-Folio deliverable package.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/fence-folio"
            className="bg-[#16432D] text-[#FAF6EE] border-2 border-[#1A1A1A] px-4 py-2 rounded text-xs font-bold shadow-[3px_3px_0_#1A1A1A]"
          >
            ← Full Fence-Folio
          </Link>
          <Link
            href="/material-list"
            className="bg-[#E5B842] text-[#141B16] border-2 border-[#1A1A1A] px-4 py-2 rounded text-xs font-bold shadow-[3px_3px_0_#1A1A1A]"
          >
            Material List →
          </Link>
        </div>
    </SiteShell>
  )
}
