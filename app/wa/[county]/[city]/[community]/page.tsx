'use client'

import React, { use } from 'react'
import Link from 'next/link'
import { SiteShell } from '@/components/ff/site-shell'
import { folioHref } from '@/lib/saved-folios'
import {
  GeoBreadcrumbs,
  GeoCrumbLink,
  GeoGraduatedPanel,
  GeoTitleBar,
  geoCtaStyle,
  geoSurfaceStyle,
  rowdies,
  GEO,
} from '@/components/ff/geo-hub'

const SI_VIEW_DESIGNS = [
  {
    id: 'si-view-design-01',
    code: 'DESIGN 01',
    name: 'Solid Heritage Cedar Privacy',
    specs: "6' Solid Vertical Pickets • 2x4 Top Cap • 4x4 PT Posts",
    img: '/images/catalog-vpf-natural.svg',
    surface: 'hatchCream' as const,
  },
  {
    id: 'si-view-design-02',
    code: 'DESIGN 02',
    name: 'Estate Picture Frame w/ Top Cap',
    specs: "6' Fully Enclosed Frame • Fascia Trim • Continuous Cap",
    img: '/images/hero-carousel/vertical-01.png',
    surface: 'tanBlackGrid' as const,
  },
  {
    id: 'si-view-design-03',
    code: 'DESIGN 03',
    name: 'Horizon Modern Horizontal Stack',
    specs: "6' Horizontal Cedar Slats • 1/4\" Reveal · Hidden Posts",
    img: '/images/hero-carousel/horizontal-01.png',
    surface: 'hatchGold' as const,
  },
  {
    id: 'si-view-design-04',
    code: 'DESIGN 04',
    name: 'Good Neighbor Alternating Shadowbox',
    specs: "6' Alternating 1x6 Boards · Wind Flow Relief · 50/50 Look",
    img: '/images/hero-carousel/vertical-02.png',
    surface: 'doublePlank' as const,
  },
]

