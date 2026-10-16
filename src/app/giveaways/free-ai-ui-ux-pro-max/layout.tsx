import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-ui-ux-pro-max'

export const metadata: Metadata = {
  title: 'UI UX Pro Max setup notes: give your AI design taste',
  description: 'Free setup notes from Joe Che: UI UX Pro Max is a free Claude Code skill that picks a style, colours and fonts for your business from 192 palettes and 74 font pairings. Two commands install it.',
  keywords: ['UI UX Pro Max', 'free AI tools', 'open source', 'setup notes', 'AI for small business', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'UI UX Pro Max setup notes: give your AI design taste',
    description: 'A free Claude Code skill that picks a style, colours and fonts that fit your business.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UI UX Pro Max setup notes: give your AI design taste',
    description: 'A free Claude Code skill that picks a style, colours and fonts that fit your business.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
