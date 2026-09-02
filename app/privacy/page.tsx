'use client'

import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function PrivacyPage() {
  return (
    <div
      className="min-h-screen flex flex-col font-['Rowdies']"
      style={{
        backgroundColor: '#F4ECDC',
        backgroundImage: `linear-gradient(rgba(22,67,45,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(22,67,45,0.35) 1px, transparent 1px), linear-gradient(#16432D 2px, transparent 2px), linear-gradient(90deg, #16432D 2px, transparent 2px)`,
        backgroundSize: '25px 25px, 25px 25px, 100px 100px, 100px 100px',
        color: '#1A1A1A',
      }}
    >
      <SiteNav />

      <main className="flex-1 max-w-[820px] w-full mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* ── Header Banner ── */}
        <section
          className="has-outside-corners p-6 sm:p-8 rounded-lg mb-8 relative overflow-hidden"
          style={{
            backgroundColor: '#1C150A',
            backgroundImage:
              'linear-gradient(rgba(229,184,66,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(229,184,66,0.08) 1px, transparent 1px), linear-gradient(180deg, #181208 0%, #291C0E 100%)',
            backgroundSize: '24px 24px, 24px 24px, 100% 100%',
            border: '2.5px solid var(--ink)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-forest" style={{ zIndex: 2 }} />

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-[#E5B842]/20 border border-[#E5B842] px-3 py-1 rounded text-xs text-[#E5B842] font-bold uppercase tracking-wider mb-3">
              <span>🔒</span>
              <span>Legal · Neutral</span>
            </div>
            <h1 style={{ ...rowdies(700), fontSize: '2rem', color: '#E5B842', marginBottom: '0.5rem' }}>
              Privacy Policy
            </h1>
            <p style={{ ...rowdies(300), fontSize: '0.95rem', color: '#DBD0BD', margin: 0 }}>
              Last updated: September 2, 2026
            </p>
          </div>
        </section>

        {/* ── Content Card ── */}
        <div
          className="has-outside-corners rounded-lg relative overflow-hidden"
          style={{
            background: '#FAF6EE',
            border: '2px solid #1A1A1A',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          }}
        >
          <span className="corner-mark-out tl c-gold" style={{ zIndex: 2 }} />
          <span className="corner-mark-out br c-gold" style={{ zIndex: 2 }} />

          <div
            className="bg-[#1A1A1A] text-[#E5B842] px-5 py-3 border-b-2 border-[#1A1A1A]"
            style={{ ...rowdies(700), fontSize: '1.1rem' }}
          >
            Data Collection &amp; Usage Policy
          </div>

          <div
            className="p-5 sm:p-6"
            style={{ ...rowdies(300), fontSize: '0.95rem', lineHeight: 1.75, color: '#1A1A1A' }}
          >
            <Section title="1. Information We Collect">
              <strong style={{ fontWeight: 400 }}>Guest Users:</strong> When you use the design tools
              without an account, your fence configurations are stored locally in your browser
              (sessionStorage). We do not collect or transmit guest design data to our servers.
              <br /><br />
              <strong style={{ fontWeight: 400 }}>Registered Users:</strong> When you create an
              account, we collect your phone number (for SMS verification), optional email address,
              name, and property address. Saved fence designs, ARC Blueprints, and project data are
              stored in our database.
              <br /><br />
              <strong style={{ fontWeight: 400 }}>Contractors:</strong> We collect business name,
              Washington State UBI/L&I license number, insurance documentation, service area, and
              payment information (processed via Stripe).
            </Section>

            <Section title="2. How We Use Your Information">
              We use your information to:
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li>Provide and improve the Fence Frames platform</li>
                <li>Generate and store your custom fence designs and ARC Blueprints</li>
                <li>Match you with vetted local contractors in your area</li>
                <li>Send SMS notifications about contractor bids and project updates (via Telnyx)</li>
                <li>Verify contractor licensing and insurance</li>
                <li>Process payments for contractor lead seats (via Stripe)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="3. Data Storage & Security">
              Your data is stored on Supabase (PostgreSQL) with Row Level Security (RLS) policies
              ensuring users can only access their own data. All data is encrypted in transit (TLS) and
              at rest. We do not sell your personal information to third parties.
            </Section>

            <Section title="4. Third-Party Services">
              We use the following third-party services:
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li><strong style={{ fontWeight: 400 }}>Supabase</strong> — Database hosting and authentication</li>
                <li><strong style={{ fontWeight: 400 }}>Stripe</strong> — Payment processing for contractor lead seats</li>
                <li><strong style={{ fontWeight: 400 }}>Telnyx</strong> — SMS notifications and OTP verification</li>
                <li><strong style={{ fontWeight: 400 }}>Vercel</strong> — Website hosting and analytics</li>
              </ul>
              Each service has its own privacy policy governing their handling of your data.
            </Section>

            <Section title="5. Cookies & Local Storage">
              Fence Frames uses browser sessionStorage and localStorage to preserve your design
              configurations and preferences. We use Vercel Analytics and Speed Insights for anonymous
              usage metrics. We do not use third-party advertising cookies or trackers.
            </Section>

            <Section title="6. HOA & Community Data">
              Community-specific fence guidelines, CC&R summaries, and HOA contact information
              displayed on the platform are sourced from publicly available records and verified
              community partnerships. We do not store or share individual HOA member data without
              consent.
            </Section>

            <Section title="7. SMS Communications">
              By creating an account with your phone number, you consent to receive transactional SMS
              messages related to your fence projects, contractor bids, and account verification. You
              may opt out of non-essential SMS at any time by replying STOP. A2P 10DLC messaging
              compliance is maintained through our registered Telnyx messaging profile.
            </Section>

            <Section title="8. Your Rights">
              You have the right to:
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
                <li>Access your personal data stored on our platform</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your account and associated data</li>
                <li>Export your fence designs and project data</li>
                <li>Opt out of non-essential communications</li>
              </ul>
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:privacy@fenceframes.com" style={{ color: '#E5B842', textDecoration: 'underline' }}>
                privacy@fenceframes.com
              </a>
              .
            </Section>

            <Section title="9. Children's Privacy">
              Fence Frames is not directed at individuals under the age of 18. We do not knowingly
              collect personal information from children.
            </Section>

            <Section title="10. Changes to This Policy">
              We may update this Privacy Policy from time to time. Material changes will be
              communicated via the platform. Continued use of the Service after changes constitutes
              acceptance of the revised policy.
            </Section>

            <Section title="11. Contact">
              For privacy-related questions or requests, contact us at{' '}
              <a href="mailto:privacy@fenceframes.com" style={{ color: '#E5B842', textDecoration: 'underline' }}>
                privacy@fenceframes.com
              </a>
              .
            </Section>

            <div
              className="mt-6 p-4 rounded border-2 border-[#4ADE80]/40"
              style={{ background: 'rgba(74, 222, 128, 0.08)' }}
            >
              <p style={{ ...rowdies(400), fontSize: '0.85rem', margin: 0, color: '#1A1A1A' }}>
                Fence Frames LLC is an independent company. The platform is not affiliated with,
                endorsed by, or operated by any specific fence contractor or construction company.
              </p>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2
        className="bg-[#1A1A1A] text-[#E5B842] px-3 py-1.5 rounded mb-2"
        style={{ ...rowdies(700), fontSize: '1rem' }}
      >
        {title}
      </h2>
      <div style={{ margin: 0 }}>{children}</div>
    </section>
  )
}
