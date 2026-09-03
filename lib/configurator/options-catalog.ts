/**
 * Shared configurator option catalog — single source of truth for
 * left-rail detail menu + ModuleDock Category Options carousel.
 *
 * Heritage VPF IDs (from pilot HTML / stack-composer) are mapped onto
 * FenceConfiguration patches. SVG thumbs point at canonical component art
 * under /configure/heritage-v1/components/ (no duplicates / (1)(2) folders).
 */

import type { FenceConfiguration } from '@/lib/pricing-engine'

const COMP = '/configure/heritage-v1/components'

export type ChapterId =
  | 'height'
  | 'posts'
  | 'rails'
  | 'pickets'
  | 'stain'
  | 'trim'
  | 'gates'
  | 'hardware'

export interface ConfigOption {
  id: string
  label: string
  description?: string
  /** Short cost chip for carousel / rail */
  costLabel?: string
  /** Public path to component SVG thumb (optional) */
  thumbSrc?: string
  /** CSS color / gradient when no SVG thumb */
  colorPreview?: string
  /** Heritage pilot ID if different from Next id */
  heritageId?: string
  patch: Partial<FenceConfiguration>
  selectedWhen: (config: FenceConfiguration) => boolean
}

export interface OptionGroup {
  id: string
  label: string
  layout: 'stack' | 'grid-2' | 'grid-3' | 'grid-4'
  options: ConfigOption[]
}

export interface ChapterDef {
  id: ChapterId
  num: string
  menuLabel: string
  label: string
  icon: string
  preview: string
  /** Custom UI (gates steppers) — groups still may be empty */
  customUi?: 'gates'
  groups: OptionGroup[]
}

function isFill(config: FenceConfiguration, ...ids: string[]) {
  return ids.includes(config.fillPattern)
}

