/**
 * Supabase Client for Fence Frames Public Website
 * Direct typed PostgREST client with zero npm external package dependency.
 * Compatible with Next.js App Router (RSC, Client Components, Server Actions).
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hikpszwtglrkfgivcdaa.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhpa3Bzend0Z2xya2ZnaXZjZGFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3OTY5ODEsImV4cCI6MjA5NjM3Mjk4MX0.2gVy5BE-BZvOOGDdw-64voWFHqyVqL57CYah9nmHf0s';

export interface SupabaseResponse<T> {
  data: T | null;
  error: string | null;
}

export async function supabaseQuery<T>(
  table: string,
  queryString = '',
  authToken?: string
): Promise<T[]> {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}${queryString ? `?${queryString}` : ''}`;
  const token = authToken || SUPABASE_ANON_KEY;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 }, // Cache 60 seconds by default for static generation
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`Supabase query failed on ${table}:`, errText);
    return [];
  }

  return res.json();
}

export async function supabaseInsert<T>(
  table: string,
  records: Record<string, any>[],
  serverKey?: string
): Promise<T[]> {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${table}`;
  const key = serverKey || process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(records),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase insert failed on ${table} (${res.status}): ${errText}`);
  }

  return res.json();
}

export async function supabaseRpc<T>(
  fnName: string,
  params: Record<string, any> = {},
  serverKey?: string
): Promise<T> {
  const url = `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/rpc/${fnName}`;
  const key = serverKey || process.env.SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Supabase RPC ${fnName} failed (${res.status}): ${errText}`);
  }

  return res.json();
}
