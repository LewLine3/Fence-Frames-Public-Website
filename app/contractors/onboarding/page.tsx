'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function ContractorOnboardingPage() {
  const [formData, setFormData] = useState({
    businessName: '',
    ubiNumber: '',
    contactName: '',
    phone: '',
    email: '',
    territory: 'king-county-east',
    insuranceProvider: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="min-h-screen flex flex-col font-['Rowdies']"
      style={{
        backgroundColor: '#F4ECDC',
        backgroundImage: `linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)`,
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        color: '#1A1A1A',
      }}
    >
      <SiteNav />

      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ── BREADCRUMBS ── */}
        <div className="text-xs text-[#16432D]/70 mb-4 flex items-center gap-2" style={{ ...rowdies(300) }}>
          <Link href="/" className="hover:text-[#E5B842] text-[#16432D]">Home</Link>
          <span>/</span>
          <Link href="/contractors/projects" className="hover:text-[#E5B842] text-[#16432D]">Contractor Dispatch</Link>
          <span>/</span>
          <span className="text-[#4ADE80]">Contractor Onboarding &amp; Verification</span>
        </div>

        {/* ── HEADER BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8 relative overflow-hidden"
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

          <div>
            <div className="inline-flex items-center gap-2 bg-[#4ADE80]/20 border border-[#4ADE80] px-3 py-1 rounded text-xs text-[#4ADE80] font-bold uppercase tracking-wider mb-3">
              <span>🔨</span>
              <span>Join the Verified Contractor Network</span>
            </div>
            <h1 style={{ ...rowdies(700), fontSize: '2.2rem', color: '#4ADE80', lineHeight: 1.15, marginBottom: '0.4rem' }}>
              Contractor Verification &amp; 1st Lead Free
            </h1>
            <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
              Verify your Washington State L&amp;I license to receive SMS alerts for pre-scoped fence projects in your service area. New contractors receive 1 free lead credit upon approval.
            </p>
          </div>
        </section>

        {/* ── ONBOARDING FORM ── */}
        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="has-outside-corners p-6 sm:p-10 rounded-lg space-y-6"
            style={{
              background: '#FAF6EE',
              border: '2px solid var(--ink)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}
          >
            <span className="corner-mark-out tl c-gold" />
            <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

            <div>
              <h2 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#E5B842', marginBottom: '1.2rem' }}>
                1. Business &amp; WA L&amp;I Verification
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" style={{ ...rowdies(300) }}>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-bold">Business Name (As registered with WA DOR)</label>
                  <input
                    required
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Cascade Fence &amp; Deck LLC"
                    className="w-full bg-[#EFE8D8] border border-[#1A1A1A]/30 rounded p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-bold">WA L&amp;I Contractor License / UBI #</label>
                  <input
                    required
                    type="text"
                    value={formData.ubiNumber}
                    onChange={(e) => setFormData({ ...formData, ubiNumber: e.target.value })}
                    placeholder="e.g. CASCAD*891K2 or 603-XXX-XXX"
                    className="w-full bg-[#EFE8D8] border border-[#1A1A1A]/30 rounded p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#E5B842', marginBottom: '1.2rem' }}>
                2. Contact &amp; SMS Dispatch Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" style={{ ...rowdies(300) }}>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-bold">Primary Contact Name</label>
                  <input
                    required
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Dave Miller"
                    className="w-full bg-[#FAF6EE] border-2 border-[#1A1A1A] rounded p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-bold">Mobile Phone (For Instant 72-Hr SMS Scramble Alerts)</label>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. (425) 555-0199"
                    className="w-full bg-[#FAF6EE] border-2 border-[#1A1A1A] rounded p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#E5B842', marginBottom: '1.2rem' }}>
                3. Primary Service Area &amp; Insurance
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs" style={{ ...rowdies(300) }}>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-bold">Preferred Dispatch Territory</label>
                  <select
                    value={formData.territory}
                    onChange={(e) => setFormData({ ...formData, territory: e.target.value })}
                    className="w-full bg-[#FAF6EE] border-2 border-[#1A1A1A] rounded p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#4ADE80]"
                  >
                    <option value="king-county-east">North Bend, Snoqualmie &amp; East King County</option>
                    <option value="king-county-central">Issaquah, Sammamish &amp; Bellevue</option>
                    <option value="king-county-south">Maple Valley, Renton &amp; Kent</option>
                    <option value="snohomish">Snohomish &amp; North Sound</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A1A] mb-1 font-bold">General Liability Insurance Carrier</label>
                  <input
                    required
                    type="text"
                    value={formData.insuranceProvider}
                    onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                    placeholder="e.g. Liberty Mutual ($1,000,000 Min)"
                    className="w-full bg-[#FAF6EE] border-2 border-[#1A1A1A] rounded p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#4ADE80]"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 border-t border-[#1A1A1A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#444]" style={{ ...rowdies(300) }}>
                <span className="text-[#4ADE80] font-bold">✓</span>
                <span>Includes 1 Free Lead Credit ($39 Value) on verification approval</span>
              </div>

              <button
                type="submit"
                style={{
                  ...rowdies(700),
                  fontSize: '0.95rem',
                  backgroundColor: '#4ADE80',
                  color: '#141B16',
                  padding: '0.85rem 1.8rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  border: '2px solid #141B16',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                }}
              >
                Submit for WA L&amp;I Verification →
              </button>
            </div>
          </form>
        ) : (
          <div
            className="has-outside-corners p-8 sm:p-12 rounded-lg text-center space-y-4"
            style={{
              background: '#16432D',
              border: '2.5px solid #4ADE80',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            }}
          >
            <span className="corner-mark-out tl c-orange" />
            <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

            <div className="text-4xl mb-2">🎉</div>
            <h2 style={{ ...rowdies(700), fontSize: '1.8rem', color: '#FFFFFF' }}>
              Verification Submitted for {formData.businessName || 'Your Business'}
            </h2>
            <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#FAF6EE', maxWidth: '600px', margin: '0 auto' }}>
              Our automated system is verifying UBI #<strong className="text-[#E5B842]">{formData.ubiNumber || 'Submitted'}</strong> with Washington State L&amp;I records. You will receive an SMS confirmation at <strong className="text-[#4ADE80]">{formData.phone || 'your phone'}</strong> within 15 minutes.
            </p>
            <div className="pt-4">
              <Link
                href="/contractors/projects"
                style={{
                  ...rowdies(700),
                  fontSize: '0.9rem',
                  backgroundColor: '#E5B842',
                  color: '#141B16',
                  padding: '0.75rem 1.4rem',
                  borderRadius: 4,
                  textDecoration: 'none',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                }}
              >
                View Live Marketplace Feed →
              </Link>
            </div>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}
