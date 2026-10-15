import type { Metadata } from 'next'
import PackPage from '@/components/giveaways/PackPage'
import { CLIENT_LAUNCH_CHECKLIST_PACK } from './pack'

// Client Launch Checklist, on the pack page template (Illy approved 15 Oct 2026).
// The PDF is handed over first, no form in front of it. Email ask, layout and
// the end offer live in PackPage; words in ./pack.ts. The email the ask sends is
// the PDF welcome email (LEAD_MAGNETS in src/lib/lead-magnets.ts).

export const metadata: Metadata = {
  title: 'Client Launch Checklist',
  description: 'Get the five-step checklist for launching a paid client offer without missing the details that build trust.',
  openGraph: {
    title: 'Client Launch Checklist',
    description: 'A practical five-step checklist for consultants, coaches, and service business owners launching a paid offer.',
  },
}

export default function ClientLaunchChecklistPage() {
  return <PackPage slug="client-launch-checklist" content={CLIENT_LAUNCH_CHECKLIST_PACK} />
}
