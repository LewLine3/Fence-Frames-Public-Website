export const FENCE_SPEC = {
  style: 'HERITAGE 6′ Cedar',
  chips: [
    { label: 'H', value: '6′' },
    { label: 'P', value: '4×4' },
    { label: 'Fill', value: 'BoB' },
  ],
}

export const VIEW_TABS = ['2D Canvas', 'Blueprint', 'Takeoff', 'Ledger'] as const
export type ViewTab = (typeof VIEW_TABS)[number]

export type ElevationMode = 'dual' | 'front' | 'back'
