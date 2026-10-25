import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-salesman'

export const metadata: Metadata = {
  title: 'Salesman Kit setup notes: find customers, draft the first email',
  description: 'Free setup notes from Joe Che: four Claude skills that find businesses that fit your dream customer and draft a short first email about something real. You read it and send it yourself.',
  keywords: ['Salesman Kit', 'Claude skills', 'cold email', 'find customers', 'free AI tools', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Salesman Kit setup notes: find customers, draft the first email',
    description: 'Four Claude skills that draft the first email. You send it yourself.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salesman Kit setup notes: find customers, draft the first email',
    description: 'Four Claude skills that draft the first email. You send it yourself.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
