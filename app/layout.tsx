import { ModalProvider } from '@/components/ff/modal-provider'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { BRAND_ASSETS } from '@/lib/brand-assets'
import './globals.css'
import '../styles/ff-source.css'
import '../styles/ff-overrides.css'

export const metadata: Metadata = {
  title: 'Fence Frames — Frame Your Vision | Find Your Fence',
  description:
    'Fence Frames is a modern fence design platform built by a former fencing contractor. Design your fence, generate HOA-ready blueprints, and match with 3 vetted local contractors.',
  icons: {
    icon: [{ url: BRAND_ASSETS.favicon, type: 'image/png' }],
    apple: [{ url: BRAND_ASSETS.favicon, type: 'image/png' }],
  },
  robots: {
    index: false,
    follow: false,
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#16432D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="js bg-background">
      <body className="antialiased">
        <ModalProvider>{children}</ModalProvider>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
      </body>
    </html>
  )
}
