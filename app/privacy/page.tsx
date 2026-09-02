'use client'

import { SiteNav } from '@/components/ff/site-nav'
import { SiteFooter } from '@/components/ff/site-footer'

export default function PrivacyPage() {
  return (
    <>
      <SiteNav />
      <main
        className="wrap"
        style={{
          paddingTop: '2rem',
          fontFamily: 'Rowdies, sans-serif',
          maxWidth: 820,
          margin: '0 auto',
        }}
      >
        {/* ── Hero Header ── */}
        <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1
            style={{
              fontWeight: 700,
              fontSize: '2rem',
              color: 'var(--panel-charcoal)',
              marginBottom: '0.5rem',
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontWeight: 300,
              fontSize: '0.95rem',
              color: '#666',
            }}
          >
            Last updated: September 2, 2026
          </p>
        </header>

        {/* ── Content ── */}
        <div
          style={{
            fontWeight: 300,
            fontSize: '0.95rem',
            lineHeight: 1.75,
            color: 'var(--panel-charcoal)',
          }}
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
            <a
              href="mailto:privacy@fenceframes.com"
              style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}
            >
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
            <a
              href="mailto:privacy@fenceframes.com"
              style={{ color: 'var(--accent-gold)', textDecoration: 'underline' }}
            >
              privacy@fenceframes.com
            </a>
            .
          </Section>

          {/* ── Brand Firewall Notice ── */}
          <div
            style={{
              marginTop: '3rem',
              padding: '1.25rem',
              border: '1.5px solid var(--accent-forest)',
              borderRadius: 8,
              background: 'rgba(74, 222, 128, 0.04)',
            }}
          >
            <p style={{ fontWeight: 400, fontSize: '0.85rem', margin: 0 }}>
              Fence Frames LLC is an independent company. The platform is not affiliated with,
              endorsed by, or operated by any specific fence contractor or construction company.
            </p>
          </div>
        </div>

        <div style={{ height: '4rem' }} />
      </main>
      <SiteFooter />
    </>
  )
}

/* ── Reusable section component ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h2
        style={{
          fontWeight: 400,
          fontSize: '1.15rem',
          color: 'var(--panel-charcoal)',
          marginBottom: '0.5rem',
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: '0.35rem',
        }}
      >
        {title}
      </h2>
      <div style={{ margin: 0 }}>{children}</div>
    </section>
  )
}
