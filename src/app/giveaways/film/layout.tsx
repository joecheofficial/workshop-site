import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/film`

export const metadata: Metadata = {
  title: 'Make a film with Claude: animated explainers and short films from your idea',
  description:
    'A free skill that teaches Claude Code 66 art styles. Describe your idea in plain English and Claude writes the story, adds a voiceover, music and sound, and draws a short animated film on your Mac. Free, from Joe Che.',
  keywords: [
    'Claude Code', 'animated film', 'animated explainer', 'whiteboard explainer video', 'AI film', 'Lemo-Opuscar', 'short film from a story idea',
    'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Make a film with Claude: Free from Joe Che',
    description: 'Tell Claude Code your idea and it makes a short animated film or explainer on your Mac. Free.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make a film with Claude: Free from Joe Che',
    description: 'One idea in, one short animated film out, drawn in code by Claude Code.',
    creator: '@joecheuk',
  },
}

export default function FilmLayout({ children }: { children: ReactNode }) {
  return children
}
