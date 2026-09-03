import { redirect } from 'next/navigation'

/** Retired standalone page — Material lives inside Fence-Folio. */
export default function MaterialListRedirectPage() {
  redirect('/blueprint?section=material')
}
