import PackPage from '@/components/giveaways/PackPage'
import { WEB_DESIGN_ARSENAL_PACK } from './pack'

// Web Designer Agent Kit giveaway, on the pack page template (Illy, 2026-10-14).
// Email ask, layout and the end offer live in PackPage; words in ./pack.ts.

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Install the Web Designer Agent Kit for Claude Code',
  description:
    'A free prompt that installs a Web Designer agent, 22 curated web design skills, and starter context files for Claude Code.',
  author: { '@type': 'Person', name: 'Joe Che', url: 'https://www.mastermindshq.business' },
  publisher: { '@type': 'Organization', name: 'AI Business Mastermind', url: 'https://www.mastermindshq.business' },
  step: [
    { '@type': 'HowToStep', name: 'Copy the prompt', text: 'Copy the free Web Designer Agent Kit install prompt.', position: 1 },
    {
      '@type': 'HowToStep',
      name: 'Paste into Claude Code',
      text: 'Open Claude Code inside your website project folder and paste. The agent, skills, and context files install safely.',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: 'Describe what you want',
      text: 'Your Web Designer agent now has professional design intelligence. Describe your site and it builds something beautiful.',
      position: 3,
    },
  ],
  tool: [
    { '@type': 'HowToTool', name: 'Claude Code' },
    { '@type': 'HowToTool', name: 'Git' },
    { '@type': 'HowToTool', name: 'Node.js' },
  ],
  supply: [
    { '@type': 'HowToSupply', name: 'GSAP animation library' },
    { '@type': 'HowToSupply', name: 'Framer Motion' },
    { '@type': 'HowToSupply', name: 'Lenis smooth scroll' },
    { '@type': 'HowToSupply', name: 'tsparticles' },
    { '@type': 'HowToSupply', name: 'Three.js' },
  ],
}

export default function WebDesignArsenalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PackPage slug="web-design-arsenal" content={WEB_DESIGN_ARSENAL_PACK} />
    </>
  )
}
