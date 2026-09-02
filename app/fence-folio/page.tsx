import { redirect } from 'next/navigation'

/** Legacy alias — canonical route is /homeowner/folio/[id] */
export default async function FenceFolioAliasPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const id = params.id ?? 'FF-98045-8912'
  redirect(`/homeowner/folio/${encodeURIComponent(id)}`)
}
