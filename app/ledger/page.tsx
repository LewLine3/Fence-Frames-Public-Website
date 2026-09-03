import { redirect } from 'next/navigation'

/** Retired standalone page — Labor lives inside Fence-Folio. */
export default function LedgerRedirectPage() {
  redirect('/blueprint?section=labor')
}
