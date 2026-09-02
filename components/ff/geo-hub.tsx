'use client'

import React from 'react'
import Link from 'next/link'

export const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

/** M-CLASH-4 wireframe tokens */
export const GEO = {
  cream: '#F8F4EC',
  creamLight: '#FAF6EE',
  forestDeep: '#1B4332',
  forest: '#2F5D3A',
  tanDeep: '#9E8A68',
  gold: '#D9B872',
  goldSun: '#E5B842',
  forestBright: '#4ADE80',
  ember: '#F27A22',
  ink: '#1A1A1A',
  muted: '#383B3E',
} as const

export const geoCardShell: React.CSSProperties = {
  background: GEO.creamLight,
  backgroundImage:
    'linear-gradient(rgba(74,222,128,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.05) 1px, transparent 1px)',
  backgroundSize: '20px 20px',
  border: `2px solid ${GEO.ink}`,
  borderRadius: 10,
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
  overflow: 'hidden',
}

export type GeoBadgeVariant = 'flagship' | 'live' | 'stub' | 'soon' | 'neutral'

const BADGE_STYLE: Record<GeoBadgeVariant, { bg: string; color: string; border: string }> = {
  flagship: { bg: GEO.goldSun, color: GEO.ink, border: GEO.ink },
  live: { bg: '#E6F4EA', color: '#137333', border: '#137333' },
  stub: { bg: '#FEF7E0', color: '#B06000', border: '#B06000' },
  soon: { bg: '#F1ECE1', color: '#777777', border: '#CCCCCC' },
  neutral: { bg: 'rgba(74,222,128,0.12)', color: GEO.forestDeep, border: 'rgba(22,67,45,0.25)' },
}

export interface GeoDirectoryItem {
  key: string
  title: string
  subtitle?: string
  meta?: string
  badge?: string
  badgeVariant?: GeoBadgeVariant
  href?: string | null
  isFlagship?: boolean
}

export function GeoBreadcrumbs({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs text-[#16432D]/60 mb-4 flex flex-wrap items-center gap-2" style={rowdies(300)}>
      {children}
    </div>
  )
}

export function GeoCrumbLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-[#E5B842] text-[#16432D]">
      {children}
    </Link>
  )
}

