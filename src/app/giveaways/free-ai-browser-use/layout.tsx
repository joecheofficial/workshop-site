import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-browser-use'

export const metadata: Metadata = {
  title: 'Browser Use setup notes: an AI that clicks around websites for you',
  description: 'Free setup notes from Joe Che: Browser Use lets your AI open sites, click, type and fill in forms. Free and open source. One Claude Code prompt or 3 steps, plus honest costs.',
  keywords: ['Browser Use', 'free AI tools', 'open source', 'setup notes', 'AI for small business', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Browser Use setup notes: an AI that clicks around websites for you',
    description: 'Type the job in plain English. The AI opens the site, clicks, types and fills in the form.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Browser Use setup notes: an AI that clicks around websites for you',
    description: 'Type the job in plain English. The AI opens the site, clicks, types and fills in the form.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
