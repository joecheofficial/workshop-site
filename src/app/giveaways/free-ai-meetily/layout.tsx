import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-meetily'

export const metadata: Metadata = {
  title: 'Meetily setup notes: free AI meeting notes that stay private',
  description: 'Free setup notes from Joe Che: Meetily records, transcribes and summarizes your meetings on your own computer. Free and open source, Mac and Windows. One Claude Code prompt or 3 steps.',
  keywords: ['Meetily', 'free AI tools', 'open source', 'setup notes', 'AI for small business', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Meetily setup notes: free AI meeting notes that stay private',
    description: 'It records your call, writes the transcript while you talk and summarizes it, on your own computer.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meetily setup notes: free AI meeting notes that stay private',
    description: 'It records your call, writes the transcript while you talk and summarizes it, on your own computer.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
