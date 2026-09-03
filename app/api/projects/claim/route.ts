import { NextResponse } from 'next/server';
import { supabaseRpc, supabaseQuery } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { projectId, contractorId, ticketType = 'shared', paymentMethod = 'stripe' } = body;

    if (!projectId) {
      return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
    }

    // If contractorId is omitted, find or use the first verified contractor
    if (!contractorId) {
      const contractors = await supabaseQuery<any>('contractors', 'select=id,contractor_tier&contractor_tier=eq.verified&limit=1');
      if (contractors && contractors[0]) {
        contractorId = contractors[0].id;
      } else {
        return NextResponse.json({ error: 'No active verified contractor found' }, { status: 400 });
      }
    }

    // Call atomic purchase_lead_seat RPC
    const result: any = await supabaseRpc('purchase_lead_seat', {
      p_project_id: projectId,
      p_contractor_id: contractorId,
      p_ticket_type: ticketType,
      p_payment_method: paymentMethod,
    });

    if (!result?.success) {
      return NextResponse.json({ error: 'Failed to claim seat' }, { status: 400 });
    }

    // Retrieve unlocked project details with homeowner contact PII
    const projects = await supabaseQuery<any>('projects', `select=*&id=eq.${projectId}`);
    const project = projects?.[0];

    return NextResponse.json({
      success: true,
      ticketId: result.ticket_id,
      ticketType: result.ticket_type,
      pricePaidCents: result.price_paid_cents,
      homeowner: project ? {
        name: project.homeowner_name,
        phone: project.homeowner_phone,
        email: project.homeowner_email,
        address: `${project.street_address}, ${project.city}, WA ${project.zip_code}`,
        linearFeet: project.linear_feet,
        terrain: project.terrain,
      } : null,
    });
  } catch (err: any) {
    console.error('Error claiming lead seat:', err);
    return NextResponse.json({ error: err.message || 'Error claiming lead seat' }, { status: 500 });
  }
}
