import { NextResponse } from 'next/server';
import { supabaseQuery } from '@/lib/supabase/client';
import { FenceConfiguration } from '@/lib/pricing-engine';
import { calculateBomFromCatalog, SupportedVendor } from '@/lib/bom-engine';

export const dynamic = 'force-dynamic';

const DEFAULT_CONFIG: FenceConfiguration = {
  heightFt: 6,
  postSpacingFt: 8,
  linearFeet: 100,
  woodGrade: 'tight-knot',
  postType: '4x4-cedar',
  postCap: 'cedar-pyramid',
  footingDepthInches: 30,
  railCount: 3,
  topCap: true,
  fenceStyleCategory: 'vertical-picket',
  fillPattern: 'board-on-board',
  stainType: 'cedar-natural',
  trimStyle: 'none',
  hardwareTier: 'black-powder',
  bracketType: 'none',
  gates: {
    walkGates: 0,
    driveGates: 0,
  },
};

/**
 * Loads all active catalog components and vendor pricing into memory
 */
async function loadCatalogMap() {
  const rows = await supabaseQuery<any>(
    'component_encyclopedia',
    'select=*,component_vendor_pricing(*)&active=eq.true'
  );

  const map = new Map<string, { component: any; pricing: Record<string, number> }>();
  for (const row of rows || []) {
    const pricing: Record<string, number> = {};
    for (const p of row.component_vendor_pricing || []) {
      if (p.vendor && p.price_usd != null) {
        pricing[p.vendor] = Number(p.price_usd);
      }
    }
    map.set(row.sku, { component: row, pricing });
  }

  return map;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const config: FenceConfiguration = {
      ...DEFAULT_CONFIG,
      ...(body.config || {}),
      linearFeet: Number(body.config?.linearFeet || body.linearFeet || 100),
    };

    const vendor: SupportedVendor | 'cheapest' = (body.vendor as any) || 'homeDepot';

    const catalogMap = await loadCatalogMap();
    const bomResult = calculateBomFromCatalog(config, catalogMap, vendor);

    return NextResponse.json({
      success: true,
      data: bomResult,
    });
  } catch (err: any) {
    console.error('[API /api/bom POST] error:', err);
    return NextResponse.json({ error: err.message || 'Error calculating BOM' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const lf = Number(searchParams.get('lf') || 100);
    const postType = (searchParams.get('postType') as any) || '4x4-cedar';
    const postCap = (searchParams.get('postCap') as any) || 'cedar-pyramid';
    const fillPattern = searchParams.get('fillPattern') || 'board-on-board';
    const vendor = (searchParams.get('vendor') as any) || 'homeDepot';

    const config: FenceConfiguration = {
      ...DEFAULT_CONFIG,
      linearFeet: lf,
      postType,
      postCap,
      fillPattern,
    };

    const catalogMap = await loadCatalogMap();
    const bomResult = calculateBomFromCatalog(config, catalogMap, vendor);

    return NextResponse.json({
      success: true,
      data: bomResult,
    });
  } catch (err: any) {
    console.error('[API /api/bom GET] error:', err);
    return NextResponse.json({ error: err.message || 'Error calculating BOM' }, { status: 500 });
  }
}
