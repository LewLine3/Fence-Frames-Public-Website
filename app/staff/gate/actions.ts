'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import {
  STAFF_COOKIE,
  STAFF_COOKIE_MAX_AGE,
  getStaffGateKey,
  hashStaffKey,
  staffKeysMatch,
} from '@/lib/staff-gate'

export async function unlockStaffDesk(formData: FormData) {
  const provided = String(formData.get('key') ?? '')
  const expected = getStaffGateKey()

  if (!staffKeysMatch(provided, expected)) {
    redirect('/staff/gate?denied=1')
  }

  const jar = await cookies()
  jar.set(STAFF_COOKIE, hashStaffKey(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: STAFF_COOKIE_MAX_AGE,
  })

  redirect('/admin')
}

export async function lockStaffDesk() {
  const jar = await cookies()
  jar.delete(STAFF_COOKIE)
  redirect('/')
}
