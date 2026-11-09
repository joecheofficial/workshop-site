import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/guardog`

export const metadata: Metadata = {
  title: 'GuardDog | Free Package Security Scanner',
  description: 'A free scanner that checks npm and PyPI packages for known security holes and warning signs before you install them. One prompt to set up.',
  keywords: [
    'GuardDog', 'package security', 'npm security', 'supply chain attack', 'malware scanner',
    'CVE checker', 'Claude Code skill', 'package scanner', 'open source security',
    'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'GuardDog | Free Package Security Scanner',
    description: 'Check npm and PyPI packages for known security holes and warning signs before you install them. Free from the AI Business Mastermind.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GuardDog | Free Package Security Scanner',
    description: 'Check npm and PyPI packages for known security holes and warning signs before you install. One prompt to set up. Free.',
    creator: '@joecheuk',
  },
}

export default function GuardogLayout({ children }: { children: ReactNode }) {
  return children
}
