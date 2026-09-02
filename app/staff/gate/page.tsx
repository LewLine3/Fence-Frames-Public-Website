import { unlockStaffDesk } from './actions'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export const metadata = {
  title: 'Staff access',
  robots: { index: false, follow: false },
}

export default async function StaffGatePage({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>
}) {
  const params = await searchParams
  const denied = params.denied === '1'

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: '#080D0A',
        backgroundImage:
          'linear-gradient(rgba(229,184,66,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(229,184,66,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <form
        action={unlockStaffDesk}
        className="has-outside-corners w-full max-w-md p-8"
        style={{
          background: '#121814',
          border: '2px solid var(--ink)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        }}
      >
        <span className="corner-mark-out tl c-gold" />
        <span className="corner-mark-out br c-forest" />

        <p style={{ ...rowdies(700), color: '#E5B842', fontSize: '0.75rem', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
          FENCE FRAMES
        </p>
        <h1 style={{ ...rowdies(700), color: '#FAF6EE', fontSize: '1.6rem', margin: '0 0 0.5rem' }}>
          Staff access
        </h1>
        <p style={{ ...rowdies(300), color: '#DBD0BD', fontSize: '0.88rem', margin: '0 0 1.25rem' }}>
          Platform operators only. Customer, contractor, and HOA logins do not open this desk.
        </p>

        {denied ? (
          <p
            style={{
              ...rowdies(400),
              color: '#EF4444',
              fontSize: '0.82rem',
              margin: '0 0 1rem',
            }}
          >
            Access denied.
          </p>
        ) : null}

        <label
          htmlFor="staff-key"
          style={{ ...rowdies(400), display: 'block', color: '#E5B842', fontSize: '0.78rem', marginBottom: '0.35rem' }}
        >
          Access key
        </label>
        <input
          id="staff-key"
          name="key"
          type="password"
          autoComplete="current-password"
          required
          className="w-full mb-4 px-3 py-2"
          style={{
            background: '#FAF6EE',
            color: '#0a0a0a',
            border: '2px solid var(--ink)',
            fontFamily: "'Rowdies', sans-serif",
            fontWeight: 400,
          }}
        />

        <button
          type="submit"
          className="w-full py-2.5 cursor-pointer"
          style={{
            ...rowdies(400),
            background: '#E5B842',
            color: '#0a0a0a',
            border: '2px solid var(--ink)',
          }}
        >
          Continue
        </button>
      </form>
    </div>
  )
}
