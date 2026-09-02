'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

interface WizardState {
  goal: string
  terrain: string
  material: string
  budget: string
}

export default function StyleMatchWizardPage() {
  const [step, setStep] = useState<number>(1)
  const [answers, setAnswers] = useState<WizardState>({
    goal: 'privacy',
    terrain: 'flat',
    material: 'cedar',
    budget: 'standard',
  })

  const getMatchedStyle = () => {
    if (answers.goal === 'pets') {
      return {
        id: 'si-view-heritage-01',
        title: "Si View Heritage 6' Cedar Privacy",
        badge: '🐾 OPTIMAL PET SECURITY',
        price: '$48 / LF',
        height: "6' Solid Board",
        description: 'Tight ground clearance with bottom rot-barrier kickboard prevents digging while providing complete 6ft visual enclosure.',
        img: '/images/catalog-vpf-natural.svg',
      }
    }
    if (answers.goal === 'modern' || answers.material === 'stain') {
      return {
        id: 'horizon-modern-02',
        title: "Horizon Modern Horizontal Stack",
        badge: '🌅 ARCHITECTURAL PICK',
        price: '$56 / LF',
        height: "6' Horizontal Slat",
        description: 'Clean shadow-reveal horizontal lines pre-stained with rich Chestnut Brown oil finish for low maintenance and modern curb appeal.',
        img: '/images/hero-carousel/horizontal-01.png',
      }
    }
    if (answers.goal === 'front-yard') {
      return {
        id: 'pnw-classic-picket-05',
        title: "PNW Classic 4ft Front Yard Picket",
        badge: '🏡 ZONING COMPLIANT',
        price: '$38 / LF',
        height: "4' French Gothic",
        description: 'Open decorative picket styling 100% compliant with Washington State and municipal 4ft front yard setback limits.',
        img: '/images/hero-carousel/vertical-04.jpg',
      }
    }
    return {
      id: 'estate-picture-frame-03',
      title: "Estate Picture Frame with 2x4 Top Cap",
      badge: '👑 BEST ALL-AROUND VALUE',
      price: '$52 / LF',
      height: "6' Full Privacy Frame",
      description: 'Fully trimmed border framing with continuous 2x4 structural top cap. Built to withstand 80mph Mt. Si wind load exposure.',
      img: '/images/hero-carousel/vertical-01.png',
    }
  }

  const match = getMatchedStyle()

  return (
    <SiteShell width="wizard">
{/* ── HEADER BANNER ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#1C130B',
            backgroundImage:
              'linear-gradient(rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(180deg, #181008 0%, #26160C 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F27A22]/20 border border-[#F27A22] px-3 py-1 rounded text-xs text-[#F27A22] font-bold uppercase tracking-wider mb-3">
                <span>🧭</span>
                <span>Guided Detail Wizard</span>
              </div>
              <h1 style={{ ...rowdies(700), fontSize: '2.2rem', color: '#F27A22', lineHeight: 1.15, marginBottom: '0.4rem' }}>
                Find Your Perfect Fence Style
              </h1>
              <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
                Answer 4 quick questions. We will calculate structural requirements, verify HOA rules, and match your exact blueprint.
              </p>
            </div>

            {/* Stepper Pill Indicator */}
            <div className="flex items-center gap-1.5 bg-[#121A14] border-2 border-[#E5B842] p-2 rounded-lg">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  onClick={() => setStep(s)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition ${
                    step === s
                      ? 'bg-[#E5B842] text-[#141B16]'
                      : step > s
                      ? 'bg-[#4ADE80] text-[#141B16]'
                      : 'bg-[#1C2620] text-white/50'
                  }`}
                >
                  {step > s ? '✓' : s}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUESTIONNAIRE WORKSPACE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Interactive Questions (7 Cols) */}
          <div
            className="lg:col-span-7 has-outside-corners p-6 sm:p-8 rounded-lg flex flex-col justify-between"
            style={{
              background: '#FAF6EE',
              border: '2px solid #1A1A1A',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            <span className="corner-mark-out tl c-gold" />
            <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

            {/* Step 1: Goal */}
            {step === 1 && (
              <div>
                <span style={{ ...rowdies(700), fontSize: '0.8rem', color: '#E5B842', textTransform: 'uppercase' }}>
                  Step 1 of 4 · Primary Purpose
                </span>
                <h2 style={{ ...rowdies(700), fontSize: '1.5rem', color: '#1A1A1A', marginTop: '0.3rem', marginBottom: '1.2rem' }}>
                  What is the main goal for your new fence?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { id: 'privacy', icon: '🛡️', title: 'Full Backyard Privacy', desc: '6ft solid board blocking neighbor view' },
                    { id: 'pets', icon: '🐕', title: 'Pet & Dog Containment', desc: 'Secure bottom kickboard preventing digging' },
                    { id: 'modern', icon: '🌅', title: 'Modern Curb Appeal', desc: 'Horizontal clean-line architectural style' },
                    { id: 'front-yard', icon: '🏡', title: 'Decorative Front Yard', desc: '4ft open picket style meeting zoning codes' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, goal: opt.id })}
                      className={`p-4 rounded-lg border-2 text-left transition flex flex-col gap-1 cursor-pointer ${
                        answers.goal === opt.id
                          ? 'border-[#E5B842] bg-[#E5B842]/10 text-white'
                          : 'border-white/10 bg-[#0A0F0C] text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl mb-1">{opt.icon}</span>
                      <strong style={{ ...rowdies(700), fontSize: '0.95rem' }}>{opt.title}</strong>
                      <span style={{ ...rowdies(300), fontSize: '0.78rem', color: '#B5C2BA' }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Terrain */}
            {step === 2 && (
              <div>
                <span style={{ ...rowdies(700), fontSize: '0.8rem', color: '#E5B842', textTransform: 'uppercase' }}>
                  Step 2 of 4 · Yard Slope &amp; Terrain
                </span>
                <h2 style={{ ...rowdies(700), fontSize: '1.5rem', color: '#1A1A1A', marginTop: '0.3rem', marginBottom: '1.2rem' }}>
                  What is your property terrain like?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { id: 'flat', icon: '📏', title: 'Mostly Flat Ground', desc: 'Standard post spacing and continuous line' },
                    { id: 'gentle', icon: '📐', title: 'Gentle Slope / Grade', desc: 'Raked or stepped fence line installation' },
                    { id: 'steep', icon: '⛰️', title: 'Steep Hillside / Terraced', desc: 'Custom stepped panels with retaining kickboard' },
                    { id: 'rocky', icon: '🪨', title: 'Rocky / Hard Soil', desc: 'Requires heavy-duty augered footing depth' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, terrain: opt.id })}
                      className={`p-4 rounded-lg border-2 text-left transition flex flex-col gap-1 cursor-pointer ${
                        answers.terrain === opt.id
                          ? 'border-[#E5B842] bg-[#E5B842]/10 text-white'
                          : 'border-white/10 bg-[#0A0F0C] text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl mb-1">{opt.icon}</span>
                      <strong style={{ ...rowdies(700), fontSize: '0.95rem' }}>{opt.title}</strong>
                      <span style={{ ...rowdies(300), fontSize: '0.78rem', color: '#B5C2BA' }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Materials & Finish */}
            {step === 3 && (
              <div>
                <span style={{ ...rowdies(700), fontSize: '0.8rem', color: '#E5B842', textTransform: 'uppercase' }}>
                  Step 3 of 4 · Lumber &amp; Finish
                </span>
                <h2 style={{ ...rowdies(700), fontSize: '1.5rem', color: '#1A1A1A', marginTop: '0.3rem', marginBottom: '1.2rem' }}>
                  What material finish do you prefer?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { id: 'cedar', icon: '🌲', title: 'Natural Tight Knot Cedar', desc: 'Authentic PNW Western Red Cedar aroma & grain' },
                    { id: 'stain', icon: '🎨', title: 'Factory Pre-Stained', desc: 'Pre-treated with UV sealer before assembly' },
                    { id: 'picture-frame', icon: '🖼️', title: 'Border Trimmed Frame', desc: 'Full top cap and fascia boards for clean look' },
                    { id: 'economy', icon: '🪵', title: 'Standard Cedar + PT Posts', desc: 'Pressure treated ground contact posts for longevity' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, material: opt.id })}
                      className={`p-4 rounded-lg border-2 text-left transition flex flex-col gap-1 cursor-pointer ${
                        answers.material === opt.id
                          ? 'border-[#E5B842] bg-[#E5B842]/10 text-white'
                          : 'border-white/10 bg-[#0A0F0C] text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl mb-1">{opt.icon}</span>
                      <strong style={{ ...rowdies(700), fontSize: '0.95rem' }}>{opt.title}</strong>
                      <span style={{ ...rowdies(300), fontSize: '0.78rem', color: '#B5C2BA' }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Budget Range */}
            {step === 4 && (
              <div>
                <span style={{ ...rowdies(700), fontSize: '0.8rem', color: '#E5B842', textTransform: 'uppercase' }}>
                  Step 4 of 4 · Target Budget
                </span>
                <h2 style={{ ...rowdies(700), fontSize: '1.5rem', color: '#1A1A1A', marginTop: '0.3rem', marginBottom: '1.2rem' }}>
                  What is your target investment level?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {[
                    { id: 'economy', icon: '💰', title: 'Value ($35–$45 / LF)', desc: 'Standard 2-rail and essential fencing lines' },
                    { id: 'standard', icon: '⚖️', title: 'Quality Mid ($45–$55 / LF)', desc: '3-rail heavy duty with pre-stain finish' },
                    { id: 'premium', icon: '👑', title: 'Estate Premium ($55–$75 / LF)', desc: 'Horizontal slats, picture frame, custom caps' },
                    { id: 'flexible', icon: '✨', title: 'Show Best Options', desc: 'Compare value vs premium takeoffs' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAnswers({ ...answers, budget: opt.id })}
                      className={`p-4 rounded-lg border-2 text-left transition flex flex-col gap-1 cursor-pointer ${
                        answers.budget === opt.id
                          ? 'border-[#E5B842] bg-[#E5B842]/10 text-white'
                          : 'border-white/10 bg-[#0A0F0C] text-white/70 hover:border-white/30'
                      }`}
                    >
                      <span className="text-xl mb-1">{opt.icon}</span>
                      <strong style={{ ...rowdies(700), fontSize: '0.95rem' }}>{opt.title}</strong>
                      <span style={{ ...rowdies(300), fontSize: '0.78rem', color: '#B5C2BA' }}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="bg-[#141B16] border border-white/20 disabled:opacity-30 text-white px-4 py-2 rounded text-xs font-bold cursor-pointer"
              >
                ← Back
              </button>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  className="bg-[#E5B842] hover:bg-[#d6a836] text-[#141B16] px-5 py-2 rounded text-xs font-bold cursor-pointer transition uppercase"
                >
                  Continue →
                </button>
              ) : (
                <Link
                  href={`/designer?preset=${match.id}`}
                  className="bg-[#4ADE80] hover:bg-[#3ec470] text-[#141B16] px-5 py-2 rounded text-xs font-bold transition uppercase"
                  style={{ textDecoration: 'none' }}
                >
                  Lock In Match &amp; Open CAD →
                </Link>
              )}
            </div>
          </div>

          {/* Right: Live Matched Design Blueprint Preview (5 Cols) */}
          <div
            className="lg:col-span-5 has-outside-corners p-6 rounded-lg flex flex-col justify-between"
            style={{
              background: '#16432D',
              backgroundImage:
                'linear-gradient(rgba(74,222,128,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.12) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              border: '2.5px solid var(--ink)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span className="corner-mark-out tl c-orange" />
            <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

            <div>
              <div className="flex justify-between items-center mb-3">
                <span style={{ ...rowdies(700), fontSize: '0.75rem', color: '#E5B842', textTransform: 'uppercase' }}>
                  Live Matched Blueprint
                </span>
                <span style={{ ...rowdies(700), fontSize: '0.68rem', background: '#D9B872', color: '#141B16', padding: '0.15rem 0.5rem', borderRadius: 3 }}>
                  {match.badge}
                </span>
              </div>

              <h3 style={{ ...rowdies(700), fontSize: '1.3rem', color: '#FFFFFF', marginBottom: '0.2rem' }}>
                {match.title}
              </h3>
              <div style={{ ...rowdies(400), fontSize: '0.75rem', color: '#A5D6A7', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                Estimated Cost: <strong className="text-[#E5B842]">{match.price}</strong> • {match.height}
              </div>

              {/* Render Preview */}
              <div
                className="bg-[#10261A] border-2 border-[#141B16] rounded p-4 mb-4 flex items-center justify-center min-h-[220px]"
                style={{ boxShadow: 'inset 0 0 16px rgba(0,0,0,0.6)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={match.img}
                  alt={match.title}
                  style={{
                    maxHeight: 180,
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.5))',
                  }}
                />
              </div>

              <p style={{ ...rowdies(300), fontSize: '0.85rem', lineHeight: 1.45, color: '#FAF6EE', margin: 0 }}>
                {match.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-2">
              <Link
                href={`/designer?preset=${match.id}`}
                style={{
                  ...rowdies(700),
                  fontSize: '0.88rem',
                  backgroundColor: '#F27A22',
                  color: '#141B16',
                  padding: '0.65rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '2px solid #141B16',
                  display: 'block',
                  textTransform: 'uppercase',
                }}
              >
                Customize in 2D Designer →
              </Link>
              <Link
                href={`/blueprint?preset=${match.id}`}
                style={{
                  ...rowdies(400),
                  fontSize: '0.8rem',
                  backgroundColor: '#141B16',
                  color: '#4ADE80',
                  padding: '0.45rem',
                  borderRadius: 4,
                  textAlign: 'center',
                  textDecoration: 'none',
                  border: '1.5px solid #4ADE80',
                  display: 'block',
                }}
              >
                Download Matched ARC Blueprint
              </Link>
            </div>
          </div>
        </div>
    </SiteShell>
  )
}
