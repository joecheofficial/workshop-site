import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-youtube-skills'

export const metadata: Metadata = {
  title: 'YouTube Agent Skill setup notes: free Claude skills for your videos',
  description: 'Free setup notes from Joe Che: eleven free Claude skills that write and score your hooks, scripts, titles and cover text, list the cuts from your transcript and draft comment replies in your voice. One prompt, honest limits.',
  keywords: ['YouTube Agent Skill', 'Claude skills', 'YouTube script', 'video hooks', 'reel hooks', 'free AI tools', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'YouTube Agent Skill setup notes: free Claude skills for your videos',
    description: 'Claude writes the words for your videos: scored hooks, scripts, title and cover checks. Free skills, paid Claude plan.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Agent Skill setup notes: free Claude skills for your videos',
    description: 'Claude writes the words for your videos: scored hooks, scripts, title and cover checks. Free skills, paid Claude plan.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