export const CHAPTER_DEFS: ChapterDef[] = [
  {
    id: 'height',
    num: '01',
    menuLabel: 'GENERAL',
    label: 'Height & Spacing',
    icon: '📐',
    preview: "6' Std · 8' Bay",
    groups: [
      {
        id: 'finished-height',
        label: 'Finished Height',
        layout: 'grid-2',
        options: [
          {
            id: 'h-4',
            label: "4'",
            description: 'Front-yard / low profile',
            costLabel: '$14.00/LF',
            heritageId: '4ft',
            colorPreview: 'linear-gradient(135deg, #86EFAC, #15803D)',
            patch: { heightFt: 4 },
            selectedWhen: (c) => c.heightFt === 4,
          },
          {
            id: 'h-5',
            label: "5'",
            description: 'Stepped mid height',
            costLabel: '$16.00/LF',
            heritageId: '5ft',
            colorPreview: 'linear-gradient(135deg, #4ADE80, #166534)',
            patch: { heightFt: 5 },
            selectedWhen: (c) => c.heightFt === 5,
          },
          {
            id: 'h-6',
            label: "6'",
            description: 'Residential standard',
            costLabel: '$18.00/LF',
            heritageId: '6ft',
            colorPreview: 'linear-gradient(135deg, #22C55E, #14532D)',
            patch: { heightFt: 6 },
            selectedWhen: (c) => c.heightFt === 6,
          },
          {
            id: 'h-8',
            label: "8'",
            description: 'Max privacy screen',
            costLabel: '$26.00/LF',
            heritageId: '8ft',
            colorPreview: 'linear-gradient(135deg, #15803D, #052e16)',
            patch: { heightFt: 8 },
            selectedWhen: (c) => c.heightFt === 8,
          },
        ],
      },
      {
        id: 'post-spacing',
        label: 'Post Spacing (On-Center)',
        layout: 'stack',
        options: [
          {
            id: 'bay-8',
            label: "8' Standard Bay",
            description: 'Image-scale 112″ module',
            costLabel: 'Included',
            heritageId: '8ft',
            colorPreview: 'linear-gradient(135deg, #A87D48, #6B4920)',
            patch: { postSpacingFt: 8 },
            selectedWhen: (c) => c.postSpacingFt === 8,
          },
          {
            id: 'bay-6',
            label: "6' High-Wind Span",
            description: 'Tighter structural module',
            costLabel: '+$1.40/LF',
            heritageId: '6ft',
            colorPreview: 'linear-gradient(135deg, #8B5E34, #4E3211)',
            patch: { postSpacingFt: 6 },
            selectedWhen: (c) => c.postSpacingFt === 6,
          },
        ],
      },
    ],
  },
  {
    id: 'posts',
    num: '02',
    menuLabel: 'POSTS',
    label: 'Posts & Caps',
    icon: '🪵',
    preview: '4x4 Cedar · Pyramid',
    groups: [
      {
        id: 'post-type',
        label: 'Post Dimension / Material',
        layout: 'stack',
        options: [
          {
            id: 'post-4x4-cedar',
            label: '4x4 Incense Cedar',
            description: 'Natural beauty & rot resistance',
            costLabel: 'Included',
            heritageId: 'cedar',
            thumbSrc: `${COMP}/posts/sym-post-cedar-4x4.svg`,
            patch: { postType: '4x4-cedar' },
            selectedWhen: (c) => c.postType === '4x4-cedar',
          },
          {
            id: 'post-4x4-pt',
            label: '4x4 PT Incised',
            description: 'Ground-contact treated (Heritage default)',
            costLabel: 'Included',
            heritageId: 'pt-incised',
            thumbSrc: `${COMP}/posts/sym-post-pt-4x4.svg`,
            patch: { postType: '4x4-pt' },
            selectedWhen: (c) => c.postType === '4x4-pt',
          },
          {
            id: 'post-4x6-cedar',
            label: '4x6 Heavy Timber',
            description: 'Maximum structural heft',
            costLabel: '+$2.20/LF',
            heritageId: '4x6',
            thumbSrc: `${COMP}/posts/sym-post-cedar-4x4.svg`,
            patch: { postType: '4x6-cedar' },
            selectedWhen: (c) => c.postType === '4x6-cedar',
          },
          {
            id: 'post-steel',
            label: 'PostMaster Steel',
            description: 'Concealed in-line steel core',
            costLabel: '+$4.20/LF',
            colorPreview: 'linear-gradient(135deg, #6B7280, #374151)',
            patch: { postType: 'postmaster-steel' },
            selectedWhen: (c) => c.postType === 'postmaster-steel',
          },
        ],
      },
      {
        id: 'post-caps',
        label: 'Architectural Post Cap',
        layout: 'stack',
        options: [
          {
            id: 'cap-cedar',
            label: 'Cedar Pyramid Cap',
            description: 'Mitered water-shed topper',
            costLabel: '+$1.10/LF',
            heritageId: 'cedar',
            thumbSrc: `${COMP}/caps/sym-post-cap-cedar-pyramid.svg`,
            patch: { postCap: 'cedar-pyramid' },
            selectedWhen: (c) => c.postCap === 'cedar-pyramid',
          },
          {
            id: 'cap-copper',
            label: 'Copper Pyramid Cap',
            description: 'Develops natural patina',
            costLabel: '+$1.80/LF',
            heritageId: 'copper',
            thumbSrc: `${COMP}/caps/sym-post-cap-copper-pyramid.svg`,
            patch: { postCap: 'copper-pyramid' },
            selectedWhen: (c) => c.postCap === 'copper-pyramid',
          },
          {
            id: 'cap-metal',
            label: 'Black Powder Metal Cap',
            description: 'Architectural powder coat',
            costLabel: '+$1.40/LF',
            heritageId: 'metal',
            thumbSrc: `${COMP}/caps/sym-post-cap-metal-pyramid.svg`,
            patch: { postCap: 'metal-black' },
            selectedWhen: (c) => c.postCap === 'metal-black',
          },
          {
            id: 'cap-solar',
            label: 'Solar LED Cap',
            description: 'Dusk-to-dawn perimeter light',
            costLabel: '+$3.20/LF',
            heritageId: 'solar',
            thumbSrc: `${COMP}/caps/sym-post-cap-solar-pyramid.svg`,
            patch: { postCap: 'solar-led' },
            selectedWhen: (c) => c.postCap === 'solar-led',
          },
          {
            id: 'cap-none',
            label: 'Flush Cut (None)',
            description: 'No post topper',
            costLabel: '$0.00',
            heritageId: 'none',
            colorPreview: 'linear-gradient(135deg, #71717A, #3F3F46)',
            patch: { postCap: 'none' },
            selectedWhen: (c) => c.postCap === 'none',
          },
        ],
      },
    ],
  },
  {
    id: 'rails',
    num: '03',
    menuLabel: 'RAILS',
    label: 'Rails & Framing',
    icon: '🪜',
    preview: '3-Rail · 2x6 Cap',
    groups: [
      {
        id: 'rail-count',
        label: 'Rail Count',
        layout: 'stack',
        options: [
          {
            id: 'rail-2',
            label: '2-Rail Minimalist',
            description: 'Heritage / Lineage frame',
            costLabel: '$4.00/LF',
            thumbSrc: `${COMP}/rails/component-rail-cedar-two-rail-standard.svg`,
            patch: { railCount: 2 },
            selectedWhen: (c) => c.railCount === 2,
          },
          {
            id: 'rail-3',
            label: '3-Rail Structural',
            description: 'Legacy frame · middle rail on',
            costLabel: '$5.80/LF',
            thumbSrc: `${COMP}/rails/component-rail-cedar-three-rail-standard.svg`,
            patch: { railCount: 3 },
            selectedWhen: (c) => c.railCount === 3,
          },
          {
            id: 'rail-4',
            label: '4-Rail Heavy Duty',
            description: 'Split-fill / commercial grade',
            costLabel: '$7.40/LF',
            thumbSrc: `${COMP}/rails/sym-rail-middle-heritage.svg`,
            patch: { railCount: 4 },
            selectedWhen: (c) => c.railCount === 4,
          },
        ],
      },
      {
        id: 'rail-cap',
        label: '2x6 Continuous Cap',
        layout: 'stack',
        options: [
          {
            id: 'top-cap-on',
            label: 'Cap Board ON',
            description: 'Protects picket end grain',
            costLabel: '+$2.25/LF',
            heritageId: 'on',
            thumbSrc: `${COMP}/rails/sym-rail-cap-ref-1.5.svg`,
            patch: { topCap: true },
            selectedWhen: (c) => c.topCap === true,
          },
          {
            id: 'top-cap-off',
            label: 'Cap Board OFF',
            description: 'Exposed picket tops',
            costLabel: '$0.00',
            heritageId: 'off',
            colorPreview: 'linear-gradient(135deg, #57534E, #292524)',
            patch: { topCap: false },
            selectedWhen: (c) => c.topCap === false,
          },
        ],
      },
    ],
  },
  {
    id: 'pickets',
    num: '04',
    menuLabel: 'PICKETS / FILL',
    label: 'Pickets & Infill',
    icon: '🌲',
    preview: 'Board-on-Board',
    groups: [
      {
        id: 'picket-fill',
        label: 'Picket Infill Pattern',
        layout: 'stack',
        options: [
          {
            id: 'fill-standard',
            label: 'Standard Flat Top',
            description: 'Heritage standard fill (1/2″ gap)',
            costLabel: '+$8.50/LF',
            heritageId: 'standard',
            thumbSrc: `${COMP}/pickets/sym-picket-cedar-flat-top-heritage.svg`,
            patch: { fillPattern: 'flat-top-privacy' },
            selectedWhen: (c) => isFill(c, 'flat-top-privacy', 'standard', 'standard-gap'),
          },
          {
            id: 'fill-gothic',
            label: 'Gothic Peak',
            description: 'Pointed decorative picket tops',
            costLabel: '+$9.50/LF',
            heritageId: 'gothic',
            thumbSrc: `${COMP}/pickets/sym-picket-cedar-gothic-heritage.svg`,
            patch: { fillPattern: 'gothic' },
            selectedWhen: (c) => isFill(c, 'gothic'),
          },
          {
            id: 'fill-bob',
            label: 'Board-on-Board (100%)',
            description: 'Overlapping dual row · zero sightline',
            costLabel: '+$12.00/LF',
            heritageId: 'board-on-board',
            thumbSrc: `${COMP}/pickets/sym-picket-cedar-board-on-board-heritage.svg`,
            patch: { fillPattern: 'board-on-board' },
            selectedWhen: (c) => isFill(c, 'board-on-board'),
          },
          {
            id: 'fill-shadowbox',
            label: 'Shadowbox Airflow',
            description: 'Alternating front/back good-neighbor',
            costLabel: '+$11.50/LF',
            heritageId: 'shadowbox',
            thumbSrc: `${COMP}/pickets/sym-picket-cedar-shadowbox-heritage.svg`,
            patch: { fillPattern: 'shadowbox' },
            selectedWhen: (c) => isFill(c, 'shadowbox'),
          },
          {
            id: 'fill-butt',
            label: 'Solid Butt Joint',
            description: 'Edge-to-edge flush (Next-only)',
            costLabel: '+$10.00/LF',
            colorPreview: 'linear-gradient(135deg, #9C713D, #6B4920)',
            patch: { fillPattern: 'butt-joint' },
            selectedWhen: (c) => isFill(c, 'butt-joint'),
          },
        ],
      },
      {
        id: 'picket-spacing',
        label: 'Picket Spacing',
        layout: 'stack',
        options: [
          {
            id: 'space-privacy',
            label: '1/16″ Privacy',
            description: 'Near-solid · Heritage default',
            costLabel: 'Included',
            heritageId: '1-16-privacy',
            patch: { picketSpacing: '1-16-privacy' },
            selectedWhen: (c) => (c.picketSpacing ?? '1-16-privacy') === '1-16-privacy',
          },
          {
            id: 'space-0-5',
            label: '1/2″ Gap',
            description: 'Standard airflow',
            costLabel: 'Included',
            heritageId: 'gap-0-5',
            patch: { picketSpacing: 'gap-0-5' },
            selectedWhen: (c) => c.picketSpacing === 'gap-0-5',
          },
          {
            id: 'space-1',
            label: '1″ Gap',
            description: 'Open vertical spacing',
            costLabel: '−$0.40/LF',
            heritageId: 'gap-1',
            patch: { picketSpacing: 'gap-1' },
            selectedWhen: (c) => c.picketSpacing === 'gap-1',
          },
          {
            id: 'space-3',
            label: '3″ Gap',
            description: 'Ranch / decorative open',
            costLabel: '−$1.20/LF',
            heritageId: 'gap-3',
            patch: { picketSpacing: 'gap-3' },
            selectedWhen: (c) => c.picketSpacing === 'gap-3',
          },
        ],
      },
      {
        id: 'picket-width',
        label: 'Picket Width',
        layout: 'grid-2',
        options: [
          {
            id: 'width-5-5',
            label: '5.5″ (1×6)',
            description: 'Heritage default',
            costLabel: 'Included',
            heritageId: '5.5',
            patch: { picketWidth: '5.5' },
            selectedWhen: (c) => (c.picketWidth ?? '5.5') === '5.5',
          },
          {
            id: 'width-3-5',
            label: '3.5″ (1×4)',
            description: 'Narrower face',
            costLabel: '+$0.80/LF',
            heritageId: '3.5',
            patch: { picketWidth: '3.5' },
            selectedWhen: (c) => c.picketWidth === '3.5',
          },
        ],
      },
      {
        id: 'lumber-grade',
        label: 'Lumber Grade',
        layout: 'stack',
        options: [
          {
            id: 'grade-tight',
            label: 'Tight-Knot Cedar',
            description: 'PNW character grain',
            costLabel: '+$2.50/LF',
            colorPreview: 'linear-gradient(135deg, #C2965D, #8C6531)',
            patch: { woodGrade: 'tight-knot' },
            selectedWhen: (c) => c.woodGrade === 'tight-knot',
          },
          {
            id: 'grade-clear',
            label: 'Clear Architectural',
            description: 'Knot-free select',
            costLabel: '+$7.50/LF',
            colorPreview: 'linear-gradient(135deg, #E0B47A, #A67D45)',
            patch: { woodGrade: 'clear-cedar' },
            selectedWhen: (c) => c.woodGrade === 'clear-cedar',
          },
        ],
      },
    ],
  },
  {
    id: 'stain',
    num: '05',
    menuLabel: 'STAIN',
    label: 'Stain & Finish',
    icon: '🎨',
    preview: 'Cedar Natural',
    groups: [
      {
        id: 'stain-tone',
        label: 'Factory Stain Tone',
        layout: 'stack',
        options: [
          {
            id: 'stain-cedar',
            label: 'Cedar Natural',
            description: 'Warm golden honey',
            costLabel: '+$4.75/LF',
            heritageId: 'cedar-natural',
            colorPreview: 'linear-gradient(135deg, #C68A4C, #A46932)',
            patch: { stainType: 'cedar-natural' },
            selectedWhen: (c) => c.stainType === 'cedar-natural',
          },
          {
            id: 'stain-clear',
            label: 'Clear Sealant',
            description: 'Preserves raw grain',
            costLabel: '+$4.75/LF',
            colorPreview: 'linear-gradient(135deg, #E3CEAA, #C7AE83)',
            patch: { stainType: 'clear-seal' },
            selectedWhen: (c) => c.stainType === 'clear-seal',
          },
          {
            id: 'stain-chestnut',
            label: 'Chestnut Brown',
            description: 'Deep moisture shield',
            costLabel: '+$4.75/LF',
            colorPreview: 'linear-gradient(135deg, #633E26, #422613)',
            patch: { stainType: 'chestnut-brown' },
            selectedWhen: (c) => c.stainType === 'chestnut-brown',
          },
          {
            id: 'stain-redwood',
            label: 'Redwood Tone',
            description: 'Classic Pacific redwood',
            costLabel: '+$4.75/LF',
            colorPreview: 'linear-gradient(135deg, #8B3A2B, #622216)',
            patch: { stainType: 'redwood' },
            selectedWhen: (c) => c.stainType === 'redwood',
          },
          {
            id: 'stain-walnut',
            label: 'Dark Walnut',
            description: 'Charcoal-walnut modern',
            costLabel: '+$4.75/LF',
            colorPreview: 'linear-gradient(135deg, #2E2219, #18120C)',
            patch: { stainType: 'dark-walnut' },
            selectedWhen: (c) => c.stainType === 'dark-walnut',
          },
          {
            id: 'stain-none',
            label: 'Raw / Unfinished',
            description: 'Weathered silver look',
            costLabel: '$0.00',
            heritageId: 'as-material',
            colorPreview: 'linear-gradient(135deg, #DEC396, #BFA06C)',
            patch: { stainType: 'none' },
            selectedWhen: (c) => c.stainType === 'none',
          },
        ],
      },
    ],
  },
  {
    id: 'trim',
    num: '06',
    menuLabel: 'TRIM',
    label: 'Trim & Facia',
    icon: '📏',
    preview: 'Clean Line',
    groups: [
      {
        id: 'trim-style',
        label: 'Trim Package',
        layout: 'stack',
        options: [
          {
            id: 'trim-none',
            label: 'Clean Line (No Trim)',
            description: 'Exposed picket ends',
            costLabel: '$0.00',
            heritageId: 'none',
            colorPreview: 'linear-gradient(135deg, #71717A, #3F3F46)',
            patch: { trimStyle: 'none' },
            selectedWhen: (c) => c.trimStyle === 'none',
          },
          {
            id: 'trim-1t',
            label: '1×4 Top Trim (1T)',
            description: 'Heritage pt-1t / cedar-1t',
            costLabel: '+$1.80/LF',
            heritageId: 'pt-1t',
            thumbSrc: `${COMP}/trim/sym-trim-top-cedar.svg`,
            patch: { trimStyle: 'standard-1x4' },
            selectedWhen: (c) => c.trimStyle === 'standard-1x4',
          },
          {
            id: 'trim-picture',
            label: 'Picture Frame Trim',
            description: 'Full perimeter fascia',
            costLabel: '+$3.20/LF',
            thumbSrc: `${COMP}/trim/sym-trim-middle-cedar.svg`,
            patch: { trimStyle: 'picture-frame-trim' },
            selectedWhen: (c) => c.trimStyle === 'picture-frame-trim',
          },
          {
            id: 'trim-kick',
            label: '2×6 Rot Kickboard',
            description: 'Sacrificial ground board',
            costLabel: '+$2.80/LF',
            thumbSrc: `${COMP}/trim/sym-trim-bottom-cedar.svg`,
            patch: { trimStyle: 'kickboard-2x6' },
            selectedWhen: (c) => c.trimStyle === 'kickboard-2x6',
          },
        ],
      },
    ],
  },
  {
    id: 'gates',
    num: '07',
    menuLabel: 'GATES',
    label: 'Gates & Access',
    icon: '🚪',
    preview: 'Walk & Drive Gates',
    customUi: 'gates',
    groups: [],
  },
  {
    id: 'hardware',
    num: '08',
    menuLabel: 'HARDWARE',
    label: 'Hardware & Ties',
    icon: '🔩',
    preview: 'Black Powder',
    groups: [
      {
        id: 'hw-tier',
        label: 'Fastener Tier',
        layout: 'stack',
        options: [
          {
            id: 'hw-black',
            label: 'Black Powder Coat',
            description: 'Architectural fasteners',
            costLabel: '+$2.40/LF',
            colorPreview: 'linear-gradient(135deg, #2D3748, #1A202C)',
            patch: { hardwareTier: 'black-powder' },
            selectedWhen: (c) => c.hardwareTier === 'black-powder',
          },
          {
            id: 'hw-galv',
            label: 'Hot-Dip Galvanized',
            description: 'Standard zinc',
            costLabel: '$1.40/LF',
            colorPreview: 'linear-gradient(135deg, #9CA3AF, #6B7280)',
            patch: { hardwareTier: 'galvanized' },
            selectedWhen: (c) => c.hardwareTier === 'galvanized',
          },
          {
            id: 'hw-ss',
            label: '316 Marine Stainless',
            description: 'Coastal grade',
            costLabel: '+$3.10/LF',
            colorPreview: 'linear-gradient(135deg, #E5E7EB, #9CA3AF)',
            patch: { hardwareTier: 'stainless-steel' },
            selectedWhen: (c) => c.hardwareTier === 'stainless-steel',
          },
        ],
      },
      {
        id: 'brackets',
        label: 'Rail Brackets / Ties',
        layout: 'stack',
        options: [
          {
            id: 'br-none',
            label: 'None (Toe-Nail)',
            description: 'No visible brackets',
            costLabel: '$0.00',
            heritageId: 'none',
            patch: { bracketType: 'none' },
            selectedWhen: (c) => (c.bracketType ?? 'none') === 'none',
          },
          {
            id: 'br-u-black',
            label: 'U-Bracket Black',
            description: '2×4 powder U-hangers',
            costLabel: '+$0.85/LF',
            heritageId: 'u-black',
            thumbSrc: `${COMP}/brackets/sym-bracket-u-2x4-black.svg`,
            patch: { bracketType: 'u-black' },
            selectedWhen: (c) => c.bracketType === 'u-black',
          },
          {
            id: 'br-u-galv',
            label: 'U-Bracket Galvanized',
            description: '2×4 zinc U-hangers',
            costLabel: '+$0.65/LF',
            heritageId: 'u-galv',
            thumbSrc: `${COMP}/brackets/sym-bracket-u-2x4-galv.svg`,
            patch: { bracketType: 'u-galv' },
            selectedWhen: (c) => c.bracketType === 'u-galv',
          },
          {
            id: 'br-l-2',
            label: 'L-Bracket 2″',
            description: 'Angle iron tie',
            costLabel: '+$0.55/LF',
            heritageId: 'l-2',
            thumbSrc: `${COMP}/brackets/sym-bracket-l-2in.svg`,
            patch: { bracketType: 'l-2' },
            selectedWhen: (c) => c.bracketType === 'l-2',
          },
          {
            id: 'br-simpson',
            label: 'Simpson 2×4 Tie',
            description: 'Structural connector',
            costLabel: '+$1.10/LF',
            thumbSrc: `${COMP}/brackets/sym-bracket-tie-2x4-simpson.svg`,
            patch: { bracketType: 'simpson-tie' },
            selectedWhen: (c) => c.bracketType === 'simpson-tie',
          },
          {
            id: 'br-wood-2x4',
            label: 'Wood Block 2×4',
            description: 'Cedar/PT nailer block',
            costLabel: '+$0.45/LF',
            heritageId: 'wood-2x4',
            thumbSrc: `${COMP}/brackets/sym-bracket-wood-block-2x4-cedar.svg`,
            patch: { bracketType: 'wood-2x4' },
            selectedWhen: (c) => c.bracketType === 'wood-2x4',
          },
        ],
      },
    ],
  },
]

