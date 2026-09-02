import { createHash, timingSafeEqual } from 'crypto'

/** httpOnly cookie proving staff desk access. Interim until Supabase staff role. */
export const STAFF_COOKIE = 'ff_staff_session'

export const STAFF_COOKIE_MAX_AGE = 60 * 60 * 12

function sha256(value: string) {
  return createHash('sha256').update(value).digest()
}

export function hashStaffKey(key: string) {
  return createHash('sha256').update(key).digest('hex')
}

export function staffKeysMatch(provided: string, expected: string) {
  if (!provided || !expected) return false
  return timingSafeEqual(sha256(provided), sha256(expected))
}

export function getStaffGateKey() {
  return process.env.FF_STAFF_GATE_KEY?.trim() ?? ''
}

/** Production/staging: closed if the env key is missing. Local `next dev` stays open until a key is set. */
export function staffGateAllowsDevBypass() {
  return process.env.NODE_ENV !== 'production' && !getStaffGateKey()
}

export function isStaffSessionToken(token: string | undefined) {
  const key = getStaffGateKey()
  if (!token || !key) return false
  return staffKeysMatch(token, hashStaffKey(key))
}
