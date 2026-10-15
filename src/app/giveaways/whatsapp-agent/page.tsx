import PackPage from '@/components/giveaways/PackPage'
import { WHATSAPP_AGENT_CONTENT } from './pack'

// WhatsApp receptionist giveaway (IG, 15 Oct 2026), on the pack page template.
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Give Claude its own WhatsApp number',
  description:
    "Build a WhatsApp receptionist that answers your clients and books appointments, with Claude Code, Meta's official WhatsApp Cloud API and a free Cloudflare Worker.",
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Download the folder', text: 'Download whatsapp-receptionist.zip from the page.', position: 1 },
    { '@type': 'HowToStep', name: 'Set up Meta', text: 'Become a Meta developer, create a WhatsApp app, get the free test number, the App secret and a permanent token.', position: 2 },
    { '@type': 'HowToStep', name: 'Get a Claude API key', text: 'Create a key at platform.claude.com and add 5 USD of credit.', position: 3 },
    { '@type': 'HowToStep', name: 'Paste the prompt into Claude Code', text: 'Claude Code tests the code, asks about your business and puts it online on Cloudflare.', position: 4 },
    { '@type': 'HowToStep', name: 'Connect Meta and text it', text: 'Paste the Callback URL and Verify token into Meta, subscribe to messages, then text the test number.', position: 5 },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'WhatsApp Cloud API' },
    { '@type': 'HowToTool', name: 'Cloudflare Workers' },
  ],
  totalTime: 'PT60M',
}

export default function WhatsAppAgentPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="whatsapp-agent" content={WHATSAPP_AGENT_CONTENT} />
    </>
  )
}
