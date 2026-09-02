'use client'

import React from 'react'
import type { FenceConfiguration } from '@/lib/pricing-engine'
import {
  getChapterDef,
  type ChapterDef,
  type ConfigOption,
} from '@/lib/configurator/options-catalog'
import { cn } from '@/lib/utils'

interface ChapterConfigPanelProps {
  active: string
  chapter?: { id: string; num: string; menuLabel: string; label: string; icon: string; preview: string }
  config: FenceConfiguration
  onChange: (updated: Partial<FenceConfiguration>) => void
  onSelectChapter: (id: string | null) => void
  prevChapter: string | null
  nextChapter: string | null
}

const optionIdle =
  'bg-[#1C241E] text-[#FAF6EE]/90 border-[#C4A574]/45 hover:border-[#E5B842]/70 hover:bg-[#243028]'
const optionActive = 'bg-[#F27A22] text-white border-[#1A1A1A] shadow-[2px_2px_0_#1A1A1A]'

function OptionThumb({ src, colorPreview, selected }: { src?: string; colorPreview?: string; selected: boolean }) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        className={cn(
          'w-12 h-12 rounded-lg object-contain bg-black/35 border-2 shrink-0',
          selected ? 'border-[#E5B842]' : 'border-[#C4A574]/40',
        )}
      />
    )
  }
  if (colorPreview) {
    return (
      <span
        className={cn(
          'w-12 h-12 rounded-lg border-2 shrink-0 shadow',
          selected ? 'border-[#E5B842]' : 'border-white/25',
        )}
        style={{ background: colorPreview }}
      />
    )
  }
  return null
}

function CatalogOptionButton({
  option,
  selected,
  onClick,
  compact,
}: {
  option: ConfigOption
  selected: boolean
  onClick: () => void
  compact?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-xl border-2 text-left transition flex items-center gap-3 cursor-pointer w-full',
        compact ? 'min-h-[64px] px-3 py-3' : 'min-h-[80px] px-3.5 py-3.5',
        selected ? optionActive : optionIdle,
      )}
    >
      <OptionThumb src={option.thumbSrc} colorPreview={option.colorPreview} selected={selected} />
      <div className="min-w-0 flex-1">
        <div className={cn('font-bold leading-tight', compact ? 'text-sm' : 'text-base')}>{option.label}</div>
        {option.description && (
          <div className="text-[11px] opacity-70 font-light mt-1 line-clamp-2">{option.description}</div>
        )}
      </div>
      {option.costLabel && (
        <span
          className={cn(
            'shrink-0 text-[10px] font-mono font-bold px-2 py-1 rounded-md border',
            selected
              ? 'bg-[#E5B842] text-[#141B16] border-[#1A1A1A]'
              : 'bg-black/40 text-[#4ADE80] border-[#4ADE80]/40',
          )}
        >
          {option.costLabel}
        </span>
      )}
    </button>
  )
}

