import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-compositor'

export const metadata: Metadata = {
  title: 'Compositor setup notes: a free Photoshop-style editor for Mac',
  description: 'Free setup notes from Joe Che: Compositor is a free, open source Photoshop-style photo editor for Apple chip Macs on macOS 26, with layers, text and background removal. Steps, honest limits and fixes.',
  keywords: ['Compositor', 'free photo editor', 'Photoshop alternative', 'remove background', 'free AI tools', 'open source', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Compositor setup notes: a free Photoshop-style editor for Mac',
    description: 'A free, open source photo editor with layers, text and background removal. Under 15 MB, for Apple chip Macs.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compositor setup notes: a free Photoshop-style editor for Mac',
    description: 'A free, open source photo editor with layers, text and background removal. Under 15 MB, for Apple chip Macs.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
