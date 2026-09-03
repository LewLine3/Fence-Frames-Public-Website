/**
 * Fence Frames — Telnyx Contractor SMS Scramble Dispatch Engine
 * Governed by: Handbook §05, §09, §18
 *
 * Dispatches high-urgency 3-seat lead scramble notifications to local
 * verified contractors matching the project's service ZIP code.
 */

import { supabaseQuery, supabaseInsert } from '@/lib/supabase/client';

export interface DispatchProject {
  id: string;
  zip_code: string;
  city: string;
  county: string;
  linear_feet: number;
  quoted_mid_cents: number;
  style?: string;
}

export interface DispatchResult {
  dispatchedCount: number;
  recipients: Array<{ contractorId: string; phone: string; name: string }>;
  mode: 'telnyx_live' | 'simulation';
}

export async function dispatchLeadScramble(project: DispatchProject): Promise<DispatchResult> {
  try {
    // 1. Check Platform Settings
    const settings = await supabaseQuery<any>('platform_settings', 'id=eq.1');
    if (settings && settings[0] && !settings[0].marketplace_sms_enabled) {
      console.log('[SMS Dispatch] Marketplace SMS kill switch active. Skipping dispatch.');
      return { dispatchedCount: 0, recipients: [], mode: 'simulation' };
    }

    // 2. Query verified contractors covering this ZIP code
    const contractors = await supabaseQuery<any>(
      'contractors',
      `select=id,company_name,phone_e164,service_zips,contractor_tier,marketplace_access,sms_blocked&marketplace_access=eq.active&sms_blocked=eq.false`
    );

    if (!contractors || contractors.length === 0) {
      console.log(`[SMS Dispatch] No active contractors in system.`);
      return { dispatchedCount: 0, recipients: [], mode: 'simulation' };
    }

    // Filter by ZIP coverage
    const matching = contractors.filter((c: any) => {
      const zips: string[] = Array.isArray(c.service_zips) ? c.service_zips : [];
      return zips.includes(project.zip_code) || zips.length === 0; // if empty, covers all
    });

    if (matching.length === 0) {
      console.log(`[SMS Dispatch] No contractors registered for ZIP ${project.zip_code}.`);
      return { dispatchedCount: 0, recipients: [], mode: 'simulation' };
    }

    const midDollars = Math.round(project.quoted_mid_cents / 100);
    const estFormatted = `$${midDollars.toLocaleString()}`;
    const claimUrl = `https://fenceframes.com/contractor/match/${project.id}`;

    const messageText = `[Fence Frames] New Lead! ${project.linear_feet} LF in ${project.city} (${project.zip_code}). Est: ${estFormatted}. 3 Seats Max. Claim 1 of 3: ${claimUrl}`;

    const telnyxApiKey = process.env.TELNYX_API_KEY;
    const telnyxFromPhone = process.env.TELNYX_FROM_PHONE || '+18005550199';
    const isLive = !!telnyxApiKey;

    const dispatchedLogs: any[] = [];
    const recipients: DispatchResult['recipients'] = [];

    for (const c of matching) {
      recipients.push({ contractorId: c.id, phone: c.phone_e164, name: c.company_name });

      let telnyxMessageId: string | null = null;
      let status = 'sent';

      if (isLive) {
        try {
          const res = await fetch('https://api.telnyx.com/v2/messages', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${telnyxApiKey}`,
            },
            body: JSON.stringify({
              from: telnyxFromPhone,
              to: c.phone_e164,
              text: messageText,
            }),
          });
          const resJson = await res.json();
          telnyxMessageId = resJson?.data?.id || null;
        } catch (smsErr) {
          console.error(`[SMS Dispatch] Failed sending to ${c.phone_e164}:`, smsErr);
          status = 'failed';
        }
      } else {
        console.log(`[SMS Dispatch SIMULATION] → To: ${c.phone_e164} (${c.company_name}) | Text: "${messageText}"`);
      }

      dispatchedLogs.push({
        project_id: project.id,
        contractor_id: c.id,
        telnyx_message_id: telnyxMessageId,
        phone_sent_to: c.phone_e164,
        status,
      });
    }

    // 3. Log dispatches in Supabase
    if (dispatchedLogs.length > 0) {
      await supabaseInsert('sms_broadcast_log', dispatchedLogs).catch((e) =>
        console.error('[SMS Dispatch] Failed saving dispatch log:', e)
      );
    }

    return {
      dispatchedCount: recipients.length,
      recipients,
      mode: isLive ? 'telnyx_live' : 'simulation',
    };
  } catch (err) {
    console.error('[SMS Dispatch] Fatal dispatch error:', err);
    return { dispatchedCount: 0, recipients: [], mode: 'simulation' };
  }
}
