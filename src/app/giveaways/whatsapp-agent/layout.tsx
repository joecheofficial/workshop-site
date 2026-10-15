import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/whatsapp-agent`

export const metadata: Metadata = {
  title: 'Give Claude its own WhatsApp number',
  description:
    "A free WhatsApp receptionist that answers your clients and books appointments, even at midnight. Built with Claude Code on WhatsApp's official API. Free, from Joe Che's AI class.",
  keywords: [
    'WhatsApp receptionist', 'WhatsApp AI agent', 'WhatsApp Cloud API', 'WhatsApp booking bot',
    'Claude Code', 'Claude API', 'Cloudflare Workers', 'appointment booking',
    'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Give Claude its own WhatsApp number: Free from Joe Che',
    description:
      "A WhatsApp receptionist that answers your clients and books appointments, even at midnight. Built with Claude Code on WhatsApp's official API. Free.",
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Give Claude its own WhatsApp number: Free from Joe Che',
    description: 'A WhatsApp receptionist that answers clients and books appointments. Built with Claude Code, free.',
    creator: '@joecheuk',
  },
}

export default function WhatsAppAgentLayout({ children }: { children: ReactNode }) {
  return children
}
