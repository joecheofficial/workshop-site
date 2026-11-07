import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-open-design'

export const metadata: Metadata = {
  title: 'Open Design setup notes: Claude designs your Instagram posts',
  description: 'Free setup notes from Joe Che: Open Design is a free, open source Claude plugin that designs Instagram posts, stories and carousels in your colours and exports PNGs. Needs a paid Claude plan. Steps and honest limits.',
  keywords: ['Open Design', 'Claude plugin', 'Canva alternative', 'Instagram post design', 'free AI tools', 'open source', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Open Design setup notes: Claude designs your Instagram posts',
    description: 'Ask Claude for your Instagram posts in your colours and get real PNG files. Free plugin, paid Claude plan.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Design setup notes: Claude designs your Instagram posts',
    description: 'Ask Claude for your Instagram posts in your colours and get real PNG files. Free plugin, paid Claude plan.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
