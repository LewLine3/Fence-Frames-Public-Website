'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

interface LeadQueueItem {
  id: string
  homeowner: string
  hoa: string
  footage: number
  estMid: string
  status: 'pending-review' | 'approved' | 'flagged'
  timestamp: string
}

export default function AdminControlPanelPage() {
  const [smsActive, setSmsActive] = useState<boolean>(true)
  const [leads, setLeads] = useState<LeadQueueItem[]>([
    { id: 'LD-98045-8912', homeowner: 'Sarah Jenkins', hoa: 'Si View HOA (Lot #42)', footage: 120, estMid: '$5,760', status: 'approved', timestamp: '12m ago' },
    { id: 'LD-98065-3310', homeowner: 'Michael Chang', hoa: 'Snoqualmie Ridge', footage: 180, estMid: '$10,080', status: 'pending-review', timestamp: '24m ago' },
    { id: 'LD-98027-4491', homeowner: 'Robert Vance', hoa: 'Issaquah Highlands', footage: 95, estMid: '$4,940', status: 'pending-review', timestamp: '1h ago' },
  ])

  const handleApprove = (id: string) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: 'approved' } : l)))
  }

  const handleFlag = (id: string) => {
    setLeads(leads.map((l) => (l.id === id ? { ...l, status: 'flagged' } : l)))
  }

  return (
    <div className="min-h-screen bg-[#080D0A] text-[#FAF6EE] flex flex-col font-['Rowdies']">
      <SiteNav />

      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── ADMIN HEADER ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
          style={{
            backgroundColor: '#0F172A',
            backgroundImage:
              'linear-gradient(rgba(229,184,66,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(229,184,66,0.06) 1px, transparent 1px), linear-gradient(180deg, #090E17 0%, #131F33 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div>
            <div className="inline-flex items-center gap-2 bg-[#E5B842]/20 border border-[#E5B842] px-3 py-1 rounded text-xs text-[#E5B842] font-bold uppercase tracking-wider mb-3">
              <span>🛡️</span>
              <span>Internal Admin Panel</span>
            </div>
            <h1 style={{ ...rowdies(700), fontSize: '2.2rem', color: '#FAF6EE', lineHeight: 1.15, marginBottom: '0.4rem' }}>
              Platform Operations &amp; Lead Governance
            </h1>
            <p style={{ ...rowdies(300), fontSize: '0.92rem', color: '#DBD0BD', margin: 0 }}>
              Review inbound homeowner builds, monitor 3-seat contractor scramble concurrency, and manage Telnyx SMS broadcast switches.
            </p>
          </div>

          {/* Global SMS Kill Switch */}
          <div className="bg-[#0B1018] border-2 border-white/20 p-4 rounded-lg flex flex-col gap-2 min-w-[240px]">
            <div className="flex justify-between items-center text-xs">
              <span style={{ ...rowdies(700), color: smsActive ? '#4ADE80' : '#EF4444' }}>
                {smsActive ? '🟢 TELNYX SMS: LIVE' : '🔴 TELNYX SMS: KILLED'}
              </span>
              <button
                type="button"
                onClick={() => setSmsActive(!smsActive)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                  smsActive ? 'bg-[#4ADE80]' : 'bg-[#EF4444]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#141B16] transform transition-transform ${
                    smsActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <span style={{ ...rowdies(300), fontSize: '0.7rem', color: '#8E9A92' }}>
              Emergency kill switch halts all outgoing 72-hr scramble SMS alerts.
            </span>
          </div>
        </section>

        {/* ── METRICS OVERVIEW ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Builds Today', val: '24', sub: '+8 from yesterday', color: '#4ADE80' },
            { label: 'Contractor Scramble Seats', val: '68 / 72', sub: '94% Allocation Rate', color: '#E5B842' },
            { label: 'Verified WA Contractors', val: '42', sub: 'King & Snohomish', color: '#F27A22' },
            { label: 'Si View ARC Pre-Approvals', val: '100%', sub: 'Zero rejections', color: '#4ADE80' },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-[#121814] p-4 rounded-lg border border-white/10 flex flex-col gap-1"
              style={{ ...rowdies(300) }}
            >
              <span className="text-xs text-white/60">{m.label}</span>
              <span style={{ ...rowdies(700), fontSize: '1.6rem', color: m.color }}>{m.val}</span>
              <span className="text-[10px] text-[#A5D6A7]">{m.sub}</span>
            </div>
          ))}
        </section>

        {/* ── INBOUND LEAD REVIEW QUEUE ── */}
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
            Inbound Homeowner Lead Review Queue
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse" style={{ ...rowdies(300) }}>
              <thead>
                <tr className="border-b border-white/20 text-[#E5B842]" style={{ ...rowdies(700) }}>
                  <th className="py-2.5 px-3">Lead ID</th>
                  <th className="py-2.5 px-3">Homeowner</th>
                  <th className="py-2.5 px-3">Community / HOA</th>
                  <th className="py-2.5 px-3">Specs</th>
                  <th className="py-2.5 px-3">Est. Mid</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#DBD0BD]">
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="py-3 px-3 font-mono text-[#4ADE80] font-bold">{lead.id}</td>
                    <td className="py-3 px-3 text-white font-bold">{lead.homeowner}</td>
                    <td className="py-3 px-3">{lead.hoa}</td>
                    <td className="py-3 px-3">{lead.footage} LF</td>
                    <td className="py-3 px-3 font-bold text-[#E5B842]">{lead.estMid}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          lead.status === 'approved'
                            ? 'bg-[#4ADE80] text-[#141B16]'
                            : lead.status === 'flagged'
                            ? 'bg-[#EF4444] text-white'
                            : 'bg-[#E5B842] text-[#141B16]'
                        }`}
                      >
                        {lead.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      {lead.status === 'pending-review' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(lead.id)}
                            className="bg-[#4ADE80] text-[#141B16] font-bold px-2.5 py-1 rounded text-[11px] cursor-pointer"
                          >
                            ✓ Approve &amp; Broadcast
                          </button>
                          <button
                            type="button"
                            onClick={() => handleFlag(lead.id)}
                            className="bg-[#2C1818] text-[#EF4444] border border-[#EF4444]/40 font-bold px-2.5 py-1 rounded text-[11px] cursor-pointer"
                          >
                            Flag
                          </button>
                        </>
                      )}
                      {lead.status === 'approved' && (
                        <Link href={`/contractor/match`} className="text-[#4ADE80] underline font-bold">
                          View Live Scramble →
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
