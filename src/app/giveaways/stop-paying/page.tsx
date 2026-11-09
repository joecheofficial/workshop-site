import PackPage from '@/components/giveaways/PackPage'
import { STOP_PAYING_PACK } from './pack'

// Stop Paying bundle, keyword FREE (Week 6 anchor reel, Mon 16 Nov 2026).
// Words in ./pack.ts.

const URL = 'https://workshop.mastermindshq.business/giveaways/stop-paying'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '5 free swaps for the paid AI tools you use',
  url: URL,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'CapCut to Concat' },
    { '@type': 'ListItem', position: 2, name: 'ElevenLabs to VoiceStudio' },
    { '@type': 'ListItem', position: 3, name: 'Claude Code to OpenCode' },
    { '@type': 'ListItem', position: 4, name: 'Photoshop to Compositor' },
    { '@type': 'ListItem', position: 5, name: 'Suno to yovoice' },
  ],
}

export default function StopPayingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="stop-paying" content={STOP_PAYING_PACK} />
    </>
  )
}
