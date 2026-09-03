import { NextResponse } from 'next/server';
import { supabaseQuery } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const comms = await supabaseQuery<any>('communities', `select=*,community_build_slots(*)&slug=eq.${slug}`);
      if (!comms || comms.length === 0) {
        return NextResponse.json({ error: 'Community not found' }, { status: 404 });
      }
      return NextResponse.json({ community: comms[0] });
    }

    const communities = await supabaseQuery<any>(
      'communities',
      'select=*,community_zips(zip_code)&order=county.asc,city.asc'
    );

    return NextResponse.json({ communities });
  } catch (err: any) {
    console.error('Error fetching communities:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
