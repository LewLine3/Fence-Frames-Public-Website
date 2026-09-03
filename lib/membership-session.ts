import type { PortalRoleId } from '@/lib/account-roles'

/** Browser-local membership flag until real auth sessions land. */
export const MEMBERSHIP_STORAGE_KEY = 'ff_membership'

export type MembershipSession = {
  role: PortalRoleId
  fullName: string
  phone?: string
  zip?: string
  verifiedAt: number
}

export function readMembership(): MembershipSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(MEMBERSHIP_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as MembershipSession
    if (!parsed?.role || !parsed?.verifiedAt) return null
    return parsed
  } catch {
    return null
  }
}

export function writeMembership(session: MembershipSession): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MEMBERSHIP_STORAGE_KEY, JSON.stringify(session))
  } catch {
    /* private mode / quota */
  }
}

export function clearMembership(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(MEMBERSHIP_STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

export function isMember(): boolean {
  return readMembership() !== null
}

/** Login URL that returns guests to a locked destination after OTP. */
export function membershipLoginHref(nextPath = '/blueprint'): string {
  const next = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
  return `/auth-gate?next=${encodeURIComponent(next)}`
}

export function fenceItHref(): string {
  return isMember() ? '/blueprint' : membershipLoginHref('/blueprint')
}
