import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  STAFF_COOKIE,
  isStaffSessionToken,
  staffGateAllowsDevBypass,
} from '@/lib/staff-gate'

function hideAsNotFound(request: NextRequest) {
  const url = request.nextUrl.clone()
  url.pathname = '/__staff-missing'
  url.search = ''
  return NextResponse.rewrite(url)
}

export function proxy(request: NextRequest) {
  if (staffGateAllowsDevBypass()) {
    return NextResponse.next()
  }

  const token = request.cookies.get(STAFF_COOKIE)?.value
  if (isStaffSessionToken(token)) {
    return NextResponse.next()
  }

  return hideAsNotFound(request)
}

// Next.js 16 reads `config.matcher` (not `proxyConfig`). A wrong export name
// drops the matcher, so this gate runs on every path — including `/` and
// `/_next/static/*` — and production returns site-wide 404s without a staff cookie.
export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
