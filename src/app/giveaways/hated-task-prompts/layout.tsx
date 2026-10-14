import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const URL = 'https://workshop.mastermindshq.business/giveaways/hated-task-prompts'
const DESCRIPTION =
  "Nine prompts for the work you'd rather never do again. Fill in the blanks, then send it straight to Claude or ChatGPT in one click. Free from Joe Che."

export const metadata: Metadata = {
  title: 'The Hated-Task Prompt Pack',
  description: DESCRIPTION,
  authors: [{ name: 'Joe Che', url: 'https://www.mastermindshq.business' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  openGraph: { title: 'The Hated-Task Prompt Pack: Free from Joe Che', description: DESCRIPTION, url: URL, siteName: 'Masterminds Workshop', type: 'website', locale: 'en_US' },
}

export default function HatedTaskPromptsLayout({ children }: { children: ReactNode }) {
  return children
}
