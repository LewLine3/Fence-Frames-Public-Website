'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'
import { folioHref } from '@/lib/saved-folios'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

/** M-CLASH-4 wireframe tokens (15-all-wireframes-canvas.html) */
const M = {
  cream: '#F8F4EC',
  creamLight: '#FAF6EE',
  forestDeep: '#1B4332',
  forest: '#2F5D3A',
  tan: '#C4B294',
  tanDeep: '#9E8A68',
  gold: '#D9B872',
  ink: '#1A1A1A',
  muted: '#383B3E',
}

const cardFrame: React.CSSProperties = {
  background: M.creamLight,
  border: `2px solid ${M.ink}`,
  borderRadius: 10,
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  overflow: 'hidden',
}

const innerPanel: React.CSSProperties = {
  background: M.cream,
  border: `1px solid ${M.tanDeep}`,
  borderRadius: 8,
}

const SI_VIEW_DESIGNS = [
  {
    id: 'si-view-design-01',
    code: 'DESIGN 01',
    name: 'Solid Heritage Cedar Privacy',
    specs: "6' Solid Vertical Pickets • 2x4 Top Cap • 4x4 PT Posts",
    img: '/images/catalog-vpf-natural.svg',
  },
  {
    id: 'si-view-design-02',
    code: 'DESIGN 02',
    name: 'Estate Picture Frame w/ Top Cap',
    specs: "6' Fully Enclosed Frame • Fascia Trim • Continuous Cap",
    img: '/images/hero-carousel/vertical-01.png',
  },
  {
    id: 'si-view-design-03',
    code: 'DESIGN 03',
    name: 'Horizon Modern Horizontal Stack',
    specs: "6' Horizontal Cedar Slats • 1/4\" Reveal • Hidden Posts",
    img: '/images/hero-carousel/horizontal-01.png',
  },
  {
    id: 'si-view-design-04',
    code: 'DESIGN 04',
    name: 'Good Neighbor Alternating Shadowbox',
    specs: "6' Alternating 1x6 Boards • Wind Flow Relief • 50/50 Look",
    img: '/images/hero-carousel/vertical-02.png',
  },
]

const STAIN_SWATCHES = [
  { name: 'Natural Cedar', fill: '#C4B294', text: M.ink },
  { name: 'Terracotta Mid', fill: '#7D5A3F', text: '#FAF6EE' },
  { name: 'Dark Walnut', fill: '#54483B', text: '#FAF6EE' },
]