export function getChapterDef(id: string | null | undefined): ChapterDef | undefined {
  if (!id) return undefined
  return CHAPTER_DEFS.find((c) => c.id === id)
}

export function getChapterOptions(chapterId: string): ConfigOption[] {
  const chapter = getChapterDef(chapterId)
  if (!chapter) return []
  return chapter.groups.flatMap((g) => g.options)
}

export function getChapterLivePreview(id: string, config: FenceConfiguration): string {
  switch (id) {
    case 'height':
      return `${config.heightFt}' H · ${config.postSpacingFt}' Bay`
    case 'posts':
      return `${config.postType.split('-')[0].toUpperCase()} · ${config.postCap.split('-')[0]}`
    case 'rails':
      return `${config.railCount}-Rail ${config.topCap ? '+ Cap' : ''}`
    case 'pickets':
      if (config.fillPattern === 'board-on-board') return 'BoB (100%)'
      if (config.fillPattern === 'gothic') return 'Gothic'
      if (config.fillPattern === 'shadowbox') return 'Shadowbox'
      return 'Standard Flat'
    case 'stain':
      return config.stainType.replace(/-/g, ' ')
    case 'trim':
      return config.trimStyle === 'none' ? 'Clean Line' : config.trimStyle.replace(/-/g, ' ')
    case 'gates':
      return `${config.gates?.walkGates || 0} Walk · ${config.gates?.driveGates || 0} Drive`
    case 'hardware':
      return `${config.hardwareTier.replace(/-/g, ' ')}${
        config.bracketType && config.bracketType !== 'none' ? ` · ${config.bracketType}` : ''
      }`
    default:
      return ''
  }
}

