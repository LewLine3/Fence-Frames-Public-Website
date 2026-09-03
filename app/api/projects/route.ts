import { NextResponse } from 'next/server';
import { supabaseQuery, supabaseInsert } from '@/lib/supabase/client';
import { calculateBaselineFenceQuote, getLeadTicketPricing, type FenceConfiguration } from '@/lib/pricing-engine';
import { dispatchLeadScramble } from '@/lib/dispatch/sms-scramble';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rawProjects = await supabaseQuery<any>(
      'projects',
      'select=*,saved_designs(*)&lead_status=in.(open,exclusive_closed,max_seats_closed)&order=opened_at.desc&limit=20'
    );

    if (!rawProjects || rawProjects.length === 0) {
      // Return default starter projects if table is empty
      return NextResponse.json({
        projects: [
          {
            id: 'lead-98045-8921',
            jobCode: 'JOB #NB-8921',
            city: 'North Bend, WA 98045',
            neighborhood: 'Si View Community (Lot 42)',
            footage: 140,
            style: "6' Heritage Cedar 3-Rail Privacy (Si View Section 4.2 Approved)",
            estBudget: '$6,720 ($48.00 / LF)',
            seatCost: 39,
            seatsClaimed: 2,
            seatsTotal: 3,
            timeLeft: '46h 18m left',
            status: 'active',
            postedAgo: '42m ago',
          },
          {
            id: 'lead-98065-4412',
            jobCode: 'JOB #SN-4412',
            city: 'Snoqualmie, WA 98065',
            neighborhood: 'Snoqualmie Ridge (Cascade View)',
            footage: 180,
            style: "6' Horizon Modern Horizontal Stack (Pre-Stained Chestnut)",
            estBudget: '$10,080 ($56.00 / LF)',
            seatCost: 69,
            seatsClaimed: 1,
            seatsTotal: 3,
            timeLeft: '68h 12m left',
            status: 'active',
            postedAgo: '2h ago',
          },
        ],
      });
    }

    const projects = rawProjects.map((p: any) => {
      const midDollars = Math.round(p.quoted_mid_cents / 100);
      const perLf = p.linear_feet > 0 ? (midDollars / p.linear_feet).toFixed(2) : '0.00';
      const sharedCostDollars = Math.round(p.shared_ticket_price_cents / 100);

      const isClosed = p.lead_status === 'exclusive_closed' || p.lead_status === 'max_seats_closed';
      const seatsClaimed = p.exclusive_sold ? 3 : p.tickets_sold;

      return {
        id: p.id,
        jobCode: `JOB #${p.zip_code}-${p.id.slice(0, 4).toUpperCase()}`,
        city: `${p.city}, WA ${p.zip_code}`,
        neighborhood: `${p.county} (${p.terrain} terrain)`,
        footage: p.linear_feet,
        style: p.saved_designs?.style_category || 'Heritage Vertical Picket 6ft',
        estBudget: `$${midDollars.toLocaleString()} ($${perLf} / LF)`,
        seatCost: sharedCostDollars,
        seatsClaimed,
        seatsTotal: 3,
        timeLeft: isClosed ? 'FILLED (Linger 24h)' : '71h left',
        status: isClosed ? 'filled' : 'active',
        postedAgo: 'Recently',
      };
    });

    return NextResponse.json({ projects });
  } catch (err: any) {
    console.error('Error fetching projects:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
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
      city,
      county,
      zipCode,
      linearFeet,
      terrain = 'flat',
      config,
      communitySlug,
    } = body;

    if (!homeownerName || !homeownerPhone || !homeownerEmail || !linearFeet) {
      return NextResponse.json({ error: 'Missing required homeowner fields' }, { status: 400 });
    }

    const lf = Number(linearFeet);
    const fenceConfig: FenceConfiguration = {
      heightFt: config?.heightFt || 6,
      postSpacingFt: config?.postSpacingFt || 8,
      linearFeet: lf,
      woodGrade: config?.woodGrade || 'pressure-treated',
      postType: config?.postType || '4x4-pt',
      postCap: config?.postCap || 'none',
      footingDepthInches: config?.footingDepthInches || 24,
      railCount: config?.railCount || 2,
      topCap: !!config?.topCap,
      fenceStyleCategory: config?.fenceStyleCategory || 'vertical-picket',
      fillPattern: config?.fillPattern || 'standard',
      stainType: config?.stainType || 'none',
      trimStyle: config?.trimStyle || 'none',
      hardwareTier: config?.hardwareTier || 'galvanized',
      gates: config?.gates || { walkGates: 0, driveGates: 0 },
      terrain: terrain as 'flat' | 'moderate' | 'steep',
    };

    const quote = calculateBaselineFenceQuote(fenceConfig);
    const midCents = Math.round(((quote.totalMin + quote.totalMax) / 2) * 100);
    const lowCents = Math.round(quote.totalMin * 100);
    const highCents = Math.round(quote.totalMax * 100);

    const { sharedPriceCents, exclusivePriceCents } = getLeadTicketPricing(midCents / 100);

    // 1. Insert saved design
    const [savedDesign] = await supabaseInsert<any>('saved_designs', [{
      style_category: fenceConfig.fenceStyleCategory,
      linear_feet: lf,
      height_ft: fenceConfig.heightFt,
      terrain,
      post_type: fenceConfig.postType,
      rail_count: fenceConfig.railCount,
      fill_pattern: fenceConfig.fillPattern,
      stain_type: fenceConfig.stainType,
      trim_style: fenceConfig.trimStyle,
      gates_json: fenceConfig.gates,
      config_snapshot: fenceConfig,
    }]);

    // 2. Insert project lead
    const [project] = await supabaseInsert<any>('projects', [{
      design_id: savedDesign?.id || null,
      homeowner_name: homeownerName,
      homeowner_phone: homeownerPhone,
      homeowner_email: homeownerEmail,
      street_address: streetAddress || 'Address on file',
      city: city || 'North Bend',
      county: county || 'King County',
      zip_code: zipCode || '98045',
      linear_feet: lf,
      terrain,
      quoted_mid_cents: midCents,
      quoted_low_cents: lowCents,
      quoted_high_cents: highCents,
      lead_status: 'open',
      shared_ticket_price_cents: sharedPriceCents,
      exclusive_price_cents: exclusivePriceCents,
      opted_in_to_contact: true,
      partner_slug: communitySlug || null,
    }]);

    // 3. Trigger asynchronous SMS Scramble dispatch to local verified contractors
    dispatchLeadScramble({
      id: project.id,
      zip_code: project.zip_code,
      city: project.city,
      county: project.county,
      linear_feet: project.linear_feet,
      quoted_mid_cents: project.quoted_mid_cents,
      style: fenceConfig.fenceStyleCategory,
    }).catch((dispatchErr) => console.error('Asynchronous dispatch error:', dispatchErr));

    return NextResponse.json({
      success: true,
      projectId: project.id,
      homeownerAccessToken: project.homeowner_access_token,
      quote: {
        totalMin: quote.totalMin,
        totalMax: quote.totalMax,
        pricePerLfMin: quote.pricePerLfMin,
        pricePerLfMax: quote.pricePerLfMax,
      },
    });
  } catch (err: any) {
    console.error('Error submitting project lead:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
