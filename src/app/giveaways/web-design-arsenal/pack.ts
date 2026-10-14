import type { PackPageContent } from '@/lib/pack-page'
import { WEB_DESIGNER_PROMPT } from './prompts'

// Words for the Web Designer Agent Kit pack page. Layout and behaviour live in
// src/components/giveaways/PackPage.tsx.

const KIT = 'https://github.com/josephtandle/web-designer-agent-kit'
const IMPECCABLE = 'https://github.com/pbakaus/impeccable'
const DESIGN_SKILLS = 'https://github.com/freshtechbro/claudedesignskills'
const GSAP = 'https://github.com/greensock/gsap-skills'
const SEO_GEO = 'https://github.com/aaron-he-zhu/seo-geo-claude-skills'

export const WEB_DESIGN_ARSENAL_PACK: PackPageContent = {
  slug: 'web-design-arsenal',
  level: 'beginner',
  hero: {
    title: 'Here is the Web Designer Agent Kit.',
    free: 'It is free.',
    lede: 'Paste one prompt into Claude Code from your project folder. It installs a Web Designer agent, a set of design skills and starter context files, and it does not overwrite your existing work.',
    button: {
      label: 'Take me to the prompt',
      meta: 'free · on this page',
      target: 'use',
    },
    ticks: ['No sign-up', 'No card', 'Works in Claude Code'],
  },
  jumps: [
    {
      target: 'get',
      label: 'Get it',
      text: 'What you need before you paste, and what it will not touch.',
    },
    {
      target: 'use',
      label: 'Use it now',
      text: 'Copy one prompt into Claude Code, in your website folder.',
    },
    {
      target: 'stuck',
      label: 'Get unstuck',
      text: 'The usual problems, and the fix for each.',
    },
  ],
  get: {
    heading: 'The Web Designer Agent Kit',
    intro:
      'Free, from Joe Che. It is one prompt. Open Claude Code inside your website project folder, paste it, and the kit installs.',
    note: {
      lead: 'Run it from inside your website project folder.',
      rest: 'It checks for Git, Node and npm first, and tells you what to install if one is missing. The prompt has commands for Mac and for Windows.',
    },
    primary: {
      label: 'See the kit on GitHub',
      meta: 'github.com/josephtandle/web-designer-agent-kit',
      href: KIT,
    },
  },
  promise: {
    heading: 'It installs. It does not overwrite.',
    doesNot: [
      'Overwrite any existing file',
      'Replace a CLAUDE.md, USER.md or SOUL.md you already have',
      'Stop the whole install when one outside skill fails',
    ],
    does: [
      'Check that Git, Node and npm are installed',
      'Copy the kit into a .masterminds-web-designer-agent-kit folder in your project',
      'Install the agent, the skills and the starter files, and skip what already exists',
      'Run a health check, then list what it installed, skipped and failed',
    ],
  },
  guide: {
    eyebrow: 'What is in the kit',
    heading: 'Everything in this prompt',
    intro: 'Every item links to its GitHub page so you can review it before installing. 22 items in all: the agent and its skills, in four groups.',
    sections: [
      {
        title: 'Agent and Design Foundation (5)',
        table: {
          head: ['Name', 'What it does', 'From'],
          rows: [
            ['web-designer agent', 'The dedicated Claude Code agent that runs the full website build.', 'josephtandle/web-designer-agent-kit'],
            ['masterminds-web-designer', 'Mastermind web design operating loop and quality standard.', 'josephtandle/web-designer-agent-kit'],
            ['frontend-design', 'Strong frontend design fallback for layout, hierarchy, and polish.', 'josephtandle/web-designer-agent-kit'],
            ['impeccable', 'Anti-slop visual quality standard for more premium, intentional interfaces.', 'pbakaus/impeccable'],
            ['modern-web-design', 'Modern page composition, interface polish, and design direction.', 'freshtechbro/claudedesignskills'],
          ],
        },
        links: [
          { label: 'josephtandle/web-designer-agent-kit', href: KIT },
          { label: 'pbakaus/impeccable', href: IMPECCABLE },
          { label: 'freshtechbro/claudedesignskills', href: DESIGN_SKILLS },
        ],
      },
      {
        title: 'Animation and Scroll (7)',
        table: {
          head: ['Name', 'What it does', 'From'],
          rows: [
            ['gsap-core', 'Professional animation fundamentals from the GSAP team.', 'greensock/gsap-skills'],
            ['gsap-timeline', 'Orchestrated animation sequences for hero sections and page moments.', 'greensock/gsap-skills'],
            ['gsap-scrolltrigger', 'Scroll-linked animation patterns used on premium websites.', 'greensock/gsap-skills'],
            ['gsap-performance', 'Animation performance guidance so effects stay smooth.', 'greensock/gsap-skills'],
            ['motion-framer', 'Framer Motion style interaction and component animation guidance.', 'freshtechbro/claudedesignskills'],
            ['scroll-reveal-libraries', 'Tasteful reveal effects for sections, cards, and calls to action.', 'freshtechbro/claudedesignskills'],
            ['animejs', 'Lightweight animation patterns for text, SVG, and microinteractions.', 'freshtechbro/claudedesignskills'],
          ],
        },
        links: [
          { label: 'greensock/gsap-skills', href: GSAP },
          { label: 'freshtechbro/claudedesignskills', href: DESIGN_SKILLS },
        ],
      },
      {
        title: '3D and WebGL Effects (5)',
        table: {
          head: ['Name', 'What it does', 'From'],
          rows: [
            ['threejs-webgl', 'Three.js and WebGL guidance for immersive site moments.', 'freshtechbro/claudedesignskills'],
            ['react-three-fiber', 'React-friendly 3D scene patterns.', 'freshtechbro/claudedesignskills'],
            ['lightweight-3d-effects', 'Fast 3D visual effects that do not require a heavy 3D app workflow.', 'freshtechbro/claudedesignskills'],
            ['web3d-integration-patterns', 'Patterns for integrating 3D without breaking usability.', 'freshtechbro/claudedesignskills'],
            ['animated-component-libraries', 'Reusable animated UI component ideas for faster builds.', 'freshtechbro/claudedesignskills'],
          ],
        },
        links: [{ label: 'freshtechbro/claudedesignskills', href: DESIGN_SKILLS }],
      },
      {
        title: 'SEO and GEO (5)',
        text: 'GEO means making pages easy for AI search to read and use.',
        table: {
          head: ['Name', 'What it does', 'From'],
          rows: [
            ['geo-content-optimizer', 'Generative engine optimization for AI-search-friendly pages.', 'aaron-he-zhu/seo-geo-claude-skills'],
            ['meta-tags-optimizer', 'Search and social metadata essentials.', 'aaron-he-zhu/seo-geo-claude-skills'],
            ['schema-markup-generator', 'Structured data suggestions for businesses, offers, and FAQs.', 'aaron-he-zhu/seo-geo-claude-skills'],
            ['technical-seo-checker', 'Basic crawlability and technical SEO checks.', 'aaron-he-zhu/seo-geo-claude-skills'],
            ['content-quality-auditor', 'Improves page usefulness, clarity, and credibility.', 'aaron-he-zhu/seo-geo-claude-skills'],
          ],
        },
        links: [{ label: 'aaron-he-zhu/seo-geo-claude-skills', href: SEO_GEO }],
      },
      {
        title: 'Review it before you install',
        text: 'The installer is designed to skip existing files by default and report exactly what changed. Review the public repo before installing anything new.',
        links: [{ label: 'Open the kit repo on GitHub', href: KIT }],
      },
    ],
  },
  use: {
    heading: 'Install it in one prompt',
    intro:
      'Tap Copy, open Claude Code inside your website project folder, paste it and send. When it finishes it tells you what it installed, skipped and failed, and gives you the next prompt to paste.',
    cards: [
      {
        label: 'the whole kit in one prompt',
        title: 'Install the Web Designer Agent Kit',
        text: 'Then describe your site. The Web Designer agent has the design skills ready.',
        prompt: WEB_DESIGNER_PROMPT,
      },
    ],
    openLinks: [],
  },
  stuck: [
    {
      q: 'It says Git, Node or npm is missing',
      a: 'That is the first check. The prompt tells Claude Code to stop and tell you exactly what to install. Install it, then paste the prompt again.',
    },
    {
      q: 'Some things were skipped',
      a: 'That is on purpose. The prompt never overwrites. If a skill, agent, CLAUDE.md, USER.md or SOUL.md is already there, it leaves it alone and reports it as skipped.',
    },
    {
      q: 'One skill failed to install',
      a: 'The rest keep installing. The prompt tells Claude Code to report the failure clearly, so check the failed list at the end.',
    },
    {
      q: 'Which folder do I open Claude Code in?',
      a: 'Your website project folder. The prompt treats the folder you are in as the project root.',
    },
    {
      q: 'I am on Windows',
      a: 'The prompt detects whether you are on Mac, Windows PowerShell or Windows Command Prompt and uses the matching commands.',
    },
    {
      q: 'I am on my phone',
      a: 'The prompt installs into a project folder through Claude Code, so you need to be on a computer. Open this page there.',
    },
    {
      q: 'None of these fixed it',
      email: 'joe@mastermindshq.business',
      a: 'Say which step you were on and paste what you saw.',
    },
  ],
  bridge:
    'You came for a Web Designer agent. It needs a site of your own to work on, and in the Website Workshop you build that first site by talking to AI.',
  emailHeading: 'Want more free tools like this in your inbox?',
}