const STAIN_SWATCHES = [
  { name: 'Natural Cedar', fill: '#C4B294', text: GEO.ink },
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
      <GeoBreadcrumbs>
        <GeoCrumbLink href="/wa">Washington</GeoCrumbLink>
        <span>/</span>
        <GeoCrumbLink href="/wa/king-county">King County</GeoCrumbLink>
        <span>/</span>
        <GeoCrumbLink href="/wa/king-county/north-bend">North Bend</GeoCrumbLink>
        <span>/</span>
        <span className="text-[#E5B842]">Si View HOA</span>
      </GeoBreadcrumbs>

      <GeoTitleBar title="Si View HOA — Fence Guidelines &amp; Pre-Approved Presets" />

      {/* Wireframe layout preserved; graduated card surfaces only */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-start">
        {/* LEFT — Bylaws: colored + hatch/grid (no wood) */}
        <GeoGraduatedPanel
          className="lg:col-span-7"
          title="Si View HOA Architectural Bylaws & Height Matrix"
          surface="hatchForest"
          titleTone="forest"
        >
          <div className="flex flex-col gap-4">
            <div
              className="ff-card-inner-sm"
              style={{ ...geoSurfaceStyle('tanBlackGrid'), border: `1px solid ${GEO.tanDeep}`, borderRadius: 8 }}
            >
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: GEO.forestDeep, margin: '0 0 0.75rem' }}>
                Allowed Fence Heights:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  className="ff-card-inner-sm text-center sm:text-left"
                  style={{ background: GEO.forest, border: `2px solid ${GEO.ink}`, borderRadius: 6 }}
                >
                  <span style={{ ...rowdies(700), fontSize: '0.8rem', color: '#FAF6EE' }}>
                    Rear &amp; Side Yard: 6 ft Max
                  </span>
                </div>
                <div
                  className="ff-card-inner-sm text-center sm:text-left"
                  style={{ ...geoSurfaceStyle('hatchCream'), border: `1px solid ${GEO.tanDeep}`, borderRadius: 6 }}
                >
                  <span style={{ ...rowdies(400), fontSize: '0.8rem', color: GEO.muted }}>
                    Front Yard: 4 ft Max (Picket)
                  </span>
                </div>
              </div>
            </div>

            <div
              className="ff-card-inner-sm"
              style={{ ...geoSurfaceStyle('doublePlank'), border: `1px solid ${GEO.tanDeep}`, borderRadius: 8 }}
            >
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: GEO.forestDeep, margin: '0 0 0.65rem' }}>
                Approved Material Schedule:
              </h3>
              <ul style={{ ...rowdies(300), fontSize: '0.8rem', color: GEO.muted, margin: 0, paddingLeft: '1.1rem', lineHeight: 1.65 }}>
                <li>Posts: 4×4 or 4×6 Pressure Treated Ground Contact</li>
                <li>Rails: 2×4 Western Red Cedar (Top, Middle, Bottom)</li>
                <li>Pickets: 1×6 Tight Knot Vertical Western Red Cedar</li>
              </ul>
            </div>

            <div
              className="ff-card-inner-sm"
              style={{ ...geoSurfaceStyle('hatchCream'), border: `1px solid ${GEO.tanDeep}`, borderRadius: 8 }}
            >
              <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: GEO.forestDeep, margin: '0 0 0.75rem' }}>
                Pre-Approved Stain Color Swatches:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {STAIN_SWATCHES.map((swatch) => (
                  <div
                    key={swatch.name}
                    className="ff-card-inner-sm flex items-end min-h-[75px]"
                    style={{ background: swatch.fill, border: `2px solid ${GEO.ink}`, borderRadius: 6 }}
                  >
                    <span style={{ ...rowdies(700), fontSize: '0.78rem', color: swatch.text }}>{swatch.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="ff-card-inner-sm"
              style={{ ...geoSurfaceStyle('microQuad'), border: `1px solid ${GEO.ink}`, borderRadius: 8 }}
            >
              <div style={{ background: 'rgba(250,246,238,0.94)', borderRadius: 6, padding: '0.65rem 0.75rem' }}>
                <h3 style={{ ...rowdies(700), fontSize: '0.85rem', color: GEO.forestDeep, margin: '0 0 0.5rem' }}>
                  CC&amp;R Section 4.2 Highlights
                </h3>
                <ul style={{ ...rowdies(300), fontSize: '0.78rem', color: GEO.muted, margin: 0, paddingLeft: '1.1rem', lineHeight: 1.55 }}>
                  <li>Western Red Cedar required for all visible pickets and trim; PT posts below grade only.</li>
                  <li>Greenbelt buffer lots: 4 ft max along rear lot line without special ARC review.</li>
                  <li>Factory pre-stain required within 60 days using approved natural cedar-tone sealers.</li>
                </ul>
              </div>
            </div>
          </div>
        </GeoGraduatedPanel>

        {/* RIGHT — Official preset: THE only wood texture on this page */}
        <GeoGraduatedPanel
          className="lg:col-span-5"
          title="Si View Official Preset"
          surface="woodPlanks"
          titleTone="ink"
        >
          <div className="flex flex-col gap-4">
            <div
              className="ff-card-inner text-center flex flex-col items-center justify-center min-h-[150px]"
              style={{ ...geoSurfaceStyle('hatchCream'), border: `2px solid ${GEO.ink}`, borderRadius: 8 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/catalog-vpf-natural.svg"
                alt="Heritage Vertical Picket elevation"
                style={{ maxHeight: 72, maxWidth: '100%', objectFit: 'contain', marginBottom: '0.5rem' }}
              />
              <p style={{ ...rowdies(700), fontSize: '0.9rem', color: GEO.forestDeep, margin: '0 0 0.25rem' }}>
                Heritage Vertical Picket
              </p>
              <p style={{ ...rowdies(300), fontSize: '0.75rem', color: GEO.muted, margin: '0 0 0.35rem' }}>
                6ft Height · 1×6 Cedar · 2×4 Rails
              </p>
              <p style={{ ...rowdies(700), fontSize: '0.75rem', color: GEO.forest, margin: 0 }}>
                100% Pre-Approved for Si View
              </p>
            </div>

            <div
              className="ff-card-inner-sm"
              style={{ ...geoSurfaceStyle('solidForest'), border: `2px solid ${GEO.ink}`, borderRadius: 8 }}
            >
              <p style={{ ...rowdies(700), fontSize: '0.72rem', color: GEO.gold, margin: '0 0 0.35rem' }}>
                Unofficial Homeowner Helper Notice:
              </p>
              <p style={{ ...rowdies(300), fontSize: '0.72rem', color: '#FAF6EE', margin: 0, lineHeight: 1.45 }}>
                Fence Frames compiles bylaws as a design aid. Always confirm final ARC approval with your HOA
                architectural review committee before construction.
              </p>
            </div>

            <Link href="/designer?preset=si-view-design-01&hoa=si-view" style={{ ...geoCtaStyle('gold'), display: 'block', textAlign: 'center' }}>
              Launch Si View 2D Preset →
            </Link>

            <Link href={folioHref('FF-98045-8912')} style={{ ...geoCtaStyle('cream'), display: 'block', textAlign: 'center' }}>
              Download ARC Submittal PDF
            </Link>
          </div>
        </GeoGraduatedPanel>
      </div>

      <section className="mb-6">
        <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
          <h2 style={{ ...rowdies(700), fontSize: '1.15rem', color: GEO.forestDeep, margin: 0 }}>
            4 Certified Si View Architectural Designs
          </h2>
          <span style={{ ...rowdies(300), fontSize: '0.78rem', color: GEO.muted }}>
            Select any design to pre-seed the 2D configurator
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SI_VIEW_DESIGNS.map((d) => (
            <GeoGraduatedPanel key={d.id} title={`${d.code}: ${d.name}`} surface={d.surface} titleTone="forest">
              <div
                className="ff-card-inner-sm flex items-center justify-center mb-3"
                style={{ ...geoSurfaceStyle('hatchCream'), border: `1px solid ${GEO.tanDeep}`, borderRadius: 8, minHeight: 140 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.img} alt={d.name} style={{ maxHeight: 110, maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <p style={{ ...rowdies(300), fontSize: '0.78rem', color: GEO.muted, margin: '0 0 0.75rem' }}>{d.specs}</p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={`/designer?preset=${d.id}&hoa=si-view`}
                  style={{ ...geoCtaStyle('gold'), flex: '1 1 auto', textAlign: 'center' }}
                >
                  Configure in CAD →
                </Link>
                <Link href={folioHref('FF-98045-8912')} style={{ ...geoCtaStyle('forest'), textAlign: 'center' }}>
                  ARC PDF
                </Link>
              </div>
            </GeoGraduatedPanel>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
