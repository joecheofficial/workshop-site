import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/linkedin-kit`

export const metadata: Metadata = {
  title: "Joe's LinkedIn Kit: posts that sound like you, not like AI",
  description:
    'A free kit of five Claude skills. It writes down how you sound, then drafts LinkedIn posts, scores your profile out of 100, helps with comments and plans your week. You post it yourself. Free, from Joe Che.',
  keywords: [
    'LinkedIn posts', 'LinkedIn profile score', 'Claude skills', 'write LinkedIn posts with AI', 'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: "Joe's LinkedIn Kit: Free from Joe Che",
    description: 'Five Claude skills for LinkedIn posts that sound like you. It drafts, you post. Free.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Joe's LinkedIn Kit: Free from Joe Che",
    description: 'LinkedIn posts that sound like you, not like AI. Five Claude skills, free.',
    creator: '@joecheuk',
  },
}

export default function LinkedinKitLayout({ children }: { children: ReactNode }) {
  return children
}