export function getChapterCostMetric(id: string, config: FenceConfiguration): string {
  switch (id) {
    case 'height': {
      const base = config.heightFt === 4 ? 14 : config.heightFt === 5 ? 16 : config.heightFt === 6 ? 18 : 26
      const grade = config.woodGrade === 'clear-cedar' ? 7.5 : config.woodGrade === 'tight-knot' ? 2.5 : 0
      return `$${(base + grade).toFixed(2)}/LF`
    }
    case 'posts': {
      let post = 6.5
      if (config.postType === '4x6-cedar') post += 2.2
      if (config.postType === 'postmaster-steel') post += 4.2
      if (config.postCap !== 'none') post += 1.1
      return `$${post.toFixed(2)}/LF`
    }
    case 'rails': {
      let rail = config.railCount === 2 ? 4.0 : config.railCount === 4 ? 7.4 : 5.8
      if (config.topCap) rail += 2.25
      return `$${rail.toFixed(2)}/LF`
    }
    case 'pickets': {
      let fill = 8.5
      if (config.fillPattern === 'board-on-board') fill = 12.0
      else if (config.fillPattern === 'shadowbox') fill = 11.5
      else if (config.fillPattern === 'gothic') fill = 9.5
      else if (config.fillPattern === 'butt-joint') fill = 10.0
      return `$${fill.toFixed(2)}/LF`
    }
    case 'stain':
      return config.stainType === 'none' ? '$0.00' : '$4.75/LF'
    case 'trim': {
      if (config.trimStyle === 'picture-frame-trim') return '$3.20/LF'
      if (config.trimStyle === 'kickboard-2x6') return '$2.80/LF'
      if (config.trimStyle === 'standard-1x4') return '$1.80/LF'
      return '$0.00'
    }
    case 'gates': {
      const walk = (config.gates?.walkGates || 0) * 385
      const drive = (config.gates?.driveGates || 0) * 850
      return walk + drive > 0 ? `$${walk + drive}` : '$385/ea'
    }
    case 'hardware': {
      let hw = 1.4
      if (config.hardwareTier === 'black-powder') hw = 2.4
      if (config.hardwareTier === 'stainless-steel') hw = 3.1
      return `$${hw.toFixed(2)}/LF`
    }
    default:
      return '$0.00'
  }
}

/** Thin chapter list for infinite-loop menus (id/num/label only). */
export const CHAPTERS = CHAPTER_DEFS.map((c) => ({
  id: c.id,
  num: c.num,
  menuLabel: c.menuLabel,
  label: c.label,
  icon: c.icon,
  preview: c.preview,
}))

