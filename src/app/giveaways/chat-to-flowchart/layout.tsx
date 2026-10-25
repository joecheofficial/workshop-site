import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/chat-to-flowchart`

export const metadata: Metadata = {
  title: 'Chat to Flowchart: type what you want, get a drawing',
  description:
    'A free tool that draws flowcharts when you chat with it. Describe your steps in plain words, change them by chatting, and save the picture. Setup notes from Joe Che.',
  keywords: [
    'flowchart maker', 'AI flowchart', 'draw.io', 'diagram generator', 'chat to diagram',
    'client journey map', 'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Chat to Flowchart: Free setup notes from Joe Che',
    description: 'Type your steps in plain words and an AI draws the flowchart. Change it by chatting. Free to try online.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat to Flowchart: Free setup notes from Joe Che',
    description: 'Type your steps, get a flowchart. Change it by chatting. Free to try online.',
    creator: '@joecheuk',
  },
}

export default function ChatToFlowchartLayout({ children }: { children: ReactNode }) {
  return children
}
