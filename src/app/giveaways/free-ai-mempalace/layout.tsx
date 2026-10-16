import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-mempalace'

export const metadata: Metadata = {
  title: 'MemPalace setup notes: give your AI a long-term memory',
  description: 'Free setup notes from Joe Che: MemPalace saves your past AI conversations on your own computer and lets your AI search them before it answers. Free and open source. One Claude Code prompt.',
  keywords: ['MemPalace', 'free AI tools', 'open source', 'setup notes', 'AI for small business', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'MemPalace setup notes: give your AI a long-term memory',
    description: 'Your past AI conversations, saved word for word on your computer, and searchable by your AI.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MemPalace setup notes: give your AI a long-term memory',
    description: 'Your past AI conversations, saved word for word on your computer, and searchable by your AI.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
