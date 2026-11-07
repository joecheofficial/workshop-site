import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-yovoice'

export const metadata: Metadata = {
  title: 'yovoice setup notes: make songs with vocals on your own computer',
  description: 'Free setup notes from Joe Che: yovoice is a free, open source app that makes songs with vocals on your Mac or Windows PC. Which model to use for business, steps and honest limits.',
  keywords: ['yovoice', 'free AI music', 'Suno alternative', 'ACE-Step', 'AI song maker', 'free AI tools', 'open source', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'yovoice setup notes: make songs with vocals on your own computer',
    description: 'Type lyrics and a style, get a song with vocals, made on your own computer. No account, no fee per song.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'yovoice setup notes: make songs with vocals on your own computer',
    description: 'Type lyrics and a style, get a song with vocals, made on your own computer. No account, no fee per song.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
