import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-openscreen'

export const metadata: Metadata = {
  title: 'OpenScreen setup notes: free screen recordings that zoom where you click',
  description: 'Free setup notes from Joe Che: OpenScreen is a free, open source screen recorder that zooms in where you click, with no watermark. Mac and Windows steps, permissions and honest limits.',
  keywords: ['OpenScreen', 'free screen recorder', 'Screen Studio alternative', 'auto zoom', 'demo video', 'free AI tools', 'open source', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'OpenScreen setup notes: free screen recordings that zoom where you click',
    description: 'A free screen recorder that zooms in where you click. No watermark, no subscription.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenScreen setup notes: free screen recordings that zoom where you click',
    description: 'A free screen recorder that zooms in where you click. No watermark, no subscription.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
