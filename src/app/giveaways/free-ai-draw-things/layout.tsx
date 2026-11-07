import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-draw-things'

export const metadata: Metadata = {
  title: 'Draw Things setup notes: studio-style headshots on your own Mac',
  description: 'Free setup notes from Joe Che: Draw Things is a free Mac App Store app that turns your own selfie into a studio-style headshot and product snapshots into ad photos, on your Mac. Steps, a starter prompt and honest limits.',
  keywords: ['Draw Things', 'AI headshot', 'Midjourney alternative', 'FLUX', 'free AI image app', 'free AI tools', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Draw Things setup notes: studio-style headshots on your own Mac',
    description: 'Turn your own selfie into a studio-style headshot on your Mac. Free app, no monthly plan.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Draw Things setup notes: studio-style headshots on your own Mac',
    description: 'Turn your own selfie into a studio-style headshot on your Mac. Free app, no monthly plan.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
