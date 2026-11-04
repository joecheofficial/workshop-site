import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/video-editor`

export const metadata: Metadata = {
  title: 'Video Editor: film it messy, Claude edits it for you',
  description:
    'A free Claude Code folder for Mac. It keeps your best take, cuts the umms, restarts and long pauses, and adds captions. Your voice stays in sync at every cut. Free, from Joe Che.',
  keywords: [
    'AI video editor', 'remove filler words', 'cut retakes', 'video captions', 'Claude Code',
    'talking head edit', 'Instagram reels editing', 'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Video Editor: Free from Joe Che',
    description: 'Film it messy. Claude Code keeps your best take, cuts the rest and adds captions. Free.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Editor: Free from Joe Che',
    description: 'Film it messy. Claude Code edits it for you, free.',
    creator: '@joecheuk',
  },
}

export default function VideoEditorLayout({ children }: { children: ReactNode }) {
  return children
}
