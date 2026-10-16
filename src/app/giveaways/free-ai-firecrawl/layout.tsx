import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-firecrawl'

export const metadata: Metadata = {
  title: 'Firecrawl setup notes: any website into clean text for your AI',
  description: 'Free setup notes from Joe Che: Firecrawl turns any public web page into clean text your AI can read. Free plan, 1,000 pages a month, no card. One Claude Code prompt or 3 steps.',
  keywords: ['Firecrawl', 'free AI tools', 'open source', 'setup notes', 'AI for small business', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Firecrawl setup notes: any website into clean text for your AI',
    description: 'Paste a web address, get clean text your AI can read. Free plan, no card.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Firecrawl setup notes: any website into clean text for your AI',
    description: 'Paste a web address, get clean text your AI can read. Free plan, no card.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
