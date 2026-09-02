'use client'

import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const bomRows = [
  { id: '01', desc: "4x4x9' Pressure Treated Posts (Ground Contact)", qty: 16, unit: 'EA', cost: '$576.00' },
  { id: '02', desc: "2x4x8' Western Red Cedar Rails (S4S)", qty: 45, unit: 'EA', cost: '$810.00' },
  { id: '03', desc: "1x6x6' Tight-Knot Western Red Cedar Pickets", qty: 270, unit: 'EA', cost: '$1,620.00' },
  { id: '04', desc: 'Simpson Strong-Tie FB24 Fence Brackets (Galvanized)', qty: 90, unit: 'EA', cost: '$135.00' },
  { id: '05', desc: '50lb Quick-Set Concrete Bags', qty: 32, unit: 'BAG', cost: '$240.00' },
]

export default function MaterialListPage() {
  return (
    <SiteShell width="folio">
<div className="text-xs text-[#16432D]/60 mb-4 flex items-center gap-2 flex-wrap" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-[#16432D]">Home</Link>
          <span>/</span>
          <Link href="/fence-folio" className="hover:text-[#E5B842] text-[#16432D]">Fence-Folio</Link>
          <span>/</span>
          <span className="text-[#E5B842]">Material List</span>
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
            <span>📋</span>
            <span>Fence-Folio · Sheet M-01</span>
          </div>
          <h1 style={{ ...rowdies(700), fontSize: '2rem', color: '#4ADE80', marginBottom: '0.35rem' }}>
            Material List / BOM
          </h1>
          <p style={{ ...rowdies(300), fontSize: '0.92rem', color: '#DBD0BD', margin: 0 }}>
            Parametric lumber and fastener takeoff for your saved build — quantities verified against designer config.
          </p>
        </section>

        <div
          className="has-outside-corners rounded-lg relative overflow-hidden"
          style={{ background: '#FAF6EE', border: '2px solid #1A1A1A', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />
          <div className="bg-[#1A1A1A] text-[#E5B842] px-5 py-3" style={{ ...rowdies(700), fontSize: '1rem' }}>
            Heritage Cedar — 120 LF · Bill of Materials
          </div>
          <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse" style={{ ...rowdies(300) }}>
              <thead>
                <tr className="border-b-2 border-[#1A1A1A]/20 text-[#16432D]" style={{ ...rowdies(700) }}>
                  <th className="py-2.5 px-3">Item #</th>
                  <th className="py-2.5 px-3">Component Description</th>
                  <th className="py-2.5 px-3">Qty</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3 text-right">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/10 text-[#444]">
                {bomRows.map((row) => (
                  <tr key={row.id}>
                    <td className="py-2.5 px-3 font-mono text-[#16432D]">{row.id}</td>
                    <td className="py-2.5 px-3 font-bold text-[#1A1A1A]">{row.desc}</td>
                    <td className="py-2.5 px-3">{row.qty}</td>
                    <td className="py-2.5 px-3">{row.unit}</td>
                    <td className="py-2.5 px-3 text-right">{row.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            href="/blueprint"
            className="bg-[#E5B842] text-[#141B16] border-2 border-[#1A1A1A] px-4 py-2 rounded text-xs font-bold shadow-[3px_3px_0_#1A1A1A]"
          >
            View Blueprint →
          </Link>
        </div>
    </SiteShell>
  )
}
