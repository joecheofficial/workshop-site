import PackPage from '@/components/giveaways/PackPage'
import { DESK_PET_CONTENT } from './pack'

// Desk Pet giveaway (IG keyword PET, 30 Oct 2026), on the pack page template.
// A puppy the user picks (10 breeds), set up by their own Claude Code, sits on their screen and reacts to Claude Code.
// Source app: workspace agents/desk-pet (MIT).

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Build your own Desk Pet with Claude Code',
  description:
    'A free Mac app where a cute puppy sits on your screen and reacts to Claude Code: it types while Claude works, cheers when Claude is done and waves when Claude needs you.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Open Claude Code', text: 'Open the Claude app and click Code, or type claude in Terminal.', position: 1 },
    { '@type': 'HowToStep', name: 'Drag in the folder', text: 'Drag the DeskPet folder in and type "set it up". Or paste the Desk Pet prompt from the page.', position: 2 },
    { '@type': 'HowToStep', name: 'Pick your dog', text: 'Pick one of 10 dogs, give it a name, and check the preview.', position: 3 },
    { '@type': 'HowToStep', name: 'Meet your pet', text: 'Claude Code builds the app. Your pet sits on your screen and reacts every time Claude works for you.', position: 4 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }],
  totalTime: 'PT10M',
}

export default function DeskPetPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="desk-pet" content={DESK_PET_CONTENT} />
    </>
  )
}
