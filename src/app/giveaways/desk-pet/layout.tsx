import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/desk-pet`

export const metadata: Metadata = {
  title: 'Desk Pet: a cartoon of you that watches Claude work',
  description:
    'A free Mac app where a cartoon of you sits on your screen and reacts to Claude Code. It types while Claude works, cheers when it is done and waves when Claude needs you. Free, from Joe Che.',
  keywords: [
    'desk pet', 'Claude Code', 'Claude Code hooks', 'Mac app', 'cartoon avatar',
    'tamagotchi', 'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Desk Pet: Free from Joe Che',
    description: 'A cartoon of you sits on your screen and reacts to Claude Code. Claude Code builds it on your Mac. Free.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Desk Pet: Free from Joe Che',
    description: 'A cartoon of you that types while Claude works and cheers when it is done. Free.',
    creator: '@joecheuk',
  },
}

export default function DeskPetLayout({ children }: { children: ReactNode }) {
  return children
}
