import PackPage from '@/components/giveaways/PackPage'
import { LINKEDIN_KIT_CONTENT } from './pack'

// Joe's LinkedIn Kit giveaway (IG keyword KIT, Thu 29 Oct 2026), on the pack page template.
// Source kit: workspace agents/linkedin/joe-linkedin-kit (5 skills, MIT, written fresh, credit kept in kit/CREDITS.md).

export default function LinkedinKitPage() {
  return <PackPage slug="linkedin-kit" content={LINKEDIN_KIT_CONTENT} />
}
