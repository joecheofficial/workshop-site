import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const BASE = 'https://workshop.mastermindshq.business'
const URL = `${BASE}/giveaways/agent-infrastructure`

export const metadata: Metadata = {
  title: 'Advanced Infrastructure for Multi-Agent AI Operating Systems',
  description: 'Six layers that turn a collection of agents into a system that gets smarter every day. Memory, navigation, self-learning, coordination, dispatch, and composability.',
  keywords: [
    'multi-agent AI', 'agent infrastructure', 'AI operating system', 'AgentMem', 'Graphify', 'Graphiti',
    'Claude Code', 'agent memory', 'project manager agents', 'AI dispatch', 'recipes skills agents',
    'AI Business Mastermind', 'Joe Che',
  ],
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: {
    title: 'Advanced Infrastructure for Multi-Agent AI Operating Systems',
    description: 'Six layers that turn a collection of agents into a system that gets smarter every day. Free from Joe Che.',
    url: URL,
    siteName: 'Masterminds Workshop',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Advanced Infrastructure for Multi-Agent AI Operating Systems',
    description: 'Memory, navigation, self-learning, coordination, dispatch, and composability. Six layers that compound over time.',
    creator: '@joecheuk',
  },
}

export default function AgentInfrastructureLayout({ children }: { children: ReactNode }) {
  return children
}