function GatesUi({
  config,
  onChange,
}: {
  config: FenceConfiguration
  onChange: (updated: Partial<FenceConfiguration>) => void
}) {
  const rows = [
    {
      key: 'walk' as const,
      title: '4ft Walk Gate',
      desc: 'Steel anti-sag frame · Simpson hardware',
      value: config.gates?.walkGates || 0,
      max: 6,
      cost: '$385/ea',
      color: 'linear-gradient(135deg, #D97706, #92400E)',
    },
    {
      key: 'drive' as const,
      title: '10ft Drive Gate',
      desc: 'Double swing + drop rod',
      value: config.gates?.driveGates || 0,
      max: 4,
      cost: '$850/ea',
      color: 'linear-gradient(135deg, #B45309, #78350F)',
    },
  ]

  return (
    <div className="space-y-3 text-white">
      {rows.map((g) => (
        <div
          key={g.key}
          className="p-4 rounded-xl border-2 border-[#C4A574]/45 bg-[#1C241E] flex items-center justify-between gap-3 min-h-[96px]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-12 h-12 rounded-lg border border-[#C4A574]/40 shrink-0 shadow"
              style={{ background: g.color }}
            />
            <div className="min-w-0">
              <div className="text-base font-bold text-white">{g.title}</div>
              <div className="text-[11px] text-white/55 font-light mt-0.5">{g.desc}</div>
              <div className="text-[10px] text-[#4ADE80] font-mono mt-1">{g.cost}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onChange({
                  gates: {
                    walkGates:
                      g.key === 'walk' ? Math.max(0, g.value - 1) : config.gates?.walkGates || 0,
                    driveGates:
                      g.key === 'drive' ? Math.max(0, g.value - 1) : config.gates?.driveGates || 0,
                  },
                })
              }
              className="w-10 h-10 bg-[#141B16] rounded-lg border-2 border-[#C4A574]/40 font-bold text-lg hover:bg-white/10"
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-[#E5B842] text-xl">{g.value}</span>
            <button
              type="button"
              onClick={() =>
                onChange({
                  gates: {
                    walkGates:
                      g.key === 'walk' ? Math.min(g.max, g.value + 1) : config.gates?.walkGates || 0,
                    driveGates:
                      g.key === 'drive'
                        ? Math.min(g.max, g.value + 1)
                        : config.gates?.driveGates || 0,
                  },
                })
              }
              className="w-10 h-10 bg-[#141B16] rounded-lg border-2 border-[#C4A574]/40 font-bold text-lg hover:bg-white/10"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ChapterConfigPanel({
  active,
  chapter,
  config,
  onChange,
  onSelectChapter,
  prevChapter,
  nextChapter,
}: ChapterConfigPanelProps) {
  const def: ChapterDef | undefined = getChapterDef(active)

  return (
    <div className="pt-1 pb-4 space-y-4 animate-in fade-in duration-150">
      <div
        className="p-4 rounded-xl flex items-center justify-between shadow-[3px_3px_0_#1A1A1A]"
        style={{
          background: 'linear-gradient(180deg, #1B4332 0%, #142920 100%)',
          border: '2px solid #C4A574',
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-[#E5B842] text-base shrink-0">▶</span>
          <div className="min-w-0">
            <div className="text-base font-bold text-[#E5B842] uppercase tracking-tight truncate">
              {def?.menuLabel ?? chapter?.menuLabel}
            </div>
            <div className="text-[11px] text-[#DBD0BD] font-light truncate mt-0.5">
              {def?.label ?? chapter?.label} · {def?.preview ?? chapter?.preview}
            </div>
          </div>
        </div>
      </div>

      {def?.customUi === 'gates' && <GatesUi config={config} onChange={onChange} />}

      {def?.groups.map((group) => (
        <div key={group.id} className="space-y-2.5 text-white">
          <label className="text-[11px] text-[#E5B842] uppercase tracking-wide block font-bold">
            {group.label}
          </label>
          <div
            className={cn(
              group.layout === 'grid-2' && 'grid grid-cols-2 gap-2.5',
              group.layout === 'grid-3' && 'grid grid-cols-3 gap-2',
              group.layout === 'grid-4' && 'grid grid-cols-2 gap-2.5',
              group.layout === 'stack' && 'flex flex-col gap-2.5',
            )}
          >
            {group.options.map((option) => (
              <CatalogOptionButton
                key={option.id}
                option={option}
                selected={option.selectedWhen(config)}
                onClick={() => onChange(option.patch)}
                compact={group.layout === 'grid-2' || group.layout === 'grid-3'}
              />
            ))}
          </div>
        </div>
      ))}

      <div className="pt-3 border-t border-[#C4A574]/25 flex items-center justify-between gap-2">
        <button
          type="button"
          disabled={!prevChapter}
          onClick={() => prevChapter && onSelectChapter(prevChapter)}
          className="px-3 py-2.5 bg-[#1C241E] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-[#1C241E] text-white text-[11px] font-bold rounded-lg border-2 border-[#C4A574]/40 transition"
        >
          ◀ Prev
        </button>
        <button
          type="button"
          onClick={() => onSelectChapter(null)}
          className="flex-1 py-2.5 bg-[#4ADE80] hover:bg-[#FAF6EE] text-[#141B16] text-sm font-bold rounded-lg border-2 border-[#1A1A1A] transition text-center shadow"
        >
          Done ✓
        </button>
        <button
          type="button"
          disabled={!nextChapter}
          onClick={() => nextChapter && onSelectChapter(nextChapter)}
          className="px-3 py-2.5 bg-[#1C241E] hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-[#1C241E] text-white text-[11px] font-bold rounded-lg border-2 border-[#C4A574]/40 transition"
        >
          Next ▶
        </button>
      </div>
    </div>
  )
}

/** Re-export chapter meta shape used by LeftOptionRail */
export type { ChapterDef as ChapterMeta }
