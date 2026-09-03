'use client'

import React from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

const pathwayLinkStyle = (bg: string): React.CSSProperties => ({
  ...rowdies(400),
  fontSize: '0.95rem',
  backgroundColor: bg,
  color: '#141B16',
  padding: '0.85rem 1.1rem',
  borderRadius: 4,
  textAlign: 'center',
  textDecoration: 'none',
  border: '2px solid var(--ink)',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  display: 'block',
  textTransform: 'uppercase',
  letterSpacing: '0.02em',
})

const bulletStyle: React.CSSProperties = {
  ...rowdies(300),
  fontSize: '0.88rem',
  lineHeight: 1.45,
  color: '#B5C2BA',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
}

function Bullet({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
      <span style={{ color, ...rowdies(700), flexShrink: 0 }} aria-hidden>
        ✓
      </span>
      <span>{children}</span>
    </li>
  )
}

export default function DesignSuiteHubPage() {
  return (
    <SiteShell width="hub">
      {/* ── TOP ROW: intro + catalog ── */}
      <section className="frame-hub-top">
        <div
          className="has-outside-corners"
          style={{
            backgroundColor: '#1C130B',
            backgroundImage:
              'linear-gradient(rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,122,34,0.08) 1px, transparent 1px), linear-gradient(180deg, #181008 0%, #26160C 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            borderRadius: 'var(--radius, 5px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
            padding: '2.15rem 2.35rem',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            minHeight: 0,
          }}
        >
          <span className="corner-mark-out tl c-orange" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <p
            style={{
              ...rowdies(400),
              fontSize: '0.72rem',
              color: 'var(--ember)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              margin: '0 0 0.75rem',
            }}
          >
            Pillar 2 · Frame It
          </p>
          <h1
            style={{
              ...rowdies(700),
              fontSize: 'clamp(1.85rem, 2.6vw, 2.35rem)',
              color: 'var(--ember)',
              lineHeight: 1.12,
              margin: '0 0 0.85rem',
            }}
          >
            Choose Your Design Pathway
          </h1>
          <p
            style={{
              ...rowdies(300),
              fontSize: '0.98rem',
              lineHeight: 1.55,
              color: '#FAF6EE',
              margin: '0 0 1rem',
            }}
          >
            We suggest you start with the{' '}
            <strong style={{ ...rowdies(400), color: 'var(--gold-sun)' }}>Catalog</strong> on
            Fence Styles. Select a look you like and fine-tune from there.
          </p>
          <p
            style={{
              ...rowdies(300),
              fontSize: '0.92rem',
              lineHeight: 1.55,
              color: '#DBD0BD',
              margin: 0,
            }}
          >
            At any point, take a fence from your screen into the{' '}
            <strong style={{ ...rowdies(400), color: 'var(--ember)' }}>Designer</strong> or{' '}
            <strong style={{ ...rowdies(400), color: 'var(--gold-sun)' }}>Wizard</strong> for
            further detailing — or keep it as-is, save it to your{' '}
            <strong style={{ ...rowdies(400), color: 'var(--forest-bright)' }}>Fence-Folio</strong>
            , and find a qualified contractor.
          </p>
        </div>

        <Link
          href="/catalog"
          className="has-outside-corners"
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            background: '#1C140E',
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/homepage/card-bg-dark-wood-vertical.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2.5px solid var(--ink)',
            borderRadius: 'var(--radius, 5px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            position: 'relative',
            minHeight: 0,
          }}
        >
          <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div
            style={{
              background: 'var(--gold-sun)',
              color: 'var(--ink)',
              padding: '0.7rem 1.2rem',
              borderBottom: '2.5px solid var(--ink)',
              borderRadius: 'calc(var(--radius, 5px) - 2px) calc(var(--radius, 5px) - 2px) 0 0',
              ...rowdies(700),
              fontSize: '1rem',
              textTransform: 'uppercase',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>Catalog</span>
            <span
              style={{
                ...rowdies(400),
                fontSize: '0.7rem',
                background: '#141B16',
                color: '#E5B842',
                padding: '0.15rem 0.5rem',
                borderRadius: 3,
                whiteSpace: 'nowrap',
              }}
            >
              Start here
            </span>
          </div>

          <div
            style={{
              height: 220,
              background: 'var(--forest-bright)',
              borderBottom: '2.5px solid var(--ink)',
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/user-uploads/media_1787002208257.png"
              alt="Fence Styles Catalog"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div
            style={{
              padding: '1.35rem 1.4rem 1.5rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h2
              style={{
                ...rowdies(700),
                fontSize: '1.55rem',
                color: '#E5B842',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Fence Styles
            </h2>
            <p
              style={{
                ...rowdies(300),
                fontSize: '0.92rem',
                lineHeight: 1.5,
                color: '#FAF6EE',
                margin: 0,
              }}
            >
              Best for browsing proven looks. Pick a style, tweak footage, then refine in
              Designer or Wizard — or save straight to Fence-Folio.
            </p>
            <ul style={bulletStyle}>
              <Bullet color="#4ADE80">Pre-built designs with material takeoffs</Bullet>
              <Bullet color="#4ADE80">Includes Si View HOA-friendly styles</Bullet>
              <Bullet color="#4ADE80">Blueprint-ready when you like it as-is</Bullet>
            </ul>
            <span style={pathwayLinkStyle('#E5B842')}>Browse Catalog →</span>
          </div>
        </Link>
      </section>

      {/* ── Designer + Wizard ── */}
      <section className="frame-hub-tools">
        <Link
          href="/designer"
          className="has-outside-corners"
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            background: '#10261A',
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.28), rgba(0,0,0,0.28)), url('/images/homepage/card-bg-wood-horizontal.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2.5px solid var(--ink)',
            borderRadius: 'var(--radius, 5px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-orange" style={{ zIndex: 2 }} />

          <div
            style={{
              background: 'var(--ember)',
              color: 'var(--ink)',
              padding: '0.7rem 1.2rem',
              borderBottom: '2.5px solid var(--ink)',
              borderRadius: 'calc(var(--radius, 5px) - 2px) calc(var(--radius, 5px) - 2px) 0 0',
              ...rowdies(700),
              fontSize: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Designer
          </div>

          <div
            style={{
              height: 240,
              background: 'var(--ink)',
              borderBottom: '2.5px solid var(--ink)',
              overflow: 'hidden',
              padding: '0.55rem',
              boxSizing: 'border-box',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/user-uploads/media_1787002299587.png"
              alt="Fence Designer"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                border: '2px solid var(--ink)',
                borderRadius: 2,
                display: 'block',
                background: '#0a120e',
              }}
            />
          </div>

          <div
            style={{
              padding: '1.4rem 1.5rem 1.55rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h2
              style={{
                ...rowdies(700),
                fontSize: '1.55rem',
                color: '#F27A22',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Detail Your Build
            </h2>
            <p
              style={{
                ...rowdies(300),
                fontSize: '0.92rem',
                lineHeight: 1.5,
                color: '#FAF6EE',
                margin: 0,
              }}
            >
              Best for exact custom work. Open a catalog pick — or start blank — and tune posts,
              rails, pickets, stain, caps, and gates.
            </p>
            <ul style={bulletStyle}>
              <Bullet color="#F27A22">Street and yard elevation views</Bullet>
              <Bullet color="#F27A22">Live materials and cost as you change options</Bullet>
              <Bullet color="#F27A22">Save to Fence-Folio when the run is dialed in</Bullet>
            </ul>
            <span style={pathwayLinkStyle('#F27A22')}>Open Designer →</span>
          </div>
        </Link>

        <Link
          href="/wizard"
          className="has-outside-corners"
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            background: '#1C140E',
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/images/homepage/card-bg-dark-wood-vertical.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: '2.5px solid var(--ink)',
            borderRadius: 'var(--radius, 5px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            position: 'relative',
          }}
        >
          <span className="corner-mark-out tl c-forest" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div
            style={{
              background: 'var(--gold-sun)',
              color: 'var(--ink)',
              padding: '0.7rem 1.2rem',
              borderBottom: '2.5px solid var(--ink)',
              borderRadius: 'calc(var(--radius, 5px) - 2px) calc(var(--radius, 5px) - 2px) 0 0',
              ...rowdies(700),
              fontSize: '1rem',
              textTransform: 'uppercase',
            }}
          >
            Wizard
          </div>

          <div
            style={{
              height: 240,
              background: 'var(--ink)',
              borderBottom: '2.5px solid var(--ink)',
              overflow: 'hidden',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/tool-wizard-guided.jpg"
              alt="Style Wizard"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          <div
            style={{
              padding: '1.4rem 1.5rem 1.55rem',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <h2
              style={{
                ...rowdies(700),
                fontSize: '1.55rem',
                color: '#E5B842',
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Answer a Few Questions
            </h2>
            <p
              style={{
                ...rowdies(300),
                fontSize: '0.92rem',
                lineHeight: 1.5,
                color: '#FAF6EE',
                margin: 0,
              }}
            >
              Best if you&rsquo;re not sure where to start. Tell us about pets, slope, and budget —
              then refine the match or save it.
            </p>
            <ul style={bulletStyle}>
              <Bullet color="#4ADE80">Pet containment and privacy matching</Bullet>
              <Bullet color="#4ADE80">Hillside and stepped-post guidance</Bullet>
              <Bullet color="#4ADE80">Hand off to Designer or Fence-Folio anytime</Bullet>
            </ul>
            <span style={pathwayLinkStyle('#E5B842')}>Start Wizard →</span>
          </div>
        </Link>
      </section>
    </SiteShell>
  )
}