export default function SiViewCommunityPage({
  params,
}: {
  params: Promise<{ county: string; city: string; community: string }>
}) {
  use(params)

  return (
    <SiteShell width="hub">
      {/* Breadcrumbs — wireframe path string */}
      <nav
        className="mb-3 ff-card-inner-sm"
        style={{ ...rowdies(400), fontSize: '0.8rem', color: M.forest, paddingTop: 0, paddingBottom: 0 }}
        aria-label="Breadcrumbs"
      >
        <Link href="/wa" className="hover:text-[#E5B842]" style={{ color: M.forest }}>
          Washington
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/wa/king-county" className="hover:text-[#E5B842]" style={{ color: M.forest }}>
          King County
        </Link>
        <span className="mx-1.5">/</span>
        <Link href="/wa/king-county/north-bend" className="hover:text-[#E5B842]" style={{ color: M.forest }}>
          North Bend
        </Link>
        <span className="mx-1.5">/</span>
        <span style={{ color: M.ink, ...rowdies(700) }}>Si View HOA</span>
      </nav>

      {/* Page title bar — wireframe dark header strip */}
      <header
        className="has-outside-corners ff-card-inner-sm mb-6 rounded-[10px]"
        style={{
          background: M.forestDeep,
          border: `2px solid ${M.ink}`,
          borderRadius: 10,
          boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
        }}
      >
        <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
        <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />
        <h1 style={{ ...rowdies(700), fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', color: '#FAF6EE', margin: 0, lineHeight: 1.2 }}>
          Si View HOA — Fence Guidelines &amp; Pre-Approved Presets
        </h1>
      </header>

      {/* Two-column wireframe body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-start">
        {/* LEFT — Bylaws & height matrix */}
        <section className="lg:col-span-7 has-outside-corners relative" style={cardFrame}>
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div
            className="ff-card-inner-sm"
            style={{ background: M.forestDeep, borderBottom: `2px solid ${M.ink}` }}
          >
            <h2 style={{ ...rowdies(700), fontSize: '0.95rem', color: '#FAF6EE', margin: 0 }}>
              Si View HOA Architectural Bylaws &amp; Height Matrix
            </h2>
          </div>

          <div className="ff-card-inner flex flex-col gap-4">
            {/* Allowed heights */}
            <div className="ff-card-inner-sm" style={innerPanel}>
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: M.forestDeep, margin: '0 0 0.75rem' }}>
                Allowed Fence Heights:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className="ff-card-inner-sm text-center sm:text-left"
                  style={{ background: M.forest, border: `2px solid ${M.ink}`, borderRadius: 6 }}
                >
                  <span style={{ ...rowdies(700), fontSize: '0.8rem', color: '#FAF6EE' }}>
                    Rear &amp; Side Yard: 6 ft Max
                  </span>
                </div>
                <div
                  className="ff-card-inner-sm text-center sm:text-left"
                  style={{ background: M.creamLight, border: `1px solid ${M.tanDeep}`, borderRadius: 6 }}
                >
                  <span style={{ ...rowdies(400), fontSize: '0.8rem', color: M.muted }}>
                    Front Yard: 4 ft Max (Picket)
                  </span>
                </div>
              </div>
            </div>

            {/* Material schedule */}
            <div className="ff-card-inner-sm" style={innerPanel}>
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: M.forestDeep, margin: '0 0 0.65rem' }}>
                Approved Material Schedule:
              </h3>
              <ul style={{ ...rowdies(300), fontSize: '0.8rem', color: M.muted, margin: 0, paddingLeft: '1.1rem', lineHeight: 1.65 }}>
                <li>Posts: 4×4 or 4×6 Pressure Treated Ground Contact</li>
                <li>Rails: 2×4 Western Red Cedar (Top, Middle, Bottom)</li>
                <li>Pickets: 1×6 Tight Knot Vertical Western Red Cedar</li>
              </ul>
            </div>

            {/* Stain swatches */}
            <div className="ff-card-inner-sm" style={innerPanel}>
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: M.forestDeep, margin: '0 0 0.75rem' }}>
                Pre-Approved Stain Color Swatches:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STAIN_SWATCHES.map((swatch) => (
                  <div
                    key={swatch.name}
                    className="ff-card-inner-sm flex items-end min-h-[75px]"
                    style={{ background: swatch.fill, border: `2px solid ${M.ink}`, borderRadius: 6 }}
                  >
                    <span style={{ ...rowdies(700), fontSize: '0.78rem', color: swatch.text }}>{swatch.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CC&R supplement */}
            <div className="ff-card-inner-sm" style={innerPanel}>
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: M.forestDeep, margin: '0 0 0.5rem' }}>
                CC&amp;R Section 4.2 Highlights
              </h3>
              <ul style={{ ...rowdies(300), fontSize: '0.78rem', color: M.muted, margin: 0, paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                <li>Western Red Cedar required for all visible pickets and trim; PT posts below grade only.</li>
                <li>Greenbelt buffer lots: 4 ft max along rear lot line without special ARC review.</li>
                <li>Factory pre-stain required within 60 days using approved natural cedar-tone sealers.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* RIGHT — Official preset panel (forest green column) */}
        <aside
          className="lg:col-span-5 has-outside-corners relative"
          style={{
            ...cardFrame,
            background: M.forest,
            border: `2px solid ${M.ink}`,
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div
            className="ff-card-inner-sm"
            style={{ background: M.forestDeep, borderBottom: `2px solid ${M.ink}` }}
          >
            <h2 style={{ ...rowdies(700), fontSize: '0.95rem', color: '#FAF6EE', margin: 0 }}>
              Si View Official Preset
            </h2>
          </div>

          <div className="ff-card-inner flex flex-col gap-4">
            {/* Flagship preset card */}
            <div
              className="ff-card-inner text-center flex flex-col items-center justify-center min-h-[150px]"
              style={{ ...innerPanel, border: `2px solid ${M.ink}` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/catalog-vpf-natural.svg"
                alt="Heritage Vertical Picket elevation"
                style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain', marginBottom: '0.5rem' }}
              />
              <p style={{ ...rowdies(700), fontSize: '0.9rem', color: M.forestDeep, margin: '0 0 0.25rem' }}>
                Heritage Vertical Picket
              </p>
              <p style={{ ...rowdies(300), fontSize: '0.75rem', color: M.muted, margin: '0 0 0.35rem' }}>
                6ft Height · 1×6 Cedar · 2×4 Rails
              </p>
              <p style={{ ...rowdies(700), fontSize: '0.75rem', color: M.forest, margin: 0 }}>
                100% Pre-Approved for Si View
              </p>
            </div>

            {/* Helper notice */}
            <div
              className="ff-card-inner-sm"
              style={{ background: M.forestDeep, border: `2px solid ${M.ink}`, borderRadius: 8 }}
            >
              <p style={{ ...rowdies(700), fontSize: '0.72rem', color: M.gold, margin: '0 0 0.35rem' }}>
                Unofficial Homeowner Helper Notice:
              </p>
              <p style={{ ...rowdies(300), fontSize: '0.72rem', color: '#FAF6EE', margin: 0, lineHeight: 1.45 }}>
                Fence Frames compiles bylaws as a design aid. Always confirm final ARC approval with your HOA
                architectural review committee before construction.
              </p>
            </div>

            <Link
              href="/designer?preset=si-view-design-01&hoa=si-view"
              style={{
                ...rowdies(700),
                display: 'block',
                textAlign: 'center',
                background: M.gold,
                color: M.ink,
                border: `2px solid ${M.ink}`,
                borderRadius: 10,
                padding: '0.75rem 1rem',
                textDecoration: 'none',
                fontSize: '0.85rem',
              }}
            >
              Launch Si View 2D Preset →
            </Link>

            <Link
              href={folioHref('FF-98045-8912')}
              style={{
                ...rowdies(700),
                display: 'block',
                textAlign: 'center',
                background: M.creamLight,
                color: M.forestDeep,
                border: `2px solid ${M.ink}`,
                borderRadius: 10,
                padding: '0.65rem 1rem',
                textDecoration: 'none',
                fontSize: '0.8rem',
              }}
            >
              Download ARC Submittal PDF
            </Link>
          </div>
        </aside>
      </div>

      {/* Designs 01–04 — compact grid below wireframe core (page spec) */}
      <section className="mb-6">
        <div className="flex flex-wrap items-end justify-between gap-2 mb-4 ff-card-inner-sm" style={{ paddingTop: 0 }}>
          <h2 style={{ ...rowdies(700), fontSize: '1.15rem', color: M.forestDeep, margin: 0 }}>
            4 Certified Si View Architectural Designs
          </h2>
          <span style={{ ...rowdies(300), fontSize: '0.78rem', color: M.muted }}>
            Select any design to pre-seed the 2D configurator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SI_VIEW_DESIGNS.map((d) => (
            <article key={d.id} className="has-outside-corners relative" style={cardFrame}>
              <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
              <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

              <div
                className="ff-card-inner-sm flex flex-wrap items-center justify-between gap-2"
                style={{ background: M.forestDeep, borderBottom: `2px solid ${M.ink}` }}
              >
                <span style={{ ...rowdies(700), fontSize: '0.82rem', color: M.gold }}>
                  {d.code}: {d.name}
                </span>
                <span
                  style={{
                    ...rowdies(700),
                    fontSize: '0.62rem',
                    background: M.forest,
                    color: '#FAF6EE',
                    border: `1px solid ${M.ink}`,
                    padding: '0.15rem 0.45rem',
                    borderRadius: 4,
                  }}
                >
                  PRE-APPROVED
                </span>
              </div>

              <div
                className="ff-card-inner-sm flex items-center justify-center"
                style={{ background: M.cream, borderBottom: `1px solid ${M.tanDeep}`, minHeight: 140 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.img} alt={d.name} style={{ maxHeight: 110, maxWidth: '100%', objectFit: 'contain' }} />
              </div>

              <div className="ff-card-inner">
                <p style={{ ...rowdies(300), fontSize: '0.78rem', color: M.muted, margin: '0 0 0.75rem' }}>{d.specs}</p>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/designer?preset=${d.id}&hoa=si-view`}
                    style={{
                      ...rowdies(700),
                      flex: '1 1 auto',
                      textAlign: 'center',
                      fontSize: '0.75rem',
                      background: M.gold,
                      color: M.ink,
                      border: `2px solid ${M.ink}`,
                      borderRadius: 8,
                      padding: '0.5rem 0.75rem',
                      textDecoration: 'none',
                    }}
                  >
                    Configure in CAD →
                  </Link>
                  <Link
                    href={folioHref('FF-98045-8912')}
                    style={{
                      ...rowdies(400),
                      fontSize: '0.72rem',
                      background: M.forestDeep,
                      color: '#FAF6EE',
                      border: `1.5px solid ${M.ink}`,
                      borderRadius: 8,
                      padding: '0.5rem 0.75rem',
                      textDecoration: 'none',
                    }}
                  >
                    ARC PDF
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
