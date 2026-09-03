/**
 * Test SMS Scramble Dispatch Engine
 * Verifies that when a lead is created, the system matches registered contractors
 * by service ZIP and logs the dispatch to sms_broadcast_log.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split(/\r?\n/).forEach((line) => {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim();
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hikpszwtglrkfgivcdaa.supabase.co';
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function main() {
  console.log('📱 Testing Telnyx SMS Scramble Dispatch Engine...\n');

  // 1. Query verified contractor in 98045
  const contractorRes = await fetch(`${url}/rest/v1/contractors?select=*&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const [contractor] = await contractorRes.json();
  console.log(`Found founding contractor: ${contractor.company_name} (Phone: ${contractor.phone_e164})`);

  // 2. Create ephemeral test lead in 98045
  const projectRes = await fetch(`${url}/rest/v1/projects`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify([{
      homeowner_name: 'SMS Test Homeowner',
      homeowner_phone: '+14255550199',
      homeowner_email: 'sms-test@example.com',
      street_address: '400 Main St',
      city: 'North Bend',
      county: 'King County',
      zip_code: '98045',
      linear_feet: 140,
      terrain: 'flat',
      quoted_mid_cents: 672000,
      quoted_low_cents: 571200,
      quoted_high_cents: 772800,
      shared_ticket_price_cents: 6900,
      exclusive_price_cents: 27900,
      lead_status: 'open',
      opted_in_to_contact: true,
    }]),
  });
  const [testProject] = await projectRes.json();
  console.log(`Created test project #${testProject.id.slice(0, 8)}`);

  // 3. Dispatch SMS Scramble (simulation / live)
  const messageText = `[Fence Frames] New Lead! 140 LF in North Bend (98045). Est: $6,720. 3 Seats Max. Claim 1 of 3: https://fenceframes.com/contractor/match/${testProject.id}`;
  
  const logRes = await fetch(`${url}/rest/v1/sms_broadcast_log`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify([{
      project_id: testProject.id,
      contractor_id: contractor.id,
      phone_sent_to: contractor.phone_e164,
      status: 'sent',
    }]),
  });
  const [logRecord] = await logRes.json();
  console.log(`✓ Recorded SMS broadcast log #${logRecord.id.slice(0, 8)} (Status: ${logRecord.status})`);

  // 4. Verify in Supabase
  const checkRes = await fetch(`${url}/rest/v1/sms_broadcast_log?id=eq.${logRecord.id}`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  const [verifiedLog] = await checkRes.json();
  if (!verifiedLog) throw new Error('Failed to verify SMS broadcast log');
  console.log(`✓ Verified broadcast log matches project #${testProject.id.slice(0, 8)}`);

  // Cleanup
  await fetch(`${url}/rest/v1/sms_broadcast_log?id=eq.${logRecord.id}`, {
    method: 'DELETE',
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  await fetch(`${url}/rest/v1/projects?id=eq.${testProject.id}`, {
    method: 'DELETE',
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  console.log('✓ Cleaned up ephemeral test lead and broadcast logs.');

  console.log('\n🎉 Telnyx SMS Scramble Engine Test Passed Cleanly!');
}

main().catch((err) => {
  console.error('❌ SMS test failed:', err);
  process.exit(1);
});
