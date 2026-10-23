import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/posture-coach`

export const metadata: Metadata = {
  title: 'Posture Coach: a cartoon of you that gets you stretching',
  description:
    'A free Mac app where a cartoon of you pops up every 20 minutes with a quick desk stretch. Claude Code makes the cartoon from your photo and builds it for you. Free, from Joe Che.',
  keywords: [
    'posture app', 'stretch reminder', 'desk stretches', 'Mac menu bar app', 'Claude Code',
    'Claude Code hooks', 'cartoon avatar', 'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Posture Coach: Free from Joe Che',
    description: 'A cartoon of you pops up every 20 minutes with a quick desk stretch. Claude Code builds it on your Mac. Free.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posture Coach: Free from Joe Che',
    description: 'A cartoon of you that gets you stretching every 20 minutes. Built by Claude Code, free.',
    creator: '@joecheuk',
  },
}

export default function PostureCoachLayout({ children }: { children: ReactNode }) {
  return children
}
