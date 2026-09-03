'use client'

import React, { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { FolioDossierView } from '@/components/ff/folio-dossier-view'
import { MembershipGate } from '@/components/ff/membership-gate'
import { SiteShell } from '@/components/ff/site-shell'
import { getFolioById, type SavedFolio } from '@/lib/saved-folios'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function HomeownerFolioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <MembershipGate next={`/homeowner/folio/${encodeURIComponent(id)}`}>
      <HomeownerFolioInner id={id} />
    </MembershipGate>
  )
}

function HomeownerFolioInner({ id }: { id: string }) {
  const [folio, setFolio] = useState<SavedFolio | undefined>(undefined)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setFolio(getFolioById(decodeURIComponent(id)))
    setReady(true)
  }, [id])

  if (!ready) return null

  if (!folio) {
    return (
      <SiteShell width="hub">
        <div className="ff-card-inner text-center">
          <h1 style={{ ...rowdies(700), fontSize: '1.4rem', color: '#16432D' }}>Fence-Folio not found</h1>
          <p style={{ ...rowdies(300), fontSize: '0.9rem', color: '#444' }}>No saved dossier matches ID {id}.</p>
          <Link href="/homeowner" style={{ ...rowdies(700), color: '#E5B842' }}>← Back to My Account</Link>
        </div>
      </SiteShell>
    )
  }

  return <FolioDossierView folio={folio} />
}
