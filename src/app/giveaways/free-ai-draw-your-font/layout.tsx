import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-draw-your-font'

export const metadata: Metadata = {
  title: 'Draw Your Font setup notes: turn your handwriting into a font',
  description: 'Free setup notes from Joe Che: Draw Your Font is a free, open source tool that turns a photo of your handwriting into an installable font, with Claude Code. Steps, timing and honest limits.',
  keywords: ['Draw Your Font', 'handwriting font', 'Calligraphr alternative', 'Claude Code skill', 'free AI tools', 'open source', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Draw Your Font setup notes: turn your handwriting into a font',
    description: 'Write the alphabet on a template, photograph it, and Claude Code turns it into a font you can install.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Draw Your Font setup notes: turn your handwriting into a font',
    description: 'Write the alphabet on a template, photograph it, and Claude Code turns it into a font you can install.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
