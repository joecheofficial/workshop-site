import PackPage from '@/components/giveaways/PackPage'
import { FILM_CONTENT } from './pack'

// Make-a-Film giveaway (IG keyword FILM, Sun 1 Nov 2026), on the pack page template.
// Tool: lemomo-ai/lemo-opuscar by LemoLab (MIT code). Reel + test notes: workspace
// agents/give-first-studio/jobs/day20-film.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Make a short animated film with Claude Code',
  description:
    'Set up the free Lemo-Opuscar film library on a Mac, then tell Claude Code your story idea and it makes a short animated film.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Open Claude Code', text: 'Open Terminal on your Mac and type claude.', position: 1 },
    { '@type': 'HowToStep', name: 'Paste the prompt', text: 'Paste the Make a Film prompt from the page.', position: 2 },
    { '@type': 'HowToStep', name: 'Tell it your story', text: 'Say your story idea and pick a style.', position: 3 },
    { '@type': 'HowToStep', name: 'Watch your film', text: 'Claude Code makes the video and opens it.', position: 4 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'Claude Code' }, { '@type': 'HowToTool', name: 'Node' }, { '@type': 'HowToTool', name: 'ffmpeg' }, { '@type': 'HowToTool', name: 'Python' }],
}

export default function FilmPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="film" content={FILM_CONTENT} />
    </>
  )
}