export function GeoTitleBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      className="has-outside-corners ff-card-inner-sm mb-6 relative"
      style={{
        background: GEO.forestDeep,
        border: `2px solid ${GEO.ink}`,
        borderRadius: 10,
      }}
    >
      <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
      <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />
      <div className="inline-flex items-center gap-2 bg-[#E5B842]/15 border border-[#E5B842] px-3 py-1 rounded text-xs text-[#E5B842] font-bold uppercase tracking-wider mb-2">
        <span>Pillar 1 · Find It</span>
      </div>
      <h1 style={{ ...rowdies(700), fontSize: '1.65rem', color: GEO.creamLight, lineHeight: 1.15, margin: 0 }}>
        {title}
      </h1>
      {subtitle ? (
        <p style={{ ...rowdies(300), fontSize: '0.88rem', color: '#DBD0BD', margin: '0.45rem 0 0', lineHeight: 1.45 }}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

export function GeoHubColumns({ children }: { children: React.ReactNode }) {
  return <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-10 items-start">{children}</section>
}

export function GeoDirectoryColumn({ children }: { children: React.ReactNode }) {
  return <div className="lg:col-span-7">{children}</div>
}

export function GeoContextColumn({ children }: { children: React.ReactNode }) {
  return <div className="lg:col-span-5">{children}</div>
}

interface GeoDirectoryCardProps {
  title: string
  countLabel?: string
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  items: GeoDirectoryItem[]
  emptyMessage?: string
}

function DirectoryTile({ item }: { item: GeoDirectoryItem }) {
  const badgeStyle = BADGE_STYLE[item.badgeVariant ?? 'neutral']
  const border = item.isFlagship ? `2.5px solid ${GEO.goldSun}` : `1.5px solid ${GEO.tanDeep}`
  const isDisabled = !item.href

  const inner = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-1.5 mb-1">
        <h3 style={{ ...rowdies(700), fontSize: '0.95rem', color: GEO.ink, margin: 0, lineHeight: 1.2 }}>{item.title}</h3>
        {item.badge ? (
          <span
            style={{
              ...rowdies(700),
              fontSize: '0.6rem',
              background: badgeStyle.bg,
              color: badgeStyle.color,
              border: `1px solid ${badgeStyle.border}`,
              padding: '0.12rem 0.4rem',
              borderRadius: 3,
              whiteSpace: 'nowrap',
            }}
          >
            {item.badge}
          </span>
        ) : null}
      </div>
      {item.subtitle ? (
        <p style={{ ...rowdies(300), fontSize: '0.72rem', color: '#555', margin: '0 0 0.35rem', lineHeight: 1.35 }}>
          {item.subtitle}
        </p>
      ) : null}
      {item.meta ? (
        <span style={{ ...rowdies(400), fontSize: '0.68rem', color: GEO.forestBright, display: 'block' }}>{item.meta}</span>
      ) : null}
      {!isDisabled ? (
        <span style={{ ...rowdies(700), fontSize: '0.68rem', color: GEO.forest, marginTop: '0.35rem', display: 'inline-block' }}>
          Open hub →
        </span>
      ) : (
        <span style={{ ...rowdies(400), fontSize: '0.68rem', color: '#888', marginTop: '0.35rem', display: 'inline-block' }}>
          Intake pending
        </span>
      )}
    </>
  )

  const tileStyle: React.CSSProperties = {
    background: isDisabled ? '#F4F0E8' : GEO.cream,
    border,
    borderRadius: 8,
    padding: '0.75rem 0.85rem',
    textDecoration: 'none',
    display: 'block',
    transition: 'transform 0.15s ease',
    opacity: isDisabled ? 0.85 : 1,
  }

  if (item.href) {
    return (
      <Link href={item.href} className="hover:-translate-y-0.5" style={tileStyle}>
        {inner}
      </Link>
    )
  }

  return <div style={tileStyle}>{inner}</div>
}

export function GeoDirectoryCard({
  title,
  countLabel,
  searchPlaceholder,
  searchValue = '',
  onSearchChange,
  items,
  emptyMessage = 'No matches found.',
}: GeoDirectoryCardProps) {
  return (
    <div className="has-outside-corners relative" style={geoCardShell}>
      <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
      <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

      <div
        className="ff-card-inner-sm flex flex-wrap items-center justify-between gap-2"
        style={{ background: GEO.forest, borderBottom: `2px solid ${GEO.ink}` }}
      >
        <h2 style={{ ...rowdies(700), fontSize: '1rem', color: GEO.creamLight, margin: 0 }}>{title}</h2>
        {countLabel ? (
          <span style={{ ...rowdies(400), fontSize: '0.72rem', color: GEO.gold }}>{countLabel}</span>
        ) : null}
      </div>

      {onSearchChange && searchPlaceholder ? (
        <div className="ff-card-inner-sm" style={{ borderBottom: `1px solid ${GEO.tanDeep}` }}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-[#FAF6EE] border-2 border-[#9E8A68] text-[#1A1A1A] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#4ADE80] placeholder-[#888]"
            style={rowdies(300)}
          />
        </div>
      ) : null}

      <div
        className="ff-card-inner grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto"
        style={{ alignContent: 'start' }}
      >
        {items.length === 0 ? (
          <p style={{ ...rowdies(300), fontSize: '0.82rem', color: '#666', margin: 0, gridColumn: '1 / -1' }}>{emptyMessage}</p>
        ) : (
          items.map((item) => <DirectoryTile key={item.key} item={item} />)
        )}
      </div>
    </div>
  )
}

export function GeoContextCard({
  title,
  children,
  titleBarColor = GEO.forestDeep,
}: {
  title: string
  children: React.ReactNode
  titleBarColor?: string
}) {
  return (
    <div className="has-outside-corners relative" style={geoCardShell}>
      <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
      <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

      <div
        className="ff-card-inner-sm"
        style={{ background: titleBarColor, borderBottom: `2px solid ${GEO.ink}` }}
      >
        <h2 style={{ ...rowdies(700), fontSize: '1rem', color: GEO.creamLight, margin: 0 }}>{title}</h2>
      </div>

      <div className="ff-card-inner">{children}</div>
    </div>
  )
}

export function GeoFactRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex justify-between gap-3 py-2"
      style={{ borderBottom: '1px dotted #e6ddcf', ...rowdies(300), fontSize: '0.78rem' }}
    >
      <span style={{ color: '#666' }}>{label}</span>
      <strong style={{ color: GEO.ink, textAlign: 'right' }}>{value}</strong>
    </div>
  )
}

export function GeoAdvisorySection({
  title,
  subtitle,
  children,
  accent = GEO.forestBright,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  accent?: string
}) {
  return (
    <section
      className="has-outside-corners ff-card-inner rounded-lg mb-4 relative"
      style={{
        ...geoCardShell,
        border: `2px solid ${accent}`,
      }}
    >
      <span className="corner-mark-out tl c-forest" />
      <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

      {subtitle ? (
        <span style={{ ...rowdies(700), fontSize: '0.75rem', color: GEO.goldSun, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {subtitle}
        </span>
      ) : null}
      <h2 style={{ ...rowdies(700), fontSize: '1.25rem', color: GEO.forestDeep, margin: subtitle ? '0.15rem 0 1rem' : '0 0 1rem' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function GeoRuleGrid({ rules }: { rules: { badge: string; val: string; desc: string }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {rules.map((rule) => (
        <div
          key={rule.badge}
          className="rounded ff-card-inner"
          style={{ background: '#FFFFFF', border: `2px solid ${GEO.ink}`, boxShadow: `2px 2px 0 ${GEO.ink}` }}
        >
          <span
            style={{
              ...rowdies(700),
              fontSize: '0.65rem',
              color: GEO.forestDeep,
              background: 'rgba(74,222,128,0.12)',
              border: '1px solid rgba(22,67,45,0.25)',
              padding: '0.1rem 0.45rem',
              borderRadius: 3,
              display: 'inline-block',
              marginBottom: '0.35rem',
            }}
          >
            {rule.badge}
          </span>
          <div style={{ ...rowdies(700), fontSize: '1.15rem', color: GEO.ink, marginBottom: '0.2rem' }}>{rule.val}</div>
          <p style={{ ...rowdies(300), fontSize: '0.78rem', color: '#555', margin: 0, lineHeight: 1.4 }}>{rule.desc}</p>
        </div>
      ))}
    </div>
  )
}
