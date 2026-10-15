import type { Metadata } from 'next'
import PackPage from '@/components/giveaways/PackPage'
import { CULT_BRAND_PLAYBOOK_PACK } from './pack'

// The Cult Brand Playbook, on the pack page template (Illy approved 15 Oct 2026).
// The whole playbook is on the page, no form in front of it. Email ask, layout
// and the end offer live in PackPage; words in ./pack.ts. The email the ask
// sends is the playbook email (cult-brand-playbook in /api/lead-magnet).

export const metadata: Metadata = {
  title: 'The Cult Brand Playbook',
  description: 'The 7-element system behind Apple, Nike, and CrossFit. Stop competing on features. Start competing on identity.',
  openGraph: {
    title: 'The Cult Brand Playbook | Free Guide',
    description: 'The 7-element system behind Apple, Nike, and CrossFit. Stop competing on features. Start competing on identity.',
  },
}

export default function CultBrandPlaybookPage() {
  return <PackPage slug="cult-brand-playbook" content={CULT_BRAND_PLAYBOOK_PACK} />
}
