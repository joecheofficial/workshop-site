import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/stop-paying'
const TITLE = 'Stop paying for these 5 AI tools'
const DESCRIPTION =
  'CapCut, ElevenLabs, Claude Code, Photoshop and Suno: the free tool I would use instead of each, with setup steps and the catch, from Joe Che.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ['free AI tools', 'free alternatives', 'CapCut alternative', 'ElevenLabs alternative', 'Claude Code alternative', 'open source', 'AI for small business', 'Joe Che'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESCRIPTION, url: URL, siteName: 'Masterminds Workshop', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, creator: '@joecheuk' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
