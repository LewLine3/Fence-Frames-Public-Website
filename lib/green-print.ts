import type { CSSProperties } from 'react'

/** Canonical green-print drafting grid — cream paper + forest grid. */
export const greenPrintBackground: CSSProperties = {
  backgroundColor: '#F4ECDC',
  backgroundImage:
    'linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px),' +
    'linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px),' +
    'linear-gradient(#16432D 2px, transparent 2px),' +
    'linear-gradient(90deg, #16432D 2px, transparent 2px)',
  backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0',
}

/**
 * Reverse green-print — dark green↔black horizontal wash with white minor/major grids.
 * Mirrors the homepage hero container (which uses a vertical gradient) and the nav's
 * light sub-grid cadence, rotated to a left→right green/black fill.
 */
export const reverseGreenPrintBackground: CSSProperties = {
  backgroundColor: '#0b120e',
  backgroundImage:
    'linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),' +
    'linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px),' +
    'linear-gradient(rgba(255,255,255,0.18) 2px, transparent 2px),' +
    'linear-gradient(90deg, rgba(255,255,255,0.18) 2px, transparent 2px),' +
    'linear-gradient(90deg, #0b120e 0%, #183625 28%, #2f5d3a 55%, #1B4332 78%, #0b120e 100%)',
  backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px, 100% 100%',
  backgroundPosition: '0 0, 0 0, 0 0, 0 0, 0 0',
}

/** Ground strand — full-bleed dark brown floor line under docked elevations. */
export const DESIGNER_GROUND_BROWN = '#3D2414'

export const parchmentFlat: CSSProperties = {
  backgroundColor: '#F4ECDC',
  color: '#1A1A1A',
}
