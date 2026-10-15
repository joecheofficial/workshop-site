import PackPage from '@/components/giveaways/PackPage'
import { GEOMETRY_DASH_PACK } from './pack'

// Geometry Dash fun build, on the pack page template (Illy approved 15 Oct 2026).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts, the game in ./game.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Build Geometry Dash with p5.js',
  description:
    'Copy the full p5.js game code, paste it into the free editor at editor.p5js.org, and play your own Geometry Dash clone. Then change the colors, physics and level.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the code', text: 'Copy the full game code from this page.', position: 1 },
    { '@type': 'HowToStep', name: 'Paste and play', text: 'Open editor.p5js.org, delete the starter code, paste, and click Play.', position: 2 },
    { '@type': 'HowToStep', name: 'Make it yours', text: 'Change the colors, gravity, jump height, speed, and add your own spikes and platforms.', position: 3 },
  ],
  tool: [{ '@type': 'HowToTool', name: 'p5.js web editor' }],
  totalTime: 'PT2M',
}

export default function GeometryDashPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="geometry-dash-fun-build" content={GEOMETRY_DASH_PACK} />
    </>
  )
}
