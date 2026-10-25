import PackPage from '@/components/giveaways/PackPage'
import { CHAT_TO_FLOWCHART_CONTENT } from './pack'

// Chat to Flowchart giveaway (IG keyword DIAGRAM, Mon 2 Nov 2026), on the pack page template.
// Tool: next-ai-draw-io by Dayuan Jiang (Apache-2.0). We link to the author's own site; nothing is copied or hosted here.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Draw a flowchart by chatting with an AI',
  description:
    'Open a free online tool, describe your steps in plain words, and an AI draws the flowchart. Change it by chatting, then save it as a picture.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Open the tool', text: 'Go to next-ai-drawio.jiang.jp. Nothing to install.', position: 1 },
    { '@type': 'HowToStep', name: 'Say what to draw', text: 'Type your steps in plain words and press Enter.', position: 2 },
    { '@type': 'HowToStep', name: 'Fix it by chatting', text: 'Ask for changes in plain words, like make the boxes bigger.', position: 3 },
    { '@type': 'HowToStep', name: 'Save it', text: 'Click the download icon and pick PNG, SVG or draw.io.', position: 4 },
  ],
  totalTime: 'PT5M',
}

export default function ChatToFlowchartPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="chat-to-flowchart" content={CHAT_TO_FLOWCHART_CONTENT} />
    </>
  )
}
