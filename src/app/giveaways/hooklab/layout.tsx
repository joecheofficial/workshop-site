import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/hooklab`

export const metadata: Metadata = {
  title: 'HookLab | Free Instagram Reel Hook Generator',
  description: 'A free Claude Code skill that writes five scored Instagram Reel hooks, with a full script for each, from your brand voice profile.',
  keywords: [
    'HookLab', 'Instagram hooks', 'Reel hooks', 'Claude Code skill', 'content hooks',
    'viral hooks', 'brand voice', 'Instagram content', 'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'HookLab | Free Instagram Reel Hook Generator',
    description: 'Five scored Instagram Reel hooks and a full script for each, written in your brand voice. Free from Joe Che.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HookLab | Free Instagram Reel Hook Generator',
    description: 'A free Claude Code skill for generating scored Reel hooks that sound like you and point to a real CTA.',
    creator: '@joecheuk',
  },
}

export default function HookLabLayout({ children }: { children: ReactNode }) {
  return children
}
