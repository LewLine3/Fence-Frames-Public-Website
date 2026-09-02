import Link from 'next/link'

const rowdies = (weight: 300 | 400 | 700) => ({
  fontFamily: "'Rowdies', sans-serif",
  fontWeight: weight,
})

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: '#080D0A', color: '#FAF6EE' }}
    >
      <p style={{ ...rowdies(700), color: '#E5B842', fontSize: '0.8rem', letterSpacing: '0.08em' }}>
        FENCE FRAMES
      </p>
      <h1 style={{ ...rowdies(700), fontSize: '2rem', margin: '0.5rem 0' }}>Page not found</h1>
      <p style={{ ...rowdies(300), color: '#DBD0BD', marginBottom: '1.5rem' }}>
        That page does not exist.
      </p>
      <Link
        href="/"
        style={{
          ...rowdies(400),
          background: '#E5B842',
          color: '#0a0a0a',
          border: '2px solid #0a0a0a',
          padding: '0.5rem 1rem',
          textDecoration: 'none',
        }}
      >
        Back to Fence Frames
      </Link>
    </div>
  )
}
