import PackPage from '@/components/giveaways/PackPage'
import { VIDEO_EDITOR_CONTENT } from './pack'

// Video Editor giveaway (IG keyword EDIT, Week 4, built 2 Nov 2026), on the pack page template.
// Source tool: workspace agents/video-editor/video-use (run its package.sh, copy dist/video-editor.zip to public/).

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Edit your raw videos with Claude Code',
  description:
    'A free Claude Code folder for Mac that keeps your best take, cuts the umms, restarts and long pauses, and adds captions, with the sound in sync at every cut.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Download the folder', text: 'Download video-editor.zip from the page.', position: 1 },
    { '@type': 'HowToStep', name: 'Open Claude Code', text: 'In the Claude app for Mac, click Code.', position: 2 },
    { '@type': 'HowToStep', name: 'Set it up', text: 'Drag the VideoEditor folder in and type "set it up".', position: 3 },
    { '@type': 'HowToStep', name: 'Give it your videos', text: 'Tell Claude where your raw videos are and what you want. Say yes to the plan.', position: 4 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }],
  totalTime: 'PT15M',
}

export default function VideoEditorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="video-editor" content={VIDEO_EDITOR_CONTENT} />
    </>
  )
}
