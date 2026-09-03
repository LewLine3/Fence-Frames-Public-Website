import type { FenceConfiguration } from '@/lib/pricing-engine'

/** One Heritage panel — matches designer default (8 LF bay in viewBox). */
export const HERITAGE_8LF_DEMO: FenceConfiguration = {
  heightFt: 6,
  postSpacingFt: 8,
  linearFeet: 8,
  woodGrade: 'tight-knot',
  postType: '4x4-cedar',
  postCap: 'cedar-pyramid',
  footingDepthInches: 30,
  railCount: 3,
  topCap: true,
  fenceStyleCategory: 'vertical-picket',
  fillPattern: 'board-on-board',
  fenceStyle: 'heritage',
  stainType: 'cedar-natural',
  trimStyle: 'none',
  hardwareTier: 'black-powder',
  picketSpacing: '1-16-privacy',
  picketWidth: '5.5',
  bracketType: 'none',
  gates: {
    walkGates: 0,
    driveGates: 0,
  },
}

export function folioMaterialQuantities(config: FenceConfiguration) {
  const postCount = Math.ceil(config.linearFeet / (config.postSpacingFt || 8)) + 1
  const railLengthEach = config.postSpacingFt || 8
  const total2x4Rails = postCount * config.railCount
  const picketCount =
    Math.ceil((config.linearFeet * 12) / 5.5) *
    (config.fillPattern === 'board-on-board' ? 1.2 : 1)
  const concreteBags = postCount * 2

  return { postCount, railLengthEach, total2x4Rails, picketCount, concreteBags }
}
