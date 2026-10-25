import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/free-ai-concat'

export const metadata: Metadata = {
  title: 'Concat setup notes: a free video editor, no watermark',
  description: 'Free setup notes from Joe Che: Concat is a free, open source video editor with auto captions and 4K export, no watermark and no account. Mac setup steps, including the one extra click, and the honest limits (it is a beta).',
  keywords: ['Concat', 'free video editor', 'CapCut alternative', 'free AI tools', 'open source', 'setup notes', 'Joe Che', 'AI Business Mastermind'],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Concat setup notes: a free video editor, no watermark',
    description: 'A free video editor with auto captions and 4K export. No watermark, no account, no subscription.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concat setup notes: a free video editor, no watermark',
    description: 'A free video editor with auto captions and 4K export. No watermark, no account, no subscription.',
    creator: '@joecheuk',
  },
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}
