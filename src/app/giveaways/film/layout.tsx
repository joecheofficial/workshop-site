import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/film`

export const metadata: Metadata = {
  title: 'Make a film with Claude: a short animated film from your story idea',
  description:
    'A free film-style library for Claude Code. Tell Claude your story idea and it draws, scores and renders a short animated film on your Mac. Fun stories, not everyday business work. Free, from Joe Che.',
  keywords: [
    'Claude Code', 'animated film', 'AI film', 'Lemo-Opuscar', 'short film from a story idea',
    'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Make a film with Claude: Free from Joe Che',
    description: 'Tell Claude Code your story idea and it makes a short animated film on your Mac. Free.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Make a film with Claude: Free from Joe Che',
    description: 'One story idea in, one short animated film out, made by Claude Code.',
    creator: '@joecheuk',
  },
}

export default function FilmLayout({ children }: { children: ReactNode }) {
  return children
}
