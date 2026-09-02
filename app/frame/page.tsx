'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

type FilterCategory = 'all' | 'vertical' | 'horizontal' | 'picture-frame' | 'good-neighbor'

export default function DesignSuiteHubPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('all')

  return (
    <SiteShell width="catalog">
{/* ── HEADER BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-10 rounded-lg mb-10 relative overflow-hidden"
          style={{
            backgroundColor: '#1C130B',
            backgroundImage:
              'linear-gradient(rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(180deg, #181008 0%, #26160C 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#F27A22]/20 border border-[#F27A22] px-3 py-1 rounded text-xs text-[#F27A22] font-bold uppercase tracking-wider mb-4">
              <span>🖼️</span>
              <span>Pillar 2 · Frame It</span>
            </div>
            <h1 style={{ ...rowdies(700), fontSize: '2.5rem', color: '#F27A22', lineHeight: 1.15, marginBottom: '0.8rem' }}>
              Choose Your Design Pathway
            </h1>
            <p style={{ ...rowdies(300), fontSize: '1.05rem', lineHeight: 1.5, color: '#FAF6EE', margin: 0 }}>
              Select a curated pre-built fence look, engineer your custom run with live 2D CAD elevations, or let our guided wizard ask 4 simple questions to build your exact spec.
            </p>
          </div>

          {/* Quick-Filter Chips */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span style={{ ...rowdies(400), fontSize: '0.85rem', color: '#E5B842', marginRight: '0.5rem' }}>
              Filter by Style Family:
            </span>
            {[
              { id: 'all', label: 'All Styles' },
              { id: 'vertical', label: '🌲 Vertical Privacy' },
              { id: 'horizontal', label: '🌅 Horizontal Modern' },
              { id: 'picture-frame', label: '🖼️ Picture Frame' },
              { id: 'good-neighbor', label: '🤝 Good Neighbor' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id as FilterCategory)}
                style={{
                  ...rowdies(selectedFilter === f.id ? 700 : 400),
                  fontSize: '0.82rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: 4,
                  border: selectedFilter === f.id ? '1.5px solid #F27A22' : '1.5px solid rgba(255,255,255,0.15)',
                  background: selectedFilter === f.id ? '#F27A22' : 'rgba(20,27,22,0.6)',
                  color: selectedFilter === f.id ? '#141B16' : '#DBD0BD',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* ── 3 MASTER PATHWAY CARDS ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {/* Pathway 1: Pre-Built Catalog */}
          <div
            className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
            style={{
              background: '#1C140E',
              backgroundImage:
                'linear-gradient(rgba(229,184,66,0.06) 1px, transparent 1px), repeating-linear-gradient(45deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 6px)',
              border: '2.5px solid var(--ink)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

            {/* Ribbon */}
            <div
              style={{
                background: 'var(--gold-sun)',
                color: 'var(--ink)',
                padding: '0.75rem 1.2rem',
                borderBottom: '2.5px solid var(--ink)',
                ...rowdies(700),
                fontSize: '1rem',
                textTransform: 'uppercase',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>🗂️ Pre-Built Catalog</span>
              <span style={{ fontSize: '0.75rem', background: '#141B16', color: '#E5B842', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                Fastest Look
              </span>
            </div>

            {/* Preview Image */}
            <div
              style={{
                height: 220,
                background: 'var(--forest-bright)',
                borderBottom: '2.5px solid var(--ink)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/user-uploads/media_1787002208257.png"
                alt="Pre-Built Catalog Preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    ...rowdies(700),
                    fontSize: '0.72rem',
                    background: 'var(--ink)',
                    color: 'var(--gold-sun)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  ⚡ 1-CLICK PRESETS
                </span>
                <h3 style={{ ...rowdies(700), fontSize: '1.6rem', color: '#E5B842', marginBottom: '0.5rem' }}>
                  Greatest Hits Catalog
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.9rem', lineHeight: 1.5, color: '#FAF6EE', marginBottom: '1.2rem' }}>
                  Browse 12+ pre-engineered fence designs. Choose your style, adjust linear footage, and open instantly in CAD.
                </p>

                <ul className="space-y-2 mb-6" style={{ ...rowdies(300), fontSize: '0.85rem', color: '#B5C2BA' }}>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ADE80] font-bold">✓</span>
                    <span>100% pre-configured lumber takeoffs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ADE80] font-bold">✓</span>
                    <span>Starting from $42.00 / LF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ADE80] font-bold">✓</span>
                    <span>Includes Si View HOA pre-approved styles</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/catalog"
                style={{
                  ...rowdies(700),
                  fontSize: '0.95rem',
                  backgroundColor: '#E5B842',
                  color: '#141B16',
                  padding: '0.75rem 1rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid #141B16',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                Browse Pre-Built Looks →
              </Link>
            </div>
          </div>

          {/* Pathway 2: CAD Designer */}
          <div
            className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
            style={{
              background: '#10261A',
              backgroundImage:
                'linear-gradient(rgba(74,222,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.12) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              border: '2.5px solid var(--ink)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

            {/* Ribbon */}
            <div
              style={{
                background: 'var(--ember)',
                color: 'var(--ink)',
                padding: '0.75rem 1.2rem',
                borderBottom: '2.5px solid var(--ink)',
                ...rowdies(700),
                fontSize: '1rem',
                textTransform: 'uppercase',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>📐 Custom 2D Designer</span>
              <span style={{ fontSize: '0.75rem', background: '#141B16', color: '#F27A22', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                Full Studio
              </span>
            </div>

            {/* Preview Image */}
            <div
              style={{
                height: 220,
                background: 'var(--ink)',
                borderBottom: '2.5px solid var(--ink)',
                position: 'relative',
                overflow: 'hidden',
                padding: '0.6rem',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/user-uploads/media_1787002299587.png"
                alt="2D CAD Designer Studio"
                style={{ width: '100%', height: '100%', objectFit: 'contain', border: '2px solid var(--ink)', borderRadius: 2 }}
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    ...rowdies(700),
                    fontSize: '0.72rem',
                    background: 'var(--ink)',
                    color: 'var(--ember)',
                    padding: '0.3rem 0.6rem',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  🎨 LIVE 2D/3D ELEVATION
                </span>
                <h3 style={{ ...rowdies(700), fontSize: '1.6rem', color: '#F27A22', marginBottom: '0.5rem' }}>
                  The CAD Configurator
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.9rem', lineHeight: 1.5, color: '#FAF6EE', marginBottom: '1.2rem' }}>
                  Full parametric studio with 8 customization sub-flips (Posts, Rails, Pickets, Stain, Caps, Hardware, Gates) and live BOM calculations.
                </p>

                <ul className="space-y-2 mb-6" style={{ ...rowdies(300), fontSize: '0.85rem', color: '#B5C2BA' }}>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F27A22] font-bold">✓</span>
                    <span>Real-time linear footage slider (10–400 LF)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F27A22] font-bold">✓</span>
                    <span>Dual street & yard elevation views</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#F27A22] font-bold">✓</span>
                    <span>Dynamic stain shader & hardware selectors</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/designer"
                style={{
                  ...rowdies(700),
                  fontSize: '0.95rem',
                  backgroundColor: '#F27A22',
                  color: '#141B16',
                  padding: '0.75rem 1rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid #141B16',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                Launch CAD Studio →
              </Link>
            </div>
          </div>

          {/* Pathway 3: Style Wizard */}
          <div
            className="has-outside-corners flex flex-col rounded-lg overflow-hidden relative"
            style={{
              background: '#1C140E',
              backgroundImage:
                'linear-gradient(rgba(229,184,66,0.06) 1px, transparent 1px), repeating-linear-gradient(45deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 2px, transparent 2px, transparent 6px)',
              border: '2.5px solid var(--ink)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
            <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

            {/* Ribbon */}
            <div
              style={{
                background: 'var(--gold-sun)',
                color: 'var(--ink)',
                padding: '0.75rem 1.2rem',
                borderBottom: '2.5px solid var(--ink)',
                ...rowdies(700),
                fontSize: '1rem',
                textTransform: 'uppercase',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>🧭 Style Match Wizard</span>
              <span style={{ fontSize: '0.75rem', background: '#141B16', color: '#E5B842', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                Guided
              </span>
            </div>

            {/* Preview Image */}
            <div
              style={{
                height: 220,
                background: 'var(--ink)',
                borderBottom: '2.5px solid var(--ink)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tool-wizard-guided.jpg"
                alt="Guided Style Match Wizard"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span
                  style={{
                    display: 'inline-block',
                    ...rowdies(700),
                    fontSize: '0.72rem',
                    background: 'var(--ink)',
                    color: '#FAF6EE',
                    padding: '0.3rem 0.6rem',
                    borderRadius: 3,
                    border: '1px solid rgba(255,255,255,0.1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  📝 4-STEP QUESTIONNAIRE
                </span>
                <h3 style={{ ...rowdies(700), fontSize: '1.6rem', color: '#E5B842', marginBottom: '0.5rem' }}>
                  Guided Match Wizard
                </h3>
                <p style={{ ...rowdies(300), fontSize: '0.9rem', lineHeight: 1.5, color: '#FAF6EE', marginBottom: '1.2rem' }}>
                  Not sure what post caps go with 3-rail framing? Answer 4 quick questions about your pets, terrain slope, and budget target.
                </p>

                <ul className="space-y-2 mb-6" style={{ ...rowdies(300), fontSize: '0.85rem', color: '#B5C2BA' }}>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ADE80] font-bold">✓</span>
                    <span>Pet containment & security matching</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ADE80] font-bold">✓</span>
                    <span>Hillside slope & stepped post advice</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ADE80] font-bold">✓</span>
                    <span>Instant match output with ARC Blueprint</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/wizard"
                style={{
                  ...rowdies(700),
                  fontSize: '0.95rem',
                  backgroundColor: '#E5B842',
                  color: '#141B16',
                  padding: '0.75rem 1rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid #141B16',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                Start 4-Step Match →
              </Link>
            </div>
          </div>
        </section>

        {/* ── COMPARISON MATRIX ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-12"
          style={{
            background: '#0D140F',
            border: '2px solid var(--ink)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-gold" />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <h2 style={{ ...rowdies(700), fontSize: '1.5rem', color: '#E5B842', marginBottom: '1rem' }}>
            Comparison: Which Pathway is Right for You?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse" style={{ ...rowdies(300) }}>
              <thead>
                <tr className="border-b border-white/20 text-[#FAF6EE]" style={{ ...rowdies(700) }}>
                  <th className="py-3 px-4">Feature / Capability</th>
                  <th className="py-3 px-4 text-[#E5B842]">Pre-Built Catalog</th>
                  <th className="py-3 px-4 text-[#F27A22]">2D CAD Designer</th>
                  <th className="py-3 px-4 text-[#4ADE80]">Guided Wizard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-[#DBD0BD]">
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Best For</td>
                  <td className="py-3 px-4">Browsing proven aesthetics</td>
                  <td className="py-3 px-4">Exact custom engineering</td>
                  <td className="py-3 px-4">First-time fence buyers</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Time to Spec</td>
                  <td className="py-3 px-4">&lt; 1 minute</td>
                  <td className="py-3 px-4">3–5 minutes</td>
                  <td className="py-3 px-4">2 minutes</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">Parametric Footage Slider</td>
                  <td className="py-3 px-4">Instant</td>
                  <td className="py-3 px-4">Full slider control (10–400 LF)</td>
                  <td className="py-3 px-4">Approximate range</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">BOM &amp; Pricing Output</td>
                  <td className="py-3 px-4">Itemized Takeoff</td>
                  <td className="py-3 px-4">Real-time 8-metric ledger</td>
                  <td className="py-3 px-4">Mid-quote estimate</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-white">ARC Blueprint Submittal</td>
                  <td className="py-3 px-4">Included</td>
                  <td className="py-3 px-4">Instant 8.5" × 11" PDF</td>
                  <td className="py-3 px-4">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
    </SiteShell>
  )
}
