'use client'

import { useEffect, useState } from 'react'
import { isMember, membershipLoginHref } from '@/lib/membership-session'

/**
 * Client gate for Fence It / member portals.
 * Guests are sent to the auth-gate login with a return `next` path.
 */
export function MembershipGate({
  children,
  next,
}: {
  children: React.ReactNode
  /** Override return path; defaults to current pathname + search. */
  next?: string
}) {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (isMember()) {
      setAllowed(true)
      return
    }
    const dest =
      next ??
      `${window.location.pathname}${window.location.search}${window.location.hash}`
    window.location.replace(membershipLoginHref(dest || '/blueprint'))
  }, [next])

  if (!allowed) {
    return (
      <div
        style={{
          minHeight: '40vh',
          display: 'grid',
          placeItems: 'center',
          fontFamily: "'Rowdies', sans-serif",
          fontWeight: 300,
          color: '#16432D',
          fontSize: '0.95rem',
        }}
      >
        Checking membership…
      </div>
    )
  }

  return <>{children}</>
}
