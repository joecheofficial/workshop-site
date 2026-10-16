import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-voicestudio'

export const metadata: Metadata = {
  title: 'VoiceStudio setup notes: clone your voice for free',
  description: 'Free setup notes from Joe Che: VoiceStudio clones your voice from a short recording, designs new voices and dubs video in 646 languages, on your own computer. One Claude Code prompt or 3 steps.',
  keywords: ['VoiceStudio', 'free AI tools', 'open source', 'setup notes', 'AI for small business', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'VoiceStudio setup notes: clone your voice for free',
    description: 'A free app that clones your voice, designs new voices and dubs your videos, on your own computer.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VoiceStudio setup notes: clone your voice for free',
    description: 'A free app that clones your voice, designs new voices and dubs your videos, on your own computer.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
