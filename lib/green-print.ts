/** Canonical green-print drafting grid — use on contained panels, not full-viewport overlays. */
export const greenPrintBackground = {
  backgroundColor: '#F4ECDC',
  backgroundImage:
    'linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px),' +
    'linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px),' +
    'linear-gradient(#16432D 2px, transparent 2px),' +
    'linear-gradient(90deg, #16432D 2px, transparent 2px)',
  backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0',
} as const

export const parchmentFlat = {
  backgroundColor: '#F4ECDC',
  color: '#1A1A1A',
} as const
