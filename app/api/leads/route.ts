import { NextResponse } from 'next/server';
import { supabaseQuery, supabaseInsert } from '@/lib/supabase/client';
import { calculateBaselineFenceQuote, getLeadTicketPricing, FenceConfiguration } from '@/lib/pricing-engine';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get('limit') || 20);
    const authHeader = req.headers.get('Authorization') || undefined;

    const leads = await supabaseQuery<any>(
      'leads',
      `select=*&lead_status=in.(open,exclusive_closed,max_seats_closed)&order=opened_at.desc&limit=${limit}`,
      authHeader ? authHeader.replace('Bearer ', '') : undefined
    );

    return NextResponse.json({
      success: true,
      count: leads?.length || 0,
      leads: leads || [],
    });
  } catch (err: any) {
    console.error('[API /api/leads GET] error:', err);
    return NextResponse.json({ error: err.message || 'Error fetching leads' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      homeownerName,
      homeownerPhone,
      homeownerEmail,
      streetAddress,
      city = 'North Bend',
      county = 'King County',
      zip = '98045',
      linearFeet = 100,
      terrain = 'flat',
      config,
      quotedMid,
      quotedLow,
      quotedHigh,
      partnerSlug,
    } = body;

    const lf = Number(linearFeet);

    // Compute or use provided quote ranges
    let mid = quotedMid;
    let low = quotedLow;
    let high = quotedHigh;

    if (mid == null || low == null || high == null) {
      const fenceConfig: FenceConfiguration = {
        heightFt: config?.heightFt || 6,
        postSpacingFt: config?.postSpacingFt || 8,
        linearFeet: lf,
        woodGrade: config?.woodGrade || 'tight-knot',
        postType: config?.postType || '4x4-cedar',
        postCap: config?.postCap || 'cedar-pyramid',
        footingDepthInches: config?.footingDepthInches || 30,
        railCount: config?.railCount || 3,
        topCap: !!config?.topCap,
        fenceStyleCategory: config?.fenceStyleCategory || 'vertical-picket',
        fillPattern: config?.fillPattern || 'board-on-board',
        stainType: config?.stainType || 'cedar-natural',
        trimStyle: config?.trimStyle || 'none',
        hardwareTier: config?.hardwareTier || 'black-powder',
        gates: config?.gates || { walkGates: 0, driveGates: 0 },
        terrain: terrain as 'flat' | 'moderate' | 'steep',
      };

      const quote = calculateBaselineFenceQuote(fenceConfig);
      mid = Math.round((quote.totalMin + quote.totalMax) / 2);
      low = Math.round(quote.totalMin);
      high = Math.round(quote.totalMax);
    }

    const { sharedPriceCents, exclusivePriceCents } = getLeadTicketPricing(mid);

    // 1. Insert saved design if config provided
    let designId: string | null = null;
    if (config) {
      const [savedDesign] = await supabaseInsert<any>('saved_designs', [{
        style_category: config.fenceStyleCategory || 'vertical-picket',
        linear_feet: lf,
        height_ft: config.heightFt || 6,
        terrain,
        post_type: config.postType || '4x4-cedar',
        rail_count: config.railCount || 3,
        fill_pattern: config.fillPattern || 'board-on-board',
        stain_type: config.stainType || 'none',
        trim_style: config.trimStyle || 'none',
        gates_json: config.gates || {},
        config_snapshot: config,
      }]);
      designId = savedDesign?.id || null;
    }

    // 2. Insert into leads table (which triggers handle_leads_insert into projects)
    const [leadRecord] = await supabaseInsert<any>('leads', [{
      design_id: designId,
      homeowner_name: homeownerName || 'Homeowner',
      homeowner_phone: homeownerPhone || '555-010-0199',
      homeowner_email: homeownerEmail || 'homeowner@example.com',
      street_address: streetAddress || '123 Cedar Way',
      city,
      county,
      zip,
      linear_feet: lf,
      terrain,
      quoted_mid: mid,
      quoted_low: low,
      quoted_high: high,
      quoted_mid_cents: Math.round(mid * 100),
      quoted_low_cents: Math.round(low * 100),
      quoted_high_cents: Math.round(high * 100),
      lead_status: 'open',
      shared_ticket_price_cents: sharedPriceCents,
      exclusive_price_cents: exclusivePriceCents,
      opted_in_to_contact: true,
      partner_slug: partnerSlug || null,
    }]);

    return NextResponse.json({
      success: true,
      lead: leadRecord,
      quote: {
        quotedMid: mid,
        quotedLow: low,
        quotedHigh: high,
        pricePerLf: Number((mid / lf).toFixed(2)),
      },
    });
  } catch (err: any) {
    console.error('[API /api/leads POST] error:', err);
    return NextResponse.json({ error: err.message || 'Error inserting lead' }, { status: 500 });
  }
}
