/**
 * Fence Frames account role naming — canonical labels with clarifiers
 * until the Founder / Fabricator / Facilitator terms are widely understood.
 */

export type AccountRoleKey = 'founder' | 'fabricator' | 'facilitator'

/** Legacy auth / portal keys used in forms and state */
export type PortalRoleId = 'HOMEOWNER' | 'CONTRACTOR' | 'HOA'

export const ACCOUNT_ROLES = {
  founder: {
    key: 'founder' as const,
    portalId: 'HOMEOWNER' as const,
    name: 'Fence Founder',
    clarifier: 'Homeowners',
    labelWithClarifier: 'Fence Founder (Homeowners)',
    signUpCta: 'Sign Up as Fence Founder (Homeowners)',
    color: '#4ADE80',
    emoji: '🏡',
  },
  fabricator: {
    key: 'fabricator' as const,
    portalId: 'CONTRACTOR' as const,
    name: 'Fence Fabricator',
    clarifier: 'Contractors',
    labelWithClarifier: 'Fence Fabricator (Contractors)',
    signUpCta: 'Sign Up as Fence Fabricator (Contractors)',
    color: '#F27A22',
    emoji: '🔨',
  },
  facilitator: {
    key: 'facilitator' as const,
    portalId: 'HOA' as const,
    name: 'Fence Facilitator',
    clarifier: 'HOA-Reps',
    labelWithClarifier: 'Fence Facilitator (HOA-Reps)',
    signUpCta: 'Sign Up as Fence Facilitator (HOA-Reps)',
    color: '#E5B842',
    emoji: '🏛️',
  },
} as const

export const ACCOUNT_ROLE_LIST = [
  ACCOUNT_ROLES.founder,
  ACCOUNT_ROLES.fabricator,
  ACCOUNT_ROLES.facilitator,
] as const

export const PORTAL_ROLE_ORDER: PortalRoleId[] = ['HOMEOWNER', 'HOA', 'CONTRACTOR']

export function portalRoleToAccountRole(portalId: PortalRoleId) {
  return ACCOUNT_ROLE_LIST.find((r) => r.portalId === portalId)!
}

export function accountRoleLabel(portalId: PortalRoleId) {
  return portalRoleToAccountRole(portalId).labelWithClarifier
}
