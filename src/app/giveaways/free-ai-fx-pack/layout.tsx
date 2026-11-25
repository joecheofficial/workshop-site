import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-fx-pack'
const TITLE = 'FX Pack setup notes: 20 free video effects built by Claude'
const DESC = 'Free from Joe Che: the 20 effects from the "20 video effects in 20 seconds" reel, as a pack that puts them on your own talking video. Runs on your Mac, nothing uploaded.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: ['FX Pack', 'video effects', 'Claude', 'Remotion', 'reel effects', 'free AI tools', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, siteName: 'Masterminds Workshop', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC, creator: '@joecheuk' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
